import{b as n}from"./index-e026a545.js";function r(e){return n.get("pay/refund",{params:e})}function u(e){return n.get(`pay/refund/${e}`)}function a(){return n.get("pay/refund/type")}function f(e){return n.post("pay/refund/transfer",e,{showSuccessMessage:!0})}export{a,u as b,f as c,r as g};