"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[949],{4949:function(s,l,a){a.r(l),a.d(l,{default:function(){return j}});var e=a(3396),t=a(9242),n=a(7139),o=a(5427);const r={class:"bg-orange-50 h-screen flex flex-col overflow-auto"},u=(0,e._)("div",{class:"flex-grow"},null,-1),i={class:"bg-white sm:shadow p-5 w-full h-screen sm:w-2/3 md:w-96 sm:h-fit mx-auto"},d=(0,e._)("img",{src:o,alt:"monkey id",class:"inline-block w-full m-auto max-h-24 p-0"},null,-1),p={class:"round-input-label"},c=(0,e._)("div",{class:"title"},"重設密碼",-1),m={class:"round-input-label"},w=(0,e._)("div",{class:"title"},"確認密碼",-1),f={key:0,class:"text-red-700 text-sm my-1 text-left"},h=(0,e._)("hr",{class:"my-3"},null,-1),g={class:"text-lg text-gray-500"},v=(0,e._)("div",{class:"flex-grow"},null,-1);function b(s,l,a,o,b,k){const _=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",r,[u,(0,e._)("div",i,[d,(0,e._)("label",p,[c,(0,e.wy)((0,e._)("input",{type:"password",class:"input",placeholder:"・・・・・・・・","onUpdate:modelValue":l[0]||(l[0]=l=>s.data.password=l),ref:"passwordInput",onKeyup:l[1]||(l[1]=(0,t.D2)((l=>s.confirmInput.focus()),["enter"]))},null,544),[[t.nr,s.data.password]])]),(0,e._)("label",m,[w,(0,e.wy)((0,e._)("input",{type:"password",class:"input",placeholder:"・・・・・・・・","onUpdate:modelValue":l[2]||(l[2]=l=>s.passwordConfirm=l),ref:"confirmInput",onKeyup:l[3]||(l[3]=(0,t.D2)(((...l)=>s.submitAll&&s.submitAll(...l)),["enter"]))},null,544),[[t.nr,s.passwordConfirm]])]),null!=s.message?((0,e.wg)(),(0,e.iD)("div",f,(0,n.zw)(s.message),1)):(0,e.kq)("",!0),(0,e._)("button",{class:"round-full-button",onClick:l[4]||(l[4]=(...l)=>s.submitAll&&s.submitAll(...l))},"重設密碼"),h,(0,e._)("div",g,[(0,e.Uk)("返回"),(0,e.Wm)(_,{to:"/login",class:"hyperlink"},{default:(0,e.w5)((()=>[(0,e.Uk)("登入")])),_:1})])]),v])}a(7658);var k=a(4870),_=a(2483),y=a(6895),x=(0,e.aZ)({setup(){const s=(0,_.tv)(),l=(0,_.yj)(),a=(0,k.iH)(null),t=(0,k.iH)(null),n=new y.Z,o=(0,k.qj)({password:""}),r=(0,k.iH)(""),u=(0,k.qj)({password:{filled:!1,match:!1,format:!1}});function i(){let e=!0;Object.values(u).forEach((s=>(Object.values(s).forEach((s=>!!s||(e=!1,!1))),!!e))),e&&n.Post(`auth/user/reset/password/${l.params.account}/${l.params.token}`,o).then((l=>{"A01"===l.status&&(alert("修改成功"),s.push("/login")),void 0!==l.message&&(a.value=l.message)}))}return(0,e.YP)(o,(()=>{u.password.filled=o.password.length>0,u.password.format=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(o.password)||0===o.password.length,u.password.match=o.password===r.value})),(0,e.YP)(r,(()=>{u.password.match=o.password===r.value})),{data:o,submitAll:i,message:a,passwordConfirm:r,confirmInput:t}}}),A=a(89);const C=(0,A.Z)(x,[["render",b]]);var j=C},5427:function(s,l,a){s.exports=a.p+"static/img/monkey_id.3fb88f2f.svg"}}]);
//# sourceMappingURL=949.55b79dcc.js.map