import{d as S,O as j,f as I,r as v,n as R,a1 as $,h as _,c as h,a as p,t as i,u as e,e as t,w as n,N as a,y as q,I as z,F as O,G as U,i as g,aN as W,aD as G,aE as M,a2 as P,ar as H,ah as J,E as K,aj as Q,$ as X,a0 as Y,_ as Z}from"./index-4dcc0234.js";/* empty css                   *//* empty css                *//* empty css                        *//* empty css                    *//* empty css               */import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                     *//* empty css                  *//* empty css                 *//* empty css                *//* empty css                    */import{e as ee,f as ae}from"./weapp-4d690662.js";import{e as te}from"./notice-b720dec8.js";const le={class:"main-container p-5"},ne={class:"flex justify-between items-center mb-[20px]"},oe={class:"text-[20px]"},se={class:"flex"},ie={class:"text-base"},ce={class:"text-base"},pe=S({__name:"template",setup(re){const w=j(),y=I(),k=w.meta.title,m=v("/channel/weapp/message"),x=c=>{y.push({path:m.value})},o=R({loading:!0,data:[]}),u=(c=1)=>{o.loading=!0,ee().then(l=>{o.loading=!1,o.data=l.data}).catch(()=>{o.loading=!1})};u();const C=(c=null)=>{const l=W.service({lock:!0,background:"rgba(0, 0, 0, 0)"});ae({keys:c?[c.key]:[]}).then(()=>{u(),l.close()}).catch(()=>{l.close()})},E=c=>{const l=v({key:"",type:"",status:0});l.value.status=c.is_weapp?0:1,l.value.key=c.key,l.value.type="weapp",o.loading=!0,te(l.value).then(d=>{u()}).catch(()=>{o.loading=!1})};return(c,l)=>{const d=G,T=M,N=$("Warning"),B=P,D=H,r=J,f=K,V=Q,L=X,A=Y;return _(),h("div",le,[p("div",ne,[p("span",oe,i(e(k)),1)]),t(T,{modelValue:m.value,"onUpdate:modelValue":l[0]||(l[0]=s=>m.value=s),class:"demo-tabs",onTabChange:x},{default:n(()=>[t(d,{label:e(a)("weappAccessFlow"),name:"/channel/weapp"},null,8,["label"]),t(d,{label:e(a)("subscribeMessage"),name:"/channel/weapp/message"},null,8,["label"]),t(d,{label:e(a)("weappRelease"),name:"/channel/weapp/code"},null,8,["label"])]),_:1},8,["modelValue"]),t(L,{class:"box-card !border-none",shadow:"never"},{default:n(()=>[t(D,{class:"warm-prompt !my-[20px]",type:"info"},{default:n(()=>[p("div",se,[t(B,{class:"mr-2 mt-[2px]",size:"18"},{default:n(()=>[t(N)]),_:1}),p("div",null,[p("p",ie,i(e(a)("operationTip"))+" 1、"+i(e(a)("operationTipOne")),1),p("p",ce,"2、"+i(e(a)("operationTipTwo")),1)])])]),_:1}),p("div",null,[q((_(),z(V,{data:o.data,size:"large"},{empty:n(()=>[p("span",null,i(o.loading?"":e(a)("emptyData")),1)]),default:n(()=>[t(r,{prop:"name","show-overflow-tooltip":!0,label:e(a)("name"),"min-width":"150"},null,8,["label"]),t(r,{label:e(a)("response"),"min-width":"180"},{default:n(({row:s})=>[(_(!0),h(O,null,U(s.weapp.content,(b,F)=>(_(),h("div",{key:"a"+F,class:"text-left"},i(b.join(":")),1))),128))]),_:1},8,["label"]),t(r,{label:e(a)("isStart"),"min-width":"100",align:"center"},{default:n(({row:s})=>[g(i(s.is_weapp==1?e(a)("startUsing"):e(a)("statusDeactivate")),1)]),_:1},8,["label"]),t(r,{prop:"weapp_template_id",label:e(a)("serialNumber"),"min-width":"180"},null,8,["label"]),t(r,{label:e(a)("operation"),fixed:"right",align:"right",width:"200"},{default:n(({row:s})=>[t(f,{type:"primary",link:"",onClick:b=>E(s)},{default:n(()=>[g(i(s.is_weapp==1?e(a)("close"):e(a)("open")),1)]),_:2},1032,["onClick"]),t(f,{type:"primary",link:"",onClick:b=>C(s)},{default:n(()=>[g(i(e(a)("regain")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[A,o.loading]])])]),_:1})])}}});const Te=Z(pe,[["__scopeId","data-v-7b416d0e"]]);export{Te as default};