import{d as a,r as e,u as l,a as t,c as o,o as r,b as s,s as p,e as i,g as d,f as g,X as u,h as n,i as m,w as f,j as b,k as v,v as _,l as c,m as x,n as y,p as h,q as j,t as k,x as w}from"./index-e4516e00.js";import{_ as M}from"./u-loading-page.98779073.js";import{_ as S,a as D}from"./index.d2f0349b.js";import{_ as I}from"./_plugin-vue_export-helper.1b428a4d.js";import"./u-loading-icon.41e2cb8e.js";import"./u-transition.44bb65c7.js";import"./u-icon.800a0d37.js";import"./app-link.vue_vue_type_script_setup_true_lang.b5d47e0f.js";import"./u-avatar.38901231.js";import"./u-tabbar.2b953c74.js";import"./u-safe-bottom.e98411e2.js";const R=I(a({__name:"index",setup(a){const I=e(!0),R=l(),B=e(0),C=t({pageMode:"diy",title:"",global:{},value:[]}),E=o((()=>"decorate"==R.mode?R:C));return r((a=>{R.mode=a.mode||"","decorate"==R.mode&&(I.value=!1)})),s((()=>{B.value++,p()})),i((()=>{"decorate"==R.mode?R.init():d({name:"DIY_MEMBER_INDEX"}).then((a=>{if(a.data.value){let e=a.data;C.pageMode=e.mode,C.title=e.title;let l=JSON.parse(e.value);C.global=l.global,C.value=l.value,C.value.forEach(((a,e)=>{a.pageStyle="",a.pageBgColor&&(a.pageStyle+="background-color:"+a.pageBgColor+";"),a.margin&&(a.pageStyle+="padding-top:"+2*a.margin.top+"rpx;",a.pageStyle+="padding-bottom:"+2*a.margin.bottom+"rpx;",a.pageStyle+="padding-right:"+2*a.margin.both+"rpx;",a.pageStyle+="padding-left:"+2*a.margin.both+"rpx;")})),g({title:C.title})}I.value=!1})),u().getMemberInfo()})),(a,e)=>{const l=h(j("u-loading-page"),M),t=h(j("diy-group"),S),o=k,r=h(j("fixed-group"),D);return n(),m(o,null,{default:f((()=>[b(l,{loading:I.value,loadingText:"","bg-color":"#f7f7f7"},null,8,["loading"]),v(b(o,null,{default:f((()=>[c(" 自定义模板渲染 "),"fixed"!=x(E).pageMode?(n(),m(o,{key:0,class:"diy-template-wrap bg-index",style:y({backgroundColor:x(E).global.pageBgColor,minHeight:"calc(100vh - 50px)",backgroundImage:x(E).global.bgUrl?"url("+x(w)(x(E).global.bgUrl)+")":""})},{default:f((()=>[b(t,{data:x(E),pullDownRefresh:B.value},null,8,["data","pullDownRefresh"])])),_:1},8,["style"])):c("v-if",!0),c(" 固定模板渲染 "),"fixed"==x(E).pageMode?(n(),m(o,{key:1,class:"fixed-template-wrap"},{default:f((()=>[b(r,{data:x(E),pullDownRefresh:B.value},null,8,["data","pullDownRefresh"])])),_:1})):c("v-if",!0)])),_:1},512),[[_,!I.value]])])),_:1})}}}),[["__scopeId","data-v-fb714d1d"]]);export{R as default};