import{d as g,r as y,R as v,e as b,f as R,g as s,u as t,B as e,y as a,x as i,A as p}from"./base-9962c822.js";/* empty css                *//* empty css               *//* empty css                  */import{t as o}from"./index-6e46fb55.js";import{g as C}from"./wechat-2c179025.js";import{u as T,b as k}from"./vue-router-d7e63612.js";import{E as L}from"./index-7ab57426.js";import{E as U,a as j}from"./index-20ef35a7.js";import{E}from"./index-189f302e.js";import"./pinia-a9fc3924.js";import"./index-38fee8c5.js";import"./storage-0874d153.js";import"./index-57446bef.js";import"./index-5c4817f4.js";import"./index-2cabf788.js";import"./typescript-defaf979.js";import"./index-c98e204a.js";import"./system-1108e5c1.js";import"./index-c4e33d8d.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./index-1370ab44.js";import"./index-6b77b11a.js";import"./index-71b7d8f4.js";const B=""+new URL("alipay1-029c00a2.png",import.meta.url).href,N=""+new URL("alipay2-f74219b9.png",import.meta.url).href,O=""+new URL("alipay3-0895ce6e.png",import.meta.url).href,V=""+new URL("alipay4-92fef352.png",import.meta.url).href,D=""+new URL("alipay4_1-ad9b08e3.jpg",import.meta.url).href,P=""+new URL("alipay4_2-cbaa820b.jpg",import.meta.url).href,q=""+new URL("alipay4_3-4a213289.jpg",import.meta.url).href,z=""+new URL("alipay4_4-7924cbdd.jpg",import.meta.url).href,A=""+new URL("alipay5-6dba1989.png",import.meta.url).href,S=""+new URL("alipay6-f1e18995.png",import.meta.url).href,W=""+new URL("alipay7-c805d7c0.png",import.meta.url).href,$=""+new URL("alipay8-3097d150.png",import.meta.url).href,F={class:"main-container"},G={class:"detail-head"},H=s("span",{class:"iconfont iconxiangzuojiantou !text-xs"},null,-1),I={class:"ml-[1px]"},J=s("span",{class:"adorn"},"|",-1),K={class:"right"},M={class:"mt-[20px]"},Q={class:"flex"},X=s("div",{class:"min-w-[60px]"},[s("span",{class:"flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary"},"1")],-1),Y={class:"flex items-center text-[14px]"},Z=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:B})],-1),ss={class:"flex items-center text-[14px] mt-[20px]"},ts=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:N})],-1),es=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:O})],-1),os={class:"flex mt-[40px]"},as=s("div",{class:"min-w-[60px]"},[s("span",{class:"flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary"},"2")],-1),is={class:"flex items-center text-[14px]"},rs={class:"w-[100%] mt-[10px] flex flex-wrap"},ps=s("div",{class:"w-[100%]"},[s("img",{class:"w-[100%]",src:V})],-1),ns=s("div",{class:"w-[100%]"},[s("img",{class:"w-[100%]",src:D})],-1),cs=s("div",{class:"w-[100%]"},[s("img",{class:"w-[100%]",src:P})],-1),ls=s("div",{class:"w-[100%]"},[s("img",{class:"w-[100%]",src:q})],-1),ms=s("div",{class:"w-[100%]"},[s("img",{class:"w-[100%]",src:z})],-1),_s={class:"flex mt-[40px]"},ds=s("div",{class:"min-w-[60px]"},[s("span",{class:"flex justify-center items-center block w-[40px] h-[40px] border-[1px] border-primary rounded-[999px] text-primary"},"3")],-1),xs={class:"flex items-center text-[14px]"},us=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:A})],-1),hs=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:S})],-1),fs={class:"flex items-center text-[14px] mt-[20px]"},ws=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:W})],-1),gs={class:"flex items-center text-[14px] mt-[20px]"},ys=s("div",{class:"w-[100%] mt-[10px]"},[s("img",{class:"w-[100%]",src:$})],-1),Js=g({__name:"course",setup(vs){const l=T(),m=k(),_=l.meta.title,d=y(!0),x=v({wechat_name:"",wechat_original:"",app_id:"",app_secret:"",qr_code:"",token:"",encoding_aes_key:"",encryption_type:"not_encrypt"});C().then(n=>{Object.assign(x,n.data),d.value=!1});const u=()=>{window.open("https://open.alipay.com/develop/manage","_blank")};return(n,c)=>{const h=L,r=U,f=j,w=E;return b(),R("div",F,[s("div",G,[s("div",{class:"left",onClick:c[0]||(c[0]=bs=>t(m).push({path:"/channel/aliapp"}))},[H,s("span",I,e(t(o)("returnToPreviousPage")),1)]),J,s("span",K,e(t(_)),1)]),a(w,{class:"box-card !border-none",shadow:"never"},{default:i(()=>[s("div",M,[s("div",Q,[X,s("div",null,[s("p",Y,[p(e(t(o)("alipayCourseTipsOne1"))+"--",1),a(h,{link:"",type:"primary",onClick:u},{default:i(()=>[p(e(t(o)("alipayCourseTipsOne2")),1)]),_:1}),p(", "+e(t(o)("alipayCourseTipsOne3")),1)]),Z,s("p",ss,e(t(o)("alipayCourseTipsTwo1")),1),ts,es])]),s("div",os,[as,s("div",null,[s("p",is,e(t(o)("alipayCourseTipsTwo2")),1),s("div",rs,[ps,s("div",null,[a(f,{gutter:20},{default:i(()=>[a(r,{span:6},{default:i(()=>[ns]),_:1}),a(r,{span:6},{default:i(()=>[cs]),_:1}),a(r,{span:6},{default:i(()=>[ls]),_:1}),a(r,{span:6},{default:i(()=>[ms]),_:1})]),_:1})])])])]),s("div",_s,[ds,s("div",null,[s("p",xs,e(t(o)("alipayCourseTipsThree1")),1),us,hs,s("p",fs,e(t(o)("alipayCourseTipsThree2")),1),ws,s("p",gs,e(t(o)("alipayCourseTipsThree3")),1),ys])])])]),_:1})])}}});export{Js as default};
