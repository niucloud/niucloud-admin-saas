import{a2 as y,d as D,O as I,r as v,n as F,aK as O,s as R,a3 as g,N as a,h,c as $,a as n,t as u,u as l,y as j,I as H,w as i,e as r,i as L,aL as M,X as U,W as K,_ as T,Y as W,E as X,$ as Y}from"./index-30b146d4.js";/* empty css                   *//* empty css                  *//* empty css                     *//* empty css                *//* empty css                 *//* empty css                  */import{q as z}from"./sys-60b0e237.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";function G(){return y.get("channel/h5/config")}function J(_){return y.put("channel/h5/config",_,{showSuccessMessage:!0})}const P={class:"main-container"},Q={class:"flex ml-[18px] justify-between items-center mt-[20px]"},Z={class:"text-page-title"},ee={class:"fixed-footer-wrap"},te={class:"fixed-footer"},se=D({__name:"config",setup(_){const w=I().meta.title,o=v(!0),e=F({is_open:!0,request_url:""}),d=v();G().then(t=>{Object.assign(e,t.data),e.is_open=Boolean(Number(e.is_open)),o.value=!1}),z().then(t=>{e.request_url=t.data.wap_url+"/"});const{copy:b,isSupported:x,copied:m}=O(),C=t=>{if(!x.value){g({message:a("notSupportCopy"),type:"warning"});return}b(t)};R(m,()=>{m.value&&g({message:a("copySuccess"),type:"success"})});const E=()=>{window.open(e.request_url)},k=async t=>{o.value||!t||await t.validate(async s=>{if(s){o.value=!0;const c={...e};c.is_open=Number(c.is_open),J(c).then(()=>{o.value=!1}).catch(()=>{o.value=!1})}})};return(t,s)=>{const c=M,f=U,N=K,q=T,V=W,B=X,S=Y;return h(),$("div",P,[n("div",Q,[n("span",Z,u(l(w)),1)]),j((h(),H(V,{model:e,"label-width":"150px",ref_key:"formRef",ref:d,class:"page-form"},{default:i(()=>[r(q,{class:"box-card !border-none",shadow:"never"},{default:i(()=>[r(f,{label:l(a)("isOpen")},{default:i(()=>[r(c,{modelValue:e.is_open,"onUpdate:modelValue":s[0]||(s[0]=p=>e.is_open=p)},null,8,["modelValue"])]),_:1},8,["label"]),r(f,{label:l(a)("h5DomainName")},{default:i(()=>[r(N,{"model-value":e.request_url,class:"input-width",readonly:!0},{append:i(()=>[n("div",{class:"cursor-pointer",onClick:s[1]||(s[1]=p=>C(e.request_url))},u(l(a)("copy")),1)]),_:1},8,["model-value"]),n("span",{class:"ml-2 cursor-pointer visit-btn",onClick:E},u(l(a)("clickVisit")),1)]),_:1},8,["label"])]),_:1})]),_:1},8,["model"])),[[S,o.value]]),n("div",ee,[n("div",te,[r(B,{type:"primary",loading:o.value,onClick:s[2]||(s[2]=p=>k(d.value))},{default:i(()=>[L(u(l(a)("save")),1)]),_:1},8,["loading"])])])])}}});const de=A(se,[["__scopeId","data-v-ddf971d0"]]);export{de as default};