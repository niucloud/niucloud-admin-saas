import{d as I,c as R,R as j,w as H,an as L,e as p,f as c,j as U,u as f,F as S,g as s,y as e,v as O,x as l,z as T,H as q,r as B,A as x,B as D}from"./base-9962c822.js";/* empty css                *//* empty css                *//* empty css                  *//* empty css                        *//* empty css                 */import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-cdeb4e0c.js";/* empty css                       *//* empty css                     *//* empty css                  *//* empty css               *//* empty css                  *//* empty css                  */import{_ as K}from"./index.vue_vue_type_style_index_0_lang-f28cbb83.js";/* empty css                   */import{_ as M}from"./attachment-75502009.js";import{_ as Q}from"./index.vue_vue_type_style_index_0_lang-92d4efb2.js";import{_ as W}from"./index.vue_vue_type_script_setup_true_lang-780dd221.js";import{f as F}from"./storage-0874d153.js";import{E as X}from"./index-e2acd187.js";import{_ as Y}from"./index-500ed4b6.js";/* empty css                 */import"./el-form-item-4ed993c7.js";import{t as N}from"./index-5516aed6.js";import{E as Z}from"./index-19251c17.js";import{a as ee,E as te}from"./index-7c833df7.js";import{E as oe,b as le}from"./index-13fd1eb5.js";import{a as ie,E as ae}from"./index-22970d5d.js";import{E as re}from"./index-07248937.js";import{E as ne}from"./index-5fc48b46.js";import{E as se}from"./index-7ab57426.js";import{E as me}from"./index-189f302e.js";/* empty css                    */import"./index-2cabf788.js";import"./index-5c4817f4.js";import"./index-57446bef.js";import"./typescript-defaf979.js";import"./index-c98e204a.js";import"./index-4937003d.js";import"./error-78e43d3e.js";import"./index-df16e899.js";/* empty css                   *//* empty css                        *//* empty css                      *//* empty css                    *//* empty css                 */import"./el-tooltip-4ed993c7.js";/* empty css                 *//* empty css               *//* empty css                         *//* empty css                   */import"./index-e059001a.js";import"./index-ab38878f.js";import"./index-71b7d8f4.js";import"./focus-trap-d0fc8554.js";import"./dropdown-ccb689be.js";import"./sys-7988dced.js";import"./index-e026a545.js";import"./vue-router-d7e63612.js";import"./pinia-a9fc3924.js";import"./system-1108e5c1.js";import"./index-c4e33d8d.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./index-35c5a824.js";import"./index-91fda20f.js";import"./scroll-d85c8f38.js";import"./vnode-562dae50.js";import"./aria-adfa05c5.js";import"./validator-00f31ee7.js";import"./index-3427fe17.js";import"./index-2ee99ba1.js";import"./index-20ef35a7.js";import"./index-7332c216.js";import"./index-57e03d9e.js";import"./debounce-9674000c.js";import"./index-ec548bfb.js";import"./position-8e494ab3.js";import"./index-967f94ef.js";import"./index-65bc84a3.js";import"./event-9519ab40.js";import"./index-6b77b11a.js";import"./isEqual-240b5e0a.js";import"./_Uint8Array-c92ffa25.js";import"./flatten-940b9f2c.js";import"./index-26709bbd.js";import"./directive-f75d4a7d.js";/* empty css                */import"./index-1370ab44.js";import"./_initCloneObject-41dd9efb.js";import"./index-fb8b7863.js";import"./strings-66191554.js";import"./index-6edd46fb.js";import"./index-6d647c6f.js";const pe={class:"flex flex-wrap"},de={class:"w-full h-full relative flex items-center overflow-hidden rounded"},ue=["src"],ce={class:"absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation"},fe={class:"w-full h-full flex items-center justify-center flex-col"},_e={class:"w-full h-full relative flex items-center overflow-hidden rounded"},ve=["src"],ge={class:"absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation"},be={class:"w-full h-full flex items-center justify-center flex-col"},Ve=I({__name:"index",props:{modelValue:{type:String,default:""},width:{type:String,default:"200px"},height:{type:String,default:"100px"},limit:{type:Number,default:1}},emits:["update:modelValue"],setup(_,{emit:w}){const v=_,o=R({get(){return v.modelValue},set(n){w("update:modelValue",n)}}),a=j({data:[]});H(()=>o.value,()=>{a.data=[...o.value.split(",").filter(n=>n)],t()});const y=R(()=>({width:v.width,height:v.height})),h=n=>{v.limit==1?(a.data.splice(0,1),n&&a.data.push(n.url)):n.forEach(d=>{a.data.length<v.limit&&a.data.push(d.url)}),t()},g=(n=0)=>{a.data.splice(n,1),t()},t=()=>{o.value=L(a.data).toString()},m=j({visible:!1,src:""}),r=(n=0)=>{m.visible=!0,m.src=F(a.data[n])};return(n,d)=>{const u=W,k=Q,$=M,E=X;return p(),c("div",pe,[_.limit==1?(p(),c("div",{key:0,class:"rounded cursor-pointer relative bg-page video-wrap mr-[10px]",style:U(f(y))},[a.data.length?(p(),c(S,{key:0},[s("div",de,[s("video",{src:f(F)(a.data[0]),class:"w-full"},null,8,ue),s("div",ce,[e(u,{name:"iconfont-icon24gf-playCircle",color:"#fff",size:"25px",onClick:d[0]||(d[0]=b=>r())})])]),e(u,{name:"element-CircleCloseFilled",color:"#bbb",size:"18px",onClick:g,class:"absolute z-[2] top-[-9px] right-[-9px]"})],64)):(p(),O(k,{key:1,limit:_.limit,type:"video",onConfirm:h},{default:l(()=>[s("div",fe,[e(u,{name:"iconfont-icon24gf-playCircle",size:"25px",color:"var(--el-text-color-secondary)"})])]),_:1},8,["limit"]))],4)):(p(),c(S,{key:1},[(p(!0),c(S,null,T(a.data,(b,V)=>(p(),c("div",{class:"rounded cursor-pointer relative bg-page video-wrap mr-[10px]",style:U(f(y)),key:V},[s("div",_e,[s("video",{src:f(F)(b),class:"w-full"},null,8,ve),s("div",ge,[e(u,{name:"iconfont-icon24gf-playCircle",color:"#fff",size:"25px",onClick:z=>r(V)},null,8,["onClick"])])]),e(u,{name:"element-CircleCloseFilled",color:"#bbb",size:"18px",onClick:z=>g(V),class:"absolute z-[2] top-[-9px] right-[-9px]"},null,8,["onClick"])],4))),128)),a.data.length<_.limit?(p(),c("div",{key:0,class:"rounded cursor-pointer relative bg-page video-wrap mr-[10px]",style:U(f(y))},[e(k,{limit:_.limit,type:"video",onConfirm:h},{default:l(()=>[s("div",be,[e(u,{name:"iconfont-icon24gf-playCircle",size:"25px",color:"var(--el-text-color-secondary)"})])]),_:1},8,["limit"])],4)):q("",!0)],64)),e(E,{modelValue:m.visible,"onUpdate:modelValue":d[1]||(d[1]=b=>m.visible=b),width:"50%","align-center":"","destroy-on-close":!0,"custom-class":"video-preview"},{default:l(()=>[e($,{src:m.src,width:"100%"},null,8,["src"])]),_:1},8,["modelValue"])])}}});const xe={class:"main-container"},ye=s("div",{class:"form-tip"},"管理员账号登录时使用",-1),we={class:"input-width"},he={class:"input-width"},ke={class:"input-width"},Ee={class:"fixed-footer-wrap"},Ce={class:"fixed-footer"},co=I({__name:"form",setup(_){const w=B(!1),o=j({...{text:"",radio:1,textarea:"",img:"",video:"",file:"",select:"",date:"",editor:"",date_range:"",sort:0}}),a=B(),y=R(()=>({})),h=async g=>{w.value||!g||await g.validate(async t=>{t&&console.log(o)})};return(g,t)=>{const m=Z,r=ee,n=oe,d=le,u=Y,k=Ve,$=K,E=ie,b=ae,V=re,z=J,P=ne,C=se,A=te,G=me;return p(),c("div",xe,[e(G,{class:"box-card !border-none",shadow:"never"},{default:l(()=>[e(A,{model:o,"label-width":"90px",ref_key:"formRef",ref:a,rules:f(y),class:"page-form"},{default:l(()=>[e(r,{label:"文本",prop:"text"},{default:l(()=>[e(m,{modelValue:o.text,"onUpdate:modelValue":t[0]||(t[0]=i=>o.text=i),placeholder:"请输入用户名",clearable:"",class:"input-width"},null,8,["modelValue"]),ye]),_:1}),e(r,{label:"单选",prop:"radio"},{default:l(()=>[e(d,{modelValue:o.radio,"onUpdate:modelValue":t[1]||(t[1]=i=>o.radio=i)},{default:l(()=>[e(n,{label:1},{default:l(()=>[x("男")]),_:1}),e(n,{label:0},{default:l(()=>[x("女")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"图片上传",prop:"img"},{default:l(()=>[e(u,{modelValue:o.img,"onUpdate:modelValue":t[2]||(t[2]=i=>o.img=i),limit:1},null,8,["modelValue"])]),_:1}),e(r,{label:"视频上传",prop:"video"},{default:l(()=>[e(k,{modelValue:o.video,"onUpdate:modelValue":t[3]||(t[3]=i=>o.video=i),limit:1},null,8,["modelValue"])]),_:1}),e(r,{label:"文件上传",prop:"video"},{default:l(()=>[s("div",we,[e($,{modelValue:o.file,"onUpdate:modelValue":t[4]||(t[4]=i=>o.file=i)},null,8,["modelValue"])])]),_:1}),e(r,{label:"文本域",prop:"textarea"},{default:l(()=>[e(m,{modelValue:o.textarea,"onUpdate:modelValue":t[5]||(t[5]=i=>o.textarea=i),type:"textarea",rows:"5",class:"input-width"},null,8,["modelValue"])]),_:1}),e(r,{label:"下拉选择",prop:"select"},{default:l(()=>[e(b,{modelValue:o.select,"onUpdate:modelValue":t[6]||(t[6]=i=>o.select=i),placeholder:"请选择角色",class:"input-width"},{default:l(()=>[e(E,{label:"管理员",value:"shanghai"}),e(E,{label:"收银员",value:"beijing"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"日期选择",prop:"date"},{default:l(()=>[s("div",he,[e(V,{modelValue:o.date,"onUpdate:modelValue":t[7]||(t[7]=i=>o.date=i),type:"date",placeholder:"Pick a date"},null,8,["modelValue"])])]),_:1}),e(r,{label:"日期区间",prop:"date_range"},{default:l(()=>[s("div",ke,[e(V,{modelValue:o.date_range,"onUpdate:modelValue":t[8]||(t[8]=i=>o.date_range=i),type:"daterange",placeholder:"Pick a date"},null,8,["modelValue"])])]),_:1}),e(r,{label:"富文本",prop:"editor"},{default:l(()=>[e(z,{modelValue:o.editor,"onUpdate:modelValue":t[9]||(t[9]=i=>o.editor=i)},null,8,["modelValue"])]),_:1}),e(r,{label:"排序",prop:"editor"},{default:l(()=>[e(P,{modelValue:o.sort,"onUpdate:modelValue":t[10]||(t[10]=i=>o.sort=i),min:0},null,8,["modelValue"])]),_:1}),e(r,{label:""},{default:l(()=>[e(C,{type:"primary",loading:w.value,onClick:t[11]||(t[11]=i=>h(a.value))},{default:l(()=>[x("保存")]),_:1},8,["loading"]),e(C,null,{default:l(()=>[x("返回")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1}),s("div",Ee,[s("div",Ce,[e(C,{type:"primary"},{default:l(()=>[x(D(f(N)("save")),1)]),_:1}),e(C,null,{default:l(()=>[x(D(f(N)("cancel")),1)]),_:1})])])])}}});export{co as default};