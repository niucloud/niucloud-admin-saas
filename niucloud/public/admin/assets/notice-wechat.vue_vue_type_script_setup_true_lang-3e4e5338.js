import{d as N,r as v,R as C,c as j,e as f,v as y,x as a,g as _,y as s,A as p,B as i,u as o,Q as L,f as E,F as U,z as O}from"./base-9962c822.js";/* empty css                   *//* empty css                   *//* empty css                  *//* empty css                */import"./el-form-item-4ed993c7.js";/* empty css                 */import{t as n}from"./index-5516aed6.js";import{a as S}from"./notice-2b44e053.js";import{E as $,b as z}from"./index-13fd1eb5.js";import{a as A,E as G}from"./index-7c833df7.js";import{E as I}from"./index-7ab57426.js";import{E as K}from"./index-e2acd187.js";import{v as Q}from"./directive-f75d4a7d.js";const T={class:"input-width"},q={class:"input-width"},H={class:"input-width"},J={class:"input-width"},M={class:"dialog-footer"},ue=N({__name:"notice-wechat",emits:["complete"],setup(P,{expose:k,emit:D}){const c=v(!1),r=v(!0),h={is_wechat:0,key:"",name:"",title:"",type:"",content:[],temp_key:"",keyword_name_list:""},t=C({...h}),b=v(),V=j(()=>({})),x=async l=>{r.value||!l||await l.validate(async e=>{if(e){r.value=!0;const d=t;d.status=d.is_wechat,S(d).then(g=>{r.value=!1,c.value=!1,D("complete")}).catch(()=>{r.value=!1})}})};return k({showDialog:c,setFormData:async(l=null)=>{r.value=!0,Object.assign(t,h),l&&Object.keys(t).forEach(e=>{l[e]!=null&&(t[e]=l[e]),l.wechat&&l.wechat[e]!=null&&(t[e]=l.wechat[e])}),r.value=!1}}),(l,e)=>{const d=$,g=z,u=A,F=G,w=I,B=K,R=Q;return f(),y(B,{modelValue:c.value,"onUpdate:modelValue":e[3]||(e[3]=m=>c.value=m),title:o(n)("noticeSetting"),width:"550px","destroy-on-close":!0},{footer:a(()=>[_("span",M,[s(w,{onClick:e[1]||(e[1]=m=>c.value=!1)},{default:a(()=>[p(i(o(n)("cancel")),1)]),_:1}),s(w,{type:"primary",loading:r.value,onClick:e[2]||(e[2]=m=>x(b.value))},{default:a(()=>[p(i(o(n)("confirm")),1)]),_:1},8,["loading"])])]),default:a(()=>[L((f(),y(F,{model:t,"label-width":"110px",ref_key:"formRef",ref:b,rules:o(V),class:"page-form"},{default:a(()=>[s(u,{label:o(n)("status")},{default:a(()=>[s(g,{modelValue:t.is_wechat,"onUpdate:modelValue":e[0]||(e[0]=m=>t.is_wechat=m)},{default:a(()=>[s(d,{label:1},{default:a(()=>[p(i(o(n)("startUsing")),1)]),_:1}),s(d,{label:0},{default:a(()=>[p(i(o(n)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),s(u,{label:o(n)("name")},{default:a(()=>[_("div",T,i(t.name),1)]),_:1},8,["label"]),s(u,{label:o(n)("tempKey")},{default:a(()=>[_("div",q,i(t.temp_key),1)]),_:1},8,["label"]),s(u,{label:o(n)("keywordNameList")},{default:a(()=>[_("div",H,i(t.keyword_name_list?t.keyword_name_list.join("，"):""),1)]),_:1},8,["label"]),s(u,{label:o(n)("content")},{default:a(()=>[_("div",J,[(f(!0),E(U,null,O(t.content,(m,X)=>(f(),E("div",null,i(m[0])+"："+i(m[1]),1))),256))])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[R,r.value]])]),_:1},8,["modelValue","title"])}}});export{ue as _};