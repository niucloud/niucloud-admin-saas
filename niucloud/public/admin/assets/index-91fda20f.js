import{e as E,i as W,A as C,av as z,a2 as I,a3 as N,b as D,d as x}from"./index-57446bef.js";import{o as A,a as U,O as $,i as F,b as L,bf as j,w as V,aF as q,N as f,d as G,y as J,h as k,U as K}from"./base-9962c822.js";import{t as Q}from"./error-78e43d3e.js";import{a as Z}from"./scroll-d85c8f38.js";import{P as v}from"./vnode-562dae50.js";const le=(e,o,n)=>{let a={offsetX:0,offsetY:0};const s=l=>{const u=l.clientX,i=l.clientY,{offsetX:r,offsetY:m}=a,d=e.value.getBoundingClientRect(),p=d.left,y=d.top,S=d.width,T=d.height,Y=document.documentElement.clientWidth,O=document.documentElement.clientHeight,P=-p+r,H=-y+m,X=Y-p-S+r,B=O-y-T+m,h=g=>{const w=Math.min(Math.max(r+g.clientX-u,P),X),M=Math.min(Math.max(m+g.clientY-i,H),B);a={offsetX:w,offsetY:M},e.value.style.transform=`translate(${E(w)}, ${E(M)})`},b=()=>{document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",b)};document.addEventListener("mousemove",h),document.addEventListener("mouseup",b)},c=()=>{o.value&&e.value&&o.value.addEventListener("mousedown",s)},t=()=>{o.value&&e.value&&o.value.removeEventListener("mousedown",s)};A(()=>{U(()=>{n.value?c():t()})}),$(()=>{t()})},ue=e=>{F(e)||Q("[useLockscreen]","You need to pass a ref param to this function");const o=L("popup"),n=j(()=>o.bm("parent","hidden"));if(!W||C(document.body,n.value))return;let a=0,s=!1,c="0";const t=()=>{setTimeout(()=>{N(document.body,n.value),s&&(document.body.style.width=c)},200)};V(e,l=>{if(!l){t();return}s=!C(document.body,n.value),s&&(c=document.body.style.width),a=Z(o.namespace.value);const u=document.documentElement.clientHeight<document.body.scrollHeight,i=z(document.body,"overflowY");a>0&&(u||i==="scroll")&&s&&(document.body.style.width=`calc(100% - ${a}px)`),I(document.body,n.value)}),q(()=>t())},_=e=>{if(!e)return{onClick:f,onMousedown:f,onMouseup:f};let o=!1,n=!1;return{onClick:t=>{o&&n&&e(t),o=n=!1},onMousedown:t=>{o=t.target===t.currentTarget},onMouseup:t=>{n=t.target===t.currentTarget}}},R=D({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:x([String,Array,Object])},zIndex:{type:x([String,Number])}}),ee={click:e=>e instanceof MouseEvent};var te=G({name:"ElOverlay",props:R,emits:ee,setup(e,{slots:o,emit:n}){const a=L("overlay"),s=u=>{n("click",u)},{onClick:c,onMousedown:t,onMouseup:l}=_(e.customMaskEvent?void 0:s);return()=>e.mask?J("div",{class:[a.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:c,onMousedown:t,onMouseup:l},[k(o,"default")],v.STYLE|v.CLASS|v.PROPS,["onClick","onMouseup","onMousedown"]):K("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[k(o,"default")])}});const de=te;export{de as E,ue as a,_ as b,le as u};
