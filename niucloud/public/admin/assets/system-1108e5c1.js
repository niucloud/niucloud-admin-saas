import{d as r}from"./pinia-a9fc3924.js";import{a}from"./storage-0874d153.js";import{f as m}from"./index-5c4817f4.js";const s=a.get("theme")??{},l=r("system",{state:()=>({menuIsCollapse:!1,menuDrawer:!1,dark:s.dark??!1,theme:s.theme??"#273de3",sidebar:s.sidebar??"oneType",lang:a.get("lang")??"zh-cn",sidebarStyle:s.sidebarStyle??"threeType",currHeadMenuName:""}),actions:{setHeadMenu(e){this.currHeadMenuName=e},setTheme(e,t){this[e]=t,s[e]=t,a.set({key:"theme",data:s})},toggleMenuCollapse(e){this.menuIsCollapse=e,a.set({key:"menuiscollapse",data:e}),m("--aside-width").value=e?"calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)":"210px"}}});export{l as u};
