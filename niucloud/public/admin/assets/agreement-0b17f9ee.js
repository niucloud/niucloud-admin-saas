import{d as v,O as y,n as x,f as k,h as m,c as E,e as a,w as o,a as i,t as r,u as e,y as C,I as N,N as n,i as p,ah as B,E as T,aj as D,$ as L,a0 as j}from"./index-9d601459.js";/* empty css                   *//* empty css                *//* empty css                        *//* empty css                    *//* empty css               */import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                     *//* empty css                  */import{I as A}from"./sys-45a56363.js";const V={class:"main-container"},$={class:"flex justify-between items-center"},I={class:"text-[20px]"},O={class:"mt-[20px]"},Y=v({__name:"agreement",setup(R){const _=y().meta.title;let t=x({loading:!0,data:[]});(()=>{t.loading=!0,t.data=[],A().then(l=>{Object.keys(l.data).forEach(d=>t.data.push(l.data[d])),t.loading=!1}).catch(()=>{t.loading=!1})})();const u=k(),g=l=>{u.push(`/setting/agreement/edit?key=${l.agreement_key}`)};return(l,d)=>{const s=B,h=T,f=D,b=L,w=j;return m(),E("div",V,[a(b,{class:"box-card !border-none",shadow:"never"},{default:o(()=>[i("div",$,[i("span",I,r(e(_)),1)]),i("div",O,[C((m(),N(f,{data:e(t).data,size:"large"},{empty:o(()=>[i("span",null,r(e(t).loading?"":e(n)("emptyData")),1)]),default:o(()=>[a(s,{prop:"type_name",label:e(n)("typeName"),"min-width":"100","show-overflow-tooltip":!0},null,8,["label"]),a(s,{prop:"title",label:e(n)("title"),"min-width":"100","show-overflow-tooltip":!0},null,8,["label"]),a(s,{label:e(n)("updateTime"),"min-width":"180",align:"center"},{default:o(({row:c})=>[p(r(c.update_time||""),1)]),_:1},8,["label"]),a(s,{label:e(n)("operation"),align:"right",fixed:"right",width:"100"},{default:o(({row:c})=>[a(h,{type:"primary",link:"",onClick:q=>g(c)},{default:o(()=>[p(r(e(n)("config")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[w,e(t).loading]])])]),_:1})])}}});export{Y as default};