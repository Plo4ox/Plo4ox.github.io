import{j as c,S as q,a as e,b as x,T as y,F as M,L as E,I as S,H as B,c as K,C as Y,d as J,V as _,B as Q,D as U,e as z,f as D,g as X,h as n,i as Z}from"./@chakra-ui-9bbce8d3.js";import{r as p}from"./react-0891d0e1.js";import{c as $}from"./react-dom-6a7176d3.js";import{u as ee,R as te}from"./react-router-3259c4e2.js";import{c as re}from"./react-router-dom-57d8ffce.js";import"./lodash.mergewith-050eac49.js";import"./copy-to-clipboard-725317a4.js";import"./@emotion-1284f4b6.js";import"./hoist-non-react-statics-d23de475.js";import"./react-is-3e8633c1.js";import"./@babel-98964cd2.js";import"./stylis-581c9ed0.js";import"./color2k-69f3754e.js";import"./framer-motion-d5040ccd.js";import"./hey-listen-f307a282.js";import"./react-fast-compare-8dea2db9.js";import"./scheduler-04ce0582.js";import"./@remix-run-2b57a640.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))h(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&h(f)}).observe(document,{childList:!0,subtree:!0});function g(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function h(r){if(r.ep)return;r.ep=!0;const i=g(r);fetch(r.href,i)}})();function V(){return c(q,{w:"100%",columns:[1,2,3,4],spacing:4,maxWidth:"1170px",children:[e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}}),e(x,{width:"100%",height:"215px",overflow:"hidden",sx:{borderRadius:"8px"}})]})}function v({level:t,color:u,onClick:g,selected:h,selectable:r=!0,minW:i,marginBottom:f=0}){return e(y,{height:8,alignSelf:"start",minW:h?32:i,padding:1,backgroundColor:u,overflow:"hidden",textAlign:"center",fontWeight:h?"bold":"normal",onClick:g,sx:{borderRadius:"8px"},_hover:{fontWeight:r?"bold":"normal"},children:t})}function oe(){return e(M,{justify:"center",align:"center",height:82,children:e(E,{bg:"transparent",color:"white",p:5,href:"/tmp-project/BullLevel2023/",_hover:{borderBottomWidth:0},children:e(S,{src:"/tmp-project/BullLevel2023/res/logo.png",alt:"Bull Level logo",boxSize:82,position:"relative"})})})}const A=["gray.600","teal.600","blue.600","purple.600","orange.600","yellow.600"];function w(t){switch(!0){case t>=20:return A[5];case t>=15:return A[4];case t>=10:return A[3];case t>=5:return A[2];case t>0:return A[1];default:return A[0]}}function ie({tokenId:t}){const[u,g]=p.useState([]),[h,r]=p.useState(!0);async function i(f,j){const L=await(await fetch("https://api.bullieverse.com/reward/equippedAssets?tokenId="+f+"&collectionAddress=0x329fa32f6520fb67bb3c1fc3a6909beb8239544c")).json();var b=[];L.response.equippedAsset!=null&&L.response.equippedAsset.traits.length>0&&(b=L.response.equippedAsset.traits.map(C=>"https://bullieverse.com/assets/staking/rewards/"+C.name+"/"+C.value+".png")),g(b),r(!1)}return p.useEffect(()=>{i(t)},[]),e(B,{mt:2,children:h?e(K,{size:12}):u.length>0?u.map(f=>e(S,{borderRadius:"full",boxSize:12,src:f,alt:"Asset"})):e(y,{h:12,children:"-"})})}function ne({data:t}){const[u,g]=p.useState(!1);async function h(){g(!0)}return e(Y,{maxW:"sm",variant:"outline",children:c(J,{children:[c(B,{marginBottom:2,justifyContent:"space-between",children:[e(v,{level:t.level,color:w(t.level),minW:8,selectable:!1}),c(y,{textAlign:"right",children:["#",t.token_id]})]}),e(_,{children:e(S,{src:t.image_preview_url,objectFit:"cover",alt:"Bulliever NFT",borderRadius:"lg"})}),u?e(ie,{tokenId:t.token_id}):e(Q,{onClick:h,mt:2,h:12,w:"100%",variant:"outline",children:"Assets"}),e(U,{orientation:"horizontal",mt:2,mb:2}),c(B,{w:"full",spacing:2,align:"flex-start",children:[e(E,{href:"https://bullieverse.com/marketplace/ERC721/0x329fa32f6520fb67bb3c1fc3a6909beb8239544c/"+t.token_id,isExternal:!0,children:e(z,{w:"full",variant:"outline",icon:e(S,{borderRadius:"full",src:"/tmp-project/BullLevel2023/res/bullieverse-icon.jpeg",boxSize:[4,6]})})}),e(E,{href:"https://opensea.io/assets/ethereum/0x329fa32f6520fb67bb3c1fc3a6909beb8239544c/"+t.token_id,isExternal:!0,children:e(z,{w:"full",variant:"outline",icon:e(S,{borderRadius:"full",src:"/tmp-project/BullLevel2023/res/opensea-icon.svg",boxSize:[4,6]})})}),e(E,{href:"https://blur.io/asset/0x329fa32f6520fb67bb3c1fc3a6909beb8239544c/"+t.token_id,isExternal:!0,children:e(z,{w:"full",variant:"outline",icon:e(S,{borderRadius:"full",src:"/tmp-project/BullLevel2023/res/blur-icon.jpg",boxSize:[4,6]})})})]})]})})}const d={All:0,VeryLow:1,Low:2,Medium:3,High:4,VeryHigh:5};function le(){const[t,u]=p.useState([]),[g,h]=p.useState({}),[r,i]=p.useState([]),[f,j]=p.useState(!0),[o,L]=p.useState(0),[b,C]=p.useState(d.All),H=p.useRef(null);async function T(){const m=await(await fetch("https://bulllevel.plo4ox.repl.co/bullLevel/all")).json();await F(m,0,20),h(m)}async function F(a,m,R){var I=Object.keys(a).filter(s=>a[s].level>=m&&a[s].level<=R).map(s=>[s,a[s]]);I.sort((s,W)=>W[1].level-s[1].level==0?s[1].token_id-W[1].token_id:W[1].level-s[1].level);const O=I.map(s=>s[0]),G=O.map((s,W)=>e(ne,{data:a[s]},s));L(0),u(O),i(G),j(!1)}async function k(a,m,R){f==!1&&(C(a),j(!0),setTimeout(()=>{F(g,m,R)},500))}function l(a,m=1e3){return r.slice(a,a+m)}const N=()=>{const a=H.current.scrollHeight,m=H.current.scrollTop,R=H.current.clientHeight;a-(m+R)<1e3&&L(P())};function P(){return o<1e3?o+200:o+1e3}return p.useEffect(()=>{T()},[]),c(D,{maxH:"100vh",w:"100vw",paddingStart:4,paddingEnd:4,overflowY:"scroll",onScroll:N,ref:H,children:[e(oe,{}),c(X,{direction:["column","row"],spacing:2,justify:"center",align:"center",wrap:"wrap",paddingBottom:4,children:[c(B,{children:[e(v,{level:"ALL",color:w(0),minW:10,onClick:()=>{k(d.All,0,20)},selected:b==d.All}),e(v,{level:"1-4",color:w(1),minW:12,onClick:()=>{k(d.VeryLow,1,4)},selected:b==d.VeryLow}),e(v,{level:"5-9",color:w(5),minW:12,onClick:()=>{k(d.Low,5,9)},selected:b==d.Low})]}),c(B,{children:[e(v,{level:"10-14",color:w(10),minW:14,onClick:()=>{k(d.Medium,10,14)},selected:b==d.Medium}),e(v,{level:"15-19",color:w(15),minW:14,onClick:()=>{k(d.High,15,19)},selected:b==d.High}),e(v,{level:"20",color:w(20),minW:10,onClick:()=>{k(d.VeryHigh,20,20)},selected:b==d.VeryHigh})]})]}),e(D,{children:e(M,{w:"100%",flexDirection:"column",alignItems:"center",marginBottom:16,children:f?e(V,{}):t.length>0?c(n,{children:[c(q,{w:"100%",columns:[1,2,3,4],spacing:4,marginBottom:4,maxWidth:"1170px",children:[o>=0?l(0,200):e(n,{}),o>=200?l(200,400):e(n,{}),o>=400?l(400,600):e(n,{}),o>=600?l(600,800):e(n,{}),o>=800?l(800,1e3):e(n,{}),o>=1e3?l(1e3):e(n,{}),o>=2e3?l(2e3):e(n,{}),o>=3e3?l(3e3):e(n,{}),o>=4e3?l(4e3):e(n,{}),o>=5e3?l(5e3):e(n,{}),o>=6e3?l(6e3):e(n,{}),o>=7e3?l(7e3):e(n,{}),o>=8e3?l(8e3):e(n,{}),o>=9e3?l(9e3):e(n,{})]}),o<t.length-1e3?e(V,{}):e(n,{})]}):e(y,{children:"No bulls found..."})})})]})}function se(){const t=ee();return e(D,{w:"100vw",mt:8,children:c(_,{spacing:4,children:[e(S,{src:"/res/logo.png",alt:"ArtPug logo",boxSize:82,position:"relative"}),c(_,{spacing:2,children:[e(y,{as:"b",fontSize:"xl",children:"Ooops!"}),e(y,{fontSize:"l",children:"Sorry, an unexpected error has occurred."})]}),e(y,{as:"i",fontSize:"md",color:"rgb(212,136,155, 1)",children:t.statusText||t.message})]})})}const ce=re([{path:"/",element:e(le,{}),errorElement:e(se,{})}]);$.createRoot(document.getElementById("root")).render(c(Z,{children:[localStorage.setItem("chakra-ui-color-mode","dark"),e(te,{router:ce})]}));
