import{d as R,r as f,n as B,q as U,N as s,h as V,I as D,w as a,a as _,e as o,i as p,t as m,u as l,y as j,az as k,aA as q,X as O,W as P,Y as S,E as $,aa as z,a0 as A}from"./index-4dcc0234.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                 */import{a as G}from"./notice-b720dec8.js";const L={class:"input-width"},T={class:"input-width"},W={class:"input-width"},X={class:"dialog-footer"},le=R({__name:"notice-sms",emits:["complete"],setup(Y,{expose:w,emit:E}){const u=f(!1),n=f(!0),v={is_sms:0,key:"",name:"",sms_default_content:"",title:"",type:"",sms_id:"",content:""},t=B({...v}),b=f(),y=U(()=>({sms_id:[{required:!0,message:s("smsIdPlaceholder"),trigger:"blur"}]})),x=async i=>{n.value||!i||await i.validate(async e=>{if(e){n.value=!0;const r=t;r.status=r.is_sms,G(r).then(g=>{n.value=!1,u.value=!1,E("complete")}).catch(()=>{n.value=!1})}})};return w({showDialog:u,setFormData:async(i=null)=>{n.value=!0,Object.assign(t,v),i&&Object.keys(t).forEach(e=>{i[e]!=null&&(t[e]=i[e]),i.sms&&i.sms[e]!=null&&(t[e]=i.sms[e])}),n.value=!1}}),(i,e)=>{const r=k,g=q,c=O,I=P,C=S,h=$,F=z,N=A;return V(),D(F,{modelValue:u.value,"onUpdate:modelValue":e[4]||(e[4]=d=>u.value=d),title:l(s)("noticeSetting"),width:"550px","destroy-on-close":!0},{footer:a(()=>[_("span",X,[o(h,{onClick:e[2]||(e[2]=d=>u.value=!1)},{default:a(()=>[p(m(l(s)("cancel")),1)]),_:1}),o(h,{type:"primary",loading:n.value,onClick:e[3]||(e[3]=d=>x(b.value))},{default:a(()=>[p(m(l(s)("confirm")),1)]),_:1},8,["loading"])])]),default:a(()=>[j((V(),D(C,{model:t,"label-width":"110px",ref_key:"formRef",ref:b,rules:l(y),class:"page-form"},{default:a(()=>[o(c,{label:l(s)("status")},{default:a(()=>[o(g,{modelValue:t.is_sms,"onUpdate:modelValue":e[0]||(e[0]=d=>t.is_sms=d)},{default:a(()=>[o(r,{label:1},{default:a(()=>[p(m(l(s)("startUsing")),1)]),_:1}),o(r,{label:0},{default:a(()=>[p(m(l(s)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),o(c,{label:l(s)("name")},{default:a(()=>[_("div",L,m(t.name),1)]),_:1},8,["label"]),o(c,{label:l(s)("title")},{default:a(()=>[_("div",T,m(t.title),1)]),_:1},8,["label"]),o(c,{label:l(s)("smsId"),prop:"sms_id"},{default:a(()=>[o(I,{modelValue:t.sms_id,"onUpdate:modelValue":e[1]||(e[1]=d=>t.sms_id=d),placeholder:l(s)("smsIdPlaceholder"),class:"input-width","show-word-limit":"",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),o(c,{label:l(s)("smsContent")},{default:a(()=>[_("div",W,m(t.content),1)]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[N,n.value]])]),_:1},8,["modelValue","title"])}}});export{le as _};