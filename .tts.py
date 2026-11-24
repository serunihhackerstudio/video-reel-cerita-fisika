import asyncio, json, edge_tts, sys
T=["Kenapa nuklir bisa menghasilkan listrik? Kita bongkar pembangkitnya dari dalam. Rahasianya ada di dalam reaktor.",
"Di dalam reaktor, atom uranium ditabrak neutron lalu terbelah. Inilah pembelahan, atau fisi, dan ia melepas panas yang sangat besar.",
"Panas itu memanaskan air bertekanan di bejana reaktor. Airnya sangat panas, tapi tidak mendidih.",
"Air panas ini mengalir ke generator uap, dan memanaskan air kedua sampai menjadi uap.",
"Uap memutar turbin, turbin memutar generator, dan listrik pun tercipta. Lalu dialirkan lewat tiang transmisi.",
"Uapnya didinginkan di menara pendingin, lalu dipakai lagi. Begitu terus, tanpa henti."]
async def main():
    out=[]
    for i,t in enumerate(T,1):
        c=edge_tts.Communicate(t,"id-ID-ArdiNeural",rate="+0%",boundary="WordBoundary")
        w=[]
        with open(f"assets/audio/vo-{i:02d}.mp3","wb") as f:
            async for ch in c.stream():
                if ch["type"]=="audio": f.write(ch["data"])
                elif ch["type"]=="WordBoundary": w.append([ch["text"],ch["offset"]/1e7,(ch["offset"]+ch["duration"])/1e7])
        out.append({"teks":t,"kata":w})
    json.dump(out,open("../.tts.json","w"),ensure_ascii=False)
    for i,o in enumerate(out,1): print(i,len(o["kata"]),o["kata"][-1][2] if o["kata"] else None)
asyncio.run(main())
