import{d as P,r as g,n as R,q as F,N as a,h as V,I as h,w as s,a as q,e as r,aH as w,i as m,t as c,u as t,y as B,ay as C,az as I,X as N,W as A,Y as j,E as O,aa as z,a0 as G}from"./index-9d601459.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                 */import{b as H,g as L}from"./notice-23b176e8.js";const T={class:"dialog-footer"},te=P({__name:"sms-ali",emits:["complete"],setup(W,{expose:k,emit:S}){let n=g(!1);const d=g(!0),y={sms_type:"",sign:"",app_key:"",secret_key:"",is_use:""},l=R({...y}),v=g(),D=F(()=>({sign:[{required:!0,message:a("aliSignPlaceholder"),trigger:"blur"}],app_key:[{required:!0,message:a("aliAppKeyPlaceholder"),trigger:"blur"}],secret_key:[{required:!0,message:a("aliSecretKeyPlaceholder"),trigger:"blur"}]})),E=async u=>{d.value||!u||await u.validate(async e=>{e&&(d.value=!0,H(l).then(_=>{d.value=!1,n.value=!1,S("complete")}).catch(_=>{d.value=!1}))})};return k({showDialog:n,setFormData:async(u=null)=>{if(d.value=!0,Object.assign(l,y),u){const e=await(await L(u.sms_type)).data;Object.keys(l).forEach(i=>{e[i]!=null&&(l[i]=e[i]),e.params[i]!=null&&(l[i]=e.params[i].value)})}d.value=!1}}),(u,e)=>{const i=C,_=I,p=N,f=A,U=j,b=O,x=z,K=G;return V(),h(x,{modelValue:t(n),"onUpdate:modelValue":e[6]||(e[6]=o=>w(n)?n.value=o:n=o),title:t(a)("aliSms"),width:"580px","destroy-on-close":!0},{footer:s(()=>[q("span",T,[r(b,{onClick:e[4]||(e[4]=o=>w(n)?n.value=!1:n=!1)},{default:s(()=>[m(c(t(a)("cancel")),1)]),_:1}),r(b,{type:"primary",loading:d.value,onClick:e[5]||(e[5]=o=>E(v.value))},{default:s(()=>[m(c(t(a)("confirm")),1)]),_:1},8,["loading"])])]),default:s(()=>[B((V(),h(U,{model:l,"label-width":"140px",ref_key:"formRef",ref:v,rules:t(D),class:"page-form"},{default:s(()=>[r(p,{label:t(a)("isUse")},{default:s(()=>[r(_,{modelValue:l.is_use,"onUpdate:modelValue":e[0]||(e[0]=o=>l.is_use=o)},{default:s(()=>[r(i,{label:1},{default:s(()=>[m(c(t(a)("startUsing")),1)]),_:1}),r(i,{label:0},{default:s(()=>[m(c(t(a)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),r(p,{label:t(a)("aliSign"),prop:"sign"},{default:s(()=>[r(f,{modelValue:l.sign,"onUpdate:modelValue":e[1]||(e[1]=o=>l.sign=o),placeholder:t(a)("aliSignPlaceholder"),class:"input-width","show-word-limit":"",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(p,{label:t(a)("aliAppKey"),prop:"app_key"},{default:s(()=>[r(f,{modelValue:l.app_key,"onUpdate:modelValue":e[2]||(e[2]=o=>l.app_key=o),placeholder:t(a)("aliAppKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(p,{label:t(a)("aliSecretKey"),prop:"secret_key"},{default:s(()=>[r(f,{modelValue:l.secret_key,"onUpdate:modelValue":e[3]||(e[3]=o=>l.secret_key=o),placeholder:t(a)("aliSecretKeyPlaceholder"),class:"input-width",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[K,d.value]])]),_:1},8,["modelValue","title"])}}});export{te as _};