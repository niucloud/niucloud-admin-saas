!function () {
	const e = document.createElement("link").relList;
	if (!(e && e.supports && e.supports("modulepreload"))) {
		for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
		new MutationObserver((e => {
			for (const n of e) if ("childList" === n.type) for (const e of n.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
		})).observe(document, {childList: !0, subtree: !0})
	}

	function t(e) {
		if (e.ep) return;
		e.ep = !0;
		const t = function (e) {
			const t = {};
			return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin", t
		}(e);
		fetch(e.href, t)
	}
}();
const e = {}, t = function (t, n, o) {
	if (!n || 0 === n.length) return t();
	const r = document.getElementsByTagName("link");
	return Promise.all(n.map((t => {
		if ((t = function (e) {
			return "/wap/" + e
		}(t)) in e) return;
		e[t] = !0;
		const n = t.endsWith(".css"), i = n ? '[rel="stylesheet"]' : "";
		if (!!o) for (let e = r.length - 1; e >= 0; e--) {
			const o = r[e];
			if (o.href === t && (!n || "stylesheet" === o.rel)) return
		} else if (document.querySelector(`link[href="${t}"]${i}`)) return;
		const a = document.createElement("link");
		return a.rel = n ? "stylesheet" : "modulepreload", n || (a.as = "script", a.crossOrigin = ""), a.href = t, document.head.appendChild(a), n ? new Promise(((e, n) => {
			a.addEventListener("load", e), a.addEventListener("error", (() => n(new Error(`Unable to preload CSS for ${t}`))))
		})) : void 0
	}))).then((() => t()))
}, n = Object.freeze(Object.defineProperty({
	__proto__: null,
	default: {
		"pages.index.index": "Index",
		"pages.article.list": "Information Center",
		"pages.article.detail": "Information detail",
		"pages.member.index": "My",
		"pages.auth.login": "Login",
		"pages.auth.register": "Register",
		"pages.auth.resetpwd": "Retrieve password",
		"pages.setting.index": "Settings",
		"pages.auth.bind": "Bind Mobile"
	}
}, Symbol.toStringTag, {value: "Module"})), o = Object.freeze(Object.defineProperty({
	__proto__: null,
	default: {
		"pages.index.index": "",
		"pages.index.close": "站点已关闭",
		"pages.index.nosite": "站点不存在",
		"pages.index.develop": "开发环境配置",
		"pages.index.diy": "",
		"pages.article.list": "资讯中心",
		"pages.article.detail": "文章详情",
		"pages.auth.agreement": "协议",
		"pages.auth.bind": "绑定手机号",
		"pages.auth.login": "登录",
		"pages.auth.register": "注册",
		"pages.auth.resetpwd": "找回密码",
		"pages.member.account": "会员账户",
		"pages.member.account_edit": "编辑会员账户",
		"pages.member.apply_cash_out": "申请提现",
		"pages.member.balance": "我的余额",
		"pages.member.cash_out": "提现记录",
		"pages.member.cash_out_detail": "提现详情",
		"pages.member.commission": "我的佣金",
		"pages.member.detailed_account": "流水明细",
		"pages.member.index": "",
		"pages.member.personal": "个人资料",
		"pages.member.recharge_record": "充值记录",
		"pages.member.recharge_record_detail": "充值详情",
		"pages.pay.browser": "支付",
		"pages.pay.result": "支付结果",
		"pages.setting.index": "设置",
		"pages.webview.index": ""
	}
}, Symbol.toStringTag, {value: "Module"}));

function r(e, t) {
	const n = Object.create(null), o = e.split(",");
	for (let r = 0; r < o.length; r++) n[o[r]] = !0;
	return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

function i(e) {
	if (C(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const o = e[n], r = I(o) ? c(o) : i(o);
			if (r) for (const e in r) t[e] = r[e]
		}
		return t
	}
	return I(e) || F(e) ? e : void 0
}

const a = /;(?![^(]*\))/g, s = /:([^]+)/, l = /\/\*.*?\*\//gs;

function c(e) {
	const t = {};
	return e.replace(l, "").split(a).forEach((e => {
		if (e) {
			const n = e.split(s);
			n.length > 1 && (t[n[0].trim()] = n[1].trim())
		}
	})), t
}

function u(e) {
	let t = "";
	if (I(e)) t = e; else if (C(e)) for (let n = 0; n < e.length; n++) {
		const o = u(e[n]);
		o && (t += o + " ")
	} else if (F(e)) for (const n in e) e[n] && (t += n + " ");
	return t.trim()
}

const d = r("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function p(e) {
	return !!e || "" === e
}

function f(e, t) {
	if (e === t) return !0;
	let n = L(e), o = L(t);
	if (n || o) return !(!n || !o) && e.getTime() === t.getTime();
	if (n = M(e), o = M(t), n || o) return e === t;
	if (n = C(e), o = C(t), n || o) return !(!n || !o) && function (e, t) {
		if (e.length !== t.length) return !1;
		let n = !0;
		for (let o = 0; n && o < e.length; o++) n = f(e[o], t[o]);
		return n
	}(e, t);
	if (n = F(e), o = F(t), n || o) {
		if (!n || !o) return !1;
		if (Object.keys(e).length !== Object.keys(t).length) return !1;
		for (const n in e) {
			const o = e.hasOwnProperty(n), r = t.hasOwnProperty(n);
			if (o && !r || !o && r || !f(e[n], t[n])) return !1
		}
	}
	return String(e) === String(t)
}

function h(e, t) {
	return e.findIndex((e => f(e, t)))
}

const m = e => I(e) ? e : null == e ? "" : C(e) || F(e) && (e.toString === R || !O(e.toString)) ? JSON.stringify(e, g, 2) : String(e),
	g = (e, t) => t && t.__v_isRef ? g(e, t.value) : B(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})} : P(t) ? {[`Set(${t.size})`]: [...t.values()]} : !F(t) || C(t) || D(t) ? t : String(t),
	v = {}, b = [], y = () => {
	}, _ = () => !1, w = /^on[^a-z]/, x = e => w.test(e), T = e => e.startsWith("onUpdate:"), S = Object.assign,
	E = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1)
	}, k = Object.prototype.hasOwnProperty, A = (e, t) => k.call(e, t), C = Array.isArray,
	B = e => "[object Map]" === N(e), P = e => "[object Set]" === N(e), L = e => "[object Date]" === N(e),
	O = e => "function" == typeof e, I = e => "string" == typeof e, M = e => "symbol" == typeof e,
	F = e => null !== e && "object" == typeof e, j = e => F(e) && O(e.then) && O(e.catch),
	R = Object.prototype.toString, N = e => R.call(e), D = e => "[object Object]" === N(e),
	z = e => I(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
	H = r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
	q = e => {
		const t = Object.create(null);
		return n => t[n] || (t[n] = e(n))
	}, V = /-(\w)/g, W = q((e => e.replace(V, ((e, t) => t ? t.toUpperCase() : "")))), $ = /\B([A-Z])/g,
	Q = q((e => e.replace($, "-$1").toLowerCase())), U = q((e => e.charAt(0).toUpperCase() + e.slice(1))),
	X = q((e => e ? `on${U(e)}` : "")), Y = (e, t) => !Object.is(e, t), J = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t)
	}, G = (e, t, n) => {
		Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
	}, K = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t
	};
let Z;
const ee = ["ad", "ad-content-page", "ad-draw", "audio", "button", "camera", "canvas", "checkbox", "checkbox-group", "cover-image", "cover-view", "editor", "form", "functional-page-navigator", "icon", "image", "input", "label", "live-player", "live-pusher", "map", "movable-area", "movable-view", "navigator", "official-account", "open-data", "picker", "picker-view", "picker-view-column", "progress", "radio", "radio-group", "rich-text", "scroll-view", "slider", "swiper", "swiper-item", "switch", "text", "textarea", "video", "view", "web-view"].map((e => "uni-" + e));
const te = ["%", "%"], ne = /^([a-z-]+:)?\/\//i, oe = /^data:.*,.*/;

function re(e) {
	return e && (e.appContext ? e.proxy : e)
}

function ie(e) {
	if (!e) return;
	let t = e.type.name;
	for (; t && (n = Q(t), -1 !== ee.indexOf("uni-" + n.replace("v-uni-", "")));) t = (e = e.parent).type.name;
	var n;
	return e.proxy
}

function ae(e) {
	return 1 === e.nodeType
}

function se(e) {
	return 0 === e.indexOf("/")
}

function le(e) {
	return se(e) ? e : "/" + e
}

function ce(e) {
	return se(e) ? e.slice(1) : e
}

function ue(e, t) {
	for (const n in t) e.style[n] = t[n]
}

function de(e, t = null) {
	let n;
	return (...o) => (e && (n = e.apply(t, o), e = null), n)
}

function pe(e) {
	return W(e.substring(5))
}

const fe = de((() => {
	const e = HTMLElement.prototype, t = e.setAttribute;
	e.setAttribute = function (e, n) {
		if (e.startsWith("data-") && this.tagName.startsWith("UNI-")) {
			(this.__uniDataset || (this.__uniDataset = {}))[pe(e)] = n
		}
		t.call(this, e, n)
	};
	const n = e.removeAttribute;
	e.removeAttribute = function (e) {
		this.__uniDataset && e.startsWith("data-") && this.tagName.startsWith("UNI-") && delete this.__uniDataset[pe(e)], n.call(this, e)
	}
}));

function he(e) {
	return S({}, e.dataset, e.__uniDataset)
}

const me = new RegExp("\"[^\"]+\"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px", "g");

function ge(e) {
	return {passive: e}
}

function ve(e) {
	const {id: t, offsetTop: n, offsetLeft: o} = e;
	return {id: t, dataset: he(e), offsetTop: n, offsetLeft: o}
}

function be(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {
	}
	return "" + e
}

function ye(e = {}) {
	const t = {};
	return Object.keys(e).forEach((n => {
		try {
			t[n] = be(e[n])
		} catch (o) {
			t[n] = e[n]
		}
	})), t
}

const _e = /\+/g;

function we(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e).split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(_e, " ");
		let r = e.indexOf("="), i = be(r < 0 ? e : e.slice(0, r)), a = r < 0 ? null : be(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			C(e) || (e = t[i] = [e]), e.push(a)
		} else t[i] = a
	}
	return t
}

function xe(e, t, {clearTimeout: n, setTimeout: o}) {
	let r;
	const i = function () {
		n(r);
		const i = () => e.apply(this, arguments);
		r = o(i, t)
	};
	return i.cancel = function () {
		n(r)
	}, i
}

class Te {
	constructor(e, t) {
		this.id = e, this.listener = {}, this.emitCache = [], t && Object.keys(t).forEach((e => {
			this.on(e, t[e])
		}))
	}

	emit(e, ...t) {
		const n = this.listener[e];
		if (!n) return this.emitCache.push({eventName: e, args: t});
		n.forEach((e => {
			e.fn.apply(e.fn, t)
		})), this.listener[e] = n.filter((e => "once" !== e.type))
	}

	on(e, t) {
		this._addListener(e, "on", t), this._clearCache(e)
	}

	once(e, t) {
		this._addListener(e, "once", t), this._clearCache(e)
	}

	off(e, t) {
		const n = this.listener[e];
		if (n) if (t) for (let o = 0; o < n.length;) n[o].fn === t && (n.splice(o, 1), o--), o++; else delete this.listener[e]
	}

	_clearCache(e) {
		for (let t = 0; t < this.emitCache.length; t++) {
			const n = this.emitCache[t], o = e ? n.eventName === e ? e : null : n.eventName;
			if (!o) continue;
			"number" != typeof this.emit.apply(this, [o, ...n.args]) ? (this.emitCache.splice(t, 1), t--) : this.emitCache.pop()
		}
	}

	_addListener(e, t, n) {
		(this.listener[e] || (this.listener[e] = [])).push({fn: n, type: t})
	}
}

const Se = ["onInit", "onLoad", "onShow", "onHide", "onUnload", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onShareAppMessage", "onAddToFavorites", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"],
	Ee = ["onLoad", "onShow"];
const ke = ["onShow", "onHide", "onLaunch", "onError", "onThemeChange", "onPageNotFound", "onUnhandledRejection", "onInit", "onLoad", "onReady", "onUnload", "onResize", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onAddToFavorites", "onShareAppMessage", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"];
const Ae = [];
const Ce = de(((e, t) => {
	if (O(e._component.onError)) return t(e)
})), Be = function () {
};
Be.prototype = {
	on: function (e, t, n) {
		var o = this.e || (this.e = {});
		return (o[e] || (o[e] = [])).push({fn: t, ctx: n}), this
	}, once: function (e, t, n) {
		var o = this;

		function r() {
			o.off(e, r), t.apply(n, arguments)
		}

		return r._ = t, this.on(e, r, n)
	}, emit: function (e) {
		for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), o = 0, r = n.length; o < r; o++) n[o].fn.apply(n[o].ctx, t);
		return this
	}, off: function (e, t) {
		var n = this.e || (this.e = {}), o = n[e], r = [];
		if (o && t) for (var i = 0, a = o.length; i < a; i++) o[i].fn !== t && o[i].fn._ !== t && r.push(o[i]);
		return r.length ? n[e] = r : delete n[e], this
	}
};
var Pe = Be;
const Le = {black: "rgba(0,0,0,0.4)", white: "rgba(255,255,255,0.4)"};

function Oe(e, t = {}, n = "light") {
	const o = t[n], r = {};
	return o ? (Object.keys(e).forEach((i => {
		let a = e[i];
		r[i] = (() => {
			if (D(a)) return Oe(a, t, n);
			if (C(a)) return a.map((e => D(e) ? Oe(e, t, n) : e));
			if (I(a) && a.startsWith("@")) {
				const t = a.replace("@", "");
				let n = o[t] || a;
				switch (i) {
					case"titleColor":
						n = "black" === n ? "#000000" : "#ffffff";
						break;
					case"borderStyle":
						n = (e = n) && e in Le ? Le[e] : e
				}
				return n
			}
			var e;
			return a
		})()
	})), r) : e
}

let Ie;

class Me {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ie, !e && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1)
	}

	get active() {
		return this._active
	}

	run(e) {
		if (this._active) {
			const t = Ie;
			try {
				return Ie = this, e()
			} finally {
				Ie = t
			}
		}
	}

	on() {
		Ie = this
	}

	off() {
		Ie = this.parent
	}

	stop(e) {
		if (this._active) {
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
			if (!this.detached && this.parent && !e) {
				const e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
			}
			this.parent = void 0, this._active = !1
		}
	}
}

function Fe(e) {
	return new Me(e)
}

function je() {
	return Ie
}

const Re = e => {
	const t = new Set(e);
	return t.w = 0, t.n = 0, t
}, Ne = e => (e.w & qe) > 0, De = e => (e.n & qe) > 0, ze = new WeakMap;
let He = 0, qe = 1;
let Ve;
const We = Symbol(""), $e = Symbol("");

class Qe {
	constructor(e, t = null, n) {
		this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, function (e, t = Ie) {
			t && t.active && t.effects.push(e)
		}(this, n)
	}

	run() {
		if (!this.active) return this.fn();
		let e = Ve, t = Xe;
		for (; e;) {
			if (e === this) return;
			e = e.parent
		}
		try {
			return this.parent = Ve, Ve = this, Xe = !0, qe = 1 << ++He, He <= 30 ? (({deps: e}) => {
				if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= qe
			})(this) : Ue(this), this.fn()
		} finally {
			He <= 30 && (e => {
				const {deps: t} = e;
				if (t.length) {
					let n = 0;
					for (let o = 0; o < t.length; o++) {
						const r = t[o];
						Ne(r) && !De(r) ? r.delete(e) : t[n++] = r, r.w &= ~qe, r.n &= ~qe
					}
					t.length = n
				}
			})(this), qe = 1 << --He, Ve = this.parent, Xe = t, this.parent = void 0, this.deferStop && this.stop()
		}
	}

	stop() {
		Ve === this ? this.deferStop = !0 : this.active && (Ue(this), this.onStop && this.onStop(), this.active = !1)
	}
}

function Ue(e) {
	const {deps: t} = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0
	}
}

let Xe = !0;
const Ye = [];

function Je() {
	Ye.push(Xe), Xe = !1
}

function Ge() {
	const e = Ye.pop();
	Xe = void 0 === e || e
}

function Ke(e, t, n) {
	if (Xe && Ve) {
		let t = ze.get(e);
		t || ze.set(e, t = new Map);
		let o = t.get(n);
		o || t.set(n, o = Re()), Ze(o)
	}
}

function Ze(e, t) {
	let n = !1;
	He <= 30 ? De(e) || (e.n |= qe, n = !Ne(e)) : n = !e.has(Ve), n && (e.add(Ve), Ve.deps.push(e))
}

function et(e, t, n, o, r, i) {
	const a = ze.get(e);
	if (!a) return;
	let s = [];
	if ("clear" === t) s = [...a.values()]; else if ("length" === n && C(e)) {
		const e = Number(o);
		a.forEach(((t, n) => {
			("length" === n || n >= e) && s.push(t)
		}))
	} else switch (void 0 !== n && s.push(a.get(n)), t) {
		case"add":
			C(e) ? z(n) && s.push(a.get("length")) : (s.push(a.get(We)), B(e) && s.push(a.get($e)));
			break;
		case"delete":
			C(e) || (s.push(a.get(We)), B(e) && s.push(a.get($e)));
			break;
		case"set":
			B(e) && s.push(a.get(We))
	}
	if (1 === s.length) s[0] && tt(s[0]); else {
		const e = [];
		for (const t of s) t && e.push(...t);
		tt(Re(e))
	}
}

function tt(e, t) {
	const n = C(e) ? e : [...e];
	for (const o of n) o.computed && nt(o);
	for (const o of n) o.computed || nt(o)
}

function nt(e, t) {
	(e !== Ve || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

const ot = r("__proto__,__v_isRef,__isVue"),
	rt = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(M)),
	it = dt(), at = dt(!1, !0), st = dt(!0), lt = ct();

function ct() {
	const e = {};
	return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
		e[t] = function (...e) {
			const n = Yt(this);
			for (let t = 0, r = this.length; t < r; t++) Ke(n, 0, t + "");
			const o = n[t](...e);
			return -1 === o || !1 === o ? n[t](...e.map(Yt)) : o
		}
	})), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
		e[t] = function (...e) {
			Je();
			const n = Yt(this)[t].apply(this, e);
			return Ge(), n
		}
	})), e
}

function ut(e) {
	const t = Yt(this);
	return Ke(t, 0, e), t.hasOwnProperty(e)
}

function dt(e = !1, t = !1) {
	return function (n, o, r) {
		if ("__v_isReactive" === o) return !e;
		if ("__v_isReadonly" === o) return e;
		if ("__v_isShallow" === o) return t;
		if ("__v_raw" === o && r === (e ? t ? zt : Dt : t ? Nt : Rt).get(n)) return n;
		const i = C(n);
		if (!e) {
			if (i && A(lt, o)) return Reflect.get(lt, o, r);
			if ("hasOwnProperty" === o) return ut
		}
		const a = Reflect.get(n, o, r);
		return (M(o) ? rt.has(o) : ot(o)) ? a : (e || Ke(n, 0, o), t ? a : tn(a) ? i && z(o) ? a : a.value : F(a) ? e ? Vt(a) : qt(a) : a)
	}
}

function pt(e = !1) {
	return function (t, n, o, r) {
		let i = t[n];
		if (Qt(i) && tn(i) && !tn(o)) return !1;
		if (!e && (Ut(o) || Qt(o) || (i = Yt(i), o = Yt(o)), !C(t) && tn(i) && !tn(o))) return i.value = o, !0;
		const a = C(t) && z(n) ? Number(n) < t.length : A(t, n), s = Reflect.set(t, n, o, r);
		return t === Yt(r) && (a ? Y(o, i) && et(t, "set", n, o) : et(t, "add", n, o)), s
	}
}

const ft = {
		get: it, set: pt(), deleteProperty: function (e, t) {
			const n = A(e, t);
			e[t];
			const o = Reflect.deleteProperty(e, t);
			return o && n && et(e, "delete", t, void 0), o
		}, has: function (e, t) {
			const n = Reflect.has(e, t);
			return M(t) && rt.has(t) || Ke(e, 0, t), n
		}, ownKeys: function (e) {
			return Ke(e, 0, C(e) ? "length" : We), Reflect.ownKeys(e)
		}
	}, ht = {get: st, set: (e, t) => !0, deleteProperty: (e, t) => !0}, mt = S({}, ft, {get: at, set: pt(!0)}), gt = e => e,
	vt = e => Reflect.getPrototypeOf(e);

function bt(e, t, n = !1, o = !1) {
	const r = Yt(e = e.__v_raw), i = Yt(t);
	n || (t !== i && Ke(r, 0, t), Ke(r, 0, i));
	const {has: a} = vt(r), s = o ? gt : n ? Kt : Gt;
	return a.call(r, t) ? s(e.get(t)) : a.call(r, i) ? s(e.get(i)) : void (e !== r && e.get(t))
}

function yt(e, t = !1) {
	const n = this.__v_raw, o = Yt(n), r = Yt(e);
	return t || (e !== r && Ke(o, 0, e), Ke(o, 0, r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function _t(e, t = !1) {
	return e = e.__v_raw, !t && Ke(Yt(e), 0, We), Reflect.get(e, "size", e)
}

function wt(e) {
	e = Yt(e);
	const t = Yt(this);
	return vt(t).has.call(t, e) || (t.add(e), et(t, "add", e, e)), this
}

function xt(e, t) {
	t = Yt(t);
	const n = Yt(this), {has: o, get: r} = vt(n);
	let i = o.call(n, e);
	i || (e = Yt(e), i = o.call(n, e));
	const a = r.call(n, e);
	return n.set(e, t), i ? Y(t, a) && et(n, "set", e, t) : et(n, "add", e, t), this
}

function Tt(e) {
	const t = Yt(this), {has: n, get: o} = vt(t);
	let r = n.call(t, e);
	r || (e = Yt(e), r = n.call(t, e)), o && o.call(t, e);
	const i = t.delete(e);
	return r && et(t, "delete", e, void 0), i
}

function St() {
	const e = Yt(this), t = 0 !== e.size, n = e.clear();
	return t && et(e, "clear", void 0, void 0), n
}

function Et(e, t) {
	return function (n, o) {
		const r = this, i = r.__v_raw, a = Yt(i), s = t ? gt : e ? Kt : Gt;
		return !e && Ke(a, 0, We), i.forEach(((e, t) => n.call(o, s(e), s(t), r)))
	}
}

function kt(e, t, n) {
	return function (...o) {
		const r = this.__v_raw, i = Yt(r), a = B(i), s = "entries" === e || e === Symbol.iterator && a,
			l = "keys" === e && a, c = r[e](...o), u = n ? gt : t ? Kt : Gt;
		return !t && Ke(i, 0, l ? $e : We), {
			next() {
				const {value: e, done: t} = c.next();
				return t ? {value: e, done: t} : {value: s ? [u(e[0]), u(e[1])] : u(e), done: t}
			}, [Symbol.iterator]() {
				return this
			}
		}
	}
}

function At(e) {
	return function (...t) {
		return "delete" !== e && this
	}
}

function Ct() {
	const e = {
		get(e) {
			return bt(this, e)
		}, get size() {
			return _t(this)
		}, has: yt, add: wt, set: xt, delete: Tt, clear: St, forEach: Et(!1, !1)
	}, t = {
		get(e) {
			return bt(this, e, !1, !0)
		}, get size() {
			return _t(this)
		}, has: yt, add: wt, set: xt, delete: Tt, clear: St, forEach: Et(!1, !0)
	}, n = {
		get(e) {
			return bt(this, e, !0)
		}, get size() {
			return _t(this, !0)
		}, has(e) {
			return yt.call(this, e, !0)
		}, add: At("add"), set: At("set"), delete: At("delete"), clear: At("clear"), forEach: Et(!0, !1)
	}, o = {
		get(e) {
			return bt(this, e, !0, !0)
		}, get size() {
			return _t(this, !0)
		}, has(e) {
			return yt.call(this, e, !0)
		}, add: At("add"), set: At("set"), delete: At("delete"), clear: At("clear"), forEach: Et(!0, !0)
	};
	return ["keys", "values", "entries", Symbol.iterator].forEach((r => {
		e[r] = kt(r, !1, !1), n[r] = kt(r, !0, !1), t[r] = kt(r, !1, !0), o[r] = kt(r, !0, !0)
	})), [e, n, t, o]
}

const [Bt, Pt, Lt, Ot] = Ct();

function It(e, t) {
	const n = t ? e ? Ot : Lt : e ? Pt : Bt;
	return (t, o, r) => "__v_isReactive" === o ? !e : "__v_isReadonly" === o ? e : "__v_raw" === o ? t : Reflect.get(A(n, o) && o in t ? n : t, o, r)
}

const Mt = {get: It(!1, !1)}, Ft = {get: It(!1, !0)}, jt = {get: It(!0, !1)}, Rt = new WeakMap, Nt = new WeakMap,
	Dt = new WeakMap, zt = new WeakMap;

function Ht(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : function (e) {
		switch (e) {
			case"Object":
			case"Array":
				return 1;
			case"Map":
			case"Set":
			case"WeakMap":
			case"WeakSet":
				return 2;
			default:
				return 0
		}
	}((e => N(e).slice(8, -1))(e))
}

function qt(e) {
	return Qt(e) ? e : Wt(e, !1, ft, Mt, Rt)
}

function Vt(e) {
	return Wt(e, !0, ht, jt, Dt)
}

function Wt(e, t, n, o, r) {
	if (!F(e)) return e;
	if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
	const i = r.get(e);
	if (i) return i;
	const a = Ht(e);
	if (0 === a) return e;
	const s = new Proxy(e, 2 === a ? o : n);
	return r.set(e, s), s
}

function $t(e) {
	return Qt(e) ? $t(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function Qt(e) {
	return !(!e || !e.__v_isReadonly)
}

function Ut(e) {
	return !(!e || !e.__v_isShallow)
}

function Xt(e) {
	return $t(e) || Qt(e)
}

function Yt(e) {
	const t = e && e.__v_raw;
	return t ? Yt(t) : e
}

function Jt(e) {
	return G(e, "__v_skip", !0), e
}

const Gt = e => F(e) ? qt(e) : e, Kt = e => F(e) ? Vt(e) : e;

function Zt(e) {
	Xe && Ve && Ze((e = Yt(e)).dep || (e.dep = Re()))
}

function en(e, t) {
	const n = (e = Yt(e)).dep;
	n && tt(n)
}

function tn(e) {
	return !(!e || !0 !== e.__v_isRef)
}

function nn(e) {
	return rn(e, !1)
}

function on(e) {
	return rn(e, !0)
}

function rn(e, t) {
	return tn(e) ? e : new an(e, t)
}

class an {
	constructor(e, t) {
		this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Yt(e), this._value = t ? e : Gt(e)
	}

	get value() {
		return Zt(this), this._value
	}

	set value(e) {
		const t = this.__v_isShallow || Ut(e) || Qt(e);
		e = t ? e : Yt(e), Y(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : Gt(e), en(this))
	}
}

function sn(e) {
	return tn(e) ? e.value : e
}

const ln = {
	get: (e, t, n) => sn(Reflect.get(e, t, n)), set: (e, t, n, o) => {
		const r = e[t];
		return tn(r) && !tn(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o)
	}
};

function cn(e) {
	return $t(e) ? e : new Proxy(e, ln)
}

class un {
	constructor(e, t, n) {
		this._object = e, this._key = t, this._defaultValue = n, this.__v_isRef = !0
	}

	get value() {
		const e = this._object[this._key];
		return void 0 === e ? this._defaultValue : e
	}

	set value(e) {
		this._object[this._key] = e
	}

	get dep() {
		return e = Yt(this._object), t = this._key, null === (n = ze.get(e)) || void 0 === n ? void 0 : n.get(t);
		var e, t, n
	}
}

function dn(e, t, n) {
	const o = e[t];
	return tn(o) ? o : new un(e, t, n)
}

var pn;

class fn {
	constructor(e, t, n, o) {
		this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[pn] = !1, this._dirty = !0, this.effect = new Qe(e, (() => {
			this._dirty || (this._dirty = !0, en(this))
		})), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n
	}

	get value() {
		const e = Yt(this);
		return Zt(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
	}

	set value(e) {
		this._setter(e)
	}
}

function hn(e, t, n, o) {
	let r;
	try {
		r = o ? e(...o) : e()
	} catch (i) {
		gn(i, t, n)
	}
	return r
}

function mn(e, t, n, o) {
	if (O(e)) {
		const r = hn(e, t, n, o);
		return r && j(r) && r.catch((e => {
			gn(e, t, n)
		})), r
	}
	const r = [];
	for (let i = 0; i < e.length; i++) r.push(mn(e[i], t, n, o));
	return r
}

function gn(e, t, n, o = !0) {
	t && t.vnode;
	if (t) {
		let o = t.parent;
		const r = t.proxy, i = n;
		for (; o;) {
			const t = o.ec;
			if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, i)) return;
			o = o.parent
		}
		const a = t.appContext.config.errorHandler;
		if (a) return void hn(a, null, 10, [e, r, i])
	}
	!function (e, t, n, o = !0) {
		console.error(e)
	}(e, 0, 0, o)
}

pn = "__v_isReadonly";
let vn = !1, bn = !1;
const yn = [];
let _n = 0;
const wn = [];
let xn = null, Tn = 0;
const Sn = Promise.resolve();
let En = null;

function kn(e) {
	const t = En || Sn;
	return e ? t.then(this ? e.bind(this) : e) : t
}

function An(e) {
	yn.length && yn.includes(e, vn && e.allowRecurse ? _n + 1 : _n) || (null == e.id ? yn.push(e) : yn.splice(function (e) {
		let t = _n + 1, n = yn.length;
		for (; t < n;) {
			const o = t + n >>> 1;
			Ln(yn[o]) < e ? t = o + 1 : n = o
		}
		return t
	}(e.id), 0, e), Cn())
}

function Cn() {
	vn || bn || (bn = !0, En = Sn.then(In))
}

function Bn(e, t = (vn ? _n + 1 : 0)) {
	for (; t < yn.length; t++) {
		const e = yn[t];
		e && e.pre && (yn.splice(t, 1), t--, e())
	}
}

function Pn(e) {
	if (wn.length) {
		const e = [...new Set(wn)];
		if (wn.length = 0, xn) return void xn.push(...e);
		for (xn = e, xn.sort(((e, t) => Ln(e) - Ln(t))), Tn = 0; Tn < xn.length; Tn++) xn[Tn]();
		xn = null, Tn = 0
	}
}

const Ln = e => null == e.id ? 1 / 0 : e.id, On = (e, t) => {
	const n = Ln(e) - Ln(t);
	if (0 === n) {
		if (e.pre && !t.pre) return -1;
		if (t.pre && !e.pre) return 1
	}
	return n
};

function In(e) {
	bn = !1, vn = !0, yn.sort(On);
	try {
		for (_n = 0; _n < yn.length; _n++) {
			const e = yn[_n];
			e && !1 !== e.active && hn(e, null, 14)
		}
	} finally {
		_n = 0, yn.length = 0, Pn(), vn = !1, En = null, (yn.length || wn.length) && In()
	}
}

function Mn(e, t, ...n) {
	if (e.isUnmounted) return;
	const o = e.vnode.props || v;
	let r = n;
	const i = t.startsWith("update:"), a = i && t.slice(7);
	if (a && a in o) {
		const e = `${"modelValue" === a ? "model" : a}Modifiers`, {number: t, trim: i} = o[e] || v;
		i && (r = n.map((e => I(e) ? e.trim() : e))), t && (r = n.map(K))
	}
	let s, l = o[s = X(t)] || o[s = X(W(t))];
	!l && i && (l = o[s = X(Q(t))]), l && mn(l, e, 6, Fn(e, l, r));
	const c = o[s + "Once"];
	if (c) {
		if (e.emitted) {
			if (e.emitted[s]) return
		} else e.emitted = {};
		e.emitted[s] = !0, mn(c, e, 6, Fn(e, c, r))
	}
}

function Fn(e, t, n) {
	if (1 !== n.length) return n;
	if (O(t)) {
		if (t.length < 2) return n
	} else if (!t.find((e => e.length >= 2))) return n;
	const o = n[0];
	if (o && A(o, "type") && A(o, "timeStamp") && A(o, "target") && A(o, "currentTarget") && A(o, "detail")) {
		const t = e.proxy, o = t.$gcd(t, !0);
		o && n.push(o)
	}
	return n
}

function jn(e, t, n = !1) {
	const o = t.emitsCache, r = o.get(e);
	if (void 0 !== r) return r;
	const i = e.emits;
	let a = {}, s = !1;
	if (!O(e)) {
		const o = e => {
			const n = jn(e, t, !0);
			n && (s = !0, S(a, n))
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	return i || s ? (C(i) ? i.forEach((e => a[e] = null)) : S(a, i), F(e) && o.set(e, a), a) : (F(e) && o.set(e, null), null)
}

function Rn(e, t) {
	return !(!e || !x(t)) && (t = t.slice(2).replace(/Once$/, ""), A(e, t[0].toLowerCase() + t.slice(1)) || A(e, Q(t)) || A(e, t))
}

let Nn = null, Dn = null;

function zn(e) {
	const t = Nn;
	return Nn = e, Dn = e && e.type.__scopeId || null, t
}

function Hn(e, t = Nn, n) {
	if (!t) return e;
	if (e._n) return e;
	const o = (...n) => {
		o._d && qr(-1);
		const r = zn(t);
		let i;
		try {
			i = e(...n)
		} finally {
			zn(r), o._d && qr(1)
		}
		return i
	};
	return o._n = !0, o._c = !0, o._d = !0, o
}

function qn(e) {
	const {type: t, vnode: n, proxy: o, withProxy: r, props: i, propsOptions: [a], slots: s, attrs: l, emit: c, render: u, renderCache: d, data: p, setupState: f, ctx: h, inheritAttrs: m} = e;
	let g, v;
	const b = zn(e);
	try {
		if (4 & n.shapeFlag) {
			const e = r || o;
			g = ni(u.call(e, e, d, i, f, p, h)), v = l
		} else {
			const e = t;
			0, g = ni(e.length > 1 ? e(i, {attrs: l, slots: s, emit: c}) : e(i, null)), v = t.props ? l : Vn(l)
		}
	} catch (_) {
		Nr.length = 0, gn(_, e, 1), g = Kr(jr)
	}
	let y = g;
	if (v && !1 !== m) {
		const e = Object.keys(v), {shapeFlag: t} = y;
		e.length && 7 & t && (a && e.some(T) && (v = Wn(v, a)), y = Zr(y, v))
	}
	return n.dirs && (y = Zr(y), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && (y.transition = n.transition), g = y, zn(b), g
}

const Vn = e => {
	let t;
	for (const n in e) ("class" === n || "style" === n || x(n)) && ((t || (t = {}))[n] = e[n]);
	return t
}, Wn = (e, t) => {
	const n = {};
	for (const o in e) T(o) && o.slice(9) in t || (n[o] = e[o]);
	return n
};

function $n(e, t, n) {
	const o = Object.keys(t);
	if (o.length !== Object.keys(e).length) return !0;
	for (let r = 0; r < o.length; r++) {
		const i = o[r];
		if (t[i] !== e[i] && !Rn(n, i)) return !0
	}
	return !1
}

const Qn = e => e.__isSuspense;

function Un(e, t) {
	if (ci) {
		let n = ci.provides;
		const o = ci.parent && ci.parent.provides;
		o === n && (n = ci.provides = Object.create(o)), n[e] = t, "app" === ci.type.mpType && ci.appContext.app.provide(e, t)
	} else ;
}

function Xn(e, t, n = !1) {
	const o = ci || Nn;
	if (o) {
		const r = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return n && O(t) ? t.call(o.proxy) : t
	}
}

function Yn(e, t) {
	return Kn(e, null, t)
}

const Jn = {};

function Gn(e, t, n) {
	return Kn(e, t, n)
}

function Kn(e, t, {immediate: n, deep: o, flush: r, onTrack: i, onTrigger: a} = v) {
	const s = je() === (null == ci ? void 0 : ci.scope) ? ci : null;
	let l, c, u = !1, d = !1;
	if (tn(e) ? (l = () => e.value, u = Ut(e)) : $t(e) ? (l = () => e, o = !0) : C(e) ? (d = !0, u = e.some((e => $t(e) || Ut(e))), l = () => e.map((e => tn(e) ? e.value : $t(e) ? to(e) : O(e) ? hn(e, s, 2) : void 0))) : l = O(e) ? t ? () => hn(e, s, 2) : () => {
		if (!s || !s.isUnmounted) return c && c(), mn(e, s, 3, [f])
	} : y, t && o) {
		const e = l;
		l = () => to(e())
	}
	let p, f = e => {
		c = b.onStop = () => {
			hn(e, s, 4)
		}
	};
	if (hi) {
		if (f = y, t ? n && mn(t, s, 3, [l(), d ? [] : void 0, f]) : l(), "sync" !== r) return y;
		{
			const e = xi();
			p = e.__watcherHandles || (e.__watcherHandles = [])
		}
	}
	let h = d ? new Array(e.length).fill(Jn) : Jn;
	const m = () => {
		if (b.active) if (t) {
			const e = b.run();
			(o || u || (d ? e.some(((e, t) => Y(e, h[t]))) : Y(e, h))) && (c && c(), mn(t, s, 3, [e, h === Jn ? void 0 : d && h[0] === Jn ? [] : h, f]), h = e)
		} else b.run()
	};
	let g;
	m.allowRecurse = !!t, "sync" === r ? g = m : "post" === r ? g = () => Pr(m, s && s.suspense) : (m.pre = !0, s && (m.id = s.uid), g = () => An(m));
	const b = new Qe(l, g);
	t ? n ? m() : h = b.run() : "post" === r ? Pr(b.run.bind(b), s && s.suspense) : b.run();
	const _ = () => {
		b.stop(), s && s.scope && E(s.scope.effects, b)
	};
	return p && p.push(_), _
}

function Zn(e, t, n) {
	const o = this.proxy, r = I(e) ? e.includes(".") ? eo(o, e) : () => o[e] : e.bind(o, o);
	let i;
	O(t) ? i = t : (i = t.handler, n = t);
	const a = ci;
	di(this);
	const s = Kn(r, i.bind(o), n);
	return a ? di(a) : pi(), s
}

function eo(e, t) {
	const n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t
	}
}

function to(e, t) {
	if (!F(e) || e.__v_skip) return e;
	if ((t = t || new Set).has(e)) return e;
	if (t.add(e), tn(e)) to(e.value, t); else if (C(e)) for (let n = 0; n < e.length; n++) to(e[n], t); else if (P(e) || B(e)) e.forEach((e => {
		to(e, t)
	})); else if (D(e)) for (const n in e) to(e[n], t);
	return e
}

const no = [Function, Array], oo = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: no,
	onEnter: no,
	onAfterEnter: no,
	onEnterCancelled: no,
	onBeforeLeave: no,
	onLeave: no,
	onAfterLeave: no,
	onLeaveCancelled: no,
	onBeforeAppear: no,
	onAppear: no,
	onAfterAppear: no,
	onAppearCancelled: no
}, ro = {
	name: "BaseTransition", props: oo, setup(e, {slots: t}) {
		const n = ui(), o = function () {
			const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
			return Io((() => {
				e.isMounted = !0
			})), jo((() => {
				e.isUnmounting = !0
			})), e
		}();
		let r;
		return () => {
			const i = t.default && uo(t.default(), !0);
			if (!i || !i.length) return;
			let a = i[0];
			if (i.length > 1) for (const e of i) if (e.type !== jr) {
				a = e;
				break
			}
			const s = Yt(e), {mode: l} = s;
			if (o.isLeaving) return so(a);
			const c = lo(a);
			if (!c) return so(a);
			const u = ao(c, s, o, n);
			co(c, u);
			const d = n.subTree, p = d && lo(d);
			let f = !1;
			const {getTransitionKey: h} = c.type;
			if (h) {
				const e = h();
				void 0 === r ? r = e : e !== r && (r = e, f = !0)
			}
			if (p && p.type !== jr && (!Ur(c, p) || f)) {
				const e = ao(p, s, o, n);
				if (co(p, e), "out-in" === l) return o.isLeaving = !0, e.afterLeave = () => {
					o.isLeaving = !1, !1 !== n.update.active && n.update()
				}, so(a);
				"in-out" === l && c.type !== jr && (e.delayLeave = (e, t, n) => {
					io(o, p)[String(p.key)] = p, e._leaveCb = () => {
						t(), e._leaveCb = void 0, delete u.delayedLeave
					}, u.delayedLeave = n
				})
			}
			return a
		}
	}
};

function io(e, t) {
	const {leavingVNodes: n} = e;
	let o = n.get(t.type);
	return o || (o = Object.create(null), n.set(t.type, o)), o
}

function ao(e, t, n, o) {
	const {appear: r, mode: i, persisted: a = !1, onBeforeEnter: s, onEnter: l, onAfterEnter: c, onEnterCancelled: u, onBeforeLeave: d, onLeave: p, onAfterLeave: f, onLeaveCancelled: h, onBeforeAppear: m, onAppear: g, onAfterAppear: v, onAppearCancelled: b} = t,
		y = String(e.key), _ = io(n, e), w = (e, t) => {
			e && mn(e, o, 9, t)
		}, x = (e, t) => {
			const n = t[1];
			w(e, t), C(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n()
		}, T = {
			mode: i, persisted: a, beforeEnter(t) {
				let o = s;
				if (!n.isMounted) {
					if (!r) return;
					o = m || s
				}
				t._leaveCb && t._leaveCb(!0);
				const i = _[y];
				i && Ur(e, i) && i.el._leaveCb && i.el._leaveCb(), w(o, [t])
			}, enter(e) {
				let t = l, o = c, i = u;
				if (!n.isMounted) {
					if (!r) return;
					t = g || l, o = v || c, i = b || u
				}
				let a = !1;
				const s = e._enterCb = t => {
					a || (a = !0, w(t ? i : o, [e]), T.delayedLeave && T.delayedLeave(), e._enterCb = void 0)
				};
				t ? x(t, [e, s]) : s()
			}, leave(t, o) {
				const r = String(e.key);
				if (t._enterCb && t._enterCb(!0), n.isUnmounting) return o();
				w(d, [t]);
				let i = !1;
				const a = t._leaveCb = n => {
					i || (i = !0, o(), w(n ? h : f, [t]), t._leaveCb = void 0, _[r] === e && delete _[r])
				};
				_[r] = e, p ? x(p, [t, a]) : a()
			}, clone: e => ao(e, t, n, o)
		};
	return T
}

function so(e) {
	if (go(e)) return (e = Zr(e)).children = null, e
}

function lo(e) {
	return go(e) ? e.children ? e.children[0] : void 0 : e
}

function co(e, t) {
	6 & e.shapeFlag && e.component ? co(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function uo(e, t = !1, n) {
	let o = [], r = 0;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		const s = null == n ? a.key : String(n) + String(null != a.key ? a.key : i);
		a.type === Mr ? (128 & a.patchFlag && r++, o = o.concat(uo(a.children, t, s))) : (t || a.type !== jr) && o.push(null != s ? Zr(a, {key: s}) : a)
	}
	if (r > 1) for (let i = 0; i < o.length; i++) o[i].patchFlag = -2;
	return o
}

function po(e) {
	return O(e) ? {setup: e, name: e.name} : e
}

const fo = e => !!e.type.__asyncLoader;

function ho(e) {
	O(e) && (e = {loader: e});
	const {loader: t, loadingComponent: n, errorComponent: o, delay: r = 200, timeout: i, suspensible: a = !0, onError: s} = e;
	let l, c = null, u = 0;
	const d = () => {
		let e;
		return c || (e = c = t().catch((e => {
			if (e = e instanceof Error ? e : new Error(String(e)), s) return new Promise(((t, n) => {
				s(e, (() => t((u++, c = null, d()))), (() => n(e)), u + 1)
			}));
			throw e
		})).then((t => e !== c && c ? c : (t && (t.__esModule || "Module" === t[Symbol.toStringTag]) && (t = t.default), l = t, t))))
	};
	return po({
		name: "AsyncComponentWrapper", __asyncLoader: d, get __asyncResolved() {
			return l
		}, setup() {
			const e = ci;
			if (l) return () => mo(l, e);
			const t = t => {
				c = null, gn(t, e, 13, !o)
			};
			if (a && e.suspense || hi) return d().then((t => () => mo(t, e))).catch((e => (t(e), () => o ? Kr(o, {error: e}) : null)));
			const s = nn(!1), u = nn(), p = nn(!!r);
			return r && setTimeout((() => {
				p.value = !1
			}), r), null != i && setTimeout((() => {
				if (!s.value && !u.value) {
					const e = new Error(`Async component timed out after ${i}ms.`);
					t(e), u.value = e
				}
			}), i), d().then((() => {
				s.value = !0, e.parent && go(e.parent.vnode) && An(e.parent.update)
			})).catch((e => {
				t(e), u.value = e
			})), () => s.value && l ? mo(l, e) : u.value && o ? Kr(o, {error: u.value}) : n && !p.value ? Kr(n) : void 0
		}
	})
}

function mo(e, t) {
	const {ref: n, props: o, children: r, ce: i} = t.vnode, a = Kr(e, o, r);
	return a.ref = n, a.ce = i, delete t.vnode.ce, a
}

const go = e => e.type.__isKeepAlive;

class vo {
	constructor(e) {
		this.max = e, this._cache = new Map, this._keys = new Set, this._max = parseInt(e, 10)
	}

	get(e) {
		const {_cache: t, _keys: n, _max: o} = this, r = t.get(e);
		if (r) n.delete(e), n.add(e); else if (n.add(e), o && n.size > o) {
			const e = n.values().next().value;
			this.pruneCacheEntry(t.get(e)), this.delete(e)
		}
		return r
	}

	set(e, t) {
		this._cache.set(e, t)
	}

	delete(e) {
		this._cache.delete(e), this._keys.delete(e)
	}

	forEach(e, t) {
		this._cache.forEach(e.bind(t))
	}
}

const bo = {
	name: "KeepAlive",
	__isKeepAlive: !0,
	props: {
		include: [String, RegExp, Array],
		exclude: [String, RegExp, Array],
		max: [String, Number],
		matchBy: {type: String, default: "name"},
		cache: Object
	},
	setup(e, {slots: t}) {
		const n = ui(), o = n.ctx;
		if (!o.renderer) return () => {
			const e = t.default && t.default();
			return e && 1 === e.length ? e[0] : e
		};
		const r = e.cache || new vo(e.max);
		r.pruneCacheEntry = a;
		let i = null;

		function a(t) {
			var o;
			!i || !Ur(t, i) || "key" === e.matchBy && t.key !== i.key ? (Eo(o = t), u(o, n, s, !0)) : i && Eo(i)
		}

		const s = n.suspense, {renderer: {p: l, m: c, um: u, o: {createElement: d}}} = o, p = d("div");

		function f(t) {
			r.forEach(((n, o) => {
				const i = Ao(n, e.matchBy);
				!i || t && t(i) || (r.delete(o), a(n))
			}))
		}

		o.activate = (e, t, n, o, r) => {
			const i = e.component;
			if (i.ba) {
				const e = i.isDeactivated;
				i.isDeactivated = !1, J(i.ba), i.isDeactivated = e
			}
			c(e, t, n, 0, s), l(i.vnode, e, t, n, i, s, o, e.slotScopeIds, r), Pr((() => {
				i.isDeactivated = !1, i.a && J(i.a);
				const t = e.props && e.props.onVnodeMounted;
				t && ai(t, i.parent, e)
			}), s)
		}, o.deactivate = e => {
			const t = e.component;
			t.bda && Co(t.bda), c(e, p, null, 1, s), Pr((() => {
				t.bda && Bo(t.bda), t.da && J(t.da);
				const n = e.props && e.props.onVnodeUnmounted;
				n && ai(n, t.parent, e), t.isDeactivated = !0
			}), s)
		}, Gn((() => [e.include, e.exclude, e.matchBy]), (([e, t]) => {
			e && f((t => _o(e, t))), t && f((e => !_o(t, e)))
		}), {flush: "post", deep: !0});
		let h = null;
		const m = () => {
			null != h && r.set(h, ko(n.subTree))
		};
		return Io(m), Fo(m), jo((() => {
			r.forEach(((t, o) => {
				r.delete(o), a(t);
				const {subTree: i, suspense: s} = n, l = ko(i);
				if (t.type !== l.type || "key" === e.matchBy && t.key !== l.key) ; else {
					l.component.bda && J(l.component.bda), Eo(l);
					const e = l.component.da;
					e && Pr(e, s)
				}
			}))
		})), () => {
			if (h = null, !t.default) return null;
			const n = t.default(), o = n[0];
			if (n.length > 1) return i = null, n;
			if (!Qr(o) || !(4 & o.shapeFlag) && !Qn(o.type)) return i = null, o;
			let a = ko(o);
			const s = a.type, l = Ao(a, e.matchBy), {include: c, exclude: u} = e;
			if (c && (!l || !_o(c, l)) || u && l && _o(u, l)) return i = a, o;
			const d = null == a.key ? s : a.key, p = r.get(d);
			return a.el && (a = Zr(a), Qn(o.type) && (o.ssContent = a)), h = d, p && (a.el = p.el, a.component = p.component, a.transition && co(a, a.transition), a.shapeFlag |= 512), a.shapeFlag |= 256, i = a, Qn(o.type) ? o : a
		}
	}
}, yo = bo;

function _o(e, t) {
	return C(e) ? e.some((e => _o(e, t))) : I(e) ? e.split(",").includes(t) : !!e.test && e.test(t)
}

function wo(e, t) {
	To(e, "a", t)
}

function xo(e, t) {
	To(e, "da", t)
}

function To(e, t, n = ci) {
	const o = e.__wdc || (e.__wdc = () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent
		}
		return e()
	});
	if (o.__called = !1, Po(t, o, n), n) {
		let e = n.parent;
		for (; e && e.parent;) go(e.parent.vnode) && So(o, t, n, e), e = e.parent
	}
}

function So(e, t, n, o) {
	const r = Po(t, e, o, !0);
	Ro((() => {
		E(o[t], r)
	}), n)
}

function Eo(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513
}

function ko(e) {
	return Qn(e.type) ? e.ssContent : e
}

function Ao(e, t) {
	if ("name" === t) {
		const t = e.type;
		return bi(fo(e) ? t.__asyncResolved || {} : t)
	}
	return String(e.key)
}

function Co(e) {
	for (let t = 0; t < e.length; t++) {
		const n = e[t];
		n.__called || (n(), n.__called = !0)
	}
}

function Bo(e) {
	e.forEach((e => e.__called = !1))
}

function Po(e, t, n = ci, o = !1) {
	if (n) {
		if (r = e, Se.indexOf(r) > -1 && n.$pageInstance) {
			if (n.type.__reserved) return;
			if (n !== n.$pageInstance && (n = n.$pageInstance, function (e) {
				return Ee.indexOf(e) > -1
			}(e))) {
				const o = n.proxy;
				mn(t.bind(o), n, e, "onLoad" === e ? [o.$page.options] : [])
			}
		}
		const i = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...o) => {
			if (n.isUnmounted) return;
			Je(), di(n);
			const r = mn(t, n, e, o);
			return pi(), Ge(), r
		});
		return o ? i.unshift(a) : i.push(a), a
	}
	var r
}

const Lo = e => (t, n = ci) => (!hi || "sp" === e) && Po(e, ((...e) => t(...e)), n), Oo = Lo("bm"), Io = Lo("m"),
	Mo = Lo("bu"), Fo = Lo("u"), jo = Lo("bum"), Ro = Lo("um"), No = Lo("sp"), Do = Lo("rtg"), zo = Lo("rtc");

function Ho(e, t = ci) {
	Po("ec", e, t)
}

function qo(e, t) {
	const n = Nn;
	if (null === n) return e;
	const o = vi(n) || n.proxy, r = e.dirs || (e.dirs = []);
	for (let i = 0; i < t.length; i++) {
		let [e, n, a, s = v] = t[i];
		e && (O(e) && (e = {mounted: e, updated: e}), e.deep && to(n), r.push({
			dir: e,
			instance: o,
			value: n,
			oldValue: void 0,
			arg: a,
			modifiers: s
		}))
	}
	return e
}

function Vo(e, t, n, o) {
	const r = e.dirs, i = t && t.dirs;
	for (let a = 0; a < r.length; a++) {
		const s = r[a];
		i && (s.oldValue = i[a].value);
		let l = s.dir[o];
		l && (Je(), mn(l, n, 8, [e.el, s, e, t]), Ge())
	}
}

function Wo(e, t) {
	return Uo("components", e, !0, t) || e
}

const $o = Symbol();

function Qo(e) {
	return I(e) ? Uo("components", e, !1) || e : e || $o
}

function Uo(e, t, n = !0, o = !1) {
	const r = Nn || ci;
	if (r) {
		const n = r.type;
		if ("components" === e) {
			const e = bi(n, !1);
			if (e && (e === t || e === W(t) || e === U(W(t)))) return n
		}
		const i = Xo(r[e] || n[e], t) || Xo(r.appContext[e], t);
		return !i && o ? n : i
	}
}

function Xo(e, t) {
	return e && (e[t] || e[W(t)] || e[U(W(t))])
}

function Yo(e, t, n, o) {
	let r;
	const i = n && n[o];
	if (C(e) || I(e)) {
		r = new Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) r[n] = t(e[n], n, void 0, i && i[n])
	} else if ("number" == typeof e) {
		r = new Array(e);
		for (let n = 0; n < e; n++) r[n] = t(n + 1, n, void 0, i && i[n])
	} else if (F(e)) if (e[Symbol.iterator]) r = Array.from(e, ((e, n) => t(e, n, void 0, i && i[n]))); else {
		const n = Object.keys(e);
		r = new Array(n.length);
		for (let o = 0, a = n.length; o < a; o++) {
			const a = n[o];
			r[o] = t(e[a], a, o, i && i[o])
		}
	} else r = [];
	return n && (n[o] = r), r
}

function Jo(e, t, n = {}, o, r) {
	if (Nn.isCE || Nn.parent && fo(Nn.parent) && Nn.parent.isCE) return "default" !== t && (n.name = t), Kr("slot", n, o && o());
	let i = e[t];
	i && i._c && (i._d = !1), zr();
	const a = i && Go(i(n)),
		s = $r(Mr, {key: n.key || a && a.key || `_${t}`}, a || (o ? o() : []), a && 1 === e._ ? 64 : -2);
	return !r && s.scopeId && (s.slotScopeIds = [s.scopeId + "-s"]), i && i._c && (i._d = !0), s
}

function Go(e) {
	return e.some((e => !Qr(e) || e.type !== jr && !(e.type === Mr && !Go(e.children)))) ? e : null
}

const Ko = e => e ? fi(e) ? vi(e) || e.proxy : Ko(e.parent) : null, Zo = S(Object.create(null), {
	$: e => e,
	$el: e => e.vnode.el,
	$data: e => e.data,
	$props: e => e.props,
	$attrs: e => e.attrs,
	$slots: e => e.slots,
	$refs: e => e.refs,
	$parent: e => Ko(e.parent),
	$root: e => Ko(e.root),
	$emit: e => e.emit,
	$options: e => ar(e),
	$forceUpdate: e => e.f || (e.f = () => An(e.update)),
	$nextTick: e => e.n || (e.n = kn.bind(e.proxy)),
	$watch: e => Zn.bind(e)
}), er = (e, t) => e !== v && !e.__isScriptSetup && A(e, t), tr = {
	get({_: e}, t) {
		const {ctx: n, setupState: o, data: r, props: i, accessCache: a, type: s, appContext: l} = e;
		let c;
		if ("$" !== t[0]) {
			const s = a[t];
			if (void 0 !== s) switch (s) {
				case 1:
					return o[t];
				case 2:
					return r[t];
				case 4:
					return n[t];
				case 3:
					return i[t]
			} else {
				if (er(o, t)) return a[t] = 1, o[t];
				if (r !== v && A(r, t)) return a[t] = 2, r[t];
				if ((c = e.propsOptions[0]) && A(c, t)) return a[t] = 3, i[t];
				if (n !== v && A(n, t)) return a[t] = 4, n[t];
				nr && (a[t] = 0)
			}
		}
		const u = Zo[t];
		let d, p;
		return u ? ("$attrs" === t && Ke(e, 0, t), u(e)) : (d = s.__cssModules) && (d = d[t]) ? d : n !== v && A(n, t) ? (a[t] = 4, n[t]) : (p = l.config.globalProperties, A(p, t) ? p[t] : void 0)
	}, set({_: e}, t, n) {
		const {data: o, setupState: r, ctx: i} = e;
		return er(r, t) ? (r[t] = n, !0) : o !== v && A(o, t) ? (o[t] = n, !0) : !A(e.props, t) && (("$" !== t[0] || !(t.slice(1) in e)) && (i[t] = n, !0))
	}, has({_: {data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: i}}, a) {
		let s;
		return !!n[a] || e !== v && A(e, a) || er(t, a) || (s = i[0]) && A(s, a) || A(o, a) || A(Zo, a) || A(r.config.globalProperties, a)
	}, defineProperty(e, t, n) {
		return null != n.get ? e._.accessCache[t] = 0 : A(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
	}
};
let nr = !0;

function or(e) {
	const t = ar(e), n = e.proxy, o = e.ctx;
	nr = !1, t.beforeCreate && rr(t.beforeCreate, e, "bc");
	const {data: r, computed: i, methods: a, watch: s, provide: l, inject: c, created: u, beforeMount: d, mounted: p, beforeUpdate: f, updated: h, activated: m, deactivated: g, beforeDestroy: v, beforeUnmount: b, destroyed: _, unmounted: w, render: x, renderTracked: T, renderTriggered: S, errorCaptured: E, serverPrefetch: k, expose: A, inheritAttrs: B, components: P, directives: L, filters: I} = t;
	if (c && function (e, t, n = y, o = !1) {
		C(e) && (e = ur(e));
		for (const r in e) {
			const n = e[r];
			let i;
			i = F(n) ? "default" in n ? Xn(n.from || r, n.default, !0) : Xn(n.from || r) : Xn(n), tn(i) && o ? Object.defineProperty(t, r, {
				enumerable: !0,
				configurable: !0,
				get: () => i.value,
				set: e => i.value = e
			}) : t[r] = i
		}
	}(c, o, null, e.appContext.config.unwrapInjectedRef), a) for (const y in a) {
		const e = a[y];
		O(e) && (o[y] = e.bind(n))
	}
	if (r) {
		const t = r.call(n, n);
		F(t) && (e.data = qt(t))
	}
	if (nr = !0, i) for (const C in i) {
		const e = i[C], t = O(e) ? e.bind(n, n) : O(e.get) ? e.get.bind(n, n) : y,
			r = !O(e) && O(e.set) ? e.set.bind(n) : y, a = yi({get: t, set: r});
		Object.defineProperty(o, C, {enumerable: !0, configurable: !0, get: () => a.value, set: e => a.value = e})
	}
	if (s) for (const y in s) ir(s[y], o, n, y);
	if (l) {
		const e = O(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t => {
			Un(t, e[t])
		}))
	}

	function M(e, t) {
		C(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
	}

	if (u && rr(u, e, "c"), M(Oo, d), M(Io, p), M(Mo, f), M(Fo, h), M(wo, m), M(xo, g), M(Ho, E), M(zo, T), M(Do, S), M(jo, b), M(Ro, w), M(No, k), C(A)) if (A.length) {
		const t = e.exposed || (e.exposed = {});
		A.forEach((e => {
			Object.defineProperty(t, e, {get: () => n[e], set: t => n[e] = t})
		}))
	} else e.exposed || (e.exposed = {});
	x && e.render === y && (e.render = x), null != B && (e.inheritAttrs = B), P && (e.components = P), L && (e.directives = L);
	const j = e.appContext.config.globalProperties.$applyOptions;
	j && j(t, e, n)
}

function rr(e, t, n) {
	mn(C(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
}

function ir(e, t, n, o) {
	const r = o.includes(".") ? eo(n, o) : () => n[o];
	if (I(e)) {
		const n = t[e];
		O(n) && Gn(r, n)
	} else if (O(e)) Gn(r, e.bind(n)); else if (F(e)) if (C(e)) e.forEach((e => ir(e, t, n, o))); else {
		const o = O(e.handler) ? e.handler.bind(n) : t[e.handler];
		O(o) && Gn(r, o, e)
	}
}

function ar(e) {
	const t = e.type, {mixins: n, extends: o} = t, {mixins: r, optionsCache: i, config: {optionMergeStrategies: a}} = e.appContext,
		s = i.get(t);
	let l;
	return s ? l = s : r.length || n || o ? (l = {}, r.length && r.forEach((e => sr(l, e, a, !0))), sr(l, t, a)) : l = t, F(t) && i.set(t, l), l
}

function sr(e, t, n, o = !1) {
	const {mixins: r, extends: i} = t;
	i && sr(e, i, n, !0), r && r.forEach((t => sr(e, t, n, !0)));
	for (const a in t) if (o && "expose" === a) ; else {
		const o = lr[a] || n && n[a];
		e[a] = o ? o(e[a], t[a]) : t[a]
	}
	return e
}

const lr = {
	data: cr,
	props: pr,
	emits: pr,
	methods: pr,
	computed: pr,
	beforeCreate: dr,
	created: dr,
	beforeMount: dr,
	mounted: dr,
	beforeUpdate: dr,
	updated: dr,
	beforeDestroy: dr,
	beforeUnmount: dr,
	destroyed: dr,
	unmounted: dr,
	activated: dr,
	deactivated: dr,
	errorCaptured: dr,
	serverPrefetch: dr,
	components: pr,
	directives: pr,
	watch: function (e, t) {
		if (!e) return t;
		if (!t) return e;
		const n = S(Object.create(null), e);
		for (const o in t) n[o] = dr(e[o], t[o]);
		return n
	},
	provide: cr,
	inject: function (e, t) {
		return pr(ur(e), ur(t))
	}
};

function cr(e, t) {
	return t ? e ? function () {
		return S(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t)
	} : t : e
}

function ur(e) {
	if (C(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t
	}
	return e
}

function dr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function pr(e, t) {
	return e ? S(S(Object.create(null), e), t) : t
}

function fr(e, t, n, o = !1) {
	const r = {}, i = {};
	G(i, Xr, 1), e.propsDefaults = Object.create(null), hr(e, t, r, i);
	for (const a in e.propsOptions[0]) a in r || (r[a] = void 0);
	n ? e.props = o ? r : Wt(r, !1, mt, Ft, Nt) : e.type.props ? e.props = r : e.props = i, e.attrs = i
}

function hr(e, t, n, o) {
	const [r, i] = e.propsOptions;
	let a, s = !1;
	if (t) for (let l in t) {
		if (H(l)) continue;
		const c = t[l];
		let u;
		r && A(r, u = W(l)) ? i && i.includes(u) ? (a || (a = {}))[u] = c : n[u] = c : Rn(e.emitsOptions, l) || l in o && c === o[l] || (o[l] = c, s = !0)
	}
	if (i) {
		const t = Yt(n), o = a || v;
		for (let a = 0; a < i.length; a++) {
			const s = i[a];
			n[s] = mr(r, t, s, o[s], e, !A(o, s))
		}
	}
	return s
}

function mr(e, t, n, o, r, i) {
	const a = e[n];
	if (null != a) {
		const e = A(a, "default");
		if (e && void 0 === o) {
			const e = a.default;
			if (a.type !== Function && O(e)) {
				const {propsDefaults: i} = r;
				n in i ? o = i[n] : (di(r), o = i[n] = e.call(null, t), pi())
			} else o = e
		}
		a[0] && (i && !e ? o = !1 : !a[1] || "" !== o && o !== Q(n) || (o = !0))
	}
	return o
}

function gr(e, t, n = !1) {
	const o = t.propsCache, r = o.get(e);
	if (r) return r;
	const i = e.props, a = {}, s = [];
	let l = !1;
	if (!O(e)) {
		const o = e => {
			l = !0;
			const [n, o] = gr(e, t, !0);
			S(a, n), o && s.push(...o)
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	if (!i && !l) return F(e) && o.set(e, b), b;
	if (C(i)) for (let u = 0; u < i.length; u++) {
		const e = W(i[u]);
		vr(e) && (a[e] = v)
	} else if (i) for (const u in i) {
		const e = W(u);
		if (vr(e)) {
			const t = i[u], n = a[e] = C(t) || O(t) ? {type: t} : Object.assign({}, t);
			if (n) {
				const t = _r(Boolean, n.type), o = _r(String, n.type);
				n[0] = t > -1, n[1] = o < 0 || t < o, (t > -1 || A(n, "default")) && s.push(e)
			}
		}
	}
	const c = [a, s];
	return F(e) && o.set(e, c), c
}

function vr(e) {
	return "$" !== e[0]
}

function br(e) {
	const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : null === e ? "null" : ""
}

function yr(e, t) {
	return br(e) === br(t)
}

function _r(e, t) {
	return C(t) ? t.findIndex((t => yr(t, e))) : O(t) && yr(t, e) ? 0 : -1
}

const wr = e => "_" === e[0] || "$stable" === e, xr = e => C(e) ? e.map(ni) : [ni(e)], Tr = (e, t, n) => {
	if (t._n) return t;
	const o = Hn(((...e) => xr(t(...e))), n);
	return o._c = !1, o
}, Sr = (e, t, n) => {
	const o = e._ctx;
	for (const r in e) {
		if (wr(r)) continue;
		const n = e[r];
		if (O(n)) t[r] = Tr(0, n, o); else if (null != n) {
			const e = xr(n);
			t[r] = () => e
		}
	}
}, Er = (e, t) => {
	const n = xr(t);
	e.slots.default = () => n
};

function kr() {
	return {
		app: null,
		config: {
			isNativeTag: _,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap,
		propsCache: new WeakMap,
		emitsCache: new WeakMap
	}
}

let Ar = 0;

function Cr(e, t) {
	return function (n, o = null) {
		O(n) || (n = Object.assign({}, n)), null == o || F(o) || (o = null);
		const r = kr(), i = new Set;
		let a = !1;
		const s = r.app = {
			_uid: Ar++,
			_component: n,
			_props: o,
			_container: null,
			_context: r,
			_instance: null,
			version: Ti,
			get config() {
				return r.config
			},
			set config(e) {
			},
			use: (e, ...t) => (i.has(e) || (e && O(e.install) ? (i.add(e), e.install(s, ...t)) : O(e) && (i.add(e), e(s, ...t))), s),
			mixin: e => (r.mixins.includes(e) || r.mixins.push(e), s),
			component: (e, t) => t ? (r.components[e] = t, s) : r.components[e],
			directive: (e, t) => t ? (r.directives[e] = t, s) : r.directives[e],
			mount(i, l, c) {
				if (!a) {
					const u = Kr(n, o);
					return u.appContext = r, l && t ? t(u, i) : e(u, i, c), a = !0, s._container = i, i.__vue_app__ = s, s._instance = u.component, vi(u.component) || u.component.proxy
				}
			},
			unmount() {
				a && (e(null, s._container), delete s._container.__vue_app__)
			},
			provide: (e, t) => (r.provides[e] = t, s)
		};
		return s
	}
}

function Br(e, t, n, o, r = !1) {
	if (C(e)) return void e.forEach(((e, i) => Br(e, t && (C(t) ? t[i] : t), n, o, r)));
	if (fo(o) && !r) return;
	const i = 4 & o.shapeFlag ? vi(o.component) || o.component.proxy : o.el, a = r ? null : i, {i: s, r: l} = e,
		c = t && t.r, u = s.refs === v ? s.refs = {} : s.refs, d = s.setupState;
	if (null != c && c !== l && (I(c) ? (u[c] = null, A(d, c) && (d[c] = null)) : tn(c) && (c.value = null)), O(l)) hn(l, s, 12, [a, u]); else {
		const t = I(l), o = tn(l);
		if (t || o) {
			const s = () => {
				if (e.f) {
					const n = t ? A(d, l) ? d[l] : u[l] : l.value;
					r ? C(n) && E(n, i) : C(n) ? n.includes(i) || n.push(i) : t ? (u[l] = [i], A(d, l) && (d[l] = u[l])) : (l.value = [i], e.k && (u[e.k] = l.value))
				} else t ? (u[l] = a, A(d, l) && (d[l] = a)) : o && (l.value = a, e.k && (u[e.k] = a))
			};
			a ? (s.id = -1, Pr(s, n)) : s()
		}
	}
}

const Pr = function (e, t) {
	var n;
	t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : (C(n = e) ? wn.push(...n) : xn && xn.includes(n, n.allowRecurse ? Tn + 1 : Tn) || wn.push(n), Cn())
};

function Lr(e) {
	return function (e, t) {
		(Z || (Z = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})).__VUE__ = !0;
		const {insert: n, remove: o, patchProp: r, forcePatchProp: i, createElement: a, createText: s, createComment: l, setText: c, setElementText: u, parentNode: d, nextSibling: p, setScopeId: f = y, insertStaticContent: h} = e,
			m = (e, t, n, o = null, r = null, i = null, a = !1, s = null, l = !!t.dynamicChildren) => {
				if (e === t) return;
				e && !Ur(e, t) && (o = te(e), U(e, r, i, !0), e = null), -2 === t.patchFlag && (l = !1, t.dynamicChildren = null);
				const {type: c, ref: u, shapeFlag: d} = t;
				switch (c) {
					case Fr:
						g(e, t, n, o);
						break;
					case jr:
						_(e, t, n, o);
						break;
					case Rr:
						null == e && w(t, n, o, a);
						break;
					case Mr:
						I(e, t, n, o, r, i, a, s, l);
						break;
					default:
						1 & d ? E(e, t, n, o, r, i, a, s, l) : 6 & d ? M(e, t, n, o, r, i, a, s, l) : (64 & d || 128 & d) && c.process(e, t, n, o, r, i, a, s, l, oe)
				}
				null != u && r && Br(u, e && e.ref, i, t || e, !t)
			}, g = (e, t, o, r) => {
				if (null == e) n(t.el = s(t.children), o, r); else {
					const n = t.el = e.el;
					t.children !== e.children && c(n, t.children)
				}
			}, _ = (e, t, o, r) => {
				null == e ? n(t.el = l(t.children || ""), o, r) : t.el = e.el
			}, w = (e, t, n, o) => {
				[e.el, e.anchor] = h(e.children, t, n, o, e.el, e.anchor)
			}, x = ({el: e, anchor: t}, o, r) => {
				let i;
				for (; e && e !== t;) i = p(e), n(e, o, r), e = i;
				n(t, o, r)
			}, T = ({el: e, anchor: t}) => {
				let n;
				for (; e && e !== t;) n = p(e), o(e), e = n;
				o(t)
			}, E = (e, t, n, o, r, i, a, s, l) => {
				a = a || "svg" === t.type, null == e ? k(t, n, o, r, i, a, s, l) : P(e, t, r, i, a, s, l)
			}, k = (e, t, o, i, s, l, c, d) => {
				let p, f;
				const {type: h, props: m, shapeFlag: g, transition: v, dirs: b} = e;
				if (p = e.el = a(e.type, l, m && m.is, m), 8 & g ? u(p, e.children) : 16 & g && B(e.children, p, null, i, s, l && "foreignObject" !== h, c, d), b && Vo(e, null, i, "created"), C(p, e, e.scopeId, c, i), m) {
					for (const t in m) "value" === t || H(t) || r(p, t, null, m[t], l, e.children, i, s, ee);
					"value" in m && r(p, "value", null, m.value), (f = m.onVnodeBeforeMount) && ai(f, i, e)
				}
				Object.defineProperty(p, "__vueParentComponent", {
					value: i,
					enumerable: !1
				}), b && Vo(e, null, i, "beforeMount");
				const y = (!s || s && !s.pendingBranch) && v && !v.persisted;
				y && v.beforeEnter(p), n(p, t, o), ((f = m && m.onVnodeMounted) || y || b) && Pr((() => {
					f && ai(f, i, e), y && v.enter(p), b && Vo(e, null, i, "mounted")
				}), s)
			}, C = (e, t, n, o, r) => {
				if (n && f(e, n), o) for (let i = 0; i < o.length; i++) f(e, o[i]);
				if (r) {
					if (t === r.subTree) {
						const t = r.vnode;
						C(e, t, t.scopeId, t.slotScopeIds, r.parent)
					}
				}
			}, B = (e, t, n, o, r, i, a, s, l = 0) => {
				for (let c = l; c < e.length; c++) {
					const l = e[c] = s ? oi(e[c]) : ni(e[c]);
					m(null, l, t, n, o, r, i, a, s)
				}
			}, P = (e, t, n, o, a, s, l) => {
				const c = t.el = e.el;
				let {patchFlag: d, dynamicChildren: p, dirs: f} = t;
				d |= 16 & e.patchFlag;
				const h = e.props || v, m = t.props || v;
				let g;
				n && Or(n, !1), (g = m.onVnodeBeforeUpdate) && ai(g, n, t, e), f && Vo(t, e, n, "beforeUpdate"), n && Or(n, !0);
				const b = a && "foreignObject" !== t.type;
				if (p ? L(e.dynamicChildren, p, c, n, o, b, s) : l || z(e, t, c, null, n, o, b, s, !1), d > 0) {
					if (16 & d) O(c, t, h, m, n, o, a); else if (2 & d && h.class !== m.class && r(c, "class", null, m.class, a), 4 & d && r(c, "style", h.style, m.style, a), 8 & d) {
						const s = t.dynamicProps;
						for (let t = 0; t < s.length; t++) {
							const l = s[t], u = h[l], d = m[l];
							(d !== u || "value" === l || i && i(c, l)) && r(c, l, u, d, a, e.children, n, o, ee)
						}
					}
					1 & d && e.children !== t.children && u(c, t.children)
				} else l || null != p || O(c, t, h, m, n, o, a);
				((g = m.onVnodeUpdated) || f) && Pr((() => {
					g && ai(g, n, t, e), f && Vo(t, e, n, "updated")
				}), o)
			}, L = (e, t, n, o, r, i, a) => {
				for (let s = 0; s < t.length; s++) {
					const l = e[s], c = t[s], u = l.el && (l.type === Mr || !Ur(l, c) || 70 & l.shapeFlag) ? d(l.el) : n;
					m(l, c, u, null, o, r, i, a, !0)
				}
			}, O = (e, t, n, o, a, s, l) => {
				if (n !== o) {
					if (n !== v) for (const i in n) H(i) || i in o || r(e, i, n[i], null, l, t.children, a, s, ee);
					for (const c in o) {
						if (H(c)) continue;
						const u = o[c], d = n[c];
						(u !== d && "value" !== c || i && i(e, c)) && r(e, c, d, u, l, t.children, a, s, ee)
					}
					"value" in o && r(e, "value", n.value, o.value)
				}
			}, I = (e, t, o, r, i, a, l, c, u) => {
				const d = t.el = e ? e.el : s(""), p = t.anchor = e ? e.anchor : s("");
				let {patchFlag: f, dynamicChildren: h, slotScopeIds: m} = t;
				m && (c = c ? c.concat(m) : m), null == e ? (n(d, o, r), n(p, o, r), B(t.children, o, p, i, a, l, c, u)) : f > 0 && 64 & f && h && e.dynamicChildren ? (L(e.dynamicChildren, h, o, i, a, l, c), (null != t.key || i && t === i.subTree) && Ir(e, t, !0)) : z(e, t, o, p, i, a, l, c, u)
			}, M = (e, t, n, o, r, i, a, s, l) => {
				t.slotScopeIds = s, null == e ? 512 & t.shapeFlag ? r.ctx.activate(t, n, o, a, l) : F(t, n, o, r, i, a, l) : R(e, t, l)
			}, F = (e, t, n, o, r, i, a) => {
				const s = e.component = function (e, t, n) {
					const o = e.type, r = (t ? t.appContext : e.appContext) || si, i = {
						uid: li++,
						vnode: e,
						type: o,
						parent: t,
						appContext: r,
						root: null,
						next: null,
						subTree: null,
						effect: null,
						update: null,
						scope: new Me(!0),
						render: null,
						proxy: null,
						exposed: null,
						exposeProxy: null,
						withProxy: null,
						provides: t ? t.provides : Object.create(r.provides),
						accessCache: null,
						renderCache: [],
						components: null,
						directives: null,
						propsOptions: gr(o, r),
						emitsOptions: jn(o, r),
						emit: null,
						emitted: null,
						propsDefaults: v,
						inheritAttrs: o.inheritAttrs,
						ctx: v,
						data: v,
						props: v,
						attrs: v,
						slots: v,
						refs: v,
						setupState: v,
						setupContext: null,
						suspense: n,
						suspenseId: n ? n.pendingId : 0,
						asyncDep: null,
						asyncResolved: !1,
						isMounted: !1,
						isUnmounted: !1,
						isDeactivated: !1,
						bc: null,
						c: null,
						bm: null,
						m: null,
						bu: null,
						u: null,
						um: null,
						bum: null,
						bda: null,
						da: null,
						ba: null,
						a: null,
						rtg: null,
						rtc: null,
						ec: null,
						sp: null
					};
					i.ctx = {_: i}, i.root = t ? t.root : i, i.emit = Mn.bind(null, i), i.$pageInstance = t && t.$pageInstance, e.ce && e.ce(i);
					return i
				}(e, o, r);
				if (go(e) && (s.ctx.renderer = oe), function (e, t = !1) {
					hi = t;
					const {props: n, children: o} = e.vnode, r = fi(e);
					fr(e, n, r, t), ((e, t) => {
						if (32 & e.vnode.shapeFlag) {
							const n = t._;
							n ? (e.slots = Yt(t), G(t, "_", n)) : Sr(t, e.slots = {})
						} else e.slots = {}, t && Er(e, t);
						G(e.slots, Xr, 1)
					})(e, o);
					const i = r ? function (e, t) {
						const n = e.type;
						e.accessCache = Object.create(null), e.proxy = Jt(new Proxy(e.ctx, tr));
						const {setup: o} = n;
						if (o) {
							const n = e.setupContext = o.length > 1 ? function (e) {
								const t = t => {
									e.exposed = t || {}
								};
								let n;
								return {
									get attrs() {
										return n || (n = function (e) {
											return new Proxy(e.attrs, {get: (t, n) => (Ke(e, 0, "$attrs"), t[n])})
										}(e))
									}, slots: e.slots, emit: e.emit, expose: t
								}
							}(e) : null;
							di(e), Je();
							const r = hn(o, e, 0, [e.props, n]);
							if (Ge(), pi(), j(r)) {
								if (r.then(pi, pi), t) return r.then((n => {
									mi(e, n, t)
								})).catch((t => {
									gn(t, e, 0)
								}));
								e.asyncDep = r
							} else mi(e, r, t)
						} else gi(e, t)
					}(e, t) : void 0;
					hi = !1
				}(s), s.asyncDep) {
					if (r && r.registerDep(s, N), !e.el) {
						const e = s.subTree = Kr(jr);
						_(null, e, t, n)
					}
				} else N(s, e, t, n, r, i, a)
			}, R = (e, t, n) => {
				const o = t.component = e.component;
				if (function (e, t, n) {
					const {props: o, children: r, component: i} = e, {props: a, children: s, patchFlag: l} = t,
						c = i.emitsOptions;
					if (t.dirs || t.transition) return !0;
					if (!(n && l >= 0)) return !(!r && !s || s && s.$stable) || o !== a && (o ? !a || $n(o, a, c) : !!a);
					if (1024 & l) return !0;
					if (16 & l) return o ? $n(o, a, c) : !!a;
					if (8 & l) {
						const e = t.dynamicProps;
						for (let t = 0; t < e.length; t++) {
							const n = e[t];
							if (a[n] !== o[n] && !Rn(c, n)) return !0
						}
					}
					return !1
				}(e, t, n)) {
					if (o.asyncDep && !o.asyncResolved) return void D(o, t, n);
					o.next = t, function (e) {
						const t = yn.indexOf(e);
						t > _n && yn.splice(t, 1)
					}(o.update), o.update()
				} else t.el = e.el, o.vnode = t
			}, N = (e, t, n, o, r, i, a) => {
				const s = () => {
					if (e.isMounted) {
						let t, {next: n, bu: o, u: s, parent: l, vnode: c} = e, u = n;
						Or(e, !1), n ? (n.el = c.el, D(e, n, a)) : n = c, o && J(o), (t = n.props && n.props.onVnodeBeforeUpdate) && ai(t, l, n, c), Or(e, !0);
						const p = qn(e), f = e.subTree;
						e.subTree = p, m(f, p, d(f.el), te(f), e, r, i), n.el = p.el, null === u && function ({vnode: e, parent: t}, n) {
							for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
						}(e, p.el), s && Pr(s, r), (t = n.props && n.props.onVnodeUpdated) && Pr((() => ai(t, l, n, c)), r)
					} else {
						let a;
						const {el: s, props: l} = t, {bm: c, m: u, parent: d} = e, p = fo(t);
						if (Or(e, !1), c && J(c), !p && (a = l && l.onVnodeBeforeMount) && ai(a, d, t), Or(e, !0), s && ie) {
							const n = () => {
								e.subTree = qn(e), ie(s, e.subTree, e, r, null)
							};
							p ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
						} else {
							const a = e.subTree = qn(e);
							m(null, a, n, o, e, r, i), t.el = a.el
						}
						if (u && Pr(u, r), !p && (a = l && l.onVnodeMounted)) {
							const e = t;
							Pr((() => ai(a, d, e)), r)
						}
						const {ba: f, a: h} = e;
						(256 & t.shapeFlag || d && fo(d.vnode) && 256 & d.vnode.shapeFlag) && (f && Co(f), h && Pr(h, r), f && Pr((() => Bo(f)), r)), e.isMounted = !0, t = n = o = null
					}
				}, l = e.effect = new Qe(s, (() => An(c)), e.scope), c = e.update = () => l.run();
				c.id = e.uid, Or(e, !0), c()
			}, D = (e, t, n) => {
				t.component = e;
				const o = e.vnode.props;
				e.vnode = t, e.next = null, function (e, t, n, o) {
					const {props: r, attrs: i, vnode: {patchFlag: a}} = e, s = Yt(r), [l] = e.propsOptions;
					let c = !1;
					if (!(o || a > 0) || 16 & a) {
						let o;
						hr(e, t, r, i) && (c = !0);
						for (const i in s) t && (A(t, i) || (o = Q(i)) !== i && A(t, o)) || (l ? !n || void 0 === n[i] && void 0 === n[o] || (r[i] = mr(l, s, i, void 0, e, !0)) : delete r[i]);
						if (i !== s) for (const e in i) t && A(t, e) || (delete i[e], c = !0)
					} else if (8 & a) {
						const n = e.vnode.dynamicProps;
						for (let o = 0; o < n.length; o++) {
							let a = n[o];
							if (Rn(e.emitsOptions, a)) continue;
							const u = t[a];
							if (l) if (A(i, a)) u !== i[a] && (i[a] = u, c = !0); else {
								const t = W(a);
								r[t] = mr(l, s, t, u, e, !1)
							} else u !== i[a] && (i[a] = u, c = !0)
						}
					}
					c && et(e, "set", "$attrs")
				}(e, t.props, o, n), ((e, t, n) => {
					const {vnode: o, slots: r} = e;
					let i = !0, a = v;
					if (32 & o.shapeFlag) {
						const e = t._;
						e ? n && 1 === e ? i = !1 : (S(r, t), n || 1 !== e || delete r._) : (i = !t.$stable, Sr(t, r)), a = t
					} else t && (Er(e, t), a = {default: 1});
					if (i) for (const s in r) wr(s) || s in a || delete r[s]
				})(e, t.children, n), Je(), Bn(), Ge()
			}, z = (e, t, n, o, r, i, a, s, l = !1) => {
				const c = e && e.children, d = e ? e.shapeFlag : 0, p = t.children, {patchFlag: f, shapeFlag: h} = t;
				if (f > 0) {
					if (128 & f) return void V(c, p, n, o, r, i, a, s, l);
					if (256 & f) return void q(c, p, n, o, r, i, a, s, l)
				}
				8 & h ? (16 & d && ee(c, r, i), p !== c && u(n, p)) : 16 & d ? 16 & h ? V(c, p, n, o, r, i, a, s, l) : ee(c, r, i, !0) : (8 & d && u(n, ""), 16 & h && B(p, n, o, r, i, a, s, l))
			}, q = (e, t, n, o, r, i, a, s, l) => {
				t = t || b;
				const c = (e = e || b).length, u = t.length, d = Math.min(c, u);
				let p;
				for (p = 0; p < d; p++) {
					const o = t[p] = l ? oi(t[p]) : ni(t[p]);
					m(e[p], o, n, null, r, i, a, s, l)
				}
				c > u ? ee(e, r, i, !0, !1, d) : B(t, n, o, r, i, a, s, l, d)
			}, V = (e, t, n, o, r, i, a, s, l) => {
				let c = 0;
				const u = t.length;
				let d = e.length - 1, p = u - 1;
				for (; c <= d && c <= p;) {
					const o = e[c], u = t[c] = l ? oi(t[c]) : ni(t[c]);
					if (!Ur(o, u)) break;
					m(o, u, n, null, r, i, a, s, l), c++
				}
				for (; c <= d && c <= p;) {
					const o = e[d], c = t[p] = l ? oi(t[p]) : ni(t[p]);
					if (!Ur(o, c)) break;
					m(o, c, n, null, r, i, a, s, l), d--, p--
				}
				if (c > d) {
					if (c <= p) {
						const e = p + 1, d = e < u ? t[e].el : o;
						for (; c <= p;) m(null, t[c] = l ? oi(t[c]) : ni(t[c]), n, d, r, i, a, s, l), c++
					}
				} else if (c > p) for (; c <= d;) U(e[c], r, i, !0), c++; else {
					const f = c, h = c, g = new Map;
					for (c = h; c <= p; c++) {
						const e = t[c] = l ? oi(t[c]) : ni(t[c]);
						null != e.key && g.set(e.key, c)
					}
					let v, y = 0;
					const _ = p - h + 1;
					let w = !1, x = 0;
					const T = new Array(_);
					for (c = 0; c < _; c++) T[c] = 0;
					for (c = f; c <= d; c++) {
						const o = e[c];
						if (y >= _) {
							U(o, r, i, !0);
							continue
						}
						let u;
						if (null != o.key) u = g.get(o.key); else for (v = h; v <= p; v++) if (0 === T[v - h] && Ur(o, t[v])) {
							u = v;
							break
						}
						void 0 === u ? U(o, r, i, !0) : (T[u - h] = c + 1, u >= x ? x = u : w = !0, m(o, t[u], n, null, r, i, a, s, l), y++)
					}
					const S = w ? function (e) {
						const t = e.slice(), n = [0];
						let o, r, i, a, s;
						const l = e.length;
						for (o = 0; o < l; o++) {
							const l = e[o];
							if (0 !== l) {
								if (r = n[n.length - 1], e[r] < l) {
									t[o] = r, n.push(o);
									continue
								}
								for (i = 0, a = n.length - 1; i < a;) s = i + a >> 1, e[n[s]] < l ? i = s + 1 : a = s;
								l < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o)
							}
						}
						i = n.length, a = n[i - 1];
						for (; i-- > 0;) n[i] = a, a = t[a];
						return n
					}(T) : b;
					for (v = S.length - 1, c = _ - 1; c >= 0; c--) {
						const e = h + c, d = t[e], p = e + 1 < u ? t[e + 1].el : o;
						0 === T[c] ? m(null, d, n, p, r, i, a, s, l) : w && (v < 0 || c !== S[v] ? $(d, n, p, 2) : v--)
					}
				}
			}, $ = (e, t, o, r, i = null) => {
				const {el: a, type: s, transition: l, children: c, shapeFlag: u} = e;
				if (6 & u) return void $(e.component.subTree, t, o, r);
				if (128 & u) return void e.suspense.move(t, o, r);
				if (64 & u) return void s.move(e, t, o, oe);
				if (s === Mr) {
					n(a, t, o);
					for (let e = 0; e < c.length; e++) $(c[e], t, o, r);
					return void n(e.anchor, t, o)
				}
				if (s === Rr) return void x(e, t, o);
				if (2 !== r && 1 & u && l) if (0 === r) l.beforeEnter(a), n(a, t, o), Pr((() => l.enter(a)), i); else {
					const {leave: e, delayLeave: r, afterLeave: i} = l, s = () => n(a, t, o), c = () => {
						e(a, (() => {
							s(), i && i()
						}))
					};
					r ? r(a, s, c) : c()
				} else n(a, t, o)
			}, U = (e, t, n, o = !1, r = !1) => {
				const {type: i, props: a, ref: s, children: l, dynamicChildren: c, shapeFlag: u, patchFlag: d, dirs: p} = e;
				if (null != s && Br(s, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
				const f = 1 & u && p, h = !fo(e);
				let m;
				if (h && (m = a && a.onVnodeBeforeUnmount) && ai(m, t, e), 6 & u) K(e.component, n, o); else {
					if (128 & u) return void e.suspense.unmount(n, o);
					f && Vo(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, r, oe, o) : c && (i !== Mr || d > 0 && 64 & d) ? ee(c, t, n, !1, !0) : (i === Mr && 384 & d || !r && 16 & u) && ee(l, t, n), o && X(e)
				}
				(h && (m = a && a.onVnodeUnmounted) || f) && Pr((() => {
					m && ai(m, t, e), f && Vo(e, null, t, "unmounted")
				}), n)
			}, X = e => {
				const {type: t, el: n, anchor: r, transition: i} = e;
				if (t === Mr) return void Y(n, r);
				if (t === Rr) return void T(e);
				const a = () => {
					o(n), i && !i.persisted && i.afterLeave && i.afterLeave()
				};
				if (1 & e.shapeFlag && i && !i.persisted) {
					const {leave: t, delayLeave: o} = i, r = () => t(n, a);
					o ? o(e.el, a, r) : r()
				} else a()
			}, Y = (e, t) => {
				let n;
				for (; e !== t;) n = p(e), o(e), e = n;
				o(t)
			}, K = (e, t, n) => {
				const {bum: o, scope: r, update: i, subTree: a, um: s} = e;
				o && J(o), r.stop(), i && (i.active = !1, U(a, e, t, n)), s && Pr(s, t), Pr((() => {
					e.isUnmounted = !0
				}), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
			}, ee = (e, t, n, o = !1, r = !1, i = 0) => {
				for (let a = i; a < e.length; a++) U(e[a], t, n, o, r)
			},
			te = e => 6 & e.shapeFlag ? te(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : p(e.anchor || e.el),
			ne = (e, t, n) => {
				null == e ? t._vnode && U(t._vnode, null, null, !0) : m(t._vnode || null, e, t, null, null, null, n), Bn(), Pn(), t._vnode = e
			}, oe = {p: m, um: U, m: $, r: X, mt: F, mc: B, pc: z, pbc: L, n: te, o: e};
		let re, ie;
		t && ([re, ie] = t(oe));
		return {render: ne, hydrate: re, createApp: Cr(ne, re)}
	}(e)
}

function Or({effect: e, update: t}, n) {
	e.allowRecurse = t.allowRecurse = n
}

function Ir(e, t, n = !1) {
	const o = e.children, r = t.children;
	if (C(o) && C(r)) for (let i = 0; i < o.length; i++) {
		const e = o[i];
		let t = r[i];
		1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = r[i] = oi(r[i]), t.el = e.el), n || Ir(e, t)), t.type === Fr && (t.el = e.el)
	}
}

const Mr = Symbol(void 0), Fr = Symbol(void 0), jr = Symbol(void 0), Rr = Symbol(void 0), Nr = [];
let Dr = null;

function zr(e = !1) {
	Nr.push(Dr = e ? null : [])
}

let Hr = 1;

function qr(e) {
	Hr += e
}

function Vr(e) {
	return e.dynamicChildren = Hr > 0 ? Dr || b : null, Nr.pop(), Dr = Nr[Nr.length - 1] || null, Hr > 0 && Dr && Dr.push(e), e
}

function Wr(e, t, n, o, r, i) {
	return Vr(Gr(e, t, n, o, r, i, !0))
}

function $r(e, t, n, o, r) {
	return Vr(Kr(e, t, n, o, r, !0))
}

function Qr(e) {
	return !!e && !0 === e.__v_isVNode
}

function Ur(e, t) {
	return e.type === t.type && e.key === t.key
}

const Xr = "__vInternal", Yr = ({key: e}) => null != e ? e : null,
	Jr = ({ref: e, ref_key: t, ref_for: n}) => null != e ? I(e) || tn(e) || O(e) ? {
		i: Nn,
		r: e,
		k: t,
		f: !!n
	} : e : null;

function Gr(e, t = null, n = null, o = 0, r = null, i = (e === Mr ? 0 : 1), a = !1, s = !1) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Yr(t),
		ref: t && Jr(t),
		scopeId: Dn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: i,
		patchFlag: o,
		dynamicProps: r,
		dynamicChildren: null,
		appContext: null,
		ctx: Nn
	};
	return s ? (ri(l, n), 128 & i && e.normalize(l)) : n && (l.shapeFlag |= I(n) ? 8 : 16), Hr > 0 && !a && Dr && (l.patchFlag > 0 || 6 & i) && 32 !== l.patchFlag && Dr.push(l), l
}

const Kr = function (e, t = null, n = null, o = 0, r = null, a = !1) {
	e && e !== $o || (e = jr);
	if (Qr(e)) {
		const o = Zr(e, t, !0);
		return n && ri(o, n), Hr > 0 && !a && Dr && (6 & o.shapeFlag ? Dr[Dr.indexOf(e)] = o : Dr.push(o)), o.patchFlag |= -2, o
	}
	s = e, O(s) && "__vccOpts" in s && (e = e.__vccOpts);
	var s;
	if (t) {
		t = function (e) {
			return e ? Xt(e) || Xr in e ? S({}, e) : e : null
		}(t);
		let {class: e, style: n} = t;
		e && !I(e) && (t.class = u(e)), F(n) && (Xt(n) && !C(n) && (n = S({}, n)), t.style = i(n))
	}
	const l = I(e) ? 1 : Qn(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : F(e) ? 4 : O(e) ? 2 : 0;
	return Gr(e, t, n, o, r, l, a, !0)
};

function Zr(e, t, n = !1) {
	const {props: o, ref: r, patchFlag: i, children: a} = e, s = t ? ii(o || {}, t) : o;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: s,
		key: s && Yr(s),
		ref: t && t.ref ? n && r ? C(r) ? r.concat(Jr(t)) : [r, Jr(t)] : Jr(t) : r,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: a,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Mr ? -1 === i ? 16 : 16 | i : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Zr(e.ssContent),
		ssFallback: e.ssFallback && Zr(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	}
}

function ei(e = " ", t = 0) {
	return Kr(Fr, null, e, t)
}

function ti(e = "", t = !1) {
	return t ? (zr(), $r(jr, null, e)) : Kr(jr, null, e)
}

function ni(e) {
	return null == e || "boolean" == typeof e ? Kr(jr) : C(e) ? Kr(Mr, null, e.slice()) : "object" == typeof e ? oi(e) : Kr(Fr, null, String(e))
}

function oi(e) {
	return null === e.el && -1 !== e.patchFlag || e.memo ? e : Zr(e)
}

function ri(e, t) {
	let n = 0;
	const {shapeFlag: o} = e;
	if (null == t) t = null; else if (C(t)) n = 16; else if ("object" == typeof t) {
		if (65 & o) {
			const n = t.default;
			return void (n && (n._c && (n._d = !1), ri(e, n()), n._c && (n._d = !0)))
		}
		{
			n = 32;
			const o = t._;
			o || Xr in t ? 3 === o && Nn && (1 === Nn.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Nn
		}
	} else O(t) ? (t = {default: t, _ctx: Nn}, n = 32) : (t = String(t), 64 & o ? (n = 16, t = [ei(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n
}

function ii(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const o = e[n];
		for (const e in o) if ("class" === e) t.class !== o.class && (t.class = u([t.class, o.class])); else if ("style" === e) t.style = i([t.style, o.style]); else if (x(e)) {
			const n = t[e], r = o[e];
			!r || n === r || C(n) && n.includes(r) || (t[e] = n ? [].concat(n, r) : r)
		} else "" !== e && (t[e] = o[e])
	}
	return t
}

function ai(e, t, n, o = null) {
	mn(e, t, 7, [n, o])
}

const si = kr();
let li = 0;
let ci = null;
const ui = () => ci || Nn, di = e => {
	ci = e, e.scope.on()
}, pi = () => {
	ci && ci.scope.off(), ci = null
};

function fi(e) {
	return 4 & e.vnode.shapeFlag
}

let hi = !1;

function mi(e, t, n) {
	O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : F(t) && (e.setupState = cn(t)), gi(e, n)
}

function gi(e, t, n) {
	const o = e.type;
	e.render || (e.render = o.render || y), di(e), Je(), or(e), Ge(), pi()
}

function vi(e) {
	if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(cn(Jt(e.exposed)), {
		get: (t, n) => n in t ? t[n] : n in Zo ? Zo[n](e) : void 0,
		has: (e, t) => t in e || t in Zo
	}))
}

function bi(e, t = !0) {
	return O(e) ? e.displayName || e.name : e.name || t && e.__name
}

const yi = (e, t) => function (e, t, n = !1) {
	let o, r;
	const i = O(e);
	return i ? (o = e, r = y) : (o = e.get, r = e.set), new fn(o, r, i || !r, n)
}(e, 0, hi);

function _i(e, t, n) {
	const o = arguments.length;
	return 2 === o ? F(t) && !C(t) ? Qr(t) ? Kr(e, null, [t]) : Kr(e, t) : Kr(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === o && Qr(n) && (n = [n]), Kr(e, t, n))
}

const wi = Symbol(""), xi = () => Xn(wi), Ti = "3.2.47", Si = "undefined" != typeof document ? document : null,
	Ei = Si && Si.createElement("template"), ki = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null)
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e)
		},
		createElement: (e, t, n, o) => {
			const r = t ? Si.createElementNS("http://www.w3.org/2000/svg", e) : Si.createElement(e, n ? {is: n} : void 0);
			return "select" === e && o && null != o.multiple && r.setAttribute("multiple", o.multiple), r
		},
		createText: e => Si.createTextNode(e),
		createComment: e => Si.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t
		},
		setElementText: (e, t) => {
			e.textContent = t
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => Si.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "")
		},
		insertStaticContent(e, t, n, o, r, i) {
			const a = n ? n.previousSibling : t.lastChild;
			if (r && (r === i || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), r !== i && (r = r.nextSibling);) ; else {
				Ei.innerHTML = o ? `<svg>${e}</svg>` : e;
				const r = Ei.content;
				if (o) {
					const e = r.firstChild;
					for (; e.firstChild;) r.appendChild(e.firstChild);
					r.removeChild(e)
				}
				t.insertBefore(r, n)
			}
			return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
		}
	};
const Ai = /\s*!important$/;

function Ci(e, t, n) {
	if (C(n)) n.forEach((n => Ci(e, t, n))); else if (null == n && (n = ""), n = Ni(n), t.startsWith("--")) e.setProperty(t, n); else {
		const o = function (e, t) {
			const n = Pi[t];
			if (n) return n;
			let o = W(t);
			if ("filter" !== o && o in e) return Pi[t] = o;
			o = U(o);
			for (let r = 0; r < Bi.length; r++) {
				const n = Bi[r] + o;
				if (n in e) return Pi[t] = n
			}
			return t
		}(e, t);
		Ai.test(n) ? e.setProperty(Q(o), n.replace(Ai, ""), "important") : e[o] = n
	}
}

const Bi = ["Webkit", "Moz", "ms"], Pi = {};
const {unit: Li, unitRatio: Oi, unitPrecision: Ii} = {unit: "rem", unitRatio: 10 / 320, unitPrecision: 5},
	Mi = (Fi = Li, ji = Oi, Ri = Ii, e => e.replace(me, ((e, t) => {
		if (!t) return e;
		if (1 === ji) return `${t}${Fi}`;
		const n = function (e, t) {
			const n = Math.pow(10, t + 1), o = Math.floor(e * n);
			return 10 * Math.round(o / 10) / n
		}(parseFloat(t) * ji, Ri);
		return 0 === n ? "0" : `${n}${Fi}`
	})));
var Fi, ji, Ri;
const Ni = e => I(e) ? Mi(e) : e, Di = "http://www.w3.org/1999/xlink";

function zi(e, t, n, o) {
	e.addEventListener(t, n, o)
}

function Hi(e, t, n, o, r = null) {
	const i = e._vei || (e._vei = {}), a = i[t];
	if (o && a) a.value = o; else {
		const [n, s] = function (e) {
			let t;
			if (qi.test(e)) {
				let n;
				for (t = {}; n = e.match(qi);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
			}
			return [":" === e[2] ? e.slice(3) : Q(e.slice(2)), t]
		}(t);
		if (o) {
			const a = i[t] = function (e, t) {
				const n = e => {
					if (e._vts) {
						if (e._vts <= n.attached) return
					} else e._vts = Date.now();
					const o = t && t.proxy, r = o && o.$nne, {value: i} = n;
					if (r && C(i)) {
						const n = $i(e, i);
						for (let o = 0; o < n.length; o++) {
							const i = n[o];
							mn(i, t, 5, i.__wwe ? [e] : r(e))
						}
					} else mn($i(e, i), t, 5, r && !i.__wwe ? r(e, i, t) : [e])
				};
				return n.value = e, n.attached = (() => Vi || (Wi.then((() => Vi = 0)), Vi = Date.now()))(), n
			}(o, r);
			zi(e, n, a, s)
		} else a && (!function (e, t, n, o) {
			e.removeEventListener(t, n, o)
		}(e, n, a, s), i[t] = void 0)
	}
}

const qi = /(?:Once|Passive|Capture)$/;
let Vi = 0;
const Wi = Promise.resolve();

function $i(e, t) {
	if (C(t)) {
		const n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0
		}, t.map((e => {
			const t = t => !t._stopped && e && e(t);
			return t.__wwe = e.__wwe, t
		}))
	}
	return t
}

const Qi = /^on[a-z]/;
const Ui = "transition", Xi = (e, {slots: t}) => _i(ro, function (e) {
	const t = {};
	for (const S in e) S in Yi || (t[S] = e[S]);
	if (!1 === e.css) return t;
	const {name: n = "v", type: o, duration: r, enterFromClass: i = `${n}-enter-from`, enterActiveClass: a = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: l = i, appearActiveClass: c = a, appearToClass: u = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: f = `${n}-leave-to`} = e,
		h = function (e) {
			if (null == e) return null;
			if (F(e)) return [Ki(e.enter), Ki(e.leave)];
			{
				const t = Ki(e);
				return [t, t]
			}
		}(r), m = h && h[0],
		g = h && h[1], {onBeforeEnter: v, onEnter: b, onEnterCancelled: y, onLeave: _, onLeaveCancelled: w, onBeforeAppear: x = v, onAppear: T = b, onAppearCancelled: E = y} = t,
		k = (e, t, n) => {
			ea(e, t ? u : s), ea(e, t ? c : a), n && n()
		}, A = (e, t) => {
			e._isLeaving = !1, ea(e, d), ea(e, f), ea(e, p), t && t()
		}, C = e => (t, n) => {
			const r = e ? T : b, a = () => k(t, e, n);
			Ji(r, [t, a]), ta((() => {
				ea(t, e ? l : i), Zi(t, e ? u : s), Gi(r) || oa(t, o, m, a)
			}))
		};
	return S(t, {
		onBeforeEnter(e) {
			Ji(v, [e]), Zi(e, i), Zi(e, a)
		}, onBeforeAppear(e) {
			Ji(x, [e]), Zi(e, l), Zi(e, c)
		}, onEnter: C(!1), onAppear: C(!0), onLeave(e, t) {
			e._isLeaving = !0;
			const n = () => A(e, t);
			Zi(e, d), document.body.offsetHeight, Zi(e, p), ta((() => {
				e._isLeaving && (ea(e, d), Zi(e, f), Gi(_) || oa(e, o, g, n))
			})), Ji(_, [e, n])
		}, onEnterCancelled(e) {
			k(e, !1), Ji(y, [e])
		}, onAppearCancelled(e) {
			k(e, !0), Ji(E, [e])
		}, onLeaveCancelled(e) {
			A(e), Ji(w, [e])
		}
	})
}(e), t);
Xi.displayName = "Transition";
const Yi = {
	name: String,
	type: String,
	css: {type: Boolean, default: !0},
	duration: [String, Number, Object],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
};
Xi.props = S({}, oo, Yi);
const Ji = (e, t = []) => {
	C(e) ? e.forEach((e => e(...t))) : e && e(...t)
}, Gi = e => !!e && (C(e) ? e.some((e => e.length > 1)) : e.length > 1);

function Ki(e) {
	const t = (e => {
		const t = I(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t
	})(e);
	return t
}

function Zi(e, t) {
	t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set)).add(t)
}

function ea(e, t) {
	t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
	const {_vtc: n} = e;
	n && (n.delete(t), n.size || (e._vtc = void 0))
}

function ta(e) {
	requestAnimationFrame((() => {
		requestAnimationFrame(e)
	}))
}

let na = 0;

function oa(e, t, n, o) {
	const r = e._endId = ++na, i = () => {
		r === e._endId && o()
	};
	if (n) return setTimeout(i, n);
	const {type: a, timeout: s, propCount: l} = function (e, t) {
		const n = window.getComputedStyle(e), o = e => (n[e] || "").split(", "), r = o("transitionDelay"),
			i = o("transitionDuration"), a = ra(r, i), s = o("animationDelay"), l = o("animationDuration"),
			c = ra(s, l);
		let u = null, d = 0, p = 0;
		t === Ui ? a > 0 && (u = Ui, d = a, p = i.length) : "animation" === t ? c > 0 && (u = "animation", d = c, p = l.length) : (d = Math.max(a, c), u = d > 0 ? a > c ? Ui : "animation" : null, p = u ? u === Ui ? i.length : l.length : 0);
		const f = u === Ui && /\b(transform|all)(,|$)/.test(o("transitionProperty").toString());
		return {type: u, timeout: d, propCount: p, hasTransform: f}
	}(e, t);
	if (!a) return o();
	const c = a + "end";
	let u = 0;
	const d = () => {
		e.removeEventListener(c, p), i()
	}, p = t => {
		t.target === e && ++u >= l && d()
	};
	setTimeout((() => {
		u < l && d()
	}), s + 1), e.addEventListener(c, p)
}

function ra(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map(((t, n) => ia(t) + ia(e[n]))))
}

function ia(e) {
	return 1e3 * Number(e.slice(0, -1).replace(",", "."))
}

const aa = e => {
	const t = e.props["onUpdate:modelValue"] || !1;
	return C(t) ? e => J(t, e) : t
};

function sa(e) {
	e.target.composing = !0
}

function la(e) {
	const t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}

const ca = {
	created(e, {modifiers: {lazy: t, trim: n, number: o}}, r) {
		e._assign = aa(r);
		const i = o || r.props && "number" === r.props.type;
		zi(e, t ? "change" : "input", (t => {
			if (t.target.composing) return;
			let o = e.value;
			n && (o = o.trim()), i && (o = K(o)), e._assign(o)
		})), n && zi(e, "change", (() => {
			e.value = e.value.trim()
		})), t || (zi(e, "compositionstart", sa), zi(e, "compositionend", la), zi(e, "change", la))
	}, mounted(e, {value: t}) {
		e.value = null == t ? "" : t
	}, beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: o, number: r}}, i) {
		if (e._assign = aa(i), e.composing) return;
		if (document.activeElement === e && "range" !== e.type) {
			if (n) return;
			if (o && e.value.trim() === t) return;
			if ((r || "number" === e.type) && K(e.value) === t) return
		}
		const a = null == t ? "" : t;
		e.value !== a && (e.value = a)
	}
}, ua = {
	deep: !0, created(e, t, n) {
		e._assign = aa(n), zi(e, "change", (() => {
			const t = e._modelValue, n = ma(e), o = e.checked, r = e._assign;
			if (C(t)) {
				const e = h(t, n), i = -1 !== e;
				if (o && !i) r(t.concat(n)); else if (!o && i) {
					const n = [...t];
					n.splice(e, 1), r(n)
				}
			} else if (P(t)) {
				const e = new Set(t);
				o ? e.add(n) : e.delete(n), r(e)
			} else r(ga(e, o))
		}))
	}, mounted: da, beforeUpdate(e, t, n) {
		e._assign = aa(n), da(e, t, n)
	}
};

function da(e, {value: t, oldValue: n}, o) {
	e._modelValue = t, C(t) ? e.checked = h(t, o.props.value) > -1 : P(t) ? e.checked = t.has(o.props.value) : t !== n && (e.checked = f(t, ga(e, !0)))
}

const pa = {
	created(e, {value: t}, n) {
		e.checked = f(t, n.props.value), e._assign = aa(n), zi(e, "change", (() => {
			e._assign(ma(e))
		}))
	}, beforeUpdate(e, {value: t, oldValue: n}, o) {
		e._assign = aa(o), t !== n && (e.checked = f(t, o.props.value))
	}
}, fa = {
	deep: !0, created(e, {value: t, modifiers: {number: n}}, o) {
		const r = P(t);
		zi(e, "change", (() => {
			const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => n ? K(ma(e)) : ma(e)));
			e._assign(e.multiple ? r ? new Set(t) : t : t[0])
		})), e._assign = aa(o)
	}, mounted(e, {value: t}) {
		ha(e, t)
	}, beforeUpdate(e, t, n) {
		e._assign = aa(n)
	}, updated(e, {value: t}) {
		ha(e, t)
	}
};

function ha(e, t) {
	const n = e.multiple;
	if (!n || C(t) || P(t)) {
		for (let o = 0, r = e.options.length; o < r; o++) {
			const r = e.options[o], i = ma(r);
			if (n) C(t) ? r.selected = h(t, i) > -1 : r.selected = t.has(i); else if (f(ma(r), t)) return void (e.selectedIndex !== o && (e.selectedIndex = o))
		}
		n || -1 === e.selectedIndex || (e.selectedIndex = -1)
	}
}

function ma(e) {
	return "_value" in e ? e._value : e.value
}

function ga(e, t) {
	const n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t
}

const va = {
	created(e, t, n) {
		ba(e, t, n, null, "created")
	}, mounted(e, t, n) {
		ba(e, t, n, null, "mounted")
	}, beforeUpdate(e, t, n, o) {
		ba(e, t, n, o, "beforeUpdate")
	}, updated(e, t, n, o) {
		ba(e, t, n, o, "updated")
	}
};

function ba(e, t, n, o, r) {
	const i = function (e, t) {
		switch (e) {
			case"SELECT":
				return fa;
			case"TEXTAREA":
				return ca;
			default:
				switch (t) {
					case"checkbox":
						return ua;
					case"radio":
						return pa;
					default:
						return ca
				}
		}
	}(e.tagName, n.props && n.props.type)[r];
	i && i(e, t, n, o)
}

const ya = ["ctrl", "shift", "alt", "meta"], _a = {
	stop: e => e.stopPropagation(),
	prevent: e => e.preventDefault(),
	self: e => e.target !== e.currentTarget,
	ctrl: e => !e.ctrlKey,
	shift: e => !e.shiftKey,
	alt: e => !e.altKey,
	meta: e => !e.metaKey,
	left: e => "button" in e && 0 !== e.button,
	middle: e => "button" in e && 1 !== e.button,
	right: e => "button" in e && 2 !== e.button,
	exact: (e, t) => ya.some((n => e[`${n}Key`] && !t.includes(n)))
}, wa = (e, t) => (n, ...o) => {
	for (let e = 0; e < t.length; e++) {
		const o = _a[t[e]];
		if (o && o(n, t)) return
	}
	return e(n, ...o)
}, xa = {
	beforeMount(e, {value: t}, {transition: n}) {
		e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ta(e, t)
	}, mounted(e, {value: t}, {transition: n}) {
		n && t && n.enter(e)
	}, updated(e, {value: t, oldValue: n}, {transition: o}) {
		!t != !n && (o ? t ? (o.beforeEnter(e), Ta(e, !0), o.enter(e)) : o.leave(e, (() => {
			Ta(e, !1)
		})) : Ta(e, t))
	}, beforeUnmount(e, {value: t}) {
		Ta(e, t)
	}
};

function Ta(e, t) {
	e.style.display = t ? e._vod : "none"
}

const Sa = S({
	patchProp: (e, t, n, o, r = !1, i, a, s, l) => {
		if (0 === t.indexOf("change:")) return function (e, t, n, o = null) {
			if (!n || !o) return;
			const r = t.replace("change:", ""), {attrs: i} = o, a = i[r], s = (e.__wxsProps || (e.__wxsProps = {}))[r];
			if (s === a) return;
			e.__wxsProps[r] = a;
			const l = o.proxy;
			kn((() => {
				n(a, s, l.$gcd(l, !0), l.$gcd(l, !1))
			}))
		}(e, t, o, a);
		"class" === t ? function (e, t, n) {
			const {__wxsAddClass: o, __wxsRemoveClass: r} = e;
			r && r.length && (t = (t || "").split(/\s+/).filter((e => -1 === r.indexOf(e))).join(" "), r.length = 0), o && o.length && (t = (t || "") + " " + o.join(" "));
			const i = e._vtc;
			i && (t = (t ? [t, ...i] : [...i]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
		}(e, o, r) : "style" === t ? function (e, t, n) {
			const o = e.style, r = I(n);
			if (n && !r) {
				if (t && !I(t)) for (const e in t) null == n[e] && Ci(o, e, "");
				for (const e in n) Ci(o, e, n[e])
			} else {
				const i = o.display;
				r ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = i)
			}
			const {__wxsStyle: i} = e;
			if (i) for (const a in i) Ci(o, a, i[a])
		}(e, n, o) : x(t) ? T(t) || Hi(e, t, 0, o, a) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function (e, t, n, o) {
			if (o) return "innerHTML" === t || "textContent" === t || !!(t in e && Qi.test(t) && O(n));
			if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
			if ("form" === t) return !1;
			if ("list" === t && "INPUT" === e.tagName) return !1;
			if ("type" === t && "TEXTAREA" === e.tagName) return !1;
			if (Qi.test(t) && I(n)) return !1;
			return t in e
		}(e, t, o, r)) ? function (e, t, n, o, r, i, a) {
			if ("innerHTML" === t || "textContent" === t) return o && a(o, r, i), void (e[t] = null == n ? "" : n);
			if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
				e._value = n;
				const o = null == n ? "" : n;
				return e.value === o && "OPTION" !== e.tagName || (e.value = o), void (null == n && e.removeAttribute(t))
			}
			let s = !1;
			if ("" === n || null == n) {
				const o = typeof e[t];
				"boolean" === o ? n = p(n) : null == n && "string" === o ? (n = "", s = !0) : "number" === o && (n = 0, s = !0)
			}
			try {
				e[t] = n
			} catch (l) {
			}
			s && e.removeAttribute(t)
		}(e, t, o, i, a, s, l) : ("true-value" === t ? e._trueValue = o : "false-value" === t && (e._falseValue = o), function (e, t, n, o, r) {
			if (o && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(Di, t.slice(6, t.length)) : e.setAttributeNS(Di, t, n); else {
				const o = d(t);
				null == n || o && !p(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
			}
		}(e, t, o, r))
	},
	forcePatchProp: (e, t) => 0 === t.indexOf("change:") || ("class" === t && e.__wxsClassChanged ? (e.__wxsClassChanged = !1, !0) : !("style" !== t || !e.__wxsStyleChanged) && (e.__wxsStyleChanged = !1, !0))
}, ki);
let Ea;
const ka = (...e) => {
	const t = (Ea || (Ea = Lr(Sa))).createApp(...e), {mount: n} = t;
	return t.mount = e => {
		const o = function (e) {
			if (I(e)) {
				return document.querySelector(e)
			}
			return e
		}(e);
		if (!o) return;
		const r = t._component;
		O(r) || r.render || r.template || (r.template = o.innerHTML), o.innerHTML = "";
		const i = n(o, !1, o instanceof SVGElement);
		return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i
	}, t
};
const Aa = ["{", "}"];
const Ca = /^(?:\d)+/, Ba = /^(?:\w)+/;
const Pa = Object.prototype.hasOwnProperty, La = (e, t) => Pa.call(e, t), Oa = new class {
	constructor() {
		this._caches = Object.create(null)
	}

	interpolate(e, t, n = Aa) {
		if (!t) return [e];
		let o = this._caches[e];
		return o || (o = function (e, [t, n]) {
			const o = [];
			let r = 0, i = "";
			for (; r < e.length;) {
				let a = e[r++];
				if (a === t) {
					i && o.push({type: "text", value: i}), i = "";
					let t = "";
					for (a = e[r++]; void 0 !== a && a !== n;) t += a, a = e[r++];
					const s = a === n, l = Ca.test(t) ? "list" : s && Ba.test(t) ? "named" : "unknown";
					o.push({value: t, type: l})
				} else i += a
			}
			return i && o.push({type: "text", value: i}), o
		}(e, n), this._caches[e] = o), function (e, t) {
			const n = [];
			let o = 0;
			const r = Array.isArray(t) ? "list" : (i = t, null !== i && "object" == typeof i ? "named" : "unknown");
			var i;
			if ("unknown" === r) return n;
			for (; o < e.length;) {
				const i = e[o];
				switch (i.type) {
					case"text":
						n.push(i.value);
						break;
					case"list":
						n.push(t[parseInt(i.value, 10)]);
						break;
					case"named":
						"named" === r && n.push(t[i.value])
				}
				o++
			}
			return n
		}(o, t)
	}
};

function Ia(e, t) {
	if (!e) return;
	if (e = e.trim().replace(/_/g, "-"), t && t[e]) return e;
	if ("chinese" === (e = e.toLowerCase())) return "zh-Hans";
	if (0 === e.indexOf("zh")) return e.indexOf("-hans") > -1 ? "zh-Hans" : e.indexOf("-hant") > -1 ? "zh-Hant" : (n = e, ["-tw", "-hk", "-mo", "-cht"].find((e => -1 !== n.indexOf(e))) ? "zh-Hant" : "zh-Hans");
	var n;
	let o = ["en", "fr", "es"];
	t && Object.keys(t).length > 0 && (o = Object.keys(t));
	const r = function (e, t) {
		return t.find((t => 0 === e.indexOf(t)))
	}(e, o);
	return r || void 0
}

class Ma {
	constructor({locale: e, fallbackLocale: t, messages: n, watcher: o, formater: r}) {
		this.locale = "en", this.fallbackLocale = "en", this.message = {}, this.messages = {}, this.watchers = [], t && (this.fallbackLocale = t), this.formater = r || Oa, this.messages = n || {}, this.setLocale(e || "en"), o && this.watchLocale(o)
	}

	setLocale(e) {
		const t = this.locale;
		this.locale = Ia(e, this.messages) || this.fallbackLocale, this.messages[this.locale] || (this.messages[this.locale] = {}), this.message = this.messages[this.locale], t !== this.locale && this.watchers.forEach((e => {
			e(this.locale, t)
		}))
	}

	getLocale() {
		return this.locale
	}

	watchLocale(e) {
		const t = this.watchers.push(e) - 1;
		return () => {
			this.watchers.splice(t, 1)
		}
	}

	add(e, t, n = !0) {
		const o = this.messages[e];
		o ? n ? Object.assign(o, t) : Object.keys(t).forEach((e => {
			La(o, e) || (o[e] = t[e])
		})) : this.messages[e] = t
	}

	f(e, t, n) {
		return this.formater.interpolate(e, t, n).join("")
	}

	t(e, t, n) {
		let o = this.message;
		return "string" == typeof t ? (t = Ia(t, this.messages)) && (o = this.messages[t]) : n = t, La(o, e) ? this.formater.interpolate(o[e], n).join("") : (console.warn(`Cannot translate the value of keypath ${e}. Use the value of keypath as default.`), e)
	}
}

function Fa(e, t = {}, n, o) {
	"string" != typeof e && ([e, t] = [t, e]), "string" != typeof e && (e = "undefined" != typeof uni && Ud ? Ud() : "undefined" != typeof global && global.getLocale ? global.getLocale() : "en"), "string" != typeof n && (n = "undefined" != typeof __uniConfig && __uniConfig.fallbackLocale || "en");
	const r = new Ma({locale: e, fallbackLocale: n, messages: t, watcher: o});
	let i = (e, t) => {
		{
			let e = !1;
			i = function (t, n) {
				const o = dm().$vm;
				return o && (o.$locale, e || (e = !0, function (e, t) {
					e.$watchLocale ? e.$watchLocale((e => {
						t.setLocale(e)
					})) : e.$watch((() => e.$locale), (e => {
						t.setLocale(e)
					}))
				}(o, r))), r.t(t, n)
			}
		}
		return i(e, t)
	};
	return {
		i18n: r,
		f: (e, t, n) => r.f(e, t, n),
		t: (e, t) => i(e, t),
		add: (e, t, n = !0) => r.add(e, t, n),
		watch: e => r.watchLocale(e),
		getLocale: () => r.getLocale(),
		setLocale: e => r.setLocale(e)
	}
}

function ja(e, t) {
	return e.indexOf(t[0]) > -1
}

/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const Ra = "undefined" != typeof window;
const Na = Object.assign;

function Da(e, t) {
	const n = {};
	for (const o in t) {
		const r = t[o];
		n[o] = Ha(r) ? r.map(e) : e(r)
	}
	return n
}

const za = () => {
}, Ha = Array.isArray, qa = /\/$/;

function Va(e, t, n = "/") {
	let o, r = {}, i = "", a = "";
	const s = t.indexOf("#");
	let l = t.indexOf("?");
	return s < l && s >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), i = t.slice(l + 1, s > -1 ? s : t.length), r = e(i)), s > -1 && (o = o || t.slice(0, s), a = t.slice(s, t.length)), o = function (e, t) {
		if (e.startsWith("/")) return e;
		if (!e) return t;
		const n = t.split("/"), o = e.split("/");
		let r, i, a = n.length - 1;
		for (r = 0; r < o.length; r++) if (i = o[r], "." !== i) {
			if (".." !== i) break;
			a > 1 && a--
		}
		return n.slice(0, a).join("/") + "/" + o.slice(r - (r === o.length ? 1 : 0)).join("/")
	}(null != o ? o : t, n), {fullPath: o + (i && "?") + i + a, path: o, query: r, hash: a}
}

function Wa(e, t) {
	return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}

function $a(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t)
}

function Qa(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const n in e) if (!Ua(e[n], t[n])) return !1;
	return !0
}

function Ua(e, t) {
	return Ha(e) ? Xa(e, t) : Ha(t) ? Xa(t, e) : e === t
}

function Xa(e, t) {
	return Ha(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}

var Ya, Ja, Ga, Ka;

function Za(e) {
	if (!e) if (Ra) {
		const t = document.querySelector("base");
		e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
	} else e = "/";
	return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(qa, "")
}

(Ja = Ya || (Ya = {})).pop = "pop", Ja.push = "push", (Ka = Ga || (Ga = {})).back = "back", Ka.forward = "forward", Ka.unknown = "";
const es = /^[^#]+#/;

function ts(e, t) {
	return e.replace(es, "#") + t
}

const ns = () => ({left: window.pageXOffset, top: window.pageYOffset});

function os(e) {
	let t;
	if ("el" in e) {
		const n = e.el, o = "string" == typeof n && n.startsWith("#"),
			r = "string" == typeof n ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
		if (!r) return;
		t = function (e, t) {
			const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
			return {behavior: t.behavior, left: o.left - n.left - (t.left || 0), top: o.top - n.top - (t.top || 0)}
		}(r, e)
	} else t = e;
	"scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}

function rs(e, t) {
	return (history.state ? history.state.position - t : -1) + e
}

const is = new Map;

function as(e, t) {
	const {pathname: n, search: o, hash: r} = t, i = e.indexOf("#");
	if (i > -1) {
		let t = r.includes(e.slice(i)) ? e.slice(i).length : 1, n = r.slice(t);
		return "/" !== n[0] && (n = "/" + n), Wa(n, "")
	}
	return Wa(n, e) + o + r
}

function ss(e, t, n, o = !1, r = !1) {
	return {back: e, current: t, forward: n, replaced: o, position: window.history.length, scroll: r ? ns() : null}
}

function ls(e) {
	const {history: t, location: n} = window, o = {value: as(e, n)}, r = {value: t.state};

	function i(o, i, a) {
		const s = e.indexOf("#"),
			l = s > -1 ? (n.host && document.querySelector("base") ? e : e.slice(s)) + o : location.protocol + "//" + location.host + e + o;
		try {
			t[a ? "replaceState" : "pushState"](i, "", l), r.value = i
		} catch (c) {
			console.error(c), n[a ? "replace" : "assign"](l)
		}
	}

	return r.value || i(o.value, {
		back: null,
		current: o.value,
		forward: null,
		position: t.length - 1,
		replaced: !0,
		scroll: null
	}, !0), {
		location: o, state: r, push: function (e, n) {
			const a = Na({}, r.value, t.state, {forward: e, scroll: ns()});
			i(a.current, a, !0), i(e, Na({}, ss(o.value, e, null), {position: a.position + 1}, n), !1), o.value = e
		}, replace: function (e, n) {
			i(e, Na({}, t.state, ss(r.value.back, e, r.value.forward, !0), n, {position: r.value.position}), !0), o.value = e
		}
	}
}

function cs(e) {
	const t = ls(e = Za(e)), n = function (e, t, n, o) {
		let r = [], i = [], a = null;
		const s = ({state: i}) => {
			const s = as(e, location), l = n.value, c = t.value;
			let u = 0;
			if (i) {
				if (n.value = s, t.value = i, a && a === l) return void (a = null);
				u = c ? i.position - c.position : 0
			} else o(s);
			r.forEach((e => {
				e(n.value, l, {delta: u, type: Ya.pop, direction: u ? u > 0 ? Ga.forward : Ga.back : Ga.unknown})
			}))
		};

		function l() {
			const {history: e} = window;
			e.state && e.replaceState(Na({}, e.state, {scroll: ns()}), "")
		}

		return window.addEventListener("popstate", s), window.addEventListener("beforeunload", l), {
			pauseListeners: function () {
				a = n.value
			}, listen: function (e) {
				r.push(e);
				const t = () => {
					const t = r.indexOf(e);
					t > -1 && r.splice(t, 1)
				};
				return i.push(t), t
			}, destroy: function () {
				for (const e of i) e();
				i = [], window.removeEventListener("popstate", s), window.removeEventListener("beforeunload", l)
			}
		}
	}(e, t.state, t.location, t.replace);
	const o = Na({
		location: "", base: e, go: function (e, t = !0) {
			t || n.pauseListeners(), history.go(e)
		}, createHref: ts.bind(null, e)
	}, t, n);
	return Object.defineProperty(o, "location", {
		enumerable: !0,
		get: () => t.location.value
	}), Object.defineProperty(o, "state", {enumerable: !0, get: () => t.state.value}), o
}

function us(e) {
	return "string" == typeof e || "symbol" == typeof e
}

const ds = {
	path: "/",
	name: void 0,
	params: {},
	query: {},
	hash: "",
	fullPath: "/",
	matched: [],
	meta: {},
	redirectedFrom: void 0
}, ps = Symbol("");
var fs, hs;

function ms(e, t) {
	return Na(new Error, {type: e, [ps]: !0}, t)
}

function gs(e, t) {
	return e instanceof Error && ps in e && (null == t || !!(e.type & t))
}

(hs = fs || (fs = {}))[hs.aborted = 4] = "aborted", hs[hs.cancelled = 8] = "cancelled", hs[hs.duplicated = 16] = "duplicated";
const vs = {sensitive: !1, strict: !1, start: !0, end: !0}, bs = /[.+*?^${}()[\]/\\]/g;

function ys(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length;) {
		const o = t[n] - e[n];
		if (o) return o;
		n++
	}
	return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}

function _s(e, t) {
	let n = 0;
	const o = e.score, r = t.score;
	for (; n < o.length && n < r.length;) {
		const e = ys(o[n], r[n]);
		if (e) return e;
		n++
	}
	if (1 === Math.abs(r.length - o.length)) {
		if (ws(o)) return 1;
		if (ws(r)) return -1
	}
	return r.length - o.length
}

function ws(e) {
	const t = e[e.length - 1];
	return e.length > 0 && t[t.length - 1] < 0
}

const xs = {type: 0, value: ""}, Ts = /[a-zA-Z0-9_]/;

function Ss(e, t, n) {
	const o = function (e, t) {
		const n = Na({}, vs, t), o = [];
		let r = n.start ? "^" : "";
		const i = [];
		for (const l of e) {
			const e = l.length ? [] : [90];
			n.strict && !l.length && (r += "/");
			for (let t = 0; t < l.length; t++) {
				const o = l[t];
				let a = 40 + (n.sensitive ? .25 : 0);
				if (0 === o.type) t || (r += "/"), r += o.value.replace(bs, "\\$&"), a += 40; else if (1 === o.type) {
					const {value: e, repeatable: n, optional: c, regexp: u} = o;
					i.push({name: e, repeatable: n, optional: c});
					const d = u || "[^/]+?";
					if ("[^/]+?" !== d) {
						a += 10;
						try {
							new RegExp(`(${d})`)
						} catch (s) {
							throw new Error(`Invalid custom RegExp for param "${e}" (${d}): ` + s.message)
						}
					}
					let p = n ? `((?:${d})(?:/(?:${d}))*)` : `(${d})`;
					t || (p = c && l.length < 2 ? `(?:/${p})` : "/" + p), c && (p += "?"), r += p, a += 20, c && (a += -8), n && (a += -20), ".*" === d && (a += -50)
				}
				e.push(a)
			}
			o.push(e)
		}
		if (n.strict && n.end) {
			const e = o.length - 1;
			o[e][o[e].length - 1] += .7000000000000001
		}
		n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
		const a = new RegExp(r, n.sensitive ? "" : "i");
		return {
			re: a, score: o, keys: i, parse: function (e) {
				const t = e.match(a), n = {};
				if (!t) return null;
				for (let o = 1; o < t.length; o++) {
					const e = t[o] || "", r = i[o - 1];
					n[r.name] = e && r.repeatable ? e.split("/") : e
				}
				return n
			}, stringify: function (t) {
				let n = "", o = !1;
				for (const r of e) {
					o && n.endsWith("/") || (n += "/"), o = !1;
					for (const e of r) if (0 === e.type) n += e.value; else if (1 === e.type) {
						const {value: i, repeatable: a, optional: s} = e, l = i in t ? t[i] : "";
						if (Ha(l) && !a) throw new Error(`Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`);
						const c = Ha(l) ? l.join("/") : l;
						if (!c) {
							if (!s) throw new Error(`Missing required param "${i}"`);
							r.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : o = !0)
						}
						n += c
					}
				}
				return n || "/"
			}
		}
	}(function (e) {
		if (!e) return [[]];
		if ("/" === e) return [[xs]];
		if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

		function t(e) {
			throw new Error(`ERR (${n})/"${c}": ${e}`)
		}

		let n = 0, o = n;
		const r = [];
		let i;

		function a() {
			i && r.push(i), i = []
		}

		let s, l = 0, c = "", u = "";

		function d() {
			c && (0 === n ? i.push({
				type: 0,
				value: c
			}) : 1 === n || 2 === n || 3 === n ? (i.length > 1 && ("*" === s || "+" === s) && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
				type: 1,
				value: c,
				regexp: u,
				repeatable: "*" === s || "+" === s,
				optional: "*" === s || "?" === s
			})) : t("Invalid state to consume buffer"), c = "")
		}

		function p() {
			c += s
		}

		for (; l < e.length;) if (s = e[l++], "\\" !== s || 2 === n) switch (n) {
			case 0:
				"/" === s ? (c && d(), a()) : ":" === s ? (d(), n = 1) : p();
				break;
			case 4:
				p(), n = o;
				break;
			case 1:
				"(" === s ? n = 2 : Ts.test(s) ? p() : (d(), n = 0, "*" !== s && "?" !== s && "+" !== s && l--);
				break;
			case 2:
				")" === s ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + s : n = 3 : u += s;
				break;
			case 3:
				d(), n = 0, "*" !== s && "?" !== s && "+" !== s && l--, u = "";
				break;
			default:
				t("Unknown state")
		} else o = n, n = 4;
		return 2 === n && t(`Unfinished custom RegExp for param "${c}"`), d(), a(), r
	}(e.path), n), r = Na(o, {record: e, parent: t, children: [], alias: []});
	return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}

function Es(e, t) {
	const n = [], o = new Map;

	function r(e, n, o) {
		const s = !o, l = function (e) {
			return {
				path: e.path,
				redirect: e.redirect,
				name: e.name,
				meta: e.meta || {},
				aliasOf: void 0,
				beforeEnter: e.beforeEnter,
				props: As(e),
				children: e.children || [],
				instances: {},
				leaveGuards: new Set,
				updateGuards: new Set,
				enterCallbacks: {},
				components: "components" in e ? e.components || null : e.component && {default: e.component}
			}
		}(e);
		l.aliasOf = o && o.record;
		const c = Ps(t, e), u = [l];
		if ("alias" in e) {
			const t = "string" == typeof e.alias ? [e.alias] : e.alias;
			for (const e of t) u.push(Na({}, l, {
				components: o ? o.record.components : l.components,
				path: e,
				aliasOf: o ? o.record : l
			}))
		}
		let d, p;
		for (const t of u) {
			const {path: u} = t;
			if (n && "/" !== u[0]) {
				const e = n.record.path, o = "/" === e[e.length - 1] ? "" : "/";
				t.path = n.record.path + (u && o + u)
			}
			if (d = Ss(t, n, c), o ? o.alias.push(d) : (p = p || d, p !== d && p.alias.push(d), s && e.name && !Cs(d) && i(e.name)), l.children) {
				const e = l.children;
				for (let t = 0; t < e.length; t++) r(e[t], d, o && o.children[t])
			}
			o = o || d, (d.record.components && Object.keys(d.record.components).length || d.record.name || d.record.redirect) && a(d)
		}
		return p ? () => {
			i(p)
		} : za
	}

	function i(e) {
		if (us(e)) {
			const t = o.get(e);
			t && (o.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(i), t.alias.forEach(i))
		} else {
			const t = n.indexOf(e);
			t > -1 && (n.splice(t, 1), e.record.name && o.delete(e.record.name), e.children.forEach(i), e.alias.forEach(i))
		}
	}

	function a(e) {
		let t = 0;
		for (; t < n.length && _s(e, n[t]) >= 0 && (e.record.path !== n[t].record.path || !Ls(e, n[t]));) t++;
		n.splice(t, 0, e), e.record.name && !Cs(e) && o.set(e.record.name, e)
	}

	return t = Ps({strict: !1, end: !0, sensitive: !1}, t), e.forEach((e => r(e))), {
		addRoute: r,
		resolve: function (e, t) {
			let r, i, a, s = {};
			if ("name" in e && e.name) {
				if (r = o.get(e.name), !r) throw ms(1, {location: e});
				a = r.record.name, s = Na(ks(t.params, r.keys.filter((e => !e.optional)).map((e => e.name))), e.params && ks(e.params, r.keys.map((e => e.name)))), i = r.stringify(s)
			} else if ("path" in e) i = e.path, r = n.find((e => e.re.test(i))), r && (s = r.parse(i), a = r.record.name); else {
				if (r = t.name ? o.get(t.name) : n.find((e => e.re.test(t.path))), !r) throw ms(1, {
					location: e,
					currentLocation: t
				});
				a = r.record.name, s = Na({}, t.params, e.params), i = r.stringify(s)
			}
			const l = [];
			let c = r;
			for (; c;) l.unshift(c.record), c = c.parent;
			return {name: a, path: i, params: s, matched: l, meta: Bs(l)}
		},
		removeRoute: i,
		getRoutes: function () {
			return n
		},
		getRecordMatcher: function (e) {
			return o.get(e)
		}
	}
}

function ks(e, t) {
	const n = {};
	for (const o of t) o in e && (n[o] = e[o]);
	return n
}

function As(e) {
	const t = {}, n = e.props || !1;
	if ("component" in e) t.default = n; else for (const o in e.components) t[o] = "boolean" == typeof n ? n : n[o];
	return t
}

function Cs(e) {
	for (; e;) {
		if (e.record.aliasOf) return !0;
		e = e.parent
	}
	return !1
}

function Bs(e) {
	return e.reduce(((e, t) => Na(e, t.meta)), {})
}

function Ps(e, t) {
	const n = {};
	for (const o in e) n[o] = o in t ? t[o] : e[o];
	return n
}

function Ls(e, t) {
	return t.children.some((t => t === e || Ls(e, t)))
}

const Os = /#/g, Is = /&/g, Ms = /\//g, Fs = /=/g, js = /\?/g, Rs = /\+/g, Ns = /%5B/g, Ds = /%5D/g, zs = /%5E/g,
	Hs = /%60/g, qs = /%7B/g, Vs = /%7C/g, Ws = /%7D/g, $s = /%20/g;

function Qs(e) {
	return encodeURI("" + e).replace(Vs, "|").replace(Ns, "[").replace(Ds, "]")
}

function Us(e) {
	return Qs(e).replace(Rs, "%2B").replace($s, "+").replace(Os, "%23").replace(Is, "%26").replace(Hs, "`").replace(qs, "{").replace(Ws, "}").replace(zs, "^")
}

function Xs(e) {
	return null == e ? "" : function (e) {
		return Qs(e).replace(Os, "%23").replace(js, "%3F")
	}(e).replace(Ms, "%2F")
}

function Ys(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {
	}
	return "" + e
}

function Js(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e).split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(Rs, " "), r = e.indexOf("="), i = Ys(r < 0 ? e : e.slice(0, r)),
			a = r < 0 ? null : Ys(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			Ha(e) || (e = t[i] = [e]), e.push(a)
		} else t[i] = a
	}
	return t
}

function Gs(e) {
	let t = "";
	for (let n in e) {
		const o = e[n];
		if (n = Us(n).replace(Fs, "%3D"), null == o) {
			void 0 !== o && (t += (t.length ? "&" : "") + n);
			continue
		}
		(Ha(o) ? o.map((e => e && Us(e))) : [o && Us(o)]).forEach((e => {
			void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e))
		}))
	}
	return t
}

function Ks(e) {
	const t = {};
	for (const n in e) {
		const o = e[n];
		void 0 !== o && (t[n] = Ha(o) ? o.map((e => null == e ? null : "" + e)) : null == o ? o : "" + o)
	}
	return t
}

const Zs = Symbol(""), el = Symbol(""), tl = Symbol(""), nl = Symbol(""), ol = Symbol("");

function rl() {
	let e = [];
	return {
		add: function (t) {
			return e.push(t), () => {
				const n = e.indexOf(t);
				n > -1 && e.splice(n, 1)
			}
		}, list: () => e, reset: function () {
			e = []
		}
	}
}

function il(e, t, n, o, r) {
	const i = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
	return () => new Promise(((a, s) => {
		const l = e => {
			var l;
			!1 === e ? s(ms(4, {
				from: n,
				to: t
			})) : e instanceof Error ? s(e) : "string" == typeof (l = e) || l && "object" == typeof l ? s(ms(2, {
				from: t,
				to: e
			})) : (i && o.enterCallbacks[r] === i && "function" == typeof e && i.push(e), a())
		}, c = e.call(o && o.instances[r], t, n, l);
		let u = Promise.resolve(c);
		e.length < 3 && (u = u.then(l)), u.catch((e => s(e)))
	}))
}

function al(e, t, n, o) {
	const r = [];
	for (const a of e) for (const e in a.components) {
		let s = a.components[e];
		if ("beforeRouteEnter" === t || a.instances[e]) if ("object" == typeof (i = s) || "displayName" in i || "props" in i || "__vccOpts" in i) {
			const i = (s.__vccOpts || s)[t];
			i && r.push(il(i, n, o, a, e))
		} else {
			let i = s();
			r.push((() => i.then((r => {
				if (!r) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${a.path}"`));
				const i = (s = r).__esModule || "Module" === s[Symbol.toStringTag] ? r.default : r;
				var s;
				a.components[e] = i;
				const l = (i.__vccOpts || i)[t];
				return l && il(l, n, o, a, e)()
			}))))
		}
	}
	var i;
	return r
}

function sl(e) {
	const t = Xn(tl), n = Xn(nl), o = yi((() => t.resolve(sn(e.to)))), r = yi((() => {
			const {matched: e} = o.value, {length: t} = e, r = e[t - 1], i = n.matched;
			if (!r || !i.length) return -1;
			const a = i.findIndex($a.bind(null, r));
			if (a > -1) return a;
			const s = cl(e[t - 2]);
			return t > 1 && cl(r) === s && i[i.length - 1].path !== s ? i.findIndex($a.bind(null, e[t - 2])) : a
		})), i = yi((() => r.value > -1 && function (e, t) {
			for (const n in t) {
				const o = t[n], r = e[n];
				if ("string" == typeof o) {
					if (o !== r) return !1
				} else if (!Ha(r) || r.length !== o.length || o.some(((e, t) => e !== r[t]))) return !1
			}
			return !0
		}(n.params, o.value.params))),
		a = yi((() => r.value > -1 && r.value === n.matched.length - 1 && Qa(n.params, o.value.params)));
	return {
		route: o, href: yi((() => o.value.href)), isActive: i, isExactActive: a, navigate: function (n = {}) {
			return function (e) {
				if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
				if (e.defaultPrevented) return;
				if (void 0 !== e.button && 0 !== e.button) return;
				if (e.currentTarget && e.currentTarget.getAttribute) {
					const t = e.currentTarget.getAttribute("target");
					if (/\b_blank\b/i.test(t)) return
				}
				e.preventDefault && e.preventDefault();
				return !0
			}(n) ? t[sn(e.replace) ? "replace" : "push"](sn(e.to)).catch(za) : Promise.resolve()
		}
	}
}

const ll = po({
	name: "RouterLink",
	compatConfig: {MODE: 3},
	props: {
		to: {type: [String, Object], required: !0},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {type: String, default: "page"}
	},
	useLink: sl,
	setup(e, {slots: t}) {
		const n = qt(sl(e)), {options: o} = Xn(tl), r = yi((() => ({
			[ul(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
			[ul(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
		})));
		return () => {
			const o = t.default && t.default(n);
			return e.custom ? o : _i("a", {
				"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
				href: n.href,
				onClick: n.navigate,
				class: r.value
			}, o)
		}
	}
});

function cl(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

const ul = (e, t, n) => null != e ? e : null != t ? t : n;

function dl(e, t) {
	if (!e) return null;
	const n = e(t);
	return 1 === n.length ? n[0] : n
}

const pl = po({
	name: "RouterView",
	inheritAttrs: !1,
	props: {name: {type: String, default: "default"}, route: Object},
	compatConfig: {MODE: 3},
	setup(e, {attrs: t, slots: n}) {
		const o = Xn(ol), r = yi((() => e.route || o.value)), i = Xn(el, 0), a = yi((() => {
			let e = sn(i);
			const {matched: t} = r.value;
			let n;
			for (; (n = t[e]) && !n.components;) e++;
			return e
		})), s = yi((() => r.value.matched[a.value]));
		Un(el, yi((() => a.value + 1))), Un(Zs, s), Un(ol, r);
		const l = nn();
		return Gn((() => [l.value, s.value, e.name]), (([e, t, n], [o, r, i]) => {
			t && (t.instances[n] = e, r && r !== t && e && e === o && (t.leaveGuards.size || (t.leaveGuards = r.leaveGuards), t.updateGuards.size || (t.updateGuards = r.updateGuards))), !e || !t || r && $a(t, r) && o || (t.enterCallbacks[n] || []).forEach((t => t(e)))
		}), {flush: "post"}), () => {
			const o = r.value, i = e.name, a = s.value, c = a && a.components[i];
			if (!c) return dl(n.default, {Component: c, route: o});
			const u = a.props[i], d = u ? !0 === u ? o.params : "function" == typeof u ? u(o) : u : null,
				p = _i(c, Na({}, d, t, {
					onVnodeUnmounted: e => {
						e.component.isUnmounted && (a.instances[i] = null)
					}, ref: l
				}));
			return dl(n.default, {Component: p, route: o}) || p
		}
	}
});

function fl(e) {
	const t = Es(e.routes, e), n = e.parseQuery || Js, o = e.stringifyQuery || Gs, r = e.history, i = rl(), a = rl(),
		s = rl(), l = on(ds);
	let c = ds;
	Ra && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
	const u = Da.bind(null, (e => "" + e)), d = Da.bind(null, Xs), p = Da.bind(null, Ys);

	function f(e, i) {
		if (i = Na({}, i || l.value), "string" == typeof e) {
			const o = Va(n, e, i.path), a = t.resolve({path: o.path}, i), s = r.createHref(o.fullPath);
			return Na(o, a, {params: p(a.params), hash: Ys(o.hash), redirectedFrom: void 0, href: s})
		}
		let a;
		if ("path" in e) a = Na({}, e, {path: Va(n, e.path, i.path).path}); else {
			const t = Na({}, e.params);
			for (const e in t) null == t[e] && delete t[e];
			a = Na({}, e, {params: d(e.params)}), i.params = d(i.params)
		}
		const s = t.resolve(a, i), c = e.hash || "";
		s.params = u(p(s.params));
		const f = function (e, t) {
			const n = t.query ? e(t.query) : "";
			return t.path + (n && "?") + n + (t.hash || "")
		}(o, Na({}, e, {hash: (h = c, Qs(h).replace(qs, "{").replace(Ws, "}").replace(zs, "^")), path: s.path}));
		var h;
		const m = r.createHref(f);
		return Na({fullPath: f, hash: c, query: o === Gs ? Ks(e.query) : e.query || {}}, s, {
			redirectedFrom: void 0,
			href: m
		})
	}

	function h(e) {
		return "string" == typeof e ? Va(n, e, l.value.path) : Na({}, e)
	}

	function m(e, t) {
		if (c !== e) return ms(8, {from: t, to: e})
	}

	function g(e) {
		return b(e)
	}

	function v(e) {
		const t = e.matched[e.matched.length - 1];
		if (t && t.redirect) {
			const {redirect: n} = t;
			let o = "function" == typeof n ? n(e) : n;
			return "string" == typeof o && (o = o.includes("?") || o.includes("#") ? o = h(o) : {path: o}, o.params = {}), Na({
				query: e.query,
				hash: e.hash,
				params: "path" in o ? {} : e.params
			}, o)
		}
	}

	function b(e, t) {
		const n = c = f(e), r = l.value, i = e.state, a = e.force, s = !0 === e.replace, u = v(n);
		if (u) return b(Na(h(u), {state: "object" == typeof u ? Na({}, i, u.state) : i, force: a, replace: s}), t || n);
		const d = n;
		let p;
		return d.redirectedFrom = t, !a && function (e, t, n) {
			const o = t.matched.length - 1, r = n.matched.length - 1;
			return o > -1 && o === r && $a(t.matched[o], n.matched[r]) && Qa(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
		}(o, r, n) && (p = ms(16, {
			to: d,
			from: r
		}), P(r, r, !0, !1)), (p ? Promise.resolve(p) : _(d, r)).catch((e => gs(e) ? gs(e, 2) ? e : B(e) : C(e, d, r))).then((e => {
			if (e) {
				if (gs(e, 2)) return b(Na({replace: s}, h(e.to), {
					state: "object" == typeof e.to ? Na({}, i, e.to.state) : i,
					force: a
				}), t || d)
			} else e = x(d, r, !0, s, i);
			return w(d, r, e), e
		}))
	}

	function y(e, t) {
		const n = m(e, t);
		return n ? Promise.reject(n) : Promise.resolve()
	}

	function _(e, t) {
		let n;
		const [o, r, s] = function (e, t) {
			const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
			for (let a = 0; a < i; a++) {
				const i = t.matched[a];
				i && (e.matched.find((e => $a(e, i))) ? o.push(i) : n.push(i));
				const s = e.matched[a];
				s && (t.matched.find((e => $a(e, s))) || r.push(s))
			}
			return [n, o, r]
		}(e, t);
		n = al(o.reverse(), "beforeRouteLeave", e, t);
		for (const i of o) i.leaveGuards.forEach((o => {
			n.push(il(o, e, t))
		}));
		const l = y.bind(null, e, t);
		return n.push(l), hl(n).then((() => {
			n = [];
			for (const o of i.list()) n.push(il(o, e, t));
			return n.push(l), hl(n)
		})).then((() => {
			n = al(r, "beforeRouteUpdate", e, t);
			for (const o of r) o.updateGuards.forEach((o => {
				n.push(il(o, e, t))
			}));
			return n.push(l), hl(n)
		})).then((() => {
			n = [];
			for (const o of e.matched) if (o.beforeEnter && !t.matched.includes(o)) if (Ha(o.beforeEnter)) for (const r of o.beforeEnter) n.push(il(r, e, t)); else n.push(il(o.beforeEnter, e, t));
			return n.push(l), hl(n)
		})).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = al(s, "beforeRouteEnter", e, t), n.push(l), hl(n)))).then((() => {
			n = [];
			for (const o of a.list()) n.push(il(o, e, t));
			return n.push(l), hl(n)
		})).catch((e => gs(e, 8) ? e : Promise.reject(e)))
	}

	function w(e, t, n) {
		for (const o of s.list()) o(e, t, n)
	}

	function x(e, t, n, o, i) {
		const a = m(e, t);
		if (a) return a;
		const s = t === ds, c = Ra ? history.state : {};
		n && (o || s ? r.replace(e.fullPath, Na({scroll: s && c && c.scroll}, i)) : r.push(e.fullPath, i)), l.value = e, P(e, t, n, s), B()
	}

	let T;

	function S() {
		T || (T = r.listen(((e, t, n) => {
			if (!M.listening) return;
			const o = f(e), i = v(o);
			if (i) return void b(Na(i, {replace: !0}), o).catch(za);
			c = o;
			const a = l.value;
			var s, u;
			Ra && (s = rs(a.fullPath, n.delta), u = ns(), is.set(s, u)), _(o, a).catch((e => gs(e, 12) ? e : gs(e, 2) ? (b(e.to, o).then((e => {
				gs(e, 20) && !n.delta && n.type === Ya.pop && r.go(-1, !1)
			})).catch(za), Promise.reject()) : (n.delta && r.go(-n.delta, !1), C(e, o, a)))).then((e => {
				(e = e || x(o, a, !1)) && (n.delta && !gs(e, 8) ? r.go(-n.delta, !1) : n.type === Ya.pop && gs(e, 20) && r.go(-1, !1)), w(o, a, e)
			})).catch(za)
		})))
	}

	let E, k = rl(), A = rl();

	function C(e, t, n) {
		B(e);
		const o = A.list();
		return o.length ? o.forEach((o => o(e, t, n))) : console.error(e), Promise.reject(e)
	}

	function B(e) {
		return E || (E = !e, S(), k.list().forEach((([t, n]) => e ? n(e) : t())), k.reset()), e
	}

	function P(t, n, o, r) {
		const {scrollBehavior: i} = e;
		if (!Ra || !i) return Promise.resolve();
		const a = !o && function (e) {
			const t = is.get(e);
			return is.delete(e), t
		}(rs(t.fullPath, 0)) || (r || !o) && history.state && history.state.scroll || null;
		return kn().then((() => i(t, n, a))).then((e => e && os(e))).catch((e => C(e, t, n)))
	}

	const L = e => r.go(e);
	let O;
	const I = new Set, M = {
		currentRoute: l,
		listening: !0,
		addRoute: function (e, n) {
			let o, r;
			return us(e) ? (o = t.getRecordMatcher(e), r = n) : r = e, t.addRoute(r, o)
		},
		removeRoute: function (e) {
			const n = t.getRecordMatcher(e);
			n && t.removeRoute(n)
		},
		hasRoute: function (e) {
			return !!t.getRecordMatcher(e)
		},
		getRoutes: function () {
			return t.getRoutes().map((e => e.record))
		},
		resolve: f,
		options: e,
		push: g,
		replace: function (e) {
			return g(Na(h(e), {replace: !0}))
		},
		go: L,
		back: () => L(-1),
		forward: () => L(1),
		beforeEach: i.add,
		beforeResolve: a.add,
		afterEach: s.add,
		onError: A.add,
		isReady: function () {
			return E && l.value !== ds ? Promise.resolve() : new Promise(((e, t) => {
				k.add([e, t])
			}))
		},
		install(e) {
			e.component("RouterLink", ll), e.component("RouterView", pl), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
				enumerable: !0,
				get: () => sn(l)
			}), Ra && !O && l.value === ds && (O = !0, g(r.location).catch((e => {
			})));
			const t = {};
			for (const o in ds) t[o] = yi((() => l.value[o]));
			e.provide(tl, this), e.provide(nl, qt(t)), e.provide(ol, l);
			const n = e.unmount;
			I.add(e), e.unmount = function () {
				I.delete(e), I.size < 1 && (c = ds, T && T(), T = null, l.value = ds, O = !1, E = !1), n()
			}
		}
	};
	return M
}

function hl(e) {
	return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}

function ml() {
	return Xn(nl)
}

const gl = de((() => "undefined" != typeof __uniConfig && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length));
let vl;

function bl(e) {
	return ja(e, te) ? wl().f(e, function () {
		const e = Ud(), t = __uniConfig.locales;
		return t[e] || t[__uniConfig.fallbackLocale] || t.en || {}
	}(), te) : e
}

function yl(e, t) {
	if (1 === t.length) {
		if (e) {
			const n = e => I(e) && ja(e, te), o = t[0];
			let r = [];
			if (C(e) && (r = e.filter((e => n(e[o])))).length) return r;
			const i = e[t[0]];
			if (n(i)) return e
		}
		return
	}
	const n = t.shift();
	return yl(e && e[n], t)
}

function _l(e, t) {
	const n = yl(e, t);
	if (!n) return !1;
	const o = t[t.length - 1];
	if (C(n)) n.forEach((e => _l(e, [o]))); else {
		let e = n[o];
		Object.defineProperty(n, o, {
			get: () => bl(e), set(t) {
				e = t
			}
		})
	}
	return !0
}

function wl() {
	if (!vl) {
		let e;
		if (e = navigator.cookieEnabled && window.localStorage && localStorage.UNI_LOCALE || __uniConfig.locale || navigator.language, vl = Fa(e), gl()) {
			const t = Object.keys(__uniConfig.locales || {});
			t.length && t.forEach((e => vl.add(e, __uniConfig.locales[e]))), vl.setLocale(e)
		}
	}
	return vl
}

function xl(e, t, n) {
	return t.reduce(((t, o, r) => (t[e + o] = n[r], t)), {})
}

const Tl = de((() => {
	const e = "uni.async.", t = ["error"];
	wl().add("en", xl(e, t, ["The connection timed out, click the screen to try again."]), !1), wl().add("es", xl(e, t, ["Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."]), !1), wl().add("fr", xl(e, t, ["La connexion a expiré, cliquez sur l'écran pour réessayer."]), !1), wl().add("zh-Hans", xl(e, t, ["连接服务器超时，点击屏幕重试"]), !1), wl().add("zh-Hant", xl(e, t, ["連接服務器超時，點擊屏幕重試"]), !1)
})), Sl = de((() => {
	const e = "uni.showToast.", t = ["unpaired"];
	wl().add("en", xl(e, t, ["Please note showToast must be paired with hideToast"]), !1), wl().add("es", xl(e, t, ["Tenga en cuenta que showToast debe estar emparejado con hideToast"]), !1), wl().add("fr", xl(e, t, ["Veuillez noter que showToast doit être associé à hideToast"]), !1), wl().add("zh-Hans", xl(e, t, ["请注意 showToast 与 hideToast 必须配对使用"]), !1), wl().add("zh-Hant", xl(e, t, ["請注意 showToast 與 hideToast 必須配對使用"]), !1)
})), El = de((() => {
	const e = "uni.showLoading.", t = ["unpaired"];
	wl().add("en", xl(e, t, ["Please note showLoading must be paired with hideLoading"]), !1), wl().add("es", xl(e, t, ["Tenga en cuenta que showLoading debe estar emparejado con hideLoading"]), !1), wl().add("fr", xl(e, t, ["Veuillez noter que showLoading doit être associé à hideLoading"]), !1), wl().add("zh-Hans", xl(e, t, ["请注意 showLoading 与 hideLoading 必须配对使用"]), !1), wl().add("zh-Hant", xl(e, t, ["請注意 showLoading 與 hideLoading 必須配對使用"]), !1)
})), kl = de((() => {
	const e = "uni.chooseFile.", t = ["notUserActivation"];
	wl().add("en", xl(e, t, ["File chooser dialog can only be shown with a user activation"]), !1), wl().add("es", xl(e, t, ["El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario"]), !1), wl().add("fr", xl(e, t, ["La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur"]), !1), wl().add("zh-Hans", xl(e, t, ["文件选择器对话框只能在用户激活时显示"]), !1), wl().add("zh-Hant", xl(e, t, ["文件選擇器對話框只能在用戶激活時顯示"]), !1)
})), Al = de((() => {
	const e = "uni.video.", t = ["danmu", "volume"];
	wl().add("en", xl(e, t, ["Danmu", "Volume"]), !1), wl().add("es", xl(e, t, ["Danmu", "Volumen"]), !1), wl().add("fr", xl(e, t, ["Danmu", "Le Volume"]), !1), wl().add("zh-Hans", xl(e, t, ["弹幕", "音量"]), !1), wl().add("zh-Hant", xl(e, t, ["彈幕", "音量"]), !1)
}));

function Cl(e) {
	if (gl()) return t = e, [["titleText"], ["searchInput", "placeholder"], ["buttons", "text"]].map((e => _l(t, e)));
	var t
}

function Bl(e) {
	const t = new Pe;
	return {
		on: (e, n) => t.on(e, n),
		once: (e, n) => t.once(e, n),
		off: (e, n) => t.off(e, n),
		emit: (e, ...n) => t.emit(e, ...n),
		subscribe(n, o, r = !1) {
			t[r ? "once" : "on"](`${e}.${n}`, o)
		},
		unsubscribe(n, o) {
			t.off(`${e}.${n}`, o)
		},
		subscribeHandler(n, o, r) {
			t.emit(`${e}.${n}`, o, r)
		}
	}
}

let Pl = 1;
const Ll = Object.create(null);

function Ol(e, t) {
	return e + "." + t
}

function Il(e, t, n) {
	t = Ol(e, t), Ll[t] || (Ll[t] = n)
}

function Ml({id: e, name: t, args: n}, o) {
	t = Ol(o, t);
	const r = t => {
		e && pv.publishHandler("invokeViewApi." + e, t)
	}, i = Ll[t];
	i ? i(n, r) : r({})
}

const Fl = S(Bl("service"), {
	invokeServiceMethod: (e, t, n) => {
		const {subscribe: o, publishHandler: r} = pv, i = n ? Pl++ : 0;
		n && o("invokeServiceApi." + i, n, !0), r("invokeServiceApi", {id: i, name: e, args: t})
	}
}), jl = ge(!0);
let Rl;

function Nl() {
	Rl && (clearTimeout(Rl), Rl = null)
}

let Dl = 0, zl = 0;

function Hl(e) {
	if (Nl(), 1 !== e.touches.length) return;
	const {pageX: t, pageY: n} = e.touches[0];
	Dl = t, zl = n, Rl = setTimeout((function () {
		const t = new CustomEvent("longpress", {
			bubbles: !0,
			cancelable: !0,
			target: e.target,
			currentTarget: e.currentTarget
		});
		t.touches = e.touches, t.changedTouches = e.changedTouches, e.target.dispatchEvent(t)
	}), 350)
}

function ql(e) {
	if (!Rl) return;
	if (1 !== e.touches.length) return Nl();
	const {pageX: t, pageY: n} = e.touches[0];
	return Math.abs(t - Dl) > 10 || Math.abs(n - zl) > 10 ? Nl() : void 0
}

function Vl(e, t) {
	const n = Number(e);
	return isNaN(n) ? t : n
}

function Wl() {
	const e = __uniConfig.globalStyle || {}, t = Vl(e.rpxCalcMaxDeviceWidth, 960),
		n = Vl(e.rpxCalcBaseDeviceWidth, 375);

	function o() {
		let e = function () {
			const e = /^Apple/.test(navigator.vendor) && "number" == typeof window.orientation,
				t = e && 90 === Math.abs(window.orientation);
			var n = e ? Math[t ? "max" : "min"](screen.width, screen.height) : screen.width;
			return Math.min(window.innerWidth, document.documentElement.clientWidth, n) || n
		}();
		e = e <= t ? e : n, document.documentElement.style.fontSize = e / 23.4375 + "px"
	}

	o(), document.addEventListener("DOMContentLoaded", o), window.addEventListener("load", o), window.addEventListener("resize", o)
}

function $l() {
	Wl(), fe(), window.addEventListener("touchstart", Hl, jl), window.addEventListener("touchmove", ql, jl), window.addEventListener("touchend", Nl, jl), window.addEventListener("touchcancel", Nl, jl)
}

var Ql, Ul, Xl = ["top", "left", "right", "bottom"], Yl = {};

function Jl() {
	return Ul = "CSS" in window && "function" == typeof CSS.supports ? CSS.supports("top: env(safe-area-inset-top)") ? "env" : CSS.supports("top: constant(safe-area-inset-top)") ? "constant" : "" : ""
}

function Gl() {
	if (Ul = "string" == typeof Ul ? Ul : Jl()) {
		var e = [], t = !1;
		try {
			var n = Object.defineProperty({}, "passive", {
				get: function () {
					t = {passive: !0}
				}
			});
			window.addEventListener("test", null, n)
		} catch (s) {
		}
		var o = document.createElement("div");
		r(o, {
			position: "absolute",
			left: "0",
			top: "0",
			width: "0",
			height: "0",
			zIndex: "-1",
			overflow: "hidden",
			visibility: "hidden"
		}), Xl.forEach((function (e) {
			a(o, e)
		})), document.body.appendChild(o), i(), Ql = !0
	} else Xl.forEach((function (e) {
		Yl[e] = 0
	}));

	function r(e, t) {
		var n = e.style;
		Object.keys(t).forEach((function (e) {
			var o = t[e];
			n[e] = o
		}))
	}

	function i(t) {
		t ? e.push(t) : e.forEach((function (e) {
			e()
		}))
	}

	function a(e, n) {
		var o = document.createElement("div"), a = document.createElement("div"), s = document.createElement("div"),
			l = document.createElement("div"), c = {
				position: "absolute",
				width: "100px",
				height: "200px",
				boxSizing: "border-box",
				overflow: "hidden",
				paddingBottom: Ul + "(safe-area-inset-" + n + ")"
			};
		r(o, c), r(a, c), r(s, {
			transition: "0s",
			animation: "none",
			width: "400px",
			height: "400px"
		}), r(l, {
			transition: "0s",
			animation: "none",
			width: "250%",
			height: "250%"
		}), o.appendChild(s), a.appendChild(l), e.appendChild(o), e.appendChild(a), i((function () {
			o.scrollTop = a.scrollTop = 1e4;
			var e = o.scrollTop, r = a.scrollTop;

			function i() {
				this.scrollTop !== (this === o ? e : r) && (o.scrollTop = a.scrollTop = 1e4, e = o.scrollTop, r = a.scrollTop, function (e) {
					Zl.length || setTimeout((function () {
						var e = {};
						Zl.forEach((function (t) {
							e[t] = Yl[t]
						})), Zl.length = 0, ec.forEach((function (t) {
							t(e)
						}))
					}), 0);
					Zl.push(e)
				}(n))
			}

			o.addEventListener("scroll", i, t), a.addEventListener("scroll", i, t)
		}));
		var u = getComputedStyle(o);
		Object.defineProperty(Yl, n, {
			configurable: !0, get: function () {
				return parseFloat(u.paddingBottom)
			}
		})
	}
}

function Kl(e) {
	return Ql || Gl(), Yl[e]
}

var Zl = [];
var ec = [];
var tc = {
	get support() {
		return 0 != ("string" == typeof Ul ? Ul : Jl()).length
	}, get top() {
		return Kl("top")
	}, get left() {
		return Kl("left")
	}, get right() {
		return Kl("right")
	}, get bottom() {
		return Kl("bottom")
	}, onChange: function (e) {
		Jl() && (Ql || Gl(), "function" == typeof e && ec.push(e))
	}, offChange: function (e) {
		var t = ec.indexOf(e);
		t >= 0 && ec.splice(t, 1)
	}
};
const nc = wa((() => {
}), ["prevent"]);

function oc(e, t) {
	return parseInt((e.getPropertyValue(t).match(/\d+/) || ["0"])[0])
}

function rc() {
	const e = oc(document.documentElement.style, "--window-top");
	return e ? e + tc.top : 0
}

function ic() {
	const e = document.documentElement.style, t = rc(), n = oc(e, "--window-bottom"), o = oc(e, "--window-left"),
		r = oc(e, "--window-right"), i = oc(e, "--top-window-height");
	return {
		top: t,
		bottom: n ? n + tc.bottom : 0,
		left: o ? o + tc.left : 0,
		right: r ? r + tc.right : 0,
		topWindowHeight: i || 0
	}
}

function ac(e) {
	const t = document.documentElement.style;
	Object.keys(e).forEach((n => {
		t.setProperty(n, e[n])
	}))
}

function sc(e) {
	return ac(e)
}

function lc(e) {
	return Symbol(e)
}

function cc(e) {
	return -1 !== (e += "").indexOf("rpx") || -1 !== e.indexOf("upx")
}

function uc(e, t = !1) {
	if (t) return function (e) {
		if (!cc(e)) return e;
		return e.replace(/(\d+(\.\d+)?)[ru]px/g, ((e, t) => vd(parseFloat(t)) + "px"))
	}(e);
	if (I(e)) {
		const t = parseInt(e) || 0;
		return cc(e) ? vd(t) : t
	}
	return e
}

const dc = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z",
	pc = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z",
	fc = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";

function hc(e, t = "#000", n = 27) {
	return Kr("svg", {width: n, height: n, viewBox: "0 0 32 32"}, [Kr("path", {
		d: e,
		fill: t
	}, null, 8, ["d", "fill"])], 8, ["width", "height"])
}

function mc() {
	{
		const {$pageInstance: e} = ui();
		return e && e.proxy.$page.id
	}
}

function gc(e) {
	const t = re(e);
	if (t.$page) return t.$page.id;
	if (t.$) {
		const {$pageInstance: e} = t.$;
		return e && e.proxy.$page.id
	}
}

function vc() {
	const e = Hh(), t = e.length;
	if (t) return e[t - 1]
}

function bc() {
	const e = vc();
	if (e) return e.$page.meta
}

function yc() {
	const e = bc();
	return e ? e.id : -1
}

function _c() {
	const e = vc();
	if (e) return e.$vm
}

const wc = ["navigationBar", "pullToRefresh"];

function xc(e, t) {
	const n = JSON.parse(JSON.stringify(__uniConfig.globalStyle || {})), o = S({id: t}, n, e);
	wc.forEach((t => {
		o[t] = S({}, n[t], e[t])
	}));
	const {navigationBar: r} = o;
	return r.titleText && r.titleImage && (r.titleText = ""), o
}

function Tc(e, t, n) {
	if (I(e)) n = t, t = e, e = _c(); else if ("number" == typeof e) {
		const t = Hh().find((t => t.$page.id === e));
		e = t ? t.$vm : _c()
	}
	if (!e) return;
	const o = e.$[t];
	return o && ((e, t) => {
		let n;
		for (let o = 0; o < e.length; o++) n = e[o](t);
		return n
	})(o, n)
}

function Sc(e) {
	e.preventDefault()
}

let Ec, kc = 0;

function Ac({onPageScroll: e, onReachBottom: t, onReachBottomDistance: n}) {
	let o = !1, r = !1, i = !0;
	const a = () => {
		function a() {
			if ((() => {
				const {scrollHeight: e} = document.documentElement, t = window.innerHeight, o = window.scrollY,
					i = o > 0 && e > t && o + t + n >= e, a = Math.abs(e - kc) > n;
				return !i || r && !a ? (!i && r && (r = !1), !1) : (kc = e, r = !0, !0)
			})()) return t && t(), i = !1, setTimeout((function () {
				i = !0
			}), 350), !0
		}

		e && e(window.pageYOffset), t && i && (a() || (Ec = setTimeout(a, 300))), o = !1
	};
	return function () {
		clearTimeout(Ec), o || requestAnimationFrame(a), o = !0
	}
}

function Cc(e, t) {
	if (0 === t.indexOf("/")) return t;
	if (0 === t.indexOf("./")) return Cc(e, t.slice(2));
	const n = t.split("/"), o = n.length;
	let r = 0;
	for (; r < o && ".." === n[r]; r++) ;
	n.splice(0, r), t = n.join("/");
	const i = e.length > 0 ? e.split("/") : [];
	return i.splice(i.length - r - 1, r + 1), le(i.concat(n).join("/"))
}

function Bc(e, t = !1) {
	return t ? __uniRoutes.find((t => t.path === e || t.alias === e)) : __uniRoutes.find((t => t.path === e))
}

class Pc {
	constructor(e) {
		this.$bindClass = !1, this.$bindStyle = !1, this.$vm = e, this.$el = function (e, t = !1) {
			const {vnode: n} = e;
			if (ae(n.el)) return t ? n.el ? [n.el] : [] : n.el;
			const {subTree: o} = e;
			if (16 & o.shapeFlag) {
				const e = o.children.filter((e => e.el && ae(e.el)));
				if (e.length > 0) return t ? e.map((e => e.el)) : e[0].el
			}
			return t ? n.el ? [n.el] : [] : n.el
		}(e.$), this.$el.getAttribute && (this.$bindClass = !!this.$el.getAttribute("class"), this.$bindStyle = !!this.$el.getAttribute("style"))
	}

	selectComponent(e) {
		if (!this.$el || !e) return;
		const t = Mc(this.$el.querySelector(e));
		return t ? Lc(t, !1) : void 0
	}

	selectAllComponents(e) {
		if (!this.$el || !e) return [];
		const t = [], n = this.$el.querySelectorAll(e);
		for (let o = 0; o < n.length; o++) {
			const e = Mc(n[o]);
			e && t.push(Lc(e, !1))
		}
		return t
	}

	forceUpdate(e) {
		"class" === e ? this.$bindClass ? (this.$el.__wxsClassChanged = !0, this.$vm.$forceUpdate()) : this.updateWxsClass() : "style" === e && (this.$bindStyle ? (this.$el.__wxsStyleChanged = !0, this.$vm.$forceUpdate()) : this.updateWxsStyle())
	}

	updateWxsClass() {
		const {__wxsAddClass: e} = this.$el;
		e.length && (this.$el.className = e.join(" "))
	}

	updateWxsStyle() {
		const {__wxsStyle: e} = this.$el;
		e && this.$el.setAttribute("style", function (e) {
			let t = "";
			if (!e || I(e)) return t;
			for (const n in e) {
				const o = e[n], r = n.startsWith("--") ? n : Q(n);
				(I(o) || "number" == typeof o) && (t += `${r}:${o};`)
			}
			return t
		}(e))
	}

	setStyle(e) {
		return this.$el && e ? (I(e) && (e = c(e)), D(e) && (this.$el.__wxsStyle = e, this.forceUpdate("style")), this) : this
	}

	addClass(e) {
		if (!this.$el || !e) return this;
		const t = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
		return -1 === t.indexOf(e) && (t.push(e), this.forceUpdate("class")), this
	}

	removeClass(e) {
		if (!this.$el || !e) return this;
		const {__wxsAddClass: t} = this.$el;
		if (t) {
			const n = t.indexOf(e);
			n > -1 && t.splice(n, 1)
		}
		const n = this.$el.__wxsRemoveClass || (this.$el.__wxsRemoveClass = []);
		return -1 === n.indexOf(e) && (n.push(e), this.forceUpdate("class")), this
	}

	hasClass(e) {
		return this.$el && this.$el.classList.contains(e)
	}

	getDataset() {
		return this.$el && this.$el.dataset
	}

	callMethod(e, t = {}) {
		const n = this.$vm[e];
		O(n) ? n(JSON.parse(JSON.stringify(t))) : this.$vm.ownerId && pv.publishHandler("onWxsInvokeCallMethod", {
			nodeId: this.$el.__id,
			ownerId: this.$vm.ownerId,
			method: e,
			args: t
		})
	}

	requestAnimationFrame(e) {
		return window.requestAnimationFrame(e)
	}

	getState() {
		return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}))
	}

	triggerEvent(e, t = {}) {
		return this.$vm.$emit(e, t), this
	}

	getComputedStyle(e) {
		if (this.$el) {
			const t = window.getComputedStyle(this.$el);
			return e && e.length ? e.reduce(((e, n) => (e[n] = t[n], e)), {}) : t
		}
		return {}
	}

	setTimeout(e, t) {
		return window.setTimeout(e, t)
	}

	clearTimeout(e) {
		return window.clearTimeout(e)
	}

	getBoundingClientRect() {
		return this.$el.getBoundingClientRect()
	}
}

function Lc(e, t = !0) {
	if (t && e && (e = ie(e.$)), e && e.$el) return e.$el.__wxsComponentDescriptor || (e.$el.__wxsComponentDescriptor = new Pc(e)), e.$el.__wxsComponentDescriptor
}

function Oc(e, t) {
	return Lc(e, t)
}

function Ic(e, t, n, o = !0) {
	if (t) {
		e.__instance || (e.__instance = !0, Object.defineProperty(e, "instance", {get: () => Oc(n.proxy, !1)}));
		const r = function (e, t, n = !0) {
			if (!t) return !1;
			if (n && e.length < 2) return !1;
			const o = ie(t);
			if (!o) return !1;
			const r = o.$.type;
			return !(!r.$wxs && !r.$renderjs) && o
		}(t, n, o);
		if (r) return [e, Oc(r, !1)]
	}
}

function Mc(e) {
	if (e) return e.__vueParentComponent && e.__vueParentComponent.proxy
}

function Fc(e) {
	for (; e && 0 !== e.tagName.indexOf("UNI-");) e = e.parentElement;
	return e
}

function jc(e, t = !1) {
	const {type: n, timeStamp: o, target: r, currentTarget: i} = e,
		a = {type: n, timeStamp: o, target: ve(t ? r : Fc(r)), detail: {}, currentTarget: ve(i)};
	return e._stopped && (a._stopped = !0), e.type.startsWith("touch") && (a.touches = e.touches, a.changedTouches = e.changedTouches), function (e, t) {
		S(e, {preventDefault: () => t.preventDefault(), stopPropagation: () => t.stopPropagation()})
	}(a, e), a
}

function Rc(e, t) {
	return {force: 1, identifier: 0, clientX: e.clientX, clientY: e.clientY - t, pageX: e.pageX, pageY: e.pageY - t}
}

function Nc(e, t) {
	const n = [];
	for (let o = 0; o < e.length; o++) {
		const {identifier: r, pageX: i, pageY: a, clientX: s, clientY: l, force: c} = e[o];
		n.push({identifier: r, pageX: i, pageY: a - t, clientX: s, clientY: l - t, force: c || 0})
	}
	return n
}

const Dc = Object.defineProperty({
	__proto__: null, $nne: function (e, t, n) {
		const {currentTarget: o} = e;
		if (!(e instanceof Event && o instanceof HTMLElement)) return [e];
		const r = 0 !== o.tagName.indexOf("UNI-");
		if (r) return Ic(e, t, n, !1) || [e];
		const i = jc(e, r);
		if ("click" === e.type) !function (e, t) {
			const {x: n, y: o} = t, r = rc();
			e.detail = {x: n, y: o - r}, e.touches = e.changedTouches = [Rc(t, r)]
		}(i, e); else if ((e => 0 === e.type.indexOf("mouse") || ["contextmenu"].includes(e.type))(e)) !function (e, t) {
			const n = rc();
			e.pageX = t.pageX, e.pageY = t.pageY - n, e.clientX = t.clientX, e.clientY = t.clientY - n, e.touches = e.changedTouches = [Rc(t, n)]
		}(i, e); else if ((e => "undefined" != typeof TouchEvent && e instanceof TouchEvent || 0 === e.type.indexOf("touch") || ["longpress"].indexOf(e.type) >= 0)(e)) {
			const t = rc();
			i.touches = Nc(e.touches, t), i.changedTouches = Nc(e.changedTouches, t)
		}
		return Ic(i, t, n) || [i]
	}, createNativeEvent: jc
}, Symbol.toStringTag, {value: "Module"});

function zc(e) {
	!function (e) {
		const t = e.globalProperties;
		S(t, Dc), t.$gcd = Oc
	}(e._context.config)
}

let Hc = 1;

function qc() {
	return yc() + ".invokeViewApi"
}

const Vc = S(Bl("view"), {
	invokeOnCallback: (e, t) => fv.emit("api." + e, t), invokeViewMethod: (e, t, n, o) => {
		const {subscribe: r, publishHandler: i} = fv, a = o ? Hc++ : 0;
		o && r("invokeViewApi." + a, o, !0), i(qc(), {id: a, name: e, args: t}, n)
	}, invokeViewMethodKeepAlive: (e, t, n, o) => {
		const {subscribe: r, unsubscribe: i, publishHandler: a} = fv, s = Hc++, l = "invokeViewApi." + s;
		return r(l, n), a(qc(), {id: s, name: e, args: t}, o), () => {
			i(l)
		}
	}
});

function Wc(e) {
	Tc(vc(), "onResize", e), fv.invokeOnCallback("onWindowResize", e)
}

function $c(e) {
	const t = vc();
	Tc(dm(), "onShow", e), Tc(t, "onShow")
}

function Qc() {
	Tc(dm(), "onHide"), Tc(vc(), "onHide")
}

const Uc = ["onPageScroll", "onReachBottom"];

function Xc() {
	Uc.forEach((e => fv.subscribe(e, function (e) {
		return (t, n) => {
			Tc(parseInt(n), e, t)
		}
	}(e))))
}

function Yc() {
	!function () {
		const {on: e} = fv;
		e("onResize", Wc), e("onAppEnterForeground", $c), e("onAppEnterBackground", Qc)
	}(), Xc()
}

function Jc() {
	if (this.$route) {
		const e = this.$route.meta;
		return e.eventChannel || (e.eventChannel = new Te(this.$page.id)), e.eventChannel
	}
}

function Gc(e) {
	e._context.config.globalProperties.getOpenerEventChannel = Jc
}

function Kc() {
	return {path: "", query: {}, scene: 1001, referrerInfo: {appId: "", extraData: {}}}
}

function Zc(e) {
	return /^-?\d+[ur]px$/i.test(e) ? e.replace(/(^-?\d+)[ur]px$/i, ((e, t) => `${vd(parseFloat(t))}px`)) : /^-?[\d\.]+$/.test(e) ? `${e}px` : e || ""
}

function eu(e) {
	const t = e.animation;
	if (!t || !t.actions || !t.actions.length) return;
	let n = 0;
	const o = t.actions, r = t.actions.length;

	function i() {
		const t = o[n], a = t.option.transition, s = function (e) {
			const t = ["matrix", "matrix3d", "scale", "scale3d", "rotate3d", "skew", "translate", "translate3d"],
				n = ["scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "translateX", "translateY", "translateZ"],
				o = ["opacity", "background-color"], r = ["width", "height", "left", "right", "top", "bottom"],
				i = e.animates, a = e.option, s = a.transition, l = {}, c = [];
			return i.forEach((e => {
				let i = e.type, a = [...e.args];
				if (t.concat(n).includes(i)) i.startsWith("rotate") || i.startsWith("skew") ? a = a.map((e => parseFloat(e) + "deg")) : i.startsWith("translate") && (a = a.map(Zc)), n.indexOf(i) >= 0 && (a.length = 1), c.push(`${i}(${a.join(",")})`); else if (o.concat(r).includes(a[0])) {
					i = a[0];
					const e = a[1];
					l[i] = r.includes(i) ? Zc(e) : e
				}
			})), l.transform = l.webkitTransform = c.join(" "), l.transition = l.webkitTransition = Object.keys(l).map((e => `${function (e) {
				return e.replace(/[A-Z]/g, (e => `-${e.toLowerCase()}`)).replace("webkit", "-webkit")
			}(e)} ${s.duration}ms ${s.timingFunction} ${s.delay}ms`)).join(","), l.transformOrigin = l.webkitTransformOrigin = a.transformOrigin, l
		}(t);
		Object.keys(s).forEach((t => {
			e.$el.style[t] = s[t]
		})), n += 1, n < r && setTimeout(i, a.duration + a.delay)
	}

	setTimeout((() => {
		i()
	}), 0)
}

const tu = {
	props: ["animation"], watch: {
		animation: {
			deep: !0, handler() {
				eu(this)
			}
		}
	}, mounted() {
		eu(this)
	}
}, nu = e => {
	e.__reserved = !0;
	const {props: t, mixins: n} = e;
	return t && t.animation || (n || (e.mixins = [])).push(tu), ou(e)
}, ou = e => (e.__reserved = !0, e.compatConfig = {MODE: 3}, po(e)), ru = {
	hoverClass: {type: String, default: "none"},
	hoverStopPropagation: {type: Boolean, default: !1},
	hoverStartTime: {type: [Number, String], default: 50},
	hoverStayTime: {type: [Number, String], default: 400}
};

function iu(e) {
	const t = nn(!1);
	let n, o, r = !1;

	function i() {
		requestAnimationFrame((() => {
			clearTimeout(o), o = setTimeout((() => {
				t.value = !1
			}), parseInt(e.hoverStayTime))
		}))
	}

	function a(o) {
		o._hoverPropagationStopped || e.hoverClass && "none" !== e.hoverClass && !e.disabled && (e.hoverStopPropagation && (o._hoverPropagationStopped = !0), r = !0, n = setTimeout((() => {
			t.value = !0, r || i()
		}), parseInt(e.hoverStartTime)))
	}

	function s() {
		r = !1, t.value && i()
	}

	function l() {
		s(), window.removeEventListener("mouseup", l)
	}

	return {
		hovering: t, binding: {
			onTouchstartPassive: function (e) {
				e.touches.length > 1 || a(e)
			}, onMousedown: function (e) {
				r || (a(e), window.addEventListener("mouseup", l))
			}, onTouchend: function () {
				s()
			}, onMouseup: function () {
				r && l()
			}, onTouchcancel: function () {
				r = !1, t.value = !1, clearTimeout(n)
			}
		}
	}
}

function au(e, t) {
	return I(t) && (t = [t]), t.reduce(((t, n) => (e[n] && (t[n] = !0), t)), Object.create(null))
}

function su(e) {
	return e.__wwe = !0, e
}

function lu(e, t) {
	return (n, o, r) => {
		e.value && t(n, function (e, t, n, o) {
			const r = ve(n);
			return {type: o.type || e, timeStamp: t.timeStamp || 0, target: r, currentTarget: r, detail: o}
		}(n, o, e.value, r || {}))
	}
}

const cu = lc("uf"), uu = lc("ul");

function du(e, t, n) {
	const o = mc();
	n && !e || D(t) && Object.keys(t).forEach((r => {
		n ? 0 !== r.indexOf("@") && 0 !== r.indexOf("uni-") && pv.on(`uni-${r}-${o}-${e}`, t[r]) : 0 === r.indexOf("uni-") ? pv.on(r, t[r]) : e && pv.on(`uni-${r}-${o}-${e}`, t[r])
	}))
}

function pu(e, t, n) {
	const o = mc();
	n && !e || D(t) && Object.keys(t).forEach((r => {
		n ? 0 !== r.indexOf("@") && 0 !== r.indexOf("uni-") && pv.off(`uni-${r}-${o}-${e}`, t[r]) : 0 === r.indexOf("uni-") ? pv.off(r, t[r]) : e && pv.off(`uni-${r}-${o}-${e}`, t[r])
	}))
}

const fu = nu({
	name: "Button",
	props: {
		id: {type: String, default: ""},
		hoverClass: {type: String, default: "button-hover"},
		hoverStartTime: {type: [Number, String], default: 20},
		hoverStayTime: {type: [Number, String], default: 70},
		hoverStopPropagation: {type: Boolean, default: !1},
		disabled: {type: [Boolean, String], default: !1},
		formType: {type: String, default: ""},
		openType: {type: String, default: ""},
		loading: {type: [Boolean, String], default: !1},
		plain: {type: [Boolean, String], default: !1}
	},
	setup(e, {slots: t}) {
		const n = nn(null), o = Xn(cu, !1), {hovering: r, binding: i} = iu(e);
		wl();
		const a = su(((t, r) => {
			if (e.disabled) return t.stopImmediatePropagation();
			r && n.value.click();
			const i = e.formType;
			if (i) {
				if (!o) return;
				"submit" === i ? o.submit(t) : "reset" === i && o.reset(t)
			} else ;
		})), s = Xn(uu, !1);
		return s && (s.addHandler(a), jo((() => {
			s.removeHandler(a)
		}))), function (e, t) {
			du(e.id, t), Gn((() => e.id), ((e, n) => {
				pu(n, t, !0), du(e, t, !0)
			})), Ro((() => {
				pu(e.id, t)
			}))
		}(e, {"label-click": a}), () => {
			const o = e.hoverClass, s = au(e, "disabled"), l = au(e, "loading"), c = au(e, "plain"),
				u = o && "none" !== o;
			return Kr("uni-button", ii({
				ref: n,
				onClick: a,
				class: u && r.value ? o : ""
			}, u && i, s, l, c), [t.default && t.default()], 16, ["onClick"])
		}
	}
});

function hu(e) {
	return e.$el
}

function mu(e) {
	const {base: t} = __uniConfig.router;
	return 0 === le(e).indexOf(t) ? le(e) : t + e
}

function gu(e) {
	const {base: t, assets: n} = __uniConfig.router;
	if ("./" === t && (0 === e.indexOf("./static/") || n && 0 === e.indexOf("./" + n + "/")) && (e = e.slice(1)), 0 === e.indexOf("/")) {
		if (0 !== e.indexOf("//")) return mu(e.slice(1));
		e = "https:" + e
	}
	if (ne.test(e) || oe.test(e) || 0 === e.indexOf("blob:")) return e;
	const o = Hh();
	return o.length ? mu(Cc(o[o.length - 1].$page.route, e).slice(1)) : e
}

const vu = navigator.userAgent, bu = /android/i.test(vu), yu = /iphone|ipad|ipod/i.test(vu),
	_u = vu.match(/Windows NT ([\d|\d.\d]*)/i), wu = /Macintosh|Mac/i.test(vu), xu = /Linux|X11/i.test(vu),
	Tu = wu && navigator.maxTouchPoints > 0;

function Su() {
	return /^Apple/.test(navigator.vendor) && "number" == typeof window.orientation
}

function Eu(e) {
	return e && 90 === Math.abs(window.orientation)
}

function ku(e, t) {
	return e ? Math[t ? "max" : "min"](screen.width, screen.height) : screen.width
}

function Au(e) {
	return Math.min(window.innerWidth, document.documentElement.clientWidth, e) || e
}

function Cu(e, t, n, o) {
	fv.invokeViewMethod("video." + e, {videoId: e, type: n, data: o}, t)
}

function Bu(e, t) {
	const n = {}, {top: o, topWindowHeight: r} = ic();
	if (t.id && (n.id = e.id), t.dataset && (n.dataset = he(e)), t.rect || t.size) {
		const i = e.getBoundingClientRect();
		t.rect && (n.left = i.left, n.right = i.right, n.top = i.top - o - r, n.bottom = i.bottom - o - r), t.size && (n.width = i.width, n.height = i.height)
	}
	if (C(t.properties) && t.properties.forEach((e => {
		e = e.replace(/-([a-z])/g, (function (e, t) {
			return t.toUpperCase()
		}))
	})), t.scrollOffset) if ("UNI-SCROLL-VIEW" === e.tagName) {
		const t = e.children[0].children[0];
		n.scrollLeft = t.scrollLeft, n.scrollTop = t.scrollTop, n.scrollHeight = t.scrollHeight, n.scrollWidth = t.scrollWidth
	} else n.scrollLeft = 0, n.scrollTop = 0, n.scrollHeight = 0, n.scrollWidth = 0;
	if (C(t.computedStyle)) {
		const o = getComputedStyle(e);
		t.computedStyle.forEach((e => {
			n[e] = o[e]
		}))
	}
	return t.context && (n.contextInfo = function (e) {
		return e.__uniContextInfo
	}(e)), n
}

function Pu(e, t) {
	return (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function (e) {
		const t = this.parentElement.querySelectorAll(e);
		let n = t.length;
		for (; --n >= 0 && t.item(n) !== this;) ;
		return n > -1
	}).call(e, t)
}

function Lu(e, t, n) {
	const o = [];
	t.forEach((({component: t, selector: n, single: r, fields: i}) => {
		null === t ? o.push(function (e) {
			const t = {};
			if (e.id && (t.id = ""), e.dataset && (t.dataset = {}), e.rect && (t.left = 0, t.right = 0, t.top = 0, t.bottom = 0), e.size && (t.width = document.documentElement.clientWidth, t.height = document.documentElement.clientHeight), e.scrollOffset) {
				const e = document.documentElement, n = document.body;
				t.scrollLeft = e.scrollLeft || n.scrollLeft || 0, t.scrollTop = e.scrollTop || n.scrollTop || 0, t.scrollHeight = e.scrollHeight || n.scrollHeight || 0, t.scrollWidth = e.scrollWidth || n.scrollWidth || 0
			}
			return t
		}(i)) : o.push(function (e, t, n, o, r) {
			const i = function (e, t) {
				return e ? e.$el : t.$el
			}(t, e), a = i.parentElement;
			if (!a) return o ? null : [];
			const {nodeType: s} = i, l = 3 === s || 8 === s;
			if (o) {
				const e = l ? a.querySelector(n) : Pu(i, n) ? i : i.querySelector(n);
				return e ? Bu(e, r) : null
			}
			{
				let e = [];
				const t = (l ? a : i).querySelectorAll(n);
				return t && t.length && [].forEach.call(t, (t => {
					e.push(Bu(t, r))
				})), !l && Pu(i, n) && e.unshift(Bu(i, r)), e
			}
		}(e, t, n, r, i))
	})), n(o)
}

const Ou = ["original", "compressed"], Iu = ["album", "camera"],
	Mu = ["GET", "OPTIONS", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT", "PATCH"];

function Fu(e, t) {
	return e && -1 !== t.indexOf(e) ? e : t[0]
}

function ju(e, t) {
	return !C(e) || 0 === e.length || e.find((e => -1 === t.indexOf(e))) ? t : e
}

function Ru(e) {
	return function () {
		try {
			return e.apply(e, arguments)
		} catch (t) {
			console.error(t)
		}
	}
}

let Nu = 1;
const Du = {};

function zu(e, t, n) {
	if ("number" == typeof e) {
		const o = Du[e];
		if (o) return o.keepAlive || delete Du[e], o.callback(t, n)
	}
	return t
}

const Hu = "success", qu = "fail", Vu = "complete";

function Wu(e, t = {}, {beforeAll: n, beforeSuccess: o} = {}) {
	D(t) || (t = {});
	const {success: r, fail: i, complete: a} = function (e) {
		const t = {};
		for (const n in e) {
			const o = e[n];
			O(o) && (t[n] = Ru(o), delete e[n])
		}
		return t
	}(t), s = O(r), l = O(i), c = O(a), u = Nu++;
	return function (e, t, n, o = !1) {
		Du[e] = {name: t, keepAlive: o, callback: n}
	}(u, e, (u => {
		(u = u || {}).errMsg = function (e, t) {
			return e && -1 !== e.indexOf(":fail") ? t + e.substring(e.indexOf(":fail")) : t + ":ok"
		}(u.errMsg, e), O(n) && n(u), u.errMsg === e + ":ok" ? (O(o) && o(u, t), s && r(u)) : l && i(u), c && a(u)
	})), u
}

const $u = "success", Qu = "fail", Uu = "complete", Xu = {}, Yu = {};

function Ju(e, t) {
	return function (n) {
		return e(n, t) || n
	}
}

function Gu(e, t, n) {
	let o = !1;
	for (let r = 0; r < e.length; r++) {
		const i = e[r];
		if (o) o = Promise.resolve(Ju(i, n)); else {
			const e = i(t, n);
			if (j(e) && (o = Promise.resolve(e)), !1 === e) return {
				then() {
				}, catch() {
				}
			}
		}
	}
	return o || {
		then: e => e(t), catch() {
		}
	}
}

function Ku(e, t = {}) {
	return [$u, Qu, Uu].forEach((n => {
		const o = e[n];
		if (!C(o)) return;
		const r = t[n];
		t[n] = function (e) {
			Gu(o, e, t).then((e => O(r) && r(e) || e))
		}
	})), t
}

function Zu(e, t) {
	const n = [];
	C(Xu.returnValue) && n.push(...Xu.returnValue);
	const o = Yu[e];
	return o && C(o.returnValue) && n.push(...o.returnValue), n.forEach((e => {
		t = e(t) || t
	})), t
}

function ed(e) {
	const t = Object.create(null);
	Object.keys(Xu).forEach((e => {
		"returnValue" !== e && (t[e] = Xu[e].slice())
	}));
	const n = Yu[e];
	return n && Object.keys(n).forEach((e => {
		"returnValue" !== e && (t[e] = (t[e] || []).concat(n[e]))
	})), t
}

function td(e, t, n, o) {
	const r = ed(e);
	if (r && Object.keys(r).length) {
		if (C(r.invoke)) {
			return Gu(r.invoke, n).then((n => t(Ku(ed(e), n), ...o)))
		}
		return t(Ku(r, n), ...o)
	}
	return t(n, ...o)
}

function nd(e, t) {
	return (n = {}, ...o) => function (e) {
		return !(!D(e) || ![Hu, qu, Vu].find((t => O(e[t]))))
	}(n) ? Zu(e, td(e, t, n, o)) : Zu(e, new Promise(((r, i) => {
		td(e, t, S(n, {success: r, fail: i}), o)
	})))
}

function od(e, t, n, o) {
	return zu(e, S({errMsg: t + ":fail" + (n ? " " + n : "")}, o))
}

function rd(e, t, n, o) {
	if (o && o.beforeInvoke) {
		const e = o.beforeInvoke(t);
		if (I(e)) return e
	}
	const r = function (e, t) {
		const n = e[0];
		if (!t || !D(t.formatArgs) && D(n)) return;
		const o = t.formatArgs, r = Object.keys(o);
		for (let i = 0; i < r.length; i++) {
			const t = r[i], a = o[t];
			if (O(a)) {
				const o = a(e[0][t], n);
				if (I(o)) return o
			} else A(n, t) || (n[t] = a)
		}
	}(t, o);
	if (r) return r
}

function id(e, t, n, o) {
	return n => {
		const r = Wu(e, n, o), i = rd(0, [n], 0, o);
		return i ? od(r, e, i) : t(n, {
			resolve: t => function (e, t, n) {
				return zu(e, S(n || {}, {errMsg: t + ":ok"}))
			}(r, e, t), reject: (t, n) => od(r, e, function (e) {
				return !e || I(e) ? e : e.stack ? (console.error(e.message + "\n" + e.stack), e.message) : e
			}(t), n)
		})
	}
}

function ad(e, t, n, o) {
	return nd(e, id(e, t, 0, o))
}

function sd(e, t, n, o) {
	return function (e, t, n, o) {
		return (...e) => {
			const n = rd(0, e, 0, o);
			if (n) throw new Error(n);
			return t.apply(null, e)
		}
	}(0, t, 0, o)
}

function ld(e, t, n, o) {
	return nd(e, function (e, t, n, o) {
		return id(e, t, 0, o)
	}(e, t, 0, o))
}

let cd = !1, ud = 0, dd = 0, pd = 960, fd = 375, hd = 750;

function md() {
	const {platform: e, pixelRatio: t, windowWidth: n} = function () {
		const e = Su(), t = Au(ku(e, Eu(e)));
		return {platform: yu ? "ios" : "other", pixelRatio: window.devicePixelRatio, windowWidth: t}
	}();
	ud = n, dd = t, cd = "ios" === e
}

function gd(e, t) {
	const n = Number(e);
	return isNaN(n) ? t : n
}

const vd = sd(0, ((e, t) => {
	if (0 === ud && (md(), function () {
		const e = __uniConfig.globalStyle || {};
		pd = gd(e.rpxCalcMaxDeviceWidth, 960), fd = gd(e.rpxCalcBaseDeviceWidth, 375), hd = gd(e.rpxCalcBaseDeviceWidth, 750)
	}()), 0 === (e = Number(e))) return 0;
	let n = t || ud;
	n = e === hd || n <= pd ? n : fd;
	let o = e / 750 * n;
	return o < 0 && (o = -o), o = Math.floor(o + 1e-4), 0 === o && (o = 1 !== dd && cd ? .5 : 1), e < 0 ? -o : o
}));

function bd(e, t) {
	Object.keys(t).forEach((n => {
		O(t[n]) && (e[n] = function (e, t) {
			const n = t ? e ? e.concat(t) : C(t) ? t : [t] : e;
			return n ? function (e) {
				const t = [];
				for (let n = 0; n < e.length; n++) -1 === t.indexOf(e[n]) && t.push(e[n]);
				return t
			}(n) : n
		}(e[n], t[n]))
	}))
}

const yd = sd(0, ((e, t) => {
	I(e) && D(t) ? bd(Yu[e] || (Yu[e] = {}), t) : D(e) && bd(Xu, e)
})), _d = new Pe, wd = sd(0, ((e, t) => (_d.on(e, t), () => _d.off(e, t)))), xd = sd(0, ((e, t) => {
	e ? (C(e) || (e = [e]), e.forEach((e => _d.off(e, t)))) : _d.e = {}
})), Td = sd(0, ((e, ...t) => {
	_d.emit(e, ...t)
})), Sd = [.5, .8, 1, 1.25, 1.5, 2];

class Ed {
	constructor(e, t) {
		this.id = e, this.pageId = t
	}

	play() {
		Cu(this.id, this.pageId, "play")
	}

	pause() {
		Cu(this.id, this.pageId, "pause")
	}

	stop() {
		Cu(this.id, this.pageId, "stop")
	}

	seek(e) {
		Cu(this.id, this.pageId, "seek", {position: e})
	}

	sendDanmu(e) {
		Cu(this.id, this.pageId, "sendDanmu", e)
	}

	playbackRate(e) {
		~Sd.indexOf(e) || (e = 1), Cu(this.id, this.pageId, "playbackRate", {rate: e})
	}

	requestFullScreen(e = {}) {
		Cu(this.id, this.pageId, "requestFullScreen", e)
	}

	exitFullScreen() {
		Cu(this.id, this.pageId, "exitFullScreen")
	}

	showStatusBar() {
		Cu(this.id, this.pageId, "showStatusBar")
	}

	hideStatusBar() {
		Cu(this.id, this.pageId, "hideStatusBar")
	}
}

const kd = sd(0, ((e, t) => new Ed(e, gc(t || _c())))), Ad = (e, t, n, o) => {
	!function (e, t, n, o, r) {
		fv.invokeViewMethod("map." + e, {type: n, data: o}, t, r)
	}(e, t, n, o, (e => {
		o && ((e, t) => {
			const n = t.errMsg || "";
			new RegExp("\\:\\s*fail").test(n) ? e.fail && e.fail(t) : e.success && e.success(t), e.complete && e.complete(t)
		})(o, e)
	}))
};
const Cd = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgrey: "#a9a9a9",
	darkgreen: "#006400",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	gold: "#ffd700",
	goldenrod: "#daa520",
	gray: "#808080",
	grey: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lavenderblush: "#fff0f5",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgrey: "#d3d3d3",
	lightgreen: "#90ee90",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32",
	transparent: "#00000000"
};

function Bd(e) {
	var t = null;
	if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e = e || "#000000"))) {
		return [parseInt(t[1].slice(0, 2), 16), parseInt(t[1].slice(2, 4), 16), parseInt(t[1].slice(4), 16), 255]
	}
	if (null != (t = /^#([0-9|A-F|a-f]{3})$/.exec(e))) {
		let e = t[1].slice(0, 1), n = t[1].slice(1, 2), o = t[1].slice(2, 3);
		return e = parseInt(e + e, 16), n = parseInt(n + n, 16), o = parseInt(o + o, 16), [e, n, o, 255]
	}
	if (null != (t = /^rgb\((.+)\)$/.exec(e))) return t[1].split(",").map((function (e) {
		return Math.min(255, parseInt(e.trim()))
	})).concat(255);
	if (null != (t = /^rgba\((.+)\)$/.exec(e))) return t[1].split(",").map((function (e, t) {
		return 3 === t ? Math.floor(255 * parseFloat(e.trim())) : Math.min(255, parseInt(e.trim()))
	}));
	var n = e.toLowerCase();
	if (A(Cd, n)) {
		t = /^#([0-9|A-F|a-f]{6,8})$/.exec(Cd[n]);
		const e = parseInt(t[1].slice(0, 2), 16), o = parseInt(t[1].slice(2, 4), 16),
			r = parseInt(t[1].slice(4, 6), 16);
		let i = parseInt(t[1].slice(6, 8), 16);
		return i = i >= 0 ? i : 255, [e, o, r, i]
	}
	return console.error("unsupported color:" + e), [0, 0, 0, 255]
}

class Pd {
	constructor(e, t) {
		this.type = e, this.data = t, this.colorStop = []
	}

	addColorStop(e, t) {
		this.colorStop.push([e, Bd(t)])
	}
}

class Ld {
	constructor(e, t) {
		this.type = "pattern", this.data = e, this.colorStop = t
	}
}

class Od {
	constructor(e) {
		this.width = e
	}
}

const Id = {thresholds: [0], initialRatio: 0, observeAll: !1}, Md = ["top", "right", "bottom", "left"];
let Fd = 1;

function jd(e = {}) {
	return Md.map((t => `${Number(e[t]) || 0}px`)).join(" ")
}

class Rd {
	constructor(e, t) {
		this._pageId = gc(e), this._component = e, this._options = S({}, Id, t)
	}

	relativeTo(e, t) {
		return this._options.relativeToSelector = e, this._options.rootMargin = jd(t), this
	}

	relativeToViewport(e) {
		return this._options.relativeToSelector = void 0, this._options.rootMargin = jd(e), this
	}

	observe(e, t) {
		O(t) && (this._options.selector = e, this._reqId = Fd++, function ({reqId: e, component: t, options: n, callback: o}, r) {
			const i = hu(t);
			(i.__io || (i.__io = {}))[e] = function (e, t, n) {
				!function () {
					if ("object" != typeof window) return;
					if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) return void ("isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
						get: function () {
							return this.intersectionRatio > 0
						}
					}));

					function e(e) {
						try {
							return e.defaultView && e.defaultView.frameElement || null
						} catch (t) {
							return null
						}
					}

					var t = function (t) {
						for (var n = window.document, o = e(n); o;) o = e(n = o.ownerDocument);
						return n
					}(), n = [], o = null, r = null;

					function i(e) {
						this.time = e.time, this.target = e.target, this.rootBounds = h(e.rootBounds), this.boundingClientRect = h(e.boundingClientRect), this.intersectionRect = h(e.intersectionRect || f()), this.isIntersecting = !!e.intersectionRect;
						var t = this.boundingClientRect, n = t.width * t.height, o = this.intersectionRect,
							r = o.width * o.height;
						this.intersectionRatio = n ? Number((r / n).toFixed(4)) : this.isIntersecting ? 1 : 0
					}

					function a(e, t) {
						var n = t || {};
						if ("function" != typeof e) throw new Error("callback must be a function");
						if (n.root && 1 != n.root.nodeType && 9 != n.root.nodeType) throw new Error("root must be a Document or Element");
						this._checkForIntersections = l(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = e, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(n.rootMargin), this.thresholds = this._initThresholds(n.threshold), this.root = n.root || null, this.rootMargin = this._rootMarginValues.map((function (e) {
							return e.value + e.unit
						})).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = []
					}

					function s() {
						return window.performance && performance.now && performance.now()
					}

					function l(e, t) {
						var n = null;
						return function () {
							n || (n = setTimeout((function () {
								e(), n = null
							}), t))
						}
					}

					function c(e, t, n, o) {
						"function" == typeof e.addEventListener ? e.addEventListener(t, n, o || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
					}

					function u(e, t, n, o) {
						"function" == typeof e.removeEventListener ? e.removeEventListener(t, n, o || !1) : "function" == typeof e.detatchEvent && e.detatchEvent("on" + t, n)
					}

					function d(e, t) {
						var n = Math.max(e.top, t.top), o = Math.min(e.bottom, t.bottom), r = Math.max(e.left, t.left),
							i = Math.min(e.right, t.right), a = i - r, s = o - n;
						return a >= 0 && s >= 0 && {top: n, bottom: o, left: r, right: i, width: a, height: s} || null
					}

					function p(e) {
						var t;
						try {
							t = e.getBoundingClientRect()
						} catch (n) {
						}
						return t ? (t.width && t.height || (t = {
							top: t.top,
							right: t.right,
							bottom: t.bottom,
							left: t.left,
							width: t.right - t.left,
							height: t.bottom - t.top
						}), t) : f()
					}

					function f() {
						return {top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0}
					}

					function h(e) {
						return !e || "x" in e ? e : {
							top: e.top,
							y: e.top,
							bottom: e.bottom,
							left: e.left,
							x: e.left,
							right: e.right,
							width: e.width,
							height: e.height
						}
					}

					function m(e, t) {
						var n = t.top - e.top, o = t.left - e.left;
						return {
							top: n,
							left: o,
							height: t.height,
							width: t.width,
							bottom: n + t.height,
							right: o + t.width
						}
					}

					function g(e, t) {
						for (var n = t; n;) {
							if (n == e) return !0;
							n = v(n)
						}
						return !1
					}

					function v(n) {
						var o = n.parentNode;
						return 9 == n.nodeType && n != t ? e(n) : (o && o.assignedSlot && (o = o.assignedSlot.parentNode), o && 11 == o.nodeType && o.host ? o.host : o)
					}

					function b(e) {
						return e && 9 === e.nodeType
					}

					a.prototype.THROTTLE_TIMEOUT = 100, a.prototype.POLL_INTERVAL = null, a.prototype.USE_MUTATION_OBSERVER = !0, a._setupCrossOriginUpdater = function () {
						return o || (o = function (e, t) {
							r = e && t ? m(e, t) : f(), n.forEach((function (e) {
								e._checkForIntersections()
							}))
						}), o
					}, a._resetCrossOriginUpdater = function () {
						o = null, r = null
					}, a.prototype.observe = function (e) {
						if (!this._observationTargets.some((function (t) {
							return t.element == e
						}))) {
							if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
							this._registerInstance(), this._observationTargets.push({
								element: e,
								entry: null
							}), this._monitorIntersections(e.ownerDocument), this._checkForIntersections()
						}
					}, a.prototype.unobserve = function (e) {
						this._observationTargets = this._observationTargets.filter((function (t) {
							return t.element != e
						})), this._unmonitorIntersections(e.ownerDocument), 0 == this._observationTargets.length && this._unregisterInstance()
					}, a.prototype.disconnect = function () {
						this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance()
					}, a.prototype.takeRecords = function () {
						var e = this._queuedEntries.slice();
						return this._queuedEntries = [], e
					}, a.prototype._initThresholds = function (e) {
						var t = e || [0];
						return Array.isArray(t) || (t = [t]), t.sort().filter((function (e, t, n) {
							if ("number" != typeof e || isNaN(e) || e < 0 || e > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
							return e !== n[t - 1]
						}))
					}, a.prototype._parseRootMargin = function (e) {
						var t = (e || "0px").split(/\s+/).map((function (e) {
							var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
							if (!t) throw new Error("rootMargin must be specified in pixels or percent");
							return {value: parseFloat(t[1]), unit: t[2]}
						}));
						return t[1] = t[1] || t[0], t[2] = t[2] || t[0], t[3] = t[3] || t[1], t
					}, a.prototype._monitorIntersections = function (n) {
						var o = n.defaultView;
						if (o && -1 == this._monitoringDocuments.indexOf(n)) {
							var r = this._checkForIntersections, i = null, a = null;
							this.POLL_INTERVAL ? i = o.setInterval(r, this.POLL_INTERVAL) : (c(o, "resize", r, !0), c(n, "scroll", r, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in o && (a = new o.MutationObserver(r)).observe(n, {
								attributes: !0,
								childList: !0,
								characterData: !0,
								subtree: !0
							})), this._monitoringDocuments.push(n), this._monitoringUnsubscribes.push((function () {
								var e = n.defaultView;
								e && (i && e.clearInterval(i), u(e, "resize", r, !0)), u(n, "scroll", r, !0), a && a.disconnect()
							}));
							var s = this.root && (this.root.ownerDocument || this.root) || t;
							if (n != s) {
								var l = e(n);
								l && this._monitorIntersections(l.ownerDocument)
							}
						}
					}, a.prototype._unmonitorIntersections = function (n) {
						var o = this._monitoringDocuments.indexOf(n);
						if (-1 != o) {
							var r = this.root && (this.root.ownerDocument || this.root) || t;
							if (!this._observationTargets.some((function (t) {
								var o = t.element.ownerDocument;
								if (o == n) return !0;
								for (; o && o != r;) {
									var i = e(o);
									if ((o = i && i.ownerDocument) == n) return !0
								}
								return !1
							}))) {
								var i = this._monitoringUnsubscribes[o];
								if (this._monitoringDocuments.splice(o, 1), this._monitoringUnsubscribes.splice(o, 1), i(), n != r) {
									var a = e(n);
									a && this._unmonitorIntersections(a.ownerDocument)
								}
							}
						}
					}, a.prototype._unmonitorAllIntersections = function () {
						var e = this._monitoringUnsubscribes.slice(0);
						this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
						for (var t = 0; t < e.length; t++) e[t]()
					}, a.prototype._checkForIntersections = function () {
						if (this.root || !o || r) {
							var e = this._rootIsInDom(), t = e ? this._getRootRect() : f();
							this._observationTargets.forEach((function (n) {
								var r = n.element, a = p(r), l = this._rootContainsTarget(r), c = n.entry,
									u = e && l && this._computeTargetAndRootIntersection(r, a, t), d = null;
								this._rootContainsTarget(r) ? o && !this.root || (d = t) : d = f();
								var h = n.entry = new i({
									time: s(),
									target: r,
									boundingClientRect: a,
									rootBounds: d,
									intersectionRect: u
								});
								c ? e && l ? this._hasCrossedThreshold(c, h) && this._queuedEntries.push(h) : c && c.isIntersecting && this._queuedEntries.push(h) : this._queuedEntries.push(h)
							}), this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
						}
					}, a.prototype._computeTargetAndRootIntersection = function (e, n, i) {
						if ("none" != window.getComputedStyle(e).display) {
							for (var a = n, s = v(e), l = !1; !l && s;) {
								var c = null, u = 1 == s.nodeType ? window.getComputedStyle(s) : {};
								if ("none" == u.display) return null;
								if (s == this.root || 9 == s.nodeType) if (l = !0, s == this.root || s == t) o && !this.root ? !r || 0 == r.width && 0 == r.height ? (s = null, c = null, a = null) : c = r : c = i; else {
									var f = v(s), h = f && p(f),
										g = f && this._computeTargetAndRootIntersection(f, h, i);
									h && g ? (s = f, c = m(h, g)) : (s = null, a = null)
								} else {
									var b = s.ownerDocument;
									s != b.body && s != b.documentElement && "visible" != u.overflow && (c = p(s))
								}
								if (c && (a = d(c, a)), !a) break;
								s = s && v(s)
							}
							return a
						}
					}, a.prototype._getRootRect = function () {
						var e;
						if (this.root && !b(this.root)) e = p(this.root); else {
							var n = b(this.root) ? this.root : t, o = n.documentElement, r = n.body;
							e = {
								top: 0,
								left: 0,
								right: o.clientWidth || r.clientWidth,
								width: o.clientWidth || r.clientWidth,
								bottom: o.clientHeight || r.clientHeight,
								height: o.clientHeight || r.clientHeight
							}
						}
						return this._expandRectByRootMargin(e)
					}, a.prototype._expandRectByRootMargin = function (e) {
						var t = this._rootMarginValues.map((function (t, n) {
							return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e.height) / 100
						})), n = {
							top: e.top - t[0],
							right: e.right + t[1],
							bottom: e.bottom + t[2],
							left: e.left - t[3]
						};
						return n.width = n.right - n.left, n.height = n.bottom - n.top, n
					}, a.prototype._hasCrossedThreshold = function (e, t) {
						var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
							o = t.isIntersecting ? t.intersectionRatio || 0 : -1;
						if (n !== o) for (var r = 0; r < this.thresholds.length; r++) {
							var i = this.thresholds[r];
							if (i == n || i == o || i < n != i < o) return !0
						}
					}, a.prototype._rootIsInDom = function () {
						return !this.root || g(t, this.root)
					}, a.prototype._rootContainsTarget = function (e) {
						var n = this.root && (this.root.ownerDocument || this.root) || t;
						return g(n, e) && (!this.root || n == e.ownerDocument)
					}, a.prototype._registerInstance = function () {
						n.indexOf(this) < 0 && n.push(this)
					}, a.prototype._unregisterInstance = function () {
						var e = n.indexOf(this);
						-1 != e && n.splice(e, 1)
					}, window.IntersectionObserver = a, window.IntersectionObserverEntry = i
				}();
				const o = t.relativeToSelector ? e.querySelector(t.relativeToSelector) : null,
					r = new IntersectionObserver((e => {
						e.forEach((e => {
							n({
								intersectionRatio: Tp(e),
								intersectionRect: xp(e.intersectionRect),
								boundingClientRect: xp(e.boundingClientRect),
								relativeRect: xp(e.rootBounds),
								time: Date.now(),
								dataset: he(e.target),
								id: e.target.id
							})
						}))
					}), {root: o, rootMargin: t.rootMargin, threshold: t.thresholds});
				if (t.observeAll) {
					r.USE_MUTATION_OBSERVER = !0;
					const n = e.querySelectorAll(t.selector);
					for (let e = 0; e < n.length; e++) r.observe(n[e])
				} else {
					r.USE_MUTATION_OBSERVER = !1;
					const n = e.querySelector(t.selector);
					n ? r.observe(n) : console.warn(`Node ${t.selector} is not found. Intersection observer will not trigger.`)
				}
				return r
			}(i, n, o)
		}({reqId: this._reqId, component: this._component, options: this._options, callback: t}, this._pageId))
	}

	disconnect() {
		this._reqId && function ({reqId: e, component: t}, n) {
			const o = hu(t), r = o.__io && o.__io[e];
			r && (r.disconnect(), delete o.__io[e])
		}({reqId: this._reqId, component: this._component}, this._pageId)
	}
}

const Nd = sd(0, ((e, t) => ((e = re(e)) && !gc(e) && (t = e, e = null), new Rd(e || _c(), t))));
let Dd = 0, zd = {};

function Hd(e, t, n, o) {
	const r = {options: o}, i = o && ("success" in o || "fail" in o || "complete" in o);
	if (i) {
		const e = String(Dd++);
		r.callbackId = e, zd[e] = o
	}
	fv.invokeViewMethod(`editor.${e}`, {type: n, data: r}, t, (({callbackId: e, data: t}) => {
		i && (!function (e, t) {
			e = e || {}, I(t) && (t = {errMsg: t}), /:ok$/.test(t.errMsg) ? O(e.success) && e.success(t) : O(e.fail) && e.fail(t), O(e.complete) && e.complete(t)
		}(zd[e], t), delete zd[e])
	}))
}

const qd = {
	canvas: class {
		constructor(e, t) {
			this.id = e, this.pageId = t, this.actions = [], this.path = [], this.subpath = [], this.drawingState = [], this.state = {
				lineDash: [0, 0],
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowBlur: 0,
				shadowColor: [0, 0, 0, 0],
				font: "10px sans-serif",
				fontSize: 10,
				fontWeight: "normal",
				fontStyle: "normal",
				fontFamily: "sans-serif"
			}
		}

		draw(e = !1, t) {
			var n = [...this.actions];
			this.actions = [], this.path = [], function (e, t, n, o, r) {
				fv.invokeViewMethod(`canvas.${e}`, {type: n, data: o}, t, (e => {
					r && r(e)
				}))
			}(this.id, this.pageId, "actionsChanged", {actions: n, reserve: e}, t)
		}

		createLinearGradient(e, t, n, o) {
			return new Pd("linear", [e, t, n, o])
		}

		createCircularGradient(e, t, n) {
			return new Pd("radial", [e, t, n])
		}

		createPattern(e, t) {
			if (void 0 === t) console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present."); else {
				if (!(["repeat", "repeat-x", "repeat-y", "no-repeat"].indexOf(t) < 0)) return new Ld(e, t);
				console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + t + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.")
			}
		}

		measureText(e) {
			let t = 0;
			return t = function (e, t) {
				const n = document.createElement("canvas").getContext("2d");
				return n.font = t, n.measureText(e).width || 0
			}(e, this.state.font), new Od(t)
		}

		save() {
			this.actions.push({method: "save", data: []}), this.drawingState.push(this.state)
		}

		restore() {
			this.actions.push({method: "restore", data: []}), this.state = this.drawingState.pop() || {
				lineDash: [0, 0],
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowBlur: 0,
				shadowColor: [0, 0, 0, 0],
				font: "10px sans-serif",
				fontSize: 10,
				fontWeight: "normal",
				fontStyle: "normal",
				fontFamily: "sans-serif"
			}
		}

		beginPath() {
			this.path = [], this.subpath = [], this.path.push({method: "beginPath", data: []})
		}

		moveTo(e, t) {
			this.path.push({method: "moveTo", data: [e, t]}), this.subpath = [[e, t]]
		}

		lineTo(e, t) {
			0 === this.path.length && 0 === this.subpath.length ? this.path.push({
				method: "moveTo",
				data: [e, t]
			}) : this.path.push({method: "lineTo", data: [e, t]}), this.subpath.push([e, t])
		}

		quadraticCurveTo(e, t, n, o) {
			this.path.push({method: "quadraticCurveTo", data: [e, t, n, o]}), this.subpath.push([n, o])
		}

		bezierCurveTo(e, t, n, o, r, i) {
			this.path.push({method: "bezierCurveTo", data: [e, t, n, o, r, i]}), this.subpath.push([r, i])
		}

		arc(e, t, n, o, r, i = !1) {
			this.path.push({method: "arc", data: [e, t, n, o, r, i]}), this.subpath.push([e, t])
		}

		rect(e, t, n, o) {
			this.path.push({method: "rect", data: [e, t, n, o]}), this.subpath = [[e, t]]
		}

		arcTo(e, t, n, o, r) {
			this.path.push({method: "arcTo", data: [e, t, n, o, r]}), this.subpath.push([n, o])
		}

		clip() {
			this.actions.push({method: "clip", data: [...this.path]})
		}

		closePath() {
			this.path.push({
				method: "closePath",
				data: []
			}), this.subpath.length && (this.subpath = [this.subpath.shift()])
		}

		clearActions() {
			this.actions = [], this.path = [], this.subpath = []
		}

		getActions() {
			var e = [...this.actions];
			return this.clearActions(), e
		}

		set lineDashOffset(e) {
			this.actions.push({method: "setLineDashOffset", data: [e]})
		}

		set globalCompositeOperation(e) {
			this.actions.push({method: "setGlobalCompositeOperation", data: [e]})
		}

		set shadowBlur(e) {
			this.actions.push({method: "setShadowBlur", data: [e]})
		}

		set shadowColor(e) {
			this.actions.push({method: "setShadowColor", data: [e]})
		}

		set shadowOffsetX(e) {
			this.actions.push({method: "setShadowOffsetX", data: [e]})
		}

		set shadowOffsetY(e) {
			this.actions.push({method: "setShadowOffsetY", data: [e]})
		}

		set font(e) {
			var t = this;
			this.state.font = e;
			var n = e.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);
			if (n) {
				var o = n[1].trim().split(/\s/), r = parseFloat(n[3]), i = n[7], a = [];
				o.forEach((function (e, n) {
					["italic", "oblique", "normal"].indexOf(e) > -1 ? (a.push({
						method: "setFontStyle",
						data: [e]
					}), t.state.fontStyle = e) : ["bold", "normal"].indexOf(e) > -1 ? (a.push({
						method: "setFontWeight",
						data: [e]
					}), t.state.fontWeight = e) : 0 === n ? (a.push({
						method: "setFontStyle",
						data: ["normal"]
					}), t.state.fontStyle = "normal") : 1 === n && s()
				})), 1 === o.length && s(), o = a.map((function (e) {
					return e.data[0]
				})).join(" "), this.state.fontSize = r, this.state.fontFamily = i, this.actions.push({
					method: "setFont",
					data: [`${o} ${r}px ${i}`]
				})
			} else console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");

			function s() {
				a.push({method: "setFontWeight", data: ["normal"]}), t.state.fontWeight = "normal"
			}
		}

		get font() {
			return this.state.font
		}

		set fillStyle(e) {
			this.setFillStyle(e)
		}

		set strokeStyle(e) {
			this.setStrokeStyle(e)
		}

		set globalAlpha(e) {
			e = Math.floor(255 * parseFloat(e)), this.actions.push({method: "setGlobalAlpha", data: [e]})
		}

		set textAlign(e) {
			this.actions.push({method: "setTextAlign", data: [e]})
		}

		set lineCap(e) {
			this.actions.push({method: "setLineCap", data: [e]})
		}

		set lineJoin(e) {
			this.actions.push({method: "setLineJoin", data: [e]})
		}

		set lineWidth(e) {
			this.actions.push({method: "setLineWidth", data: [e]})
		}

		set miterLimit(e) {
			this.actions.push({method: "setMiterLimit", data: [e]})
		}

		set textBaseline(e) {
			this.actions.push({method: "setTextBaseline", data: [e]})
		}
	}, map: class {
		constructor(e, t) {
			this.id = e, this.pageId = t
		}

		getCenterLocation(e) {
			Ad(this.id, this.pageId, "getCenterLocation", e)
		}

		moveToLocation(e) {
			Ad(this.id, this.pageId, "moveToLocation", e)
		}

		getScale(e) {
			Ad(this.id, this.pageId, "getScale", e)
		}

		getRegion(e) {
			Ad(this.id, this.pageId, "getRegion", e)
		}

		includePoints(e) {
			Ad(this.id, this.pageId, "includePoints", e)
		}

		translateMarker(e) {
			Ad(this.id, this.pageId, "translateMarker", e)
		}

		$getAppMap() {
		}

		addCustomLayer(e) {
			Ad(this.id, this.pageId, "addCustomLayer", e)
		}

		removeCustomLayer(e) {
			Ad(this.id, this.pageId, "removeCustomLayer", e)
		}

		addGroundOverlay(e) {
			Ad(this.id, this.pageId, "addGroundOverlay", e)
		}

		removeGroundOverlay(e) {
			Ad(this.id, this.pageId, "removeGroundOverlay", e)
		}

		updateGroundOverlay(e) {
			Ad(this.id, this.pageId, "updateGroundOverlay", e)
		}

		initMarkerCluster(e) {
			Ad(this.id, this.pageId, "initMarkerCluster", e)
		}

		addMarkers(e) {
			Ad(this.id, this.pageId, "addMarkers", e)
		}

		removeMarkers(e) {
			Ad(this.id, this.pageId, "removeMarkers", e)
		}

		moveAlong(e) {
			Ad(this.id, this.pageId, "moveAlong", e)
		}

		setLocMarkerIcon(e) {
			Ad(this.id, this.pageId, "setLocMarkerIcon", e)
		}

		openMapApp(e) {
			Ad(this.id, this.pageId, "openMapApp", e)
		}

		on(e) {
			Ad(this.id, this.pageId, "on", e)
		}
	}, video: Ed, editor: class {
		constructor(e, t) {
			this.id = e, this.pageId = t
		}

		format(e, t) {
			this._exec("format", {name: e, value: t})
		}

		insertDivider() {
			this._exec("insertDivider")
		}

		insertImage(e) {
			this._exec("insertImage", e)
		}

		insertText(e) {
			this._exec("insertText", e)
		}

		setContents(e) {
			this._exec("setContents", e)
		}

		getContents(e) {
			this._exec("getContents", e)
		}

		clear(e) {
			this._exec("clear", e)
		}

		removeFormat(e) {
			this._exec("removeFormat", e)
		}

		undo(e) {
			this._exec("undo", e)
		}

		redo(e) {
			this._exec("redo", e)
		}

		blur(e) {
			this._exec("blur", e)
		}

		getSelectionText(e) {
			this._exec("getSelectionText", e)
		}

		scrollIntoView(e) {
			this._exec("scrollIntoView", e)
		}

		_exec(e, t) {
			Hd(this.id, this.pageId, e, t)
		}
	}
};

function Vd(e) {
	if (e && e.contextInfo) {
		const {id: t, type: n, page: o} = e.contextInfo, r = qd[n];
		e.context = new r(t, o), delete e.contextInfo
	}
}

class Wd {
	constructor(e, t, n, o) {
		this._selectorQuery = e, this._component = t, this._selector = n, this._single = o
	}

	boundingClientRect(e) {
		return this._selectorQuery._push(this._selector, this._component, this._single, {
			id: !0,
			dataset: !0,
			rect: !0,
			size: !0
		}, e), this._selectorQuery
	}

	fields(e, t) {
		return this._selectorQuery._push(this._selector, this._component, this._single, e, t), this._selectorQuery
	}

	scrollOffset(e) {
		return this._selectorQuery._push(this._selector, this._component, this._single, {
			id: !0,
			dataset: !0,
			scrollOffset: !0
		}, e), this._selectorQuery
	}

	context(e) {
		return this._selectorQuery._push(this._selector, this._component, this._single, {context: !0}, e), this._selectorQuery
	}

	node(e) {
		return this._selectorQuery
	}
}

class $d {
	constructor(e) {
		this._component = void 0, this._page = e, this._queue = [], this._queueCb = []
	}

	exec(e) {
		return Lu(this._page, this._queue, (t => {
			const n = this._queueCb;
			t.forEach(((e, t) => {
				C(e) ? e.forEach(Vd) : Vd(e);
				const o = n[t];
				O(o) && o.call(this, e)
			})), O(e) && e.call(this, t)
		})), this._nodesRef
	}

	in(e) {
		return this._component = re(e), this
	}

	select(e) {
		return this._nodesRef = new Wd(this, this._component, e, !0)
	}

	selectAll(e) {
		return this._nodesRef = new Wd(this, this._component, e, !1)
	}

	selectViewport() {
		return this._nodesRef = new Wd(this, null, "", !0)
	}

	_push(e, t, n, o, r) {
		this._queue.push({component: t, selector: e, single: n, fields: o}), this._queueCb.push(r)
	}
}

const Qd = sd(0, (e => ((e = re(e)) && !gc(e) && (e = null), new $d(e || _c())))), Ud = sd(0, (() => {
	const e = dm();
	return e && e.$vm ? e.$vm.$locale : wl().getLocale()
})), Xd = sd(0, (e => {
	const t = dm();
	if (!t) return !1;
	return t.$vm.$locale !== e && (t.$vm.$locale = e, navigator.cookieEnabled && window.localStorage && (localStorage.UNI_LOCALE = e), fv.invokeOnCallback("onLocaleChange", {locale: e}), !0)
})), Yd = {onUnhandledRejection: [], onPageNotFound: [], onError: [], onShow: [], onHide: []};
const Jd = sd(0, (() => S({}, Bp))), Gd = {
	formatArgs: {
		count(e, t) {
			(!e || e <= 0) && (t.count = 9)
		}, sizeType(e, t) {
			t.sizeType = ju(e, Ou)
		}, sourceType(e, t) {
			t.sourceType = ju(e, Iu)
		}, extension(e, t) {
			if (e instanceof Array && 0 === e.length) return "param extension should not be empty.";
			e || (t.extension = ["*"])
		}
	}
}, Kd = {
	formatArgs: {
		sourceType(e, t) {
			t.sourceType = ju(e, Iu)
		}, compressed: !0, maxDuration: 60, camera: "back", extension(e, t) {
			if (e instanceof Array && 0 === e.length) return "param extension should not be empty.";
			e || (t.extension = ["*"])
		}
	}
}, Zd = (Boolean, ["all", "image", "video"]), ep = {
	formatArgs: {
		count(e, t) {
			(!e || e <= 0) && (t.count = 100)
		}, sourceType(e, t) {
			t.sourceType = ju(e, Iu)
		}, type(e, t) {
			t.type = Fu(e, Zd)
		}, extension(e, t) {
			if (e instanceof Array && 0 === e.length) return "param extension should not be empty.";
			e || (t.extension = [""])
		}
	}
}, tp = {
	formatArgs: {
		urls(e, t) {
			t.urls = e.map((e => I(e) && e ? gu(e) : ""))
		}, current(e, t) {
			"number" == typeof e ? t.current = e > 0 && e < t.urls.length ? e : 0 : I(e) && e && (t.current = gu(e))
		}
	}
}, np = "json", op = ["text", "arraybuffer"], rp = encodeURIComponent;
ArrayBuffer, Boolean;
const ip = {
	formatArgs: {
		method(e, t) {
			t.method = Fu((e || "").toUpperCase(), Mu)
		}, data(e, t) {
			t.data = e || ""
		}, url(e, t) {
			t.method === Mu[0] && D(t.data) && Object.keys(t.data).length && (t.url = function (e, t) {
				let n = e.split("#");
				const o = n[1] || "";
				n = n[0].split("?");
				let r = n[1] || "";
				e = n[0];
				const i = r.split("&").filter((e => e)), a = {};
				i.forEach((e => {
					const t = e.split("=");
					a[t[0]] = t[1]
				}));
				for (const s in t) if (A(t, s)) {
					let e = t[s];
					null == e ? e = "" : D(e) && (e = JSON.stringify(e)), a[rp(s)] = rp(e)
				}
				return r = Object.keys(a).map((e => `${e}=${a[e]}`)).join("&"), e + (r ? "?" + r : "") + (o ? "#" + o : "")
			}(e, t.data))
		}, header(e, t) {
			const n = t.header = e || {};
			t.method !== Mu[0] && (Object.keys(n).find((e => "content-type" === e.toLowerCase())) || (n["Content-Type"] = "application/json"))
		}, dataType(e, t) {
			t.dataType = (e || np).toLowerCase()
		}, responseType(e, t) {
			t.responseType = (e || "").toLowerCase(), -1 === op.indexOf(t.responseType) && (t.responseType = "text")
		}
	}
}, ap = {
	formatArgs: {
		header(e, t) {
			t.header = e || {}
		}
	}
}, sp = {
	formatArgs: {
		filePath(e, t) {
			e && (t.filePath = gu(e))
		}, header(e, t) {
			t.header = e || {}
		}, formData(e, t) {
			t.formData = e || {}
		}
	}
};
const lp = {url: {type: String, required: !0}},
	cp = (hp(["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out", "zoom-fade-out", "pop-in", "none"]), hp(["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in", "zoom-fade-in", "pop-out", "none"]), vp("navigateTo")),
	up = vp("redirectTo"), dp = vp("reLaunch"), pp = vp("switchTab"), fp = {
		formatArgs: {
			delta(e, t) {
				e = parseInt(e + "") || 1, t.delta = Math.min(Hh().length - 1, e)
			}
		}
	};

function hp(e) {
	return {
		animationType: {
			type: String, validator(t) {
				if (t && -1 === e.indexOf(t)) return "`" + t + "` is not supported for `animationType` (supported values are: `" + e.join("`|`") + "`)"
			}
		}, animationDuration: {type: Number}
	}
}

let mp;

function gp() {
	mp = ""
}

function vp(e) {
	return {formatArgs: {url: bp(e)}, beforeAll: gp}
}

function bp(e) {
	return function (t, n) {
		if (!t) return 'Missing required args: "url"';
		const o = (t = function (e) {
			if (0 === e.indexOf("/")) return e;
			let t = "";
			const n = Hh();
			return n.length && (t = n[n.length - 1].$page.route), Cc(t, e)
		}(t)).split("?")[0], r = Bc(o, !0);
		if (!r) return "page `" + t + "` is not found";
		if ("navigateTo" === e || "redirectTo" === e) {
			if (r.meta.isTabBar) return `can not ${e} a tabbar page`
		} else if ("switchTab" === e && !r.meta.isTabBar) return "can not switch to no-tabBar page";
		if ("switchTab" !== e && "preloadPage" !== e || !r.meta.isTabBar || "appLaunch" === n.openType || (t = o), r.meta.isEntry && (t = t.replace(r.alias, "/")), n.url = function (e) {
			if (!I(e)) return e;
			const t = e.indexOf("?");
			if (-1 === t) return e;
			const n = e.slice(t + 1).trim().replace(/^(\?|#|&)/, "");
			if (!n) return e;
			e = e.slice(0, t);
			const o = [];
			return n.split("&").forEach((e => {
				const t = e.replace(/\+/g, " ").split("="), n = t.shift(), r = t.length > 0 ? t.join("=") : "";
				o.push(n + "=" + encodeURIComponent(r))
			})), o.length ? e + "?" + o.join("&") : e
		}(t), "unPreloadPage" !== e) if ("preloadPage" !== e) {
			if (mp === t && "appLaunch" !== n.openType) return `${mp} locked`;
			__uniConfig.ready && (mp = t)
		} else if (r.meta.isTabBar) {
			const e = Hh(), t = r.path.slice(1);
			if (e.find((e => e.route === t))) return "tabBar page `" + t + "` already exists"
		}
	}
}

const yp = {formatArgs: {duration: 300}}, _p = ["success", "loading", "none", "error"], wp = (Boolean, {
	formatArgs: {
		title: "", icon(e, t) {
			t.icon = Fu(e, _p)
		}, image(e, t) {
			t.image = e ? gu(e) : ""
		}, duration: 1500, mask: !1
	}
});

function xp(e) {
	const {bottom: t, height: n, left: o, right: r, top: i, width: a} = e || {};
	return {bottom: t, height: n, left: o, right: r, top: i, width: a}
}

function Tp(e) {
	const {intersectionRatio: t, boundingClientRect: {height: n, width: o}, intersectionRect: {height: r, width: i}} = e;
	return 0 !== t ? t : r === n ? i / o : r / n
}

const Sp = {};

function Ep(e, t) {
	const n = Sp[e];
	return n ? Promise.resolve(n) : /^data:[a-z-]+\/[a-z-]+;base64,/.test(e) ? Promise.resolve(function (e) {
		const t = e.split(","), n = t[0].match(/:(.*?);/), o = n ? n[1] : "", r = atob(t[1]);
		let i = r.length;
		const a = new Uint8Array(i);
		for (; i--;) a[i] = r.charCodeAt(i);
		return kp(a, o)
	}(e)) : t ? Promise.reject(new Error("not find")) : new Promise(((t, n) => {
		const o = new XMLHttpRequest;
		o.open("GET", e, !0), o.responseType = "blob", o.onload = function () {
			t(this.response)
		}, o.onerror = n, o.send()
	}))
}

function kp(e, t) {
	let n;
	if (e instanceof File) n = e; else {
		t = t || e.type || "";
		const r = `${Date.now()}${function (e) {
			const t = e.split("/")[1];
			return t ? `.${t}` : ""
		}(t)}`;
		try {
			n = new File([e], r, {type: t})
		} catch (o) {
			n = e = e instanceof Blob ? e : new Blob([e], {type: t}), n.name = n.name || r
		}
	}
	return n
}

function Ap(e) {
	for (const n in Sp) if (A(Sp, n)) {
		if (Sp[n] === e) return n
	}
	var t = (window.URL || window.webkitURL).createObjectURL(e);
	return Sp[t] = e, t
}

function Cp(e) {
	(window.URL || window.webkitURL).revokeObjectURL(e), delete Sp[e]
}

const Bp = Kc(), Pp = Kc();
const Lp = nu({
	name: "ResizeSensor",
	props: {initial: {type: Boolean, default: !1}},
	emits: ["resize"],
	setup(e, {emit: t}) {
		const n = nn(null), o = function (e) {
			return () => {
				const {firstElementChild: t, lastElementChild: n} = e.value;
				t.scrollLeft = 1e5, t.scrollTop = 1e5, n.scrollLeft = 1e5, n.scrollTop = 1e5
			}
		}(n), r = function (e, t, n) {
			const o = qt({width: -1, height: -1});
			return Gn((() => S({}, o)), (e => t("resize", e))), () => {
				const t = e.value;
				o.width = t.offsetWidth, o.height = t.offsetHeight, n()
			}
		}(n, t, o);
		return function (e, t, n, o) {
			wo(o), Io((() => {
				t.initial && kn(n);
				const r = e.value;
				r.offsetParent !== r.parentElement && (r.parentElement.style.position = "relative"), "AnimationEvent" in window || o()
			}))
		}(n, e, r, o), () => Kr("uni-resize-sensor", {
			ref: n,
			onAnimationstartOnce: r
		}, [Kr("div", {onScroll: r}, [Kr("div", null, null)], 40, ["onScroll"]), Kr("div", {onScroll: r}, [Kr("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"])
	}
});

function Op() {
}

const Ip = {
	cursorSpacing: {type: [Number, String], default: 0},
	showConfirmBar: {type: [Boolean, String], default: "auto"},
	adjustPosition: {type: [Boolean, String], default: !0},
	autoBlur: {type: [Boolean, String], default: !1}
};

function Mp(e, t, n) {
	function o(e) {
		const t = yi((() => 0 === String(navigator.vendor).indexOf("Apple")));
		e.addEventListener("focus", (() => {
			clearTimeout(undefined), document.addEventListener("click", Op, !1)
		}));
		e.addEventListener("blur", (() => {
			t.value && e.blur(), document.removeEventListener("click", Op, !1), t.value && document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop)
		}))
	}

	Gn((() => t.value), (e => e && o(e)))
}

var Fp = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
	jp = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
	Rp = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
	Np = Wp("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
	Dp = Wp("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
	zp = Wp("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
	Hp = Wp("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
	qp = Wp("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
	Vp = Wp("script,style");

function Wp(e) {
	for (var t = {}, n = e.split(","), o = 0; o < n.length; o++) t[n[o]] = !0;
	return t
}

const $p = {
		src: {type: String, default: ""},
		mode: {type: String, default: "scaleToFill"},
		lazyLoad: {type: [Boolean, String], default: !1},
		draggable: {type: Boolean, default: !1}
	}, Qp = {widthFix: ["offsetWidth", "height", (e, t) => e / t], heightFix: ["offsetHeight", "width", (e, t) => e * t]},
	Up = {
		aspectFit: ["center center", "contain"],
		aspectFill: ["center center", "cover"],
		widthFix: [, "100% 100%"],
		heightFix: [, "100% 100%"],
		top: ["center top"],
		bottom: ["center bottom"],
		center: ["center center"],
		left: ["left center"],
		right: ["right center"],
		"top left": ["left top"],
		"top right": ["right top"],
		"bottom left": ["left bottom"],
		"bottom right": ["right bottom"]
	}, Xp = nu({
		name: "Image", props: $p, setup(e, {emit: t}) {
			const n = nn(null), o = function (e, t) {
				const n = nn(""), o = yi((() => {
					let e = "auto", o = "";
					const r = Up[t.mode];
					return r ? (r[0] && (o = r[0]), r[1] && (e = r[1])) : (o = "0% 0%", e = "100% 100%"), `background-image:${n.value ? 'url("' + n.value + '")' : "none"};background-position:${o};background-size:${e};`
				})), r = qt({
					rootEl: e,
					src: yi((() => t.src ? gu(t.src) : "")),
					origWidth: 0,
					origHeight: 0,
					origStyle: {width: "", height: ""},
					modeStyle: o,
					imgSrc: n
				});
				return Io((() => {
					const t = e.value.style;
					r.origWidth = Number(t.width) || 0, r.origHeight = Number(t.height) || 0
				})), r
			}(n, e), r = lu(n, t), {fixSize: i} = function (e, t, n) {
				const o = () => {
					const {mode: o} = t, r = Qp[o];
					if (!r) return;
					const {origWidth: i, origHeight: a} = n, s = i && a ? i / a : 0;
					if (!s) return;
					const l = e.value, c = l[r[0]];
					c && (l.style[r[1]] = function (e) {
						Yp && e > 10 && (e = 2 * Math.round(e / 2));
						return e
					}(r[2](c, s)) + "px")
				}, r = () => {
					const {style: t} = e.value, {origStyle: {width: o, height: r}} = n;
					t.width = o, t.height = r
				};
				return Gn((() => t.mode), ((e, t) => {
					Qp[t] && r(), Qp[e] && o()
				})), {fixSize: o, resetSize: r}
			}(n, e, o);
			return function (e, t, n, o, r) {
				let i, a;
				const s = (t = 0, n = 0, o = "") => {
					e.origWidth = t, e.origHeight = n, e.imgSrc = o
				}, l = l => {
					if (!l) return c(), void s();
					i = i || new Image, i.onload = e => {
						const {width: u, height: d} = i;
						s(u, d, l), o(), i.draggable = t.draggable, a && a.remove(), a = i, n.value.appendChild(i), c(), r("load", e, {
							width: u,
							height: d
						})
					}, i.onerror = t => {
						s(), c(), r("error", t, {errMsg: `GET ${e.src} 404 (Not Found)`})
					}, i.src = l
				}, c = () => {
					i && (i.onload = null, i.onerror = null, i = null)
				};
				Gn((() => e.src), (e => l(e))), Gn((() => e.imgSrc), (e => {
					!e && a && (a.remove(), a = null)
				})), Io((() => l(e.src))), jo((() => c()))
			}(o, e, n, i, r), () => Kr("uni-image", {ref: n}, [Kr("div", {style: o.modeStyle}, null, 4), Qp[e.mode] ? Kr(Lp, {onResize: i}, null, 8, ["onResize"]) : Kr("span", null, null)], 512)
		}
	});
const Yp = "Google Inc." === navigator.vendor;
const Jp = ge(!0), Gp = [];
let Kp, Zp = 0;
const ef = e => Gp.forEach((t => t.userAction = e));

function tf(e = {userAction: !1}) {
	if (!Kp) {
		["touchstart", "touchmove", "touchend", "mousedown", "mouseup"].forEach((e => {
			document.addEventListener(e, (function () {
				!Zp && ef(!0), Zp++, setTimeout((() => {
					!--Zp && ef(!1)
				}), 0)
			}), Jp)
		})), Kp = !0
	}
	Gp.push(e)
}

const nf = () => !!Zp;

function of() {
	const e = qt({userAction: !1});
	return Io((() => {
		tf(e)
	})), jo((() => {
		!function (e) {
			const t = Gp.indexOf(e);
			t >= 0 && Gp.splice(t, 1)
		}(e)
	})), {state: e}
}

function rf() {
	const e = qt({attrs: {}});
	return Io((() => {
		let t = ui();
		for (; t;) {
			const n = t.type.__scopeId;
			n && (e.attrs[n] = ""), t = t.proxy && "page" === t.proxy.$mpType ? null : t.parent
		}
	})), {state: e}
}

function af(e, t) {
	const n = document.activeElement;
	if (!n) return t({});
	const o = {};
	["input", "textarea"].includes(n.tagName.toLowerCase()) && (o.start = n.selectionStart, o.end = n.selectionEnd), t(o)
}

function sf(e, t) {
	return "number" === t && isNaN(Number(e)) && (e = ""), null === e ? "" : String(e)
}

const lf = ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"], cf = S({}, {
		name: {type: String, default: ""},
		modelValue: {type: [String, Number], default: ""},
		value: {type: [String, Number], default: ""},
		disabled: {type: [Boolean, String], default: !1},
		autoFocus: {type: [Boolean, String], default: !1},
		focus: {type: [Boolean, String], default: !1},
		cursor: {type: [Number, String], default: -1},
		selectionStart: {type: [Number, String], default: -1},
		selectionEnd: {type: [Number, String], default: -1},
		type: {type: String, default: "text"},
		password: {type: [Boolean, String], default: !1},
		placeholder: {type: String, default: ""},
		placeholderStyle: {type: String, default: ""},
		placeholderClass: {type: String, default: ""},
		maxlength: {type: [Number, String], default: 140},
		confirmType: {type: String, default: "done"},
		confirmHold: {type: Boolean, default: !1},
		ignoreCompositionEvent: {type: Boolean, default: !0},
		step: {type: String, default: "0.000000000000000001"},
		inputmode: {type: String, default: void 0, validator: e => !!~lf.indexOf(e)}
	}, Ip),
	uf = ["input", "focus", "blur", "update:value", "update:modelValue", "update:focus", "compositionstart", "compositionupdate", "compositionend", "keyboardheightchange"];

function df(e, t, n, o) {
	const r = xe((n => {
		t.value = sf(n, e.type)
	}), 100, {setTimeout: setTimeout, clearTimeout: clearTimeout});
	Gn((() => e.modelValue), r), Gn((() => e.value), r);
	const i = function (e, t) {
		let n, o, r = 0;
		const i = function (...i) {
			const a = Date.now();
			clearTimeout(n), o = () => {
				o = null, r = a, e.apply(this, i)
			}, a - r < t ? n = setTimeout(o, t - (a - r)) : o()
		};
		return i.cancel = function () {
			clearTimeout(n), o = null
		}, i.flush = function () {
			clearTimeout(n), o && o()
		}, i
	}(((e, t) => {
		r.cancel(), n("update:modelValue", t.value), n("update:value", t.value), o("input", e, t)
	}), 100);
	return Oo((() => {
		r.cancel(), i.cancel()
	})), {
		trigger: o, triggerInput: (e, t, n) => {
			r.cancel(), i(e, t), n && i.flush()
		}
	}
}

function pf(e, t) {
	of();
	const n = yi((() => e.autoFocus || e.focus));

	function o() {
		if (!n.value) return;
		const e = t.value;
		e ? e.focus() : setTimeout(o, 100)
	}

	Gn((() => e.focus), (e => {
		e ? o() : function () {
			const e = t.value;
			e && e.blur()
		}()
	})), Io((() => {
		n.value && kn(o)
	}))
}

function ff(e, t, n, o) {
	Il(yc(), "getSelectedTextRange", af);
	const {fieldRef: r, state: i, trigger: a} = function (e, t, n) {
		const o = nn(null), r = lu(t, n), i = yi((() => {
			const t = Number(e.selectionStart);
			return isNaN(t) ? -1 : t
		})), a = yi((() => {
			const t = Number(e.selectionEnd);
			return isNaN(t) ? -1 : t
		})), s = yi((() => {
			const t = Number(e.cursor);
			return isNaN(t) ? -1 : t
		})), l = yi((() => {
			var t = Number(e.maxlength);
			return isNaN(t) ? 140 : t
		})), c = sf(e.modelValue, e.type) || sf(e.value, e.type), u = qt({
			value: c,
			valueOrigin: c,
			maxlength: l,
			focus: e.focus,
			composing: !1,
			selectionStart: i,
			selectionEnd: a,
			cursor: s
		});
		return Gn((() => u.focus), (e => n("update:focus", e))), Gn((() => u.maxlength), (e => u.value = u.value.slice(0, e))), {
			fieldRef: o,
			state: u,
			trigger: r
		}
	}(e, t, n), {triggerInput: s} = df(e, i, n, a);
	pf(e, r), Mp(0, r);
	const {state: l} = rf();
	!function (e, t) {
		const n = Xn(cu, !1);
		if (!n) return;
		const o = ui(), r = {
			submit() {
				const n = o.proxy;
				return [n[e], I(t) ? n[t] : t.value]
			}, reset() {
				I(t) ? o.proxy[t] = "" : t.value = ""
			}
		};
		n.addField(r), jo((() => {
			n.removeField(r)
		}))
	}("name", i), function (e, t, n, o, r, i) {
		function a() {
			const n = e.value;
			n && t.focus && t.selectionStart > -1 && t.selectionEnd > -1 && "number" !== n.type && (n.selectionStart = t.selectionStart, n.selectionEnd = t.selectionEnd)
		}

		function s() {
			const n = e.value;
			n && t.focus && t.selectionStart < 0 && t.selectionEnd < 0 && t.cursor > -1 && "number" !== n.type && (n.selectionEnd = n.selectionStart = t.cursor)
		}

		function l(e) {
			return "number" === e.type ? null : e.selectionEnd
		}

		Gn([() => t.selectionStart, () => t.selectionEnd], a), Gn((() => t.cursor), s), Gn((() => e.value), (function () {
			const c = e.value;
			if (!c) return;
			const u = function (e, o) {
				e.stopPropagation(), O(i) && !1 === i(e, t) || (t.value = c.value, t.composing && n.ignoreCompositionEvent || r(e, {
					value: c.value,
					cursor: l(c)
				}, o))
			};

			function d(e) {
				n.ignoreCompositionEvent || o(e.type, e, {value: e.data})
			}

			c.addEventListener("change", (e => e.stopPropagation())), c.addEventListener("focus", (function (e) {
				t.focus = !0, o("focus", e, {value: t.value}), a(), s()
			})), c.addEventListener("blur", (function (e) {
				t.composing && (t.composing = !1, u(e, !0)), t.focus = !1, o("blur", e, {
					value: t.value,
					cursor: l(e.target)
				})
			})), c.addEventListener("input", u), c.addEventListener("compositionstart", (e => {
				e.stopPropagation(), t.composing = !0, d(e)
			})), c.addEventListener("compositionend", (e => {
				e.stopPropagation(), t.composing && (t.composing = !1, u(e)), d(e)
			})), c.addEventListener("compositionupdate", d)
		}))
	}(r, i, e, a, s, o);
	return {
		fieldRef: r,
		state: i,
		scopedAttrsState: l,
		fixDisabledColor: 0 === String(navigator.vendor).indexOf("Apple") && CSS.supports("image-orientation:from-image"),
		trigger: a
	}
}

const hf = nu({
	name: "Input",
	props: S({}, cf, {
		placeholderClass: {type: String, default: "input-placeholder"},
		textContentType: {type: String, default: ""}
	}),
	emits: ["confirm", ...uf],
	setup(e, {emit: t}) {
		const n = ["text", "number", "idcard", "digit", "password", "tel"], o = ["off", "one-time-code"],
			r = yi((() => {
				let t = "";
				switch (e.type) {
					case"text":
						"search" === e.confirmType && (t = "search");
						break;
					case"idcard":
						t = "text";
						break;
					case"digit":
						t = "number";
						break;
					default:
						t = ~n.includes(e.type) ? e.type : "text"
				}
				return e.password ? "password" : t
			})), i = yi((() => {
				const t = o.indexOf(e.textContentType), n = o.indexOf(Q(e.textContentType));
				return o[-1 !== t ? t : -1 !== n ? n : 0]
			}));
		let a, s = nn("");
		const l = nn(null), {fieldRef: c, state: u, scopedAttrsState: d, fixDisabledColor: p, trigger: f} = ff(e, l, t, ((e, t) => {
			const n = e.target;
			if ("number" === r.value) {
				if (a && (n.removeEventListener("blur", a), a = null), n.validity && !n.validity.valid) {
					if ((!s.value || !n.value) && "-" === e.data || "-" === s.value[0] && "deleteContentBackward" === e.inputType) return s.value = "-", t.value = "", a = () => {
						s.value = n.value = ""
					}, n.addEventListener("blur", a), !1;
					if (s.value) if (-1 !== s.value.indexOf(".")) {
						if ("." !== e.data && "deleteContentBackward" === e.inputType) {
							const e = s.value.indexOf(".");
							return s.value = n.value = t.value = s.value.slice(0, e), !0
						}
					} else if ("." === e.data) return s.value += ".", a = () => {
						s.value = n.value = s.value.slice(0, -1)
					}, n.addEventListener("blur", a), !1;
					return s.value = t.value = n.value = "-" === s.value ? "" : s.value, !1
				}
				s.value = n.value;
				const o = t.maxlength;
				if (o > 0 && n.value.length > o) return n.value = n.value.slice(0, o), t.value = n.value, !1
			}
		}));
		Gn((() => u.value), (t => {
			"number" !== e.type || "-" === s.value && "" === t || (s.value = t)
		}));
		const h = ["number", "digit"], m = yi((() => h.includes(e.type) ? e.step : ""));

		function g(t) {
			if ("Enter" !== t.key) return;
			const n = t.target;
			t.stopPropagation(), f("confirm", t, {value: n.value}), !e.confirmHold && n.blur()
		}

		return () => {
			let t = e.disabled && p ? Kr("input", {
				key: "disabled-input",
				ref: c,
				value: u.value,
				tabindex: "-1",
				readonly: !!e.disabled,
				type: r.value,
				maxlength: u.maxlength,
				step: m.value,
				class: "uni-input-input",
				onFocus: e => e.target.blur()
			}, null, 40, ["value", "readonly", "type", "maxlength", "step", "onFocus"]) : qo(Kr("input", {
				key: "input",
				ref: c,
				"onUpdate:modelValue": e => u.value = e,
				disabled: !!e.disabled,
				type: r.value,
				maxlength: u.maxlength,
				step: m.value,
				enterkeyhint: e.confirmType,
				pattern: "number" === e.type ? "[0-9]*" : void 0,
				class: "uni-input-input",
				autocomplete: i.value,
				onKeyup: g,
				inputmode: e.inputmode
			}, null, 40, ["onUpdate:modelValue", "disabled", "type", "maxlength", "step", "enterkeyhint", "pattern", "autocomplete", "onKeyup", "inputmode"]), [[va, u.value]]);
			return Kr("uni-input", {ref: l}, [Kr("div", {class: "uni-input-wrapper"}, [qo(Kr("div", ii(d.attrs, {
				style: e.placeholderStyle,
				class: ["uni-input-placeholder", e.placeholderClass]
			}), [e.placeholder], 16), [[xa, !(u.value.length || "-" === s.value)]]), "search" === e.confirmType ? Kr("form", {
				action: "",
				onSubmit: e => e.preventDefault(),
				class: "uni-input-form"
			}, [t], 40, ["onSubmit"]) : t])], 512)
		}
	}
});
const mf = ["class", "style"], gf = /^on[A-Z]+/, vf = (e = {}) => {
	const {excludeListeners: t = !1, excludeKeys: n = []} = e, o = ui(), r = on({}), i = on({}), a = on({}),
		s = n.concat(mf);
	return o.attrs = qt(o.attrs), Yn((() => {
		const e = (n = o.attrs, Object.keys(n).map((e => [e, n[e]]))).reduce(((e, [n, o]) => (s.includes(n) ? e.exclude[n] = o : gf.test(n) ? (t || (e.attrs[n] = o), e.listeners[n] = o) : e.attrs[n] = o, e)), {
			exclude: {},
			attrs: {},
			listeners: {}
		});
		var n;
		r.value = e.attrs, i.value = e.listeners, a.value = e.exclude
	})), {$attrs: r, $listeners: i, $excludeAttrs: a}
};

function bf(e) {
	const t = [];
	return C(e) && e.forEach((e => {
		Qr(e) ? e.type === Mr ? t.push(...bf(e.children)) : t.push(e) : C(e) && t.push(...bf(e))
	})), t
}

const yf = nu({
	inheritAttrs: !1, name: "MovableArea", props: {scaleArea: {type: Boolean, default: !1}}, setup(e, {slots: t}) {
		const n = nn(null), o = nn(!1);
		let {setContexts: r, events: i} = function (e, t) {
			const n = nn(0), o = nn(0), r = qt({x: null, y: null}), i = nn(null);
			let a = null, s = [];

			function l(t) {
				t && 1 !== t && (e.scaleArea ? s.forEach((function (e) {
					e._setScale(t)
				})) : a && a._setScale(t))
			}

			function c(e, n = s) {
				let o = t.value;

				function r(e) {
					for (let t = 0; t < n.length; t++) {
						const o = n[t];
						if (e === o.rootRef.value) return o
					}
					return e === o || e === document.body || e === document ? null : r(e.parentNode)
				}

				return r(e)
			}

			const u = su((t => {
				let n = t.touches;
				if (n && n.length > 1) {
					let t = {x: n[1].pageX - n[0].pageX, y: n[1].pageY - n[0].pageY};
					if (i.value = _f(t), r.x = t.x, r.y = t.y, !e.scaleArea) {
						let e = c(n[0].target), t = c(n[1].target);
						a = e && e === t ? e : null
					}
				}
			})), d = su((e => {
				let t = e.touches;
				if (t && t.length > 1) {
					e.preventDefault();
					let n = {x: t[1].pageX - t[0].pageX, y: t[1].pageY - t[0].pageY};
					if (null !== r.x && i.value && i.value > 0) {
						l(_f(n) / i.value)
					}
					r.x = n.x, r.y = n.y
				}
			})), p = su((t => {
				let n = t.touches;
				n && n.length || t.changedTouches && (r.x = 0, r.y = 0, i.value = null, e.scaleArea ? s.forEach((function (e) {
					e._endScale()
				})) : a && a._endScale())
			}));

			function f() {
				h(), s.forEach((function (e, t) {
					e.setParent()
				}))
			}

			function h() {
				let e = window.getComputedStyle(t.value), r = t.value.getBoundingClientRect();
				n.value = r.width - ["Left", "Right"].reduce((function (t, n) {
					const o = "padding" + n;
					return t + parseFloat(e["border" + n + "Width"]) + parseFloat(e[o])
				}), 0), o.value = r.height - ["Top", "Bottom"].reduce((function (t, n) {
					const o = "padding" + n;
					return t + parseFloat(e["border" + n + "Width"]) + parseFloat(e[o])
				}), 0)
			}

			return Un("movableAreaWidth", n), Un("movableAreaHeight", o), {
				setContexts(e) {
					s = e
				}, events: {_onTouchstart: u, _onTouchmove: d, _onTouchend: p, _resize: f}
			}
		}(e, n);
		const {$listeners: a, $attrs: s, $excludeAttrs: l} = vf(), c = a.value;
		["onTouchstart", "onTouchmove", "onTouchend"].forEach((e => {
			let t = c[e], n = i[`_${e}`];
			c[e] = t ? [].concat(t, n) : n
		})), Io((() => {
			i._resize(), o.value = !0
		}));
		let u = [];
		const d = [];

		function p() {
			const e = [];
			for (let t = 0; t < u.length; t++) {
				let n = u[t];
				n = n.el;
				const o = d.find((e => n === e.rootRef.value));
				o && e.push(Jt(o))
			}
			r(e)
		}

		return Un("_isMounted", o), Un("movableAreaRootRef", n), Un("addMovableViewContext", (e => {
			d.push(e), p()
		})), Un("removeMovableViewContext", (e => {
			const t = d.indexOf(e);
			t >= 0 && (d.splice(t, 1), p())
		})), () => {
			const e = t.default && t.default();
			return u = bf(e), Kr("uni-movable-area", ii({ref: n}, s.value, l.value, c), [Kr(Lp, {onResize: i._resize}, null, 8, ["onResize"]), u], 16)
		}
	}
});

function _f(e) {
	return Math.sqrt(e.x * e.x + e.y * e.y)
}

const wf = function (e, t, n, o) {
	e.addEventListener(t, (e => {
		O(n) && !1 === n(e) && ((void 0 === e.cancelable || e.cancelable) && e.preventDefault(), e.stopPropagation())
	}), {passive: !1})
};
let xf, Tf;

function Sf(e, t, n) {
	jo((() => {
		document.removeEventListener("mousemove", xf), document.removeEventListener("mouseup", Tf)
	}));
	let o = 0, r = 0, i = 0, a = 0;
	const s = function (e, n, s, l) {
		if (!1 === t({
			cancelable: e.cancelable,
			target: e.target,
			currentTarget: e.currentTarget,
			preventDefault: e.preventDefault.bind(e),
			stopPropagation: e.stopPropagation.bind(e),
			touches: e.touches,
			changedTouches: e.changedTouches,
			detail: {state: n, x: s, y: l, dx: s - o, dy: l - r, ddx: s - i, ddy: l - a, timeStamp: e.timeStamp}
		})) return !1
	};
	let l, c, u = null;
	wf(e, "touchstart", (function (e) {
		if (l = !0, 1 === e.touches.length && !u) return u = e, o = i = e.touches[0].pageX, r = a = e.touches[0].pageY, s(e, "start", o, r)
	})), wf(e, "mousedown", (function (e) {
		if (c = !0, !l && !u) return u = e, o = i = e.pageX, r = a = e.pageY, s(e, "start", o, r)
	})), wf(e, "touchmove", (function (e) {
		if (1 === e.touches.length && u) {
			const t = s(e, "move", e.touches[0].pageX, e.touches[0].pageY);
			return i = e.touches[0].pageX, a = e.touches[0].pageY, t
		}
	}));
	const d = xf = function (e) {
		if (!l && c && u) {
			const t = s(e, "move", e.pageX, e.pageY);
			return i = e.pageX, a = e.pageY, t
		}
	};
	document.addEventListener("mousemove", d), wf(e, "touchend", (function (e) {
		if (0 === e.touches.length && u) return l = !1, u = null, s(e, "end", e.changedTouches[0].pageX, e.changedTouches[0].pageY)
	}));
	const p = Tf = function (e) {
		if (c = !1, !l && u) return u = null, s(e, "end", e.pageX, e.pageY)
	};
	document.addEventListener("mouseup", p), wf(e, "touchcancel", (function (e) {
		if (u) {
			l = !1;
			const t = u;
			return u = null, s(e, n ? "cancel" : "end", t.touches[0].pageX, t.touches[0].pageY)
		}
	}))
}

function Ef(e, t, n) {
	return e > t - n && e < t + n
}

function kf(e, t) {
	return Ef(e, 0, t)
}

function Af() {
}

function Cf(e, t) {
	this._m = e, this._f = 1e3 * t, this._startTime = 0, this._v = 0
}

function Bf(e, t, n) {
	this._m = e, this._k = t, this._c = n, this._solution = null, this._endPosition = 0, this._startTime = 0
}

function Pf(e, t, n) {
	this._springX = new Bf(e, t, n), this._springY = new Bf(e, t, n), this._springScale = new Bf(e, t, n), this._startTime = 0
}

Af.prototype.x = function (e) {
	return Math.sqrt(e)
}, Cf.prototype.setV = function (e, t) {
	const n = Math.pow(Math.pow(e, 2) + Math.pow(t, 2), .5);
	this._x_v = e, this._y_v = t, this._x_a = -this._f * this._x_v / n, this._y_a = -this._f * this._y_v / n, this._t = Math.abs(e / this._x_a) || Math.abs(t / this._y_a), this._lastDt = null, this._startTime = (new Date).getTime()
}, Cf.prototype.setS = function (e, t) {
	this._x_s = e, this._y_s = t
}, Cf.prototype.s = function (e) {
	void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), e > this._t && (e = this._t, this._lastDt = e);
	let t = this._x_v * e + .5 * this._x_a * Math.pow(e, 2) + this._x_s,
		n = this._y_v * e + .5 * this._y_a * Math.pow(e, 2) + this._y_s;
	return (this._x_a > 0 && t < this._endPositionX || this._x_a < 0 && t > this._endPositionX) && (t = this._endPositionX), (this._y_a > 0 && n < this._endPositionY || this._y_a < 0 && n > this._endPositionY) && (n = this._endPositionY), {
		x: t,
		y: n
	}
}, Cf.prototype.ds = function (e) {
	return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), e > this._t && (e = this._t), {
		dx: this._x_v + this._x_a * e,
		dy: this._y_v + this._y_a * e
	}
}, Cf.prototype.delta = function () {
	return {x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0, y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0}
}, Cf.prototype.dt = function () {
	return -this._x_v / this._x_a
}, Cf.prototype.done = function () {
	const e = Ef(this.s().x, this._endPositionX) || Ef(this.s().y, this._endPositionY) || this._lastDt === this._t;
	return this._lastDt = null, e
}, Cf.prototype.setEnd = function (e, t) {
	this._endPositionX = e, this._endPositionY = t
}, Cf.prototype.reconfigure = function (e, t) {
	this._m = e, this._f = 1e3 * t
}, Bf.prototype._solve = function (e, t) {
	const n = this._c, o = this._m, r = this._k, i = n * n - 4 * o * r;
	if (0 === i) {
		const r = -n / (2 * o), i = e, a = t / (r * e);
		return {
			x: function (e) {
				return (i + a * e) * Math.pow(Math.E, r * e)
			}, dx: function (e) {
				const t = Math.pow(Math.E, r * e);
				return r * (i + a * e) * t + a * t
			}
		}
	}
	if (i > 0) {
		const r = (-n - Math.sqrt(i)) / (2 * o), a = (-n + Math.sqrt(i)) / (2 * o), s = (t - r * e) / (a - r),
			l = e - s;
		return {
			x: function (e) {
				let t, n;
				return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, a * e)), l * t + s * n
			}, dx: function (e) {
				let t, n;
				return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, a * e)), l * r * t + s * a * n
			}
		}
	}
	const a = Math.sqrt(4 * o * r - n * n) / (2 * o), s = -n / 2 * o, l = e, c = (t - s * e) / a;
	return {
		x: function (e) {
			return Math.pow(Math.E, s * e) * (l * Math.cos(a * e) + c * Math.sin(a * e))
		}, dx: function (e) {
			const t = Math.pow(Math.E, s * e), n = Math.cos(a * e), o = Math.sin(a * e);
			return t * (c * a * n - l * a * o) + s * t * (c * o + l * n)
		}
	}
}, Bf.prototype.x = function (e) {
	return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(e) : 0
}, Bf.prototype.dx = function (e) {
	return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(e) : 0
}, Bf.prototype.setEnd = function (e, t, n) {
	if (n || (n = (new Date).getTime()), e !== this._endPosition || !kf(t, .1)) {
		t = t || 0;
		let o = this._endPosition;
		this._solution && (kf(t, .1) && (t = this._solution.dx((n - this._startTime) / 1e3)), o = this._solution.x((n - this._startTime) / 1e3), kf(t, .1) && (t = 0), kf(o, .1) && (o = 0), o += this._endPosition), this._solution && kf(o - e, .1) && kf(t, .1) || (this._endPosition = e, this._solution = this._solve(o - this._endPosition, t), this._startTime = n)
	}
}, Bf.prototype.snap = function (e) {
	this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
		x: function () {
			return 0
		}, dx: function () {
			return 0
		}
	}
}, Bf.prototype.done = function (e) {
	return e || (e = (new Date).getTime()), Ef(this.x(), this._endPosition, .1) && kf(this.dx(), .1)
}, Bf.prototype.reconfigure = function (e, t, n) {
	this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this._endPosition, this.dx()), this._startTime = (new Date).getTime())
}, Bf.prototype.springConstant = function () {
	return this._k
}, Bf.prototype.damping = function () {
	return this._c
}, Bf.prototype.configuration = function () {
	return [{
		label: "Spring Constant", read: this.springConstant.bind(this), write: function (e, t) {
			e.reconfigure(1, t, e.damping())
		}.bind(this, this), min: 100, max: 1e3
	}, {
		label: "Damping", read: this.damping.bind(this), write: function (e, t) {
			e.reconfigure(1, e.springConstant(), t)
		}.bind(this, this), min: 1, max: 500
	}]
}, Pf.prototype.setEnd = function (e, t, n, o) {
	const r = (new Date).getTime();
	this._springX.setEnd(e, o, r), this._springY.setEnd(t, o, r), this._springScale.setEnd(n, o, r), this._startTime = r
}, Pf.prototype.x = function () {
	const e = ((new Date).getTime() - this._startTime) / 1e3;
	return {x: this._springX.x(e), y: this._springY.x(e), scale: this._springScale.x(e)}
}, Pf.prototype.done = function () {
	const e = (new Date).getTime();
	return this._springX.done(e) && this._springY.done(e) && this._springScale.done(e)
}, Pf.prototype.reconfigure = function (e, t, n) {
	this._springX.reconfigure(e, t, n), this._springY.reconfigure(e, t, n), this._springScale.reconfigure(e, t, n)
};

function Lf(e, t) {
	return +((1e3 * e - 1e3 * t) / 1e3).toFixed(1)
}

const Of = nu({
	name: "MovableView",
	props: {
		direction: {type: String, default: "none"},
		inertia: {type: [Boolean, String], default: !1},
		outOfBounds: {type: [Boolean, String], default: !1},
		x: {type: [Number, String], default: 0},
		y: {type: [Number, String], default: 0},
		damping: {type: [Number, String], default: 20},
		friction: {type: [Number, String], default: 2},
		disabled: {type: [Boolean, String], default: !1},
		scale: {type: [Boolean, String], default: !1},
		scaleMin: {type: [Number, String], default: .5},
		scaleMax: {type: [Number, String], default: 10},
		scaleValue: {type: [Number, String], default: 1},
		animation: {type: [Boolean, String], default: !0}
	},
	emits: ["change", "scale"],
	setup(e, {slots: t, emit: n}) {
		const o = nn(null), r = lu(o, n), {setParent: i} = function (e, t, n) {
			const o = Xn("_isMounted", nn(!1)), r = Xn("addMovableViewContext", (() => {
			})), i = Xn("removeMovableViewContext", (() => {
			}));
			let a, s, l = nn(1), c = nn(1), u = nn(!1), d = nn(0), p = nn(0), f = null, h = null, m = !1, g = null,
				v = null;
			const b = new Af, y = new Af, _ = {historyX: [0, 0], historyY: [0, 0], historyT: [0, 0]}, w = yi((() => {
				let t = Number(e.friction);
				return isNaN(t) || t <= 0 ? 2 : t
			})), x = new Cf(1, w.value);
			Gn((() => e.disabled), (() => {
				$()
			}));
			const {_updateOldScale: T, _endScale: S, _setScale: E, scaleValueSync: k, _updateBoundary: A, _updateOffset: C, _updateWH: B, _scaleOffset: P, minX: L, minY: O, maxX: I, maxY: M, FAandSFACancel: F, _getLimitXY: j, _setTransform: R, _revise: N, dampingNumber: D, xMove: z, yMove: H, xSync: q, ySync: V, _STD: W} = function (e, t, n, o, r, i, a, s, l, c) {
				const u = yi((() => {
					let t = Number(e.scaleMin);
					return isNaN(t) ? .5 : t
				})), d = yi((() => {
					let t = Number(e.scaleMax);
					return isNaN(t) ? 10 : t
				})), p = nn(Number(e.scaleValue) || 1);
				Gn(p, (e => {
					R(e)
				})), Gn(u, (() => {
					j()
				})), Gn(d, (() => {
					j()
				})), Gn((() => e.scaleValue), (e => {
					p.value = Number(e) || 0
				}));
				const {_updateBoundary: f, _updateOffset: h, _updateWH: m, _scaleOffset: g, minX: v, minY: b, maxX: y, maxY: _} = function (e, t, n) {
					const o = Xn("movableAreaWidth", nn(0)), r = Xn("movableAreaHeight", nn(0)),
						i = Xn("movableAreaRootRef"), a = {x: 0, y: 0}, s = {x: 0, y: 0}, l = nn(0), c = nn(0),
						u = nn(0), d = nn(0), p = nn(0), f = nn(0);

					function h() {
						let e = 0 - a.x + s.x, t = o.value - l.value - a.x - s.x;
						u.value = Math.min(e, t), p.value = Math.max(e, t);
						let n = 0 - a.y + s.y, i = r.value - c.value - a.y - s.y;
						d.value = Math.min(n, i), f.value = Math.max(n, i)
					}

					function m() {
						a.x = Ff(e.value, i.value), a.y = jf(e.value, i.value)
					}

					function g(o) {
						o = o || t.value, o = n(o);
						let r = e.value.getBoundingClientRect();
						c.value = r.height / t.value, l.value = r.width / t.value;
						let i = c.value * o, a = l.value * o;
						s.x = (a - l.value) / 2, s.y = (i - c.value) / 2
					}

					return {
						_updateBoundary: h,
						_updateOffset: m,
						_updateWH: g,
						_scaleOffset: s,
						minX: u,
						minY: d,
						maxX: p,
						maxY: f
					}
				}(t, o, F), {FAandSFACancel: w, _getLimitXY: x, _animationTo: T, _setTransform: S, _revise: E, dampingNumber: k, xMove: A, yMove: C, xSync: B, ySync: P, _STD: L} = function (e, t, n, o, r, i, a, s, l, c, u, d, p, f) {
					const h = yi((() => {
							let e = Number(t.damping);
							return isNaN(e) ? 20 : e
						})), m = yi((() => "all" === t.direction || "horizontal" === t.direction)),
						g = yi((() => "all" === t.direction || "vertical" === t.direction)), v = nn(Nf(t.x)),
						b = nn(Nf(t.y));
					Gn((() => t.x), (e => {
						v.value = Nf(e)
					})), Gn((() => t.y), (e => {
						b.value = Nf(e)
					})), Gn(v, (e => {
						E(e)
					})), Gn(b, (e => {
						k(e)
					}));
					const y = new Pf(1, 9 * Math.pow(h.value, 2) / 40, h.value);

					function _(e, t) {
						let n = !1;
						return e > r.value ? (e = r.value, n = !0) : e < a.value && (e = a.value, n = !0), t > i.value ? (t = i.value, n = !0) : t < s.value && (t = s.value, n = !0), {
							x: e,
							y: t,
							outOfBounds: n
						}
					}

					function w() {
						d && d.cancel(), u && u.cancel()
					}

					function x(e, n, r, i, a, s) {
						w(), m.value || (e = l.value), g.value || (n = c.value), t.scale || (r = o.value);
						let d = _(e, n);
						e = d.x, n = d.y, t.animation ? (y._springX._solution = null, y._springY._solution = null, y._springScale._solution = null, y._springX._endPosition = l.value, y._springY._endPosition = c.value, y._springScale._endPosition = o.value, y.setEnd(e, n, r, 1), u = Rf(y, (function () {
							let e = y.x();
							T(e.x, e.y, e.scale, i, a, s)
						}), (function () {
							u.cancel()
						}))) : T(e, n, r, i, a, s)
					}

					function T(r, i, a, s = "", u, d) {
						null !== r && "NaN" !== r.toString() && "number" == typeof r || (r = l.value || 0), null !== i && "NaN" !== i.toString() && "number" == typeof i || (i = c.value || 0), r = Number(r.toFixed(1)), i = Number(i.toFixed(1)), a = Number(a.toFixed(1)), l.value === r && c.value === i || u || f("change", {}, {
							x: Lf(r, n.x),
							y: Lf(i, n.y),
							source: s
						}), t.scale || (a = o.value), a = +(a = p(a)).toFixed(3), d && a !== o.value && f("scale", {}, {
							x: r,
							y: i,
							scale: a
						});
						let h = "translateX(" + r + "px) translateY(" + i + "px) translateZ(0px) scale(" + a + ")";
						e.value && (e.value.style.transform = h, e.value.style.webkitTransform = h, l.value = r, c.value = i, o.value = a)
					}

					function S(e) {
						let t = _(l.value, c.value), n = t.x, r = t.y, i = t.outOfBounds;
						return i && x(n, r, o.value, e), i
					}

					function E(e) {
						if (m.value) {
							if (e + n.x === l.value) return l;
							u && u.cancel(), x(e + n.x, b.value + n.y, o.value)
						}
						return e
					}

					function k(e) {
						if (g.value) {
							if (e + n.y === c.value) return c;
							u && u.cancel(), x(v.value + n.x, e + n.y, o.value)
						}
						return e
					}

					return {
						FAandSFACancel: w,
						_getLimitXY: _,
						_animationTo: x,
						_setTransform: T,
						_revise: S,
						dampingNumber: h,
						xMove: m,
						yMove: g,
						xSync: v,
						ySync: b,
						_STD: y
					}
				}(t, e, g, o, y, _, v, b, a, s, l, c, F, n);

				function O(t, n) {
					if (e.scale) {
						t = F(t), m(t), f();
						const e = x(a.value, s.value), o = e.x, r = e.y;
						n ? T(o, r, t, "", !0, !0) : Mf((function () {
							S(o, r, t, "", !0, !0)
						}))
					}
				}

				function I() {
					i.value = !0
				}

				function M(e) {
					r.value = e
				}

				function F(e) {
					return e = Math.max(.5, u.value, e), e = Math.min(10, d.value, e)
				}

				function j() {
					if (!e.scale) return !1;
					O(o.value, !0), M(o.value)
				}

				function R(t) {
					return !!e.scale && (O(t = F(t), !0), M(t), t)
				}

				function N() {
					i.value = !1, M(o.value)
				}

				function D(e) {
					e && (e = r.value * e, I(), O(e))
				}

				return {
					_updateOldScale: M,
					_endScale: N,
					_setScale: D,
					scaleValueSync: p,
					_updateBoundary: f,
					_updateOffset: h,
					_updateWH: m,
					_scaleOffset: g,
					minX: v,
					minY: b,
					maxX: y,
					maxY: _,
					FAandSFACancel: w,
					_getLimitXY: x,
					_animationTo: T,
					_setTransform: S,
					_revise: E,
					dampingNumber: k,
					xMove: A,
					yMove: C,
					xSync: B,
					ySync: P,
					_STD: L
				}
			}(e, n, t, l, c, u, d, p, f, h);

			function $() {
				u.value || e.disabled || (F(), _.historyX = [0, 0], _.historyY = [0, 0], _.historyT = [0, 0], z.value && (a = d.value), H.value && (s = p.value), n.value.style.willChange = "transform", g = null, v = null, m = !0)
			}

			function Q(t) {
				if (!u.value && !e.disabled && m) {
					let n = d.value, o = p.value;
					if (null === v && (v = Math.abs(t.detail.dx / t.detail.dy) > 1 ? "htouchmove" : "vtouchmove"), z.value && (n = t.detail.dx + a, _.historyX.shift(), _.historyX.push(n), H.value || null !== g || (g = Math.abs(t.detail.dx / t.detail.dy) < 1)), H.value && (o = t.detail.dy + s, _.historyY.shift(), _.historyY.push(o), z.value || null !== g || (g = Math.abs(t.detail.dy / t.detail.dx) < 1)), _.historyT.shift(), _.historyT.push(t.detail.timeStamp), !g) {
						t.preventDefault();
						let r = "touch";
						n < L.value ? e.outOfBounds ? (r = "touch-out-of-bounds", n = L.value - b.x(L.value - n)) : n = L.value : n > I.value && (e.outOfBounds ? (r = "touch-out-of-bounds", n = I.value + b.x(n - I.value)) : n = I.value), o < O.value ? e.outOfBounds ? (r = "touch-out-of-bounds", o = O.value - y.x(O.value - o)) : o = O.value : o > M.value && (e.outOfBounds ? (r = "touch-out-of-bounds", o = M.value + y.x(o - M.value)) : o = M.value), Mf((function () {
							R(n, o, l.value, r)
						}))
					}
				}
			}

			function U() {
				if (!u.value && !e.disabled && m && (n.value.style.willChange = "auto", m = !1, !g && !N("out-of-bounds") && e.inertia)) {
					const e = 1e3 * (_.historyX[1] - _.historyX[0]) / (_.historyT[1] - _.historyT[0]),
						t = 1e3 * (_.historyY[1] - _.historyY[0]) / (_.historyT[1] - _.historyT[0]), n = d.value,
						o = p.value;
					x.setV(e, t), x.setS(n, o);
					const r = x.delta().x, i = x.delta().y;
					let a = r + n, s = i + o;
					a < L.value ? (a = L.value, s = o + (L.value - n) * i / r) : a > I.value && (a = I.value, s = o + (I.value - n) * i / r), s < O.value ? (s = O.value, a = n + (O.value - o) * r / i) : s > M.value && (s = M.value, a = n + (M.value - o) * r / i), x.setEnd(a, s), h = Rf(x, (function () {
						let e = x.s(), t = e.x, n = e.y;
						R(t, n, l.value, "friction")
					}), (function () {
						h.cancel()
					}))
				}
				e.outOfBounds || e.inertia || F()
			}

			function X() {
				if (!o.value) return;
				F();
				let t = e.scale ? k.value : 1;
				C(), B(t), A();
				let n = j(q.value + P.x, V.value + P.y), r = n.x, i = n.y;
				R(r, i, t, "", !0), T(t)
			}

			return Io((() => {
				Sf(n.value, (e => {
					switch (e.detail.state) {
						case"start":
							$();
							break;
						case"move":
							Q(e);
							break;
						case"end":
							U()
					}
				})), X(), x.reconfigure(1, w.value), W.reconfigure(1, 9 * Math.pow(D.value, 2) / 40, D.value), n.value.style.transformOrigin = "center";
				const e = {rootRef: n, setParent: X, _endScale: S, _setScale: E};
				r(e), Ro((() => {
					i(e)
				}))
			})), Ro((() => {
				F()
			})), {setParent: X}
		}(e, r, o);
		return () => Kr("uni-movable-view", {ref: o}, [Kr(Lp, {onResize: i}, null, 8, ["onResize"]), t.default && t.default()], 512)
	}
});
let If = !1;

function Mf(e) {
	If || (If = !0, requestAnimationFrame((function () {
		e(), If = !1
	})))
}

function Ff(e, t) {
	if (e === t) return 0;
	let n = e.offsetLeft;
	return e.offsetParent ? n += Ff(e.offsetParent, t) : 0
}

function jf(e, t) {
	if (e === t) return 0;
	let n = e.offsetTop;
	return e.offsetParent ? n += jf(e.offsetParent, t) : 0
}

function Rf(e, t, n) {
	let o = {id: 0, cancelled: !1};
	return function e(t, n, o, r) {
		if (!t || !t.cancelled) {
			o(n);
			let i = n.done();
			i || t.cancelled || (t.id = requestAnimationFrame(e.bind(null, t, n, o, r))), i && r && r(n)
		}
	}(o, e, t, n), {
		cancel: function (e) {
			e && e.id && cancelAnimationFrame(e.id), e && (e.cancelled = !0)
		}.bind(null, o), model: e
	}
}

function Nf(e) {
	return /\d+[ur]px$/i.test(e) ? vd(parseFloat(e)) : Number(e) || 0
}

const Df = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"],
	zf = ["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out", "zoom-fade-out", "pop-in", "none"],
	Hf = ["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in", "zoom-fade-in", "pop-out", "none"],
	qf = {
		hoverClass: {type: String, default: "navigator-hover"},
		url: {type: String, default: ""},
		openType: {type: String, default: "navigate", validator: e => Boolean(~Df.indexOf(e))},
		delta: {type: Number, default: 1},
		hoverStartTime: {type: [Number, String], default: 50},
		hoverStayTime: {type: [Number, String], default: 600},
		exists: {type: String, default: ""},
		hoverStopPropagation: {type: Boolean, default: !1},
		animationType: {type: String, default: "", validator: e => !e || zf.concat(Hf).includes(e)},
		animationDuration: {type: [String, Number], default: 300}
	};
S({}, qf, {renderLink: {type: Boolean, default: !0}});
const Vf = nu({
	name: "PickerView", props: {
		value: {
			type: Array, default: () => [], validator: function (e) {
				return C(e) && e.filter((e => "number" == typeof e)).length === e.length
			}
		},
		indicatorStyle: {type: String, default: ""},
		indicatorClass: {type: String, default: ""},
		maskStyle: {type: String, default: ""},
		maskClass: {type: String, default: ""}
	}, emits: ["change", "pickstart", "pickend", "update:value"], setup(e, {slots: t, emit: n}) {
		const o = nn(null), r = nn(null), i = lu(o, n), a = function (e) {
			const t = qt([...e.value]), n = qt({value: t, height: 34});
			return Gn((() => e.value), ((e, t) => {
				n.value.length = e.length, e.forEach(((e, t) => {
					e !== n.value[t] && n.value.splice(t, 1, e)
				}))
			})), n
		}(e), s = nn(null);
		Io((() => {
			const e = s.value;
			e && (a.height = e.$el.offsetHeight)
		}));
		let l = nn([]), c = nn([]);

		function u(e) {
			let t = c.value;
			t = t.filter((e => e.type !== jr));
			let n = t.indexOf(e);
			return -1 !== n ? n : l.value.indexOf(e)
		}

		return Un("getPickerViewColumn", (function (e) {
			return yi({
				get() {
					const t = u(e.vnode);
					return a.value[t] || 0
				}, set(t) {
					const o = u(e.vnode);
					if (o < 0) return;
					if (a.value[o] !== t) {
						a.value[o] = t;
						const e = a.value.map((e => e));
						n("update:value", e), i("change", {}, {value: e})
					}
				}
			})
		})), Un("pickerViewProps", e), Un("pickerViewState", a), () => {
			const e = t.default && t.default();
			{
				const t = bf(e);
				l.value = t, kn((() => {
					c.value = t
				}))
			}
			return Kr("uni-picker-view", {ref: o}, [Kr(Lp, {
				ref: s,
				onResize: ({height: e}) => a.height = e
			}, null, 8, ["onResize"]), Kr("div", {ref: r, class: "uni-picker-view-wrapper"}, [e], 512)], 512)
		}
	}
});

class Wf {
	constructor(e) {
		this._drag = e, this._dragLog = Math.log(e), this._x = 0, this._v = 0, this._startTime = 0
	}

	set(e, t) {
		this._x = e, this._v = t, this._startTime = (new Date).getTime()
	}

	setVelocityByEnd(e) {
		this._v = (e - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1)
	}

	x(e) {
		void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3);
		const t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
		return this._dt = e, this._x + this._v * t / this._dragLog - this._v / this._dragLog
	}

	dx(e) {
		void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3);
		const t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
		return this._dt = e, this._v * t
	}

	done() {
		return Math.abs(this.dx()) < 3
	}

	reconfigure(e) {
		const t = this.x(), n = this.dx();
		this._drag = e, this._dragLog = Math.log(e), this.set(t, n)
	}

	configuration() {
		const e = this;
		return [{
			label: "Friction", read: function () {
				return e._drag
			}, write: function (t) {
				e.reconfigure(t)
			}, min: .001, max: .1, step: .001
		}]
	}
}

function $f(e, t, n) {
	return e > t - n && e < t + n
}

function Qf(e, t) {
	return $f(e, 0, t)
}

class Uf {
	constructor(e, t, n) {
		this._m = e, this._k = t, this._c = n, this._solution = null, this._endPosition = 0, this._startTime = 0
	}

	_solve(e, t) {
		const n = this._c, o = this._m, r = this._k, i = n * n - 4 * o * r;
		if (0 === i) {
			const r = -n / (2 * o), i = e, a = t / (r * e);
			return {
				x: function (e) {
					return (i + a * e) * Math.pow(Math.E, r * e)
				}, dx: function (e) {
					const t = Math.pow(Math.E, r * e);
					return r * (i + a * e) * t + a * t
				}
			}
		}
		if (i > 0) {
			const r = (-n - Math.sqrt(i)) / (2 * o), a = (-n + Math.sqrt(i)) / (2 * o), s = (t - r * e) / (a - r),
				l = e - s;
			return {
				x: function (e) {
					let t, n;
					return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, a * e)), l * t + s * n
				}, dx: function (e) {
					let t, n;
					return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, a * e)), l * r * t + s * a * n
				}
			}
		}
		const a = Math.sqrt(4 * o * r - n * n) / (2 * o), s = -n / 2 * o, l = e, c = (t - s * e) / a;
		return {
			x: function (e) {
				return Math.pow(Math.E, s * e) * (l * Math.cos(a * e) + c * Math.sin(a * e))
			}, dx: function (e) {
				const t = Math.pow(Math.E, s * e), n = Math.cos(a * e), o = Math.sin(a * e);
				return t * (c * a * n - l * a * o) + s * t * (c * o + l * n)
			}
		}
	}

	x(e) {
		return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(e) : 0
	}

	dx(e) {
		return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(e) : 0
	}

	setEnd(e, t, n) {
		if (n || (n = (new Date).getTime()), e !== this._endPosition || !Qf(t, .4)) {
			t = t || 0;
			let o = this._endPosition;
			this._solution && (Qf(t, .4) && (t = this._solution.dx((n - this._startTime) / 1e3)), o = this._solution.x((n - this._startTime) / 1e3), Qf(t, .4) && (t = 0), Qf(o, .4) && (o = 0), o += this._endPosition), this._solution && Qf(o - e, .4) && Qf(t, .4) || (this._endPosition = e, this._solution = this._solve(o - this._endPosition, t), this._startTime = n)
		}
	}

	snap(e) {
		this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
			x: function () {
				return 0
			}, dx: function () {
				return 0
			}
		}
	}

	done(e) {
		return e || (e = (new Date).getTime()), $f(this.x(), this._endPosition, .4) && Qf(this.dx(), .4)
	}

	reconfigure(e, t, n) {
		this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this._endPosition, this.dx()), this._startTime = (new Date).getTime())
	}

	springConstant() {
		return this._k
	}

	damping() {
		return this._c
	}

	configuration() {
		return [{
			label: "Spring Constant", read: this.springConstant.bind(this), write: function (e, t) {
				e.reconfigure(1, t, e.damping())
			}.bind(this, this), min: 100, max: 1e3
		}, {
			label: "Damping", read: this.damping.bind(this), write: function (e, t) {
				e.reconfigure(1, e.springConstant(), t)
			}.bind(this, this), min: 1, max: 500
		}]
	}
}

class Xf {
	constructor(e, t, n) {
		this._extent = e, this._friction = t || new Wf(.01), this._spring = n || new Uf(1, 90, 20), this._startTime = 0, this._springing = !1, this._springOffset = 0
	}

	snap(e, t) {
		this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(t)
	}

	set(e, t) {
		this._friction.set(e, t), e > 0 && t >= 0 ? (this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(0)) : e < -this._extent && t <= 0 ? (this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(-this._extent)) : this._springing = !1, this._startTime = (new Date).getTime()
	}

	x(e) {
		if (!this._startTime) return 0;
		if (e || (e = ((new Date).getTime() - this._startTime) / 1e3), this._springing) return this._spring.x() + this._springOffset;
		let t = this._friction.x(e), n = this.dx(e);
		return (t > 0 && n >= 0 || t < -this._extent && n <= 0) && (this._springing = !0, this._spring.setEnd(0, n), t < -this._extent ? this._springOffset = -this._extent : this._springOffset = 0, t = this._spring.x() + this._springOffset), t
	}

	dx(e) {
		let t;
		return t = this._lastTime === e ? this._lastDx : this._springing ? this._spring.dx(e) : this._friction.dx(e), this._lastTime = e, this._lastDx = t, t
	}

	done() {
		return this._springing ? this._spring.done() : this._friction.done()
	}

	setVelocityByEnd(e) {
		this._friction.setVelocityByEnd(e)
	}

	configuration() {
		const e = this._friction.configuration();
		return e.push.apply(e, this._spring.configuration()), e
	}
}

class Yf {
	constructor(e, t) {
		t = t || {}, this._element = e, this._options = t, this._enableSnap = t.enableSnap || !1, this._itemSize = t.itemSize || 0, this._enableX = t.enableX || !1, this._enableY = t.enableY || !1, this._shouldDispatchScrollEvent = !!t.onScroll, this._enableX ? (this._extent = (t.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth, this._scrollWidth = t.scrollWidth) : (this._extent = (t.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight, this._scrollHeight = t.scrollHeight), this._position = 0, this._scroll = new Xf(this._extent, t.friction, t.spring), this._onTransitionEnd = this.onTransitionEnd.bind(this), this.updatePosition()
	}

	onTouchStart() {
		this._startPosition = this._position, this._lastChangePos = this._startPosition, this._startPosition > 0 ? this._startPosition /= .5 : this._startPosition < -this._extent && (this._startPosition = (this._startPosition + this._extent) / .5 - this._extent), this._animation && (this._animation.cancel(), this._scrolling = !1), this.updatePosition()
	}

	onTouchMove(e, t) {
		let n = this._startPosition;
		this._enableX ? n += e : this._enableY && (n += t), n > 0 ? n *= .5 : n < -this._extent && (n = .5 * (n + this._extent) - this._extent), this._position = n, this.updatePosition(), this.dispatchScroll()
	}

	onTouchEnd(e, t, n) {
		if (this._enableSnap && this._position > -this._extent && this._position < 0) {
			if (this._enableY && (Math.abs(t) < this._itemSize && Math.abs(n.y) < 300 || Math.abs(n.y) < 150)) return void this.snap();
			if (this._enableX && (Math.abs(e) < this._itemSize && Math.abs(n.x) < 300 || Math.abs(n.x) < 150)) return void this.snap()
		}
		let o;
		if (this._enableX ? this._scroll.set(this._position, n.x) : this._enableY && this._scroll.set(this._position, n.y), this._enableSnap) {
			const e = this._scroll._friction.x(100), t = e % this._itemSize;
			o = Math.abs(t) > this._itemSize / 2 ? e - (this._itemSize - Math.abs(t)) : e - t, o <= 0 && o >= -this._extent && this._scroll.setVelocityByEnd(o)
		}
		this._lastTime = Date.now(), this._lastDelay = 0, this._scrolling = !0, this._lastChangePos = this._position, this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize)), this._animation = function (e, t, n) {
			const o = {id: 0, cancelled: !1};
			return function e(t, n, o, r) {
				if (!t || !t.cancelled) {
					o(n);
					const i = n.done();
					i || t.cancelled || (t.id = requestAnimationFrame(e.bind(null, t, n, o, r))), i && r && r(n)
				}
			}(o, e, t, n), {
				cancel: function (e) {
					e && e.id && cancelAnimationFrame(e.id), e && (e.cancelled = !0)
				}.bind(null, o), model: e
			}
		}(this._scroll, (() => {
			const e = Date.now(), t = (e - this._scroll._startTime) / 1e3, n = this._scroll.x(t);
			this._position = n, this.updatePosition();
			const o = this._scroll.dx(t);
			this._shouldDispatchScrollEvent && e - this._lastTime > this._lastDelay && (this.dispatchScroll(), this._lastDelay = Math.abs(2e3 / o), this._lastTime = e)
		}), (() => {
			this._enableSnap && (o <= 0 && o >= -this._extent && (this._position = o, this.updatePosition()), O(this._options.onSnap) && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))), this._shouldDispatchScrollEvent && this.dispatchScroll(), this._scrolling = !1
		}))
	}

	onTransitionEnd() {
		this._element.style.webkitTransition = "", this._element.style.transition = "", this._element.removeEventListener("transitionend", this._onTransitionEnd), this._snapping && (this._snapping = !1), this.dispatchScroll()
	}

	snap() {
		const e = this._itemSize, t = this._position % e,
			n = Math.abs(t) > this._itemSize / 2 ? this._position - (e - Math.abs(t)) : this._position - t;
		this._position !== n && (this._snapping = !0, this.scrollTo(-n), O(this._options.onSnap) && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize)))
	}

	scrollTo(e, t) {
		this._animation && (this._animation.cancel(), this._scrolling = !1), "number" == typeof e && (this._position = -e), this._position < -this._extent ? this._position = -this._extent : this._position > 0 && (this._position = 0);
		const n = "transform " + (t || .2) + "s ease-out";
		this._element.style.webkitTransition = "-webkit-" + n, this._element.style.transition = n, this.updatePosition(), this._element.addEventListener("transitionend", this._onTransitionEnd)
	}

	dispatchScroll() {
		if (O(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
			this._lastPos = this._position;
			const e = {
				target: {
					scrollLeft: this._enableX ? -this._position : 0,
					scrollTop: this._enableY ? -this._position : 0,
					scrollHeight: this._scrollHeight || this._element.offsetHeight,
					scrollWidth: this._scrollWidth || this._element.offsetWidth,
					offsetHeight: this._element.parentElement.offsetHeight,
					offsetWidth: this._element.parentElement.offsetWidth
				}
			};
			this._options.onScroll(e)
		}
	}

	update(e, t, n) {
		let o = 0;
		const r = this._position;
		this._enableX ? (o = this._element.childNodes.length ? (t || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0, this._scrollWidth = t) : (o = this._element.childNodes.length ? (t || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0, this._scrollHeight = t), "number" == typeof e && (this._position = -e), this._position < -o ? this._position = -o : this._position > 0 && (this._position = 0), this._itemSize = n || this._itemSize, this.updatePosition(), r !== this._position && (this.dispatchScroll(), O(this._options.onSnap) && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))), this._extent = o, this._scroll._extent = o
	}

	updatePosition() {
		let e = "";
		this._enableX ? e = "translateX(" + this._position + "px) translateZ(0)" : this._enableY && (e = "translateY(" + this._position + "px) translateZ(0)"), this._element.style.webkitTransform = e, this._element.style.transform = e
	}

	isScrolling() {
		return this._scrolling || this._snapping
	}
}

let Jf = 0;
const Gf = nu({
	name: "PickerViewColumn", setup(e, {slots: t, emit: n}) {
		const o = nn(null), r = nn(null), i = Xn("getPickerViewColumn"), a = ui(), s = i ? i(a) : nn(0),
			l = Xn("pickerViewProps"), c = Xn("pickerViewState"), u = nn(34), d = nn(null);
		Io((() => {
			const e = d.value;
			u.value = e.$el.offsetHeight
		}));
		const p = yi((() => (c.height - u.value) / 2)), {state: f} = rf(), h = function (e) {
			const t = "uni-picker-view-content-" + Jf++;
			return Gn((() => e.value), (function () {
				const n = document.createElement("style");
				n.innerText = `.uni-picker-view-content.${t}>*{height: ${e.value}px;overflow: hidden;}`, document.head.appendChild(n)
			})), t
		}(u);
		let m;
		const g = qt({current: s.value, length: 0});
		let v;

		function b() {
			m && !v && (v = !0, kn((() => {
				v = !1;
				let e = Math.min(g.current, g.length - 1);
				e = Math.max(e, 0), m.update(e * u.value, void 0, u.value)
			})))
		}

		Gn((() => s.value), (e => {
			e !== g.current && (g.current = e, b())
		})), Gn((() => g.current), (e => s.value = e)), Gn([() => u.value, () => g.length, () => c.height], b);
		let y = 0;

		function _(e) {
			const t = y + e.deltaY;
			if (Math.abs(t) > 10) {
				y = 0;
				let e = Math.min(g.current + (t < 0 ? -1 : 1), g.length - 1);
				g.current = e = Math.max(e, 0), m.scrollTo(e * u.value)
			} else y = t;
			e.preventDefault()
		}

		function w({clientY: e}) {
			const t = o.value;
			if (!m.isScrolling()) {
				const n = e - t.getBoundingClientRect().top - c.height / 2, o = u.value / 2;
				if (!(Math.abs(n) <= o)) {
					const e = Math.ceil((Math.abs(n) - o) / u.value), t = n < 0 ? -e : e;
					let r = Math.min(g.current + t, g.length - 1);
					g.current = r = Math.max(r, 0), m.scrollTo(r * u.value)
				}
			}
		}

		const x = () => {
			const e = o.value,
				t = r.value, {scroller: n, handleTouchStart: i, handleTouchMove: a, handleTouchEnd: s} = function (e, t) {
					const n = {trackingID: -1, maxDy: 0, maxDx: 0}, o = new Yf(e, t);

					function r(e) {
						const t = e, o = e;
						return "move" === t.detail.state || "end" === t.detail.state ? {
							x: t.detail.dx,
							y: t.detail.dy
						} : {x: o.screenX - n.x, y: o.screenY - n.y}
					}

					return {
						scroller: o, handleTouchStart: function (e) {
							const t = e, r = e;
							"start" === t.detail.state ? (n.trackingID = "touch", n.x = t.detail.x, n.y = t.detail.y) : (n.trackingID = "mouse", n.x = r.screenX, n.y = r.screenY), n.maxDx = 0, n.maxDy = 0, n.historyX = [0], n.historyY = [0], n.historyTime = [t.detail.timeStamp || r.timeStamp], n.listener = o, o.onTouchStart && o.onTouchStart(), ("boolean" != typeof e.cancelable || e.cancelable) && e.preventDefault()
						}, handleTouchMove: function (e) {
							const t = e, o = e;
							if (-1 !== n.trackingID) {
								("boolean" != typeof e.cancelable || e.cancelable) && e.preventDefault();
								const i = r(e);
								if (i) {
									for (n.maxDy = Math.max(n.maxDy, Math.abs(i.y)), n.maxDx = Math.max(n.maxDx, Math.abs(i.x)), n.historyX.push(i.x), n.historyY.push(i.y), n.historyTime.push(t.detail.timeStamp || o.timeStamp); n.historyTime.length > 10;) n.historyTime.shift(), n.historyX.shift(), n.historyY.shift();
									n.listener && n.listener.onTouchMove && n.listener.onTouchMove(i.x, i.y)
								}
							}
						}, handleTouchEnd: function (e) {
							if (-1 !== n.trackingID) {
								e.preventDefault();
								const t = r(e);
								if (t) {
									const e = n.listener;
									n.trackingID = -1, n.listener = null;
									const o = {x: 0, y: 0};
									if (n.historyTime.length > 2) for (let t = n.historyTime.length - 1, r = n.historyTime[t], i = n.historyX[t], a = n.historyY[t]; t > 0;) {
										t--;
										const e = r - n.historyTime[t];
										if (e > 30 && e < 50) {
											o.x = (i - n.historyX[t]) / (e / 1e3), o.y = (a - n.historyY[t]) / (e / 1e3);
											break
										}
									}
									n.historyTime = [], n.historyX = [], n.historyY = [], e && e.onTouchEnd && e.onTouchEnd(t.x, t.y, o)
								}
							}
						}
					}
				}(t, {
					enableY: !0,
					enableX: !1,
					enableSnap: !0,
					itemSize: u.value,
					friction: new Wf(1e-4),
					spring: new Uf(2, 90, 20),
					onSnap: e => {
						isNaN(e) || e === g.current || (g.current = e)
					}
				});
			m = n, Sf(e, (e => {
				switch (e.detail.state) {
					case"start":
						i(e);
						break;
					case"move":
						a(e), e.stopPropagation();
						break;
					case"end":
					case"cancel":
						s(e)
				}
			}), !0), function (e) {
				let t = 0, n = 0;
				e.addEventListener("touchstart", (e => {
					const o = e.changedTouches[0];
					t = o.clientX, n = o.clientY
				})), e.addEventListener("touchend", (e => {
					const o = e.changedTouches[0];
					if (Math.abs(o.clientX - t) < 20 && Math.abs(o.clientY - n) < 20) {
						const t = {bubbles: !0, cancelable: !0, target: e.target, currentTarget: e.currentTarget},
							n = new CustomEvent("click", t);
						["screenX", "screenY", "clientX", "clientY", "pageX", "pageY"].forEach((e => {
							n[e] = o[e]
						})), e.target.dispatchEvent(n)
					}
				}))
			}(e), b()
		};
		return Io(x), () => {
			const e = t.default && t.default();
			g.length = bf(e).length;
			const n = `${p.value}px 0`;
			return Kr("uni-picker-view-column", {ref: o}, [Kr("div", {
				onWheel: _,
				onClick: w,
				class: "uni-picker-view-group"
			}, [Kr("div", ii(f.attrs, {
				class: ["uni-picker-view-mask", l.maskClass],
				style: `background-size: 100% ${p.value}px;${l.maskStyle}`
			}), null, 16), Kr("div", ii(f.attrs, {
				class: ["uni-picker-view-indicator", l.indicatorClass],
				style: l.indicatorStyle
			}), [Kr(Lp, {
				ref: d,
				onResize: ({height: e}) => u.value = e
			}, null, 8, ["onResize"])], 16), Kr("div", {
				ref: r,
				class: ["uni-picker-view-content", h],
				style: {padding: n}
			}, [e], 6)], 40, ["onWheel", "onClick"])], 512)
		}
	}
}), Kf = {
	a: "",
	abbr: "",
	address: "",
	article: "",
	aside: "",
	b: "",
	bdi: "",
	bdo: ["dir"],
	big: "",
	blockquote: "",
	br: "",
	caption: "",
	center: "",
	cite: "",
	code: "",
	col: ["span", "width"],
	colgroup: ["span", "width"],
	dd: "",
	del: "",
	div: "",
	dl: "",
	dt: "",
	em: "",
	fieldset: "",
	font: "",
	footer: "",
	h1: "",
	h2: "",
	h3: "",
	h4: "",
	h5: "",
	h6: "",
	header: "",
	hr: "",
	i: "",
	img: ["alt", "src", "height", "width"],
	ins: "",
	label: "",
	legend: "",
	li: "",
	mark: "",
	nav: "",
	ol: ["start", "type"],
	p: "",
	pre: "",
	q: "",
	rt: "",
	ruby: "",
	s: "",
	section: "",
	small: "",
	span: "",
	strong: "",
	sub: "",
	sup: "",
	table: ["width"],
	tbody: "",
	td: ["colspan", "height", "rowspan", "width"],
	tfoot: "",
	th: ["colspan", "height", "rowspan", "width"],
	thead: "",
	tr: ["colspan", "height", "rowspan", "width"],
	tt: "",
	u: "",
	ul: ""
}, Zf = {
	amp: "&",
	gt: ">",
	lt: "<",
	nbsp: " ",
	quot: '"',
	apos: "'",
	ldquo: "“",
	rdquo: "”",
	yen: "￥",
	radic: "√",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	hellip: "…"
};
const eh = (e, t, n) => !n || C(n) && !n.length ? [] : n.map((n => {
	if (D(n)) {
		if (!A(n, "type") || "node" === n.type) {
			let o = {[e]: ""};
			const r = n.name.toLowerCase();
			if (!A(Kf, r)) return;
			return function (e, t) {
				if (D(t)) for (const n in t) if (A(t, n)) {
					const o = t[n];
					"img" === e && "src" === n && (t[n] = gu(o))
				}
			}(r, n.attrs), o = S(o, function (e, t) {
				if (["a", "img"].includes(e.name) && t) return {
					onClick: n => {
						t(n, {node: e}), n.stopPropagation(), n.preventDefault(), n.returnValue = !1
					}
				}
			}(n, t), n.attrs), _i(n.name, o, eh(e, t, n.children))
		}
		return "text" === n.type && I(n.text) && "" !== n.text ? ei((n.text || "").replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, (function (e, t) {
			return A(Zf, t) && Zf[t] ? Zf[t] : /^#[0-9]{1,4}$/.test(t) ? String.fromCharCode(t.slice(1)) : /^#x[0-9a-f]{1,4}$/i.test(t) ? String.fromCharCode(0 + t.slice(1)) : e
		}))) : void 0
	}
}));

function th(e) {
	e = function (e) {
		return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "")
	}(e);
	const t = [], n = {node: "root", children: []};
	return function (e, t) {
		var n, o, r, i = [], a = e;
		for (i.last = function () {
			return this[this.length - 1]
		}; e;) {
			if (o = !0, i.last() && Vp[i.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + i.last() + "[^>]*>"), (function (e, n) {
				return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), ""
			})), c("", i.last()); else if (0 == e.indexOf("\x3c!--") ? (n = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, n)), e = e.substring(n + 3), o = !1) : 0 == e.indexOf("</") ? (r = e.match(jp)) && (e = e.substring(r[0].length), r[0].replace(jp, c), o = !1) : 0 == e.indexOf("<") && (r = e.match(Fp)) && (e = e.substring(r[0].length), r[0].replace(Fp, l), o = !1), o) {
				var s = (n = e.indexOf("<")) < 0 ? e : e.substring(0, n);
				e = n < 0 ? "" : e.substring(n), t.chars && t.chars(s)
			}
			if (e == a) throw"Parse Error: " + e;
			a = e
		}

		function l(e, n, o, r) {
			if (n = n.toLowerCase(), Dp[n]) for (; i.last() && zp[i.last()];) c("", i.last());
			if (Hp[n] && i.last() == n && c("", n), (r = Np[n] || !!r) || i.push(n), t.start) {
				var a = [];
				o.replace(Rp, (function (e, t) {
					var n = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : qp[t] ? t : "";
					a.push({name: t, value: n, escaped: n.replace(/(^|[^\\])"/g, '$1\\"')})
				})), t.start && t.start(n, a, r)
			}
		}

		function c(e, n) {
			if (n) for (o = i.length - 1; o >= 0 && i[o] != n; o--) ; else var o = 0;
			if (o >= 0) {
				for (var r = i.length - 1; r >= o; r--) t.end && t.end(i[r]);
				i.length = o
			}
		}

		c()
	}(e, {
		start: function (e, o, r) {
			const i = {name: e};
			if (0 !== o.length && (i.attrs = function (e) {
				return e.reduce((function (e, t) {
					let n = t.value;
					const o = t.name;
					return n.match(/ /) && -1 === ["style", "src"].indexOf(o) && (n = n.split(" ")), e[o] ? Array.isArray(e[o]) ? e[o].push(n) : e[o] = [e[o], n] : e[o] = n, e
				}), {})
			}(o)), r) {
				const e = t[0] || n;
				e.children || (e.children = []), e.children.push(i)
			} else t.unshift(i)
		}, end: function (e) {
			const o = t.shift();
			if (o.name !== e && console.error("invalid state: mismatch end tag"), 0 === t.length) n.children.push(o); else {
				const e = t[0];
				e.children || (e.children = []), e.children.push(o)
			}
		}, chars: function (e) {
			const o = {type: "text", text: e};
			if (0 === t.length) n.children.push(o); else {
				const e = t[0];
				e.children || (e.children = []), e.children.push(o)
			}
		}, comment: function (e) {
			const n = {node: "comment", text: e}, o = t[0];
			o.children || (o.children = []), o.children.push(n)
		}
	}), n.children
}

const nh = nu({
	name: "RichText",
	compatConfig: {MODE: 3},
	props: {
		nodes: {
			type: [Array, String], default: function () {
				return []
			}
		}
	},
	emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "longpress", "itemclick"],
	setup(e, {emit: t}) {
		const n = ui(), o = n && n.vnode.scopeId || "", r = nn(null), i = nn([]), a = lu(r, t);

		function s(e, t = {}) {
			a("itemclick", e, t)
		}

		return Gn((() => e.nodes), (function () {
			let t = e.nodes;
			I(t) && (t = th(e.nodes)), i.value = eh(o, s, t)
		}), {immediate: !0}), () => _i("uni-rich-text", {ref: r}, _i("div", {}, i.value))
	}
}), oh = ge(!0), rh = nu({
	name: "ScrollView",
	compatConfig: {MODE: 3},
	props: {
		scrollX: {type: [Boolean, String], default: !1},
		scrollY: {type: [Boolean, String], default: !1},
		upperThreshold: {type: [Number, String], default: 50},
		lowerThreshold: {type: [Number, String], default: 50},
		scrollTop: {type: [Number, String], default: 0},
		scrollLeft: {type: [Number, String], default: 0},
		scrollIntoView: {type: String, default: ""},
		scrollWithAnimation: {type: [Boolean, String], default: !1},
		enableBackToTop: {type: [Boolean, String], default: !1},
		refresherEnabled: {type: [Boolean, String], default: !1},
		refresherThreshold: {type: Number, default: 45},
		refresherDefaultStyle: {type: String, default: "back"},
		refresherBackground: {type: String, default: "#fff"},
		refresherTriggered: {type: [Boolean, String], default: !1}
	},
	emits: ["scroll", "scrolltoupper", "scrolltolower", "refresherrefresh", "refresherrestore", "refresherpulling", "refresherabort", "update:refresherTriggered"],
	setup(e, {emit: t, slots: n}) {
		const o = nn(null), r = nn(null), i = nn(null), a = nn(null), s = nn(null),
			l = lu(o, t), {state: c, scrollTopNumber: u, scrollLeftNumber: d} = function (e) {
				const t = yi((() => Number(e.scrollTop) || 0)), n = yi((() => Number(e.scrollLeft) || 0));
				return {
					state: qt({
						lastScrollTop: t.value,
						lastScrollLeft: n.value,
						lastScrollToUpperTime: 0,
						lastScrollToLowerTime: 0,
						refresherHeight: 0,
						refreshRotate: 0,
						refreshState: ""
					}), scrollTopNumber: t, scrollLeftNumber: n
				}
			}(e);
		!function (e, t, n, o, r, i, a, s, l) {
			let c = !1, u = 0, d = !1, p = () => {
			};
			const f = yi((() => {
				let t = Number(e.upperThreshold);
				return isNaN(t) ? 50 : t
			})), h = yi((() => {
				let t = Number(e.lowerThreshold);
				return isNaN(t) ? 50 : t
			}));

			function m(e, t) {
				const n = a.value;
				let o = 0, r = "";
				if (e < 0 ? e = 0 : "x" === t && e > n.scrollWidth - n.offsetWidth ? e = n.scrollWidth - n.offsetWidth : "y" === t && e > n.scrollHeight - n.offsetHeight && (e = n.scrollHeight - n.offsetHeight), "x" === t ? o = n.scrollLeft - e : "y" === t && (o = n.scrollTop - e), 0 === o) return;
				let i = s.value;
				i.style.transition = "transform .3s ease-out", i.style.webkitTransition = "-webkit-transform .3s ease-out", "x" === t ? r = "translateX(" + o + "px) translateZ(0)" : "y" === t && (r = "translateY(" + o + "px) translateZ(0)"), i.removeEventListener("transitionend", p), i.removeEventListener("webkitTransitionEnd", p), p = () => _(e, t), i.addEventListener("transitionend", p), i.addEventListener("webkitTransitionEnd", p), "x" === t ? n.style.overflowX = "hidden" : "y" === t && (n.style.overflowY = "hidden"), i.style.transform = r, i.style.webkitTransform = r
			}

			function g(n) {
				const o = n.target;
				r("scroll", n, {
					scrollLeft: o.scrollLeft,
					scrollTop: o.scrollTop,
					scrollHeight: o.scrollHeight,
					scrollWidth: o.scrollWidth,
					deltaX: t.lastScrollLeft - o.scrollLeft,
					deltaY: t.lastScrollTop - o.scrollTop
				}), e.scrollY && (o.scrollTop <= f.value && t.lastScrollTop - o.scrollTop > 0 && n.timeStamp - t.lastScrollToUpperTime > 200 && (r("scrolltoupper", n, {direction: "top"}), t.lastScrollToUpperTime = n.timeStamp), o.scrollTop + o.offsetHeight + h.value >= o.scrollHeight && t.lastScrollTop - o.scrollTop < 0 && n.timeStamp - t.lastScrollToLowerTime > 200 && (r("scrolltolower", n, {direction: "bottom"}), t.lastScrollToLowerTime = n.timeStamp)), e.scrollX && (o.scrollLeft <= f.value && t.lastScrollLeft - o.scrollLeft > 0 && n.timeStamp - t.lastScrollToUpperTime > 200 && (r("scrolltoupper", n, {direction: "left"}), t.lastScrollToUpperTime = n.timeStamp), o.scrollLeft + o.offsetWidth + h.value >= o.scrollWidth && t.lastScrollLeft - o.scrollLeft < 0 && n.timeStamp - t.lastScrollToLowerTime > 200 && (r("scrolltolower", n, {direction: "right"}), t.lastScrollToLowerTime = n.timeStamp)), t.lastScrollTop = o.scrollTop, t.lastScrollLeft = o.scrollLeft
			}

			function v(t) {
				e.scrollY && (e.scrollWithAnimation ? m(t, "y") : a.value.scrollTop = t)
			}

			function b(t) {
				e.scrollX && (e.scrollWithAnimation ? m(t, "x") : a.value.scrollLeft = t)
			}

			function y(t) {
				if (t) {
					if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(t)) return void console.error(`id error: scroll-into-view=${t}`);
					let n = i.value.querySelector("#" + t);
					if (n) {
						let t = a.value.getBoundingClientRect(), o = n.getBoundingClientRect();
						if (e.scrollX) {
							let n = o.left - t.left, r = a.value.scrollLeft + n;
							e.scrollWithAnimation ? m(r, "x") : a.value.scrollLeft = r
						}
						if (e.scrollY) {
							let n = o.top - t.top, r = a.value.scrollTop + n;
							e.scrollWithAnimation ? m(r, "y") : a.value.scrollTop = r
						}
					}
				}
			}

			function _(t, n) {
				s.value.style.transition = "", s.value.style.webkitTransition = "", s.value.style.transform = "", s.value.style.webkitTransform = "";
				let o = a.value;
				"x" === n ? (o.style.overflowX = e.scrollX ? "auto" : "hidden", o.scrollLeft = t) : "y" === n && (o.style.overflowY = e.scrollY ? "auto" : "hidden", o.scrollTop = t), s.value.removeEventListener("transitionend", p), s.value.removeEventListener("webkitTransitionEnd", p)
			}

			function w(n) {
				if (e.refresherEnabled) {
					switch (n) {
						case"refreshing":
							t.refresherHeight = e.refresherThreshold, c || (c = !0, r("refresherrefresh", {}, {}), l("update:refresherTriggered", !0));
							break;
						case"restore":
						case"refresherabort":
							c = !1, t.refresherHeight = u = 0, "restore" === n && (d = !1, r("refresherrestore", {}, {})), "refresherabort" === n && d && (d = !1, r("refresherabort", {}, {}))
					}
					t.refreshState = n
				}
			}

			Io((() => {
				kn((() => {
					v(n.value), b(o.value)
				})), y(e.scrollIntoView);
				let i = function (e) {
					e.preventDefault(), e.stopPropagation(), g(e)
				}, s = {x: 0, y: 0}, l = null, p = function (n) {
					if (null === s) return;
					let o = n.touches[0].pageX, i = n.touches[0].pageY, p = a.value;
					if (Math.abs(o - s.x) > Math.abs(i - s.y)) if (e.scrollX) {
						if (0 === p.scrollLeft && o > s.x) return void (l = !1);
						if (p.scrollWidth === p.offsetWidth + p.scrollLeft && o < s.x) return void (l = !1);
						l = !0
					} else l = !1; else if (e.scrollY) if (0 === p.scrollTop && i > s.y) l = !1, e.refresherEnabled && !1 !== n.cancelable && n.preventDefault(); else {
						if (p.scrollHeight === p.offsetHeight + p.scrollTop && i < s.y) return void (l = !1);
						l = !0
					} else l = !1;
					if (l && n.stopPropagation(), 0 === p.scrollTop && 1 === n.touches.length && w("pulling"), e.refresherEnabled && "pulling" === t.refreshState) {
						const o = i - s.y;
						0 === u && (u = i), c ? (t.refresherHeight = o + e.refresherThreshold, d = !1) : (t.refresherHeight = i - u, t.refresherHeight > 0 && (d = !0, r("refresherpulling", n, {deltaY: o})));
						const a = t.refresherHeight / e.refresherThreshold;
						t.refreshRotate = 360 * (a > 1 ? 1 : a)
					}
				}, f = function (e) {
					1 === e.touches.length && (s = {x: e.touches[0].pageX, y: e.touches[0].pageY})
				}, h = function (n) {
					s = null, t.refresherHeight >= e.refresherThreshold ? w("refreshing") : w("refresherabort")
				};
				a.value.addEventListener("touchstart", f, oh), a.value.addEventListener("touchmove", p, ge(!1)), a.value.addEventListener("scroll", i, ge(!1)), a.value.addEventListener("touchend", h, oh), jo((() => {
					a.value.removeEventListener("touchstart", f), a.value.removeEventListener("touchmove", p), a.value.removeEventListener("scroll", i), a.value.removeEventListener("touchend", h)
				}))
			})), wo((() => {
				e.scrollY && (a.value.scrollTop = t.lastScrollTop), e.scrollX && (a.value.scrollLeft = t.lastScrollLeft)
			})), Gn(n, (e => {
				v(e)
			})), Gn(o, (e => {
				b(e)
			})), Gn((() => e.scrollIntoView), (e => {
				y(e)
			})), Gn((() => e.refresherTriggered), (e => {
				!0 === e ? w("refreshing") : !1 === e && w("restore")
			}))
		}(e, c, u, d, l, o, r, a, t);
		const p = yi((() => {
			let t = "";
			return e.scrollX ? t += "overflow-x:auto;" : t += "overflow-x:hidden;", e.scrollY ? t += "overflow-y:auto;" : t += "overflow-y:hidden;", t
		}));
		return () => {
			const {refresherEnabled: t, refresherBackground: l, refresherDefaultStyle: u} = e, {refresherHeight: d, refreshState: f, refreshRotate: h} = c;
			return Kr("uni-scroll-view", {ref: o}, [Kr("div", {ref: i, class: "uni-scroll-view"}, [Kr("div", {
				ref: r,
				style: p.value,
				class: "uni-scroll-view"
			}, [Kr("div", {ref: a, class: "uni-scroll-view-content"}, [t ? Kr("div", {
				ref: s,
				style: {backgroundColor: l, height: d + "px"},
				class: "uni-scroll-view-refresher"
			}, ["none" !== u ? Kr("div", {class: "uni-scroll-view-refresh"}, [Kr("div", {class: "uni-scroll-view-refresh-inner"}, ["pulling" == f ? Kr("svg", {
				key: "refresh__icon",
				style: {transform: "rotate(" + h + "deg)"},
				fill: "#2BD009",
				class: "uni-scroll-view-refresh__icon",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24"
			}, [Kr("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null), Kr("path", {
				d: "M0 0h24v24H0z",
				fill: "none"
			}, null)], 4) : null, "refreshing" == f ? Kr("svg", {
				key: "refresh__spinner",
				class: "uni-scroll-view-refresh__spinner",
				width: "24",
				height: "24",
				viewBox: "25 25 50 50"
			}, [Kr("circle", {
				cx: "50",
				cy: "50",
				r: "20",
				fill: "none",
				style: "color: #2bd009",
				"stroke-width": "3"
			}, null)]) : null])]) : null, "none" == u ? n.refresher && n.refresher() : null], 4) : null, n.default && n.default()], 512)], 4)], 512)], 512)
		}
	}
});

function ih(e, t, n, o, r, i) {
	function a() {
		c && (clearTimeout(c), c = null)
	}

	let s, l, c = null, u = !0, d = 0, p = 1, f = null, h = !1, m = 0, g = "";
	const v = yi((() => n.value.length > t.displayMultipleItems)), b = yi((() => e.circular && v.value));

	function y(r) {
		Math.floor(2 * d) === Math.floor(2 * r) && Math.ceil(2 * d) === Math.ceil(2 * r) || b.value && function (o) {
			if (!u) for (let r = n.value, i = r.length, a = o + t.displayMultipleItems, s = 0; s < i; s++) {
				const t = r[s], n = Math.floor(o / i) * i + s, l = n + i, c = n - i,
					u = Math.max(o - (n + 1), n - a, 0), d = Math.max(o - (l + 1), l - a, 0),
					p = Math.max(o - (c + 1), c - a, 0), f = Math.min(u, d, p), h = [n, l, c][[u, d, p].indexOf(f)];
				t.updatePosition(h, e.vertical)
			}
		}(r);
		const a = "translate(" + (e.vertical ? "0" : 100 * -r * p + "%") + ", " + (e.vertical ? 100 * -r * p + "%" : "0") + ") translateZ(0)",
			l = o.value;
		if (l && (l.style.webkitTransform = a, l.style.transform = a), d = r, !s) {
			if (r % 1 == 0) return;
			s = r
		}
		r -= Math.floor(s);
		const c = n.value;
		r <= -(c.length - 1) ? r += c.length : r >= c.length && (r -= c.length), r = s % 1 > .5 || s < 0 ? r - 1 : r, i("transition", {}, {
			dx: e.vertical ? 0 : r * l.offsetWidth,
			dy: e.vertical ? r * l.offsetHeight : 0
		})
	}

	function _(e) {
		const o = n.value.length;
		if (!o) return -1;
		const r = (Math.round(e) % o + o) % o;
		if (b.value) {
			if (o <= t.displayMultipleItems) return 0
		} else if (r > o - t.displayMultipleItems) return o - t.displayMultipleItems;
		return r
	}

	function w() {
		f = null
	}

	function x() {
		if (!f) return void (h = !1);
		const e = f, o = e.toPos, r = e.acc, a = e.endTime, c = e.source, u = a - Date.now();
		if (u <= 0) {
			y(o), f = null, h = !1, s = null;
			const e = n.value[t.current];
			if (e) {
				const n = e.getItemId();
				i("animationfinish", {}, {current: t.current, currentItemId: n, source: c})
			}
			return
		}
		y(o + r * u * u / 2), l = requestAnimationFrame(x)
	}

	function T(e, o, r) {
		w();
		const i = t.duration, a = n.value.length;
		let s = d;
		if (b.value) if (r < 0) {
			for (; s < e;) s += a;
			for (; s - a > e;) s -= a
		} else if (r > 0) {
			for (; s > e;) s -= a;
			for (; s + a < e;) s += a;
			s + a - e < e - s && (s += a)
		} else {
			for (; s + a < e;) s += a;
			for (; s - a > e;) s -= a;
			s + a - e < e - s && (s += a)
		} else "click" === o && (e = e + t.displayMultipleItems - 1 < a ? e : 0);
		f = {
			toPos: e,
			acc: 2 * (s - e) / (i * i),
			endTime: Date.now() + i,
			source: o
		}, h || (h = !0, l = requestAnimationFrame(x))
	}

	function S() {
		a();
		const e = n.value, o = function () {
			c = null, g = "autoplay", b.value ? t.current = _(t.current + 1) : t.current = t.current + t.displayMultipleItems < e.length ? t.current + 1 : 0, T(t.current, "autoplay", b.value ? 1 : 0), c = setTimeout(o, t.interval)
		};
		u || e.length <= t.displayMultipleItems || (c = setTimeout(o, t.interval))
	}

	function E(e) {
		e ? S() : a()
	}

	return Gn([() => e.current, () => e.currentItemId, () => [...n.value]], (() => {
		let o = -1;
		if (e.currentItemId) for (let t = 0, r = n.value; t < r.length; t++) {
			if (r[t].getItemId() === e.currentItemId) {
				o = t;
				break
			}
		}
		o < 0 && (o = Math.round(e.current) || 0), o = o < 0 ? 0 : o, t.current !== o && (g = "", t.current = o)
	})), Gn([() => e.vertical, () => b.value, () => t.displayMultipleItems, () => [...n.value]], (function () {
		a(), f && (y(f.toPos), f = null);
		const r = n.value;
		for (let t = 0; t < r.length; t++) r[t].updatePosition(t, e.vertical);
		p = 1;
		const i = o.value;
		if (1 === t.displayMultipleItems && r.length) {
			const e = r[0].getBoundingClientRect(), t = i.getBoundingClientRect();
			p = e.width / t.width, p > 0 && p < 1 || (p = 1)
		}
		const s = d;
		d = -2;
		const l = t.current;
		l >= 0 ? (u = !1, t.userTracking ? (y(s + l - m), m = l) : (y(l), e.autoplay && S())) : (u = !0, y(-t.displayMultipleItems - 1))
	})), Gn((() => t.interval), (() => {
		c && (a(), S())
	})), Gn((() => t.current), ((e, o) => {
		!function (e, o) {
			const r = g;
			g = "";
			const a = n.value;
			if (!r) {
				const t = a.length;
				T(e, "", b.value && o + (t - e) % t > t / 2 ? 1 : 0)
			}
			const s = a[e];
			if (s) {
				const e = t.currentItemId = s.getItemId();
				i("change", {}, {current: t.current, currentItemId: e, source: r})
			}
		}(e, o), r("update:current", e)
	})), Gn((() => t.currentItemId), (e => {
		r("update:currentItemId", e)
	})), Gn((() => e.autoplay && !t.userTracking), E), E(e.autoplay && !t.userTracking), Io((() => {
		let r = !1, i = 0, s = 0;

		function l(e) {
			t.userTracking = !1;
			const n = i / Math.abs(i);
			let o = 0;
			!e && Math.abs(i) > .2 && (o = .5 * n);
			const r = _(d + o);
			e ? y(m) : (g = "touch", t.current = r, T(r, "touch", 0 !== o ? o : 0 === r && b.value && d >= 1 ? 1 : 0))
		}

		Sf(o.value, (c => {
			if (!e.disableTouch && !u) {
				if ("start" === c.detail.state) return t.userTracking = !0, r = !1, a(), m = d, i = 0, s = Date.now(), void w();
				if ("end" === c.detail.state) return l(!1);
				if ("cancel" === c.detail.state) return l(!0);
				if (t.userTracking) {
					if (!r) {
						r = !0;
						const n = Math.abs(c.detail.dx), o = Math.abs(c.detail.dy);
						if ((n >= o && e.vertical || n <= o && !e.vertical) && (t.userTracking = !1), !t.userTracking) return void (e.autoplay && S())
					}
					return function (r) {
						const a = s;
						s = Date.now();
						const l = n.value.length - t.displayMultipleItems;

						function c(e) {
							return .5 - .25 / (e + .5)
						}

						function u(e, t) {
							let n = m + e;
							i = .6 * i + .4 * t, b.value || (n < 0 || n > l) && (n < 0 ? n = -c(-n) : n > l && (n = l + c(n - l)), i = 0), y(n)
						}

						const d = s - a || 1, p = o.value;
						e.vertical ? u(-r.dy / p.offsetHeight, -r.ddy / d) : u(-r.dx / p.offsetWidth, -r.ddx / d)
					}(c.detail), !1
				}
			}
		}))
	})), Ro((() => {
		a(), cancelAnimationFrame(l)
	})), {
		onSwiperDotClick: function (e) {
			T(t.current = e, g = "click", b.value ? 1 : 0)
		}, circularEnabled: b, swiperEnabled: v
	}
}

const ah = nu({
	name: "Swiper",
	props: {
		indicatorDots: {type: [Boolean, String], default: !1},
		vertical: {type: [Boolean, String], default: !1},
		autoplay: {type: [Boolean, String], default: !1},
		circular: {type: [Boolean, String], default: !1},
		interval: {type: [Number, String], default: 5e3},
		duration: {type: [Number, String], default: 500},
		current: {type: [Number, String], default: 0},
		indicatorColor: {type: String, default: ""},
		indicatorActiveColor: {type: String, default: ""},
		previousMargin: {type: String, default: ""},
		nextMargin: {type: String, default: ""},
		currentItemId: {type: String, default: ""},
		skipHiddenItemLayout: {type: [Boolean, String], default: !1},
		displayMultipleItems: {type: [Number, String], default: 1},
		disableTouch: {type: [Boolean, String], default: !1},
		navigation: {type: [Boolean, String], default: !1},
		navigationColor: {type: String, default: "#fff"},
		navigationActiveColor: {type: String, default: "rgba(53, 53, 53, 0.6)"}
	},
	emits: ["change", "transition", "animationfinish", "update:current", "update:currentItemId"],
	setup(e, {slots: t, emit: n}) {
		const o = nn(null), r = lu(o, n), i = nn(null), a = nn(null), s = function (e) {
			return qt({
				interval: yi((() => {
					const t = Number(e.interval);
					return isNaN(t) ? 5e3 : t
				})), duration: yi((() => {
					const t = Number(e.duration);
					return isNaN(t) ? 500 : t
				})), displayMultipleItems: yi((() => {
					const t = Math.round(e.displayMultipleItems);
					return isNaN(t) ? 1 : t
				})), current: Math.round(e.current) || 0, currentItemId: e.currentItemId, userTracking: !1
			})
		}(e), l = yi((() => {
			let t = {};
			return (e.nextMargin || e.previousMargin) && (t = e.vertical ? {
				left: 0,
				right: 0,
				top: uc(e.previousMargin, !0),
				bottom: uc(e.nextMargin, !0)
			} : {top: 0, bottom: 0, left: uc(e.previousMargin, !0), right: uc(e.nextMargin, !0)}), t
		})), c = yi((() => {
			const t = Math.abs(100 / s.displayMultipleItems) + "%";
			return {width: e.vertical ? "100%" : t, height: e.vertical ? t : "100%"}
		}));
		let u = [];
		const d = [], p = nn([]);

		function f() {
			const e = [];
			for (let t = 0; t < u.length; t++) {
				let n = u[t];
				n instanceof Element || (n = n.el);
				const o = d.find((e => n === e.rootRef.value));
				o && e.push(Jt(o))
			}
			p.value = e
		}

		Un("addSwiperContext", (function (e) {
			d.push(e), f()
		}));
		Un("removeSwiperContext", (function (e) {
			const t = d.indexOf(e);
			t >= 0 && (d.splice(t, 1), f())
		}));
		const {onSwiperDotClick: h, circularEnabled: m, swiperEnabled: g} = ih(e, s, p, a, n, r);
		let v = () => null;
		return v = sh(o, e, s, h, p, m, g), () => {
			const n = t.default && t.default();
			return u = bf(n), Kr("uni-swiper", {ref: o}, [Kr("div", {
				ref: i,
				class: "uni-swiper-wrapper"
			}, [Kr("div", {class: "uni-swiper-slides", style: l.value}, [Kr("div", {
				ref: a,
				class: "uni-swiper-slide-frame",
				style: c.value
			}, [n], 4)], 4), e.indicatorDots && Kr("div", {class: ["uni-swiper-dots", e.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"]}, [p.value.map(((t, n, o) => Kr("div", {
				onClick: () => h(n),
				class: {
					"uni-swiper-dot": !0,
					"uni-swiper-dot-active": n < s.current + s.displayMultipleItems && n >= s.current || n < s.current + s.displayMultipleItems - o.length
				},
				style: {background: n === s.current ? e.indicatorActiveColor : e.indicatorColor}
			}, null, 14, ["onClick"])))], 2), v()], 512)], 512)
		}
	}
}), sh = (e, t, n, o, r, i, a) => {
	let s = !1, l = !1, c = !1, u = nn(!1);

	function d(e, n) {
		const o = e.currentTarget;
		o && (o.style.backgroundColor = "over" === n ? t.navigationActiveColor : "")
	}

	Yn((() => {
		s = "auto" === t.navigation, u.value = !0 !== t.navigation || s, b()
	})), Yn((() => {
		const e = r.value.length, t = !i.value;
		l = 0 === n.current && t, c = n.current === e - 1 && t || t && n.current + n.displayMultipleItems >= e, a.value || (l = !0, c = !0, s && (u.value = !0))
	}));
	const p = {onMouseover: e => d(e, "over"), onMouseout: e => d(e, "out")};

	function f(e, t, a) {
		if (e.stopPropagation(), a) return;
		const s = r.value.length;
		let l = n.current;
		switch (t) {
			case"prev":
				l--, l < 0 && i.value && (l = s - 1);
				break;
			case"next":
				l++, l >= s && i.value && (l = 0)
		}
		o(l)
	}

	const h = () => hc(fc, t.navigationColor, 26);
	let m;
	const g = n => {
		clearTimeout(m);
		const {clientX: o, clientY: r} = n, {left: i, right: a, top: s, bottom: l, width: c, height: d} = e.value.getBoundingClientRect();
		let p = !1;
		if (p = t.vertical ? !(r - s < d / 3 || l - r < d / 3) : !(o - i < c / 3 || a - o < c / 3), p) return m = setTimeout((() => {
			u.value = p
		}), 300);
		u.value = p
	}, v = () => {
		u.value = !0
	};

	function b() {
		e.value && (e.value.removeEventListener("mousemove", g), e.value.removeEventListener("mouseleave", v), s && (e.value.addEventListener("mousemove", g), e.value.addEventListener("mouseleave", v)))
	}

	return Io(b), function () {
		const e = {"uni-swiper-navigation-hide": u.value, "uni-swiper-navigation-vertical": t.vertical};
		return t.navigation ? Kr(Mr, null, [Kr("div", ii({
			class: ["uni-swiper-navigation uni-swiper-navigation-prev", S({"uni-swiper-navigation-disabled": l}, e)],
			onClick: e => f(e, "prev", l)
		}, p), [h()], 16, ["onClick"]), Kr("div", ii({
			class: ["uni-swiper-navigation uni-swiper-navigation-next", S({"uni-swiper-navigation-disabled": c}, e)],
			onClick: e => f(e, "next", c)
		}, p), [h()], 16, ["onClick"])]) : null
	}
}, lh = nu({
	name: "SwiperItem", props: {itemId: {type: String, default: ""}}, setup(e, {slots: t}) {
		const n = nn(null), o = {
			rootRef: n,
			getItemId: () => e.itemId,
			getBoundingClientRect: () => n.value.getBoundingClientRect(),
			updatePosition(e, t) {
				const o = t ? "0" : 100 * e + "%", r = t ? 100 * e + "%" : "0", i = n.value,
					a = `translate(${o},${r}) translateZ(0)`;
				i && (i.style.webkitTransform = a, i.style.transform = a)
			}
		};
		return Io((() => {
			const e = Xn("addSwiperContext");
			e && e(o)
		})), Ro((() => {
			const e = Xn("removeSwiperContext");
			e && e(o)
		})), () => Kr("uni-swiper-item", {
			ref: n,
			style: {position: "absolute", width: "100%", height: "100%"}
		}, [t.default && t.default()], 512)
	}
}), ch = {ensp: " ", emsp: " ", nbsp: " "};

function uh(e, t) {
	return e.replace(/\\n/g, "\n").split("\n").map((e => function (e, {space: t, decode: n}) {
		if (!e) return e;
		t && ch[t] && (e = e.replace(/ /g, ch[t]));
		if (!n) return e;
		return e.replace(/&nbsp;/g, ch.nbsp).replace(/&ensp;/g, ch.ensp).replace(/&emsp;/g, ch.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
	}(e, t)))
}

const dh = nu({
	name: "Text",
	props: {
		selectable: {type: [Boolean, String], default: !1},
		space: {type: String, default: ""},
		decode: {type: [Boolean, String], default: !1}
	},
	setup: (e, {slots: t}) => () => {
		const n = [];
		return t.default && t.default().forEach((t => {
			if (8 & t.shapeFlag && t.type !== jr) {
				const o = uh(t.children, {space: e.space, decode: e.decode}), r = o.length - 1;
				o.forEach(((e, t) => {
					(0 !== t || e) && n.push(ei(e)), t !== r && n.push(Kr("br"))
				}))
			} else n.push(t)
		})), Kr("uni-text", {selectable: !!e.selectable || null}, [Kr("span", null, n)], 8, ["selectable"])
	}
}), ph = nu({
	name: "View", props: S({}, ru), setup(e, {slots: t}) {
		const {hovering: n, binding: o} = iu(e);
		return () => {
			const r = e.hoverClass;
			return r && "none" !== r ? Kr("uni-view", ii({class: n.value ? r : ""}, o), [t.default && t.default()], 16) : Kr("uni-view", null, [t.default && t.default()])
		}
	}
});

function fh(e, t) {
	if (t || (t = e.id), t) return e.$options.name.toLowerCase() + "." + t
}

function hh(e, t, n) {
	e && Il(n || yc(), e, (({type: e, data: n}, o) => {
		t(e, n, o)
	}))
}

function mh(e, t) {
	e && function (e, t) {
		t = Ol(e, t), delete Ll[t]
	}(t || yc(), e)
}

function gh(e, t, n, o) {
	const r = ui().proxy;
	Io((() => {
		hh(t || fh(r), e, o), !n && t || Gn((() => r.id), ((t, n) => {
			hh(fh(r, t), e, o), mh(n && fh(r, n))
		}))
	})), jo((() => {
		mh(t || fh(r), o)
	}))
}

let vh = 0;

function bh(e, t, n, o) {
	O(t) && Po(e, t.bind(n), o)
}

function yh(e, t, n) {
	var o;
	const r = e.mpType || n.$mpType;
	if (r && "component" !== r && (Object.keys(e).forEach((o => {
		if (function (e, t, n = !0) {
			return !(n && !O(t)) && (ke.indexOf(e) > -1 || 0 === e.indexOf("on"))
		}(o, e[o], !1)) {
			const r = e[o];
			C(r) ? r.forEach((e => bh(o, e, n, t))) : bh(o, r, n, t)
		}
	})), "page" === r)) {
		t.__isVisible = !0;
		try {
			Tc(n, "onLoad", t.attrs.__pageQuery), delete t.attrs.__pageQuery, "preloadPage" !== (null == (o = n.$page) ? void 0 : o.openType) && Tc(n, "onShow")
		} catch (i) {
			console.error(i.message + "\n" + i.stack)
		}
	}
}

function _h(e, t, n) {
	yh(e, t, n)
}

function wh(e, t, n) {
	return e[t] = n
}

function xh(e) {
	return function (t, n, o) {
		if (!n) throw t;
		const r = e._instance;
		if (!r || !r.proxy) throw t;
		Tc(r.proxy, "onError", t)
	}
}

function Th(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function Sh(e) {
	const t = e._context.config;
	var n;
	t.errorHandler = Ce(e, xh), n = t.optionMergeStrategies, ke.forEach((e => {
		n[e] = Th
	}));
	const o = t.globalProperties;
	o.$set = wh, o.$applyOptions = _h, function (e) {
		Ae.forEach((t => t(e)))
	}(e)
}

const Eh = lc("upm");

function kh() {
	return Xn(Eh)
}

function Ah(e) {
	const t = function (e) {
		return qt(function (e) {
			{
				const {enablePullDownRefresh: t, navigationBar: n} = e;
				if (t) {
					const t = function (e) {
						return e.offset && (e.offset = uc(e.offset)), e.height && (e.height = uc(e.height)), e.range && (e.range = uc(e.range)), e
					}(S({
						support: !0,
						color: "#2BD009",
						style: "circle",
						height: 70,
						range: 150,
						offset: 0
					}, e.pullToRefresh)), {type: o, style: r} = n;
					"custom" !== r && "transparent" !== o && (t.offset += 44 + tc.top), e.pullToRefresh = t
				}
			}
			{
				const {navigationBar: t} = e, {titleSize: n, titleColor: o, backgroundColor: r} = t;
				t.titleText = t.titleText || "", t.type = t.type || "default", t.titleSize = n || "16px", t.titleColor = o || "#000000", t.backgroundColor = r || "#F8F8F8", Cl(t)
			}
			if (history.state) {
				const t = history.state.__type__;
				"redirectTo" !== t && "reLaunch" !== t || 0 !== Hh().length || (e.isEntry = !0, e.isQuit = !0)
			}
			return e
		}(JSON.parse(JSON.stringify(xc(ml().meta, e)))))
	}(e);
	return Un(Eh, t), t
}

function Ch() {
	return ml()
}

function Bh() {
	return history.state && history.state.__id__ || 1
}

let Ph;

function Lh() {
	var e;
	return Ph || (Ph = __uniConfig.tabBar && qt((e = __uniConfig.tabBar, gl() && e.list && e.list.forEach((e => {
		_l(e, ["text"])
	})), e))), Ph
}

const Oh = window.CSS && window.CSS.supports;

function Ih(e) {
	return Oh && (Oh(e) || Oh.apply(window.CSS, e.split(":")))
}

const Mh = Ih("top:env(a)"), Fh = Ih("top:constant(a)"), jh = Ih("backdrop-filter:blur(10px)"),
	Rh = (() => Mh ? "env" : Fh ? "constant" : "")();

function Nh(e) {
	return Rh ? `calc(${e}px + ${Rh}(safe-area-inset-bottom))` : `${e}px`
}

const Dh = new Map;

function zh() {
	return Dh
}

function Hh() {
	const e = [], t = Dh.values();
	for (const n of t) n.$.__isTabBar ? n.$.__isActive && e.push(n) : e.push(n);
	return e
}

function qh(e, t = !0) {
	const n = Dh.get(e);
	n.$.__isUnload = !0, Tc(n, "onUnload"), Dh.delete(e), t && function (e) {
		const t = Uh.get(e);
		t && (Uh.delete(e), Xh.pruneCacheEntry(t))
	}(e)
}

let Vh = Bh();

function Wh(e) {
	const t = kh();
	let n = e.fullPath;
	return e.meta.isEntry && -1 === n.indexOf(e.meta.route) && (n = "/" + e.meta.route + n.replace("/", "")), function (e, t, n, o, r, i) {
		const {id: a, route: s} = o, l = Oe(o.navigationBar, __uniConfig.themeConfig, i).titleColor;
		return {
			id: a,
			path: le(s),
			route: s,
			fullPath: t,
			options: n,
			meta: o,
			openType: e,
			eventChannel: r,
			statusBarStyle: "#ffffff" === l ? "light" : "dark"
		}
	}("navigateTo", n, {}, t)
}

function $h(e) {
	const t = Wh(e.$route);
	!function (e, t) {
		e.route = t.route, e.$vm = e, e.$page = t, e.$mpType = "page", t.meta.isTabBar && (e.$.__isTabBar = !0, e.$.__isActive = !0)
	}(e, t), Dh.set(Qh(t.path, t.id), e)
}

function Qh(e, t) {
	return e + "$$" + t
}

const Uh = new Map, Xh = {
	get: e => Uh.get(e), set(e, t) {
		!function (e) {
			const t = parseInt(e.split("$$")[1]);
			if (!t) return;
			Xh.forEach(((e, n) => {
				const o = parseInt(n.split("$$")[1]);
				if (o && o > t) {
					if (function (e) {
						return "tabBar" === e.props.type
					}(e)) return;
					Xh.delete(n), Xh.pruneCacheEntry(e), kn((() => {
						Dh.forEach(((e, t) => {
							e.$.isUnmounted && Dh.delete(t)
						}))
					}))
				}
			}))
		}(e), Uh.set(e, t)
	}, delete(e) {
		Uh.get(e) && Uh.delete(e)
	}, forEach(e) {
		Uh.forEach(e)
	}
};

function Yh(e, t) {
	!function (e) {
		const t = Gh(e), {body: n} = document;
		Kh && n.removeAttribute(Kh), t && n.setAttribute(t, ""), Kh = t
	}(e), function (e) {
		let t = 0, n = 0;
		if ("custom" !== e.navigationBar.style && ["default", "float"].indexOf(e.navigationBar.type) > -1 && (t = 44), e.isTabBar) {
			const e = Lh();
			e.shown && (n = parseInt(e.height))
		}
		var o;
		sc({
			"--window-top": (o = t, Rh ? `calc(${o}px + ${Rh}(safe-area-inset-top))` : `${o}px`),
			"--window-bottom": Nh(n)
		})
	}(t), function (e) {
		const t = "nvue-dir-" + __uniConfig.nvue["flex-direction"];
		e.isNVue ? (document.body.setAttribute("nvue", ""), document.body.setAttribute(t, "")) : (document.body.removeAttribute("nvue"), document.body.removeAttribute(t))
	}(t), function (e, t) {
		document.removeEventListener("touchmove", Sc), Zh && document.removeEventListener("scroll", Zh);
		if (t.disableScroll) return document.addEventListener("touchmove", Sc);
		const {onPageScroll: n, onReachBottom: o} = e, r = "transparent" === t.navigationBar.type;
		if (!n && !o && !r) return;
		const i = {}, a = e.proxy.$page.id;
		(n || r) && (i.onPageScroll = function (e, t, n) {
			return o => {
				t && pv.publishHandler("onPageScroll", {scrollTop: o}, e), n && pv.emit(e + ".onPageScroll", {scrollTop: o})
			}
		}(a, n, r));
		o && (i.onReachBottomDistance = t.onReachBottomDistance || 50, i.onReachBottom = () => pv.publishHandler("onReachBottom", {}, a));
		Zh = Ac(i), requestAnimationFrame((() => document.addEventListener("scroll", Zh)))
	}(e, t)
}

function Jh(e) {
	const t = Gh(e);
	t && function (e) {
		const t = document.querySelector("uni-page-body");
		t && t.setAttribute(e, "")
	}(t)
}

function Gh(e) {
	return e.type.__scopeId
}

let Kh, Zh;

function em(e) {
	const t = fl({history: nm(), strict: !!__uniConfig.router.strict, routes: __uniRoutes, scrollBehavior: tm});
	e.router = t, e.use(t)
}

const tm = (e, t, n) => {
	if (n) return n
};

function nm() {
	let {routerBase: e} = __uniConfig.router;
	"/" === e && (e = "");
	const t = cs(e);
	return t.listen(((e, t, n) => {
		"back" === n.direction && function (e = 1) {
			const t = Hh(), n = t.length - 1, o = n - e;
			for (let r = n; r > o; r--) {
				const e = t[r].$page;
				qh(Qh(e.path, e.id), !1)
			}
		}(Math.abs(n.delta))
	})), t
}

const om = {
	install(e) {
		Sh(e), zc(e), Gc(e), e.config.warnHandler || (e.config.warnHandler = rm), em(e)
	}
};

function rm(e, t, n) {
	if (t) {
		if ("PageMetaHead" === t.$.type.name) return;
		const e = t.$.parent;
		if (e && "PageMeta" === e.type.name) return
	}
	const o = [`[Vue warn]: ${e}`];
	n.length && o.push("\n", n), console.warn(...o)
}

const im = {class: "uni-async-loading"}, am = Kr("i", {class: "uni-loading"}, null, -1),
	sm = ou({name: "AsyncLoading", render: () => (zr(), $r("div", im, [am]))});

function lm() {
	window.location.reload()
}

const cm = ou({
	name: "AsyncError", setup() {
		Tl();
		const {t: e} = wl();
		return () => Kr("div", {class: "uni-async-error", onClick: lm}, [e("uni.async.error")], 8, ["onClick"])
	}
});
let um;

function dm() {
	return um
}

function pm(e) {
	um = e, Object.defineProperty(um.$.ctx, "$children", {get: () => Hh().map((e => e.$vm))});
	const t = um.$.appContext.app;
	t.component(sm.name) || t.component(sm.name, sm), t.component(cm.name) || t.component(cm.name, cm), function (e) {
		e.$vm = e, e.$mpType = "app";
		const t = nn(wl().getLocale());
		Object.defineProperty(e, "$locale", {
			get: () => t.value, set(e) {
				t.value = e
			}
		})
	}(um), function (e, t) {
		const n = e.$options || {};
		n.globalData = S(n.globalData || {}, t), Object.defineProperty(e, "globalData", {
			get: () => n.globalData,
			set(e) {
				n.globalData = e
			}
		})
	}(um), Yc(), $l()
}

function fm(e, {clone: t, init: n, setup: o, before: r}) {
	t && (e = S({}, e)), r && r(e);
	const i = e.setup;
	return e.setup = (e, t) => {
		const r = ui();
		n(r.proxy);
		const a = o(r);
		if (i) return i(a || e, t)
	}, e
}

function hm(e, t) {
	return e && (e.__esModule || "Module" === e[Symbol.toStringTag]) ? fm(e.default, t) : fm(e, t)
}

function mm(e) {
	return hm(e, {
		clone: !0, init: $h, setup(e) {
			e.$pageInstance = e;
			const t = Ch(), n = ye(t.query);
			e.attrs.__pageQuery = n, e.proxy.$page.options = n;
			const o = kh();
			var r, i, a;
			return Oo((() => {
				Yh(e, o)
			})), Io((() => {
				Jh(e);
				const {onReady: n} = e;
				n && J(n), ym(t)
			})), To((() => {
				if (!e.__isVisible) {
					Yh(e, o), e.__isVisible = !0;
					const {onShow: n} = e;
					n && J(n), kn((() => {
						ym(t)
					}))
				}
			}), "ba", r), function (e, t) {
				To(e, "bda", t)
			}((() => {
				if (e.__isVisible && !e.__isUnload) {
					e.__isVisible = !1;
					const {onHide: t} = e;
					t && J(t)
				}
			})), i = o.id, pv.subscribe(Ol(i, "invokeViewApi"), a ? a(Ml) : Ml), jo((() => {
				!function (e) {
					pv.unsubscribe(Ol(e, "invokeViewApi")), Object.keys(Ll).forEach((t => {
						0 === t.indexOf(e + ".") && delete Ll[t]
					}))
				}(o.id)
			})), n
		}
	})
}

function gm() {
	const {windowWidth: e, windowHeight: t, screenWidth: n, screenHeight: o} = Dm(),
		r = 90 === Math.abs(Number(window.orientation)) ? "landscape" : "portrait";
	fv.emit("onResize", {
		deviceOrientation: r,
		size: {windowWidth: e, windowHeight: t, screenWidth: n, screenHeight: o}
	})
}

function vm(e) {
	D(e.data) && "WEB_INVOKE_APPSERVICE" === e.data.type && fv.emit("onWebInvokeAppService", e.data.data, e.data.pageId)
}

function bm() {
	const {emit: e} = fv;
	"visible" === document.visibilityState ? e("onAppEnterForeground", S({}, Pp)) : e("onAppEnterBackground")
}

function ym(e) {
	const {tabBarText: t, tabBarIndex: n, route: o} = e.meta;
	t && Tc("onTabItemTap", {index: n, text: t, pagePath: o})
}

function _m(e) {
	e = e > 0 && e < 1 / 0 ? e : 0;
	const t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), o = Math.floor(e % 3600 % 60),
		r = (t < 10 ? "0" : "") + t;
	let i = (n < 10 ? "0" : "") + n + ":" + ((o < 10 ? "0" : "") + o);
	return "00" !== r && (i = r + ":" + i), i
}

function wm(e, t, n) {
	const o = qt({gestureType: "none", volumeOld: 0, volumeNew: 0, currentTimeOld: 0, currentTimeNew: 0}),
		r = {x: 0, y: 0};
	return {
		state: o, onTouchstart: function (e) {
			const t = e.targetTouches[0];
			r.x = t.pageX, r.y = t.pageY, o.gestureType = "none", o.volumeOld = 0, o.currentTimeOld = o.currentTimeNew = 0
		}, onTouchmove: function (i) {
			function a() {
				i.stopPropagation(), i.preventDefault()
			}

			n.fullscreen && a();
			const s = o.gestureType;
			if ("stop" === s) return;
			const l = i.targetTouches[0], c = l.pageX, u = l.pageY, d = r, p = t.value;
			if ("progress" === s ? function (e) {
				const n = t.value.duration;
				let r = e / 600 * n + o.currentTimeOld;
				r < 0 ? r = 0 : r > n && (r = n);
				o.currentTimeNew = r
			}(c - d.x) : "volume" === s && function (e) {
				const n = t.value, r = o.volumeOld;
				let i;
				"number" == typeof r && (i = r - e / 200, i < 0 ? i = 0 : i > 1 && (i = 1), n.volume = i, o.volumeNew = i)
			}(u - d.y), "none" === s) if (Math.abs(c - d.x) > Math.abs(u - d.y)) {
				if (!e.enableProgressGesture) return void (o.gestureType = "stop");
				o.gestureType = "progress", o.currentTimeOld = o.currentTimeNew = p.currentTime, n.fullscreen || a()
			} else {
				if (!e.pageGesture) return void (o.gestureType = "stop");
				o.gestureType = "volume", o.volumeOld = p.volume, n.fullscreen || a()
			}
		}, onTouchend: function (e) {
			const n = t.value;
			"none" !== o.gestureType && "stop" !== o.gestureType && (e.stopPropagation(), e.preventDefault()), "progress" === o.gestureType && o.currentTimeOld !== o.currentTimeNew && (n.currentTime = o.currentTimeNew), o.gestureType = "none"
		}
	}
}

function xm(e, t, n, o, r, i, a) {
	const s = {play: e, pause: t, seek: n, sendDanmu: o, playbackRate: r, requestFullScreen: i, exitFullScreen: a};
	gh(((e, t) => {
		let n;
		switch (e) {
			case"seek":
				n = t.position;
				break;
			case"sendDanmu":
				n = t;
				break;
			case"playbackRate":
				n = t.rate
		}
		e in s && s[e](n)
	}), function (e) {
		const t = mc(), n = ui().proxy, o = n.$options.name.toLowerCase(), r = e || n.id || "context" + vh++;
		return Io((() => {
			n.$el.__uniContextInfo = {id: r, type: o, page: t}
		})), `${o}.${r}`
	}(), !0)
}

const Tm = nu({
	name: "Video",
	props: {
		id: {type: String, default: ""},
		src: {type: String, default: ""},
		duration: {type: [Number, String], default: ""},
		controls: {type: [Boolean, String], default: !0},
		danmuList: {type: Array, default: () => []},
		danmuBtn: {type: [Boolean, String], default: !1},
		enableDanmu: {type: [Boolean, String], default: !1},
		autoplay: {type: [Boolean, String], default: !1},
		loop: {type: [Boolean, String], default: !1},
		muted: {type: [Boolean, String], default: !1},
		objectFit: {type: String, default: "contain"},
		poster: {type: String, default: ""},
		direction: {type: [String, Number], default: ""},
		showProgress: {type: Boolean, default: !0},
		initialTime: {type: [String, Number], default: 0},
		showFullscreenBtn: {type: [Boolean, String], default: !0},
		pageGesture: {type: [Boolean, String], default: !1},
		enableProgressGesture: {type: [Boolean, String], default: !0},
		showPlayBtn: {type: [Boolean, String], default: !0},
		showCenterPlayBtn: {type: [Boolean, String], default: !0}
	},
	emits: ["fullscreenchange", "progress", "loadedmetadata", "waiting", "error", "play", "pause", "ended", "timeupdate"],
	setup(e, {emit: t, attrs: n, slots: o}) {
		const r = nn(null), i = nn(null),
			a = lu(r, t), {state: s} = of(), {$attrs: l} = vf({excludeListeners: !0}), {t: c} = wl();
		Al();
		const {videoRef: u, state: d, play: p, pause: f, seek: h, playbackRate: m, toggle: g, onDurationChange: v, onLoadedMetadata: b, onProgress: y, onWaiting: _, onVideoError: w, onPlay: x, onPause: T, onEnded: S, onTimeUpdate: E} = function (e, t, n) {
			const o = nn(null), r = yi((() => gu(e.src))),
				i = qt({start: !1, src: r, playing: !1, currentTime: 0, duration: 0, progress: 0, buffered: 0});

			function a(e) {
				const t = e.target, n = t.buffered;
				n.length && (i.buffered = n.end(n.length - 1) / t.duration * 100)
			}

			return Gn((() => r.value), (() => {
				i.playing = !1, i.currentTime = 0
			})), Gn((() => i.buffered), (e => {
				n("progress", {}, {buffered: e})
			})), {
				videoRef: o, state: i, play: function () {
					const e = o.value;
					i.start = !0, e.play()
				}, pause: function () {
					o.value.pause()
				}, seek: function (e) {
					const t = o.value;
					"number" != typeof (e = Number(e)) || isNaN(e) || (t.currentTime = e)
				}, playbackRate: function (e) {
					o.value.playbackRate = e
				}, toggle: function () {
					const e = o.value;
					i.playing ? e.pause() : e.play()
				}, onDurationChange: function ({target: e}) {
					i.duration = e.duration
				}, onLoadedMetadata: function (t) {
					const o = Number(e.initialTime) || 0, r = t.target;
					o > 0 && (r.currentTime = o), n("loadedmetadata", t, {
						width: r.videoWidth,
						height: r.videoHeight,
						duration: r.duration
					}), a(t)
				}, onProgress: a, onWaiting: function (e) {
					n("waiting", e, {})
				}, onVideoError: function (e) {
					i.playing = !1, n("error", e, {})
				}, onPlay: function (e) {
					i.start = !0, i.playing = !0, n("play", e, {})
				}, onPause: function (e) {
					i.playing = !1, n("pause", e, {})
				}, onEnded: function (e) {
					i.playing = !1, n("ended", e, {})
				}, onTimeUpdate: function (e) {
					const t = e.target, o = i.currentTime = t.currentTime;
					n("timeupdate", e, {currentTime: o, duration: t.duration})
				}
			}
		}(e, 0, a), {state: k, danmuRef: A, updateDanmu: B, toggleDanmu: P, sendDanmu: L} = function (e, t) {
			const n = nn(null), o = qt({enable: Boolean(e.enableDanmu)});
			let r = {time: 0, index: -1};
			const i = C(e.danmuList) ? JSON.parse(JSON.stringify(e.danmuList)) : [];

			function a(e) {
				const t = document.createElement("p");
				t.className = "uni-video-danmu-item", t.innerText = e.text;
				let o = `bottom: ${100 * Math.random()}%;color: ${e.color};`;
				t.setAttribute("style", o), n.value.appendChild(t), setTimeout((function () {
					o += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);", t.setAttribute("style", o), setTimeout((function () {
						t.remove()
					}), 4e3)
				}), 17)
			}

			return i.sort((function (e, t) {
				return (e.time || 0) - (t.time || 0)
			})), {
				state: o, danmuRef: n, updateDanmu: function (e) {
					const n = e.target.currentTime, s = r, l = {time: n, index: s.index};
					if (n > s.time) for (let r = s.index + 1; r < i.length; r++) {
						const e = i[r];
						if (!(n >= (e.time || 0))) break;
						l.index = r, t.playing && o.enable && a(e)
					} else if (n < s.time) for (let t = s.index - 1; t > -1 && n <= (i[t].time || 0); t--) l.index = t - 1;
					r = l
				}, toggleDanmu: function () {
					o.enable = !o.enable
				}, sendDanmu: function (e) {
					i.splice(r.index + 1, 0, {text: String(e.text), color: e.color, time: t.currentTime || 0})
				}
			}
		}(e, d), {state: O, onFullscreenChange: I, emitFullscreenChange: M, toggleFullscreen: F, requestFullScreen: j, exitFullScreen: R} = function (e, t, n, o, r) {
			const i = qt({fullscreen: !1}), a = /^Apple/.test(navigator.vendor);

			function s(t) {
				i.fullscreen = t, e("fullscreenchange", {}, {fullScreen: t, direction: "vertical"})
			}

			function l(e) {
				const i = r.value, l = t.value, c = n.value;
				let u;
				e ? !document.fullscreenEnabled && !document.webkitFullscreenEnabled || a && !o.userAction ? c.webkitEnterFullScreen ? c.webkitEnterFullScreen() : (u = !0, l.remove(), l.classList.add("uni-video-type-fullscreen"), document.body.appendChild(l)) : l[document.fullscreenEnabled ? "requestFullscreen" : "webkitRequestFullscreen"]() : document.fullscreenEnabled || document.webkitFullscreenEnabled ? document.fullscreenElement ? document.exitFullscreen() : document.webkitFullscreenElement && document.webkitExitFullscreen() : c.webkitExitFullScreen ? c.webkitExitFullScreen() : (u = !0, l.remove(), l.classList.remove("uni-video-type-fullscreen"), i.appendChild(l)), u && s(e)
			}

			function c() {
				l(!1)
			}

			return jo(c), {
				state: i, onFullscreenChange: function (e, t) {
					t && document.fullscreenEnabled || s(!(!document.fullscreenElement && !document.webkitFullscreenElement))
				}, emitFullscreenChange: s, toggleFullscreen: l, requestFullScreen: function () {
					l(!0)
				}, exitFullScreen: c
			}
		}(a, i, u, s, r), {state: N, onTouchstart: D, onTouchend: z, onTouchmove: H} = wm(e, u, O), {state: q, progressRef: V, ballRef: W, clickProgress: $, toggleControls: Q} = function (e, t, n) {
			const o = nn(null), r = nn(null), i = yi((() => e.showCenterPlayBtn && !t.start)), a = nn(!0),
				s = yi((() => !i.value && e.controls && a.value)),
				l = qt({touching: !1, controlsTouching: !1, centerPlayBtnShow: i, controlsShow: s, controlsVisible: a});
			let c;

			function u() {
				c = setTimeout((() => {
					l.controlsVisible = !1
				}), 3e3)
			}

			function d() {
				c && (clearTimeout(c), c = null)
			}

			return jo((() => {
				c && clearTimeout(c)
			})), Gn((() => l.controlsShow && t.playing && !l.controlsTouching), (e => {
				e ? u() : d()
			})), Gn([() => t.currentTime, () => {
				e.duration
			}], (function () {
				l.touching || (t.progress = t.currentTime / t.duration * 100)
			})), Io((() => {
				const e = ge(!1);
				let i, a, s, c = !0;
				const u = r.value;

				function d(e) {
					const n = e.targetTouches[0], r = n.pageX, l = n.pageY;
					if (c && Math.abs(r - i) < Math.abs(l - a)) return void p(e);
					c = !1;
					const u = o.value.offsetWidth;
					let d = s + (r - i) / u * 100;
					d < 0 ? d = 0 : d > 100 && (d = 100), t.progress = d, e.preventDefault(), e.stopPropagation()
				}

				function p(o) {
					l.controlsTouching = !1, l.touching && (u.removeEventListener("touchmove", d, e), c || (o.preventDefault(), o.stopPropagation(), n(t.duration * t.progress / 100)), l.touching = !1)
				}

				u.addEventListener("touchstart", (n => {
					l.controlsTouching = !0;
					const o = n.targetTouches[0];
					i = o.pageX, a = o.pageY, s = t.progress, c = !0, l.touching = !0, u.addEventListener("touchmove", d, e)
				})), u.addEventListener("touchend", p), u.addEventListener("touchcancel", p)
			})), {
				state: l, progressRef: o, ballRef: r, clickProgress: function (e) {
					const r = o.value;
					let i = e.target, a = e.offsetX;
					for (; i && i !== r;) a += i.offsetLeft, i = i.parentNode;
					const s = r.offsetWidth;
					let l = 0;
					a >= 0 && a <= s && (l = a / s, n(t.duration * l))
				}, toggleControls: function () {
					l.controlsVisible = !l.controlsVisible
				}, autoHideStart: u, autoHideEnd: d
			}
		}(e, d, h);
		return xm(p, f, h, L, m, j, R), () => Kr("uni-video", {ref: r, id: e.id}, [Kr("div", {
			ref: i,
			class: "uni-video-container",
			onTouchstart: D,
			onTouchend: z,
			onTouchmove: H,
			onFullscreenchange: wa(I, ["stop"]),
			onWebkitfullscreenchange: wa((e => I(e, !0)), ["stop"])
		}, [Kr("video", ii({
			ref: u,
			style: {"object-fit": e.objectFit},
			muted: !!e.muted,
			loop: !!e.loop,
			src: d.src,
			poster: e.poster,
			autoplay: !!e.autoplay
		}, l.value, {
			class: "uni-video-video",
			"webkit-playsinline": !0,
			playsinline: !0,
			onClick: Q,
			onDurationchange: v,
			onLoadedmetadata: b,
			onProgress: y,
			onWaiting: _,
			onError: w,
			onPlay: x,
			onPause: T,
			onEnded: S,
			onTimeupdate: e => {
				E(e), B(e)
			},
			onWebkitbeginfullscreen: () => M(!0),
			onX5videoenterfullscreen: () => M(!0),
			onWebkitendfullscreen: () => M(!1),
			onX5videoexitfullscreen: () => M(!1)
		}), null, 16, ["muted", "loop", "src", "poster", "autoplay", "webkit-playsinline", "playsinline", "onClick", "onDurationchange", "onLoadedmetadata", "onProgress", "onWaiting", "onError", "onPlay", "onPause", "onEnded", "onTimeupdate", "onWebkitbeginfullscreen", "onX5videoenterfullscreen", "onWebkitendfullscreen", "onX5videoexitfullscreen"]), qo(Kr("div", {
			class: "uni-video-bar uni-video-bar-full",
			onClick: wa((() => {
			}), ["stop"])
		}, [Kr("div", {class: "uni-video-controls"}, [qo(Kr("div", {
			class: {
				"uni-video-control-button": !0,
				"uni-video-control-button-play": !d.playing,
				"uni-video-control-button-pause": d.playing
			}, onClick: wa(g, ["stop"])
		}, null, 10, ["onClick"]), [[xa, e.showPlayBtn]]), qo(Kr("div", {class: "uni-video-current-time"}, [_m(d.currentTime)], 512), [[xa, e.showProgress]]), qo(Kr("div", {
			ref: V,
			class: "uni-video-progress-container",
			onClick: wa($, ["stop"])
		}, [Kr("div", {class: "uni-video-progress"}, [Kr("div", {
			style: {width: d.buffered + "%"},
			class: "uni-video-progress-buffered"
		}, null, 4), Kr("div", {
			ref: W,
			style: {left: d.progress + "%"},
			class: "uni-video-ball"
		}, [Kr("div", {class: "uni-video-inner"}, null)], 4)])], 8, ["onClick"]), [[xa, e.showProgress]]), qo(Kr("div", {class: "uni-video-duration"}, [_m(Number(e.duration) || d.duration)], 512), [[xa, e.showProgress]])]), qo(Kr("div", {
			class: {
				"uni-video-danmu-button": !0,
				"uni-video-danmu-button-active": k.enable
			}, onClick: wa(P, ["stop"])
		}, [c("uni.video.danmu")], 10, ["onClick"]), [[xa, e.danmuBtn]]), qo(Kr("div", {
			class: {
				"uni-video-fullscreen": !0,
				"uni-video-type-fullscreen": O.fullscreen
			}, onClick: wa((() => F(!O.fullscreen)), ["stop"])
		}, null, 10, ["onClick"]), [[xa, e.showFullscreenBtn]])], 8, ["onClick"]), [[xa, q.controlsShow]]), qo(Kr("div", {
			ref: A,
			style: "z-index: 0;",
			class: "uni-video-danmu"
		}, null, 512), [[xa, d.start && k.enable]]), q.centerPlayBtnShow && Kr("div", {
			class: "uni-video-cover",
			onClick: wa((() => {
			}), ["stop"])
		}, [Kr("div", {
			class: "uni-video-cover-play-button",
			onClick: wa(p, ["stop"])
		}, null, 8, ["onClick"]), Kr("p", {class: "uni-video-cover-duration"}, [_m(Number(e.duration) || d.duration)])], 8, ["onClick"]), Kr("div", {
			class: {
				"uni-video-toast": !0,
				"uni-video-toast-volume": "volume" === N.gestureType
			}
		}, [Kr("div", {class: "uni-video-toast-title"}, [c("uni.video.volume")]), Kr("svg", {
			class: "uni-video-toast-icon",
			width: "200px",
			height: "200px",
			viewBox: "0 0 1024 1024",
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg"
		}, [Kr("path", {d: "M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"}, null)]), Kr("div", {class: "uni-video-toast-value"}, [Kr("div", {
			style: {width: 100 * N.volumeNew + "%"},
			class: "uni-video-toast-value-content"
		}, [Kr("div", {class: "uni-video-toast-volume-grids"}, [Yo(10, (() => Kr("div", {class: "uni-video-toast-volume-grids-item"}, null)))])], 4)])], 2), Kr("div", {
			class: {
				"uni-video-toast": !0,
				"uni-video-toast-progress": "progress" === N.gestureType
			}
		}, [Kr("div", {class: "uni-video-toast-title"}, [_m(N.currentTimeNew), " / ", _m(d.duration)])], 2), Kr("div", {class: "uni-video-slots"}, [o.default && o.default()])], 40, ["onTouchstart", "onTouchend", "onTouchmove", "onFullscreenchange", "onWebkitfullscreenchange"])], 8, ["id"])
	}
}), Sm = ({name: e, arg: t}) => {
	"postMessage" === e || uni[e](t)
}, Em = de((() => fv.on("onWebInvokeAppService", Sm))), km = nu({
	inheritAttrs: !1,
	name: "WebView",
	props: {src: {type: String, default: ""}, fullscreen: {type: Boolean, default: !0}},
	setup(e) {
		Em();
		const t = nn(null), n = nn(null), {$attrs: o, $excludeAttrs: r, $listeners: i} = vf({excludeListeners: !0});
		let a;
		return (() => {
			const r = document.createElement("iframe");
			Yn((() => {
				for (const e in o.value) if (A(o.value, e)) {
					const t = o.value[e];
					r[e] = t
				}
			})), Yn((() => {
				r.src = gu(e.src)
			})), n.value = r, a = function (e, t, n) {
				return () => {
					var o, r;
					if (n) {
						const {top: n, left: o, width: r, height: i} = e.value.getBoundingClientRect();
						ue(t.value, {
							position: "absolute",
							display: "block",
							border: "0",
							top: n + "px",
							left: o + "px",
							width: r + "px",
							height: i + "px"
						})
					} else ue(t.value, {
						width: (null == (o = e.value) ? void 0 : o.style.width) || "300px",
						height: (null == (r = e.value) ? void 0 : r.style.height) || "150px"
					})
				}
			}(t, n, e.fullscreen), e.fullscreen && document.body.appendChild(r)
		})(), Io((() => {
			var o;
			a(), !e.fullscreen && (null == (o = t.value) || o.appendChild(n.value))
		})), wo((() => {
			e.fullscreen && (n.value.style.display = "block")
		})), xo((() => {
			e.fullscreen && (n.value.style.display = "none")
		})), jo((() => {
			e.fullscreen && document.body.removeChild(n.value)
		})), () => Kr(Mr, null, [Kr("uni-web-view", ii({class: e.fullscreen ? "uni-webview--fullscreen" : ""}, i.value, r.value, {ref: t}), [Kr(Lp, {onResize: a}, null, 8, ["onResize"])], 16)])
	}
});
const Am = ld("makePhoneCall", (({phoneNumber: e}, {resolve: t}) => (window.location.href = `tel:${e}`, t()))),
	Cm = navigator.cookieEnabled && (window.localStorage || window.sessionStorage) || {};
let Bm;

function Pm() {
	if (Bm = Bm || Cm.__DC_STAT_UUID, !Bm) {
		Bm = Date.now() + "" + Math.floor(1e7 * Math.random());
		try {
			Cm.__DC_STAT_UUID = Bm
		} catch (e) {
		}
	}
	return Bm
}

function Lm() {
	if (!0 !== __uniConfig.darkmode) return I(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
	try {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
	} catch (e) {
		return "light"
	}
}

function Om() {
	let e, t = "0", n = "", o = "phone";
	const r = navigator.language;
	if (yu) {
		e = "iOS";
		const o = vu.match(/OS\s([\w_]+)\slike/);
		o && (t = o[1].replace(/_/g, "."));
		const r = vu.match(/\(([a-zA-Z]+);/);
		r && (n = r[1])
	} else if (bu) {
		e = "Android";
		const o = vu.match(/Android[\s/]([\w\.]+)[;\s]/);
		o && (t = o[1]);
		const r = vu.match(/\((.+?)\)/), i = r ? r[1].split(";") : vu.split(" "),
			a = [/\bAndroid\b/i, /\bLinux\b/i, /\bU\b/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /\bwv\b/i, /\/[\d\.,]+$/, /^\s?[\d\.,]+$/, /\bBrowser\b/i, /\bMobile\b/i];
		for (let e = 0; e < i.length; e++) {
			const t = i[e];
			if (t.indexOf("Build") > 0) {
				n = t.split("Build")[0].trim();
				break
			}
			let o;
			for (let e = 0; e < a.length; e++) if (a[e].test(t)) {
				o = !0;
				break
			}
			if (!o) {
				n = t.trim();
				break
			}
		}
	} else if (Tu) n = "iPad", e = "iOS", o = "pad", t = O(window.BigInt) ? "14.0" : "13.0"; else if (_u || wu || xu) {
		n = "PC", e = "PC", o = "pc", t = "0";
		let r = vu.match(/\((.+?)\)/)[1];
		if (_u) {
			switch (e = "Windows", _u[1]) {
				case"5.1":
					t = "XP";
					break;
				case"6.0":
					t = "Vista";
					break;
				case"6.1":
					t = "7";
					break;
				case"6.2":
					t = "8";
					break;
				case"6.3":
					t = "8.1";
					break;
				case"10.0":
					t = "10"
			}
			const n = r && r.match(/[Win|WOW]([\d]+)/);
			n && (t += ` x${n[1]}`)
		} else if (wu) {
			e = "macOS";
			const n = r && r.match(/Mac OS X (.+)/) || "";
			t && (t = n[1].replace(/_/g, "."), -1 !== t.indexOf(";") && (t = t.split(";")[0]))
		} else if (xu) {
			e = "Linux";
			const n = r && r.match(/Linux (.*)/) || "";
			n && (t = n[1], -1 !== t.indexOf(";") && (t = t.split(";")[0]))
		}
	} else e = "Other", t = "0", o = "unknown";
	const i = `${e} ${t}`, a = e.toLocaleLowerCase();
	let s = "", l = String(function () {
		const e = navigator.userAgent, t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1,
			n = e.indexOf("Edge") > -1 && !t, o = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
		if (t) {
			new RegExp("MSIE (\\d+\\.\\d+);").test(e);
			const t = parseFloat(RegExp.$1);
			return t > 6 ? t : 6
		}
		return n ? -1 : o ? 11 : -1
	}());
	if ("-1" !== l) s = "IE"; else {
		const e = ["Version", "Firefox", "Chrome", "Edge{0,1}"], t = ["Safari", "Firefox", "Chrome", "Edge"];
		for (let n = 0; n < e.length; n++) {
			const o = e[n], r = new RegExp(`(${o})/(\\S*)\\b`);
			r.test(vu) && (s = t[n], l = vu.match(r)[2])
		}
	}
	let c = "portrait";
	const u = void 0 === window.screen.orientation ? window.orientation : window.screen.orientation.angle;
	return c = 90 === Math.abs(u) ? "landscape" : "portrait", {
		deviceBrand: void 0,
		brand: void 0,
		deviceModel: n,
		deviceOrientation: c,
		model: n,
		system: i,
		platform: a,
		browserName: s.toLocaleLowerCase(),
		browserVersion: l,
		language: r,
		deviceType: o,
		ua: vu,
		osname: e,
		osversion: t,
		theme: Lm()
	}
}

const Im = sd(0, (() => {
	const e = window.devicePixelRatio, t = Su(), n = Eu(t), o = ku(t, n), r = function (e, t) {
		return e ? Math[t ? "min" : "max"](screen.height, screen.width) : screen.height
	}(t, n), i = Au(o);
	let a = window.innerHeight;
	const s = tc.top, l = {
		left: tc.left,
		right: i - tc.right,
		top: tc.top,
		bottom: a - tc.bottom,
		width: i - tc.left - tc.right,
		height: a - tc.top - tc.bottom
	}, {top: c, bottom: u} = ic();
	return a -= c, a -= u, {
		windowTop: c,
		windowBottom: u,
		windowWidth: i,
		windowHeight: a,
		pixelRatio: e,
		screenWidth: o,
		screenHeight: r,
		statusBarHeight: s,
		safeArea: l,
		safeAreaInsets: {top: tc.top, right: tc.right, bottom: tc.bottom, left: tc.left},
		screenTop: r - a
	}
}));
let Mm, Fm = !0;

function jm() {
	Fm && (Mm = Om())
}

const Rm = sd(0, (() => {
	jm();
	const {deviceBrand: e, deviceModel: t, brand: n, model: o, platform: r, system: i, deviceOrientation: a, deviceType: s} = Mm;
	return {
		brand: n,
		deviceBrand: e,
		deviceModel: t,
		devicePixelRatio: window.devicePixelRatio,
		deviceId: Pm(),
		deviceOrientation: a,
		deviceType: s,
		model: o,
		platform: r,
		system: i
	}
})), Nm = sd(0, (() => {
	jm();
	const {theme: e, language: t, browserName: n, browserVersion: o} = Mm;
	return {
		appId: __uniConfig.appId,
		appName: __uniConfig.appName,
		appVersion: __uniConfig.appVersion,
		appVersionCode: __uniConfig.appVersionCode,
		appLanguage: Ud ? Ud() : t,
		enableDebug: !1,
		hostSDKVersion: void 0,
		hostPackageName: void 0,
		hostFontSizeSetting: void 0,
		hostName: n,
		hostVersion: o,
		hostTheme: e,
		hostLanguage: t,
		language: t,
		SDKVersion: "",
		theme: e,
		version: ""
	}
})), Dm = sd(0, (() => {
	Fm = !0, jm(), Fm = !1;
	const e = Im(), t = Rm(), n = Nm();
	Fm = !0;
	const {ua: o, browserName: r, browserVersion: i, osname: a, osversion: s} = Mm, l = S(e, t, n, {
		ua: o,
		browserName: r,
		browserVersion: i,
		uniPlatform: "web",
		uniCompileVersion: __uniConfig.compilerVersion,
		uniRuntimeVersion: __uniConfig.compilerVersion,
		fontSizeSetting: void 0,
		osName: a.toLocaleLowerCase(),
		osVersion: s,
		osLanguage: void 0,
		osTheme: void 0
	});
	return delete l.screenTop, delete l.enableDebug, __uniConfig.darkmode || delete l.theme, function (e) {
		let t = {};
		return D(e) && Object.keys(e).sort().forEach((n => {
			const o = n;
			t[o] = e[o]
		})), Object.keys(t) ? t : e
	}(l)
})), zm = ld("getSystemInfo", ((e, {resolve: t}) => t(Dm())));
const Hm = sd(0, ((e, t) => {
	const n = typeof t, o = "string" === n ? t : JSON.stringify({type: n, data: t});
	localStorage.setItem(e, o)
})), qm = ld("setStorage", (({key: e, data: t}, {resolve: n, reject: o}) => {
	try {
		Hm(e, t), n()
	} catch (r) {
		o(r.message)
	}
}));

function Vm(e) {
	const t = localStorage && localStorage.getItem(e);
	if (!I(t)) throw new Error("data not found");
	let n = t;
	try {
		const e = function (e) {
			const t = ["object", "string", "number", "boolean", "undefined"];
			try {
				const n = I(e) ? JSON.parse(e) : e, o = n.type;
				if (t.indexOf(o) >= 0) {
					const e = Object.keys(n);
					if (2 === e.length && "data" in n) {
						if (typeof n.data === o) return n.data;
						if ("object" === o && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(n.data)) return new Date(n.data)
					} else if (1 === e.length) return ""
				}
			} catch (n) {
			}
		}(JSON.parse(t));
		void 0 !== e && (n = e)
	} catch (o) {
	}
	return n
}

const Wm = sd(0, (e => {
	try {
		return Vm(e)
	} catch (t) {
		return ""
	}
})), $m = ld("getStorage", (({key: e}, {resolve: t, reject: n}) => {
	try {
		t({data: Vm(e)})
	} catch (o) {
		n(o.message)
	}
})), Qm = sd(0, (e => {
	localStorage && localStorage.removeItem(e)
})), Um = ld("removeStorage", (({key: e}, {resolve: t}) => {
	Qm(e), t()
})), Xm = ld("hideKeyboard", ((e, {resolve: t, reject: n}) => {
	const o = document.activeElement;
	!o || "TEXTAREA" !== o.tagName && "INPUT" !== o.tagName || (o.blur(), t())
})), Ym = {
	image: {
		jpg: "jpeg",
		jpe: "jpeg",
		pbm: "x-portable-bitmap",
		pgm: "x-portable-graymap",
		pnm: "x-portable-anymap",
		ppm: "x-portable-pixmap",
		psd: "vnd.adobe.photoshop",
		pic: "x-pict",
		rgb: "x-rgb",
		svg: "svg+xml",
		svgz: "svg+xml",
		tif: "tiff",
		xif: "vnd.xiff",
		wbmp: "vnd.wap.wbmp",
		wdp: "vnd.ms-photo",
		xbm: "x-xbitmap",
		ico: "x-icon"
	},
	video: {
		"3g2": "3gpp2",
		"3gp": "3gpp",
		avi: "x-msvideo",
		f4v: "x-f4v",
		flv: "x-flv",
		jpgm: "jpm",
		jpgv: "jpeg",
		m1v: "mpeg",
		m2v: "mpeg",
		mpe: "mpeg",
		mpg: "mpeg",
		mpg4: "mpeg",
		m4v: "x-m4v",
		mkv: "x-matroska",
		mov: "quicktime",
		qt: "quicktime",
		movie: "x-sgi-movie",
		mp4v: "mp4",
		ogv: "ogg",
		smv: "x-smv",
		wm: "x-ms-wm",
		wmv: "x-ms-wmv",
		wmx: "x-ms-wmx",
		wvx: "x-ms-wvx"
	}
};

function Jm({count: e, sourceType: t, type: n, extension: o}) {
	const r = document.createElement("input");
	return r.type = "file", ue(r, {
		position: "absolute",
		visibility: "hidden",
		zIndex: "-999",
		width: "0",
		height: "0",
		top: "0",
		left: "0"
	}), r.accept = o.map((e => {
		if ("all" !== n) {
			const t = e.replace(".", "");
			return `${n}/${Ym[n][t] || t}`
		}
		return function () {
			const e = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
			return !(!e || "micromessenger" !== e[0])
		}() ? "." : 0 === e.indexOf(".") ? e : `.${e}`
	})).join(","), e && e > 1 && (r.multiple = !0), "all" !== n && t instanceof Array && 1 === t.length && "camera" === t[0] && r.setAttribute("capture", "camera"), r
}

tf();
let Gm = null;
const Km = ld("chooseFile", (({count: e, sourceType: t, type: n, extension: o}, {resolve: r, reject: i}) => {
	kl();
	const {t: a} = wl();
	Gm && (document.body.removeChild(Gm), Gm = null), Gm = Jm({
		count: e,
		sourceType: t,
		type: n,
		extension: o
	}), document.body.appendChild(Gm), Gm.addEventListener("change", (function (t) {
		const n = t.target, o = [];
		if (n && n.files) {
			const t = n.files.length;
			for (let r = 0; r < t; r++) {
				const t = n.files[r];
				let i;
				Object.defineProperty(t, "path", {get: () => (i = i || Ap(t), i)}), r < e && o.push(t)
			}
		}
		r({
			get tempFilePaths() {
				return o.map((({path: e}) => e))
			}, tempFiles: o
		})
	})), Gm.click(), nf() || console.warn(a("uni.chooseFile.notUserActivation"))
}), 0, ep);
let Zm = null;
const eg = ld("chooseImage", (({count: e, sourceType: t, extension: n}, {resolve: o, reject: r}) => {
	kl();
	const {t: i} = wl();
	Zm && (document.body.removeChild(Zm), Zm = null), Zm = Jm({
		count: e,
		sourceType: t,
		extension: n,
		type: "image"
	}), document.body.appendChild(Zm), Zm.addEventListener("change", (function (t) {
		const n = t.target, r = [];
		if (n && n.files) {
			const t = n.files.length;
			for (let o = 0; o < t; o++) {
				const t = n.files[o];
				let i;
				Object.defineProperty(t, "path", {get: () => (i = i || Ap(t), i)}), o < e && r.push(t)
			}
		}
		o({
			get tempFilePaths() {
				return r.map((({path: e}) => e))
			}, tempFiles: r
		})
	})), Zm.click(), nf() || console.warn(i("uni.chooseFile.notUserActivation"))
}), 0, Gd), tg = {esc: ["Esc", "Escape"], enter: ["Enter"]}, ng = Object.keys(tg);

function og(e, t, n) {
	return t.onClose = (...e) => (t.visible = !1, n.apply(null, e)), ka(po({setup: () => () => (zr(), $r(e, t, null, 16))}))
}

function rg(e) {
	let t = document.getElementById(e);
	return t || (t = document.createElement("div"), t.id = e, document.body.append(t)), t
}

function ig(e, {onEsc: t, onEnter: n}) {
	const o = nn(e.visible), {key: r, disable: i} = function () {
		const e = nn(""), t = nn(!1), n = n => {
			if (t.value) return;
			const o = ng.find((e => -1 !== tg[e].indexOf(n.key)));
			o && (e.value = o), kn((() => e.value = ""))
		};
		return Io((() => {
			document.addEventListener("keyup", n)
		})), jo((() => {
			document.removeEventListener("keyup", n)
		})), {key: e, disable: t}
	}();
	return Gn((() => e.visible), (e => o.value = e)), Gn((() => o.value), (e => i.value = !e)), Yn((() => {
		const {value: e} = r;
		"esc" === e ? t && t() : "enter" === e && n && n()
	})), o
}

let ag = 0, sg = "";

function lg(e) {
	let t = ag;
	ag += e ? 1 : -1, ag = Math.max(0, ag), ag > 0 ? 0 === t && (sg = document.body.style.overflow, document.body.style.overflow = "hidden") : (document.body.style.overflow = sg, sg = "")
}

const cg = ou({
	name: "ImageView", props: {src: {type: String, default: ""}}, setup(e) {
		const t = qt({direction: "none"});
		let n = 1, o = 0, r = 0, i = 0, a = 0;

		function s({detail: e}) {
			n = e.scale
		}

		function l(e) {
			const t = e.target.getBoundingClientRect();
			o = t.width, r = t.height
		}

		function c(e) {
			const t = e.target.getBoundingClientRect();
			i = t.width, a = t.height, d(e)
		}

		function u(e) {
			const s = n * o > i, l = n * r > a;
			t.direction = s && l ? "all" : s ? "horizontal" : l ? "vertical" : "none", d(e)
		}

		function d(e) {
			"all" !== t.direction && "horizontal" !== t.direction || e.stopPropagation()
		}

		return () => {
			const n = {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"};
			return Kr(yf, {
				style: n,
				onTouchstart: su(c),
				onTouchmove: su(d),
				onTouchend: su(u)
			}, {
				default: () => [Kr(Of, {
					style: n,
					direction: t.direction,
					inertia: !0,
					scale: !0,
					"scale-min": "1",
					"scale-max": "4",
					onScale: s
				}, {
					default: () => [Kr("img", {
						src: e.src,
						style: {
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							maxHeight: "100%",
							maxWidth: "100%"
						},
						onLoad: l
					}, null, 40, ["src", "onLoad"])]
				}, 8, ["style", "direction", "inertia", "scale", "onScale"])]
			}, 8, ["style", "onTouchstart", "onTouchmove", "onTouchend"])
		}
	}
});

function ug(e) {
	let t = "number" == typeof e.current ? e.current : e.urls.indexOf(e.current);
	return t = t < 0 ? 0 : t, t
}

const dg = ou({
	name: "ImagePreview",
	props: {urls: {type: Array, default: () => []}, current: {type: [Number, String], default: 0}},
	emits: ["close"],
	setup(e, {emit: t}) {
		Io((() => lg(!0))), Ro((() => lg(!1)));
		const n = nn(null), o = nn(ug(e));
		let r;

		function i() {
			r || kn((() => {
				t("close")
			}))
		}

		function a(e) {
			o.value = e.detail.current
		}

		Gn((() => e.current), (() => o.value = ug(e))), Io((() => {
			const e = n.value;
			let t = 0, o = 0;
			e.addEventListener("mousedown", (e => {
				r = !1, t = e.clientX, o = e.clientY
			})), e.addEventListener("mouseup", (e => {
				(Math.abs(e.clientX - t) > 20 || Math.abs(e.clientY - o) > 20) && (r = !0)
			}))
		}));
		const s = {
			position: "absolute",
			"box-sizing": "border-box",
			top: "0",
			right: "0",
			width: "60px",
			height: "44px",
			padding: "6px",
			"line-height": "32px",
			"font-size": "26px",
			color: "white",
			"text-align": "center",
			cursor: "pointer"
		};
		return () => {
			let t;
			return Kr("div", {
				ref: n,
				style: {
					display: "block",
					position: "fixed",
					left: "0",
					top: "0",
					width: "100%",
					height: "100%",
					zIndex: 999,
					background: "rgba(0,0,0,0.8)"
				},
				onClick: i
			}, [Kr(ah, {
				navigation: "auto",
				current: o.value,
				onChange: a,
				"indicator-dots": !1,
				autoplay: !1,
				style: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"}
			}, (r = t = e.urls.map((e => Kr(lh, null, {default: () => [Kr(cg, {src: e}, null, 8, ["src"])]}))), "function" == typeof r || "[object Object]" === Object.prototype.toString.call(r) && !Qr(r) ? t : {
				default: () => [t],
				_: 1
			}), 8, ["current", "onChange"]), Kr("div", {style: s}, [hc("M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z", "#ffffff", 26)], 4)], 8, ["onClick"]);
			var r
		}
	}
});
let pg, fg = null;
const hg = () => {
	fg = null, kn((() => {
		null == pg || pg.unmount(), pg = null
	}))
}, mg = ld("previewImage", ((e, {resolve: t}) => {
	fg ? S(fg, e) : (fg = qt(e), kn((() => {
		pg = og(dg, fg, hg), pg.mount(rg("u-a-p"))
	}))), t()
}), 0, tp);
let gg = null;
const vg = ld("chooseVideo", (({sourceType: e, extension: t}, {resolve: n, reject: o}) => {
		kl();
		const {t: r} = wl();
		gg && (document.body.removeChild(gg), gg = null), gg = Jm({
			sourceType: e,
			extension: t,
			type: "video"
		}), document.body.appendChild(gg), gg.addEventListener("change", (function (e) {
			const t = e.target.files[0];
			let o = "";
			const r = {tempFilePath: o, tempFile: t, size: t.size, duration: 0, width: 0, height: 0, name: t.name};
			Object.defineProperty(r, "tempFilePath", {
				get() {
					return o = o || Ap(this.tempFile), o
				}
			});
			const i = document.createElement("video");
			if (void 0 !== i.onloadedmetadata) {
				const e = Ap(t);
				i.onloadedmetadata = function () {
					Cp(e), n(S(r, {duration: i.duration || 0, width: i.videoWidth || 0, height: i.videoHeight || 0}))
				}, setTimeout((() => {
					i.onloadedmetadata = null, Cp(e), n(r)
				}), 300), i.src = e
			} else n(r)
		})), gg.click(), nf() || console.warn(r("uni.chooseFile.notUserActivation"))
	}), 0, Kd),
	bg = ad("request", (({url: e, data: t, header: n, method: o, dataType: r, responseType: i, withCredentials: a, timeout: s = __uniConfig.networkTimeout.request}, {resolve: l, reject: c}) => {
		let u = null;
		const d = function (e) {
			const t = Object.keys(e).find((e => "content-type" === e.toLowerCase()));
			if (!t) return;
			const n = e[t];
			if (0 === n.indexOf("application/json")) return "json";
			if (0 === n.indexOf("application/x-www-form-urlencoded")) return "urlencoded";
			return "string"
		}(n);
		if ("GET" !== o) if (I(t) || t instanceof ArrayBuffer) u = t; else if ("json" === d) try {
			u = JSON.stringify(t)
		} catch (m) {
			u = t.toString()
		} else if ("urlencoded" === d) {
			const e = [];
			for (const n in t) A(t, n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
			u = e.join("&")
		} else u = t.toString();
		const p = new XMLHttpRequest, f = new yg(p);
		p.open(o, e);
		for (const g in n) A(n, g) && p.setRequestHeader(g, n[g]);
		const h = setTimeout((function () {
			p.onload = p.onabort = p.onerror = null, f.abort(), c("timeout")
		}), s);
		return p.responseType = i, p.onload = function () {
			clearTimeout(h);
			const e = p.status;
			let t = "text" === i ? p.responseText : p.response;
			if ("text" === i && "json" === r) try {
				t = JSON.parse(t)
			} catch (m) {
			}
			l({data: t, statusCode: e, header: _g(p.getAllResponseHeaders()), cookies: []})
		}, p.onabort = function () {
			clearTimeout(h), c("abort")
		}, p.onerror = function () {
			clearTimeout(h), c()
		}, p.withCredentials = a, p.send(u), f
	}), 0, ip);

class yg {
	constructor(e) {
		this._xhr = e
	}

	abort() {
		this._xhr && (this._xhr.abort(), delete this._xhr)
	}

	onHeadersReceived(e) {
		throw new Error("Method not implemented.")
	}

	offHeadersReceived(e) {
		throw new Error("Method not implemented.")
	}
}

function _g(e) {
	const t = {};
	return e.split("\n").forEach((e => {
		const n = e.match(/(\S+\s*):\s*(.*)/);
		n && 3 === n.length && (t[n[1]] = n[2])
	})), t
}

class wg {
	constructor(e) {
		this._callbacks = [], this._xhr = e
	}

	onProgressUpdate(e) {
		O(e) && this._callbacks.push(e)
	}

	offProgressUpdate(e) {
		const t = this._callbacks.indexOf(e);
		t >= 0 && this._callbacks.splice(t, 1)
	}

	abort() {
		this._xhr && (this._xhr.abort(), delete this._xhr)
	}

	onHeadersReceived(e) {
		throw new Error("Method not implemented.")
	}

	offHeadersReceived(e) {
		throw new Error("Method not implemented.")
	}
}

const xg = ad("downloadFile", (({url: e, header: t, timeout: n = __uniConfig.networkTimeout.downloadFile}, {resolve: o, reject: r}) => {
	var i, a = new XMLHttpRequest, s = new wg(a);
	return a.open("GET", e, !0), Object.keys(t).forEach((e => {
		a.setRequestHeader(e, t[e])
	})), a.responseType = "blob", a.onload = function () {
		clearTimeout(i);
		const t = a.status, n = this.response;
		let r;
		const s = a.getResponseHeader("content-disposition");
		if (s) {
			const e = s.match(/filename="?(\S+)"?\b/);
			e && (r = e[1])
		}
		n.name = r || function (e) {
			const t = (e = e.split("#")[0].split("?")[0]).split("/");
			return t[t.length - 1]
		}(e), o({statusCode: t, tempFilePath: Ap(n)})
	}, a.onabort = function () {
		clearTimeout(i), r("abort")
	}, a.onerror = function () {
		clearTimeout(i), r()
	}, a.onprogress = function (e) {
		s._callbacks.forEach((t => {
			var n = e.loaded, o = e.total;
			t({progress: Math.round(n / o * 100), totalBytesWritten: n, totalBytesExpectedToWrite: o})
		}))
	}, a.send(), i = setTimeout((function () {
		a.onprogress = a.onload = a.onabort = a.onerror = null, s.abort(), r("timeout")
	}), n), s
}), 0, ap);

class Tg {
	constructor(e) {
		this._callbacks = [], this._xhr = e
	}

	onProgressUpdate(e) {
		O(e) && this._callbacks.push(e)
	}

	offProgressUpdate(e) {
		const t = this._callbacks.indexOf(e);
		t >= 0 && this._callbacks.splice(t, 1)
	}

	abort() {
		this._isAbort = !0, this._xhr && (this._xhr.abort(), delete this._xhr)
	}

	onHeadersReceived(e) {
		throw new Error("Method not implemented.")
	}

	offHeadersReceived(e) {
		throw new Error("Method not implemented.")
	}
}

const Sg = ad("uploadFile", (({url: e, file: t, filePath: n, name: o, files: r, header: i, formData: a, timeout: s = __uniConfig.networkTimeout.uploadFile}, {resolve: l, reject: c}) => {
	var u = new Tg;
	return C(r) && r.length || (r = [{
		name: o,
		file: t,
		uri: n
	}]), Promise.all(r.map((({file: e, uri: t}) => e instanceof Blob ? Promise.resolve(kp(e)) : Ep(t)))).then((function (t) {
		var n, o = new XMLHttpRequest, d = new FormData;
		Object.keys(a).forEach((e => {
			d.append(e, a[e])
		})), Object.values(r).forEach((({name: e}, n) => {
			const o = t[n];
			d.append(e || "file", o, o.name || `file-${Date.now()}`)
		})), o.open("POST", e), Object.keys(i).forEach((e => {
			o.setRequestHeader(e, i[e])
		})), o.upload.onprogress = function (e) {
			u._callbacks.forEach((t => {
				var n = e.loaded, o = e.total;
				t({progress: Math.round(n / o * 100), totalBytesSent: n, totalBytesExpectedToSend: o})
			}))
		}, o.onerror = function () {
			clearTimeout(n), c()
		}, o.onabort = function () {
			clearTimeout(n), c("abort")
		}, o.onload = function () {
			clearTimeout(n);
			const e = o.status;
			l({statusCode: e, data: o.responseText || o.response})
		}, u._isAbort ? c("abort") : (n = setTimeout((function () {
			o.upload.onprogress = o.onload = o.onabort = o.onerror = null, u.abort(), c("timeout")
		}), s), o.send(d), u._xhr = o)
	})).catch((() => {
		setTimeout((() => {
			c("file error")
		}), 0)
	})), u
}), 0, sp), Eg = ld("navigateBack", ((e, {resolve: t, reject: n}) => {
	let o = !0;
	return !0 === Tc("onBackPress", {from: e.from || "navigateBack"}) && (o = !1), o ? (dm().$router.go(-e.delta), t()) : n("onBackPress")
}), 0, fp);

function kg({type: e, url: t, tabBarText: n, events: o}, r) {
	const i = dm().$router, {path: a, query: s} = function (e) {
		const [t, n] = e.split("?", 2);
		return {path: t, query: we(n || "")}
	}(t);
	return new Promise(((t, l) => {
		const c = function (e, t) {
			return {__id__: t || ++Vh, __type__: e}
		}(e, r);
		i["navigateTo" === e ? "push" : "replace"]({path: a, query: s, state: c, force: !0}).then((r => {
			if (gs(r)) return l(r.message);
			if ("switchTab" === e && (i.currentRoute.value.meta.tabBarText = n), "navigateTo" === e) {
				const e = i.currentRoute.value.meta;
				return e.eventChannel ? o && (Object.keys(o).forEach((t => {
					e.eventChannel._addListener(t, "on", o[t])
				})), e.eventChannel._clearCache()) : e.eventChannel = new Te(c.__id__, o), t({eventChannel: e.eventChannel})
			}
			return t()
		}))
	}))
}

const Ag = ld("navigateTo", (({url: e, events: t}, {resolve: n, reject: o}) => kg({
	type: "navigateTo",
	url: e,
	events: t
}).then(n).catch(o)), 0, cp);
const Cg = ld("redirectTo", (({url: e}, {resolve: t, reject: n}) => (function () {
	const e = vc();
	if (!e) return;
	const t = e.$page;
	qh(Qh(t.path, t.id))
}(), kg({type: "redirectTo", url: e}).then(t).catch(n))), 0, up);
const Bg = ld("reLaunch", (({url: e}, {resolve: t, reject: n}) => (function () {
	const e = zh().keys();
	for (const t of e) qh(t)
}(), kg({type: "reLaunch", url: e}).then(t).catch(n))), 0, dp);

function Pg(e, t) {
	return e === t.fullPath || "/" === e && t.meta.isEntry
}

const Lg = ld("switchTab", (({url: e, tabBarText: t}, {resolve: n, reject: o}) => (function () {
	const e = _c();
	if (!e) return;
	const t = zh(), n = t.keys();
	for (const o of n) {
		const e = t.get(o);
		e.$.__isTabBar ? e.$.__isActive = !1 : qh(o)
	}
	e.$.__isTabBar && (e.$.__isVisible = !1, Tc(e, "onHide"))
}(), kg({type: "switchTab", url: e, tabBarText: t}, function (e) {
	const t = zh().values();
	for (const n of t) {
		const t = n.$page;
		if (Pg(e, t)) return n.$.__isActive = !0, t.id
	}
}(e)).then(n).catch(o))), 0, pp);

function Og(e) {
	__uniConfig.darkmode && fv.on("onThemeChange", e)
}

function Ig(e) {
	let t = {};
	return __uniConfig.darkmode && (t = Oe(e, __uniConfig.themeConfig, Lm())), __uniConfig.darkmode ? t : e
}

const Mg = {
	title: {type: String, default: ""},
	icon: {default: "success", validator: e => -1 !== _p.indexOf(e)},
	image: {type: String, default: ""},
	duration: {type: Number, default: 1500},
	mask: {type: Boolean, default: !1},
	visible: {type: Boolean}
}, Fg = {light: "#fff", dark: "rgba(255,255,255,0.9)"}, jg = e => Fg[e], Rg = po({
	name: "Toast", props: Mg, setup(e) {
		Sl(), El();
		const {Icon: t} = function (e) {
			const t = nn(jg(Lm())), n = ({theme: e}) => t.value = jg(e);
			Yn((() => {
				var t;
				e.visible ? Og(n) : (t = n, fv.off("onThemeChange", t))
			}));
			return {
				Icon: yi((() => {
					switch (e.icon) {
						case"success":
							return Kr(hc(dc, t.value, 38), {class: "uni-toast__icon"});
						case"error":
							return Kr(hc(pc, t.value, 38), {class: "uni-toast__icon"});
						case"loading":
							return Kr("i", {class: ["uni-toast__icon", "uni-loading"]}, null, 2);
						default:
							return null
					}
				}))
			}
		}(e), n = ig(e, {});
		return () => {
			const {mask: o, duration: r, title: i, image: a} = e;
			return Kr(Xi, {name: "uni-fade"}, {
				default: () => [qo(Kr("uni-toast", {"data-duration": r}, [o ? Kr("div", {
					class: "uni-mask",
					style: "background: transparent;",
					onTouchmove: nc
				}, null, 40, ["onTouchmove"]) : "", a || t.value ? Kr("div", {class: "uni-toast"}, [a ? Kr("img", {
					src: a,
					class: "uni-toast__icon"
				}, null, 10, ["src"]) : t.value, Kr("p", {class: "uni-toast__content"}, [i])]) : Kr("div", {class: "uni-sample-toast"}, [Kr("p", {class: "uni-simple-toast__text"}, [i])])], 8, ["data-duration"]), [[xa, n.value]])]
			})
		}
	}
});
let Ng, Dg, zg = "";
const Hg = Fe();

function qg(e) {
	Ng ? S(Ng, e) : (Ng = qt(S(e, {visible: !1})), kn((() => {
		Hg.run((() => {
			Gn([() => Ng.visible, () => Ng.duration], (([e, t]) => {
				if (e) {
					if (Dg && clearTimeout(Dg), "onShowLoading" === zg) return;
					Dg = setTimeout((() => {
						Wg("onHideToast")
					}), t)
				} else Dg && clearTimeout(Dg)
			}))
		})), fv.on("onHidePopup", (() => Wg("onHidePopup"))), og(Rg, Ng, (() => {
		})).mount(rg("u-a-t"))
	}))), setTimeout((() => {
		Ng.visible = !0
	}), 10)
}

const Vg = ld("showToast", ((e, {resolve: t, reject: n}) => {
	qg(e), zg = "onShowToast", t()
}), 0, wp);

function Wg(e) {
	const {t: t} = wl();
	if (!zg) return;
	let n = "";
	if ("onHideToast" === e && "onShowToast" !== zg ? n = t("uni.showToast.unpaired") : "onHideLoading" === e && "onShowLoading" !== zg && (n = t("uni.showLoading.unpaired")), n) return console.warn(n);
	zg = "", setTimeout((() => {
		Ng.visible = !1
	}), 10)
}

const $g = ld("loadFontFace", (({family: e, source: t, desc: n}, {resolve: o, reject: r}) => {
	(function (e, t, n) {
		const o = document.fonts;
		if (o) {
			const r = new FontFace(e, t, n);
			return r.load().then((() => {
				o.add && o.add(r)
			}))
		}
		return new Promise((o => {
			const r = document.createElement("style"), i = [];
			if (n) {
				const {style: e, weight: t, stretch: o, unicodeRange: r, variant: a, featureSettings: s} = n;
				e && i.push(`font-style:${e}`), t && i.push(`font-weight:${t}`), o && i.push(`font-stretch:${o}`), r && i.push(`unicode-range:${r}`), a && i.push(`font-variant:${a}`), s && i.push(`font-feature-settings:${s}`)
			}
			r.innerText = `@font-face{font-family:"${e}";src:${t};${i.join(";")}}`, document.head.appendChild(r), o()
		}))
	})(e, t, n).then((() => {
		o()
	})).catch((e => {
		r(`loadFontFace:fail ${e}`)
	}))
}));

function Qg(e) {
	function t() {
		var t;
		t = e.navigationBar.titleText, document.title = t, fv.emit("onNavigationBarChange", {titleText: t})
	}

	Yn(t), wo(t)
}

const Ug = ld("setNavigationBarTitle", ((e, {resolve: t, reject: n}) => {
		!function (e, t, n, o, r) {
			if (!e) return r("page not found");
			const {navigationBar: i} = e;
			switch (t) {
				case"setNavigationBarColor":
					const {frontColor: e, backgroundColor: t, animation: o} = n, {duration: r, timingFunc: a} = o;
					e && (i.titleColor = "#000000" === e ? "#000000" : "#ffffff"), t && (i.backgroundColor = t), i.duration = r + "ms", i.timingFunc = a;
					break;
				case"showNavigationBarLoading":
					i.loading = !0;
					break;
				case"hideNavigationBarLoading":
					i.loading = !1;
					break;
				case"setNavigationBarTitle":
					const {title: s} = n;
					i.titleText = s
			}
			o()
		}(bc(), "setNavigationBarTitle", e, t, n)
	})), Xg = ld("pageScrollTo", (({scrollTop: e, selector: t, duration: n}, {resolve: o}) => {
		!function (e, t, n) {
			if (I(e)) {
				const t = document.querySelector(e);
				if (t) {
					const {height: o, top: r} = t.getBoundingClientRect();
					e = r + window.pageYOffset, n && (e -= o)
				}
			}
			e < 0 && (e = 0);
			const o = document.documentElement, {clientHeight: r, scrollHeight: i} = o;
			if (e = Math.min(e, i - r), 0 === t) return void (o.scrollTop = document.body.scrollTop = e);
			if (window.scrollY === e) return;
			const a = t => {
				if (t <= 0) return void window.scrollTo(0, e);
				const n = e - window.scrollY;
				requestAnimationFrame((function () {
					window.scrollTo(0, window.scrollY + n / t * 10), a(t - 10)
				}))
			};
			a(t)
		}(t || e || 0, n, !0), o()
	}), 0, yp), Yg = ld("startPullDownRefresh", ((e, {resolve: t}) => {
		fv.invokeViewMethod("startPullDownRefresh", {}, yc()), t()
	})), Jg = ld("stopPullDownRefresh", ((e, {resolve: t}) => {
		fv.invokeViewMethod("stopPullDownRefresh", {}, yc()), t()
	})), Gg = ["text", "iconPath", "iconfont", "selectedIconPath", "visible"],
	Kg = ["color", "selectedColor", "backgroundColor", "borderStyle", "midButton"], Zg = ["badge", "redDot"];

function ev(e, t, n) {
	t.forEach((function (t) {
		A(n, t) && (e[t] = n[t])
	}))
}

function tv(e, t, n) {
	const o = Lh();
	switch (e) {
		case"showTabBar":
			o.shown = !0;
			break;
		case"hideTabBar":
			o.shown = !1;
			break;
		case"setTabBarItem":
			const {index: e} = t, n = o.list[e], r = n.pagePath;
			ev(n, Gg, t);
			const {pagePath: i} = t;
			if (i) {
				const t = le(i);
				t !== r && function (e, t, n) {
					const o = Bc(le(t));
					if (o) {
						const {meta: e} = o;
						delete e.tabBarIndex, e.isQuit = e.isTabBar = !1
					}
					const r = Bc(le(n));
					if (r) {
						const {meta: t} = r;
						t.tabBarIndex = e, t.isQuit = t.isTabBar = !0;
						const o = __uniConfig.tabBar;
						o && o.list && o.list[e] && (o.list[e].pagePath = ce(n))
					}
				}(e, r, t)
			}
			break;
		case"setTabBarStyle":
			ev(o, Kg, t);
			break;
		case"showTabBarRedDot":
			ev(o.list[t.index], Zg, {badge: "", redDot: !0});
			break;
		case"setTabBarBadge":
			ev(o.list[t.index], Zg, {badge: t.text, redDot: !0});
			break;
		case"hideTabBarRedDot":
		case"removeTabBarBadge":
			ev(o.list[t.index], Zg, {badge: "", redDot: !1})
	}
	n()
}

const nv = ld("hideTabBar", ((e, {resolve: t}) => {
	tv("hideTabBar", e || {}, t)
})), ov = ou({
	name: "TabBar", setup() {
		const e = nn([]), t = Lh(), n = qt(Ig(t));
		!function (e, t) {
			function n() {
				let n = [];
				n = e.list.filter((e => !1 !== e.visible)), t.value = n
			}

			nn(S({type: "midButton"}, e.midButton)), Yn(n)
		}(n, e), function (e) {
			Gn((() => e.shown), (t => {
				sc({"--window-bottom": Nh(t ? parseInt(e.height) : 0)})
			}))
		}(n);
		const o = function (e, t, n) {
			return Yn((() => {
				const o = e.meta;
				if (o.isTabBar) {
					const e = o.route, r = n.value.findIndex((t => t.pagePath === e));
					t.selectedIndex = r
				}
			})), (t, n) => () => {
				const {pagePath: o, text: r} = t;
				let i = le(o);
				i === __uniRoutes[0].alias && (i = "/"), e.path !== i ? Lg({
					from: "tabBar",
					url: i,
					tabBarText: r
				}) : Tc("onTabItemTap", {index: n, text: r, pagePath: o})
			}
		}(ml(), n, e), {style: r, borderStyle: i, placeholderStyle: a} = function (e) {
			const t = yi((() => {
				let t = e.backgroundColor;
				const n = e.blurEffect;
				return t || jh && n && "none" !== n && (t = rv[n]), {
					backgroundColor: t || "#f7f7fa",
					backdropFilter: "none" !== n ? "blur(10px)" : n
				}
			})), n = yi((() => {
				const {borderStyle: t} = e;
				return {backgroundColor: iv[t] || t}
			})), o = yi((() => ({height: e.height})));
			return {style: t, borderStyle: n, placeholderStyle: o}
		}(n);
		return Og((() => {
			const e = Ig(t);
			n.backgroundColor = e.backgroundColor, n.borderStyle = e.borderStyle, n.color = e.color, n.selectedColor = e.selectedColor, n.blurEffect = e.blurEffect, e.list && e.list.length && e.list.forEach(((e, t) => {
				n.list[t].iconPath = e.iconPath, n.list[t].selectedIconPath = e.selectedIconPath
			}))
		})), Io((() => {
			n.iconfontSrc && $g({family: "UniTabbarIconFont", source: `url("${n.iconfontSrc}")`})
		})), () => {
			const t = function (e, t, n) {
				const {selectedIndex: o, selectedColor: r, color: i} = e;
				return n.value.map(((n, a) => {
					const s = o === a;
					return function (e, t, n, o, r, i, a, s) {
						return Kr("div", {
							key: a,
							class: "uni-tabbar__item",
							onClick: s(r, a)
						}, [av(e, t || "", n, o, r, i)], 8, ["onClick"])
					}(s ? r : i, s && n.selectedIconPath || n.iconPath || "", n.iconfont ? s && n.iconfont.selectedText || n.iconfont.text : void 0, n.iconfont ? s && n.iconfont.selectedColor || n.iconfont.color : void 0, n, e, a, t)
				}))
			}(n, o, e);
			return Kr("uni-tabbar", {class: "uni-tabbar-" + n.position}, [Kr("div", {
				class: "uni-tabbar",
				style: r.value
			}, [Kr("div", {
				class: "uni-tabbar-border",
				style: i.value
			}, null, 4), t], 4), Kr("div", {class: "uni-placeholder", style: a.value}, null, 4)], 2)
		}
	}
});
const rv = {dark: "rgb(0, 0, 0, 0.8)", light: "rgb(250, 250, 250, 0.8)", extralight: "rgb(250, 250, 250, 0.8)"},
	iv = {white: "rgba(255, 255, 255, 0.33)", black: "rgba(0, 0, 0, 0.33)"};

function av(e, t, n, o, r, i) {
	const {height: a} = i;
	return Kr("div", {
		class: "uni-tabbar__bd",
		style: {height: a}
	}, [n ? lv(n, o || "rgb(0, 0, 0, 0.8)", r, i) : t && sv(t, r, i), r.text && cv(e, r, i), r.redDot && uv(r.badge)], 4)
}

function sv(e, t, n) {
	const {type: o, text: r} = t, {iconWidth: i} = n;
	return Kr("div", {
		class: "uni-tabbar__icon" + (r ? " uni-tabbar__icon__diff" : ""),
		style: {width: i, height: i}
	}, ["midButton" !== o && Kr("img", {src: gu(e)}, null, 8, ["src"])], 6)
}

function lv(e, t, n, o) {
	var r;
	const {type: i, text: a} = n, {iconWidth: s} = o, l = "uni-tabbar__icon" + (a ? " uni-tabbar__icon__diff" : ""),
		c = {width: s, height: s}, u = {fontSize: (null == (r = n.iconfont) ? void 0 : r.fontSize) || s, color: t};
	return Kr("div", {class: l, style: c}, ["midButton" !== i && Kr("div", {
		class: "uni-tabbar__iconfont",
		style: u
	}, [e], 4)], 6)
}

function cv(e, t, n) {
	const {iconPath: o, text: r} = t, {fontSize: i, spacing: a} = n;
	return Kr("div", {
		class: "uni-tabbar__label",
		style: {color: e, fontSize: i, lineHeight: o ? "normal" : 1.8, marginTop: o ? a : "inherit"}
	}, [r], 4)
}

function uv(e) {
	return Kr("div", {class: "uni-tabbar__reddot" + (e ? " uni-tabbar__badge" : "")}, [e], 2)
}

const dv = ou({
	name: "Layout", setup(e, {emit: t}) {
		const n = nn(null);
		ac({
			"--status-bar-height": "0px",
			"--top-window-height": "0px",
			"--window-left": "0px",
			"--window-right": "0px",
			"--window-margin": "0px",
			"--tab-bar-height": "0px"
		});
		const o = function () {
			const e = ml();
			return {
				routeKey: yi((() => Qh("/" + e.meta.route, Bh()))),
				isTabBar: yi((() => e.meta.isTabBar)),
				routeCache: Xh
			}
		}(), {layoutState: r, windowState: i} = function () {
			Ch();
			{
				const e = qt({marginWidth: 0, leftWindowWidth: 0, rightWindowWidth: 0});
				return Gn((() => e.marginWidth), (e => ac({"--window-margin": e + "px"}))), Gn((() => e.leftWindowWidth + e.marginWidth), (e => {
					ac({"--window-left": e + "px"})
				})), Gn((() => e.rightWindowWidth + e.marginWidth), (e => {
					ac({"--window-right": e + "px"})
				})), {layoutState: e, windowState: yi((() => ({})))}
			}
		}();
		!function (e, t) {
			const n = Ch();

			function o() {
				const o = document.body.clientWidth, r = Hh();
				let i = {};
				if (r.length > 0) {
					i = r[r.length - 1].$page.meta
				} else {
					const e = Bc(n.path, !0);
					e && (i = e.meta)
				}
				const a = parseInt(String((A(i, "maxWidth") ? i.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER));
				let s = !1;
				s = o > a, s && a ? (e.marginWidth = (o - a) / 2, kn((() => {
					const e = t.value;
					e && e.setAttribute("style", "max-width:" + a + "px;margin:0 auto;")
				}))) : (e.marginWidth = 0, kn((() => {
					const e = t.value;
					e && e.removeAttribute("style")
				})))
			}

			Gn([() => n.path], o), Io((() => {
				o(), window.addEventListener("resize", o)
			}))
		}(r, n);
		const a = function (e) {
			const t = Ch(), n = Lh(), o = yi((() => t.meta.isTabBar && n.shown));
			return ac({"--tab-bar-height": n.height}), o
		}(), s = function (e) {
			const t = nn(!1);
			return yi((() => ({"uni-app--showtabbar": e && e.value, "uni-app--maxwidth": t.value})))
		}(a);
		return () => {
			const e = function (e, t, n, o, r, i) {
				return function ({routeKey: e, isTabBar: t, routeCache: n}) {
					return Kr(pl, null, {
						default: Hn((({Component: o}) => [(zr(), $r(yo, {
							matchBy: "key",
							cache: n
						}, [(zr(), $r(Qo(o), {type: t.value ? "tabBar" : "", key: e.value}))], 1032, ["cache"]))])),
						_: 1
					})
				}(e)
			}(o), t = function (e) {
				return qo(Kr(ov, null, null, 512), [[xa, e.value]])
			}(a);
			return Kr("uni-app", {ref: n, class: s.value}, [e, t], 2)
		}
	}
});
const pv = S(Fl, {
	publishHandler(e, t, n) {
		fv.subscribeHandler(e, t, n)
	}
}), fv = S(Vc, {
	publishHandler(e, t, n) {
		pv.subscribeHandler(e, t, n)
	}
}), hv = ou({
	name: "PageHead", setup() {
		const e = nn(null), t = kh(), n = qt(Ig(t.navigationBar)), {clazz: o, style: r} = function (e) {
			const t = yi((() => {
				const {type: t, titlePenetrate: n, shadowColorType: o} = e, r = {
					"uni-page-head": !0,
					"uni-page-head-transparent": "transparent" === t,
					"uni-page-head-titlePenetrate": "YES" === n,
					"uni-page-head-shadow": !!o
				};
				return o && (r[`uni-page-head-shadow-${o}`] = !0), r
			})), n = yi((() => ({
				backgroundColor: e.backgroundColor,
				color: e.titleColor,
				transitionDuration: e.duration,
				transitionTimingFunction: e.timingFunc
			})));
			return {clazz: t, style: n}
		}(n);
		return Og((() => {
			const e = Ig(t.navigationBar);
			n.backgroundColor = e.backgroundColor, n.titleColor = e.titleColor
		})), () => {
			const i = function (e, t) {
				if (!t) return Kr("div", {
					class: "uni-page-head-btn",
					onClick: gv
				}, [hc(fc, "transparent" === e.type ? "#fff" : e.titleColor, 27)], 8, ["onClick"])
			}(n, t.isQuit), a = n.type || "default", s = "transparent" !== a && "float" !== a && Kr("div", {
				class: {
					"uni-placeholder": !0,
					"uni-placeholder-titlePenetrate": n.titlePenetrate
				}
			}, null, 2);
			return Kr("uni-page-head", {"uni-page-head-type": a}, [Kr("div", {
				ref: e,
				class: o.value,
				style: r.value
			}, [Kr("div", {class: "uni-page-head-hd"}, [i]), mv(n), Kr("div", {class: "uni-page-head-ft"}, [])], 6), s], 8, ["uni-page-head-type"])
		}
	}
});

function mv(e, t) {
	return function ({type: e, loading: t, titleSize: n, titleText: o, titleImage: r}) {
		return Kr("div", {class: "uni-page-head-bd"}, [Kr("div", {
			style: {
				fontSize: n,
				opacity: "transparent" === e ? 0 : 1
			}, class: "uni-page-head__title"
		}, [t ? Kr("i", {class: "uni-loading"}, null) : r ? Kr("img", {
			src: r,
			class: "uni-page-head__title_image"
		}, null, 8, ["src"]) : o], 4)])
	}(e)
}

function gv() {
	1 === Hh().length ? Bg({url: "/"}) : Eg({
		from: "backbutton", success() {
		}
	})
}

const vv = {
		name: "PageRefresh", setup() {
			const {pullToRefresh: e} = kh();
			return {offset: e.offset, color: e.color}
		}
	}, bv = (e, t) => {
		const n = e.__vccOpts || e;
		for (const [o, r]of t) n[o] = r;
		return n
	}, yv = {class: "uni-page-refresh-inner"}, _v = ["fill"],
	wv = [Gr("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null, -1), Gr("path", {
		d: "M0 0h24v24H0z",
		fill: "none"
	}, null, -1)], xv = {class: "uni-page-refresh__spinner", width: "24", height: "24", viewBox: "25 25 50 50"},
	Tv = ["stroke"];
const Sv = bv(vv, [["render", function (e, t, n, o, r, a) {
	return zr(), Wr("uni-page-refresh", null, [Gr("div", {
		style: i({"margin-top": o.offset + "px"}),
		class: "uni-page-refresh"
	}, [Gr("div", yv, [(zr(), Wr("svg", {
		fill: o.color,
		class: "uni-page-refresh__icon",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24"
	}, wv, 8, _v)), (zr(), Wr("svg", xv, [Gr("circle", {
		stroke: o.color,
		class: "uni-page-refresh__path",
		cx: "50",
		cy: "50",
		r: "20",
		fill: "none",
		"stroke-width": "4",
		"stroke-miterlimit": "10"
	}, null, 8, Tv)]))])], 4)])
}]]);

function Ev(e, t, n) {
	const o = Array.prototype.slice.call(e.changedTouches).filter((e => e.identifier === t))[0];
	return !!o && (e.deltaY = o.pageY - n, !0)
}

const kv = "aborting", Av = "refreshing", Cv = "restoring";

function Bv(e) {
	const {id: t, pullToRefresh: n} = kh(), {range: o, height: r} = n;
	let i, a, s, l, c, u, d, p;
	gh((() => {
		p || (p = Av, g(), setTimeout((() => {
			w()
		}), 50))
	}), "startPullDownRefresh", !1, t), gh((() => {
		p === Av && (v(), p = Cv, g(), function (e) {
			if (!a) return;
			s.transition = "-webkit-transform 0.3s", s.transform += " scale(0.01)";
			const t = function () {
				n && clearTimeout(n), a.removeEventListener("webkitTransitionEnd", t), s.transition = "", s.transform = "translate3d(-50%, 0, 0)", e()
			};
			a.addEventListener("webkitTransitionEnd", t);
			const n = setTimeout(t, 350)
		}((() => {
			v(), p = f = h = null
		})))
	}), "stopPullDownRefresh", !1, t), Io((() => {
		i = e.value.$el, a = i.querySelector(".uni-page-refresh"), s = a.style, l = a.querySelector(".uni-page-refresh-inner").style
	}));
	let f = null, h = null;

	function m(e) {
		p && i && i.classList[e]("uni-page-refresh--" + p)
	}

	function g() {
		m("add")
	}

	function v() {
		m("remove")
	}

	const b = su((e => {
		const t = e.changedTouches[0];
		c = t.identifier, u = t.pageY, d = !([kv, Av, Cv].indexOf(p) >= 0)
	})), y = su((e => {
		if (!d) return;
		if (!Ev(e, c, u)) return;
		let {deltaY: t} = e;
		if (0 !== (document.documentElement.scrollTop || document.body.scrollTop)) return void (c = null);
		if (t < 0 && !p) return;
		e.preventDefault(), null === f && (h = t, p = "pulling", g()), t -= h, t < 0 && (t = 0), f = t;
		(t >= o && "reached" !== p || t < o && "pulling" !== p) && (v(), p = "reached" === p ? "pulling" : "reached", g()), function (e) {
			if (!a) return;
			let t = e / o;
			t > 1 ? t = 1 : t *= t * t;
			const n = Math.round(e / (o / r)) || 0;
			l.transform = "rotate(" + 360 * t + "deg)", s.clip = "rect(" + (45 - n) + "px,45px,45px,-5px)", s.transform = "translate3d(-50%, " + n + "px, 0)"
		}(t)
	})), _ = su((e => {
		Ev(e, c, u) && null !== p && ("pulling" === p ? (v(), p = kv, g(), function (e) {
			if (!a) return;
			if (s.transform) {
				s.transition = "-webkit-transform 0.3s", s.transform = "translate3d(-50%, 0, 0)";
				const t = function () {
					n && clearTimeout(n), a.removeEventListener("webkitTransitionEnd", t), s.transition = "", e()
				};
				a.addEventListener("webkitTransitionEnd", t);
				const n = setTimeout(t, 350)
			} else e()
		}((() => {
			v(), p = f = h = null
		}))) : "reached" === p && (v(), p = Av, g(), w()))
	}));

	function w() {
		a && (s.transition = "-webkit-transform 0.2s", s.transform = "translate3d(-50%, " + r + "px, 0)", Tc(t, "onPullDownRefresh"))
	}

	return {onTouchstartPassive: b, onTouchmove: y, onTouchend: _, onTouchcancel: _}
}

const Pv = ou({
	name: "PageBody", setup(e, t) {
		const n = kh(), o = nn(null), r = n.enablePullDownRefresh ? Bv(o) : null;
		return () => {
			const e = function (e, t) {
				if (!t.enablePullDownRefresh) return null;
				return Kr(Sv, {ref: e}, null, 512)
			}(o, n);
			return Kr(Mr, null, [e, Kr("uni-page-wrapper", r, [Kr("uni-page-body", null, [Jo(t.slots, "default")])], 16)])
		}
	}
});
const Lv = ou({
	name: "Page", setup(e, t) {
		const n = Ah(Bh()), o = n.navigationBar;
		return Qg(n), () => Kr("uni-page", {"data-page": n.route}, "custom" !== o.style ? [Kr(hv), Ov(t)] : [Ov(t)])
	}
});

function Ov(e) {
	return zr(), $r(Pv, {key: 0}, {default: Hn((() => [Jo(e.slots, "page")])), _: 3})
}

const Iv = {loading: "AsyncLoading", error: "AsyncError", delay: 200, timeout: 6e4, suspensible: !0};
window.uni = {}, window.wx = {}, window.rpx2px = vd;
const Mv = Object.assign({"./locale/en.json": n, "./locale/zh-Hans.json": o}), Fv = Object.assign;
const match = location.href.match(/\/wap\/(\d*)\//);
window.__uniConfig = Fv({
	globalStyle: {
		backgroundColor: "#F8F8F8",
		backgroundColorTop: "#F8F8F8",
		backgroundColorBottom: "#F8F8F8",
		navigationBar: {backgroundColor: "#ffffff", titleText: "", type: "default", titleColor: "#000000"},
		isNVue: !1
	},
	tabBar: {
		position: "bottom",
		color: "#999",
		selectedColor: "#007aff",
		borderStyle: "black",
		blurEffect: "none",
		fontSize: "10px",
		iconWidth: "24px",
		spacing: "3px",
		height: "50px",
		list: [{pagePath: "pages/index/index"}, {pagePath: "pages/article/list"}, {pagePath: "pages/member/index"}],
		selectedIndex: 0,
		shown: !0
	},
	uniIdRouter: {},
	easycom: {
		custom: {
			"^u-(.*)": "uview-plus/components/u-$1/u-$1.vue",
			"diy-(.*)": "@/components/diy/$1/index.vue",
			"fixed-(.*)": "@/components/fixed/$1/index.vue"
		}
	},
	compilerVersion: "3.8.7"
}, {
	appId: "__UNI__ED923AB",
	appName: "",
	appVersion: "1.0.0",
	appVersionCode: "100",
	async: Iv,
	debug: !1,
	networkTimeout: {request: 6e4, connectSocket: 6e4, uploadFile: 6e4, downloadFile: 6e4},
	sdkConfigs: {},
	qqMapKey: void 0,
	googleMapKey: void 0,
	aMapKey: void 0,
	aMapSecurityJsCode: void 0,
	aMapServiceHost: void 0,
	nvue: {"flex-direction": "column"},
	locale: "",
	fallbackLocale: "zh-Hans",
	locales: Object.keys(Mv).reduce(((e, t) => {
		const n = t.replace(/\.\/locale\/(uni-app.)?(.*).json/, "$2");
		return Fv(e[n] || (e[n] = {}), Mv[t].default), e
	}), {}),
	router: {mode: "history", base: match ? `/wap/${match[1]}/` : '/wap/', assets: "assets", routerBase: match ? `/wap/${match[1]}/` : '/wap/'},
	darkmode: !1,
	themeConfig: {}
}), window.__uniLayout = window.__uniLayout || {};
const jv = {delay: Iv.delay, timeout: Iv.timeout, suspensible: Iv.suspensible};
Iv.loading && (jv.loadingComponent = {
	name: "SystemAsyncLoading",
	render: () => Kr(Wo(Iv.loading))
}), Iv.error && (jv.errorComponent = {name: "SystemAsyncError", render: () => Kr(Wo(Iv.error))});
const Rv = () => t((() => import("./pages-index-index.9dccf8c4.js")), ["assets/pages-index-index.9dccf8c4.js", "assets/u-loading-page.925a187b.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/index.1798b78b.js", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/tabbar.e67e4875.js", "assets/u-image.b892f6c4.js", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-eb61cd51.css", "assets/article.0307362e.js", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-avatar.ddef1faa.js", "assets/u-avatar-0d8f8309.css", "assets/index-5beda9ca.css", "assets/useShare.3d08f2fc.js", "assets/wechat.56b0d350.js", "assets/index-8e8df8ed.css"]).then((e => mm(e.default || e))),
	Nv = ho(Fv({loader: Rv}, jv)),
	Dv = () => t((() => import("./pages-article-list.8dce3d3e.js")), ["assets/pages-article-list.8dce3d3e.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/tabbar.e67e4875.js", "assets/u-image.b892f6c4.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-eb61cd51.css", "assets/article.0307362e.js", "assets/useMescroll.fbb7af33.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.22c37416.js", "assets/mescroll-empty-40916e41.css", "assets/useShare.3d08f2fc.js", "assets/wechat.56b0d350.js", "assets/list-c9622c2a.css"]).then((e => mm(e.default || e))),
	zv = ho(Fv({loader: Dv}, jv)),
	Hv = () => t((() => import("./pages-auth-agreement.016f9147.js")), ["assets/pages-auth-agreement.016f9147.js", "assets/u-parse.403d1985.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-parse-9cce559f.css"]).then((e => mm(e.default || e))),
	qv = ho(Fv({loader: Hv}, jv)),
	Vv = () => t((() => import("./pages-auth-bind.c0b8d2eb.js")), ["assets/pages-auth-bind.c0b8d2eb.js", "assets/u-input.4212a359.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.84a1fd52.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.bcd0d968.js", "assets/u-modal.755a4b61.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-button.5c85e6cc.js", "assets/u-button-4e9253f5.css", "assets/bind-12c3cc42.css"]).then((e => mm(e.default || e))),
	Wv = ho(Fv({loader: Vv}, jv)),
	$v = () => t((() => import("./pages-auth-login.bfe761f1.js")), ["assets/pages-auth-login.bfe761f1.js", "assets/u-input.4212a359.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.84a1fd52.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.bcd0d968.js", "assets/u-modal.755a4b61.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-button.5c85e6cc.js", "assets/u-button-4e9253f5.css"]).then((e => mm(e.default || e))),
	Qv = ho(Fv({loader: $v}, jv)),
	Uv = () => t((() => import("./pages-auth-register.525a8a97.js")), ["assets/pages-auth-register.525a8a97.js", "assets/u-input.4212a359.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.84a1fd52.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.bcd0d968.js", "assets/u-modal.755a4b61.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-button.5c85e6cc.js", "assets/u-button-4e9253f5.css"]).then((e => mm(e.default || e))),
	Xv = ho(Fv({loader: Uv}, jv)),
	Yv = () => t((() => import("./pages-auth-resetpwd.2e039795.js")), ["assets/pages-auth-resetpwd.2e039795.js", "assets/u-input.4212a359.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.84a1fd52.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.bcd0d968.js", "assets/u-modal.755a4b61.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/u-button.5c85e6cc.js", "assets/u-button-4e9253f5.css"]).then((e => mm(e.default || e))),
	Jv = ho(Fv({loader: Yv}, jv)),
	Gv = () => t((() => import("./pages-index-diy.0d2bc949.js")), ["assets/pages-index-diy.0d2bc949.js", "assets/u-loading-page.925a187b.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/index.1798b78b.js", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/tabbar.e67e4875.js", "assets/u-image.b892f6c4.js", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-eb61cd51.css", "assets/article.0307362e.js", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-avatar.ddef1faa.js", "assets/u-avatar-0d8f8309.css", "assets/index-5beda9ca.css", "assets/useShare.3d08f2fc.js", "assets/wechat.56b0d350.js", "assets/diy-9a1c7fc3.css"]).then((e => mm(e.default || e))),
	Kv = ho(Fv({loader: Gv}, jv)),
	Zv = () => t((() => import("./pages-index-close.88941b42.js")), ["assets/pages-index-close.88941b42.js", "assets/u-empty.317e751c.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-empty-5067ac67.css"]).then((e => mm(e.default || e))),
	eb = ho(Fv({loader: Zv}, jv)),
	tb = () => t((() => import("./pages-index-nosite.d52e22d1.js")), ["assets/pages-index-nosite.d52e22d1.js", "assets/u-empty.317e751c.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-empty-5067ac67.css"]).then((e => mm(e.default || e))),
	nb = ho(Fv({loader: tb}, jv)),
	ob = () => t((() => import("./pages-article-detail.27a94da1.js")), ["assets/pages-article-detail.27a94da1.js", "assets/u-parse.403d1985.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-parse-9cce559f.css", "assets/u-loading-page.925a187b.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/article.0307362e.js", "assets/useShare.3d08f2fc.js", "assets/wechat.56b0d350.js"]).then((e => mm(e.default || e))),
	rb = ho(Fv({loader: ob}, jv)),
	ib = () => t((() => import("./pages-member-apply_cash_out.f6ab459d.js")), ["assets/pages-member-apply_cash_out.f6ab459d.js", "assets/u-button.5c85e6cc.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/u-loading-page.925a187b.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css"]).then((e => mm(e.default || e))),
	ab = ho(Fv({loader: ib}, jv)),
	sb = () => t((() => import("./pages-member-commission.2562b979.js")), ["assets/pages-member-commission.2562b979.js", "assets/u-button.5c85e6cc.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/commission-df4369d0.css"]).then((e => mm(e.default || e))),
	lb = ho(Fv({loader: sb}, jv)),
	cb = () => t((() => import("./pages-member-balance.c8e952bc.js")), ["assets/pages-member-balance.c8e952bc.js", "assets/u-loading-page.925a187b.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/u-button.5c85e6cc.js", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/u-input.4212a359.js", "assets/u-input-2dabccde.css", "assets/u-popup.8a491625.js", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-image.b892f6c4.js", "assets/u-image-f70fd559.css", "assets/pay.422381f0.js", "assets/wechat.56b0d350.js", "assets/balance-d8f1465a.css"]).then((e => mm(e.default || e))),
	ub = ho(Fv({loader: cb}, jv)),
	db = () => t((() => import("./pages-member-recharge_record.e42b3b23.js")), ["assets/pages-member-recharge_record.e42b3b23.js", "assets/useMescroll.fbb7af33.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.22c37416.js", "assets/mescroll-empty-40916e41.css", "assets/recharge_record-b6711670.css"]).then((e => mm(e.default || e))),
	pb = ho(Fv({loader: db}, jv)),
	fb = () => t((() => import("./pages-member-recharge_record_detail.b2e7f0df.js")), ["assets/pages-member-recharge_record_detail.b2e7f0df.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/recharge_record_detail-56202dd4.css"]).then((e => mm(e.default || e))),
	hb = ho(Fv({loader: fb}, jv)),
	mb = () => t((() => import("./pages-member-detailed_account.dfe0ec43.js")), ["assets/pages-member-detailed_account.dfe0ec43.js", "assets/useMescroll.fbb7af33.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.22c37416.js", "assets/mescroll-empty-40916e41.css", "assets/detailed_account-3b9b6750.css"]).then((e => mm(e.default || e))),
	gb = ho(Fv({loader: mb}, jv)),
	vb = () => t((() => import("./pages-member-cash_out.57f0f96a.js")), ["assets/pages-member-cash_out.57f0f96a.js", "assets/useMescroll.fbb7af33.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.22c37416.js", "assets/mescroll-empty-40916e41.css", "assets/cash_out-25dffb81.css"]).then((e => mm(e.default || e))),
	bb = ho(Fv({loader: vb}, jv)),
	yb = () => t((() => import("./pages-member-cash_out_detail.ccd37d79.js")), ["assets/pages-member-cash_out_detail.ccd37d79.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/cash_out_detail-a5b1b8f4.css"]).then((e => mm(e.default || e))),
	_b = ho(Fv({loader: yb}, jv)),
	wb = () => t((() => import("./pages-member-index.dbd4736b.js")), ["assets/pages-member-index.dbd4736b.js", "assets/u-loading-page.925a187b.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/index.1798b78b.js", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/tabbar.e67e4875.js", "assets/u-image.b892f6c4.js", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-eb61cd51.css", "assets/article.0307362e.js", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-avatar.ddef1faa.js", "assets/u-avatar-0d8f8309.css", "assets/index-5beda9ca.css", "assets/index-da921c04.css"]).then((e => mm(e.default || e))),
	xb = ho(Fv({loader: wb}, jv)),
	Tb = () => t((() => import("./pages-member-personal.66c2c720.js")), ["assets/pages-member-personal.66c2c720.js", "assets/u-avatar.ddef1faa.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-avatar-0d8f8309.css", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-action-sheet.1e4dbfee.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-action-sheet-e3392aa2.css", "assets/u-button.5c85e6cc.js", "assets/u-button-4e9253f5.css", "assets/app-link.vue_vue_type_script_setup_true_lang.18597de0.js", "assets/u-modal.755a4b61.js", "assets/u-modal-b7ee2981.css", "assets/personal-7d5bc078.css"]).then((e => mm(e.default || e))),
	Sb = ho(Fv({loader: Tb}, jv)),
	Eb = () => t((() => import("./pages-member-point.ff5872df.js")), ["assets/pages-member-point.ff5872df.js", "assets/useMescroll.fbb7af33.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.22c37416.js", "assets/mescroll-empty-40916e41.css"]).then((e => mm(e.default || e))),
	kb = ho(Fv({loader: Eb}, jv)),
	Ab = () => t((() => import("./pages-member-account.1645a99d.js")), ["assets/pages-member-account.1645a99d.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/useMescroll.fbb7af33.js", "assets/useMescroll-f0734f93.css"]).then((e => mm(e.default || e))),
	Cb = ho(Fv({loader: Ab}, jv)),
	Bb = () => t((() => import("./pages-member-account_edit.142797b5.js")), ["assets/pages-member-account_edit.142797b5.js", "assets/u-input.4212a359.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.84a1fd52.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/u-button.5c85e6cc.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-button-4e9253f5.css", "assets/u-modal.755a4b61.js", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css"]).then((e => mm(e.default || e))),
	Pb = ho(Fv({loader: Bb}, jv)),
	Lb = () => t((() => import("./pages-pay-browser.3e8e32cc.js")), []).then((e => mm(e.default || e))),
	Ob = ho(Fv({loader: Lb}, jv)),
	Ib = () => t((() => import("./pages-pay-result.8b15506e.js")), ["assets/pages-pay-result.8b15506e.js", "assets/u-button.5c85e6cc.js", "assets/u-loading-icon.ea8c9ece.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-icon.f5369555.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/u-modal.755a4b61.js", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/pay.422381f0.js"]).then((e => mm(e.default || e))),
	Mb = ho(Fv({loader: Ib}, jv)),
	Fb = () => t((() => import("./pages-setting-index.dc2bbfce.js")), ["assets/pages-setting-index.dc2bbfce.js", "assets/u-action-sheet.1e4dbfee.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-line.bb8d1497.js", "assets/u-line-90cc8525.css", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.8a491625.js", "assets/u-transition.a952a64b.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.593b5cec.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-action-sheet-e3392aa2.css", "assets/index-91a59a4a.css"]).then((e => mm(e.default || e))),
	jb = ho(Fv({loader: Fb}, jv)),
	Rb = () => t((() => import("./pages-webview-index.458b13bb.js")), ["assets/pages-webview-index.458b13bb.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/index-9ae05732.css"]).then((e => mm(e.default || e))),
	Nb = ho(Fv({loader: Rb}, jv)),
	Db = () => t((() => import("./pages-index-develop.31f84e01.js")), ["assets/pages-index-develop.31f84e01.js", "assets/u-input.4212a359.js", "assets/u-icon.f5369555.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-button.5c85e6cc.js", "assets/u-loading-icon.ea8c9ece.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-button-4e9253f5.css"]).then((e => mm(e.default || e))),
	zb = ho(Fv({loader: Db}, jv));

function Hb(e, t) {
	return zr(), $r(Lv, null, {page: Hn((() => [Kr(e, Fv({}, t, {ref: "page"}), null, 512)])), _: 1})
}

function qb(e, t) {
	return I(e) ? t : e
}

window.__uniRoutes = [{
	path: "/",
	alias: "/pages/index/index",
	component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Nv, t)
		}
	},
	loader: Rv,
	meta: {
		isQuit: !0,
		isEntry: !0,
		isTabBar: !0,
		tabBarIndex: 0,
		enablePullDownRefresh: !0,
		navigationBar: {titleText: "%pages.index.index%", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/article/list",
	component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(zv, t)
		}
	},
	loader: Dv,
	meta: {
		isQuit: !0,
		isTabBar: !0,
		tabBarIndex: 1,
		navigationBar: {titleText: "%pages.article.list%", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/auth/agreement", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(qv, t)
		}
	}, loader: Hv, meta: {navigationBar: {titleText: "%pages.auth.agreement%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/bind", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Wv, t)
		}
	}, loader: Vv, meta: {navigationBar: {titleText: "%pages.auth.bind%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/login", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Qv, t)
		}
	}, loader: $v, meta: {navigationBar: {titleText: "%pages.auth.login%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/register", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Xv, t)
		}
	}, loader: Uv, meta: {navigationBar: {titleText: "%pages.auth.register%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/resetpwd", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Jv, t)
		}
	}, loader: Yv, meta: {navigationBar: {titleText: "%pages.auth.resetpwd%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/diy",
	component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Kv, t)
		}
	},
	loader: Gv,
	meta: {enablePullDownRefresh: !0, navigationBar: {titleText: "%pages.index.diy%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/close", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(eb, t)
		}
	}, loader: Zv, meta: {navigationBar: {titleText: "%pages.index.close%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/nosite", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(nb, t)
		}
	}, loader: tb, meta: {navigationBar: {titleText: "%pages.index.nosite%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/article/detail", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(rb, t)
		}
	}, loader: ob, meta: {navigationBar: {titleText: "%pages.article.detail%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/apply_cash_out", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(ab, t)
		}
	}, loader: ib, meta: {navigationBar: {titleText: "%pages.member.apply_cash_out%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/commission", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(lb, t)
		}
	}, loader: sb, meta: {navigationBar: {titleText: "%pages.member.commission%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/balance", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(ub, t)
		}
	}, loader: cb, meta: {navigationBar: {titleText: "%pages.member.balance%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/recharge_record", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(pb, t)
		}
	}, loader: db, meta: {navigationBar: {titleText: "%pages.member.recharge_record%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/recharge_record_detail",
	component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(hb, t)
		}
	},
	loader: fb,
	meta: {navigationBar: {titleText: "%pages.member.recharge_record_detail%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/detailed_account", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(gb, t)
		}
	}, loader: mb, meta: {navigationBar: {titleText: "%pages.member.detailed_account%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/cash_out", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(bb, t)
		}
	}, loader: vb, meta: {navigationBar: {titleText: "%pages.member.cash_out%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/cash_out_detail", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(_b, t)
		}
	}, loader: yb, meta: {navigationBar: {titleText: "%pages.member.cash_out_detail%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/index",
	component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(xb, t)
		}
	},
	loader: wb,
	meta: {
		isQuit: !0,
		isTabBar: !0,
		tabBarIndex: 2,
		enablePullDownRefresh: !0,
		navigationBar: {titleText: "%pages.member.index%", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/member/personal", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Sb, t)
		}
	}, loader: Tb, meta: {navigationBar: {titleText: "%pages.member.personal%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/point", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(kb, t)
		}
	}, loader: Eb, meta: {navigationBar: {titleText: "%pages.member.point%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/account", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Cb, t)
		}
	}, loader: Ab, meta: {navigationBar: {titleText: "%pages.member.account%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/account_edit", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Pb, t)
		}
	}, loader: Bb, meta: {navigationBar: {titleText: "%pages.member.account_edit%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/pay/browser", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Ob, t)
		}
	}, loader: Lb, meta: {navigationBar: {titleText: "%pages.pay.browser%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/pay/result", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Mb, t)
		}
	}, loader: Ib, meta: {navigationBar: {titleText: "%pages.pay.result%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/setting/index", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(jb, t)
		}
	}, loader: Fb, meta: {navigationBar: {titleText: "%pages.setting.index%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/webview/index", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(Nb, t)
		}
	}, loader: Rb, meta: {navigationBar: {titleText: "%pages.webview.index%", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/develop", component: {
		setup() {
			const e = dm(), t = e && e.$route && e.$route.query || {};
			return () => Hb(zb, t)
		}
	}, loader: Db, meta: {navigationBar: {titleText: "%pages.index.develop%", type: "default"}, isNVue: !1}
}].map((e => (e.meta.route = (e.alias || e.path).slice(1), e)));
const Vb = e => (t, n = ui()) => {
		!hi && Po(e, t, n)
	}, Wb = Vb("onShow"), $b = Vb("onHide"), Qb = Vb("onLaunch"), Ub = Vb("onLoad"), Xb = Vb("onPageScroll"),
	Yb = Vb("onReachBottom"), Jb = Vb("onPullDownRefresh"), Gb = Vb("onShareTimeline"), Kb = Vb("onShareAppMessage"),
	Zb = {
		name: "",
		appid: "__UNI__ED923AB",
		description: "",
		versionName: "1.0.0",
		versionCode: "100",
		transformPx: !1,
		"app-plus": {
			usingComponents: !0,
			nvueStyleCompiler: "uni-app",
			compilerVersion: 3,
			splashscreen: {alwaysShowBeforeRender: !0, waiting: !0, autoclose: !0, delay: 0},
			modules: {},
			distribute: {
				android: {
					permissions: ['<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>', '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>', '<uses-permission android:name="android.permission.VIBRATE"/>', '<uses-permission android:name="android.permission.READ_LOGS"/>', '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>', '<uses-feature android:name="android.hardware.camera.autofocus"/>', '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>', '<uses-permission android:name="android.permission.CAMERA"/>', '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>', '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>', '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>', '<uses-permission android:name="android.permission.WAKE_LOCK"/>', '<uses-permission android:name="android.permission.FLASHLIGHT"/>', '<uses-feature android:name="android.hardware.camera"/>', '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>']
				}, ios: {}, sdkConfigs: {}
			}
		},
		quickapp: {},
		"mp-weixin": {appid: "wx59e6ba6050bbe7bc", setting: {urlCheck: !1}, usingComponents: !0},
		"mp-alipay": {usingComponents: !0},
		"mp-baidu": {usingComponents: !0},
		"mp-toutiao": {usingComponents: !0},
		uniStatistics: {enable: !1},
		vueVersion: "3",
		h5: {router: {mode: "history", base: "/wap/"}},
		fallbackLocale: "zh-Hans"
	}, ey = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, ty = e => ey ? Symbol(e) : e,
	ny = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
	oy = e => "number" == typeof e && isFinite(e), ry = e => "[object RegExp]" === vy(e),
	iy = e => by(e) && 0 === Object.keys(e).length;

function ay(e, t) {
	"undefined" != typeof console && (console.warn("[intlify] " + e), t && console.warn(t.stack))
}

const sy = Object.assign;

function ly(e) {
	return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

const cy = Object.prototype.hasOwnProperty;

function uy(e, t) {
	return cy.call(e, t)
}

const dy = Array.isArray, py = e => "function" == typeof e, fy = e => "string" == typeof e,
	hy = e => "boolean" == typeof e, my = e => null !== e && "object" == typeof e, gy = Object.prototype.toString,
	vy = e => gy.call(e), by = e => "[object Object]" === vy(e), yy = Object.prototype.hasOwnProperty;

function _y(e, t) {
	return yy.call(e, t)
}

const wy = e => null !== e && "object" == typeof e, xy = [];
xy[0] = {w: [0], i: [3, 0], "[": [4], o: [7]}, xy[1] = {w: [1], ".": [2], "[": [4], o: [7]}, xy[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, xy[3] = {i: [3, 0], 0: [3, 0], w: [1, 1], ".": [2, 1], "[": [4, 1], o: [7, 1]}, xy[4] = {
	"'": [5, 0],
	'"': [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, xy[5] = {"'": [4, 0], o: 8, l: [5, 0]}, xy[6] = {'"': [4, 0], o: 8, l: [6, 0]};
const Ty = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function Sy(e) {
	if (null == e) return "o";
	switch (e.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39:
			return e;
		case 95:
		case 36:
		case 45:
			return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233:
			return "w"
	}
	return "i"
}

function Ey(e) {
	const t = e.trim();
	return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t, Ty.test(n) ? function (e) {
		const t = e.charCodeAt(0);
		return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
	}(t) : "*" + t);
	var n
}

const ky = new Map;

function Ay(e, t) {
	if (!wy(e)) return null;
	let n = ky.get(t);
	if (n || (n = function (e) {
		const t = [];
		let n, o, r, i, a, s, l, c = -1, u = 0, d = 0;
		const p = [];

		function f() {
			const t = e[c + 1];
			if (5 === u && "'" === t || 6 === u && '"' === t) return c++, r = "\\" + t, p[0](), !0
		}

		for (p[0] = () => {
			void 0 === o ? o = r : o += r
		}, p[1] = () => {
			void 0 !== o && (t.push(o), o = void 0)
		}, p[2] = () => {
			p[0](), d++
		}, p[3] = () => {
			if (d > 0) d--, u = 4, p[0](); else {
				if (d = 0, void 0 === o) return !1;
				if (o = Ey(o), !1 === o) return !1;
				p[1]()
			}
		}; null !== u;) if (c++, n = e[c], "\\" !== n || !f()) {
			if (i = Sy(n), l = xy[u], a = l[i] || l.l || 8, 8 === a) return;
			if (u = a[0], void 0 !== a[1] && (s = p[a[1]], s && (r = n, !1 === s()))) return;
			if (7 === u) return t
		}
	}(t), n && ky.set(t, n)), !n) return null;
	const o = n.length;
	let r = e, i = 0;
	for (; i < o;) {
		const e = r[n[i]];
		if (void 0 === e) return null;
		r = e, i++
	}
	return r
}

function Cy(e) {
	if (!wy(e)) return e;
	for (const t in e) if (_y(e, t)) if (t.includes(".")) {
		const n = t.split("."), o = n.length - 1;
		let r = e;
		for (let e = 0; e < o; e++) n[e] in r || (r[n[e]] = {}), r = r[n[e]];
		r[n[o]] = e[t], delete e[t], wy(r[n[o]]) && Cy(r[n[o]])
	} else wy(e[t]) && Cy(e[t]);
	return e
}

/*!
  * @intlify/runtime v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const By = e => e, Py = e => "", Ly = e => 0 === e.length ? "" : e.join(""),
	Oy = e => null == e ? "" : dy(e) || by(e) && e.toString === gy ? JSON.stringify(e, null, 2) : String(e);

function Iy(e, t) {
	return e = Math.abs(e), 2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}

function My(e = {}) {
	const t = e.locale, n = function (e) {
			const t = oy(e.pluralIndex) ? e.pluralIndex : -1;
			return e.named && (oy(e.named.count) || oy(e.named.n)) ? oy(e.named.count) ? e.named.count : oy(e.named.n) ? e.named.n : t : t
		}(e), o = my(e.pluralRules) && fy(t) && py(e.pluralRules[t]) ? e.pluralRules[t] : Iy,
		r = my(e.pluralRules) && fy(t) && py(e.pluralRules[t]) ? Iy : void 0, i = e.list || [], a = e.named || {};
	oy(e.pluralIndex) && function (e, t) {
		t.count || (t.count = e), t.n || (t.n = e)
	}(n, a);

	function s(t) {
		const n = py(e.messages) ? e.messages(t) : !!my(e.messages) && e.messages[t];
		return n || (e.parent ? e.parent.message(t) : Py)
	}

	const l = by(e.processor) && py(e.processor.normalize) ? e.processor.normalize : Ly,
		c = by(e.processor) && py(e.processor.interpolate) ? e.processor.interpolate : Oy, u = {
			list: e => i[e],
			named: e => a[e],
			plural: e => e[o(n, e.length, r)],
			linked: (t, n) => {
				const o = s(t)(u);
				return fy(n) ? (r = n, e.modifiers ? e.modifiers[r] : By)(o) : o;
				var r
			},
			message: s,
			type: by(e.processor) && fy(e.processor.type) ? e.processor.type : "text",
			interpolate: c,
			normalize: l
		};
	return u
}

/*!
  * @intlify/message-compiler v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
function Fy(e, t, n = {}) {
	const {domain: o, messages: r, args: i} = n, a = new SyntaxError(String(e));
	return a.code = e, t && (a.location = t), a.domain = o, a
}

function jy(e) {
	throw e
}

function Ry(e, t, n) {
	const o = {start: e, end: t};
	return null != n && (o.source = n), o
}

const Ny = String.fromCharCode(8232), Dy = String.fromCharCode(8233);

function zy(e) {
	const t = e;
	let n = 0, o = 1, r = 1, i = 0;
	const a = e => "\r" === t[e] && "\n" === t[e + 1], s = e => t[e] === Dy, l = e => t[e] === Ny,
		c = e => a(e) || (e => "\n" === t[e])(e) || s(e) || l(e), u = e => a(e) || s(e) || l(e) ? "\n" : t[e];

	function d() {
		return i = 0, c(n) && (o++, r = 0), a(n) && n++, n++, r++, t[n]
	}

	return {
		index: () => n,
		line: () => o,
		column: () => r,
		peekOffset: () => i,
		charAt: u,
		currentChar: () => u(n),
		currentPeek: () => u(n + i),
		next: d,
		peek: function () {
			return a(n + i) && i++, i++, t[n + i]
		},
		reset: function () {
			n = 0, o = 1, r = 1, i = 0
		},
		resetPeek: function (e = 0) {
			i = e
		},
		skipToPeek: function () {
			const e = n + i;
			for (; e !== n;) d();
			i = 0
		}
	}
}

const Hy = void 0;

function qy(e, t = {}) {
	const n = !1 !== t.location, o = zy(e), r = () => o.index(), i = () => {
		return e = o.line(), t = o.column(), n = o.index(), {line: e, column: t, offset: n};
		var e, t, n
	}, a = i(), s = r(), l = {
		currentType: 14,
		offset: s,
		startLoc: a,
		endLoc: a,
		lastType: 14,
		lastOffset: s,
		lastStartLoc: a,
		lastEndLoc: a,
		braceNest: 0,
		inLinked: !1,
		text: ""
	}, c = () => l, {onError: u} = t;

	function d(e, t, n, ...o) {
		const r = c();
		if (t.column += n, t.offset += n, u) {
			const n = Fy(e, Ry(r.startLoc, t), {domain: "tokenizer", args: o});
			u(n)
		}
	}

	function p(e, t, o) {
		e.endLoc = i(), e.currentType = t;
		const r = {type: t};
		return n && (r.loc = Ry(e.startLoc, e.endLoc)), null != o && (r.value = o), r
	}

	const f = e => p(e, 14);

	function h(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(0, i(), 0, t), "")
	}

	function m(e) {
		let t = "";
		for (; " " === e.currentPeek() || "\n" === e.currentPeek();) t += e.currentPeek(), e.peek();
		return t
	}

	function g(e) {
		const t = m(e);
		return e.skipToPeek(), t
	}

	function v(e) {
		if (e === Hy) return !1;
		const t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t
	}

	function b(e, t) {
		const {currentType: n} = t;
		if (2 !== n) return !1;
		m(e);
		const o = function (e) {
			if (e === Hy) return !1;
			const t = e.charCodeAt(0);
			return t >= 48 && t <= 57
		}("-" === e.currentPeek() ? e.peek() : e.currentPeek());
		return e.resetPeek(), o
	}

	function y(e) {
		m(e);
		const t = "|" === e.currentPeek();
		return e.resetPeek(), t
	}

	function _(e, t = !0) {
		const n = (t = !1, o = "", r = !1) => {
			const i = e.currentPeek();
			return "{" === i ? "%" !== o && t : "@" !== i && i ? "%" === i ? (e.peek(), n(t, "%", !0)) : "|" === i ? !("%" !== o && !r) || !(" " === o || "\n" === o) : " " === i ? (e.peek(), n(!0, " ", r)) : "\n" !== i || (e.peek(), n(!0, "\n", r)) : "%" === o || t
		}, o = n();
		return t && e.resetPeek(), o
	}

	function w(e, t) {
		const n = e.currentChar();
		return n === Hy ? Hy : t(n) ? (e.next(), n) : null
	}

	function x(e) {
		return w(e, (e => {
			const t = e.charCodeAt(0);
			return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 95 === t || 36 === t
		}))
	}

	function T(e) {
		return w(e, (e => {
			const t = e.charCodeAt(0);
			return t >= 48 && t <= 57
		}))
	}

	function S(e) {
		return w(e, (e => {
			const t = e.charCodeAt(0);
			return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102
		}))
	}

	function E(e) {
		let t = "", n = "";
		for (; t = T(e);) n += t;
		return n
	}

	function k(e) {
		const t = e.currentChar();
		switch (t) {
			case"\\":
			case"'":
				return e.next(), `\\${t}`;
			case"u":
				return A(e, t, 4);
			case"U":
				return A(e, t, 6);
			default:
				return d(3, i(), 0, t), ""
		}
	}

	function A(e, t, n) {
		h(e, t);
		let o = "";
		for (let r = 0; r < n; r++) {
			const n = S(e);
			if (!n) {
				d(4, i(), 0, `\\${t}${o}${e.currentChar()}`);
				break
			}
			o += n
		}
		return `\\${t}${o}`
	}

	function C(e) {
		g(e);
		const t = h(e, "|");
		return g(e), t
	}

	function B(e, t) {
		let n = null;
		switch (e.currentChar()) {
			case"{":
				return t.braceNest >= 1 && d(8, i(), 0), e.next(), n = p(t, 2, "{"), g(e), t.braceNest++, n;
			case"}":
				return t.braceNest > 0 && 2 === t.currentType && d(7, i(), 0), e.next(), n = p(t, 3, "}"), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && 0 === t.braceNest && (t.inLinked = !1), n;
			case"@":
				return t.braceNest > 0 && d(6, i(), 0), n = P(e, t) || f(t), t.braceNest = 0, n;
			default:
				let o = !0, r = !0, a = !0;
				if (y(e)) return t.braceNest > 0 && d(6, i(), 0), n = p(t, 1, C(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (t.braceNest > 0 && (5 === t.currentType || 6 === t.currentType || 7 === t.currentType)) return d(6, i(), 0), t.braceNest = 0, L(e, t);
				if (o = function (e, t) {
					const {currentType: n} = t;
					if (2 !== n) return !1;
					m(e);
					const o = v(e.currentPeek());
					return e.resetPeek(), o
				}(e, t)) return n = p(t, 5, function (e) {
					g(e);
					let t = "", n = "";
					for (; t = x(e);) n += t;
					return e.currentChar() === Hy && d(6, i(), 0), n
				}(e)), g(e), n;
				if (r = b(e, t)) return n = p(t, 6, function (e) {
					g(e);
					let t = "";
					return "-" === e.currentChar() ? (e.next(), t += `-${E(e)}`) : t += E(e), e.currentChar() === Hy && d(6, i(), 0), t
				}(e)), g(e), n;
				if (a = function (e, t) {
					const {currentType: n} = t;
					if (2 !== n) return !1;
					m(e);
					const o = "'" === e.currentPeek();
					return e.resetPeek(), o
				}(e, t)) return n = p(t, 7, function (e) {
					g(e), h(e, "'");
					let t = "", n = "";
					const o = e => "'" !== e && "\n" !== e;
					for (; t = w(e, o);) n += "\\" === t ? k(e) : t;
					const r = e.currentChar();
					return "\n" === r || r === Hy ? (d(2, i(), 0), "\n" === r && (e.next(), h(e, "'")), n) : (h(e, "'"), n)
				}(e)), g(e), n;
				if (!o && !r && !a) return n = p(t, 13, function (e) {
					g(e);
					let t = "", n = "";
					const o = e => "{" !== e && "}" !== e && " " !== e && "\n" !== e;
					for (; t = w(e, o);) n += t;
					return n
				}(e)), d(1, i(), 0, n.value), g(e), n
		}
		return n
	}

	function P(e, t) {
		const {currentType: n} = t;
		let o = null;
		const r = e.currentChar();
		switch (8 !== n && 9 !== n && 12 !== n && 10 !== n || "\n" !== r && " " !== r || d(9, i(), 0), r) {
			case"@":
				return e.next(), o = p(t, 8, "@"), t.inLinked = !0, o;
			case".":
				return g(e), e.next(), p(t, 9, ".");
			case":":
				return g(e), e.next(), p(t, 10, ":");
			default:
				return y(e) ? (o = p(t, 1, C(e)), t.braceNest = 0, t.inLinked = !1, o) : function (e, t) {
					const {currentType: n} = t;
					if (8 !== n) return !1;
					m(e);
					const o = "." === e.currentPeek();
					return e.resetPeek(), o
				}(e, t) || function (e, t) {
					const {currentType: n} = t;
					if (8 !== n && 12 !== n) return !1;
					m(e);
					const o = ":" === e.currentPeek();
					return e.resetPeek(), o
				}(e, t) ? (g(e), P(e, t)) : function (e, t) {
					const {currentType: n} = t;
					if (9 !== n) return !1;
					m(e);
					const o = v(e.currentPeek());
					return e.resetPeek(), o
				}(e, t) ? (g(e), p(t, 12, function (e) {
					let t = "", n = "";
					for (; t = x(e);) n += t;
					return n
				}(e))) : function (e, t) {
					const {currentType: n} = t;
					if (10 !== n) return !1;
					const o = () => {
						const t = e.currentPeek();
						return "{" === t ? v(e.peek()) : !("@" === t || "%" === t || "|" === t || ":" === t || "." === t || " " === t || !t) && ("\n" === t ? (e.peek(), o()) : v(t))
					}, r = o();
					return e.resetPeek(), r
				}(e, t) ? (g(e), "{" === r ? B(e, t) || o : p(t, 11, function (e) {
					const t = (n = !1, o) => {
						const r = e.currentChar();
						return "{" !== r && "%" !== r && "@" !== r && "|" !== r && r ? " " === r ? o : "\n" === r ? (o += r, e.next(), t(n, o)) : (o += r, e.next(), t(!0, o)) : o
					};
					return t(!1, "")
				}(e))) : (8 === n && d(9, i(), 0), t.braceNest = 0, t.inLinked = !1, L(e, t))
		}
	}

	function L(e, t) {
		let n = {type: 14};
		if (t.braceNest > 0) return B(e, t) || f(t);
		if (t.inLinked) return P(e, t) || f(t);
		const o = e.currentChar();
		switch (o) {
			case"{":
				return B(e, t) || f(t);
			case"}":
				return d(5, i(), 0), e.next(), p(t, 3, "}");
			case"@":
				return P(e, t) || f(t);
			default:
				if (y(e)) return n = p(t, 1, C(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (_(e)) return p(t, 0, function (e) {
					let t = "";
					for (; ;) {
						const n = e.currentChar();
						if ("{" === n || "}" === n || "@" === n || "|" === n || !n) break;
						if ("%" === n) {
							if (!_(e)) break;
							t += n, e.next()
						} else if (" " === n || "\n" === n) if (_(e)) t += n, e.next(); else {
							if (y(e)) break;
							t += n, e.next()
						} else t += n, e.next()
					}
					return t
				}(e));
				if ("%" === o) return e.next(), p(t, 4, "%")
		}
		return n
	}

	return {
		nextToken: function () {
			const {currentType: e, offset: t, startLoc: n, endLoc: a} = l;
			return l.lastType = e, l.lastOffset = t, l.lastStartLoc = n, l.lastEndLoc = a, l.offset = r(), l.startLoc = i(), o.currentChar() === Hy ? p(l, 14) : L(o, l)
		}, currentOffset: r, currentPosition: i, context: c
	}
}

const Vy = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

function Wy(e, t, n) {
	switch (e) {
		case"\\\\":
			return "\\";
		case"\\'":
			return "'";
		default: {
			const e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�"
		}
	}
}

function $y(e = {}) {
	const t = !1 !== e.location, {onError: n} = e;

	function o(e, t, o, r, ...i) {
		const a = e.currentPosition();
		if (a.offset += r, a.column += r, n) {
			const e = Fy(t, Ry(o, a), {domain: "parser", args: i});
			n(e)
		}
	}

	function r(e, n, o) {
		const r = {type: e, start: n, end: n};
		return t && (r.loc = {start: o, end: o}), r
	}

	function i(e, n, o, r) {
		e.end = n, r && (e.type = r), t && e.loc && (e.loc.end = o)
	}

	function a(e, t) {
		const n = e.context(), o = r(3, n.offset, n.startLoc);
		return o.value = t, i(o, e.currentOffset(), e.currentPosition()), o
	}

	function s(e, t) {
		const n = e.context(), {lastOffset: o, lastStartLoc: a} = n, s = r(5, o, a);
		return s.index = parseInt(t, 10), e.nextToken(), i(s, e.currentOffset(), e.currentPosition()), s
	}

	function l(e, t) {
		const n = e.context(), {lastOffset: o, lastStartLoc: a} = n, s = r(4, o, a);
		return s.key = t, e.nextToken(), i(s, e.currentOffset(), e.currentPosition()), s
	}

	function c(e, t) {
		const n = e.context(), {lastOffset: o, lastStartLoc: a} = n, s = r(9, o, a);
		return s.value = t.replace(Vy, Wy), e.nextToken(), i(s, e.currentOffset(), e.currentPosition()), s
	}

	function u(e) {
		const t = e.context(), n = r(6, t.offset, t.startLoc);
		let a = e.nextToken();
		if (9 === a.type) {
			const t = function (e) {
				const t = e.nextToken(), n = e.context(), {lastOffset: a, lastStartLoc: s} = n, l = r(8, a, s);
				return 12 !== t.type ? (o(e, 11, n.lastStartLoc, 0), l.value = "", i(l, a, s), {
					nextConsumeToken: t,
					node: l
				}) : (null == t.value && o(e, 13, n.lastStartLoc, 0, Qy(t)), l.value = t.value || "", i(l, e.currentOffset(), e.currentPosition()), {node: l})
			}(e);
			n.modifier = t.node, a = t.nextConsumeToken || e.nextToken()
		}
		switch (10 !== a.type && o(e, 13, t.lastStartLoc, 0, Qy(a)), a = e.nextToken(), 2 === a.type && (a = e.nextToken()), a.type) {
			case 11:
				null == a.value && o(e, 13, t.lastStartLoc, 0, Qy(a)), n.key = function (e, t) {
					const n = e.context(), o = r(7, n.offset, n.startLoc);
					return o.value = t, i(o, e.currentOffset(), e.currentPosition()), o
				}(e, a.value || "");
				break;
			case 5:
				null == a.value && o(e, 13, t.lastStartLoc, 0, Qy(a)), n.key = l(e, a.value || "");
				break;
			case 6:
				null == a.value && o(e, 13, t.lastStartLoc, 0, Qy(a)), n.key = s(e, a.value || "");
				break;
			case 7:
				null == a.value && o(e, 13, t.lastStartLoc, 0, Qy(a)), n.key = c(e, a.value || "");
				break;
			default:
				o(e, 12, t.lastStartLoc, 0);
				const u = e.context(), d = r(7, u.offset, u.startLoc);
				return d.value = "", i(d, u.offset, u.startLoc), n.key = d, i(n, u.offset, u.startLoc), {
					nextConsumeToken: a,
					node: n
				}
		}
		return i(n, e.currentOffset(), e.currentPosition()), {node: n}
	}

	function d(e) {
		const t = e.context(),
			n = r(2, 1 === t.currentType ? e.currentOffset() : t.offset, 1 === t.currentType ? t.endLoc : t.startLoc);
		n.items = [];
		let d = null;
		do {
			const r = d || e.nextToken();
			switch (d = null, r.type) {
				case 0:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Qy(r)), n.items.push(a(e, r.value || ""));
					break;
				case 6:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Qy(r)), n.items.push(s(e, r.value || ""));
					break;
				case 5:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Qy(r)), n.items.push(l(e, r.value || ""));
					break;
				case 7:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Qy(r)), n.items.push(c(e, r.value || ""));
					break;
				case 8:
					const i = u(e);
					n.items.push(i.node), d = i.nextConsumeToken || null
			}
		} while (14 !== t.currentType && 1 !== t.currentType);
		return i(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e.currentPosition()), n
	}

	function p(e) {
		const t = e.context(), {offset: n, startLoc: a} = t, s = d(e);
		return 14 === t.currentType ? s : function (e, t, n, a) {
			const s = e.context();
			let l = 0 === a.items.length;
			const c = r(1, t, n);
			c.cases = [], c.cases.push(a);
			do {
				const t = d(e);
				l || (l = 0 === t.items.length), c.cases.push(t)
			} while (14 !== s.currentType);
			return l && o(e, 10, n, 0), i(c, e.currentOffset(), e.currentPosition()), c
		}(e, n, a, s)
	}

	return {
		parse: function (n) {
			const a = qy(n, sy({}, e)), s = a.context(), l = r(0, s.offset, s.startLoc);
			return t && l.loc && (l.loc.source = n), l.body = p(a), 14 !== s.currentType && o(a, 13, s.lastStartLoc, 0, n[s.offset] || ""), i(l, a.currentOffset(), a.currentPosition()), l
		}
	}
}

function Qy(e) {
	if (14 === e.type) return "EOF";
	const t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t
}

function Uy(e, t) {
	for (let n = 0; n < e.length; n++) Xy(e[n], t)
}

function Xy(e, t) {
	switch (e.type) {
		case 1:
			Uy(e.cases, t), t.helper("plural");
			break;
		case 2:
			Uy(e.items, t);
			break;
		case 6:
			Xy(e.key, t), t.helper("linked");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4:
			t.helper("interpolate"), t.helper("named")
	}
}

function Yy(e, t = {}) {
	const n = function (e, t = {}) {
		const n = {ast: e, helpers: new Set};
		return {context: () => n, helper: e => (n.helpers.add(e), e)}
	}(e);
	n.helper("normalize"), e.body && Xy(e.body, n);
	const o = n.context();
	e.helpers = Array.from(o.helpers)
}

function Jy(e, t) {
	const {helper: n} = e;
	switch (t.type) {
		case 0:
			!function (e, t) {
				t.body ? Jy(e, t.body) : e.push("null")
			}(e, t);
			break;
		case 1:
			!function (e, t) {
				const {helper: n, needIndent: o} = e;
				if (t.cases.length > 1) {
					e.push(`${n("plural")}([`), e.indent(o());
					const r = t.cases.length;
					for (let n = 0; n < r && (Jy(e, t.cases[n]), n !== r - 1); n++) e.push(", ");
					e.deindent(o()), e.push("])")
				}
			}(e, t);
			break;
		case 2:
			!function (e, t) {
				const {helper: n, needIndent: o} = e;
				e.push(`${n("normalize")}([`), e.indent(o());
				const r = t.items.length;
				for (let i = 0; i < r && (Jy(e, t.items[i]), i !== r - 1); i++) e.push(", ");
				e.deindent(o()), e.push("])")
			}(e, t);
			break;
		case 6:
			!function (e, t) {
				const {helper: n} = e;
				e.push(`${n("linked")}(`), Jy(e, t.key), t.modifier && (e.push(", "), Jy(e, t.modifier)), e.push(")")
			}(e, t);
			break;
		case 8:
		case 7:
		case 9:
		case 3:
			e.push(JSON.stringify(t.value), t);
			break;
		case 5:
			e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
			break;
		case 4:
			e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t)
	}
}

function Gy(e, t = {}) {
	const n = sy({}, t), o = $y(n).parse(e);
	return Yy(o, n), ((e, t = {}) => {
		const n = fy(t.mode) ? t.mode : "normal", o = fy(t.filename) ? t.filename : "message.intl", r = !!t.sourceMap,
			i = null != t.breakLineCode ? t.breakLineCode : "arrow" === n ? ";" : "\n",
			a = t.needIndent ? t.needIndent : "arrow" !== n, s = e.helpers || [], l = function (e, t) {
				const {sourceMap: n, filename: o, breakLineCode: r, needIndent: i} = t, a = {
					source: e.loc.source,
					filename: o,
					code: "",
					column: 1,
					line: 1,
					offset: 0,
					map: void 0,
					breakLineCode: r,
					needIndent: i,
					indentLevel: 0
				};

				function s(e, t) {
					a.code += e
				}

				function l(e, t = !0) {
					const n = t ? r : "";
					s(i ? n + "  ".repeat(e) : n)
				}

				return {
					context: () => a, push: s, indent: function (e = !0) {
						const t = ++a.indentLevel;
						e && l(t)
					}, deindent: function (e = !0) {
						const t = --a.indentLevel;
						e && l(t)
					}, newline: function () {
						l(a.indentLevel)
					}, helper: e => `_${e}`, needIndent: () => a.needIndent
				}
			}(e, {mode: n, filename: o, sourceMap: r, breakLineCode: i, needIndent: a});
		l.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"), l.indent(a), s.length > 0 && (l.push(`const { ${s.map((e => `${e}: _${e}`)).join(", ")} } = ctx`), l.newline()), l.push("return "), Jy(l, e), l.deindent(a), l.push("}");
		const {code: c, map: u} = l.context();
		return {ast: e, code: c, map: u ? u.toJSON() : void 0}
	})(o, n)
}

/*!
  * @intlify/core-base v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
let Ky;
let Zy = 0;

function e_(e = {}) {
	const t = fy(e.version) ? e.version : "9.1.9", n = fy(e.locale) ? e.locale : "en-US",
		o = dy(e.fallbackLocale) || by(e.fallbackLocale) || fy(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : n,
		r = by(e.messages) ? e.messages : {[n]: {}}, i = by(e.datetimeFormats) ? e.datetimeFormats : {[n]: {}},
		a = by(e.numberFormats) ? e.numberFormats : {[n]: {}}, s = sy({}, e.modifiers || {}, {
			upper: e => fy(e) ? e.toUpperCase() : e,
			lower: e => fy(e) ? e.toLowerCase() : e,
			capitalize: e => fy(e) ? `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}` : e
		}), l = e.pluralRules || {}, c = py(e.missing) ? e.missing : null,
		u = !hy(e.missingWarn) && !ry(e.missingWarn) || e.missingWarn,
		d = !hy(e.fallbackWarn) && !ry(e.fallbackWarn) || e.fallbackWarn, p = !!e.fallbackFormat, f = !!e.unresolving,
		h = py(e.postTranslation) ? e.postTranslation : null, m = by(e.processor) ? e.processor : null,
		g = !hy(e.warnHtmlMessage) || e.warnHtmlMessage, v = !!e.escapeParameter,
		b = py(e.messageCompiler) ? e.messageCompiler : Ky, y = py(e.onWarn) ? e.onWarn : ay, _ = e,
		w = my(_.__datetimeFormatters) ? _.__datetimeFormatters : new Map,
		x = my(_.__numberFormatters) ? _.__numberFormatters : new Map, T = my(_.__meta) ? _.__meta : {};
	Zy++;
	return {
		version: t,
		cid: Zy,
		locale: n,
		fallbackLocale: o,
		messages: r,
		datetimeFormats: i,
		numberFormats: a,
		modifiers: s,
		pluralRules: l,
		missing: c,
		missingWarn: u,
		fallbackWarn: d,
		fallbackFormat: p,
		unresolving: f,
		postTranslation: h,
		processor: m,
		warnHtmlMessage: g,
		escapeParameter: v,
		messageCompiler: b,
		onWarn: y,
		__datetimeFormatters: w,
		__numberFormatters: x,
		__meta: T
	}
}

function t_(e, t, n, o, r) {
	const {missing: i, onWarn: a} = e;
	if (null !== i) {
		const o = i(e, n, t, r);
		return fy(o) ? o : t
	}
	return t
}

function n_(e, t, n) {
	const o = e;
	o.__localeChainCache || (o.__localeChainCache = new Map);
	let r = o.__localeChainCache.get(n);
	if (!r) {
		r = [];
		let e = [n];
		for (; dy(e);) e = o_(r, e, t);
		const i = dy(t) ? t : by(t) ? t.default ? t.default : null : t;
		e = fy(i) ? [i] : i, dy(e) && o_(r, e, !1), o.__localeChainCache.set(n, r)
	}
	return r
}

function o_(e, t, n) {
	let o = !0;
	for (let r = 0; r < t.length && hy(o); r++) {
		const i = t[r];
		fy(i) && (o = r_(e, t[r], n))
	}
	return o
}

function r_(e, t, n) {
	let o;
	const r = t.split("-");
	do {
		o = i_(e, r.join("-"), n), r.splice(-1, 1)
	} while (r.length && !0 === o);
	return o
}

function i_(e, t, n) {
	let o = !1;
	if (!e.includes(t) && (o = !0, t)) {
		o = "!" !== t[t.length - 1];
		const r = t.replace(/!/g, "");
		e.push(r), (dy(n) || by(n)) && n[r] && (o = n[r])
	}
	return o
}

function a_(e, t, n) {
	e.__localeChainCache = new Map, n_(e, n, t)
}

const s_ = e => e;
let l_ = Object.create(null);

function c_(e) {
	return Fy(e, null, void 0)
}

const u_ = () => "", d_ = e => py(e);

function p_(e, ...t) {
	const {fallbackFormat: n, postTranslation: o, unresolving: r, fallbackLocale: i, messages: a} = e, [s, l] = h_(...t),
		c = (hy(l.missingWarn) ? l.missingWarn : e.missingWarn, hy(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, hy(l.escapeParameter) ? l.escapeParameter : e.escapeParameter),
		u = !!l.resolvedMessage, d = fy(l.default) || hy(l.default) ? hy(l.default) ? s : l.default : n ? s : "",
		p = n || "" !== d, f = fy(l.locale) ? l.locale : e.locale;
	c && function (e) {
		dy(e.list) ? e.list = e.list.map((e => fy(e) ? ly(e) : e)) : my(e.named) && Object.keys(e.named).forEach((t => {
			fy(e.named[t]) && (e.named[t] = ly(e.named[t]))
		}))
	}(l);
	let [h, m, g] = u ? [s, f, a[f] || {}] : function (e, t, n, o, r, i) {
		const {messages: a, onWarn: s} = e, l = n_(e, o, n);
		let c, u = {}, d = null;
		const p = "translate";
		for (let f = 0; f < l.length && (c = l[f], u = a[c] || {}, null === (d = Ay(u, t)) && (d = u[t]), !fy(d) && !py(d)); f++) {
			const n = t_(e, t, c, 0, p);
			n !== t && (d = n)
		}
		return [d, c, u]
	}(e, s, f, i), v = s;
	if (u || fy(h) || d_(h) || p && (h = d, v = h), !(u || (fy(h) || d_(h)) && fy(m))) return r ? -1 : s;
	let b = !1;
	const y = d_(h) ? h : f_(e, s, m, h, v, (() => {
		b = !0
	}));
	if (b) return h;
	const _ = function (e, t, n, o) {
		const {modifiers: r, pluralRules: i} = e, a = o => {
			const r = Ay(n, o);
			if (fy(r)) {
				let n = !1;
				const i = f_(e, o, t, r, o, (() => {
					n = !0
				}));
				return n ? u_ : i
			}
			return d_(r) ? r : u_
		}, s = {locale: t, modifiers: r, pluralRules: i, messages: a};
		e.processor && (s.processor = e.processor);
		o.list && (s.list = o.list);
		o.named && (s.named = o.named);
		oy(o.plural) && (s.pluralIndex = o.plural);
		return s
	}(e, m, g, l), w = function (e, t, n) {
		return t(n)
	}(0, y, My(_));
	return o ? o(w) : w
}

function f_(e, t, n, o, r, i) {
	const {messageCompiler: a, warnHtmlMessage: s} = e;
	if (d_(o)) {
		const e = o;
		return e.locale = e.locale || n, e.key = e.key || t, e
	}
	const l = a(o, function (e, t, n, o, r, i) {
		return {
			warnHtmlMessage: r, onError: e => {
				throw i && i(e), e
			}, onCacheKey: e => ((e, t, n) => ny({l: e, k: t, s: n}))(t, n, e)
		}
	}(0, n, r, 0, s, i));
	return l.locale = n, l.key = t, l.source = o, l
}

function h_(...e) {
	const [t, n, o] = e, r = {};
	if (!fy(t) && !oy(t) && !d_(t)) throw c_(14);
	const i = oy(t) ? String(t) : (d_(t), t);
	return oy(n) ? r.plural = n : fy(n) ? r.default = n : by(n) && !iy(n) ? r.named = n : dy(n) && (r.list = n), oy(o) ? r.plural = o : fy(o) ? r.default = o : by(o) && sy(r, o), [i, r]
}

function m_(e, ...t) {
	const {datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i} = e, {__datetimeFormatters: a} = e, [s, l, c, u] = g_(...t);
	hy(c.missingWarn) ? c.missingWarn : e.missingWarn;
	hy(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
	const d = !!c.part, p = fy(c.locale) ? c.locale : e.locale, f = n_(e, r, p);
	if (!fy(s) || "" === s) return new Intl.DateTimeFormat(p).format(l);
	let h, m = {}, g = null;
	for (let y = 0; y < f.length && (h = f[y], m = n[h] || {}, g = m[s], !by(g)); y++) t_(e, s, h, 0, "datetime format");
	if (!by(g) || !fy(h)) return o ? -1 : s;
	let v = `${h}__${s}`;
	iy(u) || (v = `${v}__${JSON.stringify(u)}`);
	let b = a.get(v);
	return b || (b = new Intl.DateTimeFormat(h, sy({}, g, u)), a.set(v, b)), d ? b.formatToParts(l) : b.format(l)
}

function g_(...e) {
	const [t, n, o, r] = e;
	let i, a = {}, s = {};
	if (fy(t)) {
		if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(t)) throw c_(16);
		i = new Date(t);
		try {
			i.toISOString()
		} catch (l) {
			throw c_(16)
		}
	} else if ("[object Date]" === vy(t)) {
		if (isNaN(t.getTime())) throw c_(15);
		i = t
	} else {
		if (!oy(t)) throw c_(14);
		i = t
	}
	return fy(n) ? a.key = n : by(n) && (a = n), fy(o) ? a.locale = o : by(o) && (s = o), by(r) && (s = r), [a.key || "", i, a, s]
}

function v_(e, t, n) {
	const o = e;
	for (const r in n) {
		const e = `${t}__${r}`;
		o.__datetimeFormatters.has(e) && o.__datetimeFormatters.delete(e)
	}
}

function b_(e, ...t) {
	const {numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i} = e, {__numberFormatters: a} = e, [s, l, c, u] = y_(...t);
	hy(c.missingWarn) ? c.missingWarn : e.missingWarn;
	hy(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
	const d = !!c.part, p = fy(c.locale) ? c.locale : e.locale, f = n_(e, r, p);
	if (!fy(s) || "" === s) return new Intl.NumberFormat(p).format(l);
	let h, m = {}, g = null;
	for (let y = 0; y < f.length && (h = f[y], m = n[h] || {}, g = m[s], !by(g)); y++) t_(e, s, h, 0, "number format");
	if (!by(g) || !fy(h)) return o ? -1 : s;
	let v = `${h}__${s}`;
	iy(u) || (v = `${v}__${JSON.stringify(u)}`);
	let b = a.get(v);
	return b || (b = new Intl.NumberFormat(h, sy({}, g, u)), a.set(v, b)), d ? b.formatToParts(l) : b.format(l)
}

function y_(...e) {
	const [t, n, o, r] = e;
	let i = {}, a = {};
	if (!oy(t)) throw c_(14);
	const s = t;
	return fy(n) ? i.key = n : by(n) && (i = n), fy(o) ? i.locale = o : by(o) && (a = o), by(r) && (a = r), [i.key || "", s, i, a]
}

function __(e, t, n) {
	const o = e;
	for (const r in n) {
		const e = `${t}__${r}`;
		o.__numberFormatters.has(e) && o.__numberFormatters.delete(e)
	}
}

/*!
  * vue-i18n v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
function w_(e, ...t) {
	return Fy(e, null, void 0)
}

const x_ = ty("__transrateVNode"), T_ = ty("__datetimeParts"), S_ = ty("__numberParts");
ty("__enableEmitter"), ty("__disableEmitter");
const E_ = ty("__setPluralRules");
ty("__intlifyMeta");
const k_ = ty("__injectWithOption");
let A_ = 0;

function C_(e) {
	return (t, n, o, r) => e(n, o, ui() || void 0, r)
}

function B_(e, t) {
	const {messages: n, __i18n: o} = t, r = by(n) ? n : dy(o) ? {} : {[e]: {}};
	if (dy(o) && o.forEach((({locale: e, resource: t}) => {
		e ? (r[e] = r[e] || {}, L_(t, r[e])) : L_(t, r)
	})), t.flatJson) for (const i in r) uy(r, i) && Cy(r[i]);
	return r
}

const P_ = e => !my(e) || dy(e);

function L_(e, t) {
	if (P_(e) || P_(t)) throw w_(20);
	for (const n in e) uy(e, n) && (P_(e[n]) || P_(t[n]) ? t[n] = e[n] : L_(e[n], t[n]))
}

function O_(e = {}) {
	const {__root: t} = e, n = void 0 === t;
	let o = !hy(e.inheritLocale) || e.inheritLocale;
	const r = nn(t && o ? t.locale.value : fy(e.locale) ? e.locale : "en-US"),
		i = nn(t && o ? t.fallbackLocale.value : fy(e.fallbackLocale) || dy(e.fallbackLocale) || by(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : r.value),
		a = nn(B_(r.value, e)), s = nn(by(e.datetimeFormats) ? e.datetimeFormats : {[r.value]: {}}),
		l = nn(by(e.numberFormats) ? e.numberFormats : {[r.value]: {}});
	let c = t ? t.missingWarn : !hy(e.missingWarn) && !ry(e.missingWarn) || e.missingWarn,
		u = t ? t.fallbackWarn : !hy(e.fallbackWarn) && !ry(e.fallbackWarn) || e.fallbackWarn,
		d = t ? t.fallbackRoot : !hy(e.fallbackRoot) || e.fallbackRoot, p = !!e.fallbackFormat,
		f = py(e.missing) ? e.missing : null, h = py(e.missing) ? C_(e.missing) : null,
		m = py(e.postTranslation) ? e.postTranslation : null, g = !hy(e.warnHtmlMessage) || e.warnHtmlMessage,
		v = !!e.escapeParameter;
	const b = t ? t.modifiers : by(e.modifiers) ? e.modifiers : {};
	let y, _ = e.pluralRules || t && t.pluralRules;
	y = e_({
		version: "9.1.9",
		locale: r.value,
		fallbackLocale: i.value,
		messages: a.value,
		datetimeFormats: s.value,
		numberFormats: l.value,
		modifiers: b,
		pluralRules: _,
		missing: null === h ? void 0 : h,
		missingWarn: c,
		fallbackWarn: u,
		fallbackFormat: p,
		unresolving: !0,
		postTranslation: null === m ? void 0 : m,
		warnHtmlMessage: g,
		escapeParameter: v,
		__datetimeFormatters: by(y) ? y.__datetimeFormatters : void 0,
		__numberFormatters: by(y) ? y.__numberFormatters : void 0,
		__v_emitter: by(y) ? y.__v_emitter : void 0,
		__meta: {framework: "vue"}
	}), a_(y, r.value, i.value);
	const w = yi({
		get: () => r.value, set: e => {
			r.value = e, y.locale = r.value
		}
	}), x = yi({
		get: () => i.value, set: e => {
			i.value = e, y.fallbackLocale = i.value, a_(y, r.value, e)
		}
	}), T = yi((() => a.value)), S = yi((() => s.value)), E = yi((() => l.value));

	function k(e, n, o, c, u, p) {
		let f;
		if (r.value, i.value, a.value, s.value, l.value, f = e(y), oy(f) && -1 === f) {
			const [e, o] = n();
			return t && d ? c(t) : u(e)
		}
		if (p(f)) return f;
		throw w_(14)
	}

	function A(...e) {
		return k((t => p_(t, ...e)), (() => h_(...e)), 0, (t => t.t(...e)), (e => e), (e => fy(e)))
	}

	const C = {
		normalize: function (e) {
			return e.map((e => fy(e) ? Kr(Fr, null, e, 0) : e))
		}, interpolate: e => e, type: "vnode"
	};

	function B(e) {
		return a.value[e] || {}
	}

	A_++, t && (Gn(t.locale, (e => {
		o && (r.value = e, y.locale = e, a_(y, r.value, i.value))
	})), Gn(t.fallbackLocale, (e => {
		o && (i.value = e, y.fallbackLocale = e, a_(y, r.value, i.value))
	})));
	return {
		id: A_, locale: w, fallbackLocale: x, get inheritLocale() {
			return o
		}, set inheritLocale(e) {
			o = e, e && t && (r.value = t.locale.value, i.value = t.fallbackLocale.value, a_(y, r.value, i.value))
		}, get availableLocales() {
			return Object.keys(a.value).sort()
		}, messages: T, datetimeFormats: S, numberFormats: E, get modifiers() {
			return b
		}, get pluralRules() {
			return _ || {}
		}, get isGlobal() {
			return n
		}, get missingWarn() {
			return c
		}, set missingWarn(e) {
			c = e, y.missingWarn = c
		}, get fallbackWarn() {
			return u
		}, set fallbackWarn(e) {
			u = e, y.fallbackWarn = u
		}, get fallbackRoot() {
			return d
		}, set fallbackRoot(e) {
			d = e
		}, get fallbackFormat() {
			return p
		}, set fallbackFormat(e) {
			p = e, y.fallbackFormat = p
		}, get warnHtmlMessage() {
			return g
		}, set warnHtmlMessage(e) {
			g = e, y.warnHtmlMessage = e
		}, get escapeParameter() {
			return v
		}, set escapeParameter(e) {
			v = e, y.escapeParameter = e
		}, t: A, rt: function (...e) {
			const [t, n, o] = e;
			if (o && !my(o)) throw w_(15);
			return A(t, n, sy({resolvedMessage: !0}, o || {}))
		}, d: function (...e) {
			return k((t => m_(t, ...e)), (() => g_(...e)), 0, (t => t.d(...e)), (() => ""), (e => fy(e)))
		}, n: function (...e) {
			return k((t => b_(t, ...e)), (() => y_(...e)), 0, (t => t.n(...e)), (() => ""), (e => fy(e)))
		}, te: function (e, t) {
			return null !== Ay(B(fy(t) ? t : r.value), e)
		}, tm: function (e) {
			const n = function (e) {
				let t = null;
				const n = n_(y, i.value, r.value);
				for (let o = 0; o < n.length; o++) {
					const r = Ay(a.value[n[o]] || {}, e);
					if (null != r) {
						t = r;
						break
					}
				}
				return t
			}(e);
			return null != n ? n : t && t.tm(e) || {}
		}, getLocaleMessage: B, setLocaleMessage: function (e, t) {
			a.value[e] = t, y.messages = a.value
		}, mergeLocaleMessage: function (e, t) {
			a.value[e] = a.value[e] || {}, L_(t, a.value[e]), y.messages = a.value
		}, getDateTimeFormat: function (e) {
			return s.value[e] || {}
		}, setDateTimeFormat: function (e, t) {
			s.value[e] = t, y.datetimeFormats = s.value, v_(y, e, t)
		}, mergeDateTimeFormat: function (e, t) {
			s.value[e] = sy(s.value[e] || {}, t), y.datetimeFormats = s.value, v_(y, e, t)
		}, getNumberFormat: function (e) {
			return l.value[e] || {}
		}, setNumberFormat: function (e, t) {
			l.value[e] = t, y.numberFormats = l.value, __(y, e, t)
		}, mergeNumberFormat: function (e, t) {
			l.value[e] = sy(l.value[e] || {}, t), y.numberFormats = l.value, __(y, e, t)
		}, getPostTranslationHandler: function () {
			return py(m) ? m : null
		}, setPostTranslationHandler: function (e) {
			m = e, y.postTranslation = e
		}, getMissingHandler: function () {
			return f
		}, setMissingHandler: function (e) {
			null !== e && (h = C_(e)), f = e, y.missing = h
		}, [x_]: function (...e) {
			return k((t => {
				let n;
				const o = t;
				try {
					o.processor = C, n = p_(o, ...e)
				} finally {
					o.processor = null
				}
				return n
			}), (() => h_(...e)), 0, (t => t[x_](...e)), (e => [Kr(Fr, null, e, 0)]), (e => dy(e)))
		}, [S_]: function (...e) {
			return k((t => b_(t, ...e)), (() => y_(...e)), 0, (t => t[S_](...e)), (() => []), (e => fy(e) || dy(e)))
		}, [T_]: function (...e) {
			return k((t => m_(t, ...e)), (() => g_(...e)), 0, (t => t[T_](...e)), (() => []), (e => fy(e) || dy(e)))
		}, [E_]: function (e) {
			_ = e, y.pluralRules = _
		}, [k_]: e.__injectWithOption
	}
}

function I_(e = {}) {
	const t = O_(function (e) {
		const t = fy(e.locale) ? e.locale : "en-US",
			n = fy(e.fallbackLocale) || dy(e.fallbackLocale) || by(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : t,
			o = py(e.missing) ? e.missing : void 0,
			r = !hy(e.silentTranslationWarn) && !ry(e.silentTranslationWarn) || !e.silentTranslationWarn,
			i = !hy(e.silentFallbackWarn) && !ry(e.silentFallbackWarn) || !e.silentFallbackWarn,
			a = !hy(e.fallbackRoot) || e.fallbackRoot, s = !!e.formatFallbackMessages,
			l = by(e.modifiers) ? e.modifiers : {}, c = e.pluralizationRules,
			u = py(e.postTranslation) ? e.postTranslation : void 0,
			d = !fy(e.warnHtmlInMessage) || "off" !== e.warnHtmlInMessage, p = !!e.escapeParameterHtml,
			f = !hy(e.sync) || e.sync;
		let h = e.messages;
		if (by(e.sharedMessages)) {
			const t = e.sharedMessages;
			h = Object.keys(t).reduce(((e, n) => {
				const o = e[n] || (e[n] = {});
				return sy(o, t[n]), e
			}), h || {})
		}
		const {__i18n: m, __root: g, __injectWithOption: v} = e, b = e.datetimeFormats, y = e.numberFormats;
		return {
			locale: t,
			fallbackLocale: n,
			messages: h,
			flatJson: e.flatJson,
			datetimeFormats: b,
			numberFormats: y,
			missing: o,
			missingWarn: r,
			fallbackWarn: i,
			fallbackRoot: a,
			fallbackFormat: s,
			modifiers: l,
			pluralRules: c,
			postTranslation: u,
			warnHtmlMessage: d,
			escapeParameter: p,
			inheritLocale: f,
			__i18n: m,
			__root: g,
			__injectWithOption: v
		}
	}(e)), n = {
		id: t.id,
		get locale() {
			return t.locale.value
		},
		set locale(e) {
			t.locale.value = e
		},
		get fallbackLocale() {
			return t.fallbackLocale.value
		},
		set fallbackLocale(e) {
			t.fallbackLocale.value = e
		},
		get messages() {
			return t.messages.value
		},
		get datetimeFormats() {
			return t.datetimeFormats.value
		},
		get numberFormats() {
			return t.numberFormats.value
		},
		get availableLocales() {
			return t.availableLocales
		},
		get formatter() {
			return {interpolate: () => []}
		},
		set formatter(e) {
		},
		get missing() {
			return t.getMissingHandler()
		},
		set missing(e) {
			t.setMissingHandler(e)
		},
		get silentTranslationWarn() {
			return hy(t.missingWarn) ? !t.missingWarn : t.missingWarn
		},
		set silentTranslationWarn(e) {
			t.missingWarn = hy(e) ? !e : e
		},
		get silentFallbackWarn() {
			return hy(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn
		},
		set silentFallbackWarn(e) {
			t.fallbackWarn = hy(e) ? !e : e
		},
		get modifiers() {
			return t.modifiers
		},
		get formatFallbackMessages() {
			return t.fallbackFormat
		},
		set formatFallbackMessages(e) {
			t.fallbackFormat = e
		},
		get postTranslation() {
			return t.getPostTranslationHandler()
		},
		set postTranslation(e) {
			t.setPostTranslationHandler(e)
		},
		get sync() {
			return t.inheritLocale
		},
		set sync(e) {
			t.inheritLocale = e
		},
		get warnHtmlInMessage() {
			return t.warnHtmlMessage ? "warn" : "off"
		},
		set warnHtmlInMessage(e) {
			t.warnHtmlMessage = "off" !== e
		},
		get escapeParameterHtml() {
			return t.escapeParameter
		},
		set escapeParameterHtml(e) {
			t.escapeParameter = e
		},
		get preserveDirectiveContent() {
			return !0
		},
		set preserveDirectiveContent(e) {
		},
		get pluralizationRules() {
			return t.pluralRules || {}
		},
		__composer: t,
		t(...e) {
			const [n, o, r] = e, i = {};
			let a = null, s = null;
			if (!fy(n)) throw w_(15);
			const l = n;
			return fy(o) ? i.locale = o : dy(o) ? a = o : by(o) && (s = o), dy(r) ? a = r : by(r) && (s = r), t.t(l, a || s || {}, i)
		},
		rt: (...e) => t.rt(...e),
		tc(...e) {
			const [n, o, r] = e, i = {plural: 1};
			let a = null, s = null;
			if (!fy(n)) throw w_(15);
			const l = n;
			return fy(o) ? i.locale = o : oy(o) ? i.plural = o : dy(o) ? a = o : by(o) && (s = o), fy(r) ? i.locale = r : dy(r) ? a = r : by(r) && (s = r), t.t(l, a || s || {}, i)
		},
		te: (e, n) => t.te(e, n),
		tm: e => t.tm(e),
		getLocaleMessage: e => t.getLocaleMessage(e),
		setLocaleMessage(e, n) {
			t.setLocaleMessage(e, n)
		},
		mergeLocaleMessage(e, n) {
			t.mergeLocaleMessage(e, n)
		},
		d: (...e) => t.d(...e),
		getDateTimeFormat: e => t.getDateTimeFormat(e),
		setDateTimeFormat(e, n) {
			t.setDateTimeFormat(e, n)
		},
		mergeDateTimeFormat(e, n) {
			t.mergeDateTimeFormat(e, n)
		},
		n: (...e) => t.n(...e),
		getNumberFormat: e => t.getNumberFormat(e),
		setNumberFormat(e, n) {
			t.setNumberFormat(e, n)
		},
		mergeNumberFormat(e, n) {
			t.mergeNumberFormat(e, n)
		},
		getChoiceIndex: (e, t) => -1,
		__onComponentInstanceCreated(t) {
			const {componentInstanceCreatedListener: o} = e;
			o && o(t, n)
		}
	};
	return n
}

const M_ = {
	tag: {type: [String, Object]},
	locale: {type: String},
	scope: {type: String, validator: e => "parent" === e || "global" === e, default: "parent"},
	i18n: {type: Object}
}, F_ = {
	name: "i18n-t",
	props: sy({
		keypath: {type: String, required: !0},
		plural: {type: [Number, String], validator: e => oy(e) || !isNaN(e)}
	}, M_),
	setup(e, t) {
		const {slots: n, attrs: o} = t, r = e.i18n || V_({useScope: e.scope, __useComponent: !0}),
			i = Object.keys(n).filter((e => "_" !== e));
		return () => {
			const n = {};
			e.locale && (n.locale = e.locale), void 0 !== e.plural && (n.plural = fy(e.plural) ? +e.plural : e.plural);
			const a = function ({slots: e}, t) {
				return 1 === t.length && "default" === t[0] ? e.default ? e.default() : [] : t.reduce(((t, n) => {
					const o = e[n];
					return o && (t[n] = o()), t
				}), {})
			}(t, i), s = r[x_](e.keypath, a, n), l = sy({}, o);
			return fy(e.tag) || my(e.tag) ? _i(e.tag, l, s) : _i(Mr, l, s)
		}
	}
};

function j_(e, t, n, o) {
	const {slots: r, attrs: i} = t;
	return () => {
		const t = {part: !0};
		let a = {};
		e.locale && (t.locale = e.locale), fy(e.format) ? t.key = e.format : my(e.format) && (fy(e.format.key) && (t.key = e.format.key), a = Object.keys(e.format).reduce(((t, o) => n.includes(o) ? sy({}, t, {[o]: e.format[o]}) : t), {}));
		const s = o(e.value, t, a);
		let l = [t.key];
		dy(s) ? l = s.map(((e, t) => {
			const n = r[e.type];
			return n ? n({[e.type]: e.value, index: t, parts: s}) : [e.value]
		})) : fy(s) && (l = [s]);
		const c = sy({}, i);
		return fy(e.tag) || my(e.tag) ? _i(e.tag, c, l) : _i(Mr, c, l)
	}
}

const R_ = ["localeMatcher", "style", "unit", "unitDisplay", "currency", "currencyDisplay", "useGrouping", "numberingSystem", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "notation", "formatMatcher"],
	N_ = {
		name: "i18n-n",
		props: sy({value: {type: Number, required: !0}, format: {type: [String, Object]}}, M_),
		setup(e, t) {
			const n = e.i18n || V_({useScope: "parent", __useComponent: !0});
			return j_(e, t, R_, ((...e) => n[S_](...e)))
		}
	},
	D_ = ["dateStyle", "timeStyle", "fractionalSecondDigits", "calendar", "dayPeriod", "numberingSystem", "localeMatcher", "timeZone", "hour12", "hourCycle", "formatMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"],
	z_ = {
		name: "i18n-d",
		props: sy({value: {type: [Number, Date], required: !0}, format: {type: [String, Object]}}, M_),
		setup(e, t) {
			const n = e.i18n || V_({useScope: "parent", __useComponent: !0});
			return j_(e, t, D_, ((...e) => n[T_](...e)))
		}
	};

function H_(e) {
	const t = (t, {instance: n, value: o, modifiers: r}) => {
		if (!n || !n.$) throw w_(22);
		const i = function (e, t) {
			const n = e;
			if ("composition" === e.mode) return n.__getInstance(t) || e.global;
			{
				const o = n.__getInstance(t);
				return null != o ? o.__composer : e.global.__composer
			}
		}(e, n.$), a = function (e) {
			if (fy(e)) return {path: e};
			if (by(e)) {
				if (!("path" in e)) throw w_(19);
				return e
			}
			throw w_(20)
		}(o);
		t.textContent = i.t(...function (e) {
			const {path: t, locale: n, args: o, choice: r, plural: i} = e, a = {}, s = o || {};
			fy(n) && (a.locale = n);
			oy(r) && (a.plural = r);
			oy(i) && (a.plural = i);
			return [t, s, a]
		}(a))
	};
	return {beforeMount: t, beforeUpdate: t}
}

function q_(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[E_](t.pluralizationRules || e.pluralizationRules);
	const n = B_(e.locale, {messages: t.messages, __i18n: t.__i18n});
	return Object.keys(n).forEach((t => e.mergeLocaleMessage(t, n[t]))), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n => e.mergeDateTimeFormat(n, t.datetimeFormats[n]))), t.numberFormats && Object.keys(t.numberFormats).forEach((n => e.mergeNumberFormat(n, t.numberFormats[n]))), e
}

function V_(e = {}) {
	const t = ui();
	if (null == t) throw w_(16);
	if (!t.appContext.app.__VUE_I18N_SYMBOL__) throw w_(17);
	const n = Xn(t.appContext.app.__VUE_I18N_SYMBOL__);
	if (!n) throw w_(22);
	const o = "composition" === n.mode ? n.global : n.global.__composer,
		r = iy(e) ? "__i18n" in t.type ? "local" : "global" : e.useScope ? e.useScope : "local";
	if ("global" === r) {
		let n = my(e.messages) ? e.messages : {};
		"__i18nGlobal" in t.type && (n = B_(o.locale.value, {messages: n, __i18n: t.type.__i18nGlobal}));
		const r = Object.keys(n);
		if (r.length && r.forEach((e => {
			o.mergeLocaleMessage(e, n[e])
		})), my(e.datetimeFormats)) {
			const t = Object.keys(e.datetimeFormats);
			t.length && t.forEach((t => {
				o.mergeDateTimeFormat(t, e.datetimeFormats[t])
			}))
		}
		if (my(e.numberFormats)) {
			const t = Object.keys(e.numberFormats);
			t.length && t.forEach((t => {
				o.mergeNumberFormat(t, e.numberFormats[t])
			}))
		}
		return o
	}
	if ("parent" === r) {
		let r = function (e, t, n = !1) {
			let o = null;
			const r = t.root;
			let i = t.parent;
			for (; null != i;) {
				const t = e;
				if ("composition" === e.mode) o = t.__getInstance(i); else {
					const e = t.__getInstance(i);
					null != e && (o = e.__composer), n && o && !o[k_] && (o = null)
				}
				if (null != o) break;
				if (r === i) break;
				i = i.parent
			}
			return o
		}(n, t, e.__useComponent);
		return null == r && (r = o), r
	}
	if ("legacy" === n.mode) throw w_(18);
	const i = n;
	let a = i.__getInstance(t);
	if (null == a) {
		const n = t.type, r = sy({}, e);
		n.__i18n && (r.__i18n = n.__i18n), o && (r.__root = o), a = O_(r), function (e, t, n) {
			Io((() => {
			}), t), Ro((() => {
				e.__deleteInstance(t)
			}), t)
		}(i, t), i.__setInstance(t, a)
	}
	return a
}

const W_ = ["locale", "fallbackLocale", "availableLocales"], $_ = ["t", "rt", "d", "n", "tm"];
Ky = function (e, t = {}) {
	{
		const n = (t.onCacheKey || s_)(e), o = l_[n];
		if (o) return o;
		let r = !1;
		const i = t.onError || jy;
		t.onError = e => {
			r = !0, i(e)
		};
		const {code: a} = Gy(e, t), s = new Function(`return ${a}`)();
		return r ? s : l_[n] = s
	}
};
const Q_ = {
	orderInfo: "订单信息",
	confirmPay: "确认支付",
	payTitle: "确认付款",
	notHavePayType: "没有可用的支付方式",
	notObtainedInfo: "未获取到支付信息",
	paymentDocuments: "该支付单据",
	paySuccess: "支付成功",
	payFail: "支付失败",
	completePay: "已完成支付",
	incompletePay: "未完成支付",
	getting: "获取支付结果中"
}, U_ = {
	requestFail: "请求失败",
	notInDomainList: "不在request 合法域名列表中",
	currency: "￥",
	getSmsCode: "获取验证码",
	smsCodeChangeText: "秒后重新获取",
	captchaTitle: "请完成验证",
	confirm: "确认",
	cancel: "取消",
	save: "保存",
	delete: "删除",
	captchaPlaceholder: "请输入验证码",
	mobilePlaceholder: "请输入手机号码",
	mobileError: "请输入正确的手机号",
	codePlaceholder: "请输入手机验证码",
	memberCenter: "个人中心",
	userAgreement: "用户协议",
	privacyAgreement: "隐私协议",
	nickname: "昵称",
	nicknamePlaceholder: "请输入昵称",
	headimg: "头像",
	headimgPlaceholder: "请设置头像",
	getAvatarNickname: "获取您的昵称头像",
	getAvatarNicknameTips: "获取用户头像、昵称完善个人资料，主要用于向用户提供具有辨识度的用户中心界面",
	point: "积分",
	balance: "余额",
	login: "登录",
	register: "注册",
	complete: "完成",
	close: "关闭",
	pay: Q_,
	myBalance: "我的余额",
	myPoint: "我的积分",
	customerService: "联系客服",
	siteClose: "站点已关闭",
	noSite: "站点不存在"
}, X_ = Object.freeze(Object.defineProperty({
	__proto__: null,
	balance: "余额",
	cancel: "取消",
	captchaPlaceholder: "请输入验证码",
	captchaTitle: "请完成验证",
	close: "关闭",
	codePlaceholder: "请输入手机验证码",
	complete: "完成",
	confirm: "确认",
	currency: "￥",
	customerService: "联系客服",
	default: U_,
	getAvatarNickname: "获取您的昵称头像",
	getAvatarNicknameTips: "获取用户头像、昵称完善个人资料，主要用于向用户提供具有辨识度的用户中心界面",
	getSmsCode: "获取验证码",
	headimg: "头像",
	headimgPlaceholder: "请设置头像",
	login: "登录",
	memberCenter: "个人中心",
	mobileError: "请输入正确的手机号",
	mobilePlaceholder: "请输入手机号码",
	myBalance: "我的余额",
	myPoint: "我的积分",
	nickname: "昵称",
	nicknamePlaceholder: "请输入昵称",
	noSite: "站点不存在",
	notInDomainList: "不在request 合法域名列表中",
	pay: Q_,
	point: "积分",
	privacyAgreement: "隐私协议",
	register: "注册",
	requestFail: "请求失败",
	save: "保存",
	siteClose: "站点已关闭",
	smsCodeChangeText: "秒后重新获取",
	userAgreement: "用户协议"
}, Symbol.toStringTag, {value: "Module"})), Y_ = {index: "Index"}, J_ = Object.freeze(Object.defineProperty({
	__proto__: null,
	default: Y_,
	index: "Index"
}, Symbol.toStringTag, {value: "Module"}));
let G_ = function (e = {}) {
	const t = !hy(e.legacy) || e.legacy, n = !!e.globalInjection, o = new Map, r = t ? I_(e) : O_(e), i = ty(""), a = {
		get mode() {
			return t ? "legacy" : "composition"
		}, async install(e, ...o) {
			e.__VUE_I18N_SYMBOL__ = i, e.provide(e.__VUE_I18N_SYMBOL__, a), !t && n && function (e, t) {
				const n = Object.create(null);
				W_.forEach((e => {
					const o = Object.getOwnPropertyDescriptor(t, e);
					if (!o) throw w_(22);
					const r = tn(o.value) ? {
						get: () => o.value.value, set(e) {
							o.value.value = e
						}
					} : {get: () => o.get && o.get()};
					Object.defineProperty(n, e, r)
				})), e.config.globalProperties.$i18n = n, $_.forEach((n => {
					const o = Object.getOwnPropertyDescriptor(t, n);
					if (!o || !o.value) throw w_(22);
					Object.defineProperty(e.config.globalProperties, `$${n}`, o)
				}))
			}(e, a.global), function (e, t, ...n) {
				const o = by(n[0]) ? n[0] : {}, r = !!o.useI18nComponentName;
				(!hy(o.globalInstall) || o.globalInstall) && (e.component(r ? "i18n" : F_.name, F_), e.component(N_.name, N_), e.component(z_.name, z_)), e.directive("t", H_(t))
			}(e, a, ...o), t && e.mixin(function (e, t, n) {
				return {
					beforeCreate() {
						const o = ui();
						if (!o) throw w_(22);
						const r = this.$options;
						if (r.i18n) {
							const n = r.i18n;
							r.__i18n && (n.__i18n = r.__i18n), n.__root = t, this === this.$root ? this.$i18n = q_(e, n) : (n.__injectWithOption = !0, this.$i18n = I_(n))
						} else r.__i18n ? this === this.$root ? this.$i18n = q_(e, r) : this.$i18n = I_({
							__i18n: r.__i18n,
							__injectWithOption: !0,
							__root: t
						}) : this.$i18n = e;
						e.__onComponentInstanceCreated(this.$i18n), n.__setInstance(o, this.$i18n), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$tc = (...e) => this.$i18n.tc(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = e => this.$i18n.tm(e)
					}, mounted() {
					}, beforeUnmount() {
						const e = ui();
						if (!e) throw w_(22);
						delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, n.__deleteInstance(e), delete this.$i18n
					}
				}
			}(r, r.__composer, a))
		}, get global() {
			return r
		}, __instances: o, __getInstance: e => o.get(e) || null, __setInstance(e, t) {
			o.set(e, t)
		}, __deleteInstance(e) {
			o.delete(e)
		}
	};
	return a
}({locale: Ud(), globalInjection: !0, messages: {"zh-Hans": U_, en: Y_}});
const K_ = new class {
	constructor(e) {
		this.loadLocale = [], this.i18n = e
	}

	setI18nLanguage(e, t) {
		this.i18n.mode, this.i18n.global.locale = e, Xd(e)
	}

	async loadLocaleMessages(e, n) {
		try {
			const o = "/" == e ? "pages.index.index" : e.replace("/", "").replaceAll("/", ".");
			if (this.loadLocale.includes(`${n}/${o}`)) return this.setI18nLanguage(n, o), kn();
			this.loadLocale.push(`${n}/${o}`);
			const r = await ((e, t) => {
				const n = e[t];
				return n ? "function" == typeof n ? n() : Promise.resolve(n) : new Promise(((e, n) => {
					("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + t)))
				}))
			})(Object.assign({
				"./en/common.json": () => t((() => Promise.resolve().then((() => J_))), void 0),
				"./en/pages.setting.index.json": () => t((() => import("./locale-en-pages.setting.index.b1f97200.js")), []),
				"./zh-Hans/common.json": () => t((() => Promise.resolve().then((() => X_))), void 0),
				"./zh-Hans/pages.article.detail.json": () => t((() => import("./locale-zh-Hans-pages.article.detail.0050a1c5.js")), []),
				"./zh-Hans/pages.article.list.json": () => t((() => import("./locale-zh-Hans-pages.article.list.5ad66381.js")), []),
				"./zh-Hans/pages.auth.bind.json": () => t((() => import("./locale-zh-Hans-pages.auth.bind.52381448.js")), []),
				"./zh-Hans/pages.auth.login.json": () => t((() => import("./locale-zh-Hans-pages.auth.login.fece8bf2.js")), []),
				"./zh-Hans/pages.auth.register.json": () => t((() => import("./locale-zh-Hans-pages.auth.register.08253b92.js")), []),
				"./zh-Hans/pages.auth.resetpwd.json": () => t((() => import("./locale-zh-Hans-pages.auth.resetpwd.50c84166.js")), []),
				"./zh-Hans/pages.index.develop.json": () => t((() => import("./locale-zh-Hans-pages.index.develop.e1f957b5.js")), []),
				"./zh-Hans/pages.member.account.json": () => t((() => import("./locale-zh-Hans-pages.member.account.92769559.js")), []),
				"./zh-Hans/pages.member.account_edit.json": () => t((() => import("./locale-zh-Hans-pages.member.account_edit.aa4db7d8.js")), []),
				"./zh-Hans/pages.member.apply_cash_out.json": () => t((() => import("./locale-zh-Hans-pages.member.apply_cash_out.39ef1862.js")), []),
				"./zh-Hans/pages.member.balance.json": () => t((() => import("./locale-zh-Hans-pages.member.balance.83d25bfd.js")), []),
				"./zh-Hans/pages.member.cash_out.json": () => t((() => import("./locale-zh-Hans-pages.member.cash_out.ef838d77.js")), []),
				"./zh-Hans/pages.member.cash_out_detail.json": () => t((() => import("./locale-zh-Hans-pages.member.cash_out_detail.41b725ee.js")), []),
				"./zh-Hans/pages.member.commission.json": () => t((() => import("./locale-zh-Hans-pages.member.commission.f9e3b120.js")), []),
				"./zh-Hans/pages.member.detailed_account.json": () => t((() => import("./locale-zh-Hans-pages.member.detailed_account.f295af98.js")), []),
				"./zh-Hans/pages.member.personal.json": () => t((() => import("./locale-zh-Hans-pages.member.personal.2e77eb9b.js")), []),
				"./zh-Hans/pages.member.recharge_record.json": () => t((() => import("./locale-zh-Hans-pages.member.recharge_record.18b1a5e3.js")), []),
				"./zh-Hans/pages.member.recharge_record_detail.json": () => t((() => import("./locale-zh-Hans-pages.member.recharge_record_detail.2677f474.js")), []),
				"./zh-Hans/pages.member.withdrawal_detail.json": () => t((() => import("./locale-zh-Hans-pages.member.withdrawal_detail.9c1200d4.js")), []),
				"./zh-Hans/pages.setting.index.json": () => t((() => import("./locale-zh-Hans-pages.setting.index.bb67e7cc.js")), [])
			}), `./${n}/${o}.json`);
			return this.i18n.global.mergeLocaleMessage(n, r.default), this.setI18nLanguage(n, e), kn()
		} catch (o) {
			return this.setI18nLanguage(n, e), kn()
		}
	}
}(G_), Z_ = e => G_.global.t(e), ew = {
	install(e) {
		e.use(G_)
	}
}, tw = {
	pages: [{
		path: "pages/index/index",
		style: {navigationBarTitleText: "%pages.index.index%", enablePullDownRefresh: !0}
	}, {
		path: "pages/article/list",
		style: {navigationBarTitleText: "%pages.article.list%"}
	}, {
		path: "pages/auth/agreement",
		style: {navigationBarTitleText: "%pages.auth.agreement%"}
	}, {path: "pages/auth/bind", style: {navigationBarTitleText: "%pages.auth.bind%"}}, {
		path: "pages/auth/login",
		style: {navigationBarTitleText: "%pages.auth.login%"}
	}, {
		path: "pages/auth/register",
		style: {navigationBarTitleText: "%pages.auth.register%"}
	}, {
		path: "pages/auth/resetpwd",
		style: {navigationBarTitleText: "%pages.auth.resetpwd%"}
	}, {
		path: "pages/index/diy",
		style: {navigationBarTitleText: "%pages.index.diy%", enablePullDownRefresh: !0}
	}, {path: "pages/index/close", style: {navigationBarTitleText: "%pages.index.close%"}}, {
		path: "pages/index/nosite",
		style: {navigationBarTitleText: "%pages.index.nosite%"}
	}, {
		path: "pages/article/detail",
		style: {navigationBarTitleText: "%pages.article.detail%"}
	}, {
		path: "pages/member/apply_cash_out",
		style: {navigationBarTitleText: "%pages.member.apply_cash_out%"},
		needLogin: !0
	}, {
		path: "pages/member/commission",
		style: {navigationBarTitleText: "%pages.member.commission%"},
		needLogin: !0
	}, {
		path: "pages/member/balance",
		style: {navigationBarTitleText: "%pages.member.balance%"},
		needLogin: !0
	}, {
		path: "pages/member/recharge_record",
		style: {navigationBarTitleText: "%pages.member.recharge_record%"},
		needLogin: !0
	}, {
		path: "pages/member/recharge_record_detail",
		style: {navigationBarTitleText: "%pages.member.recharge_record_detail%"},
		needLogin: !0
	}, {
		path: "pages/member/detailed_account",
		style: {navigationBarTitleText: "%pages.member.detailed_account%"}
	}, {
		path: "pages/member/cash_out",
		style: {navigationBarTitleText: "%pages.member.cash_out%"}
	}, {
		path: "pages/member/cash_out_detail",
		style: {navigationBarTitleText: "%pages.member.cash_out_detail%"}
	}, {
		path: "pages/member/index",
		style: {navigationBarTitleText: "%pages.member.index%", enablePullDownRefresh: !0}
	}, {
		path: "pages/member/personal",
		style: {navigationBarTitleText: "%pages.member.personal%"},
		needLogin: !0
	}, {
		path: "pages/member/point",
		style: {navigationBarTitleText: "%pages.member.point%"},
		needLogin: !0
	}, {
		path: "pages/member/account",
		style: {navigationBarTitleText: "%pages.member.account%"},
		needLogin: !0
	}, {
		path: "pages/member/account_edit",
		style: {navigationBarTitleText: "%pages.member.account_edit%"},
		needLogin: !0
	}, {path: "pages/pay/browser", style: {navigationBarTitleText: "%pages.pay.browser%"}}, {
		path: "pages/pay/result",
		style: {navigationBarTitleText: "%pages.pay.result%"}
	}, {
		path: "pages/setting/index",
		style: {navigationBarTitleText: "%pages.setting.index%"},
		needLogin: !0
	}, {
		path: "pages/webview/index",
		style: {navigationBarTitleText: "%pages.webview.index%"}
	}, {path: "pages/index/develop", style: {navigationBarTitleText: "%pages.index.develop%"}}],
	globalStyle: {
		navigationBarTextStyle: "black",
		navigationBarTitleText: "",
		navigationBarBackgroundColor: "#ffffff",
		backgroundColor: "#F8F8F8",
		backgroundColorTop: "#F8F8F8",
		backgroundColorBottom: "#F8F8F8"
	},
	tabBar: {list: [{pagePath: "pages/index/index"}, {pagePath: "pages/article/list"}, {pagePath: "pages/member/index"}]},
	uniIdRouter: {},
	easycom: {
		custom: {
			"^u-(.*)": "uview-plus/components/u-$1/u-$1.vue",
			"diy-(.*)": "@/components/diy/$1/index.vue",
			"fixed-(.*)": "@/components/fixed/$1/index.vue"
		}
	}
};

function nw() {
	return "/" + tw.pages[0].path
}

/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let ow;
const rw = e => ow = e, iw = Symbol();

function aw(e) {
	return e && "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) && "function" != typeof e.toJSON
}

var sw, lw;
(lw = sw || (sw = {})).direct = "direct", lw.patchObject = "patch object", lw.patchFunction = "patch function";
const cw = "undefined" != typeof window;

function uw() {
	const e = Fe(!0), t = e.run((() => nn({})));
	let n = [], o = [];
	const r = Jt({
		install(e) {
			rw(r), r._a = e, e.provide(iw, r), e.config.globalProperties.$pinia = r, o.forEach((e => n.push(e))), o = []
		}, use(e) {
			return this._a ? n.push(e) : o.push(e), this
		}, _p: n, _a: null, _e: e, _s: new Map, state: t
	});
	return r
}

const dw = () => {
};

function pw(e, t, n, o = dw) {
	e.push(t);
	const r = () => {
		const n = e.indexOf(t);
		n > -1 && (e.splice(n, 1), o())
	};
	var i;
	return !n && je() && (i = r, Ie && Ie.cleanups.push(i)), r
}

function fw(e, ...t) {
	e.slice().forEach((e => {
		e(...t)
	}))
}

function hw(e, t) {
	e instanceof Map && t instanceof Map && t.forEach(((t, n) => e.set(n, t))), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (const n in t) {
		if (!t.hasOwnProperty(n)) continue;
		const o = t[n], r = e[n];
		aw(r) && aw(o) && e.hasOwnProperty(n) && !tn(o) && !$t(o) ? e[n] = hw(r, o) : e[n] = o
	}
	return e
}

const mw = Symbol();
const {assign: gw} = Object;

function vw(e, t, n, o) {
	const {state: r, actions: i, getters: a} = t, s = n.state.value[e];
	let l;
	return l = bw(e, (function () {
		s || (n.state.value[e] = r ? r() : {});
		const t = function (e) {
			const t = C(e) ? new Array(e.length) : {};
			for (const n in e) t[n] = dn(e, n);
			return t
		}(n.state.value[e]);
		return gw(t, i, Object.keys(a || {}).reduce(((t, o) => (t[o] = Jt(yi((() => {
			rw(n);
			const t = n._s.get(e);
			return a[o].call(t, t)
		}))), t)), {}))
	}), t, n, o, !0), l
}

function bw(e, t, n = {}, o, r, i) {
	let a;
	const s = gw({actions: {}}, n), l = {deep: !0};
	let c, u, d, p = Jt([]), f = Jt([]);
	const h = o.state.value[e];
	let m;

	function g(t) {
		let n;
		c = u = !1, "function" == typeof t ? (t(o.state.value[e]), n = {
			type: sw.patchFunction,
			storeId: e,
			events: d
		}) : (hw(o.state.value[e], t), n = {type: sw.patchObject, payload: t, storeId: e, events: d});
		const r = m = Symbol();
		kn().then((() => {
			m === r && (c = !0)
		})), u = !0, fw(p, n, o.state.value[e])
	}

	i || h || (o.state.value[e] = {}), nn({});
	const v = i ? function () {
		const {state: e} = n, t = e ? e() : {};
		this.$patch((e => {
			gw(e, t)
		}))
	} : dw;

	function b(t, n) {
		return function () {
			rw(o);
			const r = Array.from(arguments), i = [], a = [];

			function s(e) {
				i.push(e)
			}

			function l(e) {
				a.push(e)
			}

			let c;
			fw(f, {args: r, name: t, store: y, after: s, onError: l});
			try {
				c = n.apply(this && this.$id === e ? this : y, r)
			} catch (u) {
				throw fw(a, u), u
			}
			return c instanceof Promise ? c.then((e => (fw(i, e), e))).catch((e => (fw(a, e), Promise.reject(e)))) : (fw(i, c), c)
		}
	}

	const y = qt({
		_p: o, $id: e, $onAction: pw.bind(null, f), $patch: g, $reset: v, $subscribe(t, n = {}) {
			const r = pw(p, t, n.detached, (() => i())), i = a.run((() => Gn((() => o.state.value[e]), (o => {
				("sync" === n.flush ? u : c) && t({storeId: e, type: sw.direct, events: d}, o)
			}), gw({}, l, n))));
			return r
		}, $dispose: function () {
			a.stop(), p = [], f = [], o._s.delete(e)
		}
	});
	o._s.set(e, y);
	const _ = o._e.run((() => (a = Fe(), a.run((() => t())))));
	for (const T in _) {
		const t = _[T];
		if (tn(t) && (!tn(x = t) || !x.effect) || $t(t)) i || (!h || aw(w = t) && w.hasOwnProperty(mw) || (tn(t) ? t.value = h[T] : hw(t, h[T])), o.state.value[e][T] = t); else if ("function" == typeof t) {
			const e = b(T, t);
			_[T] = e, s.actions[T] = t
		}
	}
	var w, x;
	return gw(y, _), gw(Yt(y), _), Object.defineProperty(y, "$state", {
		get: () => o.state.value[e], set: e => {
			g((t => {
				gw(t, e)
			}))
		}
	}), o._p.forEach((e => {
		gw(y, a.run((() => e({store: y, app: o._a, pinia: o, options: s}))))
	})), h && i && n.hydrate && n.hydrate(y.$state, h), c = !0, u = !0, y
}

function yw(e, t, n) {
	let o, r;
	const i = "function" == typeof t;

	function a(e, n) {
		const a = ui();
		(e = e || a && Xn(iw, null)) && rw(e), (e = ow)._s.has(o) || (i ? bw(o, t, r, e) : vw(o, r, e));
		return e._s.get(o)
	}

	return "string" == typeof e ? (o = e, r = i ? n : t) : (r = e, o = e.id), a.$id = o, a
}

let _w = "Store";

function ww(e, t) {
	return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = function () {
		return e(this.$pinia)[n]
	}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = function () {
		const n = e(this.$pinia), r = t[o];
		return "function" == typeof r ? r.call(this, n) : n[r]
	}, n)), {})
}

const xw = ww;
const Tw = Object.freeze(Object.defineProperty({
	__proto__: null, get MutationType() {
		return sw
	}, PiniaVuePlugin: function (e) {
		e.mixin({
			beforeCreate() {
				const e = this.$options;
				if (e.pinia) {
					const t = e.pinia;
					if (!this._provided) {
						const e = {};
						Object.defineProperty(this, "_provided", {get: () => e, set: t => Object.assign(e, t)})
					}
					this._provided[iw] = t, this.$pinia || (this.$pinia = t), t._a = this, cw && rw(t)
				} else !this.$pinia && e.parent && e.parent.$pinia && (this.$pinia = e.parent.$pinia)
			}, destroyed() {
				delete this._pStores
			}
		})
	}, acceptHMRUpdate: function (e, t) {
		return () => {
		}
	}, createPinia: uw, defineStore: yw, getActivePinia: () => ui() && Xn(iw) || ow, mapActions: function (e, t) {
		return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = function (...t) {
			return e(this.$pinia)[n](...t)
		}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = function (...n) {
			return e(this.$pinia)[t[o]](...n)
		}, n)), {})
	}, mapGetters: xw, mapState: ww, mapStores: function (...e) {
		return e.reduce(((e, t) => (e[t.$id + _w] = function () {
			return t(this.$pinia)
		}, e)), {})
	}, mapWritableState: function (e, t) {
		return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = {
			get() {
				return e(this.$pinia)[n]
			}, set(t) {
				return e(this.$pinia)[n] = t
			}
		}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = {
			get() {
				return e(this.$pinia)[t[o]]
			}, set(n) {
				return e(this.$pinia)[t[o]] = n
			}
		}, n)), {})
	}, setActivePinia: rw, setMapStoreSuffix: function (e) {
		_w = e
	}, skipHydrate: function (e) {
		return Object.defineProperty(e, mw, {})
	}, storeToRefs: function (e) {
		{
			e = Yt(e);
			const t = {};
			for (const n in e) {
				const o = e[n];
				(tn(o) || $t(o)) && (t[n] = dn(e, n))
			}
			return t
		}
	}
}, Symbol.toStringTag, {value: "Module"})), Sw = yw("diy", {
	state: () => ({
		mode: "",
		pageMode: "diy",
		currentIndex: -99,
		global: {title: "", pageBgColor: "", bottomTabBarSwitch: !0, bgUrl: ""},
		value: []
	}), getters: {}, actions: {
		init() {
			var e = JSON.stringify({type: "init", load: !0});
			window.parent.postMessage(e, "*"), window.addEventListener("message", (e => {
				try {
					let t = JSON.parse(e.data);
					this.currentIndex = t.currentIndex, this.pageMode = t.pageMode, t.global && (this.global = t.global), t.value && (this.value = t.value), this.value && this.value.forEach(((e, t) => {
						e.pageStyle = "", e.pageBgColor && (e.pageStyle += "background-color:" + e.pageBgColor + ";"), e.margin && (e.pageStyle += "padding-top:" + 2 * e.margin.top + "rpx;", e.pageStyle += "padding-bottom:" + 2 * e.margin.bottom + "rpx;", e.pageStyle += "padding-right:" + 2 * e.margin.both + "rpx;", e.pageStyle += "padding-left:" + 2 * e.margin.both + "rpx;")
					}))
				} catch (t) {
					console.log("uniapp接受数据错误", t)
				}
			}), !1)
		}, postMessage(e, t) {
			if (this.currentIndex = e, t) var n = JSON.stringify({
				type: "data",
				index: this.currentIndex,
				global: Yt(this.global),
				value: Yt(this.value),
				component: Yt(t)
			});
			window.parent.postMessage(n, "*")
		}, changeCurrentIndex(e, t = null) {
			if ("" != this.mode && this.currentIndex != e) {
				this.currentIndex = e;
				var n = JSON.stringify({type: "change", index: e, component: Yt(t)});
				window.parent.postMessage(n, "*")
			}
		}
	}
});
const Ew = new class {
	constructor() {
		this.config = {
			url: "",
			header: {}
		}, this.baseUrl = `${location.origin}/api/`, "/" != this.baseUrl.substr(-1) && (this.baseUrl += "/");
		try {
			this.config.header["site-id"] = dx(""), this.config.header.channel = lx()
		} catch (e) {
		}
	}

	requestInterceptors() {
		try {
			ox() && (this.config.header.token = ox()), this.config.header.channel = lx(), this.config.header["site-id"] = dx("")
		} catch (e) {
		}
	}

	get(e, t = {}, n = {}) {
		return Object.assign(this.config, n), this.request("GET", e, t)
	}

	post(e, t = {}, n = {}) {
		return Object.assign(this.config, n), this.request("POST", e, t)
	}

	put(e, t = {}, n = {}) {
		return Object.assign(this.config, n), this.request("PUT", e, t)
	}

	delete(e, t = {}) {
		return Object.assign(this.config, t), this.request("DELETE", e)
	}

	upload(e, t = {}, n = {}) {
		this.requestInterceptors();
		const o = Object.assign(uni.$u.deepClone(this.config), {url: this.baseUrl + e, ...t});
		return new Promise(((e, t) => {
			Sg({
				...o, success: n => {
					const o = JSON.parse(n.data);
					1 == o.code ? (this.config.showSuccessMessage && Vg({
						title: o.msg,
						icon: "none"
					}), e(o)) : (0 == o.code ? Vg({title: o.msg, icon: "none"}) : this.handleAuthError(o.code), t(o))
				}, fail: e => {
					t(e)
				}
			})
		}))
	}

	request(e, t, n) {
		this.requestInterceptors();
		const o = Object.assign(uni.$u.deepClone(this.config), {url: this.baseUrl + t, method: e, data: n});
		return new Promise(((e, t) => {
			bg({
				...o, success: n => {
					const o = n.data;
					1 == o.code ? (this.config.showSuccessMessage && Vg({
						title: o.msg,
						icon: "none"
					}), e(o)) : (0 == o.code ? Vg({title: o.msg, icon: "none"}) : this.handleAuthError(o.code), t(o))
				}, fail: e => {
					t(e)
				}, complete: e => {
					this.handleRequestFail(e)
				}
			})
		}))
	}

	handleAuthError(e) {
		if (401 === e) Kw().logout()
	}

	handleRequestFail(e) {
		e.errMsg && "request:ok" == e.errMsg && "string" == typeof e.data ? Vg({
			icon: "none",
			title: this.baseUrl + Z_("requestFail")
		}) : "request:fail" != e.errMsg ? e.errMsg && "request:fail url not in domain list" == e.errMsg && Vg({
			icon: "none",
			title: this.baseUrl + Z_("notInDomainList")
		}) : Vg({icon: "none", title: this.baseUrl + Z_("requestFail")})
	}
};

function kw(e) {
	return Ew.get("member/account/point", e)
}

function Aw(e) {
	return Ew.get("member/account/balance", e)
}

function Cw(e) {
	return Ew.get("member/account/money", e)
}

function Bw(e) {
	return Ew.put(`member/modify/${e.field}`, e, {showErrorMessage: !0})
}

function Pw(e) {
	return Ew.post("order/recharge", e, {showErrorMessage: !0})
}

function Lw(e) {
	return Ew.get("order/recharge", e, {showErrorMessage: !0})
}

function Ow(e) {
	return Ew.get(`order/recharge/${e}`, {}, {showErrorMessage: !0})
}

function Iw(e) {
	return Ew.put("member/mobile", e, {showErrorMessage: !0})
}

function Mw() {
	return Ew.get("member/cash_out/config")
}

function Fw(e) {
	return Ew.post("member/cash_out/apply", e, {showSuccessMessage: !0, showErrorMessage: !0})
}

function jw(e) {
	return Ew.get(`member/cashout_account/${e.account_id}`, {})
}

function Rw(e) {
	return Ew.get("member/cashout_account/firstinfo", e)
}

function Nw(e) {
	return Ew.get("member/cashout_account", e)
}

function Dw(e) {
	return Ew.get("member/cash_out", e)
}

function zw(e) {
	return Ew.get(`member/cash_out/${e}`)
}

function Hw(e) {
	return Ew.post("member/cashout_account", e, {showSuccessMessage: !0, showErrorMessage: !0})
}

function qw(e) {
	return Ew.put(`member/cashout_account/${e.account_id}`, e, {showSuccessMessage: !0, showErrorMessage: !0})
}

function Vw(e) {
	return Ew.delete(`member/cashout_account/${e}`, {showSuccessMessage: !0, showErrorMessage: !0})
}

function Ww(e) {
	return Ew.get("member/account/commission", e)
}

function $w(e) {
	return Ew.get("login", e, {showErrorMessage: !0})
}

function Qw(e) {
	return Ew.post("login/mobile", e, {showErrorMessage: !0})
}

function Uw(e) {
	let t = "register";
	return e.pid && (t += `?pid=${e.pid}`), Ew.post(t, e, {showErrorMessage: !0})
}

function Xw(e) {
	let t = "register/mobile";
	return e.pid && (t += `?pid=${e.pid}`), Ew.post(t, e, {showErrorMessage: !0})
}

function Yw(e) {
	return Ew.post("wechat/login", e)
}

function Jw(e) {
	let t = "bind";
	return e.pid && (t += `?pid=${e.pid}`), Ew.post(t, e, {showErrorMessage: !0})
}

function Gw(e) {
	return Ew.post("member/log", e, {showErrorMessage: !1})
}

const Kw = yw("member", {
	state: () => ({token: uni.getStorageSync("wapToken"), info: null}),
	actions: {
		async setToken(e) {
			this.token = e, function (e) {
				uni.setStorageSync("wapToken", e)
			}(e), await this.getMemberInfo()
		}, async getMemberInfo() {
			this.token && await Ew.get("member/member").then((e => {
				this.info = e.data
			})).catch((async () => {
				await this.logout()
			}))
		}, async logout(e = !1) {
			this.token && await Ew.put("auth/logout").then((() => {
				this.$reset(), rx(), e && Zw({url: "/pages/index/index"})
			})).catch((() => {
				this.$reset(), rx(), e && Zw({url: "/pages/index/index"})
			}))
		}
	}
}), Zw = e => {
	if ("decorate" == Sw().mode) return;
	let {url: t, mode: n, param: o, success: r, fail: i, complete: a} = e;
	n = n || "navigateTo";
	switch (tw.tabBar.list.map((e => `/${e.pagePath}`)).includes(t) && (n = "switchTab"), "switchTab" != n && o && Object.keys(o).length && (t += uni.$u.queryParams(o)), n) {
		case"switchTab":
			Lg({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					a && a()
				}
			});
			break;
		case"navigateTo":
			Ag({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					a && a()
				}
			});
			break;
		case"reLaunch":
			Bg({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					a && a()
				}
			});
			break;
		case"redirectTo":
			Cg({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					a && a()
				}
			})
	}
}, ex = e => {
	"decorate" != Sw().mode && null != e && 1 != Object.keys(e).length && e.url && (-1 != e.url.indexOf("http") || -1 != e.url.indexOf("http") ? window.location.href = e.url : Zw({url: e.url}))
}, tx = () => {
	const e = Hh(), t = e[e.length - 1];
	return t ? t.route : ""
}, nx = () => {
	const e = Hh();
	let t = e[e.length - 1].route, n = e[e.length - 1].$page.options, o = {};
	for (let r in n) o[r] = n[r];
	return {path: "/" + t, params: o}
};

function ox() {
	return Kw().token
}

function rx() {
	uni.removeStorageSync("wapToken")
}

function ix(e) {
	const t = {}, [n, o] = e.split("?");
	return o && o.split("&").forEach((e => {
		let [n, o] = e.split("=");
		t[n] = o
	})), {path: n, query: t}
}

function ax(e) {
	return -1 != (t = e).indexOf("http://") || -1 != t.indexOf("https://") ? e : `${location.origin}/${e}`;
	var t
}

function sx() {
	let e = navigator.userAgent.toLowerCase();
	return !!/micromessenger/.test(e)
}

function lx() {
	return sx() ? "wechat" : "h5"
}

function cx(e) {
	return isNaN(parseFloat(e)) ? e : parseFloat(e).toFixed(2)
}

function ux(e) {
	return e.substring(0, 3) + "****" + e.substr(e.length - 4)
}

function dx(e) {
	const t = location.href.match(/\/wap\/(\d*)\//);
	return t ? t[1] : e
}

function px() {
	return Ew.get("captcha", {}, {showErrorMessage: !0})
}

function fx(e) {
	return Ew.post("wechat/sync", e)
}

function hx(e) {
	return Ew.get(`agreement/${e}`)
}

function mx(e) {
	return Ew.post("password/reset", e, {showErrorMessage: !0})
}

function gx(e) {
	return Ew.post(`send/mobile/${e.type}`, e, {showErrorMessage: !0})
}

function vx(e) {
	return Ew.get("wechat/jssdkconfig", e)
}

function bx(e) {
	return Ew.upload("file/image", e, {showErrorMessage: !0})
}

function yx(e) {
	return Ew.get("diy/diy", e)
}

function _x(e) {
	return Ew.get("diy/share", e)
}

const wx = yw("config", {
	state: () => ({
		login: {
			is_username: 0,
			is_mobile: 0,
			is_auth_register: 0,
			is_bind_mobile: 0,
			agreement_show: 0
		}, tabbar: null
	}), actions: {
		async getLoginConfig() {
			await Ew.get("login/config").then((e => {
				this.login.is_username = parseInt(e.data.is_username), this.login.is_mobile = parseInt(e.data.is_mobile), this.login.is_auth_register = parseInt(e.data.is_auth_register), this.login.is_bind_mobile = parseInt(e.data.is_bind_mobile), this.login.agreement_show = parseInt(e.data.agreement_show)
			})).catch((() => {
			}))
		}, async getTabbarConfig() {
			await Ew.get("diy/tabbar").then((e => {
				this.tabbar = e.data
			})).catch((() => {
			}))
		}
	}
});

function xx() {
	return {
		setLoginBack: e => {
			uni.setStorage({key: "loginBack", data: e}), setTimeout((() => {
				const e = wx();
				sx() && uni.getStorageSync("openid") && e.login.is_bind_mobile ? Zw({
					url: "/pages/auth/bind",
					mode: "redirectTo"
				}) : Zw({url: "/pages/auth/login", mode: "redirectTo"})
			}))
		}, handleLoginBack: () => {
			uni.getStorage({
				key: "loginBack", success: e => {
					Zw(e ? e.data : {url: "/pages/index/index"})
				}, fail: e => {
					Zw({url: "/pages/index/index"})
				}
			})
		}, authLogin: e => {
			let t = null;
			t = Yw, t({code: e}).then((e => {
				e.data.token ? Kw().setToken(e.data.token) : uni.setStorageSync("openid", e.data.openid)
			}))
		}, getAuthCode: (e = "snsapi_base") => {
			let t = `${location.origin}${location.pathname}`, n = ix(location.href).query;
			var o;
			n.code && delete n.code, Object.keys(n).length && (t += uni.$u.queryParams(n)), (o = {
				url: t,
				scopes: e
			}, Ew.get("wechat/codeurl", o)).then((e => {
				location.href = e.data.url
			}))
		}
	}
}

const Tx = xx();

function Sx(e) {
	(function () {
		const e = [];
		return tw.pages.forEach((t => {
			t.needLogin && e.push(`/${t.path}`)
		})), tw.subPackages && tw.subPackages.forEach((t => {
			t.pages.forEach((n => {
				n.needLogin && e.push(`/${t.root}/${n.path}`)
			}))
		})), e
	})().includes(e.path) && !ox() && setTimeout((() => {
		Tx.setLoginBack({url: e.path, param: e.query || {}})
	}), 100)
}

const Ex = yw("system", {
	state: () => ({site: null}), actions: {
		async getSitenfo() {
			await Ew.get("site").then((e => {
				this.site = e.data, 3 == this.site.status && Zw({url: "/pages/index/close", mode: "reLaunch"})
			})).catch((e => {
				Zw({url: "/pages/index/nosite", mode: "reLaunch"})
			}))
		}
	}
}), kx = po({
	__name: "App", setup: e => (({}.VITE_APP_DEBUG && new window.VConsole, Qb((async e => {
		(() => {
			const e = Jd();
			e.path = `/${e.path}`, K_.loadLocaleMessages(e.path, Ud()), Sx(e), e.query && e.query.mid && uni.setStorageSync("pid", e.query.mid), ox() && Gw({
				route: e.path,
				params: JSON.stringify(e.query || {}),
				pre_route: ""
			})
		})(), ["navigateTo", "redirectTo", "reLaunch", "switchTab"].forEach((e => {
			yd(e, {
				invoke(e) {
					const t = ix(e.url);
					K_.loadLocaleMessages(t.path, Ud()), Sx(t), ox() && Gw({
						route: t.path,
						params: JSON.stringify(t.query),
						pre_route: Hh()[0].route
					})
				}
			})
		})), "ios" == Dm().platform && uni.setStorageSync("initUrl", location.href);
		const t = wx();
		if (t.getTabbarConfig(), await t.getLoginConfig(), Ex().getSitenfo(), nv(), ox()) {
			const e = Kw();
			await e.setToken(ox())
		}
		if (!ox()) {
			const t = xx();
			sx() && (e.query.code ? t.authLogin(e.query.code) : t.getAuthCode("snsapi_userinfo"))
		}
		window.addEventListener("popstate", (function (e) {
			const t = "/" + location.pathname.replace(Zb.h5.router.base, "");
			K_.loadLocaleMessages(t, Ud())
		}), !1)
	})), Wb((() => {
	})), $b((() => {
	})), () => {
	}))
});
hm(kx, {
	init: pm, setup(e) {
		const t = Ch(), n = () => {
			var n;
			n = e, Object.keys(Yd).forEach((e => {
				Yd[e].forEach((t => {
					Po(e, t, n)
				}))
			}));
			const {onLaunch: o, onShow: r, onPageNotFound: i, onError: a} = e, s = function ({path: e, query: t}) {
				return S(Bp, {path: e, query: t}), S(Pp, Bp), S({}, Bp)
			}({path: t.path.slice(1) || __uniRoutes[0].meta.route, query: ye(t.query)});
			if (o && J(o, s), r && J(r, s), !t.matched.length) {
				const e = {notFound: !0, openType: "appLaunch", path: t.path, query: {}, scene: 1001};
				i && J(i, e)
			}
			a && (e.appContext.config.errorHandler = e => {
				J(a, e)
			})
		};
		return Xn(tl).isReady().then(n), Io((() => {
			window.addEventListener("resize", xe(gm, 50, {
				setTimeout: setTimeout,
				clearTimeout: clearTimeout
			})), window.addEventListener("message", vm), document.addEventListener("visibilitychange", bm), function () {
				let e = null;
				try {
					e = window.matchMedia("(prefers-color-scheme: dark)")
				} catch (t) {
				}
				if (e) {
					let t = e => {
						fv.emit("onThemeChange", {theme: e.matches ? "dark" : "light"})
					};
					e.addEventListener ? e.addEventListener("change", t) : e.addListener(t)
				}
			}()
		})), t.query
	}, before(e) {
		e.mpType = "app";
		const {setup: t} = e, n = () => (zr(), $r(dv));
		e.setup = (e, o) => {
			const r = t && t(e, o);
			return O(r) ? n : r
		}, e.render = n
	}
});
const Ax = {
	props: {
		customStyle: {type: [Object, String], default: () => ({})},
		customClass: {type: String, default: ""},
		url: {type: String, default: ""},
		linkType: {type: String, default: "navigateTo"}
	},
	data: () => ({}),
	onLoad() {
		this.$u.getRect = this.$uGetRect
	},
	created() {
		this.$u.getRect = this.$uGetRect
	},
	computed: {
		$u: () => uni.$u.deepMerge(uni.$u, {props: void 0, http: void 0, mixin: void 0}),
		bem: () => function (e, t, n) {
			const o = `u-${e}--`, r = {};
			return t && t.map((e => {
				r[o + this[e]] = !0
			})), n && n.map((e => {
				this[e] ? r[o + e] = this[e] : delete r[o + e]
			})), Object.keys(r)
		}
	},
	methods: {
		openPage(e = "url") {
			const t = this[e];
			t && this.$u.route({type: this.linkType, url: t})
		}, $uGetRect(e, t) {
			return new Promise((n => {
				Qd().in(this)[t ? "selectAll" : "select"](e).boundingClientRect((e => {
					t && Array.isArray(e) && e.length && n(e), !t && e && n(e)
				})).exec()
			}))
		}, getParentData(e = "") {
			this.parent || (this.parent = {}), this.parent = uni.$u.$parent.call(this, e), this.parent.children && -1 === this.parent.children.indexOf(this) && this.parent.children.push(this), this.parent && this.parentData && Object.keys(this.parentData).map((e => {
				this.parentData[e] = this.parent[e]
			}))
		}, preventEvent(e) {
			e && "function" == typeof e.stopPropagation && e.stopPropagation()
		}, noop(e) {
			this.preventEvent(e)
		}
	},
	onReachBottom() {
		Td("uOnReachBottom")
	},
	beforeDestroy() {
		if (this.parent && uni.$u.test.array(this.parent.children)) {
			const e = this.parent.children;
			e.map(((t, n) => {
				t === this && e.splice(n, 1)
			}))
		}
	}
}, Cx = {}, {toString: Bx} = Object.prototype;

function Px(e) {
	return "[object Array]" === Bx.call(e)
}

function Lx(e, t) {
	if (null != e) if ("object" != typeof e && (e = [e]), Px(e)) for (let n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e); else for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.call(null, e[n], n, e)
}

function Ox() {
	const e = {};

	function t(t, n) {
		"object" == typeof e[n] && "object" == typeof t ? e[n] = Ox(e[n], t) : e[n] = "object" == typeof t ? Ox({}, t) : t
	}

	for (let n = 0, o = arguments.length; n < o; n++) Lx(arguments[n], t);
	return e
}

function Ix(e) {
	return void 0 === e
}

function Mx(e) {
	return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function Fx(e, t) {
	if (!t) return e;
	let n;
	if (o = t, "undefined" != typeof URLSearchParams && o instanceof URLSearchParams) n = t.toString(); else {
		const e = [];
		Lx(t, ((t, n) => {
			null != t && (Px(t) ? n = `${n}[]` : t = [t], Lx(t, (t => {
				!function (e) {
					return "[object Date]" === Bx.call(e)
				}(t) ? function (e) {
					return null !== e && "object" == typeof e
				}(t) && (t = JSON.stringify(t)) : t = t.toISOString(), e.push(`${Mx(n)}=${Mx(t)}`)
			})))
		})), n = e.join("&")
	}
	var o;
	if (n) {
		const t = e.indexOf("#");
		-1 !== t && (e = e.slice(0, t)), e += (-1 === e.indexOf("?") ? "?" : "&") + n
	}
	return e
}

const jx = (e, t) => {
	const n = {};
	return e.forEach((e => {
		Ix(t[e]) || (n[e] = t[e])
	})), n
}, Rx = e => (e => new Promise(((t, n) => {
	const o = Fx((r = e.baseURL, i = e.url, r && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(i) ? function (e, t) {
		return t ? `${e.replace(/\/+$/, "")}/${t.replace(/^\/+/, "")}` : e
	}(r, i) : i), e.params);
	var r, i;
	const a = {
		url: o, header: e.header, complete: r => {
			e.fullPath = o, r.config = e;
			try {
				"string" == typeof r.data && (r.data = JSON.parse(r.data))
			} catch (i) {
			}
			!function (e, t, n) {
				const {validateStatus: o} = n.config, r = n.statusCode;
				!r || o && !o(r) ? t(n) : e(n)
			}(t, n, r)
		}
	};
	let s;
	if ("UPLOAD" === e.method) {
		delete a.header["content-type"], delete a.header["Content-Type"];
		const t = {filePath: e.filePath, name: e.name}, n = ["files", "file", "timeout", "formData"];
		s = Sg({...a, ...t, ...jx(n, e)})
	} else if ("DOWNLOAD" === e.method) Ix(e.timeout) || (a.timeout = e.timeout), s = xg(a); else {
		const t = ["data", "method", "timeout", "dataType", "responseType", "withCredentials"];
		s = bg({...a, ...jx(t, e)})
	}
	e.getTask && e.getTask(s, e)
})))(e);

function Nx() {
	this.handlers = []
}

Nx.prototype.use = function (e, t) {
	return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
}, Nx.prototype.eject = function (e) {
	this.handlers[e] && (this.handlers[e] = null)
}, Nx.prototype.forEach = function (e) {
	this.handlers.forEach((t => {
		null !== t && e(t)
	}))
};
const Dx = (e, t, n) => {
	const o = {};
	return e.forEach((e => {
		Ix(n[e]) ? Ix(t[e]) || (o[e] = t[e]) : o[e] = n[e]
	})), o
}, zx = {
	baseURL: "",
	header: {},
	method: "GET",
	dataType: "json",
	responseType: "text",
	custom: {},
	timeout: 6e4,
	withCredentials: !1,
	validateStatus: function (e) {
		return e >= 200 && e < 300
	}
};
var Hx = function () {
	function e(e, t) {
		return null != t && e instanceof t
	}

	var t, n, o;
	try {
		t = Map
	} catch (s) {
		t = function () {
		}
	}
	try {
		n = Set
	} catch (s) {
		n = function () {
		}
	}
	try {
		o = Promise
	} catch (s) {
		o = function () {
		}
	}

	function r(i, s, l, c, u) {
		"object" == typeof s && (l = s.depth, c = s.prototype, u = s.includeNonEnumerable, s = s.circular);
		var d = [], p = [], f = "undefined" != typeof Buffer;
		return void 0 === s && (s = !0), void 0 === l && (l = 1 / 0), function i(l, h) {
			if (null === l) return null;
			if (0 === h) return l;
			var m, g;
			if ("object" != typeof l) return l;
			if (e(l, t)) m = new t; else if (e(l, n)) m = new n; else if (e(l, o)) m = new o((function (e, t) {
				l.then((function (t) {
					e(i(t, h - 1))
				}), (function (e) {
					t(i(e, h - 1))
				}))
			})); else if (r.__isArray(l)) m = []; else if (r.__isRegExp(l)) m = new RegExp(l.source, a(l)), l.lastIndex && (m.lastIndex = l.lastIndex); else if (r.__isDate(l)) m = new Date(l.getTime()); else {
				if (f && Buffer.isBuffer(l)) return Buffer.from ? m = Buffer.from(l) : (m = new Buffer(l.length), l.copy(m)), m;
				e(l, Error) ? m = Object.create(l) : void 0 === c ? (g = Object.getPrototypeOf(l), m = Object.create(g)) : (m = Object.create(c), g = c)
			}
			if (s) {
				var v = d.indexOf(l);
				if (-1 != v) return p[v];
				d.push(l), p.push(m)
			}
			for (var b in e(l, t) && l.forEach((function (e, t) {
				var n = i(t, h - 1), o = i(e, h - 1);
				m.set(n, o)
			})), e(l, n) && l.forEach((function (e) {
				var t = i(e, h - 1);
				m.add(t)
			})), l) {
				Object.getOwnPropertyDescriptor(l, b) && (m[b] = i(l[b], h - 1));
				try {
					if ("undefined" === Object.getOwnPropertyDescriptor(l, b).set) continue;
					m[b] = i(l[b], h - 1)
				} catch (S) {
					if (S instanceof TypeError) continue;
					if (S instanceof ReferenceError) continue
				}
			}
			if (Object.getOwnPropertySymbols) {
				var y = Object.getOwnPropertySymbols(l);
				for (b = 0; b < y.length; b++) {
					var _ = y[b];
					(!(x = Object.getOwnPropertyDescriptor(l, _)) || x.enumerable || u) && (m[_] = i(l[_], h - 1), Object.defineProperty(m, _, x))
				}
			}
			if (u) {
				var w = Object.getOwnPropertyNames(l);
				for (b = 0; b < w.length; b++) {
					var x, T = w[b];
					(x = Object.getOwnPropertyDescriptor(l, T)) && x.enumerable || (m[T] = i(l[T], h - 1), Object.defineProperty(m, T, x))
				}
			}
			return m
		}(i, l)
	}

	function i(e) {
		return Object.prototype.toString.call(e)
	}

	function a(e) {
		var t = "";
		return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), t
	}

	return r.clonePrototype = function (e) {
		if (null === e) return null;
		var t = function () {
		};
		return t.prototype = e, new t
	}, r.__objToStr = i, r.__isDate = function (e) {
		return "object" == typeof e && "[object Date]" === i(e)
	}, r.__isArray = function (e) {
		return "object" == typeof e && "[object Array]" === i(e)
	}, r.__isRegExp = function (e) {
		return "object" == typeof e && "[object RegExp]" === i(e)
	}, r.__getRegExpFlags = a, r
}();
const qx = (new class {
	constructor() {
		this.config = {
			type: "navigateTo",
			url: "",
			delta: 1,
			params: {},
			animationType: "pop-in",
			animationDuration: 300,
			intercept: !1
		}, this.route = this.route.bind(this)
	}

	addRootPath(e) {
		return "/" === e[0] ? e : `/${e}`
	}

	mixinParam(e, t) {
		e = e && this.addRootPath(e);
		let n = "";
		return /.*\/.*\?.*=.*/.test(e) ? (n = uni.$u.queryParams(t, !1), e + `&${n}`) : (n = uni.$u.queryParams(t), e + n)
	}

	async route(e = {}, t = {}) {
		let n = {};
		if ("string" == typeof e ? (n.url = this.mixinParam(e, t), n.type = "navigateTo") : (n = uni.$u.deepMerge(this.config, e), n.url = this.mixinParam(e.url, e.params)), n.url !== uni.$u.page()) if (t.intercept && (this.config.intercept = t.intercept), n.params = t, n = uni.$u.deepMerge(this.config, n), "function" == typeof uni.$u.routeIntercept) {
			await new Promise(((e, t) => {
				uni.$u.routeIntercept(n, e)
			})) && this.openPage(n)
		} else this.openPage(n)
	}

	openPage(e) {
		const {url: t, type: n, delta: o, animationType: r, animationDuration: i} = e;
		"navigateTo" != e.type && "to" != e.type || Ag({
			url: t,
			animationType: r,
			animationDuration: i
		}), "redirectTo" != e.type && "redirect" != e.type || Cg({url: t}), "switchTab" != e.type && "tab" != e.type || Lg({url: t}), "reLaunch" != e.type && "launch" != e.type || Bg({url: t}), "navigateBack" != e.type && "back" != e.type || Eg({delta: o})
	}
}).route;

function Vx(e, t = !0) {
	if ((e = String(e).toLowerCase()) && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)) {
		if (4 === e.length) {
			let t = "#";
			for (let n = 1; n < 4; n += 1) t += e.slice(n, n + 1).concat(e.slice(n, n + 1));
			e = t
		}
		const n = [];
		for (let t = 1; t < 7; t += 2) n.push(parseInt(`0x${e.slice(t, t + 2)}`));
		return t ? `rgb(${n[0]},${n[1]},${n[2]})` : n
	}
	if (/^(rgb|RGB)/.test(e)) {
		return e.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",").map((e => Number(e)))
	}
	return e
}

function Wx(e) {
	const t = e;
	if (/^(rgb|RGB)/.test(t)) {
		const e = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		let n = "#";
		for (let t = 0; t < e.length; t++) {
			let o = Number(e[t]).toString(16);
			o = 1 == String(o).length ? `0${o}` : o, "0" === o && (o += o), n += o
		}
		return 7 !== n.length && (n = t), n
	}
	if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) return t;
	{
		const e = t.replace(/#/, "").split("");
		if (6 === e.length) return t;
		if (3 === e.length) {
			let t = "#";
			for (let n = 0; n < e.length; n += 1) t += e[n] + e[n];
			return t
		}
	}
}

const $x = {
	colorGradient: function (e = "rgb(0, 0, 0)", t = "rgb(255, 255, 255)", n = 10) {
		const o = Vx(e, !1), r = o[0], i = o[1], a = o[2], s = Vx(t, !1), l = (s[0] - r) / n, c = (s[1] - i) / n,
			u = (s[2] - a) / n, d = [];
		for (let p = 0; p < n; p++) {
			let o = Wx(`rgb(${Math.round(l * p + r)},${Math.round(c * p + i)},${Math.round(u * p + a)})`);
			0 === p && (o = Wx(e)), p === n - 1 && (o = Wx(t)), d.push(o)
		}
		return d
	}, hexToRgb: Vx, rgbToHex: Wx, colorToRgba: function (e, t) {
		e = Wx(e);
		let n = String(e).toLowerCase();
		if (n && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(n)) {
			if (4 === n.length) {
				let e = "#";
				for (let t = 1; t < 4; t += 1) e += n.slice(t, t + 1).concat(n.slice(t, t + 1));
				n = e
			}
			const e = [];
			for (let t = 1; t < 7; t += 2) e.push(parseInt(`0x${n.slice(t, t + 2)}`));
			return `rgba(${e.join(",")},${t})`
		}
		return n
	}
};

function Qx(e) {
	return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(e)
}

function Ux(e) {
	switch (typeof e) {
		case"undefined":
			return !0;
		case"string":
			if (0 == e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length) return !0;
			break;
		case"boolean":
			if (!e) return !0;
			break;
		case"number":
			if (0 === e || isNaN(e)) return !0;
			break;
		case"object":
			if (null === e || 0 === e.length) return !0;
			for (const t in e) return !1;
			return !0
	}
	return !1
}

function Xx(e) {
	return "[object Object]" === Object.prototype.toString.call(e)
}

function Yx(e) {
	return "function" == typeof e
}

const Jx = {
	email: function (e) {
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e)
	}, mobile: function (e) {
		return /^1[23456789]\d{9}$/.test(e)
	}, url: function (e) {
		return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(e)
	}, date: function (e) {
		return !!e && (Qx(e) && (e = +e), !/Invalid|NaN/.test(new Date(e).toString()))
	}, dateISO: function (e) {
		return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
	}, number: Qx, digits: function (e) {
		return /^\d+$/.test(e)
	}, idCard: function (e) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e)
	}, carNo: function (e) {
		const t = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/,
			n = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
		return 7 === e.length ? n.test(e) : 8 === e.length && t.test(e)
	}, amount: function (e) {
		return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(e)
	}, chinese: function (e) {
		return /^[\u4e00-\u9fa5]+$/gi.test(e)
	}, letter: function (e) {
		return /^[a-zA-Z]*$/.test(e)
	}, enOrNum: function (e) {
		return /^[0-9a-zA-Z]*$/g.test(e)
	}, contains: function (e, t) {
		return e.indexOf(t) >= 0
	}, range: function (e, t) {
		return e >= t[0] && e <= t[1]
	}, rangeLength: function (e, t) {
		return e.length >= t[0] && e.length <= t[1]
	}, empty: Ux, isEmpty: Ux, jsonString: function (e) {
		if ("string" == typeof e) try {
			const t = JSON.parse(e);
			return !("object" != typeof t || !t)
		} catch (t) {
			return !1
		}
		return !1
	}, landline: function (e) {
		return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(e)
	}, object: Xx, array: function (e) {
		return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
	}, code: function (e, t = 6) {
		return new RegExp(`^\\d{${t}}$`).test(e)
	}, func: Yx, promise: function (e) {
		return Xx(e) && Yx(e.then) && Yx(e.catch)
	}, video: function (e) {
		return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i.test(e)
	}, image: function (e) {
		const t = e.split("?")[0];
		return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i.test(t)
	}, regExp: function (e) {
		return e && "[object RegExp]" === Object.prototype.toString.call(e)
	}, string: function (e) {
		return "string" == typeof e
	}
};
let Gx, Kx = null;

function Zx(e, t = 15) {
	return +parseFloat(Number(e).toPrecision(t))
}

function eT(e) {
	const t = e.toString().split(/[eE]/), n = (t[0].split(".")[1] || "").length - +(t[1] || 0);
	return n > 0 ? n : 0
}

function tT(e) {
	if (-1 === e.toString().indexOf("e")) return Number(e.toString().replace(".", ""));
	const t = eT(e);
	return t > 0 ? Zx(Number(e) * Math.pow(10, t)) : Number(e)
}

function nT(e) {
	(e > Number.MAX_SAFE_INTEGER || e < Number.MIN_SAFE_INTEGER) && console.warn(`${e} 超出了精度限制，结果可能不正确`)
}

function oT(e, t) {
	const [n, o, ...r] = e;
	let i = t(n, o);
	return r.forEach((e => {
		i = t(i, e)
	})), i
}

function rT(...e) {
	if (e.length > 2) return oT(e, rT);
	const [t, n] = e, o = tT(t), r = tT(n), i = eT(t) + eT(n), a = o * r;
	return nT(a), a / Math.pow(10, i)
}

function iT(...e) {
	if (e.length > 2) return oT(e, iT);
	const [t, n] = e, o = tT(t), r = tT(n);
	return nT(o), nT(r), rT(o / r, Zx(Math.pow(10, eT(n) - eT(t))))
}

function aT(e) {
	if ([null, void 0, NaN, !1].includes(e)) return e;
	if ("object" != typeof e && "function" != typeof e) return e;
	const t = Jx.array(e) ? [] : {};
	for (const n in e) e.hasOwnProperty(n) && (t[n] = "object" == typeof e[n] ? aT(e[n]) : e[n]);
	return t
}

function sT(e = null, t = "yyyy-mm-dd") {
	let n;
	n = e ? /^\d{10}$/.test(e.toString().trim()) ? new Date(1e3 * e) : "string" == typeof e && /^\d+$/.test(e.trim()) ? new Date(Number(e)) : new Date("string" == typeof e ? e.replace(/-/g, "/") : e) : new Date;
	const o = {
		y: n.getFullYear().toString(),
		m: (n.getMonth() + 1).toString().padStart(2, "0"),
		d: n.getDate().toString().padStart(2, "0"),
		h: n.getHours().toString().padStart(2, "0"),
		M: n.getMinutes().toString().padStart(2, "0"),
		s: n.getSeconds().toString().padStart(2, "0")
	};
	for (const r in o) {
		const [e] = new RegExp(`${r}+`).exec(t) || [];
		if (e) {
			const n = "y" === r && 2 === e.length ? 2 : 0;
			t = t.replace(e, o[r].slice(n))
		}
	}
	return t
}

function lT(e, t = "both") {
	return e = String(e), "both" == t ? e.replace(/^\s+|\s+$/g, "") : "left" == t ? e.replace(/^\s*/, "") : "right" == t ? e.replace(/(\s*$)/g, "") : "all" == t ? e.replace(/\s+/g, "") : e
}

String.prototype.padStart || (String.prototype.padStart = function (e, t = " ") {
	if ("[object String]" !== Object.prototype.toString.call(t)) throw new TypeError("fillString must be String");
	const n = this;
	if (n.length >= e) return String(n);
	const o = e - n.length;
	let r = Math.ceil(o / t.length);
	for (; r >>= 1;) t += t, 1 === r && (t += t);
	return t.slice(0, o) + n
});
const cT = {
	range: function (e = 0, t = 0, n = 0) {
		return Math.max(e, Math.min(t, Number(n)))
	}, getPx: function (e, t = !1) {
		return Jx.number(e) ? t ? `${e}px` : Number(e) : /(rpx|upx)$/.test(e) ? t ? `${vd(parseInt(e))}px` : Number(vd(parseInt(e))) : t ? `${parseInt(e)}px` : parseInt(e)
	}, sleep: function (e = 30) {
		return new Promise((t => {
			setTimeout((() => {
				t()
			}), e)
		}))
	}, os: function () {
		return Dm().platform.toLowerCase()
	}, sys: function () {
		return Dm()
	}, random: function (e, t) {
		if (e >= 0 && t > 0 && t >= e) {
			const n = t - e + 1;
			return Math.floor(Math.random() * n + e)
		}
		return 0
	}, guid: function (e = 32, t = !0, n = null) {
		const o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), r = [];
		if (n = n || o.length, e) for (let i = 0; i < e; i++) r[i] = o[0 | Math.random() * n]; else {
			let e;
			r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4";
			for (let t = 0; t < 36; t++) r[t] || (e = 0 | 16 * Math.random(), r[t] = o[19 == t ? 3 & e | 8 : e])
		}
		return t ? (r.shift(), `u${r.join("")}`) : r.join("")
	}, $parent: function (e) {
		let t = this.$parent;
		for (; t;) {
			if (!t.$options || t.$options.name === e) return t;
			t = t.$parent
		}
		return !1
	}, addStyle: function (e, t = "object") {
		if (Jx.empty(e) || "object" == typeof e && "object" === t || "string" === t && "string" == typeof e) return e;
		if ("object" === t) {
			const t = (e = lT(e)).split(";"), n = {};
			for (let e = 0; e < t.length; e++) if (t[e]) {
				const o = t[e].split(":");
				n[lT(o[0])] = lT(o[1])
			}
			return n
		}
		let n = "";
		for (const o in e) {
			n += `${o.replace(/([A-Z])/g, "-$1").toLowerCase()}:${e[o]};`
		}
		return lT(n)
	}, addUnit: function (e = "auto", t = "") {
		return t || (t = uni.$u.config.unit || "px"), e = String(e), Jx.number(e) ? `${e}${t}` : e
	}, deepClone: aT, deepMerge: function e(t = {}, n = {}) {
		if ("object" != typeof (t = aT(t)) || "object" != typeof n) return !1;
		for (const o in n) n.hasOwnProperty(o) && (o in t ? "object" != typeof t[o] || "object" != typeof n[o] ? t[o] = n[o] : t[o].concat && n[o].concat ? t[o] = t[o].concat(n[o]) : t[o] = e(t[o], n[o]) : t[o] = n[o]);
		return t
	}, error: function (e) {
	}, randomArray: function (e = []) {
		return e.sort((() => Math.random() - .5))
	}, timeFormat: sT, timeFrom: function (e = null, t = "yyyy-mm-dd") {
		null == e && (e = Number(new Date)), 10 == (e = parseInt(e)).toString().length && (e *= 1e3);
		let n = (new Date).getTime() - e;
		n = parseInt(n / 1e3);
		let o = "";
		switch (!0) {
			case n < 300:
				o = "刚刚";
				break;
			case n >= 300 && n < 3600:
				o = `${parseInt(n / 60)}分钟前`;
				break;
			case n >= 3600 && n < 86400:
				o = `${parseInt(n / 3600)}小时前`;
				break;
			case n >= 86400 && n < 2592e3:
				o = `${parseInt(n / 86400)}天前`;
				break;
			default:
				o = !1 === t ? n >= 2592e3 && n < 31536e3 ? `${parseInt(n / 2592e3)}个月前` : `${parseInt(n / 31536e3)}年前` : sT(e, t)
		}
		return o
	}, trim: lT, queryParams: function (e = {}, t = !0, n = "brackets") {
		const o = t ? "?" : "", r = [];
		-1 == ["indices", "brackets", "repeat", "comma"].indexOf(n) && (n = "brackets");
		for (const i in e) {
			const t = e[i];
			if (!(["", void 0, null].indexOf(t) >= 0)) if (t.constructor === Array) switch (n) {
				case"indices":
					for (let n = 0; n < t.length; n++) r.push(`${i}[${n}]=${t[n]}`);
					break;
				case"brackets":
				default:
					t.forEach((e => {
						r.push(`${i}[]=${e}`)
					}));
					break;
				case"repeat":
					t.forEach((e => {
						r.push(`${i}=${e}`)
					}));
					break;
				case"comma":
					let e = "";
					t.forEach((t => {
						e += (e ? "," : "") + t
					})), r.push(`${i}=${e}`)
			} else r.push(`${i}=${t}`)
		}
		return r.length ? o + r.join("&") : ""
	}, toast: function (e, t = 2e3) {
		Vg({title: String(e), icon: "none", duration: t})
	}, type2icon: function (e = "success", t = !1) {
		-1 == ["primary", "info", "error", "warning", "success"].indexOf(e) && (e = "success");
		let n = "";
		switch (e) {
			case"primary":
			case"info":
				n = "info-circle";
				break;
			case"error":
				n = "close-circle";
				break;
			case"warning":
				n = "error-circle";
				break;
			default:
				n = "checkmark-circle"
		}
		return t && (n += "-fill"), n
	}, priceFormat: function (e, t = 0, n = ".", o = ",") {
		e = `${e}`.replace(/[^0-9+-Ee.]/g, "");
		const r = isFinite(+e) ? +e : 0, i = isFinite(+t) ? Math.abs(t) : 0, a = void 0 === o ? "," : o,
			s = void 0 === n ? "." : n;
		let l = "";
		l = (i ? function (e, t) {
			const n = Math.pow(10, t);
			let o = iT(Math.round(Math.abs(rT(e, n))), n);
			return e < 0 && 0 !== o && (o = rT(o, -1)), o
		}(r, i) + "" : `${Math.round(r)}`).split(".");
		const c = /(-?\d+)(\d{3})/;
		for (; c.test(l[0]);) l[0] = l[0].replace(c, `$1${a}$2`);
		return (l[1] || "").length < i && (l[1] = l[1] || "", l[1] += new Array(i - l[1].length + 1).join("0")), l.join(s)
	}, getDuration: function (e, t = !0) {
		const n = parseInt(e);
		return t ? /s$/.test(e) ? e : e > 30 ? `${e}ms` : `${e}s` : /ms$/.test(e) ? n : /s$/.test(e) ? n > 30 ? n : 1e3 * n : n
	}, padZero: function (e) {
		return `00${e}`.slice(-2)
	}, formValidate: function (e, t) {
		const n = uni.$u.$parent.call(e, "u-form-item"), o = uni.$u.$parent.call(e, "u-form");
		n && o && o.validateField(n.prop, (() => {
		}), t)
	}, getProperty: function (e, t) {
		if (e) {
			if ("string" != typeof t || "" === t) return "";
			if (-1 !== t.indexOf(".")) {
				const n = t.split(".");
				let o = e[n[0]] || {};
				for (let e = 1; e < n.length; e++) o && (o = o[n[e]]);
				return o
			}
			return e[t]
		}
	}, setProperty: function (e, t, n) {
		if (!e) return;
		const o = function (e, t, n) {
			if (1 !== t.length) for (; t.length > 1;) {
				const r = t[0];
				e[r] && "object" == typeof e[r] || (e[r] = {}), t.shift(), o(e[r], t, n)
			} else e[t[0]] = n
		};
		if ("string" != typeof t || "" === t) ; else if (-1 !== t.indexOf(".")) {
			const r = t.split(".");
			o(e, r, n)
		} else e[t] = n
	}, page: function () {
		const e = Hh();
		return `/${e[e.length - 1].route || ""}`
	}, pages: function () {
		return Hh()
	}, setConfig: function ({props: e = {}, config: t = {}, color: n = {}, zIndex: o = {}}) {
		const {deepMerge: r} = uni.$u;
		uni.$u.config = r(uni.$u.config, t), uni.$u.props = r(uni.$u.props, e), uni.$u.color = r(uni.$u.color, n), uni.$u.zIndex = r(uni.$u.zIndex, o)
	}
}, uT = {
	v: "3",
	version: "3",
	type: ["primary", "success", "info", "error", "warning"],
	color: {
		"u-primary": "#2979ff",
		"u-warning": "#ff9900",
		"u-success": "#19be6b",
		"u-error": "#fa3534",
		"u-info": "#909399",
		"u-main-color": "#303133",
		"u-content-color": "#606266",
		"u-tips-color": "#909399",
		"u-light-color": "#c0c4cc"
	},
	unit: "px"
}, dT = {
	calendar: {
		title: "日期选择",
		showTitle: !0,
		showSubtitle: !0,
		mode: "single",
		startText: "开始",
		endText: "结束",
		customList: () => [],
		color: "#3c9cff",
		minDate: 0,
		maxDate: 0,
		defaultDate: null,
		maxCount: Number.MAX_SAFE_INTEGER,
		rowHeight: 56,
		formatter: null,
		showLunar: !1,
		showMark: !0,
		confirmText: "确定",
		confirmDisabledText: "确定",
		show: !1,
		closeOnClickOverlay: !1,
		readonly: !1,
		showConfirm: !0,
		maxRange: Number.MAX_SAFE_INTEGER,
		rangePrompt: "",
		showRangePrompt: !0,
		allowSameDay: !1,
		round: 0,
		monthNum: 3
	}
}, pT = {
	datetimePicker: {
		show: !1,
		showToolbar: !0,
		value: "",
		title: "",
		mode: "datetime",
		maxDate: new Date((new Date).getFullYear() + 10, 0, 1).getTime(),
		minDate: new Date((new Date).getFullYear() - 10, 0, 1).getTime(),
		minHour: 0,
		maxHour: 23,
		minMinute: 0,
		maxMinute: 59,
		filter: null,
		formatter: null,
		loading: !1,
		itemHeight: 44,
		cancelText: "取消",
		confirmText: "确认",
		cancelColor: "#909193",
		confirmColor: "#3c9cff",
		visibleItemCount: 5,
		closeOnClickOverlay: !1,
		defaultIndex: () => []
	}
}, {color: fT} = uT, hT = {
	icon: {
		name: "",
		color: fT["u-content-color"],
		size: "16px",
		bold: !1,
		index: "",
		hoverClass: "",
		customPrefix: "uicon",
		label: "",
		labelPos: "right",
		labelSize: "15px",
		labelColor: fT["u-content-color"],
		space: "3px",
		imgMode: "",
		width: "",
		height: "",
		top: 0,
		stop: !1
	}
}, {color: mT} = uT, gT = {
	link: {
		color: mT["u-primary"],
		fontSize: 15,
		underLine: !1,
		href: "",
		mpTips: "链接已复制，请在浏览器打开",
		lineColor: "",
		text: ""
	}
}, {color: vT} = uT, bT = {
	primary: "#3c9cff",
	info: "#909399",
	default: "#909399",
	warning: "#f9ae3d",
	error: "#f56c6c",
	success: "#5ac725",
	mainColor: "#303133",
	contentColor: "#606266",
	tipsColor: "#909399",
	lightColor: "#c0c4cc",
	borderColor: "#e4e7ed"
}, yT = {
	actionSheet: {
		show: !1,
		title: "",
		description: "",
		actions: () => [],
		index: "",
		cancelText: "",
		closeOnClickAction: !0,
		safeAreaInsetBottom: !0,
		openType: "",
		closeOnClickOverlay: !0,
		round: 0
	},
	album: {
		urls: () => [],
		keyName: "",
		singleSize: 180,
		multipleSize: 70,
		space: 6,
		singleMode: "scaleToFill",
		multipleMode: "aspectFill",
		maxCount: 9,
		previewFullImage: !0,
		rowCount: 3,
		showMore: !0
	},
	alert: {
		title: "",
		type: "warning",
		description: "",
		closable: !1,
		showIcon: !1,
		effect: "light",
		center: !1,
		fontSize: 14
	},
	avatar: {
		src: "",
		shape: "circle",
		size: 40,
		mode: "scaleToFill",
		text: "",
		bgColor: "#c0c4cc",
		color: "#ffffff",
		fontSize: 18,
		icon: "",
		mpAvatar: !1,
		randomBgColor: !1,
		defaultUrl: "",
		colorIndex: "",
		name: ""
	},
	avatarGroup: {
		urls: () => [],
		maxCount: 5,
		shape: "circle",
		mode: "scaleToFill",
		showMore: !0,
		size: 40,
		keyName: "",
		gap: .5,
		extraValue: 0
	},
	backtop: {
		mode: "circle",
		icon: "arrow-upward",
		text: "",
		duration: 100,
		scrollTop: 0,
		top: 400,
		bottom: 100,
		right: 20,
		zIndex: 9,
		iconStyle: () => ({color: "#909399", fontSize: "19px"})
	},
	badge: {
		isDot: !1,
		value: "",
		show: !0,
		max: 999,
		type: "error",
		showZero: !1,
		bgColor: null,
		color: null,
		shape: "circle",
		numberType: "overflow",
		offset: () => [],
		inverted: !1,
		absolute: !1
	},
	button: {
		hairline: !1,
		type: "info",
		size: "normal",
		shape: "square",
		plain: !1,
		disabled: !1,
		loading: !1,
		loadingText: "",
		loadingMode: "spinner",
		loadingSize: 15,
		openType: "",
		formType: "",
		appParameter: "",
		hoverStopPropagation: !0,
		lang: "en",
		sessionFrom: "",
		sendMessageTitle: "",
		sendMessagePath: "",
		sendMessageImg: "",
		showMessageCard: !1,
		dataName: "",
		throttleTime: 0,
		hoverStartTime: 0,
		hoverStayTime: 200,
		text: "",
		icon: "",
		iconColor: "",
		color: ""
	}, ...dT,
	carKeyboard: {random: !1},
	cell: {
		customClass: "",
		title: "",
		label: "",
		value: "",
		icon: "",
		disabled: !1,
		border: !0,
		center: !1,
		url: "",
		linkType: "navigateTo",
		clickable: !1,
		isLink: !1,
		required: !1,
		arrowDirection: "",
		iconStyle: {},
		rightIconStyle: {},
		rightIcon: "arrow-right",
		titleStyle: {},
		size: "",
		stop: !0,
		name: ""
	},
	cellGroup: {title: "", border: !0, customStyle: {}},
	checkbox: {
		name: "",
		shape: "",
		size: "",
		checkbox: !1,
		disabled: "",
		activeColor: "",
		inactiveColor: "",
		iconSize: "",
		iconColor: "",
		label: "",
		labelSize: "",
		labelColor: "",
		labelDisabled: ""
	},
	checkboxGroup: {
		name: "",
		value: () => [],
		shape: "square",
		disabled: !1,
		activeColor: "#2979ff",
		inactiveColor: "#c8c9cc",
		size: 18,
		placement: "row",
		labelSize: 14,
		labelColor: "#303133",
		labelDisabled: !1,
		iconColor: "#ffffff",
		iconSize: 12,
		iconPlacement: "left",
		borderBottom: !1
	},
	circleProgress: {percentage: 30},
	code: {seconds: 60, startText: "获取验证码", changeText: "X秒重新获取", endText: "重新获取", keepRunning: !1, uniqueKey: ""},
	codeInput: {
		adjustPosition: !0,
		maxlength: 6,
		dot: !1,
		mode: "box",
		hairline: !1,
		space: 10,
		value: "",
		focus: !1,
		bold: !1,
		color: "#606266",
		fontSize: 18,
		size: 35,
		disabledKeyboard: !1,
		borderColor: "#c9cacc",
		disabledDot: !0
	},
	col: {span: 12, offset: 0, justify: "start", align: "stretch", textAlign: "left"},
	collapse: {value: null, accordion: !1, border: !0},
	collapseItem: {
		title: "",
		value: "",
		label: "",
		disabled: !1,
		isLink: !0,
		clickable: !0,
		border: !0,
		align: "left",
		name: "",
		icon: "",
		duration: 300
	},
	columnNotice: {
		text: "",
		icon: "volume",
		mode: "",
		color: "#f9ae3d",
		bgColor: "#fdf6ec",
		fontSize: 14,
		speed: 80,
		step: !1,
		duration: 1500,
		disableTouch: !0
	},
	countDown: {time: 0, format: "HH:mm:ss", autoStart: !0, millisecond: !1},
	countTo: {
		startVal: 0,
		endVal: 0,
		duration: 2e3,
		autoplay: !0,
		decimals: 0,
		useEasing: !0,
		decimal: ".",
		color: "#606266",
		fontSize: 22,
		bold: !1,
		separator: ""
	}, ...pT,
	divider: {
		dashed: !1,
		hairline: !0,
		dot: !1,
		textPosition: "center",
		text: "",
		textSize: 14,
		textColor: "#909399",
		lineColor: "#dcdfe6"
	},
	empty: {
		icon: "",
		text: "",
		textColor: "#c0c4cc",
		textSize: 14,
		iconColor: "#c0c4cc",
		iconSize: 90,
		mode: "data",
		width: 160,
		height: 160,
		show: !0,
		marginTop: 0
	},
	form: {
		model: () => ({}),
		rules: () => ({}),
		errorType: "message",
		borderBottom: !0,
		labelPosition: "left",
		labelWidth: 45,
		labelAlign: "left",
		labelStyle: () => ({})
	},
	formItem: {
		label: "",
		prop: "",
		borderBottom: "",
		labelWidth: "",
		rightIcon: "",
		leftIcon: "",
		required: !1,
		leftIconStyle: ""
	},
	gap: {bgColor: "transparent", height: 20, marginTop: 0, marginBottom: 0, customStyle: {}},
	grid: {col: 3, border: !1, align: "left"},
	gridItem: {name: null, bgColor: "transparent"}, ...hT,
	image: {
		src: "",
		mode: "aspectFill",
		width: "300",
		height: "225",
		shape: "square",
		radius: 0,
		lazyLoad: !0,
		showMenuByLongpress: !0,
		loadingIcon: "photo",
		errorIcon: "error-circle",
		showLoading: !0,
		showError: !0,
		fade: !0,
		webp: !1,
		duration: 500,
		bgColor: "#f3f4f6"
	},
	indexAnchor: {text: "", color: "#606266", size: 14, bgColor: "#dedede", height: 32},
	indexList: {inactiveColor: "#606266", activeColor: "#5677fc", indexList: () => [], sticky: !0, customNavHeight: 0},
	input: {
		value: "",
		type: "text",
		fixed: !1,
		disabled: !1,
		disabledColor: "#f5f7fa",
		clearable: !1,
		password: !1,
		maxlength: -1,
		placeholder: null,
		placeholderClass: "input-placeholder",
		placeholderStyle: "color: #c0c4cc",
		showWordLimit: !1,
		confirmType: "done",
		confirmHold: !1,
		holdKeyboard: !1,
		focus: !1,
		autoBlur: !1,
		disableDefaultPadding: !1,
		cursor: -1,
		cursorSpacing: 30,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: !0,
		inputAlign: "left",
		fontSize: "15px",
		color: "#303133",
		prefixIcon: "",
		prefixIconStyle: "",
		suffixIcon: "",
		suffixIconStyle: "",
		border: "surround",
		readonly: !1,
		shape: "square",
		formatter: null
	},
	keyboard: {
		mode: "number",
		dotDisabled: !1,
		tooltip: !0,
		showTips: !0,
		tips: "",
		showCancel: !0,
		showConfirm: !0,
		random: !1,
		safeAreaInsetBottom: !0,
		closeOnClickOverlay: !0,
		show: !1,
		overlay: !0,
		zIndex: 10075,
		cancelText: "取消",
		confirmText: "确定",
		autoChange: !1
	},
	line: {color: "#d6d7d9", length: "100%", direction: "row", hairline: !0, margin: 0, dashed: !1},
	lineProgress: {activeColor: "#19be6b", inactiveColor: "#ececec", percentage: 0, showText: !0, height: 12}, ...gT,
	list: {
		showScrollbar: !1,
		lowerThreshold: 50,
		upperThreshold: 0,
		scrollTop: 0,
		offsetAccuracy: 10,
		enableFlex: !1,
		pagingEnabled: !1,
		scrollable: !0,
		scrollIntoView: "",
		scrollWithAnimation: !1,
		enableBackToTop: !1,
		height: 0,
		width: 0,
		preLoadScreen: 1
	},
	listItem: {anchor: ""}, ...{
		loadingIcon: {
			show: !0,
			color: vT["u-tips-color"],
			textColor: vT["u-tips-color"],
			vertical: !1,
			mode: "spinner",
			size: 24,
			textSize: 15,
			text: "",
			timingFunction: "ease-in-out",
			duration: 1200,
			inactiveColor: ""
		}
	},
	loadingPage: {
		loadingText: "正在加载",
		image: "",
		loadingMode: "circle",
		loading: !1,
		bgColor: "#ffffff",
		color: "#C8C8C8",
		fontSize: 19,
		iconSize: 28,
		loadingColor: "#C8C8C8"
	},
	loadmore: {
		status: "loadmore",
		bgColor: "transparent",
		icon: !0,
		fontSize: 14,
		iconSize: 17,
		color: "#606266",
		loadingIcon: "spinner",
		loadmoreText: "加载更多",
		loadingText: "正在加载...",
		nomoreText: "没有更多了",
		isDot: !1,
		iconColor: "#b7b7b7",
		marginTop: 10,
		marginBottom: 10,
		height: "auto",
		line: !1,
		lineColor: "#E6E8EB",
		dashed: !1
	},
	modal: {
		show: !1,
		title: "",
		content: "",
		confirmText: "确认",
		cancelText: "取消",
		showConfirmButton: !0,
		showCancelButton: !1,
		confirmColor: "#2979ff",
		cancelColor: "#606266",
		buttonReverse: !1,
		zoom: !0,
		asyncClose: !1,
		closeOnClickOverlay: !1,
		negativeTop: 0,
		width: "650rpx",
		confirmButtonShape: ""
	}, ...{
		navbar: {
			safeAreaInsetTop: !0,
			placeholder: !1,
			fixed: !0,
			border: !1,
			leftIcon: "arrow-left",
			leftText: "",
			rightText: "",
			rightIcon: "",
			title: "",
			bgColor: "#ffffff",
			titleWidth: "400rpx",
			height: "44px",
			leftIconSize: 20,
			leftIconColor: bT.mainColor,
			autoBack: !1,
			titleStyle: ""
		}
	},
	noNetwork: {
		tips: "哎呀，网络信号丢失",
		zIndex: "",
		image: "data:image/png;base64,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"
	},
	noticeBar: {
		text: () => [],
		direction: "row",
		step: !1,
		icon: "volume",
		mode: "",
		color: "#f9ae3d",
		bgColor: "#fdf6ec",
		speed: 80,
		fontSize: 14,
		duration: 2e3,
		disableTouch: !0,
		url: "",
		linkType: "navigateTo"
	},
	notify: {
		top: 0,
		type: "primary",
		color: "#ffffff",
		bgColor: "",
		message: "",
		duration: 3e3,
		fontSize: 15,
		safeAreaInsetTop: !1
	}, ...{
		numberBox: {
			name: "",
			value: 0,
			min: 1,
			max: Number.MAX_SAFE_INTEGER,
			step: 1,
			integer: !1,
			disabled: !1,
			disabledInput: !1,
			asyncChange: !1,
			inputWidth: 35,
			showMinus: !0,
			showPlus: !0,
			decimalLength: null,
			longPress: !0,
			color: "#323233",
			buttonSize: 30,
			bgColor: "#EBECEE",
			cursorSpacing: 100,
			disableMinus: !1,
			disablePlus: !1,
			iconStyle: ""
		}
	},
	numberKeyboard: {mode: "number", dotDisabled: !1, random: !1},
	overlay: {show: !1, zIndex: 10070, duration: 300, opacity: .5},
	parse: {
		copyLink: !0,
		errorImg: "",
		lazyLoad: !1,
		loadingImg: "",
		pauseVideo: !0,
		previewImg: !0,
		setTitle: !0,
		showImgMenu: !0
	},
	picker: {
		show: !1,
		showToolbar: !0,
		title: "",
		columns: () => [],
		loading: !1,
		itemHeight: 44,
		cancelText: "取消",
		confirmText: "确定",
		cancelColor: "#909193",
		confirmColor: "#3c9cff",
		visibleItemCount: 5,
		keyName: "text",
		closeOnClickOverlay: !1,
		defaultIndex: () => [],
		immediateChange: !1
	},
	popup: {
		show: !1,
		overlay: !0,
		mode: "bottom",
		duration: 300,
		closeable: !1,
		overlayStyle: () => {
		},
		closeOnClickOverlay: !0,
		zIndex: 10075,
		safeAreaInsetBottom: !0,
		safeAreaInsetTop: !1,
		closeIconPos: "top-right",
		round: 0,
		zoom: !0,
		bgColor: "",
		overlayOpacity: .5
	},
	radio: {
		name: "",
		shape: "",
		disabled: "",
		labelDisabled: "",
		activeColor: "",
		inactiveColor: "",
		iconSize: "",
		labelSize: "",
		label: "",
		labelColor: "",
		size: "",
		iconColor: "",
		placement: ""
	},
	radioGroup: {
		value: "",
		disabled: !1,
		shape: "circle",
		activeColor: "#2979ff",
		inactiveColor: "#c8c9cc",
		name: "",
		size: 18,
		placement: "row",
		label: "",
		labelColor: "#303133",
		labelSize: 14,
		labelDisabled: !1,
		iconColor: "#ffffff",
		iconSize: 12,
		borderBottom: !1,
		iconPlacement: "left"
	},
	rate: {
		value: 1,
		count: 5,
		disabled: !1,
		size: 18,
		inactiveColor: "#b2b2b2",
		activeColor: "#FA3534",
		gutter: 4,
		minCount: 1,
		allowHalf: !1,
		activeIcon: "star-fill",
		inactiveIcon: "star",
		touchable: !0
	},
	readMore: {
		showHeight: 400,
		toggle: !1,
		closeText: "展开阅读全文",
		openText: "收起",
		color: "#2979ff",
		fontSize: 14,
		textIndent: "2em",
		name: ""
	},
	row: {gutter: 0, justify: "start", align: "center"},
	rowNotice: {text: "", icon: "volume", mode: "", color: "#f9ae3d", bgColor: "#fdf6ec", fontSize: 14, speed: 80},
	scrollList: {
		indicatorWidth: 50,
		indicatorBarWidth: 20,
		indicator: !0,
		indicatorColor: "#f2f2f2",
		indicatorActiveColor: "#3c9cff",
		indicatorStyle: ""
	},
	search: {
		shape: "round",
		bgColor: "#f2f2f2",
		placeholder: "请输入关键字",
		clearabled: !0,
		focus: !1,
		showAction: !0,
		actionStyle: () => ({}),
		actionText: "搜索",
		inputAlign: "left",
		inputStyle: () => ({}),
		disabled: !1,
		borderColor: "transparent",
		searchIconColor: "#909399",
		searchIconSize: 22,
		color: "#606266",
		placeholderColor: "#909399",
		searchIcon: "search",
		margin: "0",
		animation: !1,
		value: "",
		maxlength: "-1",
		height: 32,
		label: null
	},
	section: {
		title: "",
		subTitle: "更多",
		right: !0,
		fontSize: 15,
		bold: !0,
		color: "#303133",
		subColor: "#909399",
		showLine: !0,
		lineColor: "",
		arrow: !0
	},
	skeleton: {
		loading: !0,
		animate: !0,
		rows: 0,
		rowsWidth: "100%",
		rowsHeight: 18,
		title: !0,
		titleWidth: "50%",
		titleHeight: 18,
		avatar: !1,
		avatarSize: 32,
		avatarShape: "circle"
	},
	slider: {
		value: 0,
		blockSize: 18,
		min: 0,
		max: 100,
		step: 1,
		activeColor: "#2979ff",
		inactiveColor: "#c0c4cc",
		blockColor: "#ffffff",
		showValue: !1,
		disabled: !1,
		blockStyle: () => {
		}
	},
	statusBar: {bgColor: "transparent"},
	steps: {
		direction: "row",
		current: 0,
		activeColor: "#3c9cff",
		inactiveColor: "#969799",
		activeIcon: "",
		inactiveIcon: "",
		dot: !1
	},
	stepsItem: {title: "", desc: "", iconSize: 17, error: !1},
	sticky: {offsetTop: 0, customNavHeight: 0, disabled: !1, bgColor: "transparent", zIndex: "", index: ""},
	subsection: {
		list: [],
		current: 0,
		activeColor: "#3c9cff",
		inactiveColor: "#303133",
		mode: "button",
		fontSize: 12,
		bold: !0,
		bgColor: "#eeeeef",
		keyName: "name"
	},
	swipeAction: {autoClose: !0},
	swipeActionItem: {show: !1, name: "", disabled: !1, threshold: 20, autoClose: !0, options: [], duration: 300},
	swiper: {
		list: () => [],
		indicator: !1,
		indicatorActiveColor: "#FFFFFF",
		indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
		indicatorStyle: "",
		indicatorMode: "line",
		autoplay: !0,
		current: 0,
		currentItemId: "",
		interval: 3e3,
		duration: 300,
		circular: !1,
		previousMargin: 0,
		nextMargin: 0,
		acceleration: !1,
		displayMultipleItems: 1,
		easingFunction: "default",
		keyName: "url",
		imgMode: "aspectFill",
		height: 130,
		bgColor: "#f3f4f6",
		radius: 4,
		loading: !1,
		showTitle: !1
	},
	swiperIndicator: {
		length: 0,
		current: 0,
		indicatorActiveColor: "",
		indicatorInactiveColor: "",
		indicatorMode: "line"
	},
	switch: {
		loading: !1,
		disabled: !1,
		size: 25,
		activeColor: "#2979ff",
		inactiveColor: "#ffffff",
		value: !1,
		activeValue: !0,
		inactiveValue: !1,
		asyncChange: !1,
		space: 0
	},
	tabbar: {
		value: null,
		safeAreaInsetBottom: !0,
		border: !0,
		zIndex: 1,
		activeColor: "#1989fa",
		inactiveColor: "#7d7e80",
		fixed: !0,
		placeholder: !0
	},
	tabbarItem: {name: null, icon: "", badge: null, dot: !1, text: "", badgeStyle: "top: 6px;right:2px;"},
	tabs: {
		duration: 300,
		list: () => [],
		lineColor: "#3c9cff",
		activeStyle: () => ({color: "#303133"}),
		inactiveStyle: () => ({color: "#606266"}),
		lineWidth: 20,
		lineHeight: 3,
		lineBgSize: "cover",
		itemStyle: () => ({height: "44px"}),
		scrollable: !0,
		current: 0,
		keyName: "name"
	},
	tag: {
		type: "primary",
		disabled: !1,
		size: "medium",
		shape: "square",
		text: "",
		bgColor: "",
		color: "",
		borderColor: "",
		closeColor: "#C6C7CB",
		name: "",
		plainFill: !1,
		plain: !1,
		closable: !1,
		show: !0,
		icon: ""
	},
	text: {
		type: "",
		show: !0,
		text: "",
		prefixIcon: "",
		suffixIcon: "",
		mode: "",
		href: "",
		format: "",
		call: !1,
		openType: "",
		bold: !1,
		block: !1,
		lines: "",
		color: "#303133",
		size: 15,
		iconStyle: () => ({fontSize: "15px"}),
		decoration: "none",
		margin: 0,
		lineHeight: "",
		align: "left",
		wordWrap: "normal"
	},
	textarea: {
		value: "",
		placeholder: "",
		placeholderClass: "textarea-placeholder",
		placeholderStyle: "color: #c0c4cc",
		height: 70,
		confirmType: "done",
		disabled: !1,
		count: !1,
		focus: !1,
		autoHeight: !1,
		fixed: !1,
		cursorSpacing: 0,
		cursor: "",
		showConfirmBar: !0,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: !0,
		disableDefaultPadding: !1,
		holdKeyboard: !1,
		maxlength: 140,
		border: "surround",
		formatter: null
	},
	toast: {
		zIndex: 10090,
		loading: !1,
		text: "",
		icon: "",
		type: "",
		loadingMode: "",
		show: "",
		overlay: !1,
		position: "center",
		params: () => {
		},
		duration: 2e3,
		isTab: !1,
		url: "",
		callback: null,
		back: !1
	},
	toolbar: {
		show: !0,
		cancelText: "取消",
		confirmText: "确认",
		cancelColor: "#909193",
		confirmColor: "#3c9cff",
		title: ""
	},
	tooltip: {
		text: "",
		copyText: "",
		size: 14,
		color: "#606266",
		bgColor: "transparent",
		direction: "top",
		zIndex: 10071,
		showCopy: !0,
		buttons: () => [],
		overlay: !0,
		showToast: !0
	},
	transition: {show: !1, mode: "fade", duration: "300", timingFunction: "ease-out"}, ...{
		upload: {
			accept: "image",
			capture: () => ["album", "camera"],
			compressed: !0,
			camera: "back",
			maxDuration: 60,
			uploadIcon: "camera-fill",
			uploadIconColor: "#D3D4D6",
			useBeforeRead: !1,
			previewFullImage: !0,
			maxCount: 52,
			disabled: !1,
			imageMode: "aspectFill",
			name: "",
			sizeType: () => ["original", "compressed"],
			multiple: !1,
			deletable: !0,
			maxSize: Number.MAX_VALUE,
			fileList: () => [],
			uploadText: "",
			width: 80,
			height: 80,
			previewImage: !0
		}
	}
};
let _T = "none";
_T = "vue3", _T = "h5";
const wT = {
	route: qx,
	date: cT.timeFormat,
	colorGradient: $x.colorGradient,
	hexToRgb: $x.hexToRgb,
	rgbToHex: $x.rgbToHex,
	colorToRgba: $x.colorToRgba,
	test: Jx,
	type: ["primary", "success", "error", "warning", "info"],
	http: new class {
		constructor(e = {}) {
			var t;
			t = e, "[object Object]" !== Object.prototype.toString.call(t) && (e = {}, console.warn("设置全局参数必须接收一个Object")), this.config = Hx({...zx, ...e}), this.interceptors = {
				request: new Nx,
				response: new Nx
			}
		}

		setConfig(e) {
			this.config = e(this.config)
		}

		middleware(e) {
			e = ((e, t = {}) => {
				const n = t.method || e.method || "GET";
				let o = {
					baseURL: e.baseURL || "",
					method: n,
					url: t.url || "",
					params: t.params || {},
					custom: {...e.custom || {}, ...t.custom || {}},
					header: Ox(e.header || {}, t.header || {})
				};
				if (o = {...o, ...Dx(["getTask", "validateStatus"], e, t)}, "DOWNLOAD" === n) Ix(t.timeout) ? Ix(e.timeout) || (o.timeout = e.timeout) : o.timeout = t.timeout; else if ("UPLOAD" === n) delete o.header["content-type"], delete o.header["Content-Type"], ["files", "file", "filePath", "name", "timeout", "formData"].forEach((e => {
					Ix(t[e]) || (o[e] = t[e])
				})), Ix(o.timeout) && !Ix(e.timeout) && (o.timeout = e.timeout); else {
					const n = ["data", "timeout", "dataType", "responseType", "withCredentials"];
					o = {...o, ...Dx(n, e, t)}
				}
				return o
			})(this.config, e);
			const t = [Rx, void 0];
			let n = Promise.resolve(e);
			for (this.interceptors.request.forEach((e => {
				t.unshift(e.fulfilled, e.rejected)
			})), this.interceptors.response.forEach((e => {
				t.push(e.fulfilled, e.rejected)
			})); t.length;) n = n.then(t.shift(), t.shift());
			return n
		}

		request(e = {}) {
			return this.middleware(e)
		}

		get(e, t = {}) {
			return this.middleware({url: e, method: "GET", ...t})
		}

		post(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "POST", ...n})
		}

		put(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "PUT", ...n})
		}

		delete(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "DELETE", ...n})
		}

		connect(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "CONNECT", ...n})
		}

		head(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "HEAD", ...n})
		}

		options(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "OPTIONS", ...n})
		}

		trace(e, t, n = {}) {
			return this.middleware({url: e, data: t, method: "TRACE", ...n})
		}

		upload(e, t = {}) {
			return t.url = e, t.method = "UPLOAD", this.middleware(t)
		}

		download(e, t = {}) {
			return t.url = e, t.method = "DOWNLOAD", this.middleware(t)
		}
	},
	config: uT,
	zIndex: {
		toast: 10090,
		noNetwork: 10080,
		popup: 10075,
		mask: 10070,
		navbar: 980,
		topTips: 975,
		sticky: 970,
		indexListSticky: 965
	},
	debounce: function (e, t = 500, n = !1) {
		if (null !== Kx && clearTimeout(Kx), n) {
			const n = !Kx;
			Kx = setTimeout((() => {
				Kx = null
			}), t), n && "function" == typeof e && e()
		} else Kx = setTimeout((() => {
			"function" == typeof e && e()
		}), t)
	},
	throttle: function (e, t = 500, n = !0) {
		n ? Gx || (Gx = !0, "function" == typeof e && e(), setTimeout((() => {
			Gx = !1
		}), t)) : Gx || (Gx = !0, setTimeout((() => {
			Gx = !1, "function" == typeof e && e()
		}), t))
	},
	mixin: Ax,
	mpMixin: Cx,
	props: yT, ...cT,
	color: bT,
	platform: "h5"
};
uni.$u = wT;
const xT = {
	install: e => {
		e.config.globalProperties.$u = wT, e.config.globalProperties.$nextTick = e => {
			e()
		}, e.mixin(Ax)
	}
}, TT = e => {
	const t = dx(0);
	return (t ? `site${t}.` : "") + e
};
(function () {
	const e = ka(kx);
	return e.use(uw()), e.use(ew), e.use(xT), function () {
		const e = Hm, t = qm, n = $m, o = Wm, r = Um, i = Qm;
		uni.setStorage = e => {
			e.key = TT(e.key), t(e)
		}, uni.setStorageSync = (t, n) => {
			e(TT(t), n)
		}, uni.getStorage = e => {
			e.key = TT(e.key), n(e)
		}, uni.getStorageSync = e => o(TT(e)), uni.removeStorage = e => {
			e.key = TT(e.key), r(e)
		}, uni.removeStorageSync = e => i(TT(e))
	}(), {app: e, Pinia: Tw}
})().app.use(om).mount("#app");
export {
	Uw as $,
	Ax as A,
	Xm as B,
	Jo as C,
	ei as D,
	m as E,
	u as F,
	wa as G,
	dh as H,
	hf as I,
	Z_ as J,
	Io as K,
	tn as L,
	Wr as M,
	Yo as N,
	Mr as O,
	Yb as P,
	Xb as Q,
	Zw as R,
	rh as S,
	hx as T,
	Kw as U,
	Iw as V,
	Jw as W,
	xx as X,
	wx as Y,
	$w as Z,
	Qw as _,
	qt as a,
	Nw as a$,
	Xw as a0,
	Xp as a1,
	mx as a2,
	gx as a3,
	px as a4,
	Vg as a5,
	Nd as a6,
	kd as a7,
	mg as a8,
	Ag as a9,
	Ow as aA,
	Aw as aB,
	Cw as aC,
	Ww as aD,
	Dw as aE,
	zw as aF,
	lh as aG,
	ah as aH,
	ix as aI,
	fx as aJ,
	vd as aK,
	zm as aL,
	kn as aM,
	Ew as aN,
	Km as aO,
	vg as aP,
	eg as aQ,
	Gf as aR,
	Vf as aS,
	Bw as aT,
	bx as aU,
	ux as aV,
	Am as aW,
	fu as aX,
	ox as aY,
	ex as aZ,
	kw as a_,
	Lg as aa,
	Wo as ab,
	Tm as ac,
	nh as ad,
	Dm as ae,
	Qd as af,
	Xg as ag,
	nx as ah,
	tx as ai,
	_x as aj,
	Kb as ak,
	Gb as al,
	sx as am,
	Gn as an,
	Eg as ao,
	Mw as ap,
	cx as aq,
	Rw as ar,
	jw as as,
	Fw as at,
	Gr as au,
	wd as av,
	Td as aw,
	Pw as ax,
	vx as ay,
	Lw as az,
	Jb as b,
	Yg as b0,
	xd as b1,
	qw as b2,
	Hw as b3,
	Vw as b4,
	nw as b5,
	K_ as b6,
	Ud as b7,
	km as b8,
	Zb as b9,
	Hh as ba,
	yi as c,
	po as d,
	Wb as e,
	Ug as f,
	yx as g,
	zr as h,
	$r as i,
	Kr as j,
	qo as k,
	sn as l,
	ti as m,
	i as n,
	Ub as o,
	qb as p,
	Qo as q,
	nn as r,
	Jg as s,
	ph as t,
	Sw as u,
	xa as v,
	Hn as w,
	ax as x,
	yT as y,
	Cx as z
};
