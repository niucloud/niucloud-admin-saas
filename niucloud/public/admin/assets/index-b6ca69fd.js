import{c as t,P as l}from"./base-d79f9f62.js";import{am as u}from"./index-2048a34f.js";const i=["class","style"],E=/^on[A-Z]/,f=(c={})=>{const{excludeListeners:o=!1,excludeKeys:e}=c,a=t(()=>((e==null?void 0:e.value)||[]).concat(i)),s=l();return s?t(()=>{var r;return u(Object.entries((r=s.proxy)==null?void 0:r.$attrs).filter(([n])=>!a.value.includes(n)&&!(o&&E.test(n))))}):t(()=>({}))};export{f as u};