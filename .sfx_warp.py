import numpy as np, wave, os, json
from scipy.signal import lfilter
SR=24000
D='warp/assets/audio'; os.makedirs(D,exist_ok=True)
rs=np.random.RandomState(7)
def save(name,x,peak=.9):
    x=np.asarray(x,dtype=np.float64); m=max(1e-9,np.abs(x).max()); x=x/m*peak
    with wave.open(f'{D}/{name}','wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype('<i2').tobytes())
def T(d): return np.arange(int(SR*d))/SR
def lp(x,fc):
    a=1-np.exp(-2*np.pi*fc/SR); return lfilter([a],[1,-(1-a)],x)
def noise(n): return rs.uniform(-1,1,n)
def whoosh(d,peak=.5,f0=300,f1=3500):
    t=T(d); n=noise(len(t)); s=np.clip(t/d,0,1); k=np.sin(np.pi*s)**1.6
    lo=lp(n,f0); hi=lp(n,f1); y=lo*(1-s)+hi*s; return y*k
def boom(d=2.2,f0=95,f1=32):
    t=T(d); ph=2*np.pi*np.cumsum(f1+(f0-f1)*np.exp(-t*5))/SR; y=np.sin(ph)*np.exp(-t*2.2); y+=lp(noise(len(t)),220)*np.exp(-t*6)*.8; return y
def shimmer(d=2.0,base=880):
    t=T(d); y=np.zeros(len(t))
    for i,m in enumerate([1,1.5,2,2.5,3,4]): y+=np.sin(2*np.pi*base*m*t*(1+.02*np.sin(t*3+i)))*np.exp(-t*(2+i*.6))/(i+1)
    return y*np.minimum(1,t/.02)
def zap(d=.9):
    t=T(d); e=np.exp(-t*5); y=np.sin(2*np.pi*(90-50*np.minimum(1,t*3))*t)*e+.35*np.sin(2*np.pi*(1800+2400*t)*t)*np.exp(-t*9)+.1*noise(len(t))*np.exp(-t*14); return y
def riser(d=9.0):
    t=T(d); s=t/d; f=200*(1+s**2.2*6); ph=2*np.pi*np.cumsum(f)/SR; y=np.sin(ph)*.5+np.sin(ph*1.5)*.3
    nz_=noise(len(t)); n=(lp(nz_,700)*(1-s)+lp(nz_,5500)*s)*s; return (y*.6+n*.8)*(s**1.6)
def hum(d,f=55):
    t=T(d); y=np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*2*f*t)+.25*np.sin(2*np.pi*3*f*t)+.04*noise(len(t)); return y*(.75+.25*np.sin(2*np.pi*t/5))*np.minimum(1,np.minimum(t/1.2,(d-t)/1.5))
def warpHum(d):
    t=T(d); n=lp(noise(len(t)),900)*.7; y=np.sin(2*np.pi*70*t)*.7+np.sin(2*np.pi*140.5*t)*.3+n*(1+.4*np.sin(2*np.pi*t*.6))
    return y*np.minimum(1,np.minimum(t/1.5,(d-t)/1.8))
def heart(d,bpm=48):
    t=T(d); y=np.zeros(len(t)); per=60/bpm
    for b in np.arange(0.2,d-1,per):
        for off,amp in [(0,1),(.28,.7)]:
            i=int((b+off)*SR); tt=T(.45); th=np.sin(2*np.pi*(62-25*tt/.45)*tt)*np.exp(-tt*9)*amp; y[i:i+len(tt)]+=th[:len(y)-i]
    return y*np.minimum(1,np.minimum(t/2,(d-t)/2))
def burst(d=4.0):
    t=T(d); y=boom(d,120,28)*1.0+lp(noise(len(t)),2500)*np.exp(-t*2.2)*.9+np.sin(2*np.pi*(900+1500*np.exp(-t*3))*t)*np.exp(-t*6)*.2; return y
def bell(d=3.0,base=523.25):
    t=T(d); y=np.zeros(len(t))
    for m,a in [(1,1),(2.01,.45),(3.02,.25),(4.2,.12)]: y+=np.sin(2*np.pi*base*m*t)*np.exp(-t*(1.2+m*.5))*a
    return y*np.minimum(1,t/.01)
def tick(): t=T(.09); return np.sin(2*np.pi*1500*t)*np.exp(-t*70)+.4*np.sin(2*np.pi*2250*t)*np.exp(-t*90)
files={}
def put(n,x,peak=.9): save(n,x,peak); files[n]=len(x)/SR
put('sfx-whoosh.wav',whoosh(1.1),.8); put('sfx-whoosh-long.wav',whoosh(3.6,f0=200,f1=5000),.9)
put('sfx-boom.wav',boom(),.9); put('sfx-shimmer.wav',shimmer(),.7); put('sfx-zap.wav',zap(),.8)
put('sfx-riser.wav',riser(9.0),.85); put('sfx-hum26.wav',hum(26.5),.8); put('sfx-warphum.wav',warpHum(19.0),.8)
put('sfx-heart.wav',heart(31.0),.8); put('sfx-burst.wav',burst(),.95); put('sfx-bell.wav',bell(),.7); put('sfx-tik.wav',tick(),.8)
put('sfx-bell-hi.wav',bell(3.5,783.99),.6)
# ---- musik ambient 180 dtk ----
DUR=180; N=int(SR*DUR); M=np.zeros(N); tt=np.arange(N)/SR
def pad(freqs,amp,det=.004):
    y=np.zeros(N)
    for i,f in enumerate(freqs):
        for d in (-det,0,det):
            y+=np.sin(2*np.pi*f*(1+d)*tt+i*1.3)*(1/(1+i*.25))
            y+=.3*np.sin(2*np.pi*2*f*(1+d)*tt+i)*(1/(1+i*.35))
    y*= (.8+.2*np.sin(2*np.pi*tt/9+1))
    return y*amp
def win(a,b,fade=3.0): return np.clip((tt-a)/fade,0,1)*np.clip((b-tt)/fade,0,1)
def seg(a,b,freqs,amp,fade=3.0,det=.004):
    global M
    y=pad(freqs,amp,det); M+=y*win(a,b,fade)*1.0
n=lambda m:440*2**((m-69)/12)
# 0-14 Am, 14-43 Fmaj7, 43-70 Am9 (pulsa), 70-91 Dsus, 91-125 naik, 125-157 gelap, 157-180 hangat
seg(0,16,[n(45),n(52),n(57),n(60)],.5)
seg(13,45,[n(41),n(48),n(57),n(64),n(69)],.55)
seg(42,72,[n(45),n(52),n(59),n(64),n(67)],.55)
seg(69,93,[n(38),n(45),n(52),n(57),n(66)],.6)
seg(90,101,[n(36),n(48),n(52),n(55),n(64)],.75); seg(99,110,[n(43),n(55),n(59),n(62),n(67)],.85); seg(108,118,[n(45),n(57),n(60),n(64),n(72)],.95); seg(116,127,[n(41),n(53),n(57),n(60),n(69)],.85)
seg(124,159,[n(26),n(33),n(39),n(45)],.7,det=.012)
seg(156,181,[n(38),n(50),n(54),n(57),n(61),n(66)],.75,fade=4)
# arpeggio berkilau di puncak (babak 5)
for i,bt in enumerate(np.arange(95,123,.5)):
    f=n([69,72,76,79,81,79,76,72][i%8]); k=int(bt*SR); L=int(.9*SR); tl=np.arange(L)/SR
    env=np.exp(-tl*4)*(.18+.5*np.clip((bt-95)/12,0,1)*np.clip((124-bt)/6,0,1)); M[k:k+L]+=np.sin(2*np.pi*f*tl)*env
# denyut tegang babak 3
for bt in np.arange(44,69,.75):
    k=int(bt*SR); L=int(.4*SR); tl=np.arange(L)/SR; M[k:k+L]+=np.sin(2*np.pi*n(33)*tl)*np.exp(-tl*8)*.5
# bel harapan babak 7
for bt,m in [(160,81),(166,84),(172,88),(176.4,91)]:
    k=int(bt*SR); L=int(3.5*SR); tl=np.arange(L)/SR; M[k:k+L]+=np.sin(2*np.pi*n(m)*tl)*np.exp(-tl*1.3)*.32
# hening di luar angkasa: musik turun sebentar
duck=np.ones(N)
for a,b,lv in [(113.4,115.4,.12),(156.3,158.3,.12)]:
    duck*=1-(1-lv)*np.clip((tt-a)/.4,0,1)*np.clip((b-tt)/.6,0,1)
M=lp(M*duck,5200)
env=np.minimum(1,tt/3)*np.minimum(1,(DUR-tt)/3.5)
# kenaikan volume menuju babak 5
vol=.55+.45*np.exp(-((tt-110)/14)**2)
M=M*env*vol
save('music.wav',M,.8)
S=lambda a,s,v: {"src":"assets/audio/"+s,"at":a,"vol":v}
sfx=[S(.3,'sfx-boom.wav',.5),S(.6,'sfx-whoosh.wav',.3),S(13.4,'sfx-whoosh.wav',.45),S(19.0,'sfx-whoosh-long.wav',.3),S(23.0,'sfx-whoosh.wav',.3),S(28.6,'sfx-shimmer.wav',.3),
 S(36.0,'sfx-whoosh.wav',.45),S(37.0,'sfx-shimmer.wav',.28),S(42.4,'sfx-whoosh.wav',.45),
 S(43.5,'sfx-hum26.wav',.22),S(49.5,'sfx-zap.wav',.45),S(53.8,'sfx-riser.wav',.38),S(62.8,'sfx-boom.wav',.5),S(68.9,'sfx-whoosh.wav',.45),
 S(73.6,'sfx-boom.wav',.3),S(76.0,'sfx-shimmer.wav',.28),S(85.0,'sfx-zap.wav',.3),
 S(98.7,'sfx-shimmer.wav',.4),S(104.4,'sfx-whoosh-long.wav',.7),S(105.0,'sfx-warphum.wav',.3),S(124.4,'sfx-whoosh.wav',.5),
 S(125.5,'sfx-heart.wav',.42),S(129.0,'sfx-shimmer.wav',.2),S(149.0,'sfx-zap.wav',.28),S(150.4,'sfx-zap.wav',.28),S(151.7,'sfx-zap.wav',.3),S(152.3,'sfx-whoosh.wav',.35),
 S(153.3,'sfx-burst.wav',.8),S(156.3,'sfx-whoosh.wav',.4),S(172.1,'sfx-bell.wav',.3),S(176.4,'sfx-bell-hi.wav',.4)]
json.dump({"vo":[],"sfx":sfx,"music":{"src":"assets/audio/music.wav","vol":.5}},open('.warp_audio.json','w'))
print('ok',files)
