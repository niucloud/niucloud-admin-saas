import{d as ee,r as y,O as te,f as le,n as S,v as oe,D as ae,a0 as P,h as _,c as f,y as B,I as N,w as s,a as r,x as D,F as R,G as T,u as n,R as se,e as l,B as H,t as d,N as o,i as p,z as ne,af as j,a1 as re,V as ie,X as de,W as ue,E as pe,aC as me,ay as ce,az as _e,cD as ve,aD as xe,Y as fe,_ as be,$ as ye}from"./index-4ce69858.js";/* empty css                   *//* empty css                *//* empty css                *//* empty css                    *//* empty css                        *//* empty css                 *//* empty css                  *//* empty css                 */import{_ as ge}from"./index.vue_vue_type_script_setup_true_lang-4512732d.js";import"./el-form-item-4ed993c7.js";import{_ as Ce}from"./index-c520c584.js";/* empty css                 *//* empty css                        *//* empty css                */import{r as ke,t as Ve}from"./diy-2247a3d0.js";import{S as he}from"./sortable.esm-be94e56d.js";/* empty css                        */import{r as we}from"./range-dc2d3780.js";import{_ as Fe}from"./_plugin-vue_export-helper-c27b6911.js";/* empty css                   *//* empty css                     */import"./index.vue_vue_type_style_index_0_lang-59777cba.js";import"./attachment-872c2aec.js";/* empty css               *//* empty css                  *//* empty css                  *//* empty css                  *//* empty css                      *//* empty css                    *//* empty css                 */import"./el-tooltip-4ed993c7.js";/* empty css               *//* empty css                    *//* empty css                         *//* empty css                   */import"./index.vue_vue_type_script_setup_true_lang-861395e6.js";import"./sys-e410b79c.js";const $e={class:"main-container"},Ee={class:"flex"},Ue={class:"w-[360px] h-[400px] absolute mr-[30px] border-[1px] border-gray-300"},Ie={class:"image-slot flex justify-center items-center mt-1"},Se={class:"flex-1 ml-[430px]"},Pe={class:"flex items-center border-l-[3px] border-primary pl-[5px] leading-[1.1] mt-[10px]"},Be={class:"text-[14px]"},Ne={class:"text-[14px] text-primary mx-[3px]"},De={class:"text-[14px]"},Re={class:"text-[12px] ml-[8px] text-gray-500"},Te=["data-id"],He={class:"flex align-center"},je={class:"flex flex-col justify-center items-center"},ze={class:"mr-[10px] text-sm"},Oe={class:"flex flex-col justify-center items-center"},Le={class:"mr-[10px] text-sm"},qe={class:"flex align-center"},Ge={class:"flex align-center"},Me={class:"flex align-center"},We={class:"fixed-footer-wrap"},Xe={class:"fixed-footer"},Ye=ee({__name:"tabbar_edit",setup(Ae){const w=y("navPicture"),m=y(!1),k=te(),z=le();k.query.key=k.query.key||"";const t=S({key:"",info:{},value:{backgroundColor:"#FFFFFF",textColor:"#333333",textHoverColor:"#333333",type:"1",list:[]}}),O=S({text:"",link:{name:"",title:"",parent:"",url:""},iconSelectPath:"",iconPath:""}),F=()=>{t.value.list.length>=5||t.value.list.push({...O})};F();const L=i=>{t.value.list.splice(i,1)},$=y();(()=>{m.value=!0,ke({key:k.query.key}).then(i=>{m.value=!1,Object.keys(t).forEach((e,u)=>{t[e]=i.data[e]})}).catch(()=>{m.value=!1})})();const q=async i=>{if(M())return!1;m.value||!i||await i.validate(async e=>{e&&(m.value=!0,Ve({key:t.key,value:t.value}).then(u=>{m.value=!1}).catch(()=>{m.value=!1}))})},G=()=>{z.push("/diy/tabbar")},M=()=>{if(t.value.list.length<2)return j({type:"error",message:o("leastTwoNav")}),!0;try{const i=y("");t.value.list.forEach((e,u)=>{if(e.iconPath||(i.value=`${o("pleaseUpload")}${u+1}${o("navIcon")}`),e.iconSelectPath||(i.value=`${o("pleaseUpload")}${u+1}${o("navSelectIcon")}`),e.text||(i.value=`${o("pleaseEnter")}[${u+1}${o("navTitle")}`),e.link.url||(i.value=`${o("pleaseChoose")}${u+1}${o("navLink")}`),i.value)throw j({type:"error",message:i.value}),Error()})}catch{return!0}return!1},E=y();return oe(()=>{const i=he.create(E.value,{group:"item-wrap",animation:200,onEnd:e=>{const u=t.value.list[e.oldIndex];t.value.list.splice(e.oldIndex,1),t.value.list.splice(e.newIndex,0,u),ae(()=>{i.sort(we(t.value.list.length).map(g=>g.toString()))})}})}),(i,e)=>{const u=P("Picture"),g=re,W=ie,U=Ce,v=de,C=ue,X=ge,Y=P("CircleCloseFilled"),x=pe,I=me,V=ce,A=_e,h=ve,J=xe,K=fe,Q=be,Z=ye;return _(),f("div",$e,[B((_(),N(Q,{class:"box-card !border-none",shadow:"never"},{default:s(()=>[r("div",Ee,[r("div",Ue,[r("div",{class:"flex items-center justify-between absolute h-[60px] left-[0px] right-[0px] bottom-[0px] bg-white border-[1px] border-primary",style:D({backgroundColor:t.value.backgroundColor})},[(_(!0),f(R,null,T(t.value.list,(a,b)=>(_(),f("div",{class:"flex flex-1 flex-col items-center justify-center",key:"b"+b},[["1","2"].includes(t.value.type.toString())?(_(),N(W,{key:0,class:"w-[22px] h-[22px] mb-[5px] leading-1",src:n(se)(a.iconPath),fit:i.contain},{error:s(()=>[r("div",Ie,[l(g,null,{default:s(()=>[l(u,{class:"text-3xl text-gray-500"})]),_:1})])]),_:2},1032,["src","fit"])):H("",!0),["1","3"].includes(t.value.type.toString())?(_(),f("span",{key:1,class:"text-[12px]",style:D({color:t.value.textColor})},d(a.text),5)):H("",!0)]))),128))],4)]),r("div",Se,[r("div",Pe,[r("span",Be,d(n(o)("editing")),1),r("span",Ne,d(t.info.title),1),r("span",De,d(n(o)("bottomNav")),1),r("span",Re,d(n(o)("bottomNavHint")),1)]),l(K,{model:t.value,"label-width":"100px",ref_key:"formRef",ref:$},{default:s(()=>[l(J,{modelValue:w.value,"onUpdate:modelValue":e[10]||(e[10]=a=>w.value=a),class:"demo-tabs mt-[15px]"},{default:s(()=>[l(I,{label:n(o)("navImage"),name:"navPicture"},{default:s(()=>[r("div",{ref_key:"navItemRef",ref:E},[(_(!0),f(R,null,T(t.value.list,(a,b)=>(_(),f("div",{key:"a"+b,"data-id":b,class:"item-wrap border-2 border-dashed pt-[18px] m-[10px] mb-[15px] relative list-item"},[l(v,{label:n(o)("navIconOne")},{default:s(()=>[r("div",He,[r("div",je,[l(U,{modelValue:a.iconPath,"onUpdate:modelValue":c=>a.iconPath=c,width:"60px",height:"60px",limit:1},null,8,["modelValue","onUpdate:modelValue"]),r("span",ze,d(n(o)("uploadImgUnselected")),1)]),r("div",Oe,[l(U,{modelValue:a.iconSelectPath,"onUpdate:modelValue":c=>a.iconSelectPath=c,width:"60px",height:"60px",limit:1},null,8,["modelValue","onUpdate:modelValue"]),r("span",Le,d(n(o)("uploadImgSelected")),1)])])]),_:2},1032,["label"]),l(v,{label:n(o)("navTitleOne")},{default:s(()=>[l(C,{class:"w-[215px]",modelValue:a.text,"onUpdate:modelValue":c=>a.text=c,placeholder:n(o)("titleContent"),maxlength:"5","show-word-limit":""},null,8,["modelValue","onUpdate:modelValue","placeholder"])]),_:2},1032,["label"]),l(v,{label:n(o)("navLinkOne")},{default:s(()=>[l(X,{modelValue:a.link,"onUpdate:modelValue":c=>a.link=c},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]),l(g,{class:"close-icon cursor-pointer -top-[11px] -right-[8px]",onClick:c=>L(b)},{default:s(()=>[l(Y)]),_:2},1032,["onClick"])],8,Te))),128))],512),B(l(x,{type:"primary",class:"mt-[15px]",onClick:F},{default:s(()=>[p(d(n(o)("addnav")),1)]),_:1},512),[[ne,t.value.list.length<5]])]),_:1},8,["label"]),l(I,{label:n(o)("styleSet"),name:"setStyle"},{default:s(()=>[l(v,{label:n(o)("navType")},{default:s(()=>[l(A,{modelValue:t.value.type,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value.type=a),class:"ml-4"},{default:s(()=>[l(V,{label:"1",size:"large"},{default:s(()=>[p(d(n(o)("imageText")),1)]),_:1}),l(V,{label:"2",size:"large"},{default:s(()=>[p(d(n(o)("image")),1)]),_:1}),l(V,{label:"3",size:"large"},{default:s(()=>[p(d(n(o)("text")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["label"]),l(v,{label:n(o)("textColor")},{default:s(()=>[r("div",qe,[l(h,{modelValue:t.value.textColor,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value.textColor=a)},null,8,["modelValue"]),l(C,{class:"ml-[10px]",modelValue:t.value.textColor,"onUpdate:modelValue":e[2]||(e[2]=a=>t.value.textColor=a),disabled:""},null,8,["modelValue"]),l(x,{class:"ml-[10px]",type:"primary",onClick:e[3]||(e[3]=a=>t.value.textColor="#333333")},{default:s(()=>[p(d(n(o)("reset")),1)]),_:1})])]),_:1},8,["label"]),l(v,{label:n(o)("textSelectColor")},{default:s(()=>[r("div",Ge,[l(h,{modelValue:t.value.textHoverColor,"onUpdate:modelValue":e[4]||(e[4]=a=>t.value.textHoverColor=a)},null,8,["modelValue"]),l(C,{class:"ml-[10px]",modelValue:t.value.textHoverColor,"onUpdate:modelValue":e[5]||(e[5]=a=>t.value.textHoverColor=a),disabled:""},null,8,["modelValue"]),l(x,{class:"ml-[10px]",type:"primary",onClick:e[6]||(e[6]=a=>t.value.textHoverColor="#333333")},{default:s(()=>[p(d(n(o)("reset")),1)]),_:1})])]),_:1},8,["label"]),l(v,{label:n(o)("backgroundColor")},{default:s(()=>[r("div",Me,[l(h,{modelValue:t.value.backgroundColor,"onUpdate:modelValue":e[7]||(e[7]=a=>t.value.backgroundColor=a)},null,8,["modelValue"]),l(C,{class:"ml-[10px]",modelValue:t.value.backgroundColor,"onUpdate:modelValue":e[8]||(e[8]=a=>t.value.backgroundColor=a),disabled:""},null,8,["modelValue"]),l(x,{class:"ml-[10px]",type:"primary",onClick:e[9]||(e[9]=a=>t.value.backgroundColor="#FFFFFF")},{default:s(()=>[p(d(n(o)("reset")),1)]),_:1})])]),_:1},8,["label"])]),_:1},8,["label"])]),_:1},8,["modelValue"])]),_:1},8,["model"])])])]),_:1})),[[Z,m.value]]),r("div",We,[r("div",Xe,[l(x,{type:"primary",onClick:e[11]||(e[11]=a=>q($.value))},{default:s(()=>[p(d(n(o)("save")),1)]),_:1}),l(x,{onClick:e[12]||(e[12]=a=>G())},{default:s(()=>[p(d(n(o)("back")),1)]),_:1})])])])}}});const Dt=Fe(Ye,[["__scopeId","data-v-07b9e00e"]]);export{Dt as default};
