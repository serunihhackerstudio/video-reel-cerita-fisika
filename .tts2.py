import asyncio, json, edge_tts, os
os.chdir('bom-atom'); os.makedirs('assets/audio',exist_ok=True)
T=["Kenapa bom atom bisa menghasilkan daya ledak yang luar biasa? Kita bongkar sebongkah logam uranium ini, sampai ke dalam atomnya.",
"Dinamit meledak karena atom-atomnya hanya menata ulang ikatan. Pada bom atom, yang berubah adalah inti atomnya sendiri.",
"Satu neutron menumbuk inti uranium tertentu dan membelahnya. Inilah fisi. Ia melepas panas, dan dua atau tiga neutron baru.",
"Neutron baru membelah inti lain, lalu berlipat ganda dalam sekejap. Inilah reaksi berantai.",
"Saat membelah, sebagian kecil massa inti hilang, dan berubah jadi energi. Rumusnya, E sama dengan m c kuadrat. Karena c kuadrat angkanya sangat besar, massa sedikit pun jadi energi luar biasa.",
"Energi sebesar itu terlepas dalam waktu sangat singkat. Itulah bedanya dengan pembangkit listrik tenaga nuklir, yang reaksinya dikendalikan pelan-pelan."]
async def main():
    out=[]
    for i,t in enumerate(T,1):
        c=edge_tts.Communicate(t,"id-ID-ArdiNeural",rate="+16%",boundary="WordBoundary")
        w=[]
        with open(f"assets/audio/vo-{i:02d}.mp3","wb") as f:
            async for ch in c.stream():
                if ch["type"]=="audio": f.write(ch["data"])
                elif ch["type"]=="WordBoundary": w.append([ch["text"],ch["offset"]/1e7,(ch["offset"]+ch["duration"])/1e7])
        out.append({"teks":t,"kata":w})
    json.dump(out,open("../.tts2.json","w"),ensure_ascii=False)
    st=.3
    for i,o in enumerate(out,1):
        toks=o["teks"].split();print(i,len(toks),len(o["kata"]),'start',round(st,2),'end',round(st+o["kata"][-1][2],2))
        print('   ',' '.join("%s@%.2f"%(w,st+a) for w,a,b in o["kata"]))
        st+=o["kata"][-1][2]+.4
asyncio.run(main())
