import{d as N,r as C,c as z,e as a,f as A,y as t,x as o,g as e,B as k,u as s,i as X,F as L,z as U,n as G,bl as ee,bm as te,v as D,A as E,V as oe,o as be,w as se,H as J,Q,bo as xe,Z as he}from"./base-9962c822.js";import{E as ne,c as ae,a as we,d as ve}from"./index-c4e33d8d.js";/* empty css                     *//* empty css                   *//* empty css                  *//* empty css               */import{_ as Z}from"./index.vue_vue_type_script_setup_true_lang-780dd221.js";import{h as ye,G as ke,g as $}from"./index-5c4817f4.js";/* empty css                  *//* empty css                        *//* empty css                 *//* empty css                  *//* empty css                 */import{u as W}from"./system-1108e5c1.js";import{a as y,f as Ce,s as F}from"./storage-0874d153.js";import{t as w,a as De,u as le}from"./index-6e46fb55.js";import{ab as Ye,ac as Ve,a9 as Be,aa as ze}from"./sys-361f7d2c.js";import{E as Ge,b as Ee}from"./index-13fd1eb5.js";import{E as Ne}from"./index-83924071.js";import{E as Oe}from"./index-6036b781.js";import{E as K}from"./index-2ee99ba1.js";import{E as Ze}from"./index-b529eb0c.js";import{O as Se,ax as Me}from"./index-57446bef.js";import{_ as P}from"./_plugin-vue_export-helper-c27b6911.js";/* empty css                         *//* empty css                  */import{u as q,b as ie}from"./vue-router-d7e63612.js";import{a as ce,b as re,E as ue}from"./index-3427fe17.js";/* empty css                  */import{u as de,d as We}from"./index-38fee8c5.js";import{E as Te}from"./index-886a23f9.js";import{E as Ie,a as Re}from"./index-20ef35a7.js";import{E as Xe}from"./index-e2acd187.js";import{E as Fe}from"./index-7ab57426.js";/* empty css                */import"./pinia-a9fc3924.js";import"./event-9519ab40.js";import"./index-71b7d8f4.js";import"./index-6b77b11a.js";import"./error-78e43d3e.js";import"./validator-00f31ee7.js";import"./index-1370ab44.js";import"./index-ab38878f.js";import"./index-c98e204a.js";import"./focus-trap-d0fc8554.js";import"./index-19251c17.js";import"./typescript-defaf979.js";import"./index-ec548bfb.js";import"./position-8e494ab3.js";import"./index-df16e899.js";import"./index-6edd46fb.js";import"./debounce-9674000c.js";import"./index-91fda20f.js";import"./scroll-d85c8f38.js";import"./vnode-562dae50.js";import"./dropdown-ccb689be.js";import"./index-2cabf788.js";const Le="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAACHCAYAAABUFMgyAAAABHNCSVQICAgIfAhkiAAACbZJREFUeF7t201oXFUUB/DMRyJNpE0JuJqYTWtQs2pLqxSzcWGiK8FNceOqiLiMOxe1i0IFXdhFIXSli6agoJS6aBEM2o2QlbXFfkBNhRBNbRIyTTOTzHjv8O5wc3Pf55x578y7/0LI1+S8c8/95eTMfdNCH/6hAjmtQCGn68KyUIE+4AaC3FYAuHO7tVhYWrjTug52tHcq0Ox2qlToqOJ0e72I3zsV6Bg/FcqgOFTX6J1tQaZRKxAEOFPcJtqgzwE86na78zgdrwk57PNIVYqLzvZ49TX9e34fR0oKD3KmAn7A48D3LVanuOXP67ht0OXF417Hmd11eKF+3Vl+XX3PfC/LFXlciYPOhGuibkG/d+/eK5VKZWZgYOBEs9ksp7F5Ozs7641GYzWNa+EayStQKBRsMOtbW1s379+//83Ro0cfeXgVcD/kkYBHwW0bMVTHbgOv1WrXy+XypFhAlJjJK4SfzG0FRIPaevbs2ddDQ0MfG91bRx40suyqTRSIto7dxr24uPia6NQ3hOmB3FYdC0u1AuIv8fKDBw/eGh8fv2N0cjWW2MaVPTmG4Q6CXRR/Tr4V48c7mKlT3XsnLiZG2sbGxsb5/fv3f+YBbwR0c2tN4uDWR5GiBC3+jKyhYzthLZNFbm9vr/T3948auP3m8Y46t8TdQi3f1+v1X8SMfSyTVeOizlRgc3PzyuDg4Adiwapz+3XwRLj1jq2AF8WfjSrGEWeMZbZQ4axWLBaHPdwKtt69fU9OoowlCne7a9+9e/f44cOHfwbuzPbcpQs3FxYWjol/ty3dO/CJZRBua8eWI8nTp09n9+3b975LFcZas6vA6urq2YMHD57XurfZwWVyezq4H27zBk27a0vcYtC/UyqVXsxuubiySxUQc/evYu6eMnDrwBPj3gXbw30buF3ile1afXCruVsi7wi3BN5+E537D+DOdsNdurqH+22x5h3LaBILt3m7fRdsEbwkcN8Cbpd4ZbtWDbeErAOX3Vvh3tO9bTO3/jVzJCl5YwlwZ7vfTl1dHGDcFK83mda6tgKeGPeeI0DZteWbeJHULe/OkVNFxmKzqYCHWx9LJG4F2/YS2VaiQZ1bx62PJsCdzR47e1ULbjmK+N2xbNcpCe6yfP2teMHUq85WGwtPtQIebvkCPdmxbTO39WZOXNytsURc7Lq4iXM81RXiYs5WIFXc1Wr1mjhUP+lstbHwVCtg4NZPTPS5O9ZpiW3mbnVu4E51b52/GHA7TyC/BQDu/O6t8ysDbucJ5LcAwJ3fvXV+ZU7jFv9buk+83sV5BHktgDjAmBsZGflQO+M2b7/TnXNzOy0RLwfoEzeW8rq3zq/ryZMnn4+NjZ0Dbucp5K8AwI3OnT/V3oqAG7iB2/h/lIleW4KZO7eOWC4MnRudmyVMiqSAG7gpHLGMAdzAzRImRVLADdwUjljGAG7gZgmTIingBm4KRyxjADdws4RJkRRwAzeFI5YxgBu4WcKkSAq4gZvCEcsYwA3cLGFSJAXcwE3hiGUM4AZuljApkgJu4KZwxDIGcAM3S5gUSQE3cFM4YhkDuIGbJUyKpIAbuCkcsYwB3MDNEiZFUsAN3BSOWMYAbuBmCZMiKeAGbgpHLGMAN3CzhEmRFHADN4UjljGAG7hZwqRICriBm8IRyxjADdwsYVIkBdzATeGIZQzgBm6WMCmSAm7gpnDEMgZwAzdLmBRJATdwUzhiGQO4gZslTIqkgBu4KRyxjAHcwM0SJkVSwA3cFI5YxgBu4GYJkyIp4AZuCkcsYwA3cLOESZEUcAM3hSOWMYAbuFnCpEgKuIGbwhHLGMAN3CxhUiQF3MBN4YhlDOAGbpYwKZICbuCmcMQyBnADN0uYFEkBN3BTOGIZA7iBmyVMiqSAG7gpHLGMAdzAzRImRVLADdwUjljGAG7gZgmTIingBm4KRyxjADdws4RJkRRwAzeFI5YxgBu4WcKkSAq4gZvCEcsYwA3cLGFSJAXcwE3hiGUM4AZuljApkgJu4KZwxDIGcAM3S5gUSQE3cFM4YhkDuIGbJUyKpIAbuCkcsYwB3MDNEiZFUsAN3BSOWMYwcO+IJBveW1N7L3OXn7f/FSyrUV+T7+Vb0XgrV6vVa4ODgye5VKJWq/VtATeX7SDPI03cJYH7R+Am30ME9KnA2tra+dHR0XPi23rXlt2bpHOrDl4SAUsrKyufjIyMfMplN9C5uexEd/JYXFx8b2Ji4oaGWyLXYatxJPJYIjOVI4k+mrRwz8/PT0xOTt7szlLiRwXu+DXrpZ+Ym5sbP3369JLIWc3aqoNLzOpNLikWbnPmlrhbM3ij0fivUCjIjzP/B9yZb0HXEmg2m/8cOHDgJQtsfSxR1w/FLR+oP6nUu3erc0vcGxsb3w0NDb3ZtVXFCAzcMYrVYw8VTybPjo2Nfenhlh3b7NoS+Z6urSM2l+yHW52clCqVSvnhw4d/lUql57OuF3BnvQPdub44AZs/dOjQu+IJpY5aPwZUc3di3Go0MWfv4sLCwhtHjhz5wRtVurPCCFGBO0KReuwhYuxdvXTp0uszMzP6rK1gm8A7wm0772518atXr748NTX1fblcfiGr+gF3VpXvznU3Nzd/unjx4kdnzpz5VxtD/GBbT0qCxhJz7rZ17/aIImf0x48ffzE8PHyqWCw+150l+0cF7rQr3p3r1ev1P5eWlr4Sx35XvBlbgtZn7EhHgCo72x1KPXN1l1J/b96x3HVcODs7W5menj4loJ8QgfpVMPGsN+xaiSsmftP/Xl9ff5Q4AH4w1QqIU7b2qYb4uLa8vPz75cuXf7tw4cKaSETN0WanNkcR8xhwzxrCwCnUqpOb597qc31s0X8R1M+FXSfV4uJiLCpgnk/rWM3XjgS9lmTX8Z/ZmYNWar7ORH+9iT6qmB+bvxTAzcITqyTCcKvvm7fZA2/cJMGtd2ATuO1zs2PruAGdlbFUk9G7rP5E0PxYgTa7uW0USdy5bU8sbdD1zg3YqXrpuYt1Alwu1vd2u1mJKF3U7LrmqGLO4/ovRNDHPbcrSJikAjbcCq16rzq3DbPfz8d+QmkbYXTcti5uggZwEhO5CBIGW8ds69C+Z9q26kTp3H4zuh/yMNy52CUsouMKBEE3EUfu1n5Yo2Rr/jKYwAE7ShXxGFUB88mgrTP7PSa0inE7twroh9yG2+9rocnhAbmugO2Uw2/s8D0RCapQUtxmzKA4VNfI9U47vDg/uIlAdzKW+O0BADuss0tLZ4M7bH3AH1Yh977fMd6wkgFdWIXw/Z6tAHD37NYh8bAKAHdYhfD9nq0AcPfs1iHxsAr8D7xvfQ8bZ0PpAAAAAElFTkSuQmCC",Ue="data:image/png;base64,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",me=b=>(ee("data-v-7620b23f"),b=b(),te(),b),Je={class:"flex"},Ke={class:"setting-item flex items-center justify-between mb-[10px]"},Pe={class:"title text-base text-tx-secondary"},qe={class:""},je=me(()=>e("img",{class:"w-[35px] h-[35px]",src:Le,alt:""},null,-1)),He=me(()=>e("img",{class:"w-[35px] h-[35px]",src:Ue,alt:""},null,-1)),Qe={class:"setting-item flex items-center justify-between mb-[10px]"},$e={class:"title text-base text-tx-secondary"},et={class:""},tt={class:"setting-item flex items-center justify-between mb-[10px]"},ot={class:"title text-base text-tx-secondary"},st={class:""},nt={class:"setting-item mb-[10px]"},at={class:"title text-base text-tx-secondary"},lt={class:"flex mt-[10px] layout-style flex-wrap"},it=["onClick"],ct={class:"absolute z-1 w-[50px] h-[50px] border border-primary-light-5 rounded-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center text-base text-primary-light-5"},rt=["src"],ut=N({__name:"layout-setting",setup(b){const f=C(!1),n=W(),_=C([]),v=C(y.get("layout")||"default");Ye().then(i=>{_.value=i.data}).catch(()=>{});const u=ye(),x=Se(u),c=z({get(){return n.dark},set(i){n.setTheme("dark",i),x(i),F(n.theme,n.dark?"dark":"light")}}),d=z({get(){return n.sidebar},set(i){n.setTheme("sidebar",i),F(n.theme,n.dark?"dark":"light")}}),g=z({get(){return n.theme},set(i){n.setTheme("theme",i),F(n.theme,n.dark?"dark":"light")}}),h=i=>{Ve(i).then(()=>{y.set({key:"layout",data:i}),location.reload()}).catch(()=>{})};return(i,m)=>{const S=Z,M=Ge,Y=Ee,B=Ne,T=Oe,V=K,I=Ze;return a(),A("div",Je,[t(S,{name:"element-Setting",onClick:m[0]||(m[0]=l=>f.value=!0)}),t(I,{modelValue:f.value,"onUpdate:modelValue":m[4]||(m[4]=l=>f.value=l),title:s(w)("layout.layoutSetting"),size:"300px"},{default:o(()=>[t(V,null,{default:o(()=>[e("div",Ke,[e("div",Pe,k(s(w)("layout.sidebarMode")),1),e("div",qe,[t(Y,{modelValue:s(d),"onUpdate:modelValue":m[1]||(m[1]=l=>X(d)?d.value=l:null),class:"ml-4"},{default:o(()=>[t(M,{label:"oneType",size:"large"},{default:o(()=>[je]),_:1}),t(M,{label:"twoType",size:"large"},{default:o(()=>[He]),_:1})]),_:1},8,["modelValue"])])]),e("div",Qe,[e("div",$e,k(s(w)("layout.darkMode")),1),e("div",et,[t(B,{modelValue:s(c),"onUpdate:modelValue":m[2]||(m[2]=l=>X(c)?c.value=l:null),"active-value":!0,"inactive-value":!1},null,8,["modelValue"])])]),e("div",tt,[e("div",ot,k(s(w)("layout.themeColor")),1),e("div",st,[t(T,{modelValue:s(g),"onUpdate:modelValue":m[3]||(m[3]=l=>X(g)?g.value=l:null)},null,8,["modelValue"])])]),e("div",nt,[e("div",at,k(s(w)("layout.layoutStyle")),1),e("div",lt,[(a(!0),A(L,null,U(_.value,(l,r)=>(a(),A("div",{class:G(["relative w-[125px] h-[100px] border mr-[10px] mb-[10px] hover:border-primary",{"border-primary":v.value==l.key}]),onClick:O=>h(l.key)},[e("div",ct,k(l.name),1),e("img",{src:s(Ce)(l.image),alt:"",class:"w-full h-full"},null,8,rt)],10,it))),256))])])]),_:1})]),_:1},8,["modelValue","title"])])}}});const dt=P(ut,[["__scopeId","data-v-7620b23f"]]),mt=N({__name:"switch-lang",setup(b){const f=q(),n=W(),_=v=>{n.$patch(u=>{u.lang=v,y.set({key:"lang",data:v})}),De.loadLocaleMessages(f.path,n.lang),location.reload()};return(v,u)=>{const x=Z,c=ce,d=re,g=ue;return a(),D(g,{onCommand:_,tabindex:1},{dropdown:o(()=>[t(d,null,{default:o(()=>[t(c,{command:"zh-cn",disabled:s(n).lang=="zh-cn"},{default:o(()=>[E("简体中文")]),_:1},8,["disabled"]),t(c,{command:"en",disabled:s(n).lang=="en"},{default:o(()=>[E("English")]),_:1},8,["disabled"])]),_:1})]),default:o(()=>[t(x,{name:"iconfont-iconfanyi"})]),_:1})}}}),pt={class:"userinfo flex h-full items-center"},_t={class:"user-name pl-[8px]"},ft=N({__name:"user-info",setup(b){const f=de(),n=_=>{switch(_){case"logout":f.logout();break}};return(_,v)=>{const u=Te,x=Z,c=oe("router-link"),d=ce,g=re,h=ue;return a(),D(h,{onCommand:n,tabindex:1},{dropdown:o(()=>[t(g,null,{default:o(()=>[t(d,{command:"usercenter"},{default:o(()=>[t(c,{to:"/user/center"},{default:o(()=>[E("个人中心")]),_:1})]),_:1}),t(d,{command:"logout"},{default:o(()=>[E("退出登录")]),_:1})]),_:1})]),default:o(()=>[e("div",pt,[t(u,{size:25,icon:s(Me)},null,8,["icon"]),e("div",_t,k(s(f).userInfo.username),1),t(x,{name:"element-ArrowDown",class:"ml-[5px]"})])]),_:1})}}}),gt={class:"right-panel h-full flex items-center justify-end"},At=["title"],bt={class:"navbar-item flex items-center h-full cursor-pointer"},xt={class:"navbar-item flex items-center h-full cursor-pointer"},ht={class:"navbar-item flex items-center h-full cursor-pointer"},wt={class:"dialog-footer"},vt={class:"flex flex-wrap"},yt=["onClick"],kt=["onClick"],Ct={class:"dialog-footer"},Dt=N({__name:"index",setup(b){const f=ie(),n=y.get("app_type"),{toggle:_,isFullscreen:v}=ke(),u=W(),x=le(),c=q(),d=C(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth),g=z(()=>u.dark),h=C(!1),i=C(""),m=C("");y.get("comparisonTokenStorage")&&(i.value=y.get("comparisonTokenStorage")),y.get("comparisonSiteIdStorage")&&(m.value=y.get("comparisonSiteIdStorage")),document.addEventListener("visibilitychange",l=>{document.visibilityState==="visible"&&(m.value!=y.get("siteId")||i.value!=y.get("token"))&&(h.value=!0)});const S=()=>{h.value=!1,location.reload()};be(()=>{window.onresize=()=>(()=>{d.value=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth})()}),se(d,()=>{d.value<992?u.menuIsCollapse||u.toggleMenuCollapse(!0):u.menuIsCollapse&&u.toggleMenuCollapse(!1)});const M=()=>{x.routeRefreshTag&&x.refreshRouterView()};z(()=>{const l=c.matched.filter(r=>r.meta.title);return l[0]&&l[0].path=="/"&&l.splice(0,1),l});const Y=C(),B=C(!1),T=()=>{Be().then(l=>{B.value=!0,Y.value=l.data;for(let r=0;r<Y.value.length;r++)Y.value[r].is_use==1&&(V.value=Y.value[r].view_path)})},V=C(""),I=()=>{ze({view_path:V.value}).then(()=>{B.value=!1,f.go(0)})};return(l,r)=>{const O=Z,_e=Ie,fe=Re,j=Fe,H=Xe,ge=ne;return a(),D(ge,{class:G(["h-full px-[10px]",{"layout-header border-b border-color":!s(g)}])},{default:o(()=>[t(fe,{class:"w-100 h-full w-full",justify:"end"},{default:o(()=>[t(_e,{span:12},{default:o(()=>[e("div",gt,[e("div",{class:"navbar-item flex items-center h-full cursor-pointer",onClick:M},[t(O,{name:"element-Refresh"})]),s(n)=="site"?(a(),A("i",{key:0,class:"iconfont iconlingdang-xianxing cursor-pointer px-[8px]",title:s(w)("newInfo")},null,8,At)):J("",!0),s(n)=="site"?(a(),A("div",{key:1,class:"navbar-item flex items-center h-full cursor-pointer",onClick:T},[t(O,{name:"iconfont-iconqiehuan",title:s(w)("indexSwitch")},null,8,["title"])])):J("",!0),e("div",bt,[t(mt)]),e("div",{class:"navbar-item flex items-center h-full cursor-pointer",onClick:r[0]||(r[0]=(...p)=>s(_)&&s(_)(...p))},[s(v)?(a(),D(O,{key:0,name:"iconfont-icontuichuquanping"})):(a(),D(O,{key:1,name:"iconfont-iconquanping"}))]),e("div",xt,[t(dt)]),e("div",ht,[t(ft)])])]),_:1})]),_:1}),Q(e("input",{type:"hidden","onUpdate:modelValue":r[1]||(r[1]=p=>i.value=p)},null,512),[[$,i.value]]),Q(e("input",{type:"hidden","onUpdate:modelValue":r[2]||(r[2]=p=>m.value=p)},null,512),[[$,m.value]]),t(H,{modelValue:h.value,"onUpdate:modelValue":r[3]||(r[3]=p=>h.value=p),title:s(w)("layout.detectionLoginTip"),width:"30%","close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1},{footer:o(()=>[e("span",wt,[t(j,{onClick:S},{default:o(()=>[E(k(s(w)("layout.detectionLoginOperation")),1)]),_:1})])]),default:o(()=>[e("span",null,k(s(w)("layout.detectionLoginContent")),1)]),_:1},8,["modelValue","title"]),t(H,{modelValue:B.value,"onUpdate:modelValue":r[4]||(r[4]=p=>B.value=p),title:s(w)("indexTemplate"),width:"550px","destroy-on-close":!0},{footer:o(()=>[e("span",Ct,[t(j,{type:"primary",onClick:I},{default:o(()=>[E(k(s(w)("confirm")),1)]),_:1})])]),default:o(()=>[e("div",vt,[V.value==""?(a(!0),A(L,{key:0},U(Y.value,(p,R)=>(a(),A("div",{key:R},[e("div",{onClick:Ae=>V.value=p.view_path,class:G(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer",p.is_use==1?"bg-primary text-[#fff]":""])},[e("span",null,k(p.name),1)],10,yt)]))),128)):(a(!0),A(L,{key:1},U(Y.value,(p,R)=>(a(),A("div",{key:R},[e("div",{onClick:Ae=>V.value=p.view_path,class:G(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer",V.value==p.view_path?"bg-primary text-[#fff]":""])},[e("span",null,k(p.name),1)],10,kt)]))),128))])]),_:1},8,["modelValue","title"])]),_:1},8,["class"])}}});const Yt=P(Dt,[["__scopeId","data-v-2eabe7ac"]]),Vt=""+new URL("login_logo-95c4c371.png",import.meta.url).href,pe=b=>(ee("data-v-57bf2e29"),b=b(),te(),b),Bt={class:""},zt={key:0,class:"logo flex items-center m-auto max-w-[230px] h-[60px] justify-center"},Gt=["src"],Et={key:1,class:"max-h-full max-w-full",src:Vt,alt:""},Nt={key:1,class:"logo flex items-center justify-center w-[64px] h-[30px]"},Ot=pe(()=>e("i",{class:"text-3xl iconfont iconyunkongjian"},null,-1)),Zt=[Ot],St=pe(()=>e("span",{class:G(["ml-[15px] text-[14px] ease-in duration-200"])},"站点列表",-1)),Mt=N({__name:"index",setup(b){const f=de(),n=W(),_=q(),v=ie(),u=z(()=>(console.log("route.name",_.name),String(_.name)));console.log("userStore.routers",f.routers,u),se(_,()=>{n.$patch(c=>{c.menuDrawer=!1})});const x=c=>{v.push({path:c})};return(c,d)=>{const g=ae,h=Z,i=K,m=we;return a(),D(m,{class:"h-screen group layout-aside w-[80px] bg-[#F7F8FA] w-[230px] ease-in duration-200"},{default:o(()=>[e("div",Bt,[t(g,{class:"logo-wrap w-100 h-auto mb-[30px]"},{default:o(()=>[s(n).menuIsCollapse?(a(),A("div",Nt,Zt)):(a(),A("div",zt,[s(y).get("siteInfo").logo?(a(),A("img",{key:0,class:"max-h-full max-w-full",src:c.img(c.siteInfo.logo),alt:""},null,8,Gt)):(a(),A("img",Et))]))]),_:1}),t(i,{"max-height":"calc(100vh - 90px)"},{default:o(()=>[e("div",{onClick:d[0]||(d[0]=S=>x("/index")),class:G(["flex items-center py-[10px] px-[30px] mb-[8px] cursor-pointer text-[#989898] menu-item whitespace-nowrap",{"bg-color text-color":s(u)=="Symbol(homeIndex)"}])},[t(h,{name:"element-Memo",class:"!w-auto",size:"24px"}),St],2)]),_:1})])]),_:1})}}});const Wt=P(Mt,[["__scopeId","data-v-57bf2e29"]]),Tt={class:"common-layout min-w-[1200px]"},It={class:"p-[10px]"},Uo=N({__name:"index",setup(b){const f=le(),n=We();return(_,v)=>{const u=ae,x=oe("router-view"),c=K,d=ve,g=ne;return a(),A("div",Tt,[t(g,{class:"w-100 h-screen"},{default:o(()=>[t(Wt),t(g,null,{default:o(()=>[t(u,{class:"h-[60px]"},{default:o(()=>[t(Yt)]),_:1}),t(d,{class:"main-wrap h-full p-0"},{default:o(()=>[t(c,null,{default:o(()=>[e("div",It,[s(f).routeRefreshTag?(a(),D(x,{key:0},{default:o(({Component:h,route:i})=>[(a(),D(xe,{include:s(n).tabNames},[(a(),D(he(h),{key:i.fullPath}))],1032,["include"]))]),_:1})):J("",!0)])]),_:1})]),_:1})]),_:1})]),_:1})])}}});export{Uo as default};
