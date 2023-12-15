import{E as ae}from"./index-7ab57426.js";import{c as O,E as be,O as Ie,w as re}from"./index-ab38878f.js";import{E as Ee}from"./index-2ee99ba1.js";import{b as he,d as Z,E as ie,r as _e,e as Ce,p as ye}from"./index-57446bef.js";import{c as Te,E as Fe,d as $e,a as de,C as ke,b as Re,e as Se,f as Oe,g as Pe,F as De,L as Ne}from"./dropdown-ccb689be.js";import{d as G,r as C,I as _,c as y,J as V,aG as Ke,a7 as H,u as S,w as Be,_ as A,h as D,V as b,e as P,v as L,x as v,y as k,M as Me,a6 as Ge,E as Ae,b as X,P as ue,f as J,D as Le,C as U,n as q,H as Q,g as ze,Z as He,F as Ue,j as Ye,l as Ve,T as ce}from"./base-9962c822.js";import{c as Je}from"./index-5c4817f4.js";import{E}from"./index-c98e204a.js";import{u as We}from"./index-df16e899.js";import{u as pe}from"./index-71b7d8f4.js";import{c as fe}from"./index-e2acd187.js";import{F as je}from"./focus-trap-d0fc8554.js";const Ze=he({style:{type:Z([String,Array,Object])},currentTabId:{type:Z(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:Z(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:qe,ElCollectionItem:Qe,COLLECTION_INJECTION_KEY:x,COLLECTION_ITEM_INJECTION_KEY:Xe}=Te("RovingFocusGroup"),ee=Symbol("elRovingFocusGroup"),me=Symbol("elRovingFocusGroupItem"),xe={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},eo=(e,o)=>{if(o!=="rtl")return e;switch(e){case E.right:return E.left;case E.left:return E.right;default:return e}},oo=(e,o,a)=>{const t=eo(e.key,a);if(!(o==="vertical"&&[E.left,E.right].includes(t))&&!(o==="horizontal"&&[E.up,E.down].includes(t)))return xe[t]},no=(e,o)=>e.map((a,t)=>e[(t+o)%e.length]),oe=e=>{const{activeElement:o}=document;for(const a of e)if(a===o||(a.focus(),o!==document.activeElement))return},le="currentTabIdChange",se="rovingFocusGroup.entryFocus",to={bubbles:!1,cancelable:!0},ro=G({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:Ze,emits:[le,"entryFocus"],setup(e,{emit:o}){var a;const t=C((a=e.currentTabId||e.defaultCurrentTabId)!=null?a:null),d=C(!1),c=C(!1),l=C(null),{getItems:r}=_(x,void 0),p=y(()=>[{outline:"none"},e.style]),g=s=>{o(le,s)},w=()=>{d.value=!0},I=O(s=>{var f;(f=e.onMousedown)==null||f.call(e,s)},()=>{c.value=!0}),h=O(s=>{var f;(f=e.onFocus)==null||f.call(e,s)},s=>{const f=!S(c),{target:N,currentTarget:T}=s;if(N===T&&f&&!S(d)){const K=new Event(se,to);if(T==null||T.dispatchEvent(K),!K.defaultPrevented){const m=r().filter($=>$.focusable),R=m.find($=>$.active),F=m.find($=>$.id===S(t)),M=[R,F,...m].filter(Boolean).map($=>$.ref);oe(M)}}c.value=!1}),n=O(s=>{var f;(f=e.onBlur)==null||f.call(e,s)},()=>{d.value=!1}),i=(...s)=>{o("entryFocus",...s)};V(ee,{currentTabbedId:Ke(t),loop:H(e,"loop"),tabIndex:y(()=>S(d)?-1:0),rovingFocusGroupRef:l,rovingFocusGroupRootStyle:p,orientation:H(e,"orientation"),dir:H(e,"dir"),onItemFocus:g,onItemShiftTab:w,onBlur:n,onFocus:h,onMousedown:I}),Be(()=>e.currentTabId,s=>{t.value=s??null}),Je(l,se,i)}});function lo(e,o,a,t,d,c){return D(e.$slots,"default")}var so=A(ro,[["render",lo],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]]);const ao=G({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:qe,ElRovingFocusGroupImpl:so}});function io(e,o,a,t,d,c){const l=b("el-roving-focus-group-impl"),r=b("el-focus-group-collection");return P(),L(r,null,{default:v(()=>[k(l,Me(Ge(e.$attrs)),{default:v(()=>[D(e.$slots,"default")]),_:3},16)]),_:3})}var uo=A(ao,[["render",io],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);const co=G({components:{ElRovingFocusCollectionItem:Qe},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:o}){const{currentTabbedId:a,loop:t,onItemFocus:d,onItemShiftTab:c}=_(ee,void 0),{getItems:l}=_(x,void 0),r=pe(),p=C(null),g=O(n=>{o("mousedown",n)},n=>{e.focusable?d(S(r)):n.preventDefault()}),w=O(n=>{o("focus",n)},()=>{d(S(r))}),I=O(n=>{o("keydown",n)},n=>{const{key:i,shiftKey:s,target:f,currentTarget:N}=n;if(i===E.tab&&s){c();return}if(f!==N)return;const T=oo(n);if(T){n.preventDefault();let m=l().filter(R=>R.focusable).map(R=>R.ref);switch(T){case"last":{m.reverse();break}case"prev":case"next":{T==="prev"&&m.reverse();const R=m.indexOf(N);m=t.value?no(m,R+1):m.slice(R+1);break}}Ae(()=>{oe(m)})}}),h=y(()=>a.value===S(r));return V(me,{rovingFocusGroupItemRef:p,tabIndex:y(()=>S(h)?0:-1),handleMousedown:g,handleFocus:w,handleKeydown:I}),{id:r,handleKeydown:I,handleFocus:w,handleMousedown:g}}});function po(e,o,a,t,d,c){const l=b("el-roving-focus-collection-item");return P(),L(l,{id:e.id,focusable:e.focusable,active:e.active},{default:v(()=>[D(e.$slots,"default")]),_:3},8,["id","focusable","active"])}var fo=A(co,[["render",po],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);const W=Symbol("elDropdown"),{ButtonGroup:mo}=ae,vo=G({name:"ElDropdown",components:{ElButton:ae,ElButtonGroup:mo,ElScrollbar:Ee,ElDropdownCollection:Fe,ElTooltip:be,ElRovingFocusGroup:uo,ElOnlyChild:Ie,ElIcon:ie,ArrowDown:_e},props:$e,emits:["visible-change","click","command"],setup(e,{emit:o}){const a=ue(),t=X("dropdown"),{t:d}=We(),c=C(),l=C(),r=C(null),p=C(null),g=C(null),w=C(null),I=C(!1),h=[E.enter,E.space,E.down],n=y(()=>({maxHeight:Ce(e.maxHeight)})),i=y(()=>[t.m(m.value)]),s=pe().value,f=y(()=>e.id||s);function N(){T()}function T(){var u;(u=r.value)==null||u.onClose()}function K(){var u;(u=r.value)==null||u.onOpen()}const m=ye();function R(...u){o("command",...u)}function F(){}function B(){const u=S(p);u==null||u.focus(),w.value=null}function M(u){w.value=u}function $(u){I.value||(u.preventDefault(),u.stopImmediatePropagation())}function ne(){o("visible-change",!0)}function Y(u){(u==null?void 0:u.type)==="keydown"&&p.value.focus()}function z(){o("visible-change",!1)}return V(W,{contentRef:p,role:y(()=>e.role),triggerId:f,isUsingKeyboard:I,onItemEnter:F,onItemLeave:B}),V("elDropdown",{instance:a,dropdownSize:m,handleClick:N,commandHandler:R,trigger:H(e,"trigger"),hideOnClick:H(e,"hideOnClick")}),{t:d,ns:t,scrollbar:g,wrapStyle:n,dropdownTriggerKls:i,dropdownSize:m,triggerId:f,triggerKeys:h,currentTabId:w,handleCurrentTabIdChange:M,handlerMainButtonClick:u=>{o("click",u)},handleEntryFocus:$,handleClose:T,handleOpen:K,handleBeforeShowTooltip:ne,handleShowTooltip:Y,handleBeforeHideTooltip:z,onFocusAfterTrapped:u=>{var j,te;u.preventDefault(),(te=(j=p.value)==null?void 0:j.focus)==null||te.call(j,{preventScroll:!0})},popperRef:r,contentRef:p,triggeringElementRef:c,referenceElementRef:l}}});function go(e,o,a,t,d,c){var l;const r=b("el-dropdown-collection"),p=b("el-roving-focus-group"),g=b("el-scrollbar"),w=b("el-only-child"),I=b("el-tooltip"),h=b("el-button"),n=b("arrow-down"),i=b("el-icon"),s=b("el-button-group");return P(),J("div",{class:q([e.ns.b(),e.ns.is("disabled",e.disabled)])},[k(I,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":e.trigger==="hover"?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":(l=e.referenceElementRef)==null?void 0:l.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":e.trigger==="hover"?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},Le({content:v(()=>[k(g,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:v(()=>[k(p,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:v(()=>[k(r,null,{default:v(()=>[D(e.$slots,"dropdown")]),_:3})]),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])]),_:3},8,["wrap-style","view-class"])]),_:2},[e.splitButton?void 0:{name:"default",fn:v(()=>[k(w,{id:e.triggerId,role:"button",tabindex:e.tabindex},{default:v(()=>[D(e.$slots,"default")]),_:3},8,["id","tabindex"])])}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(P(),L(s,{key:0},{default:v(()=>[k(h,U({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:v(()=>[D(e.$slots,"default")]),_:3},16,["size","type","disabled","tabindex","onClick"]),k(h,U({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:v(()=>[k(i,{class:q(e.ns.e("icon"))},{default:v(()=>[k(n)]),_:1},8,["class"])]),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])]),_:3})):Q("v-if",!0)],2)}var wo=A(vo,[["render",go],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);const bo=G({name:"DropdownItemImpl",components:{ElIcon:ie},props:de,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:o}){const a=X("dropdown"),{role:t}=_(W,void 0),{collectionItemRef:d}=_(ke,void 0),{collectionItemRef:c}=_(Xe,void 0),{rovingFocusGroupItemRef:l,tabIndex:r,handleFocus:p,handleKeydown:g,handleMousedown:w}=_(me,void 0),I=fe(d,c,l),h=y(()=>t.value==="menu"?"menuitem":t.value==="navigation"?"link":"button"),n=O(i=>{const{code:s}=i;if(s===E.enter||s===E.space)return i.preventDefault(),i.stopImmediatePropagation(),o("clickimpl",i),!0},g);return{ns:a,itemRef:I,dataset:{[Re]:""},role:h,tabIndex:r,handleFocus:p,handleKeydown:n,handleMousedown:w}}}),Io=["aria-disabled","tabindex","role"];function Eo(e,o,a,t,d,c){const l=b("el-icon");return P(),J(Ue,null,[e.divided?(P(),J("li",U({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):Q("v-if",!0),ze("li",U({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:o[0]||(o[0]=r=>e.$emit("clickimpl",r)),onFocus:o[1]||(o[1]=(...r)=>e.handleFocus&&e.handleFocus(...r)),onKeydown:o[2]||(o[2]=(...r)=>e.handleKeydown&&e.handleKeydown(...r)),onMousedown:o[3]||(o[3]=(...r)=>e.handleMousedown&&e.handleMousedown(...r)),onPointermove:o[4]||(o[4]=r=>e.$emit("pointermove",r)),onPointerleave:o[5]||(o[5]=r=>e.$emit("pointerleave",r))}),[e.icon?(P(),L(l,{key:0},{default:v(()=>[(P(),L(He(e.icon)))]),_:1})):Q("v-if",!0),D(e.$slots,"default")],16,Io)],64)}var ho=A(bo,[["render",Eo],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]]);const ve=()=>{const e=_("elDropdown",{}),o=y(()=>e==null?void 0:e.dropdownSize);return{elDropdown:e,_elDropdownSize:o}},_o=G({name:"ElDropdownItem",components:{ElDropdownCollectionItem:Se,ElRovingFocusItem:fo,ElDropdownItemImpl:ho},inheritAttrs:!1,props:de,emits:["pointermove","pointerleave","click"],setup(e,{emit:o,attrs:a}){const{elDropdown:t}=ve(),d=ue(),c=C(null),l=y(()=>{var n,i;return(i=(n=S(c))==null?void 0:n.textContent)!=null?i:""}),{onItemEnter:r,onItemLeave:p}=_(W,void 0),g=O(n=>(o("pointermove",n),n.defaultPrevented),re(n=>{var i;e.disabled?p(n):(r(n),n.defaultPrevented||(i=n.currentTarget)==null||i.focus())})),w=O(n=>(o("pointerleave",n),n.defaultPrevented),re(n=>{p(n)})),I=O(n=>{if(!e.disabled)return o("click",n),n.type!=="keydown"&&n.defaultPrevented},n=>{var i,s,f;if(e.disabled){n.stopImmediatePropagation();return}(i=t==null?void 0:t.hideOnClick)!=null&&i.value&&((s=t.handleClick)==null||s.call(t)),(f=t.commandHandler)==null||f.call(t,e.command,d,n)}),h=y(()=>({...e,...a}));return{handleClick:I,handlePointerMove:g,handlePointerLeave:w,textContent:l,propsAndAttrs:h}}});function Co(e,o,a,t,d,c){var l;const r=b("el-dropdown-item-impl"),p=b("el-roving-focus-item"),g=b("el-dropdown-collection-item");return P(),L(g,{disabled:e.disabled,"text-value":(l=e.textValue)!=null?l:e.textContent},{default:v(()=>[k(p,{focusable:!e.disabled},{default:v(()=>[k(r,U(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:v(()=>[D(e.$slots,"default")]),_:3},16,["onPointerleave","onPointermove","onClickimpl"])]),_:3},8,["focusable"])]),_:3},8,["disabled","text-value"])}var ge=A(_o,[["render",Co],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);const yo=G({name:"ElDropdownMenu",props:Oe,setup(e){const o=X("dropdown"),{_elDropdownSize:a}=ve(),t=a.value,{focusTrapRef:d,onKeydown:c}=_(je,void 0),{contentRef:l,role:r,triggerId:p}=_(W,void 0),{collectionRef:g,getItems:w}=_(Pe,void 0),{rovingFocusGroupRef:I,rovingFocusGroupRootStyle:h,tabIndex:n,onBlur:i,onFocus:s,onMousedown:f}=_(ee,void 0),{collectionRef:N}=_(x,void 0),T=y(()=>[o.b("menu"),o.bm("menu",t==null?void 0:t.value)]),K=fe(l,g,d,I,N),m=O(F=>{var B;(B=e.onKeydown)==null||B.call(e,F)},F=>{const{currentTarget:B,code:M,target:$}=F;if(B.contains($),E.tab===M&&F.stopImmediatePropagation(),F.preventDefault(),$!==S(l)||!De.includes(M))return;const Y=w().filter(z=>!z.disabled).map(z=>z.ref);Ne.includes(M)&&Y.reverse(),oe(Y)});return{size:t,rovingFocusGroupRootStyle:h,tabIndex:n,dropdownKls:T,role:r,triggerId:p,dropdownListWrapperRef:K,handleKeydown:F=>{m(F),c(F)},onBlur:i,onFocus:s,onMousedown:f}}}),To=["role","aria-labelledby"];function Fo(e,o,a,t,d,c){return P(),J("ul",{ref:e.dropdownListWrapperRef,class:q(e.dropdownKls),style:Ye(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:o[0]||(o[0]=(...l)=>e.onBlur&&e.onBlur(...l)),onFocus:o[1]||(o[1]=(...l)=>e.onFocus&&e.onFocus(...l)),onKeydown:o[2]||(o[2]=(...l)=>e.handleKeydown&&e.handleKeydown(...l)),onMousedown:o[3]||(o[3]=(...l)=>e.onMousedown&&e.onMousedown(...l))},[D(e.$slots,"default")],46,To)}var we=A(yo,[["render",Fo],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);const zo=Ve(wo,{DropdownItem:ge,DropdownMenu:we}),Ho=ce(ge),Uo=ce(we);export{zo as E,Ho as a,Uo as b};