import{d as x,r as g,n as K,q as R,N as a,h as V,I as k,w as r,a as h,e as s,aH as q,i as _,t as m,u as l,y as F,ay as C,az as I,X as N,W as A,Y as j,E as L,aa as O,a0 as T}from"./index-9d601459.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                 */import{L as z,M as G}from"./sys-45a56363.js";const H={class:"form-tip"},M={class:"dialog-footer"},oe=x({__name:"storage-qiniu",emits:["complete"],setup(W,{expose:w,emit:D}){let u=g(!1);const n=g(!0),b={storage_type:"",bucket:"",access_key:"",secret_key:"",domain:"",is_use:""},t=K({...b}),y=g(),E=R(()=>({bucket:[{required:!0,message:a("qiniuBucketPlaceholder"),trigger:"blur"}],access_key:[{required:!0,message:a("qiniuAccessKeyPlaceholder"),trigger:"blur"}],secret_key:[{required:!0,message:a("qiniuSecretKeyPlaceholder"),trigger:"blur"}],endpoint:[{required:!0,message:a("aliEndpointPlaceholder"),trigger:"blur"}],domain:[{required:!0,message:a("domainPlaceholder"),trigger:"blur"}]})),P=async d=>{n.value||!d||await d.validate(async e=>{e&&(n.value=!0,z(t).then(f=>{n.value=!1,u.value=!1,D("complete")}).catch(f=>{n.value=!1}))})};return w({showDialog:u,setFormData:async(d=null)=>{if(n.value=!0,Object.assign(t,b),d){const e=await(await G(d.storage_type)).data;Object.keys(t).forEach(i=>{e[i]!=null&&(t[i]=e[i]),e.params[i]!=null&&(t[i]=e.params[i].value)})}n.value=!1}}),(d,e)=>{const i=C,f=I,c=N,p=A,B=j,v=L,U=O,S=T;return V(),k(U,{modelValue:l(u),"onUpdate:modelValue":e[7]||(e[7]=o=>q(u)?u.value=o:u=o),title:l(a)("qiniuStorage"),width:"580px","destroy-on-close":!0},{footer:r(()=>[h("span",M,[s(v,{onClick:e[5]||(e[5]=o=>q(u)?u.value=!1:u=!1)},{default:r(()=>[_(m(l(a)("cancel")),1)]),_:1}),s(v,{type:"primary",loading:n.value,onClick:e[6]||(e[6]=o=>P(y.value))},{default:r(()=>[_(m(l(a)("confirm")),1)]),_:1},8,["loading"])])]),default:r(()=>[F((V(),k(B,{model:t,"label-width":"140px",ref_key:"formRef",ref:y,rules:l(E),class:"page-form"},{default:r(()=>[s(c,{label:l(a)("isUse")},{default:r(()=>[s(f,{modelValue:t.is_use,"onUpdate:modelValue":e[0]||(e[0]=o=>t.is_use=o)},{default:r(()=>[s(i,{label:"1"},{default:r(()=>[_(m(l(a)("startUsing")),1)]),_:1}),s(i,{label:"0"},{default:r(()=>[_(m(l(a)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),s(c,{label:l(a)("qiniuBucket"),prop:"bucket"},{default:r(()=>[s(p,{modelValue:t.bucket,"onUpdate:modelValue":e[1]||(e[1]=o=>t.bucket=o),placeholder:l(a)("qiniuBucketPlaceholder"),class:"input-width","show-word-limit":"",clearable:""},null,8,["modelValue","placeholder"]),h("div",H,m(l(a)("qiniuBucketTips")),1)]),_:1},8,["label"]),s(c,{label:l(a)("qiniuAccessKey"),prop:"access_key"},{default:r(()=>[s(p,{modelValue:t.access_key,"onUpdate:modelValue":e[2]||(e[2]=o=>t.access_key=o),placeholder:l(a)("qiniuAccessKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),s(c,{label:l(a)("qiniuSecretKey"),prop:"secret_key"},{default:r(()=>[s(p,{modelValue:t.secret_key,"onUpdate:modelValue":e[3]||(e[3]=o=>t.secret_key=o),placeholder:l(a)("qiniuSecretKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),s(c,{label:l(a)("domain"),prop:"domain"},{default:r(()=>[s(p,{modelValue:t.domain,"onUpdate:modelValue":e[4]||(e[4]=o=>t.domain=o),placeholder:l(a)("domainPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[S,n.value]])]),_:1},8,["modelValue","title"])}}});export{oe as _};