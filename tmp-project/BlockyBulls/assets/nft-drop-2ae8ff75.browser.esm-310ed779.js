var f=Object.defineProperty;var C=(p,s,t)=>s in p?f(p,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[s]=t;var n=(p,s,t)=>(C(p,typeof s!="symbol"?s+"":s,t),t);import{D as m}from"./QueryParams-331869f0.browser.esm-bdb0afc8.js";import{N as w,a as W,A,b as T,R as y,c as b,e as S,G as R,d as E,S as k,B as i,f as N,h as v,i as o,T as d}from"./index-9c8b7b5f.js";import{C as I}from"./contract-interceptor-d7b164a7.browser.esm-7eabd2ea.js";import{C as U,D as x,a as O}from"./contract-owner-6bd53fa5.browser.esm-3bb06661.js";import{C as F}from"./contract-platform-fee-496d2017.browser.esm-1772ba33.js";import{C as M}from"./contract-roles-c8371064.browser.esm-36f1cc11.js";import{C as _}from"./contract-sales-20393a40.browser.esm-a81d5df9.js";import{D as L}from"./drop-claim-conditions-dd2cc229.browser.esm-cb494446.js";import{S as B}from"./erc-721-standard-46ff08a3.browser.esm-ca7b0de6.js";import{P as D}from"./thirdweb-checkout-e1a6e3e9.browser.esm-0b194c57.js";import"./index-99de6944.js";import"./erc-721-162416df.browser.esm-d436a722.js";const l=class l extends B{constructor(t,r,e){let a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,g=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new W(t,r,c,a,e);super(g,e,h);n(this,"createBatch",o(async(t,r)=>this.erc721.lazyMint.prepare(t,r)));n(this,"claimTo",o((()=>{var t=this;return async function(r,e){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;return t.erc721.claimTo.prepare(r,e,{checkERC20Allowance:a})}})()));n(this,"claim",o((()=>{var t=this;return async function(r){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.claimTo.prepare(await t.contractWrapper.getSignerAddress(),r,e)}})()));n(this,"burn",o(async t=>this.erc721.burn.prepare(t)));n(this,"transfer",o(async(t,r)=>this.erc721.transfer.prepare(t,r)));n(this,"setApprovalForAll",o(async(t,r)=>this.erc721.setApprovalForAll.prepare(t,r)));n(this,"setApprovalForToken",o(async(t,r)=>d.fromContractWrapper({contractWrapper:this.contractWrapper,method:"approve",args:[t,r]})));this.abi=A.parse(c||[]),this.metadata=new T(this.contractWrapper,y,this.storage),this.app=new b(this.contractWrapper,this.metadata,this.storage),this.roles=new M(this.contractWrapper,l.contractRoles),this.royalties=new U(this.contractWrapper,this.metadata),this.sales=new _(this.contractWrapper),this.claimConditions=new L(this.contractWrapper,this.metadata,this.storage),this.encoder=new S(this.contractWrapper),this.estimator=new R(this.contractWrapper),this.events=new E(this.contractWrapper),this.platformFees=new F(this.contractWrapper),this.revealer=new x(this.contractWrapper,this.storage,k.name,()=>this.erc721.nextTokenIdToMint()),this.interceptor=new I(this.contractWrapper),this.owner=new O(this.contractWrapper),this.checkout=new D(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async totalSupply(){const[t,r]=await Promise.all([this.totalClaimedSupply(),this.totalUnclaimedSupply()]);return t.add(r)}async getAllClaimed(t){const r=i.from((t==null?void 0:t.start)||0).toNumber(),e=i.from((t==null?void 0:t.count)||m).toNumber(),a=Math.min((await this.contractWrapper.read("nextTokenIdToClaim",[])).toNumber(),r+e);return await Promise.all(Array.from(Array(a).keys()).map(c=>this.get(c.toString())))}async getAllUnclaimed(t){const r=i.from((t==null?void 0:t.start)||0).toNumber(),e=i.from((t==null?void 0:t.count)||m).toNumber(),a=i.from(Math.max((await this.contractWrapper.read("nextTokenIdToClaim",[])).toNumber(),r)),c=i.from(Math.min((await this.contractWrapper.read("nextTokenIdToMint",[])).toNumber(),a.toNumber()+e));return await Promise.all(Array.from(Array(c.sub(a).toNumber()).keys()).map(h=>this.erc721.getTokenMetadata(a.add(h).toString())))}async totalClaimedSupply(){return this.erc721.totalClaimedSupply()}async totalUnclaimedSupply(){return this.erc721.totalUnclaimedSupply()}async isTransferRestricted(){return!await this.contractWrapper.read("hasRole",[N("transfer"),v])}async getClaimTransaction(t,r){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;return this.erc721.getClaimTransaction(t,r,{checkERC20Allowance:e})}async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}async prepare(t,r,e){return d.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}};n(l,"contractRoles",w);let u=l;export{u as NFTDrop};
