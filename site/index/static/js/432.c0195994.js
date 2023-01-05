"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[432],{3432:function(t,e,i){i.r(e),i.d(e,{default:function(){return K}});var l=i(3396),n=i(7139),a=i(9242);const u=t=>((0,l.dD)("data-v-6de52556"),t=t(),(0,l.Cn)(),t),o={class:"bg-orange-50 h-screen overflow-hidden p-10"},d={class:"bg-white sm:shadow p-5 w-full h-full flex flex-col"},s={class:"text-left"},r=u((()=>(0,l._)("hr",{class:"my-3"},null,-1))),v={class:"flex gap-3 flex-wrap"},p={class:"filter-input"},_=u((()=>(0,l._)("div",null,"學校",-1))),c=u((()=>(0,l._)("option",{value:"null"},"全選",-1))),f=["value"],m={class:"filter-input"},w=u((()=>(0,l._)("div",null,"姓名",-1))),h={class:"filter-input"},g=u((()=>(0,l._)("div",null,"身份",-1))),y=u((()=>(0,l._)("option",{value:"null"},"全選",-1))),D=u((()=>(0,l._)("option",{value:"0"},"在校學生",-1))),b=u((()=>(0,l._)("option",{value:"1"},"畢業生",-1))),k=u((()=>(0,l._)("option",{value:"2"},"校友",-1))),L=[y,D,b,k],x={class:"filter-input"},z=u((()=>(0,l._)("div",null,"狀態",-1))),I=(0,l.uE)('<option value="null" data-v-6de52556>全選</option><option value="0" data-v-6de52556>尚未驗證</option><option value="1" data-v-6de52556>已發送驗證信</option><option value="2" data-v-6de52556>驗證失敗</option><option value="3" data-v-6de52556>人工審核中</option><option value="4" data-v-6de52556>資料無法辨識</option><option value="5" data-v-6de52556>資料不符</option><option value="6" data-v-6de52556>資料已過期</option><option value="7" data-v-6de52556>請聯繫管理員</option><option value="8" data-v-6de52556>請重新驗證</option><option value="9" data-v-6de52556>審核通過</option>',11),U=[I],H=u((()=>(0,l._)("hr",{class:"my-3"},null,-1))),Z={class:"flex-grow overflow-auto"},N={class:"w-full"},T=u((()=>(0,l._)("tr",null,[(0,l._)("th",null,"學校"),(0,l._)("th",null,"姓名"),(0,l._)("th",null,"身份"),(0,l._)("th",null,"狀態"),(0,l._)("th",null,"操作")],-1))),V={key:0};function W(t,e,i,u,y,D){const b=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",o,[(0,l._)("div",d,[(0,l._)("div",s,[(0,l.Wm)(b,{class:"text-lg hyperlink",to:"/admin"},{default:(0,l.w5)((()=>[(0,l.Uk)("回上一頁")])),_:1})]),(0,l._)("div",null,[r,(0,l._)("div",v,[(0,l._)("label",p,[_,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":e[0]||(e[0]=e=>t.filterData.univId=e)},[c,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.univList,((t,e)=>((0,l.wg)(),(0,l.iD)("option",{key:e,value:t.univ_id},(0,n.zw)(t.univ_name_ch_full),9,f)))),128))],512),[[a.bM,t.filterData.univId]])]),(0,l._)("label",m,[w,(0,l.wy)((0,l._)("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=e=>t.filterData.name=e)},null,512),[[a.nr,t.filterData.name]])]),(0,l._)("label",h,[g,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":e[2]||(e[2]=e=>t.filterData.identity=e)},L,512),[[a.bM,t.filterData.identity]])]),(0,l._)("label",x,[z,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":e[3]||(e[3]=e=>t.filterData.status=e)},U,512),[[a.bM,t.filterData.status]])]),(0,l._)("div",null,"更新時間："+(0,n.zw)(t.updateTime),1)]),H]),(0,l._)("div",Z,[(0,l._)("table",N,[T,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.userList,((e,i)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:i},[t.filterFunction(e)?((0,l.wg)(),(0,l.iD)("tr",V,[(0,l._)("td",null,(0,n.zw)(e.univ_name_ch_full),1),(0,l._)("td",null,(0,n.zw)(e.name),1),(0,l._)("td",null,(0,n.zw)(t.identityList[e.identity]),1),(0,l._)("td",null,(0,n.zw)(t.statusList[e.verification]),1),(0,l._)("td",null,[(0,l.Wm)(b,{class:"text-orange-500",to:`/admin/user/${e.u_id}`},{default:(0,l.w5)((()=>[(0,l.Uk)("查看")])),_:2},1032,["to"])])])):(0,l.kq)("",!0)],64)))),128))])])])])}var C=i(4870),M=i(65),Y=i(6895),q=(0,l.aZ)({setup(){const t=(0,M.oR)(),e=new Y.Z(t.state.token),i=(0,C.iH)([]);function l(){e.Get("univ-list",i)}l();const n=(0,C.iH)([]);function a(){e.Get("admin/user",n,!0,!0)}a();const u=(0,C.qj)({univId:"null",name:"",identity:"null",status:"null"}),o=new Date,d=(0,C.iH)(o.toLocaleString("zh-TW",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:"short"}));return setInterval((()=>{a(),d.value=o.toLocaleString("zh-TW",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:"short"})}),6e4),{userList:n,univList:i,identityList:["在校學生","教職員","畢業校友"],statusList:["尚未驗證","已發送驗證信","驗證失敗","人工審核中","資料無法辨識","資料不符","資料已過期","請聯繫管理員","請重新驗證","審核通過"],filterData:u,filterFunction:t=>{let e=!0;return t.univ_id!==u.univId&&"null"!==u.univId&&(e=!1),t.name!==u.name&&u.name.length>0&&(e=!1),t.identity!==Number(u.identity)&&"null"!==u.identity&&(e=!1),t.verification!==Number(u.status)&&"null"!==u.status&&(e=!1),e},getUserList:a,updateTime:d}}}),F=i(89);const G=(0,F.Z)(q,[["render",W],["__scopeId","data-v-6de52556"]]);var K=G}}]);
//# sourceMappingURL=432.c0195994.js.map