(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.i6(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.e(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.yd(b)
return new s(c,this)}:function(){if(s===null)s=A.yd(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.yd(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
yi(a,b,c,d){return{i:a,p:b,e:c,x:d}},
wN(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.yf==null){A.IK()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.d(A.zB("Return interceptor for "+A.u(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.vN
if(o==null)o=$.vN=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.IR(a)
if(p!=null)return p
if(typeof a=="function")return B.id
s=Object.getPrototypeOf(a)
if(s==null)return B.dt
if(s===Object.prototype)return B.dt
if(typeof q=="function"){o=$.vN
if(o==null)o=$.vN=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.cb,enumerable:false,writable:true,configurable:true})
return B.cb}return B.cb},
xG(a,b){if(a<0||a>4294967295)throw A.d(A.ay(a,0,4294967295,"length",null))
return J.DE(new Array(a),b)},
yY(a,b){if(a<0)throw A.d(A.as("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("z<0>"))},
yX(a,b){if(a<0)throw A.d(A.as("Length must be a non-negative integer: "+a,null))
return A.e(new Array(a),b.h("z<0>"))},
DE(a,b){var s=A.e(a,b.h("z<0>"))
s.$flags=1
return s},
DF(a,b){var s=t.hO
return J.yq(s.a(a),s.a(b))},
yZ(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
z_(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.yZ(r))break;++b}return b},
z0(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.b(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.yZ(q))break}return b},
fr(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.iB.prototype
return J.lk.prototype}if(typeof a=="string")return J.dB.prototype
if(a==null)return J.iC.prototype
if(typeof a=="boolean")return J.lj.prototype
if(Array.isArray(a))return J.z.prototype
if(typeof a!="object"){if(typeof a=="function")return J.d3.prototype
if(typeof a=="symbol")return J.fU.prototype
if(typeof a=="bigint")return J.fT.prototype
return a}if(a instanceof A.x)return a
return J.wN(a)},
at(a){if(typeof a=="string")return J.dB.prototype
if(a==null)return a
if(Array.isArray(a))return J.z.prototype
if(typeof a!="object"){if(typeof a=="function")return J.d3.prototype
if(typeof a=="symbol")return J.fU.prototype
if(typeof a=="bigint")return J.fT.prototype
return a}if(a instanceof A.x)return a
return J.wN(a)},
bN(a){if(a==null)return a
if(Array.isArray(a))return J.z.prototype
if(typeof a!="object"){if(typeof a=="function")return J.d3.prototype
if(typeof a=="symbol")return J.fU.prototype
if(typeof a=="bigint")return J.fT.prototype
return a}if(a instanceof A.x)return a
return J.wN(a)},
IB(a){if(typeof a=="number")return J.fS.prototype
if(typeof a=="string")return J.dB.prototype
if(a==null)return a
if(!(a instanceof A.x))return J.f7.prototype
return a},
i3(a){if(typeof a=="string")return J.dB.prototype
if(a==null)return a
if(!(a instanceof A.x))return J.f7.prototype
return a},
IC(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.d3.prototype
if(typeof a=="symbol")return J.fU.prototype
if(typeof a=="bigint")return J.fT.prototype
return a}if(a instanceof A.x)return a
return J.wN(a)},
a0(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.fr(a).L(a,b)},
o6(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.IQ(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.at(a).k(a,b)},
yp(a,b,c){return J.bN(a).i(a,b,c)},
fw(a,b){return J.bN(a).j(a,b)},
xs(a,b){return J.i3(a).dK(a,b)},
xt(a,b,c){return J.IC(a).jS(a,b,c)},
Cc(a,b){return J.i3(a).pC(a,b)},
yq(a,b){return J.IB(a).a3(a,b)},
Cd(a,b){return J.at(a).t(a,b)},
o7(a,b){return J.bN(a).ad(a,b)},
Ce(a){return J.bN(a).gbh(a)},
kb(a){return J.bN(a).gI(a)},
am(a){return J.fr(a).gE(a)},
bZ(a){return J.at(a).gK(a)},
Cf(a){return J.at(a).gZ(a)},
aN(a){return J.bN(a).gJ(a)},
aE(a){return J.at(a).gn(a)},
xu(a){return J.fr(a).gai(a)},
yr(a,b){return J.bN(a).S(a,b)},
o8(a,b,c){return J.bN(a).b8(a,b,c)},
Cg(a,b,c){return J.i3(a).cq(a,b,c)},
Ch(a,b){return J.at(a).sn(a,b)},
o9(a,b){return J.bN(a).aS(a,b)},
ys(a,b){return J.bN(a).bn(a,b)},
Ci(a,b){return J.i3(a).u(a,b)},
Cj(a,b,c){return J.bN(a).aq(a,b,c)},
yt(a,b){return J.bN(a).bz(a,b)},
yu(a){return J.bN(a).fu(a)},
b9(a){return J.fr(a).l(a)},
e1(a){return J.i3(a).G(a)},
Ck(a){return J.i3(a).c2(a)},
yv(a,b){return J.bN(a).fz(a,b)},
kc(a,b){return J.bN(a).i9(a,b)},
lh:function lh(){},
lj:function lj(){},
iC:function iC(){},
iD:function iD(){},
dF:function dF(){},
lZ:function lZ(){},
f7:function f7(){},
d3:function d3(){},
fT:function fT(){},
fU:function fU(){},
z:function z(a){this.$ti=a},
li:function li(){},
r0:function r0(a){this.$ti=a},
ea:function ea(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
fS:function fS(){},
iB:function iB(){},
lk:function lk(){},
dB:function dB(){}},A={xI:function xI(){},
oX(a,b,c){if(t.g.b(a))return new A.jr(a,b.h("@<0>").H(c).h("jr<1,2>"))
return new A.ee(a,b.h("@<0>").H(c).h("ee<1,2>"))},
DI(a){return new A.dE("Field '"+a+"' has been assigned during initialization.")},
DK(a){return new A.dE("Field '"+a+"' has not been initialized.")},
DJ(a){return new A.dE("Field '"+a+"' has already been initialized.")},
wO(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
az(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
hx(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dq(a,b,c){return a},
yh(a){var s,r
for(s=$.ca.length,r=0;r<s;++r)if(a===$.ca[r])return!0
return!1},
bx(a,b,c,d){A.bq(b,"start")
if(c!=null){A.bq(c,"end")
if(b>c)A.K(A.ay(b,0,c,"start",null))}return new A.eW(a,b,c,d.h("eW<0>"))},
d6(a,b,c,d){if(t.g.b(a))return new A.eu(a,b,c.h("@<0>").H(d).h("eu<1,2>"))
return new A.bI(a,b,c.h("@<0>").H(d).h("bI<1,2>"))},
zv(a,b,c){var s="takeCount"
A.kq(b,s,t.S)
A.bq(b,s)
if(t.g.b(a))return new A.iu(a,b,c.h("iu<0>"))
return new A.eX(a,b,c.h("eX<0>"))},
zt(a,b,c){var s="count"
if(t.g.b(a)){A.kq(b,s,t.S)
A.bq(b,s)
return new A.fM(a,b,c.h("fM<0>"))}A.kq(b,s,t.S)
A.bq(b,s)
return new A.db(a,b,c.h("db<0>"))},
ce(){return new A.bX("No element")},
yW(){return new A.bX("Too few elements")},
mn(a,b,c,d,e){if(c-b<=32)A.EN(a,b,c,d,e)
else A.EM(a,b,c,d,e)},
EN(a,b,c,d,e){var s,r,q,p,o,n
for(s=b+1,r=J.at(a);s<=c;++s){q=r.k(a,s)
p=s
for(;;){if(p>b){o=d.$2(r.k(a,p-1),q)
if(typeof o!=="number")return o.aP()
o=o>0}else o=!1
if(!o)break
n=p-1
r.i(a,p,r.k(a,n))
p=n}r.i(a,p,q)}},
EM(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j=B.c.W(a5-a4+1,6),i=a4+j,h=a5-j,g=B.c.W(a4+a5,2),f=g-j,e=g+j,d=J.at(a3),c=d.k(a3,i),b=d.k(a3,f),a=d.k(a3,g),a0=d.k(a3,e),a1=d.k(a3,h),a2=a6.$2(c,b)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=b
b=c
c=s}a2=a6.$2(a0,a1)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a1
a1=a0
a0=s}a2=a6.$2(c,a)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a
a=c
c=s}a2=a6.$2(b,a)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a
a=b
b=s}a2=a6.$2(c,a0)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a0
a0=c
c=s}a2=a6.$2(a,a0)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a0
a0=a
a=s}a2=a6.$2(b,a1)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a1
a1=b
b=s}a2=a6.$2(b,a)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a
a=b
b=s}a2=a6.$2(a0,a1)
if(typeof a2!=="number")return a2.aP()
if(a2>0){s=a1
a1=a0
a0=s}d.i(a3,i,c)
d.i(a3,g,a)
d.i(a3,h,a1)
d.i(a3,f,d.k(a3,a4))
d.i(a3,e,d.k(a3,a5))
r=a4+1
q=a5-1
p=J.a0(a6.$2(b,a0),0)
if(p)for(o=r;o<=q;++o){n=d.k(a3,o)
m=a6.$2(n,b)
if(m===0)continue
if(m<0){if(o!==r){d.i(a3,o,d.k(a3,r))
d.i(a3,r,n)}++r}else for(;;){m=a6.$2(d.k(a3,q),b)
if(m>0){--q
continue}else{l=q-1
if(m<0){d.i(a3,o,d.k(a3,r))
k=r+1
d.i(a3,r,d.k(a3,q))
d.i(a3,q,n)
q=l
r=k
break}else{d.i(a3,o,d.k(a3,q))
d.i(a3,q,n)
q=l
break}}}}else for(o=r;o<=q;++o){n=d.k(a3,o)
if(a6.$2(n,b)<0){if(o!==r){d.i(a3,o,d.k(a3,r))
d.i(a3,r,n)}++r}else if(a6.$2(n,a0)>0)for(;;)if(a6.$2(d.k(a3,q),a0)>0){--q
if(q<o)break
continue}else{l=q-1
if(a6.$2(d.k(a3,q),b)<0){d.i(a3,o,d.k(a3,r))
k=r+1
d.i(a3,r,d.k(a3,q))
d.i(a3,q,n)
r=k}else{d.i(a3,o,d.k(a3,q))
d.i(a3,q,n)}q=l
break}}a2=r-1
d.i(a3,a4,d.k(a3,a2))
d.i(a3,a2,b)
a2=q+1
d.i(a3,a5,d.k(a3,a2))
d.i(a3,a2,a0)
A.mn(a3,a4,r-2,a6,a7)
A.mn(a3,q+2,a5,a6,a7)
if(p)return
if(r<i&&q>h){while(J.a0(a6.$2(d.k(a3,r),b),0))++r
while(J.a0(a6.$2(d.k(a3,q),a0),0))--q
for(o=r;o<=q;++o){n=d.k(a3,o)
if(a6.$2(n,b)===0){if(o!==r){d.i(a3,o,d.k(a3,r))
d.i(a3,r,n)}++r}else if(a6.$2(n,a0)===0)for(;;)if(a6.$2(d.k(a3,q),a0)===0){--q
if(q<o)break
continue}else{l=q-1
if(a6.$2(d.k(a3,q),b)<0){d.i(a3,o,d.k(a3,r))
k=r+1
d.i(a3,r,d.k(a3,q))
d.i(a3,q,n)
r=k}else{d.i(a3,o,d.k(a3,q))
d.i(a3,q,n)}q=l
break}}A.mn(a3,r,q,a6,a7)}else A.mn(a3,r,q,a6,a7)},
dQ:function dQ(a){this.a=0
this.b=a},
dR:function dR(){},
ik:function ik(a,b){this.a=a
this.$ti=b},
ee:function ee(a,b){this.a=a
this.$ti=b},
jr:function jr(a,b){this.a=a
this.$ti=b},
jq:function jq(){},
vj:function vj(a,b){this.a=a
this.b=b},
il:function il(a,b){this.a=a
this.$ti=b},
ef:function ef(a,b){this.a=a
this.$ti=b},
oZ:function oZ(a,b){this.a=a
this.b=b},
oY:function oY(a){this.a=a},
dE:function dE(a){this.a=a},
cu:function cu(a){this.a=a},
wZ:function wZ(){},
ta:function ta(){},
J:function J(){},
Q:function Q(){},
eW:function eW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aI:function aI(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bI:function bI(a,b,c){this.a=a
this.b=b
this.$ti=c},
eu:function eu(a,b,c){this.a=a
this.b=b
this.$ti=c},
iM:function iM(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a2:function a2(a,b,c){this.a=a
this.b=b
this.$ti=c},
ae:function ae(a,b,c){this.a=a
this.b=b
this.$ti=c},
f9:function f9(a,b,c){this.a=a
this.b=b
this.$ti=c},
ix:function ix(a,b,c){this.a=a
this.b=b
this.$ti=c},
iy:function iy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
eX:function eX(a,b,c){this.a=a
this.b=b
this.$ti=c},
iu:function iu(a,b,c){this.a=a
this.b=b
this.$ti=c},
jc:function jc(a,b,c){this.a=a
this.b=b
this.$ti=c},
db:function db(a,b,c){this.a=a
this.b=b
this.$ti=c},
fM:function fM(a,b,c){this.a=a
this.b=b
this.$ti=c},
j8:function j8(a,b,c){this.a=a
this.b=b
this.$ti=c},
ev:function ev(a){this.$ti=a},
iv:function iv(a){this.$ti=a},
bL:function bL(a,b){this.a=a
this.$ti=b},
fa:function fa(a,b){this.a=a
this.$ti=b},
aH:function aH(){},
cT:function cT(){},
hA:function hA(){},
j0:function j0(a,b){this.a=a
this.$ti=b},
u0:function u0(){},
k6:function k6(){},
CY(){throw A.d(A.aw("Cannot modify constant Set"))},
Bj(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
IQ(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.Eh.b(a)},
u(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.b9(a)
return s},
dI(a){var s,r=$.ze
if(r==null)r=$.ze=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
bJ(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.b(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
m5(a){var s,r,q,p
if(a instanceof A.x)return A.bM(A.bg(a),null)
s=J.fr(a)
if(s===B.ic||s===B.ie||t.qF.b(a)){r=B.cI(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.bM(A.bg(a),null)},
zl(a){var s,r,q
if(a==null||typeof a=="number"||A.nW(a))return J.b9(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bD)return a.l(0)
if(a instanceof A.b1)return a.jA(!0)
s=$.C1()
for(r=0;r<1;++r){q=s[r].rj(a)
if(q!=null)return q}return"Instance of '"+A.m5(a)+"'"},
Ep(){return Date.now()},
Er(){var s,r
if($.rS!==0)return
$.rS=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.rS=1e6
$.hj=new A.rR(r)},
Eo(){if(!!self.location)return self.location.href
return null},
zd(a){var s,r,q,p,o=a.length
if(o<=500)return String.fromCharCode.apply(null,a)
for(s="",r=0;r<o;r=q){q=r+500
p=q<o?q:o
s+=String.fromCharCode.apply(null,a.slice(r,p))}return s},
Es(a){var s,r,q,p=A.e([],t.t)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.M)(a),++r){q=a[r]
if(!A.hT(q))throw A.d(A.i0(q))
if(q<=65535)B.b.j(p,q)
else if(q<=1114111){B.b.j(p,55296+(B.c.aT(q-65536,10)&1023))
B.b.j(p,56320+(q&1023))}else throw A.d(A.i0(q))}return A.zd(p)},
zm(a){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(!A.hT(q))throw A.d(A.i0(q))
if(q<0)throw A.d(A.i0(q))
if(q>65535)return A.Es(a)}return A.zd(a)},
Et(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
ak(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.aT(s,10)|55296)>>>0,s&1023|56320)}}throw A.d(A.ay(a,0,1114111,null,null))},
Eu(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.bc(h,1000)
g+=B.c.W(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
c4(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
m4(a){return a.c?A.c4(a).getUTCFullYear()+0:A.c4(a).getFullYear()+0},
zj(a){return a.c?A.c4(a).getUTCMonth()+1:A.c4(a).getMonth()+1},
zf(a){return a.c?A.c4(a).getUTCDate()+0:A.c4(a).getDate()+0},
zg(a){return a.c?A.c4(a).getUTCHours()+0:A.c4(a).getHours()+0},
zi(a){return a.c?A.c4(a).getUTCMinutes()+0:A.c4(a).getMinutes()+0},
zk(a){return a.c?A.c4(a).getUTCSeconds()+0:A.c4(a).getSeconds()+0},
zh(a){return a.c?A.c4(a).getUTCMilliseconds()+0:A.c4(a).getMilliseconds()+0},
Eq(a){var s=a.$thrownJsError
if(s==null)return null
return A.bt(s)},
rT(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.aT(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
B_(a){throw A.d(A.i0(a))},
b(a,b){if(a==null)J.aE(a)
throw A.d(A.i2(a,b))},
i2(a,b){var s,r="index"
if(!A.hT(b))return new A.cs(!0,b,r,null)
s=A.a4(J.aE(a))
if(b<0||b>=s)return A.le(b,s,a,null,r)
return A.t_(b,r)},
Iw(a,b,c){if(a<0||a>c)return A.ay(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ay(b,a,c,"end",null)
return new A.cs(!0,b,"end",null)},
i0(a){return new A.cs(!0,a,null,null)},
d(a){return A.aT(a,new Error())},
aT(a,b){var s
if(a==null)a=new A.dd()
b.dartException=a
s=A.Jg
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
Jg(){return J.b9(this.dartException)},
K(a,b){throw A.aT(a,b==null?new Error():b)},
ai(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.K(A.Gm(a,b,c),s)},
Gm(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t._.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.je("'"+s+"': Cannot "+o+" "+l+k+n)},
M(a){throw A.d(A.aG(a))},
de(a){var s,r,q,p,o,n
a=A.Ba(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.e([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.uN(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
uO(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
zz(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
xJ(a,b){var s=b==null,r=s?null:b.method
return new A.ll(a,r,s?null:b.receiver)},
R(a){var s
if(a==null)return new A.lP(a)
if(a instanceof A.iw){s=a.a
return A.e0(a,s==null?A.ap(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.e0(a,a.dartException)
return A.H6(a)},
e0(a,b){if(t.yt.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
H6(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.aT(r,16)&8191)===10)switch(q){case 438:return A.e0(a,A.xJ(A.u(s)+" (Error "+q+")",null))
case 445:case 5007:A.u(s)
return A.e0(a,new A.iW())}}if(a instanceof TypeError){p=$.BE()
o=$.BF()
n=$.BG()
m=$.BH()
l=$.BK()
k=$.BL()
j=$.BJ()
$.BI()
i=$.BN()
h=$.BM()
g=p.bw(s)
if(g!=null)return A.e0(a,A.xJ(A.r(s),g))
else{g=o.bw(s)
if(g!=null){g.method="call"
return A.e0(a,A.xJ(A.r(s),g))}else if(n.bw(s)!=null||m.bw(s)!=null||l.bw(s)!=null||k.bw(s)!=null||j.bw(s)!=null||m.bw(s)!=null||i.bw(s)!=null||h.bw(s)!=null){A.r(s)
return A.e0(a,new A.iW())}}return A.e0(a,new A.mG(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.j9()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.e0(a,new A.cs(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.j9()
return a},
bt(a){var s
if(a instanceof A.iw)return a.b
if(a==null)return new A.jR(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.jR(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
i5(a){if(a==null)return J.am(a)
if(typeof a=="object")return A.dI(a)
return J.am(a)},
Hi(a){if(typeof a=="number")return B.p.gE(a)
if(a instanceof A.nI)return A.dI(a)
if(a instanceof A.b1)return a.gE(a)
if(a instanceof A.u0)return a.gE(0)
return A.i5(a)},
AV(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.i(0,a[s],a[r])}return b},
Gw(a,b,c,d,e,f){t.BO.a(a)
switch(A.a4(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(A.yT("Unsupported number of arguments for wrapped closure"))},
i1(a,b){var s=a.$identity
if(!!s)return s
s=A.Ik(a,b)
a.$identity=s
return s},
Ik(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.Gw)},
CO(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.ms().constructor.prototype):Object.create(new A.fF(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.yK(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.CK(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.yK(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
CK(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.Cz)}throw A.d("Error in functionType of tearoff")},
CL(a,b,c,d){var s=A.yF
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
yK(a,b,c,d){if(c)return A.CN(a,b,d)
return A.CL(b.length,d,a,b)},
CM(a,b,c,d){var s=A.yF,r=A.CA
switch(b?-1:a){case 0:throw A.d(new A.mh("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
CN(a,b,c){var s,r
if($.yD==null)$.yD=A.yC("interceptor")
if($.yE==null)$.yE=A.yC("receiver")
s=b.length
r=A.CM(s,c,a,b)
return r},
yd(a){return A.CO(a)},
Cz(a,b){return A.jZ(v.typeUniverse,A.bg(a.a),b)},
yF(a){return a.a},
CA(a){return a.b},
yC(a){var s,r,q,p=new A.fF("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.d(A.as("Field name "+a+" not found.",null))},
AX(a){return v.getIsolateTag(a)},
Kl(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
IR(a){var s,r,q,p,o,n=A.r($.AY.$1(a)),m=$.wH[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.wV[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.Y($.AN.$2(a,n))
if(q!=null){m=$.wH[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.wV[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.wY(s)
$.wH[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.wV[n]=s
return s}if(p==="-"){o=A.wY(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.B6(a,s)
if(p==="*")throw A.d(A.zB(n))
if(v.leafTags[n]===true){o=A.wY(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.B6(a,s)},
B6(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.yi(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
wY(a){return J.yi(a,!1,null,!!a.$ic1)},
IT(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.wY(s)
else return J.yi(s,c,null,null)},
IK(){if(!0===$.yf)return
$.yf=!0
A.IL()},
IL(){var s,r,q,p,o,n,m,l
$.wH=Object.create(null)
$.wV=Object.create(null)
A.IJ()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.B8.$1(o)
if(n!=null){m=A.IT(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
IJ(){var s,r,q,p,o,n,m=B.fE()
m=A.i_(B.fF,A.i_(B.fG,A.i_(B.cJ,A.i_(B.cJ,A.i_(B.fH,A.i_(B.fI,A.i_(B.fJ(B.cI),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.AY=new A.wP(p)
$.AN=new A.wQ(o)
$.B8=new A.wR(n)},
i_(a,b){return a(b)||b},
FL(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.b(b,s)
if(!J.a0(r,b[s]))return!1}return!0},
Iq(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
xH(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.d(A.an("Illegal RegExp pattern ("+String(o)+")",a,null))},
J9(a,b,c){var s
if(typeof b=="string")return a.indexOf(b,c)>=0
else if(b instanceof A.dC){s=B.a.D(a,c)
return b.b.test(s)}else return!J.xs(b,B.a.D(a,c)).gK(0)},
AU(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
Ba(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
ad(a,b,c){var s
if(typeof b=="string")return A.Jb(a,b,c)
if(b instanceof A.dC){s=b.giX()
s.lastIndex=0
return a.replace(s,A.AU(c))}return A.Ja(a,b,c)},
Ja(a,b,c){var s,r,q,p
for(s=J.xs(b,a),s=s.gJ(s),r=0,q="";s.q();){p=s.gA()
q=q+a.substring(r,p.gP())+c
r=p.gO()}s=q+a.substring(r)
return s.charCodeAt(0)==0?s:s},
Jb(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.Ba(b),"g"),A.AU(c))},
AJ(a){return a},
Bf(a,b,c,d){var s,r,q,p,o,n,m
for(s=b.dK(0,a),s=new A.hF(s.a,s.b,s.c),r=t.he,q=0,p="";s.q();){o=s.d
if(o==null)o=r.a(o)
n=o.b
m=n.index
p=p+A.u(A.AJ(B.a.m(a,q,m)))+A.u(c.$1(o))
q=m+n[0].length}s=p+A.u(A.AJ(B.a.D(a,q)))
return s.charCodeAt(0)==0?s:s},
Bg(a,b,c,d){var s=a.indexOf(b,d)
if(s<0)return a
return A.Bh(a,s,s+b.length,c)},
Bh(a,b,c,d){return a.substring(0,b)+d+a.substring(c)},
aD:function aD(a,b){this.a=a
this.b=b},
jL:function jL(a,b){this.a=a
this.b=b},
dS:function dS(a,b){this.a=a
this.b=b},
dT:function dT(a,b){this.a=a
this.b=b},
hM:function hM(a,b){this.a=a
this.b=b},
bA:function bA(a,b){this.a=a
this.b=b},
dU:function dU(a,b){this.a=a
this.b=b},
jM:function jM(a,b,c){this.a=a
this.b=b
this.c=c},
jN:function jN(a,b,c){this.a=a
this.b=b
this.c=c},
dl:function dl(a){this.a=a},
jO:function jO(a){this.a=a},
fJ:function fJ(){},
pp:function pp(a,b,c){this.a=a
this.b=b
this.c=c},
X:function X(a,b,c){this.a=a
this.b=b
this.$ti=c},
jz:function jz(a,b){this.a=a
this.$ti=b},
dk:function dk(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
iz:function iz(a,b){this.a=a
this.$ti=b},
fK:function fK(){},
B:function B(a,b,c){this.a=a
this.b=b
this.$ti=c},
Z:function Z(a,b){this.a=a
this.$ti=b},
lf:function lf(){},
fQ:function fQ(a,b){this.a=a
this.$ti=b},
rR:function rR(a){this.a=a},
j1:function j1(){},
uN:function uN(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iW:function iW(){},
ll:function ll(a,b,c){this.a=a
this.b=b
this.c=c},
mG:function mG(a){this.a=a},
lP:function lP(a){this.a=a},
iw:function iw(a,b){this.a=a
this.b=b},
jR:function jR(a){this.a=a
this.b=null},
bD:function bD(){},
kF:function kF(){},
kG:function kG(){},
mx:function mx(){},
ms:function ms(){},
fF:function fF(a,b){this.a=a
this.b=b},
mh:function mh(a){this.a=a},
bS:function bS(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
r1:function r1(a){this.a=a},
r6:function r6(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
d5:function d5(a,b){this.a=a
this.$ti=b},
iI:function iI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
c2:function c2(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
d4:function d4(a,b){this.a=a
this.$ti=b},
iH:function iH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
iE:function iE(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ex:function ex(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
wP:function wP(a){this.a=a},
wQ:function wQ(a){this.a=a},
wR:function wR(a){this.a=a},
b1:function b1(){},
cl:function cl(){},
fk:function fk(){},
fl:function fl(){},
dC:function dC(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
hJ:function hJ(a){this.b=a},
mV:function mV(a,b,c){this.a=a
this.b=b
this.c=c},
hF:function hF(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
hv:function hv(a,b){this.a=a
this.c=b},
nA:function nA(a,b,c){this.a=a
this.b=b
this.c=c},
nB:function nB(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
w(a){throw A.aT(A.DK(a),new Error())},
ax(a){throw A.aT(A.DJ(a),new Error())},
i6(a){throw A.aT(A.DI(a),new Error())},
vl(a){var s=new A.vk(a)
return s.b=s},
vk:function vk(a){this.a=a
this.b=null},
Gg(a){return a},
c9(a){var s,r,q
if(t.CP.b(a))return a
s=J.at(a)
r=A.bU(s.gn(a),null,!1,t.z)
for(q=0;q<s.gn(a);++q)B.b.i(r,q,s.k(a,q))
return r},
DS(a){return new Int8Array(a)},
xN(a){return new Uint8Array(a)},
z8(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
dn(a,b,c){if(a>>>0!==a||a>=c)throw A.d(A.i2(b,a))},
Am(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.d(A.Iw(a,b,c))
return b},
dG:function dG(){},
fZ:function fZ(){},
iP:function iP(){},
nN:function nN(a){this.a=a},
iN:function iN(){},
bn:function bn(){},
iO:function iO(){},
c3:function c3(){},
lF:function lF(){},
lG:function lG(){},
lH:function lH(){},
lI:function lI(){},
lJ:function lJ(){},
lK:function lK(){},
iQ:function iQ(){},
iR:function iR(){},
eA:function eA(){},
jD:function jD(){},
jE:function jE(){},
jF:function jF(){},
jG:function jG(){},
xP(a,b){var s=b.c
return s==null?b.c=A.jX(a,"H",[b.x]):s},
zp(a){var s=a.w
if(s===6||s===7)return A.zp(a.x)
return s===11||s===12},
Ez(a){return a.as},
B5(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
al(a){return A.w5(v.typeUniverse,a,!1)},
IO(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.dX(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
dX(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.dX(a1,s,a3,a4)
if(r===s)return a2
return A.A_(a1,r,!0)
case 7:s=a2.x
r=A.dX(a1,s,a3,a4)
if(r===s)return a2
return A.zZ(a1,r,!0)
case 8:q=a2.y
p=A.hY(a1,q,a3,a4)
if(p===q)return a2
return A.jX(a1,a2.x,p)
case 9:o=a2.x
n=A.dX(a1,o,a3,a4)
m=a2.y
l=A.hY(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.y1(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.hY(a1,j,a3,a4)
if(i===j)return a2
return A.A0(a1,k,i)
case 11:h=a2.x
g=A.dX(a1,h,a3,a4)
f=a2.y
e=A.H2(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.zY(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.hY(a1,d,a3,a4)
o=a2.x
n=A.dX(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.y2(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.d(A.kv("Attempted to substitute unexpected RTI kind "+a0))}},
hY(a,b,c,d){var s,r,q,p,o=b.length,n=A.wa(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.dX(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
H3(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.wa(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.dX(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
H2(a,b,c,d){var s,r=b.a,q=A.hY(a,r,c,d),p=b.b,o=A.hY(a,p,c,d),n=b.c,m=A.H3(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.nf()
s.a=q
s.b=o
s.c=m
return s},
e(a,b){a[v.arrayRti]=b
return a},
nY(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.ID(s)
return a.$S()}return null},
IN(a,b){var s
if(A.zp(b))if(a instanceof A.bD){s=A.nY(a)
if(s!=null)return s}return A.bg(a)},
bg(a){if(a instanceof A.x)return A.l(a)
if(Array.isArray(a))return A.U(a)
return A.y8(J.fr(a))},
U(a){var s=a[v.arrayRti],r=t.zz
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.y8(a)},
y8(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.Gu(a,s)},
Gu(a,b){var s=a instanceof A.bD?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.FW(v.typeUniverse,s.name)
b.$ccache=r
return r},
ID(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.w5(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
o1(a){return A.cb(A.l(a))},
ye(a){var s=A.nY(a)
return A.cb(s==null?A.bg(a):s)},
ya(a){var s
if(a instanceof A.b1)return a.iO()
s=a instanceof A.bD?A.nY(a):null
if(s!=null)return s
if(t.sg.b(a))return J.xu(a).a
if(Array.isArray(a))return A.U(a)
return A.bg(a)},
cb(a){var s=a.r
return s==null?a.r=new A.nI(a):s},
Ix(a,b){var s,r,q=b,p=q.length
if(p===0)return t.ep
if(0>=p)return A.b(q,0)
s=A.jZ(v.typeUniverse,A.ya(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.b(q,r)
s=A.A1(v.typeUniverse,s,A.ya(q[r]))}return A.jZ(v.typeUniverse,s,a)},
cr(a){return A.cb(A.w5(v.typeUniverse,a,!1))},
Gt(a){var s=this
s.b=A.H0(s)
return s.b(a)},
H0(a){var s,r,q,p,o
if(a===t.K)return A.GD
if(A.ft(a))return A.GJ
s=a.w
if(s===6)return A.Gr
if(s===1)return A.Av
if(s===7)return A.Gy
r=A.H_(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.ft)){a.f="$i"+q
if(q==="k")return A.GB
if(a===t.m)return A.GA
return A.GI}}else if(s===10){p=A.Iq(a.x,a.y)
o=p==null?A.Av:p
return o==null?A.ap(o):o}return A.Gp},
H_(a){if(a.w===8){if(a===t.S)return A.hT
if(a===t.pR||a===t.fY)return A.GC
if(a===t.N)return A.GG
if(a===t.y)return A.nW}return null},
Gs(a){var s=this,r=A.Go
if(A.ft(s))r=A.Ga
else if(s===t.K)r=A.ap
else if(A.i4(s)){r=A.Gq
if(s===t.lo)r=A.L
else if(s===t.T)r=A.Y
else if(s===t.k7)r=A.G8
else if(s===t.s7)r=A.Ai
else if(s===t.u6)r=A.G9
else if(s===t.uh)r=A.aS}else if(s===t.S)r=A.a4
else if(s===t.N)r=A.r
else if(s===t.y)r=A.cH
else if(s===t.fY)r=A.Ah
else if(s===t.pR)r=A.cp
else if(s===t.m)r=A.j
s.a=r
return s.a(a)},
Gp(a){var s=this
if(a==null)return A.i4(s)
return A.B1(v.typeUniverse,A.IN(a,s),s)},
Gr(a){if(a==null)return!0
return this.x.b(a)},
GI(a){var s,r=this
if(a==null)return A.i4(r)
s=r.f
if(a instanceof A.x)return!!a[s]
return!!J.fr(a)[s]},
GB(a){var s,r=this
if(a==null)return A.i4(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.x)return!!a[s]
return!!J.fr(a)[s]},
GA(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.x)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
Au(a){if(typeof a=="object"){if(a instanceof A.x)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
Go(a){var s=this
if(a==null){if(A.i4(s))return a}else if(s.b(a))return a
throw A.aT(A.Aq(a,s),new Error())},
Gq(a){var s=this
if(a==null||s.b(a))return a
throw A.aT(A.Aq(a,s),new Error())},
Aq(a,b){return new A.hQ("TypeError: "+A.zK(a,A.bM(b,null)))},
Hd(a,b,c,d){if(A.B1(v.typeUniverse,a,b))return a
throw A.aT(A.FO("The type argument '"+A.bM(a,null)+"' is not a subtype of the type variable bound '"+A.bM(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
zK(a,b){return A.l0(a)+": type '"+A.bM(A.ya(a),null)+"' is not a subtype of type '"+b+"'"},
FO(a){return new A.hQ("TypeError: "+a)},
co(a,b){return new A.hQ("TypeError: "+A.zK(a,b))},
Gy(a){var s=this
return s.x.b(a)||A.xP(v.typeUniverse,s).b(a)},
GD(a){return a!=null},
ap(a){if(a!=null)return a
throw A.aT(A.co(a,"Object"),new Error())},
GJ(a){return!0},
Ga(a){return a},
Av(a){return!1},
nW(a){return!0===a||!1===a},
cH(a){if(!0===a)return!0
if(!1===a)return!1
throw A.aT(A.co(a,"bool"),new Error())},
G8(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.aT(A.co(a,"bool?"),new Error())},
cp(a){if(typeof a=="number")return a
throw A.aT(A.co(a,"double"),new Error())},
G9(a){if(typeof a=="number")return a
if(a==null)return a
throw A.aT(A.co(a,"double?"),new Error())},
hT(a){return typeof a=="number"&&Math.floor(a)===a},
a4(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.aT(A.co(a,"int"),new Error())},
L(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.aT(A.co(a,"int?"),new Error())},
GC(a){return typeof a=="number"},
Ah(a){if(typeof a=="number")return a
throw A.aT(A.co(a,"num"),new Error())},
Ai(a){if(typeof a=="number")return a
if(a==null)return a
throw A.aT(A.co(a,"num?"),new Error())},
GG(a){return typeof a=="string"},
r(a){if(typeof a=="string")return a
throw A.aT(A.co(a,"String"),new Error())},
Y(a){if(typeof a=="string")return a
if(a==null)return a
throw A.aT(A.co(a,"String?"),new Error())},
j(a){if(A.Au(a))return a
throw A.aT(A.co(a,"JSObject"),new Error())},
aS(a){if(a==null)return a
if(A.Au(a))return a
throw A.aT(A.co(a,"JSObject?"),new Error())},
AD(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.bM(a[q],b)
return s},
GU(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.AD(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.bM(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
As(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.e([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.j(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.b(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.bM(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.bM(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.bM(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.bM(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.bM(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
bM(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.bM(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.bM(a.x,b)+">"
if(l===8){p=A.H5(a.x)
o=a.y
return o.length>0?p+("<"+A.AD(o,b)+">"):p}if(l===10)return A.GU(a,b)
if(l===11)return A.As(a,b,null)
if(l===12)return A.As(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.b(b,n)
return b[n]}return"?"},
H5(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
FX(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
FW(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.w5(a,b,!1)
else if(typeof m=="number"){s=m
r=A.jY(a,5,"#")
q=A.wa(s)
for(p=0;p<s;++p)q[p]=r
o=A.jX(a,b,q)
n[b]=o
return o}else return m},
FV(a,b){return A.Af(a.tR,b)},
FU(a,b){return A.Af(a.eT,b)},
w5(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.zS(A.zQ(a,null,b,!1))
r.set(b,s)
return s},
jZ(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.zS(A.zQ(a,b,c,!0))
q.set(c,r)
return r},
A1(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.y1(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
dW(a,b){b.a=A.Gs
b.b=A.Gt
return b},
jY(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.cy(null,null)
s.w=b
s.as=c
r=A.dW(a,s)
a.eC.set(c,r)
return r},
A_(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.FS(a,b,r,c)
a.eC.set(r,s)
return s},
FS(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.ft(b))if(!(b===t.c||b===t.Be))if(s!==6)r=s===7&&A.i4(b.x)
if(r)return b
else if(s===1)return t.c}q=new A.cy(null,null)
q.w=6
q.x=b
q.as=c
return A.dW(a,q)},
zZ(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.FQ(a,b,r,c)
a.eC.set(r,s)
return s},
FQ(a,b,c,d){var s,r
if(d){s=b.w
if(A.ft(b)||b===t.K)return b
else if(s===1)return A.jX(a,"H",[b])
else if(b===t.c||b===t.Be)return t.eZ}r=new A.cy(null,null)
r.w=7
r.x=b
r.as=c
return A.dW(a,r)},
FT(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.cy(null,null)
s.w=13
s.x=b
s.as=q
r=A.dW(a,s)
a.eC.set(q,r)
return r},
jW(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
FP(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
jX(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.jW(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.cy(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.dW(a,r)
a.eC.set(p,q)
return q},
y1(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.jW(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.cy(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.dW(a,o)
a.eC.set(q,n)
return n},
A0(a,b,c){var s,r,q="+"+(b+"("+A.jW(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.cy(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.dW(a,s)
a.eC.set(q,r)
return r},
zY(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.jW(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.jW(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.FP(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.cy(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.dW(a,p)
a.eC.set(r,o)
return o},
y2(a,b,c,d){var s,r=b.as+("<"+A.jW(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.FR(a,b,c,r,d)
a.eC.set(r,s)
return s},
FR(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.wa(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.dX(a,b,r,0)
m=A.hY(a,c,r,0)
return A.y2(a,n,m,c!==m)}}l=new A.cy(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.dW(a,l)},
zQ(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
zS(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.FF(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.zR(a,r,l,k,!1)
else if(q===46)r=A.zR(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.fj(a.u,a.e,k.pop()))
break
case 94:k.push(A.FT(a.u,k.pop()))
break
case 35:k.push(A.jY(a.u,5,"#"))
break
case 64:k.push(A.jY(a.u,2,"@"))
break
case 126:k.push(A.jY(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.FH(a,k)
break
case 38:A.FG(a,k)
break
case 63:p=a.u
k.push(A.A_(p,A.fj(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.zZ(p,A.fj(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.FE(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.zT(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.FJ(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.fj(a.u,a.e,m)},
FF(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
zR(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.FX(s,o.x)[p]
if(n==null)A.K('No "'+p+'" in "'+A.Ez(o)+'"')
d.push(A.jZ(s,o,n))}else d.push(p)
return m},
FH(a,b){var s,r=a.u,q=A.zP(a,b),p=b.pop()
if(typeof p=="string")b.push(A.jX(r,p,q))
else{s=A.fj(r,a.e,p)
switch(s.w){case 11:b.push(A.y2(r,s,q,a.n))
break
default:b.push(A.y1(r,s,q))
break}}},
FE(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.zP(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.fj(p,a.e,o)
q=new A.nf()
q.a=s
q.b=n
q.c=m
b.push(A.zY(p,r,q))
return
case-4:b.push(A.A0(p,b.pop(),s))
return
default:throw A.d(A.kv("Unexpected state under `()`: "+A.u(o)))}},
FG(a,b){var s=b.pop()
if(0===s){b.push(A.jY(a.u,1,"0&"))
return}if(1===s){b.push(A.jY(a.u,4,"1&"))
return}throw A.d(A.kv("Unexpected extended operation "+A.u(s)))},
zP(a,b){var s=b.splice(a.p)
A.zT(a.u,a.e,s)
a.p=b.pop()
return s},
fj(a,b,c){if(typeof c=="string")return A.jX(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.FI(a,b,c)}else return c},
zT(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.fj(a,b,c[s])},
FJ(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.fj(a,b,c[s])},
FI(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.d(A.kv("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.d(A.kv("Bad index "+c+" for "+b.l(0)))},
B1(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.b2(a,b,null,c,null)
r.set(c,s)}return s},
b2(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.ft(d))return!0
s=b.w
if(s===4)return!0
if(A.ft(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.b2(a,c[b.x],c,d,e))return!0
q=d.w
p=t.c
if(b===p||b===t.Be){if(q===7)return A.b2(a,b,c,d.x,e)
return d===p||d===t.Be||q===6}if(d===t.K){if(s===7)return A.b2(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.b2(a,b.x,c,d,e))return!1
return A.b2(a,A.xP(a,b),c,d,e)}if(s===6)return A.b2(a,p,c,d,e)&&A.b2(a,b.x,c,d,e)
if(q===7){if(A.b2(a,b,c,d.x,e))return!0
return A.b2(a,b,c,A.xP(a,d),e)}if(q===6)return A.b2(a,b,c,p,e)||A.b2(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.BO)return!0
o=s===10
if(o&&d===t.op)return!0
if(q===12){if(b===t.ud)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.b2(a,j,c,i,e)||!A.b2(a,i,e,j,c))return!1}return A.At(a,b.x,c,d.x,e)}if(q===11){if(b===t.ud)return!0
if(p)return!1
return A.At(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.Gz(a,b,c,d,e)}if(o&&q===10)return A.GF(a,b,c,d,e)
return!1},
At(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.b2(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.b2(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.b2(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.b2(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.b2(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
Gz(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.jZ(a,b,r[o])
return A.Ag(a,p,null,c,d.y,e)}return A.Ag(a,b.y,null,c,d.y,e)},
Ag(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.b2(a,b[s],d,e[s],f))return!1
return!0},
GF(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.b2(a,r[s],c,q[s],e))return!1
return!0},
i4(a){var s=a.w,r=!0
if(!(a===t.c||a===t.Be))if(!A.ft(a))if(s!==6)r=s===7&&A.i4(a.x)
return r},
ft(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
Af(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
wa(a){return a>0?new Array(a):v.typeUniverse.sEA},
cy:function cy(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
nf:function nf(){this.c=this.b=this.a=null},
nI:function nI(a){this.a=a},
nb:function nb(){},
hQ:function hQ(a){this.a=a},
Fj(){var s,r,q
if(self.scheduleImmediate!=null)return A.H7()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.i1(new A.vd(s),1)).observe(r,{childList:true})
return new A.vc(s,r,q)}else if(self.setImmediate!=null)return A.H8()
return A.H9()},
Fk(a){self.scheduleImmediate(A.i1(new A.ve(t.Q.a(a)),0))},
Fl(a){self.setImmediate(A.i1(new A.vf(t.Q.a(a)),0))},
Fm(a){A.xV(B.cX,t.Q.a(a))},
xV(a,b){var s=B.c.W(a.a,1000)
return A.FN(s<0?0:s,b)},
FN(a,b){var s=new A.nF()
s.lx(a,b)
return s},
p(a){return new A.jj(new A.v($.E,a.h("v<0>")),a.h("jj<0>"))},
o(a,b){a.$2(0,null)
b.b=!0
return b.a},
f(a,b){A.Gb(a,b)},
n(a,b){b.V(a)},
m(a,b){b.cg(A.R(a),A.bt(a))},
Gb(a,b){var s,r,q=new A.wc(b),p=new A.wd(b)
if(a instanceof A.v)a.jy(q,p,t.z)
else{s=t.z
if(a instanceof A.v)a.cw(q,p,s)
else{r=new A.v($.E,t.hR)
r.a=8
r.c=a
r.jy(q,p,s)}}},
q(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.E.hW(new A.wx(s),t.H,t.S,t.z)},
zX(a,b,c){return 0},
id(a){var s
if(t.yt.b(a)){s=a.gdj()
if(s!=null)return s}return B.aH},
xF(a,b){var s=a==null?b.a(a):a,r=new A.v($.E,b.h("v<0>"))
r.c5(s)
return r},
Dp(a,b){var s
if(!b.b(null))throw A.d(A.cY(null,"computation","The type parameter is not nullable"))
s=new A.v($.E,b.h("v<0>"))
A.eY(a,new A.pY(null,s,b))
return s},
Dr(a,b){var s,r,q,p,o,n,m,l,k,j,i,h={},g=null,f=!1,e=new A.v($.E,b.h("v<k<0>>"))
h.a=null
h.b=0
h.c=h.d=null
s=new A.q1(h,g,f,e)
try{for(n=t.c,m=0,l=0;m<2;++m){r=a[m]
q=l
r.cw(new A.q0(h,q,e,b,g,f),s,n)
l=++h.b}if(l===0){n=e
n.dr(A.e([],b.h("z<0>")))
return n}h.a=A.bU(l,null,!1,b.h("0?"))}catch(k){p=A.R(k)
o=A.bt(k)
if(h.b===0||f){n=e
l=p
j=o
i=A.wn(l,j)
l=new A.aO(l,j==null?A.id(l):j)
n.c6(l)
return n}else{h.d=p
h.c=o}}return e},
Dq(a,b){var s,r,q=new A.v($.E,b.h("v<0>")),p=new A.jU(q,b.h("jU<0>")),o=new A.q_(p,b),n=new A.pZ(p)
for(s=t.H,r=0;r<2;++r)a[r].cw(o,n,s)
return q},
F1(a,b){return new A.hz(a,b)},
wn(a,b){if($.E===B.t)return null
return null},
nV(a,b){if($.E!==B.t)A.wn(a,b)
if(b==null)if(t.yt.b(a)){b=a.gdj()
if(b==null){A.rT(a,B.aH)
b=B.aH}}else b=B.aH
else if(t.yt.b(a))A.rT(a,b)
return new A.aO(a,b)},
bs(a,b){var s=new A.v($.E,b.h("v<0>"))
b.a(a)
s.a=8
s.c=a
return s},
vu(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.hR;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.xS()
b.c6(new A.aO(new A.cs(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.j7(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.dE()
b.ej(o.a)
A.ff(b,p)
return}b.a^=2
A.hX(null,null,b.b,t.Q.a(new A.vv(o,b)))},
ff(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.hW(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.ff(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.hW(j.a,j.b)
return}g=$.E
if(g!==h)$.E=h
else g=null
c=c.c
if((c&15)===8)new A.vz(q,d,n).$0()
else if(o){if((c&1)!==0)new A.vy(q,j).$0()}else if((c&2)!==0)new A.vx(d,q).$0()
if(g!=null)$.E=g
c=q.c
if(c instanceof A.v){p=q.a.$ti
p=p.h("H<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.eM(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.vu(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.eM(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
Az(a,b){var s
if(t.nW.b(a))return b.hW(a,t.z,t.K,t.l)
s=t.h_
if(s.b(a))return s.a(a)
throw A.d(A.cY(a,"onError",u.w))},
GO(){var s,r
for(s=$.hV;s!=null;s=$.hV){$.k8=null
r=s.b
$.hV=r
if(r==null)$.k7=null
s.a.$0()}},
H1(){$.y9=!0
try{A.GO()}finally{$.k8=null
$.y9=!1
if($.hV!=null)$.ym().$1(A.AO())}},
AG(a){var s=new A.mY(a),r=$.k7
if(r==null){$.hV=$.k7=s
if(!$.y9)$.ym().$1(A.AO())}else $.k7=r.b=s},
GW(a){var s,r,q,p=$.hV
if(p==null){A.AG(a)
$.k8=$.k7
return}s=new A.mY(a)
r=$.k8
if(r==null){s.b=p
$.hV=$.k8=s}else{q=r.b
s.b=q
$.k8=r.b=s
if(q==null)$.k7=s}},
o3(a){var s=null,r=$.E
if(B.t===r){A.hX(s,s,B.t,a)
return}A.hX(s,s,r,t.Q.a(r.ho(a)))},
zu(a,b){var s=null,r=b.h("dP<0>"),q=new A.dP(s,s,s,s,r)
q.aC(a)
q.iy()
return new A.ac(q,r.h("ac<1>"))},
JH(a,b){A.dq(a,"stream",t.K)
return new A.nz(b.h("nz<0>"))},
ci(a,b,c,d){var s=null
return c?new A.hP(b,s,s,a,d.h("hP<0>")):new A.dP(b,s,s,a,d.h("dP<0>"))},
cj(a){return new A.jk(null,null,a.h("jk<0>"))},
nX(a){var s,r,q
if(a==null)return
try{a.$0()}catch(q){s=A.R(q)
r=A.bt(q)
A.hW(A.ap(s),t.l.a(r))}},
Fs(a,b,c,d,e,f){var s=$.E,r=e?1:0,q=c!=null?32:0,p=A.vg(s,b,f),o=A.xY(s,c),n=d==null?A.yc():d
return new A.di(a,p,o,t.Q.a(n),s,r|q,f.h("di<0>"))},
vg(a,b,c){var s=b==null?A.Ha():b
return t.j4.H(c).h("1(2)").a(s)},
xY(a,b){if(b==null)b=A.Hb()
if(t.sp.b(b))return a.hW(b,t.z,t.K,t.l)
if(t.eC.b(b))return t.h_.a(b)
throw A.d(A.as("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
GP(a){},
GR(a,b){A.hW(A.ap(a),t.l.a(b))},
GQ(){},
zJ(a,b){var s=new A.hG($.E,b.h("hG<0>"))
A.o3(s.gj1())
if(a!=null)s.c=t.Q.a(a)
return s},
AE(a,b,c,d){var s,r,q,p
try{b.$1(a.$0())}catch(p){s=A.R(p)
r=A.bt(p)
q=A.wn(s,r)
if(q!=null)c.$2(q.a,q.b)
else c.$2(s,r)}},
Ge(a,b,c){var s=a.U()
if(s!==$.fu())s.dd(new A.wf(b,c))
else b.aD(c)},
Ak(a,b){return new A.we(a,b)},
Gf(a,b,c){var s=a.U()
if(s!==$.fu())s.dd(new A.wg(b,c))
else b.bM(c)},
eY(a,b){var s=$.E
if(s===B.t)return A.xV(a,t.Q.a(b))
return A.xV(a,t.Q.a(s.ho(b)))},
hW(a,b){A.GW(new A.wt(a,b))},
AA(a,b,c,d,e){var s,r=$.E
if(r===c)return d.$0()
$.E=c
s=r
try{r=d.$0()
return r}finally{$.E=s}},
AC(a,b,c,d,e,f,g){var s,r=$.E
if(r===c)return d.$1(e)
$.E=c
s=r
try{r=d.$1(e)
return r}finally{$.E=s}},
AB(a,b,c,d,e,f,g,h,i){var s,r=$.E
if(r===c)return d.$2(e,f)
$.E=c
s=r
try{r=d.$2(e,f)
return r}finally{$.E=s}},
hX(a,b,c,d){t.Q.a(d)
if(B.t!==c){d=c.ho(d)
d=d}A.AG(d)},
vd:function vd(a){this.a=a},
vc:function vc(a,b,c){this.a=a
this.b=b
this.c=c},
ve:function ve(a){this.a=a},
vf:function vf(a){this.a=a},
nF:function nF(){this.b=null},
w2:function w2(a,b){this.a=a
this.b=b},
jj:function jj(a,b){this.a=a
this.b=!1
this.$ti=b},
wc:function wc(a){this.a=a},
wd:function wd(a){this.a=a},
wx:function wx(a){this.a=a},
dm:function dm(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
dV:function dV(a,b){this.a=a
this.$ti=b},
aO:function aO(a,b){this.a=a
this.b=b},
aA:function aA(a,b){this.a=a
this.$ti=b},
cU:function cU(a,b,c,d,e,f,g){var _=this
_.ay=0
_.CW=_.ch=null
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null
_.$ti=g},
jn:function jn(){},
jk:function jk(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.r=_.f=_.e=_.d=null
_.$ti=c},
pY:function pY(a,b,c){this.a=a
this.b=b
this.c=c},
q1:function q1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
q0:function q0(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
q_:function q_(a,b){this.a=a
this.b=b},
pZ:function pZ(a){this.a=a},
hz:function hz(a,b){this.a=a
this.b=b},
fb:function fb(){},
W:function W(a,b){this.a=a
this.$ti=b},
jU:function jU(a,b){this.a=a
this.$ti=b},
cD:function cD(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
v:function v(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
vr:function vr(a,b){this.a=a
this.b=b},
vw:function vw(a,b){this.a=a
this.b=b},
vv:function vv(a,b){this.a=a
this.b=b},
vt:function vt(a,b){this.a=a
this.b=b},
vs:function vs(a,b){this.a=a
this.b=b},
vz:function vz(a,b,c){this.a=a
this.b=b
this.c=c},
vA:function vA(a,b){this.a=a
this.b=b},
vB:function vB(a){this.a=a},
vy:function vy(a,b){this.a=a
this.b=b},
vx:function vx(a,b){this.a=a
this.b=b},
vC:function vC(a,b){this.a=a
this.b=b},
vD:function vD(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
vE:function vE(a,b,c){this.a=a
this.b=b
this.c=c},
vF:function vF(a,b){this.a=a
this.b=b},
mY:function mY(a){this.a=a
this.b=null},
aa:function aa(){},
tQ:function tQ(a,b){this.a=a
this.b=b},
tR:function tR(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
tO:function tO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
tP:function tP(a,b){this.a=a
this.b=b},
tU:function tU(a){this.a=a},
tV:function tV(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
tS:function tS(a,b){this.a=a
this.b=b},
tT:function tT(){},
tW:function tW(a,b){this.a=a
this.b=b},
tX:function tX(a,b){this.a=a
this.b=b},
tM:function tM(a){this.a=a},
tN:function tN(a,b,c){this.a=a
this.b=b
this.c=c},
eV:function eV(){},
jb:function jb(){},
fm:function fm(){},
w1:function w1(a){this.a=a},
w0:function w0(a){this.a=a},
nE:function nE(){},
mZ:function mZ(){},
dP:function dP(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
hP:function hP(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
ac:function ac(a,b){this.a=a
this.$ti=b},
di:function di(a,b,c,d,e,f,g){var _=this
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null
_.$ti=g},
fn:function fn(a,b){this.a=a
this.$ti=b},
b_:function b_(){},
vi:function vi(a,b,c){this.a=a
this.b=b
this.c=c},
vh:function vh(a){this.a=a},
hO:function hO(){},
dj:function dj(){},
cC:function cC(a,b){this.b=a
this.a=null
this.$ti=b},
fd:function fd(a,b){this.b=a
this.c=b
this.a=null},
n9:function n9(){},
cE:function cE(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
vT:function vT(a,b){this.a=a
this.b=b},
hG:function hG(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
nz:function nz(a){this.$ti=a},
js:function js(a){this.$ti=a},
wf:function wf(a,b){this.a=a
this.b=b},
we:function we(a,b){this.a=a
this.b=b},
wg:function wg(a,b){this.a=a
this.b=b},
jt:function jt(a,b){this.a=a
this.$ti=b},
hN:function hN(a,b,c,d,e,f){var _=this
_.w=$
_.x=null
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=_.f=null
_.$ti=f},
jm:function jm(a,b,c){this.a=a
this.b=b
this.$ti=c},
k5:function k5(){},
nv:function nv(){},
vZ:function vZ(a,b){this.a=a
this.b=b},
w_:function w_(a,b,c){this.a=a
this.b=b
this.c=c},
wt:function wt(a,b){this.a=a
this.b=b},
zM(a,b){var s=a[b]
return s===a?null:s},
y_(a,b,c){if(c==null)a[b]=a
else a[b]=c},
xZ(){var s=Object.create(null)
A.y_(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
xK(a,b,c,d){if(b==null){if(a==null)return new A.bS(c.h("@<0>").H(d).h("bS<1,2>"))
b=A.Hg()}else{if(A.Io()===b&&A.In()===a)return new A.iE(c.h("@<0>").H(d).h("iE<1,2>"))
if(a==null)a=A.Hf()}return A.FB(a,b,null,c,d)},
G(a,b,c){return b.h("@<0>").H(c).h("lA<1,2>").a(A.AV(a,new A.bS(b.h("@<0>").H(c).h("bS<1,2>"))))},
I(a,b){return new A.bS(a.h("@<0>").H(b).h("bS<1,2>"))},
FB(a,b,c,d,e){return new A.jC(a,b,new A.vR(d),d.h("@<0>").H(e).h("jC<1,2>"))},
z3(a){return new A.fg(a.h("fg<0>"))},
cN(a){return new A.fg(a.h("fg<0>"))},
y0(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
FC(a,b,c){var s=new A.fh(a,b,c.h("fh<0>"))
s.c=a.e
return s},
Gj(a,b){return J.a0(a,b)},
Gk(a){return J.am(a)},
z2(a,b,c){var s=A.xK(null,null,b,c)
a.aa(0,new A.r7(s,b,c))
return s},
DN(a,b){var s,r,q=A.z3(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.M)(a),++r)q.j(0,b.a(a[r]))
return q},
z4(a,b){var s=A.z3(b)
s.C(0,a)
return s},
DO(a,b){var s=t.hO
return J.yq(s.a(a),s.a(b))},
rd(a){var s,r
if(A.yh(a))return"{...}"
s=new A.T("")
try{r={}
B.b.j($.ca,a)
s.a+="{"
r.a=!0
a.aa(0,new A.re(r,s))
s.a+="}"}finally{if(0>=$.ca.length)return A.b($.ca,-1)
$.ca.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
DP(a){return 8},
FD(a,b){return new A.fi(a,a.c,a.d,a.b,b.h("fi<0>"))},
FY(){throw A.d(A.aw("Cannot change an unmodifiable set"))},
jv:function jv(){},
jy:function jy(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
jw:function jw(a,b){this.a=a
this.$ti=b},
jx:function jx(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
jC:function jC(a,b,c,d){var _=this
_.w=a
_.x=b
_.y=c
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=d},
vR:function vR(a){this.a=a},
fg:function fg(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
nq:function nq(a){this.a=a
this.b=null},
fh:function fh(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
r7:function r7(a,b,c){this.a=a
this.b=b
this.c=c},
P:function P(){},
a1:function a1(){},
rc:function rc(a){this.a=a},
re:function re(a,b){this.a=a
this.b=b},
nM:function nM(){},
iL:function iL(){},
f8:function f8(a,b){this.a=a
this.$ti=b},
iJ:function iJ(a,b){var _=this
_.a=a
_.d=_.c=_.b=0
_.$ti=b},
fi:function fi(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null
_.$ti=e},
cR:function cR(){},
jP:function jP(){},
nO:function nO(){},
jd:function jd(a,b){this.a=a
this.$ti=b},
k_:function k_(){},
k0:function k0(){},
Ax(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.R(r)
q=A.an(String(s),null,null)
throw A.d(q)}q=A.wi(p)
return q},
wi(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.nm(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.wi(a[s])
return a},
G6(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.BW()
else s=new Uint8Array(o)
for(r=J.at(a),q=0;q<o;++q){p=r.k(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
G5(a,b,c,d){var s=a?$.BV():$.BU()
if(s==null)return null
if(0===c&&d===b.length)return A.Ad(s,b)
return A.Ad(s,b.subarray(c,d))},
Ad(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
yB(a,b,c,d,e,f){if(B.c.bc(f,4)!==0)throw A.d(A.an("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.d(A.an("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.d(A.an("Invalid base64 padding, more than two '=' characters",a,b))},
Fq(a,b,c,d,e,f,g,a0){var s,r,q,p,o,n,m,l,k,j,i=a0>>>2,h=3-(a0&3)
for(s=J.at(b),r=a.length,q=f.$flags|0,p=c,o=0;p<d;++p){n=s.k(b,p)
o=(o|n)>>>0
i=(i<<8|n)&16777215;--h
if(h===0){m=g+1
l=i>>>18&63
if(!(l<r))return A.b(a,l)
q&2&&A.ai(f)
k=f.length
if(!(g<k))return A.b(f,g)
f[g]=a.charCodeAt(l)
g=m+1
l=i>>>12&63
if(!(l<r))return A.b(a,l)
if(!(m<k))return A.b(f,m)
f[m]=a.charCodeAt(l)
m=g+1
l=i>>>6&63
if(!(l<r))return A.b(a,l)
if(!(g<k))return A.b(f,g)
f[g]=a.charCodeAt(l)
g=m+1
l=i&63
if(!(l<r))return A.b(a,l)
if(!(m<k))return A.b(f,m)
f[m]=a.charCodeAt(l)
i=0
h=3}}if(o>=0&&o<=255){if(e&&h<3){m=g+1
j=m+1
if(3-h===1){s=i>>>2&63
if(!(s<r))return A.b(a,s)
q&2&&A.ai(f)
q=f.length
if(!(g<q))return A.b(f,g)
f[g]=a.charCodeAt(s)
s=i<<4&63
if(!(s<r))return A.b(a,s)
if(!(m<q))return A.b(f,m)
f[m]=a.charCodeAt(s)
g=j+1
if(!(j<q))return A.b(f,j)
f[j]=61
if(!(g<q))return A.b(f,g)
f[g]=61}else{s=i>>>10&63
if(!(s<r))return A.b(a,s)
q&2&&A.ai(f)
q=f.length
if(!(g<q))return A.b(f,g)
f[g]=a.charCodeAt(s)
s=i>>>4&63
if(!(s<r))return A.b(a,s)
if(!(m<q))return A.b(f,m)
f[m]=a.charCodeAt(s)
g=j+1
s=i<<2&63
if(!(s<r))return A.b(a,s)
if(!(j<q))return A.b(f,j)
f[j]=a.charCodeAt(s)
if(!(g<q))return A.b(f,g)
f[g]=61}return 0}return(i<<2|3-h)>>>0}for(p=c;p<d;){n=s.k(b,p)
if(n<0||n>255)break;++p}throw A.d(A.cY(b,"Not a byte value at index "+p+": 0x"+B.c.i4(s.k(b,p),16),null))},
Fp(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.c.aT(a1,2),f=a1&3,e=$.yn()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.b(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.b(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.ai(d)
m=d.length
if(!(a0<m))return A.b(d,a0)
d[a0]=g>>>16&255
a0=k+1
if(!(k<m))return A.b(d,k)
d[k]=g>>>8&255
k=a0+1
if(!(a0<m))return A.b(d,a0)
d[a0]=g&255
a0=k
g=0}continue}else if(l===-1&&f>1){if(o>127)break
if(f===3){if((g&3)!==0)throw A.d(A.an(i,a,p))
k=a0+1
q&2&&A.ai(d)
s=d.length
if(!(a0<s))return A.b(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.b(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.d(A.an(i,a,p))
q&2&&A.ai(d)
if(!(a0<d.length))return A.b(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.zH(a,p+1,c,-j-1)}throw A.d(A.an(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.b(a,p)
if(a.charCodeAt(p)>127)break}throw A.d(A.an(h,a,p))},
Fn(a,b,c,d){var s=A.Fo(a,b,c),r=(d&3)+(s-b),q=B.c.aT(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.BQ()},
Fo(a,b,c){var s,r=a.length,q=c,p=q,o=0
for(;;){if(!(p>b&&o<2))break
A:{--p
if(!(p>=0&&p<r))return A.b(a,p)
s=a.charCodeAt(p)
if(s===61){++o
q=p
break A}if((s|32)===100){if(p===b)break;--p
if(!(p>=0&&p<r))return A.b(a,p)
s=a.charCodeAt(p)}if(s===51){if(p===b)break;--p
if(!(p>=0&&p<r))return A.b(a,p)
s=a.charCodeAt(p)}if(s===37){++o
q=p
break A}break}}return q},
zH(a,b,c,d){var s,r,q
if(b===c)return d
s=-d-1
for(r=a.length;s>0;){if(!(b<r))return A.b(a,b)
q=a.charCodeAt(b)
if(s===3){if(q===61){s-=3;++b
break}if(q===37){--s;++b
if(b===c)break
if(!(b<r))return A.b(a,b)
q=a.charCodeAt(b)}else break}if((s>3?s-3:s)===2){if(q!==51)break;++b;--s
if(b===c)break
if(!(b<r))return A.b(a,b)
q=a.charCodeAt(b)}if((q|32)!==100)break;++b;--s
if(b===c)break}if(b!==c)throw A.d(A.an("Invalid padding character",a,b))
return-s-1},
yS(a){return B.l9.k(0,a.toLowerCase())},
z1(a,b,c){return new A.iF(a,b)},
Gl(a){return a.v()},
Fx(a,b){return new A.vO(a,[],A.Il())},
Fy(a,b,c){var s,r=new A.T("")
A.zO(a,r,b,c)
s=r.a
return s.charCodeAt(0)==0?s:s},
zO(a,b,c,d){var s=A.Fx(b,c)
s.fB(a)},
Fz(a,b,c){var s,r,q
for(s=J.at(a),r=b,q=0;r<c;++r)q=(q|s.k(a,r))>>>0
if(q>=0&&q<=255)return
A.FA(a,b,c)},
FA(a,b,c){var s,r,q
for(s=J.at(a),r=b;r<c;++r){q=s.k(a,r)
if(q<0||q>255)throw A.d(A.an("Source contains non-Latin-1 characters.",a,r))}},
Ae(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
nm:function nm(a,b){this.a=a
this.b=b
this.c=null},
nn:function nn(a){this.a=a},
nk:function nk(a,b,c){this.b=a
this.c=b
this.a=c},
w9:function w9(){},
w8:function w8(){},
kr:function kr(){},
nK:function nK(){},
kt:function kt(a){this.a=a},
nL:function nL(a,b){this.a=a
this.b=b},
nJ:function nJ(){},
ks:function ks(a,b){this.a=a
this.b=b},
nc:function nc(a){this.a=a},
ny:function ny(a){this.a=a},
ig:function ig(){},
ky:function ky(){},
jl:function jl(a){this.a=0
this.b=a},
n2:function n2(a){this.c=null
this.a=0
this.b=a},
n1:function n1(){},
mX:function mX(a,b){this.a=a
this.b=b},
kx:function kx(){},
n_:function n_(){this.a=0},
n0:function n0(a,b){this.a=a
this.b=b},
c_:function c_(){},
jo:function jo(a){this.a=a},
jp:function jp(a,b){this.a=a
this.b=b
this.c=0},
io:function io(){},
fc:function fc(a,b,c){this.a=a
this.b=b
this.$ti=c},
bE:function bE(){},
a7:function a7(){},
ps:function ps(a){this.a=a},
dz:function dz(){},
pN:function pN(){},
pO:function pO(){},
iF:function iF(a,b){this.a=a
this.b=b},
ln:function ln(a,b){this.a=a
this.b=b},
lm:function lm(){},
lp:function lp(a){this.b=a},
nl:function nl(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=!1},
lo:function lo(a){this.a=a},
vP:function vP(){},
vQ:function vQ(a,b){this.a=a
this.b=b},
vO:function vO(a,b,c){this.c=a
this.a=b
this.b=c},
lu:function lu(){},
lw:function lw(a){this.a=a},
lv:function lv(a,b){this.a=a
this.b=b},
jA:function jA(a){this.a=a},
np:function np(a){this.a=a},
lz:function lz(){},
cA:function cA(){},
nC:function nC(a,b){this.a=a
this.b=b},
fp:function fp(){},
fo:function fo(a){this.a=a},
k4:function k4(a,b,c){this.a=a
this.b=b
this.c=c},
mJ:function mJ(){},
mK:function mK(){},
nQ:function nQ(a){this.b=this.a=0
this.c=a},
nR:function nR(a,b){var _=this
_.d=a
_.b=_.a=0
_.c=b},
jf:function jf(a){this.a=a},
hS:function hS(a){this.a=a
this.b=16
this.c=0},
nU:function nU(){},
II(a){return A.i5(a)},
fs(a){var s=A.bJ(a,null)
if(s!=null)return s
throw A.d(A.an(a,null,null))},
Dj(a,b){a=A.aT(a,new Error())
if(a==null)a=A.ap(a)
a.stack=b.l(0)
throw a},
bU(a,b,c,d){var s,r=c?J.yY(a,d):J.xG(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
xL(a,b,c){var s,r=A.e([],c.h("z<0>"))
for(s=J.aN(a);s.q();)B.b.j(r,c.a(s.gA()))
if(b)return r
r.$flags=1
return r},
N(a,b){var s,r
if(Array.isArray(a))return A.e(a.slice(0),b.h("z<0>"))
s=A.e([],b.h("z<0>"))
for(r=J.aN(a);r.q();)B.b.j(s,r.gA())
return s},
cO(a,b){var s=A.xL(a,!1,b)
s.$flags=3
return s},
c5(a,b,c){var s,r,q,p,o
A.bq(b,"start")
s=c==null
r=!s
if(r){q=c-b
if(q<0)throw A.d(A.ay(c,b,null,"end",null))
if(q===0)return""}if(Array.isArray(a)){p=a
o=p.length
if(s)c=o
return A.zm(b>0||c<o?p.slice(b,c):p)}if(t.iT.b(a))return A.ES(a,b,c)
if(r)a=J.yt(a,c)
if(b>0)a=J.o9(a,b)
s=A.N(a,t.S)
return A.zm(s)},
ER(a){return A.ak(A.a4(a))},
EQ(a){return A.ak(a)},
ES(a,b,c){var s=a.length
if(b>=s)return""
return A.Et(a,b,c==null||c>s?s:c)},
O(a,b){return new A.dC(a,A.xH(a,!1,b,!1,!1,""))},
IH(a,b){return a==null?b==null:a===b},
tY(a,b,c){var s=J.aN(b)
if(!s.q())return a
if(c.length===0){do a+=A.u(s.gA())
while(s.q())}else{a+=A.u(s.gA())
while(s.q())a=a+c+A.u(s.gA())}return a},
xW(){var s,r,q=A.Eo()
if(q==null)throw A.d(A.aw("'Uri.base' is not supported"))
s=$.zE
if(s!=null&&q===$.zD)return s
r=A.hC(q)
$.zE=r
$.zD=q
return r},
cG(a,b,c,d){var s,r,q,p,o,n="0123456789ABCDEF"
if(c===B.l){s=$.BT()
s=s.b.test(b)}else s=!1
if(s)return b
r=c.cX(b)
for(s=r.length,q=0,p="";q<s;++q){o=r[q]
if(o<128&&(u.S.charCodeAt(o)&a)!==0)p+=A.ak(o)
else p=d&&o===32?p+"+":p+"%"+n[o>>>4&15]+n[o&15]}return p.charCodeAt(0)==0?p:p},
xS(){return A.bt(new Error())},
D3(a,b,c,d,e,f,g,h,i){var s="microsecond",r=A.Eu(a,b,c,d,e,f,g,h,i)
if(r==null)return null
if(h>999)A.K(A.ay(h,0,999,s,null))
if(r<-864e13||r>864e13)A.K(A.ay(r,-864e13,864e13,"millisecondsSinceEpoch",null))
if(r===864e13&&h!==0)A.K(A.cY(h,s,"Time including microseconds is outside valid range"))
A.dq(i,"isUtc",t.y)
return new A.bk(r,h,i)},
D5(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.Bo().d0(a)
if(c!=null){s=new A.pA()
r=c.b
if(1>=r.length)return A.b(r,1)
q=r[1]
q.toString
p=A.fs(q)
if(2>=r.length)return A.b(r,2)
q=r[2]
q.toString
o=A.fs(q)
if(3>=r.length)return A.b(r,3)
q=r[3]
q.toString
n=A.fs(q)
if(4>=r.length)return A.b(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.b(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.b(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.b(r,7)
j=new A.pB().$1(r[7])
i=B.c.W(j,1000)
q=r.length
if(8>=q)return A.b(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.b(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.b(r,10)
q=r[10]
q.toString
e=A.fs(q)
if(11>=r.length)return A.b(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.D3(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.d(A.an("Time out of range",a,null))
return d}else throw A.d(A.an("Invalid date format",a,null))},
yP(a){var s,r
try{s=A.D5(a)
return s}catch(r){if(t.Bj.b(A.R(r)))return null
else throw r}},
yO(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
D4(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
pz(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cZ(a){if(a>=10)return""+a
return"0"+a},
it(a,b,c,d,e,f){return new A.aX(c+1000*d+1e6*f+6e7*e+36e8*b+864e8*a)},
l0(a){if(typeof a=="number"||A.nW(a)||a==null)return J.b9(a)
if(typeof a=="string")return JSON.stringify(a)
return A.zl(a)},
Dk(a,b){A.dq(a,"error",t.K)
A.dq(b,"stackTrace",t.l)
A.Dj(a,b)},
kv(a){return new A.ku(a)},
as(a,b){return new A.cs(!1,null,b,a)},
cY(a,b,c){return new A.cs(!0,a,b,c)},
kq(a,b,c){return a},
b7(a){var s=null
return new A.hl(s,s,!1,s,s,a)},
t_(a,b){return new A.hl(null,null,!0,a,b,"Value not in range")},
ay(a,b,c,d,e){return new A.hl(b,c,!0,a,d,"Invalid value")},
zo(a,b,c,d){if(a<b||a>c)throw A.d(A.ay(a,b,c,d,null))
return a},
aR(a,b,c){if(0>a||a>c)throw A.d(A.ay(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.ay(b,a,c,"end",null))
return b}return c},
bq(a,b){if(a<0)throw A.d(A.ay(a,0,null,b,null))
return a},
le(a,b,c,d,e){return new A.ld(b,!0,a,e,"Index out of range")},
aw(a){return new A.je(a)},
zB(a){return new A.mF(a)},
aC(a){return new A.bX(a)},
aG(a){return new A.kM(a)},
yT(a){return new A.nd(a)},
an(a,b,c){return new A.bG(a,b,c)},
DC(a,b,c){var s,r
if(A.yh(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.e([],t.s)
B.b.j($.ca,a)
try{A.GK(a,s)}finally{if(0>=$.ca.length)return A.b($.ca,-1)
$.ca.pop()}r=A.tY(b,t.tY.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
r_(a,b,c){var s,r
if(A.yh(a))return b+"..."+c
s=new A.T(b)
B.b.j($.ca,a)
try{r=s
r.a=A.tY(r.a,a,", ")}finally{if(0>=$.ca.length)return A.b($.ca,-1)
$.ca.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
GK(a,b){var s,r,q,p,o,n,m,l=a.gJ(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.q())return
s=A.u(l.gA())
B.b.j(b,s)
k+=s.length+2;++j}if(!l.q()){if(j<=5)return
if(0>=b.length)return A.b(b,-1)
r=b.pop()
if(0>=b.length)return A.b(b,-1)
q=b.pop()}else{p=l.gA();++j
if(!l.q()){if(j<=4){B.b.j(b,A.u(p))
return}r=A.u(p)
if(0>=b.length)return A.b(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gA();++j
for(;l.q();p=o,o=n){n=l.gA();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.b(b,-1)
k-=b.pop().length+2;--j}B.b.j(b,"...")
return}}q=A.u(p)
r=A.u(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.b(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.j(b,m)
B.b.j(b,q)
B.b.j(b,r)},
z6(a,b,c,d,e){return new A.ef(a,b.h("@<0>").H(c).H(d).H(e).h("ef<1,2,3,4>"))},
bo(a,b,c,d,e,f,g){var s
if(B.f===c){s=J.am(a)
b=J.am(b)
return A.hx(A.az(A.az($.fv(),s),b))}if(B.f===d){s=J.am(a)
b=J.am(b)
c=J.am(c)
return A.hx(A.az(A.az(A.az($.fv(),s),b),c))}if(B.f===e){s=J.am(a)
b=J.am(b)
c=J.am(c)
d=J.am(d)
return A.hx(A.az(A.az(A.az(A.az($.fv(),s),b),c),d))}if(B.f===f){s=J.am(a)
b=J.am(b)
c=J.am(c)
d=J.am(d)
e=J.am(e)
return A.hx(A.az(A.az(A.az(A.az(A.az($.fv(),s),b),c),d),e))}if(B.f===g){s=J.am(a)
b=J.am(b)
c=J.am(c)
d=J.am(d)
e=J.am(e)
f=J.am(f)
return A.hx(A.az(A.az(A.az(A.az(A.az(A.az($.fv(),s),b),c),d),e),f))}s=J.am(a)
b=J.am(b)
c=J.am(c)
d=J.am(d)
e=J.am(e)
f=J.am(f)
g=J.am(g)
g=A.hx(A.az(A.az(A.az(A.az(A.az(A.az(A.az($.fv(),s),b),c),d),e),f),g))
return g},
eG(a){var s,r,q=$.fv()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.M)(a),++r)q=A.az(q,J.am(a[r]))
return A.hx(q)},
zr(a,b){return new A.jd(A.z4(a,b),b.h("jd<0>"))},
Gh(a,b){return 65536+((a&1023)<<10)+(b&1023)},
hC(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.b(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.zC(a4<a4?B.a.m(a5,0,a4):a5,5,a3).gkz()
else if(s===32)return A.zC(B.a.m(a5,5,a4),0,a3).gkz()}r=A.bU(8,0,!1,t.S)
B.b.i(r,0,0)
B.b.i(r,1,-1)
B.b.i(r,2,-1)
B.b.i(r,7,-1)
B.b.i(r,3,0)
B.b.i(r,4,0)
B.b.i(r,5,a4)
B.b.i(r,6,a4)
if(A.AF(a5,0,a4,0,r)>=14)B.b.i(r,7,a4)
q=r[1]
if(q>=0)if(A.AF(a5,0,q,20,r)===20)r[7]=q
p=r[2]+1
o=r[3]
n=r[4]
m=r[5]
l=r[6]
if(l<m)m=l
if(n<p)n=m
else if(n<=q)n=q+1
if(o<p)o=n
k=r[7]<0
j=a3
if(k){k=!1
if(!(p>q+3)){i=o>0
if(!(i&&o+1===n)){if(!B.a.a6(a5,"\\",n))if(p>0)h=B.a.a6(a5,"\\",p-1)||B.a.a6(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.a6(a5,"..",n)))h=m>n+2&&B.a.a6(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.a6(a5,"file",0)){if(p<=0){if(!B.a.a6(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.m(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.a.bI(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.a6(a5,"http",0)){if(i&&o+3===n&&B.a.a6(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.bI(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.a6(a5,"https",0)){if(i&&o+4===n&&B.a.a6(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.bI(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.cm(a4<a5.length?B.a.m(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.y4(a5,0,q)
else{if(q===0)A.hR(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.A9(a5,c,p-1):""
a=A.A6(a5,p,o,!1)
i=o+1
if(i<n){a0=A.bJ(B.a.m(a5,i,n),a3)
d=A.w6(a0==null?A.K(A.an("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.A7(a5,n,m,a3,j,a!=null)
a2=m<l?A.A8(a5,m+1,l,a3):a3
return A.k2(j,b,a,d,a1,a2,l<a4?A.A5(a5,l+1,a4):a3)},
Fd(a){A.r(a)
return A.w7(a,0,a.length,B.l,!1)},
mH(a,b,c){throw A.d(A.an("Illegal IPv4 address, "+a,b,c))},
Fa(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.b(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.mH("each part must be in the range 0..255",a,r)}A.mH("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.mH(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.ai(d)
if(!(k<16))return A.b(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.mH(j,a,q)
p=l}A.mH("IPv4 address should contain exactly 4 parts",a,q)},
Fb(a,b,c){var s
if(b===c)throw A.d(A.an("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.b(a,b)
if(a.charCodeAt(b)===118){s=A.Fc(a,b,c)
if(s!=null)throw A.d(s)
return!1}A.zF(a,b,c)
return!0},
Fc(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.S;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.bG(n,a,q)
r=q
break}return new A.bG("Unexpected character",a,q-1)}if(r-1===b)return new A.bG(n,a,r)
return new A.bG("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.bG("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.b(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.bG("Invalid IPvFuture address character",a,r)}},
zF(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.uT(a3)
if(a5-a4<2)a2.$2("address is too short",null)
s=new Uint8Array(16)
r=a3.length
if(!(a4>=0&&a4<r))return A.b(a3,a4)
q=-1
p=0
if(a3.charCodeAt(a4)===58){o=a4+1
if(!(o<r))return A.b(a3,o)
if(a3.charCodeAt(o)===58){n=a4+2
m=n
q=0
p=1}else{a2.$2("invalid start colon",a4)
n=a4
m=n}}else{n=a4
m=n}for(l=0,k=!0;;){if(n>=a5)j=0
else{if(!(n<r))return A.b(a3,n)
j=a3.charCodeAt(n)}A:{i=j^48
h=!1
if(i<=9)g=i
else{f=j|32
if(f>=97&&f<=102)g=f-87
else break A
k=h}if(n<m+4){l=l*16+g;++n
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.Fa(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.aT(l,8)
if(!(o<16))return A.b(s,o)
s[o]=e;++o
if(!(o<16))return A.b(s,o)
s[o]=l&255;++p
if(j===58){if(p<8){++n
m=n
l=0
k=!0
continue}a2.$2(a1,n)}break}if(j===58){if(q<0){d=p+1;++n
q=p
p=d
m=n
continue}a2.$2("only one wildcard `::` is allowed",n)}if(q!==p-1)a2.$2("missing part",n)
break}if(n<a5)a2.$2("invalid character",n)
if(p<8){if(q<0)a2.$2("an address without a wildcard must contain exactly 8 parts",a5)
c=q+1
b=p-c
if(b>0){a=c*2
a0=16-b*2
B.H.bd(s,a0,16,s,a)
B.H.pZ(s,a,a0,0)}}return s},
k2(a,b,c,d,e,f,g){return new A.k1(a,b,c,d,e,f,g)},
A2(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
hR(a,b,c){throw A.d(A.an(c,a,b))},
G_(a,b){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(B.a.t(q,"/")){s=A.aw("Illegal path character "+q)
throw A.d(s)}}},
w6(a,b){if(a!=null&&a===A.A2(b))return null
return a},
A6(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a==null)return null
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.b(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.b(a,r)
if(a.charCodeAt(r)!==93)A.hR(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.b(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.G0(a,q,r)
if(o<r){n=o+1
p=A.Ac(a,B.a.a6(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.Fb(a,q,o)
l=B.a.m(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.b(a,k)
if(a.charCodeAt(k)===58){o=B.a.a_(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.Ac(a,B.a.a6(a,"25",n)?o+3:n,c,"%25")}else p=""
A.zF(a,b,o)
return"["+B.a.m(a,b,o)+p+"]"}}return A.G3(a,b,c)},
G0(a,b,c){var s=B.a.a_(a,"%",b)
return s>=b&&s<c?s:c},
Ac(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.T(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.b(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.y5(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.T("")
l=h.a+=B.a.m(a,q,r)
if(m)n=B.a.m(a,r,r+3)
else if(n==="%")A.hR(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.S.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.T("")
if(q<r){h.a+=B.a.m(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.b(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.m(a,q,r)
if(h==null){h=new A.T("")
m=h}else m=h
m.a+=i
l=A.y3(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.m(a,b,c)
if(q<c){i=B.a.m(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
G3(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.S
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.b(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.y5(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.T("")
k=B.a.m(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.m(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.T("")
if(q<r){p.a+=B.a.m(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.hR(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.b(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.m(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.T("")
l=p}else l=p
l.a+=k
j=A.y3(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.m(a,b,c)
if(q<c){k=B.a.m(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
y4(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.b(a,b)
if(!A.A4(a.charCodeAt(b)))A.hR(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.S.charCodeAt(p)&8)!==0))A.hR(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.m(a,b,c)
return A.FZ(q?a.toLowerCase():a)},
FZ(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
A9(a,b,c){if(a==null)return""
return A.k3(a,b,c,16,!1,!1)},
A7(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.k3(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.u(s,"/"))s="/"+s
return A.G2(s,e,f)},
G2(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.u(a,"/")&&!B.a.u(a,"\\"))return A.y6(a,!s||c)
return A.fq(a)},
A8(a,b,c,d){if(a!=null)return A.k3(a,b,c,256,!0,!1)
return null},
A5(a,b,c){if(a==null)return null
return A.k3(a,b,c,256,!0,!1)},
y5(a,b,c){var s,r,q,p,o,n,m=u.S,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.b(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.b(a,l)
q=a.charCodeAt(l)
p=A.wO(r)
o=A.wO(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.b(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.ak(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.m(a,b,b+3).toUpperCase()
return null},
y3(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<=127){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.b(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.c.oM(a,6*p)&63|q
if(!(o<r))return A.b(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.b(k,l)
if(!(m<r))return A.b(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.b(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.c5(s,0,null)},
k3(a,b,c,d,e,f){var s=A.Ab(a,b,c,d,e,f)
return s==null?B.a.m(a,b,c):s},
Ab(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.S
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.b(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.y5(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.hR(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.b(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.y3(n)}if(o==null){o=new A.T("")
k=o}else k=o
k.a=(k.a+=B.a.m(a,p,q))+l
if(typeof m!=="number")return A.B_(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.m(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
Aa(a){if(B.a.u(a,"."))return!0
return B.a.aW(a,"/.")!==-1},
fq(a){var s,r,q,p,o,n,m
if(!A.Aa(a))return a
s=A.e([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.b(s,-1)
s.pop()
if(s.length===0)B.b.j(s,"")}p=!0}else{p="."===n
if(!p)B.b.j(s,n)}}if(p)B.b.j(s,"")
return B.b.S(s,"/")},
y6(a,b){var s,r,q,p,o,n
if(!A.Aa(a))return!b?A.A3(a):a
s=A.e([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gaX(s)!==".."){if(0>=s.length)return A.b(s,-1)
s.pop()}else B.b.j(s,"..")
p=!0}else{p="."===n
if(!p)B.b.j(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.j(s,"")
if(!b){if(0>=s.length)return A.b(s,0)
B.b.i(s,0,A.A3(s[0]))}return B.b.S(s,"/")},
A3(a){var s,r,q,p=u.S,o=a.length
if(o>=2&&A.A4(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.m(a,0,s)+"%3A"+B.a.D(a,s+1)
if(r<=127){if(!(r<128))return A.b(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
G4(a,b){if(a.fi("package")&&a.c==null)return A.AI(b,0,b.length)
return-1},
G1(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.b(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.d(A.as("Invalid URL encoding",null))}}return r},
w7(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.b(a,n)
r=a.charCodeAt(n)
if(r<=127)q=r===37
else q=!0
if(q){s=!1
break}++n}if(s)if(B.l===d)return B.a.m(a,b,c)
else p=new A.cu(B.a.m(a,b,c))
else{p=A.e([],t.t)
for(n=b;n<c;++n){if(!(n<o))return A.b(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.d(A.as("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.d(A.as("Truncated URI",null))
B.b.j(p,A.G1(a,n+1))
n+=2}else B.b.j(p,r)}}return d.b5(p)},
A4(a){var s=a|32
return 97<=s&&s<=122},
zC(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.e([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.d(A.an(k,a,r))}}if(q<0&&r>b)throw A.d(A.an(k,a,r))
while(p!==44){B.b.j(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.b(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.j(j,o)
else{n=B.b.gaX(j)
if(p!==44||r!==n+7||!B.a.a6(a,"base64",n+1))throw A.d(A.an("Expecting '='",a,r))
break}}B.b.j(j,r)
m=r+1
if((j.length&1)===1)a=B.cG.qo(a,m,s)
else{l=A.Ab(a,m,s,256,!0,!1)
if(l!=null)a=B.a.bI(a,m,s,l)}return new A.uS(a,j,c)},
AF(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.b(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.b(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.i(e,o>>>5,r)}return d},
zW(a){if(a.b===7&&B.a.u(a.a,"package")&&a.c<=0)return A.AI(a.a,a.e,a.f)
return-1},
AI(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
Al(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.b(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
bk:function bk(a,b,c){this.a=a
this.b=b
this.c=c},
pA:function pA(){},
pB:function pB(){},
aX:function aX(a){this.a=a},
vo:function vo(){},
au:function au(){},
ku:function ku(a){this.a=a},
dd:function dd(){},
cs:function cs(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hl:function hl(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
ld:function ld(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
je:function je(a){this.a=a},
mF:function mF(a){this.a=a},
bX:function bX(a){this.a=a},
kM:function kM(a){this.a=a},
lU:function lU(){},
j9:function j9(){},
nd:function nd(a){this.a=a},
bG:function bG(a,b,c){this.a=a
this.b=b
this.c=c},
i:function i(){},
V:function V(a,b,c){this.a=a
this.b=b
this.$ti=c},
ab:function ab(){},
x:function x(){},
nD:function nD(){},
hu:function hu(){this.b=this.a=0},
ch:function ch(a){this.a=a},
ho:function ho(a){var _=this
_.a=a
_.c=_.b=0
_.d=-1},
T:function T(a){this.a=a},
uT:function uT(a){this.a=a},
k1:function k1(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.y=_.x=_.w=$},
uS:function uS(a,b,c){this.a=a
this.b=b
this.c=c},
cm:function cm(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
n8:function n8(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.y=_.x=_.w=$},
DD(a,b){var s,r,q,p,o
if(b.length===0)return!1
s=b.split(".")
r=v.G
for(q=s.length,p=0;p<q;++p,r=o){o=r[s[p]]
A.aS(o)
if(o==null)return!1}return a instanceof t.ud.a(r)},
lO:function lO(a){this.a=a},
cW(a){var s
if(typeof a=="function")throw A.d(A.as("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.Aj,a)
s[$.o4()]=a
return s},
Aj(a,b,c){t.BO.a(a)
if(A.a4(c)>=1)return a.$1(b)
return a.$0()},
Gd(a,b,c,d){t.BO.a(a)
A.a4(d)
if(d>=2)return a.$2(b,c)
if(d===1)return a.$1(b)
return a.$0()},
Aw(a){return a==null||A.nW(a)||typeof a=="number"||typeof a=="string"||t.kT.b(a)||t.p.b(a)||t.gJ.b(a)||t.EE.b(a)||t.ys.b(a)||t.fO.b(a)||t.tu.b(a)||t.D4.b(a)||t.ni.b(a)||t.l2.b(a)||t.yp.b(a)},
B2(a){if(A.Aw(a))return a
return new A.wX(new A.jy(t.BT)).$1(a)},
B7(a,b){var s=new A.v($.E,b.h("v<0>")),r=new A.W(s,b.h("W<0>"))
a.then(A.i1(new A.x0(r,b),1),A.i1(new A.x1(r),1))
return s},
wX:function wX(a){this.a=a},
x0:function x0(a,b){this.a=a
this.b=b},
x1:function x1(a){this.a=a},
B4(a,b,c){A.Hd(c,t.fY,"T","max")
return Math.max(c.a(a),c.a(b))},
vM:function vM(a){this.a=a},
d_:function d_(){},
j7:function j7(a){this.$ti=a},
tI:function tI(a){this.a=a},
tJ:function tJ(a,b){this.a=a
this.b=b},
S:function S(){},
oR:function oR(a){this.a=a},
oS:function oS(a){this.a=a},
oT:function oT(a,b){this.a=a
this.b=b},
oU:function oU(a){this.a=a},
oV:function oV(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
yy(a,b){var s,r=a==null,q=r?new A.iV($.xr()):a,p=A.yL()
r=r?new A.iV($.xr()):a
s=A.CT()
r=new A.oW(r,s)
if(b==null)s=new A.mi(B.dn)
else s=b
return new A.ow(q,p,r,B.fv,s)},
ow:function ow(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ox:function ox(){},
oy:function oy(a){this.a=a},
ph:function ph(a,b,c,d,e){var _=this
_.a=a
_.f=b
_.r=c
_.w=d
_.y=e},
hU(a,b,c){var s,r
if(a===b)return!0
if(a.length!==b.length)return!1
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.b(b,s)
if(!J.a0(r,b[s]))return!1}return!0},
im:function im(a,b){this.a=a
this.b=b},
cx:function cx(a,b){this.a=a
this.b=b},
c0:function c0(){},
bc:function bc(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cQ:function cQ(a){this.a=a},
bO:function bO(a,b){this.a=a
this.b=b},
el:function el(a){this.a=a},
bv:function bv(a,b){this.a=a
this.b=b},
cK:function cK(a){this.a=a},
bR:function bR(a){this.a=a},
bj:function bj(a,b){this.a=a
this.b=b},
yI(a){var s=a.toLowerCase()
return s==="/dev/null"||s==="nul"||s==="nul:"||s==="$null"},
oW:function oW(a,b){this.a=a
this.b=b},
CT(){var s=A.e([],t.ES)
B.b.C(s,B.dm)
return new A.kJ(A.yM(s))},
yL(){var s=A.e([],t.ES)
B.b.C(s,B.dm)
return new A.kJ(A.yM(s))},
yM(a){var s,r,q,p,o,n,m,l,k,j,i=A.I(t.N,t.Y)
for(s=a.length,r=t.s,q=0;q<a.length;a.length===s||(0,A.M)(a),++q)for(p=a[q].gX(),o=p.length,n=0;n<p.length;p.length===o||(0,A.M)(p),++n){m=p[n]
for(l=A.e([m.a],r),B.b.C(l,B.d),k=l.length,j=0;j<l.length;l.length===k||(0,A.M)(l),++j)i.i(0,l[j].toLowerCase(),m)}return i},
CV(a,b){var s=a.w
if(s.gK(s))return B.b.hA(b,B.bX.gci(B.bX))
return B.b.hA(b,new A.pl(a))},
CU(a){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(!B.a.u(q,"-"))return q}return null},
CW(a){A.r(a)
return B.a.t(a,A.O("\\$[A-Za-z_]",!0))||B.a.t(a,A.O("\\$\\{[A-Za-z_]",!0))||B.a.t(a,A.O("\\$env:",!0))||B.a.t(a,A.O("%[A-Za-z_][A-Za-z0-9_]*%",!0))},
kJ:function kJ(a){this.a=a},
pl:function pl(a){this.a=a},
wb:function wb(a,b){this.a=a
this.b=b},
bm:function bm(a,b){this.a=a
this.b=b},
ej:function ej(a,b){this.a=a
this.b=b},
ez:function ez(a,b,c){this.a=a
this.b=b
this.c=c},
e9:function e9(){},
l1:function l1(){},
m3:function m3(){},
rQ:function rQ(a){this.a=a},
rP:function rP(a){this.a=a},
dM:function dM(a){this.a=a},
cI:function cI(a){this.a=a},
ag:function ag(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bi:function bi(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jh:function jh(a,b){this.b=a
this.c=b},
D:function D(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.f=b
_.r=c
_.w=d
_.x=e
_.y=f
_.z=g
_.Q=h},
pm:function pm(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kp:function kp(){},
kL:function kL(){},
kN:function kN(){},
kP:function kP(){},
D1(a){var s,r,q
t.a.a(a)
s=A.U(a)
r=s.h("ae<1>")
q=A.N(new A.ae(a,s.h("y(1)").a(new A.py()),r),r.h("i.E"))
if(q.length>=2){s=q[0]
s=(s==="pub"||s==="packages")&&q[1]==="publish"}else s=!1
return s},
kR:function kR(){},
py:function py(){},
kT:function kT(){},
kW:function kW(){},
pK:function pK(){},
pI:function pI(){},
pJ:function pJ(){},
kY:function kY(){},
l_:function l_(){},
l5:function l5(){},
pU:function pU(){},
pT:function pT(){},
Gx(a){var s
t.a.a(a)
s=new A.il(a,A.U(a).h("il<1,a?>"))
if(s.bX(s,new A.wo(),new A.wp())!=="push")return!1
return B.b.ac(a,new A.wq())},
l7:function l7(){},
wo:function wo(){},
wp:function wp(){},
wq:function wq(){},
l9:function l9(){},
lb:function lb(){},
lE:function lE(){},
DT(a){return B.b.ac(t.a.a(a),new A.rl())},
DV(a){var s
t.a.a(a)
s=A.U(a)
return new A.ae(a,s.h("y(1)").a(new A.rn()),s.h("ae<1>")).gn(0)>1},
DU(a){return B.b.ac(t.a.a(a),new A.rm())},
lL:function lL(){},
rl:function rl(){},
rn:function rn(){},
rm:function rm(){},
lV:function lV(){},
GN(a){var s,r,q,p,o,n
t.a.a(a)
for(s=a.length,r=!1,q=0;q<s;++q){p=a[q]
o=!0
if(p==="-s"||p==="--signal"||p==="-n"){++q
r=o
continue}if(B.a.u(p,"-")&&p.length>1){n=B.a.D(p,1)
if(n==="1"||n==="0"){if(r)return!0
r=o
continue}r=o
continue}if(p==="1"||p==="0"||p==="-1")return!0}return!1},
GM(a){var s,r,q,p,o
t.a.a(a)
for(s=0;r=a.length,s<r;++s){q=a[s]
if((q==="-u"||q==="--user")&&s+1<r){p=s+1
if(!(p<r))return A.b(a,p)
o=a[p]
if(o==="root"||o==="0")return!0
continue}if(!B.a.u(q,"-")&&B.oy.t(0,q))return!0}return!1},
m9:function m9(){},
mm:function mm(){},
GV(a,b){var s
t.a.a(a)
if(!B.b.ac(a,new A.wr()))return
if(B.b.ac(a,new A.ws())){s=b.c
b.c=s.a>=3?s:B.o
b.cr("Recursive permission/ownership change on a system root.")}},
GH(a){var s,r,q=B.a.G(a).toLowerCase()
if(q==="/"||q==="/*")return!0
for(s=B.dT.gJ(B.dT);s.q();){r=s.gA()
if(q!==r){r+="/"
r=q===r||B.a.u(q,r)}else r=!0
if(r)return!0}return!1},
mw:function mw(){},
u3:function u3(){},
u2:function u2(){},
wr:function wr(){},
ws:function ws(){},
mL:function mL(){},
mO:function mO(){},
cJ:function cJ(a,b){this.a=a
this.b=b},
pM:function pM(){},
yN(a){var s
if(a==null){s=$.xr()
s=A.yy(new A.iV(s),null)}else s=a
return new A.po(s,B.fQ)},
po:function po(a,b){this.b=a
this.c=b},
xo:function xo(){},
xp:function xp(){},
xq:function xq(){},
wy:function wy(){},
rB(a,b,c){return new A.iU(a)},
iU:function iU(a){this.c=a},
iV:function iV(a){this.a=a},
pn:function pn(){},
rX:function rX(){},
rY:function rY(a,b,c){this.a=a
this.b=b
this.c=c},
q5:function q5(){},
q6:function q6(a){this.a=a},
yg(a,b){var s=B.a.aY(a,A.O("[\\\\/]",!0)),r=s>=0?B.a.D(a,s+1):a
r=r.toLowerCase()
if(B.a.aA(r,".exe"))r=B.a.m(r,0,r.length-4)
if(B.nG.t(0,r))return A.y7(b,A.IM())
if(r==="cmd")return A.y7(b,new A.wS())
if(B.oA.t(0,r))return A.y7(b,new A.wT())
return null},
GE(a){var s
if(a==="-c"||a==="--command")return!0
s=!1
if(a.length>=2)if(a[0]==="-")if(a[1]!=="-")if(B.a.aA(a,"c")){s=A.O("^-[a-z]+$",!0)
s=s.b.test(a)}if(s)return!0
return!1},
y7(a,b){var s,r
for(s=0;s<a.length;++s)if(b.$1(a[s])){r=s+1
return r<a.length?r:null}return null},
wS:function wS(){},
wT:function wT(){},
kV:function kV(a,b){this.a=a
this.b=b},
aV:function aV(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
zU(a){return a===" "||a==="\t"||a==="\r"||a==="\n"||a==="|"||a==="&"||a===";"||a===">"},
FK(a){var s
if(a!=null){if(0>=a.length)return A.b(a,0)
s=a.charCodeAt(0)>=48&&a.charCodeAt(0)<=57}else s=!1
return s},
rO:function rO(){},
cF:function cF(a,b){this.a=a
this.b=b},
aW:function aW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
jK:function jK(a,b){this.a=a
this.b=b
this.c=0},
jJ:function jJ(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=0},
vX:function vX(){},
FM(a){var s
if(a!=null){if(0>=a.length)return A.b(a,0)
s=a.charCodeAt(0)>=48&&a.charCodeAt(0)<=57}else s=!1
return s},
zV(a){return a===" "||a==="\t"||a==="\r"||a==="\n"||a==="|"||a==="&"||a===";"||a==="<"||a===">"},
tH:function tH(){},
oL:function oL(){},
rN:function rN(){},
be:function be(a,b){this.a=a
this.b=b},
aJ:function aJ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
jQ:function jQ(a,b){this.a=a
this.b=b
this.c=0},
jV:function jV(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=0},
w3:function w3(){},
zI(a){return a===" "||a==="\t"||a==="\r"||a==="\n"||a==="|"||a==="&"||a===">"||a==="<"},
Fr(a){var s
if(a!=null){if(0>=a.length)return A.b(a,0)
s=a.charCodeAt(0)>=48&&a.charCodeAt(0)<=57}else s=!1
return s},
v7:function v7(){},
cB:function cB(a,b){this.a=a
this.b=b},
b0:function b0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
n7:function n7(a,b){this.a=a
this.b=b
this.c=0},
n6:function n6(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=0},
vm:function vm(){},
dy:function dy(){},
m_:function m_(){},
lx:function lx(){},
mg:function mg(){},
ml:function ml(){},
tF:function tF(){},
tG:function tG(){},
Cy(a){var s,r
switch(a.a.a){case 6:return'Benign redirection "'+a.b+'" (stream merge); writes no file.'
case 0:case 1:case 4:case 5:case 7:case 8:case 2:case 3:s=a.b
r=s.toLowerCase()
if(r==="/dev/null"||r==="nul"||r==="nul:"||r==="$null")return'Benign redirection to null sink "'+s+'"; discards the stream.'
return null}},
kA:function kA(){},
kK:function kK(){},
kQ:function kQ(){},
px:function px(a,b,c){this.a=a
this.b=b
this.c=c},
D9(a){return B.b.ac(a,new A.pD())},
D8(a){var s
A.r(a)
if(a==="--recursive")return!0
if(a.toLowerCase()==="/s")return!0
if(B.a.u(a,"--"))return!1
if(B.a.u(a,"-")){s=A.O("[rR]",!0)
s=s.b.test(a)}else s=!1
return s},
D7(a){A.r(a)
if(a==="--force")return!0
if(a.toLowerCase()==="/f"||a.toLowerCase()==="/q")return!0
if(B.a.u(a,"--"))return!1
return B.a.u(a,"-")&&B.a.t(a,"f")},
D6(a){var s,r,q,p=B.a.G(A.r(a))
if(p.length===0)return!1
if(B.o9.t(0,p))return!0
s=$.Bq()
if(s.b.test(p))return!0
s=$.Bs()
if(s.b.test(p))return!0
s=$.Br()
if(s.b.test(p))return!0
r=p.toLowerCase()
s=$.Bp()
if(s.b.test(r))return!0
for(s=B.dS.gJ(B.dS);s.q();){q=s.gA()
if(r===q||r===q+"/"||B.a.u(r,q+"/*"))return!0}return!1},
kU:function kU(){},
pD:function pD(){},
pC:function pC(){},
vI:function vI(a,b){this.a=a
this.b=b},
kZ:function kZ(){},
lt:function lt(a){this.a=a},
lX:function lX(){},
m8:function m8(){},
mc:function mc(){},
mk:function mk(){},
tA:function tA(){},
tB:function tB(){},
tC:function tC(){},
tD:function tD(){},
tE:function tE(){},
t9:function t9(a,b){this.a=a
this.b=b},
mi:function mi(a){this.a=a},
t7:function t7(){},
zq(a,b){var s,r,q,p,o,n,m=new A.T(""),l=a.length
for(s=0;s<l;){if(!(s>=0))return A.b(a,s)
r=a[s]
if(r==="\\"){q=m.a+=" "
p=s+1
if(p<l){m.a=q+" "
s+=2}else s=p
continue}if(r!=="'")q=r==='"'&&b
else q=!0
if(q){o=B.a.a_(a,r,s+1)
if(o<0){for(n=s;n<l;++n)m.a+=" "
s=l}else{for(n=s;n<=o;++n)m.a+=" "
s=o+1}continue}m.a+=r;++s}q=m.a
return q.charCodeAt(0)==0?q:q},
t8:function t8(a,b,c){var _=this
_.a=a
_.c=b
_.d=c
_.w=_.r=_.f=_.e=$},
bK:function bK(){},
a9:function a9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bV:function bV(a,b){this.a=a
this.b=b},
em:function em(a,b){this.a=a
this.b=b},
ip:function ip(a,b){this.a=a
this.b=b},
ek:function ek(a,b,c){this.a=a
this.b=b
this.c=c},
kz:function kz(){},
ih:function ih(){},
oI:function oI(){},
oJ:function oJ(){},
oK:function oK(){},
fG:function fG(a){this.a=a},
oQ:function oQ(a){this.a=a},
kD:function kD(a,b){this.a=a
this.b=b},
Ey(a,b){var s=new Uint8Array(0),r=$.Bk()
if(!r.b.test(a))A.K(A.cY(a,"method","Not a valid method"))
r=t.N
return new A.me(B.l,s,a,b,A.xK(new A.oI(),new A.oJ(),r,r))},
me:function me(a,b,c,d,e){var _=this
_.x=a
_.y=b
_.a=c
_.b=d
_.r=e
_.w=!1},
t3(a){var s=0,r=A.p(t.ey),q,p,o,n,m,l,k,j
var $async$t3=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=3
return A.f(a.w.rh(),$async$t3)
case 3:p=c
o=a.b
n=a.a
m=a.e
l=a.c
k=A.Bi(p)
j=p.length
k=new A.mf(k,n,o,l,j,m,!1,!0)
k.ip(o,j,m,!1,!0,l,n)
q=k
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$t3,r)},
wh(a){var s=a.k(0,"content-type")
if(s!=null)return A.z7(s)
return A.rf("application","octet-stream",null)},
mf:function mf(a,b,c,d,e,f,g,h){var _=this
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h},
mu:function mu(a,b,c,d,e,f,g,h){var _=this
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h},
CC(a){return A.r(a).toLowerCase()},
ij:function ij(a,b,c){this.a=a
this.c=b
this.$ti=c},
z7(a){return A.Jj("media type",a,new A.rg(a),t.Bo)},
rf(a,b,c){var s=t.N
if(c==null)s=A.I(s,s)
else{s=new A.ij(A.Hc(),A.I(s,t.q),t.z0)
s.C(0,c)}return new A.fY(a.toLowerCase(),b.toLowerCase(),new A.f8(s,t.hL))},
fY:function fY(a,b,c){this.a=a
this.b=b
this.c=c},
rg:function rg(a){this.a=a},
ri:function ri(a){this.a=a},
rh:function rh(){},
Iy(a){var s
a.k6($.C0(),"quoted string")
s=a.ghN().k(0,0)
return A.Bf(B.a.m(s,1,s.length-1),$.C_(),t.tj.a(t.pj.a(new A.wK())),null)},
wK:function wK(){},
ke:function ke(a){this.b=this.a=!1
this.c=a},
xy(a){var s,r=a==null?null:B.a.G(a)
A:{if("standard"===r){s=B.ct
break A}if("plan"===r){s=B.a6
break A}if("auto"===r){s=B.cu
break A}s=null
break A}return s},
e5:function e5(a,b){this.a=a
this.b=b},
om(a){var s,r,q=B.c.l(Math.abs(a)),p=a<0?"-":""
for(s=q.length,r=0;r<s;++r){if(r>0&&B.c.bc(s-r,3)===0)p+=","
p+=q[r]}return p.charCodeAt(0)==0?p:p},
of:function of(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kg:function kg(a,b){this.a=a
this.b=b},
fy:function fy(a,b){this.a=a
this.b=b},
dx:function dx(a,b){this.a=a
this.b=b},
cf:function cf(a,b){this.a=a
this.b=b},
og:function og(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
ok:function ok(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.Q=_.z=_.y=!1
_.as=j
_.at=0
_.ax=k},
on:function on(){},
oo:function oo(){},
op:function op(a){this.a=a},
ol:function ol(){},
cn:function cn(a,b){this.a=a
this.b=b},
kh:function kh(){},
kl:function kl(){},
yx(a){var s,r=a==null?null:B.a.G(a)
A:{if("anthropic"===r){s=B.bg
break A}if("openai"===r){s=B.eA
break A}if("gemini"===r){s=B.eB
break A}s=null
break A}return s},
AR(a){var s
switch(a.a){case 0:s="claude-haiku-4-5"
break
case 1:s="gpt-4.1-mini"
break
case 2:s="gemini-2.5-flash"
break
default:s=null}return s},
kf:function kf(a,b){this.a=a
this.b=b},
ia:function ia(a,b){this.a=a
this.b=b},
i8:function i8(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
iq:function iq(a,b,c){this.a=a
this.b=b
this.c=c},
fP:function fP(a,b,c){this.a=a
this.b=b
this.c=c},
xz(a){return new A.ba(B.bh,a,B.ab,null)},
xA(a){return new A.ba(B.bi,a,B.ab,null)},
dp(a){var s=typeof a=="number"?B.p.kx(a):0
return s<0?0:s},
yb(a,b){var s=a.k(0,"x-omnyshell-proxy-elapsed-ms"),r=s==null?null:A.bJ(B.a.G(s),null)
return r!=null&&r>=0?r:b},
i9(a,b){return new A.dr(a,b)},
fA:function fA(a,b){this.a=a
this.b=b},
ba:function ba(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cc:function cc(a,b,c){this.a=a
this.b=b
this.c=c},
fC:function fC(a,b,c){this.a=a
this.b=b
this.c=c},
bu:function bu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fB:function fB(a,b){this.a=a
this.b=b},
e8:function e8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ds:function ds(a,b,c){this.a=a
this.b=b
this.d=c},
dr:function dr(a,b){this.a=a
this.b=b},
kn:function kn(a,b){this.a=a
this.b=b},
oA:function oA(){},
oB:function oB(){},
oC:function oC(){},
oz:function oz(a,b){this.a=a
this.b=b},
l6:function l6(a,b){this.a=a
this.b=b},
q2:function q2(){},
q3:function q3(){},
q4:function q4(){},
lS:function lS(a,b){this.a=a
this.b=b},
Cs(a){var s=B.a.G(a).toLowerCase()
return s==="off"||s==="none"||s==="default"},
ki:function ki(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
oq:function oq(a,b){this.a=a
this.b=b},
or:function or(a,b){this.a=a
this.b=b},
os:function os(a,b,c){this.a=a
this.b=b
this.c=c},
ot:function ot(a,b){this.a=a
this.b=b},
ou:function ou(a,b){this.a=a
this.b=b},
nw:function nw(a){this.a=a},
n5:function n5(a){this.a=a},
l2:function l2(a,b,c){this.a=a
this.b=b
this.c=c},
d0:function d0(a,b){this.a=a
this.b=b},
f1:function f1(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
f0:function f0(a,b){this.a=a
this.b=b},
cd:function cd(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
kX:function kX(){},
d9:function d9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cX:function cX(a,b,c){this.a=a
this.b=b
this.c=c},
p0:function p0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
kE:function kE(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
_.a=a
_.f=_.e=_.d=_.c=_.b=null
_.r=b
_.w=c
_.x=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.CW=m
_.cx=n},
p3:function p3(a){this.a=a},
p1:function p1(a,b){this.a=a
this.b=b},
pa:function pa(a,b){this.a=a
this.b=b},
pf:function pf(a,b){this.a=a
this.b=b},
pb:function pb(a,b){this.a=a
this.b=b},
p8:function p8(a,b){this.a=a
this.b=b},
pg:function pg(a,b){this.a=a
this.b=b},
pe:function pe(a,b){this.a=a
this.b=b},
p4:function p4(a,b){this.a=a
this.b=b},
p9:function p9(a,b){this.a=a
this.b=b},
p5:function p5(a,b){this.a=a
this.b=b},
p6:function p6(a,b){this.a=a
this.b=b},
p7:function p7(){},
pd:function pd(a,b){this.a=a
this.b=b},
pc:function pc(a,b){this.a=a
this.b=b},
p2:function p2(a,b){this.a=a
this.b=b},
IV(a){var s,r,q,p,o=B.a.G(a)
if(o.length===0)return!1
s=A.GZ(a,o)
if(s.length===0)return!1
r=$.C2()
if(r.b.test(a))return!0
q=A.Gc(B.b.gI(s))
if(q==="cd")return!0
if(q==="git"){p=A.Gn(A.bx(s,1,null,A.U(s).c))
if(p==="config")return!B.b.t(s,"--get")&&!B.b.t(s,"--list")&&!B.b.t(s,"-l")
return!B.oa.t(0,p)}return!B.o0.t(0,q)},
GZ(a,b){var s,r,q,p,o,n=B.a.cC(b,A.O("\\s+",!0))
B.b.qN(n,new A.wv())
for(s=0;r=n.length,s<r;){if(!(s>=0))return A.b(n,s)
q=n[s]
r=A.O("^[A-Za-z_][A-Za-z0-9_]*=",!0)
if(r.b.test(q)){++s
continue}p=B.a.aY(q,"/")
if(B.np.t(0,p<0?q:B.a.D(q,p+1))){++s
for(;;){r=n.length
if(!(s<r&&B.a.u(n[s],"-")))break
if(!(s<r))return A.b(n,s)
o=s+1
s=B.nW.t(0,n[s])&&o<n.length?o+1:o}continue}break}return B.b.b2(n,s)},
Gn(a){var s,r,q=a.fu(0)
for(s=0;s<q.length;s=(B.oF.t(0,r)?s+1:s)+1){r=q[s]
if(!B.a.u(r,"-"))return r}return""},
Gc(a){var s=B.a.aY(a,"/")
return s<0?a:B.a.D(a,s+1)},
wv:function wv(){},
CP(a,b){return new A.pj(A.CQ(B.G,b),b)},
CQ(a,b){var s=A.N(a,t.N),r=s.length
if(r>b)return B.b.b2(s,r-b)
return s},
pj:function pj(a,b){this.a=a
this.b=b},
qx:function qx(a,b){var _=this
_.a=a
_.b=b
_.c=""
_.d=null},
pv(a,b){var s
if(b>=a.length)return null
s=a[b]
return s.length===0?null:s},
D0(a,b){var s,r,q,p,o,n=a.length,m=b.length,l=m-1
if(n<l)l=n
for(s=l;s>0;--s){q=n-s
p=0
for(;;){if(!(p<s)){r=!0
break}o=q+p
if(!(o>=0&&o<n))return A.b(a,o)
o=a[o]
if(!(p<m))return A.b(b,p)
if(o!==b[p]){r=!1
break}++p}if(r)return s}return 0},
D_(a,b){var s,r,q,p,o,n,m=b.length
if(m===0)return-1
s=a.length
r=s-m
for(q=0;q<=r;++q){o=0
for(;;){if(!(o<m)){p=!0
break}n=q+o
if(!(n<s))return A.b(a,n)
if(a[n]!==b[o]){p=!1
break}++o}if(p)return q}return-1},
pw:function pw(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
pu:function pu(a,b){this.a=a
this.b=b},
yw(a,b){var s=b.length>16e3?B.a.m(b,0,16e3)+"\n\u2026(truncated)\u2026":b
return new A.fx(a,"The user is working on this file.\n\nPath: "+a+"\n\n```\n"+s+"\n```")},
xx(a,b){var s,r,q=J.at(b)
if(q.gn(b)>200){s=A.N(q.bz(b,200),t.N)
s.push("\u2026("+(q.gn(b)-200)+" more)")
r=s}else r=b
q=J.at(r)
q=q.gK(r)?"(empty)":q.S(r,"\n")
return new A.fx(a+"/","The user is working in this directory.\n\nPath: "+a+"\n\nContents:\n"+q)},
fx:function fx(a,b){this.a=a
this.b=b},
fz:function fz(a,b){this.a=a
this.b=b},
ma:function ma(a,b,c){this.a=a
this.b=b
this.c=c},
rU:function rU(a){this.a=a},
rW:function rW(a){this.a=a},
rV:function rV(a){this.a=a},
mE:function mE(){},
oh:function oh(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.d=c
_.e=d
_.f=e
_.r=""
_.w=0
_.x=!1},
oi:function oi(a,b){this.a=a
this.b=b},
oj:function oj(a){this.a=a},
q7(a,b){return A.Ds(a,b)},
Ds(a,b){var s=0,r=A.p(t.kh),q,p=2,o=[],n,m,l,k,j
var $async$q7=A.q(function(c,d){if(c===1){o.push(d)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(a.d_("git rev-parse --show-toplevel",b),$async$q7)
case 7:n=d
if(n.a!==0){q=null
s=1
break}m=B.a.G(n.b)
if(J.aE(m)===0){q=null
s=1
break}l=$.b3().a4(m)
q=new A.l8(a,l)
s=1
break
p=2
s=6
break
case 4:p=3
j=o.pop()
q=null
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$q7,r)},
l8:function l8(a,b){this.a=a
this.b=b},
J_(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=A.I(t.N,t.gH)
for(s=a.split("\n"),r=s.length,q=0;q<r;++q){p=s[q]
if(p.length<3)continue
o=p[0]
n=p[1]
m=B.a.D(p,3)
if(o==="?"&&n==="?"){g.i(0,A.hZ(m),B.aQ)
continue}if(o==="!"&&n==="!"){g.i(0,A.hZ(m),B.bF)
continue}l=!0
if(o!=="U")if(n!=="U")if(!(o==="A"&&n==="A"))l=o==="D"&&n==="D"
if(l){g.i(0,A.hZ(m),B.bG)
continue}if(o==="R"||n==="R"){k=B.a.aW(m," -> ")
if(k>=0){j=A.hZ(B.a.m(m,0,k))
i=A.hZ(B.a.D(m,k+4))
g.i(0,j,B.au)
g.i(0,i,B.au)
continue}g.i(0,A.hZ(m),B.au)
continue}h=o!==" "?o:n
A:{if("A"===h){l=B.aP
break A}if("M"===h){l=B.at
break A}if("D"===h){l=B.bE
break A}if("C"===h){l=B.aP
break A}if("T"===h){l=B.at
break A}l=B.at
break A}g.i(0,A.hZ(m),l)}return g},
J0(a){var s,r,q,p,o,n,m=t.S,l=A.I(m,t.wV),k=A.cN(m),j=a.split("\n")
for(m=t.s,s=0;r=j.length,s<r;){if(!(s>=0))return A.b(j,s)
q=j[s]
if(!B.a.u(q,"@@")){++s
continue}p=A.GT(q)
if(p==null){++s
continue}o=A.e([],m);++s
for(;;){if(!(s<r&&!B.a.u(j[s],"@@")))break
if(!(s<r))return A.b(j,s)
n=j[s]
if(B.a.u(n,"diff ")||B.a.u(n,"--- ")||B.a.u(n,"+++ "))break
B.b.j(o,n);++s}A.G7(p.a,o,l,k)}return new A.fW(l,k)},
GT(a){var s,r=$.BY().d0(a)
if(r==null)return null
s=r.b
if(1>=s.length)return A.b(s,1)
s=s[1]
s.toString
return new A.vJ(A.fs(s))},
G7(a,b,c,d){var s,r,q,p,o,n,m,l,k=A.e([],t.t)
for(s=b.length,r=a,q=0,p=0;p<b.length;b.length===s||(0,A.M)(b),++p){o=b[p]
if(B.a.u(o,"+")){B.b.j(k,r);++r}else if(B.a.u(o,"-"))++q
else ++r}n=k.length
if(q<n)n=q
for(m=0;s=k.length,m<s;++m){s=k[m]
c.i(0,s,m<n?B.d0:B.bH)}if(q>s){if(s===0)l=a<1?1:a
else l=B.b.gaX(k)+1
d.j(0,l)}},
hZ(a){var s=B.a.G(a),r=s.length
if(r>=2&&B.a.u(s,'"')&&B.a.aA(s,'"')){r=B.a.m(s,1,r-1)
r=A.ad(r,'\\"','"')
return A.ad(r,"\\\\","\\")}return s},
bH:function bH(a,b){this.a=a
this.b=b},
fO:function fO(a,b){this.a=a
this.b=b},
fW:function fW(a,b){this.a=a
this.b=b},
vJ:function vJ(a){this.a=a},
DB(a,b,c,d,e,f){var s=A.e([],t.AV),r=$.E,q=f.d,p=$.b3(),o=p.a4(q),n=p.a
p=A.eI(p.a4(q),n).gjU().length===0?p.a4(q):A.eI(p.a4(q),n).gjU()
return new A.lc(f,q,e,new A.qe(),new A.l4(new A.qS(f),new A.bF(o,p,!0,0,!0)),f.e,b,a,d,c,s,B.C,B.dr,new A.W(new A.v(r,t.D),t.h))},
fN:function fN(a,b){this.a=a
this.b=b},
jI:function jI(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
vn:function vn(a,b,c){this.a=a
this.b=b
this.c=c},
lc:function lc(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null
_.f=e
_.r=f
_.x=null
_.y=g
_.z=h
_.Q=i
_.as=j
_.at=k
_.ax=-1
_.ay=l
_.CW=_.ch=0
_.cx=null
_.cy=!1
_.db=null
_.dx=!1
_.dy=null
_.fr=m
_.fy=_.fx=null
_.k1=_.id=_.go=!1
_.k2=null
_.k3=""
_.ok=n},
qS:function qS(a){this.a=a},
qT:function qT(a,b,c){this.a=a
this.b=b
this.c=c},
qU:function qU(a){this.a=a},
qV:function qV(a){this.a=a},
qM:function qM(a){this.a=a},
qE:function qE(a){this.a=a},
qF:function qF(){},
qG:function qG(a,b){this.a=a
this.b=b},
qH:function qH(a,b,c){this.a=a
this.b=b
this.c=c},
qI:function qI(a,b,c){this.a=a
this.b=b
this.c=c},
qJ:function qJ(a,b,c){this.a=a
this.b=b
this.c=c},
qK:function qK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
qL:function qL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
qR:function qR(){},
qQ:function qQ(a){this.a=a},
qP:function qP(a){this.a=a},
qN:function qN(){},
qO:function qO(a){this.a=a},
qB:function qB(a){this.a=a},
qy:function qy(){},
qz:function qz(){},
qA:function qA(){},
qC:function qC(a){this.a=a},
qD:function qD(a,b,c){this.a=a
this.b=b
this.c=c},
ni:function ni(a){this.a=a},
vK:function vK(){},
yR(a,b,c){var s,r,q,p=B.a.t(b,A.ak(0)),o=B.a.t(b,"\r\n"),n=A.ad(b,"\r\n","\n"),m=B.a.aA(n,"\n"),l=t.s,k=A.e((m&&n.length!==0?B.a.m(n,0,n.length-1):n).split("\n"),l)
l=k.length===0?A.e([""],l):k
s=o?"\r\n":"\n"
r=m||b.length===0
q=c.q1(a)
return new A.et(new A.uH(a,l,s,r,p),q,B.bL)},
et:function et(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=0
_.f=null},
Do(a,b){var s=t.cy
s.a(a)
s.a(b)
s=a.b
if(s!==b.b)return s?-1:1
return B.a.a3(a.a.toLowerCase(),b.a.toLowerCase())},
bQ:function bQ(a,b){this.a=a
this.b=b},
bF:function bF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=null},
l4:function l4(a,b){this.a=a
this.b=b
this.c=!1},
pS:function pS(a){this.a=a},
pP:function pP(a){this.a=a},
pQ:function pQ(){},
pR:function pR(){},
uH:function uH(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=_.r=_.f=0
_.x=!1},
kS:function kS(){},
aM:function aM(a,b){this.a=a
this.b=b},
hw:function hw(a,b){this.a=a
this.b=b},
cM:function cM(a){this.a=a},
aU:function aU(a,b){this.a=a
this.b=b},
uL:function uL(){},
d2:function d2(){},
qe:function qe(){},
lq:function lq(){},
lC:function lC(){},
lY:function lY(){},
hn:function hn(a,b,c){var _=this
_.a=a
_.b=b
_.c=null
_.d=c},
mU:function mU(){},
pi:function pi(a,b,c){this.a=a
this.b=b
this.c=c},
us:function us(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.d=c
_.e=d
_.f=""
_.r=0
_.x=_.w=null
_.y=e
_.z=0},
uE:function uE(a,b,c){this.a=a
this.b=b
this.c=c},
uz:function uz(a){this.a=a},
uB:function uB(a){this.a=a},
uA:function uA(a,b){this.a=a
this.b=b},
uC:function uC(a,b){this.a=a
this.b=b},
uD:function uD(a,b,c){this.a=a
this.b=b
this.c=c},
uy:function uy(a,b,c){this.a=a
this.b=b
this.c=c},
ut:function ut(a){this.a=a},
uu:function uu(a,b){this.a=a
this.b=b},
uv:function uv(){},
uw:function uw(a,b){this.a=a
this.b=b},
ux:function ux(a,b,c){this.a=a
this.b=b
this.c=c},
km:function km(){},
d8:function d8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
b6:function b6(a,b){this.a=a
this.b=b},
aP:function aP(a,b,c){this.a=a
this.b=b
this.c=c},
DG(a){if((a&224)===192)return 2
if((a&240)===224)return 3
if((a&248)===240)return 4
return 0},
r4:function r4(a){this.a=a},
du:function du(a,b){this.a=a
this.b=b},
t6:function t6(a,b,c){this.a=a
this.b=b
this.c=c},
aF:function aF(a){this.b=a},
a5:function a5(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
mb:function mb(a,b,c){this.a=a
this.b=b
this.c=c},
t0:function t0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
t1:function t1(a,b){this.a=a
this.b=b},
t2:function t2(){},
jB:function jB(a,b){this.a=a
this.b=b},
md:function md(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
mR(a){return new A.mQ(a)},
dO:function dO(a,b){this.a=a
this.b=b},
mS:function mS(a,b){this.a=a
this.b=b},
mQ:function mQ(a){this.a=a},
hr:function hr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eT:function eT(a,b){this.a=a
this.b=b},
lg:function lg(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.w=f
_.x=g
_.y=h
_.Q=_.z=null
_.ax=_.at=_.as=!1
_.ay=i
_.dx=_.db=_.cy=_.cx=_.CW=_.ch=null},
qZ:function qZ(a){this.a=a},
DL(a){var s,r,q,p,o,n,m,l,k,j,i=J.at(a)
if(i.gK(a))return""
s=i.gI(a)
r=t.N
q=t.cS
q.h("a(i.E)").a(A.nZ())
q=q.h("i.E")
s=A.d6(new A.ch(s),A.nZ(),q,r)
p=A.N(s,A.l(s).h("i.E"))
for(i=i.aS(a,1),s=i.$ti,i=new A.aI(i,i.gn(0),s.h("aI<Q.E>")),s=s.h("Q.E");i.q();){o=i.d
o=A.d6(new A.ch(o==null?s.a(o):o),A.nZ(),q,r)
n=A.N(o,A.l(o).h("i.E"))
m=p.length
l=n.length
k=m<l?m:l
j=0
for(;;){if(j<k){if(!(j<m))return A.b(p,j)
o=p[j]
if(!(j<l))return A.b(n,j)
o=o===n[j]}else o=!1
if(!o)break;++j}p=B.b.aq(p,0,j)
if(p.length===0)break}return B.b.cp(p)},
DM(a){var s,r,q,p,o,n=A.N(new A.ch(a),t.cS.h("i.E"))
for(s=n.length,r=0,q=0;q<s;){if(!(q>=0))return A.b(n,q)
if(n[q]===27){++q
if(q<s&&n[q]===91){++q
for(;;){p=q<s
if(p){o=n[q]
o=!(o>=64&&o<=126)}else o=!1
if(!o)break;++q}if(p)++q}continue}++r;++q}return r},
ly:function ly(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=e
_.r=f
_.w=g
_.x=h
_.y=i
_.z=null
_.Q=!1
_.as=null
_.ay=_.ax=_.at=!1
_.ch=null
_.CW=""
_.cx=j
_.cy=0
_.db=k
_.fr=_.dy=_.dx=0
_.fx=$
_.fy=l
_.go=""
_.id=m
_.k1=0},
r5:function r5(){},
jH:function jH(a,b){this.a=a
this.b=b},
DQ(){var s,r,q=new A.r9(A.I(t.N,t.kQ))
for(s=$.Bv(),r=0;r<16;++r)q.fp(s[r])
return q},
Ar(a){var s=a.a
return B.a.d5(B.c.l(B.c.W(s,36e8)),2,"0")+":"+B.a.d5(B.c.l(B.c.bc(B.c.W(s,6e7),60)),2,"0")+":"+B.a.d5(B.c.l(B.c.bc(B.c.W(s,1e6),60)),2,"0")},
GX(a){var s
switch(a.a){case 0:s="POSIX (sh/bash)"
break
case 1:s="PowerShell"
break
case 2:s="cmd.exe"
break
default:s=null}return s},
IZ(a){var s,r,q,p,o,n,m,l,k,j,i,h=A.e([],t.Cp)
for(s=B.bn.Y(a),r=s.length,q=0;q<s.length;s.length===r||(0,A.M)(s),++q){p=s[q]
if(p.length===0)continue
o=B.a.aW(p,"|")
if(o<0)continue
n=o+1
m=B.a.a_(p,"|",n)
if(m<0)continue
l=B.a.m(p,0,o).toLowerCase()
k=A.bJ(B.a.G(B.a.m(p,n,m)),null)
if(k==null)k=0
j=B.a.D(p,m+1)
i=B.a.t(l,"link")
B.b.j(h,new A.jO([!i&&B.a.t(l,"dir"),i,j,k]))}return h},
H4(a,b){var s
if(b===a)return""
if(a==="/")return B.a.u(b,"/")?B.a.D(b,1):b
s=B.a.aA(a,"/")?a:a+"/"
return B.a.u(b,s)?B.a.D(b,s.length):b},
J4(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g={},f=new A.c8(a,!0,A.I(t.N,t.tW))
for(s=b.length,r=0;r<b.length;b.length===s||(0,A.M)(b),++r){q=b[r].a
p=A.H4(a,q[2])
if(p.length===0){f.b=q[0]
f.c=q[1]
f.d=q[3]
continue}o=p.split("/")
for(n=f,m=0;l=o.length,m<l;++m){k=o[m]
if(k.length===0)continue
j=n.f.qI(k,new A.x6(k))
if(m===l-1){j.b=q[0]
j.c=q[1]
j.d=q[3]}else j.b=!0
n=j}}A.AK(f)
i=A.e([a+"  ["+A.AW(f.e)+"]"],t.s)
g.a=g.b=0
new A.x7(g,c,i).$3(f,"",1)
B.b.j(i,"")
s=g.b
q=s===1?"y":"ies"
l=g.a
h=l===1?"":"s"
B.b.j(i,""+s+" director"+q+", "+l+" file"+h)
return i},
AK(a){var s,r
if(!a.b)return a.e=a.d
for(s=a.f,s=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>")),r=0;s.q();)r+=A.AK(s.d)
return a.e=r},
GS(a){var s,r,q,p=A.O("^(\\d+)\\s*([smhd])$",!0).d0(B.a.G(a).toLowerCase())
if(p==null)return null
s=p.b
if(1>=s.length)return A.b(s,1)
r=s[1]
r.toString
q=A.fs(r)
if(2>=s.length)return A.b(s,2)
s=s[2]
s.toString
A:{if("s"===s){s=A.it(0,0,0,0,0,q)
break A}if("m"===s){s=A.it(0,0,0,0,q,0)
break A}if("h"===s){s=A.it(0,q,0,0,0,0)
break A}if("d"===s){s=A.it(q,0,0,0,0,0)
break A}s=null
break A}return s},
hp:function hp(a,b){this.a=a
this.b=b},
r8:function r8(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=g
_.x=h
_.y=i
_.z=j
_.Q=k
_.as=l
_.at=m
_.ax=n
_.ay=o
_.CW=_.ch=!1},
av:function av(){},
r9:function r9(a){this.a=a},
ra:function ra(){},
ng:function ng(){},
nj:function nj(){},
vL:function vL(){},
nT:function nT(){},
ns:function ns(){},
mW:function mW(){},
nh:function nh(){},
nr:function nr(){},
vS:function vS(){},
n3:function n3(){},
nx:function nx(){},
no:function no(){},
nu:function nu(){},
vU:function vU(){},
vV:function vV(){},
vW:function vW(){},
nH:function nH(){},
w4:function w4(a){this.a=a},
nG:function nG(){},
c8:function c8(a,b,c){var _=this
_.a=a
_.b=b
_.c=!1
_.e=_.d=0
_.f=c},
x6:function x6(a){this.a=a},
x7:function x7(a,b,c){this.a=a
this.b=b
this.c=c},
x8:function x8(){},
na:function na(){},
ne:function ne(){},
n4:function n4(){},
cg:function cg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=$
_.w=_.r=null
_.x=!1
_.y=f},
is:function is(a,b){this.b=a
this.c=b},
zs(a){var s
switch(a.a){case 0:s=B.fS
break
case 1:s=B.fT
break
case 2:s=B.fj
break
default:s=null}return s},
hq:function hq(){},
m0:function m0(){},
m2:function m2(){},
kH:function kH(){},
IA(a,b,a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g=a0!=null&&a0.length!==0,f=A.GY(b),e=a3==null,d=new A.wM(a1,f,b,g,a0,a,a2,e?"":" (\u26a0 "+a3+")"),c=0
if(a4>0){s=c
for(;;){if(!(s<5)){c=4
break}if(new A.ch(d.$1(s)).gn(0)+16<=a4){c=s
break}++s}}r=B.bN[c].a
q=r[0]
p=r[1]
o=r[2]
n=r[3]
m=q?"@"+a1:""
l=p?f:b
k=n&&g?" "+a0:""
j=k.length===0?"":"\x1b[32m"+k+"\x1b[31m"
i=a==null||!o?"":" \x1b[34mgit(\x1b[31m"+a+j+"\x1b[0m\x1b[34m)\x1b[0m"
h=e?"":" \x1b[1;31m(\u26a0 "+a3+")\x1b[0m"
return"\x1b[32m"+a2+m+"\x1b[0m:\x1b[36m"+l+"\x1b[0m"+i+h+" $ "},
GY(a){var s,r=A.O("[/\\\\]+$",!0),q=A.ad(a,r,""),p=B.a.aY(q,A.O("[/\\\\]",!0))
if(p<0)return a
s=B.a.D(q,p+1)
if(s.length===0)return a
return"\u2026/"+s},
wM:function wM(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
nP:function nP(){},
m6:function m6(a,b,c){this.a=a
this.b=b
this.c=c},
zn(a){var s,r,q=A.A(a,"term")
if(q==null)q="xterm-256color"
s=A.bT(a,"cols",80)
s.toString
r=A.bT(a,"rows",24)
r.toString
return new A.iZ(q,s,r)},
iZ:function iZ(a,b,c){this.a=a
this.b=b
this.c=c},
xR(a){var s
A:{if("powershell"===a){s=B.dW
break A}if("cmd"===a){s=B.dX
break A}s=B.c_
break A}return s},
j6:function j6(a,b){this.a=a
this.b=b},
aB:function aB(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k},
z9(a){var s=A.lr(a,"shells"),r=A.lr(a,"features"),q=A.bT(a,"maxSessions",50)
q.toString
return new A.rp(s,r,q,A.A(a,"directEndpoint"))},
rp:function rp(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
za(a){var s,r,q,p,o,n,m=null,l=a.k(0,"capabilities"),k=A.A(a,"uid"),j=A.C(a,"nodeId"),i=B.a.G(j)
if(i.length===0)A.K(B.mO)
s=$.Bw()
if(!s.b.test(i))A.K(A.bp('Invalid node id: "'+j+'"',m))
if(k==null)j=m
else{r=B.a.G(k)
if(B.a.u(r,"nod_")||B.a.u(r,"hub_")){j=$.Bx()
j=!j.b.test(r)}else j=!0
if(j)A.K(A.bp('Invalid UID: "'+k+'"',m))
j=new A.lR(r)}s=A.A(a,"displayName")
if(s==null)s=""
q=A.zc(A.iG(a.k(0,"platform")))
p=A.fV(a,"labels")
o=A.b5(a,"online")
n=l==null?m:A.z9(A.iG(l))
return new A.aZ(new A.lM(i),j,s,q,p,o,n)},
aZ:function aZ(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
zc(a){var s,r=A.C(a,"os"),q=A.C(a,"arch"),p=A.A(a,"agentVersion")
if(p==null)p="unknown"
s=A.A(a,"hostname")
return new A.rM(r,q,p,s==null?"unknown":s)},
rM:function rM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
xQ(a){var s
A:{if("shell"===a){s=B.bU
break A}if("transfer"===a){s=B.ng
break A}if("drive"===a){s=B.nh
break A}if("tunnel"===a){s=B.ni
break A}s=B.dH
break A}return s},
EH(a){var s
A:{if("opening"===a){s=B.nk
break A}if("open"===a){s=B.nl
break A}if("closing"===a){s=B.nm
break A}if("closed"===a){s=B.nn
break A}if("attached"===a){s=B.no
break A}s=B.b1
break A}return s},
eN:function eN(a,b){this.a=a
this.b=b},
dL:function dL(a,b){this.a=a
this.b=b},
bz:function bz(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
lM:function lM(a){this.a=a},
lR:function lR(a){this.a=a},
m7:function m7(a){this.a=a},
mj:function mj(a){this.a=a},
mC:function mC(a,b){this.a=a
this.b=b},
Fi(a,b){var s=new A.ji(a,b,A.ci(null,null,!1,t.nl),new A.W(new A.v($.E,t.D),t.h))
s.lv(a,b)
return s},
ji:function ji(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=!0},
v8:function v8(a){this.a=a},
v9:function v9(a){this.a=a},
kB:function kB(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=262144
_.x=!1
_.y=h},
nt:function nt(a,b,c){this.a=a
this.b=b
this.c=c},
CG(a,b){var s=new A.kC(a,A.I(t.S,t.hW),A.cj(t.An),b)
s.lj(a,b)
return s},
kC:function kC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=$
_.e=d
_.f=!1},
p_:function p_(){},
Dt(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=A.C(b,"role")
r=A.dD(b,"protocolVersion")
q=A.bT(b,"minVersion",1)
q.toString
p=A.A(b,"nonce")
o=t.f
return new A.dA(s,r,q,p,o.b(b.k(0,"info"))?o.a(b.k(0,"info")).ak(0,t.N,t.z):B.ld)},
Cx(a,b){A.L(a)
t.P.a(b)
return new A.dt(A.C(b,"method"),A.C(b,"principal"),A.A(b,"token"),A.A(b,"publicKey"),A.A(b,"signature"))},
Cw(a,b){var s,r
A.L(a)
t.P.a(b)
s=A.C(b,"principal")
r=A.A(b,"displayName")
if(r==null)r=""
return new A.ec(s,r,A.lr(b,"roles"),A.C(b,"sessionToken"))},
Cv(a,b){var s,r
A.L(a)
t.P.a(b)
s=A.A(b,"reason")
if(s==null)s="auth_failed"
r=A.A(b,"message")
return new A.eb(s,r==null?"Authentication failed":r)},
E9(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"nodeId")
r=A.A(b,"uid")
q=A.A(b,"displayName")
if(q==null)q=""
return new A.ha(s,r,q,A.zc(A.iG(b.k(0,"platform"))),A.fV(b,"labels"))},
Ea(a,b){A.L(a)
t.P.a(b)
return new A.hb(A.C(b,"nodeId"),A.ey(b,"assignedAt"))},
DY(a,b){A.L(a)
return new A.h1(A.z9(t.P.a(b)))},
E6(a,b){var s,r
A.L(a)
t.P.a(b)
s=A.C(b,"nodeId")
r=A.bT(b,"activeSessions",0)
r.toString
return new A.h8(s,r,A.dD(b,"seq"),A.ey(b,"ts"))},
E5(a,b){A.L(a)
t.P.a(b)
return new A.h9(A.dD(b,"seq"),A.ey(b,"ts"))},
Em(a,b){A.L(a)
t.P.a(b)
return new A.eJ(A.C(b,"id"),A.ey(b,"ts"))},
En(a,b){A.L(a)
t.P.a(b)
return new A.eK(A.C(b,"id"),A.ey(b,"ts"),A.ey(b,"serverTs"))},
E7(a,b){A.L(a)
return new A.eB(A.fV(t.P.a(b),"filter"))},
E8(a,b){var s,r,q,p
A.L(a)
s=t.P.a(b).k(0,"nodes")
r=t._.b(s)?s:B.aW
q=A.e([],t.yT)
for(p=J.aN(r);p.q();)q.push(A.za(A.iG(p.gA())))
return new A.eC(q)},
EC(a,b){var s,r,q,p,o,n,m,l,k,j,i
A.L(a)
t.P.a(b)
s=b.k(0,"pty")
r=A.A(b,"shellFamily")
q=a==null?A.K(A.bf("session.open")):a
p=A.C(b,"nodeId")
o=A.A(b,"mode")
o=A.xQ(o==null?"exec":o)
n=A.A(b,"command")
m=A.lr(b,"args")
l=A.fV(b,"env")
k=A.A(b,"cwd")
j=s==null?null:A.zn(A.iG(s))
i=A.A(b,"resumeSessionId")
return new A.eO(q,p,o,n,m,l,k,j,i,r==null?null:A.xR(r))},
ED(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("session.opened")):a
r=A.C(b,"sessionId")
q=A.b5(b,"pty")
p=A.b5(b,"altScreen")
o=A.A(b,"shell")
return new A.eP(s,r,q,p,o==null?"posix":o)},
EE(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("session.rejected")):a
r=A.A(b,"reason")
if(r==null)r="session_rejected"
q=A.A(b,"message")
return new A.eQ(s,r,q==null?"Session rejected":q)},
Ed(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
A.L(a)
t.P.a(b)
s=b.k(0,"pty")
r=A.A(b,"shellFamily")
q=a==null?A.K(A.bf("node.session.open")):a
p=A.C(b,"sessionId")
o=A.C(b,"principal")
n=A.A(b,"mode")
n=A.xQ(n==null?"exec":n)
m=A.A(b,"command")
l=A.lr(b,"args")
k=A.fV(b,"env")
j=A.A(b,"cwd")
i=s==null?null:A.zn(A.iG(s))
h=A.A(b,"resumeSessionId")
return new A.he(q,p,o,n,m,l,k,j,i,h,r==null?null:A.xR(r))},
Ee(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.session.opened")):a
r=A.C(b,"sessionId")
q=A.bT(b,"pid",null)
p=A.b5(b,"altScreen")
o=A.A(b,"shell")
return new A.hf(s,r,q,p,o==null?"posix":o)},
Ef(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.session.rejected")):a
r=A.A(b,"sessionId")
if(r==null)r=""
q=A.A(b,"reason")
if(q==null)q="session_rejected"
p=A.A(b,"message")
return new A.hg(s,r,q,p==null?"Session rejected":p)},
CH(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("channel.resize")):a
r=A.bT(b,"cols",80)
r.toString
q=A.bT(b,"rows",24)
q.toString
return new A.eh(s,r,q)},
CI(a,b){var s
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("channel.signal")):a
return new A.ei(s,A.C(b,"signal"))},
CE(a,b){var s,r
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("channel.eof")):a
r=A.A(b,"stream")
return new A.fH(s,r==null?"stdin":r)},
CF(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("channel.exit")):a
r=A.bT(b,"exitCode",0)
r.toString
q=A.A(b,"signal")
p=A.ls(b,"ts")
return new A.eg(s,r,q,p==null?new A.bk(Date.now(),0,!1).av():p)},
CD(a,b){var s,r
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("channel.close")):a
r=A.A(b,"reason")
if(r==null)r="normal"
return new A.dv(s,r,A.A(b,"message"))},
CJ(a,b){var s,r
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("channel.window")):a
r=A.A(b,"stream")
if(r==null)r="stdout"
return new A.dw(s,r,A.dD(b,"credit"))},
Ev(a,b){var s,r
A.L(a)
t.P.a(b)
s=A.A(b,"code")
if(s==null)s="protocol_error"
r=A.A(b,"message")
if(r==null)r="Protocol error"
return new A.hk(s,r,A.b5(b,"fatal"),a)},
EA(a,b){var s
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("session.detach.request")):a
return new A.eL(s,A.bT(b,"timeoutSeconds",null))},
Eb(a,b){var s
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.session.detach")):a
return new A.hc(s,A.C(b,"sessionId"),A.C(b,"principal"),A.bT(b,"timeoutSeconds",null))},
Ec(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.session.detached")):a
r=A.C(b,"sessionId")
q=A.A(b,"shortId")
if(q==null)q=""
return new A.hd(s,r,q,A.ls(b,"expiresAt"))},
EB(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("session.detached")):a
r=A.C(b,"sessionId")
q=A.A(b,"shortId")
if(q==null)q=""
return new A.eM(s,r,q,A.ls(b,"expiresAt"))},
Dc(a,b){A.L(a)
t.P.a(b)
return new A.eq(A.C(b,"requestId"),A.C(b,"nodeId"))},
E0(a,b){A.L(a)
t.P.a(b)
return new A.h4(A.C(b,"requestId"),A.C(b,"principal"))},
E1(a,b){A.L(a)
t.P.a(b)
return new A.h5(A.C(b,"requestId"),A.Ap(b.k(0,"sessions")))},
Dd(a,b){A.L(a)
t.P.a(b)
return new A.er(A.C(b,"requestId"),A.Ap(b.k(0,"sessions")))},
Da(a,b){A.L(a)
t.P.a(b)
return new A.eo(A.C(b,"requestId"),A.C(b,"nodeId"),A.C(b,"sessionRef"))},
DZ(a,b){A.L(a)
t.P.a(b)
return new A.h2(A.C(b,"requestId"),A.C(b,"principal"),A.C(b,"sessionRef"))},
E_(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
return new A.h3(s,r,q==null?"":q)},
Db(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
return new A.ep(s,r,q==null?"":q)},
Cl(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"nodeId")
q=A.A(b,"sessionRef")
if(q==null)q=""
return new A.e3(s,r,q,A.bT(b,"timeoutSeconds",null))},
DX(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"principal")
q=A.A(b,"sessionRef")
if(q==null)q=""
return new A.h_(s,r,q,A.bT(b,"timeoutSeconds",null))},
DW(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"shortId")
if(q==null)q=""
p=A.A(b,"message")
return new A.h0(s,r,q,p==null?"":p)},
Cm(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"shortId")
if(q==null)q=""
p=A.A(b,"message")
return new A.e4(s,r,q,p==null?"":p)},
EF(a,b){A.L(a)
t.P.a(b)
return new A.eR(A.C(b,"requestId"),A.C(b,"nodeId"),A.C(b,"sessionRef"))},
Eg(a,b){A.L(a)
t.P.a(b)
return new A.hh(A.C(b,"requestId"),A.C(b,"principal"),A.C(b,"sessionRef"))},
Eh(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
if(q==null)q=""
p=A.A(b,"screen")
if(p==null)p=""
return new A.hi(s,r,q,p,A.b5(b,"altScreen"))},
EG(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
if(q==null)q=""
p=A.A(b,"screen")
if(p==null)p=""
return new A.eS(s,r,q,p,A.b5(b,"altScreen"))},
Ao(a){var s,r
if(!t._.b(a))return B.jN
s=J.kc(a,t.f)
r=s.$ti
r=A.d6(s,r.h("cL(i.E)").a(new A.wk()),r.h("i.E"),t.ec)
s=A.N(r,A.l(r).h("i.E"))
s.$flags=1
return s},
De(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"nodeId")
q=A.C(b,"op")
p=A.A(b,"host")
o=t.yq.a(b.k(0,"credential"))
return new A.fL(s,r,q,p,o==null?null:o.ak(0,t.N,t.z))},
E3(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"principal")
q=A.C(b,"op")
p=A.A(b,"host")
o=t.yq.a(b.k(0,"credential"))
return new A.h6(s,r,q,p,o==null?null:o.ak(0,t.N,t.z))},
E4(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
if(q==null)q=""
return new A.h7(s,r,q,A.Ao(b.k(0,"entries")))},
Df(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
if(q==null)q=""
return new A.es(s,r,q,A.Ao(b.k(0,"entries")))},
Ap(a){var s,r
if(!t._.b(a))return B.jR
s=J.kc(a,t.f)
r=s.$ti
r=A.d6(s,r.h("aB(i.E)").a(new A.wl()),r.h("i.E"),t.k)
s=A.N(r,A.l(r).h("i.E"))
return s},
F7(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"nodeId")
q=A.A(b,"targetHost")
if(q==null)q="localhost"
return new A.f4(s,r,q,A.dD(b,"targetPort"),A.bT(b,"publicPort",null),A.b5(b,"secure"))},
F8(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"tunnelId")
q=A.A(b,"publicHost")
if(q==null)q=""
return new A.f5(s,r,q,A.dD(b,"publicPort"),A.b5(b,"secure"))},
F9(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.A(b,"reason")
if(r==null)r="tunnel_rejected"
q=A.A(b,"message")
return new A.f6(s,r,q==null?"Tunnel rejected":q)},
F3(a,b){A.L(a)
t.P.a(b)
return new A.eZ(A.C(b,"requestId"),A.C(b,"tunnelRef"))},
F4(a,b){var s,r,q
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.b5(b,"ok")
q=A.A(b,"message")
return new A.f_(s,r,q==null?"":q)},
F5(a,b){A.L(a)
return new A.f2(A.C(t.P.a(b),"requestId"))},
F6(a,b){A.L(a)
t.P.a(b)
return new A.f3(A.C(b,"requestId"),A.Gi(b.k(0,"tunnels")))},
Ej(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.tunnel.connect")):a
r=A.C(b,"tunnelId")
q=A.A(b,"targetHost")
if(q==null)q="localhost"
p=A.dD(b,"targetPort")
o=A.A(b,"principal")
return new A.eD(s,r,q,p,o==null?"":o)},
Ek(a,b){var s,r
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.tunnel.connected")):a
r=A.A(b,"tunnelId")
return new A.eF(s,r==null?"":r)},
Ei(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=a==null?A.K(A.bf("node.tunnel.connect.failed")):a
r=A.A(b,"tunnelId")
if(r==null)r=""
q=A.A(b,"reason")
if(q==null)q="dial_failed"
p=A.A(b,"message")
return new A.eE(s,r,q,p==null?"":p)},
Gi(a){var s,r
if(!t._.b(a))return B.jM
s=J.kc(a,t.f)
r=s.$ti
r=A.d6(s,r.h("bz(i.E)").a(new A.wm()),r.h("i.E"),t.r_)
s=A.N(r,A.l(r).h("i.E"))
return s},
bf(a){return new A.bG("Control message '"+a+"' requires a channel id",null,null)},
Ct(a,b){A.L(a)
return new A.e6(A.C(t.P.a(b),"requestId"))},
Cu(a,b){A.L(a)
t.P.a(b)
return new A.e7(A.C(b,"requestId"),A.b5(b,"available"),A.A(b,"provider"),A.A(b,"model"),A.A(b,"plannerModel"),A.A(b,"executorModel"),A.A(b,"explainerModel"),A.A(b,"baseUrl"),A.A(b,"mode"),A.A(b,"language"))},
Dy(a){var s
A:{if("hubDefault"===(a==null?null:B.a.G(a))){s=B.d1
break A}s=B.bI
break A}return s},
Dz(a,b){var s,r,q,p,o
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.C(b,"method")
q=A.C(b,"url")
p=A.fV(b,"headers")
o=A.A(b,"body")
if(o==null)o=""
return new A.ew(s,r,q,p,o,A.Dy(A.A(b,"credentialMode")),A.A(b,"provider"))},
DA(a,b){var s,r,q,p
A.L(a)
t.P.a(b)
s=A.C(b,"requestId")
r=A.bT(b,"statusCode",0)
r.toString
q=A.fV(b,"headers")
p=A.A(b,"body")
if(p==null)p=""
return new A.cv(s,r,q,p,A.A(b,"error"))},
F:function F(){},
dA:function dA(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dt:function dt(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ec:function ec(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eb:function eb(a,b){this.a=a
this.b=b},
ha:function ha(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hb:function hb(a,b){this.a=a
this.b=b},
h1:function h1(a){this.a=a},
h8:function h8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h9:function h9(a,b){this.a=a
this.b=b},
eJ:function eJ(a,b){this.a=a
this.b=b},
eK:function eK(a,b,c){this.a=a
this.b=b
this.c=c},
eB:function eB(a){this.a=a},
eC:function eC(a){this.a=a},
rz:function rz(){},
eO:function eO(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
eP:function eP(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eQ:function eQ(a,b,c){this.a=a
this.b=b
this.c=c},
he:function he(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k},
hf:function hf(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hg:function hg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eh:function eh(a,b,c){this.a=a
this.b=b
this.c=c},
ei:function ei(a,b){this.a=a
this.b=b},
fH:function fH(a,b){this.a=a
this.b=b},
eg:function eg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dv:function dv(a,b,c){this.a=a
this.b=b
this.c=c},
dw:function dw(a,b,c){this.a=a
this.b=b
this.c=c},
hk:function hk(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eL:function eL(a,b){this.a=a
this.b=b},
hc:function hc(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hd:function hd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eM:function eM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eq:function eq(a,b){this.a=a
this.b=b},
h4:function h4(a,b){this.a=a
this.b=b},
h5:function h5(a,b){this.a=a
this.b=b},
rq:function rq(){},
er:function er(a,b){this.a=a
this.b=b},
pE:function pE(){},
eo:function eo(a,b,c){this.a=a
this.b=b
this.c=c},
h2:function h2(a,b,c){this.a=a
this.b=b
this.c=c},
h3:function h3(a,b,c){this.a=a
this.b=b
this.c=c},
ep:function ep(a,b,c){this.a=a
this.b=b
this.c=c},
e3:function e3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h_:function h_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h0:function h0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e4:function e4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eR:function eR(a,b,c){this.a=a
this.b=b
this.c=c},
hh:function hh(a,b,c){this.a=a
this.b=b
this.c=c},
hi:function hi(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eS:function eS(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
cL:function cL(a,b){this.a=a
this.b=b},
wk:function wk(){},
fL:function fL(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
h6:function h6(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
h7:function h7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ry:function ry(){},
es:function es(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
pL:function pL(){},
wl:function wl(){},
f4:function f4(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
f5:function f5(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
f6:function f6(a,b,c){this.a=a
this.b=b
this.c=c},
eZ:function eZ(a,b){this.a=a
this.b=b},
f_:function f_(a,b,c){this.a=a
this.b=b
this.c=c},
f2:function f2(a){this.a=a},
f3:function f3(a,b){this.a=a
this.b=b},
uM:function uM(){},
eD:function eD(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eF:function eF(a,b){this.a=a
this.b=b},
eE:function eE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
wm:function wm(){},
e6:function e6(a){this.a=a},
e7:function e7(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
la:function la(a,b){this.a=a
this.b=b},
ew:function ew(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cv:function cv(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
D2(a){var s
A:{if(1===a){s=B.a9
break A}if(2===a){s=B.i3
break A}if(3===a){s=B.i4
break A}s=A.K(A.bp("Unknown data opcode: 0x"+B.c.i4(a,16),null))}return s},
ir:function ir(a,b,c){this.c=a
this.a=b
this.b=c},
pX:function pX(a){this.a=a},
d7:function d7(){},
aL:function aL(a){this.a=a},
en:function en(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bp(a,b){return new A.cw(b==null?"protocol_error":b,a)},
dH:function dH(){},
cw:function cw(a,b){this.a=a
this.b=b},
ie:function ie(a,b){this.a=a
this.b=b},
j2:function j2(a,b){this.a=a
this.b=b},
mD:function mD(a,b){this.a=a
this.b=b},
dN:function dN(a,b){this.a=a
this.b=b},
iG(a){if(t.f.b(a))return a.ak(0,t.N,t.z)
throw A.d(A.bp("Expected value to be a JSON object",null))},
C(a,b){var s=a.k(0,b)
if(typeof s=="string")return s
throw A.d(A.bp("Missing or invalid string field '"+b+"'",null))},
A(a,b){var s=a.k(0,b)
if(s==null)return null
if(typeof s=="string")return s
throw A.d(A.bp("Invalid string field '"+b+"'",null))},
dD(a,b){var s=a.k(0,b)
if(A.hT(s))return s
throw A.d(A.bp("Missing or invalid int field '"+b+"'",null))},
bT(a,b,c){var s=a.k(0,b)
if(s==null)return c
if(A.hT(s))return s
throw A.d(A.bp("Invalid int field '"+b+"'",null))},
b5(a,b){var s=a.k(0,b)
if(s==null)return!1
if(A.nW(s))return s
throw A.d(A.bp("Invalid bool field '"+b+"'",null))},
ey(a,b){var s=A.yP(A.C(a,b))
if(s==null)throw A.d(A.bp("Invalid timestamp field '"+b+"'",null))
return s.av()},
ls(a,b){var s,r=A.A(a,b)
if(r==null)return null
s=A.yP(r)
if(s==null)throw A.d(A.bp("Invalid timestamp field '"+b+"'",null))
return s.av()},
fV(a,b){var s,r=a.k(0,b)
if(r==null)return B.ac
if(t.f.b(r)){s=t.N
return r.d4(0,new A.r3(),s,s)}throw A.d(A.bp("Invalid map field '"+b+"'",null))},
lr(a,b){var s,r=a.k(0,b)
if(r==null)return B.G
if(t._.b(r)){s=J.o8(r,new A.r2(),t.N)
s=A.N(s,s.$ti.h("Q.E"))
return s}throw A.d(A.bp("Invalid list field '"+b+"'",null))},
r3:function r3(){},
r2:function r2(){},
u1:function u1(){},
ib:function ib(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=$
_.e=null
_.f=""
_.r=c},
oF:function oF(a){this.a=a},
oG:function oG(a){this.a=a},
oH:function oH(a){this.a=a},
oE:function oE(a){this.a=a},
oD:function oD(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k},
wz(a5){var s=0,r=A.p(t.yu),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$wz=A.q(function(a6,a7){if(a6===1)return A.m(a7,r)
for(;;)switch(s){case 0:a=v.G
a0=A.j(A.j(a.window).localStorage)
a1=new A.lB(a0)
a2=new A.tz(a1)
a3=new A.lQ()
a4=new A.kw(a3,a2,new A.aQ(B.cF,A.cj(t.zX),t.dK))
a3.sqp(a4.gnr())
p=A.cj(t.A)
o=A.yQ(A.Y(a0.getItem("omnyshell.terminal.dimPreset")))
n=A.cj(t.cE)
m=A.Y(a0.getItem("omnyshell.terminal.customCols"))
m=A.bJ(m==null?"":m,null)
m=B.c.M(m==null?100:m,20,400)
l=t.S
k=A.cj(l)
j=t.jF
i=A.Y(a0.getItem("omnyshell.terminal.customRows"))
i=A.bJ(i==null?"":i,null)
i=B.c.M(i==null?30:i,5,200)
l=A.cj(l)
h=A.zy(A.Y(a0.getItem("omnyshell.terminal.textSize")))
g=A.cj(t.aW)
f=A.j(A.j(a.window).matchMedia("(prefers-color-scheme: dark)"))
e=new A.mA(a2,new A.wA(f),new A.wB(),new A.aQ(A.F0(A.Y(a0.getItem("omnyshell.theme"))),A.cj(t.sm),t.Ef))
e.fJ()
f.addEventListener("change",A.cW(new A.wC(e)))
a0=A.j(a.window)
d=A.j(a.window)
d=A.B3(B.dg,A.AZ(A.r(A.j(d.location).hash)))
c=A.cj(t.xf)
a=A.aS(A.j(a.document).getElementById("toasts"))
a.toString
b=new A.ib(new A.oD(a3,a4,new A.lN(a3,new A.ro("omnyshell.cache.nodes",a1),new A.aQ(B.cD,p,t.wg)),e,new A.uk(a2,new A.aQ(o,n,t.pa),new A.aQ(m,k,j),new A.aQ(i,l,j),new A.aQ(h,g,t.qv)),new A.ov(a2,a3),new A.t4(B.dg,a0,new A.aQ(d,c,t.pM)),a2,a1,new A.mB(a),new A.aQ(null,A.cj(t.T),t.vS)),a5,A.e([],t.we))
a=A.t("header",null,null,B.h,"app-header",null,null,null,null)
b.c=a
c=A.t("main",null,null,B.h,"app-main",null,null,null,null)
b.d=c
c=A.t("div",null,null,A.e([a,c],t.O),null,null,null,null,null)
A.cq(a5)
A.j(a5.appendChild(c))
a5.setAttribute("aria-busy","false")
b.b1()
s=3
return A.f(a4.fw(),$async$wz)
case 3:q=b
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$wz,r)},
wA:function wA(a){this.a=a},
wB:function wB(){},
wC:function wC(a){this.a=a},
yz(a,b,c,d){return new A.bb(a,b,d)},
ko(a){if(a instanceof A.bb)return a
if(a instanceof A.ie)return new A.bb(B.eK,"Authentication failed: "+a.b,"Check the principal and token, then try again.")
if(a instanceof A.dN)return new A.bb(B.ah,"Connection failed: "+a.b,"Verify the Hub URL is reachable over wss:// and its certificate is trusted by this browser. Self-signed Hubs must be trusted at the OS/browser level first.")
if(a instanceof A.dH)return new A.bb(B.bk,a.b,null)
return new A.bb(B.bk,J.b9(a),null)},
ic:function ic(a,b){this.a=a
this.b=b},
bb:function bb(a,b,c){this.a=a
this.b=b
this.c=c},
aQ:function aQ(a,b,c){this.a=a
this.b=b
this.$ti=c},
xO(a){var s,r,q,p=null,o="Invalid Hub address: ",n=B.a.G(a)
if(n.length===0)throw A.d(B.eL)
s=B.a.t(n,"://")?n:"wss://"+n
r=null
try{r=A.hC(s)}catch(q){if(t.Bj.b(A.R(q)))throw A.d(A.yz(B.ah,o+a,p,p))
else throw q}if(r.gbj().length===0)throw A.d(A.yz(B.ah,o+a,p,p))
if(r.gaG()!=="wss"&&r.gaG()!=="ws")return r.hY("wss")
return r},
lQ:function lQ(){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=null},
rG:function rG(a,b){this.a=a
this.b=b},
rE:function rE(a){this.a=a},
rH:function rH(a,b){this.a=a
this.b=b},
rF:function rF(a,b,c){this.a=a
this.b=b
this.c=c},
rJ:function rJ(a,b,c){this.a=a
this.b=b
this.c=c},
rD:function rD(a,b,c){this.a=a
this.b=b
this.c=c},
rI:function rI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
rK:function rK(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
B3(a,b){var s,r,q,p,o,n,m,l,k,j=A.AH(b)
for(s=t.N,r=0;r<5;++r){q=a[r]
p=A.AH(q)
if(p.length!==j.length)continue
o=A.I(s,s)
m=0
for(;;){if(!(m<p.length)){n=!0
break}l=p[m]
if(!(m<j.length))return A.b(j,m)
k=j[m]
if(B.a.u(l,":"))o.i(0,B.a.D(l,1),A.w7(k,0,k.length,B.l,!1))
else if(l!==k){n=!1
break}++m}if(n)return new A.dJ(q,b,o)}return new A.dJ("",b,B.ac)},
AZ(a){var s
if(a.length===0||a==="#")return"/"
s=B.a.u(a,"#")?B.a.D(a,1):a
return B.a.u(s,"/")?s:"/"+s},
AH(a){var s=t.vY
s=A.N(new A.ae(A.e(a.split("/"),t.s),t.Ag.a(new A.wu()),s),s.h("i.E"))
return s},
dJ:function dJ(a,b,c){this.a=a
this.b=b
this.c=c},
wu:function wu(){},
t4:function t4(a,b,c){this.a=a
this.b=b
this.c=c},
t5:function t5(a){this.a=a},
ov:function ov(a,b){this.a=a
this.b=b},
yA(a,b){return new A.b4(B.kR,a,null,!1,b.h("b4<0>"))},
fX:function fX(a,b){this.a=a
this.b=b},
b4:function b4(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.$ti=e},
fD:function fD(a,b){this.a=a
this.b=b},
ct:function ct(a,b,c){this.a=a
this.c=b
this.d=c},
kw:function kw(a,b,c){this.a=a
this.b=b
this.c=c},
lN:function lN(a,b,c){this.a=a
this.b=b
this.c=c},
e2:function e2(a,b){this.a=a
this.b=b},
iY:function iY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
j4:function j4(a,b,c){this.a=a
this.b=b
this.c=c},
uk:function uk(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
F0(a){return B.b.bX(B.df,new A.uI(a),new A.uJ())},
bY:function bY(a,b){this.a=a
this.b=b},
uI:function uI(a){this.a=a},
uJ:function uJ(){},
hm:function hm(a,b){this.a=a
this.b=b},
mA:function mA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lB:function lB(a){this.a=a},
ro:function ro(a,b){this.a=a
this.b=b},
tz:function tz(a){this.b=a},
x3(a,b,c,d){var s=0,r=A.p(t.H),q,p,o
var $async$x3=A.q(function(e,f){if(e===1)return A.m(f,r)
for(;;)switch(s){case 0:s=3
return A.f(A.o2(c,d),$async$x3)
case 3:o=f
if(o==null){b.fp(new A.kk(a))
s=1
break}p=o.a
b.fp(new A.ki(p,A.B9(p,o.b),A.yN(null),B.fd,new A.x4(d),new A.x5(d),p.w,p.x))
case 1:return A.n(q,r)}})
return A.o($async$x3,r)},
o2(a,b){return A.J6(a,b)},
J6(a2,a3){var s=0,r=A.p(t.uD),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$o2=A.q(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:p=4
g=a3.b.a
n=A.Y(g.getItem("omnyshell.ai.apiKey"))
if(A.Y(g.getItem("omnyshell.ai.useHubDefault"))==="false"&&n!=null&&n.length!==0){i=A.yx(A.Y(g.getItem("omnyshell.ai.provider")))
m=i==null?B.bg:i
f=A.Y(g.getItem("omnyshell.ai.model"))
if(f==null)f=A.AR(m)
e=A.xy(A.Y(g.getItem("omnyshell.ai.mode")))
if(e==null)e=B.a6
l=new A.i8(m,f,null,null,null,n,null,e,A.Y(g.getItem("omnyshell.ai.language")))
g=a2.gbi()
q=new A.hM(l,new A.fP(g,B.bI,null))
s=1
break}s=7
return A.f(a2.fb().kv(B.ib),$async$o2)
case 7:k=a5
j=k.b
if(!k.a||j==null){q=null
s=1
break}m=A.yx(j)
i=m==null?B.bg:m
f=k.c
if(f==null)f=A.AR(i)
e=k.d
d=k.e
c=k.f
b=k.r
a=A.Y(g.getItem("omnyshell.ai.mode"))
a=A.xy(a==null?k.w:a)
if(a==null)a=B.a6
g=A.Y(g.getItem("omnyshell.ai.language"))
if(g==null)g=k.x
h=new A.i8(i,f,e,d,c,"",b,a,g)
g=a2.gbi()
a=i.b
q=new A.hM(h,new A.fP(g,B.d1,a))
s=1
break
p=2
s=6
break
case 4:p=3
a1=o.pop()
q=null
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$o2,r)},
x4:function x4(a){this.a=a},
x5:function x5(a){this.a=a},
kk:function kk(a){this.a=a},
CS(a,b){var s,r,q,p,o=A.O("[^A-Za-z0-9_.@-]",!0),n=A.ad(a,o,"_"),m="omnyshell.history."+(n.length===0?"_":n),l=A.CP(null,1000)
try{s=A.Y(b.a.getItem(A.r(m)))
if(s!=null){o=l
r=t.Du.a(new A.ae(A.e(s.split("\n"),t.s),t.Ag.a(new A.pk()),t.vY))
q=o.a
B.b.a0(q)
B.b.C(q,r)
o.iu()}}catch(p){}return new A.kI(l,b,m)},
kI:function kI(a,b,c){this.a=a
this.b=b
this.c=c},
pk:function pk(){},
mM:function mM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
uV:function uV(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
EW(a,b,c,d,e){var s=new A.my(c,e,a,b,d)
s.lt(a,b,c,d,e)
return s},
wF(){var s=0,r=A.p(t.T),q
var $async$wF=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:s=3
return A.f(A.B7(A.j(A.j(A.j(A.j(v.G.window).navigator).clipboard).readText()),t.N),$async$wF)
case 3:q=b
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$wF,r)},
wG(a){return A.Is(A.r(a))},
Is(a){var s=0,r=A.p(t.H)
var $async$wG=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=2
return A.f(A.B7(A.j(A.j(A.j(A.j(v.G.window).navigator).clipboard).writeText(a)),t.X),$async$wG)
case 2:return A.n(null,r)}})
return A.o($async$wG,r)},
my:function my(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=_.r=_.f=$
_.x="C"
_.z=_.y=null},
ui:function ui(a){this.a=a},
uj:function uj(a){this.a=a},
ug:function ug(a,b){this.a=a
this.b=b},
uh:function uh(a,b){this.a=a
this.b=b},
u6:function u6(a,b){this.a=a
this.b=b},
u7:function u7(){},
uf:function uf(a,b){this.a=a
this.b=b},
u8:function u8(a){this.a=a},
u9:function u9(){},
ua:function ua(a){this.a=a},
ub:function ub(){},
ud:function ud(a,b){this.a=a
this.b=b},
ue:function ue(a){this.a=a},
uc:function uc(a,b){this.a=a
this.b=b},
u4:function u4(a,b){this.a=a
this.b=b},
u5:function u5(){},
yQ(a){return B.b.bX(B.jw,new A.pG(a),new A.pH())},
zy(a){return B.b.bX(B.iY,new A.uF(a),new A.uG())},
wE(a){return new A.dT(B.c.M(B.p.dW((a.a-24)/7.8),20,400),B.c.M(B.p.dW((a.b-230)/15.6),5,200))},
bP:function bP(a,b){this.a=a
this.b=b},
pG:function pG(a){this.a=a},
pH:function pH(){},
by:function by(a,b){this.a=a
this.b=b},
uF:function uF(a){this.a=a},
uG:function uG(){},
lT:function lT(a,b){this.a=a
this.b=b},
pF:function pF(a,b){this.a=a
this.b=b},
EX(a,b,c,d,e,f,g){return new A.mz(f,c,a,e,b,g,d)},
zx(a,b,c){var s=A.cW(new A.ul(c))
a.addEventListener(b,s)
return new A.um(a,b,s)},
mz:function mz(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.x=_.w=!1
_.at=_.as=_.Q=_.z=_.y=null},
un:function un(a){this.a=a},
uo:function uo(a){this.a=a},
up:function up(a){this.a=a},
uq:function uq(a){this.a=a},
ur:function ur(a){this.a=a},
ul:function ul(a){this.a=a},
um:function um(a,b,c){this.a=a
this.b=b
this.c=c},
Fe(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var s=A.ci(null,null,!1,t.L),r=A.cj(t.H),q=Date.now()
s=new A.jg(n,i,d,s,b,a,f,e,j,k,h,g,c,l,r,new A.bk(q,0,!1),B.oG)
s.lu(a,b,c,d,e,f,g,h,i,j,k,l,m,null,n)
return s},
jg:function jg(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=$
_.f=d
_.r=e
_.w=f
_.x=g
_.y=h
_.z=i
_.Q=j
_.as=k
_.at=l
_.ax=m
_.ay=n
_.cy=_.cx=_.CW=_.ch=!1
_.db=null
_.dx=o
_.dy=p
_.fr=q
_.fx=null},
v1:function v1(a){this.a=a},
v2:function v2(a){this.a=a},
v3:function v3(a){this.a=a},
uW:function uW(a,b){this.a=a
this.b=b},
v4:function v4(a){this.a=a},
v5:function v5(a){this.a=a},
uZ:function uZ(a){this.a=a},
uY:function uY(a){this.a=a},
v_:function v_(a){this.a=a},
uX:function uX(a,b){this.a=a
this.b=b},
v0:function v0(a){this.a=a},
mT:function mT(a,b,c){var _=this
_.b=a
_.c=b
_.d=c
_.a=null},
dh:function dh(a,b){var _=this
_.a=a
_.b=b
_.f=_.e=_.d=_.c=null},
va:function va(a){this.a=a},
vb:function vb(a){this.a=a},
t(a,b,c,d,e,f,g,h,i){var s,r,q=A.j(A.j(v.G.document).createElement(a))
if(e!=null)q.className=e
if(f!=null)q.id=f
if(i!=null)q.textContent=i
if(h!=null)q.setAttribute("role",h)
if(b!=null)q.setAttribute("aria-label",b)
if(c!=null)c.aa(0,new A.wI(q))
for(s=d.length,r=0;r<d.length;d.length===s||(0,A.M)(d),++r)A.j(q.appendChild(d[r]))
if(g!=null)q.addEventListener("click",A.cW(g))
return q},
dY(a){var s=null
return A.t("div",s,s,B.h,a,s,s,s,s)},
cq(a){var s
while(A.aS(a.firstChild)!=null){s=A.aS(a.firstChild)
s.toString
A.j(a.removeChild(s))}},
bC(a,b,c){var s=A.cW(c)
a.addEventListener(b,s)
return new A.x_(a,b,s)},
wI:function wI(a){this.a=a},
x_:function x_(a,b,c){this.a=a
this.b=b
this.c=c},
xM(a,b,c){var s=new A.lD()
s.lm(a,b,c)
return s},
lD:function lD(){this.a=$
this.b=null},
rj:function rj(a){this.a=a},
rk:function rk(a){this.a=a},
DR(a){var s=new A.iK(a)
s.ll(a)
return s},
iK:function iK(a){var _=this
_.a=a
_.w=_.r=_.f=_.e=_.d=_.c=_.b=$
_.x=null},
rb:function rb(a){this.a=a},
E2(a,b){var s=new A.iS(a,b)
s.ln(a,b)
return s},
iS:function iS(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=$
_.e=null
_.f=$
_.w=_.r=null},
rv:function rv(a){this.a=a},
rw:function rw(a){this.a=a},
rx:function rx(a){this.a=a},
rs:function rs(a){this.a=a},
ru:function ru(a){this.a=a},
rt:function rt(a,b){this.a=a
this.b=b},
rr:function rr(){},
iT:function iT(a){var _=this
_.a=a
_.d=_.c=_.b=$
_.e=null},
rA:function rA(a,b){this.a=a
this.b=b},
EI(a,b,c){var s=null,r=A.EJ(a,b,c)
r=new A.j3(a,b,c,new A.tm(),r,A.Jd(),A.Je())
r.lo(a,b,c,s,s,s,s)
return r},
EJ(a,b,c){return new A.tb(c,a,b)},
j3:function j3(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.Q=_.z=_.y=_.x=_.w=$
_.ay=_.ax=_.at=_.as=null
_.cx=_.CW=_.ch=!1
_.dx=_.db=_.cy=null},
tm:function tm(){},
tn:function tn(a){this.a=a},
tb:function tb(a,b,c){this.a=a
this.b=b
this.c=c},
tf:function tf(a){this.a=a},
te:function te(a){this.a=a},
tg:function tg(a){this.a=a},
ti:function ti(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
tc:function tc(){},
td:function td(){},
th:function th(a){this.a=a},
tk:function tk(a){this.a=a},
tj:function tj(a){this.a=a},
tl:function tl(a){this.a=a},
EK(a,b){var s=new A.j5(a,b)
s.lp(a,b)
return s},
j5:function j5(a,b){var _=this
_.a=a
_.b=b
_.f=_.e=_.d=_.c=$
_.w=_.r=null},
tw:function tw(a){this.a=a},
tx:function tx(a){this.a=a},
ty:function ty(a){this.a=a},
tr:function tr(){},
tq:function tq(a,b){this.a=a
this.b=b},
ts:function ts(a,b){this.a=a
this.b=b},
tt:function tt(a,b){this.a=a
this.b=b},
tu:function tu(a,b){this.a=a
this.b=b},
tv:function tv(a,b){this.a=a
this.b=b},
to:function to(a){this.a=a},
tp:function tp(a,b,c){this.a=a
this.b=b
this.c=c},
Bd(b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4="change",a5="div",a6="Terminal size",a7="Text size",a8="hint",a9=b6.e,b0=A.AS(),b1=A.wE(b0.b),b2=A.wE(b0.a),b3=A.e_(a3,a3,"term-cols",a3,a3,"number",A.u(a9.c.a)),b4=A.e_(a3,a3,"term-rows",a3,a3,"number",A.u(a9.d.a)),b5=new A.xl(b3,a9,b4)
A.bC(b3,a4,new A.x9(b5))
A.bC(b4,a4,new A.xa(b5))
s=t.O
r=A.t(a5,a3,a3,A.e([A.dZ("Columns",b3,"20\u2013400"),A.dZ("Rows",b4,"5\u2013200")],s),"row custom-dims",a3,a3,a3,a3)
q=new A.xn(a9,r,b3,b4)
p=a9.b.a.b
o=t.f4
n=A.yj(a6,!1,"term-dim",new A.xb(a9,q),A.e([new A.bA("Auto-fit (current screen)","autoFit"),new A.bA("Fit landscape \xb7 "+b1.a+"\xd7"+b1.b,"landscape"),new A.bA("Fit portrait \xb7 "+b2.a+"\xd7"+b2.b,"portrait"),new A.bA("Standard \xb7 80\xd724","standard"),new A.bA("Custom","custom")],o),p)
q.$0()
p=a9.e.a.b
m=A.yj(a7,!0,"term-text",new A.xd(a9),A.e([new A.bA("Auto","auto"),new A.bA("Smaller","smaller"),new A.bA("Normal","normal"),new A.bA("Larger","larger")],o),p)
l=b6.f
k=A.t("select",a3,a3,B.h,a3,"ai-provider",a3,a3,a3)
for(p=l.a.b.a,j=0;j<3;++j){i=B.jx[j]
h=A.t("option",a3,a3,B.h,a3,a3,a3,a3,i)
h.value=i
o=A.Y(p.getItem("omnyshell.ai.provider"))
h.selected=i===(o==null?"anthropic":o)
A.j(k.appendChild(h))}A.bC(k,a4,new A.xe(l,k))
o=A.Y(p.getItem("omnyshell.ai.model"))
g=A.e_(a3,a3,"ai-model",a3,"provider default","text",o==null?"":o)
A.bC(g,a4,new A.xf(l,g))
o=A.Y(p.getItem("omnyshell.ai.apiKey"))
f=A.e_(a3,"off","ai-key",a3,"sk-\u2026","password",o==null?"":o)
A.bC(f,a4,new A.xg(l,f))
e=A.t(a5,a3,a3,A.e([A.dZ("Provider",k,a3),A.dZ("Model",g,"Leave blank for the provider default."),A.dZ("Your API key",f,"Stored in this browser only; sent via the Hub to the provider.")],s),"stack ai-custom",a3,a3,a3,a3)
o=new A.xm(l,e,k,g,f)
d=A.t(a5,a3,a3,B.h,a8,a3,a3,a3,"Checking the Hub default\u2026")
l.ff().aZ(new A.xh(d),t.H)
c=A.AP("Use the Hub's default AI provider",A.Y(p.getItem("omnyshell.ai.useHubDefault"))!=="false","ai-use-hub")
A.bC(c.a,a4,new A.xi(l,c,o))
b=A.Y(p.getItem("omnyshell.ai.mode"))
if(b==null)b="plan"
a=A.yj("Agent mode",!0,"ai-mode",new A.xj(l),B.jf,b)
p=A.Y(p.getItem("omnyshell.ai.language"))
a0=A.e_(a3,a3,"ai-lang",a3,"model default","text",p==null?"":p)
A.bC(a0,a4,new A.xk(l,a0))
o.$0()
a1=A.vl("modal")
a2=A.t(a5,a3,a3,A.e([A.t("h3",a3,a3,B.h,a3,a3,a3,a3,a6),n,r,A.t(a5,a3,a3,B.h,a8,a3,a3,a3,"Applies to the next session you open \u2014 running sessions keep their size."),A.t("h3",a3,a3,B.h,a3,a3,a3,a3,a7),m,A.t(a5,a3,a3,B.h,a8,a3,a3,a3,"Applies immediately."),A.t("hr",a3,a3,B.h,a3,a3,a3,a3,a3),A.t("h3",a3,a3,B.h,a3,a3,a3,a3,"AI agent"),c.b,d,e,A.t(a5,a3,a3,B.h,a8,a3,a3,a3,"Default mode"),a,A.dZ("Reply language",a0,"e.g. english, portuguese \u2014 blank for the model default."),A.t(a5,a3,a3,B.h,a8,a3,a3,a3,"Applies to the next session you open.")],s),"stack settings-panel",a3,a3,a3,a3)
a1.sk7(A.xM(A.e([A.ar("Close",a3,a3,!1,new A.xc(a1),!0)],s),a2,"Settings"))
a1.cb().fF()},
xl:function xl(a,b,c){this.a=a
this.b=b
this.c=c},
x9:function x9(a){this.a=a},
xa:function xa(a){this.a=a},
xn:function xn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
xb:function xb(a,b){this.a=a
this.b=b},
xd:function xd(a){this.a=a},
xe:function xe(a,b){this.a=a
this.b=b},
xf:function xf(a,b){this.a=a
this.b=b},
xg:function xg(a,b){this.a=a
this.b=b},
xm:function xm(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
xh:function xh(a){this.a=a},
xi:function xi(a,b,c){this.a=a
this.b=b
this.c=c},
xj:function xj(a){this.a=a},
xk:function xk(a,b){this.a=a
this.b=b},
xc:function xc(a){this.a=a},
mB:function mB(a){this.a=a},
uK:function uK(a){this.a=a},
ar(a,b,c,d,e,f){var s,r,q=null,p=A.e([],t.s)
if(f)p.push("primary")
if(c!=null)p.push(c)
s=B.b.S(p," ")
p=s.length===0?q:s
r=A.t("button",b,q,B.h,p,q,new A.wD(e),q,q)
r.type="button"
if(d){A.j(r.appendChild(A.t("span",q,q,B.h,"spinner",q,q,q,q)))
A.j(r.appendChild(A.j(new v.G.Text(" "+a))))}else r.textContent=a
r.disabled=d
return r},
dZ(a,b,c){var s=null,r=t.N
r=A.e([A.t("label",s,A.G(["for",A.r(b.id)],r,r),B.h,s,s,s,s,a),b],t.O)
if(c!=null)r.push(A.t("div",s,s,B.h,"hint",s,s,s,c))
return A.t("div",s,s,r,"field",s,s,s,s)},
e_(a,b,c,d,e,f,g){var s=null,r=A.t("input",s,s,B.h,s,c,s,s,s)
r.type=f
if(g!=null)r.value=g
if(e!=null)r.placeholder=e
if(b!=null)r.autocomplete=b
if(a!=null){r.autocapitalize=a
r.setAttribute("autocorrect","off")
r.spellcheck=!1}if(d!=null)r.addEventListener("keydown",A.cW(new A.wU(d)))
return r},
AP(a,b,c){var s,r=null,q=A.t("input",r,r,B.h,r,c,r,r,r)
q.type="checkbox"
q.checked=b
s=t.N
return new A.jL(q,A.t("label",r,A.G(["for",c],s,s),A.e([q,A.j(new v.G.Text(a))],t.O),"check",r,r,r,r))},
yj(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.O,g=A.e([],h)
for(s=e.length,r=A.Aj,q=t.N,p=v.G,o=c+"-",n=0;n<e.length;e.length===s||(0,A.M)(e),++n){m=e[n]
l=m.b
k=A.t("input",i,i,B.h,i,o+l,i,i,i)
k.type="radio"
k.name=c
k.value=l
k.checked=l===f
l=new A.x2(k,d,m)
if(typeof l=="function")A.K(A.as("Attempting to rewrap a JS function.",i))
j=function(a0,a1){return function(a2){return a0(a1,a2,arguments.length)}}(r,l)
j[$.o4()]=l
k.addEventListener("change",j)
B.b.j(g,A.t("label",i,A.G(["for",A.r(k.id)],q,q),A.e([k,A.j(new p.Text(m.a))],h),"radio",i,i,i,i))}return A.t("div",a,i,g,b?"radio-group inline":"radio-group",i,i,"radiogroup",i)},
o0(a){var s="div",r=null,q=t.O,p=A.e([A.t(s,r,r,B.h,r,r,r,r,a.b)],q),o=a.c
if(o!=null)p.push(A.t(s,r,r,B.h,"hint",r,r,r,o))
return A.t(s,r,r,A.e([A.t(s,r,r,p,r,r,r,r,r)],q),"banner error",r,r,"alert",r)},
Be(a){var s=null,r=a?"badge online":"badge offline",q=A.t("span",s,s,B.h,"dot",s,s,s,s),p=a?"online":"offline"
return A.t("span",s,s,A.e([q,A.j(new v.G.Text(p))],t.O),r,s,s,s,s)},
k9(a){var s=null,r=A.e([A.t("span",s,s,B.h,"spinner",s,s,s,s)],t.O)
r.push(A.t("span",s,s,B.h,"muted",s,s,s,a))
return A.t("div",s,s,r,"row",s,s,"status",s)},
wD:function wD(a){this.a=a},
wU:function wU(a){this.a=a},
x2:function x2(a,b,c){this.a=a
this.b=b
this.c=c},
Ay(a){return a},
AL(a,b){var s,r,q,p,o,n,m,l
for(s=b.length,r=1;r<s;++r){if(b[r]==null||b[r-1]!=null)continue
for(;s>=1;s=q){q=s-1
if(b[q]!=null)break}p=new A.T("")
o=a+"("
p.a=o
n=A.U(b)
m=n.h("eW<1>")
l=new A.eW(b,0,s,m)
l.ls(b,0,s,n.c)
m=o+new A.a2(l,m.h("a(Q.E)").a(new A.ww()),m.h("a2<Q.E,a>")).S(0,", ")
p.a=m
p.a=m+("): part "+(r-1)+" was null, but part "+r+" was not.")
throw A.d(A.as(p.l(0),null))}},
kO:function kO(a,b){this.a=a
this.b=b},
pq:function pq(){},
pr:function pr(){},
ww:function ww(){},
hK:function hK(a){this.a=a},
hL:function hL(a){this.a=a},
fR:function fR(){},
eI(a,b){var s,r,q,p,o,n,m=b.kM(a),l=b.b7(a)
if(m!=null)a=B.a.D(a,m.length)
s=t.s
r=A.e([],s)
q=A.e([],s)
s=a.length
if(s!==0){if(0>=s)return A.b(a,0)
p=b.a8(a.charCodeAt(0))}else p=!1
if(p){if(0>=s)return A.b(a,0)
B.b.j(q,a[0])
o=1}else{B.b.j(q,"")
o=0}for(n=o;n<s;++n)if(b.a8(a.charCodeAt(n))){B.b.j(r,B.a.m(a,o,n))
B.b.j(q,a[n])
o=n+1}if(o<s){B.b.j(r,B.a.D(a,o))
B.b.j(q,"")}return new A.lW(b,m,l,r,q)},
lW:function lW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
zb(a){return new A.iX(a)},
iX:function iX(a){this.a=a},
ET(){var s,r,q,p,o,n,m,l,k=null
if(A.xW().gaG()!=="file")return $.ka()
if(!B.a.aA(A.xW().gb9(),"/"))return $.ka()
s=A.A9(k,0,0)
r=A.A6(k,0,0,!1)
q=A.A8(k,0,0,k)
p=A.A5(k,0,0)
o=A.w6(k,"")
if(r==null)if(s.length===0)n=o!=null
else n=!0
else n=!1
if(n)r=""
n=r==null
m=!n
l=A.A7("a/b",0,3,k,"",m)
if(n&&!B.a.u(l,"/"))l=A.y6(l,m)
else l=A.fq(l)
if(A.k2("",s,n&&B.a.u(l,"//")?"":r,o,l,q,p).i3()==="a\\b")return $.o5()
return $.yl()},
u_:function u_(){},
m1:function m1(a,b,c){this.d=a
this.e=b
this.f=c},
mI:function mI(a,b,c,d){var _=this
_.d=a
_.e=b
_.f=c
_.r=d},
mP:function mP(a,b,c,d){var _=this
_.d=a
_.e=b
_.f=c
_.r=d},
xE(a,b){if(b<0)A.K(A.b7("Offset may not be negative, was "+b+"."))
else if(b>a.c.length)A.K(A.b7("Offset "+b+u.D+a.gn(0)+"."))
return new A.l3(a,b)},
tK:function tK(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
l3:function l3(a,b){this.a=a
this.b=b},
hH:function hH(a,b,c){this.a=a
this.b=b
this.c=c},
Du(a,b){var s=A.Dv(A.e([A.Ft(a,!0)],t.oi)),r=new A.qv(b).$0(),q=B.c.l(B.b.gaX(s).b+1),p=A.Dw(s)?0:3,o=A.U(s)
return new A.qa(s,r,null,1+Math.max(q.length,p),new A.a2(s,o.h("c(1)").a(new A.qc()),o.h("a2<1,c>")).e6(0,B.fc),!A.IP(new A.a2(s,o.h("x?(1)").a(new A.qd()),o.h("a2<1,x?>"))),new A.T(""))},
Dw(a){var s,r,q
for(s=0;s<a.length-1;){r=a[s];++s
q=a[s]
if(r.b+1!==q.b&&J.a0(r.c,q.c))return!1}return!0},
Dv(a){var s,r,q=A.IF(a,new A.qg(),t.E,t.K)
for(s=A.l(q),r=new A.aq(q,q.r,q.e,s.h("aq<2>"));r.q();)J.ys(r.d,new A.qh())
s=s.h("d4<1,2>")
r=s.h("ix<i.E,c7>")
s=A.N(new A.ix(new A.d4(q,s),s.h("i<c7>(i.E)").a(new A.qi()),r),r.h("i.E"))
return s},
Ft(a,b){var s=new A.vH(a).$0()
return new A.b8(s,!0,null)},
Fv(a){var s,r,q,p,o,n,m=a.ga1()
if(!B.a.t(m,"\r\n"))return a
s=a.gO().gan()
for(r=m.length-1,q=0;q<r;++q)if(m.charCodeAt(q)===13&&m.charCodeAt(q+1)===10)--s
r=a.gP()
p=a.ga2()
o=a.gO().gab()
p=A.mo(s,a.gO().gal(),o,p)
o=A.ad(m,"\r\n","\n")
n=a.gaU()
return A.tL(r,p,o,A.ad(n,"\r\n","\n"))},
Fw(a){var s,r,q,p,o,n,m
if(!B.a.aA(a.gaU(),"\n"))return a
if(B.a.aA(a.ga1(),"\n\n"))return a
s=B.a.m(a.gaU(),0,a.gaU().length-1)
r=a.ga1()
q=a.gP()
p=a.gO()
if(B.a.aA(a.ga1(),"\n")){o=A.wL(a.gaU(),a.ga1(),a.gP().gal())
o.toString
o=o+a.gP().gal()+a.gn(a)===a.gaU().length}else o=!1
if(o){r=B.a.m(a.ga1(),0,a.ga1().length-1)
if(r.length===0)p=q
else{o=a.gO().gan()
n=a.ga2()
m=a.gO().gab()
p=A.mo(o-1,A.zN(s),m-1,n)
q=a.gP().gan()===a.gO().gan()?p:a.gP()}}return A.tL(q,p,r,s)},
Fu(a){var s,r,q,p,o
if(a.gO().gal()!==0)return a
if(a.gO().gab()===a.gP().gab())return a
s=B.a.m(a.ga1(),0,a.ga1().length-1)
r=a.gP()
q=a.gO().gan()
p=a.ga2()
o=a.gO().gab()
p=A.mo(q-1,s.length-B.a.aY(s,"\n")-1,o-1,p)
return A.tL(r,p,s,B.a.aA(a.gaU(),"\n")?B.a.m(a.gaU(),0,a.gaU().length-1):a.gaU())},
zN(a){var s,r=a.length
if(r===0)return 0
else{s=r-1
if(!(s>=0))return A.b(a,s)
if(a.charCodeAt(s)===10)return r===1?0:r-B.a.fj(a,"\n",r-2)-1
else return r-B.a.aY(a,"\n")-1}},
qa:function qa(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
qv:function qv(a){this.a=a},
qc:function qc(){},
qb:function qb(){},
qd:function qd(){},
qg:function qg(){},
qh:function qh(){},
qi:function qi(){},
qf:function qf(a){this.a=a},
qw:function qw(){},
qj:function qj(a){this.a=a},
qq:function qq(a,b,c){this.a=a
this.b=b
this.c=c},
qr:function qr(a,b){this.a=a
this.b=b},
qs:function qs(a){this.a=a},
qt:function qt(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
qo:function qo(a,b){this.a=a
this.b=b},
qp:function qp(a,b){this.a=a
this.b=b},
qk:function qk(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ql:function ql(a,b,c){this.a=a
this.b=b
this.c=c},
qm:function qm(a,b,c){this.a=a
this.b=b
this.c=c},
qn:function qn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
qu:function qu(a,b,c){this.a=a
this.b=b
this.c=c},
b8:function b8(a,b,c){this.a=a
this.b=b
this.c=c},
vH:function vH(a){this.a=a},
c7:function c7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
mo(a,b,c,d){if(a<0)A.K(A.b7("Offset may not be negative, was "+a+"."))
else if(c<0)A.K(A.b7("Line may not be negative, was "+c+"."))
else if(b<0)A.K(A.b7("Column may not be negative, was "+b+"."))
return new A.cz(d,a,c,b)},
cz:function cz(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
mp:function mp(){},
mq:function mq(){},
EO(a,b,c){return new A.hs(c,a,b)},
mr:function mr(){},
hs:function hs(a,b,c){this.c=a
this.a=b
this.b=c},
ht:function ht(){},
tL(a,b,c,d){var s=new A.dc(d,a,b,c)
s.lr(a,b,c)
if(!B.a.t(d,c))A.K(A.as('The context line "'+d+'" must contain "'+c+'".',null))
if(A.wL(d,c,a.gal())==null)A.K(A.as('The span text "'+c+'" must start at column '+(a.gal()+1)+' in a line within "'+d+'".',null))
return s},
dc:function dc(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
yU(a,b,c,d){var s,r={}
r.a=a
s=new A.iA(d.h("iA<0>"))
s.lk(b,c,r,d)
return s},
iA:function iA(a){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=a},
q9:function q9(a,b,c){this.a=a
this.b=b
this.c=c},
q8:function q8(a){this.a=a},
hI:function hI(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=!1
_.r=_.f=null
_.w=d
_.$ti=e},
vG:function vG(){},
mt:function mt(a){this.b=this.a=$
this.$ti=a},
ja:function ja(){},
mv:function mv(a,b,c){this.c=a
this.a=b
this.b=c},
tZ:function tZ(a,b){var _=this
_.a=a
_.b=b
_.c=0
_.e=_.d=null},
rZ:function rZ(){},
pt:function pt(){},
uU:function uU(){},
zL(a,b,c,d,e){var s
if(c==null)s=null
else{s=A.AM(new A.vp(c),t.m)
s=s==null?null:A.cW(s)}s=new A.ju(a,b,s,!1,e.h("ju<0>"))
s.hh()
return s},
AM(a,b){var s=$.E
if(s===B.t)return a
return s.pu(a,b)},
xD:function xD(a,b){this.a=a
this.$ti=b},
fe:function fe(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ju:function ju(a,b,c,d,e){var _=this
_.a=0
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
vp:function vp(a){this.a=a},
vq:function vq(a){this.a=a},
xB(a,b){var s=0,r=A.p(t.Ej),q,p,o,n,m,l,k
var $async$xB=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:if(!a.fi("ws")&&!a.fi("wss"))throw A.d(A.cY(a,"url","only ws: and wss: schemes are supported"))
p=v.G
o=p.WebSocket
n=a.l(0)
p=p.Array
p=t.Cf.a(new p())
m=A.j(new o(n,p))
m.binaryType="arraybuffer"
l=new A.ed(m,A.ci(null,null,!1,t.uy))
p=new A.v($.E,t.g_)
k=new A.W(p,t.vE)
if(A.a4(m.readyState)===1)k.V(l)
else if(A.a4(m.readyState)===2||A.a4(m.readyState)===3)k.a7(new A.hE("Unexpected WebSocket state: "+A.a4(m.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.fe(m,"open",!1,t.v5).gI(0).aZ(new A.oM(k,l),t.H)
o=t.v5
n=t.H
new A.fe(m,"error",!1,o).gI(0).aZ(new A.oN(k,l),n)
A.zL(m,"message",t.xS.a(new A.oO(l)),!1,t.m)
new A.fe(m,"close",!1,o).gI(0).aZ(new A.oP(k,l),n)
q=p
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$xB,r)},
ed:function ed(a,b){this.a=a
this.b=b},
oM:function oM(a,b){this.a=a
this.b=b},
oN:function oN(a,b){this.a=a
this.b=b},
oO:function oO(a){this.a=a},
oP:function oP(a,b){this.a=a
this.b=b},
xX(){return new A.hD("Connection Closed")},
dg:function dg(){},
hy:function hy(a){this.a=a},
fE:function fE(a){this.a=a},
fI:function fI(a,b){this.a=a
this.b=b},
hE:function hE(a){this.a=a},
hD:function hD(a){this.a=a},
Cn(a){var s=null,r=$.E,q=new A.mt(t.hv),p=t.X,o=A.ci(s,s,!0,p),n=A.ci(s,s,!0,p),m=A.l(n),l=A.l(o)
q.a=A.yU(new A.ac(n,m.h("ac<1>")),new A.fn(o,l.h("fn<1>")),!0,p)
q.b=A.yU(new A.ac(o,l.h("ac<1>")),new A.fn(n,m.h("fn<1>")),!1,p)
q=new A.kd(new A.W(new A.v(r,t.D),t.h),q)
q.li(a)
return q},
kd:function kd(a,b){var _=this
_.e=_.d=null
_.f=a
_.r=b
_.w=$},
od:function od(a){this.a=a},
oa:function oa(a){this.a=a},
ob:function ob(a){this.a=a},
oc:function oc(a,b){this.a=a
this.b=b},
oe:function oe(a){this.a=a},
nS:function nS(a,b){this.b=a
this.a=b},
mN:function mN(a){this.a=a},
zA(a,b,c){var s=a.BYTES_PER_ELEMENT
c=A.aR(b,c,B.c.dm(a.byteLength,s))
return J.xt(B.H.ghp(a),a.byteOffset+b*s,(c-b)*s)},
IF(a,b,c,d){var s,r,q,p,o,n=A.I(d,c.h("k<0>"))
for(s=c.h("z<0>"),r=0;r<1;++r){q=a[r]
p=b.$1(q)
o=n.k(0,p)
if(o==null){o=A.e([],s)
n.i(0,p,o)
p=o}else p=o
J.fw(p,q)}return n},
ah(a,b,c,d,e){var s,r,q=A.e([],t.j)
for(s=a.length,r=0;r<s;++r)q.push(new A.D(a[r],c,B.e,d,B.j,B.i,null,null))
return q},
El(a){var s
switch(a.a){case 0:s=B.fA
break
case 1:s=B.fR
break
case 2:s=B.fh
break
case 3:s=B.h7
break
case 4:s=B.fU
break
default:s=null}return s},
wJ(a){var s,r=a.c.a.k(0,"charset")
if(a.a==="application"&&a.b==="json"&&r==null)return B.l
if(r!=null){s=A.yS(r)
if(s==null)s=B.O}else s=B.O
return s},
Bi(a){return a},
Jf(a){return new A.fG(a)},
Jj(a,b,c,d){var s,r,q,p
try{q=c.$0()
return q}catch(p){q=A.R(p)
if(q instanceof A.hs){s=q
throw A.d(A.EO("Invalid "+a+": "+s.a,s.b,s.geg()))}else if(t.Bj.b(q)){r=q
throw A.d(A.an("Invalid "+a+' "'+b+'": '+r.ghO(),r.geg(),r.gan()))}else throw p}},
B9(a,b){var s
switch(a.a.a){case 0:s=new A.kn(a,b)
break
case 1:s=new A.lS(a,b)
break
case 2:s=new A.l6(a,b)
break
default:s=null}return s},
J7(a,b){var s
if(a==null||a.length===0||a===".")return b
s=$.C6()
if(s.a.ap(a)>0)return s.a4(a)
if(b==null)return null
return s.a4(s.q6(0,b,a))},
IG(a){var s
A:{if(B.dW===a){s=B.bB
break A}if(B.dX===a){s=B.bA
break A}s=B.bz
break A}return s},
Cr(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6.gK(0)||a6.d<3)return null
s=a6.b
r=a7?B.c3:B.V
q=a6.a
p=a6.c
a5.aV(q,s,p,1," ",B.V)
o=q+1
n=p-2
a5.am(o,s," AI AGENT ",r,n)
m=a8.d.a
if(p>18){l=p-14
k=m.length
j=k>l?"\u2026"+B.a.D(m,k-l):m
a5.bW(q+p-1-j.length,s,j,B.V)}i=s+1
k=a6.d
h=k-2
g=A.e([],t.s)
for(f=A.cO(a8.e,t.N),e=f.length,d=0;d<e;++d)B.b.C(g,A.Cq(f[d],n))
f=g.length
c=B.c.M(f-h,0,f)
b=B.c.M(a8.w,0,c)
f=g.length
a=B.c.M(f-h-b,0,f)
for(a0=0;a0<h;++a0){a1=a+a0
if(a1<0||a1>=g.length)continue
if(!(a1>=0&&a1<g.length))return A.b(g,a1)
a5.am(o,i+a0,g[a1],B.U,n)}a2=s+k-1
a3=a8.x?"\u22ef ":"\u203a "
a4=a7?B.c0:B.b6
a5.aV(q,a2,p,1," ",a4)
a5.am(o,a2,a3+a8.r,a4,n)
if(!a7)return null
return new A.dU(B.c.M(o+a3.length+a8.r.length,o,q+p-1),a2)},
Cq(a,b){var s,r,q,p,o,n,m,l,k
if(b<=0)return B.db
if(a.length===0)return B.db
s=A.e([],t.s)
for(r=a.split(" "),q=r.length,p="",o=0;o<r.length;r.length===q||(0,A.M)(r),++o){n=r[o]
for(m=n;l=m.length,l>b;){if(p.length!==0){B.b.j(s,p)
p=""}B.b.j(s,B.a.m(m,0,b))
m=B.a.D(m,b)}k=p.length
if(k===0)p=m
else if(k+1+l<=b)p=p+" "+m
else{B.b.j(s,p)
p=m}}B.b.j(s,p)
return s},
Di(a1,a2,a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c=a2.a,b=a2.b,a=a2.c,a0=a2.d
a1.aV(c,b,a,a0," ",B.U)
if(a2.gK(0))return d
s=a4.a
if(s.e){a1.am(c+B.c.M(B.c.W(a-27,2),0,a),b+B.c.W(a0,2),"\u2014 binary file (read-only) \u2014",B.U.cj(B.ak),a)
return d}r=s.b
q=B.c.M(B.c.l(r.length).length,2,9)
p=1+q+1
o=c+p
n=a-p
if(n<=0)return d
m=s.f
l=a4.d
if(m<l)a4.d=m
else if(m>=l+a0){m=m-a0+1
a4.d=m}else m=l
if(m<0)a4.d=0
m=s.r
l=a4.e
if(m<l)a4.e=m
else if(m>=l+n){m=m-n+1
a4.e=m}else m=l
if(m<0)a4.e=0
for(k=0;k<a0;++k){j=a4.d+k
i=b+k
if(j>=r.length){a1.bW(c,i,"~",B.b6)
continue}h=j===s.f
g=h?B.aK:d
if(h)a1.aV(c,i,a,1," ",B.U.jW(g))
A.Dg(a1,c,i,j,q,a4,h)
A.Dh(a1,o,i,n,j,a4,a5,g)}if(!a3)return d
f=b+(s.f-a4.d)
e=o+(s.r-a4.e)
if(f<b||f>=b+a0||e<o||e>=c+a)return d
return new A.dU(e,f)},
Dg(a,b,c,d,e,f,g){var s,r,q=d+1,p=f.c.a.k(0,q),o=f.c.b.t(0,q),n=p==null
if(n&&!o)s=" "
else s=o&&n?"\u2581":"\u258e"
switch(p){case B.bH:n=B.bs
break
case B.d0:n=B.aI
break
case null:case void 0:n=o?B.ar:null
break
default:n=null}r=g?B.c0:B.b6
a.aR(b,c,s,r.cj(n==null?r.a:n))
n=b+1
a.bW(n,c,B.a.qz(B.c.l(q),e),r)
a.aR(n+e,c," ",r)},
Dh(a,b,c,d,e,f,g,a0){var s,r,q,p,o,n,m,l,k,j,i=f.l0(e,g),h=b+d
for(s=f.b.d2(f.a.qa(e),i,g).a,r=s.length,q=a0==null,p=0,o=0;o<s.length;s.length===r||(0,A.M)(s),++o){n=s[o]
m=n.b
m=q?m:m.jW(a0)
for(l=new A.ho(n.a);l.q();){k=l.d
j=b+(p-f.e)
if(j>=b&&j<h)a.aR(j,c,k===9?" ":A.ak(k),m);++p
if(j>=h)break}}},
Dn(a2,a3,a4,a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=a3.a,a=a3.b,a0=a3.c,a1=a3.d
a2.aV(b,a,a0,a1," ",B.e_)
for(s=b+1,r=a0-2,q=b+a0-2,p=0;p<a1;++p){o=a6+p
if(o<0||o>=a5.length)break
if(!(o>=0&&o<a5.length))return A.b(a5,o)
n=a5[o]
m=a+p
l=o===a7
k=a8.$1(n.a)
j=n.c
i=j?B.oM:B.oO
h=A.Dl(k)
g=h==null
if(!g)i=i.cj(h)
if(l)if(a4)i=B.oI
else i=B.c2.cj(g?B.a7:h)
a2.aV(b,m,a0,1," ",i)
if(j)f=n.e?"\u25be":"\u25b8"
else f=" "
e=n.b
if(j)e+="/"
d=A.Dm(k)
c=B.a.aQ(" ",n.d)+f+" "+e
a2.am(s,m,c,i,r)
if(d!=null&&a0>c.length+3)a2.bW(q,m,d,l?i:B.e_.cj(h))}},
Dl(a){switch(a){case B.at:case B.au:return B.aI
case B.aP:return B.bs
case B.aQ:return B.ha
case B.bE:return B.ar
case B.bG:return B.ar
case null:case void 0:case B.d_:case B.bF:return null}},
Dm(a){switch(a){case B.at:return"M"
case B.aP:return"A"
case B.bE:return"D"
case B.au:return"R"
case B.aQ:return"?"
case B.bG:return"!"
case null:case void 0:case B.d_:case B.bF:return null}},
Dx(a,b,c){var s,r,q,p,o,n,m,l,k,j,i
if(b.gK(0))return
s=b.b
r=b.a
q=b.c
a.aV(r,s,q,1," ",B.dY)
if(c){p=A.N(B.kN,t.p_)
B.b.C(p,B.dc)
o=p}else o=B.dc
n=r+1
m=r+q-1
for(r=o.length,l=n,k=0;k<o.length;o.length===r||(0,A.M)(o),++k){q=o[k]
j=q.a
i=q.b
if(l>n&&l+(j.length+1+i.length)>m)break
l=a.am(l,s,j,B.oJ,m-l)
l=a.am(l,s," "+i,B.dY,m-l)+3}},
yV(a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=a2.length,d=e!==0,c=a1.c,b=B.c.M(c-4,4,c),a=a4.length
e=[a3.length+2,a+1,e]
s=24
r=0
for(;r<3;++r){q=e[r]
if(q>s)s=q}if(s>b)s=b
p=s+4
o=d?4:3
n=a1.a+B.c.M(B.c.W(c-p,2),0,c)
e=a1.d
m=a1.b+B.c.M(B.c.W(e-o,2),0,e)
for(l=0;l<o;++l)a0.aV(n,m+l,p,1," ",B.c2)
a0.aR(n,m,"\u250c",B.a4)
e=n+p
c=e-1
a0.aR(c,m,"\u2510",B.a4)
k=m+o-1
a0.aR(n,k,"\u2514",B.a4)
a0.aR(c,k,"\u2518",B.a4)
for(j=p-1,i=1;i<j;++i){h=n+i
a0.aR(h,m,"\u2500",B.a4)
a0.aR(h,k,"\u2500",B.a4)}for(k=o-1,l=1;l<k;++l){j=m+l
a0.aR(n,j,"\u2502",B.a4)
a0.aR(c,j,"\u2502",B.a4)}c=n+2
a0.am(c,m," "+a3+" ",B.oN,p-4)
g=m+1
a0.am(c,g,a4,B.c2,s)
f=B.c.M(c+a,c,e-2)
if(d)a0.am(c,m+2,a2,B.oT,s)
return new A.dU(f,g)},
EP(a,b,c,d,e,f,g,h,i,a0,a1){var s,r,q,p,o,n,m,l,k,j
if(b.gK(0))return
s=b.b
if(h!=null){r=i?B.oL:B.oV
q=b.a
p=b.c
a.aV(q,s,p,1," ",r)
a.am(q+1,s,h,r,p-2)
return}q=b.a
p=b.c
a.aV(q,s,p,1," ",B.c1)
o=e?"\u25cf ":""
n=a0.length===0?"untitled":a0
m=a1?"  [read-only]":""
l=o+n+m
a.am(q+1,s,l,B.c1,p-2)
m=A.e([],t.s)
if(c!=null&&c.length!==0)m.push("\u2387 "+c)
m.push(f)
m.push("Ln "+g+", Col "+d)
k=B.b.S(m,"   ")
j=q+p-1-k.length
if(j>q+l.length+1)a.bW(j,s,k,B.c1)},
EV(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=a0.a,c=a0.b,b=a0.c
a.aV(d,c,b,1," ",B.V)
if(a2.length===0){a.am(d+1,c,"no files open \u2014 Tab to focus the tree, Enter to open",B.V,b-2)
return}s=A.e([],t.s)
for(r=a2.length,q=0;q<a2.length;a2.length===r||(0,A.M)(a2),++q){p=a2[q].a
o=A.EU(p.a)
n=p.x?"\u25cf":" "
s.push(" "+o+" "+n+" ")}m=A.e([],t.t)
for(r=s.length,l=0,q=0;p=s.length,q<p;s.length===r||(0,A.M)(s),++q){k=s[q]
B.b.j(m,l)
l+=k.length}if(l>b){if(!(a1>=0&&a1<m.length))return A.b(m,a1)
j=m[a1]
if(!(a1<p))return A.b(s,a1)
i=j+s[a1].length
h=i>b?i-b:0
if(j<h)h=j}else h=0
for(b=d+b,g=0;g<a2.length;++g){f=g===a1?B.c3:B.V
if(!(g<m.length))return A.b(m,g)
e=d+m[g]-h
if(!(g<s.length))return A.b(s,g)
r=s[g]
if(e+r.length<d||e>b)continue
a.am(e,c,r,f,b-e)}},
EU(a){var s
if(a.length===0)return"untitled"
s=B.a.aY(a,A.O("[/\\\\]",!0))
return s<0?a:B.a.D(a,s+1)},
F_(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
if(a6.gK(0)||a6.d<3)return null
s=a6.b
r=a7?B.c3:B.V
q=a6.a
p=a6.c
a5.aV(q,s,p,1," ",B.V)
o=q+1
n=p-2
a5.am(o,s," TERMINAL ",r,n)
m=a8.d
l=q+p-1
k=m.length
j=l-k
if(j>q+12)a5.bW(j,s,m,B.V)
else if(p>16){i=p-16
h=k>i?"\u2026"+B.a.D(m,k-i):m
a5.bW(l-h.length,s,h,B.V)}g=s+1
k=a6.d
f=k-2
e=A.cO(a8.e,t.N)
d=e.length
c=d-f
b=B.c.M(c,0,d)
a=B.c.M(c-B.c.M(a8.r,0,b),0,d)
for(a0=0;a0<f;++a0){a1=a+a0
if(a1<0||a1>=d)continue
if(!(a1>=0&&a1<d))return A.b(e,a1)
a5.am(o,g+a0,e[a1],B.U,n)}a2=s+k-1
a3=a8.w!=null?"\u22ef ":"$ "
a4=a7?B.c0:B.b6
a5.aV(q,a2,p,1," ",a4)
a5.am(o,a2,a3+a8.f,a4,n)
if(!a7)return null
return new A.dU(B.c.M(o+a3.length+a8.f.length,o,l),a2)},
J8(a,b){var s
if(B.a.u(a,"/")||B.a.u(a,"~"))return a
s=A.O("^[A-Za-z]:[\\\\/]",!0)
if(s.b.test(a))return a
if(b==null||b.length===0||b==="?")return a
return(B.a.aA(b,"/")?B.a.m(b,0,b.length-1):b)+"/"+a},
J3(a){var s,r,q,p=a
for(;;){s=p.length
if(!(s>1&&B.a.aA(p,"/")))break
p=B.a.m(p,0,s-1)}r=B.a.aY(p,"/")
q=r<0?p:B.a.D(p,r+1)
return q.length===0?"archive":q},
AW(a){var s,r=a,q=0
for(;;){if(!(r>=1024&&q<4))break
r/=1024;++q}s=B.p.i5(r,q===0?0:1)
if(!(q<5))return A.b(B.de,q)
return s+" "+B.de[q]},
o_(a,b){var s=0,r=A.p(t.tN),q,p,o,n
var $async$o_=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:n=A.Cn(A.xB(a,null))
s=3
return A.f(n.f.a,$async$o_)
case 3:p=$.Bu()
o=A.xK(null,null,t.N,t.eR)
o.C(0,p)
q=A.Fi(n,new A.pX(o))
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$o_,r)},
yH(a,b,c){var s,r,q
if(c<0||c>4294967295)throw A.d(A.cY(c,"value","not a uint32"))
s=B.c.aT(c,24)
a.$flags&2&&A.ai(a)
r=a.length
if(!(b<r))return A.b(a,b)
a[b]=s&255
s=b+1
q=B.c.aT(c,16)
if(!(s<r))return A.b(a,s)
a[s]=q&255
q=b+2
s=B.c.aT(c,8)
if(!(q<r))return A.b(a,q)
a[q]=s&255
s=b+3
if(!(s<r))return A.b(a,s)
a[s]=c&255},
yG(a,b){var s,r,q,p,o=a.length
if(!(b<o))return A.b(a,b)
s=a[b]
r=b+1
if(!(r<o))return A.b(a,r)
r=a[r]
q=b+2
if(!(q<o))return A.b(a,q)
q=a[q]
p=b+3
if(!(p<o))return A.b(a,p)
return(s<<24|r<<16|q<<8|a[p])>>>0},
Bb(a,b){var s,r=b.dR(a).a
if(r<0)return"just now"
s=B.c.W(r,1e6)
if(s<60)return""+s+"s ago"
s=B.c.W(r,6e7)
if(s<60)return""+s+"m ago"
s=B.c.W(r,36e8)
if(s<24)return""+s+"h ago"
return""+B.c.W(r,864e8)+"d ago"},
Ji(a,b){var s,r=a.dR(b).a
if(r<0)return"expired"
s=B.c.W(r,6e7)
if(s<60)return"in "+s+"m"
s=B.c.W(r,36e8)
if(s<24)return"in "+s+"h"
return"in "+B.c.W(r,864e8)+"d"},
AS(){var s=A.j(A.j(v.G.window).screen),r=A.a4(s.width),q=A.a4(s.height),p=r<q,o=p?r:q,n=p?q:r
return new A.pF(new A.lT(o,n),new A.lT(n,o))},
AQ(){var s,r,q,p,o=null
try{o=A.xW()}catch(s){if(t.A2.b(A.R(s))){r=$.wj
if(r!=null)return r
throw s}else throw s}if(J.a0(o,$.An)){r=$.wj
r.toString
return r}$.An=o
if($.yk()===$.ka())r=$.wj=o.ku(".").l(0)
else{q=o.i3()
p=q.length-1
r=$.wj=p===0?q:B.a.m(q,0,p)}return r},
wW(a,b){var s=null
return $.b3().hM(0,a,b,s,s,s,s,s,s,s,s,s,s,s,s,s,s)},
B0(a){var s
if(!(a>=65&&a<=90))s=a>=97&&a<=122
else s=!0
return s},
AT(a,b){var s,r,q=null,p=a.length,o=b+2
if(p<o)return q
if(!(b>=0&&b<p))return A.b(a,b)
if(!A.B0(a.charCodeAt(b)))return q
s=b+1
if(!(s<p))return A.b(a,s)
if(a.charCodeAt(s)!==58){r=b+4
if(p<r)return q
if(B.a.m(a,s,r).toLowerCase()!=="%3a")return q
b=o}s=b+2
if(p===s)return s
if(!(s>=0&&s<p))return A.b(a,s)
if(a.charCodeAt(s)!==47)return q
return b+3},
IP(a){var s,r,q,p
if(a.gn(0)===0)return!0
s=a.gI(0)
for(r=A.bx(a,1,null,a.$ti.h("Q.E")),q=r.$ti,r=new A.aI(r,r.gn(0),q.h("aI<Q.E>")),q=q.h("Q.E");r.q();){p=r.d
if(!J.a0(p==null?q.a(p):p,s))return!1}return!0},
J5(a,b,c){var s=B.b.aW(a,null)
if(s<0)throw A.d(A.as(A.u(a)+" contains no null elements.",null))
B.b.i(a,s,b)},
Bc(a,b,c){var s=B.b.aW(a,b)
if(s<0)throw A.d(A.as(A.u(a)+" contains no elements matching "+b.l(0)+".",null))
B.b.i(a,s,null)},
Ip(a,b){var s,r,q,p
for(s=new A.cu(a),r=t.I,s=new A.aI(s,s.gn(0),r.h("aI<P.E>")),r=r.h("P.E"),q=0;s.q();){p=s.d
if((p==null?r.a(p):p)===b)++q}return q},
wL(a,b,c){var s,r,q
if(b.length===0)for(s=0;;){r=B.a.a_(a,"\n",s)
if(r===-1)return a.length-s>=c?s:null
if(r-s>=c)return s
s=r+1}r=B.a.aW(a,b)
while(r!==-1){q=r===0?0:B.a.fj(a,"\n",r-1)+1
if(c===r-q)return q
r=B.a.a_(a,b,r+1)}return null},
IS(){var s=A.aS(A.j(v.G.document).getElementById("app"))
A.wz(s==null?A.j(s):s)}},B={}
var w=[A,J,B]
var $={}
A.xI.prototype={}
J.lh.prototype={
L(a,b){return a===b},
gE(a){return A.dI(a)},
l(a){return"Instance of '"+A.m5(a)+"'"},
gai(a){return A.cb(A.y8(this))}}
J.lj.prototype={
l(a){return String(a)},
gE(a){return a?519018:218159},
gai(a){return A.cb(t.y)},
$iao:1,
$iy:1}
J.iC.prototype={
L(a,b){return null==b},
l(a){return"null"},
gE(a){return 0},
gai(a){return A.cb(t.c)},
$iao:1,
$iab:1}
J.iD.prototype={$iaj:1}
J.dF.prototype={
gE(a){return 0},
gai(a){return B.pH},
l(a){return String(a)}}
J.lZ.prototype={}
J.f7.prototype={}
J.d3.prototype={
l(a){var s=a[$.Bn()]
if(s==null)s=a[$.o4()]
if(s==null)return this.lb(a)
return"JavaScript function for "+J.b9(s)},
$id1:1}
J.fT.prototype={
gE(a){return 0},
l(a){return String(a)}}
J.fU.prototype={
gE(a){return 0},
l(a){return String(a)}}
J.z.prototype={
j(a,b){A.U(a).c.a(b)
a.$flags&1&&A.ai(a,29)
a.push(b)},
bx(a,b){a.$flags&1&&A.ai(a,"removeAt",1)
if(b<0||b>=a.length)throw A.d(A.t_(b,null))
return a.splice(b,1)[0]},
hJ(a,b,c){A.U(a).c.a(c)
a.$flags&1&&A.ai(a,"insert",2)
if(b<0||b>a.length)throw A.d(A.t_(b,null))
a.splice(b,0,c)},
hK(a,b,c){var s,r
A.U(a).h("i<1>").a(c)
a.$flags&1&&A.ai(a,"insertAll",2)
A.zo(b,0,a.length,"index")
if(!t.g.b(c))c=J.yu(c)
s=J.aE(c)
a.length=a.length+s
r=b+s
this.bd(a,r,a.length,a,b)
this.bK(a,b,r,c)},
hX(a){a.$flags&1&&A.ai(a,"removeLast",1)
if(a.length===0)throw A.d(A.i2(a,-1))
return a.pop()},
qN(a,b){A.U(a).h("y(1)").a(b)
a.$flags&1&&A.ai(a,16)
this.je(a,b,!0)},
je(a,b,c){var s,r,q,p,o
A.U(a).h("y(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.d(A.aG(a))}o=s.length
if(o===r)return
this.sn(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
fz(a,b){var s=A.U(a)
return new A.ae(a,s.h("y(1)").a(b),s.h("ae<1>"))},
C(a,b){var s
A.U(a).h("i<1>").a(b)
a.$flags&1&&A.ai(a,"addAll",2)
if(Array.isArray(b)){this.ly(a,b)
return}for(s=J.aN(b);s.q();)a.push(s.gA())},
ly(a,b){var s,r
t.zz.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.d(A.aG(a))
for(r=0;r<s;++r)a.push(b[r])},
a0(a){a.$flags&1&&A.ai(a,"clear","clear")
a.length=0},
b8(a,b,c){var s=A.U(a)
return new A.a2(a,s.H(c).h("1(2)").a(b),s.h("@<1>").H(c).h("a2<1,2>"))},
S(a,b){var s,r=A.bU(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.i(r,s,A.u(a[s]))
return r.join(b)},
cp(a){return this.S(a,"")},
bz(a,b){return A.bx(a,0,A.dq(b,"count",t.S),A.U(a).c)},
aS(a,b){return A.bx(a,b,null,A.U(a).c)},
e6(a,b){var s,r,q
A.U(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.d(A.ce())
if(0>=s)return A.b(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.d(A.aG(a))}return r},
hC(a,b,c,d){var s,r,q
d.a(b)
A.U(a).H(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.d(A.aG(a))}return r},
bX(a,b,c){var s,r,q,p=A.U(a)
p.h("y(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.d(A.aG(a))}p=c.$0()
return p},
ad(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
aq(a,b,c){if(b<0||b>a.length)throw A.d(A.ay(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw A.d(A.ay(c,b,a.length,"end",null))
if(b===c)return A.e([],A.U(a))
return A.e(a.slice(b,c),A.U(a))},
b2(a,b){return this.aq(a,b,null)},
gI(a){if(a.length>0)return a[0]
throw A.d(A.ce())},
gaX(a){var s=a.length
if(s>0)return a[s-1]
throw A.d(A.ce())},
e9(a,b,c){a.$flags&1&&A.ai(a,18)
A.aR(b,c,a.length)
a.splice(b,c-b)},
bd(a,b,c,d,e){var s,r,q,p,o
A.U(a).h("i<1>").a(d)
a.$flags&2&&A.ai(a,5)
A.aR(b,c,a.length)
s=c-b
if(s===0)return
A.bq(e,"skipCount")
if(t._.b(d)){r=d
q=e}else{r=J.o9(d,e).c1(0,!1)
q=0}p=J.at(r)
if(q+s>p.gn(r))throw A.d(A.yW())
if(q<b)for(o=s-1;o>=0;--o)a[b+o]=p.k(r,q+o)
else for(o=0;o<s;++o)a[b+o]=p.k(r,q+o)},
bK(a,b,c,d){return this.bd(a,b,c,d,0)},
bI(a,b,c,d){var s,r,q,p,o,n,m=this
A.U(a).h("i<1>").a(d)
a.$flags&1&&A.ai(a,"replaceRange","remove from or add to")
A.aR(b,c,a.length)
if(!t.g.b(d))d=J.yu(d)
s=c-b
r=J.aE(d)
q=b+r
p=a.length
if(s>=r){o=s-r
n=p-o
m.bK(a,b,q,d)
if(o!==0){m.bd(a,q,n,a,c)
m.sn(a,n)}}else{n=p+(r-s)
a.length=n
m.bd(a,q,n,a,c)
m.bK(a,b,q,d)}},
ac(a,b){var s,r
A.U(a).h("y(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.d(A.aG(a))}return!1},
hA(a,b){var s,r
A.U(a).h("y(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.d(A.aG(a))}return!0},
bn(a,b){var s,r,q,p,o,n=A.U(a)
n.h("c(1,1)?").a(b)
a.$flags&2&&A.ai(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.Gv()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.aP()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.i1(b,2))
if(p>0)this.od(a,p)},
di(a){return this.bn(a,null)},
od(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
a_(a,b,c){var s,r=a.length
if(c>=r)return-1
if(c<0)c=0
for(s=c;s<r;++s){if(!(s<a.length))return A.b(a,s)
if(J.a0(a[s],b))return s}return-1},
aW(a,b){return this.a_(a,b,0)},
t(a,b){var s
for(s=0;s<a.length;++s)if(J.a0(a[s],b))return!0
return!1},
gK(a){return a.length===0},
gZ(a){return a.length!==0},
l(a){return A.r_(a,"[","]")},
c1(a,b){var s=A.e(a.slice(0),A.U(a))
return s},
fu(a){return this.c1(a,!0)},
gJ(a){return new J.ea(a,a.length,A.U(a).h("ea<1>"))},
gE(a){return A.dI(a)},
gn(a){return a.length},
sn(a,b){a.$flags&1&&A.ai(a,"set length","change the length of")
if(b<0)throw A.d(A.ay(b,0,null,"newLength",null))
if(b>a.length)A.U(a).c.a(null)
a.length=b},
k(a,b){if(!(b>=0&&b<a.length))throw A.d(A.i2(a,b))
return a[b]},
i(a,b,c){A.U(a).c.a(c)
a.$flags&2&&A.ai(a)
if(!(b>=0&&b<a.length))throw A.d(A.i2(a,b))
a[b]=c},
i9(a,b){return new A.bL(a,b.h("bL<0>"))},
fg(a,b){var s
A.U(a).h("y(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
gai(a){return A.cb(A.U(a))},
$ibl:1,
$iJ:1,
$ii:1,
$ik:1}
J.li.prototype={
rj(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.m5(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.r0.prototype={}
J.ea.prototype={
gA(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.M(q)
throw A.d(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$ia8:1}
J.fS.prototype={
a3(a,b){var s
A.Ah(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gfh(b)
if(this.gfh(a)===s)return 0
if(this.gfh(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gfh(a){return a===0?1/a<0:a<0},
kx(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.d(A.aw(""+a+".toInt()"))},
pv(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.d(A.aw(""+a+".ceil()"))},
dW(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.d(A.aw(""+a+".floor()"))},
cv(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.d(A.aw(""+a+".round()"))},
M(a,b,c){if(this.a3(b,c)>0)throw A.d(A.i0(b))
if(this.a3(a,b)<0)return b
if(this.a3(a,c)>0)return c
return a},
i5(a,b){var s
if(b>20)throw A.d(A.ay(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gfh(a))return"-"+s
return s},
i4(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.d(A.ay(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.b(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.K(A.aw("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.b(p,1)
s=p[1]
if(3>=r)return A.b(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.a.aQ("0",o)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gE(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
ia(a,b){return a+b},
bc(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
dm(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.jw(a,b)},
W(a,b){return(a|0)===a?a/b|0:this.jw(a,b)},
jw(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.d(A.aw("Result of truncating division is "+A.u(s)+": "+A.u(a)+" ~/ "+b))},
aT(a,b){var s
if(a>0)s=this.ju(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
oM(a,b){if(0>b)throw A.d(A.i0(b))
return this.ju(a,b)},
ju(a,b){return b>31?0:a>>>b},
aP(a,b){return a>b},
gai(a){return A.cb(t.fY)},
$iaK:1,
$ia_:1,
$ibB:1}
J.iB.prototype={
gai(a){return A.cb(t.S)},
$iao:1,
$ic:1}
J.lk.prototype={
gai(a){return A.cb(t.pR)},
$iao:1}
J.dB.prototype={
pC(a,b){if(b<0)throw A.d(A.i2(a,b))
if(b>=a.length)A.K(A.i2(a,b))
return a.charCodeAt(b)},
hm(a,b,c){var s=b.length
if(c>s)throw A.d(A.ay(c,0,s,null,null))
return new A.nA(b,a,c)},
dK(a,b){return this.hm(a,b,0)},
cq(a,b,c){var s,r,q,p,o=null
if(c<0||c>b.length)throw A.d(A.ay(c,0,b.length,o,o))
s=a.length
r=b.length
if(c+s>r)return o
for(q=0;q<s;++q){p=c+q
if(!(p>=0&&p<r))return A.b(b,p)
if(b.charCodeAt(p)!==a.charCodeAt(q))return o}return new A.hv(c,a)},
aA(a,b){var s=b.length,r=a.length
if(s>r)return!1
return b===this.D(a,r-s)},
kr(a,b,c){A.zo(0,0,a.length,"startIndex")
return A.Bg(a,b,c,0)},
cC(a,b){var s
if(typeof b=="string")return A.e(a.split(b),t.s)
else{if(b instanceof A.dC){s=b.e
s=!(s==null?b.e=b.lW():s)}else s=!1
if(s)return A.e(a.split(b.b),t.s)
else return this.m6(a,b)}},
bI(a,b,c,d){var s=A.aR(b,c,a.length)
return A.Bh(a,b,s,d)},
m6(a,b){var s,r,q,p,o,n,m=A.e([],t.s)
for(s=J.xs(b,a),s=s.gJ(s),r=0,q=1;s.q();){p=s.gA()
o=p.gP()
n=p.gO()
q=n-o
if(q===0&&r===o)continue
B.b.j(m,this.m(a,r,o))
r=n}if(r<a.length||q>0)B.b.j(m,this.D(a,r))
return m},
a6(a,b,c){var s
if(c<0||c>a.length)throw A.d(A.ay(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
u(a,b){return this.a6(a,b,0)},
m(a,b,c){return a.substring(b,A.aR(b,c,a.length))},
D(a,b){return this.m(a,b,null)},
G(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.b(p,0)
if(p.charCodeAt(0)===133){s=J.z_(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.b(p,r)
q=p.charCodeAt(r)===133?J.z0(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
i7(a){var s=a.trimStart(),r=s.length
if(r===0)return s
if(0>=r)return A.b(s,0)
if(s.charCodeAt(0)!==133)return s
return s.substring(J.z_(s,1))},
c2(a){var s,r=a.trimEnd(),q=r.length
if(q===0)return r
s=q-1
if(!(s>=0))return A.b(r,s)
if(r.charCodeAt(s)!==133)return r
return r.substring(0,J.z0(r,s))},
aQ(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.fN)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
d5(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aQ(c,s)+a},
qz(a,b){return this.d5(a,b," ")},
kl(a,b){var s=b-a.length
if(s<=0)return a
return a+this.aQ(" ",s)},
a_(a,b,c){var s
if(c<0||c>a.length)throw A.d(A.ay(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
aW(a,b){return this.a_(a,b,0)},
fj(a,b,c){var s,r,q
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.d(A.ay(c,0,a.length,null,null))
if(typeof b=="string"){s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)}for(s=J.i3(b),q=c;q>=0;--q)if(s.cq(b,a,q)!=null)return q
return-1},
aY(a,b){return this.fj(a,b,null)},
t(a,b){return A.J9(a,b,0)},
a3(a,b){var s
A.r(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gE(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gai(a){return A.cb(t.N)},
gn(a){return a.length},
$ibl:1,
$iao:1,
$iaK:1,
$irL:1,
$ia:1}
A.dQ.prototype={
j(a,b){t.L.a(b)
B.b.j(this.b,b)
this.a=this.a+b.length},
ft(){var s,r,q,p,o,n,m,l=this,k=l.a
if(k===0)return $.BR()
s=l.b
r=s.length
if(r===1){if(0>=r)return A.b(s,0)
q=s[0]
l.a=0
B.b.a0(s)
return q}q=new Uint8Array(k)
for(p=0,o=0;o<s.length;s.length===r||(0,A.M)(s),++o,p=m){n=s[o]
m=p+n.length
B.H.bK(q,p,m,n)}l.a=0
B.b.a0(s)
return q},
gn(a){return this.a},
$iCB:1}
A.dR.prototype={
gJ(a){return new A.ik(J.aN(this.gbg()),A.l(this).h("ik<1,2>"))},
gn(a){return J.aE(this.gbg())},
gK(a){return J.bZ(this.gbg())},
gZ(a){return J.Cf(this.gbg())},
aS(a,b){var s=A.l(this)
return A.oX(J.o9(this.gbg(),b),s.c,s.y[1])},
bz(a,b){var s=A.l(this)
return A.oX(J.yt(this.gbg(),b),s.c,s.y[1])},
ad(a,b){return A.l(this).y[1].a(J.o7(this.gbg(),b))},
gI(a){return A.l(this).y[1].a(J.kb(this.gbg()))},
t(a,b){return J.Cd(this.gbg(),b)},
l(a){return J.b9(this.gbg())}}
A.ik.prototype={
q(){return this.a.q()},
gA(){return this.$ti.y[1].a(this.a.gA())},
$ia8:1}
A.ee.prototype={
gbg(){return this.a}}
A.jr.prototype={$iJ:1}
A.jq.prototype={
k(a,b){return this.$ti.y[1].a(J.o6(this.a,b))},
i(a,b,c){var s=this.$ti
J.yp(this.a,b,s.c.a(s.y[1].a(c)))},
sn(a,b){J.Ch(this.a,b)},
j(a,b){var s=this.$ti
J.fw(this.a,s.c.a(s.y[1].a(b)))},
bn(a,b){var s
this.$ti.h("c(2,2)?").a(b)
s=b==null?null:new A.vj(this,b)
J.ys(this.a,s)},
$iJ:1,
$ik:1}
A.vj.prototype={
$2(a,b){var s=this.a.$ti,r=s.c
r.a(a)
r.a(b)
s=s.y[1]
return this.b.$2(s.a(a),s.a(b))},
$S(){return this.a.$ti.h("c(1,1)")}}
A.il.prototype={
gbg(){return this.a}}
A.ef.prototype={
ak(a,b,c){return new A.ef(this.a,this.$ti.h("@<1,2>").H(b).H(c).h("ef<1,2,3,4>"))},
ag(a){return this.a.ag(a)},
k(a,b){return this.$ti.h("4?").a(this.a.k(0,b))},
aa(a,b){this.a.aa(0,new A.oZ(this,this.$ti.h("~(3,4)").a(b)))},
gar(){var s=this.$ti
return A.oX(this.a.gar(),s.c,s.y[2])},
gn(a){var s=this.a
return s.gn(s)},
gK(a){var s=this.a
return s.gK(s)},
gZ(a){var s=this.a
return s.gZ(s)},
gX(){return this.a.gX().b8(0,new A.oY(this),this.$ti.h("V<3,4>"))}}
A.oZ.prototype={
$2(a,b){var s=this.a.$ti
s.c.a(a)
s.y[1].a(b)
this.b.$2(s.y[2].a(a),s.y[3].a(b))},
$S(){return this.a.$ti.h("~(1,2)")}}
A.oY.prototype={
$1(a){var s=this.a.$ti
s.h("V<1,2>").a(a)
return new A.V(s.y[2].a(a.a),s.y[3].a(a.b),s.h("V<3,4>"))},
$S(){return this.a.$ti.h("V<3,4>(V<1,2>)")}}
A.dE.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.cu.prototype={
gn(a){return this.a.length},
k(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.b(s,b)
return s.charCodeAt(b)}}
A.wZ.prototype={
$0(){return A.xF(null,t.H)},
$S:3}
A.ta.prototype={}
A.J.prototype={}
A.Q.prototype={
gJ(a){var s=this
return new A.aI(s,s.gn(s),A.l(s).h("aI<Q.E>"))},
gK(a){return this.gn(this)===0},
gI(a){if(this.gn(this)===0)throw A.d(A.ce())
return this.ad(0,0)},
t(a,b){var s,r=this,q=r.gn(r)
for(s=0;s<q;++s){if(J.a0(r.ad(0,s),b))return!0
if(q!==r.gn(r))throw A.d(A.aG(r))}return!1},
S(a,b){var s,r,q,p=this,o=p.gn(p)
if(b.length!==0){if(o===0)return""
s=A.u(p.ad(0,0))
if(o!==p.gn(p))throw A.d(A.aG(p))
for(r=s,q=1;q<o;++q){r=r+b+A.u(p.ad(0,q))
if(o!==p.gn(p))throw A.d(A.aG(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.u(p.ad(0,q))
if(o!==p.gn(p))throw A.d(A.aG(p))}return r.charCodeAt(0)==0?r:r}},
b8(a,b,c){var s=A.l(this)
return new A.a2(this,s.H(c).h("1(Q.E)").a(b),s.h("@<Q.E>").H(c).h("a2<1,2>"))},
e6(a,b){var s,r,q,p=this
A.l(p).h("Q.E(Q.E,Q.E)").a(b)
s=p.gn(p)
if(s===0)throw A.d(A.ce())
r=p.ad(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.ad(0,q))
if(s!==p.gn(p))throw A.d(A.aG(p))}return r},
aS(a,b){return A.bx(this,b,null,A.l(this).h("Q.E"))},
bz(a,b){return A.bx(this,0,A.dq(b,"count",t.S),A.l(this).h("Q.E"))}}
A.eW.prototype={
ls(a,b,c,d){var s,r=this.b
A.bq(r,"start")
s=this.c
if(s!=null){A.bq(s,"end")
if(r>s)throw A.d(A.ay(r,0,s,"start",null))}},
gmg(){var s=J.aE(this.a),r=this.c
if(r==null||r>s)return s
return r},
goQ(){var s=J.aE(this.a),r=this.b
if(r>s)return s
return r},
gn(a){var s,r=J.aE(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
ad(a,b){var s=this,r=s.goQ()+b
if(b<0||r>=s.gmg())throw A.d(A.le(b,s.gn(0),s,null,"index"))
return J.o7(s.a,r)},
aS(a,b){var s,r,q=this
A.bq(b,"count")
s=q.b+b
r=q.c
if(r!=null&&s>=r)return new A.ev(q.$ti.h("ev<1>"))
return A.bx(q.a,s,r,q.$ti.c)},
bz(a,b){var s,r,q,p=this
A.bq(b,"count")
s=p.c
r=p.b
if(s==null)return A.bx(p.a,r,B.c.ia(r,b),p.$ti.c)
else{q=B.c.ia(r,b)
if(s<q)return p
return A.bx(p.a,r,q,p.$ti.c)}},
c1(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.at(n),l=m.gn(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.yY(0,n):J.xG(0,n)}r=A.bU(s,m.ad(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.i(r,q,m.ad(n,o+q))
if(m.gn(n)<l)throw A.d(A.aG(p))}return r},
fu(a){return this.c1(0,!0)}}
A.aI.prototype={
gA(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=J.at(q),o=p.gn(q)
if(r.b!==o)throw A.d(A.aG(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.ad(q,s);++r.c
return!0},
$ia8:1}
A.bI.prototype={
gJ(a){return new A.iM(J.aN(this.a),this.b,A.l(this).h("iM<1,2>"))},
gn(a){return J.aE(this.a)},
gK(a){return J.bZ(this.a)},
gI(a){return this.b.$1(J.kb(this.a))},
ad(a,b){return this.b.$1(J.o7(this.a,b))}}
A.eu.prototype={$iJ:1}
A.iM.prototype={
q(){var s=this,r=s.b
if(r.q()){s.a=s.c.$1(r.gA())
return!0}s.a=null
return!1},
gA(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$ia8:1}
A.a2.prototype={
gn(a){return J.aE(this.a)},
ad(a,b){return this.b.$1(J.o7(this.a,b))}}
A.ae.prototype={
gJ(a){return new A.f9(J.aN(this.a),this.b,this.$ti.h("f9<1>"))},
b8(a,b,c){var s=this.$ti
return new A.bI(this,s.H(c).h("1(2)").a(b),s.h("@<1>").H(c).h("bI<1,2>"))}}
A.f9.prototype={
q(){var s,r
for(s=this.a,r=this.b;s.q();)if(r.$1(s.gA()))return!0
return!1},
gA(){return this.a.gA()},
$ia8:1}
A.ix.prototype={
gJ(a){return new A.iy(J.aN(this.a),this.b,B.cH,this.$ti.h("iy<1,2>"))}}
A.iy.prototype={
gA(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
q(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.q();){q.d=null
if(s.q()){q.c=null
p=J.aN(r.$1(s.gA()))
q.c=p}else return!1}q.d=q.c.gA()
return!0},
$ia8:1}
A.eX.prototype={
gJ(a){var s=this.a
return new A.jc(s.gJ(s),this.b,A.l(this).h("jc<1>"))}}
A.iu.prototype={
gn(a){var s=this.a,r=s.gn(s)
s=this.b
if(B.c.aP(r,s))return s
return r},
$iJ:1}
A.jc.prototype={
q(){if(--this.b>=0)return this.a.q()
this.b=-1
return!1},
gA(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gA()},
$ia8:1}
A.db.prototype={
aS(a,b){A.kq(b,"count",t.S)
A.bq(b,"count")
return new A.db(this.a,this.b+b,A.l(this).h("db<1>"))},
gJ(a){var s=this.a
return new A.j8(s.gJ(s),this.b,A.l(this).h("j8<1>"))}}
A.fM.prototype={
gn(a){var s=this.a,r=s.gn(s)-this.b
if(r>=0)return r
return 0},
aS(a,b){A.kq(b,"count",t.S)
A.bq(b,"count")
return new A.fM(this.a,this.b+b,this.$ti)},
$iJ:1}
A.j8.prototype={
q(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.q()
this.b=0
return s.q()},
gA(){return this.a.gA()},
$ia8:1}
A.ev.prototype={
gJ(a){return B.cH},
gK(a){return!0},
gn(a){return 0},
gI(a){throw A.d(A.ce())},
ad(a,b){throw A.d(A.ay(b,0,0,"index",null))},
t(a,b){return!1},
b8(a,b,c){this.$ti.H(c).h("1(2)").a(b)
return new A.ev(c.h("ev<0>"))},
aS(a,b){A.bq(b,"count")
return this},
bz(a,b){A.bq(b,"count")
return this},
c1(a,b){var s=J.xG(0,this.$ti.c)
return s}}
A.iv.prototype={
q(){return!1},
gA(){throw A.d(A.ce())},
$ia8:1}
A.bL.prototype={
gJ(a){return new A.fa(J.aN(this.a),this.$ti.h("fa<1>"))}}
A.fa.prototype={
q(){var s,r
for(s=this.a,r=this.$ti.c;s.q();)if(r.b(s.gA()))return!0
return!1},
gA(){return this.$ti.c.a(this.a.gA())},
$ia8:1}
A.aH.prototype={
sn(a,b){throw A.d(A.aw("Cannot change the length of a fixed-length list"))},
j(a,b){A.bg(a).h("aH.E").a(b)
throw A.d(A.aw("Cannot add to a fixed-length list"))}}
A.cT.prototype={
i(a,b,c){A.l(this).h("cT.E").a(c)
throw A.d(A.aw("Cannot modify an unmodifiable list"))},
sn(a,b){throw A.d(A.aw("Cannot change the length of an unmodifiable list"))},
j(a,b){A.l(this).h("cT.E").a(b)
throw A.d(A.aw("Cannot add to an unmodifiable list"))},
bn(a,b){A.l(this).h("c(cT.E,cT.E)?").a(b)
throw A.d(A.aw("Cannot modify an unmodifiable list"))}}
A.hA.prototype={}
A.j0.prototype={
gn(a){return J.aE(this.a)},
ad(a,b){var s=this.a,r=J.at(s)
return r.ad(s,r.gn(s)-1-b)}}
A.u0.prototype={}
A.k6.prototype={}
A.aD.prototype={$r:"+(1,2)",$s:1}
A.jL.prototype={$r:"+box,root(1,2)",$s:2}
A.dS.prototype={$r:"+carry,end(1,2)",$s:3}
A.dT.prototype={$r:"+cols,rows(1,2)",$s:4}
A.hM.prototype={$r:"+config,httpClient(1,2)",$s:5}
A.bA.prototype={$r:"+label,value(1,2)",$s:6}
A.dU.prototype={$r:"+x,y(1,2)",$s:7}
A.jM.prototype={$r:"+completer,nodeId,targetPort(1,2,3)",$s:8}
A.jN.prototype={$r:"+hub,principal,token(1,2,3)",$s:9}
A.dl.prototype={$r:"+(1,2,3,4)",$s:10}
A.jO.prototype={$r:"+isDir,isLink,path,size(1,2,3,4)",$s:11}
A.fJ.prototype={
ak(a,b,c){var s=A.l(this)
return A.z6(this,s.c,s.y[1],b,c)},
gK(a){return this.gn(this)===0},
gZ(a){return this.gn(this)!==0},
l(a){return A.rd(this)},
gX(){return new A.dV(this.pS(),A.l(this).h("dV<V<1,2>>"))},
pS(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gX(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gar(),o=o.gJ(o),n=A.l(s),m=n.y[1],n=n.h("V<1,2>")
case 2:if(!o.q()){r=3
break}l=o.gA()
k=s.k(0,l)
r=4
return a.b=new A.V(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
d4(a,b,c,d){var s=A.I(c,d)
this.aa(0,new A.pp(this,A.l(this).H(c).H(d).h("V<1,2>(3,4)").a(b),s))
return s},
$ih:1}
A.pp.prototype={
$2(a,b){var s=A.l(this.a),r=this.b.$2(s.c.a(a),s.y[1].a(b))
this.c.i(0,r.a,r.b)},
$S(){return A.l(this.a).h("~(1,2)")}}
A.X.prototype={
gn(a){return this.b.length},
giS(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
ag(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
k(a,b){if(!this.ag(b))return null
return this.b[this.a[b]]},
aa(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.giS()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gar(){return new A.jz(this.giS(),this.$ti.h("jz<1>"))}}
A.jz.prototype={
gn(a){return this.a.length},
gK(a){return 0===this.a.length},
gZ(a){return 0!==this.a.length},
gJ(a){var s=this.a
return new A.dk(s,s.length,this.$ti.h("dk<1>"))}}
A.dk.prototype={
gA(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$ia8:1}
A.iz.prototype={
c8(){var s=this,r=s.$map
if(r==null){r=new A.ex(s.$ti.h("ex<1,2>"))
A.AV(s.a,r)
s.$map=r}return r},
ag(a){return this.c8().ag(a)},
k(a,b){return this.c8().k(0,b)},
aa(a,b){this.$ti.h("~(1,2)").a(b)
this.c8().aa(0,b)},
gar(){var s=this.c8()
return new A.d5(s,A.l(s).h("d5<1>"))},
gn(a){return this.c8().a}}
A.fK.prototype={
j(a,b){A.l(this).c.a(b)
A.CY()}}
A.B.prototype={
gn(a){return this.b},
gK(a){return this.b===0},
gZ(a){return this.b!==0},
gJ(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.dk(s,s.length,r.$ti.h("dk<1>"))},
t(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)}}
A.Z.prototype={
gn(a){return this.a.length},
gK(a){return this.a.length===0},
gZ(a){return this.a.length!==0},
gJ(a){var s=this.a
return new A.dk(s,s.length,this.$ti.h("dk<1>"))},
c8(){var s,r,q,p,o=this,n=o.$map
if(n==null){n=new A.ex(o.$ti.h("ex<1,1>"))
for(s=o.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.M)(s),++q){p=s[q]
n.i(0,p,p)}o.$map=n}return n},
t(a,b){return this.c8().ag(b)}}
A.lf.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.fQ&&this.a.L(0,b.a)&&A.ye(this)===A.ye(b)},
gE(a){return A.bo(this.a,A.ye(this),B.f,B.f,B.f,B.f,B.f)},
l(a){var s=B.b.S([A.cb(this.$ti.c)],", ")
return this.a.l(0)+" with "+("<"+s+">")}}
A.fQ.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.IO(A.nY(this.a),this.$ti)}}
A.rR.prototype={
$0(){return B.p.dW(1000*this.a.now())},
$S:15}
A.j1.prototype={}
A.uN.prototype={
bw(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.iW.prototype={
l(a){return"Null check operator used on a null value"}}
A.ll.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.mG.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.lP.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"},
$iaf:1}
A.iw.prototype={}
A.jR.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibW:1}
A.bD.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.Bj(r==null?"unknown":r)+"'"},
gai(a){var s=A.nY(this)
return A.cb(s==null?A.bg(this):s)},
$id1:1,
grr(){return this},
$C:"$1",
$R:1,
$D:null}
A.kF.prototype={$C:"$0",$R:0}
A.kG.prototype={$C:"$2",$R:2}
A.mx.prototype={}
A.ms.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.Bj(s)+"'"}}
A.fF.prototype={
L(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.fF))return!1
return this.$_target===b.$_target&&this.a===b.a},
gE(a){return(A.i5(this.a)^A.dI(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.m5(this.a)+"'")}}
A.mh.prototype={
l(a){return"RuntimeError: "+this.a}}
A.bS.prototype={
gn(a){return this.a},
gK(a){return this.a===0},
gZ(a){return this.a!==0},
gar(){return new A.d5(this,A.l(this).h("d5<1>"))},
gX(){return new A.d4(this,A.l(this).h("d4<1,2>"))},
ag(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.kc(a)},
kc(a){var s=this.d
if(s==null)return!1
return this.co(s[this.cn(a)],a)>=0},
C(a,b){A.l(this).h("h<1,2>").a(b).aa(0,new A.r1(this))},
k(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.kd(b)},
kd(a){var s,r,q=this.d
if(q==null)return null
s=q[this.cn(a)]
r=this.co(s,a)
if(r<0)return null
return s[r].b},
i(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.iq(s==null?q.b=q.h9():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.iq(r==null?q.c=q.h9():r,b,c)}else q.kf(b,c)},
kf(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.h9()
r=o.cn(a)
q=s[r]
if(q==null)s[r]=[o.ha(a,b)]
else{p=o.co(q,a)
if(p>=0)q[p].b=b
else q.push(o.ha(a,b))}},
qI(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.ag(a)){s=q.k(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.i(0,a,r)
return r},
a5(a,b){var s=this
if(typeof b=="string")return s.jd(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.jd(s.c,b)
else return s.ke(b)},
ke(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.cn(a)
r=n[s]
q=o.co(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.jD(p)
if(r.length===0)delete n[s]
return p.b},
a0(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.h6()}},
aa(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.d(A.aG(q))
s=s.c}},
iq(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.ha(b,c)
else s.b=c},
jd(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.jD(s)
delete a[b]
return s.b},
h6(){this.r=this.r+1&1073741823},
ha(a,b){var s=this,r=A.l(s),q=new A.r6(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.h6()
return q},
jD(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.h6()},
cn(a){return J.am(a)&1073741823},
co(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a0(a[r].a,b))return r
return-1},
l(a){return A.rd(this)},
h9(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ilA:1}
A.r1.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.i(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.r6.prototype={}
A.d5.prototype={
gn(a){return this.a.a},
gK(a){return this.a.a===0},
gJ(a){var s=this.a
return new A.iI(s,s.r,s.e,this.$ti.h("iI<1>"))},
t(a,b){return this.a.ag(b)}}
A.iI.prototype={
gA(){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.aG(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$ia8:1}
A.c2.prototype={
gn(a){return this.a.a},
gK(a){return this.a.a===0},
gJ(a){var s=this.a
return new A.aq(s,s.r,s.e,this.$ti.h("aq<1>"))}}
A.aq.prototype={
gA(){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.aG(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$ia8:1}
A.d4.prototype={
gn(a){return this.a.a},
gK(a){return this.a.a===0},
gJ(a){var s=this.a
return new A.iH(s,s.r,s.e,this.$ti.h("iH<1,2>"))}}
A.iH.prototype={
gA(){var s=this.d
s.toString
return s},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.aG(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.V(s.a,s.b,r.$ti.h("V<1,2>"))
r.c=s.c
return!0}},
$ia8:1}
A.iE.prototype={
cn(a){return A.i5(a)&1073741823},
co(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;++r){q=a[r].a
if(q==null?b==null:q===b)return r}return-1}}
A.ex.prototype={
cn(a){return A.Hi(a)&1073741823},
co(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a0(a[r].a,b))return r
return-1}}
A.wP.prototype={
$1(a){return this.a(a)},
$S:32}
A.wQ.prototype={
$2(a,b){return this.a(a,b)},
$S:162}
A.wR.prototype={
$1(a){return this.a(A.r(a))},
$S:118}
A.b1.prototype={
gai(a){return A.cb(this.iO())},
iO(){return A.Ix(this.$r,this.er())},
l(a){return this.jA(!1)},
jA(a){var s,r,q,p,o,n=this.mo(),m=this.er(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.b(m,q)
o=m[q]
l=a?l+A.zl(o):l+A.u(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
mo(){var s,r=this.$s
while($.vY.length<=r)B.b.j($.vY,null)
s=$.vY[r]
if(s==null){s=this.lV()
B.b.i($.vY,r,s)}return s},
lV(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.yX(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.b.i(j,q,r[s])}}return A.cO(j,k)}}
A.cl.prototype={
er(){return[this.a,this.b]},
L(a,b){if(b==null)return!1
return b instanceof A.cl&&this.$s===b.$s&&J.a0(this.a,b.a)&&J.a0(this.b,b.b)},
gE(a){return A.bo(this.$s,this.a,this.b,B.f,B.f,B.f,B.f)}}
A.fk.prototype={
er(){return[this.a,this.b,this.c]},
L(a,b){var s=this
if(b==null)return!1
return b instanceof A.fk&&s.$s===b.$s&&J.a0(s.a,b.a)&&J.a0(s.b,b.b)&&J.a0(s.c,b.c)},
gE(a){var s=this
return A.bo(s.$s,s.a,s.b,s.c,B.f,B.f,B.f)}}
A.fl.prototype={
er(){return this.a},
L(a,b){if(b==null)return!1
return b instanceof A.fl&&this.$s===b.$s&&A.FL(this.a,b.a)},
gE(a){return A.bo(this.$s,A.eG(this.a),B.f,B.f,B.f,B.f,B.f)}}
A.dC.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
giX(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.xH(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"g")},
gni(){var s=this,r=s.d
if(r!=null)return r
r=s.b
return s.d=A.xH(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"y")},
lW(){var s,r=this.a
if(!B.a.t(r,"("))return!1
s=this.b.unicode?"u":""
return new RegExp("(?:)|"+r,s).exec("").length>1},
d0(a){var s=this.b.exec(a)
if(s==null)return null
return new A.hJ(s)},
l1(a){var s,r=this.d0(a)
if(r!=null){s=r.b
if(0>=s.length)return A.b(s,0)
return s[0]}return null},
hm(a,b,c){var s=b.length
if(c>s)throw A.d(A.ay(c,0,s,null,null))
return new A.mV(this,b,c)},
dK(a,b){return this.hm(0,b,0)},
ml(a,b){var s,r=this.giX()
if(r==null)r=A.ap(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.hJ(s)},
mk(a,b){var s,r=this.gni()
if(r==null)r=A.ap(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.hJ(s)},
cq(a,b,c){if(c<0||c>b.length)throw A.d(A.ay(c,0,b.length,null,null))
return this.mk(b,c)},
$irL:1,
$iEx:1}
A.hJ.prototype={
gP(){return this.b.index},
gO(){var s=this.b
return s.index+s[0].length},
k(a,b){var s=this.b
if(!(b<s.length))return A.b(s,b)
return s[b]},
$icP:1,
$ij_:1}
A.mV.prototype={
gJ(a){return new A.hF(this.a,this.b,this.c)}}
A.hF.prototype={
gA(){var s=this.d
return s==null?t.he.a(s):s},
q(){var s,r,q,p,o,n,m=this,l=m.b
if(l==null)return!1
s=m.c
r=l.length
if(s<=r){q=m.a
p=q.ml(l,s)
if(p!=null){m.d=p
o=p.gO()
if(p.b.index===o){s=!1
if(q.b.unicode){q=m.c
n=q+1
if(n<r){if(!(q>=0&&q<r))return A.b(l,q)
q=l.charCodeAt(q)
if(q>=55296&&q<=56319){if(!(n>=0))return A.b(l,n)
s=l.charCodeAt(n)
s=s>=56320&&s<=57343}}}o=(s?o+1:o)+1}m.c=o
return!0}}m.b=m.d=null
return!1},
$ia8:1}
A.hv.prototype={
gO(){return this.a+this.c.length},
k(a,b){if(b!==0)throw A.d(A.t_(b,null))
return this.c},
$icP:1,
gP(){return this.a}}
A.nA.prototype={
gJ(a){return new A.nB(this.a,this.b,this.c)},
gI(a){var s=this.b,r=this.a.indexOf(s,this.c)
if(r>=0)return new A.hv(r,s)
throw A.d(A.ce())}}
A.nB.prototype={
q(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.hv(s,o)
q.c=r===q.c?r+1:r
return!0},
gA(){var s=this.d
s.toString
return s},
$ia8:1}
A.vk.prototype={
cb(){var s=this.b
if(s===this)throw A.d(new A.dE("Local '"+this.a+"' has not been initialized."))
return s},
sk7(a){var s=this
if(s.b!==s)throw A.d(new A.dE("Local '"+s.a+"' has already been initialized."))
s.b=a}}
A.dG.prototype={
gai(a){return B.pA},
jS(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iao:1,
$idG:1,
$iii:1}
A.fZ.prototype={$ifZ:1}
A.iP.prototype={
ghp(a){if(((a.$flags|0)&2)!==0)return new A.nN(a.buffer)
else return a.buffer},
n_(a,b,c,d){var s=A.ay(b,0,c,d,null)
throw A.d(s)},
iw(a,b,c,d){if(b>>>0!==b||b>c)this.n_(a,b,c,d)}}
A.nN.prototype={
jS(a,b,c){var s=A.z8(this.a,b,c)
s.$flags=3
return s},
$iii:1}
A.iN.prototype={
gai(a){return B.pB},
$iao:1,
$ixC:1}
A.bn.prototype={
gn(a){return a.length},
oG(a,b,c,d,e){var s,r,q=a.length
this.iw(a,b,q,"start")
this.iw(a,c,q,"end")
if(b>c)throw A.d(A.ay(b,0,c,null,null))
s=c-b
if(e<0)throw A.d(A.as(e,null))
r=d.length
if(r-e<s)throw A.d(A.aC("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$ibl:1,
$ic1:1}
A.iO.prototype={
k(a,b){A.dn(b,a,a.length)
return a[b]},
i(a,b,c){A.cp(c)
a.$flags&2&&A.ai(a)
A.dn(b,a,a.length)
a[b]=c},
$iJ:1,
$ii:1,
$ik:1}
A.c3.prototype={
i(a,b,c){A.a4(c)
a.$flags&2&&A.ai(a)
A.dn(b,a,a.length)
a[b]=c},
bd(a,b,c,d,e){t.uI.a(d)
a.$flags&2&&A.ai(a,5)
if(t.eK.b(d)){this.oG(a,b,c,d,e)
return}this.lc(a,b,c,d,e)},
bK(a,b,c,d){return this.bd(a,b,c,d,0)},
$iJ:1,
$ii:1,
$ik:1}
A.lF.prototype={
gai(a){return B.pC},
$iao:1,
$ipV:1}
A.lG.prototype={
gai(a){return B.pD},
$iao:1,
$ipW:1}
A.lH.prototype={
gai(a){return B.pE},
k(a,b){A.dn(b,a,a.length)
return a[b]},
$iao:1,
$iqW:1}
A.lI.prototype={
gai(a){return B.pF},
k(a,b){A.dn(b,a,a.length)
return a[b]},
$iao:1,
$iqX:1}
A.lJ.prototype={
gai(a){return B.pG},
k(a,b){A.dn(b,a,a.length)
return a[b]},
$iao:1,
$iqY:1}
A.lK.prototype={
gai(a){return B.pJ},
k(a,b){A.dn(b,a,a.length)
return a[b]},
$iao:1,
$iuP:1}
A.iQ.prototype={
gai(a){return B.pK},
k(a,b){A.dn(b,a,a.length)
return a[b]},
aq(a,b,c){return new Uint32Array(a.subarray(b,A.Am(b,c,a.length)))},
$iao:1,
$iuQ:1}
A.iR.prototype={
gai(a){return B.pL},
gn(a){return a.length},
k(a,b){A.dn(b,a,a.length)
return a[b]},
$iao:1,
$iuR:1}
A.eA.prototype={
gai(a){return B.pM},
gn(a){return a.length},
k(a,b){A.dn(b,a,a.length)
return a[b]},
aq(a,b,c){return new Uint8Array(a.subarray(b,A.Am(b,c,a.length)))},
$iao:1,
$ieA:1,
$idf:1}
A.jD.prototype={}
A.jE.prototype={}
A.jF.prototype={}
A.jG.prototype={}
A.cy.prototype={
h(a){return A.jZ(v.typeUniverse,this,a)},
H(a){return A.A1(v.typeUniverse,this,a)}}
A.nf.prototype={}
A.nI.prototype={
l(a){return A.bM(this.a,null)}}
A.nb.prototype={
l(a){return this.a}}
A.hQ.prototype={$idd:1}
A.vd.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:13}
A.vc.prototype={
$1(a){var s,r
this.a.a=t.Q.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:72}
A.ve.prototype={
$0(){this.a.$0()},
$S:5}
A.vf.prototype={
$0(){this.a.$0()},
$S:5}
A.nF.prototype={
lx(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.i1(new A.w2(this,b),0),a)
else throw A.d(A.aw("`setTimeout()` not found."))},
U(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
self.clearTimeout(s)
this.b=null}else throw A.d(A.aw("Canceling a timer."))},
$iF2:1}
A.w2.prototype={
$0(){this.a.b=null
this.b.$0()},
$S:0}
A.jj.prototype={
V(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.c5(a)
else{s=r.a
if(q.h("H<1>").b(a))s.iv(a)
else s.dr(a)}},
cg(a,b){var s
if(b==null)b=A.id(a)
s=this.a
if(this.b)s.aD(new A.aO(a,b))
else s.c6(new A.aO(a,b))},
a7(a){return this.cg(a,null)},
gaN(){return(this.a.a&30)!==0},
$ibd:1}
A.wc.prototype={
$1(a){return this.a.$2(0,a)},
$S:10}
A.wd.prototype={
$2(a,b){this.a.$2(1,new A.iw(a,t.l.a(b)))},
$S:76}
A.wx.prototype={
$2(a,b){this.a(A.a4(a),b)},
$S:117}
A.dm.prototype={
gA(){var s=this.b
return s==null?this.$ti.c.a(s):s},
of(a,b){var s,r,q
a=A.a4(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
q(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.q()){o.b=s.gA()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.of(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.zX
return!1}if(0>=p.length)return A.b(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.zX
throw n
return!1}if(0>=p.length)return A.b(p,-1)
o.a=p.pop()
m=1
continue}throw A.d(A.aC("sync*"))}return!1},
pq(a){var s,r,q=this
if(a instanceof A.dV){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.j(r,q.a)
q.a=s
return 2}else{q.d=J.aN(a)
return 2}},
$ia8:1}
A.dV.prototype={
gJ(a){return new A.dm(this.a(),this.$ti.h("dm<1>"))}}
A.aO.prototype={
l(a){return A.u(this.a)},
$iau:1,
gdj(){return this.b}}
A.aA.prototype={
gbY(){return!0}}
A.cU.prototype={
bP(){},
bQ(){},
seB(a){this.ch=this.$ti.h("cU<1>?").a(a)},
shc(a){this.CW=this.$ti.h("cU<1>?").a(a)}}
A.jn.prototype={
gh5(){return this.c<4},
oa(a){var s,r
A.l(this).h("cU<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.seB(r)
if(r==null)this.e=s
else r.shc(s)
a.shc(a)
a.seB(a)},
jv(a,b,c,d){var s,r,q,p,o,n,m,l,k=this,j=A.l(k)
j.h("~(1)?").a(a)
t.Z.a(c)
if((k.c&4)!==0)return A.zJ(c,j.c)
s=$.E
r=d?1:0
q=b!=null?32:0
p=A.vg(s,a,j.c)
o=A.xY(s,b)
n=c==null?A.yc():c
j=j.h("cU<1>")
m=new A.cU(k,p,o,t.Q.a(n),s,r|q,j)
m.CW=m
m.ch=m
j.a(m)
m.ay=k.c&1
l=k.e
k.e=m
m.seB(null)
m.shc(l)
if(l==null)k.d=m
else l.seB(m)
if(k.d==k.e)A.nX(k.a)
return m},
ja(a){var s=this,r=A.l(s)
a=r.h("cU<1>").a(r.h("bw<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.oa(a)
if((s.c&2)===0&&s.d==null)s.lL()}return null},
jb(a){A.l(this).h("bw<1>").a(a)},
jc(a){A.l(this).h("bw<1>").a(a)},
fI(){if((this.c&4)!==0)return new A.bX("Cannot add new events after calling close")
return new A.bX("Cannot add new events while doing an addStream")},
j(a,b){var s=this
A.l(s).c.a(b)
if(!s.gh5())throw A.d(s.fI())
s.cc(b)},
aJ(a,b){var s
if(!this.gh5())throw A.d(this.fI())
s=A.nV(a,b)
this.ce(s.a,s.b)},
p(){var s,r,q=this
if((q.c&4)!==0){s=q.r
s.toString
return s}if(!q.gh5())throw A.d(q.fI())
q.c|=4
r=q.r
if(r==null)r=q.r=new A.v($.E,t.D)
q.cd()
return r},
lL(){if((this.c&4)!==0){var s=this.r
if((s.a&30)===0)s.c5(null)}A.nX(this.b)},
$iaY:1,
$ick:1,
$ieU:1,
$ijT:1,
$icV:1,
$ic6:1,
$ia3:1}
A.jk.prototype={
cc(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.h("cC<1>");s!=null;s=s.ch)s.bB(new A.cC(a,r))},
ce(a,b){var s
for(s=this.d;s!=null;s=s.ch)s.bB(new A.fd(a,b))},
cd(){var s=this.d
if(s!=null)for(;s!=null;s=s.ch)s.bB(B.aG)
else this.r.c5(null)}}
A.pY.prototype={
$0(){this.c.a(null)
this.b.bM(null)},
$S:0}
A.q1.prototype={
$2(a,b){var s,r,q=this
A.ap(a)
t.l.a(b)
s=q.a
r=--s.b
if(s.a!=null){s.a=null
s.d=a
s.c=b
if(r===0||q.c)q.d.aD(new A.aO(a,b))}else if(r===0&&!q.c){r=s.d
r.toString
s=s.c
s.toString
q.d.aD(new A.aO(r,s))}},
$S:11}
A.q0.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this,j=k.d
j.a(a)
o=k.a
s=--o.b
r=o.a
if(r!=null){J.yp(r,k.b,a)
if(J.a0(s,0)){q=A.e([],j.h("z<0>"))
for(o=r,n=o.length,m=0;m<o.length;o.length===n||(0,A.M)(o),++m){p=o[m]
l=p
if(l==null)l=j.a(l)
J.fw(q,l)}k.c.dr(q)}}else if(J.a0(s,0)&&!k.f){q=o.d
q.toString
o=o.c
o.toString
k.c.aD(new A.aO(q,o))}},
$S(){return this.d.h("ab(0)")}}
A.q_.prototype={
$1(a){var s
this.b.a(a)
s=this.a
if((s.a.a&30)===0)s.V(a)},
$S(){return this.b.h("~(0)")}}
A.pZ.prototype={
$2(a,b){var s
A.ap(a)
t.l.a(b)
s=this.a
if((s.a.a&30)===0)s.cg(a,b)},
$S:11}
A.hz.prototype={
l(a){var s=this.b,r=s!=null?"TimeoutException after "+s.l(0):"TimeoutException"
return r+": "+this.a},
$iaf:1}
A.fb.prototype={
cg(a,b){A.ap(a)
t.hF.a(b)
if((this.a.a&30)!==0)throw A.d(A.aC("Future already completed"))
this.aD(A.nV(a,b))},
a7(a){return this.cg(a,null)},
gaN(){return(this.a.a&30)!==0},
$ibd:1}
A.W.prototype={
V(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.d(A.aC("Future already completed"))
s.c5(r.h("1/").a(a))},
bt(){return this.V(null)},
aD(a){this.a.c6(a)}}
A.jU.prototype={
V(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.d(A.aC("Future already completed"))
s.bM(r.h("1/").a(a))},
aD(a){this.a.aD(a)}}
A.cD.prototype={
qj(a){if((this.c&15)!==6)return!0
return this.b.b.i1(t.bl.a(this.d),a.a,t.y,t.K)},
q2(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.nW.b(q))p=l.rf(q,m,a.b,o,n,t.l)
else p=l.i1(t.h_.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.bs.b(A.R(s))){if((r.c&1)!==0)throw A.d(A.as("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.d(A.as("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.v.prototype={
cw(a,b,c){var s,r,q,p=this.$ti
p.H(c).h("1/(2)").a(a)
s=$.E
if(s===B.t){if(b!=null&&!t.nW.b(b)&&!t.h_.b(b))throw A.d(A.cY(b,"onError",u.w))}else{c.h("@<0/>").H(p.c).h("1(2)").a(a)
if(b!=null)b=A.Az(b,s)}r=new A.v(s,c.h("v<0>"))
q=b==null?1:3
this.dn(new A.cD(r,q,a,b,p.h("@<1>").H(c).h("cD<1,2>")))
return r},
aZ(a,b){return this.cw(a,null,b)},
jy(a,b,c){var s,r=this.$ti
r.H(c).h("1/(2)").a(a)
s=new A.v($.E,c.h("v<0>"))
this.dn(new A.cD(s,19,a,b,r.h("@<1>").H(c).h("cD<1,2>")))
return s},
bF(a){var s=this.$ti,r=$.E,q=new A.v(r,s)
if(r!==B.t)a=A.Az(a,r)
this.dn(new A.cD(q,2,null,a,s.h("cD<1,1>")))
return q},
dd(a){var s,r
t.pF.a(a)
s=this.$ti
r=new A.v($.E,s)
this.dn(new A.cD(r,8,a,null,s.h("cD<1,1>")))
return r},
oE(a){this.a=this.a&1|16
this.c=a},
ej(a){this.a=a.a&30|this.a&1
this.c=a.c},
dn(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.hR.a(r.c)
if((s.a&24)===0){s.dn(a)
return}r.ej(s)}A.hX(null,null,r.b,t.Q.a(new A.vr(r,a)))}},
j7(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.hR.a(m.c)
if((n.a&24)===0){n.j7(a)
return}m.ej(n)}l.a=m.eM(a)
A.hX(null,null,m.b,t.Q.a(new A.vw(l,m)))}},
dE(){var s=t.F.a(this.c)
this.c=null
return this.eM(s)},
eM(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bM(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("H<1>").b(a))A.vu(a,r,!0)
else{s=r.dE()
q.c.a(a)
r.a=8
r.c=a
A.ff(r,s)}},
dr(a){var s,r=this
r.$ti.c.a(a)
s=r.dE()
r.a=8
r.c=a
A.ff(r,s)},
lU(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.dE()
q.ej(a)
A.ff(q,r)},
aD(a){var s=this.dE()
this.oE(a)
A.ff(this,s)},
lT(a,b){A.ap(a)
t.l.a(b)
this.aD(new A.aO(a,b))},
c5(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("H<1>").b(a)){this.iv(a)
return}this.lG(a)},
lG(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.hX(null,null,s.b,t.Q.a(new A.vt(s,a)))},
iv(a){A.vu(this.$ti.h("H<1>").a(a),this,!1)
return},
c6(a){this.a^=2
A.hX(null,null,this.b,t.Q.a(new A.vs(this,a)))},
kw(a,b){var s,r,q=this,p={},o=q.$ti
o.h("1/()?").a(b)
if((q.a&24)!==0){p=new A.v($.E,o)
p.c5(q)
return p}s=$.E
r=new A.v(s,o)
p.a=null
if(b==null)p.a=A.eY(a,new A.vC(r,a))
else p.a=A.eY(a,new A.vD(q,r,s,o.h("1/()").a(b)))
q.cw(new A.vE(p,q,r),new A.vF(p,r),t.c)
return r},
kv(a){return this.kw(a,null)},
$iH:1}
A.vr.prototype={
$0(){A.ff(this.a,this.b)},
$S:0}
A.vw.prototype={
$0(){A.ff(this.b,this.a.a)},
$S:0}
A.vv.prototype={
$0(){A.vu(this.a.a,this.b,!0)},
$S:0}
A.vt.prototype={
$0(){this.a.dr(this.b)},
$S:0}
A.vs.prototype={
$0(){this.a.aD(this.b)},
$S:0}
A.vz.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.i_(t.pF.a(q.d),t.z)}catch(p){s=A.R(p)
r=A.bt(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.id(q)
n=k.a
n.c=new A.aO(q,o)
q=n}q.b=!0
return}if(j instanceof A.v&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.v){m=k.b.a
l=new A.v(m.b,m.$ti)
j.cw(new A.vA(l,m),new A.vB(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.vA.prototype={
$1(a){this.a.lU(this.b)},
$S:13}
A.vB.prototype={
$2(a,b){A.ap(a)
t.l.a(b)
this.a.aD(new A.aO(a,b))},
$S:31}
A.vy.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.i1(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.R(l)
r=A.bt(l)
q=s
p=r
if(p==null)p=A.id(q)
o=this.a
o.c=new A.aO(q,p)
o.b=!0}},
$S:0}
A.vx.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.qj(s)&&p.a.e!=null){p.c=p.a.q2(s)
p.b=!1}}catch(o){r=A.R(o)
q=A.bt(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.id(p)
m=l.b
m.c=new A.aO(p,n)
p=m}p.b=!0}},
$S:0}
A.vC.prototype={
$0(){var s=A.xS()
this.a.aD(new A.aO(new A.hz("Future not completed",this.b),s))},
$S:0}
A.vD.prototype={
$0(){var s,r,q,p,o,n=this
try{n.b.bM(n.c.i_(n.d,n.a.$ti.h("1/")))}catch(q){s=A.R(q)
r=A.bt(q)
p=s
o=r
if(o==null)o=A.id(p)
n.b.aD(new A.aO(p,o))}},
$S:0}
A.vE.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.U()
this.c.dr(a)}},
$S(){return this.b.$ti.h("ab(1)")}}
A.vF.prototype={
$2(a,b){var s
A.ap(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.U()
this.b.aD(new A.aO(a,b))}},
$S:31}
A.mY.prototype={}
A.aa.prototype={
gbY(){return!1},
hC(a,b,c,d){var s,r,q={}
d.a(b)
A.l(this).H(d).h("1(1,aa.T)").a(c)
s=new A.v($.E,d.h("v<0>"))
q.a=b
r=this.au(null,!0,new A.tQ(q,s),s.gel())
r.e3(new A.tR(q,this,c,r,s,d))
return s},
aa(a,b){var s,r
A.l(this).h("~(aa.T)").a(b)
s=new A.v($.E,t.hR)
r=this.au(null,!0,new A.tU(s),s.gel())
r.e3(new A.tV(this,b,r,s))
return s},
gn(a){var s={},r=new A.v($.E,t.AJ)
s.a=0
this.au(new A.tW(s,this),!0,new A.tX(s,r),r.gel())
return r},
gI(a){var s=new A.v($.E,A.l(this).h("v<aa.T>")),r=this.au(null,!0,new A.tM(s),s.gel())
r.e3(new A.tN(this,r,s))
return s}}
A.tQ.prototype={
$0(){this.b.bM(this.a.a)},
$S:0}
A.tR.prototype={
$1(a){var s=this,r=s.a,q=s.f
A.AE(new A.tO(r,s.c,A.l(s.b).h("aa.T").a(a),q),new A.tP(r,q),A.Ak(s.d,s.e),q)},
$S(){return A.l(this.b).h("~(aa.T)")}}
A.tO.prototype={
$0(){return this.b.$2(this.a.a,this.c)},
$S(){return this.d.h("0()")}}
A.tP.prototype={
$1(a){this.a.a=this.b.a(a)},
$S(){return this.b.h("ab(0)")}}
A.tU.prototype={
$0(){this.a.bM(null)},
$S:0}
A.tV.prototype={
$1(a){var s=this
A.AE(new A.tS(s.b,A.l(s.a).h("aa.T").a(a)),new A.tT(),A.Ak(s.c,s.d),t.H)},
$S(){return A.l(this.a).h("~(aa.T)")}}
A.tS.prototype={
$0(){return this.a.$1(this.b)},
$S:0}
A.tT.prototype={
$1(a){},
$S:75}
A.tW.prototype={
$1(a){A.l(this.b).h("aa.T").a(a);++this.a.a},
$S(){return A.l(this.b).h("~(aa.T)")}}
A.tX.prototype={
$0(){this.b.bM(this.a.a)},
$S:0}
A.tM.prototype={
$0(){var s,r=A.xS(),q=new A.bX("No element")
A.rT(q,r)
s=A.wn(q,r)
s=new A.aO(q,r)
this.a.aD(s)},
$S:0}
A.tN.prototype={
$1(a){A.Gf(this.b,this.c,A.l(this.a).h("aa.T").a(a))},
$S(){return A.l(this.a).h("~(aa.T)")}}
A.eV.prototype={
gbY(){return this.a.gbY()},
au(a,b,c,d){return this.a.au(A.l(this).h("~(eV.T)?").a(a),b,t.Z.a(c),d)},
bv(a,b,c){return this.au(a,null,b,c)}}
A.jb.prototype={$ibr:1}
A.fm.prototype={
gnY(){var s,r=this
if((r.b&8)===0)return A.l(r).h("cE<1>?").a(r.a)
s=A.l(r)
return s.h("cE<1>?").a(s.h("jS<1>").a(r.a).ghj())},
fW(){var s,r,q=this
if((q.b&8)===0){s=q.a
if(s==null)s=q.a=new A.cE(A.l(q).h("cE<1>"))
return A.l(q).h("cE<1>").a(s)}r=A.l(q)
s=r.h("jS<1>").a(q.a).ghj()
return r.h("cE<1>").a(s)},
gcT(){var s=this.a
if((this.b&8)!==0)s=t.qs.a(s).ghj()
return A.l(this).h("di<1>").a(s)},
fK(){if((this.b&4)!==0)return new A.bX("Cannot add event after closing")
return new A.bX("Cannot add event while adding a stream")},
iH(){var s=this.c
if(s==null)s=this.c=(this.b&2)!==0?$.fu():new A.v($.E,t.D)
return s},
j(a,b){var s=this
A.l(s).c.a(b)
if(s.b>=4)throw A.d(s.fK())
s.aC(b)},
aJ(a,b){var s,r,q=this
A.ap(a)
t.hF.a(b)
if(q.b>=4)throw A.d(q.fK())
s=A.nV(a,b)
a=s.a
b=s.b
r=q.b
if((r&1)!==0)q.ce(a,b)
else if((r&3)===0)q.fW().j(0,new A.fd(a,b))},
f2(a){return this.aJ(a,null)},
p(){var s=this,r=s.b
if((r&4)!==0)return s.iH()
if(r>=4)throw A.d(s.fK())
s.iy()
return s.iH()},
iy(){var s=this.b|=4
if((s&1)!==0)this.cd()
else if((s&3)===0)this.fW().j(0,B.aG)},
aC(a){var s,r=this,q=A.l(r)
q.c.a(a)
s=r.b
if((s&1)!==0)r.cc(a)
else if((s&3)===0)r.fW().j(0,new A.cC(a,q.h("cC<1>")))},
jv(a,b,c,d){var s,r,q,p=this,o=A.l(p)
o.h("~(1)?").a(a)
t.Z.a(c)
if((p.b&3)!==0)throw A.d(A.aC("Stream has already been listened to."))
s=A.Fs(p,a,b,c,d,o.c)
r=p.gnY()
if(((p.b|=1)&8)!==0){q=o.h("jS<1>").a(p.a)
q.shj(s)
q.cu()}else p.a=s
s.oF(r)
s.h_(new A.w1(p))
return s},
ja(a){var s,r,q,p,o,n,m,l,k=this,j=A.l(k)
j.h("bw<1>").a(a)
s=null
if((k.b&8)!==0)s=j.h("jS<1>").a(k.a).U()
k.a=null
k.b=k.b&4294967286|2
r=k.r
if(r!=null)if(s==null)try{q=r.$0()
if(q instanceof A.v)s=q}catch(n){p=A.R(n)
o=A.bt(n)
m=new A.v($.E,t.D)
j=A.ap(p)
l=t.l.a(o)
m.c6(new A.aO(j,l))
s=m}else s=s.dd(r)
j=new A.w0(k)
if(s!=null)s=s.dd(j)
else j.$0()
return s},
jb(a){var s=this,r=A.l(s)
r.h("bw<1>").a(a)
if((s.b&8)!==0)r.h("jS<1>").a(s.a).d7()
A.nX(s.e)},
jc(a){var s=this,r=A.l(s)
r.h("bw<1>").a(a)
if((s.b&8)!==0)r.h("jS<1>").a(s.a).cu()
A.nX(s.f)},
$iaY:1,
$ick:1,
$ieU:1,
$ijT:1,
$icV:1,
$ic6:1,
$ia3:1}
A.w1.prototype={
$0(){A.nX(this.a.d)},
$S:0}
A.w0.prototype={
$0(){var s=this.a.c
if(s!=null&&(s.a&30)===0)s.c5(null)},
$S:0}
A.nE.prototype={
cc(a){this.$ti.c.a(a)
this.gcT().aC(a)},
ce(a,b){this.gcT().bL(a,b)},
cd(){this.gcT().aH()}}
A.mZ.prototype={
cc(a){var s=this.$ti
s.c.a(a)
this.gcT().bB(new A.cC(a,s.h("cC<1>")))},
ce(a,b){this.gcT().bB(new A.fd(a,b))},
cd(){this.gcT().bB(B.aG)}}
A.dP.prototype={}
A.hP.prototype={}
A.ac.prototype={
gE(a){return(A.dI(this.a)^892482866)>>>0},
L(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.ac&&b.a===this.a}}
A.di.prototype={
hb(){return this.w.ja(this)},
bP(){this.w.jb(this)},
bQ(){this.w.jc(this)}}
A.fn.prototype={
j(a,b){this.a.j(0,this.$ti.c.a(b))},
aJ(a,b){this.a.aJ(a,b)},
p(){return this.a.p()},
$iaY:1,
$ick:1,
$ia3:1}
A.b_.prototype={
oF(a){var s=this
A.l(s).h("cE<b_.T>?").a(a)
if(a==null)return
s.r=a
if(a.c!=null){s.e=(s.e|128)>>>0
a.ef(s)}},
e3(a){var s=A.l(this)
this.a=A.vg(this.d,s.h("~(b_.T)?").a(a),s.h("b_.T"))},
d7(){var s,r,q=this,p=q.e
if((p&8)!==0)return
s=(p+256|4)>>>0
q.e=s
if(p<256){r=q.r
if(r!=null)if(r.a===1)r.a=3}if((p&4)===0&&(s&64)===0)q.h_(q.geD())},
cu(){var s=this,r=s.e
if((r&8)!==0)return
if(r>=256){r=s.e=r-256
if(r<256)if((r&128)!==0&&s.r.c!=null)s.r.ef(s)
else{r=(r&4294967291)>>>0
s.e=r
if((r&64)===0)s.h_(s.geE())}}},
U(){var s=this,r=(s.e&4294967279)>>>0
s.e=r
if((r&8)===0)s.fL()
r=s.f
return r==null?$.fu():r},
fL(){var s,r=this,q=r.e=(r.e|8)>>>0
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.hb()},
aC(a){var s,r=this,q=A.l(r)
q.h("b_.T").a(a)
s=r.e
if((s&8)!==0)return
if(s<64)r.cc(a)
else r.bB(new A.cC(a,q.h("cC<b_.T>")))},
bL(a,b){var s
if(t.yt.b(a))A.rT(a,b)
s=this.e
if((s&8)!==0)return
if(s<64)this.ce(a,b)
else this.bB(new A.fd(a,b))},
aH(){var s=this,r=s.e
if((r&8)!==0)return
r=(r|2)>>>0
s.e=r
if(r<64)s.cd()
else s.bB(B.aG)},
bP(){},
bQ(){},
hb(){return null},
bB(a){var s,r=this,q=r.r
if(q==null)q=r.r=new A.cE(A.l(r).h("cE<b_.T>"))
q.j(0,a)
s=r.e
if((s&128)===0){s=(s|128)>>>0
r.e=s
if(s<256)q.ef(r)}},
cc(a){var s,r=this,q=A.l(r).h("b_.T")
q.a(a)
s=r.e
r.e=(s|64)>>>0
r.d.i2(r.a,a,q)
r.e=(r.e&4294967231)>>>0
r.fN((s&4)!==0)},
ce(a,b){var s,r=this,q=r.e,p=new A.vi(r,a,b)
if((q&1)!==0){r.e=(q|16)>>>0
r.fL()
s=r.f
if(s!=null&&s!==$.fu())s.dd(p)
else p.$0()}else{p.$0()
r.fN((q&4)!==0)}},
cd(){var s,r=this,q=new A.vh(r)
r.fL()
r.e=(r.e|16)>>>0
s=r.f
if(s!=null&&s!==$.fu())s.dd(q)
else q.$0()},
h_(a){var s,r=this
t.Q.a(a)
s=r.e
r.e=(s|64)>>>0
a.$0()
r.e=(r.e&4294967231)>>>0
r.fN((s&4)!==0)},
fN(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=(p&4294967167)>>>0
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p=(p&4294967291)>>>0
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=(p^64)>>>0
if(r)q.bP()
else q.bQ()
p=(q.e&4294967231)>>>0
q.e=p}if((p&128)!==0&&p<256)q.r.ef(q)},
$ibw:1,
$icV:1,
$ic6:1}
A.vi.prototype={
$0(){var s,r,q,p=this.a,o=p.e
if((o&8)!==0&&(o&16)===0)return
p.e=(o|64)>>>0
s=p.b
o=this.b
r=t.K
q=p.d
if(t.sp.b(s))q.rg(s,o,this.c,r,t.l)
else q.i2(t.eC.a(s),o,r)
p.e=(p.e&4294967231)>>>0},
$S:0}
A.vh.prototype={
$0(){var s=this.a,r=s.e
if((r&16)===0)return
s.e=(r|74)>>>0
s.d.i0(s.c)
s.e=(s.e&4294967231)>>>0},
$S:0}
A.hO.prototype={
au(a,b,c,d){var s=A.l(this)
s.h("~(1)?").a(a)
t.Z.a(c)
return this.a.jv(s.h("~(1)?").a(a),d,c,b===!0)},
qh(a,b,c){return this.au(a,b,c,null)},
aE(a){return this.au(a,null,null,null)},
qg(a,b){return this.au(a,null,b,null)},
bv(a,b,c){return this.au(a,null,b,c)}}
A.dj.prototype={
se2(a){this.a=t.Ed.a(a)},
ge2(){return this.a}}
A.cC.prototype={
hU(a){this.$ti.h("c6<1>").a(a).cc(this.b)}}
A.fd.prototype={
hU(a){a.ce(this.b,this.c)}}
A.n9.prototype={
hU(a){a.cd()},
ge2(){return null},
se2(a){throw A.d(A.aC("No events after a done."))},
$idj:1}
A.cE.prototype={
ef(a){var s,r=this
r.$ti.h("c6<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.o3(new A.vT(r,a))
r.a=1},
j(a,b){var s=this,r=s.c
if(r==null)s.b=s.c=b
else{r.se2(b)
s.c=b}}}
A.vT.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.h("c6<1>").a(this.b)
r=p.b
q=r.ge2()
p.b=q
if(q==null)p.c=null
r.hU(s)},
$S:0}
A.hG.prototype={
e3(a){this.$ti.h("~(1)?").a(a)},
d7(){var s=this.a
if(s>=0)this.a=s+2},
cu(){var s=this,r=s.a-2
if(r<0)return
if(r===0){s.a=1
A.o3(s.gj1())}else s.a=r},
U(){this.a=-1
this.c=null
return $.fu()},
nD(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.i0(s)}}else r.a=q},
$ibw:1}
A.nz.prototype={}
A.js.prototype={
au(a,b,c,d){var s=this.$ti
s.h("~(1)?").a(a)
return A.zJ(t.Z.a(c),s.c)},
bv(a,b,c){return this.au(a,null,b,c)},
gbY(){return!0}}
A.wf.prototype={
$0(){return this.a.aD(this.b)},
$S:0}
A.we.prototype={
$2(a,b){t.l.a(b)
A.Ge(this.a,this.b,new A.aO(a,b))},
$S:11}
A.wg.prototype={
$0(){return this.a.bM(this.b)},
$S:0}
A.jt.prototype={
j(a,b){var s=this.a
b=s.$ti.y[1].a(this.$ti.c.a(b))
if((s.e&2)!==0)A.K(A.aC("Stream is already closed"))
s.eh(b)},
aJ(a,b){this.a.bL(a,b)},
p(){var s=this.a
if((s.e&2)!==0)A.K(A.aC("Stream is already closed"))
s.im()},
$iaY:1,
$ia3:1}
A.hN.prototype={
aC(a){this.$ti.y[1].a(a)
if((this.e&2)!==0)throw A.d(A.aC("Stream is already closed"))
this.eh(a)},
bL(a,b){t.l.a(b)
if((this.e&2)!==0)throw A.d(A.aC("Stream is already closed"))
this.lf(a,b)},
aH(){if((this.e&2)!==0)throw A.d(A.aC("Stream is already closed"))
this.im()},
bP(){var s=this.x
if(s!=null)s.d7()},
bQ(){var s=this.x
if(s!=null)s.cu()},
hb(){var s=this.x
if(s!=null){this.x=null
return s.U()}return null},
mG(a){var s,r,q,p
this.$ti.c.a(a)
try{q=this.w
q===$&&A.w("_transformerSink")
q.j(0,a)}catch(p){s=A.R(p)
r=A.bt(p)
this.bL(s,r)}},
mN(a,b){var s,r,q,p
A.ap(a)
t.l.a(b)
try{q=this.w
q===$&&A.w("_transformerSink")
q.aJ(a,b)}catch(p){s=A.R(p)
r=A.bt(p)
if(s===a)this.bL(a,b)
else this.bL(s,r)}},
mK(){var s,r,q,p
try{this.x=null
q=this.w
q===$&&A.w("_transformerSink")
q.p()}catch(p){s=A.R(p)
r=A.bt(p)
this.bL(s,r)}}}
A.jm.prototype={
gbY(){return this.b.gbY()},
au(a,b,c,d){var s,r,q,p,o,n,m,l=this.$ti
l.h("~(2)?").a(a)
t.Z.a(c)
s=$.E
r=b===!0?1:0
q=d!=null?32:0
p=A.vg(s,a,l.y[1])
o=A.xY(s,d)
n=c==null?A.yc():c
m=new A.hN(p,o,t.Q.a(n),s,r|q,l.h("hN<1,2>"))
m.w=l.h("aY<1>").a(this.a.$1(new A.jt(m,l.h("jt<2>"))))
m.x=this.b.bv(m.gmF(),m.gmJ(),m.gmM())
return m},
bv(a,b,c){return this.au(a,null,b,c)}}
A.k5.prototype={$izG:1}
A.nv.prototype={
i0(a){var s,r,q
t.Q.a(a)
try{if(B.t===$.E){a.$0()
return}A.AA(null,null,this,a,t.H)}catch(q){s=A.R(q)
r=A.bt(q)
A.hW(A.ap(s),t.l.a(r))}},
i2(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.t===$.E){a.$1(b)
return}A.AC(null,null,this,a,b,t.H,c)}catch(q){s=A.R(q)
r=A.bt(q)
A.hW(A.ap(s),t.l.a(r))}},
rg(a,b,c,d,e){var s,r,q
d.h("@<0>").H(e).h("~(1,2)").a(a)
d.a(b)
e.a(c)
try{if(B.t===$.E){a.$2(b,c)
return}A.AB(null,null,this,a,b,c,t.H,d,e)}catch(q){s=A.R(q)
r=A.bt(q)
A.hW(A.ap(s),t.l.a(r))}},
ho(a){return new A.vZ(this,t.Q.a(a))},
pu(a,b){return new A.w_(this,b.h("~(0)").a(a),b)},
i_(a,b){b.h("0()").a(a)
if($.E===B.t)return a.$0()
return A.AA(null,null,this,a,b)},
i1(a,b,c,d){c.h("@<0>").H(d).h("1(2)").a(a)
d.a(b)
if($.E===B.t)return a.$1(b)
return A.AC(null,null,this,a,b,c,d)},
rf(a,b,c,d,e,f){d.h("@<0>").H(e).H(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.E===B.t)return a.$2(b,c)
return A.AB(null,null,this,a,b,c,d,e,f)},
hW(a,b,c,d){return b.h("@<0>").H(c).H(d).h("1(2,3)").a(a)}}
A.vZ.prototype={
$0(){return this.a.i0(this.b)},
$S:0}
A.w_.prototype={
$1(a){var s=this.c
return this.a.i2(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.wt.prototype={
$0(){A.Dk(this.a,this.b)},
$S:0}
A.jv.prototype={
gn(a){return this.a},
gK(a){return this.a===0},
gZ(a){return this.a!==0},
gar(){return new A.jw(this,this.$ti.h("jw<1>"))},
ag(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.m_(a)},
m_(a){var s=this.d
if(s==null)return!1
return this.cI(this.iN(s,a),a)>=0},
k(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.zM(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.zM(q,b)
return r}else return this.mz(b)},
mz(a){var s,r,q=this.d
if(q==null)return null
s=this.iN(q,a)
r=this.cI(s,a)
return r<0?null:s[r+1]},
i(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.iB(s==null?m.b=A.xZ():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.iB(r==null?m.c=A.xZ():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.xZ()
p=A.i5(b)&1073741823
o=q[p]
if(o==null){A.y_(q,p,[b,c]);++m.a
m.e=null}else{n=m.cI(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
aa(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.iC()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.k(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.d(A.aG(m))}},
iC(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.bU(i.a,null,!1,t.z)
s=i.b
r=0
if(s!=null){q=Object.getOwnPropertyNames(s)
p=q.length
for(o=0;o<p;++o){h[r]=q[o];++r}}n=i.c
if(n!=null){q=Object.getOwnPropertyNames(n)
p=q.length
for(o=0;o<p;++o){h[r]=+q[o];++r}}m=i.d
if(m!=null){q=Object.getOwnPropertyNames(m)
p=q.length
for(o=0;o<p;++o){l=m[q[o]]
k=l.length
for(j=0;j<k;j+=2){h[r]=l[j];++r}}}return i.e=h},
iB(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.y_(a,b,c)},
iN(a,b){return a[A.i5(b)&1073741823]}}
A.jy.prototype={
cI(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.jw.prototype={
gn(a){return this.a.a},
gK(a){return this.a.a===0},
gZ(a){return this.a.a!==0},
gJ(a){var s=this.a
return new A.jx(s,s.iC(),this.$ti.h("jx<1>"))},
t(a,b){return this.a.ag(b)}}
A.jx.prototype={
gA(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.d(A.aG(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$ia8:1}
A.jC.prototype={
k(a,b){if(!this.y.$1(b))return null
return this.l8(b)},
i(a,b,c){var s=this.$ti
this.la(s.c.a(b),s.y[1].a(c))},
ag(a){if(!this.y.$1(a))return!1
return this.l7(a)},
a5(a,b){if(!this.y.$1(b))return null
return this.l9(b)},
cn(a){return this.x.$1(this.$ti.c.a(a))&1073741823},
co(a,b){var s,r,q,p
if(a==null)return-1
s=a.length
for(r=this.$ti.c,q=this.w,p=0;p<s;++p)if(q.$2(r.a(a[p].a),r.a(b)))return p
return-1}}
A.vR.prototype={
$1(a){return this.a.b(a)},
$S:20}
A.fg.prototype={
gJ(a){var s=this,r=new A.fh(s,s.r,A.l(s).h("fh<1>"))
r.c=s.e
return r},
gn(a){return this.a},
gK(a){return this.a===0},
gZ(a){return this.a!==0},
t(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.Af.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.Af.a(r[b])!=null}else return this.lZ(b)},
lZ(a){var s=this.d
if(s==null)return!1
return this.cI(s[this.iE(a)],a)>=0},
gI(a){var s=this.e
if(s==null)throw A.d(A.aC("No elements"))
return A.l(this).c.a(s.a)},
j(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.iA(s==null?q.b=A.y0():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.iA(r==null?q.c=A.y0():r,b)}else return q.fP(b)},
fP(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.y0()
r=p.iE(a)
q=s[r]
if(q==null)s[r]=[p.fQ(a)]
else{if(p.cI(q,a)>=0)return!1
q.push(p.fQ(a))}return!0},
iA(a,b){A.l(this).c.a(b)
if(t.Af.a(a[b])!=null)return!1
a[b]=this.fQ(b)
return!0},
fQ(a){var s=this,r=new A.nq(A.l(s).c.a(a))
if(s.e==null)s.e=s.f=r
else s.f=s.f.b=r;++s.a
s.r=s.r+1&1073741823
return r},
iE(a){return J.am(a)&1073741823},
cI(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a0(a[r].a,b))return r
return-1}}
A.nq.prototype={}
A.fh.prototype={
gA(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.d(A.aG(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$ia8:1}
A.r7.prototype={
$2(a,b){this.a.i(0,this.b.a(a),this.c.a(b))},
$S:85}
A.P.prototype={
gJ(a){return new A.aI(a,this.gn(a),A.bg(a).h("aI<P.E>"))},
ad(a,b){return this.k(a,b)},
gK(a){return this.gn(a)===0},
gZ(a){return!this.gK(a)},
gI(a){if(this.gn(a)===0)throw A.d(A.ce())
return this.k(a,0)},
t(a,b){var s,r=this.gn(a)
for(s=0;s<r;++s){if(J.a0(this.k(a,s),b))return!0
if(r!==this.gn(a))throw A.d(A.aG(a))}return!1},
bX(a,b,c){var s,r,q,p=A.bg(a)
p.h("y(P.E)").a(b)
p.h("P.E()?").a(c)
s=this.gn(a)
for(r=0;r<s;++r){q=this.k(a,r)
if(b.$1(q))return q
if(s!==this.gn(a))throw A.d(A.aG(a))}p=c.$0()
return p},
S(a,b){var s
if(this.gn(a)===0)return""
s=A.tY("",a,b)
return s.charCodeAt(0)==0?s:s},
fz(a,b){var s=A.bg(a)
return new A.ae(a,s.h("y(P.E)").a(b),s.h("ae<P.E>"))},
i9(a,b){return new A.bL(a,b.h("bL<0>"))},
b8(a,b,c){var s=A.bg(a)
return new A.a2(a,s.H(c).h("1(P.E)").a(b),s.h("@<P.E>").H(c).h("a2<1,2>"))},
aS(a,b){return A.bx(a,b,null,A.bg(a).h("P.E"))},
bz(a,b){return A.bx(a,0,A.dq(b,"count",t.S),A.bg(a).h("P.E"))},
j(a,b){var s
A.bg(a).h("P.E").a(b)
s=this.gn(a)
this.sn(a,s+1)
this.i(a,s,b)},
bn(a,b){var s,r=A.bg(a)
r.h("c(P.E,P.E)?").a(b)
s=b==null?A.He():b
A.mn(a,0,this.gn(a)-1,s,r.h("P.E"))},
kL(a,b,c){A.aR(b,c,this.gn(a))
return A.bx(a,b,c,A.bg(a).h("P.E"))},
pZ(a,b,c,d){var s
A.bg(a).h("P.E?").a(d)
A.aR(b,c,this.gn(a))
for(s=b;s<c;++s)this.i(a,s,d)},
bd(a,b,c,d,e){var s,r,q,p,o
A.bg(a).h("i<P.E>").a(d)
A.aR(b,c,this.gn(a))
s=c-b
if(s===0)return
A.bq(e,"skipCount")
if(t._.b(d)){r=e
q=d}else{q=J.o9(d,e).c1(0,!1)
r=0}p=J.at(q)
if(r+s>p.gn(q))throw A.d(A.yW())
if(r<b)for(o=s-1;o>=0;--o)this.i(a,b+o,p.k(q,r+o))
else for(o=0;o<s;++o)this.i(a,b+o,p.k(q,r+o))},
l(a){return A.r_(a,"[","]")},
$iJ:1,
$ii:1,
$ik:1}
A.a1.prototype={
ak(a,b,c){var s=A.l(this)
return A.z6(this,s.h("a1.K"),s.h("a1.V"),b,c)},
aa(a,b){var s,r,q,p=A.l(this)
p.h("~(a1.K,a1.V)").a(b)
for(s=this.gar(),s=s.gJ(s),p=p.h("a1.V");s.q();){r=s.gA()
q=this.k(0,r)
b.$2(r,q==null?p.a(q):q)}},
gX(){return this.gar().b8(0,new A.rc(this),A.l(this).h("V<a1.K,a1.V>"))},
d4(a,b,c,d){var s,r,q,p,o,n=A.l(this)
n.H(c).H(d).h("V<1,2>(a1.K,a1.V)").a(b)
s=A.I(c,d)
for(r=this.gar(),r=r.gJ(r),n=n.h("a1.V");r.q();){q=r.gA()
p=this.k(0,q)
o=b.$2(q,p==null?n.a(p):p)
s.i(0,o.a,o.b)}return s},
ag(a){return this.gar().t(0,a)},
gn(a){var s=this.gar()
return s.gn(s)},
gK(a){var s=this.gar()
return s.gK(s)},
gZ(a){var s=this.gar()
return s.gZ(s)},
l(a){return A.rd(this)},
$ih:1}
A.rc.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("a1.K").a(a)
s=s.k(0,a)
if(s==null)s=r.h("a1.V").a(s)
return new A.V(a,s,r.h("V<a1.K,a1.V>"))},
$S(){return A.l(this.a).h("V<a1.K,a1.V>(a1.K)")}}
A.re.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.u(a)
r.a=(r.a+=s)+": "
s=A.u(b)
r.a+=s},
$S:35}
A.nM.prototype={}
A.iL.prototype={
ak(a,b,c){return this.a.ak(0,b,c)},
k(a,b){return this.a.k(0,b)},
aa(a,b){this.a.aa(0,A.l(this).h("~(1,2)").a(b))},
gK(a){var s=this.a
return s.gK(s)},
gZ(a){var s=this.a
return s.gZ(s)},
gn(a){var s=this.a
return s.gn(s)},
gar(){return this.a.gar()},
l(a){return this.a.l(0)},
gX(){return this.a.gX()},
d4(a,b,c,d){return this.a.d4(0,A.l(this).H(c).H(d).h("V<1,2>(3,4)").a(b),c,d)},
$ih:1}
A.f8.prototype={
ak(a,b,c){return new A.f8(this.a.ak(0,b,c),b.h("@<0>").H(c).h("f8<1,2>"))}}
A.iJ.prototype={
gJ(a){var s=this
return new A.fi(s,s.c,s.d,s.b,s.$ti.h("fi<1>"))},
gK(a){return this.b===this.c},
gn(a){return(this.c-this.b&this.a.length-1)>>>0},
gI(a){var s,r=this,q=r.b
if(q===r.c)throw A.d(A.ce())
s=r.a
if(!(q<s.length))return A.b(s,q)
q=s[q]
return q==null?r.$ti.c.a(q):q},
ad(a,b){var s,r,q=this,p=q.gn(0)
if(0>b||b>=p)A.K(A.le(b,p,q,null,"index"))
p=q.a
s=p.length
r=(q.b+b&s-1)>>>0
if(!(r>=0&&r<s))return A.b(p,r)
r=p[r]
return r==null?q.$ti.c.a(r):r},
a5(a,b){var s,r,q=this
for(s=q.b;s!==q.c;s=(s+1&q.a.length-1)>>>0){r=q.a
if(!(s>=0&&s<r.length))return A.b(r,s)
if(J.a0(r[s],b)){q.o9(s);++q.d
return!0}}return!1},
a0(a){var s=this,r=s.b
if(r!==s.c){for(;r!==s.c;r=(r+1&s.a.length-1)>>>0)B.b.i(s.a,r,null)
s.b=s.c=0;++s.d}},
l(a){return A.r_(this,"{","}")},
qL(){var s,r,q=this,p=q.b
if(p===q.c)throw A.d(A.ce());++q.d
s=q.a
if(!(p<s.length))return A.b(s,p)
r=s[p]
if(r==null)r=q.$ti.c.a(r)
B.b.i(s,p,null)
q.b=(q.b+1&q.a.length-1)>>>0
return r},
fP(a){var s,r,q,p,o=this,n=o.$ti
n.c.a(a)
B.b.i(o.a,o.c,a)
s=o.c
r=o.a.length
s=(s+1&r-1)>>>0
o.c=s
if(o.b===s){q=A.bU(r*2,null,!1,n.h("1?"))
n=o.a
s=o.b
p=n.length-s
B.b.bd(q,0,p,n,s)
B.b.bd(q,p,p+o.b,o.a,0)
o.b=0
o.c=o.a.length
o.a=q}++o.d},
o9(a){var s,r,q,p=this,o=p.a.length-1,n=p.b,m=p.c
if((a-n&o)>>>0<(m-a&o)>>>0){for(s=a;n=p.b,s!==n;s=r){r=(s-1&o)>>>0
n=p.a
if(!(r>=0&&r<n.length))return A.b(n,r)
m=n[r]
if(!(s>=0&&s<n.length))return A.b(n,s)
n[s]=m}B.b.i(p.a,n,null)
p.b=(p.b+1&o)>>>0
return(a+1&o)>>>0}else{p.c=(m-1&o)>>>0
for(s=a;n=p.c,s!==n;s=q){q=(s+1&o)>>>0
n=p.a
if(!(q>=0&&q<n.length))return A.b(n,q)
m=n[q]
if(!(s>=0&&s<n.length))return A.b(n,s)
n[s]=m}B.b.i(p.a,n,null)
return a}},
$iEw:1}
A.fi.prototype={
gA(){var s=this.e
return s==null?this.$ti.c.a(s):s},
q(){var s,r,q=this,p=q.a
if(q.c!==p.d)A.K(A.aG(p))
s=q.d
if(s===q.b){q.e=null
return!1}p=p.a
r=p.length
if(!(s<r))return A.b(p,s)
q.e=p[s]
q.d=(s+1&r-1)>>>0
return!0},
$ia8:1}
A.cR.prototype={
gK(a){return this.gn(this)===0},
gZ(a){return this.gn(this)!==0},
C(a,b){var s
A.l(this).h("i<1>").a(b)
for(s=b.gJ(b);s.q();)this.j(0,s.gA())},
b8(a,b,c){var s=A.l(this)
return new A.eu(this,s.H(c).h("1(2)").a(b),s.h("@<1>").H(c).h("eu<1,2>"))},
l(a){return A.r_(this,"{","}")},
ac(a,b){var s
A.l(this).h("y(1)").a(b)
for(s=this.gJ(this);s.q();)if(b.$1(s.gA()))return!0
return!1},
bz(a,b){return A.zv(this,b,A.l(this).c)},
aS(a,b){return A.zt(this,b,A.l(this).c)},
gI(a){var s=this.gJ(this)
if(!s.q())throw A.d(A.ce())
return s.gA()},
ad(a,b){var s,r
A.bq(b,"index")
s=this.gJ(this)
for(r=b;s.q();){if(r===0)return s.gA();--r}throw A.d(A.le(b,b-r,this,null,"index"))},
$iJ:1,
$ii:1,
$ida:1}
A.jP.prototype={}
A.nO.prototype={
j(a,b){this.$ti.c.a(b)
return A.FY()}}
A.jd.prototype={
t(a,b){return this.a.t(0,b)},
gn(a){return this.a.a},
gJ(a){var s=this.a
return A.FC(s,s.r,A.l(s).c)}}
A.k_.prototype={}
A.k0.prototype={}
A.nm.prototype={
k(a,b){var s,r=this.b
if(r==null)return this.c.k(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.o1(b):s}},
gn(a){return this.b==null?this.c.a:this.em().length},
gK(a){return this.gn(0)===0},
gZ(a){return this.gn(0)>0},
gar(){if(this.b==null){var s=this.c
return new A.d5(s,A.l(s).h("d5<1>"))}return new A.nn(this)},
ag(a){if(this.b==null)return this.c.ag(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
aa(a,b){var s,r,q,p,o=this
t.m1.a(b)
if(o.b==null)return o.c.aa(0,b)
s=o.em()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.wi(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.d(A.aG(o))}},
em(){var s=t.jS.a(this.c)
if(s==null)s=this.c=A.e(Object.keys(this.a),t.s)
return s},
o1(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.wi(this.a[a])
return this.b[a]=s}}
A.nn.prototype={
gn(a){return this.a.gn(0)},
ad(a,b){var s=this.a
if(s.b==null)s=s.gar().ad(0,b)
else{s=s.em()
if(!(b>=0&&b<s.length))return A.b(s,b)
s=s[b]}return s},
gJ(a){var s=this.a
if(s.b==null){s=s.gar()
s=s.gJ(s)}else{s=s.em()
s=new J.ea(s,s.length,A.U(s).h("ea<1>"))}return s},
t(a,b){return this.a.ag(b)}}
A.nk.prototype={
p(){var s,r,q,p=this
p.lg()
s=p.a
r=s.a
s.a=""
s=p.c
q=s.a
q.aC(s.$ti.c.a(A.Ax(r.charCodeAt(0)==0?r:r,p.b)))
q.aH()}}
A.w9.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:47}
A.w8.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:47}
A.kr.prototype={
gT(){return"us-ascii"},
cX(a){return B.f8.Y(a)},
b5(a){var s
t.L.a(a)
s=B.cC.Y(a)
return s},
gdP(){return B.cC}}
A.nK.prototype={
Y(a){var s,r,q,p,o,n
A.r(a)
s=a.length
r=A.aR(0,null,s)
q=new Uint8Array(r)
for(p=~this.a,o=0;o<r;++o){if(!(o<s))return A.b(a,o)
n=a.charCodeAt(o)
if((n&p)!==0)throw A.d(A.cY(a,"string","Contains invalid characters."))
if(!(o<r))return A.b(q,o)
q[o]=n}return q},
bo(a){t.vK.a(a)
return new A.nL(new A.jo(a),this.a)}}
A.kt.prototype={}
A.nL.prototype={
p(){this.a.a.a.aH()},
aB(a,b,c,d){var s,r,q,p,o,n=a.length
A.aR(b,c,n)
for(s=~this.b,r=b;r<c;++r){if(!(r<n))return A.b(a,r)
q=a.charCodeAt(r)
if((q&s)!==0)throw A.d(A.as("Source contains invalid character with code point: "+q+".",null))}n=new A.cu(a)
p=n.gn(0)
A.aR(b,c,p)
n=A.N(n.kL(n,b,c),t.I.h("P.E"))
s=this.a.a
o=s.a
o.aC(s.$ti.c.a(t.L.a(n)))
if(d)o.aH()}}
A.nJ.prototype={
Y(a){var s,r,q,p,o
t.L.a(a)
s=a.length
r=A.aR(0,null,s)
for(q=~this.b,p=0;p<r;++p){if(!(p<s))return A.b(a,p)
o=a[p]
if((o&q)!==0){if(!this.a)throw A.d(A.an("Invalid value in input: "+o,null,null))
return this.m0(a,0,r)}}return A.c5(a,0,r)},
m0(a,b,c){var s,r,q,p,o
t.L.a(a)
for(s=~this.b,r=a.length,q=b,p="";q<c;++q){if(!(q<r))return A.b(a,q)
o=a[q]
p+=A.ak((o&s)!==0?65533:o)}return p.charCodeAt(0)==0?p:p},
cW(a){return this.il(t.xX.a(a))}}
A.ks.prototype={
bo(a){var s=new A.fo(t.u.a(a))
if(this.a)return new A.nc(new A.k4(new A.hS(!1),s,new A.T("")))
else return new A.ny(s)}}
A.nc.prototype={
p(){this.a.p()},
j(a,b){t.L.a(b)
this.aB(b,0,J.aE(b),!1)},
aB(a,b,c,d){var s,r,q,p=t.L
p.a(a)
s=J.at(a)
A.aR(b,c,s.gn(a))
for(r=this.a,q=b;q<c;++q)if((s.k(a,q)&4294967168)>>>0!==0){if(q>b)r.aB(a,b,q,!1)
p.a(B.bM)
r.aB(B.bM,0,B.bM.length,!1)
b=q+1}if(b<c)r.aB(a,b,c,!1)}}
A.ny.prototype={
p(){this.a.a.a.aH()},
j(a,b){var s,r
t.L.a(b)
for(s=J.at(b),r=0;r<s.gn(b);++r)if((s.k(b,r)&4294967168)>>>0!==0)throw A.d(A.an("Source contains non-ASCII bytes.",null,null))
s=this.a.a
s.a.aC(s.$ti.c.a(A.c5(b,0,null)))}}
A.ig.prototype={
ghy(){return B.fg},
qo(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=u.U,a1="Invalid base64 encoding length ",a2=a3.length
a5=A.aR(a4,a5,a2)
s=$.yn()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.b(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.b(a3,k)
h=A.wO(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.b(a3,g)
f=A.wO(a3.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.b(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.b(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.T("")
g=o}else g=o
g.a+=B.a.m(a3,p,q)
c=A.ak(j)
g.a+=c
p=k
continue}}throw A.d(A.an("Invalid base64 data",a3,q))}if(o!=null){a2=B.a.m(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.yB(a3,m,a5,n,l,r)
else{b=B.c.bc(r-1,4)+1
if(b===1)throw A.d(A.an(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.bI(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.yB(a3,m,a5,n,l,a)
else{b=B.c.bc(a,4)
if(b===1)throw A.d(A.an(a1,a3,a5))
if(b>1)a3=B.a.bI(a3,a5,a5,b===2?"==":"=")}return a3}}
A.ky.prototype={
Y(a){var s
t.L.a(a)
s=a.length
if(s===0)return""
s=new A.jl(u.U).k0(a,0,s,!0)
s.toString
return A.c5(s,0,null)},
bo(a){t.u.a(a)
return new A.mX(a,new A.n2(u.U))}}
A.jl.prototype={
jX(a){return new Uint8Array(a)},
k0(a,b,c,d){var s,r,q,p,o=this
t.L.a(a)
s=(o.a&3)+(c-b)
r=B.c.W(s,3)
q=r*4
if(d&&s-r*3>0)q+=4
p=o.jX(q)
o.a=A.Fq(o.b,a,b,c,d,p,0,o.a)
if(q>0)return p
return null}}
A.n2.prototype={
jX(a){var s=this.c
if(s==null||s.length<a)s=this.c=new Uint8Array(a)
return J.xt(B.H.ghp(s),s.byteOffset,a)}}
A.n1.prototype={
j(a,b){t.L.a(b)
this.iF(b,0,J.aE(b),!1)},
p(){this.iF(B.dj,0,0,!0)}}
A.mX.prototype={
iF(a,b,c,d){var s,r=this.b.k0(t.L.a(a),b,c,d)
if(r!=null){s=this.a
s.a.aC(s.$ti.c.a(A.c5(r,0,null)))}if(d)this.a.a.aH()}}
A.kx.prototype={
Y(a){var s,r,q
A.r(a)
s=A.aR(0,null,a.length)
if(0===s)return new Uint8Array(0)
r=new A.n_()
q=r.hv(a,0,s)
q.toString
r.bs(a,s)
return q},
bo(a){return new A.n0(t.vK.a(a),new A.n_())}}
A.n_.prototype={
hv(a,b,c){var s,r=this,q=r.a
if(q<0){r.a=A.zH(a,b,c,q)
return null}if(b===c)return new Uint8Array(0)
s=A.Fn(a,b,c,q)
r.a=A.Fp(a,b,c,s,0,r.a)
return s},
bs(a,b){var s=this.a
if(s<-1)throw A.d(A.an("Missing padding character",a,b))
if(s>0)throw A.d(A.an("Invalid length, must be multiple of four",a,b))
this.a=-1}}
A.n0.prototype={
j(a,b){var s,r
A.r(b)
s=b.length
if(s===0)return
r=this.b.hv(b,0,s)
if(r!=null){s=this.a
s.a.aC(s.$ti.c.a(r))}},
p(){this.b.bs(null,null)
this.a.a.aH()},
aB(a,b,c,d){var s,r,q
A.aR(b,c,a.length)
if(b===c)return
s=this.b
r=s.hv(a,b,c)
if(r!=null){q=this.a
q.a.aC(q.$ti.c.a(r))}if(d){s.bs(a,c)
this.a.a.aH()}}}
A.c_.prototype={$ia3:1}
A.jo.prototype={
j(a,b){var s=this.a
s.a.aC(s.$ti.c.a(t.L.a(b)))},
p(){this.a.a.aH()}}
A.jp.prototype={
j(a,b){var s,r,q,p,o,n=this
t.uI.a(b)
s=n.b
r=n.c
q=J.at(b)
if(q.gn(b)>s.length-r){s=n.b
p=q.gn(b)+s.length-1
p|=B.c.aT(p,1)
p|=p>>>2
p|=p>>>4
p|=p>>>8
o=new Uint8Array((((p|p>>>16)>>>0)+1)*2)
s=n.b
B.H.bK(o,0,s.length,s)
n.b=o}s=n.b
r=n.c
B.H.bK(s,r,r+q.gn(b),b)
n.c=n.c+q.gn(b)},
p(){this.a.$1(B.H.aq(this.b,0,this.c))}}
A.io.prototype={$ia3:1}
A.fc.prototype={
j(a,b){this.b.j(0,this.$ti.c.a(b))},
aJ(a,b){A.dq(a,"error",t.K)
this.a.aJ(a,b)},
p(){this.b.p()},
$iaY:1,
$ia3:1}
A.bE.prototype={}
A.a7.prototype={
bo(a){A.l(this).h("a3<a7.T>").a(a)
throw A.d(A.aw("This converter does not support chunked conversions: "+this.l(0)))},
cW(a){var s=A.l(this)
return new A.jm(new A.ps(this),s.h("aa<a7.S>").a(a),t.f9.H(s.h("a7.T")).h("jm<1,2>"))},
$ibr:1}
A.ps.prototype={
$1(a){return new A.fc(a,this.a.bo(a),t.mP)},
$S:137}
A.dz.prototype={
pJ(a){t.xX.a(a)
return this.gdP().cW(a).hC(0,new A.T(""),new A.pN(),t.f0).aZ(new A.pO(),t.N)}}
A.pN.prototype={
$2(a,b){t.f0.a(a)
a.a+=A.r(b)
return a},
$S:140}
A.pO.prototype={
$1(a){var s=t.f0.a(a).a
return s.charCodeAt(0)==0?s:s},
$S:141}
A.iF.prototype={
l(a){var s=A.l0(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.ln.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.lm.prototype={
bH(a,b){var s=A.Ax(a,this.gdP().a)
return s},
cY(a,b){var s=A.Fy(a,this.ghy().b,null)
return s},
ghy(){return B.ih},
gdP(){return B.ig}}
A.lp.prototype={
bo(a){t.u.a(a)
return new A.nl(null,this.b,new A.fo(a))}}
A.nl.prototype={
j(a,b){var s,r,q,p=this
if(p.d)throw A.d(A.aC("Only one call to add allowed"))
p.d=!0
s=p.c
r=new A.T("")
q=new A.nC(r,s)
A.zO(b,q,p.b,p.a)
if(r.a.length!==0)q.fS()
s.p()},
p(){}}
A.lo.prototype={
bo(a){return new A.nk(this.a,a,new A.T(""))}}
A.vP.prototype={
kB(a){var s,r,q,p,o,n=this,m=a.length
for(s=0,r=0;r<m;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<m&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)n.fC(a,s,r)
s=r+1
n.aj(92)
n.aj(117)
n.aj(100)
p=q>>>8&15
n.aj(p<10?48+p:87+p)
p=q>>>4&15
n.aj(p<10?48+p:87+p)
p=q&15
n.aj(p<10?48+p:87+p)}}continue}if(q<32){if(r>s)n.fC(a,s,r)
s=r+1
n.aj(92)
switch(q){case 8:n.aj(98)
break
case 9:n.aj(116)
break
case 10:n.aj(110)
break
case 12:n.aj(102)
break
case 13:n.aj(114)
break
default:n.aj(117)
n.aj(48)
n.aj(48)
p=q>>>4&15
n.aj(p<10?48+p:87+p)
p=q&15
n.aj(p<10?48+p:87+p)
break}}else if(q===34||q===92){if(r>s)n.fC(a,s,r)
s=r+1
n.aj(92)
n.aj(q)}}if(s===0)n.aO(a)
else if(s<m)n.fC(a,s,m)},
fM(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.d(new A.ln(a,null))}B.b.j(s,a)},
fB(a){var s,r,q,p,o=this
if(o.kA(a))return
o.fM(a)
try{s=o.b.$1(a)
if(!o.kA(s)){q=A.z1(a,null,o.gj6())
throw A.d(q)}q=o.a
if(0>=q.length)return A.b(q,-1)
q.pop()}catch(p){r=A.R(p)
q=A.z1(a,r,o.gj6())
throw A.d(q)}},
kA(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.ro(a)
return!0}else if(a===!0){q.aO("true")
return!0}else if(a===!1){q.aO("false")
return!0}else if(a==null){q.aO("null")
return!0}else if(typeof a=="string"){q.aO('"')
q.kB(a)
q.aO('"')
return!0}else if(t._.b(a)){q.fM(a)
q.rm(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.fM(a)
r=q.rn(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return r}else return!1},
rm(a){var s,r,q=this
q.aO("[")
s=J.at(a)
if(s.gZ(a)){q.fB(s.k(a,0))
for(r=1;r<s.gn(a);++r){q.aO(",")
q.fB(s.k(a,r))}}q.aO("]")},
rn(a){var s,r,q,p,o,n=this,m={}
if(a.gK(a)){n.aO("{}")
return!0}s=a.gn(a)*2
r=A.bU(s,null,!1,t.X)
q=m.a=0
m.b=!0
a.aa(0,new A.vQ(m,r))
if(!m.b)return!1
n.aO("{")
for(p='"';q<s;q+=2,p=',"'){n.aO(p)
n.kB(A.r(r[q]))
n.aO('":')
o=q+1
if(!(o<s))return A.b(r,o)
n.fB(r[o])}n.aO("}")
return!0}}
A.vQ.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.i(s,r.a++,a)
B.b.i(s,r.a++,b)},
$S:35}
A.vO.prototype={
gj6(){var s=this.c
return s instanceof A.T?s.l(0):null},
ro(a){this.c.de(B.p.l(a))},
aO(a){this.c.de(a)},
fC(a,b,c){this.c.de(B.a.m(a,b,c))},
aj(a){this.c.aj(a)}}
A.lu.prototype={
gT(){return"iso-8859-1"},
cX(a){return B.iL.Y(a)},
b5(a){var s
t.L.a(a)
s=B.da.Y(a)
return s},
gdP(){return B.da}}
A.lw.prototype={}
A.lv.prototype={
bo(a){var s=new A.fo(t.u.a(a))
if(!this.a)return new A.jA(s)
return new A.np(s)}}
A.jA.prototype={
p(){this.a.a.a.aH()
this.a=null},
j(a,b){t.L.a(b)
this.aB(b,0,J.aE(b),!1)},
ir(a,b,c,d){var s
t.L.a(a)
s=this.a
s.toString
s=s.a
s.a.aC(s.$ti.c.a(A.c5(a,b,c)))},
aB(a,b,c,d){t.L.a(a)
A.aR(b,c,J.aE(a))
if(b===c)return
if(!t.p.b(a))A.Fz(a,b,c)
this.ir(a,b,c,!1)}}
A.np.prototype={
aB(a,b,c,d){var s,r,q,p,o,n="Stream is already closed",m=t.L
m.a(a)
s=J.at(a)
A.aR(b,c,s.gn(a))
for(r=b;r<c;++r){q=s.k(a,r)
if(q>255||q<0){if(r>b){p=this.a
p.toString
p=p.a
o=p.a
p=o.$ti.y[1].a(p.$ti.c.a(A.c5(a,b,r)))
if((o.e&2)!==0)A.K(A.aC(n))
o.eh(p)}m.a(B.dd)
p=this.a
p.toString
p=p.a
o=p.a
p=o.$ti.y[1].a(p.$ti.c.a(A.c5(B.dd,0,1)))
if((o.e&2)!==0)A.K(A.aC(n))
o.eh(p)
b=r+1}}if(b<c)this.ir(a,b,c,!1)}}
A.lz.prototype={
Y(a){var s,r,q,p,o=A.e([],t.s),n=a.length
for(s=0,r=0,q=0;q<n;++q,r=p){p=a.charCodeAt(q)
if(p!==13){if(p!==10)continue
if(r===13){s=q+1
continue}}B.b.j(o,B.a.m(a,s,q))
s=q+1}if(s<n)B.b.j(o,B.a.m(a,s,n))
return o}}
A.cA.prototype={
j(a,b){A.r(b)
this.aB(b,0,b.length,!1)},
$ia3:1}
A.nC.prototype={
aj(a){var s=this.a,r=A.ak(a)
if((s.a+=r).length>16)this.fS()},
de(a){if(this.a.a.length!==0)this.fS()
this.b.j(0,a)},
fS(){var s=this.a,r=s.a
s.a=""
this.b.j(0,r.charCodeAt(0)==0?r:r)},
$ixU:1}
A.fp.prototype={
p(){},
aB(a,b,c,d){var s,r,q,p
if(b!==0||c!==a.length)for(s=this.a,r=a.length,q=b;q<c;++q){if(!(q<r))return A.b(a,q)
p=A.ak(a.charCodeAt(q))
s.a+=p}else this.a.a+=a
if(d)this.p()},
j(a,b){this.a.a+=A.r(b)}}
A.fo.prototype={
j(a,b){var s=this.a
s.a.aC(s.$ti.c.a(A.r(b)))},
aB(a,b,c,d){var s=b===0&&c===a.length,r=this.a,q=r.$ti
r=r.a
if(s)r.aC(q.c.a(a))
else r.aC(q.c.a(B.a.m(a,b,c)))
if(d)r.aH()},
p(){this.a.a.aH()}}
A.k4.prototype={
p(){var s,r,q,p=this.c
this.a.q0(p)
s=p.a
r=this.b
if(s.length!==0){q=s.charCodeAt(0)==0?s:s
p.a=""
r.aB(q,0,q.length,!0)}else r.p()},
j(a,b){t.L.a(b)
this.aB(b,0,J.aE(b),!1)},
aB(a,b,c,d){var s,r=this.c,q=this.a.fT(t.L.a(a),b,c,!1)
q=r.a+=q
if(q.length!==0){s=q.charCodeAt(0)==0?q:q
this.b.aB(s,0,s.length,!1)
r.a=""
return}}}
A.mJ.prototype={
gT(){return"utf-8"},
aK(a,b){t.L.a(a)
return(b===!0?B.pN:B.en).Y(a)},
b5(a){return this.aK(a,null)},
cX(a){return B.r.Y(a)},
gdP(){return B.en}}
A.mK.prototype={
Y(a){var s,r,q,p,o
A.r(a)
s=a.length
r=A.aR(0,null,s)
if(r===0)return new Uint8Array(0)
q=new Uint8Array(r*3)
p=new A.nQ(q)
if(p.iJ(a,0,r)!==r){o=r-1
if(!(o>=0&&o<s))return A.b(a,o)
p.eZ()}return B.H.aq(q,0,p.b)},
bo(a){t.vK.a(a)
return new A.nR(new A.jo(a),new Uint8Array(1024))}}
A.nQ.prototype={
eZ(){var s,r=this,q=r.c,p=r.b,o=r.b=p+1
q.$flags&2&&A.ai(q)
s=q.length
if(!(p<s))return A.b(q,p)
q[p]=239
p=r.b=o+1
if(!(o<s))return A.b(q,o)
q[o]=191
r.b=p+1
if(!(p<s))return A.b(q,p)
q[p]=189},
jM(a,b){var s,r,q,p,o,n=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=n.c
q=n.b
p=n.b=q+1
r.$flags&2&&A.ai(r)
o=r.length
if(!(q<o))return A.b(r,q)
r[q]=s>>>18|240
q=n.b=p+1
if(!(p<o))return A.b(r,p)
r[p]=s>>>12&63|128
p=n.b=q+1
if(!(q<o))return A.b(r,q)
r[q]=s>>>6&63|128
n.b=p+1
if(!(p<o))return A.b(r,p)
r[p]=s&63|128
return!0}else{n.eZ()
return!1}},
iJ(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c){s=c-1
if(!(s>=0&&s<a.length))return A.b(a,s)
s=(a.charCodeAt(s)&64512)===55296}else s=!1
if(s)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=a.length,o=b;o<c;++o){if(!(o<p))return A.b(a,o)
n=a.charCodeAt(o)
if(n<=127){m=k.b
if(m>=q)break
k.b=m+1
r&2&&A.ai(s)
s[m]=n}else{m=n&64512
if(m===55296){if(k.b+4>q)break
m=o+1
if(!(m<p))return A.b(a,m)
if(k.jM(n,a.charCodeAt(m)))o=m}else if(m===56320){if(k.b+3>q)break
k.eZ()}else if(n<=2047){m=k.b
l=m+1
if(l>=q)break
k.b=l
r&2&&A.ai(s)
if(!(m<q))return A.b(s,m)
s[m]=n>>>6|192
k.b=l+1
s[l]=n&63|128}else{m=k.b
if(m+2>=q)break
l=k.b=m+1
r&2&&A.ai(s)
if(!(m<q))return A.b(s,m)
s[m]=n>>>12|224
m=k.b=l+1
if(!(l<q))return A.b(s,l)
s[l]=n>>>6&63|128
k.b=m+1
if(!(m<q))return A.b(s,m)
s[m]=n&63|128}}}return o}}
A.nR.prototype={
p(){if(this.a!==0){this.aB("",0,0,!0)
return}this.d.a.a.aH()},
aB(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=this
j.b=0
s=b===c
if(s&&!d)return
r=j.a
if(r!==0){if(!s){if(!(b<a.length))return A.b(a,b)
q=a.charCodeAt(b)}else q=0
if(j.jM(r,q))++b
j.a=0}s=j.d
r=j.c
p=t.L
o=c-1
n=a.length
m=r.length-3
do{b=j.iJ(a,b,c)
l=d&&b===c
if(b===o){if(!(b<n))return A.b(a,b)
k=(a.charCodeAt(b)&64512)===55296}else k=!1
if(k){if(d&&j.b<m)j.eZ()
else{if(!(b<n))return A.b(a,b)
j.a=a.charCodeAt(b)}++b}k=j.b
s.j(0,B.H.aq(p.a(r),0,k))
if(l)s.p()
j.b=0}while(b<c)
if(d)j.p()},
$ia3:1}
A.jf.prototype={
Y(a){return new A.hS(this.a).fT(t.L.a(a),0,null,!0)},
bo(a){t.u.a(a)
return new A.k4(new A.hS(this.a),new A.fo(a),new A.T(""))},
cW(a){return this.il(t.xX.a(a))}}
A.hS.prototype={
fT(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.aR(b,c,J.aE(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.G6(a,b,s)
s-=b
p=b
b=0}if(d&&s-b>=15){o=l.a
n=A.G5(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.fV(q,b,s,d)
o=l.b
if((o&1)!==0){m=A.Ae(o)
l.b=0
throw A.d(A.an(m,a,p+l.c))}return n},
fV(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.W(b+c,2)
r=q.fV(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.fV(a,s,c,d)}return q.pI(a,b,c,d)},
q0(a){var s,r=this.b
this.b=0
if(r<=32)return
if(this.a){s=A.ak(65533)
a.a+=s}else throw A.d(A.an(A.Ae(77),null,null))},
pI(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.T(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.b(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.b(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.b(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.ak(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.ak(h)
e.a+=p
break
case 65:p=A.ak(h)
e.a+=p;--d
break
default:p=A.ak(h)
e.a=(e.a+=p)+p
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break A
o=d+1
if(!(d>=0&&d<c))return A.b(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.b(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.b(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.b(a,l)
p=A.ak(a[l])
e.a+=p}else{p=A.c5(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.ak(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.nU.prototype={}
A.bk.prototype={
dR(a){return A.it(0,0,this.b-a.b,this.a-a.a,0,0)},
L(a,b){if(b==null)return!1
return b instanceof A.bk&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gE(a){return A.bo(this.a,this.b,B.f,B.f,B.f,B.f,B.f)},
a3(a,b){var s
t.f7.a(b)
s=B.c.a3(this.a,b.a)
if(s!==0)return s
return B.c.a3(this.b,b.b)},
ri(){var s=this
if(s.c)return new A.bk(s.a,s.b,!1)
return s},
av(){var s=this
if(s.c)return s
return new A.bk(s.a,s.b,!0)},
l(a){var s=this,r=A.yO(A.m4(s)),q=A.cZ(A.zj(s)),p=A.cZ(A.zf(s)),o=A.cZ(A.zg(s)),n=A.cZ(A.zi(s)),m=A.cZ(A.zk(s)),l=A.pz(A.zh(s)),k=s.b,j=k===0?"":A.pz(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
b_(){var s=this,r=A.m4(s)>=-9999&&A.m4(s)<=9999?A.yO(A.m4(s)):A.D4(A.m4(s)),q=A.cZ(A.zj(s)),p=A.cZ(A.zf(s)),o=A.cZ(A.zg(s)),n=A.cZ(A.zi(s)),m=A.cZ(A.zk(s)),l=A.pz(A.zh(s)),k=s.b,j=k===0?"":A.pz(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j},
$iaK:1}
A.pA.prototype={
$1(a){if(a==null)return 0
return A.fs(a)},
$S:28}
A.pB.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.b(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:28}
A.aX.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.aX&&this.a===b.a},
gE(a){return B.c.gE(this.a)},
a3(a,b){return B.c.a3(this.a,t.ya.a(b).a)},
l(a){var s,r,q,p,o,n=this.a,m=B.c.W(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.c.W(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.c.W(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.d5(B.c.l(n%1e6),6,"0")},
$iaK:1}
A.vo.prototype={
l(a){return this.R()}}
A.au.prototype={
gdj(){return A.Eq(this)}}
A.ku.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.l0(s)
return"Assertion failed"}}
A.dd.prototype={}
A.cs.prototype={
gfY(){return"Invalid argument"+(!this.a?"(s)":"")},
gfX(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.u(p),n=s.gfY()+q+o
if(!s.a)return n
return n+s.gfX()+": "+A.l0(s.ghL())},
ghL(){return this.b}}
A.hl.prototype={
ghL(){return A.Ai(this.b)},
gfY(){return"RangeError"},
gfX(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.u(q):""
else if(q==null)s=": Not greater than or equal to "+A.u(r)
else if(q>r)s=": Not in inclusive range "+A.u(r)+".."+A.u(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.u(r)
return s}}
A.ld.prototype={
ghL(){return A.a4(this.b)},
gfY(){return"RangeError"},
gfX(){if(A.a4(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gn(a){return this.f}}
A.je.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.mF.prototype={
l(a){return"UnimplementedError: "+this.a}}
A.bX.prototype={
l(a){return"Bad state: "+this.a}}
A.kM.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.l0(s)+"."}}
A.lU.prototype={
l(a){return"Out of Memory"},
gdj(){return null},
$iau:1}
A.j9.prototype={
l(a){return"Stack Overflow"},
gdj(){return null},
$iau:1}
A.nd.prototype={
l(a){return"Exception: "+this.a},
$iaf:1}
A.bG.prototype={
l(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.a.m(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.b(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.b(e,n)
m=e.charCodeAt(n)
if(m===10||m===13){r=n
break}}l=""
if(r-p>78){k="..."
if(f-p<75){j=p+75
i=p}else{if(r-f<75){i=r-75
j=r
k=""}else{i=f-36
j=f+36}l="..."}}else{j=r
i=p
k=""}return g+l+B.a.m(e,i,j)+k+"\n"+B.a.aQ(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.u(f)+")"):g},
$iaf:1,
ghO(){return this.a},
geg(){return this.b},
gan(){return this.c}}
A.i.prototype={
b8(a,b,c){var s=A.l(this)
return A.d6(this,s.H(c).h("1(i.E)").a(b),s.h("i.E"),c)},
fz(a,b){var s=A.l(this)
return new A.ae(this,s.h("y(i.E)").a(b),s.h("ae<i.E>"))},
i9(a,b){return new A.bL(this,b.h("bL<0>"))},
t(a,b){var s
for(s=this.gJ(this);s.q();)if(J.a0(s.gA(),b))return!0
return!1},
S(a,b){var s,r,q=this.gJ(this)
if(!q.q())return""
s=J.b9(q.gA())
if(!q.q())return s
if(b.length===0){r=s
do r+=J.b9(q.gA())
while(q.q())}else{r=s
do r=r+b+J.b9(q.gA())
while(q.q())}return r.charCodeAt(0)==0?r:r},
c1(a,b){var s=A.l(this).h("i.E")
if(b)s=A.N(this,s)
else{s=A.N(this,s)
s.$flags=1
s=s}return s},
fu(a){return this.c1(0,!0)},
gn(a){var s,r=this.gJ(this)
for(s=0;r.q();)++s
return s},
gK(a){return!this.gJ(this).q()},
gZ(a){return!this.gK(this)},
bz(a,b){return A.zv(this,b,A.l(this).h("i.E"))},
aS(a,b){return A.zt(this,b,A.l(this).h("i.E"))},
gI(a){var s=this.gJ(this)
if(!s.q())throw A.d(A.ce())
return s.gA()},
bX(a,b,c){var s,r=A.l(this)
r.h("y(i.E)").a(b)
r.h("i.E()?").a(c)
for(r=this.gJ(this);r.q();){s=r.gA()
if(b.$1(s))return s}r=c.$0()
return r},
ad(a,b){var s,r
A.bq(b,"index")
s=this.gJ(this)
for(r=b;s.q();){if(r===0)return s.gA();--r}throw A.d(A.le(b,b-r,this,null,"index"))},
l(a){return A.DC(this,"(",")")}}
A.V.prototype={
l(a){return"MapEntry("+A.u(this.a)+": "+A.u(this.b)+")"}}
A.ab.prototype={
gE(a){return A.x.prototype.gE.call(this,0)},
l(a){return"null"}}
A.x.prototype={$ix:1,
L(a,b){return this===b},
gE(a){return A.dI(this)},
l(a){return"Instance of '"+A.m5(this)+"'"},
gai(a){return A.o1(this)},
toString(){return this.l(this)}}
A.nD.prototype={
l(a){return""},
$ibW:1}
A.hu.prototype={
gpR(){var s=this.gk_()
if($.i7()===1e6)return s
return s*1000},
ghx(){var s=this.gk_()
if($.i7()===1000)return s
return B.c.W(s,1000)},
b1(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hj.$0()-r)
s.b=null}},
gk_(){var s=this.b
if(s==null)s=$.hj.$0()
return s-this.a}}
A.ch.prototype={
gJ(a){return new A.ho(this.a)}}
A.ho.prototype={
gA(){return this.d},
q(){var s,r,q,p=this,o=p.b=p.c,n=p.a,m=n.length
if(o===m){p.d=-1
return!1}if(!(o<m))return A.b(n,o)
s=n.charCodeAt(o)
r=o+1
if((s&64512)===55296&&r<m){if(!(r<m))return A.b(n,r)
q=n.charCodeAt(r)
if((q&64512)===56320){p.c=r+1
p.d=A.Gh(s,q)
return!0}}p.c=r
p.d=s
return!0},
$ia8:1}
A.T.prototype={
gn(a){return this.a.length},
de(a){var s=A.u(a)
this.a+=s},
aj(a){var s=A.ak(a)
this.a+=s},
kC(a){var s=A.u(a)+"\n"
this.a+=s},
rq(){return this.kC("")},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ixU:1}
A.uT.prototype={
$2(a,b){throw A.d(A.an("Illegal IPv6 address, "+a,this.a,b))},
$S:63}
A.k1.prototype={
gjx(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.u(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gqB(){var s,r,q,p=this,o=p.x
if(o===$){s=p.e
r=s.length
if(r!==0){if(0>=r)return A.b(s,0)
r=s.charCodeAt(0)===47}else r=!1
if(r)s=B.a.D(s,1)
q=s.length===0?B.G:A.cO(new A.a2(A.e(s.split("/"),t.s),t.cz.a(A.Im()),t.nf),t.N)
p.x!==$&&A.i6("pathSegments")
o=p.x=q}return o},
gE(a){var s,r=this,q=r.y
if(q===$){s=B.a.gE(r.gjx())
r.y!==$&&A.i6("hashCode")
r.y=s
q=s}return q},
gi8(){return this.b},
gbj(){var s=this.c
if(s==null)return""
if(B.a.u(s,"[")&&!B.a.a6(s,"v",1))return B.a.m(s,1,s.length-1)
return s},
ge4(){var s=this.d
return s==null?A.A2(this.a):s},
ge5(){var s=this.f
return s==null?"":s},
gfc(){var s=this.r
return s==null?"":s},
fi(a){var s=this.a
if(a.length!==s.length)return!1
return A.Al(a,s,0)>=0},
hY(a){var s,r,q,p,o,n,m,l=this
a=A.y4(a,0,a.length)
s=a==="file"
r=l.b
q=l.d
if(a!==l.a)q=A.w6(q,a)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.u(o,"/"))o="/"+o
m=o
return A.k2(a,r,p,q,m,l.f,l.r)},
iW(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.a6(b,"../",r);){r+=3;++s}q=B.a.aY(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.fj(a,"/",q-1)
if(o<0)break
n=q-o
m=n!==2
l=!1
if(!m||n===3){k=o+1
if(!(k<p))return A.b(a,k)
if(a.charCodeAt(k)===46)if(m){m=o+2
if(!(m<p))return A.b(a,m)
m=a.charCodeAt(m)===46}else m=!0
else m=l}else m=l
if(m)break;--s
q=o}return B.a.bI(a,q+1,null,B.a.D(b,r-3*s))},
ku(a){return this.eb(A.hC(a))},
eb(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaG().length!==0)return a
else{s=h.a
if(a.ghF()){r=a.hY(s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gk9())m=a.gfe()?a.ge5():h.f
else{l=A.G4(h,n)
if(l>0){k=B.a.m(n,0,l)
n=a.ghE()?k+A.fq(a.gb9()):k+A.fq(h.iW(B.a.D(n,k.length),a.gb9()))}else if(a.ghE())n=A.fq(a.gb9())
else if(n.length===0)if(p==null)n=s.length===0?a.gb9():A.fq(a.gb9())
else n=A.fq("/"+a.gb9())
else{j=h.iW(n,a.gb9())
r=s.length===0
if(!r||p!=null||B.a.u(n,"/"))n=A.fq(j)
else n=A.y6(j,!r||p!=null)}m=a.gfe()?a.ge5():null}}}i=a.ghG()?a.gfc():null
return A.k2(s,q,p,o,n,m,i)},
ghF(){return this.c!=null},
gfe(){return this.f!=null},
ghG(){return this.r!=null},
gk9(){return this.e.length===0},
ghE(){return B.a.u(this.e,"/")},
i3(){var s,r=this,q=r.a
if(q!==""&&q!=="file")throw A.d(A.aw("Cannot extract a file path from a "+q+" URI"))
q=r.f
if((q==null?"":q)!=="")throw A.d(A.aw(u.z))
q=r.r
if((q==null?"":q)!=="")throw A.d(A.aw(u.A))
if(r.c!=null&&r.gbj()!=="")A.K(A.aw(u.Q))
s=r.gqB()
A.G_(s,!1)
q=A.tY(B.a.u(r.e,"/")?"/":"",s,"/")
q=q.charCodeAt(0)==0?q:q
return q},
l(a){return this.gjx()},
L(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.eP.b(b))if(p.a===b.gaG())if(p.c!=null===b.ghF())if(p.b===b.gi8())if(p.gbj()===b.gbj())if(p.ge4()===b.ge4())if(p.e===b.gb9()){r=p.f
q=r==null
if(!q===b.gfe()){if(q)r=""
if(r===b.ge5()){r=p.r
q=r==null
if(!q===b.ghG()){s=q?"":r
s=s===b.gfc()}}}}return s},
$ihB:1,
gaG(){return this.a},
gb9(){return this.e}}
A.uS.prototype={
gkz(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.b(m,0)
s=o.a
m=m[0]+1
r=B.a.a_(s,"?",m)
q=s.length
if(r>=0){p=A.k3(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.n8("data","",n,n,A.k3(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.b(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.cm.prototype={
ghF(){return this.c>0},
ghH(){return this.c>0&&this.d+1<this.e},
gfe(){return this.f<this.r},
ghG(){return this.r<this.a.length},
ghE(){return B.a.a6(this.a,"/",this.e)},
gk9(){return this.e===this.f},
fi(a){var s=a.length
if(s===0)return this.b<0
if(s!==this.b)return!1
return A.Al(a,this.a,0)>=0},
gaG(){var s=this.w
return s==null?this.w=this.lX():s},
lX(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.u(r.a,"http"))return"http"
if(q===5&&B.a.u(r.a,"https"))return"https"
if(s&&B.a.u(r.a,"file"))return"file"
if(q===7&&B.a.u(r.a,"package"))return"package"
return B.a.m(r.a,0,q)},
gi8(){var s=this.c,r=this.b+3
return s>r?B.a.m(this.a,r,s-1):""},
gbj(){var s=this.c
return s>0?B.a.m(this.a,s,this.d):""},
ge4(){var s,r=this
if(r.ghH())return A.fs(B.a.m(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.u(r.a,"http"))return 80
if(s===5&&B.a.u(r.a,"https"))return 443
return 0},
gb9(){return B.a.m(this.a,this.e,this.f)},
ge5(){var s=this.f,r=this.r
return s<r?B.a.m(this.a,s+1,r):""},
gfc(){var s=this.r,r=this.a
return s<r.length?B.a.D(r,s+1):""},
iR(a){var s=this.d+1
return s+a.length===this.e&&B.a.a6(this.a,a,s)},
qM(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.cm(B.a.m(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
hY(a){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
a=A.y4(a,0,a.length)
s=!(h.b===a.length&&B.a.u(h.a,a))
r=a==="file"
q=h.c
p=q>0?B.a.m(h.a,h.b+3,q):""
o=h.ghH()?h.ge4():g
if(s)o=A.w6(o,a)
q=h.c
if(q>0)n=B.a.m(h.a,q,h.d)
else n=p.length!==0||o!=null||r?"":g
q=h.a
m=h.f
l=B.a.m(q,h.e,m)
if(!r)k=n!=null&&l.length!==0
else k=!0
if(k&&!B.a.u(l,"/"))l="/"+l
k=h.r
j=m<k?B.a.m(q,m+1,k):g
m=h.r
i=m<q.length?B.a.D(q,m+1):g
return A.k2(a,p,n,o,l,j,i)},
ku(a){return this.eb(A.hC(a))},
eb(a){if(a instanceof A.cm)return this.oN(this,a)
return this.jz().eb(a)},
oN(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.u(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.u(a.a,"http"))p=!b.iR("80")
else p=!(r===5&&B.a.u(a.a,"https"))||!b.iR("443")
if(p){o=r+1
return new A.cm(B.a.m(a.a,0,o)+B.a.D(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.jz().eb(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.cm(B.a.m(a.a,0,r)+B.a.D(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.cm(B.a.m(a.a,0,r)+B.a.D(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.qM()}s=b.a
if(B.a.a6(s,"/",n)){m=a.e
l=A.zW(this)
k=l>0?l:m
o=k-n
return new A.cm(B.a.m(a.a,0,k)+B.a.D(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.a6(s,"../",n))n+=3
o=j-n+1
return new A.cm(B.a.m(a.a,0,j)+"/"+B.a.D(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.zW(this)
if(l>=0)g=l
else for(g=j;B.a.a6(h,"../",g);)g+=3
f=0
for(;;){e=n+3
if(!(e<=c&&B.a.a6(s,"../",n)))break;++f
n=e}for(r=h.length,d="";i>g;){--i
if(!(i>=0&&i<r))return A.b(h,i)
if(h.charCodeAt(i)===47){if(f===0){d="/"
break}--f
d="/"}}if(i===g&&a.b<=0&&!B.a.a6(h,"/",j)){n-=f*3
d=""}o=i-n+d.length
return new A.cm(B.a.m(h,0,i)+d+B.a.D(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
i3(){var s,r=this,q=r.b
if(q>=0){s=!(q===4&&B.a.u(r.a,"file"))
q=s}else q=!1
if(q)throw A.d(A.aw("Cannot extract a file path from a "+r.gaG()+" URI"))
q=r.f
s=r.a
if(q<s.length){if(q<r.r)throw A.d(A.aw(u.z))
throw A.d(A.aw(u.A))}if(r.c<r.d)A.K(A.aw(u.Q))
q=B.a.m(s,r.e,q)
return q},
gE(a){var s=this.x
return s==null?this.x=B.a.gE(this.a):s},
L(a,b){if(b==null)return!1
if(this===b)return!0
return t.eP.b(b)&&this.a===b.l(0)},
jz(){var s=this,r=null,q=s.gaG(),p=s.gi8(),o=s.c>0?s.gbj():r,n=s.ghH()?s.ge4():r,m=s.a,l=s.f,k=B.a.m(m,s.e,l),j=s.r
l=l<j?s.ge5():r
return A.k2(q,p,o,n,k,l,j<m.length?s.gfc():r)},
l(a){return this.a},
$ihB:1}
A.n8.prototype={}
A.lO.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."},
$iaf:1}
A.wX.prototype={
$1(a){var s,r,q,p
if(A.Aw(a))return a
s=this.a
if(s.ag(a))return s.k(0,a)
if(t.f.b(a)){r={}
s.i(0,a,r)
for(s=a.gar(),s=s.gJ(s);s.q();){q=s.gA()
r[q]=this.$1(a.k(0,q))}return r}else if(t.tY.b(a)){p=[]
s.i(0,a,p)
B.b.C(p,J.o8(a,this,t.z))
return p}else return a},
$S:65}
A.x0.prototype={
$1(a){return this.a.V(this.b.h("0/?").a(a))},
$S:10}
A.x1.prototype={
$1(a){if(a==null)return this.a.a7(new A.lO(a===undefined))
return this.a.a7(a)},
$S:10}
A.vM.prototype={
lw(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.d(A.aw("No source of cryptographically secure random numbers available."))},
qn(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.d(A.b7("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.ai(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.a4(Math.pow(256,s))
for(o=a-1,n=(a&o)>>>0===0;;){crypto.getRandomValues(J.xt(B.lk.ghp(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.d_.prototype={
j(a,b){this.a.j(0,A.l(this).h("d_.T").a(b))},
aJ(a,b){this.a.aJ(a,b)},
p(){return this.a.p()},
$iaY:1,
$ick:1,
$ia3:1}
A.j7.prototype={
cW(a){var s,r,q=this.$ti
q.h("aa<1>").a(a)
s=A.vl("subscription")
r=A.ci(new A.tI(s),null,!0,q.y[1])
s.b=a.bv(new A.tJ(this,r),r.gdM(),r.gjN())
return new A.ac(r,A.l(r).h("ac<1>"))}}
A.tI.prototype={
$0(){return this.a.cb().U()},
$S:3}
A.tJ.prototype={
$1(a){var s,r,q,p=this.a.$ti
p.c.a(a)
try{this.b.j(0,p.y[1].a(a))}catch(q){p=A.R(q)
if(t.bs.b(p)){s=p
r=A.bt(q)
this.b.aJ(s,r)}else throw q}},
$S(){return this.a.$ti.h("~(1)")}}
A.S.prototype={
k(a,b){var s,r=this
if(!r.h3(b))return null
s=r.c.k(0,r.a.$1(r.$ti.h("S.K").a(b)))
return s==null?null:s.b},
i(a,b,c){var s=this,r=s.$ti
r.h("S.K").a(b)
r.h("S.V").a(c)
if(!s.h3(b))return
s.c.i(0,s.a.$1(b),new A.V(b,c,r.h("V<S.K,S.V>")))},
C(a,b){this.$ti.h("h<S.K,S.V>").a(b).aa(0,new A.oR(this))},
ak(a,b,c){return this.c.ak(0,b,c)},
ag(a){var s=this
if(!s.h3(a))return!1
return s.c.ag(s.a.$1(s.$ti.h("S.K").a(a)))},
gX(){var s=this.c,r=A.l(s).h("d4<1,2>"),q=this.$ti.h("V<S.K,S.V>")
return A.d6(new A.d4(s,r),r.H(q).h("1(i.E)").a(new A.oS(this)),r.h("i.E"),q)},
aa(a,b){this.c.aa(0,new A.oT(this,this.$ti.h("~(S.K,S.V)").a(b)))},
gK(a){return this.c.a===0},
gZ(a){return this.c.a!==0},
gar(){var s=this.c,r=A.l(s).h("c2<2>"),q=this.$ti.h("S.K")
return A.d6(new A.c2(s,r),r.H(q).h("1(i.E)").a(new A.oU(this)),r.h("i.E"),q)},
gn(a){return this.c.a},
d4(a,b,c,d){return this.c.d4(0,new A.oV(this,this.$ti.H(c).H(d).h("V<1,2>(S.K,S.V)").a(b),c,d),c,d)},
l(a){return A.rd(this)},
h3(a){return this.$ti.h("S.K").b(a)},
$ih:1}
A.oR.prototype={
$2(a,b){var s=this.a,r=s.$ti
r.h("S.K").a(a)
r.h("S.V").a(b)
s.i(0,a,b)
return b},
$S(){return this.a.$ti.h("~(S.K,S.V)")}}
A.oS.prototype={
$1(a){var s=this.a.$ti,r=s.h("V<S.C,V<S.K,S.V>>").a(a).b
return new A.V(r.a,r.b,s.h("V<S.K,S.V>"))},
$S(){return this.a.$ti.h("V<S.K,S.V>(V<S.C,V<S.K,S.V>>)")}}
A.oT.prototype={
$2(a,b){var s=this.a.$ti
s.h("S.C").a(a)
s.h("V<S.K,S.V>").a(b)
return this.b.$2(b.a,b.b)},
$S(){return this.a.$ti.h("~(S.C,V<S.K,S.V>)")}}
A.oU.prototype={
$1(a){return this.a.$ti.h("V<S.K,S.V>").a(a).a},
$S(){return this.a.$ti.h("S.K(V<S.K,S.V>)")}}
A.oV.prototype={
$2(a,b){var s=this.a.$ti
s.h("S.C").a(a)
s.h("V<S.K,S.V>").a(b)
return this.b.$2(b.a,b.b)},
$S(){return this.a.$ti.H(this.c).H(this.d).h("V<1,2>(S.C,V<S.K,S.V>)")}}
A.ow.prototype={
cV(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=a2.c,b=t.iX,a=J.kc(a2.gjR(),b),a0=a.$ti,a1=a0.h("bI<i.E,a>")
a=A.N(new A.bI(new A.ae(a,a0.h("y(i.E)").a(new A.ox()),a0.h("ae<i.E>")),a0.h("a(i.E)").a(new A.oy(d)),a1),a1.h("i.E"))
a.$flags=1
a=c==null
s=a?A.cN(t.i):d.c.b6(c)
a0=t.iw
if(a)r=A.cN(a0)
else{t.cp.a(s)
r=A.cN(a0)
if(s.t(0,B.y))r.j(0,B.hi)
if(s.t(0,B.a8))r.j(0,B.hj)
if(s.t(0,B.Q))r.j(0,B.hk)
if(s.t(0,B.z)||s.t(0,B.A))r.j(0,B.hl)
if(s.t(0,B.B))r.j(0,B.hm)
if(s.t(0,B.aM))r.j(0,B.hn)
a=r.a
q=s.t(0,B.F)||s.t(0,B.aN)||s.t(0,B.bw)
if(a===0&&q)r.j(0,B.hh)}for(b=J.kc(a2.gjR(),b),a=J.aN(b.a),b=b.$ti,a1=new A.fa(a,b.h("fa<1>")),p=d.a,o=d.b,n=t.a,m=t.i,l=t.s,b=b.c,k=B.e;a1.q();){j=b.a(a.gA())
i=j.a
if(i.length===0)continue
h=p.a4(i)
j=n.a(j.b)
g=new A.ez(A.cN(m),A.e([],l),B.e)
o.ek(h.toLowerCase(),j,g,0)
f=g.c
k=k.a>=f.a?k:f}b=a2.a
e=d.e.cV(new A.t8(b,c,p))
return new A.ph(b,A.zr(s,m),A.zr(r,a0),e.a,e.b)}}
A.ox.prototype={
$1(a){return t.iX.a(a).a.length!==0},
$S:67}
A.oy.prototype={
$1(a){return this.a.a.a4(t.iX.a(a).a)},
$S:68}
A.ph.prototype={
gkh(){var s=this.f.a,r=!1
if(!(s.t(0,B.y)||s.t(0,B.B)))if(!s.t(0,B.a8))if(!s.t(0,B.Q))s=!(s.t(0,B.z)||s.t(0,B.A))&&!s.t(0,B.aM)
else s=r
else s=r
else s=r
return s},
l(a){var s=this
return"CommandAnalysis(level: "+s.w.b+", capabilities: "+s.f.l(0)+", effects: "+s.r.l(0)+", findings: "+s.y.length+")"}}
A.im.prototype={
R(){return"ChainOperator."+this.b}}
A.cx.prototype={
R(){return"RedirectionType."+this.b}}
A.c0.prototype={
cA(){return new A.dV(this.rl(),t.tM)},
rl(){var s=this
return function(){var r=0,q=1,p=[],o,n,m
return function $async$cA(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:r=2
return a.b=s,1
case 2:o=s.gbr(),n=o.length,m=0
case 3:if(!(m<o.length)){r=5
break}r=6
return a.pq(o[m].cA())
case 6:case 4:o.length===n||(0,A.M)(o),++m
r=3
break
case 5:return 0
case 1:return a.c=p.at(-1),3}}}}}
A.bc.prototype={
gbr(){var s,r=this,q=A.N(r.c,t.U)
B.b.C(q,r.d)
B.b.C(q,r.e)
s=r.f
if(s!=null)q.push(s)
return q},
L(a,b){var s=this
if(b==null)return!1
return b instanceof A.bc&&b.a===s.a&&A.hU(b.b,s.b,t.N)&&A.hU(b.c,s.c,t.AX)&&A.hU(b.d,s.d,t.Dv)&&A.hU(b.e,s.e,t.u1)&&J.a0(b.f,s.f)},
gE(a){var s=this
return A.bo(s.a,A.eG(s.b),A.eG(s.c),A.eG(s.d),A.eG(s.e),s.f,B.f)},
l(a){var s,r,q,p=this,o=A.u(p.b),n=p.c
n=n.length===0?"":", redirs: "+A.u(n)
s=p.d
s=s.length===0?"":", subs: "+A.u(s)
r=p.e
r=r.length===0?"":", env: "+A.u(r)
q=p.f
q=q==null?"":", inline: "+q.l(0)
return"CommandInvocation("+p.a+", args: "+o+n+s+r+q+")"}}
A.cQ.prototype={
gbr(){return this.a},
L(a,b){if(b==null)return!1
return b instanceof A.cQ&&A.hU(b.a,this.a,t.U)},
gE(a){return A.eG(this.a)},
l(a){return"Pipeline("+A.u(this.a)+")"}}
A.bO.prototype={
gbr(){return this.a},
L(a,b){if(b==null)return!1
return b instanceof A.bO&&b.b===this.b&&A.hU(b.a,this.a,t.U)},
gE(a){return A.bo(this.b,A.eG(this.a),B.f,B.f,B.f,B.f,B.f)},
l(a){return"CommandChain("+this.b.b+", "+A.u(this.a)+")"}}
A.el.prototype={
gbr(){return this.a},
L(a,b){if(b==null)return!1
return b instanceof A.el&&A.hU(b.a,this.a,t.U)},
gE(a){return A.eG(this.a)},
l(a){return"CommandScript("+A.u(this.a)+")"}}
A.bv.prototype={
gbr(){return B.bP},
L(a,b){if(b==null)return!1
return b instanceof A.bv&&b.a===this.a&&b.b===this.b},
gE(a){return A.bo(this.a,this.b,B.f,B.f,B.f,B.f,B.f)},
l(a){return"RedirectionNode("+this.a.b+", "+this.b+")"}}
A.cK.prototype={
gbr(){return A.e([this.a],t.J)},
L(a,b){if(b==null)return!1
return b instanceof A.cK&&b.a.L(0,this.a)},
gE(a){var s=this.a
return s.gE(s)},
l(a){return"CommandSubstitution("+this.a.l(0)+")"}}
A.bR.prototype={
gbr(){return B.bP},
L(a,b){if(b==null)return!1
return b instanceof A.bR&&b.a===this.a},
gE(a){return B.a.gE(this.a)},
l(a){return"EnvironmentVariableReference("+this.a+")"}}
A.bj.prototype={
R(){return"CommandCapability."+this.b}}
A.oW.prototype={
b6(a){var s,r,q,p=A.cN(t.i)
for(s=a.cA(),r=s.$ti,s=new A.dm(s.a(),r.h("dm<1>")),r=r.c;s.q();){q=s.b
if(q==null)q=r.a(q)
if(q instanceof A.bc){this.m9(q,p)
continue}if(q instanceof A.bR){p.j(0,B.aN)
continue}if(q instanceof A.cK){p.j(0,B.Q)
continue}if(q instanceof A.bv){this.ma(q,p)
continue}if(q instanceof A.cQ||q instanceof A.bO||q instanceof A.el)continue}return p},
m9(a,b){var s
t.iX.a(a)
t.cp.a(b)
s=a.a
if(s.length===0)return
b.C(0,this.b.pr(this.a.a4(s),t.a.a(a.b)).a)},
ma(a,b){t.AX.a(a)
t.cp.a(b)
switch(a.a.a){case 0:case 1:case 4:case 5:case 7:case 8:if(!A.yI(a.b))b.j(0,B.y)
break
case 2:case 3:if(!A.yI(a.b))b.j(0,B.F)
break
case 6:break}}}
A.kJ.prototype={
pr(a,b){var s,r,q,p
t.a.a(b)
s=A.cN(t.i)
r=A.e([],t.s)
q=new A.ez(s,r,B.e)
p=this.ek(a.toLowerCase(),b,q,0)
return new A.pm(s,q.c,p,r)},
ek(a,b,c,d){var s,r,q,p,o,n,m=this
t.a.a(b)
s=m.a.k(0,a)
r=s==null
q=!r
if(q&&b.length!==0&&A.CV(s,b)){c.a.j(0,B.F)
c.cr('Informational invocation ("'+B.b.S(b," ")+'") prints metadata only.')
return d===0?s:null}if(q){c.a.C(0,t.gs.a(s.f))
q=s.r
p=c.c
c.c=p.a>=q.a?p:q
m.o5(s,b,c)}if(B.b.ac(b,A.Hh()))c.a.j(0,B.aN)
if((r?null:s.z)!=null&&d<4){o=s.z
r=o.c
if(r.gZ(r)&&B.b.ac(b,r.gci(r)))c.a.j(0,B.F)
else{n=m.ph(o,b)
if(n!=null)m.ek(n.a,n.b,c,d+1)}}return d===0?s:null},
o5(a,b,c){var s,r,q,p,o,n,m,l,k
t.a.a(b)
s=A.CU(b)
r=s==null?null:s.toLowerCase()
if(r!=null)for(s=a.x,q=s.length,p=t.gs,o=c.a,n=0;n<q;++n){m=s[n]
if(m.a.t(0,r)){o.C(0,p.a(m.b))
l=m.c
k=c.c
c.c=k.a>=l.a?k:l
c.cr(m.d)}}for(s=a.y,q=s.length,p=t.gs,o=c.a,n=0;n<q;++n){m=s[n]
if(m.a.fl(b)){o.C(0,p.a(m.b))
l=m.c
k=c.c
c.c=k.a>=l.a?k:l
c.cr(m.d)}}s=a.Q
if(s!=null)s.$2(b,c)},
ph(a,b){var s,r,q,p,o
t.a.a(b)
for(s=b.length,r=a.b,q=0;q<s;){p=b[q]
o=B.a.u(p,"-")
if(o){++q
continue}if(r&&B.a.t(p,"=")){++q
continue}break}if(q>=s)return null
return new A.wb(b[q].toLowerCase(),B.b.b2(b,q+1))}}
A.pl.prototype={
$1(a){A.r(a)
return B.bX.t(0,a)||this.a.w.t(0,a)},
$S:1}
A.wb.prototype={}
A.bm.prototype={
R(){return"KnowledgeCategory."+this.b}}
A.ej.prototype={
R(){return"CommandPlatform."+this.b}}
A.ez.prototype={
cr(a){if(a.length===0||B.b.t(this.b,a))return
B.b.j(this.b,a)}}
A.e9.prototype={}
A.l1.prototype={
fl(a){return B.b.ac(t.a.a(a),B.dO.gci(B.dO))}}
A.m3.prototype={
fl(a){return B.b.ac(t.a.a(a),new A.rQ(this))}}
A.rQ.prototype={
$1(a){return B.nA.ac(0,new A.rP(A.r(a)))},
$S:1}
A.rP.prototype={
$1(a){var s
A.r(a)
s=this.a
return s===a||B.a.u(s,a)},
$S:1}
A.dM.prototype={
fl(a){var s=this.a
return B.b.ac(t.a.a(a),s.gci(s))}}
A.cI.prototype={
fl(a){return this.a.$1(t.a.a(a))}}
A.ag.prototype={}
A.bi.prototype={}
A.jh.prototype={}
A.D.prototype={}
A.pm.prototype={
l(a){return"CommandKnowledgeResult(known: "+(this.c!=null)+", risk: "+this.b.b+", capabilities: "+this.a.l(0)+")"}}
A.kp.prototype={
gX(){var s,r=A.e([],t.j)
for(s=0;s<20;++s)r.push(new A.D(B.kM[s],B.K,B.e,B.d,B.j,B.i,null,null))
return r},
$ia6:1}
A.kL.prototype={
gX(){var s,r=A.e([],t.j)
for(s=0;s<31;++s)r.push(new A.D(B.kF[s],B.K,B.e,B.d,B.j,B.i,null,null))
return r},
$ia6:1}
A.kN.prototype={
gX(){var s,r=null,q=A.e([],t.j)
for(s=0;s<3;++s)q.push(new A.D(B.jG[s],B.X,B.e,B.d,B.jn,B.i,r,r))
for(s=0;s<2;++s)q.push(new A.D(B.k9[s],B.S,B.e,B.d,B.jK,B.i,r,r))
q.push(B.hU)
B.b.C(q,A.ah(B.j2,B.aU,B.b4,B.d,B.n))
B.b.C(q,A.ah(B.jg,B.aU,B.b4,B.d,B.n))
B.b.C(q,A.ah(B.ka,B.aU,B.K,B.d,B.n))
B.b.C(q,A.ah(B.k6,B.aU,B.E,B.d,B.n))
return q},
$ia6:1}
A.kP.prototype={
gX(){var s,r=A.e([B.hx],t.j)
for(s=0;s<2;++s)r.push(new A.D(B.jZ[s],B.K,B.e,B.d,B.j,B.j8,null,null))
B.b.C(r,A.ah(B.kP,B.d7,B.E,B.d,B.n))
B.b.C(r,A.ah(B.kb,B.d7,B.K,B.d,B.n))
r.push(B.hT)
r.push(B.hs)
r.push(B.hN)
r.push(B.hE)
return r},
$ia6:1}
A.kR.prototype={
gX(){return B.jr},
$ia6:1}
A.py.prototype={
$1(a){return!B.a.u(A.r(a),"-")},
$S:1}
A.kT.prototype={
gX(){var s,r=null,q=A.N(A.ah(B.ja,B.d8,B.T,B.d,B.n),t.Y)
for(s=0;s<2;++s)q.push(new A.D(B.jI[s],B.D,B.o,B.d,B.j,B.i,r,r))
B.b.C(q,A.ah(B.kC,B.d8,B.K,B.d,B.n))
for(s=0;s<5;++s)q.push(new A.D(B.j_[s],B.b5,B.e,B.d,B.j,B.i,r,r))
for(s=0;s<3;++s)q.push(new A.D(B.js[s],B.oi,B.e,B.d,B.j,B.i,r,r))
q.push(B.hr)
return q},
$ia6:1}
A.kW.prototype={
gX(){var s,r=null,q=A.e([],t.j)
for(s=0;s<13;++s)q.push(new A.D(B.jE[s],B.dP,B.J,B.d,B.j,B.i,r,r))
for(s=0;s<5;++s)q.push(new A.D(B.jj[s],B.dI,B.o,B.d,B.j,B.i,r,r))
q.push(new A.D("diskutil",B.dI,B.o,B.d,B.j,B.i,r,new A.pK()))
for(s=0;s<2;++s)q.push(new A.D(B.kD[s],B.b2,B.o,B.d,B.j,B.i,r,r))
q.push(B.hO)
return q},
$ia6:1}
A.pK.prototype={
$2(a,b){var s,r=B.b.bX(t.a.a(a),new A.pI(),new A.pJ()).toLowerCase()
if(B.a.u(r,"erase")||r==="reformat"||r==="zerodisk"||r==="securerase"){b.a.C(0,t.gs.a(B.dP))
s=b.c
b.c=s.a>=4?s:B.J
b.cr("Erases/reformats a disk or volume.")}},
$S:17}
A.pI.prototype={
$1(a){return!B.a.u(A.r(a),"-")},
$S:1}
A.pJ.prototype={
$0(){return""},
$S:33}
A.kY.prototype={
gX(){var s=A.N(A.ah(B.kJ,B.d9,B.K,B.d,B.n),t.Y)
B.b.C(s,A.ah(B.ju,B.d9,B.E,B.d,B.n))
return s},
$ia6:1}
A.l_.prototype={
gX(){return A.ah(B.kp,B.iJ,B.dK,B.d,B.n)},
$ia6:1}
A.l5.prototype={
gX(){var s,r=A.N(A.ah(B.jV,B.ax,B.E,B.d,B.n),t.Y)
B.b.C(r,A.ah(B.k_,B.ax,B.az,B.d,B.n))
B.b.C(r,A.ah(B.iM,B.ax,B.b2,B.d,B.n))
r.push(new A.D("dd",B.K,B.e,B.d,B.j,B.i,null,new A.pU()))
for(s=0;s<2;++s)r.push(new A.D(B.ke[s],B.oj,B.e,B.d,B.j,B.i,null,null))
r.push(B.hJ)
r.push(B.ho)
return r},
$ia6:1}
A.pU.prototype={
$2(a,b){var s
if(B.b.ac(t.a.a(a),new A.pT())){b.a.j(0,B.B)
s=b.c
b.c=s.a>=4?s:B.J
b.cr("Writes directly to a block device.")}},
$S:17}
A.pT.prototype={
$1(a){return B.a.u(A.r(a).toLowerCase(),"of=/dev/")},
$S:1}
A.l7.prototype={
gX(){return B.j1},
$ia6:1}
A.wo.prototype={
$1(a){A.Y(a)
return a!=null&&!B.a.u(a,"-")},
$S:78}
A.wp.prototype={
$0(){return null},
$S:5}
A.wq.prototype={
$1(a){A.r(a)
return a==="-f"||a==="--force"||B.a.u(a,"--force-with-lease")},
$S:1}
A.l9.prototype={
gX(){return A.ah(B.jd,B.iK,B.E,B.d,B.n)},
$ia6:1}
A.lb.prototype={
gX(){var s,r=null,q=A.e([],t.j)
for(s=0;s<3;++s)q.push(new A.D(B.kG[s],B.b3,B.e,B.d,B.ky,B.k7,r,r))
q.push(B.ht)
q.push(B.hu)
for(s=0;s<6;++s)q.push(new A.D(B.jJ[s],B.dU,B.e,B.d,B.j,B.i,r,r))
q.push(B.hG)
q.push(B.hI)
q.push(B.hL)
q.push(B.hV)
B.b.C(q,A.ah(B.jC,B.iI,B.T,B.d,B.n))
return q},
$ia6:1}
A.lE.prototype={
gX(){var s,r=A.N(A.ah(B.jW,B.ax,B.E,B.d,B.n),t.Y)
for(s=0;s<3;++s)r.push(new A.D(B.k4[s],B.E,B.e,B.d,B.j,B.dh,null,null))
r.push(B.hD)
return r},
$ia6:1}
A.lL.prototype={
gX(){var s,r=null,q=A.N(A.ah(B.jz,B.aT,B.S,B.d,B.n),t.Y)
for(s=0;s<2;++s)q.push(new A.D(B.jD[s],B.S,B.e,B.d,B.j,B.k1,r,r))
for(s=0;s<2;++s)q.push(new A.D(B.kA[s],B.dR,B.e,B.d,B.j,B.i,r,r))
for(s=0;s<2;++s)q.push(new A.D(B.kf[s],B.T,B.e,B.d,B.j,B.i,r,r))
q.push(B.hY)
for(s=0;s<3;++s)q.push(new A.D(B.jy[s],B.T,B.e,B.d,B.j,B.iZ,r,r))
for(s=0;s<21;++s)q.push(new A.D(B.kt[s],B.T,B.e,B.d,B.j,B.i,r,r))
for(s=0;s<2;++s)q.push(new A.D(B.kv[s],B.dR,B.e,B.d,B.j,B.i,r,r))
B.b.C(q,A.ah(B.jm,B.aT,B.S,B.d,B.n))
for(s=0;s<2;++s)q.push(new A.D(B.kB[s],B.T,B.e,B.d,B.j,B.i,r,r))
B.b.C(q,A.ah(B.kd,B.aT,B.T,B.d,B.n))
q.push(B.hp)
q.push(B.hC)
B.b.C(q,A.ah(B.j3,B.aT,B.oc,B.d,B.n))
q.push(B.hM)
for(s=0;s<4;++s)q.push(new A.D(B.k0[s],B.S,B.e,B.d,B.j,B.jv,r,r))
return q},
$ia6:1}
A.rl.prototype={
$1(a){A.r(a)
return a==="-d"||a==="--data"||a==="-F"||a==="--form"||a==="-T"||a==="--upload-file"||a==="--data-binary"||a==="-X"||a==="--request"},
$S:1}
A.rn.prototype={
$1(a){return!B.a.u(A.r(a),"-")},
$S:1}
A.rm.prototype={
$1(a){A.r(a)
return a==="POST"||a==="PUT"||a==="PATCH"||a==="DELETE"||B.a.t(a,"=")||B.a.u(a,"@")},
$S:1}
A.lV.prototype={
gX(){var s,r=null,q=A.e([],t.j)
for(s=0;s<4;++s)q.push(new A.D(B.ki[s],B.X,B.e,B.d,B.jp,B.i,r,r))
for(s=0;s<2;++s)q.push(new A.D(B.jY[s],B.X,B.e,B.d,B.aV,B.i,r,r))
for(s=0;s<11;++s)q.push(new A.D(B.jl[s],B.X,B.e,B.d,B.aV,B.i,r,r))
for(s=0;s<9;++s)q.push(new A.D(B.ku[s],B.X,B.e,B.d,B.kc,B.i,r,r))
q.push(B.hX)
q.push(B.hz)
q.push(B.hv)
for(s=0;s<20;++s)q.push(new A.D(B.jq[s],B.X,B.e,B.d,B.je,B.i,r,r))
return q},
$ia6:1}
A.m9.prototype={
gX(){var s,r=A.e([B.hR],t.j)
for(s=0;s<2;++s)r.push(new A.D(B.ko[s],B.ad,B.e,B.d,B.j,B.jX,null,null))
B.b.C(r,A.ah(B.jb,B.bK,B.ad,B.d,B.n))
B.b.C(r,A.ah(B.iO,B.bK,B.E,B.d,B.n))
return r},
$ia6:1}
A.mm.prototype={
gX(){var s,r=A.N(A.ah(B.j9,B.a_,B.w,B.d,B.n),t.Y)
B.b.C(r,A.ah(B.kh,B.a_,B.w,B.dJ,B.n))
B.b.C(r,A.ah(B.kx,B.a_,B.w,B.dJ,B.n))
B.b.C(r,A.ah(B.kq,B.a_,B.w,B.bV,B.n))
B.b.C(r,A.ah(B.kn,B.a_,B.w,B.dM,B.n))
B.b.C(r,A.ah(B.jF,B.a_,B.w,B.bV,B.n))
B.b.C(r,A.ah(B.k3,B.a_,B.w,B.nL,B.n))
B.b.C(r,A.ah(B.jH,B.a_,B.w,B.nE,B.n))
for(s=0;s<5;++s)r.push(new A.D(B.k2[s],B.ob,B.e,B.d,B.j,B.i,B.cc,null))
for(s=0;s<8;++s)r.push(new A.D(B.k8[s],B.X,B.e,B.d,B.j,B.i,B.cc,null))
r.push(B.hP)
r.push(B.hA)
r.push(B.hq)
return r},
$ia6:1}
A.mw.prototype={
gX(){var s,r=null,q=A.e([],t.j)
for(s=0;s<3;++s)q.push(new A.D(B.jB[s],B.a3,B.e,B.d,B.j,B.i,r,A.Jc()))
B.b.C(q,A.ah(B.jc,B.d6,B.a3,B.d,B.n))
q.push(B.hH)
for(s=0;s<5;++s)q.push(new A.D(B.j4[s],B.oC,B.o,B.d,B.j,B.i,r,r))
for(s=0;s<6;++s)q.push(new A.D(B.kw[s],B.bZ,B.o,B.d,B.j,B.i,r,r))
q.push(B.hw)
q.push(B.hK)
q.push(B.hy)
q.push(new A.D("csrutil",B.a3,B.o,B.d,B.j,B.i,r,new A.u3()))
return q},
$ia6:1}
A.u3.prototype={
$2(a,b){var s
if(B.b.ac(t.a.a(a),new A.u2())){s=b.c
b.c=s.a>=4?s:B.J
b.cr("Disables System Integrity Protection.")}},
$S:17}
A.u2.prototype={
$1(a){return A.r(a).toLowerCase()==="disable"},
$S:1}
A.wr.prototype={
$1(a){A.r(a)
return a==="-R"||a==="-r"||a==="--recursive"},
$S:1}
A.ws.prototype={
$1(a){A.r(a)
return!B.a.u(a,"-")&&A.GH(a)},
$S:1}
A.mL.prototype={
gX(){var s,r=A.e([],t.j)
for(s=0;s<6;++s)r.push(new A.D(B.kK[s],B.E,B.e,B.d,B.kO,B.i,null,null))
r.push(B.hF)
r.push(B.hS)
B.b.C(r,A.ah(B.kH,B.iH,B.K,B.d,B.n))
return r},
$ia6:1}
A.mO.prototype={
gX(){var s=A.N(A.ah(B.kg,B.ax,B.E,B.d,B.bY),t.Y)
B.b.C(s,A.ah(B.kI,B.d6,B.a3,B.d,B.bY))
B.b.C(s,A.ah(B.kL,B.bK,B.ad,B.d,B.bY))
return s},
$ia6:1}
A.cJ.prototype={
R(){return"CommandEffect."+this.b}}
A.pM.prototype={}
A.po.prototype={
fn(a,b){return A.El(b).fm(a)}}
A.xo.prototype={
$1(a){var s,r,q
A.r(a)
s=B.a.aY(a,"/")
r=B.a.aY(a,"\\")
q=s>r?s:r
if(q<0||q===a.length-1)return a
return B.a.D(a,q+1)},
$S:6}
A.xp.prototype={
$1(a){var s
A.r(a)
s=A.O("\\.(exe|cmd|bat|com|ps1)$",!1).d0(a)
if(s==null)return a
return B.a.m(a,0,s.b.index)},
$S:6}
A.xq.prototype={
$1(a){var s,r,q
A.r(a)
s=A.O("^([A-Za-z]+?)[0-9][0-9.]*$",!0).d0(a)
if(s==null)return a
r=s.b
if(1>=r.length)return A.b(r,1)
q=r[1]
return B.oE.t(0,q.toLowerCase())?q:a},
$S:6}
A.wy.prototype={
$1(a){var s
A.r(a)
s=B.lb.k(0,a.toLowerCase())
return s==null?a:s},
$S:6}
A.iU.prototype={}
A.iV.prototype={
a4(a){var s,r,q,p=B.a.G(a)
for(s=this.a,r=s.length,q=0;q<r;++q)p=s[q].c.$1(p)
return p}}
A.pn.prototype={}
A.rX.prototype={
l_(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f={}
t.dv.a(c)
s=A.e([],t.s)
r=new A.T("")
f.a=!1
q=b.length
p=new A.rY(f,s,r)
for(o=0;o<q;){if(!(o>=0))return A.b(b,o)
n=b[o]
if(n===" "||n==="\t"||n==="\n"||n==="\r"){p.$0();++o
continue}if(n==="\\"){f.a=!0
m=o+1
l=r.a
if(m<q){r.a=l+b[m]
o+=2}else{r.a=l+n
o=m}continue}if(n==="'"){f.a=!0
l=o+1
k=B.a.a_(b,"'",l)
j=r.a
if(k<0){r.a=j+B.a.D(b,l)
c.$2("Unterminated single quote",o)
o=q}else{r.a=j+B.a.m(b,l,k)
o=k+1}continue}if(n==='"'){f.a=!0;++o
for(;;){if(!(o<q)){i=!1
break}A:{h=b[o]
if(h==="\\"&&o+1<q){m=o+1
if(!(m<q))return A.b(b,m)
g=b[m]
if(g==='"'||g==="\\"||g==="$"||g==="`"){r.a+=g
o+=2
break A}r.a+=h
o=m
break A}if(h==='"'){++o
i=!0
break}r.a+=h;++o}}if(!i)c.$2("Unterminated double quote",o)
continue}f.a=!0
r.a+=n;++o}p.$0()
return s}}
A.rY.prototype={
$0(){var s,r,q=this.a
if(q.a){s=this.c
r=s.a
B.b.j(this.b,r.charCodeAt(0)==0?r:r)
s.a=""
q.a=!1}},
$S:0}
A.q5.prototype={
fm(a){var s=A.e([],t.C),r=B.fY.l_(0,a,new A.q6(s))
if(r.length===0){B.b.j(s,B.aZ)
return new A.eH(a,B.cT,null,s)}return new A.eH(a,B.cT,new A.bc(B.b.gI(r),B.b.b2(r,1),B.di,B.m,B.k,null),s)}}
A.q6.prototype={
$2(a,b){return B.b.j(this.a,new A.aV(B.u,a,b))},
$S:84}
A.wS.prototype={
$1(a){var s=a.toLowerCase()
return s==="/c"||s==="/k"},
$S:1}
A.wT.prototype={
$1(a){var s=a.toLowerCase()
if(B.dV.t(0,s)||B.a.u(s,"-encoded"))return!1
return s==="-command"||B.a.u(s,"-c")},
$S:1}
A.kV.prototype={
R(){return"DiagnosticSeverity."+this.b}}
A.aV.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.aV&&b.a===this.a&&b.b===this.b&&b.c===this.c},
gE(a){return A.bo(this.a,this.b,this.c,B.f,B.f,B.f,B.f)},
l(a){return"["+this.a.b+"] "+this.b+" (offset: "+this.c+")"}}
A.eH.prototype={
gjR(){var s=this.c
s=s==null?null:s.cA()
return s==null?B.bP:s},
l(a){return"ParseResult(syntax: "+this.b.b+", ast: "+A.u(this.c)+", diagnostics: "+A.u(this.d)+")"}}
A.rO.prototype={
fm(a){var s=A.e([],t.C),r=new A.jJ(new A.jK(a,s).bA(),s,0).d6()
if(r==null)B.b.j(s,B.aZ)
return new A.eH(a,B.bB,r,s)}}
A.cF.prototype={
R(){return"_PsTokenType."+this.b}}
A.aW.prototype={
gbZ(){var s,r=this.a
A:{if(B.bb===r){s=B.bS
break A}if(B.bc===r){s=B.ao
break A}s=B.b0
break A}return s}}
A.jK.prototype={
cL(a){var s=this.c+a,r=this.a,q=r.length
if(s<q){if(!(s>=0))return A.b(r,s)
s=r[s]}else s=null
return s},
bA(){var s,r,q,p,o,n,m,l=this,k=null,j=A.e([],t.qi)
A:for(s=l.a,r=s.length;q=l.c,q<r;){if(!(q>=0&&q<r))return A.b(s,q)
p=s[q]
if(p===" "||p==="\t"||p==="\r"){l.c=q+1
continue A}if(p==="\n"){B.b.j(j,new A.aW(B.ck,"\n",q,B.m,B.k));++l.c
continue A}switch(p){case"|":o=q+1
if((o<r?s[o]:k)==="|"){B.b.j(j,new A.aW(B.eu,"||",q,B.m,B.k))
l.c+=2}else{B.b.j(j,new A.aW(B.es,"|",q,B.m,B.k));++l.c}continue A
case"&":o=q+1
if((o<r?s[o]:k)==="&"){B.b.j(j,new A.aW(B.et,"&&",q,B.m,B.k))
l.c+=2
continue A}B.b.j(j,new A.aW(B.cj,"&",q,B.m,B.k));++l.c
continue A
case";":B.b.j(j,new A.aW(B.cj,";",q,B.m,B.k));++l.c
continue A
case">":o=q+1
n=o<r
if((n?s[o]:k)==="&"){l.c=o
m=l.jC(q,">")
if(m!=null)B.b.j(j,m)
else{++l.c
B.b.j(j,new A.aW(B.aC,">&",q,B.m,B.k))}}else if((n?s[o]:k)===">"){B.b.j(j,new A.aW(B.bb,">>",q,B.m,B.k))
l.c+=2}else{B.b.j(j,new A.aW(B.aC,">",q,B.m,B.k));++l.c}continue A
case"0":case"1":case"2":++q
if((q<r?s[q]:k)===">"){B.b.j(j,l.o4())
continue A}B.b.j(j,l.jn())
continue A
default:B.b.j(j,l.jn())}}return j},
o4(){var s,r,q=this,p=q.c,o=q.a
if(!(p>=0&&p<o.length))return A.b(o,p)
s=o[p]
if(q.cL(2)==="&"){q.c+=2
r=q.jC(p,s+">")
if(r!=null)return r;++q.c
return new A.aW(B.aC,s+">&",p,B.m,B.k)}if(q.cL(2)===">"){q.c+=3
return new A.aW(B.bb,s+">>",p,B.m,B.k)}q.c+=2
return new A.aW(B.aC,s+">",p,B.m,B.k)},
jC(a,b){var s,r,q,p,o,n,m,l,k=this,j=null,i=k.cL(1)
if(i==="-"){s=k.cL(2)
if(s==null||A.zU(s)){k.c+=2
return new A.aW(B.bc,b+"&-",a,B.m,B.k)}return j}if(!A.FK(i))return j
r=new A.T("")
s=k.a
q=s.length
p=1
o=""
for(;;){n=k.c+p
m=n<q
if(m){if(!(n>=0))return A.b(s,n)
l=s[n]}else l=j
if(l!=null){if(0>=l.length)return A.b(l,0)
l=l.charCodeAt(0)>=48&&l.charCodeAt(0)<=57}else l=!1
if(!l)break
if(m){if(!(n>=0))return A.b(s,n)
n=s[n]}else n=j
n=o+A.u(n)
r.a=n;++p
o=n}s=k.cL(p)
if(!(s==null||A.zU(s)))return j
k.c+=p
return new A.aW(B.bc,b+"&"+r.l(0),a,B.m,B.k)},
jn(){var s,r,q,p,o,n,m=this,l=m.c,k=new A.T(""),j=A.e([],t.yP),i=A.e([],t.r)
for(s=m.a,r=s.length;q=m.c,q<r;){if(!(q>=0&&q<r))return A.b(s,q)
p=s[q]
if(p===" "||p==="\t"||p==="\r"||p==="\n"||p==="|"||p==="&"||p===";"||p===">")break
if(p==="'"){++q
o=B.a.a_(s,"'",q)
if(o<0){k.a+=B.a.D(s,q)
B.b.j(m.b,new A.aV(B.u,"Unterminated quote",l))
m.c=r
break}k.a+=B.a.m(s,q,o)
m.c=o+1
continue}if(p==='"'){m.ot(k,j,i,l)
continue}if(p==="`"){n=q+1
if(n<r){k.a+=s[n]
m.c=q+2}else m.c=n
continue}if(p==="$"){m.jl(k,j,i)
continue}k.a+=p
m.c=q+1}s=k.a
return new A.aW(B.ci,s.charCodeAt(0)==0?s:s,l,j,i)},
ot(a,b,c,d){var s,r,q,p,o,n=this
t.W.a(b)
t.qL.a(c);++n.c
for(s=n.a,r=s.length;q=n.c,q<r;){if(!(q>=0&&q<r))return A.b(s,q)
p=s[q]
if(p==='"'){n.c=q+1
return}if(p==="`"&&q+1<r){o=q+1
if(!(o<r))return A.b(s,o)
a.a+=s[o]
n.c=q+2
continue}if(p==="$"){n.jl(a,b,c)
continue}a.a+=p
n.c=q+1}B.b.j(n.b,new A.aV(B.u,"Unterminated quote",d))},
jl(a,b,c){var s,r,q,p,o,n,m,l=this
t.W.a(b)
t.qL.a(c)
s=l.cL(1)
if(s==="("){l.ov(a,b)
return}r=l.a
q=l.c
if(B.a.a6(r,"$env:",q)){p=q+5
q=r.length
for(;;){if(p<q){o=$.yo()
if(!(p>=0))return A.b(r,p)
n=r[p]
o=o.b.test(n)}else o=!1
if(!o)break;++p}m=B.a.m(r,l.c+5,p)
if(m.length!==0)B.b.j(c,new A.bR(m))
a.a+=B.a.m(r,l.c,p)
l.c=p
return}if(s!=null){q=$.BS()
q=q.b.test(s)}else q=!1
if(q){p=l.c+1
q=r.length
for(;;){if(p<q){o=$.yo()
if(!(p>=0))return A.b(r,p)
n=r[p]
o=o.b.test(n)}else o=!1
if(!o)break;++p}B.b.j(c,new A.bR(B.a.m(r,l.c+1,p)))
a.a+=B.a.m(r,l.c,p)
l.c=p
return}a.a+="$";++l.c},
ov(a,b){var s,r,q,p,o,n,m=this
t.W.a(b)
s=m.c
r=s+1
for(q=m.a,p=q.length,o=0;r<p;++r){if(!(r>=0))return A.b(q,r)
n=q[r]
if(n==="(")++o
else if(n===")"){--o
if(o===0)break}}if(o!==0){B.b.j(m.b,new A.aV(B.u,"Unterminated subexpression",s))
m.is(B.a.D(q,m.c+2),b)
a.a+=B.a.D(q,m.c)
m.c=p
return}m.is(B.a.m(q,s+2,r),b)
p=r+1
a.a+=B.a.m(q,m.c,p)
m.c=p},
is(a,b){var s,r
t.W.a(b)
s=A.e([],t.C)
r=new A.jJ(new A.jK(a,s).bA(),s,0).d6()
B.b.j(b,new A.cK(r==null?B.cR:r))}}
A.jJ.prototype={
d6(){var s,r,q,p,o,n,m,l=this,k=A.e([],t.J)
for(s=l.a,r=l.b;q=l.d,p=s.length,q<p;){for(;;){o=q>=p
if(!o){if(!(q<p))return A.b(s,q)
n=s[q].a===B.ck}else n=!1
if(!n)break;++q
l.d=q}if(o)break
m=l.nU()
if(m!=null)B.b.j(k,m)
p=l.d
o=s.length
if(p<o){if(!(p<o))return A.b(s,p)
n=s[p].a===B.ck}else n=!1
if(n)l.d=p+1
else if(p===q){if(!(p<o))return A.b(s,p)
q=s[p]
B.b.j(r,new A.aV(B.u,'Unexpected token "'+q.b+'"',q.c));++l.d}}s=k.length
if(s===0)return null
if(s===1)return B.b.gI(k)
return new A.el(k)},
nU(){var s,r,q,p,o,n,m,l=this,k=l.j5()
if(k==null)return null
for(s=l.a,r=t.J,q=t.U;p=l.d,o=s.length,p<o;){if(!(p<o))return A.b(s,p)
n=s[p].a
A:{if(B.cj===n){o=B.bp
break A}if(B.et===n){o=B.bq
break A}if(B.eu===n){o=B.br
break A}o=null
break A}if(o==null)break
l.d=p+1
m=l.j5()
if(m==null)break
if(k instanceof A.bO&&k.b===o){p=A.N(k.a,q)
p.push(m)
k=new A.bO(p,o)}else k=new A.bO(A.e([k,m],r),o)}return k},
j5(){var s,r,q,p,o,n=this,m=n.j4()
if(m==null)return null
s=A.e([m],t.J)
r=n.a
for(;;){q=n.d
p=r.length
if(q<p){if(!(q<p))return A.b(r,q)
p=r[q].a===B.es}else p=!1
if(!p)break
n.d=q+1
o=n.j4()
if(o==null)break
B.b.j(s,o)}if(s.length===1)return B.b.gI(s)
return new A.cQ(s)},
j4(){var s,r,q,p,o,n,m,l=this,k=A.e([],t.qi),j=A.e([],t.iq),i=A.e([],t.yP),h=A.e([],t.r)
for(s=l.a;r=l.d,q=s.length,r<q;){if(!(r<q))return A.b(s,r)
p=s[r]
o=p.a
if(o===B.ci){B.b.j(k,p)
B.b.C(i,p.d)
B.b.C(h,p.e);++l.d
continue}if(o===B.bc){B.b.j(j,new A.bv(B.ao,p.b));++l.d
continue}if(o===B.aC||o===B.bb){r=l.d=r+1
if(r<q){if(!(r<q))return A.b(s,r)
o=s[r].a===B.ci}else o=!1
if(o){o=p.gbZ()
if(!(r<q))return A.b(s,r)
B.b.j(j,new A.bv(o,s[r].b));++l.d}else B.b.j(j,new A.bv(p.gbZ(),""))
continue}break}if(k.length===0)return null
n=B.b.gI(k).b
s=A.bx(k,1,null,t.a9)
r=s.$ti
q=r.h("a2<Q.E,a>")
s=A.N(new A.a2(s,r.h("a(Q.E)").a(new A.vX()),q),q.h("Q.E"))
s.$flags=1
m=s
return new A.bc(n,m,j,i,h,l.nV(n,m))},
nV(a,b){var s,r,q,p
t.a.a(b)
s=this.c
if(s>=5)return null
r=A.yg(a,b)
if(r==null)return null
if(r>>>0!==r||r>=b.length)return A.b(b,r)
q=b[r]
if(q.length===0)return null
p=A.e([],t.C)
return new A.jJ(new A.jK(q,p).bA(),p,s+1).d6()}}
A.vX.prototype={
$1(a){return t.a9.a(a).b},
$S:61}
A.tH.prototype={
fm(a){var s=A.e([],t.C),r=new A.jV(new A.jQ(a,s).bA(),s,0).hR()
if(r==null)B.b.j(s,B.aZ)
return new A.eH(a,this.gio(),r,s)}}
A.oL.prototype={
gio(){return B.bz}}
A.rN.prototype={
gio(){return B.i2}}
A.be.prototype={
R(){return"_TokenType."+this.b}}
A.aJ.prototype={
gbZ(){var s,r=this.a
A:{if(B.be===r){s=B.b0
break A}if(B.bf===r){s=B.bS
break A}if(B.cr===r){s=B.dF
break A}if(B.cs===r){s=B.nb
break A}if(B.cm===r){s=B.nc
break A}if(B.cn===r){s=B.nd
break A}if(B.bd===r){s=B.ao
break A}if(B.aD===r){s=B.ne
break A}if(B.co===r){s=B.nf
break A}s=B.b0
break A}return s}}
A.jQ.prototype={
aL(a){var s=this.c+a,r=this.a,q=r.length
if(s<q){if(!(s>=0))return A.b(r,s)
s=r[s]}else s=null
return s},
bA(){var s,r,q,p,o,n=this,m=A.e([],t.mK)
for(s=n.a,r=s.length;q=n.c,q<r;){if(!(q>=0&&q<r))return A.b(s,q)
p=s[q]
if(p===" "||p==="\t"||p==="\r"){n.c=q+1
continue}if(p==="\n"){B.b.j(m,new A.aJ(B.cq,"\n",q,B.m,B.k));++n.c
continue}o=n.pd()
if(o!=null){B.b.j(m,o)
continue}B.b.j(m,n.oL())}return m},
pd(){var s,r,q=this,p=q.c,o=q.a
if(!(p>=0&&p<o.length))return A.b(o,p)
s=o[p]
switch(s){case"|":if(q.aL(1)==="|"){q.c+=2
return new A.aJ(B.ex,"||",p,B.m,B.k)}++q.c
return new A.aJ(B.ev,"|",p,B.m,B.k)
case";":q.c=p+1
return new A.aJ(B.cp,";",p,B.m,B.k)
case"&":if(q.aL(1)==="&"){q.c+=2
return new A.aJ(B.ew,"&&",p,B.m,B.k)}if(q.aL(1)===">"){if(q.aL(2)===">"){q.c+=3
return new A.aJ(B.co,"&>>",p,B.m,B.k)}q.c+=2
return new A.aJ(B.aD,"&>",p,B.m,B.k)}++q.c
return new A.aJ(B.cp,"&",p,B.m,B.k)
case">":if(q.aL(1)==="&"){++q.c
r=q.js(p,">")
if(r!=null)return r;++q.c
return new A.aJ(B.aD,">&",p,B.m,B.k)}if(q.aL(1)===">"){q.c+=2
return new A.aJ(B.bf,">>",p,B.m,B.k)}++q.c
return new A.aJ(B.be,">",p,B.m,B.k)
case"<":if(q.aL(1)==="<"){q.c+=2
return new A.aJ(B.cs,"<<",p,B.m,B.k)}++q.c
return new A.aJ(B.cr,"<",p,B.m,B.k)
case"0":case"1":case"2":if(q.aL(1)===">")return q.oJ(p,s)
return null
default:return null}},
oJ(a,b){var s,r,q,p=this
if(p.aL(2)==="&"){p.c+=2
s=p.js(a,b+">")
if(s!=null)return s;++p.c
return new A.aJ(B.aD,b+">&",a,B.m,B.k)}r=b==="2"
if(p.aL(2)===">"){p.c+=3
q=r?B.cn:B.bf
return new A.aJ(q,b+">>",a,B.m,B.k)}p.c+=2
q=r?B.cm:B.be
return new A.aJ(q,b+">",a,B.m,B.k)},
js(a,b){var s,r,q,p,o,n,m,l,k=this,j=null,i=k.aL(1)
if(i==null)return j
if(i==="-"){s=k.aL(2)
if(s==null||A.zV(s)){k.c+=2
return new A.aJ(B.bd,b+"&-",a,B.m,B.k)}return j}if(!A.FM(i))return j
r=new A.T("")
s=k.a
q=s.length
p=1
o=""
for(;;){n=k.c+p
m=n<q
if(m){if(!(n>=0))return A.b(s,n)
l=s[n]}else l=j
if(l!=null){if(0>=l.length)return A.b(l,0)
l=l.charCodeAt(0)>=48&&l.charCodeAt(0)<=57}else l=!1
if(!l)break
if(m){if(!(n>=0))return A.b(s,n)
n=s[n]}else n=j
n=o+A.u(n)
r.a=n;++p
o=n}s=k.aL(p)
if(!(s==null||A.zV(s)))return j
k.c+=p
return new A.aJ(B.bd,b+"&"+r.l(0),a,B.m,B.k)},
oL(){var s,r,q,p,o,n,m=this,l=m.c,k=new A.T(""),j=A.e([],t.yP),i=A.e([],t.r)
for(s=m.a,r=s.length;q=m.c,q<r;){if(!(q>=0&&q<r))return A.b(s,q)
p=s[q]
if(p===" "||p==="\t"||p==="\r"||p==="\n"||p==="|"||p==="&"||p===";"||p==="<"||p===">")break
if(p==="'"){m.ou(k)
continue}if(p==='"'){m.oK(k,j,i)
continue}if(p==="\\"){o=q+1
n=k.a
if(o<r){k.a=n+s[o]
m.c=q+2}else{k.a=n+p
m.c=o}continue}if(p==="$"){m.jr(k,j,i)
continue}if(p==="`"){m.jk(k,j)
continue}k.a+=p
m.c=q+1}s=k.a
return new A.aJ(B.cl,s.charCodeAt(0)==0?s:s,l,j,i)},
ou(a){var s=this,r=s.c,q=s.a,p=r+1,o=B.a.a_(q,"'",p)
if(o<0){a.a+=B.a.D(q,p)
B.b.j(s.b,new A.aV(B.u,"Unterminated single quote",r))
s.c=q.length
return}a.a+=B.a.m(q,p,o)
s.c=o+1},
oK(a,b,c){var s,r,q,p,o,n,m,l=this
t.W.a(b)
t.qL.a(c)
s=l.c++
for(r=l.a,q=r.length;p=l.c,p<q;){if(!(p>=0&&p<q))return A.b(r,p)
o=r[p]
if(o==='"'){l.c=p+1
return}if(o==="\\"&&p+1<q){n=p+1
if(!(n<q))return A.b(r,n)
m=r[n]
if(m==='"'||m==="\\"||m==="$"||m==="`"){a.a+=m
l.c=p+2
continue}a.a+=o
l.c=n
continue}if(o==="$"){l.jr(a,b,c)
continue}if(o==="`"){l.jk(a,b)
continue}a.a+=o
l.c=p+1}B.b.j(l.b,new A.aV(B.u,"Unterminated double quote",s))},
jr(a,b,c){var s,r,q,p,o,n,m,l=this
t.W.a(b)
t.qL.a(c)
s=l.aL(1)
if(s==="("){l.os(a,b)
return}if(s==="{"){l.or(a,c)
return}if(s!=null){r=A.O("[A-Za-z_]",!0)
r=r.b.test(s)}else r=!1
if(r){q=l.c+1
r=l.a
p=r.length
o=q
for(;;){if(o<p){if(!(o>=0))return A.b(r,o)
n=r[o]
m=A.O("[A-Za-z0-9_]",!0)
n=m.b.test(n)}else n=!1
if(!n)break;++o}B.b.j(c,new A.bR(B.a.m(r,q,o)))
a.a+=B.a.m(r,l.c,o)
l.c=o
return}a.a+="$";++l.c},
or(a,b){var s,r,q,p,o,n,m=this
t.qL.a(b)
s=m.c
r=m.a
q=s+2
p=B.a.a_(r,"}",q)
if(p<0){B.b.j(m.b,new A.aV(B.u,"Unterminated ${...} expansion",s))
a.a+=B.a.D(r,m.c)
m.c=r.length
return}o=B.a.m(r,q,p)
n=A.O("^[A-Za-z_][A-Za-z0-9_]*",!0).l1(o)
if(n==null)n=o
if(n.length!==0)B.b.j(b,new A.bR(n))
q=p+1
a.a+=B.a.m(r,m.c,q)
m.c=q},
os(a,b){var s,r,q,p,o,n,m=this
t.W.a(b)
s=m.c
r=s+1
for(q=m.a,p=q.length,o=0;r<p;++r){if(!(r>=0))return A.b(q,r)
n=q[r]
if(n==="(")++o
else if(n===")"){--o
if(o===0)break}}if(o!==0){B.b.j(m.b,new A.aV(B.u,"Unterminated command substitution",s))
m.ei(B.a.D(q,m.c+2),b)
a.a+=B.a.D(q,m.c)
m.c=p
return}m.ei(B.a.m(q,s+2,r),b)
p=r+1
a.a+=B.a.m(q,m.c,p)
m.c=p},
jk(a,b){var s,r,q,p,o=this
t.W.a(b)
s=o.c
r=o.a
q=s+1
p=B.a.a_(r,"`",q)
if(p<0){B.b.j(o.b,new A.aV(B.u,"Unterminated back-tick substitution",s))
o.ei(B.a.D(r,o.c+1),b)
a.a+=B.a.D(r,o.c)
o.c=r.length
return}o.ei(B.a.m(r,q,p),b)
q=p+1
a.a+=B.a.m(r,o.c,q)
o.c=q},
ei(a,b){var s,r
t.W.a(b)
s=A.e([],t.C)
r=new A.jV(new A.jQ(a,s).bA(),s,0).hR()
B.b.j(b,new A.cK(r==null?B.cR:r))}}
A.jV.prototype={
hR(){var s,r,q,p,o,n,m,l=this,k=A.e([],t.J)
for(s=l.a,r=l.b;q=l.d,p=s.length,q<p;){for(;;){o=q>=p
if(!o){if(!(q<p))return A.b(s,q)
n=s[q].a===B.cq}else n=!1
if(!n)break;++q
l.d=q}if(o)break
m=l.oH()
if(m!=null)B.b.j(k,m)
p=l.d
o=s.length
if(p<o){if(!(p<o))return A.b(s,p)
n=s[p].a===B.cq}else n=!1
if(n)l.d=p+1
else if(p===q){if(!(p<o))return A.b(s,p)
q=s[p]
B.b.j(r,new A.aV(B.u,'Unexpected token "'+q.b+'"',q.c));++l.d}}s=k.length
if(s===0)return null
if(s===1)return B.b.gI(k)
return new A.el(k)},
oH(){var s,r,q,p,o,n=this,m=n.jq()
if(m==null)return null
for(s=n.a;r=n.d,q=s.length,r<q;){if(!(r<q))return A.b(s,r)
p=s[r].a
A:{if(B.cp===p){q=B.bp
break A}if(B.ew===p){q=B.bq
break A}if(B.ex===p){q=B.br
break A}q=null
break A}if(q==null)break
n.d=r+1
o=n.jq()
if(o==null){B.b.j(n.b,B.mK)
break}m=n.mx(m,q,o)}return m},
mx(a,b,c){var s
if(a instanceof A.bO&&a.b===b){s=A.N(a.a,t.U)
s.push(c)
return new A.bO(s,b)}return new A.bO(A.e([a,c],t.J),b)},
jq(){var s,r,q,p,o,n=this,m=n.jp()
if(m==null)return null
s=A.e([m],t.J)
r=n.a
for(;;){q=n.d
p=r.length
if(q<p){if(!(q<p))return A.b(r,q)
p=r[q].a===B.ev}else p=!1
if(!p)break
n.d=q+1
o=n.jp()
if(o==null){B.b.j(n.b,B.mJ)
break}B.b.j(s,o)}if(s.length===1)return B.b.gI(s)
return new A.cQ(s)},
jp(){var s,r,q,p,o,n,m,l,k=this,j=A.e([],t.mK),i=A.e([],t.iq),h=A.e([],t.yP),g=A.e([],t.r)
for(s=k.a,r=k.b;q=k.d,p=s.length,q<p;){if(!(q<p))return A.b(s,q)
o=s[q]
q=o.a
if(q===B.cl){B.b.j(j,o)
B.b.C(h,o.d)
B.b.C(g,o.e);++k.d
continue}if(q===B.bd){B.b.j(i,new A.bv(B.ao,o.b));++k.d
continue}if(B.o6.t(0,q)){q=++k.d
p=s.length
if(q<p){if(!(q<p))return A.b(s,q)
n=s[q].a===B.cl}else n=!1
if(n){n=o.gbZ()
if(!(q<p))return A.b(s,q)
B.b.j(i,new A.bv(n,s[q].b));++k.d}else{B.b.j(i,new A.bv(o.gbZ(),""))
B.b.j(r,new A.aV(B.u,"Redirection without a target",o.c))}continue}break}if(j.length===0){if(i.length===0)return null
return new A.bc("",B.G,i,h,g,null)}m=B.b.gI(j).b
s=A.bx(j,1,null,t.to)
r=s.$ti
q=r.h("a2<Q.E,a>")
s=A.N(new A.a2(s,r.h("a(Q.E)").a(new A.w3()),q),q.h("Q.E"))
s.$flags=1
l=s
return new A.bc(m,l,i,h,g,k.oI(m,l))},
oI(a,b){var s,r,q,p
t.a.a(b)
s=this.c
if(s>=5)return null
r=A.yg(a,b)
if(r==null)return null
if(r>>>0!==r||r>=b.length)return A.b(b,r)
q=b[r]
if(q.length===0)return null
p=A.e([],t.C)
return new A.jV(new A.jQ(q,p).bA(),p,s+1).hR()}}
A.w3.prototype={
$1(a){return t.to.a(a).b},
$S:87}
A.v7.prototype={
fm(a){var s=A.e([],t.C),r=new A.n6(new A.n7(a,s).bA(),s,0).d6()
if(r==null)B.b.j(s,B.aZ)
return new A.eH(a,B.bA,r,s)}}
A.cB.prototype={
R(){return"_CmdTokenType."+this.b}}
A.b0.prototype={
gbZ(){var s,r=this.a
A:{if(B.b8===r){s=B.bS
break A}if(B.ce===r){s=B.dF
break A}if(B.b9===r){s=B.ao
break A}s=B.b0
break A}return s}}
A.n7.prototype={
dJ(a){var s=this.c+a,r=this.a,q=r.length
if(s<q){if(!(s>=0))return A.b(r,s)
s=r[s]}else s=null
return s},
bA(){var s,r,q,p,o,n,m,l=this,k=null,j=A.e([],t.nT)
A:for(s=l.a,r=s.length;q=l.c,q<r;){if(!(q>=0&&q<r))return A.b(s,q)
p=s[q]
if(p===" "||p==="\t"||p==="\r"||p==="\n"){l.c=q+1
continue A}switch(p){case"|":o=q+1
if((o<r?s[o]:k)==="|"){B.b.j(j,new A.b0(B.eq,"||",q,B.k))
l.c+=2}else{B.b.j(j,new A.b0(B.eo,"|",q,B.k));++l.c}continue A
case"&":o=q+1
if((o<r?s[o]:k)==="&"){B.b.j(j,new A.b0(B.ep,"&&",q,B.k))
l.c+=2}else{B.b.j(j,new A.b0(B.er,"&",q,B.k));++l.c}continue A
case">":o=q+1
n=o<r
if((n?s[o]:k)==="&"){l.c=o
m=l.jH(q,">")
if(m!=null)B.b.j(j,m)
else{++l.c
B.b.j(j,new A.b0(B.aB,">&",q,B.k))}}else if((n?s[o]:k)===">"){B.b.j(j,new A.b0(B.b8,">>",q,B.k))
l.c+=2}else{B.b.j(j,new A.b0(B.aB,">",q,B.k));++l.c}continue A
case"<":B.b.j(j,new A.b0(B.ce,"<",q,B.k));++l.c
continue A
case"0":case"1":case"2":++q
if((q<r?s[q]:k)===">"){B.b.j(j,l.pg())
continue A}B.b.j(j,l.jG())
continue A
default:B.b.j(j,l.jG())}}return j},
pg(){var s,r,q=this,p=q.c,o=q.a
if(!(p>=0&&p<o.length))return A.b(o,p)
s=o[p]
if(q.dJ(2)==="&"){q.c+=2
r=q.jH(p,s+">")
if(r!=null)return r;++q.c
return new A.b0(B.aB,s+">&",p,B.k)}if(q.dJ(2)===">"){q.c+=3
return new A.b0(B.b8,s+">>",p,B.k)}q.c+=2
return new A.b0(B.aB,s+">",p,B.k)},
jH(a,b){var s,r,q,p,o,n,m,l,k=this,j=null,i=k.dJ(1)
if(i==="-"){s=k.dJ(2)
if(s==null||A.zI(s)){k.c+=2
return new A.b0(B.b9,b+"&-",a,B.k)}return j}if(!A.Fr(i))return j
r=new A.T("")
s=k.a
q=s.length
p=1
o=""
for(;;){n=k.c+p
m=n<q
if(m){if(!(n>=0))return A.b(s,n)
l=s[n]}else l=j
if(l!=null){if(0>=l.length)return A.b(l,0)
l=l.charCodeAt(0)>=48&&l.charCodeAt(0)<=57}else l=!1
if(!l)break
if(m){if(!(n>=0))return A.b(s,n)
n=s[n]}else n=j
n=o+A.u(n)
r.a=n;++p
o=n}s=k.dJ(p)
if(!(s==null||A.zI(s)))return j
k.c+=p
return new A.b0(B.b9,b+"&"+r.l(0),a,B.k)},
jG(){var s,r,q,p,o,n=this,m=n.c,l=A.e([],t.r),k=n.a,j=k.length,i=""
for(;;){s=n.c
if(!(s<j)){k=i
break}A:{if(!(s>=0&&s<j))return A.b(k,s)
r=k[s]
if(r===" "||r==="\t"||r==="\r"||r==="\n"||r==="|"||r==="&"||r===">"||r==="<"){k=i
break}if(r==='"'){++s
q=B.a.a_(k,'"',s)
if(q<0){i+=B.a.D(k,s)
B.b.j(n.b,new A.aV(B.u,"Unterminated quote",m))
n.c=j
k=i
break}i+=B.a.m(k,s,q)
n.c=q+1
break A}if(r==="%"){p=s+1
q=B.a.a_(k,"%",p)
if(q>s){o=B.a.m(k,p,q)
s=A.O("^[A-Za-z_][A-Za-z0-9_]*$",!0)
if(s.b.test(o)){B.b.j(l,new A.bR(o))
s=q+1
i+=B.a.m(k,n.c,s)
n.c=s
break A}}i+=r;++n.c
break A}i+=r
n.c=s+1}}return new A.b0(B.cd,k.charCodeAt(0)==0?k:k,m,l)}}
A.n6.prototype={
d6(){var s,r,q,p,o,n,m,l=this,k=l.jF()
if(k==null)return null
for(s=l.a,r=t.J,q=t.U;p=l.d,o=s.length,p<o;){if(!(p<o))return A.b(s,p)
n=s[p].a
A:{if(B.er===n){o=B.bp
break A}if(B.ep===n){o=B.bq
break A}if(B.eq===n){o=B.br
break A}o=null
break A}if(o==null)break
l.d=p+1
m=l.jF()
if(m==null)break
if(k instanceof A.bO&&k.b===o){p=A.N(k.a,q)
p.push(m)
k=new A.bO(p,o)}else k=new A.bO(A.e([k,m],r),o)}return k},
jF(){var s,r,q,p,o,n=this,m=n.jE()
if(m==null)return null
s=A.e([m],t.J)
r=n.a
for(;;){q=n.d
p=r.length
if(q<p){if(!(q<p))return A.b(r,q)
p=r[q].a===B.eo}else p=!1
if(!p)break
n.d=q+1
o=n.jE()
if(o==null)break
B.b.j(s,o)}if(s.length===1)return B.b.gI(s)
return new A.cQ(s)},
jE(){var s,r,q,p,o,n,m,l,k=this,j=A.e([],t.nT),i=A.e([],t.iq),h=A.e([],t.r)
for(s=k.a,r=k.b;q=k.d,p=s.length,q<p;){if(!(q<p))return A.b(s,q)
o=s[q]
n=o.a
if(n===B.cd){B.b.j(j,o)
B.b.C(h,o.d);++k.d
continue}if(n===B.b9){B.b.j(i,new A.bv(B.ao,o.b));++k.d
continue}if(n===B.aB||n===B.b8||n===B.ce){q=k.d=q+1
if(q<p){if(!(q<p))return A.b(s,q)
n=s[q].a===B.cd}else n=!1
if(n){n=o.gbZ()
if(!(q<p))return A.b(s,q)
B.b.j(i,new A.bv(n,s[q].b));++k.d}else{B.b.j(i,new A.bv(o.gbZ(),""))
B.b.j(r,new A.aV(B.u,"Redirection without a target",o.c))}continue}break}if(j.length===0)return null
m=B.b.gI(j).b
s=A.bx(j,1,null,t.hb)
r=s.$ti
q=r.h("a2<Q.E,a>")
s=A.N(new A.a2(s,r.h("a(Q.E)").a(new A.vm()),q),q.h("Q.E"))
s.$flags=1
l=s
return new A.bc(m,l,i,B.m,h,k.pf(m,l))},
pf(a,b){var s,r,q,p
t.a.a(b)
s=this.c
if(s>=5)return null
r=A.yg(a,b)
if(r==null)return null
q=B.b.S(B.b.b2(b,r)," ")
if(q.length===0)return null
p=A.e([],t.C)
return new A.n6(new A.n7(q,p).bA(),p,s+1).d6()}}
A.vm.prototype={
$1(a){return t.hb.a(a).b},
$S:88}
A.dy.prototype={
hZ(a,b,c){return new A.ek(a,b,A.e([new A.a9(b,c,this.gT(),null)],t.v))}}
A.m_.prototype={
cZ(a){var s,r=new A.ek(B.as,a.w,B.aX)
for(s=0;s<3;++s)r=r.qk(B.jk[s].cZ(a))
return r},
gT(){return"default"}}
A.lx.prototype={
gT(){return"length-limit"},
cZ(a){var s=a.a.length
if(s<=8192)return B.cS
return this.hZ(B.by,B.q,"Command length ("+s+") exceeds the limit of 8192 characters.")}}
A.mg.prototype={
gT(){return"risk-threshold"},
cZ(a){var s,r=a.w,q=r.a
if(q>=4)s=B.aO
else s=q>=2?B.by:B.as
if(s===B.as)return new A.ek(B.as,r,B.aX)
q=s===B.aO?"meets the deny":"meets the review"
return this.hZ(s,r,'Overall risk level "'+r.b+'" '+q+" threshold.")}}
A.ml.prototype={
gT(){return"shell-execution"},
cZ(a){var s=a.y,r=A.U(s),q=r.h("ae<1>"),p=A.N(new A.ae(s,r.h("y(1)").a(new A.tF()),q),q.h("i.E"))
if(p.length===0)return B.cS
return this.hZ(B.by,B.b.hC(p,B.e,new A.tG(),t.lm),B.b.gI(p).b)}}
A.tF.prototype={
$1(a){return t.V.a(a).c==="shell-execution"},
$S:94}
A.tG.prototype={
$2(a,b){var s
t.lm.a(a)
s=t.V.a(b).a
return a.a>=s.a?a:s},
$S:95}
A.kA.prototype={
b6(a){var s,r,q,p,o,n,m,l=A.e([],t.v)
for(s=a.gd3(),r=s.length,q=0;q<s.length;s.length===r||(0,A.M)(s),++q)for(p=s[q].c,o=p.length,n=0;n<p.length;p.length===o||(0,A.M)(p),++n){m=A.Cy(p[n])
if(m==null)continue
B.b.j(l,new A.a9(B.e,m,"benign-redirection",null))}return l}}
A.kK.prototype={
b6(a){var s,r="command-substitution",q=a.gfG(),p=A.e([],t.v),o=B.a.aW(q,"$(")
if(o>=0)B.b.j(p,new A.a9(B.q,'Command substitution "$(...)" executes a nested command.',r,o))
s=B.a.aW(q,"`")
if(s>=0)B.b.j(p,new A.a9(B.q,"Back-tick command substitution executes a nested command.",r,s))
return p}}
A.kQ.prototype={
b6(a){var s,r,q,p,o,n,m,l,k,j,i="Combined redirection",h=a.r
if(h===$){s=A.zq(a.a,!0)
a.r!==$&&A.i6("unquotedRaw")
a.r=s
h=s}r=A.e([],t.v)
q=new A.px(this,A.cN(t.N),r)
p=h.length
A:for(o=0;o<p;){n=h[o]
m=o+1
l=m<p?h[m]:""
switch(n){case"&":if(l==="&"){q.$4("&&",B.q,"Conditional-AND chaining",o)
o+=2
continue A}if(l===">"){m=o+2
if(m<p&&h[m]===">"){q.$4("&>>",B.R,"Combined-append redirection",o)
o+=3}else{q.$4("&>",B.R,i,o)
o=m}continue A}break
case"|":if(l==="|"){q.$4("||",B.q,"Conditional-OR chaining",o)
o+=2
continue A}q.$4("|",B.R,"Pipeline",o)
break
case";":q.$4(";",B.q,"Sequential chaining",o)
break
case">":if(l==="&"){m=o+2
k=m<p?h[m]:""
if(k!=="-"){j=k.length
if(j===1){if(0>=j)return A.b(k,0)
j=k.charCodeAt(0)>=48&&k.charCodeAt(0)<=57}else j=!1}else j=!0
if(j){o=m
continue A}q.$4(">&",B.R,i,o)
o=m
continue A}if(l===">"){q.$4(">>",B.R,"Append redirection",o)
o+=2
continue A}q.$4(">",B.R,"Output redirection",o)
break
case"<":if(l==="<"){q.$4("<<",B.R,"Here-document redirection",o)
o+=2
continue A}q.$4("<",B.R,"Input redirection",o)
break}o=m}return r}}
A.px.prototype={
$4(a,b,c,d){if(this.b.j(0,a))B.b.j(this.c,new A.a9(b,c+' operator "'+a+'" present.',"dangerous-operator",d))},
$S:97}
A.kU.prototype={
b6(a){var s,r,q,p,o,n,m,l,k,j=this,i="destructive-command",h=A.e([],t.v)
for(s=a.gd3(),r=s.length,q=t.s,p=0;p<s.length;s.length===r||(0,A.M)(s),++p){o=s[p]
n=A.e([o.a],q)
B.b.C(n,o.b)
if(j.n1(a,n))continue
m=j.me(a,n)
if(m==null)continue
l=m.a
k=m.b
if(B.og.t(0,l)||B.a.u(l,"mkfs."))B.b.j(h,new A.a9(B.J,'Disk-format/wipe command "'+l+'" irrecoverably destroys data on the target filesystem or device.',i,null))
else if(l==="dd"&&A.D9(k))B.b.j(h,new A.a9(B.J,'Command "'+l+'" writes directly to a block device (of=/dev/...), which can destroy a disk.',i,null))
else if(l==="find"&&B.b.t(k,"-delete"))B.b.j(h,j.ix(l,k))
else if(B.nC.t(0,l))B.b.j(h,j.ix(l,k))}return h},
me(a,b){var s,r,q,p
t.a.a(b)
for(s=a.d,r=0;r<b.length;++r){q=b[r]
if(B.a.u(q,"-"))continue
p=s.a4(q).toLowerCase()
if(B.on.t(0,p))continue
return new A.vI(p,B.b.b2(b,r+1))}return null},
n1(a,b){var s,r,q,p,o,n
t.a.a(b)
for(s=b.length,r=a.d,q=!1,p=0;p<b.length;b.length===s||(0,A.M)(b),++p){o=b[p]
if(o==="-v"||o==="-V"){if(q)return!0
continue}if(B.a.u(o,"-"))continue
n=r.a4(o).toLowerCase()
if(n==="command"||n==="builtin"){q=!0
continue}return!1}return!1},
ix(a,b){var s,r,q,p,o,n,m=null,l='Destructive command "',k="destructive-command"
t.a.a(b)
s=B.b.ac(b,A.Iv())
r=B.b.ac(b,A.Iu())
q=B.b.t(b,"--no-preserve-root")
p=A.U(b)
o=p.h("ae<1>")
n=A.N(new A.ae(b,p.h("y(1)").a(new A.pC()),o),o.h("i.E"))
if(B.b.ac(n,A.It())){p=q?" with --no-preserve-root":""
return new A.a9(B.J,l+a+'" targets a filesystem root or critical system path'+p+".",k,m)}if(s&&r)return new A.a9(B.o,'Recursive, forced deletion via "'+a+'" can remove entire directory trees.',k,m)
if(s)return new A.a9(B.o,'Recursive deletion via "'+a+'".',k,m)
return new A.a9(B.q,l+a+'" deletes files.',k,m)}}
A.pD.prototype={
$1(a){return B.a.u(A.r(a).toLowerCase(),"of=/dev/")},
$S:1}
A.pC.prototype={
$1(a){return!B.a.u(A.r(a),"-")},
$S:1}
A.vI.prototype={}
A.kZ.prototype={
b6(a){var s,r,q,p,o,n=A.cN(t.N),m=a.c
if(m!=null)for(s=m.cA(),r=s.$ti,s=new A.dm(s.a(),r.h("dm<1>")),r=r.c;s.q();){q=s.b
if(q==null)q=r.a(q)
if(q instanceof A.bR)n.j(0,q.a)}if(n.a===0)for(s=$.Bt().dK(0,a.gfG()),s=new A.hF(s.a,s.b,s.c),r=t.he;s.q();){p=s.d
q=(p==null?r.a(p):p).b
if(0>=q.length)return A.b(q,0)
q=q[0]
q.toString
n.j(0,q)}if(n.a===0)return B.aX
o=A.N(n,n.$ti.c)
B.b.di(o)
return A.e([new A.a9(B.R,"Environment-variable expansion ("+B.b.S(o,", ")+").","env-expansion",null)],t.v)}}
A.lt.prototype={
b6(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.e([],t.v)
for(s=a.gd3(),r=s.length,q=a.d,p=this.a,o=t.a,n=t.i,m=t.s,l=0;l<s.length;s.length===r||(0,A.M)(s),++l){k=s[l]
j=k.a
if(j.length===0)continue
i=q.a4(j)
j=o.a(k.b)
h=A.e([],m)
g=new A.ez(A.cN(n),h,B.e)
p.ek(i.toLowerCase(),j,g,0)
j=g.c
if(j.a>=1){f=h.length!==0?" ("+B.b.S(h,"; ")+")":""
B.b.j(e,new A.a9(j,'Elevated-risk command "'+i+'"'+f+".","knowledge-risk",null))}}return e}}
A.lX.prototype={
b6(a){var s,r,q,p,o,n,m,l,k,j,i="path-traversal",h=A.e([],t.v)
for(s=a.gd3(),r=s.length,q=!1,p=!1,o=0;o<s.length;s.length===r||(0,A.M)(s),++o)for(n=s[o].b,m=n.length,l=0;l<n.length;n.length===m||(0,A.M)(n),++l){k=n[l]
j=$.By()
if(j.b.test(k)){if(!q){B.b.j(h,new A.a9(B.q,'Path traversal sequence ("../" or "..\\") in argument "'+k+'".',i,null))
q=!0}}else{if(!p)j=k===".."||B.a.aA(k,"/..")
else j=!1
if(j){B.b.j(h,new A.a9(B.R,'Parent-directory reference ("..") in argument "'+k+'".',i,null))
p=!0}}}return h}}
A.m8.prototype={
b6(a){var s,r,q,p,o,n=A.e([],t.v)
for(s=a.gd3(),r=s.length,q=a.d,p=0;p<s.length;s.length===r||(0,A.M)(s),++p){o=q.a4(s[p].a).toLowerCase()
if(B.nO.t(0,o))B.b.j(n,new A.a9(B.o,'Privilege escalation via "'+o+'".',"privilege-escalation",null))}return n}}
A.mc.prototype={
b6(a){var s,r,q,p,o,n,m,l,k,j,i='Remote download piped directly into a shell/interpreter ("download and execute"). This executes untrusted remote code.',h="remote-exec",g=A.e([],t.v),f=a.f
if(f===$){s=a.c
if(s==null)r=null
else{q=t.cN
s=A.N(new A.bL(s.cA(),q),q.h("i.E"))
s.$flags=1
s=s
r=s}if(r==null)r=B.jO
a.f!==$&&A.i6("pipelines")
f=a.f=r}s=f.length
q=a.d
p=0
for(;p<f.length;f.length===s||(0,A.M)(f),++p)for(o=f[p].a,n=o.length,m=!1,l=0;l<o.length;o.length===n||(0,A.M)(o),++l){k=o[l]
j=q.a4(k.a).toLowerCase()
if(m&&B.nQ.t(0,j)){B.b.j(g,new A.a9(B.J,i,h,null))
break}if(B.oh.t(0,j))m=!0}if(g.length===0){s=$.BA()
q=a.gfG()
s=s.b.test(q)}else s=!1
if(s)B.b.j(g,new A.a9(B.J,i,h,null))
return g}}
A.mk.prototype={
b6(a){var s,r,q,p,o,n,m,l,k,j,i=null,h="shell-execution",g=A.e([],t.v)
for(s=a.gd3(),r=s.length,q=a.d,p=0;p<s.length;s.length===r||(0,A.M)(s),++p){o=s[p]
n=q.a4(o.a).toLowerCase()
m=o.b
if(B.nU.t(0,n)&&B.b.ac(m,new A.tA()))B.b.j(g,new A.a9(B.o,'Inline shell execution via "'+n+' -c" runs an arbitrary command string.',h,i))
else if(n==="cmd"&&B.b.ac(m,new A.tB()))B.b.j(g,new A.a9(B.o,'Inline shell execution via "cmd /c" runs an arbitrary command string.',h,i))
else if(n==="powershell"||n==="pwsh"){l=A.U(m)
k=l.h("a2<1,a>")
j=A.N(new A.a2(m,l.h("a(1)").a(new A.tC()),k),k.h("Q.E"))
if(B.b.ac(j,new A.tD()))B.b.j(g,new A.a9(B.J,'Obfuscated PowerShell via "-EncodedCommand" conceals the executed code.',h,i))
else if(B.b.ac(j,new A.tE()))B.b.j(g,new A.a9(B.o,'Inline shell execution via "powershell -Command" runs an arbitrary command string.',h,i))}else{l=B.la.k(0,n)
l=l==null?i:l.ac(0,B.b.gci(m))
if(l===!0)B.b.j(g,new A.a9(B.o,'Inline code execution via "'+n+'" runs an arbitrary code string.',h,i))
else if(n==="deno"&&m.length!==0&&B.b.gI(m)==="eval")B.b.j(g,new A.a9(B.o,'Inline code execution via "deno eval".',h,i))}}return g}}
A.tA.prototype={
$1(a){A.r(a)
return a==="-c"||a==="--command"},
$S:1}
A.tB.prototype={
$1(a){var s=A.r(a).toLowerCase()
return s==="/c"||s==="/k"},
$S:1}
A.tC.prototype={
$1(a){return A.r(a).toLowerCase()},
$S:6}
A.tD.prototype={
$1(a){A.r(a)
return B.dV.t(0,a)||B.a.u(a,"-encoded")},
$S:1}
A.tE.prototype={
$1(a){A.r(a)
return B.a.u(a,"-c")||a==="-command"},
$S:1}
A.t9.prototype={}
A.mi.prototype={
cV(a){var s,r,q,p,o,n=A.e([],t.v)
for(s=this.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.M)(s),++q)B.b.C(n,s[q].b6(a))
B.b.bn(n,new A.t7())
for(s=n.length,p=B.e,q=0;q<s;++q){o=n[q].a
p=p.a>=o.a?p:o}return new A.t9(p,A.cO(n,t.V))}}
A.t7.prototype={
$2(a,b){var s,r,q,p=t.V
p.a(a)
p.a(b)
s=B.c.a3(b.a.a,a.a.a)
if(s!==0)return s
r=B.a.a3(a.c,b.c)
if(r!==0)return r
p=a.d
if(p==null)p=-1
q=b.d
return B.c.a3(p,q==null?-1:q)},
$S:99}
A.t8.prototype={
gd3(){var s,r,q,p=this,o=p.e
if(o===$){s=p.c
if(s==null)r=null
else{q=t.tC
s=A.N(new A.bL(s.cA(),q),q.h("i.E"))
s.$flags=1
s=s
r=s}if(r==null)r=B.jU
p.e!==$&&A.i6("invocations")
o=p.e=r}return o},
gfG(){var s,r=this,q=r.w
if(q===$){s=A.zq(r.a,!1)
r.w!==$&&A.i6("singleUnquotedRaw")
r.w=s
q=s}return q}}
A.bK.prototype={}
A.a9.prototype={
L(a,b){var s=this
if(b==null)return!1
return b instanceof A.a9&&b.a===s.a&&b.b===s.b&&b.c===s.c&&b.d==s.d},
gE(a){var s=this
return A.bo(s.a,s.b,s.c,s.d,B.f,B.f,B.f)},
l(a){return"["+this.a.b+"] "+this.c+": "+this.b}}
A.bV.prototype={
R(){return"SecurityLevel."+this.b}}
A.em.prototype={
R(){return"CommandSyntax."+this.b}}
A.ip.prototype={
R(){return"CommandDecision."+this.b}}
A.ek.prototype={
qk(a){var s,r,q,p,o,n=t.V,m=A.N(this.c,n)
for(s=a.c,r=s.length,q=0;q<s.length;s.length===r||(0,A.M)(s),++q){p=s[q]
if(!B.b.t(m,p))B.b.j(m,p)}s=this.a
r=a.a
s=s.a>=r.a?s:r
r=this.b
o=a.b
r=r.a>=o.a?r:o
return new A.ek(s,r,A.cO(m,n))},
l(a){return"CommandResult("+this.a.b+", level: "+this.b.b+", findings: "+this.c.length+")"}}
A.kz.prototype={
cR(a,b,c,d,e){return this.oy(a,b,t.km.a(c),d,e)},
oy(a,b,c,d,e){var s=0,r=A.p(t.ey),q,p=this,o,n
var $async$cR=A.q(function(f,g){if(f===1)return A.m(g,r)
for(;;)switch(s){case 0:o=A.Ey(a,b)
o.r.C(0,c)
o.sdL(d)
n=A
s=3
return A.f(p.af(o),$async$cR)
case 3:q=n.t3(g)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$cR,r)},
$iyJ:1}
A.ih.prototype={
q_(){if(this.w)throw A.d(A.aC("Can't finalize a finalized Request."))
this.w=!0
return B.fb},
l(a){return this.a+" "+this.b.l(0)}}
A.oI.prototype={
$2(a,b){return A.r(a).toLowerCase()===A.r(b).toLowerCase()},
$S:106}
A.oJ.prototype={
$1(a){return B.a.gE(A.r(a).toLowerCase())},
$S:108}
A.oK.prototype={
ip(a,b,c,d,e,f,g){var s=this.b
if(s<100)throw A.d(A.as("Invalid status code "+s+".",null))}}
A.fG.prototype={
rh(){var s=new A.v($.E,t.Dy),r=new A.W(s,t.sC),q=new A.jp(new A.oQ(r),new Uint8Array(1024))
this.au(t.eU.a(q.gbh(q)),!0,q.gdM(),r.gpE())
return s}}
A.oQ.prototype={
$1(a){return this.a.V(new Uint8Array(A.c9(t.L.a(a))))},
$S:9}
A.kD.prototype={
l(a){var s=this.b.l(0)
return"ClientException: "+this.a+", uri="+s},
$iaf:1}
A.me.prototype={
ghz(){var s,r,q=this
if(q.gbN()==null||!q.gbN().c.a.ag("charset"))return q.x
s=q.gbN().c.a.k(0,"charset")
s.toString
r=A.yS(s)
return r==null?A.K(A.an('Unsupported encoding "'+s+'".',null,null)):r},
sdL(a){var s,r,q=this,p=t.L.a(q.ghz().cX(a))
q.lN()
q.y=A.Bi(p)
s=q.gbN()
if(s==null){p=t.N
q.sbN(A.rf("text","plain",A.G(["charset",q.ghz().gT()],p,p)))}else{p=q.gbN()
if(p!=null){r=p.a
if(r!=="text"){p=r+"/"+p.b
p=p==="application/xml"||p==="application/xml-external-parsed-entity"||p==="application/xml-dtd"||B.a.aA(p,"+xml")}else p=!0}else p=!1
if(p&&!s.c.a.ag("charset")){p=t.N
q.sbN(s.pw(A.G(["charset",q.ghz().gT()],p,p)))}}},
gbN(){var s=this.r.k(0,"content-type")
if(s==null)return null
return A.z7(s)},
sbN(a){this.r.i(0,"content-type",a.l(0))},
lN(){if(!this.w)return
throw A.d(A.aC("Can't modify a finalized Request."))}}
A.mf.prototype={
gdL(){return A.wJ(A.wh(this.e)).b5(this.w)}}
A.mu.prototype={}
A.ij.prototype={}
A.fY.prototype={
pw(a){var s,r
t.km.a(a)
s=t.N
r=A.z2(this.c,s,s)
r.C(0,a)
return A.rf(this.a,this.b,r)},
l(a){var s=new A.T(""),r=this.a
s.a=r
r+="/"
s.a=r
s.a=r+this.b
r=this.c
r.a.aa(0,r.$ti.h("~(1,2)").a(new A.ri(s)))
r=s.a
return r.charCodeAt(0)==0?r:r}}
A.rg.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=this.a,i=new A.tZ(null,j),h=$.Cb()
i.fE(h)
s=$.C9()
i.dU(s)
r=i.ghN().k(0,0)
r.toString
i.dU("/")
i.dU(s)
q=i.ghN().k(0,0)
q.toString
i.fE(h)
p=t.N
o=A.I(p,p)
for(;;){p=i.d=B.a.cq(";",j,i.c)
n=i.e=i.c
m=p!=null
p=m?i.e=i.c=p.gO():n
if(!m)break
p=i.d=h.cq(0,j,p)
i.e=i.c
if(p!=null)i.e=i.c=p.gO()
i.dU(s)
if(i.c!==i.e)i.d=null
p=i.d.k(0,0)
p.toString
i.dU("=")
n=i.d=s.cq(0,j,i.c)
l=i.e=i.c
m=n!=null
if(m){n=i.e=i.c=n.gO()
l=n}else n=l
if(m){if(n!==l)i.d=null
n=i.d.k(0,0)
n.toString
k=n}else k=A.Iy(i)
n=i.d=h.cq(0,j,i.c)
i.e=i.c
if(n!=null)i.e=i.c=n.gO()
o.i(0,p,k)}i.pX()
return A.rf(r,q,o)},
$S:110}
A.ri.prototype={
$2(a,b){var s,r,q
A.r(a)
A.r(b)
s=this.a
s.a+="; "+a+"="
r=$.C4()
r=r.b.test(b)
q=s.a
if(r){s.a=q+'"'
r=A.Bf(b,$.BX(),t.tj.a(t.pj.a(new A.rh())),null)
s.a=(s.a+=r)+'"'}else s.a=q+b},
$S:49}
A.rh.prototype={
$1(a){return"\\"+A.u(a.k(0,0))},
$S:34}
A.wK.prototype={
$1(a){var s=a.k(0,1)
s.toString
return s},
$S:34}
A.ke.prototype={
fq(){if(this.a)return
this.a=!0
var s=this.c
if((s.a.a&30)===0)s.bt()}}
A.e5.prototype={
R(){return"AgentMode."+this.b}}
A.of.prototype={}
A.kg.prototype={}
A.fy.prototype={}
A.dx.prototype={
R(){return"CommandConfirm."+this.b}}
A.cf.prototype={
R(){return"PlanApproval."+this.b}}
A.og.prototype={}
A.ok.prototype={
by(a,b,c){return this.qT(a,b,c)},
qT(b3,b4,b5){var s=0,r=A.p(t.T),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2
var $async$by=A.q(function(b6,b7){if(b6===1){o.push(b7)
s=p}for(;;)switch(s){case 0:a9={}
b0=b4
b1=A.e([A.xz(n.oV(b5)),A.xA(b3)],t.wb)
a9.a=null
n.Q=n.z=n.y=!1
n.as=B.cB
n.at=0
g=n.ax
f=g.b
g.a=f==null?$.hj.$0():f
g.b1()
n.fZ()
g=$.bh()
m=g+"[31mai: aborted."+g+"[0m"
g=n.a,f=t.y,e=t.AW,d=n.d,c=n.w.a,b=0
case 3:if(!(b<24)){s=5
break}s=6
return A.f(n.cD(b0),$async$by)
case 6:if(b7){q=n.cE(m)
s=1
break}a=n.o_(b5,a9.a)
l=d.hP(a)
n.nd(a)
k=null
p=8
j=g.aM(b1,l,$.Co)
s=11
return A.f(A.Dq(A.e([j.aZ(new A.on(),f),b0.c.a.aZ(new A.oo(),f)],e),f),$async$by)
case 11:i=b7
s=!i?12:13
break
case 12:s=14
return A.f(n.cD(b0),$async$by)
case 14:if(b7){g=n.cE(m)
q=g
s=1
break}case 13:s=15
return A.f(j,$async$by)
case 15:k=b7
p=2
s=10
break
case 8:p=7
b2=o.pop()
g=A.R(b2)
if(g instanceof A.dr){h=g
q=n.cE("ai: provider error: "+h.a)
s=1
break}else throw b2
s=10
break
case 7:s=2
break
case 10:k.toString
a1=n.as
a2=k.d
n.as=new A.e8(a1.a+a2.a,a1.b+a2.b,a1.c+a2.c,a1.d+a2.d);++n.at
a1=k.a
a3=a1==null?null:B.a.G(a1)
J.fw(b1,new A.ba(B.bj,k.a,k.b,null))
if(a3==null||a3.length===0)a4=null
else if(a===B.aE){a1=$.bh()
a1=a1+"[32m"+a3+a1+"[0m"
a4=a1}else{a1=$.bh()
a1=a1+"[36m"+a3+a1+"[0m"
a4=a1}s=k.b.length===0?16:17
break
case 16:c.$1("")
if(a4!=null)c.$1(a4)
n.jL()
s=18
return A.f(n.eJ(),$async$by)
case 18:a5=b7
if(a5==null){n.fZ()
q=a3
s=1
break}J.fw(b1,new A.ba(B.bi,a5,B.ab,null))
a9.a=null
n.z=n.y=!1
b=-1
s=4
break
case 17:if(a4!=null)c.$1(a4)
a1=k.b,a2=a1.length,a6=!1,a7=0
case 19:if(!(a7<a1.length)){s=21
break}s=22
return A.f(n.h1(a1[a7],b5,new A.op(a9),a9.a),$async$by)
case 22:a8=b7
J.fw(b1,new A.ba(B.cw,null,B.ab,a8.a))
if(a8.b)a6=!0
case 20:a1.length===a2||(0,A.M)(a1),++a7
s=19
break
case 21:if(a6){q=n.cE(null)
s=1
break}s=23
return A.f(n.cD(b0),$async$by)
case 23:if(b7){q=n.cE(m)
s=1
break}case 4:++b
s=3
break
case 5:q=n.cE("ai: stopped after 24 steps without finishing.")
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$by,r)},
fZ(){var s,r=this.w,q=r.f.$0()
if(q!=null){s=$.bh()
r.a.$1(s+"[36m"+q+s+"[0m")}},
cE(a){var s=this.w.a
s.$1("")
if(a!=null)s.$1(a)
this.jL()
this.fZ()
return null},
jL(){var s,r,q=this,p=q.oR(q.as,q.at,A.it(0,0,q.ax.gpR(),0,0,0))
if(p==null)return
s=q.w.a
s.$1("")
r=$.bh()
s.$1(r+"[90m"+p+r+"[0m")},
oR(a,b,c){var s,r,q,p,o,n
if(b===0)return null
s=a.a
r=a.b
q=A.om(s+r)
s=A.om(s)
p=A.om(r)
o=a.c
o=o>0?" \xb7 cached "+A.om(o):""
n=A.e([q+" tokens (in "+s+" \xb7 out "+p+o+")"],t.s)
s=a.d
if(s>0)B.b.j(n,""+B.p.cv(r*1000/s)+" tok/s")
s=b===1?"request":"requests"
B.b.j(n,""+b+" "+s)
B.b.j(n,B.p.i5(B.c.W(c.a,1000)/1000,1)+"s")
return"ai: "+B.b.S(n," \xb7 ")},
eJ(){var s=0,r=A.p(t.T),q,p=this,o,n,m
var $async$eJ=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:m=p.w.r
if(m==null){q=null
s=1
break}s=3
return A.f(m.$0(),$async$eJ)
case 3:o=b
n=o==null?null:J.e1(o)
q=n==null||n.length===0?null:n
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$eJ,r)},
o0(){var s,r,q=this.w,p=q.f.$0()
if(p==null)return
q=q.a
q.$1("")
s=B.a.aQ("\u254c",p.length)
r=$.bh()
q.$1(r+"[35m"+s+r+"[0m")},
cD(a){var s=0,r=A.p(t.y),q,p=this,o
var $async$cD=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:if(!a.a){q=!1
s=1
break}s=!a.b?3:4
break
case 3:o=$.bh()
s=5
return A.f(p.w.b.$1(o+"[35mAbort the AI agent? [y/N] "+o+"[0m"),$async$cD)
case 5:if(!c){a.a=!1
a.c=new A.W(new A.v($.E,t.D),t.h)
q=!1
s=1
break}a.b=!0
case 4:q=!0
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$cD,r)},
o_(a,b){if(a===B.a6&&b!=null&&b!==B.b_||this.y)return B.aE
return B.cv},
nd(a){var s,r,q=this
if(a!==B.aE||q.Q)return
s=q.d
r=s.hP(B.aE)
if(r===s.hP(B.cv))return
q.Q=!0
s=$.bh()
q.w.a.$1(s+"[32m"+("ai: switching to executor model ("+r+")")+s+"[0m")},
h1(a,b,c,d){return this.mS(a,b,t.oM.a(c),d)},
mS(a,b,c,d){var s=0,r=A.p(t.bc),q,p=this,o
var $async$h1=A.q(function(e,f){if(e===1)return A.m(f,r)
for(;;)A:switch(s){case 0:o=a.b
switch(o){case"present_plan":q=p.dw(a,b,c)
s=1
break A
case"run_command":q=p.dz(a,b,d)
s=1
break A
default:q=new A.cn(new A.bu(a.a,o,"Unknown tool: "+o,!0),!1)
s=1
break A}case 1:return A.n(q,r)}})
return A.o($async$h1,r)},
dw(a,b,c){return this.mQ(a,b,t.oM.a(c))},
mQ(a,b,c){var s=0,r=A.p(t.bc),q,p=this,o,n,m,l,k,j,i,h,g,f,e
var $async$dw=A.q(function(d,a0){if(d===1)return A.m(a0,r)
for(;;)switch(s){case 0:e=p.nW(a.c)
p.o0()
o=e.a
if(o!=null&&o.length!==0){n=$.bh()
p.w.a.$1(n+"[36m"+("Plan: "+o)+n+"[0m")}for(o=e.b,n=p.w,m=n.a,l=0;l<o.length;){k=o[l];++l
j=$.bh()
i=j+"[36m"
m.$1(i+("  "+l+". "+k.a)+j+"[0m")
h=k.b
if(h!=null&&h.length!==0)m.$1(i+("     "+h)+j+"[0m")}if(b!==B.a6){q=new A.cn(new A.bu(a.a,a.b,"Plan acknowledged. Proceed by calling run_command for each step; "+b.l(0)+"-mode confirmation rules apply.",!1),!1)
s=1
break}s=3
return A.f(n.d.$1(e),$async$dw)
case 3:g=a0
s=g===B.dw?4:5
break
case 4:o=n.e
o=o==null?null:o.$0()
s=6
return A.f(t.uo.b(o)?o:A.bs(A.Y(o),t.T),$async$dw)
case 6:o=a0
f=o==null?null:J.e1(o)
if(f==null)f=""
o=f.length===0?"The user did not approve the plan and wants changes. Ask what to adjust, or revise it, then call present_plan again.":'The user did not approve the plan and asks: "'+f+'". Revise the plan accordingly and call present_plan again for approval.'
q=new A.cn(new A.bu(a.a,a.b,o,!1),!1)
s=1
break
case 5:c.$1(g)
o=g===B.b_
if(!o)p.z=!1
switch(g.a){case 0:n="User approved the whole plan. Execute the steps with run_command; they will not be re-confirmed."
break
case 1:n="User approved step-by-step. Execute the steps with run_command; each will be confirmed individually."
break
case 2:n=""
break
case 3:n="User cancelled the plan."
break
default:n=null}q=new A.cn(new A.bu(a.a,a.b,n,!1),o)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$dw,r)},
dz(a,b,c){return this.mR(a,b,c)},
mR(a2,a3,a4){var s=0,r=A.p(t.bc),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$dz=A.q(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:b=A.Y(a2.c.k(0,"command"))
a=b==null?null:B.a.G(b)
a0=a==null?"":a
if(J.aE(a0)===0){q=new A.cn(new A.bu(a2.a,a2.b,"No command provided.",!0),!1)
s=1
break}b=n.c
k=n.f
j=b.b
i=b.c.cZ(j.cV(b.fn(A.r(a0),k)))
h=i.a
if(h===B.aO||i.b===B.J){g=n.mt(i)
b=A.u(a0)
k=$.bh()
j=k+"[31m"
f=n.w.a
f.$1(j+("\u26d4 blocked: "+b)+k+"[0m")
f.$1(j+("   "+g)+k+"[0m")
q=new A.cn(new A.bu(a2.a,a2.b,"BLOCKED by command_shield ("+h.b+"/"+i.b.b+"): "+g+". The command was NOT run. Do not retry it; find a safer approach or ask the user.",!0),!1)
s=1
break}s=3
return A.f(n.hg(a0,i,a3,a4),$async$dz)
case 3:if(!a6){q=new A.cn(new A.bu(a2.a,a2.b,u.l,!1),!1)
s=1
break}h=A.u(a0)
f=$.bh()
e=n.w.a
e.$1(f+"[32m"+("$ "+h)+f+"[0m")
m=null
p=5
s=8
return A.f(n.b.c0(a0),$async$dz)
case 8:m=a6
p=2
s=7
break
case 5:p=4
a1=o.pop()
l=A.R(a1)
b=A.u(l)
q=new A.cn(new A.bu(a2.a,a2.b,"Execution failed: "+b,!0),!1)
s=1
break
s=7
break
case 4:s=2
break
case 7:n.y=!j.cV(b.fn(A.r(a0),k)).gkh()
b=t.pi.a(m)
k="exit code: "+b.a+"\n"
j=b.b
if(j.length!==0)k+="stdout:\n"+n.jB(j)+"\n"
b=b.c
b=b.length!==0?k+("stderr:\n"+n.jB(b)+"\n"):k
c=B.a.c2(b.charCodeAt(0)==0?b:b)
if(!n.b.gjZ()){if(B.a.G(m.b).length!==0)e.$1(B.a.c2(m.b))
if(B.a.G(m.c).length!==0)e.$1(B.a.c2(m.c))}if(m.a!==0&&a3===B.a6){n.z=!0
e.$1(f+"[31m"+("ai: command failed (exit "+m.a+") \u2014 adjust the plan and re-confirm before continuing.")+f+"[0m")}b=m.a===0?c:c+"\n\nThis command FAILED or returned an unexpected result. Do not continue the previous plan as-is: diagnose the cause, then call present_plan with an adjusted plan and wait for re-approval before running further changes. The adjusted plan is a CONTINUATION from this failed step: the earlier commands in this conversation already ran (see their results above), so do NOT repeat steps that already succeeded \u2014 include only the fix for this failure and the remaining steps, unless a completed step must be re-done to recover."
q=new A.cn(new A.bu(a2.a,a2.b,b,m.a!==0),!1)
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dz,r)},
hg(a,b,c,d){var s=0,r=A.p(t.y),q,p=this,o
var $async$hg=A.q(function(e,f){if(e===1)return A.m(f,r)
for(;;)A:switch(s){case 0:switch(c.a){case 2:q=!0
s=1
break A
case 0:q=p.c7(a,b)
s=1
break A
case 1:if(d===B.du&&!p.z){q=!0
s=1
break A}if(d===B.dv){q=p.c7(a,b)
s=1
break A}o=p.c
if(o.b.cV(o.fn(a,p.f)).gkh()){q=!0
s=1
break A}q=p.c7(a,b)
s=1
break A}case 1:return A.n(q,r)}})
return A.o($async$hg,r)},
c7(a,b){var s=0,r=A.p(t.y),q,p=this,o,n,m,l,k,j
var $async$c7=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:n=$.bh()
m=n+"[35mRun:"+n+"[0m "+(n+"[33m"+a+n+"[0m")
l=b.b
k=l===B.e?"":n+"[31m"+("["+l.b+"]")+n+"[0m "
j=k+(n+"[35m[y/N]  q=abort  ?=explain: "+n+"[0m")
n=p.w
o=n.c
n=n.a
case 3:n.$1(m)
case 5:s=10
return A.f(o.$1(j),$async$c7)
case 10:switch(d){case B.cP:s=7
break
case B.bx:s=8
break
case B.cQ:s=9
break
default:s=6
break}break
case 7:q=!0
s=1
break
case 8:q=!1
s=1
break
case 9:s=11
return A.f(p.eq(a),$async$c7)
case 11:s=6
break
case 6:s=3
break
case 4:case 1:return A.n(q,r)}})
return A.o($async$c7,r)},
eq(a){return this.mm(a)},
mm(a){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$eq=A.q(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:q=3
j=o.e
n=j==null||B.a.G(j).length===0?"":" Reply in "+B.a.G(j)+"."
j=A.e([A.xz("You explain shell commands. In 1-2 short sentences, say what the command does and call out anything destructive or risky. No preamble, no code fences."+A.u(n)),A.xA(a)],t.wb)
i=o.d
h=i.e
i=h==null?i.b:h
s=6
return A.f(o.a.aM(j,i,B.jQ),$async$eq)
case 6:m=c
i=m.a
l=i==null?null:B.a.G(i)
j=l==null||l.length===0?"(no explanation)":l
i=$.bh()
o.w.a.$1(i+"[36m"+j+i+"[0m")
q=1
s=5
break
case 3:q=2
f=p.pop()
j=A.R(f)
if(j instanceof A.dr){k=j
j=k.a
i=$.bh()
o.w.a.$1(i+"[31m"+("ai: could not explain: "+j)+i+"[0m")}else throw f
s=5
break
case 2:s=1
break
case 5:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$eq,r)},
jB(a){var s=a.length
if(s<=8000)return a
return B.a.m(a,0,4000)+"\n\u2026["+(s-8000)+" chars truncated]\u2026\n"+B.a.D(a,s-4000)},
mt(a){var s,r,q=a.c
if(q.length===0)return"flagged as "+a.b.b
s=A.U(q)
r=s.h("a2<1,a>")
return A.bx(new A.a2(q,s.h("a(1)").a(new A.ol()),r),0,A.dq(3,"count",t.S),r.h("Q.E")).S(0,"; ")},
nW(a){var s,r,q,p,o,n,m
t.G.a(a)
s=a.k(0,"steps")
r=A.e([],t.us)
if(t._.b(s))for(q=J.aN(s),p=t.f;q.q();){o=q.gA()
if(p.b(o)){n=A.Y(o.k(0,"command"))
m=n==null?null:B.a.G(n)
if(m==null||m.length===0)continue
n=A.Y(o.k(0,"explanation"))
B.b.j(r,new A.kg(m,n==null?null:B.a.G(n)))}}q=A.Y(a.k(0,"summary"))
return new A.fy(q==null?null:B.a.G(q),r)},
oV(a){var s,r=this.r,q=r.d,p=q==null?"":"\nWorking directory: "+q
switch(a.a){case 0:q="MODE: standard. Run one command at a time with run_command. The user confirms each command before it runs; if they decline, adapt."
break
case 1:q="MODE: plan. First investigate the node with read-only run_command probes (e.g. detect the OS/distro, package manager, and whether the target is already present). Then call present_plan with the full ordered list of commands. Only after the user approves do you run the mutating steps with run_command. If a step fails or behaves unexpectedly, stop, fix the plan, and call present_plan again for re-approval before resuming. A re-presented plan CONTINUES from the failed step: the steps already executed (and their results) are in the conversation above \u2014 do not repeat ones that already succeeded; present only the fix and the remaining steps."
break
case 2:q="MODE: auto. Investigate, then execute the necessary commands with run_command without asking for confirmation. Be careful and idempotent; dangerous commands are still auto-blocked."
break
default:q=null}s=this.e
s=s==null||B.a.G(s).length===0?"":"\n- Always write every user-facing message (prose, plans, explanations and the final summary) in "+B.a.G(s)+". Keep shell commands, flags, paths and command output unchanged."
return"You are an AI operator embedded in OmnyShell, controlling a remote node through a non-interactive shell. Accomplish the user's goal by running commands.\n\nNode:\n  OS: "+r.a+"\n  Arch: "+r.b+"\n  Hostname: "+r.c+"\n  Shell syntax: "+this.f.b+p+"\n\nRules:\n- Use the run_command tool to inspect the node and to make changes; never assume facts you can verify with a command.\n- No TTY is attached: always use non-interactive flags (e.g. apt-get -y, DEBIAN_FRONTEND=noninteractive) and never launch interactive editors or pagers.\n- A security layer (command_shield) auto-blocks destructive/critical commands; if a command is blocked, do not retry it \u2014 choose a safer approach.\n- Run one command per run_command call. Check exit codes; on failure, diagnose before continuing.\n- If a command fails (non-zero exit) or returns output you did not expect, do not push ahead with the original plan: investigate the cause, then ADJUST your approach. In plan mode, call present_plan again with the corrected plan and wait for the user to re-approve before running further changes. Treat the new plan as a CONTINUATION from the point of failure: the commands already run in this conversation, and their results, are your starting state \u2014 do not re-run steps that already succeeded (they are done and may not be idempotent); plan only the fix and the steps still remaining.\n- When the goal is achieved (or cannot be), reply with a brief plain-text summary and no tool call."+s+"\n\n"+q+"\n"}}
A.on.prototype={
$1(a){t.mL.a(a)
return!0},
$S:122}
A.oo.prototype={
$1(a){return!1},
$S:124}
A.op.prototype={
$1(a){return this.a.a=a},
$S:128}
A.ol.prototype={
$1(a){return t.V.a(a).b},
$S:30}
A.cn.prototype={}
A.kh.prototype={}
A.kl.prototype={}
A.kf.prototype={
R(){return"AgentPhase."+this.b}}
A.ia.prototype={
R(){return"AiProviderKind."+this.b}}
A.i8.prototype={
hP(a){var s,r=this
switch(a.a){case 0:s=r.c
if(s==null)s=r.b
break
case 1:s=r.d
if(s==null)s=r.b
break
default:s=null}return s}}
A.iq.prototype={}
A.fP.prototype={
af(a){var s=0,r=A.p(t.Cj),q,p=this,o,n,m,l,k,j,i
var $async$af=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:a.l4()
o=t.L
s=3
return A.f(B.l.pJ(new A.fG(A.zu(a.y,o))),$async$af)
case 3:n=c
m=a.b
l=m.l(0)
k=t.N
s=4
return A.f(p.a.qH(n,p.b,A.z2(a.r,k,k),a.a,p.c,l),$async$af)
case 4:j=c
l=j.e
if(l!=null)throw A.d(new A.kD(l,m))
i=B.r.Y(j.d)
o=A.zu(i,o)
m=j.b
l=i.length
k=j.c
o=new A.mu(A.Jf(o),a,m,null,l,k,!1,!0)
o.ip(m,l,k,!1,!0,null,a)
q=o
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$af,r)}}
A.fA.prototype={
R(){return"AiRole."+this.b}}
A.ba.prototype={}
A.cc.prototype={}
A.fC.prototype={}
A.bu.prototype={}
A.fB.prototype={
R(){return"AiStopReason."+this.b}}
A.e8.prototype={}
A.ds.prototype={}
A.dr.prototype={
l(a){var s=this.b,r=this.a
return s==null?"AiProviderException: "+r:"AiProviderException("+A.u(s)+"): "+r},
$iaf:1}
A.kn.prototype={
aM(a,b,c){return this.px(t.ei.a(a),b,t.hr.a(c))},
px(b4,b5,b6){var s=0,r=A.p(t.mL),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
var $async$aM=A.q(function(b7,b8){if(b7===1){o.push(b8)
s=p}for(;;)switch(s){case 0:b0=A.U(b4)
b1=b0.h("bI<1,a>")
b2=new A.ae(new A.bI(new A.ae(b4,b0.h("y(1)").a(new A.oA()),b0.h("ae<1>")),b0.h("a(1)").a(new A.oB()),b1),b1.h("y(i.E)").a(new A.oC()),b1.h("ae<i.E>")).S(0,"\n\n")
b1=t.N
b0=t.X
h=A.I(b1,b0)
h.i(0,"model",b5==null?m.a.b:b5)
h.i(0,"max_tokens",4096)
if(b2.length!==0)h.i(0,"system",b2)
if(b6.length!==0){g=A.e([],t.rq)
for(f=b6.length,e=t.K,d=0;d<b6.length;b6.length===f||(0,A.M)(b6),++d){c=b6[d]
g.push(A.G(["name",c.a,"description",c.b,"input_schema",c.c],b1,e))}h.i(0,"tools",g)}h.i(0,"messages",m.lC(b4))
l=h
b=new A.hu()
$.i7()
b.b1()
k=b
j=null
p=4
h=m.a
g=h.r
g=A.hC((g==null?"https://api.anthropic.com":g)+"/v1/messages")
h=A.G(["content-type","application/json","x-api-key",h.f,"anthropic-version","2023-06-01"],b1,b1)
f=B.x.cY(l,null)
s=7
return A.f(m.b.cR("POST",g,t.km.a(h),f,null),$async$aM)
case 7:j=b8
n.push(6)
s=5
break
case 4:p=3
b3=o.pop()
i=A.R(b3)
h=A.i9("request failed: "+A.u(i),null)
throw A.d(h)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h=k
if(h.b==null)h.b=$.hj.$0()
s=n.pop()
break
case 6:if(j.b!==200)throw A.d(A.i9(m.lA(j.gdL()),j.b))
h=j
a0=t.G.a(B.x.bH(A.wJ(A.wh(h.e)).b5(h.w),null))
a1=t.jS.a(a0.k(0,"content"))
if(a1==null)a1=B.aW
a2=new A.T("")
a3=A.e([],t.ti)
for(h=J.aN(a1),g=t.f,f=t.yq;h.q();){a4=h.gA()
if(!g.b(a4))continue
switch(a4.k(0,"type")){case"text":e=A.Y(a4.k(0,"text"))
if(e==null)e=""
a2.a+=e
break
case"tool_use":e=A.Y(a4.k(0,"id"))
if(e==null)e=""
a5=A.Y(a4.k(0,"name"))
if(a5==null)a5=""
a6=f.a(a4.k(0,"input"))
a6=a6==null?null:a6.ak(0,b1,b0)
B.b.j(a3,new A.fC(e,a5,a6==null?B.aY:a6))
break}}b0=a2.a
b0=b0.length===0?null:b0.charCodeAt(0)==0?b0:b0
m.lB(A.Y(a0.k(0,"stop_reason")))
a7=a0.k(0,"usage")
b1=A.yb(j.e,k.ghx())
a7=g.b(a7)?a7:B.bQ
a8=A.dp(a7.k(0,"cache_read_input_tokens"))
a9=A.dp(a7.k(0,"cache_creation_input_tokens"))
q=new A.ds(b0,a3,new A.e8(A.dp(a7.k(0,"input_tokens"))+a8+a9,A.dp(a7.k(0,"output_tokens")),a8,b1))
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$aM,r)},
lC(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f={}
t.ei.a(a)
s=t.d
r=A.e([],s)
f.a=null
q=new A.oz(f,r)
for(p=a.length,o=t.N,n=t.X,m=0;m<a.length;a.length===p||(0,A.M)(a),++m){l=a[m]
switch(l.a.a){case 0:break
case 3:k=l.d
k.toString
j=f.a
if(j==null)j=f.a=A.e([],s)
i=A.I(o,n)
i.i(0,"type","tool_result")
i.i(0,"tool_use_id",k.a)
i.i(0,"content",k.c)
if(k.d)i.i(0,"is_error",!0)
B.b.j(j,i)
break
case 1:q.$0()
k=l.b
B.b.j(r,A.G(["role","user","content",k==null?"":k],o,n))
break
case 2:q.$0()
k=A.e([],s)
j=l.b
if(j!=null&&j.length!==0)k.push(A.G(["type","text","text",j],o,n))
for(j=l.c,i=j.length,h=0;h<j.length;j.length===i||(0,A.M)(j),++h){g=j[h]
k.push(A.G(["type","tool_use","id",g.a,"name",g.b,"input",g.c],o,n))}B.b.j(r,A.G(["role","assistant","content",k],o,n))
break}}q.$0()
return r},
lB(a){var s
A:{if("tool_use"===a){s=B.cy
break A}if("end_turn"===a){s=B.cx
break A}if("max_tokens"===a){s=B.cz
break A}s=B.cA
break A}return s},
lA(a){var s,r,q,p
try{s=t.G.a(B.x.bH(a,null))
r=J.o6(s,"error")
if(t.f.b(r)&&typeof r.k(0,"message")=="string"){q=A.r(r.k(0,"message"))
return q}}catch(p){}return a},
p(){return null},
$ikj:1}
A.oA.prototype={
$1(a){return t.pl.a(a).a===B.bh},
$S:37}
A.oB.prototype={
$1(a){var s=t.pl.a(a).b
return s==null?"":s},
$S:39}
A.oC.prototype={
$1(a){return A.r(a).length!==0},
$S:1}
A.oz.prototype={
$0(){var s=this.a,r=s.a
if(r!=null){B.b.j(this.b,A.G(["role","user","content",r],t.N,t.X))
s.a=null}},
$S:0}
A.l6.prototype={
aM(a,b,c){return this.py(t.ei.a(a),b,t.hr.a(c))},
py(b5,b6,b7){var s=0,r=A.p(t.mL),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4
var $async$aM=A.q(function(b8,b9){if(b8===1){o.push(b9)
s=p}for(;;)switch(s){case 0:b1=A.U(b5)
b2=b1.h("bI<1,a>")
b3=new A.ae(new A.bI(new A.ae(b5,b1.h("y(1)").a(new A.q2()),b1.h("ae<1>")),b1.h("a(1)").a(new A.q3()),b2),b2.h("y(i.E)").a(new A.q4()),b2.h("ae<i.E>")).S(0,"\n\n")
b2=t.N
b1=t.X
h=A.I(b2,b1)
if(b3.length!==0)h.i(0,"system_instruction",A.G(["parts",A.e([A.G(["text",b3],b2,b2)],t.A7)],b2,t.rW))
h.i(0,"contents",m.p0(b5))
if(b7.length!==0){g=A.e([],t.rq)
for(f=b7.length,e=t.K,d=0;d<b7.length;b7.length===f||(0,A.M)(b7),++d){c=b7[d]
g.push(A.G(["name",c.a,"description",c.b,"parameters",c.c],b2,e))}h.i(0,"tools",A.e([A.G(["function_declarations",g],b2,t.zY)],t.ye))}l=h
b=new A.hu()
$.i7()
b.b1()
k=b
j=null
p=4
h=b6==null?m.a.b:b6
g=m.a
f=g.r
h=A.hC((f==null?"https://generativelanguage.googleapis.com":f)+"/v1beta/models/"+h+":generateContent?key="+g.f)
g=A.G(["content-type","application/json"],b2,b2)
f=B.x.cY(l,null)
s=7
return A.f(m.b.cR("POST",h,t.km.a(g),f,null),$async$aM)
case 7:j=b9
n.push(6)
s=5
break
case 4:p=3
b4=o.pop()
i=A.R(b4)
h=A.i9("request failed: "+A.u(i),null)
throw A.d(h)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h=k
if(h.b==null)h.b=$.hj.$0()
s=n.pop()
break
case 6:if(j.b!==200)throw A.d(A.i9(m.mj(j.gdL()),j.b))
h=j
g=t.G
a0=g.a(B.x.bH(A.wJ(A.wh(h.e)).b5(h.w),null))
h=t.jS
a1=h.a(a0.k(0,"candidates"))
if(a1==null||J.bZ(a1))throw A.d(B.ez)
f=t.yq
g=f.a(g.a(J.kb(a1)).k(0,"content"))
a2=h.a(g==null?null:g.k(0,"parts"))
if(a2==null)a2=B.aW
a3=new A.T("")
a4=A.e([],t.ti)
for(h=J.aN(a2),g=t.f,a5=0;h.q();){a6=h.gA()
if(!g.b(a6))continue
if(typeof a6.k(0,"text")=="string"){e=A.r(a6.k(0,"text"))
a3.a+=e}else if(g.b(a6.k(0,"functionCall"))){a7=g.a(a6.k(0,"functionCall"))
a8=A.Y(a7.k(0,"name"))
if(a8==null)a8=""
a9=a5+1
e=f.a(a7.k(0,"args"))
e=e==null?null:e.ak(0,b2,b1)
if(e==null)e=B.aY
B.b.j(a4,new A.fC(a8+"#"+a5,a8,e))
a5=a9}}b1=a3.a
b1=b1.length===0?null:b1.charCodeAt(0)==0?b1:b1
b0=a0.k(0,"usageMetadata")
b2=A.yb(j.e,k.ghx())
b0=g.b(b0)?b0:B.bQ
q=new A.ds(b1,a4,new A.e8(A.dp(b0.k(0,"promptTokenCount")),A.dp(b0.k(0,"candidatesTokenCount")),A.dp(b0.k(0,"cachedContentTokenCount")),b2))
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$aM,r)},
p0(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
t.ei.a(a)
s=t.d
r=A.e([],s)
for(q=a.length,p=t.N,o=t.X,n=t.K,m=t.of,l=t.T,k=t.F4,j=t.A7,i=0;i<a.length;a.length===q||(0,A.M)(a),++i){h=a[i]
switch(h.a.a){case 0:break
case 1:g=h.b
B.b.j(r,A.G(["role","user","parts",A.e([A.G(["text",g==null?"":g],p,p)],j)],p,o))
break
case 3:f=h.d
B.b.j(r,A.G(["role","user","parts",A.e([A.G(["functionResponse",A.G(["name",f.b,"response",A.G(["output",f.c,"is_error",f.d],p,n)],p,n)],p,m)],k)],p,o))
break
case 2:g=A.e([],s)
e=h.b
if(e!=null&&e.length!==0)g.push(A.G(["text",e],p,l))
for(e=h.c,d=e.length,c=0;c<e.length;e.length===d||(0,A.M)(e),++c){b=e[c]
g.push(A.G(["functionCall",A.G(["name",b.b,"args",b.c],p,n)],p,m))}B.b.j(r,A.G(["role","model","parts",g],p,o))
break}}return r},
mj(a){var s,r,q,p
try{s=t.G.a(B.x.bH(a,null))
r=J.o6(s,"error")
if(t.f.b(r)&&typeof r.k(0,"message")=="string"){q=A.r(r.k(0,"message"))
return q}}catch(p){}return a},
p(){return null},
$ikj:1}
A.q2.prototype={
$1(a){return t.pl.a(a).a===B.bh},
$S:37}
A.q3.prototype={
$1(a){var s=t.pl.a(a).b
return s==null?"":s},
$S:39}
A.q4.prototype={
$1(a){return A.r(a).length!==0},
$S:1}
A.lS.prototype={
aM(a,b,c){return this.pz(t.ei.a(a),b,t.hr.a(c))},
pz(b7,b8,b9){var s=0,r=A.p(t.mL),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6
var $async$aM=A.q(function(c1,c2){if(c1===1){o.push(c2)
s=p}for(;;)switch(s){case 0:b3=t.N
b4=t.X
b5=A.I(b3,b4)
b5.i(0,"model",b8==null?m.a.b:b8)
f=A.e([],t.d)
for(e=b7.length,d=0;d<b7.length;b7.length===e||(0,A.M)(b7),++d)B.b.C(f,m.p5(b7[d]))
b5.i(0,"messages",f)
if(b9.length!==0){f=A.e([],t.rq)
for(e=b9.length,c=t.K,d=0;d<b9.length;b9.length===e||(0,A.M)(b9),++d){b=b9[d]
f.push(A.G(["type","function","function",A.G(["name",b.a,"description",b.b,"parameters",b.c],b3,c)],b3,c))}b5.i(0,"tools",f)}l=b5
a=new A.hu()
$.i7()
a.b1()
k=a
j=null
p=4
b5=m.a
f=b5.r
f=A.hC((f==null?"https://api.openai.com":f)+"/v1/chat/completions")
b5=A.G(["content-type","application/json","authorization","Bearer "+b5.f],b3,b3)
e=B.x.cY(l,null)
s=7
return A.f(m.b.cR("POST",f,t.km.a(b5),e,null),$async$aM)
case 7:j=c2
n.push(6)
s=5
break
case 4:p=3
b6=o.pop()
i=A.R(b6)
b5=A.i9("request failed: "+A.u(i),null)
throw A.d(b5)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
b5=k
if(b5.b==null)b5.b=$.hj.$0()
s=n.pop()
break
case 6:if(j.b!==200)throw A.d(A.i9(m.nR(j.gdL()),j.b))
b5=j
f=t.G
a1=f.a(B.x.bH(A.wJ(A.wh(b5.e)).b5(b5.w),null))
b5=t.jS
a2=b5.a(a1.k(0,"choices"))
if(a2==null||J.bZ(a2))throw A.d(B.ey)
a3=f.a(J.kb(a2))
a4=t.c_.a(a3.k(0,"message"))
if(a4==null)a4=B.aY
a5=A.Y(a4.k(0,"content"))
a6=A.e([],t.ti)
b5=b5.a(a4.k(0,"tool_calls"))
b5=J.aN(b5==null?B.aW:b5)
f=t.yq
e=t.f
while(b5.q()){a7=b5.gA()
if(!e.b(a7))continue
a8=f.a(a7.k(0,"function"))
h=B.aY
c=a8==null
g=c?null:a8.k(0,"arguments")
if(typeof g=="string"&&g.length!==0)try{h=e.a(B.x.bH(g,null)).ak(0,b3,b4)}catch(c0){}a9=A.Y(a7.k(0,"id"))
if(a9==null)a9=""
b0=A.Y(c?null:a8.k(0,"name"))
c=b0==null?"":b0
B.b.j(a6,new A.fC(a9,c,h))}b3=a5==null||a5.length===0?null:a5
m.oS(A.Y(a3.k(0,"finish_reason")))
b1=a1.k(0,"usage")
b4=A.yb(j.e,k.ghx())
b1=e.b(b1)?b1:B.bQ
b2=b1.k(0,"prompt_tokens_details")
b5=A.dp(b1.k(0,"prompt_tokens"))
f=A.dp(b1.k(0,"completion_tokens"))
q=new A.ds(b3,a6,new A.e8(b5,f,e.b(b2)?A.dp(b2.k(0,"cached_tokens")):0,b4))
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$aM,r)},
p5(a){var s,r,q,p,o,n,m,l,k
switch(a.a.a){case 0:s=a.b
return A.e([A.G(["role","system","content",s==null?"":s],t.N,t.X)],t.d)
case 1:s=a.b
return A.e([A.G(["role","user","content",s==null?"":s],t.N,t.X)],t.d)
case 3:r=a.d
return A.e([A.G(["role","tool","tool_call_id",r.a,"content",r.c],t.N,t.X)],t.d)
case 2:s=t.N
q=A.I(s,t.X)
q.i(0,"role","assistant")
p=a.b
q.i(0,"content",p==null?"":p)
p=a.c
if(p.length!==0){o=A.e([],t.rq)
for(n=p.length,m=t.K,l=0;l<p.length;p.length===n||(0,A.M)(p),++l){k=p[l]
o.push(A.G(["id",k.a,"type","function","function",A.G(["name",k.b,"arguments",B.x.cY(k.c,null)],s,s)],s,m))}q.i(0,"tool_calls",o)}return A.e([q],t.d)}},
oS(a){var s
A:{if("tool_calls"===a){s=B.cy
break A}if("stop"===a){s=B.cx
break A}if("length"===a){s=B.cz
break A}s=B.cA
break A}return s},
nR(a){var s,r,q,p
try{s=t.G.a(B.x.bH(a,null))
r=J.o6(s,"error")
if(t.f.b(r)&&typeof r.k(0,"message")=="string"){q=A.r(r.k(0,"message"))
return q}}catch(p){}return a},
p(){return null},
$ikj:1}
A.ki.prototype={
gT(){return"ai"},
gaz(){return"Ask an AI agent to investigate and act on the node"},
gda(){return u.q+this.r.b+u.Z},
B(a,b){return this.qU(a,t.a.a(b))},
qU(a4,a5){var s=0,r=A.p(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
var $async$B=A.q(function(a6,a7){if(a6===1){o.push(a7)
s=p}for(;;)A:switch(s){case 0:if(a5.length===0){a4.w.$1("Usage:\n"+(u.q+m.r.b+u.Z))
s=1
break}g=B.b.gI(a5)
if(g==="-h"||g==="--help"||g==="help"){a4.w.$1("Usage:\n"+(u.q+m.r.b+u.Z))
s=1
break}if(g==="status"){f=m.a
e=a4.w
e.$1("ai: "+f.a.b+" / "+f.b+" (mode: "+m.r.b+")")
d=f.c
if(d!=null)e.$1("  planner:  "+d)
d=f.d
if(d!=null)e.$1("  executor: "+d)
f=f.e
if(f!=null)e.$1("  explainer: "+f)
f=m.w
e.$1("  language: "+(f==null?"(model default)":f))
s=1
break}if(g==="mode"){c=A.xy(a5.length>1?a5[1]:null)
if(c==null){a4.w.$1("ai: usage: :ai mode <standard|plan|auto>")
s=1
break}m.r=c
m.e.$1(c)
a4.w.$1("ai: mode set to "+c.b)
s=1
break}if(g==="lang"||g==="language"){if(a5.length<2){f=m.w
if(f==null)f="(model default)"
a4.w.$1("ai: language is "+f)
s=1
break}b=B.a.G(B.b.S(B.b.b2(a5,1)," "))
a=A.Cs(b)
f=a?null:b
m.w=f
m.f.$1(f)
f=a?"ai: language reset to the model default":"ai: language set to "+A.u(m.w)
a4.w.$1(f)
s=1
break}l=m.r
k=m.w
for(a0=a5;a0.length!==0;){a1=m.ne(B.b.gI(a0))
if(a1!=null){l=a1
a0=B.b.b2(a0,1)
continue}if((B.b.gI(a0)==="--lang"||B.b.gI(a0)==="--language")&&a0.length>=2){if(1>=a0.length){q=A.b(a0,1)
s=1
break A}a2=a0[1]
a3=B.a.G(a2).toLowerCase()
k=a3==="off"||a3==="none"||a3==="default"?null:a2
a0=B.b.b2(a0,2)
continue}break}j=B.a.G(B.b.S(a0," "))
if(J.aE(j)===0){a4.w.$1("ai: no prompt given")
s=1
break}i=new A.ke(new A.W(new A.v($.E,t.D),t.h))
f=a4.at
f.$1(i.gqP())
p=3
h=m.lK(a4,l,i,k)
s=6
return A.f(h.by(j,i,l),$async$B)
case 6:n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
f.$1(null)
s=n.pop()
break
case 5:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$B,r)},
ne(a){var s
A:{if("--standard"===a){s=B.ct
break A}if("--plan"===a){s=B.a6
break A}if("--auto"===a){s=B.cu
break A}s=null
break A}return s},
lK(a,b,c,d){var s=this,r=a.b.d,q=s.oU(a.e),p=a.y.$0(),o=a.as,n=o!=null?new A.nw(o):new A.n5(a)
$.i7()
return new A.ok(s.b,n,s.c,s.a,d,q,new A.of(r.a,r.b,r.d,p),new A.og(a.z,new A.oq(a,c),new A.or(a,c),new A.os(s,a,c),new A.ot(s,a),a.ax,new A.ou(s,a)),s.d,B.cB,new A.hu())},
oU(a){var s
switch(a.a){case 0:s=B.bz
break
case 1:s=B.bB
break
case 2:s=B.bA
break
default:s=null}return s}}
A.oq.prototype={
$1(a){return this.kE(A.r(a))},
kE(a){var s=0,r=A.p(t.y),q,p=this,o,n,m
var $async$$1=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:m=J
s=3
return A.f(p.a.x.$1(a),$async$$1)
case 3:n=m.e1(c).toLowerCase()
if(n==="abort"||n==="q"){o=p.b
o.b=!0
o.fq()
q=!1
s=1
break}q=n==="y"||n==="yes"
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$1,r)},
$S:152}
A.or.prototype={
$1(a){var s=0,r=A.p(t.k4),q,p=this,o,n,m
var $async$$1=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:m=J
s=3
return A.f(p.a.x.$1(a),$async$$1)
case 3:n=m.e1(c).toLowerCase()
if(n==="abort"||n==="q"){o=p.b
o.b=!0
o.fq()
q=B.bx
s=1
break}if(n==="?"||n==="explain"){q=B.cQ
s=1
break}q=n==="y"||n==="yes"?B.cP:B.bx
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$1,r)},
$S:160}
A.os.prototype={
$1(a){return this.kD(t.DT.a(a))},
kD(a){var s=0,r=A.p(t.bT),q,p=this,o,n,m
var $async$$1=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:o=$.bh()
m=J
s=3
return A.f(p.b.x.$1(o+"[35mApprove plan? [a]ll / [s]tep-by-step / [t]alk / [N]o / [q]=abort: "+o+"[0m"),$async$$1)
case 3:n=m.e1(c).toLowerCase()
if(n==="abort"||n==="q"){o=p.c
o.b=!0
o.fq()
q=B.b_
s=1
break}A:{if("a"===n||"all"===n){o=B.du
break A}if("s"===n||"step"===n){o=B.dv
break A}if("t"===n||"talk"===n){o=B.dw
break A}o=B.b_
break A}q=o
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$1,r)},
$S:161}
A.ot.prototype={
$0(){var s=0,r=A.p(t.N),q,p=this,o,n
var $async$$0=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:o=$.bh()
n=J
s=3
return A.f(p.b.x.$1(o+"[35mNotes for the agent: "+o+"[0m"),$async$$0)
case 3:q=n.e1(b)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$0,r)},
$S:56}
A.ou.prototype={
$0(){var s=0,r=A.p(t.N),q,p=this,o,n
var $async$$0=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:o=$.bh()
n=J
s=3
return A.f(p.b.x.$1(o+"[35mChat to continue, or [Enter] to end the agent: "+o+"[0m"),$async$$0)
case 3:q=n.e1(b)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$0,r)},
$S:56}
A.nw.prototype={
gjZ(){return!0},
c0(a){var s=0,r=A.p(t.pi),q,p=this,o,n
var $async$c0=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=3
return A.f(p.a.$1(a),$async$c0)
case 3:o=c
n=o.a
if(n==null)n=0
q=new A.iq(n,o.b,"")
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$c0,r)},
$ixw:1}
A.n5.prototype={
gjZ(){return!1},
c0(a){var s=0,r=A.p(t.pi),q,p=this,o,n,m,l
var $async$c0=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:n=p.a
m=n.gc_()
l=n.d
l=l==null?null:l.y
s=3
return A.f(m.k5(a,n.b.a.a,l),$async$c0)
case 3:o=c
q=new A.iq(o.a,B.l.aK(o.b,!0),B.l.aK(o.c,!0))
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$c0,r)},
$ixw:1}
A.l2.prototype={
gdk(){return B.l.aK(this.c,!0)}}
A.d0.prototype={}
A.f1.prototype={
gig(){var s=this.a
return s.length<=8?s:B.a.m(s,0,8)}}
A.f0.prototype={}
A.cd.prototype={}
A.kX.prototype={}
A.d9.prototype={}
A.cX.prototype={}
A.p0.prototype={}
A.kE.prototype={
bG(){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g
var $async$bG=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:h=new A.v($.E,t.D)
o.f=new A.W(h,t.h)
n=A.Jh()
m=null
q=3
s=6
return A.f(n.$1(o.a.a),$async$bG)
case 6:m=b
q=1
s=5
break
case 3:q=2
g=p.pop()
l=A.R(g)
h=A.u(l)
throw A.d(new A.dN("transport_error","Failed to connect to Hub: "+h))
s=5
break
case 2:s=1
break
case 5:o.b=m
j=A.CG(m,1)
o.c=j
i=j.c
o.d=new A.aA(i,A.l(i).h("aA<1>")).qh(o.gnt(),!1,o.gnv())
m.d.a.aZ(new A.p3(o),t.H)
s=7
return A.f(h,$async$bG)
case 7:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$bG,r)},
dA(a){return this.nu(t.An.a(a))},
nu(a){var s=0,r=A.p(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$dA=A.q(function(b,a0){if(b===1)return A.m(a0,r)
for(;;)switch(s){case 0:p=a instanceof A.dA
o=p?a:null
s=p?3:4
break
case 3:s=5
return A.f(q.eC(o),$async$dA)
case 5:s=2
break
case 4:p=a instanceof A.ec
n=p?a:null
if(p){m=B.a.G(n.a)
if(m.length===0)A.K(B.mQ)
p=n.b
l=n.c
q.e=new A.m6(new A.m7(m),p,A.DN(l,A.U(l).c))
p=q.f
if(p!=null&&(p.a.a&30)===0)p.bt()
s=2
break}p=a instanceof A.eb
k=p?a:null
if(p){p=q.f
if(p!=null&&(p.a.a&30)===0)p.a7(new A.ie("auth_failed",k.b))
s=2
break}p=a instanceof A.eC
j=p?a:null
if(p){p=q.r
if(!p.gK(0))p.qL().V(j.a)
s=2
break}p=a instanceof A.eK
i=p?a:null
if(p){h=q.w.a5(0,i.a)
if(h!=null)h.V(new A.bk(Date.now(),0,!1).av().dR(i.b))
s=2
break}p=a instanceof A.er
g=p?a:null
if(p){p=q.x.a5(0,g.a)
if(p!=null)p.V(g.b)
s=2
break}p=a instanceof A.eS
g=p?a:null
if(p){p=q.Q.a5(0,g.a)
if(p!=null){l=g.b
f=g.c
e=g.d
if(e.length===0)e=new Uint8Array(0)
else e=B.ff.Y(e)
p.V(new A.d9(l,f,e,g.e))}s=2
break}p=a instanceof A.es
g=p?a:null
if(p){p=q.as.a5(0,g.a)
if(p!=null)p.V(new A.kX())
s=2
break}p=a instanceof A.ep
g=p?a:null
if(p){p=q.y.a5(0,g.a)
if(p!=null)p.V(new A.d0(g.b,g.c))
s=2
break}p=a instanceof A.e4
g=p?a:null
if(p){p=q.z.a5(0,g.a)
if(p!=null)p.V(new A.cX(g.b,g.c,g.d))
s=2
break}p=a instanceof A.f5
g=p?a:null
if(p){d=q.at.a5(0,g.a)
if(d!=null)d.a.V(new A.f1(g.b,g.c,g.d,d.c,g.e))
s=2
break}p=a instanceof A.f6
g=p?a:null
if(p){p=q.at.a5(0,g.a)
if(p!=null){p=p.a
l=g.c
f=g.b
p.a7(new A.mD(f,l))}s=2
break}p=a instanceof A.f3
g=p?a:null
if(p){p=q.ax.a5(0,g.a)
if(p!=null)p.V(g.b)
s=2
break}p=a instanceof A.f_
g=p?a:null
if(p){p=q.ay.a5(0,g.a)
if(p!=null)p.V(new A.f0(g.b,g.c))
s=2
break}p=a instanceof A.e7
g=p?a:null
if(p){p=q.ch.a5(0,g.a)
if(p!=null)p.V(new A.cd(g.b,g.c,g.d,g.e,g.f,g.r,g.w,g.x,g.y))
s=2
break}p=a instanceof A.cv
g=p?a:null
if(p){p=q.CW.a5(0,g.a)
if(p!=null)p.V(g)
s=2
break}p=a instanceof A.eD
c=p?a:null
s=p?6:7
break
case 6:s=8
return A.f(q.dC(c),$async$dA)
case 8:s=2
break
case 7:s=2
break
case 2:return A.n(null,r)}})
return A.o($async$dA,r)},
eC(a){var s=0,r=A.p(t.H),q=this,p,o
var $async$eC=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:o=q.b
if(o!=null)o.af(new A.aL(new A.dA("client",1,1,null,A.G(["agent","omnyshell-client"],t.N,t.z))))
o=a.d
if(o==null)o=""
s=2
return A.f(q.a.b.hu(o),$async$eC)
case 2:p=c
o=q.b
if(o!=null)o.af(new A.aL(p))
return A.n(null,r)}})
return A.o($async$eC,r)},
eO(a,b,c,d,e){return e.h("H<0>").a(a).kw(c,new A.p1(t.Q.a(b),d))},
dF(a,b,c){return this.eO(a,b,B.cY,"the Hub",c)},
eN(a,b,c,d){return this.eO(a,b,B.cY,c,d)},
og(a,b,c,d){return this.eO(a,b,c,"the Hub",d)},
qc(a){var s,r,q,p=this
t.yz.a(a)
p.b4()
s=new A.v($.E,t.b_)
r=new A.W(s,t.ls)
q=p.r
q.fP(q.$ti.c.a(r))
p.b.af(new A.aL(new A.eB(a)))
return p.dF(s,new A.pa(p,r),t.oD)},
km(){var s,r,q,p=this
p.b4()
s=B.P.bm()
r=new A.v($.E,t.pd)
p.w.i(0,s,new A.W(r,t.zJ))
q=p.b
q.toString
q.af(new A.aL(new A.eJ(s,new A.bk(Date.now(),0,!1).av())))
return p.dF(r,new A.pf(p,s),t.ya)},
cs(a,b,c,d,e,f,g,h,i){return this.qw(t.a.a(a),b,c,t.yz.a(d),e,f,g,h,i)},
qv(a,b,c,d,e,f,g){return this.cs(a,b,c,d,e,f,null,null,g)},
qu(a,b,c,d){return this.cs(B.G,null,null,B.ac,a,b,c,d,null)},
qt(a,b,c){var s=null
return this.cs(B.G,s,s,B.ac,a,b,c,s,s)},
qw(a,b,c,d,e,f,a0,a1,a2){var s=0,r=A.p(t.dS),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$cs=A.q(function(a3,a4){if(a3===1){o.push(a4)
s=p}for(;;)switch(s){case 0:n.b4()
k=n.c
m=k.iG(k.e++)
k=m
j=$.E
i=new A.cg(e,k,new A.W(new A.v(j,t.D),t.h),new A.W(new A.v(j,t.AJ),t.kJ),new A.W(new A.v(j,t.oW),t.xe),B.c_)
k=k.f
k=t.go.a(new A.ac(k,A.l(k).h("ac<1>")).aE(i.go7()))
i.f!==$&&A.ax("_controlSub")
i.f=k
l=i
k=n.b
k.toString
k.af(new A.aL(new A.eO(m.a,f,e,b,a,d,c,a0,a1,a2)))
p=4
s=7
return A.f(l.c.a,$async$cs)
case 7:p=2
s=6
break
case 4:p=3
g=o.pop()
k=n.c
k.toString
s=8
return A.f(k.dN(m.a),$async$cs)
case 8:throw g
s=6
break
case 3:s=2
break
case 6:q=l
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$cs,r)},
qe(a){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.fb)
q.x.i(0,s,new A.W(r,t.BU))
q.b.af(new A.aL(new A.eq(s,a)))
return q.eN(r,new A.pb(q,s),'node "'+a+'"',t.zA)},
fb(){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.er)
q.ch.i(0,s,new A.W(r,t.Df))
q.b.af(new A.aL(new A.e6(s)))
return q.dF(r,new A.p8(q,s),t.Aa)},
qH(a,b,c,d,e,f){var s,r,q=this
t.yz.a(c)
q.b4()
s=B.P.bm()
r=new A.v($.E,t.kC)
q.CW.i(0,s,new A.W(r,t.Fn))
q.b.af(new A.aL(new A.ew(s,d,f,c,a,b,e)))
return q.og(r,new A.pg(q,s),B.i7,t.tf)},
qE(a,b){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.D1)
q.Q.i(0,s,new A.W(r,t.uf))
q.b.af(new A.aL(new A.eR(s,a,b)))
return q.eN(r,new A.pe(q,s),'node "'+a+'"',t.aC)},
pO(a,b){var s,r,q,p=this
p.b4()
s=B.P.bm()
r=new A.v($.E,t.a8)
p.z.i(0,s,new A.W(r,t.w6))
q=p.b
q.af(new A.aL(new A.e3(s,a,b,null)))
return p.eN(r,new A.p4(p,s),'node "'+a+'"',t.tR)},
q9(a,b){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.w7)
q.y.i(0,s,new A.W(r,t.hs))
q.b.af(new A.aL(new A.eo(s,a,b)))
return q.eN(r,new A.p9(q,s),'node "'+a+'"',t.v4)},
ck(a,b,c,d){var s=0,r=A.p(t.eJ),q,p=this,o,n,m,l
var $async$ck=A.q(function(e,f){if(e===1)return A.m(f,r)
for(;;)switch(s){case 0:o=t.eE
n=new A.dQ(A.e([],o))
m=new A.dQ(A.e([],o))
l=A
s=3
return A.f(p.cl(B.G,a,b,B.ac,c,m.gbh(m),n.gbh(n),d),$async$ck)
case 3:q=new l.l2(f,n.ft(),m.ft())
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$ck,r)},
k5(a,b,c){return this.ck(a,null,b,c)},
pU(a,b){return this.ck(a,null,b,null)},
cl(a,b,c,d,e,f,g,h){var s
t.a.a(a)
t.yz.a(d)
s=t.eU
s.a(g)
return this.pW(a,b,c,d,e,s.a(f),g,h)},
pV(a,b,c,d,e,f){return this.cl(B.G,a,b,B.ac,c,d,e,f)},
pW(a,b,c,d,e,f,g,h){var s=0,r=A.p(t.S),q,p=this,o,n,m,l,k,j
var $async$cl=A.q(function(i,a0){if(i===1)return A.m(a0,r)
for(;;)switch(s){case 0:s=3
return A.f(p.qv(a,b,c,d,B.dH,e,h),$async$cl)
case 3:m=a0
l=m.b
k=l.d
j=new A.ac(k,A.l(k).h("ac<1>")).aa(0,new A.p5(m,g))
l=l.e
o=new A.ac(l,A.l(l).h("ac<1>")).aa(0,new A.p6(m,f))
s=4
return A.f(m.d.a,$async$cl)
case 4:n=a0
s=5
return A.f(A.Dr(A.e([j,o],t.iJ),t.H).bF(new A.p7()),$async$cl)
case 5:q=n
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$cl,r)},
j_(){var s,r,q,p,o,n=this
n.e=null
s=n.f
if(s!=null&&(s.a.a&30)===0)s.a7(B.pz)
for(s=n.r,r=A.FD(s,s.$ti.c),q=r.$ti.c;r.q();){p=r.e
if(p==null)p=q.a(p)
if(!p.gaN())p.a7(B.M)}s.a0(0)
for(s=n.w,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.x,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.y,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.z,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.Q,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.as,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.at,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d.a
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.ax,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.ay,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.ch,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
for(s=n.CW,r=new A.aq(s,s.r,s.e,A.l(s).h("aq<2>"));r.q();){q=r.d
if(!q.gaN())q.a7(B.M)}s.a0(0)
s=n.cx
r=A.l(s).h("c2<2>")
r=A.N(new A.c2(s,r),r.h("i.E"))
q=r.length
o=0
for(;o<q;++o)r[o].p()
s.a0(0)
n.a.f.$0()},
qy(a,b,c,d){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.h6)
q.at.i(0,s,new A.jM(new A.W(r,t.EM),a,d))
q.b.af(new A.aL(new A.f4(s,a,"localhost",d,b,c)))
return q.eO(r,new A.pd(q,s),B.i9,'node "'+a+'"',t.tg)},
qf(){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.jT)
q.ax.i(0,s,new A.W(r,t.jY))
q.b.af(new A.aL(new A.f2(s)))
return q.dF(r,new A.pc(q,s),t.BV)},
pB(a){var s,r,q=this
q.b4()
s=B.P.bm()
r=new A.v($.E,t.bD)
q.ay.i(0,s,new A.W(r,t.v6))
q.b.af(new A.aL(new A.eZ(s,a)))
return q.dF(r,new A.p2(q,s),t.tr)},
dC(a){var s=0,r=A.p(t.H),q,p=this,o,n,m,l
var $async$dC=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:l=p.c
if(l==null){s=1
break}o=a.a
if(l.b.ag(o))A.K(A.aC("Channel "+o+" already exists"))
l.iG(o)
n=new A.nP()
m=p.cx
m.i(0,o,n)
s=6
return A.f(n.bG(),$async$dC)
case 6:s=c?3:5
break
case 3:m=p.b
if(m!=null)m.af(new A.aL(new A.eF(o,a.b)))
s=4
break
case 5:m.a5(0,o)
m=p.b
if(m!=null)m.af(new A.aL(new A.eE(o,a.b,"dial_failed","could not reach "+a.c+":"+a.d)))
s=7
return A.f(l.dN(o),$async$dC)
case 7:case 4:case 1:return A.n(q,r)}})
return A.o($async$dC,r)},
b4(){var s=this.b
if(s==null||!s.e)throw A.d(B.py)},
p(){var s=0,r=A.p(t.H),q=this,p,o
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:o=q.d
o=o==null?null:o.U()
p=t.H
s=2
return A.f(o instanceof A.v?o:A.bs(o,p),$async$p)
case 2:o=q.c
o=o==null?null:o.ah()
s=3
return A.f(o instanceof A.v?o:A.bs(o,p),$async$p)
case 3:o=q.b
o=o==null?null:o.p()
s=4
return A.f(o instanceof A.v?o:A.bs(o,p),$async$p)
case 4:q.e=q.c=q.b=null
return A.n(null,r)}})
return A.o($async$p,r)}}
A.p3.prototype={
$1(a){return this.a.j_()},
$S:58}
A.p1.prototype={
$0(){this.a.$0()
throw A.d(A.F1("No response from "+this.b,null))},
$S:62}
A.pa.prototype={
$0(){return this.a.r.a5(0,this.b)},
$S:0}
A.pf.prototype={
$0(){return this.a.w.a5(0,this.b)},
$S:0}
A.pb.prototype={
$0(){return this.a.x.a5(0,this.b)},
$S:0}
A.p8.prototype={
$0(){return this.a.ch.a5(0,this.b)},
$S:0}
A.pg.prototype={
$0(){return this.a.CW.a5(0,this.b)},
$S:0}
A.pe.prototype={
$0(){return this.a.Q.a5(0,this.b)},
$S:0}
A.p4.prototype={
$0(){return this.a.z.a5(0,this.b)},
$S:0}
A.p9.prototype={
$0(){return this.a.y.a5(0,this.b)},
$S:0}
A.p5.prototype={
$1(a){t.p.a(a)
if(!B.H.gK(a))this.a.ee(a.length)
this.b.$1(a)},
$S:18}
A.p6.prototype={
$1(a){t.p.a(a)
if(!B.H.gK(a))this.a.ee(a.length)
this.b.$1(a)},
$S:18}
A.p7.prototype={
$1(a){return B.jT},
$S:64}
A.pd.prototype={
$0(){return this.a.at.a5(0,this.b)},
$S:0}
A.pc.prototype={
$0(){return this.a.ax.a5(0,this.b)},
$S:0}
A.p2.prototype={
$0(){return this.a.ay.a5(0,this.b)},
$S:0}
A.wv.prototype={
$1(a){return A.r(a).length===0},
$S:1}
A.pj.prototype={
gn(a){return this.a.length},
j(a,b){var s
if(B.a.G(b).length===0)return!1
s=this.a
if(s.length!==0&&B.b.gaX(s)===b)return!1
B.b.j(s,b)
this.iu()
return!0},
iu(){var s=this.a,r=s.length,q=this.b
if(r>q)B.b.e9(s,0,r-q)}}
A.qx.prototype={
rk(a,b){var s,r,q,p=this,o=A.cO(p.a.a,t.N),n=p.b
if(n===0)return null
s=o.length
if(n===s){p.c=a
p.d=b}r=p.d
if(r==null)r=""
for(q=n-1;q>=0;--q){if(!(q<s))return A.b(o,q)
n=o[q]
if(B.a.u(n,r)){p.b=q
return n}}return null},
pQ(){var s,r,q=this,p=A.cO(q.a.a,t.N),o=q.b,n=p.length
if(o>=n)return null
s=q.d
if(s==null)s=""
for(r=o+1;r<n;++r){if(!(r>=0))return A.b(p,r)
o=p[r]
if(B.a.u(o,s)){q.b=r
return o}}q.b=n
return q.c},
ct(){var s=this
s.b=s.a.a.length
s.c=""
s.d=null}}
A.pw.prototype={}
A.pu.prototype={
gcz(){var s=this.a,r=B.c.W(s.length,2)
return new A.aD(B.a.m(s,0,r),B.a.D(s,r))},
pY(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=null,a5=this.b
B.b.C(a5,a6)
s=new A.dQ(A.e([],t.eE))
r=B.r.Y(this.a)
for(q=a5.$flags|0,p=t.L,o=r.length,n=t.s,m=a4,l=m,k=l,j=k,i=j,h=!1;g=a4,!0;h=!0){f=A.D_(a5,r)
if(f<0)break
e=f+o
d=B.b.a_(a5,10,e)
if(d<0){g=f
break}s.j(0,new Uint8Array(A.c9(B.b.aq(a5,0,f))))
if(d>e){c=d-1
if(!(c<a5.length))return A.b(a5,c)
c=a5[c]===13}else c=!1
e=p.a(B.b.aq(a5,e,c?d-1:d))
b=new A.hS(!0).fT(e,0,a4,!0)
if(B.a.t(b,"\x1b")){e=$.Bm()
b=A.ad(b,e,"")}if(b.length!==0){a=A.e(b.split("\t"),n)
if(0>=a.length)return A.b(a,0)
i=a[0]
j=A.pv(a,1)
k=A.pv(a,2)
l=A.pv(a,3)
a0=A.pv(a,4)
if(a0!=null)m=A.bJ(a0,a4)}a1=d+1
q&1&&A.ai(a5,18)
A.aR(0,a1,a5.length)
a5.splice(0,a1)}if(g!=null){if(g>0){s.j(0,new Uint8Array(A.c9(B.b.aq(a5,0,g))))
B.b.e9(a5,0,g)}}else{a2=A.D0(a5,r)
p=a5.length
if(p>a2){a3=p-a2
s.j(0,new Uint8Array(A.c9(B.b.aq(a5,0,a3))))
B.b.e9(a5,0,a3)}}return new A.pw(s.ft(),i,j,k,l,h,m)}}
A.fx.prototype={}
A.fz.prototype={}
A.ma.prototype={
gjT(){return!0},
gky(){return""},
bJ(a,b,c){return this.kT(a,t.dN.a(b),c)},
kT(a2,a3,a4){var s=0,r=A.p(t.N),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$bJ=A.q(function(a5,a6){if(a5===1)return A.m(a6,r)
for(;;)switch(s){case 0:e=a2.b
d=t.wb
e=A.e([A.xz(e.length===0?"You are an AI code assistant embedded in the OmnyShell terminal IDE. You can read, write, and edit files, list directories, search, and run commands via the provided tools. Prefer replace_in_file for small edits and write_file for new or fully-rewritten files. Make the requested changes directly, then briefly summarise what you did. Keep prose concise and terminal-friendly.":"You are an AI code assistant embedded in the OmnyShell terminal IDE. You can read, write, and edit files, list directories, search, and run commands via the provided tools. Prefer replace_in_file for small edits and write_file for new or fully-rewritten files. Make the requested changes directly, then briefly summarise what you did. Keep prose concise and terminal-friendly.\n\n"+e)],d)
for(o=a3.length,n=0;n<a3.length;a3.length===o||(0,A.M)(a3),++n){m=a3[n]
B.b.C(e,A.e([new A.ba(B.bi,m.a,B.ab,null),new A.ba(B.bj,m.b,B.ab,null)],d))}e.push(A.xA(a4))
l=new A.T("")
d=p.a,o=p.b,k=0
case 3:if(!(k<12)){s=5
break}s=6
return A.f(d.aM(e,o,B.j7),$async$bJ)
case 6:j=a6
i=j.a
h=i==null?null:B.a.G(i)
if(h!=null&&h.length!==0)l.a+=h+"\n"
g=j.b
if(g.length===0){s=5
break}B.b.j(e,new A.ba(B.bj,i,g,null))
i=g.length,n=0
case 7:if(!(n<g.length)){s=9
break}c=B.b
b=e
a=A
a0=B.cw
a1=B.ab
s=10
return A.f(p.bE(g[n],l),$async$bJ)
case 10:c.j(b,new a.ba(a0,null,a1,a6))
case 8:g.length===i||(0,A.M)(g),++n
s=7
break
case 9:case 4:++k
s=3
break
case 5:e=l.a
f=B.a.G(e.charCodeAt(0)==0?e:e)
q=f.length===0?"(no response)":f
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$bJ,r)},
bE(a,b){return this.op(a,b)},
op(a,a0){var s=0,r=A.p(t.xR),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b
var $async$bE=A.q(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:h=n.c
g=new A.rU(a)
f=new A.rW(a)
e=new A.rV(a)
p=4
j=a.b
case 7:switch(j){case"read_file":s=9
break
case"write_file":s=10
break
case"replace_in_file":s=11
break
case"list_directory":s=12
break
case"search_text":s=13
break
case"run_command":s=14
break
default:s=15
break}break
case 9:c=f
s=16
return A.f(h.ba(g.$1("path")),$async$bE)
case 16:j=c.$1(a2)
q=j
s=1
break
case 10:s=17
return A.f(h.bb(g.$1("path"),g.$1("content")),$async$bE)
case 17:j="\u270e wrote "+A.u(g.$1("path"))+"\n"
a0.a+=j
j=f.$1("wrote "+A.u(g.$1("path")))
q=j
s=1
break
case 11:s=18
return A.f(h.d8(g.$1("path"),g.$1("old_string"),g.$1("new_string")),$async$bE)
case 18:j="\u270e edited "+A.u(g.$1("path"))+"\n"
a0.a+=j
j=f.$1("edited "+A.u(g.$1("path")))
q=j
s=1
break
case 12:c=f
b=J
s=19
return A.f(h.bk(g.$1("path")),$async$bE)
case 19:j=c.$1(b.yr(a2,"\n"))
q=j
s=1
break
case 13:j=A.r(g.$1("query"))
s=20
return A.f(h.a.eS(j),$async$bE)
case 20:m=a2
j=J.bZ(m)?"(no matches)":J.yr(m,"\n")
j=f.$1(j)
q=j
s=1
break
case 14:j="$ "+A.u(g.$1("command"))+"\n"
a0.a+=j
j=A.r(g.$1("command"))
s=21
return A.f(h.a.eP(j),$async$bE)
case 21:l=a2
if(J.e1(l).length!==0){j=J.Ck(l)+"\n"
a0.a+=j}j=f.$1(l)
q=j
s=1
break
case 15:j=e.$1("unknown tool: "+j)
q=j
s=1
break
case 8:p=2
s=6
break
case 4:p=3
d=o.pop()
k=A.R(d)
j="\u26a0 "+a.b+" failed: "+A.u(k)+"\n"
a0.a+=j
j=e.$1(A.u(k))
q=j
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$bE,r)},
p(){return this.a.p()},
$ixv:1}
A.rU.prototype={
$1(a){var s=this.a.c.k(0,a)
s=s==null?null:J.b9(s)
return s==null?"":s},
$S:6}
A.rW.prototype={
$1(a){var s=this.a
return new A.bu(s.a,s.b,a,!1)},
$S:29}
A.rV.prototype={
$1(a){var s=this.a
return new A.bu(s.a,s.b,a,!0)},
$S:29}
A.mE.prototype={
gjT(){return!1},
gky(){return"No AI provider configured. Set ANTHROPIC_API_KEY (or OPENAI_API_KEY / GEMINI_API_KEY), or run :ai to configure ~/.omnyshell/ai.yaml."},
bJ(a,b,c){return this.kU(a,t.dN.a(b),c)},
kU(a,b,c){var s=0,r=A.p(t.N),q
var $async$bJ=A.q(function(d,e){if(d===1)return A.m(e,r)
for(;;)switch(s){case 0:q=A.K(A.aC("no AI provider configured"))
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$bJ,r)},
p(){},
$ixv:1}
A.oh.prototype={
hD(a){var s,r,q=this
switch(a.a.a){case 1:q.oT()
break
case 4:s=q.r
r=s.length
if(r!==0)q.r=B.a.m(s,0,r-1)
break
case 0:q.r=q.r+a.ga1()
q.w=0
break
case 13:q.w+=5
break
case 14:q.w=B.c.M(q.w-5,0,1073741824)
break
case 11:q.w=1073741824
break
case 12:q.w=0
break
default:break}},
oT(){var s,r,q,p=this,o=B.a.G(p.r)
p.r=""
p.w=0
if(o.length===0)return
p.cF("\u203a "+o)
s=p.a
if(!s.gjT()){p.cF(s.gky())
return}if(p.x){p.cF("Please wait for the current response\u2026")
return}p.x=!0
r=p.d
q=A.N(p.f,t.mI)
s.bJ(r,q,o).aZ(new A.oi(p,o),t.c).bF(new A.oj(p))},
cF(a){var s,r,q,p
for(s=a.split("\n"),r=s.length,q=this.e,p=0;p<r;++p)B.b.j(q,s[p])
s=q.length
if(s>2000)B.b.e9(q,0,s-2000)}}
A.oi.prototype={
$1(a){var s
A.r(a)
s=this.a
s.x=!1
s.cF(a)
s.cF("")
B.b.j(s.f,new A.fz(this.b,a))
s.b.$0()},
$S:66}
A.oj.prototype={
$1(a){var s
A.ap(a)
s=this.a
s.x=!1
s.cF("[error: "+A.u(a)+"]")
s.b.$0()},
$S:7}
A.l8.prototype={
dV(){var s=0,r=A.p(t.kx),q,p=this,o
var $async$dV=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:s=3
return A.f(p.cJ("git status --porcelain"),$async$dV)
case 3:o=b
if(o==null){q=B.dr
s=1
break}q=A.J_(o)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$dV,r)},
dZ(a,b){var s=0,r=A.p(t.vl),q,p=this,o,n,m,l
var $async$dZ=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:m=$.b3().e8(a,p.b)
l=A.ad(m,"\\","/")
s=3
return A.f(p.dV(),$async$dZ)
case 3:if(d.k(0,l)===B.aQ){m=A.I(t.S,t.wV)
for(o=1;o<=b;++o)m.i(0,o,B.bH)
q=new A.fW(m,B.dQ)
s=1
break}s=4
return A.f(p.cJ("git diff -U0 --no-color -- "+("'"+A.ad(l,"'","'\\''")+"'")),$async$dZ)
case 4:n=d
if(n==null||B.a.G(n).length===0){q=B.bL
s=1
break}q=A.J0(n)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$dZ,r)},
f7(){var s=0,r=A.p(t.T),q,p=this,o,n
var $async$f7=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:s=3
return A.f(p.cJ("git rev-parse --abbrev-ref HEAD"),$async$f7)
case 3:o=b
n=o==null?null:B.a.G(o)
if(n==null||n.length===0){q=null
s=1
break}q=n==="HEAD"?"(detached)":n
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$f7,r)},
cJ(a){return this.oh(a)},
oh(a){var s=0,r=A.p(t.T),q,p=2,o=[],n=this,m,l,k,j
var $async$cJ=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(n.a.d_(a,n.b),$async$cJ)
case 7:m=c
if(m.a!==0){q=null
s=1
break}l=m.b
q=l
s=1
break
p=2
s=6
break
case 4:p=3
j=o.pop()
q=null
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$cJ,r)}}
A.bH.prototype={
R(){return"GitFileStatus."+this.b}}
A.fO.prototype={
R(){return"GutterMark."+this.b}}
A.fW.prototype={}
A.vJ.prototype={}
A.fN.prototype={
R(){return"Focus."+this.b}}
A.jI.prototype={}
A.vn.prototype={}
A.lc.prototype={
bl(){return this.qW()},
qW(){var s=0,r=A.p(t.H),q=1,p=[],o=[],n=this,m,l,k,j,i,h,g
var $async$bl=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:j={}
i=n.c
h=t.L
g=i.b.a
g.write(new Uint8Array(A.c9(h.a(B.r.Y("\x1b[?1049h\x1b[2J\x1b[H\x1b[?25l")))))
i.a=null
m=new A.r4(A.e([],t.t))
j.a=null
l=null
q=2
s=5
return A.f(A.q7(n.a,n.b),$async$bl)
case 5:n.e=b
k=n.f
s=6
return A.f(k.bO(k.b),$async$bl)
case 6:s=7
return A.f(n.bS(),$async$bl)
case 7:n.cK()
j.a=i.c.bv(new A.qT(j,n,m),n.gmu(),new A.qU(n))
l=i.d.aE(new A.qV(n))
s=8
return A.f(n.ok.a,$async$bl)
case 8:o.push(4)
s=3
break
case 2:o=[1]
case 3:q=1
j=j.a
j=j==null?null:j.U()
k=t.H
s=9
return A.f(j instanceof A.v?j:A.bs(j,k),$async$bl)
case 9:j=l
j=j==null?null:j.U()
s=10
return A.f(j instanceof A.v?j:A.bs(j,k),$async$bl)
case 10:j=n.cx
j=j==null?null:j.ah()
s=11
return A.f(j instanceof A.v?j:A.bs(j,k),$async$bl)
case 11:j=n.dy
if(j!=null&&(j.c.a.a&30)===0)j.c.V(!1)
j=n.x
if(j!=null)j.p()
s=12
return A.f(n.a.p(),$async$bl)
case 12:g.write(new Uint8Array(A.c9(h.a(B.r.Y("\x1b[0m\x1b[?25h\x1b[?1049l")))))
i.a=null
s=o.pop()
break
case 4:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$bl,r)},
mv(){var s=this.ok
if((s.a.a&30)===0)s.bt()},
cK(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=this,b3=null,b4=b2.c,b5=b4.b.gc4(),b6=b5.a,b7=b5.b,b8=b6<0?0:b6,b9=new A.t6(b6,b7,A.bU(b8*(b7<0?0:b7),B.cM,!1,t.gc))
b9.pA(0,B.U)
s=new A.d8(0,0,b6,b7)
r=s.fH(1)
q=r.a
p=b7>=6
o=p?q.fH(1):new A.aD(q,B.dE)
n=o.a
if((b2.cy||b2.dx)&&n.d>=8){b8=n.d
m=n.fH(B.c.M(B.p.cv(b8*0.4),5,b8-4))
l=m.a
k=m.b}else{l=n
k=B.dE}j=b2.pc(b6)
i=l.ii(j)
h=i.a
b8=j>0?1:0
g=i.b.ii(b8)
f=g.a
if(!f.gK(0))for(e=f.b,b8=e+f.d,d=f.a;e<b8;++e)b9.aR(d,e,"\u2502",B.oY)
c=b2.f.dc()
b8=b2.ch
d=c.length
if((b8>=d?b2.ch=d-1:b8)<0)b2.ch=0
b2.mi(h.d)
if(!h.gK(0)){b8=b2.ch
d=b2.CW
A.Dn(b9,h,b2.ay===B.C,c,d,b8,new A.qM(b2))}b=g.b.ij(1)
a=b.b
b8=b2.at
A.EV(b9,b.a,b2.ax,b8)
d=b2.ax
if(d>=0){if(!(d<b8.length))return A.b(b8,d)
a0=b8[d]}else a0=b3
b8=a0==null
if(!b8)a1=A.Di(b9,a,b2.ay===B.I,a0,B.h4)
else{if(!a.gK(0))b2.oc(b9,a)
a1=b3}if(b2.cy&&b2.cx!=null&&!k.gK(0)){d=b2.cx
d.toString
a2=A.F_(b9,k,b2.ay===B.aa,d)
if(b2.ay===B.aa)a1=a2}else if(b2.dx&&b2.db!=null&&!k.gK(0)){d=b2.db
d.toString
a3=A.Cr(b9,k,b2.ay===B.am,d)
if(b2.ay===B.am)a1=a3}if(p)A.Dx(b9,o.b,b2.ay===B.C)
a4=b8?b3:a0.a
d=b8?b2.b:b2.ds(a0.a.a)
a5=a4==null
a6=a5?b3:a4.x
a7=a5?b3:a4.e
a8=a5?b3:a4.f
if(a8==null)a8=0
a5=a5?b3:a4.r
if(a5==null)a5=0
b8=b8?b3:a0.b.gdY()
if(b8==null)b8="OmnyShell IDE"
A.EP(b9,r.b,b2.fx,a5+1,a6===!0,b8,a8+1,b2.fy,b2.go,d,a7===!0)
a9=b2.k2
b8=a9==null
if(!b8){d=a9.a
a5=a9.e
a1=A.yV(b9,s,a9.b,d,a5)}b0=b2.dy
d=b0==null
if(!d){a5=b0.a
A.yV(b9,s,b0.b,"Run command?",a5)}if(d)if(b8){b8=b2.ay
b8=b8===B.I||b8===B.aa||b8===B.am
b1=b8}else b1=!0
else b1=!1
if(a1!=null&&b1)b4.kn(b9,a1.a,a1.b)
else b4.qG(b9)},
oc(a,b){var s,r,q,p,o,n,m,l=B.U.hs(!0,B.al),k=B.U.cj(B.bu),j=B.U.cj(B.ak),i=B.U.hs(!0,B.hb),h=B.U.hs(!0,B.al),g=A.e([],t.ga),f=new A.qE(g),e=new A.qG(g,a),d=new A.qI(g,a,i),c=new A.qK(g,a,h,j)
e.$2("\u25c6  OmnyShell IDE",l)
e.$2("v1.56.1",k)
f.$0()
e.$2("Open a file from the tree and press Enter to edit.",j)
f.$0()
d.$1("File tree")
s=t.kd
c.$1(A.e([B.dA,B.dy,B.dB],s))
f.$0()
d.$1("Editor")
c.$1(A.e([B.dz,B.dC,B.mY],s))
c.$1(A.e([B.mW,B.dD,B.mV],s))
f.$0()
d.$1("Panels")
c.$1(A.e([B.n4,B.mT,B.dx],s))
s=b.b
r=b.d
q=s+B.c.M(B.c.W(r-g.length,2),0,r)
p=b.c
o=b.a+B.c.M(B.c.W(p-60,2),0,p)
for(r=s+r,n=0;n<g.length;++n){m=q+n
if(m<s||m>=r)continue
g[n].$2(o,m)}},
pc(a){if(a<40)return this.ay===B.C?a:0
return B.c.M(B.p.cv(a*0.28),20,46)},
mi(a){var s,r,q=this
if(a<=0)return
s=q.ch
r=q.CW
if(s<r){q.CW=s
r=s}if((s>=r+a?q.CW=s-a+1:r)<0)q.CW=0},
bC(a){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k,j
var $async$bC=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:j=p.dy
if(j!=null){o=a.a
if(o!==B.d4)if(o===B.av){n=a.ga1()==="y"||a.ga1()==="Y"
m=n}else m=!1
else m=!0
if(o!==B.aw)if(o===B.av){o=a.ga1()==="n"||a.ga1()==="N"
l=o}else l=!1
else l=!0
if(m){p.dy=null
j.c.V(!0)}else if(l){p.dy=null
j.c.V(!1)}s=1
break}k=p.k2
s=k!=null?3:4
break
case 3:s=5
return A.f(p.es(a,k),$async$bC)
case 5:s=1
break
case 4:o=!1
if(p.fy!=null){n=a.a===B.bJ
if(!(n&&a.c==="q"))o=!(n&&a.c==="w")}if(o){p.fy=null
p.go=!1}o=a.a
n=o===B.bJ
if(n&&a.c==="q"){p.k1=!1
p.pe()
s=1
break}if(n&&a.c==="w"){p.id=!1
p.lP()
s=1
break}p.k1=p.id=!1
s=n&&a.c==="s"?6:7
break
case 6:s=8
return A.f(p.cP(),$async$bC)
case 8:s=1
break
case 7:if(n&&a.c==="b"){if(p.ay===B.C){if(p.at.length!==0)p.ay=B.I}else p.ay=B.C
s=1
break}s=n&&a.c==="n"?9:10
break
case 9:s=11
return A.f(p.dI(1),$async$bC)
case 11:s=1
break
case 10:s=n&&a.c==="p"?12:13
break
case 12:s=14
return A.f(p.dI(-1),$async$bC)
case 14:s=1
break
case 13:if(n&&a.c==="l"){p.o3()
s=1
break}if(n&&a.c==="f"){p.o2()
s=1
break}if(n&&a.c==="t"){p.pa()
s=1
break}s=n&&a.c==="a"?15:16
break
case 15:s=17
return A.f(p.eW(),$async$bC)
case 17:s=1
break
case 16:n=p.ay
if(n===B.aa){if(o===B.aw)p.ay=p.at.length!==0?B.I:B.C
else{o=p.cx
if(o!=null)o.hD(a)}s=1
break}if(n===B.am){if(o===B.aw)p.ay=p.at.length!==0?B.I:B.C
else{o=p.db
if(o!=null)o.hD(a)}s=1
break}s=n===B.C?18:20
break
case 18:s=21
return A.f(p.bD(a),$async$bC)
case 21:s=19
break
case 20:p.mL(a)
case 19:case 1:return A.n(q,r)}})
return A.o($async$bC,r)},
bD(a){var s=0,r=A.p(t.H),q,p=this,o,n,m,l
var $async$bD=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:m=p.f
l=m.dc()
case 3:switch(a.a.a){case 7:s=5
break
case 8:s=6
break
case 11:s=7
break
case 12:s=8
break
case 13:s=9
break
case 14:s=10
break
case 10:s=11
break
case 9:s=12
break
case 1:s=13
break
case 2:s=14
break
case 0:s=15
break
default:s=16
break}break
case 5:m=p.ch
if(m>0)p.ch=m-1
s=4
break
case 6:m=p.ch
if(m<l.length-1)p.ch=m+1
s=4
break
case 7:p.ch=0
s=4
break
case 8:p.ch=l.length-1
s=4
break
case 9:p.ch=B.c.M(p.ch-10,0,l.length-1)
s=4
break
case 10:p.ch=B.c.M(p.ch+10,0,l.length-1)
s=4
break
case 11:o=p.ch
if(!(o>=0&&o<l.length)){q=A.b(l,o)
s=1
break}n=l[o]
o=n.c
s=o&&!n.e?17:19
break
case 17:s=20
return A.f(m.dT(0,n),$async$bD)
case 20:s=18
break
case 19:s=!o?21:22
break
case 21:s=23
return A.f(p.dD(),$async$bD)
case 23:case 22:case 18:s=4
break
case 12:o=p.ch
if(!(o>=0&&o<l.length)){q=A.b(l,o)
s=1
break}n=l[o]
s=n.c&&n.e?24:26
break
case 24:s=27
return A.f(m.ec(n),$async$bD)
case 27:s=25
break
case 26:p.ox(l)
case 25:s=4
break
case 13:o=p.ch
if(!(o>=0&&o<l.length)){q=A.b(l,o)
s=1
break}n=l[o]
s=n.c?28:30
break
case 28:s=31
return A.f(m.ec(n),$async$bD)
case 31:s=29
break
case 30:s=32
return A.f(p.dD(),$async$bD)
case 32:case 29:s=4
break
case 14:if(p.at.length!==0)p.ay=B.I
s=4
break
case 15:case 33:switch(a.ga1()){case".":s=35
break
case"n":s=36
break
case"N":s=37
break
default:s=34
break}break
case 35:s=38
return A.f(m.fv(),$async$bD)
case 38:s=34
break
case 36:p.j8(!1)
s=34
break
case 37:p.j8(!0)
s=34
break
case 34:s=4
break
case 16:s=4
break
case 4:case 1:return A.n(q,r)}})
return A.o($async$bD,r)},
mL(a){var s,r,q,p,o,n,m,l=this,k=l.ax
if(k>=0){s=l.at
if(!(k<s.length))return A.b(s,k)
r=s[k]}else r=null
if(r==null){k=a.a
if(k===B.aw||k===B.d5)l.ay=B.C
return}q=r.a
p=l.c.b.gc4().b
o=B.c.M(p-2,1,p)
switch(a.a.a){case 6:l.ay=B.C
break
case 7:q.qm()
break
case 8:q.ql()
break
case 9:k=q.r
if(k>0)k=q.r=k-1
else{s=q.f
if(s>0){k=s-1
q.f=k
s=q.b
if(!(k<s.length))return A.b(s,k)
k=s[k].length
q.r=k}}q.w=k
break
case 10:k=q.r
s=q.b
n=q.f
m=s.length
if(!(n>=0&&n<m))return A.b(s,n)
if(k<s[n].length)k=q.r=k+1
else if(n<m-1){q.f=n+1
q.r=0
k=0}q.w=k
break
case 11:q.w=q.r=0
break
case 12:k=q.b
s=q.f
if(!(s>=0&&s<k.length))return A.b(k,s)
q.w=q.r=k[s].length
break
case 13:k=q.b
s=B.c.M(q.f-o,0,k.length-1)
q.f=s
n=q.w
if(!(s>=0&&s<k.length))return A.b(k,s)
q.r=B.c.M(n,0,k[s].length)
break
case 14:k=q.b
s=B.c.M(q.f+o,0,k.length-1)
q.f=s
n=q.w
if(!(s>=0&&s<k.length))return A.b(k,s)
q.r=B.c.M(n,0,k[s].length)
break
case 1:q.q5()
r.f=null
break
case 4:q.pt()
r.f=null
break
case 5:q.pK()
r.f=null
break
case 2:q.kb(0,"  ")
r.f=null
break
case 0:q.kb(0,a.ga1())
r.f=null
break
default:break}},
es(a,b){var s=0,r=A.p(t.H),q,p=this,o,n,m
var $async$es=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:case 3:switch(a.a.a){case 6:s=5
break
case 1:s=6
break
case 4:s=7
break
case 0:s=8
break
default:s=9
break}break
case 5:p.k2=null
s=4
break
case 6:p.k2=null
o=b.d.$1(b.e)
s=10
return A.f(o instanceof A.v?o:A.bs(o,t.H),$async$es)
case 10:s=4
break
case 7:o=b.e
n=o.length
if(n!==0)b.e=B.a.m(o,0,n-1)
s=4
break
case 8:m=a.ga1()
o=m.length
if(o===0){s=4
break}if(b.c){if(0>=o){q=A.b(m,0)
s=1
break}o=m.charCodeAt(0)<48||m.charCodeAt(0)>57}else o=!1
if(o){s=4
break}b.e+=m
s=4
break
case 9:s=4
break
case 4:case 1:return A.n(q,r)}})
return A.o($async$es,r)},
o3(){var s,r,q=this,p=q.ax
if(p>=0){s=q.at
if(!(p<s.length))return A.b(s,p)
r=s[p]}else r=null
if(r==null){q.fy="Open a file first to go to a line."
q.go=!0
return}q.k2=new A.jI("Go to line","1\u2013"+r.a.b.length+", Enter to jump \xb7 Esc to cancel",!0,q.gmA(),"")},
mB(a){var s,r,q,p,o,n,m=this
A.r(a)
s=m.ax
if(s>=0){r=m.at
if(!(s<r.length))return A.b(r,s)
q=r[s]}else q=null
if(q==null)return
p=A.bJ(B.a.G(a),null)
if(p==null||p<1){m.fy="Invalid line number."
m.go=!0
return}o=q.a
n=B.c.M(p,1,o.b.length)
o.kk(n-1,0)
m.ay=B.I
if(n!==p){m.fy="Line "+A.u(p)+" is out of range \u2014 moved to line "+n+"."
m.go=!1}},
o2(){var s,r,q=this,p=q.ax
if(p>=0){s=q.at
if(!(p<s.length))return A.b(s,p)
r=s[p]}else r=null
if(r==null){q.fy="Open a file first to search."
q.go=!0
return}q.k2=new A.jI("Find","Enter to find next \xb7 Esc to cancel",!1,q.gmq(),q.k3)},
mr(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
A.r(a)
s=f.ax
if(s>=0){r=f.at
if(!(s<r.length))return A.b(r,s)
q=r[s]}else q=null
if(q==null)return
p=a.length===0?f.k3:a
if(p.length===0){f.fy="Nothing to find."
f.go=!0
return}f.k3=p
o=q.a
n=A.cO(o.b,t.N)
m=p.toLowerCase()
l=o.f
k=o.r+1
for(s=n.length,j=0;j<=s;++j){i=B.c.bc(l+j,s)
h=n[i].toLowerCase()
g=B.a.a_(h,m,j===0?B.c.M(k,0,h.length):0)
if(g>=0){o.kk(i,g)
f.ay=B.I
f.fy='Found "'+p+'" at line '+(i+1)+"."
f.go=!1
return}}f.fy='"'+p+'" not found.'
f.go=!0},
pe(){var s,r=this
if(B.b.ac(r.at,new A.qR())&&!r.id){r.id=!0
r.fy="Unsaved changes! Ctrl-S to save, or Ctrl-Q again to discard and quit."
r.go=!0
return}s=r.ok
if((s.a.a&30)===0)s.bt()},
pa(){var s,r=this,q=r.cy
if(q&&r.ay===B.aa){r.cy=!1
r.ay=r.at.length!==0?B.I:B.C
return}if(q){r.ay=B.aa
return}if(r.cx==null){q=t.s
s=A.e([],q)
q=A.e([],q)
r.cx=new A.us(r.r,new A.qQ(r),$.b3().a4(r.b),s,q)}r.dx=!1
r.cy=!0
r.ay=B.aa},
eW(){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k
var $async$eW=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:if(p.dx&&p.ay===B.am){p.dx=!1
p.ay=p.at.length!==0?B.I:B.C
s=1
break}o=p.db
if(o==null){n=p.y
m=p.x
if(m==null)m=p.x=n!=null?new A.ma(n,p.z,new A.ni(p)):B.h5
o=p.db=new A.oh(m,new A.qP(p),new A.fx("workspace",""),A.e([],t.s),A.e([],t.z4))}l=o
k=t.bk
s=3
return A.f(p.dq(),$async$eW)
case 3:l.d=k.a(b)
p.cy=!1
p.dx=!0
p.ay=B.am
case 1:return A.n(q,r)}})
return A.o($async$eW,r)},
dq(){var s=0,r=A.p(t.bk),q,p=this,o,n,m,l,k,j,i
var $async$dq=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:s=p.ay===B.C?3:4
break
case 3:o=p.f.dc()
n=p.ch
s=n>=0&&n<o.length?5:6
break
case 5:if(!(n>=0&&n<o.length)){q=A.b(o,n)
s=1
break}m=o[n]
s=m.c?7:8
break
case 7:n=m.a
j=A
i=n
s=9
return A.f(p.cO(n),$async$dq)
case 9:q=j.xx(i,b)
s=1
break
case 8:q=p.dv(m.a)
s=1
break
case 6:case 4:n=p.ax
if(n>=0){l=p.at
if(!(n<l.length)){q=A.b(l,n)
s=1
break}k=l[n]}else k=null
if(k!=null){n=k.a
q=A.yw(n.a,n.i6())
s=1
break}n=p.b
j=A
i=n
s=10
return A.f(p.cO(n),$async$dq)
case 10:q=j.xx(i,b)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$dq,r)},
dv(a){return this.mp(a)},
mp(a){var s=0,r=A.p(t.bk),q,p=2,o=[],n=this,m,l,k,j,i
var $async$dv=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:p=4
j=A
i=a
s=7
return A.f(n.a.ba(a),$async$dv)
case 7:m=j.yw(i,c)
q=m
s=1
break
p=2
s=6
break
case 4:p=3
k=o.pop()
m=$.b3()
j=A
i=m.f8(a)
s=8
return A.f(n.cO(m.f8(a)),$async$dv)
case 8:m=j.xx(i,c)
q=m
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dv,r)},
cO(a){return this.oq(a)},
oq(a){var s=0,r=A.p(t.a),q,p=2,o=[],n=this,m,l,k,j,i,h
var $async$cO=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:p=4
h=J
s=7
return A.f(n.a.bk(a),$async$cO)
case 7:l=h.o8(c,new A.qN(),t.N)
k=A.N(l,l.$ti.h("Q.E"))
B.b.di(k)
m=k
q=m
s=1
break
p=2
s=6
break
case 4:p=3
i=o.pop()
q=B.G
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$cO,r)},
oW(a){var s=this.at,r=B.b.fg(s,new A.qO(a))
if(r>=0){if(!(r<s.length))return A.b(s,r)
s=s[r]}else s=null
return s},
c9(a){return this.nm(a)},
nm(a){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h
var $async$c9=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:k=n.at
j=B.b.fg(k,new A.qB(a))
i=j
if(typeof i!=="number"){q=i.rs()
s=1
break}s=i>=0?3:4
break
case 3:p=6
s=9
return A.f(n.a.ba(a),$async$c9)
case 9:m=c
B.b.i(k,j,A.yR(a,m,n.d))
p=2
s=8
break
case 6:p=5
h=o.pop()
s=8
break
case 5:s=2
break
case 8:case 4:s=10
return A.f(n.bS(),$async$c9)
case 10:s=11
return A.f(n.bR(),$async$c9)
case 11:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$c9,r)},
eS(a){var s=0,r=A.p(t.a),q,p=this,o,n,m,l,k,j
var $async$eS=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:if(a.length===0){q=B.G
s=1
break}s=3
return A.f(p.a.d_("grep -rInH --exclude-dir=.git -- "+("'"+A.ad(a,"'","'\\''")+"'")+" . 2>/dev/null | head -n 100; true",p.b),$async$eS)
case 3:o=c
n=A.e([],t.s)
for(m=B.bn.Y(o.b),l=m.length,k=0;k<m.length;m.length===l||(0,A.M)(m),++k){j=B.a.c2(m[k])
if(j.length!==0)B.b.j(n,A.Bg(j,"./","",0))}q=n
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$eS,r)},
eP(a){var s=0,r=A.p(t.N),q,p=this,o,n,m,l,k
var $async$eP=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:k=B.a.G(a)
if(k.length===0){q="No command provided."
s=1
break}o=p.Q
n=o.c.cZ(o.b.cV(o.fn(k,p.as)))
o=n.a
if(o===B.aO||n.b===B.J){q="BLOCKED by command_shield ("+o.b+"/"+n.b.b+"): "+p.iL(n)+". The command was NOT run; choose a safer approach."
s=1
break}o=n.b
s=o!==B.e?3:4
break
case 3:m=p.iL(n)
l=new A.v($.E,t.aO)
p.dy=new A.vn(k,"["+o.b+"] "+m+"  \xb7  y = run \xb7 n/Esc = cancel",new A.W(l,t.wY))
if((p.ok.a.a&30)===0)p.cK()
s=5
return A.f(l,$async$eP)
case 5:if(!c){q=u.l
s=1
break}case 4:q=p.dt(k)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$eP,r)},
dt(a){var s=0,r=A.p(t.N),q,p=this,o,n,m,l,k,j
var $async$dt=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:m=p.r.B(a,p.b)
l=new A.T("")
k=m.a.aa(0,l.grp()).bF(new A.qy())
s=3
return A.f(m.b.bF(new A.qz()),$async$dt)
case 3:j=c
s=4
return A.f(k,$async$dt)
case 4:o=l.a
n=o.charCodeAt(0)==0?o:o
q=B.a.c2(n.length>8000?B.a.m(n,0,8000)+"\n\u2026(truncated)\u2026":n)+"\n[exit "+A.u(j)+"]"
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$dt,r)},
iL(a){var s,r,q=a.c
if(q.length===0)q="flagged "+a.b.b
else{s=A.U(q)
r=s.h("a2<1,a>")
r=A.bx(new A.a2(q,s.h("a(1)").a(new A.qA()),r),0,A.dq(2,"count",t.S),r.h("Q.E")).S(0,"; ")
q=r}return q},
dI(a){var s=0,r=A.p(t.H),q,p=this,o
var $async$dI=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:o=p.at.length
if(o===0){s=1
break}p.ax=B.c.bc(p.ax+a,o)
p.ay=B.I
s=3
return A.f(p.bR(),$async$dI)
case 3:case 1:return A.n(q,r)}})
return A.o($async$dI,r)},
dD(){var s=0,r=A.p(t.H),q,p=this,o,n,m
var $async$dD=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:n=p.f.dc()
m=p.ch
if(m<0||m>=n.length){s=1
break}if(!(m>=0&&m<n.length)){q=A.b(n,m)
s=1
break}o=n[m]
if(o.c){s=1
break}s=3
return A.f(p.ca(o.a),$async$dD)
case 3:case 1:return A.n(q,r)}})
return A.o($async$dD,r)},
ca(a){return this.nQ(a)},
nQ(a){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$ca=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:i=n.at
h=B.b.fg(i,new A.qC(a))
s=h>=0?3:4
break
case 3:n.ax=h
n.ay=B.I
s=5
return A.f(n.bR(),$async$ca)
case 5:s=1
break
case 4:p=7
s=10
return A.f(n.a.ba(a),$async$ca)
case 10:m=c
l=A.yR(a,m,n.d)
B.b.j(i,l)
n.ax=i.length-1
n.ay=B.I
s=11
return A.f(n.bR(),$async$ca)
case 11:p=2
s=9
break
case 7:p=6
g=o.pop()
k=A.R(g)
n.fy="Cannot open "+n.ds(a)+": "+A.u(k)
n.go=!0
s=9
break
case 6:s=2
break
case 9:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$ca,r)},
lP(){var s,r=this,q=r.ax
if(q<0)return
s=r.at
if(!(q<s.length))return A.b(s,q)
if(s[q].a.x&&!r.k1){r.k1=!0
r.fy="Unsaved changes! Ctrl-S to save, or Ctrl-W again to discard and close."
r.go=!0
return}r.k1=!1
B.b.bx(s,q)
q=s.length
if(q===0){r.ax=-1
r.ay=B.C}else r.ax=B.c.M(r.ax,0,q-1)},
cP(){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$cP=A.q(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:h=n.ax
if(h<0){s=1
break}j=n.at
if(!(h<j.length)){q=A.b(j,h)
s=1
break}m=j[h]
l=m.a
if(l.e){n.fy="Binary file is read-only."
n.go=!0
s=1
break}if(!l.x){n.fy="No changes to save."
n.go=!1
s=1
break}p=4
s=7
return A.f(n.a.bb(m.a.a,l.i6()),$async$cP)
case 7:l.x=!1
s=8
return A.f(n.bS(),$async$cP)
case 8:s=9
return A.f(n.bR(),$async$cP)
case 9:n.fy="Saved "+n.ds(m.a.a)
n.go=!1
p=2
s=6
break
case 4:p=3
g=o.pop()
k=A.R(g)
n.fy="Save failed: "+A.u(k)
n.go=!0
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$cP,r)},
ox(a){var s,r,q,p
t.yv.a(a)
s=this.ch
if(!(s>=0&&s<a.length))return A.b(a,s)
r=a[s]
s=$.b3()
q=s.f8(r.a)
for(p=this.ch-1;p>=0;--p){if(!(p<a.length))return A.b(a,p)
if(s.bq(a[p].a,q)===B.Z){this.ch=p
return}}},
pb(){var s,r=this.f.dc(),q=this.ch
if(q>=0&&q<r.length){if(!(q>=0&&q<r.length))return A.b(r,q)
s=r[q]
q=s.a
return s.c?q:$.b3().f8(q)}return this.b},
j8(a){var s=this,r=s.pb(),q=a?"New folder":"New file"
s.k2=new A.jI(q,"in "+s.ds(r)+"/ \xb7 nested paths ok \xb7 Esc to cancel",!1,new A.qD(s,r,a),"")},
bp(a,b,c){return this.m2(a,b,c)},
m2(a,b,c){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$bp=A.q(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:h=B.a.G(b)
if(h.length===0){s=1
break}k=A.wW(a,h)
j=$.b3()
m=j.a4(k)
k=n.b
if(!J.a0(m,k)&&j.bq(k,m)!==B.aq){n.fy="Path is outside the workspace."
n.go=!0
s=1
break}p=4
k=n.a
s=10
return A.f(k.fa(m),$async$bp)
case 10:s=e?7:9
break
case 7:n.fy="Already exists: "+n.ds(m)
n.go=!0
s=8
break
case 9:s=c?11:13
break
case 11:s=14
return A.f(k.f5(m),$async$bp)
case 14:s=12
break
case 13:s=15
return A.f(k.f6(m),$async$bp)
case 15:case 12:case 8:p=2
s=6
break
case 4:p=3
g=o.pop()
l=A.R(g)
n.fy="Create failed: "+A.u(l)
n.go=!0
s=1
break
s=6
break
case 3:s=2
break
case 6:s=16
return A.f(n.f.ao(),$async$bp)
case 16:s=17
return A.f(n.eL(m),$async$bp)
case 17:s=!c?18:19
break
case 18:s=20
return A.f(n.ca(m),$async$bp)
case 20:s=21
return A.f(n.bS(),$async$bp)
case 21:case 19:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$bp,r)},
eL(a){var s=0,r=A.p(t.H),q,p=this,o,n,m
var $async$eL=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)A:switch(s){case 0:m=p.f
s=3
return A.f(m.fs(a),$async$eL)
case 3:o=m.dc()
for(n=0;n<o.length;++n){m=o[n]
if($.b3().bq(m.a,a)===B.Z){p.ch=n
s=1
break A}}case 1:return A.n(q,r)}})
return A.o($async$eL,r)},
bS(){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k,j
var $async$bS=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:j=p.e
if(j==null){s=1
break}s=3
return A.f(j.f7(),$async$bS)
case 3:p.fx=b
o=A.I(t.N,t.gH)
s=4
return A.f(j.dV(),$async$bS)
case 4:n=b.gX(),n=n.gJ(n),m=j.b
case 5:if(!n.q()){s=6
break}l=n.gA()
k=A.wW(m,l.a)
o.i(0,$.b3().a4(k),l.b)
s=5
break
case 6:p.fr=o
case 1:return A.n(q,r)}})
return A.o($async$bS,r)},
bR(){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$bR=A.q(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:i=n.e
if(i==null||n.ax<0){s=1
break}l=n.at
k=n.ax
if(!(k>=0&&k<l.length)){q=A.b(l,k)
s=1
break}m=l[k]
if(m.a.a.length===0){s=1
break}p=4
g=m
s=7
return A.f(i.dZ(m.a.a,m.a.b.length),$async$bR)
case 7:g.skN(b)
p=2
s=6
break
case 4:p=3
h=o.pop()
m.c=B.bL
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$bR,r)},
ds(a){var s=this.b,r=$.b3()
if(r.bq(s,a)===B.aq)return r.e8(a,s)
return a}}
A.qS.prototype={
$1(a){return this.kF(A.r(a))},
kF(a){var s=0,r=A.p(t.rE),q,p=this,o,n,m,l
var $async$$1=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:m=A.e([],t.uw)
l=J
s=3
return A.f(p.a.bk(a),$async$$1)
case 3:o=l.aN(c)
case 4:if(!o.q()){s=5
break}n=o.gA()
m.push(new A.bQ(n.a,n.b))
s=4
break
case 5:q=m
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$1,r)},
$S:69}
A.qT.prototype={
$1(a){return this.kG(t.L.a(a))},
kG(a){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f,e
var $async$$1=A.q(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:f=o.a
f.a.d7()
l=o.c.b5(a),k=l.length,j=o.b,i=j.ok.a,h=0
case 2:if(!(h<l.length)){s=4
break}n=l[h]
q=6
s=9
return A.f(j.bC(n),$async$$1)
case 9:q=1
s=8
break
case 6:q=5
e=p.pop()
m=A.R(e)
j.fy="Unexpected error: "+A.u(m)
j.go=!0
s=8
break
case 5:s=1
break
case 8:if((i.a&30)!==0){s=4
break}case 3:l.length===k||(0,A.M)(l),++h
s=2
break
case 4:if((i.a&30)===0)j.cK()
if((i.a&30)===0)f.a.cu()
return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$$1,r)},
$S:70}
A.qU.prototype={
$1(a){var s=this.a.ok
if((s.a.a&30)===0)s.bt()
return null},
$S:10}
A.qV.prototype={
$1(a){var s=this.a
s.c.a=null
s.cK()},
$S:58}
A.qM.prototype={
$1(a){return this.a.fr.k(0,$.b3().a4(a))},
$S:71}
A.qE.prototype={
$0(){return B.b.j(this.a,new A.qF())},
$S:0}
A.qF.prototype={
$2(a,b){},
$S:14}
A.qG.prototype={
$2(a,b){return B.b.j(this.a,new A.qH(a,this.b,b))},
$S:73}
A.qH.prototype={
$2(a,b){var s=this.a
this.b.am(a+B.c.M(B.c.W(60-s.length,2),0,60),b,s,this.c,60)},
$S:14}
A.qI.prototype={
$1(a){return B.b.j(this.a,new A.qJ(this.b,a,this.c))},
$S:4}
A.qJ.prototype={
$2(a,b){this.a.am(a,b,this.b.toUpperCase(),this.c,60)},
$S:14}
A.qK.prototype={
$1(a){var s=this
return B.b.j(s.a,new A.qL(t.DX.a(a),s.b,s.c,s.d))},
$S:74}
A.qL.prototype={
$2(a,b){var s,r,q,p,o,n,m,l,k=this
for(s=k.a,r=k.b,q=k.c,p=k.d,o=a+60,n=0;n<3;++n){m=s[n]
l=r.bW(a+n*20+2,b,m.a,q)
r.am(l+1,b,m.b,p,o-l)}},
$S:14}
A.qR.prototype={
$1(a){return t.cU.a(a).a.x},
$S:19}
A.qQ.prototype={
$0(){var s=this.a
if((s.ok.a.a&30)===0)s.cK()},
$S:0}
A.qP.prototype={
$0(){var s=this.a
if((s.ok.a.a&30)===0)s.cK()},
$S:0}
A.qN.prototype={
$1(a){var s
t.Ex.a(a)
s=a.b?"/":""
return a.a+s},
$S:27}
A.qO.prototype={
$1(a){t.cU.a(a)
return $.b3().bq(a.a.a,this.a)===B.Z},
$S:19}
A.qB.prototype={
$1(a){t.cU.a(a)
return $.b3().bq(a.a.a,this.a)===B.Z},
$S:19}
A.qy.prototype={
$1(a){},
$S:13}
A.qz.prototype={
$1(a){return-1},
$S:77}
A.qA.prototype={
$1(a){return t.V.a(a).b},
$S:30}
A.qC.prototype={
$1(a){t.cU.a(a)
return $.b3().bq(a.a.a,this.a)===B.Z},
$S:19}
A.qD.prototype={
$1(a){return this.a.bp(this.b,A.r(a),this.c)},
$S:21}
A.ni.prototype={
eK(a){var s=B.a.G(a),r=$.b3(),q=r.a.ap(s)>0?r.a4(s):r.a4(A.wW(this.a.b,s)),p=this.a.b
if(q!==p&&r.bq(p,q)!==B.aq)throw A.d(A.aC("path is outside the workspace: "+a))
return q},
bk(a){var s=0,r=A.p(t.a),q,p=this,o,n
var $async$bk=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:n=J
s=3
return A.f(p.a.a.bk(p.eK(a)),$async$bk)
case 3:o=n.o8(c,new A.vK(),t.N)
o=A.N(o,o.$ti.h("Q.E"))
B.b.di(o)
q=o
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$bk,r)},
ba(a){var s=0,r=A.p(t.N),q,p=this,o,n,m
var $async$ba=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:o=p.eK(a)
n=p.a
m=n.oW(o)
if(m!=null){q=m.a.i6()
s=1
break}q=n.a.ba(o)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$ba,r)},
bb(a,b){var s=0,r=A.p(t.H),q=this,p,o
var $async$bb=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:p=q.eK(a)
o=q.a
s=2
return A.f(o.a.bb(p,b),$async$bb)
case 2:s=3
return A.f(o.c9(p),$async$bb)
case 3:return A.n(null,r)}})
return A.o($async$bb,r)},
d8(a,b,c){var s=0,r=A.p(t.H),q=this,p,o,n,m
var $async$d8=A.q(function(d,e){if(d===1)return A.m(e,r)
for(;;)switch(s){case 0:o=q.eK(a)
s=2
return A.f(q.ba(a),$async$d8)
case 2:n=e
m=B.a.aW(n,b)
if(m<0)throw A.d(A.aC("old_string not found in "+a))
if(B.a.a_(n,b,m+b.length)>=0)throw A.d(A.aC("old_string is not unique in "+a))
p=q.a
s=3
return A.f(p.a.bb(o,B.a.kr(n,b,c)),$async$d8)
case 3:s=4
return A.f(p.c9(o),$async$d8)
case 4:return A.n(null,r)}})
return A.o($async$d8,r)},
$iCp:1}
A.vK.prototype={
$1(a){var s
t.Ex.a(a)
s=a.b?"/":""
return a.a+s},
$S:27}
A.et.prototype={
l0(a,b){var s=this.mh(b,a)
if(a<=0)return B.v
return a<s.length?s[a]:B.v},
mh(a,b){var s,r,q,p,o,n,m,l=this,k=l.f
if(k!=null&&k.length>b)return k
s=A.e([B.v],t.pP)
r=l.a.b
q=r.length
for(p=l.b,o=B.v,n=0;n<q;++n){m=r.length
if(n<m){if(!(n<m))return A.b(r,n)
m=r[n]}else m=""
o=p.d2(m,o,a).b
B.b.j(s,o)}return l.f=s},
skN(a){this.c=t.vl.a(a)}}
A.bQ.prototype={}
A.bF.prototype={
sbr(a){this.f=t.ag.a(a)}}
A.l4.prototype={
ec(a){var s=0,r=A.p(t.H),q,p=this
var $async$ec=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:if(!a.c){s=1
break}s=a.e?3:5
break
case 3:a.e=!1
s=4
break
case 5:a.e=!0
s=a.f==null?6:7
break
case 6:s=8
return A.f(p.bO(a),$async$ec)
case 8:case 7:case 4:case 1:return A.n(q,r)}})
return A.o($async$ec,r)},
dT(a,b){var s=0,r=A.p(t.H),q,p=this
var $async$dT=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:if(!b.c||b.e){s=1
break}b.e=!0
s=b.f==null?3:4
break
case 3:s=5
return A.f(p.bO(b),$async$dT)
case 5:case 4:case 1:return A.n(q,r)}})
return A.o($async$dT,r)},
fv(){var s=0,r=A.p(t.H),q=this
var $async$fv=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:q.c=!q.c
s=2
return A.f(q.bT(q.b),$async$fv)
case 2:return A.n(null,r)}})
return A.o($async$fv,r)},
dc(){var s=A.e([],t.og)
new A.pS(s).$1(this.b)
return s},
fs(a){var s=0,r=A.p(t.mi),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$fs=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:g=$.b3()
f=g.a4(a)
e=p.b
d=e.a
if(g.bq(d,f)!==B.aq&&g.bq(d,f)!==B.Z){q=null
s=1
break}o=g.e8(f,d)
if(o==="."){q=e
s=1
break}g=g.cC(0,o),d=g.length,n=t.mi,m=0
case 3:if(!(m<g.length)){s=5
break}l=g[m]
s=6
return A.f(p.dT(0,e),$async$fs)
case 6:k=e.f
if(k==null){q=null
s=1
break}j=A.U(k)
i=j.h("ae<1>")
h=A.oX(new A.ae(k,j.h("y(1)").a(new A.pP(l)),i),i.h("i.E"),n).bX(0,new A.pQ(),new A.pR())
if(h==null){q=null
s=1
break}case 4:g.length===d||(0,A.M)(g),++m,e=h
s=3
break
case 5:q=e
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$fs,r)},
ao(){var s=0,r=A.p(t.H),q=this,p
var $async$ao=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:p=q.b
s=p.f!=null?2:3
break
case 2:s=4
return A.f(q.bT(p),$async$ao)
case 4:case 3:return A.n(null,r)}})
return A.o($async$ao,r)},
bO(a){return this.na(a)},
na(a){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$bO=A.q(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=null
p=4
s=7
return A.f(n.a.$1(a.a),$async$bO)
case 7:d=a0
p=2
s=6
break
case 4:p=3
c=o.pop()
a.sbr(B.jP)
s=1
break
s=6
break
case 3:s=2
break
case 6:l=J.yv(d,n.gn5())
k=A.N(l,l.$ti.h("i.E"))
B.b.bn(k,A.Iz())
l=A.e([],t.og)
for(j=k.length,i=a.a,h=a.d+1,g=0;g<k.length;k.length===j||(0,A.M)(k),++g){f=k[g]
e=f.a
l.push(new A.bF(A.wW(i,e),e,f.b,h,!1))}a.sbr(l)
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$bO,r)},
bT(a){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k
var $async$bT=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:k=a.f
if(k==null){s=1
break}o=A.cN(t.N)
for(n=k.length,m=0;m<k.length;k.length===n||(0,A.M)(k),++m){l=k[m]
if(l.c&&l.e)o.j(0,l.a)}s=3
return A.f(p.bO(a),$async$bT)
case 3:k=a.f,n=k.length,m=0
case 4:if(!(m<k.length)){s=6
break}l=k[m]
s=l.c&&o.t(0,l.a)?7:8
break
case 7:l.e=!0
s=9
return A.f(p.bO(l),$async$bT)
case 9:s=10
return A.f(p.bT(l),$async$bT)
case 10:case 8:case 5:k.length===n||(0,A.M)(k),++m
s=4
break
case 6:case 1:return A.n(q,r)}})
return A.o($async$bT,r)},
n6(a){var s=t.cy.a(a).a
if(s===".git")return!1
if(!this.c&&B.a.u(s,"."))return!1
return!0}}
A.pS.prototype={
$1(a){var s,r,q
B.b.j(this.a,a)
if(a.c&&a.e&&a.f!=null)for(s=a.f,r=s.length,q=0;q<s.length;s.length===r||(0,A.M)(s),++q)this.$1(s[q])},
$S:80}
A.pP.prototype={
$1(a){return t.dt.a(a).b===this.a},
$S:81}
A.pQ.prototype={
$1(a){t.mi.a(a)
return!0},
$S:82}
A.pR.prototype={
$0(){return null},
$S:5}
A.uH.prototype={
qa(a){var s
if(a>=0&&a<this.b.length){s=this.b
if(!(a>=0&&a<s.length))return A.b(s,a)
s=s[a]}else s=""
return s},
i6(){var s=this.c,r=B.b.S(this.b,s)
return this.d?r+s:r},
kk(a,b){var s,r=this,q=r.b
if(q.length===0)B.b.j(q,"")
s=B.c.M(a,0,q.length-1)
r.f=s
if(!(s>=0&&s<q.length))return A.b(q,s)
r.w=r.r=B.c.M(b,0,q[s].length)},
qm(){var s,r,q=this,p=q.f
if(p===0){q.w=q.r=0
return}--p
q.f=p
s=q.w
r=q.b
if(!(p>=0&&p<r.length))return A.b(r,p)
q.r=B.c.M(s,0,r[p].length)},
ql(){var s,r=this,q=r.f,p=r.b,o=p.length
if(q>=o-1){if(!(q>=0&&q<o))return A.b(p,q)
r.w=r.r=p[q].length
return}++q
r.f=q
s=r.w
if(!(q>=0))return A.b(p,q)
r.r=B.c.M(s,0,p[q].length)},
kb(a,b){var s,r,q,p,o=this
if(o.e||b.length===0)return
s=o.b
r=o.f
if(!(r>=0&&r<s.length))return A.b(s,r)
q=s[r]
p=o.r
B.b.i(s,r,B.a.m(q,0,p)+b+B.a.D(q,p))
o.w=o.r=o.r+b.length
o.x=!0},
q5(){var s,r,q,p,o,n,m=this
if(m.e)return
s=m.b
r=m.f
if(!(r>=0&&r<s.length))return A.b(s,r)
q=s[r]
p=m.r
o=B.a.m(q,0,p)
n=B.a.D(q,p)
B.b.i(s,r,o)
B.b.hJ(s,m.f+1,n);++m.f
m.w=m.r=0
m.x=!0},
pt(){var s,r,q,p,o,n,m,l=this
if(l.e)return
s=l.r
if(s>0){r=l.b
q=l.f
if(!(q>=0&&q<r.length))return A.b(r,q)
p=r[q]
B.b.i(r,q,B.a.m(p,0,s-1)+B.a.D(p,s));--l.r}else{s=l.f
if(s>0){r=l.b
q=s-1
o=r.length
if(!(q<o))return A.b(r,q)
n=r[q]
if(!(s<o))return A.b(r,s)
m=r[s]
l.r=n.length
B.b.i(r,q,n+m)
B.b.bx(r,l.f);--l.f}else return}l.w=l.r
l.x=!0},
pK(){var s,r,q,p,o,n=this
if(n.e)return
s=n.b
r=n.f
q=s.length
if(!(r>=0&&r<q))return A.b(s,r)
p=s[r]
o=n.r
if(o<p.length)B.b.i(s,r,B.a.m(p,0,o)+B.a.D(p,o+1))
else if(r<q-1){B.b.i(s,r,p+s[r+1])
B.b.bx(s,n.f+1)}else return
n.w=n.r
n.x=!0}}
A.kS.prototype={
gdY(){return"Dart"},
d2(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=A.e([],t.pK),e=new A.hn(f,new A.T(""),a1),d=a.length,c=a0.a,b=0
if(c===1){s=B.a.aW(a,"*/")
if(s<0){e.N(0,a,B.a5)
e.aw()
return new A.aU(f,B.aR)}r=s+2
e.N(0,B.a.m(a,0,r),B.a5)
c=b}else{q=c===2
if(q||c===3){s=B.a.aW(a,q?"'''":'"""')
if(s<0){e.N(0,a,B.ae)
e.aw()
return new A.aU(f,new A.cM(c))}r=s+3
e.N(0,B.a.m(a,0,r),B.ae)
c=b}else r=0}while(r<d){if(!(r>=0))return A.b(a,r)
p=a.charCodeAt(r)
q=p===47
if(q&&r+1<d){o=r+1
if(!(o<d))return A.b(a,o)
n=a.charCodeAt(o)
if(n===47){e.N(0,B.a.D(a,r),B.a5)
e.aw()
return new A.aU(f,B.v)}if(n===42){s=B.a.a_(a,"*/",r+2)
if(s<0){e.N(0,B.a.D(a,r),B.a5)
e.aw()
return new A.aU(f,B.aR)}m=s+2
e.N(0,B.a.m(a,r,m),B.a5)
r=m
continue}}if(p===64){l=r+1
for(;;){if(l<d){q=a.charCodeAt(l)
if(!(q>=65&&q<=90))o=q>=97&&q<=122||q===95||q===36
else o=!0
if(!o)q=q>=48&&q<=57
else q=!0}else q=!1
if(!q)break;++l}e.N(0,B.a.m(a,r,l),B.c8)
r=l
continue}o=!1
if(p===114){k=r+1
if(k<d)o=a.charCodeAt(k)===39||a.charCodeAt(k)===34}if(o){j=this.jm(a,r+1,!0)
m=j.b
e.N(0,B.a.m(a,r,m),B.ae)
q=j.a
if(q!==0){e.aw()
return new A.aU(f,new A.cM(q))}r=m
continue}if(p===39||p===34){j=this.jm(a,r,!1)
m=j.b
e.N(0,B.a.m(a,r,m),B.ae)
q=j.a
if(q!==0){e.aw()
return new A.aU(f,new A.cM(q))}r=m
continue}if(!(p>=48&&p<=57)){o=!1
if(p===46){k=r+1
if(k<d){o=a.charCodeAt(k)
o=o>=48&&o<=57}}}else o=!0
if(o){if(p===48){q=r+1
q=q<d&&(a.charCodeAt(q)|32)===120}else q=!1
if(q){l=r+2
for(;;){if(l<d){q=a.charCodeAt(l)
if(!(q>=48&&q<=57)){q|=32
q=q>=97&&q<=102}else q=!0}else q=!1
if(!q)break;++l}}else{l=r
for(;;){if(l<d){q=a.charCodeAt(l)
q=q>=48&&q<=57||a.charCodeAt(l)===46||(a.charCodeAt(l)|32)===101||a.charCodeAt(l)===95}else q=!1
if(!q)break;++l}}e.N(0,B.a.m(a,r,l),B.b7)
r=l
continue}o=p>=65
if(!(o&&p<=90))k=p>=97&&p<=122||p===95||p===36
else k=!0
if(k){l=r+1
for(;;){if(l<d){q=a.charCodeAt(l)
if(!(q>=65&&q<=90))k=q>=97&&q<=122||q===95||q===36
else k=!0
if(!k)q=q>=48&&q<=57
else q=!0}else q=!1
if(!q)break;++l}i=B.a.m(a,r,l)
h=l
for(;;){q=h<d
if(q){k=a.charCodeAt(h)
k=k===32||k===9}else k=!1
if(!k)break;++h}g=q&&a.charCodeAt(h)===40
if(B.of.t(0,i))e.N(0,i,B.ee)
else{if(!B.o3.t(0,i))q=o&&p<=90
else q=!0
if(q)e.N(0,i,B.ej)
else if(g)e.N(0,i,B.em)
else e.N(0,i,B.L)}r=l
continue}if(p===43||p===45||p===42||q||p===37||p===61||p===60||p===62||p===33||p===38||p===124||p===94||p===126||p===63)e.N(0,A.ak(p),B.el)
else if(p===40||p===41||p===123||p===125||p===91||p===93||p===59||p===44||p===46||p===58)e.N(0,A.ak(p),B.af)
else e.N(0,A.ak(p),B.L);++r}e.aw()
return new A.aU(f,new A.cM(c))},
jm(a,b,c){var s,r,q,p,o,n,m,l,k=a.length
if(!(b>=0&&b<k))return A.b(a,b)
s=a.charCodeAt(b)
r=b+2
if(r<k){q=b+1
if(!(q<k))return A.b(a,q)
p=a.charCodeAt(q)===s&&a.charCodeAt(r)===s}else p=!1
if(p){r=s===39
o=r?"'''":'"""'
n=B.a.a_(a,o,b+3)
if(n<0)return new A.dS(r?2:3,k)
return new A.dS(0,n+3)}m=b+1
for(r=!c;m<k;){l=a.charCodeAt(m)
if(r&&l===92){m+=2
continue}if(l===s)return new A.dS(0,m+1);++m}return new A.dS(0,k)}}
A.aM.prototype={
R(){return"TokenType."+this.b}}
A.hw.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.hw&&b.a===this.a&&b.b.L(0,this.b)},
gE(a){return A.bo(this.a,this.b,B.f,B.f,B.f,B.f,B.f)},
l(a){var s=this.a
return"StyledRun("+(s.length>12?B.a.m(s,0,12)+"\u2026":s)+")"}}
A.cM.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.cM&&b.a===this.a},
gE(a){return this.a}}
A.aU.prototype={}
A.uL.prototype={
ik(a){var s=B.lj.k(0,a)
if(s==null)s=B.e3
return s}}
A.d2.prototype={}
A.qe.prototype={
q1(a){var s,r=B.a.aY(a,A.O("[/\\\\]",!0)),q=r<0?a:B.a.D(a,r+1),p=q.toLowerCase(),o=B.l8.k(0,p)
if(o!=null)return o
s=B.a.aY(p,".")
if(s<=0||s===p.length-1)return B.bo
q=B.l6.k(0,B.a.D(p,s+1))
return q==null?B.bo:q}}
A.lq.prototype={
gdY(){return"JSON"},
d2(a,b,c){var s,r,q,p,o,n,m,l,k,j=A.e([],t.pK),i=new A.hn(j,new A.T(""),c),h=a.length
for(s=0;s<h;){if(!(s>=0))return A.b(a,s)
r=a.charCodeAt(s)
if(r===34){q=s+1
while(q<h){p=a.charCodeAt(q)
if(p===92){q+=2
continue}if(p===34){++q
break}++q}o=q
for(;;){n=o<h
if(n){m=a.charCodeAt(o)
m=m===32||m===9}else m=!1
if(!m)break;++o}l=n&&a.charCodeAt(o)===58
n=B.a.m(a,s,q)
i.N(0,n,l?B.ca:B.ae)
s=q
continue}if(!(r>=48&&r<=57)){n=!1
if(r===45){m=s+1
if(m<h){n=a.charCodeAt(m)
n=n>=48&&n<=57}}}else n=!0
if(n){q=s+1
for(;;){if(q<h){n=a.charCodeAt(q)
n=n>=48&&n<=57||a.charCodeAt(q)===46||(a.charCodeAt(q)|32)===101||a.charCodeAt(q)===43||a.charCodeAt(q)===45}else n=!1
if(!n)break;++q}i.N(0,B.a.m(a,s,q),B.b7)
s=q
continue}if(!(r>=65&&r<=90))n=r>=97&&r<=122||r===95||r===36
else n=!0
if(n){q=s+1
for(;;){if(q<h){n=a.charCodeAt(q)
if(!(n>=65&&n<=90))m=n>=97&&n<=122||n===95||n===36
else m=!0
if(!m)n=n>=48&&n<=57
else n=!0}else n=!1
if(!n)break;++q}k=B.a.m(a,s,q)
i.N(0,k,k==="true"||k==="false"||k==="null"?B.c7:B.L)
s=q
continue}if(r===123||r===125||r===91||r===93||r===58||r===44)i.N(0,A.ak(r),B.af)
else i.N(0,A.ak(r),B.L);++s}i.aw()
return new A.aU(j,B.v)}}
A.lC.prototype={
gdY(){return"Markdown"},
d2(a,b,c){var s,r,q=A.e([],t.pK),p=new A.hn(q,new A.T(""),c),o=B.a.i7(a),n=B.a.u(o,"```")||B.a.u(o,"~~~")
if(b.a===1){p.N(0,a,n?B.af:B.c9)
p.aw()
return new A.aU(q,n?B.v:B.aR)}if(n){p.N(0,a,B.af)
p.aw()
return new A.aU(q,B.aR)}p.N(0,B.a.m(a,0,a.length-o.length),B.L)
if(this.n4(o)){p.N(0,o,B.aA)
p.aw()
return new A.aU(q,B.v)}if(B.a.u(o,"#")){p.N(0,o,B.ef)
p.aw()
return new A.aU(q,B.v)}if(B.a.u(o,">")){p.N(0,o,B.ek)
p.aw()
return new A.aU(q,B.v)}s=this.n9(o)
if(s>0){p.N(0,B.a.m(o,0,s),B.aA)
r=B.a.D(o,s)}else r=o
this.mX(p,r,c)
p.aw()
return new A.aU(q,B.v)},
n4(a){var s,r,q,p,o=a.length
if(o<3)return!1
s=a.charCodeAt(0)
if(s!==45&&s!==42&&s!==95)return!1
for(r=0;r<o;++r){q=a.charCodeAt(r)
if(q!==s)p=!(q===32||q===9)
else p=!1
if(p)return!1}return!0},
n9(a){var s,r,q,p,o=a.length
if(o>=2){s=a.charCodeAt(0)
if((s===45||s===42||s===43)&&a.charCodeAt(1)===32)return 2}r=0
for(;;){if(r<o){q=a.charCodeAt(r)
q=q>=48&&q<=57}else q=!1
if(!q)break;++r}q=!1
if(r>0){p=r+1
if(p<o){if(!(r<o))return A.b(a,r)
o=(a.charCodeAt(r)===46||a.charCodeAt(r)===41)&&a.charCodeAt(p)===32}else o=q}else o=q
if(o)return r+2
return 0},
mX(a,b,c){var s,r,q,p,o,n,m,l,k,j=b.length
for(s=t.t,r=0;r<j;){if(!(r>=0))return A.b(b,r)
q=b.charCodeAt(r)
if(q===96){p=B.a.a_(b,"`",r+1)
if(p>r){o=p+1
a.N(0,B.a.m(b,r,o),B.c9)
r=o
continue}}n=q!==42
if(!n||q===95){m=r+1
m=m<j&&b.charCodeAt(m)===q}else m=!1
if(m){p=B.a.a_(b,A.c5(A.e([q,q],s),0,null),r+2)
if(p>r){o=p+2
a.N(0,B.a.m(b,r,o),B.eh)
r=o
continue}}if(!n||q===95){p=B.a.a_(b,A.ak(q),r+1)
if(p>r){o=p+1
a.N(0,B.a.m(b,r,o),B.eg)
r=o
continue}}if(q===91){l=B.a.a_(b,"]",r+1)
if(l>r){n=l+1
n=n<j&&b.charCodeAt(n)===40}else n=!1
if(n){k=B.a.a_(b,")",l+2)
if(k>l){o=k+1
a.N(0,B.a.m(b,r,o),B.ei)
r=o
continue}}}a.N(0,A.ak(q),B.L);++r}}}
A.lY.prototype={
d2(a,b,c){return new A.aU(A.e([new A.hw(a,c.ik(B.L))],t.pK),B.v)},
gdY(){return"Text"}}
A.hn.prototype={
N(a,b,c){var s=this
if(b.length===0)return
if(s.c===c){s.b.a+=b
return}s.aw()
s.c=c
s.b.a+=b},
aw(){var s,r=this,q=r.b,p=q.a
if(p.length===0)return
s=r.c
s.toString
B.b.j(r.a,new A.hw(p.charCodeAt(0)==0?p:p,r.d.ik(s)))
q.a=""}}
A.mU.prototype={
gdY(){return"YAML"},
d2(a,b,c){var s,r,q,p,o,n=A.e([],t.pK),m=new A.hn(n,new A.T(""),c),l=a.length,k=0
for(;;){s=k<l
if(s){r=a.charCodeAt(k)
r=r===32||r===9}else r=!1
if(!r)break;++k}m.N(0,B.a.m(a,0,k),B.L)
if(s&&a.charCodeAt(k)===35){m.N(0,B.a.D(a,k),B.a5)
m.aw()
return new A.aU(n,B.v)}q=B.a.D(a,k)
if(q==="---"||q==="..."){m.N(0,q,B.af)
m.aw()
return new A.aU(n,B.v)}for(;;){s=k+1
r=!1
if(s<l){if(!(k>=0&&k<l))return A.b(a,k)
if(a.charCodeAt(k)===45){if(!(s>=0))return A.b(a,s)
r=a.charCodeAt(s)
r=r===32||r===9}}if(!r)break
m.N(0,"-",B.aA)
p=this.oO(a,s)
m.N(0,B.a.m(a,s,p),B.L)
k=p}if(k===l-1){if(!(k>=0&&k<l))return A.b(a,k)
s=a.charCodeAt(k)===45}else s=!1
if(s){m.N(0,"-",B.aA)
m.aw()
return new A.aU(n,B.v)}o=this.ms(a,k)
if(o>=0){m.N(0,B.a.m(a,k,o),B.ca)
m.N(0,":",B.af)
k=o+1}this.mT(m,a,k)
m.aw()
return new A.aU(n,B.v)},
oO(a,b){var s,r=a.length,q=b
for(;;){if(q<r){s=a.charCodeAt(q)
s=s===32||s===9}else s=!1
if(!s)break;++q}return q},
ms(a,b){var s,r,q,p,o=a.length
for(s=b,r=null;s<o;){q=a.charCodeAt(s)
if(r!=null){if(q===r)r=null;++s
continue}if(q===39||q===34){++s
r=q
continue}if(q===35)return-1
if(q===58){p=s+1
if(p<o){if(!(p<o))return A.b(a,p)
p=a.charCodeAt(p)
p=p===32||p===9}else p=!0}else p=!1
if(p)return s;++s}return-1},
mT(a,b,c){var s,r,q,p,o,n,m=b.length
for(s=c;s<m;){if(!(s>=0))return A.b(b,s)
r=b.charCodeAt(s)
q=!1
if(r===35)if(s>0){q=b.charCodeAt(s-1)
q=q===32||q===9}if(q){a.N(0,B.a.D(b,s),B.a5)
return}if(r===39||r===34){p=s+1
for(;;){q=p<m
if(!(q&&b.charCodeAt(p)!==r))break;++p}if(q)++p
a.N(0,B.a.m(b,s,p),B.ae)
s=p
continue}if(r===38||r===42){p=s+1
for(;;){if(p<m){q=b.charCodeAt(p)
if(!(q>=65&&q<=90))o=q>=97&&q<=122||q===95||q===36
else o=!0
if(!o)q=q>=48&&q<=57
else q=!0}else q=!1
if(!q)break;++p}a.N(0,B.a.m(b,s,p),B.c8)
s=p
continue}if(r===32||r===9){a.N(0,A.ak(r),B.L);++s
continue}p=s
for(;;){if(p<m){q=b.charCodeAt(p)
q=!(q===32||q===9)}else q=!1
if(!q)break;++p}n=B.a.m(b,s,p)
a.N(0,n,this.pp(n))
s=p}},
pp(a){if(B.nu.t(0,a))return B.c7
if(this.nc(a))return B.b7
return B.L},
nc(a){var s,r,q,p=a.length
if(p===0)return!1
for(s=!1,r=0;r<p;++r){q=a.charCodeAt(r)
if(q>=48&&q<=57)s=!0
else if(q!==46&&q!==45&&q!==43&&(q|32)!==101)return!1}return s}}
A.pi.prototype={}
A.us.prototype={
hD(a){var s,r,q,p=this
switch(a.a.a){case 1:p.oY()
break
case 4:s=p.f
r=s.length
if(r!==0)p.f=B.a.m(s,0,r-1)
break
case 0:p.f=p.f+a.ga1()
p.r=0
break
case 7:p.mU()
break
case 8:s=p.z
r=p.y
q=r.length
if(s<q)s=p.z=s+1
if(s===q)s=""
else{if(!(s>=0&&s<q))return A.b(r,s)
s=r[s]}p.f=s
break
case 13:p.r+=5
break
case 14:p.r=B.c.M(p.r-5,0,1073741824)
break
case 11:p.r=1073741824
break
case 12:p.r=0
break
default:break}},
oY(){var s,r=this,q=B.a.G(r.f)
r.f=""
r.r=0
r.bU("$ "+q)
if(q.length===0)return
s=r.y
B.b.j(s,q)
r.z=s.length
if(r.w!=null){r.bU("A command is already running.")
return}if(r.n0(q)){r.oi(q)
return}r.oX(q)},
oX(a){var s,r=this,q={},p=r.w=r.a.B(a,r.d)
q.a=!1
q.b=null
s=new A.uE(q,r,p)
r.x=p.a.bv(new A.uz(r),new A.uA(q,s),new A.uB(r))
p.b.aZ(new A.uC(q,s),t.c).bF(new A.uD(q,r,s))},
n0(a){if(a!=="cd"&&!B.a.u(a,"cd "))return!1
return!(B.a.t(a,"&&")||B.a.t(a,"||")||B.a.t(a,"|")||B.a.t(a,";"))},
oi(a){var s,r,q,p,o=this,n={},m=a==="cd"?"":B.a.G(B.a.D(a,3))
if(m.length===0)s="cd && pwd"
else s="cd -- "+("'"+A.ad(m,"'","'\\''")+"'")+" && pwd"
r=o.w=o.a.B(s,o.d)
q=new A.T("")
n.a=!1
n.b=null
p=new A.uy(n,o,q)
o.x=r.a.bv(new A.ut(q),new A.uu(n,p),new A.uv())
r.b.aZ(new A.uw(n,p),t.c).bF(new A.ux(n,o,p))},
mU(){var s,r=this,q=r.y,p=q.length
if(p===0)return
s=r.z
if(s>0)s=r.z=s-1
if(!(s>=0&&s<p))return A.b(q,s)
r.f=q[s]},
bU(a){var s,r,q,p,o,n,m
for(s=a.split("\n"),r=s.length,q=this.e,p=0;p<r;++p){o=s[p]
n=$.BB()
n=A.ad(o,n,"")
m=$.BC()
n=A.ad(n,m,"")
n=A.ad(n,"\r","")
n=A.ad(n,"\t","  ")
m=$.BD()
B.b.j(q,A.ad(n,m,""))}s=q.length
if(s>2000)B.b.e9(q,0,s-2000)},
ah(){var s=0,r=A.p(t.H),q=this,p
var $async$ah=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:p=q.x
p=p==null?null:p.U()
s=2
return A.f(p instanceof A.v?p:A.bs(p,t.H),$async$ah)
case 2:q.x=null
p=q.w
if(p!=null)p.c.$0()
q.w=null
return A.n(null,r)}})
return A.o($async$ah,r)}}
A.uE.prototype={
$0(){var s,r=this,q=r.a
if(!q.a||q.b==null||r.b.w!==r.c)return
s=r.b
s.w=s.x=null
q=q.b
if(q!==0)s.bU("[exit "+A.u(q)+"]")
s.b.$0()},
$S:0}
A.uz.prototype={
$1(a){var s=this.a
s.bU(A.r(a))
s.b.$0()},
$S:4}
A.uB.prototype={
$1(a){return this.a.bU("[error: "+A.u(A.ap(a))+"]")},
$S:36}
A.uA.prototype={
$0(){this.a.a=!0
this.b.$0()},
$S:0}
A.uC.prototype={
$1(a){this.a.b=A.a4(a)
this.b.$0()},
$S:24}
A.uD.prototype={
$1(a){var s
this.b.bU("[error: "+A.u(A.ap(a))+"]")
s=this.a
s.a=!0
s.b=-1
this.c.$0()},
$S:7}
A.uy.prototype={
$0(){var s,r,q,p=this.a
if(!p.a||p.b==null)return
s=this.b
s.w=s.x=null
r=this.c.a
q=B.a.G(r.charCodeAt(0)==0?r:r)
if(p.b===0){if(q.length!==0)s.d=B.a.G(B.b.gaX(q.split("\n")))}else s.bU("cd: "+(q.length===0?"no such directory":q))
s.b.$0()},
$S:0}
A.ut.prototype={
$1(a){this.a.a+=A.r(a)+"\n"
return null},
$S:4}
A.uu.prototype={
$0(){this.a.a=!0
this.b.$0()},
$S:0}
A.uv.prototype={
$1(a){A.ap(a)},
$S:7}
A.uw.prototype={
$1(a){this.a.b=A.a4(a)
this.b.$0()},
$S:24}
A.ux.prototype={
$1(a){var s
A.ap(a)
s=this.a
s.a=!0
s.b=-1
this.b.bU("cd: "+A.u(a))
this.c.$0()},
$S:7}
A.km.prototype={
kn(a,b,c){var s="\x1b[?25l"+a.qO(this.a)
if(b!=null&&c!=null)s+="\x1b["+(c+1)+";"+(b+1)+"H\x1b[?25h"
this.b.a.write(new Uint8Array(A.c9(t.L.a(B.r.Y(s.charCodeAt(0)==0?s:s)))))
this.a=a},
qG(a){return this.kn(a,null,null)},
$izw:1}
A.d8.prototype={
gK(a){return this.c<=0||this.d<=0},
ii(a){var s=this,r=s.c,q=B.c.M(a,0,r),p=s.a,o=s.b,n=s.d
return new A.aD(new A.d8(p,o,q,n),new A.d8(p+q,o,r-q,n))},
ij(a){var s=this,r=s.d,q=B.c.M(A.a4(a),0,r),p=s.a,o=s.b,n=s.c
return new A.aD(new A.d8(p,o,n,q),new A.d8(p,o+q,n,r-q))},
fH(a){var s=this.d
return this.ij(B.c.M(s-a,0,s))},
L(a,b){var s=this
if(b==null)return!1
return b instanceof A.d8&&b.a===s.a&&b.b===s.b&&b.c===s.c&&b.d===s.d},
gE(a){var s=this
return A.bo(s.a,s.b,s.c,s.d,B.f,B.f,B.f)},
l(a){var s=this
return"Rect("+s.a+","+s.b+","+s.c+","+s.d+")"}}
A.b6.prototype={
R(){return"KeyType."+this.b}}
A.aP.prototype={
ga1(){if(this.a===B.av&&this.b!=null){var s=this.b
s.toString
s=A.ak(s)}else s=""
return s},
L(a,b){if(b==null)return!1
return b instanceof A.aP&&b.a===this.a&&b.b==this.b&&b.c==this.c},
gE(a){return A.bo(this.a,this.b,this.c,B.f,B.f,B.f,B.f)},
l(a){var s=this,r=s.a
switch(r.a){case 0:return"KeyEvent.char("+A.u(s.ga1().length===0?s.b:s.ga1())+")"
case 15:return"KeyEvent.ctrl("+A.u(s.c)+")"
default:return"KeyEvent."+r.l(0)}}}
A.r4.prototype={
b5(a){var s,r,q,p=this.a
B.b.C(p,t.L.a(a))
s=A.e([],t.DG)
for(r=p.$flags|0;p.length!==0;){q=this.m5(s)
if(q===0)break
r&1&&A.ai(p,18)
A.aR(0,q,p.length)
p.splice(0,q)}return s},
m5(a){var s,r,q,p,o,n,m
t.x0.a(a)
q=this.a
p=B.b.gI(q)
if(p===27)return this.m4(a)
switch(p){case 13:case 10:B.b.j(a,B.il)
return 1
case 9:B.b.j(a,B.im)
return 1
case 127:case 8:B.b.j(a,B.ip)
return 1}if(p>=1&&p<=26){B.b.j(a,new A.aP(B.bJ,null,A.ak(p+96)))
return 1}if(p>=32&&p<128){B.b.j(a,new A.aP(B.av,p,null))
return 1}s=A.DG(p)
if(J.a0(s,0)){B.b.j(a,B.aS)
return 1}o=q.length
n=s
if(typeof n!=="number")return A.B_(n)
if(o<n)return 0
try{r=B.l.b5(B.b.aq(q,0,s))
if(J.aE(r)!==0)B.b.j(a,new A.aP(B.av,new A.ch(r).gI(0),null))}catch(m){if(t.Bj.b(A.R(m)))B.b.j(a,B.aS)
else throw m}return s},
m4(a){var s,r,q,p,o,n
t.x0.a(a)
s=this.a
r=s.length
if(r===1)return 0
if(1>=r)return A.b(s,1)
q=s[1]
if(q===79){if(r<3)return 0
p=this.iK(s[2])
B.b.j(a,p==null?B.aS:p)
return 3}if(q===91){for(o=2;o<r;){n=s[o]
if(n>=64&&n<=126){this.mf(a,B.b.aq(s,2,o),n)
return o+1}++o}return 0}B.b.j(a,B.ir)
return 1},
mf(a,b,c){var s
t.x0.a(a)
t.L.a(b)
s=this.iK(c)
if(s!=null){B.b.j(a,s)
return}if(c===90){B.b.j(a,B.io)
return}if(c===126)switch(A.bJ(B.b.gI(A.c5(b,0,null).split(";")),null)){case 1:case 7:B.b.j(a,B.d2)
return
case 4:case 8:B.b.j(a,B.d3)
return
case 3:B.b.j(a,B.iq)
return
case 5:B.b.j(a,B.ij)
return
case 6:B.b.j(a,B.ik)
return}B.b.j(a,B.aS)},
iK(a){switch(a){case 65:return B.is
case 66:return B.it
case 67:return B.ii
case 68:return B.iu
case 72:return B.d2
case 70:return B.d3}return null}}
A.du.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.du&&b.a===this.a&&b.b.L(0,this.b)},
gE(a){return A.bo(this.a,this.b,B.f,B.f,B.f,B.f,B.f)}}
A.t6.prototype={
pA(a,b){var s,r,q,p=b.L(0,B.e2)?B.cM:new A.du(" ",b)
for(s=this.c,r=s.length,q=0;q<r;++q)B.b.i(s,q,p)},
aR(a,b,c,d){var s,r,q=this
if(a<0||a>=q.a||b<0||b>=q.b)return
s=new A.ch(c)
r=!s.gJ(0).q()?" ":A.ak(s.gI(0))
B.b.i(q.c,b*q.a+a,new A.du(r,d))},
aV(a,b,c,d,e,f){var s,r,q,p
for(s=b+d,r=a+c,q=b;q<s;++q)for(p=a;p<r;++p)this.aR(p,q,e,f)},
am(a,b,c,d,e){var s,r,q,p,o,n,m,l
A.a4(a)
A.r(c)
if(b<0||b>=this.b)return a
s=this.a
r=e==null?s:B.c.M(a+e,0,s)
for(q=new A.ho(c),p=this.c,o=b*s,n=a;q.q();){m=q.d
if(n>=r||n>=s)break
if(n>=0){l=m===9?" ":A.ak(m)
B.b.i(p,o+n,new A.du(l,d))}++n}return n},
bW(a,b,c,d){return this.am(a,b,c,d,null)},
qO(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=a2!=null&&a2.a===a.a&&a2.b===a.b,a1=new A.T("")
for(s=a.b,r=a.a,q=a.c,p=q.length,o=t.s,n=null,m=0;m<s;)for(l=m*r,++m,k="\x1b["+m+";",j=0;j<r;){i=l+j
if(!(i>=0&&i<p))return A.b(q,i)
h=q[i]
if(a0){g=a2.c
if(!(i<g.length))return A.b(g,i)
i=g[i]
f=h.a===i.a&&h.b.L(0,i.b)}else f=!1
if(f){++j
continue}i=a1.a+=k+(j+1)+"H"
while(j<r){g=l+j
if(!(g>=0&&g<p))return A.b(q,g)
e=q[g]
if(a0){d=a2.c
if(!(g<d.length))return A.b(d,g)
g=d[g]
g=e.a===g.a&&e.b.L(0,g.b)}else g=!1
if(g)break
c=e.b
if(!J.a0(n,c)){b=A.e(["0"],o)
if(c.c)B.b.j(b,"1")
if(c.d)B.b.j(b,"3")
if(c.e)B.b.j(b,"4")
g=c.a
if(g!=null)B.b.C(b,g.gmn())
g=c.b
if(g!=null)B.b.C(b,g.glI())
i=a1.a=i+("\x1b["+B.b.S(b,";")+"m")
n=c}i+=e.a
a1.a=i;++j}}if(n!=null)a1.a+="\x1b[0m"
s=a1.a
return s.charCodeAt(0)==0?s:s}}
A.aF.prototype={
gmn(){var s=A.e(["38","5",""+this.b],t.s)
return s},
glI(){var s=A.e(["48","5",""+this.b],t.s)
return s},
L(a,b){if(b==null)return!1
return b instanceof A.aF&&b.b===this.b},
gE(a){return A.bo(null,this.b,B.f,B.f,B.f,B.f,B.f)}}
A.a5.prototype={
ht(a,b,c){var s=this,r=c==null?s.a:c,q=a==null?s.b:a,p=b==null?s.c:b
return new A.a5(r,q,p,s.d,s.e,!1,!1)},
hs(a,b){return this.ht(null,a,b)},
cj(a){return this.ht(null,null,a)},
jW(a){return this.ht(a,null,null)},
L(a,b){var s,r=this
if(b==null)return!1
s=!1
if(b instanceof A.a5)if(J.a0(b.a,r.a))if(J.a0(b.b,r.b))if(b.c===r.c)if(b.d===r.d)s=b.e===r.e
return s},
gE(a){var s=this
return A.bo(s.a,s.b,s.c,s.d,s.e,!1,!1)}}
A.mb.prototype={
B(a,b){var s=A.ci(null,null,!1,t.N),r=new A.v($.E,t.AJ),q=new A.W(r,t.kJ),p=t.ma.a(s.gbh(s)),o=new A.jB(p,new A.T("")),n=new A.jB(p,new A.T(""))
this.a.pV(a,b,this.b,n.gbh(n),o.gbh(o),this.c).aZ(new A.t0(o,n,s,q),t.c).bF(new A.t1(s,q))
return new A.pi(new A.ac(s,A.l(s).h("ac<1>")),r,new A.t2())},
$iCX:1}
A.t0.prototype={
$1(a){var s,r=this
A.a4(a)
r.a.k8()
r.b.k8()
r.c.p()
s=r.d
if((s.a.a&30)===0)s.V(a)},
$S:24}
A.t1.prototype={
$1(a){var s
A.ap(a)
s=this.a
s.f2(a)
s.p()
s=this.b
if((s.a.a&30)===0)s.a7(a)},
$S:7}
A.t2.prototype={
$0(){},
$S:0}
A.jB.prototype={
j(a,b){var s,r,q,p=this.b,o=B.l.aK(t.L.a(b),!0)
o=p.a+=o
s=(o.charCodeAt(0)==0?o:o).split("\n")
for(o=this.a,r=0;r<s.length-1;++r){q=s[r]
o.$1(A.ad(q,"\r",""))}p.a=""
o=B.b.gaX(s)
p.a+=o},
k8(){var s=this.b,r=s.a,q=r.charCodeAt(0)==0?r:r
s.a=""
if(q.length!==0)this.a.$1(A.ad(q,"\r",""))}}
A.md.prototype={
cN(a){return this.a.k5(a,this.b,this.c)},
bk(a){var s=0,r=A.p(t.cR),q,p=this,o,n,m,l,k,j,i,h
var $async$bk=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=3
return A.f(p.cN("ls -Ap -- "+("'"+A.ad(a,"'","'\\''")+"'")),$async$bk)
case 3:h=c
if(h.a!==0)throw A.d(A.mR("cannot list "+a+": "+B.a.G(h.gdk())))
o=A.e([],t.nG)
for(n=B.bn.Y(B.l.aK(h.b,!0)),m=n.length,l=0;l<n.length;n.length===m||(0,A.M)(n),++l){k=B.a.c2(n[l])
j=k.length
if(j===0)continue
i=B.a.aA(k,"/")
B.b.j(o,new A.dO(i?B.a.m(k,0,j-1):k,i))}q=o
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$bk,r)},
ba(a){var s=0,r=A.p(t.N),q,p=this,o
var $async$ba=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=3
return A.f(p.cN("cat -- "+("'"+A.ad(a,"'","'\\''")+"'")),$async$ba)
case 3:o=c
if(o.a!==0)throw A.d(A.mR("cannot read "+a+": "+B.a.G(o.gdk())))
q=B.l.aK(o.b,!0)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$ba,r)},
bb(a,b){var s=0,r=A.p(t.H),q=this,p,o,n
var $async$bb=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:o=t.Bd.h("bE.S").a(B.r.Y(b))
n=B.cG.ghy().Y(o)
o=A.ad(n,"'","'\\''")
s=2
return A.f(q.cN("printf %s "+("'"+o+"'")+" | base64 -d > "+("'"+A.ad(a,"'","'\\''")+"'")),$async$bb)
case 2:p=d
if(p.a!==0)throw A.d(A.mR("cannot write "+a+": "+B.a.G(p.gdk())))
return A.n(null,r)}})
return A.o($async$bb,r)},
fa(a){var s=0,r=A.p(t.y),q,p=this
var $async$fa=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=3
return A.f(p.cN("test -e "+("'"+A.ad(a,"'","'\\''")+"'")),$async$fa)
case 3:q=c.a===0
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$fa,r)},
f6(a){var s=0,r=A.p(t.H),q=this,p,o
var $async$f6=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:p=A.ad(a,"'","'\\''")
s=2
return A.f(q.cN('mkdir -p -- "$(dirname -- '+("'"+p+"'")+')" && touch -- '+("'"+A.ad(a,"'","'\\''")+"'")),$async$f6)
case 2:o=c
if(o.a!==0)throw A.d(A.mR("cannot create "+a+": "+B.a.G(o.gdk())))
return A.n(null,r)}})
return A.o($async$f6,r)},
f5(a){var s=0,r=A.p(t.H),q=this,p
var $async$f5=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=2
return A.f(q.cN("mkdir -p -- "+("'"+A.ad(a,"'","'\\''")+"'")),$async$f5)
case 2:p=c
if(p.a!==0)throw A.d(A.mR("cannot create "+a+": "+B.a.G(p.gdk())))
return A.n(null,r)}})
return A.o($async$f5,r)},
d_(a,b){var s=0,r=A.p(t.vL),q,p=this,o,n,m
var $async$d_=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:s=3
return A.f(p.a.ck(a,b,p.b,p.c),$async$d_)
case 3:o=d
n=o.a
m=B.l.aK(o.b,!0)
B.l.aK(o.c,!0)
q=new A.mS(n,m)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$d_,r)},
p(){var s=0,r=A.p(t.H)
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:return A.n(null,r)}})
return A.o($async$p,r)},
$iFh:1}
A.dO.prototype={}
A.mS.prototype={}
A.mQ.prototype={
l(a){return this.a},
$iaf:1}
A.hr.prototype={}
A.eT.prototype={}
A.lg.prototype={
b1(){var s,r,q,p=this
if(p.as)return
p.as=!0
s=p.a
r=s.b
q=r.d
p.z=new A.ac(q,A.l(q).h("ac<1>")).aE(p.gnM())
q=r.e
p.Q=new A.ac(q,A.l(q).h("ac<1>")).aE(p.gnK())
s.d.a.aZ(p.gnA(),t.H).bF(new A.qZ(p))
if(p.d){p.at=!0
p.x.$1(!0)
return}s=p.c
q=t.L
r.cG(B.a9,q.a(B.r.Y(s.ghI()+"\n")),null)
r.cG(B.a9,q.a(B.r.Y(s.d1(p.b)+"\n")),null)},
nN(a){var s,r,q,p,o,n=this
t.p.a(a)
if(n.ax||n.a.w!=null||a.length===0)return
s=n.a
s.ee(a.length)
r=n.b
q=r.pY(a)
p=q.a
if(!B.H.gK(p)){n.f.$1(p)
o=n.CW
if(o!=null)o.j(0,p)}p=q.b
if(p!=null){n.cx=p
n.cy=q.c
n.db=q.d
n.dx=q.e}if(q.f){n.at=!1
n.x.$1(!1)
if(n.ay&&n.cx==null){n.ay=!1
s.b.cG(B.a9,t.L.a(B.r.Y(n.c.d1(r)+"\n")),null)}else n.w.$1(n.j9())
n.oe(q.r)}},
nL(a){var s,r=this
t.p.a(a)
if(r.ax||r.a.w!=null||a.length===0)return
r.a.ee(a.length)
r.f.$1(a)
s=r.CW
if(s!=null)s.j(0,a)},
oe(a){var s,r,q=this,p=q.ch
if(p==null)return
q.ch=null
s=q.CW
r=s==null?null:s.ft()
if(r==null)r=new Uint8Array(0)
q.CW=null
if((p.a.a&30)===0)p.V(new A.eT(r,a))},
j9(){var s=this
return new A.hr(s.cx,s.cy,s.db,s.dx)},
l3(a){var s,r,q=this
if(q.ax)return
if(B.a.G(a).length===0){q.w.$1(q.j9())
return}q.at=!0
q.x.$1(!0)
s=q.c
r=q.b
q.a.b.cG(B.a9,t.L.a(B.r.Y(s.fA(a,!0,A.IV(a)?s.d1(r):s.hV(r))+"\n")),null)},
re(a){var s,r,q=this
if(q.ax){s=A.nV(new A.bX("session has ended"),null)
r=new A.v($.E,t.AF)
r.c6(s)
return r}if(q.at||q.ch!=null){s=A.nV(new A.bX("a command is already running"),null)
r=new A.v($.E,t.AF)
r.c6(s)
return r}if(B.a.G(a).length===0)return A.xF(B.oH,t.x2)
s=new A.v($.E,t.AF)
q.ch=new A.W(s,t.kf)
r=A.e([],t.eE)
q.CW=new A.dQ(r)
q.at=!0
q.x.$1(!0)
r=q.c
q.a.b.cG(B.a9,t.L.a(B.r.Y(r.fA(a,!0,r.jO(q.b))+"\n")),null)
return s},
kV(a){t.L.a(a)
if(this.ax)return
this.a.b.cG(B.a9,a,null)},
j0(a){var s,r=this
A.a4(a)
if(r.ax)return
r.ax=!0
s=r.ch
if(s!=null&&(s.a.a&30)===0){r.CW=r.ch=null
s.a7(new A.bX("session ended during command"))}r.y.$1(a)},
bu(){var s=0,r=A.p(t.H),q=this
var $async$bu=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:s=2
return A.f(q.cf(),$async$bu)
case 2:s=3
return A.f(q.a.bu(),$async$bu)
case 3:return A.n(null,r)}})
return A.o($async$bu,r)},
p(){var s=0,r=A.p(t.H),q=this
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:s=2
return A.f(q.cf(),$async$p)
case 2:s=3
return A.f(q.a.p(),$async$p)
case 3:return A.n(null,r)}})
return A.o($async$p,r)},
cf(){var s=0,r=A.p(t.H),q=this,p,o
var $async$cf=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:o=q.z
o=o==null?null:o.U()
p=t.H
s=2
return A.f(o instanceof A.v?o:A.bs(o,p),$async$cf)
case 2:o=q.Q
o=o==null?null:o.U()
s=3
return A.f(o instanceof A.v?o:A.bs(o,p),$async$cf)
case 3:q.Q=q.z=null
return A.n(null,r)}})
return A.o($async$cf,r)}}
A.qZ.prototype={
$1(a){this.a.j0(-1)},
$S:13}
A.ly.prototype={
f3(a){var s=0,r=A.p(t.H),q=this,p
var $async$f3=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:p=q.e
if(p.a.j(0,a))p.nZ()
p=A.bs(null,t.H)
s=2
return A.f(p,$async$f3)
case 2:p=q.fx
p===$&&A.w("_histCursor")
p.ct()
return A.n(null,r)}})
return A.o($async$f3,r)},
c3(a){var s,r=this
r.CW=a
r.dx=A.DM(a)
s=r.at
if(!s)r.aI()},
kX(a){var s,r=this
if(a===r.db)return
r.db=a
s=r.at
if(!s)r.aI()},
ka(a){var s=this
if(s.ax===a)return
s.ax=a
if(!s.at&&s.ch==null)s.aI()},
kW(a){var s=this
if(s.at===a)return
s.at=a
s.fy=B.ba
s.go=""
B.b.a0(s.id)
s.k1=0
B.b.a0(s.cx)
s.cy=0
if(a)s.fO()},
kg(){var s=this
if(s.as!=null)return
if(s.at){s.r.$0()
return}s.iQ()},
b1(){this.z=this.a.aE(this.gnp())},
dl(a,b){return this.lh(b.h("H<0>(aa<k<c>>)").a(a),b,b)},
lh(a,b,c){var s=0,r=A.p(c),q,p=2,o=[],n=[],m=this,l,k
var $async$dl=A.q(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:k=A.ci(null,null,!1,t.L)
m.as=t.eU.a(J.Ce(k))
p=3
l=k
s=6
return A.f(a.$1(new A.ac(l,A.l(l).h("ac<1>"))),$async$dl)
case 6:l=e
q=l
n=[1]
s=4
break
n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
m.as=null
s=7
return A.f(k.p(),$async$dl)
case 7:m.fr=m.dy=0
if(!m.Q)m.aI()
s=n.pop()
break
case 5:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dl,r)},
p(){var s=0,r=A.p(t.H),q,p=this,o
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:if(p.Q){s=1
break}p.Q=!0
o=p.z
o=o==null?null:o.U()
s=3
return A.f(o instanceof A.v?o:A.bs(o,t.H),$async$p)
case 3:case 1:return A.n(q,r)}})
return A.o($async$p,r)},
nq(a){var s,r,q,p=this
t.L.a(a)
s=p.as
if(s!=null){s.$1(a)
return}if(p.at){p.x.$1(a)
return}if(p.ay&&p.ch==null)return
for(r=J.aN(a);r.q();){q=r.gA()
switch(p.fy.a){case 0:if(q===27)p.fy=B.pQ
else p.mP(q)
break
case 1:if(q===91||q===79){p.fy=B.pR
p.go=""}else p.fy=B.ba
break
case 2:if(q>=64&&q<=126){p.mE(A.ak(q),p.go)
p.fy=B.ba}else p.go=p.go+A.ak(q)
break}}},
mP(a){var s=this,r=s.id
if(r.length!==0){B.b.j(r,a)
if(r.length>=s.k1){s.iP(B.l.aK(r,!0))
B.b.a0(r)
s.k1=0}return}switch(a){case 13:case 10:s.lR()
break
case 127:case 8:s.lH()
break
case 3:s.iQ()
break
case 4:if(s.cx.length===0)s.w.$0()
break
case 1:s.h8()
break
case 5:s.h7()
break
case 9:s.ev()
break
default:if(a<32)return
if(a<128)s.iP(A.ak(a))
else{B.b.a0(r)
B.b.j(r,a)
if((a&224)===192)r=2
else r=(a&240)===224?3:4
s.k1=r}}},
mE(a,b){var s,r,q,p=this,o="_histCursor"
switch(a){case"A":s=p.fx
s===$&&A.w(o)
r=p.cx
q=s.rk(B.b.cp(r),B.b.cp(B.b.aq(r,0,p.cy)))
if(q!=null)p.ji(q)
break
case"B":s=p.fx
s===$&&A.w(o)
q=s.pQ()
if(q!=null)p.ji(q)
break
case"C":p.nh()
break
case"D":p.ng()
break
case"H":p.h8()
break
case"F":p.h7()
break
case"~":if(b==="1"||b==="7")p.h8()
else if(b==="4"||b==="8")p.h7()
else if(b==="3")p.m7()
break}},
iP(a){var s,r=this
B.b.hJ(r.cx,r.cy,a);++r.cy
s=r.fx
s===$&&A.w("_histCursor")
s.ct()
r.aI()},
lH(){var s=this,r=s.cy
if(r===0)return
B.b.bx(s.cx,r-1);--s.cy
r=s.fx
r===$&&A.w("_histCursor")
r.ct()
s.aI()},
m7(){var s=this,r=s.cy,q=s.cx
if(r>=q.length)return
B.b.bx(q,r)
r=s.fx
r===$&&A.w("_histCursor")
r.ct()
s.aI()},
ng(){var s=this,r=s.cy
if(r===0)return
s.cy=r-1
if(s.db>0){s.aI()
return}s.b.$1("\x1b[D")},
nh(){var s=this,r=s.cy
if(r>=s.cx.length)return
s.cy=r+1
if(s.db>0){s.aI()
return}s.b.$1("\x1b[C")},
h8(){var s=this,r=s.cy
if(r===0)return
if(s.db>0){s.cy=0
s.aI()
return}s.b.$1("\x1b["+r+"D")
s.cy=0},
h7(){var s=this,r=s.cx,q=r.length,p=q-s.cy
if(p===0)return
if(s.db>0){s.cy=q
s.aI()
return}s.b.$1("\x1b["+p+"C")
s.cy=r.length},
ev(){var s=0,r=A.p(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$ev=A.q(function(a,a0){if(a===1){o.push(a0)
s=p}for(;;)A:switch(s){case 0:c=m.y
if(c==null||m.ch!=null){s=1
break}h=m.cy
l=h
g=m.cx
f=g.length
for(;;){e=l
if(typeof e!=="number"){q=e.aP()
s=1
break A}if(e>0){e=l
if(typeof e!=="number"){q=e.l2()
s=1
break A}--e
if(e>>>0!==e||e>=f){q=A.b(g,e)
s=1
break A}e=g[e]!==" "}else e=!1
if(!e)break
e=l
if(typeof e!=="number"){q=e.l2()
s=1
break A}l=e-1}k=B.b.cp(B.b.aq(g,l,h))
j=B.b.hA(B.b.aq(g,0,l),new A.r5())
g=m.z
if(g!=null)g.d7()
p=4
s=7
return A.f(c.$2(k,j),$async$ev)
case 7:i=a0
m.lE(l,k,i)
n.push(6)
s=5
break
case 4:p=3
b=o.pop()
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
g=m.z
if(g!=null)g.cu()
s=n.pop()
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$ev,r)},
lE(a,b,c){var s,r,q,p=this
t.a.a(c)
s=J.at(c)
if(s.gK(c)){p.b.$1("\x07")
return}if(s.gn(c)===1){r=s.gI(c)
p.jj(a,r,!B.a.aA(r,"/"))
return}q=A.DL(c)
if(q.length>b.length)p.jj(a,q,!1)
else{p.b.$1("\r\n"+s.S(c,"  ")+"\r\n")
p.fr=p.dy=0
p.aI()}},
jj(a,b,c){var s,r=this,q=t.cS
q=A.d6(new A.ch(b),q.h("a(i.E)").a(A.nZ()),q.h("i.E"),t.N)
s=A.N(q,A.l(q).h("i.E"))
if(c)B.b.j(s," ")
B.b.bI(r.cx,a,r.cy,s)
r.cy=a+s.length
q=r.fx
q===$&&A.w("_histCursor")
q.ct()
r.aI()},
lR(){var s,r=this,q=r.cx,p=B.b.cp(q)
r.b.$1("\r\n")
B.b.a0(q)
r.fr=r.dy=r.cy=0
q=r.fx
q===$&&A.w("_histCursor")
q.ct()
s=r.ch
if(s!=null){r.ch=null
s.V(p)
return}r.eo(p)},
iQ(){var s,r,q=this
q.b.$1("^C\r\n")
B.b.a0(q.cx)
q.fr=q.dy=q.cy=0
s=q.fx
s===$&&A.w("_histCursor")
s.ct()
r=q.ch
if(r!=null){q.ch=null
r.V("")
return}q.r.$0()},
eo(a){return this.m8(a)},
m8(a){var s=0,r=A.p(t.H),q=1,p=[],o=[],n=this,m
var $async$eo=A.q(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:n.ay=!0
q=2
m=n.c.$1(a)
s=5
return A.f(m instanceof A.v?m:A.bs(m,t.H),$async$eo)
case 5:o.push(4)
s=3
break
case 2:o=[1]
case 3:q=1
n.ay=!1
s=o.pop()
break
case 4:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$eo,r)},
ji(a){var s,r=this.cx
B.b.a0(r)
s=t.cS
s=A.d6(new A.ch(a),s.h("a(i.E)").a(A.nZ()),s.h("i.E"),t.N)
s=A.N(s,A.l(s).h("i.E"))
B.b.C(r,s)
this.cy=r.length
this.aI()},
kp(a){var s
t.Q.a(a)
s=this.at
if(s){a.$0()
return}this.fO()
a.$0()
this.aI()},
aI(){var s,r,q,p=this
if(p.ax&&p.ch==null){p.fO()
return}if(p.db>0){p.o6()
return}s=p.cx
r=p.b
r.$1("\r\x1b[K"+p.CW+B.b.cp(s))
q=s.length-p.cy
if(q>0)r.$1("\x1b["+q+"D")},
o6(){var s,r,q=this,p=q.db,o=q.dx,n=q.cx,m=n.length,l=q.cy,k=o+m,j=B.c.dm(k+p-1,p),i=B.c.dm(o+q.fr,p),h=q.dy
i=h-(i+1)
i=i>0?"\x1b["+i+"B":""
for(--h,s=0;s<h;++s)i+="\r\x1b[K\x1b[1A"
n=i+"\r\x1b[K"+q.CW+B.b.cp(n)
if(l===m){if(k>0&&B.c.bc(k,p)===0){n+="\n\r";++j}}else{k=o+l
i=j-(B.c.dm(k,p)+1)
if(i>0)n+="\x1b["+i+"A"
r=B.c.bc(k,p)
n+=r>0?"\r\x1b["+r+"C":"\r"}q.fr=l
q.dy=j
q.b.$1(n.charCodeAt(0)==0?n:n)},
fO(){var s,r,q=this,p=q.db
if(p<=0){q.b.$1("\r\x1b[K")
q.fr=q.dy=0
return}p=B.c.dm(q.dx+q.fr,p)
s=q.dy
p=s-(p+1)
p=p>0?"\x1b["+p+"B":""
for(--s,r=0;r<s;++r)p+="\r\x1b[K\x1b[1A"
p+="\r\x1b[K"
q.fr=q.dy=0
q.b.$1(p.charCodeAt(0)==0?p:p)}}
A.r5.prototype={
$1(a){return A.r(a)===" "},
$S:1}
A.jH.prototype={
R(){return"_ParseState."+this.b}}
A.hp.prototype={}
A.r8.prototype={
gc_(){return this.a}}
A.av.prototype={
ghl(){return B.G},
gda(){return null}}
A.r9.prototype={
gpD(){var s,r=this.a
r=A.z4(new A.c2(r,A.l(r).h("c2<2>")),t.kQ)
s=A.N(r,A.l(r).c)
B.b.bn(s,new A.ra())
return s},
fp(a){var s,r,q,p,o
for(s=A.e([a.gT()],t.s),B.b.C(s,a.ghl()),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.M)(s),++p){o=s[p]
if(q.ag(o))throw A.d(A.cY(o,"command","already registered"))
q.i(0,o,a)}},
fd(a,b){var s=0,r=A.p(t.y),q,p=this,o,n,m
var $async$fd=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:m=B.a.i7(a)
if(!B.a.u(m,":")){q=!1
s=1
break}o=B.a.cC(B.a.G(B.a.D(m,1)),A.O("\\s+",!0))
if(o.length===0||B.b.gI(o).length===0){q=!0
s=1
break}n=p.a.k(0,B.b.gI(o))
if(n==null){b.w.$1("Unknown command: :"+B.b.gI(o))
q=!0
s=1
break}s=3
return A.f(n.B(b,B.b.b2(o,1)),$async$fd)
case 3:q=!0
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$fd,r)}}
A.ra.prototype={
$2(a,b){var s=t.kQ
s.a(a)
s.a(b)
return B.a.a3(a.gT(),b.gT())},
$S:86}
A.ng.prototype={
gT(){return"help"},
gaz(){return"List local commands"},
B(a,b){return this.r2(a,t.a.a(b))},
r2(a,b){var s=0,r=A.p(t.H),q,p,o,n,m,l,k,j,i
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:j=a.Q.gpD()
i=a.w
i.$1("OmnyShell v1.56.1")
i.$1("")
i.$1("Local commands:")
for(q=j.length,p=0;o=j.length,p<o;j.length===q||(0,A.M)(j),++p){n=j[p]
i.$1("  :"+B.a.kl(n.gT(),14)+" "+n.gaz())}for(p=0;p<j.length;j.length===o||(0,A.M)(j),++p){m=j[p].gda()
if(m==null)continue
i.$1("")
for(q=m.split("\n"),l=q.length,k=0;k<l;++k)i.$1(q[k])}return A.n(null,r)}})
return A.o($async$B,r)}}
A.nj.prototype={
gT(){return"info"},
gaz(){return"Show node and session info"},
B(a,b){return this.r4(a,t.a.a(b))},
r4(a,b){var s=0,r=A.p(t.H),q,p,o,n,m
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:p=a.b
o=p.c
n=o.length===0?"":" ("+o+")"
m=a.w
m.$1("Node: "+p.a.a+n)
n=p.b
if(n!=null)m.$1("UID: "+n.a)
n=p.d
m.$1("OS: "+n.a)
m.$1("Arch: "+n.b)
m.$1("Hostname: "+n.d)
m.$1("Agent: "+n.c)
m.$1("Hub: "+a.a.a.a.l(0))
n=p.e
if(n.gZ(n))m.$1("Labels: "+n.gX().b8(0,new A.vL(),t.N).S(0,", "))
q=a.d
if(q!=null){m.$1("Shell: "+A.GX(q.y))
n=q.r
n=n==null?null:n.a
if(n==null)n="(pending)"
m.$1("Session: "+n+" ("+q.a.b+")")}m.$1("Session Duration: "+A.Ar(new A.bk(Date.now(),0,!1).av().dR(a.f)))
return A.n(null,r)}})
return A.o($async$B,r)}}
A.vL.prototype={
$1(a){t.q.a(a)
return a.a+"="+a.b},
$S:25}
A.nT.prototype={
gT(){return"whoami"},
gaz(){return"Show the authenticated principal"},
B(a,b){return this.rd(a,t.a.a(b))},
rd(a,b){var s=0,r=A.p(t.H),q,p,o,n
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:n=a.c
if(n==null){a.w.$1("Not authenticated")
s=1
break}p=a.w
p.$1(n.b+" ("+n.a.a+")")
o=n.c
o=A.N(o,A.l(o).c)
B.b.di(o)
p.$1("Roles: "+B.b.S(o,", "))
case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.ns.prototype={
gT(){return"os"},
gaz(){return"Show the node's operating system"},
B(a,b){return this.r7(a,t.a.a(b))},
r7(a,b){var s=0,r=A.p(t.H),q
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:q=a.w.$1(a.b.d.a)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.mW.prototype={
gT(){return"arch"},
gaz(){return"Show the node's architecture"},
B(a,b){return this.qY(a,t.a.a(b))},
qY(a,b){var s=0,r=A.p(t.H),q
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:q=a.w.$1(a.b.d.b)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.nh.prototype={
gT(){return"host"},
gaz(){return"Show the node's hostname"},
B(a,b){return this.r3(a,t.a.a(b))},
r3(a,b){var s=0,r=A.p(t.H),q
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:q=a.w.$1(a.b.d.d)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.nr.prototype={
gT(){return"node"},
gaz(){return"Show the node id and labels"},
B(a,b){return this.r6(a,t.a.a(b))},
r6(a,b){var s=0,r=A.p(t.H),q,p
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:q=a.b
p=a.w
p.$1("Node: "+q.a.a+" ("+q.c+")")
q=q.e
if(q.gZ(q))p.$1("Labels: "+q.gX().b8(0,new A.vS(),t.N).S(0,", "))
return A.n(null,r)}})
return A.o($async$B,r)}}
A.vS.prototype={
$1(a){t.q.a(a)
return a.a+"="+a.b},
$S:25}
A.n3.prototype={
gT(){return"capabilities"},
gaz(){return"Show advertised node capabilities"},
B(a,b){return this.qZ(a,t.a.a(b))},
qZ(a,b){var s=0,r=A.p(t.H),q,p,o
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:o=a.b.r
if(o==null){a.w.$1("No capabilities advertised")
s=1
break}p=a.w
p.$1("Shells: "+B.b.S(o.a,", "))
p.$1("Features: "+B.b.S(o.b,", "))
p.$1("Max sessions: "+o.c)
case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.nx.prototype={
gT(){return"session"},
gaz(){return"Show the current session"},
B(a,b){return this.r9(a,t.a.a(b))},
r9(a,b){var s=0,r=A.p(t.H),q,p,o,n
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:o=a.d
n=o==null
if(n)q=null
else{q=o.r
q=q==null?null:q.a}if(q==null)q="(none)"
p=a.w
p.$1("Session: "+q)
n=n?null:o.a.b
p.$1("Mode: "+(n==null?"(none)":n))
p.$1("Duration: "+A.Ar(new A.bk(Date.now(),0,!1).av().dR(a.f)))
return A.n(null,r)}})
return A.o($async$B,r)}}
A.no.prototype={
gT(){return"latency"},
gaz(){return"Measure round-trip latency to the Hub"},
B(a,b){return this.r5(a,t.a.a(b))},
r5(a,b){var s=0,r=A.p(t.H),q,p
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:q=a.w
p=B.c
s=2
return A.f(a.gc_().km(),$async$B)
case 2:q.$1("RTT: "+p.W(d.a,1000)+"ms")
return A.n(null,r)}})
return A.o($async$B,r)}}
A.nu.prototype={
gT(){return"ping"},
gaz(){return"Ping the Hub (optionally N times, e.g. :ping 3)"},
B(a,b){return this.r8(a,t.a.a(b))},
r8(a,b){var s=0,r=A.p(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$B=A.q(function(c,a0){if(c===1)return A.m(a0,r)
for(;;)switch(s){case 0:if(b.length!==0){p=A.bJ(B.b.gI(b),null)
if(p==null||p<1){a.w.$1("usage: :ping [count] (count must be a positive integer)")
s=1
break}o=p}else o=1
n=A.e([],t.t)
m=a.w,l=""+o,k=o===1,j=a.a,i=0
case 3:if(!(i<o)){s=5
break}d=B.c
s=6
return A.f(j.km(),$async$B)
case 6:h=d.W(a0.a,1000)
B.b.j(n,h)
g=""+h
m.$1(k?"pong "+g+"ms":"pong "+(i+1)+"/"+l+" "+g+"ms")
case 4:++i
s=3
break
case 5:if(o>1){f=B.b.e6(n,new A.vU())
e=B.b.e6(n,new A.vV())
m.$1("--- "+l+" pings \xb7 min "+f+"ms \xb7 avg "+B.p.cv(B.b.e6(n,new A.vW())/n.length)+"ms \xb7 max "+e+"ms")}case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.vU.prototype={
$2(a,b){A.a4(a)
A.a4(b)
return a<b?a:b},
$S:23}
A.vV.prototype={
$2(a,b){A.a4(a)
A.a4(b)
return a>b?a:b},
$S:23}
A.vW.prototype={
$2(a,b){return A.a4(a)+A.a4(b)},
$S:23}
A.nH.prototype={
gT(){return"tunnel"},
gaz(){return"Expose this node's TCP port through the Hub"},
gda(){return":tunnel <subcommand>   Forward a node TCP port through a public Hub port.\n\n    :tunnel <port> [--public-port N] [--secure]   Expose this node's localhost:<port>\n    :tunnel ls                                    List your active tunnels on this node\n    :tunnel close <id>                            Close a tunnel by id or prefix"},
B(a,b){return this.rb(a,t.a.a(b))},
rb(a,b){var s=0,r=A.p(t.H),q,p=this
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:if(b.length===0){a.w.$1("usage: :tunnel <port> [--public-port N] [--secure] | :tunnel ls | :tunnel close <id>")
s=1
break}case 3:switch(B.b.gI(b)){case"ls":s=5
break
case"list":s=6
break
case"close":s=7
break
case"rm":s=8
break
default:s=9
break}break
case 5:case 6:s=10
return A.f(p.ew(a),$async$B)
case 10:s=4
break
case 7:case 8:s=11
return A.f(p.ey(a,B.b.b2(b,1)),$async$B)
case 11:s=4
break
case 9:s=12
return A.f(p.eF(a,B.b.gI(b)==="open"?B.b.b2(b,1):b),$async$B)
case 12:case 4:case 1:return A.n(q,r)}})
return A.o($async$B,r)},
eF(a,b){return this.nO(a,t.a.a(b))},
nO(a0,a1){var s=0,r=A.p(t.H),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$eF=A.q(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)A:switch(s){case 0:d=null
c=null
b=!1
for(j=0;i=a1.length,j<i;++j){h=a1[j]
if(h==="--public-port"||h==="-p"){++j
if(j>=i){a0.w.$1("usage: :tunnel <port> [--public-port N] [--secure]")
s=1
break A}c=A.bJ(a1[j],null)
if(c==null){a0.w.$1("tunnel: invalid --public-port value")
s=1
break A}}else if(h==="--secure"||h==="-s")b=!0
else if(d==null)d=A.bJ(h,null)}if(d==null||d<1||d>65535){a0.w.$1("usage: :tunnel <port> [--public-port N] [--secure] (port 1-65535)")
s=1
break}p=4
i=a0.gc_()
g=a0.b.a.a
f=d
s=7
return A.f(i.qy(g,c,b,f),$async$eF)
case 7:n=a3
m=n.c.length===0?a0.gc_().a.a.gbj():n.c
l=n.f?"https://":""
i=a0.w
i.$1("Tunnel "+n.gig()+" open: "+A.u(l)+A.u(m)+":"+n.d+" -> "+g+":"+n.e)
i.$1("Close with :tunnel close "+n.gig())
p=2
s=6
break
case 4:p=3
a=o.pop()
k=A.R(a)
i=A.ap(k)
i=i instanceof A.dH?i.b:J.b9(i)
a0.w.$1("tunnel: "+i)
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$eF,r)},
ew(a){return this.n8(a)},
n8(a1){var s=0,r=A.p(t.H),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$ew=A.q(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(a1.gc_().qf(),$async$ew)
case 7:n=a3
i=J.yv(n,new A.w4(a1))
h=A.N(i,i.$ti.h("i.E"))
m=h
if(J.aE(m)===0){a1.w.$1("No tunnels on "+a1.b.a.a+".")
s=1
break}for(i=m,g=i.length,f=a1.w,e=a1.a,d=0;d<i.length;i.length===g||(0,A.M)(i),++d){l=i[d]
if(l.f.length===0)c=e.a.a.gbj()
else c=l.f
k=c
b=l.a
b=b.length<=8?b:B.a.m(b,0,8)
f.$1(b+"  "+A.u(k)+":"+l.r+" -> "+l.d+":"+l.e)}p=2
s=6
break
case 4:p=3
a0=o.pop()
j=A.R(a0)
i=A.ap(j)
i=i instanceof A.dH?i.b:J.b9(i)
a1.w.$1("tunnel: "+i)
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$ew,r)},
ey(a,b){return this.lO(a,t.a.a(b))},
lO(a,b){var s=0,r=A.p(t.H),q,p=2,o=[],n,m,l,k,j
var $async$ey=A.q(function(c,d){if(c===1){o.push(d)
s=p}for(;;)switch(s){case 0:if(b.length===0){a.w.$1("usage: :tunnel close <id>")
s=1
break}p=4
s=7
return A.f(a.gc_().pB(B.b.gI(b)),$async$ey)
case 7:n=d
l=n.a?"Tunnel closed.":"tunnel: "+n.b
a.w.$1(l)
p=2
s=6
break
case 4:p=3
j=o.pop()
m=A.R(j)
l=A.ap(m)
l=l instanceof A.dH?l.b:J.b9(l)
a.w.$1("tunnel: "+l)
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$ey,r)}}
A.w4.prototype={
$1(a){return t.r_.a(a).b===this.a.b.a.a},
$S:89}
A.nG.prototype={
gT(){return"tree"},
gaz(){return"Print a sized directory tree of a remote path"},
gda(){return":tree [path] [-L depth] [-a]\n    Print a tree of a remote path (default: current dir) showing the\n    size of every file and the aggregated size of every directory.\n    -L depth   limit display depth (default 3; 0 = unlimited)\n    -a         include hidden entries (dot-files)"},
B(a,b){return this.ra(a,t.a.a(b))},
ra(b1,b2){var s=0,r=A.p(t.H),q,p=2,o=[],n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
var $async$B=A.q(function(b3,b4){if(b3===1){o.push(b4)
s=p}for(;;)A:switch(s){case 0:for(k=3,j=!1,i=null,h=0;g=b2.length,h<g;++h){f=b2[h]
if(f==="-a"||f==="--all")j=!0
else if(f==="-L"){e=h+1
if(e<g){d=b2[e]
h=e}else d=null
c=d==null?null:A.bJ(d,null)
if(c==null||c<0){b1.w.$1(u.x)
s=1
break A}k=c}else if(B.a.u(f,"-L")){c=A.bJ(B.a.D(f,2),null)
if(c==null||c<0){b1.w.$1(u.x)
s=1
break A}k=c}else{if(B.a.u(f,"-")){b1.w.$1("usage: :tree [path] [-L depth] [-a]")
s=1
break A}else if(i!=null){b1.w.$1("usage: :tree [path] [-L depth] [-a]")
s=1
break A}i=f}}g=i==null?".":i
b=b1.y.$0()
a=A.J8(g,b)
if(B.a.aA(a,"/."))a=B.a.m(a,0,a.length-2)
g=a.length
if(g>1&&B.a.aA(a,"/"))a=B.a.m(a,0,g-1)
g=b1.b
a0=g.d.a.toLowerCase()
a1=B.a.t(a0,"mac")||B.a.t(a0,"darwin")?"stat -f '%HT|%z|%N'":"stat -c '%F|%s|%n'"
a2=A.J3(a)
a3=B.a.u(a2,".")&&a2!=="."&&a2!==".."
if(!j&&!a3)a4="find "+("'"+A.ad(a,"'","'\\''")+"'")+" \\( -name '.?*' -prune \\) -o -exec "+a1+" {} +"
else a4="find "+("'"+A.ad(a,"'","'\\''")+"'")+" -exec "+a1+" {} +"
n=a4
m=null
p=4
s=7
return A.f(b1.gc_().pU(n,g.a.a),$async$B)
case 7:m=b4
p=2
s=6
break
case 4:p=3
b0=o.pop()
l=A.R(b0)
b1.w.$1("tree failed: "+A.u(l))
s=1
break
s=6
break
case 3:s=2
break
case 6:if(m.a!==0){a6=B.a.G(B.l.aK(m.c,!0))
g=a6.length===0?"tree: failed (exit "+m.a+")":"tree: "+a6
b1.w.$1(g)
s=1
break}a7=A.IZ(B.l.aK(m.b,!0))
if(a7.length===0){b1.w.$1("No such remote file or directory: "+a)
s=1
break}for(g=A.J4(a,a7,k),b=g.length,a8=b1.w,a9=0;a9<g.length;g.length===b||(0,A.M)(g),++a9)a8.$1(g[a9])
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$B,r)}}
A.c8.prototype={}
A.x6.prototype={
$0(){return new A.c8(this.a,!1,A.I(t.N,t.tW))},
$S:90}
A.x7.prototype={
$3(a,b,c){var s,r,q,p,o,n,m,l,k=this,j=k.b
if(j!==0&&c>j)return
j=a.f
s=A.l(j).h("c2<2>")
r=A.N(new A.c2(j,s),s.h("i.E"))
B.b.bn(r,new A.x8())
for(j=k.a,s=k.c,q=c+1,p=0;o=r.length,p<o;++p){n=r[p]
m=p===o-1
l=n.a
if(n.c)l+=" ->"
o=m?"\u2514\u2500\u2500 ":"\u251c\u2500\u2500 "
B.b.j(s,b+o+l+"  ["+A.AW(n.e)+"]")
o=n.b
if(o)++j.b
else ++j.a
if(o&&n.f.a!==0)k.$3(n,b+(m?"    ":"\u2502   "),q)}},
$S:91}
A.x8.prototype={
$2(a,b){var s=t.tW
s.a(a)
s.a(b)
s=a.b
if(s!==b.b)return s?-1:1
return B.a.a3(a.a,b.a)},
$S:92}
A.na.prototype={
gT(){return"detach"},
gaz(){return"Detach the session while keeping the remote shell running"},
gda(){return":detach [timeout]\n    Detach the current session while keeping the remote shell running.\n    The PTY, shell and child processes stay alive on the node; reconnect\n    later with `omnyshell sessions resume`.\n\n    An optional timeout (units s, m, h, d) expires the session; without\n    one it stays detached indefinitely.\n\n    Examples:\n      :detach\n      :detach 1h\n      :detach 30m"},
B(a,b){return this.r0(a,t.a.a(b))},
r0(a,b){var s=0,r=A.p(t.H),q,p=2,o=[],n,m,l,k,j,i,h
var $async$B=A.q(function(c,d){if(c===1){o.push(d)
s=p}for(;;)switch(s){case 0:i=a.d
if(i==null||i.r==null){a.w.$1("No active session to detach.")
s=1
break}n=null
if(b.length!==0){n=A.GS(B.b.gI(b))
if(n==null){a.w.$1('Invalid timeout "'+B.b.gI(b)+'". Use a number with unit s, m, h or d (e.g. 30m, 2h, 1d).')
s=1
break}}m=null
p=4
s=7
return A.f(i.jY(n),$async$B)
case 7:m=d
p=2
s=6
break
case 4:p=3
h=o.pop()
l=A.R(h)
a.w.$1("Detach failed: "+A.u(l))
s=1
break
s=6
break
case 3:s=2
break
case 6:j=a.w
j.$1("")
j.$1("Session detached successfully.")
j.$1("")
j.$1("Session ID: "+m.b)
if(m.c!=null)j.$1("Expires: "+m.c.ri().l(0))
j.$1("")
j.$1("Resume later using:")
j.$1("")
j.$1("  omnyshell sessions resume "+a.b.a.a+" "+m.b)
j.$1("")
a.ch=a.CW=!0
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$B,r)}}
A.ne.prototype={
gT(){return"exit"},
ghl(){return B.ks},
gaz(){return"Close the session and disconnect"},
B(a,b){return this.r1(a,t.a.a(b))},
r1(a,b){var s=0,r=A.p(t.H)
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:a.ch=!0
return A.n(null,r)}})
return A.o($async$B,r)}}
A.n4.prototype={
gT(){return"clear"},
gaz(){return"Clear the terminal screen and scrollback"},
B(a,b){return this.r_(a,t.a.a(b))},
r_(a,b){var s=0,r=A.p(t.H)
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:a.w.$1("\x1b[2J\x1b[3J\x1b[H")
return A.n(null,r)}})
return A.o($async$B,r)}}
A.cg.prototype={
ee(a){var s=this.b
return s.dh(new A.dw(s.a,"stdout",a))},
kt(a,b){var s=this.b
return s.dh(new A.eh(s.a,a,b))},
ic(a){var s=this.b
return s.dh(new A.ei(s.a,a))},
jY(a){var s=this.b,r=a==null?null:B.c.W(a.a,1e6)
s.dh(new A.eL(s.a,r))
return this.e.a},
bu(){return this.jY(null)},
o8(a){var s,r,q,p,o,n,m,l,k=this,j=null,i="_controlSub"
t.An.a(a)
A:{s=a instanceof A.eP
r=s?a:j
if(s){s=r.b
if(B.a.G(s).length===0)A.K(B.mP)
k.r=new A.mj(s)
k.x=r.d
k.y=A.xR(r.e)
s=k.c
if((s.a.a&30)===0)s.bt()
break A}s=a instanceof A.eQ
q=s?a:j
if(s){s=k.c
if((s.a.a&30)===0){p=q.c
o=q.b
s.a7(new A.j2(o,p))}break A}s=a instanceof A.eM
n=s?a:j
if(s){m=new A.is(n.c,n.d)
k.w=m
s=k.e
if((s.a.a&30)===0)s.V(m)
s=k.d
if((s.a.a&30)===0)s.V(0)
s=k.f
s===$&&A.w(i)
s.U()
k.b.p()
break A}s=a instanceof A.eg
l=s?a:j
if(s){s=k.d
if((s.a.a&30)===0)s.V(l.b)
break A}if(a instanceof A.dv){s=k.c
if((s.a.a&30)===0)s.a7(B.nj)
s=k.d
if((s.a.a&30)===0)s.V(-1)
s=k.f
s===$&&A.w(i)
s.U()
k.b.p()
break A}break A}},
p(){var s=0,r=A.p(t.H),q=this,p,o
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:o=q.b
o.dh(new A.dv(o.a,"client_closed",null))
p=q.f
p===$&&A.w("_controlSub")
s=2
return A.f(p.U(),$async$p)
case 2:p=q.d
if((p.a.a&30)===0)p.V(-1)
s=3
return A.f(o.p(),$async$p)
case 3:return A.n(null,r)}})
return A.o($async$p,r)},
$iEL:1}
A.is.prototype={}
A.hq.prototype={
jO(a){return this.d1(a)}}
A.m0.prototype={
ghI(){return"trap ':' INT"},
d1(a){var s=a.gcz()
return"printf '%s%s%s\\t%s\\t%s\\t%s\\n' '"+s.a+"' '"+s.b+'\' "$PWD" "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" "$(git status --porcelain 2>/dev/null | awk \'BEGIN{s=0;m=0;u=0}/^\\?\\?/{u++;next}{if(substr($0,1,1)!=" ")s++;if(substr($0,2,1)!=" ")m++}END{if(s+m+u>0)printf "+%d ~%d ?%d",s,m,u}\')" "$([ "$(id -u 2>/dev/null)" = 0 ] && echo root)"'},
hV(a){var s=a.gcz()
return"printf '%s%s\\n' '"+s.a+"' '"+s.b+"'"},
jO(a){var s=a.gcz()
return"__omny_ec=$?; printf '%s%s%s\\t%s\\t%s\\t%s\\t%s\\n' '"+s.a+"' '"+s.b+'\' "$PWD" "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" "$(git status --porcelain 2>/dev/null | awk \'BEGIN{s=0;m=0;u=0}/^\\?\\?/{u++;next}{if(substr($0,1,1)!=" ")s++;if(substr($0,2,1)!=" ")m++}END{if(s+m+u>0)printf "+%d ~%d ?%d",s,m,u}\')" "$([ "$(id -u 2>/dev/null)" = 0 ] && echo root)" "$__omny_ec"'},
fA(a,b,c){var s=A.ad(a,"'","'\\''")
return"stty echo 2>/dev/null ; "+("eval '"+s+"' ; "+c)+" ; stty -echo 2>/dev/null"},
hq(a,b){var s="'"+A.ad(a,"'","'\\''")+"'"
if(!b)return"w="+s+'; for p in "$w"*; do [ -e "$p" ] || continue; if [ -d "$p" ]; then printf "%s/\\n" "$p"; else printf "%s\\n" "$p"; fi; done'
return"w="+s+'; case "$w" in */*) for p in "$w"*; do [ -e "$p" ] || continue; if [ -d "$p" ]; then printf "%s/\\n" "$p"; else printf "%s\\n" "$p"; fi; done ;; *) IFS=:; for d in $PATH; do [ -d "$d" ] || continue; for p in "$d"/"$w"*; do [ -f "$p" ] && [ -x "$p" ] && printf "%s\\n" "${p##*/}"; done; done | sort -u ;; esac'}}
A.m2.prototype={
ghI(){return"function prompt { '' }; $ErrorActionPreference='Continue'"},
d1(a){var s=a.gcz()
return"$o=[Console]::Out;$br=(\"$(git rev-parse --abbrev-ref HEAD 2>$null)\").Trim();$st=@(git status --porcelain 2>$null);$s=0;$m=0;$u=0;foreach($l in $st){if($l -match '^\\?\\?'){$u++}else{if($l.Length -ge 1 -and $l[0] -ne ' '){$s++};if($l.Length -ge 2 -and $l[1] -ne ' '){$m++}}};$stat=if($s+$m+$u -gt 0){\"+$s ~$m ?$u\"}else{$null};$pv=if(([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)){'root'}else{$null};"+("$o.Write('"+s.a+"'+'"+s.b+"'+$PWD.Path+[char]9+$br+[char]9+$stat+[char]9+$pv+[char]10);$o.Flush()")},
hV(a){var s=a.gcz()
return"[Console]::Out.Write('"+s.a+"'+'"+s.b+"'+[char]10);[Console]::Out.Flush()"},
fA(a,b,c){return a+" ; "+c},
hq(a,b){var s=A.ad(a,"'","''"),r=!b||B.a.t(a,"/")||B.a.t(a,"\\")?"$i=[Math]::Max($w.LastIndexOf('/'),$w.LastIndexOf('\\'));if($i -ge 0){$pre=$w.Substring(0,$i+1);$leaf=$w.Substring($i+1)}else{$pre='';$leaf=$w};$base=if($pre){$pre}else{'.'};Get-ChildItem -Force -LiteralPath $base -ErrorAction SilentlyContinue|Where-Object{$_.Name -like ($leaf+'*')}|ForEach-Object{$p=$pre+$_.Name;if($_.PSIsContainer){\"$p/\"}else{\"$p\"}}":"Get-Command -All -CommandType Application,Cmdlet,Function,Alias -Name ($w+'*') -ErrorAction SilentlyContinue|ForEach-Object{$_.Name}|Sort-Object -Unique"
return"$w="+("'"+s+"'")+";"+r}}
A.kH.prototype={
ghI(){return"prompt $G"},
d1(a){var s=a.gcz()
return'<nul set /p "='+s.a+'"& <nul set /p "='+s.b+'%CD%"& echo.'},
hV(a){var s=a.gcz()
return'<nul set /p "='+s.a+'"& <nul set /p "='+s.b+'"& echo.'},
fA(a,b,c){return a+" & "+c},
hq(a,b){var s=A.O('[\\"%&|<>^]',!0),r=A.ad(a,s,"")
if(!b||B.a.t(a,"/")||B.a.t(a,"\\"))return"for /d %A in ("+r+"*) do @echo %A/ & for %A in ("+r+'*) do @if not exist "%A\\" @echo %A'
return'for /f "delims=" %A in (\'where "'+r+"*\" 2^>nul') do @echo %~nxA"}}
A.wM.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
if(!(a>=0&&a<5))return A.b(B.bN,a)
s=B.bN[a].a
r=s[0]
q=s[1]
p=s[2]
o=s[3]
n=r?"@"+j.a:""
m=q?j.b:j.c
l=o&&j.d?" "+j.e:""
s=j.f
k=s==null||!p?"":" git("+s+l+")"
return j.r+n+":"+m+k+j.w+" $ "},
$S:41}
A.nP.prototype={
bG(){var s=0,r=A.p(t.y),q
var $async$bG=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:q=!1
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$bG,r)},
p(){var s=0,r=A.p(t.H)
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:return A.n(null,r)}})
return A.o($async$p,r)},
$iz5:1}
A.m6.prototype={
v(){var s=this.c
s=A.N(s,A.l(s).c)
B.b.di(s)
return A.G(["id",this.a.a,"displayName",this.b,"roles",s],t.N,t.z)}}
A.iZ.prototype={
v(){return A.G(["term",this.a,"cols",this.b,"rows",this.c],t.N,t.z)}}
A.j6.prototype={
R(){return"ShellFamily."+this.b}}
A.aB.prototype={
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"sessionId",r.a)
q.i(0,"shortId",r.b)
q.i(0,"nodeId",r.c)
q.i(0,"ownerUserId",r.d)
q.i(0,"mode",r.e.b)
q.i(0,"createdAt",r.f.av().b_())
s=r.r
if(s!=null)q.i(0,"detachedAt",s.av().b_())
s=r.w
if(s!=null)q.i(0,"expiresAt",s.av().b_())
q.i(0,"state",r.x.b)
s=r.y
if(s!=null)q.i(0,"currentCommand",s)
s=r.z
if(s!=null)q.i(0,"currentCwd",s)
return q}}
A.rp.prototype={
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"shells",r.a)
q.i(0,"features",r.b)
q.i(0,"maxSessions",r.c)
s=r.d
if(s!=null)q.i(0,"directEndpoint",s)
return q}}
A.aZ.prototype={
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"nodeId",r.a.a)
s=r.b
if(s!=null)q.i(0,"uid",s.a)
q.i(0,"displayName",r.c)
q.i(0,"platform",r.d.v())
q.i(0,"labels",r.e)
q.i(0,"online",r.f)
s=r.r
if(s!=null)q.i(0,"capabilities",s.v())
return q}}
A.rM.prototype={
v(){var s=this
return A.G(["os",s.a,"arch",s.b,"agentVersion",s.c,"hostname",s.d],t.N,t.z)}}
A.eN.prototype={
R(){return"SessionMode."+this.b}}
A.dL.prototype={
R(){return"SessionState."+this.b}}
A.bz.prototype={
v(){var s=this,r=A.I(t.N,t.z)
r.i(0,"tunnelId",s.a)
r.i(0,"nodeId",s.b)
r.i(0,"ownerUserId",s.c)
r.i(0,"targetHost",s.d)
r.i(0,"targetPort",s.e)
r.i(0,"publicHost",s.f)
r.i(0,"publicPort",s.r)
if(s.w)r.i(0,"secure",!0)
r.i(0,"createdAt",s.x.av().b_())
return r}}
A.lM.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.lM&&b.a===this.a},
gE(a){return B.a.gE(this.a)},
l(a){return this.a}}
A.lR.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.lR&&b.a===this.a},
gE(a){return B.a.gE(this.a)},
l(a){return this.a}}
A.m7.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.m7&&b.a===this.a},
gE(a){return B.a.gE(this.a)},
l(a){return this.a}}
A.mj.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.mj&&b.a===this.a},
gE(a){return B.a.gE(this.a)},
l(a){return this.a}}
A.mC.prototype={
hu(a){var s=0,r=A.p(t.E4),q,p=this
var $async$hu=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:q=new A.dt("token",p.a,p.b,null,null)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$hu,r)},
$iCZ:1}
A.ji.prototype={
lv(a,b){var s=this,r=s.a.r.b
r===$&&A.w("_foreign")
r=r.b
r===$&&A.w("_streamController")
new A.ac(r,A.l(r).h("ac<1>")).au(new A.v8(s),!1,s.gmD(),new A.v9(s))},
af(a){var s
if(!this.e)return
s=this.a.gih()
s.a.j(0,A.l(s).h("d_.T").a(this.b.cX(a)))},
p(){var s=0,r=A.p(t.H),q,p=this
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:if(!p.e){s=1
break}p.e=!1
s=3
return A.f(p.a.gih().bs(null,null),$async$p)
case 3:p.h0()
case 1:return A.n(q,r)}})
return A.o($async$p,r)},
h0(){var s,r=this
if(!r.e&&(r.d.a.a&30)!==0)return
r.e=!1
s=r.c
if((s.b&4)===0)s.p()
s=r.d
if((s.a.a&30)===0)s.bt()},
$irC:1}
A.v8.prototype={
$1(a){var s,r,q
try{s=this.a
r=a==null?A.ap(a):a
s.c.j(0,s.b.b5(r))}catch(q){}},
$S:10}
A.v9.prototype={
$1(a){A.ap(a)
return this.a.h0()},
$S:36}
A.kB.prototype={
dh(a){if(this.x)return
this.b.$1(new A.aL(a))},
cG(a,b,c){var s,r,q,p,o
t.L.a(b)
if(this.x||J.bZ(b))return
s=t.p.b(b)?b:new Uint8Array(A.c9(b))
for(r=s.length,q=this.r,p=0;p<r;p=o){o=B.c.M(p+65536,0,r)
B.b.j(q,new A.nt(a,A.zA(s,p,o),null))}this.iM()},
iM(){var s,r,q,p=this,o=p.r,n=p.a,m=p.b
for(;;){if(!(o.length!==0&&p.w>=B.b.gI(o).b.length))break
s=B.b.bx(o,0)
r=s.b
q=r.length
p.w=p.w-q
m.$1(new A.en(1,s.a,n,r))
r=s.c
if(r!=null){q=r.c+=q
r.b.$1(q)}}if(o.length===0)p.iD()},
iD(){var s,r,q=this.y,p=q.length
if(p===0)return
for(s=0;s<q.length;q.length===p||(0,A.M)(q),++s){r=q[s]
if(!r.gaN())r.bt()}B.b.a0(q)},
pM(a){var s,r=this
if(r.x)return
switch(a.b.a){case 0:s=t.dF.a(r.c)
if((s.b&4)===0)s.j(0,a.d)
break
case 1:s=t.dF.a(r.d)
if((s.b&4)===0)s.j(0,a.d)
break
case 2:s=t.dF.a(r.e)
if((s.b&4)===0)s.j(0,a.d)
break}},
pL(a){var s
if(this.x)return
s=this.f
if((s.b&4)===0)s.j(0,a)},
p(){var s=0,r=A.p(t.H),q,p=this
var $async$p=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:if(p.x){s=1
break}p.x=!0
B.b.a0(p.r)
p.iD()
p.c.p()
p.d.p()
p.e.p()
p.f.p()
case 1:return A.n(q,r)}})
return A.o($async$p,r)}}
A.nt.prototype={}
A.kC.prototype={
lj(a,b){var s=this,r=s.a.c
r=t.iI.a(new A.ac(r,A.l(r).h("ac<1>")).au(s.gmc(),!1,s.gnw(),new A.p_()))
s.d!==$&&A.ax("_sub")
s.d=r},
iG(a){var s=null,r=t.p,q=new A.kB(a,this.a.gkS(),A.ci(s,s,!1,r),A.ci(s,s,!1,r),A.ci(s,s,!1,r),A.ci(s,s,!1,t.An),A.e([],t.BL),A.e([],t.Fz))
this.b.i(0,a,q)
return q},
dN(a){var s=0,r=A.p(t.H),q=this,p
var $async$dN=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:p=q.b.a5(0,a)
s=p!=null?2:3
break
case 2:s=4
return A.f(p.p(),$async$dN)
case 4:case 3:return A.n(null,r)}})
return A.o($async$dN,r)},
md(a){var s,r,q,p,o
t.nl.a(a)
s=a.ga9()
r=s!=null&&s!==0?this.b.k(0,s):null
if(r!=null){A:{q=a instanceof A.en
p=q?a:null
if(q){r.pM(p)
break A}q=a instanceof A.aL
o=q?a.a:null
if(q){if(o instanceof A.dw){q=o.c
r.w+=q
r.iM()}r.pL(o)}}return}if(a instanceof A.aL&&(this.c.c&4)===0)this.c.j(0,a.a)},
nx(){var s=this.c
if((s.c&4)===0)s.p()},
ah(){var s=0,r=A.p(t.H),q,p=this,o,n,m,l
var $async$ah=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:if(p.f){s=1
break}p.f=!0
o=p.d
o===$&&A.w("_sub")
s=3
return A.f(o.U(),$async$ah)
case 3:o=p.b
n=A.l(o).h("c2<2>")
m=A.N(new A.c2(o,n),n.h("i.E"))
o.a0(0)
o=m.length,l=0
case 4:if(!(l<m.length)){s=6
break}s=7
return A.f(m[l].p(),$async$ah)
case 7:case 5:m.length===o||(0,A.M)(m),++l
s=4
break
case 6:o=p.c
s=(o.c&4)===0?8:9
break
case 8:s=10
return A.f(o.p(),$async$ah)
case 10:case 9:case 1:return A.n(q,r)}})
return A.o($async$ah,r)}}
A.p_.prototype={
$1(a){A.ap(a)},
$S:7}
A.F.prototype={
ga9(){return null}}
A.dA.prototype={
gF(){return"hello"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"role",r.a)
q.i(0,"protocolVersion",r.b)
q.i(0,"minVersion",r.c)
s=r.d
if(s!=null)q.i(0,"nonce",s)
s=r.e
if(s.gZ(s))q.i(0,"info",s)
return q}}
A.dt.prototype={
gF(){return"auth.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"method",r.a)
q.i(0,"principal",r.b)
s=r.c
if(s!=null)q.i(0,"token",s)
s=r.d
if(s!=null)q.i(0,"publicKey",s)
s=r.e
if(s!=null)q.i(0,"signature",s)
return q}}
A.ec.prototype={
gF(){return"auth.ok"},
v(){var s=this
return A.G(["principal",s.a,"displayName",s.b,"roles",s.c,"sessionToken",s.d],t.N,t.z)}}
A.eb.prototype={
gF(){return"auth.fail"},
v(){return A.G(["reason",this.a,"message",this.b],t.N,t.z)}}
A.ha.prototype={
gF(){return"node.register"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"nodeId",r.a)
s=r.b
if(s!=null)q.i(0,"uid",s)
q.i(0,"displayName",r.c)
q.i(0,"platform",r.d.v())
q.i(0,"labels",r.e)
return q}}
A.hb.prototype={
gF(){return"node.registered"},
v(){return A.G(["nodeId",this.a,"assignedAt",this.b.av().b_()],t.N,t.z)}}
A.h1.prototype={
gF(){return"node.capabilities"},
v(){return this.a.v()}}
A.h8.prototype={
gF(){return"node.heartbeat"},
v(){var s=this
return A.G(["nodeId",s.a,"activeSessions",s.b,"seq",s.c,"ts",s.d.av().b_()],t.N,t.z)}}
A.h9.prototype={
gF(){return"node.heartbeat.ack"},
v(){return A.G(["seq",this.a,"ts",this.b.av().b_()],t.N,t.z)}}
A.eJ.prototype={
gF(){return"ping"},
v(){return A.G(["id",this.a,"ts",this.b.av().b_()],t.N,t.z)}}
A.eK.prototype={
gF(){return"pong"},
v(){return A.G(["id",this.a,"ts",this.b.av().b_(),"serverTs",this.c.av().b_()],t.N,t.z)}}
A.eB.prototype={
gF(){return"node.list.request"},
v(){var s=A.I(t.N,t.z),r=this.a
if(r.gZ(r))s.i(0,"filter",r)
return s}}
A.eC.prototype={
gF(){return"node.list.response"},
v(){var s=this.a,r=A.U(s),q=r.h("a2<1,h<a,@>>")
s=A.N(new A.a2(s,r.h("h<a,@>(1)").a(new A.rz()),q),q.h("Q.E"))
return A.G(["nodes",s],t.N,t.z)}}
A.rz.prototype={
$1(a){return t.qn.a(a).v()},
$S:96}
A.eO.prototype={
gF(){return"session.open"},
ga9(){return this.a},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"nodeId",r.b)
q.i(0,"mode",r.c.b)
s=r.d
if(s!=null)q.i(0,"command",s)
s=r.e
if(s.length!==0)q.i(0,"args",s)
s=r.f
if(s.gZ(s))q.i(0,"env",s)
s=r.r
if(s!=null)q.i(0,"cwd",s)
s=r.w
if(s!=null)q.i(0,"pty",s.v())
s=r.x
if(s!=null)q.i(0,"resumeSessionId",s)
s=r.y
if(s!=null)q.i(0,"shellFamily",s.b)
return q}}
A.eP.prototype={
gF(){return"session.opened"},
ga9(){return this.a},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"sessionId",r.b)
q.i(0,"pty",r.c)
if(r.d)q.i(0,"altScreen",!0)
s=r.e
if(s!=="posix")q.i(0,"shell",s)
return q}}
A.eQ.prototype={
gF(){return"session.rejected"},
ga9(){return this.a},
v(){return A.G(["reason",this.b,"message",this.c],t.N,t.z)}}
A.he.prototype={
gF(){return"node.session.open"},
ga9(){return this.a},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"sessionId",r.b)
q.i(0,"principal",r.c)
q.i(0,"mode",r.d.b)
s=r.e
if(s!=null)q.i(0,"command",s)
s=r.f
if(s.length!==0)q.i(0,"args",s)
s=r.r
if(s.gZ(s))q.i(0,"env",s)
s=r.w
if(s!=null)q.i(0,"cwd",s)
s=r.x
if(s!=null)q.i(0,"pty",s.v())
s=r.y
if(s!=null)q.i(0,"resumeSessionId",s)
s=r.z
if(s!=null)q.i(0,"shellFamily",s.b)
return q}}
A.hf.prototype={
gF(){return"node.session.opened"},
ga9(){return this.a},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"sessionId",r.b)
s=r.c
if(s!=null)q.i(0,"pid",s)
if(r.d)q.i(0,"altScreen",!0)
s=r.e
if(s!=="posix")q.i(0,"shell",s)
return q}}
A.hg.prototype={
gF(){return"node.session.rejected"},
ga9(){return this.a},
v(){return A.G(["sessionId",this.b,"reason",this.c,"message",this.d],t.N,t.z)}}
A.eh.prototype={
gF(){return"channel.resize"},
ga9(){return this.a},
v(){return A.G(["cols",this.b,"rows",this.c],t.N,t.z)}}
A.ei.prototype={
gF(){return"channel.signal"},
ga9(){return this.a},
v(){return A.G(["signal",this.b],t.N,t.z)}}
A.fH.prototype={
gF(){return"channel.eof"},
ga9(){return this.a},
v(){return A.G(["stream",this.b],t.N,t.z)}}
A.eg.prototype={
gF(){return"channel.exit"},
ga9(){return this.a},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"exitCode",this.b)
s=this.c
if(s!=null)r.i(0,"signal",s)
r.i(0,"ts",this.d.av().b_())
return r}}
A.dv.prototype={
gF(){return"channel.close"},
ga9(){return this.a},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"reason",this.b)
s=this.c
if(s!=null)r.i(0,"message",s)
return r}}
A.dw.prototype={
gF(){return"channel.window"},
ga9(){return this.a},
v(){return A.G(["stream",this.b,"credit",this.c],t.N,t.z)}}
A.hk.prototype={
gF(){return"error"},
ga9(){return this.d},
v(){return A.G(["code",this.a,"message",this.b,"fatal",this.c],t.N,t.z)}}
A.eL.prototype={
gF(){return"session.detach.request"},
ga9(){return this.a},
v(){var s=A.I(t.N,t.z),r=this.b
if(r!=null)s.i(0,"timeoutSeconds",r)
return s}}
A.hc.prototype={
gF(){return"node.session.detach"},
ga9(){return this.a},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"sessionId",this.b)
r.i(0,"principal",this.c)
s=this.d
if(s!=null)r.i(0,"timeoutSeconds",s)
return r}}
A.hd.prototype={
gF(){return"node.session.detached"},
ga9(){return this.a},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"sessionId",this.b)
r.i(0,"shortId",this.c)
s=this.d
if(s!=null)r.i(0,"expiresAt",s.av().b_())
return r}}
A.eM.prototype={
gF(){return"session.detached"},
ga9(){return this.a},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"sessionId",this.b)
r.i(0,"shortId",this.c)
s=this.d
if(s!=null)r.i(0,"expiresAt",s.av().b_())
return r}}
A.eq.prototype={
gF(){return"sessions.list.request"},
v(){return A.G(["requestId",this.a,"nodeId",this.b],t.N,t.z)}}
A.h4.prototype={
gF(){return"node.sessions.list.request"},
v(){return A.G(["requestId",this.a,"principal",this.b],t.N,t.z)}}
A.h5.prototype={
gF(){return"node.sessions.list.response"},
v(){var s=this.b,r=A.U(s),q=r.h("a2<1,h<a,@>>")
s=A.N(new A.a2(s,r.h("h<a,@>(1)").a(new A.rq()),q),q.h("Q.E"))
return A.G(["requestId",this.a,"sessions",s],t.N,t.z)}}
A.rq.prototype={
$1(a){return t.k.a(a).v()},
$S:43}
A.er.prototype={
gF(){return"sessions.list.response"},
v(){var s=this.b,r=A.U(s),q=r.h("a2<1,h<a,@>>")
s=A.N(new A.a2(s,r.h("h<a,@>(1)").a(new A.pE()),q),q.h("Q.E"))
return A.G(["requestId",this.a,"sessions",s],t.N,t.z)}}
A.pE.prototype={
$1(a){return t.k.a(a).v()},
$S:43}
A.eo.prototype={
gF(){return"sessions.kill.request"},
v(){return A.G(["requestId",this.a,"nodeId",this.b,"sessionRef",this.c],t.N,t.z)}}
A.h2.prototype={
gF(){return"node.sessions.kill.request"},
v(){return A.G(["requestId",this.a,"principal",this.b,"sessionRef",this.c],t.N,t.z)}}
A.h3.prototype={
gF(){return"node.sessions.kill.response"},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"requestId",this.a)
r.i(0,"ok",this.b)
s=this.c
if(s.length!==0)r.i(0,"message",s)
return r}}
A.ep.prototype={
gF(){return"sessions.kill.response"},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"requestId",this.a)
r.i(0,"ok",this.b)
s=this.c
if(s.length!==0)r.i(0,"message",s)
return r}}
A.e3.prototype={
gF(){return"sessions.detach.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"nodeId",r.b)
s=r.c
if(s.length!==0)q.i(0,"sessionRef",s)
s=r.d
if(s!=null)q.i(0,"timeoutSeconds",s)
return q}}
A.h_.prototype={
gF(){return"node.sessions.detach.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"principal",r.b)
s=r.c
if(s.length!==0)q.i(0,"sessionRef",s)
s=r.d
if(s!=null)q.i(0,"timeoutSeconds",s)
return q}}
A.h0.prototype={
gF(){return"node.sessions.detach.response"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"shortId",s)
s=r.d
if(s.length!==0)q.i(0,"message",s)
return q}}
A.e4.prototype={
gF(){return"sessions.detach.response"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"shortId",s)
s=r.d
if(s.length!==0)q.i(0,"message",s)
return q}}
A.eR.prototype={
gF(){return"sessions.screen.request"},
v(){return A.G(["requestId",this.a,"nodeId",this.b,"sessionRef",this.c],t.N,t.z)}}
A.hh.prototype={
gF(){return"node.sessions.screen.request"},
v(){return A.G(["requestId",this.a,"principal",this.b,"sessionRef",this.c],t.N,t.z)}}
A.hi.prototype={
gF(){return"node.sessions.screen.response"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"message",s)
s=r.d
if(s.length!==0)q.i(0,"screen",s)
if(r.e)q.i(0,"altScreen",!0)
return q}}
A.eS.prototype={
gF(){return"sessions.screen.response"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"message",s)
s=r.d
if(s.length!==0)q.i(0,"screen",s)
if(r.e)q.i(0,"altScreen",!0)
return q}}
A.cL.prototype={
v(){return A.G(["host",this.a,"description",this.b],t.N,t.z)}}
A.wk.prototype={
$1(a){var s=t.f.a(a).ak(0,t.N,t.z)
return new A.cL(A.C(s,"host"),A.C(s,"description"))},
$S:98}
A.fL.prototype={
gF(){return"drive.credential.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"nodeId",r.b)
q.i(0,"op",r.c)
s=r.d
if(s!=null)q.i(0,"host",s)
s=r.e
if(s!=null)q.i(0,"credential",s)
return q}}
A.h6.prototype={
gF(){return"node.drive.credential.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"principal",r.b)
q.i(0,"op",r.c)
s=r.d
if(s!=null)q.i(0,"host",s)
s=r.e
if(s!=null)q.i(0,"credential",s)
return q}}
A.h7.prototype={
gF(){return"node.drive.credential.response"},
v(){var s,r,q,p=this,o=A.I(t.N,t.z)
o.i(0,"requestId",p.a)
o.i(0,"ok",p.b)
s=p.c
if(s.length!==0)o.i(0,"message",s)
s=p.d
if(s.length!==0){r=A.U(s)
q=r.h("a2<1,h<a,@>>")
s=A.N(new A.a2(s,r.h("h<a,@>(1)").a(new A.ry()),q),q.h("Q.E"))
o.i(0,"entries",s)}return o}}
A.ry.prototype={
$1(a){return t.ec.a(a).v()},
$S:44}
A.es.prototype={
gF(){return"drive.credential.response"},
v(){var s,r,q,p=this,o=A.I(t.N,t.z)
o.i(0,"requestId",p.a)
o.i(0,"ok",p.b)
s=p.c
if(s.length!==0)o.i(0,"message",s)
s=p.d
if(s.length!==0){r=A.U(s)
q=r.h("a2<1,h<a,@>>")
s=A.N(new A.a2(s,r.h("h<a,@>(1)").a(new A.pL()),q),q.h("Q.E"))
o.i(0,"entries",s)}return o}}
A.pL.prototype={
$1(a){return t.ec.a(a).v()},
$S:44}
A.wl.prototype={
$1(a){var s,r,q,p,o=t.f.a(a).ak(0,t.N,t.z),n=A.C(o,"sessionId"),m=A.C(o,"shortId"),l=A.C(o,"nodeId"),k=A.C(o,"ownerUserId"),j=A.A(o,"mode")
j=A.xQ(j==null?"shell":j)
s=A.ey(o,"createdAt")
r=A.ls(o,"detachedAt")
q=A.ls(o,"expiresAt")
p=A.A(o,"state")
return new A.aB(n,m,l,k,j,s,r,q,A.EH(p==null?"detached":p),A.A(o,"currentCommand"),A.A(o,"currentCwd"))},
$S:100}
A.f4.prototype={
gF(){return"tunnel.open.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"nodeId",r.b)
q.i(0,"targetHost",r.c)
q.i(0,"targetPort",r.d)
s=r.e
if(s!=null)q.i(0,"publicPort",s)
if(r.f)q.i(0,"secure",!0)
return q}}
A.f5.prototype={
gF(){return"tunnel.opened"},
v(){var s=this,r=A.I(t.N,t.z)
r.i(0,"requestId",s.a)
r.i(0,"tunnelId",s.b)
r.i(0,"publicHost",s.c)
r.i(0,"publicPort",s.d)
if(s.e)r.i(0,"secure",!0)
return r}}
A.f6.prototype={
gF(){return"tunnel.rejected"},
v(){return A.G(["requestId",this.a,"reason",this.b,"message",this.c],t.N,t.z)}}
A.eZ.prototype={
gF(){return"tunnel.close.request"},
v(){return A.G(["requestId",this.a,"tunnelRef",this.b],t.N,t.z)}}
A.f_.prototype={
gF(){return"tunnel.close.response"},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"requestId",this.a)
r.i(0,"ok",this.b)
s=this.c
if(s.length!==0)r.i(0,"message",s)
return r}}
A.f2.prototype={
gF(){return"tunnel.list.request"},
v(){return A.G(["requestId",this.a],t.N,t.z)}}
A.f3.prototype={
gF(){return"tunnel.list.response"},
v(){var s=this.b,r=A.U(s),q=r.h("a2<1,h<a,@>>")
s=A.N(new A.a2(s,r.h("h<a,@>(1)").a(new A.uM()),q),q.h("Q.E"))
return A.G(["requestId",this.a,"tunnels",s],t.N,t.z)}}
A.uM.prototype={
$1(a){return t.r_.a(a).v()},
$S:101}
A.eD.prototype={
gF(){return"node.tunnel.connect"},
ga9(){return this.a},
v(){var s=this
return A.G(["tunnelId",s.b,"targetHost",s.c,"targetPort",s.d,"principal",s.e],t.N,t.z)}}
A.eF.prototype={
gF(){return"node.tunnel.connected"},
ga9(){return this.a},
v(){return A.G(["tunnelId",this.b],t.N,t.z)}}
A.eE.prototype={
gF(){return"node.tunnel.connect.failed"},
ga9(){return this.a},
v(){var s,r=A.I(t.N,t.z)
r.i(0,"tunnelId",this.b)
r.i(0,"reason",this.c)
s=this.d
if(s.length!==0)r.i(0,"message",s)
return r}}
A.wm.prototype={
$1(a){var s,r,q,p=t.f.a(a).ak(0,t.N,t.z),o=A.C(p,"tunnelId"),n=A.C(p,"nodeId"),m=A.A(p,"ownerUserId")
if(m==null)m=""
s=A.A(p,"targetHost")
if(s==null)s="localhost"
r=A.dD(p,"targetPort")
q=A.A(p,"publicHost")
if(q==null)q=""
return new A.bz(o,n,m,s,r,q,A.dD(p,"publicPort"),A.b5(p,"secure"),A.ey(p,"createdAt"))},
$S:102}
A.e6.prototype={
gF(){return"ai.config.request"},
v(){return A.G(["requestId",this.a],t.N,t.z)}}
A.e7.prototype={
gF(){return"ai.config.response"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"available",r.b)
s=r.c
if(s!=null)q.i(0,"provider",s)
s=r.d
if(s!=null)q.i(0,"model",s)
s=r.e
if(s!=null)q.i(0,"plannerModel",s)
s=r.f
if(s!=null)q.i(0,"executorModel",s)
s=r.r
if(s!=null)q.i(0,"explainerModel",s)
s=r.w
if(s!=null)q.i(0,"baseUrl",s)
s=r.x
if(s!=null)q.i(0,"mode",s)
s=r.y
if(s!=null)q.i(0,"language",s)
return q}}
A.la.prototype={
R(){return"HttpProxyCredentialMode."+this.b}}
A.ew.prototype={
gF(){return"http.proxy.request"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"method",r.b)
q.i(0,"url",r.c)
s=r.d
if(s.gZ(s))q.i(0,"headers",s)
q.i(0,"body",r.e)
s=r.f
if(s!==B.bI)q.i(0,"credentialMode",s.b)
s=r.r
if(s!=null)q.i(0,"provider",s)
return q}}
A.cv.prototype={
gF(){return"http.proxy.response"},
v(){var s,r=this,q=A.I(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"statusCode",r.b)
s=r.c
if(s.gZ(s))q.i(0,"headers",s)
s=r.d
if(s.length!==0)q.i(0,"body",s)
s=r.e
if(s!=null)q.i(0,"error",s)
return q}}
A.ir.prototype={
R(){return"DataOpcode."+this.b}}
A.pX.prototype={
cX(a){var s,r,q,p,o,n,m
A:{if(a instanceof A.aL){s=a.a
r=s.ga9()
q=A.G(["t",s.gF(),"d",s.v()],t.N,t.z)
if(r!=null)q.i(0,"c",r)
p=B.x.cY(q,null)
break A}if(a instanceof A.en){o=a.d
p=o.length
if(p>65536)A.K(A.bp("Data payload "+p+" exceeds max 65536","malformed_frame"))
n=10+p
m=new Uint8Array(n)
m[0]=a.a&255
m[1]=a.b.c&255
A.yH(m,2,a.c)
A.yH(m,6,p)
B.H.bK(m,10,n,o)
p=m
break A}p=null}return p},
b5(a){var s,r,q,p,o,n,m,l="malformed_frame"
if(typeof a=="string")return this.pH(a)
s=t.L
if(s.b(a)){s.a(a)
r=t.p.b(a)?a:new Uint8Array(A.c9(a))
s=r.length
if(s<10)A.K(B.mN)
if(0>=s)return A.b(r,0)
q=r[0]
if(1>=s)return A.b(r,1)
p=A.D2(r[1])
o=A.yG(r,2)
n=A.yG(r,6)
m=s-10
if(n!==m)A.K(A.bp("Data frame length mismatch: declared "+n+", got "+m,l))
if(m>65536)A.K(A.bp("Data payload "+m+" exceeds max 65536",l))
return new A.en(q,p,o,A.zA(r,10,null))}throw A.d(B.mR)},
pH(a){var s,r,q,p,o,n,m,l,k,j=null,i=null
try{i=B.x.bH(a,j)}catch(r){q=A.R(r)
if(t.Bj.b(q)){s=q
throw A.d(A.bp("Invalid control JSON: "+s.ghO(),j))}else throw r}q=t.f
if(!q.b(i))throw A.d(B.mL)
p=t.N
o=t.z
n=i.ak(0,p,o)
m=n.k(0,"t")
if(typeof m!="string")throw A.d(B.mM)
l=this.a.k(0,m)
if(l==null)throw A.d(A.bp("Unknown control message type: "+m,j))
k=A.hT(n.k(0,"c"))?A.a4(n.k(0,"c")):j
return new A.aL(l.$2(k,q.b(n.k(0,"d"))?q.a(n.k(0,"d")).ak(0,p,o):A.I(p,o)))}}
A.d7.prototype={}
A.aL.prototype={
ga9(){return this.a.ga9()}}
A.en.prototype={
ga9(){return this.c}}
A.dH.prototype={
l(a){return A.o1(this).l(0)+"("+this.a+"): "+this.b},
$iaf:1}
A.cw.prototype={}
A.ie.prototype={}
A.j2.prototype={}
A.mD.prototype={}
A.dN.prototype={}
A.r3.prototype={
$2(a,b){return new A.V(J.b9(a),J.b9(b),t.q)},
$S:103}
A.r2.prototype={
$1(a){return J.b9(a)},
$S:104}
A.u1.prototype={}
A.ib.prototype={
b1(){var s=this,r=s.r,q=s.a,p=q.r,o=p.c.b
B.b.j(r,new A.aA(o,A.l(o).h("aA<1>")).aE(new A.oF(s)))
o=q.b.c.b
B.b.j(r,new A.aA(o,A.l(o).h("aA<1>")).aE(new A.oG(s)))
q=q.d.d.b
B.b.j(r,new A.aA(q,A.l(q).h("aA<1>")).aE(new A.oH(s)))
p.b1()
s.hd()},
hd(){var s,r,q=this.a,p=q.b.c.a.a===B.ai
q=q.r
s=q.c.a
if(!p&&s.a!=="/login"){q.kq("/login")
return}if(p){r=s.a
r=r==="/login"||r.length===0}else r=!1
if(r){q.kq("/nodes")
return}this.jg()
this.nf(s,p)},
nf(a,b){var s,r,q,p=this,o=""+b+":"+a.b
if(o===p.f&&p.e!=null)return
p.f=o
s=p.e
if(s!=null)s.ah()
s=p.ow(a,b)
p.e=s
r=p.d
r===$&&A.w("_main")
s=s.gdS()
A.cq(r)
A.j(r.appendChild(s))
s=v.G
q=A.aS(A.j(s.document).documentElement)
if(q!=null)q.scrollTop=0
s=A.aS(A.j(s.document).body)
if(s!=null)s.scrollTop=0
r.scrollTop=0},
ow(a,b){var s,r,q,p,o,n=this,m=null
if(!b)return A.DR(n.a)
switch(a.a){case"/nodes/:id/sessions/:sid":s=a.c
r=s.k(0,"id")
if(r==null)r=""
s=s.k(0,"sid")
if(s==null)s=""
return A.EI(n.a,r,s)
case"/nodes/:id/sessions":s=a.c.k(0,"id")
if(s==null)s=""
return A.EK(n.a,s)
case"/nodes/:id":s=a.c.k(0,"id")
if(s==null)s=""
return A.E2(n.a,s)
case"/nodes":default:s=n.a
r=new A.iT(s)
q=A.dY("list")
r.c=q
s=s.c
p=A.ar("Refresh",m,m,!1,s.ge7(),!1)
r.d=p
o=t.O
r.b=A.t("div",m,m,A.e([A.t("div",m,m,A.e([A.t("h1",m,m,B.h,m,m,m,m,"Nodes"),A.t("div",m,m,B.h,"grow",m,m,m,m),p],o),"toolbar",m,m,m,m),q],o),"stack",m,m,m,m)
o=s.c
q=o.b
r.e=new A.aA(q,A.l(q).h("aA<1>")).aE(r.gnl())
r.iZ(o.a)
s.e_()
return r}},
jg(){var s,r,q=this,p=null,o=q.a,n=o.b.c.a.a===B.ai,m=t.O,l=A.e([A.t("div",p,p,A.e([A.t("span",p,p,B.h,"dot",p,p,p,p),A.j(new v.G.Text("OmnyShell"))],m),"brand",p,p,p,p),A.t("div",p,p,B.h,"spacer",p,p,p,p)],m)
if(n){o=o.a
m=o.c
s=m==null?p:m.a.a
if(s==null)s=""
o=o.d
o=o==null?p:o.gbj()
B.b.j(l,A.t("span",p,p,B.h,"meta hide-sm",p,p,p,(o==null?"":o)+" \xb7 "+s))}B.b.j(l,A.ar("\u2699","Settings","icon ghost settings-icon",!1,new A.oE(q),!1))
B.b.j(l,q.p_())
if(n)B.b.j(l,A.ar("Sign out",p,"ghost btn-sm",!1,q.gnb(),!1))
o=q.c
o===$&&A.w("_header")
A.cq(o)
for(m=l.length,r=0;r<l.length;l.length===m||(0,A.M)(l),++r)A.j(o.appendChild(l[r]))},
p_(){var s,r=this.a.d,q=r.d.a
switch(q.a){case 0:s="\u2600 Light"
break
case 1:s="\u263e Dark"
break
case 2:s="\u25d0 System"
break
default:s=null}return A.ar(s,"Theme: "+q.b+". Click to change.","ghost btn-sm",!1,r.gpF(),!1)},
eA(){var s=0,r=A.p(t.H),q=this,p,o,n
var $async$eA=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:n=q.a
s=2
return A.f(n.b.fk(),$async$eA)
case 2:p=n.c
o=p.b
o.b.a.removeItem(o.a)
p.c.sae(B.cD)
n.y.b0("Signed out.","success")
n.r.aF("/login")
return A.n(null,r)}})
return A.o($async$eA,r)}}
A.oF.prototype={
$1(a){t.xf.a(a)
return this.a.hd()},
$S:105}
A.oG.prototype={
$1(a){t.zX.a(a)
return this.a.hd()},
$S:45}
A.oH.prototype={
$1(a){t.sm.a(a)
return this.a.jg()},
$S:107}
A.oE.prototype={
$0(){return A.Bd(this.a.a)},
$S:0}
A.oD.prototype={}
A.wA.prototype={
$0(){return A.cH(this.a.matches)},
$S:59}
A.wB.prototype={
$1(a){var s=v.G,r=A.aS(A.j(s.document).documentElement)
if(r!=null)r.setAttribute("data-theme",a.b)
s=A.aS(A.j(s.document).getElementById("theme-color"))
if(s!=null){r=a===B.bT?"#0f1318":"#f6f7f9"
s.setAttribute("content",r)}},
$S:109}
A.wC.prototype={
$1(a){A.j(a)
this.a.fJ()},
$S:12}
A.ic.prototype={
R(){return"AppErrorKind."+this.b}}
A.bb.prototype={
l(a){return"AppError("+this.a.l(0)+", "+this.b+")"},
$iaf:1}
A.aQ.prototype={
sae(a){var s,r=this
r.$ti.c.a(a)
if(J.a0(r.a,a))return
r.a=a
s=r.b
if((s.c&4)===0)s.j(0,a)}}
A.lQ.prototype={
gbi(){var s=this.b
if(s==null)throw A.d(B.eN)
return s},
dO(a,b,c){var s=0,r=A.p(t.wy),q,p=2,o=[],n=this,m,l,k,j,i,h
var $async$dO=A.q(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:i=A.xO(a)
n.e=!1
k=t.N
m=new A.kE(new A.p0(i,new A.mC(b,c),null,n.gmH()),new A.iJ(A.bU(A.DP(null),null,!1,t.lp),t.pe),A.I(k,t.nH),A.I(k,t.v7),A.I(k,t.wj),A.I(k,t.c3),A.I(k,t.DM),A.I(k,t.bd),A.I(k,t.aw),A.I(k,t.bE),A.I(k,t.j_),A.I(k,t.pI),A.I(k,t.Cn),A.I(t.S,t.i8))
p=4
s=7
return A.f(m.bG(),$async$dO)
case 7:p=2
s=6
break
case 4:p=3
h=o.pop()
l=A.R(h)
s=8
return A.f(m.p(),$async$dO)
case 8:k=A.ko(l)
throw A.d(k)
s=6
break
case 3:s=2
break
case 6:n.b=m
n.c=m.e
n.d=i
k=m.e
k.toString
q=k
s=1
break
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dO,r)},
f9(){var s=0,r=A.p(t.H),q=this,p,o
var $async$f9=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:q.e=!0
p=q.b
q.d=q.c=q.b=null
o=p==null?null:p.p()
s=2
return A.f(o instanceof A.v?o:A.bs(o,t.H),$async$f9)
case 2:return A.n(null,r)}})
return A.o($async$f9,r)},
mI(){var s,r=this
if(r.e)return
r.c=r.b=null
s=r.f
if(s!=null)s.$0()},
kj(){return this.be(new A.rG(this,B.ac),t.oD)},
fb(){return this.be(new A.rE(this),t.Aa)},
qd(a){return this.be(new A.rH(this,a),t.zA)},
ki(a,b){return this.be(new A.rF(this,a,b),t.v4)},
qD(a,b){return this.be(new A.rJ(this,a,b),t.aC)},
pP(a,b){return this.be(new A.rD(this,a,b),t.tR)},
qx(a,b,c){return this.be(new A.rI(this,b,a,c),t.dS)},
qS(a,b,c,d){return this.be(new A.rK(this,b,d,a,c),t.dS)},
be(a,b){return this.mC(b.h("H<0>()").a(a),b,b)},
mC(a,b,c){var s=0,r=A.p(c),q,p=2,o=[],n,m,l,k
var $async$be=A.q(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(a.$0(),$async$be)
case 7:m=e
q=m
s=1
break
p=2
s=6
break
case 4:p=3
k=o.pop()
n=A.R(k)
m=A.ko(n)
throw A.d(m)
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$be,r)},
sqp(a){this.f=t.Z.a(a)}}
A.rG.prototype={
$0(){return this.a.gbi().qc(this.b)},
$S:111}
A.rE.prototype={
$0(){return this.a.gbi().fb()},
$S:112}
A.rH.prototype={
$0(){return this.a.gbi().qe(this.b)},
$S:113}
A.rF.prototype={
$0(){return this.a.gbi().q9(this.b,this.c)},
$S:114}
A.rJ.prototype={
$0(){return this.a.gbi().qE(this.b,this.c)},
$S:115}
A.rD.prototype={
$0(){return this.a.gbi().pO(this.b,this.c)},
$S:116}
A.rI.prototype={
$0(){var s=this
return s.a.gbi().qt(B.bU,s.b,new A.iZ("xterm-256color",s.c,s.d))},
$S:48}
A.rK.prototype={
$0(){var s=this
return s.a.gbi().qu(B.bU,s.b,new A.iZ("xterm-256color",s.d,s.e),s.c)},
$S:48}
A.dJ.prototype={}
A.wu.prototype={
$1(a){return A.r(a).length!==0},
$S:1}
A.t4.prototype={
b1(){A.bC(this.b,"hashchange",new A.t5(this))
this.eU()},
aF(a){var s="#"+(B.a.u(a,"/")?a:"/"+a),r=this.b
if(A.r(A.j(r.location).hash)===s)this.eU()
else A.j(r.location).hash=s},
kq(a){var s=B.a.u(a,"/")?a:"/"+a
A.j(this.b.location).replace("#"+s)
this.eU()},
eU(){var s=A.B3(this.a,A.AZ(A.r(A.j(this.b.location).hash)))
this.c.sae(s)
return s}}
A.t5.prototype={
$1(a){A.j(a)
return this.a.eU()},
$S:2}
A.ov.prototype={
ff(){var s=0,r=A.p(t.aF),q,p=2,o=[],n=this,m,l,k
var $async$ff=A.q(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(n.b.fb(),$async$ff)
case 7:m=b
q=m
s=1
break
p=2
s=6
break
case 4:p=3
k=o.pop()
q=null
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$ff,r)}}
A.fX.prototype={
R(){return"LoadStatus."+this.b}}
A.b4.prototype={}
A.fD.prototype={
R(){return"AuthStatus."+this.b}}
A.ct.prototype={}
A.kw.prototype={
ns(){var s=this.c,r=s.a
if(r.a!==B.ai)return
s.sae(new A.ct(B.bm,r.c,B.eM))},
e0(a,b,c,d){return this.qi(a,b,c,d)},
qi(a,b,c,d){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$e0=A.q(function(e,a0){if(e===1){p.push(a0)
s=q}for(;;)switch(s){case 0:g=o.c
g.sae(B.f9)
q=3
j=o.a
s=6
return A.f(j.dO(a,b,d),$async$e0)
case 6:n=a0
m=j.d.l(0)
j=o.b.b.a
j.setItem("omnyshell.hub",a)
j.setItem("omnyshell.principal",b)
i=c?"true":"false"
j.setItem("omnyshell.rememberToken",i)
if(c)j.setItem("omnyshell.token."+A.r(m),d)
else j.removeItem("omnyshell.token."+A.r(m))
g.sae(new A.ct(B.ai,m,null))
q=1
s=5
break
case 3:q=2
f=p.pop()
l=A.R(f)
k=A.ko(l)
g.sae(new A.ct(B.bm,null,k))
s=5
break
case 2:s=1
break
case 5:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$e0,r)},
fk(){var s=0,r=A.p(t.H),q=this,p,o,n
var $async$fk=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:p=q.a
o=p.d
n=o==null?null:o.l(0)
s=2
return A.f(p.f9(),$async$fk)
case 2:if(n!=null)q.b.b.a.removeItem("omnyshell.token."+n)
q.b.b.a.setItem("omnyshell.rememberToken","false")
q.c.sae(B.cF)
return A.n(null,r)}})
return A.o($async$fk,r)},
fw(){var s=0,r=A.p(t.y),q,p=this,o,n,m,l,k,j
var $async$fw=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:j=p.b.b.a
if(A.Y(j.getItem("omnyshell.rememberToken"))!=="true"){q=!1
s=1
break}o=A.Y(j.getItem("omnyshell.hub"))
m=A.Y(j.getItem("omnyshell.principal"))
if(o==null||m==null){q=!1
s=1
break}n=null
try{n=A.xO(o).l(0)}catch(i){q=!1
s=1
break}k=A.Y(j.getItem("omnyshell.token."+A.r(n)))
if(k==null){q=!1
s=1
break}s=3
return A.f(p.e0(o,m,!0,k),$async$fw)
case 3:q=p.c.a.a===B.ai
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$fw,r)},
gqF(){var s,r,q,p=this.b.b.a,o=A.Y(p.getItem("omnyshell.hub")),n=o==null?"":o,m=A.Y(p.getItem("omnyshell.principal"))
if(m==null)m=""
s=""
if(A.Y(p.getItem("omnyshell.rememberToken"))==="true"&&J.aE(n)!==0)try{r=A.Y(p.getItem("omnyshell.token."+A.xO(n).l(0)))
s=r==null?"":r}catch(q){s=""}return new A.jN(n,m,s)}}
A.lN.prototype={
e_(){var s=0,r=A.p(t.H),q=this,p,o
var $async$e_=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:o=q.c
if(o.a.b==null){p=q.b.qJ()
if(p!=null&&p.length!==0)o.sae(new A.b4(B.a0,p,null,!0,t.A))}s=2
return A.f(q.ao(),$async$e_)
case 2:return A.n(null,r)}})
return A.o($async$e_,r)},
ao(){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g
var $async$ao=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:j=o.c
i=j.a.b
h=t.A
j.sae(new A.b4(B.a0,i,null,i!=null,h))
q=3
s=6
return A.f(o.a.kj(),$async$ao)
case 6:n=b
o.b.de(n)
j.sae(A.yA(n,t.oD))
q=1
s=5
break
case 3:q=2
g=p.pop()
k=A.R(g)
if(k instanceof A.bb){m=k
j.sae(new A.b4(B.an,i,m,!1,h))}else throw g
s=5
break
case 2:s=1
break
case 5:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$ao,r)},
jV(a){var s,r=this.c.a.b
r=J.aN(r==null?B.jS:r)
while(r.q()){s=r.gA()
if(s.a.a===a)return s}return null}}
A.e2.prototype={}
A.iY.prototype={}
A.j4.prototype={
ao(){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g
var $async$ao=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:j=o.c
i=j.a.b
h=t.o
j.sae(new A.b4(B.a0,i,null,i!=null,h))
q=3
s=6
return A.f(o.a.qd(o.b),$async$ao)
case 6:n=b
j.sae(A.yA(n,t.zA))
q=1
s=5
break
case 3:q=2
g=p.pop()
k=A.R(g)
if(k instanceof A.bb){m=k
j.sae(new A.b4(B.an,i,m,!1,h))}else throw g
s=5
break
case 2:s=1
break
case 5:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$ao,r)},
dX(a){return this.q8(a)},
q8(a){var s=0,r=A.p(t.BF),q,p=2,o=[],n=this,m,l,k,j,i,h
var $async$dX=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(n.a.ki(n.b,a),$async$dX)
case 7:m=c
s=8
return A.f(n.ao(),$async$dX)
case 8:k=m.a
j=m.b.length===0?"Session terminated.":m.b
q=new A.e2(k,j)
s=1
break
p=2
s=6
break
case 4:p=3
h=o.pop()
k=A.R(h)
if(k instanceof A.bb){l=k
q=new A.e2(!1,l.b)
s=1
break}else throw h
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dX,r)},
dQ(a){return this.pN(a)},
pN(a){var s=0,r=A.p(t.BF),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$dQ=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(n.a.pP(n.b,a),$async$dQ)
case 7:m=c
s=8
return A.f(n.ao(),$async$dQ)
case 8:if(m.c.length!==0)j=m.c
else j=m.a?"Detached "+m.b+".":"Detach failed."
l=j
i=m.a
q=new A.e2(i,l)
s=1
break
p=2
s=6
break
case 4:p=3
g=o.pop()
i=A.R(g)
if(i instanceof A.bb){k=i
q=new A.e2(!1,k.b)
s=1
break}else throw g
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dQ,r)},
fo(a){return this.qC(a)},
qC(a){var s=0,r=A.p(t.nU),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f
var $async$fo=A.q(function(b,c){if(b===1){o.push(c)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(n.a.qD(n.b,a),$async$fo)
case 7:m=c
k=m.a
j=m.b
i=B.l.aK(m.c,!0)
h=m.d
q=new A.iY(k,j,i,h)
s=1
break
p=2
s=6
break
case 4:p=3
f=o.pop()
k=A.R(f)
if(k instanceof A.bb){l=k
q=new A.iY(!1,l.b,"",!1)
s=1
break}else throw f
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$fo,r)}}
A.uk.prototype={
qQ(a){var s=null
switch(this.b.a){case B.bC:break
case B.cW:s=B.n_
break
case B.bD:s=new A.dT(this.c.a,this.d.a)
break
case B.cU:s=A.wE(a.b)
break
case B.cV:s=A.wE(a.a)
break}return s}}
A.bY.prototype={
R(){return"ThemeMode."+this.b}}
A.uI.prototype={
$1(a){return t.sm.a(a).b===this.a},
$S:119}
A.uJ.prototype={
$0(){return B.c6},
$S:120}
A.hm.prototype={
R(){return"ResolvedTheme."+this.b}}
A.mA.prototype={
gqR(){switch(this.d.a){case B.ec:var s=B.dG
break
case B.ed:s=B.bT
break
case B.c6:s=this.b.$0()?B.bT:B.dG
break
default:s=null}return s},
pG(){var s=this.d,r=B.df[(s.a.a+1)%3]
s.sae(r)
this.a.b.a.setItem("omnyshell.theme",r.b)
this.fJ()},
fJ(){var s=this.c.$1(this.gqR())
return s}}
A.lB.prototype={$iDH:1}
A.ro.prototype={
qJ(){var s,r,q,p,o,n,m,l,k=null,j=A.Y(this.b.a.getItem(this.a))
if(j==null)return k
try{s=B.x.bH(j,k)
if(!t._.b(s))return k
r=A.e([],t.yT)
for(p=J.aN(s),o=t.f,n=t.N,m=t.z;p.q();){q=p.gA()
J.fw(r,A.za(o.a(q).ak(0,n,m)))}return r}catch(l){return k}},
de(a){var s,r
t.oD.a(a)
s=A.e([],t.cs)
for(r=J.aN(a);r.q();)s.push(r.gA().v())
return this.b.a.setItem(this.a,B.x.cY(s,null))}}
A.tz.prototype={
sjQ(a){this.b.a.setItem("omnyshell.ai.mode",a)},
sjP(a){var s=a==null||a.length===0,r=this.b.a
if(s)r.removeItem("omnyshell.ai.language")
else r.setItem("omnyshell.ai.language",a)}}
A.x4.prototype={
$1(a){var s=a.b
this.a.sjQ(s)
return s},
$S:121}
A.x5.prototype={
$1(a){this.a.sjP(a)
return a},
$S:50}
A.kk.prototype={
gT(){return"ai"},
gaz(){return"AI agent (not configured \u2014 open Settings)"},
B(a,b){return this.qV(a,t.a.a(b))},
qV(a,b){var s=0,r=A.p(t.H),q=this,p
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:p=a.w
p.$1("ai: no provider configured.")
p.$1("Open Settings to use the Hub default or set your own API key.")
q.a.$0()
return A.n(null,r)}})
return A.o($async$B,r)}}
A.kI.prototype={
nZ(){var s,r,q=this.b
if(q==null)return
try{s=B.b.S(A.cO(this.a.a,t.N),"\n")
q.a.setItem(this.c,s)}catch(r){}},
$iCR:1}
A.pk.prototype={
$1(a){return B.a.G(A.r(a)).length!==0},
$S:1}
A.mM.prototype={
gT(){return"ide"},
ghl(){return B.jL},
gaz(){return"Open the terminal IDE on the connected node"},
gda(){return":ide [path]"},
B(a,b){return this.qX(a,t.a.a(b))},
qX(a,b){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k,j,i,h,g
var $async$B=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:g=b.length
if(g>1){a.w.$1("usage: :ide [path]")
s=1
break}o=g===0?null:B.b.gI(b)
g=a.y.$0()
n=A.J7(o,g)
if(n==null){a.w.$1(":ide: remote working directory unknown yet \u2014 run a command first, or pass an absolute path.")
s=1
break}g=a.gc_()
m=a.b.a.a
l=a.e
s=3
return A.f(A.o2(p.c,p.d),$async$B)
case 3:k=d
j=k==null?null:A.B9(k.a,k.b)
i=A.N(B.dn,t.n0)
h=A.yL()
i.push(new A.lt(h))
s=4
return A.f(a.ay.$1(new A.uV(p,new A.md(g,m,l,n,new A.mb(g,m,l)),j,k,A.yN(A.yy(null,new A.mi(i))),a)),$async$B)
case 4:case 1:return A.n(q,r)}})
return A.o($async$B,r)}}
A.uV.prototype={
$1(a){return this.kJ(t.xX.a(a))},
kJ(a){var s=0,r=A.p(t.H),q=this,p,o
var $async$$1=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:p=q.a
o=q.d
o=o==null?null:o.a.b
s=2
return A.f(A.DB(o,q.c,A.IG(q.f.e),q.e,new A.mT(p.a,a,p.b),q.b).bl(),$async$$1)
case 2:return A.n(null,r)}})
return A.o($async$$1,r)},
$S:123}
A.my.prototype={
lt(a,b,c,d,e){var s,r,q=this,p=null,o=q.x
o=q.eu("Ctrl-"+o,new A.ui(q),"Control "+o)
q.w!==$&&A.ax("_lastCtrlButton")
q.w=o
s=q.eu("Ctrl",q.gp6(),"Control combinations")
q.r!==$&&A.ax("_ctrlButton")
q.r=s
A.j(s.classList).add("has-menu")
s.setAttribute("aria-haspopup","menu")
q.a.sqq(new A.uj(q))
r=t.O
r=A.t("div","Terminal keys",p,A.e([q.cQ("Esc",B.iP),q.cQ("Tab",B.j6),A.t("div","Control",p,A.e([o,s],r),"term-ctrl-group",p,p,"group",p),q.dH("\u2191",B.iS,"Up"),q.dH("\u2193",B.iT,"Down"),q.dH("\u2190",B.iV,"Left"),q.dH("\u2192",B.iU,"Right"),q.eV("|"),q.eV("~"),q.eV("/"),q.eV("-"),q.h4("Copy",q.gm1()),q.h4("Paste",q.gnX()),q.cQ("Home",B.iX),q.cQ("End",B.iW),q.cQ("PgUp",B.iQ),q.cQ("PgDn",B.iR)],r),"term-accessory",p,p,"toolbar",p)
q.f!==$&&A.ax("element")
q.f=r},
dH(a,b,c){return this.eu(a,new A.ug(this,t.L.a(b)),c)},
cQ(a,b){return this.dH(a,b,null)},
eV(a){return this.h4(a,new A.uh(this,a))},
eu(a,b,c){var s=A.ar(a,c,"mono",!1,new A.u6(this,t.Q.a(b)),!1)
A.bC(s,"mousedown",new A.u7())
return s},
h4(a,b){return this.eu(a,b,null)},
m3(a){var s,r=a.length
if(r===0)return null
if(0>=r)return A.b(a,0)
s=a.charCodeAt(0)
if(s>=64&&s<=95)return s&31
if(s>=97&&s<=122)return s&31
if(s===32)return 0
if(s===63)return 127
return null},
he(a){var s,r,q=this,p=q.m3(a)
if(p==null){q.e.$1('"'+a+'" is not a valid Ctrl combination.')
return!1}q.a.du(t.L.a(A.e([p],t.t)))
s=q.x=B.a.m(a,0,1).toUpperCase()
r=q.w
r===$&&A.w("_lastCtrlButton")
r.textContent="Ctrl-"+s
r.setAttribute("aria-label","Control "+s)
return!0},
p7(){if(this.y!=null)this.cH()
else this.nP()},
nP(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g="div",f=null,e="mousedown",d=t.O,c=A.e([],d)
for(s=0;s<12;++s)c.push(h.lQ(B.ji[s]))
r=A.t(g,f,f,c,"ctrl-menu-grid",f,f,"group",f)
q=A.e_("off",f,"ctrl-custom-char",f,"\xb7","text",f)
q.maxLength=1
q.className="ctrl-custom-input mono"
c=new A.uf(h,q)
A.bC(q,"keydown",new A.u8(c))
p=A.ar("Send",f,f,!1,c,!1)
A.bC(p,e,new A.u9())
o=A.t(g,f,f,A.e([A.t("span",f,f,B.h,"ctrl-menu-label mono",f,f,f,"Ctrl-"),q,p],d),"ctrl-menu-custom",f,f,f,f)
n=A.ar("Ctrl + next key","Arm Control for the next key","ctrl-menu-arm",!1,new A.ua(h),!1)
A.bC(n,e,new A.ub())
m=h.y=A.t(g,"Control combinations",f,A.e([r,o,A.t(g,f,f,B.h,"ctrl-menu-sep",f,f,f,f),n],d),"ctrl-menu",f,f,"menu",f)
d=v.G
A.j(A.aS(A.j(d.document).body).appendChild(m))
c=h.r
c===$&&A.w("_ctrlButton")
l=A.j(c.getBoundingClientRect())
A.j(m.style).position="fixed"
A.j(m.style).bottom=""+B.p.cv(A.a4(A.j(d.window).innerHeight)-A.cp(l.top)+6)+"px"
k=A.cp(A.j(m.getBoundingClientRect()).width)
j=A.cp(l.left)
i=A.a4(A.j(d.window).innerWidth)-k-8
if(j>i)j=i
if(j<8)j=8
A.j(m.style).left=""+B.p.cv(j)+"px"
h.z=new A.uc(A.bC(A.j(d.document),e,new A.ud(h,m)),A.bC(A.j(d.document),"keydown",new A.ue(h)))},
lQ(a){var s=A.ar("^"+a,"Control "+a,"mono ctrl-menu-item",!1,new A.u4(this,a),!1)
A.bC(s,"mousedown",new A.u5())
return s},
cH(){var s=this,r=s.z
if(r!=null)r.$0()
s.z=null
r=s.y
if(r!=null)r.remove()
s.y=null},
en(){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j
var $async$en=A.q(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:l=n.b.a
k=A.r(l.getSelection())
if(J.aE(k)===0){n.e.$1("Select text in the terminal first.")
s=1
break}p=4
s=7
return A.f(n.d.$1(k),$async$en)
case 7:l.clearSelection()
n.e.$1("Copied to clipboard.")
p=2
s=6
break
case 4:p=3
j=o.pop()
n.e.$1("Copy failed \u2014 clipboard unavailable.")
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$en,r)},
eG(){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l
var $async$eG=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
s=6
return A.f(o.c.$0(),$async$eG)
case 6:n=b
if(n!=null&&n.length!==0)o.a.du(t.L.a(B.r.Y(n)))
q=1
s=5
break
case 3:q=2
l=p.pop()
o.e.$1("Paste blocked \u2014 allow clipboard access.")
s=5
break
case 2:s=1
break
case 5:o.b.a.focus()
return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$eG,r)}}
A.ui.prototype={
$0(){var s=this.a
return s.he(s.x)},
$S:0}
A.uj.prototype={
$1(a){var s=this.a.r
s===$&&A.w("_ctrlButton")
return A.cH(A.j(s.classList).toggle("active",a))},
$S:51}
A.ug.prototype={
$0(){return this.a.a.du(t.L.a(this.b))},
$S:0}
A.uh.prototype={
$0(){return this.a.a.du(t.L.a(B.r.Y(this.b)))},
$S:0}
A.u6.prototype={
$0(){this.b.$0()
this.a.b.a.focus()},
$S:0}
A.u7.prototype={
$1(a){return A.j(a).preventDefault()},
$S:2}
A.uf.prototype={
$0(){var s,r=B.a.G(A.r(this.b.value))
if(r.length===0)return
s=this.a
if(s.he(r)){s.cH()
s.b.a.focus()}},
$S:0}
A.u8.prototype={
$1(a){if(A.r(A.j(a).key)==="Enter")this.a.$0()},
$S:2}
A.u9.prototype={
$1(a){return A.j(a).preventDefault()},
$S:2}
A.ua.prototype={
$0(){var s=this.a,r=s.a,q=!r.CW
r.CW=q
r=r.fx
if(r!=null)r.$1(q)
s.cH()
s.b.a.focus()},
$S:0}
A.ub.prototype={
$1(a){return A.j(a).preventDefault()},
$S:2}
A.ud.prototype={
$1(a){var s,r=A.aS(A.j(a).target)
if(r!=null)if(!A.cH(this.b.contains(r))){s=this.a.r
s===$&&A.w("_ctrlButton")
s=A.cH(s.contains(r))}else s=!0
else s=!1
if(s)return
this.a.cH()},
$S:2}
A.ue.prototype={
$1(a){var s
if(A.r(A.j(a).key)==="Escape"){s=this.a
s.cH()
s.b.a.focus()}},
$S:2}
A.uc.prototype={
$0(){this.a.$0()
this.b.$0()},
$S:0}
A.u4.prototype={
$0(){var s=this.a
s.he(this.b)
s.cH()
s.b.a.focus()},
$S:0}
A.u5.prototype={
$1(a){return A.j(a).preventDefault()},
$S:2}
A.bP.prototype={
R(){return"DimensionPreset."+this.b}}
A.pG.prototype={
$1(a){return t.cE.a(a).b===this.a},
$S:125}
A.pH.prototype={
$0(){return B.bC},
$S:126}
A.by.prototype={
R(){return"TerminalTextSize."+this.b}}
A.uF.prototype={
$1(a){return t.aW.a(a).b===this.a},
$S:127}
A.uG.prototype={
$0(){return B.c5},
$S:52}
A.lT.prototype={}
A.pF.prototype={}
A.mz.prototype={
ps(a){var s,r,q,p,o,n=this
t.DN.a(a)
s=v.G
n.z=A.zx(A.j(s.window),"resize",n.gkO())
r=A.aS(A.j(s.window).visualViewport)
if(r!=null)n.Q=A.zx(r,"resize",n.gkP())
s=s.ResizeObserver
q=new A.un(n)
if(typeof q=="function")A.K(A.as("Attempting to rewrap a JS function.",null))
p=function(b,c){return function(d,e){return b(c,d,e,arguments.length)}}(A.Gd,q)
p[$.o4()]=q
o=A.j(new s(p))
o.observe(n.b)
n.as=o
s=a.aE(new A.uo(n))
n.at=s},
cm(){if(this.x)return
this.lF()
this.hn()},
hn(){var s,r,q=this,p=q.a,o=q.e,n=o==null,m=n?13:q.mw(o.a,o.b)
switch(q.f.$0()){case B.c5:s=m
break
case B.e9:s=B.c.M(B.p.dW(m*0.8),6,40)
break
case B.ea:s=13
break
case B.eb:s=B.c.M(B.p.pv(m*1.25),6,40)
break
default:s=null}A.j(p.a.options).fontSize=s
r=B.p.M(s/13,0.7,1.6)
A.j(q.d.style).setProperty("--term-key-scale",B.p.i5(r,3))
if(n)p.cm()
else p.ks(o.a,o.b)},
dg(){var s=this
if(s.w||s.x)return
s.w=!0
A.a4(A.j(v.G.window).requestAnimationFrame(A.cW(new A.up(s))))},
kQ(){var s,r=this
r.dg()
s=r.y
if(s!=null)s.U()
r.y=A.eY(B.i8,r.ghB())},
ie(){var s,r=new A.uq(this)
this.dg()
A.a4(A.j(v.G.window).requestAnimationFrame(A.cW(new A.ur(r))))
for(s=0;s<3;++s)A.eY(new A.aX(1000*B.iN[s]),r)},
mw(a,b){var s,r,q=A.cp(A.j(this.b.getBoundingClientRect()).width),p=this.it()
if(q<=0||p<=0)return 13
s=q/(a*0.6)
r=p/(b*1.2)
return B.c.M(B.p.dW(s<r?s:r),6,40)},
lF(){var s,r,q=this,p=A.aS(A.j(v.G.document).documentElement)
p=p==null?null:A.cH(A.j(p.classList).contains("keyboard-open"))
s=p===!0
if(q.r.$0()||s){A.r(A.j(q.b.style).removeProperty("height"))
return}p=q.b
A.r(A.j(p.style).removeProperty("height"))
r=q.it()
if(r>0)A.j(p.style).height=""+B.p.cv(r)+"px"},
it(){var s,r,q,p=v.G,o=A.aS(A.j(p.window).visualViewport),n=o==null?null:A.cp(o.height)
if(n==null)n=A.a4(A.j(p.window).innerHeight)
s=A.j(this.b.getBoundingClientRect())
r=A.j(this.c.getBoundingClientRect())
q=A.cp(r.top)-A.cp(s.bottom)
p=A.cp(r.height)
o=q>0?q:0
return n-A.cp(s.top)-(p+o)}}
A.un.prototype={
$2(a,b){t.Cf.a(a)
A.j(b)
this.a.dg()},
$S:129}
A.uo.prototype={
$1(a){t.aW.a(a)
return this.a.dg()},
$S:130}
A.up.prototype={
$1(a){var s
A.cp(a)
s=this.a
s.w=!1
s.cm()},
$S:131}
A.uq.prototype={
$0(){var s=this.a
if(s.x)return
s.cm()
if(!s.r.$0())s.a.ao()
s.a.kR()},
$S:0}
A.ur.prototype={
$1(a){A.cp(a)
return this.a.$0()},
$S:132}
A.ul.prototype={
$1(a){A.j(a)
return this.a.$0()},
$S:2}
A.um.prototype={
$0(){return this.a.removeEventListener(this.b,this.c)},
$S:0}
A.jg.prototype={
lu(a,b,c,d,e,f,g,h,i,j,k,l,a0,a1,a2){var s,r=this,q=r.f,p=r.ax,o=r.a,n=o.gc4(),m=t.t
n=new A.ly(new A.ac(q,A.l(q).h("ac<1>")),new A.v1(r),r.gnB(),p,null,r.gmY(),new A.v2(r),r.gnG(),r.glS(),A.e([],t.s),n.a,B.ba,A.e([],m))
p=p.a
n.fx=new A.qx(p,p.a.length)
r.e!==$&&A.ax("_editor")
r.e=n
p=r.ay
q=a0.r
q=q==null?null:q.a
m=A.e([],m)
q=new A.pu("__OMNYSHELL_CWD_"+(q==null?B.P.bm():q)+"__",m)
p=new A.lg(a0,q,A.zs(a0.y),p,new A.v3(r),r.gnE(),new A.v4(r),r.gny(),p)
r.d!==$&&A.ax("_controller")
r.d=p
o.qr(new A.v5(r))
o.qs(r.gnI())
s=o.gc4()
q=s.a
if(q>0&&s.b>0)a0.kt(q,s.b)
n.b1()
p.b1()},
nJ(a,b){var s=this,r=s.d
r===$&&A.w("_controller")
r.a.kt(a,b)
r=s.e
r===$&&A.w("_editor")
r.kX(a)
r.c3(s.cM(s.fr))
r=s.dx
if((r.c&4)===0)r.j(0,null)},
du(a){var s,r,q=this
t.L.a(a)
if(q.cx||J.bZ(a))return
s=q.lD(a)
if(!q.cy&&!q.ch&&s.length===1&&J.kb(s)===3){q.mO()
return}r=q.f
if((r.b&4)===0)r.j(0,s)},
mO(){var s,r=this,q=r.db
if(q!=null){s=r.d
s===$&&A.w("_controller")
s=!s.at}else s=!1
if(s){q.$0()
q=r.e
q===$&&A.w("_editor")
if(q.ch!=null)q.kg()
return}q=r.e
q===$&&A.w("_editor")
q.kg()},
mZ(){var s=this,r=s.d
r===$&&A.w("_controller")
r.a.ic("SIGINT")
if(!r.at){r=s.e
r===$&&A.w("_editor")
r.c3(s.cM(s.fr))}},
nH(a){var s,r="_controller"
t.L.a(a)
s=J.at(a)
if(s.gn(a)===1&&J.a0(s.gI(a),3)){s=this.d
s===$&&A.w(r)
s.a.ic("SIGINT")
return}s=this.d
s===$&&A.w(r)
s.kV(a)},
fR(a,b){var s=0,r=A.p(t.a),q,p=this,o
var $async$fR=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:o=p.d
o===$&&A.w("_controller")
if(o.at){q=B.G
s=1
break}q=p.x.$3(a,b,p.fr.a)
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$fR,r)},
nF(a){var s
this.fr=a
s=this.e
s===$&&A.w("_editor")
s.c3(this.cM(a))},
cM(a){var s=a.a
if(s==null)s="~"
return A.IA(a.b,s,a.c,this.c,this.b,a.d,this.a.gc4().a)},
nz(a){if(this.cx)return
this.cx=!0
this.a.a.write("\r\n\x1b[90m[session ended \u2014 exit "+a+"]\x1b[0m\r\n")},
dB(a){return this.nC(A.r(a))},
nC(a){var s=0,r=A.p(t.H),q=this,p
var $async$dB=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:s=a.length!==0?2:3
break
case 2:p=q.e
p===$&&A.w("_editor")
s=4
return A.f(p.f3(a),$async$dB)
case 4:case 3:p=B.a.u(B.a.i7(a),":")
s=p?5:7
break
case 5:s=8
return A.f(q.dG(q.r,a),$async$dB)
case 8:s=6
break
case 7:p=q.d
p===$&&A.w("_controller")
p.l3(a)
case 6:return A.n(null,r)}})
return A.o($async$dB,r)},
dG(a,b){return this.oo(a,b)},
oo(a,b){var s=0,r=A.p(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e
var $async$dG=A.q(function(c,d){if(c===1){o.push(d)
s=p}for(;;)switch(s){case 0:f=m.y.$0()
if(f==null){m.eX("Node information is still loading \u2014 retry.")
j=m.e
j===$&&A.w("_editor")
j.c3(m.cM(m.fr))
s=1
break}j=m.d
j===$&&A.w("_controller")
i=j.a.y
h=i===B.c_?m.gom():null
l=new A.r8(m.w,f,m.z,m.Q,i,m.dy,m.gpl(),new A.uY(m),new A.uZ(m),new A.v_(m),a,h,new A.v0(m),m.gmV(),m.goj())
p=4
s=7
return A.f(a.fd(b,l),$async$dG)
case 7:n.push(6)
s=5
break
case 4:p=3
e=o.pop()
k=A.R(e)
m.eX(A.u(k))
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.db=null
i=m.e
i===$&&A.w("_editor")
i.ka(!1)
s=n.pop()
break
case 6:s=l.ch?8:9
break
case 8:m.cx=!0
s=l.CW?10:12
break
case 10:m.at.$0()
s=11
break
case 12:s=13
return A.f(j.p(),$async$dG)
case 13:m.as.$0()
case 11:s=1
break
case 9:j=m.e
j===$&&A.w("_editor")
j.c3(m.cM(m.fr))
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$dG,r)},
eQ(a){return this.ol(t.qJ.a(a))},
ol(a){var s=0,r=A.p(t.H),q=1,p=[],o=[],n=this,m
var $async$eQ=A.q(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:n.cy=!0
q=2
m=n.e
m===$&&A.w("_editor")
s=5
return A.f(m.dl(a,t.H),$async$eQ)
case 5:o.push(4)
s=3
break
case 2:o=[1]
case 3:q=1
n.cy=!1
s=o.pop()
break
case 4:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$eQ,r)},
mW(){var s=this.a.gc4().a
return B.a.aQ("\u2500",s>0?s:80)},
eR(a){return this.on(A.r(a))},
on(a){var s=0,r=A.p(t.ij),q,p=this,o,n
var $async$eR=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:n=p.d
n===$&&A.w("_controller")
s=3
return A.f(n.re(a),$async$eR)
case 3:o=c
q=new A.hp(o.b,B.l.aK(o.a,!0))
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$eR,r)},
eX(a){var s
A.r(a)
s=A.ad(a,"\r\n","\n")
return this.a.a.write(new Uint8Array(A.c9(t.L.a(B.r.Y(A.ad(s,"\n","\r\n")+"\r\n")))))},
lD(a){var s,r,q
t.L.a(a)
if(!this.CW)return a
this.mb()
s=J.at(a)
if(s.gK(a))return a
r=s.gI(a)
if(!(r>=64&&r<=95))q=r>=97&&r<=122
else q=!0
if(q){q=A.e([r&31],t.t)
B.b.C(q,s.aS(a,1))
return q}return a},
mb(){if(!this.CW)return
this.CW=!1
var s=this.fx
if(s!=null)s.$1(!1)},
ah(){var s,r=this
r.f.p()
r.dx.p()
s=r.e
s===$&&A.w("_editor")
s.p()
s=r.d
s===$&&A.w("_controller")
return s.cf()},
sqq(a){this.fx=t.xl.a(a)},
$iEY:1}
A.v1.prototype={
$1(a){return this.a.a.a.write(new Uint8Array(A.c9(t.L.a(B.r.Y(a)))))},
$S:4}
A.v2.prototype={
$0(){var s=this.a.d
s===$&&A.w("_controller")
s.p()
return null},
$S:0}
A.v3.prototype={
$1(a){var s,r
t.L.a(a)
s=this.a
r=s.e
r===$&&A.w("_editor")
return r.kp(new A.uW(s,a))},
$S:9}
A.uW.prototype={
$0(){return this.a.a.a.write(new Uint8Array(A.c9(t.L.a(this.b))))},
$S:0}
A.v4.prototype={
$1(a){var s=this.a
s.ch=a
s=s.e
s===$&&A.w("_editor")
s.kW(a)},
$S:51}
A.v5.prototype={
$1(a){return this.a.du(B.r.Y(a))},
$S:4}
A.uZ.prototype={
$0(){return this.a.fr.a},
$S:53}
A.uY.prototype={
$1(a){var s,r=this.a.e
r===$&&A.w("_editor")
s=new A.v($.E,t.iB)
r.ch=new A.W(s,t.o7)
B.b.a0(r.cx)
r.cy=0
r.c3(a)
return s},
$S:138}
A.v_.prototype={
$1(a){var s=this.a,r=s.e
r===$&&A.w("_editor")
return r.kp(new A.uX(s,a))},
$S:4}
A.uX.prototype={
$0(){return this.a.eX(this.b)},
$S:0}
A.v0.prototype={
$1(a){var s,r,q
t.Z.a(a)
s=this.a
s.db=a
r=s.e
r===$&&A.w("_editor")
q=a==null
r.ka(!q)
if(q)r.c3(s.cM(s.fr))},
$S:139}
A.mT.prototype={}
A.dh.prototype={
cm(){var s
try{this.b.fit()}catch(s){}},
ks(a,b){var s
try{this.a.resize(a,b)}catch(s){}},
ao(){var s,r
try{s=this.a
s.refresh(0,A.a4(s.rows)-1)}catch(r){}},
qr(a){this.c=A.j(this.a.onData(A.cW(new A.va(t.ma.a(a)))))},
qs(a){this.d=A.j(this.a.onResize(A.cW(new A.vb(t.xx.a(a)))))},
gc4(){var s=this.a
return new A.dT(A.a4(s.cols),A.a4(s.rows))},
kR(){var s
try{this.a.scrollToBottom()}catch(s){}},
ah(){var s=this,r=s.e
if(r!=null)r.U()
r=s.f
if(r!=null)r.U()
r=s.c
if(r!=null)r.dispose()
r=s.d
if(r!=null)r.dispose()
s.a.dispose()},
$iEZ:1}
A.va.prototype={
$1(a){return this.a.$1(A.r(a))},
$S:4}
A.vb.prototype={
$1(a){A.j(a)
return this.a.$2(A.a4(a.cols),A.a4(a.rows))},
$S:2}
A.wI.prototype={
$2(a,b){return this.a.setAttribute(A.r(a),A.r(b))},
$S:49}
A.x_.prototype={
$0(){return this.a.removeEventListener(this.b,this.c)},
$S:0}
A.lD.prototype={
lm(a,b,c){var s,r,q=this,p="div",o=null,n=t.N
n=A.G(["aria-modal","true","aria-label",c],n,n)
s=t.O
r=A.e([A.t(p,o,o,A.e([A.t("h2",o,o,B.h,o,o,o,o,c),A.ar("\u2715","Close","icon ghost",!1,q.gdM(),!1)],s),"modal-head",o,o,o,o),A.t(p,o,o,A.e([b],s),"modal-body",o,o,o,o)],s)
if(a.length!==0)r.push(A.t(p,o,o,a,"modal-foot",o,o,o,o))
n=A.t(p,o,o,A.e([A.t(p,o,n,r,"modal",o,o,"dialog",o)],s),"modal-overlay",o,new A.rj(q),o,o)
q.a!==$&&A.ax("_overlay")
q.a=n},
fF(){var s,r=v.G,q=A.aS(A.j(r.document).body)
q.toString
s=this.a
s===$&&A.w("_overlay")
A.j(q.appendChild(s))
this.b=A.bC(A.j(r.document),"keydown",new A.rk(this))},
p(){var s=this.b
if(s!=null)s.$0()
this.b=null
s=this.a
s===$&&A.w("_overlay")
if(A.aS(s.parentNode)!=null)s.remove()}}
A.rj.prototype={
$1(a){var s=A.aS(A.j(a).target),r=this.a,q=r.a
q===$&&A.w("_overlay")
if(s===q)r.p()},
$S:2}
A.rk.prototype={
$1(a){if(A.r(A.j(a).key)==="Escape")this.a.p()},
$S:2}
A.iK.prototype={
gdS(){var s=this.b
s===$&&A.w("element")
return s},
ll(a){var s,r,q,p,o=this,n=null,m=o.a,l=m.b,k=l.gqF(),j=o.giV(),i=A.e_("none","url","login-hub",j,"hub.example.com:8443","text",k.a)
o.c!==$&&A.ax("_hub")
o.c=i
s=A.e_("none","username","login-principal",j,"alice","text",k.b)
o.d!==$&&A.ax("_principal")
o.d=s
j=A.e_(n,"current-password","login-token",j,"bearer token","password",k.c)
o.e!==$&&A.ax("_token")
o.e=j
r=A.AP("Remember token on this device",A.Y(m.w.b.a.getItem("omnyshell.rememberToken"))==="true","login-remember")
o.f!==$&&A.ax("_remember")
o.f=r.a
m=A.dY(n)
o.r!==$&&A.ax("_messages")
o.r=m
q=A.dY("row")
o.w!==$&&A.ax("_actions")
o.w=q
o.jf(!1)
p=t.O
p=A.t("div",n,n,A.e([A.t("div",n,n,A.e([A.t("div",n,n,A.e([A.t("span",n,n,B.h,"dot",n,n,n,n),A.t("h1",n,n,B.h,n,n,n,n,"OmnyShell")],p),"brand",n,n,n,n),A.t("p",n,n,B.h,"muted",n,n,n,"Connect to a Hub to discover nodes and manage sessions."),m,A.dZ("Hub address",i,"Uses wss:// when no scheme given."),A.dZ("Principal",s,n),A.dZ("Token",j,n),r.b,q,A.t("p",n,n,B.h,"hint",n,n,n,"Self-signed / dev Hubs must have their certificate trusted by this browser or OS first \u2014 the browser controls TLS, so there is no in-app bypass."),A.t("p",n,n,B.h,"hint version-footer",n,n,n,"Web Client v1.15.0 \xb7 OmnyShell v1.56.1")],p),"card pad-lg narrow stack",n,n,n,n)],p),"center-host",n,n,n,n)
o.b!==$&&A.ax("element")
o.b=p
l=l.c
p=l.$ti.h("~(1)").a(o.gnn())
p.$1(l.a)
l=l.b
o.x=new A.aA(l,A.l(l).h("aA<1>")).aE(p)
A.o3(new A.rb(o))},
jf(a){var s,r=this.w
r===$&&A.w("_actions")
A.cq(r)
s=a?"Connecting\u2026":"Connect"
A.j(r.appendChild(A.ar(s,null,"grow",a,this.giV(),!0)))},
no(a){var s,r
t.zX.a(a)
s=this.r
s===$&&A.w("_messages")
A.cq(s)
r=a.a
this.jf(r===B.bl)
if(r===B.bm&&a.d!=null){r=a.d
r.toString
A.j(s.appendChild(A.o0(r)))}},
ez(){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k,j,i
var $async$ez=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:k=p.a
j=k.b
i=j.c
if(i.a.a===B.bl){s=1
break}o=p.c
o===$&&A.w("_hub")
o=A.r(o.value)
n=p.d
n===$&&A.w("_principal")
n=A.r(n.value)
m=p.e
m===$&&A.w("_token")
m=A.r(m.value)
l=p.f
l===$&&A.w("_remember")
s=3
return A.f(j.e0(o,n,A.cH(l.checked),m),$async$ez)
case 3:if(i.a.a===B.ai)k.r.aF("/nodes")
case 1:return A.n(q,r)}})
return A.o($async$ez,r)},
ah(){var s=this.x
return s==null?null:s.U()},
$idK:1}
A.rb.prototype={
$0(){var s=this.a,r=s.c
r===$&&A.w("_hub")
if(A.r(r.value).length===0)r.focus()
else{r=s.d
r===$&&A.w("_principal")
if(A.r(r.value).length===0)r.focus()
else{s=s.e
s===$&&A.w("_token")
s.focus()}}},
$S:0}
A.iS.prototype={
gdS(){var s=this.c
s===$&&A.w("element")
return s},
ln(a,b){var s,r,q=this,p=null,o=q.a,n=q.b,m=A.cj(t.o),l=new A.j4(o.a,n,new A.aQ(B.cE,m,t.o5))
q.f!==$&&A.ax("_sessions")
q.f=l
s=A.dY("stack")
q.d!==$&&A.ax("_body")
q.d=s
r=t.O
r=A.t("div",p,p,A.e([A.t("div",p,p,A.e([A.ar("\u2190 Nodes",p,"ghost",!1,new A.rv(q),!1),A.t("h1",p,p,B.h,"grow node-title",p,p,p,n),A.ar("New shell",p,p,!1,new A.rw(q),!0)],r),"toolbar",p,p,p,p),s],r),"stack",p,p,p,p)
q.c!==$&&A.ax("element")
q.c=r
o=o.c
r=o.c.b
q.e=new A.aA(r,A.l(r).h("aA<1>")).aE(new A.rx(q))
q.r=new A.aA(m,A.l(m).h("aA<1>")).aE(q.gob())
l.ao()
q.iY()
if(o.jV(n)==null)o.e_()},
iY(){var s,r,q,p,o=this,n=null,m=o.d
m===$&&A.w("_body")
A.cq(m)
s=o.a.c
r=o.b
q=s.jV(r)
p=s.c.a
if(q==null){s=p.a
if(s===B.a0)A.j(m.appendChild(A.k9("Loading node\u2026")))
else if(s===B.an){s=p.c
s.toString
A.j(m.appendChild(A.o0(s)))}else{A.j(m.appendChild(A.t("div",n,n,B.h,"empty",n,n,n,'Node "'+r+'" was not found on this Hub.')))
A.j(m.appendChild(A.ar("Back to nodes",n,n,!1,new A.rs(o),!0)))}return}A.j(m.appendChild(o.nT(q)))
A.j(m.appendChild(o.oC()))
A.j(m.appendChild(o.lM(q.r)))},
oC(){var s,r=this,q=null,p=A.dY("stack")
r.w=p
s=r.f
s===$&&A.w("_sessions")
r.jh(s.c.a)
s=t.O
return A.t("div",q,q,A.e([A.t("div",q,q,A.e([A.t("h2",q,q,B.h,"grow",q,q,q,"Sessions"),A.ar("View all",q,q,!1,new A.ru(r),!1)],s),"row",q,q,q,q),p],s),"card",q,q,q,q)},
jh(a){var s,r,q,p,o,n,m,l=null,k="muted"
t.o.a(a)
s=this.w
if(s==null)return
A.cq(s)
r=a.b
if(r==null||J.bZ(r)){q=a.a
if(q===B.a0)A.j(s.appendChild(A.k9("Loading sessions\u2026")))
else if(q===B.an)A.j(s.appendChild(A.t("p",l,l,B.h,k,l,l,l,"Couldn\u2019t load sessions.")))
else A.j(s.appendChild(A.t("p",l,l,B.h,k,l,l,l,"No active sessions.")))
return}q=J.at(r)
p=q.gn(r)
o=q.gn(r)===1?"":"s"
n=a.a===B.a0?" \xb7 refreshing\u2026":""
A.j(s.appendChild(A.t("p",l,l,B.h,k,l,l,l,""+p+" session"+o+n)))
m=A.dY("list")
for(p=q.bz(r,5),o=p.$ti,p=new A.aI(p,p.gn(0),o.h("aI<Q.E>")),o=o.h("Q.E");p.q();){n=p.d
A.j(m.appendChild(this.oA(n==null?o.a(n):n)))}A.j(s.appendChild(m))
if(q.gn(r)>5)A.j(s.appendChild(A.t("p",l,l,B.h,k,l,l,l,"+"+(q.gn(r)-5)+" more")))},
oA(a){var s=null,r="div",q=a.e.b+" \xb7 created "+A.Bb(a.f,new A.bk(Date.now(),0,!1)),p=a.y
if(p!=null&&p.length!==0)q+=" \xb7 "+p
p=t.O
return A.t(r,s,s,A.e([A.t(r,s,s,A.e([A.t(r,s,s,A.e([A.t("span",s,s,B.h,"title mono",s,s,s,a.b),A.t("span",s,s,B.h,"badge",s,s,s,a.x.b)],p),"row",s,s,s,s),A.t(r,s,s,B.h,"sub",s,s,s,q.charCodeAt(0)==0?q:q)],p),"grow",s,s,s,s)],p),"list-item clickable",s,new A.rt(this,a),"button",s)},
nT(a){var s=this,r=null,q=a.d,p=t.O,o=A.e([s.iT("Status",r,A.Be(a.f)),s.bf("Node id",a.a.a)],p),n=a.b
if(n!=null)o.push(s.bf("UID",n.a))
n=a.c
o.push(s.bf("Display name",n.length===0?"\u2014":n))
o.push(s.bf("Platform",q.a+" / "+q.b))
o.push(s.bf("Hostname",q.d))
o.push(s.bf("Agent",q.c))
n=a.e
if(n.gZ(n))B.b.j(o,s.bf("Labels",n.gX().b8(0,new A.rr(),t.N).S(0,", ")))
return A.t("div",r,r,A.e([A.t("h2",r,r,B.h,r,r,r,r,"Overview"),A.t("dl",r,r,o,"kv",r,r,r,r)],p),"card",r,r,r,r)},
lM(a){var s,r,q,p,o,n,m=this,l=null,k="Capabilities"
if(a==null)return A.t("div",l,l,A.e([A.t("h2",l,l,B.h,l,l,l,l,k),A.t("p",l,l,B.h,"muted",l,l,l,"This node did not advertise capabilities.")],t.O),"card",l,l,l,l)
s=A.t("h2",l,l,B.h,l,l,l,l,k)
r=a.a
r=m.bf("Shells",r.length===0?"\u2014":B.b.S(r,", "))
q=a.b
q=m.bf("Features",q.length===0?"\u2014":B.b.S(q,", "))
p=m.bf("Max sessions",""+a.c)
o=a.d
n=t.O
return A.t("div",l,l,A.e([s,A.t("dl",l,l,A.e([r,q,p,m.bf("Direct endpoint",o==null?"Hub tunnel only":o)],n),"kv",l,l,l,l)],n),"card",l,l,l,l)},
iT(a,b,c){var s,r,q=null,p=A.j(new v.G.DocumentFragment())
A.j(p.appendChild(A.t("dt",q,q,B.h,q,q,q,q,a)))
s=A.t("dd",q,q,B.h,q,q,q,q,q)
if(c!=null)A.j(s.appendChild(c))
else{r=b==null?"\u2014":b
s.textContent=r}A.j(p.appendChild(s))
return p},
bf(a,b){return this.iT(a,b,null)},
ah(){var s=this.e
if(s!=null)s.U()
s=this.r
if(s!=null)s.U()},
$idK:1}
A.rv.prototype={
$0(){return this.a.a.r.aF("/nodes")},
$S:0}
A.rw.prototype={
$0(){var s=this.a
return s.a.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1)+"/sessions/new")},
$S:0}
A.rx.prototype={
$1(a){t.A.a(a)
return this.a.iY()},
$S:55}
A.rs.prototype={
$0(){return this.a.a.r.aF("/nodes")},
$S:0}
A.ru.prototype={
$0(){var s=this.a
return s.a.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1)+"/sessions")},
$S:0}
A.rt.prototype={
$1(a){var s,r
A.j(a)
s=this.a
r=s.a
r.z.sae(this.b.b)
r.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1)+"/sessions")},
$S:2}
A.rr.prototype={
$1(a){t.q.a(a)
return a.a+"="+a.b},
$S:25}
A.iT.prototype={
gdS(){var s=this.b
s===$&&A.w("element")
return s},
iZ(a){var s,r,q,p,o,n=this,m=null
t.A.a(a)
s=n.d
s===$&&A.w("_refresh")
r=a.a
q=r===B.a0
s.disabled=q
s=n.c
s===$&&A.w("_body")
A.cq(s)
p=a.b
r=r===B.an
if(r)o=p==null||J.bZ(p)
else o=!1
if(o){r=a.c
r.toString
A.j(s.appendChild(A.o0(r)))
A.j(s.appendChild(A.ar("Retry",m,m,!1,n.a.c.ge7(),!1)))
return}if(q)o=p==null||J.bZ(p)
else o=!1
if(o){A.j(s.appendChild(A.k9("Loading nodes\u2026")))
return}if(p==null||J.bZ(p)){A.j(s.appendChild(A.t("div",m,m,B.h,"empty",m,m,m,"No nodes are registered with this Hub.")))
return}if(r)A.j(s.appendChild(A.t("div",m,m,B.h,"banner warning",m,m,"status","Showing last results \u2014 refresh failed: "+a.c.b)))
else if(a.d&&q)A.j(s.appendChild(A.k9("Refreshing\u2026")))
for(r=J.aN(p);r.q();)A.j(s.appendChild(n.nk(r.gA())))},
nk(a){var s=null,r=a.d,q=a.a.a,p=a.c,o=t.O
return A.t("button","Open node "+q,s,A.e([A.t("div",s,s,A.e([A.t("div",s,s,B.h,"title",s,s,s,p.length===0?q:p),A.t("div",s,s,B.h,"sub mono",s,s,s,q+" \xb7 "+(r.a+"/"+r.b))],o),"grow",s,s,s,s),A.Be(a.f)],o),"list-item",s,new A.rA(this,a),s,s)},
ah(){var s=this.e
return s==null?null:s.U()},
$idK:1}
A.rA.prototype={
$1(a){A.j(a)
return this.a.a.r.aF("/nodes/"+A.cG(2,this.b.a.a,B.l,!1))},
$S:2}
A.j3.prototype={
gdS(){var s=this.w
s===$&&A.w("element")
return s},
lo(a,b,c,d,e,f,g){var s,r,q,p,o,n=this,m="div",l=null,k=A.t(m,"Terminal",l,B.h,"terminal-host",l,l,"group",l)
n.x!==$&&A.ax("_host")
n.x=k
s=A.dY("row")
n.y!==$&&A.ax("_status")
n.y=s
r=A.dY(l)
n.z!==$&&A.ax("_accessory")
n.z=r
q=n.gp8()
p=A.ar("\u2922 Fullscreen","Enter fullscreen","ghost",!1,q,!1)
n.Q!==$&&A.ax("_fsToggle")
n.Q=p
o=t.O
o=A.t(m,l,l,A.e([A.t(m,l,l,A.e([A.ar("\u2190 Sessions",l,"ghost",!1,new A.tn(n),!1),A.t(m,l,l,B.h,"grow",l,l,l,l),s,p,A.ar("Detach",l,l,!1,n.goB(),!1),A.ar("Terminate",l,"danger",!1,n.goZ(),!1)],o),"toolbar",l,l,l,l),A.t(m,l,l,A.e([k],o),"card terminal-card",l,l,l,l),r,A.ar("\u2921","Exit fullscreen","icon ghost term-exit-fullscreen",!1,q,!1)],o),"stack terminal-screen",l,l,l,l)
n.w!==$&&A.ax("element")
n.w=o
A.j(s.appendChild(A.k9("Connecting\u2026")))
s=A.aS(A.j(v.G.document).documentElement)
if(s!=null)A.j(s.classList).add("terminal-active")
A.o3(n.goP())},
cS(){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5
var $async$cS=A.q(function(b7,b8){if(b7===1){o.push(b8)
s=p}for(;;)switch(s){case 0:b4=null
try{b=n.x
b===$&&A.w("_host")
b4=n.d.$1(b)}catch(b6){m=A.R(b6)
n.jt(new A.bb(B.bk,"Terminal failed to load: "+A.u(m),null))
s=1
break}n.as=b4
b=n.c==="new"?n.a.e.qQ(A.AS()):null
n.dx=b
a0=b4
a1=n.x
a1===$&&A.w("_host")
a2=n.z
a2===$&&A.w("_accessory")
a3=n.w
a3===$&&A.w("element")
l=A.EX(a2,b,a1,new A.te(n),a3,a0,new A.tf(n))
n.db=l
k=null
j=null
s=b!=null?3:5
break
case 3:if(b4 instanceof A.dh){a0=b4
a1=a0.e
if(a1!=null)a1.U()
a0=a0.f
if(a0!=null)a0.U()
b4.ks(b.a,b.b)
l.hn()}k=b.a
j=b.b
s=4
break
case 5:s=b4 instanceof A.dh?6:7
break
case 6:l.hn()
s=8
return A.f(A.Dp(B.i6,t.H),$async$cS)
case 8:b4.cm()
case 7:a4=b4.gc4()
a5=a4.a
k=a5>0?a5:80
a6=a4.b
j=a6>0?a6:24
case 4:p=10
s=13
return A.f(n.e.$2(k,j),$async$cS)
case 13:i=b8
if(n.CW){i.bu()
s=1
break}b=i.r
b=b==null?null:b.a
n.ay=b
if(b!=null)n.a.z.sae(b)
n.ex()
b=n.a
a0=b.a
h=a0.gbi()
g=A.zs(i.y)
f=A.DQ()
a1=b.w
s=14
return A.f(A.x3(new A.tg(n),f,a0,a1),$async$cS)
case 14:if(n.CW){i.bu()
s=1
break}a3=b4
a7=a0.c
a8=a7==null
a9=a8?null:a7.a.a
if(a9==null)a9="user"
b0=n.b
b1=i instanceof A.cg?i:null
b2=i instanceof A.cg&&i.x
a8=a8?null:a7.a.a
b3=A.Fe(h,f,A.CS((a8==null?"user":a8)+"@"+b0,b.x),b0,new A.th(n),new A.ti(n,h,g,i),new A.tj(n),new A.tk(n),a9,a7,b1,b2,i,a3)
n.at=b3
e=b3
a3=b4
a7=e.dx
f.fp(new A.mM(a3,new A.aA(a7,A.l(a7).h("aA<1>")),a0,a1))
a1=n.y
a1===$&&A.w("_status")
A.cq(a1)
a1=A.EW(n.f,n.r,e,b.y.gkY(),b4).f
a1===$&&A.w("element")
A.cq(a2)
A.j(a2.appendChild(a1))
b4.a.focus()
b=b.e.e.b
l.ps(new A.aA(b,A.l(b).h("aA<1>")))
d=A.j(A.j(v.G.window).matchMedia("(orientation: portrait)"))
n.cy=A.bC(d,"change",new A.tl(n))
l.ie()
p=2
s=12
break
case 10:p=9
b5=o.pop()
c=A.R(b5)
b4.ah()
n.as=null
n.jt(A.ko(c))
s=12
break
case 9:s=2
break
case 12:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$cS,r)},
p9(){return this.jo(!this.cx)},
jo(a){var s,r
this.cx=a
s=A.aS(A.j(v.G.document).documentElement)
if(s!=null)A.cH(A.j(s.classList).toggle("term-fullscreen",a))
s=this.Q
s===$&&A.w("_fsToggle")
r=a?"\u2921 Exit":"\u2922 Fullscreen"
s.textContent=r
r=a?"Exit fullscreen":"Enter fullscreen"
s.setAttribute("aria-label",r)
r=this.db
if(r!=null)r.ie()},
jt(a){var s=this.y
s===$&&A.w("_status")
A.cq(s)
s=this.x
s===$&&A.w("_host")
A.cq(s)
A.j(s.appendChild(A.o0(a)))},
eT(){var s=0,r=A.p(t.H),q,p=this,o
var $async$eT=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:if(p.ch){s=1
break}p.ch=!0
o=p.at
if(o==null)o=null
else{o=o.d
o===$&&A.w("_controller")
o=o.bu()}s=3
return A.f(o instanceof A.v?o:A.bs(o,t.H),$async$eT)
case 3:o=p.a
o.y.b0(u.b,"success")
o.r.aF("/nodes/"+A.cG(2,p.b,B.l,!1)+"/sessions")
case 1:return A.n(q,r)}})
return A.o($async$eT,r)},
cU(){var s=0,r=A.p(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e
var $async$cU=A.q(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(n.ch){s=1
break}n.ch=!0
m=n.ay
l=!0
k="Session terminated."
p=4
s=m!=null?7:9
break
case 7:s=10
return A.f(n.a.a.ki(n.b,m),$async$cU)
case 10:j=b
l=j.a
if(j.b.length!==0)k=j.b
s=8
break
case 9:h=n.at
if(h==null)h=null
else{h=h.d
h===$&&A.w("_controller")
h=h.p()}s=11
return A.f(h instanceof A.v?h:A.bs(h,t.H),$async$cU)
case 11:case 8:p=2
s=6
break
case 4:p=3
e=o.pop()
i=A.R(e)
l=!1
k=A.ko(i).b
s=6
break
case 3:s=2
break
case 6:h=n.at
h=h==null?null:h.ah()
s=12
return A.f(h instanceof A.v?h:A.bs(h,t.H),$async$cU)
case 12:h=n.a
f=h.y
if(l)f.b0(A.r(k),"success")
else f.b0(A.r(k),"error")
h.r.aF("/nodes/"+A.cG(2,n.b,B.l,!1)+"/sessions")
case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$cU,r)},
ex(){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l,k,j,i
var $async$ex=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
s=6
return A.f(o.a.a.kj(),$async$ex)
case 6:n=b
for(l=J.aN(n),k=o.b;l.q();){m=l.gA()
if(m.a.a===k){o.ax=m
break}}q=1
s=5
break
case 3:q=2
i=p.pop()
s=5
break
case 2:s=1
break
case 5:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$ex,r)},
iU(a){var s,r,q=this
if(q.ch)return
q.ch=!0
s=q.a
r=a?u.b:"Session terminated."
s.y.b0(r,"success")
s.r.aF("/nodes/"+A.cG(2,q.b,B.l,!1)+"/sessions")},
ah(){var s,r,q,p=this
p.CW=!0
s=p.db
if(s!=null){s.x=!0
r=s.y
if(r!=null)r.U()
r=s.z
if(r!=null)r.$0()
r=s.Q
if(r!=null)r.$0()
r=s.as
if(r!=null)r.disconnect()
s=s.at
if(s!=null)s.U()}p.db=null
s=p.cy
if(s!=null)s.$0()
s=v.G
r=A.aS(A.j(s.document).documentElement)
if(r!=null)A.j(r.classList).remove("terminal-active")
if(p.cx){s=A.aS(A.j(s.document).documentElement)
if(s!=null)A.j(s.classList).remove("term-fullscreen")}if(!p.ch){s=p.at
s=s!=null&&!s.cx}else s=!1
if(s){p.ch=!0
s=p.at.d
s===$&&A.w("_controller")
s.bu()}else{s=p.at
if(s!=null)s.ah()}q=p.as
p.as=null
if(q!=null)q.ah()},
$idK:1}
A.tm.prototype={
$1(a){var s,r,q=v.G,p=q.Terminal,o={}
o.cursorBlink=!0
o.fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
o.fontSize=13
o.scrollback=5000
s={}
s.background="#0b0e12"
s.foreground="#e6e9ee"
s.cursor="#4f8bff"
o.theme=s
p=A.j(new p(o))
q=A.j(new q.FitAddon.FitAddon())
r=new A.dh(p,q)
p.loadAddon(q)
p.open(a)
p=r.ghB()
r.e=A.eY(B.cX,p)
r.f=A.eY(B.ia,p)
return r},
$S:142}
A.tn.prototype={
$0(){var s=this.a
return s.a.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1)+"/sessions")},
$S:0}
A.tb.prototype={
$2(a,b){return this.kH(A.a4(a),A.a4(b))},
kH(a,b){var s=0,r=A.p(t.dS),q,p=this,o,n,m
var $async$$2=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:o=p.a
n=p.c
m=p.b.a
s=o==="new"?3:5
break
case 3:s=6
return A.f(m.qx(a,n,b),$async$$2)
case 6:s=4
break
case 5:s=7
return A.f(m.qS(a,n,b,o),$async$$2)
case 7:case 4:q=d
s=1
break
case 1:return A.n(q,r)}})
return A.o($async$$2,r)},
$S:143}
A.tf.prototype={
$0(){return this.a.a.e.e.a},
$S:52}
A.te.prototype={
$0(){return this.a.cx},
$S:59}
A.tg.prototype={
$0(){return A.Bd(this.a.a)},
$S:0}
A.ti.prototype={
$3(a,b,c){return this.kI(a,b,c)},
kI(a,b,c){var s=0,r=A.p(t.a),q,p=2,o=[],n=this,m,l,k,j,i,h
var $async$$3=A.q(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.f(n.b.ck(n.c.hq(a,b),c,n.a.b,n.d.y).kv(B.cZ),$async$$3)
case 7:m=e
k=t.zK
k=new A.a2(A.e(B.l.aK(m.b,!0).split("\n"),t.s),t.ff.a(new A.tc()),k).l6(0,k.h("y(Q.E)").a(new A.td()))
j=A.N(k,k.$ti.h("i.E"))
l=j
k=J.aE(l)>200?J.Cj(l,0,200):l
q=k
s=1
break
p=2
s=6
break
case 4:p=3
h=o.pop()
q=B.G
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.n(q,r)
case 2:return A.m(o.at(-1),r)}})
return A.o($async$$3,r)},
$S:144}
A.tc.prototype={
$1(a){return B.a.c2(A.r(a))},
$S:6}
A.td.prototype={
$1(a){return A.r(a).length!==0},
$S:1}
A.th.prototype={
$0(){return this.a.ax},
$S:145}
A.tk.prototype={
$0(){return this.a.iU(!1)},
$S:0}
A.tj.prototype={
$0(){return this.a.iU(!0)},
$S:0}
A.tl.prototype={
$1(a){var s
A.j(a)
s=this.a
if(s.cx)s.jo(!1)},
$S:2}
A.j5.prototype={
gdS(){var s=this.d
s===$&&A.w("element")
return s},
lp(a,b){var s,r,q,p,o=this,n=null,m=o.a,l=o.b,k=A.cj(t.o),j=new A.aQ(B.cE,k,t.o5)
o.c!==$&&A.ax("_controller")
s=o.c=new A.j4(m.a,l,j)
r=A.dY("list")
o.e!==$&&A.ax("_body")
o.e=r
q=A.ar("Refresh",n,"btn-sm",!1,s.ge7(),!1)
o.f!==$&&A.ax("_refresh")
o.f=q
p=t.O
p=A.t("div",n,n,A.e([A.t("div",n,n,A.e([A.ar("\u2190 Node",n,"ghost",!1,new A.tw(o),!1),A.t("h1",n,n,B.h,"sessions-title",n,n,n,"Sessions"),A.t("div",n,n,B.h,"grow",n,n,n,n),A.ar("New",n,"btn-sm",!1,new A.tx(o),!0),q],p),"toolbar",n,n,n,n),A.t("h1",n,n,B.h,"mono node-title",n,n,n,l),r],p),"stack",n,n,n,n)
o.d!==$&&A.ax("element")
o.d=p
o.r=new A.aA(k,A.l(k).h("aA<1>")).aE(o.goD())
m=m.z.b
o.w=new A.aA(m,A.l(m).h("aA<1>")).aE(new A.ty(o))
o.hf(j.a)
s.ao()},
hf(a){var s,r,q,p,o,n=this,m=null
t.o.a(a)
s=n.f
s===$&&A.w("_refresh")
r=a.a
q=r===B.a0
s.disabled=q
s=n.e
s===$&&A.w("_body")
A.cq(s)
p=a.b
if(r===B.an)r=p==null||J.bZ(p)
else r=!1
if(r){r=a.c
r.toString
A.j(s.appendChild(A.o0(r)))
r=n.c
r===$&&A.w("_controller")
A.j(s.appendChild(A.ar("Retry",m,m,!1,r.ge7(),!1)))
return}if(q)r=p==null||J.bZ(p)
else r=!1
if(r){A.j(s.appendChild(A.k9("Loading sessions\u2026")))
return}if(p==null||J.bZ(p)){A.j(s.appendChild(A.t("div",m,m,B.h,"empty",m,m,m,"No sessions on this node.")))
return}for(r=n.nS(p),q=r.length,o=0;o<r.length;r.length===q||(0,A.M)(r),++o)A.j(s.appendChild(n.oz(r[o])))},
h2(a){var s,r=this.a.z.a
if(r!=null)s=a.b===r||a.a===r
else s=!1
return s},
nS(a){var s=A.N(t.zA.a(a),t.k)
B.b.bn(s,new A.tq(this,new A.tr()))
return s},
oz(a){var s,r,q,p,o=this,n=null,m="div",l="span",k=new A.bk(Date.now(),0,!1),j=a.y,i=j!=null&&j.length!==0,h=a.e.b+" \xb7 created "+A.Bb(a.f,k),g=a.z
if(g!=null&&g.length!==0)h+=" \xb7 "+g
g=a.w
if(g!=null)h+=" \xb7 expires "+A.Ji(g,k)
g=a.x
s=g===B.b1
r=o.h2(a)?"list-item session-item highlight":"list-item session-item"
q=t.N
q=A.G(["style","cursor:default"],q,q)
p=t.O
g=A.e([A.t(l,n,n,B.h,"title mono",n,n,n,a.b),A.t(l,n,n,B.h,"badge",n,n,n,g.b)],p)
if(i)g.push(A.t(l,n,n,B.h,"badge cmd mono",n,n,n,j))
h=A.t(m,n,n,A.e([A.t(m,n,n,g,"row wrap",n,n,n,n),A.t(m,n,n,B.h,"sub",n,n,n,h.charCodeAt(0)==0?h:h)],p),"grow",n,n,n,n)
g=A.e([],p)
if(s)g.push(A.ar("Resume",n,n,!1,new A.ts(o,a),!0))
g.push(A.ar("Peek",n,n,!1,new A.tt(o,a),!1))
if(!s)g.push(A.ar("Detach",n,n,!1,new A.tu(o,a),!1))
g.push(A.ar("Kill",n,"danger",!1,new A.tv(o,a),!1))
return A.t(m,n,q,A.e([h,A.t(m,n,n,g,"row session-actions",n,n,n,n)],p),r,n,n,n,n)},
eI(a){var s=0,r=A.p(t.H),q,p=this,o,n,m,l,k
var $async$eI=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:l=p.a
k=a.b
l.z.sae(k)
o=p.c
o===$&&A.w("_controller")
s=3
return A.f(o.fo(k),$async$eI)
case 3:n=c
if(!n.a){l.y.b0("Peek failed: "+n.b,"error")
s=1
break}m=A.t("pre",null,null,B.h,"screen-capture",null,null,null,null)
l=n.c
if(l.length===0)l="(blank screen)"
m.textContent=l
l=n.d?" (full-screen)":""
A.xM(B.h,m,"Session "+k+l).fF()
case 1:return A.n(q,r)}})
return A.o($async$eI,r)},
ep(a){var s=0,r=A.p(t.H),q=this,p,o,n,m
var $async$ep=A.q(function(b,c){if(b===1)return A.m(c,r)
for(;;)switch(s){case 0:n=q.a
m=a.b
n.z.sae(m)
p=q.c
p===$&&A.w("_controller")
s=2
return A.f(p.dQ(m),$async$ep)
case 2:o=c
m=o.a
n=n.y
p=o.b
if(m)n.b0(p,"success")
else n.b0(p,"error")
return A.n(null,r)}})
return A.o($async$ep,r)},
lY(a){var s=null,r=A.vl("modal"),q=A.t("p",s,s,B.h,s,s,s,s,"This ends the session and any process it is running. This cannot be undone.")
r.sk7(A.xM(A.e([A.ar("Cancel",s,s,!1,new A.to(r),!1),A.ar("Terminate",s,"danger",!1,new A.tp(this,r,a),!1)],t.O),q,"Terminate session "+a.b+"?"))
r.cb().fF()},
ah(){var s=this.r
if(s!=null)s.U()
s=this.w
if(s!=null)s.U()},
$idK:1}
A.tw.prototype={
$0(){var s=this.a
return s.a.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1))},
$S:0}
A.tx.prototype={
$0(){var s=this.a
return s.a.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1)+"/sessions/new")},
$S:0}
A.ty.prototype={
$1(a){var s,r
A.Y(a)
s=this.a
r=s.c
r===$&&A.w("_controller")
return s.hf(r.c.a)},
$S:50}
A.tr.prototype={
$1(a){var s=a.y
return s!=null&&s.length!==0},
$S:146}
A.tq.prototype={
$2(a,b){var s,r,q,p=t.k
p.a(a)
p.a(b)
p=this.a
s=p.h2(a)
if(s!==p.h2(b))return s?-1:1
p=this.b
r=p.$1(a)
if(r!==p.$1(b))return r?-1:1
q=a.x===B.b1
if(q!==(b.x===B.b1))return q?-1:1
return b.f.a3(0,a.f)},
$S:147}
A.ts.prototype={
$0(){var s=this.a,r=s.a,q=this.b.b
r.z.sae(q)
r.r.aF("/nodes/"+A.cG(2,s.b,B.l,!1)+"/sessions/"+A.cG(2,q,B.l,!1))
return null},
$S:0}
A.tt.prototype={
$0(){return this.a.eI(this.b)},
$S:0}
A.tu.prototype={
$0(){return this.a.ep(this.b)},
$S:0}
A.tv.prototype={
$0(){return this.a.lY(this.b)},
$S:0}
A.to.prototype={
$0(){return this.a.cb().p()},
$S:0}
A.tp.prototype={
$0(){var s=0,r=A.p(t.H),q=this,p,o,n,m
var $async$$0=A.q(function(a,b){if(a===1)return A.m(b,r)
for(;;)switch(s){case 0:q.b.cb().p()
p=q.a
o=p.c
o===$&&A.w("_controller")
s=2
return A.f(o.dX(q.c.b),$async$$0)
case 2:n=b
o=n.a
m=n.b
p=p.a.y
if(o)p.b0(m,"success")
else p.b0(m,"error")
return A.n(null,r)}})
return A.o($async$$0,r)},
$S:3}
A.xl.prototype={
$0(){var s,r,q,p,o,n=this,m=n.a,l=A.bJ(A.r(m.value),null)
if(l==null)l=n.b.c.a
s=n.c
r=A.bJ(A.r(s.value),null)
if(r==null)r=n.b.d.a
q=n.b
l=B.c.M(l,20,400)
r=B.c.M(r,5,200)
p=q.c
p.sae(l)
o=q.d
o.sae(r)
q=q.a.b.a
q.setItem("omnyshell.terminal.customCols",""+l)
q.setItem("omnyshell.terminal.customRows",""+r)
m.value=A.u(p.a)
s.value=A.u(o.a)},
$S:0}
A.x9.prototype={
$1(a){A.j(a)
return this.a.$0()},
$S:2}
A.xa.prototype={
$1(a){A.j(a)
return this.a.$0()},
$S:2}
A.xn.prototype={
$0(){var s=this,r=s.a.b.a!==B.bD
A.cH(A.j(s.b.classList).toggle("disabled",r))
s.c.disabled=r
s.d.disabled=r},
$S:0}
A.xb.prototype={
$1(a){var s=this.a,r=A.yQ(a)
s.b.sae(r)
s.a.b.a.setItem("omnyshell.terminal.dimPreset",r.b)
this.b.$0()},
$S:4}
A.xd.prototype={
$1(a){var s=this.a,r=A.zy(a)
s.e.sae(r)
s.a.b.a.setItem("omnyshell.terminal.textSize",r.b)
return null},
$S:4}
A.xe.prototype={
$1(a){var s
A.j(a)
s=A.r(this.b.value)
this.a.a.b.a.setItem("omnyshell.ai.provider",s)
return s},
$S:2}
A.xf.prototype={
$1(a){var s,r,q,p
A.j(a)
s=A.r(this.b.value)
r=B.a.G(s)
q=r.length===0?null:r
p=this.a.a.b.a
if(q==null)p.removeItem("omnyshell.ai.model")
else p.setItem("omnyshell.ai.model",q)
return s},
$S:2}
A.xg.prototype={
$1(a){var s,r,q,p,o
A.j(a)
s=A.r(this.b.value)
r=B.a.G(s)
q=r.length===0?null:r
p=q==null||q.length===0
o=this.a.a.b.a
if(p)o.removeItem("omnyshell.ai.apiKey")
else o.setItem("omnyshell.ai.apiKey",q)
return s},
$S:2}
A.xm.prototype={
$0(){var s=this,r=A.Y(s.a.a.b.a.getItem("omnyshell.ai.useHubDefault"))!=="false"
A.cH(A.j(s.b.classList).toggle("disabled",r))
s.c.disabled=r
s.d.disabled=r
s.e.disabled=r},
$S:0}
A.xh.prototype={
$1(a){var s,r
t.aF.a(a)
if(a==null||!a.a)s="The Hub has no default AI provider \u2014 add your own key below."
else{s=a.b
r=a.c
if(r==null)r="model default"
r="Hub default: "+A.u(s)+" / "+r+" (the key stays on the Hub)."
s=r}this.a.textContent=s},
$S:148}
A.xi.prototype={
$1(a){var s
A.j(a)
s=A.cH(this.b.a.checked)?"true":"false"
this.a.a.b.a.setItem("omnyshell.ai.useHubDefault",s)
this.c.$0()},
$S:2}
A.xj.prototype={
$1(a){this.a.a.sjQ(a)
return a},
$S:4}
A.xk.prototype={
$1(a){var s,r,q
A.j(a)
s=A.r(this.b.value)
r=B.a.G(s)
q=r.length===0?null:r
this.a.a.sjP(q)
return s},
$S:2}
A.xc.prototype={
$0(){return this.a.cb().p()},
$S:0}
A.mB.prototype={
b0(a,b){var s=null,r=A.t("div",s,s,B.h,b.length===0?"toast":"toast "+b,s,s,"status",a)
A.j(this.a.appendChild(r))
A.eY(B.cZ,new A.uK(r))},
kZ(a){return this.b0(a,"")}}
A.uK.prototype={
$0(){var s=this.a
if(A.aS(s.parentNode)!=null)s.remove()},
$S:0}
A.wD.prototype={
$1(a){A.j(a)
return this.a.$0()},
$S:2}
A.wU.prototype={
$1(a){if(A.r(A.j(a).key)==="Enter")this.a.$0()},
$S:12}
A.x2.prototype={
$1(a){A.j(a)
if(A.cH(this.a.checked))this.b.$1(this.c.b)},
$S:12}
A.kO.prototype={
bV(a){var s,r=null
A.AL("absolute",A.e([a,null,null,null,null,null,null,null,null,null,null,null,null,null,null],t.yH))
s=this.a
s=s.ap(a)>0&&!s.b7(a)
if(s)return a
s=this.b
return this.hM(0,s==null?A.AQ():s,a,r,r,r,r,r,r,r,r,r,r,r,r,r,r)},
f8(a){var s,r,q=A.eI(a,this.a)
q.ea()
s=q.d
r=s.length
if(r===0){s=q.b
return s==null?".":s}if(r===1){s=q.b
return s==null?".":s}B.b.hX(s)
s=q.e
if(0>=s.length)return A.b(s,-1)
s.pop()
q.ea()
return q.l(0)},
hM(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var s=A.e([b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q],t.yH)
A.AL("join",s)
return this.q7(new A.bL(s,t.Ai))},
q6(a,b,c){var s=null
return this.hM(0,b,c,s,s,s,s,s,s,s,s,s,s,s,s,s,s)},
q7(a){var s,r,q,p,o,n,m,l,k,j
t.Du.a(a)
for(s=a.$ti,r=s.h("y(i.E)").a(new A.pq()),q=a.gJ(0),s=new A.f9(q,r,s.h("f9<i.E>")),r=this.a,p=!1,o=!1,n="";s.q();){m=q.gA()
if(r.b7(m)&&o){l=A.eI(m,r)
k=n.charCodeAt(0)==0?n:n
n=B.a.m(k,0,r.d9(k,!0))
l.b=n
if(r.e1(n))B.b.i(l.e,0,r.gcB())
n=l.l(0)}else if(r.ap(m)>0){o=!r.b7(m)
n=m}else{j=m.length
if(j!==0){if(0>=j)return A.b(m,0)
j=r.hr(m[0])}else j=!1
if(!j)if(p)n+=r.gcB()
n+=m}p=r.e1(m)}return n.charCodeAt(0)==0?n:n},
cC(a,b){var s=A.eI(b,this.a),r=s.d,q=A.U(r),p=q.h("ae<1>")
r=A.N(new A.ae(r,q.h("y(1)").a(new A.pr()),p),p.h("i.E"))
s.sqA(r)
r=s.b
if(r!=null)B.b.hJ(s.d,0,r)
return s.d},
a4(a){var s
if(!this.nj(a))return a
s=A.eI(a,this.a)
s.hQ()
return s.l(0)},
nj(a){var s,r,q,p,o,n,m,l=this.a,k=l.ap(a)
if(k!==0){if(l===$.o5())for(s=a.length,r=0;r<k;++r){if(!(r<s))return A.b(a,r)
if(a.charCodeAt(r)===47)return!0}q=k
p=47}else{q=0
p=null}for(s=a.length,r=q,o=null;r<s;++r,o=p,p=n){if(!(r>=0))return A.b(a,r)
n=a.charCodeAt(r)
if(l.a8(n)){if(l===$.o5()&&n===47)return!0
if(p!=null&&l.a8(p))return!0
if(p===46)m=o==null||o===46||l.a8(o)
else m=!1
if(m)return!0}}if(p==null)return!0
if(l.a8(p))return!0
if(p===46)l=o==null||l.a8(o)||o===46
else l=!1
if(l)return!0
return!1},
e8(a,b){var s,r,q,p,o,n,m,l=this,k='Unable to find a path to "',j=b==null
if(j&&l.a.ap(a)<=0)return l.a4(a)
if(j){j=l.b
b=j==null?A.AQ():j}else b=l.bV(b)
j=l.a
if(j.ap(b)<=0&&j.ap(a)>0)return l.a4(a)
if(j.ap(a)<=0||j.b7(a))a=l.bV(a)
if(j.ap(a)<=0&&j.ap(b)>0)throw A.d(A.zb(k+a+'" from "'+b+'".'))
s=A.eI(b,j)
s.hQ()
r=A.eI(a,j)
r.hQ()
q=s.d
p=q.length
if(p!==0){if(0>=p)return A.b(q,0)
q=q[0]==="."}else q=!1
if(q)return r.l(0)
q=s.b
p=r.b
if(q!=p)q=q==null||p==null||!j.hT(q,p)
else q=!1
if(q)return r.l(0)
for(;;){q=s.d
p=q.length
o=!1
if(p!==0){n=r.d
m=n.length
if(m!==0){if(0>=p)return A.b(q,0)
q=q[0]
if(0>=m)return A.b(n,0)
n=j.hT(q,n[0])
q=n}else q=o}else q=o
if(!q)break
B.b.bx(s.d,0)
B.b.bx(s.e,1)
B.b.bx(r.d,0)
B.b.bx(r.e,1)}q=s.d
p=q.length
if(p!==0){if(0>=p)return A.b(q,0)
q=q[0]===".."}else q=!1
if(q)throw A.d(A.zb(k+a+'" from "'+b+'".'))
q=t.N
B.b.hK(r.d,0,A.bU(p,"..",!1,q))
B.b.i(r.e,0,"")
B.b.hK(r.e,1,A.bU(s.d.length,j.gcB(),!1,q))
j=r.d
q=j.length
if(q===0)return"."
if(q>1&&B.b.gaX(j)==="."){B.b.hX(r.d)
j=r.e
if(0>=j.length)return A.b(j,-1)
j.pop()
if(0>=j.length)return A.b(j,-1)
j.pop()
B.b.j(j,"")}r.b=""
r.ea()
return r.l(0)},
qK(a){return this.e8(a,null)},
bq(a,b){var s,r,q,p,o,n,m,l,k=this
a=A.r(a)
b=A.r(b)
r=k.a
q=r.ap(A.r(a))>0
p=r.ap(A.r(b))>0
if(q&&!p){b=k.bV(b)
if(r.b7(a))a=k.bV(a)}else if(p&&!q){a=k.bV(a)
if(r.b7(b))b=k.bV(b)}else if(p&&q){o=r.b7(b)
n=r.b7(a)
if(o&&!n)b=k.bV(b)
else if(n&&!o)a=k.bV(a)}m=k.n7(a,b)
if(m!==B.ag)return m
s=null
try{s=k.e8(b,a)}catch(l){if(A.R(l) instanceof A.iX)return B.Y
else throw l}if(r.ap(A.r(s))>0)return B.Y
if(J.a0(s,"."))return B.Z
if(J.a0(s,".."))return B.Y
return J.aE(s)>=3&&J.Ci(s,"..")&&r.a8(J.Cc(s,2))?B.Y:B.aq},
n7(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this
if(a===".")a=""
s=d.a
r=s.ap(a)
q=s.ap(b)
if(r!==q)return B.Y
for(p=a.length,o=b.length,n=0;n<r;++n){if(!(n<p))return A.b(a,n)
if(!(n<o))return A.b(b,n)
if(!s.f4(a.charCodeAt(n),b.charCodeAt(n)))return B.Y}m=q
l=r
k=47
j=null
for(;;){if(!(l<p&&m<o))break
A:{if(!(l>=0&&l<p))return A.b(a,l)
i=a.charCodeAt(l)
if(!(m>=0&&m<o))return A.b(b,m)
h=b.charCodeAt(m)
if(s.f4(i,h)){if(s.a8(i))j=l;++l;++m
k=i
break A}if(s.a8(i)&&s.a8(k)){g=l+1
j=l
l=g
break A}else if(s.a8(h)&&s.a8(k)){++m
break A}if(i===46&&s.a8(k)){++l
if(l===p)break
if(!(l<p))return A.b(a,l)
i=a.charCodeAt(l)
if(s.a8(i)){g=l+1
j=l
l=g
break A}if(i===46){++l
if(l!==p){if(!(l<p))return A.b(a,l)
f=s.a8(a.charCodeAt(l))}else f=!0
if(f)return B.ag}}if(h===46&&s.a8(k)){++m
if(m===o)break
if(!(m<o))return A.b(b,m)
h=b.charCodeAt(m)
if(s.a8(h)){++m
break A}if(h===46){++m
if(m!==o){if(!(m<o))return A.b(b,m)
p=s.a8(b.charCodeAt(m))
s=p}else s=!0
if(s)return B.ag}}if(d.eH(b,m)!==B.cf)return B.ag
if(d.eH(a,l)!==B.cf)return B.ag
return B.Y}}if(m===o){if(l!==p){if(!(l>=0&&l<p))return A.b(a,l)
s=s.a8(a.charCodeAt(l))}else s=!0
if(s)j=l
else if(j==null)j=Math.max(0,r-1)
e=d.eH(a,j)
if(e===B.cg)return B.Z
return e===B.ch?B.ag:B.Y}e=d.eH(b,m)
if(e===B.cg)return B.Z
if(e===B.ch)return B.ag
if(!(m>=0&&m<o))return A.b(b,m)
return s.a8(b.charCodeAt(m))||s.a8(k)?B.aq:B.Y},
eH(a,b){var s,r,q,p,o,n,m,l
for(s=a.length,r=this.a,q=b,p=0,o=!1;q<s;){for(;;){if(q<s){if(!(q>=0))return A.b(a,q)
n=r.a8(a.charCodeAt(q))}else n=!1
if(!n)break;++q}if(q===s)break
m=q
for(;;){if(m<s){if(!(m>=0))return A.b(a,m)
n=!r.a8(a.charCodeAt(m))}else n=!1
if(!n)break;++m}n=m-q
if(n===1){if(!(q>=0&&q<s))return A.b(a,q)
l=a.charCodeAt(q)===46}else l=!1
if(!l){l=!1
if(n===2){if(!(q>=0&&q<s))return A.b(a,q)
if(a.charCodeAt(q)===46){n=q+1
if(!(n<s))return A.b(a,n)
n=a.charCodeAt(n)===46}else n=l}else n=l
if(n){--p
if(p<0)break
if(p===0)o=!0}else ++p}if(m===s)break
q=m+1}if(p<0)return B.ch
if(p===0)return B.cg
if(o)return B.pS
return B.cf},
ko(a){var s,r,q=this,p=A.Ay(a)
if(p.gaG()==="file"&&q.a===$.ka())return p.l(0)
else if(p.gaG()!=="file"&&p.gaG()!==""&&q.a!==$.ka())return p.l(0)
s=q.a4(q.a.hS(A.Ay(p)))
r=q.qK(s)
return q.cC(0,r).length>q.cC(0,s).length?s:r}}
A.pq.prototype={
$1(a){return A.r(a)!==""},
$S:1}
A.pr.prototype={
$1(a){return A.r(a).length!==0},
$S:1}
A.ww.prototype={
$1(a){A.Y(a)
return a==null?"null":'"'+a+'"'},
$S:150}
A.hK.prototype={
l(a){return this.a}}
A.hL.prototype={
l(a){return this.a}}
A.fR.prototype={
kM(a){var s,r=this.ap(a)
if(r>0)return B.a.m(a,0,r)
if(this.b7(a)){if(0>=a.length)return A.b(a,0)
s=a[0]}else s=null
return s},
f4(a,b){return a===b},
hT(a,b){return a===b}}
A.lW.prototype={
gjU(){var s=this,r=t.N,q=new A.lW(s.a,s.b,s.c,A.xL(s.d,!0,r),A.xL(s.e,!0,r))
q.ea()
r=q.d
if(r.length===0){r=s.b
return r==null?"":r}return B.b.gaX(r)},
ea(){var s,r,q=this
for(;;){s=q.d
if(!(s.length!==0&&B.b.gaX(s)===""))break
B.b.hX(q.d)
s=q.e
if(0>=s.length)return A.b(s,-1)
s.pop()}s=q.e
r=s.length
if(r!==0)B.b.i(s,r-1,"")},
hQ(){var s,r,q,p,o,n,m=this,l=A.e([],t.s)
for(s=m.d,r=s.length,q=0,p=0;p<s.length;s.length===r||(0,A.M)(s),++p){o=s[p]
if(!(o==="."||o===""))if(o===".."){n=l.length
if(n!==0){if(0>=n)return A.b(l,-1)
l.pop()}else ++q}else B.b.j(l,o)}if(m.b==null)B.b.hK(l,0,A.bU(q,"..",!1,t.N))
if(l.length===0&&m.b==null)B.b.j(l,".")
m.d=l
s=m.a
m.e=A.bU(l.length+1,s.gcB(),!0,t.N)
r=m.b
if(r==null||l.length===0||!s.e1(r))B.b.i(m.e,0,"")
r=m.b
if(r!=null&&s===$.o5())m.b=A.ad(r,"/","\\")
m.ea()},
l(a){var s,r,q,p,o,n=this.b
n=n!=null?n:""
for(s=this.d,r=s.length,q=this.e,p=q.length,o=0;o<r;++o){if(!(o<p))return A.b(q,o)
n=n+q[o]+s[o]}n+=B.b.gaX(q)
return n.charCodeAt(0)==0?n:n},
sqA(a){this.d=t.a.a(a)}}
A.iX.prototype={
l(a){return"PathException: "+this.a},
$iaf:1}
A.u_.prototype={
l(a){return this.gT()}}
A.m1.prototype={
hr(a){return B.a.t(a,"/")},
a8(a){return a===47},
e1(a){var s,r=a.length
if(r!==0){s=r-1
if(!(s>=0))return A.b(a,s)
s=a.charCodeAt(s)!==47
r=s}else r=!1
return r},
d9(a,b){var s=a.length
if(s!==0){if(0>=s)return A.b(a,0)
s=a.charCodeAt(0)===47}else s=!1
if(s)return 1
return 0},
ap(a){return this.d9(a,!1)},
b7(a){return!1},
hS(a){var s
if(a.gaG()===""||a.gaG()==="file"){s=a.gb9()
return A.w7(s,0,s.length,B.l,!1)}throw A.d(A.as("Uri "+a.l(0)+" must have scheme 'file:'.",null))},
gT(){return"posix"},
gcB(){return"/"}}
A.mI.prototype={
hr(a){return B.a.t(a,"/")},
a8(a){return a===47},
e1(a){var s,r=a.length
if(r===0)return!1
s=r-1
if(!(s>=0))return A.b(a,s)
if(a.charCodeAt(s)!==47)return!0
return B.a.aA(a,"://")&&this.ap(a)===r},
d9(a,b){var s,r,q,p=a.length
if(p===0)return 0
if(0>=p)return A.b(a,0)
if(a.charCodeAt(0)===47)return 1
for(s=0;s<p;++s){r=a.charCodeAt(s)
if(r===47)return 0
if(r===58){if(s===0)return 0
q=B.a.a_(a,"/",B.a.a6(a,"//",s+1)?s+3:s)
if(q<=0)return p
if(!b||p<q+3)return q
if(!B.a.u(a,"file://"))return q
p=A.AT(a,q+1)
return p==null?q:p}}return 0},
ap(a){return this.d9(a,!1)},
b7(a){var s=a.length
if(s!==0){if(0>=s)return A.b(a,0)
s=a.charCodeAt(0)===47}else s=!1
return s},
hS(a){return a.l(0)},
gT(){return"url"},
gcB(){return"/"}}
A.mP.prototype={
hr(a){return B.a.t(a,"/")},
a8(a){return a===47||a===92},
e1(a){var s,r=a.length
if(r===0)return!1
s=r-1
if(!(s>=0))return A.b(a,s)
s=a.charCodeAt(s)
return!(s===47||s===92)},
d9(a,b){var s,r,q=a.length
if(q===0)return 0
if(0>=q)return A.b(a,0)
if(a.charCodeAt(0)===47)return 1
if(a.charCodeAt(0)===92){if(q>=2){if(1>=q)return A.b(a,1)
s=a.charCodeAt(1)!==92}else s=!0
if(s)return 1
r=B.a.a_(a,"\\",2)
if(r>0){r=B.a.a_(a,"\\",r+1)
if(r>0)return r}return q}if(q<3)return 0
if(!A.B0(a.charCodeAt(0)))return 0
if(a.charCodeAt(1)!==58)return 0
q=a.charCodeAt(2)
if(!(q===47||q===92))return 0
return 3},
ap(a){return this.d9(a,!1)},
b7(a){return this.ap(a)===1},
hS(a){var s,r
if(a.gaG()!==""&&a.gaG()!=="file")throw A.d(A.as("Uri "+a.l(0)+" must have scheme 'file:'.",null))
s=a.gb9()
if(a.gbj()===""){if(s.length>=3&&B.a.u(s,"/")&&A.AT(s,1)!=null)s=B.a.kr(s,"/","")}else s="\\\\"+a.gbj()+s
r=A.ad(s,"/","\\")
return A.w7(r,0,r.length,B.l,!1)},
f4(a,b){var s
if(a===b)return!0
if(a===47)return b===92
if(a===92)return b===47
if((a^b)!==32)return!1
s=a|32
return s>=97&&s<=122},
hT(a,b){var s,r,q
if(a===b)return!0
s=a.length
r=b.length
if(s!==r)return!1
for(q=0;q<s;++q){if(!(q<r))return A.b(b,q)
if(!this.f4(a.charCodeAt(q),b.charCodeAt(q)))return!1}return!0},
gT(){return"windows"},
gcB(){return"\\"}}
A.tK.prototype={
gn(a){return this.c.length},
gqb(){return this.b.length},
lq(a,b){var s,r,q,p,o,n,m,l,k,j
for(s=this.c,r=s.length,q=a.a,p=q.length,o=s.$flags|0,n=this.b,m=0;m<r;++m){if(!(m<p))return A.b(q,m)
l=q.charCodeAt(m)
o&2&&A.ai(s)
s[m]=l
if(l===13){k=m+1
if(k<p){if(!(k<p))return A.b(q,k)
j=q.charCodeAt(k)!==10}else j=!0
if(j)l=10}if(l===10)B.b.j(n,m+1)}},
df(a){var s,r=this
if(a<0)throw A.d(A.b7("Offset may not be negative, was "+a+"."))
else if(a>r.c.length)throw A.d(A.b7("Offset "+a+u.D+r.gn(0)+"."))
s=r.b
if(a<B.b.gI(s))return-1
if(a>=B.b.gaX(s))return s.length-1
if(r.n2(a)){s=r.d
s.toString
return s}return r.d=r.lJ(a)-1},
n2(a){var s,r,q,p=this.d
if(p==null)return!1
s=this.b
r=s.length
if(p>>>0!==p||p>=r)return A.b(s,p)
if(a<s[p])return!1
if(!(p>=r-1)){q=p+1
if(!(q<r))return A.b(s,q)
q=a<s[q]}else q=!0
if(q)return!0
if(!(p>=r-2)){q=p+2
if(!(q<r))return A.b(s,q)
q=a<s[q]
s=q}else s=!0
if(s){this.d=p+1
return!0}return!1},
lJ(a){var s,r,q=this.b,p=q.length,o=p-1
for(s=0;s<o;){r=s+B.c.W(o-s,2)
if(!(r>=0&&r<p))return A.b(q,r)
if(q[r]>a)o=r
else s=r+1}return o},
fD(a){var s,r,q,p=this
if(a<0)throw A.d(A.b7("Offset may not be negative, was "+a+"."))
else if(a>p.c.length)throw A.d(A.b7("Offset "+a+" must be not be greater than the number of characters in the file, "+p.gn(0)+"."))
s=p.df(a)
r=p.b
if(!(s>=0&&s<r.length))return A.b(r,s)
q=r[s]
if(q>a)throw A.d(A.b7("Line "+s+" comes after offset "+a+"."))
return a-q},
ed(a){var s,r,q,p
if(a<0)throw A.d(A.b7("Line may not be negative, was "+a+"."))
else{s=this.b
r=s.length
if(a>=r)throw A.d(A.b7("Line "+a+" must be less than the number of lines in the file, "+this.gqb()+"."))}q=s[a]
if(q<=this.c.length){p=a+1
s=p<r&&q>=s[p]}else s=!0
if(s)throw A.d(A.b7("Line "+a+" doesn't have 0 columns."))
return q}}
A.l3.prototype={
ga2(){return this.a.a},
gab(){return this.a.df(this.b)},
gal(){return this.a.fD(this.b)},
gan(){return this.b}}
A.hH.prototype={
ga2(){return this.a.a},
gn(a){return this.c-this.b},
gP(){return A.xE(this.a,this.b)},
gO(){return A.xE(this.a,this.c)},
ga1(){return A.c5(B.bR.aq(this.a.c,this.b,this.c),0,null)},
gaU(){var s=this,r=s.a,q=s.c,p=r.df(q)
if(r.fD(q)===0&&p!==0){if(q-s.b===0)return p===r.b.length-1?"":A.c5(B.bR.aq(r.c,r.ed(p),r.ed(p+1)),0,null)}else q=p===r.b.length-1?r.c.length:r.ed(p+1)
return A.c5(B.bR.aq(r.c,r.ed(r.df(s.b)),q),0,null)},
a3(a,b){var s
t.gL.a(b)
if(!(b instanceof A.hH))return this.le(0,b)
s=B.c.a3(this.b,b.b)
return s===0?B.c.a3(this.c,b.c):s},
L(a,b){var s=this
if(b==null)return!1
if(!(b instanceof A.hH))return s.ld(0,b)
return s.b===b.b&&s.c===b.c&&J.a0(s.a.a,b.a.a)},
gE(a){return A.bo(this.b,this.c,this.a.a,B.f,B.f,B.f,B.f)},
$idc:1}
A.qa.prototype={
q3(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a.a
a.jJ(B.b.gI(a1).c)
s=a.e
r=A.bU(s,a0,!1,t.lI)
for(q=a.r,s=s!==0,p=a.b,o=0;o<a1.length;++o){n=a1[o]
if(o>0){m=a1[o-1]
l=n.c
if(!J.a0(m.c,l)){a.f_("\u2575")
q.a+="\n"
a.jJ(l)}else if(m.b+1!==n.b){a.po("...")
q.a+="\n"}}for(l=n.d,k=A.U(l).h("j0<1>"),j=new A.j0(l,k),j=new A.aI(j,j.gn(0),k.h("aI<Q.E>")),k=k.h("Q.E"),i=n.b,h=n.a;j.q();){g=j.d
if(g==null)g=k.a(g)
f=g.a
if(f.gP().gab()!==f.gO().gab()&&f.gP().gab()===i&&a.n3(B.a.m(h,0,f.gP().gal()))){e=B.b.aW(r,a0)
if(e<0)A.K(A.as(A.u(r)+" contains no null elements.",a0))
B.b.i(r,e,g)}}a.pn(i)
q.a+=" "
a.pm(n,r)
if(s)q.a+=" "
d=B.b.fg(l,new A.qw())
if(d===-1)c=a0
else{if(!(d>=0&&d<l.length))return A.b(l,d)
c=l[d]}k=c!=null
if(k){j=c.a
g=j.gP().gab()===i?j.gP().gal():0
a.pj(h,g,j.gO().gab()===i?j.gO().gal():h.length,p)}else a.f1(h)
q.a+="\n"
if(k)a.pk(n,c,r)
for(l=l.length,b=0;b<l;++b)continue}a.f_("\u2575")
a1=q.a
return a1.charCodeAt(0)==0?a1:a1},
jJ(a){var s,r,q=this
if(!q.f||!t.eP.b(a))q.f_("\u2577")
else{q.f_("\u250c")
q.b3(new A.qj(q),"\x1b[34m",t.H)
s=q.r
r=" "+$.b3().ko(a)
s.a+=r}q.r.a+="\n"},
eY(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e={}
t.cO.a(b)
e.a=!1
e.b=null
s=c==null
if(s)r=null
else r=f.b
for(q=b.length,p=t.c,o=f.b,s=!s,n=f.r,m=t.H,l=!1,k=0;k<q;++k){j=b[k]
i=j==null
h=i?null:j.a.gP().gab()
g=i?null:j.a.gO().gab()
if(s&&j===c){f.b3(new A.qq(f,h,a),r,p)
l=!0}else if(l)f.b3(new A.qr(f,j),r,p)
else if(i)if(e.a)f.b3(new A.qs(f),e.b,m)
else n.a+=" "
else f.b3(new A.qt(e,f,c,h,a,j,g),o,p)}},
pm(a,b){return this.eY(a,b,null)},
pj(a,b,c,d){var s=this
s.f1(B.a.m(a,0,b))
s.b3(new A.qk(s,a,b,c),d,t.H)
s.f1(B.a.m(a,c,a.length))},
pk(a,b,c){var s,r,q,p=this
t.cO.a(c)
s=p.b
r=b.a
if(r.gP().gab()===r.gO().gab()){p.hk()
r=p.r
r.a+=" "
p.eY(a,c,b)
if(c.length!==0)r.a+=" "
p.jK(b,c,p.b3(new A.ql(p,a,b),s,t.S))}else{q=a.b
if(r.gP().gab()===q){if(B.b.t(c,b))return
A.J5(c,b,t.E)
p.hk()
r=p.r
r.a+=" "
p.eY(a,c,b)
p.b3(new A.qm(p,a,b),s,t.H)
r.a+="\n"}else if(r.gO().gab()===q){r=r.gO().gal()
if(r===a.a.length){A.Bc(c,b,t.E)
return}p.hk()
p.r.a+=" "
p.eY(a,c,b)
p.jK(b,c,p.b3(new A.qn(p,!1,a,b),s,t.S))
A.Bc(c,b,t.E)}}},
jI(a,b,c){var s=c?0:1,r=this.r
s=B.a.aQ("\u2500",1+b+this.fU(B.a.m(a.a,0,b+s))*3)
r.a=(r.a+=s)+"^"},
pi(a,b){return this.jI(a,b,!0)},
jK(a,b,c){t.cO.a(b)
this.r.a+="\n"
return},
f1(a){var s,r,q,p
for(s=new A.cu(a),r=t.I,s=new A.aI(s,s.gn(0),r.h("aI<P.E>")),q=this.r,r=r.h("P.E");s.q();){p=s.d
if(p==null)p=r.a(p)
if(p===9)q.a+=B.a.aQ(" ",4)
else{p=A.ak(p)
q.a+=p}}},
f0(a,b,c){var s={}
s.a=c
if(b!=null)s.a=B.c.l(b+1)
this.b3(new A.qu(s,this,a),"\x1b[34m",t.c)},
f_(a){return this.f0(a,null,null)},
po(a){return this.f0(null,null,a)},
pn(a){return this.f0(null,a,null)},
hk(){return this.f0(null,null,null)},
fU(a){var s,r,q,p
for(s=new A.cu(a),r=t.I,s=new A.aI(s,s.gn(0),r.h("aI<P.E>")),r=r.h("P.E"),q=0;s.q();){p=s.d
if((p==null?r.a(p):p)===9)++q}return q},
n3(a){var s,r,q
for(s=new A.cu(a),r=t.I,s=new A.aI(s,s.gn(0),r.h("aI<P.E>")),r=r.h("P.E");s.q();){q=s.d
if(q==null)q=r.a(q)
if(q!==32&&q!==9)return!1}return!0},
b3(a,b,c){var s,r
c.h("0()").a(a)
s=this.b!=null
if(s&&b!=null)this.r.a+=b
r=a.$0()
if(s&&b!=null)this.r.a+="\x1b[0m"
return r}}
A.qv.prototype={
$0(){return this.a},
$S:53}
A.qc.prototype={
$1(a){var s=t.Dd.a(a).d,r=A.U(s)
return new A.ae(s,r.h("y(1)").a(new A.qb()),r.h("ae<1>")).gn(0)},
$S:151}
A.qb.prototype={
$1(a){var s=t.E.a(a).a
return s.gP().gab()!==s.gO().gab()},
$S:26}
A.qd.prototype={
$1(a){return t.Dd.a(a).c},
$S:153}
A.qg.prototype={
$1(a){var s=t.E.a(a).a.ga2()
return s==null?new A.x():s},
$S:232}
A.qh.prototype={
$2(a,b){var s=t.E
return s.a(a).a.a3(0,s.a(b).a)},
$S:155}
A.qi.prototype={
$1(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
t.ho.a(a0)
s=a0.a
r=a0.b
q=A.e([],t.Ac)
for(p=J.bN(r),o=p.gJ(r),n=t.oi;o.q();){m=o.gA().a
l=m.gaU()
k=A.wL(l,m.ga1(),m.gP().gal())
k.toString
j=B.a.dK("\n",B.a.m(l,0,k)).gn(0)
i=m.gP().gab()-j
for(m=l.split("\n"),k=m.length,h=0;h<k;++h){g=m[h]
if(q.length===0||i>B.b.gaX(q).b)B.b.j(q,new A.c7(g,i,s,A.e([],n)));++i}}f=A.e([],n)
for(o=q.length,n=t.v1,e=f.$flags|0,d=0,h=0;h<q.length;q.length===o||(0,A.M)(q),++h){g=q[h]
m=n.a(new A.qf(g))
e&1&&A.ai(f,16)
B.b.je(f,m,!0)
c=f.length
for(m=p.aS(r,d),k=m.$ti,m=new A.aI(m,m.gn(0),k.h("aI<Q.E>")),b=g.b,k=k.h("Q.E");m.q();){a=m.d
if(a==null)a=k.a(a)
if(a.a.gP().gab()>b)break
B.b.j(f,a)}d+=f.length-c
B.b.C(g.d,f)}return q},
$S:156}
A.qf.prototype={
$1(a){return t.E.a(a).a.gO().gab()<this.a.b},
$S:26}
A.qw.prototype={
$1(a){t.E.a(a)
return!0},
$S:26}
A.qj.prototype={
$0(){this.a.r.a+=B.a.aQ("\u2500",2)+">"
return null},
$S:0}
A.qq.prototype={
$0(){var s=this.a.r,r=this.b===this.c.b?"\u250c":"\u2514"
s.a+=r},
$S:5}
A.qr.prototype={
$0(){var s=this.a.r,r=this.b==null?"\u2500":"\u253c"
s.a+=r},
$S:5}
A.qs.prototype={
$0(){this.a.r.a+="\u2500"
return null},
$S:0}
A.qt.prototype={
$0(){var s,r,q=this,p=q.a,o=p.a?"\u253c":"\u2502"
if(q.c!=null)q.b.r.a+=o
else{s=q.e
r=s.b
if(q.d===r){s=q.b
s.b3(new A.qo(p,s),p.b,t.c)
p.a=!0
if(p.b==null)p.b=s.b}else{s=q.r===r&&q.f.a.gO().gal()===s.a.length
r=q.b
if(s)r.r.a+="\u2514"
else r.b3(new A.qp(r,o),p.b,t.c)}}},
$S:5}
A.qo.prototype={
$0(){var s=this.b.r,r=this.a.a?"\u252c":"\u250c"
s.a+=r},
$S:5}
A.qp.prototype={
$0(){this.a.r.a+=this.b},
$S:5}
A.qk.prototype={
$0(){var s=this
return s.a.f1(B.a.m(s.b,s.c,s.d))},
$S:0}
A.ql.prototype={
$0(){var s,r,q=this.a,p=q.r,o=p.a,n=this.c.a,m=n.gP().gal(),l=n.gO().gal()
n=this.b.a
s=q.fU(B.a.m(n,0,m))
r=q.fU(B.a.m(n,m,l))
m+=s*3
n=(p.a+=B.a.aQ(" ",m))+B.a.aQ("^",Math.max(l+(s+r)*3-m,1))
p.a=n
return n.length-o.length},
$S:15}
A.qm.prototype={
$0(){return this.a.pi(this.b,this.c.a.gP().gal())},
$S:0}
A.qn.prototype={
$0(){var s=this,r=s.a,q=r.r,p=q.a
if(s.b)q.a=p+B.a.aQ("\u2500",3)
else r.jI(s.c,Math.max(s.d.a.gO().gal()-1,0),!1)
return q.a.length-p.length},
$S:15}
A.qu.prototype={
$0(){var s=this.b,r=s.r,q=this.a.a
if(q==null)q=""
s=B.a.kl(q,s.d)
s=r.a+=s
q=this.c
r.a=s+(q==null?"\u2502":q)},
$S:5}
A.b8.prototype={
l(a){var s=this.a
s="primary "+(""+s.gP().gab()+":"+s.gP().gal()+"-"+s.gO().gab()+":"+s.gO().gal())
return s.charCodeAt(0)==0?s:s}}
A.vH.prototype={
$0(){var s,r,q,p,o=this.a
if(!(t.ER.b(o)&&A.wL(o.gaU(),o.ga1(),o.gP().gal())!=null)){s=A.mo(o.gP().gan(),0,0,o.ga2())
r=o.gO().gan()
q=o.ga2()
p=A.Ip(o.ga1(),10)
o=A.tL(s,A.mo(r,A.zN(o.ga1()),p,q),o.ga1(),o.ga1())}return A.Fu(A.Fw(A.Fv(o)))},
$S:157}
A.c7.prototype={
l(a){return""+this.b+': "'+this.a+'" ('+B.b.S(this.d,", ")+")"}}
A.cz.prototype={
hw(a){var s=this.a
if(!J.a0(s,a.ga2()))throw A.d(A.as('Source URLs "'+A.u(s)+'" and "'+A.u(a.ga2())+"\" don't match.",null))
return Math.abs(this.b-a.gan())},
a3(a,b){var s
t.wo.a(b)
s=this.a
if(!J.a0(s,b.ga2()))throw A.d(A.as('Source URLs "'+A.u(s)+'" and "'+A.u(b.ga2())+"\" don't match.",null))
return this.b-b.gan()},
L(a,b){if(b==null)return!1
return t.wo.b(b)&&J.a0(this.a,b.ga2())&&this.b===b.gan()},
gE(a){var s=this.a
s=s==null?null:s.gE(s)
if(s==null)s=0
return s+this.b},
l(a){var s=this,r=A.o1(s).l(0),q=s.a
return"<"+r+": "+s.b+" "+(A.u(q==null?"unknown source":q)+":"+(s.c+1)+":"+(s.d+1))+">"},
$iaK:1,
ga2(){return this.a},
gan(){return this.b},
gab(){return this.c},
gal(){return this.d}}
A.mp.prototype={
hw(a){if(!J.a0(this.a.a,a.ga2()))throw A.d(A.as('Source URLs "'+A.u(this.ga2())+'" and "'+A.u(a.ga2())+"\" don't match.",null))
return Math.abs(this.b-a.gan())},
a3(a,b){t.wo.a(b)
if(!J.a0(this.a.a,b.ga2()))throw A.d(A.as('Source URLs "'+A.u(this.ga2())+'" and "'+A.u(b.ga2())+"\" don't match.",null))
return this.b-b.gan()},
L(a,b){if(b==null)return!1
return t.wo.b(b)&&J.a0(this.a.a,b.ga2())&&this.b===b.gan()},
gE(a){var s=this.a.a
s=s==null?null:s.gE(s)
if(s==null)s=0
return s+this.b},
l(a){var s=A.o1(this).l(0),r=this.b,q=this.a,p=q.a
return"<"+s+": "+r+" "+(A.u(p==null?"unknown source":p)+":"+(q.df(r)+1)+":"+(q.fD(r)+1))+">"},
$iaK:1,
$icz:1}
A.mq.prototype={
lr(a,b,c){var s,r=this.b,q=this.a
if(!J.a0(r.ga2(),q.ga2()))throw A.d(A.as('Source URLs "'+A.u(q.ga2())+'" and  "'+A.u(r.ga2())+"\" don't match.",null))
else if(r.gan()<q.gan())throw A.d(A.as("End "+r.l(0)+" must come after start "+q.l(0)+".",null))
else{s=this.c
if(s.length!==q.hw(r))throw A.d(A.as('Text "'+s+'" must be '+q.hw(r)+" characters long.",null))}},
gP(){return this.a},
gO(){return this.b},
ga1(){return this.c}}
A.mr.prototype={
ghO(){return this.a},
l(a){var s,r,q,p=this.b,o="line "+(p.gP().gab()+1)+", column "+(p.gP().gal()+1)
if(p.ga2()!=null){s=p.ga2()
r=$.b3()
s.toString
s=o+(" of "+r.ko(s))
o=s}o+=": "+this.a
q=p.q4(null)
p=q.length!==0?o+"\n"+q:o
return"Error on "+(p.charCodeAt(0)==0?p:p)},
$iaf:1}
A.hs.prototype={
gan(){var s=this.b
s=A.xE(s.a,s.b)
return s.b},
$ibG:1,
geg(){return this.c}}
A.ht.prototype={
ga2(){return this.gP().ga2()},
gn(a){return this.gO().gan()-this.gP().gan()},
a3(a,b){var s
t.gL.a(b)
s=this.gP().a3(0,b.gP())
return s===0?this.gO().a3(0,b.gO()):s},
q4(a){var s=this
if(!t.ER.b(s)&&s.gn(s)===0)return""
return A.Du(s,a).q3()},
L(a,b){if(b==null)return!1
return b instanceof A.ht&&this.gP().L(0,b.gP())&&this.gO().L(0,b.gO())},
gE(a){return A.bo(this.gP(),this.gO(),B.f,B.f,B.f,B.f,B.f)},
l(a){var s=this
return"<"+A.o1(s).l(0)+": from "+s.gP().l(0)+" to "+s.gO().l(0)+' "'+s.ga1()+'">'},
$iaK:1,
$icS:1}
A.dc.prototype={
gaU(){return this.d}}
A.iA.prototype={
lk(a,b,c,d){var s=this,r=s.$ti,q=r.h("hI<1>").a(new A.hI(a,s,new A.W(new A.v($.E,t.D),t.h),b,d.h("hI<0>")))
s.a!==$&&A.ax("_sink")
s.a=q
if(c.a.gbY()){q=c.a
c.a=A.l(q).H(d).h("br<aa.T,1>").a(new A.j7(d.h("@<0>").H(d).h("j7<1,2>"))).cW(q)}r=r.h("eU<1>").a(A.ci(null,new A.q9(c,s,d),!0,d))
s.b!==$&&A.ax("_streamController")
s.b=r},
j2(){var s,r
this.d=!0
s=this.c
if(s!=null)s.U()
r=this.b
r===$&&A.w("_streamController")
r.p()}}
A.q9.prototype={
$0(){var s,r,q=this.b
if(q.d)return
s=this.a.a
r=q.b
r===$&&A.w("_streamController")
q.c=s.bv(this.c.h("~(0)").a(r.gbh(r)),new A.q8(q),r.gjN())},
$S:0}
A.q8.prototype={
$0(){var s=this.a,r=s.a
r===$&&A.w("_sink")
r.j3()
s=s.b
s===$&&A.w("_streamController")
s.p()},
$S:0}
A.hI.prototype={
j(a,b){var s,r=this
r.$ti.c.a(b)
if(r.e)throw A.d(A.aC("Cannot add event after closing."))
if(r.d)return
s=r.a
s.a.j(0,s.$ti.c.a(b))},
aJ(a,b){if(this.e)throw A.d(A.aC("Cannot add event after closing."))
if(this.d)return
this.lz(a,b)},
f2(a){return this.aJ(a,null)},
lz(a,b){var s=this
if(s.w){s.a.a.aJ(a,b)
return}s.c.cg(a,b)
s.j3()
s.b.j2()
s.a.a.p().bF(new A.vG())},
p(){var s=this
if(s.e)return s.c.a
s.e=!0
if(!s.d){s.b.j2()
s.c.V(s.a.a.p())}return s.c.a},
j3(){this.d=!0
var s=this.c
if((s.a.a&30)===0)s.bt()
return},
$iaY:1,
$ick:1,
$ia3:1}
A.vG.prototype={
$1(a){},
$S:13}
A.mt.prototype={}
A.ja.prototype={$ixT:1}
A.mv.prototype={
geg(){return A.r(this.c)}}
A.tZ.prototype={
ghN(){var s=this
if(s.c!==s.e)s.d=null
return s.d},
fE(a){var s,r=this,q=r.d=J.Cg(a,r.b,r.c)
r.e=r.c
s=q!=null
if(s)r.e=r.c=q.gO()
return s},
k6(a,b){var s
if(this.fE(a))return
if(b==null)if(a instanceof A.dC)b="/"+a.a+"/"
else{s=J.b9(a)
s=A.ad(s,"\\","\\\\")
b='"'+A.ad(s,'"','\\"')+'"'}this.iI(b)},
dU(a){return this.k6(a,null)},
pX(){if(this.c===this.b.length)return
this.iI("no more input")},
pT(a,b,c){var s,r,q,p,o,n=this.b
if(c<0)A.K(A.b7("position must be greater than or equal to 0."))
else if(c>n.length)A.K(A.b7("position must be less than or equal to the string length."))
s=c+b>n.length
if(s)A.K(A.b7("position plus length must not go beyond the end of the string."))
s=this.a
r=A.e([0],t.t)
q=n.length
p=new A.tK(s,r,new Uint32Array(q))
p.lq(new A.cu(n),s)
o=c+b
if(o>q)A.K(A.b7("End "+o+u.D+p.gn(0)+"."))
else if(c<0)A.K(A.b7("Start may not be negative, was "+c+"."))
throw A.d(new A.mv(n,a,new A.hH(p,c,o)))},
iI(a){this.pT("expected "+a+".",0,this.c)}}
A.rZ.prototype={
kK(){var s=this.my()
if(s.length!==16)throw A.d(A.yT("The length of the Uint8list returned by the custom RNG must be 16."))
else return s}}
A.pt.prototype={
my(){var s,r,q,p,o=new Uint8Array(16)
for(s=0;s<16;s+=4){r=$.Bl().qn(B.p.kx(Math.pow(2,32)))
if(!(s<16))return A.b(o,s)
o[s]=r
q=s+1
p=B.c.aT(r,8)
if(!(q<16))return A.b(o,q)
o[q]=p
p=s+2
q=B.c.aT(r,16)
if(!(p<16))return A.b(o,p)
o[p]=q
q=s+3
p=B.c.aT(r,24)
if(!(q<16))return A.b(o,q)
o[q]=p}return o}}
A.uU.prototype={
bm(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=null
if(null==null)s=b
else s=b
if(s==null)s=$.BP().kK()
b=s.length
if(6>=b)return A.b(s,6)
r=s[6]
s.$flags&2&&A.ai(s)
s[6]=r&15|64
if(8>=b)return A.b(s,8)
s[8]=s[8]&63|128
if(b<16)A.K(A.b7("buffer too small: need 16: length="+b))
r=$.BO()
q=s[0]
if(!(q<256))return A.b(r,q)
q=r[q]
p=s[1]
if(!(p<256))return A.b(r,p)
p=r[p]
o=s[2]
if(!(o<256))return A.b(r,o)
o=r[o]
n=s[3]
if(!(n<256))return A.b(r,n)
n=r[n]
m=s[4]
if(!(m<256))return A.b(r,m)
m=r[m]
l=s[5]
if(!(l<256))return A.b(r,l)
l=r[l]
k=s[6]
if(!(k<256))return A.b(r,k)
k=r[k]
j=s[7]
if(!(j<256))return A.b(r,j)
j=r[j]
i=s[8]
if(!(i<256))return A.b(r,i)
i=r[i]
if(9>=b)return A.b(s,9)
h=s[9]
if(!(h<256))return A.b(r,h)
h=r[h]
if(10>=b)return A.b(s,10)
g=s[10]
if(!(g<256))return A.b(r,g)
g=r[g]
if(11>=b)return A.b(s,11)
f=s[11]
if(!(f<256))return A.b(r,f)
f=r[f]
if(12>=b)return A.b(s,12)
e=s[12]
if(!(e<256))return A.b(r,e)
e=r[e]
if(13>=b)return A.b(s,13)
d=s[13]
if(!(d<256))return A.b(r,d)
d=r[d]
if(14>=b)return A.b(s,14)
c=s[14]
if(!(c<256))return A.b(r,c)
c=r[c]
if(15>=b)return A.b(s,15)
b=s[15]
if(!(b<256))return A.b(r,b)
return q+p+o+n+"-"+m+l+"-"+k+j+"-"+i+h+"-"+g+f+e+d+c+r[b]}}
A.xD.prototype={}
A.fe.prototype={
gbY(){return!0},
au(a,b,c,d){var s=this.$ti
s.h("~(1)?").a(a)
t.Z.a(c)
return A.zL(this.a,this.b,a,!1,s.c)},
bv(a,b,c){return this.au(a,null,b,c)}}
A.ju.prototype={
U(){var s=this,r=A.xF(null,t.H)
if(s.b==null)return r
s.hi()
s.d=s.b=null
return r},
e3(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.d(A.aC("Subscription has been canceled."))
r.hi()
s=A.AM(new A.vq(a),t.m)
s=s==null?null:A.cW(s)
r.d=s
r.hh()},
d7(){if(this.b==null)return;++this.a
this.hi()},
cu(){var s=this
if(s.b==null||s.a<=0)return;--s.a
s.hh()},
hh(){var s=this,r=s.d
if(r!=null&&s.a<=0)s.b.addEventListener(s.c,r,!1)},
hi(){var s=this.d
if(s!=null)this.b.removeEventListener(this.c,s,!1)},
$ibw:1}
A.vp.prototype={
$1(a){return this.a.$1(A.j(a))},
$S:2}
A.vq.prototype={
$1(a){return this.a.$1(A.j(a))},
$S:2}
A.ed.prototype={
iz(a,b){var s=this.b
if((s.b&4)!==0)return
s.j(0,new A.fI(a,b))
s.p()},
ib(a){var s
if((this.b.b&4)!==0)throw A.d(A.xX())
s=A.B2(a)
s.toString
this.a.send(s)},
bs(a,b){var s=0,r=A.p(t.H),q=this,p
var $async$bs=A.q(function(c,d){if(c===1)return A.m(d,r)
for(;;)switch(s){case 0:p=q.b
if((p.b&4)!==0)throw A.d(A.xX())
p.p()
q.a.close()
return A.n(null,r)}})
return A.o($async$bs,r)},
$iv6:1}
A.oM.prototype={
$1(a){A.j(a)
this.a.V(this.b)},
$S:12}
A.oN.prototype={
$1(a){var s
A.j(a)
s=this.a
if((s.a.a&30)===0)s.a7(new A.hE("Failed to connect WebSocket"))
else this.b.iz(1006,"error")},
$S:12}
A.oO.prototype={
$1(a){var s,r,q=this.a.b
if((q.b&4)!==0)return
s=a.data
s.toString
r=A.vl("data")
if(typeof s==="string")r.b=new A.hy(A.r(s))
else if(typeof s==="object"&&A.DD(A.j(s),"ArrayBuffer"))r.b=new A.fE(A.z8(t.rV.a(s),0,null))
else throw A.d(A.aC("unexpected message type: "+J.xu(s).l(0)))
q.j(0,r.cb())},
$S:2}
A.oP.prototype={
$1(a){var s
A.j(a)
s=this.a
if((s.a.a&30)===0)s.V(this.b)
this.b.iz(A.a4(a.code),A.r(a.reason))},
$S:12}
A.dg.prototype={}
A.hy.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.hy&&b.a===this.a},
gE(a){return B.a.gE(this.a)}}
A.fE.prototype={
L(a,b){var s,r,q,p,o
if(b==null)return!1
if(b instanceof A.fE&&b.a.length===this.a.length){for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<r;++o){if(!(o<p))return A.b(q,o)
if(q[o]!==s[o])return!1}return!0}return!1},
gE(a){return A.dI(this.a)},
l(a){return"BinaryDataReceived("+A.u(this.a)+")"}}
A.fI.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.fI&&b.a===this.a&&b.b===this.b},
gE(a){return A.dI([this.a,this.b])},
l(a){return"CloseReceived("+this.a+", "+this.b+")"}}
A.hE.prototype={
l(a){var s=this.a
if(s.length===0)return"WebSocketException"
else return"WebSocketException: "+s},
$iaf:1}
A.hD.prototype={
l(a){var s=this.a
if(s.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+s}}
A.kd.prototype={
gih(){var s,r=this,q=r.w
if(q===$){s=r.r.b
s===$&&A.w("_foreign")
s=s.a
s===$&&A.w("_sink")
q=r.w=new A.nS(r,s)}return q},
li(a){a.cw(new A.od(this),new A.oe(this),t.c)},
$iFf:1}
A.od.prototype={
$1(a){var s,r
t.mN.a(a)
s=a.b
r=this.a
new A.ac(s,A.l(s).h("ac<1>")).aE(new A.oa(r))
s=r.r.a
s===$&&A.w("_local")
s=s.b
s===$&&A.w("_streamController")
new A.ac(s,A.l(s).h("ac<1>")).qg(new A.ob(a),new A.oc(r,a))
A.r(a.a.protocol)
r.f.bt()},
$S:158}
A.oa.prototype={
$1(a){var s,r,q,p="_local",o="_sink"
t.uy.a(a)
A:{s=a instanceof A.hy
r=s?a.a:null
if(s){s=this.a.r.a
s===$&&A.w(p)
s=s.a
s===$&&A.w(o)
s.j(0,r)
break A}s=a instanceof A.fE
q=s?a.a:null
if(s){s=this.a.r.a
s===$&&A.w(p)
s=s.a
s===$&&A.w(o)
s.j(0,q)
break A}if(a instanceof A.fI){s=this.a.r.a
s===$&&A.w(p)
s=s.a
s===$&&A.w(o)
s.p()}}},
$S:159}
A.ob.prototype={
$1(a){var s,r,q,p,o,n,m
try{A:{s=a
r=null
o=typeof s=="string"
if(o)r=s
if(o){o=this.a
n=A.r(r)
if((o.b.b&4)!==0)A.K(A.xX())
n=A.B2(n)
n.toString
o.a.send(n)
break A}q=null
o=t.p.b(s)
if(o)q=s
if(o){this.a.ib(q)
break A}p=null
o=t.L.b(s)
if(o)p=s
if(o){this.a.ib(new Uint8Array(A.c9(p)))
break A}o=A.aw("Cannot send "+J.xu(a).l(0))
throw A.d(o)}}catch(m){if(!(A.R(m) instanceof A.hD))throw m}},
$S:16}
A.oc.prototype={
$0(){var s=0,r=A.p(t.H),q=1,p=[],o=this,n,m,l
var $async$$0=A.q(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
n=o.a
s=6
return A.f(o.b.bs(n.d,n.e),$async$$0)
case 6:q=1
s=5
break
case 3:q=2
l=p.pop()
if(!(A.R(l) instanceof A.hD))throw l
s=5
break
case 2:s=1
break
case 5:return A.n(null,r)
case 1:return A.m(p.at(-1),r)}})
return A.o($async$$0,r)},
$S:3}
A.oe.prototype={
$1(a){var s,r,q
A.ap(a)
s=a instanceof A.hz?a:new A.mN(J.b9(a))
r=this.a
r.f.a7(s)
r=r.r.a
r===$&&A.w("_local")
q=r.a
q===$&&A.w("_sink")
q.f2(s)
r=r.a
r===$&&A.w("_sink")
r.p()},
$S:7}
A.nS.prototype={
bs(a,b){var s=this.b
s.d=a
s.e=b
return this.l5()},
p(){return this.bs(null,null)},
$iFg:1}
A.mN.prototype={
l(a){return"WebSocketChannelException: "+this.a},
$iaf:1};(function aliases(){var s=J.dF.prototype
s.lb=s.l
s=A.bS.prototype
s.l7=s.kc
s.l8=s.kd
s.la=s.kf
s.l9=s.ke
s=A.b_.prototype
s.eh=s.aC
s.lf=s.bL
s.im=s.aH
s=A.P.prototype
s.lc=s.bd
s=A.a7.prototype
s.il=s.cW
s=A.fp.prototype
s.lg=s.p
s=A.i.prototype
s.l6=s.fz
s=A.d_.prototype
s.l5=s.p
s=A.ih.prototype
s.l4=s.q_
s=A.ht.prototype
s.le=s.a3
s.ld=s.L})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._instance_1i,q=hunkHelpers._static_0,p=hunkHelpers._static_1,o=hunkHelpers._instance_0u,n=hunkHelpers.installInstanceTearOff,m=hunkHelpers._instance_2u,l=hunkHelpers._instance_1u,k=hunkHelpers.installStaticTearOff
s(J,"Gv","DF",57)
r(J.z.prototype,"gci","t",20)
r(A.dQ.prototype,"gbh","j",9)
q(A,"GL","Ep",15)
r(A.B.prototype,"gci","t",20)
r(A.Z.prototype,"gci","t",20)
p(A,"H7","Fk",22)
p(A,"H8","Fl",22)
p(A,"H9","Fm",22)
q(A,"AO","H1",0)
p(A,"Ha","GP",10)
s(A,"Hb","GR",11)
q(A,"yc","GQ",0)
var j
o(j=A.cU.prototype,"geD","bP",0)
o(j,"geE","bQ",0)
n(A.fb.prototype,"gpE",0,1,function(){return[null]},["$2","$1"],["cg","a7"],60,0,0)
m(A.v.prototype,"gel","lT",11)
r(j=A.fm.prototype,"gbh","j",16)
n(j,"gjN",0,1,function(){return[null]},["$2","$1"],["aJ","f2"],60,0,0)
o(j,"gdM","p",83)
o(j=A.di.prototype,"geD","bP",0)
o(j,"geE","bQ",0)
o(j=A.b_.prototype,"geD","bP",0)
o(j,"geE","bQ",0)
o(A.hG.prototype,"gj1","nD",0)
o(j=A.hN.prototype,"geD","bP",0)
o(j,"geE","bQ",0)
l(j,"gmF","mG",16)
m(j,"gmM","mN",11)
o(j,"gmJ","mK",0)
s(A,"Hf","Gj",46)
p(A,"Hg","Gk",40)
s(A,"He","DO",57)
p(A,"Il","Gl",32)
r(j=A.jp.prototype,"gbh","j",16)
o(j,"gdM","p",0)
p(A,"Io","II",40)
p(A,"nZ","ER",41)
s(A,"In","IH",46)
p(A,"Im","Fd",6)
n(A.T.prototype,"grp",0,0,null,["$1","$0"],["kC","rq"],165,0,0)
k(A,"IU",2,null,["$1$2","$2"],["B4",function(a,b){return A.B4(a,b,t.fY)}],164,1)
p(A,"Hh","CW",1)
p(A,"Ir","D1",8)
p(A,"IE","Gx",8)
p(A,"IW","DT",8)
p(A,"IY","DV",8)
p(A,"IX","DU",8)
p(A,"J2","GN",8)
p(A,"J1","GM",8)
s(A,"Jc","GV",17)
p(A,"IM","GE",1)
p(A,"Iv","D8",1)
p(A,"Iu","D7",1)
p(A,"It","D6",1)
p(A,"Hc","CC",6)
o(A.ke.prototype,"gqP","fq",0)
l(j=A.kE.prototype,"gnt","dA",163)
o(j,"gnv","j_",0)
o(j=A.lc.prototype,"gmu","mv",0)
l(j,"gmA","mB",4)
l(j,"gmq","mr",4)
s(A,"Iz","Do",166)
l(A.l4.prototype,"gn5","n6",79)
r(A.jB.prototype,"gbh","j",9)
l(j=A.lg.prototype,"gnM","nN",18)
l(j,"gnK","nL",18)
l(j,"gnA","j0",38)
l(A.ly.prototype,"gnp","nq",9)
l(A.cg.prototype,"go7","o8",93)
l(j=A.ji.prototype,"gkS","af",42)
o(j,"gmD","h0",0)
l(j=A.kC.prototype,"gmc","md",42)
o(j,"gnw","nx",0)
s(A,"HC","Dt",167)
s(A,"Hp","Cx",168)
s(A,"Ho","Cw",169)
s(A,"Hn","Cv",170)
s(A,"HS","E9",171)
s(A,"HT","Ea",172)
s(A,"HH","DY",173)
s(A,"HP","E6",174)
s(A,"HO","E5",175)
s(A,"I3","Em",176)
s(A,"I4","En",177)
s(A,"HQ","E7",178)
s(A,"HR","E8",179)
s(A,"I8","EC",180)
s(A,"I9","ED",181)
s(A,"Ia","EE",182)
s(A,"HW","Ed",183)
s(A,"HX","Ee",184)
s(A,"HY","Ef",185)
s(A,"Ht","CH",186)
s(A,"Hu","CI",187)
s(A,"Hr","CE",188)
s(A,"Hs","CF",189)
s(A,"Hq","CD",190)
s(A,"Hv","CJ",191)
s(A,"I5","Ev",192)
s(A,"I6","EA",193)
s(A,"HU","Eb",194)
s(A,"HV","Ec",195)
s(A,"I7","EB",196)
s(A,"Hy","Dc",197)
s(A,"HK","E0",198)
s(A,"HL","E1",199)
s(A,"Hz","Dd",200)
s(A,"Hw","Da",201)
s(A,"HI","DZ",202)
s(A,"HJ","E_",203)
s(A,"Hx","Db",204)
s(A,"Hj","Cl",205)
s(A,"HG","DX",206)
s(A,"HF","DW",207)
s(A,"Hk","Cm",208)
s(A,"Ib","EF",209)
s(A,"HZ","Eg",210)
s(A,"I_","Eh",211)
s(A,"Ic","EG",212)
s(A,"HA","De",213)
s(A,"HM","E3",214)
s(A,"HN","E4",215)
s(A,"HB","Df",216)
s(A,"Ih","F7",217)
s(A,"Ii","F8",218)
s(A,"Ij","F9",219)
s(A,"Id","F3",220)
s(A,"Ie","F4",221)
s(A,"If","F5",222)
s(A,"Ig","F6",223)
s(A,"I1","Ej",224)
s(A,"I2","Ek",225)
s(A,"I0","Ei",226)
s(A,"Hl","Ct",227)
s(A,"Hm","Cu",228)
s(A,"HD","Dz",229)
s(A,"HE","DA",230)
o(A.ib.prototype,"gnb","eA",3)
o(A.lQ.prototype,"gmH","mI",0)
o(A.kw.prototype,"gnr","ns",0)
o(A.lN.prototype,"ge7","ao",3)
o(A.j4.prototype,"ge7","ao",3)
o(A.mA.prototype,"gpF","pG",0)
q(A,"Jd","wF",231)
p(A,"Je","wG",21)
o(j=A.my.prototype,"gp6","p7",0)
o(j,"gm1","en",3)
o(j,"gnX","eG",3)
o(j=A.mz.prototype,"ghB","cm",0)
o(j,"gkO","dg",0)
o(j,"gkP","kQ",0)
m(j=A.jg.prototype,"gnI","nJ",14)
o(j,"gmY","mZ",0)
l(j,"gnG","nH",9)
m(j,"glS","fR",133)
l(j,"gnE","nF",134)
l(j,"gny","nz",38)
l(j,"gnB","dB",21)
l(j,"goj","eQ",135)
o(j,"gmV","mW",33)
l(j,"gom","eR",136)
l(j,"gpl","eX",4)
o(A.dh.prototype,"ghB","cm",0)
o(A.lD.prototype,"gdM","p",0)
l(j=A.iK.prototype,"gnn","no",45)
o(j,"giV","ez",3)
l(A.iS.prototype,"gob","jh",54)
l(A.iT.prototype,"gnl","iZ",55)
o(j=A.j3.prototype,"goP","cS",3)
o(j,"gp8","p9",0)
o(j,"goB","eT",3)
o(j,"goZ","cU",3)
l(A.j5.prototype,"goD","hf",54)
n(A.mB.prototype,"gkY",0,1,null,["$2$kind","$1"],["b0","kZ"],149,0,0)
k(A,"Jh",1,null,["$2$headers","$1"],["o_",function(a){return A.o_(a,null)}],154,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.x,null)
q(A.x,[A.xI,J.lh,A.j1,J.ea,A.dQ,A.i,A.ik,A.bD,A.a1,A.au,A.P,A.ta,A.aI,A.iM,A.f9,A.iy,A.jc,A.j8,A.iv,A.fa,A.aH,A.cT,A.u0,A.b1,A.fJ,A.dk,A.cR,A.uN,A.lP,A.iw,A.jR,A.r6,A.iI,A.aq,A.iH,A.dC,A.hJ,A.hF,A.hv,A.nB,A.vk,A.nN,A.cy,A.nf,A.nI,A.nF,A.jj,A.dm,A.aO,A.aa,A.b_,A.jn,A.hz,A.fb,A.cD,A.v,A.mY,A.jb,A.fm,A.nE,A.mZ,A.fn,A.dj,A.n9,A.cE,A.hG,A.nz,A.jt,A.k5,A.jx,A.nq,A.fh,A.nM,A.iL,A.fi,A.nO,A.cA,A.bE,A.a7,A.c_,A.jl,A.n_,A.io,A.fc,A.vP,A.nC,A.nQ,A.hS,A.bk,A.aX,A.vo,A.lU,A.j9,A.nd,A.bG,A.V,A.ab,A.nD,A.hu,A.ho,A.T,A.k1,A.uS,A.cm,A.lO,A.vM,A.d_,A.S,A.ow,A.ph,A.c0,A.oW,A.kJ,A.wb,A.ez,A.e9,A.ag,A.bi,A.jh,A.D,A.pm,A.kp,A.kL,A.kN,A.kP,A.kR,A.kT,A.kW,A.kY,A.l_,A.l5,A.l7,A.l9,A.lb,A.lE,A.lL,A.lV,A.m9,A.mm,A.mw,A.mL,A.mO,A.pM,A.po,A.iU,A.iV,A.pn,A.rX,A.aV,A.eH,A.aW,A.jK,A.jJ,A.aJ,A.jQ,A.jV,A.b0,A.n7,A.n6,A.dy,A.bK,A.vI,A.t9,A.mi,A.t8,A.a9,A.ek,A.kz,A.ih,A.oK,A.kD,A.fY,A.ke,A.of,A.kg,A.fy,A.og,A.ok,A.cn,A.kh,A.i8,A.iq,A.ba,A.cc,A.fC,A.bu,A.e8,A.ds,A.dr,A.kn,A.l6,A.lS,A.av,A.nw,A.n5,A.l2,A.d0,A.f1,A.f0,A.cd,A.kX,A.d9,A.cX,A.p0,A.kE,A.pj,A.qx,A.pw,A.pu,A.fx,A.fz,A.ma,A.mE,A.oh,A.l8,A.fW,A.vJ,A.jI,A.vn,A.lc,A.ni,A.et,A.bQ,A.bF,A.l4,A.uH,A.d2,A.hw,A.cM,A.aU,A.uL,A.qe,A.hn,A.pi,A.us,A.km,A.d8,A.aP,A.r4,A.du,A.t6,A.aF,A.a5,A.mb,A.jB,A.md,A.dO,A.mS,A.mQ,A.hr,A.eT,A.lg,A.ly,A.hp,A.r8,A.r9,A.c8,A.cg,A.is,A.hq,A.nP,A.m6,A.iZ,A.aB,A.rp,A.aZ,A.rM,A.bz,A.lM,A.lR,A.m7,A.mj,A.mC,A.ji,A.kB,A.nt,A.kC,A.F,A.cL,A.pX,A.d7,A.dH,A.u1,A.ib,A.oD,A.bb,A.aQ,A.lQ,A.dJ,A.t4,A.ov,A.b4,A.ct,A.kw,A.lN,A.e2,A.iY,A.j4,A.uk,A.mA,A.lB,A.ro,A.tz,A.kI,A.my,A.lT,A.pF,A.mz,A.jg,A.dh,A.lD,A.iK,A.iS,A.iT,A.j3,A.j5,A.mB,A.kO,A.hK,A.hL,A.u_,A.lW,A.iX,A.tK,A.mp,A.ht,A.qa,A.b8,A.c7,A.cz,A.mr,A.ja,A.hI,A.mt,A.tZ,A.rZ,A.uU,A.xD,A.ju,A.ed,A.dg,A.hE,A.mN])
q(J.lh,[J.lj,J.iC,J.iD,J.fT,J.fU,J.fS,J.dB])
q(J.iD,[J.dF,J.z,A.dG,A.iP])
q(J.dF,[J.lZ,J.f7,J.d3])
r(J.li,A.j1)
r(J.r0,J.z)
q(J.fS,[J.iB,J.lk])
q(A.i,[A.dR,A.J,A.bI,A.ae,A.ix,A.eX,A.db,A.bL,A.jz,A.mV,A.nA,A.dV,A.ch])
q(A.dR,[A.ee,A.k6])
r(A.jr,A.ee)
r(A.jq,A.k6)
q(A.bD,[A.kG,A.oY,A.kF,A.lf,A.mx,A.wP,A.wR,A.vd,A.vc,A.wc,A.q0,A.q_,A.vA,A.vE,A.tR,A.tP,A.tV,A.tT,A.tW,A.tN,A.w_,A.vR,A.rc,A.ps,A.pO,A.pA,A.pB,A.wX,A.x0,A.x1,A.tJ,A.oS,A.oU,A.ox,A.oy,A.pl,A.rQ,A.rP,A.py,A.pI,A.pT,A.wo,A.wq,A.rl,A.rn,A.rm,A.u2,A.wr,A.ws,A.xo,A.xp,A.xq,A.wy,A.wS,A.wT,A.vX,A.w3,A.vm,A.tF,A.px,A.pD,A.pC,A.tA,A.tB,A.tC,A.tD,A.tE,A.oJ,A.oQ,A.rh,A.wK,A.on,A.oo,A.op,A.ol,A.oA,A.oB,A.oC,A.q2,A.q3,A.q4,A.oq,A.or,A.os,A.p3,A.p5,A.p6,A.p7,A.wv,A.rU,A.rW,A.rV,A.oi,A.oj,A.qS,A.qT,A.qU,A.qV,A.qM,A.qI,A.qK,A.qR,A.qN,A.qO,A.qB,A.qy,A.qz,A.qA,A.qC,A.qD,A.vK,A.pS,A.pP,A.pQ,A.uz,A.uB,A.uC,A.uD,A.ut,A.uv,A.uw,A.ux,A.t0,A.t1,A.qZ,A.r5,A.vL,A.vS,A.w4,A.x7,A.wM,A.v8,A.v9,A.p_,A.rz,A.rq,A.pE,A.wk,A.ry,A.pL,A.wl,A.uM,A.wm,A.r2,A.oF,A.oG,A.oH,A.wB,A.wC,A.wu,A.t5,A.uI,A.x4,A.x5,A.pk,A.uV,A.uj,A.u7,A.u8,A.u9,A.ub,A.ud,A.ue,A.u5,A.pG,A.uF,A.uo,A.up,A.ur,A.ul,A.v1,A.v3,A.v4,A.v5,A.uY,A.v_,A.v0,A.va,A.vb,A.rj,A.rk,A.rx,A.rt,A.rr,A.rA,A.tm,A.ti,A.tc,A.td,A.tl,A.ty,A.tr,A.x9,A.xa,A.xb,A.xd,A.xe,A.xf,A.xg,A.xh,A.xi,A.xj,A.xk,A.wD,A.wU,A.x2,A.pq,A.pr,A.ww,A.qc,A.qb,A.qd,A.qg,A.qi,A.qf,A.qw,A.vG,A.vp,A.vq,A.oM,A.oN,A.oO,A.oP,A.od,A.oa,A.ob,A.oe])
q(A.kG,[A.vj,A.oZ,A.pp,A.r1,A.wQ,A.wd,A.wx,A.q1,A.pZ,A.vB,A.vF,A.we,A.r7,A.re,A.pN,A.vQ,A.uT,A.oR,A.oT,A.oV,A.pK,A.pU,A.u3,A.q6,A.tG,A.t7,A.oI,A.ri,A.qF,A.qG,A.qH,A.qJ,A.qL,A.ra,A.vU,A.vV,A.vW,A.x8,A.r3,A.un,A.wI,A.tb,A.tq,A.qh])
r(A.il,A.jq)
q(A.a1,[A.ef,A.bS,A.jv,A.nm])
q(A.au,[A.dE,A.dd,A.ll,A.mG,A.mh,A.nb,A.iF,A.ku,A.cs,A.je,A.mF,A.bX,A.kM])
r(A.hA,A.P)
r(A.cu,A.hA)
q(A.kF,[A.wZ,A.rR,A.ve,A.vf,A.w2,A.pY,A.vr,A.vw,A.vv,A.vt,A.vs,A.vz,A.vy,A.vx,A.vC,A.vD,A.tQ,A.tO,A.tU,A.tS,A.tX,A.tM,A.w1,A.w0,A.vi,A.vh,A.vT,A.wf,A.wg,A.vZ,A.wt,A.w9,A.w8,A.tI,A.pJ,A.wp,A.rY,A.rg,A.oz,A.ot,A.ou,A.p1,A.pa,A.pf,A.pb,A.p8,A.pg,A.pe,A.p4,A.p9,A.pd,A.pc,A.p2,A.qE,A.qQ,A.qP,A.pR,A.uE,A.uA,A.uy,A.uu,A.t2,A.x6,A.oE,A.wA,A.rG,A.rE,A.rH,A.rF,A.rJ,A.rD,A.rI,A.rK,A.uJ,A.ui,A.ug,A.uh,A.u6,A.uf,A.ua,A.uc,A.u4,A.pH,A.uG,A.uq,A.um,A.v2,A.uW,A.uZ,A.uX,A.x_,A.rb,A.rv,A.rw,A.rs,A.ru,A.tn,A.tf,A.te,A.tg,A.th,A.tk,A.tj,A.tw,A.tx,A.ts,A.tt,A.tu,A.tv,A.to,A.tp,A.xl,A.xn,A.xm,A.xc,A.uK,A.qv,A.qj,A.qq,A.qr,A.qs,A.qt,A.qo,A.qp,A.qk,A.ql,A.qm,A.qn,A.qu,A.vH,A.q9,A.q8,A.oc])
q(A.J,[A.Q,A.ev,A.d5,A.c2,A.d4,A.jw])
q(A.Q,[A.eW,A.a2,A.j0,A.iJ,A.nn])
r(A.eu,A.bI)
r(A.iu,A.eX)
r(A.fM,A.db)
q(A.b1,[A.cl,A.fk,A.fl])
q(A.cl,[A.aD,A.jL,A.dS,A.dT,A.hM,A.bA,A.dU])
q(A.fk,[A.jM,A.jN])
q(A.fl,[A.dl,A.jO])
q(A.fJ,[A.X,A.iz])
q(A.cR,[A.fK,A.jP,A.k0])
q(A.fK,[A.B,A.Z])
r(A.fQ,A.lf)
r(A.iW,A.dd)
q(A.mx,[A.ms,A.fF])
q(A.bS,[A.iE,A.ex,A.jC])
r(A.fZ,A.dG)
q(A.iP,[A.iN,A.bn])
q(A.bn,[A.jD,A.jF])
r(A.jE,A.jD)
r(A.iO,A.jE)
r(A.jG,A.jF)
r(A.c3,A.jG)
q(A.iO,[A.lF,A.lG])
q(A.c3,[A.lH,A.lI,A.lJ,A.lK,A.iQ,A.iR,A.eA])
r(A.hQ,A.nb)
q(A.aa,[A.hO,A.eV,A.js,A.jm,A.fe])
r(A.ac,A.hO)
r(A.aA,A.ac)
q(A.b_,[A.di,A.hN])
r(A.cU,A.di)
r(A.jk,A.jn)
q(A.fb,[A.W,A.jU])
q(A.fm,[A.dP,A.hP])
q(A.dj,[A.cC,A.fd])
r(A.nv,A.k5)
r(A.jy,A.jv)
r(A.fg,A.jP)
r(A.k_,A.iL)
r(A.f8,A.k_)
r(A.jd,A.k0)
q(A.cA,[A.fp,A.nL,A.n0,A.fo])
r(A.nk,A.fp)
q(A.bE,[A.dz,A.ig,A.lm])
q(A.dz,[A.kr,A.lu,A.mJ])
q(A.a7,[A.nK,A.nJ,A.ky,A.kx,A.lp,A.lo,A.mK,A.jf])
q(A.nK,[A.kt,A.lw])
q(A.nJ,[A.ks,A.lv])
q(A.c_,[A.nc,A.ny,A.n1,A.jo,A.jp,A.jA,A.k4])
r(A.n2,A.jl)
r(A.mX,A.n1)
r(A.ln,A.iF)
r(A.nl,A.io)
r(A.vO,A.vP)
r(A.np,A.jA)
q(A.jb,[A.lz,A.j7])
r(A.nU,A.nQ)
r(A.nR,A.nU)
q(A.cs,[A.hl,A.ld])
r(A.n8,A.k1)
q(A.vo,[A.im,A.cx,A.bj,A.bm,A.ej,A.cJ,A.kV,A.cF,A.be,A.cB,A.bV,A.em,A.ip,A.e5,A.dx,A.cf,A.kf,A.ia,A.fA,A.fB,A.bH,A.fO,A.fN,A.aM,A.b6,A.jH,A.j6,A.eN,A.dL,A.la,A.ir,A.ic,A.fX,A.fD,A.bY,A.hm,A.bP,A.by])
q(A.c0,[A.bc,A.cQ,A.bO,A.el,A.bv,A.cK,A.bR])
q(A.e9,[A.l1,A.m3,A.dM,A.cI])
q(A.pn,[A.q5,A.rO,A.tH,A.v7])
q(A.tH,[A.oL,A.rN])
q(A.dy,[A.m_,A.lx,A.mg,A.ml])
q(A.bK,[A.kA,A.kK,A.kQ,A.kU,A.kZ,A.lt,A.lX,A.m8,A.mc,A.mk])
r(A.fG,A.eV)
r(A.me,A.ih)
q(A.oK,[A.mf,A.mu])
r(A.ij,A.S)
r(A.kl,A.kh)
r(A.fP,A.kz)
q(A.av,[A.ki,A.ng,A.nj,A.nT,A.ns,A.mW,A.nh,A.nr,A.n3,A.nx,A.no,A.nu,A.nH,A.nG,A.na,A.ne,A.n4,A.kk,A.mM])
q(A.d2,[A.kS,A.lq,A.lC,A.lY,A.mU])
q(A.hq,[A.m0,A.m2,A.kH])
q(A.F,[A.dA,A.dt,A.ec,A.eb,A.ha,A.hb,A.h1,A.h8,A.h9,A.eJ,A.eK,A.eB,A.eC,A.eO,A.eP,A.eQ,A.he,A.hf,A.hg,A.eh,A.ei,A.fH,A.eg,A.dv,A.dw,A.hk,A.eL,A.hc,A.hd,A.eM,A.eq,A.h4,A.h5,A.er,A.eo,A.h2,A.h3,A.ep,A.e3,A.h_,A.h0,A.e4,A.eR,A.hh,A.hi,A.eS,A.fL,A.h6,A.h7,A.es,A.f4,A.f5,A.f6,A.eZ,A.f_,A.f2,A.f3,A.eD,A.eF,A.eE,A.e6,A.e7,A.ew,A.cv])
q(A.d7,[A.aL,A.en])
q(A.dH,[A.cw,A.ie,A.j2,A.mD,A.dN])
r(A.mT,A.km)
r(A.fR,A.u_)
q(A.fR,[A.m1,A.mI,A.mP])
r(A.l3,A.mp)
q(A.ht,[A.hH,A.mq])
r(A.hs,A.mr)
r(A.dc,A.mq)
q(A.ja,[A.iA,A.kd])
r(A.mv,A.hs)
r(A.pt,A.rZ)
q(A.dg,[A.hy,A.fE,A.fI])
r(A.hD,A.hE)
r(A.nS,A.d_)
s(A.hA,A.cT)
s(A.k6,A.P)
s(A.jD,A.P)
s(A.jE,A.aH)
s(A.jF,A.P)
s(A.jG,A.aH)
s(A.dP,A.mZ)
s(A.hP,A.nE)
s(A.k_,A.nM)
s(A.k0,A.nO)
s(A.nU,A.cA)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{c:"int",a_:"double",bB:"num",a:"String",y:"bool",ab:"Null",k:"List",x:"Object",h:"Map",aj:"JSObject"},mangledNames:{},types:["~()","y(a)","~(aj)","H<~>()","~(a)","ab()","a(a)","ab(x)","y(k<a>)","~(k<c>)","~(@)","~(x,bW)","ab(aj)","ab(@)","~(c,c)","c()","~(x?)","~(k<a>,ez)","~(df)","y(et)","y(x?)","H<~>(a)","~(~())","c(c,c)","ab(c)","a(V<a,a>)","y(b8)","a(dO)","c(a?)","bu(a)","a(a9)","ab(x,bW)","@(@)","a()","a(cP)","~(x?,x?)","~(x)","y(ba)","~(c)","a(ba)","c(x?)","a(c)","~(d7)","h<a,@>(aB)","h<a,@>(cL)","~(ct)","y(x?,x?)","@()","H<cg>()","~(a,a)","~(a?)","~(y)","by()","a?()","~(b4<k<aB>>)","~(b4<k<aZ>>)","H<a>()","c(@,@)","~(~)","y()","~(x[bW?])","a(aW)","0&()","0&(a,c?)","k<~>(@)","x?(x?)","ab(a)","y(bc)","a(bc)","H<k<bQ>>(a)","H<~>(k<c>)","bH?(a)","ab(~())","~(a,a5)","~(k<+(a,a)>)","ab(~)","ab(@,bW)","c(@)","y(a?)","y(bQ)","~(bF)","y(bF)","y(bF?)","H<@>()","~(a,c)","~(@,@)","c(av,av)","a(aJ)","a(b0)","y(bz)","c8()","~(c8,a,c)","c(c8,c8)","~(F)","y(a9)","bV(bV,a9)","h<a,@>(aZ)","~(a,bV,a,c)","cL(h<@,@>)","c(a9,a9)","aB(h<@,@>)","h<a,@>(bz)","bz(h<@,@>)","V<a,a>(@,@)","a(@)","~(dJ)","y(a,a)","~(bY)","c(a)","~(hm)","fY()","H<k<aZ>>()","H<cd>()","H<k<aB>>()","H<d0>()","H<d9>()","H<cX>()","~(c,@)","@(a)","y(bY)","bY()","~(e5)","y(ds)","H<~>(aa<k<c>>)","y(~)","y(bP)","bP()","y(by)","~(cf)","ab(z<x?>,aj)","~(by)","ab(a_)","~(a_)","H<k<a>>(a,y)","~(hr)","H<~>(H<~>(aa<k<c>>))","H<hp>(a)","fc<@,@>(aY<@>)","H<a>(a)","~(~()?)","T(T,a)","a(T)","dh(aj)","H<cg>(c,c)","H<k<a>>(a,y,a?)","aZ?()","y(aB)","c(aB,aB)","ab(cd?)","~(a{kind:a})","a(a?)","c(c7)","H<y>(a)","x(c7)","H<rC>(hB{headers:h<a,a>?})","c(b8,b8)","k<c7>(V<x,k<b8>>)","dc()","ab(v6)","~(dg)","H<dx>(a)","H<cf>(fy)","@(@,a)","H<~>(F)","0^(0^,0^)<bB>","~([x?])","c(bQ,bQ)","dA(c?,h<a,@>)","dt(c?,h<a,@>)","ec(c?,h<a,@>)","eb(c?,h<a,@>)","ha(c?,h<a,@>)","hb(c?,h<a,@>)","h1(c?,h<a,@>)","h8(c?,h<a,@>)","h9(c?,h<a,@>)","eJ(c?,h<a,@>)","eK(c?,h<a,@>)","eB(c?,h<a,@>)","eC(c?,h<a,@>)","eO(c?,h<a,@>)","eP(c?,h<a,@>)","eQ(c?,h<a,@>)","he(c?,h<a,@>)","hf(c?,h<a,@>)","hg(c?,h<a,@>)","eh(c?,h<a,@>)","ei(c?,h<a,@>)","fH(c?,h<a,@>)","eg(c?,h<a,@>)","dv(c?,h<a,@>)","dw(c?,h<a,@>)","hk(c?,h<a,@>)","eL(c?,h<a,@>)","hc(c?,h<a,@>)","hd(c?,h<a,@>)","eM(c?,h<a,@>)","eq(c?,h<a,@>)","h4(c?,h<a,@>)","h5(c?,h<a,@>)","er(c?,h<a,@>)","eo(c?,h<a,@>)","h2(c?,h<a,@>)","h3(c?,h<a,@>)","ep(c?,h<a,@>)","e3(c?,h<a,@>)","h_(c?,h<a,@>)","h0(c?,h<a,@>)","e4(c?,h<a,@>)","eR(c?,h<a,@>)","hh(c?,h<a,@>)","hi(c?,h<a,@>)","eS(c?,h<a,@>)","fL(c?,h<a,@>)","h6(c?,h<a,@>)","h7(c?,h<a,@>)","es(c?,h<a,@>)","f4(c?,h<a,@>)","f5(c?,h<a,@>)","f6(c?,h<a,@>)","eZ(c?,h<a,@>)","f_(c?,h<a,@>)","f2(c?,h<a,@>)","f3(c?,h<a,@>)","eD(c?,h<a,@>)","eF(c?,h<a,@>)","eE(c?,h<a,@>)","e6(c?,h<a,@>)","e7(c?,h<a,@>)","ew(c?,h<a,@>)","cv(c?,h<a,@>)","H<a?>()","x(b8)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.aD&&a.b(c.a)&&b.b(c.b),"2;box,root":(a,b)=>c=>c instanceof A.jL&&a.b(c.a)&&b.b(c.b),"2;carry,end":(a,b)=>c=>c instanceof A.dS&&a.b(c.a)&&b.b(c.b),"2;cols,rows":(a,b)=>c=>c instanceof A.dT&&a.b(c.a)&&b.b(c.b),"2;config,httpClient":(a,b)=>c=>c instanceof A.hM&&a.b(c.a)&&b.b(c.b),"2;label,value":(a,b)=>c=>c instanceof A.bA&&a.b(c.a)&&b.b(c.b),"2;x,y":(a,b)=>c=>c instanceof A.dU&&a.b(c.a)&&b.b(c.b),"3;completer,nodeId,targetPort":(a,b,c)=>d=>d instanceof A.jM&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"3;hub,principal,token":(a,b,c)=>d=>d instanceof A.jN&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;":a=>b=>b instanceof A.dl&&A.B5(a,b.a),"4;isDir,isLink,path,size":a=>b=>b instanceof A.jO&&A.B5(a,b.a)}}
A.FV(v.typeUniverse,JSON.parse('{"lZ":"dF","f7":"dF","d3":"dF","Jz":"dG","z":{"k":["1"],"J":["1"],"aj":[],"i":["1"],"bl":["1"]},"lj":{"y":[],"ao":[]},"iC":{"ab":[],"ao":[]},"iD":{"aj":[]},"dF":{"aj":[]},"li":{"j1":[]},"r0":{"z":["1"],"k":["1"],"J":["1"],"aj":[],"i":["1"],"bl":["1"]},"ea":{"a8":["1"]},"fS":{"a_":[],"bB":[],"aK":["bB"]},"iB":{"a_":[],"c":[],"bB":[],"aK":["bB"],"ao":[]},"lk":{"a_":[],"bB":[],"aK":["bB"],"ao":[]},"dB":{"a":[],"aK":["a"],"rL":[],"bl":["@"],"ao":[]},"dQ":{"CB":[]},"dR":{"i":["2"]},"ik":{"a8":["2"]},"ee":{"dR":["1","2"],"i":["2"],"i.E":"2"},"jr":{"ee":["1","2"],"dR":["1","2"],"J":["2"],"i":["2"],"i.E":"2"},"jq":{"P":["2"],"k":["2"],"dR":["1","2"],"J":["2"],"i":["2"]},"il":{"jq":["1","2"],"P":["2"],"k":["2"],"dR":["1","2"],"J":["2"],"i":["2"],"P.E":"2","i.E":"2"},"ef":{"a1":["3","4"],"h":["3","4"],"a1.K":"3","a1.V":"4"},"dE":{"au":[]},"cu":{"P":["c"],"cT":["c"],"k":["c"],"J":["c"],"i":["c"],"P.E":"c","cT.E":"c"},"J":{"i":["1"]},"Q":{"J":["1"],"i":["1"]},"eW":{"Q":["1"],"J":["1"],"i":["1"],"Q.E":"1","i.E":"1"},"aI":{"a8":["1"]},"bI":{"i":["2"],"i.E":"2"},"eu":{"bI":["1","2"],"J":["2"],"i":["2"],"i.E":"2"},"iM":{"a8":["2"]},"a2":{"Q":["2"],"J":["2"],"i":["2"],"Q.E":"2","i.E":"2"},"ae":{"i":["1"],"i.E":"1"},"f9":{"a8":["1"]},"ix":{"i":["2"],"i.E":"2"},"iy":{"a8":["2"]},"eX":{"i":["1"],"i.E":"1"},"iu":{"eX":["1"],"J":["1"],"i":["1"],"i.E":"1"},"jc":{"a8":["1"]},"db":{"i":["1"],"i.E":"1"},"fM":{"db":["1"],"J":["1"],"i":["1"],"i.E":"1"},"j8":{"a8":["1"]},"ev":{"J":["1"],"i":["1"],"i.E":"1"},"iv":{"a8":["1"]},"bL":{"i":["1"],"i.E":"1"},"fa":{"a8":["1"]},"hA":{"P":["1"],"cT":["1"],"k":["1"],"J":["1"],"i":["1"]},"j0":{"Q":["1"],"J":["1"],"i":["1"],"Q.E":"1","i.E":"1"},"aD":{"cl":[],"b1":[]},"jL":{"cl":[],"b1":[]},"dS":{"cl":[],"b1":[]},"dT":{"cl":[],"b1":[]},"hM":{"cl":[],"b1":[]},"bA":{"cl":[],"b1":[]},"dU":{"cl":[],"b1":[]},"jM":{"fk":[],"b1":[]},"jN":{"fk":[],"b1":[]},"dl":{"fl":[],"b1":[]},"jO":{"fl":[],"b1":[]},"fJ":{"h":["1","2"]},"X":{"fJ":["1","2"],"h":["1","2"]},"jz":{"i":["1"],"i.E":"1"},"dk":{"a8":["1"]},"iz":{"fJ":["1","2"],"h":["1","2"]},"fK":{"cR":["1"],"da":["1"],"J":["1"],"i":["1"]},"B":{"fK":["1"],"cR":["1"],"da":["1"],"J":["1"],"i":["1"]},"Z":{"fK":["1"],"cR":["1"],"da":["1"],"J":["1"],"i":["1"]},"lf":{"bD":[],"d1":[]},"fQ":{"bD":[],"d1":[]},"iW":{"dd":[],"au":[]},"ll":{"au":[]},"mG":{"au":[]},"lP":{"af":[]},"jR":{"bW":[]},"bD":{"d1":[]},"kF":{"bD":[],"d1":[]},"kG":{"bD":[],"d1":[]},"mx":{"bD":[],"d1":[]},"ms":{"bD":[],"d1":[]},"fF":{"bD":[],"d1":[]},"mh":{"au":[]},"bS":{"a1":["1","2"],"lA":["1","2"],"h":["1","2"],"a1.K":"1","a1.V":"2"},"d5":{"J":["1"],"i":["1"],"i.E":"1"},"iI":{"a8":["1"]},"c2":{"J":["1"],"i":["1"],"i.E":"1"},"aq":{"a8":["1"]},"d4":{"J":["V<1,2>"],"i":["V<1,2>"],"i.E":"V<1,2>"},"iH":{"a8":["V<1,2>"]},"iE":{"bS":["1","2"],"a1":["1","2"],"lA":["1","2"],"h":["1","2"],"a1.K":"1","a1.V":"2"},"ex":{"bS":["1","2"],"a1":["1","2"],"lA":["1","2"],"h":["1","2"],"a1.K":"1","a1.V":"2"},"cl":{"b1":[]},"fk":{"b1":[]},"fl":{"b1":[]},"dC":{"Ex":[],"rL":[]},"hJ":{"j_":[],"cP":[]},"mV":{"i":["j_"],"i.E":"j_"},"hF":{"a8":["j_"]},"hv":{"cP":[]},"nA":{"i":["cP"],"i.E":"cP"},"nB":{"a8":["cP"]},"dG":{"aj":[],"ii":[],"ao":[]},"fZ":{"dG":[],"aj":[],"ii":[],"ao":[]},"iP":{"aj":[]},"nN":{"ii":[]},"iN":{"xC":[],"aj":[],"ao":[]},"bn":{"c1":["1"],"aj":[],"bl":["1"]},"iO":{"P":["a_"],"bn":["a_"],"k":["a_"],"c1":["a_"],"J":["a_"],"aj":[],"bl":["a_"],"i":["a_"],"aH":["a_"]},"c3":{"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"]},"lF":{"pV":[],"P":["a_"],"bn":["a_"],"k":["a_"],"c1":["a_"],"J":["a_"],"aj":[],"bl":["a_"],"i":["a_"],"aH":["a_"],"ao":[],"P.E":"a_","aH.E":"a_"},"lG":{"pW":[],"P":["a_"],"bn":["a_"],"k":["a_"],"c1":["a_"],"J":["a_"],"aj":[],"bl":["a_"],"i":["a_"],"aH":["a_"],"ao":[],"P.E":"a_","aH.E":"a_"},"lH":{"c3":[],"qW":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"lI":{"c3":[],"qX":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"lJ":{"c3":[],"qY":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"lK":{"c3":[],"uP":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"iQ":{"c3":[],"uQ":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"iR":{"c3":[],"uR":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"eA":{"c3":[],"df":[],"P":["c"],"bn":["c"],"k":["c"],"c1":["c"],"J":["c"],"aj":[],"bl":["c"],"i":["c"],"aH":["c"],"ao":[],"P.E":"c","aH.E":"c"},"nb":{"au":[]},"hQ":{"dd":[],"au":[]},"aY":{"a3":["1"]},"nF":{"F2":[]},"jj":{"bd":["1"]},"dm":{"a8":["1"]},"dV":{"i":["1"],"i.E":"1"},"aO":{"au":[]},"aA":{"ac":["1"],"hO":["1"],"aa":["1"],"aa.T":"1"},"cU":{"di":["1"],"b_":["1"],"bw":["1"],"cV":["1"],"c6":["1"],"b_.T":"1"},"jn":{"eU":["1"],"ck":["1"],"aY":["1"],"a3":["1"],"jT":["1"],"cV":["1"],"c6":["1"]},"jk":{"jn":["1"],"eU":["1"],"ck":["1"],"aY":["1"],"a3":["1"],"jT":["1"],"cV":["1"],"c6":["1"]},"hz":{"af":[]},"fb":{"bd":["1"]},"W":{"fb":["1"],"bd":["1"]},"jU":{"fb":["1"],"bd":["1"]},"v":{"H":["1"]},"eV":{"aa":["1"]},"jb":{"br":["1","2"]},"fm":{"eU":["1"],"ck":["1"],"aY":["1"],"a3":["1"],"jT":["1"],"cV":["1"],"c6":["1"]},"dP":{"mZ":["1"],"fm":["1"],"eU":["1"],"ck":["1"],"aY":["1"],"a3":["1"],"jT":["1"],"cV":["1"],"c6":["1"]},"hP":{"nE":["1"],"fm":["1"],"eU":["1"],"ck":["1"],"aY":["1"],"a3":["1"],"jT":["1"],"cV":["1"],"c6":["1"]},"ac":{"hO":["1"],"aa":["1"],"aa.T":"1"},"di":{"b_":["1"],"bw":["1"],"cV":["1"],"c6":["1"],"b_.T":"1"},"fn":{"ck":["1"],"aY":["1"],"a3":["1"]},"b_":{"bw":["1"],"cV":["1"],"c6":["1"],"b_.T":"1"},"hO":{"aa":["1"]},"cC":{"dj":["1"]},"fd":{"dj":["@"]},"n9":{"dj":["@"]},"hG":{"bw":["1"]},"js":{"aa":["1"],"aa.T":"1"},"jt":{"aY":["1"],"a3":["1"]},"hN":{"b_":["2"],"bw":["2"],"cV":["2"],"c6":["2"],"b_.T":"2"},"jm":{"aa":["2"],"aa.T":"2"},"k5":{"zG":[]},"nv":{"k5":[],"zG":[]},"jv":{"a1":["1","2"],"h":["1","2"]},"jy":{"jv":["1","2"],"a1":["1","2"],"h":["1","2"],"a1.K":"1","a1.V":"2"},"jw":{"J":["1"],"i":["1"],"i.E":"1"},"jx":{"a8":["1"]},"jC":{"bS":["1","2"],"a1":["1","2"],"lA":["1","2"],"h":["1","2"],"a1.K":"1","a1.V":"2"},"fg":{"jP":["1"],"cR":["1"],"da":["1"],"J":["1"],"i":["1"]},"fh":{"a8":["1"]},"P":{"k":["1"],"J":["1"],"i":["1"]},"a1":{"h":["1","2"]},"iL":{"h":["1","2"]},"f8":{"k_":["1","2"],"iL":["1","2"],"nM":["1","2"],"h":["1","2"]},"iJ":{"Ew":["1"],"Q":["1"],"J":["1"],"i":["1"],"Q.E":"1","i.E":"1"},"fi":{"a8":["1"]},"cR":{"da":["1"],"J":["1"],"i":["1"]},"jP":{"cR":["1"],"da":["1"],"J":["1"],"i":["1"]},"jd":{"cR":["1"],"nO":["1"],"da":["1"],"J":["1"],"i":["1"]},"fc":{"aY":["1"],"a3":["1"]},"dz":{"bE":["a","k<c>"]},"nm":{"a1":["a","@"],"h":["a","@"],"a1.K":"a","a1.V":"@"},"nn":{"Q":["a"],"J":["a"],"i":["a"],"Q.E":"a","i.E":"a"},"nk":{"fp":["T"],"cA":[],"a3":["a"],"fp.0":"T"},"kr":{"dz":[],"bE":["a","k<c>"],"bE.S":"a"},"nK":{"a7":["a","k<c>"],"br":["a","k<c>"]},"kt":{"a7":["a","k<c>"],"br":["a","k<c>"],"a7.S":"a","a7.T":"k<c>"},"nL":{"cA":[],"a3":["a"]},"nJ":{"a7":["k<c>","a"],"br":["k<c>","a"]},"ks":{"a7":["k<c>","a"],"br":["k<c>","a"],"a7.S":"k<c>","a7.T":"a"},"nc":{"c_":[],"a3":["k<c>"]},"ny":{"c_":[],"a3":["k<c>"]},"ig":{"bE":["k<c>","a"],"bE.S":"k<c>"},"ky":{"a7":["k<c>","a"],"br":["k<c>","a"],"a7.S":"k<c>","a7.T":"a"},"n2":{"jl":[]},"n1":{"c_":[],"a3":["k<c>"]},"mX":{"c_":[],"a3":["k<c>"]},"kx":{"a7":["a","k<c>"],"br":["a","k<c>"],"a7.S":"a","a7.T":"k<c>"},"n0":{"cA":[],"a3":["a"]},"c_":{"a3":["k<c>"]},"jo":{"c_":[],"a3":["k<c>"]},"jp":{"c_":[],"a3":["k<c>"]},"io":{"a3":["1"]},"a7":{"br":["1","2"]},"iF":{"au":[]},"ln":{"au":[]},"lm":{"bE":["x?","a"],"bE.S":"x?"},"lp":{"a7":["x?","a"],"br":["x?","a"],"a7.S":"x?","a7.T":"a"},"nl":{"a3":["x?"]},"lo":{"a7":["a","x?"],"br":["a","x?"],"a7.S":"a","a7.T":"x?"},"lu":{"dz":[],"bE":["a","k<c>"],"bE.S":"a"},"lw":{"a7":["a","k<c>"],"br":["a","k<c>"],"a7.S":"a","a7.T":"k<c>"},"lv":{"a7":["k<c>","a"],"br":["k<c>","a"],"a7.S":"k<c>","a7.T":"a"},"jA":{"c_":[],"a3":["k<c>"]},"np":{"c_":[],"a3":["k<c>"]},"lz":{"br":["a","a"]},"cA":{"a3":["a"]},"nC":{"xU":[]},"fp":{"cA":[],"a3":["a"]},"fo":{"cA":[],"a3":["a"]},"k4":{"c_":[],"a3":["k<c>"]},"mJ":{"dz":[],"bE":["a","k<c>"],"bE.S":"a"},"mK":{"a7":["a","k<c>"],"br":["a","k<c>"],"a7.S":"a","a7.T":"k<c>"},"nR":{"cA":[],"a3":["a"]},"jf":{"a7":["k<c>","a"],"br":["k<c>","a"],"a7.S":"k<c>","a7.T":"a"},"bk":{"aK":["bk"]},"a_":{"bB":[],"aK":["bB"]},"aX":{"aK":["aX"]},"c":{"bB":[],"aK":["bB"]},"k":{"J":["1"],"i":["1"]},"bB":{"aK":["bB"]},"j_":{"cP":[]},"da":{"J":["1"],"i":["1"]},"a":{"aK":["a"],"rL":[]},"T":{"xU":[]},"ku":{"au":[]},"dd":{"au":[]},"cs":{"au":[]},"hl":{"au":[]},"ld":{"au":[]},"je":{"au":[]},"mF":{"au":[]},"bX":{"au":[]},"kM":{"au":[]},"lU":{"au":[]},"j9":{"au":[]},"nd":{"af":[]},"bG":{"af":[]},"nD":{"bW":[]},"ch":{"i":["c"],"i.E":"c"},"ho":{"a8":["c"]},"k1":{"hB":[]},"cm":{"hB":[]},"n8":{"hB":[]},"lO":{"af":[]},"d_":{"ck":["1"],"aY":["1"],"a3":["1"]},"j7":{"br":["1","2"]},"S":{"h":["2","3"]},"bc":{"c0":[]},"cQ":{"c0":[]},"bv":{"c0":[]},"cK":{"c0":[]},"bR":{"c0":[]},"bO":{"c0":[]},"el":{"c0":[]},"l1":{"e9":[]},"m3":{"e9":[]},"dM":{"e9":[]},"cI":{"e9":[]},"kp":{"a6":[]},"kL":{"a6":[]},"kN":{"a6":[]},"kP":{"a6":[]},"kR":{"a6":[]},"kT":{"a6":[]},"kW":{"a6":[]},"kY":{"a6":[]},"l_":{"a6":[]},"l5":{"a6":[]},"l7":{"a6":[]},"l9":{"a6":[]},"lb":{"a6":[]},"lE":{"a6":[]},"lL":{"a6":[]},"lV":{"a6":[]},"m9":{"a6":[]},"mm":{"a6":[]},"mw":{"a6":[]},"mL":{"a6":[]},"mO":{"a6":[]},"m_":{"dy":[]},"lx":{"dy":[]},"mg":{"dy":[]},"ml":{"dy":[]},"kA":{"bK":[]},"kK":{"bK":[]},"kQ":{"bK":[]},"kU":{"bK":[]},"kZ":{"bK":[]},"lt":{"bK":[]},"lX":{"bK":[]},"m8":{"bK":[]},"mc":{"bK":[]},"mk":{"bK":[]},"kz":{"yJ":[]},"fG":{"eV":["k<c>"],"aa":["k<c>"],"aa.T":"k<c>","eV.T":"k<c>"},"kD":{"af":[]},"me":{"ih":[]},"ij":{"S":["a","a","1"],"h":["a","1"],"S.K":"a","S.V":"1","S.C":"a"},"kl":{"kh":[]},"fP":{"yJ":[]},"dr":{"af":[]},"kn":{"kj":[]},"l6":{"kj":[]},"lS":{"kj":[]},"ki":{"av":[]},"nw":{"xw":[]},"n5":{"xw":[]},"ma":{"xv":[]},"mE":{"xv":[]},"ni":{"Cp":[]},"kS":{"d2":[]},"lq":{"d2":[]},"lC":{"d2":[]},"lY":{"d2":[]},"mU":{"d2":[]},"km":{"zw":[]},"mb":{"CX":[]},"md":{"Fh":[]},"mQ":{"af":[]},"ng":{"av":[]},"nj":{"av":[]},"nT":{"av":[]},"ns":{"av":[]},"mW":{"av":[]},"nh":{"av":[]},"nr":{"av":[]},"n3":{"av":[]},"nx":{"av":[]},"no":{"av":[]},"nu":{"av":[]},"nH":{"av":[]},"nG":{"av":[]},"na":{"av":[]},"ne":{"av":[]},"n4":{"av":[]},"cg":{"EL":[]},"m0":{"hq":[]},"m2":{"hq":[]},"kH":{"hq":[]},"nP":{"z5":[]},"mC":{"CZ":[]},"ji":{"rC":[]},"dA":{"F":[]},"dt":{"F":[]},"ec":{"F":[]},"eb":{"F":[]},"ha":{"F":[]},"hb":{"F":[]},"h1":{"F":[]},"h8":{"F":[]},"h9":{"F":[]},"eJ":{"F":[]},"eK":{"F":[]},"eB":{"F":[]},"eC":{"F":[]},"eO":{"F":[]},"eP":{"F":[]},"eQ":{"F":[]},"he":{"F":[]},"hf":{"F":[]},"hg":{"F":[]},"eh":{"F":[]},"ei":{"F":[]},"fH":{"F":[]},"eg":{"F":[]},"dv":{"F":[]},"dw":{"F":[]},"hk":{"F":[]},"eL":{"F":[]},"hc":{"F":[]},"hd":{"F":[]},"eM":{"F":[]},"eq":{"F":[]},"h4":{"F":[]},"h5":{"F":[]},"er":{"F":[]},"eo":{"F":[]},"h2":{"F":[]},"h3":{"F":[]},"ep":{"F":[]},"e3":{"F":[]},"h_":{"F":[]},"h0":{"F":[]},"e4":{"F":[]},"eR":{"F":[]},"hh":{"F":[]},"hi":{"F":[]},"eS":{"F":[]},"fL":{"F":[]},"h6":{"F":[]},"h7":{"F":[]},"es":{"F":[]},"f4":{"F":[]},"f5":{"F":[]},"f6":{"F":[]},"eZ":{"F":[]},"f_":{"F":[]},"f2":{"F":[]},"f3":{"F":[]},"eD":{"F":[]},"eF":{"F":[]},"eE":{"F":[]},"e6":{"F":[]},"e7":{"F":[]},"ew":{"F":[]},"cv":{"F":[]},"aL":{"d7":[]},"en":{"d7":[]},"dH":{"af":[]},"cw":{"af":[]},"ie":{"af":[]},"j2":{"af":[]},"mD":{"af":[]},"dN":{"af":[]},"bb":{"af":[]},"lB":{"DH":[]},"kk":{"av":[]},"kI":{"CR":[]},"mM":{"av":[]},"jg":{"EY":[]},"mT":{"zw":[]},"dh":{"EZ":[]},"iK":{"dK":[]},"iS":{"dK":[]},"iT":{"dK":[]},"j3":{"dK":[]},"j5":{"dK":[]},"iX":{"af":[]},"m1":{"fR":[]},"mI":{"fR":[]},"mP":{"fR":[]},"l3":{"cz":[],"aK":["cz"]},"hH":{"dc":[],"cS":[],"aK":["cS"]},"cz":{"aK":["cz"]},"mp":{"cz":[],"aK":["cz"]},"cS":{"aK":["cS"]},"mq":{"cS":[],"aK":["cS"]},"mr":{"af":[]},"hs":{"bG":[],"af":[]},"ht":{"cS":[],"aK":["cS"]},"dc":{"cS":[],"aK":["cS"]},"iA":{"xT":["1"]},"hI":{"ck":["1"],"aY":["1"],"a3":["1"]},"ja":{"xT":["1"]},"mv":{"bG":[],"af":[]},"fe":{"aa":["1"],"aa.T":"1"},"ju":{"bw":["1"]},"ed":{"v6":[]},"hy":{"dg":[]},"fE":{"dg":[]},"fI":{"dg":[]},"hE":{"af":[]},"hD":{"af":[]},"kd":{"Ff":[],"xT":["@"]},"nS":{"Fg":[],"d_":["@"],"ck":["@"],"aY":["@"],"a3":["@"],"d_.T":"@"},"mN":{"af":[]},"qY":{"k":["c"],"J":["c"],"i":["c"]},"df":{"k":["c"],"J":["c"],"i":["c"]},"uR":{"k":["c"],"J":["c"],"i":["c"]},"qW":{"k":["c"],"J":["c"],"i":["c"]},"uP":{"k":["c"],"J":["c"],"i":["c"]},"qX":{"k":["c"],"J":["c"],"i":["c"]},"uQ":{"k":["c"],"J":["c"],"i":["c"]},"pV":{"k":["a_"],"J":["a_"],"i":["a_"]},"pW":{"k":["a_"],"J":["a_"],"i":["a_"]}}'))
A.FU(v.typeUniverse,JSON.parse('{"hA":1,"k6":2,"bn":1,"jb":2,"dj":1,"k0":1,"io":1,"ja":1}'))
var u={S:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",q:"  :ai <prompt>                 run the agent (mode: ",D:" must not be greater than the number of characters in the file, ",Z:")\n  :ai mode <standard|plan|auto>  set the default mode\n  :ai lang <language|off>      set the reply language\n  :ai --standard|--plan|--auto <prompt>  one-shot mode override\n  :ai --lang <language> <prompt>  one-shot language override\n  :ai status                   show provider, model, mode, language\n  :ai -h | --help              show this help",U:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",A:"Cannot extract a file path from a URI with a fragment component",z:"Cannot extract a file path from a URI with a query component",Q:"Cannot extract a non-Windows file path from a file URI with an authority",w:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",n:"Provisions or changes real infrastructure.",b:"Session detached \u2014 resume it from the list.",l:"User declined to run this command. Propose an alternative or stop and explain.",x:"usage: :tree [path] [-L depth] [-a]  (depth must be a non-negative integer)"}
var t=(function rtii(){var s=A.al
return{f9:s("@<@>"),j4:s("@<~>"),BF:s("e2"),tR:s("cX"),bk:s("fx"),DT:s("fy"),mI:s("fz"),pl:s("ba"),mL:s("ds"),xR:s("bu"),yu:s("ib"),n:s("aO"),o:s("b4<k<aB>>"),A:s("b4<k<aZ>>"),E4:s("dt"),zX:s("ct"),Bd:s("ig"),Ej:s("ed"),l2:s("ii"),yp:s("xC"),z0:s("ij<a>"),gc:s("du"),hW:s("kB"),I:s("cu"),i:s("bj"),k4:s("dx"),iw:s("cJ"),iX:s("bc"),Y:s("D"),U:s("c0"),pi:s("iq"),Dv:s("cK"),hO:s("aK<@>"),c3:s("bd<cX>"),wj:s("bd<d0>"),bd:s("bd<kX>"),nH:s("bd<aX>"),Cn:s("bd<cv>"),pI:s("bd<cd>"),v7:s("bd<k<aB>>"),bE:s("bd<k<bz>>"),DM:s("bd<d9>"),j_:s("bd<f0>"),at:s("X<a,d2>"),gU:s("X<a,x>"),w:s("X<a,a>"),e:s("X<a,h<a,a>>"),x:s("X<a,x?>"),M:s("B<a>"),An:s("F"),eR:s("F(c?,h<a,@>)"),f7:s("bk"),k:s("aB"),v4:s("d0"),cE:s("bP"),cy:s("bQ"),ec:s("cL"),ya:s("aX"),cU:s("et"),g:s("J<@>"),u1:s("bR"),yt:s("au"),A2:s("af"),eJ:s("l2"),dt:s("bF"),D4:s("pV"),ni:s("pW"),Bj:s("bG"),BO:s("d1"),uo:s("H<a?>"),qJ:s("H<~>(aa<k<c>>)"),b:s("Z<bj>"),xL:s("Z<ej>"),gH:s("bH"),wV:s("fO"),tf:s("cv"),Aa:s("cd"),EE:s("qW"),fO:s("qX"),kT:s("qY"),gs:s("i<bj>"),Du:s("i<a>"),tY:s("i<@>"),uI:s("i<c>"),us:s("z<kg>"),z4:s("z<fz>"),wb:s("z<ba>"),ti:s("z<fC>"),vn:s("z<cc>"),R:s("z<bi>"),j:s("z<D>"),ES:s("z<a6>"),J:s("z<c0>"),yP:s("z<cK>"),Fz:s("z<bd<~>>"),uw:s("z<bQ>"),AV:s("z<et>"),r:s("z<bR>"),og:s("z<bF>"),AW:s("z<H<y>>"),iJ:s("z<H<~>>"),pP:s("z<cM>"),O:s("z<aj>"),DG:s("z<aP>"),rq:s("z<h<a,x>>"),A7:s("z<h<a,a>>"),cs:s("z<h<a,@>>"),ye:s("z<h<a,k<h<a,x>>>>"),F4:s("z<h<a,h<a,x>>>"),d:s("z<h<a,x?>>"),yT:s("z<aZ>"),C:s("z<aV>"),kd:s("z<+(a,a)>"),f4:s("z<+label,value(a,a)>"),Cp:s("z<+isDir,isLink,path,size(y,y,a,c)>"),iq:s("z<bv>"),v:s("z<a9>"),we:s("z<bw<x?>>"),s:s("z<a>"),pK:s("z<hw>"),B:s("z<ag>"),eE:s("z<df>"),nG:s("z<dO>"),nT:s("z<b0>"),oi:s("z<b8>"),Ac:s("z<c7>"),BL:s("z<nt>"),qi:s("z<aW>"),mK:s("z<aJ>"),zz:s("z<@>"),t:s("z<c>"),Cf:s("z<x?>"),yH:s("z<a?>"),ga:s("z<~(c,c)>"),CP:s("bl<@>"),Be:s("iC"),m:s("aj"),ud:s("d3"),Eh:s("c1<@>"),vl:s("fW"),pe:s("iJ<bd<k<aZ>>>"),dN:s("k<fz>"),ei:s("k<ba>"),hr:s("k<cc>"),W:s("k<cK>"),zA:s("k<aB>"),rE:s("k<bQ>"),qL:s("k<bR>"),yv:s("k<bF>"),x0:s("k<aP>"),zY:s("k<h<a,x>>"),rW:s("k<h<a,a>>"),oD:s("k<aZ>"),DX:s("k<+(a,a)>"),a:s("k<a>"),BV:s("k<bz>"),cR:s("k<dO>"),_:s("k<@>"),L:s("k<c>"),cO:s("k<b8?>"),kQ:s("av"),i8:s("z5"),q:s("V<a,a>"),ho:s("V<x,k<b8>>"),kx:s("h<a,bH>"),of:s("h<a,x>"),yz:s("h<a,a>"),P:s("h<a,@>"),f:s("h<@,@>"),G:s("h<a,x?>"),zK:s("a2<a,a>"),nf:s("a2<a,@>"),Bo:s("fY"),rV:s("fZ"),eK:s("c3"),iT:s("eA"),qn:s("aZ"),c:s("ab"),K:s("x"),o5:s("aQ<b4<k<aB>>>"),wg:s("aQ<b4<k<aZ>>>"),dK:s("aQ<ct>"),pa:s("aQ<bP>"),pM:s("aQ<dJ>"),qv:s("aQ<by>"),Ef:s("aQ<bY>"),jF:s("aQ<c>"),vS:s("aQ<a?>"),tN:s("rC"),nl:s("d7"),nU:s("iY"),bT:s("cf"),wy:s("m6"),op:s("JE"),ep:s("+()"),p_:s("+(a,a)"),aw:s("+completer,nodeId,targetPort(bd<f1>,a,c)"),AX:s("bv"),he:s("j_"),dS:s("cg"),ey:s("mf"),xf:s("dJ"),cS:s("ch"),n0:s("bK"),V:s("a9"),lm:s("bV"),ij:s("hp"),aC:s("d9"),cp:s("da<bj>"),x2:s("eT"),vK:s("a3<k<c>>"),u:s("a3<a>"),wo:s("cz"),gL:s("cS"),ER:s("dc"),l:s("bW"),hv:s("mt<x?>"),dF:s("eU<df>"),go:s("bw<F>"),iI:s("bw<d7>"),xX:s("aa<k<c>>"),Cj:s("mu"),N:s("a"),f0:s("T"),pj:s("a(cP)"),ff:s("a(a)"),aW:s("by"),sm:s("bY"),sg:s("ao"),tr:s("f0"),tg:s("f1"),r_:s("bz"),bs:s("dd"),ys:s("uP"),tu:s("uQ"),gJ:s("uR"),p:s("df"),qF:s("f7"),hL:s("f8<a,a>"),eP:s("hB"),mN:s("v6"),uy:s("dg"),vY:s("ae<a>"),tC:s("bL<bc>"),cN:s("bL<cQ>"),Ai:s("bL<a>"),Ex:s("dO"),vL:s("mS"),w6:s("W<cX>"),vE:s("W<ed>"),xe:s("W<is>"),hs:s("W<d0>"),zJ:s("W<aX>"),Fn:s("W<cv>"),Df:s("W<cd>"),BU:s("W<k<aB>>"),ls:s("W<k<aZ>>"),jY:s("W<k<bz>>"),uf:s("W<d9>"),kf:s("W<eT>"),o7:s("W<a>"),v6:s("W<f0>"),EM:s("W<f1>"),sC:s("W<df>"),wY:s("W<y>"),kJ:s("W<c>"),h:s("W<~>"),hb:s("b0"),mP:s("fc<@,@>"),v5:s("fe<aj>"),a8:s("v<cX>"),g_:s("v<ed>"),oW:s("v<is>"),w7:s("v<d0>"),pd:s("v<aX>"),kC:s("v<cv>"),er:s("v<cd>"),fb:s("v<k<aB>>"),b_:s("v<k<aZ>>"),jT:s("v<k<bz>>"),D1:s("v<d9>"),AF:s("v<eT>"),iB:s("v<a>"),bD:s("v<f0>"),h6:s("v<f1>"),Dy:s("v<df>"),aO:s("v<y>"),hR:s("v<@>"),AJ:s("v<c>"),D:s("v<~>"),E:s("b8"),BT:s("jy<x?,x?>"),Dd:s("c7"),a9:s("aW"),qs:s("jS<x?>"),tM:s("dV<c0>"),to:s("aJ"),bc:s("cn"),tW:s("c8"),y:s("y"),bl:s("y(x)"),Ag:s("y(a)"),v1:s("y(b8)"),pR:s("a_"),z:s("@"),pF:s("@()"),h_:s("@(x)"),nW:s("@(x,bW)"),cz:s("@(a)"),S:s("c"),lp:s("bd<k<aZ>>?"),mi:s("bF?"),eZ:s("H<ab>?"),kh:s("l8?"),aF:s("cd?"),uh:s("aj?"),ag:s("k<bF>?"),jS:s("k<@>?"),km:s("h<a,a>?"),yq:s("h<@,@>?"),c_:s("h<a,x?>?"),X:s("x?"),uD:s("+config,httpClient(i8,fP)?"),hF:s("bW?"),DN:s("aa<by>?"),T:s("a?"),tj:s("a(cP)?"),Ed:s("dj<@>?"),F:s("cD<@,@>?"),lI:s("b8?"),Af:s("nq?"),k7:s("y?"),u6:s("a_?"),lo:s("c?"),s7:s("bB?"),Z:s("~()?"),xS:s("~(aj)?"),dv:s("~(a,c)?"),xl:s("~(y)?"),fY:s("bB"),H:s("~"),Q:s("~()"),eU:s("~(k<c>)"),eC:s("~(x)"),sp:s("~(x,bW)"),oM:s("~(cf)"),ma:s("~(a)"),m1:s("~(a,@)"),xx:s("~(c,c)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.ic=J.lh.prototype
B.b=J.z.prototype
B.c=J.iB.prototype
B.p=J.fS.prototype
B.a=J.dB.prototype
B.id=J.d3.prototype
B.ie=J.iD.prototype
B.lk=A.iN.prototype
B.bR=A.iQ.prototype
B.H=A.eA.prototype
B.dt=J.lZ.prototype
B.cb=J.f7.prototype
B.ct=new A.e5(0,"standard")
B.a6=new A.e5(1,"plan")
B.cu=new A.e5(2,"auto")
B.cv=new A.kf(0,"planning")
B.aE=new A.kf(1,"executing")
B.ey=new A.dr("no choices in response",null)
B.ez=new A.dr("no candidates in response",null)
B.bg=new A.ia(0,"anthropic")
B.eA=new A.ia(1,"openai")
B.eB=new A.ia(2,"gemini")
B.bh=new A.fA(0,"system")
B.bi=new A.fA(1,"user")
B.bj=new A.fA(2,"assistant")
B.cw=new A.fA(3,"tool")
B.cx=new A.fB(0,"endTurn")
B.cy=new A.fB(1,"toolUse")
B.cz=new A.fB(2,"maxTokens")
B.cA=new A.fB(3,"other")
B.a2={type:0,properties:1,required:2}
B.mB={summary:0,steps:1}
B.ay={type:0,description:1}
B.l3=new A.X(B.ay,["string","A one-line summary of what the plan accomplishes."],t.w)
B.lv={type:0,description:1,items:2}
B.ds={command:0,explanation:1}
B.l5=new A.X(B.ay,["string","The command for this step."],t.w)
B.l4=new A.X(B.ay,["string","What this step does and why."],t.w)
B.lh=new A.X(B.ds,[B.l5,B.l4],t.e)
B.bO=s(["command"],t.s)
B.kU=new A.X(B.a2,["object",B.lh,B.bO],t.gU)
B.l0=new A.X(B.lv,["array","The ordered steps to execute.",B.kU],t.gU)
B.lc=new A.X(B.mB,[B.l3,B.l0],A.al("X<a,h<a,x>>"))
B.kE=s(["steps"],t.s)
B.kZ=new A.X(B.a2,["object",B.lc,B.kE],t.x)
B.eD=new A.cc("present_plan","Present an ordered, multi-step plan for the user to approve before making any changes. Required in plan mode after investigation and before running mutating commands.",B.kZ)
B.l1=new A.X(B.ay,["string","The exact command line to execute."],t.w)
B.l2=new A.X(B.ay,["string","A short, user-facing reason for running this command."],t.w)
B.li=new A.X(B.ds,[B.l1,B.l2],t.e)
B.kX=new A.X(B.a2,["object",B.li,B.bO],t.x)
B.eF=new A.cc("run_command","Run a single shell command on the node and return its stdout, stderr and exit code. Use it both to investigate the node (read-only probes) and to perform changes. Run exactly one command per call; do not chain unrelated commands. Prefer non-interactive flags (e.g. -y) because no TTY is attached.",B.kX)
B.cB=new A.e8(0,0,0,0)
B.eK=new A.ic(0,"auth")
B.ah=new A.ic(1,"transport")
B.bk=new A.ic(5,"unknown")
B.eL=new A.bb(B.ah,"Enter a Hub address.",null)
B.eM=new A.bb(B.ah,"Connection to the Hub was lost.","Reconnect to continue.")
B.eN=new A.bb(B.ah,"Not connected to a Hub.",null)
B.cC=new A.ks(!1,127)
B.f8=new A.kt(127)
B.dp=new A.fX(0,"idle")
B.cE=new A.b4(B.dp,null,null,!1,t.o)
B.cD=new A.b4(B.dp,null,null,!1,t.A)
B.fa=new A.fD(0,"signedOut")
B.cF=new A.ct(B.fa,null,null)
B.bl=new A.fD(1,"connecting")
B.f9=new A.ct(B.bl,null,null)
B.ai=new A.fD(2,"connected")
B.bm=new A.fD(3,"error")
B.h9=new A.js(A.al("js<k<c>>"))
B.fb=new A.fG(B.h9)
B.fc=new A.fQ(A.IU(),A.al("fQ<c>"))
B.fd=new A.kl()
B.fg=new A.ky()
B.cG=new A.ig()
B.ff=new A.kx()
B.fh=new A.oL()
B.fj=new A.kH()
B.fv=new A.pM()
B.cH=new A.iv(A.al("iv<0&>"))
B.fA=new A.q5()
B.cI=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.fE=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.fJ=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.fF=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.fI=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.fH=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.fG=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.cJ=function(hooks) { return hooks; }

B.x=new A.lm()
B.O=new A.lu()
B.bn=new A.lz()
B.fN=new A.lU()
B.bo=new A.lY()
B.q=new A.bV(2,"mediumRisk")
B.J=new A.bV(4,"critical")
B.h_=new A.mg()
B.by=new A.ip(1,"review")
B.h1=new A.ml()
B.fK=new A.lx()
B.jk=s([B.h_,B.h1,B.fK],A.al("z<dy>"))
B.fQ=new A.m_()
B.fR=new A.rN()
B.fS=new A.m0()
B.fT=new A.m2()
B.fU=new A.rO()
B.fY=new A.rX()
B.f=new A.ta()
B.pT=new A.u1()
B.L=new A.aM(0,"plain")
B.ee=new A.aM(1,"keyword")
B.ej=new A.aM(2,"type")
B.ae=new A.aM(3,"string")
B.b7=new A.aM(4,"number")
B.a5=new A.aM(5,"comment")
B.el=new A.aM(6,"operatorTok")
B.af=new A.aM(7,"punctuation")
B.em=new A.aM(8,"function")
B.ca=new A.aM(9,"property")
B.c7=new A.aM(10,"constant")
B.c8=new A.aM(11,"attribute")
B.pw=new A.aM(12,"tag")
B.px=new A.aM(13,"escape")
B.ef=new A.aM(14,"heading")
B.eg=new A.aM(15,"emphasis")
B.eh=new A.aM(16,"strong")
B.ei=new A.aM(17,"link")
B.c9=new A.aM(18,"codeSpan")
B.aA=new A.aM(19,"listMarker")
B.ek=new A.aM(20,"blockquote")
B.a7=new A.aF(252)
B.e3=new A.a5(B.a7,null,!1,!1,!1,!1,!1)
B.ar=new A.aF(204)
B.oU=new A.a5(B.ar,null,!0,!1,!1,!1,!1)
B.al=new A.aF(81)
B.oR=new A.a5(B.al,null,!1,!1,!1,!1,!1)
B.bs=new A.aF(114)
B.e4=new A.a5(B.bs,null,!1,!1,!1,!1,!1)
B.aI=new A.aF(215)
B.e1=new A.a5(B.aI,null,!1,!1,!1,!1,!1)
B.ak=new A.aF(245)
B.e0=new A.a5(B.ak,null,!1,!0,!1,!1,!1)
B.dZ=new A.a5(B.ar,null,!1,!1,!1,!1,!1)
B.bv=new A.aF(250)
B.oX=new A.a5(B.bv,null,!1,!1,!1,!1,!1)
B.he=new A.aF(149)
B.oP=new A.a5(B.he,null,!1,!1,!1,!1,!1)
B.hc=new A.aF(117)
B.e5=new A.a5(B.hc,null,!1,!1,!1,!1,!1)
B.e6=new A.a5(B.aI,null,!0,!1,!1,!1,!1)
B.cO=new A.aF(39)
B.oW=new A.a5(B.cO,null,!0,!1,!1,!1,!1)
B.oS=new A.a5(B.a7,null,!1,!0,!1,!1,!1)
B.oK=new A.a5(B.a7,null,!0,!1,!1,!1,!1)
B.oQ=new A.a5(B.cO,null,!1,!1,!0,!1,!1)
B.lj=new A.iz([B.L,B.e3,B.ee,B.oU,B.ej,B.oR,B.ae,B.e4,B.b7,B.e1,B.a5,B.e0,B.el,B.dZ,B.af,B.oX,B.em,B.oP,B.ca,B.e5,B.c7,B.e1,B.c8,B.e5,B.pw,B.dZ,B.px,B.e6,B.ef,B.oW,B.eg,B.oS,B.eh,B.oK,B.ei,B.oQ,B.c9,B.e4,B.aA,B.e6,B.ek,B.e0],A.al("iz<aM,a5>"))
B.h4=new A.uL()
B.h5=new A.mE()
B.l=new A.mJ()
B.r=new A.mK()
B.P=new A.uU()
B.h7=new A.v7()
B.aG=new A.n9()
B.t=new A.nv()
B.aH=new A.nD()
B.e2=new A.a5(null,null,!1,!1,!1,!1,!1)
B.cM=new A.du(" ",B.e2)
B.bp=new A.im(0,"sequential")
B.bq=new A.im(1,"and")
B.br=new A.im(2,"or")
B.ha=new A.aF(108)
B.hb=new A.aF(109)
B.aK=new A.aF(236)
B.bu=new A.aF(240)
B.F=new A.bj(0,"readFilesystem")
B.y=new A.bj(1,"writeFilesystem")
B.a8=new A.bj(2,"deleteFilesystem")
B.Q=new A.bj(3,"executePrograms")
B.z=new A.bj(4,"networkRead")
B.A=new A.bj(5,"networkWrite")
B.bw=new A.bj(6,"processManagement")
B.aM=new A.bj(7,"privilegeEscalation")
B.B=new A.bj(8,"systemConfiguration")
B.aN=new A.bj(9,"environmentAccess")
B.cP=new A.dx(0,"yes")
B.bx=new A.dx(1,"no")
B.cQ=new A.dx(2,"explain")
B.as=new A.ip(0,"allow")
B.aO=new A.ip(2,"deny")
B.hh=new A.cJ(0,"readOnly")
B.hi=new A.cJ(1,"modifyFiles")
B.hj=new A.cJ(2,"deleteFiles")
B.hk=new A.cJ(3,"executeCode")
B.hl=new A.cJ(4,"networkAccess")
B.hm=new A.cJ(5,"systemModification")
B.hn=new A.cJ(6,"privilegeEscalation")
B.G=s([],t.s)
B.di=s([],t.iq)
B.m=s([],t.yP)
B.k=s([],t.r)
B.cR=new A.bc("",B.G,B.di,B.m,B.k,null)
B.W={}
B.d=new A.B(B.W,0,t.M)
B.ax=new A.bm(1,"filesystem")
B.i1=new A.ej(3,"cross")
B.n=new A.Z([B.i1],t.xL)
B.E=new A.Z([B.F],t.b)
B.e=new A.bV(0,"safe")
B.j=s([],t.B)
B.lE={"-delete":0}
B.nH=new A.B(B.lE,1,t.M)
B.pt=new A.dM(B.nH)
B.b2=new A.Z([B.a8],t.b)
B.f6=new A.bi(B.pt,B.b2,B.e,"`-delete` removes matched entries.")
B.lW={"-exec":0,"-execdir":1}
B.nF=new A.B(B.lW,2,t.M)
B.ps=new A.dM(B.nF)
B.w=new A.Z([B.Q],t.b)
B.f2=new A.bi(B.ps,B.w,B.e,"`-exec` runs a program per match.")
B.k5=s([B.f6,B.f2],t.R)
B.ho=new A.D("find",B.E,B.e,B.d,B.j,B.k5,null,null)
B.aT=new A.bm(11,"network")
B.D=new A.Z([B.A],t.b)
B.i=s([],t.R)
B.hp=new A.D("ssh-copy-id",B.D,B.e,B.d,B.j,B.i,null,null)
B.iJ=new A.bm(16,"environment")
B.dK=new A.Z([B.aN],t.b)
B.pP=new A.jh(!0,B.d)
B.hq=new A.D("env",B.dK,B.e,B.d,B.j,B.i,B.pP,null)
B.d8=new A.bm(6,"database")
B.nV=new A.Z([B.F,B.y,B.A,B.Q],t.b)
B.hr=new A.D("prisma",B.nV,B.e,B.d,B.j,B.i,null,null)
B.d7=new A.bm(5,"crypto")
B.o8=new A.Z([B.F,B.y,B.z],t.b)
B.hs=new A.D("step",B.o8,B.e,B.d,B.j,B.i,null,null)
B.iI=new A.bm(10,"infrastructure")
B.b3=new A.Z([B.F,B.z],t.b)
B.mm={preview:0,stack:1,config:2,about:3,whoami:4,plugin:5,logs:6}
B.ou=new A.B(B.mm,7,t.M)
B.p0=new A.ag(B.ou,B.b3,B.e,"Reads or previews infrastructure.")
B.lt={up:0,import:1,refresh:2}
B.ns=new A.B(B.lt,3,t.M)
B.bW=new A.Z([B.A,B.y,B.Q],t.b)
B.p1=new A.ag(B.ns,B.bW,B.q,u.n)
B.m6={destroy:0}
B.nR=new A.B(B.m6,1,t.M)
B.o=new A.bV(3,"highRisk")
B.e8=new A.ag(B.nR,B.bW,B.o,"Destroys managed infrastructure.")
B.kz=s([B.p0,B.p1,B.e8],t.B)
B.ht=new A.D("pulumi",B.b3,B.e,B.d,B.kz,B.i,null,null)
B.o_=new A.Z([B.F,B.z,B.A,B.Q],t.b)
B.hu=new A.D("packer",B.o_,B.e,B.d,B.j,B.i,null,null)
B.pV=new A.bm(8,"packageManager")
B.mE={version:0,env:1}
B.nt=new A.B(B.mE,2,t.M)
B.mi={install:0,i:1,add:2,ci:3,update:4,upgrade:5,audit:6,download:7,wheel:8,get:9,restore:10,sync:11}
B.oD=new A.B(B.mi,12,t.M)
B.b5=new A.Z([B.z,B.y],t.b)
B.c4=new A.ag(B.oD,B.b5,B.q,"Downloads and installs packages (runs install scripts).")
B.mu={publish:0}
B.om=new A.B(B.mu,1,t.M)
B.e7=new A.ag(B.om,B.D,B.e,"Uploads a package to a registry.")
B.aV=s([B.c4,B.e7],t.B)
B.hv=new A.D("go",B.w,B.e,B.nt,B.aV,B.i,null,null)
B.d6=new A.bm(15,"system")
B.a3=new A.Z([B.B],t.b)
B.hw=new A.D("visudo",B.a3,B.o,B.d,B.j,B.i,null,null)
B.K=new A.Z([B.F,B.y],t.b)
B.lZ={s_client:0,s_server:1,ocsp:2}
B.nx=new A.B(B.lZ,3,t.M)
B.T=new A.Z([B.z,B.A],t.b)
B.p5=new A.ag(B.nx,B.T,B.e,"Opens a network connection to a TLS/OCSP endpoint.")
B.j5=s([B.p5],t.B)
B.hx=new A.D("openssl",B.K,B.e,B.d,B.j5,B.i,null,null)
B.i_=new A.ej(1,"macos")
B.pW=new A.Z([B.i_],t.xL)
B.hy=new A.D("spctl",B.a3,B.o,B.d,B.j,B.i,null,null)
B.mg={"-V":0}
B.bV=new A.B(B.mg,1,t.M)
B.hz=new A.D("cargo",B.w,B.e,B.bV,B.aV,B.i,null,null)
B.bK=new A.bm(14,"process")
B.ad=new A.Z([B.bw],t.b)
B.cc=new A.jh(!1,B.d)
B.hA=new A.D("nice",B.ad,B.e,B.d,B.j,B.i,B.cc,null)
B.S=new A.Z([B.z],t.b)
B.hC=new A.D("ssh-keyscan",B.S,B.e,B.d,B.j,B.i,null,null)
B.hD=new A.D("sd",B.K,B.e,B.d,B.j,B.i,null,null)
B.nM=new A.Z([B.F,B.y,B.B],t.b)
B.hE=new A.D("security",B.nM,B.o,B.d,B.j,B.i,null,null)
B.iH=new A.bm(0,"versionControl")
B.dL=new A.Z([B.F,B.z,B.A],t.b)
B.hF=new A.D("git-lfs",B.dL,B.e,B.d,B.j,B.i,null,null)
B.dU=new A.Z([B.z,B.A,B.Q,B.B],t.b)
B.lV={"--become":0,"-b":1,"--become-method":2}
B.nr=new A.B(B.lV,3,t.M)
B.pr=new A.dM(B.nr)
B.oq=new A.Z([B.aM,B.B],t.b)
B.eZ=new A.bi(B.pr,B.oq,B.q,"Escalates privileges on the managed hosts.")
B.kj=s([B.eZ],t.R)
B.hG=new A.D("ansible-playbook",B.dU,B.e,B.d,B.j,B.kj,null,null)
B.me={status:0,show:1,"list-units":2,"list-unit-files":3,"list-dependencies":4,"is-active":5,"is-enabled":6,"is-failed":7,cat:8,"get-default":9,"show-environment":10}
B.nB=new A.B(B.me,11,t.M)
B.pg=new A.ag(B.nB,B.E,B.e,"Queries unit/system state.")
B.lp={start:0,stop:1,restart:2,reload:3,"reload-or-restart":4,enable:5,disable:6,mask:7,unmask:8,"set-default":9,"daemon-reload":10,"daemon-reexec":11,isolate:12,kill:13,"set-property":14,edit:15,revert:16,preset:17}
B.nX=new A.B(B.lp,18,t.M)
B.bZ=new A.Z([B.B,B.bw],t.b)
B.R=new A.bV(1,"lowRisk")
B.pq=new A.ag(B.nX,B.bZ,B.R,"Changes service/unit state.")
B.lP={poweroff:0,reboot:1,halt:2,suspend:3,hibernate:4,kexec:5,emergency:6,rescue:7}
B.nT=new A.B(B.lP,8,t.M)
B.pm=new A.ag(B.nT,B.bZ,B.o,"Powers off or changes the running system target.")
B.j0=s([B.pg,B.pq,B.pm],t.B)
B.hH=new A.D("systemctl",B.E,B.e,B.d,B.j0,B.i,null,null)
B.hI=new A.D("ansible-galaxy",B.b5,B.e,B.d,B.j,B.i,null,null)
B.ll={"-i":0,"--in-place":1}
B.nA=new A.B(B.ll,2,t.M)
B.fV=new A.m3()
B.az=new A.Z([B.y],t.b)
B.f4=new A.bi(B.fV,B.az,B.e,"In-place edit writes to the input file.")
B.dh=s([B.f4],t.R)
B.hJ=new A.D("sed",B.E,B.e,B.d,B.j,B.dh,null,null)
B.hK=new A.D("nvram",B.a3,B.o,B.d,B.j,B.i,null,null)
B.hL=new A.D("ansible-vault",B.K,B.e,B.d,B.j,B.i,null,null)
B.hM=new A.D("wg",B.a3,B.e,B.d,B.j,B.i,null,null)
B.o7=new A.Z([B.z,B.A,B.y,B.B],t.b)
B.hN=new A.D("certbot",B.o7,B.e,B.d,B.j,B.i,null,null)
B.hZ=new A.ej(0,"linux")
B.pX=new A.Z([B.hZ],t.xL)
B.o1=new A.Z([B.a8,B.B],t.b)
B.hO=new A.D("blkdiscard",B.o1,B.J,B.d,B.j,B.i,null,null)
B.pU=new A.bm(12,"shell")
B.X=new A.B(B.W,0,A.al("B<bj>"))
B.lz={"-v":0,"-V":1}
B.dM=new A.B(B.lz,2,t.M)
B.pO=new A.jh(!1,B.dM)
B.hP=new A.D("command",B.X,B.e,B.d,B.j,B.i,B.pO,null)
B.eT=new A.cI(A.J2())
B.f7=new A.bi(B.eT,B.ad,B.o,"Signals PID 1 (init) or every process (-1) / the process group (0), which can crash the system.")
B.jh=s([B.f7],t.R)
B.hR=new A.D("kill",B.ad,B.e,B.d,B.j,B.jh,null,null)
B.hS=new A.D("glab",B.T,B.e,B.d,B.j,B.i,null,null)
B.hT=new A.D("cosign",B.dL,B.e,B.d,B.j,B.i,null,null)
B.aU=new A.bm(9,"container")
B.b4=new A.Z([B.z,B.Q],t.b)
B.hU=new A.D("docker-compose",B.b4,B.e,B.d,B.j,B.i,null,null)
B.lQ={read:0,list:1,status:2,login:3,token:4,print:5,version:6}
B.od=new A.B(B.lQ,7,t.M)
B.ph=new A.ag(B.od,B.S,B.e,"Reads secrets or status.")
B.m0={write:0,delete:1,kv:2,put:3,patch:4,unwrap:5,destroy:6}
B.oe=new A.B(B.m0,7,t.M)
B.pc=new A.ag(B.oe,B.D,B.q,"Writes or deletes secrets/state.")
B.jt=s([B.ph,B.pc],t.B)
B.hV=new A.D("vault",B.S,B.e,B.d,B.jt,B.i,null,null)
B.hX=new A.D("twine",B.D,B.e,B.d,B.j,B.i,null,null)
B.eU=new A.cI(A.IY())
B.f5=new A.bi(B.eU,B.w,B.e,"A trailing command runs a program on the remote host.")
B.jo=s([B.f5],t.R)
B.hY=new A.D("ssh",B.T,B.e,B.d,B.j,B.jo,null,null)
B.aX=s([],t.v)
B.cS=new A.ek(B.as,B.e,B.aX)
B.cT=new A.em(0,"generic")
B.i2=new A.em(1,"posixShell")
B.bz=new A.em(2,"bash")
B.bA=new A.em(3,"windowsCmd")
B.bB=new A.em(4,"powershell")
B.a9=new A.ir(1,0,"stdin")
B.i3=new A.ir(2,1,"stdout")
B.i4=new A.ir(3,2,"stderr")
B.u=new A.kV(1,"warning")
B.bC=new A.bP(0,"autoFit")
B.cU=new A.bP(1,"landscape")
B.cV=new A.bP(2,"portrait")
B.cW=new A.bP(3,"standard")
B.bD=new A.bP(4,"custom")
B.cX=new A.aX(0)
B.i6=new A.aX(1e5)
B.i7=new A.aX(12e7)
B.i8=new A.aX(2e5)
B.cY=new A.aX(2e7)
B.i9=new A.aX(3e7)
B.cZ=new A.aX(4e6)
B.ia=new A.aX(8e4)
B.ib=new A.aX(8e6)
B.C=new A.fN(0,"tree")
B.I=new A.fN(1,"editor")
B.aa=new A.fN(2,"terminal")
B.am=new A.fN(3,"ai")
B.d_=new A.bH(0,"clean")
B.at=new A.bH(1,"modified")
B.aP=new A.bH(2,"added")
B.bE=new A.bH(3,"deleted")
B.aQ=new A.bH(4,"untracked")
B.au=new A.bH(5,"renamed")
B.bF=new A.bH(6,"ignored")
B.bG=new A.bH(7,"conflicted")
B.bH=new A.fO(0,"added")
B.d0=new A.fO(1,"modified")
B.v=new A.cM(0)
B.aR=new A.cM(1)
B.bI=new A.la(0,"none")
B.d1=new A.la(1,"hubDefault")
B.ig=new A.lo(null)
B.ih=new A.lp(null)
B.iv=new A.b6(10,"right")
B.ii=new A.aP(B.iv,null,null)
B.iw=new A.b6(11,"home")
B.d2=new A.aP(B.iw,null,null)
B.ix=new A.b6(12,"end")
B.d3=new A.aP(B.ix,null,null)
B.iy=new A.b6(13,"pageUp")
B.ij=new A.aP(B.iy,null,null)
B.iz=new A.b6(14,"pageDown")
B.ik=new A.aP(B.iz,null,null)
B.iA=new A.b6(16,"unknown")
B.aS=new A.aP(B.iA,null,null)
B.d4=new A.b6(1,"enter")
B.il=new A.aP(B.d4,null,null)
B.d5=new A.b6(2,"tab")
B.im=new A.aP(B.d5,null,null)
B.iB=new A.b6(3,"backTab")
B.io=new A.aP(B.iB,null,null)
B.iC=new A.b6(4,"backspace")
B.ip=new A.aP(B.iC,null,null)
B.iD=new A.b6(5,"delete")
B.iq=new A.aP(B.iD,null,null)
B.aw=new A.b6(6,"escape")
B.ir=new A.aP(B.aw,null,null)
B.iE=new A.b6(7,"up")
B.is=new A.aP(B.iE,null,null)
B.iF=new A.b6(8,"down")
B.it=new A.aP(B.iF,null,null)
B.iG=new A.b6(9,"left")
B.iu=new A.aP(B.iG,null,null)
B.av=new A.b6(0,"char")
B.bJ=new A.b6(15,"ctrlChar")
B.a_=new A.bm(13,"interpreter")
B.iK=new A.bm(4,"hash")
B.d9=new A.bm(7,"editor")
B.da=new A.lv(!1,255)
B.iL=new A.lw(255)
B.le=new A.X(B.W,[],A.al("X<c,fO>"))
B.dQ=new A.B(B.W,0,A.al("B<c>"))
B.bL=new A.fW(B.le,B.dQ)
B.iM=s(["rm","rmdir","del","erase","unlink","shred","remove-item","ri"],t.s)
B.iN=s([120,300,500],t.t)
B.iO=s(["dmesg","journalctl","last","who","w"],t.s)
B.bM=s([239,191,189],t.t)
B.iP=s([27],t.t)
B.iQ=s([27,91,53,126],t.t)
B.iR=s([27,91,54,126],t.t)
B.iS=s([27,91,65],t.t)
B.iT=s([27,91,66],t.t)
B.iU=s([27,91,67],t.t)
B.iV=s([27,91,68],t.t)
B.iW=s([27,91,70],t.t)
B.iX=s([27,91,72],t.t)
B.c5=new A.by(0,"auto")
B.e9=new A.by(1,"smaller")
B.ea=new A.by(2,"normal")
B.eb=new A.by(3,"larger")
B.iY=s([B.c5,B.e9,B.ea,B.eb],A.al("z<by>"))
B.lT={rm:0,delete:1,rb:2,destroy:3,remove:4,"terminate-instances":5}
B.nS=new A.B(B.lT,6,t.M)
B.pu=new A.dM(B.nS)
B.f_=new A.bi(B.pu,B.D,B.q,"Deletes/terminates a cloud resource.")
B.iZ=s([B.f_],t.R)
B.db=s([""],t.s)
B.j_=s(["pg_dump","pg_dumpall","mysqldump","mongodump","mongoexport"],t.s)
B.dx=new A.aD("^Q","quit")
B.dz=new A.aD("^S","save")
B.dC=new A.aD("^F","find")
B.mS=new A.aD("^L","line")
B.n5=new A.aD("^T","term")
B.mZ=new A.aD("^A","AI")
B.mX=new A.aD("^W","close")
B.n0=new A.aD("^B/Tab","focus")
B.dD=new A.aD("^N/^P","tabs")
B.mU=new A.aD("Enter","open")
B.dc=s([B.dx,B.dz,B.dC,B.mS,B.n5,B.mZ,B.mX,B.n0,B.dD,B.mU],t.kd)
B.mv={push:0}
B.dN=new A.B(B.mv,1,t.M)
B.pp=new A.ag(B.dN,B.D,B.e,"Uploads commits to a remote.")
B.mG={"send-email":0}
B.nY=new A.B(B.mG,1,t.M)
B.pi=new A.ag(B.nY,B.D,B.e,"Sends patches over email.")
B.lX={pull:0,clone:1,fetch:2,remote:3,submodule:4}
B.nZ=new A.B(B.lX,5,t.M)
B.pj=new A.ag(B.nZ,B.S,B.e,"Downloads objects or refs from a remote.")
B.lL={commit:0,add:1,init:2,checkout:3,switch:4,merge:5,reset:6,rebase:7,stash:8,tag:9,apply:10,rm:11,mv:12,restore:13,clean:14,worktree:15,bisect:16,"cherry-pick":17,revert:18,gc:19,reflog:20,am:21,"format-patch":22}
B.ox=new A.B(B.lL,23,t.M)
B.pf=new A.ag(B.ox,B.az,B.e,"Modifies the working tree or repository.")
B.jA=s([B.pp,B.pi,B.pj,B.pf],t.B)
B.eQ=new A.cI(A.IE())
B.eX=new A.bi(B.eQ,B.D,B.q,"A force push can overwrite remote history.")
B.kQ=s([B.eX],t.R)
B.hW=new A.D("git",B.E,B.e,B.d,B.jA,B.kQ,null,null)
B.j1=s([B.hW],t.j)
B.dd=s([65533],t.t)
B.j2=s(["buildah","skopeo","img","kaniko","crictl","ctr","earthly","singularity","apptainer"],t.s)
B.j3=s(["tailscale","zerotier-cli","wg-quick"],t.s)
B.j4=s(["modprobe","insmod","rmmod","kextload","kextunload"],t.s)
B.j6=s([9],t.t)
B.mq={path:0}
B.mC={type:0}
B.a1=new A.X(B.mC,["string"],t.w)
B.lg=new A.X(B.mq,[B.a1],t.e)
B.kk=s(["path"],t.s)
B.dq=new A.X(B.a2,["object",B.lg,B.kk],t.x)
B.eE=new A.cc("read_file","Read a UTF-8 text file in the workspace.",B.dq)
B.mr={path:0,content:1}
B.kT=new A.X(B.mr,[B.a1,B.a1],t.e)
B.kl=s(["path","content"],t.s)
B.kW=new A.X(B.a2,["object",B.kT,B.kl],t.x)
B.eC=new A.cc("write_file","Create or overwrite a file with the given content.",B.kW)
B.m4={path:0,old_string:1,new_string:2}
B.kS=new A.X(B.m4,[B.a1,B.a1,B.a1],t.e)
B.km=s(["path","old_string","new_string"],t.s)
B.kY=new A.X(B.a2,["object",B.kS,B.km],t.x)
B.eI=new A.cc("replace_in_file","Edit part of a file: replace an exact substring. old_string must occur exactly once in the file.",B.kY)
B.eH=new A.cc("list_directory","List the entries of a directory in the workspace.",B.dq)
B.mx={query:0}
B.l7=new A.X(B.mx,[B.a1],t.e)
B.kr=s(["query"],t.s)
B.l_=new A.X(B.a2,["object",B.l7,B.kr],t.x)
B.eG=new A.cc("search_text","Search workspace files for a text query (grep-like).",B.l_)
B.m3={command:0}
B.lf=new A.X(B.m3,[B.a1],t.e)
B.kV=new A.X(B.a2,["object",B.lf,B.bO],t.x)
B.eJ=new A.cc("run_command","Run a shell command in the workspace (e.g. build, tests, git) and read its output.",B.kV)
B.j7=s([B.eE,B.eC,B.eI,B.eH,B.eG,B.eJ],t.vn)
B.lO={"--recv-keys":0,"--send-keys":1,"--refresh-keys":2,"--keyserver":3}
B.dO=new A.B(B.lO,4,t.M)
B.fy=new A.l1()
B.eY=new A.bi(B.fy,B.T,B.e,"Keyserver operations transfer keys over the network.")
B.j8=s([B.eY],t.R)
B.de=s(["B","KB","MB","GB","TB"],t.s)
B.j9=s(["bash","sh","zsh","dash","ksh","fish","csh","tcsh","npx","make","gcc","clang","cc","eval","source","cmd","powershell","pwsh","mvn","gradle","rake","lua","osascript","rscript","swift","kotlin","scala","invoke-expression","iex","cmake","ninja","meson","bazel","buck2","just","task","ant","sbt","lein","clj","clojure","mix","cabal","stack","ghc","runghc","runhaskell","erl","elixir","groovy","jshell","tsc","ts-node","tsx","babel","webpack","vite","rollup","esbuild","parcel","gulp","grunt","bunx","uvx","pytest","tox","nox","jest","mocha","julia","expect","tclsh","wish","zig","nim","crystal","raku","busybox","entr","inotifywait","fswatch","screen","tmux"],t.s)
B.ja=s(["psql","mysql","mariadb","mongo","mongosh","redis-cli","cqlsh","influx","pgcli","mycli","litecli","usql","clickhouse-client","cockroach","etcdctl","sqlplus","sqlcmd","createdb","createuser"],t.s)
B.jb=s(["ps","top","htop","btop","atop","glances","iotop","renice","taskkill","tasklist","get-process","stop-process","pgrep","pidof","pstree","pidstat","jobs","bg","fg","wait","lsof","fuser","taskset","ionice","chrt","setsid","vmstat","iostat","mpstat","sar","free","uptime","nproc","lscpu","lsmem","lsusb","lspci","lshw","dmidecode"],t.s)
B.jc=s(["chattr","mount","umount","useradd","userdel","usermod","groupadd","groupdel","groupmod","gpasswd","passwd","chsh","chfn","service","launchctl","setfacl","setcap","getcap","semanage","restorecon","sysctl","reg","netsh","defaults","crontab","iptables","ip6tables","nft","ufw","firewall-cmd","set-itemproperty","new-service","set-acl","setx"],t.s)
B.jd=s(["md5","md5sum","sha1","sha1sum","sha224sum","sha256","sha256sum","sha384sum","sha512sum","shasum","b2sum","cksum","sum","get-filehash"],t.s)
B.na=new A.dl([!0,!1,!0,!0])
B.n9=new A.dl([!0,!1,!0,!1])
B.n6=new A.dl([!1,!1,!0,!1])
B.n8=new A.dl([!1,!0,!0,!1])
B.n7=new A.dl([!1,!0,!1,!1])
B.bN=s([B.na,B.n9,B.n6,B.n8,B.n7],A.al("z<+(y,y,y,y)>"))
B.lG={install:0,update:1,upgrade:2,add:3,fetch:4,"-s":5,remove:6,erase:7,reinstall:8}
B.nv=new A.B(B.lG,9,t.M)
B.nP=new A.Z([B.z,B.y,B.B],t.b)
B.p3=new A.ag(B.nv,B.nP,B.q,"Installs/updates system packages.")
B.je=s([B.p3],t.B)
B.n3=new A.bA("Standard","standard")
B.n2=new A.bA("Plan","plan")
B.n1=new A.bA("Auto","auto")
B.jf=s([B.n3,B.n2,B.n1],t.f4)
B.jg=s(["minikube","kind","k3d","k3s","lima","colima","vagrant"],t.s)
B.ji=s(["A","B","C","D","F","L","Q","S","N","P","W","Z"],t.s)
B.jj=s(["fdisk","gdisk","sgdisk","cfdisk","parted"],t.s)
B.jl=s(["pip","pip3","pipx","poetry","conda","mamba","micromamba","uv","rye","pdm","hatch"],t.s)
B.ec=new A.bY(0,"light")
B.ed=new A.bY(1,"dark")
B.c6=new A.bY(2,"system")
B.df=s([B.ec,B.ed,B.c6],A.al("z<bY>"))
B.jm=s(["ip","ss","netstat","ifconfig","route","arp","arping","tcpdump","tshark","nmap","masscan","mtr","nmcli","resolvectl","getent","ethtool","iw","iwconfig"],t.s)
B.p9=new A.ag(B.dN,B.D,B.e,"Uploads an image to a registry.")
B.mI={pull:0,run:1,build:2,login:3,create:4,start:5,exec:6}
B.nq=new A.B(B.mI,7,t.M)
B.p4=new A.ag(B.nq,B.b4,B.e,"Pulls images and/or runs containers.")
B.lY={rm:0,rmi:1,prune:2,kill:3,stop:4}
B.nw=new A.B(B.lY,5,t.M)
B.pl=new A.ag(B.nw,B.b2,B.e,"Removes containers, images or volumes.")
B.jn=s([B.p9,B.p4,B.pl],t.B)
B.m2={run:0,"run-script":1,exec:2,start:3,test:4,dlx:5,x:6,create:7}
B.os=new A.B(B.m2,8,t.M)
B.p_=new A.ag(B.os,B.w,B.e,"Runs project scripts or fetched binaries (arbitrary code).")
B.jp=s([B.c4,B.e7,B.p_],t.B)
B.jq=s(["apt","apt-get","aptitude","dpkg","rpm","brew","port","dnf","yum","pacman","apk","zypper","emerge","nix","nix-env","snap","flatpak","choco","winget","scoop"],t.s)
B.mt={pub:0,packages:1}
B.ow=new A.B(B.mt,2,t.M)
B.po=new A.ag(B.ow,B.b5,B.e,"Resolves and downloads package dependencies.")
B.mb={format:0,fix:1}
B.nK=new A.B(B.mb,2,t.M)
B.p8=new A.ag(B.nK,B.az,B.e,"Rewrites source files.")
B.mo={run:0,test:1,compile:2,build:3,analyze:4,create:5}
B.oz=new A.B(B.mo,6,t.M)
B.pn=new A.ag(B.oz,B.w,B.e,"Runs or builds Dart/Flutter code.")
B.dk=s([B.po,B.p8,B.pn],t.B)
B.eR=new A.cI(A.Ir())
B.f1=new A.bi(B.eR,B.D,B.e,"`pub publish` uploads a package to pub.dev.")
B.dl=s([B.f1],t.R)
B.hB=new A.D("dart",B.w,B.e,B.d,B.dk,B.dl,null,null)
B.hQ=new A.D("flutter",B.w,B.e,B.d,B.dk,B.dl,null,null)
B.jr=s([B.hB,B.hQ],t.j)
B.js=s(["pg_restore","mongorestore","mongoimport"],t.s)
B.ju=s(["man","info","apropos","whatis","cheat"],t.s)
B.eP=new A.cI(A.IX())
B.f3=new A.bi(B.eP,B.D,B.e,"A request body or non-GET method sends data.")
B.jv=s([B.f3],t.R)
B.jw=s([B.bC,B.cU,B.cV,B.cW,B.bD],A.al("z<bP>"))
B.jx=s(["anthropic","openai","gemini"],t.s)
B.jy=s(["aws","gcloud","az"],t.s)
B.dg=s(["/nodes/:id/sessions/:sid","/nodes/:id/sessions","/nodes/:id","/nodes","/login"],t.s)
B.jz=s(["ftp","sftp","telnet","ping","dig","nslookup","host","whois","traceroute","aria2c","invoke-webrequest","iwr","invoke-restmethod","irm"],t.s)
B.jB=s(["chmod","chown","chgrp"],t.s)
B.jC=s(["consul","nomad"],t.s)
B.jD=s(["curl","wget"],t.s)
B.jE=s(["mkfs","mke2fs","mkfs.ext2","mkfs.ext3","mkfs.ext4","mkfs.xfs","mkfs.btrfs","mkfs.vfat","mkfs.fat","mkfs.exfat","mkfs.ntfs","mkswap","wipefs"],t.s)
B.jF=s(["deno"],t.s)
B.jG=s(["docker","podman","nerdctl"],t.s)
B.jH=s(["dotnet"],t.s)
B.jI=s(["dropdb","dropuser"],t.s)
B.jJ=s(["ansible","salt","salt-call","puppet","chef-client","knife"],t.s)
B.ly={get:0,describe:1,logs:2,top:3,explain:4,version:5,config:6,"cluster-info":7,"api-resources":8,"api-versions":9,wait:10,auth:11,diff:12}
B.oo=new A.B(B.ly,13,t.M)
B.pe=new A.ag(B.oo,B.S,B.e,"Read-only cluster query.")
B.lm={apply:0,create:1,patch:2,replace:3,edit:4,scale:5,label:6,annotate:7,rollout:8,set:9,expose:10,autoscale:11,cordon:12,uncordon:13,drain:14,taint:15}
B.op=new A.B(B.lm,16,t.M)
B.pd=new A.ag(B.op,B.D,B.q,"Mutates cluster state.")
B.m5={delete:0}
B.nD=new A.B(B.m5,1,t.M)
B.oB=new A.Z([B.A,B.a8],t.b)
B.pb=new A.ag(B.nD,B.oB,B.o,"Deletes cluster resources.")
B.mp={exec:0,attach:1,cp:2,"port-forward":3,proxy:4,run:5}
B.or=new A.B(B.mp,6,t.M)
B.o2=new A.Z([B.z,B.A,B.Q],t.b)
B.oZ=new A.ag(B.or,B.o2,B.q,"Runs a process in / streams to a pod.")
B.jK=s([B.pe,B.pd,B.pb,B.oZ],t.B)
B.jL=s(["edit"],t.s)
B.ab=s([],t.ti)
B.jQ=s([],t.vn)
B.jU=s([],A.al("z<bc>"))
B.bP=s([],t.J)
B.jR=s([],A.al("z<aB>"))
B.jN=s([],A.al("z<cL>"))
B.jP=s([],t.og)
B.h=s([],t.O)
B.jS=s([],t.yT)
B.jO=s([],A.al("z<cQ>"))
B.jM=s([],A.al("z<bz>"))
B.dj=s([],t.t)
B.aW=s([],t.zz)
B.jT=s([],A.al("z<~>"))
B.jV=s(["ls","cat","head","tail","grep","egrep","fgrep","pwd","echo","stat","file","wc","less","more","which","whereis","whoami","hostname","date","tree","dir","type","sort","uniq","diff","cmp","dirname","basename","realpath","readlink","getconf","id","uname","df","du","lsblk","get-childitem","get-content","gci","cut","awk","column","fold","nl","tac","strings"],t.s)
B.jW=s(["fd","rg","ag","ack","bat","eza","exa","lsd","delta","fzf","gron","htmlq","hexyl","tokei","scc","glow","mdcat","zoxide","dust","duf","tldr"],t.s)
B.eS=new A.cI(A.J1())
B.eW=new A.bi(B.eS,B.ad,B.o,"A match-all pattern or `-u root` signals a large set of processes, which can crash the system.")
B.jX=s([B.eW],t.R)
B.jY=s(["gem","composer"],t.s)
B.jZ=s(["gpg","gpg2"],t.s)
B.k_=s(["touch","mkdir","cp","copy","tee","truncate","ln","install","patch","xcopy","robocopy","set-content","add-content","split"],t.s)
B.k0=s(["http","https","httpie","xh"],t.s)
B.eO=new A.cI(A.IW())
B.f0=new A.bi(B.eO,B.D,B.e,"Upload/POST flags send data to the server.")
B.k1=s([B.f0],t.R)
B.k2=s(["sudo","su","doas","pkexec","runas"],t.s)
B.k3=s(["java"],t.s)
B.k4=s(["jq","yq","dasel"],t.s)
B.k6=s(["k9s","dive","lazydocker"],t.s)
B.m9={"-auto-approve":0,"--auto-approve":1,"-auto-approve=true":2}
B.ov=new A.B(B.m9,3,t.M)
B.pv=new A.dM(B.ov)
B.eV=new A.bi(B.pv,B.X,B.o,"Applies/destroys without an interactive confirmation.")
B.k7=s([B.eV],t.R)
B.k8=s(["xargs","time","nohup","timeout","watch","exec","builtin","stdbuf"],t.s)
B.k9=s(["kubectl","oc"],t.s)
B.ka=s(["kubectx","kubens"],t.s)
B.kb=s(["age","rage","minisign","signify","sops","mkcert","keytool","ssh-keygen","pass","gopass","secret-tool","pinentry"],t.s)
B.kc=s([B.c4],t.B)
B.kd=s(["mosh","autossh","sshpass"],t.s)
B.ke=s(["mv","move"],t.s)
B.kf=s(["nc","ncat"],t.s)
B.fz=new A.l5()
B.fC=new A.l9()
B.fe=new A.kp()
B.fl=new A.kL()
B.fn=new A.kP()
B.fu=new A.kY()
B.fL=new A.lE()
B.h2=new A.mm()
B.fx=new A.l_()
B.fX=new A.m9()
B.h3=new A.mw()
B.ft=new A.kW()
B.fM=new A.lL()
B.fr=new A.kT()
B.fm=new A.kN()
B.fD=new A.lb()
B.fO=new A.lV()
B.fp=new A.kR()
B.fB=new A.l7()
B.h6=new A.mL()
B.h8=new A.mO()
B.dm=s([B.fz,B.fC,B.fe,B.fl,B.fn,B.fu,B.fL,B.h2,B.fx,B.fX,B.h3,B.ft,B.fM,B.fr,B.fm,B.fD,B.fO,B.fp,B.fB,B.h6,B.h8],t.ES)
B.kg=s(["where","findstr","systeminfo","ver","get-item","get-itemproperty","select-string"],t.s)
B.kh=s(["node","php"],t.s)
B.ki=s(["npm","pnpm","yarn","bun"],t.s)
B.kn=s(["perl"],t.s)
B.ko=s(["pkill","killall"],t.s)
B.kp=s(["printenv","export","set","setenv"],t.s)
B.kq=s(["python","python3"],t.s)
B.ks=s(["quit"],t.s)
B.kt=s(["gh","helm","doctl","flyctl","fly","heroku","vercel","netlify","wrangler","supabase","firebase","gsutil","bq","eksctl","s3cmd","linode-cli","ibmcloud","oci","scw","civo","railway"],t.s)
B.ku=s(["rustup","asdf","nvm","fnm","volta","sdkman","pkgx","bundle","bundler"],t.s)
B.kv=s(["rclone","mc"],t.s)
B.kw=s(["shutdown","reboot","halt","poweroff","init","telinit"],t.s)
B.kx=s(["ruby"],t.s)
B.mc={plan:0,validate:1,fmt:2,show:3,output:4,providers:5,version:6,graph:7,state:8,console:9,get:10,init:11,workspace:12}
B.ot=new A.B(B.mc,13,t.M)
B.pk=new A.ag(B.ot,B.b3,B.e,"Reads or plans infrastructure.")
B.m7={apply:0,import:1,taint:2,untaint:3,refresh:4}
B.nI=new A.B(B.m7,5,t.M)
B.p6=new A.ag(B.nI,B.bW,B.q,u.n)
B.ky=s([B.pk,B.p6,B.e8],t.B)
B.kA=s(["scp","rsync"],t.s)
B.kB=s(["socat","lftp"],t.s)
B.kC=s(["sqlite3","duckdb"],t.s)
B.kD=s(["srm","wipe"],t.s)
B.kF=s(["gzip","gunzip","zcat","zip","unzip","bzip2","bunzip2","bzcat","xz","unxz","xzcat","zstd","unzstd","zstdcat","lz4","lzma","unlzma","compress","uncompress","brotli","pigz","lzip","plzip","lrzip","lzop","lbzip2","pbzip2","pixz","zpaq","unlz4","unbrotli"],t.s)
B.kG=s(["terraform","tofu","terragrunt"],t.s)
B.kH=s(["tig","lazygit","gitk","gitui"],t.s)
B.kI=s(["sc","icacls","takeown","attrib","wmic","bcdedit","cacls","set-service","new-item","set-localuser"],t.s)
B.kJ=s(["vim","vi","nvim","neovim","vimdiff","gvim","view","nano","emacs","ed","ex","pico","joe","micro","code","code-insiders","codium","subl","sublime_text","atom","gedit","kate","kwrite","mousepad","notepad","notepad++","helix","hx","kak","kakoune"],t.s)
B.kK=s(["hg","svn","bzr","fossil","cvs","jj"],t.s)
B.kL=s(["wevtutil"],t.s)
B.kM=s(["tar","7z","7za","7zr","cpio","ar","pax","rar","unrar","unar","lha","arj","zoo","cabextract","rpm2cpio","dpkg-deb","jar","genisoimage","mkisofs","xorriso"],t.s)
B.fo=new A.kQ()
B.fk=new A.kK()
B.h0=new A.mk()
B.fW=new A.m8()
B.fs=new A.kU()
B.fZ=new A.mc()
B.fP=new A.lX()
B.fw=new A.kZ()
B.fi=new A.kA()
B.dn=s([B.fo,B.fk,B.h0,B.fW,B.fs,B.fZ,B.fP,B.fw,B.fi],A.al("z<bK>"))
B.dA=new A.aD("n","new file")
B.dy=new A.aD("N","new folder")
B.dB=new A.aD(".","hidden")
B.kN=s([B.dA,B.dy,B.dB],t.kd)
B.mw={push:0,dpush:1}
B.nN=new A.B(B.mw,2,t.M)
B.pa=new A.ag(B.nN,B.D,B.e,"Uploads commits/changes to a remote.")
B.my={pull:0,clone:1,fetch:2,incoming:3,outgoing:4,co:5,checkout:6}
B.nJ=new A.B(B.my,7,t.M)
B.p7=new A.ag(B.nJ,B.S,B.e,"Downloads changes from a remote.")
B.lN={commit:0,ci:1,add:2,update:3,up:4,merge:5,rebase:6,revert:7,backout:8,rm:9,remove:10,mv:11,rename:12,import:13,init:14,tag:15,branch:16,strip:17,rollback:18,amend:19,new:20,squash:21,split:22}
B.o4=new A.B(B.lN,23,t.M)
B.p2=new A.ag(B.o4,B.az,B.e,"Modifies the working tree or repository.")
B.kO=s([B.pa,B.p7,B.p2],t.B)
B.kP=s(["base64","base32","base58","uuencode","uudecode","xxd","qrencode","ssh-add"],t.s)
B.a0=new A.fX(1,"loading")
B.kR=new A.fX(2,"ready")
B.an=new A.fX(3,"error")
B.m_={dart:0,yaml:1,yml:2,json:3,jsonc:4,md:5,markdown:6}
B.fq=new A.kS()
B.aF=new A.mU()
B.cK=new A.lq()
B.cL=new A.lC()
B.l6=new A.X(B.m_,[B.fq,B.aF,B.aF,B.cK,B.cK,B.cL,B.cL],t.at)
B.lS={"pubspec.lock":0,"dart_test.yaml":1,".gitignore":2}
B.l8=new A.X(B.lS,[B.aF,B.aF,B.bo],t.at)
B.ml={"iso_8859-1:1987":0,"iso-ir-100":1,"iso_8859-1":2,"iso-8859-1":3,latin1:4,l1:5,ibm819:6,cp819:7,csisolatin1:8,"iso-ir-6":9,"ansi_x3.4-1968":10,"ansi_x3.4-1986":11,"iso_646.irv:1991":12,"iso646-us":13,"us-ascii":14,us:15,ibm367:16,cp367:17,csascii:18,ascii:19,csutf8:20,"utf-8":21}
B.N=new A.kr()
B.l9=new A.X(B.ml,[B.O,B.O,B.O,B.O,B.O,B.O,B.O,B.O,B.O,B.N,B.N,B.N,B.N,B.N,B.N,B.N,B.N,B.N,B.N,B.N,B.l,B.l],A.al("X<a,dz>"))
B.lR={python:0,node:1,bun:2,perl:3,ruby:4,php:5,lua:6,osascript:7,rscript:8,elixir:9,groovy:10}
B.mH={"-c":0}
B.ol=new A.B(B.mH,1,t.M)
B.lx={"-e":0,"--eval":1,"-p":2,"--print":3}
B.o5=new A.B(B.lx,4,t.M)
B.lI={"-e":0,"--eval":1}
B.ok=new A.B(B.lI,2,t.M)
B.lM={"-e":0,"-E":1}
B.nz=new A.B(B.lM,2,t.M)
B.m1={"-e":0}
B.ap=new A.B(B.m1,1,t.M)
B.mh={"-r":0}
B.ny=new A.B(B.mh,1,t.M)
B.la=new A.X(B.lR,[B.ol,B.o5,B.ok,B.nz,B.ap,B.ny,B.ap,B.ap,B.ap,B.ap,B.ap],A.al("X<a,da<a>>"))
B.lD={pwsh:0,"g++":1,vi:2,fetch:3,batcat:4,fdfind:5,ripgrep:6}
B.lb=new A.X(B.lD,["powershell","gcc","vim","curl","bat","fd","rg"],t.w)
B.dr=new A.X(B.W,[],A.al("X<a,bH>"))
B.ac=new A.X(B.W,[],t.w)
B.ld=new A.X(B.W,[],A.al("X<a,@>"))
B.aY=new A.X(B.W,[],t.x)
B.bQ=new A.X(B.W,[],A.al("X<@,@>"))
B.mJ=new A.aV(B.u,"Pipe with no following command",0)
B.i5=new A.kV(0,"info")
B.aZ=new A.aV(B.i5,"Empty command",0)
B.mK=new A.aV(B.u,"Chain operator with no command",0)
B.du=new A.cf(0,"all")
B.dv=new A.cf(1,"stepByStep")
B.dw=new A.cf(2,"talk")
B.b_=new A.cf(3,"cancel")
B.mL=new A.cw("protocol_error","Control frame must be a JSON object")
B.mM=new A.cw("protocol_error","Control frame missing 't'")
B.mN=new A.cw("malformed_frame","Data frame shorter than header")
B.mO=new A.cw("protocol_error","Node id cannot be empty")
B.mP=new A.cw("protocol_error","Session id cannot be empty")
B.mQ=new A.cw("protocol_error","Principal id cannot be empty")
B.mR=new A.cw("protocol_error","Unsupported WebSocket frame type")
B.mT=new A.aD("^A","AI agent")
B.mV=new A.aD("^W","close tab")
B.mW=new A.aD("^B","focus pane")
B.mY=new A.aD("^L","go to line")
B.n_=new A.dT(80,24)
B.n4=new A.aD("^T","terminal")
B.dE=new A.d8(0,0,0,0)
B.b0=new A.cx(0,"output")
B.bS=new A.cx(1,"appendOutput")
B.dF=new A.cx(2,"input")
B.nb=new A.cx(3,"hereDocument")
B.nc=new A.cx(4,"errorOutput")
B.nd=new A.cx(5,"appendErrorOutput")
B.ao=new A.cx(6,"mergeStreams")
B.ne=new A.cx(7,"combinedOutput")
B.nf=new A.cx(8,"combinedAppendOutput")
B.dG=new A.hm(0,"light")
B.bT=new A.hm(1,"dark")
B.dH=new A.eN(0,"exec")
B.bU=new A.eN(1,"shell")
B.ng=new A.eN(2,"transfer")
B.nh=new A.eN(3,"drive")
B.ni=new A.eN(4,"tunnel")
B.nj=new A.j2("session_rejected","Session closed before opening")
B.nk=new A.dL(0,"opening")
B.nl=new A.dL(1,"open")
B.nm=new A.dL(2,"closing")
B.nn=new A.dL(3,"closed")
B.b1=new A.dL(4,"detached")
B.no=new A.dL(5,"attached")
B.dI=new A.Z([B.y,B.B],t.b)
B.ln={sudo:0,env:1,command:2,exec:3,nohup:4,time:5,builtin:6}
B.np=new A.B(B.ln,7,t.M)
B.lr={true:0,false:1,null:2,yes:3,no:4,on:5,off:6,True:7,False:8,Null:9,TRUE:10,FALSE:11,NULL:12,"~":13}
B.nu=new A.B(B.lr,14,t.M)
B.lH={rm:0,rmdir:1,del:2,erase:3,unlink:4,shred:5,"remove-item":6,ri:7,srm:8,wipe:9,blkdiscard:10}
B.nC=new A.B(B.lH,11,t.M)
B.lC={"--info":0,"--list-sdks":1,"--list-runtimes":2}
B.nE=new A.B(B.lC,3,t.M)
B.lw={sh:0,bash:1,zsh:2,dash:3,ksh:4,fish:5,csh:6,tcsh:7}
B.nG=new A.B(B.lw,8,t.M)
B.mD={"-version":0}
B.nL=new A.B(B.mD,1,t.M)
B.lB={sudo:0,su:1,doas:2,pkexec:3,runas:4,gosu:5,run0:6,please:7}
B.nO=new A.B(B.lB,8,t.M)
B.lu={"-v":0}
B.dJ=new A.B(B.lu,1,t.M)
B.lA={"--version":0,"--help":1,"--usage":2}
B.bX=new A.B(B.lA,3,t.M)
B.lJ={bash:0,sh:1,zsh:2,dash:3,ksh:4,fish:5,csh:6,tcsh:7,cmd:8,powershell:9,python:10,node:11,ruby:12,perl:13,php:14,deno:15}
B.nQ=new A.B(B.lJ,16,t.M)
B.mj={bash:0,sh:1,zsh:2,dash:3,ksh:4,fish:5}
B.nU=new A.B(B.mj,6,t.M)
B.lo={"-u":0,"-g":1,"-p":2,"-h":3,"-C":4,"-D":5,"-R":6,"-T":7,"-U":8,"-r":9,"-t":10}
B.nW=new A.B(B.lo,11,t.M)
B.mz={ls:0,ll:1,la:2,l:3,cat:4,bat:5,echo:6,printf:7,pwd:8,whoami:9,id:10,date:11,uptime:12,df:13,du:14,free:15,ps:16,which:17,type:18,env:19,printenv:20,head:21,tail:22,wc:23,stat:24,file:25,hostname:26,uname:27,clear:28}
B.o0=new A.B(B.mz,29,t.M)
B.i0=new A.ej(2,"windows")
B.bY=new A.Z([B.i0],t.xL)
B.m8={int:0,double:1,num:2,bool:3,String:4,List:5,Map:6,Set:7,Object:8,Future:9,Stream:10,Iterable:11,void:12,dynamic:13,Null:14,Never:15}
B.o3=new A.B(B.m8,16,t.M)
B.be=new A.be(6,"redirOut")
B.bf=new A.be(7,"redirAppend")
B.cr=new A.be(8,"redirIn")
B.cs=new A.be(9,"redirHereDoc")
B.cm=new A.be(10,"redirErr")
B.cn=new A.be(11,"redirErrAppend")
B.aD=new A.be(13,"redirCombined")
B.co=new A.be(14,"redirCombinedAppend")
B.o6=new A.Z([B.be,B.bf,B.cr,B.cs,B.cm,B.cn,B.aD,B.co],A.al("Z<be>"))
B.lq={"/":0,"/*":1,"/.":2,"~":3,"~/":4,"/~":5}
B.o9=new A.B(B.lq,6,t.M)
B.mk={status:0,log:1,diff:2,show:3,branch:4,remote:5,config:6}
B.oa=new A.B(B.mk,7,t.M)
B.ob=new A.Z([B.aM],t.b)
B.oc=new A.Z([B.A,B.B],t.b)
B.md={abstract:0,as:1,assert:2,async:3,await:4,base:5,break:6,case:7,"catch":8,class:9,const:10,continue:11,covariant:12,default:13,deferred:14,do:15,dynamic:16,else:17,enum:18,export:19,extends:20,extension:21,external:22,factory:23,false:24,final:25,finally:26,for:27,Function:28,get:29,hide:30,if:31,implements:32,import:33,in:34,interface:35,is:36,late:37,library:38,mixin:39,new:40,null:41,on:42,operator:43,part:44,required:45,rethrow:46,return:47,sealed:48,set:49,show:50,static:51,"super":52,switch:53,sync:54,this:55,throw:56,true:57,try:58,typedef:59,var:60,void:61,when:62,while:63,with:64,yield:65}
B.of=new A.B(B.md,66,t.M)
B.mf={mkfs:0,mke2fs:1,mkswap:2,wipefs:3}
B.og=new A.B(B.mf,4,t.M)
B.lK={curl:0,wget:1,aria2c:2,fetch:3,"invoke-webrequest":4,iwr:5,"invoke-restmethod":6,irm:7,lftp:8,"yt-dlp":9,"youtube-dl":10,certutil:11,bitsadmin:12}
B.oh=new A.B(B.lK,13,t.M)
B.oi=new A.Z([B.F,B.A],t.b)
B.oj=new A.Z([B.y,B.a8],t.b)
B.dP=new A.Z([B.y,B.a8,B.B],t.b)
B.dR=new A.Z([B.z,B.A,B.F],t.b)
B.mn={"/etc":0,"/bin":1,"/sbin":2,"/usr":3,"/var":4,"/boot":5,"/lib":6,"/lib64":7,"/sys":8,"/proc":9,"/dev":10,"/system":11,"/users":12,"/home":13,"/root":14,"/opt":15,"/library":16,"/applications":17}
B.dS=new A.B(B.mn,18,t.M)
B.mA={sudo:0,su:1,doas:2,pkexec:3,runas:4,gosu:5,run0:6,please:7,env:8,xargs:9,time:10,nice:11,nohup:12,timeout:13,watch:14,command:15,exec:16,stdbuf:17}
B.on=new A.B(B.mA,18,t.M)
B.lU={"/etc":0,"/bin":1,"/sbin":2,"/usr":3,"/var":4,"/boot":5,"/lib":6,"/lib64":7,"/sys":8,"/proc":9,"/dev":10,"/root":11,"/home":12,"/opt":13,"/library":14,"/system":15}
B.dT=new A.B(B.lU,16,t.M)
B.ls={".":0,".*":1,".+":2,".*?":3,"^.*$":4,"^.+$":5}
B.oy=new A.B(B.ls,6,t.M)
B.ms={powershell:0,pwsh:1}
B.oA=new A.B(B.ms,2,t.M)
B.lF={"-e":0,"-ec":1,"-enc":2,"-encodedcommand":3}
B.dV=new A.B(B.lF,4,t.M)
B.oC=new A.Z([B.B,B.Q],t.b)
B.mF={python:0,pip:1,ruby:2,node:3,php:4,perl:5}
B.oE=new A.B(B.mF,6,t.M)
B.ma={"-C":0,"-c":1,"--git-dir":2,"--work-tree":3,"--namespace":4,"--exec-path":5}
B.oF=new A.B(B.ma,6,t.M)
B.c_=new A.j6(0,"posix")
B.dW=new A.j6(1,"powershell")
B.dX=new A.j6(2,"cmd")
B.oG=new A.hr(null,null,null,null)
B.oH=new A.eT(B.dj,0)
B.c0=new A.a5(B.bv,B.aK,!0,!1,!1,!1,!1)
B.aj=new A.aF(231)
B.cN=new A.aF(24)
B.oI=new A.a5(B.aj,B.cN,!0,!1,!1,!1,!1)
B.dY=new A.a5(B.ak,B.aK,!1,!1,!1,!1,!1)
B.c1=new A.a5(B.aj,B.cN,!1,!1,!1,!1,!1)
B.oJ=new A.a5(B.al,B.aK,!0,!1,!1,!1,!1)
B.aJ=new A.aF(234)
B.e_=new A.a5(B.bv,B.aJ,!1,!1,!1,!1,!1)
B.hd=new A.aF(124)
B.oL=new A.a5(B.aj,B.hd,!0,!1,!1,!1,!1)
B.aL=new A.aF(238)
B.c2=new A.a5(B.a7,B.aL,!1,!1,!1,!1,!1)
B.bt=new A.aF(235)
B.U=new A.a5(B.a7,B.bt,!1,!1,!1,!1,!1)
B.oM=new A.a5(B.al,B.aJ,!0,!1,!1,!1,!1)
B.b6=new A.a5(B.bu,B.bt,!1,!1,!1,!1,!1)
B.oN=new A.a5(B.aj,B.aL,!0,!1,!1,!1,!1)
B.oO=new A.a5(B.a7,B.aJ,!1,!1,!1,!1,!1)
B.c3=new A.a5(B.aj,B.bt,!0,!1,!1,!1,!1)
B.hf=new A.aF(237)
B.V=new A.a5(B.ak,B.hf,!1,!1,!1,!1,!1)
B.a4=new A.a5(B.al,B.aL,!1,!1,!1,!1,!1)
B.oT=new A.a5(B.ak,B.aL,!1,!1,!1,!1,!1)
B.hg=new A.aF(28)
B.oV=new A.a5(B.aj,B.hg,!0,!1,!1,!1,!1)
B.oY=new A.a5(B.bu,B.aJ,!1,!1,!1,!1,!1)
B.py=new A.dN("transport_error","Client is not connected")
B.pz=new A.dN("transport_error","Disconnected from Hub")
B.M=new A.dN("transport_error","Disconnected")
B.pA=A.cr("ii")
B.pB=A.cr("xC")
B.pC=A.cr("pV")
B.pD=A.cr("pW")
B.pE=A.cr("qW")
B.pF=A.cr("qX")
B.pG=A.cr("qY")
B.pH=A.cr("aj")
B.pI=A.cr("x")
B.pJ=A.cr("uP")
B.pK=A.cr("uQ")
B.pL=A.cr("uR")
B.pM=A.cr("df")
B.en=new A.jf(!1)
B.pN=new A.jf(!0)
B.cd=new A.cB(0,"word")
B.eo=new A.cB(1,"pipe")
B.ep=new A.cB(2,"and")
B.eq=new A.cB(3,"or")
B.er=new A.cB(4,"amp")
B.aB=new A.cB(5,"redirOut")
B.b8=new A.cB(6,"redirAppend")
B.ce=new A.cB(7,"redirIn")
B.b9=new A.cB(8,"redirMerge")
B.ba=new A.jH(0,"normal")
B.pQ=new A.jH(1,"esc")
B.pR=new A.jH(2,"csi")
B.pS=new A.hK("reaches root")
B.cf=new A.hK("below root")
B.cg=new A.hK("at root")
B.ch=new A.hK("above root")
B.Y=new A.hL("different")
B.Z=new A.hL("equal")
B.ag=new A.hL("inconclusive")
B.aq=new A.hL("within")
B.ci=new A.cF(0,"word")
B.es=new A.cF(1,"pipe")
B.et=new A.cF(2,"and")
B.eu=new A.cF(3,"or")
B.cj=new A.cF(4,"semicolon")
B.ck=new A.cF(5,"newline")
B.aC=new A.cF(6,"redirOut")
B.bb=new A.cF(7,"redirAppend")
B.bc=new A.cF(8,"redirMerge")
B.cl=new A.be(0,"word")
B.ev=new A.be(1,"pipe")
B.bd=new A.be(12,"redirMerge")
B.ew=new A.be(2,"and")
B.ex=new A.be(3,"or")
B.cp=new A.be(4,"semicolon")
B.cq=new A.be(5,"newline")})();(function staticFields(){$.vN=null
$.ca=A.e([],A.al("z<x>"))
$.ze=null
$.rS=0
$.hj=A.GL()
$.yE=null
$.yD=null
$.AY=null
$.AN=null
$.B8=null
$.wH=null
$.wV=null
$.yf=null
$.vY=A.e([],A.al("z<k<x>?>"))
$.hV=null
$.k7=null
$.k8=null
$.y9=!1
$.E=B.t
$.zD=""
$.zE=null
$.Co=A.e([B.eF,B.eD],t.vn)
$.An=null
$.wj=null})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"Jp","Bn",()=>A.AX("_$dart_dartClosure"))
s($,"Jo","o4",()=>A.AX("_$dart_dartClosure_dartJSInterop"))
s($,"K3","BR",()=>A.xN(0))
s($,"Kn","C5",()=>B.t.i_(new A.wZ(),A.al("H<~>")))
s($,"Kg","C1",()=>A.e([new J.li()],A.al("z<j1>")))
s($,"JP","BE",()=>A.de(A.uO({
toString:function(){return"$receiver$"}})))
s($,"JQ","BF",()=>A.de(A.uO({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"JR","BG",()=>A.de(A.uO(null)))
s($,"JS","BH",()=>A.de(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"JV","BK",()=>A.de(A.uO(void 0)))
s($,"JW","BL",()=>A.de(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"JU","BJ",()=>A.de(A.zz(null)))
s($,"JT","BI",()=>A.de(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"JY","BN",()=>A.de(A.zz(void 0)))
s($,"JX","BM",()=>A.de(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"K0","ym",()=>A.Fj())
s($,"Jx","fu",()=>$.C5())
s($,"K9","BW",()=>A.xN(4096))
s($,"K7","BU",()=>new A.w9().$0())
s($,"K8","BV",()=>new A.w8().$0())
s($,"K2","yn",()=>A.DS(A.c9(A.e([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"K1","BQ",()=>A.xN(0))
s($,"K6","BT",()=>A.O("^[\\-\\.0-9A-Z_a-z~]*$",!0))
s($,"Jq","Bo",()=>A.O("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$",!0))
s($,"Kb","fv",()=>A.i5(B.pI))
s($,"JG","i7",()=>{A.Er()
return $.rS})
s($,"JD","Bz",()=>{var q=new A.vM(new DataView(new ArrayBuffer(A.Gg(8))))
q.lw()
return q})
s($,"Kp","C7",()=>A.rB(new A.xo(),"Removes a leading directory path, keeping only the basename.","strip-directory"))
s($,"Kq","C8",()=>A.rB(new A.xp(),"Removes a trailing .exe/.cmd/.bat/.com/.ps1 extension.","strip-windows-extension"))
s($,"Ks","Ca",()=>A.rB(new A.xq(),"Removes a trailing version suffix from known interpreters.","strip-version-suffix"))
s($,"Ki","C3",()=>A.rB(new A.wy(),"Maps known aliases to their canonical command.","alias"))
s($,"Kk","xr",()=>A.cO(A.e([$.C7(),$.C8(),$.Ca(),$.C3()],A.al("z<iU>")),A.al("iU")))
s($,"K5","BS",()=>A.O("[A-Za-z_]",!0))
s($,"K4","yo",()=>A.O("[A-Za-z0-9_]",!0))
s($,"Js","Bq",()=>A.O("^\\$\\{?HOME\\}?[\\\\/]?\\*?$",!0))
s($,"Ju","Bs",()=>A.O("^%(USERPROFILE|SYSTEMROOT|HOMEPATH|WINDIR|SYSTEMDRIVE)%[\\\\/]?\\*?$",!1))
s($,"Jt","Br",()=>A.O("^[A-Za-z]:[\\\\/]?\\*?$",!0))
s($,"Jr","Bp",()=>A.O("^/dev/(sd|hd|vd|xvd|nvme|mmcblk|disk|loop|md|dm-)",!0))
s($,"Jv","Bt",()=>A.O("(\\$\\{?[A-Za-z_][A-Za-z0-9_]*\\}?)|(\\$env:[A-Za-z_][A-Za-z0-9_]*)|(%[A-Za-z_][A-Za-z0-9_]*%)",!0))
s($,"JC","By",()=>A.O("\\.\\.[\\\\/]",!0))
s($,"JF","BA",()=>A.O("\\b(curl|wget|aria2c|fetch|iwr|irm|invoke-webrequest|invoke-restmethod|lftp|yt-dlp|youtube-dl|certutil|bitsadmin)\\b[^|]*\\|[^|]*\\b(bash|sh|zsh|dash|ksh|fish|python|node|ruby|perl|php|deno|pwsh|powershell|cmd)\\b",!1))
s($,"Jl","Bk",()=>A.O("^[\\w!#%&'*+\\-.^`|~]+$",!0))
s($,"Ka","BX",()=>A.O('["\\x00-\\x1F\\x7F]',!0))
s($,"Kr","C9",()=>A.O('[^()<>@,;:"\\\\/[\\]?={} \\t\\x00-\\x1F\\x7F]+',!0))
s($,"Kd","BZ",()=>A.O("(?:\\r\\n)?[ \\t]+",!0))
s($,"Kf","C0",()=>A.O('"(?:[^"\\x00-\\x1F\\x7F\\\\]|\\\\.)*"',!0))
s($,"Ke","C_",()=>A.O("\\\\(.)",!0))
s($,"Km","C4",()=>A.O('[()<>@,;:"\\\\/\\[\\]?={} \\t\\x00-\\x1F\\x7F]',!0))
s($,"Kt","Cb",()=>A.O("(?:"+$.BZ().a+")*",!0))
s($,"Jk","bh",()=>A.EQ(27))
s($,"Kh","C2",()=>A.O("[|&;<>`]|\\$\\(",!0))
s($,"Jn","Bm",()=>A.O("\\x1b\\[[0-?]*[ -/]*[@-~]|\\x1b\\][^\\x07\\x1b]*(?:\\x07|\\x1b\\\\)",!0))
s($,"Kc","BY",()=>A.O("^@@ -\\d+(?:,\\d+)? \\+(\\d+)(?:,(\\d+))? @@",!0))
s($,"JM","BB",()=>A.O("\\x1B\\[[0-9;?]*[ -/]*[@-~]",!0))
s($,"JN","BC",()=>A.O("\\x1B\\][^\\x07\\x1B]*(?:\\x07|\\x1B\\\\)",!0))
s($,"JO","BD",()=>A.O("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]",!0))
s($,"Jy","Bv",()=>A.e([new A.ng(),new A.nj(),new A.nT(),new A.ns(),new A.mW(),new A.nh(),new A.nr(),new A.n3(),new A.nx(),new A.no(),new A.nu(),new A.nH(),new A.nG(),new A.na(),new A.n4(),new A.ne()],A.al("z<av>")))
s($,"JA","Bw",()=>A.O("^[A-Za-z0-9_.-]+$",!0))
s($,"JB","Bx",()=>A.O("^[A-Za-z0-9_-]+$",!0))
s($,"Jw","Bu",()=>A.G(["hello",A.HC(),"auth.request",A.Hp(),"auth.ok",A.Ho(),"auth.fail",A.Hn(),"node.register",A.HS(),"node.registered",A.HT(),"node.capabilities",A.HH(),"node.heartbeat",A.HP(),"node.heartbeat.ack",A.HO(),"ping",A.I3(),"pong",A.I4(),"node.list.request",A.HQ(),"node.list.response",A.HR(),"session.open",A.I8(),"session.opened",A.I9(),"session.rejected",A.Ia(),"node.session.open",A.HW(),"node.session.opened",A.HX(),"node.session.rejected",A.HY(),"channel.resize",A.Ht(),"channel.signal",A.Hu(),"channel.eof",A.Hr(),"channel.exit",A.Hs(),"channel.close",A.Hq(),"channel.window",A.Hv(),"error",A.I5(),"session.detach.request",A.I6(),"node.session.detach",A.HU(),"node.session.detached",A.HV(),"session.detached",A.I7(),"sessions.list.request",A.Hy(),"node.sessions.list.request",A.HK(),"node.sessions.list.response",A.HL(),"sessions.list.response",A.Hz(),"sessions.kill.request",A.Hw(),"node.sessions.kill.request",A.HI(),"node.sessions.kill.response",A.HJ(),"sessions.kill.response",A.Hx(),"sessions.detach.request",A.Hj(),"node.sessions.detach.request",A.HG(),"node.sessions.detach.response",A.HF(),"sessions.detach.response",A.Hk(),"sessions.screen.request",A.Ib(),"node.sessions.screen.request",A.HZ(),"node.sessions.screen.response",A.I_(),"sessions.screen.response",A.Ic(),"drive.credential.request",A.HA(),"node.drive.credential.request",A.HM(),"node.drive.credential.response",A.HN(),"drive.credential.response",A.HB(),"tunnel.open.request",A.Ih(),"tunnel.opened",A.Ii(),"tunnel.rejected",A.Ij(),"tunnel.close.request",A.Id(),"tunnel.close.response",A.Ie(),"tunnel.list.request",A.If(),"tunnel.list.response",A.Ig(),"node.tunnel.connect",A.I1(),"node.tunnel.connected",A.I2(),"node.tunnel.connect.failed",A.I0(),"ai.config.request",A.Hl(),"ai.config.response",A.Hm(),"http.proxy.request",A.HD(),"http.proxy.response",A.HE()],t.N,t.eR))
s($,"Ko","C6",()=>{var q=$.yl()
return new A.kO(q,".")})
s($,"Kj","b3",()=>new A.kO($.yk(),null))
s($,"JJ","yl",()=>new A.m1(A.O("/",!0),A.O("[^/]$",!0),A.O("^/",!0)))
s($,"JL","o5",()=>new A.mP(A.O("[/\\\\]",!0),A.O("[^/\\\\]$",!0),A.O("^(\\\\\\\\[^\\\\]+\\\\[^\\\\/]+|[a-zA-Z]:[/\\\\])",!0),A.O("^[/\\\\](?![/\\\\])",!0)))
s($,"JK","ka",()=>new A.mI(A.O("/",!0),A.O("(^[a-zA-Z][-+.a-zA-Z\\d]*://|[^/])$",!0),A.O("[a-zA-Z][-+.a-zA-Z\\d]*://[^/]*",!0),A.O("^/",!0)))
s($,"JI","yk",()=>A.ET())
r($,"K_","BP",()=>new A.pt())
s($,"JZ","BO",()=>{var q,p=J.yX(256,t.N)
for(q=0;q<256;++q)p[q]=B.a.d5(B.c.i4(q,16),2,"0")
return p})
s($,"Jm","Bl",()=>$.Bz())})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({SharedArrayBuffer:A.dG,ArrayBuffer:A.fZ,ArrayBufferView:A.iP,DataView:A.iN,Float32Array:A.lF,Float64Array:A.lG,Int16Array:A.lH,Int32Array:A.lI,Int8Array:A.lJ,Uint16Array:A.lK,Uint32Array:A.iQ,Uint8ClampedArray:A.iR,CanvasPixelArray:A.iR,Uint8Array:A.eA})
hunkHelpers.setOrUpdateLeafTags({SharedArrayBuffer:true,ArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bn.$nativeSuperclassTag="ArrayBufferView"
A.jD.$nativeSuperclassTag="ArrayBufferView"
A.jE.$nativeSuperclassTag="ArrayBufferView"
A.iO.$nativeSuperclassTag="ArrayBufferView"
A.jF.$nativeSuperclassTag="ArrayBufferView"
A.jG.$nativeSuperclassTag="ArrayBufferView"
A.c3.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$2$0=function(){return this()}
Function.prototype.$2$1=function(a){return this(a)}
Function.prototype.$1$0=function(){return this()}
Function.prototype.$1$2=function(a,b){return this(a,b)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.IS
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
