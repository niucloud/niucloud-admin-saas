import{d as F,r as v,R as S,V as z,e as _,f as b,g as r,B as s,u as e,y as a,x as l,i as j,Q as q,v as I,F as U,z as W,A as g}from"./base-9962c822.js";/* empty css                   *//* empty css                *//* empty css                        *//* empty css                    *//* empty css               */import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                     *//* empty css                  *//* empty css                 *//* empty css                *//* empty css                    */import{t}from"./index-6e46fb55.js";import{e as M,f as O}from"./weapp-490ee348.js";import{e as P}from"./notice-4dd0e0bf.js";import{u as Q,b as $}from"./vue-router-d7e63612.js";import{E as G}from"./index-5ec7f715.js";import{a as H,E as J}from"./index-da093955.js";import{E as K}from"./index-57446bef.js";import{E as X}from"./index-619ac704.js";import{a as Y,E as Z}from"./index-4906bae6.js";import{E as ee}from"./index-7ab57426.js";import{E as te}from"./index-189f302e.js";import{v as ae}from"./directive-f75d4a7d.js";import{_ as oe}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-a9fc3924.js";import"./index-38fee8c5.js";import"./storage-0874d153.js";import"./index-5c4817f4.js";import"./index-2cabf788.js";import"./typescript-defaf979.js";import"./index-c98e204a.js";import"./system-1108e5c1.js";import"./index-c4e33d8d.js";import"./error-78e43d3e.js";import"./strings-66191554.js";import"./event-9519ab40.js";import"./vnode-562dae50.js";import"./index-1370ab44.js";import"./index-2ee99ba1.js";import"./index-ab38878f.js";import"./index-71b7d8f4.js";import"./focus-trap-d0fc8554.js";import"./_Uint8Array-c92ffa25.js";import"./_initCloneObject-41dd9efb.js";import"./index-65bc84a3.js";import"./index-6b77b11a.js";import"./isEqual-240b5e0a.js";import"./flatten-940b9f2c.js";import"./_isIterateeCall-909b9c9e.js";import"./debounce-9674000c.js";import"./index-6edd46fb.js";import"./index-df16e899.js";const le={class:"main-container p-5"},ne={class:"flex justify-between items-center mb-[20px]"},ie={class:"text-[20px]"},se={class:"flex"},pe={class:"text-base"},re={class:"text-base"},me=F({__name:"template",setup(ce){const w=Q(),y=$(),x=w.meta.title;let m=v("/channel/weapp/message");const k=p=>{y.push({path:m.value})},i=S({loading:!0,data:[]}),u=(p=1)=>{i.loading=!0,M().then(o=>{i.loading=!1,i.data=o.data}).catch(()=>{i.loading=!1})};u();const E=(p=null)=>{const o=G.service({lock:!0,background:"rgba(0, 0, 0, 0)"});O({keys:p?[p.key]:[]}).then(()=>{u(),o.close()}).catch(()=>{o.close()})},C=p=>{const o=v({key:"",type:"",status:0});o.value.status=p.is_weapp?0:1,o.value.key=p.key,o.value.type="weapp",i.loading=!0,P(o.value).then(d=>{u()}).catch(()=>{i.loading=!1})};return(p,o)=>{const d=H,T=J,B=z("Warning"),N=K,V=X,c=Y,h=ee,A=Z,D=te,L=ae;return _(),b("div",le,[r("div",ne,[r("span",ie,s(e(x)),1)]),a(T,{modelValue:e(m),"onUpdate:modelValue":o[0]||(o[0]=n=>j(m)?m.value=n:m=n),class:"demo-tabs",onTabChange:k},{default:l(()=>[a(d,{label:e(t)("weappAccessFlow"),name:"/channel/weapp"},null,8,["label"]),a(d,{label:e(t)("subscribeMessage"),name:"/channel/weapp/message"},null,8,["label"]),a(d,{label:e(t)("weappRelease"),name:"/channel/weapp/code"},null,8,["label"])]),_:1},8,["modelValue"]),a(D,{class:"box-card !border-none",shadow:"never"},{default:l(()=>[a(V,{class:"warm-prompt !my-[20px]",type:"info"},{default:l(()=>[r("div",se,[a(N,{class:"mr-2 mt-[2px]",size:"18"},{default:l(()=>[a(B)]),_:1}),r("div",null,[r("p",pe,s(e(t)("operationTip"))+" 1、"+s(e(t)("operationTipOne")),1),r("p",re,"2、"+s(e(t)("operationTipTwo")),1)])])]),_:1}),r("div",null,[q((_(),I(A,{data:i.data,size:"large"},{empty:l(()=>[r("span",null,s(i.loading?"":e(t)("emptyData")),1)]),default:l(()=>[a(c,{prop:"name","show-overflow-tooltip":!0,label:e(t)("name"),"min-width":"150"},null,8,["label"]),a(c,{label:e(t)("response"),"min-width":"180"},{default:l(({row:n})=>[(_(!0),b(U,null,W(n.weapp.content,(f,R)=>(_(),b("div",{key:"a"+R,class:"text-left"},s(f.join(":")),1))),128))]),_:1},8,["label"]),a(c,{label:e(t)("isStart"),"min-width":"100",align:"center"},{default:l(({row:n})=>[g(s(n.is_weapp==1?e(t)("startUsing"):e(t)("statusDeactivate")),1)]),_:1},8,["label"]),a(c,{prop:"weapp_template_id",label:e(t)("serialNumber"),"min-width":"180"},null,8,["label"]),a(c,{label:e(t)("operation"),fixed:"right",align:"right",width:"200"},{default:l(({row:n})=>[a(h,{type:"primary",link:"",onClick:f=>C(n)},{default:l(()=>[g(s(n.is_weapp==1?e(t)("close"):e(t)("open")),1)]),_:2},1032,["onClick"]),a(h,{type:"primary",link:"",onClick:f=>E(n)},{default:l(()=>[g(s(e(t)("regain")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[L,i.loading]])])]),_:1})])}}});const dt=oe(me,[["__scopeId","data-v-6642b9de"]]);export{dt as default};
