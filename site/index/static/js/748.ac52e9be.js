"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[748],{9748:function(t,e,a){a.r(e),a.d(e,{default:function(){return A}});var s=a(3396),l=a(9242),n=a(5427);const o={class:"bg-orange-50 h-screen flex flex-col overflow-auto"},i=(0,s._)("div",{class:"flex-grow"},null,-1),u={class:"bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto"},c=(0,s._)("img",{src:n,alt:"monkey id",class:"inline-block w-full m-auto max-h-24 p-0"},null,-1),d=(0,s._)("div",{class:"text-2xl text-gray-500"},"管理員登入",-1),r={class:"round-input-label"},m=(0,s._)("div",{class:"title"},"帳號",-1),p={class:"round-input-label"},f=(0,s._)("div",{class:"title"},"密碼",-1),w=(0,s._)("div",{class:"flex-grow"},null,-1);function g(t,e,a,n,g,b){return(0,s.wg)(),(0,s.iD)("div",o,[i,(0,s._)("div",u,[c,d,(0,s._)("label",r,[m,(0,s.wy)((0,s._)("input",{type:"email",class:"input",placeholder:"abc@xyz.com","onUpdate:modelValue":e[0]||(e[0]=e=>t.data.account=e)},null,512),[[l.nr,t.data.account]])]),(0,s._)("label",p,[f,(0,s.wy)((0,s._)("input",{type:"password",class:"input",placeholder:"・・・・・・・・","onUpdate:modelValue":e[1]||(e[1]=e=>t.data.password=e)},null,512),[[l.nr,t.data.password]])]),(0,s._)("button",{class:"round-full-button",onClick:e[2]||(e[2]=(...e)=>t.submitAll&&t.submitAll(...e))},"登入")]),w])}a(7658);var b=a(4870),h=a(2483),v=a(6895),x=a(65),k=(0,s.aZ)({setup(){const t=(0,h.tv)(),e=(0,x.oR)(),a=(0,b.iH)(null),s=(0,b.iH)(null),l=(0,b.iH)(null),n=new v.Z,o=(0,b.qj)({account:"",password:""});function i(){n.Post("auth/admin/login",o).then((a=>{if("A02"===a.status){e.commit("setAuthToken",a.data.token),e.commit("setLoginStatus",!0),e.commit("setUserInfo",a.data.user),e.commit("setTokenExpire",a.data.expired),e.commit("setLoginType","admin");const s={token:a.data.token,login:!0,user:a.data.user,expire:a.data.expired,type:"admin"};localStorage.setItem("monkeyIdTemp",JSON.stringify(s)),t.push("/admin")}void 0!==a.message&&(l.value=a.message)}))}return{accountInput:a,passwordInput:s,data:o,submitAll:i,message:l}}}),_=a(89);const y=(0,_.Z)(k,[["render",g]]);var A=y},5427:function(t,e,a){t.exports=a.p+"static/img/monkey_id.3fb88f2f.svg"}}]);
//# sourceMappingURL=748.ac52e9be.js.map