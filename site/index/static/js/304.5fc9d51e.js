"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[304],{6304:function(t,a,l){l.r(a),l.d(a,{default:function(){return y}});var e=l(3396),n=l(9242);const s=t=>((0,e.dD)("data-v-178f6fc0"),t=t(),(0,e.Cn)(),t),u={class:"bg-orange-50 h-screen overflow-hidden p-10"},d={class:"bg-white sm:shadow p-5 w-full h-full flex flex-col"},o={class:"text-left"},i=s((()=>(0,e._)("hr",{class:"mt-3"},null,-1))),p={class:"flex-grow overflow-auto py-3 text-left"},c={class:"data-input"},r=s((()=>(0,e._)("div",null,"App名稱：",-1))),f={class:"data-input"},_=s((()=>(0,e._)("div",null,"網域：",-1)));function m(t,a,l,s,m,v){const w=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",u,[(0,e._)("div",d,[(0,e._)("div",o,[(0,e.Wm)(w,{class:"text-lg hyperlink",to:"/admin/app"},{default:(0,e.w5)((()=>[(0,e.Uk)("回上一頁")])),_:1}),i]),(0,e._)("div",p,[(0,e._)("label",c,[r,(0,e.wy)((0,e._)("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=a=>t.data.app_name=a)},null,512),[[n.nr,t.data.app_name]])]),(0,e._)("label",f,[_,(0,e.wy)((0,e._)("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=a=>t.data.domain=a)},null,512),[[n.nr,t.data.domain]])]),(0,e._)("button",{class:"full-button",onClick:a[2]||(a[2]=(...a)=>t.submitAll&&t.submitAll(...a))},"新增")])])])}var v=l(4870),w=l(65),b=l(2483),h=l(6895),k=(0,e.aZ)({setup(){const t=(0,w.oR)(),a=((0,b.tv)(),new h.Z(t.state.token)),l=(0,v.qj)({app_name:"",domain:""});function e(){a.Post("admin/app",l,null,!0,!0).then((t=>{"A01"===t.status&&alert("已新增")}))}return{data:l,submitAll:e}}}),x=l(89);const g=(0,x.Z)(k,[["render",m],["__scopeId","data-v-178f6fc0"]]);var y=g}}]);
//# sourceMappingURL=304.5fc9d51e.js.map