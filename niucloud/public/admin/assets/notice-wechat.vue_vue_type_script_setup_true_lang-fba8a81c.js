import{d as R,r as v,n as C,q as j,h as f,I as y,w as a,a as _,e as s,i as p,t as i,u as l,N as n,y as L,c as k,F as U,G,ay as I,az as O,X as S,Y as $,E as q,aa as z,a0 as K}from"./index-9d601459.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                */import"./el-form-item-4ed993c7.js";/* empty css                 */import{a as T}from"./notice-23b176e8.js";const X={class:"input-width"},Y={class:"input-width"},A={class:"input-width"},H={class:"input-width"},J={class:"dialog-footer"},ne=R({__name:"notice-wechat",emits:["complete"],setup(M,{expose:D,emit:V}){const u=v(!1),r=v(!0),h={is_wechat:0,key:"",name:"",title:"",type:"",content:[],temp_key:"",keyword_name_list:""},t=C({...h}),w=v(),E=j(()=>({})),x=async o=>{r.value||!o||await o.validate(async e=>{if(e){r.value=!0;const c=t;c.status=c.is_wechat,T(c).then(b=>{r.value=!1,u.value=!1,V("complete")}).catch(()=>{r.value=!1})}})};return D({showDialog:u,setFormData:async(o=null)=>{r.value=!0,Object.assign(t,h),o&&Object.keys(t).forEach(e=>{o[e]!=null&&(t[e]=o[e]),o.wechat&&o.wechat[e]!=null&&(t[e]=o.wechat[e])}),r.value=!1}}),(o,e)=>{const c=I,b=O,m=S,F=$,g=q,N=z,B=K;return f(),y(N,{modelValue:u.value,"onUpdate:modelValue":e[3]||(e[3]=d=>u.value=d),title:l(n)("noticeSetting"),width:"550px","destroy-on-close":!0},{footer:a(()=>[_("span",J,[s(g,{onClick:e[1]||(e[1]=d=>u.value=!1)},{default:a(()=>[p(i(l(n)("cancel")),1)]),_:1}),s(g,{type:"primary",loading:r.value,onClick:e[2]||(e[2]=d=>x(w.value))},{default:a(()=>[p(i(l(n)("confirm")),1)]),_:1},8,["loading"])])]),default:a(()=>[L((f(),y(F,{model:t,"label-width":"110px",ref_key:"formRef",ref:w,rules:l(E),class:"page-form"},{default:a(()=>[s(m,{label:l(n)("status")},{default:a(()=>[s(b,{modelValue:t.is_wechat,"onUpdate:modelValue":e[0]||(e[0]=d=>t.is_wechat=d)},{default:a(()=>[s(c,{label:1},{default:a(()=>[p(i(l(n)("startUsing")),1)]),_:1}),s(c,{label:0},{default:a(()=>[p(i(l(n)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),s(m,{label:l(n)("name")},{default:a(()=>[_("div",X,i(t.name),1)]),_:1},8,["label"]),s(m,{label:l(n)("tempKey")},{default:a(()=>[_("div",Y,i(t.temp_key),1)]),_:1},8,["label"]),s(m,{label:l(n)("keywordNameList")},{default:a(()=>[_("div",A,i(t.keyword_name_list?t.keyword_name_list.join("，"):""),1)]),_:1},8,["label"]),s(m,{label:l(n)("content")},{default:a(()=>[_("div",H,[(f(!0),k(U,null,G(t.content,(d,Q)=>(f(),k("div",null,i(d[0])+"："+i(d[1]),1))),256))])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[B,r.value]])]),_:1},8,["modelValue","title"])}}});export{ne as _};