import{d as pe,f as ue,O as me,n as E,q as Y,N as a,r as y,h as p,c as h,e as o,w as n,a as w,t as d,u as t,i as m,F as T,G as S,I as v,y as ce,B as U,a8 as fe,E as _e,W as ye,X as ge,as as he,aE as ve,Y as be,_ as we,ah as Ve,aj as Pe,a4 as ke,aa as Ce,aC as De,aD as xe,$ as Ee}from"./index-30b146d4.js";/* empty css                   */import{_ as Te}from"./index-703c7b0d.js";/* empty css                    *//* empty css                   *//* empty css                      *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                        *//* empty css                    */import"./el-tooltip-4ed993c7.js";/* empty css                *//* empty css                     *//* empty css                  */import{f as Ue,h as $e,j as Fe,s as Ne,k as Se,l as Re}from"./diy-da768e85.js";import{q as Be}from"./sys-60b0e237.js";/* empty css                        */import"./index.vue_vue_type_style_index_0_lang-0932323d.js";import"./attachment-1d3d6019.js";/* empty css                 *//* empty css                 *//* empty css               *//* empty css                    *//* empty css                         *//* empty css                   */import"./index.vue_vue_type_script_setup_true_lang-d070c8c8.js";/* empty css                */import"./_plugin-vue_export-helper-c27b6911.js";const Ie={class:"main-container"},qe={class:"flex justify-between items-center"},Ae={class:"text-page-title"},ze={key:0},je={key:0,class:"text-primary"},Ge={key:1},Le={class:"mt-[16px] flex justify-end"},Oe={class:"dialog-footer"},Ye={class:"dialog-footer"},xl=pe({__name:"list",setup(Je){const $=ue(),J=me().meta.title,k=E({}),b=E({title:"",type:""}),M=Y(()=>({title:[{required:!0,message:a("titlePlaceholder"),trigger:"blur"}],type:[{required:!0,message:a("pageTypePlaceholder"),trigger:"blur"}]})),R=y(),C=y(!1),W=async r=>{r&&await r.validate(async e=>{if(e){C.value=!1;const s={type:b.type,title:b.title},V=$.resolve({path:"/decorate/edit",query:s});window.open(V.href)}})},X=y("");(async()=>{X.value=(await Be()).data.wap_url})();const B=(r="")=>{$e({mode:"",addon:r}).then(e=>{for(let s in k)delete k[s];for(const s in e.data)k[s]=e.data[s]})};B();const I=E({});Ue().then(r=>{if(r.data)for(const e in r.data)I[e]=r.data[e]});const H=r=>{i.searchParam.type="",B(r)},i=E({page:1,limit:10,total:0,loading:!0,data:[],searchParam:{title:"",type:"",mode:"",addon_name:""}}),q=y(),g=(r=1)=>{i.loading=!0,i.page=r,Fe({page:i.page,limit:i.limit,...i.searchParam}).then(e=>{i.loading=!1,i.data=e.data.data,i.total=e.data.total}).catch(()=>{i.loading=!1})};g();const K=r=>{const e=$.resolve({path:"/decorate/edit",query:{id:r.id}});window.open(e.href)},Q=r=>{Ne({id:r}).then(()=>{g()})},Z=r=>{fe.confirm(a("diyPageDeleteTips"),a("warning"),{confirmButtonText:a("confirm"),cancelButtonText:a("cancel"),type:"warning"}).then(()=>{Se(r).then(()=>{g()}).catch(()=>{})})},ee=r=>{const e=$.resolve({path:"/preview/wap",query:{page:r.type_page+"?id="+r.id}});window.open(e.href)},c=y("wechat"),A=y(""),z=y(0),f=E({wechat:{title:"",desc:"",url:""},weapp:{title:"",url:""}}),D=y(!1),le=Y(()=>({})),j=y(),ae=async r=>{z.value=r.id,A.value=r.title;const e=r.share?JSON.parse(r.share):{wechat:{title:"",desc:"",url:""},weapp:{title:"",url:""}};e&&(f.wechat=e.wechat,f.weapp=e.weapp),D.value=!0},te=async r=>{r&&await r.validate(async e=>{e&&Re({id:z.value,share:JSON.stringify(f)}).then(()=>{g(),D.value=!1}).catch(()=>{})})},oe=r=>{r&&(r.resetFields(),g())};return(r,e)=>{const s=_e,V=ye,_=ge,x=he,F=ve,N=be,G=we,P=Ve,ne=Pe,re=ke,L=Ce,O=De,ie=xe,se=Te,de=Ee;return p(),h("div",Ie,[o(G,{class:"box-card !border-none",shadow:"never"},{default:n(()=>[w("div",qe,[w("span",Ae,d(t(J)),1),o(s,{type:"primary",class:"w-[100px]",onClick:e[0]||(e[0]=l=>C.value=!0)},{default:n(()=>[m(d(t(a)("addDiyPage")),1)]),_:1})]),o(G,{class:"box-card !border-none my-[10px] table-search-wrap",shadow:"never"},{default:n(()=>[o(N,{inline:!0,model:i.searchParam,ref_key:"searchFormDiyPageRef",ref:q},{default:n(()=>[o(_,{label:t(a)("title"),prop:"title"},{default:n(()=>[o(V,{modelValue:i.searchParam.title,"onUpdate:modelValue":e[1]||(e[1]=l=>i.searchParam.title=l),placeholder:t(a)("titlePlaceholder")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),o(_,{label:t(a)("forAddon"),prop:"addon_name"},{default:n(()=>[o(F,{modelValue:i.searchParam.addon_name,"onUpdate:modelValue":e[2]||(e[2]=l=>i.searchParam.addon_name=l),placeholder:t(a)("pageTypePlaceholder"),onChange:H},{default:n(()=>[o(x,{label:t(a)("all"),value:""},null,8,["label"]),(p(!0),h(T,null,S(I,(l,u)=>(p(),v(x,{label:l.title,value:u,key:u},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),o(_,{label:t(a)("typeName"),prop:"type"},{default:n(()=>[o(F,{modelValue:i.searchParam.type,"onUpdate:modelValue":e[3]||(e[3]=l=>i.searchParam.type=l),placeholder:t(a)("pageTypePlaceholder")},{default:n(()=>[o(x,{label:t(a)("all"),value:""},null,8,["label"]),(p(!0),h(T,null,S(k,(l,u)=>(p(),v(x,{label:l.title,value:u,key:u},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),o(_,null,{default:n(()=>[o(s,{type:"primary",onClick:e[4]||(e[4]=l=>g())},{default:n(()=>[m(d(t(a)("search")),1)]),_:1}),o(s,{onClick:e[5]||(e[5]=l=>oe(q.value))},{default:n(()=>[m(d(t(a)("reset")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1}),ce((p(),v(ne,{data:i.data,size:"large"},{empty:n(()=>[w("span",null,d(i.loading?"":t(a)("emptyData")),1)]),default:n(()=>[o(P,{prop:"title",label:t(a)("title"),"min-width":"120"},null,8,["label"]),o(P,{prop:"addon_name",label:t(a)("forAddon"),"min-width":"80"},null,8,["label"]),o(P,{prop:"type_name",label:t(a)("typeName"),"min-width":"80"},null,8,["label"]),o(P,{label:t(a)("status"),"min-width":"80"},{default:n(({row:l})=>[l.type=="DIY_PAGE"?(p(),h("span",ze,"-")):(p(),h(T,{key:1},[l.is_default==1?(p(),h("span",je,d(t(a)("isUse")),1)):(p(),h("span",Ge,d(t(a)("unused")),1))],64))]),_:1},8,["label"]),o(P,{prop:"update_time",label:t(a)("updateTime"),"min-width":"120"},null,8,["label"]),o(P,{label:t(a)("operation"),fixed:"right",align:"right","min-width":"160"},{default:n(({row:l})=>[o(s,{type:"primary",link:"",onClick:u=>ee(l)},{default:n(()=>[m(d(t(a)("preview")),1)]),_:2},1032,["onClick"]),l.is_default==0?(p(),v(s,{key:0,type:"primary",link:"",onClick:u=>Q(l.id)},{default:n(()=>[m(d(t(a)("use")),1)]),_:2},1032,["onClick"])):U("",!0),l.type=="DIY_PAGE"?(p(),v(s,{key:1,type:"primary",link:"",onClick:u=>ae(l)},{default:n(()=>[m(d(t(a)("shareSet")),1)]),_:2},1032,["onClick"])):U("",!0),o(s,{type:"primary",link:"",onClick:u=>K(l)},{default:n(()=>[m(d(t(a)("edit")),1)]),_:2},1032,["onClick"]),l.is_default==0||l.type=="DIY_PAGE"?(p(),v(s,{key:2,type:"primary",link:"",onClick:u=>Z(l.id)},{default:n(()=>[m(d(t(a)("delete")),1)]),_:2},1032,["onClick"])):U("",!0)]),_:1},8,["label"])]),_:1},8,["data"])),[[de,i.loading]]),w("div",Le,[o(re,{"current-page":i.page,"onUpdate:current-page":e[6]||(e[6]=l=>i.page=l),"page-size":i.limit,"onUpdate:page-size":e[7]||(e[7]=l=>i.limit=l),layout:"total, sizes, prev, pager, next, jumper",total:i.total,onSizeChange:e[8]||(e[8]=l=>g()),onCurrentChange:g},null,8,["current-page","page-size","total"])])]),_:1}),o(L,{modelValue:C.value,"onUpdate:modelValue":e[13]||(e[13]=l=>C.value=l),title:t(a)("addPageTips"),width:"25%"},{footer:n(()=>[w("span",Oe,[o(s,{onClick:e[11]||(e[11]=l=>C.value=!1)},{default:n(()=>[m(d(t(a)("cancel")),1)]),_:1}),o(s,{type:"primary",onClick:e[12]||(e[12]=l=>W(R.value))},{default:n(()=>[m(d(t(a)("confirm")),1)]),_:1})])]),default:n(()=>[o(N,{model:b,"label-width":"90px",ref_key:"formRef",ref:R,rules:t(M)},{default:n(()=>[o(_,{label:t(a)("title"),prop:"title"},{default:n(()=>[o(V,{modelValue:b.title,"onUpdate:modelValue":e[9]||(e[9]=l=>b.title=l),placeholder:t(a)("titlePlaceholder"),clearable:"",maxlength:"12","show-word-limit":"",class:"w-full"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),o(_,{label:t(a)("typeName"),prop:"type"},{default:n(()=>[o(F,{modelValue:b.type,"onUpdate:modelValue":e[10]||(e[10]=l=>b.type=l),placeholder:t(a)("pageTypePlaceholder"),class:"w-full"},{default:n(()=>[(p(!0),h(T,null,S(k,(l,u)=>(p(),v(x,{label:l.title,value:u,key:u},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"]),o(L,{modelValue:D.value,"onUpdate:modelValue":e[20]||(e[20]=l=>D.value=l),title:t(a)("shareSet"),width:"30%"},{footer:n(()=>[w("span",Ye,[o(s,{onClick:e[18]||(e[18]=l=>D.value=!1)},{default:n(()=>[m(d(t(a)("cancel")),1)]),_:1}),o(s,{type:"primary",onClick:e[19]||(e[19]=l=>te(j.value))},{default:n(()=>[m(d(t(a)("confirm")),1)]),_:1})])]),default:n(()=>[o(ie,{modelValue:c.value,"onUpdate:modelValue":e[14]||(e[14]=l=>c.value=l)},{default:n(()=>[o(O,{label:t(a)("wechat"),name:"wechat"},null,8,["label"]),o(O,{label:t(a)("weapp"),name:"weapp"},null,8,["label"])]),_:1},8,["modelValue"]),o(N,{model:f[c.value],"label-width":"90px",ref_key:"shareFormRef",ref:j,rules:t(le)},{default:n(()=>[o(_,{label:t(a)("sharePage")},{default:n(()=>[w("span",null,d(A.value),1)]),_:1},8,["label"]),o(_,{label:t(a)("shareTitle"),prop:"title"},{default:n(()=>[o(V,{modelValue:f[c.value].title,"onUpdate:modelValue":e[15]||(e[15]=l=>f[c.value].title=l),placeholder:t(a)("shareTitlePlaceholder"),clearable:"",maxlength:"30","show-word-limit":""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),c.value=="wechat"?(p(),v(_,{key:0,label:t(a)("shareDesc"),prop:"desc"},{default:n(()=>[o(V,{modelValue:f[c.value].desc,"onUpdate:modelValue":e[16]||(e[16]=l=>f[c.value].desc=l),placeholder:t(a)("shareDescPlaceholder"),type:"textarea",rows:"4",clearable:"",maxlength:"100","show-word-limit":""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])):U("",!0),o(_,{label:t(a)("shareImageUrl"),prop:"url"},{default:n(()=>[o(se,{modelValue:f[c.value].url,"onUpdate:modelValue":e[17]||(e[17]=l=>f[c.value].url=l),limit:1},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])])}}});export{xl as default};