import{d as K,r as g,R as P,c as B,e as V,v as h,x as r,g as F,y as s,i as w,A as u,B as c,u as t,Q as A}from"./base-9962c822.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                 */import{t as a}from"./index-6e46fb55.js";import{b as C,g as q}from"./notice-4dd0e0bf.js";import{E as I,b as N}from"./index-13fd1eb5.js";import{a as j,E as O}from"./index-7c833df7.js";import{E as G}from"./index-19251c17.js";import{E as L}from"./index-7ab57426.js";import{E as Q}from"./index-e2acd187.js";import{v as T}from"./directive-f75d4a7d.js";const $={class:"dialog-footer"},pe=K({__name:"sms-ali",emits:["complete"],setup(z,{expose:E,emit:k}){let n=g(!1);const m=g(!0),v={sms_type:"",sign:"",app_key:"",secret_key:"",is_use:""},l=P({...v}),y=g(),S=B(()=>({sign:[{required:!0,message:a("aliSignPlaceholder"),trigger:"blur"}],app_key:[{required:!0,message:a("aliAppKeyPlaceholder"),trigger:"blur"}],secret_key:[{required:!0,message:a("aliSecretKeyPlaceholder"),trigger:"blur"}]})),D=async p=>{m.value||!p||await p.validate(async e=>{e&&(m.value=!0,C(l).then(f=>{m.value=!1,n.value=!1,k("complete")}).catch(f=>{m.value=!1}))})};return E({showDialog:n,setFormData:async(p=null)=>{if(m.value=!0,Object.assign(l,v),p){const e=await(await q(p.sms_type)).data;Object.keys(l).forEach(i=>{e[i]!=null&&(l[i]=e[i]),e.params[i]!=null&&(l[i]=e.params[i].value)})}m.value=!1}}),(p,e)=>{const i=I,f=N,d=j,_=G,x=O,b=L,R=Q,U=T;return V(),h(R,{modelValue:t(n),"onUpdate:modelValue":e[6]||(e[6]=o=>w(n)?n.value=o:n=o),title:t(a)("aliSms"),width:"580px","destroy-on-close":!0},{footer:r(()=>[F("span",$,[s(b,{onClick:e[4]||(e[4]=o=>w(n)?n.value=!1:n=!1)},{default:r(()=>[u(c(t(a)("cancel")),1)]),_:1}),s(b,{type:"primary",loading:m.value,onClick:e[5]||(e[5]=o=>D(y.value))},{default:r(()=>[u(c(t(a)("confirm")),1)]),_:1},8,["loading"])])]),default:r(()=>[A((V(),h(x,{model:l,"label-width":"140px",ref_key:"formRef",ref:y,rules:t(S),class:"page-form"},{default:r(()=>[s(d,{label:t(a)("isUse")},{default:r(()=>[s(f,{modelValue:l.is_use,"onUpdate:modelValue":e[0]||(e[0]=o=>l.is_use=o)},{default:r(()=>[s(i,{label:1},{default:r(()=>[u(c(t(a)("startUsing")),1)]),_:1}),s(i,{label:0},{default:r(()=>[u(c(t(a)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),s(d,{label:t(a)("aliSign"),prop:"sign"},{default:r(()=>[s(_,{modelValue:l.sign,"onUpdate:modelValue":e[1]||(e[1]=o=>l.sign=o),placeholder:t(a)("aliSignPlaceholder"),class:"input-width","show-word-limit":"",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),s(d,{label:t(a)("aliAppKey"),prop:"app_key"},{default:r(()=>[s(_,{modelValue:l.app_key,"onUpdate:modelValue":e[2]||(e[2]=o=>l.app_key=o),placeholder:t(a)("aliAppKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),s(d,{label:t(a)("aliSecretKey"),prop:"secret_key"},{default:r(()=>[s(_,{modelValue:l.secret_key,"onUpdate:modelValue":e[3]||(e[3]=o=>l.secret_key=o),placeholder:t(a)("aliSecretKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[U,m.value]])]),_:1},8,["modelValue","title"])}}});export{pe as _};
