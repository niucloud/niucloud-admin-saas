import{d as C,r as g,R as h,e as x,f as B,Q as F,v as N,x as s,y as i,g as d,B as _,u as l,A as D}from"./base-9962c822.js";/* empty css                   *//* empty css                  *//* empty css                *//* empty css                */import"./el-form-item-4ed993c7.js";/* empty css                 */import{t as a}from"./index-5516aed6.js";import{L as I,M as R}from"./member-8490bdef.js";import{E as M}from"./index-19251c17.js";import{a as $,E as P}from"./index-7c833df7.js";import{E as k}from"./index-189f302e.js";import{E as A}from"./index-7ab57426.js";import{v as H}from"./directive-f75d4a7d.js";import{_ as L}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-a9fc3924.js";import"./index-e026a545.js";import"./vue-router-d7e63612.js";import"./storage-0874d153.js";import"./index-57446bef.js";import"./index-5c4817f4.js";import"./index-2cabf788.js";import"./typescript-defaf979.js";import"./index-c98e204a.js";import"./system-1108e5c1.js";import"./index-c4e33d8d.js";import"./event-9519ab40.js";import"./index-ec548bfb.js";import"./index-6b77b11a.js";import"./index-71b7d8f4.js";import"./error-78e43d3e.js";import"./_Uint8Array-c92ffa25.js";import"./_initCloneObject-41dd9efb.js";import"./index-1370ab44.js";const S={class:"main-container"},T={class:"panel-title"},U={class:"form-tip"},j={class:"text-lg"},q={class:"fixed-footer-wrap"},z={class:"fixed-footer"},O=C({__name:"member",setup(Q){const m=g(!0),p=g({});let v=g("");const b=h({prefix:[{validator:(r,e,o)=>{e&&!/^[a-zA-Z]*$/g.test(e)?o(new Error(a("prefixHint"))):o()},trigger:"blur"}],length:[{required:!0,message:a("lengthPlaceholder"),trigger:"blur"},{validator:(r,e,o)=>{parseInt(e)>30||parseInt(e)-t.prefix.length<4?o(new Error(a("lengthHint"))):o()},trigger:"blur"}]}),t=h({prefix:"",length:10});(async()=>{const r=await(await I()).data;Object.keys(t).forEach(e=>{r[e]!=null&&(t[e]=r[e])}),c(p.value),m.value=!1})();const c=async r=>{await r.validate(e=>{if(e){let o="",f=t.length-t.prefix.length-1;for(let u=1;u<=f;u++)o+="0";v.value=t.prefix+o+"1"}})},w=async r=>{m.value||!r||await r.validate(e=>{e&&R(t).then(()=>{m.value=!1,c()}).catch(()=>{m.value=!1})})};return(r,e)=>{const o=M,f=$,u=k,y=P,E=A,V=H;return x(),B("div",S,[F((x(),N(y,{model:t,"label-width":"150px",ref_key:"ruleFormRef",ref:p,rules:b,class:"page-form"},{default:s(()=>[i(u,{class:"box-card !border-none",shadow:"never"},{default:s(()=>[d("h3",T,_(l(a)("memberNoRule")),1),i(f,{label:l(a)("prefix"),prop:"prefix"},{default:s(()=>[i(o,{modelValue:t.prefix,"onUpdate:modelValue":e[0]||(e[0]=n=>t.prefix=n),placeholder:l(a)("prefixPlaceholder"),class:"input-width",clearable:"",maxlength:"20",onChange:e[1]||(e[1]=n=>c(p.value))},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),i(f,{label:l(a)("length"),prop:"length"},{default:s(()=>[i(o,{modelValue:t.length,"onUpdate:modelValue":e[2]||(e[2]=n=>t.length=n),placeholder:l(a)("lengthPlaceholder"),class:"input-width",clearable:"",type:"number",onChange:e[3]||(e[3]=n=>c(p.value))},null,8,["modelValue","placeholder"]),d("div",U,_(l(a)("lengthTips")),1)]),_:1},8,["label"]),i(f,null,{default:s(()=>[d("div",j,_(l(v)),1)]),_:1})]),_:1})]),_:1},8,["model","rules"])),[[V,m.value]]),d("div",q,[d("div",z,[i(E,{type:"primary",onClick:e[4]||(e[4]=n=>w(p.value))},{default:s(()=>[D(_(l(a)("save")),1)]),_:1})])])])}}});const De=L(O,[["__scopeId","data-v-80ca2ff0"]]);export{De as default};