!function(){var e,t,o,r,a,n,l={frameRate:150,animationTime:400,stepSize:60,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!1,fixedBackground:!0,excluded:""},i=l,c=!1,s={x:0,y:0},u=!1,$=document.documentElement,d=[],f=/^Mac/.test(navigator.platform),h={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};function p(){if(!u&&document.body){u=!0;var r=document.body,a=document.documentElement,n=window.innerHeight,l=r.scrollHeight;if($=document.compatMode.indexOf("CSS")>=0?a:r,e=r,i.keyboardSupport&&M("keydown",w),top!=self)c=!0;else if(l>n&&(r.offsetHeight<=n||a.offsetHeight<=n)){var s,d=document.createElement("div");if(d.style.cssText="position:absolute; z-index:-10000; top:0; left:0; right:0; height:"+$.scrollHeight+"px",document.body.appendChild(d),o=function(){s||(s=setTimeout(function(){d.style.height="0",d.style.height=$.scrollHeight+"px",s=null},500))},setTimeout(o,10),M("resize",o),(t=new K(o)).observe(r,{attributes:!0,childList:!0,characterData:!1}),$.offsetHeight<=n){var f=document.createElement("div");f.style.clear="both",r.appendChild(f)}}i.fixedBackground||(r.style.backgroundAttachment="scroll",a.style.backgroundAttachment="scroll")}}var m=[],b=!1,_=Date.now();function v(e,t,o){var r,a;if(r=t,r=r>0?1:-1,a=(a=o)>0?1:-1,(s.x!==r||s.y!==a)&&(s.x=r,s.y=a,m=[],_=0),1!=i.accelerationMax){var n=Date.now()-_;if(n<i.accelerationDelta){var l=(1+50/n)/2;l>1&&(t*=l=Math.min(l,i.accelerationMax),o*=l)}_=Date.now()}if(m.push({x:t,y:o,lastX:t<0?.99:-.99,lastY:o<0?.99:-.99,start:Date.now()}),!b){var c=e===document.body,u=function(r){for(var a=Date.now(),n=0,l=0,s=0;s<m.length;s++){var $=m[s],d=a-$.start,f=d>=i.animationTime,h=f?1:d/i.animationTime;i.pulseAlgorithm&&(h=P(h));var p=$.x*h-$.lastX>>0,_=$.y*h-$.lastY>>0;n+=p,l+=_,$.lastX+=p,$.lastY+=_,f&&(m.splice(s,1),s--)}c?window.scrollBy(n,l):(n&&(e.scrollLeft+=n),l&&(e.scrollTop+=l)),t||o||(m=[]),m.length?O(u,e,1e3/i.frameRate+1):b=!1};O(u,e,0),b=!0}}function y(t){u||p();var o=t.target,r=H(o);if(!r||t.defaultPrevented||t.ctrlKey||X(e,"embed")||X(o,"embed")&&/\.pdf/i.test(o.src)||X(e,"object"))return!0;var n=-t.wheelDeltaX||t.deltaX||0,l=-t.wheelDeltaY||t.deltaY||0;if(f&&(t.wheelDeltaX&&Y(t.wheelDeltaX,120)&&(n=-120*(t.wheelDeltaX/Math.abs(t.wheelDeltaX))),t.wheelDeltaY&&Y(t.wheelDeltaY,120)&&(l=-120*(t.wheelDeltaY/Math.abs(t.wheelDeltaY)))),n||l||(l=-t.wheelDelta||0),1===t.deltaMode&&(n*=40,l*=40),!i.touchpadSupport&&function e(t){if(t)return d.length||(d=[t,t,t]),t=Math.abs(t),d.push(t),d.shift(),clearTimeout(a),a=setTimeout(function(){window.localStorage&&(localStorage.SS_deltaBuffer=d.join(","))},1e3),!A(120)&&!A(100)}(l))return!0;Math.abs(n)>1.2&&(n*=i.stepSize/120),Math.abs(l)>1.2&&(l*=i.stepSize/120),t.cancelable&&t.preventDefault(),v(r,n,l),D()}function w(t){var o=t.target,r=t.ctrlKey||t.altKey||t.metaKey||t.shiftKey&&t.keyCode!==h.spacebar;document.contains(e)||(e=document.activeElement);var a=/^(button|submit|radio|checkbox|file|color|image)$/i;if(/^(textarea|select|embed|object)$/i.test(o.nodeName)||X(o,"input")&&!a.test(o.type)||X(e,"video")||function e(t){var o=t.target,r=!1;if(-1!=document.URL.indexOf("www.youtube.com/watch"))do if(r=o.classList&&o.classList.contains("html5-video-controls"))break;while(o=o.parentNode);return r}(t)||o.isContentEditable||t.defaultPrevented||r||(X(o,"button")||X(o,"input")&&a.test(o.type))&&t.keyCode===h.spacebar)return!0;var n,l=0,c=0,s=H(e),u=s.clientHeight;switch(s==document.body&&(u=window.innerHeight),t.keyCode){case h.up:c=-i.arrowScroll;break;case h.down:c=i.arrowScroll;break;case h.spacebar:c=-(n=t.shiftKey?1:-1)*u*.9;break;case h.pageup:c=-(.9*u);break;case h.pagedown:c=.9*u;break;case h.home:c=-s.scrollTop;break;case h.end:var $=s.scrollHeight-s.scrollTop-u;c=$>0?$+10:0;break;case h.left:l=-i.arrowScroll;break;case h.right:l=i.arrowScroll;break;default:return!0}v(s,l,c),t.preventDefault(),D()}function g(t){e=t.target}var S,x=(S=0,function(e){return e.uniqueID||(e.uniqueID=S++)}),k={};function D(){clearTimeout(r),r=setInterval(function(){k={}},1e3)}function E(e,t){for(var o=e.length;o--;)k[x(e[o])]=t;return t}function H(e){var t=[],o=document.body,r=$.scrollHeight;do{var a=k[x(e)];if(a)return E(t,a);if(t.push(e),r===e.scrollHeight){var n=T($)&&T(o)||C($);if(c&&z($)||!c&&n)return E(t,N())}else if(z(e)&&C(e))return E(t,e)}while(e=e.parentElement)}function z(e){return e.clientHeight+10<e.scrollHeight}function T(e){return"hidden"!==getComputedStyle(e,"").getPropertyValue("overflow-y")}function C(e){var t=getComputedStyle(e,"").getPropertyValue("overflow-y");return"scroll"===t||"auto"===t}function M(e,t){window.addEventListener(e,t,!1)}function L(e,t){window.removeEventListener(e,t,!1)}function X(e,t){return(e.nodeName||"").toLowerCase()===t.toLowerCase()}function Y(e,t){return Math.floor(e/t)==e/t}function A(e){return Y(d[0],e)&&Y(d[1],e)&&Y(d[2],e)}window.localStorage&&localStorage.SS_deltaBuffer&&(d=localStorage.SS_deltaBuffer.split(","));var B,O=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e,t,o){window.setTimeout(e,o||1e3/60)},K=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,N=function(){if(!B){var e=document.createElement("div");e.style.cssText="height:10000px;width:1px;",document.body.appendChild(e);var t=document.body.scrollTop;document.documentElement.scrollTop,window.scrollBy(0,3),B=document.body.scrollTop!=t?document.body:document.documentElement,window.scrollBy(0,-3),document.body.removeChild(e)}return B};function q(e){var t,o,r;return(e*=i.pulseScale)<1?t=e-(1-Math.exp(-e)):(e-=1,t=(o=Math.exp(-1))+(r=1-Math.exp(-e))*(1-o)),t*i.pulseNormalize}function P(e){return e>=1?1:e<=0?0:(1==i.pulseNormalize&&(i.pulseNormalize/=q(1)),q(e))}var R=window.navigator.userAgent,j=/Edge/.test(R),F=/chrome/i.test(R)&&!j,I=/safari/i.test(R)&&!j,V=/mobile/i.test(R);function U(e){for(var t in e)l.hasOwnProperty(t)&&(i[t]=e[t])}"onwheel"in document.createElement("div")?n="wheel":"onmousewheel"in document.createElement("div")&&(n="mousewheel"),n&&(F||I)&&!V&&(M(n,y),M("mousedown",g),M("load",p)),U.destroy=function e(){t&&t.disconnect(),L(n,y),L("mousedown",g),L("keydown",w),L("resize",o),L("load",p)},window.SmoothScrollOptions&&U(window.SmoothScrollOptions),"function"==typeof define&&define.amd?define(function(){return U}):"object"==typeof exports?module.exports=U:window.SmoothScroll=U}();