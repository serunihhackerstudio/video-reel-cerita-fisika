import numpy as np, wave, os, json
from scipy.signal import lfilter
SR=24000
D='mengecil/assets/audio'; os.makedirs(D,exist_ok=True)
rs=np.random.RandomState(11)
def save(name,x,peak=.9):
    x=np.asarray(x,dtype=np.float64); m=max(1e-9,np.abs(x).max()); x=x/m*peak
    with wave.open(f'{D}/{name}','wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype('<i2').tobytes())
def T(d): return np.arange(int(SR*d))/SR
def lp(x,fc):
    a=1-np.exp(-2*np.pi*fc/SR); return lfilter([a],[1,-(1-a)],x)
def noise(n): return rs.uniform(-1,1,n)
def whoosh(d,f0=300,f1=3500):
    t=T(d); n=noise(len(t)); s=np.clip(t/d,0,1); k=np.sin(np.pi*s)**1.6; return (lp(n,f0)*(1-s)+lp(n,f1)*s)*k
def boom(d=2.2,f0=95,f1=32):
    t=T(d); ph=2*np.pi*np.cumsum(f1+(f0-f1)*np.exp(-t*5))/SR; return np.sin(ph)*np.exp(-t*2.2)+lp(noise(len(t)),220)*np.exp(-t*6)*.8
def shimmer(d=2.0,base=880):
    t=T(d); y=np.zeros(len(t))
    for i,m in enumerate([1,1.5,2,2.5,3,4]): y+=np.sin(2*np.pi*base*m*t*(1+.02*np.sin(t*3+i)))*np.exp(-t*(2+i*.6))/(i+1)
    return y*np.minimum(1,t/.02)
def zap(d=.9):
    t=T(d); return np.sin(2*np.pi*(90-50*np.minimum(1,t*3))*t)*np.exp(-t*5)+.35*np.sin(2*np.pi*(1800+2400*t)*t)*np.exp(-t*9)+.1*noise(len(t))*np.exp(-t*14)
def riser(d):
    t=T(d); s=t/d; f=200*(1+s**2.2*6); ph=2*np.pi*np.cumsum(f)/SR; y=np.sin(ph)*.5+np.sin(ph*1.5)*.3
    nz_=noise(len(t)); n=(lp(nz_,700)*(1-s)+lp(nz_,5500)*s)*s; return (y*.6+n*.8)*(s**1.6)
def hum(d,f=55):
    t=T(d); y=np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*2*f*t)+.25*np.sin(2*np.pi*3*f*t)+.04*noise(len(t)); return y*(.75+.25*np.sin(2*np.pi*t/5))*np.minimum(1,np.minimum(t/1.2,(d-t)/1.5))
def atomhum(d):
    t=T(d); y=np.sin(2*np.pi*(80+30*t/d)*t)*.6+np.sin(2*np.pi*(240+90*t/d)*t)*.2+np.sin(2*np.pi*(960)*t)*.04*(.5+.5*np.sin(t*2)); return y*np.minimum(1,np.minimum(t/1.5,(d-t)/2))
def explosion(d=8.0):
    t=T(d); y=boom(d,140,26)*1.1+lp(noise(len(t)),1800)*np.exp(-t*1.6)*.9+lp(noise(len(t)),300)*np.exp(-t*.7)*.6
    y[:int(.03*SR)]*=np.linspace(0,1,int(.03*SR)); return y
def rumble(d=10.0):
    t=T(d); s=np.clip(t/d,0,1); y=lp(noise(len(t)),140)*3+np.sin(2*np.pi*31*t)*.6+np.sin(2*np.pi*47*t)*.4; env=np.minimum(1,t/2.5)*np.exp(-((t-d*.6)/(d*.3))**2*.4)*np.minimum(1,(d-t)/2.5); return y*env
def thump(d=3.0): return boom(d,70,22)*1.0+lp(noise(int(SR*d)),400)*np.exp(-T(d)*3)*.8
def crackle(d=12.0):
    t=T(d); s=t/d; n=len(t); y=np.zeros(n); r=rs
    dens=(s**2.2)*260+3
    k=int(d*140)
    for i in range(k):
        p=r.rand()
        pos=int((p**.45)*n)  # lebih rapat di akhir
        L=int(SR*(.004+r.rand()*.02)); seg_=noise(L)*np.exp(-np.arange(L)/L*6)*(.3+r.rand()*.7)*(.2+s[min(pos,n-1)]*1.2)
        y[pos:pos+L]+=seg_[:max(0,min(L,n-pos))]
    y+=lp(noise(n),2600)*s**2*.25; return y*np.minimum(1,(d-t)/1.0)
def bell(d=3.0,base=523.25):
    t=T(d); y=np.zeros(len(t))
    for m,a in [(1,1),(2.01,.45),(3.02,.25),(4.2,.12)]: y+=np.sin(2*np.pi*base*m*t)*np.exp(-t*(1.2+m*.5))*a
    return y*np.minimum(1,t/.01)
def hall(d=14):
    t=T(d); y=lp(noise(len(t)),500)*.5+np.sin(2*np.pi*98*t)*.3; return y*np.minimum(1,np.minimum(t/2,(d-t)/2))

def shatter(d=3.0):
    t=T(d); y=lp(noise(len(t)),6000)*np.exp(-t*14)*.9
    for k in range(70):
        st=int((rs.rand()**1.6*1.8)*SR); L=int(SR*(.05+rs.rand()*.12)); f=1800+rs.rand()*4200; tl=np.arange(L)/SR
        seg_=np.sin(2*np.pi*f*tl)*np.exp(-tl*(25+rs.rand()*30))*(.15+rs.rand()*.3)
        if st+L<len(y): y[st:st+L]+=seg_
    return y
def ticks(d,period=1.0):
    t=T(d); y=np.zeros(len(t))
    for i,b in enumerate(np.arange(.3,d-.3,period)):
        k=int(b*SR); tl=np.arange(int(.06*SR))/SR; f=1300 if i%2==0 else 1000
        y[k:k+len(tl)]+=(np.sin(2*np.pi*f*tl)*np.exp(-tl*90)+.5*lp(noise(len(tl)),3500)*np.exp(-tl*70))
    return y
def ping(d=.5): t=T(d); return np.sin(2*np.pi*1900*t)*np.exp(-t*9)+.4*np.sin(2*np.pi*3800*t)*np.exp(-t*14)
def desing(d=1.6):
    t=T(d); s=t/d; f=1800*np.exp(-s*3.2)+120; ph=2*np.pi*np.cumsum(f)/SR; y=np.sin(ph)*.6+lp(noise(len(t)),4000)*.5*np.sin(np.pi*s)
    return y*np.sin(np.pi*np.clip(s,0,1))**.6
def quantumhum(d):
    t=T(d); y=np.sin(2*np.pi*(55)*t)*.5+np.sin(2*np.pi*110.7*t)*.3+np.sin(2*np.pi*(440+30*np.sin(t*7))*t)*.07+lp(noise(len(t)),400)*.2*(.6+.4*np.sin(t*11))
    return y*np.minimum(1,np.minimum(t/2,(d-t)/2.5))
files={}
def put(n,x,peak=.9): save(n,x,peak); files[n]=len(x)/SR
put('sfx-whoosh.wav',whoosh(1.1),.8); put('sfx-boom.wav',boom(),.9); put('sfx-shimmer.wav',shimmer(),.7); put('sfx-zap.wav',zap(),.8)
put('sfx-desing.wav',desing(),.8); put('sfx-qhum.wav',quantumhum(29.0),.8); put('sfx-detak.wav',ticks(28.0),.75); put('sfx-pecah.wav',shatter(),.9)
put('sfx-ping.wav',ping(),.7); put('sfx-bell.wav',bell(),.7); put('sfx-bell-hi.wav',bell(3.5,659.25),.6); put('sfx-hum.wav',hum(30,48),.7); put('sfx-wind.wav',hall(14),.5)
DUR=178; N=int(SR*DUR); M=np.zeros(N); tt=np.arange(N)/SR
n=lambda m:440*2**((m-69)/12)
def pad(freqs,amp,det=.004):
    y=np.zeros(N)
    for i,f in enumerate(freqs):
        for d in (-det,0,det):
            y+=np.sin(2*np.pi*f*(1+d)*tt+i*1.3)*(1/(1+i*.25)); y+=.3*np.sin(2*np.pi*2*f*(1+d)*tt+i)*(1/(1+i*.35))
    return y*(.8+.2*np.sin(2*np.pi*tt/9+1))*amp
def win(a,b,fade=3.0): return np.clip((tt-a)/fade,0,1)*np.clip((b-tt)/fade,0,1)
def seg(a,b,freqs,amp,fade=3.0,det=.004):
    global M
    M+=pad(freqs,amp,det)*win(a,b,fade)
seg(0,16,[n(45),n(52),n(57),n(60)],.5)
seg(13,47,[n(41),n(48),n(53),n(57),n(60)],.55)
seg(44,75,[n(38),n(45),n(50),n(53),n(58)],.55,det=.008)
seg(72,104,[n(36),n(43),n(48),n(55),n(58)],.6,det=.012)
seg(101,133,[n(38),n(45),n(52),n(55),n(60)],.6)
seg(130,161,[n(36),n(43),n(50),n(55),n(62)],.6,det=.006)
seg(158,179,[n(45),n(52),n(57),n(61),n(64),n(69)],.75,fade=4)
for bt,m in [(160.1,76),(164.0,81),(168.2,85),(172.5,88)]:
    k=int(bt*SR); L=min(int(3.5*SR),N-k); tl=np.arange(L)/SR; M[k:k+L]+=np.sin(2*np.pi*n(m)*tl)*np.exp(-tl*1.3)*.3
duck=np.ones(N)
for a,b,lv in [(35.9,38.7,.06)]:
    duck*=1-(1-lv)*np.clip((tt-a)/.2,0,1)*np.clip((b-tt)/.8,0,1)
M=lp(M*duck,5200); M*=np.minimum(1,tt/3)*np.minimum(1,(DUR-tt)/3.5)
save('music.wav',M,.8)
S=lambda a,s,v: {"src":"assets/audio/"+s,"at":a,"vol":v}
sfx=[S(.3,'sfx-boom.wav',.3),S(17.4,'sfx-desing.wav',.45),S(23.2,'sfx-desing.wav',.4),S(25.4,'sfx-desing.wav',.4),S(29.6,'sfx-desing.wav',.4),S(34.0,'sfx-desing.wav',.45),
 S(44.5,'sfx-whoosh.wav',.4),S(49.4,'sfx-shimmer.wav',.25),S(72.5,'sfx-whoosh.wav',.4),S(73.5,'sfx-qhum.wav',.3),S(84.9,'sfx-zap.wav',.4),S(86.5,'sfx-shimmer.wav',.3),
 S(101.5,'sfx-whoosh.wav',.4),S(102.5,'sfx-detak.wav',.25),S(119.0,'sfx-pecah.wav',.7),S(130.4,'sfx-whoosh.wav',.4),S(137.6,'sfx-detak.wav',.22),S(150.8,'sfx-ping.wav',.4),S(152.8,'sfx-ping.wav',.3),
 S(158.8,'sfx-whoosh.wav',.4),S(160.1,'sfx-hum.wav',.12)]
json.dump({"vo":[],"sfx":sfx,"music":{"src":"assets/audio/music.wav","vol":.5}},open('.mc_audio.json','w'))
print('ok',files)
