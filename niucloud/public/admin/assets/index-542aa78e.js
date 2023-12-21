import{v as U,T as A,c as oe,e as ae,d as re,r as j}from"./index-3fd412a3.js";import{b as $,a as E,d as y,o as le,s as ie,i as Z,$ as H,E as R,a0 as ue,L as ce,a1 as de}from"./index-2048a34f.js";import{d as h,b as q,c as m,e as f,f as k,h as O,y as _,x as B,Q as G,g as x,n as g,u as o,B as Q,_ as W,l as pe,w as J,p as me,ay as fe,r as z,o as ge,v as b,j as ye,H as w,Z as ve,F as Ce,m as V,a8 as K,W as I,az as be}from"./base-d79f9f62.js";import{m as he}from"./typescript-defaf979.js";import{E as Te,u as Ne}from"./index-34cd7f55.js";const we=$({value:{type:[String,Number],default:""},max:{type:Number,default:99},isDot:Boolean,hidden:Boolean,type:{type:String,values:["primary","success","warning","info","danger"],default:"danger"}}),Be=["textContent"],Se=h({name:"ElBadge"}),ze=h({...Se,props:we,setup(s,{expose:t}){const e=s,n=q("badge"),a=m(()=>e.isDot?"":E(e.value)&&E(e.max)?e.max<e.value?`${e.max}+`:`${e.value}`:`${e.value}`);return t({content:a}),(l,u)=>(f(),k("div",{class:g(o(n).b())},[O(l.$slots,"default"),_(A,{name:`${o(n).namespace.value}-zoom-in-center`,persisted:""},{default:B(()=>[G(x("sup",{class:g([o(n).e("content"),o(n).em("content",l.type),o(n).is("fixed",!!l.$slots.default),o(n).is("dot",l.isDot)]),textContent:Q(o(a))},null,10,Be),[[U,!l.hidden&&(o(a)||l.isDot)]])]),_:1},8,["name"])],2))}});var Ee=W(ze,[["__file","/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);const ke=pe(Ee),M={},xe=$({a11y:{type:Boolean,default:!0},locale:{type:y(Object)},size:le,button:{type:y(Object)},experimentalFeatures:{type:y(Object)},keyboardNavigation:{type:Boolean,default:!0},message:{type:y(Object)},zIndex:Number,namespace:{type:String,default:"el"}}),Je=h({name:"ElConfigProvider",props:xe,setup(s,{slots:t}){J(()=>s.message,n=>{Object.assign(M,n??{})},{immediate:!0,deep:!0});const e=me(s);return()=>O(t,"default",{config:e==null?void 0:e.value})}}),X=["success","info","warning","error"],i=he({customClass:"",center:!1,dangerouslyUseHTMLString:!1,duration:3e3,icon:void 0,id:"",message:"",onClose:void 0,showClose:!1,type:"info",offset:16,zIndex:0,grouping:!1,repeatNum:1,appendTo:Z?document.body:void 0}),Ie=$({customClass:{type:String,default:i.customClass},center:{type:Boolean,default:i.center},dangerouslyUseHTMLString:{type:Boolean,default:i.dangerouslyUseHTMLString},duration:{type:Number,default:i.duration},icon:{type:ie,default:i.icon},id:{type:String,default:i.id},message:{type:y([String,Object,Function]),default:i.message},onClose:{type:y(Function),required:!1},showClose:{type:Boolean,default:i.showClose},type:{type:String,values:X,default:i.type},offset:{type:Number,default:i.offset},zIndex:{type:Number,default:i.zIndex},grouping:{type:Boolean,default:i.grouping},repeatNum:{type:Number,default:i.repeatNum}}),Me={destroy:()=>!0},c=fe([]),$e=s=>{const t=c.findIndex(a=>a.id===s),e=c[t];let n;return t>0&&(n=c[t-1]),{current:e,prev:n}},Oe=s=>{const{prev:t}=$e(s);return t?t.vm.exposed.bottom.value:0},_e=(s,t)=>c.findIndex(n=>n.id===s)>0?20:t,Le=["id"],De=["innerHTML"],Pe=h({name:"ElMessage"}),Fe=h({...Pe,props:Ie,emits:Me,setup(s,{expose:t}){const e=s,{Close:n}=ue,a=q("message"),l=z(),u=z(!1),d=z(0);let p;const T=m(()=>e.type?e.type==="error"?"danger":e.type:"info"),L=m(()=>{const r=e.type;return{[a.bm("icon",r)]:r&&H[r]}}),C=m(()=>e.icon||H[e.type]||""),ee=m(()=>Oe(e.id)),D=m(()=>_e(e.id,e.offset)+ee.value),se=m(()=>d.value+D.value),te=m(()=>({top:`${D.value}px`,zIndex:e.zIndex}));function S(){e.duration!==0&&({stop:p}=ce(()=>{N()},e.duration))}function P(){p==null||p()}function N(){u.value=!1}function ne({code:r}){r===Te.esc&&N()}return ge(()=>{S(),u.value=!0}),J(()=>e.repeatNum,()=>{P(),S()}),oe(document,"keydown",ne),ae(l,()=>{d.value=l.value.getBoundingClientRect().height}),t({visible:u,bottom:se,close:N}),(r,F)=>(f(),b(A,{name:o(a).b("fade"),onBeforeLeave:r.onClose,onAfterLeave:F[0]||(F[0]=Ae=>r.$emit("destroy")),persisted:""},{default:B(()=>[G(x("div",{id:r.id,ref_key:"messageRef",ref:l,class:g([o(a).b(),{[o(a).m(r.type)]:r.type&&!r.icon},o(a).is("center",r.center),o(a).is("closable",r.showClose),r.customClass]),style:ye(o(te)),role:"alert",onMouseenter:P,onMouseleave:S},[r.repeatNum>1?(f(),b(o(ke),{key:0,value:r.repeatNum,type:o(T),class:g(o(a).e("badge"))},null,8,["value","type","class"])):w("v-if",!0),o(C)?(f(),b(o(R),{key:1,class:g([o(a).e("icon"),o(L)])},{default:B(()=>[(f(),b(ve(o(C))))]),_:1},8,["class"])):w("v-if",!0),O(r.$slots,"default",{},()=>[r.dangerouslyUseHTMLString?(f(),k(Ce,{key:1},[w(" Caution here, message could've been compromised, never use user's input as message "),x("p",{class:g(o(a).e("content")),innerHTML:r.message},null,10,De)],2112)):(f(),k("p",{key:0,class:g(o(a).e("content"))},Q(r.message),3))]),r.showClose?(f(),b(o(R),{key:2,class:g(o(a).e("closeBtn")),onClick:re(N,["stop"])},{default:B(()=>[_(o(n))]),_:1},8,["class","onClick"])):w("v-if",!0)],46,Le),[[U,u.value]])]),_:3},8,["name","onBeforeLeave"]))}});var je=W(Fe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);let He=1;const Y=s=>{const t=!s||V(s)||K(s)||I(s)?{message:s}:s,e={...i,...t};if(!e.appendTo)e.appendTo=document.body;else if(V(e.appendTo)){let n=document.querySelector(e.appendTo);de(n)||(n=document.body),e.appendTo=n}return e},Re=s=>{const t=c.indexOf(s);if(t===-1)return;c.splice(t,1);const{handler:e}=s;e.close()},Ve=({appendTo:s,...t},e)=>{const{nextZIndex:n}=Ne(),a=`message_${He++}`,l=t.onClose,u=document.createElement("div"),d={...t,zIndex:n()+t.zIndex,id:a,onClose:()=>{l==null||l(),Re(C)},onDestroy:()=>{j(null,u)}},p=_(je,d,I(d.message)||K(d.message)?{default:I(d.message)?d.message:()=>d.message}:null);p.appContext=e||v._context,j(p,u),s.appendChild(u.firstElementChild);const T=p.component,C={id:a,vnode:p,vm:T,handler:{close:()=>{T.exposed.visible.value=!1}},props:p.component.props};return C},v=(s={},t)=>{if(!Z)return{close:()=>{}};if(E(M.max)&&c.length>=M.max)return{close:()=>{}};const e=Y(s);if(e.grouping&&c.length){const a=c.find(({vnode:l})=>{var u;return((u=l.props)==null?void 0:u.message)===e.message});if(a)return a.props.repeatNum+=1,a.props.type=e.type,a.handler}const n=Ve(e,t);return c.push(n),n.handler};X.forEach(s=>{v[s]=(t={},e)=>{const n=Y(t);return v({...n,type:s},e)}});function Ue(s){for(const t of c)(!s||s===t.props.type)&&t.handler.close()}v.closeAll=Ue;v._context=null;const Ke=be(v,"$message");export{Je as C,ke as E,Ke as a};