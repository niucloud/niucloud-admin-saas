import{o as R,O as k,r as y,d as te,J as ne,w as L,u as T,_ as se,E as B,m as oe,h as re}from"./base-9962c822.js";import{E as Q}from"./index-c98e204a.js";import{i as $,C as ce}from"./index-57446bef.js";let p=[];const M=e=>{const n=e;n.key===Q.esc&&p.forEach(s=>s(n))},ae=e=>{R(()=>{p.length===0&&document.addEventListener("keydown",M),$&&p.push(e)}),k(()=>{p=p.filter(n=>n!==e),p.length===0&&$&&document.removeEventListener("keydown",M)})},O="focus-trap.focus-after-trapped",g="focus-trap.focus-after-released",ue="focus-trap.focusout-prevented",j={cancelable:!0,bubbles:!1},ie={cancelable:!0,bubbles:!1},q="focusAfterTrapped",J="focusAfterReleased",fe=Symbol("elFocusTrap"),N=y(),P=y(0),I=y(0);let F=0;const X=e=>{const n=[],s=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{const c=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||c?NodeFilter.FILTER_SKIP:o.tabIndex>=0||o===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)n.push(s.currentNode);return n},W=(e,n)=>{for(const s of e)if(!de(s,n))return s},de=(e,n)=>{if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(n&&e===n)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1},le=e=>{const n=X(e),s=W(n,e),o=W(n.reverse(),e);return[s,o]},ve=e=>e instanceof HTMLInputElement&&"select"in e,l=(e,n)=>{if(e&&e.focus){const s=document.activeElement;e.focus({preventScroll:!0}),I.value=window.performance.now(),e!==s&&ve(e)&&n&&e.select()}};function Y(e,n){const s=[...e],o=e.indexOf(n);return o!==-1&&s.splice(o,1),s}const pe=()=>{let e=[];return{push:o=>{const c=e[0];c&&o!==c&&c.pause(),e=Y(e,o),e.unshift(o)},remove:o=>{var c,f;e=Y(e,o),(f=(c=e[0])==null?void 0:c.resume)==null||f.call(c)}}},Ee=(e,n=!1)=>{const s=document.activeElement;for(const o of e)if(l(o,n),document.activeElement!==s)return},z=pe(),me=()=>P.value>I.value,_=()=>{N.value="pointer",P.value=window.performance.now()},G=()=>{N.value="keyboard",P.value=window.performance.now()},Te=()=>(R(()=>{F===0&&(document.addEventListener("mousedown",_),document.addEventListener("touchstart",_),document.addEventListener("keydown",G)),F++}),k(()=>{F--,F<=0&&(document.removeEventListener("mousedown",_),document.removeEventListener("touchstart",_),document.removeEventListener("keydown",G))}),{focusReason:N,lastUserFocusTimestamp:P,lastAutomatedFocusTimestamp:I}),b=e=>new CustomEvent(ue,{...ie,detail:e}),Fe=te({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:[q,J,"focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:n}){const s=y();let o,c;const{focusReason:f}=Te();ae(t=>{e.trapped&&!v.paused&&n("release-requested",t)});const v={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},E=t=>{if(!e.loop&&!e.trapped||v.paused)return;const{key:r,altKey:a,ctrlKey:u,metaKey:i,currentTarget:x,shiftKey:H}=t,{loop:V}=e,ee=r===Q.tab&&!a&&!u&&!i,m=document.activeElement;if(ee&&m){const h=x,[w,C]=le(h);if(w&&C){if(!H&&m===C){const d=b({focusReason:f.value});n("focusout-prevented",d),d.defaultPrevented||(t.preventDefault(),V&&l(w,!0))}else if(H&&[w,h].includes(m)){const d=b({focusReason:f.value});n("focusout-prevented",d),d.defaultPrevented||(t.preventDefault(),V&&l(C,!0))}}else if(m===h){const d=b({focusReason:f.value});n("focusout-prevented",d),d.defaultPrevented||t.preventDefault()}}};ne(fe,{focusTrapRef:s,onKeydown:E}),L(()=>e.focusTrapEl,t=>{t&&(s.value=t)},{immediate:!0}),L([s],([t],[r])=>{t&&(t.addEventListener("keydown",E),t.addEventListener("focusin",A),t.addEventListener("focusout",U)),r&&(r.removeEventListener("keydown",E),r.removeEventListener("focusin",A),r.removeEventListener("focusout",U))});const S=t=>{n(q,t)},Z=t=>n(J,t),A=t=>{const r=T(s);if(!r)return;const a=t.target,u=t.relatedTarget,i=a&&r.contains(a);e.trapped||u&&r.contains(u)||(o=u),i&&n("focusin",t),!v.paused&&e.trapped&&(i?c=a:l(c,!0))},U=t=>{const r=T(s);if(!(v.paused||!r))if(e.trapped){const a=t.relatedTarget;!ce(a)&&!r.contains(a)&&setTimeout(()=>{if(!v.paused&&e.trapped){const u=b({focusReason:f.value});n("focusout-prevented",u),u.defaultPrevented||l(c,!0)}},0)}else{const a=t.target;a&&r.contains(a)||n("focusout",t)}};async function K(){await B();const t=T(s);if(t){z.push(v);const r=t.contains(document.activeElement)?o:document.activeElement;if(o=r,!t.contains(r)){const u=new Event(O,j);t.addEventListener(O,S),t.dispatchEvent(u),u.defaultPrevented||B(()=>{let i=e.focusStartEl;oe(i)||(l(i),document.activeElement!==i&&(i="first")),i==="first"&&Ee(X(t),!0),(document.activeElement===r||i==="container")&&l(t)})}}}function D(){const t=T(s);if(t){t.removeEventListener(O,S);const r=new CustomEvent(g,{...j,detail:{focusReason:f.value}});t.addEventListener(g,Z),t.dispatchEvent(r),!r.defaultPrevented&&(f.value=="keyboard"||!me())&&l(o??document.body),t.removeEventListener(g,S),z.remove(v)}}return R(()=>{e.trapped&&K(),L(()=>e.trapped,t=>{t?K():D()})}),k(()=>{e.trapped&&D()}),{onKeydown:E}}});function _e(e,n,s,o,c,f){return re(e.$slots,"default",{handleKeydown:e.onKeydown})}var he=se(Fe,[["render",_e],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);export{he as E,fe as F};
