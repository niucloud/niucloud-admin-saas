import{d as K,O as S,n as D,N as t,r as V,h as s,c as d,e as l,w as n,a as h,t as i,u as o,F as N,G as F,I as y,i as k,y as G,B as w,W as H,X as M,as as W,cP as X,aF as q,cK as A,E as J,Y as Q,$ as Z,ah as ee,aj as te,at as ae,a0 as le}from"./index-4dcc0234.js";/* empty css                   *//* empty css                      *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                        *//* empty css                    */import"./el-tooltip-4ed993c7.js";/* empty css                *//* empty css                *//* empty css                  *//* empty css                       */import"./el-form-item-4ed993c7.js";import{c as T}from"./notice-b720dec8.js";import{_ as oe}from"./notice-records-info.vue_vue_type_script_setup_true_lang-211a8b60.js";/* empty css                   */const re={class:"main-container"},ne={class:"flex justify-between items-center"},se={class:"text-[20px]"},ie={class:"mt-[10px]"},ce={key:0},pe={key:1},me={key:2},de={class:"mt-[16px] flex justify-end"},je=K({__name:"notice_records",setup(ue){const L=S().meta.title,e=D({page:1,limit:10,total:0,loading:!0,data:[],searchParam:{key:"",receiver:"",create_time:[]}}),f=D({buyer:{label:t("buyerNotice"),list:[]},seller:{label:t("sellerNotice"),list:[]}});(async()=>{await T().then(c=>{Object.keys(c.data).forEach(a=>{const b=c.data[a],p={value:a,name:b.name};b.receiver_type==0?f.buyer.list.push(p):f.seller.list.push(p)})}).catch(()=>{})})();const E=V(),u=(c=1)=>{e.loading=!0,e.page=c,T({page:e.page,limit:e.limit,...e.searchParam}).then(a=>{e.loading=!1,e.data=a.data.data,e.total=a.data.total}).catch(()=>{e.loading=!1})};u();const g=V(null),z=c=>{g.value.setFormData(c),g.value.showDialog=!0};return(c,a)=>{const b=H,p=M,x=W,B=X,$=q,j=A,v=J,U=Q,P=Z,m=ee,Y=te,I=ae,O=le;return s(),d("div",re,[l(P,{class:"box-card !border-none",shadow:"never"},{default:n(()=>[h("div",ne,[h("span",se,i(o(L)),1)]),l(P,{class:"box-card !border-none my-[10px] table-search-wrap",shadow:"never"},{default:n(()=>[l(U,{inline:!0,model:e.searchParam,ref_key:"searchFormRef",ref:E},{default:n(()=>[l(p,{label:o(t)("searchReceiver"),prop:"receiver"},{default:n(()=>[l(b,{modelValue:e.searchParam.receiver,"onUpdate:modelValue":a[0]||(a[0]=r=>e.searchParam.receiver=r),placeholder:o(t)("receiverPlaceholder")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),l(p,{label:o(t)("noticeKey"),prop:"key"},{default:n(()=>[l($,{modelValue:e.searchParam.key,"onUpdate:modelValue":a[1]||(a[1]=r=>e.searchParam.key=r),clearable:"",placeholder:o(t)("groupIdPlaceholder"),class:"input-width"},{default:n(()=>[l(x,{label:o(t)("selectPlaceholder"),value:""},null,8,["label"]),(s(!0),d(N,null,F(f,(r,_)=>(s(),y(B,{key:_,label:r.label},{default:n(()=>[(s(!0),d(N,null,F(r.list,(C,R)=>(s(),y(x,{label:C.name,value:C.value,key:R},null,8,["label","value"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),l(p,{label:o(t)("createTime"),prop:"create_time"},{default:n(()=>[l(j,{modelValue:e.searchParam.create_time,"onUpdate:modelValue":a[2]||(a[2]=r=>e.searchParam.create_time=r),type:"datetimerange","value-format":"YYYY-MM-DD HH:mm:ss","start-placeholder":o(t)("startDate"),"end-placeholder":o(t)("endDate")},null,8,["modelValue","start-placeholder","end-placeholder"])]),_:1},8,["label"]),l(p,null,{default:n(()=>[l(v,{type:"primary",onClick:a[3]||(a[3]=r=>u())},{default:n(()=>[k(i(o(t)("search")),1)]),_:1}),l(v,{onClick:a[4]||(a[4]=r=>{var _;return(_=E.value)==null?void 0:_.resetFields()})},{default:n(()=>[k(i(o(t)("reset")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1}),h("div",ie,[G((s(),y(Y,{data:e.data,size:"large"},{empty:n(()=>[h("span",null,i(e.loading?"":o(t)("emptyData")),1)]),default:n(()=>[l(m,{prop:"name",label:o(t)("noticeKey"),"min-width":"120"},null,8,["label"]),l(m,{prop:"notice_type",label:o(t)("noticeType"),"min-width":"120"},{default:n(({row:r})=>[r.notice_type=="sms"?(s(),d("div",ce,i(o(t)("sms")),1)):w("",!0),r.notice_type=="wechat"?(s(),d("div",pe,i(o(t)("wechat")),1)):w("",!0),r.notice_type=="weapp"?(s(),d("div",me,i(o(t)("weapp")),1)):w("",!0)]),_:1},8,["label"]),l(m,{prop:"nickname",label:o(t)("nickname"),"min-width":"120"},null,8,["label"]),l(m,{prop:"receiver",label:o(t)("receiver"),"min-width":"120"},null,8,["label"]),l(m,{prop:"create_time",label:o(t)("createTime"),"min-width":"140"},null,8,["label"]),l(m,{label:o(t)("operation"),align:"right",fixed:"right",width:"100"},{default:n(({row:r})=>[l(v,{type:"primary",link:"",onClick:_=>z(r)},{default:n(()=>[k(i(o(t)("info")),1)]),_:2},1032,["onClick"])]),_:1},8,["label"])]),_:1},8,["data"])),[[O,e.loading]]),h("div",de,[l(I,{"current-page":e.page,"onUpdate:current-page":a[5]||(a[5]=r=>e.page=r),"page-size":e.limit,"onUpdate:page-size":a[6]||(a[6]=r=>e.limit=r),layout:"total, sizes, prev, pager, next, jumper",total:e.total,onSizeChange:a[7]||(a[7]=r=>u()),onCurrentChange:u},null,8,["current-page","page-size","total"])])]),l(oe,{ref_key:"recordsDialog",ref:g,onComplete:u},null,512)]),_:1})])}}});export{je as default};