import{d as z,O as N,n as j,r as g,h as D,c as I,e as a,w as n,a as _,t as m,u as e,i as p,N as l,y as U,I as L,a8 as R,E as S,W as M,X as O,Y as W,$ as X,ah as Y,aj as q,as as A,a0 as G,_ as H}from"./index-9d601459.js";/* empty css                   *//* empty css                      *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                        *//* empty css                    */import"./el-tooltip-4ed993c7.js";/* empty css                *//* empty css                */import"./el-form-item-4ed993c7.js";/* empty css                  */import{b as J,d as K}from"./dict-4da82d1e.js";import{_ as Q}from"./edit.vue_vue_type_style_index_0_lang-6fa59c52.js";import{_ as Z}from"./dict.vue_vue_type_style_index_0_lang-e66d9d0e.js";/* empty css                   *//* empty css                        */const ee={class:"main-container"},te={class:"flex justify-between items-center"},ae={class:"text-[20px]"},le={class:"mt-[10px]"},oe={class:"mt-[16px] flex justify-end"},ne=z({__name:"list",setup(ie){const x=N().meta.title;let t=j({page:1,limit:10,total:0,loading:!0,data:[],searchParam:{name:"",key:""}});const y=g(),s=(r=1)=>{t.loading=!0,t.page=r,J({page:t.page,limit:t.limit,...t.searchParam}).then(o=>{t.loading=!1,t.data=o.data.data,t.total=o.data.total}).catch(()=>{t.loading=!1})};s();const c=g(null),C=()=>{c.value.setFormData(),c.value.showDialog=!0},w=r=>{c.value.setFormData(r),c.value.showDialog=!0},h=g(null),E=r=>{h.value.setFormData(r)},P=r=>{R.confirm(l("dictDeleteTips"),l("warning"),{confirmButtonText:l("confirm"),cancelButtonText:l("cancel"),type:"warning"}).then(()=>{K(r).then(()=>{s()}).catch(()=>{})})},F=r=>{r&&(r.resetFields(),s())};return(r,o)=>{const d=S,b=M,f=O,V=W,v=X,u=Y,$=q,B=A,T=G;return D(),I("div",ee,[a(v,{class:"box-card !border-none",shadow:"never"},{default:n(()=>[_("div",te,[_("span",ae,m(e(x)),1),a(d,{type:"primary",onClick:C},{default:n(()=>[p(m(e(l)("addDict")),1)]),_:1})]),a(v,{class:"box-card !border-none my-[10px] table-search-wrap",shadow:"never"},{default:n(()=>[a(V,{inline:!0,model:e(t).searchParam,ref_key:"searchFormRef",ref:y},{default:n(()=>[a(f,{label:e(l)("name"),prop:"name"},{default:n(()=>[a(b,{modelValue:e(t).searchParam.name,"onUpdate:modelValue":o[0]||(o[0]=i=>e(t).searchParam.name=i),placeholder:e(l)("namePlaceholder")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),a(f,{label:e(l)("key"),prop:"key"},{default:n(()=>[a(b,{modelValue:e(t).searchParam.key,"onUpdate:modelValue":o[1]||(o[1]=i=>e(t).searchParam.key=i),placeholder:e(l)("keyPlaceholder")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),a(f,null,{default:n(()=>[a(d,{type:"primary",onClick:o[2]||(o[2]=i=>s())},{default:n(()=>[p(m(e(l)("search")),1)]),_:1}),a(d,{onClick:o[3]||(o[3]=i=>F(y.value))},{default:n(()=>[p(m(e(l)("reset")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1}),_("div",le,[U((D(),L($,{data:e(t).data,size:"large"},{empty:n(()=>[_("span",null,m(e(t).loading?"":e(l)("emptyData")),1)]),default:n(()=>[a(u,{prop:"name",label:e(l)("name"),"min-width":"120"},null,8,["label"]),a(u,{prop:"key",label:e(l)("key"),"min-width":"120"},null,8,["label"]),a(u,{prop:"memo",label:e(l)("memo"),"min-width":"120"},null,8,["label"]),a(u,{prop:"create_time",label:e(l)("createTime"),"min-width":"120"},null,8,["label"]),a(u,{label:e(l)("operation"),align:"right",fixed:"right","min-width":"120"},{default:n(({row:i})=>[a(d,{type:"primary",link:"",onClick:k=>E(i)},{default:n(()=>[p(m(e(l)("dictData")),1)]),_:2},1032,["onClick"]),a(d,{type:"primary",link:"",onClick:k=>w(i)},{default:n(()=>[p(m(e(l)("edit")),1)]),_:2},1032,["onClick"]),a(d,{type:"primary",link:"",onClick:k=>P(i.id)},{default:n(()=>[p(m(e(l)("delete")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[T,e(t).loading]]),_("div",oe,[a(B,{"current-page":e(t).page,"onUpdate:current-page":o[4]||(o[4]=i=>e(t).page=i),"page-size":e(t).limit,"onUpdate:page-size":o[5]||(o[5]=i=>e(t).limit=i),layout:"total, sizes, prev, pager, next, jumper",total:e(t).total,onSizeChange:o[6]||(o[6]=i=>s()),onCurrentChange:s},null,8,["current-page","page-size","total"])])]),a(Q,{ref_key:"editDictDialog",ref:c,onComplete:s},null,512),a(Z,{ref_key:"dictDialog",ref:h,onComplete:s},null,512)]),_:1})])}}});const Ve=H(ne,[["__scopeId","data-v-bc0e4c55"]]);export{Ve as default};