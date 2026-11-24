"""TTS gratis (edge-tts) + waktu per kata. Pakai: python tts_edge.py <proyek> teks.json [rate]
teks.json = ["kalimat adegan 1", "kalimat adegan 2", ...]. Hasil: <proyek>/assets/audio/vo-NN.mp3 dan <proyek>/../.tts.json
Cetak jam mulai tiap klip (jeda 0,4 dtk antar klip, mulai 0,3 dtk) dan waktu tiap kata (detik layar)."""
import asyncio, json, os, sys, edge_tts
proyek=sys.argv[1]; T=json.load(open(sys.argv[2],encoding='utf-8')); rate=sys.argv[3] if len(sys.argv)>3 else "+16%"
os.makedirs(proyek+'/assets/audio',exist_ok=True)
async def main():
    out=[]
    for i,t in enumerate(T,1):
        c=edge_tts.Communicate(t,"id-ID-ArdiNeural",rate=rate,boundary="WordBoundary");w=[]
        with open(f"{proyek}/assets/audio/vo-{i:02d}.mp3","wb") as f:
            async for ch in c.stream():
                if ch["type"]=="audio": f.write(ch["data"])
                elif ch["type"]=="WordBoundary": w.append([ch["text"],ch["offset"]/1e7,(ch["offset"]+ch["duration"])/1e7])
        out.append({"teks":t,"kata":w})
    json.dump(out,open(proyek+"/tts.json","w"),ensure_ascii=False)
    st=.3
    for i,o in enumerate(out,1):
        print(i,len(o["teks"].split()),len(o["kata"]),'mulai',round(st,2),'selesai',round(st+o["kata"][-1][2],2))
        print('   ',' '.join("%s@%.2f"%(w,st+a) for w,a,b in o["kata"])); st+=o["kata"][-1][2]+.4
asyncio.run(main())
