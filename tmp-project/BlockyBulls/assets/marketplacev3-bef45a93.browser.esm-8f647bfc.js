var g=Object.defineProperty;var m=(a,t,r)=>t in a?g(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r;var o=(a,t,r)=>(m(a,typeof t!="symbol"?t+"":t,r),r);import{M as f,F as n,H as l,I as W,J as C,a as E,A,b as w,k as I,c as R,e as T,G as F,d as L,T as O,K as i}from"./index-9c8b7b5f.js";import{C as S}from"./contract-interceptor-d7b164a7.browser.esm-7eabd2ea.js";import{C as _}from"./contract-platform-fee-496d2017.browser.esm-1772ba33.js";import{C as b}from"./contract-roles-c8371064.browser.esm-36f1cc11.js";import{M,a as U,b as D}from"./marketplacev3-offers-167fc657.browser.esm-3fc95327.js";import"./cleanCurrencyAddress-c46b1708.browser.esm-8bb67dc2.js";import"./marketplace-e5ac8dc6.browser.esm-5b475a14.js";import"./QueryParams-331869f0.browser.esm-bdb0afc8.js";const s=class s{get directListings(){return n(this.detectDirectListings(),l)}get englishAuctions(){return n(this.detectEnglishAuctions(),W)}get offers(){return n(this.detectOffers(),C)}get chainId(){return this._chainId}constructor(t,r,e){let h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,d=arguments.length>5?arguments[5]:void 0,u=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new E(t,r,c,h,e);this._chainId=d,this.abi=A.parse(c||[]),this.contractWrapper=u,this.storage=e,this.metadata=new w(this.contractWrapper,I,this.storage),this.app=new R(this.contractWrapper,this.metadata,this.storage),this.roles=new b(this.contractWrapper,s.contractRoles),this.encoder=new T(this.contractWrapper),this.estimator=new F(this.contractWrapper),this.events=new L(this.contractWrapper),this.platformFees=new _(this.contractWrapper),this.interceptor=new S(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async prepare(t,r,e){return O.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}detectDirectListings(){if(i(this.contractWrapper,"DirectListings"))return new M(this.contractWrapper,this.storage)}detectEnglishAuctions(){if(i(this.contractWrapper,"EnglishAuctions"))return new U(this.contractWrapper,this.storage)}detectOffers(){if(i(this.contractWrapper,"Offers"))return new D(this.contractWrapper,this.storage)}};o(s,"contractRoles",f);let p=s;export{p as MarketplaceV3};
