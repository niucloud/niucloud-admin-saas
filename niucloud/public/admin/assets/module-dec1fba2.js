import{a2 as e}from"./index-30b146d4.js";function r(){return e.get("niucloud/authinfo",{showErrorMessage:!1})}function s(o){return e.post("niucloud/authinfo",o,{showSuccessMessage:!0})}function t(o){return e.post(`addon/download/${o.addon}`,o,{showSuccessMessage:!0})}function u(){return e.get("niucloud/framework/newversion")}function i(){return e.get("niucloud/framework/version/list")}export{r as a,u as b,t as d,i as g,s};