import{d as M,r as f,n as B,q as C,N as a,h as g,I as V,w as n,a as I,e as i,i as w,t as y,u as r,y as O,cL as P,W as U,X as R,Y as T,E as $,aa as j,$ as k}from"./index-30b146d4.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                     *//* empty css                 */import{u as q,s as S,t as K}from"./member-753640ab.js";const W={class:"dialog-footer"},ee=M({__name:"edit-label",emits:["complete"],setup(X,{expose:h,emit:x}){const d=f(!1),s=f(!1);let p="";const c={label_id:"",label_name:"",memo:"",sort:0},t=B({...c}),b=f(),D=C(()=>({label_name:[{required:!0,message:a("labelNamePlaceholder"),trigger:"blur"}],sort:[{validator:E,trigger:"blur"}]})),E=(m,e,l)=>{e<0?l(new Error(a("sortVerifyOne"))):e.toString().indexOf(".")!=-1?l(new Error(a("sortVerifyTwo"))):l()},N=async m=>{if(s.value||!m)return;const e=t.label_id?q:S;await m.validate(async l=>{l&&(s.value=!0,e(t).then(_=>{s.value=!1,d.value=!1,x("complete")}).catch(()=>{s.value=!1}))})};return h({showDialog:d,setFormData:async(m=null)=>{if(s.value=!0,Object.assign(t,c),p=a("addMemberLabel"),m){p=a("updateMemberLabel");const e=await(await K(m.label_id)).data;e&&Object.keys(t).forEach(l=>{e[l]!=null&&(t[l]=e[l])})}s.value=!1}}),(m,e)=>{const l=U,u=R,_=T,v=$,L=j,F=k;return g(),V(L,{modelValue:d.value,"onUpdate:modelValue":e[6]||(e[6]=o=>d.value=o),title:r(p),width:"500px","destroy-on-close":!0},{footer:n(()=>[I("span",W,[i(v,{onClick:e[4]||(e[4]=o=>d.value=!1)},{default:n(()=>[w(y(r(a)("cancel")),1)]),_:1}),i(v,{type:"primary",loading:s.value,onClick:e[5]||(e[5]=o=>N(b.value))},{default:n(()=>[w(y(r(a)("confirm")),1)]),_:1},8,["loading"])])]),default:n(()=>[O((g(),V(_,{model:t,"label-width":"90px",ref_key:"formRef",ref:b,rules:r(D),class:"page-form"},{default:n(()=>[i(u,{label:r(a)("labelName"),prop:"label_name"},{default:n(()=>[i(l,{modelValue:t.label_name,"onUpdate:modelValue":e[0]||(e[0]=o=>t.label_name=o),clearable:"",placeholder:r(a)("labelNamePlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),i(u,{label:r(a)("memo")},{default:n(()=>[i(l,{modelValue:t.memo,"onUpdate:modelValue":e[1]||(e[1]=o=>t.memo=o),type:"textarea",rows:"4",clearable:"",placeholder:r(a)("memoPlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),i(u,{label:r(a)("sort"),prop:"sort"},{default:n(()=>[i(l,{modelValue:t.sort,"onUpdate:modelValue":e[2]||(e[2]=o=>t.sort=o),clearable:"",placeholder:r(a)("sortPlaceholder"),class:"input-width",onKeyup:e[3]||(e[3]=o=>r(P)(o))},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[F,s.value]])]),_:1},8,["modelValue","title"])}}});export{ee as _};