(()=>{"use strict";var e={5316:(e,t,n)=>{n.r(t),n.d(t,{default:()=>T});var o=n(885),r=n(9526),a=n(3292),l=n(746),i=n(6114),s=n(1133),d=n(9233),c=n(3120),f=n(7557);const u=function(e){e.handleFile;var t=(0,r.useState)(!1),n=(0,o.default)(t,2),a=n[0],l=n[1],i=r.useRef(null),s=(0,r.useState)("UPLOADING"),u=(0,o.default)(s,2),g=u[0],h=u[1],v=r.createRef(),x=(0,r.useState)(),y=(0,o.default)(x,2),b=y[0],j=y[1],m=(0,r.useState)(""),S=(0,o.default)(m,2),T=S[0],O=S[1],E=function(e){e.preventDefault(),e.stopPropagation()},L=function(e){if(e.preventDefault(),e.stopPropagation(),e.dataTransfer.items&&e.dataTransfer.items.length>0){var t=e.dataTransfer.files[0];console.log("from handleDragIn",t)}},F=function(e){e.preventDefault(),e.stopPropagation(),l(!1)},w=function(e){if(e.preventDefault(),e.stopPropagation(),l(!1),e.dataTransfer.files&&e.dataTransfer.files.length>0){console.log("from handleDrop");var t=e.dataTransfer.files[0];C(t,!1)}},C=function(e,t){console.log("fileUploaded",e),h("START"),l(t);var n=(e.size/1048576).toFixed(2)+" MB",o=e.name.trim();j(o),O(n);var r=o.split(".").pop().toLowerCase();h("START"),setTimeout((function(){"txt"===r?P(e):"pdf"===r&&D(e)}),1e3)},D=function(e){var t=new FileReader;t.onload=function(e){var n=t.result,o=JSON.stringify(n);console.log("Upload txt Json",JSON.parse(o))},t.onerror=function(){console.log("Error")},t.readAsBinaryString(e),h("COMPLETED")},P=function(e){var t=new FileReader;t.onload=function(e){var n=t.result,o=JSON.stringify(n);console.log("Upload txt Json",JSON.parse(o))},t.onerror=function(){console.log("Error")},t.readAsBinaryString(e),h("COMPLETED")};return(0,r.useEffect)((function(){var e=v.current;return e.addEventListener("dragenter",L),e.addEventListener("dragleave",F),e.addEventListener("dragover",E),e.addEventListener("drop",w),function(){e.removeEventListener("dragenter",L),e.removeEventListener("dragleave",F),e.removeEventListener("dragover",E),e.removeEventListener("drop",w)}})),(0,f.jsxs)("div",{ref:v,children:["START"===g&&(0,f.jsxs)("div",{style:p.center,children:[(0,f.jsxs)(d.default,{children:[" 1. We are upLoading you  ",b," (",T,")"]}),(0,f.jsx)("br",{}),(0,f.jsx)("div",{style:p.center,children:(0,f.jsx)(c.default,{})})]}),"COMPLETED"===g&&(0,f.jsxs)("div",{style:p.center,children:[(0,f.jsx)(d.default,{children:"Successful! "}),(0,f.jsx)("br",{}),(0,f.jsx)(d.default,{children:"FileName.XLSM"}),(0,f.jsx)("button",{"data-testid":"uploadTestBtn",style:p.btn,onClick:function(){console.log("downloading")},children:"Download"})]}),"UPLOADING"===g&&(0,f.jsxs)("div",{"data-testid":"container",style:a?p.draggedContainer:p.container,children:[(0,f.jsx)("div",{style:p.uploadButtonContainer}),(0,f.jsx)("p",{style:p.text,children:"Drag and drop files here"}),(0,f.jsx)("button",{"data-testid":"uploadTestBtn",style:p.selectFileButton,onClick:function(e){i.current.click()},children:"Select File"}),(0,f.jsx)("input",{"data-testid":"fileInput",type:"file",ref:i,onChange:function(e){var t=e.target.files[0];C(t,!1)},accept:".txt, .pdf",style:{display:"none"}})]})]})};var p=l.default.create({draggedContainer:{width:"40%",height:"240px",border:"dashed 1px #0055cb",display:"flex",flexDirection:"column",justifyContent:"center",opacity:.5,marginLeft:"30%"},container:{width:544,height:240,border:"dashed 1px #2E3B55",display:"flex",flexDirection:"column",justifyContent:"center",marginLeft:"30%"},uploadButtonContainer:{width:60,height:60,marginLeft:"43%"},text:{marginLeft:"34%",width:"191px",height:"18px",fontFamily:"Roboto",fontSize:"16px",fontWeight:"500",color:"#2E3B55"},selectFileButton:{marginLeft:"40%",cursor:"pointer",color:"#0071e9",backgroundColor:"white",border:"solid 1px #0071ef",height:"45px",width:"100px",textTransform:"capitalize",fontFamily:"Roboto, Arial",fontSize:"15px"},uploadButtons:{display:"flex",justifyContent:"center"},center:{textAlign:"center",color:"#0071e9",textTransform:"capitalize",fontFamily:"Roboto, Arial",fontSize:20,padding:5,paddingTop:30},btn:{cursor:"pointer",color:"#0071e9",backgroundColor:"white",border:"solid 1px #0071ef",height:"45px",width:"100px",textTransform:"capitalize",fontSize:"15px",margin:20}}),g=n(9830);const h=function(e){var t=e.collection,n=e.handleOnSelect,a=(0,r.useState)(""),l=(0,o.default)(a,2),i=l[0],s=l[1];return(0,f.jsxs)("div",{children:[(0,f.jsxs)(d.default,{children:[t.label,": ",i]}),(0,f.jsx)(g.default,{countries:t.countriesFlag,customLabels:t.countryLables,selected:i,onSelect:function(e){return s(t=e),void n(t);var t},placeholder:t.placeholder,searchable:!0,showSecondaryOptionLabel:!0,selectedSize:20,optionsSize:18,fullWidth:!0})]})};var v=n(302),x=n(8356),y=n(4972),b=n(9855),j=n(8864),m=n(2525),S=n(5843);function T(){var e={fileFrom:{label:"FROM",countriesFlag:["US","ES","CN","TW","FR","DE","IT"],countryLables:{US:"English",FR:"Fran\xe7ais",DE:"Deutsch",IT:"italiano",CN:"\u4e2d\u6587-\u7b80\u4f53",TW:"\u4e2d\u6587-\u7e41\u9ad4",ES:"espa\xf1ol"},placeholder:"Select source language"},fileTo:{label:"TO",countriesFlag:["US","ES","CN","TW","FR","DE","IT"],countryLables:{US:"English",FR:"Fran\xe7ais",DE:"Deutsch",IT:"italiano",CN:"\u4e2d\u6587-\u7b80\u4f53",TW:"\u4e2d\u6587-\u7e41\u9ad4",ES:"espa\xf1ol"},placeholder:"Select target language"}},t=function(e,t){console.log("DataCollection",e,t)},l=(0,r.useState)(null),d=(0,o.default)(l,2),c=d[0],p=(d[1],(0,r.useState)([])),g=(0,o.default)(p,2);g[0],g[1];return(0,f.jsx)(S.GoogleOAuthProvider,{clientId:"816621343277-1kiue8qkfg9mj8rf93p5kojint9s47ks.apps.googleusercontent.com",children:(0,f.jsx)(s.default,{style:O.container,children:(0,f.jsx)(i.default,{source:n(4635),resizeMode:"cover",style:O.image,children:(0,f.jsxs)(x.default,{sx:{flexGrow:1},children:[(0,f.jsx)(v.default,{position:"static",style:{background:"#2E3B55"},children:(0,f.jsxs)(y.default,{children:[(0,f.jsx)(m.default,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}}),(0,f.jsx)(b.default,{variant:"h6",component:"div",sx:{flexGrow:1},children:"File Translate"}),c?(0,f.jsx)("div",{children:c.name}):(0,f.jsxs)(j.default,{color:"inherit",children:[(0,f.jsx)(S.GoogleLogin,{onSuccess:function(e){var t=function(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(window.atob(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""));return JSON.parse(n)}(e.credential);console.log("userDetail",t)},onError:function(){console.log("Login Failed")},useOneTap:!0})," "]}),(0,f.jsx)(j.default,{color:"inherit",onClick:function(){console.log("google logout"),(0,S.googleLogout)()},children:"Logout"})]})}),(0,f.jsxs)("div",{style:O.selectArea,children:[(0,f.jsx)(h,{collection:e.fileFrom,handleOnSelect:function(n){t(e.fileFrom.label,n)}}),(0,f.jsx)(h,{collection:e.fileTo,handleOnSelect:function(n){t(e.fileTo.label,n)}})]}),(0,f.jsx)(u,{}),(0,f.jsx)(a.default,{style:"auto"})]})})})})}var O=l.default.create({container:{fontFamily:"system-ui",width:"100%"},image:{height:"100%"},baseText:{fontSize:30},selectArea:{display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",paddingTop:40,paddingBottom:20,width:"100%"}})},4635:(e,t,n)=>{e.exports=n.p+"static/media/bgFT.222f74574fb2975a4d03.png"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.m=e,(()=>{var e=[];n.O=(t,o,r,a)=>{if(!o){var l=1/0;for(c=0;c<e.length;c++){for(var[o,r,a]=e[c],i=!0,s=0;s<o.length;s++)(!1&a||l>=a)&&Object.keys(n.O).every((e=>n.O[e](o[s])))?o.splice(s--,1):(i=!1,a<l&&(l=a));if(i){e.splice(c--,1);var d=r();void 0!==d&&(t=d)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,r,a]}})(),n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(o,r){if(1&r&&(o=this(o)),8&r)return o;if("object"===typeof o&&o){if(4&r&&o.__esModule)return o;if(16&r&&"function"===typeof o.then)return o}var a=Object.create(null);n.r(a);var l={};e=e||[null,t({}),t([]),t(t)];for(var i=2&r&&o;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((e=>l[e]=()=>o[e]));return l.default=()=>o,n.d(a,l),a}})(),n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={179:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var r,a,[l,i,s]=o,d=0;if(l.some((t=>0!==e[t]))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(s)var c=s(n)}for(t&&t(o);d<l.length;d++)a=l[d],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},o=self.webpackChunkweb=self.webpackChunkweb||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=n.O(void 0,[755],(()=>n(4620)));o=n.O(o)})();
//# sourceMappingURL=main.636b9e37.js.map