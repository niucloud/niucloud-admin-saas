import{n as C,d as N}from"./index-3fd412a3.js";import{b as E,o as z,a as $,c as h,p as J,u as O}from"./index-2048a34f.js";import{U as S,C as Q}from"./event-9519ab40.js";import{m as w,r as B,I as W,c as v,d as y,b as k,e as I,f as _,g,Q as P,u as e,i as T,n as c,h as V,A,B as D,_ as G,E as F,j as X,o as Y,J as Z,R as x,a4 as ee,w as oe,l as ae,T as K}from"./base-d79f9f62.js";import{u as le}from"./index-71aec1df.js";import{u as se,a as ne}from"./index-427f5a83.js";import{d as te}from"./error-78e43d3e.js";const M=Symbol("radioGroupKey"),U=E({size:z,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),re=E({...U,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),L={[S]:s=>w(s)||$(s)||h(s),[Q]:s=>w(s)||$(s)||h(s)},j=(s,m)=>{const n=B(),a=W(M,void 0),d=v(()=>!!a),f=v({get(){return d.value?a.modelValue:s.modelValue},set(i){d.value?a.changeEvent(i):m&&m(S,i),n.value.checked=s.modelValue===s.label}}),r=J(v(()=>a==null?void 0:a.size)),u=O(v(()=>a==null?void 0:a.disabled)),l=B(!1),p=v(()=>u.value||d.value&&f.value!==s.label?-1:0);return{radioRef:n,isGroup:d,radioGroup:a,focus:l,size:r,disabled:u,tabIndex:p,modelValue:f}},ie=["value","name","disabled"],de=y({name:"ElRadio"}),ue=y({...de,props:re,emits:L,setup(s,{emit:m}){const n=s,a=k("radio"),{radioRef:d,radioGroup:f,focus:r,size:u,disabled:l,modelValue:p}=j(n,m);function i(){F(()=>m("change",p.value))}return(o,t)=>{var b;return I(),_("label",{class:c([e(a).b(),e(a).is("disabled",e(l)),e(a).is("focus",e(r)),e(a).is("bordered",o.border),e(a).is("checked",e(p)===o.label),e(a).m(e(u))])},[g("span",{class:c([e(a).e("input"),e(a).is("disabled",e(l)),e(a).is("checked",e(p)===o.label)])},[P(g("input",{ref_key:"radioRef",ref:d,"onUpdate:modelValue":t[0]||(t[0]=R=>T(p)?p.value=R:null),class:c(e(a).e("original")),value:o.label,name:o.name||((b=e(f))==null?void 0:b.name),disabled:e(l),type:"radio",onFocus:t[1]||(t[1]=R=>r.value=!0),onBlur:t[2]||(t[2]=R=>r.value=!1),onChange:i},null,42,ie),[[C,e(p)]]),g("span",{class:c(e(a).e("inner"))},null,2)],2),g("span",{class:c(e(a).e("label")),onKeydown:t[3]||(t[3]=N(()=>{},["stop"]))},[V(o.$slots,"default",{},()=>[A(D(o.label),1)])],34)],2)}}});var pe=G(ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const me=E({...U,name:{type:String,default:""}}),fe=["value","name","disabled"],ce=y({name:"ElRadioButton"}),be=y({...ce,props:me,setup(s){const m=s,n=k("radio"),{radioRef:a,focus:d,size:f,disabled:r,modelValue:u,radioGroup:l}=j(m),p=v(()=>({backgroundColor:(l==null?void 0:l.fill)||"",borderColor:(l==null?void 0:l.fill)||"",boxShadow:l!=null&&l.fill?`-1px 0 0 0 ${l.fill}`:"",color:(l==null?void 0:l.textColor)||""}));return(i,o)=>{var t;return I(),_("label",{class:c([e(n).b("button"),e(n).is("active",e(u)===i.label),e(n).is("disabled",e(r)),e(n).is("focus",e(d)),e(n).bm("button",e(f))])},[P(g("input",{ref_key:"radioRef",ref:a,"onUpdate:modelValue":o[0]||(o[0]=b=>T(u)?u.value=b:null),class:c(e(n).be("button","original-radio")),value:i.label,type:"radio",name:i.name||((t=e(l))==null?void 0:t.name),disabled:e(r),onFocus:o[1]||(o[1]=b=>d.value=!0),onBlur:o[2]||(o[2]=b=>d.value=!1)},null,42,fe),[[C,e(u)]]),g("span",{class:c(e(n).be("button","inner")),style:X(e(u)===i.label?e(p):{}),onKeydown:o[3]||(o[3]=N(()=>{},["stop"]))},[V(i.$slots,"default",{},()=>[A(D(i.label),1)])],38)],2)}}});var q=G(be,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const ve=E({id:{type:String,default:void 0},size:z,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),ge=L,ye=["id","aria-label","aria-labelledby"],Ee=y({name:"ElRadioGroup"}),Re=y({...Ee,props:ve,emits:ge,setup(s,{emit:m}){const n=s,a=k("radio"),d=le(),f=B(),{formItem:r}=se(),{inputId:u,isLabeledByFormItem:l}=ne(n,{formItemContext:r}),p=o=>{m(S,o),F(()=>m("change",o))};Y(()=>{const o=f.value.querySelectorAll("[type=radio]"),t=o[0];!Array.from(o).some(b=>b.checked)&&t&&(t.tabIndex=0)});const i=v(()=>n.name||d.value);return Z(M,x({...ee(n),changeEvent:p,name:i})),oe(()=>n.modelValue,()=>{n.validateEvent&&(r==null||r.validate("change").catch(o=>te()))}),(o,t)=>(I(),_("div",{id:e(u),ref_key:"radioGroupRef",ref:f,class:c(e(a).b("group")),role:"radiogroup","aria-label":e(l)?void 0:o.label||"radio-group","aria-labelledby":e(l)?e(r).labelId:void 0},[V(o.$slots,"default")],10,ye))}});var H=G(Re,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const $e=ae(pe,{RadioButton:q,RadioGroup:H}),he=K(H),we=K(q);export{$e as E,we as a,he as b};