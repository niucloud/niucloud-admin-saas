import{d as S,r as g,R as K,c as q,e as y,v as k,x as s,g as h,y as r,i as w,A as f,B as p,u as t,Q as F}from"./base-d79f9f62.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                 */import{t as l}from"./index-9e0d1e6c.js";import{L as A,M as C}from"./sys-3d5b784a.js";import{E as I,b as N}from"./index-59eacbf0.js";import{a as j,E as L}from"./index-6befecc6.js";import{E as O}from"./index-f249e665.js";import{E as T}from"./index-03649f16.js";import{E as G}from"./index-d0ada8fb.js";import{v as M}from"./directive-13582d99.js";const Q={class:"form-tip"},$={class:"dialog-footer"},ce=S({__name:"storage-tencent",emits:["complete"],setup(z,{expose:E,emit:P}){let i=g(!1);const d=g(!0),b={storage_type:"",bucket:"",access_key:"",secret_key:"",domain:"",is_use:"",region:""},a=K({...b}),v=g(),B=q(()=>({bucket:[{required:!0,message:l("tencentBucketPlaceholder"),trigger:"blur"}],access_key:[{required:!0,message:l("tencentAccessKeyPlaceholder"),trigger:"blur"}],secret_key:[{required:!0,message:l("tencentSecretKeyPlaceholder"),trigger:"blur"}],region:[{required:!0,message:l("regionPlaceholder"),trigger:"blur"}],domain:[{required:!0,message:l("domainPlaceholder"),trigger:"blur"}]})),D=async u=>{d.value||!u||await u.validate(async e=>{e&&(d.value=!0,A(a).then(_=>{d.value=!1,i.value=!1,P("complete")}).catch(_=>{d.value=!1}))})};return E({showDialog:i,setFormData:async(u=null)=>{if(d.value=!0,Object.assign(a,b),u){const e=await(await C(u.storage_type)).data;Object.keys(a).forEach(n=>{e[n]!=null&&(a[n]=e[n]),e.params[n]!=null&&(a[n]=e.params[n].value)})}d.value=!1}}),(u,e)=>{const n=I,_=N,c=j,m=O,U=L,V=T,x=G,R=M;return y(),k(x,{modelValue:t(i),"onUpdate:modelValue":e[8]||(e[8]=o=>w(i)?i.value=o:i=o),title:t(l)("tencentStorage"),width:"580px","destroy-on-close":!0},{footer:s(()=>[h("span",$,[r(V,{onClick:e[6]||(e[6]=o=>w(i)?i.value=!1:i=!1)},{default:s(()=>[f(p(t(l)("cancel")),1)]),_:1}),r(V,{type:"primary",loading:d.value,onClick:e[7]||(e[7]=o=>D(v.value))},{default:s(()=>[f(p(t(l)("confirm")),1)]),_:1},8,["loading"])])]),default:s(()=>[F((y(),k(U,{model:a,"label-width":"140px",ref_key:"formRef",ref:v,rules:t(B),class:"page-form"},{default:s(()=>[r(c,{label:t(l)("isUse")},{default:s(()=>[r(_,{modelValue:a.is_use,"onUpdate:modelValue":e[0]||(e[0]=o=>a.is_use=o)},{default:s(()=>[r(n,{label:"1"},{default:s(()=>[f(p(t(l)("startUsing")),1)]),_:1}),r(n,{label:"0"},{default:s(()=>[f(p(t(l)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),r(c,{label:t(l)("tencentBucket"),prop:"bucket"},{default:s(()=>[r(m,{modelValue:a.bucket,"onUpdate:modelValue":e[1]||(e[1]=o=>a.bucket=o),placeholder:t(l)("tencentBucketPlaceholder"),class:"input-width","show-word-limit":"",clearable:""},null,8,["modelValue","placeholder"]),h("div",Q,p(t(l)("tencentBucketTips")),1)]),_:1},8,["label"]),r(c,{label:t(l)("tencentAccessKey"),prop:"access_key"},{default:s(()=>[r(m,{modelValue:a.access_key,"onUpdate:modelValue":e[2]||(e[2]=o=>a.access_key=o),placeholder:t(l)("tencentAccessKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(c,{label:t(l)("tencentSecretKey"),prop:"secret_key"},{default:s(()=>[r(m,{modelValue:a.secret_key,"onUpdate:modelValue":e[3]||(e[3]=o=>a.secret_key=o),placeholder:t(l)("tencentSecretKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(c,{label:t(l)("region"),prop:"region"},{default:s(()=>[r(m,{modelValue:a.region,"onUpdate:modelValue":e[4]||(e[4]=o=>a.region=o),placeholder:t(l)("regionPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(c,{label:t(l)("domain"),prop:"domain"},{default:s(()=>[r(m,{modelValue:a.domain,"onUpdate:modelValue":e[5]||(e[5]=o=>a.domain=o),placeholder:t(l)("domainPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[R,d.value]])]),_:1},8,["modelValue","title"])}}});export{ce as _};