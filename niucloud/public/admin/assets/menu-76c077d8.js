import"./base-962c0c23.js";/* empty css                   *//* empty css                *//* empty css                 *//* empty css                    *//* empty css               */import"./el-tooltip-58212670.js";import{B as x}from"./index-5cfb4637.js";/* empty css                        */import{r as T}from"./sys-451b2f0d.js";import{t as e}from"./index-2af60c2e.js";import{_ as D}from"./edit-menu.vue_vue_type_script_setup_true_lang-51d95eb9.js";import{u as E}from"./vue-router-79053937.js";import{a as C,E as N}from"./index-92e1b5d5.js";import{E as B}from"./index-4f5c40a5.js";import{E as M}from"./index-69523418.js";import{v as V}from"./directive-c0c3e9a3.js";import{d as L,M as z,r as $,b as m,e as s,q as a,p as i,f as p,x as l,u as t,L as j,m as c,C as u,v as b}from"./runtime-core.esm-bundler-dc7a07d7.js";import"./el-overlay-60700377.js";import"./event-ff03ec12.js";import"./index-5d86eb33.js";import"./focus-trap-b8b5a003.js";/* empty css                  *//* empty css                 */import"./el-radio-bfd4b1ad.js";import"./storage-abe718b1.js";import"./index-8bcaafa6.js";import"./index-bba9e58c.js";import"./index-93f2c618.js";import"./index-7a123a20.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./el-avatar-3bb47ce2.js";import"./index-d57cc47d.js";import"./common-6291c908.js";import"./common-2cf17469.js";/* empty css                     *//* empty css                        *//* empty css                   */import"./index-e1e81893.js";/* empty css                  *//* empty css                  */import"./select-menu-item.vue_vue_type_script_setup_true_lang-430872c2.js";import"./index-b933df38.js";import"./strings-4868a118.js";import"./isEqual-c7d5e6d9.js";import"./_Uint8Array-6ff3cafa.js";import"./index-61c777fa.js";import"./_initCloneObject-28e6bdaa.js";import"./index-fb71f009.js";import"./index-179d7e6f.js";import"./index-df51d91a.js";import"./flatten-d5d1dc97.js";import"./_isIterateeCall-c579b126.js";const q={class:"main-container"},I={class:"flex justify-between items-center"},R={class:"text-[24px]"},S={class:"mt-[20px]"},A={key:0},F={key:1},G={key:2},Kt=L({__name:"menu",setup(H){const h=E().meta.title,n=z({loading:!0,data:[]}),d=()=>{n.loading=!0,T("admin").then(_=>{n.loading=!1,n.data=_.data}).catch(()=>{})};d();const y=$(null);return(_,K)=>{const r=C,g=x,f=B,v=N,k=M,w=V;return m(),s("div",q,[a(k,{class:"box-card !border-none",shadow:"never"},{default:i(()=>[p("div",I,[p("span",R,l(t(h)),1)]),p("div",S,[j((m(),c(v,{data:n.data,"row-key":"menu_key",size:"large"},{empty:i(()=>[p("span",null,l(n.loading?"":t(e)("emptyData")),1)]),default:i(()=>[a(r,{prop:"menu_name","show-overflow-tooltip":!0,label:t(e)("menuName"),"min-width":"150"},null,8,["label"]),a(r,{label:t(e)("icon"),width:"100",align:"center"},{default:i(({row:o})=>[o.icon?(m(),c(g,{key:0,name:o.icon,size:"18px"},null,8,["name"])):u("",!0)]),_:1},8,["label"]),a(r,{label:t(e)("menuType"),width:"80"},{default:i(({row:o})=>[o.menu_type==0?(m(),s("div",A,l(t(e)("menuTypeDir")),1)):o.menu_type==1?(m(),s("div",F,l(t(e)("menuTypeMenu")),1)):o.menu_type==2?(m(),s("div",G,l(t(e)("menuTypeButton")),1)):u("",!0)]),_:1},8,["label"]),a(r,{prop:"api_url",label:t(e)("authId"),"min-width":"150",align:"center"},null,8,["label"]),a(r,{label:t(e)("status"),"min-width":"120",align:"center"},{default:i(({row:o})=>[o.status==1?(m(),c(f,{key:0,class:"ml-2",type:"success"},{default:i(()=>[b(l(t(e)("statusNormal")),1)]),_:1})):u("",!0),o.status==0?(m(),c(f,{key:1,class:"ml-2",type:"error"},{default:i(()=>[b(l(t(e)("statusDeactivate")),1)]),_:1})):u("",!0)]),_:1},8,["label"]),a(r,{prop:"sort",label:t(e)("sort"),"min-width":"100"},null,8,["label"]),a(r,{prop:"create_time",label:t(e)("createTime"),width:"180"},null,8,["label"]),a(r,{label:t(e)("operation"),fixed:"right",width:"130"},{default:i(({row:o})=>[]),_:1},8,["label"])]),_:1},8,["data"])),[[w,n.loading]])]),a(D,{ref_key:"editMenuDialog",ref:y,"menu-tree":n.data,onComplete:d},null,8,["menu-tree"])]),_:1})])}}});export{Kt as default};