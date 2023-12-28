import{U as e,V as t,W as r,p as n,q as i,h as s,i as a,w as o,j as l,n as u,l as f,S as d,J as c,K as p,M as m,t as y}from"./index-277744e7.js";import{_ as h}from"./u-icon.1eb51b0d.js";import{_ as g}from"./u-line.318ce210.js";import{_ as b}from"./_plugin-vue_export-helper.1b428a4d.js";const _=b({name:"u-form-item",mixins:[t,r,{props:{label:{type:String,default:e.formItem.label},prop:{type:String,default:e.formItem.prop},borderBottom:{type:[String,Boolean],default:e.formItem.borderBottom},labelWidth:{type:[String,Number],default:e.formItem.labelWidth},rightIcon:{type:String,default:e.formItem.rightIcon},leftIcon:{type:String,default:e.formItem.leftIcon},required:{type:Boolean,default:e.formItem.required},leftIconStyle:{type:[String,Object],default:e.formItem.leftIconStyle}}}],data:()=>({message:"",parentData:{labelPosition:"left",labelAlign:"left",labelStyle:{},labelWidth:45,errorType:"message"}}),computed:{propsLine:()=>uni.$u.props.line},mounted(){this.init()},methods:{init(){this.updateParentData(),this.parent||uni.$u.error("u-form-item需要结合u-form组件使用")},updateParentData(){this.getParentData("u-form")},clearValidate(){this.message=null},resetField(){const e=uni.$u.getProperty(this.parent.originalModel,this.prop);uni.$u.setProperty(this.parent.model,this.prop,e),this.message=null},clickHandler(){this.$emit("click")}}},[["render",function(e,t,r,b,_,q){const v=m,w=n(i("u-icon"),h),x=y,P=n(i("u-line"),g);return s(),a(x,{class:"u-form-item"},{default:o((()=>[l(x,{class:"u-form-item__body",onClick:q.clickHandler,style:u([e.$u.addStyle(e.customStyle),{flexDirection:"left"===_.parentData.labelPosition?"row":"column"}])},{default:o((()=>[f(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),d(e.$slots,"label",{},(()=>[f(" {{required}} "),e.required||e.leftIcon||e.label?(s(),a(x,{key:0,class:"u-form-item__body__left",style:u({width:e.$u.addUnit(e.labelWidth||_.parentData.labelWidth),marginBottom:"left"===_.parentData.labelPosition?0:"5px"})},{default:o((()=>[f(" 为了块对齐 "),l(x,{class:"u-form-item__body__left__content"},{default:o((()=>[f(" nvue不支持伪元素before "),e.required?(s(),a(v,{key:0,class:"u-form-item__body__left__content__required"},{default:o((()=>[c("*")])),_:1})):f("v-if",!0),e.leftIcon?(s(),a(x,{key:1,class:"u-form-item__body__left__content__icon"},{default:o((()=>[l(w,{name:e.leftIcon,"custom-style":e.leftIconStyle},null,8,["name","custom-style"])])),_:1})):f("v-if",!0),l(v,{class:"u-form-item__body__left__content__label",style:u([_.parentData.labelStyle,{justifyContent:"left"===_.parentData.labelAlign?"flex-start":"center"===_.parentData.labelAlign?"center":"flex-end"}])},{default:o((()=>[c(p(e.label),1)])),_:1},8,["style"])])),_:1})])),_:1},8,["style"])):f("v-if",!0)]),!0),l(x,{class:"u-form-item__body__right"},{default:o((()=>[l(x,{class:"u-form-item__body__right__content"},{default:o((()=>[l(x,{class:"u-form-item__body__right__content__slot"},{default:o((()=>[d(e.$slots,"default",{},void 0,!0)])),_:3}),e.$slots.right?(s(),a(x,{key:0,class:"item__body__right__content__icon"},{default:o((()=>[d(e.$slots,"right",{},void 0,!0)])),_:3})):f("v-if",!0)])),_:3})])),_:3})])),_:3},8,["onClick","style"]),d(e.$slots,"error",{},(()=>[_.message&&"message"===_.parentData.errorType?(s(),a(v,{key:0,class:"u-form-item__body__right__message",style:u({marginLeft:e.$u.addUnit("top"===_.parentData.labelPosition?0:e.labelWidth||_.parentData.labelWidth)})},{default:o((()=>[c(p(_.message),1)])),_:1},8,["style"])):f("v-if",!0)]),!0),e.borderBottom?(s(),a(P,{key:0,color:_.message&&"border-bottom"===_.parentData.errorType?e.$u.color.error:q.propsLine.color,customStyle:`margin-top: ${_.message&&"message"===_.parentData.errorType?"5px":0}`},null,8,["color","customStyle"])):f("v-if",!0)])),_:3})}],["__scopeId","data-v-a180cd81"]]),q={props:{model:{type:Object,default:e.form.model},rules:{type:[Object,Function,Array],default:e.form.rules},errorType:{type:String,default:e.form.errorType},borderBottom:{type:Boolean,default:e.form.borderBottom},labelPosition:{type:String,default:e.form.labelPosition},labelWidth:{type:[String,Number],default:e.form.labelWidth},labelAlign:{type:String,default:e.form.labelAlign},labelStyle:{type:Object,default:e.form.labelStyle}}},v=/%[sdj%]/g;let w=function(){};function x(e){if(!e||!e.length)return null;const t={};return e.forEach((e=>{const{field:r}=e;t[r]=t[r]||[],t[r].push(e)})),t}function P(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=1;const i=t[0],s=t.length;if("function"==typeof i)return i.apply(null,t.slice(1));if("string"==typeof i){let e=String(i).replace(v,(e=>{if("%%"===e)return"%";if(n>=s)return e;switch(e){case"%s":return String(t[n++]);case"%d":return Number(t[n++]);case"%j":try{return JSON.stringify(t[n++])}catch(r){return"[Circular]"}break;default:return e}}));for(let r=t[n];n<s;r=t[++n])e+=` ${r}`;return e}return i}function O(e,t){return null==e||(!("array"!==t||!Array.isArray(e)||e.length)||!(!function(e){return"string"===e||"url"===e||"hex"===e||"email"===e||"pattern"===e}(t)||"string"!=typeof e||e))}function $(e,t,r){let n=0;const i=e.length;!function s(a){if(a&&a.length)return void r(a);const o=n;n+=1,o<i?t(e[o],s):r([])}([])}function j(e,t,r,n){if(t.first){const t=new Promise(((t,i)=>{const s=function(e){const t=[];return Object.keys(e).forEach((r=>{t.push.apply(t,e[r])})),t}(e);$(s,r,(function(e){return n(e),e.length?i({errors:e,fields:x(e)}):t()}))}));return t.catch((e=>e)),t}let i=t.firstFields||[];!0===i&&(i=Object.keys(e));const s=Object.keys(e),a=s.length;let o=0;const l=[],u=new Promise(((t,u)=>{const f=function(e){if(l.push.apply(l,e),o++,o===a)return n(l),l.length?u({errors:l,fields:x(l)}):t()};s.length||(n(l),t()),s.forEach((t=>{const n=e[t];-1!==i.indexOf(t)?$(n,r,f):function(e,t,r){const n=[];let i=0;const s=e.length;function a(e){n.push.apply(n,e),i++,i===s&&r(n)}e.forEach((e=>{t(e,a)}))}(n,r,f)}))}));return u.catch((e=>e)),u}function F(e){return function(t){return t&&t.message?(t.field=t.field||e.fullField,t):{message:"function"==typeof t?t():t,field:t.field||e.fullField}}}function A(e,t){if(t)for(const r in t)if(t.hasOwnProperty(r)){const n=t[r];"object"==typeof n&&"object"==typeof e[r]?e[r]={...e[r],...n}:e[r]=n}return e}function S(e,t,r,n,i,s){!e.required||r.hasOwnProperty(e.field)&&!O(t,s||e.type)||n.push(P(i.messages.required,e.fullField))}"undefined"!=typeof process&&process.env;const k={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,url:new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i"),hex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/i};var D={integer:function(e){return/^(-)?\d+$/.test(e)},float:function(e){return/^(-)?\d+(\.\d+)?$/.test(e)},array:function(e){return Array.isArray(e)},regexp:function(e){if(e instanceof RegExp)return!0;try{return!!new RegExp(e)}catch(t){return!1}},date:function(e){return"function"==typeof e.getTime&&"function"==typeof e.getMonth&&"function"==typeof e.getYear},number:function(e){return!isNaN(e)&&"number"==typeof+e},object:function(e){return"object"==typeof e&&!D.array(e)},method:function(e){return"function"==typeof e},email:function(e){return"string"==typeof e&&!!e.match(k.email)&&e.length<255},url:function(e){return"string"==typeof e&&!!e.match(k.url)},hex:function(e){return"string"==typeof e&&!!e.match(k.hex)}};const I="enum";const E={required:S,whitespace:function(e,t,r,n,i){(/^\s+$/.test(t)||""===t)&&n.push(P(i.messages.whitespace,e.fullField))},type:function(e,t,r,n,i){if(e.required&&void 0===t)return void S(e,t,r,n,i);const s=e.type;["integer","float","array","regexp","object","method","email","number","date","url","hex"].indexOf(s)>-1?D[s](t)||n.push(P(i.messages.types[s],e.fullField,e.type)):s&&typeof t!==e.type&&n.push(P(i.messages.types[s],e.fullField,e.type))},range:function(e,t,r,n,i){const s="number"==typeof e.len,a="number"==typeof e.min,o="number"==typeof e.max,l=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g;let u=t,f=null;const d="number"==typeof t,c="string"==typeof t,p=Array.isArray(t);if(d?f="number":c?f="string":p&&(f="array"),!f)return!1;p&&(u=t.length),c&&(u=t.replace(l,"_").length),s?u!==e.len&&n.push(P(i.messages[f].len,e.fullField,e.len)):a&&!o&&u<e.min?n.push(P(i.messages[f].min,e.fullField,e.min)):o&&!a&&u>e.max?n.push(P(i.messages[f].max,e.fullField,e.max)):a&&o&&(u<e.min||u>e.max)&&n.push(P(i.messages[f].range,e.fullField,e.min,e.max))},enum:function(e,t,r,n,i){e[I]=Array.isArray(e[I])?e[I]:[],-1===e[I].indexOf(t)&&n.push(P(i.messages[I],e.fullField,e[I].join(", ")))},pattern:function(e,t,r,n,i){if(e.pattern)if(e.pattern instanceof RegExp)e.pattern.lastIndex=0,e.pattern.test(t)||n.push(P(i.messages.pattern.mismatch,e.fullField,t,e.pattern));else if("string"==typeof e.pattern){new RegExp(e.pattern).test(t)||n.push(P(i.messages.pattern.mismatch,e.fullField,t,e.pattern))}}};function T(e,t,r,n,i){const s=e.type,a=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t,s)&&!e.required)return r();E.required(e,t,n,a,i,s),O(t,s)||E.type(e,t,n,a,i)}r(a)}const R={string:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t,"string")&&!e.required)return r();E.required(e,t,n,s,i,"string"),O(t,"string")||(E.type(e,t,n,s,i),E.range(e,t,n,s,i),E.pattern(e,t,n,s,i),!0===e.whitespace&&E.whitespace(e,t,n,s,i))}r(s)},method:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&E.type(e,t,n,s,i)}r(s)},number:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(""===t&&(t=void 0),O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&(E.type(e,t,n,s,i),E.range(e,t,n,s,i))}r(s)},boolean:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&E.type(e,t,n,s,i)}r(s)},regexp:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),O(t)||E.type(e,t,n,s,i)}r(s)},integer:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&(E.type(e,t,n,s,i),E.range(e,t,n,s,i))}r(s)},float:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&(E.type(e,t,n,s,i),E.range(e,t,n,s,i))}r(s)},array:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t,"array")&&!e.required)return r();E.required(e,t,n,s,i,"array"),O(t,"array")||(E.type(e,t,n,s,i),E.range(e,t,n,s,i))}r(s)},object:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&E.type(e,t,n,s,i)}r(s)},enum:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i),void 0!==t&&E.enum(e,t,n,s,i)}r(s)},pattern:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t,"string")&&!e.required)return r();E.required(e,t,n,s,i),O(t,"string")||E.pattern(e,t,n,s,i)}r(s)},date:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();if(E.required(e,t,n,s,i),!O(t)){let r;r="number"==typeof t?new Date(t):t,E.type(e,r,n,s,i),r&&E.range(e,r.getTime(),n,s,i)}}r(s)},url:T,hex:T,email:T,required:function(e,t,r,n,i){const s=[],a=Array.isArray(t)?"array":typeof t;E.required(e,t,n,s,i,a),r(s)},any:function(e,t,r,n,i){const s=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(O(t)&&!e.required)return r();E.required(e,t,n,s,i)}r(s)}};function W(){return{default:"Validation error on field %s",required:"%s is required",enum:"%s must be one of %s",whitespace:"%s cannot be empty",date:{format:"%s date %s is invalid for format %s",parse:"%s date could not be parsed, %s is invalid ",invalid:"%s date %s is invalid"},types:{string:"%s is not a %s",method:"%s is not a %s (function)",array:"%s is not an %s",object:"%s is not an %s",number:"%s is not a %s",date:"%s is not a %s",boolean:"%s is not a %s",integer:"%s is not an %s",float:"%s is not a %s",regexp:"%s is not a valid %s",email:"%s is not a valid %s",url:"%s is not a valid %s",hex:"%s is not a valid %s"},string:{len:"%s must be exactly %s characters",min:"%s must be at least %s characters",max:"%s cannot be longer than %s characters",range:"%s must be between %s and %s characters"},number:{len:"%s must equal %s",min:"%s cannot be less than %s",max:"%s cannot be greater than %s",range:"%s must be between %s and %s"},array:{len:"%s must be exactly %s in length",min:"%s cannot be less than %s in length",max:"%s cannot be greater than %s in length",range:"%s must be between %s and %s in length"},pattern:{mismatch:"%s value %s does not match pattern %s"},clone:function(){const e=JSON.parse(JSON.stringify(this));return e.clone=this.clone,e}}}const B=W();function M(e){this.rules=null,this._messages=B,this.define(e)}M.prototype={messages:function(e){return e&&(this._messages=A(W(),e)),this._messages},define:function(e){if(!e)throw new Error("Cannot configure a schema with no rules");if("object"!=typeof e||Array.isArray(e))throw new Error("Rules must be an object");let t,r;for(t in this.rules={},e)e.hasOwnProperty(t)&&(r=e[t],this.rules[t]=Array.isArray(r)?r:[r])},validate:function(e,t,r){const n=this;void 0===t&&(t={}),void 0===r&&(r=function(){});let i,s,a=e,o=t,l=r;if("function"==typeof o&&(l=o,o={}),!this.rules||0===Object.keys(this.rules).length)return l&&l(),Promise.resolve();if(o.messages){let e=this.messages();e===B&&(e=W()),A(e,o.messages),o.messages=e}else o.messages=this.messages();const u={};(o.keys||Object.keys(this.rules)).forEach((t=>{i=n.rules[t],s=a[t],i.forEach((r=>{let i=r;"function"==typeof i.transform&&(a===e&&(a={...a}),s=a[t]=i.transform(s)),i="function"==typeof i?{validator:i}:{...i},i.validator=n.getValidationMethod(i),i.field=t,i.fullField=i.fullField||t,i.type=n.getType(i),i.validator&&(u[t]=u[t]||[],u[t].push({rule:i,value:s,source:a,field:t}))}))}));const f={};return j(u,o,((e,t)=>{const{rule:r}=e;let n,i=!("object"!==r.type&&"array"!==r.type||"object"!=typeof r.fields&&"object"!=typeof r.defaultField);function s(e,t){return{...t,fullField:`${r.fullField}.${e}`}}function a(n){void 0===n&&(n=[]);let a=n;if(Array.isArray(a)||(a=[a]),!o.suppressWarning&&a.length&&M.warning("async-validator:",a),a.length&&r.message&&(a=[].concat(r.message)),a=a.map(F(r)),o.first&&a.length)return f[r.field]=1,t(a);if(i){if(r.required&&!e.value)return a=r.message?[].concat(r.message).map(F(r)):o.error?[o.error(r,P(o.messages.required,r.field))]:[],t(a);let n={};if(r.defaultField)for(const t in e.value)e.value.hasOwnProperty(t)&&(n[t]=r.defaultField);n={...n,...e.rule.fields};for(const e in n)if(n.hasOwnProperty(e)){const t=Array.isArray(n[e])?n[e]:[n[e]];n[e]=t.map(s.bind(null,e))}const i=new M(n);i.messages(o.messages),e.rule.options&&(e.rule.options.messages=o.messages,e.rule.options.error=o.error),i.validate(e.value,e.rule.options||o,(e=>{const r=[];a&&a.length&&r.push.apply(r,a),e&&e.length&&r.push.apply(r,e),t(r.length?r:null)}))}else t(a)}i=i&&(r.required||!r.required&&e.value),r.field=e.field,r.asyncValidator?n=r.asyncValidator(r,e.value,a,e.source,o):r.validator&&(n=r.validator(r,e.value,a,e.source,o),!0===n?a():!1===n?a(r.message||`${r.field} fails`):n instanceof Array?a(n):n instanceof Error&&a(n.message)),n&&n.then&&n.then((()=>a()),(e=>a(e)))}),(e=>{!function(e){let t,r=[],n={};function i(e){if(Array.isArray(e)){let t;r=(t=r).concat.apply(t,e)}else r.push(e)}for(t=0;t<e.length;t++)i(e[t]);r.length?n=x(r):(r=null,n=null),l(r,n)}(e)}))},getType:function(e){if(void 0===e.type&&e.pattern instanceof RegExp&&(e.type="pattern"),"function"!=typeof e.validator&&e.type&&!R.hasOwnProperty(e.type))throw new Error(P("Unknown rule type %s",e.type));return e.type||"string"},getValidationMethod:function(e){if("function"==typeof e.validator)return e.validator;const t=Object.keys(e),r=t.indexOf("message");return-1!==r&&t.splice(r,1),1===t.length&&"required"===t[0]?R.required:R[this.getType(e)]||!1}},M.register=function(e,t){if("function"!=typeof t)throw new Error("Cannot register a validator by type, validator is not a function");R[e]=t},M.warning=w,M.messages=B,M.warning=function(){};const C=b({name:"u-form",mixins:[t,r,q],provide(){return{uForm:this}},data:()=>({formRules:{},validator:{},originalModel:null}),watch:{rules:{immediate:!0,handler(e){this.setRules(e)}},propsChange(e){var t;(null==(t=this.children)?void 0:t.length)&&this.children.map((e=>{"function"==typeof e.updateParentData&&e.updateParentData()}))},model:{immediate:!0,handler(e){this.originalModel||(this.originalModel=uni.$u.deepClone(e))}}},computed:{propsChange(){return[this.errorType,this.borderBottom,this.labelPosition,this.labelWidth,this.labelAlign,this.labelStyle]}},created(){this.children=[]},methods:{setRules(e){0!==Object.keys(e).length&&(this.formRules=e,this.validator=new M(e))},resetFields(){this.resetModel()},resetModel(e){this.children.map((e=>{const t=null==e?void 0:e.prop,r=uni.$u.getProperty(this.originalModel,t);uni.$u.setProperty(this.model,t,r)}))},clearValidate(e){e=[].concat(e),this.children.map((t=>{(void 0===e[0]||e.includes(t.prop))&&(t.message=null)}))},async validateField(e,t,r=null){this.$nextTick((()=>{const n=[];e=[].concat(e),this.children.map((t=>{const i=[];if(e.includes(t.prop)){const e=uni.$u.getProperty(this.model,t.prop),s=t.prop.split("."),a=s[s.length-1],o=this.formRules[t.prop];if(!o)return;const l=[].concat(o);for(let u=0;u<l.length;u++){const s=l[u],o=[].concat(null==s?void 0:s.trigger);if(r&&!o.includes(r))continue;new M({[a]:s}).validate({[a]:e},((e,r)=>{var s;uni.$u.test.array(e)&&(n.push(...e),i.push(...e)),t.message=(null==(s=i[0])?void 0:s.message)?i[0].message:null}))}}})),"function"==typeof t&&t(n)}))},validate(e){return new Promise(((e,t)=>{this.$nextTick((()=>{const r=this.children.map((e=>e.prop));this.validateField(r,(r=>{r.length?("toast"===this.errorType&&uni.$u.toast(r[0].message),t(r)):e(!0)}))}))}))}}},[["render",function(e,t,r,n,i,l){const u=y;return s(),a(u,{class:"u-form"},{default:o((()=>[d(e.$slots,"default")])),_:3})}]]);export{_,C as a};