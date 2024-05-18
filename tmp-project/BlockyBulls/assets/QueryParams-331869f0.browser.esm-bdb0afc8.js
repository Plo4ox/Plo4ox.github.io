import{aZ as E,a_ as m,a$ as d,B as i,aS as h,z as u,E as l,ae as _}from"./index-9c8b7b5f.js";const R=(()=>E("0x80ac58cd"))(),y=(()=>E("0xd9b67a26"))(),w={name:"Failed to load NFT metadata"};async function C(t,a,e){if(a.startsWith("data:application/json;base64")&&typeof m.Buffer<"u"){const o=a.split(",")[1],s=JSON.parse(m.Buffer.from(o,"base64").toString("utf-8"));return d.parse({...s,id:i.from(t).toString(),uri:a})}const r=a.replace("{id}",h(i.from(t).toHexString(),32).slice(2));let n;try{n=await e.downloadJSON(r)}catch{const s=a.replace("{id}",i.from(t).toString());try{n=await e.downloadJSON(s)}catch{console.warn(`failed to get token metadata: ${JSON.stringify({tokenId:t.toString(),tokenUri:a})} -- falling back to default metadata`),n=w}}return d.parse({...n,id:i.from(t).toString(),uri:a})}async function O(t,a,e,r){let n;const o=(await u(()=>import("./IERC165-a27c30d6.js"),[],import.meta.url)).default,s=new l(t,o,a),[p,b]=await Promise.all([s.supportsInterface(R),s.supportsInterface(y)]);if(p){const c=(await u(()=>import("./index-9c8b7b5f.js").then(f=>f.eP),["./index-9c8b7b5f.js","./index-bc43b06f.css"],import.meta.url)).default;n=await new l(t,c,a).tokenURI(e)}else if(b){const c=(await u(()=>import("./index-9c8b7b5f.js").then(f=>f.eR),["./index-9c8b7b5f.js","./index-bc43b06f.css"],import.meta.url)).default;n=await new l(t,c,a).uri(e)}else throw Error("Contract must implement ERC 1155 or ERC 721.");return n?C(e,n,r):d.parse({...w,id:i.from(e).toString(),uri:""})}async function S(t,a){return typeof t=="string"?t:await a.upload(_.parse(t))}async function F(t,a,e,r){if(I(t))return t;if(T(t))return await a.uploadBatch(t.map(o=>_.parse(o)),{rewriteFileNames:{fileStartNumber:e||0},onProgress:r==null?void 0:r.onProgress});throw new Error("NFT metadatas must all be of the same type (all URI or all NFTMetadataInput)")}function A(t){const a=t[0].substring(0,t[0].lastIndexOf("/"));for(let e=0;e<t.length;e++){const r=t[e].substring(0,t[e].lastIndexOf("/"));if(a!==r)throw new Error(`Can only create batches with the same base URI for every entry in the batch. Expected '${a}' but got '${r}'`)}return a.replace(/\/$/,"")+"/"}function I(t){return t.find(a=>typeof a!="string")===void 0}function T(t){return t.find(a=>typeof a!="object")===void 0}const x=100;export{x as D,w as F,R as I,y as a,C as b,F as c,O as f,A as g,S as u};
