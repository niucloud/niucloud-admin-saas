import{d as defineComponent,r as ref,w as watch,E as nextTick,Q as withDirectives,e as openBlock,v as createBlock,x as withCtx,f as createElementBlock,g as createBaseVNode,B as toDisplayString,u as unref,y as createVNode,A as createTextVNode,H as createCommentVNode,F as Fragment,z as renderList}from"./base-9962c822.js";/* empty css                   *//* empty css                *//* empty css               *//* empty css                  *//* empty css                  */import{t}from"./index-5516aed6.js";import{S as getPayConfigList,T as setPatConfig}from"./sys-7988dced.js";import{_ as _sfc_main$1}from"./pay-wechatpay.vue_vue_type_script_setup_true_lang-45a11ae4.js";import{_ as _sfc_main$2}from"./pay-alipay.vue_vue_type_script_setup_true_lang-831bf5f1.js";import{_ as _sfc_main$3}from"./pay-offlinepay.vue_vue_type_script_setup_true_lang-c9c54e26.js";import{f as img}from"./storage-0874d153.js";import{S as Sortable}from"./sortable.esm-be94e56d.js";import{u as useRoute}from"./vue-router-d7e63612.js";import{a as ElMessage}from"./index-2cabf788.js";import{E as ElButton}from"./index-7ab57426.js";import{E as ElSwitch}from"./index-83924071.js";import{E as ElTag}from"./index-fb8b7863.js";import{E as ElCard}from"./index-189f302e.js";import{v as vLoading}from"./directive-f75d4a7d.js";import{_ as _export_sfc}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-a9fc3924.js";import"./index-e026a545.js";import"./system-1108e5c1.js";import"./index-5c4817f4.js";import"./index-57446bef.js";import"./index-c4e33d8d.js";/* empty css                   *//* empty css                */import"./index.vue_vue_type_style_index_0_lang-f28cbb83.js";/* empty css                    *//* empty css                 */import"./index-19251c17.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-ec548bfb.js";import"./index-6b77b11a.js";import"./index-71b7d8f4.js";import"./error-78e43d3e.js";import"./index-4937003d.js";import"./index-df16e899.js";import"./el-form-item-4ed993c7.js";import"./index-7c833df7.js";import"./_Uint8Array-c92ffa25.js";import"./_initCloneObject-41dd9efb.js";import"./index-e2acd187.js";import"./index-91fda20f.js";import"./scroll-d85c8f38.js";import"./vnode-562dae50.js";import"./focus-trap-d0fc8554.js";import"./index-c98e204a.js";import"./index-1370ab44.js";import"./validator-00f31ee7.js";const _hoisted_1={key:0,class:"flex justify-between items-center"},_hoisted_2={class:"text-[20px]"},_hoisted_3={class:"flex mb-3"},_hoisted_4={class:"text-base"},_hoisted_5={class:"pay-table"},_hoisted_6={class:"flex items-center pay-table-head table-bg table-item-pd table-item-border justify-between table-bg"},_hoisted_7={class:"text-base text-[#999] w-[150px]"},_hoisted_8={class:"text-base text-[#999] w-[110px] text-center"},_hoisted_9={key:0,class:"text-base text-[#999] w-[80px] text-center"},_hoisted_10=["data-key"],_hoisted_11=["id"],_hoisted_12={class:"table-item-flex w-[150px]"},_hoisted_13={key:0,class:"iconfont icontuodong mr-2 handle cursor-pointer"},_hoisted_14={class:"flex items-center select-none"},_hoisted_15={class:"mr-[15px] w-[30px] h-[30px]"},_hoisted_16=["src"],_hoisted_17={class:"text-base text-[#666]"},_hoisted_18={class:"table-item-flex w-[110px] justify-center select-none"},_hoisted_19={key:1},_hoisted_20={key:0,class:"table-item-flex w-[80px] justify-center select-none"},_hoisted_21=["onClick"],_hoisted_22={key:1},_hoisted_23={key:1,class:"fixed-footer-wrap"},_hoisted_24={class:"fixed-footer"},_sfc_main=defineComponent({__name:"pay",setup(__props){const route=useRoute(),pageName=route.meta.title,wechatpayDialog=ref(null),alipayDialog=ref(null),offlinepayDialog=ref(null),payLoading=ref(!0),isEdit=ref(!1),setConfigBtn=ref(),payConfigData=ref([]),checkPayConfigList=()=>{getPayConfigList().then(e=>{const o=e.data;for(const a in o){const s=o[a].pay_type,n=[];let l="";s.forEach((i,c)=>{i.redio_key=o[a].key+"_"+i.key,i.defauit_key="",i.is_default==1&&(l=i.redio_key),i.status=Boolean(i.status),n.push(i)}),o[o[a].key].default_pay_type=l,o[o[a].key].pay_type=n}payConfigData.value=o,payLoading.value=!1,nextTick(()=>{fieldBoxRefs.value.forEach((a,s)=>{sortableFn(a)})})}).catch(()=>{})};checkPayConfigList();const setConfigInfo=e=>{console.log(e),payConfigData.value[e.channel].pay_type.forEach(o=>{o.key==e.type&&(o.config=e.config)}),console.log(payConfigData.value)},configPayFn=data=>{eval(data.key+"Dialog.value.setFormData(data)"),eval(data.key+"Dialog.value.showDialog = true;")},enablePaymentMode=e=>{var o,a;if(e.key=="wechatpay"&&!((o=e==null?void 0:e.config)!=null&&o.mch_secret_cert)||e.key=="alipay"&&!((a=e==null?void 0:e.config)!=null&&a.alipay_root_cert_path))return e.status=!1,ElMessage(t("configurePaymentMethod")),!1},fieldBoxRefs=ref([]);watch(isEdit,(e,o)=>{e&&nextTick(()=>{fieldBoxRefs.value.forEach((a,s)=>{sortableFn(a)})})});const sortableFn=(e,o)=>{Sortable.create(e,{group:{put:!1},handle:".handle",animation:200,disabled:!1,onEnd:a=>{const s=a.target.getAttribute("data-key"),n=payConfigData.value[s].pay_type;n.splice(a.newIndex,0,...n.splice(a.oldIndex,1))}})},saveFn=()=>{payLoading.value=!0;const e=JSON.parse(JSON.stringify(payConfigData.value));Object.values(e).forEach((o,a)=>{o.pay_type.forEach((s,n)=>{s.sort=n,s.status=Number(s.status)})}),setPatConfig({config:e}).then(o=>{checkPayConfigList(),isEdit.value=!1,payLoading.value=!1})},cancelFn=()=>{location.reload()};return(e,o)=>{const a=ElButton,s=ElSwitch,n=ElTag,l=ElCard,i=vLoading;return withDirectives((openBlock(),createBlock(l,{class:"box-card !border-none",shadow:"never"},{default:withCtx(()=>[payLoading.value?createCommentVNode("",!0):(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("span",_hoisted_2,toDisplayString(unref(pageName)),1),createVNode(a,{type:"primary",onClick:o[0]||(o[0]=c=>isEdit.value=!0),ref_key:"setConfigBtn",ref:setConfigBtn},{default:withCtx(()=>[createTextVNode(toDisplayString(unref(t)("setConfig")),1)]),_:1},512)])),(openBlock(!0),createElementBlock(Fragment,null,renderList(payConfigData.value,(c,p)=>(openBlock(),createBlock(l,{class:"box-card box-pay-card !border-none mt-[20px]",shadow:"never",key:p},{default:withCtx(()=>[createBaseVNode("div",_hoisted_3,[createBaseVNode("span",_hoisted_4,toDisplayString(c.name),1)]),createBaseVNode("div",_hoisted_5,[createBaseVNode("div",_hoisted_6,[createBaseVNode("span",_hoisted_7,toDisplayString(unref(t)("payType")),1),createBaseVNode("span",_hoisted_8,toDisplayString(unref(t)("onState")),1),isEdit.value?(openBlock(),createElementBlock("span",_hoisted_9,toDisplayString(unref(t)("templateName")),1)):createCommentVNode("",!0)]),createBaseVNode("div",{ref_for:!0,ref_key:"fieldBoxRefs",ref:fieldBoxRefs,"data-key":p},[(openBlock(!0),createElementBlock(Fragment,null,renderList(c.pay_type,(r,_)=>(openBlock(),createElementBlock("div",{key:r.redio_key,class:"flex table-item-border table-item-pd justify-between",id:p+"_"+_},[createBaseVNode("div",_hoisted_12,[isEdit.value?(openBlock(),createElementBlock("span",_hoisted_13)):createCommentVNode("",!0),createBaseVNode("div",_hoisted_14,[createBaseVNode("div",_hoisted_15,[createBaseVNode("img",{class:"w-[30px]",src:unref(img)(r.icon)},null,8,_hoisted_16)]),createBaseVNode("span",_hoisted_17,toDisplayString(r.name),1)])]),createBaseVNode("div",_hoisted_18,[isEdit.value?(openBlock(),createBlock(s,{key:0,modelValue:r.status,"onUpdate:modelValue":d=>r.status=d,"active-text":unref(t)("isEnable"),onChange:d=>enablePaymentMode(r)},null,8,["modelValue","onUpdate:modelValue","active-text","onChange"])):(openBlock(),createElementBlock("div",_hoisted_19,[r.status?(openBlock(),createBlock(n,{key:0,class:"ml-2",type:"success"},{default:withCtx(()=>[createTextVNode(toDisplayString(unref(t)("open")),1)]),_:1})):(openBlock(),createBlock(n,{key:1,class:"ml-2",type:"info"},{default:withCtx(()=>[createTextVNode(toDisplayString(unref(t)("notOpen")),1)]),_:1}))]))]),isEdit.value?(openBlock(),createElementBlock("div",_hoisted_20,[r.key!="balancepay"?(openBlock(),createElementBlock("button",{key:0,onClick:d=>configPayFn(r),class:"text-base"},toDisplayString(unref(t)("clickConfigure")),9,_hoisted_21)):(openBlock(),createElementBlock("button",_hoisted_22,"--"))])):createCommentVNode("",!0)],8,_hoisted_11))),128))],8,_hoisted_10)])]),_:2},1024))),128)),isEdit.value?(openBlock(),createElementBlock("div",_hoisted_23,[createBaseVNode("div",_hoisted_24,[createVNode(a,{type:"primary",loading:e.loading,onClick:cancelFn},{default:withCtx(()=>[createTextVNode(toDisplayString(unref(t)("cancel")),1)]),_:1},8,["loading"]),createVNode(a,{type:"primary",loading:e.loading,onClick:o[1]||(o[1]=c=>saveFn(e.formRef))},{default:withCtx(()=>[createTextVNode(toDisplayString(unref(t)("save")),1)]),_:1},8,["loading"])])])):createCommentVNode("",!0),createVNode(_sfc_main$1,{ref_key:"wechatpayDialog",ref:wechatpayDialog,onComplete:setConfigInfo},null,512),createVNode(_sfc_main$2,{ref_key:"alipayDialog",ref:alipayDialog,onComplete:setConfigInfo},null,512),createVNode(_sfc_main$3,{ref_key:"offlinepayDialog",ref:offlinepayDialog,onComplete:setConfigInfo},null,512)]),_:1})),[[i,payLoading.value]])}}}),pay_vue_vue_type_style_index_0_scoped_0bf6c086_lang="",pay=_export_sfc(_sfc_main,[["__scopeId","data-v-0bf6c086"]]);export{pay as default};