import{y as _,a as p,j as h,k as o,l,m as t,x as a,O as w,P as v,w as m,v as f,Q as g,R as k,M as b,N as y,g as T,F as S,z as C}from"./index-31c171b2.js";import{u as D}from"./useRefresh-f06aa801.js";const x=e=>(b("data-v-145c44c2"),e=e(),y(),e),N={class:"tw-flex tw-flex-col tw-bg-white tw-rounded-12 tw-mb-10 ticket-box"},B={class:"tw-flex-1 tw-rounded-t-12 ticket-body"},V={class:"tw-flex tw-flex-row tw-justify-between tw-pt-20 tw-px-15"},I={class:"tw-text-16 tw-text-dark tw-truncate tw-flex-1"},L={class:"tw-text-red-500"},j=x(()=>t("span",{class:"tw-text-12"},"￥",-1)),z={class:"tw-text-28"},P={class:"tw-text-12 tw-leading-25 tw-px-15 tw-text-dark tw-truncate"},R={key:0,class:"tw-text-12 tw-leading-25 tw-px-15 tw-text-dark tw-truncate"},$=x(()=>t("div",{class:"divider-box"},[t("div",{class:"divider"})],-1)),F={class:"tw-flex tw-flex-row tw-justify-between tw-leading-40 tw-px-15"},M={class:"tw-flex tw-flex-row tw-items-center tw-text-light tw-text-12 tw-text-light"},U={class:"tw-text-12 tw-text-light tw-px-5"},E=x(()=>t("div",{class:"tw-rounded-12 tw-text-dark tw-leading-24 popover-content"},[t("p",null,"1、可与其他类型券叠加使用；可循环使用； "),t("p",null,"2、部分商品不参与优惠券活动；"),t("p",null,"3、同类券不可叠加使用；"),t("p",null,"4、恶意购买或利用程序漏洞等行为，我司有权取消优惠资格。")],-1)),H=[E],O=_({__name:"Ticket",props:{name:String,statusText:String,time:String,timeLabel:{type:String,default:"有效期"},code:[String,Number],value:[String,Number],phone:[String,Number],disabled:Boolean,showUseText:Boolean,useText:{type:String,default:"去使用"}},emits:["click","togglePopover"],setup(e,{emit:c}){const n=e,i=p(!1),d=r=>{i.value&&(i.value=!1),c("click",r)};return(r,s)=>{const u=h("VanTag");return o(),l("div",{class:k(`ticket-container ${n.disabled?"disabled":""}`),onClick:d},[t("div",N,[t("div",B,[t("div",V,[t("div",I,a(e.name),1),t("div",L,[j,t("span",z,a(e.value),1)])]),t("div",P," 卡号: "+a(e.code),1),e.phone&&e.phone.length>0?(o(),l("div",R," 客服电话: "+a(e.phone),1)):w("",!0)]),$,t("div",F,[t("div",M,[t("span",null,a(e.timeLabel)+"：",1),t("span",null,a(e.time),1)]),t("div",null,[t("span",U,a(e.statusText),1),e.showUseText?(o(),v(u,{key:0,color:n.disabled?"#D8D8D8":"",type:"danger",size:"medium",round:"",plain:""},{default:m(()=>[f(a(n.useText),1)]),_:1},8,["color"])):w("",!0)])])]),i.value?(o(),l("div",{key:0,class:"popover-box",onClick:s[0]||(s[0]=g(()=>{},["stop"]))},H)):w("",!0)],2)}}});const Q=T(O,[["__scopeId","data-v-145c44c2"]]),q={class:"tw-px-10 tw-py-10"},J={__name:"Coupons",setup(e){const c=D();c.onRefresh(d=>{console.log("下拉刷新触发"),c.toggleLoading(!1)});const n=p([]);return(async()=>{n.value=[{name:"抵扣券",code:"Tx0001",value:100,time:"2022-06-19",phone:"10086",status:1},{name:"抵扣券22",code:"Tx0002",value:20,time:"2022-06-19",phone:"10086",status:0}]})(),(d,r)=>(o(),l("div",q,[(o(!0),l(S,null,C(n.value,(s,u)=>(o(),v(Q,{name:s.name,value:s.value,time:s.time,code:s.code,phone:s.phone,disabled:s.status===0,"status-text":s.status>0?"待使用":"已使用",key:u},null,8,["name","value","time","code","phone","disabled","status-text"]))),128))]))}};export{J as default};
