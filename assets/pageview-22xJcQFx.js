import{a5 as r}from"./app-HHaGRXeI.js";var t={provider:"Waline",dark:"auto",requiredMeta:["nick"],serverURL:"https://comment.yzketx.online/",emoji:["//unpkg.com/@waline/emojis@1.2.0/alus","//unpkg.com/@waline/emojis@1.2.0/bilibili","//unpkg.com/@waline/emojis@1.2.0/tw-emoji"]};const a=async()=>{try{const{pageviewCount:e}=await r(()=>import("./app-HHaGRXeI.js").then(i=>i.a6),__vite__mapDeps([]));return e({serverURL:t.serverURL})}catch{console.error("@waline/client is not installed!");return}};export{a as updatePageview};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}