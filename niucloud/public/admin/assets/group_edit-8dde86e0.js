import{d as Y,r as v,O as H,f as J,q as I,N as d,s as K,a1 as N,y as S,h as p,c,a as t,t as i,u as l,e as n,w as s,F as A,G as P,I as _,B as M,R as Q,i as q,W as Z,X as ee,aC as oe,aD as ae,V as le,a2 as te,aA as se,cN as ne,Y as re,E as de,$ as pe,a0 as ue,p as ce,g as ie,_ as _e}from"./index-9d601459.js";/* empty css                   *//* empty css                *//* empty css                  *//* empty css                *//* empty css                          *//* empty css                    *//* empty css                *//* empty css                 *//* empty css                        *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  */import"./el-form-item-4ed993c7.js";import{p as me,q as fe,r as ve}from"./site-c0bc0315.js";import{g as ge}from"./addon-cbb2516a.js";const B=g=>(ce("data-v-6014b466"),g=g(),ie(),g),he={class:"main-container mb-80"},be={class:"detail-head !mb-[10px]"},xe=B(()=>t("span",{class:"iconfont iconxiangzuojiantou !text-xs"},null,-1)),ye={class:"ml-[1px]"},ke=B(()=>t("span",{class:"adorn"},"|",-1)),we={class:"right"},Ve={key:0,class:"text-gray-400"},Ee={key:1,class:"text-gray-400"},Ce={class:"flex w-[300px]"},Ie={class:"w-full"},Ne={class:"flex"},Se={class:"w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden"},Ae={class:"image-error"},Pe={class:"flex-1 w-0 flex flex-col justify-center"},qe={class:"font-bold"},Be={class:"text-gray-400 mt-[10px]"},De={class:"fixed-footer-wrap"},Re={class:"fixed-footer"},Ge=Y({__name:"group_edit",setup(g){const b=v(!0),m=v([]),x=H(),D=J(),R=x.meta.title,h=v(!1),o=v({group_id:0,group_name:"",group_desc:"",app:"",addon:[]});x.query.id?me(x.query.id).then(({data:r})=>{o.value=r,b.value=!1}).catch():b.value=!1;const y=()=>{D.push("/admin/site/group")};ge().then(({data:r})=>{m.value=r}).catch();const k=I(()=>{const r=[];return o.value.app&&Object.keys(m.value).length&&Object.keys(m.value).forEach(a=>{const u=m.value[a];(u.type=="addon"&&u.support_app==""||u.support_app==o.value.app)&&r.push(u)}),r}),w=v(),G=I(()=>({group_name:[{required:!0,message:d("groupNamePlaceholder"),trigger:"blur"}],app:[{required:!0,message:d("mainAppPlaceholder"),trigger:"blur"}]}));K(()=>o.value.app,(r,a)=>{r&&a&&(o.value.addon=[])});const L=async r=>{if(h.value||!r)return;const a=o.value.group_id?fe:ve;await r.validate(async u=>{u&&(h.value=!0,a(o.value).then(f=>{setTimeout(()=>{y()},1e3)}).catch(()=>{h.value=!1}))})};return(r,a)=>{const u=Z,f=ee,j=oe,F=N("block"),O=ae,V=le,U=N("icon-picture"),T=te,$=se,z=ne,W=re,E=de,X=pe,C=ue;return S((p(),c("div",he,[t("div",be,[t("div",{class:"left",onClick:y},[xe,t("span",ye,i(l(d)("returnToPreviousPage")),1)]),ke,t("span",we,i(l(R)),1)]),n(X,{class:"box-card !border-none",shadow:"never"},{default:s(()=>[n(W,{model:o.value,"label-width":"110px",ref_key:"formRef",ref:w,rules:l(G),class:"page-form"},{default:s(()=>[n(f,{label:l(d)("groupName"),prop:"group_name"},{default:s(()=>[n(u,{modelValue:o.value.group_name,"onUpdate:modelValue":a[0]||(a[0]=e=>o.value.group_name=e),placeholder:l(d)("groupNamePlaceholder"),clearable:"",disabled:o.value.uid,class:"input-width",maxlength:"20","show-word-limit":!0},null,8,["modelValue","placeholder","disabled"])]),_:1},8,["label"]),n(f,{label:l(d)("groupDesc"),prop:"group_desc"},{default:s(()=>[n(u,{modelValue:o.value.group_desc,"onUpdate:modelValue":a[1]||(a[1]=e=>o.value.group_desc=e),type:"textarea",rows:"4",clearable:"",placeholder:l(d)("groupDescPlaceholder"),class:"input-width",maxlength:"100"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),n(f,{label:l(d)("mainApp"),prop:"app"},{default:s(()=>[n(O,{class:"input-width",modelValue:o.value.app,"onUpdate:modelValue":a[2]||(a[2]=e=>o.value.app=e),placeholder:l(d)("mainAppPlaceholder"),disabled:o.value.group_id},{default:s(()=>[(p(!0),c(A,null,P(m.value,e=>(p(),_(F,null,{default:s(()=>[e.type=="app"?(p(),_(j,{key:e.key,label:e.title,value:e.key},null,8,["label","value"])):M("",!0)]),_:2},1024))),256))]),_:1},8,["modelValue","placeholder","disabled"])]),_:1},8,["label"]),n(f,{label:l(d)("containAddon")},{default:s(()=>[o.value.app?l(k).length?(p(),_(z,{key:2,modelValue:o.value.addon,"onUpdate:modelValue":a[3]||(a[3]=e=>o.value.addon=e),class:"flex w-full"},{default:s(()=>[(p(!0),c(A,null,P(l(k),e=>(p(),c("div",Ce,[n($,{label:e.key,name:"",class:"w-full !h-auto border border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"},{default:s(()=>[t("div",Ie,[t("div",Ne,[t("div",Se,[e.cover?(p(),_(V,{key:0,src:l(Q)(e.cover),class:"w-full h-full"},null,8,["src"])):(p(),_(V,{key:1,class:"w-full h-full"},{error:s(()=>[t("div",Ae,[n(T,null,{default:s(()=>[n(U)]),_:1})])]),_:1}))]),t("div",Pe,[t("div",qe,i(e.title),1),t("div",Be,i(e.desc),1)])])])]),_:2},1032,["label"])]))),256))]),_:1},8,["modelValue"])):(p(),c("div",Ee,"没有所选应用可用的插件")):(p(),c("div",Ve,"请先选择主应用"))]),_:1},8,["label"])]),_:1},8,["model","rules"]),t("div",De,[t("div",Re,[S((p(),_(E,{type:"primary",onClick:a[4]||(a[4]=e=>L(w.value))},{default:s(()=>[q(i(l(d)("save")),1)]),_:1})),[[C,h.value]]),n(E,{onClick:a[5]||(a[5]=e=>y())},{default:s(()=>[q(i(l(d)("cancel")),1)]),_:1})])])]),_:1})])),[[C,b.value]])}}});const ao=_e(Ge,[["__scopeId","data-v-6014b466"]]);export{ao as default};