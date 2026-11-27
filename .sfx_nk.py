import numpy as np, wave, os, json
from scipy.signal import lfilter
SR=24000
D='bomnuklir/assets/audio'; os.makedirs(D,exist_ok=True)
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
files={}
def put(n,x,peak=.9): save(n,x,peak); files[n]=len(x)/SR
put('sfx-whoosh.wav',whoosh(1.1),.8); put('sfx-boom.wav',boom(),.9); put('sfx-shimmer.wav',shimmer(),.7); put('sfx-zap.wav',zap(),.8)
put('sfx-riser4.wav',riser(4.0),.85); put('sfx-riser6.wav',riser(6.0),.85); put('sfx-atomhum.wav',atomhum(28.0),.8)
put('sfx-explosion.wav',explosion(),.98); put('sfx-rumble.wav',rumble(10.0),.9); put('sfx-thump.wav',thump(),.95); put('sfx-crackle.wav',crackle(12.0),.9)
put('sfx-bell.wav',bell(),.7); put('sfx-bell-hi.wav',bell(3.5,659.25),.6); put('sfx-wind.wav',hall(14),.5); put('sfx-hum.wav',hum(20),.8)
DUR=180; N=int(SR*DUR); M=np.zeros(N); tt=np.arange(N)/SR
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
seg(0,13,[n(38),n(45),n(50),n(53)],.5)                 # Dm, tegang
seg(10,45,[n(36),n(43),n(48),n(51),n(55)],.55)         # dm cluster
seg(42,72,[n(33),n(40),n(46),n(52),n(58)],.6,det=.008)  # misterius
seg(69,102,[n(34),n(41),n(46),n(49),n(58)],.7,det=.01)  # naik
seg(99,133,[n(31),n(38),n(43),n(50),n(55)],.8,det=.014) # sangat tegang
seg(143,160,[n(31),n(38)],.35,det=.006)                 # sepi
seg(158,181,[n(38),n(50),n(54),n(57),n(62)],.7,fade=4)  # hangat D mayor
for bt in np.arange(44,69,1.0):
    k=int(bt*SR); L=int(.5*SR); tl=np.arange(L)/SR; M[k:k+L]+=np.sin(2*np.pi*n(31)*tl)*np.exp(-tl*7)*.4
for bt in np.arange(100,131,.5):
    k=int(bt*SR); L=int(.25*SR); tl=np.arange(L)/SR; M[k:k+L]+=np.sin(2*np.pi*n(43+(int(bt*2)%4)*2)*tl)*np.exp(-tl*12)*.22*np.clip((bt-100)/20,0,1)
for bt,m in [(160.5,74),(166,78),(172.4,81),(176.8,86)]:
    k=int(bt*SR); L=min(int(3.5*SR),N-k); tl=np.arange(L)/SR; M[k:k+L]+=np.sin(2*np.pi*n(m)*tl)*np.exp(-tl*1.3)*.3
duck=np.ones(N)
for a,b,lv in [(132.9,143.0,.04),(143.0,157.5,.18)]:
    duck*=1-(1-lv)*np.clip((tt-a)/.15,0,1)*np.clip((b-tt)/1.2,0,1)
M=lp(M*duck,5200); M*=np.minimum(1,tt/3)*np.minimum(1,(DUR-tt)/3.5)
save('music.wav',M,.8)
S=lambda a,s,v: {"src":"assets/audio/"+s,"at":a,"vol":v}
sfx=[S(.3,'sfx-boom.wav',.4),S(9.5,'sfx-whoosh.wav',.4),S(41.5,'sfx-whoosh.wav',.45),S(69.5,'sfx-whoosh.wav',.45),S(99.5,'sfx-whoosh.wav',.45),S(129.5,'sfx-whoosh.wav',.3),S(159.5,'sfx-whoosh.wav',.4),
 S(16.6,'sfx-zap.wav',.25),S(18.0,'sfx-zap.wav',.2),S(24.0,'sfx-riser4.wav',.35),S(24.9,'sfx-boom.wav',.55),S(25.0,'sfx-shimmer.wav',.35),
 S(42.6,'sfx-atomhum.wav',.28),S(47.8,'sfx-whoosh.wav',.35),S(55.3,'sfx-bell-hi.wav',.15),S(62.2,'sfx-riser4.wav',.4),
 S(73.8,'sfx-bell.wav',.45),S(92.8,'sfx-riser4.wav',.5),S(96.7,'sfx-explosion.wav',.8),
 S(102.9,'sfx-zap.wav',.3),S(105.25,'sfx-boom.wav',.4),S(113.4,'sfx-zap.wav',.3),S(114.0,'sfx-crackle.wav',.55),
 S(133.1,'sfx-explosion.wav',.95),S(137.5,'sfx-rumble.wav',.85),S(141.0,'sfx-thump.wav',.9),S(144.5,'sfx-wind.wav',.25),
 S(161.0,'sfx-hum.wav',.18),S(172.4,'sfx-bell.wav',.3),S(176.8,'sfx-bell-hi.wav',.35)]
json.dump({"vo":[],"sfx":sfx,"music":{"src":"assets/audio/music.wav","vol":.5}},open('.nk_audio.json','w'))
print('ok',files)
