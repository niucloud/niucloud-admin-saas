import{d as te,r,q as ae,n as j,N as c,a0 as H,y as se,h as n,c as k,I as x,w as a,a as e,u as i,i as d,e as s,t as _,B as E,F as oe,G as le,a7 as ne,a8 as ie,E as re,a1 as ce,a9 as pe,W as de,X as ue,_ as _e,Y as me,aa as xe,ab as fe,ac as he,$ as ve,p as ge,g as ye}from"./index-30b146d4.js";/* empty css                   *//* empty css                   *//* empty css                     *//* empty css                *//* empty css                 *//* empty css                  *//* empty css                   *//* empty css                *//* empty css                  */import{g as we,a as ke,s as Ce}from"./module-dec1fba2.js";import{U as be,C as Ve}from"./index-07795b62.js";import{_ as Fe}from"./_plugin-vue_export-helper-c27b6911.js";import"./vue-web-terminal-551cb123.js";/* empty css               *//* empty css                     *//* empty css                 */const g=C=>(ge("data-v-6993491f"),C=C(),ye(),C),Be={class:"main main-container min-w-[1000px] min-h-[650px]"},Ie={class:"flex"},Ee={class:"bg-[#F3F6FF] mr-[14px] w-[402px] pt-[30px] pl-[32px] pr-[20px] pb-[60px] timeline-log-wrap"},Te={class:"flex items-center justify-between"},Ae=g(()=>e("span",{class:"text-page-title"},"版本信息",-1)),Le={class:"flex-1 w-0 flex justify-end"},Se={class:"mt-[30px] flex items-center text-[14px] text-[#797979]"},ze=g(()=>e("span",null,"当前版本",-1)),De={class:"text-[26px] ml-[15px] mr-[10px] text-[#656668]"},Ne={key:0,class:"text-[12px]"},Re={key:1,class:"text-[12px] text-[red]"},Ue={class:"flex-1 flex justify-between items-center bg-[#F3F6FF] pt-[34px] pl-[30px] pr-[60px] pb-[62px] timeline-log-wrap"},je={class:"flex flex-col"},He={class:"flex flex-wrap items-center"},Pe=g(()=>e("p",{class:"text-page-title mr-[20px]"},"授权信息",-1)),$e={class:"text-[14px] text-[#666]"},Me={class:"mt-[46px] ml-[40px] flex flex-wrap"},qe={class:"text-[14px] mr-[84px]"},Je={class:"ml-[12px] text-[12px]"},Oe={class:"text-[14px] flex items-center"},Ge=g(()=>e("span",null,"授权码",-1)),We={class:"ml-[12px] mr-[10px] text-[12px]"},Xe={class:"flex flex-1 flex-wrap justify-end relative"},Ye={class:"px-[18px] py-[8px]"},Ke=g(()=>e("p",{class:"leading-[32px] text-[14px]"},"您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务 ",-1)),Qe={class:"flex justify-end mt-[36px]"},Ze={class:"mt-[20px]"},et={class:"text-sm mt-[10px] text-info"},tt={class:"mt-[20px]"},at={class:"mt-[10px] text-right"},st=g(()=>e("div",{class:"text-page-title mb-[20px]"},"历史版本",-1)),ot={key:0,class:"mt-[10px] p-[20px] bg-overlay rounded-md timeline-log-wrap whitespace-pre"},lt=["innerHTML"],nt=te({__name:"authorize",setup(C){const T=r(null),b=r(null),A=r(null),f=r(!1),h=r(!1),V=r([]),L=()=>{we().then(({data:o})=>{V.value=o})};L();const m=ae(()=>V.value.length?V.value[0]:null),P=o=>{const t=JSON.parse(JSON.stringify(o));return t.slice(0,t.length/2)+t.slice(t.length/2,t.length-1).replace(/./g,"*")},B=()=>{f.value=!0},u=r({company_name:"",site_address:"",auth_code:""}),y=r(!0),w=r(!1),S=()=>{ke().then(o=>{y.value=!1,o.data.data&&o.data.data.length!=0&&(u.value=o.data.data,f.value=!1)}).catch(()=>{y.value=!1,f.value=!1})};S();const v=j({auth_code:"",auth_secret:""}),z=r(),$=j({auth_code:[{required:!0,message:c("authCodePlaceholder"),trigger:"blur"}],auth_secret:[{required:!0,message:c("authSecretPlaceholder"),trigger:"blur"}]}),M=async o=>{w.value||!o||await o.validate(async t=>{t&&(w.value=!0,Ce(v).then(()=>{w.value=!1,S()}).catch(()=>{w.value=!1,f.value=!1}))})},D=()=>{window.open("https://www.niucloud.com/app")},F=r("");(()=>{ne().then(o=>{F.value=o.data.version.version})})();const q=()=>{var o;if(!u.value){B();return}(o=T.value)==null||o.open()},J=()=>{var o;if(!u.value){B();return}if(b.value.cloudBuildTask){(o=b.value)==null||o.open();return}ie.confirm(c("cloudBuildTips"),c("warning"),{confirmButtonText:c("confirm"),cancelButtonText:c("cancel"),type:"warning"}).then(()=>{var t;(t=b.value)==null||t.open()})};return(o,t)=>{const p=re,O=H("View"),N=ce,G=H("Hide"),W=pe,R=de,U=ue,I=_e,X=me,Y=xe,K=fe,Q=he,Z=ve;return se((n(),k("div",Be,[y.value?E("",!0):(n(),x(I,{key:0,class:"box-card !border-none",shadow:"never"},{default:a(()=>[e("div",Ie,[e("div",Ee,[e("div",Te,[Ae,e("div",Le,[!i(m)||i(m)&&i(m).version_no==F.value?(n(),x(p,{key:0,class:"text-[#4C4C4C] w-[78px] h-[32px] !bg-transparent",onClick:L},{default:a(()=>[d("检测更新")]),_:1})):(n(),x(p,{key:1,class:"text-[#4C4C4C] w-[78px] h-[32px]",type:"primary",onClick:q},{default:a(()=>[d("一键升级")]),_:1})),s(p,{class:"text-[#4C4C4C] w-[78px] h-[32px]",type:"primary",onClick:J},{default:a(()=>[d("云编译")]),_:1})])]),e("div",Se,[ze,e("span",De,_(F.value),1),!i(m)||i(m)&&i(m).version_no==F.value?(n(),k("em",Ne,"(当前已是最新版本)")):(n(),k("em",Re,"(最新版本"+_(i(m).version_no)+")",1))])]),e("div",Ue,[e("div",je,[e("div",He,[Pe,e("span",$e,_(u.value.company_name||"--"),1)]),e("div",Me,[e("span",qe,[d("授权域名"),e("em",Je,_(u.value.site_address||"--"),1)]),e("span",Oe,[Ge,e("em",We,_(u.value.auth_code?h.value?u.value.auth_code:P(u.value.auth_code):"--"),1),h.value?(n(),x(N,{key:1,onClick:t[1]||(t[1]=l=>h.value=!h.value),class:"text-[12px] cursor-pointer"},{default:a(()=>[s(G)]),_:1})):(n(),x(N,{key:0,onClick:t[0]||(t[0]=l=>h.value=!h.value),class:"text-[12px] cursor-pointer"},{default:a(()=>[s(O)]),_:1}))])])]),e("div",Xe,[s(p,{class:"w-[154px] !h-[48px] mt-[8px]",type:"primary",onClick:B},{default:a(()=>[d("授权码认证")]),_:1}),s(W,{ref_key:"getAuthCodeDialog",ref:A,placement:"bottom-start",width:478,trigger:"click",class:"mt-[8px]"},{reference:a(()=>[s(p,{class:"w-[154px] !h-[48px] mt-[8px] !text-[var(--el-color-primary)] hover:!text-[var(--el-color-primary)] !bg-transparent",plain:"",type:"primary"},{default:a(()=>[d("如何获取授权码?")]),_:1})]),default:a(()=>[e("div",Ye,[Ke,e("div",Qe,[s(p,{class:"w-[182px] !h-[48px]",plain:"",onClick:D},{default:a(()=>[d("去应用市场逛逛")]),_:1}),s(p,{class:"w-[100px] !h-[48px]",plain:"",onClick:t[2]||(t[2]=l=>A.value.hide())},{default:a(()=>[d("关闭")]),_:1})])])]),_:1},512)]),s(Y,{modelValue:f.value,"onUpdate:modelValue":t[6]||(t[6]=l=>f.value=l),title:"授权码认证",width:"400px"},{default:a(()=>[s(X,{model:v,"label-width":"0",ref_key:"formRef",ref:z,rules:$,class:"page-form"},{default:a(()=>[s(I,{class:"box-card !border-none",shadow:"never"},{default:a(()=>[s(U,{prop:"auth_code"},{default:a(()=>[s(R,{modelValue:v.auth_code,"onUpdate:modelValue":t[3]||(t[3]=l=>v.auth_code=l),placeholder:i(c)("authCodePlaceholder"),class:"input-width",clearable:"",size:"large"},null,8,["modelValue","placeholder"])]),_:1}),e("div",Ze,[s(U,{prop:"auth_secret"},{default:a(()=>[s(R,{modelValue:v.auth_secret,"onUpdate:modelValue":t[4]||(t[4]=l=>v.auth_secret=l),clearable:"",placeholder:i(c)("authSecretPlaceholder"),class:"input-width",size:"large"},null,8,["modelValue","placeholder"])]),_:1})]),e("div",et,_(i(c)("authInfoTips")),1),e("div",tt,[s(p,{type:"primary",class:"w-full",size:"large",loading:w.value,onClick:t[5]||(t[5]=l=>M(z.value))},{default:a(()=>[d(_(i(c)("confirm")),1)]),_:1},8,["loading"])]),e("div",at,[s(p,{type:"primary",link:"",onClick:D},{default:a(()=>[d(_(i(c)("notHaveAuth")),1)]),_:1})])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])])])]),_:1})),y.value?E("",!0):(n(),x(I,{key:1,class:"box-card !border-none",shadow:"never"},{default:a(()=>[st,s(Q,null,{default:a(()=>[(n(!0),k(oe,null,le(V.value,(l,ee)=>(n(),x(K,{timestamp:l.release_time+" 版本："+l.version_no,type:"primary",hollow:!0,placement:"top",key:ee},{default:a(()=>[l.upgrade_log?(n(),k("div",ot,[e("div",{innerHTML:l.upgrade_log},null,8,lt)])):E("",!0)]),_:2},1032,["timestamp"]))),128))]),_:1})]),_:1})),s(be,{ref_key:"upgradeRef",ref:T},null,512),s(Ve,{ref_key:"cloudBuildRef",ref:b},null,512)])),[[Z,y.value]])}}});const Vt=Fe(nt,[["__scopeId","data-v-6993491f"]]);export{Vt as default};