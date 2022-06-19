import{_ as h,x as p,b as _,o,c as l,d as t,t as a,y as u,z as v,w as m,g as f,A as g,B as b,n as k,q as y,h as S,E as T,F as C,l as B}from"./index.86a51b05.js";const w=e=>(k("data-v-4bcb89a1"),e=e(),y(),e),D={class:"tw-flex tw-flex-col tw-bg-white tw-rounded-12 tw-mb-10 ticket-box"},N={class:"tw-flex-1 tw-rounded-t-12 ticket-body"},V={class:"tw-flex tw-flex-row tw-justify-between tw-pt-20 tw-px-15"},E={class:"tw-text-16 tw-text-dark tw-truncate tw-flex-1"},I={class:"tw-text-red-500"},z=w(()=>t("span",{class:"tw-text-12"},"\uFFE5",-1)),L={class:"tw-text-28"},$={class:"tw-text-12 tw-leading-25 tw-px-15 tw-text-dark tw-truncate"},j={key:0,class:"tw-text-12 tw-leading-25 tw-px-15 tw-text-dark tw-truncate"},F=w(()=>t("div",{class:"divider-box"},[t("div",{class:"divider"})],-1)),P={class:"tw-flex tw-flex-row tw-justify-between tw-leading-40 tw-px-15"},R={class:"tw-flex tw-flex-row tw-items-center tw-text-light tw-text-12 tw-text-light"},U={class:"tw-text-12 tw-text-light tw-px-5"},q=w(()=>t("div",{class:"tw-rounded-12 tw-text-dark tw-leading-24 popover-content"},[t("p",null,"1\u3001\u53EF\u4E0E\u5176\u4ED6\u7C7B\u578B\u5238\u53E0\u52A0\u4F7F\u7528\uFF1B\u53EF\u5FAA\u73AF\u4F7F\u7528\uFF1B "),t("p",null,"2\u3001\u90E8\u5206\u5546\u54C1\u4E0D\u53C2\u4E0E\u4F18\u60E0\u5238\u6D3B\u52A8\uFF1B"),t("p",null,"3\u3001\u540C\u7C7B\u5238\u4E0D\u53EF\u53E0\u52A0\u4F7F\u7528\uFF1B"),t("p",null,"4\u3001\u6076\u610F\u8D2D\u4E70\u6216\u5229\u7528\u7A0B\u5E8F\u6F0F\u6D1E\u7B49\u884C\u4E3A\uFF0C\u6211\u53F8\u6709\u6743\u53D6\u6D88\u4F18\u60E0\u8D44\u683C\u3002")],-1)),A=[q],M={name:"Ticket",props:{name:String,statusText:String,time:String,timeLabel:{type:String,default:"\u6709\u6548\u671F"},code:[String,Number],value:[String,Number],phone:[String,Number],disabled:Boolean,showUseText:Boolean,useText:{type:String,default:"\u53BB\u4F7F\u7528"}},emits:["click","togglePopover"],setup(e,{emit:c}){const n=e,i=p(!1),x=d=>{i.value&&(i.value=!1),c("click",d)};return(d,s)=>{const r=_("VanTag");return o(),l("div",{class:b(`ticket-container ${n.disabled?"disabled":""}`),onClick:x},[t("div",D,[t("div",N,[t("div",V,[t("div",E,a(e.name),1),t("div",I,[z,t("span",L,a(e.value),1)])]),t("div",$," \u5361\u53F7: "+a(e.code),1),e.phone&&e.phone.length>0?(o(),l("div",j," \u5BA2\u670D\u7535\u8BDD: "+a(e.phone),1)):u("",!0)]),F,t("div",P,[t("div",R,[t("span",null,a(e.timeLabel)+"\uFF1A",1),t("span",null,a(e.time),1)]),t("div",null,[t("span",U,a(e.statusText),1),e.showUseText?(o(),v(r,{key:0,color:n.disabled?"#D8D8D8":"",type:"danger",size:"medium",round:"",plain:""},{default:m(()=>[f(a(n.useText),1)]),_:1},8,["color"])):u("",!0)])])]),i.value?(o(),l("div",{key:0,class:"popover-box",onClick:s[0]||(s[0]=g(()=>{},["stop"]))},A)):u("",!0)],2)}}};var G=h(M,[["__scopeId","data-v-4bcb89a1"]]);const H={class:"tw-px-10 tw-py-10"},K={name:"Coupons",setup(e){const c=S();window.emitter.on(T.onRefresh,()=>{console.log("\u4E0B\u62C9\u5237\u65B0\u89E6\u53D1"),c.loading=!1});const n=p([]);return(async()=>{n.value=[{name:"\u62B5\u6263\u5238",code:"Tx0001",value:100,time:"2022-06-19",phone:"10086",status:1},{name:"\u62B5\u6263\u523822",code:"Tx0002",value:20,time:"2022-06-19",phone:"10086",status:0}]})(),(x,d)=>(o(),l("div",H,[(o(!0),l(C,null,B(n.value,(s,r)=>(o(),v(G,{name:s.name,value:s.value,time:s.time,code:s.code,phone:s.phone,disabled:s.status===0,"status-text":s.status>0?"\u5F85\u4F7F\u7528":"\u5DF2\u4F7F\u7528",key:r},null,8,["name","value","time","code","phone","disabled","status-text"]))),128))]))}};export{K as default};
