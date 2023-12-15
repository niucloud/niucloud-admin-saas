import{e as Re,v as He,d as Oe}from"./index-5c4817f4.js";import{a as ge,b as De,o as Le,d as G,s as xe,p as Ke,u as je,V as We,ah as Ue,ai as qe,C as Ye,E as $,q as Qe,i as Xe}from"./index-57446bef.js";import{r as V,m as J,d as Ee,t as Ze,K as Ge,c as f,b as we,s as ee,w as te,E as _,o as Je,a7 as et,Q as tt,e as c,f as g,H as v,F as ae,n as h,u as t,h as K,g as P,v as w,x as A,Z as j,C as oe,y as at,N as ot,B as W,j as nt,_ as st,q as Se,l as lt}from"./base-9962c822.js";import{m as rt}from"./typescript-defaf979.js";import{U as ne}from"./event-9519ab40.js";import{u as it}from"./index-ec548bfb.js";import{u as ut,a as ct}from"./index-6b77b11a.js";import{d as Ce}from"./error-78e43d3e.js";const dt=o=>/([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(o);function pt(o){const m=V();function l(){if(o.value==null)return;const{selectionStart:r,selectionEnd:i,value:d}=o.value;if(r==null||i==null)return;const x=d.slice(0,Math.max(0,r)),u=d.slice(Math.max(0,i));m.value={selectionStart:r,selectionEnd:i,value:d,beforeTxt:x,afterTxt:u}}function a(){if(o.value==null||m.value==null)return;const{value:r}=o.value,{beforeTxt:i,afterTxt:d,selectionStart:x}=m.value;if(i==null||d==null||x==null)return;let u=r.length;if(r.endsWith(d))u=r.length-d.length;else if(r.startsWith(i))u=i.length;else{const y=i[x-1],S=r.indexOf(y,x-1);S!==-1&&(u=S+1)}o.value.setSelectionRange(u,u)}return[l,a]}let b;const ft=`
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,vt=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function mt(o){const m=window.getComputedStyle(o),l=m.getPropertyValue("box-sizing"),a=Number.parseFloat(m.getPropertyValue("padding-bottom"))+Number.parseFloat(m.getPropertyValue("padding-top")),r=Number.parseFloat(m.getPropertyValue("border-bottom-width"))+Number.parseFloat(m.getPropertyValue("border-top-width"));return{contextStyle:vt.map(d=>`${d}:${m.getPropertyValue(d)}`).join(";"),paddingSize:a,borderSize:r,boxSizing:l}}function Ie(o,m=1,l){var a;b||(b=document.createElement("textarea"),document.body.appendChild(b));const{paddingSize:r,borderSize:i,boxSizing:d,contextStyle:x}=mt(o);b.setAttribute("style",`${x};${ft}`),b.value=o.value||o.placeholder||"";let u=b.scrollHeight;const y={};d==="border-box"?u=u+i:d==="content-box"&&(u=u-r),b.value="";const S=b.scrollHeight-r;if(ge(m)){let p=S*m;d==="border-box"&&(p=p+r+i),u=Math.max(p,u),y.minHeight=`${p}px`}if(ge(l)){let p=S*l;d==="border-box"&&(p=p+r+i),u=Math.min(p,u)}return y.height=`${u}px`,(a=b.parentNode)==null||a.removeChild(b),b=void 0,y}const ht=De({id:{type:String,default:void 0},size:Le,disabled:Boolean,modelValue:{type:G([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:G([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:xe},prefixIcon:{type:xe},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:G([Object,Array,String]),default:()=>rt({})}}),yt={[ne]:o=>J(o),input:o=>J(o),change:o=>J(o),focus:o=>o instanceof FocusEvent,blur:o=>o instanceof FocusEvent,clear:()=>!0,mouseleave:o=>o instanceof MouseEvent,mouseenter:o=>o instanceof MouseEvent,keydown:o=>o instanceof Event,compositionstart:o=>o instanceof CompositionEvent,compositionupdate:o=>o instanceof CompositionEvent,compositionend:o=>o instanceof CompositionEvent},bt=["role"],gt=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],xt=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],wt=Ee({name:"ElInput",inheritAttrs:!1}),St=Ee({...wt,props:ht,emits:yt,setup(o,{expose:m,emit:l}){const a=o,r=Ze(),i=Ge(),d=f(()=>{const e={};return a.containerRole==="combobox"&&(e["aria-haspopup"]=r["aria-haspopup"],e["aria-owns"]=r["aria-owns"],e["aria-expanded"]=r["aria-expanded"]),e}),x=f(()=>[a.type==="textarea"?le.b():n.b(),n.m(ke.value),n.is("disabled",E.value),n.is("exceed",Ve.value),{[n.b("group")]:i.prepend||i.append,[n.bm("group","append")]:i.append,[n.bm("group","prepend")]:i.prepend,[n.m("prefix")]:i.prefix||a.prefixIcon,[n.m("suffix")]:i.suffix||a.suffixIcon||a.clearable||a.showPassword,[n.bm("suffix","password-clear")]:O.value&&Y.value},r.class]),u=f(()=>[n.e("wrapper"),n.is("focus",N.value)]),y=it({excludeKeys:f(()=>Object.keys(d.value))}),{form:S,formItem:p}=ut(),{inputId:se}=ct(a,{formItemContext:p}),ke=Ke(),E=je(),n=we("input"),le=we("textarea"),R=ee(),k=ee(),N=V(!1),U=V(!1),F=V(!1),H=V(!1),re=V(),q=ee(a.inputStyle),T=f(()=>R.value||k.value),ie=f(()=>{var e;return(e=S==null?void 0:S.statusIcon)!=null?e:!1}),B=f(()=>(p==null?void 0:p.validateState)||""),ue=f(()=>B.value&&We[B.value]),ze=f(()=>H.value?Ue:qe),Pe=f(()=>[r.style,a.inputStyle]),ce=f(()=>[a.inputStyle,q.value,{resize:a.resize}]),C=f(()=>Ye(a.modelValue)?"":String(a.modelValue)),O=f(()=>a.clearable&&!E.value&&!a.readonly&&!!C.value&&(N.value||U.value)),Y=f(()=>a.showPassword&&!E.value&&!a.readonly&&!!C.value&&(!!C.value||N.value)),z=f(()=>a.showWordLimit&&!!y.value.maxlength&&(a.type==="text"||a.type==="textarea")&&!E.value&&!a.readonly&&!a.showPassword),Q=f(()=>Array.from(C.value).length),Ve=f(()=>!!z.value&&Q.value>Number(y.value.maxlength)),Ne=f(()=>!!i.suffix||!!a.suffixIcon||O.value||a.showPassword||z.value||!!B.value&&ie.value),[Fe,Te]=pt(R);Re(k,e=>{if(!z.value||a.resize!=="both")return;const s=e[0],{width:I}=s.contentRect;re.value={right:`calc(100% - ${I+15+6}px)`}});const D=()=>{const{type:e,autosize:s}=a;if(!(!Xe||e!=="textarea"))if(s){const I=Se(s)?s.minRows:void 0,Z=Se(s)?s.maxRows:void 0;q.value={...Ie(k.value,I,Z)}}else q.value={minHeight:Ie(k.value).minHeight}},M=()=>{const e=T.value;!e||e.value===C.value||(e.value=C.value)},X=async e=>{Fe();let{value:s}=e.target;if(a.formatter&&(s=a.parser?a.parser(s):s,s=a.formatter(s)),!F.value){if(s===C.value){M();return}l(ne,s),l("input",s),await _(),M(),Te()}},de=e=>{l("change",e.target.value)},pe=e=>{l("compositionstart",e),F.value=!0},fe=e=>{var s;l("compositionupdate",e);const I=(s=e.target)==null?void 0:s.value,Z=I[I.length-1]||"";F.value=!dt(Z)},ve=e=>{l("compositionend",e),F.value&&(F.value=!1,X(e))},Be=()=>{H.value=!H.value,L()},L=async()=>{var e;await _(),(e=T.value)==null||e.focus()},Me=()=>{var e;return(e=T.value)==null?void 0:e.blur()},me=e=>{N.value=!0,l("focus",e)},he=e=>{var s;N.value=!1,l("blur",e),a.validateEvent&&((s=p==null?void 0:p.validate)==null||s.call(p,"blur").catch(I=>Ce()))},$e=e=>{U.value=!1,l("mouseleave",e)},_e=e=>{U.value=!0,l("mouseenter",e)},ye=e=>{l("keydown",e)},Ae=()=>{var e;(e=T.value)==null||e.select()},be=()=>{l(ne,""),l("change",""),l("clear"),l("input","")};return te(()=>a.modelValue,()=>{var e;_(()=>D()),a.validateEvent&&((e=p==null?void 0:p.validate)==null||e.call(p,"change").catch(s=>Ce()))}),te(C,()=>M()),te(()=>a.type,async()=>{await _(),M(),D()}),Je(()=>{!a.formatter&&a.parser,M(),_(D)}),m({input:R,textarea:k,ref:T,textareaStyle:ce,autosize:et(a,"autosize"),focus:L,blur:Me,select:Ae,clear:be,resizeTextarea:D}),(e,s)=>tt((c(),g("div",oe(t(d),{class:t(x),style:t(Pe),role:e.containerRole,onMouseenter:_e,onMouseleave:$e}),[v(" input "),e.type!=="textarea"?(c(),g(ae,{key:0},[v(" prepend slot "),e.$slots.prepend?(c(),g("div",{key:0,class:h(t(n).be("group","prepend"))},[K(e.$slots,"prepend")],2)):v("v-if",!0),P("div",{class:h(t(u))},[v(" prefix slot "),e.$slots.prefix||e.prefixIcon?(c(),g("span",{key:0,class:h(t(n).e("prefix"))},[P("span",{class:h(t(n).e("prefix-inner")),onClick:L},[K(e.$slots,"prefix"),e.prefixIcon?(c(),w(t($),{key:0,class:h(t(n).e("icon"))},{default:A(()=>[(c(),w(j(e.prefixIcon)))]),_:1},8,["class"])):v("v-if",!0)],2)],2)):v("v-if",!0),P("input",oe({id:t(se),ref_key:"input",ref:R,class:t(n).e("inner")},t(y),{type:e.showPassword?H.value?"text":"password":e.type,disabled:t(E),formatter:e.formatter,parser:e.parser,readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.label,placeholder:e.placeholder,style:e.inputStyle,form:a.form,onCompositionstart:pe,onCompositionupdate:fe,onCompositionend:ve,onInput:X,onFocus:me,onBlur:he,onChange:de,onKeydown:ye}),null,16,gt),v(" suffix slot "),t(Ne)?(c(),g("span",{key:1,class:h(t(n).e("suffix"))},[P("span",{class:h(t(n).e("suffix-inner")),onClick:L},[!t(O)||!t(Y)||!t(z)?(c(),g(ae,{key:0},[K(e.$slots,"suffix"),e.suffixIcon?(c(),w(t($),{key:0,class:h(t(n).e("icon"))},{default:A(()=>[(c(),w(j(e.suffixIcon)))]),_:1},8,["class"])):v("v-if",!0)],64)):v("v-if",!0),t(O)?(c(),w(t($),{key:1,class:h([t(n).e("icon"),t(n).e("clear")]),onMousedown:Oe(t(ot),["prevent"]),onClick:be},{default:A(()=>[at(t(Qe))]),_:1},8,["class","onMousedown"])):v("v-if",!0),t(Y)?(c(),w(t($),{key:2,class:h([t(n).e("icon"),t(n).e("password")]),onClick:Be},{default:A(()=>[(c(),w(j(t(ze))))]),_:1},8,["class"])):v("v-if",!0),t(z)?(c(),g("span",{key:3,class:h(t(n).e("count"))},[P("span",{class:h(t(n).e("count-inner"))},W(t(Q))+" / "+W(t(y).maxlength),3)],2)):v("v-if",!0),t(B)&&t(ue)&&t(ie)?(c(),w(t($),{key:4,class:h([t(n).e("icon"),t(n).e("validateIcon"),t(n).is("loading",t(B)==="validating")])},{default:A(()=>[(c(),w(j(t(ue))))]),_:1},8,["class"])):v("v-if",!0)],2)],2)):v("v-if",!0)],2),v(" append slot "),e.$slots.append?(c(),g("div",{key:1,class:h(t(n).be("group","append"))},[K(e.$slots,"append")],2)):v("v-if",!0)],64)):(c(),g(ae,{key:1},[v(" textarea "),P("textarea",oe({id:t(se),ref_key:"textarea",ref:k,class:t(le).e("inner")},t(y),{tabindex:e.tabindex,disabled:t(E),readonly:e.readonly,autocomplete:e.autocomplete,style:t(ce),"aria-label":e.label,placeholder:e.placeholder,form:a.form,onCompositionstart:pe,onCompositionupdate:fe,onCompositionend:ve,onInput:X,onFocus:me,onBlur:he,onChange:de,onKeydown:ye}),null,16,xt),t(z)?(c(),g("span",{key:0,style:nt(re.value),class:h(t(n).e("count"))},W(t(Q))+" / "+W(t(y).maxlength),7)):v("v-if",!0)],64))],16,bt)),[[He,e.type!=="hidden"]])}});var Ct=st(St,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const Tt=lt(Ct);export{Tt as E,dt as i};