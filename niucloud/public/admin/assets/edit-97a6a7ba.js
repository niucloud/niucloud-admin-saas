import{d as M,r as g,o as Z,Q as j,e as m,f as _,g as p,u as l,B as u,y as r,x as s,v as y,A as P,H as x,F as w,z as B}from"./base-d79f9f62.js";/* empty css                   *//* empty css                *//* empty css                *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                  */import{_ as O}from"./index-0b47ca0d.js";import"./el-form-item-4ed993c7.js";import{t as e}from"./index-9e0d1e6c.js";import{g as G,a as H,b as K,e as Q,c as J}from"./tools-6d0ea037.js";import{Z as W}from"./sys-3d5b784a.js";import{u as X,b as Y}from"./vue-router-fc35ac55.js";import{E as ee}from"./index-d1262e7a.js";import{a as te}from"./index-542aa78e.js";import{E as le}from"./index-f249e665.js";import{a as oe,E as ae}from"./index-6befecc6.js";import{E as re}from"./index-03649f16.js";import{a as pe,E as se}from"./index-f3bad52c.js";import{E as ie}from"./index-ba59a1dc.js";import{v as ne}from"./directive-13582d99.js";/* empty css                        */import"./index.vue_vue_type_style_index_0_lang-3748a185.js";/* empty css                   */import"./attachment-b5785570.js";import"./index-3fd412a3.js";import"./index-2048a34f.js";/* empty css                      *//* empty css                    *//* empty css                 */import"./el-tooltip-4ed993c7.js";/* empty css                 *//* empty css               *//* empty css                    *//* empty css                         *//* empty css                   */import"./index-48558072.js";import"./index-54a839cc.js";import"./index-34cd7f55.js";import"./index-71aec1df.js";import"./focus-trap-50fa5770.js";import"./dropdown-465e3407.js";import"./index.vue_vue_type_script_setup_true_lang-772fa486.js";/* empty css                */import"./storage-5316d819.js";import"./index-e3c69a8e.js";import"./index-2462875f.js";import"./error-78e43d3e.js";import"./index-6229e0fd.js";import"./index-d0ada8fb.js";import"./index-cf3a42e3.js";import"./scroll-aa5f3aa0.js";import"./vnode-772b0c47.js";import"./event-9519ab40.js";import"./index-bdfee32a.js";import"./index-50edbf04.js";import"./typescript-defaf979.js";import"./index-7d2f3ba9.js";import"./index-8774d4a8.js";import"./index-51305aa3.js";import"./debounce-6fd93949.js";import"./index-b6ca69fd.js";import"./position-4bcbb4c8.js";import"./index-f7cbfd82.js";import"./index-d4057e2a.js";import"./index-427f5a83.js";import"./isEqual-3f50b221.js";import"./_Uint8Array-bbbfd6ac.js";import"./flatten-0bbd547a.js";import"./index-014848fe.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-55149fa9.js";import"./index-6fcaf7b3.js";import"./system-d23898e7.js";import"./index-5dbb8f83.js";import"./aria-adfa05c5.js";import"./validator-8f1b170d.js";import"./_initCloneObject-a2c44136.js";import"./index-3a5faaeb.js";import"./strings-d73e3c52.js";import"./index-af085fbd.js";const de={class:"main-container mb-80"},ue={class:"detail-head !mb-[10px]"},me=p("span",{class:"iconfont iconxiangzuojiantou !text-xs"},null,-1),ce={class:"ml-[1px]"},ve=p("span",{class:"adorn"},"|",-1),ge={class:"right"},_e={class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},he={class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},fe={class:"text-[12px] text-[#a9a9a9] leading-normal"},ye={class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},xe={class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},be={class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},Ve={class:"text-[12px] text-[#a9a9a9] leading-normal"},ke={key:0,class:"fixed-footer-wrap"},Pe={class:"fixed-footer"},al=M({__name:"edit",setup(we){const v=X(),b=Y(),D=v.meta.title,o=g({title:"",icon:"",key:"",desc:"",author:"",version:"",cover:"",type:"",support_app:"",support_type:1}),E=g([]),c=g(!1),A=g(),F=(d,t,i)=>t!==""?/^[a-zA-Z][a-zA-Z0-9_]*$/.test(t)?i():i(new Error(e("keyPlaceholderErr"))):i(new Error(e("keyPlaceholder"))),T=(d,t,i)=>t!==""?/^([0-9]\d|[0-9])(\.([0-9]){1}){2}$/.test(t)?i():i(new Error(e("versionPlaceholderErr"))):i(new Error(e("versionPlaceholder"))),L=g({title:[{required:!0,message:e("titlePlaceholder"),trigger:"blur"}],icon:[{required:!0,message:e("iconPlaceholder"),trigger:"change"}],key:[{required:!0,validator:F,trigger:"blur"}],author:[{required:!0,message:e("authorPlaceholder"),trigger:"blur"}],version:[{required:!0,validator:T,trigger:"blur"}],cover:[{required:!0,message:e("coverPlaceholder"),trigger:"change"}],type:[{required:!0,message:e("typePlaceholder"),trigger:"change"}],support_app:[{required:!0,message:e("typePlaceholder"),trigger:"change"}]});Z(async()=>{let d=await G();E.value=d.data,v.query.key&&N(v.query.key)});const q=()=>{o.value.support_app=""},N=d=>{c.value=!0,H(d).then(t=>{o.value=Object.assign(o.value,t.data),c.value=!1}).catch(()=>{c.value=!1})},C=g([]);(async()=>{let{data:d}=await W();C.value=d})();const $=d=>{K(d).then(t=>{ee.alert(t.data?e("warningText"):e("successText"),e("warning"),{confirmButtonText:e("confirm"),callback:i=>{console.log(i)}})})},S=async d=>{await d.validate(async t=>{if(t){let i=v.query.key?Q:J;c.value=!0,i(o.value.key,o.value).then(n=>{c.value=!1,te({message:e("onSaveSuccessText"),type:"success"}),setTimeout(()=>{window.addonActiveName="pluginList",b.push({path:"/tools/addon"})},650)}).catch(()=>{c.value=!1})}})};return(d,t)=>{const i=le,n=oe,U=O,V=re,h=pe,k=se,z=ae,I=ie,R=ne;return j((m(),_("div",de,[p("div",ue,[p("div",{class:"left",onClick:t[0]||(t[0]=a=>l(b).push({path:"/tools/addon"}))},[me,p("span",ce,u(l(e)("returnToPreviousPage")),1)]),ve,p("span",ge,u(l(D)),1)]),r(I,{class:"box-card !border-none",shadow:"never"},{default:s(()=>[r(z,{model:o.value,"label-width":"90px",ref_key:"formRef",ref:A,rules:L.value,class:"page-form"},{default:s(()=>[r(n,{label:l(e)("title"),prop:"title"},{default:s(()=>[r(i,{modelValue:o.value.title,"onUpdate:modelValue":t[1]||(t[1]=a=>o.value.title=a),clearable:"",placeholder:l(e)("titlePlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(n,{label:l(e)("icon"),prop:"icon"},{default:s(()=>[p("div",null,[r(U,{modelValue:o.value.icon,"onUpdate:modelValue":t[2]||(t[2]=a=>o.value.icon=a)},null,8,["modelValue"]),p("p",_e,u(l(e)("iconPlaceholder1")),1)])]),_:1},8,["label"]),r(n,{label:l(e)("key"),prop:"key"},{default:s(()=>[p("div",null,[r(i,{modelValue:o.value.key,"onUpdate:modelValue":t[3]||(t[3]=a=>o.value.key=a),clearable:"",disabled:l(v).query.key,placeholder:l(e)("keyPlaceholder"),class:"input-width mr-[15px]"},null,8,["modelValue","disabled","placeholder"]),l(v).query.key?x("",!0):(m(),y(V,{key:0,type:"primary",disabled:o.value.key=="",onClick:t[4]||(t[4]=a=>$(o.value.key))},{default:s(()=>[P("官方市场标识检测")]),_:1},8,["disabled"])),p("p",he,u(l(e)("keyPlaceholder1")),1),p("p",fe,u(l(e)("keyPlaceholder2")),1)])]),_:1},8,["label"]),r(n,{label:l(e)("desc"),prop:"desc"},{default:s(()=>[r(i,{type:"textarea",modelValue:o.value.desc,"onUpdate:modelValue":t[5]||(t[5]=a=>o.value.desc=a),clearable:"",placeholder:l(e)("descPlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(n,{label:l(e)("author"),prop:"author"},{default:s(()=>[r(i,{modelValue:o.value.author,"onUpdate:modelValue":t[6]||(t[6]=a=>o.value.author=a),clearable:"",placeholder:l(e)("authorPlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(n,{label:l(e)("version"),prop:"version"},{default:s(()=>[p("div",null,[r(i,{modelValue:o.value.version,"onUpdate:modelValue":t[7]||(t[7]=a=>o.value.version=a),clearable:"",placeholder:l(e)("versionPlaceholder"),class:"input-width",onkeyup:"this.value = this.value.replace(/[^\\d\\.]/g,'');"},null,8,["modelValue","placeholder"]),p("p",ye,u(l(e)("versionPlaceholder1")),1)])]),_:1},8,["label"]),r(n,{label:l(e)("cover"),prop:"cover"},{default:s(()=>[p("div",null,[r(U,{modelValue:o.value.cover,"onUpdate:modelValue":t[8]||(t[8]=a=>o.value.cover=a)},null,8,["modelValue"]),p("p",xe,u(l(e)("coverPlaceholder1")),1)])]),_:1},8,["label"]),r(n,{label:l(e)("type"),prop:"type"},{default:s(()=>[p("div",null,[r(k,{modelValue:o.value.type,"onUpdate:modelValue":t[9]||(t[9]=a=>o.value.type=a),placeholder:l(e)("typePlaceholder"),class:"input-width",clearable:"",onChange:q},{default:s(()=>[(m(!0),_(w,null,B(E.value,(a,f)=>(m(),y(h,{key:f,label:a,value:f},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"]),p("p",be,u(l(e)("typePlaceholder1")),1),p("p",Ve,u(l(e)("typePlaceholder2")),1)])]),_:1},8,["label"]),o.value.type==="addon"?(m(),_(w,{key:0},[r(n,{label:l(e)("supportType")},{default:s(()=>[p("div",null,[r(k,{modelValue:o.value.support_type,"onUpdate:modelValue":t[10]||(t[10]=a=>o.value.support_type=a),class:"input-width",onChange:q},{default:s(()=>[r(h,{label:"通用插件",value:1}),r(h,{label:"支持应用",value:2})]),_:1},8,["modelValue"])])]),_:1},8,["label"]),o.value.support_type!=1?(m(),y(n,{key:0,label:l(e)("supportApp"),prop:"support_app"},{default:s(()=>[r(k,{modelValue:o.value.support_app,"onUpdate:modelValue":t[11]||(t[11]=a=>o.value.support_app=a),placeholder:l(e)("supportAppPlaceholder"),class:"input-width"},{default:s(()=>[(m(!0),_(w,null,B(C.value,(a,f)=>(m(),y(h,{label:a.title,value:a.key,key:f},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"])):x("",!0)],64)):x("",!0)]),_:1},8,["model","rules"])]),_:1}),c.value?x("",!0):(m(),_("div",ke,[p("div",Pe,[r(V,{type:"primary",onClick:t[12]||(t[12]=a=>S(A.value))},{default:s(()=>[P(u(l(e)("GeneratePlugins")),1)]),_:1}),r(V,{onClick:t[13]||(t[13]=a=>l(b).push({path:"/tools/addon"}))},{default:s(()=>[P(u(l(e)("cancel")),1)]),_:1})])]))])),[[R,c.value]])}}});export{al as default};