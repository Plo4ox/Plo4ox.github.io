import{j as d,S as F,a as e,b as h,T as y,F as V,L as M,I as A,C as G,c as K,H as T,V as k,B,d as l,e as q}from"./@chakra-ui-6ea5481b.js";import{r as m}from"./react-0891d0e1.js";import{c as Y}from"./react-dom-6a7176d3.js";import{u as $,R as J}from"./react-router-3259c4e2.js";import{c as Q}from"./react-router-dom-57d8ffce.js";import"./lodash.mergewith-050eac49.js";import"./copy-to-clipboard-725317a4.js";import"./@emotion-1284f4b6.js";import"./hoist-non-react-statics-d23de475.js";import"./react-is-3e8633c1.js";import"./@babel-98964cd2.js";import"./stylis-581c9ed0.js";import"./color2k-69f3754e.js";import"./framer-motion-d5040ccd.js";import"./hey-listen-f307a282.js";import"./react-fast-compare-8dea2db9.js";import"./scheduler-04ce0582.js";import"./@remix-run-2b57a640.js";(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&f(g)}).observe(document,{childList:!0,subtree:!0});function S(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function f(t){if(t.ep)return;t.ep=!0;const i=S(t);fetch(t.href,i)}})();function E(){return d(F,{w:"100%",columns:[1,2,3,4],spacing:4,maxWidth:"1170px",children:[e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(h,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}})]})}function x({level:r,color:p,onClick:S,selected:f,selectable:t=!0,minW:i,marginBottom:g=0}){return e(y,{height:8,alignSelf:"start",minW:f?32:i,padding:1,backgroundColor:p,overflow:"hidden",textAlign:"center",fontWeight:f?"bold":"normal",onClick:S,sx:{borderRadius:"8px"},_hover:{fontWeight:t?"bold":"normal"},children:r})}function U(){return e(V,{justify:"center",align:"center",height:82,children:e(M,{bg:"transparent",color:"white",p:5,href:"/",_hover:{borderBottomWidth:0},children:e(A,{src:"/res/logo.png",alt:"Bull Level logo",boxSize:82,position:"relative"})})})}const b=["gray.600","teal.600","blue.600","purple.600","orange.600","yellow.600"];function X(r){switch(!0){case r>=20:return b[5];case r>=15:return b[4];case r>=10:return b[3];case r>=5:return b[2];case r>0:return b[1];default:return b[0]}}function Z({data:r}){return e(G,{maxW:"sm",variant:"outline",children:d(K,{children:[d(T,{marginBottom:2,justifyContent:"space-between",children:[e(x,{level:r.level,color:X(r.level),minW:8,selectable:!1}),d(y,{textAlign:"right",children:["#",r.token_id]})]}),e(k,{children:e(A,{src:r.image_preview_url,objectFit:"cover",alt:"Bulliever NFT",borderRadius:"lg"})})]})})}const a={All:0,VeryLow:1,Low:2,Medium:3,High:4,VeryHigh:5};function ee(){const[r,p]=m.useState([]),[S,f]=m.useState({}),[t,i]=m.useState([]),[g,R]=m.useState(!0),[o,I]=m.useState(0),[v,_]=m.useState(a.All),C=m.useRef(null);async function D(){const u=await(await fetch("https://bulllevel.plo4ox.repl.co/bullLevel/all")).json();await j(u,0,20),f(u)}async function j(c,u,L){var W=Object.keys(c).filter(s=>c[s].level>=u&&c[s].level<=L).map(s=>[s,c[s]]);W.sort((s,H)=>H[1].level-s[1].level==0?s[1].token_id-H[1].token_id:H[1].level-s[1].level);const O=W.map(s=>s[0]),z=O.map((s,H)=>e(Z,{data:c[s]},s));I(0),p(O),i(z),R(!1)}async function w(c,u,L){g==!1&&(_(c),R(!0),setTimeout(()=>{j(S,u,L)},500))}function n(c,u=1e3){return t.slice(c,c+u)}const N=()=>{const c=C.current.scrollHeight,u=C.current.scrollTop,L=C.current.clientHeight;c-(u+L)<1e3&&I(P())};function P(){return o<1e3?o+200:o+1e3}return m.useEffect(()=>{D()},[]),d(B,{maxH:"100vh",w:"100vw",paddingStart:4,paddingEnd:4,overflowY:"scroll",onScroll:N,ref:C,children:[e(U,{}),d(T,{justify:"center",align:"center",wrap:"wrap",paddingBottom:4,children:[e(x,{level:"ALL",color:getColor(0),minW:10,onClick:()=>{w(a.All,0,20)},selected:v==a.All}),e(x,{level:"1-4",color:getColor(1),minW:12,onClick:()=>{w(a.VeryLow,1,4)},selected:v==a.VeryLow}),e(x,{level:"5-9",color:getColor(5),minW:12,onClick:()=>{w(a.Low,5,9)},selected:v==a.Low}),e(x,{level:"10-14",color:getColor(10),minW:14,onClick:()=>{w(a.Medium,10,14)},selected:v==a.Medium}),e(x,{level:"15-19",color:getColor(15),minW:14,onClick:()=>{w(a.High,15,19)},selected:v==a.High}),e(x,{level:"20",color:getColor(20),minW:10,onClick:()=>{w(a.VeryHigh,20,20)},selected:v==a.VeryHigh})]}),e(B,{children:e(V,{w:"100%",flexDirection:"column",alignItems:"center",marginBottom:16,children:g?e(E,{}):r.length>0?d(l,{children:[d(F,{w:"100%",columns:[1,2,3,4],spacing:4,marginBottom:4,maxWidth:"1170px",children:[o>=0?n(0,200):e(l,{}),o>=200?n(200,400):e(l,{}),o>=400?n(400,600):e(l,{}),o>=600?n(600,800):e(l,{}),o>=800?n(800,1e3):e(l,{}),o>=1e3?n(1e3):e(l,{}),o>=2e3?n(2e3):e(l,{}),o>=3e3?n(3e3):e(l,{}),o>=4e3?n(4e3):e(l,{}),o>=5e3?n(5e3):e(l,{}),o>=6e3?n(6e3):e(l,{}),o>=7e3?n(7e3):e(l,{}),o>=8e3?n(8e3):e(l,{}),o>=9e3?n(9e3):e(l,{})]}),o<r.length-1e3?e(E,{}):e(l,{})]}):e(y,{children:"No bulls found..."})})})]})}function re(){const r=$();return e(B,{w:"100vw",mt:8,children:d(k,{spacing:4,children:[e(A,{src:"/res/logo.png",alt:"ArtPug logo",boxSize:82,position:"relative"}),d(k,{spacing:2,children:[e(y,{as:"b",fontSize:"xl",children:"Ooops!"}),e(y,{fontSize:"l",children:"Sorry, an unexpected error has occurred."})]}),e(y,{as:"i",fontSize:"md",color:"rgb(212,136,155, 1)",children:r.statusText||r.message})]})})}const te=Q([{path:"/",element:e(ee,{}),errorElement:e(re,{})}]);Y.createRoot(document.getElementById("root")).render(d(q,{children:[localStorage.setItem("chakra-ui-color-mode","dark"),e(J,{router:te})]}));
