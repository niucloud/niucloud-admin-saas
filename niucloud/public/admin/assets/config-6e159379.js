import{d as S,r as u,R as k,w as I,Q as R,e as q,f as B,g as a,B as n,u as t,y as s,x as r,b9 as D,ba as N}from"./base-d79f9f62.js";/* empty css                   *//* empty css                *//* empty css                *//* empty css                 */import"./el-form-item-4ed993c7.js";import{t as e}from"./index-9e0d1e6c.js";import{v as F}from"./sys-3d5b784a.js";import{E as V}from"./index-3fd412a3.js";import{u as L,b as U}from"./vue-router-fc35ac55.js";import{a as d}from"./index-542aa78e.js";import{a as j,E as M}from"./index-6befecc6.js";import{E as P}from"./index-f249e665.js";import{E as Q}from"./index-ba59a1dc.js";import{v as $}from"./directive-13582d99.js";import{_ as z}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-55149fa9.js";import"./index-6fcaf7b3.js";import"./storage-5316d819.js";import"./index-2048a34f.js";import"./system-d23898e7.js";import"./index-5dbb8f83.js";import"./typescript-defaf979.js";import"./index-34cd7f55.js";import"./error-78e43d3e.js";import"./index-71aec1df.js";import"./_Uint8Array-bbbfd6ac.js";import"./_initCloneObject-a2c44136.js";import"./event-9519ab40.js";import"./index-b6ca69fd.js";import"./index-427f5a83.js";const A=""+new URL("preview-52aad803.png",import.meta.url).href,G=i=>(D("data-v-7a2a3fc4"),i=i(),N(),i),H={class:"main-container"},J={class:"flex ml-[18px] justify-between items-center mt-[20px]"},K={class:"text-[20px]"},O=G(()=>a("img",{class:"w-[500px]",src:A,alt:""},null,-1)),T=S({__name:"config",setup(i){const f=L().meta.title,m=u(!0),o=k({is_open:!1,request_url:""}),v=u();U(),F().then(p=>{o.request_url=p.data.web_url+"/",m.value=!1});const{copy:g,isSupported:w,copied:c}=V(),b=p=>{if(!w.value){d({message:e("notSupportCopy"),type:"warning"});return}g(p)};I(c,()=>{c.value&&d({message:e("copySuccess"),type:"success"})});const x=()=>{window.open(o.request_url)};return(p,l)=>{const _=j,y=P,h=Q,E=M,C=$;return R((q(),B("div",H,[a("div",J,[a("span",K,n(t(f)),1)]),s(E,{model:o,"label-width":"150px",ref_key:"formRef",ref:v,class:"page-form"},{default:r(()=>[s(h,{class:"box-card !border-none",shadow:"never"},{default:r(()=>[s(_,{label:t(e)("preview"),prop:"weapp_name"},{default:r(()=>[O]),_:1},8,["label"]),s(_,{label:t(e)("PCDomainName")},{default:r(()=>[s(y,{"model-value":o.request_url,class:"input-width",readonly:!0},{append:r(()=>[a("div",{class:"cursor-pointer",onClick:l[0]||(l[0]=X=>b(o.request_url))},n(t(e)("copy")),1)]),_:1},8,["model-value"]),a("span",{class:"ml-2 cursor-pointer visit-btn",onClick:x},n(t(e)("clickVisit")),1)]),_:1},8,["label"])]),_:1})]),_:1},8,["model"])])),[[C,m.value]])}}});const qe=z(T,[["__scopeId","data-v-7a2a3fc4"]]);export{qe as default};