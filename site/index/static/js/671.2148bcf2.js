"use strict";(self["webpackChunksite"]=self["webpackChunksite"]||[]).push([[671],{5671:function(t,a,e){e.r(a),e.d(a,{default:function(){return nt}});var l=e(3396),i=e(9242),d=e(7139);const s=t=>((0,l.dD)("data-v-7245233b"),t=t(),(0,l.Cn)(),t),u={class:"bg-orange-50 h-screen overflow-hidden p-10"},n={class:"bg-white sm:shadow p-5 w-full h-full flex flex-col"},o={class:"text-left"},v=s((()=>(0,l._)("hr",{class:"mt-3"},null,-1))),r={class:"flex-grow overflow-auto py-3 text-left md:grid grid-cols-2 gap-5"},c=s((()=>(0,l._)("div",{class:"text-2xl"},"基本資料",-1))),p=s((()=>(0,l._)("hr",{class:"my-3"},null,-1))),_={class:"data-input"},b=s((()=>(0,l._)("div",null,"姓名：",-1))),y=["disabled"],m={class:"data-input"},f=s((()=>(0,l._)("div",null,"帳號：",-1))),w=["disabled"],g={class:"data-input"},D=s((()=>(0,l._)("div",null,"學校：",-1))),k=["disabled"],h=["value"],x={class:"md:grid grid-cols-2 gap-2"},U={class:"data-input"},V=s((()=>(0,l._)("div",null,"身份：",-1))),C=["disabled"],H=s((()=>(0,l._)("option",{value:"0"},"在校學生",-1))),A=s((()=>(0,l._)("option",{value:"1"},"畢業生",-1))),L=s((()=>(0,l._)("option",{value:"2"},"校友",-1))),M=[H,A,L],q={class:"data-input"},Z=s((()=>(0,l._)("div",null,"方式：",-1))),E=["disabled"],G=s((()=>(0,l._)("option",{value:"1"},"學校Email信箱驗證",-1))),$=s((()=>(0,l._)("option",{value:"2"},"上傳證明文件",-1))),j=[G,$],z={class:"data-input"},I=s((()=>(0,l._)("div",null,"狀態：",-1))),K=["disabled"],P=(0,l.uE)('<option value="9" data-v-7245233b>審核通過</option><option value="4" data-v-7245233b>資料無法辨識</option><option value="5" data-v-7245233b>資料不符</option><option value="6" data-v-7245233b>資料已過期</option><option value="7" data-v-7245233b>請聯繫管理員</option><option value="8" data-v-7245233b>請重新驗證</option><option disabled value="1" data-v-7245233b>已發送驗證信</option><option disabled value="2" data-v-7245233b>驗證失敗</option><option disabled value="3" data-v-7245233b>人工審核中</option>',9),R=[P],W={class:"data-input"},Y=s((()=>(0,l._)("div",null,"有效：",-1))),B=["disabled"],F={class:"data-input"},J=s((()=>(0,l._)("div",null,"備註：",-1))),N=["disabled"],O={key:1,class:"grid grid-cols-2 gap-5"},Q=s((()=>(0,l._)("div",{class:"text-2xl"},"驗證資料",-1))),S=s((()=>(0,l._)("hr",{class:"my-3"},null,-1))),T={key:0},X=["src"];function tt(t,a,e,s,H,A){const L=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",u,[(0,l._)("div",n,[(0,l._)("div",o,[(0,l.Wm)(L,{class:"text-lg hyperlink",to:"/admin/user"},{default:(0,l.w5)((()=>[(0,l.Uk)("回上一頁")])),_:1}),v]),(0,l._)("div",r,[(0,l._)("div",null,[c,p,(0,l._)("label",_,[b,(0,l.wy)((0,l._)("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=a=>t.userData.name=a),disabled:!t.edit},null,8,y),[[i.nr,t.userData.name]])]),(0,l._)("label",m,[f,(0,l.wy)((0,l._)("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=a=>t.userData.account=a),disabled:!t.edit},null,8,w),[[i.nr,t.userData.account]])]),(0,l._)("label",g,[D,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":a[2]||(a[2]=a=>t.userData.univ_id=a),disabled:!t.edit},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.univList,((t,a)=>((0,l.wg)(),(0,l.iD)("option",{key:a,value:t.univ_id},(0,d.zw)(t.univ_name_ch_full),9,h)))),128))],8,k),[[i.bM,t.userData.univ_id]])]),(0,l._)("div",x,[(0,l._)("label",U,[V,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":a[3]||(a[3]=a=>t.userData.identity=a),disabled:!t.edit},M,8,C),[[i.bM,t.userData.identity]])]),(0,l._)("label",q,[Z,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":a[4]||(a[4]=a=>t.userData.verify_type=a),disabled:!t.edit},j,8,E),[[i.bM,t.userData.verify_type]])])]),(0,l._)("label",z,[I,(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":a[5]||(a[5]=a=>t.status=a),disabled:!t.edit},R,8,K),[[i.bM,t.status]])]),(0,l._)("label",W,[Y,(0,l.wy)((0,l._)("input",{type:"datetime-local","onUpdate:modelValue":a[6]||(a[6]=a=>t.userData.valid_until=a),disabled:!t.edit},null,8,B),[[i.nr,t.userData.valid_until]])]),(0,l._)("label",F,[J,(0,l.wy)((0,l._)("input",{type:"text","onUpdate:modelValue":a[7]||(a[7]=a=>t.userData.remarks=a),disabled:!t.edit},null,8,N),[[i.nr,t.userData.remarks]])]),!1===t.edit?((0,l.wg)(),(0,l.iD)("button",{key:0,class:"full-button",onClick:a[8]||(a[8]=a=>t.edit=!t.edit)},"編輯")):(0,l.kq)("",!0),t.edit?((0,l.wg)(),(0,l.iD)("div",O,[(0,l._)("button",{class:"full-button",onClick:a[9]||(a[9]=(...a)=>t.submitAll&&t.submitAll(...a))},"儲存"),(0,l._)("button",{class:"full-button bg-red-600 hover:bg-red-500",onClick:a[10]||(a[10]=()=>{t.getUserData(),t.edit=!1})},"取消")])):(0,l.kq)("",!0)]),(0,l._)("div",null,[Q,S,""!==t.userData.file?((0,l.wg)(),(0,l.iD)("div",T,[(0,l._)("img",{class:"w-full",src:`https://sports.nsysu.edu.tw/monkeyserver/storage/${t.userData.file}`,alt:""},null,8,X)])):(0,l.kq)("",!0)])])])])}var at=e(4870),et=e(65),lt=e(2483),it=e(6895),dt=(0,l.aZ)({setup(){const t=(0,et.oR)(),a=(0,lt.yj)(),e=new it.Z(t.state.token),l=(0,at.iH)(9),i=(0,at.iH)({identity:0,verification:0,file:""});function d(){e.Get(`admin/user/${a.params.id}`,i,!0,!0)}d();const s=(0,at.iH)([]);function u(){e.Get("univ-list",s)}u();const n=(0,at.iH)(!1);function o(){const t={u_id:i.value.u_id,account:i.value.account,name:i.value.name,identity:i.value.identity,univ_id:i.value.univ_id,verify_type:i.value.verify_type,remarks:i.value.remarks,valid_until:i.value.valid_until,verification:l.value};e.Patch("admin/user/edit",t,null,!0,!0).then((t=>{"A01"===t.status&&(n.value=!1)}))}return{userData:i,univList:s,getUserData:d,identityList:["在校學生","教職員","畢業校友"],statusList:["尚未驗證","已發送驗證信","驗證失敗","人工審核中","資料無法辨識","資料不符","資料已過期","請聯繫管理員","請重新驗證","審核通過"],status:l,edit:n,submitAll:o}}}),st=e(89);const ut=(0,st.Z)(dt,[["render",tt],["__scopeId","data-v-7245233b"]]);var nt=ut}}]);
//# sourceMappingURL=671.2148bcf2.js.map