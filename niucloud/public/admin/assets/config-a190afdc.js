import{a2 as g,d as I,O as B,r as f,n as D,aK as R,s as F,a3 as v,N as a,y as L,h as O,c as P,a as c,t as u,u as i,e as n,w as r,i as U,X as $,aL as j,W as M,_ as K,Y as T,E as W,$ as X,p as Y,g as z}from"./index-30b146d4.js";/* empty css                   *//* empty css                  *//* empty css                     *//* empty css                *//* empty css                 *//* empty css                  */import{q as A}from"./sys-60b0e237.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";const H=""+new URL("preview-52aad803.png",import.meta.url).href;function J(){return g.get("channel/pc/config")}function Q(p){return g.put("channel/pc/config",p,{showSuccessMessage:!0})}const Z=p=>(Y("data-v-fd1e8205"),p=p(),z(),p),ee={class:"main-container"},te={class:"flex ml-[18px] justify-between items-center mt-[20px]"},se={class:"text-page-title"},oe=Z(()=>c("img",{class:"w-[500px]",src:H,alt:""},null,-1)),ae={class:"fixed-footer-wrap"},ne={class:"fixed-footer"},le=I({__name:"config",setup(p){const w=B().meta.title,s=f(!0),e=D({is_open:!1,request_url:""}),d=f();A().then(t=>{e.request_url=t.data.web_url+"/",s.value=!1}),J().then(t=>{Object.assign(e,t.data),e.is_open=Boolean(Number(e.is_open)),s.value=!1});const{copy:h,isSupported:y,copied:m}=R(),b=t=>{if(!y.value){v({message:a("notSupportCopy"),type:"warning"});return}h(t)};F(m,()=>{m.value&&v({message:a("copySuccess"),type:"success"})});const x=()=>{window.open(e.request_url)},C=async t=>{s.value||!t||await t.validate(async o=>{if(o){s.value=!0;const l={...e};l.is_open=Number(l.is_open),Q(l).then(()=>{s.value=!1}).catch(()=>{s.value=!1})}})};return(t,o)=>{const l=$,E=j,S=M,N=K,k=T,q=W,V=X;return L((O(),P("div",ee,[c("div",te,[c("span",se,u(i(w)),1)]),n(k,{model:e,"label-width":"150px",ref_key:"formRef",ref:d,class:"page-form"},{default:r(()=>[n(N,{class:"box-card !border-none",shadow:"never"},{default:r(()=>[n(l,{label:i(a)("preview"),prop:"weapp_name"},{default:r(()=>[oe]),_:1},8,["label"]),n(l,{label:i(a)("isOpen")},{default:r(()=>[n(E,{modelValue:e.is_open,"onUpdate:modelValue":o[0]||(o[0]=_=>e.is_open=_)},null,8,["modelValue"])]),_:1},8,["label"]),n(l,{label:i(a)("PCDomainName")},{default:r(()=>[n(S,{"model-value":e.request_url,class:"input-width",readonly:!0},{append:r(()=>[c("div",{class:"cursor-pointer",onClick:o[1]||(o[1]=_=>b(e.request_url))},u(i(a)("copy")),1)]),_:1},8,["model-value"]),c("span",{class:"ml-2 cursor-pointer visit-btn",onClick:x},u(i(a)("clickVisit")),1)]),_:1},8,["label"])]),_:1})]),_:1},8,["model"]),c("div",ae,[c("div",ne,[n(q,{type:"primary",loading:s.value,onClick:o[2]||(o[2]=_=>C(d.value))},{default:r(()=>[U(u(i(a)("save")),1)]),_:1},8,["loading"])])])])),[[V,s.value]])}}});const ge=G(le,[["__scopeId","data-v-fd1e8205"]]);export{ge as default};
