import{d as R,r as s,R as A,w as H,e as b,f as B,Q as u,g as o,B as n,u as r,y as l,x as p,A as S,v as N,H as M}from"./base-9962c822.js";/* empty css                *//* empty css                 *//* empty css                        */import"./el-form-item-4ed993c7.js";/* empty css                  *//* empty css                 */import{E as Q,v}from"./index-5c4817f4.js";import{t as a}from"./index-5516aed6.js";import{u as W}from"./vue-router-d7e63612.js";import{g as j}from"./weapp-6fcef875.js";import{v as z}from"./sys-7988dced.js";import{f as G,a as J}from"./storage-0874d153.js";import{b as K}from"./browser-a1ac24ac.js";import{l as O}from"./diy-780e3fb1.js";import{a as h}from"./index-2cabf788.js";import{E as X}from"./index-19251c17.js";import{E as Y}from"./index-7ab57426.js";import{a as Z,E as ee}from"./index-7c833df7.js";import{E as ae}from"./index-7332c216.js";import"./index-57446bef.js";import"./pinia-a9fc3924.js";import"./index-e026a545.js";import"./system-1108e5c1.js";import"./index-c4e33d8d.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./typescript-defaf979.js";import"./index-c98e204a.js";import"./event-9519ab40.js";import"./index-ec548bfb.js";import"./index-6b77b11a.js";import"./index-71b7d8f4.js";import"./error-78e43d3e.js";import"./index-1370ab44.js";import"./_Uint8Array-c92ffa25.js";import"./_initCloneObject-41dd9efb.js";import"./index-57e03d9e.js";import"./index-df16e899.js";import"./debounce-9674000c.js";import"./position-8e494ab3.js";import"./scroll-d85c8f38.js";const te={class:"main-container w-[375px] mx-auto my-[20px] relative"},oe={class:"flex h-full"},re=["src"],le={class:"w-[375px] border border-slate-100 bg-body pt-[20px] px-[20px]"},se={class:"font-bold text-xl mb-[40px]"},pe={class:"mb-[20px] flex flex-col"},ie={class:"mb-[10px]"},ne={key:0,class:"w-[400px] absolute bg-body top-[10%] -right-[450px]"},me={class:"info-wrap mt-[20px]"},ce={class:"px-[20px] pb-[10px] font-bold"},de={class:"px-[20px] pb-[10px] font-bold mt-[40px]"},ue={class:"text-gray-400"},ta=R({__name:"preview",setup(ve){const _=s(""),c=s(""),f=s(""),i=s(""),E=s(!1),d=s(!1),x=s(!1),T=s(0);new Date().getTime();const m=W();m.query.id=m.query.id||0,m.query.name=m.query.name||"",z().then(e=>{c.value=e.data.wap_domain,_.value=e.data.wap_url,D()});const L=()=>{if(c.value.trim().length==0){h({type:"warning",message:`${a("wapDomainPlaceholder")}`});return}_.value=c.value+"/wap",D(),J.set({key:"wap_domain",data:_.value}),d.value=!0,x.value=!1},D=()=>{O({id:m.query.id,name:m.query.name}).then(e=>{let t=e.data;i.value=`${_.value}/${t.page}`,K.toDataURL(i.value,{errorCorrectionLevel:"L",margin:0,width:100}).then(w=>{f.value=w})})},P=()=>{if(i.value){var e=new Date().getTime(),t=e-T.value;t<1e3?(x.value=!0,d.value=!1,i.value="",f.value=""):(x.value=!1,d.value=!0),E.value=!0}},y=A({qr_code:""});s("weapp"),j().then(e=>{if(e.code==1){let t=e.data;y.qr_code=t.qr_code}});const{copy:U,isSupported:$,copied:q}=Q(),F=e=>{$.value||h({message:a("notSupportCopy"),type:"warning"}),U(e)};return H(q,()=>{q.value&&h({message:a("copySuccess"),type:"success"})}),(e,t)=>{const w=X,k=Y,g=Z,C=ae,I=ee;return b(),B("div",te,[u(o("div",oe,[u(o("iframe",{class:"w-[375px] border border-slate-100 bg-gray-100",src:i.value,frameborder:"0",id:"previewIframe",onLoad:P},null,40,re),[[v,d.value]]),u(o("div",le,[o("div",se,n(r(a)("developTitle")),1),o("div",pe,[o("text",ie,n(r(a)("wapDomain")),1),l(w,{modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=V=>c.value=V),placeholder:r(a)("wapDomainPlaceholder"),clearable:""},null,8,["modelValue","placeholder"])]),l(k,{type:"primary",onClick:L},{default:p(()=>[S(n(r(a)("confirm")),1)]),_:1})],512),[[v,x.value]]),d.value?(b(),B("div",ne,[o("div",me,[o("div",ce,n(r(a)("h5")),1),l(I,{"label-width":"40px",class:"px-[20px]"},{default:p(()=>[u(l(g,{label:r(a)("link")},{default:p(()=>[l(w,{readonly:"",value:i.value},{append:p(()=>[l(k,{onClick:t[1]||(t[1]=V=>F(i.value)),class:"bg-primary copy"},{default:p(()=>[S(n(r(a)("copy")),1)]),_:1})]),_:1},8,["value"])]),_:1},8,["label"]),[[v,i.value]]),u(l(g,{label:" "},{default:p(()=>[l(C,{src:f.value},null,8,["src"])]),_:1},512),[[v,f.value]])]),_:1}),o("div",de,n(r(a)("weapp")),1),l(I,{"label-width":"40px",class:"px-[20px]"},{default:p(()=>[y.qr_code?(b(),N(g,{key:0,label:" "},{default:p(()=>[l(C,{class:"w-[100px] h-[100px]",src:r(G)(y.qr_code)},null,8,["src"])]),_:1})):(b(),N(g,{key:1,label:" "},{default:p(()=>[o("span",ue,n(r(a)("weappNotSet")),1)]),_:1}))]),_:1})])])):M("",!0)],512),[[v,E.value]])])}}});export{ta as default};