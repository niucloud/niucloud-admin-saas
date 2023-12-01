import{_ as e}from"./u-loading-icon.09b095f3.js";import{U as t,V as o,W as n,p as a,q as i,h as s,i as r,w as l,E as p,F as u,j as d,n as h,J as g,K as m,l as c,S as b,H as f,M as y,aU as S}from"./index-68f0d32f.js";import{_ as x}from"./u-icon.076424c8.js";import{_ as T}from"./_plugin-vue_export-helper.1b428a4d.js";const v=T({name:"u-button",mixins:[o,n,{props:{hairline:{type:Boolean,default:t.button.hairline},type:{type:String,default:t.button.type},size:{type:String,default:t.button.size},shape:{type:String,default:t.button.shape},plain:{type:Boolean,default:t.button.plain},disabled:{type:Boolean,default:t.button.disabled},loading:{type:Boolean,default:t.button.loading},loadingText:{type:[String,Number],default:t.button.loadingText},loadingMode:{type:String,default:t.button.loadingMode},loadingSize:{type:[String,Number],default:t.button.loadingSize},openType:{type:String,default:t.button.openType},formType:{type:String,default:t.button.formType},appParameter:{type:String,default:t.button.appParameter},hoverStopPropagation:{type:Boolean,default:t.button.hoverStopPropagation},lang:{type:String,default:t.button.lang},sessionFrom:{type:String,default:t.button.sessionFrom},sendMessageTitle:{type:String,default:t.button.sendMessageTitle},sendMessagePath:{type:String,default:t.button.sendMessagePath},sendMessageImg:{type:String,default:t.button.sendMessageImg},showMessageCard:{type:Boolean,default:t.button.showMessageCard},dataName:{type:String,default:t.button.dataName},throttleTime:{type:[String,Number],default:t.button.throttleTime},hoverStartTime:{type:[String,Number],default:t.button.hoverStartTime},hoverStayTime:{type:[String,Number],default:t.button.hoverStayTime},text:{type:[String,Number],default:t.button.text},icon:{type:String,default:t.button.icon},iconColor:{type:String,default:t.button.icon},color:{type:String,default:t.button.color}}}],data:()=>({}),computed:{bemClass(){return this.color?this.bem("button",["shape","size"],["disabled","plain","hairline"]):this.bem("button",["type","shape","size"],["disabled","plain","hairline"])},loadingColor(){return this.plain?this.color?this.color:uni.$u.config.color[`u-${this.type}`]:"info"===this.type?"#c9c9c9":"rgb(200, 200, 200)"},iconColorCom(){return this.iconColor?this.iconColor:this.plain?this.color?this.color:this.type:"info"===this.type?"#000000":"#ffffff"},baseColor(){let e={};return this.color&&(e.color=this.plain?this.color:"white",this.plain||(e["background-color"]=this.color),-1!==this.color.indexOf("gradient")?(e.borderTopWidth=0,e.borderRightWidth=0,e.borderBottomWidth=0,e.borderLeftWidth=0,this.plain||(e.backgroundImage=this.color)):(e.borderColor=this.color,e.borderWidth="1px",e.borderStyle="solid")),e},nvueTextStyle(){let e={};return"info"===this.type&&(e.color="#323233"),this.color&&(e.color=this.plain?this.color:"white"),e.fontSize=this.textSize+"px",e},textSize(){let e=14,{size:t}=this;return"large"===t&&(e=16),"normal"===t&&(e=14),"small"===t&&(e=12),"mini"===t&&(e=10),e}},emits:["click","getphonenumber","getuserinfo","error","opensetting","launchapp"],methods:{clickHandler(){this.disabled||this.loading||uni.$u.throttle((()=>{this.$emit("click")}),this.throttleTime)},getphonenumber(e){this.$emit("getphonenumber",e)},getuserinfo(e){this.$emit("getuserinfo",e)},error(e){this.$emit("error",e)},opensetting(e){this.$emit("opensetting",e)},launchapp(e){this.$emit("launchapp",e)}}},[["render",function(t,o,n,T,v,z){const C=a(i("u-loading-icon"),e),M=y,_=a(i("u-icon"),x),k=S;return s(),r(k,{"hover-start-time":Number(t.hoverStartTime),"hover-stay-time":Number(t.hoverStayTime),"form-type":t.formType,"open-type":t.openType,"app-parameter":t.appParameter,"hover-stop-propagation":t.hoverStopPropagation,"send-message-title":t.sendMessageTitle,"send-message-path":t.sendMessagePath,lang:t.lang,"data-name":t.dataName,"session-from":t.sessionFrom,"send-message-img":t.sendMessageImg,"show-message-card":t.showMessageCard,onGetphonenumber:z.getphonenumber,onGetuserinfo:z.getuserinfo,onError:z.error,onOpensetting:z.opensetting,onLaunchapp:z.launchapp,"hover-class":t.disabled||t.loading?"":"u-button--active",class:f(["u-button u-reset-button",z.bemClass]),style:h([z.baseColor,t.$u.addStyle(t.customStyle)]),onClick:z.clickHandler},{default:l((()=>[t.loading?(s(),p(u,{key:0},[d(C,{mode:t.loadingMode,size:1.15*t.loadingSize,color:z.loadingColor},null,8,["mode","size","color"]),d(M,{class:"u-button__loading-text",style:h([{fontSize:z.textSize+"px"}])},{default:l((()=>[g(m(t.loadingText||t.text),1)])),_:1},8,["style"])],64)):(s(),p(u,{key:1},[t.icon?(s(),r(_,{key:0,name:t.icon,color:z.iconColorCom,size:1.35*z.textSize,customStyle:{marginRight:"2px"}},null,8,["name","color","size"])):c("v-if",!0),b(t.$slots,"default",{},(()=>[d(M,{class:"u-button__text",style:h([{fontSize:z.textSize+"px"}])},{default:l((()=>[g(m(t.text),1)])),_:1},8,["style"])]),!0)],64))])),_:3},8,["hover-start-time","hover-stay-time","form-type","open-type","app-parameter","hover-stop-propagation","send-message-title","send-message-path","lang","data-name","session-from","send-message-img","show-message-card","onGetphonenumber","onGetuserinfo","onError","onOpensetting","onLaunchapp","hover-class","style","onClick","class"])}],["__scopeId","data-v-6b0695bb"]]);export{v as _};
