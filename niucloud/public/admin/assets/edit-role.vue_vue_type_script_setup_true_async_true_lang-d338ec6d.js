import{d as H,r as m,w as L,af as Q,R as z,c as J,e as D,v as N,x as u,g as w,y as s,A as h,B as g,u as r,Q as W}from"./base-d79f9f62.js";/* empty css                   *//* empty css                   *//* empty css                *//* empty css                     *//* empty css                *//* empty css                    *//* empty css                  *//* empty css                 */import"./el-form-item-4ed993c7.js";/* empty css                 */import{t}from"./index-9e0d1e6c.js";import{n as X,o as Y,p as Z,q as ee}from"./sys-3d5b784a.js";import{h as le}from"./storage-5316d819.js";import{E as oe}from"./index-f249e665.js";import{a as te,E as ae}from"./index-6befecc6.js";import{E as se,b as re}from"./index-59eacbf0.js";import{E as ne}from"./index-d4057e2a.js";import{E as ue}from"./index-03649f16.js";import{E as ie}from"./index-0751469c.js";import{E as ce}from"./index-2462875f.js";import{E as de}from"./index-d0ada8fb.js";import{v as me}from"./directive-13582d99.js";const fe={class:"flex items-center justify-between w-11/12"},pe={class:"dialog-footer"},Me=H({__name:"edit-role",emits:["complete"],setup(_e,{expose:O,emit:U}){const _=m(!1),d=m(!1),b=m(!0);let k="";const p=m([]);X().then(l=>{p.value=l.data});const v=m(!1),E=m(!1),f=m(null);L(v,()=>{v.value?f.value.setCheckedNodes(Q(p.value)):f.value.setCheckedNodes([])});const B=le(l=>{a.rules=f.value.getCheckedKeys()}),F=()=>{b.value?(y(p.value),b.value=!1):(S(p.value),b.value=!0)},S=l=>{Object.keys(l).forEach(e=>{f.value.store.nodesMap[l[e].menu_key].expanded=!0,l[e].children&&l[e].children.length>0&&y(l[e].children)})},y=l=>{Object.keys(l).forEach(e=>{f.value.store.nodesMap[l[e].menu_key].expanded=!1,l[e].children&&l[e].children.length>0&&y(l[e].children)})},x={role_id:0,role_name:"",status:1,rules:[]},a=z({...x}),C=m(),A=J(()=>({role_name:[{required:!0,message:t("roleNamePlaceholder"),trigger:"blur"}],rules:[{validator:(l,e,o)=>{e.length?o():o(new Error(t("rulesPlaceholder")))},trigger:"blur"}]})),T=async l=>{if(d.value||!l)return;const e=a.role_id?Y:Z;await l.validate(async o=>{if(o){d.value=!0;const i=Object.assign({},a);i.rules=i.rules.concat(f.value.getHalfCheckedKeys()),e(i).then(n=>{d.value=!1,_.value=!1,U("complete")}).catch(()=>{d.value=!1})}})},I=async(l=null)=>{if(d.value=!0,v.value=!1,Object.assign(a,x),k=t("addRole"),l){k=t("updateRole");const e=await(await ee(l.role_id)).data;Object.keys(a).forEach(o=>{if(e[o]!=null)if(o=="rules"){e.rules;var i=[];Object.keys(e.rules).forEach(n=>{R(e.rules[n],p.value,i)}),a[o]=i}else a[o]=e[o]})}d.value=!1};function R(l,e,o){Object.keys(e).forEach(i=>{let n=e[i];n.menu_key==l?(!n.children||n.children.length==0)&&o.push(n.menu_key):n.children&&n.children.length>0&&R(l,n.children,o)})}return O({showDialog:_,setFormData:I}),(l,e)=>{const o=oe,i=te,n=se,M=re,j=ne,V=ue,P=ie,$=ce,q=ae,K=de,G=me;return D(),N(K,{modelValue:_.value,"onUpdate:modelValue":e[7]||(e[7]=c=>_.value=c),title:r(k),width:"500px","destroy-on-close":!0},{footer:u(()=>[w("span",pe,[s(V,{onClick:e[5]||(e[5]=c=>_.value=!1)},{default:u(()=>[h(g(r(t)("cancel")),1)]),_:1}),s(V,{type:"primary",loading:d.value,onClick:e[6]||(e[6]=c=>T(C.value))},{default:u(()=>[h(g(r(t)("confirm")),1)]),_:1},8,["loading"])])]),default:u(()=>[W((D(),N(q,{model:a,"label-width":"90px",ref_key:"formRef",ref:C,rules:r(A),class:"page-form"},{default:u(()=>[s(i,{label:r(t)("roleName"),prop:"role_name"},{default:u(()=>[s(o,{modelValue:a.role_name,"onUpdate:modelValue":e[0]||(e[0]=c=>a.role_name=c),placeholder:r(t)("roleNamePlaceholder"),clearable:"",disabled:a.uid,class:"input-width",maxlength:"10","show-word-limit":!0},null,8,["modelValue","placeholder","disabled"])]),_:1},8,["label"]),s(i,{label:r(t)("status")},{default:u(()=>[s(M,{modelValue:a.status,"onUpdate:modelValue":e[1]||(e[1]=c=>a.status=c)},{default:u(()=>[s(n,{label:1},{default:u(()=>[h(g(r(t)("startUsing")),1)]),_:1}),s(n,{label:0},{default:u(()=>[h(g(r(t)("statusDeactivate")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),s(i,{label:r(t)("permission"),prop:"rules"},{default:u(()=>[w("div",fe,[w("div",null,[s(j,{modelValue:v.value,"onUpdate:modelValue":e[2]||(e[2]=c=>v.value=c),label:r(t)("selectAll")},null,8,["modelValue","label"]),s(j,{modelValue:E.value,"onUpdate:modelValue":e[3]||(e[3]=c=>E.value=c),label:r(t)("checkStrictly")},null,8,["modelValue","label"])]),s(V,{link:"",type:"primary",onClick:e[4]||(e[4]=c=>F())},{default:u(()=>[h(g(r(t)("foldText")),1)]),_:1})]),s($,{height:"35vh",class:"w-full"},{default:u(()=>[s(P,{data:p.value,props:{label:"menu_name"},"default-checked-keys":a.rules,"check-strictly":E.value,"show-checkbox":"","default-expand-all":"",onCheckChange:r(B),"node-key":"menu_key",ref_key:"treeRef",ref:f},null,8,["data","default-checked-keys","check-strictly","onCheckChange"])]),_:1})]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[G,d.value]])]),_:1},8,["modelValue","title"])}}});export{Me as _};