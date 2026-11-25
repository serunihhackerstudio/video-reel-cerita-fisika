import sys,wave,numpy as np
def f0(p):
    w=wave.open(p);x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float);sr=w.getframerate();v=[]
    for i in range(0,len(x)-2048,1200):
        s=x[i:i+2048]
        if s.std()<500: continue
        s=s-s.mean();a=np.correlate(s,s,'full')[2047:];lo,hi=int(sr/300),int(sr/70);k=a[lo:hi].argmax()+lo
        if a[k]/a[0]>.4:v.append(sr/k)
    return round(float(np.median(v)),1)
print([f0(p) for p in sys.argv[1:]])
