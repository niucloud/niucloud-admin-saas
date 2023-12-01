import{U as o,V as t,W as e,p as l,q as a,h as n,i as s,w as r,j as u,n as i,J as c,K as d,l as m,S as p,E as _,F as f,H as y,M as h,t as w}from"./index-68f0d32f.js";import{_ as g}from"./u-line.369f4784.js";import{_ as C}from"./u-loading-icon.09b095f3.js";import{_ as v}from"./u-popup.ac9ec85b.js";import{_ as B}from"./_plugin-vue_export-helper.1b428a4d.js";const k=B({name:"u-modal",mixins:[t,e,{props:{show:{type:Boolean,default:o.modal.show},title:{type:[String],default:o.modal.title},content:{type:String,default:o.modal.content},confirmText:{type:String,default:o.modal.confirmText},cancelText:{type:String,default:o.modal.cancelText},showConfirmButton:{type:Boolean,default:o.modal.showConfirmButton},showCancelButton:{type:Boolean,default:o.modal.showCancelButton},confirmColor:{type:String,default:o.modal.confirmColor},cancelColor:{type:String,default:o.modal.cancelColor},buttonReverse:{type:Boolean,default:o.modal.buttonReverse},zoom:{type:Boolean,default:o.modal.zoom},asyncClose:{type:Boolean,default:o.modal.asyncClose},closeOnClickOverlay:{type:Boolean,default:o.modal.closeOnClickOverlay},negativeTop:{type:[String,Number],default:o.modal.negativeTop},width:{type:[String,Number],default:o.modal.width},confirmButtonShape:{type:String,default:o.modal.confirmButtonShape}}}],data:()=>({loading:!1}),watch:{show(o){o&&this.loading&&(this.loading=!1)}},methods:{confirmHandler(){this.asyncClose&&(this.loading=!0),this.$emit("confirm")},cancelHandler(){this.$emit("cancel")},clickHandler(){this.closeOnClickOverlay&&this.$emit("close")}}},[["render",function(o,t,e,B,k,b){const x=h,S=w,O=l(a("u-line"),g),T=l(a("u-loading-icon"),C),$=l(a("u-popup"),v);return n(),s($,{mode:"center",zoom:o.zoom,show:o.show,customStyle:{borderRadius:"6px",overflow:"hidden",marginTop:`-${o.$u.addUnit(o.negativeTop)}`},closeOnClickOverlay:o.closeOnClickOverlay,safeAreaInsetBottom:!1,duration:400,onClick:b.clickHandler},{default:r((()=>[u(S,{class:"u-modal",style:i({width:o.$u.addUnit(o.width)})},{default:r((()=>[o.title?(n(),s(x,{key:0,class:"u-modal__title"},{default:r((()=>[c(d(o.title),1)])),_:1})):m("v-if",!0),u(S,{class:"u-modal__content",style:i({paddingTop:(o.title?12:25)+"px"})},{default:r((()=>[p(o.$slots,"default",{},(()=>[u(x,{class:"u-modal__content__text"},{default:r((()=>[c(d(o.content),1)])),_:1})]),!0)])),_:3},8,["style"]),o.$slots.confirmButton?(n(),s(S,{key:1,class:"u-modal__button-group--confirm-button"},{default:r((()=>[p(o.$slots,"confirmButton",{},void 0,!0)])),_:3})):(n(),_(f,{key:2},[u(O),u(S,{class:"u-modal__button-group",style:i({flexDirection:o.buttonReverse?"row-reverse":"row"})},{default:r((()=>[o.showCancelButton?(n(),s(S,{key:0,class:y(["u-modal__button-group__wrapper u-modal__button-group__wrapper--cancel",[o.showCancelButton&&!o.showConfirmButton&&"u-modal__button-group__wrapper--only-cancel"]]),"hover-stay-time":150,"hover-class":"u-modal__button-group__wrapper--hover",onClick:b.cancelHandler},{default:r((()=>[u(x,{class:"u-modal__button-group__wrapper__text",style:i({color:o.cancelColor})},{default:r((()=>[c(d(o.cancelText),1)])),_:1},8,["style"])])),_:1},8,["class","onClick"])):m("v-if",!0),o.showConfirmButton&&o.showCancelButton?(n(),s(O,{key:1,direction:"column"})):m("v-if",!0),o.showConfirmButton?(n(),s(S,{key:2,class:y(["u-modal__button-group__wrapper u-modal__button-group__wrapper--confirm",[!o.showCancelButton&&o.showConfirmButton&&"u-modal__button-group__wrapper--only-confirm"]]),"hover-stay-time":150,"hover-class":"u-modal__button-group__wrapper--hover",onClick:b.confirmHandler},{default:r((()=>[k.loading?(n(),s(T,{key:0})):(n(),s(x,{key:1,class:"u-modal__button-group__wrapper__text",style:i({color:o.confirmColor})},{default:r((()=>[c(d(o.confirmText),1)])),_:1},8,["style"]))])),_:1},8,["class","onClick"])):m("v-if",!0)])),_:1},8,["style"])],64))])),_:3},8,["style"])])),_:3},8,["zoom","show","customStyle","closeOnClickOverlay","onClick"])}],["__scopeId","data-v-4425533b"]]);export{k as _};
