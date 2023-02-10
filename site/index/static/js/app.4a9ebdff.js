(function(){"use strict";var e={6900:function(e,t,n){var o=n(9242),r=n(3396);function i(e,t,n,o,i,a){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(c)}var a=n(65),c=(0,r.aZ)({setup(){const e=(0,a.oR)();try{document.cookie="accept=true",localStorage.setItem("test","test"),localStorage.removeItem("test")}catch(t){alert("本網站必須使用Cookie，您必須要啟用Cookie才能使用本網站"),console.log(t)}try{if(localStorage.getItem("monkeyIdTemp")){const t=JSON.parse(localStorage.monkeyIdTemp);e.commit("setAuthToken",t.token),e.commit("setLoginStatus",t.login),e.commit("setUserInfo",t.user),e.commit("setTokenExpire",t.expire),e.commit("setLoginType",t.type)}}catch(t){console.log(t)}}}),s=n(89);const u=(0,s.Z)(c,[["render",i]]);var l=u,m=n(2483);function d(e,t,n,o,i,a){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(c)}n(7658);var f=(0,r.aZ)({setup(e){const t=(0,a.oR)(),n=(0,m.tv)();function o(){t.commit("reset");try{localStorage.getItem("monkeyIdTemp")&&localStorage.removeItem("monkeyIdTemp")}catch(e){console.log(e)}n.push("/login")}function r(){if(t.state.isLogin){const e=new Date(t.state.expire).getTime(),n=Date.now();e<=n&&(alert("已過期，請重新登入"),o())}else!1===t.state.isLogin&&(alert("請先登入"),o())}return r(),{logout:o}}});const p=(0,s.Z)(f,[["render",d]]);var g=p;function h(e,t,n,o,i,a){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(c)}var v=(0,r.aZ)({setup(e){const t=(0,a.oR)(),n=(0,m.tv)();function o(){t.commit("reset");try{localStorage.getItem("monkeyIdTemp")&&localStorage.removeItem("monkeyIdTemp")}catch(e){console.log(e)}n.push("/login/admin")}function r(){if(t.state.isLogin){const e=new Date(t.state.expire).getTime(),n=Date.now();e<=n&&(alert("已過期，請重新登入"),o())}else!1===t.state.isLogin&&(alert("請先登入"),o())}return r(),{logout:o}}});const b=(0,s.Z)(v,[["render",h]]);var y=b;const k=[{path:"/",name:"home",component:g,children:[{path:"/",name:"homePage",component:()=>Promise.all([n.e(895),n.e(494)]).then(n.bind(n,494))},{path:"verify",name:"verifyPage",component:()=>Promise.all([n.e(895),n.e(337)]).then(n.bind(n,8337))}]},{path:"/login",name:"login",component:()=>n.e(534).then(n.bind(n,4534)),children:[{path:"/login",name:"loginPage",component:()=>Promise.all([n.e(895),n.e(645)]).then(n.bind(n,9645))},{path:"signup",name:"signupPage",component:()=>Promise.all([n.e(895),n.e(30)]).then(n.bind(n,8030))},{path:"done",name:"donePage",component:()=>n.e(632).then(n.bind(n,2632))},{path:"reset",name:"resetPage",component:()=>Promise.all([n.e(895),n.e(676)]).then(n.bind(n,6676))},{path:"reset/password/:account/:token",name:"resetPasswordPage",component:()=>Promise.all([n.e(895),n.e(949)]).then(n.bind(n,4949))},{path:"admin",name:"adminLoginPage",component:()=>Promise.all([n.e(895),n.e(748)]).then(n.bind(n,9748))}]},{path:"/admin",name:"admin",component:y,children:[{path:"/admin",name:"adminHomePage",component:()=>Promise.all([n.e(895),n.e(944)]).then(n.bind(n,8944))},{path:"/admin/user",name:"userListPage",component:()=>Promise.all([n.e(895),n.e(432)]).then(n.bind(n,3432))},{path:"/admin/user/:id",name:"userDataPage",component:()=>Promise.all([n.e(895),n.e(521)]).then(n.bind(n,1521))},{path:"/admin/app",name:"appListPage",component:()=>Promise.all([n.e(895),n.e(48)]).then(n.bind(n,1048))},{path:"/admin/app/add",name:"addAppPage",component:()=>Promise.all([n.e(895),n.e(304)]).then(n.bind(n,6304))}]},{path:"/privacy",name:"privacy",component:()=>n.e(82).then(n.bind(n,1082))}],P=(0,m.p7)({history:(0,m.r5)("/monkeyid/"),routes:k});var w=P,T=(0,a.MT)({state:{token:"",isLogin:!1,userInfo:{},tokenExpire:"",loginType:""},getters:{},mutations:{setAuthToken(e,t){e.token=t},setLoginStatus(e,t){e.isLogin=t},setUserInfo(e,t){e.userInfo=t},setTokenExpire(e,t){e.tokenExpire=t},setLoginType(e,t){e.tokenExpire=t},reset(e){e.token="",e.isLogin=!1,e.userInfo={},e.tokenExpire="",e.loginType=""}},actions:{},modules:{}});(0,o.ri)(l).use(T).use(w).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var c=!0,s=0;s<o.length;s++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(c=!1,i<a&&(a=i));if(c){e.splice(l--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"static/js/"+e+"."+{30:"e534e062",48:"0ea4c266",82:"a1413a8c",304:"5fc9d51e",337:"89209623",432:"f87b9081",494:"d7d62fbc",521:"8fda105b",534:"7a3d99d9",632:"739c8fee",645:"d2493419",676:"32a79df7",748:"f70eafb6",895:"e69d091a",944:"b8058795",949:"460f0b7f"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"static/css/"+e+"."+{30:"4aedd9b3",48:"429a22db",82:"2e679994",304:"8ed44236",432:"cbe64c48",521:"a14ef213"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="site:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var c,s;if(void 0!==i)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var m=u[l];if(m.getAttribute("src")==o||m.getAttribute("data-webpack")==t+i){c=m;break}}c||(s=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+i),c.src=o),e[o]=[r];var d=function(t,n){c.onerror=c.onload=null,clearTimeout(f);var r=e[o];if(delete e[o],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),s&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/monkeyid/"}(),function(){var e=function(e,t,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(i){if(r.onerror=r.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),c=i&&i.target&&i.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=c,r.parentNode.removeChild(r),o(s)}};return r.onerror=r.onload=i,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),c=n.p+a;if(t(a,c))return r();e(o,c,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={30:1,48:1,82:1,304:1,432:1,521:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),c=new Error,s=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;c.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",c.name="ChunkLoadError",c.type=i,c.request=a,r[1](c)}};n.l(a,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],c=o[1],s=o[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(r in c)n.o(c,r)&&(n.m[r]=c[r]);if(s)var l=s(n)}for(t&&t(o);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},o=self["webpackChunksite"]=self["webpackChunksite"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(6900)}));o=n.O(o)})();
//# sourceMappingURL=app.4a9ebdff.js.map