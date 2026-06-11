(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class fe{constructor(t,e,i){if(this.q=t,this.r=e,this.s=i,Math.round(t+e+i)!==0)throw new Error(`Coordonnées cube invalides: ${t}+${e}+${i}≠0`)}add(t){return new fe(this.q+t.q,this.r+t.r,this.s+t.s)}subtract(t){return new fe(this.q-t.q,this.r-t.r,this.s-t.s)}scale(t){return new fe(this.q*t,this.r*t,this.s*t)}rotateLeft(){return new fe(-this.s,-this.q,-this.r)}rotateRight(){return new fe(-this.r,-this.s,-this.q)}length(){return Math.floor((Math.abs(this.q)+Math.abs(this.r)+Math.abs(this.s))/2)}distance(t){return this.subtract(t).length()}neighbor(t){return this.add(Jo[t])}neighbors(){return Jo.map(t=>this.add(t))}diagonal(t){return this.add(op[t])}lerp(t,e){return new ud(this.q*(1-e)+t.q*e,this.r*(1-e)+t.r*e,this.s*(1-e)+t.s*e)}linedraw(t){const e=this.distance(t),i=[],r=1/Math.max(e,1);for(let s=0;s<=e;s++)i.push(this.lerp(t,r*s).round());return i}equals(t){return this.q===t.q&&this.r===t.r&&this.s===t.s}key(){return`${this.q},${this.r},${this.s}`}toString(){return`Hex(${this.q},${this.r},${this.s})`}}class ud{constructor(t,e,i){this.q=t,this.r=e,this.s=i}round(){let t=Math.round(this.q),e=Math.round(this.r),i=Math.round(this.s);const r=Math.abs(t-this.q),s=Math.abs(e-this.r),a=Math.abs(i-this.s);return r>s&&r>a?t=-e-i:s>a?e=-t-i:i=-t-e,new fe(t,e,i)}}const Jo=[new fe(1,0,-1),new fe(1,-1,0),new fe(0,-1,1),new fe(-1,0,1),new fe(-1,1,0),new fe(0,1,-1)],op=[new fe(2,-1,-1),new fe(1,-2,1),new fe(-1,-1,2),new fe(-2,1,1),new fe(-1,2,-1),new fe(1,1,-2)];class In{constructor(t,e){this.x=t,this.y=e}}class hd{constructor(t,e,i,r,s,a,o,c,l){this.f0=t,this.f1=e,this.f2=i,this.f3=r,this.b0=s,this.b1=a,this.b2=o,this.b3=c,this.startAngle=l}}const dd=new hd(Math.sqrt(3),Math.sqrt(3)/2,0,3/2,Math.sqrt(3)/3,-1/3,0,2/3,.5),fd=new hd(3/2,0,Math.sqrt(3)/2,Math.sqrt(3),2/3,0,-1/3,Math.sqrt(3)/3,0);class pd{constructor(t,e,i){this.orientation=t,this.size=e,this.origin=i}hexToPixel(t){const e=this.orientation,i=(e.f0*t.q+e.f1*t.r)*this.size.x,r=(e.f2*t.q+e.f3*t.r)*this.size.y;return new In(i+this.origin.x,r+this.origin.y)}pixelToHex(t){const e=this.orientation,i=new In((t.x-this.origin.x)/this.size.x,(t.y-this.origin.y)/this.size.y),r=e.b0*i.x+e.b1*i.y,s=e.b2*i.x+e.b3*i.y;return new ud(r,s,-r-s).round()}hexCornerOffset(t){const e=this.orientation,i=2*Math.PI*(e.startAngle-t)/6;return new In(this.size.x*Math.cos(i),this.size.y*Math.sin(i))}polygonCorners(t){const e=this.hexToPixel(t);return Array.from({length:6},(i,r)=>{const s=this.hexCornerOffset(r);return new In(e.x+s.x,e.y+s.y)})}polygonPath(t){return this.polygonCorners(t).map((e,i)=>`${i===0?"M":"L"}${e.x},${e.y}`).join(" ")+"Z"}}function cp(n,t){if(t===0)return[n];const e=[];let i=n.add(Jo[4].scale(t));for(let r=0;r<6;r++)for(let s=0;s<t;s++)e.push(i),i=i.neighbor(r);return e}function md(n,t){const e=[n];for(let i=1;i<=t;i++)e.push(...cp(n,i));return e}function ea(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function lp(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function gd(n){let t,e,i;n.length!==2?(t=ea,e=(o,c)=>ea(n(o),c),i=(o,c)=>n(o)-c):(t=n===ea||n===lp?n:up,e=n,i=n);function r(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<0?l=h+1:u=h}while(l<u)}return l}function s(o,c,l=0,u=o.length){if(l<u){if(t(c,c)!==0)return u;do{const h=l+u>>>1;e(o[h],c)<=0?l=h+1:u=h}while(l<u)}return l}function a(o,c,l=0,u=o.length){const h=r(o,c,l,u-1);return h>l&&i(o[h-1],c)>-i(o[h],c)?h-1:h}return{left:r,center:a,right:s}}function up(){return 0}function hp(n){return n===null?NaN:+n}const dp=gd(ea),fp=dp.right;gd(hp).center;class Ql extends Map{constructor(t,e=gp){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),t!=null)for(const[i,r]of t)this.set(i,r)}get(t){return super.get(tu(this,t))}has(t){return super.has(tu(this,t))}set(t,e){return super.set(pp(this,t),e)}delete(t){return super.delete(mp(this,t))}}function tu({_intern:n,_key:t},e){const i=t(e);return n.has(i)?n.get(i):e}function pp({_intern:n,_key:t},e){const i=t(e);return n.has(i)?n.get(i):(n.set(i,e),e)}function mp({_intern:n,_key:t},e){const i=t(e);return n.has(i)&&(e=n.get(i),n.delete(i)),e}function gp(n){return n!==null&&typeof n=="object"?n.valueOf():n}const _p=Math.sqrt(50),xp=Math.sqrt(10),vp=Math.sqrt(2);function fa(n,t,e){const i=(t-n)/Math.max(0,e),r=Math.floor(Math.log10(i)),s=i/Math.pow(10,r),a=s>=_p?10:s>=xp?5:s>=vp?2:1;let o,c,l;return r<0?(l=Math.pow(10,-r)/a,o=Math.round(n*l),c=Math.round(t*l),o/l<n&&++o,c/l>t&&--c,l=-l):(l=Math.pow(10,r)*a,o=Math.round(n/l),c=Math.round(t/l),o*l<n&&++o,c*l>t&&--c),c<o&&.5<=e&&e<2?fa(n,t,e*2):[o,c,l]}function yp(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const i=t<n,[r,s,a]=i?fa(t,n,e):fa(n,t,e);if(!(s>=r))return[];const o=s-r+1,c=new Array(o);if(i)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(r+l)/-a;else for(let l=0;l<o;++l)c[l]=(r+l)*a;return c}function Qo(n,t,e){return t=+t,n=+n,e=+e,fa(n,t,e)[2]}function Mp(n,t,e){t=+t,n=+n,e=+e;const i=t<n,r=i?Qo(t,n,e):Qo(n,t,e);return(i?-1:1)*(r<0?1/-r:r)}function eu(n,t){let e;if(t===void 0)for(const i of n)i!=null&&(e<i||e===void 0&&i>=i)&&(e=i);else{let i=-1;for(let r of n)(r=t(r,++i,n))!=null&&(e<r||e===void 0&&r>=r)&&(e=r)}return e}function Sp(n,t,e){n=+n,t=+t,e=(r=arguments.length)<2?(t=n,n=0,1):r<3?1:+e;for(var i=-1,r=Math.max(0,Math.ceil((t-n)/e))|0,s=new Array(r);++i<r;)s[i]=n+i*e;return s}function Ep(n){return n}var Ka=1,Za=2,tc=3,Dr=4,nu=1e-6;function bp(n){return"translate("+n+",0)"}function wp(n){return"translate(0,"+n+")"}function Tp(n){return t=>+n(t)}function Ap(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),e=>+n(e)+t}function Rp(){return!this.__axis}function _d(n,t){var e=[],i=null,r=null,s=6,a=6,o=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=n===Ka||n===Dr?-1:1,u=n===Dr||n===Za?"x":"y",h=n===Ka||n===tc?bp:wp;function d(f){var g=i??(t.ticks?t.ticks.apply(t,e):t.domain()),_=r??(t.tickFormat?t.tickFormat.apply(t,e):Ep),m=Math.max(s,0)+o,p=t.range(),b=+p[0]+c,S=+p[p.length-1]+c,v=(t.bandwidth?Ap:Tp)(t.copy(),c),L=f.selection?f.selection():f,A=L.selectAll(".domain").data([null]),R=L.selectAll(".tick").data(g,t).order(),U=R.exit(),E=R.enter().append("g").attr("class","tick"),y=R.select("line"),C=R.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),R=R.merge(E),y=y.merge(E.append("line").attr("stroke","currentColor").attr(u+"2",l*s)),C=C.merge(E.append("text").attr("fill","currentColor").attr(u,l*m).attr("dy",n===Ka?"0em":n===tc?"0.71em":"0.32em")),f!==L&&(A=A.transition(f),R=R.transition(f),y=y.transition(f),C=C.transition(f),U=U.transition(f).attr("opacity",nu).attr("transform",function(F){return isFinite(F=v(F))?h(F+c):this.getAttribute("transform")}),E.attr("opacity",nu).attr("transform",function(F){var H=this.parentNode.__axis;return h((H&&isFinite(H=H(F))?H:v(F))+c)})),U.remove(),A.attr("d",n===Dr||n===Za?a?"M"+l*a+","+b+"H"+c+"V"+S+"H"+l*a:"M"+c+","+b+"V"+S:a?"M"+b+","+l*a+"V"+c+"H"+S+"V"+l*a:"M"+b+","+c+"H"+S),R.attr("opacity",1).attr("transform",function(F){return h(v(F)+c)}),y.attr(u+"2",l*s),C.attr(u,l*m).text(_),L.filter(Rp).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===Za?"start":n===Dr?"end":"middle"),L.each(function(){this.__axis=v})}return d.scale=function(f){return arguments.length?(t=f,d):t},d.ticks=function(){return e=Array.from(arguments),d},d.tickArguments=function(f){return arguments.length?(e=f==null?[]:Array.from(f),d):e.slice()},d.tickValues=function(f){return arguments.length?(i=f==null?null:Array.from(f),d):i&&i.slice()},d.tickFormat=function(f){return arguments.length?(r=f,d):r},d.tickSize=function(f){return arguments.length?(s=a=+f,d):s},d.tickSizeInner=function(f){return arguments.length?(s=+f,d):s},d.tickSizeOuter=function(f){return arguments.length?(a=+f,d):a},d.tickPadding=function(f){return arguments.length?(o=+f,d):o},d.offset=function(f){return arguments.length?(c=+f,d):c},d}function iu(n){return _d(tc,n)}function Cp(n){return _d(Dr,n)}var Pp={value:()=>{}};function al(){for(var n=0,t=arguments.length,e={},i;n<t;++n){if(!(i=arguments[n]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new na(e)}function na(n){this._=n}function Ip(n,t){return n.trim().split(/^|\s+/).map(function(e){var i="",r=e.indexOf(".");if(r>=0&&(i=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}na.prototype=al.prototype={constructor:na,on:function(n,t){var e=this._,i=Ip(n+"",e),r,s=-1,a=i.length;if(arguments.length<2){for(;++s<a;)if((r=(n=i[s]).type)&&(r=Dp(e[r],n.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<a;)if(r=(n=i[s]).type)e[r]=ru(e[r],n.name,t);else if(t==null)for(r in e)e[r]=ru(e[r],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new na(n)},call:function(n,t){if((r=arguments.length-2)>0)for(var e=new Array(r),i=0,r,s;i<r;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],i=0,r=s.length;i<r;++i)s[i].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],r=0,s=i.length;r<s;++r)i[r].value.apply(t,e)}};function Dp(n,t){for(var e=0,i=n.length,r;e<i;++e)if((r=n[e]).name===t)return r.value}function ru(n,t,e){for(var i=0,r=n.length;i<r;++i)if(n[i].name===t){n[i]=Pp,n=n.slice(0,i).concat(n.slice(i+1));break}return e!=null&&n.push({name:t,value:e}),n}var ec="http://www.w3.org/1999/xhtml";const su={svg:"http://www.w3.org/2000/svg",xhtml:ec,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function La(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),su.hasOwnProperty(t)?{space:su[t],local:n}:n}function Lp(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===ec&&t.documentElement.namespaceURI===ec?t.createElement(n):t.createElementNS(e,n)}}function Np(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function xd(n){var t=La(n);return(t.local?Np:Lp)(t)}function Up(){}function ol(n){return n==null?Up:function(){return this.querySelector(n)}}function Fp(n){typeof n!="function"&&(n=ol(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],a=s.length,o=i[r]=new Array(a),c,l,u=0;u<a;++u)(c=s[u])&&(l=n.call(c,c.__data__,u,s))&&("__data__"in c&&(l.__data__=c.__data__),o[u]=l);return new Ge(i,this._parents)}function Op(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function Bp(){return[]}function vd(n){return n==null?Bp:function(){return this.querySelectorAll(n)}}function kp(n){return function(){return Op(n.apply(this,arguments))}}function zp(n){typeof n=="function"?n=kp(n):n=vd(n);for(var t=this._groups,e=t.length,i=[],r=[],s=0;s<e;++s)for(var a=t[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&(i.push(n.call(c,c.__data__,l,a)),r.push(c));return new Ge(i,r)}function yd(n){return function(){return this.matches(n)}}function Md(n){return function(t){return t.matches(n)}}var Hp=Array.prototype.find;function Vp(n){return function(){return Hp.call(this.children,n)}}function Gp(){return this.firstElementChild}function Wp(n){return this.select(n==null?Gp:Vp(typeof n=="function"?n:Md(n)))}var Xp=Array.prototype.filter;function qp(){return Array.from(this.children)}function $p(n){return function(){return Xp.call(this.children,n)}}function Yp(n){return this.selectAll(n==null?qp:$p(typeof n=="function"?n:Md(n)))}function jp(n){typeof n!="function"&&(n=yd(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],a=s.length,o=i[r]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new Ge(i,this._parents)}function Sd(n){return new Array(n.length)}function Kp(){return new Ge(this._enter||this._groups.map(Sd),this._parents)}function pa(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}pa.prototype={constructor:pa,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function Zp(n){return function(){return n}}function Jp(n,t,e,i,r,s){for(var a=0,o,c=t.length,l=s.length;a<l;++a)(o=t[a])?(o.__data__=s[a],i[a]=o):e[a]=new pa(n,s[a]);for(;a<c;++a)(o=t[a])&&(r[a]=o)}function Qp(n,t,e,i,r,s,a){var o,c,l=new Map,u=t.length,h=s.length,d=new Array(u),f;for(o=0;o<u;++o)(c=t[o])&&(d[o]=f=a.call(c,c.__data__,o,t)+"",l.has(f)?r[o]=c:l.set(f,c));for(o=0;o<h;++o)f=a.call(n,s[o],o,s)+"",(c=l.get(f))?(i[o]=c,c.__data__=s[o],l.delete(f)):e[o]=new pa(n,s[o]);for(o=0;o<u;++o)(c=t[o])&&l.get(d[o])===c&&(r[o]=c)}function tm(n){return n.__data__}function em(n,t){if(!arguments.length)return Array.from(this,tm);var e=t?Qp:Jp,i=this._parents,r=this._groups;typeof n!="function"&&(n=Zp(n));for(var s=r.length,a=new Array(s),o=new Array(s),c=new Array(s),l=0;l<s;++l){var u=i[l],h=r[l],d=h.length,f=nm(n.call(u,u&&u.__data__,l,i)),g=f.length,_=o[l]=new Array(g),m=a[l]=new Array(g),p=c[l]=new Array(d);e(u,h,_,m,p,f,t);for(var b=0,S=0,v,L;b<g;++b)if(v=_[b]){for(b>=S&&(S=b+1);!(L=m[S])&&++S<g;);v._next=L||null}}return a=new Ge(a,i),a._enter=o,a._exit=c,a}function nm(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function im(){return new Ge(this._exit||this._groups.map(Sd),this._parents)}function rm(n,t,e){var i=this.enter(),r=this,s=this.exit();return typeof n=="function"?(i=n(i),i&&(i=i.selection())):i=i.append(n+""),t!=null&&(r=t(r),r&&(r=r.selection())),e==null?s.remove():e(s),i&&r?i.merge(r).order():r}function sm(n){for(var t=n.selection?n.selection():n,e=this._groups,i=t._groups,r=e.length,s=i.length,a=Math.min(r,s),o=new Array(r),c=0;c<a;++c)for(var l=e[c],u=i[c],h=l.length,d=o[c]=new Array(h),f,g=0;g<h;++g)(f=l[g]||u[g])&&(d[g]=f);for(;c<r;++c)o[c]=e[c];return new Ge(o,this._parents)}function am(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var i=n[t],r=i.length-1,s=i[r],a;--r>=0;)(a=i[r])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function om(n){n||(n=cm);function t(h,d){return h&&d?n(h.__data__,d.__data__):!h-!d}for(var e=this._groups,i=e.length,r=new Array(i),s=0;s<i;++s){for(var a=e[s],o=a.length,c=r[s]=new Array(o),l,u=0;u<o;++u)(l=a[u])&&(c[u]=l);c.sort(t)}return new Ge(r,this._parents).order()}function cm(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function lm(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function um(){return Array.from(this)}function hm(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,s=i.length;r<s;++r){var a=i[r];if(a)return a}return null}function dm(){let n=0;for(const t of this)++n;return n}function fm(){return!this.node()}function pm(n){for(var t=this._groups,e=0,i=t.length;e<i;++e)for(var r=t[e],s=0,a=r.length,o;s<a;++s)(o=r[s])&&n.call(o,o.__data__,s,r);return this}function mm(n){return function(){this.removeAttribute(n)}}function gm(n){return function(){this.removeAttributeNS(n.space,n.local)}}function _m(n,t){return function(){this.setAttribute(n,t)}}function xm(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function vm(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function ym(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function Mm(n,t){var e=La(n);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((t==null?e.local?gm:mm:typeof t=="function"?e.local?ym:vm:e.local?xm:_m)(e,t))}function Ed(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function Sm(n){return function(){this.style.removeProperty(n)}}function Em(n,t,e){return function(){this.style.setProperty(n,t,e)}}function bm(n,t,e){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(n):this.style.setProperty(n,i,e)}}function wm(n,t,e){return arguments.length>1?this.each((t==null?Sm:typeof t=="function"?bm:Em)(n,t,e??"")):tr(this.node(),n)}function tr(n,t){return n.style.getPropertyValue(t)||Ed(n).getComputedStyle(n,null).getPropertyValue(t)}function Tm(n){return function(){delete this[n]}}function Am(n,t){return function(){this[n]=t}}function Rm(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function Cm(n,t){return arguments.length>1?this.each((t==null?Tm:typeof t=="function"?Rm:Am)(n,t)):this.node()[n]}function bd(n){return n.trim().split(/^|\s+/)}function cl(n){return n.classList||new wd(n)}function wd(n){this._node=n,this._names=bd(n.getAttribute("class")||"")}wd.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Td(n,t){for(var e=cl(n),i=-1,r=t.length;++i<r;)e.add(t[i])}function Ad(n,t){for(var e=cl(n),i=-1,r=t.length;++i<r;)e.remove(t[i])}function Pm(n){return function(){Td(this,n)}}function Im(n){return function(){Ad(this,n)}}function Dm(n,t){return function(){(t.apply(this,arguments)?Td:Ad)(this,n)}}function Lm(n,t){var e=bd(n+"");if(arguments.length<2){for(var i=cl(this.node()),r=-1,s=e.length;++r<s;)if(!i.contains(e[r]))return!1;return!0}return this.each((typeof t=="function"?Dm:t?Pm:Im)(e,t))}function Nm(){this.textContent=""}function Um(n){return function(){this.textContent=n}}function Fm(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function Om(n){return arguments.length?this.each(n==null?Nm:(typeof n=="function"?Fm:Um)(n)):this.node().textContent}function Bm(){this.innerHTML=""}function km(n){return function(){this.innerHTML=n}}function zm(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function Hm(n){return arguments.length?this.each(n==null?Bm:(typeof n=="function"?zm:km)(n)):this.node().innerHTML}function Vm(){this.nextSibling&&this.parentNode.appendChild(this)}function Gm(){return this.each(Vm)}function Wm(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Xm(){return this.each(Wm)}function qm(n){var t=typeof n=="function"?n:xd(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function $m(){return null}function Ym(n,t){var e=typeof n=="function"?n:xd(n),i=t==null?$m:typeof t=="function"?t:ol(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)})}function jm(){var n=this.parentNode;n&&n.removeChild(this)}function Km(){return this.each(jm)}function Zm(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Jm(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function Qm(n){return this.select(n?Jm:Zm)}function tg(n){return arguments.length?this.property("__data__",n):this.node().__data__}function eg(n){return function(t){n.call(this,t,this.__data__)}}function ng(n){return n.trim().split(/^|\s+/).map(function(t){var e="",i=t.indexOf(".");return i>=0&&(e=t.slice(i+1),t=t.slice(0,i)),{type:t,name:e}})}function ig(n){return function(){var t=this.__on;if(t){for(var e=0,i=-1,r=t.length,s;e<r;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++i]=s;++i?t.length=i:delete this.__on}}}function rg(n,t,e){return function(){var i=this.__on,r,s=eg(t);if(i){for(var a=0,o=i.length;a<o;++a)if((r=i[a]).type===n.type&&r.name===n.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=s,r.options=e),r.value=t;return}}this.addEventListener(n.type,s,e),r={type:n.type,name:n.name,value:t,listener:s,options:e},i?i.push(r):this.__on=[r]}}function sg(n,t,e){var i=ng(n+""),r,s=i.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var c=0,l=o.length,u;c<l;++c)for(r=0,u=o[c];r<s;++r)if((a=i[r]).type===u.type&&a.name===u.name)return u.value}return}for(o=t?rg:ig,r=0;r<s;++r)this.each(o(i[r],t,e));return this}function Rd(n,t,e){var i=Ed(n),r=i.CustomEvent;typeof r=="function"?r=new r(t,e):(r=i.document.createEvent("Event"),e?(r.initEvent(t,e.bubbles,e.cancelable),r.detail=e.detail):r.initEvent(t,!1,!1)),n.dispatchEvent(r)}function ag(n,t){return function(){return Rd(this,n,t)}}function og(n,t){return function(){return Rd(this,n,t.apply(this,arguments))}}function cg(n,t){return this.each((typeof t=="function"?og:ag)(n,t))}function*lg(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,s=i.length,a;r<s;++r)(a=i[r])&&(yield a)}var Cd=[null];function Ge(n,t){this._groups=n,this._parents=t}function Zr(){return new Ge([[document.documentElement]],Cd)}function ug(){return this}Ge.prototype=Zr.prototype={constructor:Ge,select:Fp,selectAll:zp,selectChild:Wp,selectChildren:Yp,filter:jp,data:em,enter:Kp,exit:im,join:rm,merge:sm,selection:ug,order:am,sort:om,call:lm,nodes:um,node:hm,size:dm,empty:fm,each:pm,attr:Mm,style:wm,property:Cm,classed:Lm,text:Om,html:Hm,raise:Gm,lower:Xm,append:qm,insert:Ym,remove:Km,clone:Qm,datum:tg,on:sg,dispatch:cg,[Symbol.iterator]:lg};function hn(n){return typeof n=="string"?new Ge([[document.querySelector(n)]],[document.documentElement]):new Ge([[n]],Cd)}function hg(n){let t;for(;t=n.sourceEvent;)n=t;return n}function ni(n,t){if(n=hg(n),t===void 0&&(t=n.currentTarget),t){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var i=e.createSVGPoint();return i.x=n.clientX,i.y=n.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var r=t.getBoundingClientRect();return[n.clientX-r.left-t.clientLeft,n.clientY-r.top-t.clientTop]}}return[n.pageX,n.pageY]}const nc={capture:!0,passive:!1};function ic(n){n.preventDefault(),n.stopImmediatePropagation()}function dg(n){var t=n.document.documentElement,e=hn(n).on("dragstart.drag",ic,nc);"onselectstart"in t?e.on("selectstart.drag",ic,nc):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function fg(n,t){var e=n.document.documentElement,i=hn(n).on("dragstart.drag",null);t&&(i.on("click.drag",ic,nc),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in e?i.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function ll(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function Pd(n,t){var e=Object.create(n.prototype);for(var i in t)e[i]=t[i];return e}function Jr(){}var Hr=.7,ma=1/Hr,$i="\\s*([+-]?\\d+)\\s*",Vr="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",mn="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",pg=/^#([0-9a-f]{3,8})$/,mg=new RegExp(`^rgb\\(${$i},${$i},${$i}\\)$`),gg=new RegExp(`^rgb\\(${mn},${mn},${mn}\\)$`),_g=new RegExp(`^rgba\\(${$i},${$i},${$i},${Vr}\\)$`),xg=new RegExp(`^rgba\\(${mn},${mn},${mn},${Vr}\\)$`),vg=new RegExp(`^hsl\\(${Vr},${mn},${mn}\\)$`),yg=new RegExp(`^hsla\\(${Vr},${mn},${mn},${Vr}\\)$`),au={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ll(Jr,Kn,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:ou,formatHex:ou,formatHex8:Mg,formatHsl:Sg,formatRgb:cu,toString:cu});function ou(){return this.rgb().formatHex()}function Mg(){return this.rgb().formatHex8()}function Sg(){return Id(this).formatHsl()}function cu(){return this.rgb().formatRgb()}function Kn(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=pg.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?lu(t):e===3?new Fe(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?cs(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?cs(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=mg.exec(n))?new Fe(t[1],t[2],t[3],1):(t=gg.exec(n))?new Fe(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=_g.exec(n))?cs(t[1],t[2],t[3],t[4]):(t=xg.exec(n))?cs(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=vg.exec(n))?du(t[1],t[2]/100,t[3]/100,1):(t=yg.exec(n))?du(t[1],t[2]/100,t[3]/100,t[4]):au.hasOwnProperty(n)?lu(au[n]):n==="transparent"?new Fe(NaN,NaN,NaN,0):null}function lu(n){return new Fe(n>>16&255,n>>8&255,n&255,1)}function cs(n,t,e,i){return i<=0&&(n=t=e=NaN),new Fe(n,t,e,i)}function Eg(n){return n instanceof Jr||(n=Kn(n)),n?(n=n.rgb(),new Fe(n.r,n.g,n.b,n.opacity)):new Fe}function rc(n,t,e,i){return arguments.length===1?Eg(n):new Fe(n,t,e,i??1)}function Fe(n,t,e,i){this.r=+n,this.g=+t,this.b=+e,this.opacity=+i}ll(Fe,rc,Pd(Jr,{brighter(n){return n=n==null?ma:Math.pow(ma,n),new Fe(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?Hr:Math.pow(Hr,n),new Fe(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new Fe(gi(this.r),gi(this.g),gi(this.b),ga(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:uu,formatHex:uu,formatHex8:bg,formatRgb:hu,toString:hu}));function uu(){return`#${fi(this.r)}${fi(this.g)}${fi(this.b)}`}function bg(){return`#${fi(this.r)}${fi(this.g)}${fi(this.b)}${fi((isNaN(this.opacity)?1:this.opacity)*255)}`}function hu(){const n=ga(this.opacity);return`${n===1?"rgb(":"rgba("}${gi(this.r)}, ${gi(this.g)}, ${gi(this.b)}${n===1?")":`, ${n})`}`}function ga(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function gi(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function fi(n){return n=gi(n),(n<16?"0":"")+n.toString(16)}function du(n,t,e,i){return i<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new rn(n,t,e,i)}function Id(n){if(n instanceof rn)return new rn(n.h,n.s,n.l,n.opacity);if(n instanceof Jr||(n=Kn(n)),!n)return new rn;if(n instanceof rn)return n;n=n.rgb();var t=n.r/255,e=n.g/255,i=n.b/255,r=Math.min(t,e,i),s=Math.max(t,e,i),a=NaN,o=s-r,c=(s+r)/2;return o?(t===s?a=(e-i)/o+(e<i)*6:e===s?a=(i-t)/o+2:a=(t-e)/o+4,o/=c<.5?s+r:2-s-r,a*=60):o=c>0&&c<1?0:a,new rn(a,o,c,n.opacity)}function wg(n,t,e,i){return arguments.length===1?Id(n):new rn(n,t,e,i??1)}function rn(n,t,e,i){this.h=+n,this.s=+t,this.l=+e,this.opacity=+i}ll(rn,wg,Pd(Jr,{brighter(n){return n=n==null?ma:Math.pow(ma,n),new rn(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?Hr:Math.pow(Hr,n),new rn(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,i=e+(e<.5?e:1-e)*t,r=2*e-i;return new Fe(Ja(n>=240?n-240:n+120,r,i),Ja(n,r,i),Ja(n<120?n+240:n-120,r,i),this.opacity)},clamp(){return new rn(fu(this.h),ls(this.s),ls(this.l),ga(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=ga(this.opacity);return`${n===1?"hsl(":"hsla("}${fu(this.h)}, ${ls(this.s)*100}%, ${ls(this.l)*100}%${n===1?")":`, ${n})`}`}}));function fu(n){return n=(n||0)%360,n<0?n+360:n}function ls(n){return Math.max(0,Math.min(1,n||0))}function Ja(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}const ul=n=>()=>n;function Tg(n,t){return function(e){return n+e*t}}function Ag(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(i){return Math.pow(n+i*t,e)}}function Rg(n){return(n=+n)==1?Dd:function(t,e){return e-t?Ag(t,e,n):ul(isNaN(t)?e:t)}}function Dd(n,t){var e=t-n;return e?Tg(n,e):ul(isNaN(n)?t:n)}const _a=(function n(t){var e=Rg(t);function i(r,s){var a=e((r=rc(r)).r,(s=rc(s)).r),o=e(r.g,s.g),c=e(r.b,s.b),l=Dd(r.opacity,s.opacity);return function(u){return r.r=a(u),r.g=o(u),r.b=c(u),r.opacity=l(u),r+""}}return i.gamma=n,i})(1);function Cg(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,i=t.slice(),r;return function(s){for(r=0;r<e;++r)i[r]=n[r]*(1-s)+t[r]*s;return i}}function Pg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ig(n,t){var e=t?t.length:0,i=n?Math.min(e,n.length):0,r=new Array(i),s=new Array(e),a;for(a=0;a<i;++a)r[a]=hl(n[a],t[a]);for(;a<e;++a)s[a]=t[a];return function(o){for(a=0;a<i;++a)s[a]=r[a](o);return s}}function Dg(n,t){var e=new Date;return n=+n,t=+t,function(i){return e.setTime(n*(1-i)+t*i),e}}function nn(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function Lg(n,t){var e={},i={},r;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in n?e[r]=hl(n[r],t[r]):i[r]=t[r];return function(s){for(r in e)i[r]=e[r](s);return i}}var sc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Qa=new RegExp(sc.source,"g");function Ng(n){return function(){return n}}function Ug(n){return function(t){return n(t)+""}}function Ld(n,t){var e=sc.lastIndex=Qa.lastIndex=0,i,r,s,a=-1,o=[],c=[];for(n=n+"",t=t+"";(i=sc.exec(n))&&(r=Qa.exec(t));)(s=r.index)>e&&(s=t.slice(e,s),o[a]?o[a]+=s:o[++a]=s),(i=i[0])===(r=r[0])?o[a]?o[a]+=r:o[++a]=r:(o[++a]=null,c.push({i:a,x:nn(i,r)})),e=Qa.lastIndex;return e<t.length&&(s=t.slice(e),o[a]?o[a]+=s:o[++a]=s),o.length<2?c[0]?Ug(c[0].x):Ng(t):(t=c.length,function(l){for(var u=0,h;u<t;++u)o[(h=c[u]).i]=h.x(l);return o.join("")})}function hl(n,t){var e=typeof t,i;return t==null||e==="boolean"?ul(t):(e==="number"?nn:e==="string"?(i=Kn(t))?(t=i,_a):Ld:t instanceof Kn?_a:t instanceof Date?Dg:Pg(t)?Cg:Array.isArray(t)?Ig:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Lg:nn)(n,t)}function Fg(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var pu=180/Math.PI,ac={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Nd(n,t,e,i,r,s){var a,o,c;return(a=Math.sqrt(n*n+t*t))&&(n/=a,t/=a),(c=n*e+t*i)&&(e-=n*c,i-=t*c),(o=Math.sqrt(e*e+i*i))&&(e/=o,i/=o,c/=o),n*i<t*e&&(n=-n,t=-t,c=-c,a=-a),{translateX:r,translateY:s,rotate:Math.atan2(t,n)*pu,skewX:Math.atan(c)*pu,scaleX:a,scaleY:o}}var us;function Og(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?ac:Nd(t.a,t.b,t.c,t.d,t.e,t.f)}function Bg(n){return n==null||(us||(us=document.createElementNS("http://www.w3.org/2000/svg","g")),us.setAttribute("transform",n),!(n=us.transform.baseVal.consolidate()))?ac:(n=n.matrix,Nd(n.a,n.b,n.c,n.d,n.e,n.f))}function Ud(n,t,e,i){function r(l){return l.length?l.pop()+" ":""}function s(l,u,h,d,f,g){if(l!==h||u!==d){var _=f.push("translate(",null,t,null,e);g.push({i:_-4,x:nn(l,h)},{i:_-2,x:nn(u,d)})}else(h||d)&&f.push("translate("+h+t+d+e)}function a(l,u,h,d){l!==u?(l-u>180?u+=360:u-l>180&&(l+=360),d.push({i:h.push(r(h)+"rotate(",null,i)-2,x:nn(l,u)})):u&&h.push(r(h)+"rotate("+u+i)}function o(l,u,h,d){l!==u?d.push({i:h.push(r(h)+"skewX(",null,i)-2,x:nn(l,u)}):u&&h.push(r(h)+"skewX("+u+i)}function c(l,u,h,d,f,g){if(l!==h||u!==d){var _=f.push(r(f)+"scale(",null,",",null,")");g.push({i:_-4,x:nn(l,h)},{i:_-2,x:nn(u,d)})}else(h!==1||d!==1)&&f.push(r(f)+"scale("+h+","+d+")")}return function(l,u){var h=[],d=[];return l=n(l),u=n(u),s(l.translateX,l.translateY,u.translateX,u.translateY,h,d),a(l.rotate,u.rotate,h,d),o(l.skewX,u.skewX,h,d),c(l.scaleX,l.scaleY,u.scaleX,u.scaleY,h,d),l=u=null,function(f){for(var g=-1,_=d.length,m;++g<_;)h[(m=d[g]).i]=m.x(f);return h.join("")}}}var kg=Ud(Og,"px, ","px)","deg)"),zg=Ud(Bg,", ",")",")"),Hg=1e-12;function mu(n){return((n=Math.exp(n))+1/n)/2}function Vg(n){return((n=Math.exp(n))-1/n)/2}function Gg(n){return((n=Math.exp(2*n))-1)/(n+1)}const Wg=(function n(t,e,i){function r(s,a){var o=s[0],c=s[1],l=s[2],u=a[0],h=a[1],d=a[2],f=u-o,g=h-c,_=f*f+g*g,m,p;if(_<Hg)p=Math.log(d/l)/t,m=function(R){return[o+R*f,c+R*g,l*Math.exp(t*R*p)]};else{var b=Math.sqrt(_),S=(d*d-l*l+i*_)/(2*l*e*b),v=(d*d-l*l-i*_)/(2*d*e*b),L=Math.log(Math.sqrt(S*S+1)-S),A=Math.log(Math.sqrt(v*v+1)-v);p=(A-L)/t,m=function(R){var U=R*p,E=mu(L),y=l/(e*b)*(E*Gg(t*U+L)-Vg(L));return[o+y*f,c+y*g,l*E/mu(t*U+L)]}}return m.duration=p*1e3*t/Math.SQRT2,m}return r.rho=function(s){var a=Math.max(.001,+s),o=a*a,c=o*o;return n(a,o,c)},r})(Math.SQRT2,2,4);var er=0,Lr=0,fr=0,Fd=1e3,xa,Nr,va=0,_i=0,Na=0,Gr=typeof performance=="object"&&performance.now?performance:Date,Od=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function dl(){return _i||(Od(Xg),_i=Gr.now()+Na)}function Xg(){_i=0}function ya(){this._call=this._time=this._next=null}ya.prototype=Bd.prototype={constructor:ya,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?dl():+e)+(t==null?0:+t),!this._next&&Nr!==this&&(Nr?Nr._next=this:xa=this,Nr=this),this._call=n,this._time=e,oc()},stop:function(){this._call&&(this._call=null,this._time=1/0,oc())}};function Bd(n,t,e){var i=new ya;return i.restart(n,t,e),i}function qg(){dl(),++er;for(var n=xa,t;n;)(t=_i-n._time)>=0&&n._call.call(void 0,t),n=n._next;--er}function gu(){_i=(va=Gr.now())+Na,er=Lr=0;try{qg()}finally{er=0,Yg(),_i=0}}function $g(){var n=Gr.now(),t=n-va;t>Fd&&(Na-=t,va=n)}function Yg(){for(var n,t=xa,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:xa=e);Nr=n,oc(i)}function oc(n){if(!er){Lr&&(Lr=clearTimeout(Lr));var t=n-_i;t>24?(n<1/0&&(Lr=setTimeout(gu,n-Gr.now()-Na)),fr&&(fr=clearInterval(fr))):(fr||(va=Gr.now(),fr=setInterval($g,Fd)),er=1,Od(gu))}}function _u(n,t,e){var i=new ya;return t=t==null?0:+t,i.restart(r=>{i.stop(),n(r+t)},t,e),i}var jg=al("start","end","cancel","interrupt"),Kg=[],kd=0,xu=1,cc=2,ia=3,vu=4,lc=5,ra=6;function Ua(n,t,e,i,r,s){var a=n.__transition;if(!a)n.__transition={};else if(e in a)return;Zg(n,e,{name:t,index:i,group:r,on:jg,tween:Kg,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:kd})}function fl(n,t){var e=ln(n,t);if(e.state>kd)throw new Error("too late; already scheduled");return e}function vn(n,t){var e=ln(n,t);if(e.state>ia)throw new Error("too late; already running");return e}function ln(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function Zg(n,t,e){var i=n.__transition,r;i[t]=e,e.timer=Bd(s,0,e.time);function s(l){e.state=xu,e.timer.restart(a,e.delay,e.time),e.delay<=l&&a(l-e.delay)}function a(l){var u,h,d,f;if(e.state!==xu)return c();for(u in i)if(f=i[u],f.name===e.name){if(f.state===ia)return _u(a);f.state===vu?(f.state=ra,f.timer.stop(),f.on.call("interrupt",n,n.__data__,f.index,f.group),delete i[u]):+u<t&&(f.state=ra,f.timer.stop(),f.on.call("cancel",n,n.__data__,f.index,f.group),delete i[u])}if(_u(function(){e.state===ia&&(e.state=vu,e.timer.restart(o,e.delay,e.time),o(l))}),e.state=cc,e.on.call("start",n,n.__data__,e.index,e.group),e.state===cc){for(e.state=ia,r=new Array(d=e.tween.length),u=0,h=-1;u<d;++u)(f=e.tween[u].value.call(n,n.__data__,e.index,e.group))&&(r[++h]=f);r.length=h+1}}function o(l){for(var u=l<e.duration?e.ease.call(null,l/e.duration):(e.timer.restart(c),e.state=lc,1),h=-1,d=r.length;++h<d;)r[h].call(n,u);e.state===lc&&(e.on.call("end",n,n.__data__,e.index,e.group),c())}function c(){e.state=ra,e.timer.stop(),delete i[t];for(var l in i)return;delete n.__transition}}function sa(n,t){var e=n.__transition,i,r,s=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((i=e[a]).name!==t){s=!1;continue}r=i.state>cc&&i.state<lc,i.state=ra,i.timer.stop(),i.on.call(r?"interrupt":"cancel",n,n.__data__,i.index,i.group),delete e[a]}s&&delete n.__transition}}function Jg(n){return this.each(function(){sa(this,n)})}function Qg(n,t){var e,i;return function(){var r=vn(this,n),s=r.tween;if(s!==e){i=e=s;for(var a=0,o=i.length;a<o;++a)if(i[a].name===t){i=i.slice(),i.splice(a,1);break}}r.tween=i}}function t_(n,t,e){var i,r;if(typeof e!="function")throw new Error;return function(){var s=vn(this,n),a=s.tween;if(a!==i){r=(i=a).slice();for(var o={name:t,value:e},c=0,l=r.length;c<l;++c)if(r[c].name===t){r[c]=o;break}c===l&&r.push(o)}s.tween=r}}function e_(n,t){var e=this._id;if(n+="",arguments.length<2){for(var i=ln(this.node(),e).tween,r=0,s=i.length,a;r<s;++r)if((a=i[r]).name===n)return a.value;return null}return this.each((t==null?Qg:t_)(e,n,t))}function pl(n,t,e){var i=n._id;return n.each(function(){var r=vn(this,i);(r.value||(r.value={}))[t]=e.apply(this,arguments)}),function(r){return ln(r,i).value[t]}}function zd(n,t){var e;return(typeof t=="number"?nn:t instanceof Kn?_a:(e=Kn(t))?(t=e,_a):Ld)(n,t)}function n_(n){return function(){this.removeAttribute(n)}}function i_(n){return function(){this.removeAttributeNS(n.space,n.local)}}function r_(n,t,e){var i,r=e+"",s;return function(){var a=this.getAttribute(n);return a===r?null:a===i?s:s=t(i=a,e)}}function s_(n,t,e){var i,r=e+"",s;return function(){var a=this.getAttributeNS(n.space,n.local);return a===r?null:a===i?s:s=t(i=a,e)}}function a_(n,t,e){var i,r,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttribute(n):(a=this.getAttribute(n),c=o+"",a===c?null:a===i&&c===r?s:(r=c,s=t(i=a,o)))}}function o_(n,t,e){var i,r,s;return function(){var a,o=e(this),c;return o==null?void this.removeAttributeNS(n.space,n.local):(a=this.getAttributeNS(n.space,n.local),c=o+"",a===c?null:a===i&&c===r?s:(r=c,s=t(i=a,o)))}}function c_(n,t){var e=La(n),i=e==="transform"?zg:zd;return this.attrTween(n,typeof t=="function"?(e.local?o_:a_)(e,i,pl(this,"attr."+n,t)):t==null?(e.local?i_:n_)(e):(e.local?s_:r_)(e,i,t))}function l_(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function u_(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function h_(n,t){var e,i;function r(){var s=t.apply(this,arguments);return s!==i&&(e=(i=s)&&u_(n,s)),e}return r._value=t,r}function d_(n,t){var e,i;function r(){var s=t.apply(this,arguments);return s!==i&&(e=(i=s)&&l_(n,s)),e}return r._value=t,r}function f_(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var i=La(n);return this.tween(e,(i.local?h_:d_)(i,t))}function p_(n,t){return function(){fl(this,n).delay=+t.apply(this,arguments)}}function m_(n,t){return t=+t,function(){fl(this,n).delay=t}}function g_(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?p_:m_)(t,n)):ln(this.node(),t).delay}function __(n,t){return function(){vn(this,n).duration=+t.apply(this,arguments)}}function x_(n,t){return t=+t,function(){vn(this,n).duration=t}}function v_(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?__:x_)(t,n)):ln(this.node(),t).duration}function y_(n,t){if(typeof t!="function")throw new Error;return function(){vn(this,n).ease=t}}function M_(n){var t=this._id;return arguments.length?this.each(y_(t,n)):ln(this.node(),t).ease}function S_(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;vn(this,n).ease=e}}function E_(n){if(typeof n!="function")throw new Error;return this.each(S_(this._id,n))}function b_(n){typeof n!="function"&&(n=yd(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],a=s.length,o=i[r]=[],c,l=0;l<a;++l)(c=s[l])&&n.call(c,c.__data__,l,s)&&o.push(c);return new Fn(i,this._parents,this._name,this._id)}function w_(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,i=t.length,r=e.length,s=Math.min(i,r),a=new Array(i),o=0;o<s;++o)for(var c=t[o],l=e[o],u=c.length,h=a[o]=new Array(u),d,f=0;f<u;++f)(d=c[f]||l[f])&&(h[f]=d);for(;o<i;++o)a[o]=t[o];return new Fn(a,this._parents,this._name,this._id)}function T_(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function A_(n,t,e){var i,r,s=T_(t)?fl:vn;return function(){var a=s(this,n),o=a.on;o!==i&&(r=(i=o).copy()).on(t,e),a.on=r}}function R_(n,t){var e=this._id;return arguments.length<2?ln(this.node(),e).on.on(n):this.each(A_(e,n,t))}function C_(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function P_(){return this.on("end.remove",C_(this._id))}function I_(n){var t=this._name,e=this._id;typeof n!="function"&&(n=ol(n));for(var i=this._groups,r=i.length,s=new Array(r),a=0;a<r;++a)for(var o=i[a],c=o.length,l=s[a]=new Array(c),u,h,d=0;d<c;++d)(u=o[d])&&(h=n.call(u,u.__data__,d,o))&&("__data__"in u&&(h.__data__=u.__data__),l[d]=h,Ua(l[d],t,e,d,l,ln(u,e)));return new Fn(s,this._parents,t,e)}function D_(n){var t=this._name,e=this._id;typeof n!="function"&&(n=vd(n));for(var i=this._groups,r=i.length,s=[],a=[],o=0;o<r;++o)for(var c=i[o],l=c.length,u,h=0;h<l;++h)if(u=c[h]){for(var d=n.call(u,u.__data__,h,c),f,g=ln(u,e),_=0,m=d.length;_<m;++_)(f=d[_])&&Ua(f,t,e,_,d,g);s.push(d),a.push(u)}return new Fn(s,a,t,e)}var L_=Zr.prototype.constructor;function N_(){return new L_(this._groups,this._parents)}function U_(n,t){var e,i,r;return function(){var s=tr(this,n),a=(this.style.removeProperty(n),tr(this,n));return s===a?null:s===e&&a===i?r:r=t(e=s,i=a)}}function Hd(n){return function(){this.style.removeProperty(n)}}function F_(n,t,e){var i,r=e+"",s;return function(){var a=tr(this,n);return a===r?null:a===i?s:s=t(i=a,e)}}function O_(n,t,e){var i,r,s;return function(){var a=tr(this,n),o=e(this),c=o+"";return o==null&&(c=o=(this.style.removeProperty(n),tr(this,n))),a===c?null:a===i&&c===r?s:(r=c,s=t(i=a,o))}}function B_(n,t){var e,i,r,s="style."+t,a="end."+s,o;return function(){var c=vn(this,n),l=c.on,u=c.value[s]==null?o||(o=Hd(t)):void 0;(l!==e||r!==u)&&(i=(e=l).copy()).on(a,r=u),c.on=i}}function k_(n,t,e){var i=(n+="")=="transform"?kg:zd;return t==null?this.styleTween(n,U_(n,i)).on("end.style."+n,Hd(n)):typeof t=="function"?this.styleTween(n,O_(n,i,pl(this,"style."+n,t))).each(B_(this._id,n)):this.styleTween(n,F_(n,i,t),e).on("end.style."+n,null)}function z_(n,t,e){return function(i){this.style.setProperty(n,t.call(this,i),e)}}function H_(n,t,e){var i,r;function s(){var a=t.apply(this,arguments);return a!==r&&(i=(r=a)&&z_(n,a,e)),i}return s._value=t,s}function V_(n,t,e){var i="style."+(n+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,H_(n,t,e??""))}function G_(n){return function(){this.textContent=n}}function W_(n){return function(){var t=n(this);this.textContent=t??""}}function X_(n){return this.tween("text",typeof n=="function"?W_(pl(this,"text",n)):G_(n==null?"":n+""))}function q_(n){return function(t){this.textContent=n.call(this,t)}}function $_(n){var t,e;function i(){var r=n.apply(this,arguments);return r!==e&&(t=(e=r)&&q_(r)),t}return i._value=n,i}function Y_(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,$_(n))}function j_(){for(var n=this._name,t=this._id,e=Vd(),i=this._groups,r=i.length,s=0;s<r;++s)for(var a=i[s],o=a.length,c,l=0;l<o;++l)if(c=a[l]){var u=ln(c,t);Ua(c,n,e,l,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Fn(i,this._parents,n,e)}function K_(){var n,t,e=this,i=e._id,r=e.size();return new Promise(function(s,a){var o={value:a},c={value:function(){--r===0&&s()}};e.each(function(){var l=vn(this,i),u=l.on;u!==n&&(t=(n=u).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(c)),l.on=t}),r===0&&s()})}var Z_=0;function Fn(n,t,e,i){this._groups=n,this._parents=t,this._name=e,this._id=i}function Vd(){return++Z_}var Sn=Zr.prototype;Fn.prototype={constructor:Fn,select:I_,selectAll:D_,selectChild:Sn.selectChild,selectChildren:Sn.selectChildren,filter:b_,merge:w_,selection:N_,transition:j_,call:Sn.call,nodes:Sn.nodes,node:Sn.node,size:Sn.size,empty:Sn.empty,each:Sn.each,on:R_,attr:c_,attrTween:f_,style:k_,styleTween:V_,text:X_,textTween:Y_,remove:P_,tween:e_,delay:g_,duration:v_,ease:M_,easeVarying:E_,end:K_,[Symbol.iterator]:Sn[Symbol.iterator]};function J_(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var Q_={time:null,delay:0,duration:250,ease:J_};function t0(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function e0(n){var t,e;n instanceof Fn?(t=n._id,n=n._name):(t=Vd(),(e=Q_).time=dl(),n=n==null?null:n+"");for(var i=this._groups,r=i.length,s=0;s<r;++s)for(var a=i[s],o=a.length,c,l=0;l<o;++l)(c=a[l])&&Ua(c,n,t,l,a,e||t0(c,t));return new Fn(i,this._parents,n,t)}Zr.prototype.interrupt=Jg;Zr.prototype.transition=e0;function n0(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function Ma(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),i=n.slice(0,e);return[i.length>1?i[0]+i.slice(2):i,+n.slice(e+1)]}function nr(n){return n=Ma(Math.abs(n)),n?n[1]:NaN}function i0(n,t){return function(e,i){for(var r=e.length,s=[],a=0,o=n[0],c=0;r>0&&o>0&&(c+o+1>i&&(o=Math.max(1,i-c)),s.push(e.substring(r-=o,r+o)),!((c+=o+1)>i));)o=n[a=(a+1)%n.length];return s.reverse().join(t)}}function r0(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var s0=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Sa(n){if(!(t=s0.exec(n)))throw new Error("invalid format: "+n);var t;return new ml({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}Sa.prototype=ml.prototype;function ml(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}ml.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function a0(n){t:for(var t=n.length,e=1,i=-1,r;e<t;++e)switch(n[e]){case".":i=r=e;break;case"0":i===0&&(i=e),r=e;break;default:if(!+n[e])break t;i>0&&(i=0);break}return i>0?n.slice(0,i)+n.slice(r+1):n}var Ea;function o0(n,t){var e=Ma(n,t);if(!e)return Ea=void 0,n.toPrecision(t);var i=e[0],r=e[1],s=r-(Ea=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,a=i.length;return s===a?i:s>a?i+new Array(s-a+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+Ma(n,Math.max(0,t+s-1))[0]}function yu(n,t){var e=Ma(n,t);if(!e)return n+"";var i=e[0],r=e[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Mu={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:n0,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>yu(n*100,t),r:yu,s:o0,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Su(n){return n}var Eu=Array.prototype.map,bu=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function c0(n){var t=n.grouping===void 0||n.thousands===void 0?Su:i0(Eu.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",i=n.currency===void 0?"":n.currency[1]+"",r=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?Su:r0(Eu.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(h,d){h=Sa(h);var f=h.fill,g=h.align,_=h.sign,m=h.symbol,p=h.zero,b=h.width,S=h.comma,v=h.precision,L=h.trim,A=h.type;A==="n"?(S=!0,A="g"):Mu[A]||(v===void 0&&(v=12),L=!0,A="g"),(p||f==="0"&&g==="=")&&(p=!0,f="0",g="=");var R=(d&&d.prefix!==void 0?d.prefix:"")+(m==="$"?e:m==="#"&&/[boxX]/.test(A)?"0"+A.toLowerCase():""),U=(m==="$"?i:/[%p]/.test(A)?a:"")+(d&&d.suffix!==void 0?d.suffix:""),E=Mu[A],y=/[defgprs%]/.test(A);v=v===void 0?6:/[gprs]/.test(A)?Math.max(1,Math.min(21,v)):Math.max(0,Math.min(20,v));function C(F){var H=R,w=U,O,P,V;if(A==="c")w=E(F)+w,F="";else{F=+F;var k=F<0||1/F<0;if(F=isNaN(F)?c:E(Math.abs(F),v),L&&(F=a0(F)),k&&+F==0&&_!=="+"&&(k=!1),H=(k?_==="("?_:o:_==="-"||_==="("?"":_)+H,w=(A==="s"&&!isNaN(F)&&Ea!==void 0?bu[8+Ea/3]:"")+w+(k&&_==="("?")":""),y){for(O=-1,P=F.length;++O<P;)if(V=F.charCodeAt(O),48>V||V>57){w=(V===46?r+F.slice(O+1):F.slice(O))+w,F=F.slice(0,O);break}}}S&&!p&&(F=t(F,1/0));var Y=H.length+F.length+w.length,K=Y<b?new Array(b-Y+1).join(f):"";switch(S&&p&&(F=t(K+F,K.length?b-w.length:1/0),K=""),g){case"<":F=H+F+w+K;break;case"=":F=H+K+F+w;break;case"^":F=K.slice(0,Y=K.length>>1)+H+F+w+K.slice(Y);break;default:F=K+H+F+w;break}return s(F)}return C.toString=function(){return h+""},C}function u(h,d){var f=Math.max(-8,Math.min(8,Math.floor(nr(d)/3)))*3,g=Math.pow(10,-f),_=l((h=Sa(h),h.type="f",h),{suffix:bu[8+f/3]});return function(m){return _(g*m)}}return{format:l,formatPrefix:u}}var hs,Gd,Wd;l0({thousands:",",grouping:[3],currency:["$",""]});function l0(n){return hs=c0(n),Gd=hs.format,Wd=hs.formatPrefix,hs}function u0(n){return Math.max(0,-nr(Math.abs(n)))}function h0(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(nr(t)/3)))*3-nr(Math.abs(n)))}function d0(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,nr(t)-nr(n))+1}function gl(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}const wu=Symbol("implicit");function Xd(){var n=new Ql,t=[],e=[],i=wu;function r(s){let a=n.get(s);if(a===void 0){if(i!==wu)return i;n.set(s,a=t.push(s)-1)}return e[a%e.length]}return r.domain=function(s){if(!arguments.length)return t.slice();t=[],n=new Ql;for(const a of s)n.has(a)||n.set(a,t.push(a)-1);return r},r.range=function(s){return arguments.length?(e=Array.from(s),r):e.slice()},r.unknown=function(s){return arguments.length?(i=s,r):i},r.copy=function(){return Xd(t,e).unknown(i)},gl.apply(r,arguments),r}function uc(){var n=Xd().unknown(void 0),t=n.domain,e=n.range,i=0,r=1,s,a,o=!1,c=0,l=0,u=.5;delete n.unknown;function h(){var d=t().length,f=r<i,g=f?r:i,_=f?i:r;s=(_-g)/Math.max(1,d-c+l*2),o&&(s=Math.floor(s)),g+=(_-g-s*(d-c))*u,a=s*(1-c),o&&(g=Math.round(g),a=Math.round(a));var m=Sp(d).map(function(p){return g+s*p});return e(f?m.reverse():m)}return n.domain=function(d){return arguments.length?(t(d),h()):t()},n.range=function(d){return arguments.length?([i,r]=d,i=+i,r=+r,h()):[i,r]},n.rangeRound=function(d){return[i,r]=d,i=+i,r=+r,o=!0,h()},n.bandwidth=function(){return a},n.step=function(){return s},n.round=function(d){return arguments.length?(o=!!d,h()):o},n.padding=function(d){return arguments.length?(c=Math.min(1,l=+d),h()):c},n.paddingInner=function(d){return arguments.length?(c=Math.min(1,d),h()):c},n.paddingOuter=function(d){return arguments.length?(l=+d,h()):l},n.align=function(d){return arguments.length?(u=Math.max(0,Math.min(1,d)),h()):u},n.copy=function(){return uc(t(),[i,r]).round(o).paddingInner(c).paddingOuter(l).align(u)},gl.apply(h(),arguments)}function f0(n){return function(){return n}}function p0(n){return+n}var Tu=[0,1];function Gi(n){return n}function hc(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:f0(isNaN(t)?NaN:.5)}function m0(n,t){var e;return n>t&&(e=n,n=t,t=e),function(i){return Math.max(n,Math.min(t,i))}}function g0(n,t,e){var i=n[0],r=n[1],s=t[0],a=t[1];return r<i?(i=hc(r,i),s=e(a,s)):(i=hc(i,r),s=e(s,a)),function(o){return s(i(o))}}function _0(n,t,e){var i=Math.min(n.length,t.length)-1,r=new Array(i),s=new Array(i),a=-1;for(n[i]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<i;)r[a]=hc(n[a],n[a+1]),s[a]=e(t[a],t[a+1]);return function(o){var c=fp(n,o,1,i)-1;return s[c](r[c](o))}}function x0(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function v0(){var n=Tu,t=Tu,e=hl,i,r,s,a=Gi,o,c,l;function u(){var d=Math.min(n.length,t.length);return a!==Gi&&(a=m0(n[0],n[d-1])),o=d>2?_0:g0,c=l=null,h}function h(d){return d==null||isNaN(d=+d)?s:(c||(c=o(n.map(i),t,e)))(i(a(d)))}return h.invert=function(d){return a(r((l||(l=o(t,n.map(i),nn)))(d)))},h.domain=function(d){return arguments.length?(n=Array.from(d,p0),u()):n.slice()},h.range=function(d){return arguments.length?(t=Array.from(d),u()):t.slice()},h.rangeRound=function(d){return t=Array.from(d),e=Fg,u()},h.clamp=function(d){return arguments.length?(a=d?!0:Gi,u()):a!==Gi},h.interpolate=function(d){return arguments.length?(e=d,u()):e},h.unknown=function(d){return arguments.length?(s=d,h):s},function(d,f){return i=d,r=f,u()}}function y0(){return v0()(Gi,Gi)}function M0(n,t,e,i){var r=Mp(n,t,e),s;switch(i=Sa(i??",f"),i.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return i.precision==null&&!isNaN(s=h0(r,a))&&(i.precision=s),Wd(i,a)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(s=d0(r,Math.max(Math.abs(n),Math.abs(t))))&&(i.precision=s-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(s=u0(r))&&(i.precision=s-(i.type==="%")*2);break}}return Gd(i)}function S0(n){var t=n.domain;return n.ticks=function(e){var i=t();return yp(i[0],i[i.length-1],e??10)},n.tickFormat=function(e,i){var r=t();return M0(r[0],r[r.length-1],e??10,i)},n.nice=function(e){e==null&&(e=10);var i=t(),r=0,s=i.length-1,a=i[r],o=i[s],c,l,u=10;for(o<a&&(l=a,a=o,o=l,l=r,r=s,s=l);u-- >0;){if(l=Qo(a,o,e),l===c)return i[r]=a,i[s]=o,t(i);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return n},n}function dc(){var n=y0();return n.copy=function(){return x0(n,dc())},gl.apply(n,arguments),S0(n)}const ds=n=>()=>n;function E0(n,{sourceEvent:t,target:e,transform:i,dispatch:r}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:e,enumerable:!0,configurable:!0},transform:{value:i,enumerable:!0,configurable:!0},_:{value:r}})}function Dn(n,t,e){this.k=n,this.x=t,this.y=e}Dn.prototype={constructor:Dn,scale:function(n){return n===1?this:new Dn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new Dn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var _l=new Dn(1,0,0);Dn.prototype;function to(n){n.stopImmediatePropagation()}function pr(n){n.preventDefault(),n.stopImmediatePropagation()}function b0(n){return(!n.ctrlKey||n.type==="wheel")&&!n.button}function w0(){var n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]):[[0,0],[n.clientWidth,n.clientHeight]]}function Au(){return this.__zoom||_l}function T0(n){return-n.deltaY*(n.deltaMode===1?.05:n.deltaMode?1:.002)*(n.ctrlKey?10:1)}function A0(){return navigator.maxTouchPoints||"ontouchstart"in this}function R0(n,t,e){var i=n.invertX(t[0][0])-e[0][0],r=n.invertX(t[1][0])-e[1][0],s=n.invertY(t[0][1])-e[0][1],a=n.invertY(t[1][1])-e[1][1];return n.translate(r>i?(i+r)/2:Math.min(0,i)||Math.max(0,r),a>s?(s+a)/2:Math.min(0,s)||Math.max(0,a))}function C0(){var n=b0,t=w0,e=R0,i=T0,r=A0,s=[0,1/0],a=[[-1/0,-1/0],[1/0,1/0]],o=250,c=Wg,l=al("start","zoom","end"),u,h,d,f=500,g=150,_=0,m=10;function p(w){w.property("__zoom",Au).on("wheel.zoom",U,{passive:!1}).on("mousedown.zoom",E).on("dblclick.zoom",y).filter(r).on("touchstart.zoom",C).on("touchmove.zoom",F).on("touchend.zoom touchcancel.zoom",H).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}p.transform=function(w,O,P,V){var k=w.selection?w.selection():w;k.property("__zoom",Au),w!==k?L(w,O,P,V):k.interrupt().each(function(){A(this,arguments).event(V).start().zoom(null,typeof O=="function"?O.apply(this,arguments):O).end()})},p.scaleBy=function(w,O,P,V){p.scaleTo(w,function(){var k=this.__zoom.k,Y=typeof O=="function"?O.apply(this,arguments):O;return k*Y},P,V)},p.scaleTo=function(w,O,P,V){p.transform(w,function(){var k=t.apply(this,arguments),Y=this.__zoom,K=P==null?v(k):typeof P=="function"?P.apply(this,arguments):P,st=Y.invert(K),vt=typeof O=="function"?O.apply(this,arguments):O;return e(S(b(Y,vt),K,st),k,a)},P,V)},p.translateBy=function(w,O,P,V){p.transform(w,function(){return e(this.__zoom.translate(typeof O=="function"?O.apply(this,arguments):O,typeof P=="function"?P.apply(this,arguments):P),t.apply(this,arguments),a)},null,V)},p.translateTo=function(w,O,P,V,k){p.transform(w,function(){var Y=t.apply(this,arguments),K=this.__zoom,st=V==null?v(Y):typeof V=="function"?V.apply(this,arguments):V;return e(_l.translate(st[0],st[1]).scale(K.k).translate(typeof O=="function"?-O.apply(this,arguments):-O,typeof P=="function"?-P.apply(this,arguments):-P),Y,a)},V,k)};function b(w,O){return O=Math.max(s[0],Math.min(s[1],O)),O===w.k?w:new Dn(O,w.x,w.y)}function S(w,O,P){var V=O[0]-P[0]*w.k,k=O[1]-P[1]*w.k;return V===w.x&&k===w.y?w:new Dn(w.k,V,k)}function v(w){return[(+w[0][0]+ +w[1][0])/2,(+w[0][1]+ +w[1][1])/2]}function L(w,O,P,V){w.on("start.zoom",function(){A(this,arguments).event(V).start()}).on("interrupt.zoom end.zoom",function(){A(this,arguments).event(V).end()}).tween("zoom",function(){var k=this,Y=arguments,K=A(k,Y).event(V),st=t.apply(k,Y),vt=P==null?v(st):typeof P=="function"?P.apply(k,Y):P,Ht=Math.max(st[1][0]-st[0][0],st[1][1]-st[0][1]),q=k.__zoom,et=typeof O=="function"?O.apply(k,Y):O,dt=c(q.invert(vt).concat(Ht/q.k),et.invert(vt).concat(Ht/et.k));return function(rt){if(rt===1)rt=et;else{var mt=dt(rt),Vt=Ht/mt[2];rt=new Dn(Vt,vt[0]-mt[0]*Vt,vt[1]-mt[1]*Vt)}K.zoom(null,rt)}})}function A(w,O,P){return!P&&w.__zooming||new R(w,O)}function R(w,O){this.that=w,this.args=O,this.active=0,this.sourceEvent=null,this.extent=t.apply(w,O),this.taps=0}R.prototype={event:function(w){return w&&(this.sourceEvent=w),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(w,O){return this.mouse&&w!=="mouse"&&(this.mouse[1]=O.invert(this.mouse[0])),this.touch0&&w!=="touch"&&(this.touch0[1]=O.invert(this.touch0[0])),this.touch1&&w!=="touch"&&(this.touch1[1]=O.invert(this.touch1[0])),this.that.__zoom=O,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(w){var O=hn(this.that).datum();l.call(w,this.that,new E0(w,{sourceEvent:this.sourceEvent,target:p,transform:this.that.__zoom,dispatch:l}),O)}};function U(w,...O){if(!n.apply(this,arguments))return;var P=A(this,O).event(w),V=this.__zoom,k=Math.max(s[0],Math.min(s[1],V.k*Math.pow(2,i.apply(this,arguments)))),Y=ni(w);if(P.wheel)(P.mouse[0][0]!==Y[0]||P.mouse[0][1]!==Y[1])&&(P.mouse[1]=V.invert(P.mouse[0]=Y)),clearTimeout(P.wheel);else{if(V.k===k)return;P.mouse=[Y,V.invert(Y)],sa(this),P.start()}pr(w),P.wheel=setTimeout(K,g),P.zoom("mouse",e(S(b(V,k),P.mouse[0],P.mouse[1]),P.extent,a));function K(){P.wheel=null,P.end()}}function E(w,...O){if(d||!n.apply(this,arguments))return;var P=w.currentTarget,V=A(this,O,!0).event(w),k=hn(w.view).on("mousemove.zoom",vt,!0).on("mouseup.zoom",Ht,!0),Y=ni(w,P),K=w.clientX,st=w.clientY;dg(w.view),to(w),V.mouse=[Y,this.__zoom.invert(Y)],sa(this),V.start();function vt(q){if(pr(q),!V.moved){var et=q.clientX-K,dt=q.clientY-st;V.moved=et*et+dt*dt>_}V.event(q).zoom("mouse",e(S(V.that.__zoom,V.mouse[0]=ni(q,P),V.mouse[1]),V.extent,a))}function Ht(q){k.on("mousemove.zoom mouseup.zoom",null),fg(q.view,V.moved),pr(q),V.event(q).end()}}function y(w,...O){if(n.apply(this,arguments)){var P=this.__zoom,V=ni(w.changedTouches?w.changedTouches[0]:w,this),k=P.invert(V),Y=P.k*(w.shiftKey?.5:2),K=e(S(b(P,Y),V,k),t.apply(this,O),a);pr(w),o>0?hn(this).transition().duration(o).call(L,K,V,w):hn(this).call(p.transform,K,V,w)}}function C(w,...O){if(n.apply(this,arguments)){var P=w.touches,V=P.length,k=A(this,O,w.changedTouches.length===V).event(w),Y,K,st,vt;for(to(w),K=0;K<V;++K)st=P[K],vt=ni(st,this),vt=[vt,this.__zoom.invert(vt),st.identifier],k.touch0?!k.touch1&&k.touch0[2]!==vt[2]&&(k.touch1=vt,k.taps=0):(k.touch0=vt,Y=!0,k.taps=1+!!u);u&&(u=clearTimeout(u)),Y&&(k.taps<2&&(h=vt[0],u=setTimeout(function(){u=null},f)),sa(this),k.start())}}function F(w,...O){if(this.__zooming){var P=A(this,O).event(w),V=w.changedTouches,k=V.length,Y,K,st,vt;for(pr(w),Y=0;Y<k;++Y)K=V[Y],st=ni(K,this),P.touch0&&P.touch0[2]===K.identifier?P.touch0[0]=st:P.touch1&&P.touch1[2]===K.identifier&&(P.touch1[0]=st);if(K=P.that.__zoom,P.touch1){var Ht=P.touch0[0],q=P.touch0[1],et=P.touch1[0],dt=P.touch1[1],rt=(rt=et[0]-Ht[0])*rt+(rt=et[1]-Ht[1])*rt,mt=(mt=dt[0]-q[0])*mt+(mt=dt[1]-q[1])*mt;K=b(K,Math.sqrt(rt/mt)),st=[(Ht[0]+et[0])/2,(Ht[1]+et[1])/2],vt=[(q[0]+dt[0])/2,(q[1]+dt[1])/2]}else if(P.touch0)st=P.touch0[0],vt=P.touch0[1];else return;P.zoom("touch",e(S(K,st,vt),P.extent,a))}}function H(w,...O){if(this.__zooming){var P=A(this,O).event(w),V=w.changedTouches,k=V.length,Y,K;for(to(w),d&&clearTimeout(d),d=setTimeout(function(){d=null},f),Y=0;Y<k;++Y)K=V[Y],P.touch0&&P.touch0[2]===K.identifier?delete P.touch0:P.touch1&&P.touch1[2]===K.identifier&&delete P.touch1;if(P.touch1&&!P.touch0&&(P.touch0=P.touch1,delete P.touch1),P.touch0)P.touch0[1]=this.__zoom.invert(P.touch0[0]);else if(P.end(),P.taps===2&&(K=ni(K,this),Math.hypot(h[0]-K[0],h[1]-K[1])<m)){var st=hn(this).on("dblclick.zoom");st&&st.apply(this,arguments)}}}return p.wheelDelta=function(w){return arguments.length?(i=typeof w=="function"?w:ds(+w),p):i},p.filter=function(w){return arguments.length?(n=typeof w=="function"?w:ds(!!w),p):n},p.touchable=function(w){return arguments.length?(r=typeof w=="function"?w:ds(!!w),p):r},p.extent=function(w){return arguments.length?(t=typeof w=="function"?w:ds([[+w[0][0],+w[0][1]],[+w[1][0],+w[1][1]]]),p):t},p.scaleExtent=function(w){return arguments.length?(s[0]=+w[0],s[1]=+w[1],p):[s[0],s[1]]},p.translateExtent=function(w){return arguments.length?(a[0][0]=+w[0][0],a[1][0]=+w[1][0],a[0][1]=+w[0][1],a[1][1]=+w[1][1],p):[[a[0][0],a[0][1]],[a[1][0],a[1][1]]]},p.constrain=function(w){return arguments.length?(e=w,p):e},p.duration=function(w){return arguments.length?(o=+w,p):o},p.interpolate=function(w){return arguments.length?(c=w,p):c},p.on=function(){var w=l.on.apply(l,arguments);return w===l?p:w},p.clickDistance=function(w){return arguments.length?(_=(w=+w)*w,p):Math.sqrt(_)},p.tapDistance=function(w){return arguments.length?(m=+w,p):m},p}const Ru=22;class P0{constructor(t){this.svg=hn(t),this.svgEl=t,this.hexes=[],this.tubes=new Map,this.layout=null,this.selectedKey=null,this._onSelectCallbacks=[],this._onAddTubeCallbacks=[],this.g=this.svg.append("g").attr("class","hex-root"),this._initZoom()}_initZoom(){const t=C0().scaleExtent([.3,4]).on("zoom",e=>this.g.attr("transform",e.transform));this.svg.call(t),this._zoom=t}build(t=5,e="pointy"){const i=e==="flat"?fd:dd,r=this.svgEl.parentElement,s=(r==null?void 0:r.clientWidth)||this.svgEl.clientWidth||260,a=(r==null?void 0:r.clientHeight)||this.svgEl.clientHeight||300;this.svg.attr("width",s).attr("height",a),this.layout=new pd(i,new In(Ru,Ru),new In(s/2,a/2)),this.hexes=md(new fe(0,0,0),t),this._render(),this.centerView()}_render(){this.g.selectAll(".hex-cell").remove();const t=this.g.selectAll(".hex-cell").data(this.hexes,e=>e.key()).join("g").attr("class",e=>{const i=this.tubes.has(e.key()),r=e.key()===this.selectedKey;return`hex-cell ${i?"has-tube":""} ${r?"selected":""}`}).attr("data-key",e=>e.key()).on("click",(e,i)=>{e.stopPropagation(),this._selectHex(i.key())}).on("dblclick",(e,i)=>{e.stopPropagation(),this._onAddTubeCallbacks.forEach(r=>r(i.key()))});t.append("path").attr("class","hex-bg").attr("d",e=>this.layout.polygonPath(e)).attr("fill",e=>{var r,s;const i=this.tubes.get(e.key());return i?((s=(r=Kn(i.color))==null?void 0:r.copy({opacity:.18}))==null?void 0:s.formatRgb())||"rgba(34,211,238,0.12)":"rgba(14,20,30,0.6)"}).attr("stroke",e=>e.key()===this.selectedKey?"#22d3ee":"#2d3a4f").attr("stroke-width",e=>e.key()===this.selectedKey?2:.8),t.append("text").attr("class","hex-label").attr("x",e=>this.layout.hexToPixel(e).x).attr("y",e=>this.layout.hexToPixel(e).y).text(e=>{const i=this.tubes.get(e.key());return i?`(${i.m},${i.n})`:`${e.q},${e.r}`})}_selectHex(t){this.selectedKey=t,this._render(),this._onSelectCallbacks.forEach(e=>e(t))}selectHex(t){this._selectHex(t)}setTube(t,e){this.tubes.set(t,e),this._render()}removeTube(t){this.tubes.delete(t),this._render()}clear(){this.tubes.clear(),this._render()}onSelect(t){this._onSelectCallbacks.push(t)}onAddTube(t){this._onAddTubeCallbacks.push(t)}centerView(){const t=this.svgEl.clientWidth||260,e=this.svgEl.clientHeight||300;this.svg.call(this._zoom.transform,_l.translate(t/2,e/2).scale(1).translate(-t/2,-e/2))}hexFromKey(t){return this.hexes.find(e=>e.key()===t)}getStats(){const t={armchair:0,zigzag:0,chiral:0};return this.tubes.forEach(e=>t[e.type]++),{total:this.tubes.size,byType:t,hexCount:this.hexes.length}}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xl="177",Yi={ROTATE:0,DOLLY:1,PAN:2},Wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},I0=0,Cu=1,D0=2,qd=1,$d=2,Pn=3,Zn=0,De=1,Ke=2,Yn=0,ji=1,Pu=2,Iu=3,Du=4,L0=5,hi=100,N0=101,U0=102,F0=103,O0=104,B0=200,k0=201,z0=202,H0=203,fc=204,pc=205,V0=206,G0=207,W0=208,X0=209,q0=210,$0=211,Y0=212,j0=213,K0=214,mc=0,gc=1,_c=2,ir=3,xc=4,vc=5,yc=6,Mc=7,Yd=0,Z0=1,J0=2,jn=0,Q0=1,tx=2,ex=3,jd=4,nx=5,ix=6,rx=7,Kd=300,rr=301,sr=302,Sc=303,Ec=304,Fa=306,bc=1e3,pi=1001,wc=1002,cn=1003,sx=1004,fs=1005,fn=1006,eo=1007,mi=1008,_n=1009,Zd=1010,Jd=1011,Wr=1012,vl=1013,xi=1014,Ln=1015,Qr=1016,yl=1017,Ml=1018,Xr=1020,Qd=35902,tf=1021,ef=1022,an=1023,qr=1026,$r=1027,nf=1028,Sl=1029,rf=1030,El=1031,bl=1033,aa=33776,oa=33777,ca=33778,la=33779,Tc=35840,Ac=35841,Rc=35842,Cc=35843,Pc=36196,Ic=37492,Dc=37496,Lc=37808,Nc=37809,Uc=37810,Fc=37811,Oc=37812,Bc=37813,kc=37814,zc=37815,Hc=37816,Vc=37817,Gc=37818,Wc=37819,Xc=37820,qc=37821,ua=36492,$c=36494,Yc=36495,sf=36283,jc=36284,Kc=36285,Zc=36286,ax=3200,ox=3201,af=0,cx=1,qn="",je="srgb",ar="srgb-linear",ba="linear",Qt="srgb",bi=7680,Lu=519,lx=512,ux=513,hx=514,of=515,dx=516,fx=517,px=518,mx=519,Nu=35044,Uu="300 es",Nn=2e3,wa=2001;class Si{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ha=Math.PI/180,Jc=180/Math.PI;function lr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[i&255]+Se[i>>8&255]+Se[i>>16&255]+Se[i>>24&255]).toLowerCase()}function Ot(n,t,e){return Math.max(t,Math.min(e,n))}function gx(n,t){return(n%t+t)%t}function no(n,t,e){return(1-e)*n+e*t}function mr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ne(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const _x={DEG2RAD:ha};class ht{constructor(t=0,e=0){ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ot(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ot(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vi{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3];const d=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==d||l!==f||u!==g){let m=1-o;const p=c*d+l*f+u*g+h*_,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const L=Math.sqrt(S),A=Math.atan2(L,p*b);m=Math.sin(m*A)/L,o=Math.sin(o*A)/L}const v=o*b;if(c=c*m+d*v,l=l*m+f*v,u=u*m+g*v,h=h*m+_*v,m===1-o){const L=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=L,l*=L,u*=L,h*=L}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return t[e]=o*g+u*h+c*f-l*d,t[e+1]=c*g+u*d+l*h-o*f,t[e+2]=l*g+u*f+o*d-c*h,t[e+3]=u*g-o*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),h=o(s/2),d=c(i/2),f=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ot(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=a*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,i=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*i),u=2*(o*e-s*r),h=2*(s*i-a*e);return this.x=e+c*l+a*h-o*u,this.y=i+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this.z=Ot(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this.z=Ot(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ot(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return io.copy(this).projectOnVector(t),this.sub(io)}reflect(t){return this.sub(io.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ot(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const io=new I,Fu=new vi;class Nt{constructor(t,e,i,r,s,a,o,c,l){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,c,l)}set(t,e,i,r,s,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],h=i[7],d=i[2],f=i[5],g=i[8],_=r[0],m=r[3],p=r[6],b=r[1],S=r[4],v=r[7],L=r[2],A=r[5],R=r[8];return s[0]=a*_+o*b+c*L,s[3]=a*m+o*S+c*A,s[6]=a*p+o*v+c*R,s[1]=l*_+u*b+h*L,s[4]=l*m+u*S+h*A,s[7]=l*p+u*v+h*R,s[2]=d*_+f*b+g*L,s[5]=d*m+f*S+g*A,s[8]=d*p+f*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*s,f=l*s-a*c,g=e*h+i*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*l-u*i)*_,t[2]=(o*i-r*a)*_,t[3]=d*_,t[4]=(u*e-r*c)*_,t[5]=(r*s-o*e)*_,t[6]=f*_,t[7]=(i*c-l*e)*_,t[8]=(a*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ro.makeScale(t,e)),this}rotate(t){return this.premultiply(ro.makeRotation(-t)),this}translate(t,e){return this.premultiply(ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ro=new Nt;function cf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ta(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function xx(){const n=Ta("canvas");return n.style.display="block",n}const Ou={};function Ki(n){n in Ou||(Ou[n]=!0,console.warn(n))}function vx(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function yx(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Mx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Bu=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ku=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sx(){const n={enabled:!0,workingColorSpace:ar,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Qt&&(r.r=Un(r.r),r.g=Un(r.g),r.b=Un(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(r.r=Zi(r.r),r.g=Zi(r.g),r.b=Zi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===qn?ba:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ki("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ki("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ar]:{primaries:t,whitePoint:i,transfer:ba,toXYZ:Bu,fromXYZ:ku,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:t,whitePoint:i,transfer:Qt,toXYZ:Bu,fromXYZ:ku,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:je}}}),n}const $t=Sx();function Un(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let wi;class Ex{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{wi===void 0&&(wi=Ta("canvas")),wi.width=t.width,wi.height=t.height;const r=wi.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=wi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ta("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Un(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Un(e[i]/255)*255):e[i]=Un(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let bx=0;class wl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=lr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(so(r[a].image)):s.push(so(r[a]))}else s=so(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function so(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ex.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wx=0;const ao=new I;class Oe extends Si{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,i=pi,r=pi,s=fn,a=mi,o=an,c=_n,l=Oe.DEFAULT_ANISOTROPY,u=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=lr(),this.name="",this.source=new wl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ao).x}get height(){return this.source.getSize(ao).y}get depth(){return this.source.getSize(ao).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bc:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case wc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bc:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case wc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=Kd;Oe.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,i=0,r=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(f+1)/2,L=(p+1)/2,A=(u+d)/4,R=(h+_)/4,U=(g+m)/4;return S>v&&S>L?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=A/i,s=R/i):v>L?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=A/r,s=U/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=R/s,r=U/s),this.set(i,r,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-_)/b,this.z=(d-u)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this.z=Ot(this.z,t.z,e.z),this.w=Ot(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this.z=Ot(this.z,t,e),this.w=Ot(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ot(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tx extends Si{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new Oe(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new wl(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends Tx{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class lf extends Oe{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=cn,this.minFilter=cn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ax extends Oe{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=cn,this.minFilter=cn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ts{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Qe):Qe.fromBufferAttribute(s,a),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ps.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ps.copy(i.boundingBox)),ps.applyMatrix4(t.matrixWorld),this.union(ps)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gr),ms.subVectors(this.max,gr),Ti.subVectors(t.a,gr),Ai.subVectors(t.b,gr),Ri.subVectors(t.c,gr),On.subVectors(Ai,Ti),Bn.subVectors(Ri,Ai),ii.subVectors(Ti,Ri);let e=[0,-On.z,On.y,0,-Bn.z,Bn.y,0,-ii.z,ii.y,On.z,0,-On.x,Bn.z,0,-Bn.x,ii.z,0,-ii.x,-On.y,On.x,0,-Bn.y,Bn.x,0,-ii.y,ii.x,0];return!oo(e,Ti,Ai,Ri,ms)||(e=[1,0,0,0,1,0,0,0,1],!oo(e,Ti,Ai,Ri,ms))?!1:(gs.crossVectors(On,Bn),e=[gs.x,gs.y,gs.z],oo(e,Ti,Ai,Ri,ms))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const En=[new I,new I,new I,new I,new I,new I,new I,new I],Qe=new I,ps=new ts,Ti=new I,Ai=new I,Ri=new I,On=new I,Bn=new I,ii=new I,gr=new I,ms=new I,gs=new I,ri=new I;function oo(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ri.fromArray(n,s);const o=r.x*Math.abs(ri.x)+r.y*Math.abs(ri.y)+r.z*Math.abs(ri.z),c=t.dot(ri),l=e.dot(ri),u=i.dot(ri);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Rx=new ts,_r=new I,co=new I;class Oa{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Rx.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_r.subVectors(t,this.center);const e=_r.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(_r,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(co.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_r.copy(t.center).add(co)),this.expandByPoint(_r.copy(t.center).sub(co))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const bn=new I,lo=new I,_s=new I,kn=new I,uo=new I,xs=new I,ho=new I;class Ba{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bn.copy(this.origin).addScaledVector(this.direction,e),bn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){lo.copy(t).add(e).multiplyScalar(.5),_s.copy(e).sub(t).normalize(),kn.copy(this.origin).sub(lo);const s=t.distanceTo(e)*.5,a=-this.direction.dot(_s),o=kn.dot(this.direction),c=-kn.dot(_s),l=kn.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=s*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+d*(d+2*c)+l);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(lo).addScaledVector(_s,d),f}intersectSphere(t,e){bn.subVectors(t.center,this.origin);const i=bn.dot(this.direction),r=bn.dot(bn)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),u>=0?(s=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,bn)!==null}intersectTriangle(t,e,i,r,s){uo.subVectors(e,t),xs.subVectors(i,t),ho.crossVectors(uo,xs);let a=this.direction.dot(ho),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kn.subVectors(this.origin,t);const c=o*this.direction.dot(xs.crossVectors(kn,xs));if(c<0)return null;const l=o*this.direction.dot(uo.cross(kn));if(l<0||c+l>a)return null;const u=-o*kn.dot(ho);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,i,r,s,a,o,c,l,u,h,d,f,g,_,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,c,l,u,h,d,f,g,_,m)}set(t,e,i,r,s,a,o,c,l,u,h,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Ci.setFromMatrixColumn(t,0).length(),s=1/Ci.setFromMatrixColumn(t,1).length(),a=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const d=a*u,f=a*h,g=o*u,_=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,g=l*u,_=l*h;e[0]=d+_*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,g=l*u,_=l*h;e[0]=d-_*o,e[4]=-a*h,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,f=a*h,g=o*u,_=o*h;e[0]=c*u,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*h,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=_-d*h,e[8]=g*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*h+g,e[10]=d-_*h}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+_,e[5]=a*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=o*u,e[10]=_*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cx,t,Px)}lookAt(t,e,i){const r=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),zn.crossVectors(i,ke),zn.lengthSq()===0&&(Math.abs(i.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),zn.crossVectors(i,ke)),zn.normalize(),vs.crossVectors(ke,zn),r[0]=zn.x,r[4]=vs.x,r[8]=ke.x,r[1]=zn.y,r[5]=vs.y,r[9]=ke.y,r[2]=zn.z,r[6]=vs.z,r[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],h=i[5],d=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],b=i[3],S=i[7],v=i[11],L=i[15],A=r[0],R=r[4],U=r[8],E=r[12],y=r[1],C=r[5],F=r[9],H=r[13],w=r[2],O=r[6],P=r[10],V=r[14],k=r[3],Y=r[7],K=r[11],st=r[15];return s[0]=a*A+o*y+c*w+l*k,s[4]=a*R+o*C+c*O+l*Y,s[8]=a*U+o*F+c*P+l*K,s[12]=a*E+o*H+c*V+l*st,s[1]=u*A+h*y+d*w+f*k,s[5]=u*R+h*C+d*O+f*Y,s[9]=u*U+h*F+d*P+f*K,s[13]=u*E+h*H+d*V+f*st,s[2]=g*A+_*y+m*w+p*k,s[6]=g*R+_*C+m*O+p*Y,s[10]=g*U+_*F+m*P+p*K,s[14]=g*E+_*H+m*V+p*st,s[3]=b*A+S*y+v*w+L*k,s[7]=b*R+S*C+v*O+L*Y,s[11]=b*U+S*F+v*P+L*K,s[15]=b*E+S*H+v*V+L*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*c*h-r*l*h-s*o*d+i*l*d+r*o*f-i*c*f)+_*(+e*c*f-e*l*d+s*a*d-r*a*f+r*l*u-s*c*u)+m*(+e*l*h-e*o*f-s*a*h+i*a*f+s*o*u-i*l*u)+p*(-r*o*u-e*c*h+e*o*d+r*a*h-i*a*d+i*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=h*m*l-_*d*l+_*c*f-o*m*f-h*c*p+o*d*p,S=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,v=u*_*l-g*h*l+g*o*f-a*_*f-u*o*p+a*h*p,L=g*h*c-u*_*c-g*o*d+a*_*d+u*o*m-a*h*m,A=e*b+i*S+r*v+s*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=b*R,t[1]=(_*d*s-h*m*s-_*r*f+i*m*f+h*r*p-i*d*p)*R,t[2]=(o*m*s-_*c*s+_*r*l-i*m*l-o*r*p+i*c*p)*R,t[3]=(h*c*s-o*d*s-h*r*l+i*d*l+o*r*f-i*c*f)*R,t[4]=S*R,t[5]=(u*m*s-g*d*s+g*r*f-e*m*f-u*r*p+e*d*p)*R,t[6]=(g*c*s-a*m*s-g*r*l+e*m*l+a*r*p-e*c*p)*R,t[7]=(a*d*s-u*c*s+u*r*l-e*d*l-a*r*f+e*c*f)*R,t[8]=v*R,t[9]=(g*h*s-u*_*s-g*i*f+e*_*f+u*i*p-e*h*p)*R,t[10]=(a*_*s-g*o*s+g*i*l-e*_*l-a*i*p+e*o*p)*R,t[11]=(u*o*s-a*h*s-u*i*l+e*h*l+a*i*f-e*o*f)*R,t[12]=L*R,t[13]=(u*_*r-g*h*r+g*i*d-e*_*d-u*i*m+e*h*m)*R,t[14]=(g*o*r-a*_*r-g*i*c+e*_*c+a*i*m-e*o*m)*R,t[15]=(a*h*r-u*o*r+u*i*c-e*h*c-a*i*d+e*o*d)*R,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,c=t.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,u=a+a,h=o+o,d=s*l,f=s*u,g=s*h,_=a*u,m=a*h,p=o*h,b=c*l,S=c*u,v=c*h,L=i.x,A=i.y,R=i.z;return r[0]=(1-(_+p))*L,r[1]=(f+v)*L,r[2]=(g-S)*L,r[3]=0,r[4]=(f-v)*A,r[5]=(1-(d+p))*A,r[6]=(m+b)*A,r[7]=0,r[8]=(g+S)*R,r[9]=(m-b)*R,r[10]=(1-(d+_))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=Ci.set(r[0],r[1],r[2]).length();const a=Ci.set(r[4],r[5],r[6]).length(),o=Ci.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],tn.copy(this);const l=1/s,u=1/a,h=1/o;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=h,tn.elements[9]*=h,tn.elements[10]*=h,e.setFromRotationMatrix(tn),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=Nn){const c=this.elements,l=2*s/(e-t),u=2*s/(i-r),h=(e+t)/(e-t),d=(i+r)/(i-r);let f,g;if(o===Nn)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===wa)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=Nn){const c=this.elements,l=1/(e-t),u=1/(i-r),h=1/(a-s),d=(e+t)*l,f=(i+r)*u;let g,_;if(o===Nn)g=(a+s)*h,_=-2*h;else if(o===wa)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ci=new I,tn=new re,Cx=new I(0,0,0),Px=new I(1,1,1),zn=new I,vs=new I,ke=new I,zu=new re,Hu=new vi;class xn{constructor(t=0,e=0,i=0,r=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(Ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ot(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return zu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ix=0;const Vu=new I,Pi=new vi,wn=new re,ys=new I,xr=new I,Dx=new I,Lx=new vi,Gu=new I(1,0,0),Wu=new I(0,1,0),Xu=new I(0,0,1),qu={type:"added"},Nx={type:"removed"},Ii={type:"childadded",child:null},fo={type:"childremoved",child:null};class Me extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Me.DEFAULT_UP.clone();const t=new I,e=new xn,i=new vi,r=new I(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new re},normalMatrix:{value:new Nt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=Me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(Gu,t)}rotateY(t){return this.rotateOnAxis(Wu,t)}rotateZ(t){return this.rotateOnAxis(Xu,t)}translateOnAxis(t,e){return Vu.copy(t).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gu,t)}translateY(t){return this.translateOnAxis(Wu,t)}translateZ(t){return this.translateOnAxis(Xu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ys.copy(t):ys.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(xr,ys,this.up):wn.lookAt(ys,xr,this.up),this.quaternion.setFromRotationMatrix(wn),r&&(wn.extractRotation(r.matrixWorld),Pi.setFromRotationMatrix(wn),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qu),Ii.child=t,this.dispatchEvent(Ii),Ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nx),fo.child=t,this.dispatchEvent(fo),fo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qu),Ii.child=t,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,t,Dx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,Lx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Me.DEFAULT_UP=new I(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new I,Tn=new I,po=new I,An=new I,Di=new I,Li=new I,$u=new I,mo=new I,go=new I,_o=new I,xo=new ee,vo=new ee,yo=new ee;class sn{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),en.subVectors(t,e),r.cross(en);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){en.subVectors(r,e),Tn.subVectors(i,e),po.subVectors(t,e);const a=en.dot(en),o=en.dot(Tn),c=en.dot(po),l=Tn.dot(Tn),u=Tn.dot(po),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return s.set(1-f-g,g,f)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,i,r,s,a,o,c){return this.getBarycoord(t,e,i,r,An)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,An.x),c.addScaledVector(a,An.y),c.addScaledVector(o,An.z),c)}static getInterpolatedAttribute(t,e,i,r,s,a){return xo.setScalar(0),vo.setScalar(0),yo.setScalar(0),xo.fromBufferAttribute(t,e),vo.fromBufferAttribute(t,i),yo.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(xo,s.x),a.addScaledVector(vo,s.y),a.addScaledVector(yo,s.z),a}static isFrontFacing(t,e,i,r){return en.subVectors(i,e),Tn.subVectors(t,e),en.cross(Tn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),en.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return sn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;Di.subVectors(r,i),Li.subVectors(s,i),mo.subVectors(t,i);const c=Di.dot(mo),l=Li.dot(mo);if(c<=0&&l<=0)return e.copy(i);go.subVectors(t,r);const u=Di.dot(go),h=Li.dot(go);if(u>=0&&h<=u)return e.copy(r);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(i).addScaledVector(Di,a);_o.subVectors(t,s);const f=Di.dot(_o),g=Li.dot(_o);if(g>=0&&f<=g)return e.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(i).addScaledVector(Li,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return $u.subVectors(s,r),o=(h-u)/(h-u+(f-g)),e.copy(r).addScaledVector($u,o);const p=1/(m+_+d);return a=_*p,o=d*p,e.copy(i).addScaledVector(Di,a).addScaledVector(Li,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Mo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=$t.workingColorSpace){if(t=gx(t,1),e=Ot(e,0,1),i=Ot(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=Mo(a,s,t+1/3),this.g=Mo(a,s,t),this.b=Mo(a,s,t-1/3)}return $t.colorSpaceToWorking(this,r),this}setStyle(t,e=je){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const i=uf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return $t.workingToColorSpace(Ee.copy(this),t),Math.round(Ot(Ee.r*255,0,255))*65536+Math.round(Ot(Ee.g*255,0,255))*256+Math.round(Ot(Ee.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ee.copy(this),e);const i=Ee.r,r=Ee.g,s=Ee.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ee.copy(this),e),t.r=Ee.r,t.g=Ee.g,t.b=Ee.b,t}getStyle(t=je){$t.workingToColorSpace(Ee.copy(this),t);const e=Ee.r,i=Ee.g,r=Ee.b;return t!==je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(Ms);const i=no(Hn.h,Ms.h,e),r=no(Hn.s,Ms.s,e),s=no(Hn.l,Ms.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ee=new zt;zt.NAMES=uf;let Ux=0;class ur extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ux++}),this.uuid=lr(),this.name="",this.type="Material",this.blending=ji,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fc,this.blendDst=pc,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(i.blending=this.blending),this.side!==Zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==fc&&(i.blendSrc=this.blendSrc),this.blendDst!==pc&&(i.blendDst=this.blendDst),this.blendEquation!==hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class es extends ur{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Yd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new I,Ss=new ht;let Fx=0;class gn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Nu,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ss.fromBufferAttribute(this,e),Ss.applyMatrix3(t),this.setXY(e,Ss.x,Ss.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=mr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),r=Ne(r,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Nu&&(t.usage=this.usage),t}}class hf extends gn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class df extends gn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class de extends gn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Ox=0;const qe=new re,So=new Me,Ni=new I,ze=new ts,vr=new ts,ve=new I;class Te extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(cf(t)?df:hf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Nt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,i){return qe.makeTranslation(t,e,i),this.applyMatrix4(qe),this}scale(t,e,i){return qe.makeScale(t,e,i),this.applyMatrix4(qe),this}lookAt(t){return So.lookAt(t),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new de(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];ze.setFromBufferAttribute(s),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];vr.setFromBufferAttribute(o),this.morphTargetsRelative?(ve.addVectors(ze.min,vr.min),ze.expandByPoint(ve),ve.addVectors(ze.max,vr.max),ze.expandByPoint(ve)):(ze.expandByPoint(vr.min),ze.expandByPoint(vr.max))}ze.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)ve.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(ve));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)ve.fromBufferAttribute(o,l),c&&(Ni.fromBufferAttribute(t,l),ve.add(Ni)),r=Math.max(r,i.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<i.count;U++)o[U]=new I,c[U]=new I;const l=new I,u=new I,h=new I,d=new ht,f=new ht,g=new ht,_=new I,m=new I;function p(U,E,y){l.fromBufferAttribute(i,U),u.fromBufferAttribute(i,E),h.fromBufferAttribute(i,y),d.fromBufferAttribute(s,U),f.fromBufferAttribute(s,E),g.fromBufferAttribute(s,y),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(C),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[U].add(_),o[E].add(_),o[y].add(_),c[U].add(m),c[E].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let U=0,E=b.length;U<E;++U){const y=b[U],C=y.start,F=y.count;for(let H=C,w=C+F;H<w;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const S=new I,v=new I,L=new I,A=new I;function R(U){L.fromBufferAttribute(r,U),A.copy(L);const E=o[U];S.copy(E),S.sub(L.multiplyScalar(L.dot(E))).normalize(),v.crossVectors(A,E);const C=v.dot(c[U])<0?-1:1;a.setXYZW(U,S.x,S.y,S.z,C)}for(let U=0,E=b.length;U<E;++U){const y=b[U],C=y.start,F=y.count;for(let H=C,w=C+F;H<w;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new gn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const r=new I,s=new I,a=new I,o=new I,c=new I,l=new I,u=new I,h=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new gn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,i);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,i);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yu=new re,si=new Ba,Es=new Oa,ju=new I,bs=new I,ws=new I,Ts=new I,Eo=new I,As=new I,Ku=new I,Rs=new I;class Ie extends Me{constructor(t=new Te,e=new es){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){As.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],h=s[c];u!==0&&(Eo.fromBufferAttribute(h,t),a?As.addScaledVector(Eo,u):As.addScaledVector(Eo.sub(e),u))}e.add(As)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Es.copy(i.boundingSphere),Es.applyMatrix4(s),si.copy(t.ray).recast(t.near),!(Es.containsPoint(si.origin)===!1&&(si.intersectSphere(Es,ju)===null||si.origin.distanceToSquared(ju)>(t.far-t.near)**2))&&(Yu.copy(s).invert(),si.copy(t.ray).applyMatrix4(Yu),!(i.boundingBox!==null&&si.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,si)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,L=S;v<L;v+=3){const A=o.getX(v),R=o.getX(v+1),U=o.getX(v+2);r=Cs(this,p,t,i,l,u,h,A,R,U),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);r=Cs(this,a,t,i,l,u,h,b,S,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,L=S;v<L;v+=3){const A=v,R=v+1,U=v+2;r=Cs(this,p,t,i,l,u,h,A,R,U),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=m,S=m+1,v=m+2;r=Cs(this,a,t,i,l,u,h,b,S,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Bx(n,t,e,i,r,s,a,o){let c;if(t.side===De?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,t.side===Zn,o),c===null)return null;Rs.copy(o),Rs.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Rs);return l<e.near||l>e.far?null:{distance:l,point:Rs.clone(),object:n}}function Cs(n,t,e,i,r,s,a,o,c,l){n.getVertexPosition(o,bs),n.getVertexPosition(c,ws),n.getVertexPosition(l,Ts);const u=Bx(n,t,e,i,bs,ws,Ts,Ku);if(u){const h=new I;sn.getBarycoord(Ku,bs,ws,Ts,h),r&&(u.uv=sn.getInterpolatedAttribute(r,o,c,l,h,new ht)),s&&(u.uv1=sn.getInterpolatedAttribute(s,o,c,l,h,new ht)),a&&(u.normal=sn.getInterpolatedAttribute(a,o,c,l,h,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new I,materialIndex:0};sn.getNormal(bs,ws,Ts,d.normal),u.face=d,u.barycoord=h}return u}class ns extends Te{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,r,a,2),g("x","z","y",1,-1,t,i,-e,r,a,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(h,2));function g(_,m,p,b,S,v,L,A,R,U,E){const y=v/R,C=L/U,F=v/2,H=L/2,w=A/2,O=R+1,P=U+1;let V=0,k=0;const Y=new I;for(let K=0;K<P;K++){const st=K*C-H;for(let vt=0;vt<O;vt++){const Ht=vt*y-F;Y[_]=Ht*b,Y[m]=st*S,Y[p]=w,l.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[p]=A>0?1:-1,u.push(Y.x,Y.y,Y.z),h.push(vt/R),h.push(1-K/U),V+=1}}for(let K=0;K<U;K++)for(let st=0;st<R;st++){const vt=d+st+O*K,Ht=d+st+O*(K+1),q=d+(st+1)+O*(K+1),et=d+(st+1)+O*K;c.push(vt,Ht,et),c.push(Ht,q,et),k+=6}o.addGroup(f,k,E),f+=k,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ns(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function or(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Pe(n){const t={};for(let e=0;e<n.length;e++){const i=or(n[e]);for(const r in i)t[r]=i[r]}return t}function kx(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function ff(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const zx={clone:or,merge:Pe};var Hx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends ur{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hx,this.fragmentShader=Vx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=or(t.uniforms),this.uniformsGroups=kx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class pf extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Nn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new I,Zu=new ht,Ju=new ht;class Ve extends pf{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Jc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ha*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Jc*2*Math.atan(Math.tan(ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,Zu,Ju),e.subVectors(Ju,Zu)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ha*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Fi=1;class Gx extends Me{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ve(Ui,Fi,t,e);r.layers=this.layers,this.add(r);const s=new Ve(Ui,Fi,t,e);s.layers=this.layers,this.add(s);const a=new Ve(Ui,Fi,t,e);a.layers=this.layers,this.add(a);const o=new Ve(Ui,Fi,t,e);o.layers=this.layers,this.add(o);const c=new Ve(Ui,Fi,t,e);c.layers=this.layers,this.add(c);const l=new Ve(Ui,Fi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===Nn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===wa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,c),t.setRenderTarget(i,4,r),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class mf extends Oe{constructor(t=[],e=rr,i,r,s,a,o,c,l,u){super(t,e,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Wx extends yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new mf(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ns(5,5,5),s=new Jn({name:"CubemapFromEquirect",uniforms:or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:De,blending:Yn});s.uniforms.tEquirect.value=e;const a=new Ie(r,s),o=e.minFilter;return e.minFilter===mi&&(e.minFilter=fn),new Gx(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}class Xi extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xx={type:"move"};class bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xx)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Xi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Al{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=i}clone(){return new Al(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class qx extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const wo=new I,$x=new I,Yx=new Nt;class Xn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=wo.subVectors(i,e).cross($x.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(wo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Yx.getNormalMatrix(t),r=this.coplanarPoint(wo).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Oa,Ps=new I;class Rl{constructor(t=new Xn,e=new Xn,i=new Xn,r=new Xn,s=new Xn,a=new Xn){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Nn){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],h=r[6],d=r[7],f=r[8],g=r[9],_=r[10],m=r[11],p=r[12],b=r[13],S=r[14],v=r[15];if(i[0].setComponents(c-s,d-l,m-f,v-p).normalize(),i[1].setComponents(c+s,d+l,m+f,v+p).normalize(),i[2].setComponents(c+a,d+u,m+g,v+b).normalize(),i[3].setComponents(c-a,d-u,m-g,v-b).normalize(),i[4].setComponents(c-o,d-h,m-_,v-S).normalize(),e===Nn)i[5].setComponents(c+o,d+h,m+_,v+S).normalize();else if(e===wa)i[5].setComponents(o,h,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(t){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Ps.x=r.normal.x>0?t.max.x:t.min.x,Ps.y=r.normal.y>0?t.max.y:t.min.y,Ps.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Ps)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class is extends ur{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Aa=new I,Ra=new I,Qu=new re,yr=new Ba,Is=new Oa,To=new I,th=new I;class Cl extends Me{constructor(t=new Te,e=new is){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)Aa.fromBufferAttribute(e,r-1),Ra.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Aa.distanceTo(Ra);t.setAttribute("lineDistance",new de(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(r),Is.radius+=s,t.ray.intersectsSphere(Is)===!1)return;Qu.copy(r).invert(),yr.copy(t.ray).applyMatrix4(Qu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=u.getX(_),b=u.getX(_+1),S=Ds(this,t,yr,c,p,b,_);S&&e.push(S)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=Ds(this,t,yr,c,_,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=Ds(this,t,yr,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Ds(this,t,yr,c,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ds(n,t,e,i,r,s,a){const o=n.geometry.attributes.position;if(Aa.fromBufferAttribute(o,r),Ra.fromBufferAttribute(o,s),e.distanceSqToSegment(Aa,Ra,To,th)>i)return;To.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(To);if(!(l<t.near||l>t.far))return{distance:l,point:th.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const eh=new I,nh=new I;class gf extends Cl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)eh.fromBufferAttribute(e,r),nh.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+eh.distanceTo(nh);t.setAttribute("lineDistance",new de(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jx extends Cl{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class _f extends Oe{constructor(t,e,i=xi,r,s,a,o=cn,c=cn,l,u=qr,h=1){if(u!==qr&&u!==$r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:h};super(d,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ca extends Te{constructor(t=1,e=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],f=[];let g=0;const _=[],m=i/2;let p=0;b(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new de(h,3)),this.setAttribute("normal",new de(d,3)),this.setAttribute("uv",new de(f,2));function b(){const v=new I,L=new I;let A=0;const R=(e-t)/i;for(let U=0;U<=s;U++){const E=[],y=U/s,C=y*(e-t)+t;for(let F=0;F<=r;F++){const H=F/r,w=H*c+o,O=Math.sin(w),P=Math.cos(w);L.x=C*O,L.y=-y*i+m,L.z=C*P,h.push(L.x,L.y,L.z),v.set(O,R,P).normalize(),d.push(v.x,v.y,v.z),f.push(H,1-y),E.push(g++)}_.push(E)}for(let U=0;U<r;U++)for(let E=0;E<s;E++){const y=_[E][U],C=_[E+1][U],F=_[E+1][U+1],H=_[E][U+1];(t>0||E!==0)&&(u.push(y,C,H),A+=3),(e>0||E!==s-1)&&(u.push(C,F,H),A+=3)}l.addGroup(p,A,0),p+=A}function S(v){const L=g,A=new ht,R=new I;let U=0;const E=v===!0?t:e,y=v===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const C=g;for(let F=0;F<=r;F++){const w=F/r*c+o,O=Math.cos(w),P=Math.sin(w);R.x=E*P,R.y=m*y,R.z=E*O,h.push(R.x,R.y,R.z),d.push(0,y,0),A.x=O*.5+.5,A.y=P*.5*y+.5,f.push(A.x,A.y),g++}for(let F=0;F<r;F++){const H=L+F,w=C+F;v===!0?u.push(w,w+1,H):u.push(w+1,w,H),U+=3}l.addGroup(p,U,v===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ca(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let r=0;const s=i.length;let a;e?a=e:a=t*i[s-1];let o=0,c=s-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=i[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===a)return r/(s-1);const u=i[r],d=i[r+1]-u,f=(a-u)/d;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),c=e||(a.isVector2?new ht:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new I,r=[],s=[],a=[],o=new I,c=new re;for(let f=0;f<=t;f++){const g=f/t;r[f]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),d<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ot(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(Ot(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Pl extends yn{constructor(t=0,e=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new ht){const i=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Kx extends Pl{constructor(t,e,i,r,s,a){super(t,e,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Il(){let n=0,t=0,e=0,i=0;function r(s,a,o,c){n=s,t=o,e=-3*s+3*a-2*o-c,i=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,u,h){let d=(a-s)/l-(o-s)/(l+u)+(o-a)/u,f=(o-a)/u-(c-a)/(u+h)+(c-o)/h;d*=u,f*=u,r(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return n+t*s+e*a+i*o}}}const Ls=new I,Ao=new Il,Ro=new Il,Co=new Il;class Zx extends yn{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new I){const i=e,r=this.points,s=r.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%s]:(Ls.subVectors(r[0],r[1]).add(r[0]),l=Ls);const h=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Ls.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Ls),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ao.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,_,m),Ro.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,_,m),Co.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Ao.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Ro.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Co.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return i.set(Ao.calc(c),Ro.calc(c),Co.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new I().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ih(n,t,e,i,r){const s=(i-t)*.5,a=(r-e)*.5,o=n*n,c=n*o;return(2*e-2*i+s+a)*c+(-3*e+3*i-2*s-a)*o+s*n+e}function Jx(n,t){const e=1-n;return e*e*t}function Qx(n,t){return 2*(1-n)*n*t}function tv(n,t){return n*n*t}function Or(n,t,e,i){return Jx(n,t)+Qx(n,e)+tv(n,i)}function ev(n,t){const e=1-n;return e*e*e*t}function nv(n,t){const e=1-n;return 3*e*e*n*t}function iv(n,t){return 3*(1-n)*n*n*t}function rv(n,t){return n*n*n*t}function Br(n,t,e,i,r){return ev(n,t)+nv(n,e)+iv(n,i)+rv(n,r)}class xf extends yn{constructor(t=new ht,e=new ht,i=new ht,r=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new ht){const i=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Br(t,r.x,s.x,a.x,o.x),Br(t,r.y,s.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sv extends yn{constructor(t=new I,e=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new I){const i=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Br(t,r.x,s.x,a.x,o.x),Br(t,r.y,s.y,a.y,o.y),Br(t,r.z,s.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vf extends yn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class av extends yn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yf extends yn{constructor(t=new ht,e=new ht,i=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ht){const i=e,r=this.v0,s=this.v1,a=this.v2;return i.set(Or(t,r.x,s.x,a.x),Or(t,r.y,s.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ov extends yn{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){const i=e,r=this.v0,s=this.v1,a=this.v2;return i.set(Or(t,r.x,s.x,a.x),Or(t,r.y,s.y,a.y),Or(t,r.z,s.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mf extends yn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){const i=e,r=this.points,s=(r.length-1)*t,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(ih(o,c.x,l.x,u.x,h.x),ih(o,c.y,l.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new ht().fromArray(r))}return this}}var rh=Object.freeze({__proto__:null,ArcCurve:Kx,CatmullRomCurve3:Zx,CubicBezierCurve:xf,CubicBezierCurve3:sv,EllipseCurve:Pl,LineCurve:vf,LineCurve3:av,QuadraticBezierCurve:yf,QuadraticBezierCurve3:ov,SplineCurve:Mf});class cv extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rh[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new rh[r.type]().fromJSON(r))}return this}}class sh extends cv{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new vf(this.currentPoint.clone(),new ht(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const s=new yf(this.currentPoint.clone(),new ht(t,e),new ht(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,a){const o=new xf(this.currentPoint.clone(),new ht(t,e),new ht(i,r),new ht(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Mf(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,i,r,s,a),this}absarc(t,e,i,r,s,a){return this.absellipse(t,e,i,i,r,s,a),this}ellipse(t,e,i,r,s,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,r,s,a,o,c),this}absellipse(t,e,i,r,s,a,o,c){const l=new Pl(t,e,i,r,s,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Sf extends sh{constructor(t){super(t),this.uuid=lr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(new sh().fromJSON(r))}return this}}function lv(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let s=Ef(n,0,r,e,!0);const a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(i&&(s=pv(n,t,s,e)),n.length>80*e){o=1/0,c=1/0;let u=-1/0,h=-1/0;for(let d=e;d<r;d+=e){const f=n[d],g=n[d+1];f<o&&(o=f),g<c&&(c=g),f>u&&(u=f),g>h&&(h=g)}l=Math.max(u-o,h-c),l=l!==0?32767/l:0}return Yr(s,a,e,o,c,l,0),a}function Ef(n,t,e,i,r){let s;if(r===wv(n,t,e,i)>0)for(let a=t;a<e;a+=i)s=ah(a/i|0,n[a],n[a+1],s);else for(let a=e-i;a>=t;a-=i)s=ah(a/i|0,n[a],n[a+1],s);return s&&cr(s,s.next)&&(Kr(s),s=s.next),s}function Mi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(cr(e,e.next)||ue(e.prev,e,e.next)===0)){if(Kr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Yr(n,t,e,i,r,s,a){if(!n)return;!a&&s&&vv(n,i,r,s);let o=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(s?hv(n,i,r,s):uv(n)){t.push(c.i,n.i,l.i),Kr(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=dv(Mi(n),t),Yr(n,t,e,i,r,s,2)):a===2&&fv(n,t,e,i,r,s):Yr(Mi(n),t,e,i,r,s,1);break}}}function uv(n){const t=n.prev,e=n,i=n.next;if(ue(t,e,i)>=0)return!1;const r=t.x,s=e.x,a=i.x,o=t.y,c=e.y,l=i.y,u=Math.min(r,s,a),h=Math.min(o,c,l),d=Math.max(r,s,a),f=Math.max(o,c,l);let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&Ur(r,o,s,c,a,l,g.x,g.y)&&ue(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function hv(n,t,e,i){const r=n.prev,s=n,a=n.next;if(ue(r,s,a)>=0)return!1;const o=r.x,c=s.x,l=a.x,u=r.y,h=s.y,d=a.y,f=Math.min(o,c,l),g=Math.min(u,h,d),_=Math.max(o,c,l),m=Math.max(u,h,d),p=Qc(f,g,t,e,i),b=Qc(_,m,t,e,i);let S=n.prevZ,v=n.nextZ;for(;S&&S.z>=p&&v&&v.z<=b;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==a&&Ur(o,u,c,h,l,d,S.x,S.y)&&ue(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==a&&Ur(o,u,c,h,l,d,v.x,v.y)&&ue(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==a&&Ur(o,u,c,h,l,d,S.x,S.y)&&ue(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==a&&Ur(o,u,c,h,l,d,v.x,v.y)&&ue(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function dv(n,t){let e=n;do{const i=e.prev,r=e.next.next;!cr(i,r)&&wf(i,e,e.next,r)&&jr(i,r)&&jr(r,i)&&(t.push(i.i,e.i,r.i),Kr(e),Kr(e.next),e=n=r),e=e.next}while(e!==n);return Mi(e)}function fv(n,t,e,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Sv(a,o)){let c=Tf(a,o);a=Mi(a,a.next),c=Mi(c,c.next),Yr(a,t,e,i,r,s,0),Yr(c,t,e,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function pv(n,t,e,i){const r=[];for(let s=0,a=t.length;s<a;s++){const o=t[s]*i,c=s<a-1?t[s+1]*i:n.length,l=Ef(n,o,c,i,!1);l===l.next&&(l.steiner=!0),r.push(Mv(l))}r.sort(mv);for(let s=0;s<r.length;s++)e=gv(r[s],e);return e}function mv(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=i-r}return e}function gv(n,t){const e=_v(n,t);if(!e)return t;const i=Tf(e,n);return Mi(i,i.next),Mi(e,e.next)}function _v(n,t){let e=t;const i=n.x,r=n.y;let s=-1/0,a;if(cr(n,e))return e;do{if(cr(n,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>s&&(s=h,a=e.x<e.next.x?e:e.next,h===i))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;e=a;do{if(i>=e.x&&e.x>=c&&i!==e.x&&bf(r<l?i:s,r,c,l,r<l?s:i,r,e.x,e.y)){const h=Math.abs(r-e.y)/(i-e.x);jr(e,n)&&(h<u||h===u&&(e.x>a.x||e.x===a.x&&xv(a,e)))&&(a=e,u=h)}e=e.next}while(e!==o);return a}function xv(n,t){return ue(n.prev,n,t.prev)<0&&ue(t.next,n,n.next)<0}function vv(n,t,e,i){let r=n;do r.z===0&&(r.z=Qc(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,yv(r)}function yv(n){let t,e=1;do{let i=n,r;n=null;let s=null;for(t=0;i;){t++;let a=i,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,c--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,e*=2}while(t>1);return n}function Qc(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Mv(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function bf(n,t,e,i,r,s,a,o){return(r-a)*(t-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(r-a)*(i-o)}function Ur(n,t,e,i,r,s,a,o){return!(n===a&&t===o)&&bf(n,t,e,i,r,s,a,o)}function Sv(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Ev(n,t)&&(jr(n,t)&&jr(t,n)&&bv(n,t)&&(ue(n.prev,n,t.prev)||ue(n,t.prev,t))||cr(n,t)&&ue(n.prev,n,n.next)>0&&ue(t.prev,t,t.next)>0)}function ue(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function cr(n,t){return n.x===t.x&&n.y===t.y}function wf(n,t,e,i){const r=Us(ue(n,t,e)),s=Us(ue(n,t,i)),a=Us(ue(e,i,n)),o=Us(ue(e,i,t));return!!(r!==s&&a!==o||r===0&&Ns(n,e,t)||s===0&&Ns(n,i,t)||a===0&&Ns(e,n,i)||o===0&&Ns(e,t,i))}function Ns(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Us(n){return n>0?1:n<0?-1:0}function Ev(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&wf(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function jr(n,t){return ue(n.prev,n,n.next)<0?ue(n,t,n.next)>=0&&ue(n,n.prev,t)>=0:ue(n,t,n.prev)<0||ue(n,n.next,t)<0}function bv(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,s=(n.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Tf(n,t){const e=tl(n.i,n.x,n.y),i=tl(t.i,t.x,t.y),r=n.next,s=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function ah(n,t,e,i){const r=tl(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Kr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function tl(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wv(n,t,e,i){let r=0;for(let s=t,a=e-i;s<e;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Tv{static triangulate(t,e,i=2){return lv(t,e,i)}}class kr{static area(t){const e=t.length;let i=0;for(let r=e-1,s=0;s<e;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return kr.area(t)<0}static triangulateShape(t,e){const i=[],r=[],s=[];oh(t),ch(i,t);let a=t.length;e.forEach(oh);for(let c=0;c<e.length;c++)r.push(a),a+=e[c].length,ch(i,e[c]);const o=Tv.triangulate(i,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}}function oh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function ch(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class ka extends Te{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,h=t/o,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*d-a;for(let S=0;S<l;S++){const v=S*h-s;g.push(v,-b,0),_.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){const S=b+l*p,v=b+l*(p+1),L=b+1+l*(p+1),A=b+1+l*p;f.push(S,v,A),f.push(v,L,A)}this.setIndex(f),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ka(t.width,t.height,t.widthSegments,t.heightSegments)}}class Dl extends Te{constructor(t=new Sf([new ht(0,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],r=[],s=[],a=[];let o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new de(r,3)),this.setAttribute("normal",new de(s,3)),this.setAttribute("uv",new de(a,2));function l(u){const h=r.length/3,d=u.extractPoints(e);let f=d.shape;const g=d.holes;kr.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const b=g[m];kr.isClockWise(b)===!0&&(g[m]=b.reverse())}const _=kr.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const b=g[m];f=f.concat(b)}for(let m=0,p=f.length;m<p;m++){const b=f[m];r.push(b.x,b.y,0),s.push(0,0,1),a.push(b.x,b.y)}for(let m=0,p=_.length;m<p;m++){const b=_[m],S=b[0]+h,v=b[1]+h,L=b[2]+h;i.push(S,v,L),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Av(e,t)}static fromJSON(t,e){const i=[];for(let r=0,s=t.shapes.length;r<s;r++){const a=e[t.shapes[r]];i.push(a)}return new Dl(i,t.curveSegments)}}function Av(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const r=n[e];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t}class Ll extends Te{constructor(t=1,e=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new I,d=new I,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const b=[],S=p/i;let v=0;p===0&&a===0?v=.5/e:p===i&&c===Math.PI&&(v=-.5/e);for(let L=0;L<=e;L++){const A=L/e;h.x=-t*Math.cos(r+A*s)*Math.sin(a+S*o),h.y=t*Math.cos(a+S*o),h.z=t*Math.sin(r+A*s)*Math.sin(a+S*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(A+v,1-S),b.push(l++)}u.push(b)}for(let p=0;p<i;p++)for(let b=0;b<e;b++){const S=u[p][b+1],v=u[p][b],L=u[p+1][b],A=u[p+1][b+1];(p!==0||a>0)&&f.push(S,v,A),(p!==i-1||c<Math.PI)&&f.push(v,L,A)}this.setIndex(f),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ll(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Rv extends ur{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=af,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class lh extends Rv{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ht(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Cv extends ur{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ax,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Pv extends ur{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Nl extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Po=new re,uh=new I,hh=new I;class Af{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rl,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;uh.setFromMatrixPosition(t.matrixWorld),e.position.copy(uh),hh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hh),e.updateMatrixWorld(),Po.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Po),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Po)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const dh=new re,Mr=new I,Io=new I;class Iv extends Af{constructor(){super(new Ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ht(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,r=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Mr.setFromMatrixPosition(t.matrixWorld),i.position.copy(Mr),Io.copy(i.position),Io.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Io),i.updateMatrixWorld(),r.makeTranslation(-Mr.x,-Mr.y,-Mr.z),dh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dh)}}class Dv extends Nl{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Iv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Rf extends pf{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Lv extends Af{constructor(){super(new Rf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fh extends Nl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new Lv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Nv extends Nl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Uv extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const ph=new re;class Fv{constructor(t,e,i=0,r=1/0){this.ray=new Ba(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Tl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ph.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ph),this}intersectObject(t,e=!0,i=[]){return el(t,this,i,e),i.sort(mh),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)el(t[r],this,i,e);return i.sort(mh),i}}function mh(n,t){return n.distance-t.distance}function el(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)el(s[a],t,e,!0)}}class gh{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ot(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ot(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ov extends gf{constructor(t=10,e=10,i=4473924,r=8947848){i=new zt(i),r=new zt(r);const s=e/2,a=t/e,o=t/2,c=[],l=[];for(let d=0,f=0,g=-o;d<=e;d++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);const _=d===s?i:r;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}const u=new Te;u.setAttribute("position",new de(c,3)),u.setAttribute("color",new de(l,3));const h=new is({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Bv extends Si{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function _h(n,t,e,i){const r=kv(i);switch(e){case tf:return n*t;case nf:return n*t/r.components*r.byteLength;case Sl:return n*t/r.components*r.byteLength;case rf:return n*t*2/r.components*r.byteLength;case El:return n*t*2/r.components*r.byteLength;case ef:return n*t*3/r.components*r.byteLength;case an:return n*t*4/r.components*r.byteLength;case bl:return n*t*4/r.components*r.byteLength;case aa:case oa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ca:case la:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ac:case Cc:return Math.max(n,16)*Math.max(t,8)/4;case Tc:case Rc:return Math.max(n,8)*Math.max(t,8)/2;case Pc:case Ic:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Dc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Nc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Uc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Oc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Bc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case kc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case zc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Hc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Vc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Gc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Xc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case qc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ua:case $c:case Yc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case sf:case jc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Kc:case Zc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kv(n){switch(n){case _n:case Zd:return{byteLength:1,components:1};case Wr:case Jd:case Qr:return{byteLength:2,components:1};case yl:case Ml:return{byteLength:2,components:4};case xi:case vl:case Ln:return{byteLength:4,components:1};case Qd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Cf(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function zv(n){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const u=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const _=h[f];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Hv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$v=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Kv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ty=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ey=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ny=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,iy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ry=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ay=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ly=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,uy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,py=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,my=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_y="gl_FragColor = linearToOutputTexel( gl_FragColor );",xy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,My=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ey=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,by=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ay=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ry=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Py=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Iy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ly=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ny=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Oy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,By=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ky=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$y=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ky=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,iM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,aM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,gM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_M=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,MM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,SM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,EM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,TM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,AM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,RM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,PM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,IM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,NM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,FM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,BM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,GM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$M=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,YM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,KM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,eS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,oS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_S=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:Hv,alphahash_pars_fragment:Vv,alphamap_fragment:Gv,alphamap_pars_fragment:Wv,alphatest_fragment:Xv,alphatest_pars_fragment:qv,aomap_fragment:$v,aomap_pars_fragment:Yv,batching_pars_vertex:jv,batching_vertex:Kv,begin_vertex:Zv,beginnormal_vertex:Jv,bsdfs:Qv,iridescence_fragment:ty,bumpmap_pars_fragment:ey,clipping_planes_fragment:ny,clipping_planes_pars_fragment:iy,clipping_planes_pars_vertex:ry,clipping_planes_vertex:sy,color_fragment:ay,color_pars_fragment:oy,color_pars_vertex:cy,color_vertex:ly,common:uy,cube_uv_reflection_fragment:hy,defaultnormal_vertex:dy,displacementmap_pars_vertex:fy,displacementmap_vertex:py,emissivemap_fragment:my,emissivemap_pars_fragment:gy,colorspace_fragment:_y,colorspace_pars_fragment:xy,envmap_fragment:vy,envmap_common_pars_fragment:yy,envmap_pars_fragment:My,envmap_pars_vertex:Sy,envmap_physical_pars_fragment:Ly,envmap_vertex:Ey,fog_vertex:by,fog_pars_vertex:wy,fog_fragment:Ty,fog_pars_fragment:Ay,gradientmap_pars_fragment:Ry,lightmap_pars_fragment:Cy,lights_lambert_fragment:Py,lights_lambert_pars_fragment:Iy,lights_pars_begin:Dy,lights_toon_fragment:Ny,lights_toon_pars_fragment:Uy,lights_phong_fragment:Fy,lights_phong_pars_fragment:Oy,lights_physical_fragment:By,lights_physical_pars_fragment:ky,lights_fragment_begin:zy,lights_fragment_maps:Hy,lights_fragment_end:Vy,logdepthbuf_fragment:Gy,logdepthbuf_pars_fragment:Wy,logdepthbuf_pars_vertex:Xy,logdepthbuf_vertex:qy,map_fragment:$y,map_pars_fragment:Yy,map_particle_fragment:jy,map_particle_pars_fragment:Ky,metalnessmap_fragment:Zy,metalnessmap_pars_fragment:Jy,morphinstance_vertex:Qy,morphcolor_vertex:tM,morphnormal_vertex:eM,morphtarget_pars_vertex:nM,morphtarget_vertex:iM,normal_fragment_begin:rM,normal_fragment_maps:sM,normal_pars_fragment:aM,normal_pars_vertex:oM,normal_vertex:cM,normalmap_pars_fragment:lM,clearcoat_normal_fragment_begin:uM,clearcoat_normal_fragment_maps:hM,clearcoat_pars_fragment:dM,iridescence_pars_fragment:fM,opaque_fragment:pM,packing:mM,premultiplied_alpha_fragment:gM,project_vertex:_M,dithering_fragment:xM,dithering_pars_fragment:vM,roughnessmap_fragment:yM,roughnessmap_pars_fragment:MM,shadowmap_pars_fragment:SM,shadowmap_pars_vertex:EM,shadowmap_vertex:bM,shadowmask_pars_fragment:wM,skinbase_vertex:TM,skinning_pars_vertex:AM,skinning_vertex:RM,skinnormal_vertex:CM,specularmap_fragment:PM,specularmap_pars_fragment:IM,tonemapping_fragment:DM,tonemapping_pars_fragment:LM,transmission_fragment:NM,transmission_pars_fragment:UM,uv_pars_fragment:FM,uv_pars_vertex:OM,uv_vertex:BM,worldpos_vertex:kM,background_vert:zM,background_frag:HM,backgroundCube_vert:VM,backgroundCube_frag:GM,cube_vert:WM,cube_frag:XM,depth_vert:qM,depth_frag:$M,distanceRGBA_vert:YM,distanceRGBA_frag:jM,equirect_vert:KM,equirect_frag:ZM,linedashed_vert:JM,linedashed_frag:QM,meshbasic_vert:tS,meshbasic_frag:eS,meshlambert_vert:nS,meshlambert_frag:iS,meshmatcap_vert:rS,meshmatcap_frag:sS,meshnormal_vert:aS,meshnormal_frag:oS,meshphong_vert:cS,meshphong_frag:lS,meshphysical_vert:uS,meshphysical_frag:hS,meshtoon_vert:dS,meshtoon_frag:fS,points_vert:pS,points_frag:mS,shadow_vert:gS,shadow_frag:_S,sprite_vert:xS,sprite_frag:vS},ot={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},un={basic:{uniforms:Pe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Pe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Pe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Pe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Pe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Pe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Pe([ot.points,ot.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Pe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Pe([ot.common,ot.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Pe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Pe([ot.sprite,ot.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Pe([ot.common,ot.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Pe([ot.lights,ot.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};un.physical={uniforms:Pe([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const Fs={r:0,b:0,g:0},oi=new xn,yS=new re;function MS(n,t,e,i,r,s,a){const o=new zt(0);let c=s===!0?0:1,l,u,h=null,d=0,f=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?e:t).get(v)),v}function _(S){let v=!1;const L=g(S);L===null?p(o,c):L&&L.isColor&&(p(L,1),v=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,v){const L=g(v);L&&(L.isCubeTexture||L.mapping===Fa)?(u===void 0&&(u=new Ie(new ns(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:or(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:De,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),oi.copy(v.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),u.material.uniforms.envMap.value=L,u.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yS.makeRotationFromEuler(oi)),u.material.toneMapped=$t.getTransfer(L.colorSpace)!==Qt,(h!==L||d!==L.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=L,d=L.version,f=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):L&&L.isTexture&&(l===void 0&&(l=new Ie(new ka(2,2),new Jn({name:"BackgroundMaterial",uniforms:or(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=L,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=$t.getTransfer(L.colorSpace)!==Qt,L.matrixAutoUpdate===!0&&L.updateMatrix(),l.material.uniforms.uvTransform.value.copy(L.matrix),(h!==L||d!==L.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,h=L,d=L.version,f=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(Fs,ff(n)),i.buffers.color.setClear(Fs.r,Fs.g,Fs.b,v,a)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(o,c)},render:_,addToRenderList:m,dispose:b}}function SS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(y,C,F,H,w){let O=!1;const P=h(H,F,C);s!==P&&(s=P,l(s.object)),O=f(y,H,F,w),O&&g(y,H,F,w),w!==null&&t.update(w,n.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,v(y,C,F,H),w!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(w).buffer))}function c(){return n.createVertexArray()}function l(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,C,F){const H=F.wireframe===!0;let w=i[y.id];w===void 0&&(w={},i[y.id]=w);let O=w[C.id];O===void 0&&(O={},w[C.id]=O);let P=O[H];return P===void 0&&(P=d(c()),O[H]=P),P}function d(y){const C=[],F=[],H=[];for(let w=0;w<e;w++)C[w]=0,F[w]=0,H[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:H,object:y,attributes:{},index:null}}function f(y,C,F,H){const w=s.attributes,O=C.attributes;let P=0;const V=F.getAttributes();for(const k in V)if(V[k].location>=0){const K=w[k];let st=O[k];if(st===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(st=y.instanceColor)),K===void 0||K.attribute!==st||st&&K.data!==st.data)return!0;P++}return s.attributesNum!==P||s.index!==H}function g(y,C,F,H){const w={},O=C.attributes;let P=0;const V=F.getAttributes();for(const k in V)if(V[k].location>=0){let K=O[k];K===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(K=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(K=y.instanceColor));const st={};st.attribute=K,K&&K.data&&(st.data=K.data),w[k]=st,P++}s.attributes=w,s.attributesNum=P,s.index=H}function _(){const y=s.newAttributes;for(let C=0,F=y.length;C<F;C++)y[C]=0}function m(y){p(y,0)}function p(y,C){const F=s.newAttributes,H=s.enabledAttributes,w=s.attributeDivisors;F[y]=1,H[y]===0&&(n.enableVertexAttribArray(y),H[y]=1),w[y]!==C&&(n.vertexAttribDivisor(y,C),w[y]=C)}function b(){const y=s.newAttributes,C=s.enabledAttributes;for(let F=0,H=C.length;F<H;F++)C[F]!==y[F]&&(n.disableVertexAttribArray(F),C[F]=0)}function S(y,C,F,H,w,O,P){P===!0?n.vertexAttribIPointer(y,C,F,w,O):n.vertexAttribPointer(y,C,F,H,w,O)}function v(y,C,F,H){_();const w=H.attributes,O=F.getAttributes(),P=C.defaultAttributeValues;for(const V in O){const k=O[V];if(k.location>=0){let Y=w[V];if(Y===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(Y=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(Y=y.instanceColor)),Y!==void 0){const K=Y.normalized,st=Y.itemSize,vt=t.get(Y);if(vt===void 0)continue;const Ht=vt.buffer,q=vt.type,et=vt.bytesPerElement,dt=q===n.INT||q===n.UNSIGNED_INT||Y.gpuType===vl;if(Y.isInterleavedBufferAttribute){const rt=Y.data,mt=rt.stride,Vt=Y.offset;if(rt.isInstancedInterleavedBuffer){for(let Ct=0;Ct<k.locationSize;Ct++)p(k.location+Ct,rt.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ct=0;Ct<k.locationSize;Ct++)m(k.location+Ct);n.bindBuffer(n.ARRAY_BUFFER,Ht);for(let Ct=0;Ct<k.locationSize;Ct++)S(k.location+Ct,st/k.locationSize,q,K,mt*et,(Vt+st/k.locationSize*Ct)*et,dt)}else{if(Y.isInstancedBufferAttribute){for(let rt=0;rt<k.locationSize;rt++)p(k.location+rt,Y.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let rt=0;rt<k.locationSize;rt++)m(k.location+rt);n.bindBuffer(n.ARRAY_BUFFER,Ht);for(let rt=0;rt<k.locationSize;rt++)S(k.location+rt,st/k.locationSize,q,K,st*et,st/k.locationSize*rt*et,dt)}}else if(P!==void 0){const K=P[V];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(k.location,K);break;case 3:n.vertexAttrib3fv(k.location,K);break;case 4:n.vertexAttrib4fv(k.location,K);break;default:n.vertexAttrib1fv(k.location,K)}}}}b()}function L(){U();for(const y in i){const C=i[y];for(const F in C){const H=C[F];for(const w in H)u(H[w].object),delete H[w];delete C[F]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;const C=i[y.id];for(const F in C){const H=C[F];for(const w in H)u(H[w].object),delete H[w];delete C[F]}delete i[y.id]}function R(y){for(const C in i){const F=i[C];if(F[y.id]===void 0)continue;const H=F[y.id];for(const w in H)u(H[w].object),delete H[w];delete F[y.id]}}function U(){E(),a=!0,s!==r&&(s=r,l(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:U,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function ES(n,t,e){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),e.update(u,i,1)}function a(l,u,h){h!==0&&(n.drawArraysInstanced(i,l,u,h),e.update(u,i,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];e.update(f,i,1)}function c(l,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*d[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function bS(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==an&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===Qr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==_n&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ln&&!U)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:L,maxSamples:A}}function wS(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new Xn,o=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||r;return r=d,i=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const b=s?0:i,S=b*4;let v=p.clippingState||null;c.value=v,v=u(g,d,S,f);for(let L=0;L!==S;++L)v[L]=e[L];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=f;S!==_;++S,v+=4)a.copy(h[S]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function TS(n){let t=new WeakMap;function e(a,o){return o===Sc?a.mapping=rr:o===Ec&&(a.mapping=sr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Sc||o===Ec)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Wx(c.height);return l.fromEquirectangularTexture(n,a),t.set(a,l),a.addEventListener("dispose",r),e(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const qi=4,xh=[.125,.215,.35,.446,.526,.582],di=20,Do=new Rf,vh=new zt;let Lo=null,No=0,Uo=0,Fo=!1;const ui=(1+Math.sqrt(5))/2,Oi=1/ui,yh=[new I(-ui,Oi,0),new I(ui,Oi,0),new I(-Oi,0,ui),new I(Oi,0,ui),new I(0,ui,-Oi),new I(0,ui,Oi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],AS=new I;class Mh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:a=256,position:o=AS}=s;Lo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,r,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Lo,No,Uo),this._renderer.xr.enabled=Fo,t.scissorTest=!1,Os(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rr||t.mapping===sr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Qr,format:an,colorSpace:ar,depthBuffer:!1},r=Sh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sh(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=RS(s)),this._blurMaterial=CS(s,t,e)}return r}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,Do)}_sceneToCubeUV(t,e,i,r,s){const c=new Ve(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(vh),h.toneMapping=jn,h.autoClear=!1;const g=new es({name:"PMREM.Background",side:De,depthWrite:!1,depthTest:!1}),_=new Ie(new ns,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(vh),m=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[b],s.y,s.z)):S===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[b]));const v=this._cubeSize;Os(r,S*v,b>2?v:0,v,v),h.setRenderTarget(r),m&&h.render(_,c),h.render(t,c)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===rr||t.mapping===sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eh());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ie(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;Os(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,Do)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=yh[(r-s-1)%yh.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ie(this._lodPlanes[r],l),d=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*di-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):di;m>di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const p=[];let b=0;for(let R=0;R<di;++R){const U=R/_,E=Math.exp(-U*U/2);p.push(E),R===0?b+=E:R<m&&(b+=2*E)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-i;const v=this._sizeLods[r],L=3*v*(r>S-qi?r-S+qi:0),A=4*(this._cubeSize-v);Os(e,L,A,3*v,2*v),c.setRenderTarget(e),c.render(h,Do)}}function RS(n){const t=[],e=[],i=[];let r=n;const s=n-qi+1+xh.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-qi?c=xh[a-n+qi-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),S=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,U=A>2?0:-1,E=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];b.set(E,_*g*A),S.set(d,m*g*A);const y=[A,A,A,A,A,A];v.set(y,p*g*A)}const L=new Te;L.setAttribute("position",new gn(b,_)),L.setAttribute("uv",new gn(S,m)),L.setAttribute("faceIndex",new gn(v,p)),t.push(L),r>qi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Sh(n,t,e){const i=new yi(n,t,e);return i.texture.mapping=Fa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Os(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function CS(n,t,e){const i=new Float32Array(di),r=new I(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Eh(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function bh(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Ul(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function PS(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Sc||c===Ec,u=c===rr||c===sr;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Mh(n)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&r(f)?(e===null&&(e=new Mh(n)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function IS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Ki("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function DS(n,t,e,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const f in d)t.update(d[f],n.ARRAY_BUFFER)}function l(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let S=0,v=b.length;S<v;S+=3){const L=b[S+0],A=b[S+1],R=b[S+2];d.push(L,A,A,R,R,L)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const L=S+0,A=S+1,R=S+2;d.push(L,A,A,R,R,L)}}else return;const m=new(cf(d)?df:hf)(d,1);m.version=_;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function LS(n,t,e){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,f){n.drawElements(i,f,s,d*a),e.update(f,i,1)}function l(d,f,g){g!==0&&(n.drawElementsInstanced(i,f,s,d*a,g),e.update(f,i,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,i,1)}function h(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*_[b];e.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function NS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function US(n,t,e){const i=new WeakMap,r=new ee;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let y=function(){U.dispose(),i.delete(o),o.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let L=o.attributes.position.count*v,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const R=new Float32Array(L*A*4*h),U=new lf(R,L,A,h);U.type=Ln,U.needsUpdate=!0;const E=v*4;for(let C=0;C<h;C++){const F=p[C],H=b[C],w=S[C],O=L*A*4*C;for(let P=0;P<F.count;P++){const V=P*E;g===!0&&(r.fromBufferAttribute(F,P),R[O+V+0]=r.x,R[O+V+1]=r.y,R[O+V+2]=r.z,R[O+V+3]=0),_===!0&&(r.fromBufferAttribute(H,P),R[O+V+4]=r.x,R[O+V+5]=r.y,R[O+V+6]=r.z,R[O+V+7]=0),m===!0&&(r.fromBufferAttribute(w,P),R[O+V+8]=r.x,R[O+V+9]=r.y,R[O+V+10]=r.z,R[O+V+11]=w.itemSize===4?r.w:1)}}d={count:h,texture:U,size:new ht(L,A)},i.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function FS(n,t,e,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return h}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}const Pf=new Oe,wh=new _f(1,1),If=new lf,Df=new Ax,Lf=new mf,Th=[],Ah=[],Rh=new Float32Array(16),Ch=new Float32Array(9),Ph=new Float32Array(4);function hr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Th[r];if(s===void 0&&(s=new Float32Array(r),Th[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function _e(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function za(n,t){let e=Ah[t];e===void 0&&(e=new Int32Array(t),Ah[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function OS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function BS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2fv(this.addr,t),xe(e,t)}}function kS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;n.uniform3fv(this.addr,t),xe(e,t)}}function zS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4fv(this.addr,t),xe(e,t)}}function HS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(_e(e,i))return;Ph.set(i),n.uniformMatrix2fv(this.addr,!1,Ph),xe(e,i)}}function VS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(_e(e,i))return;Ch.set(i),n.uniformMatrix3fv(this.addr,!1,Ch),xe(e,i)}}function GS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(_e(e,i))return;Rh.set(i),n.uniformMatrix4fv(this.addr,!1,Rh),xe(e,i)}}function WS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function XS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2iv(this.addr,t),xe(e,t)}}function qS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;n.uniform3iv(this.addr,t),xe(e,t)}}function $S(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4iv(this.addr,t),xe(e,t)}}function YS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function jS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;n.uniform2uiv(this.addr,t),xe(e,t)}}function KS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;n.uniform3uiv(this.addr,t),xe(e,t)}}function ZS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;n.uniform4uiv(this.addr,t),xe(e,t)}}function JS(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(wh.compareFunction=of,s=wh):s=Pf,e.setTexture2D(t||s,r)}function QS(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Df,r)}function tE(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Lf,r)}function eE(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||If,r)}function nE(n){switch(n){case 5126:return OS;case 35664:return BS;case 35665:return kS;case 35666:return zS;case 35674:return HS;case 35675:return VS;case 35676:return GS;case 5124:case 35670:return WS;case 35667:case 35671:return XS;case 35668:case 35672:return qS;case 35669:case 35673:return $S;case 5125:return YS;case 36294:return jS;case 36295:return KS;case 36296:return ZS;case 35678:case 36198:case 36298:case 36306:case 35682:return JS;case 35679:case 36299:case 36307:return QS;case 35680:case 36300:case 36308:case 36293:return tE;case 36289:case 36303:case 36311:case 36292:return eE}}function iE(n,t){n.uniform1fv(this.addr,t)}function rE(n,t){const e=hr(t,this.size,2);n.uniform2fv(this.addr,e)}function sE(n,t){const e=hr(t,this.size,3);n.uniform3fv(this.addr,e)}function aE(n,t){const e=hr(t,this.size,4);n.uniform4fv(this.addr,e)}function oE(n,t){const e=hr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function cE(n,t){const e=hr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function lE(n,t){const e=hr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function uE(n,t){n.uniform1iv(this.addr,t)}function hE(n,t){n.uniform2iv(this.addr,t)}function dE(n,t){n.uniform3iv(this.addr,t)}function fE(n,t){n.uniform4iv(this.addr,t)}function pE(n,t){n.uniform1uiv(this.addr,t)}function mE(n,t){n.uniform2uiv(this.addr,t)}function gE(n,t){n.uniform3uiv(this.addr,t)}function _E(n,t){n.uniform4uiv(this.addr,t)}function xE(n,t,e){const i=this.cache,r=t.length,s=za(e,r);_e(i,s)||(n.uniform1iv(this.addr,s),xe(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Pf,s[a])}function vE(n,t,e){const i=this.cache,r=t.length,s=za(e,r);_e(i,s)||(n.uniform1iv(this.addr,s),xe(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Df,s[a])}function yE(n,t,e){const i=this.cache,r=t.length,s=za(e,r);_e(i,s)||(n.uniform1iv(this.addr,s),xe(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Lf,s[a])}function ME(n,t,e){const i=this.cache,r=t.length,s=za(e,r);_e(i,s)||(n.uniform1iv(this.addr,s),xe(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||If,s[a])}function SE(n){switch(n){case 5126:return iE;case 35664:return rE;case 35665:return sE;case 35666:return aE;case 35674:return oE;case 35675:return cE;case 35676:return lE;case 5124:case 35670:return uE;case 35667:case 35671:return hE;case 35668:case 35672:return dE;case 35669:case 35673:return fE;case 5125:return pE;case 36294:return mE;case 36295:return gE;case 36296:return _E;case 35678:case 36198:case 36298:case 36306:case 35682:return xE;case 35679:case 36299:case 36307:return vE;case 35680:case 36300:case 36308:case 36293:return yE;case 36289:case 36303:case 36311:case 36292:return ME}}class EE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=nE(e.type)}}class bE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=SE(e.type)}}class wE{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const Oo=/(\w+)(\])?(\[|\.)?/g;function Ih(n,t){n.seq.push(t),n.map[t.id]=t}function TE(n,t,e){const i=n.name,r=i.length;for(Oo.lastIndex=0;;){const s=Oo.exec(i),a=Oo.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Ih(e,l===void 0?new EE(o,n,t):new bE(o,n,t));break}else{let h=e.map[o];h===void 0&&(h=new wE(o),Ih(e,h)),e=h}}}class da{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);TE(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function Dh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const AE=37297;let RE=0;function CE(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Lh=new Nt;function PE(n){$t._getMatrix(Lh,$t.workingColorSpace,n);const t=`mat3( ${Lh.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(n)){case ba:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Nh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+CE(n.getShaderSource(t),a)}else return r}function IE(n,t){const e=PE(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function DE(n,t){let e;switch(t){case Q0:e="Linear";break;case tx:e="Reinhard";break;case ex:e="Cineon";break;case jd:e="ACESFilmic";break;case ix:e="AgX";break;case rx:e="Neutral";break;case nx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Bs=new I;function LE(){$t.getLuminanceCoefficients(Bs);const n=Bs.x.toFixed(4),t=Bs.y.toFixed(4),e=Bs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fr).join(`
`)}function UE(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function FE(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Fr(n){return n!==""}function Uh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const OE=/^[ \t]*#include +<([\w\d./]+)>/gm;function nl(n){return n.replace(OE,kE)}const BE=new Map;function kE(n,t){let e=Ft[t];if(e===void 0){const i=BE.get(t);if(i!==void 0)e=Ft[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return nl(e)}const zE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oh(n){return n.replace(zE,HE)}function HE(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function VE(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===qd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===$d?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function GE(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rr:case sr:t="ENVMAP_TYPE_CUBE";break;case Fa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function WE(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case sr:t="ENVMAP_MODE_REFRACTION";break}return t}function XE(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Yd:t="ENVMAP_BLENDING_MULTIPLY";break;case Z0:t="ENVMAP_BLENDING_MIX";break;case J0:t="ENVMAP_BLENDING_ADD";break}return t}function qE(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function $E(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=VE(e),l=GE(e),u=WE(e),h=XE(e),d=qE(e),f=NE(e),g=UE(s),_=r.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fr).join(`
`),p.length>0&&(p+=`
`)):(m=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fr).join(`
`),p=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==jn?DE("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,IE("linearToOutputTexel",e.outputColorSpace),LE(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fr).join(`
`)),a=nl(a),a=Uh(a,e),a=Fh(a,e),o=nl(o),o=Uh(o,e),o=Fh(o,e),a=Oh(a),o=Oh(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+a,v=b+p+o,L=Dh(r,r.VERTEX_SHADER,S),A=Dh(r,r.FRAGMENT_SHADER,v);r.attachShader(_,L),r.attachShader(_,A),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(C){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(_).trim(),H=r.getShaderInfoLog(L).trim(),w=r.getShaderInfoLog(A).trim();let O=!0,P=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,L,A);else{const V=Nh(r,L,"vertex"),k=Nh(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+V+`
`+k)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(H===""||w==="")&&(P=!1);P&&(C.diagnostics={runnable:O,programLog:F,vertexShader:{log:H,prefix:m},fragmentShader:{log:w,prefix:p}})}r.deleteShader(L),r.deleteShader(A),U=new da(r,_),E=FE(r,_)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,AE)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=RE++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=A,this}let YE=0;class jE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new KE(t),e.set(t,i)),i}}class KE{constructor(t){this.id=YE++,this.code=t,this.usedTimes=0}}function ZE(n,t,e,i,r,s,a){const o=new Tl,c=new jE,l=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,y,C,F,H){const w=F.fog,O=H.geometry,P=E.isMeshStandardMaterial?F.environment:null,V=(E.isMeshStandardMaterial?e:t).get(E.envMap||P),k=V&&V.mapping===Fa?V.image.height:null,Y=g[E.type];E.precision!==null&&(f=r.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const K=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,st=K!==void 0?K.length:0;let vt=0;O.morphAttributes.position!==void 0&&(vt=1),O.morphAttributes.normal!==void 0&&(vt=2),O.morphAttributes.color!==void 0&&(vt=3);let Ht,q,et,dt;if(Y){const Zt=un[Y];Ht=Zt.vertexShader,q=Zt.fragmentShader}else Ht=E.vertexShader,q=E.fragmentShader,c.update(E),et=c.getVertexShaderID(E),dt=c.getFragmentShaderID(E);const rt=n.getRenderTarget(),mt=n.state.buffers.depth.getReversed(),Vt=H.isInstancedMesh===!0,Ct=H.isBatchedMesh===!0,oe=!!E.map,ce=!!E.matcap,Yt=!!V,D=!!E.aoMap,Re=!!E.lightMap,jt=!!E.bumpMap,ie=!!E.normalMap,Mt=!!E.displacementMap,Xt=!!E.emissiveMap,wt=!!E.metalnessMap,Ut=!!E.roughnessMap,me=E.anisotropy>0,T=E.clearcoat>0,x=E.dispersion>0,G=E.iridescence>0,j=E.sheen>0,J=E.transmission>0,$=me&&!!E.anisotropyMap,St=T&&!!E.clearcoatMap,ct=T&&!!E.clearcoatNormalMap,yt=T&&!!E.clearcoatRoughnessMap,Et=G&&!!E.iridescenceMap,Q=G&&!!E.iridescenceThicknessMap,ft=j&&!!E.sheenColorMap,Rt=j&&!!E.sheenRoughnessMap,At=!!E.specularMap,at=!!E.specularColorMap,Dt=!!E.specularIntensityMap,N=J&&!!E.transmissionMap,lt=J&&!!E.thicknessMap,tt=!!E.gradientMap,gt=!!E.alphaMap,nt=E.alphaTest>0,Z=!!E.alphaHash,_t=!!E.extensions;let Lt=jn;E.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Lt=n.toneMapping);const se={shaderID:Y,shaderType:E.type,shaderName:E.name,vertexShader:Ht,fragmentShader:q,defines:E.defines,customVertexShaderID:et,customFragmentShaderID:dt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Ct,batchingColor:Ct&&H._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&H.instanceColor!==null,instancingMorph:Vt&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?n.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:ar,alphaToCoverage:!!E.alphaToCoverage,map:oe,matcap:ce,envMap:Yt,envMapMode:Yt&&V.mapping,envMapCubeUVHeight:k,aoMap:D,lightMap:Re,bumpMap:jt,normalMap:ie,displacementMap:d&&Mt,emissiveMap:Xt,normalMapObjectSpace:ie&&E.normalMapType===cx,normalMapTangentSpace:ie&&E.normalMapType===af,metalnessMap:wt,roughnessMap:Ut,anisotropy:me,anisotropyMap:$,clearcoat:T,clearcoatMap:St,clearcoatNormalMap:ct,clearcoatRoughnessMap:yt,dispersion:x,iridescence:G,iridescenceMap:Et,iridescenceThicknessMap:Q,sheen:j,sheenColorMap:ft,sheenRoughnessMap:Rt,specularMap:At,specularColorMap:at,specularIntensityMap:Dt,transmission:J,transmissionMap:N,thicknessMap:lt,gradientMap:tt,opaque:E.transparent===!1&&E.blending===ji&&E.alphaToCoverage===!1,alphaMap:gt,alphaTest:nt,alphaHash:Z,combine:E.combine,mapUv:oe&&_(E.map.channel),aoMapUv:D&&_(E.aoMap.channel),lightMapUv:Re&&_(E.lightMap.channel),bumpMapUv:jt&&_(E.bumpMap.channel),normalMapUv:ie&&_(E.normalMap.channel),displacementMapUv:Mt&&_(E.displacementMap.channel),emissiveMapUv:Xt&&_(E.emissiveMap.channel),metalnessMapUv:wt&&_(E.metalnessMap.channel),roughnessMapUv:Ut&&_(E.roughnessMap.channel),anisotropyMapUv:$&&_(E.anisotropyMap.channel),clearcoatMapUv:St&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:ct&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(E.sheenRoughnessMap.channel),specularMapUv:At&&_(E.specularMap.channel),specularColorMapUv:at&&_(E.specularColorMap.channel),specularIntensityMapUv:Dt&&_(E.specularIntensityMap.channel),transmissionMapUv:N&&_(E.transmissionMap.channel),thicknessMapUv:lt&&_(E.thicknessMap.channel),alphaMapUv:gt&&_(E.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ie||me),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!O.attributes.uv&&(oe||gt),fog:!!w,useFog:E.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:mt,skinning:H.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:vt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Lt,decodeVideoTexture:oe&&E.map.isVideoTexture===!0&&$t.getTransfer(E.map.colorSpace)===Qt,decodeVideoTextureEmissive:Xt&&E.emissiveMap.isVideoTexture===!0&&$t.getTransfer(E.emissiveMap.colorSpace)===Qt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ke,flipSided:E.side===De,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:_t&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&E.extensions.multiDraw===!0||Ct)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return se.vertexUv1s=l.has(1),se.vertexUv2s=l.has(2),se.vertexUv3s=l.has(3),l.clear(),se}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)y.push(C),y.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(b(y,E),S(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function b(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function S(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),E.push(o.mask)}function v(E){const y=g[E.type];let C;if(y){const F=un[y];C=zx.clone(F.uniforms)}else C=E.uniforms;return C}function L(E,y){let C;for(let F=0,H=u.length;F<H;F++){const w=u[F];if(w.cacheKey===y){C=w,++C.usedTimes;break}}return C===void 0&&(C=new $E(n,y,E,s),u.push(C)),C}function A(E){if(--E.usedTimes===0){const y=u.indexOf(E);u[y]=u[u.length-1],u.pop(),E.destroy()}}function R(E){c.remove(E)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:L,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:U}}function JE(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function QE(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function kh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function zh(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(h,d,f,g,_,m){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),t++,p}function o(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):e.push(p)}function c(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||QE),i.length>1&&i.sort(d||kh),r.length>1&&r.sort(d||kh)}function u(){for(let h=t,d=n.length;h<d;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function tb(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new zh,n.set(i,[a])):r>=s.length?(a=new zh,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function eb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new zt};break;case"SpotLight":e={position:new I,direction:new I,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function nb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let ib=0;function rb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function sb(n){const t=new eb,e=nb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const r=new I,s=new re,a=new re;function o(l){let u=0,h=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,S=0,v=0,L=0,A=0,R=0;l.sort(rb);for(let E=0,y=l.length;E<y;E++){const C=l[E],F=C.color,H=C.intensity,w=C.distance,O=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=F.r*H,h+=F.g*H,d+=F.b*H;else if(C.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(C.sh.coefficients[P],H);R++}else if(C.isDirectionalLight){const P=t.get(C);if(P.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,k=e.get(C);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,i.directionalShadow[f]=k,i.directionalShadowMap[f]=O,i.directionalShadowMatrix[f]=C.shadow.matrix,b++}i.directional[f]=P,f++}else if(C.isSpotLight){const P=t.get(C);P.position.setFromMatrixPosition(C.matrixWorld),P.color.copy(F).multiplyScalar(H),P.distance=w,P.coneCos=Math.cos(C.angle),P.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),P.decay=C.decay,i.spot[_]=P;const V=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,V.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[_]=V.matrix,C.castShadow){const k=e.get(C);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,i.spotShadow[_]=k,i.spotShadowMap[_]=O,v++}_++}else if(C.isRectAreaLight){const P=t.get(C);P.color.copy(F).multiplyScalar(H),P.halfWidth.set(C.width*.5,0,0),P.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=P,m++}else if(C.isPointLight){const P=t.get(C);if(P.color.copy(C.color).multiplyScalar(C.intensity),P.distance=C.distance,P.decay=C.decay,C.castShadow){const V=C.shadow,k=e.get(C);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,k.shadowCameraNear=V.camera.near,k.shadowCameraFar=V.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=C.shadow.matrix,S++}i.point[g]=P,g++}else if(C.isHemisphereLight){const P=t.get(C);P.skyColor.copy(C.color).multiplyScalar(H),P.groundColor.copy(C.groundColor).multiplyScalar(H),i.hemi[p]=P,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ot.LTC_FLOAT_1,i.rectAreaLTC2=ot.LTC_FLOAT_2):(i.rectAreaLTC1=ot.LTC_HALF_1,i.rectAreaLTC2=ot.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const U=i.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==b||U.numPointShadows!==S||U.numSpotShadows!==v||U.numSpotMaps!==L||U.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=v+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,U.directionalLength=f,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=b,U.numPointShadows=S,U.numSpotShadows=v,U.numSpotMaps=L,U.numLightProbes=R,i.version=ib++)}function c(l,u){let h=0,d=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const S=l[p];if(S.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(S.isSpotLight){const v=i.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const v=i.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function Hh(n){const t=new sb(n),e=[],i=[];function r(u){l.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function a(u){i.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function ab(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Hh(n),t.set(r,[o])):s>=a.length?(o=new Hh(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lb(n,t,e){let i=new Rl;const r=new ht,s=new ht,a=new ee,o=new Cv({depthPacking:ox}),c=new Pv,l={},u=e.maxTextureSize,h={[Zn]:De,[De]:Zn,[Ke]:Ke},d=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:ob,fragmentShader:cb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Te;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qd;let p=this.type;this.render=function(A,R,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Yn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=p!==Pn&&this.type===Pn,w=p===Pn&&this.type!==Pn;for(let O=0,P=A.length;O<P;O++){const V=A[O],k=V.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const Y=k.getFrameExtents();if(r.multiply(Y),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Y.x),r.x=s.x*Y.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Y.y),r.y=s.y*Y.y,k.mapSize.y=s.y)),k.map===null||H===!0||w===!0){const st=this.type!==Pn?{minFilter:cn,magFilter:cn}:{};k.map!==null&&k.map.dispose(),k.map=new yi(r.x,r.y,st),k.map.texture.name=V.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const K=k.getViewportCount();for(let st=0;st<K;st++){const vt=k.getViewport(st);a.set(s.x*vt.x,s.y*vt.y,s.x*vt.z,s.y*vt.w),F.viewport(a),k.updateMatrices(V,st),i=k.getFrustum(),v(R,U,k.camera,V,this.type)}k.isPointLightShadow!==!0&&this.type===Pn&&b(k,U),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,y,C)};function b(A,R){const U=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new yi(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,U,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,U,f,_,null)}function S(A,R,U,E){let y=null;const C=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)y=C;else if(y=U.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=y.uuid,H=R.uuid;let w=l[F];w===void 0&&(w={},l[F]=w);let O=w[H];O===void 0&&(O=y.clone(),w[H]=O,R.addEventListener("dispose",L)),y=O}if(y.visible=R.visible,y.wireframe=R.wireframe,E===Pn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,U.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=n.properties.get(y);F.light=U}return y}function v(A,R,U,E,y){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Pn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const H=t.update(A),w=A.material;if(Array.isArray(w)){const O=H.groups;for(let P=0,V=O.length;P<V;P++){const k=O[P],Y=w[k.materialIndex];if(Y&&Y.visible){const K=S(A,Y,E,y);A.onBeforeShadow(n,A,R,U,H,K,k),n.renderBufferDirect(U,null,H,K,A,k),A.onAfterShadow(n,A,R,U,H,K,k)}}}else if(w.visible){const O=S(A,w,E,y);A.onBeforeShadow(n,A,R,U,H,O,null),n.renderBufferDirect(U,null,H,O,A,null),A.onAfterShadow(n,A,R,U,H,O,null)}}const F=A.children;for(let H=0,w=F.length;H<w;H++)v(F[H],R,U,E,y)}function L(A){A.target.removeEventListener("dispose",L);for(const U in l){const E=l[U],y=A.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const ub={[mc]:gc,[_c]:yc,[xc]:Mc,[ir]:vc,[gc]:mc,[yc]:_c,[Mc]:xc,[vc]:ir};function hb(n,t){function e(){let N=!1;const lt=new ee;let tt=null;const gt=new ee(0,0,0,0);return{setMask:function(nt){tt!==nt&&!N&&(n.colorMask(nt,nt,nt,nt),tt=nt)},setLocked:function(nt){N=nt},setClear:function(nt,Z,_t,Lt,se){se===!0&&(nt*=Lt,Z*=Lt,_t*=Lt),lt.set(nt,Z,_t,Lt),gt.equals(lt)===!1&&(n.clearColor(nt,Z,_t,Lt),gt.copy(lt))},reset:function(){N=!1,tt=null,gt.set(-1,0,0,0)}}}function i(){let N=!1,lt=!1,tt=null,gt=null,nt=null;return{setReversed:function(Z){if(lt!==Z){const _t=t.get("EXT_clip_control");Z?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),lt=Z;const Lt=nt;nt=null,this.setClear(Lt)}},getReversed:function(){return lt},setTest:function(Z){Z?rt(n.DEPTH_TEST):mt(n.DEPTH_TEST)},setMask:function(Z){tt!==Z&&!N&&(n.depthMask(Z),tt=Z)},setFunc:function(Z){if(lt&&(Z=ub[Z]),gt!==Z){switch(Z){case mc:n.depthFunc(n.NEVER);break;case gc:n.depthFunc(n.ALWAYS);break;case _c:n.depthFunc(n.LESS);break;case ir:n.depthFunc(n.LEQUAL);break;case xc:n.depthFunc(n.EQUAL);break;case vc:n.depthFunc(n.GEQUAL);break;case yc:n.depthFunc(n.GREATER);break;case Mc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}gt=Z}},setLocked:function(Z){N=Z},setClear:function(Z){nt!==Z&&(lt&&(Z=1-Z),n.clearDepth(Z),nt=Z)},reset:function(){N=!1,tt=null,gt=null,nt=null,lt=!1}}}function r(){let N=!1,lt=null,tt=null,gt=null,nt=null,Z=null,_t=null,Lt=null,se=null;return{setTest:function(Zt){N||(Zt?rt(n.STENCIL_TEST):mt(n.STENCIL_TEST))},setMask:function(Zt){lt!==Zt&&!N&&(n.stencilMask(Zt),lt=Zt)},setFunc:function(Zt,Ze,Mn){(tt!==Zt||gt!==Ze||nt!==Mn)&&(n.stencilFunc(Zt,Ze,Mn),tt=Zt,gt=Ze,nt=Mn)},setOp:function(Zt,Ze,Mn){(Z!==Zt||_t!==Ze||Lt!==Mn)&&(n.stencilOp(Zt,Ze,Mn),Z=Zt,_t=Ze,Lt=Mn)},setLocked:function(Zt){N=Zt},setClear:function(Zt){se!==Zt&&(n.clearStencil(Zt),se=Zt)},reset:function(){N=!1,lt=null,tt=null,gt=null,nt=null,Z=null,_t=null,Lt=null,se=null}}}const s=new e,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,L=null,A=null,R=new zt(0,0,0),U=0,E=!1,y=null,C=null,F=null,H=null,w=null;const O=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,V=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(k)[1]),P=V>=1):k.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),P=V>=2);let Y=null,K={};const st=n.getParameter(n.SCISSOR_BOX),vt=n.getParameter(n.VIEWPORT),Ht=new ee().fromArray(st),q=new ee().fromArray(vt);function et(N,lt,tt,gt){const nt=new Uint8Array(4),Z=n.createTexture();n.bindTexture(N,Z),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let _t=0;_t<tt;_t++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(lt,0,n.RGBA,1,1,gt,0,n.RGBA,n.UNSIGNED_BYTE,nt):n.texImage2D(lt+_t,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,nt);return Z}const dt={};dt[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),dt[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),dt[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(n.DEPTH_TEST),a.setFunc(ir),jt(!1),ie(Cu),rt(n.CULL_FACE),D(Yn);function rt(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function mt(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Vt(N,lt){return h[N]!==lt?(n.bindFramebuffer(N,lt),h[N]=lt,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=lt),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=lt),!0):!1}function Ct(N,lt){let tt=f,gt=!1;if(N){tt=d.get(lt),tt===void 0&&(tt=[],d.set(lt,tt));const nt=N.textures;if(tt.length!==nt.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,_t=nt.length;Z<_t;Z++)tt[Z]=n.COLOR_ATTACHMENT0+Z;tt.length=nt.length,gt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,gt=!0);gt&&n.drawBuffers(tt)}function oe(N){return g!==N?(n.useProgram(N),g=N,!0):!1}const ce={[hi]:n.FUNC_ADD,[N0]:n.FUNC_SUBTRACT,[U0]:n.FUNC_REVERSE_SUBTRACT};ce[F0]=n.MIN,ce[O0]=n.MAX;const Yt={[B0]:n.ZERO,[k0]:n.ONE,[z0]:n.SRC_COLOR,[fc]:n.SRC_ALPHA,[q0]:n.SRC_ALPHA_SATURATE,[W0]:n.DST_COLOR,[V0]:n.DST_ALPHA,[H0]:n.ONE_MINUS_SRC_COLOR,[pc]:n.ONE_MINUS_SRC_ALPHA,[X0]:n.ONE_MINUS_DST_COLOR,[G0]:n.ONE_MINUS_DST_ALPHA,[$0]:n.CONSTANT_COLOR,[Y0]:n.ONE_MINUS_CONSTANT_COLOR,[j0]:n.CONSTANT_ALPHA,[K0]:n.ONE_MINUS_CONSTANT_ALPHA};function D(N,lt,tt,gt,nt,Z,_t,Lt,se,Zt){if(N===Yn){_===!0&&(mt(n.BLEND),_=!1);return}if(_===!1&&(rt(n.BLEND),_=!0),N!==L0){if(N!==m||Zt!==E){if((p!==hi||v!==hi)&&(n.blendEquation(n.FUNC_ADD),p=hi,v=hi),Zt)switch(N){case ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pu:n.blendFunc(n.ONE,n.ONE);break;case Iu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Du:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Iu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Du:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,S=null,L=null,A=null,R.set(0,0,0),U=0,m=N,E=Zt}return}nt=nt||lt,Z=Z||tt,_t=_t||gt,(lt!==p||nt!==v)&&(n.blendEquationSeparate(ce[lt],ce[nt]),p=lt,v=nt),(tt!==b||gt!==S||Z!==L||_t!==A)&&(n.blendFuncSeparate(Yt[tt],Yt[gt],Yt[Z],Yt[_t]),b=tt,S=gt,L=Z,A=_t),(Lt.equals(R)===!1||se!==U)&&(n.blendColor(Lt.r,Lt.g,Lt.b,se),R.copy(Lt),U=se),m=N,E=!1}function Re(N,lt){N.side===Ke?mt(n.CULL_FACE):rt(n.CULL_FACE);let tt=N.side===De;lt&&(tt=!tt),jt(tt),N.blending===ji&&N.transparent===!1?D(Yn):D(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const gt=N.stencilWrite;o.setTest(gt),gt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Xt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?rt(n.SAMPLE_ALPHA_TO_COVERAGE):mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function jt(N){y!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),y=N)}function ie(N){N!==I0?(rt(n.CULL_FACE),N!==C&&(N===Cu?n.cullFace(n.BACK):N===D0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):mt(n.CULL_FACE),C=N}function Mt(N){N!==F&&(P&&n.lineWidth(N),F=N)}function Xt(N,lt,tt){N?(rt(n.POLYGON_OFFSET_FILL),(H!==lt||w!==tt)&&(n.polygonOffset(lt,tt),H=lt,w=tt)):mt(n.POLYGON_OFFSET_FILL)}function wt(N){N?rt(n.SCISSOR_TEST):mt(n.SCISSOR_TEST)}function Ut(N){N===void 0&&(N=n.TEXTURE0+O-1),Y!==N&&(n.activeTexture(N),Y=N)}function me(N,lt,tt){tt===void 0&&(Y===null?tt=n.TEXTURE0+O-1:tt=Y);let gt=K[tt];gt===void 0&&(gt={type:void 0,texture:void 0},K[tt]=gt),(gt.type!==N||gt.texture!==lt)&&(Y!==tt&&(n.activeTexture(tt),Y=tt),n.bindTexture(N,lt||dt[N]),gt.type=N,gt.texture=lt)}function T(){const N=K[Y];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ct(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function yt(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ft(N){Ht.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Ht.copy(N))}function Rt(N){q.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),q.copy(N))}function At(N,lt){let tt=l.get(lt);tt===void 0&&(tt=new WeakMap,l.set(lt,tt));let gt=tt.get(N);gt===void 0&&(gt=n.getUniformBlockIndex(lt,N.name),tt.set(N,gt))}function at(N,lt){const gt=l.get(lt).get(N);c.get(lt)!==gt&&(n.uniformBlockBinding(lt,gt,N.__bindingPointIndex),c.set(lt,gt))}function Dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Y=null,K={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,L=null,A=null,R=new zt(0,0,0),U=0,E=!1,y=null,C=null,F=null,H=null,w=null,Ht.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:rt,disable:mt,bindFramebuffer:Vt,drawBuffers:Ct,useProgram:oe,setBlending:D,setMaterial:Re,setFlipSided:jt,setCullFace:ie,setLineWidth:Mt,setPolygonOffset:Xt,setScissorTest:wt,activeTexture:Ut,bindTexture:me,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:G,texImage2D:Et,texImage3D:Q,updateUBOMapping:At,uniformBlockBinding:at,texStorage2D:ct,texStorage3D:yt,texSubImage2D:j,texSubImage3D:J,compressedTexSubImage2D:$,compressedTexSubImage3D:St,scissor:ft,viewport:Rt,reset:Dt}}function db(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return f?new OffscreenCanvas(T,x):Ta("canvas")}function _(T,x,G){let j=1;const J=me(T);if((J.width>G||J.height>G)&&(j=G/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(j*J.width),St=Math.floor(j*J.height);h===void 0&&(h=g($,St));const ct=x?g($,St):h;return ct.width=$,ct.height=St,ct.getContext("2d").drawImage(T,0,0,$,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+$+"x"+St+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(T,x,G,j,J=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=x;if(x===n.RED&&(G===n.FLOAT&&($=n.R32F),G===n.HALF_FLOAT&&($=n.R16F),G===n.UNSIGNED_BYTE&&($=n.R8)),x===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.R8UI),G===n.UNSIGNED_SHORT&&($=n.R16UI),G===n.UNSIGNED_INT&&($=n.R32UI),G===n.BYTE&&($=n.R8I),G===n.SHORT&&($=n.R16I),G===n.INT&&($=n.R32I)),x===n.RG&&(G===n.FLOAT&&($=n.RG32F),G===n.HALF_FLOAT&&($=n.RG16F),G===n.UNSIGNED_BYTE&&($=n.RG8)),x===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.RG8UI),G===n.UNSIGNED_SHORT&&($=n.RG16UI),G===n.UNSIGNED_INT&&($=n.RG32UI),G===n.BYTE&&($=n.RG8I),G===n.SHORT&&($=n.RG16I),G===n.INT&&($=n.RG32I)),x===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.RGB8UI),G===n.UNSIGNED_SHORT&&($=n.RGB16UI),G===n.UNSIGNED_INT&&($=n.RGB32UI),G===n.BYTE&&($=n.RGB8I),G===n.SHORT&&($=n.RGB16I),G===n.INT&&($=n.RGB32I)),x===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&($=n.RGBA8UI),G===n.UNSIGNED_SHORT&&($=n.RGBA16UI),G===n.UNSIGNED_INT&&($=n.RGBA32UI),G===n.BYTE&&($=n.RGBA8I),G===n.SHORT&&($=n.RGBA16I),G===n.INT&&($=n.RGBA32I)),x===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),x===n.RGBA){const St=J?ba:$t.getTransfer(j);G===n.FLOAT&&($=n.RGBA32F),G===n.HALF_FLOAT&&($=n.RGBA16F),G===n.UNSIGNED_BYTE&&($=St===Qt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function v(T,x){let G;return T?x===null||x===xi||x===Xr?G=n.DEPTH24_STENCIL8:x===Ln?G=n.DEPTH32F_STENCIL8:x===Wr&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===xi||x===Xr?G=n.DEPTH_COMPONENT24:x===Ln?G=n.DEPTH_COMPONENT32F:x===Wr&&(G=n.DEPTH_COMPONENT16),G}function L(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==cn&&T.minFilter!==fn?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){const x=T.target;x.removeEventListener("dispose",A),U(x),x.isVideoTexture&&u.delete(x)}function R(T){const x=T.target;x.removeEventListener("dispose",R),y(x)}function U(T){const x=i.get(T);if(x.__webglInit===void 0)return;const G=T.source,j=d.get(G);if(j){const J=j[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(T),Object.keys(j).length===0&&d.delete(G)}i.remove(T)}function E(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const G=T.source,j=d.get(G);delete j[x.__cacheKey],a.memory.textures--}function y(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let J=0;J<x.__webglFramebuffer[j].length;J++)n.deleteFramebuffer(x.__webglFramebuffer[j][J]);else n.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)n.deleteFramebuffer(x.__webglFramebuffer[j]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const G=T.textures;for(let j=0,J=G.length;j<J;j++){const $=i.get(G[j]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),a.memory.textures--),i.remove(G[j])}i.remove(T)}let C=0;function F(){C=0}function H(){const T=C;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),C+=1,T}function w(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function O(T,x){const G=i.get(T);if(T.isVideoTexture&&wt(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{dt(G,T,x);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+x)}function P(T,x){const G=i.get(T);if(T.version>0&&G.__version!==T.version){dt(G,T,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+x)}function V(T,x){const G=i.get(T);if(T.version>0&&G.__version!==T.version){dt(G,T,x);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+x)}function k(T,x){const G=i.get(T);if(T.version>0&&G.__version!==T.version){rt(G,T,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+x)}const Y={[bc]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[wc]:n.MIRRORED_REPEAT},K={[cn]:n.NEAREST,[sx]:n.NEAREST_MIPMAP_NEAREST,[fs]:n.NEAREST_MIPMAP_LINEAR,[fn]:n.LINEAR,[eo]:n.LINEAR_MIPMAP_NEAREST,[mi]:n.LINEAR_MIPMAP_LINEAR},st={[lx]:n.NEVER,[mx]:n.ALWAYS,[ux]:n.LESS,[of]:n.LEQUAL,[hx]:n.EQUAL,[px]:n.GEQUAL,[dx]:n.GREATER,[fx]:n.NOTEQUAL};function vt(T,x){if(x.type===Ln&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===fn||x.magFilter===eo||x.magFilter===fs||x.magFilter===mi||x.minFilter===fn||x.minFilter===eo||x.minFilter===fs||x.minFilter===mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Y[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Y[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Y[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,K[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,K[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,st[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===cn||x.minFilter!==fs&&x.minFilter!==mi||x.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ht(T,x){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));const j=x.source;let J=d.get(j);J===void 0&&(J={},d.set(j,J));const $=w(x);if($!==T.__cacheKey){J[$]===void 0&&(J[$]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),J[$].usedTimes++;const St=J[T.__cacheKey];St!==void 0&&(J[T.__cacheKey].usedTimes--,St.usedTimes===0&&E(x)),T.__cacheKey=$,T.__webglTexture=J[$].texture}return G}function q(T,x,G){return Math.floor(Math.floor(T/G)/x)}function et(T,x,G,j){const $=T.updateRanges;if($.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,G,j,x.data);else{$.sort((Q,ft)=>Q.start-ft.start);let St=0;for(let Q=1;Q<$.length;Q++){const ft=$[St],Rt=$[Q],At=ft.start+ft.count,at=q(Rt.start,x.width,4),Dt=q(ft.start,x.width,4);Rt.start<=At+1&&at===Dt&&q(Rt.start+Rt.count-1,x.width,4)===at?ft.count=Math.max(ft.count,Rt.start+Rt.count-ft.start):(++St,$[St]=Rt)}$.length=St+1;const ct=n.getParameter(n.UNPACK_ROW_LENGTH),yt=n.getParameter(n.UNPACK_SKIP_PIXELS),Et=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let Q=0,ft=$.length;Q<ft;Q++){const Rt=$[Q],At=Math.floor(Rt.start/4),at=Math.ceil(Rt.count/4),Dt=At%x.width,N=Math.floor(At/x.width),lt=at,tt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Dt),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),e.texSubImage2D(n.TEXTURE_2D,0,Dt,N,lt,tt,G,j,x.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ct),n.pixelStorei(n.UNPACK_SKIP_PIXELS,yt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Et)}}function dt(T,x,G){let j=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=n.TEXTURE_3D);const J=Ht(T,x),$=x.source;e.bindTexture(j,T.__webglTexture,n.TEXTURE0+G);const St=i.get($);if($.version!==St.__version||J===!0){e.activeTexture(n.TEXTURE0+G);const ct=$t.getPrimaries($t.workingColorSpace),yt=x.colorSpace===qn?null:$t.getPrimaries(x.colorSpace),Et=x.colorSpace===qn||ct===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let Q=_(x.image,!1,r.maxTextureSize);Q=Ut(x,Q);const ft=s.convert(x.format,x.colorSpace),Rt=s.convert(x.type);let At=S(x.internalFormat,ft,Rt,x.colorSpace,x.isVideoTexture);vt(j,x);let at;const Dt=x.mipmaps,N=x.isVideoTexture!==!0,lt=St.__version===void 0||J===!0,tt=$.dataReady,gt=L(x,Q);if(x.isDepthTexture)At=v(x.format===$r,x.type),lt&&(N?e.texStorage2D(n.TEXTURE_2D,1,At,Q.width,Q.height):e.texImage2D(n.TEXTURE_2D,0,At,Q.width,Q.height,0,ft,Rt,null));else if(x.isDataTexture)if(Dt.length>0){N&&lt&&e.texStorage2D(n.TEXTURE_2D,gt,At,Dt[0].width,Dt[0].height);for(let nt=0,Z=Dt.length;nt<Z;nt++)at=Dt[nt],N?tt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,at.width,at.height,ft,Rt,at.data):e.texImage2D(n.TEXTURE_2D,nt,At,at.width,at.height,0,ft,Rt,at.data);x.generateMipmaps=!1}else N?(lt&&e.texStorage2D(n.TEXTURE_2D,gt,At,Q.width,Q.height),tt&&et(x,Q,ft,Rt)):e.texImage2D(n.TEXTURE_2D,0,At,Q.width,Q.height,0,ft,Rt,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,At,Dt[0].width,Dt[0].height,Q.depth);for(let nt=0,Z=Dt.length;nt<Z;nt++)if(at=Dt[nt],x.format!==an)if(ft!==null)if(N){if(tt)if(x.layerUpdates.size>0){const _t=_h(at.width,at.height,x.format,x.type);for(const Lt of x.layerUpdates){const se=at.data.subarray(Lt*_t/at.data.BYTES_PER_ELEMENT,(Lt+1)*_t/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,Lt,at.width,at.height,1,ft,se)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,at.width,at.height,Q.depth,ft,at.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,nt,At,at.width,at.height,Q.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?tt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,at.width,at.height,Q.depth,ft,Rt,at.data):e.texImage3D(n.TEXTURE_2D_ARRAY,nt,At,at.width,at.height,Q.depth,0,ft,Rt,at.data)}else{N&&lt&&e.texStorage2D(n.TEXTURE_2D,gt,At,Dt[0].width,Dt[0].height);for(let nt=0,Z=Dt.length;nt<Z;nt++)at=Dt[nt],x.format!==an?ft!==null?N?tt&&e.compressedTexSubImage2D(n.TEXTURE_2D,nt,0,0,at.width,at.height,ft,at.data):e.compressedTexImage2D(n.TEXTURE_2D,nt,At,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?tt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,at.width,at.height,ft,Rt,at.data):e.texImage2D(n.TEXTURE_2D,nt,At,at.width,at.height,0,ft,Rt,at.data)}else if(x.isDataArrayTexture)if(N){if(lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,At,Q.width,Q.height,Q.depth),tt)if(x.layerUpdates.size>0){const nt=_h(Q.width,Q.height,x.format,x.type);for(const Z of x.layerUpdates){const _t=Q.data.subarray(Z*nt/Q.data.BYTES_PER_ELEMENT,(Z+1)*nt/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,ft,Rt,_t)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ft,Rt,Q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,At,Q.width,Q.height,Q.depth,0,ft,Rt,Q.data);else if(x.isData3DTexture)N?(lt&&e.texStorage3D(n.TEXTURE_3D,gt,At,Q.width,Q.height,Q.depth),tt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ft,Rt,Q.data)):e.texImage3D(n.TEXTURE_3D,0,At,Q.width,Q.height,Q.depth,0,ft,Rt,Q.data);else if(x.isFramebufferTexture){if(lt)if(N)e.texStorage2D(n.TEXTURE_2D,gt,At,Q.width,Q.height);else{let nt=Q.width,Z=Q.height;for(let _t=0;_t<gt;_t++)e.texImage2D(n.TEXTURE_2D,_t,At,nt,Z,0,ft,Rt,null),nt>>=1,Z>>=1}}else if(Dt.length>0){if(N&&lt){const nt=me(Dt[0]);e.texStorage2D(n.TEXTURE_2D,gt,At,nt.width,nt.height)}for(let nt=0,Z=Dt.length;nt<Z;nt++)at=Dt[nt],N?tt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,ft,Rt,at):e.texImage2D(n.TEXTURE_2D,nt,At,ft,Rt,at);x.generateMipmaps=!1}else if(N){if(lt){const nt=me(Q);e.texStorage2D(n.TEXTURE_2D,gt,At,nt.width,nt.height)}tt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,Rt,Q)}else e.texImage2D(n.TEXTURE_2D,0,At,ft,Rt,Q);m(x)&&p(j),St.__version=$.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function rt(T,x,G){if(x.image.length!==6)return;const j=Ht(T,x),J=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+G);const $=i.get(J);if(J.version!==$.__version||j===!0){e.activeTexture(n.TEXTURE0+G);const St=$t.getPrimaries($t.workingColorSpace),ct=x.colorSpace===qn?null:$t.getPrimaries(x.colorSpace),yt=x.colorSpace===qn||St===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const Et=x.isCompressedTexture||x.image[0].isCompressedTexture,Q=x.image[0]&&x.image[0].isDataTexture,ft=[];for(let Z=0;Z<6;Z++)!Et&&!Q?ft[Z]=_(x.image[Z],!0,r.maxCubemapSize):ft[Z]=Q?x.image[Z].image:x.image[Z],ft[Z]=Ut(x,ft[Z]);const Rt=ft[0],At=s.convert(x.format,x.colorSpace),at=s.convert(x.type),Dt=S(x.internalFormat,At,at,x.colorSpace),N=x.isVideoTexture!==!0,lt=$.__version===void 0||j===!0,tt=J.dataReady;let gt=L(x,Rt);vt(n.TEXTURE_CUBE_MAP,x);let nt;if(Et){N&&lt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Dt,Rt.width,Rt.height);for(let Z=0;Z<6;Z++){nt=ft[Z].mipmaps;for(let _t=0;_t<nt.length;_t++){const Lt=nt[_t];x.format!==an?At!==null?N?tt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,0,0,Lt.width,Lt.height,At,Lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,Dt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,0,0,Lt.width,Lt.height,At,at,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,Dt,Lt.width,Lt.height,0,At,at,Lt.data)}}}else{if(nt=x.mipmaps,N&&lt){nt.length>0&&gt++;const Z=me(ft[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Dt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){N?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ft[Z].width,ft[Z].height,At,at,ft[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Dt,ft[Z].width,ft[Z].height,0,At,at,ft[Z].data);for(let _t=0;_t<nt.length;_t++){const se=nt[_t].image[Z].image;N?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,0,0,se.width,se.height,At,at,se.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,Dt,se.width,se.height,0,At,at,se.data)}}else{N?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,At,at,ft[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Dt,At,at,ft[Z]);for(let _t=0;_t<nt.length;_t++){const Lt=nt[_t];N?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,0,0,At,at,Lt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,Dt,At,at,Lt.image[Z])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),$.__version=J.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function mt(T,x,G,j,J,$){const St=s.convert(G.format,G.colorSpace),ct=s.convert(G.type),yt=S(G.internalFormat,St,ct,G.colorSpace),Et=i.get(x),Q=i.get(G);if(Q.__renderTarget=x,!Et.__hasExternalTextures){const ft=Math.max(1,x.width>>$),Rt=Math.max(1,x.height>>$);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,$,yt,ft,Rt,x.depth,0,St,ct,null):e.texImage2D(J,$,yt,ft,Rt,0,St,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Xt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,J,Q.__webglTexture,0,Mt(x)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,J,Q.__webglTexture,$),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Vt(T,x,G){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const j=x.depthTexture,J=j&&j.isDepthTexture?j.type:null,$=v(x.stencilBuffer,J),St=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=Mt(x);Xt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,$,x.width,x.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,$,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,$,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,St,n.RENDERBUFFER,T)}else{const j=x.textures;for(let J=0;J<j.length;J++){const $=j[J],St=s.convert($.format,$.colorSpace),ct=s.convert($.type),yt=S($.internalFormat,St,ct,$.colorSpace),Et=Mt(x);G&&Xt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,yt,x.width,x.height):Xt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Et,yt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,yt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ct(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(x.depthTexture);j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),O(x.depthTexture,0);const J=j.__webglTexture,$=Mt(x);if(x.depthTexture.format===qr)Xt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(x.depthTexture.format===$r)Xt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function oe(T){const x=i.get(T),G=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=j}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const j=T.texture.mipmaps;j&&j.length>0?Ct(x.__webglFramebuffer[0],T):Ct(x.__webglFramebuffer,T)}else if(G){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=n.createRenderbuffer(),Vt(x.__webglDepthbuffer[j],T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,$)}}else{const j=T.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Vt(x.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,$)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(T,x,G){const j=i.get(T);x!==void 0&&mt(j.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&oe(T)}function Yt(T){const x=T.texture,G=i.get(T),j=i.get(x);T.addEventListener("dispose",R);const J=T.textures,$=T.isWebGLCubeRenderTarget===!0,St=J.length>1;if(St||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=x.version,a.memory.textures++),$){G.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer[ct]=[];for(let yt=0;yt<x.mipmaps.length;yt++)G.__webglFramebuffer[ct][yt]=n.createFramebuffer()}else G.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer=[];for(let ct=0;ct<x.mipmaps.length;ct++)G.__webglFramebuffer[ct]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(St)for(let ct=0,yt=J.length;ct<yt;ct++){const Et=i.get(J[ct]);Et.__webglTexture===void 0&&(Et.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Xt(T)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ct=0;ct<J.length;ct++){const yt=J[ct];G.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[ct]);const Et=s.convert(yt.format,yt.colorSpace),Q=s.convert(yt.type),ft=S(yt.internalFormat,Et,Q,yt.colorSpace,T.isXRRenderTarget===!0),Rt=Mt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,ft,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,G.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),Vt(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){e.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),vt(n.TEXTURE_CUBE_MAP,x);for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0)for(let yt=0;yt<x.mipmaps.length;yt++)mt(G.__webglFramebuffer[ct][yt],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,yt);else mt(G.__webglFramebuffer[ct],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(x)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ct=0,yt=J.length;ct<yt;ct++){const Et=J[ct],Q=i.get(Et);e.bindTexture(n.TEXTURE_2D,Q.__webglTexture),vt(n.TEXTURE_2D,Et),mt(G.__webglFramebuffer,T,Et,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),m(Et)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,j.__webglTexture),vt(ct,x),x.mipmaps&&x.mipmaps.length>0)for(let yt=0;yt<x.mipmaps.length;yt++)mt(G.__webglFramebuffer[yt],T,x,n.COLOR_ATTACHMENT0,ct,yt);else mt(G.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,ct,0);m(x)&&p(ct),e.unbindTexture()}T.depthBuffer&&oe(T)}function D(T){const x=T.textures;for(let G=0,j=x.length;G<j;G++){const J=x[G];if(m(J)){const $=b(T),St=i.get(J).__webglTexture;e.bindTexture($,St),p($),e.unbindTexture()}}}const Re=[],jt=[];function ie(T){if(T.samples>0){if(Xt(T)===!1){const x=T.textures,G=T.width,j=T.height;let J=n.COLOR_BUFFER_BIT;const $=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,St=i.get(T),ct=x.length>1;if(ct)for(let Et=0;Et<x.length;Et++)e.bindFramebuffer(n.FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,St.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);const yt=T.texture.mipmaps;yt&&yt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Et=0;Et<x.length;Et++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,St.__webglColorRenderbuffer[Et]);const Q=i.get(x[Et]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Q,0)}n.blitFramebuffer(0,0,G,j,0,0,G,j,J,n.NEAREST),c===!0&&(Re.length=0,jt.length=0,Re.push(n.COLOR_ATTACHMENT0+Et),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Re.push($),jt.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,jt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Re))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let Et=0;Et<x.length;Et++){e.bindFramebuffer(n.FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,St.__webglColorRenderbuffer[Et]);const Q=i.get(x[Et]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,St.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,Q,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Mt(T){return Math.min(r.maxSamples,T.samples)}function Xt(T){const x=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function wt(T){const x=a.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function Ut(T,x){const G=T.colorSpace,j=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==ar&&G!==qn&&($t.getTransfer(G)===Qt?(j!==an||J!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),x}function me(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=O,this.setTexture2DArray=P,this.setTexture3D=V,this.setTextureCube=k,this.rebindTextures=ce,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Xt}function fb(n,t){function e(i,r=qn){let s;const a=$t.getTransfer(r);if(i===_n)return n.UNSIGNED_BYTE;if(i===yl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ml)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Zd)return n.BYTE;if(i===Jd)return n.SHORT;if(i===Wr)return n.UNSIGNED_SHORT;if(i===vl)return n.INT;if(i===xi)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===Qr)return n.HALF_FLOAT;if(i===tf)return n.ALPHA;if(i===ef)return n.RGB;if(i===an)return n.RGBA;if(i===qr)return n.DEPTH_COMPONENT;if(i===$r)return n.DEPTH_STENCIL;if(i===nf)return n.RED;if(i===Sl)return n.RED_INTEGER;if(i===rf)return n.RG;if(i===El)return n.RG_INTEGER;if(i===bl)return n.RGBA_INTEGER;if(i===aa||i===oa||i===ca||i===la)if(a===Qt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===aa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===oa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===la)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===aa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===oa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ca)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===la)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Tc||i===Ac||i===Rc||i===Cc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Tc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ac)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pc||i===Ic||i===Dc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Pc||i===Ic)return a===Qt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Dc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Lc||i===Nc||i===Uc||i===Fc||i===Oc||i===Bc||i===kc||i===zc||i===Hc||i===Vc||i===Gc||i===Wc||i===Xc||i===qc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Lc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Nc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Uc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Oc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Hc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qc)return a===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ua||i===$c||i===Yc)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ua)return a===Qt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$c)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Yc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sf||i===jc||i===Kc||i===Zc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ua)return s.COMPRESSED_RED_RGTC1_EXT;if(i===jc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Kc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Xr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const pb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class gb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Oe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Jn({vertexShader:pb,fragmentShader:mb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new ka(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _b extends Si{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const _=new gb,m=e.getContextAttributes();let p=null,b=null;const S=[],v=[],L=new ht;let A=null;const R=new Ve;R.viewport=new ee;const U=new Ve;U.viewport=new ee;const E=[R,U],y=new Uv;let C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let et=S[q];return et===void 0&&(et=new bo,S[q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(q){let et=S[q];return et===void 0&&(et=new bo,S[q]=et),et.getGripSpace()},this.getHand=function(q){let et=S[q];return et===void 0&&(et=new bo,S[q]=et),et.getHandSpace()};function H(q){const et=v.indexOf(q.inputSource);if(et===-1)return;const dt=S[et];dt!==void 0&&(dt.update(q.inputSource,q.frame,l||a),dt.dispatchEvent({type:q.type,data:q.inputSource}))}function w(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",w),r.removeEventListener("inputsourceschange",O);for(let q=0;q<S.length;q++){const et=v[q];et!==null&&(v[q]=null,S[q].disconnect(et))}C=null,F=null,_.reset(),t.setRenderTarget(p),f=null,d=null,h=null,r=null,b=null,Ht.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",w),r.addEventListener("inputsourceschange",O),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,rt=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=m.stencil?$r:qr,rt=m.stencil?Xr:xi);const Vt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:s};h=new XRWebGLBinding(r,e),d=h.createProjectionLayer(Vt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new yi(d.textureWidth,d.textureHeight,{format:an,type:_n,depthTexture:new _f(d.textureWidth,d.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const dt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,dt),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new yi(f.framebufferWidth,f.framebufferHeight,{format:an,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ht.setContext(r),Ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function O(q){for(let et=0;et<q.removed.length;et++){const dt=q.removed[et],rt=v.indexOf(dt);rt>=0&&(v[rt]=null,S[rt].disconnect(dt))}for(let et=0;et<q.added.length;et++){const dt=q.added[et];let rt=v.indexOf(dt);if(rt===-1){for(let Vt=0;Vt<S.length;Vt++)if(Vt>=v.length){v.push(dt),rt=Vt;break}else if(v[Vt]===null){v[Vt]=dt,rt=Vt;break}if(rt===-1)break}const mt=S[rt];mt&&mt.connect(dt)}}const P=new I,V=new I;function k(q,et,dt){P.setFromMatrixPosition(et.matrixWorld),V.setFromMatrixPosition(dt.matrixWorld);const rt=P.distanceTo(V),mt=et.projectionMatrix.elements,Vt=dt.projectionMatrix.elements,Ct=mt[14]/(mt[10]-1),oe=mt[14]/(mt[10]+1),ce=(mt[9]+1)/mt[5],Yt=(mt[9]-1)/mt[5],D=(mt[8]-1)/mt[0],Re=(Vt[8]+1)/Vt[0],jt=Ct*D,ie=Ct*Re,Mt=rt/(-D+Re),Xt=Mt*-D;if(et.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Xt),q.translateZ(Mt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),mt[10]===-1)q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const wt=Ct+Mt,Ut=oe+Mt,me=jt-Xt,T=ie+(rt-Xt),x=ce*oe/Ut*wt,G=Yt*oe/Ut*wt;q.projectionMatrix.makePerspective(me,T,x,G,wt,Ut),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Y(q,et){et===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(et.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let et=q.near,dt=q.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(dt=_.depthFar)),y.near=U.near=R.near=et,y.far=U.far=R.far=dt,(C!==y.near||F!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,F=y.far),R.layers.mask=q.layers.mask|2,U.layers.mask=q.layers.mask|4,y.layers.mask=R.layers.mask|U.layers.mask;const rt=q.parent,mt=y.cameras;Y(y,rt);for(let Vt=0;Vt<mt.length;Vt++)Y(mt[Vt],rt);mt.length===2?k(y,R,U):y.projectionMatrix.copy(R.projectionMatrix),K(q,y,rt)};function K(q,et,dt){dt===null?q.matrix.copy(et.matrixWorld):(q.matrix.copy(dt.matrixWorld),q.matrix.invert(),q.matrix.multiply(et.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Jc*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let st=null;function vt(q,et){if(u=et.getViewerPose(l||a),g=et,u!==null){const dt=u.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let rt=!1;dt.length!==y.cameras.length&&(y.cameras.length=0,rt=!0);for(let Ct=0;Ct<dt.length;Ct++){const oe=dt[Ct];let ce=null;if(f!==null)ce=f.getViewport(oe);else{const D=h.getViewSubImage(d,oe);ce=D.viewport,Ct===0&&(t.setRenderTargetTextures(b,D.colorTexture,D.depthStencilTexture),t.setRenderTarget(b))}let Yt=E[Ct];Yt===void 0&&(Yt=new Ve,Yt.layers.enable(Ct),Yt.viewport=new ee,E[Ct]=Yt),Yt.matrix.fromArray(oe.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(oe.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(ce.x,ce.y,ce.width,ce.height),Ct===0&&(y.matrix.copy(Yt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),rt===!0&&y.cameras.push(Yt)}const mt=r.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const Ct=h.getDepthInformation(dt[0]);Ct&&Ct.isValid&&Ct.texture&&_.init(t,Ct,r.renderState)}}for(let dt=0;dt<S.length;dt++){const rt=v[dt],mt=S[dt];rt!==null&&mt!==void 0&&mt.update(rt,et,l||a)}st&&st(q,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}const Ht=new Cf;Ht.setAnimationLoop(vt),this.setAnimationLoop=function(q){st=q},this.dispose=function(){}}}const ci=new xn,xb=new re;function vb(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ff(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,b,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===De&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===De&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,ci.copy(v),ci.x*=-1,ci.y*=-1,ci.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),m.envMapRotation.value.setFromMatrix4(xb.makeRotationFromEuler(ci)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===De&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function yb(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,S){const v=S.program;i.uniformBlockBinding(b,v)}function l(b,S){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));const L=S.program;i.updateUBOMapping(b,L);const A=t.render.frame;s[b.id]!==A&&(d(b),s[b.id]=A)}function u(b){const S=h();b.__bindingPointIndex=S;const v=n.createBuffer(),L=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,v),v}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=r[b.id],v=b.uniforms,L=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let A=0,R=v.length;A<R;A++){const U=Array.isArray(v[A])?v[A]:[v[A]];for(let E=0,y=U.length;E<y;E++){const C=U[E];if(f(C,A,E,L)===!0){const F=C.__offset,H=Array.isArray(C.value)?C.value:[C.value];let w=0;for(let O=0;O<H.length;O++){const P=H[O],V=_(P);typeof P=="number"||typeof P=="boolean"?(C.__data[0]=P,n.bufferSubData(n.UNIFORM_BUFFER,F+w,C.__data)):P.isMatrix3?(C.__data[0]=P.elements[0],C.__data[1]=P.elements[1],C.__data[2]=P.elements[2],C.__data[3]=0,C.__data[4]=P.elements[3],C.__data[5]=P.elements[4],C.__data[6]=P.elements[5],C.__data[7]=0,C.__data[8]=P.elements[6],C.__data[9]=P.elements[7],C.__data[10]=P.elements[8],C.__data[11]=0):(P.toArray(C.__data,w),w+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(b,S,v,L){const A=b.value,R=S+"_"+v;if(L[R]===void 0)return typeof A=="number"||typeof A=="boolean"?L[R]=A:L[R]=A.clone(),!0;{const U=L[R];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return L[R]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function g(b){const S=b.uniforms;let v=0;const L=16;for(let R=0,U=S.length;R<U;R++){const E=Array.isArray(S[R])?S[R]:[S[R]];for(let y=0,C=E.length;y<C;y++){const F=E[y],H=Array.isArray(F.value)?F.value:[F.value];for(let w=0,O=H.length;w<O;w++){const P=H[w],V=_(P),k=v%L,Y=k%V.boundary,K=k+Y;v+=Y,K!==0&&L-K<V.storage&&(v+=L-K),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=V.storage}}}const A=v%L;return A>0&&(v+=L-A),b.__size=v,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:c,update:l,dispose:p}}class Mb{constructor(t={}){const{canvas:e=xx(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let L=!1;this._outputColorSpace=je;let A=0,R=0,U=null,E=-1,y=null;const C=new ee,F=new ee;let H=null;const w=new zt(0);let O=0,P=e.width,V=e.height,k=1,Y=null,K=null;const st=new ee(0,0,P,V),vt=new ee(0,0,P,V);let Ht=!1;const q=new Rl;let et=!1,dt=!1;const rt=new re,mt=new re,Vt=new I,Ct=new ee,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function Yt(){return U===null?k:1}let D=i;function Re(M,B){return e.getContext(M,B)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xl}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",nt,!1),e.addEventListener("webglcontextcreationerror",Z,!1),D===null){const B="webgl2";if(D=Re(B,M),D===null)throw Re(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let jt,ie,Mt,Xt,wt,Ut,me,T,x,G,j,J,$,St,ct,yt,Et,Q,ft,Rt,At,at,Dt,N;function lt(){jt=new IS(D),jt.init(),at=new fb(D,jt),ie=new bS(D,jt,t,at),Mt=new hb(D,jt),ie.reverseDepthBuffer&&d&&Mt.buffers.depth.setReversed(!0),Xt=new NS(D),wt=new JE,Ut=new db(D,jt,Mt,wt,ie,at,Xt),me=new TS(v),T=new PS(v),x=new zv(D),Dt=new SS(D,x),G=new DS(D,x,Xt,Dt),j=new FS(D,G,x,Xt),ft=new US(D,ie,Ut),yt=new wS(wt),J=new ZE(v,me,T,jt,ie,Dt,yt),$=new vb(v,wt),St=new tb,ct=new ab(jt),Q=new MS(v,me,T,Mt,j,f,c),Et=new lb(v,j,ie),N=new yb(D,Xt,ie,Mt),Rt=new ES(D,jt,Xt),At=new LS(D,jt,Xt),Xt.programs=J.programs,v.capabilities=ie,v.extensions=jt,v.properties=wt,v.renderLists=St,v.shadowMap=Et,v.state=Mt,v.info=Xt}lt();const tt=new _b(v,D);this.xr=tt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=jt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=jt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(M){M!==void 0&&(k=M,this.setSize(P,V,!1))},this.getSize=function(M){return M.set(P,V)},this.setSize=function(M,B,W=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=M,V=B,e.width=Math.floor(M*k),e.height=Math.floor(B*k),W===!0&&(e.style.width=M+"px",e.style.height=B+"px"),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(P*k,V*k).floor()},this.setDrawingBufferSize=function(M,B,W){P=M,V=B,k=W,e.width=Math.floor(M*W),e.height=Math.floor(B*W),this.setViewport(0,0,M,B)},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(st)},this.setViewport=function(M,B,W,X){M.isVector4?st.set(M.x,M.y,M.z,M.w):st.set(M,B,W,X),Mt.viewport(C.copy(st).multiplyScalar(k).round())},this.getScissor=function(M){return M.copy(vt)},this.setScissor=function(M,B,W,X){M.isVector4?vt.set(M.x,M.y,M.z,M.w):vt.set(M,B,W,X),Mt.scissor(F.copy(vt).multiplyScalar(k).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(M){Mt.setScissorTest(Ht=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){K=M},this.getClearColor=function(M){return M.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor(...arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,W=!0){let X=0;if(M){let z=!1;if(U!==null){const it=U.texture.format;z=it===bl||it===El||it===Sl}if(z){const it=U.texture.type,ut=it===_n||it===xi||it===Wr||it===Xr||it===yl||it===Ml,xt=Q.getClearColor(),pt=Q.getClearAlpha(),Pt=xt.r,It=xt.g,bt=xt.b;ut?(g[0]=Pt,g[1]=It,g[2]=bt,g[3]=pt,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Pt,_[1]=It,_[2]=bt,_[3]=pt,D.clearBufferiv(D.COLOR,0,_))}else X|=D.COLOR_BUFFER_BIT}B&&(X|=D.DEPTH_BUFFER_BIT),W&&(X|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",nt,!1),e.removeEventListener("webglcontextcreationerror",Z,!1),Q.dispose(),St.dispose(),ct.dispose(),wt.dispose(),me.dispose(),T.dispose(),j.dispose(),Dt.dispose(),N.dispose(),J.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",ql),tt.removeEventListener("sessionend",$l),ti.stop()};function gt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const M=Xt.autoReset,B=Et.enabled,W=Et.autoUpdate,X=Et.needsUpdate,z=Et.type;lt(),Xt.autoReset=M,Et.enabled=B,Et.autoUpdate=W,Et.needsUpdate=X,Et.type=z}function Z(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function _t(M){const B=M.target;B.removeEventListener("dispose",_t),Lt(B)}function Lt(M){se(M),wt.remove(M)}function se(M){const B=wt.get(M).programs;B!==void 0&&(B.forEach(function(W){J.releaseProgram(W)}),M.isShaderMaterial&&J.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,W,X,z,it){B===null&&(B=oe);const ut=z.isMesh&&z.matrixWorld.determinant()<0,xt=ep(M,B,W,X,z);Mt.setMaterial(X,ut);let pt=W.index,Pt=1;if(X.wireframe===!0){if(pt=G.getWireframeAttribute(W),pt===void 0)return;Pt=2}const It=W.drawRange,bt=W.attributes.position;let Gt=It.start*Pt,Jt=(It.start+It.count)*Pt;it!==null&&(Gt=Math.max(Gt,it.start*Pt),Jt=Math.min(Jt,(it.start+it.count)*Pt)),pt!==null?(Gt=Math.max(Gt,0),Jt=Math.min(Jt,pt.count)):bt!=null&&(Gt=Math.max(Gt,0),Jt=Math.min(Jt,bt.count));const le=Jt-Gt;if(le<0||le===1/0)return;Dt.setup(z,X,xt,W,pt);let he,qt=Rt;if(pt!==null&&(he=x.get(pt),qt=At,qt.setIndex(he)),z.isMesh)X.wireframe===!0?(Mt.setLineWidth(X.wireframeLinewidth*Yt()),qt.setMode(D.LINES)):qt.setMode(D.TRIANGLES);else if(z.isLine){let Tt=X.linewidth;Tt===void 0&&(Tt=1),Mt.setLineWidth(Tt*Yt()),z.isLineSegments?qt.setMode(D.LINES):z.isLineLoop?qt.setMode(D.LINE_LOOP):qt.setMode(D.LINE_STRIP)}else z.isPoints?qt.setMode(D.POINTS):z.isSprite&&qt.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Ki("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),qt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))qt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Tt=z._multiDrawStarts,ye=z._multiDrawCounts,Kt=z._multiDrawCount,Je=pt?x.get(pt).bytesPerElement:1,Ei=wt.get(X).currentProgram.getUniforms();for(let Be=0;Be<Kt;Be++)Ei.setValue(D,"_gl_DrawID",Be),qt.render(Tt[Be]/Je,ye[Be])}else if(z.isInstancedMesh)qt.renderInstances(Gt,le,z.count);else if(W.isInstancedBufferGeometry){const Tt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ye=Math.min(W.instanceCount,Tt);qt.renderInstances(Gt,le,ye)}else qt.render(Gt,le)};function Zt(M,B,W){M.transparent===!0&&M.side===Ke&&M.forceSinglePass===!1?(M.side=De,M.needsUpdate=!0,os(M,B,W),M.side=Zn,M.needsUpdate=!0,os(M,B,W),M.side=Ke):os(M,B,W)}this.compile=function(M,B,W=null){W===null&&(W=M),p=ct.get(W),p.init(B),S.push(p),W.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),M!==W&&M.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const X=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const it=z.material;if(it)if(Array.isArray(it))for(let ut=0;ut<it.length;ut++){const xt=it[ut];Zt(xt,W,z),X.add(xt)}else Zt(it,W,z),X.add(it)}),p=S.pop(),X},this.compileAsync=function(M,B,W=null){const X=this.compile(M,B,W);return new Promise(z=>{function it(){if(X.forEach(function(ut){wt.get(ut).currentProgram.isReady()&&X.delete(ut)}),X.size===0){z(M);return}setTimeout(it,10)}jt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ze=null;function Mn(M){Ze&&Ze(M)}function ql(){ti.stop()}function $l(){ti.start()}const ti=new Cf;ti.setAnimationLoop(Mn),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(M){Ze=M,tt.setAnimationLoop(M),M===null?ti.stop():ti.start()},tt.addEventListener("sessionstart",ql),tt.addEventListener("sessionend",$l),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(B),B=tt.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,B,U),p=ct.get(M,S.length),p.init(B),S.push(p),mt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),q.setFromProjectionMatrix(mt),dt=this.localClippingEnabled,et=yt.init(this.clippingPlanes,dt),m=St.get(M,b.length),m.init(),b.push(m),tt.enabled===!0&&tt.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&Ya(it,B,-1/0,v.sortObjects)}Ya(M,B,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Y,K),ce=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,ce&&Q.addToRenderList(m,M),this.info.render.frame++,et===!0&&yt.beginShadows();const W=p.state.shadowsArray;Et.render(W,M,B),et===!0&&yt.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,z=m.transmissive;if(p.setupLights(),B.isArrayCamera){const it=B.cameras;if(z.length>0)for(let ut=0,xt=it.length;ut<xt;ut++){const pt=it[ut];jl(X,z,M,pt)}ce&&Q.render(M);for(let ut=0,xt=it.length;ut<xt;ut++){const pt=it[ut];Yl(m,M,pt,pt.viewport)}}else z.length>0&&jl(X,z,M,B),ce&&Q.render(M),Yl(m,M,B);U!==null&&R===0&&(Ut.updateMultisampleRenderTarget(U),Ut.updateRenderTargetMipmap(U)),M.isScene===!0&&M.onAfterRender(v,M,B),Dt.resetDefaultState(),E=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],et===!0&&yt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Ya(M,B,W,X){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||q.intersectsSprite(M)){X&&Ct.setFromMatrixPosition(M.matrixWorld).applyMatrix4(mt);const ut=j.update(M),xt=M.material;xt.visible&&m.push(M,ut,xt,W,Ct.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||q.intersectsObject(M))){const ut=j.update(M),xt=M.material;if(X&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ct.copy(M.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Ct.copy(ut.boundingSphere.center)),Ct.applyMatrix4(M.matrixWorld).applyMatrix4(mt)),Array.isArray(xt)){const pt=ut.groups;for(let Pt=0,It=pt.length;Pt<It;Pt++){const bt=pt[Pt],Gt=xt[bt.materialIndex];Gt&&Gt.visible&&m.push(M,ut,Gt,W,Ct.z,bt)}}else xt.visible&&m.push(M,ut,xt,W,Ct.z,null)}}const it=M.children;for(let ut=0,xt=it.length;ut<xt;ut++)Ya(it[ut],B,W,X)}function Yl(M,B,W,X){const z=M.opaque,it=M.transmissive,ut=M.transparent;p.setupLightsView(W),et===!0&&yt.setGlobalState(v.clippingPlanes,W),X&&Mt.viewport(C.copy(X)),z.length>0&&as(z,B,W),it.length>0&&as(it,B,W),ut.length>0&&as(ut,B,W),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function jl(M,B,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new yi(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?Qr:_n,minFilter:mi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const it=p.state.transmissionRenderTarget[X.id],ut=X.viewport||C;it.setSize(ut.z*v.transmissionResolutionScale,ut.w*v.transmissionResolutionScale);const xt=v.getRenderTarget();v.setRenderTarget(it),v.getClearColor(w),O=v.getClearAlpha(),O<1&&v.setClearColor(16777215,.5),v.clear(),ce&&Q.render(W);const pt=v.toneMapping;v.toneMapping=jn;const Pt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),et===!0&&yt.setGlobalState(v.clippingPlanes,X),as(M,W,X),Ut.updateMultisampleRenderTarget(it),Ut.updateRenderTargetMipmap(it),jt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let bt=0,Gt=B.length;bt<Gt;bt++){const Jt=B[bt],le=Jt.object,he=Jt.geometry,qt=Jt.material,Tt=Jt.group;if(qt.side===Ke&&le.layers.test(X.layers)){const ye=qt.side;qt.side=De,qt.needsUpdate=!0,Kl(le,W,X,he,qt,Tt),qt.side=ye,qt.needsUpdate=!0,It=!0}}It===!0&&(Ut.updateMultisampleRenderTarget(it),Ut.updateRenderTargetMipmap(it))}v.setRenderTarget(xt),v.setClearColor(w,O),Pt!==void 0&&(X.viewport=Pt),v.toneMapping=pt}function as(M,B,W){const X=B.isScene===!0?B.overrideMaterial:null;for(let z=0,it=M.length;z<it;z++){const ut=M[z],xt=ut.object,pt=ut.geometry,Pt=ut.group;let It=ut.material;It.allowOverride===!0&&X!==null&&(It=X),xt.layers.test(W.layers)&&Kl(xt,B,W,pt,It,Pt)}}function Kl(M,B,W,X,z,it){M.onBeforeRender(v,B,W,X,z,it),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(v,B,W,X,M,it),z.transparent===!0&&z.side===Ke&&z.forceSinglePass===!1?(z.side=De,z.needsUpdate=!0,v.renderBufferDirect(W,B,X,z,M,it),z.side=Zn,z.needsUpdate=!0,v.renderBufferDirect(W,B,X,z,M,it),z.side=Ke):v.renderBufferDirect(W,B,X,z,M,it),M.onAfterRender(v,B,W,X,z,it)}function os(M,B,W){B.isScene!==!0&&(B=oe);const X=wt.get(M),z=p.state.lights,it=p.state.shadowsArray,ut=z.state.version,xt=J.getParameters(M,z.state,it,B,W),pt=J.getProgramCacheKey(xt);let Pt=X.programs;X.environment=M.isMeshStandardMaterial?B.environment:null,X.fog=B.fog,X.envMap=(M.isMeshStandardMaterial?T:me).get(M.envMap||X.environment),X.envMapRotation=X.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Pt===void 0&&(M.addEventListener("dispose",_t),Pt=new Map,X.programs=Pt);let It=Pt.get(pt);if(It!==void 0){if(X.currentProgram===It&&X.lightsStateVersion===ut)return Jl(M,xt),It}else xt.uniforms=J.getUniforms(M),M.onBeforeCompile(xt,v),It=J.acquireProgram(xt,pt),Pt.set(pt,It),X.uniforms=xt.uniforms;const bt=X.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(bt.clippingPlanes=yt.uniform),Jl(M,xt),X.needsLights=ip(M),X.lightsStateVersion=ut,X.needsLights&&(bt.ambientLightColor.value=z.state.ambient,bt.lightProbe.value=z.state.probe,bt.directionalLights.value=z.state.directional,bt.directionalLightShadows.value=z.state.directionalShadow,bt.spotLights.value=z.state.spot,bt.spotLightShadows.value=z.state.spotShadow,bt.rectAreaLights.value=z.state.rectArea,bt.ltc_1.value=z.state.rectAreaLTC1,bt.ltc_2.value=z.state.rectAreaLTC2,bt.pointLights.value=z.state.point,bt.pointLightShadows.value=z.state.pointShadow,bt.hemisphereLights.value=z.state.hemi,bt.directionalShadowMap.value=z.state.directionalShadowMap,bt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,bt.spotShadowMap.value=z.state.spotShadowMap,bt.spotLightMatrix.value=z.state.spotLightMatrix,bt.spotLightMap.value=z.state.spotLightMap,bt.pointShadowMap.value=z.state.pointShadowMap,bt.pointShadowMatrix.value=z.state.pointShadowMatrix),X.currentProgram=It,X.uniformsList=null,It}function Zl(M){if(M.uniformsList===null){const B=M.currentProgram.getUniforms();M.uniformsList=da.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function Jl(M,B){const W=wt.get(M);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.batchingColor=B.batchingColor,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.instancingMorph=B.instancingMorph,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function ep(M,B,W,X,z){B.isScene!==!0&&(B=oe),Ut.resetTextureUnits();const it=B.fog,ut=X.isMeshStandardMaterial?B.environment:null,xt=U===null?v.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ar,pt=(X.isMeshStandardMaterial?T:me).get(X.envMap||ut),Pt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,It=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),bt=!!W.morphAttributes.position,Gt=!!W.morphAttributes.normal,Jt=!!W.morphAttributes.color;let le=jn;X.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(le=v.toneMapping);const he=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,qt=he!==void 0?he.length:0,Tt=wt.get(X),ye=p.state.lights;if(et===!0&&(dt===!0||M!==y)){const Ce=M===y&&X.id===E;yt.setState(X,M,Ce)}let Kt=!1;X.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==ye.state.version||Tt.outputColorSpace!==xt||z.isBatchedMesh&&Tt.batching===!1||!z.isBatchedMesh&&Tt.batching===!0||z.isBatchedMesh&&Tt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Tt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Tt.instancing===!1||!z.isInstancedMesh&&Tt.instancing===!0||z.isSkinnedMesh&&Tt.skinning===!1||!z.isSkinnedMesh&&Tt.skinning===!0||z.isInstancedMesh&&Tt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Tt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Tt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Tt.instancingMorph===!1&&z.morphTexture!==null||Tt.envMap!==pt||X.fog===!0&&Tt.fog!==it||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==yt.numPlanes||Tt.numIntersection!==yt.numIntersection)||Tt.vertexAlphas!==Pt||Tt.vertexTangents!==It||Tt.morphTargets!==bt||Tt.morphNormals!==Gt||Tt.morphColors!==Jt||Tt.toneMapping!==le||Tt.morphTargetsCount!==qt)&&(Kt=!0):(Kt=!0,Tt.__version=X.version);let Je=Tt.currentProgram;Kt===!0&&(Je=os(X,B,z));let Ei=!1,Be=!1,dr=!1;const ae=Je.getUniforms(),We=Tt.uniforms;if(Mt.useProgram(Je.program)&&(Ei=!0,Be=!0,dr=!0),X.id!==E&&(E=X.id,Be=!0),Ei||y!==M){Mt.buffers.depth.getReversed()?(rt.copy(M.projectionMatrix),yx(rt),Mx(rt),ae.setValue(D,"projectionMatrix",rt)):ae.setValue(D,"projectionMatrix",M.projectionMatrix),ae.setValue(D,"viewMatrix",M.matrixWorldInverse);const Le=ae.map.cameraPosition;Le!==void 0&&Le.setValue(D,Vt.setFromMatrixPosition(M.matrixWorld)),ie.logarithmicDepthBuffer&&ae.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ae.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Be=!0,dr=!0)}if(z.isSkinnedMesh){ae.setOptional(D,z,"bindMatrix"),ae.setOptional(D,z,"bindMatrixInverse");const Ce=z.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),ae.setValue(D,"boneTexture",Ce.boneTexture,Ut))}z.isBatchedMesh&&(ae.setOptional(D,z,"batchingTexture"),ae.setValue(D,"batchingTexture",z._matricesTexture,Ut),ae.setOptional(D,z,"batchingIdTexture"),ae.setValue(D,"batchingIdTexture",z._indirectTexture,Ut),ae.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&ae.setValue(D,"batchingColorTexture",z._colorsTexture,Ut));const Xe=W.morphAttributes;if((Xe.position!==void 0||Xe.normal!==void 0||Xe.color!==void 0)&&ft.update(z,W,Je),(Be||Tt.receiveShadow!==z.receiveShadow)&&(Tt.receiveShadow=z.receiveShadow,ae.setValue(D,"receiveShadow",z.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(We.envMap.value=pt,We.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&B.environment!==null&&(We.envMapIntensity.value=B.environmentIntensity),Be&&(ae.setValue(D,"toneMappingExposure",v.toneMappingExposure),Tt.needsLights&&np(We,dr),it&&X.fog===!0&&$.refreshFogUniforms(We,it),$.refreshMaterialUniforms(We,X,k,V,p.state.transmissionRenderTarget[M.id]),da.upload(D,Zl(Tt),We,Ut)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(da.upload(D,Zl(Tt),We,Ut),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ae.setValue(D,"center",z.center),ae.setValue(D,"modelViewMatrix",z.modelViewMatrix),ae.setValue(D,"normalMatrix",z.normalMatrix),ae.setValue(D,"modelMatrix",z.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Ce=X.uniformsGroups;for(let Le=0,ja=Ce.length;Le<ja;Le++){const ei=Ce[Le];N.update(ei,Je),N.bind(ei,Je)}}return Je}function np(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function ip(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(M,B,W){const X=wt.get(M);X.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),wt.get(M.texture).__webglTexture=B,wt.get(M.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:W,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){const W=wt.get(M);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0};const rp=D.createFramebuffer();this.setRenderTarget=function(M,B=0,W=0){U=M,A=B,R=W;let X=!0,z=null,it=!1,ut=!1;if(M){const pt=wt.get(M);if(pt.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(D.FRAMEBUFFER,null),X=!1;else if(pt.__webglFramebuffer===void 0)Ut.setupRenderTarget(M);else if(pt.__hasExternalTextures)Ut.rebindTextures(M,wt.get(M.texture).__webglTexture,wt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const bt=M.depthTexture;if(pt.__boundDepthTexture!==bt){if(bt!==null&&wt.has(bt)&&(M.width!==bt.image.width||M.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ut.setupDepthRenderbuffer(M)}}const Pt=M.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ut=!0);const It=wt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(It[B])?z=It[B][W]:z=It[B],it=!0):M.samples>0&&Ut.useMultisampledRTT(M)===!1?z=wt.get(M).__webglMultisampledFramebuffer:Array.isArray(It)?z=It[W]:z=It,C.copy(M.viewport),F.copy(M.scissor),H=M.scissorTest}else C.copy(st).multiplyScalar(k).floor(),F.copy(vt).multiplyScalar(k).floor(),H=Ht;if(W!==0&&(z=rp),Mt.bindFramebuffer(D.FRAMEBUFFER,z)&&X&&Mt.drawBuffers(M,z),Mt.viewport(C),Mt.scissor(F),Mt.setScissorTest(H),it){const pt=wt.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,pt.__webglTexture,W)}else if(ut){const pt=wt.get(M.texture),Pt=B;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.__webglTexture,W,Pt)}else if(M!==null&&W!==0){const pt=wt.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pt.__webglTexture,W)}E=-1},this.readRenderTargetPixels=function(M,B,W,X,z,it,ut,xt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=wt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ut!==void 0&&(pt=pt[ut]),pt){Mt.bindFramebuffer(D.FRAMEBUFFER,pt);try{const Pt=M.textures[xt],It=Pt.format,bt=Pt.type;if(!ie.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ie.textureTypeReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-X&&W>=0&&W<=M.height-z&&(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xt),D.readPixels(B,W,X,z,at.convert(It),at.convert(bt),it))}finally{const Pt=U!==null?wt.get(U).__webglFramebuffer:null;Mt.bindFramebuffer(D.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(M,B,W,X,z,it,ut,xt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=wt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ut!==void 0&&(pt=pt[ut]),pt)if(B>=0&&B<=M.width-X&&W>=0&&W<=M.height-z){Mt.bindFramebuffer(D.FRAMEBUFFER,pt);const Pt=M.textures[xt],It=Pt.format,bt=Pt.type;if(!ie.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Gt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Gt),D.bufferData(D.PIXEL_PACK_BUFFER,it.byteLength,D.STREAM_READ),M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xt),D.readPixels(B,W,X,z,at.convert(It),at.convert(bt),0);const Jt=U!==null?wt.get(U).__webglFramebuffer:null;Mt.bindFramebuffer(D.FRAMEBUFFER,Jt);const le=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await vx(D,le,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Gt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,it),D.deleteBuffer(Gt),D.deleteSync(le),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,W=0){const X=Math.pow(2,-W),z=Math.floor(M.image.width*X),it=Math.floor(M.image.height*X),ut=B!==null?B.x:0,xt=B!==null?B.y:0;Ut.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,ut,xt,z,it),Mt.unbindTexture()};const sp=D.createFramebuffer(),ap=D.createFramebuffer();this.copyTextureToTexture=function(M,B,W=null,X=null,z=0,it=null){it===null&&(z!==0?(Ki("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),it=z,z=0):it=0);let ut,xt,pt,Pt,It,bt,Gt,Jt,le;const he=M.isCompressedTexture?M.mipmaps[it]:M.image;if(W!==null)ut=W.max.x-W.min.x,xt=W.max.y-W.min.y,pt=W.isBox3?W.max.z-W.min.z:1,Pt=W.min.x,It=W.min.y,bt=W.isBox3?W.min.z:0;else{const Xe=Math.pow(2,-z);ut=Math.floor(he.width*Xe),xt=Math.floor(he.height*Xe),M.isDataArrayTexture?pt=he.depth:M.isData3DTexture?pt=Math.floor(he.depth*Xe):pt=1,Pt=0,It=0,bt=0}X!==null?(Gt=X.x,Jt=X.y,le=X.z):(Gt=0,Jt=0,le=0);const qt=at.convert(B.format),Tt=at.convert(B.type);let ye;B.isData3DTexture?(Ut.setTexture3D(B,0),ye=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Ut.setTexture2DArray(B,0),ye=D.TEXTURE_2D_ARRAY):(Ut.setTexture2D(B,0),ye=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const Kt=D.getParameter(D.UNPACK_ROW_LENGTH),Je=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ei=D.getParameter(D.UNPACK_SKIP_PIXELS),Be=D.getParameter(D.UNPACK_SKIP_ROWS),dr=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,he.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Pt),D.pixelStorei(D.UNPACK_SKIP_ROWS,It),D.pixelStorei(D.UNPACK_SKIP_IMAGES,bt);const ae=M.isDataArrayTexture||M.isData3DTexture,We=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){const Xe=wt.get(M),Ce=wt.get(B),Le=wt.get(Xe.__renderTarget),ja=wt.get(Ce.__renderTarget);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,Le.__webglFramebuffer),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,ja.__webglFramebuffer);for(let ei=0;ei<pt;ei++)ae&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,wt.get(M).__webglTexture,z,bt+ei),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,wt.get(B).__webglTexture,it,le+ei)),D.blitFramebuffer(Pt,It,ut,xt,Gt,Jt,ut,xt,D.DEPTH_BUFFER_BIT,D.NEAREST);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||wt.has(M)){const Xe=wt.get(M),Ce=wt.get(B);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,sp),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,ap);for(let Le=0;Le<pt;Le++)ae?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Xe.__webglTexture,z,bt+Le):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Xe.__webglTexture,z),We?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.__webglTexture,it,le+Le):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ce.__webglTexture,it),z!==0?D.blitFramebuffer(Pt,It,ut,xt,Gt,Jt,ut,xt,D.COLOR_BUFFER_BIT,D.NEAREST):We?D.copyTexSubImage3D(ye,it,Gt,Jt,le+Le,Pt,It,ut,xt):D.copyTexSubImage2D(ye,it,Gt,Jt,Pt,It,ut,xt);Mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else We?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(ye,it,Gt,Jt,le,ut,xt,pt,qt,Tt,he.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(ye,it,Gt,Jt,le,ut,xt,pt,qt,he.data):D.texSubImage3D(ye,it,Gt,Jt,le,ut,xt,pt,qt,Tt,he):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,it,Gt,Jt,ut,xt,qt,Tt,he.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,it,Gt,Jt,he.width,he.height,qt,he.data):D.texSubImage2D(D.TEXTURE_2D,it,Gt,Jt,ut,xt,qt,Tt,he);D.pixelStorei(D.UNPACK_ROW_LENGTH,Kt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Je),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ei),D.pixelStorei(D.UNPACK_SKIP_ROWS,Be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,dr),it===0&&B.generateMipmaps&&D.generateMipmap(ye),Mt.unbindTexture()},this.copyTextureToTexture3D=function(M,B,W=null,X=null,z=0){return Ki('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,B,W,X,z)},this.initRenderTarget=function(M){wt.get(M).__webglFramebuffer===void 0&&Ut.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ut.setTextureCube(M,0):M.isData3DTexture?Ut.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ut.setTexture2DArray(M,0):Ut.setTexture2D(M,0),Mt.unbindTexture()},this.resetState=function(){A=0,R=0,U=null,Mt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}const Vh={type:"change"},Fl={type:"start"},Nf={type:"end"},ks=new Ba,Gh=new Xn,Sb=Math.cos(70*_x.DEG2RAD),ge=new I,Ue=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bo=1e-6;class Eb extends Bv{constructor(t,e=null){super(t,e),this.state=te.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yi.ROTATE,MIDDLE:Yi.DOLLY,RIGHT:Yi.PAN},this.touches={ONE:Wi.ROTATE,TWO:Wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new vi,this._lastTargetPosition=new I,this._quat=new vi().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new gh,this._sphericalDelta=new gh,this._scale=1,this._panOffset=new I,this._rotateStart=new ht,this._rotateEnd=new ht,this._rotateDelta=new ht,this._panStart=new ht,this._panEnd=new ht,this._panDelta=new ht,this._dollyStart=new ht,this._dollyEnd=new ht,this._dollyDelta=new ht,this._dollyDirection=new I,this._mouse=new ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wb.bind(this),this._onPointerDown=bb.bind(this),this._onPointerUp=Tb.bind(this),this._onContextMenu=Lb.bind(this),this._onMouseWheel=Cb.bind(this),this._onKeyDown=Pb.bind(this),this._onTouchStart=Ib.bind(this),this._onTouchMove=Db.bind(this),this._onMouseDown=Ab.bind(this),this._onMouseMove=Rb.bind(this),this._interceptControlDown=Nb.bind(this),this._interceptControlUp=Ub.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Vh),this.update(),this.state=te.NONE}update(t=null){const e=this.object.position;ge.copy(e).sub(this.target),ge.applyQuaternion(this._quat),this._spherical.setFromVector3(ge),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Ue:i>Math.PI&&(i-=Ue),r<-Math.PI?r+=Ue:r>Math.PI&&(r-=Ue),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(ge.setFromSpherical(this._spherical),ge.applyQuaternion(this._quatInverse),e.copy(this.target).add(ge),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ge.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=ge.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ks.origin.copy(this.object.position),ks.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ks.direction))<Sb?this.object.lookAt(this.target):(Gh.setFromNormalAndCoplanarPoint(this.object.up,this.target),ks.intersectPlane(Gh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Bo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bo||this._lastTargetPosition.distanceToSquared(this.target)>Bo?(this.dispatchEvent(Vh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ue/60*this.autoRotateSpeed*t:Ue/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ge.setFromMatrixColumn(e,0),ge.multiplyScalar(-t),this._panOffset.add(ge)}_panUp(t,e){this.screenSpacePanning===!0?ge.setFromMatrixColumn(e,1):(ge.setFromMatrixColumn(e,0),ge.crossVectors(this.object.up,ge)),ge.multiplyScalar(t),this._panOffset.add(ge)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;ge.copy(r).sub(this.target);let s=ge.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ue*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ue*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ue*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ue*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ht,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function bb(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function wb(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Tb(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Nf),this.state=te.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ab(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=te.DOLLY;break;case Yi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=te.ROTATE}break;case Yi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(Fl)}function Rb(n){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Cb(n){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(n.preventDefault(),this.dispatchEvent(Fl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Nf))}function Pb(n){this.enabled!==!1&&this._handleKeyDown(n)}function Ib(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=te.TOUCH_ROTATE;break;case Wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case Wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=te.TOUCH_DOLLY_PAN;break;case Wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(Fl)}function Db(n){switch(this._trackPointer(n),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=te.NONE}}function Lb(n){this.enabled!==!1&&n.preventDefault()}function Nb(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ub(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const il=2.5;function Wh(n){const t=new Xi;t.userData.nanotube=n;const i=n.diameter*il*8/2,r=n.length*il,s=new zt(n.color),a=Math.max(12,Math.round(n.m+n.n)*2),o=new Ca(i,i,r,a,1,!0),c=new lh({color:s,metalness:n.isMetallic?.9:.1,roughness:.3,transparent:!0,opacity:.55,side:Ke,wireframe:!1}),l=new Ie(o,c);t.add(l);const u=Fb(n,i,r),h=new is({color:s.clone().multiplyScalar(1.6),linewidth:1}),d=new gf(u,h);t.add(d);const f=new lh({color:s.clone().multiplyScalar(.8),metalness:n.isMetallic?.85:.15,roughness:.4,transparent:!0,opacity:.75}),g=new Ll(i,a,8,0,Math.PI*2,0,Math.PI/2),_=new Ie(g,f);_.position.y=r/2,t.add(_);const m=new Ie(g,f);m.position.y=-r/2,m.rotation.x=Math.PI,t.add(m);const p=new Ca(i*1.3,i*1.3,r,a,1,!0),b=new es({color:s,transparent:!0,opacity:.06,side:De});return t.add(new Ie(p,b)),t.rotation.y=n.rotation*Math.PI/180,t}function Fb(n,t,e,i){const r=[],s=2*Math.PI*t,a=Math.max(6,n.n+n.m),o=s/(a*Math.sqrt(3)),c=Math.sqrt(3)*o,l=Math.sqrt(3)*o/2,u=1.5*o,h=Math.ceil(s/c)+2,d=-Math.ceil(e/u)-2,f=Math.ceil(e/u)+2,g=(p,b,S,v)=>{if(b<-e/2-o&&v<-e/2-o||b>e/2+o&&v>e/2+o)return;const L=p/t,A=S/t;r.push(Math.cos(L)*t,b,Math.sin(L)*t),r.push(Math.cos(A)*t,v,Math.sin(A)*t)},_=Math.sqrt(3)*o/2;for(let p=0;p<h;p++)for(let b=d;b<=f;b++){const S=p*c+b*l,v=b*u;g(S,v,S,v+o),g(S,v,S-_,v-o/2),g(S,v,S+_,v-o/2)}const m=new Te;return m.setAttribute("position",new de(r,3)),m}function Xh(n,t,e){const i=Math.max(6,n.n+n.m),r=2*Math.PI*t,s=r/(i*Math.sqrt(3)),a=Math.sqrt(3)*s,o=1.5*s,c=a/2,l=Math.ceil(r/a)+1,u=-Math.ceil(e/o)-1,h=Math.ceil(e/o)+1,d=[[0,-s],[c,-s/2],[c,s/2],[0,s],[-c,s/2],[-c,-s/2]],f=[];let g=0;for(let _=0;_<l;_++)for(let m=u;m<=h;m++){const p=_*a+((m%2+2)%2?a/2:0),b=s+m*o;if(g++,b+s<-e/2||b-s>e/2)continue;const S=d.map(([w,O])=>{const P=(p+w)/t;return new I(Math.cos(P)*t,b+O,Math.sin(P)*t)}),v=new I;S.forEach(w=>v.add(w)),v.divideScalar(6);const L=[],A=new I,R=new I;let U=0;const E=new I;for(let w=0;w<6;w++){const O=v,P=S[w],V=S[(w+1)%6];L.push(...O.toArray(),...P.toArray(),...V.toArray()),A.subVectors(P,O),R.subVectors(V,O);const k=A.clone().cross(R).length()/2,Y=O.clone().add(P).add(V).divideScalar(3);E.addScaledVector(Y,k),U+=k}U>0&&E.divideScalar(U);const y=new Te;y.setAttribute("position",new de(L,3)),y.computeVertexNormals();const C=new Ie(y,new es({transparent:!0,opacity:0,side:Ke}));C.userData.isHexFace=!0,C.userData.hexFaceIdx=g-1,C.userData.hexFacePos={i:_,j:m,cx:p,cy:b},C.userData.center=v,C.userData.faceCentroid=E;const F=new Te().setFromPoints(S),H=new jx(F,new is({color:3359061,transparent:!0,opacity:.5}));H.userData.isHexOutline=!0,H.userData.centroid=v,C.add(H),C.userData.outline=H,f.push(C)}return f}const Ob=il;function Bb(n,t="#22d3ee"){const e=new Sf;n.forEach((s,a)=>{a===0?e.moveTo(s.x,s.y):e.lineTo(s.x,s.y)}),e.closePath();const i=new Dl(e),r=new es({color:t,transparent:!0,opacity:.08,side:Ke});return new Ie(i,r)}function kb(n,t="#2d3a4f"){const e=[...n,n[0]].map(s=>new I(s.x,0,s.y)),i=new Te().setFromPoints(e),r=new is({color:t});return new Cl(i,r)}const Bi=Ob,qh=14;class zb{constructor(t){this.canvas=t,this.tubeObjects=new Map,this.hexObjects=new Map,this.selectedKey=null,this.showGrid=!0,this.showLabels=!1,this.showHexFaces=!1,this.orientation="pointy",this._onSelectCallbacks=[],this._onTubeHexCallbacks=[],this.hexFaceObjects=new Map,this._initRenderer(),this._initScene(),this._initCamera(),this._initControls(),this._initLights(),this._initRaycaster(),this._animate()}_initRenderer(){this.renderer=new Mb({canvas:this.canvas,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=$d,this.renderer.setClearColor(658967),this.renderer.toneMapping=jd,this.renderer.toneMappingExposure=1.2,this._resizeObserver=new ResizeObserver(()=>this._onResize()),this._resizeObserver.observe(this.canvas.parentElement),this._onResize()}_initScene(){this.scene=new qx,this.scene.fog=new Al(658967,400,900),this.gridHelper=new Ov(400,40,1976118,1976118),this.scene.add(this.gridHelper)}_initCamera(){const t=this.canvas.clientWidth||800,e=this.canvas.clientHeight||600;this.camera=new Ve(45,t/e,.1,2e3),this.camera.position.set(80,120,160),this.camera.lookAt(0,30,0)}_initControls(){this.controls=new Eb(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxPolarAngle=Math.PI/1.8,this.controls.minDistance=20,this.controls.maxDistance=600,this.controls.target.set(0,20,0)}_initLights(){const t=new Nv(3359846,.8);this.scene.add(t);const e=new fh(16777215,1.8);e.position.set(100,200,100),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.far=800,this.scene.add(e);const i=new fh(4491519,.5);i.position.set(-100,50,-100),this.scene.add(i);const r=new Dv(2282478,.6,200);r.position.set(0,80,0),this.scene.add(r)}_initRaycaster(){this.raycaster=new Fv,this.mouse=new ht,this._hoveredHexFace=null,this.canvas.addEventListener("click",t=>this._onCanvasClick(t)),this.canvas.addEventListener("mousemove",t=>this._onCanvasMouseMove(t))}_onCanvasMouseMove(t){const e=this.canvas.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=[];this.hexFaceObjects.forEach(a=>i.push(...a));const r=this.raycaster.intersectObjects(i),s=r.length>0?r[0].object:null;if(this._hoveredHexFace&&this._hoveredHexFace!==s){const a=this._hoveredHexFace.userData.outline;a&&(a.material.color.set(this._hoveredHexFace.userData._origColor||3359061),a.material.opacity=.5),this._hoveredHexFace.material.opacity=this.showHexFaces?.25:0,this._hoveredHexFace=null}if(s&&s!==this._hoveredHexFace){this._hoveredHexFace=s;const a=s.userData.outline;a&&(s.userData._origColor||(s.userData._origColor=a.material.color.getHex()),a.material.color.set(16347926),a.material.opacity=1),s.material.opacity=.15}}_onCanvasClick(t){var o,c;const e=this.canvas.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=[];this.hexFaceObjects.forEach(l=>i.push(...l));const r=this.raycaster.intersectObjects(i);if(r.length>0){const l=r[0].object,u=l.userData.tubeHexKey;if(u&&l.parent){const h=l.parent.userData.nanotube,d=l.userData.hexFacePos;let f=r[0].point.clone(),g=r[0].point.clone().sub(l.parent.position).setY(0).normalize(),_=r[0].point.clone();l.userData.faceCentroid&&(_=l.userData.faceCentroid.clone().applyMatrix4(l.matrixWorld));let m=r[0].point.clone();const p=l.userData.outline;if(p!=null&&p.userData.centroid&&(m=p.userData.centroid.clone().applyMatrix4(l.matrixWorld)),h&&d){const b=h.diameter*Bi*8/2,S=d.cx/b;f=new I(Math.cos(S)*b,d.cy,Math.sin(S)*b).clone().applyMatrix4(l.parent.matrixWorld),g=new I(Math.cos(S),0,Math.sin(S)).transformDirection(l.parent.matrixWorld).normalize()}this._onTubeHexCallbacks.forEach(b=>b({hexKey:u,hexFaceIdx:l.userData.hexFaceIdx,hexFacePos:d,worldPos:r[0].point,hexCenterWorld:f,hexNormalWorld:g,faceCentroidWorld:_,loopCentroidWorld:m}));return}}const s=[];this.hexObjects.forEach(l=>s.push(...l.children));const a=this.raycaster.intersectObjects(s);if(a.length>0){const l=(c=(o=a[0].object.parent)==null?void 0:o.userData)==null?void 0:c.hexKey;l&&this._selectHex(l)}}_selectHex(t){if(this.selectedKey){const i=this.hexObjects.get(this.selectedKey);i&&i.children.forEach(r=>{var s;(s=r.material)!=null&&s.color&&r.userData.isBase&&(r.material.opacity=.08)})}this.selectedKey=t;const e=this.hexObjects.get(t);e&&e.children.forEach(i=>{i.material&&i.userData.isBase&&(i.material.opacity=.25)}),this._onSelectCallbacks.forEach(i=>i(t))}onSelect(t){this._onSelectCallbacks.push(t)}onTubeHexSelect(t){this._onTubeHexCallbacks.push(t)}buildGrid(t,e="pointy"){this.orientation=e;const i=e==="flat"?fd:dd;this.layout3d=new pd(i,new In(qh,qh),new In(0,0)),this.hexObjects.forEach(r=>this.scene.remove(r)),this.hexObjects.clear(),t.forEach(r=>{const s=this.layout3d.hexToPixel(r),a=this.layout3d.polygonCorners(r),o=new Xi;o.userData.hexKey=r.key(),o.position.set(s.x,0,s.y);const c=a.map(h=>new In(h.x-s.x,h.y-s.y)),l=Bb(c,2282478);l.rotation.x=-Math.PI/2,l.userData.isBase=!0,o.add(l);const u=kb(c,2964047);o.add(u),this.scene.add(o),this.hexObjects.set(r.key(),o)})}setTube(t,e){this.removeTube(t);const i=this.hexObjects.get(t);if(!i)return;const r=Wh(e),s=e.length*2.5/2;r.position.set(i.position.x,s,i.position.z),this.scene.add(r),this.tubeObjects.set(t,r);const o=e.diameter*Bi*8/2,c=e.length*Bi,l=Xh(e,o,c);l.forEach(h=>{h.userData.tubeHexKey=t,h.userData.outline&&h.userData.outline.material.color.set(e.color),r.add(h)}),this.hexFaceObjects.set(t,l);const u=i.children.find(h=>h.userData.isBase);u&&(u.material.opacity=.18,u.material.color.set(e.color))}removeTube(t){const e=this.tubeObjects.get(t);e&&(this.scene.remove(e),e.traverse(r=>{r.geometry&&r.geometry.dispose(),r.material&&r.material.dispose()}),this.tubeObjects.delete(t)),this.hexFaceObjects.delete(t);const i=this.hexObjects.get(t);if(i){const r=i.children.find(s=>s.userData.isBase);r&&(r.material.opacity=.08,r.material.color.set(2282478))}}updateTube(t,e){this.setTube(t,e)}addChildTube(t,e,i,r){const s=Wh(t),a=new I(0,1,0),o=new I(i.x,i.y,i.z).normalize();s.quaternion.setFromUnitVectors(a,o);const c=t.length*Bi/2;s.position.set(e.x+o.x*c,e.y+o.y*c,e.z+o.z*c),this.scene.add(s),s.userData.faceKey=r;const u=t.diameter*Bi*8/2,h=t.length*Bi,d=Xh(t,u,h);return d.forEach(f=>{f.userData.tubeHexKey=r,f.userData.outline&&f.userData.outline.material.color.set(t.color),s.add(f)}),this.hexFaceObjects.set(r,d),s}highlightTube(t){this.tubeObjects.forEach((e,i)=>{e.traverse(r=>{var s;(s=r.material)!=null&&s.emissive&&r.material.emissive.set(i===t?2254404:0)})})}toggleGrid(t){this.showGrid=t??!this.showGrid,this.gridHelper.visible=this.showGrid,this.hexObjects.forEach(e=>{e.children.filter(i=>!i.userData.isBase).forEach(i=>i.visible=this.showGrid)})}toggleHexFaces(t){this.showHexFaces=t??!this.showHexFaces,this.hexFaceObjects.forEach(e=>{e.forEach(i=>{i.userData.outline&&(i.userData.outline.material.opacity=this.showHexFaces?.8:.5),i.material.opacity=this.showHexFaces?.12:0})})}resetCamera(){this.camera.position.set(80,120,160),this.controls.target.set(0,20,0),this.controls.update()}screenshot(){return this.renderer.render(this.scene,this.camera),this.canvas.toDataURL("image/png")}_onResize(){const t=this.canvas.parentElement;if(!t)return;const e=t.clientWidth,i=t.clientHeight;this.renderer.setSize(e,i,!1),this.camera&&(this.camera.aspect=e/i,this.camera.updateProjectionMatrix())}_animate(){requestAnimationFrame(()=>this._animate()),this.controls.update(),this.selectedKey||this.tubeObjects.forEach(t=>{t.rotation.y+=.002}),this.renderer.render(this.scene,this.camera)}dispose(){this._resizeObserver.disconnect(),this.renderer.dispose()}}const $h={armchair:"#22d3ee",zigzag:"#facc15",chiral:"#818cf8"};class Hb{constructor(t,e){this.distEl=t,this.propsEl=e,this._buildDistChart(),this._buildPropsChart()}_buildDistChart(){this.distEl.innerHTML='<div class="chart-title">Distribution des types</div>';const t=280,e=90;this.distSvg=hn(this.distEl).append("svg").attr("width",t).attr("height",e),this.distG=this.distSvg.append("g").attr("transform","translate(40,10)")}updateDistribution(t){const e={armchair:0,zigzag:0,chiral:0};t.forEach(u=>e[u.type]=(e[u.type]||0)+1);const i=Object.entries(e).map(([u,h])=>({type:u,count:h})),r=280,s=90,a=r-40,o=s-20,c=uc().domain(i.map(u=>u.type)).range([0,a]).padding(.3),l=dc().domain([0,Math.max(1,eu(i,u=>u.count))]).range([o,0]);this.distG.selectAll("*").remove(),this.distG.append("g").attr("transform",`translate(0,${o})`).call(iu(c).tickSize(0)).call(u=>u.select(".domain").remove()).selectAll("text").attr("fill","#7a8fa8").attr("font-size",10),this.distG.selectAll(".bar").data(i).join("rect").attr("class","bar").attr("x",u=>c(u.type)).attr("y",u=>l(u.count)).attr("width",c.bandwidth()).attr("height",u=>o-l(u.count)).attr("fill",u=>$h[u.type]||"#22d3ee").attr("rx",3),this.distG.selectAll(".count-label").data(i).join("text").attr("class","count-label").attr("x",u=>c(u.type)+c.bandwidth()/2).attr("y",u=>l(u.count)-3).attr("text-anchor","middle").attr("font-size",10).attr("fill","#e2e8f0").text(u=>u.count||"")}_buildPropsChart(){this.propsEl.innerHTML='<div class="chart-title">Diamètres (nm)</div>';const t=280,e=100;this.propsSvg=hn(this.propsEl).append("svg").attr("width",t).attr("height",e),this.propsG=this.propsSvg.append("g").attr("transform","translate(50,8)")}updateProperties(t){if(t.length===0){this.propsG.selectAll("*").remove();return}const e=t.map(l=>({key:l.hexKey,d:+l.diameter.toFixed(3),color:l.color,type:l.type})).sort((l,u)=>l.d-u.d),i=280,r=100,s=i-50,a=r-20,o=dc().domain([0,eu(e,l=>l.d)*1.1]).range([0,s]),c=uc().domain(e.map(l=>l.key)).range([0,a]).padding(.2);this.propsG.selectAll("*").remove(),this.propsG.append("g").call(Cp(c).tickSize(0).tickFormat(()=>"")).call(l=>l.select(".domain").attr("stroke","#2d3a4f")).selectAll("line").attr("stroke","#2d3a4f"),this.propsG.append("g").attr("transform",`translate(0,${a})`).call(iu(o).ticks(4).tickSize(3)).call(l=>l.select(".domain").attr("stroke","#2d3a4f")).selectAll("text").attr("fill","#7a8fa8").attr("font-size",9),this.propsG.selectAll(".hbar").data(e).join("rect").attr("class","hbar bar").attr("x",0).attr("y",l=>c(l.key)).attr("width",l=>o(l.d)).attr("height",c.bandwidth()).attr("fill",l=>$h[l.type]||l.color).attr("rx",2),this.propsG.selectAll(".hbar-label").data(e).join("text").attr("x",l=>o(l.d)+3).attr("y",l=>c(l.key)+c.bandwidth()/2).attr("dominant-baseline","central").attr("font-size",9).attr("fill","#7a8fa8").text(l=>`${l.d} nm`)}buildScatter(t){}update(t){const e=Array.from(t.values());this.updateDistribution(e),this.updateProperties(e)}}const Yh=.246;class dn{constructor({m:t=5,n:e=5,length:i=20,rotation:r=0,color:s="#4ade80",label:a="",hexKey:o=null}={}){this.m=Math.max(0,Math.round(t)),this.n=Math.max(0,Math.round(e)),this.length=i,this.rotation=r,this.color=s,this.label=a,this.hexKey=o,this.omekaId=null}get diameter(){return Yh/Math.PI*Math.sqrt(this.m**2+this.m*this.n+this.n**2)}get chiralVector(){return Yh*Math.sqrt(this.m**2+this.m*this.n+this.n**2)}get chiralAngle(){return Math.atan2(Math.sqrt(3)*this.n,2*this.m+this.n)*(180/Math.PI)}get type(){return this.m===this.n?"armchair":this.n===0||this.m===0?"zigzag":"chiral"}get conductivity(){return this.type==="armchair"||(this.m-this.n)%3===0?"Métallique":"Semi-conducteur"}get isMetallic(){return this.conductivity==="Métallique"}get bandGap(){return this.isMetallic?0:(.9/this.diameter).toFixed(3)}get atomCount(){const t=Math.PI*this.diameter;return Math.round(t*this.length*38.2)}get defaultColor(){switch(this.type){case"armchair":return"#22d3ee";case"zigzag":return"#facc15";default:return"#818cf8"}}toJSON(){return{m:this.m,n:this.n,length:this.length,rotation:this.rotation,color:this.color,label:this.label,hexKey:this.hexKey,omekaId:this.omekaId}}static fromJSON(t){const e=new dn(t);return e.omekaId=t.omekaId||null,e}toOmeka(t){return{"@type":["o:Item"],"o:item_set":[{"o:id":t}],"dcterms:title":[{"@value":this.label||`Nanotube (${this.m},${this.n})`,type:"literal"}],"dcterms:description":[{"@value":JSON.stringify(this.toJSON()),type:"literal"}],"dcterms:type":[{"@value":`nanotube:${this.type}`,type:"literal"}]}}static fromOmeka(t){var e,i;try{const r=(i=(e=t["dcterms:description"])==null?void 0:e[0])==null?void 0:i["@value"];if(r)return dn.fromJSON(JSON.parse(r))}catch{}return null}clone(){return dn.fromJSON(this.toJSON())}}function Vb(n){const t=[{m:5,n:5},{m:7,n:0},{m:6,n:2},{m:10,n:10},{m:9,n:0},{m:8,n:3}],e=t[Math.floor(Math.random()*t.length)],i=["#22d3ee","#facc15","#818cf8","#4ade80","#f87171"];return new dn({...e,length:15+Math.random()*40,rotation:Math.random()*360,color:i[Math.floor(Math.random()*i.length)],hexKey:n})}class Gb{constructor(t={}){this.baseUrl=t.url||"",this.keyId=t.keyId||"",this.keyCred=t.keyCred||"",this.itemSetId=t.itemSetId||1,this.connected=!1}configure(t){this.baseUrl=t.url||this.baseUrl,this.keyId=t.keyId||this.keyId,this.keyCred=t.keyCred||this.keyCred,this.itemSetId=t.itemSetId||this.itemSetId}_authParams(){return!this.keyId||!this.keyCred?"":`key_identity=${encodeURIComponent(this.keyId)}&key_credential=${encodeURIComponent(this.keyCred)}`}_url(t,e=""){const i=this._authParams(),r=i?"&":"";return`${this.baseUrl}${t}?${i}${e?r+e:""}`}async _fetch(t,e={}){const i=await fetch(t,{...e,headers:{"Content-Type":"application/json",...e.headers}});if(!i.ok){const r=await i.text().catch(()=>"");throw new Error(`Omeka S ${i.status}: ${r}`)}return i.json()}async ping(){try{return await this._fetch(this._url("/api")),this.connected=!0,!0}catch{return this.connected=!1,!1}}async listMaps(){return(await this._fetch(this._url("/api/items",`item_set_id=${this.itemSetId}&per_page=50`))).map(e=>{var i,r,s;return{id:e["o:id"],title:((r=(i=e["dcterms:title"])==null?void 0:i[0])==null?void 0:r["@value"])||`Carte #${e["o:id"]}`,modified:(s=e["o:modified"])==null?void 0:s["@value"]}})}async getMap(t){const e=await this._fetch(this._url(`/api/items/${t}`));return this._parseMapItem(e)}async saveMap(t){const e=this._buildOmekaItem(t);return t.omekaId?this._fetch(this._url(`/api/items/${t.omekaId}`),{method:"PATCH",body:JSON.stringify(e)}):this._fetch(this._url("/api/items"),{method:"POST",body:JSON.stringify(e)})}async deleteMap(t){await fetch(this._url(`/api/items/${t}`),{method:"DELETE"})}async listResourceTemplates(){return(await this._fetch(this._url("/api/resource_templates","per_page=50"))).map(e=>({id:e["o:id"],label:e["o:label"]||`Template #${e["o:id"]}`}))}async getResourceTemplate(t){const e=await this._fetch(this._url(`/api/resource_templates/${t}`));return{id:e["o:id"],label:e["o:label"],properties:(e["o:resource_template_property"]||[]).map(i=>{var r,s,a,o;return{term:((r=i["o:property"])==null?void 0:r["o:term"])||"",label:i["o:alternate_label"]||((s=i["o:property"])==null?void 0:s["o:label"])||((a=i["o:property"])==null?void 0:a["o:term"])||"",type:((o=i["o:data_type"])==null?void 0:o[0])||"literal"}})}}async saveHexItem(t,e){const i={};(t.properties||[]).forEach(({term:s,value:a})=>{a&&(i[s]=[{"@value":a,type:"literal"}])});const r={"@type":["o:Item"],"o:item_set":[{"o:id":e||this.itemSetId}],"dcterms:title":[{"@value":t.title||"Hexagone nanotube",type:"literal"}],"dcterms:description":[{"@value":JSON.stringify(t),type:"literal"}],"dcterms:subject":[{"@value":"nanotube:hex",type:"literal"}],...i};return t.omekaId?this._fetch(this._url(`/api/items/${t.omekaId}`),{method:"PATCH",body:JSON.stringify(r)}):this._fetch(this._url("/api/items"),{method:"POST",body:JSON.stringify(r)})}_buildOmekaItem(t){return{"@type":["o:Item"],"o:item_set":[{"o:id":this.itemSetId}],"dcterms:title":[{"@value":t.title||"Cartographie NanoTube",type:"literal"}],"dcterms:description":[{"@value":JSON.stringify({tubes:t.tubes,gridRadius:t.gridRadius,orientation:t.orientation,version:"1.0"}),type:"literal"}],"dcterms:subject":[{"@value":"nanotube-cartography",type:"literal"}]}}_parseMapItem(t){var e,i,r,s;try{const a=(i=(e=t["dcterms:description"])==null?void 0:e[0])==null?void 0:i["@value"],o=a?JSON.parse(a):{};return{omekaId:t["o:id"],title:((s=(r=t["dcterms:title"])==null?void 0:r[0])==null?void 0:s["@value"])||`Carte #${t["o:id"]}`,tubes:o.tubes||[],gridRadius:o.gridRadius||5,orientation:o.orientation||"pointy"}}catch{return{omekaId:t["o:id"],title:`Carte #${t["o:id"]}`,tubes:[],gridRadius:5,orientation:"pointy"}}}}function Wb(){try{return JSON.parse(localStorage.getItem("omeka-config")||"{}")}catch{return{}}}function Xb(n){localStorage.setItem("omeka-config",JSON.stringify(n))}const Hi="0.39.0";let jh=!1,zr,Uf,rl,Ff,Of,Bf;function qb(n,t={auto:!1}){if(jh)throw new Error(`you must \`import '@anthropic-ai/sdk/shims/${n.kind}'\` before importing anything else from @anthropic-ai/sdk`);if(zr)throw new Error(`can't \`import '@anthropic-ai/sdk/shims/${n.kind}'\` after \`import '@anthropic-ai/sdk/shims/${zr}'\``);jh=t.auto,zr=n.kind,Uf=n.fetch,rl=n.File,Ff=n.ReadableStream,Of=n.getDefaultAgent,Bf=n.fileFromPath}class $b{constructor(t){this.body=t}get[Symbol.toStringTag](){return"MultipartBody"}}function Yb({manuallyImported:n}={}){const t=n?"You may need to use polyfills":"Add one of these imports before your first `import … from '@anthropic-ai/sdk'`:\n- `import '@anthropic-ai/sdk/shims/node'` (if you're running on Node)\n- `import '@anthropic-ai/sdk/shims/web'` (otherwise)\n";let e,i,r,s;try{e=fetch,i=Request,r=Response,s=Headers}catch(a){throw new Error(`this environment is missing the following Web Fetch API type: ${a.message}. ${t}`)}return{kind:"web",fetch:e,Request:i,Response:r,Headers:s,FormData:typeof FormData<"u"?FormData:class{constructor(){throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${t}`)}},Blob:typeof Blob<"u"?Blob:class{constructor(){throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${t}`)}},File:typeof File<"u"?File:class{constructor(){throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${t}`)}},ReadableStream:typeof ReadableStream<"u"?ReadableStream:class{constructor(){throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${t}`)}},getMultipartRequestOptions:async(a,o)=>({...o,body:new $b(a)}),getDefaultAgent:a=>{},fileFromPath:()=>{throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/anthropics/anthropic-sdk-typescript#file-uploads")},isFsReadStream:a=>!1}}zr||qb(Yb(),{auto:!0});class Wt extends Error{}class Ae extends Wt{constructor(t,e,i,r){super(`${Ae.makeMessage(t,e,i)}`),this.status=t,this.headers=r,this.request_id=r==null?void 0:r["request-id"],this.error=e}static makeMessage(t,e,i){const r=e!=null&&e.message?typeof e.message=="string"?e.message:JSON.stringify(e.message):e?JSON.stringify(e):i;return t&&r?`${t} ${r}`:t?`${t} status code (no body)`:r||"(no status code or body)"}static generate(t,e,i,r){if(!t||!r)return new Ha({message:i,cause:sl(e)});const s=e;return t===400?new zf(t,s,i,r):t===401?new Hf(t,s,i,r):t===403?new Vf(t,s,i,r):t===404?new Gf(t,s,i,r):t===409?new Wf(t,s,i,r):t===422?new Xf(t,s,i,r):t===429?new qf(t,s,i,r):t>=500?new $f(t,s,i,r):new Ae(t,s,i,r)}}class on extends Ae{constructor({message:t}={}){super(void 0,void 0,t||"Request was aborted.",void 0)}}class Ha extends Ae{constructor({message:t,cause:e}){super(void 0,void 0,t||"Connection error.",void 0),e&&(this.cause=e)}}class kf extends Ha{constructor({message:t}={}){super({message:t??"Request timed out."})}}class zf extends Ae{}class Hf extends Ae{}class Vf extends Ae{}class Gf extends Ae{}class Wf extends Ae{}class Xf extends Ae{}class qf extends Ae{}class $f extends Ae{}var zs=function(n,t,e,i,r){if(i==="m")throw new TypeError("Private method is not writable");if(i==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?n!==t||!r:!t.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return i==="a"?r.call(n,e):r?r.value=e:t.set(n,e),e},li=function(n,t,e,i){if(e==="a"&&!i)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?n!==t||!i:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?i:e==="a"?i.call(n):i?i.value:t.get(n)},He;class rs{constructor(){He.set(this,void 0),this.buffer=new Uint8Array,zs(this,He,null,"f")}decode(t){if(t==null)return[];const e=t instanceof ArrayBuffer?new Uint8Array(t):typeof t=="string"?new TextEncoder().encode(t):t;let i=new Uint8Array(this.buffer.length+e.length);i.set(this.buffer),i.set(e,this.buffer.length),this.buffer=i;const r=[];let s;for(;(s=jb(this.buffer,li(this,He,"f")))!=null;){if(s.carriage&&li(this,He,"f")==null){zs(this,He,s.index,"f");continue}if(li(this,He,"f")!=null&&(s.index!==li(this,He,"f")+1||s.carriage)){r.push(this.decodeText(this.buffer.slice(0,li(this,He,"f")-1))),this.buffer=this.buffer.slice(li(this,He,"f")),zs(this,He,null,"f");continue}const a=li(this,He,"f")!==null?s.preceding-1:s.preceding,o=this.decodeText(this.buffer.slice(0,a));r.push(o),this.buffer=this.buffer.slice(s.index),zs(this,He,null,"f")}return r}decodeText(t){if(t==null)return"";if(typeof t=="string")return t;if(typeof Buffer<"u"){if(t instanceof Buffer)return t.toString();if(t instanceof Uint8Array)return Buffer.from(t).toString();throw new Wt(`Unexpected: received non-Uint8Array (${t.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`)}if(typeof TextDecoder<"u"){if(t instanceof Uint8Array||t instanceof ArrayBuffer)return this.textDecoder??(this.textDecoder=new TextDecoder("utf8")),this.textDecoder.decode(t);throw new Wt(`Unexpected: received non-Uint8Array/ArrayBuffer (${t.constructor.name}) in a web platform. Please report this error.`)}throw new Wt("Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.")}flush(){return this.buffer.length?this.decode(`
`):[]}}He=new WeakMap;rs.NEWLINE_CHARS=new Set([`
`,"\r"]);rs.NEWLINE_REGEXP=/\r\n|[\n\r]/g;function jb(n,t){for(let r=t??0;r<n.length;r++){if(n[r]===10)return{preceding:r,index:r+1,carriage:!1};if(n[r]===13)return{preceding:r,index:r+1,carriage:!0}}return null}function Kb(n){for(let i=0;i<n.length-1;i++){if(n[i]===10&&n[i+1]===10||n[i]===13&&n[i+1]===13)return i+2;if(n[i]===13&&n[i+1]===10&&i+3<n.length&&n[i+2]===13&&n[i+3]===10)return i+4}return-1}function Ol(n){if(n[Symbol.asyncIterator])return n;const t=n.getReader();return{async next(){try{const e=await t.read();return e!=null&&e.done&&t.releaseLock(),e}catch(e){throw t.releaseLock(),e}},async return(){const e=t.cancel();return t.releaseLock(),await e,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}class pn{constructor(t,e){this.iterator=t,this.controller=e}static fromSSEResponse(t,e){let i=!1;async function*r(){if(i)throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");i=!0;let s=!1;try{for await(const a of Zb(t,e)){if(a.event==="completion")try{yield JSON.parse(a.data)}catch(o){throw console.error("Could not parse message into JSON:",a.data),console.error("From chunk:",a.raw),o}if(a.event==="message_start"||a.event==="message_delta"||a.event==="message_stop"||a.event==="content_block_start"||a.event==="content_block_delta"||a.event==="content_block_stop")try{yield JSON.parse(a.data)}catch(o){throw console.error("Could not parse message into JSON:",a.data),console.error("From chunk:",a.raw),o}if(a.event!=="ping"&&a.event==="error")throw Ae.generate(void 0,`SSE Error: ${a.data}`,a.data,Kf(t.headers))}s=!0}catch(a){if(a instanceof Error&&a.name==="AbortError")return;throw a}finally{s||e.abort()}}return new pn(r,e)}static fromReadableStream(t,e){let i=!1;async function*r(){const a=new rs,o=Ol(t);for await(const c of o)for(const l of a.decode(c))yield l;for(const c of a.flush())yield c}async function*s(){if(i)throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");i=!0;let a=!1;try{for await(const o of r())a||o&&(yield JSON.parse(o));a=!0}catch(o){if(o instanceof Error&&o.name==="AbortError")return;throw o}finally{a||e.abort()}}return new pn(s,e)}[Symbol.asyncIterator](){return this.iterator()}tee(){const t=[],e=[],i=this.iterator(),r=s=>({next:()=>{if(s.length===0){const a=i.next();t.push(a),e.push(a)}return s.shift()}});return[new pn(()=>r(t),this.controller),new pn(()=>r(e),this.controller)]}toReadableStream(){const t=this;let e;const i=new TextEncoder;return new Ff({async start(){e=t[Symbol.asyncIterator]()},async pull(r){try{const{value:s,done:a}=await e.next();if(a)return r.close();const o=i.encode(JSON.stringify(s)+`
`);r.enqueue(o)}catch(s){r.error(s)}},async cancel(){var r;await((r=e.return)==null?void 0:r.call(e))}})}}async function*Zb(n,t){if(!n.body)throw t.abort(),new Wt("Attempted to iterate over a response with no body");const e=new Qb,i=new rs,r=Ol(n.body);for await(const s of Jb(r))for(const a of i.decode(s)){const o=e.decode(a);o&&(yield o)}for(const s of i.flush()){const a=e.decode(s);a&&(yield a)}}async function*Jb(n){let t=new Uint8Array;for await(const e of n){if(e==null)continue;const i=e instanceof ArrayBuffer?new Uint8Array(e):typeof e=="string"?new TextEncoder().encode(e):e;let r=new Uint8Array(t.length+i.length);r.set(t),r.set(i,t.length),t=r;let s;for(;(s=Kb(t))!==-1;)yield t.slice(0,s),t=t.slice(s)}t.length>0&&(yield t)}class Qb{constructor(){this.event=null,this.data=[],this.chunks=[]}decode(t){if(t.endsWith("\r")&&(t=t.substring(0,t.length-1)),!t){if(!this.event&&!this.data.length)return null;const s={event:this.event,data:this.data.join(`
`),raw:this.chunks};return this.event=null,this.data=[],this.chunks=[],s}if(this.chunks.push(t),t.startsWith(":"))return null;let[e,i,r]=tw(t,":");return r.startsWith(" ")&&(r=r.substring(1)),e==="event"?this.event=r:e==="data"&&this.data.push(r),null}}function tw(n,t){const e=n.indexOf(t);return e!==-1?[n.substring(0,e),t,n.substring(e+t.length)]:[n,"",""]}const ew=n=>n!=null&&typeof n=="object"&&typeof n.url=="string"&&typeof n.blob=="function",nw=n=>n!=null&&typeof n=="object"&&typeof n.name=="string"&&typeof n.lastModified=="number"&&Va(n),Va=n=>n!=null&&typeof n=="object"&&typeof n.size=="number"&&typeof n.type=="string"&&typeof n.text=="function"&&typeof n.slice=="function"&&typeof n.arrayBuffer=="function";async function iw(n,t,e){var r;if(n=await n,nw(n))return n;if(ew(n)){const s=await n.blob();t||(t=new URL(n.url).pathname.split(/[\\/]/).pop()??"unknown_file");const a=Va(s)?[await s.arrayBuffer()]:[s];return new rl(a,t,e)}const i=await rw(n);if(t||(t=aw(n)??"unknown_file"),!(e!=null&&e.type)){const s=(r=i[0])==null?void 0:r.type;typeof s=="string"&&(e={...e,type:s})}return new rl(i,t,e)}async function rw(n){var e;let t=[];if(typeof n=="string"||ArrayBuffer.isView(n)||n instanceof ArrayBuffer)t.push(n);else if(Va(n))t.push(await n.arrayBuffer());else if(ow(n))for await(const i of n)t.push(i);else throw new Error(`Unexpected data type: ${typeof n}; constructor: ${(e=n==null?void 0:n.constructor)==null?void 0:e.name}; props: ${sw(n)}`);return t}function sw(n){return`[${Object.getOwnPropertyNames(n).map(e=>`"${e}"`).join(", ")}]`}function aw(n){var t;return ko(n.name)||ko(n.filename)||((t=ko(n.path))==null?void 0:t.split(/[\\/]/).pop())}const ko=n=>{if(typeof n=="string")return n;if(typeof Buffer<"u"&&n instanceof Buffer)return String(n)},ow=n=>n!=null&&typeof n=="object"&&typeof n[Symbol.asyncIterator]=="function",Kh=n=>n&&typeof n=="object"&&n.body&&n[Symbol.toStringTag]==="MultipartBody";var Ji={},cw=function(n,t,e,i,r){if(typeof t=="function"?n!==t||!0:!t.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t.set(n,e),e},lw=function(n,t,e,i){if(typeof t=="function"?n!==t||!i:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?i:e==="a"?i.call(n):i?i.value:t.get(n)},Hs;async function Yf(n){const{response:t}=n;if(n.options.stream)return Qi("response",t.status,t.url,t.headers,t.body),n.options.__streamClass?n.options.__streamClass.fromSSEResponse(t,n.controller):pn.fromSSEResponse(t,n.controller);if(t.status===204)return null;if(n.options.__binaryResponse)return t;const e=t.headers.get("content-type");if((e==null?void 0:e.includes("application/json"))||(e==null?void 0:e.includes("application/vnd.api+json"))){const s=await t.json();return Qi("response",t.status,t.url,t.headers,s),jf(s,t)}const r=await t.text();return Qi("response",t.status,t.url,t.headers,r),r}function jf(n,t){return!n||typeof n!="object"||Array.isArray(n)?n:Object.defineProperty(n,"_request_id",{value:t.headers.get("request-id"),enumerable:!1})}class Ga extends Promise{constructor(t,e=Yf){super(i=>{i(null)}),this.responsePromise=t,this.parseResponse=e}_thenUnwrap(t){return new Ga(this.responsePromise,async e=>jf(t(await this.parseResponse(e),e),e.response))}asResponse(){return this.responsePromise.then(t=>t.response)}async withResponse(){const[t,e]=await Promise.all([this.parse(),this.asResponse()]);return{data:t,response:e,request_id:e.headers.get("request-id")}}parse(){return this.parsedPromise||(this.parsedPromise=this.responsePromise.then(this.parseResponse)),this.parsedPromise}then(t,e){return this.parse().then(t,e)}catch(t){return this.parse().catch(t)}finally(t){return this.parse().finally(t)}}class uw{constructor({baseURL:t,maxRetries:e=2,timeout:i=6e5,httpAgent:r,fetch:s}){this.baseURL=t,this.maxRetries=zo("maxRetries",e),this.timeout=zo("timeout",i),this.httpAgent=r,this.fetch=s??Uf}authHeaders(t){return{}}defaultHeaders(t){return{Accept:"application/json","Content-Type":"application/json","User-Agent":this.getUserAgent(),...gw(),...this.authHeaders(t)}}validateHeaders(t,e){}defaultIdempotencyKey(){return`stainless-node-retry-${Mw()}`}get(t,e){return this.methodRequest("get",t,e)}post(t,e){return this.methodRequest("post",t,e)}patch(t,e){return this.methodRequest("patch",t,e)}put(t,e){return this.methodRequest("put",t,e)}delete(t,e){return this.methodRequest("delete",t,e)}methodRequest(t,e,i){return this.request(Promise.resolve(i).then(async r=>{const s=r&&Va(r==null?void 0:r.body)?new DataView(await r.body.arrayBuffer()):(r==null?void 0:r.body)instanceof DataView?r.body:(r==null?void 0:r.body)instanceof ArrayBuffer?new DataView(r.body):r&&ArrayBuffer.isView(r==null?void 0:r.body)?new DataView(r.body.buffer):r==null?void 0:r.body;return{method:t,path:e,...r,body:s}}))}getAPIList(t,e,i){return this.requestAPIList(e,{method:"get",path:t,...i})}calculateContentLength(t){if(typeof t=="string"){if(typeof Buffer<"u")return Buffer.byteLength(t,"utf8").toString();if(typeof TextEncoder<"u")return new TextEncoder().encode(t).length.toString()}else if(ArrayBuffer.isView(t))return t.byteLength.toString();return null}buildRequest(t,{retryCount:e=0}={}){var g;t={...t};const{method:i,path:r,query:s,headers:a={}}=t,o=ArrayBuffer.isView(t.body)||t.__binaryRequest&&typeof t.body=="string"?t.body:Kh(t.body)?t.body.body:t.body?JSON.stringify(t.body,null,2):null,c=this.calculateContentLength(o),l=this.buildURL(r,s);"timeout"in t&&zo("timeout",t.timeout),t.timeout=t.timeout??this.timeout;const u=t.httpAgent??this.httpAgent??Of(l),h=t.timeout+1e3;typeof((g=u==null?void 0:u.options)==null?void 0:g.timeout)=="number"&&h>(u.options.timeout??0)&&(u.options.timeout=h),this.idempotencyHeader&&i!=="get"&&(t.idempotencyKey||(t.idempotencyKey=this.defaultIdempotencyKey()),a[this.idempotencyHeader]=t.idempotencyKey);const d=this.buildHeaders({options:t,headers:a,contentLength:c,retryCount:e});return{req:{method:i,...o&&{body:o},headers:d,...u&&{agent:u},signal:t.signal??null},url:l,timeout:t.timeout}}buildHeaders({options:t,headers:e,contentLength:i,retryCount:r}){const s={};i&&(s["content-length"]=i);const a=this.defaultHeaders(t);return td(s,a),td(s,e),Kh(t.body)&&zr!=="node"&&delete s["content-type"],Vs(a,"x-stainless-retry-count")===void 0&&Vs(e,"x-stainless-retry-count")===void 0&&(s["x-stainless-retry-count"]=String(r)),Vs(a,"x-stainless-timeout")===void 0&&Vs(e,"x-stainless-timeout")===void 0&&t.timeout&&(s["x-stainless-timeout"]=String(t.timeout)),this.validateHeaders(s,e),s}_calculateNonstreamingTimeout(t){if(3600*t/128e3>600)throw new Wt("Streaming is strongly recommended for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-python#streaming-responses for more details");return 600*1e3}async prepareOptions(t){}async prepareRequest(t,{url:e,options:i}){}parseHeaders(t){return t?Symbol.iterator in t?Object.fromEntries(Array.from(t).map(e=>[...e])):{...t}:{}}makeStatusError(t,e,i,r){return Ae.generate(t,e,i,r)}request(t,e=null){return new Ga(this.makeRequest(t,e))}async makeRequest(t,e){var h,d;const i=await t,r=i.maxRetries??this.maxRetries;e==null&&(e=r),await this.prepareOptions(i);const{req:s,url:a,timeout:o}=this.buildRequest(i,{retryCount:r-e});if(await this.prepareRequest(s,{url:a,options:i}),Qi("request",a,i,s.headers),(h=i.signal)!=null&&h.aborted)throw new on;const c=new AbortController,l=await this.fetchWithTimeout(a,s,o,c).catch(sl);if(l instanceof Error){if((d=i.signal)!=null&&d.aborted)throw new on;if(e)return this.retryRequest(i,e);throw l.name==="AbortError"?new kf:new Ha({cause:l})}const u=Kf(l.headers);if(!l.ok){if(e&&this.shouldRetry(l)){const b=`retrying, ${e} attempts remaining`;return Qi(`response (error; ${b})`,l.status,a,u),this.retryRequest(i,e,u)}const f=await l.text().catch(b=>sl(b).message),g=_w(f),_=g?void 0:f;throw Qi(`response (error; ${e?"(error; no more retries left)":"(error; not retryable)"})`,l.status,a,u,_),this.makeStatusError(l.status,g,_,u)}return{response:l,options:i,controller:c}}requestAPIList(t,e){const i=this.makeRequest(e,null);return new dw(this,i,t)}buildURL(t,e){const i=vw(t)?new URL(t):new URL(this.baseURL+(this.baseURL.endsWith("/")&&t.startsWith("/")?t.slice(1):t)),r=this.defaultQuery();return Pa(r)||(e={...r,...e}),typeof e=="object"&&e&&!Array.isArray(e)&&(i.search=this.stringifyQuery(e)),i.toString()}stringifyQuery(t){return Object.entries(t).filter(([e,i])=>typeof i<"u").map(([e,i])=>{if(typeof i=="string"||typeof i=="number"||typeof i=="boolean")return`${encodeURIComponent(e)}=${encodeURIComponent(i)}`;if(i===null)return`${encodeURIComponent(e)}=`;throw new Wt(`Cannot stringify type ${typeof i}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)}).join("&")}async fetchWithTimeout(t,e,i,r){const{signal:s,...a}=e||{};s&&s.addEventListener("abort",()=>r.abort());const o=setTimeout(()=>r.abort(),i),c={signal:r.signal,...a};c.method&&(c.method=c.method.toUpperCase());const l=60*1e3,u=setTimeout(()=>{var h,d;if(c&&((h=c==null?void 0:c.agent)!=null&&h.sockets))for(const f of Object.values((d=c==null?void 0:c.agent)==null?void 0:d.sockets).flat())f!=null&&f.setKeepAlive&&f.setKeepAlive(!0,l)},l);return this.fetch.call(void 0,t,c).finally(()=>{clearTimeout(o),clearTimeout(u)})}shouldRetry(t){const e=t.headers.get("x-should-retry");return e==="true"?!0:e==="false"?!1:t.status===408||t.status===409||t.status===429||t.status>=500}async retryRequest(t,e,i){let r;const s=i==null?void 0:i["retry-after-ms"];if(s){const o=parseFloat(s);Number.isNaN(o)||(r=o)}const a=i==null?void 0:i["retry-after"];if(a&&!r){const o=parseFloat(a);Number.isNaN(o)?r=Date.parse(a)-Date.now():r=o*1e3}if(!(r&&0<=r&&r<60*1e3)){const o=t.maxRetries??this.maxRetries;r=this.calculateDefaultRetryTimeoutMillis(e,o)}return await yw(r),this.makeRequest(t,e-1)}calculateDefaultRetryTimeoutMillis(t,e){const s=e-t,a=Math.min(.5*Math.pow(2,s),8),o=1-Math.random()*.25;return a*o*1e3}getUserAgent(){return`${this.constructor.name}/JS ${Hi}`}}class hw{constructor(t,e,i,r){Hs.set(this,void 0),cw(this,Hs,t),this.options=r,this.response=e,this.body=i}hasNextPage(){return this.getPaginatedItems().length?this.nextPageInfo()!=null:!1}async getNextPage(){const t=this.nextPageInfo();if(!t)throw new Wt("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");const e={...this.options};if("params"in t&&typeof e.query=="object")e.query={...e.query,...t.params};else if("url"in t){const i=[...Object.entries(e.query||{}),...t.url.searchParams.entries()];for(const[r,s]of i)t.url.searchParams.set(r,s);e.query=void 0,e.path=t.url.toString()}return await lw(this,Hs,"f").requestAPIList(this.constructor,e)}async*iterPages(){let t=this;for(yield t;t.hasNextPage();)t=await t.getNextPage(),yield t}async*[(Hs=new WeakMap,Symbol.asyncIterator)](){for await(const t of this.iterPages())for(const e of t.getPaginatedItems())yield e}}class dw extends Ga{constructor(t,e,i){super(e,async r=>new i(t,r.response,await Yf(r),r.options))}async*[Symbol.asyncIterator](){const t=await this;for await(const e of t)yield e}}const Kf=n=>new Proxy(Object.fromEntries(n.entries()),{get(t,e){const i=e.toString();return t[i.toLowerCase()]||t[i]}}),fw={method:!0,path:!0,query:!0,body:!0,headers:!0,maxRetries:!0,stream:!0,timeout:!0,httpAgent:!0,signal:!0,idempotencyKey:!0,__binaryRequest:!0,__binaryResponse:!0,__streamClass:!0},$n=n=>typeof n=="object"&&n!==null&&!Pa(n)&&Object.keys(n).every(t=>Zf(fw,t)),pw=()=>{var t;if(typeof Deno<"u"&&Deno.build!=null)return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Hi,"X-Stainless-OS":Jh(Deno.build.os),"X-Stainless-Arch":Zh(Deno.build.arch),"X-Stainless-Runtime":"deno","X-Stainless-Runtime-Version":typeof Deno.version=="string"?Deno.version:((t=Deno.version)==null?void 0:t.deno)??"unknown"};if(typeof EdgeRuntime<"u")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Hi,"X-Stainless-OS":"Unknown","X-Stainless-Arch":`other:${EdgeRuntime}`,"X-Stainless-Runtime":"edge","X-Stainless-Runtime-Version":process.version};if(Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Hi,"X-Stainless-OS":Jh(process.platform),"X-Stainless-Arch":Zh(process.arch),"X-Stainless-Runtime":"node","X-Stainless-Runtime-Version":process.version};const n=mw();return n?{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Hi,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":`browser:${n.browser}`,"X-Stainless-Runtime-Version":n.version}:{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Hi,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":"unknown","X-Stainless-Runtime-Version":"unknown"}};function mw(){if(typeof navigator>"u"||!navigator)return null;const n=[{key:"edge",pattern:/Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"chrome",pattern:/Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"firefox",pattern:/Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"safari",pattern:/(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/}];for(const{key:t,pattern:e}of n){const i=e.exec(navigator.userAgent);if(i){const r=i[1]||0,s=i[2]||0,a=i[3]||0;return{browser:t,version:`${r}.${s}.${a}`}}}return null}const Zh=n=>n==="x32"?"x32":n==="x86_64"||n==="x64"?"x64":n==="arm"?"arm":n==="aarch64"||n==="arm64"?"arm64":n?`other:${n}`:"unknown",Jh=n=>(n=n.toLowerCase(),n.includes("ios")?"iOS":n==="android"?"Android":n==="darwin"?"MacOS":n==="win32"?"Windows":n==="freebsd"?"FreeBSD":n==="openbsd"?"OpenBSD":n==="linux"?"Linux":n?`Other:${n}`:"Unknown");let Qh;const gw=()=>Qh??(Qh=pw()),_w=n=>{try{return JSON.parse(n)}catch{return}},xw=/^[a-z][a-z0-9+.-]*:/i,vw=n=>xw.test(n),yw=n=>new Promise(t=>setTimeout(t,n)),zo=(n,t)=>{if(typeof t!="number"||!Number.isInteger(t))throw new Wt(`${n} must be an integer`);if(t<0)throw new Wt(`${n} must be a positive integer`);return t},sl=n=>{if(n instanceof Error)return n;if(typeof n=="object"&&n!==null)try{return new Error(JSON.stringify(n))}catch{}return new Error(String(n))},Ho=n=>{var t,e,i,r;if(typeof process<"u")return((t=Ji==null?void 0:Ji[n])==null?void 0:t.trim())??void 0;if(typeof Deno<"u")return(r=(i=(e=Deno.env)==null?void 0:e.get)==null?void 0:i.call(e,n))==null?void 0:r.trim()};function Pa(n){if(!n)return!0;for(const t in n)return!1;return!0}function Zf(n,t){return Object.prototype.hasOwnProperty.call(n,t)}function td(n,t){for(const e in t){if(!Zf(t,e))continue;const i=e.toLowerCase();if(!i)continue;const r=t[e];r===null?delete n[i]:r!==void 0&&(n[i]=r)}}function Qi(n,...t){typeof process<"u"&&(Ji==null?void 0:Ji.DEBUG)==="true"&&console.log(`Anthropic:DEBUG:${n}`,...t)}const Mw=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,n=>{const t=Math.random()*16|0;return(n==="x"?t:t&3|8).toString(16)}),Sw=()=>typeof window<"u"&&typeof window.document<"u"&&typeof navigator<"u",Ew=n=>typeof(n==null?void 0:n.get)=="function",Vs=(n,t)=>{var i;const e=t.toLowerCase();if(Ew(n)){const r=((i=t[0])==null?void 0:i.toUpperCase())+t.substring(1).replace(/([^\w])(\w)/g,(s,a,o)=>a+o.toUpperCase());for(const s of[t,e,t.toUpperCase(),r]){const a=n.get(s);if(a)return a}}for(const[r,s]of Object.entries(n))if(r.toLowerCase()===e)return Array.isArray(s)?(s.length<=1||console.warn(`Received ${s.length} entries for the ${t} header, using the first entry.`),s[0]):s};class Wa extends hw{constructor(t,e,i,r){super(t,e,i,r),this.data=i.data||[],this.has_more=i.has_more||!1,this.first_id=i.first_id||null,this.last_id=i.last_id||null}getPaginatedItems(){return this.data??[]}hasNextPage(){return this.has_more===!1?!1:super.hasNextPage()}nextPageParams(){const t=this.nextPageInfo();if(!t)return null;if("params"in t)return t.params;const e=Object.fromEntries(t.url.searchParams);return Object.keys(e).length?e:null}nextPageInfo(){var e;if((e=this.options.query)!=null&&e.before_id){const i=this.first_id;return i?{params:{before_id:i}}:null}const t=this.last_id;return t?{params:{after_id:t}}:null}}class Qn{constructor(t){this._client=t}}let Bl=class extends Qn{retrieve(t,e){return this._client.get(`/v1/models/${t}?beta=true`,e)}list(t={},e){return $n(t)?this.list({},t):this._client.getAPIList("/v1/models?beta=true",kl,{query:t,...e})}};class kl extends Wa{}Bl.BetaModelInfosPage=kl;class Xa{constructor(t,e){this.iterator=t,this.controller=e}async*decoder(){const t=new rs;for await(const e of this.iterator)for(const i of t.decode(e))yield JSON.parse(i);for(const e of t.flush())yield JSON.parse(e)}[Symbol.asyncIterator](){return this.decoder()}static fromResponse(t,e){if(!t.body)throw e.abort(),new Wt("Attempted to iterate over a response with no body");return new Xa(Ol(t.body),e)}}let zl=class extends Qn{create(t,e){const{betas:i,...r}=t;return this._client.post("/v1/messages/batches?beta=true",{body:r,...e,headers:{"anthropic-beta":[...i??[],"message-batches-2024-09-24"].toString(),...e==null?void 0:e.headers}})}retrieve(t,e={},i){if($n(e))return this.retrieve(t,{},e);const{betas:r}=e;return this._client.get(`/v1/messages/batches/${t}?beta=true`,{...i,headers:{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString(),...i==null?void 0:i.headers}})}list(t={},e){if($n(t))return this.list({},t);const{betas:i,...r}=t;return this._client.getAPIList("/v1/messages/batches?beta=true",Hl,{query:r,...e,headers:{"anthropic-beta":[...i??[],"message-batches-2024-09-24"].toString(),...e==null?void 0:e.headers}})}delete(t,e={},i){if($n(e))return this.delete(t,{},e);const{betas:r}=e;return this._client.delete(`/v1/messages/batches/${t}?beta=true`,{...i,headers:{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString(),...i==null?void 0:i.headers}})}cancel(t,e={},i){if($n(e))return this.cancel(t,{},e);const{betas:r}=e;return this._client.post(`/v1/messages/batches/${t}/cancel?beta=true`,{...i,headers:{"anthropic-beta":[...r??[],"message-batches-2024-09-24"].toString(),...i==null?void 0:i.headers}})}async results(t,e={},i){if($n(e))return this.results(t,{},e);const r=await this.retrieve(t);if(!r.results_url)throw new Wt(`No batch \`results_url\`; Has it finished processing? ${r.processing_status} - ${r.id}`);const{betas:s}=e;return this._client.get(r.results_url,{...i,headers:{"anthropic-beta":[...s??[],"message-batches-2024-09-24"].toString(),Accept:"application/binary",...i==null?void 0:i.headers},__binaryResponse:!0})._thenUnwrap((a,o)=>Xa.fromResponse(o.response,o.controller))}};class Hl extends Wa{}zl.BetaMessageBatchesPage=Hl;const bw=n=>{let t=0,e=[];for(;t<n.length;){let i=n[t];if(i==="\\"){t++;continue}if(i==="{"){e.push({type:"brace",value:"{"}),t++;continue}if(i==="}"){e.push({type:"brace",value:"}"}),t++;continue}if(i==="["){e.push({type:"paren",value:"["}),t++;continue}if(i==="]"){e.push({type:"paren",value:"]"}),t++;continue}if(i===":"){e.push({type:"separator",value:":"}),t++;continue}if(i===","){e.push({type:"delimiter",value:","}),t++;continue}if(i==='"'){let o="",c=!1;for(i=n[++t];i!=='"';){if(t===n.length){c=!0;break}if(i==="\\"){if(t++,t===n.length){c=!0;break}o+=i+n[t],i=n[++t]}else o+=i,i=n[++t]}i=n[++t],c||e.push({type:"string",value:o});continue}if(i&&/\s/.test(i)){t++;continue}let s=/[0-9]/;if(i&&s.test(i)||i==="-"||i==="."){let o="";for(i==="-"&&(o+=i,i=n[++t]);i&&s.test(i)||i===".";)o+=i,i=n[++t];e.push({type:"number",value:o});continue}let a=/[a-z]/i;if(i&&a.test(i)){let o="";for(;i&&a.test(i)&&t!==n.length;)o+=i,i=n[++t];if(o=="true"||o=="false"||o==="null")e.push({type:"name",value:o});else{t++;continue}continue}t++}return e},Vi=n=>{if(n.length===0)return n;let t=n[n.length-1];switch(t.type){case"separator":return n=n.slice(0,n.length-1),Vi(n);case"number":let e=t.value[t.value.length-1];if(e==="."||e==="-")return n=n.slice(0,n.length-1),Vi(n);case"string":let i=n[n.length-2];if((i==null?void 0:i.type)==="delimiter")return n=n.slice(0,n.length-1),Vi(n);if((i==null?void 0:i.type)==="brace"&&i.value==="{")return n=n.slice(0,n.length-1),Vi(n);break;case"delimiter":return n=n.slice(0,n.length-1),Vi(n)}return n},ww=n=>{let t=[];return n.map(e=>{e.type==="brace"&&(e.value==="{"?t.push("}"):t.splice(t.lastIndexOf("}"),1)),e.type==="paren"&&(e.value==="["?t.push("]"):t.splice(t.lastIndexOf("]"),1))}),t.length>0&&t.reverse().map(e=>{e==="}"?n.push({type:"brace",value:"}"}):e==="]"&&n.push({type:"paren",value:"]"})}),n},Tw=n=>{let t="";return n.map(e=>{switch(e.type){case"string":t+='"'+e.value+'"';break;default:t+=e.value;break}}),t},Jf=n=>JSON.parse(Tw(ww(Vi(bw(n)))));var be=function(n,t,e,i,r){if(i==="m")throw new TypeError("Private method is not writable");if(i==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?n!==t||!r:!t.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return i==="a"?r.call(n,e):r?r.value=e:t.set(n,e),e},Bt=function(n,t,e,i){if(e==="a"&&!i)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?n!==t||!i:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?i:e==="a"?i.call(n):i?i.value:t.get(n)},$e,Gn,Sr,Gs,Er,br,Ws,wr,Rn,Tr,Xs,qs,ki,$s,Ys,Vo,ed,Go,Wo,Xo,qo,nd;const id="__json_buf";class Ia{constructor(){$e.add(this),this.messages=[],this.receivedMessages=[],Gn.set(this,void 0),this.controller=new AbortController,Sr.set(this,void 0),Gs.set(this,()=>{}),Er.set(this,()=>{}),br.set(this,void 0),Ws.set(this,()=>{}),wr.set(this,()=>{}),Rn.set(this,{}),Tr.set(this,!1),Xs.set(this,!1),qs.set(this,!1),ki.set(this,!1),$s.set(this,void 0),Ys.set(this,void 0),Go.set(this,t=>{if(be(this,Xs,!0,"f"),t instanceof Error&&t.name==="AbortError"&&(t=new on),t instanceof on)return be(this,qs,!0,"f"),this._emit("abort",t);if(t instanceof Wt)return this._emit("error",t);if(t instanceof Error){const e=new Wt(t.message);return e.cause=t,this._emit("error",e)}return this._emit("error",new Wt(String(t)))}),be(this,Sr,new Promise((t,e)=>{be(this,Gs,t,"f"),be(this,Er,e,"f")}),"f"),be(this,br,new Promise((t,e)=>{be(this,Ws,t,"f"),be(this,wr,e,"f")}),"f"),Bt(this,Sr,"f").catch(()=>{}),Bt(this,br,"f").catch(()=>{})}get response(){return Bt(this,$s,"f")}get request_id(){return Bt(this,Ys,"f")}async withResponse(){const t=await Bt(this,Sr,"f");if(!t)throw new Error("Could not resolve a `Response` object");return{data:this,response:t,request_id:t.headers.get("request-id")}}static fromReadableStream(t){const e=new Ia;return e._run(()=>e._fromReadableStream(t)),e}static createMessage(t,e,i){const r=new Ia;for(const s of e.messages)r._addMessageParam(s);return r._run(()=>r._createMessage(t,{...e,stream:!0},{...i,headers:{...i==null?void 0:i.headers,"X-Stainless-Helper-Method":"stream"}})),r}_run(t){t().then(()=>{this._emitFinal(),this._emit("end")},Bt(this,Go,"f"))}_addMessageParam(t){this.messages.push(t)}_addMessage(t,e=!0){this.receivedMessages.push(t),e&&this._emit("message",t)}async _createMessage(t,e,i){var o;const r=i==null?void 0:i.signal;r&&(r.aborted&&this.controller.abort(),r.addEventListener("abort",()=>this.controller.abort())),Bt(this,$e,"m",Wo).call(this);const{response:s,data:a}=await t.create({...e,stream:!0},{...i,signal:this.controller.signal}).withResponse();this._connected(s);for await(const c of a)Bt(this,$e,"m",Xo).call(this,c);if((o=a.controller.signal)!=null&&o.aborted)throw new on;Bt(this,$e,"m",qo).call(this)}_connected(t){this.ended||(be(this,$s,t,"f"),be(this,Ys,t==null?void 0:t.headers.get("request-id"),"f"),Bt(this,Gs,"f").call(this,t),this._emit("connect"))}get ended(){return Bt(this,Tr,"f")}get errored(){return Bt(this,Xs,"f")}get aborted(){return Bt(this,qs,"f")}abort(){this.controller.abort()}on(t,e){return(Bt(this,Rn,"f")[t]||(Bt(this,Rn,"f")[t]=[])).push({listener:e}),this}off(t,e){const i=Bt(this,Rn,"f")[t];if(!i)return this;const r=i.findIndex(s=>s.listener===e);return r>=0&&i.splice(r,1),this}once(t,e){return(Bt(this,Rn,"f")[t]||(Bt(this,Rn,"f")[t]=[])).push({listener:e,once:!0}),this}emitted(t){return new Promise((e,i)=>{be(this,ki,!0,"f"),t!=="error"&&this.once("error",i),this.once(t,e)})}async done(){be(this,ki,!0,"f"),await Bt(this,br,"f")}get currentMessage(){return Bt(this,Gn,"f")}async finalMessage(){return await this.done(),Bt(this,$e,"m",Vo).call(this)}async finalText(){return await this.done(),Bt(this,$e,"m",ed).call(this)}_emit(t,...e){if(Bt(this,Tr,"f"))return;t==="end"&&(be(this,Tr,!0,"f"),Bt(this,Ws,"f").call(this));const i=Bt(this,Rn,"f")[t];if(i&&(Bt(this,Rn,"f")[t]=i.filter(r=>!r.once),i.forEach(({listener:r})=>r(...e))),t==="abort"){const r=e[0];!Bt(this,ki,"f")&&!(i!=null&&i.length)&&Promise.reject(r),Bt(this,Er,"f").call(this,r),Bt(this,wr,"f").call(this,r),this._emit("end");return}if(t==="error"){const r=e[0];!Bt(this,ki,"f")&&!(i!=null&&i.length)&&Promise.reject(r),Bt(this,Er,"f").call(this,r),Bt(this,wr,"f").call(this,r),this._emit("end")}}_emitFinal(){this.receivedMessages.at(-1)&&this._emit("finalMessage",Bt(this,$e,"m",Vo).call(this))}async _fromReadableStream(t,e){var s;const i=e==null?void 0:e.signal;i&&(i.aborted&&this.controller.abort(),i.addEventListener("abort",()=>this.controller.abort())),Bt(this,$e,"m",Wo).call(this),this._connected(null);const r=pn.fromReadableStream(t,this.controller);for await(const a of r)Bt(this,$e,"m",Xo).call(this,a);if((s=r.controller.signal)!=null&&s.aborted)throw new on;Bt(this,$e,"m",qo).call(this)}[(Gn=new WeakMap,Sr=new WeakMap,Gs=new WeakMap,Er=new WeakMap,br=new WeakMap,Ws=new WeakMap,wr=new WeakMap,Rn=new WeakMap,Tr=new WeakMap,Xs=new WeakMap,qs=new WeakMap,ki=new WeakMap,$s=new WeakMap,Ys=new WeakMap,Go=new WeakMap,$e=new WeakSet,Vo=function(){if(this.receivedMessages.length===0)throw new Wt("stream ended without producing a Message with role=assistant");return this.receivedMessages.at(-1)},ed=function(){if(this.receivedMessages.length===0)throw new Wt("stream ended without producing a Message with role=assistant");const e=this.receivedMessages.at(-1).content.filter(i=>i.type==="text").map(i=>i.text);if(e.length===0)throw new Wt("stream ended without producing a content block with type=text");return e.join(" ")},Wo=function(){this.ended||be(this,Gn,void 0,"f")},Xo=function(e){if(this.ended)return;const i=Bt(this,$e,"m",nd).call(this,e);switch(this._emit("streamEvent",e,i),e.type){case"content_block_delta":{const r=i.content.at(-1);switch(e.delta.type){case"text_delta":{r.type==="text"&&this._emit("text",e.delta.text,r.text||"");break}case"citations_delta":{r.type==="text"&&this._emit("citation",e.delta.citation,r.citations??[]);break}case"input_json_delta":{r.type==="tool_use"&&r.input&&this._emit("inputJson",e.delta.partial_json,r.input);break}case"thinking_delta":{r.type==="thinking"&&this._emit("thinking",e.delta.thinking,r.thinking);break}case"signature_delta":{r.type==="thinking"&&this._emit("signature",r.signature);break}default:e.delta}break}case"message_stop":{this._addMessageParam(i),this._addMessage(i,!0);break}case"content_block_stop":{this._emit("contentBlock",i.content.at(-1));break}case"message_start":{be(this,Gn,i,"f");break}}},qo=function(){if(this.ended)throw new Wt("stream has ended, this shouldn't happen");const e=Bt(this,Gn,"f");if(!e)throw new Wt("request ended without sending any chunks");return be(this,Gn,void 0,"f"),e},nd=function(e){let i=Bt(this,Gn,"f");if(e.type==="message_start"){if(i)throw new Wt(`Unexpected event order, got ${e.type} before receiving "message_stop"`);return e.message}if(!i)throw new Wt(`Unexpected event order, got ${e.type} before "message_start"`);switch(e.type){case"message_stop":return i;case"message_delta":return i.stop_reason=e.delta.stop_reason,i.stop_sequence=e.delta.stop_sequence,i.usage.output_tokens=e.usage.output_tokens,i;case"content_block_start":return i.content.push(e.content_block),i;case"content_block_delta":{const r=i.content.at(e.index);switch(e.delta.type){case"text_delta":{(r==null?void 0:r.type)==="text"&&(r.text+=e.delta.text);break}case"citations_delta":{(r==null?void 0:r.type)==="text"&&(r.citations??(r.citations=[]),r.citations.push(e.delta.citation));break}case"input_json_delta":{if((r==null?void 0:r.type)==="tool_use"){let s=r[id]||"";s+=e.delta.partial_json,Object.defineProperty(r,id,{value:s,enumerable:!1,writable:!0}),s&&(r.input=Jf(s))}break}case"thinking_delta":{(r==null?void 0:r.type)==="thinking"&&(r.thinking+=e.delta.thinking);break}case"signature_delta":{(r==null?void 0:r.type)==="thinking"&&(r.signature=e.delta.signature);break}default:e.delta}return i}case"content_block_stop":return i}},Symbol.asyncIterator)](){const t=[],e=[];let i=!1;return this.on("streamEvent",r=>{const s=e.shift();s?s.resolve(r):t.push(r)}),this.on("end",()=>{i=!0;for(const r of e)r.resolve(void 0);e.length=0}),this.on("abort",r=>{i=!0;for(const s of e)s.reject(r);e.length=0}),this.on("error",r=>{i=!0;for(const s of e)s.reject(r);e.length=0}),{next:async()=>t.length?{value:t.shift(),done:!1}:i?{value:void 0,done:!0}:new Promise((s,a)=>e.push({resolve:s,reject:a})).then(s=>s?{value:s,done:!1}:{value:void 0,done:!0}),return:async()=>(this.abort(),{value:void 0,done:!0})}}toReadableStream(){return new pn(this[Symbol.asyncIterator].bind(this),this.controller).toReadableStream()}}const rd={"claude-1.3":"November 6th, 2024","claude-1.3-100k":"November 6th, 2024","claude-instant-1.1":"November 6th, 2024","claude-instant-1.1-100k":"November 6th, 2024","claude-instant-1.2":"November 6th, 2024","claude-3-sonnet-20240229":"July 21st, 2025","claude-2.1":"July 21st, 2025","claude-2.0":"July 21st, 2025"};let qa=class extends Qn{constructor(){super(...arguments),this.batches=new zl(this._client)}create(t,e){const{betas:i,...r}=t;return r.model in rd&&console.warn(`The model '${r.model}' is deprecated and will reach end-of-life on ${rd[r.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`),this._client.post("/v1/messages?beta=true",{body:r,timeout:this._client._options.timeout??(r.stream?6e5:this._client._calculateNonstreamingTimeout(r.max_tokens)),...e,headers:{...(i==null?void 0:i.toString())!=null?{"anthropic-beta":i==null?void 0:i.toString()}:void 0,...e==null?void 0:e.headers},stream:t.stream??!1})}stream(t,e){return Ia.createMessage(this,t,e)}countTokens(t,e){const{betas:i,...r}=t;return this._client.post("/v1/messages/count_tokens?beta=true",{body:r,...e,headers:{"anthropic-beta":[...i??[],"token-counting-2024-11-01"].toString(),...e==null?void 0:e.headers}})}};qa.Batches=zl;qa.BetaMessageBatchesPage=Hl;class ss extends Qn{constructor(){super(...arguments),this.models=new Bl(this._client),this.messages=new qa(this._client)}}ss.Models=Bl;ss.BetaModelInfosPage=kl;ss.Messages=qa;class Qf extends Qn{create(t,e){return this._client.post("/v1/complete",{body:t,timeout:this._client._options.timeout??6e5,...e,stream:t.stream??!1})}}class Vl extends Qn{create(t,e){return this._client.post("/v1/messages/batches",{body:t,...e})}retrieve(t,e){return this._client.get(`/v1/messages/batches/${t}`,e)}list(t={},e){return $n(t)?this.list({},t):this._client.getAPIList("/v1/messages/batches",Gl,{query:t,...e})}delete(t,e){return this._client.delete(`/v1/messages/batches/${t}`,e)}cancel(t,e){return this._client.post(`/v1/messages/batches/${t}/cancel`,e)}async results(t,e){const i=await this.retrieve(t);if(!i.results_url)throw new Wt(`No batch \`results_url\`; Has it finished processing? ${i.processing_status} - ${i.id}`);return this._client.get(i.results_url,{...e,headers:{Accept:"application/binary",...e==null?void 0:e.headers},__binaryResponse:!0})._thenUnwrap((r,s)=>Xa.fromResponse(s.response,s.controller))}}class Gl extends Wa{}Vl.MessageBatchesPage=Gl;var we=function(n,t,e,i,r){if(i==="m")throw new TypeError("Private method is not writable");if(i==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?n!==t||!r:!t.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return i==="a"?r.call(n,e):r?r.value=e:t.set(n,e),e},kt=function(n,t,e,i){if(e==="a"&&!i)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?n!==t||!i:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?i:e==="a"?i.call(n):i?i.value:t.get(n)},Ye,Wn,Ar,js,Rr,Cr,Ks,Pr,Cn,Ir,Zs,Js,zi,Qs,ta,$o,sd,Yo,jo,Ko,Zo,ad;const od="__json_buf";class Da{constructor(){Ye.add(this),this.messages=[],this.receivedMessages=[],Wn.set(this,void 0),this.controller=new AbortController,Ar.set(this,void 0),js.set(this,()=>{}),Rr.set(this,()=>{}),Cr.set(this,void 0),Ks.set(this,()=>{}),Pr.set(this,()=>{}),Cn.set(this,{}),Ir.set(this,!1),Zs.set(this,!1),Js.set(this,!1),zi.set(this,!1),Qs.set(this,void 0),ta.set(this,void 0),Yo.set(this,t=>{if(we(this,Zs,!0,"f"),t instanceof Error&&t.name==="AbortError"&&(t=new on),t instanceof on)return we(this,Js,!0,"f"),this._emit("abort",t);if(t instanceof Wt)return this._emit("error",t);if(t instanceof Error){const e=new Wt(t.message);return e.cause=t,this._emit("error",e)}return this._emit("error",new Wt(String(t)))}),we(this,Ar,new Promise((t,e)=>{we(this,js,t,"f"),we(this,Rr,e,"f")}),"f"),we(this,Cr,new Promise((t,e)=>{we(this,Ks,t,"f"),we(this,Pr,e,"f")}),"f"),kt(this,Ar,"f").catch(()=>{}),kt(this,Cr,"f").catch(()=>{})}get response(){return kt(this,Qs,"f")}get request_id(){return kt(this,ta,"f")}async withResponse(){const t=await kt(this,Ar,"f");if(!t)throw new Error("Could not resolve a `Response` object");return{data:this,response:t,request_id:t.headers.get("request-id")}}static fromReadableStream(t){const e=new Da;return e._run(()=>e._fromReadableStream(t)),e}static createMessage(t,e,i){const r=new Da;for(const s of e.messages)r._addMessageParam(s);return r._run(()=>r._createMessage(t,{...e,stream:!0},{...i,headers:{...i==null?void 0:i.headers,"X-Stainless-Helper-Method":"stream"}})),r}_run(t){t().then(()=>{this._emitFinal(),this._emit("end")},kt(this,Yo,"f"))}_addMessageParam(t){this.messages.push(t)}_addMessage(t,e=!0){this.receivedMessages.push(t),e&&this._emit("message",t)}async _createMessage(t,e,i){var o;const r=i==null?void 0:i.signal;r&&(r.aborted&&this.controller.abort(),r.addEventListener("abort",()=>this.controller.abort())),kt(this,Ye,"m",jo).call(this);const{response:s,data:a}=await t.create({...e,stream:!0},{...i,signal:this.controller.signal}).withResponse();this._connected(s);for await(const c of a)kt(this,Ye,"m",Ko).call(this,c);if((o=a.controller.signal)!=null&&o.aborted)throw new on;kt(this,Ye,"m",Zo).call(this)}_connected(t){this.ended||(we(this,Qs,t,"f"),we(this,ta,t==null?void 0:t.headers.get("request-id"),"f"),kt(this,js,"f").call(this,t),this._emit("connect"))}get ended(){return kt(this,Ir,"f")}get errored(){return kt(this,Zs,"f")}get aborted(){return kt(this,Js,"f")}abort(){this.controller.abort()}on(t,e){return(kt(this,Cn,"f")[t]||(kt(this,Cn,"f")[t]=[])).push({listener:e}),this}off(t,e){const i=kt(this,Cn,"f")[t];if(!i)return this;const r=i.findIndex(s=>s.listener===e);return r>=0&&i.splice(r,1),this}once(t,e){return(kt(this,Cn,"f")[t]||(kt(this,Cn,"f")[t]=[])).push({listener:e,once:!0}),this}emitted(t){return new Promise((e,i)=>{we(this,zi,!0,"f"),t!=="error"&&this.once("error",i),this.once(t,e)})}async done(){we(this,zi,!0,"f"),await kt(this,Cr,"f")}get currentMessage(){return kt(this,Wn,"f")}async finalMessage(){return await this.done(),kt(this,Ye,"m",$o).call(this)}async finalText(){return await this.done(),kt(this,Ye,"m",sd).call(this)}_emit(t,...e){if(kt(this,Ir,"f"))return;t==="end"&&(we(this,Ir,!0,"f"),kt(this,Ks,"f").call(this));const i=kt(this,Cn,"f")[t];if(i&&(kt(this,Cn,"f")[t]=i.filter(r=>!r.once),i.forEach(({listener:r})=>r(...e))),t==="abort"){const r=e[0];!kt(this,zi,"f")&&!(i!=null&&i.length)&&Promise.reject(r),kt(this,Rr,"f").call(this,r),kt(this,Pr,"f").call(this,r),this._emit("end");return}if(t==="error"){const r=e[0];!kt(this,zi,"f")&&!(i!=null&&i.length)&&Promise.reject(r),kt(this,Rr,"f").call(this,r),kt(this,Pr,"f").call(this,r),this._emit("end")}}_emitFinal(){this.receivedMessages.at(-1)&&this._emit("finalMessage",kt(this,Ye,"m",$o).call(this))}async _fromReadableStream(t,e){var s;const i=e==null?void 0:e.signal;i&&(i.aborted&&this.controller.abort(),i.addEventListener("abort",()=>this.controller.abort())),kt(this,Ye,"m",jo).call(this),this._connected(null);const r=pn.fromReadableStream(t,this.controller);for await(const a of r)kt(this,Ye,"m",Ko).call(this,a);if((s=r.controller.signal)!=null&&s.aborted)throw new on;kt(this,Ye,"m",Zo).call(this)}[(Wn=new WeakMap,Ar=new WeakMap,js=new WeakMap,Rr=new WeakMap,Cr=new WeakMap,Ks=new WeakMap,Pr=new WeakMap,Cn=new WeakMap,Ir=new WeakMap,Zs=new WeakMap,Js=new WeakMap,zi=new WeakMap,Qs=new WeakMap,ta=new WeakMap,Yo=new WeakMap,Ye=new WeakSet,$o=function(){if(this.receivedMessages.length===0)throw new Wt("stream ended without producing a Message with role=assistant");return this.receivedMessages.at(-1)},sd=function(){if(this.receivedMessages.length===0)throw new Wt("stream ended without producing a Message with role=assistant");const e=this.receivedMessages.at(-1).content.filter(i=>i.type==="text").map(i=>i.text);if(e.length===0)throw new Wt("stream ended without producing a content block with type=text");return e.join(" ")},jo=function(){this.ended||we(this,Wn,void 0,"f")},Ko=function(e){if(this.ended)return;const i=kt(this,Ye,"m",ad).call(this,e);switch(this._emit("streamEvent",e,i),e.type){case"content_block_delta":{const r=i.content.at(-1);switch(e.delta.type){case"text_delta":{r.type==="text"&&this._emit("text",e.delta.text,r.text||"");break}case"citations_delta":{r.type==="text"&&this._emit("citation",e.delta.citation,r.citations??[]);break}case"input_json_delta":{r.type==="tool_use"&&r.input&&this._emit("inputJson",e.delta.partial_json,r.input);break}case"thinking_delta":{r.type==="thinking"&&this._emit("thinking",e.delta.thinking,r.thinking);break}case"signature_delta":{r.type==="thinking"&&this._emit("signature",r.signature);break}default:e.delta}break}case"message_stop":{this._addMessageParam(i),this._addMessage(i,!0);break}case"content_block_stop":{this._emit("contentBlock",i.content.at(-1));break}case"message_start":{we(this,Wn,i,"f");break}}},Zo=function(){if(this.ended)throw new Wt("stream has ended, this shouldn't happen");const e=kt(this,Wn,"f");if(!e)throw new Wt("request ended without sending any chunks");return we(this,Wn,void 0,"f"),e},ad=function(e){let i=kt(this,Wn,"f");if(e.type==="message_start"){if(i)throw new Wt(`Unexpected event order, got ${e.type} before receiving "message_stop"`);return e.message}if(!i)throw new Wt(`Unexpected event order, got ${e.type} before "message_start"`);switch(e.type){case"message_stop":return i;case"message_delta":return i.stop_reason=e.delta.stop_reason,i.stop_sequence=e.delta.stop_sequence,i.usage.output_tokens=e.usage.output_tokens,i;case"content_block_start":return i.content.push(e.content_block),i;case"content_block_delta":{const r=i.content.at(e.index);switch(e.delta.type){case"text_delta":{(r==null?void 0:r.type)==="text"&&(r.text+=e.delta.text);break}case"citations_delta":{(r==null?void 0:r.type)==="text"&&(r.citations??(r.citations=[]),r.citations.push(e.delta.citation));break}case"input_json_delta":{if((r==null?void 0:r.type)==="tool_use"){let s=r[od]||"";s+=e.delta.partial_json,Object.defineProperty(r,od,{value:s,enumerable:!1,writable:!0}),s&&(r.input=Jf(s))}break}case"thinking_delta":{(r==null?void 0:r.type)==="thinking"&&(r.thinking+=e.delta.thinking);break}case"signature_delta":{(r==null?void 0:r.type)==="thinking"&&(r.signature=e.delta.signature);break}default:e.delta}return i}case"content_block_stop":return i}},Symbol.asyncIterator)](){const t=[],e=[];let i=!1;return this.on("streamEvent",r=>{const s=e.shift();s?s.resolve(r):t.push(r)}),this.on("end",()=>{i=!0;for(const r of e)r.resolve(void 0);e.length=0}),this.on("abort",r=>{i=!0;for(const s of e)s.reject(r);e.length=0}),this.on("error",r=>{i=!0;for(const s of e)s.reject(r);e.length=0}),{next:async()=>t.length?{value:t.shift(),done:!1}:i?{value:void 0,done:!0}:new Promise((s,a)=>e.push({resolve:s,reject:a})).then(s=>s?{value:s,done:!1}:{value:void 0,done:!0}),return:async()=>(this.abort(),{value:void 0,done:!0})}}toReadableStream(){return new pn(this[Symbol.asyncIterator].bind(this),this.controller).toReadableStream()}}class $a extends Qn{constructor(){super(...arguments),this.batches=new Vl(this._client)}create(t,e){return t.model in cd&&console.warn(`The model '${t.model}' is deprecated and will reach end-of-life on ${cd[t.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`),this._client.post("/v1/messages",{body:t,timeout:this._client._options.timeout??(t.stream?6e5:this._client._calculateNonstreamingTimeout(t.max_tokens)),...e,stream:t.stream??!1})}stream(t,e){return Da.createMessage(this,t,e)}countTokens(t,e){return this._client.post("/v1/messages/count_tokens",{body:t,...e})}}const cd={"claude-1.3":"November 6th, 2024","claude-1.3-100k":"November 6th, 2024","claude-instant-1.1":"November 6th, 2024","claude-instant-1.1-100k":"November 6th, 2024","claude-instant-1.2":"November 6th, 2024","claude-3-sonnet-20240229":"July 21st, 2025","claude-2.1":"July 21st, 2025","claude-2.0":"July 21st, 2025"};$a.Batches=Vl;$a.MessageBatchesPage=Gl;class Wl extends Qn{retrieve(t,e){return this._client.get(`/v1/models/${t}`,e)}list(t={},e){return $n(t)?this.list({},t):this._client.getAPIList("/v1/models",Xl,{query:t,...e})}}class Xl extends Wa{}Wl.ModelInfosPage=Xl;var tp;class ne extends uw{constructor({baseURL:t=Ho("ANTHROPIC_BASE_URL"),apiKey:e=Ho("ANTHROPIC_API_KEY")??null,authToken:i=Ho("ANTHROPIC_AUTH_TOKEN")??null,...r}={}){const s={apiKey:e,authToken:i,...r,baseURL:t||"https://api.anthropic.com"};if(!s.dangerouslyAllowBrowser&&Sw())throw new Wt(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);super({baseURL:s.baseURL,timeout:s.timeout??6e5,httpAgent:s.httpAgent,maxRetries:s.maxRetries,fetch:s.fetch}),this.completions=new Qf(this),this.messages=new $a(this),this.models=new Wl(this),this.beta=new ss(this),this._options=s,this.apiKey=e,this.authToken=i}defaultQuery(){return this._options.defaultQuery}defaultHeaders(t){return{...super.defaultHeaders(t),...this._options.dangerouslyAllowBrowser?{"anthropic-dangerous-direct-browser-access":"true"}:void 0,"anthropic-version":"2023-06-01",...this._options.defaultHeaders}}validateHeaders(t,e){if(!(this.apiKey&&t["x-api-key"])&&e["x-api-key"]!==null&&!(this.authToken&&t.authorization)&&e.authorization!==null)throw new Error('Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted')}authHeaders(t){const e=this.apiKeyAuth(t),i=this.bearerAuth(t);return e!=null&&!Pa(e)?e:i!=null&&!Pa(i)?i:{}}apiKeyAuth(t){return this.apiKey==null?{}:{"X-Api-Key":this.apiKey}}bearerAuth(t){return this.authToken==null?{}:{Authorization:`Bearer ${this.authToken}`}}}tp=ne;ne.Anthropic=tp;ne.HUMAN_PROMPT=`

Human:`;ne.AI_PROMPT=`

Assistant:`;ne.DEFAULT_TIMEOUT=6e5;ne.AnthropicError=Wt;ne.APIError=Ae;ne.APIConnectionError=Ha;ne.APIConnectionTimeoutError=kf;ne.APIUserAbortError=on;ne.NotFoundError=Gf;ne.ConflictError=Wf;ne.RateLimitError=qf;ne.BadRequestError=zf;ne.AuthenticationError=Hf;ne.InternalServerError=$f;ne.PermissionDeniedError=Vf;ne.UnprocessableEntityError=Xf;ne.toFile=iw;ne.fileFromPath=Bf;ne.Completions=Qf;ne.Messages=$a;ne.Models=Wl;ne.ModelInfosPage=Xl;ne.Beta=ss;const{HUMAN_PROMPT:kw,AI_PROMPT:zw}=ne,Aw=[{name:"analyze_nanotube_config",description:"Analyse une configuration de nanotubes sur une grille hexagonale et retourne ses propriétés physiques globales",input_schema:{type:"object",properties:{tubes:{type:"array",items:{type:"object",properties:{m:{type:"number"},n:{type:"number"},type:{type:"string"},diameter:{type:"number"},conductivity:{type:"string"},length:{type:"number"}}}}},required:["tubes"]}},{name:"suggest_nanotube",description:"Suggère des paramètres de chiralité (m,n) pour un nanotube selon les propriétés souhaitées",input_schema:{type:"object",properties:{desired_property:{type:"string",enum:["metallic","semiconductor","high-strength","small-diameter","large-diameter"]},position_context:{type:"string",description:"Description de la position sur la grille"}},required:["desired_property"]}},{name:"generate_configuration",description:"Génère une configuration optimale de nanotubes pour remplir une grille hexagonale",input_schema:{type:"object",properties:{grid_radius:{type:"number",description:"Rayon de la grille en hexagones"},optimization_goal:{type:"string",enum:["max-conductivity","max-semiconductor","mixed","uniform-diameter"]}},required:["grid_radius","optimization_goal"]}}];function Rw(n,t){var e;switch(n){case"analyze_nanotube_config":{const{tubes:i=[]}=t,r=i.filter(o=>o.conductivity==="Métallique").length,s=i.reduce((o,c)=>(o[c.type]=(o[c.type]||0)+1,o),{}),a=i.reduce((o,c)=>o+(c.diameter||0),0)/Math.max(1,i.length);return{totalTubes:i.length,metallicCount:r,semiconductorCount:i.length-r,avgDiameter:a.toFixed(3)+" nm",typeDistribution:s,dominantType:((e=Object.entries(s).sort((o,c)=>c[1]-o[1])[0])==null?void 0:e[0])||"aucun"}}case"suggest_nanotube":{const i={metallic:{m:5,n:5,rationale:"Armchair (5,5) — conductivité métallique parfaite"},semiconductor:{m:6,n:2,rationale:"Chiral (6,2) — semi-conducteur avec Eg≈0.5eV"},"high-strength":{m:10,n:10,rationale:"Armchair (10,10) — grand diamètre, haute résistance mécanique"},"small-diameter":{m:4,n:0,rationale:"Zigzag (4,0) — diamètre ~0.31nm, le plus petit SWNT stable"},"large-diameter":{m:15,n:15,rationale:"Armchair (15,15) — grand diamètre ~2nm"}};return i[t.desired_property]||i.metallic}case"generate_configuration":{const i={"max-conductivity":[{m:5,n:5},{m:10,n:10},{m:7,n:7},{m:5,n:5},{m:9,n:9}],"max-semiconductor":[{m:6,n:2},{m:8,n:3},{m:7,n:0},{m:9,n:3},{m:6,n:2}],mixed:[{m:5,n:5},{m:6,n:2},{m:7,n:0},{m:10,n:10},{m:8,n:3}],"uniform-diameter":[{m:6,n:6},{m:6,n:6},{m:6,n:6},{m:6,n:6},{m:6,n:6}]};return{suggestedTubes:i[t.optimization_goal]||i.mixed,gridRadius:t.grid_radius,strategy:t.optimization_goal}}default:return{error:`Tool inconnu: ${n}`}}}const Cw=`Tu es un expert en nanotubes de carbone (CNT) et en physique des matériaux nano.
Tu aides à analyser, optimiser et générer des configurations de nanotubes sur des grilles hexagonales.

Physique des nanotubes que tu maîtrises parfaitement :
- Chiralité (m,n) : armchair si m=n (métallique), zigzag si n=0 (semi-cond.), chiral sinon
- Diamètre : d = (a₀/π)×√(m²+mn+n²) avec a₀ = 0.246 nm
- Conductivité électrique : métallique si (m-n) mod 3 = 0, semi-conducteur sinon
- Band gap : Eg ≈ 0.9/d eV pour les semi-conducteurs (0 pour métalliques)
- SWNT typiques : d entre 0.44 nm et 6 nm

Coordonnées hexagonales : cube (q,r,s) avec q+r+s=0, axial (q,r), distances et voisins standards.

Réponds en français, de façon concise et scientifiquement précise.
Utilise les tools disponibles quand c'est pertinent.`;async function Pw(n,t,e,i){if(!n)throw new Error("Clé API Anthropic non configurée. Allez dans ⚙ Paramètres.");const r=new ne({apiKey:n,dangerouslyAllowBrowser:!0}),s=[{role:"user",content:t}];for(let a=0;a<3;a++){const o=await r.messages.stream({model:"claude-sonnet-4-6",max_tokens:1500,system:Cw,tools:Aw,tool_choice:{type:"auto"},messages:s});let c=[],l="",u=[];for await(const h of o)if(h.type==="content_block_start")h.content_block.type==="text"?l="":h.content_block.type==="tool_use"&&u.push({id:h.content_block.id,name:h.content_block.name,input:""});else if(h.type==="content_block_delta")h.delta.type==="text_delta"?(l+=h.delta.text,e==null||e(h.delta.text)):h.delta.type==="input_json_delta"&&u.length>0&&(u[u.length-1].input+=h.delta.partial_json);else if(h.type==="content_block_stop")l&&(c.push({type:"text",text:l}),l="");else if(h.type==="message_delta"){if(h.delta.stop_reason==="end_turn"){u.forEach(d=>{if(d.input){try{d.input=JSON.parse(d.input)}catch{d.input={}}c.push({type:"tool_use",id:d.id,name:d.name,input:d.input})}}),s.push({role:"assistant",content:c});return}if(h.delta.stop_reason==="tool_use"){u.forEach(f=>{if(f.input){try{f.input=JSON.parse(f.input)}catch{f.input={}}c.push({type:"tool_use",id:f.id,name:f.name,input:f.input})}}),s.push({role:"assistant",content:c});const d=u.map(f=>{const g=Rw(f.name,f.input);return i==null||i(f.name,f.input,g),{type:"tool_result",tool_use_id:f.id,content:JSON.stringify(g)}});s.push({role:"user",content:d}),c=[],u=[]}}}}class Iw{constructor(){this.hexMap=null,this.scene3d=null,this.charts=null,this.omeka=new Gb,this.tubes=new Map,this.horizTubes=new Map,this.hexFaceData=new Map,this.selectedKey=null,this.currentMapId=null,this.gridRadius=5,this.orientation="pointy",this.view="3d",this._activeHexFace=null}init(){this._loadSettings(),this._initHexMap(),this._initScene3D(),this._initCharts(),this._initUI(),requestAnimationFrame(()=>{this._buildGrid(),this._pingOmeka(),this._loadOmekaList()})}_initHexMap(){const t=document.getElementById("hex-svg");this.hexMap=new P0(t),this.hexMap.onSelect(e=>this._onHexSelect(e)),this.hexMap.onAddTube(e=>this._addTubeAt(e))}_initScene3D(){const t=document.getElementById("canvas-3d");this.scene3d=new zb(t),this.scene3d.onSelect(e=>{this.hexMap.selectHex(e),this._onHexSelect(e)}),this.scene3d.onTubeHexSelect(e=>this._onTubeHexSelect(e))}_initCharts(){this.charts=new Hb(document.getElementById("chart-distribution"),document.getElementById("chart-properties"))}_buildGrid(){const t=md(new fe(0,0,0),this.gridRadius);this.hexMap.build(this.gridRadius,this.orientation),this.scene3d.buildGrid(t,this.orientation),this.charts.update(this.tubes)}_onHexSelect(t){this.selectedKey=t;const e=this.tubes.get(t);this._updateTubeEditor(e),this.scene3d.highlightTube(t),document.getElementById("selected-hex-label").textContent=e?`Nanotube (${e.m},${e.n}) — ${e.type}`:`Cellule [${t}]`}_addTubeAt(t){if(this.tubes.has(t)){this._onHexSelect(t);return}const e=Vb(t);this._setTube(t,e),this._onHexSelect(t)}_setTube(t,e){e.hexKey=t,this.tubes.set(t,e),this.hexMap.setTube(t,e),this.scene3d.setTube(t,e),this.charts.update(this.tubes)}_removeTube(t){t&&(this.tubes.delete(t),this.hexMap.removeTube(t),this.scene3d.removeTube(t),this.charts.update(this.tubes),this._updateTubeEditor(null),this.selectedKey=null)}_updateTubeEditor(t){const e=(t==null?void 0:t.m)??5,i=(t==null?void 0:t.n)??5;if(document.getElementById("input-m").value=e,document.getElementById("input-n").value=i,document.getElementById("input-length").value=(t==null?void 0:t.length)??20,document.getElementById("input-rotation").value=(t==null?void 0:t.rotation)??0,document.getElementById("input-color").value=(t==null?void 0:t.color)??"#4ade80",document.getElementById("length-val").textContent=(t==null?void 0:t.length)??20,document.getElementById("rotation-val").textContent=(t==null?void 0:t.rotation)??0,t){const r=document.getElementById("tube-type-badge");r.textContent=t.type.charAt(0).toUpperCase()+t.type.slice(1),r.className=`badge badge-${t.type}`,document.getElementById("prop-diameter").textContent=`${t.diameter.toFixed(3)} nm`,document.getElementById("prop-conductivity").textContent=t.conductivity,document.getElementById("prop-bandgap").textContent=t.isMetallic?"0 eV":`${t.bandGap} eV`}else document.getElementById("tube-type-badge").textContent="—",document.getElementById("tube-type-badge").className="badge",document.getElementById("prop-diameter").textContent="—",document.getElementById("prop-conductivity").textContent="—",document.getElementById("prop-bandgap").textContent="—"}_applyTubeEdits(){if(!this.selectedKey)return;const t=parseInt(document.getElementById("input-m").value)||5,e=parseInt(document.getElementById("input-n").value)||5,i=this.tubes.get(this.selectedKey)||new dn({hexKey:this.selectedKey}),r=new dn({...i.toJSON(),m:t,n:e,length:parseFloat(document.getElementById("input-length").value)||20,rotation:parseFloat(document.getElementById("input-rotation").value)||0,color:document.getElementById("input-color").value,hexKey:this.selectedKey});this._setTube(this.selectedKey,r),this._updateTubeEditor(r)}_onTubeHexSelect({hexKey:t,hexFaceIdx:e,hexFacePos:i,worldPos:r,hexCenterWorld:s,hexNormalWorld:a,faceCentroidWorld:o,loopCentroidWorld:c}){this._activeHexFace={hexKey:t,hexFaceIdx:e,hexFacePos:i,worldPos:r,hexCenterWorld:s,hexNormalWorld:a,faceCentroidWorld:o,loopCentroidWorld:c};const l=`${t}:${e}`;document.getElementById("hf-tube-key").textContent=t,document.getElementById("hf-position").textContent=`i=${i.i} j=${i.j}`;const{m:u,n:h,diameterNm:d}=this._computeChildTubeChirality(t);document.getElementById("hf-horiz-m").value=u,document.getElementById("hf-horiz-n").value=h,document.getElementById("hf-horiz-diameter-info").textContent=`⌀ inscrit ≈ ${d.toFixed(3)} nm`;const f=this.hexFaceData.get(l)||{};document.getElementById("hf-template-select").value=f.templateId||"",f.templateId&&this._renderTemplateFields(f.properties||[]),document.getElementById("hf-omeka-status").textContent="",document.getElementById("hex-face-panel").classList.remove("hidden"),this._loadTemplates()}_computeChildTubeChirality(t){const e=this.tubes.get(t)||this.horizTubesData&&this.horizTubesData.get(t);if(!e)return{m:5,n:5,diameterNm:0};const i=2.5,r=Math.max(6,e.n+e.m),s=e.diameter*i*8/2,o=2*Math.PI*s/(r*Math.sqrt(3)),c=Math.sqrt(3)*o/(i*8),l=Math.max(1,Math.round(Math.PI*c/(.246*Math.sqrt(3))));return{m:l,n:l,diameterNm:c}}async _loadTemplates(){const t=document.getElementById("hf-template-select");if(!(t.options.length>1))try{(await this.omeka.listResourceTemplates()).forEach(i=>{const r=document.createElement("option");r.value=i.id,r.textContent=i.label,t.appendChild(r)})}catch{}}async _onTemplateChange(t){var e,i;if(document.getElementById("hf-template-fields").innerHTML="",!!t)try{const r=await this.omeka.getResourceTemplate(t),s=`${(e=this._activeHexFace)==null?void 0:e.hexKey}:${(i=this._activeHexFace)==null?void 0:i.hexFaceIdx}`,a=this.hexFaceData.get(s)||{};this._renderTemplateFields(r.properties,a.properties)}catch(r){document.getElementById("hf-template-fields").innerHTML=`<span style="color:var(--red);font-size:11px">Erreur template: ${r.message}</span>`}}_renderTemplateFields(t,e=[]){const i=document.getElementById("hf-template-fields");i.innerHTML="",t.forEach(r=>{const s=e.find(c=>c.term===r.term),a=document.createElement("label");a.textContent=r.label||r.term;const o=document.createElement("input");o.type="text",o.dataset.term=r.term,o.value=(s==null?void 0:s.value)||"",a.appendChild(o),i.appendChild(a)})}async _saveHexToOmeka(){if(!this._activeHexFace)return;const{hexKey:t,hexFaceIdx:e,hexFacePos:i}=this._activeHexFace,r=`${t}:${e}`,s=document.getElementById("hf-template-select").value,a=document.querySelectorAll("#hf-template-fields input[data-term]"),o=Array.from(a).map(h=>({term:h.dataset.term,value:h.value})),l={omekaId:(this.hexFaceData.get(r)||{}).omekaId||null,templateId:s,title:`Hex ${t} [${i.i},${i.j}]`,hexKey:t,hexFaceIdx:e,hexFacePos:i,properties:o},u=document.getElementById("hf-omeka-status");u.textContent="Sauvegarde…";try{const h=await this.omeka.saveHexItem(l);l.omekaId=(h==null?void 0:h["o:id"])||l.omekaId,this.hexFaceData.set(r,l),u.textContent=`✓ Sauvegardé (Omeka #${l.omekaId})`}catch(h){u.style.color="var(--red)",u.textContent=`✗ ${h.message}`}}_spawnChildTube(){if(!this._activeHexFace)return;const{hexKey:t,hexFaceIdx:e,hexCenterWorld:i,hexNormalWorld:r,faceCentroidWorld:s,loopCentroidWorld:a}=this._activeHexFace,o=`${t}:${e}`,c=parseInt(document.getElementById("hf-horiz-m").value)||5,l=parseInt(document.getElementById("hf-horiz-n").value)||5,u=parseFloat(document.getElementById("hf-horiz-length").value)||20,h=document.getElementById("hf-horiz-color").value,d=document.getElementById("hf-center-mode").value,f=d==="centroid"?s||i||{x:0,y:0,z:0}:d==="loop"?a||i||{x:0,y:0,z:0}:i||{x:0,y:0,z:0},g=r||{x:1,y:0,z:0},_=new dn({m:c,n:l,length:u,color:h,rotation:0}),m=this.scene3d.addChildTube(_,f,g,o);this.horizTubes.set(o,m),this.horizTubesData=this.horizTubesData||new Map,this.horizTubesData.set(o,_),document.getElementById("hex-face-panel").classList.add("hidden"),this._agentLog("system",`⬡ Nanotube (${c},${l}) depuis hex ${o}`)}_setView(t){this.view=t;const e=document.getElementById("viewport"),i=document.getElementById("panel-left");["3d","hex","split"].forEach(r=>{document.getElementById(`btn-view-${r}`).classList.remove("btn-active")}),document.getElementById(`btn-view-${t}`).classList.add("btn-active"),t==="3d"?(e.style.display="",i.style.display="none"):t==="hex"?(e.style.display="none",i.style.display="",i.style.width="100%"):(e.style.display="",i.style.display="",i.style.width="260px"),setTimeout(()=>this.scene3d._onResize(),50)}async _pingOmeka(){const t=document.getElementById("status-indicator"),e=document.getElementById("status-label");t.className="status-dot status-wait";const i=await this.omeka.ping();t.className=`status-dot ${i?"status-ok":"status-err"}`,e.textContent=i?"Omeka S ✓":"Omeka S ✗"}async _loadOmekaList(){const t=document.getElementById("omeka-list");t.innerHTML='<span style="color:#7a8fa8;font-size:11px">Chargement…</span>';try{const e=await this.omeka.listMaps();if(t.innerHTML="",e.length===0){t.innerHTML='<span style="color:#7a8fa8;font-size:11px">Aucune carte</span>';return}e.forEach(i=>{const r=document.createElement("div");r.className="omeka-item-card",r.innerHTML=`<span>${i.title}</span><span class="id">#${i.id}</span>`,r.addEventListener("click",()=>this._loadMap(i.id)),t.appendChild(r)})}catch(e){t.innerHTML=`<span style="color:#f87171;font-size:11px">${e.message}</span>`}}async _saveMap(){const t=document.getElementById("omeka-item-title").value||"Cartographie NanoTube",e=Array.from(this.tubes.values()).map(i=>i.toJSON());try{const i=await this.omeka.saveMap({omekaId:this.currentMapId,title:t,tubes:e,gridRadius:this.gridRadius,orientation:this.orientation});this.currentMapId=(i==null?void 0:i["o:id"])||this.currentMapId,document.getElementById("omeka-item-id").textContent=this.currentMapId||"—",this._loadOmekaList(),this._agentLog("system",`💾 Carte sauvegardée (Omeka #${this.currentMapId})`)}catch(i){this._agentLog("system",`❌ Erreur sauvegarde: ${i.message}`)}}async _loadMap(t){try{const e=await this.omeka.getMap(t);this.currentMapId=e.omekaId,this.gridRadius=e.gridRadius||5,this.orientation=e.orientation||"pointy",document.getElementById("input-grid-radius").value=this.gridRadius,document.getElementById("input-grid-orient").value=this.orientation,document.getElementById("omeka-item-title").value=e.title,document.getElementById("omeka-item-id").textContent=e.omekaId,this.tubes.clear(),this._buildGrid(),e.tubes.forEach(i=>{const r=dn.fromJSON(i);r.hexKey&&this._setTube(r.hexKey,r)}),this._agentLog("system",`📂 Carte chargée: ${e.title}`)}catch(e){this._agentLog("system",`❌ Erreur chargement: ${e.message}`)}}async _sendAgentMessage(t){if(!t)return;this._agentLog("user",t),document.getElementById("agent-status").className="badge badge-thinking",document.getElementById("agent-status").textContent="Réflexion…",document.getElementById("agent-input").value="";const e=Array.from(this.tubes.values()).map(s=>({m:s.m,n:s.n,type:s.type,diameter:+s.diameter.toFixed(3),conductivity:s.conductivity,length:s.length,hexKey:s.hexKey})),i=`Configuration actuelle: ${e.length} nanotubes sur grille rayon ${this.gridRadius}.
${e.length>0?"Tubes: "+JSON.stringify(e.slice(0,10)):""}

${t}`,r=document.createElement("div");r.className="agent-msg agent",r.textContent="",document.getElementById("agent-messages").appendChild(r),document.getElementById("agent-messages").scrollTop=9999;try{await Pw(this._getApiKey(),i,s=>{r.textContent+=s,document.getElementById("agent-messages").scrollTop=9999},(s,a,o)=>{this._agentLog("system",`🔧 Tool: ${s} → ${JSON.stringify(o).slice(0,120)}…`)}),r.textContent||(r.textContent="(réponse vide)")}catch(s){r.textContent=`⚠ ${s.message}`}document.getElementById("agent-status").className="badge badge-done",document.getElementById("agent-status").textContent="Prêt"}_agentSuggest(){const t=Array.from(this.tubes.values()).map(i=>i.type),e=t.length?t.sort().pop():"aucun";this._sendAgentMessage(`La configuration actuelle contient principalement des nanotubes de type "${e}". Suggère une amélioration pour optimiser la conductivité globale.`)}_agentOptimize(){const t=this.hexMap.getStats();this._sendAgentMessage(`Optimise la disposition de ${t.total} nanotubes sur ${t.hexCount} cellules hexagonales pour maximiser les propriétés semi-conductrices. Distribution actuelle: ${JSON.stringify(t.byType)}`)}_agentLog(t,e){const i=document.createElement("div");i.className=`agent-msg ${t}`,i.textContent=e,document.getElementById("agent-messages").appendChild(i),document.getElementById("agent-messages").scrollTop=9999}_loadSettings(){var a,o,c;const t=Wb();t.url&&this.omeka.configure(t),t.url&&((a=document.getElementById("set-omeka-url"))==null||a.setAttribute("value",t.url)),t.keyId&&((o=document.getElementById("set-omeka-key-id"))==null||o.setAttribute("value",t.keyId)),t.itemSetId&&((c=document.getElementById("set-omeka-set-id"))==null||c.setAttribute("value",t.itemSetId)),this.omeka.configure({url:"http://your-omeka-instance/api",keyId:"your_omeka_key_identity",keyCred:"your_omeka_key_credential",itemSetId:"1"})}_saveSettings(){const t={url:document.getElementById("set-omeka-url").value,keyId:document.getElementById("set-omeka-key-id").value,keyCred:document.getElementById("set-omeka-key-cred").value,itemSetId:parseInt(document.getElementById("set-omeka-set-id").value)||1};Xb(t),this.omeka.configure(t);const e=document.getElementById("set-anthropic-key").value;e&&localStorage.setItem("anthropic-key",e),this.agent=createNanoAgent(this._getApiKey()),document.getElementById("settings-panel").classList.add("hidden"),this._pingOmeka()}_getApiKey(){return localStorage.getItem("anthropic-key")||"your_anthropic_api_key_here"}_initUI(){document.getElementById("btn-new-map").addEventListener("click",()=>{this.tubes.clear(),this.currentMapId=null,document.getElementById("omeka-item-title").value="",document.getElementById("omeka-item-id").textContent="—",this._buildGrid()}),document.getElementById("btn-save-map").addEventListener("click",()=>this._saveMap()),document.getElementById("btn-load-map").addEventListener("click",()=>this._loadOmekaList()),document.getElementById("btn-export").addEventListener("click",()=>{const t=this.scene3d.screenshot(),e=document.createElement("a");e.href=t,e.download="nanotube-scene.png",e.click()}),document.getElementById("btn-view-3d").addEventListener("click",()=>this._setView("3d")),document.getElementById("btn-view-hex").addEventListener("click",()=>this._setView("hex")),document.getElementById("btn-view-split").addEventListener("click",()=>this._setView("split")),document.getElementById("btn-settings").addEventListener("click",()=>{document.getElementById("settings-panel").classList.toggle("hidden")}),document.getElementById("btn-add-tube").addEventListener("click",()=>{this.selectedKey&&this._addTubeAt(this.selectedKey)}),document.getElementById("btn-clear-selection").addEventListener("click",()=>{this.selectedKey=null,this._updateTubeEditor(null)}),document.getElementById("input-grid-radius").addEventListener("change",t=>{this.gridRadius=parseInt(t.target.value)||5,this.tubes.clear(),this._buildGrid()}),document.getElementById("input-grid-orient").addEventListener("change",t=>{this.orientation=t.target.value,this._buildGrid()}),document.getElementById("input-length").addEventListener("input",t=>{document.getElementById("length-val").textContent=t.target.value}),document.getElementById("input-rotation").addEventListener("input",t=>{document.getElementById("rotation-val").textContent=t.target.value}),document.getElementById("input-m").addEventListener("change",()=>this._liveUpdateType()),document.getElementById("input-n").addEventListener("change",()=>this._liveUpdateType()),document.getElementById("btn-apply-tube").addEventListener("click",()=>this._applyTubeEdits()),document.getElementById("btn-delete-tube").addEventListener("click",()=>this._removeTube(this.selectedKey)),document.getElementById("btn-reset-camera").addEventListener("click",()=>this.scene3d.resetCamera()),document.getElementById("btn-toggle-grid").addEventListener("click",()=>this.scene3d.toggleGrid()),document.getElementById("btn-toggle-hexfaces").addEventListener("click",()=>this.scene3d.toggleHexFaces()),document.getElementById("btn-screenshot").addEventListener("click",()=>{const t=this.scene3d.screenshot(),e=document.createElement("a");e.href=t,e.download="nanotube-scene.png",e.click()}),document.getElementById("agent-toggle").addEventListener("click",t=>{t.target.closest("button")||(document.getElementById("agent-panel").classList.toggle("collapsed"),document.getElementById("btn-collapse-agent").textContent=document.getElementById("agent-panel").classList.contains("collapsed")?"▼":"▲")}),document.getElementById("btn-agent-send").addEventListener("click",()=>{this._sendAgentMessage(document.getElementById("agent-input").value.trim())}),document.getElementById("agent-input").addEventListener("keydown",t=>{t.key==="Enter"&&this._sendAgentMessage(t.target.value.trim())}),document.getElementById("btn-agent-suggest").addEventListener("click",()=>this._agentSuggest()),document.getElementById("btn-agent-optimize").addEventListener("click",()=>this._agentOptimize()),document.getElementById("btn-save-settings").addEventListener("click",()=>this._saveSettings()),document.getElementById("settings-close").addEventListener("click",()=>{document.getElementById("settings-panel").classList.add("hidden")}),document.getElementById("hex-face-close").addEventListener("click",()=>{document.getElementById("hex-face-panel").classList.add("hidden")}),document.getElementById("hf-template-select").addEventListener("change",t=>{this._onTemplateChange(t.target.value)}),document.getElementById("hf-save-omeka").addEventListener("click",()=>this._saveHexToOmeka()),document.getElementById("hf-spawn-tube").addEventListener("click",()=>this._spawnChildTube()),document.getElementById("hf-horiz-length").addEventListener("input",t=>{document.getElementById("hf-horiz-length-val").textContent=t.target.value}),document.getElementById("modal-close").addEventListener("click",()=>{document.getElementById("modal-overlay").classList.add("hidden")}),document.getElementById("modal-cancel").addEventListener("click",()=>{document.getElementById("modal-overlay").classList.add("hidden")})}_liveUpdateType(){const t=parseInt(document.getElementById("input-m").value)||0,e=parseInt(document.getElementById("input-n").value)||0,i=new dn({m:t,n:e}),r=document.getElementById("tube-type-badge");r.textContent=i.type.charAt(0).toUpperCase()+i.type.slice(1),r.className=`badge badge-${i.type}`,document.getElementById("prop-diameter").textContent=`${i.diameter.toFixed(3)} nm`,document.getElementById("prop-conductivity").textContent=i.conductivity,document.getElementById("prop-bandgap").textContent=i.isMetallic?"0 eV":`${i.bandGap} eV`}}const ld=new Iw;window.addEventListener("DOMContentLoaded",()=>{ld.init(),window.__nanoApp=ld});
//# sourceMappingURL=index-D2DFGNcj.js.map
