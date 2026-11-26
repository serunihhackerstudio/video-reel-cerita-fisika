import asyncio, json, edge_tts, sys, os
proy,inp,out,rate=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
T=json.load(open(inp,encoding='utf-8'))
os.makedirs(proy+'/assets/audio',exist_ok=True)
async def main():
    res=[]
    for i,t in enumerate(T,1):
        c=edge_tts.Communicate(t,"id-ID-ArdiNeural",rate=rate,boundary="WordBoundary")
        w=[]
        with open(f"{proy}/assets/audio/vo-{i:02d}.mp3","wb") as f:
            async for ch in c.stream():
                if ch["type"]=="audio": f.write(ch["data"])
                elif ch["type"]=="WordBoundary": w.append([ch["text"],ch["offset"]/1e7,(ch["offset"]+ch["duration"])/1e7])
        res.append({"teks":t,"kata":w})
    json.dump(res,open(out,"w",encoding="utf-8"),ensure_ascii=False)
    st=.3
    for i,o in enumerate(res,1):
        n=len(o["teks"].split());print(i,n,len(o["kata"]),'start',round(st,2),'end',round(st+o["kata"][-1][2],2));st+=o["kata"][-1][2]+.4
asyncio.run(main())
