import{d as w,R as y,e as c,f as x,y as o,x as a,g as n,B as l,u as t,Q as E,v as k,A as d}from"./base-d79f9f62.js";/* empty css                   *//* empty css                *//* empty css                        *//* empty css                    *//* empty css               */import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                     *//* empty css                  */import{t as i}from"./index-9e0d1e6c.js";import{I as B}from"./sys-3d5b784a.js";import{u as C,b as N}from"./vue-router-fc35ac55.js";import{a as T,E as A}from"./index-2b5d43b9.js";import{E as D}from"./index-03649f16.js";import{E as L}from"./index-ba59a1dc.js";import{v as R}from"./directive-13582d99.js";import"./pinia-55149fa9.js";import"./index-6fcaf7b3.js";import"./storage-5316d819.js";import"./index-2048a34f.js";import"./index-3fd412a3.js";import"./index-542aa78e.js";import"./typescript-defaf979.js";import"./index-34cd7f55.js";import"./system-d23898e7.js";import"./index-5dbb8f83.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./index-2462875f.js";import"./error-78e43d3e.js";import"./index-54a839cc.js";import"./index-71aec1df.js";import"./focus-trap-50fa5770.js";import"./_Uint8Array-bbbfd6ac.js";import"./_initCloneObject-a2c44136.js";import"./index-d4057e2a.js";import"./event-9519ab40.js";import"./index-427f5a83.js";import"./isEqual-3f50b221.js";import"./flatten-0bbd547a.js";import"./_isIterateeCall-559d3e90.js";import"./debounce-6fd93949.js";import"./index-af085fbd.js";import"./index-6229e0fd.js";import"./index-bdfee32a.js";const V={class:"main-container"},j={class:"flex justify-between items-center"},$={class:"text-[20px]"},z={class:"mt-[20px]"},Rt=w({__name:"agreement",setup(I){const _=C().meta.title;let e=y({loading:!0,data:[]});(()=>{e.loading=!0,e.data=[],B().then(r=>{Object.keys(r.data).forEach(s=>e.data.push(r.data[s])),e.loading=!1}).catch(()=>{e.loading=!1})})();const u=N(),f=r=>{u.push(`/setting/agreement/edit?key=${r.agreement_key}`)};return(r,s)=>{const m=T,g=D,h=A,b=L,v=R;return c(),x("div",V,[o(b,{class:"box-card !border-none",shadow:"never"},{default:a(()=>[n("div",j,[n("span",$,l(t(_)),1)]),n("div",z,[E((c(),k(h,{data:t(e).data,size:"large"},{empty:a(()=>[n("span",null,l(t(e).loading?"":t(i)("emptyData")),1)]),default:a(()=>[o(m,{prop:"type_name",label:t(i)("typeName"),"min-width":"100","show-overflow-tooltip":!0},null,8,["label"]),o(m,{prop:"title",label:t(i)("title"),"min-width":"100","show-overflow-tooltip":!0},null,8,["label"]),o(m,{label:t(i)("updateTime"),"min-width":"180",align:"center"},{default:a(({row:p})=>[d(l(p.update_time||""),1)]),_:1},8,["label"]),o(m,{label:t(i)("operation"),align:"right",fixed:"right",width:"100"},{default:a(({row:p})=>[o(g,{type:"primary",link:"",onClick:S=>f(p)},{default:a(()=>[d(l(t(i)("config")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[v,t(e).loading]])])]),_:1})])}}});export{Rt as default};