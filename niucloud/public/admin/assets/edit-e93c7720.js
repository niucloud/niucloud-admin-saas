import{d as Ue,r as h,o as $e,R as Se,c as $,e as r,f as k,Q as Ne,g as u,u as n,B as _,y as t,x as d,F as w,z as E,v as b,H as U,A as v,E as ie,b9 as Fe,ba as De}from"./base-d79f9f62.js";/* empty css                   *//* empty css                *//* empty css                    *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                *//* empty css                    *//* empty css                 *//* empty css                        */import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                */import"./el-form-item-4ed993c7.js";import{t as a}from"./index-9e0d1e6c.js";import{f as Pe}from"./storage-5316d819.js";import{_ as Re}from"./edit-associated.vue_vue_type_script_setup_true_async_true_lang-89590dfd.js";import{_ as Ie}from"./edit-view-type.vue_vue_type_script_setup_true_async_true_lang-c792702d.js";import{_ as Me}from"./edit-verify.vue_vue_type_script_setup_true_async_true_lang-9eef933f.js";import{d as Be,n as qe,o as Ae,p as Le,q as Oe}from"./tools-6d0ea037.js";import{_ as ue}from"./sys-3d5b784a.js";import{u as ze,b as je}from"./vue-router-fc35ac55.js";import{S as Ge}from"./sortable.esm-be94e56d.js";import{F as Ke}from"./index-3fd412a3.js";import{c as L}from"./cloneDeep-2aa6d741.js";import{a as re}from"./index-542aa78e.js";import{E as Je}from"./index-d1262e7a.js";import{E as He}from"./index-f249e665.js";import{a as Qe,E as We}from"./index-6befecc6.js";import{a as Xe,E as Ye}from"./index-f3bad52c.js";import{a as Ze,E as el}from"./index-3f47b227.js";import{a as ll,E as al}from"./index-2b5d43b9.js";import{E as tl}from"./index-d4057e2a.js";import{E as ol}from"./index-03649f16.js";import{E as nl,b as dl}from"./index-59eacbf0.js";import{E as ml}from"./index-d3fc16e5.js";import{E as sl}from"./index-ba59a1dc.js";import{v as il}from"./directive-13582d99.js";import{_ as ul}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-55149fa9.js";import"./index-2048a34f.js";/* empty css                   */import"./index-d0ada8fb.js";import"./index-cf3a42e3.js";import"./error-78e43d3e.js";import"./scroll-aa5f3aa0.js";import"./vnode-772b0c47.js";import"./index-6229e0fd.js";import"./focus-trap-50fa5770.js";import"./index-34cd7f55.js";import"./event-9519ab40.js";import"./index-71aec1df.js";import"./index-bdfee32a.js";import"./dict-e05194ab.js";import"./index-6fcaf7b3.js";import"./system-d23898e7.js";import"./index-5dbb8f83.js";/* empty css                        */import"./index-28a638e7.js";import"./index-427f5a83.js";import"./index-746243e9.js";import"./typescript-defaf979.js";import"./aria-adfa05c5.js";import"./validator-8f1b170d.js";import"./index-b6ca69fd.js";import"./_Uint8Array-bbbfd6ac.js";import"./_initCloneObject-a2c44136.js";import"./index-54a839cc.js";import"./index-2462875f.js";import"./index-3a5faaeb.js";import"./strings-d73e3c52.js";import"./isEqual-3f50b221.js";import"./debounce-6fd93949.js";import"./index-af085fbd.js";import"./_isIterateeCall-559d3e90.js";import"./flatten-0bbd547a.js";import"./index-0751469c.js";import"./index-6d156531.js";const x=S=>(Fe("data-v-4fc47d9d"),S=S(),De(),S),rl={class:"main-container mb-80"},pl={class:"detail-head !mb-[10px]"},cl=x(()=>u("span",{class:"iconfont iconxiangzuojiantou !text-xs"},null,-1)),_l={class:"ml-[1px]"},bl=x(()=>u("span",{class:"adorn"},"|",-1)),fl={class:"right"},vl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"}," 生成代码所属功能模块，对应路由名称，例如会员模块，充值模块，订单模块等",-1)),yl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"}," 命名规范，小写，多个单词使用下划线连接,例如: member，article_category",-1)),hl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"}," 生成代码所属文件名称，controller，model，service，等类型文件名",-1)),xl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"}," 命名规范，小写，多个单词使用下划线连接,例如: article_category",-1)),Vl=x(()=>u("i",{class:"iconfont icontuodong vues-rank cursor-move"},null,-1)),gl={class:"flex items-center"},kl={class:"flex items-center"},wl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"}," 物理删除：从表中把记录移除。软删除：通过标识使得这条记录在系统逻辑层面上不可见",-1)),Cl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"}," 软删除字段需为int类型，并且默认值为0",-1)),Tl=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},"弹出：弹出框编辑。新页面：跳转页面编辑。",-1)),El=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},"列表排序规则字段。",-1)),Ul=x(()=>u("p",{class:"text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"},"列表排序规则。",-1)),$l={class:"mb-[20px]"},Sl={class:"fixed-footer-wrap"},Nl={class:"fixed-footer"},Fl=Ue({__name:"edit",setup(S){const O=ze(),z=je(),pe=O.meta.title,j=parseInt(O.query.id||0),V=h(!0),G=Ke();let K=h(0);const J=h("basicSettings"),H={id:"",table_name:"",table_content:"",module_name:"",class_name:"",edit_type:1,table_column:[],editFiledIndex:0},ce=["=","!=",">",">=","<","<=","LIKE","BETWEEN"],_e=[{label:a("formInput"),value:"input"},{label:a("formTextarea"),value:"textarea"},{label:a("formSelect"),value:"select"},{label:a("formRadio"),value:"radio"},{label:a("formCheckbox"),value:"checkbox"},{label:a("formDateTime"),value:"datetime"},{label:a("formImageSelect"),value:"imageSelect"},{label:a("formEditor"),value:"editor"},{label:a("formNumber"),value:"number"}],be=[{label:"无需验证",value:""},{label:a("mobileVerify"),value:"mobile"},{label:a("numberVerify"),value:"number"},{label:a("idCardVerify"),value:"idCard"},{label:a("emailVerify"),value:"email"},{label:"",value:"max"},{label:"",value:"min"},{label:"",value:"between"}],Q=h([]),W=m=>{Be({search:m}).then(o=>{Q.value=o.data,ie(()=>{X()})})},X=()=>{const m=G.value.$el.querySelector(".el-table__body-wrapper tbody");Ge.create(m,{handle:".vues-rank",animation:300,onEnd({newIndex:o,oldIndex:s}){const f=e.table_column,y=f.splice(s,1)[0];f.splice(o,0,y),K.value+=1,ie(()=>{X()})}})};$e(()=>{W("")});const fe=m=>{e.delete_column_name=m?e.table_column[e.table_column.length-1].column_name:""},ve=m=>{e.order_type=m?1:0},e=Se({...H});$(()=>e.addon_name?`addon${e.addon_name?"\\"+e.addon_name:""}\\app\\adminapi\\controller${e.module_name?"\\"+e.module_name:""}${e.class_name?"\\"+e.class_name:""}`:`app\\adminapi\\controller${e.module_name?"\\"+e.module_name:""}${e.class_name?"\\"+e.class_name:""}`),$(()=>e.addon_name?`addon${e.addon_name?"\\"+e.addon_name:""}\\app\\model${e.module_name?"\\"+e.module_name:""}${e.class_name?"\\"+e.class_name:""}`:`app\\model${e.module_name?"\\"+e.module_name:""}${e.class_name?"\\"+e.class_name:""}`),$(()=>e.addon_name?`addon${e.addon_name?"\\"+e.addon_name:""}\\app\\validate${e.module_name?"\\"+e.module_name:""}${e.class_name?"\\"+e.class_name:""}`:`app\\validate${e.module_name?"\\"+e.module_name:""}${e.class_name?"\\"+e.class_name:""}`),$(()=>e.addon_name?`addon${e.addon_name?"\\"+e.addon_name:""}\\admin\\src`:"admin\\src"),$(()=>e.addon_name?`addon${e.addon_name?"\\"+e.addon_name:""}\\app\\adminapi\\route${e.module_name?"\\"+e.module_name:""}`:`app\\adminapi\\route${e.module_name?"\\"+e.module_name:""}`),j&&(async(m=0)=>{Object.assign(e,H);const o=await(await qe(m)).data;Object.keys(o).forEach(s=>{o[s]!=null&&(e[s]=o[s])}),e.table_column.forEach(s=>{s.betweenMin=L(s.min_number),s.betweenMax=L(s.max_number)}),e.addon_name!=""&&Y(e.addon_name),V.value=!1})(j);const ye=h(),I=h([]),N=h([]);(async()=>{let{data:m}=await ue();I.value=[{menu_name:"顶级",menu_key:""}],I.value.push(...m)})();const Y=async m=>{let{data:o}=await ue(m);N.value=o},he=async m=>{e.parent_menu="",m!=""&&(await Y(m),N.value[0]&&(e.parent_menu=N.value[0].menu_key))},M=h(0),Z=h(),ee=(m,o)=>{M.value=o,Z.value.setFormData(m)},xe=m=>{M.value!=-1?e.relations.splice(M.value,1,m):e.relations.unshift(m)},Ve=m=>{e.relations.splice(m,1)},B=async m=>{const o=L(e);o.table_column=JSON.stringify(o.table_column.map(s=>(s.is_search||(s.query_type=""),(s.validate_type==="between"||s.view_type==="number")&&(s.max_number=s.betweenMax,s.min_number=s.betweenMin),["select","radio","checkbox"].includes(s.view_type)||(s.dict_type=""),s))),o.relations=JSON.stringify(o.relations),V.value=!0,Ae(o).then(s=>{m===3?ge():m===2?le(m):(V.value=!1,re({type:"success",message:"操作成功"}),setTimeout(()=>{window.codeActiveName="codeList",q()},650))}).catch(()=>{V.value=!1})},ge=()=>{Le({id:e.id}).then(m=>{V.value=!1,Je.confirm(m.msg!="2"?a("saveAndSyncText"):a("saveAndSyncText1"),a("warning"),{confirmButtonText:a("confirm"),cancelButtonText:a("cancel")}).then(()=>{V.value=!0,le(3)}).catch(()=>{})}).catch(()=>{V.value=!1})},le=m=>{Oe({id:e.id,generate_type:m}).then(o=>{V.value=!1,re({type:"success",message:"操作成功"}),window.open(Pe(o.data.file),"_blank"),setTimeout(()=>{window.codeActiveName="codeList",q()},650)}).catch(()=>{V.value=!1})},F=h(0),ae=h(null),te=h(null),D=(m,o)=>{var s;(["max","min","between"].includes(m.validate_type)||m.view_type==="number")&&(F.value=o,(s=ae.value)==null||s.setFormData(m))},ke=m=>{e.table_column.splice(F.value,1,m)},oe=(m,o)=>{var s;["input","textarea"].includes(m.view_type)||(m.validate_type=""),["select","radio","checkbox"].includes(m.view_type)?(F.value=o,(s=te.value)==null||s.setFormData(m)):m.view_type==="number"&&D(m,o)},we=m=>{e.table_column.splice(F.value,1,m)},q=()=>{z.push({path:"/tools/code"})};return(m,o)=>{const s=He,f=Qe,y=Xe,C=Ye,ne=We,P=Ze,c=ll,T=tl,g=ol,de=al,R=nl,me=dl,se=ml,Ce=el,Te=sl,Ee=il;return r(),k(w,null,[Ne((r(),k("div",rl,[u("div",pl,[u("div",{class:"left",onClick:o[0]||(o[0]=l=>n(z).push({path:"/tools/code"}))},[cl,u("span",_l,_(n(a)("returnToPreviousPage")),1)]),bl,u("span",fl,_(n(pe)),1)]),t(Te,{class:"box-card !border-none",shadow:"never"},{default:d(()=>[t(Ce,{modelValue:J.value,"onUpdate:modelValue":o[15]||(o[15]=l=>J.value=l),class:"demo-tabs"},{default:d(()=>[t(P,{label:n(a)("basicSettings"),name:"basicSettings"},{default:d(()=>[t(ne,{model:e,"label-width":"70px",class:"page-form"},{default:d(()=>[t(f,{label:n(a)("tableName")},{default:d(()=>[t(s,{modelValue:e.table_name,"onUpdate:modelValue":o[1]||(o[1]=l=>e.table_name=l),disabled:"",placeholder:n(a)("tableNamePlaceholder"),class:"input-width",maxlength:"64"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),t(f,{label:n(a)("tableContent")},{default:d(()=>[t(s,{modelValue:e.table_content,"onUpdate:modelValue":o[2]||(o[2]=l=>e.table_content=l),clearable:"",placeholder:n(a)("tableContentPlaceholder"),class:"input-width",maxlength:"64"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),t(f,{label:n(a)("addon")},{default:d(()=>[t(C,{class:"input-width",placeholder:n(a)("addonPlaceholder1"),modelValue:e.addon_name,"onUpdate:modelValue":o[3]||(o[3]=l=>e.addon_name=l),filterable:"",remote:"",clearable:"","remote-method":W,onChange:he},{default:d(()=>[(r(!0),k(w,null,E(Q.value,l=>(r(),b(y,{label:l.title,value:l.key,key:l.key},null,8,["label","value"]))),128))]),_:1},8,["placeholder","modelValue"])]),_:1},8,["label"]),t(f,{label:n(a)("moduleName")},{default:d(()=>[u("div",null,[t(s,{modelValue:e.module_name,"onUpdate:modelValue":o[4]||(o[4]=l=>e.module_name=l),clearable:"",placeholder:n(a)("moduleNamePlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"]),vl,yl])]),_:1},8,["label"]),t(f,{label:n(a)("className")},{default:d(()=>[u("div",null,[t(s,{modelValue:e.class_name,"onUpdate:modelValue":o[5]||(o[5]=l=>e.class_name=l),clearable:"",placeholder:n(a)("classNamePlaceholder"),class:"input-width"},null,8,["modelValue","placeholder"]),hl,xl])]),_:1},8,["label"])]),_:1},8,["model"])]),_:1},8,["label"]),t(P,{label:n(a)("fieldSettings"),name:"fieldSettings"},{default:d(()=>[(r(),b(de,{data:e.table_column,size:"large",ref_key:"tableRef",ref:G,key:n(K)},{default:d(()=>[t(c,{align:"center",label:"操作",width:"80"},{default:d(()=>[Vl]),_:1}),t(c,{label:n(a)("columnName"),prop:"column_name","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("columnComment"),prop:"","min-width":"220px"},{default:d(({row:l})=>[t(s,{class:"",modelValue:l.column_comment,"onUpdate:modelValue":i=>l.column_comment=i,placeholder:n(a)("columnCommentPlaceholder")},null,8,["modelValue","onUpdate:modelValue","placeholder"])]),_:1},8,["label"]),t(c,{label:n(a)("columnType"),prop:"column_type",width:"100px"},null,8,["label"]),t(c,{label:n(a)("isPk"),prop:"",align:"center",width:"65px"},{default:d(({row:l})=>[t(T,{modelValue:l.is_pk,"onUpdate:modelValue":i=>l.is_pk=i,disabled:"","true-label":1,"false-label":0},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["label"]),t(c,{label:n(a)("isRequired"),prop:"",align:"center",width:"65px"},{default:d(({row:l})=>[t(T,{modelValue:l.is_required,"onUpdate:modelValue":i=>l.is_required=i,"true-label":1,"false-label":0},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["label"]),t(c,{label:n(a)("isInsert"),prop:"",align:"center",width:"65px"},{default:d(({row:l})=>[t(T,{modelValue:l.is_insert,"onUpdate:modelValue":i=>l.is_insert=i,"true-label":1,"false-label":0},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["label"]),t(c,{label:n(a)("isUpdate"),prop:"",align:"center",width:"65px"},{default:d(({row:l})=>[t(T,{modelValue:l.is_update,"onUpdate:modelValue":i=>l.is_update=i,"true-label":1,"false-label":0},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["label"]),t(c,{label:n(a)("isLists"),prop:"",align:"center",width:"65px"},{default:d(({row:l})=>[t(T,{modelValue:l.is_lists,"onUpdate:modelValue":i=>l.is_lists=i,"true-label":1,"false-label":0},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["label"]),t(c,{label:n(a)("isSearch"),prop:"",align:"center",width:"65px"},{default:d(({row:l})=>[t(T,{modelValue:l.is_search,"onUpdate:modelValue":i=>l.is_search=i,"true-label":1,"false-label":0},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["label"]),t(c,{label:n(a)("queryType"),prop:"","min-width":"170px"},{default:d(({row:l})=>[u("div",gl,[l.is_search?(r(),b(C,{key:0,class:"",placeholder:n(a)("selectPlaceholder"),modelValue:l.query_type,"onUpdate:modelValue":i=>l.query_type=i},{default:d(()=>[(r(),k(w,null,E(ce,(i,p)=>t(y,{label:i,value:i,key:p},null,8,["label","value"])),64))]),_:2},1032,["placeholder","modelValue","onUpdate:modelValue"])):U("",!0)])]),_:1},8,["label"]),t(c,{label:n(a)("formType"),prop:"","min-width":"225px"},{default:d(({row:l,$index:i})=>[t(C,{class:"w-[146px]",placeholder:n(a)("selectPlaceholder"),modelValue:l.view_type,"onUpdate:modelValue":p=>l.view_type=p,onChange:p=>oe(l,i)},{default:d(()=>[(r(),k(w,null,E(_e,(p,A)=>t(y,{label:p.label,value:p.value,key:A},null,8,["label","value"])),64))]),_:2},1032,["placeholder","modelValue","onUpdate:modelValue","onChange"]),["select","radio","checkbox"].includes(l.view_type)?(r(),b(g,{key:0,class:"ml-[10px]",type:"primary",link:"",onClick:p=>oe(l,i)},{default:d(()=>[v(_(n(a)("setUp")),1)]),_:2},1032,["onClick"])):U("",!0),l.view_type==="number"?(r(),b(g,{key:1,class:"ml-[10px]",type:"primary",link:"",onClick:p=>D(l,i)},{default:d(()=>[v(_(n(a)("setUp")),1)]),_:2},1032,["onClick"])):U("",!0)]),_:1},8,["label"]),t(c,{label:n(a)("verifyType"),prop:"","min-width":"260px"},{default:d(({row:l,$index:i})=>[u("div",kl,[t(C,{class:"w-[196px]",placeholder:n(a)("selectPlaceholder"),modelValue:l.validate_type,"onUpdate:modelValue":p=>l.validate_type=p,onChange:p=>D(l,i),disabled:!["input","textarea"].includes(l.view_type)},{default:d(()=>[(r(),k(w,null,E(be,(p,A)=>(r(),k(w,{key:A},[p.value==="max"?(r(),b(y,{key:0,value:p.value,label:"最大输入字符"},null,8,["value"])):p.value==="min"?(r(),b(y,{key:1,value:p.value,label:"最小输入字符"},null,8,["value"])):p.value==="between"?(r(),b(y,{key:2,value:p.value,label:"输入字符区间"},null,8,["value"])):(r(),b(y,{key:3,label:p.label,value:p.value},null,8,["label","value"]))],64))),64))]),_:2},1032,["placeholder","modelValue","onUpdate:modelValue","onChange","disabled"]),["max","min","between"].includes(l.validate_type)?(r(),b(g,{key:0,class:"ml-[10px]",type:"primary",link:"",onClick:p=>D(l,i)},{default:d(()=>[v(_(n(a)("setUp")),1)]),_:2},1032,["onClick"])):U("",!0)])]),_:1},8,["label"])]),_:1},8,["data"]))]),_:1},8,["label"]),t(P,{label:n(a)("generationSettings"),name:"generationSettings"},{default:d(()=>[t(ne,{model:e,class:"page-form","label-width":"140px",ref_key:"formRef",ref:ye,rules:m.rules},{default:d(()=>[t(f,{label:n(a)("deleteType")},{default:d(()=>[u("div",null,[t(me,{modelValue:e.is_delete,"onUpdate:modelValue":o[6]||(o[6]=l=>e.is_delete=l),onChange:fe},{default:d(()=>[t(R,{label:0},{default:d(()=>[v(_(n(a)("physicalDeletion")),1)]),_:1}),t(R,{label:1},{default:d(()=>[v(_(n(a)("softDeletion")),1)]),_:1})]),_:1},8,["modelValue"]),wl])]),_:1},8,["label"]),e.is_delete?(r(),b(f,{key:0,prop:"delete_column_name",label:n(a)("deleteField")},{default:d(()=>[u("div",null,[t(C,{class:"input-width",placeholder:n(a)("deleteFieldPlaceholder"),modelValue:e.delete_column_name,"onUpdate:modelValue":o[7]||(o[7]=l=>e.delete_column_name=l)},{default:d(()=>[(r(!0),k(w,null,E(e.table_column,(l,i)=>(r(),b(y,{label:`${l.column_name}:${l.column_comment}`,value:l.column_name,key:i},null,8,["label","value"]))),128))]),_:1},8,["placeholder","modelValue"]),Cl])]),_:1},8,["label"])):U("",!0),t(f,{label:n(a)("editType")},{default:d(()=>[u("div",null,[t(me,{modelValue:e.edit_type,"onUpdate:modelValue":o[8]||(o[8]=l=>e.edit_type=l),placeholder:n(a)("editTypePlaceholder")},{default:d(()=>[t(R,{label:1},{default:d(()=>[v(_(n(a)("popup")),1)]),_:1}),t(R,{label:2},{default:d(()=>[v(_(n(a)("page")),1)]),_:1})]),_:1},8,["modelValue","placeholder"]),Tl])]),_:1},8,["label"]),t(f,{label:n(a)("orderColumnName")},{default:d(()=>[u("div",null,[t(C,{class:"input-width",placeholder:n(a)("orderColumnNamePlaceholder"),modelValue:e.order_column_name,"onUpdate:modelValue":o[9]||(o[9]=l=>e.order_column_name=l),clearable:"",onChange:ve},{default:d(()=>[(r(!0),k(w,null,E(e.table_column,(l,i)=>(r(),b(y,{label:`${l.column_name}:${l.column_comment}`,value:l.column_name,key:i},null,8,["label","value"]))),128))]),_:1},8,["placeholder","modelValue"]),El])]),_:1},8,["label"]),e.order_column_name?(r(),b(f,{key:1,label:n(a)("orderType")},{default:d(()=>[u("div",null,[t(C,{class:"input-width",placeholder:n(a)("orderTypePlaceholder"),modelValue:e.order_type,"onUpdate:modelValue":o[10]||(o[10]=l=>e.order_type=l),onChange:o[11]||(o[11]=()=>{})},{default:d(()=>[t(y,{label:"正序 asc",value:1}),t(y,{label:"倒序 desc",value:2})]),_:1},8,["placeholder","modelValue"]),Ul])]),_:1},8,["label"])):U("",!0),t(f,{label:n(a)("menuType")},{default:d(()=>[e.addon_name!=""?(r(),b(se,{key:0,class:"input-width",clearable:"",modelValue:e.parent_menu,"onUpdate:modelValue":o[12]||(o[12]=l=>e.parent_menu=l),props:{label:"menu_name",value:"menu_key"},data:N.value,"check-strictly":"","render-after-expand":!1},null,8,["modelValue","data"])):(r(),b(se,{key:1,class:"input-width",modelValue:e.parent_menu,"onUpdate:modelValue":o[13]||(o[13]=l=>e.parent_menu=l),clearable:"",props:{label:"menu_name",value:"menu_key"},data:I.value,"check-strictly":"","render-after-expand":!1},null,8,["modelValue","data"]))]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["label"]),t(P,{label:n(a)("associatedConfiguration"),name:"associatedConfiguration"},{default:d(()=>[u("div",$l,[t(g,{type:"primary",class:"w-[100px]",onClick:o[14]||(o[14]=l=>ee(null,-1))},{default:d(()=>[v(_(n(a)("insertAssociated")),1)]),_:1})]),t(de,{data:e.relations,size:"large"},{default:d(()=>[t(c,{label:n(a)("associatedType"),prop:"type","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("associatedName"),prop:"name","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("addons"),prop:"addon","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("associatedModel"),prop:"model","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("localKey"),prop:"local_key","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("foreignKey"),prop:"foreign_key","min-width":"130px"},null,8,["label"]),t(c,{label:n(a)("operation"),align:"right","min-width":"130px"},{default:d(({row:l,$index:i})=>[t(g,{type:"primary",link:"",onClick:p=>ee(l,i)},{default:d(()=>[v(_(n(a)("edit")),1)]),_:2},1032,["onClick"]),t(g,{type:"primary",link:"",onClick:p=>Ve(i)},{default:d(()=>[v(_(n(a)("delete")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])]),_:1},8,["label"])]),_:1},8,["modelValue"])]),_:1})])),[[Ee,V.value]]),t(Re,{ref_key:"editDialog",ref:Z,table_name:e.table_name,onComplete:xe},null,8,["table_name"]),t(Ie,{ref_key:"editViewTypeRef",ref:te,onComplete:we},null,512),t(Me,{ref_key:"editVerifyRef",ref:ae,onComplete:ke},null,512),u("div",Sl,[u("div",Nl,[t(g,{type:"primary",onClick:o[16]||(o[16]=l=>B(1))},{default:d(()=>[v(_(n(a)("save")),1)]),_:1}),t(g,{type:"primary",onClick:o[17]||(o[17]=l=>B(3))},{default:d(()=>[v(_(n(a)("saveAndSync")),1)]),_:1}),t(g,{type:"primary",onClick:o[18]||(o[18]=l=>B(2))},{default:d(()=>[v(_(n(a)("saveAndDownload")),1)]),_:1}),t(g,{onClick:o[19]||(o[19]=l=>q())},{default:d(()=>[v(_(n(a)("cancel")),1)]),_:1})])])],64)}}});const it=ul(Fl,[["__scopeId","data-v-4fc47d9d"]]);export{it as default};