"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[431],{431:function(t,e,s){s.r(e),s.d(e,{default:function(){return y}});s(7658);var l=s(3396),n=s(7139);const o={class:"bg-orange-50 h-screen flex flex-col overflow-auto"},a=(0,l._)("div",{class:"flex-grow min-h-[1em]"},null,-1),u={class:"bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto text-gray-600 text-left"},i={class:"text-4xl font-medium mb-1"},r={class:"text-lg text-gray-500"},c={class:"text-lg text-gray-500"},m=(0,l._)("hr",{class:"my-5"},null,-1),d={key:0,class:"round-full-button"},g=(0,l._)("hr",{class:"my-5"},null,-1),f=(0,l._)("div",{class:"flex-grow min-h-[1em]"},null,-1);function h(t,e,s,h,w,v){return(0,l.wg)(),(0,l.iD)("div",o,[a,(0,l._)("div",u,[(0,l._)("div",i,(0,n.zw)(t.data.name),1),(0,l._)("div",r,(0,n.zw)(t.data.univ_name_ch_full),1),(0,l._)("div",c,(0,n.zw)(t.permissionList[t.data.permission]),1),m,(0,l._)("button",{class:"round-full-button",onClick:e[0]||(e[0]=e=>t.$router.push("/admin/user"))},"使用者列表"),t.data.permission>2?((0,l.wg)(),(0,l.iD)("button",d,"管理員列表")):(0,l.kq)("",!0),g,(0,l._)("button",{class:"round-full-button",onClick:e[1]||(e[1]=(...e)=>t.logout&&t.logout(...e))},"登出")]),f])}var w=s(4870),v=s(6895),p=s(65),x=s(2483),_=(0,l.aZ)({setup(t){const e=(0,p.oR)(),s=(0,x.tv)(),l=new v.Z(e.state.token),n=(0,w.iH)({});function o(){l.Post("auth/user/logout",null),e.commit("reset");try{localStorage.getItem("monkeyIdTemp")&&localStorage.removeItem("monkeyIdTemp")}catch(t){console.log(t)}s.push("/login/admin")}return l.Get("auth/admin/info",n,!0,!0).then((t=>{"Unauthenticated."===t.message&&(alert("請重新登入"),o())})),{data:n,logout:o,permissionList:["一般管理員","組織管理員","系統管理員","","","","","","","超級管理員"]}}}),b=s(89);const k=(0,b.Z)(_,[["render",h]]);var y=k}}]);
//# sourceMappingURL=431.ea49ee5a.js.map