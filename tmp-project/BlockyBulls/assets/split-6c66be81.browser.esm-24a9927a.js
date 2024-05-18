var R=Object.defineProperty;var b=(i,t,e)=>t in i?R(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var c=(i,t,e)=>(b(i,typeof t!="symbol"?t+"":t,e),e);import{a6 as v,a as A,A as C,b as P,a7 as T,c as _,e as O,G as k,d as S,B as m,r as n,z as E,E as I,x as B,i as l,T as o}from"./index-9c8b7b5f.js";import{C as N}from"./contract-interceptor-d7b164a7.browser.esm-7eabd2ea.js";import{C as x}from"./contract-roles-c8371064.browser.esm-36f1cc11.js";const h=class h{constructor(t,e,a){c(this,"withdraw",l(async t=>o.fromContractWrapper({contractWrapper:this.contractWrapper,method:"release(address)",args:[await n(t)]})));c(this,"withdrawToken",l(async(t,e)=>o.fromContractWrapper({contractWrapper:this.contractWrapper,method:"release(address,address)",args:await Promise.all([n(e),n(t)])})));c(this,"distribute",l(async()=>o.fromContractWrapper({contractWrapper:this.contractWrapper,method:"distribute()",args:[]})));c(this,"distributeToken",l(async t=>o.fromContractWrapper({contractWrapper:this.contractWrapper,method:"distribute(address)",args:[await n(t)]})));let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,p=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new A(t,e,s,r,a);this._chainId=p,this.abi=C.parse(s||[]),this.contractWrapper=d,this.storage=a,this.metadata=new P(this.contractWrapper,T,this.storage),this.app=new _(this.contractWrapper,this.metadata,this.storage),this.roles=new x(this.contractWrapper,h.contractRoles),this.encoder=new O(this.contractWrapper),this.estimator=new k(this.contractWrapper),this.events=new S(this.contractWrapper),this.interceptor=new N(this.contractWrapper)}get chainId(){return this._chainId}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async getAllRecipients(){const t=[];let e=m.from(0);const a=await this.contractWrapper.read("payeeCount",[]);for(;e.lt(a);)try{const r=await this.contractWrapper.read("payee",[e]);t.push(await this.getRecipientSplitPercentage(r)),e=e.add(1)}catch(r){if("method"in r&&r.method.toLowerCase().includes("payee(uint256)"))break;throw r}return t}async balanceOfAllRecipients(){const t=await this.getAllRecipients(),e={};for(const a of t)e[a.address]=await this.balanceOf(a.address);return e}async balanceOfTokenAllRecipients(t){const[e,a]=await Promise.all([n(t),this.getAllRecipients()]),r={};for(const s of a)r[s.address]=await this.balanceOfToken(s.address,e);return r}async balanceOf(t){const[e,a,r]=await Promise.all([n(t),this.contractWrapper.getProvider().getBalance(this.getAddress()),this.contractWrapper.read("totalReleased",[])]),s=a.add(r);return this._pendingPayment(e,s,await this.contractWrapper.read("released",[e]))}async balanceOfToken(t,e){const[a,r]=await Promise.all([n(e),n(t)]),s=(await E(()=>import("./index-9c8b7b5f.js").then(y=>y.eN),["./index-9c8b7b5f.js","./index-bc43b06f.css"],import.meta.url)).default,p=new I(a,s,this.contractWrapper.getProvider()),[d,W,g]=await Promise.all([p.balanceOf(this.getAddress()),this.contractWrapper.read("totalReleased",[a]),this.contractWrapper.read("released",[a,r])]),w=d.add(W),f=await this._pendingPayment(r,w,g);return await B(this.contractWrapper.getProvider(),a,f)}async getRecipientSplitPercentage(t){const[e,a,r]=await Promise.all([n(t),this.contractWrapper.read("totalShares",[]),this.contractWrapper.read("shares",[t])]);return{address:e,splitPercentage:r.mul(m.from(1e7)).div(a).toNumber()/1e5}}async _pendingPayment(t,e,a){const[r,s]=await Promise.all([n(t),this.contractWrapper.read("totalShares",[])]);return e.mul(await this.contractWrapper.read("shares",[r])).div(s).sub(a)}async prepare(t,e,a){return o.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:e,overrides:a})}async call(t,e,a){return this.contractWrapper.call(t,e,a)}};c(h,"contractRoles",v);let u=h;export{u as Split};