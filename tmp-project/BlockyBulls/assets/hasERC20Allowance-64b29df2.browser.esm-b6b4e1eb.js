import{z as l,a as w}from"./index-9c8b7b5f.js";async function g(e,a,t){const r=e.getProvider(),n=(await l(()=>import("./index-9c8b7b5f.js").then(d=>d.eN),["./index-9c8b7b5f.js","./index-bc43b06f.css"],import.meta.url)).default,s=new w(r,a,n,{},e.storage),o=await e.getSignerAddress(),i=e.address;return(await s.read("allowance",[o,i])).gte(t)}export{g as h};
