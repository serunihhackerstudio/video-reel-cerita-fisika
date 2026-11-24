import wave, math, random, struct, os
SR=24000
os.makedirs('higgs/assets/audio',exist_ok=True)
def save(name,x):
    m=max(1e-9,max(abs(v) for v in x));x=[v/m*.9 for v in x]
    with wave.open('higgs/assets/audio/'+name,'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(b''.join(struct.pack('<h',int(v*32767)) for v in x))
def env(i,n,a=.02,r=.5):
    t=i/n
    return min(1,t/a)*(1-t)**(1/r*1.0) if r else 1
random.seed(4)
# whoosh: noise dengan lowpass yang menyapu naik-turun
n=int(SR*.9);y=0;o=[]
for i in range(n):
    t=i/n;k=.02+.35*math.sin(math.pi*t)**1.5;y+=k*(random.uniform(-1,1)-y);o.append(y*math.sin(math.pi*t)**1.3)
save('sfx-whoosh.wav',o)
# tik halus
n=int(SR*.09);o=[math.sin(2*math.pi*1500*i/SR)*math.exp(-i/n*7)+.4*math.sin(2*math.pi*2250*i/SR)*math.exp(-i/n*9) for i in range(n)]
save('sfx-tik.wav',o)
# zap lembut: dentuman rendah + kilau
n=int(SR*.9);o=[]
for i in range(n):
    t=i/SR;e=math.exp(-t*5)
    o.append(math.sin(2*math.pi*(90-50*min(1,t*3))*t)*e*1.0+.35*math.sin(2*math.pi*(1800+2400*t)*t)*math.exp(-t*9)+.12*random.uniform(-1,1)*math.exp(-t*14))
save('sfx-zap.wav',o)
# dengung turbin naik
n=int(SR*3.6);o=[]
for i in range(n):
    t=i/SR;f=55+55*min(1,t/2.4);ph=2*math.pi*f*t
    e=min(1,t/.6)*(1 if t<3 else (3.6-t)/.6)
    o.append((math.sin(ph)+.5*math.sin(2*ph)+.25*math.sin(3*ph)+.05*random.uniform(-1,1))*e)
save('sfx-hum.wav',o)
# zing listrik
n=int(SR*.8);o=[]
for i in range(n):
    t=i/SR;e=math.exp(-t*4.5)*min(1,t/.01)
    o.append((math.sin(2*math.pi*(900+2600*t)*t)+.5*math.sin(2*math.pi*(1350+3900*t)*t))*e*(.6+.4*math.sin(2*math.pi*38*t))+.1*random.uniform(-1,1)*e)
save('sfx-zing.wav',o)
# desis uap: noise highpass
n=int(SR*1.6);o=[];p=0
for i in range(n):
    t=i/n;v=random.uniform(-1,1);h=v-p;p=v*.6+p*.4;o.append(h*math.sin(math.pi*t)**1.2)
save('sfx-hiss.wav',o)
print(os.listdir('higgs/assets/audio'))
