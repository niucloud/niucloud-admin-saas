import{d as k,r as f,n as B,q as C,h as y,I as D,w as a,a as S,e as r,i as m,t as c,u as s,N as i,y as U,ay as h,az as I,X as O,Y as $,E as j,aa as q,$ as z}from"./index-30b146d4.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                     *//* empty css                 */import{N as G,O as L}from"./sys-60b0e237.js";const T={class:"dialog-footer"},W=k({__name:"storage-local",emits:["complete"],setup(X,{expose:V,emit:b}){const u=f(!1),t=f(!0),_={is_use:"",storage_type:""},o=B({..._}),p=f(),w=C(()=>({})),E=async n=>{t.value||!n||await n.validate(async e=>{e&&(t.value=!0,G(o).then(v=>{t.value=!1,u.value=!1,b("complete")}).catch(()=>{t.value=!1}))})};return V({showDialog:u,setFormData:async(n=null)=>{if(t.value=!0,Object.assign(o,_),n){const e=await(await L(n.storage_type)).data;Object.keys(o).forEach(l=>{e[l]!=null&&(o[l]=e[l])})}t.value=!1}}),(n,e)=>{const l=h,v=I,x=O,F=$,g=j,N=q,R=z;return y(),D(N,{modelValue:u.value,"onUpdate:modelValue":e[3]||(e[3]=d=>u.value=d),title:s(i)("localStorage"),width:"580px","destroy-on-close":!0},{footer:a(()=>[S("span",T,[r(g,{onClick:e[1]||(e[1]=d=>u.value=!1)},{default:a(()=>[m(c(s(i)("cancel")),1)]),_:1}),r(g,{type:"primary",loading:t.value,onClick:e[2]||(e[2]=d=>E(p.value))},{default:a(()=>[m(c(s(i)("confirm")),1)]),_:1},8,["loading"])])]),default:a(()=>[U((y(),D(F,{model:o,"label-width":"140px",ref_key:"formRef",ref:p,rules:s(w),class:"page-form"},{default:a(()=>[r(x,{label:s(i)("isUse")},{default:a(()=>[r(v,{modelValue:o.is_use,"onUpdate:modelValue":e[0]||(e[0]=d=>o.is_use=d)},{default:a(()=>[r(l,{label:"1"},{default:a(()=>[m(c(s(i)("startUsing")),1)]),_:1}),r(l,{label:"0"},{default:a(()=>[m(c(s(i)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[R,t.value]])]),_:1},8,["modelValue","title"])}}});export{W as _};