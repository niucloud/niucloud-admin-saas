import{d as E,r as u,n as V,q as B,h as _,I as b,w as t,a as l,e as s,i as F,t as n,u as a,N as o,y as N,c as h,R as I,X as R,Y as C,E as T,aa as j,$ as O}from"./index-30b146d4.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                     */import{_ as $}from"./default_headimg-a897263d.js";const q={class:"flex items-center"},L=["src"],S={key:1,class:"w-[50px] h-[50px] mr-[10px]",src:$,alt:""},U={class:"input-width"},X={class:"input-width"},Y={class:"input-width"},z={class:"input-width"},A={class:"input-width"},G={class:"input-width"},H={class:"input-width"},J={class:"dialog-footer"},ae=E({__name:"member-balance-info",setup(K,{expose:v}){const r=u(!1),d=u(!0),f={account_data:0,account_type:"",create_time:"",from_type:"",from_type_name:"",member_id:"",memo:"",related_id:"",member:{headimg:"",mobile:"",member_no:"",username:"",nickname:""}},e=V({...f}),g=u(),w=B(()=>({}));return v({showDialog:r,setFormData:async(c=null)=>{d.value=!0,Object.assign(e,f),c&&Object.keys(e).forEach(i=>{c[i]!=null&&(e[i]=c[i])}),d.value=!1}}),(c,i)=>{const m=R,x=C,y=T,k=j,D=O;return _(),b(k,{modelValue:r.value,"onUpdate:modelValue":i[1]||(i[1]=p=>r.value=p),title:a(o)("balanceInfo"),width:"550px","destroy-on-close":!0},{footer:t(()=>[l("span",J,[s(y,{type:"primary",onClick:i[0]||(i[0]=p=>r.value=!1)},{default:t(()=>[F(n(a(o)("confirm")),1)]),_:1})])]),default:t(()=>[N((_(),b(x,{model:e,"label-width":"110px",ref_key:"formRef",ref:g,rules:a(w),class:"page-form"},{default:t(()=>[s(m,{label:a(o)("headimg")},{default:t(()=>[l("div",q,[e.member.headimg?(_(),h("img",{key:0,class:"w-[50px] h-[50px] mr-[10px]",src:a(I)(e.member.headimg),alt:""},null,8,L)):(_(),h("img",S))])]),_:1},8,["label"]),s(m,{label:a(o)("memberId")},{default:t(()=>[l("div",U,n(e.member.member_no),1)]),_:1},8,["label"]),s(m,{label:a(o)("nickName")},{default:t(()=>[l("div",X,n(e.member.nickname),1)]),_:1},8,["label"]),s(m,{label:a(o)("mobile")},{default:t(()=>[l("div",Y,n(e.member.mobile),1)]),_:1},8,["label"]),s(m,{label:a(o)("accountData")},{default:t(()=>[l("div",z,n(e.account_data),1)]),_:1},8,["label"]),s(m,{label:a(o)("fromType")},{default:t(()=>[l("div",A,n(e.from_type_name),1)]),_:1},8,["label"]),s(m,{label:a(o)("memo")},{default:t(()=>[l("div",G,n(e.memo),1)]),_:1},8,["label"]),s(m,{label:a(o)("createTime")},{default:t(()=>[l("div",H,n(e.create_time),1)]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[D,d.value]])]),_:1},8,["modelValue","title"])}}});export{ae as _};