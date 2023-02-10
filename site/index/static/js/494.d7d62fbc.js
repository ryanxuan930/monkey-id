"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[494],{494:function(t,e,a){a.r(e),a.d(e,{default:function(){return L}});a(7658);var i=a(3396),s=a(7139);const o={class:"bg-orange-50 h-screen flex flex-col overflow-auto"},l=(0,i._)("div",{class:"flex-grow sm:min-h-[1em]"},null,-1),n={class:"bg-white sm:shadow p-8 sm:p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto text-gray-600 text-left"},r={class:"text-4xl font-medium mb-1"},u={class:"text-lg text-gray-500"},d={class:"text-lg text-gray-500"},c={class:"p-3 border-2 border-gray-300 rounded-xl my-5"},f=(0,i._)("div",{class:"text-2xl font-medium text-gray-700"},"尚未驗證",-1),m=(0,i._)("div",{class:"text-2xl font-medium text-orange-600"},"審核中",-1),v={class:"text-lg text-gray-500"},g=(0,i._)("div",{class:"text-2xl font-medium text-red-700"},"審核未通過",-1),x={class:"text-lg text-gray-500"},y=(0,i._)("div",{class:"text-2xl font-medium text-green-700"},"身份有效",-1),_={class:"text-lg text-gray-500"},w=(0,i._)("div",{class:"flex-grow sm:min-h-[1em]"},null,-1);function h(t,e,a,h,b,k){return(0,i.wg)(),(0,i.iD)("div",o,[l,(0,i._)("div",n,[(0,i._)("div",r,(0,s.zw)(t.data.name),1),(0,i._)("div",u,(0,s.zw)(t.data.univ_name_ch_full),1),(0,i._)("div",d,(0,s.zw)(t.identityList[t.data.identity]),1),(0,i._)("div",c,[0==t.data.verification?((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[f,(0,i._)("button",{class:"round-full-button",onClick:e[0]||(e[0]=e=>t.$router.push("verify"))},"立即驗證")],64)):1==t.data.verification||3==t.data.verification?((0,i.wg)(),(0,i.iD)(i.HY,{key:1},[m,(0,i._)("div",v,(0,s.zw)(t.statusList[t.data.verification]),1),(0,i._)("button",{class:"round-full-button",onClick:e[1]||(e[1]=e=>t.$router.push("verify"))},"重新驗證")],64)):2==t.data.verification||t.data.verification>3&&t.data.verification<9?((0,i.wg)(),(0,i.iD)(i.HY,{key:2},[g,(0,i._)("div",x,(0,s.zw)(t.statusList[t.data.verification]),1),(0,i._)("button",{class:"round-full-button",onClick:e[2]||(e[2]=e=>t.$router.push("verify"))},"重新驗證")],64)):9==t.data.verification?((0,i.wg)(),(0,i.iD)(i.HY,{key:3},[y,(0,i._)("div",_,"有效期限："+(0,s.zw)(t.data.valid_until),1),(0,i._)("button",{class:"round-full-button",onClick:e[3]||(e[3]=e=>t.$router.push("verify"))},"重新驗證")],64)):(0,i.kq)("",!0)]),(0,i._)("button",{class:"round-full-button",onClick:e[4]||(e[4]=(...e)=>t.logout&&t.logout(...e))},"登出")]),w])}var b=a(4870),k=a(6895),p=a(65),C=a(2483),z=(0,i.aZ)({setup(){const t=(0,p.oR)(),e=(0,C.tv)(),a=new k.Z(t.state.token),i=(0,b.iH)({});function s(){a.Post("auth/user/logout",null),t.commit("reset");try{localStorage.getItem("monkeyIdTemp")&&localStorage.removeItem("monkeyIdTemp")}catch(i){console.log(i)}e.push("/login")}return a.Get("auth/user/info",i,!0,!0).then((t=>{"Unauthenticated."===t.message&&(alert("請重新登入"),s())})),{data:i,logout:s,identityList:["在校學生","教職員","畢業校友"],statusList:["尚未驗證","已發送驗證信","驗證失敗","人工審核中","資料無法辨識","資料不符","資料已過期","請聯繫管理員","請重新驗證","審核通過"]}}}),D=a(89);const H=(0,D.Z)(z,[["render",h]]);var L=H}}]);
//# sourceMappingURL=494.d7d62fbc.js.map