import{d as L,r as V,cK as F,cU as ue,cV as pe,q as P,h as a,c as v,e as o,w as s,a as n,t as k,u as e,N as _,aH as B,aM as _e,cD as me,ap as K,cW as ne,cX as Q,_ as O,K as le,n as ee,cR as fe,i as A,af as xe,aG as he,aT as ve,aU as ge,aV as we,W as ye,X as be,Y as ke,E as G,aa as X,p as $e,g as Se,f as Y,U as R,cS as Ve,cL as ae,v as Ee,I as S,G as W,F as I,B as M,y as te,co as oe,A as D,cY as Ce,cZ as Ie,an as De,ao as Pe,Q as Z,O as J,c_ as Ue,c$ as Te,R as Re,cF as re,d0 as Me,Z as ie,s as Le,cT as Be,cM as We,a_ as Ae,J as Fe,a1 as je}from"./index-9d601459.js";/* empty css                     *//* empty css                   *//* empty css                  *//* empty css               */import{_ as q}from"./index.vue_vue_type_script_setup_true_lang-6df3a9a5.js";/* empty css                  *//* empty css                        *//* empty css                 *//* empty css                  *//* empty css                */import"./el-form-item-4ed993c7.js";/* empty css                         *//* empty css                  *//* empty css                  */import{s as qe}from"./personal-b81263a5.js";/* empty css                        */import"./el-tooltip-4ed993c7.js";import{_ as Ne}from"./icon-addon-339e16d0.js";import{a9 as ze}from"./sys-45a56363.js";/* empty css                */const He={class:"flex"},Ke={class:"setting-item flex items-center justify-between mb-[10px]"},Oe={class:"title text-base text-tx-secondary"},Ge={class:""},Xe={class:"setting-item flex items-center justify-between mb-[10px]"},Ye={class:"title text-base text-tx-secondary"},Ze={class:""},Je=L({__name:"layout-setting",setup(r){const f=V(!1),p=F(),m=ue(),w=pe(m),i=P({get(){return p.dark},set(t){p.setTheme("dark",t),w(t),Q(p.theme,p.dark?"dark":"light")}}),x=P({get(){return p.theme},set(t){p.setTheme("theme",t),Q(p.theme,p.dark?"dark":"light")}});return(t,c)=>{const d=q,h=_e,l=me,g=K,y=ne;return a(),v("div",He,[o(d,{name:"element-Setting",onClick:c[0]||(c[0]=u=>f.value=!0)}),o(y,{modelValue:f.value,"onUpdate:modelValue":c[3]||(c[3]=u=>f.value=u),title:e(_)("layout.layoutSetting"),size:"300px"},{default:s(()=>[o(g,null,{default:s(()=>[n("div",Ke,[n("div",Oe,k(e(_)("layout.darkMode")),1),n("div",Ge,[o(h,{modelValue:e(i),"onUpdate:modelValue":c[1]||(c[1]=u=>B(i)?i.value=u:null),"active-value":!0,"inactive-value":!1},null,8,["modelValue"])])]),n("div",Xe,[n("div",Ye,k(e(_)("layout.themeColor")),1),n("div",Ze,[o(l,{modelValue:e(x),"onUpdate:modelValue":c[2]||(c[2]=u=>B(x)?x.value=u:null)},null,8,["modelValue"])])])]),_:1})]),_:1},8,["modelValue","title"])])}}});const Qe=O(Je,[["__scopeId","data-v-75affd31"]]),N=r=>($e("data-v-91edf1de"),r=r(),Se(),r),et={class:"userinfo flex h-full items-center"},tt={class:"user-name pl-[8px]"},ot=N(()=>n("div",{class:"flex items-center leading-[1] py-[5px]"},[n("span",{class:"iconfont iconqiehuan ml-[4px] !text-[14px] mr-[10px]"}),n("span",{class:"text-[14px]"},"切换站点")],-1)),st=N(()=>n("div",{class:"flex items-center leading-[1] py-[5px]"},[n("span",{class:"iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]"}),n("span",{class:"text-[14px]"},"账号设置")],-1)),nt=N(()=>n("div",{class:"flex items-center leading-[1] py-[5px]"},[n("span",{class:"iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]"}),n("span",{class:"text-[14px]"},"修改密码")],-1)),lt=N(()=>n("div",{class:"flex items-center leading-[1] py-[2px]"},[n("span",{class:"iconfont icontuichudenglu !text-[21px] mr-[8px]"}),n("span",{class:"text-[14px]"},"退出登录")],-1)),at={class:"form-tip"},rt={class:"dialog-footer"},it=L({__name:"user-info",setup(r){const f=le(),p=Y(),m=h=>{switch(h){case"logout":f.logout();break}},w=h=>{p.push(h)};let i=V(!1);const x=V();let t=ee({original_password:"",password:"",password_copy:""});const c=ee({original_password:[{required:!0,message:_("originalPasswordPlaceholder"),trigger:"blur"}],password:[{required:!0,message:_("passwordPlaceholder"),trigger:"blur"}],password_copy:[{required:!0,message:_("passwordPlaceholder"),trigger:"blur"}]}),d=h=>{h&&h.validate(l=>{if(l){let g="";if(t.password&&!t.original_password&&(g=_("originalPasswordHint")),t.password&&t.original_password&&!t.password_copy&&(g=_("newPasswordHint")),t.password&&t.original_password&&t.password_copy&&t.password!=t.password_copy&&(g=_("doubleCipherHint")),g){xe({type:"error",message:g});return}qe(t).then(y=>{i.value=!1})}else return!1})};return(h,l)=>{const g=he,y=q,u=ve,U=ge,b=we,E=ye,C=be,z=ke,j=G,H=X;return a(),v("div",null,[o(b,{onCommand:m,tabindex:1},{dropdown:s(()=>[o(U,null,{default:s(()=>[o(u,{onClick:l[0]||(l[0]=$=>w("/home/index"))},{default:s(()=>[ot]),_:1}),o(u,{onClick:l[1]||(l[1]=$=>w("/user/center"))},{default:s(()=>[st]),_:1}),o(u,{onClick:l[2]||(l[2]=$=>B(i)?i.value=!0:i=!0)},{default:s(()=>[nt]),_:1}),o(u,{command:"logout"},{default:s(()=>[lt]),_:1})]),_:1})]),default:s(()=>[n("div",et,[o(g,{size:25,icon:e(fe)},null,8,["icon"]),n("div",tt,k(e(f).userInfo.username),1),o(y,{name:"element-ArrowDown",class:"ml-[5px]"})])]),_:1}),o(H,{modelValue:e(i),"onUpdate:modelValue":l[8]||(l[8]=$=>B(i)?i.value=$:i=$),width:"450px",title:"修改密码","before-close":h.handleClose},{footer:s(()=>[n("span",rt,[o(j,{onClick:l[6]||(l[6]=$=>B(i)?i.value=!1:i=!1)},{default:s(()=>[A(k(e(_)("cancel")),1)]),_:1}),o(j,{type:"primary",onClick:l[7]||(l[7]=$=>d(x.value))},{default:s(()=>[A(k(e(_)("save")),1)]),_:1})])]),default:s(()=>[n("div",null,[o(z,{model:e(t),"label-width":"90px",ref_key:"formRef",ref:x,rules:c,class:"page-form"},{default:s(()=>[o(C,{label:e(_)("originalPassword"),prop:"original_password"},{default:s(()=>[o(E,{modelValue:e(t).original_password,"onUpdate:modelValue":l[3]||(l[3]=$=>e(t).original_password=$),type:"password",placeholder:e(_)("originalPasswordPlaceholder"),clearable:"",class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),o(C,{label:e(_)("newPassword"),prop:"password"},{default:s(()=>[o(E,{modelValue:e(t).password,"onUpdate:modelValue":l[4]||(l[4]=$=>e(t).password=$),type:"password",placeholder:e(_)("passwordPlaceholder"),clearable:"",class:"input-width"},null,8,["modelValue","placeholder"]),n("div",at,k(e(_)("passwordTip")),1)]),_:1},8,["label"]),o(C,{label:e(_)("passwordCopy"),prop:"password_copy"},{default:s(()=>[o(E,{modelValue:e(t).password_copy,"onUpdate:modelValue":l[5]||(l[5]=$=>e(t).password_copy=$),type:"password",placeholder:e(_)("passwordPlaceholder"),clearable:"",class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","rules"])])]),_:1},8,["modelValue","before-close"])])}}});const ct=O(it,[["__scopeId","data-v-91edf1de"]]),dt={class:"left-panel h-full flex items-center"},ut={class:"flex items-center h-full pl-[10px] hidden-xs-only"},pt={class:"right-panel h-full flex items-center justify-end"},_t=["title"],mt={class:"navbar-item flex items-center h-full cursor-pointer"},ft={class:"navbar-item flex items-center h-full cursor-pointer"},xt={class:"dialog-footer"},ht=L({__name:"index",setup(r){Y();const f=R.get("app_type");Ve();const p=F(),m=ae(),w=J(),i=V(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth),x=P(()=>p.dark),t=V(!1),c=V(""),d=V("");R.get("comparisonTokenStorage")&&(c.value=R.get("comparisonTokenStorage")),R.get("comparisonSiteIdStorage")&&(d.value=R.get("comparisonSiteIdStorage")),document.addEventListener("visibilitychange",y=>{document.visibilityState==="visible"&&(d.value!=R.get("siteId")||c.value!=R.get("token"))&&(t.value=!0)});const h=()=>{t.value=!1,location.reload()};Ee(()=>{window.onresize=()=>(()=>{i.value=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth})()});const l=()=>{m.routeRefreshTag&&m.refreshRouterView()},g=P(()=>{const y=w.matched.filter(u=>u.meta.title);return y[0]&&y[0].path=="/"&&y.splice(0,1),y});return(y,u)=>{const U=q,b=Ce,E=Ie,C=De,z=Pe,j=G,H=X,$=Z;return a(),S($,{class:D(["h-full px-[10px]",{"layout-header border-b border-color":!e(x)}])},{default:s(()=>[o(z,{class:"w-100 h-full w-full"},{default:s(()=>[o(C,{span:12},{default:s(()=>[n("div",dt,[n("div",{class:"navbar-item flex items-center h-full cursor-pointer",onClick:l},[o(U,{name:"element-Refresh"})]),n("div",ut,[o(E,{separator:"/"},{default:s(()=>[(a(!0),v(I,null,W(e(g),(T,de)=>(a(),S(b,{key:de},{default:s(()=>[A(k(T.meta.title),1)]),_:2},1024))),128))]),_:1})])])]),_:1}),o(C,{span:12},{default:s(()=>[n("div",pt,[e(f)=="site"?(a(),v("i",{key:0,class:"iconfont iconlingdang-xianxing cursor-pointer px-[8px]",title:e(_)("newInfo")},null,8,_t)):M("",!0),n("div",mt,[o(Qe)]),n("div",ft,[o(ct)])])]),_:1})]),_:1}),te(n("input",{type:"hidden","onUpdate:modelValue":u[0]||(u[0]=T=>c.value=T)},null,512),[[oe,c.value]]),te(n("input",{type:"hidden","onUpdate:modelValue":u[1]||(u[1]=T=>d.value=T)},null,512),[[oe,d.value]]),o(H,{modelValue:t.value,"onUpdate:modelValue":u[2]||(u[2]=T=>t.value=T),title:e(_)("layout.detectionLoginTip"),width:"30%","close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1},{footer:s(()=>[n("span",xt,[o(j,{onClick:h},{default:s(()=>[A(k(e(_)("layout.detectionLoginOperation")),1)]),_:1})])]),default:s(()=>[n("span",null,k(e(_)("layout.detectionLoginContent")),1)]),_:1},8,["modelValue","title"])]),_:1},8,["class"])}}});const vt=O(ht,[["__scopeId","data-v-eb9e514a"]]);const gt={key:0,class:"w-[16px] h-[16px] relative flex items-center"},wt={key:0,class:"w-[16px] h-[16px] relative flex justify-center"},yt={class:"relative"},bt={key:3,class:"!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"},kt={class:"flex flex-wrap"},$t=["onClick"],St=["onClick"],Vt={class:"dialog-footer"},ce=L({__name:"menu-item",props:{routes:{type:Object,required:!0},routePath:{type:String}},setup(r){const f=r,p=Y(),m=P(()=>f.routes.meta),w=d=>`${f.routePath}/${d}`,i=V(),x=V(!1),t=V(""),c=()=>{ze({view_path:t.value}).then(()=>{x.value=!1,p.go(0)})};return(d,h)=>{const l=q,g=Ue,y=Te,u=G,U=X;return a(),v(I,null,[e(m).show?(a(),v(I,{key:0},[r.routes.children?(a(),S(g,{key:0,index:String(r.routes.name)},{title:s(()=>[e(m).icon&&r.routes.meta.class==1?(a(),v("div",gt,[e(m).icon?(a(),S(l,{key:0,name:e(m).icon,class:"absolute !w-auto"},null,8,["name"])):M("",!0)])):M("",!0),n("span",{class:D(["ml-[10px]",{"text-[15px]":r.routes.meta.class==1},{"text-[14px]":r.routes.meta.class!=1}])},k(e(m).title),3)]),default:s(()=>[(a(!0),v(I,null,W(r.routes.children,(b,E)=>(a(),S(ce,{routes:b,"route-path":w(b.path),key:E},null,8,["routes","route-path"]))),128))]),_:1},8,["index"])):r.routes.meta.class==1?(a(),S(y,{key:1,index:String(r.routes.name),route:r.routePath},{title:s(()=>[n("div",yt,[n("span",{class:D(["ml-[10px]",{"text-[15px]":r.routes.meta.class==1},{"text-[14px]":r.routes.meta.class!=1}])},k(e(m).title),3)])]),default:s(()=>[e(m).icon?(a(),v("div",wt,[o(l,{name:e(m).icon,class:"absolute top-[50%] -translate-y-[50%]"},null,8,["name"])])):M("",!0)]),_:1},8,["index","route"])):(a(),S(y,{key:2,index:String(r.routes.name),route:r.routePath},{title:s(()=>[n("span",{class:D([{"text-[15px]":r.routes.meta.class==1},{"text-[14px]":r.routes.meta.class!=1},{"ml-[10px]":r.routes.meta.class==2,"ml-[15px]":r.routes.meta.class==3}])},k(e(m).title),3)]),_:1},8,["index","route"])),r.routes.is_border?(a(),v("div",bt)):M("",!0)],64)):M("",!0),o(U,{modelValue:x.value,"onUpdate:modelValue":h[0]||(h[0]=b=>x.value=b),title:e(_)("indexTemplate"),width:"550px","destroy-on-close":!0},{footer:s(()=>[n("span",Vt,[o(u,{type:"primary",onClick:c},{default:s(()=>[A(k(e(_)("confirm")),1)]),_:1})])]),default:s(()=>[n("div",kt,[t.value==""?(a(!0),v(I,{key:0},W(i.value,(b,E)=>(a(),v("div",{key:E},[n("div",{onClick:C=>t.value=b.view_path,class:D(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer",b.is_use==1?"bg-primary text-[#fff]":""])},[n("span",null,k(b.name),1)],10,$t)]))),128)):(a(!0),v(I,{key:1},W(i.value,(b,E)=>(a(),v("div",{key:E},[n("div",{onClick:C=>t.value=b.view_path,class:D(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer",t.value==b.view_path?"bg-primary text-[#fff]":""])},[n("span",null,k(b.name),1)],10,St)]))),128))])]),_:1},8,["modelValue","title"])],64)}}});const Et={key:0,class:"logo flex items-center m-auto max-w-[210px] h-[30px]"},Ct=["src"],It={key:1,class:"max-h-[40px] max-w-[40px] rounded-full",src:Ne,alt:""},Dt={class:"ml-[8px] text-[16px]"},Pt={key:1,class:"logo flex items-center justify-center w-[64px] h-[30px]"},Ut=n("i",{class:"text-3xl iconfont iconyunkongjian"},null,-1),Tt=[Ut],Rt=n("div",{class:"h-[48px]"},null,-1),se=L({__name:"side",setup(r){V("@/app/assets/images/login_logo.png");const f=F(),p=le(),m=J(),w=p.siteInfo,i=P(()=>String(m.name));let x=V([]);return p.routers.forEach((t,c)=>{t.name!=w.app?(t.meta.class=1,t.children&&t.children.forEach((d,h)=>{d.meta.class=2,d.children&&d.children.forEach((l,g)=>{l.meta.class=3})})):(t.children&&t.children.forEach((d,h)=>{d.meta.class=1,d.path=t.path+"/"+d.path,d.children&&d.children.forEach((l,g)=>{l.meta.class=2})}),x.value=p.routers.splice(c,1))}),x.value[0]&&x.value[0].children&&(x.value[0].children.reverse(),x.value[0].children.forEach((t,c)=>{c==0&&(t.is_border=!0),p.routers.unshift(t)})),(t,c)=>{const d=re,h=Me,l=K,g=ie,y=Z;return a(),S(y,{class:"w-100 h-screen"},{default:s(()=>[o(d,{class:"logo-wrap w-100 border-0 border-b-[1px] border-solid border-[e5e7eb]"},{default:s(()=>[e(f).menuIsCollapse?(a(),v("div",Pt,Tt)):(a(),v("div",Et,[e(w).logo?(a(),v("img",{key:0,class:"max-h-[40px] max-w-[40px] rounded-full",src:e(Re)(e(w).logo),alt:""},null,8,Ct)):(a(),v("img",It)),n("span",Dt,k(e(w).site_name),1)]))]),_:1}),o(g,{class:"menu-wrap"},{default:s(()=>[o(l,null,{default:s(()=>[o(h,{"default-active":e(i),router:!0,class:"aside-menu h-full","unique-opened":"true",collapse:e(f).menuIsCollapse},{default:s(()=>[(a(!0),v(I,null,W(e(p).routers,(u,U)=>(a(),S(ce,{routes:u,"route-path":u.path,key:U},null,8,["routes","route-path"]))),128))]),_:1},8,["default-active","collapse"]),Rt]),_:1})]),_:1})]),_:1})}}});const Mt=L({__name:"index",setup(r){const f=F(),p=P(()=>f.dark),m=J();return Le(m,()=>{f.$patch(w=>{w.menuDrawer=!1})}),(w,i)=>{const x=Be,t=ne;return a(),v(I,null,[o(x,{class:D(["h-screen layout-aside w-auto",{bright:!e(p)}])},{default:s(()=>[o(se,{class:"hidden-xs-only"})]),_:1},8,["class"]),o(t,{modelValue:e(f).menuDrawer,"onUpdate:modelValue":i[0]||(i[0]=c=>e(f).menuDrawer=c),direction:"ltr","with-header":!1,"custom-class":"aside-drawer",size:"210px"},{default:s(()=>[o(se)]),_:1},8,["modelValue"])],64)}}});const Lt={class:"common-layout min-w-[1200px]"},Bt={class:"p-[10px]"},lo=L({__name:"index",setup(r){const f=ae(),p=We(),m=F(),w=P(()=>m.dark);return(i,x)=>{const t=re,c=je("router-view"),d=K,h=ie,l=Z;return a(),v("div",Lt,[o(l,{class:"w-100 h-screen"},{default:s(()=>[o(Mt),o(l,null,{default:s(()=>[o(t,null,{default:s(()=>[o(vt)]),_:1}),o(h,{class:D(["main-wrap h-full p-0",{"bg-page":e(w)}])},{default:s(()=>[o(d,null,{default:s(()=>[n("div",Bt,[e(f).routeRefreshTag?(a(),S(c,{key:0},{default:s(({Component:g,route:y})=>[(a(),S(Ae,{include:e(p).tabNames},[(a(),S(Fe(g),{key:y.fullPath}))],1032,["include"]))]),_:1})):M("",!0)])]),_:1})]),_:1},8,["class"])]),_:1})]),_:1})])}}});export{lo as default};