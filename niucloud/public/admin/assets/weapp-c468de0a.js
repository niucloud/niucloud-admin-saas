import{d as q,R as x,r as _,c as A,e as y,f as M,y as r,x as p,g as m,B as d,u as l,A as g,Q as C,v as k}from"./base-9962c822.js";/* empty css                   *//* empty css                   *//* empty css                */import{_ as Q}from"./index.vue_vue_type_style_index_0_lang-f28cbb83.js";import"./el-form-item-4ed993c7.js";/* empty css                 *//* empty css                *//* empty css                      *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                        *//* empty css                    */import"./el-tooltip-4ed993c7.js";/* empty css                  */import{t}from"./index-5516aed6.js";import{h as W,i as G,j as H,k as J}from"./weapp-6fcef875.js";import{u as K,b as O}from"./vue-router-d7e63612.js";import{_ as X}from"./cron-info.vue_vue_type_script_setup_true_lang-460581ce.js";import{E as Y}from"./index-35c5a824.js";import{E as Z}from"./index-7ab57426.js";import{a as ee,E as te}from"./index-4906bae6.js";import{E as oe}from"./index-26709bbd.js";import{E as ae}from"./index-189f302e.js";import{E as re}from"./index-19251c17.js";import{a as ie,E as le}from"./index-7c833df7.js";import{E as ne}from"./index-e2acd187.js";import{v as pe}from"./directive-f75d4a7d.js";import{_ as se}from"./_plugin-vue_export-helper-c27b6911.js";/* empty css                    */import"./storage-0874d153.js";import"./index-57446bef.js";import"./index-5c4817f4.js";import"./index-2cabf788.js";import"./typescript-defaf979.js";import"./index-c98e204a.js";import"./index-4937003d.js";import"./error-78e43d3e.js";import"./index-df16e899.js";import"./pinia-a9fc3924.js";import"./index-e026a545.js";import"./system-1108e5c1.js";import"./index-c4e33d8d.js";import"./index-91fda20f.js";import"./scroll-d85c8f38.js";import"./vnode-562dae50.js";import"./aria-adfa05c5.js";import"./focus-trap-d0fc8554.js";import"./validator-00f31ee7.js";import"./index-71b7d8f4.js";import"./index-1370ab44.js";import"./index-6b77b11a.js";import"./index-2ee99ba1.js";import"./index-ab38878f.js";import"./_Uint8Array-c92ffa25.js";import"./_initCloneObject-41dd9efb.js";import"./index-65bc84a3.js";import"./event-9519ab40.js";import"./isEqual-240b5e0a.js";import"./flatten-940b9f2c.js";import"./_isIterateeCall-909b9c9e.js";import"./debounce-9674000c.js";import"./index-6edd46fb.js";import"./index-22970d5d.js";import"./index-fb8b7863.js";import"./strings-66191554.js";import"./index-ec548bfb.js";const me={class:"main-container"},de={class:"flex justify-between items-center"},ue={class:"text-[20px]"},ce={class:"mt-[10px]"},_e={class:"mt-[16px] flex justify-end"},fe={class:"dialog-footer"},ve=q({__name:"weapp",setup(ge){const D=K().meta.title,o=x({page:1,limit:10,total:0,loading:!0,data:[],searchParam:{title:"",type:"",last_time:""}});_();const u=(n=1)=>{o.loading=!0,o.page=n,W({page:o.page,limit:o.limit,...o.searchParam}).then(e=>{o.loading=!1,o.data=e.data.data,o.total=e.data.total}).catch(()=>{o.loading=!1})};u(),O();const c=_(!1),a=x({...{id:0,desc:"",path:"",version:"",type:"weapp"}}),b=_(),B=()=>{a.id=0,a.desc="",a.path="",a.version="",c.value=!0},T=A(()=>({version:[{required:!0,message:t("versionPlaceholder"),trigger:"blur"}],path:[{required:!0,validator:P,trigger:"blur"}]})),P=(n,e,s)=>a.path==""?s(new Error(t("filePlaceholder"))):s(),f=_(!1),z=async n=>{f.value||!n||await n.validate(async e=>{if(e){f.value=!0;const s=a;(a.id>0?G:H)(s).then(w=>{f.value=!1,c.value=!1,u()}).catch(()=>{f.value=!1})}})},R=n=>{a.id=n.id,a.desc=n.desc,a.path=n.path,a.version=n.version,c.value=!0},U=n=>{Y.confirm(t("weappVersionDeleteTips"),t("warning"),{confirmButtonText:t("confirm"),cancelButtonText:t("cancel"),type:"warning"}).then(()=>{J(n).then(()=>{u()}).catch(()=>{})})},$=_(null);return(n,e)=>{const s=Z,v=ee,w=te,j=oe,F=ae,E=re,h=ie,N=Q,I=le,L=ne,V=pe;return y(),M("div",me,[r(F,{class:"box-card !border-none",shadow:"never"},{default:p(()=>[m("div",de,[m("span",ue,d(l(D)),1),r(s,{type:"primary",onClick:B},{default:p(()=>[g(d(l(t)("addVersion")),1)]),_:1})]),m("div",ce,[C((y(),k(w,{data:o.data,size:"large"},{empty:p(()=>[m("span",null,d(o.loading?"":l(t)("emptyData")),1)]),default:p(()=>[r(v,{prop:"version",label:l(t)("version"),"min-width":"150"},null,8,["label"]),r(v,{prop:"create_time",label:l(t)("createTime"),"min-width":"150"},null,8,["label"]),r(v,{label:l(t)("operation"),align:"right",fixed:"right",width:"130"},{default:p(({row:i})=>[r(s,{type:"primary",link:"",onClick:S=>R(i)},{default:p(()=>[g(d(l(t)("edit")),1)]),_:2},1032,["onClick"]),r(s,{type:"primary",link:"",onClick:S=>U(i.id)},{default:p(()=>[g(d(l(t)("delete")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[V,o.loading]]),m("div",_e,[r(j,{"current-page":o.page,"onUpdate:currentPage":e[0]||(e[0]=i=>o.page=i),"page-size":o.limit,"onUpdate:pageSize":e[1]||(e[1]=i=>o.limit=i),layout:"total, sizes, prev, pager, next, jumper",total:o.total,onSizeChange:e[2]||(e[2]=i=>u()),onCurrentChange:u},null,8,["current-page","page-size","total"])])])]),_:1}),r(X,{ref_key:"cronDialog",ref:$,onComplete:o},null,8,["onComplete"]),r(L,{modelValue:c.value,"onUpdate:modelValue":e[7]||(e[7]=i=>c.value=i),title:l(t)("editVersion"),width:"550px","destroy-on-close":!0},{footer:p(()=>[m("span",fe,[r(s,{type:"primary",onClick:e[6]||(e[6]=i=>z(b.value))},{default:p(()=>[g(d(l(t)("confirm")),1)]),_:1})])]),default:p(()=>[C((y(),k(I,{model:a,"label-width":"110px",ref_key:"formRef",ref:b,rules:l(T),class:"page-form"},{default:p(()=>[r(h,{label:l(t)("version"),prop:"version"},{default:p(()=>[r(E,{modelValue:a.version,"onUpdate:modelValue":e[3]||(e[3]=i=>a.version=i),placeholder:l(t)("versionPlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(h,{label:l(t)("file"),prop:"path"},{default:p(()=>[r(N,{modelValue:a.path,"onUpdate:modelValue":e[4]||(e[4]=i=>a.path=i),class:"input-width",api:"applet/upload"},null,8,["modelValue"])]),_:1},8,["label"]),r(h,{label:l(t)("desc")},{default:p(()=>[r(E,{type:"textarea",modelValue:a.desc,"onUpdate:modelValue":e[5]||(e[5]=i=>a.desc=i),class:"input-width",clearable:""},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"])),[[V,n.loading]])]),_:1},8,["modelValue","title"])])}}});const Ft=se(ve,[["__scopeId","data-v-c333e3a9"]]);export{Ft as default};