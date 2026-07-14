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
if(a[b]!==s){A.nm(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.w(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.lr(b)
return new s(c,this)}:function(){if(s===null)s=A.lr(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.lr(a).prototype
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
lv(a,b,c,d){return{i:a,p:b,e:c,x:d}},
kE(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.lt==null){A.tK()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.e(A.ml("Return interceptor for "+A.J(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.k4
if(o==null)o=$.k4=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.tO(a)
if(p!=null)return p
if(typeof a=="function")return B.a2
s=Object.getPrototypeOf(a)
if(s==null)return B.C
if(s===Object.prototype)return B.C
if(typeof q=="function"){o=$.k4
if(o==null)o=$.k4=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.t,enumerable:false,writable:true,configurable:true})
return B.t}return B.t},
lV(a,b){if(a<0||a>4294967295)throw A.e(A.Y(a,0,4294967295,"length",null))
return J.oC(new Array(a),b)},
lW(a,b){if(a<0)throw A.e(A.bj("Length must be a non-negative integer: "+a,null))
return A.w(new Array(a),b.h("A<0>"))},
lU(a,b){if(a<0)throw A.e(A.bj("Length must be a non-negative integer: "+a,null))
return A.w(new Array(a),b.h("A<0>"))},
oC(a,b){var s=A.w(a,b.h("A<0>"))
s.$flags=1
return s},
lX(a,b){var s=t.e8
return J.nQ(s.a(a),s.a(b))},
lY(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
oD(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.lY(r))break;++b}return b},
oE(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.c(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.lY(q))break}return b},
cA(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dX.prototype
return J.ft.prototype}if(typeof a=="string")return J.br.prototype
if(a==null)return J.dY.prototype
if(typeof a=="boolean")return J.fs.prototype
if(Array.isArray(a))return J.A.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cR.prototype
if(typeof a=="bigint")return J.cQ.prototype
return a}if(a instanceof A.n)return a
return J.kE(a)},
aB(a){if(typeof a=="string")return J.br.prototype
if(a==null)return a
if(Array.isArray(a))return J.A.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cR.prototype
if(typeof a=="bigint")return J.cQ.prototype
return a}if(a instanceof A.n)return a
return J.kE(a)},
hN(a){if(a==null)return a
if(Array.isArray(a))return J.A.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cR.prototype
if(typeof a=="bigint")return J.cQ.prototype
return a}if(a instanceof A.n)return a
return J.kE(a)},
tF(a){if(typeof a=="number")return J.cO.prototype
if(typeof a=="string")return J.br.prototype
if(a==null)return a
if(!(a instanceof A.n))return J.cn.prototype
return a},
nd(a){if(typeof a=="string")return J.br.prototype
if(a==null)return a
if(!(a instanceof A.n))return J.cn.prototype
return a},
tG(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cR.prototype
if(typeof a=="bigint")return J.cQ.prototype
return a}if(a instanceof A.n)return a
return J.kE(a)},
bF(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.cA(a).M(a,b)},
lA(a,b){return J.nd(a).dl(a,b)},
lB(a,b,c){return J.tG(a).dm(a,b,c)},
nQ(a,b){return J.tF(a).a4(a,b)},
lC(a,b){return J.hN(a).a3(a,b)},
nR(a){return J.hN(a).gZ(a)},
aP(a){return J.cA(a).gA(a)},
kS(a){return J.aB(a).gC(a)},
cD(a){return J.hN(a).gE(a)},
bi(a){return J.aB(a).gm(a)},
kT(a){return J.cA(a).gI(a)},
lD(a,b,c){return J.hN(a).aZ(a,b,c)},
b0(a){return J.cA(a).k(a)},
kU(a,b){return J.hN(a).dK(a,b)},
fq:function fq(){},
fs:function fs(){},
dY:function dY(){},
dZ:function dZ(){},
bt:function bt(){},
fO:function fO(){},
cn:function cn(){},
b3:function b3(){},
cQ:function cQ(){},
cR:function cR(){},
A:function A(a){this.$ti=a},
fr:function fr(){},
iv:function iv(a){this.$ti=a},
bI:function bI(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cO:function cO(){},
dX:function dX(){},
ft:function ft(){},
br:function br(){}},A={kZ:function kZ(){},
o2(a,b,c){if(t.d.b(a))return new A.ex(a,b.h("@<0>").v(c).h("ex<1,2>"))
return new A.bM(a,b.h("@<0>").v(c).h("bM<1,2>"))},
oF(a){return new A.c_("Field '"+a+"' has been assigned during initialization.")},
oH(a){return new A.c_("Field '"+a+"' has not been initialized.")},
oG(a){return new A.c_("Field '"+a+"' has already been initialized.")},
kF(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
b9(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
iX(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
kw(a,b,c){return a},
lu(a){var s,r
for(s=$.at.length,r=0;r<s;++r)if(a===$.at[r])return!0
return!1},
la(a,b,c,d){A.ea(b,"start")
if(c!=null){A.ea(c,"end")
if(b>c)A.v(A.Y(b,0,c,"start",null))}return new A.ej(a,b,c,d.h("ej<0>"))},
c3(a,b,c,d){if(t.d.b(a))return new A.bX(a,b,c.h("@<0>").v(d).h("bX<1,2>"))
return new A.c2(a,b,c.h("@<0>").v(d).h("c2<1,2>"))},
it(){return new A.ax("No element")},
lT(){return new A.ax("Too few elements")},
hj:function hj(a){this.a=0
this.b=a},
dv:function dv(){},
dQ:function dQ(a,b){this.a=a
this.$ti=b},
bM:function bM(a,b){this.a=a
this.$ti=b},
ex:function ex(a,b){this.a=a
this.$ti=b},
bN:function bN(a,b){this.a=a
this.$ti=b},
i_:function i_(a,b){this.a=a
this.b=b},
c_:function c_(a){this.a=a},
kM:function kM(){},
iO:function iO(){},
q:function q(){},
W:function W(){},
ej:function ej(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
b5:function b5(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c2:function c2(a,b,c){this.a=a
this.b=b
this.$ti=c},
bX:function bX(a,b,c){this.a=a
this.b=b
this.$ti=c},
e3:function e3(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
X:function X(a,b,c){this.a=a
this.b=b
this.$ti=c},
co:function co(a,b){this.a=a
this.$ti=b},
ep:function ep(a,b){this.a=a
this.$ti=b},
ag:function ag(){},
nn(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uz(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
J(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.b0(a)
return s},
c9(a){var s,r=$.m4
if(r==null)r=$.m4=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
l3(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.c(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
fS(a){var s,r,q,p
if(a instanceof A.n)return A.as(A.b_(a),null)
s=J.cA(a)
if(s===B.a1||s===B.a3||t.bI.b(a)){r=B.v(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.as(A.b_(a),null)},
mb(a){var s,r,q
if(a==null||typeof a=="number"||A.hG(a))return J.b0(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bn)return a.k(0)
if(a instanceof A.aX)return a.dg(!0)
s=$.nN()
for(r=0;r<1;++r){q=s[r].hy(a)
if(q!=null)return q}return"Instance of '"+A.fS(a)+"'"},
pk(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
av(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.a1(s,10)|55296)>>>0,s&1023|56320)}}throw A.e(A.Y(a,0,1114111,null,null))},
pl(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.am(h,1000)
g+=B.c.ad(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
ar(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fR(a){return a.c?A.ar(a).getUTCFullYear()+0:A.ar(a).getFullYear()+0},
m9(a){return a.c?A.ar(a).getUTCMonth()+1:A.ar(a).getMonth()+1},
m5(a){return a.c?A.ar(a).getUTCDate()+0:A.ar(a).getDate()+0},
m6(a){return a.c?A.ar(a).getUTCHours()+0:A.ar(a).getHours()+0},
m8(a){return a.c?A.ar(a).getUTCMinutes()+0:A.ar(a).getMinutes()+0},
ma(a){return a.c?A.ar(a).getUTCSeconds()+0:A.ar(a).getSeconds()+0},
m7(a){return a.c?A.ar(a).getUTCMilliseconds()+0:A.ar(a).getMilliseconds()+0},
pj(a){var s=a.$thrownJsError
if(s==null)return null
return A.aO(s)},
iM(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.Z(a,s)
a.$thrownJsError=s
s.stack=b.k(0)}},
tI(a){throw A.e(A.lq(a))},
c(a,b){if(a==null)J.bi(a)
throw A.e(A.kz(a,b))},
kz(a,b){var s,r="index"
if(!A.hH(b))return new A.aE(!0,b,r,null)
s=A.U(J.bi(a))
if(b<0||b>=s)return A.io(b,s,a,null,r)
return A.l4(b,r)},
tB(a,b,c){if(a>c)return A.Y(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.Y(b,a,c,"end",null)
return new A.aE(!0,b,"end",null)},
lq(a){return new A.aE(!0,a,null,null)},
e(a){return A.Z(a,new Error())},
Z(a,b){var s
if(a==null)a=new A.ba()
b.dartException=a
s=A.tY
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
tY(){return J.b0(this.dartException)},
v(a,b){throw A.Z(a,b==null?new Error():b)},
Q(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.v(A.qQ(a,b,c),s)},
qQ(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.ek("'"+s+"': Cannot "+o+" "+l+k+n)},
cC(a){throw A.e(A.am(a))},
bb(a){var s,r,q,p,o,n
a=A.nl(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.w([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.jn(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
jo(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
mj(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
l_(a,b){var s=b==null,r=s?null:b.method
return new A.fu(a,r,s?null:b.receiver)},
a_(a){var s
if(a==null)return new A.iH(a)
if(a instanceof A.dV){s=a.a
return A.bD(a,s==null?A.a3(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bD(a,a.dartException)
return A.rq(a)},
bD(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
rq(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.a1(r,16)&8191)===10)switch(q){case 438:return A.bD(a,A.l_(A.J(s)+" (Error "+q+")",null))
case 445:case 5007:A.J(s)
return A.bD(a,new A.e9())}}if(a instanceof TypeError){p=$.nw()
o=$.nx()
n=$.ny()
m=$.nz()
l=$.nC()
k=$.nD()
j=$.nB()
$.nA()
i=$.nF()
h=$.nE()
g=p.a6(s)
if(g!=null)return A.bD(a,A.l_(A.L(s),g))
else{g=o.a6(s)
if(g!=null){g.method="call"
return A.bD(a,A.l_(A.L(s),g))}else if(n.a6(s)!=null||m.a6(s)!=null||l.a6(s)!=null||k.a6(s)!=null||j.a6(s)!=null||m.a6(s)!=null||i.a6(s)!=null||h.a6(s)!=null){A.L(s)
return A.bD(a,new A.e9())}}return A.bD(a,new A.hb(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.ef()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bD(a,new A.aE(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.ef()
return a},
aO(a){var s
if(a instanceof A.dV)return a.b
if(a==null)return new A.eO(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.eO(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kN(a){if(a==null)return J.aP(a)
if(typeof a=="object")return A.c9(a)
return J.aP(a)},
tD(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.i(0,a[s],a[r])}return b},
r_(a,b,c,d,e,f){t.Z.a(a)
switch(A.U(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.e(A.lQ("Unsupported number of arguments for wrapped closure"))},
dJ(a,b){var s=a.$identity
if(!!s)return s
s=A.tx(a,b)
a.$identity=s
return s},
tx(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.r_)},
oe(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.h1().constructor.prototype):Object.create(new A.cH(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.lN(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.oa(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.lN(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
oa(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.e("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.o_)}throw A.e("Error in functionType of tearoff")},
ob(a,b,c,d){var s=A.lK
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
lN(a,b,c,d){if(c)return A.od(a,b,d)
return A.ob(b.length,d,a,b)},
oc(a,b,c,d){var s=A.lK,r=A.o0
switch(b?-1:a){case 0:throw A.e(new A.fX("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
od(a,b,c){var s,r
if($.lI==null)$.lI=A.lH("interceptor")
if($.lJ==null)$.lJ=A.lH("receiver")
s=b.length
r=A.oc(s,c,a,b)
return r},
lr(a){return A.oe(a)},
o_(a,b){return A.eV(v.typeUniverse,A.b_(a.a),b)},
lK(a){return a.a},
o0(a){return a.b},
lH(a){var s,r,q,p=new A.cH("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.e(A.bj("Field name "+a+" not found.",null))},
ne(a){return v.getIsolateTag(a)},
f0(){throw A.e(new A.hB(null))},
uy(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
tO(a){var s,r,q,p,o,n=A.L($.ng.$1(a)),m=$.kA[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kJ[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.mR($.n9.$2(a,n))
if(q!=null){m=$.kA[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.kJ[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.kL(s)
$.kA[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.kJ[n]=s
return s}if(p==="-"){o=A.kL(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.ni(a,s)
if(p==="*")throw A.e(A.ml(n))
if(v.leafTags[n]===true){o=A.kL(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.ni(a,s)},
ni(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.lv(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
kL(a){return J.lv(a,!1,null,!!a.$iap)},
tQ(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.kL(s)
else return J.lv(s,c,null,null)},
tK(){if(!0===$.lt)return
$.lt=!0
A.tL()},
tL(){var s,r,q,p,o,n,m,l
$.kA=Object.create(null)
$.kJ=Object.create(null)
A.tJ()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.nk.$1(o)
if(n!=null){m=A.tQ(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
tJ(){var s,r,q,p,o,n,m=B.M()
m=A.dI(B.N,A.dI(B.O,A.dI(B.w,A.dI(B.w,A.dI(B.P,A.dI(B.Q,A.dI(B.R(B.v),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.ng=new A.kG(p)
$.n9=new A.kH(o)
$.nk=new A.kI(n)},
dI(a,b){return a(b)||b},
qf(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.c(b,s)
if(!J.bF(r,b[s]))return!1}return!0},
tz(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
kY(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.e(A.R("Illegal RegExp pattern ("+String(o)+")",a,null))},
tT(a,b,c){var s=a.indexOf(b,c)
return s>=0},
nc(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
nl(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
lx(a,b,c){var s
if(typeof b=="string")return A.tV(a,b,c)
if(b instanceof A.cP){s=b.gcV()
s.lastIndex=0
return a.replace(s,A.nc(c))}return A.tU(a,b,c)},
tU(a,b,c){var s,r,q,p
for(s=J.lA(b,a),s=s.gE(s),r=0,q="";s.t();){p=s.gB()
q=q+a.substring(r,p.gbE())+c
r=p.gbo()}s=q+a.substring(r)
return s.charCodeAt(0)==0?s:s},
tV(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.nl(b),"g"),A.nc(c))},
eL:function eL(a,b){this.a=a
this.b=b},
eM:function eM(a,b){this.a=a
this.b=b},
bg:function bg(a){this.a=a},
dR:function dR(){},
i4:function i4(a,b,c){this.a=a
this.b=b
this.c=c},
bS:function bS(a,b,c){this.a=a
this.b=b
this.$ti=c},
eD:function eD(a,b){this.a=a
this.$ti=b},
cs:function cs(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
dS:function dS(){},
b1:function b1(a,b,c){this.a=a
this.b=b
this.$ti=c},
ec:function ec(){},
jn:function jn(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
e9:function e9(){},
fu:function fu(a,b,c){this.a=a
this.b=b
this.c=c},
hb:function hb(a){this.a=a},
iH:function iH(a){this.a=a},
dV:function dV(a,b){this.a=a
this.b=b},
eO:function eO(a){this.a=a
this.b=null},
bn:function bn(){},
fd:function fd(){},
fe:function fe(){},
h3:function h3(){},
h1:function h1(){},
cH:function cH(a,b){this.a=a
this.b=b},
fX:function fX(a){this.a=a},
hB:function hB(a){this.a=a},
b4:function b4(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
iw:function iw(a){this.a=a},
iA:function iA(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
c0:function c0(a,b){this.a=a
this.$ti=b},
e1:function e1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
c1:function c1(a,b){this.a=a
this.$ti=b},
N:function N(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
kG:function kG(a){this.a=a},
kH:function kH(a){this.a=a},
kI:function kI(a){this.a=a},
aX:function aX(){},
cv:function cv(){},
dA:function dA(){},
cP:function cP(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
dz:function dz(a){this.b=a},
hf:function hf(a,b,c){this.a=a
this.b=b
this.c=c},
hg:function hg(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
ei:function ei(a,b){this.a=a
this.c=b},
hv:function hv(a,b,c){this.a=a
this.b=b
this.c=c},
hw:function hw(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
r(a){throw A.Z(A.oH(a),new Error())},
bE(a){throw A.Z(A.oG(a),new Error())},
nm(a){throw A.Z(A.oF(a),new Error())},
mr(a){var s=new A.jN(a)
return s.b=s},
jN:function jN(a){this.a=a
this.b=null},
qM(a){return a},
bC(a){var s,r,q
if(t.aP.b(a))return a
s=J.aB(a)
r=A.cU(s.gm(a),null,!1,t.z)
for(q=0;q<s.gm(a);++q)B.b.i(r,q,s.p(a,q))
return r},
oP(a){return new Int8Array(a)},
l1(a){return new Uint8Array(a)},
m2(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bh(a,b,c){if(a>>>0!==a||a>=c)throw A.e(A.kz(b,a))},
qN(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.e(A.tB(a,b,c))
return b},
bv:function bv(){},
cW:function cW(){},
e6:function e6(){},
hA:function hA(a){this.a=a},
e4:function e4(){},
a8:function a8(){},
e5:function e5(){},
aq:function aq(){},
fB:function fB(){},
fC:function fC(){},
fD:function fD(){},
fE:function fE(){},
fF:function fF(){},
fG:function fG(){},
fH:function fH(){},
e7:function e7(){},
e8:function e8(){},
eG:function eG(){},
eH:function eH(){},
eI:function eI(){},
eJ:function eJ(){},
l5(a,b){var s=b.c
return s==null?b.c=A.eT(a,"V",[b.x]):s},
me(a){var s=a.w
if(s===6||s===7)return A.me(a.x)
return s===11||s===12},
pp(a){return a.as},
tS(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
aZ(a){return A.kg(v.typeUniverse,a,!1)},
cz(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cz(a1,s,a3,a4)
if(r===s)return a2
return A.mD(a1,r,!0)
case 7:s=a2.x
r=A.cz(a1,s,a3,a4)
if(r===s)return a2
return A.mC(a1,r,!0)
case 8:q=a2.y
p=A.dH(a1,q,a3,a4)
if(p===q)return a2
return A.eT(a1,a2.x,p)
case 9:o=a2.x
n=A.cz(a1,o,a3,a4)
m=a2.y
l=A.dH(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.lf(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dH(a1,j,a3,a4)
if(i===j)return a2
return A.mE(a1,k,i)
case 11:h=a2.x
g=A.cz(a1,h,a3,a4)
f=a2.y
e=A.rn(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.mB(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dH(a1,d,a3,a4)
o=a2.x
n=A.cz(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.lg(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.e(A.f5("Attempted to substitute unexpected RTI kind "+a0))}},
dH(a,b,c,d){var s,r,q,p,o=b.length,n=A.kk(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cz(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
ro(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.kk(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cz(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
rn(a,b,c,d){var s,r=b.a,q=A.dH(a,r,c,d),p=b.b,o=A.dH(a,p,c,d),n=b.c,m=A.ro(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hn()
s.a=q
s.b=o
s.c=m
return s},
w(a,b){a[v.arrayRti]=b
return a},
ls(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.tH(s)
return a.$S()}return null},
tM(a,b){var s
if(A.me(b))if(a instanceof A.bn){s=A.ls(a)
if(s!=null)return s}return A.b_(a)},
b_(a){if(a instanceof A.n)return A.h(a)
if(Array.isArray(a))return A.P(a)
return A.lm(J.cA(a))},
P(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
h(a){var s=a.$ti
return s!=null?s:A.lm(a)},
lm(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.qY(a,s)},
qY(a,b){var s=a instanceof A.bn?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.qo(v.typeUniverse,s.name)
b.$ccache=r
return r},
tH(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.kg(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
nf(a){return A.aN(A.h(a))},
lp(a){var s
if(a instanceof A.aX)return a.cR()
s=a instanceof A.bn?A.ls(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kT(a).a
if(Array.isArray(a))return A.P(a)
return A.b_(a)},
aN(a){var s=a.r
return s==null?a.r=new A.kf(a):s},
tC(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.c(q,0)
s=A.eV(v.typeUniverse,A.lp(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.c(q,r)
s=A.mF(v.typeUniverse,s,A.lp(q[r]))}return A.eV(v.typeUniverse,s,a)},
aC(a){return A.aN(A.kg(v.typeUniverse,a,!1))},
qX(a){var s=this
s.b=A.rl(s)
return s.b(a)},
rl(a){var s,r,q,p,o
if(a===t.K)return A.r5
if(A.cB(a))return A.r9
s=a.w
if(s===6)return A.qV
if(s===1)return A.n_
if(s===7)return A.r0
r=A.rk(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cB)){a.f="$i"+q
if(q==="t")return A.r3
if(a===t.m)return A.r2
return A.r8}}else if(s===10){p=A.tz(a.x,a.y)
o=p==null?A.n_:p
return o==null?A.a3(o):o}return A.qT},
rk(a){if(a.w===8){if(a===t.S)return A.hH
if(a===t.i||a===t.q)return A.r4
if(a===t.N)return A.r7
if(a===t.y)return A.hG}return null},
qW(a){var s=this,r=A.qS
if(A.cB(s))r=A.qG
else if(s===t.K)r=A.a3
else if(A.dK(s)){r=A.qU
if(s===t.h6)r=A.m
else if(s===t.dk)r=A.mR
else if(s===t.fQ)r=A.qE
else if(s===t.cg)r=A.mQ
else if(s===t.cD)r=A.qF
else if(s===t.bX)r=A.aM}else if(s===t.S)r=A.U
else if(s===t.N)r=A.L
else if(s===t.y)r=A.hF
else if(s===t.q)r=A.mP
else if(s===t.i)r=A.aY
else if(s===t.m)r=A.l
s.a=r
return s.a(a)},
qT(a){var s=this
if(a==null)return A.dK(s)
return A.tN(v.typeUniverse,A.tM(a,s),s)},
qV(a){if(a==null)return!0
return this.x.b(a)},
r8(a){var s,r=this
if(a==null)return A.dK(r)
s=r.f
if(a instanceof A.n)return!!a[s]
return!!J.cA(a)[s]},
r3(a){var s,r=this
if(a==null)return A.dK(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.n)return!!a[s]
return!!J.cA(a)[s]},
r2(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.n)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
mZ(a){if(typeof a=="object"){if(a instanceof A.n)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
qS(a){var s=this
if(a==null){if(A.dK(s))return a}else if(s.b(a))return a
throw A.Z(A.mV(a,s),new Error())},
qU(a){var s=this
if(a==null||s.b(a))return a
throw A.Z(A.mV(a,s),new Error())},
mV(a,b){return new A.eR("TypeError: "+A.ms(a,A.as(b,null)))},
ms(a,b){return A.fl(a)+": type '"+A.as(A.lp(a),null)+"' is not a subtype of type '"+b+"'"},
aA(a,b){return new A.eR("TypeError: "+A.ms(a,b))},
r0(a){var s=this
return s.x.b(a)||A.l5(v.typeUniverse,s).b(a)},
r5(a){return a!=null},
a3(a){if(a!=null)return a
throw A.Z(A.aA(a,"Object"),new Error())},
r9(a){return!0},
qG(a){return a},
n_(a){return!1},
hG(a){return!0===a||!1===a},
hF(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Z(A.aA(a,"bool"),new Error())},
qE(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Z(A.aA(a,"bool?"),new Error())},
aY(a){if(typeof a=="number")return a
throw A.Z(A.aA(a,"double"),new Error())},
qF(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aA(a,"double?"),new Error())},
hH(a){return typeof a=="number"&&Math.floor(a)===a},
U(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Z(A.aA(a,"int"),new Error())},
m(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Z(A.aA(a,"int?"),new Error())},
r4(a){return typeof a=="number"},
mP(a){if(typeof a=="number")return a
throw A.Z(A.aA(a,"num"),new Error())},
mQ(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aA(a,"num?"),new Error())},
r7(a){return typeof a=="string"},
L(a){if(typeof a=="string")return a
throw A.Z(A.aA(a,"String"),new Error())},
mR(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Z(A.aA(a,"String?"),new Error())},
l(a){if(A.mZ(a))return a
throw A.Z(A.aA(a,"JSObject"),new Error())},
aM(a){if(a==null)return a
if(A.mZ(a))return a
throw A.Z(A.aA(a,"JSObject?"),new Error())},
n5(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.as(a[q],b)
return s},
rg(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.n5(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.as(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
mW(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.w([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.l(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.c(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.as(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.as(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.as(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.as(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.as(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
as(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.as(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.as(a.x,b)+">"
if(l===8){p=A.rp(a.x)
o=a.y
return o.length>0?p+("<"+A.n5(o,b)+">"):p}if(l===10)return A.rg(a,b)
if(l===11)return A.mW(a,b,null)
if(l===12)return A.mW(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.c(b,n)
return b[n]}return"?"},
rp(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
qp(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
qo(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.kg(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eU(a,5,"#")
q=A.kk(s)
for(p=0;p<s;++p)q[p]=r
o=A.eT(a,b,q)
n[b]=o
return o}else return m},
qn(a,b){return A.mN(a.tR,b)},
qm(a,b){return A.mN(a.eT,b)},
kg(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.mz(A.mx(a,null,b,!1))
r.set(b,s)
return s},
eV(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.mz(A.mx(a,b,c,!0))
q.set(c,r)
return r},
mF(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.lf(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
bB(a,b){b.a=A.qW
b.b=A.qX
return b},
eU(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aH(null,null)
s.w=b
s.as=c
r=A.bB(a,s)
a.eC.set(c,r)
return r},
mD(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.qk(a,b,r,c)
a.eC.set(r,s)
return s},
qk(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cB(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.dK(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.aH(null,null)
q.w=6
q.x=b
q.as=c
return A.bB(a,q)},
mC(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.qi(a,b,r,c)
a.eC.set(r,s)
return s},
qi(a,b,c,d){var s,r
if(d){s=b.w
if(A.cB(b)||b===t.K)return b
else if(s===1)return A.eT(a,"V",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.aH(null,null)
r.w=7
r.x=b
r.as=c
return A.bB(a,r)},
ql(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aH(null,null)
s.w=13
s.x=b
s.as=q
r=A.bB(a,s)
a.eC.set(q,r)
return r},
eS(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
qh(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
eT(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.eS(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aH(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.bB(a,r)
a.eC.set(p,q)
return q},
lf(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.eS(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aH(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.bB(a,o)
a.eC.set(q,n)
return n},
mE(a,b,c){var s,r,q="+"+(b+"("+A.eS(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aH(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.bB(a,s)
a.eC.set(q,r)
return r},
mB(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.eS(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.eS(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.qh(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aH(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.bB(a,p)
a.eC.set(r,o)
return o},
lg(a,b,c,d){var s,r=b.as+("<"+A.eS(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.qj(a,b,c,r,d)
a.eC.set(r,s)
return s},
qj(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.kk(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cz(a,b,r,0)
m=A.dH(a,c,r,0)
return A.lg(a,n,m,c!==m)}}l=new A.aH(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.bB(a,l)},
mx(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
mz(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.qa(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.my(a,r,l,k,!1)
else if(q===46)r=A.my(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cu(a.u,a.e,k.pop()))
break
case 94:k.push(A.ql(a.u,k.pop()))
break
case 35:k.push(A.eU(a.u,5,"#"))
break
case 64:k.push(A.eU(a.u,2,"@"))
break
case 126:k.push(A.eU(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.qc(a,k)
break
case 38:A.qb(a,k)
break
case 63:p=a.u
k.push(A.mD(p,A.cu(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.mC(p,A.cu(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.q9(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.mA(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.qe(a.u,a.e,o)
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
return A.cu(a.u,a.e,m)},
qa(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
my(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.qp(s,o.x)[p]
if(n==null)A.v('No "'+p+'" in "'+A.pp(o)+'"')
d.push(A.eV(s,o,n))}else d.push(p)
return m},
qc(a,b){var s,r=a.u,q=A.mw(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eT(r,p,q))
else{s=A.cu(r,a.e,p)
switch(s.w){case 11:b.push(A.lg(r,s,q,a.n))
break
default:b.push(A.lf(r,s,q))
break}}},
q9(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.mw(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cu(p,a.e,o)
q=new A.hn()
q.a=s
q.b=n
q.c=m
b.push(A.mB(p,r,q))
return
case-4:b.push(A.mE(p,b.pop(),s))
return
default:throw A.e(A.f5("Unexpected state under `()`: "+A.J(o)))}},
qb(a,b){var s=b.pop()
if(0===s){b.push(A.eU(a.u,1,"0&"))
return}if(1===s){b.push(A.eU(a.u,4,"1&"))
return}throw A.e(A.f5("Unexpected extended operation "+A.J(s)))},
mw(a,b){var s=b.splice(a.p)
A.mA(a.u,a.e,s)
a.p=b.pop()
return s},
cu(a,b,c){if(typeof c=="string")return A.eT(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.qd(a,b,c)}else return c},
mA(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cu(a,b,c[s])},
qe(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cu(a,b,c[s])},
qd(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.e(A.f5("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.e(A.f5("Bad index "+c+" for "+b.k(0)))},
tN(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.a0(a,b,null,c,null)
r.set(c,s)}return s},
a0(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cB(d))return!0
s=b.w
if(s===4)return!0
if(A.cB(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.a0(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.a0(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.a0(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.a0(a,b.x,c,d,e))return!1
return A.a0(a,A.l5(a,b),c,d,e)}if(s===6)return A.a0(a,p,c,d,e)&&A.a0(a,b.x,c,d,e)
if(q===7){if(A.a0(a,b,c,d.x,e))return!0
return A.a0(a,b,c,A.l5(a,d),e)}if(q===6)return A.a0(a,b,c,p,e)||A.a0(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.g)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.a0(a,j,c,i,e)||!A.a0(a,i,e,j,c))return!1}return A.mY(a,b.x,c,d.x,e)}if(q===11){if(b===t.g)return!0
if(p)return!1
return A.mY(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.r1(a,b,c,d,e)}if(o&&q===10)return A.r6(a,b,c,d,e)
return!1},
mY(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.a0(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.a0(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.a0(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.a0(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.a0(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
r1(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.eV(a,b,r[o])
return A.mO(a,p,null,c,d.y,e)}return A.mO(a,b.y,null,c,d.y,e)},
mO(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.a0(a,b[s],d,e[s],f))return!1
return!0},
r6(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.a0(a,r[s],c,q[s],e))return!1
return!0},
dK(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cB(a))if(s!==6)r=s===7&&A.dK(a.x)
return r},
cB(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
mN(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
kk(a){return a>0?new Array(a):v.typeUniverse.sEA},
aH:function aH(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hn:function hn(){this.c=this.b=this.a=null},
kf:function kf(a){this.a=a},
hm:function hm(){},
eR:function eR(a){this.a=a},
pX(){var s,r,q
if(self.scheduleImmediate!=null)return A.rr()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dJ(new A.jH(s),1)).observe(r,{childList:true})
return new A.jG(s,r,q)}else if(self.setImmediate!=null)return A.rs()
return A.rt()},
pY(a){self.scheduleImmediate(A.dJ(new A.jI(t.M.a(a)),0))},
pZ(a){self.setImmediate(A.dJ(new A.jJ(t.M.a(a)),0))},
q_(a){A.lb(B.y,t.M.a(a))},
lb(a,b){var s=B.c.ad(a.a,1000)
return A.qg(s<0?0:s,b)},
qg(a,b){var s=new A.hz()
s.eb(a,b)
return s},
H(a){return new A.es(new A.p($.u,a.h("p<0>")),a.h("es<0>"))},
G(a,b){a.$2(0,null)
b.b=!0
return b.a},
y(a,b){A.qH(a,b)},
F(a,b){b.D(a)},
E(a,b){b.aU(A.a_(a),A.aO(a))},
qH(a,b){var s,r,q=new A.kl(b),p=new A.km(b)
if(a instanceof A.p)a.df(q,p,t.z)
else{s=t.z
if(a instanceof A.p)a.bw(q,p,s)
else{r=new A.p($.u,t._)
r.a=8
r.c=a
r.df(q,p,s)}}},
I(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.u.cm(new A.ku(s),t.H,t.S,t.z)},
hV(a){var s
if(t.C.b(a)){s=a.gaG()
if(s!=null)return s}return B.o},
lR(a,b){var s=a==null?b.a(a):a,r=new A.p($.u,b.h("p<0>"))
r.ao(s)
return r},
mX(a,b){if($.u===B.d)return null
return null},
ln(a,b){if($.u!==B.d)A.mX(a,b)
if(b==null)if(t.C.b(a)){b=a.gaG()
if(b==null){A.iM(a,B.o)
b=B.o}}else b=B.o
else if(t.C.b(a))A.iM(a,b)
return new A.af(a,b)},
dx(a,b){var s=new A.p($.u,b.h("p<0>"))
b.a(a)
s.a=8
s.c=a
return s},
jV(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mf()
b.b6(new A.af(new A.aE(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.d2(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aQ()
b.b8(o.a)
A.cr(b,p)
return}b.a^=2
A.dG(null,null,b.b,t.M.a(new A.jW(o,b)))},
cr(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.dF(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cr(d.a,c)
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
A.dF(j.a,j.b)
return}g=$.u
if(g!==h)$.u=h
else g=null
c=c.c
if((c&15)===8)new A.k_(q,d,n).$0()
else if(o){if((c&1)!==0)new A.jZ(q,j).$0()}else if((c&2)!==0)new A.jY(d,q).$0()
if(g!=null)$.u=g
c=q.c
if(c instanceof A.p){p=q.a.$ti
p=p.h("V<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bk(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jV(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bk(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
n1(a,b){var s
if(t.W.b(a))return b.cm(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.e(A.f4(a,"onError",u.c))},
rb(){var s,r
for(s=$.dE;s!=null;s=$.dE){$.f_=null
r=s.b
$.dE=r
if(r==null)$.eZ=null
s.a.$0()}},
rm(){$.lo=!0
try{A.rb()}finally{$.f_=null
$.lo=!1
if($.dE!=null)$.ly().$1(A.nb())}},
n7(a){var s=new A.hh(a),r=$.eZ
if(r==null){$.dE=$.eZ=s
if(!$.lo)$.ly().$1(A.nb())}else $.eZ=r.b=s},
rh(a){var s,r,q,p=$.dE
if(p==null){A.n7(a)
$.f_=$.eZ
return}s=new A.hh(a)
r=$.f_
if(r==null){s.b=p
$.dE=$.f_=s}else{q=r.b
s.b=q
$.f_=r.b=s
if(q==null)$.eZ=s}},
lw(a){var s=null,r=$.u
if(B.d===r){A.dG(s,s,B.d,a)
return}A.dG(s,s,r,t.M.a(r.c8(a)))},
ub(a,b){A.kw(a,"stream",t.K)
return new A.hu(b.h("hu<0>"))},
aU(a,b,c,d){var s=null
return c?new A.dC(b,s,s,a,d.h("dC<0>")):new A.du(b,s,s,a,d.h("du<0>"))},
mg(a){return new A.et(null,null,a.h("et<0>"))},
hI(a){var s,r,q
if(a==null)return
try{a.$0()}catch(q){s=A.a_(q)
r=A.aO(q)
A.dF(A.a3(s),t.l.a(r))}},
q3(a,b,c,d,e,f){var s=$.u,r=e?1:0,q=c!=null?32:0,p=A.ld(s,b,f),o=A.mq(s,c),n=d==null?A.na():d
return new A.be(a,p,o,t.M.a(n),s,r|q,f.h("be<0>"))},
ld(a,b,c){var s=b==null?A.ru():b
return t.a7.v(c).h("1(2)").a(s)},
mq(a,b){if(b==null)b=A.rv()
if(t.k.b(b))return a.cm(b,t.z,t.K,t.l)
if(t.u.b(b))return t.v.a(b)
throw A.e(A.bj("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
rc(a){},
re(a,b){A.dF(A.a3(a),t.l.a(b))},
rd(){},
qL(a,b,c){var s=a.P()
if(s!==$.dM())s.b2(new A.kn(b,c))
else b.bM(c)},
jj(a,b){var s=$.u
if(s===B.d)return A.lb(a,t.M.a(b))
return A.lb(a,t.M.a(s.c8(b)))},
dF(a,b){A.rh(new A.ks(a,b))},
n2(a,b,c,d,e){var s,r=$.u
if(r===c)return d.$0()
$.u=c
s=r
try{r=d.$0()
return r}finally{$.u=s}},
n4(a,b,c,d,e,f,g){var s,r=$.u
if(r===c)return d.$1(e)
$.u=c
s=r
try{r=d.$1(e)
return r}finally{$.u=s}},
n3(a,b,c,d,e,f,g,h,i){var s,r=$.u
if(r===c)return d.$2(e,f)
$.u=c
s=r
try{r=d.$2(e,f)
return r}finally{$.u=s}},
dG(a,b,c,d){t.M.a(d)
if(B.d!==c){d=c.c8(d)
d=d}A.n7(d)},
jH:function jH(a){this.a=a},
jG:function jG(a,b,c){this.a=a
this.b=b
this.c=c},
jI:function jI(a){this.a=a},
jJ:function jJ(a){this.a=a},
hz:function hz(){this.b=null},
ke:function ke(a,b){this.a=a
this.b=b},
es:function es(a,b){this.a=a
this.b=!1
this.$ti=b},
kl:function kl(a){this.a=a},
km:function km(a){this.a=a},
ku:function ku(a){this.a=a},
af:function af(a,b){this.a=a
this.b=b},
eu:function eu(a,b){this.a=a
this.$ti=b},
aW:function aW(a,b,c,d,e,f,g){var _=this
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
ev:function ev(){},
et:function et(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.r=_.f=_.e=_.d=null
_.$ti=c},
ew:function ew(){},
ac:function ac(a,b){this.a=a
this.$ti=b},
aK:function aK(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
p:function p(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
jS:function jS(a,b){this.a=a
this.b=b},
jX:function jX(a,b){this.a=a
this.b=b},
jW:function jW(a,b){this.a=a
this.b=b},
jU:function jU(a,b){this.a=a
this.b=b},
jT:function jT(a,b){this.a=a
this.b=b},
k_:function k_(a,b,c){this.a=a
this.b=b
this.c=c},
k0:function k0(a,b){this.a=a
this.b=b},
k1:function k1(a){this.a=a},
jZ:function jZ(a,b){this.a=a
this.b=b},
jY:function jY(a,b){this.a=a
this.b=b},
hh:function hh(a){this.a=a
this.b=null},
aa:function aa(){},
iU:function iU(a,b){this.a=a
this.b=b},
iV:function iV(a,b){this.a=a
this.b=b},
iS:function iS(a){this.a=a},
iT:function iT(a,b,c){this.a=a
this.b=b
this.c=c},
eh:function eh(){},
cw:function cw(){},
kd:function kd(a){this.a=a},
kc:function kc(a){this.a=a},
hy:function hy(){},
hi:function hi(){},
du:function du(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
dC:function dC(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
M:function M(a,b){this.a=a
this.$ti=b},
be:function be(a,b,c,d,e,f,g){var _=this
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null
_.$ti=g},
cx:function cx(a,b){this.a=a
this.$ti=b},
ad:function ad(){},
jM:function jM(a,b,c){this.a=a
this.b=b
this.c=c},
jL:function jL(a){this.a=a},
dB:function dB(){},
bf:function bf(){},
aJ:function aJ(a,b){this.b=a
this.a=null
this.$ti=b},
cp:function cp(a,b){this.b=a
this.c=b
this.a=null},
hl:function hl(){},
aL:function aL(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
k8:function k8(a,b){this.a=a
this.b=b},
dw:function dw(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hu:function hu(a){this.$ti=a},
kn:function kn(a,b){this.a=a
this.b=b},
eY:function eY(){},
hs:function hs(){},
ka:function ka(a,b){this.a=a
this.b=b},
kb:function kb(a,b,c){this.a=a
this.b=b
this.c=c},
ks:function ks(a,b){this.a=a
this.b=b},
mu(a,b){var s=a[b]
return s===a?null:s},
mv(a,b,c){if(c==null)a[b]=a
else a[b]=c},
q4(){var s=Object.create(null)
A.mv(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
oK(a,b){return new A.b4(a.h("@<0>").v(b).h("b4<1,2>"))},
z(a,b,c){return b.h("@<0>").v(c).h("m_<1,2>").a(A.tD(a,new A.b4(b.h("@<0>").v(c).h("b4<1,2>"))))},
o(a,b){return new A.b4(a.h("@<0>").v(b).h("b4<1,2>"))},
oL(a){return new A.eE(a.h("eE<0>"))},
le(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
oM(a,b){var s,r,q=A.oL(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.cC)(a),++r)q.l(0,b.a(a[r]))
return q},
l0(a){var s,r
if(A.lu(a))return"{...}"
s=new A.ab("")
try{r={}
B.b.l($.at,a)
s.a+="{"
r.a=!0
a.a_(0,new A.iC(r,s))
s.a+="}"}finally{if(0>=$.at.length)return A.c($.at,-1)
$.at.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
oN(a){return 8},
q8(a,b){return new A.ct(a,a.c,a.d,a.b,b.h("ct<0>"))},
ez:function ez(){},
eC:function eC(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
eA:function eA(a,b){this.a=a
this.$ti=b},
eB:function eB(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
eE:function eE(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hq:function hq(a){this.a=a
this.b=null},
eF:function eF(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
D:function D(){},
T:function T(){},
iC:function iC(a,b){this.a=a
this.b=b},
e2:function e2(a,b){var _=this
_.a=a
_.d=_.c=_.b=0
_.$ti=b},
ct:function ct(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null
_.$ti=e},
bz:function bz(){},
eN:function eN(){},
rf(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.a_(r)
q=A.R(String(s),null,null)
throw A.e(q)}q=A.ko(p)
return q},
ko(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.ho(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.ko(a[s])
return a},
qC(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.nM()
else s=new Uint8Array(o)
for(r=J.aB(a),q=0;q<o;++q){p=r.p(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
qB(a,b,c,d){var s=a?$.nL():$.nK()
if(s==null)return null
if(0===c&&d===b.length)return A.mM(s,b)
return A.mM(s,b.subarray(c,d))},
mM(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
lG(a,b,c,d,e,f){if(B.c.am(f,4)!==0)throw A.e(A.R("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.e(A.R("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.e(A.R("Invalid base64 padding, more than two '=' characters",a,b))},
q2(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.c.a1(a1,2),f=a1&3,e=$.lz()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.c(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.c(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.Q(d)
m=d.length
if(!(a0<m))return A.c(d,a0)
d[a0]=g>>>16&255
a0=k+1
if(!(k<m))return A.c(d,k)
d[k]=g>>>8&255
k=a0+1
if(!(a0<m))return A.c(d,a0)
d[a0]=g&255
a0=k
g=0}continue}else if(l===-1&&f>1){if(o>127)break
if(f===3){if((g&3)!==0)throw A.e(A.R(i,a,p))
k=a0+1
q&2&&A.Q(d)
s=d.length
if(!(a0<s))return A.c(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.c(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.e(A.R(i,a,p))
q&2&&A.Q(d)
if(!(a0<d.length))return A.c(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.mp(a,p+1,c,-j-1)}throw A.e(A.R(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.c(a,p)
if(a.charCodeAt(p)>127)break}throw A.e(A.R(h,a,p))},
q0(a,b,c,d){var s=A.q1(a,b,c),r=(d&3)+(s-b),q=B.c.a1(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.nI()},
q1(a,b,c){var s,r=a.length,q=c,p=q,o=0
for(;;){if(!(p>b&&o<2))break
A:{--p
if(!(p>=0&&p<r))return A.c(a,p)
s=a.charCodeAt(p)
if(s===61){++o
q=p
break A}if((s|32)===100){if(p===b)break;--p
if(!(p>=0&&p<r))return A.c(a,p)
s=a.charCodeAt(p)}if(s===51){if(p===b)break;--p
if(!(p>=0&&p<r))return A.c(a,p)
s=a.charCodeAt(p)}if(s===37){++o
q=p
break A}break}}return q},
mp(a,b,c,d){var s,r,q
if(b===c)return d
s=-d-1
for(r=a.length;s>0;){if(!(b<r))return A.c(a,b)
q=a.charCodeAt(b)
if(s===3){if(q===61){s-=3;++b
break}if(q===37){--s;++b
if(b===c)break
if(!(b<r))return A.c(a,b)
q=a.charCodeAt(b)}else break}if((s>3?s-3:s)===2){if(q!==51)break;++b;--s
if(b===c)break
if(!(b<r))return A.c(a,b)
q=a.charCodeAt(b)}if((q|32)!==100)break;++b;--s
if(b===c)break}if(b!==c)throw A.e(A.R("Invalid padding character",a,b))
return-s-1},
lZ(a,b,c){return new A.e_(a,b)},
qP(a){return a.j()},
q5(a,b){return new A.k5(a,[],A.ty())},
q7(a,b,c){var s,r=new A.ab("")
A.q6(a,r,b,c)
s=r.a
return s.charCodeAt(0)==0?s:s},
q6(a,b,c,d){var s=A.q5(b,c)
s.bx(a)},
qD(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
ho:function ho(a,b){this.a=a
this.b=b
this.c=null},
hp:function hp(a){this.a=a},
ki:function ki(){},
kh:function kh(){},
f7:function f7(){},
f9:function f9(){},
f8:function f8(){},
jK:function jK(){this.a=0},
bR:function bR(){},
aQ:function aQ(){},
fk:function fk(){},
e_:function e_(a,b){this.a=a
this.b=b},
fw:function fw(a,b){this.a=a
this.b=b},
fv:function fv(){},
fy:function fy(a){this.b=a},
fx:function fx(a){this.a=a},
k6:function k6(){},
k7:function k7(a,b){this.a=a
this.b=b},
k5:function k5(a,b,c){this.c=a
this.a=b
this.b=c},
hd:function hd(){},
he:function he(){},
kj:function kj(a){this.b=this.a=0
this.c=a},
el:function el(a){this.a=a},
hD:function hD(a){this.a=a
this.b=16
this.c=0},
f1(a){var s=A.l3(a,null)
if(s!=null)return s
throw A.e(A.R(a,null,null))},
ou(a,b){a=A.Z(a,new Error())
if(a==null)a=A.a3(a)
a.stack=b.k(0)
throw a},
cU(a,b,c,d){var s,r=c?J.lW(a,d):J.lV(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
oO(a,b,c){var s,r,q=A.w([],c.h("A<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.cC)(a),++r)B.b.l(q,c.a(a[r]))
q.$flags=1
return q},
a2(a,b){var s,r
if(Array.isArray(a))return A.w(a.slice(0),b.h("A<0>"))
s=A.w([],b.h("A<0>"))
for(r=J.cD(a);r.t();)B.b.l(s,r.gB())
return s},
iB(a,b){var s=A.oO(a,!1,b)
s.$flags=3
return s},
mh(a,b,c){var s,r
A.ea(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.e(A.Y(c,b,null,"end",null))
if(s===0)return""}r=A.pC(a,b,c)
return r},
pB(a){return A.av(A.U(a))},
pC(a,b,c){var s=a.length
if(b>=s)return""
return A.pk(a,b,c==null||c>s?s:c)},
bw(a){return new A.cP(a,A.kY(a,!1,!0,!1,!1,""))},
l9(a,b,c){var s=J.cD(b)
if(!s.t())return a
if(c.length===0){do a+=A.J(s.gB())
while(s.t())}else{a+=A.J(s.gB())
while(s.t())a=a+c+A.J(s.gB())}return a},
mf(){return A.aO(new Error())},
ol(a,b,c,d,e,f,g,h,i){var s="microsecond",r=A.pl(a,b,c,d,e,f,g,h,i)
if(r==null)return null
if(h>999)A.v(A.Y(h,0,999,s,null))
if(r<-864e13||r>864e13)A.v(A.Y(r,-864e13,864e13,"millisecondsSinceEpoch",null))
if(r===864e13&&h!==0)A.v(A.f4(h,s,"Time including microseconds is outside valid range"))
A.kw(i,"isUtc",t.y)
return new A.aF(r,h,i)},
on(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.nr().h8(a)
if(c!=null){s=new A.ia()
r=c.b
if(1>=r.length)return A.c(r,1)
q=r[1]
q.toString
p=A.f1(q)
if(2>=r.length)return A.c(r,2)
q=r[2]
q.toString
o=A.f1(q)
if(3>=r.length)return A.c(r,3)
q=r[3]
q.toString
n=A.f1(q)
if(4>=r.length)return A.c(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.c(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.c(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.c(r,7)
j=new A.ib().$1(r[7])
i=B.c.ad(j,1000)
q=r.length
if(8>=q)return A.c(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.c(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.c(r,10)
q=r[10]
q.toString
e=A.f1(q)
if(11>=r.length)return A.c(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.ol(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.e(A.R("Time out of range",a,null))
return d}else throw A.e(A.R("Invalid date format",a,null))},
lP(a){var s,r
try{s=A.on(a)
return s}catch(r){if(A.a_(r) instanceof A.ao)return null
else throw r}},
lO(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
om(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
i9(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
b2(a){if(a>=10)return""+a
return"0"+a},
fl(a){if(typeof a=="number"||A.hG(a)||a==null)return J.b0(a)
if(typeof a=="string")return JSON.stringify(a)
return A.mb(a)},
ov(a,b){A.kw(a,"error",t.K)
A.kw(b,"stackTrace",t.l)
A.ou(a,b)},
f5(a){return new A.dO(a)},
bj(a,b){return new A.aE(!1,null,b,a)},
f4(a,b,c){return new A.aE(!0,a,b,c)},
md(a){var s=null
return new A.dj(s,s,!1,s,s,a)},
l4(a,b){return new A.dj(null,null,!0,a,b,"Value not in range")},
Y(a,b,c,d,e){return new A.dj(b,c,!0,a,d,"Invalid value")},
aw(a,b,c){if(0>a||a>c)throw A.e(A.Y(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.e(A.Y(b,a,c,"end",null))
return b}return c},
ea(a,b){if(a<0)throw A.e(A.Y(a,0,null,b,null))
return a},
io(a,b,c,d,e){return new A.fo(b,!0,a,e,"Index out of range")},
bc(a){return new A.ek(a)},
ml(a){return new A.ha(a)},
b8(a){return new A.ax(a)},
am(a){return new A.fh(a)},
lQ(a){return new A.jR(a)},
R(a,b,c){return new A.ao(a,b,c)},
oA(a,b,c){var s,r
if(A.lu(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.w([],t.s)
B.b.l($.at,a)
try{A.ra(a,s)}finally{if(0>=$.at.length)return A.c($.at,-1)
$.at.pop()}r=A.l9(b,t.e.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
iu(a,b,c){var s,r
if(A.lu(a))return b+"..."+c
s=new A.ab(b)
B.b.l($.at,a)
try{r=s
r.a=A.l9(r.a,a,", ")}finally{if(0>=$.at.length)return A.c($.at,-1)
$.at.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
ra(a,b){var s,r,q,p,o,n,m,l=a.gE(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.t())return
s=A.J(l.gB())
B.b.l(b,s)
k+=s.length+2;++j}if(!l.t()){if(j<=5)return
if(0>=b.length)return A.c(b,-1)
r=b.pop()
if(0>=b.length)return A.c(b,-1)
q=b.pop()}else{p=l.gB();++j
if(!l.t()){if(j<=4){B.b.l(b,A.J(p))
return}r=A.J(p)
if(0>=b.length)return A.c(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gB();++j
for(;l.t();p=o,o=n){n=l.gB();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2;--j}B.b.l(b,"...")
return}}q=A.J(p)
r=A.J(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.l(b,m)
B.b.l(b,q)
B.b.l(b,r)},
m1(a,b,c,d,e){return new A.bN(a,b.h("@<0>").v(c).v(d).v(e).h("bN<1,2,3,4>"))},
l2(a,b,c,d){var s
if(B.j===c){s=B.c.gA(a)
b=J.aP(b)
return A.iX(A.b9(A.b9($.hP(),s),b))}if(B.j===d){s=B.c.gA(a)
b=J.aP(b)
c=J.aP(c)
return A.iX(A.b9(A.b9(A.b9($.hP(),s),b),c))}s=B.c.gA(a)
b=J.aP(b)
c=J.aP(c)
d=J.aP(d)
d=A.iX(A.b9(A.b9(A.b9(A.b9($.hP(),s),b),c),d))
return d},
pf(a){var s,r,q=$.hP()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.cC)(a),++r)q=A.b9(q,J.aP(a[r]))
return A.iX(q)},
pS(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.c(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.mm(a4<a4?B.a.u(a5,0,a4):a5,5,a3).gdI()
else if(s===32)return A.mm(B.a.u(a5,5,a4),0,a3).gdI()}r=A.cU(8,0,!1,t.S)
B.b.i(r,0,0)
B.b.i(r,1,-1)
B.b.i(r,2,-1)
B.b.i(r,7,-1)
B.b.i(r,3,0)
B.b.i(r,4,0)
B.b.i(r,5,a4)
B.b.i(r,6,a4)
if(A.n6(a5,0,a4,0,r)>=14)B.b.i(r,7,a4)
q=r[1]
if(q>=0)if(A.n6(a5,0,q,20,r)===20)r[7]=q
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
if(!(i&&o+1===n)){if(!B.a.O(a5,"\\",n))if(p>0)h=B.a.O(a5,"\\",p-1)||B.a.O(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.O(a5,"..",n)))h=m>n+2&&B.a.O(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.O(a5,"file",0)){if(p<=0){if(!B.a.O(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.u(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.a.aC(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.O(a5,"http",0)){if(i&&o+3===n&&B.a.O(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.aC(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.O(a5,"https",0)){if(i&&o+4===n&&B.a.O(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.aC(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.ht(a4<a5.length?B.a.u(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.lk(a5,0,q)
else{if(q===0)A.dD(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.qw(a5,c,p-1):""
a=A.qt(a5,p,o,!1)
i=o+1
if(i<n){a0=A.l3(B.a.u(a5,i,n),a3)
d=A.lj(a0==null?A.v(A.R("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.qu(a5,n,m,a3,j,a!=null)
a2=m<l?A.qv(a5,m+1,l,a3):a3
return A.lh(j,b,a,d,a1,a2,l<a4?A.qs(a5,l+1,a4):a3)},
hc(a,b,c){throw A.e(A.R("Illegal IPv4 address, "+a,b,c))},
pP(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.c(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.hc("each part must be in the range 0..255",a,r)}A.hc("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.hc(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.Q(d)
if(!(k<16))return A.c(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.hc(j,a,q)
p=l}A.hc("IPv4 address should contain exactly 4 parts",a,q)},
pQ(a,b,c){var s
if(b===c)throw A.e(A.R("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.c(a,b)
if(a.charCodeAt(b)===118){s=A.pR(a,b,c)
if(s!=null)throw A.e(s)
return!1}A.mn(a,b,c)
return!0},
pR(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.c(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.ao(n,a,q)
r=q
break}return new A.ao("Unexpected character",a,q-1)}if(r-1===b)return new A.ao(n,a,r)
return new A.ao("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.ao("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.c(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.c(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.ao("Invalid IPvFuture address character",a,r)}},
mn(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.jt(a3)
if(a5-a4<2)a2.$2("address is too short",null)
s=new Uint8Array(16)
r=a3.length
if(!(a4>=0&&a4<r))return A.c(a3,a4)
q=-1
p=0
if(a3.charCodeAt(a4)===58){o=a4+1
if(!(o<r))return A.c(a3,o)
if(a3.charCodeAt(o)===58){n=a4+2
m=n
q=0
p=1}else{a2.$2("invalid start colon",a4)
n=a4
m=n}}else{n=a4
m=n}for(l=0,k=!0;;){if(n>=a5)j=0
else{if(!(n<r))return A.c(a3,n)
j=a3.charCodeAt(n)}A:{i=j^48
h=!1
if(i<=9)g=i
else{f=j|32
if(f>=97&&f<=102)g=f-87
else break A
k=h}if(n<m+4){l=l*16+g;++n
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.pP(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.a1(l,8)
if(!(o<16))return A.c(s,o)
s[o]=e;++o
if(!(o<16))return A.c(s,o)
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
B.k.ab(s,a0,16,s,a)
B.k.h7(s,a,a0,0)}}return s},
lh(a,b,c,d,e,f,g){return new A.eW(a,b,c,d,e,f,g)},
mG(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
dD(a,b,c){throw A.e(A.R(c,a,b))},
lj(a,b){if(a!=null&&a===A.mG(b))return null
return a},
qt(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.c(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.c(a,r)
if(a.charCodeAt(r)!==93)A.dD(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.c(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.qr(a,q,r)
if(o<r){n=o+1
p=A.mL(a,B.a.O(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.pQ(a,q,o)
l=B.a.u(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.c(a,k)
if(a.charCodeAt(k)===58){o=B.a.aB(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.mL(a,B.a.O(a,"25",n)?o+3:n,c,"%25")}else p=""
A.mn(a,b,o)
return"["+B.a.u(a,b,o)+p+"]"}}return A.qy(a,b,c)},
qr(a,b,c){var s=B.a.aB(a,"%",b)
return s>=b&&s<c?s:c},
mL(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.ab(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.c(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.ll(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.ab("")
l=h.a+=B.a.u(a,q,r)
if(m)n=B.a.u(a,r,r+3)
else if(n==="%")A.dD(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.ab("")
if(q<r){h.a+=B.a.u(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.c(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.u(a,q,r)
if(h==null){h=new A.ab("")
m=h}else m=h
m.a+=i
l=A.li(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.u(a,b,c)
if(q<c){i=B.a.u(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
qy(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.c(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.ll(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.ab("")
k=B.a.u(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.u(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.ab("")
if(q<r){p.a+=B.a.u(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.dD(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.c(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.u(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.ab("")
l=p}else l=p
l.a+=k
j=A.li(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.u(a,b,c)
if(q<c){k=B.a.u(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
lk(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.c(a,b)
if(!A.mI(a.charCodeAt(b)))A.dD(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.c(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.dD(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.u(a,b,c)
return A.qq(q?a.toLowerCase():a)},
qq(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
qw(a,b,c){return A.eX(a,b,c,16,!1,!1)},
qu(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eX(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.L(s,"/"))s="/"+s
return A.qx(s,e,f)},
qx(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.L(a,"/")&&!B.a.L(a,"\\"))return A.qz(a,!s||c)
return A.qA(a)},
qv(a,b,c,d){if(a!=null)return A.eX(a,b,c,256,!0,!1)
return null},
qs(a,b,c){return A.eX(a,b,c,256,!0,!1)},
ll(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.c(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.c(a,l)
q=a.charCodeAt(l)
p=A.kF(r)
o=A.kF(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.c(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.av(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.u(a,b,b+3).toUpperCase()
return null},
li(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<=127){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.c(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.c.fG(a,6*p)&63|q
if(!(o<r))return A.c(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.c(k,l)
if(!(m<r))return A.c(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.c(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.mh(s,0,null)},
eX(a,b,c,d,e,f){var s=A.mK(a,b,c,d,e,f)
return s==null?B.a.u(a,b,c):s},
mK(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.c(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.ll(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.dD(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.c(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.li(n)}if(o==null){o=new A.ab("")
k=o}else k=o
k.a=(k.a+=B.a.u(a,p,q))+l
if(typeof m!=="number")return A.tI(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.u(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
mJ(a){if(B.a.L(a,"."))return!0
return B.a.hb(a,"/.")!==-1},
qA(a){var s,r,q,p,o,n,m
if(!A.mJ(a))return a
s=A.w([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.c(s,-1)
s.pop()
if(s.length===0)B.b.l(s,"")}p=!0}else{p="."===n
if(!p)B.b.l(s,n)}}if(p)B.b.l(s,"")
return B.b.ak(s,"/")},
qz(a,b){var s,r,q,p,o,n
if(!A.mJ(a))return!b?A.mH(a):a
s=A.w([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gce(s)!==".."){if(0>=s.length)return A.c(s,-1)
s.pop()}else B.b.l(s,"..")
p=!0}else{p="."===n
if(!p)B.b.l(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.l(s,"")
if(!b){if(0>=s.length)return A.c(s,0)
B.b.i(s,0,A.mH(s[0]))}return B.b.ak(s,"/")},
mH(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.mI(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.u(a,0,s)+"%3A"+B.a.a8(a,s+1)
if(r<=127){if(!(r<128))return A.c(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
mI(a){var s=a|32
return 97<=s&&s<=122},
mm(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.w([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.e(A.R(k,a,r))}}if(q<0&&r>b)throw A.e(A.R(k,a,r))
while(p!==44){B.b.l(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.c(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.l(j,o)
else{n=B.b.gce(j)
if(p!==44||r!==n+7||!B.a.O(a,"base64",n+1))throw A.e(A.R("Expecting '='",a,r))
break}}B.b.l(j,r)
m=r+1
if((j.length&1)===1)a=B.J.hm(a,m,s)
else{l=A.mK(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aC(a,m,s,l)}return new A.js(a,j,c)},
n6(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.c(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.c(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.i(e,o>>>5,r)}return d},
mS(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.c(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
aF:function aF(a,b,c){this.a=a
this.b=b
this.c=c},
ia:function ia(){},
ib:function ib(){},
au:function au(a){this.a=a},
jO:function jO(){},
K:function K(){},
dO:function dO(a){this.a=a},
ba:function ba(){},
aE:function aE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dj:function dj(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
fo:function fo(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ek:function ek(a){this.a=a},
ha:function ha(a){this.a=a},
ax:function ax(a){this.a=a},
fh:function fh(a){this.a=a},
fN:function fN(){},
ef:function ef(){},
jR:function jR(a){this.a=a},
ao:function ao(a,b,c){this.a=a
this.b=b
this.c=c},
f:function f(){},
bu:function bu(a,b,c){this.a=a
this.b=b
this.$ti=c},
O:function O(){},
n:function n(){},
hx:function hx(){},
aT:function aT(a){this.a=a},
fW:function fW(a){var _=this
_.a=a
_.c=_.b=0
_.d=-1},
ab:function ab(a){this.a=a},
jt:function jt(a){this.a=a},
eW:function eW(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.y=_.w=$},
js:function js(a,b,c){this.a=a
this.b=b
this.c=c},
ht:function ht(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
hk:function hk(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.y=_.w=$},
oB(a,b){var s,r,q,p,o
if(b.length===0)return!1
s=b.split(".")
r=v.G
for(q=s.length,p=0;p<q;++p,r=o){o=r[s[p]]
A.aM(o)
if(o==null)return!1}return a instanceof t.g.a(r)},
iG:function iG(a){this.a=a},
cy(a){var s
if(typeof a=="function")throw A.e(A.bj("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.qJ,a)
s[$.kR()]=a
return s},
qJ(a,b,c){t.Z.a(a)
if(A.U(c)>=1)return a.$1(b)
return a.$0()},
qK(a,b,c,d){t.Z.a(a)
A.U(d)
if(d>=2)return a.$2(b,c)
if(d===1)return a.$1(b)
return a.$0()},
n0(a){return a==null||A.hG(a)||typeof a=="number"||typeof a=="string"||t.gj.b(a)||t.p.b(a)||t.go.b(a)||t.dQ.b(a)||t.h7.b(a)||t.an.b(a)||t.bv.b(a)||t.h4.b(a)||t.gN.b(a)||t.dI.b(a)||t.fd.b(a)},
nh(a){if(A.n0(a))return a
return new A.kK(new A.eC(t.hg)).$1(a)},
nj(a,b){var s=new A.p($.u,b.h("p<0>")),r=new A.ac(s,b.h("ac<0>"))
a.then(A.dJ(new A.kP(r,b),1),A.dJ(new A.kQ(r),1))
return s},
kK:function kK(a){this.a=a},
kP:function kP(a,b){this.a=a
this.b=b},
kQ:function kQ(a){this.a=a},
k3:function k3(a){this.a=a},
bo:function bo(){},
ee:function ee(a){this.$ti=a},
iQ:function iQ(a){this.a=a},
iR:function iR(a,b){this.a=a
this.b=b},
fi:function fi(){},
h9:function h9(){},
h8:function h8(){},
fn:function fn(){},
fj:function fj(){},
h_:function h_(){},
f2:function f2(){},
i1:function i1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=d},
fc:function fc(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
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
i2:function i2(a){this.a=a},
tR(a){var s,r,q,p,o=B.a.a7(a)
if(o.length===0)return!1
s=A.rj(a,o)
if(s.length===0)return!1
r=$.nO()
if(r.b.test(a))return!0
q=A.qI(B.b.gZ(s))
if(q==="cd")return!0
if(q==="git"){p=A.qR(A.la(s,1,null,A.P(s).c))
if(p==="config")return!B.b.V(s,"--get")&&!B.b.V(s,"--list")&&!B.b.V(s,"-l")
return!B.aS.V(0,p)}return!B.aR.V(0,q)},
rj(a,b){var s,r,q,p,o=B.a.dZ(b,A.bw("\\s+")),n=A.P(o).h("a5(1)").a(new A.kt())
o.$flags&1&&A.Q(o,16)
B.b.fA(o,n,!0)
for(s=0;n=o.length,s<n;){if(!(s>=0))return A.c(o,s)
r=o[s]
n=A.bw("^[A-Za-z_][A-Za-z0-9_]*=")
if(n.b.test(r)){++s
continue}q=B.a.cf(r,"/")
if(B.aP.V(0,q<0?r:B.a.a8(r,q+1))){++s
for(;;){n=o.length
if(!(s<n&&B.a.L(o[s],"-")))break
if(!(s<n))return A.c(o,s)
p=s+1
s=B.aQ.V(0,o[s])&&p<o.length?p+1:p}continue}break}return B.b.cB(o,s)},
qR(a){var s,r,q=a.hv(0)
for(s=0;s<q.length;s=(B.aT.V(0,r)?s+1:s)+1){r=q[s]
if(!B.a.L(r,"-"))return r}return""},
qI(a){var s=B.a.cf(a,"/")
return s<0?a:B.a.a8(a,s+1)},
kt:function kt(){},
of(a,b){var s=A.a2(a,t.N),r=s.length
if(r>b)return B.b.cB(s,r-b)
return s},
i3:function i3(a,b){this.a=a
this.b=b},
im:function im(a,b){var _=this
_.a=a
_.b=b
_.c=""
_.d=null},
i7(a,b){var s
if(b>=a.length)return null
s=a[b]
return s.length===0?null:s},
oj(a,b){var s,r,q,p,o,n=a.length,m=b.length,l=m-1
if(n<l)l=n
for(s=l;s>0;--s){q=n-s
p=0
for(;;){if(!(p<s)){r=!0
break}o=q+p
if(!(o>=0&&o<n))return A.c(a,o)
o=a[o]
if(!(p<m))return A.c(b,p)
if(o!==b[p]){r=!1
break}++p}if(r)return s}return 0},
oi(a,b){var s,r,q,p,o,n,m=b.length
if(m===0)return-1
s=a.length
r=s-m
for(q=0;q<=r;++q){o=0
for(;;){if(!(o<m)){p=!0
break}n=q+o
if(!(n<s))return A.c(a,n)
if(a[n]!==b[o]){p=!1
break}++o}if(p)return q}return-1},
i8:function i8(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
i6:function i6(a,b){this.a=a
this.b=b},
dn:function dn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iP:function iP(a,b){this.a=a
this.b=b},
fp:function fp(a,b,c,d,e,f,g,h,i){var _=this
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
is:function is(a){this.a=a},
oI(a){var s,r,q,p,o,n,m,l,k,j,i=J.aB(a)
if(i.gC(a))return""
s=i.gZ(a)
r=t.N
q=t.I
q.h("b(f.E)").a(A.hL())
q=q.h("f.E")
s=A.c3(new A.aT(s),A.hL(),q,r)
p=A.a2(s,A.h(s).h("f.E"))
for(i=i.bD(a,1),s=i.$ti,i=new A.b5(i,i.gm(0),s.h("b5<W.E>")),s=s.h("W.E");i.t();){o=i.d
o=A.c3(new A.aT(o==null?s.a(o):o),A.hL(),q,r)
n=A.a2(o,A.h(o).h("f.E"))
m=p.length
l=n.length
k=m<l?m:l
j=0
for(;;){if(j<k){if(!(j<m))return A.c(p,j)
o=p[j]
if(!(j<l))return A.c(n,j)
o=o===n[j]}else o=!1
if(!o)break;++j}p=B.b.a0(p,0,j)
if(p.length===0)break}return B.b.aj(p)},
oJ(a){var s,r,q,p,o,n=A.a2(new A.aT(a),t.I.h("f.E"))
for(s=n.length,r=0,q=0;q<s;){if(!(q>=0))return A.c(n,q)
if(n[q]===27){++q
if(q<s&&n[q]===91){++q
for(;;){p=q<s
if(p){o=n[q]
o=!(o>=64&&o<=126)}else o=!1
if(!o)break;++q}if(p)++q}continue}++r;++q}return r},
fA:function fA(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=e
_.r=f
_.w=g
_.x=h
_.y=i
_.as=_.z=null
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
iz:function iz(){},
eK:function eK(a,b){this.a=a
this.b=b},
bx:function bx(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.f=$
_.w=_.r=null
_.y=e},
dU:function dU(){},
py(a){var s
switch(a.a){case 0:s=B.T
break
case 1:s=B.U
break
case 2:s=B.L
break
default:s=null}return s},
dm:function dm(){},
fP:function fP(){},
fQ:function fQ(){},
ff:function ff(){},
tE(a,b,a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g=a0!=null&&a0.length!==0,f=A.ri(b),e=a3==null,d=new A.kD(a1,f,b,g,a0,a,a2,e?"":" (\u26a0 "+a3+")"),c=0
if(a4>0){s=c
for(;;){if(!(s<5)){c=4
break}if(new A.aT(d.$1(s)).gm(0)+16<=a4){c=s
break}++s}}r=B.q[c].a
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
ri(a){var s,r=A.bw("[/\\\\]+$"),q=A.lx(a,r,""),p=B.a.cf(q,A.bw("[/\\\\]"))
if(p<0)return a
s=B.a.a8(q,p+1)
if(s.length===0)return a
return"\u2026/"+s},
kD:function kD(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
hC:function hC(){},
fT:function fT(a,b,c){this.a=a
this.b=b
this.c=c},
mc(a){var s,r,q=A.i(a,"term")
if(q==null)q="xterm-256color"
s=A.ah(a,"cols",80)
s.toString
r=A.ah(a,"rows",24)
r.toString
return new A.fV(q,s,r)},
fV:function fV(a,b,c){this.a=a
this.b=b
this.c=c},
l7(a){var s
A:{if("powershell"===a){s=B.aU
break A}if("cmd"===a){s=B.aV
break A}s=B.E
break A}return s},
ed:function ed(a,b){this.a=a
this.b=b},
aG:function aG(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
oT(a){var s=A.cS(a,"shells"),r=A.cS(a,"features"),q=A.ah(a,"maxSessions",50)
q.toString
return new A.fI(s,r,q,A.i(a,"directEndpoint"))},
fI:function fI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
b6:function b6(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
m3(a){var s,r=A.j(a,"os"),q=A.j(a,"arch"),p=A.i(a,"agentVersion")
if(p==null)p="unknown"
s=A.i(a,"hostname")
return new A.iL(r,q,p,s==null?"unknown":s)},
iL:function iL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
l6(a){var s
A:{if("shell"===a){s=B.D
break A}if("transfer"===a){s=B.aF
break A}if("drive"===a){s=B.aG
break A}if("tunnel"===a){s=B.aH
break A}s=B.aE
break A}return s},
px(a){var s
A:{if("opening"===a){s=B.aJ
break A}if("open"===a){s=B.aK
break A}if("closing"===a){s=B.aL
break A}if("closed"===a){s=B.aM
break A}if("attached"===a){s=B.aO
break A}s=B.aN
break A}return s},
cb:function cb(a,b){this.a=a
this.b=b},
by:function by(a,b){this.a=a
this.b=b},
aI:function aI(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
fJ:function fJ(a){this.a=a},
fM:function fM(a){this.a=a},
fU:function fU(a){this.a=a},
fY:function fY(a){this.a=a},
h7:function h7(a,b){this.a=a
this.b=b},
pW(a,b){var s=new A.eq(a,b,A.aU(null,null,!1,t.r),new A.ac(new A.p($.u,t.D),t.h))
s.e9(a,b)
return s},
eq:function eq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=!0},
jC:function jC(a){this.a=a},
jD:function jD(a){this.a=a},
fa:function fa(a,b,c,d,e,f,g,h){var _=this
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
hr:function hr(a,b,c){this.a=a
this.b=b
this.c=c},
o6(a,b){var s=new A.fb(a,A.o(t.S,t.dE),A.mg(t.R),b)
s.e5(a,b)
return s},
fb:function fb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=$
_.e=d
_.f=!1},
i0:function i0(){},
ow(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=A.j(b,"role")
r=A.bs(b,"protocolVersion")
q=A.ah(b,"minVersion",1)
q.toString
p=A.i(b,"nonce")
o=t.f
return new A.bp(s,r,q,p,o.b(b.p(0,"info"))?o.a(b.p(0,"info")).a2(0,t.N,t.z):B.al)},
nZ(a,b){A.m(a)
t.P.a(b)
return new A.bk(A.j(b,"method"),A.j(b,"principal"),A.i(b,"token"),A.i(b,"publicKey"),A.i(b,"signature"))},
nY(a,b){var s,r
A.m(a)
t.P.a(b)
s=A.j(b,"principal")
r=A.i(b,"displayName")
if(r==null)r=""
return new A.bK(s,r,A.cS(b,"roles"),A.j(b,"sessionToken"))},
nX(a,b){var s,r
A.m(a)
t.P.a(b)
s=A.i(b,"reason")
if(s==null)s="auth_failed"
r=A.i(b,"message")
return new A.bJ(s,r==null?"Authentication failed":r)},
p3(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"nodeId")
r=A.i(b,"uid")
q=A.i(b,"displayName")
if(q==null)q=""
return new A.d8(s,r,q,A.m3(A.e0(b.p(0,"platform"))),A.cT(b,"labels"))},
p4(a,b){A.m(a)
t.P.a(b)
return new A.d9(A.j(b,"nodeId"),A.bZ(b,"assignedAt"))},
oS(a,b){A.m(a)
return new A.cZ(A.oT(t.P.a(b)))},
p0(a,b){var s,r
A.m(a)
t.P.a(b)
s=A.j(b,"nodeId")
r=A.ah(b,"activeSessions",0)
r.toString
return new A.d5(s,r,A.bs(b,"seq"),A.bZ(b,"ts"))},
p_(a,b){A.m(a)
t.P.a(b)
return new A.d6(A.bs(b,"seq"),A.bZ(b,"ts"))},
ph(a,b){A.m(a)
t.P.a(b)
return new A.dh(A.j(b,"id"),A.bZ(b,"ts"))},
pi(a,b){A.m(a)
t.P.a(b)
return new A.c8(A.j(b,"id"),A.bZ(b,"ts"),A.bZ(b,"serverTs"))},
p1(a,b){A.m(a)
return new A.d7(A.cT(t.P.a(b),"filter"))},
p2(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=null
A.m(a)
s=t.P.a(a0).p(0,"nodes")
r=t.j.b(s)?s:B.ak
q=A.w([],t.g1)
for(p=J.cD(r);p.t();){o=A.e0(p.gB())
n=o.p(0,"capabilities")
m=A.i(o,"uid")
l=A.j(o,"nodeId")
k=B.a.a7(l)
if(k.length===0)A.v(B.av)
j=$.nt()
if(!j.b.test(k))A.v(A.a9('Invalid node id: "'+l+'"',b))
if(m==null)l=b
else{i=B.a.a7(m)
if(B.a.L(i,"nod_")||B.a.L(i,"hub_")){l=$.nu()
l=!l.b.test(i)}else l=!0
if(l)A.v(A.a9('Invalid UID: "'+m+'"',b))
l=new A.fM(i)}j=A.i(o,"displayName")
if(j==null)j=""
h=A.m3(A.e0(o.p(0,"platform")))
g=A.cT(o,"labels")
o=A.a1(o,"online")
if(n==null)f=b
else{f=A.e0(n)
e=A.cS(f,"shells")
d=A.cS(f,"features")
c=A.ah(f,"maxSessions",50)
c.toString
f=new A.fI(e,d,c,A.i(f,"directEndpoint"))}q.push(new A.b6(new A.fJ(k),l,j,h,g,o,f))}return new A.c4(q)},
ps(a,b){var s,r,q,p,o,n,m,l,k,j,i
A.m(a)
t.P.a(b)
s=b.p(0,"pty")
r=A.i(b,"shellFamily")
q=a==null?A.v(A.a4("session.open")):a
p=A.j(b,"nodeId")
o=A.i(b,"mode")
o=A.l6(o==null?"exec":o)
n=A.i(b,"command")
m=A.cS(b,"args")
l=A.cT(b,"env")
k=A.i(b,"cwd")
j=s==null?null:A.mc(A.e0(s))
i=A.i(b,"resumeSessionId")
return new A.cc(q,p,o,n,m,l,k,j,i,r==null?null:A.l7(r))},
pt(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("session.opened")):a
r=A.j(b,"sessionId")
q=A.a1(b,"pty")
p=A.a1(b,"altScreen")
o=A.i(b,"shell")
return new A.cd(s,r,q,p,o==null?"posix":o)},
pu(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("session.rejected")):a
r=A.i(b,"reason")
if(r==null)r="session_rejected"
q=A.i(b,"message")
return new A.ce(s,r,q==null?"Session rejected":q)},
p7(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
A.m(a)
t.P.a(b)
s=b.p(0,"pty")
r=A.i(b,"shellFamily")
q=a==null?A.v(A.a4("node.session.open")):a
p=A.j(b,"sessionId")
o=A.j(b,"principal")
n=A.i(b,"mode")
n=A.l6(n==null?"exec":n)
m=A.i(b,"command")
l=A.cS(b,"args")
k=A.cT(b,"env")
j=A.i(b,"cwd")
i=s==null?null:A.mc(A.e0(s))
h=A.i(b,"resumeSessionId")
return new A.dc(q,p,o,n,m,l,k,j,i,h,r==null?null:A.l7(r))},
p8(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.session.opened")):a
r=A.j(b,"sessionId")
q=A.ah(b,"pid",null)
p=A.a1(b,"altScreen")
o=A.i(b,"shell")
return new A.dd(s,r,q,p,o==null?"posix":o)},
p9(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.session.rejected")):a
r=A.i(b,"sessionId")
if(r==null)r=""
q=A.i(b,"reason")
if(q==null)q="session_rejected"
p=A.i(b,"message")
return new A.de(s,r,q,p==null?"Session rejected":p)},
o7(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("channel.resize")):a
r=A.ah(b,"cols",80)
r.toString
q=A.ah(b,"rows",24)
q.toString
return new A.bP(s,r,q)},
o8(a,b){var s
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("channel.signal")):a
return new A.bQ(s,A.j(b,"signal"))},
o4(a,b){var s,r
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("channel.eof")):a
r=A.i(b,"stream")
return new A.cI(s,r==null?"stdin":r)},
o5(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("channel.exit")):a
r=A.ah(b,"exitCode",0)
r.toString
q=A.i(b,"signal")
p=A.fz(b,"ts")
return new A.bO(s,r,q,p==null?new A.aF(Date.now(),0,!1).N():p)},
o3(a,b){var s,r
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("channel.close")):a
r=A.i(b,"reason")
if(r==null)r="normal"
return new A.bl(s,r,A.i(b,"message"))},
o9(a,b){var s,r
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("channel.window")):a
r=A.i(b,"stream")
if(r==null)r="stdout"
return new A.bm(s,r,A.bs(b,"credit"))},
pm(a,b){var s,r
A.m(a)
t.P.a(b)
s=A.i(b,"code")
if(s==null)s="protocol_error"
r=A.i(b,"message")
if(r==null)r="Protocol error"
return new A.di(s,r,A.a1(b,"fatal"),a)},
pq(a,b){var s
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("session.detach.request")):a
return new A.dk(s,A.ah(b,"timeoutSeconds",null))},
p5(a,b){var s
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.session.detach")):a
return new A.da(s,A.j(b,"sessionId"),A.j(b,"principal"),A.ah(b,"timeoutSeconds",null))},
p6(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.session.detached")):a
r=A.j(b,"sessionId")
q=A.i(b,"shortId")
if(q==null)q=""
return new A.db(s,r,q,A.fz(b,"expiresAt"))},
pr(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("session.detached")):a
r=A.j(b,"sessionId")
q=A.i(b,"shortId")
if(q==null)q=""
return new A.ca(s,r,q,A.fz(b,"expiresAt"))},
oq(a,b){A.m(a)
t.P.a(b)
return new A.cL(A.j(b,"requestId"),A.j(b,"nodeId"))},
oW(a,b){A.m(a)
t.P.a(b)
return new A.d1(A.j(b,"requestId"),A.j(b,"principal"))},
oX(a,b){A.m(a)
t.P.a(b)
return new A.d2(A.j(b,"requestId"),A.mU(b.p(0,"sessions")))},
or(a,b){A.m(a)
t.P.a(b)
return new A.bV(A.j(b,"requestId"),A.mU(b.p(0,"sessions")))},
oo(a,b){A.m(a)
t.P.a(b)
return new A.cK(A.j(b,"requestId"),A.j(b,"nodeId"),A.j(b,"sessionRef"))},
oU(a,b){A.m(a)
t.P.a(b)
return new A.d_(A.j(b,"requestId"),A.j(b,"principal"),A.j(b,"sessionRef"))},
oV(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
return new A.d0(s,r,q==null?"":q)},
op(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
return new A.bU(s,r,q==null?"":q)},
nS(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"nodeId")
q=A.i(b,"sessionRef")
if(q==null)q=""
return new A.cE(s,r,q,A.ah(b,"timeoutSeconds",null))},
oR(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"principal")
q=A.i(b,"sessionRef")
if(q==null)q=""
return new A.cX(s,r,q,A.ah(b,"timeoutSeconds",null))},
oQ(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"shortId")
if(q==null)q=""
p=A.i(b,"message")
return new A.cY(s,r,q,p==null?"":p)},
nT(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"shortId")
if(q==null)q=""
p=A.i(b,"message")
return new A.bG(s,r,q,p==null?"":p)},
pv(a,b){A.m(a)
t.P.a(b)
return new A.dl(A.j(b,"requestId"),A.j(b,"nodeId"),A.j(b,"sessionRef"))},
pa(a,b){A.m(a)
t.P.a(b)
return new A.df(A.j(b,"requestId"),A.j(b,"principal"),A.j(b,"sessionRef"))},
pb(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
if(q==null)q=""
p=A.i(b,"screen")
if(p==null)p=""
return new A.dg(s,r,q,p,A.a1(b,"altScreen"))},
pw(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
if(q==null)q=""
p=A.i(b,"screen")
if(p==null)p=""
return new A.cf(s,r,q,p,A.a1(b,"altScreen"))},
mT(a){var s,r
if(!t.j.b(a))return B.ai
s=J.kU(a,t.f)
r=s.$ti
r=A.c3(s,r.h("aR(f.E)").a(new A.kp()),r.h("f.E"),t.o)
s=A.a2(r,A.h(r).h("f.E"))
s.$flags=1
return s},
os(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"nodeId")
q=A.j(b,"op")
p=A.i(b,"host")
o=t.fF.a(b.p(0,"credential"))
return new A.cM(s,r,q,p,o==null?null:o.a2(0,t.N,t.z))},
oY(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"principal")
q=A.j(b,"op")
p=A.i(b,"host")
o=t.fF.a(b.p(0,"credential"))
return new A.d3(s,r,q,p,o==null?null:o.a2(0,t.N,t.z))},
oZ(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
if(q==null)q=""
return new A.d4(s,r,q,A.mT(b.p(0,"entries")))},
ot(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
if(q==null)q=""
return new A.bW(s,r,q,A.mT(b.p(0,"entries")))},
mU(a){var s,r
if(!t.j.b(a))return B.aj
s=J.kU(a,t.f)
r=s.$ti
r=A.c3(s,r.h("aG(f.E)").a(new A.kq()),r.h("f.E"),t.U)
s=A.a2(r,A.h(r).h("f.E"))
return s},
pM(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"nodeId")
q=A.i(b,"targetHost")
if(q==null)q="localhost"
return new A.ds(s,r,q,A.bs(b,"targetPort"),A.ah(b,"publicPort",null),A.a1(b,"secure"))},
pN(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"tunnelId")
q=A.i(b,"publicHost")
if(q==null)q=""
return new A.ck(s,r,q,A.bs(b,"publicPort"),A.a1(b,"secure"))},
pO(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.i(b,"reason")
if(r==null)r="tunnel_rejected"
q=A.i(b,"message")
return new A.cl(s,r,q==null?"Tunnel rejected":q)},
pI(a,b){A.m(a)
t.P.a(b)
return new A.dq(A.j(b,"requestId"),A.j(b,"tunnelRef"))},
pJ(a,b){var s,r,q
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.a1(b,"ok")
q=A.i(b,"message")
return new A.ci(s,r,q==null?"":q)},
pK(a,b){A.m(a)
return new A.dr(A.j(t.P.a(b),"requestId"))},
pL(a,b){A.m(a)
t.P.a(b)
return new A.cj(A.j(b,"requestId"),A.qO(b.p(0,"tunnels")))},
pd(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.tunnel.connect")):a
r=A.j(b,"tunnelId")
q=A.i(b,"targetHost")
if(q==null)q="localhost"
p=A.bs(b,"targetPort")
o=A.i(b,"principal")
return new A.c5(s,r,q,p,o==null?"":o)},
pe(a,b){var s,r
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.tunnel.connected")):a
r=A.i(b,"tunnelId")
return new A.c7(s,r==null?"":r)},
pc(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=a==null?A.v(A.a4("node.tunnel.connect.failed")):a
r=A.i(b,"tunnelId")
if(r==null)r=""
q=A.i(b,"reason")
if(q==null)q="dial_failed"
p=A.i(b,"message")
return new A.c6(s,r,q,p==null?"":p)},
qO(a){var s,r
if(!t.j.b(a))return B.ah
s=J.kU(a,t.f)
r=s.$ti
r=A.c3(s,r.h("aI(f.E)").a(new A.kr()),r.h("f.E"),t.x)
s=A.a2(r,A.h(r).h("f.E"))
return s},
a4(a){return new A.ao("Control message '"+a+"' requires a channel id",null,null)},
nV(a,b){A.m(a)
return new A.cF(A.j(t.P.a(b),"requestId"))},
nW(a,b){A.m(a)
t.P.a(b)
return new A.bH(A.j(b,"requestId"),A.a1(b,"available"),A.i(b,"provider"),A.i(b,"model"),A.i(b,"plannerModel"),A.i(b,"executorModel"),A.i(b,"explainerModel"),A.i(b,"baseUrl"),A.i(b,"mode"),A.i(b,"language"))},
ox(a){var s
A:{if("hubDefault"===(a==null?null:B.a.a7(a))){s=B.a0
break A}s=B.z
break A}return s},
oy(a,b){var s,r,q,p,o
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.j(b,"method")
q=A.j(b,"url")
p=A.cT(b,"headers")
o=A.i(b,"body")
if(o==null)o=""
return new A.cN(s,r,q,p,o,A.ox(A.i(b,"credentialMode")),A.i(b,"provider"))},
oz(a,b){var s,r,q,p
A.m(a)
t.P.a(b)
s=A.j(b,"requestId")
r=A.ah(b,"statusCode",0)
r.toString
q=A.cT(b,"headers")
p=A.i(b,"body")
if(p==null)p=""
return new A.bq(s,r,q,p,A.i(b,"error"))},
k:function k(){},
bp:function bp(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
bk:function bk(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
bK:function bK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bJ:function bJ(a,b){this.a=a
this.b=b},
d8:function d8(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d9:function d9(a,b){this.a=a
this.b=b},
cZ:function cZ(a){this.a=a},
d5:function d5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
d6:function d6(a,b){this.a=a
this.b=b},
dh:function dh(a,b){this.a=a
this.b=b},
c8:function c8(a,b,c){this.a=a
this.b=b
this.c=c},
d7:function d7(a){this.a=a},
c4:function c4(a){this.a=a},
iF:function iF(){},
cc:function cc(a,b,c,d,e,f,g,h,i,j){var _=this
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
cd:function cd(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ce:function ce(a,b,c){this.a=a
this.b=b
this.c=c},
dc:function dc(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
dd:function dd(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
de:function de(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bP:function bP(a,b,c){this.a=a
this.b=b
this.c=c},
bQ:function bQ(a,b){this.a=a
this.b=b},
cI:function cI(a,b){this.a=a
this.b=b},
bO:function bO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bl:function bl(a,b,c){this.a=a
this.b=b
this.c=c},
bm:function bm(a,b,c){this.a=a
this.b=b
this.c=c},
di:function di(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dk:function dk(a,b){this.a=a
this.b=b},
da:function da(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
db:function db(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ca:function ca(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cL:function cL(a,b){this.a=a
this.b=b},
d1:function d1(a,b){this.a=a
this.b=b},
d2:function d2(a,b){this.a=a
this.b=b},
iD:function iD(){},
bV:function bV(a,b){this.a=a
this.b=b},
ic:function ic(){},
cK:function cK(a,b,c){this.a=a
this.b=b
this.c=c},
d_:function d_(a,b,c){this.a=a
this.b=b
this.c=c},
d0:function d0(a,b,c){this.a=a
this.b=b
this.c=c},
bU:function bU(a,b,c){this.a=a
this.b=b
this.c=c},
cE:function cE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cX:function cX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cY:function cY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bG:function bG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dl:function dl(a,b,c){this.a=a
this.b=b
this.c=c},
df:function df(a,b,c){this.a=a
this.b=b
this.c=c},
dg:function dg(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
cf:function cf(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
aR:function aR(a,b){this.a=a
this.b=b},
kp:function kp(){},
cM:function cM(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d3:function d3(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d4:function d4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iE:function iE(){},
bW:function bW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
id:function id(){},
kq:function kq(){},
ds:function ds(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ck:function ck(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
cl:function cl(a,b,c){this.a=a
this.b=b
this.c=c},
dq:function dq(a,b){this.a=a
this.b=b},
ci:function ci(a,b,c){this.a=a
this.b=b
this.c=c},
dr:function dr(a){this.a=a},
cj:function cj(a,b){this.a=a
this.b=b},
jl:function jl(){},
c5:function c5(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
c7:function c7(a,b){this.a=a
this.b=b},
c6:function c6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kr:function kr(){},
cF:function cF(a){this.a=a},
bH:function bH(a,b,c,d,e,f,g,h,i,j){var _=this
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
fm:function fm(a,b){this.a=a
this.b=b},
cN:function cN(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
bq:function bq(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ok(a){var s
A:{if(1===a){s=B.m
break A}if(2===a){s=B.W
break A}if(3===a){s=B.X
break A}s=A.v(A.a9("Unknown data opcode: 0x"+B.c.dH(a,16),null))}return s},
dT:function dT(a,b,c){this.c=a
this.a=b
this.b=c},
ij:function ij(a){this.a=a},
b7:function b7(){},
an:function an(a){this.a=a},
bT:function bT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
a9(a,b){return new A.aS(b==null?"protocol_error":b,a)},
fK:function fK(){},
aS:function aS(a,b){this.a=a
this.b=b},
f6:function f6(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b){this.a=a
this.b=b},
jm:function jm(a,b){this.a=a
this.b=b},
ch:function ch(a,b){this.a=a
this.b=b},
e0(a){if(t.f.b(a))return a.a2(0,t.N,t.z)
throw A.e(A.a9("Expected value to be a JSON object",null))},
j(a,b){var s=a.p(0,b)
if(typeof s=="string")return s
throw A.e(A.a9("Missing or invalid string field '"+b+"'",null))},
i(a,b){var s=a.p(0,b)
if(s==null)return null
if(typeof s=="string")return s
throw A.e(A.a9("Invalid string field '"+b+"'",null))},
bs(a,b){var s=a.p(0,b)
if(A.hH(s))return s
throw A.e(A.a9("Missing or invalid int field '"+b+"'",null))},
ah(a,b,c){var s=a.p(0,b)
if(s==null)return c
if(A.hH(s))return s
throw A.e(A.a9("Invalid int field '"+b+"'",null))},
a1(a,b){var s=a.p(0,b)
if(s==null)return!1
if(A.hG(s))return s
throw A.e(A.a9("Invalid bool field '"+b+"'",null))},
bZ(a,b){var s=A.lP(A.j(a,b))
if(s==null)throw A.e(A.a9("Invalid timestamp field '"+b+"'",null))
return s.N()},
fz(a,b){var s,r=A.i(a,b)
if(r==null)return null
s=A.lP(r)
if(s==null)throw A.e(A.a9("Invalid timestamp field '"+b+"'",null))
return s.N()},
cT(a,b){var s,r=a.p(0,b)
if(r==null)return B.A
if(t.f.b(r)){s=t.N
return r.dw(0,new A.iy(),s,s)}throw A.e(A.a9("Invalid map field '"+b+"'",null))},
cS(a,b){var s,r=a.p(0,b)
if(r==null)return B.r
if(t.j.b(r)){s=J.lD(r,new A.ix(),t.N)
s=A.a2(s,s.$ti.h("W.E"))
return s}throw A.e(A.a9("Invalid list field '"+b+"'",null))},
iy:function iy(){},
ix:function ix(){},
iW:function iW(){},
lE(a,b,c,d){return new A.aD(a,b)},
lF(a){if(a instanceof A.aD)return a
if(a instanceof A.f6)return new A.aD(B.G,"Authentication failed: "+a.b)
if(a instanceof A.ch)return new A.aD(B.l,"Connection failed: "+a.b)
if(a instanceof A.fK)return new A.aD(B.u,a.b)
return new A.aD(B.u,J.b0(a))},
dN:function dN(a,b){this.a=a
this.b=b},
aD:function aD(a,b){this.a=a
this.b=b},
pg(a){var s,r,q,p=null,o="Invalid Hub address: ",n=B.a.a7(a)
if(n.length===0)throw A.e(B.I)
s=B.a.V(n,"://")?n:"wss://"+n
r=null
try{r=A.pS(s)}catch(q){if(A.a_(q) instanceof A.ao)throw A.e(A.lE(B.l,o+a,p,p))
else throw q}if(r.gbq().length===0)throw A.e(A.lE(B.l,o+a,p,p))
if(r.gb4()!=="wss"&&r.gb4()!=="ws")return r.dD("wss")
return r},
fL:function fL(){this.b=null
this.e=!1},
iJ:function iJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fg:function fg(a,b,c){this.a=a
this.b=b
this.c=c},
pD(a,b,c,d,e){var s=new A.h4(c,e,a,b,d)
s.e7(a,b,c,d,e)
return s},
kx(){var s=0,r=A.H(t.dk),q
var $async$kx=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:s=3
return A.y(A.nj(A.l(A.l(A.l(A.l(v.G.window).navigator).clipboard).readText()),t.N),$async$kx)
case 3:q=b
s=1
break
case 1:return A.F(q,r)}})
return A.G($async$kx,r)},
ky(a){return A.tA(A.L(a))},
tA(a){var s=0,r=A.H(t.H)
var $async$ky=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:s=2
return A.y(A.nj(A.l(A.l(A.l(A.l(v.G.window).navigator).clipboard).writeText(a)),t.X),$async$ky)
case 2:return A.F(null,r)}})
return A.G($async$ky,r)},
h4:function h4(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.w=_.r=_.f=$
_.x="C"
_.z=_.y=null},
jb:function jb(a){this.a=a},
jc:function jc(a){this.a=a},
j9:function j9(a,b){this.a=a
this.b=b},
ja:function ja(a,b){this.a=a
this.b=b},
j_:function j_(a,b){this.a=a
this.b=b},
j0:function j0(){},
j8:function j8(a,b){this.a=a
this.b=b},
j1:function j1(a){this.a=a},
j2:function j2(){},
j3:function j3(a){this.a=a},
j4:function j4(){},
j6:function j6(a,b){this.a=a
this.b=b},
j7:function j7(a){this.a=a},
j5:function j5(a,b){this.a=a
this.b=b},
iY:function iY(a,b){this.a=a
this.b=b},
iZ:function iZ(){},
bA:function bA(a,b){this.a=a
this.b=b},
pE(a,b,c,d){return new A.h5(d,b,a,c,new A.jg(),new A.jh())},
mi(a,b,c){var s=A.cy(new A.jd(c))
a.addEventListener(b,s)
return new A.je(a,b,s)},
h5:function h5(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f
_.w=!1
_.y=null},
jg:function jg(){},
jh:function jh(){},
jf:function jf(a){this.a=a},
ji:function ji(a){this.a=a},
jd:function jd(a){this.a=a},
je:function je(a,b,c){this.a=a
this.b=b
this.c=c},
pT(a,b,c,d,e){var s=null,r=A.aU(s,s,!1,t.L),q=A.mg(t.H),p=new A.fg(new A.i3(A.of(B.r,1000),1000),s,""),o=Date.now()
r=new A.em(e,c,b,r,a,p,q,new A.aF(o,0,!1),B.aW)
r.e8(s,a,s,b,s,s,s,s,c,s,s,!1,d,s,e)
return r},
em:function em(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=$
_.f=d
_.r=e
_.ax=f
_.cy=_.cx=_.CW=_.ch=!1
_.db=null
_.dx=g
_.dy=h
_.fr=i
_.fx=null},
jv:function jv(a){this.a=a},
jw:function jw(a){this.a=a},
jx:function jx(a){this.a=a},
ju:function ju(a,b){this.a=a
this.b=b},
jy:function jy(a){this.a=a},
jz:function jz(a){this.a=a},
er:function er(a,b){this.a=a
this.b=b},
jE:function jE(a){this.a=a},
jF:function jF(a){this.a=a},
ae(a,b,c,d,e,f,g,h,i){var s,r,q=A.l(A.l(v.G.document).createElement(a))
if(e!=null)q.className=e
if(f!=null)q.id=f
if(i!=null)q.textContent=i
if(h!=null)q.setAttribute("role",h)
if(b!=null)q.setAttribute("aria-label",b)
if(c!=null)c.a_(0,new A.kB(q))
for(s=d.length,r=0;r<d.length;d.length===s||(0,A.cC)(d),++r)A.l(q.appendChild(d[r]))
if(g!=null)q.addEventListener("click",A.cy(g))
return q},
hK(a){var s
while(A.aM(a.firstChild)!=null){s=A.aM(a.firstChild)
s.toString
A.l(a.removeChild(s))}},
dL(a,b,c){var s=A.cy(c)
a.addEventListener(b,s)
return new A.kO(a,b,s)},
kB:function kB(a){this.a=a},
kO:function kO(a,b,c){this.a=a
this.b=b
this.c=c},
h6:function h6(a){this.a=a},
jk:function jk(a){this.a=a},
hJ(a,b,c,d,e){var s,r,q=null,p=A.w([],t.s)
if(e)p.push("primary")
if(c!=null)p.push(c)
s=B.b.ak(p," ")
p=s.length===0?q:s
r=A.ae("button",b,q,B.h,p,q,new A.kv(d),q,q)
r.type="button"
r.textContent=a
r.disabled=!1
return r},
kC(a,b){var s=null,r=t.N
r=A.w([A.ae("label",s,A.z(["for",A.L(b.id)],r,r),B.h,s,s,s,s,a),b],t.O)
return A.ae("div",s,s,r,"field",s,s,s,s)},
hO(a,b,c,d){var s=null,r=A.ae("input",s,s,B.h,s,b,s,s,s)
r.type=d
if(c!=null)r.placeholder=c
if(a!=null){r.autocapitalize=a
r.setAttribute("autocorrect","off")
r.spellcheck=!1}return r},
kv:function kv(a){this.a=a},
lS(a,b,c,d){var s,r={}
r.a=a
s=new A.dW(d.h("dW<0>"))
s.e6(b,c,r,d)
return s},
dW:function dW(a){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=a},
il:function il(a,b,c){this.a=a
this.b=b
this.c=c},
ik:function ik(a){this.a=a},
dy:function dy(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=_.d=!1
_.r=_.f=null
_.w=d
_.$ti=e},
k2:function k2(){},
h2:function h2(a){this.b=this.a=$
this.$ti=a},
eg:function eg(){},
iN:function iN(){},
i5:function i5(){},
mt(a,b,c,d,e){var s
if(c==null)s=null
else{s=A.n8(new A.jP(c),t.m)
s=s==null?null:A.cy(s)}s=new A.ey(a,b,s,!1,e.h("ey<0>"))
s.dh()
return s},
n8(a,b){var s=$.u
if(s===B.d)return a
return s.fP(a,b)},
kX:function kX(a,b){this.a=a
this.$ti=b},
cq:function cq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ey:function ey(a,b,c,d,e){var _=this
_.a=0
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
jP:function jP(a){this.a=a},
jQ:function jQ(a){this.a=a},
kV(a,b){var s=0,r=A.H(t.dK),q,p,o,n,m,l,k
var $async$kV=A.I(function(c,d){if(c===1)return A.E(d,r)
for(;;)switch(s){case 0:if(!a.cd("ws")&&!a.cd("wss"))throw A.e(A.f4(a,"url","only ws: and wss: schemes are supported"))
p=v.G
o=p.WebSocket
n=a.k(0)
p=p.Array
p=t.c.a(new p())
m=A.l(new o(n,p))
m.binaryType="arraybuffer"
l=new A.bL(m,A.aU(null,null,!1,t.E))
p=new A.p($.u,t.cX)
k=new A.ac(p,t.gi)
if(A.U(m.readyState)===1)k.D(l)
else if(A.U(m.readyState)===2||A.U(m.readyState)===3)k.H(new A.eo("Unexpected WebSocket state: "+A.U(m.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.cq(m,"open",!1,t.G).gZ(0).b1(new A.hW(k,l),t.H)
o=t.G
n=t.H
new A.cq(m,"error",!1,o).gZ(0).b1(new A.hX(k,l),n)
A.mt(m,"message",t.bY.a(new A.hY(l)),!1,t.m)
new A.cq(m,"close",!1,o).gZ(0).b1(new A.hZ(k,l),n)
q=p
s=1
break
case 1:return A.F(q,r)}})
return A.G($async$kV,r)},
bL:function bL(a,b){this.a=a
this.b=b},
hW:function hW(a,b){this.a=a
this.b=b},
hX:function hX(a,b){this.a=a
this.b=b},
hY:function hY(a){this.a=a},
hZ:function hZ(a,b){this.a=a
this.b=b},
lc(){return new A.en("Connection Closed")},
bd:function bd(){},
dp:function dp(a){this.a=a},
cG:function cG(a){this.a=a},
cJ:function cJ(a,b){this.a=a
this.b=b},
eo:function eo(a){this.a=a},
en:function en(a){this.a=a},
nU(a){var s=null,r=$.u,q=new A.h2(t.aG),p=t.X,o=A.aU(s,s,!0,p),n=A.aU(s,s,!0,p),m=A.h(n),l=A.h(o)
q.a=A.lS(new A.M(n,m.h("M<1>")),new A.cx(o,l.h("cx<1>")),!0,p)
q.b=A.lS(new A.M(o,l.h("M<1>")),new A.cx(n,m.h("cx<1>")),!1,p)
q=new A.f3(new A.ac(new A.p(r,t.D),t.h),q)
q.e4(a)
return q},
f3:function f3(a,b){var _=this
_.e=_.d=null
_.f=a
_.r=b
_.w=$},
hT:function hT(a){this.a=a},
hQ:function hQ(a){this.a=a},
hR:function hR(a){this.a=a},
hS:function hS(a,b){this.a=a
this.b=b},
hU:function hU(a){this.a=a},
hE:function hE(a,b){this.b=a
this.a=b},
jB:function jB(a){this.a=a},
tP(){var s=v.G,r=A.aM(A.l(s.document).getElementById("app"))
if(r==null)r=A.l(r)
s=A.aM(A.l(s.document).getElementById("toasts"))
s.toString
new A.ie(r,new A.h6(s),new A.fL()).aH()},
ie:function ie(a,b,c){this.a=a
this.b=b
this.c=c},
ig:function ig(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
mk(a,b,c){var s=a.BYTES_PER_ELEMENT
c=A.aw(b,c,B.c.aI(a.byteLength,s))
return J.lB(B.k.gdn(a),a.byteOffset+b*s,(c-b)*s)},
hM(a,b){var s=0,r=A.H(t.dJ),q,p,o,n
var $async$hM=A.I(function(c,d){if(c===1)return A.E(d,r)
for(;;)switch(s){case 0:n=A.nU(A.kV(a,null))
s=3
return A.y(n.f.a,$async$hM)
case 3:p=$.ns()
o=A.oK(t.N,t.w)
o.aw(0,p)
q=A.pW(n,new A.ij(o))
s=1
break
case 1:return A.F(q,r)}})
return A.G($async$hM,r)},
lM(a,b,c){var s,r,q
if(c<0||c>4294967295)throw A.e(A.f4(c,"value","not a uint32"))
s=B.c.a1(c,24)
a.$flags&2&&A.Q(a)
r=a.length
if(!(b<r))return A.c(a,b)
a[b]=s&255
s=b+1
q=B.c.a1(c,16)
if(!(s<r))return A.c(a,s)
a[s]=q&255
q=b+2
s=B.c.a1(c,8)
if(!(q<r))return A.c(a,q)
a[q]=s&255
s=b+3
if(!(s<r))return A.c(a,s)
a[s]=c&255},
lL(a,b){var s,r,q,p,o=a.length
if(!(b<o))return A.c(a,b)
s=a[b]
r=b+1
if(!(r<o))return A.c(a,r)
r=a[r]
q=b+2
if(!(q<o))return A.c(a,q)
q=a[q]
p=b+3
if(!(p<o))return A.c(a,p)
return(s<<24|r<<16|q<<8|a[p])>>>0}},B={}
var w=[A,J,B]
var $={}
A.kZ.prototype={}
J.fq.prototype={
M(a,b){return a===b},
gA(a){return A.c9(a)},
k(a){return"Instance of '"+A.fS(a)+"'"},
gI(a){return A.aN(A.lm(this))}}
J.fs.prototype={
k(a){return String(a)},
gA(a){return a?519018:218159},
gI(a){return A.aN(t.y)},
$iC:1,
$ia5:1}
J.dY.prototype={
M(a,b){return null==b},
k(a){return"null"},
gA(a){return 0},
gI(a){return A.aN(t.a)},
$iC:1,
$iO:1}
J.dZ.prototype={$iB:1}
J.bt.prototype={
gA(a){return 0},
gI(a){return B.b8},
k(a){return String(a)}}
J.fO.prototype={}
J.cn.prototype={}
J.b3.prototype={
k(a){var s=a[$.nq()]
if(s==null)s=a[$.kR()]
if(s==null)return this.e2(a)
return"JavaScript function for "+J.b0(s)},
$ibY:1}
J.cQ.prototype={
gA(a){return 0},
k(a){return String(a)}}
J.cR.prototype={
gA(a){return 0},
k(a){return String(a)}}
J.A.prototype={
l(a,b){A.P(a).c.a(b)
a.$flags&1&&A.Q(a,29)
a.push(b)},
cn(a,b){a.$flags&1&&A.Q(a,"removeAt",1)
if(b<0||b>=a.length)throw A.e(A.l4(b,null))
return a.splice(b,1)[0]},
fA(a,b,c){var s,r,q,p,o
A.P(a).h("a5(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.e(A.am(a))}o=s.length
if(o===r)return
this.sm(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
aw(a,b){var s
A.P(a).h("f<1>").a(b)
a.$flags&1&&A.Q(a,"addAll",2)
if(Array.isArray(b)){this.ed(a,b)
return}for(s=J.cD(b);s.t();)a.push(s.gB())},
ed(a,b){var s,r
t.b.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.e(A.am(a))
for(r=0;r<s;++r)a.push(b[r])},
F(a){a.$flags&1&&A.Q(a,"clear","clear")
a.length=0},
aZ(a,b,c){var s=A.P(a)
return new A.X(a,s.v(c).h("1(2)").a(b),s.h("@<1>").v(c).h("X<1,2>"))},
ak(a,b){var s,r=A.cU(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.i(r,s,A.J(a[s]))
return r.join(b)},
aj(a){return this.ak(a,"")},
bD(a,b){return A.la(a,b,null,A.P(a).c)},
a3(a,b){if(!(b>=0&&b<a.length))return A.c(a,b)
return a[b]},
a0(a,b,c){if(b<0||b>a.length)throw A.e(A.Y(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw A.e(A.Y(c,b,a.length,"end",null))
if(b===c)return A.w([],A.P(a))
return A.w(a.slice(b,c),A.P(a))},
cB(a,b){return this.a0(a,b,null)},
gZ(a){if(a.length>0)return a[0]
throw A.e(A.it())},
gce(a){var s=a.length
if(s>0)return a[s-1]
throw A.e(A.it())},
co(a,b,c){a.$flags&1&&A.Q(a,18)
A.aw(b,c,a.length)
a.splice(b,c-b)},
ab(a,b,c,d,e){var s,r,q,p
A.P(a).h("f<1>").a(d)
a.$flags&2&&A.Q(a,5)
A.aw(b,c,a.length)
s=c-b
if(s===0)return
A.ea(e,"skipCount")
r=d
q=J.aB(r)
if(e+s>q.gm(r))throw A.e(A.lT())
if(e<b)for(p=s-1;p>=0;--p)a[b+p]=q.p(r,e+p)
else for(p=0;p<s;++p)a[b+p]=q.p(r,e+p)},
aE(a,b,c,d){return this.ab(a,b,c,d,0)},
h5(a,b){var s,r
A.P(a).h("a5(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.e(A.am(a))}return!0},
dY(a){var s,r,q,p,o,n
a.$flags&2&&A.Q(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
p=J.lX(r,q)
if(typeof p!=="number")return p.dO()
if(p>0){a[0]=q
a[1]=r}return}o=0
if(A.P(a).c.b(null))for(n=0;n<a.length;++n)if(a[n]===void 0){a[n]=null;++o}a.sort(A.dJ(J.qZ(),2))
if(o>0)this.fB(a,o)},
fB(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
aB(a,b,c){var s,r=a.length
if(c>=r)return-1
if(c<0)c=0
for(s=c;s<r;++s){if(!(s<a.length))return A.c(a,s)
if(J.bF(a[s],b))return s}return-1},
V(a,b){var s
for(s=0;s<a.length;++s)if(J.bF(a[s],b))return!0
return!1},
gC(a){return a.length===0},
gJ(a){return a.length!==0},
k(a){return A.iu(a,"[","]")},
gE(a){return new J.bI(a,a.length,A.P(a).h("bI<1>"))},
gA(a){return A.c9(a)},
gm(a){return a.length},
sm(a,b){a.$flags&1&&A.Q(a,"set length","change the length of")
if(b<0)throw A.e(A.Y(b,0,null,"newLength",null))
if(b>a.length)A.P(a).c.a(null)
a.length=b},
p(a,b){if(!(b>=0&&b<a.length))throw A.e(A.kz(a,b))
return a[b]},
i(a,b,c){A.P(a).c.a(c)
a.$flags&2&&A.Q(a)
if(!(b>=0&&b<a.length))throw A.e(A.kz(a,b))
a[b]=c},
dK(a,b){return new A.co(a,b.h("co<0>"))},
gI(a){return A.aN(A.P(a))},
$ia7:1,
$iq:1,
$if:1,
$it:1}
J.fr.prototype={
hy(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.fS(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.iv.prototype={}
J.bI.prototype={
gB(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.cC(q)
throw A.e(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iS:1}
J.cO.prototype={
a4(a,b){var s
A.mP(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbt(b)
if(this.gbt(a)===s)return 0
if(this.gbt(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbt(a){return a===0?1/a<0:a<0},
hu(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.e(A.bc(""+a+".toInt()"))},
fQ(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.e(A.bc(""+a+".ceil()"))},
h9(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.e(A.bc(""+a+".floor()"))},
cp(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.e(A.bc(""+a+".round()"))},
bn(a,b,c){if(this.a4(b,c)>0)throw A.e(A.lq(b))
if(this.a4(a,b)<0)return b
if(this.a4(a,c)>0)return c
return a},
hx(a,b){var s
if(b>20)throw A.e(A.Y(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbt(a))return"-"+s
return s},
dH(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.e(A.Y(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.c(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.v(A.bc("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.c(p,1)
s=p[1]
if(3>=r)return A.c(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.a.bz("0",o)},
k(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
am(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
aI(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.de(a,b)},
ad(a,b){return(a|0)===a?a/b|0:this.de(a,b)},
de(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.e(A.bc("Result of truncating division is "+A.J(s)+": "+A.J(a)+" ~/ "+b))},
a1(a,b){var s
if(a>0)s=this.dc(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
fG(a,b){if(0>b)throw A.e(A.lq(b))
return this.dc(a,b)},
dc(a,b){return b>31?0:a>>>b},
gI(a){return A.aN(t.q)},
$ial:1,
$ix:1,
$iak:1}
J.dX.prototype={
gI(a){return A.aN(t.S)},
$iC:1,
$ia:1}
J.ft.prototype={
gI(a){return A.aN(t.i)},
$iC:1}
J.br.prototype={
dl(a,b){return new A.hv(b,a,0)},
dz(a,b,c){var s,r,q,p,o=null
if(c<0||c>b.length)throw A.e(A.Y(c,0,b.length,o,o))
s=a.length
r=b.length
if(c+s>r)return o
for(q=0;q<s;++q){p=c+q
if(!(p>=0&&p<r))return A.c(b,p)
if(b.charCodeAt(p)!==a.charCodeAt(q))return o}return new A.ei(c,a)},
h4(a,b){var s=b.length,r=a.length
if(s>r)return!1
return b===this.a8(a,r-s)},
dZ(a,b){var s
if(typeof b=="string")return A.w(a.split(b),t.s)
else{if(b instanceof A.cP){s=b.e
s=!(s==null?b.e=b.ew():s)}else s=!1
if(s)return A.w(a.split(b.b),t.s)
else return this.eD(a,b)}},
aC(a,b,c,d){var s=A.aw(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
eD(a,b){var s,r,q,p,o,n,m=A.w([],t.s)
for(s=J.lA(b,a),s=s.gE(s),r=0,q=1;s.t();){p=s.gB()
o=p.gbE()
n=p.gbo()
q=n-o
if(q===0&&r===o)continue
B.b.l(m,this.u(a,r,o))
r=n}if(r<a.length||q>0)B.b.l(m,this.a8(a,r))
return m},
O(a,b,c){var s
if(c<0||c>a.length)throw A.e(A.Y(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
L(a,b){return this.O(a,b,0)},
u(a,b,c){return a.substring(b,A.aw(b,c,a.length))},
a8(a,b){return this.u(a,b,null)},
a7(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.c(p,0)
if(p.charCodeAt(0)===133){s=J.oD(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.c(p,r)
q=p.charCodeAt(r)===133?J.oE(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
bz(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.e(B.S)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dA(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bz(c,s)+a},
aB(a,b,c){var s
if(c<0||c>a.length)throw A.e(A.Y(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
hb(a,b){return this.aB(a,b,0)},
cf(a,b){var s,r,q=a.length
if(typeof b=="string"){s=b.length
if(q+s>q)q-=s
return a.lastIndexOf(b,q)}for(s=J.nd(b),r=q;r>=0;--r)if(s.dz(b,a,r)!=null)return r
return-1},
V(a,b){return A.tT(a,b,0)},
a4(a,b){var s
A.L(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
k(a){return a},
gA(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gI(a){return A.aN(t.N)},
gm(a){return a.length},
$ia7:1,
$iC:1,
$ial:1,
$iiK:1,
$ib:1}
A.hj.prototype={
l(a,b){t.L.a(b)
B.b.l(this.b,b)
this.a=this.a+b.length},
dG(){var s,r,q,p,o,n,m,l=this,k=l.a
if(k===0)return $.nJ()
s=l.b
r=s.length
if(r===1){if(0>=r)return A.c(s,0)
q=s[0]
l.a=0
B.b.F(s)
return q}q=new Uint8Array(k)
for(p=0,o=0;o<s.length;s.length===r||(0,A.cC)(s),++o,p=m){n=s[o]
m=p+n.length
B.k.aE(q,p,m,n)}l.a=0
B.b.F(s)
return q},
gm(a){return this.a},
$io1:1}
A.dv.prototype={
gE(a){var s=this.a
return new A.dQ(s.gE(s),A.h(this).h("dQ<1,2>"))},
gm(a){var s=this.a
return s.gm(s)},
gC(a){var s=this.a
return s.gC(s)},
gJ(a){var s=this.a
return s.gJ(s)},
k(a){return this.a.k(0)}}
A.dQ.prototype={
t(){return this.a.t()},
gB(){return this.$ti.y[1].a(this.a.gB())},
$iS:1}
A.bM.prototype={}
A.ex.prototype={$iq:1}
A.bN.prototype={
a2(a,b,c){return new A.bN(this.a,this.$ti.h("@<1,2>").v(b).v(c).h("bN<1,2,3,4>"))},
p(a,b){return this.$ti.h("4?").a(this.a.p(0,b))},
a_(a,b){this.a.a_(0,new A.i_(this,this.$ti.h("~(3,4)").a(b)))},
gW(){var s=this.$ti
return A.o2(this.a.gW(),s.c,s.y[2])},
gm(a){var s=this.a
return s.gm(s)},
gC(a){var s=this.a
return s.gC(s)},
gJ(a){var s=this.a
return s.gJ(s)}}
A.i_.prototype={
$2(a,b){var s=this.a.$ti
s.c.a(a)
s.y[1].a(b)
this.b.$2(s.y[2].a(a),s.y[3].a(b))},
$S(){return this.a.$ti.h("~(1,2)")}}
A.c_.prototype={
k(a){return"LateInitializationError: "+this.a}}
A.kM.prototype={
$0(){return A.lR(null,t.H)},
$S:3}
A.iO.prototype={}
A.q.prototype={}
A.W.prototype={
gE(a){var s=this
return new A.b5(s,s.gm(s),A.h(s).h("b5<W.E>"))},
gC(a){return this.gm(this)===0},
aZ(a,b,c){var s=A.h(this)
return new A.X(this,s.v(c).h("1(W.E)").a(b),s.h("@<W.E>").v(c).h("X<1,2>"))}}
A.ej.prototype={
geJ(){var s=J.bi(this.a),r=this.c
if(r==null||r>s)return s
return r},
gfH(){var s=J.bi(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bi(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
a3(a,b){var s=this,r=s.gfH()+b
if(b<0||r>=s.geJ())throw A.e(A.io(b,s.gm(0),s,null,"index"))
return J.lC(s.a,r)},
hw(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.aB(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.lW(0,n):J.lV(0,n)}r=A.cU(s,m.a3(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.i(r,q,m.a3(n,o+q))
if(m.gm(n)<l)throw A.e(A.am(p))}return r},
hv(a){return this.hw(0,!0)}}
A.b5.prototype={
gB(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s,r=this,q=r.a,p=J.aB(q),o=p.gm(q)
if(r.b!==o)throw A.e(A.am(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.a3(q,s);++r.c
return!0},
$iS:1}
A.c2.prototype={
gE(a){return new A.e3(J.cD(this.a),this.b,A.h(this).h("e3<1,2>"))},
gm(a){return J.bi(this.a)},
gC(a){return J.kS(this.a)}}
A.bX.prototype={$iq:1}
A.e3.prototype={
t(){var s=this,r=s.b
if(r.t()){s.a=s.c.$1(r.gB())
return!0}s.a=null
return!1},
gB(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iS:1}
A.X.prototype={
gm(a){return J.bi(this.a)},
a3(a,b){return this.b.$1(J.lC(this.a,b))}}
A.co.prototype={
gE(a){return new A.ep(J.cD(this.a),this.$ti.h("ep<1>"))}}
A.ep.prototype={
t(){var s,r
for(s=this.a,r=this.$ti.c;s.t();)if(r.b(s.gB()))return!0
return!1},
gB(){return this.$ti.c.a(this.a.gB())},
$iS:1}
A.ag.prototype={}
A.eL.prototype={$r:"+(1,2)",$s:1}
A.eM.prototype={$r:"+cols,rows(1,2)",$s:2}
A.bg.prototype={$r:"+(1,2,3,4)",$s:3}
A.dR.prototype={
a2(a,b,c){var s=A.h(this)
return A.m1(this,s.c,s.y[1],b,c)},
gC(a){return this.gm(this)===0},
gJ(a){return this.gm(this)!==0},
k(a){return A.l0(this)},
dw(a,b,c,d){var s=A.o(c,d)
this.a_(0,new A.i4(this,A.h(this).v(c).v(d).h("bu<1,2>(3,4)").a(b),s))
return s},
$id:1}
A.i4.prototype={
$2(a,b){var s=A.h(this.a),r=this.b.$2(s.c.a(a),s.y[1].a(b))
this.c.i(0,r.a,r.b)},
$S(){return A.h(this.a).h("~(1,2)")}}
A.bS.prototype={
gm(a){return this.b.length},
gcU(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
aW(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
p(a,b){if(!this.aW(b))return null
return this.b[this.a[b]]},
a_(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcU()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gW(){return new A.eD(this.gcU(),this.$ti.h("eD<1>"))}}
A.eD.prototype={
gm(a){return this.a.length},
gC(a){return 0===this.a.length},
gJ(a){return 0!==this.a.length},
gE(a){var s=this.a
return new A.cs(s,s.length,this.$ti.h("cs<1>"))}}
A.cs.prototype={
gB(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iS:1}
A.dS.prototype={}
A.b1.prototype={
gm(a){return this.b},
gC(a){return this.b===0},
gE(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.cs(s,s.length,r.$ti.h("cs<1>"))},
V(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)}}
A.ec.prototype={}
A.jn.prototype={
a6(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.e9.prototype={
k(a){return"Null check operator used on a null value"}}
A.fu.prototype={
k(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.hb.prototype={
k(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.iH.prototype={
k(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dV.prototype={}
A.eO.prototype={
k(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iai:1}
A.bn.prototype={
k(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.nn(r==null?"unknown":r)+"'"},
gI(a){var s=A.ls(this)
return A.aN(s==null?A.b_(this):s)},
$ibY:1,
ghD(){return this},
$C:"$1",
$R:1,
$D:null}
A.fd.prototype={$C:"$0",$R:0}
A.fe.prototype={$C:"$2",$R:2}
A.h3.prototype={}
A.h1.prototype={
k(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.nn(s)+"'"}}
A.cH.prototype={
M(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cH))return!1
return this.$_target===b.$_target&&this.a===b.a},
gA(a){return(A.kN(this.a)^A.c9(this.$_target))>>>0},
k(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.fS(this.a)+"'")}}
A.fX.prototype={
k(a){return"RuntimeError: "+this.a}}
A.hB.prototype={
k(a){return"Assertion failed: Reached dead code"}}
A.b4.prototype={
gm(a){return this.a},
gC(a){return this.a===0},
gJ(a){return this.a!==0},
gW(){return new A.c0(this,A.h(this).h("c0<1>"))},
aW(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.hc(a)},
hc(a){var s=this.d
if(s==null)return!1
return this.bs(s[this.br(a)],a)>=0},
aw(a,b){A.h(this).h("d<1,2>").a(b).a_(0,new A.iw(this))},
p(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.hd(b)},
hd(a){var s,r,q=this.d
if(q==null)return null
s=q[this.br(a)]
r=this.bs(s,a)
if(r<0)return null
return s[r].b},
i(a,b,c){var s,r,q=this,p=A.h(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cC(s==null?q.b=q.bZ():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cC(r==null?q.c=q.bZ():r,b,c)}else q.hf(b,c)},
hf(a,b){var s,r,q,p,o=this,n=A.h(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bZ()
r=o.br(a)
q=s[r]
if(q==null)s[r]=[o.c_(a,b)]
else{p=o.bs(q,a)
if(p>=0)q[p].b=b
else q.push(o.c_(a,b))}},
S(a,b){var s=this
if(typeof b=="string")return s.d8(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.d8(s.c,b)
else return s.he(b)},
he(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.br(a)
r=n[s]
q=o.bs(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.di(p)
if(r.length===0)delete n[s]
return p.b},
F(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bW()}},
a_(a,b){var s,r,q=this
A.h(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.e(A.am(q))
s=s.c}},
cC(a,b,c){var s,r=A.h(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.c_(b,c)
else s.b=c},
d8(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.di(s)
delete a[b]
return s.b},
bW(){this.r=this.r+1&1073741823},
c_(a,b){var s=this,r=A.h(s),q=new A.iA(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bW()
return q},
di(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bW()},
br(a){return J.aP(a)&1073741823},
bs(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.bF(a[r].a,b))return r
return-1},
k(a){return A.l0(this)},
bZ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$im_:1}
A.iw.prototype={
$2(a,b){var s=this.a,r=A.h(s)
s.i(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.h(this.a).h("~(1,2)")}}
A.iA.prototype={}
A.c0.prototype={
gm(a){return this.a.a},
gC(a){return this.a.a===0},
gE(a){var s=this.a
return new A.e1(s,s.r,s.e,this.$ti.h("e1<1>"))}}
A.e1.prototype={
gB(){return this.d},
t(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.am(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iS:1}
A.c1.prototype={
gm(a){return this.a.a},
gC(a){return this.a.a===0},
gE(a){var s=this.a
return new A.N(s,s.r,s.e,this.$ti.h("N<1>"))}}
A.N.prototype={
gB(){return this.d},
t(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.am(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iS:1}
A.kG.prototype={
$1(a){return this.a(a)},
$S:9}
A.kH.prototype={
$2(a,b){return this.a(a,b)},
$S:51}
A.kI.prototype={
$1(a){return this.a(A.L(a))},
$S:35}
A.aX.prototype={
gI(a){return A.aN(this.cR())},
cR(){return A.tC(this.$r,this.bR())},
k(a){return this.dg(!1)},
dg(a){var s,r,q,p,o,n=this.eM(),m=this.bR(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.c(m,q)
o=m[q]
l=a?l+A.mb(o):l+A.J(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
eM(){var s,r=this.$s
while($.k9.length<=r)B.b.l($.k9,null)
s=$.k9[r]
if(s==null){s=this.ev()
B.b.i($.k9,r,s)}return s},
ev(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.lU(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.b.i(j,q,r[s])}}return A.iB(j,k)}}
A.cv.prototype={
bR(){return[this.a,this.b]},
M(a,b){if(b==null)return!1
return b instanceof A.cv&&this.$s===b.$s&&J.bF(this.a,b.a)&&J.bF(this.b,b.b)},
gA(a){return A.l2(this.$s,this.a,this.b,B.j)}}
A.dA.prototype={
bR(){return this.a},
M(a,b){if(b==null)return!1
return b instanceof A.dA&&this.$s===b.$s&&A.qf(this.a,b.a)},
gA(a){return A.l2(this.$s,A.pf(this.a),B.j,B.j)}}
A.cP.prototype={
k(a){return"RegExp/"+this.a+"/"+this.b.flags},
gcV(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.kY(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"g")},
gf1(){var s=this,r=s.d
if(r!=null)return r
r=s.b
return s.d=A.kY(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"y")},
ew(){var s,r=this.a
if(!B.a.V(r,"("))return!1
s=this.b.unicode?"u":""
return new RegExp("(?:)|"+r,s).exec("").length>1},
h8(a){var s=this.b.exec(a)
if(s==null)return null
return new A.dz(s)},
dl(a,b){return new A.hf(this,b,0)},
eL(a,b){var s,r=this.gcV()
if(r==null)r=A.a3(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.dz(s)},
eK(a,b){var s,r=this.gf1()
if(r==null)r=A.a3(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.dz(s)},
dz(a,b,c){if(c<0||c>b.length)throw A.e(A.Y(c,0,b.length,null,null))
return this.eK(b,c)},
$iiK:1,
$ipo:1}
A.dz.prototype={
gbE(){return this.b.index},
gbo(){var s=this.b
return s.index+s[0].length},
$icV:1,
$ieb:1}
A.hf.prototype={
gE(a){return new A.hg(this.a,this.b,this.c)}}
A.hg.prototype={
gB(){var s=this.d
return s==null?t.cz.a(s):s},
t(){var s,r,q,p,o,n,m=this,l=m.b
if(l==null)return!1
s=m.c
r=l.length
if(s<=r){q=m.a
p=q.eL(l,s)
if(p!=null){m.d=p
o=p.gbo()
if(p.b.index===o){s=!1
if(q.b.unicode){q=m.c
n=q+1
if(n<r){if(!(q>=0&&q<r))return A.c(l,q)
q=l.charCodeAt(q)
if(q>=55296&&q<=56319){if(!(n>=0))return A.c(l,n)
s=l.charCodeAt(n)
s=s>=56320&&s<=57343}}}o=(s?o+1:o)+1}m.c=o
return!0}}m.b=m.d=null
return!1},
$iS:1}
A.ei.prototype={
gbo(){return this.a+this.c.length},
$icV:1,
gbE(){return this.a}}
A.hv.prototype={
gE(a){return new A.hw(this.a,this.b,this.c)}}
A.hw.prototype={
t(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.ei(s,o)
q.c=r===q.c?r+1:r
return!0},
gB(){var s=this.d
s.toString
return s},
$iS:1}
A.jN.prototype={
d4(){var s=this.b
if(s===this)throw A.e(new A.c_("Local '"+this.a+"' has not been initialized."))
return s}}
A.bv.prototype={
gI(a){return B.b1},
dm(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iC:1,
$ibv:1,
$idP:1}
A.cW.prototype={$icW:1}
A.e6.prototype={
gdn(a){if(((a.$flags|0)&2)!==0)return new A.hA(a.buffer)
else return a.buffer},
eZ(a,b,c,d){var s=A.Y(b,0,c,d,null)
throw A.e(s)},
cE(a,b,c,d){if(b>>>0!==b||b>c)this.eZ(a,b,c,d)}}
A.hA.prototype={
dm(a,b,c){var s=A.m2(this.a,b,c)
s.$flags=3
return s},
$idP:1}
A.e4.prototype={
gI(a){return B.b2},
$iC:1,
$ikW:1}
A.a8.prototype={
gm(a){return a.length},
fF(a,b,c,d,e){var s,r,q=a.length
this.cE(a,b,q,"start")
this.cE(a,c,q,"end")
if(b>c)throw A.e(A.Y(b,0,c,null,null))
s=c-b
if(e<0)throw A.e(A.bj(e,null))
r=d.length
if(r-e<s)throw A.e(A.b8("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$ia7:1,
$iap:1}
A.e5.prototype={
p(a,b){A.bh(b,a,a.length)
return a[b]},
i(a,b,c){A.aY(c)
a.$flags&2&&A.Q(a)
A.bh(b,a,a.length)
a[b]=c},
$iq:1,
$if:1,
$it:1}
A.aq.prototype={
i(a,b,c){A.U(c)
a.$flags&2&&A.Q(a)
A.bh(b,a,a.length)
a[b]=c},
ab(a,b,c,d,e){t.hb.a(d)
a.$flags&2&&A.Q(a,5)
if(t.bc.b(d)){this.fF(a,b,c,d,e)
return}this.e3(a,b,c,d,e)},
aE(a,b,c,d){return this.ab(a,b,c,d,0)},
$iq:1,
$if:1,
$it:1}
A.fB.prototype={
gI(a){return B.b3},
$iC:1,
$iih:1}
A.fC.prototype={
gI(a){return B.b4},
$iC:1,
$iii:1}
A.fD.prototype={
gI(a){return B.b5},
p(a,b){A.bh(b,a,a.length)
return a[b]},
$iC:1,
$iip:1}
A.fE.prototype={
gI(a){return B.b6},
p(a,b){A.bh(b,a,a.length)
return a[b]},
$iC:1,
$iiq:1}
A.fF.prototype={
gI(a){return B.b7},
p(a,b){A.bh(b,a,a.length)
return a[b]},
$iC:1,
$iir:1}
A.fG.prototype={
gI(a){return B.ba},
p(a,b){A.bh(b,a,a.length)
return a[b]},
$iC:1,
$ijp:1}
A.fH.prototype={
gI(a){return B.bb},
p(a,b){A.bh(b,a,a.length)
return a[b]},
$iC:1,
$ijq:1}
A.e7.prototype={
gI(a){return B.bc},
gm(a){return a.length},
p(a,b){A.bh(b,a,a.length)
return a[b]},
$iC:1,
$ijr:1}
A.e8.prototype={
gI(a){return B.bd},
gm(a){return a.length},
p(a,b){A.bh(b,a,a.length)
return a[b]},
a0(a,b,c){return new Uint8Array(a.subarray(b,A.qN(b,c,a.length)))},
$iC:1,
$icm:1}
A.eG.prototype={}
A.eH.prototype={}
A.eI.prototype={}
A.eJ.prototype={}
A.aH.prototype={
h(a){return A.eV(v.typeUniverse,this,a)},
v(a){return A.mF(v.typeUniverse,this,a)}}
A.hn.prototype={}
A.kf.prototype={
k(a){return A.as(this.a,null)}}
A.hm.prototype={
k(a){return this.a}}
A.eR.prototype={$iba:1}
A.jH.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:4}
A.jG.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:28}
A.jI.prototype={
$0(){this.a.$0()},
$S:10}
A.jJ.prototype={
$0(){this.a.$0()},
$S:10}
A.hz.prototype={
eb(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.dJ(new A.ke(this,b),0),a)
else throw A.e(A.bc("`setTimeout()` not found."))},
P(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
self.clearTimeout(s)
this.b=null}else throw A.e(A.bc("Canceling a timer."))},
$ipH:1}
A.ke.prototype={
$0(){this.a.b=null
this.b.$0()},
$S:0}
A.es.prototype={
D(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.ao(a)
else{s=r.a
if(q.h("V<1>").b(a))s.cD(a)
else s.cK(a)}},
aU(a,b){var s
if(b==null)b=A.hV(a)
s=this.a
if(this.b)s.aL(new A.af(a,b))
else s.b6(new A.af(a,b))},
H(a){return this.aU(a,null)},
gR(){return(this.a.a&30)!==0},
$ia6:1}
A.kl.prototype={
$1(a){return this.a.$2(0,a)},
$S:2}
A.km.prototype={
$2(a,b){this.a.$2(1,new A.dV(a,t.l.a(b)))},
$S:29}
A.ku.prototype={
$2(a,b){this.a(A.U(a),b)},
$S:31}
A.af.prototype={
k(a){return A.J(this.a)},
$iK:1,
gaG(){return this.b}}
A.eu.prototype={}
A.aW.prototype={
aq(){},
ar(){},
sbf(a){this.ch=this.$ti.h("aW<1>?").a(a)},
sc2(a){this.CW=this.$ti.h("aW<1>?").a(a)}}
A.ev.prototype={
gbV(){return this.c<4},
fz(a){var s,r
A.h(this).h("aW<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbf(r)
if(r==null)this.e=s
else r.sc2(s)
a.sc2(a)
a.sbf(a)},
dd(a,b,c,d){var s,r,q,p,o,n,m,l,k=this,j=A.h(k)
j.h("~(1)?").a(a)
t.Y.a(c)
if((k.c&4)!==0){j=new A.dw($.u,j.h("dw<1>"))
A.lw(j.gcZ())
if(c!=null)j.c=t.M.a(c)
return j}s=$.u
r=d?1:0
q=b!=null?32:0
p=A.ld(s,a,j.c)
o=A.mq(s,b)
n=c==null?A.na():c
j=j.h("aW<1>")
m=new A.aW(k,p,o,t.M.a(n),s,r|q,j)
m.CW=m
m.ch=m
j.a(m)
m.ay=k.c&1
l=k.e
k.e=m
m.sbf(null)
m.sc2(l)
if(l==null)k.d=m
else l.sbf(m)
if(k.d==k.e)A.hI(k.a)
return m},
d5(a){var s=this,r=A.h(s)
a=r.h("aW<1>").a(r.h("aj<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.fz(a)
if((s.c&2)===0&&s.d==null)s.em()}return null},
d6(a){A.h(this).h("aj<1>").a(a)},
d7(a){A.h(this).h("aj<1>").a(a)},
bF(){if((this.c&4)!==0)return new A.ax("Cannot add new events after calling close")
return new A.ax("Cannot add new events while doing an addStream")},
l(a,b){var s=this
A.h(s).c.a(b)
if(!s.gbV())throw A.e(s.bF())
s.ae(b)},
ah(a,b){var s
if(!this.gbV())throw A.e(this.bF())
s=A.ln(a,b)
this.ag(s.a,s.b)},
q(){var s,r,q=this
if((q.c&4)!==0){s=q.r
s.toString
return s}if(!q.gbV())throw A.e(q.bF())
q.c|=4
r=q.r
if(r==null)r=q.r=new A.p($.u,t.D)
q.af()
return r},
em(){if((this.c&4)!==0){var s=this.r
if((s.a&30)===0)s.ao(null)}A.hI(this.b)},
$iay:1,
$icg:1,
$ieQ:1,
$iaz:1}
A.et.prototype={
ae(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.h("aJ<1>");s!=null;s=s.ch)s.a9(new A.aJ(a,r))},
ag(a,b){var s
for(s=this.d;s!=null;s=s.ch)s.a9(new A.cp(a,b))},
af(){var s=this.d
if(s!=null)for(;s!=null;s=s.ch)s.a9(B.n)
else this.r.ao(null)}}
A.ew.prototype={
aU(a,b){var s=this.a
if((s.a&30)!==0)throw A.e(A.b8("Future already completed"))
s.b6(A.ln(a,b))},
H(a){return this.aU(a,null)},
gR(){return(this.a.a&30)!==0},
$ia6:1}
A.ac.prototype={
D(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.e(A.b8("Future already completed"))
s.ao(r.h("1/").a(a))},
az(){return this.D(null)}}
A.aK.prototype={
hk(a){if((this.c&15)!==6)return!0
return this.b.b.cr(t.al.a(this.d),a.a,t.y,t.K)},
ha(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.W.b(q))p=l.hs(q,m,a.b,o,n,t.l)
else p=l.cr(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.A.b(A.a_(s))){if((r.c&1)!==0)throw A.e(A.bj("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.e(A.bj("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.p.prototype={
bw(a,b,c){var s,r,q,p=this.$ti
p.v(c).h("1/(2)").a(a)
s=$.u
if(s===B.d){if(b!=null&&!t.W.b(b)&&!t.v.b(b))throw A.e(A.f4(b,"onError",u.c))}else{c.h("@<0/>").v(p.c).h("1(2)").a(a)
if(b!=null)b=A.n1(b,s)}r=new A.p(s,c.h("p<0>"))
q=b==null?1:3
this.aJ(new A.aK(r,q,a,b,p.h("@<1>").v(c).h("aK<1,2>")))
return r},
b1(a,b){return this.bw(a,null,b)},
df(a,b,c){var s,r=this.$ti
r.v(c).h("1/(2)").a(a)
s=new A.p($.u,c.h("p<0>"))
this.aJ(new A.aK(s,19,a,b,r.h("@<1>").v(c).h("aK<1,2>")))
return s},
dq(a){var s=this.$ti,r=$.u,q=new A.p(r,s)
if(r!==B.d)a=A.n1(a,r)
this.aJ(new A.aK(q,2,null,a,s.h("aK<1,1>")))
return q},
b2(a){var s,r
t.fO.a(a)
s=this.$ti
r=new A.p($.u,s)
this.aJ(new A.aK(r,8,a,null,s.h("aK<1,1>")))
return r},
fD(a){this.a=this.a&1|16
this.c=a},
b8(a){this.a=a.a&30|this.a&1
this.c=a.c},
aJ(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aJ(a)
return}r.b8(s)}A.dG(null,null,r.b,t.M.a(new A.jS(r,a)))}},
d2(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.d2(a)
return}m.b8(n)}l.a=m.bk(a)
A.dG(null,null,m.b,t.M.a(new A.jX(l,m)))}},
aQ(){var s=t.F.a(this.c)
this.c=null
return this.bk(s)},
bk(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bM(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("V<1>").b(a))A.jV(a,r,!0)
else{s=r.aQ()
q.c.a(a)
r.a=8
r.c=a
A.cr(r,s)}},
cK(a){var s,r=this
r.$ti.c.a(a)
s=r.aQ()
r.a=8
r.c=a
A.cr(r,s)},
eu(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aQ()
q.b8(a)
A.cr(q,r)},
aL(a){var s=this.aQ()
this.fD(a)
A.cr(this,s)},
es(a,b){A.a3(a)
t.l.a(b)
this.aL(new A.af(a,b))},
ao(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("V<1>").b(a)){this.cD(a)
return}this.ej(a)},
ej(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dG(null,null,s.b,t.M.a(new A.jU(s,a)))},
cD(a){A.jV(this.$ti.h("V<1>").a(a),this,!1)
return},
b6(a){this.a^=2
A.dG(null,null,this.b,t.M.a(new A.jT(this,a)))},
$iV:1}
A.jS.prototype={
$0(){A.cr(this.a,this.b)},
$S:0}
A.jX.prototype={
$0(){A.cr(this.b,this.a.a)},
$S:0}
A.jW.prototype={
$0(){A.jV(this.a.a,this.b,!0)},
$S:0}
A.jU.prototype={
$0(){this.a.cK(this.b)},
$S:0}
A.jT.prototype={
$0(){this.a.aL(this.b)},
$S:0}
A.k_.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dF(t.fO.a(q.d),t.z)}catch(p){s=A.a_(p)
r=A.aO(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.hV(q)
n=k.a
n.c=new A.af(q,o)
q=n}q.b=!0
return}if(j instanceof A.p&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.p){m=k.b.a
l=new A.p(m.b,m.$ti)
j.bw(new A.k0(l,m),new A.k1(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.k0.prototype={
$1(a){this.a.eu(this.b)},
$S:4}
A.k1.prototype={
$2(a,b){A.a3(a)
t.l.a(b)
this.a.aL(new A.af(a,b))},
$S:50}
A.jZ.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cr(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.a_(l)
r=A.aO(l)
q=s
p=r
if(p==null)p=A.hV(q)
o=this.a
o.c=new A.af(q,p)
o.b=!0}},
$S:0}
A.jY.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.hk(s)&&p.a.e!=null){p.c=p.a.ha(s)
p.b=!1}}catch(o){r=A.a_(o)
q=A.aO(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.hV(p)
m=l.b
m.c=new A.af(p,n)
p=m}p.b=!0}},
$S:0}
A.hh.prototype={}
A.aa.prototype={
ghh(){return!1},
gm(a){var s={},r=new A.p($.u,t.fJ)
s.a=0
this.a5(new A.iU(s,this),!0,new A.iV(s,r),r.gcJ())
return r},
gZ(a){var s=new A.p($.u,A.h(this).h("p<aa.T>")),r=this.a5(null,!0,new A.iS(s),s.gcJ())
r.ci(new A.iT(this,r,s))
return s}}
A.iU.prototype={
$1(a){A.h(this.b).h("aa.T").a(a);++this.a.a},
$S(){return A.h(this.b).h("~(aa.T)")}}
A.iV.prototype={
$0(){this.b.bM(this.a.a)},
$S:0}
A.iS.prototype={
$0(){var s,r=A.mf(),q=new A.ax("No element")
A.iM(q,r)
s=A.mX(q,r)
s=new A.af(q,r)
this.a.aL(s)},
$S:0}
A.iT.prototype={
$1(a){A.qL(this.b,this.c,A.h(this.a).h("aa.T").a(a))},
$S(){return A.h(this.a).h("~(aa.T)")}}
A.eh.prototype={$iaV:1}
A.cw.prototype={
gft(){var s,r=this
if((r.b&8)===0)return A.h(r).h("aL<1>?").a(r.a)
s=A.h(r)
return s.h("aL<1>?").a(s.h("eP<1>").a(r.a).gc5())},
bO(){var s,r,q=this
if((q.b&8)===0){s=q.a
if(s==null)s=q.a=new A.aL(A.h(q).h("aL<1>"))
return A.h(q).h("aL<1>").a(s)}r=A.h(q)
s=r.h("eP<1>").a(q.a).gc5()
return r.h("aL<1>").a(s)},
gav(){var s=this.a
if((this.b&8)!==0)s=t.fv.a(s).gc5()
return A.h(this).h("be<1>").a(s)},
bG(){if((this.b&4)!==0)return new A.ax("Cannot add event after closing")
return new A.ax("Cannot add event while adding a stream")},
cO(){var s=this.c
if(s==null)s=this.c=(this.b&2)!==0?$.dM():new A.p($.u,t.D)
return s},
l(a,b){var s,r=this,q=A.h(r)
q.c.a(b)
s=r.b
if(s>=4)throw A.e(r.bG())
if((s&1)!==0)r.ae(b)
else if((s&3)===0)r.bO().l(0,new A.aJ(b,q.h("aJ<1>")))},
ah(a,b){var s,r,q=this
A.a3(a)
t.gO.a(b)
if(q.b>=4)throw A.e(q.bG())
s=A.ln(a,b)
a=s.a
b=s.b
r=q.b
if((r&1)!==0)q.ag(a,b)
else if((r&3)===0)q.bO().l(0,new A.cp(a,b))},
c7(a){return this.ah(a,null)},
q(){var s=this,r=s.b
if((r&4)!==0)return s.cO()
if(r>=4)throw A.e(s.bG())
r=s.b=r|4
if((r&1)!==0)s.af()
else if((r&3)===0)s.bO().l(0,B.n)
return s.cO()},
dd(a,b,c,d){var s,r,q,p=this,o=A.h(p)
o.h("~(1)?").a(a)
t.Y.a(c)
if((p.b&3)!==0)throw A.e(A.b8("Stream has already been listened to."))
s=A.q3(p,a,b,c,d,o.c)
r=p.gft()
if(((p.b|=1)&8)!==0){q=o.h("eP<1>").a(p.a)
q.sc5(s)
q.bv()}else p.a=s
s.fE(r)
s.bS(new A.kd(p))
return s},
d5(a){var s,r,q,p,o,n,m,l,k=this,j=A.h(k)
j.h("aj<1>").a(a)
s=null
if((k.b&8)!==0)s=j.h("eP<1>").a(k.a).P()
k.a=null
k.b=k.b&4294967286|2
r=k.r
if(r!=null)if(s==null)try{q=r.$0()
if(q instanceof A.p)s=q}catch(n){p=A.a_(n)
o=A.aO(n)
m=new A.p($.u,t.D)
j=A.a3(p)
l=t.l.a(o)
m.b6(new A.af(j,l))
s=m}else s=s.b2(r)
j=new A.kc(k)
if(s!=null)s=s.b2(j)
else j.$0()
return s},
d6(a){var s=this,r=A.h(s)
r.h("aj<1>").a(a)
if((s.b&8)!==0)r.h("eP<1>").a(s.a).cj()
A.hI(s.e)},
d7(a){var s=this,r=A.h(s)
r.h("aj<1>").a(a)
if((s.b&8)!==0)r.h("eP<1>").a(s.a).bv()
A.hI(s.f)},
$iay:1,
$icg:1,
$ieQ:1,
$iaz:1}
A.kd.prototype={
$0(){A.hI(this.a.d)},
$S:0}
A.kc.prototype={
$0(){var s=this.a.c
if(s!=null&&(s.a&30)===0)s.ao(null)},
$S:0}
A.hy.prototype={
ae(a){this.$ti.c.a(a)
this.gav().ec(a)},
ag(a,b){this.gav().ei(a,b)},
af(){this.gav().eo()}}
A.hi.prototype={
ae(a){var s=this.$ti
s.c.a(a)
this.gav().a9(new A.aJ(a,s.h("aJ<1>")))},
ag(a,b){this.gav().a9(new A.cp(a,b))},
af(){this.gav().a9(B.n)}}
A.du.prototype={}
A.dC.prototype={}
A.M.prototype={
gA(a){return(A.c9(this.a)^892482866)>>>0},
M(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.M&&b.a===this.a}}
A.be.prototype={
cW(){return this.w.d5(this)},
aq(){this.w.d6(this)},
ar(){this.w.d7(this)}}
A.cx.prototype={$iay:1}
A.ad.prototype={
fE(a){var s=this
A.h(s).h("aL<ad.T>?").a(a)
if(a==null)return
s.r=a
if(a.c!=null){s.e=(s.e|128)>>>0
a.b3(s)}},
ci(a){var s=A.h(this)
this.a=A.ld(this.d,s.h("~(ad.T)?").a(a),s.h("ad.T"))},
cj(){var s,r,q=this,p=q.e
if((p&8)!==0)return
s=(p+256|4)>>>0
q.e=s
if(p<256){r=q.r
if(r!=null)if(r.a===1)r.a=3}if((p&4)===0&&(s&64)===0)q.bS(q.gc0())},
bv(){var s=this,r=s.e
if((r&8)!==0)return
if(r>=256){r=s.e=r-256
if(r<256)if((r&128)!==0&&s.r.c!=null)s.r.b3(s)
else{r=(r&4294967291)>>>0
s.e=r
if((r&64)===0)s.bS(s.gc1())}}},
P(){var s=this,r=(s.e&4294967279)>>>0
s.e=r
if((r&8)===0)s.bH()
r=s.f
return r==null?$.dM():r},
bH(){var s,r=this,q=r.e=(r.e|8)>>>0
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.cW()},
ec(a){var s,r=this,q=A.h(r)
q.h("ad.T").a(a)
s=r.e
if((s&8)!==0)return
if(s<64)r.ae(a)
else r.a9(new A.aJ(a,q.h("aJ<ad.T>")))},
ei(a,b){var s
if(t.C.b(a))A.iM(a,b)
s=this.e
if((s&8)!==0)return
if(s<64)this.ag(a,b)
else this.a9(new A.cp(a,b))},
eo(){var s=this,r=s.e
if((r&8)!==0)return
r=(r|2)>>>0
s.e=r
if(r<64)s.af()
else s.a9(B.n)},
aq(){},
ar(){},
cW(){return null},
a9(a){var s,r=this,q=r.r
if(q==null)q=r.r=new A.aL(A.h(r).h("aL<ad.T>"))
q.l(0,a)
s=r.e
if((s&128)===0){s=(s|128)>>>0
r.e=s
if(s<256)q.b3(r)}},
ae(a){var s,r=this,q=A.h(r).h("ad.T")
q.a(a)
s=r.e
r.e=(s|64)>>>0
r.d.cs(r.a,a,q)
r.e=(r.e&4294967231)>>>0
r.bJ((s&4)!==0)},
ag(a,b){var s,r=this,q=r.e,p=new A.jM(r,a,b)
if((q&1)!==0){r.e=(q|16)>>>0
r.bH()
s=r.f
if(s!=null&&s!==$.dM())s.b2(p)
else p.$0()}else{p.$0()
r.bJ((q&4)!==0)}},
af(){var s,r=this,q=new A.jL(r)
r.bH()
r.e=(r.e|16)>>>0
s=r.f
if(s!=null&&s!==$.dM())s.b2(q)
else q.$0()},
bS(a){var s,r=this
t.M.a(a)
s=r.e
r.e=(s|64)>>>0
a.$0()
r.e=(r.e&4294967231)>>>0
r.bJ((s&4)!==0)},
bJ(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=(p&4294967167)>>>0
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p=(p&4294967291)>>>0
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=(p^64)>>>0
if(r)q.aq()
else q.ar()
p=(q.e&4294967231)>>>0
q.e=p}if((p&128)!==0&&p<256)q.r.b3(q)},
$iaj:1,
$iaz:1}
A.jM.prototype={
$0(){var s,r,q,p=this.a,o=p.e
if((o&8)!==0&&(o&16)===0)return
p.e=(o|64)>>>0
s=p.b
o=this.b
r=t.K
q=p.d
if(t.k.b(s))q.ht(s,o,this.c,r,t.l)
else q.cs(t.u.a(s),o,r)
p.e=(p.e&4294967231)>>>0},
$S:0}
A.jL.prototype={
$0(){var s=this.a,r=s.e
if((r&16)===0)return
s.e=(r|74)>>>0
s.d.cq(s.c)
s.e=(s.e&4294967231)>>>0},
$S:0}
A.dB.prototype={
a5(a,b,c,d){var s=A.h(this)
s.h("~(1)?").a(a)
t.Y.a(c)
return this.a.dd(s.h("~(1)?").a(a),d,c,b===!0)},
aY(a){return this.a5(a,null,null,null)},
hj(a,b,c){return this.a5(a,b,c,null)},
hi(a,b){return this.a5(a,null,b,null)},
cg(a,b,c){return this.a5(a,null,b,c)}}
A.bf.prototype={
sb_(a){this.a=t.aJ.a(a)},
gb_(){return this.a}}
A.aJ.prototype={
ck(a){this.$ti.h("az<1>").a(a).ae(this.b)}}
A.cp.prototype={
ck(a){a.ag(this.b,this.c)}}
A.hl.prototype={
ck(a){a.af()},
gb_(){return null},
sb_(a){throw A.e(A.b8("No events after a done."))},
$ibf:1}
A.aL.prototype={
b3(a){var s,r=this
r.$ti.h("az<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.lw(new A.k8(r,a))
r.a=1},
l(a,b){var s=this,r=s.c
if(r==null)s.b=s.c=b
else{r.sb_(b)
s.c=b}}}
A.k8.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.h("az<1>").a(this.b)
r=p.b
q=r.gb_()
p.b=q
if(q==null)p.c=null
r.ck(s)},
$S:0}
A.dw.prototype={
ci(a){this.$ti.h("~(1)?").a(a)},
cj(){var s=this.a
if(s>=0)this.a=s+2},
bv(){var s=this,r=s.a-2
if(r<0)return
if(r===0){s.a=1
A.lw(s.gcZ())}else s.a=r},
P(){this.a=-1
this.c=null
return $.dM()},
ff(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.cq(s)}}else r.a=q},
$iaj:1}
A.hu.prototype={}
A.kn.prototype={
$0(){return this.a.bM(this.b)},
$S:0}
A.eY.prototype={$imo:1}
A.hs.prototype={
cq(a){var s,r,q
t.M.a(a)
try{if(B.d===$.u){a.$0()
return}A.n2(null,null,this,a,t.H)}catch(q){s=A.a_(q)
r=A.aO(q)
A.dF(A.a3(s),t.l.a(r))}},
cs(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.d===$.u){a.$1(b)
return}A.n4(null,null,this,a,b,t.H,c)}catch(q){s=A.a_(q)
r=A.aO(q)
A.dF(A.a3(s),t.l.a(r))}},
ht(a,b,c,d,e){var s,r,q
d.h("@<0>").v(e).h("~(1,2)").a(a)
d.a(b)
e.a(c)
try{if(B.d===$.u){a.$2(b,c)
return}A.n3(null,null,this,a,b,c,t.H,d,e)}catch(q){s=A.a_(q)
r=A.aO(q)
A.dF(A.a3(s),t.l.a(r))}},
c8(a){return new A.ka(this,t.M.a(a))},
fP(a,b){return new A.kb(this,b.h("~(0)").a(a),b)},
dF(a,b){b.h("0()").a(a)
if($.u===B.d)return a.$0()
return A.n2(null,null,this,a,b)},
cr(a,b,c,d){c.h("@<0>").v(d).h("1(2)").a(a)
d.a(b)
if($.u===B.d)return a.$1(b)
return A.n4(null,null,this,a,b,c,d)},
hs(a,b,c,d,e,f){d.h("@<0>").v(e).v(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.u===B.d)return a.$2(b,c)
return A.n3(null,null,this,a,b,c,d,e,f)},
cm(a,b,c,d){return b.h("@<0>").v(c).v(d).h("1(2,3)").a(a)}}
A.ka.prototype={
$0(){return this.a.cq(this.b)},
$S:0}
A.kb.prototype={
$1(a){var s=this.c
return this.a.cs(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.ks.prototype={
$0(){A.ov(this.a,this.b)},
$S:0}
A.ez.prototype={
gm(a){return this.a},
gC(a){return this.a===0},
gJ(a){return this.a!==0},
gW(){return new A.eA(this,this.$ti.h("eA<1>"))},
aW(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.eA(a)},
eA(a){var s=this.d
if(s==null)return!1
return this.aO(this.cQ(s,a),a)>=0},
p(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.mu(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.mu(q,b)
return r}else return this.eP(b)},
eP(a){var s,r,q=this.d
if(q==null)return null
s=this.cQ(q,a)
r=this.aO(s,a)
return r<0?null:s[r+1]},
i(a,b,c){var s,r,q,p,o=this,n=o.$ti
n.c.a(b)
n.y[1].a(c)
s=o.d
if(s==null)s=o.d=A.q4()
r=A.kN(b)&1073741823
q=s[r]
if(q==null){A.mv(s,r,[b,c]);++o.a
o.e=null}else{p=o.aO(q,b)
if(p>=0)q[p+1]=c
else{q.push(b,c);++o.a
o.e=null}}},
a_(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.cH()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.p(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.e(A.am(m))}},
cH(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.cU(i.a,null,!1,t.z)
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
cQ(a,b){return a[A.kN(b)&1073741823]}}
A.eC.prototype={
aO(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.eA.prototype={
gm(a){return this.a.a},
gC(a){return this.a.a===0},
gJ(a){return this.a.a!==0},
gE(a){var s=this.a
return new A.eB(s,s.cH(),this.$ti.h("eB<1>"))}}
A.eB.prototype={
gB(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.e(A.am(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iS:1}
A.eE.prototype={
gE(a){var s=this,r=new A.eF(s,s.r,A.h(s).h("eF<1>"))
r.c=s.e
return r},
gm(a){return this.a},
gC(a){return this.a===0},
l(a,b){var s,r,q=this
A.h(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cG(s==null?q.b=A.le():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cG(r==null?q.c=A.le():r,b)}else return q.ep(b)},
ep(a){var s,r,q,p=this
A.h(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.le()
r=p.ex(a)
q=s[r]
if(q==null)s[r]=[p.bL(a)]
else{if(p.aO(q,a)>=0)return!1
q.push(p.bL(a))}return!0},
cG(a,b){A.h(this).c.a(b)
if(t.br.a(a[b])!=null)return!1
a[b]=this.bL(b)
return!0},
bL(a){var s=this,r=new A.hq(A.h(s).c.a(a))
if(s.e==null)s.e=s.f=r
else s.f=s.f.b=r;++s.a
s.r=s.r+1&1073741823
return r},
ex(a){return J.aP(a)&1073741823},
aO(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.bF(a[r].a,b))return r
return-1}}
A.hq.prototype={}
A.eF.prototype={
gB(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.e(A.am(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iS:1}
A.D.prototype={
gE(a){return new A.b5(a,this.gm(a),A.b_(a).h("b5<D.E>"))},
a3(a,b){return this.p(a,b)},
gC(a){return this.gm(a)===0},
gJ(a){return this.gm(a)!==0},
gZ(a){if(this.gm(a)===0)throw A.e(A.it())
return this.p(a,0)},
ak(a,b){var s
if(this.gm(a)===0)return""
s=A.l9("",a,b)
return s.charCodeAt(0)==0?s:s},
dK(a,b){return new A.co(a,b.h("co<0>"))},
aZ(a,b,c){var s=A.b_(a)
return new A.X(a,s.v(c).h("1(D.E)").a(b),s.h("@<D.E>").v(c).h("X<1,2>"))},
bD(a,b){return A.la(a,b,null,A.b_(a).h("D.E"))},
h7(a,b,c,d){var s
A.b_(a).h("D.E?").a(d)
A.aw(b,c,this.gm(a))
for(s=b;s<c;++s)this.i(a,s,d)},
ab(a,b,c,d,e){var s,r,q
A.b_(a).h("f<D.E>").a(d)
A.aw(b,c,this.gm(a))
s=c-b
if(s===0)return
A.ea(e,"skipCount")
r=J.aB(d)
if(e+s>r.gm(d))throw A.e(A.lT())
if(e<b)for(q=s-1;q>=0;--q)this.i(a,b+q,r.p(d,e+q))
else for(q=0;q<s;++q)this.i(a,b+q,r.p(d,e+q))},
k(a){return A.iu(a,"[","]")}}
A.T.prototype={
a2(a,b,c){var s=A.h(this)
return A.m1(this,s.h("T.K"),s.h("T.V"),b,c)},
a_(a,b){var s,r,q,p=A.h(this)
p.h("~(T.K,T.V)").a(b)
for(s=this.gW(),s=s.gE(s),p=p.h("T.V");s.t();){r=s.gB()
q=this.p(0,r)
b.$2(r,q==null?p.a(q):q)}},
dw(a,b,c,d){var s,r,q,p,o,n=A.h(this)
n.v(c).v(d).h("bu<1,2>(T.K,T.V)").a(b)
s=A.o(c,d)
for(r=this.gW(),r=r.gE(r),n=n.h("T.V");r.t();){q=r.gB()
p=this.p(0,q)
o=b.$2(q,p==null?n.a(p):p)
s.i(0,o.a,o.b)}return s},
gm(a){var s=this.gW()
return s.gm(s)},
gC(a){var s=this.gW()
return s.gC(s)},
gJ(a){var s=this.gW()
return s.gJ(s)},
k(a){return A.l0(this)},
$id:1}
A.iC.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.J(a)
r.a=(r.a+=s)+": "
s=A.J(b)
r.a+=s},
$S:13}
A.e2.prototype={
gE(a){var s=this
return new A.ct(s,s.c,s.d,s.b,s.$ti.h("ct<1>"))},
gC(a){return this.b===this.c},
gm(a){return(this.c-this.b&this.a.length-1)>>>0},
a3(a,b){var s,r,q=this,p=q.gm(0)
if(0>b||b>=p)A.v(A.io(b,p,q,null,"index"))
p=q.a
s=p.length
r=(q.b+b&s-1)>>>0
if(!(r>=0&&r<s))return A.c(p,r)
p=q.$ti.c.a(p[r])
return p},
F(a){var s,r,q=this,p=q.b
if(p!==q.c){for(s=q.a,r=s.length-1;p!==q.c;p=(p+1&r)>>>0)B.b.i(s,p,null)
q.b=q.c=0;++q.d}},
k(a){return A.iu(this,"{","}")},
$ipn:1}
A.ct.prototype={
gB(){var s=this.$ti.c.a(this.e)
return s},
t(){var s,r,q=this,p=q.a
if(q.c!==p.d)A.v(A.am(p))
s=q.d
if(s===q.b){q.e=null
return!1}p=p.a
r=p.length
if(!(s<r))return A.c(p,s)
q.e=p[s]
q.d=(s+1&r-1)>>>0
return!0},
$iS:1}
A.bz.prototype={
gC(a){return this.gm(this)===0},
aZ(a,b,c){var s=A.h(this)
return new A.bX(this,s.v(c).h("1(2)").a(b),s.h("@<1>").v(c).h("bX<1,2>"))},
k(a){return A.iu(this,"{","}")},
$iq:1,
$if:1,
$ih0:1}
A.eN.prototype={}
A.ho.prototype={
p(a,b){var s,r=this.b
if(r==null)return this.c.p(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.fv(b):s}},
gm(a){return this.b==null?this.c.a:this.b9().length},
gC(a){return this.gm(0)===0},
gJ(a){return this.gm(0)>0},
gW(){if(this.b==null){var s=this.c
return new A.c0(s,A.h(s).h("c0<1>"))}return new A.hp(this)},
a_(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a_(0,b)
s=o.b9()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.ko(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.e(A.am(o))}},
b9(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.w(Object.keys(this.a),t.s)
return s},
fv(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.ko(this.a[a])
return this.b[a]=s}}
A.hp.prototype={
gm(a){return this.a.gm(0)},
a3(a,b){var s=this.a
if(s.b==null)s=s.gW().a3(0,b)
else{s=s.b9()
if(!(b>=0&&b<s.length))return A.c(s,b)
s=s[b]}return s},
gE(a){var s=this.a
if(s.b==null){s=s.gW()
s=s.gE(s)}else{s=s.b9()
s=new J.bI(s,s.length,A.P(s).h("bI<1>"))}return s}}
A.ki.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:14}
A.kh.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:14}
A.f7.prototype={
hm(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.aw(a4,a5,a2)
s=$.lz()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.c(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.c(a3,k)
h=A.kF(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.c(a3,g)
f=A.kF(a3.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.c(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.c(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.ab("")
g=o}else g=o
g.a+=B.a.u(a3,p,q)
c=A.av(j)
g.a+=c
p=k
continue}}throw A.e(A.R("Invalid base64 data",a3,q))}if(o!=null){a2=B.a.u(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.lG(a3,m,a5,n,l,r)
else{b=B.c.am(r-1,4)+1
if(b===1)throw A.e(A.R(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aC(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.lG(a3,m,a5,n,l,a)
else{b=B.c.am(a,4)
if(b===1)throw A.e(A.R(a1,a3,a5))
if(b>1)a3=B.a.aC(a3,a5,a5,b===2?"==":"=")}return a3}}
A.f9.prototype={}
A.f8.prototype={
Y(a){var s,r,q=A.aw(0,null,a.length)
if(0===q)return new Uint8Array(0)
s=new A.jK()
r=s.fV(a,0,q)
r.toString
s.ai(a,q)
return r}}
A.jK.prototype={
fV(a,b,c){var s,r=this,q=r.a
if(q<0){r.a=A.mp(a,b,c,q)
return null}if(b===c)return new Uint8Array(0)
s=A.q0(a,b,c,q)
r.a=A.q2(a,b,c,s,0,r.a)
return s},
ai(a,b){var s=this.a
if(s<-1)throw A.e(A.R("Missing padding character",a,b))
if(s>0)throw A.e(A.R("Invalid length, must be multiple of four",a,b))
this.a=-1}}
A.bR.prototype={}
A.aQ.prototype={$iaV:1}
A.fk.prototype={}
A.e_.prototype={
k(a){var s=A.fl(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fw.prototype={
k(a){return"Cyclic error in JSON stringify"}}
A.fv.prototype={
fU(a,b){var s=A.rf(a,this.gfY().a)
return s},
h2(a,b){var s=A.q7(a,this.gh3().b,null)
return s},
gh3(){return B.a5},
gfY(){return B.a4}}
A.fy.prototype={}
A.fx.prototype={}
A.k6.prototype={
dM(a){var s,r,q,p,o,n=this,m=a.length
for(s=0,r=0;r<m;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<m&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)n.by(a,s,r)
s=r+1
n.K(92)
n.K(117)
n.K(100)
p=q>>>8&15
n.K(p<10?48+p:87+p)
p=q>>>4&15
n.K(p<10?48+p:87+p)
p=q&15
n.K(p<10?48+p:87+p)}}continue}if(q<32){if(r>s)n.by(a,s,r)
s=r+1
n.K(92)
switch(q){case 8:n.K(98)
break
case 9:n.K(116)
break
case 10:n.K(110)
break
case 12:n.K(102)
break
case 13:n.K(114)
break
default:n.K(117)
n.K(48)
n.K(48)
p=q>>>4&15
n.K(p<10?48+p:87+p)
p=q&15
n.K(p<10?48+p:87+p)
break}}else if(q===34||q===92){if(r>s)n.by(a,s,r)
s=r+1
n.K(92)
n.K(q)}}if(s===0)n.T(a)
else if(s<m)n.by(a,s,m)},
bI(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.e(new A.fw(a,null))}B.b.l(s,a)},
bx(a){var s,r,q,p,o=this
if(o.dL(a))return
o.bI(a)
try{s=o.b.$1(a)
if(!o.dL(s)){q=A.lZ(a,null,o.gd1())
throw A.e(q)}q=o.a
if(0>=q.length)return A.c(q,-1)
q.pop()}catch(p){r=A.a_(p)
q=A.lZ(a,r,o.gd1())
throw A.e(q)}},
dL(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.hC(a)
return!0}else if(a===!0){q.T("true")
return!0}else if(a===!1){q.T("false")
return!0}else if(a==null){q.T("null")
return!0}else if(typeof a=="string"){q.T('"')
q.dM(a)
q.T('"')
return!0}else if(t.j.b(a)){q.bI(a)
q.hA(a)
s=q.a
if(0>=s.length)return A.c(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bI(a)
r=q.hB(a)
s=q.a
if(0>=s.length)return A.c(s,-1)
s.pop()
return r}else return!1},
hA(a){var s,r,q=this
q.T("[")
s=J.aB(a)
if(s.gJ(a)){q.bx(s.p(a,0))
for(r=1;r<s.gm(a);++r){q.T(",")
q.bx(s.p(a,r))}}q.T("]")},
hB(a){var s,r,q,p,o,n=this,m={}
if(a.gC(a)){n.T("{}")
return!0}s=a.gm(a)*2
r=A.cU(s,null,!1,t.X)
q=m.a=0
m.b=!0
a.a_(0,new A.k7(m,r))
if(!m.b)return!1
n.T("{")
for(p='"';q<s;q+=2,p=',"'){n.T(p)
n.dM(A.L(r[q]))
n.T('":')
o=q+1
if(!(o<s))return A.c(r,o)
n.bx(r[o])}n.T("}")
return!0}}
A.k7.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.i(s,r.a++,a)
B.b.i(s,r.a++,b)},
$S:13}
A.k5.prototype={
gd1(){var s=this.c
return s instanceof A.ab?s.k(0):null},
hC(a){this.c.cu(B.f.k(a))},
T(a){this.c.cu(a)},
by(a,b,c){this.c.cu(B.a.u(a,b,c))},
K(a){this.c.K(a)}}
A.hd.prototype={
fT(a,b){t.L.a(a)
return(b===!0?B.bf:B.be).Y(a)}}
A.he.prototype={
Y(a){var s,r,q,p=a.length,o=A.aw(0,null,p)
if(o===0)return new Uint8Array(0)
s=new Uint8Array(o*3)
r=new A.kj(s)
if(r.eN(a,0,o)!==o){q=o-1
if(!(q>=0&&q<p))return A.c(a,q)
r.c6()}return B.k.a0(s,0,r.b)}}
A.kj.prototype={
c6(){var s,r=this,q=r.c,p=r.b,o=r.b=p+1
q.$flags&2&&A.Q(q)
s=q.length
if(!(p<s))return A.c(q,p)
q[p]=239
p=r.b=o+1
if(!(o<s))return A.c(q,o)
q[o]=191
r.b=p+1
if(!(p<s))return A.c(q,p)
q[p]=189},
fK(a,b){var s,r,q,p,o,n=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=n.c
q=n.b
p=n.b=q+1
r.$flags&2&&A.Q(r)
o=r.length
if(!(q<o))return A.c(r,q)
r[q]=s>>>18|240
q=n.b=p+1
if(!(p<o))return A.c(r,p)
r[p]=s>>>12&63|128
p=n.b=q+1
if(!(q<o))return A.c(r,q)
r[q]=s>>>6&63|128
n.b=p+1
if(!(p<o))return A.c(r,p)
r[p]=s&63|128
return!0}else{n.c6()
return!1}},
eN(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c){s=c-1
if(!(s>=0&&s<a.length))return A.c(a,s)
s=(a.charCodeAt(s)&64512)===55296}else s=!1
if(s)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=a.length,o=b;o<c;++o){if(!(o<p))return A.c(a,o)
n=a.charCodeAt(o)
if(n<=127){m=k.b
if(m>=q)break
k.b=m+1
r&2&&A.Q(s)
s[m]=n}else{m=n&64512
if(m===55296){if(k.b+4>q)break
m=o+1
if(!(m<p))return A.c(a,m)
if(k.fK(n,a.charCodeAt(m)))o=m}else if(m===56320){if(k.b+3>q)break
k.c6()}else if(n<=2047){m=k.b
l=m+1
if(l>=q)break
k.b=l
r&2&&A.Q(s)
if(!(m<q))return A.c(s,m)
s[m]=n>>>6|192
k.b=l+1
s[l]=n&63|128}else{m=k.b
if(m+2>=q)break
l=k.b=m+1
r&2&&A.Q(s)
if(!(m<q))return A.c(s,m)
s[m]=n>>>12|224
m=k.b=l+1
if(!(l<q))return A.c(s,l)
s[l]=n>>>6&63|128
k.b=m+1
if(!(m<q))return A.c(s,m)
s[m]=n&63|128}}}return o}}
A.el.prototype={
Y(a){return new A.hD(this.a).cL(t.L.a(a),0,null,!0)}}
A.hD.prototype={
cL(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.aw(b,c,J.bi(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.qC(a,b,s)
s-=b
p=b
b=0}if(d&&s-b>=15){o=l.a
n=A.qB(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bN(q,b,s,d)
o=l.b
if((o&1)!==0){m=A.qD(o)
l.b=0
throw A.e(A.R(m,a,p+l.c))}return n},
bN(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.ad(b+c,2)
r=q.bN(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bN(a,s,c,d)}return q.fX(a,b,c,d)},
fX(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.ab(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.c(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.c(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.c(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.av(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.av(h)
e.a+=p
break
case 65:p=A.av(h)
e.a+=p;--d
break
default:p=A.av(h)
e.a=(e.a+=p)+p
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break A
o=d+1
if(!(d>=0&&d<c))return A.c(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.c(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.c(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.c(a,l)
p=A.av(a[l])
e.a+=p}else{p=A.mh(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.av(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.aF.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.aF&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gA(a){return A.l2(this.a,this.b,B.j,B.j)},
a4(a,b){var s
t.dy.a(b)
s=B.c.a4(this.a,b.a)
if(s!==0)return s
return B.c.a4(this.b,b.b)},
N(){var s=this
if(s.c)return s
return new A.aF(s.a,s.b,!0)},
k(a){var s=this,r=A.lO(A.fR(s)),q=A.b2(A.m9(s)),p=A.b2(A.m5(s)),o=A.b2(A.m6(s)),n=A.b2(A.m8(s)),m=A.b2(A.ma(s)),l=A.i9(A.m7(s)),k=s.b,j=k===0?"":A.i9(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
X(){var s=this,r=A.fR(s)>=-9999&&A.fR(s)<=9999?A.lO(A.fR(s)):A.om(A.fR(s)),q=A.b2(A.m9(s)),p=A.b2(A.m5(s)),o=A.b2(A.m6(s)),n=A.b2(A.m8(s)),m=A.b2(A.ma(s)),l=A.i9(A.m7(s)),k=s.b,j=k===0?"":A.i9(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j},
$ial:1}
A.ia.prototype={
$1(a){if(a==null)return 0
return A.f1(a)},
$S:15}
A.ib.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.c(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:15}
A.au.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.au&&this.a===b.a},
gA(a){return B.c.gA(this.a)},
a4(a,b){return B.c.a4(this.a,t.fu.a(b).a)},
k(a){var s,r,q,p,o,n=this.a,m=B.c.ad(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.c.ad(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.c.ad(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.dA(B.c.k(n%1e6),6,"0")},
$ial:1}
A.jO.prototype={
k(a){return this.ac()}}
A.K.prototype={
gaG(){return A.pj(this)}}
A.dO.prototype={
k(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fl(s)
return"Assertion failed"}}
A.ba.prototype={}
A.aE.prototype={
gbQ(){return"Invalid argument"+(!this.a?"(s)":"")},
gbP(){return""},
k(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.J(p),n=s.gbQ()+q+o
if(!s.a)return n
return n+s.gbP()+": "+A.fl(s.gcc())},
gcc(){return this.b}}
A.dj.prototype={
gcc(){return A.mQ(this.b)},
gbQ(){return"RangeError"},
gbP(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.J(q):""
else if(q==null)s=": Not greater than or equal to "+A.J(r)
else if(q>r)s=": Not in inclusive range "+A.J(r)+".."+A.J(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.J(r)
return s}}
A.fo.prototype={
gcc(){return A.U(this.b)},
gbQ(){return"RangeError"},
gbP(){if(A.U(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.ek.prototype={
k(a){return"Unsupported operation: "+this.a}}
A.ha.prototype={
k(a){return"UnimplementedError: "+this.a}}
A.ax.prototype={
k(a){return"Bad state: "+this.a}}
A.fh.prototype={
k(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fl(s)+"."}}
A.fN.prototype={
k(a){return"Out of Memory"},
gaG(){return null},
$iK:1}
A.ef.prototype={
k(a){return"Stack Overflow"},
gaG(){return null},
$iK:1}
A.jR.prototype={
k(a){return"Exception: "+this.a}}
A.ao.prototype={
k(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.a.u(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.c(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.c(e,n)
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
k=""}return g+l+B.a.u(e,i,j)+k+"\n"+B.a.bz(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.J(f)+")"):g}}
A.f.prototype={
aZ(a,b,c){var s=A.h(this)
return A.c3(this,s.v(c).h("1(f.E)").a(b),s.h("f.E"),c)},
gm(a){var s,r=this.gE(this)
for(s=0;r.t();)++s
return s},
gC(a){return!this.gE(this).t()},
gJ(a){return!this.gC(this)},
a3(a,b){var s,r
A.ea(b,"index")
s=this.gE(this)
for(r=b;s.t();){if(r===0)return s.gB();--r}throw A.e(A.io(b,b-r,this,null,"index"))},
k(a){return A.oA(this,"(",")")}}
A.bu.prototype={
k(a){return"MapEntry("+this.a+": "+this.b+")"}}
A.O.prototype={
gA(a){return A.n.prototype.gA.call(this,0)},
k(a){return"null"}}
A.n.prototype={$in:1,
M(a,b){return this===b},
gA(a){return A.c9(this)},
k(a){return"Instance of '"+A.fS(this)+"'"},
gI(a){return A.nf(this)},
toString(){return this.k(this)}}
A.hx.prototype={
k(a){return""},
$iai:1}
A.aT.prototype={
gE(a){return new A.fW(this.a)}}
A.fW.prototype={
gB(){return this.d},
t(){var s,r,q,p=this,o=p.b=p.c,n=p.a,m=n.length
if(o===m){p.d=-1
return!1}if(!(o<m))return A.c(n,o)
s=n.charCodeAt(o)
r=o+1
if((s&64512)===55296&&r<m){if(!(r<m))return A.c(n,r)
q=n.charCodeAt(r)
if((q&64512)===56320){p.c=r+1
p.d=65536+((s&1023)<<10)+(q&1023)
return!0}}p.c=r
p.d=s
return!0},
$iS:1}
A.ab.prototype={
gm(a){return this.a.length},
cu(a){var s=A.J(a)
this.a+=s},
K(a){var s=A.av(a)
this.a+=s},
k(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ipA:1}
A.jt.prototype={
$2(a,b){throw A.e(A.R("Illegal IPv6 address, "+a,this.a,b))},
$S:33}
A.eW.prototype={
gcM(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.J(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gA(a){var s,r=this,q=r.y
if(q===$){s=B.a.gA(r.gcM())
r.y!==$&&A.nm("hashCode")
r.y=s
q=s}return q},
gdJ(){return this.b},
gbq(){var s=this.c
if(s==null)return""
if(B.a.L(s,"[")&&!B.a.O(s,"v",1))return B.a.u(s,1,s.length-1)
return s},
gbu(){var s=this.d
return s==null?A.mG(this.a):s},
gdC(){var s=this.f
return s==null?"":s},
gdr(){var s=this.r
return s==null?"":s},
cd(a){var s=this.a
if(a.length!==s.length)return!1
return A.mS(a,s,0)>=0},
dD(a){var s,r,q,p,o,n,m,l=this
a=A.lk(a,0,a.length)
s=a==="file"
r=l.b
q=l.d
if(a!==l.a)q=A.lj(q,a)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.L(o,"/"))o="/"+o
m=o
return A.lh(a,r,p,q,m,l.f,l.r)},
gds(){return this.c!=null},
gdv(){return this.f!=null},
gdt(){return this.r!=null},
k(a){return this.gcM()},
M(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.B.b(b))if(p.a===b.gb4())if(p.c!=null===b.gds())if(p.b===b.gdJ())if(p.gbq()===b.gbq())if(p.gbu()===b.gbu())if(p.e===b.gdB()){r=p.f
q=r==null
if(!q===b.gdv()){if(q)r=""
if(r===b.gdC()){r=p.r
q=r==null
if(!q===b.gdt()){s=q?"":r
s=s===b.gdr()}}}}return s},
$idt:1,
gb4(){return this.a},
gdB(){return this.e}}
A.js.prototype={
gdI(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.c(m,0)
s=o.a
m=m[0]+1
r=B.a.aB(s,"?",m)
q=s.length
if(r>=0){p=A.eX(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.hk("data","",n,n,A.eX(s,m,q,128,!1,!1),p,n)}return m},
k(a){var s,r=this.b
if(0>=r.length)return A.c(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.ht.prototype={
gds(){return this.c>0},
gdu(){return this.c>0&&this.d+1<this.e},
gdv(){return this.f<this.r},
gdt(){return this.r<this.a.length},
cd(a){var s=a.length
if(s===0)return this.b<0
if(s!==this.b)return!1
return A.mS(a,this.a,0)>=0},
gb4(){var s=this.w
return s==null?this.w=this.ey():s},
ey(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.L(r.a,"http"))return"http"
if(q===5&&B.a.L(r.a,"https"))return"https"
if(s&&B.a.L(r.a,"file"))return"file"
if(q===7&&B.a.L(r.a,"package"))return"package"
return B.a.u(r.a,0,q)},
gdJ(){var s=this.c,r=this.b+3
return s>r?B.a.u(this.a,r,s-1):""},
gbq(){var s=this.c
return s>0?B.a.u(this.a,s,this.d):""},
gbu(){var s,r=this
if(r.gdu())return A.f1(B.a.u(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.L(r.a,"http"))return 80
if(s===5&&B.a.L(r.a,"https"))return 443
return 0},
gdB(){return B.a.u(this.a,this.e,this.f)},
gdC(){var s=this.f,r=this.r
return s<r?B.a.u(this.a,s+1,r):""},
gdr(){var s=this.r,r=this.a
return s<r.length?B.a.a8(r,s+1):""},
dD(a){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
a=A.lk(a,0,a.length)
s=!(h.b===a.length&&B.a.L(h.a,a))
r=a==="file"
q=h.c
p=q>0?B.a.u(h.a,h.b+3,q):""
o=h.gdu()?h.gbu():g
if(s)o=A.lj(o,a)
q=h.c
if(q>0)n=B.a.u(h.a,q,h.d)
else n=p.length!==0||o!=null||r?"":g
q=h.a
m=h.f
l=B.a.u(q,h.e,m)
if(!r)k=n!=null&&l.length!==0
else k=!0
if(k&&!B.a.L(l,"/"))l="/"+l
k=h.r
j=m<k?B.a.u(q,m+1,k):g
m=h.r
i=m<q.length?B.a.a8(q,m+1):g
return A.lh(a,p,n,o,l,j,i)},
gA(a){var s=this.x
return s==null?this.x=B.a.gA(this.a):s},
M(a,b){if(b==null)return!1
if(this===b)return!0
return t.B.b(b)&&this.a===b.k(0)},
k(a){return this.a},
$idt:1}
A.hk.prototype={}
A.iG.prototype={
k(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.kK.prototype={
$1(a){var s,r,q,p
if(A.n0(a))return a
s=this.a
if(s.aW(a))return s.p(0,a)
if(t.f.b(a)){r={}
s.i(0,a,r)
for(s=a.gW(),s=s.gE(s);s.t();){q=s.gB()
r[q]=this.$1(a.p(0,q))}return r}else if(t.e.b(a)){p=[]
s.i(0,a,p)
B.b.aw(p,J.lD(a,this,t.z))
return p}else return a},
$S:26}
A.kP.prototype={
$1(a){return this.a.D(this.b.h("0/?").a(a))},
$S:2}
A.kQ.prototype={
$1(a){if(a==null)return this.a.H(new A.iG(a===undefined))
return this.a.H(a)},
$S:2}
A.k3.prototype={
ea(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.e(A.bc("No source of cryptographically secure random numbers available."))},
hl(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.e(A.md("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.Q(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.U(Math.pow(256,s))
for(o=a-1,n=(a&o)>>>0===0;;){crypto.getRandomValues(J.lB(B.am.gdn(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.bo.prototype={
q(){return this.a.q()},
$iay:1}
A.ee.prototype={
fO(a){var s,r,q=this.$ti
q.h("aa<1>").a(a)
s=A.mr("subscription")
r=A.aU(new A.iQ(s),null,!0,q.y[1])
s.b=a.cg(new A.iR(this,r),r.gfR(),r.gdk())
return new A.M(r,A.h(r).h("M<1>"))}}
A.iQ.prototype={
$0(){return this.a.d4().P()},
$S:3}
A.iR.prototype={
$1(a){var s,r,q,p=this.a.$ti
p.c.a(a)
try{this.b.l(0,p.y[1].a(a))}catch(q){p=A.a_(q)
if(t.A.b(p)){s=p
r=A.aO(q)
this.b.ah(s,r)}else throw q}},
$S(){return this.a.$ti.h("~(1)")}}
A.fi.prototype={}
A.h9.prototype={}
A.h8.prototype={}
A.fn.prototype={}
A.fj.prototype={}
A.h_.prototype={}
A.f2.prototype={}
A.i1.prototype={}
A.fc.prototype={
aa(){var s=0,r=A.H(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g
var $async$aa=A.I(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:h=new A.p($.u,t.D)
o.f=new A.ac(h,t.h)
n=A.tZ()
m=null
q=3
s=6
return A.y(n.$1(o.a.a),$async$aa)
case 6:m=b
q=1
s=5
break
case 3:q=2
g=p.pop()
l=A.a_(g)
h=A.J(l)
throw A.e(new A.ch("transport_error","Failed to connect to Hub: "+h))
s=5
break
case 2:s=1
break
case 5:o.b=m
j=A.o6(m,1)
o.c=j
i=j.c
o.d=new A.eu(i,A.h(i).h("eu<1>")).hj(o.gen(),!1,o.gf7())
m.d.a.b1(new A.i2(o),t.H)
s=7
return A.y(h,$async$aa)
case 7:return A.F(null,r)
case 1:return A.E(p.at(-1),r)}})
return A.G($async$aa,r)},
aK(a){return this.f6(t.R.a(a))},
f6(a){var s=0,r=A.H(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c,b
var $async$aK=A.I(function(a0,a1){if(a0===1)return A.E(a1,r)
for(;;)switch(s){case 0:o=a instanceof A.bp
n=o?a:null
s=o?4:5
break
case 4:s=6
return A.y(p.bg(n),$async$aK)
case 6:s=3
break
case 5:o=a instanceof A.bK
m=o?a:null
if(o){l=B.a.a7(m.a)
if(l.length===0)A.v(B.ax)
o=m.b
k=m.c
p.e=new A.fT(new A.fU(l),o,A.oM(k,A.P(k).c))
o=p.f
if(o!=null&&(o.a.a&30)===0)o.az()
s=3
break}o=a instanceof A.bJ
j=o?a:null
if(o){o=p.f
if(o!=null&&(o.a.a&30)===0)o.H(new A.f6("auth_failed",j.b))
s=3
break}o=a instanceof A.c4
i=o?a:null
if(o){o=p.r
if(!o.gC(0)){k=o.b
if(k===o.c)A.v(A.it());++o.d
h=o.a
g=h.length
if(!(k<g)){q=A.c(h,k)
s=1
break}f=o.$ti.c.a(h[k])
B.b.i(h,k,null)
o.b=(o.b+1&g-1)>>>0
f.D(i.a)}s=3
break}o=a instanceof A.c8
e=o?a:null
if(o){d=p.w.S(0,e.a)
if(d!=null){o=new A.aF(Date.now(),0,!1).N()
k=e.b
d.D(new A.au(o.b-k.b+1000*(o.a-k.a)))}s=3
break}o=a instanceof A.bV
c=o?a:null
if(o){o=p.x.S(0,c.a)
if(o!=null)o.D(c.b)
s=3
break}o=a instanceof A.cf
c=o?a:null
if(o){o=p.Q.S(0,c.a)
if(o!=null){k=c.d
if(k.length===0)new Uint8Array(0)
else B.K.Y(k)
o.D(new A.h_())}s=3
break}o=a instanceof A.bW
c=o?a:null
if(o){o=p.as.S(0,c.a)
if(o!=null)o.D(new A.fj())
s=3
break}o=a instanceof A.bU
c=o?a:null
if(o){o=p.y.S(0,c.a)
if(o!=null)o.D(new A.fi())
s=3
break}o=a instanceof A.bG
c=o?a:null
if(o){o=p.z.S(0,c.a)
if(o!=null)o.D(new A.f2())
s=3
break}o=a instanceof A.ck
c=o?a:null
if(o){if(p.at.S(0,c.a)!=null){o=A.f0()
A.f0()
A.f0()
o.D(new A.h9())}s=3
break}o=a instanceof A.cl
c=o?a:null
if(o){if(p.at.S(0,c.a)!=null){o=A.f0()
k=c.c
h=c.b
o.H(new A.jm(h,k))}s=3
break}o=a instanceof A.cj
c=o?a:null
if(o){o=p.ax.S(0,c.a)
if(o!=null)o.D(c.b)
s=3
break}o=a instanceof A.ci
c=o?a:null
if(o){o=p.ay.S(0,c.a)
if(o!=null)o.D(new A.h8())
s=3
break}o=a instanceof A.bH
c=o?a:null
if(o){o=p.ch.S(0,c.a)
if(o!=null)o.D(new A.fn())
s=3
break}o=a instanceof A.bq
c=o?a:null
if(o){o=p.CW.S(0,c.a)
if(o!=null)o.D(c)
s=3
break}o=a instanceof A.c5
b=o?a:null
s=o?7:8
break
case 7:s=9
return A.y(p.aP(b),$async$aK)
case 9:s=3
break
case 8:s=3
break
case 3:case 1:return A.F(q,r)}})
return A.G($async$aK,r)},
bg(a){var s=0,r=A.H(t.H),q=this,p,o
var $async$bg=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:o=q.b
if(o!=null)o.an(new A.an(new A.bp("client",1,1,null,A.z(["agent","omnyshell-client"],t.N,t.z))))
o=a.d
if(o==null)o=""
s=2
return A.y(q.a.b.c9(o),$async$bg)
case 2:p=c
o=q.b
if(o!=null)o.an(new A.an(p))
return A.F(null,r)}})
return A.G($async$bg,r)},
b0(a,b,c){var s=0,r=A.H(t.J),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$b0=A.I(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:h=n.b
if(h==null||!h.e)A.v(B.b_)
h=n.c
m=h.cN(h.e++)
h=m
k=$.u
j=new A.bx(h,new A.ac(new A.p(k,t.D),t.h),new A.ac(new A.p(k,t.fJ),t.bS),new A.ac(new A.p(k,t.gg),t.d8),B.E)
h=h.f
h=t.a4.a(new A.M(h,A.h(h).h("M<1>")).aY(j.gf4()))
j.f!==$&&A.bE("_controlSub")
j.f=h
l=j
h=n.b
h.toString
h.an(new A.an(new A.cc(m.a,b,a,null,B.r,B.A,null,c,null,null)))
p=4
s=7
return A.y(l.c.a,$async$b0)
case 7:p=2
s=6
break
case 4:p=3
g=o.pop()
h=n.c
h.toString
s=8
return A.y(h.aT(m.a),$async$b0)
case 8:throw g
s=6
break
case 3:s=2
break
case 6:q=l
s=1
break
case 1:return A.F(q,r)
case 2:return A.E(o.at(-1),r)}})
return A.G($async$b0,r)},
cX(){var s,r,q,p,o,n=this
n.e=null
s=n.f
if(s!=null&&(s.a.a&30)===0)s.H(B.b0)
for(s=n.r,r=A.q8(s,s.$ti.c),q=r.$ti.c;r.t();){p=q.a(r.e)
if(!p.gR())p.H(B.e)}s.F(0)
for(s=n.w,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.x,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.y,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.z,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.Q,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.as,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.at,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();)if(!A.f0().gR())A.f0().H(B.e)
s.F(0)
for(s=n.ax,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.ay,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.ch,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
for(s=n.CW,r=new A.N(s,s.r,s.e,A.h(s).h("N<2>"));r.t();){q=r.d
if(!q.gR())q.H(B.e)}s.F(0)
s=n.cx
r=A.h(s).h("c1<2>")
r=A.a2(new A.c1(s,r),r.h("f.E"))
q=r.length
o=0
for(;o<q;++o)r[o].q()
s.F(0)
n.a.f.$0()},
aP(a){var s=0,r=A.H(t.H),q,p=this,o,n,m,l
var $async$aP=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:l=p.c
if(l==null){s=1
break}o=a.a
if(l.b.aW(o))A.v(A.b8("Channel "+o+" already exists"))
l.cN(o)
n=new A.hC()
m=p.cx
m.i(0,o,n)
s=6
return A.y(n.aa(),$async$aP)
case 6:s=c?3:5
break
case 3:m=p.b
if(m!=null)m.an(new A.an(new A.c7(o,a.b)))
s=4
break
case 5:m.S(0,o)
m=p.b
if(m!=null)m.an(new A.an(new A.c6(o,a.b,"dial_failed","could not reach "+a.c+":"+a.d)))
s=7
return A.y(l.aT(o),$async$aP)
case 7:case 4:case 1:return A.F(q,r)}})
return A.G($async$aP,r)},
q(){var s=0,r=A.H(t.H),q=this,p,o
var $async$q=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:o=q.d
o=o==null?null:o.P()
p=t.H
s=2
return A.y(o instanceof A.p?o:A.dx(o,p),$async$q)
case 2:o=q.c
o=o==null?null:o.aA()
s=3
return A.y(o instanceof A.p?o:A.dx(o,p),$async$q)
case 3:o=q.b
o=o==null?null:o.q()
s=4
return A.y(o instanceof A.p?o:A.dx(o,p),$async$q)
case 4:q.e=q.c=q.b=null
return A.F(null,r)}})
return A.G($async$q,r)}}
A.i2.prototype={
$1(a){return this.a.cX()},
$S:43}
A.kt.prototype={
$1(a){return A.L(a).length===0},
$S:17}
A.i3.prototype={
gm(a){return this.a.length},
l(a,b){var s,r,q
if(B.a.a7(b).length===0)return!1
s=this.a
if(s.length!==0&&B.b.gce(s)===b)return!1
B.b.l(s,b)
r=s.length
q=this.b
if(r>q)B.b.co(s,0,r-q)
return!0}}
A.im.prototype={
hz(a,b){var s,r,q,p=this,o=A.iB(p.a.a,t.N),n=p.b
if(n===0)return null
s=o.length
if(n===s){p.c=a
p.d=b}r=p.d
if(r==null)r=""
for(q=n-1;q>=0;--q){if(!(q<s))return A.c(o,q)
n=o[q]
if(B.a.L(n,r)){p.b=q
return n}}return null},
h0(){var s,r,q=this,p=A.iB(q.a.a,t.N),o=q.b,n=p.length
if(o>=n)return null
s=q.d
if(s==null)s=""
for(r=o+1;r<n;++r){if(!(r>=0))return A.c(p,r)
o=p[r]
if(B.a.L(o,s)){q.b=r
return o}}q.b=n
return q.c},
al(){var s=this
s.b=s.a.a.length
s.c=""
s.d=null}}
A.i8.prototype={}
A.i6.prototype={
gaD(){var s=this.a,r=B.c.ad(s.length,2)
return new A.eL(B.a.u(s,0,r),B.a.a8(s,r))},
h6(a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=null,a5=this.b
B.b.aw(a5,a6)
s=new A.hj(A.w([],t.eS))
r=B.i.Y(this.a)
for(q=a5.$flags|0,p=t.L,o=r.length,n=t.s,m=a4,l=m,k=l,j=k,i=j,h=!1;g=a4,!0;h=!0){f=A.oi(a5,r)
if(f<0)break
e=f+o
d=B.b.aB(a5,10,e)
if(d<0){g=f
break}s.l(0,new Uint8Array(A.bC(B.b.a0(a5,0,f))))
if(d>e){c=d-1
if(!(c<a5.length))return A.c(a5,c)
c=a5[c]===13}else c=!1
e=p.a(B.b.a0(a5,e,c?d-1:d))
b=new A.hD(!0).cL(e,0,a4,!0)
if(B.a.V(b,"\x1b")){e=$.np()
b=A.lx(b,e,"")}if(b.length!==0){a=A.w(b.split("\t"),n)
if(0>=a.length)return A.c(a,0)
i=a[0]
j=A.i7(a,1)
k=A.i7(a,2)
l=A.i7(a,3)
a0=A.i7(a,4)
if(a0!=null)m=A.l3(a0,a4)}a1=d+1
q&1&&A.Q(a5,18)
A.aw(0,a1,a5.length)
a5.splice(0,a1)}if(g!=null){if(g>0){s.l(0,new Uint8Array(A.bC(B.b.a0(a5,0,g))))
B.b.co(a5,0,g)}}else{a2=A.oj(a5,r)
p=a5.length
if(p>a2){a3=p-a2
s.l(0,new Uint8Array(A.bC(B.b.a0(a5,0,a3))))
B.b.co(a5,0,a3)}}return new A.i8(s.dG(),i,j,k,l,h,m)}}
A.dn.prototype={}
A.iP.prototype={}
A.fp.prototype={
aH(){var s,r,q,p=this
if(p.as)return
p.as=!0
s=p.a
r=s.b
q=r.d
p.z=new A.M(q,A.h(q).h("M<1>")).aY(p.gfo())
q=r.e
p.Q=new A.M(q,A.h(q).h("M<1>")).aY(p.gfm())
s.d.a.b1(p.gfc(),t.H).dq(new A.is(p))
s=p.c
q=t.L
r.b7(B.m,q.a(B.i.Y(s.gcb()+"\n")),null)
r.b7(B.m,q.a(B.i.Y(s.bp(p.b)+"\n")),null)},
fp(a){var s,r,q,p=this
t.p.a(a)
if(p.ax||p.a.w!=null||a.length===0)return
p.a.cv(a.length)
s=p.b.h6(a)
r=s.a
if(r.length!==0){p.f.$1(r)
q=p.CW
if(q!=null)q.l(0,r)}r=s.b
if(r!=null){p.cx=r
p.cy=s.c
p.db=s.d
p.dx=s.e}if(s.f){p.at=!1
p.x.$1(!1)
p.w.$1(p.d3())
p.fC(s.r)}},
fn(a){var s,r=this
t.p.a(a)
if(r.ax||r.a.w!=null||a.length===0)return
r.a.cv(a.length)
r.f.$1(a)
s=r.CW
if(s!=null)s.l(0,a)},
fC(a){var s,r,q=this,p=q.ch
if(p==null)return
q.ch=null
s=q.CW
r=s==null?null:s.dG()
if(r==null)r=new Uint8Array(0)
q.CW=null
if((p.a.a&30)===0)p.D(new A.iP(r,a))},
d3(){var s=this
return new A.dn(s.cx,s.cy,s.db,s.dx)},
e0(a){var s,r,q=this
if(q.ax)return
if(B.a.a7(a).length===0){q.w.$1(q.d3())
return}q.at=!0
q.x.$1(!0)
s=q.c
r=q.b
q.a.b.b7(B.m,t.L.a(B.i.Y(s.ct(a,!0,A.tR(a)?s.bp(r):s.cl(r))+"\n")),null)},
dT(a){t.L.a(a)
if(this.ax)return
this.a.b.b7(B.m,a,null)},
cY(a){var s,r=this
A.U(a)
if(r.ax)return
r.ax=!0
s=r.ch
if(s!=null&&(s.a.a&30)===0){r.CW=r.ch=null
s.H(new A.ax("session ended during command"))}r.y.$1(a)},
q(){var s=0,r=A.H(t.H),q=this
var $async$q=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:s=2
return A.y(q.aS(),$async$q)
case 2:s=3
return A.y(q.a.q(),$async$q)
case 3:return A.F(null,r)}})
return A.G($async$q,r)},
aS(){var s=0,r=A.H(t.H),q=this,p,o
var $async$aS=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:o=q.z
o=o==null?null:o.P()
p=t.H
s=2
return A.y(o instanceof A.p?o:A.dx(o,p),$async$aS)
case 2:o=q.Q
o=o==null?null:o.P()
s=3
return A.y(o instanceof A.p?o:A.dx(o,p),$async$aS)
case 3:q.Q=q.z=null
return A.F(null,r)}})
return A.G($async$aS,r)}}
A.is.prototype={
$1(a){this.a.cY(-1)},
$S:4}
A.fA.prototype={
bm(a){var s=0,r=A.H(t.H),q=this,p
var $async$bm=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:p=q.e
if(p.a.l(0,a))p.fu()
p=A.dx(null,t.H)
s=2
return A.y(p,$async$bm)
case 2:p=q.fx
p===$&&A.r("_histCursor")
p.al()
return A.F(null,r)}})
return A.G($async$bm,r)},
bB(a){var s,r=this
r.CW=a
r.dx=A.oJ(a)
s=r.at
if(!s)r.U()},
dV(a){var s,r=this
if(a===r.db)return
r.db=a
s=r.at
if(!s)r.U()},
dU(a){var s=this
if(s.at===a)return
s.at=a
s.fy=B.p
s.go=""
B.b.F(s.id)
s.k1=0
B.b.F(s.cx)
s.cy=0
if(a)s.bK()},
hg(){var s=this
if(s.as!=null)return
if(s.at){s.r.$0()
return}s.cT()},
aH(){this.z=this.a.aY(this.gf2())},
f3(a){var s,r,q,p=this
t.L.a(a)
s=p.as
if(s!=null){s.$1(a)
return}if(p.at){p.x.$1(a)
return}if(p.ay&&p.ch==null)return
for(r=J.cD(a);r.t();){q=r.gB()
switch(p.fy.a){case 0:if(q===27)p.fy=B.bg
else p.eW(q)
break
case 1:if(q===91||q===79){p.fy=B.bh
p.go=""}else p.fy=B.p
break
case 2:if(q>=64&&q<=126){p.eS(A.av(q),p.go)
p.fy=B.p}else p.go=p.go+A.av(q)
break}}},
eW(a){var s=this,r=s.id
if(r.length!==0){B.b.l(r,a)
if(r.length>=s.k1){s.cS(B.V.fT(r,!0))
B.b.F(r)
s.k1=0}return}switch(a){case 13:case 10:s.er()
break
case 127:case 8:s.el()
break
case 3:s.cT()
break
case 4:if(s.cx.length===0)s.w.$0()
break
case 1:s.bY()
break
case 5:s.bX()
break
case 9:s.be()
break
default:if(a<32)return
if(a<128)s.cS(A.av(a))
else{B.b.F(r)
B.b.l(r,a)
if((a&224)===192)r=2
else r=(a&240)===224?3:4
s.k1=r}}},
eS(a,b){var s,r,q,p=this,o="_histCursor"
switch(a){case"A":s=p.fx
s===$&&A.r(o)
r=p.cx
q=s.hz(B.b.aj(r),B.b.aj(B.b.a0(r,0,p.cy)))
if(q!=null)p.d9(q)
break
case"B":s=p.fx
s===$&&A.r(o)
q=s.h0()
if(q!=null)p.d9(q)
break
case"C":p.f0()
break
case"D":p.f_()
break
case"H":p.bY()
break
case"F":p.bX()
break
case"~":if(b==="1"||b==="7")p.bY()
else if(b==="4"||b==="8")p.bX()
else if(b==="3")p.eE()
break}},
cS(a){var s=this,r=s.cx,q=s.cy
A.P(r).c.a(a)
r.$flags&1&&A.Q(r,"insert",2)
if(q<0||q>r.length)A.v(A.l4(q,null))
r.splice(q,0,a);++s.cy
r=s.fx
r===$&&A.r("_histCursor")
r.al()
s.U()},
el(){var s=this,r=s.cy
if(r===0)return
B.b.cn(s.cx,r-1);--s.cy
r=s.fx
r===$&&A.r("_histCursor")
r.al()
s.U()},
eE(){var s=this,r=s.cy,q=s.cx
if(r>=q.length)return
B.b.cn(q,r)
r=s.fx
r===$&&A.r("_histCursor")
r.al()
s.U()},
f_(){var s=this,r=s.cy
if(r===0)return
s.cy=r-1
if(s.db>0){s.U()
return}s.b.$1("\x1b[D")},
f0(){var s=this,r=s.cy
if(r>=s.cx.length)return
s.cy=r+1
if(s.db>0){s.U()
return}s.b.$1("\x1b[C")},
bY(){var s=this,r=s.cy
if(r===0)return
if(s.db>0){s.cy=0
s.U()
return}s.b.$1("\x1b["+r+"D")
s.cy=0},
bX(){var s=this,r=s.cx,q=r.length,p=q-s.cy
if(p===0)return
if(s.db>0){s.cy=q
s.U()
return}s.b.$1("\x1b["+p+"C")
s.cy=r.length},
be(){var s=0,r=A.H(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$be=A.I(function(a,a0){if(a===1){o.push(a0)
s=p}for(;;)A:switch(s){case 0:c=m.y
if(c==null||m.ch!=null){s=1
break}h=m.cy
l=h
g=m.cx
f=g.length
for(;;){e=l
if(typeof e!=="number"){q=e.dO()
s=1
break A}if(e>0){e=l
if(typeof e!=="number"){q=e.e_()
s=1
break A}--e
if(e>>>0!==e||e>=f){q=A.c(g,e)
s=1
break A}e=g[e]!==" "}else e=!1
if(!e)break
e=l
if(typeof e!=="number"){q=e.e_()
s=1
break A}l=e-1}k=B.b.aj(B.b.a0(g,l,h))
j=B.b.h5(B.b.a0(g,0,l),new A.iz())
g=m.z
if(g!=null)g.cj()
p=4
s=7
return A.y(c.$2(k,j),$async$be)
case 7:i=a0
m.eg(l,k,i)
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
if(g!=null)g.bv()
s=n.pop()
break
case 6:case 1:return A.F(q,r)
case 2:return A.E(o.at(-1),r)}})
return A.G($async$be,r)},
eg(a,b,c){var s,r,q,p=this
t.df.a(c)
s=J.aB(c)
if(s.gC(c)){p.b.$1("\x07")
return}if(s.gm(c)===1){r=s.gZ(c)
p.da(a,r,!B.a.h4(r,"/"))
return}q=A.oI(c)
if(q.length>b.length)p.da(a,q,!1)
else{p.b.$1("\r\n"+s.ak(c,"  ")+"\r\n")
p.fr=p.dy=0
p.U()}},
da(a,b,c){var s,r,q,p,o,n,m,l,k=this,j=t.I
j=A.c3(new A.aT(b),j.h("b(f.E)").a(A.hL()),j.h("f.E"),t.N)
s=A.a2(j,A.h(j).h("f.E"))
if(c)B.b.l(s," ")
j=k.cx
r=k.cy
A.P(j).h("f<1>").a(s)
j.$flags&1&&A.Q(j,"replaceRange","remove from or add to")
q=j.length
A.aw(a,r,q)
p=r-a
o=s.length
n=a+o
if(p>=o){m=p-o
l=q-m
B.b.aE(j,a,n,s)
if(m!==0){B.b.ab(j,n,l,j,r)
B.b.sm(j,l)}}else{l=q+(o-p)
j.length=l
B.b.ab(j,n,l,j,r)
B.b.aE(j,a,n,s)}k.cy=a+s.length
j=k.fx
j===$&&A.r("_histCursor")
j.al()
k.U()},
er(){var s,r=this,q=r.cx,p=B.b.aj(q)
r.b.$1("\r\n")
B.b.F(q)
r.fr=r.dy=r.cy=0
q=r.fx
q===$&&A.r("_histCursor")
q.al()
s=r.ch
if(s!=null){r.ch=null
s.D(p)
return}r.bb(p)},
cT(){var s,r,q=this
q.b.$1("^C\r\n")
B.b.F(q.cx)
q.fr=q.dy=q.cy=0
s=q.fx
s===$&&A.r("_histCursor")
s.al()
r=q.ch
if(r!=null){q.ch=null
r.D("")
return}q.r.$0()},
bb(a){return this.eF(a)},
eF(a){var s=0,r=A.H(t.H),q=1,p=[],o=[],n=this,m
var $async$bb=A.I(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:n.ay=!0
q=2
m=n.c.$1(a)
s=5
return A.y(m instanceof A.p?m:A.dx(m,t.H),$async$bb)
case 5:o.push(4)
s=3
break
case 2:o=[1]
case 3:q=1
n.ay=!1
s=o.pop()
break
case 4:return A.F(null,r)
case 1:return A.E(p.at(-1),r)}})
return A.G($async$bb,r)},
d9(a){var s,r=this.cx
B.b.F(r)
s=t.I
s=A.c3(new A.aT(a),s.h("b(f.E)").a(A.hL()),s.h("f.E"),t.N)
s=A.a2(s,A.h(s).h("f.E"))
B.b.aw(r,s)
this.cy=r.length
this.U()},
hr(a){var s
t.M.a(a)
s=this.at
if(s){a.$0()
return}this.bK()
a.$0()
this.U()},
U(){var s,r,q,p=this
if(p.ax&&p.ch==null){p.bK()
return}if(p.db>0){p.fw()
return}s=p.cx
r=p.b
r.$1("\r\x1b[K"+p.CW+B.b.aj(s))
q=s.length-p.cy
if(q>0)r.$1("\x1b["+q+"D")},
fw(){var s,r,q=this,p=q.db,o=q.dx,n=q.cx,m=n.length,l=q.cy,k=o+m,j=B.c.aI(k+p-1,p),i=B.c.aI(o+q.fr,p),h=q.dy
i=h-(i+1)
i=i>0?"\x1b["+i+"B":""
for(--h,s=0;s<h;++s)i+="\r\x1b[K\x1b[1A"
n=i+"\r\x1b[K"+q.CW+B.b.aj(n)
if(l===m){if(k>0&&B.c.am(k,p)===0){n+="\n\r";++j}}else{k=o+l
i=j-(B.c.aI(k,p)+1)
if(i>0)n+="\x1b["+i+"A"
r=B.c.am(k,p)
n+=r>0?"\r\x1b["+r+"C":"\r"}q.fr=l
q.dy=j
q.b.$1(n.charCodeAt(0)==0?n:n)},
bK(){var s,r,q=this,p=q.db
if(p<=0){q.b.$1("\r\x1b[K")
q.fr=q.dy=0
return}p=B.c.aI(q.dx+q.fr,p)
s=q.dy
p=s-(p+1)
p=p>0?"\x1b["+p+"B":""
for(--s,r=0;r<s;++r)p+="\r\x1b[K\x1b[1A"
p+="\r\x1b[K"
q.fr=q.dy=0
q.b.$1(p.charCodeAt(0)==0?p:p)}}
A.iz.prototype={
$1(a){return A.L(a)===" "},
$S:17}
A.eK.prototype={
ac(){return"_ParseState."+this.b}}
A.bx.prototype={
cv(a){var s=this.b
return s.b5(new A.bm(s.a,"stdout",a))},
dE(a,b){var s=this.b
return s.b5(new A.bP(s.a,a,b))},
cz(a){var s=this.b
return s.b5(new A.bQ(s.a,a))},
f5(a){var s,r,q,p,o,n,m,l,k=this,j=null,i="_controlSub"
t.R.a(a)
A:{s=a instanceof A.cd
r=s?a:j
if(s){s=r.b
if(B.a.a7(s).length===0)A.v(B.aw)
k.r=new A.fY(s)
k.y=A.l7(r.e)
s=k.c
if((s.a.a&30)===0)s.az()
break A}s=a instanceof A.ce
q=s?a:j
if(s){s=k.c
if((s.a.a&30)===0){p=q.c
o=q.b
s.H(new A.fZ(o,p))}break A}s=a instanceof A.ca
n=s?a:j
if(s){n.toString
m=new A.dU()
k.w=m
s=k.e
if((s.a.a&30)===0)s.D(m)
s=k.d
if((s.a.a&30)===0)s.D(0)
s=k.f
s===$&&A.r(i)
s.P()
k.b.q()
break A}s=a instanceof A.bO
l=s?a:j
if(s){s=k.d
if((s.a.a&30)===0)s.D(l.b)
break A}if(a instanceof A.bl){s=k.c
if((s.a.a&30)===0)s.H(B.aI)
s=k.d
if((s.a.a&30)===0)s.D(-1)
s=k.f
s===$&&A.r(i)
s.P()
k.b.q()
break A}break A}},
q(){var s=0,r=A.H(t.H),q=this,p,o
var $async$q=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:o=q.b
o.b5(new A.bl(o.a,"client_closed",null))
p=q.f
p===$&&A.r("_controlSub")
s=2
return A.y(p.P(),$async$q)
case 2:p=q.d
if((p.a.a&30)===0)p.D(-1)
s=3
return A.y(o.q(),$async$q)
case 3:return A.F(null,r)}})
return A.G($async$q,r)},
$ipz:1}
A.dU.prototype={}
A.dm.prototype={}
A.fP.prototype={
gcb(){return"trap ':' INT"},
bp(a){var s=a.gaD()
return"printf '%s%s%s\\t%s\\t%s\\t%s\\n' '"+s.a+"' '"+s.b+'\' "$PWD" "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" "$(git status --porcelain 2>/dev/null | awk \'BEGIN{s=0;m=0;u=0}/^\\?\\?/{u++;next}{if(substr($0,1,1)!=" ")s++;if(substr($0,2,1)!=" ")m++}END{if(s+m+u>0)printf "+%d ~%d ?%d",s,m,u}\')" "$([ "$(id -u 2>/dev/null)" = 0 ] && echo root)"'},
cl(a){var s=a.gaD()
return"printf '%s%s\\n' '"+s.a+"' '"+s.b+"'"},
ct(a,b,c){var s=A.lx(a,"'","'\\''")
return"stty echo 2>/dev/null ; "+("eval '"+s+"' ; "+c)+" ; stty -echo 2>/dev/null"}}
A.fQ.prototype={
gcb(){return"function prompt { '' }; $ErrorActionPreference='Continue'"},
bp(a){var s=a.gaD()
return"$o=[Console]::Out;$br=(\"$(git rev-parse --abbrev-ref HEAD 2>$null)\").Trim();$st=@(git status --porcelain 2>$null);$s=0;$m=0;$u=0;foreach($l in $st){if($l -match '^\\?\\?'){$u++}else{if($l.Length -ge 1 -and $l[0] -ne ' '){$s++};if($l.Length -ge 2 -and $l[1] -ne ' '){$m++}}};$stat=if($s+$m+$u -gt 0){\"+$s ~$m ?$u\"}else{$null};$pv=if(([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)){'root'}else{$null};"+("$o.Write('"+s.a+"'+'"+s.b+"'+$PWD.Path+[char]9+$br+[char]9+$stat+[char]9+$pv+[char]10);$o.Flush()")},
cl(a){var s=a.gaD()
return"[Console]::Out.Write('"+s.a+"'+'"+s.b+"'+[char]10);[Console]::Out.Flush()"},
ct(a,b,c){return a+" ; "+c}}
A.ff.prototype={
gcb(){return"prompt $G"},
bp(a){var s=a.gaD()
return'<nul set /p "='+s.a+'"& <nul set /p "='+s.b+'%CD%"& echo.'},
cl(a){var s=a.gaD()
return'<nul set /p "='+s.a+'"& <nul set /p "='+s.b+'"& echo.'},
ct(a,b,c){return a+" & "+c}}
A.kD.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
if(!(a>=0&&a<5))return A.c(B.q,a)
s=B.q[a].a
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
$S:20}
A.hC.prototype={
aa(){var s=0,r=A.H(t.y),q
var $async$aa=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:q=!1
s=1
break
case 1:return A.F(q,r)}})
return A.G($async$aa,r)},
q(){var s=0,r=A.H(t.H)
var $async$q=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:return A.F(null,r)}})
return A.G($async$q,r)},
$im0:1}
A.fT.prototype={
j(){var s=this.c
s=A.a2(s,A.h(s).c)
B.b.dY(s)
return A.z(["id",this.a.a,"displayName",this.b,"roles",s],t.N,t.z)}}
A.fV.prototype={
j(){return A.z(["term",this.a,"cols",this.b,"rows",this.c],t.N,t.z)}}
A.ed.prototype={
ac(){return"ShellFamily."+this.b}}
A.aG.prototype={
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"sessionId",r.a)
q.i(0,"shortId",r.b)
q.i(0,"nodeId",r.c)
q.i(0,"ownerUserId",r.d)
q.i(0,"mode",r.e.b)
q.i(0,"createdAt",r.f.N().X())
s=r.r
if(s!=null)q.i(0,"detachedAt",s.N().X())
s=r.w
if(s!=null)q.i(0,"expiresAt",s.N().X())
q.i(0,"state",r.x.b)
s=r.y
if(s!=null)q.i(0,"currentCommand",s)
s=r.z
if(s!=null)q.i(0,"currentCwd",s)
return q}}
A.fI.prototype={
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"shells",r.a)
q.i(0,"features",r.b)
q.i(0,"maxSessions",r.c)
s=r.d
if(s!=null)q.i(0,"directEndpoint",s)
return q}}
A.b6.prototype={
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"nodeId",r.a.a)
s=r.b
if(s!=null)q.i(0,"uid",s.a)
q.i(0,"displayName",r.c)
q.i(0,"platform",r.d.j())
q.i(0,"labels",r.e)
q.i(0,"online",r.f)
s=r.r
if(s!=null)q.i(0,"capabilities",s.j())
return q}}
A.iL.prototype={
j(){var s=this
return A.z(["os",s.a,"arch",s.b,"agentVersion",s.c,"hostname",s.d],t.N,t.z)}}
A.cb.prototype={
ac(){return"SessionMode."+this.b}}
A.by.prototype={
ac(){return"SessionState."+this.b}}
A.aI.prototype={
j(){var s=this,r=A.o(t.N,t.z)
r.i(0,"tunnelId",s.a)
r.i(0,"nodeId",s.b)
r.i(0,"ownerUserId",s.c)
r.i(0,"targetHost",s.d)
r.i(0,"targetPort",s.e)
r.i(0,"publicHost",s.f)
r.i(0,"publicPort",s.r)
if(s.w)r.i(0,"secure",!0)
r.i(0,"createdAt",s.x.N().X())
return r}}
A.fJ.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.fJ&&b.a===this.a},
gA(a){return B.a.gA(this.a)},
k(a){return this.a}}
A.fM.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.fM&&b.a===this.a},
gA(a){return B.a.gA(this.a)},
k(a){return this.a}}
A.fU.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.fU&&b.a===this.a},
gA(a){return B.a.gA(this.a)},
k(a){return this.a}}
A.fY.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.fY&&b.a===this.a},
gA(a){return B.a.gA(this.a)},
k(a){return this.a}}
A.h7.prototype={
c9(a){var s=0,r=A.H(t.bp),q,p=this
var $async$c9=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:q=new A.bk("token",p.a,p.b,null,null)
s=1
break
case 1:return A.F(q,r)}})
return A.G($async$c9,r)},
$ioh:1}
A.eq.prototype={
e9(a,b){var s=this,r=s.a.r.b
r===$&&A.r("_foreign")
r=r.b
r===$&&A.r("_streamController")
new A.M(r,A.h(r).h("M<1>")).a5(new A.jC(s),!1,s.geR(),new A.jD(s))},
an(a){var s
if(!this.e)return
s=this.a.gcA()
s.a.l(0,A.h(s).h("bo.T").a(this.b.h1(a)))},
q(){var s=0,r=A.H(t.H),q,p=this
var $async$q=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:if(!p.e){s=1
break}p.e=!1
s=3
return A.y(p.a.gcA().ai(null,null),$async$q)
case 3:p.bT()
case 1:return A.F(q,r)}})
return A.G($async$q,r)},
bT(){var s,r=this
if(!r.e&&(r.d.a.a&30)!==0)return
r.e=!1
s=r.c
if((s.b&4)===0)s.q()
s=r.d
if((s.a.a&30)===0)s.az()},
$iiI:1}
A.jC.prototype={
$1(a){var s,r,q
try{s=this.a
r=a==null?A.a3(a):a
s.c.l(0,s.b.fS(r))}catch(q){}},
$S:2}
A.jD.prototype={
$1(a){A.a3(a)
return this.a.bT()},
$S:30}
A.fa.prototype={
b5(a){if(this.x)return
this.b.$1(new A.an(a))},
b7(a,b,c){var s,r,q,p,o
t.L.a(b)
if(this.x||J.kS(b))return
s=t.p.b(b)?b:new Uint8Array(A.bC(b))
for(r=s.length,q=this.r,p=0;p<r;p=o){o=B.c.bn(p+65536,0,r)
B.b.l(q,new A.hr(a,A.mk(s,p,o),null))}this.cP()},
cP(){var s,r,q,p=this,o=p.r,n=p.a,m=p.b
for(;;){if(!(o.length!==0&&p.w>=B.b.gZ(o).b.length))break
s=B.b.cn(o,0)
r=s.b
q=r.length
p.w=p.w-q
m.$1(new A.bT(1,s.a,n,r))
r=s.c
if(r!=null){q=r.c+=q
r.b.$1(q)}}if(o.length===0)p.cI()},
cI(){var s,r,q=this.y,p=q.length
if(p===0)return
for(s=0;s<q.length;q.length===p||(0,A.cC)(q),++s){r=q[s]
if(!r.gR())r.az()}B.b.F(q)},
h_(a){var s,r=this
if(r.x)return
switch(a.b.a){case 0:s=t.V.a(r.c)
if((s.b&4)===0)s.l(0,a.d)
break
case 1:s=t.V.a(r.d)
if((s.b&4)===0)s.l(0,a.d)
break
case 2:s=t.V.a(r.e)
if((s.b&4)===0)s.l(0,a.d)
break}},
fZ(a){var s
if(this.x)return
s=this.f
if((s.b&4)===0)s.l(0,a)},
q(){var s=0,r=A.H(t.H),q,p=this
var $async$q=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:if(p.x){s=1
break}p.x=!0
B.b.F(p.r)
p.cI()
p.c.q()
p.d.q()
p.e.q()
p.f.q()
case 1:return A.F(q,r)}})
return A.G($async$q,r)}}
A.hr.prototype={}
A.fb.prototype={
e5(a,b){var s=this,r=s.a.c
r=t.bF.a(new A.M(r,A.h(r).h("M<1>")).a5(s.geH(),!1,s.gf8(),new A.i0()))
s.d!==$&&A.bE("_sub")
s.d=r},
cN(a){var s=null,r=t.p,q=new A.fa(a,this.a.gdS(),A.aU(s,s,!1,r),A.aU(s,s,!1,r),A.aU(s,s,!1,r),A.aU(s,s,!1,t.R),A.w([],t.fe),A.w([],t.ek))
this.b.i(0,a,q)
return q},
aT(a){var s=0,r=A.H(t.H),q=this,p
var $async$aT=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:p=q.b.S(0,a)
s=p!=null?2:3
break
case 2:s=4
return A.y(p.q(),$async$aT)
case 4:case 3:return A.F(null,r)}})
return A.G($async$aT,r)},
eI(a){var s,r,q,p,o
t.r.a(a)
s=a.gG()
r=s!=null&&s!==0?this.b.p(0,s):null
if(r!=null){A:{q=a instanceof A.bT
p=q?a:null
if(q){r.h_(p)
break A}q=a instanceof A.an
o=q?a.a:null
if(q){if(o instanceof A.bm){q=o.c
r.w+=q
r.cP()}r.fZ(o)}}return}if(a instanceof A.an&&(this.c.c&4)===0)this.c.l(0,a.a)},
f9(){var s=this.c
if((s.c&4)===0)s.q()},
aA(){var s=0,r=A.H(t.H),q,p=this,o,n,m,l
var $async$aA=A.I(function(a,b){if(a===1)return A.E(b,r)
for(;;)switch(s){case 0:if(p.f){s=1
break}p.f=!0
o=p.d
o===$&&A.r("_sub")
s=3
return A.y(o.P(),$async$aA)
case 3:o=p.b
n=A.h(o).h("c1<2>")
m=A.a2(new A.c1(o,n),n.h("f.E"))
o.F(0)
o=m.length,l=0
case 4:if(!(l<m.length)){s=6
break}s=7
return A.y(m[l].q(),$async$aA)
case 7:case 5:m.length===o||(0,A.cC)(m),++l
s=4
break
case 6:o=p.c
s=(o.c&4)===0?8:9
break
case 8:s=10
return A.y(o.q(),$async$aA)
case 10:case 9:case 1:return A.F(q,r)}})
return A.G($async$aA,r)}}
A.i0.prototype={
$1(a){A.a3(a)},
$S:22}
A.k.prototype={
gG(){return null}}
A.bp.prototype={
gn(){return"hello"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"role",r.a)
q.i(0,"protocolVersion",r.b)
q.i(0,"minVersion",r.c)
s=r.d
if(s!=null)q.i(0,"nonce",s)
s=r.e
if(s.gJ(s))q.i(0,"info",s)
return q}}
A.bk.prototype={
gn(){return"auth.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"method",r.a)
q.i(0,"principal",r.b)
s=r.c
if(s!=null)q.i(0,"token",s)
s=r.d
if(s!=null)q.i(0,"publicKey",s)
s=r.e
if(s!=null)q.i(0,"signature",s)
return q}}
A.bK.prototype={
gn(){return"auth.ok"},
j(){var s=this
return A.z(["principal",s.a,"displayName",s.b,"roles",s.c,"sessionToken",s.d],t.N,t.z)}}
A.bJ.prototype={
gn(){return"auth.fail"},
j(){return A.z(["reason",this.a,"message",this.b],t.N,t.z)}}
A.d8.prototype={
gn(){return"node.register"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"nodeId",r.a)
s=r.b
if(s!=null)q.i(0,"uid",s)
q.i(0,"displayName",r.c)
q.i(0,"platform",r.d.j())
q.i(0,"labels",r.e)
return q}}
A.d9.prototype={
gn(){return"node.registered"},
j(){return A.z(["nodeId",this.a,"assignedAt",this.b.N().X()],t.N,t.z)}}
A.cZ.prototype={
gn(){return"node.capabilities"},
j(){return this.a.j()}}
A.d5.prototype={
gn(){return"node.heartbeat"},
j(){var s=this
return A.z(["nodeId",s.a,"activeSessions",s.b,"seq",s.c,"ts",s.d.N().X()],t.N,t.z)}}
A.d6.prototype={
gn(){return"node.heartbeat.ack"},
j(){return A.z(["seq",this.a,"ts",this.b.N().X()],t.N,t.z)}}
A.dh.prototype={
gn(){return"ping"},
j(){return A.z(["id",this.a,"ts",this.b.N().X()],t.N,t.z)}}
A.c8.prototype={
gn(){return"pong"},
j(){return A.z(["id",this.a,"ts",this.b.N().X(),"serverTs",this.c.N().X()],t.N,t.z)}}
A.d7.prototype={
gn(){return"node.list.request"},
j(){var s=A.o(t.N,t.z),r=this.a
if(r.gJ(r))s.i(0,"filter",r)
return s}}
A.c4.prototype={
gn(){return"node.list.response"},
j(){var s=this.a,r=A.P(s),q=r.h("X<1,d<b,@>>")
s=A.a2(new A.X(s,r.h("d<b,@>(1)").a(new A.iF()),q),q.h("W.E"))
return A.z(["nodes",s],t.N,t.z)}}
A.iF.prototype={
$1(a){return t.eX.a(a).j()},
$S:32}
A.cc.prototype={
gn(){return"session.open"},
gG(){return this.a},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"nodeId",r.b)
q.i(0,"mode",r.c.b)
s=r.d
if(s!=null)q.i(0,"command",s)
s=r.e
if(s.length!==0)q.i(0,"args",s)
s=r.f
if(s.gJ(s))q.i(0,"env",s)
s=r.r
if(s!=null)q.i(0,"cwd",s)
s=r.w
if(s!=null)q.i(0,"pty",s.j())
s=r.x
if(s!=null)q.i(0,"resumeSessionId",s)
s=r.y
if(s!=null)q.i(0,"shellFamily",s.b)
return q}}
A.cd.prototype={
gn(){return"session.opened"},
gG(){return this.a},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"sessionId",r.b)
q.i(0,"pty",r.c)
if(r.d)q.i(0,"altScreen",!0)
s=r.e
if(s!=="posix")q.i(0,"shell",s)
return q}}
A.ce.prototype={
gn(){return"session.rejected"},
gG(){return this.a},
j(){return A.z(["reason",this.b,"message",this.c],t.N,t.z)}}
A.dc.prototype={
gn(){return"node.session.open"},
gG(){return this.a},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"sessionId",r.b)
q.i(0,"principal",r.c)
q.i(0,"mode",r.d.b)
s=r.e
if(s!=null)q.i(0,"command",s)
s=r.f
if(s.length!==0)q.i(0,"args",s)
s=r.r
if(s.gJ(s))q.i(0,"env",s)
s=r.w
if(s!=null)q.i(0,"cwd",s)
s=r.x
if(s!=null)q.i(0,"pty",s.j())
s=r.y
if(s!=null)q.i(0,"resumeSessionId",s)
s=r.z
if(s!=null)q.i(0,"shellFamily",s.b)
return q}}
A.dd.prototype={
gn(){return"node.session.opened"},
gG(){return this.a},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"sessionId",r.b)
s=r.c
if(s!=null)q.i(0,"pid",s)
if(r.d)q.i(0,"altScreen",!0)
s=r.e
if(s!=="posix")q.i(0,"shell",s)
return q}}
A.de.prototype={
gn(){return"node.session.rejected"},
gG(){return this.a},
j(){return A.z(["sessionId",this.b,"reason",this.c,"message",this.d],t.N,t.z)}}
A.bP.prototype={
gn(){return"channel.resize"},
gG(){return this.a},
j(){return A.z(["cols",this.b,"rows",this.c],t.N,t.z)}}
A.bQ.prototype={
gn(){return"channel.signal"},
gG(){return this.a},
j(){return A.z(["signal",this.b],t.N,t.z)}}
A.cI.prototype={
gn(){return"channel.eof"},
gG(){return this.a},
j(){return A.z(["stream",this.b],t.N,t.z)}}
A.bO.prototype={
gn(){return"channel.exit"},
gG(){return this.a},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"exitCode",this.b)
s=this.c
if(s!=null)r.i(0,"signal",s)
r.i(0,"ts",this.d.N().X())
return r}}
A.bl.prototype={
gn(){return"channel.close"},
gG(){return this.a},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"reason",this.b)
s=this.c
if(s!=null)r.i(0,"message",s)
return r}}
A.bm.prototype={
gn(){return"channel.window"},
gG(){return this.a},
j(){return A.z(["stream",this.b,"credit",this.c],t.N,t.z)}}
A.di.prototype={
gn(){return"error"},
gG(){return this.d},
j(){return A.z(["code",this.a,"message",this.b,"fatal",this.c],t.N,t.z)}}
A.dk.prototype={
gn(){return"session.detach.request"},
gG(){return this.a},
j(){var s=A.o(t.N,t.z),r=this.b
if(r!=null)s.i(0,"timeoutSeconds",r)
return s}}
A.da.prototype={
gn(){return"node.session.detach"},
gG(){return this.a},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"sessionId",this.b)
r.i(0,"principal",this.c)
s=this.d
if(s!=null)r.i(0,"timeoutSeconds",s)
return r}}
A.db.prototype={
gn(){return"node.session.detached"},
gG(){return this.a},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"sessionId",this.b)
r.i(0,"shortId",this.c)
s=this.d
if(s!=null)r.i(0,"expiresAt",s.N().X())
return r}}
A.ca.prototype={
gn(){return"session.detached"},
gG(){return this.a},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"sessionId",this.b)
r.i(0,"shortId",this.c)
s=this.d
if(s!=null)r.i(0,"expiresAt",s.N().X())
return r}}
A.cL.prototype={
gn(){return"sessions.list.request"},
j(){return A.z(["requestId",this.a,"nodeId",this.b],t.N,t.z)}}
A.d1.prototype={
gn(){return"node.sessions.list.request"},
j(){return A.z(["requestId",this.a,"principal",this.b],t.N,t.z)}}
A.d2.prototype={
gn(){return"node.sessions.list.response"},
j(){var s=this.b,r=A.P(s),q=r.h("X<1,d<b,@>>")
s=A.a2(new A.X(s,r.h("d<b,@>(1)").a(new A.iD()),q),q.h("W.E"))
return A.z(["requestId",this.a,"sessions",s],t.N,t.z)}}
A.iD.prototype={
$1(a){return t.U.a(a).j()},
$S:23}
A.bV.prototype={
gn(){return"sessions.list.response"},
j(){var s=this.b,r=A.P(s),q=r.h("X<1,d<b,@>>")
s=A.a2(new A.X(s,r.h("d<b,@>(1)").a(new A.ic()),q),q.h("W.E"))
return A.z(["requestId",this.a,"sessions",s],t.N,t.z)}}
A.ic.prototype={
$1(a){return t.U.a(a).j()},
$S:23}
A.cK.prototype={
gn(){return"sessions.kill.request"},
j(){return A.z(["requestId",this.a,"nodeId",this.b,"sessionRef",this.c],t.N,t.z)}}
A.d_.prototype={
gn(){return"node.sessions.kill.request"},
j(){return A.z(["requestId",this.a,"principal",this.b,"sessionRef",this.c],t.N,t.z)}}
A.d0.prototype={
gn(){return"node.sessions.kill.response"},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"requestId",this.a)
r.i(0,"ok",this.b)
s=this.c
if(s.length!==0)r.i(0,"message",s)
return r}}
A.bU.prototype={
gn(){return"sessions.kill.response"},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"requestId",this.a)
r.i(0,"ok",this.b)
s=this.c
if(s.length!==0)r.i(0,"message",s)
return r}}
A.cE.prototype={
gn(){return"sessions.detach.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"nodeId",r.b)
s=r.c
if(s.length!==0)q.i(0,"sessionRef",s)
s=r.d
if(s!=null)q.i(0,"timeoutSeconds",s)
return q}}
A.cX.prototype={
gn(){return"node.sessions.detach.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"principal",r.b)
s=r.c
if(s.length!==0)q.i(0,"sessionRef",s)
s=r.d
if(s!=null)q.i(0,"timeoutSeconds",s)
return q}}
A.cY.prototype={
gn(){return"node.sessions.detach.response"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"shortId",s)
s=r.d
if(s.length!==0)q.i(0,"message",s)
return q}}
A.bG.prototype={
gn(){return"sessions.detach.response"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"shortId",s)
s=r.d
if(s.length!==0)q.i(0,"message",s)
return q}}
A.dl.prototype={
gn(){return"sessions.screen.request"},
j(){return A.z(["requestId",this.a,"nodeId",this.b,"sessionRef",this.c],t.N,t.z)}}
A.df.prototype={
gn(){return"node.sessions.screen.request"},
j(){return A.z(["requestId",this.a,"principal",this.b,"sessionRef",this.c],t.N,t.z)}}
A.dg.prototype={
gn(){return"node.sessions.screen.response"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"message",s)
s=r.d
if(s.length!==0)q.i(0,"screen",s)
if(r.e)q.i(0,"altScreen",!0)
return q}}
A.cf.prototype={
gn(){return"sessions.screen.response"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"ok",r.b)
s=r.c
if(s.length!==0)q.i(0,"message",s)
s=r.d
if(s.length!==0)q.i(0,"screen",s)
if(r.e)q.i(0,"altScreen",!0)
return q}}
A.aR.prototype={
j(){return A.z(["host",this.a,"description",this.b],t.N,t.z)}}
A.kp.prototype={
$1(a){var s=t.f.a(a).a2(0,t.N,t.z)
return new A.aR(A.j(s,"host"),A.j(s,"description"))},
$S:34}
A.cM.prototype={
gn(){return"drive.credential.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"nodeId",r.b)
q.i(0,"op",r.c)
s=r.d
if(s!=null)q.i(0,"host",s)
s=r.e
if(s!=null)q.i(0,"credential",s)
return q}}
A.d3.prototype={
gn(){return"node.drive.credential.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"principal",r.b)
q.i(0,"op",r.c)
s=r.d
if(s!=null)q.i(0,"host",s)
s=r.e
if(s!=null)q.i(0,"credential",s)
return q}}
A.d4.prototype={
gn(){return"node.drive.credential.response"},
j(){var s,r,q,p=this,o=A.o(t.N,t.z)
o.i(0,"requestId",p.a)
o.i(0,"ok",p.b)
s=p.c
if(s.length!==0)o.i(0,"message",s)
s=p.d
if(s.length!==0){r=A.P(s)
q=r.h("X<1,d<b,@>>")
s=A.a2(new A.X(s,r.h("d<b,@>(1)").a(new A.iE()),q),q.h("W.E"))
o.i(0,"entries",s)}return o}}
A.iE.prototype={
$1(a){return t.o.a(a).j()},
$S:24}
A.bW.prototype={
gn(){return"drive.credential.response"},
j(){var s,r,q,p=this,o=A.o(t.N,t.z)
o.i(0,"requestId",p.a)
o.i(0,"ok",p.b)
s=p.c
if(s.length!==0)o.i(0,"message",s)
s=p.d
if(s.length!==0){r=A.P(s)
q=r.h("X<1,d<b,@>>")
s=A.a2(new A.X(s,r.h("d<b,@>(1)").a(new A.id()),q),q.h("W.E"))
o.i(0,"entries",s)}return o}}
A.id.prototype={
$1(a){return t.o.a(a).j()},
$S:24}
A.kq.prototype={
$1(a){var s,r,q,p,o=t.f.a(a).a2(0,t.N,t.z),n=A.j(o,"sessionId"),m=A.j(o,"shortId"),l=A.j(o,"nodeId"),k=A.j(o,"ownerUserId"),j=A.i(o,"mode")
j=A.l6(j==null?"shell":j)
s=A.bZ(o,"createdAt")
r=A.fz(o,"detachedAt")
q=A.fz(o,"expiresAt")
p=A.i(o,"state")
return new A.aG(n,m,l,k,j,s,r,q,A.px(p==null?"detached":p),A.i(o,"currentCommand"),A.i(o,"currentCwd"))},
$S:36}
A.ds.prototype={
gn(){return"tunnel.open.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"nodeId",r.b)
q.i(0,"targetHost",r.c)
q.i(0,"targetPort",r.d)
s=r.e
if(s!=null)q.i(0,"publicPort",s)
if(r.f)q.i(0,"secure",!0)
return q}}
A.ck.prototype={
gn(){return"tunnel.opened"},
j(){var s=this,r=A.o(t.N,t.z)
r.i(0,"requestId",s.a)
r.i(0,"tunnelId",s.b)
r.i(0,"publicHost",s.c)
r.i(0,"publicPort",s.d)
if(s.e)r.i(0,"secure",!0)
return r}}
A.cl.prototype={
gn(){return"tunnel.rejected"},
j(){return A.z(["requestId",this.a,"reason",this.b,"message",this.c],t.N,t.z)}}
A.dq.prototype={
gn(){return"tunnel.close.request"},
j(){return A.z(["requestId",this.a,"tunnelRef",this.b],t.N,t.z)}}
A.ci.prototype={
gn(){return"tunnel.close.response"},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"requestId",this.a)
r.i(0,"ok",this.b)
s=this.c
if(s.length!==0)r.i(0,"message",s)
return r}}
A.dr.prototype={
gn(){return"tunnel.list.request"},
j(){return A.z(["requestId",this.a],t.N,t.z)}}
A.cj.prototype={
gn(){return"tunnel.list.response"},
j(){var s=this.b,r=A.P(s),q=r.h("X<1,d<b,@>>")
s=A.a2(new A.X(s,r.h("d<b,@>(1)").a(new A.jl()),q),q.h("W.E"))
return A.z(["requestId",this.a,"tunnels",s],t.N,t.z)}}
A.jl.prototype={
$1(a){return t.x.a(a).j()},
$S:37}
A.c5.prototype={
gn(){return"node.tunnel.connect"},
gG(){return this.a},
j(){var s=this
return A.z(["tunnelId",s.b,"targetHost",s.c,"targetPort",s.d,"principal",s.e],t.N,t.z)}}
A.c7.prototype={
gn(){return"node.tunnel.connected"},
gG(){return this.a},
j(){return A.z(["tunnelId",this.b],t.N,t.z)}}
A.c6.prototype={
gn(){return"node.tunnel.connect.failed"},
gG(){return this.a},
j(){var s,r=A.o(t.N,t.z)
r.i(0,"tunnelId",this.b)
r.i(0,"reason",this.c)
s=this.d
if(s.length!==0)r.i(0,"message",s)
return r}}
A.kr.prototype={
$1(a){var s,r,q,p=t.f.a(a).a2(0,t.N,t.z),o=A.j(p,"tunnelId"),n=A.j(p,"nodeId"),m=A.i(p,"ownerUserId")
if(m==null)m=""
s=A.i(p,"targetHost")
if(s==null)s="localhost"
r=A.bs(p,"targetPort")
q=A.i(p,"publicHost")
if(q==null)q=""
return new A.aI(o,n,m,s,r,q,A.bs(p,"publicPort"),A.a1(p,"secure"),A.bZ(p,"createdAt"))},
$S:38}
A.cF.prototype={
gn(){return"ai.config.request"},
j(){return A.z(["requestId",this.a],t.N,t.z)}}
A.bH.prototype={
gn(){return"ai.config.response"},
j(){var s,r=this,q=A.o(t.N,t.z)
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
A.fm.prototype={
ac(){return"HttpProxyCredentialMode."+this.b}}
A.cN.prototype={
gn(){return"http.proxy.request"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"method",r.b)
q.i(0,"url",r.c)
s=r.d
if(s.gJ(s))q.i(0,"headers",s)
q.i(0,"body",r.e)
s=r.f
if(s!==B.z)q.i(0,"credentialMode",s.b)
s=r.r
if(s!=null)q.i(0,"provider",s)
return q}}
A.bq.prototype={
gn(){return"http.proxy.response"},
j(){var s,r=this,q=A.o(t.N,t.z)
q.i(0,"requestId",r.a)
q.i(0,"statusCode",r.b)
s=r.c
if(s.gJ(s))q.i(0,"headers",s)
s=r.d
if(s.length!==0)q.i(0,"body",s)
s=r.e
if(s!=null)q.i(0,"error",s)
return q}}
A.dT.prototype={
ac(){return"DataOpcode."+this.b}}
A.ij.prototype={
h1(a){var s,r,q,p,o,n,m
A:{if(a instanceof A.an){s=a.a
r=s.gG()
q=A.z(["t",s.gn(),"d",s.j()],t.N,t.z)
if(r!=null)q.i(0,"c",r)
p=B.x.h2(q,null)
break A}if(a instanceof A.bT){o=a.d
p=o.length
if(p>65536)A.v(A.a9("Data payload "+p+" exceeds max 65536","malformed_frame"))
n=10+p
m=new Uint8Array(n)
m[0]=a.a&255
m[1]=a.b.c&255
A.lM(m,2,a.c)
A.lM(m,6,p)
B.k.aE(m,10,n,o)
p=m
break A}p=null}return p},
fS(a){var s,r,q,p,o,n,m,l="malformed_frame"
if(typeof a=="string")return this.fW(a)
s=t.L
if(s.b(a)){s.a(a)
r=t.p.b(a)?a:new Uint8Array(A.bC(a))
s=r.length
if(s<10)A.v(B.au)
if(0>=s)return A.c(r,0)
q=r[0]
if(1>=s)return A.c(r,1)
p=A.ok(r[1])
o=A.lL(r,2)
n=A.lL(r,6)
m=s-10
if(n!==m)A.v(A.a9("Data frame length mismatch: declared "+n+", got "+m,l))
if(m>65536)A.v(A.a9("Data payload "+m+" exceeds max 65536",l))
return new A.bT(q,p,o,A.mk(r,10,null))}throw A.e(B.ay)},
fW(a){var s,r,q,p,o,n,m,l,k,j=null,i=null
try{i=B.x.fU(a,j)}catch(r){q=A.a_(r)
if(q instanceof A.ao){s=q
throw A.e(A.a9("Invalid control JSON: "+s.a,j))}else throw r}q=t.f
if(!q.b(i))throw A.e(B.as)
p=t.N
o=t.z
n=i.a2(0,p,o)
m=n.p(0,"t")
if(typeof m!="string")throw A.e(B.at)
l=this.a.p(0,m)
if(l==null)throw A.e(A.a9("Unknown control message type: "+m,j))
k=A.hH(n.p(0,"c"))?A.U(n.p(0,"c")):j
return new A.an(l.$2(k,q.b(n.p(0,"d"))?q.a(n.p(0,"d")).a2(0,p,o):A.o(p,o)))}}
A.b7.prototype={}
A.an.prototype={
gG(){return this.a.gG()}}
A.bT.prototype={
gG(){return this.c}}
A.fK.prototype={
k(a){return A.nf(this).k(0)+"("+this.a+"): "+this.b}}
A.aS.prototype={}
A.f6.prototype={}
A.fZ.prototype={}
A.jm.prototype={}
A.ch.prototype={}
A.iy.prototype={
$2(a,b){return new A.bu(J.b0(a),J.b0(b),t.fK)},
$S:39}
A.ix.prototype={
$1(a){return J.b0(a)},
$S:40}
A.iW.prototype={}
A.dN.prototype={
ac(){return"AppErrorKind."+this.b}}
A.aD.prototype={
k(a){return"AppError("+this.a.k(0)+", "+this.b+")"}}
A.fL.prototype={
aV(a,b,c){var s=0,r=A.H(t.ga),q,p=2,o=[],n=this,m,l,k,j,i,h
var $async$aV=A.I(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:i=A.pg(a)
n.e=!1
k=t.N
m=new A.fc(new A.i1(i,new A.h7(b,c),null,n.geT()),new A.e2(A.cU(A.oN(null),null,!1,t.d1),t.eC),A.o(k,t.gE),A.o(k,t.ds),A.o(k,t.ev),A.o(k,t.b9),A.o(k,t.ef),A.o(k,t.dd),A.o(k,t.ge),A.o(k,t.eB),A.o(k,t.fb),A.o(k,t.bz),A.o(k,t.ak),A.o(t.S,t.eh))
p=4
s=7
return A.y(m.aa(),$async$aV)
case 7:p=2
s=6
break
case 4:p=3
h=o.pop()
l=A.a_(h)
s=8
return A.y(m.q(),$async$aV)
case 8:k=A.lF(l)
throw A.e(k)
s=6
break
case 3:s=2
break
case 6:n.b=m
m.toString
k=m.e
k.toString
q=k
s=1
break
case 1:return A.F(q,r)
case 2:return A.E(o.at(-1),r)}})
return A.G($async$aV,r)},
eU(){this.b=null},
hq(a,b,c){return this.bc(new A.iJ(this,b,a,c),t.J)},
bc(a,b){return this.eQ(b.h("V<0>()").a(a),b,b)},
eQ(a,b,c){var s=0,r=A.H(c),q,p=2,o=[],n,m,l,k
var $async$bc=A.I(function(d,e){if(d===1){o.push(e)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.y(a.$0(),$async$bc)
case 7:m=e
q=m
s=1
break
p=2
s=6
break
case 4:p=3
k=o.pop()
n=A.a_(k)
m=A.lF(n)
throw A.e(m)
s=6
break
case 3:s=2
break
case 6:case 1:return A.F(q,r)
case 2:return A.E(o.at(-1),r)}})
return A.G($async$bc,r)}}
A.iJ.prototype={
$0(){var s=this,r=s.a.b
if(r==null)A.v(B.H)
return r.b0(B.D,s.b,new A.fV("xterm-256color",s.c,s.d))},
$S:41}
A.fg.prototype={
fu(){var s,r=this.b
if(r==null)return
try{r.hE(this.c,B.b.ak(A.iB(this.a.a,t.N),"\n"))}catch(s){}},
$iog:1}
A.h4.prototype={
e7(a,b,c,d,e){var s,r,q=this,p=null,o=q.x
o=q.bd("Ctrl-"+o,new A.jb(q),"Control "+o)
q.w!==$&&A.bE("_lastCtrlButton")
q.w=o
s=q.bd("Ctrl",q.gfI(),"Control combinations")
q.r!==$&&A.bE("_ctrlButton")
q.r=s
A.l(s.classList).add("has-menu")
s.setAttribute("aria-haspopup","menu")
q.a.shn(new A.jc(q))
r=t.O
r=A.ae("div","Terminal keys",p,A.w([q.au("Esc",B.a6),q.au("Tab",B.af),A.ae("div","Control",p,A.w([o,s],r),"term-ctrl-group",p,p,"group",p),q.aR("\u2191",B.a9,"Up"),q.aR("\u2193",B.aa,"Down"),q.aR("\u2190",B.ac,"Left"),q.aR("\u2192",B.ab,"Right"),q.bl("|"),q.bl("~"),q.bl("/"),q.bl("-"),q.bU("Copy",q.geB()),q.bU("Paste",q.gfs()),q.au("Home",B.ae),q.au("End",B.ad),q.au("PgUp",B.a7),q.au("PgDn",B.a8)],r),"term-accessory",p,p,"toolbar",p)
q.f!==$&&A.bE("element")
q.f=r},
aR(a,b,c){return this.bd(a,new A.j9(this,t.L.a(b)),c)},
au(a,b){return this.aR(a,b,null)},
bl(a){return this.bU(a,new A.ja(this,a))},
bd(a,b,c){var s=A.hJ(a,c,"mono",new A.j_(this,t.M.a(b)),!1)
A.dL(s,"mousedown",new A.j0())
return s},
bU(a,b){return this.bd(a,b,null)},
eC(a){var s,r=a.length
if(r===0)return null
if(0>=r)return A.c(a,0)
s=a.charCodeAt(0)
if(s>=64&&s<=95)return s&31
if(s>=97&&s<=122)return s&31
if(s===32)return 0
if(s===63)return 127
return null},
c4(a){var s,r,q=this,p=q.eC(a)
if(p==null){q.e.$1('"'+a+'" is not a valid Ctrl combination.')
return!1}q.a.aN(t.L.a(A.w([p],t.t)))
s=q.x=B.a.u(a,0,1).toUpperCase()
r=q.w
r===$&&A.r("_lastCtrlButton")
r.textContent="Ctrl-"+s
r.setAttribute("aria-label","Control "+s)
return!0},
fJ(){if(this.y!=null)this.ap()
else this.fq()},
fq(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g="div",f=null,e="mousedown",d=t.O,c=A.w([],d)
for(s=0;s<12;++s)c.push(h.eq(B.ag[s]))
r=A.ae(g,f,f,c,"ctrl-menu-grid",f,f,"group",f)
q=A.hO("off","ctrl-custom-char","\xb7","text")
q.maxLength=1
q.className="ctrl-custom-input mono"
c=new A.j8(h,q)
A.dL(q,"keydown",new A.j1(c))
p=A.hJ("Send",f,f,c,!1)
A.dL(p,e,new A.j2())
o=A.ae(g,f,f,A.w([A.ae("span",f,f,B.h,"ctrl-menu-label mono",f,f,f,"Ctrl-"),q,p],d),"ctrl-menu-custom",f,f,f,f)
n=A.hJ("Ctrl + next key","Arm Control for the next key","ctrl-menu-arm",new A.j3(h),!1)
A.dL(n,e,new A.j4())
m=h.y=A.ae(g,"Control combinations",f,A.w([r,o,A.ae(g,f,f,B.h,"ctrl-menu-sep",f,f,f,f),n],d),"ctrl-menu",f,f,"menu",f)
d=v.G
A.l(A.aM(A.l(d.document).body).appendChild(m))
c=h.r
c===$&&A.r("_ctrlButton")
l=A.l(c.getBoundingClientRect())
A.l(m.style).position="fixed"
A.l(m.style).bottom=""+B.f.cp(A.U(A.l(d.window).innerHeight)-A.aY(l.top)+6)+"px"
k=A.aY(A.l(m.getBoundingClientRect()).width)
j=A.aY(l.left)
i=A.U(A.l(d.window).innerWidth)-k-8
if(j>i)j=i
if(j<8)j=8
A.l(m.style).left=""+B.f.cp(j)+"px"
h.z=new A.j5(A.dL(A.l(d.document),e,new A.j6(h,m)),A.dL(A.l(d.document),"keydown",new A.j7(h)))},
eq(a){var s=A.hJ("^"+a,"Control "+a,"mono ctrl-menu-item",new A.iY(this,a),!1)
A.dL(s,"mousedown",new A.iZ())
return s},
ap(){var s=this,r=s.z
if(r!=null)r.$0()
s.z=null
r=s.y
if(r!=null)r.remove()
s.y=null},
ba(){var s=0,r=A.H(t.H),q,p=2,o=[],n=this,m,l,k,j
var $async$ba=A.I(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:l=n.b.a
k=A.L(l.getSelection())
if(J.bi(k)===0){n.e.$1("Select text in the terminal first.")
s=1
break}p=4
s=7
return A.y(n.d.$1(k),$async$ba)
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
case 6:case 1:return A.F(q,r)
case 2:return A.E(o.at(-1),r)}})
return A.G($async$ba,r)},
bj(){var s=0,r=A.H(t.H),q=1,p=[],o=this,n,m,l
var $async$bj=A.I(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
s=6
return A.y(o.c.$0(),$async$bj)
case 6:n=b
if(n!=null&&n.length!==0)o.a.aN(t.L.a(B.i.Y(n)))
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
return A.F(null,r)
case 1:return A.E(p.at(-1),r)}})
return A.G($async$bj,r)}}
A.jb.prototype={
$0(){var s=this.a
return s.c4(s.x)},
$S:0}
A.jc.prototype={
$1(a){var s=this.a.r
s===$&&A.r("_ctrlButton")
return A.hF(A.l(s.classList).toggle("active",a))},
$S:16}
A.j9.prototype={
$0(){return this.a.a.aN(t.L.a(this.b))},
$S:0}
A.ja.prototype={
$0(){return this.a.a.aN(t.L.a(B.i.Y(this.b)))},
$S:0}
A.j_.prototype={
$0(){this.b.$0()
this.a.b.a.focus()},
$S:0}
A.j0.prototype={
$1(a){return A.l(a).preventDefault()},
$S:1}
A.j8.prototype={
$0(){var s,r=B.a.a7(A.L(this.b.value))
if(r.length===0)return
s=this.a
if(s.c4(r)){s.ap()
s.b.a.focus()}},
$S:0}
A.j1.prototype={
$1(a){if(A.L(A.l(a).key)==="Enter")this.a.$0()},
$S:1}
A.j2.prototype={
$1(a){return A.l(a).preventDefault()},
$S:1}
A.j3.prototype={
$0(){var s=this.a,r=s.a,q=!r.CW
r.CW=q
r=r.fx
if(r!=null)r.$1(q)
s.ap()
s.b.a.focus()},
$S:0}
A.j4.prototype={
$1(a){return A.l(a).preventDefault()},
$S:1}
A.j6.prototype={
$1(a){var s,r=A.aM(A.l(a).target)
if(r!=null)if(!A.hF(this.b.contains(r))){s=this.a.r
s===$&&A.r("_ctrlButton")
s=A.hF(s.contains(r))}else s=!0
else s=!1
if(s)return
this.a.ap()},
$S:1}
A.j7.prototype={
$1(a){var s
if(A.L(A.l(a).key)==="Escape"){s=this.a
s.ap()
s.b.a.focus()}},
$S:1}
A.j5.prototype={
$0(){this.a.$0()
this.b.$0()},
$S:0}
A.iY.prototype={
$0(){var s=this.a
s.c4(this.b)
s.ap()
s.b.a.focus()},
$S:0}
A.iZ.prototype={
$1(a){return A.l(a).preventDefault()},
$S:1}
A.bA.prototype={
ac(){return"TerminalTextSize."+this.b}}
A.h5.prototype={
fN(){var s,r,q,p=this,o=v.G
A.mi(A.l(o.window),"resize",p.gdP())
s=A.aM(A.l(o.window).visualViewport)
if(s!=null)A.mi(s,"resize",p.gdQ())
o=o.ResizeObserver
r=new A.jf(p)
if(typeof r=="function")A.v(A.bj("Attempting to rewrap a JS function.",null))
q=function(a,b){return function(c,d){return a(b,c,d,arguments.length)}}(A.qK,r)
q[$.kR()]=r
A.l(new o(q)).observe(p.b)},
aX(){this.eh()
this.fM()},
fM(){var s,r=this.a,q=13
switch(this.f.$0()){case B.F:break
case B.aX:q=B.c.bn(B.f.h9(10.4),6,40)
break
case B.aY:break
case B.aZ:q=B.c.bn(B.f.fQ(16.25),6,40)
break
default:q=null}A.l(r.a.options).fontSize=q
s=B.f.bn(q/13,0.7,1.6)
A.l(this.d.style).setProperty("--term-key-scale",B.f.hx(s,3))
r.aX()},
bA(){var s=this.w
if(s)return
this.w=!0
A.U(A.l(v.G.window).requestAnimationFrame(A.cy(new A.ji(this))))},
dR(){var s,r=this
r.bA()
s=r.y
if(s!=null)s.P()
r.y=A.jj(B.Y,r.gca())},
eh(){var s,r,q=this,p=A.aM(A.l(v.G.document).documentElement)
p=p==null?null:A.hF(A.l(p.classList).contains("keyboard-open"))
s=p===!0
if(q.r.$0()||s){A.L(A.l(q.b.style).removeProperty("height"))
return}p=q.b
A.L(A.l(p.style).removeProperty("height"))
r=q.ek()
if(r>0)A.l(p.style).height=""+B.f.cp(r)+"px"},
ek(){var s,r,q,p=v.G,o=A.aM(A.l(p.window).visualViewport),n=o==null?null:A.aY(o.height)
if(n==null)n=A.U(A.l(p.window).innerHeight)
s=A.l(this.b.getBoundingClientRect())
r=A.l(this.c.getBoundingClientRect())
q=A.aY(r.top)-A.aY(s.bottom)
p=A.aY(r.height)
o=q>0?q:0
return n-A.aY(s.top)-(p+o)}}
A.jg.prototype={
$0(){return B.F},
$S:44}
A.jh.prototype={
$0(){return!1},
$S:45}
A.jf.prototype={
$2(a,b){t.c.a(a)
A.l(b)
this.a.bA()},
$S:46}
A.ji.prototype={
$1(a){var s
A.aY(a)
s=this.a
s.w=!1
s.aX()},
$S:47}
A.jd.prototype={
$1(a){A.l(a)
return this.a.$0()},
$S:1}
A.je.prototype={
$0(){return this.a.removeEventListener(this.b,this.c)},
$S:0}
A.em.prototype={
e8(a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=b.f,a1=b.ax,a2=b.a,a3=a2.gaF(),a4=t.t
a3=new A.fA(new A.M(a0,A.h(a0).h("M<1>")),new A.jv(b),b.gfd(),a1,a,b.geX(),new A.jw(b),b.gfi(),a,A.w([],t.s),a3.a,B.p,A.w([],a4))
a1=a1.a
a3.fx=new A.im(a1,a1.a.length)
b.e!==$&&A.bE("_editor")
b.e=a3
a0=b7.r
a0=a0==null?a:a0.a
a4=A.w([],a4)
if(a0==null){a0=a
if(null==null)s=a0
else s=a0
if(s==null)s=$.nH().dN()
a0=s.length
if(6>=a0)return A.c(s,6)
a1=s[6]
s.$flags&2&&A.Q(s)
s[6]=a1&15|64
if(8>=a0)return A.c(s,8)
s[8]=s[8]&63|128
if(a0<16)A.v(A.md("buffer too small: need 16: length="+a0))
a1=$.nG()
r=s[0]
if(!(r<256))return A.c(a1,r)
r=a1[r]
q=s[1]
if(!(q<256))return A.c(a1,q)
q=a1[q]
p=s[2]
if(!(p<256))return A.c(a1,p)
p=a1[p]
o=s[3]
if(!(o<256))return A.c(a1,o)
o=a1[o]
n=s[4]
if(!(n<256))return A.c(a1,n)
n=a1[n]
m=s[5]
if(!(m<256))return A.c(a1,m)
m=a1[m]
l=s[6]
if(!(l<256))return A.c(a1,l)
l=a1[l]
k=s[7]
if(!(k<256))return A.c(a1,k)
k=a1[k]
j=s[8]
if(!(j<256))return A.c(a1,j)
j=a1[j]
if(9>=a0)return A.c(s,9)
i=s[9]
if(!(i<256))return A.c(a1,i)
i=a1[i]
if(10>=a0)return A.c(s,10)
h=s[10]
if(!(h<256))return A.c(a1,h)
h=a1[h]
if(11>=a0)return A.c(s,11)
g=s[11]
if(!(g<256))return A.c(a1,g)
g=a1[g]
if(12>=a0)return A.c(s,12)
f=s[12]
if(!(f<256))return A.c(a1,f)
f=a1[f]
if(13>=a0)return A.c(s,13)
e=s[13]
if(!(e<256))return A.c(a1,e)
e=a1[e]
if(14>=a0)return A.c(s,14)
d=s[14]
if(!(d<256))return A.c(a1,d)
d=a1[d]
if(15>=a0)return A.c(s,15)
a0=s[15]
if(!(a0<256))return A.c(a1,a0)
a0=r+q+p+o+"-"+n+m+"-"+l+k+"-"+j+i+"-"+h+g+f+e+d+a1[a0]}a4=new A.i6("__OMNYSHELL_CWD_"+a0+"__",a4)
a0=a4
a0=new A.fp(b7,a0,A.py(b7.y),!1,new A.jx(b),b.gfg(),new A.jy(b),b.gfa(),!1)
b.d!==$&&A.bE("_controller")
b.d=a0
a2.ho(new A.jz(b))
a2.hp(b.gfk())
c=a2.gaF()
a1=c.a
if(a1>0&&c.b>0)b7.dE(a1,c.b)
a3.aH()
a0.aH()},
fl(a,b){var s=this,r=s.d
r===$&&A.r("_controller")
r.a.dE(a,b)
r=s.e
r===$&&A.r("_editor")
r.dV(a)
r.bB(s.c3(s.fr))
r=s.dx
if((r.c&4)===0)r.l(0,null)},
aN(a){var s,r,q=this
t.L.a(a)
if(q.cx||J.kS(a))return
s=q.ef(a)
if(!q.cy&&!q.ch&&s.length===1&&J.nR(s)===3){q.eV()
return}r=q.f
if((r.b&4)===0)r.l(0,s)},
eV(){var s=this.e
s===$&&A.r("_editor")
s.hg()},
eY(){var s=this,r=s.d
r===$&&A.r("_controller")
r.a.cz("SIGINT")
if(!r.at){r=s.e
r===$&&A.r("_editor")
r.bB(s.c3(s.fr))}},
fj(a){var s,r="_controller"
t.L.a(a)
s=J.aB(a)
if(s.gm(a)===1&&J.bF(s.gZ(a),3)){s=this.d
s===$&&A.r(r)
s.a.cz("SIGINT")
return}s=this.d
s===$&&A.r(r)
s.dT(a)},
fh(a){var s
this.fr=a
s=this.e
s===$&&A.r("_editor")
s.bB(this.c3(a))},
c3(a){var s=a.a
if(s==null)s="~"
return A.tE(a.b,s,a.c,this.c,this.b,a.d,this.a.gaF().a)},
fb(a){if(this.cx)return
this.cx=!0
this.a.a.write("\r\n\x1b[90m[session ended \u2014 exit "+a+"]\x1b[0m\r\n")},
bh(a){return this.fe(A.L(a))},
fe(a){var s=0,r=A.H(t.H),q=this,p
var $async$bh=A.I(function(b,c){if(b===1)return A.E(c,r)
for(;;)switch(s){case 0:s=a.length!==0?2:3
break
case 2:p=q.e
p===$&&A.r("_editor")
s=4
return A.y(p.bm(a),$async$bh)
case 4:case 3:p=q.d
p===$&&A.r("_controller")
p.e0(a)
return A.F(null,r)}})
return A.G($async$bh,r)},
ef(a){var s,r,q
t.L.a(a)
if(!this.CW)return a
this.eG()
s=J.aB(a)
if(s.gC(a))return a
r=s.gZ(a)
if(!(r>=64&&r<=95))q=r>=97&&r<=122
else q=!0
if(q){q=A.w([r&31],t.t)
B.b.aw(q,s.bD(a,1))
return q}return a},
eG(){if(!this.CW)return
this.CW=!1
var s=this.fx
if(s!=null)s.$1(!1)},
shn(a){this.fx=t.d3.a(a)},
$ipF:1}
A.jv.prototype={
$1(a){return this.a.a.a.write(new Uint8Array(A.bC(t.L.a(B.i.Y(a)))))},
$S:7}
A.jw.prototype={
$0(){var s=this.a.d
s===$&&A.r("_controller")
s.q()
return null},
$S:0}
A.jx.prototype={
$1(a){var s,r
t.L.a(a)
s=this.a
r=s.e
r===$&&A.r("_editor")
return r.hr(new A.ju(s,a))},
$S:6}
A.ju.prototype={
$0(){return this.a.a.a.write(new Uint8Array(A.bC(t.L.a(this.b))))},
$S:0}
A.jy.prototype={
$1(a){var s=this.a
s.ch=a
s=s.e
s===$&&A.r("_editor")
s.dU(a)},
$S:16}
A.jz.prototype={
$1(a){return this.a.aN(B.i.Y(a))},
$S:7}
A.er.prototype={
aX(){var s
try{this.b.fit()}catch(s){}},
ho(a){A.l(this.a.onData(A.cy(new A.jE(t.ec.a(a)))))},
hp(a){A.l(this.a.onResize(A.cy(new A.jF(t.dA.a(a)))))},
gaF(){var s=this.a
return new A.eM(A.U(s.cols),A.U(s.rows))},
$ipG:1}
A.jE.prototype={
$1(a){return this.a.$1(A.L(a))},
$S:7}
A.jF.prototype={
$1(a){A.l(a)
return this.a.$2(A.U(a.cols),A.U(a.rows))},
$S:1}
A.kB.prototype={
$2(a,b){return this.a.setAttribute(A.L(a),A.L(b))},
$S:52}
A.kO.prototype={
$0(){return this.a.removeEventListener(this.b,this.c)},
$S:0}
A.h6.prototype={
bC(a,b){var s=null,r=A.ae("div",s,s,B.h,b.length===0?"toast":"toast "+b,s,s,"status",a)
A.l(this.a.appendChild(r))
A.jj(B.Z,new A.jk(r))},
dX(a){return this.bC(a,"")}}
A.jk.prototype={
$0(){var s=this.a
if(A.aM(s.parentNode)!=null)s.remove()},
$S:0}
A.kv.prototype={
$1(a){A.l(a)
return this.a.$0()},
$S:1}
A.dW.prototype={
e6(a,b,c,d){var s=this,r=s.$ti,q=r.h("dy<1>").a(new A.dy(a,s,new A.ac(new A.p($.u,t.D),t.h),b,d.h("dy<0>")))
s.a!==$&&A.bE("_sink")
s.a=q
if(c.a.ghh()){q=c.a
c.a=A.h(q).v(d).h("aV<aa.T,1>").a(new A.ee(d.h("@<0>").v(d).h("ee<1,2>"))).fO(q)}r=r.h("cg<1>").a(A.aU(null,new A.il(c,s,d),!0,d))
s.b!==$&&A.bE("_streamController")
s.b=r},
d_(){var s,r
this.d=!0
s=this.c
if(s!=null)s.P()
r=this.b
r===$&&A.r("_streamController")
r.q()}}
A.il.prototype={
$0(){var s,r,q=this.b
if(q.d)return
s=this.a.a
r=q.b
r===$&&A.r("_streamController")
q.c=s.cg(this.c.h("~(0)").a(r.gfL(r)),new A.ik(q),r.gdk())},
$S:0}
A.ik.prototype={
$0(){var s=this.a,r=s.a
r===$&&A.r("_sink")
r.d0()
s=s.b
s===$&&A.r("_streamController")
s.q()},
$S:0}
A.dy.prototype={
l(a,b){var s,r=this
r.$ti.c.a(b)
if(r.e)throw A.e(A.b8("Cannot add event after closing."))
if(r.d)return
s=r.a
s.a.l(0,s.$ti.c.a(b))},
ah(a,b){if(this.e)throw A.e(A.b8("Cannot add event after closing."))
if(this.d)return
this.ee(a,b)},
c7(a){return this.ah(a,null)},
ee(a,b){var s=this
if(s.w){s.a.a.ah(a,b)
return}s.c.aU(a,b)
s.d0()
s.b.d_()
s.a.a.q().dq(new A.k2())},
q(){var s=this
if(s.e)return s.c.a
s.e=!0
if(!s.d){s.b.d_()
s.c.D(s.a.a.q())}return s.c.a},
d0(){this.d=!0
var s=this.c
if((s.a.a&30)===0)s.az()
return},
$iay:1}
A.k2.prototype={
$1(a){},
$S:4}
A.h2.prototype={}
A.eg.prototype={$il8:1}
A.iN.prototype={
dN(){var s=this.eO()
if(s.length!==16)throw A.e(A.lQ("The length of the Uint8list returned by the custom RNG must be 16."))
else return s}}
A.i5.prototype={
eO(){var s,r,q,p,o=new Uint8Array(16)
for(s=0;s<16;s+=4){r=$.no().hl(B.f.hu(Math.pow(2,32)))
if(!(s<16))return A.c(o,s)
o[s]=r
q=s+1
p=B.c.a1(r,8)
if(!(q<16))return A.c(o,q)
o[q]=p
p=s+2
q=B.c.a1(r,16)
if(!(p<16))return A.c(o,p)
o[p]=q
q=s+3
p=B.c.a1(r,24)
if(!(q<16))return A.c(o,q)
o[q]=p}return o}}
A.kX.prototype={}
A.cq.prototype={
a5(a,b,c,d){var s=this.$ti
s.h("~(1)?").a(a)
t.Y.a(c)
return A.mt(this.a,this.b,a,!1,s.c)},
cg(a,b,c){return this.a5(a,null,b,c)}}
A.ey.prototype={
P(){var s=this,r=A.lR(null,t.H)
if(s.b==null)return r
s.dj()
s.d=s.b=null
return r},
ci(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.e(A.b8("Subscription has been canceled."))
r.dj()
s=A.n8(new A.jQ(a),t.m)
s=s==null?null:A.cy(s)
r.d=s
r.dh()},
dh(){var s=this,r=s.d
if(r!=null&&s.a<=0)s.b.addEventListener(s.c,r,!1)},
dj(){var s=this.d
if(s!=null)this.b.removeEventListener(this.c,s,!1)},
$iaj:1}
A.jP.prototype={
$1(a){return this.a.$1(A.l(a))},
$S:1}
A.jQ.prototype={
$1(a){return this.a.$1(A.l(a))},
$S:1}
A.bL.prototype={
cF(a,b){var s=this.b
if((s.b&4)!==0)return
s.l(0,new A.cJ(a,b))
s.q()},
cw(a){var s
if((this.b.b&4)!==0)throw A.e(A.lc())
s=A.nh(a)
s.toString
this.a.send(s)},
ai(a,b){var s=0,r=A.H(t.H),q=this,p
var $async$ai=A.I(function(c,d){if(c===1)return A.E(d,r)
for(;;)switch(s){case 0:p=q.b
if((p.b&4)!==0)throw A.e(A.lc())
p.q()
q.a.close()
return A.F(null,r)}})
return A.G($async$ai,r)},
$ijA:1}
A.hW.prototype={
$1(a){A.l(a)
this.a.D(this.b)},
$S:8}
A.hX.prototype={
$1(a){var s
A.l(a)
s=this.a
if((s.a.a&30)===0)s.H(new A.eo("Failed to connect WebSocket"))
else this.b.cF(1006,"error")},
$S:8}
A.hY.prototype={
$1(a){var s,r,q=this.a.b
if((q.b&4)!==0)return
s=a.data
s.toString
r=A.mr("data")
if(typeof s==="string")r.b=new A.dp(A.L(s))
else if(typeof s==="object"&&A.oB(A.l(s),"ArrayBuffer"))r.b=new A.cG(A.m2(t.e9.a(s),0,null))
else throw A.e(A.b8("unexpected message type: "+J.kT(s).k(0)))
q.l(0,r.d4())},
$S:1}
A.hZ.prototype={
$1(a){var s
A.l(a)
s=this.a
if((s.a.a&30)===0)s.D(this.b)
this.b.cF(A.U(a.code),A.L(a.reason))},
$S:8}
A.bd.prototype={}
A.dp.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.dp&&b.a===this.a},
gA(a){return B.a.gA(this.a)}}
A.cG.prototype={
M(a,b){var s,r,q,p,o
if(b==null)return!1
if(b instanceof A.cG&&b.a.length===this.a.length){for(s=this.a,r=s.length,q=b.a,p=q.length,o=0;o<r;++o){if(!(o<p))return A.c(q,o)
if(q[o]!==s[o])return!1}return!0}return!1},
gA(a){return A.c9(this.a)},
k(a){return"BinaryDataReceived("+A.J(this.a)+")"}}
A.cJ.prototype={
M(a,b){if(b==null)return!1
return b instanceof A.cJ&&b.a===this.a&&b.b===this.b},
gA(a){return A.c9([this.a,this.b])},
k(a){return"CloseReceived("+this.a+", "+this.b+")"}}
A.eo.prototype={
k(a){var s=this.a
if(s.length===0)return"WebSocketException"
else return"WebSocketException: "+s}}
A.en.prototype={
k(a){var s=this.a
if(s.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+s}}
A.f3.prototype={
gcA(){var s,r=this,q=r.w
if(q===$){s=r.r.b
s===$&&A.r("_foreign")
s=s.a
s===$&&A.r("_sink")
q=r.w=new A.hE(r,s)}return q},
e4(a){a.bw(new A.hT(this),new A.hU(this),t.a)},
$ipU:1}
A.hT.prototype={
$1(a){var s,r
t.dN.a(a)
s=a.b
r=this.a
new A.M(s,A.h(s).h("M<1>")).aY(new A.hQ(r))
s=r.r.a
s===$&&A.r("_local")
s=s.b
s===$&&A.r("_streamController")
new A.M(s,A.h(s).h("M<1>")).hi(new A.hR(a),new A.hS(r,a))
A.L(a.a.protocol)
r.f.az()},
$S:55}
A.hQ.prototype={
$1(a){var s,r,q,p="_local",o="_sink"
t.E.a(a)
A:{s=a instanceof A.dp
r=s?a.a:null
if(s){s=this.a.r.a
s===$&&A.r(p)
s=s.a
s===$&&A.r(o)
s.l(0,r)
break A}s=a instanceof A.cG
q=s?a.a:null
if(s){s=this.a.r.a
s===$&&A.r(p)
s=s.a
s===$&&A.r(o)
s.l(0,q)
break A}if(a instanceof A.cJ){s=this.a.r.a
s===$&&A.r(p)
s=s.a
s===$&&A.r(o)
s.q()}}},
$S:56}
A.hR.prototype={
$1(a){var s,r,q,p,o,n,m
try{A:{s=a
r=null
o=typeof s=="string"
if(o)r=s
if(o){o=this.a
n=A.L(r)
if((o.b.b&4)!==0)A.v(A.lc())
n=A.nh(n)
n.toString
o.a.send(n)
break A}q=null
o=t.p.b(s)
if(o)q=s
if(o){this.a.cw(q)
break A}p=null
o=t.L.b(s)
if(o)p=s
if(o){this.a.cw(new Uint8Array(A.bC(p)))
break A}o=A.bc("Cannot send "+J.kT(a).k(0))
throw A.e(o)}}catch(m){if(!(A.a_(m) instanceof A.en))throw m}},
$S:12}
A.hS.prototype={
$0(){var s=0,r=A.H(t.H),q=1,p=[],o=this,n,m,l
var $async$$0=A.I(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
n=o.a
s=6
return A.y(o.b.ai(n.d,n.e),$async$$0)
case 6:q=1
s=5
break
case 3:q=2
l=p.pop()
if(!(A.a_(l) instanceof A.en))throw l
s=5
break
case 2:s=1
break
case 5:return A.F(null,r)
case 1:return A.E(p.at(-1),r)}})
return A.G($async$$0,r)},
$S:3}
A.hU.prototype={
$1(a){var s,r=new A.jB(J.b0(A.a3(a))),q=this.a
q.f.H(r)
q=q.r.a
q===$&&A.r("_local")
s=q.a
s===$&&A.r("_sink")
s.c7(r)
q=q.a
q===$&&A.r("_sink")
q.q()},
$S:22}
A.hE.prototype={
ai(a,b){var s=this.b
s.d=a
s.e=b
return this.e1()},
$ipV:1}
A.jB.prototype={
k(a){return"WebSocketChannelException: "+this.a}}
A.ie.prototype={
aH(){var s,r=null,q="text",p=A.hO(r,"hub","hub.example.com",q),o=A.hO(r,"principal","alice",q),n=A.hO(r,"token",r,"password"),m=A.hO(r,"node","worker-01",q),l=this.a
A.hK(l)
s=A.ae("div",r,r,A.w([A.ae("h1",r,r,B.h,r,r,r,r,"Terminal"),A.kC("Hub",p),A.kC("Principal",o),A.kC("Token",n),A.kC("Node",m),A.hJ("Connect",r,r,new A.ig(this,p,o,n,m),!0)],t.O),"card pad-lg",r,r,r,r)
A.hK(l)
A.l(l.appendChild(s))},
aM(a,b,c,d){return this.ez(a,b,c,d)},
ez(a,b,c,d){var s=0,r=A.H(t.H),q=1,p=[],o=this,n,m,l,k
var $async$aM=A.I(function(e,f){if(e===1){p.push(f)
s=q}for(;;)switch(s){case 0:q=3
s=6
return A.y(o.c.aV(a,c,d),$async$aM)
case 6:s=7
return A.y(o.bi(b,c),$async$aM)
case 7:q=1
s=5
break
case 3:q=2
k=p.pop()
l=A.a_(k)
if(l instanceof A.aD){n=l
o.b.bC(n.b,"error")}else throw k
s=5
break
case 2:s=1
break
case 5:return A.F(null,r)
case 1:return A.E(p.at(-1),r)}})
return A.G($async$aM,r)},
bi(a,b){var s=0,r=A.H(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$bi=A.I(function(a0,a1){if(a0===1)return A.E(a1,r)
for(;;)switch(s){case 0:l=A.ae("div",null,null,B.h,"terminal-host",null,null,null,null)
k=A.ae("div",null,null,B.h,null,null,null,null,null)
j=t.O
i=A.ae("div",null,null,A.w([A.ae("div",null,null,A.w([l],j),"card terminal-card",null,null,null,null),k],j),"terminal-screen stack",null,null,null,null)
j=q.a
A.hK(j)
A.hK(j)
A.l(j.appendChild(i))
j=v.G
p=j.Terminal
o={}
o.cursorBlink=!0
o.fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
o.fontSize=13
o.scrollback=5000
n={}
n.background="#0b0e12"
n.foreground="#e6e9ee"
n.cursor="#4f8bff"
o.theme=n
p=A.l(new p(o))
j=A.l(new j.FitAddon.FitAddon())
m=new A.er(p,j)
p.loadAddon(j)
p.open(l)
j=m.gca()
A.jj(B.y,j)
A.jj(B.a_,j)
h=A
g=A.tW()
f=A.tX()
e=A
d=a
c=b
s=2
return A.y(q.c.hq(m.gaF().a,a,m.gaF().b),$async$bi)
case 2:j=h.pD(g,f,e.pT(null,d,c,a1,m),q.b.gdW(),m).f
j===$&&A.r("element")
A.hK(k)
A.l(k.appendChild(j))
A.pE(k,l,i,m).fN()
p.focus()
return A.F(null,r)}})
return A.G($async$bi,r)}}
A.ig.prototype={
$0(){var s=this,r=A.L(s.b.value),q=A.L(s.c.value),p=A.L(s.d.value)
return s.a.aM(r,A.L(s.e.value),q,p)},
$S:0};(function aliases(){var s=J.bt.prototype
s.e2=s.k
s=A.D.prototype
s.e3=s.ab
s=A.bo.prototype
s.e1=s.q})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_0u,o=hunkHelpers._instance_2u,n=hunkHelpers._instance_1i,m=hunkHelpers.installInstanceTearOff,l=hunkHelpers._instance_1u,k=hunkHelpers.installStaticTearOff
s(J,"qZ","lX",57)
r(A,"rr","pY",5)
r(A,"rs","pZ",5)
r(A,"rt","q_",5)
q(A,"nb","rm",0)
r(A,"ru","rc",2)
s(A,"rv","re",11)
q(A,"na","rd",0)
var j
p(j=A.aW.prototype,"gc0","aq",0)
p(j,"gc1","ar",0)
o(A.p.prototype,"gcJ","es",11)
n(j=A.cw.prototype,"gfL","l",12)
m(j,"gdk",0,1,function(){return[null]},["$2","$1"],["ah","c7"],54,0,0)
p(j,"gfR","q",58)
p(j=A.be.prototype,"gc0","aq",0)
p(j,"gc1","ar",0)
p(j=A.ad.prototype,"gc0","aq",0)
p(j,"gc1","ar",0)
p(A.dw.prototype,"gcZ","ff",0)
r(A,"ty","qP",9)
r(A,"hL","pB",20)
l(j=A.fc.prototype,"gen","aK",42)
p(j,"gf7","cX",0)
l(j=A.fp.prototype,"gfo","fp",18)
l(j,"gfm","fn",18)
l(j,"gfc","cY",19)
l(A.fA.prototype,"gf2","f3",6)
l(A.bx.prototype,"gf4","f5",27)
l(j=A.eq.prototype,"gdS","an",21)
p(j,"geR","bT",0)
l(j=A.fb.prototype,"geH","eI",21)
p(j,"gf8","f9",0)
s(A,"rP","ow",59)
s(A,"rC","nZ",60)
s(A,"rB","nY",61)
s(A,"rA","nX",62)
s(A,"t4","p3",63)
s(A,"t5","p4",64)
s(A,"rU","oS",65)
s(A,"t1","p0",66)
s(A,"t0","p_",67)
s(A,"tg","ph",68)
s(A,"th","pi",69)
s(A,"t2","p1",70)
s(A,"t3","p2",71)
s(A,"tl","ps",72)
s(A,"tm","pt",73)
s(A,"tn","pu",74)
s(A,"t8","p7",75)
s(A,"t9","p8",76)
s(A,"ta","p9",77)
s(A,"rG","o7",78)
s(A,"rH","o8",79)
s(A,"rE","o4",80)
s(A,"rF","o5",81)
s(A,"rD","o3",124)
s(A,"rI","o9",83)
s(A,"ti","pm",84)
s(A,"tj","pq",85)
s(A,"t6","p5",86)
s(A,"t7","p6",87)
s(A,"tk","pr",88)
s(A,"rL","oq",89)
s(A,"rX","oW",90)
s(A,"rY","oX",91)
s(A,"rM","or",92)
s(A,"rJ","oo",93)
s(A,"rV","oU",94)
s(A,"rW","oV",95)
s(A,"rK","op",96)
s(A,"rw","nS",97)
s(A,"rT","oR",98)
s(A,"rS","oQ",99)
s(A,"rx","nT",100)
s(A,"to","pv",101)
s(A,"tb","pa",102)
s(A,"tc","pb",103)
s(A,"tp","pw",104)
s(A,"rN","os",105)
s(A,"rZ","oY",106)
s(A,"t_","oZ",107)
s(A,"rO","ot",108)
s(A,"tu","pM",109)
s(A,"tv","pN",110)
s(A,"tw","pO",111)
s(A,"tq","pI",112)
s(A,"tr","pJ",113)
s(A,"ts","pK",114)
s(A,"tt","pL",115)
s(A,"te","pd",116)
s(A,"tf","pe",117)
s(A,"td","pc",118)
s(A,"ry","nV",119)
s(A,"rz","nW",120)
s(A,"rQ","oy",121)
s(A,"rR","oz",122)
p(A.fL.prototype,"geT","eU",0)
q(A,"tW","kx",123)
r(A,"tX","ky",25)
p(j=A.h4.prototype,"gfI","fJ",0)
p(j,"geB","ba",3)
p(j,"gfs","bj",3)
p(j=A.h5.prototype,"gca","aX",0)
p(j,"gdP","bA",0)
p(j,"gdQ","dR",0)
o(j=A.em.prototype,"gfk","fl",48)
p(j,"geX","eY",0)
l(j,"gfi","fj",6)
l(j,"gfg","fh",49)
l(j,"gfa","fb",19)
l(j,"gfd","bh",25)
p(A.er.prototype,"gca","aX",0)
m(A.h6.prototype,"gdW",0,1,null,["$2$kind","$1"],["bC","dX"],53,0,0)
k(A,"tZ",1,null,["$2$headers","$1"],["hM",function(a){return A.hM(a,null)}],82,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.n,null)
q(A.n,[A.kZ,J.fq,A.ec,J.bI,A.hj,A.f,A.dQ,A.T,A.bn,A.K,A.iO,A.b5,A.e3,A.ep,A.ag,A.aX,A.dR,A.cs,A.bz,A.jn,A.iH,A.dV,A.eO,A.iA,A.e1,A.N,A.cP,A.dz,A.hg,A.ei,A.hw,A.jN,A.hA,A.aH,A.hn,A.kf,A.hz,A.es,A.af,A.aa,A.ad,A.ev,A.ew,A.aK,A.p,A.hh,A.eh,A.cw,A.hy,A.hi,A.cx,A.bf,A.hl,A.aL,A.dw,A.hu,A.eY,A.eB,A.hq,A.eF,A.D,A.ct,A.bR,A.aQ,A.jK,A.k6,A.kj,A.hD,A.aF,A.au,A.jO,A.fN,A.ef,A.jR,A.ao,A.bu,A.O,A.hx,A.fW,A.ab,A.eW,A.js,A.ht,A.iG,A.k3,A.bo,A.fi,A.h9,A.h8,A.fn,A.fj,A.h_,A.f2,A.i1,A.fc,A.i3,A.im,A.i8,A.i6,A.dn,A.iP,A.fp,A.fA,A.bx,A.dU,A.dm,A.hC,A.fT,A.fV,A.aG,A.fI,A.b6,A.iL,A.aI,A.fJ,A.fM,A.fU,A.fY,A.h7,A.eq,A.fa,A.hr,A.fb,A.k,A.aR,A.ij,A.b7,A.fK,A.iW,A.aD,A.fL,A.fg,A.h4,A.h5,A.em,A.er,A.h6,A.eg,A.dy,A.h2,A.iN,A.kX,A.ey,A.bL,A.bd,A.eo,A.jB,A.ie])
q(J.fq,[J.fs,J.dY,J.dZ,J.cQ,J.cR,J.cO,J.br])
q(J.dZ,[J.bt,J.A,A.bv,A.e6])
q(J.bt,[J.fO,J.cn,J.b3])
r(J.fr,A.ec)
r(J.iv,J.A)
q(J.cO,[J.dX,J.ft])
q(A.f,[A.dv,A.q,A.c2,A.co,A.eD,A.hf,A.hv,A.aT])
r(A.bM,A.dv)
r(A.ex,A.bM)
q(A.T,[A.bN,A.b4,A.ez,A.ho])
q(A.bn,[A.fe,A.fd,A.h3,A.kG,A.kI,A.jH,A.jG,A.kl,A.k0,A.iU,A.iT,A.kb,A.ia,A.ib,A.kK,A.kP,A.kQ,A.iR,A.i2,A.kt,A.is,A.iz,A.kD,A.jC,A.jD,A.i0,A.iF,A.iD,A.ic,A.kp,A.iE,A.id,A.kq,A.jl,A.kr,A.ix,A.jc,A.j0,A.j1,A.j2,A.j4,A.j6,A.j7,A.iZ,A.ji,A.jd,A.jv,A.jx,A.jy,A.jz,A.jE,A.jF,A.kv,A.k2,A.jP,A.jQ,A.hW,A.hX,A.hY,A.hZ,A.hT,A.hQ,A.hR,A.hU])
q(A.fe,[A.i_,A.i4,A.iw,A.kH,A.km,A.ku,A.k1,A.iC,A.k7,A.jt,A.iy,A.jf,A.kB])
q(A.K,[A.c_,A.ba,A.fu,A.hb,A.fX,A.dO,A.hm,A.e_,A.aE,A.ek,A.ha,A.ax,A.fh])
q(A.fd,[A.kM,A.jI,A.jJ,A.ke,A.jS,A.jX,A.jW,A.jU,A.jT,A.k_,A.jZ,A.jY,A.iV,A.iS,A.kd,A.kc,A.jM,A.jL,A.k8,A.kn,A.ka,A.ks,A.ki,A.kh,A.iQ,A.iJ,A.jb,A.j9,A.ja,A.j_,A.j8,A.j3,A.j5,A.iY,A.jg,A.jh,A.je,A.jw,A.ju,A.kO,A.jk,A.il,A.ik,A.hS,A.ig])
q(A.q,[A.W,A.c0,A.c1,A.eA])
q(A.W,[A.ej,A.X,A.e2,A.hp])
r(A.bX,A.c2)
q(A.aX,[A.cv,A.dA])
q(A.cv,[A.eL,A.eM])
r(A.bg,A.dA)
r(A.bS,A.dR)
q(A.bz,[A.dS,A.eN])
r(A.b1,A.dS)
r(A.e9,A.ba)
q(A.h3,[A.h1,A.cH])
r(A.hB,A.dO)
r(A.cW,A.bv)
q(A.e6,[A.e4,A.a8])
q(A.a8,[A.eG,A.eI])
r(A.eH,A.eG)
r(A.e5,A.eH)
r(A.eJ,A.eI)
r(A.aq,A.eJ)
q(A.e5,[A.fB,A.fC])
q(A.aq,[A.fD,A.fE,A.fF,A.fG,A.fH,A.e7,A.e8])
r(A.eR,A.hm)
q(A.aa,[A.dB,A.cq])
r(A.M,A.dB)
r(A.eu,A.M)
r(A.be,A.ad)
r(A.aW,A.be)
r(A.et,A.ev)
r(A.ac,A.ew)
q(A.cw,[A.du,A.dC])
q(A.bf,[A.aJ,A.cp])
r(A.hs,A.eY)
r(A.eC,A.ez)
r(A.eE,A.eN)
q(A.bR,[A.f7,A.fk,A.fv])
q(A.aQ,[A.f9,A.f8,A.fy,A.fx,A.he,A.el])
r(A.fw,A.e_)
r(A.k5,A.k6)
r(A.hd,A.fk)
q(A.aE,[A.dj,A.fo])
r(A.hk,A.eW)
r(A.ee,A.eh)
q(A.jO,[A.eK,A.ed,A.cb,A.by,A.fm,A.dT,A.dN,A.bA])
q(A.dm,[A.fP,A.fQ,A.ff])
q(A.k,[A.bp,A.bk,A.bK,A.bJ,A.d8,A.d9,A.cZ,A.d5,A.d6,A.dh,A.c8,A.d7,A.c4,A.cc,A.cd,A.ce,A.dc,A.dd,A.de,A.bP,A.bQ,A.cI,A.bO,A.bl,A.bm,A.di,A.dk,A.da,A.db,A.ca,A.cL,A.d1,A.d2,A.bV,A.cK,A.d_,A.d0,A.bU,A.cE,A.cX,A.cY,A.bG,A.dl,A.df,A.dg,A.cf,A.cM,A.d3,A.d4,A.bW,A.ds,A.ck,A.cl,A.dq,A.ci,A.dr,A.cj,A.c5,A.c7,A.c6,A.cF,A.bH,A.cN,A.bq])
q(A.b7,[A.an,A.bT])
q(A.fK,[A.aS,A.f6,A.fZ,A.jm,A.ch])
q(A.eg,[A.dW,A.f3])
r(A.i5,A.iN)
q(A.bd,[A.dp,A.cG,A.cJ])
r(A.en,A.eo)
r(A.hE,A.bo)
s(A.eG,A.D)
s(A.eH,A.ag)
s(A.eI,A.D)
s(A.eJ,A.ag)
s(A.du,A.hi)
s(A.dC,A.hy)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",x:"double",ak:"num",b:"String",a5:"bool",O:"Null",t:"List",n:"Object",d:"Map",B:"JSObject"},mangledNames:{},types:["~()","~(B)","~(@)","V<~>()","O(@)","~(~())","~(t<a>)","~(b)","O(B)","@(@)","O()","~(n,ai)","~(n?)","~(n?,n?)","@()","a(b?)","~(a5)","a5(b)","~(cm)","~(a)","b(a)","~(b7)","O(n)","d<b,@>(aG)","d<b,@>(aR)","V<~>(b)","n?(n?)","~(k)","O(~())","O(@,ai)","~(n)","~(a,@)","d<b,@>(b6)","0&(b,a?)","aR(d<@,@>)","@(b)","aG(d<@,@>)","d<b,@>(aI)","aI(d<@,@>)","bu<b,b>(@,@)","b(@)","V<bx>()","V<~>(k)","~(~)","bA()","a5()","O(A<n?>,B)","O(x)","~(a,a)","~(dn)","O(n,ai)","@(@,b)","~(b,b)","~(b{kind:b})","~(n[ai?])","O(jA)","~(bd)","a(@,@)","V<@>()","bp(a?,d<b,@>)","bk(a?,d<b,@>)","bK(a?,d<b,@>)","bJ(a?,d<b,@>)","d8(a?,d<b,@>)","d9(a?,d<b,@>)","cZ(a?,d<b,@>)","d5(a?,d<b,@>)","d6(a?,d<b,@>)","dh(a?,d<b,@>)","c8(a?,d<b,@>)","d7(a?,d<b,@>)","c4(a?,d<b,@>)","cc(a?,d<b,@>)","cd(a?,d<b,@>)","ce(a?,d<b,@>)","dc(a?,d<b,@>)","dd(a?,d<b,@>)","de(a?,d<b,@>)","bP(a?,d<b,@>)","bQ(a?,d<b,@>)","cI(a?,d<b,@>)","bO(a?,d<b,@>)","V<iI>(dt{headers:d<b,b>?})","bm(a?,d<b,@>)","di(a?,d<b,@>)","dk(a?,d<b,@>)","da(a?,d<b,@>)","db(a?,d<b,@>)","ca(a?,d<b,@>)","cL(a?,d<b,@>)","d1(a?,d<b,@>)","d2(a?,d<b,@>)","bV(a?,d<b,@>)","cK(a?,d<b,@>)","d_(a?,d<b,@>)","d0(a?,d<b,@>)","bU(a?,d<b,@>)","cE(a?,d<b,@>)","cX(a?,d<b,@>)","cY(a?,d<b,@>)","bG(a?,d<b,@>)","dl(a?,d<b,@>)","df(a?,d<b,@>)","dg(a?,d<b,@>)","cf(a?,d<b,@>)","cM(a?,d<b,@>)","d3(a?,d<b,@>)","d4(a?,d<b,@>)","bW(a?,d<b,@>)","ds(a?,d<b,@>)","ck(a?,d<b,@>)","cl(a?,d<b,@>)","dq(a?,d<b,@>)","ci(a?,d<b,@>)","dr(a?,d<b,@>)","cj(a?,d<b,@>)","c5(a?,d<b,@>)","c7(a?,d<b,@>)","c6(a?,d<b,@>)","cF(a?,d<b,@>)","bH(a?,d<b,@>)","cN(a?,d<b,@>)","bq(a?,d<b,@>)","V<b?>()","bl(a?,d<b,@>)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.eL&&a.b(c.a)&&b.b(c.b),"2;cols,rows":(a,b)=>c=>c instanceof A.eM&&a.b(c.a)&&b.b(c.b),"4;":a=>b=>b instanceof A.bg&&A.tS(a,b.a)}}
A.qn(v.typeUniverse,JSON.parse('{"fO":"bt","cn":"bt","b3":"bt","u6":"bv","A":{"t":["1"],"q":["1"],"B":[],"f":["1"],"a7":["1"]},"fs":{"a5":[],"C":[]},"dY":{"O":[],"C":[]},"dZ":{"B":[]},"bt":{"B":[]},"fr":{"ec":[]},"iv":{"A":["1"],"t":["1"],"q":["1"],"B":[],"f":["1"],"a7":["1"]},"bI":{"S":["1"]},"cO":{"x":[],"ak":[],"al":["ak"]},"dX":{"x":[],"a":[],"ak":[],"al":["ak"],"C":[]},"ft":{"x":[],"ak":[],"al":["ak"],"C":[]},"br":{"b":[],"al":["b"],"iK":[],"a7":["@"],"C":[]},"hj":{"o1":[]},"dv":{"f":["2"]},"dQ":{"S":["2"]},"bM":{"dv":["1","2"],"f":["2"],"f.E":"2"},"ex":{"bM":["1","2"],"dv":["1","2"],"q":["2"],"f":["2"],"f.E":"2"},"bN":{"T":["3","4"],"d":["3","4"],"T.K":"3","T.V":"4"},"c_":{"K":[]},"q":{"f":["1"]},"W":{"q":["1"],"f":["1"]},"ej":{"W":["1"],"q":["1"],"f":["1"],"W.E":"1","f.E":"1"},"b5":{"S":["1"]},"c2":{"f":["2"],"f.E":"2"},"bX":{"c2":["1","2"],"q":["2"],"f":["2"],"f.E":"2"},"e3":{"S":["2"]},"X":{"W":["2"],"q":["2"],"f":["2"],"W.E":"2","f.E":"2"},"co":{"f":["1"],"f.E":"1"},"ep":{"S":["1"]},"eL":{"cv":[],"aX":[]},"eM":{"cv":[],"aX":[]},"bg":{"dA":[],"aX":[]},"dR":{"d":["1","2"]},"bS":{"dR":["1","2"],"d":["1","2"]},"eD":{"f":["1"],"f.E":"1"},"cs":{"S":["1"]},"dS":{"bz":["1"],"h0":["1"],"q":["1"],"f":["1"]},"b1":{"dS":["1"],"bz":["1"],"h0":["1"],"q":["1"],"f":["1"]},"e9":{"ba":[],"K":[]},"fu":{"K":[]},"hb":{"K":[]},"eO":{"ai":[]},"bn":{"bY":[]},"fd":{"bY":[]},"fe":{"bY":[]},"h3":{"bY":[]},"h1":{"bY":[]},"cH":{"bY":[]},"fX":{"K":[]},"hB":{"K":[]},"b4":{"T":["1","2"],"m_":["1","2"],"d":["1","2"],"T.K":"1","T.V":"2"},"c0":{"q":["1"],"f":["1"],"f.E":"1"},"e1":{"S":["1"]},"c1":{"q":["1"],"f":["1"],"f.E":"1"},"N":{"S":["1"]},"cv":{"aX":[]},"dA":{"aX":[]},"cP":{"po":[],"iK":[]},"dz":{"eb":[],"cV":[]},"hf":{"f":["eb"],"f.E":"eb"},"hg":{"S":["eb"]},"ei":{"cV":[]},"hv":{"f":["cV"],"f.E":"cV"},"hw":{"S":["cV"]},"bv":{"B":[],"dP":[],"C":[]},"cW":{"bv":[],"B":[],"dP":[],"C":[]},"e6":{"B":[]},"hA":{"dP":[]},"e4":{"kW":[],"B":[],"C":[]},"a8":{"ap":["1"],"B":[],"a7":["1"]},"e5":{"D":["x"],"a8":["x"],"t":["x"],"ap":["x"],"q":["x"],"B":[],"a7":["x"],"f":["x"],"ag":["x"]},"aq":{"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"]},"fB":{"ih":[],"D":["x"],"a8":["x"],"t":["x"],"ap":["x"],"q":["x"],"B":[],"a7":["x"],"f":["x"],"ag":["x"],"C":[],"D.E":"x"},"fC":{"ii":[],"D":["x"],"a8":["x"],"t":["x"],"ap":["x"],"q":["x"],"B":[],"a7":["x"],"f":["x"],"ag":["x"],"C":[],"D.E":"x"},"fD":{"aq":[],"ip":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"fE":{"aq":[],"iq":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"fF":{"aq":[],"ir":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"fG":{"aq":[],"jp":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"fH":{"aq":[],"jq":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"e7":{"aq":[],"jr":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"e8":{"aq":[],"cm":[],"D":["a"],"a8":["a"],"t":["a"],"ap":["a"],"q":["a"],"B":[],"a7":["a"],"f":["a"],"ag":["a"],"C":[],"D.E":"a"},"hm":{"K":[]},"eR":{"ba":[],"K":[]},"hz":{"pH":[]},"es":{"a6":["1"]},"af":{"K":[]},"eu":{"M":["1"],"dB":["1"],"aa":["1"],"aa.T":"1"},"aW":{"be":["1"],"ad":["1"],"aj":["1"],"az":["1"],"ad.T":"1"},"ev":{"cg":["1"],"ay":["1"],"eQ":["1"],"az":["1"]},"et":{"ev":["1"],"cg":["1"],"ay":["1"],"eQ":["1"],"az":["1"]},"ew":{"a6":["1"]},"ac":{"ew":["1"],"a6":["1"]},"p":{"V":["1"]},"eh":{"aV":["1","2"]},"cw":{"cg":["1"],"ay":["1"],"eQ":["1"],"az":["1"]},"du":{"hi":["1"],"cw":["1"],"cg":["1"],"ay":["1"],"eQ":["1"],"az":["1"]},"dC":{"hy":["1"],"cw":["1"],"cg":["1"],"ay":["1"],"eQ":["1"],"az":["1"]},"M":{"dB":["1"],"aa":["1"],"aa.T":"1"},"be":{"ad":["1"],"aj":["1"],"az":["1"],"ad.T":"1"},"cx":{"ay":["1"]},"ad":{"aj":["1"],"az":["1"],"ad.T":"1"},"dB":{"aa":["1"]},"aJ":{"bf":["1"]},"cp":{"bf":["@"]},"hl":{"bf":["@"]},"dw":{"aj":["1"]},"eY":{"mo":[]},"hs":{"eY":[],"mo":[]},"ez":{"T":["1","2"],"d":["1","2"]},"eC":{"ez":["1","2"],"T":["1","2"],"d":["1","2"],"T.K":"1","T.V":"2"},"eA":{"q":["1"],"f":["1"],"f.E":"1"},"eB":{"S":["1"]},"eE":{"bz":["1"],"h0":["1"],"q":["1"],"f":["1"]},"eF":{"S":["1"]},"T":{"d":["1","2"]},"e2":{"pn":["1"],"W":["1"],"q":["1"],"f":["1"],"W.E":"1","f.E":"1"},"ct":{"S":["1"]},"bz":{"h0":["1"],"q":["1"],"f":["1"]},"eN":{"bz":["1"],"h0":["1"],"q":["1"],"f":["1"]},"ho":{"T":["b","@"],"d":["b","@"],"T.K":"b","T.V":"@"},"hp":{"W":["b"],"q":["b"],"f":["b"],"W.E":"b","f.E":"b"},"f7":{"bR":["t<a>","b"]},"f9":{"aQ":["t<a>","b"],"aV":["t<a>","b"]},"f8":{"aQ":["b","t<a>"],"aV":["b","t<a>"]},"aQ":{"aV":["1","2"]},"fk":{"bR":["b","t<a>"]},"e_":{"K":[]},"fw":{"K":[]},"fv":{"bR":["n?","b"]},"fy":{"aQ":["n?","b"],"aV":["n?","b"]},"fx":{"aQ":["b","n?"],"aV":["b","n?"]},"hd":{"bR":["b","t<a>"]},"he":{"aQ":["b","t<a>"],"aV":["b","t<a>"]},"el":{"aQ":["t<a>","b"],"aV":["t<a>","b"]},"aF":{"al":["aF"]},"x":{"ak":[],"al":["ak"]},"au":{"al":["au"]},"a":{"ak":[],"al":["ak"]},"t":{"q":["1"],"f":["1"]},"ak":{"al":["ak"]},"eb":{"cV":[]},"b":{"al":["b"],"iK":[]},"dO":{"K":[]},"ba":{"K":[]},"aE":{"K":[]},"dj":{"K":[]},"fo":{"K":[]},"ek":{"K":[]},"ha":{"K":[]},"ax":{"K":[]},"fh":{"K":[]},"fN":{"K":[]},"ef":{"K":[]},"hx":{"ai":[]},"aT":{"f":["a"],"f.E":"a"},"fW":{"S":["a"]},"ab":{"pA":[]},"eW":{"dt":[]},"ht":{"dt":[]},"hk":{"dt":[]},"bo":{"ay":["1"]},"ee":{"aV":["1","2"]},"bx":{"pz":[]},"fP":{"dm":[]},"fQ":{"dm":[]},"ff":{"dm":[]},"hC":{"m0":[]},"h7":{"oh":[]},"eq":{"iI":[]},"bp":{"k":[]},"bk":{"k":[]},"bK":{"k":[]},"bJ":{"k":[]},"d8":{"k":[]},"d9":{"k":[]},"cZ":{"k":[]},"d5":{"k":[]},"d6":{"k":[]},"dh":{"k":[]},"c8":{"k":[]},"d7":{"k":[]},"c4":{"k":[]},"cc":{"k":[]},"cd":{"k":[]},"ce":{"k":[]},"dc":{"k":[]},"dd":{"k":[]},"de":{"k":[]},"bP":{"k":[]},"bQ":{"k":[]},"cI":{"k":[]},"bO":{"k":[]},"bl":{"k":[]},"bm":{"k":[]},"di":{"k":[]},"dk":{"k":[]},"da":{"k":[]},"db":{"k":[]},"ca":{"k":[]},"cL":{"k":[]},"d1":{"k":[]},"d2":{"k":[]},"bV":{"k":[]},"cK":{"k":[]},"d_":{"k":[]},"d0":{"k":[]},"bU":{"k":[]},"cE":{"k":[]},"cX":{"k":[]},"cY":{"k":[]},"bG":{"k":[]},"dl":{"k":[]},"df":{"k":[]},"dg":{"k":[]},"cf":{"k":[]},"cM":{"k":[]},"d3":{"k":[]},"d4":{"k":[]},"bW":{"k":[]},"ds":{"k":[]},"ck":{"k":[]},"cl":{"k":[]},"dq":{"k":[]},"ci":{"k":[]},"dr":{"k":[]},"cj":{"k":[]},"c5":{"k":[]},"c7":{"k":[]},"c6":{"k":[]},"cF":{"k":[]},"bH":{"k":[]},"cN":{"k":[]},"bq":{"k":[]},"an":{"b7":[]},"bT":{"b7":[]},"fg":{"og":[]},"em":{"pF":[]},"er":{"pG":[]},"dW":{"l8":["1"]},"dy":{"ay":["1"]},"eg":{"l8":["1"]},"cq":{"aa":["1"],"aa.T":"1"},"ey":{"aj":["1"]},"bL":{"jA":[]},"dp":{"bd":[]},"cG":{"bd":[]},"cJ":{"bd":[]},"f3":{"pU":[],"l8":["@"]},"hE":{"pV":[],"bo":["@"],"ay":["@"],"bo.T":"@"},"ir":{"t":["a"],"q":["a"],"f":["a"]},"cm":{"t":["a"],"q":["a"],"f":["a"]},"jr":{"t":["a"],"q":["a"],"f":["a"]},"ip":{"t":["a"],"q":["a"],"f":["a"]},"jp":{"t":["a"],"q":["a"],"f":["a"]},"iq":{"t":["a"],"q":["a"],"f":["a"]},"jq":{"t":["a"],"q":["a"],"f":["a"]},"ih":{"t":["x"],"q":["x"],"f":["x"]},"ii":{"t":["x"],"q":["x"],"f":["x"]}}'))
A.qm(v.typeUniverse,JSON.parse('{"a8":1,"eh":2,"bf":1,"eN":1,"eg":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.aZ
return{a7:s("@<~>"),n:s("af"),bp:s("bk"),dK:s("bL"),dI:s("dP"),fd:s("kW"),dE:s("fa"),e8:s("al<@>"),b9:s("a6<f2>"),ev:s("a6<fi>"),dd:s("a6<fj>"),gE:s("a6<au>"),ak:s("a6<bq>"),bz:s("a6<fn>"),ds:s("a6<t<aG>>"),eB:s("a6<t<aI>>"),ef:s("a6<h_>"),fb:s("a6<h8>"),Q:s("b1<b>"),R:s("k"),w:s("k(a?,d<b,@>)"),dy:s("aF"),U:s("aG"),o:s("aR"),fu:s("au"),d:s("q<@>"),C:s("K"),h4:s("ih"),gN:s("ii"),Z:s("bY"),dQ:s("ip"),an:s("iq"),gj:s("ir"),e:s("f<@>"),hb:s("f<a>"),ek:s("A<a6<~>>"),O:s("A<B>"),g1:s("A<b6>"),s:s("A<b>"),eS:s("A<cm>"),fe:s("A<hr>"),b:s("A<@>"),t:s("A<a>"),c:s("A<n?>"),aP:s("a7<@>"),T:s("dY"),m:s("B"),g:s("b3"),aU:s("ap<@>"),eC:s("e2<a6<t<b6>>>"),df:s("t<b>"),j:s("t<@>"),L:s("t<a>"),eh:s("m0"),fK:s("bu<b,b>"),P:s("d<b,@>"),f:s("d<@,@>"),e9:s("cW"),bc:s("aq"),eX:s("b6"),a:s("O"),K:s("n"),dJ:s("iI"),r:s("b7"),ga:s("fT"),gT:s("ua"),bQ:s("+()"),ge:s("+completer,nodeId,targetPort(a6<h9>,b,a)"),cz:s("eb"),J:s("bx"),I:s("aT"),l:s("ai"),aG:s("h2<n?>"),V:s("cg<cm>"),a4:s("aj<k>"),bF:s("aj<b7>"),N:s("b"),dm:s("C"),x:s("aI"),A:s("ba"),h7:s("jp"),bv:s("jq"),go:s("jr"),p:s("cm"),bI:s("cn"),B:s("dt"),dN:s("jA"),E:s("bd"),gi:s("ac<bL>"),d8:s("ac<dU>"),bS:s("ac<a>"),h:s("ac<~>"),G:s("cq<B>"),cX:s("p<bL>"),gg:s("p<dU>"),_:s("p<@>"),fJ:s("p<a>"),D:s("p<~>"),hg:s("eC<n?,n?>"),fv:s("eP<n?>"),y:s("a5"),al:s("a5(n)"),i:s("x"),z:s("@"),fO:s("@()"),v:s("@(n)"),W:s("@(n,ai)"),S:s("a"),d1:s("a6<t<b6>>?"),eH:s("V<O>?"),bX:s("B?"),bM:s("t<@>?"),fF:s("d<@,@>?"),X:s("n?"),gO:s("ai?"),dk:s("b?"),aJ:s("bf<@>?"),F:s("aK<@,@>?"),br:s("hq?"),fQ:s("a5?"),cD:s("x?"),h6:s("a?"),cg:s("ak?"),Y:s("~()?"),bY:s("~(B)?"),d3:s("~(a5)?"),q:s("ak"),H:s("~"),M:s("~()"),u:s("~(n)"),k:s("~(n,ai)"),ec:s("~(b)"),cA:s("~(b,@)"),dA:s("~(a,a)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a1=J.fq.prototype
B.b=J.A.prototype
B.c=J.dX.prototype
B.f=J.cO.prototype
B.a=J.br.prototype
B.a2=J.b3.prototype
B.a3=J.dZ.prototype
B.am=A.e4.prototype
B.k=A.e8.prototype
B.C=J.fO.prototype
B.t=J.cn.prototype
B.G=new A.dN(0,"auth")
B.l=new A.dN(1,"transport")
B.u=new A.dN(5,"unknown")
B.H=new A.aD(B.l,"Not connected to a Hub.")
B.I=new A.aD(B.l,"Enter a Hub address.")
B.bi=new A.f9()
B.J=new A.f7()
B.K=new A.f8()
B.L=new A.ff()
B.v=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.M=function() {
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
B.R=function(getTagFallback) {
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
B.N=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.Q=function(hooks) {
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
B.P=function(hooks) {
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
B.O=function(hooks) {
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
B.w=function(hooks) { return hooks; }

B.x=new A.fv()
B.S=new A.fN()
B.T=new A.fP()
B.U=new A.fQ()
B.j=new A.iO()
B.bj=new A.iW()
B.V=new A.hd()
B.i=new A.he()
B.n=new A.hl()
B.d=new A.hs()
B.o=new A.hx()
B.m=new A.dT(1,0,"stdin")
B.W=new A.dT(2,1,"stdout")
B.X=new A.dT(3,2,"stderr")
B.y=new A.au(0)
B.Y=new A.au(2e5)
B.Z=new A.au(4e6)
B.a_=new A.au(8e4)
B.z=new A.fm(0,"none")
B.a0=new A.fm(1,"hubDefault")
B.a4=new A.fx(null)
B.a5=new A.fy(null)
B.a6=s([27],t.t)
B.a7=s([27,91,53,126],t.t)
B.a8=s([27,91,54,126],t.t)
B.a9=s([27,91,65],t.t)
B.aa=s([27,91,66],t.t)
B.ab=s([27,91,67],t.t)
B.ac=s([27,91,68],t.t)
B.ad=s([27,91,70],t.t)
B.ae=s([27,91,72],t.t)
B.af=s([9],t.t)
B.aD=new A.bg([!0,!1,!0,!0])
B.aC=new A.bg([!0,!1,!0,!1])
B.az=new A.bg([!1,!1,!0,!1])
B.aB=new A.bg([!1,!0,!0,!1])
B.aA=new A.bg([!1,!0,!1,!1])
B.q=s([B.aD,B.aC,B.az,B.aB,B.aA],A.aZ("A<+(a5,a5,a5,a5)>"))
B.ag=s(["A","B","C","D","F","L","Q","S","N","P","W","Z"],t.s)
B.aj=s([],A.aZ("A<aG>"))
B.ai=s([],A.aZ("A<aR>"))
B.h=s([],t.O)
B.r=s([],t.s)
B.ah=s([],A.aZ("A<aI>"))
B.ak=s([],t.b)
B.B={}
B.A=new A.bS(B.B,[],A.aZ("bS<b,b>"))
B.al=new A.bS(B.B,[],A.aZ("bS<b,@>"))
B.as=new A.aS("protocol_error","Control frame must be a JSON object")
B.at=new A.aS("protocol_error","Control frame missing 't'")
B.au=new A.aS("malformed_frame","Data frame shorter than header")
B.av=new A.aS("protocol_error","Node id cannot be empty")
B.aw=new A.aS("protocol_error","Session id cannot be empty")
B.ax=new A.aS("protocol_error","Principal id cannot be empty")
B.ay=new A.aS("protocol_error","Unsupported WebSocket frame type")
B.aE=new A.cb(0,"exec")
B.D=new A.cb(1,"shell")
B.aF=new A.cb(2,"transfer")
B.aG=new A.cb(3,"drive")
B.aH=new A.cb(4,"tunnel")
B.aI=new A.fZ("session_rejected","Session closed before opening")
B.aJ=new A.by(0,"opening")
B.aK=new A.by(1,"open")
B.aL=new A.by(2,"closing")
B.aM=new A.by(3,"closed")
B.aN=new A.by(4,"detached")
B.aO=new A.by(5,"attached")
B.an={sudo:0,env:1,command:2,exec:3,nohup:4,time:5,builtin:6}
B.aP=new A.b1(B.an,7,t.Q)
B.ao={"-u":0,"-g":1,"-p":2,"-h":3,"-C":4,"-D":5,"-R":6,"-T":7,"-U":8,"-r":9,"-t":10}
B.aQ=new A.b1(B.ao,11,t.Q)
B.ar={ls:0,ll:1,la:2,l:3,cat:4,bat:5,echo:6,printf:7,pwd:8,whoami:9,id:10,date:11,uptime:12,df:13,du:14,free:15,ps:16,which:17,type:18,env:19,printenv:20,head:21,tail:22,wc:23,stat:24,file:25,hostname:26,uname:27,clear:28}
B.aR=new A.b1(B.ar,29,t.Q)
B.aq={status:0,log:1,diff:2,show:3,branch:4,remote:5,config:6}
B.aS=new A.b1(B.aq,7,t.Q)
B.ap={"-C":0,"-c":1,"--git-dir":2,"--work-tree":3,"--namespace":4,"--exec-path":5}
B.aT=new A.b1(B.ap,6,t.Q)
B.E=new A.ed(0,"posix")
B.aU=new A.ed(1,"powershell")
B.aV=new A.ed(2,"cmd")
B.aW=new A.dn(null,null,null,null)
B.F=new A.bA(0,"auto")
B.aX=new A.bA(1,"smaller")
B.aY=new A.bA(2,"normal")
B.aZ=new A.bA(3,"larger")
B.b_=new A.ch("transport_error","Client is not connected")
B.b0=new A.ch("transport_error","Disconnected from Hub")
B.e=new A.ch("transport_error","Disconnected")
B.b1=A.aC("dP")
B.b2=A.aC("kW")
B.b3=A.aC("ih")
B.b4=A.aC("ii")
B.b5=A.aC("ip")
B.b6=A.aC("iq")
B.b7=A.aC("ir")
B.b8=A.aC("B")
B.b9=A.aC("n")
B.ba=A.aC("jp")
B.bb=A.aC("jq")
B.bc=A.aC("jr")
B.bd=A.aC("cm")
B.be=new A.el(!1)
B.bf=new A.el(!0)
B.p=new A.eK(0,"normal")
B.bg=new A.eK(1,"esc")
B.bh=new A.eK(2,"csi")})();(function staticFields(){$.k4=null
$.at=A.w([],A.aZ("A<n>"))
$.m4=null
$.lJ=null
$.lI=null
$.ng=null
$.n9=null
$.nk=null
$.kA=null
$.kJ=null
$.lt=null
$.k9=A.w([],A.aZ("A<t<n>?>"))
$.dE=null
$.eZ=null
$.f_=null
$.lo=!1
$.u=B.d})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"u2","nq",()=>A.ne("_$dart_dartClosure"))
s($,"u1","kR",()=>A.ne("_$dart_dartClosure_dartJSInterop"))
s($,"ur","nJ",()=>A.l1(0))
s($,"uA","nP",()=>B.d.dF(new A.kM(),A.aZ("V<~>")))
s($,"uw","nN",()=>A.w([new J.fr()],A.aZ("A<ec>")))
s($,"uc","nw",()=>A.bb(A.jo({
toString:function(){return"$receiver$"}})))
s($,"ud","nx",()=>A.bb(A.jo({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"ue","ny",()=>A.bb(A.jo(null)))
s($,"uf","nz",()=>A.bb(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"ui","nC",()=>A.bb(A.jo(void 0)))
s($,"uj","nD",()=>A.bb(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"uh","nB",()=>A.bb(A.mj(null)))
s($,"ug","nA",()=>A.bb(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"ul","nF",()=>A.bb(A.mj(void 0)))
s($,"uk","nE",()=>A.bb(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"uo","ly",()=>A.pX())
s($,"u5","dM",()=>$.nP())
s($,"uu","nM",()=>A.l1(4096))
s($,"us","nK",()=>new A.ki().$0())
s($,"ut","nL",()=>new A.kh().$0())
s($,"uq","lz",()=>A.oP(A.bC(A.w([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"up","nI",()=>A.l1(0))
s($,"u3","nr",()=>A.bw("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"uv","hP",()=>A.kN(B.b9))
s($,"u9","nv",()=>{var q=new A.k3(new DataView(new ArrayBuffer(A.qM(8))))
q.ea()
return q})
s($,"ux","nO",()=>A.bw("[|&;<>`]|\\$\\("))
s($,"u0","np",()=>A.bw("\\x1b\\[[0-?]*[ -/]*[@-~]|\\x1b\\][^\\x07\\x1b]*(?:\\x07|\\x1b\\\\)"))
s($,"u7","nt",()=>A.bw("^[A-Za-z0-9_.-]+$"))
s($,"u8","nu",()=>A.bw("^[A-Za-z0-9_-]+$"))
s($,"u4","ns",()=>A.z(["hello",A.rP(),"auth.request",A.rC(),"auth.ok",A.rB(),"auth.fail",A.rA(),"node.register",A.t4(),"node.registered",A.t5(),"node.capabilities",A.rU(),"node.heartbeat",A.t1(),"node.heartbeat.ack",A.t0(),"ping",A.tg(),"pong",A.th(),"node.list.request",A.t2(),"node.list.response",A.t3(),"session.open",A.tl(),"session.opened",A.tm(),"session.rejected",A.tn(),"node.session.open",A.t8(),"node.session.opened",A.t9(),"node.session.rejected",A.ta(),"channel.resize",A.rG(),"channel.signal",A.rH(),"channel.eof",A.rE(),"channel.exit",A.rF(),"channel.close",A.rD(),"channel.window",A.rI(),"error",A.ti(),"session.detach.request",A.tj(),"node.session.detach",A.t6(),"node.session.detached",A.t7(),"session.detached",A.tk(),"sessions.list.request",A.rL(),"node.sessions.list.request",A.rX(),"node.sessions.list.response",A.rY(),"sessions.list.response",A.rM(),"sessions.kill.request",A.rJ(),"node.sessions.kill.request",A.rV(),"node.sessions.kill.response",A.rW(),"sessions.kill.response",A.rK(),"sessions.detach.request",A.rw(),"node.sessions.detach.request",A.rT(),"node.sessions.detach.response",A.rS(),"sessions.detach.response",A.rx(),"sessions.screen.request",A.to(),"node.sessions.screen.request",A.tb(),"node.sessions.screen.response",A.tc(),"sessions.screen.response",A.tp(),"drive.credential.request",A.rN(),"node.drive.credential.request",A.rZ(),"node.drive.credential.response",A.t_(),"drive.credential.response",A.rO(),"tunnel.open.request",A.tu(),"tunnel.opened",A.tv(),"tunnel.rejected",A.tw(),"tunnel.close.request",A.tq(),"tunnel.close.response",A.tr(),"tunnel.list.request",A.ts(),"tunnel.list.response",A.tt(),"node.tunnel.connect",A.te(),"node.tunnel.connected",A.tf(),"node.tunnel.connect.failed",A.td(),"ai.config.request",A.ry(),"ai.config.response",A.rz(),"http.proxy.request",A.rQ(),"http.proxy.response",A.rR()],t.N,t.w))
r($,"un","nH",()=>new A.i5())
s($,"um","nG",()=>{var q,p=J.lU(256,t.N)
for(q=0;q<256;++q)p[q]=B.a.dA(B.c.dH(q,16),2,"0")
return p})
s($,"u_","no",()=>$.nv())})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({SharedArrayBuffer:A.bv,ArrayBuffer:A.cW,ArrayBufferView:A.e6,DataView:A.e4,Float32Array:A.fB,Float64Array:A.fC,Int16Array:A.fD,Int32Array:A.fE,Int8Array:A.fF,Uint16Array:A.fG,Uint32Array:A.fH,Uint8ClampedArray:A.e7,CanvasPixelArray:A.e7,Uint8Array:A.e8})
hunkHelpers.setOrUpdateLeafTags({SharedArrayBuffer:true,ArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.a8.$nativeSuperclassTag="ArrayBufferView"
A.eG.$nativeSuperclassTag="ArrayBufferView"
A.eH.$nativeSuperclassTag="ArrayBufferView"
A.e5.$nativeSuperclassTag="ArrayBufferView"
A.eI.$nativeSuperclassTag="ArrayBufferView"
A.eJ.$nativeSuperclassTag="ArrayBufferView"
A.aq.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$2$0=function(){return this()}
Function.prototype.$2$1=function(a){return this(a)}
Function.prototype.$1$0=function(){return this()}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.tP
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=main.dart.js.map
