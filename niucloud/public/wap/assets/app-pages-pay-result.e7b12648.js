import{d as t,r as a,o as e,f as s,Z as l,i as o,F as u,j as r,w as n,k as i,I as c,K as p,L as m,n as d,m as f,G as x,h as y,bd as _,N as v,x as j,q as h,t as g,ak as b}from"./index-5af37f77.js";import{_ as w}from"./u-button.6a6f58aa.js";import{_ as T}from"./u-loading-icon.b81180ef.js";import{_ as S}from"./u-modal.0b8025e6.js";import{g as k}from"./pay.33077968.js";import"./u-icon.cc249a8e.js";import"./_plugin-vue_export-helper.1b428a4d.js";import"./u-line.08de908d.js";import"./u-popup.c65b2f82.js";import"./u-transition.10136d61.js";import"./u-safe-bottom.6bd82b41.js";const C=t({__name:"result",setup(t){const C=a(null),F=a(!1);let z="",I=0,P=0;e((t=>{z=t.trade_type,I=t.trade_id,R()}));const R=()=>{k(z,I).then((t=>{if(!uni.$u.test.isEmpty(t.data)){if(1==t.data.status&&P<5)return F.value=!0,P++,void setTimeout((()=>{R()}),1e3);C.value=t.data,F.value=!1,s({title:2==C.value.status?l("pay.paySuccess"):l("pay.payFail")})}})).catch((()=>{}))},Z=()=>{var t;const a=decodeURIComponent(uni.getStorageSync("payReturn"));y(a?{url:a,mode:"redirectTo"}:{url:_(),param:{code:null==(t=C.value)?void 0:t.out_trade_no},mode:"redirectTo"})};return(t,a)=>{const e=v,s=j,y=h(g("u-button"),w),_=h(g("u-loading-icon"),T),k=h(g("u-modal"),S);return o(),u(x,null,[C.value?(o(),r(s,{key:0,class:"w-screen h-screen flex flex-col items-center"},{default:n((()=>[i(s,{class:"flex-1 flex flex-col items-center w-full pt-[100rpx]"},{default:n((()=>[i(e,{class:c(["iconfont text-2xl",2==C.value.status?"text-primary iconduigou":"iconzhifushibai text-red"])},null,8,["class"]),i(s,{class:"text-sm"},{default:n((()=>[p(m(2==C.value.status?d(l)("pay.paySuccess"):d(l)("pay.payFail")),1)])),_:1}),i(s,{class:"text-xl font-bold pt-[30rpx]"},{default:n((()=>[i(e,{class:"text-base"},{default:n((()=>[p(m(d(l)("currency")),1)])),_:1}),i(e,null,{default:n((()=>[p(m(d(b)(C.value.money)),1)])),_:1})])),_:1})])),_:1}),i(s,{class:"pb-[200rpx] w-[240rpx]"},{default:n((()=>[i(y,{type:"primary",text:2==C.value.status?d(l)("complete"):d(l)("close"),plain:!0,onClick:Z},null,8,["text"])])),_:1})])),_:1})):f("v-if",!0),i(k,{show:F.value,showCancelButton:!0,confirmText:d(l)("pay.completePay"),cancelText:d(l)("pay.incompletePay"),onCancel:Z},{default:n((()=>[i(s,{class:"py-[20rpx]"},{default:n((()=>[i(_,{text:d(l)("pay.getting"),textSize:"16",mode:"circle",vertical:!0},null,8,["text"])])),_:1})])),_:1},8,["show","confirmText","cancelText"])],64)}}});export{C as default};