import{U as a,V as o,W as e,p as i,q as t,h as l,i as n,w as d,j as g,n as s,S as r,J as u,K as p,L as c,t as _,M as f}from"./index-e4516e00.js";import{_ as m}from"./u-loading-icon.41e2cb8e.js";import{_ as y}from"./u-transition.44bb65c7.js";import{_ as S}from"./_plugin-vue_export-helper.1b428a4d.js";const z=S({name:"u-loading-page",mixins:[o,e,{props:{loadingText:{type:[String,Number],default:a.loadingPage.loadingText},image:{type:String,default:a.loadingPage.image},loadingMode:{type:String,default:a.loadingPage.loadingMode},loading:{type:Boolean,default:a.loadingPage.loading},bgColor:{type:String,default:a.loadingPage.bgColor},color:{type:String,default:a.loadingPage.color},fontSize:{type:[String,Number],default:a.loadingPage.fontSize},iconSize:{type:[String,Number],default:a.loadingPage.fontSize},loadingColor:{type:String,default:a.loadingPage.loadingColor}}}],data:()=>({}),methods:{}},[["render",function(a,o,e,S,z,b){const h=c,x=i(t("u-loading-icon"),m),w=_,P=f,C=i(t("u-transition"),y);return l(),n(C,{show:a.loading,"custom-style":{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:a.bgColor,display:"flex"}},{default:d((()=>[g(w,{class:"u-loading-page"},{default:d((()=>[g(w,{class:"u-loading-page__warpper"},{default:d((()=>[g(w,{class:"u-loading-page__warpper__loading-icon"},{default:d((()=>[a.image?(l(),n(h,{key:0,src:a.image,class:"u-loading-page__warpper__loading-icon__img",mode:"widthFit",style:s({width:a.$u.addUnit(a.iconSize),height:a.$u.addUnit(a.iconSize)})},null,8,["src","style"])):(l(),n(x,{key:1,mode:a.loadingMode,size:a.$u.addUnit(a.iconSize),color:a.loadingColor},null,8,["mode","size","color"]))])),_:1}),r(a.$slots,"default",{},(()=>[g(P,{class:"u-loading-page__warpper__text",style:s({fontSize:a.$u.addUnit(a.fontSize),color:a.color})},{default:d((()=>[u(p(a.loadingText),1)])),_:1},8,["style"])]),!0)])),_:3})])),_:3})])),_:3},8,["show","custom-style"])}],["__scopeId","data-v-bb97457c"]]);export{z as _};