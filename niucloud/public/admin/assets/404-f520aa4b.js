import"./base-962c0c23.js";/* empty css                  */import{a as l}from"./vue-router-79053937.js";import{E as d}from"./index-bba9e58c.js";import{d as i,r as p,O as m,e as u,f as t,g as x,q as v,p as f,u as h,au as g,av as I,b as S,v as b,x as w}from"./runtime-core.esm-bundler-dc7a07d7.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";const k=""+new URL("error-da01d378.png",import.meta.url).href,o=e=>(g("data-v-3c4dfc24"),e=e(),I(),e),y={class:"error"},C={class:"flex items-center"},E=o(()=>t("div",null,[t("img",{class:"w-[300px]",src:k})],-1)),N={class:"text-left ml-[100px]"},R=o(()=>t("div",{class:"error-text text-[28px] font-bold"},"404错误！",-1)),U=o(()=>t("div",{class:"text-[#222] text-[20px] mt-[15px]"},"哎呀，出错了！您访问的页面不存在...",-1)),V=o(()=>t("div",{class:"text-[#c4c2c2] text-[12px] mt-[5px]"},"尝试检查URL的错误，然后点击浏览器刷新按钮。",-1)),L={class:"mt-[40px]"},$=i({__name:"404",setup(e){let s=null;const a=p(5),c=l();return s=setInterval(()=>{a.value===0?(clearInterval(s),c.go(-1)):a.value--},1e3),m(()=>{s&&clearInterval(s)}),(n,r)=>{const _=d;return S(),u("div",y,[t("div",C,[x(n.$slots,"content",{},()=>[E],!0),t("div",N,[R,U,V,t("div",L,[v(_,{class:"bottom",onClick:r[0]||(r[0]=q=>h(c).go(-1))},{default:f(()=>[b(w(a.value)+" 秒后返回上一页",1)]),_:1})])])])])}}});const F=B($,[["__scopeId","data-v-3c4dfc24"]]);export{F as default};