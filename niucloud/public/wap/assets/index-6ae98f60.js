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
		const s = document.createElement("link");
		return s.rel = n ? "stylesheet" : "modulepreload", n || (s.as = "script", s.crossOrigin = ""), s.href = t, document.head.appendChild(s), n ? new Promise(((e, n) => {
			s.addEventListener("load", e), s.addEventListener("error", (() => n(new Error(`Unable to preload CSS for ${t}`))))
		})) : void 0
	}))).then((() => t()))
}, n = {
	"pages.index.index": "Index",
	"pages.article.list": "Information Center",
	"pages.article.detail": "Information detail",
	"pages.member.index": "My",
	"pages.auth.login": "Login",
	"pages.auth.register": "Register",
	"pages.auth.resetpwd": "Retrieve password",
	"pages.setting.index": "Settings",
	"pages.auth.bind": "Bind Mobile"
}, o = Object.freeze(Object.defineProperty({__proto__: null, default: n}, Symbol.toStringTag, {value: "Module"})), r = {
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
}, i = Object.freeze(Object.defineProperty({__proto__: null, default: r}, Symbol.toStringTag, {value: "Module"}));

function s(e, t) {
	const n = Object.create(null), o = e.split(",");
	for (let r = 0; r < o.length; r++) n[o[r]] = !0;
	return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

function a(e) {
	if (P(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const o = e[n], r = F(o) ? d(o) : a(o);
			if (r) for (const e in r) t[e] = r[e]
		}
		return t
	}
	return F(e) || N(e) ? e : void 0
}

const l = /;(?![^(]*\))/g, c = /:([^]+)/, u = /\/\*.*?\*\//gs;

function d(e) {
	const t = {};
	return e.replace(u, "").split(l).forEach((e => {
		if (e) {
			const n = e.split(c);
			n.length > 1 && (t[n[0].trim()] = n[1].trim())
		}
	})), t
}

function p(e) {
	let t = "";
	if (F(e)) t = e; else if (P(e)) for (let n = 0; n < e.length; n++) {
		const o = p(e[n]);
		o && (t += o + " ")
	} else if (N(e)) for (const n in e) e[n] && (t += n + " ");
	return t.trim()
}

const f = s("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function h(e) {
	return !!e || "" === e
}

function m(e, t) {
	if (e === t) return !0;
	let n = I(e), o = I(t);
	if (n || o) return !(!n || !o) && e.getTime() === t.getTime();
	if (n = j(e), o = j(t), n || o) return e === t;
	if (n = P(e), o = P(t), n || o) return !(!n || !o) && function (e, t) {
		if (e.length !== t.length) return !1;
		let n = !0;
		for (let o = 0; n && o < e.length; o++) n = m(e[o], t[o]);
		return n
	}(e, t);
	if (n = N(e), o = N(t), n || o) {
		if (!n || !o) return !1;
		if (Object.keys(e).length !== Object.keys(t).length) return !1;
		for (const n in e) {
			const o = e.hasOwnProperty(n), r = t.hasOwnProperty(n);
			if (o && !r || !o && r || !m(e[n], t[n])) return !1
		}
	}
	return String(e) === String(t)
}

function g(e, t) {
	return e.findIndex((e => m(e, t)))
}

const v = e => F(e) ? e : null == e ? "" : P(e) || N(e) && (e.toString === D || !M(e.toString)) ? JSON.stringify(e, b, 2) : String(e),
	b = (e, t) => t && t.__v_isRef ? b(e, t.value) : L(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})} : O(t) ? {[`Set(${t.size})`]: [...t.values()]} : !N(t) || P(t) || z(t) ? t : String(t),
	y = {}, _ = [], w = () => {
	}, x = () => !1, T = /^on[^a-z]/, S = e => T.test(e), E = e => e.startsWith("onUpdate:"), k = Object.assign,
	A = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1)
	}, C = Object.prototype.hasOwnProperty, B = (e, t) => C.call(e, t), P = Array.isArray,
	L = e => "[object Map]" === H(e), O = e => "[object Set]" === H(e), I = e => "[object Date]" === H(e),
	M = e => "function" == typeof e, F = e => "string" == typeof e, j = e => "symbol" == typeof e,
	N = e => null !== e && "object" == typeof e, R = e => N(e) && M(e.then) && M(e.catch),
	D = Object.prototype.toString, H = e => D.call(e), z = e => "[object Object]" === H(e),
	q = e => F(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
	V = s(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
	W = e => {
		const t = Object.create(null);
		return n => t[n] || (t[n] = e(n))
	}, $ = /-(\w)/g, Q = W((e => e.replace($, ((e, t) => t ? t.toUpperCase() : "")))), U = /\B([A-Z])/g,
	X = W((e => e.replace(U, "-$1").toLowerCase())), Y = W((e => e.charAt(0).toUpperCase() + e.slice(1))),
	J = W((e => e ? `on${Y(e)}` : "")), G = (e, t) => !Object.is(e, t), K = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t)
	}, Z = (e, t, n) => {
		Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
	}, ee = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t
	};
let te;
const ne = ["ad", "ad-content-page", "ad-draw", "audio", "button", "camera", "canvas", "checkbox", "checkbox-group", "cover-image", "cover-view", "editor", "form", "functional-page-navigator", "icon", "image", "input", "label", "live-player", "live-pusher", "map", "movable-area", "movable-view", "navigator", "official-account", "open-data", "picker", "picker-view", "picker-view-column", "progress", "radio", "radio-group", "rich-text", "scroll-view", "slider", "swiper", "swiper-item", "switch", "text", "textarea", "video", "view", "web-view"].map((e => "uni-" + e));
const oe = ["%", "%"], re = /^([a-z-]+:)?\/\//i, ie = /^data:.*,.*/;

function se(e) {
	return e && (e.appContext ? e.proxy : e)
}

function ae(e) {
	if (!e) return;
	let t = e.type.name;
	for (; t && (n = X(t), -1 !== ne.indexOf("uni-" + n.replace("v-uni-", "")));) t = (e = e.parent).type.name;
	var n;
	return e.proxy
}

function le(e) {
	return 1 === e.nodeType
}

function ce(e) {
	return 0 === e.indexOf("/")
}

function ue(e) {
	return ce(e) ? e : "/" + e
}

function de(e) {
	return ce(e) ? e.slice(1) : e
}

function pe(e, t) {
	for (const n in t) e.style[n] = t[n]
}

function fe(e, t = null) {
	let n;
	return (...o) => (e && (n = e.apply(t, o), e = null), n)
}

function he(e) {
	return Q(e.substring(5))
}

const me = fe((() => {
	const e = HTMLElement.prototype, t = e.setAttribute;
	e.setAttribute = function (e, n) {
		if (e.startsWith("data-") && this.tagName.startsWith("UNI-")) {
			(this.__uniDataset || (this.__uniDataset = {}))[he(e)] = n
		}
		t.call(this, e, n)
	};
	const n = e.removeAttribute;
	e.removeAttribute = function (e) {
		this.__uniDataset && e.startsWith("data-") && this.tagName.startsWith("UNI-") && delete this.__uniDataset[he(e)], n.call(this, e)
	}
}));

function ge(e) {
	return k({}, e.dataset, e.__uniDataset)
}

const ve = new RegExp("\"[^\"]+\"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px", "g");

function be(e) {
	return {passive: e}
}

function ye(e) {
	const {id: t, offsetTop: n, offsetLeft: o} = e;
	return {id: t, dataset: ge(e), offsetTop: n, offsetLeft: o}
}

function _e(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {
	}
	return "" + e
}

function we(e = {}) {
	const t = {};
	return Object.keys(e).forEach((n => {
		try {
			t[n] = _e(e[n])
		} catch (o) {
			t[n] = e[n]
		}
	})), t
}

const xe = /\+/g;

function Te(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e).split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(xe, " ");
		let r = e.indexOf("="), i = _e(r < 0 ? e : e.slice(0, r)), s = r < 0 ? null : _e(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			P(e) || (e = t[i] = [e]), e.push(s)
		} else t[i] = s
	}
	return t
}

function Se(e, t, {clearTimeout: n, setTimeout: o}) {
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

class Ee {
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

const ke = ["onInit", "onLoad", "onShow", "onHide", "onUnload", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onShareAppMessage", "onAddToFavorites", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"],
	Ae = ["onLoad", "onShow"];
const Ce = ["onShow", "onHide", "onLaunch", "onError", "onThemeChange", "onPageNotFound", "onUnhandledRejection", "onInit", "onLoad", "onReady", "onUnload", "onResize", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onAddToFavorites", "onShareAppMessage", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"];
const Be = [];
const Pe = fe(((e, t) => {
	if (M(e._component.onError)) return t(e)
})), Le = function () {
};
Le.prototype = {
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
		if (o && t) for (var i = 0, s = o.length; i < s; i++) o[i].fn !== t && o[i].fn._ !== t && r.push(o[i]);
		return r.length ? n[e] = r : delete n[e], this
	}
};
var Oe = Le;
const Ie = {black: "rgba(0,0,0,0.4)", white: "rgba(255,255,255,0.4)"};

function Me(e, t = {}, n = "light") {
	const o = t[n], r = {};
	return o ? (Object.keys(e).forEach((i => {
		let s = e[i];
		r[i] = (() => {
			if (z(s)) return Me(s, t, n);
			if (P(s)) return s.map((e => z(e) ? Me(e, t, n) : e));
			if (F(s) && s.startsWith("@")) {
				const t = s.replace("@", "");
				let n = o[t] || s;
				switch (i) {
					case"titleColor":
						n = "black" === n ? "#000000" : "#ffffff";
						break;
					case"borderStyle":
						n = (e = n) && e in Ie ? Ie[e] : e
				}
				return n
			}
			var e;
			return s
		})()
	})), r) : e
}

let Fe;

class je {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Fe, !e && Fe && (this.index = (Fe.scopes || (Fe.scopes = [])).push(this) - 1)
	}

	get active() {
		return this._active
	}

	run(e) {
		if (this._active) {
			const t = Fe;
			try {
				return Fe = this, e()
			} finally {
				Fe = t
			}
		}
	}

	on() {
		Fe = this
	}

	off() {
		Fe = this.parent
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

function Ne(e) {
	return new je(e)
}

function Re() {
	return Fe
}

const De = e => {
	const t = new Set(e);
	return t.w = 0, t.n = 0, t
}, He = e => (e.w & We) > 0, ze = e => (e.n & We) > 0, qe = new WeakMap;
let Ve = 0, We = 1;
let $e;
const Qe = Symbol(""), Ue = Symbol("");

class Xe {
	constructor(e, t = null, n) {
		this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, function (e, t = Fe) {
			t && t.active && t.effects.push(e)
		}(this, n)
	}

	run() {
		if (!this.active) return this.fn();
		let e = $e, t = Je;
		for (; e;) {
			if (e === this) return;
			e = e.parent
		}
		try {
			return this.parent = $e, $e = this, Je = !0, We = 1 << ++Ve, Ve <= 30 ? (({deps: e}) => {
				if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= We
			})(this) : Ye(this), this.fn()
		} finally {
			Ve <= 30 && (e => {
				const {deps: t} = e;
				if (t.length) {
					let n = 0;
					for (let o = 0; o < t.length; o++) {
						const r = t[o];
						He(r) && !ze(r) ? r.delete(e) : t[n++] = r, r.w &= ~We, r.n &= ~We
					}
					t.length = n
				}
			})(this), We = 1 << --Ve, $e = this.parent, Je = t, this.parent = void 0, this.deferStop && this.stop()
		}
	}

	stop() {
		$e === this ? this.deferStop = !0 : this.active && (Ye(this), this.onStop && this.onStop(), this.active = !1)
	}
}

function Ye(e) {
	const {deps: t} = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0
	}
}

let Je = !0;
const Ge = [];

function Ke() {
	Ge.push(Je), Je = !1
}

function Ze() {
	const e = Ge.pop();
	Je = void 0 === e || e
}

function et(e, t, n) {
	if (Je && $e) {
		let t = qe.get(e);
		t || qe.set(e, t = new Map);
		let o = t.get(n);
		o || t.set(n, o = De()), tt(o)
	}
}

function tt(e, t) {
	let n = !1;
	Ve <= 30 ? ze(e) || (e.n |= We, n = !He(e)) : n = !e.has($e), n && (e.add($e), $e.deps.push(e))
}

function nt(e, t, n, o, r, i) {
	const s = qe.get(e);
	if (!s) return;
	let a = [];
	if ("clear" === t) a = [...s.values()]; else if ("length" === n && P(e)) {
		const e = Number(o);
		s.forEach(((t, n) => {
			("length" === n || n >= e) && a.push(t)
		}))
	} else switch (void 0 !== n && a.push(s.get(n)), t) {
		case"add":
			P(e) ? q(n) && a.push(s.get("length")) : (a.push(s.get(Qe)), L(e) && a.push(s.get(Ue)));
			break;
		case"delete":
			P(e) || (a.push(s.get(Qe)), L(e) && a.push(s.get(Ue)));
			break;
		case"set":
			L(e) && a.push(s.get(Qe))
	}
	if (1 === a.length) a[0] && ot(a[0]); else {
		const e = [];
		for (const t of a) t && e.push(...t);
		ot(De(e))
	}
}

function ot(e, t) {
	const n = P(e) ? e : [...e];
	for (const o of n) o.computed && rt(o);
	for (const o of n) o.computed || rt(o)
}

function rt(e, t) {
	(e !== $e || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

const it = s("__proto__,__v_isRef,__isVue"),
	st = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(j)),
	at = ft(), lt = ft(!1, !0), ct = ft(!0), ut = dt();

function dt() {
	const e = {};
	return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
		e[t] = function (...e) {
			const n = Gt(this);
			for (let t = 0, r = this.length; t < r; t++) et(n, 0, t + "");
			const o = n[t](...e);
			return -1 === o || !1 === o ? n[t](...e.map(Gt)) : o
		}
	})), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
		e[t] = function (...e) {
			Ke();
			const n = Gt(this)[t].apply(this, e);
			return Ze(), n
		}
	})), e
}

function pt(e) {
	const t = Gt(this);
	return et(t, 0, e), t.hasOwnProperty(e)
}

function ft(e = !1, t = !1) {
	return function (n, o, r) {
		if ("__v_isReactive" === o) return !e;
		if ("__v_isReadonly" === o) return e;
		if ("__v_isShallow" === o) return t;
		if ("__v_raw" === o && r === (e ? t ? qt : zt : t ? Ht : Dt).get(n)) return n;
		const i = P(n);
		if (!e) {
			if (i && B(ut, o)) return Reflect.get(ut, o, r);
			if ("hasOwnProperty" === o) return pt
		}
		const s = Reflect.get(n, o, r);
		return (j(o) ? st.has(o) : it(o)) ? s : (e || et(n, 0, o), t ? s : on(s) ? i && q(o) ? s : s.value : N(s) ? e ? $t(s) : Wt(s) : s)
	}
}

function ht(e = !1) {
	return function (t, n, o, r) {
		let i = t[n];
		if (Xt(i) && on(i) && !on(o)) return !1;
		if (!e && (Yt(o) || Xt(o) || (i = Gt(i), o = Gt(o)), !P(t) && on(i) && !on(o))) return i.value = o, !0;
		const s = P(t) && q(n) ? Number(n) < t.length : B(t, n), a = Reflect.set(t, n, o, r);
		return t === Gt(r) && (s ? G(o, i) && nt(t, "set", n, o) : nt(t, "add", n, o)), a
	}
}

const mt = {
		get: at, set: ht(), deleteProperty: function (e, t) {
			const n = B(e, t);
			e[t];
			const o = Reflect.deleteProperty(e, t);
			return o && n && nt(e, "delete", t, void 0), o
		}, has: function (e, t) {
			const n = Reflect.has(e, t);
			return j(t) && st.has(t) || et(e, 0, t), n
		}, ownKeys: function (e) {
			return et(e, 0, P(e) ? "length" : Qe), Reflect.ownKeys(e)
		}
	}, gt = {get: ct, set: (e, t) => !0, deleteProperty: (e, t) => !0}, vt = k({}, mt, {get: lt, set: ht(!0)}), bt = e => e,
	yt = e => Reflect.getPrototypeOf(e);

function _t(e, t, n = !1, o = !1) {
	const r = Gt(e = e.__v_raw), i = Gt(t);
	n || (t !== i && et(r, 0, t), et(r, 0, i));
	const {has: s} = yt(r), a = o ? bt : n ? en : Zt;
	return s.call(r, t) ? a(e.get(t)) : s.call(r, i) ? a(e.get(i)) : void (e !== r && e.get(t))
}

function wt(e, t = !1) {
	const n = this.__v_raw, o = Gt(n), r = Gt(e);
	return t || (e !== r && et(o, 0, e), et(o, 0, r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function xt(e, t = !1) {
	return e = e.__v_raw, !t && et(Gt(e), 0, Qe), Reflect.get(e, "size", e)
}

function Tt(e) {
	e = Gt(e);
	const t = Gt(this);
	return yt(t).has.call(t, e) || (t.add(e), nt(t, "add", e, e)), this
}

function St(e, t) {
	t = Gt(t);
	const n = Gt(this), {has: o, get: r} = yt(n);
	let i = o.call(n, e);
	i || (e = Gt(e), i = o.call(n, e));
	const s = r.call(n, e);
	return n.set(e, t), i ? G(t, s) && nt(n, "set", e, t) : nt(n, "add", e, t), this
}

function Et(e) {
	const t = Gt(this), {has: n, get: o} = yt(t);
	let r = n.call(t, e);
	r || (e = Gt(e), r = n.call(t, e)), o && o.call(t, e);
	const i = t.delete(e);
	return r && nt(t, "delete", e, void 0), i
}

function kt() {
	const e = Gt(this), t = 0 !== e.size, n = e.clear();
	return t && nt(e, "clear", void 0, void 0), n
}

function At(e, t) {
	return function (n, o) {
		const r = this, i = r.__v_raw, s = Gt(i), a = t ? bt : e ? en : Zt;
		return !e && et(s, 0, Qe), i.forEach(((e, t) => n.call(o, a(e), a(t), r)))
	}
}

function Ct(e, t, n) {
	return function (...o) {
		const r = this.__v_raw, i = Gt(r), s = L(i), a = "entries" === e || e === Symbol.iterator && s,
			l = "keys" === e && s, c = r[e](...o), u = n ? bt : t ? en : Zt;
		return !t && et(i, 0, l ? Ue : Qe), {
			next() {
				const {value: e, done: t} = c.next();
				return t ? {value: e, done: t} : {value: a ? [u(e[0]), u(e[1])] : u(e), done: t}
			}, [Symbol.iterator]() {
				return this
			}
		}
	}
}

function Bt(e) {
	return function (...t) {
		return "delete" !== e && this
	}
}

function Pt() {
	const e = {
		get(e) {
			return _t(this, e)
		}, get size() {
			return xt(this)
		}, has: wt, add: Tt, set: St, delete: Et, clear: kt, forEach: At(!1, !1)
	}, t = {
		get(e) {
			return _t(this, e, !1, !0)
		}, get size() {
			return xt(this)
		}, has: wt, add: Tt, set: St, delete: Et, clear: kt, forEach: At(!1, !0)
	}, n = {
		get(e) {
			return _t(this, e, !0)
		}, get size() {
			return xt(this, !0)
		}, has(e) {
			return wt.call(this, e, !0)
		}, add: Bt("add"), set: Bt("set"), delete: Bt("delete"), clear: Bt("clear"), forEach: At(!0, !1)
	}, o = {
		get(e) {
			return _t(this, e, !0, !0)
		}, get size() {
			return xt(this, !0)
		}, has(e) {
			return wt.call(this, e, !0)
		}, add: Bt("add"), set: Bt("set"), delete: Bt("delete"), clear: Bt("clear"), forEach: At(!0, !0)
	};
	return ["keys", "values", "entries", Symbol.iterator].forEach((r => {
		e[r] = Ct(r, !1, !1), n[r] = Ct(r, !0, !1), t[r] = Ct(r, !1, !0), o[r] = Ct(r, !0, !0)
	})), [e, n, t, o]
}

const [Lt, Ot, It, Mt] = Pt();

function Ft(e, t) {
	const n = t ? e ? Mt : It : e ? Ot : Lt;
	return (t, o, r) => "__v_isReactive" === o ? !e : "__v_isReadonly" === o ? e : "__v_raw" === o ? t : Reflect.get(B(n, o) && o in t ? n : t, o, r)
}

const jt = {get: Ft(!1, !1)}, Nt = {get: Ft(!1, !0)}, Rt = {get: Ft(!0, !1)}, Dt = new WeakMap, Ht = new WeakMap,
	zt = new WeakMap, qt = new WeakMap;

function Vt(e) {
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
	}((e => H(e).slice(8, -1))(e))
}

function Wt(e) {
	return Xt(e) ? e : Qt(e, !1, mt, jt, Dt)
}

function $t(e) {
	return Qt(e, !0, gt, Rt, zt)
}

function Qt(e, t, n, o, r) {
	if (!N(e)) return e;
	if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
	const i = r.get(e);
	if (i) return i;
	const s = Vt(e);
	if (0 === s) return e;
	const a = new Proxy(e, 2 === s ? o : n);
	return r.set(e, a), a
}

function Ut(e) {
	return Xt(e) ? Ut(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function Xt(e) {
	return !(!e || !e.__v_isReadonly)
}

function Yt(e) {
	return !(!e || !e.__v_isShallow)
}

function Jt(e) {
	return Ut(e) || Xt(e)
}

function Gt(e) {
	const t = e && e.__v_raw;
	return t ? Gt(t) : e
}

function Kt(e) {
	return Z(e, "__v_skip", !0), e
}

const Zt = e => N(e) ? Wt(e) : e, en = e => N(e) ? $t(e) : e;

function tn(e) {
	Je && $e && tt((e = Gt(e)).dep || (e.dep = De()))
}

function nn(e, t) {
	const n = (e = Gt(e)).dep;
	n && ot(n)
}

function on(e) {
	return !(!e || !0 !== e.__v_isRef)
}

function rn(e) {
	return an(e, !1)
}

function sn(e) {
	return an(e, !0)
}

function an(e, t) {
	return on(e) ? e : new ln(e, t)
}

class ln {
	constructor(e, t) {
		this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Gt(e), this._value = t ? e : Zt(e)
	}

	get value() {
		return tn(this), this._value
	}

	set value(e) {
		const t = this.__v_isShallow || Yt(e) || Xt(e);
		e = t ? e : Gt(e), G(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : Zt(e), nn(this))
	}
}

function cn(e) {
	return on(e) ? e.value : e
}

const un = {
	get: (e, t, n) => cn(Reflect.get(e, t, n)), set: (e, t, n, o) => {
		const r = e[t];
		return on(r) && !on(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o)
	}
};

function dn(e) {
	return Ut(e) ? e : new Proxy(e, un)
}

class pn {
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
		return e = Gt(this._object), t = this._key, null === (n = qe.get(e)) || void 0 === n ? void 0 : n.get(t);
		var e, t, n
	}
}

function fn(e, t, n) {
	const o = e[t];
	return on(o) ? o : new pn(e, t, n)
}

var hn;

class mn {
	constructor(e, t, n, o) {
		this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[hn] = !1, this._dirty = !0, this.effect = new Xe(e, (() => {
			this._dirty || (this._dirty = !0, nn(this))
		})), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n
	}

	get value() {
		const e = Gt(this);
		return tn(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
	}

	set value(e) {
		this._setter(e)
	}
}

function gn(e, t, n, o) {
	let r;
	try {
		r = o ? e(...o) : e()
	} catch (i) {
		bn(i, t, n)
	}
	return r
}

function vn(e, t, n, o) {
	if (M(e)) {
		const r = gn(e, t, n, o);
		return r && R(r) && r.catch((e => {
			bn(e, t, n)
		})), r
	}
	const r = [];
	for (let i = 0; i < e.length; i++) r.push(vn(e[i], t, n, o));
	return r
}

function bn(e, t, n, o = !0) {
	t && t.vnode;
	if (t) {
		let o = t.parent;
		const r = t.proxy, i = n;
		for (; o;) {
			const t = o.ec;
			if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, i)) return;
			o = o.parent
		}
		const s = t.appContext.config.errorHandler;
		if (s) return void gn(s, null, 10, [e, r, i])
	}
	!function (e, t, n, o = !0) {
		console.error(e)
	}(e, 0, 0, o)
}

hn = "__v_isReadonly";
let yn = !1, _n = !1;
const wn = [];
let xn = 0;
const Tn = [];
let Sn = null, En = 0;
const kn = Promise.resolve();
let An = null;

function Cn(e) {
	const t = An || kn;
	return e ? t.then(this ? e.bind(this) : e) : t
}

function Bn(e) {
	wn.length && wn.includes(e, yn && e.allowRecurse ? xn + 1 : xn) || (null == e.id ? wn.push(e) : wn.splice(function (e) {
		let t = xn + 1, n = wn.length;
		for (; t < n;) {
			const o = t + n >>> 1;
			In(wn[o]) < e ? t = o + 1 : n = o
		}
		return t
	}(e.id), 0, e), Pn())
}

function Pn() {
	yn || _n || (_n = !0, An = kn.then(Fn))
}

function Ln(e, t = (yn ? xn + 1 : 0)) {
	for (; t < wn.length; t++) {
		const e = wn[t];
		e && e.pre && (wn.splice(t, 1), t--, e())
	}
}

function On(e) {
	if (Tn.length) {
		const e = [...new Set(Tn)];
		if (Tn.length = 0, Sn) return void Sn.push(...e);
		for (Sn = e, Sn.sort(((e, t) => In(e) - In(t))), En = 0; En < Sn.length; En++) Sn[En]();
		Sn = null, En = 0
	}
}

const In = e => null == e.id ? 1 / 0 : e.id, Mn = (e, t) => {
	const n = In(e) - In(t);
	if (0 === n) {
		if (e.pre && !t.pre) return -1;
		if (t.pre && !e.pre) return 1
	}
	return n
};

function Fn(e) {
	_n = !1, yn = !0, wn.sort(Mn);
	try {
		for (xn = 0; xn < wn.length; xn++) {
			const e = wn[xn];
			e && !1 !== e.active && gn(e, null, 14)
		}
	} finally {
		xn = 0, wn.length = 0, On(), yn = !1, An = null, (wn.length || Tn.length) && Fn()
	}
}

function jn(e, t, ...n) {
	if (e.isUnmounted) return;
	const o = e.vnode.props || y;
	let r = n;
	const i = t.startsWith("update:"), s = i && t.slice(7);
	if (s && s in o) {
		const e = `${"modelValue" === s ? "model" : s}Modifiers`, {number: t, trim: i} = o[e] || y;
		i && (r = n.map((e => F(e) ? e.trim() : e))), t && (r = n.map(ee))
	}
	let a, l = o[a = J(t)] || o[a = J(Q(t))];
	!l && i && (l = o[a = J(X(t))]), l && vn(l, e, 6, Nn(e, l, r));
	const c = o[a + "Once"];
	if (c) {
		if (e.emitted) {
			if (e.emitted[a]) return
		} else e.emitted = {};
		e.emitted[a] = !0, vn(c, e, 6, Nn(e, c, r))
	}
}

function Nn(e, t, n) {
	if (1 !== n.length) return n;
	if (M(t)) {
		if (t.length < 2) return n
	} else if (!t.find((e => e.length >= 2))) return n;
	const o = n[0];
	if (o && B(o, "type") && B(o, "timeStamp") && B(o, "target") && B(o, "currentTarget") && B(o, "detail")) {
		const t = e.proxy, o = t.$gcd(t, !0);
		o && n.push(o)
	}
	return n
}

function Rn(e, t, n = !1) {
	const o = t.emitsCache, r = o.get(e);
	if (void 0 !== r) return r;
	const i = e.emits;
	let s = {}, a = !1;
	if (!M(e)) {
		const o = e => {
			const n = Rn(e, t, !0);
			n && (a = !0, k(s, n))
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	return i || a ? (P(i) ? i.forEach((e => s[e] = null)) : k(s, i), N(e) && o.set(e, s), s) : (N(e) && o.set(e, null), null)
}

function Dn(e, t) {
	return !(!e || !S(t)) && (t = t.slice(2).replace(/Once$/, ""), B(e, t[0].toLowerCase() + t.slice(1)) || B(e, X(t)) || B(e, t))
}

let Hn = null, zn = null;

function qn(e) {
	const t = Hn;
	return Hn = e, zn = e && e.type.__scopeId || null, t
}

function Vn(e, t = Hn, n) {
	if (!t) return e;
	if (e._n) return e;
	const o = (...n) => {
		o._d && Wr(-1);
		const r = qn(t);
		let i;
		try {
			i = e(...n)
		} finally {
			qn(r), o._d && Wr(1)
		}
		return i
	};
	return o._n = !0, o._c = !0, o._d = !0, o
}

function Wn(e) {
	const {type: t, vnode: n, proxy: o, withProxy: r, props: i, propsOptions: [s], slots: a, attrs: l, emit: c, render: u, renderCache: d, data: p, setupState: f, ctx: h, inheritAttrs: m} = e;
	let g, v;
	const b = qn(e);
	try {
		if (4 & n.shapeFlag) {
			const e = r || o;
			g = ri(u.call(e, e, d, i, f, p, h)), v = l
		} else {
			const e = t;
			0, g = ri(e.length > 1 ? e(i, {attrs: l, slots: a, emit: c}) : e(i, null)), v = t.props ? l : $n(l)
		}
	} catch (_) {
		Hr.length = 0, bn(_, e, 1), g = ei(Rr)
	}
	let y = g;
	if (v && !1 !== m) {
		const e = Object.keys(v), {shapeFlag: t} = y;
		e.length && 7 & t && (s && e.some(E) && (v = Qn(v, s)), y = ti(y, v))
	}
	return n.dirs && (y = ti(y), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && (y.transition = n.transition), g = y, qn(b), g
}

const $n = e => {
	let t;
	for (const n in e) ("class" === n || "style" === n || S(n)) && ((t || (t = {}))[n] = e[n]);
	return t
}, Qn = (e, t) => {
	const n = {};
	for (const o in e) E(o) && o.slice(9) in t || (n[o] = e[o]);
	return n
};

function Un(e, t, n) {
	const o = Object.keys(t);
	if (o.length !== Object.keys(e).length) return !0;
	for (let r = 0; r < o.length; r++) {
		const i = o[r];
		if (t[i] !== e[i] && !Dn(n, i)) return !0
	}
	return !1
}

const Xn = e => e.__isSuspense;

function Yn(e, t) {
	if (di) {
		let n = di.provides;
		const o = di.parent && di.parent.provides;
		o === n && (n = di.provides = Object.create(o)), n[e] = t, "app" === di.type.mpType && di.appContext.app.provide(e, t)
	} else ;
}

function Jn(e, t, n = !1) {
	const o = di || Hn;
	if (o) {
		const r = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return n && M(t) ? t.call(o.proxy) : t
	}
}

function Gn(e, t) {
	return eo(e, null, t)
}

const Kn = {};

function Zn(e, t, n) {
	return eo(e, t, n)
}

function eo(e, t, {immediate: n, deep: o, flush: r, onTrack: i, onTrigger: s} = y) {
	const a = Re() === (null == di ? void 0 : di.scope) ? di : null;
	let l, c, u = !1, d = !1;
	if (on(e) ? (l = () => e.value, u = Yt(e)) : Ut(e) ? (l = () => e, o = !0) : P(e) ? (d = !0, u = e.some((e => Ut(e) || Yt(e))), l = () => e.map((e => on(e) ? e.value : Ut(e) ? oo(e) : M(e) ? gn(e, a, 2) : void 0))) : l = M(e) ? t ? () => gn(e, a, 2) : () => {
		if (!a || !a.isUnmounted) return c && c(), vn(e, a, 3, [f])
	} : w, t && o) {
		const e = l;
		l = () => oo(e())
	}
	let p, f = e => {
		c = v.onStop = () => {
			gn(e, a, 4)
		}
	};
	if (gi) {
		if (f = w, t ? n && vn(t, a, 3, [l(), d ? [] : void 0, f]) : l(), "sync" !== r) return w;
		{
			const e = Si();
			p = e.__watcherHandles || (e.__watcherHandles = [])
		}
	}
	let h = d ? new Array(e.length).fill(Kn) : Kn;
	const m = () => {
		if (v.active) if (t) {
			const e = v.run();
			(o || u || (d ? e.some(((e, t) => G(e, h[t]))) : G(e, h))) && (c && c(), vn(t, a, 3, [e, h === Kn ? void 0 : d && h[0] === Kn ? [] : h, f]), h = e)
		} else v.run()
	};
	let g;
	m.allowRecurse = !!t, "sync" === r ? g = m : "post" === r ? g = () => Or(m, a && a.suspense) : (m.pre = !0, a && (m.id = a.uid), g = () => Bn(m));
	const v = new Xe(l, g);
	t ? n ? m() : h = v.run() : "post" === r ? Or(v.run.bind(v), a && a.suspense) : v.run();
	const b = () => {
		v.stop(), a && a.scope && A(a.scope.effects, v)
	};
	return p && p.push(b), b
}

function to(e, t, n) {
	const o = this.proxy, r = F(e) ? e.includes(".") ? no(o, e) : () => o[e] : e.bind(o, o);
	let i;
	M(t) ? i = t : (i = t.handler, n = t);
	const s = di;
	fi(this);
	const a = eo(r, i.bind(o), n);
	return s ? fi(s) : hi(), a
}

function no(e, t) {
	const n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t
	}
}

function oo(e, t) {
	if (!N(e) || e.__v_skip) return e;
	if ((t = t || new Set).has(e)) return e;
	if (t.add(e), on(e)) oo(e.value, t); else if (P(e)) for (let n = 0; n < e.length; n++) oo(e[n], t); else if (O(e) || L(e)) e.forEach((e => {
		oo(e, t)
	})); else if (z(e)) for (const n in e) oo(e[n], t);
	return e
}

const ro = [Function, Array], io = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: ro,
	onEnter: ro,
	onAfterEnter: ro,
	onEnterCancelled: ro,
	onBeforeLeave: ro,
	onLeave: ro,
	onAfterLeave: ro,
	onLeaveCancelled: ro,
	onBeforeAppear: ro,
	onAppear: ro,
	onAfterAppear: ro,
	onAppearCancelled: ro
}, so = {
	name: "BaseTransition", props: io, setup(e, {slots: t}) {
		const n = pi(), o = function () {
			const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
			return Fo((() => {
				e.isMounted = !0
			})), Ro((() => {
				e.isUnmounting = !0
			})), e
		}();
		let r;
		return () => {
			const i = t.default && fo(t.default(), !0);
			if (!i || !i.length) return;
			let s = i[0];
			if (i.length > 1) for (const e of i) if (e.type !== Rr) {
				s = e;
				break
			}
			const a = Gt(e), {mode: l} = a;
			if (o.isLeaving) return co(s);
			const c = uo(s);
			if (!c) return co(s);
			const u = lo(c, a, o, n);
			po(c, u);
			const d = n.subTree, p = d && uo(d);
			let f = !1;
			const {getTransitionKey: h} = c.type;
			if (h) {
				const e = h();
				void 0 === r ? r = e : e !== r && (r = e, f = !0)
			}
			if (p && p.type !== Rr && (!Yr(c, p) || f)) {
				const e = lo(p, a, o, n);
				if (po(p, e), "out-in" === l) return o.isLeaving = !0, e.afterLeave = () => {
					o.isLeaving = !1, !1 !== n.update.active && n.update()
				}, co(s);
				"in-out" === l && c.type !== Rr && (e.delayLeave = (e, t, n) => {
					ao(o, p)[String(p.key)] = p, e._leaveCb = () => {
						t(), e._leaveCb = void 0, delete u.delayedLeave
					}, u.delayedLeave = n
				})
			}
			return s
		}
	}
};

function ao(e, t) {
	const {leavingVNodes: n} = e;
	let o = n.get(t.type);
	return o || (o = Object.create(null), n.set(t.type, o)), o
}

function lo(e, t, n, o) {
	const {appear: r, mode: i, persisted: s = !1, onBeforeEnter: a, onEnter: l, onAfterEnter: c, onEnterCancelled: u, onBeforeLeave: d, onLeave: p, onAfterLeave: f, onLeaveCancelled: h, onBeforeAppear: m, onAppear: g, onAfterAppear: v, onAppearCancelled: b} = t,
		y = String(e.key), _ = ao(n, e), w = (e, t) => {
			e && vn(e, o, 9, t)
		}, x = (e, t) => {
			const n = t[1];
			w(e, t), P(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n()
		}, T = {
			mode: i, persisted: s, beforeEnter(t) {
				let o = a;
				if (!n.isMounted) {
					if (!r) return;
					o = m || a
				}
				t._leaveCb && t._leaveCb(!0);
				const i = _[y];
				i && Yr(e, i) && i.el._leaveCb && i.el._leaveCb(), w(o, [t])
			}, enter(e) {
				let t = l, o = c, i = u;
				if (!n.isMounted) {
					if (!r) return;
					t = g || l, o = v || c, i = b || u
				}
				let s = !1;
				const a = e._enterCb = t => {
					s || (s = !0, w(t ? i : o, [e]), T.delayedLeave && T.delayedLeave(), e._enterCb = void 0)
				};
				t ? x(t, [e, a]) : a()
			}, leave(t, o) {
				const r = String(e.key);
				if (t._enterCb && t._enterCb(!0), n.isUnmounting) return o();
				w(d, [t]);
				let i = !1;
				const s = t._leaveCb = n => {
					i || (i = !0, o(), w(n ? h : f, [t]), t._leaveCb = void 0, _[r] === e && delete _[r])
				};
				_[r] = e, p ? x(p, [t, s]) : s()
			}, clone: e => lo(e, t, n, o)
		};
	return T
}

function co(e) {
	if (bo(e)) return (e = ti(e)).children = null, e
}

function uo(e) {
	return bo(e) ? e.children ? e.children[0] : void 0 : e
}

function po(e, t) {
	6 & e.shapeFlag && e.component ? po(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function fo(e, t = !1, n) {
	let o = [], r = 0;
	for (let i = 0; i < e.length; i++) {
		let s = e[i];
		const a = null == n ? s.key : String(n) + String(null != s.key ? s.key : i);
		s.type === jr ? (128 & s.patchFlag && r++, o = o.concat(fo(s.children, t, a))) : (t || s.type !== Rr) && o.push(null != a ? ti(s, {key: a}) : s)
	}
	if (r > 1) for (let i = 0; i < o.length; i++) o[i].patchFlag = -2;
	return o
}

function ho(e) {
	return M(e) ? {setup: e, name: e.name} : e
}

const mo = e => !!e.type.__asyncLoader;

function go(e) {
	M(e) && (e = {loader: e});
	const {loader: t, loadingComponent: n, errorComponent: o, delay: r = 200, timeout: i, suspensible: s = !0, onError: a} = e;
	let l, c = null, u = 0;
	const d = () => {
		let e;
		return c || (e = c = t().catch((e => {
			if (e = e instanceof Error ? e : new Error(String(e)), a) return new Promise(((t, n) => {
				a(e, (() => t((u++, c = null, d()))), (() => n(e)), u + 1)
			}));
			throw e
		})).then((t => e !== c && c ? c : (t && (t.__esModule || "Module" === t[Symbol.toStringTag]) && (t = t.default), l = t, t))))
	};
	return ho({
		name: "AsyncComponentWrapper", __asyncLoader: d, get __asyncResolved() {
			return l
		}, setup() {
			const e = di;
			if (l) return () => vo(l, e);
			const t = t => {
				c = null, bn(t, e, 13, !o)
			};
			if (s && e.suspense || gi) return d().then((t => () => vo(t, e))).catch((e => (t(e), () => o ? ei(o, {error: e}) : null)));
			const a = rn(!1), u = rn(), p = rn(!!r);
			return r && setTimeout((() => {
				p.value = !1
			}), r), null != i && setTimeout((() => {
				if (!a.value && !u.value) {
					const e = new Error(`Async component timed out after ${i}ms.`);
					t(e), u.value = e
				}
			}), i), d().then((() => {
				a.value = !0, e.parent && bo(e.parent.vnode) && Bn(e.parent.update)
			})).catch((e => {
				t(e), u.value = e
			})), () => a.value && l ? vo(l, e) : u.value && o ? ei(o, {error: u.value}) : n && !p.value ? ei(n) : void 0
		}
	})
}

function vo(e, t) {
	const {ref: n, props: o, children: r, ce: i} = t.vnode, s = ei(e, o, r);
	return s.ref = n, s.ce = i, delete t.vnode.ce, s
}

const bo = e => e.type.__isKeepAlive;

class yo {
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

const _o = {
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
		const n = pi(), o = n.ctx;
		if (!o.renderer) return () => {
			const e = t.default && t.default();
			return e && 1 === e.length ? e[0] : e
		};
		const r = e.cache || new yo(e.max);
		r.pruneCacheEntry = s;
		let i = null;

		function s(t) {
			var o;
			!i || !Yr(t, i) || "key" === e.matchBy && t.key !== i.key ? (Ao(o = t), u(o, n, a, !0)) : i && Ao(i)
		}

		const a = n.suspense, {renderer: {p: l, m: c, um: u, o: {createElement: d}}} = o, p = d("div");

		function f(t) {
			r.forEach(((n, o) => {
				const i = Bo(n, e.matchBy);
				!i || t && t(i) || (r.delete(o), s(n))
			}))
		}

		o.activate = (e, t, n, o, r) => {
			const i = e.component;
			if (i.ba) {
				const e = i.isDeactivated;
				i.isDeactivated = !1, K(i.ba), i.isDeactivated = e
			}
			c(e, t, n, 0, a), l(i.vnode, e, t, n, i, a, o, e.slotScopeIds, r), Or((() => {
				i.isDeactivated = !1, i.a && K(i.a);
				const t = e.props && e.props.onVnodeMounted;
				t && li(t, i.parent, e)
			}), a)
		}, o.deactivate = e => {
			const t = e.component;
			t.bda && Po(t.bda), c(e, p, null, 1, a), Or((() => {
				t.bda && Lo(t.bda), t.da && K(t.da);
				const n = e.props && e.props.onVnodeUnmounted;
				n && li(n, t.parent, e), t.isDeactivated = !0
			}), a)
		}, Zn((() => [e.include, e.exclude, e.matchBy]), (([e, t]) => {
			e && f((t => xo(e, t))), t && f((e => !xo(t, e)))
		}), {flush: "post", deep: !0});
		let h = null;
		const m = () => {
			null != h && r.set(h, Co(n.subTree))
		};
		return Fo(m), No(m), Ro((() => {
			r.forEach(((t, o) => {
				r.delete(o), s(t);
				const {subTree: i, suspense: a} = n, l = Co(i);
				if (t.type !== l.type || "key" === e.matchBy && t.key !== l.key) ; else {
					l.component.bda && K(l.component.bda), Ao(l);
					const e = l.component.da;
					e && Or(e, a)
				}
			}))
		})), () => {
			if (h = null, !t.default) return null;
			const n = t.default(), o = n[0];
			if (n.length > 1) return i = null, n;
			if (!Xr(o) || !(4 & o.shapeFlag) && !Xn(o.type)) return i = null, o;
			let s = Co(o);
			const a = s.type, l = Bo(s, e.matchBy), {include: c, exclude: u} = e;
			if (c && (!l || !xo(c, l)) || u && l && xo(u, l)) return i = s, o;
			const d = null == s.key ? a : s.key, p = r.get(d);
			return s.el && (s = ti(s), Xn(o.type) && (o.ssContent = s)), h = d, p && (s.el = p.el, s.component = p.component, s.transition && po(s, s.transition), s.shapeFlag |= 512), s.shapeFlag |= 256, i = s, Xn(o.type) ? o : s
		}
	}
}, wo = _o;

function xo(e, t) {
	return P(e) ? e.some((e => xo(e, t))) : F(e) ? e.split(",").includes(t) : !!e.test && e.test(t)
}

function To(e, t) {
	Eo(e, "a", t)
}

function So(e, t) {
	Eo(e, "da", t)
}

function Eo(e, t, n = di) {
	const o = e.__wdc || (e.__wdc = () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent
		}
		return e()
	});
	if (o.__called = !1, Oo(t, o, n), n) {
		let e = n.parent;
		for (; e && e.parent;) bo(e.parent.vnode) && ko(o, t, n, e), e = e.parent
	}
}

function ko(e, t, n, o) {
	const r = Oo(t, e, o, !0);
	Do((() => {
		A(o[t], r)
	}), n)
}

function Ao(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513
}

function Co(e) {
	return Xn(e.type) ? e.ssContent : e
}

function Bo(e, t) {
	if ("name" === t) {
		const t = e.type;
		return _i(mo(e) ? t.__asyncResolved || {} : t)
	}
	return String(e.key)
}

function Po(e) {
	for (let t = 0; t < e.length; t++) {
		const n = e[t];
		n.__called || (n(), n.__called = !0)
	}
}

function Lo(e) {
	e.forEach((e => e.__called = !1))
}

function Oo(e, t, n = di, o = !1) {
	if (n) {
		if (r = e, ke.indexOf(r) > -1 && n.$pageInstance) {
			if (n.type.__reserved) return;
			if (n !== n.$pageInstance && (n = n.$pageInstance, function (e) {
				return Ae.indexOf(e) > -1
			}(e))) {
				const o = n.proxy;
				vn(t.bind(o), n, e, "onLoad" === e ? [o.$page.options] : [])
			}
		}
		const i = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...o) => {
			if (n.isUnmounted) return;
			Ke(), fi(n);
			const r = vn(t, n, e, o);
			return hi(), Ze(), r
		});
		return o ? i.unshift(s) : i.push(s), s
	}
	var r
}

const Io = e => (t, n = di) => (!gi || "sp" === e) && Oo(e, ((...e) => t(...e)), n), Mo = Io("bm"), Fo = Io("m"),
	jo = Io("bu"), No = Io("u"), Ro = Io("bum"), Do = Io("um"), Ho = Io("sp"), zo = Io("rtg"), qo = Io("rtc");

function Vo(e, t = di) {
	Oo("ec", e, t)
}

function Wo(e, t) {
	const n = Hn;
	if (null === n) return e;
	const o = yi(n) || n.proxy, r = e.dirs || (e.dirs = []);
	for (let i = 0; i < t.length; i++) {
		let [e, n, s, a = y] = t[i];
		e && (M(e) && (e = {mounted: e, updated: e}), e.deep && oo(n), r.push({
			dir: e,
			instance: o,
			value: n,
			oldValue: void 0,
			arg: s,
			modifiers: a
		}))
	}
	return e
}

function $o(e, t, n, o) {
	const r = e.dirs, i = t && t.dirs;
	for (let s = 0; s < r.length; s++) {
		const a = r[s];
		i && (a.oldValue = i[s].value);
		let l = a.dir[o];
		l && (Ke(), vn(l, n, 8, [e.el, a, e, t]), Ze())
	}
}

function Qo(e, t) {
	return Yo("components", e, !0, t) || e
}

const Uo = Symbol();

function Xo(e) {
	return F(e) ? Yo("components", e, !1) || e : e || Uo
}

function Yo(e, t, n = !0, o = !1) {
	const r = Hn || di;
	if (r) {
		const n = r.type;
		if ("components" === e) {
			const e = _i(n, !1);
			if (e && (e === t || e === Q(t) || e === Y(Q(t)))) return n
		}
		const i = Jo(r[e] || n[e], t) || Jo(r.appContext[e], t);
		return !i && o ? n : i
	}
}

function Jo(e, t) {
	return e && (e[t] || e[Q(t)] || e[Y(Q(t))])
}

function Go(e, t, n, o) {
	let r;
	const i = n && n[o];
	if (P(e) || F(e)) {
		r = new Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) r[n] = t(e[n], n, void 0, i && i[n])
	} else if ("number" == typeof e) {
		r = new Array(e);
		for (let n = 0; n < e; n++) r[n] = t(n + 1, n, void 0, i && i[n])
	} else if (N(e)) if (e[Symbol.iterator]) r = Array.from(e, ((e, n) => t(e, n, void 0, i && i[n]))); else {
		const n = Object.keys(e);
		r = new Array(n.length);
		for (let o = 0, s = n.length; o < s; o++) {
			const s = n[o];
			r[o] = t(e[s], s, o, i && i[o])
		}
	} else r = [];
	return n && (n[o] = r), r
}

function Ko(e, t, n = {}, o, r) {
	if (Hn.isCE || Hn.parent && mo(Hn.parent) && Hn.parent.isCE) return "default" !== t && (n.name = t), ei("slot", n, o && o());
	let i = e[t];
	i && i._c && (i._d = !1), qr();
	const s = i && Zo(i(n)),
		a = Ur(jr, {key: n.key || s && s.key || `_${t}`}, s || (o ? o() : []), s && 1 === e._ ? 64 : -2);
	return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
}

function Zo(e) {
	return e.some((e => !Xr(e) || e.type !== Rr && !(e.type === jr && !Zo(e.children)))) ? e : null
}

const er = e => e ? mi(e) ? yi(e) || e.proxy : er(e.parent) : null, tr = k(Object.create(null), {
	$: e => e,
	$el: e => e.vnode.el,
	$data: e => e.data,
	$props: e => e.props,
	$attrs: e => e.attrs,
	$slots: e => e.slots,
	$refs: e => e.refs,
	$parent: e => er(e.parent),
	$root: e => er(e.root),
	$emit: e => e.emit,
	$options: e => lr(e),
	$forceUpdate: e => e.f || (e.f = () => Bn(e.update)),
	$nextTick: e => e.n || (e.n = Cn.bind(e.proxy)),
	$watch: e => to.bind(e)
}), nr = (e, t) => e !== y && !e.__isScriptSetup && B(e, t), or = {
	get({_: e}, t) {
		const {ctx: n, setupState: o, data: r, props: i, accessCache: s, type: a, appContext: l} = e;
		let c;
		if ("$" !== t[0]) {
			const a = s[t];
			if (void 0 !== a) switch (a) {
				case 1:
					return o[t];
				case 2:
					return r[t];
				case 4:
					return n[t];
				case 3:
					return i[t]
			} else {
				if (nr(o, t)) return s[t] = 1, o[t];
				if (r !== y && B(r, t)) return s[t] = 2, r[t];
				if ((c = e.propsOptions[0]) && B(c, t)) return s[t] = 3, i[t];
				if (n !== y && B(n, t)) return s[t] = 4, n[t];
				rr && (s[t] = 0)
			}
		}
		const u = tr[t];
		let d, p;
		return u ? ("$attrs" === t && et(e, 0, t), u(e)) : (d = a.__cssModules) && (d = d[t]) ? d : n !== y && B(n, t) ? (s[t] = 4, n[t]) : (p = l.config.globalProperties, B(p, t) ? p[t] : void 0)
	}, set({_: e}, t, n) {
		const {data: o, setupState: r, ctx: i} = e;
		return nr(r, t) ? (r[t] = n, !0) : o !== y && B(o, t) ? (o[t] = n, !0) : !B(e.props, t) && (("$" !== t[0] || !(t.slice(1) in e)) && (i[t] = n, !0))
	}, has({_: {data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: i}}, s) {
		let a;
		return !!n[s] || e !== y && B(e, s) || nr(t, s) || (a = i[0]) && B(a, s) || B(o, s) || B(tr, s) || B(r.config.globalProperties, s)
	}, defineProperty(e, t, n) {
		return null != n.get ? e._.accessCache[t] = 0 : B(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
	}
};
let rr = !0;

function ir(e) {
	const t = lr(e), n = e.proxy, o = e.ctx;
	rr = !1, t.beforeCreate && sr(t.beforeCreate, e, "bc");
	const {data: r, computed: i, methods: s, watch: a, provide: l, inject: c, created: u, beforeMount: d, mounted: p, beforeUpdate: f, updated: h, activated: m, deactivated: g, beforeDestroy: v, beforeUnmount: b, destroyed: y, unmounted: _, render: x, renderTracked: T, renderTriggered: S, errorCaptured: E, serverPrefetch: k, expose: A, inheritAttrs: C, components: B, directives: L, filters: O} = t;
	if (c && function (e, t, n = w, o = !1) {
		P(e) && (e = pr(e));
		for (const r in e) {
			const n = e[r];
			let i;
			i = N(n) ? "default" in n ? Jn(n.from || r, n.default, !0) : Jn(n.from || r) : Jn(n), on(i) && o ? Object.defineProperty(t, r, {
				enumerable: !0,
				configurable: !0,
				get: () => i.value,
				set: e => i.value = e
			}) : t[r] = i
		}
	}(c, o, null, e.appContext.config.unwrapInjectedRef), s) for (const w in s) {
		const e = s[w];
		M(e) && (o[w] = e.bind(n))
	}
	if (r) {
		const t = r.call(n, n);
		N(t) && (e.data = Wt(t))
	}
	if (rr = !0, i) for (const P in i) {
		const e = i[P], t = M(e) ? e.bind(n, n) : M(e.get) ? e.get.bind(n, n) : w,
			r = !M(e) && M(e.set) ? e.set.bind(n) : w, s = wi({get: t, set: r});
		Object.defineProperty(o, P, {enumerable: !0, configurable: !0, get: () => s.value, set: e => s.value = e})
	}
	if (a) for (const w in a) ar(a[w], o, n, w);
	if (l) {
		const e = M(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t => {
			Yn(t, e[t])
		}))
	}

	function I(e, t) {
		P(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
	}

	if (u && sr(u, e, "c"), I(Mo, d), I(Fo, p), I(jo, f), I(No, h), I(To, m), I(So, g), I(Vo, E), I(qo, T), I(zo, S), I(Ro, b), I(Do, _), I(Ho, k), P(A)) if (A.length) {
		const t = e.exposed || (e.exposed = {});
		A.forEach((e => {
			Object.defineProperty(t, e, {get: () => n[e], set: t => n[e] = t})
		}))
	} else e.exposed || (e.exposed = {});
	x && e.render === w && (e.render = x), null != C && (e.inheritAttrs = C), B && (e.components = B), L && (e.directives = L);
	const F = e.appContext.config.globalProperties.$applyOptions;
	F && F(t, e, n)
}

function sr(e, t, n) {
	vn(P(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
}

function ar(e, t, n, o) {
	const r = o.includes(".") ? no(n, o) : () => n[o];
	if (F(e)) {
		const n = t[e];
		M(n) && Zn(r, n)
	} else if (M(e)) Zn(r, e.bind(n)); else if (N(e)) if (P(e)) e.forEach((e => ar(e, t, n, o))); else {
		const o = M(e.handler) ? e.handler.bind(n) : t[e.handler];
		M(o) && Zn(r, o, e)
	}
}

function lr(e) {
	const t = e.type, {mixins: n, extends: o} = t, {mixins: r, optionsCache: i, config: {optionMergeStrategies: s}} = e.appContext,
		a = i.get(t);
	let l;
	return a ? l = a : r.length || n || o ? (l = {}, r.length && r.forEach((e => cr(l, e, s, !0))), cr(l, t, s)) : l = t, N(t) && i.set(t, l), l
}

function cr(e, t, n, o = !1) {
	const {mixins: r, extends: i} = t;
	i && cr(e, i, n, !0), r && r.forEach((t => cr(e, t, n, !0)));
	for (const s in t) if (o && "expose" === s) ; else {
		const o = ur[s] || n && n[s];
		e[s] = o ? o(e[s], t[s]) : t[s]
	}
	return e
}

const ur = {
	data: dr,
	props: hr,
	emits: hr,
	methods: hr,
	computed: hr,
	beforeCreate: fr,
	created: fr,
	beforeMount: fr,
	mounted: fr,
	beforeUpdate: fr,
	updated: fr,
	beforeDestroy: fr,
	beforeUnmount: fr,
	destroyed: fr,
	unmounted: fr,
	activated: fr,
	deactivated: fr,
	errorCaptured: fr,
	serverPrefetch: fr,
	components: hr,
	directives: hr,
	watch: function (e, t) {
		if (!e) return t;
		if (!t) return e;
		const n = k(Object.create(null), e);
		for (const o in t) n[o] = fr(e[o], t[o]);
		return n
	},
	provide: dr,
	inject: function (e, t) {
		return hr(pr(e), pr(t))
	}
};

function dr(e, t) {
	return t ? e ? function () {
		return k(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t)
	} : t : e
}

function pr(e) {
	if (P(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t
	}
	return e
}

function fr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function hr(e, t) {
	return e ? k(k(Object.create(null), e), t) : t
}

function mr(e, t, n, o = !1) {
	const r = {}, i = {};
	Z(i, Jr, 1), e.propsDefaults = Object.create(null), gr(e, t, r, i);
	for (const s in e.propsOptions[0]) s in r || (r[s] = void 0);
	n ? e.props = o ? r : Qt(r, !1, vt, Nt, Ht) : e.type.props ? e.props = r : e.props = i, e.attrs = i
}

function gr(e, t, n, o) {
	const [r, i] = e.propsOptions;
	let s, a = !1;
	if (t) for (let l in t) {
		if (V(l)) continue;
		const c = t[l];
		let u;
		r && B(r, u = Q(l)) ? i && i.includes(u) ? (s || (s = {}))[u] = c : n[u] = c : Dn(e.emitsOptions, l) || l in o && c === o[l] || (o[l] = c, a = !0)
	}
	if (i) {
		const t = Gt(n), o = s || y;
		for (let s = 0; s < i.length; s++) {
			const a = i[s];
			n[a] = vr(r, t, a, o[a], e, !B(o, a))
		}
	}
	return a
}

function vr(e, t, n, o, r, i) {
	const s = e[n];
	if (null != s) {
		const e = B(s, "default");
		if (e && void 0 === o) {
			const e = s.default;
			if (s.type !== Function && M(e)) {
				const {propsDefaults: i} = r;
				n in i ? o = i[n] : (fi(r), o = i[n] = e.call(null, t), hi())
			} else o = e
		}
		s[0] && (i && !e ? o = !1 : !s[1] || "" !== o && o !== X(n) || (o = !0))
	}
	return o
}

function br(e, t, n = !1) {
	const o = t.propsCache, r = o.get(e);
	if (r) return r;
	const i = e.props, s = {}, a = [];
	let l = !1;
	if (!M(e)) {
		const o = e => {
			l = !0;
			const [n, o] = br(e, t, !0);
			k(s, n), o && a.push(...o)
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	if (!i && !l) return N(e) && o.set(e, _), _;
	if (P(i)) for (let u = 0; u < i.length; u++) {
		const e = Q(i[u]);
		yr(e) && (s[e] = y)
	} else if (i) for (const u in i) {
		const e = Q(u);
		if (yr(e)) {
			const t = i[u], n = s[e] = P(t) || M(t) ? {type: t} : Object.assign({}, t);
			if (n) {
				const t = xr(Boolean, n.type), o = xr(String, n.type);
				n[0] = t > -1, n[1] = o < 0 || t < o, (t > -1 || B(n, "default")) && a.push(e)
			}
		}
	}
	const c = [s, a];
	return N(e) && o.set(e, c), c
}

function yr(e) {
	return "$" !== e[0]
}

function _r(e) {
	const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : null === e ? "null" : ""
}

function wr(e, t) {
	return _r(e) === _r(t)
}

function xr(e, t) {
	return P(t) ? t.findIndex((t => wr(t, e))) : M(t) && wr(t, e) ? 0 : -1
}

const Tr = e => "_" === e[0] || "$stable" === e, Sr = e => P(e) ? e.map(ri) : [ri(e)], Er = (e, t, n) => {
	if (t._n) return t;
	const o = Vn(((...e) => Sr(t(...e))), n);
	return o._c = !1, o
}, kr = (e, t, n) => {
	const o = e._ctx;
	for (const r in e) {
		if (Tr(r)) continue;
		const n = e[r];
		if (M(n)) t[r] = Er(0, n, o); else if (null != n) {
			const e = Sr(n);
			t[r] = () => e
		}
	}
}, Ar = (e, t) => {
	const n = Sr(t);
	e.slots.default = () => n
};

function Cr() {
	return {
		app: null,
		config: {
			isNativeTag: x,
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

let Br = 0;

function Pr(e, t) {
	return function (n, o = null) {
		M(n) || (n = Object.assign({}, n)), null == o || N(o) || (o = null);
		const r = Cr(), i = new Set;
		let s = !1;
		const a = r.app = {
			_uid: Br++,
			_component: n,
			_props: o,
			_container: null,
			_context: r,
			_instance: null,
			version: Ei,
			get config() {
				return r.config
			},
			set config(e) {
			},
			use: (e, ...t) => (i.has(e) || (e && M(e.install) ? (i.add(e), e.install(a, ...t)) : M(e) && (i.add(e), e(a, ...t))), a),
			mixin: e => (r.mixins.includes(e) || r.mixins.push(e), a),
			component: (e, t) => t ? (r.components[e] = t, a) : r.components[e],
			directive: (e, t) => t ? (r.directives[e] = t, a) : r.directives[e],
			mount(i, l, c) {
				if (!s) {
					const u = ei(n, o);
					return u.appContext = r, l && t ? t(u, i) : e(u, i, c), s = !0, a._container = i, i.__vue_app__ = a, a._instance = u.component, yi(u.component) || u.component.proxy
				}
			},
			unmount() {
				s && (e(null, a._container), delete a._container.__vue_app__)
			},
			provide: (e, t) => (r.provides[e] = t, a)
		};
		return a
	}
}

function Lr(e, t, n, o, r = !1) {
	if (P(e)) return void e.forEach(((e, i) => Lr(e, t && (P(t) ? t[i] : t), n, o, r)));
	if (mo(o) && !r) return;
	const i = 4 & o.shapeFlag ? yi(o.component) || o.component.proxy : o.el, s = r ? null : i, {i: a, r: l} = e,
		c = t && t.r, u = a.refs === y ? a.refs = {} : a.refs, d = a.setupState;
	if (null != c && c !== l && (F(c) ? (u[c] = null, B(d, c) && (d[c] = null)) : on(c) && (c.value = null)), M(l)) gn(l, a, 12, [s, u]); else {
		const t = F(l), o = on(l);
		if (t || o) {
			const a = () => {
				if (e.f) {
					const n = t ? B(d, l) ? d[l] : u[l] : l.value;
					r ? P(n) && A(n, i) : P(n) ? n.includes(i) || n.push(i) : t ? (u[l] = [i], B(d, l) && (d[l] = u[l])) : (l.value = [i], e.k && (u[e.k] = l.value))
				} else t ? (u[l] = s, B(d, l) && (d[l] = s)) : o && (l.value = s, e.k && (u[e.k] = s))
			};
			s ? (a.id = -1, Or(a, n)) : a()
		}
	}
}

const Or = function (e, t) {
	var n;
	t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : (P(n = e) ? Tn.push(...n) : Sn && Sn.includes(n, n.allowRecurse ? En + 1 : En) || Tn.push(n), Pn())
};

function Ir(e) {
	return function (e, t) {
		(te || (te = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})).__VUE__ = !0;
		const {insert: n, remove: o, patchProp: r, forcePatchProp: i, createElement: s, createText: a, createComment: l, setText: c, setElementText: u, parentNode: d, nextSibling: p, setScopeId: f = w, insertStaticContent: h} = e,
			m = (e, t, n, o = null, r = null, i = null, s = !1, a = null, l = !!t.dynamicChildren) => {
				if (e === t) return;
				e && !Yr(e, t) && (o = ee(e), $(e, r, i, !0), e = null), -2 === t.patchFlag && (l = !1, t.dynamicChildren = null);
				const {type: c, ref: u, shapeFlag: d} = t;
				switch (c) {
					case Nr:
						g(e, t, n, o);
						break;
					case Rr:
						v(e, t, n, o);
						break;
					case Dr:
						null == e && b(t, n, o, s);
						break;
					case jr:
						I(e, t, n, o, r, i, s, a, l);
						break;
					default:
						1 & d ? S(e, t, n, o, r, i, s, a, l) : 6 & d ? M(e, t, n, o, r, i, s, a, l) : (64 & d || 128 & d) && c.process(e, t, n, o, r, i, s, a, l, oe)
				}
				null != u && r && Lr(u, e && e.ref, i, t || e, !t)
			}, g = (e, t, o, r) => {
				if (null == e) n(t.el = a(t.children), o, r); else {
					const n = t.el = e.el;
					t.children !== e.children && c(n, t.children)
				}
			}, v = (e, t, o, r) => {
				null == e ? n(t.el = l(t.children || ""), o, r) : t.el = e.el
			}, b = (e, t, n, o) => {
				[e.el, e.anchor] = h(e.children, t, n, o, e.el, e.anchor)
			}, x = ({el: e, anchor: t}, o, r) => {
				let i;
				for (; e && e !== t;) i = p(e), n(e, o, r), e = i;
				n(t, o, r)
			}, T = ({el: e, anchor: t}) => {
				let n;
				for (; e && e !== t;) n = p(e), o(e), e = n;
				o(t)
			}, S = (e, t, n, o, r, i, s, a, l) => {
				s = s || "svg" === t.type, null == e ? E(t, n, o, r, i, s, a, l) : P(e, t, r, i, s, a, l)
			}, E = (e, t, o, i, a, l, c, d) => {
				let p, f;
				const {type: h, props: m, shapeFlag: g, transition: v, dirs: b} = e;
				if (p = e.el = s(e.type, l, m && m.is, m), 8 & g ? u(p, e.children) : 16 & g && C(e.children, p, null, i, a, l && "foreignObject" !== h, c, d), b && $o(e, null, i, "created"), A(p, e, e.scopeId, c, i), m) {
					for (const t in m) "value" === t || V(t) || r(p, t, null, m[t], l, e.children, i, a, G);
					"value" in m && r(p, "value", null, m.value), (f = m.onVnodeBeforeMount) && li(f, i, e)
				}
				Object.defineProperty(p, "__vueParentComponent", {
					value: i,
					enumerable: !1
				}), b && $o(e, null, i, "beforeMount");
				const y = (!a || a && !a.pendingBranch) && v && !v.persisted;
				y && v.beforeEnter(p), n(p, t, o), ((f = m && m.onVnodeMounted) || y || b) && Or((() => {
					f && li(f, i, e), y && v.enter(p), b && $o(e, null, i, "mounted")
				}), a)
			}, A = (e, t, n, o, r) => {
				if (n && f(e, n), o) for (let i = 0; i < o.length; i++) f(e, o[i]);
				if (r) {
					if (t === r.subTree) {
						const t = r.vnode;
						A(e, t, t.scopeId, t.slotScopeIds, r.parent)
					}
				}
			}, C = (e, t, n, o, r, i, s, a, l = 0) => {
				for (let c = l; c < e.length; c++) {
					const l = e[c] = a ? ii(e[c]) : ri(e[c]);
					m(null, l, t, n, o, r, i, s, a)
				}
			}, P = (e, t, n, o, s, a, l) => {
				const c = t.el = e.el;
				let {patchFlag: d, dynamicChildren: p, dirs: f} = t;
				d |= 16 & e.patchFlag;
				const h = e.props || y, m = t.props || y;
				let g;
				n && Mr(n, !1), (g = m.onVnodeBeforeUpdate) && li(g, n, t, e), f && $o(t, e, n, "beforeUpdate"), n && Mr(n, !0);
				const v = s && "foreignObject" !== t.type;
				if (p ? L(e.dynamicChildren, p, c, n, o, v, a) : l || H(e, t, c, null, n, o, v, a, !1), d > 0) {
					if (16 & d) O(c, t, h, m, n, o, s); else if (2 & d && h.class !== m.class && r(c, "class", null, m.class, s), 4 & d && r(c, "style", h.style, m.style, s), 8 & d) {
						const a = t.dynamicProps;
						for (let t = 0; t < a.length; t++) {
							const l = a[t], u = h[l], d = m[l];
							(d !== u || "value" === l || i && i(c, l)) && r(c, l, u, d, s, e.children, n, o, G)
						}
					}
					1 & d && e.children !== t.children && u(c, t.children)
				} else l || null != p || O(c, t, h, m, n, o, s);
				((g = m.onVnodeUpdated) || f) && Or((() => {
					g && li(g, n, t, e), f && $o(t, e, n, "updated")
				}), o)
			}, L = (e, t, n, o, r, i, s) => {
				for (let a = 0; a < t.length; a++) {
					const l = e[a], c = t[a], u = l.el && (l.type === jr || !Yr(l, c) || 70 & l.shapeFlag) ? d(l.el) : n;
					m(l, c, u, null, o, r, i, s, !0)
				}
			}, O = (e, t, n, o, s, a, l) => {
				if (n !== o) {
					if (n !== y) for (const i in n) V(i) || i in o || r(e, i, n[i], null, l, t.children, s, a, G);
					for (const c in o) {
						if (V(c)) continue;
						const u = o[c], d = n[c];
						(u !== d && "value" !== c || i && i(e, c)) && r(e, c, d, u, l, t.children, s, a, G)
					}
					"value" in o && r(e, "value", n.value, o.value)
				}
			}, I = (e, t, o, r, i, s, l, c, u) => {
				const d = t.el = e ? e.el : a(""), p = t.anchor = e ? e.anchor : a("");
				let {patchFlag: f, dynamicChildren: h, slotScopeIds: m} = t;
				m && (c = c ? c.concat(m) : m), null == e ? (n(d, o, r), n(p, o, r), C(t.children, o, p, i, s, l, c, u)) : f > 0 && 64 & f && h && e.dynamicChildren ? (L(e.dynamicChildren, h, o, i, s, l, c), (null != t.key || i && t === i.subTree) && Fr(e, t, !0)) : H(e, t, o, p, i, s, l, c, u)
			}, M = (e, t, n, o, r, i, s, a, l) => {
				t.slotScopeIds = a, null == e ? 512 & t.shapeFlag ? r.ctx.activate(t, n, o, s, l) : F(t, n, o, r, i, s, l) : j(e, t, l)
			}, F = (e, t, n, o, r, i, s) => {
				const a = e.component = function (e, t, n) {
					const o = e.type, r = (t ? t.appContext : e.appContext) || ci, i = {
						uid: ui++,
						vnode: e,
						type: o,
						parent: t,
						appContext: r,
						root: null,
						next: null,
						subTree: null,
						effect: null,
						update: null,
						scope: new je(!0),
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
						propsOptions: br(o, r),
						emitsOptions: Rn(o, r),
						emit: null,
						emitted: null,
						propsDefaults: y,
						inheritAttrs: o.inheritAttrs,
						ctx: y,
						data: y,
						props: y,
						attrs: y,
						slots: y,
						refs: y,
						setupState: y,
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
					i.ctx = {_: i}, i.root = t ? t.root : i, i.emit = jn.bind(null, i), i.$pageInstance = t && t.$pageInstance, e.ce && e.ce(i);
					return i
				}(e, o, r);
				if (bo(e) && (a.ctx.renderer = oe), function (e, t = !1) {
					gi = t;
					const {props: n, children: o} = e.vnode, r = mi(e);
					mr(e, n, r, t), ((e, t) => {
						if (32 & e.vnode.shapeFlag) {
							const n = t._;
							n ? (e.slots = Gt(t), Z(t, "_", n)) : kr(t, e.slots = {})
						} else e.slots = {}, t && Ar(e, t);
						Z(e.slots, Jr, 1)
					})(e, o);
					const i = r ? function (e, t) {
						const n = e.type;
						e.accessCache = Object.create(null), e.proxy = Kt(new Proxy(e.ctx, or));
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
											return new Proxy(e.attrs, {get: (t, n) => (et(e, 0, "$attrs"), t[n])})
										}(e))
									}, slots: e.slots, emit: e.emit, expose: t
								}
							}(e) : null;
							fi(e), Ke();
							const r = gn(o, e, 0, [e.props, n]);
							if (Ze(), hi(), R(r)) {
								if (r.then(hi, hi), t) return r.then((n => {
									vi(e, n, t)
								})).catch((t => {
									bn(t, e, 0)
								}));
								e.asyncDep = r
							} else vi(e, r, t)
						} else bi(e, t)
					}(e, t) : void 0;
					gi = !1
				}(a), a.asyncDep) {
					if (r && r.registerDep(a, N), !e.el) {
						const e = a.subTree = ei(Rr);
						v(null, e, t, n)
					}
				} else N(a, e, t, n, r, i, s)
			}, j = (e, t, n) => {
				const o = t.component = e.component;
				if (function (e, t, n) {
					const {props: o, children: r, component: i} = e, {props: s, children: a, patchFlag: l} = t,
						c = i.emitsOptions;
					if (t.dirs || t.transition) return !0;
					if (!(n && l >= 0)) return !(!r && !a || a && a.$stable) || o !== s && (o ? !s || Un(o, s, c) : !!s);
					if (1024 & l) return !0;
					if (16 & l) return o ? Un(o, s, c) : !!s;
					if (8 & l) {
						const e = t.dynamicProps;
						for (let t = 0; t < e.length; t++) {
							const n = e[t];
							if (s[n] !== o[n] && !Dn(c, n)) return !0
						}
					}
					return !1
				}(e, t, n)) {
					if (o.asyncDep && !o.asyncResolved) return void D(o, t, n);
					o.next = t, function (e) {
						const t = wn.indexOf(e);
						t > xn && wn.splice(t, 1)
					}(o.update), o.update()
				} else t.el = e.el, o.vnode = t
			}, N = (e, t, n, o, r, i, s) => {
				const a = () => {
					if (e.isMounted) {
						let t, {next: n, bu: o, u: a, parent: l, vnode: c} = e, u = n;
						Mr(e, !1), n ? (n.el = c.el, D(e, n, s)) : n = c, o && K(o), (t = n.props && n.props.onVnodeBeforeUpdate) && li(t, l, n, c), Mr(e, !0);
						const p = Wn(e), f = e.subTree;
						e.subTree = p, m(f, p, d(f.el), ee(f), e, r, i), n.el = p.el, null === u && function ({vnode: e, parent: t}, n) {
							for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
						}(e, p.el), a && Or(a, r), (t = n.props && n.props.onVnodeUpdated) && Or((() => li(t, l, n, c)), r)
					} else {
						let s;
						const {el: a, props: l} = t, {bm: c, m: u, parent: d} = e, p = mo(t);
						if (Mr(e, !1), c && K(c), !p && (s = l && l.onVnodeBeforeMount) && li(s, d, t), Mr(e, !0), a && ie) {
							const n = () => {
								e.subTree = Wn(e), ie(a, e.subTree, e, r, null)
							};
							p ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
						} else {
							const s = e.subTree = Wn(e);
							m(null, s, n, o, e, r, i), t.el = s.el
						}
						if (u && Or(u, r), !p && (s = l && l.onVnodeMounted)) {
							const e = t;
							Or((() => li(s, d, e)), r)
						}
						const {ba: f, a: h} = e;
						(256 & t.shapeFlag || d && mo(d.vnode) && 256 & d.vnode.shapeFlag) && (f && Po(f), h && Or(h, r), f && Or((() => Lo(f)), r)), e.isMounted = !0, t = n = o = null
					}
				}, l = e.effect = new Xe(a, (() => Bn(c)), e.scope), c = e.update = () => l.run();
				c.id = e.uid, Mr(e, !0), c()
			}, D = (e, t, n) => {
				t.component = e;
				const o = e.vnode.props;
				e.vnode = t, e.next = null, function (e, t, n, o) {
					const {props: r, attrs: i, vnode: {patchFlag: s}} = e, a = Gt(r), [l] = e.propsOptions;
					let c = !1;
					if (!(o || s > 0) || 16 & s) {
						let o;
						gr(e, t, r, i) && (c = !0);
						for (const i in a) t && (B(t, i) || (o = X(i)) !== i && B(t, o)) || (l ? !n || void 0 === n[i] && void 0 === n[o] || (r[i] = vr(l, a, i, void 0, e, !0)) : delete r[i]);
						if (i !== a) for (const e in i) t && B(t, e) || (delete i[e], c = !0)
					} else if (8 & s) {
						const n = e.vnode.dynamicProps;
						for (let o = 0; o < n.length; o++) {
							let s = n[o];
							if (Dn(e.emitsOptions, s)) continue;
							const u = t[s];
							if (l) if (B(i, s)) u !== i[s] && (i[s] = u, c = !0); else {
								const t = Q(s);
								r[t] = vr(l, a, t, u, e, !1)
							} else u !== i[s] && (i[s] = u, c = !0)
						}
					}
					c && nt(e, "set", "$attrs")
				}(e, t.props, o, n), ((e, t, n) => {
					const {vnode: o, slots: r} = e;
					let i = !0, s = y;
					if (32 & o.shapeFlag) {
						const e = t._;
						e ? n && 1 === e ? i = !1 : (k(r, t), n || 1 !== e || delete r._) : (i = !t.$stable, kr(t, r)), s = t
					} else t && (Ar(e, t), s = {default: 1});
					if (i) for (const a in r) Tr(a) || a in s || delete r[a]
				})(e, t.children, n), Ke(), Ln(), Ze()
			}, H = (e, t, n, o, r, i, s, a, l = !1) => {
				const c = e && e.children, d = e ? e.shapeFlag : 0, p = t.children, {patchFlag: f, shapeFlag: h} = t;
				if (f > 0) {
					if (128 & f) return void q(c, p, n, o, r, i, s, a, l);
					if (256 & f) return void z(c, p, n, o, r, i, s, a, l)
				}
				8 & h ? (16 & d && G(c, r, i), p !== c && u(n, p)) : 16 & d ? 16 & h ? q(c, p, n, o, r, i, s, a, l) : G(c, r, i, !0) : (8 & d && u(n, ""), 16 & h && C(p, n, o, r, i, s, a, l))
			}, z = (e, t, n, o, r, i, s, a, l) => {
				t = t || _;
				const c = (e = e || _).length, u = t.length, d = Math.min(c, u);
				let p;
				for (p = 0; p < d; p++) {
					const o = t[p] = l ? ii(t[p]) : ri(t[p]);
					m(e[p], o, n, null, r, i, s, a, l)
				}
				c > u ? G(e, r, i, !0, !1, d) : C(t, n, o, r, i, s, a, l, d)
			}, q = (e, t, n, o, r, i, s, a, l) => {
				let c = 0;
				const u = t.length;
				let d = e.length - 1, p = u - 1;
				for (; c <= d && c <= p;) {
					const o = e[c], u = t[c] = l ? ii(t[c]) : ri(t[c]);
					if (!Yr(o, u)) break;
					m(o, u, n, null, r, i, s, a, l), c++
				}
				for (; c <= d && c <= p;) {
					const o = e[d], c = t[p] = l ? ii(t[p]) : ri(t[p]);
					if (!Yr(o, c)) break;
					m(o, c, n, null, r, i, s, a, l), d--, p--
				}
				if (c > d) {
					if (c <= p) {
						const e = p + 1, d = e < u ? t[e].el : o;
						for (; c <= p;) m(null, t[c] = l ? ii(t[c]) : ri(t[c]), n, d, r, i, s, a, l), c++
					}
				} else if (c > p) for (; c <= d;) $(e[c], r, i, !0), c++; else {
					const f = c, h = c, g = new Map;
					for (c = h; c <= p; c++) {
						const e = t[c] = l ? ii(t[c]) : ri(t[c]);
						null != e.key && g.set(e.key, c)
					}
					let v, b = 0;
					const y = p - h + 1;
					let w = !1, x = 0;
					const T = new Array(y);
					for (c = 0; c < y; c++) T[c] = 0;
					for (c = f; c <= d; c++) {
						const o = e[c];
						if (b >= y) {
							$(o, r, i, !0);
							continue
						}
						let u;
						if (null != o.key) u = g.get(o.key); else for (v = h; v <= p; v++) if (0 === T[v - h] && Yr(o, t[v])) {
							u = v;
							break
						}
						void 0 === u ? $(o, r, i, !0) : (T[u - h] = c + 1, u >= x ? x = u : w = !0, m(o, t[u], n, null, r, i, s, a, l), b++)
					}
					const S = w ? function (e) {
						const t = e.slice(), n = [0];
						let o, r, i, s, a;
						const l = e.length;
						for (o = 0; o < l; o++) {
							const l = e[o];
							if (0 !== l) {
								if (r = n[n.length - 1], e[r] < l) {
									t[o] = r, n.push(o);
									continue
								}
								for (i = 0, s = n.length - 1; i < s;) a = i + s >> 1, e[n[a]] < l ? i = a + 1 : s = a;
								l < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o)
							}
						}
						i = n.length, s = n[i - 1];
						for (; i-- > 0;) n[i] = s, s = t[s];
						return n
					}(T) : _;
					for (v = S.length - 1, c = y - 1; c >= 0; c--) {
						const e = h + c, d = t[e], p = e + 1 < u ? t[e + 1].el : o;
						0 === T[c] ? m(null, d, n, p, r, i, s, a, l) : w && (v < 0 || c !== S[v] ? W(d, n, p, 2) : v--)
					}
				}
			}, W = (e, t, o, r, i = null) => {
				const {el: s, type: a, transition: l, children: c, shapeFlag: u} = e;
				if (6 & u) return void W(e.component.subTree, t, o, r);
				if (128 & u) return void e.suspense.move(t, o, r);
				if (64 & u) return void a.move(e, t, o, oe);
				if (a === jr) {
					n(s, t, o);
					for (let e = 0; e < c.length; e++) W(c[e], t, o, r);
					return void n(e.anchor, t, o)
				}
				if (a === Dr) return void x(e, t, o);
				if (2 !== r && 1 & u && l) if (0 === r) l.beforeEnter(s), n(s, t, o), Or((() => l.enter(s)), i); else {
					const {leave: e, delayLeave: r, afterLeave: i} = l, a = () => n(s, t, o), c = () => {
						e(s, (() => {
							a(), i && i()
						}))
					};
					r ? r(s, a, c) : c()
				} else n(s, t, o)
			}, $ = (e, t, n, o = !1, r = !1) => {
				const {type: i, props: s, ref: a, children: l, dynamicChildren: c, shapeFlag: u, patchFlag: d, dirs: p} = e;
				if (null != a && Lr(a, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
				const f = 1 & u && p, h = !mo(e);
				let m;
				if (h && (m = s && s.onVnodeBeforeUnmount) && li(m, t, e), 6 & u) J(e.component, n, o); else {
					if (128 & u) return void e.suspense.unmount(n, o);
					f && $o(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, r, oe, o) : c && (i !== jr || d > 0 && 64 & d) ? G(c, t, n, !1, !0) : (i === jr && 384 & d || !r && 16 & u) && G(l, t, n), o && U(e)
				}
				(h && (m = s && s.onVnodeUnmounted) || f) && Or((() => {
					m && li(m, t, e), f && $o(e, null, t, "unmounted")
				}), n)
			}, U = e => {
				const {type: t, el: n, anchor: r, transition: i} = e;
				if (t === jr) return void Y(n, r);
				if (t === Dr) return void T(e);
				const s = () => {
					o(n), i && !i.persisted && i.afterLeave && i.afterLeave()
				};
				if (1 & e.shapeFlag && i && !i.persisted) {
					const {leave: t, delayLeave: o} = i, r = () => t(n, s);
					o ? o(e.el, s, r) : r()
				} else s()
			}, Y = (e, t) => {
				let n;
				for (; e !== t;) n = p(e), o(e), e = n;
				o(t)
			}, J = (e, t, n) => {
				const {bum: o, scope: r, update: i, subTree: s, um: a} = e;
				o && K(o), r.stop(), i && (i.active = !1, $(s, e, t, n)), a && Or(a, t), Or((() => {
					e.isUnmounted = !0
				}), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
			}, G = (e, t, n, o = !1, r = !1, i = 0) => {
				for (let s = i; s < e.length; s++) $(e[s], t, n, o, r)
			},
			ee = e => 6 & e.shapeFlag ? ee(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : p(e.anchor || e.el),
			ne = (e, t, n) => {
				null == e ? t._vnode && $(t._vnode, null, null, !0) : m(t._vnode || null, e, t, null, null, null, n), Ln(), On(), t._vnode = e
			}, oe = {p: m, um: $, m: W, r: U, mt: F, mc: C, pc: H, pbc: L, n: ee, o: e};
		let re, ie;
		t && ([re, ie] = t(oe));
		return {render: ne, hydrate: re, createApp: Pr(ne, re)}
	}(e)
}

function Mr({effect: e, update: t}, n) {
	e.allowRecurse = t.allowRecurse = n
}

function Fr(e, t, n = !1) {
	const o = e.children, r = t.children;
	if (P(o) && P(r)) for (let i = 0; i < o.length; i++) {
		const e = o[i];
		let t = r[i];
		1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = r[i] = ii(r[i]), t.el = e.el), n || Fr(e, t)), t.type === Nr && (t.el = e.el)
	}
}

const jr = Symbol(void 0), Nr = Symbol(void 0), Rr = Symbol(void 0), Dr = Symbol(void 0), Hr = [];
let zr = null;

function qr(e = !1) {
	Hr.push(zr = e ? null : [])
}

let Vr = 1;

function Wr(e) {
	Vr += e
}

function $r(e) {
	return e.dynamicChildren = Vr > 0 ? zr || _ : null, Hr.pop(), zr = Hr[Hr.length - 1] || null, Vr > 0 && zr && zr.push(e), e
}

function Qr(e, t, n, o, r, i) {
	return $r(Zr(e, t, n, o, r, i, !0))
}

function Ur(e, t, n, o, r) {
	return $r(ei(e, t, n, o, r, !0))
}

function Xr(e) {
	return !!e && !0 === e.__v_isVNode
}

function Yr(e, t) {
	return e.type === t.type && e.key === t.key
}

const Jr = "__vInternal", Gr = ({key: e}) => null != e ? e : null,
	Kr = ({ref: e, ref_key: t, ref_for: n}) => null != e ? F(e) || on(e) || M(e) ? {
		i: Hn,
		r: e,
		k: t,
		f: !!n
	} : e : null;

function Zr(e, t = null, n = null, o = 0, r = null, i = (e === jr ? 0 : 1), s = !1, a = !1) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Gr(t),
		ref: t && Kr(t),
		scopeId: zn,
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
		ctx: Hn
	};
	return a ? (si(l, n), 128 & i && e.normalize(l)) : n && (l.shapeFlag |= F(n) ? 8 : 16), Vr > 0 && !s && zr && (l.patchFlag > 0 || 6 & i) && 32 !== l.patchFlag && zr.push(l), l
}

const ei = function (e, t = null, n = null, o = 0, r = null, i = !1) {
	e && e !== Uo || (e = Rr);
	if (Xr(e)) {
		const o = ti(e, t, !0);
		return n && si(o, n), Vr > 0 && !i && zr && (6 & o.shapeFlag ? zr[zr.indexOf(e)] = o : zr.push(o)), o.patchFlag |= -2, o
	}
	s = e, M(s) && "__vccOpts" in s && (e = e.__vccOpts);
	var s;
	if (t) {
		t = function (e) {
			return e ? Jt(e) || Jr in e ? k({}, e) : e : null
		}(t);
		let {class: e, style: n} = t;
		e && !F(e) && (t.class = p(e)), N(n) && (Jt(n) && !P(n) && (n = k({}, n)), t.style = a(n))
	}
	const l = F(e) ? 1 : Xn(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : N(e) ? 4 : M(e) ? 2 : 0;
	return Zr(e, t, n, o, r, l, i, !0)
};

function ti(e, t, n = !1) {
	const {props: o, ref: r, patchFlag: i, children: s} = e, a = t ? ai(o || {}, t) : o;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: a,
		key: a && Gr(a),
		ref: t && t.ref ? n && r ? P(r) ? r.concat(Kr(t)) : [r, Kr(t)] : Kr(t) : r,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== jr ? -1 === i ? 16 : 16 | i : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && ti(e.ssContent),
		ssFallback: e.ssFallback && ti(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	}
}

function ni(e = " ", t = 0) {
	return ei(Nr, null, e, t)
}

function oi(e = "", t = !1) {
	return t ? (qr(), Ur(Rr, null, e)) : ei(Rr, null, e)
}

function ri(e) {
	return null == e || "boolean" == typeof e ? ei(Rr) : P(e) ? ei(jr, null, e.slice()) : "object" == typeof e ? ii(e) : ei(Nr, null, String(e))
}

function ii(e) {
	return null === e.el && -1 !== e.patchFlag || e.memo ? e : ti(e)
}

function si(e, t) {
	let n = 0;
	const {shapeFlag: o} = e;
	if (null == t) t = null; else if (P(t)) n = 16; else if ("object" == typeof t) {
		if (65 & o) {
			const n = t.default;
			return void (n && (n._c && (n._d = !1), si(e, n()), n._c && (n._d = !0)))
		}
		{
			n = 32;
			const o = t._;
			o || Jr in t ? 3 === o && Hn && (1 === Hn.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Hn
		}
	} else M(t) ? (t = {default: t, _ctx: Hn}, n = 32) : (t = String(t), 64 & o ? (n = 16, t = [ni(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n
}

function ai(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const o = e[n];
		for (const e in o) if ("class" === e) t.class !== o.class && (t.class = p([t.class, o.class])); else if ("style" === e) t.style = a([t.style, o.style]); else if (S(e)) {
			const n = t[e], r = o[e];
			!r || n === r || P(n) && n.includes(r) || (t[e] = n ? [].concat(n, r) : r)
		} else "" !== e && (t[e] = o[e])
	}
	return t
}

function li(e, t, n, o = null) {
	vn(e, t, 7, [n, o])
}

const ci = Cr();
let ui = 0;
let di = null;
const pi = () => di || Hn, fi = e => {
	di = e, e.scope.on()
}, hi = () => {
	di && di.scope.off(), di = null
};

function mi(e) {
	return 4 & e.vnode.shapeFlag
}

let gi = !1;

function vi(e, t, n) {
	M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : N(t) && (e.setupState = dn(t)), bi(e, n)
}

function bi(e, t, n) {
	const o = e.type;
	e.render || (e.render = o.render || w), fi(e), Ke(), ir(e), Ze(), hi()
}

function yi(e) {
	if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(dn(Kt(e.exposed)), {
		get: (t, n) => n in t ? t[n] : n in tr ? tr[n](e) : void 0,
		has: (e, t) => t in e || t in tr
	}))
}

function _i(e, t = !0) {
	return M(e) ? e.displayName || e.name : e.name || t && e.__name
}

const wi = (e, t) => function (e, t, n = !1) {
	let o, r;
	const i = M(e);
	return i ? (o = e, r = w) : (o = e.get, r = e.set), new mn(o, r, i || !r, n)
}(e, 0, gi);

function xi(e, t, n) {
	const o = arguments.length;
	return 2 === o ? N(t) && !P(t) ? Xr(t) ? ei(e, null, [t]) : ei(e, t) : ei(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === o && Xr(n) && (n = [n]), ei(e, t, n))
}

const Ti = Symbol(""), Si = () => Jn(Ti), Ei = "3.2.47", ki = "undefined" != typeof document ? document : null,
	Ai = ki && ki.createElement("template"), Ci = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null)
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e)
		},
		createElement: (e, t, n, o) => {
			const r = t ? ki.createElementNS("http://www.w3.org/2000/svg", e) : ki.createElement(e, n ? {is: n} : void 0);
			return "select" === e && o && null != o.multiple && r.setAttribute("multiple", o.multiple), r
		},
		createText: e => ki.createTextNode(e),
		createComment: e => ki.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t
		},
		setElementText: (e, t) => {
			e.textContent = t
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => ki.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "")
		},
		insertStaticContent(e, t, n, o, r, i) {
			const s = n ? n.previousSibling : t.lastChild;
			if (r && (r === i || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), r !== i && (r = r.nextSibling);) ; else {
				Ai.innerHTML = o ? `<svg>${e}</svg>` : e;
				const r = Ai.content;
				if (o) {
					const e = r.firstChild;
					for (; e.firstChild;) r.appendChild(e.firstChild);
					r.removeChild(e)
				}
				t.insertBefore(r, n)
			}
			return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
		}
	};
const Bi = /\s*!important$/;

function Pi(e, t, n) {
	if (P(n)) n.forEach((n => Pi(e, t, n))); else if (null == n && (n = ""), n = Hi(n), t.startsWith("--")) e.setProperty(t, n); else {
		const o = function (e, t) {
			const n = Oi[t];
			if (n) return n;
			let o = Q(t);
			if ("filter" !== o && o in e) return Oi[t] = o;
			o = Y(o);
			for (let r = 0; r < Li.length; r++) {
				const n = Li[r] + o;
				if (n in e) return Oi[t] = n
			}
			return t
		}(e, t);
		Bi.test(n) ? e.setProperty(X(o), n.replace(Bi, ""), "important") : e[o] = n
	}
}

const Li = ["Webkit", "Moz", "ms"], Oi = {};
const {unit: Ii, unitRatio: Mi, unitPrecision: Fi} = {unit: "rem", unitRatio: 10 / 320, unitPrecision: 5},
	ji = (Ni = Ii, Ri = Mi, Di = Fi, e => e.replace(ve, ((e, t) => {
		if (!t) return e;
		if (1 === Ri) return `${t}${Ni}`;
		const n = function (e, t) {
			const n = Math.pow(10, t + 1), o = Math.floor(e * n);
			return 10 * Math.round(o / 10) / n
		}(parseFloat(t) * Ri, Di);
		return 0 === n ? "0" : `${n}${Ni}`
	})));
var Ni, Ri, Di;
const Hi = e => F(e) ? ji(e) : e, zi = "http://www.w3.org/1999/xlink";

function qi(e, t, n, o) {
	e.addEventListener(t, n, o)
}

function Vi(e, t, n, o, r = null) {
	const i = e._vei || (e._vei = {}), s = i[t];
	if (o && s) s.value = o; else {
		const [n, a] = function (e) {
			let t;
			if (Wi.test(e)) {
				let n;
				for (t = {}; n = e.match(Wi);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
			}
			return [":" === e[2] ? e.slice(3) : X(e.slice(2)), t]
		}(t);
		if (o) {
			const s = i[t] = function (e, t) {
				const n = e => {
					if (e._vts) {
						if (e._vts <= n.attached) return
					} else e._vts = Date.now();
					const o = t && t.proxy, r = o && o.$nne, {value: i} = n;
					if (r && P(i)) {
						const n = Ui(e, i);
						for (let o = 0; o < n.length; o++) {
							const i = n[o];
							vn(i, t, 5, i.__wwe ? [e] : r(e))
						}
					} else vn(Ui(e, i), t, 5, r && !i.__wwe ? r(e, i, t) : [e])
				};
				return n.value = e, n.attached = (() => $i || (Qi.then((() => $i = 0)), $i = Date.now()))(), n
			}(o, r);
			qi(e, n, s, a)
		} else s && (!function (e, t, n, o) {
			e.removeEventListener(t, n, o)
		}(e, n, s, a), i[t] = void 0)
	}
}

const Wi = /(?:Once|Passive|Capture)$/;
let $i = 0;
const Qi = Promise.resolve();

function Ui(e, t) {
	if (P(t)) {
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

const Xi = /^on[a-z]/;
const Yi = "transition", Ji = (e, {slots: t}) => xi(so, function (e) {
	const t = {};
	for (const k in e) k in Gi || (t[k] = e[k]);
	if (!1 === e.css) return t;
	const {name: n = "v", type: o, duration: r, enterFromClass: i = `${n}-enter-from`, enterActiveClass: s = `${n}-enter-active`, enterToClass: a = `${n}-enter-to`, appearFromClass: l = i, appearActiveClass: c = s, appearToClass: u = a, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: f = `${n}-leave-to`} = e,
		h = function (e) {
			if (null == e) return null;
			if (N(e)) return [es(e.enter), es(e.leave)];
			{
				const t = es(e);
				return [t, t]
			}
		}(r), m = h && h[0],
		g = h && h[1], {onBeforeEnter: v, onEnter: b, onEnterCancelled: y, onLeave: _, onLeaveCancelled: w, onBeforeAppear: x = v, onAppear: T = b, onAppearCancelled: S = y} = t,
		E = (e, t, n) => {
			ns(e, t ? u : a), ns(e, t ? c : s), n && n()
		}, A = (e, t) => {
			e._isLeaving = !1, ns(e, d), ns(e, f), ns(e, p), t && t()
		}, C = e => (t, n) => {
			const r = e ? T : b, s = () => E(t, e, n);
			Ki(r, [t, s]), os((() => {
				ns(t, e ? l : i), ts(t, e ? u : a), Zi(r) || is(t, o, m, s)
			}))
		};
	return k(t, {
		onBeforeEnter(e) {
			Ki(v, [e]), ts(e, i), ts(e, s)
		}, onBeforeAppear(e) {
			Ki(x, [e]), ts(e, l), ts(e, c)
		}, onEnter: C(!1), onAppear: C(!0), onLeave(e, t) {
			e._isLeaving = !0;
			const n = () => A(e, t);
			ts(e, d), document.body.offsetHeight, ts(e, p), os((() => {
				e._isLeaving && (ns(e, d), ts(e, f), Zi(_) || is(e, o, g, n))
			})), Ki(_, [e, n])
		}, onEnterCancelled(e) {
			E(e, !1), Ki(y, [e])
		}, onAppearCancelled(e) {
			E(e, !0), Ki(S, [e])
		}, onLeaveCancelled(e) {
			A(e), Ki(w, [e])
		}
	})
}(e), t);
Ji.displayName = "Transition";
const Gi = {
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
Ji.props = k({}, io, Gi);
const Ki = (e, t = []) => {
	P(e) ? e.forEach((e => e(...t))) : e && e(...t)
}, Zi = e => !!e && (P(e) ? e.some((e => e.length > 1)) : e.length > 1);

function es(e) {
	const t = (e => {
		const t = F(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t
	})(e);
	return t
}

function ts(e, t) {
	t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set)).add(t)
}

function ns(e, t) {
	t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
	const {_vtc: n} = e;
	n && (n.delete(t), n.size || (e._vtc = void 0))
}

function os(e) {
	requestAnimationFrame((() => {
		requestAnimationFrame(e)
	}))
}

let rs = 0;

function is(e, t, n, o) {
	const r = e._endId = ++rs, i = () => {
		r === e._endId && o()
	};
	if (n) return setTimeout(i, n);
	const {type: s, timeout: a, propCount: l} = function (e, t) {
		const n = window.getComputedStyle(e), o = e => (n[e] || "").split(", "), r = o("transitionDelay"),
			i = o("transitionDuration"), s = ss(r, i), a = o("animationDelay"), l = o("animationDuration"),
			c = ss(a, l);
		let u = null, d = 0, p = 0;
		t === Yi ? s > 0 && (u = Yi, d = s, p = i.length) : "animation" === t ? c > 0 && (u = "animation", d = c, p = l.length) : (d = Math.max(s, c), u = d > 0 ? s > c ? Yi : "animation" : null, p = u ? u === Yi ? i.length : l.length : 0);
		const f = u === Yi && /\b(transform|all)(,|$)/.test(o("transitionProperty").toString());
		return {type: u, timeout: d, propCount: p, hasTransform: f}
	}(e, t);
	if (!s) return o();
	const c = s + "end";
	let u = 0;
	const d = () => {
		e.removeEventListener(c, p), i()
	}, p = t => {
		t.target === e && ++u >= l && d()
	};
	setTimeout((() => {
		u < l && d()
	}), a + 1), e.addEventListener(c, p)
}

function ss(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map(((t, n) => as(t) + as(e[n]))))
}

function as(e) {
	return 1e3 * Number(e.slice(0, -1).replace(",", "."))
}

const ls = e => {
	const t = e.props["onUpdate:modelValue"] || !1;
	return P(t) ? e => K(t, e) : t
};

function cs(e) {
	e.target.composing = !0
}

function us(e) {
	const t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}

const ds = {
	created(e, {modifiers: {lazy: t, trim: n, number: o}}, r) {
		e._assign = ls(r);
		const i = o || r.props && "number" === r.props.type;
		qi(e, t ? "change" : "input", (t => {
			if (t.target.composing) return;
			let o = e.value;
			n && (o = o.trim()), i && (o = ee(o)), e._assign(o)
		})), n && qi(e, "change", (() => {
			e.value = e.value.trim()
		})), t || (qi(e, "compositionstart", cs), qi(e, "compositionend", us), qi(e, "change", us))
	}, mounted(e, {value: t}) {
		e.value = null == t ? "" : t
	}, beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: o, number: r}}, i) {
		if (e._assign = ls(i), e.composing) return;
		if (document.activeElement === e && "range" !== e.type) {
			if (n) return;
			if (o && e.value.trim() === t) return;
			if ((r || "number" === e.type) && ee(e.value) === t) return
		}
		const s = null == t ? "" : t;
		e.value !== s && (e.value = s)
	}
}, ps = {
	deep: !0, created(e, t, n) {
		e._assign = ls(n), qi(e, "change", (() => {
			const t = e._modelValue, n = vs(e), o = e.checked, r = e._assign;
			if (P(t)) {
				const e = g(t, n), i = -1 !== e;
				if (o && !i) r(t.concat(n)); else if (!o && i) {
					const n = [...t];
					n.splice(e, 1), r(n)
				}
			} else if (O(t)) {
				const e = new Set(t);
				o ? e.add(n) : e.delete(n), r(e)
			} else r(bs(e, o))
		}))
	}, mounted: fs, beforeUpdate(e, t, n) {
		e._assign = ls(n), fs(e, t, n)
	}
};

function fs(e, {value: t, oldValue: n}, o) {
	e._modelValue = t, P(t) ? e.checked = g(t, o.props.value) > -1 : O(t) ? e.checked = t.has(o.props.value) : t !== n && (e.checked = m(t, bs(e, !0)))
}

const hs = {
	created(e, {value: t}, n) {
		e.checked = m(t, n.props.value), e._assign = ls(n), qi(e, "change", (() => {
			e._assign(vs(e))
		}))
	}, beforeUpdate(e, {value: t, oldValue: n}, o) {
		e._assign = ls(o), t !== n && (e.checked = m(t, o.props.value))
	}
}, ms = {
	deep: !0, created(e, {value: t, modifiers: {number: n}}, o) {
		const r = O(t);
		qi(e, "change", (() => {
			const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => n ? ee(vs(e)) : vs(e)));
			e._assign(e.multiple ? r ? new Set(t) : t : t[0])
		})), e._assign = ls(o)
	}, mounted(e, {value: t}) {
		gs(e, t)
	}, beforeUpdate(e, t, n) {
		e._assign = ls(n)
	}, updated(e, {value: t}) {
		gs(e, t)
	}
};

function gs(e, t) {
	const n = e.multiple;
	if (!n || P(t) || O(t)) {
		for (let o = 0, r = e.options.length; o < r; o++) {
			const r = e.options[o], i = vs(r);
			if (n) P(t) ? r.selected = g(t, i) > -1 : r.selected = t.has(i); else if (m(vs(r), t)) return void (e.selectedIndex !== o && (e.selectedIndex = o))
		}
		n || -1 === e.selectedIndex || (e.selectedIndex = -1)
	}
}

function vs(e) {
	return "_value" in e ? e._value : e.value
}

function bs(e, t) {
	const n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t
}

const ys = {
	created(e, t, n) {
		_s(e, t, n, null, "created")
	}, mounted(e, t, n) {
		_s(e, t, n, null, "mounted")
	}, beforeUpdate(e, t, n, o) {
		_s(e, t, n, o, "beforeUpdate")
	}, updated(e, t, n, o) {
		_s(e, t, n, o, "updated")
	}
};

function _s(e, t, n, o, r) {
	const i = function (e, t) {
		switch (e) {
			case"SELECT":
				return ms;
			case"TEXTAREA":
				return ds;
			default:
				switch (t) {
					case"checkbox":
						return ps;
					case"radio":
						return hs;
					default:
						return ds
				}
		}
	}(e.tagName, n.props && n.props.type)[r];
	i && i(e, t, n, o)
}

const ws = ["ctrl", "shift", "alt", "meta"], xs = {
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
	exact: (e, t) => ws.some((n => e[`${n}Key`] && !t.includes(n)))
}, Ts = (e, t) => (n, ...o) => {
	for (let e = 0; e < t.length; e++) {
		const o = xs[t[e]];
		if (o && o(n, t)) return
	}
	return e(n, ...o)
}, Ss = {
	beforeMount(e, {value: t}, {transition: n}) {
		e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : Es(e, t)
	}, mounted(e, {value: t}, {transition: n}) {
		n && t && n.enter(e)
	}, updated(e, {value: t, oldValue: n}, {transition: o}) {
		!t != !n && (o ? t ? (o.beforeEnter(e), Es(e, !0), o.enter(e)) : o.leave(e, (() => {
			Es(e, !1)
		})) : Es(e, t))
	}, beforeUnmount(e, {value: t}) {
		Es(e, t)
	}
};

function Es(e, t) {
	e.style.display = t ? e._vod : "none"
}

const ks = k({
	patchProp: (e, t, n, o, r = !1, i, s, a, l) => {
		if (0 === t.indexOf("change:")) return function (e, t, n, o = null) {
			if (!n || !o) return;
			const r = t.replace("change:", ""), {attrs: i} = o, s = i[r], a = (e.__wxsProps || (e.__wxsProps = {}))[r];
			if (a === s) return;
			e.__wxsProps[r] = s;
			const l = o.proxy;
			Cn((() => {
				n(s, a, l.$gcd(l, !0), l.$gcd(l, !1))
			}))
		}(e, t, o, s);
		"class" === t ? function (e, t, n) {
			const {__wxsAddClass: o, __wxsRemoveClass: r} = e;
			r && r.length && (t = (t || "").split(/\s+/).filter((e => -1 === r.indexOf(e))).join(" "), r.length = 0), o && o.length && (t = (t || "") + " " + o.join(" "));
			const i = e._vtc;
			i && (t = (t ? [t, ...i] : [...i]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
		}(e, o, r) : "style" === t ? function (e, t, n) {
			const o = e.style, r = F(n);
			if (n && !r) {
				if (t && !F(t)) for (const e in t) null == n[e] && Pi(o, e, "");
				for (const e in n) Pi(o, e, n[e])
			} else {
				const i = o.display;
				r ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = i)
			}
			const {__wxsStyle: i} = e;
			if (i) for (const s in i) Pi(o, s, i[s])
		}(e, n, o) : S(t) ? E(t) || Vi(e, t, 0, o, s) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function (e, t, n, o) {
			if (o) return "innerHTML" === t || "textContent" === t || !!(t in e && Xi.test(t) && M(n));
			if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
			if ("form" === t) return !1;
			if ("list" === t && "INPUT" === e.tagName) return !1;
			if ("type" === t && "TEXTAREA" === e.tagName) return !1;
			if (Xi.test(t) && F(n)) return !1;
			return t in e
		}(e, t, o, r)) ? function (e, t, n, o, r, i, s) {
			if ("innerHTML" === t || "textContent" === t) return o && s(o, r, i), void (e[t] = null == n ? "" : n);
			if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
				e._value = n;
				const o = null == n ? "" : n;
				return e.value === o && "OPTION" !== e.tagName || (e.value = o), void (null == n && e.removeAttribute(t))
			}
			let a = !1;
			if ("" === n || null == n) {
				const o = typeof e[t];
				"boolean" === o ? n = h(n) : null == n && "string" === o ? (n = "", a = !0) : "number" === o && (n = 0, a = !0)
			}
			try {
				e[t] = n
			} catch (l) {
			}
			a && e.removeAttribute(t)
		}(e, t, o, i, s, a, l) : ("true-value" === t ? e._trueValue = o : "false-value" === t && (e._falseValue = o), function (e, t, n, o, r) {
			if (o && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(zi, t.slice(6, t.length)) : e.setAttributeNS(zi, t, n); else {
				const o = f(t);
				null == n || o && !h(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
			}
		}(e, t, o, r))
	},
	forcePatchProp: (e, t) => 0 === t.indexOf("change:") || ("class" === t && e.__wxsClassChanged ? (e.__wxsClassChanged = !1, !0) : !("style" !== t || !e.__wxsStyleChanged) && (e.__wxsStyleChanged = !1, !0))
}, Ci);
let As;
const Cs = (...e) => {
	const t = (As || (As = Ir(ks))).createApp(...e), {mount: n} = t;
	return t.mount = e => {
		const o = function (e) {
			if (F(e)) {
				return document.querySelector(e)
			}
			return e
		}(e);
		if (!o) return;
		const r = t._component;
		M(r) || r.render || r.template || (r.template = o.innerHTML), o.innerHTML = "";
		const i = n(o, !1, o instanceof SVGElement);
		return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i
	}, t
};
const Bs = ["{", "}"];
const Ps = /^(?:\d)+/, Ls = /^(?:\w)+/;
const Os = Object.prototype.hasOwnProperty, Is = (e, t) => Os.call(e, t), Ms = new class {
	constructor() {
		this._caches = Object.create(null)
	}

	interpolate(e, t, n = Bs) {
		if (!t) return [e];
		let o = this._caches[e];
		return o || (o = function (e, [t, n]) {
			const o = [];
			let r = 0, i = "";
			for (; r < e.length;) {
				let s = e[r++];
				if (s === t) {
					i && o.push({type: "text", value: i}), i = "";
					let t = "";
					for (s = e[r++]; void 0 !== s && s !== n;) t += s, s = e[r++];
					const a = s === n, l = Ps.test(t) ? "list" : a && Ls.test(t) ? "named" : "unknown";
					o.push({value: t, type: l})
				} else i += s
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

function Fs(e, t) {
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

class js {
	constructor({locale: e, fallbackLocale: t, messages: n, watcher: o, formater: r}) {
		this.locale = "en", this.fallbackLocale = "en", this.message = {}, this.messages = {}, this.watchers = [], t && (this.fallbackLocale = t), this.formater = r || Ms, this.messages = n || {}, this.setLocale(e || "en"), o && this.watchLocale(o)
	}

	setLocale(e) {
		const t = this.locale;
		this.locale = Fs(e, this.messages) || this.fallbackLocale, this.messages[this.locale] || (this.messages[this.locale] = {}), this.message = this.messages[this.locale], t !== this.locale && this.watchers.forEach((e => {
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
			Is(o, e) || (o[e] = t[e])
		})) : this.messages[e] = t
	}

	f(e, t, n) {
		return this.formater.interpolate(e, t, n).join("")
	}

	t(e, t, n) {
		let o = this.message;
		return "string" == typeof t ? (t = Fs(t, this.messages)) && (o = this.messages[t]) : n = t, Is(o, e) ? this.formater.interpolate(o[e], n).join("") : (console.warn(`Cannot translate the value of keypath ${e}. Use the value of keypath as default.`), e)
	}
}

function Ns(e, t = {}, n, o) {
	"string" != typeof e && ([e, t] = [t, e]), "string" != typeof e && (e = "undefined" != typeof uni && Ud ? Ud() : "undefined" != typeof global && global.getLocale ? global.getLocale() : "en"), "string" != typeof n && (n = "undefined" != typeof __uniConfig && __uniConfig.fallbackLocale || "en");
	const r = new js({locale: e, fallbackLocale: n, messages: t, watcher: o});
	let i = (e, t) => {
		{
			let e = !1;
			i = function (t, n) {
				const o = um().$vm;
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

function Rs(e, t) {
	return e.indexOf(t[0]) > -1
}

/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const Ds = "undefined" != typeof window;
const Hs = Object.assign;

function zs(e, t) {
	const n = {};
	for (const o in t) {
		const r = t[o];
		n[o] = Vs(r) ? r.map(e) : e(r)
	}
	return n
}

const qs = () => {
}, Vs = Array.isArray, Ws = /\/$/;

function $s(e, t, n = "/") {
	let o, r = {}, i = "", s = "";
	const a = t.indexOf("#");
	let l = t.indexOf("?");
	return a < l && a >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), i = t.slice(l + 1, a > -1 ? a : t.length), r = e(i)), a > -1 && (o = o || t.slice(0, a), s = t.slice(a, t.length)), o = function (e, t) {
		if (e.startsWith("/")) return e;
		if (!e) return t;
		const n = t.split("/"), o = e.split("/");
		let r, i, s = n.length - 1;
		for (r = 0; r < o.length; r++) if (i = o[r], "." !== i) {
			if (".." !== i) break;
			s > 1 && s--
		}
		return n.slice(0, s).join("/") + "/" + o.slice(r - (r === o.length ? 1 : 0)).join("/")
	}(null != o ? o : t, n), {fullPath: o + (i && "?") + i + s, path: o, query: r, hash: s}
}

function Qs(e, t) {
	return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}

function Us(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t)
}

function Xs(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const n in e) if (!Ys(e[n], t[n])) return !1;
	return !0
}

function Ys(e, t) {
	return Vs(e) ? Js(e, t) : Vs(t) ? Js(t, e) : e === t
}

function Js(e, t) {
	return Vs(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}

var Gs, Ks, Zs, ea;

function ta(e) {
	if (!e) if (Ds) {
		const t = document.querySelector("base");
		e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
	} else e = "/";
	return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(Ws, "")
}

(Ks = Gs || (Gs = {})).pop = "pop", Ks.push = "push", (ea = Zs || (Zs = {})).back = "back", ea.forward = "forward", ea.unknown = "";
const na = /^[^#]+#/;

function oa(e, t) {
	return e.replace(na, "#") + t
}

const ra = () => ({left: window.pageXOffset, top: window.pageYOffset});

function ia(e) {
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

function sa(e, t) {
	return (history.state ? history.state.position - t : -1) + e
}

const aa = new Map;

function la(e, t) {
	const {pathname: n, search: o, hash: r} = t, i = e.indexOf("#");
	if (i > -1) {
		let t = r.includes(e.slice(i)) ? e.slice(i).length : 1, n = r.slice(t);
		return "/" !== n[0] && (n = "/" + n), Qs(n, "")
	}
	return Qs(n, e) + o + r
}

function ca(e, t, n, o = !1, r = !1) {
	return {back: e, current: t, forward: n, replaced: o, position: window.history.length, scroll: r ? ra() : null}
}

function ua(e) {
	const {history: t, location: n} = window, o = {value: la(e, n)}, r = {value: t.state};

	function i(o, i, s) {
		const a = e.indexOf("#"),
			l = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + o : location.protocol + "//" + location.host + e + o;
		try {
			t[s ? "replaceState" : "pushState"](i, "", l), r.value = i
		} catch (c) {
			console.error(c), n[s ? "replace" : "assign"](l)
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
			const s = Hs({}, r.value, t.state, {forward: e, scroll: ra()});
			i(s.current, s, !0), i(e, Hs({}, ca(o.value, e, null), {position: s.position + 1}, n), !1), o.value = e
		}, replace: function (e, n) {
			i(e, Hs({}, t.state, ca(r.value.back, e, r.value.forward, !0), n, {position: r.value.position}), !0), o.value = e
		}
	}
}

function da(e) {
	const t = ua(e = ta(e)), n = function (e, t, n, o) {
		let r = [], i = [], s = null;
		const a = ({state: i}) => {
			const a = la(e, location), l = n.value, c = t.value;
			let u = 0;
			if (i) {
				if (n.value = a, t.value = i, s && s === l) return void (s = null);
				u = c ? i.position - c.position : 0
			} else o(a);
			r.forEach((e => {
				e(n.value, l, {delta: u, type: Gs.pop, direction: u ? u > 0 ? Zs.forward : Zs.back : Zs.unknown})
			}))
		};

		function l() {
			const {history: e} = window;
			e.state && e.replaceState(Hs({}, e.state, {scroll: ra()}), "")
		}

		return window.addEventListener("popstate", a), window.addEventListener("beforeunload", l), {
			pauseListeners: function () {
				s = n.value
			}, listen: function (e) {
				r.push(e);
				const t = () => {
					const t = r.indexOf(e);
					t > -1 && r.splice(t, 1)
				};
				return i.push(t), t
			}, destroy: function () {
				for (const e of i) e();
				i = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", l)
			}
		}
	}(e, t.state, t.location, t.replace);
	const o = Hs({
		location: "", base: e, go: function (e, t = !0) {
			t || n.pauseListeners(), history.go(e)
		}, createHref: oa.bind(null, e)
	}, t, n);
	return Object.defineProperty(o, "location", {
		enumerable: !0,
		get: () => t.location.value
	}), Object.defineProperty(o, "state", {enumerable: !0, get: () => t.state.value}), o
}

function pa(e) {
	return "string" == typeof e || "symbol" == typeof e
}

const fa = {
	path: "/",
	name: void 0,
	params: {},
	query: {},
	hash: "",
	fullPath: "/",
	matched: [],
	meta: {},
	redirectedFrom: void 0
}, ha = Symbol("");
var ma, ga;

function va(e, t) {
	return Hs(new Error, {type: e, [ha]: !0}, t)
}

function ba(e, t) {
	return e instanceof Error && ha in e && (null == t || !!(e.type & t))
}

(ga = ma || (ma = {}))[ga.aborted = 4] = "aborted", ga[ga.cancelled = 8] = "cancelled", ga[ga.duplicated = 16] = "duplicated";
const ya = {sensitive: !1, strict: !1, start: !0, end: !0}, _a = /[.+*?^${}()[\]/\\]/g;

function wa(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length;) {
		const o = t[n] - e[n];
		if (o) return o;
		n++
	}
	return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}

function xa(e, t) {
	let n = 0;
	const o = e.score, r = t.score;
	for (; n < o.length && n < r.length;) {
		const e = wa(o[n], r[n]);
		if (e) return e;
		n++
	}
	if (1 === Math.abs(r.length - o.length)) {
		if (Ta(o)) return 1;
		if (Ta(r)) return -1
	}
	return r.length - o.length
}

function Ta(e) {
	const t = e[e.length - 1];
	return e.length > 0 && t[t.length - 1] < 0
}

const Sa = {type: 0, value: ""}, Ea = /[a-zA-Z0-9_]/;

function ka(e, t, n) {
	const o = function (e, t) {
		const n = Hs({}, ya, t), o = [];
		let r = n.start ? "^" : "";
		const i = [];
		for (const l of e) {
			const e = l.length ? [] : [90];
			n.strict && !l.length && (r += "/");
			for (let t = 0; t < l.length; t++) {
				const o = l[t];
				let s = 40 + (n.sensitive ? .25 : 0);
				if (0 === o.type) t || (r += "/"), r += o.value.replace(_a, "\\$&"), s += 40; else if (1 === o.type) {
					const {value: e, repeatable: n, optional: c, regexp: u} = o;
					i.push({name: e, repeatable: n, optional: c});
					const d = u || "[^/]+?";
					if ("[^/]+?" !== d) {
						s += 10;
						try {
							new RegExp(`(${d})`)
						} catch (a) {
							throw new Error(`Invalid custom RegExp for param "${e}" (${d}): ` + a.message)
						}
					}
					let p = n ? `((?:${d})(?:/(?:${d}))*)` : `(${d})`;
					t || (p = c && l.length < 2 ? `(?:/${p})` : "/" + p), c && (p += "?"), r += p, s += 20, c && (s += -8), n && (s += -20), ".*" === d && (s += -50)
				}
				e.push(s)
			}
			o.push(e)
		}
		if (n.strict && n.end) {
			const e = o.length - 1;
			o[e][o[e].length - 1] += .7000000000000001
		}
		n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
		const s = new RegExp(r, n.sensitive ? "" : "i");
		return {
			re: s, score: o, keys: i, parse: function (e) {
				const t = e.match(s), n = {};
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
						const {value: i, repeatable: s, optional: a} = e, l = i in t ? t[i] : "";
						if (Vs(l) && !s) throw new Error(`Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`);
						const c = Vs(l) ? l.join("/") : l;
						if (!c) {
							if (!a) throw new Error(`Missing required param "${i}"`);
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
		if ("/" === e) return [[Sa]];
		if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

		function t(e) {
			throw new Error(`ERR (${n})/"${c}": ${e}`)
		}

		let n = 0, o = n;
		const r = [];
		let i;

		function s() {
			i && r.push(i), i = []
		}

		let a, l = 0, c = "", u = "";

		function d() {
			c && (0 === n ? i.push({
				type: 0,
				value: c
			}) : 1 === n || 2 === n || 3 === n ? (i.length > 1 && ("*" === a || "+" === a) && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
				type: 1,
				value: c,
				regexp: u,
				repeatable: "*" === a || "+" === a,
				optional: "*" === a || "?" === a
			})) : t("Invalid state to consume buffer"), c = "")
		}

		function p() {
			c += a
		}

		for (; l < e.length;) if (a = e[l++], "\\" !== a || 2 === n) switch (n) {
			case 0:
				"/" === a ? (c && d(), s()) : ":" === a ? (d(), n = 1) : p();
				break;
			case 4:
				p(), n = o;
				break;
			case 1:
				"(" === a ? n = 2 : Ea.test(a) ? p() : (d(), n = 0, "*" !== a && "?" !== a && "+" !== a && l--);
				break;
			case 2:
				")" === a ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + a : n = 3 : u += a;
				break;
			case 3:
				d(), n = 0, "*" !== a && "?" !== a && "+" !== a && l--, u = "";
				break;
			default:
				t("Unknown state")
		} else o = n, n = 4;
		return 2 === n && t(`Unfinished custom RegExp for param "${c}"`), d(), s(), r
	}(e.path), n), r = Hs(o, {record: e, parent: t, children: [], alias: []});
	return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}

function Aa(e, t) {
	const n = [], o = new Map;

	function r(e, n, o) {
		const a = !o, l = function (e) {
			return {
				path: e.path,
				redirect: e.redirect,
				name: e.name,
				meta: e.meta || {},
				aliasOf: void 0,
				beforeEnter: e.beforeEnter,
				props: Ba(e),
				children: e.children || [],
				instances: {},
				leaveGuards: new Set,
				updateGuards: new Set,
				enterCallbacks: {},
				components: "components" in e ? e.components || null : e.component && {default: e.component}
			}
		}(e);
		l.aliasOf = o && o.record;
		const c = Oa(t, e), u = [l];
		if ("alias" in e) {
			const t = "string" == typeof e.alias ? [e.alias] : e.alias;
			for (const e of t) u.push(Hs({}, l, {
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
			if (d = ka(t, n, c), o ? o.alias.push(d) : (p = p || d, p !== d && p.alias.push(d), a && e.name && !Pa(d) && i(e.name)), l.children) {
				const e = l.children;
				for (let t = 0; t < e.length; t++) r(e[t], d, o && o.children[t])
			}
			o = o || d, (d.record.components && Object.keys(d.record.components).length || d.record.name || d.record.redirect) && s(d)
		}
		return p ? () => {
			i(p)
		} : qs
	}

	function i(e) {
		if (pa(e)) {
			const t = o.get(e);
			t && (o.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(i), t.alias.forEach(i))
		} else {
			const t = n.indexOf(e);
			t > -1 && (n.splice(t, 1), e.record.name && o.delete(e.record.name), e.children.forEach(i), e.alias.forEach(i))
		}
	}

	function s(e) {
		let t = 0;
		for (; t < n.length && xa(e, n[t]) >= 0 && (e.record.path !== n[t].record.path || !Ia(e, n[t]));) t++;
		n.splice(t, 0, e), e.record.name && !Pa(e) && o.set(e.record.name, e)
	}

	return t = Oa({strict: !1, end: !0, sensitive: !1}, t), e.forEach((e => r(e))), {
		addRoute: r,
		resolve: function (e, t) {
			let r, i, s, a = {};
			if ("name" in e && e.name) {
				if (r = o.get(e.name), !r) throw va(1, {location: e});
				s = r.record.name, a = Hs(Ca(t.params, r.keys.filter((e => !e.optional)).map((e => e.name))), e.params && Ca(e.params, r.keys.map((e => e.name)))), i = r.stringify(a)
			} else if ("path" in e) i = e.path, r = n.find((e => e.re.test(i))), r && (a = r.parse(i), s = r.record.name); else {
				if (r = t.name ? o.get(t.name) : n.find((e => e.re.test(t.path))), !r) throw va(1, {
					location: e,
					currentLocation: t
				});
				s = r.record.name, a = Hs({}, t.params, e.params), i = r.stringify(a)
			}
			const l = [];
			let c = r;
			for (; c;) l.unshift(c.record), c = c.parent;
			return {name: s, path: i, params: a, matched: l, meta: La(l)}
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

function Ca(e, t) {
	const n = {};
	for (const o of t) o in e && (n[o] = e[o]);
	return n
}

function Ba(e) {
	const t = {}, n = e.props || !1;
	if ("component" in e) t.default = n; else for (const o in e.components) t[o] = "boolean" == typeof n ? n : n[o];
	return t
}

function Pa(e) {
	for (; e;) {
		if (e.record.aliasOf) return !0;
		e = e.parent
	}
	return !1
}

function La(e) {
	return e.reduce(((e, t) => Hs(e, t.meta)), {})
}

function Oa(e, t) {
	const n = {};
	for (const o in e) n[o] = o in t ? t[o] : e[o];
	return n
}

function Ia(e, t) {
	return t.children.some((t => t === e || Ia(e, t)))
}

const Ma = /#/g, Fa = /&/g, ja = /\//g, Na = /=/g, Ra = /\?/g, Da = /\+/g, Ha = /%5B/g, za = /%5D/g, qa = /%5E/g,
	Va = /%60/g, Wa = /%7B/g, $a = /%7C/g, Qa = /%7D/g, Ua = /%20/g;

function Xa(e) {
	return encodeURI("" + e).replace($a, "|").replace(Ha, "[").replace(za, "]")
}

function Ya(e) {
	return Xa(e).replace(Da, "%2B").replace(Ua, "+").replace(Ma, "%23").replace(Fa, "%26").replace(Va, "`").replace(Wa, "{").replace(Qa, "}").replace(qa, "^")
}

function Ja(e) {
	return null == e ? "" : function (e) {
		return Xa(e).replace(Ma, "%23").replace(Ra, "%3F")
	}(e).replace(ja, "%2F")
}

function Ga(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {
	}
	return "" + e
}

function Ka(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e).split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(Da, " "), r = e.indexOf("="), i = Ga(r < 0 ? e : e.slice(0, r)),
			s = r < 0 ? null : Ga(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			Vs(e) || (e = t[i] = [e]), e.push(s)
		} else t[i] = s
	}
	return t
}

function Za(e) {
	let t = "";
	for (let n in e) {
		const o = e[n];
		if (n = Ya(n).replace(Na, "%3D"), null == o) {
			void 0 !== o && (t += (t.length ? "&" : "") + n);
			continue
		}
		(Vs(o) ? o.map((e => e && Ya(e))) : [o && Ya(o)]).forEach((e => {
			void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e))
		}))
	}
	return t
}

function el(e) {
	const t = {};
	for (const n in e) {
		const o = e[n];
		void 0 !== o && (t[n] = Vs(o) ? o.map((e => null == e ? null : "" + e)) : null == o ? o : "" + o)
	}
	return t
}

const tl = Symbol(""), nl = Symbol(""), ol = Symbol(""), rl = Symbol(""), il = Symbol("");

function sl() {
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

function al(e, t, n, o, r) {
	const i = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
	return () => new Promise(((s, a) => {
		const l = e => {
			var l;
			!1 === e ? a(va(4, {
				from: n,
				to: t
			})) : e instanceof Error ? a(e) : "string" == typeof (l = e) || l && "object" == typeof l ? a(va(2, {
				from: t,
				to: e
			})) : (i && o.enterCallbacks[r] === i && "function" == typeof e && i.push(e), s())
		}, c = e.call(o && o.instances[r], t, n, l);
		let u = Promise.resolve(c);
		e.length < 3 && (u = u.then(l)), u.catch((e => a(e)))
	}))
}

function ll(e, t, n, o) {
	const r = [];
	for (const s of e) for (const e in s.components) {
		let a = s.components[e];
		if ("beforeRouteEnter" === t || s.instances[e]) if ("object" == typeof (i = a) || "displayName" in i || "props" in i || "__vccOpts" in i) {
			const i = (a.__vccOpts || a)[t];
			i && r.push(al(i, n, o, s, e))
		} else {
			let i = a();
			r.push((() => i.then((r => {
				if (!r) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));
				const i = (a = r).__esModule || "Module" === a[Symbol.toStringTag] ? r.default : r;
				var a;
				s.components[e] = i;
				const l = (i.__vccOpts || i)[t];
				return l && al(l, n, o, s, e)()
			}))))
		}
	}
	var i;
	return r
}

function cl(e) {
	const t = Jn(ol), n = Jn(rl), o = wi((() => t.resolve(cn(e.to)))), r = wi((() => {
			const {matched: e} = o.value, {length: t} = e, r = e[t - 1], i = n.matched;
			if (!r || !i.length) return -1;
			const s = i.findIndex(Us.bind(null, r));
			if (s > -1) return s;
			const a = dl(e[t - 2]);
			return t > 1 && dl(r) === a && i[i.length - 1].path !== a ? i.findIndex(Us.bind(null, e[t - 2])) : s
		})), i = wi((() => r.value > -1 && function (e, t) {
			for (const n in t) {
				const o = t[n], r = e[n];
				if ("string" == typeof o) {
					if (o !== r) return !1
				} else if (!Vs(r) || r.length !== o.length || o.some(((e, t) => e !== r[t]))) return !1
			}
			return !0
		}(n.params, o.value.params))),
		s = wi((() => r.value > -1 && r.value === n.matched.length - 1 && Xs(n.params, o.value.params)));
	return {
		route: o, href: wi((() => o.value.href)), isActive: i, isExactActive: s, navigate: function (n = {}) {
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
			}(n) ? t[cn(e.replace) ? "replace" : "push"](cn(e.to)).catch(qs) : Promise.resolve()
		}
	}
}

const ul = ho({
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
	useLink: cl,
	setup(e, {slots: t}) {
		const n = Wt(cl(e)), {options: o} = Jn(ol), r = wi((() => ({
			[pl(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
			[pl(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
		})));
		return () => {
			const o = t.default && t.default(n);
			return e.custom ? o : xi("a", {
				"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
				href: n.href,
				onClick: n.navigate,
				class: r.value
			}, o)
		}
	}
});

function dl(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

const pl = (e, t, n) => null != e ? e : null != t ? t : n;

function fl(e, t) {
	if (!e) return null;
	const n = e(t);
	return 1 === n.length ? n[0] : n
}

const hl = ho({
	name: "RouterView",
	inheritAttrs: !1,
	props: {name: {type: String, default: "default"}, route: Object},
	compatConfig: {MODE: 3},
	setup(e, {attrs: t, slots: n}) {
		const o = Jn(il), r = wi((() => e.route || o.value)), i = Jn(nl, 0), s = wi((() => {
			let e = cn(i);
			const {matched: t} = r.value;
			let n;
			for (; (n = t[e]) && !n.components;) e++;
			return e
		})), a = wi((() => r.value.matched[s.value]));
		Yn(nl, wi((() => s.value + 1))), Yn(tl, a), Yn(il, r);
		const l = rn();
		return Zn((() => [l.value, a.value, e.name]), (([e, t, n], [o, r, i]) => {
			t && (t.instances[n] = e, r && r !== t && e && e === o && (t.leaveGuards.size || (t.leaveGuards = r.leaveGuards), t.updateGuards.size || (t.updateGuards = r.updateGuards))), !e || !t || r && Us(t, r) && o || (t.enterCallbacks[n] || []).forEach((t => t(e)))
		}), {flush: "post"}), () => {
			const o = r.value, i = e.name, s = a.value, c = s && s.components[i];
			if (!c) return fl(n.default, {Component: c, route: o});
			const u = s.props[i], d = u ? !0 === u ? o.params : "function" == typeof u ? u(o) : u : null,
				p = xi(c, Hs({}, d, t, {
					onVnodeUnmounted: e => {
						e.component.isUnmounted && (s.instances[i] = null)
					}, ref: l
				}));
			return fl(n.default, {Component: p, route: o}) || p
		}
	}
});

function ml(e) {
	const t = Aa(e.routes, e), n = e.parseQuery || Ka, o = e.stringifyQuery || Za, r = e.history, i = sl(), s = sl(),
		a = sl(), l = sn(fa);
	let c = fa;
	Ds && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
	const u = zs.bind(null, (e => "" + e)), d = zs.bind(null, Ja), p = zs.bind(null, Ga);

	function f(e, i) {
		if (i = Hs({}, i || l.value), "string" == typeof e) {
			const o = $s(n, e, i.path), s = t.resolve({path: o.path}, i), a = r.createHref(o.fullPath);
			return Hs(o, s, {params: p(s.params), hash: Ga(o.hash), redirectedFrom: void 0, href: a})
		}
		let s;
		if ("path" in e) s = Hs({}, e, {path: $s(n, e.path, i.path).path}); else {
			const t = Hs({}, e.params);
			for (const e in t) null == t[e] && delete t[e];
			s = Hs({}, e, {params: d(e.params)}), i.params = d(i.params)
		}
		const a = t.resolve(s, i), c = e.hash || "";
		a.params = u(p(a.params));
		const f = function (e, t) {
			const n = t.query ? e(t.query) : "";
			return t.path + (n && "?") + n + (t.hash || "")
		}(o, Hs({}, e, {hash: (h = c, Xa(h).replace(Wa, "{").replace(Qa, "}").replace(qa, "^")), path: a.path}));
		var h;
		const m = r.createHref(f);
		return Hs({fullPath: f, hash: c, query: o === Za ? el(e.query) : e.query || {}}, a, {
			redirectedFrom: void 0,
			href: m
		})
	}

	function h(e) {
		return "string" == typeof e ? $s(n, e, l.value.path) : Hs({}, e)
	}

	function m(e, t) {
		if (c !== e) return va(8, {from: t, to: e})
	}

	function g(e) {
		return b(e)
	}

	function v(e) {
		const t = e.matched[e.matched.length - 1];
		if (t && t.redirect) {
			const {redirect: n} = t;
			let o = "function" == typeof n ? n(e) : n;
			return "string" == typeof o && (o = o.includes("?") || o.includes("#") ? o = h(o) : {path: o}, o.params = {}), Hs({
				query: e.query,
				hash: e.hash,
				params: "path" in o ? {} : e.params
			}, o)
		}
	}

	function b(e, t) {
		const n = c = f(e), r = l.value, i = e.state, s = e.force, a = !0 === e.replace, u = v(n);
		if (u) return b(Hs(h(u), {state: "object" == typeof u ? Hs({}, i, u.state) : i, force: s, replace: a}), t || n);
		const d = n;
		let p;
		return d.redirectedFrom = t, !s && function (e, t, n) {
			const o = t.matched.length - 1, r = n.matched.length - 1;
			return o > -1 && o === r && Us(t.matched[o], n.matched[r]) && Xs(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
		}(o, r, n) && (p = va(16, {
			to: d,
			from: r
		}), P(r, r, !0, !1)), (p ? Promise.resolve(p) : _(d, r)).catch((e => ba(e) ? ba(e, 2) ? e : B(e) : C(e, d, r))).then((e => {
			if (e) {
				if (ba(e, 2)) return b(Hs({replace: a}, h(e.to), {
					state: "object" == typeof e.to ? Hs({}, i, e.to.state) : i,
					force: s
				}), t || d)
			} else e = x(d, r, !0, a, i);
			return w(d, r, e), e
		}))
	}

	function y(e, t) {
		const n = m(e, t);
		return n ? Promise.reject(n) : Promise.resolve()
	}

	function _(e, t) {
		let n;
		const [o, r, a] = function (e, t) {
			const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
			for (let s = 0; s < i; s++) {
				const i = t.matched[s];
				i && (e.matched.find((e => Us(e, i))) ? o.push(i) : n.push(i));
				const a = e.matched[s];
				a && (t.matched.find((e => Us(e, a))) || r.push(a))
			}
			return [n, o, r]
		}(e, t);
		n = ll(o.reverse(), "beforeRouteLeave", e, t);
		for (const i of o) i.leaveGuards.forEach((o => {
			n.push(al(o, e, t))
		}));
		const l = y.bind(null, e, t);
		return n.push(l), gl(n).then((() => {
			n = [];
			for (const o of i.list()) n.push(al(o, e, t));
			return n.push(l), gl(n)
		})).then((() => {
			n = ll(r, "beforeRouteUpdate", e, t);
			for (const o of r) o.updateGuards.forEach((o => {
				n.push(al(o, e, t))
			}));
			return n.push(l), gl(n)
		})).then((() => {
			n = [];
			for (const o of e.matched) if (o.beforeEnter && !t.matched.includes(o)) if (Vs(o.beforeEnter)) for (const r of o.beforeEnter) n.push(al(r, e, t)); else n.push(al(o.beforeEnter, e, t));
			return n.push(l), gl(n)
		})).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = ll(a, "beforeRouteEnter", e, t), n.push(l), gl(n)))).then((() => {
			n = [];
			for (const o of s.list()) n.push(al(o, e, t));
			return n.push(l), gl(n)
		})).catch((e => ba(e, 8) ? e : Promise.reject(e)))
	}

	function w(e, t, n) {
		for (const o of a.list()) o(e, t, n)
	}

	function x(e, t, n, o, i) {
		const s = m(e, t);
		if (s) return s;
		const a = t === fa, c = Ds ? history.state : {};
		n && (o || a ? r.replace(e.fullPath, Hs({scroll: a && c && c.scroll}, i)) : r.push(e.fullPath, i)), l.value = e, P(e, t, n, a), B()
	}

	let T;

	function S() {
		T || (T = r.listen(((e, t, n) => {
			if (!M.listening) return;
			const o = f(e), i = v(o);
			if (i) return void b(Hs(i, {replace: !0}), o).catch(qs);
			c = o;
			const s = l.value;
			var a, u;
			Ds && (a = sa(s.fullPath, n.delta), u = ra(), aa.set(a, u)), _(o, s).catch((e => ba(e, 12) ? e : ba(e, 2) ? (b(e.to, o).then((e => {
				ba(e, 20) && !n.delta && n.type === Gs.pop && r.go(-1, !1)
			})).catch(qs), Promise.reject()) : (n.delta && r.go(-n.delta, !1), C(e, o, s)))).then((e => {
				(e = e || x(o, s, !1)) && (n.delta && !ba(e, 8) ? r.go(-n.delta, !1) : n.type === Gs.pop && ba(e, 20) && r.go(-1, !1)), w(o, s, e)
			})).catch(qs)
		})))
	}

	let E, k = sl(), A = sl();

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
		if (!Ds || !i) return Promise.resolve();
		const s = !o && function (e) {
			const t = aa.get(e);
			return aa.delete(e), t
		}(sa(t.fullPath, 0)) || (r || !o) && history.state && history.state.scroll || null;
		return Cn().then((() => i(t, n, s))).then((e => e && ia(e))).catch((e => C(e, t, n)))
	}

	const L = e => r.go(e);
	let O;
	const I = new Set, M = {
		currentRoute: l,
		listening: !0,
		addRoute: function (e, n) {
			let o, r;
			return pa(e) ? (o = t.getRecordMatcher(e), r = n) : r = e, t.addRoute(r, o)
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
			return g(Hs(h(e), {replace: !0}))
		},
		go: L,
		back: () => L(-1),
		forward: () => L(1),
		beforeEach: i.add,
		beforeResolve: s.add,
		afterEach: a.add,
		onError: A.add,
		isReady: function () {
			return E && l.value !== fa ? Promise.resolve() : new Promise(((e, t) => {
				k.add([e, t])
			}))
		},
		install(e) {
			e.component("RouterLink", ul), e.component("RouterView", hl), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
				enumerable: !0,
				get: () => cn(l)
			}), Ds && !O && l.value === fa && (O = !0, g(r.location).catch((e => {
			})));
			const t = {};
			for (const o in fa) t[o] = wi((() => l.value[o]));
			e.provide(ol, this), e.provide(rl, Wt(t)), e.provide(il, l);
			const n = e.unmount;
			I.add(e), e.unmount = function () {
				I.delete(e), I.size < 1 && (c = fa, T && T(), T = null, l.value = fa, O = !1, E = !1), n()
			}
		}
	};
	return M
}

function gl(e) {
	return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}

function vl() {
	return Jn(rl)
}

const bl = fe((() => "undefined" != typeof __uniConfig && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length));
let yl;

function _l(e) {
	return Rs(e, oe) ? Tl().f(e, function () {
		const e = Ud(), t = __uniConfig.locales;
		return t[e] || t[__uniConfig.fallbackLocale] || t.en || {}
	}(), oe) : e
}

function wl(e, t) {
	if (1 === t.length) {
		if (e) {
			const n = e => F(e) && Rs(e, oe), o = t[0];
			let r = [];
			if (P(e) && (r = e.filter((e => n(e[o])))).length) return r;
			const i = e[t[0]];
			if (n(i)) return e
		}
		return
	}
	const n = t.shift();
	return wl(e && e[n], t)
}

function xl(e, t) {
	const n = wl(e, t);
	if (!n) return !1;
	const o = t[t.length - 1];
	if (P(n)) n.forEach((e => xl(e, [o]))); else {
		let e = n[o];
		Object.defineProperty(n, o, {
			get: () => _l(e), set(t) {
				e = t
			}
		})
	}
	return !0
}

function Tl() {
	if (!yl) {
		let e;
		if (e = navigator.cookieEnabled && window.localStorage && localStorage.UNI_LOCALE || __uniConfig.locale || navigator.language, yl = Ns(e), bl()) {
			const t = Object.keys(__uniConfig.locales || {});
			t.length && t.forEach((e => yl.add(e, __uniConfig.locales[e]))), yl.setLocale(e)
		}
	}
	return yl
}

function Sl(e, t, n) {
	return t.reduce(((t, o, r) => (t[e + o] = n[r], t)), {})
}

const El = fe((() => {
	const e = "uni.async.", t = ["error"];
	Tl().add("en", Sl(e, t, ["The connection timed out, click the screen to try again."]), !1), Tl().add("es", Sl(e, t, ["Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."]), !1), Tl().add("fr", Sl(e, t, ["La connexion a expiré, cliquez sur l'écran pour réessayer."]), !1), Tl().add("zh-Hans", Sl(e, t, ["连接服务器超时，点击屏幕重试"]), !1), Tl().add("zh-Hant", Sl(e, t, ["連接服務器超時，點擊屏幕重試"]), !1)
})), kl = fe((() => {
	const e = "uni.showToast.", t = ["unpaired"];
	Tl().add("en", Sl(e, t, ["Please note showToast must be paired with hideToast"]), !1), Tl().add("es", Sl(e, t, ["Tenga en cuenta que showToast debe estar emparejado con hideToast"]), !1), Tl().add("fr", Sl(e, t, ["Veuillez noter que showToast doit être associé à hideToast"]), !1), Tl().add("zh-Hans", Sl(e, t, ["请注意 showToast 与 hideToast 必须配对使用"]), !1), Tl().add("zh-Hant", Sl(e, t, ["請注意 showToast 與 hideToast 必須配對使用"]), !1)
})), Al = fe((() => {
	const e = "uni.showLoading.", t = ["unpaired"];
	Tl().add("en", Sl(e, t, ["Please note showLoading must be paired with hideLoading"]), !1), Tl().add("es", Sl(e, t, ["Tenga en cuenta que showLoading debe estar emparejado con hideLoading"]), !1), Tl().add("fr", Sl(e, t, ["Veuillez noter que showLoading doit être associé à hideLoading"]), !1), Tl().add("zh-Hans", Sl(e, t, ["请注意 showLoading 与 hideLoading 必须配对使用"]), !1), Tl().add("zh-Hant", Sl(e, t, ["請注意 showLoading 與 hideLoading 必須配對使用"]), !1)
})), Cl = fe((() => {
	const e = "uni.chooseFile.", t = ["notUserActivation"];
	Tl().add("en", Sl(e, t, ["File chooser dialog can only be shown with a user activation"]), !1), Tl().add("es", Sl(e, t, ["El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario"]), !1), Tl().add("fr", Sl(e, t, ["La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur"]), !1), Tl().add("zh-Hans", Sl(e, t, ["文件选择器对话框只能在用户激活时显示"]), !1), Tl().add("zh-Hant", Sl(e, t, ["文件選擇器對話框只能在用戶激活時顯示"]), !1)
})), Bl = fe((() => {
	const e = "uni.video.", t = ["danmu", "volume"];
	Tl().add("en", Sl(e, t, ["Danmu", "Volume"]), !1), Tl().add("es", Sl(e, t, ["Danmu", "Volumen"]), !1), Tl().add("fr", Sl(e, t, ["Danmu", "Le Volume"]), !1), Tl().add("zh-Hans", Sl(e, t, ["弹幕", "音量"]), !1), Tl().add("zh-Hant", Sl(e, t, ["彈幕", "音量"]), !1)
}));

function Pl(e) {
	const t = new Oe;
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

let Ll = 1;
const Ol = Object.create(null);

function Il(e, t) {
	return e + "." + t
}

function Ml(e, t, n) {
	t = Il(e, t), Ol[t] || (Ol[t] = n)
}

function Fl({id: e, name: t, args: n}, o) {
	t = Il(o, t);
	const r = t => {
		e && uv.publishHandler("invokeViewApi." + e, t)
	}, i = Ol[t];
	i ? i(n, r) : r({})
}

const jl = k(Pl("service"), {
	invokeServiceMethod: (e, t, n) => {
		const {subscribe: o, publishHandler: r} = uv, i = n ? Ll++ : 0;
		n && o("invokeServiceApi." + i, n, !0), r("invokeServiceApi", {id: i, name: e, args: t})
	}
}), Nl = be(!0);
let Rl;

function Dl() {
	Rl && (clearTimeout(Rl), Rl = null)
}

let Hl = 0, zl = 0;

function ql(e) {
	if (Dl(), 1 !== e.touches.length) return;
	const {pageX: t, pageY: n} = e.touches[0];
	Hl = t, zl = n, Rl = setTimeout((function () {
		const t = new CustomEvent("longpress", {
			bubbles: !0,
			cancelable: !0,
			target: e.target,
			currentTarget: e.currentTarget
		});
		t.touches = e.touches, t.changedTouches = e.changedTouches, e.target.dispatchEvent(t)
	}), 350)
}

function Vl(e) {
	if (!Rl) return;
	if (1 !== e.touches.length) return Dl();
	const {pageX: t, pageY: n} = e.touches[0];
	return Math.abs(t - Hl) > 10 || Math.abs(n - zl) > 10 ? Dl() : void 0
}

function Wl(e, t) {
	const n = Number(e);
	return isNaN(n) ? t : n
}

function $l() {
	const e = __uniConfig.globalStyle || {}, t = Wl(e.rpxCalcMaxDeviceWidth, 960),
		n = Wl(e.rpxCalcBaseDeviceWidth, 375);

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

function Ql() {
	$l(), me(), window.addEventListener("touchstart", ql, Nl), window.addEventListener("touchmove", Vl, Nl), window.addEventListener("touchend", Dl, Nl), window.addEventListener("touchcancel", Dl, Nl)
}

var Ul, Xl, Yl = ["top", "left", "right", "bottom"], Jl = {};

function Gl() {
	return Xl = "CSS" in window && "function" == typeof CSS.supports ? CSS.supports("top: env(safe-area-inset-top)") ? "env" : CSS.supports("top: constant(safe-area-inset-top)") ? "constant" : "" : ""
}

function Kl() {
	if (Xl = "string" == typeof Xl ? Xl : Gl()) {
		var e = [], t = !1;
		try {
			var n = Object.defineProperty({}, "passive", {
				get: function () {
					t = {passive: !0}
				}
			});
			window.addEventListener("test", null, n)
		} catch (a) {
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
		}), Yl.forEach((function (e) {
			s(o, e)
		})), document.body.appendChild(o), i(), Ul = !0
	} else Yl.forEach((function (e) {
		Jl[e] = 0
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

	function s(e, n) {
		var o = document.createElement("div"), s = document.createElement("div"), a = document.createElement("div"),
			l = document.createElement("div"), c = {
				position: "absolute",
				width: "100px",
				height: "200px",
				boxSizing: "border-box",
				overflow: "hidden",
				paddingBottom: Xl + "(safe-area-inset-" + n + ")"
			};
		r(o, c), r(s, c), r(a, {
			transition: "0s",
			animation: "none",
			width: "400px",
			height: "400px"
		}), r(l, {
			transition: "0s",
			animation: "none",
			width: "250%",
			height: "250%"
		}), o.appendChild(a), s.appendChild(l), e.appendChild(o), e.appendChild(s), i((function () {
			o.scrollTop = s.scrollTop = 1e4;
			var e = o.scrollTop, r = s.scrollTop;

			function i() {
				this.scrollTop !== (this === o ? e : r) && (o.scrollTop = s.scrollTop = 1e4, e = o.scrollTop, r = s.scrollTop, function (e) {
					ec.length || setTimeout((function () {
						var e = {};
						ec.forEach((function (t) {
							e[t] = Jl[t]
						})), ec.length = 0, tc.forEach((function (t) {
							t(e)
						}))
					}), 0);
					ec.push(e)
				}(n))
			}

			o.addEventListener("scroll", i, t), s.addEventListener("scroll", i, t)
		}));
		var u = getComputedStyle(o);
		Object.defineProperty(Jl, n, {
			configurable: !0, get: function () {
				return parseFloat(u.paddingBottom)
			}
		})
	}
}

function Zl(e) {
	return Ul || Kl(), Jl[e]
}

var ec = [];
var tc = [];
var nc = {
	get support() {
		return 0 != ("string" == typeof Xl ? Xl : Gl()).length
	}, get top() {
		return Zl("top")
	}, get left() {
		return Zl("left")
	}, get right() {
		return Zl("right")
	}, get bottom() {
		return Zl("bottom")
	}, onChange: function (e) {
		Gl() && (Ul || Kl(), "function" == typeof e && tc.push(e))
	}, offChange: function (e) {
		var t = tc.indexOf(e);
		t >= 0 && tc.splice(t, 1)
	}
};
const oc = Ts((() => {
}), ["prevent"]);

function rc(e, t) {
	return parseInt((e.getPropertyValue(t).match(/\d+/) || ["0"])[0])
}

function ic() {
	const e = rc(document.documentElement.style, "--window-top");
	return e ? e + nc.top : 0
}

function sc() {
	const e = document.documentElement.style, t = ic(), n = rc(e, "--window-bottom"), o = rc(e, "--window-left"),
		r = rc(e, "--window-right"), i = rc(e, "--top-window-height");
	return {
		top: t,
		bottom: n ? n + nc.bottom : 0,
		left: o ? o + nc.left : 0,
		right: r ? r + nc.right : 0,
		topWindowHeight: i || 0
	}
}

function ac(e) {
	const t = document.documentElement.style;
	Object.keys(e).forEach((n => {
		t.setProperty(n, e[n])
	}))
}

function lc(e) {
	return ac(e)
}

function cc(e) {
	return Symbol(e)
}

function uc(e) {
	return -1 !== (e += "").indexOf("rpx") || -1 !== e.indexOf("upx")
}

function dc(e, t = !1) {
	if (t) return function (e) {
		if (!uc(e)) return e;
		return e.replace(/(\d+(\.\d+)?)[ru]px/g, ((e, t) => vd(parseFloat(t)) + "px"))
	}(e);
	if (F(e)) {
		const t = parseInt(e) || 0;
		return uc(e) ? vd(t) : t
	}
	return e
}

const pc = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z",
	fc = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";

function hc(e, t = "#000", n = 27) {
	return ei("svg", {width: n, height: n, viewBox: "0 0 32 32"}, [ei("path", {
		d: e,
		fill: t
	}, null, 8, ["d", "fill"])], 8, ["width", "height"])
}

function mc() {
	{
		const {$pageInstance: e} = pi();
		return e && e.proxy.$page.id
	}
}

function gc(e) {
	const t = se(e);
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
	const n = JSON.parse(JSON.stringify(__uniConfig.globalStyle || {})), o = k({id: t}, n, e);
	wc.forEach((t => {
		o[t] = k({}, n[t], e[t])
	}));
	const {navigationBar: r} = o;
	return r.titleText && r.titleImage && (r.titleText = ""), o
}

function Tc(e, t, n) {
	if (F(e)) n = t, t = e, e = _c(); else if ("number" == typeof e) {
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
	const s = () => {
		function s() {
			if ((() => {
				const {scrollHeight: e} = document.documentElement, t = window.innerHeight, o = window.scrollY,
					i = o > 0 && e > t && o + t + n >= e, s = Math.abs(e - kc) > n;
				return !i || r && !s ? (!i && r && (r = !1), !1) : (kc = e, r = !0, !0)
			})()) return t && t(), i = !1, setTimeout((function () {
				i = !0
			}), 350), !0
		}

		e && e(window.pageYOffset), t && i && (s() || (Ec = setTimeout(s, 300))), o = !1
	};
	return function () {
		clearTimeout(Ec), o || requestAnimationFrame(s), o = !0
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
	return i.splice(i.length - r - 1, r + 1), ue(i.concat(n).join("/"))
}

function Bc(e, t = !1) {
	return t ? __uniRoutes.find((t => t.path === e || t.alias === e)) : __uniRoutes.find((t => t.path === e))
}

class Pc {
	constructor(e) {
		this.$bindClass = !1, this.$bindStyle = !1, this.$vm = e, this.$el = function (e, t = !1) {
			const {vnode: n} = e;
			if (le(n.el)) return t ? n.el ? [n.el] : [] : n.el;
			const {subTree: o} = e;
			if (16 & o.shapeFlag) {
				const e = o.children.filter((e => e.el && le(e.el)));
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
			if (!e || F(e)) return t;
			for (const n in e) {
				const o = e[n], r = n.startsWith("--") ? n : X(n);
				(F(o) || "number" == typeof o) && (t += `${r}:${o};`)
			}
			return t
		}(e))
	}

	setStyle(e) {
		return this.$el && e ? (F(e) && (e = d(e)), z(e) && (this.$el.__wxsStyle = e, this.forceUpdate("style")), this) : this
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
		M(n) ? n(JSON.parse(JSON.stringify(t))) : this.$vm.ownerId && uv.publishHandler("onWxsInvokeCallMethod", {
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
	if (t && e && (e = ae(e.$)), e && e.$el) return e.$el.__wxsComponentDescriptor || (e.$el.__wxsComponentDescriptor = new Pc(e)), e.$el.__wxsComponentDescriptor
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
			const o = ae(t);
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
		s = {type: n, timeStamp: o, target: ye(t ? r : Fc(r)), detail: {}, currentTarget: ye(i)};
	return e._stopped && (s._stopped = !0), e.type.startsWith("touch") && (s.touches = e.touches, s.changedTouches = e.changedTouches), function (e, t) {
		k(e, {preventDefault: () => t.preventDefault(), stopPropagation: () => t.stopPropagation()})
	}(s, e), s
}

function Nc(e, t) {
	return {force: 1, identifier: 0, clientX: e.clientX, clientY: e.clientY - t, pageX: e.pageX, pageY: e.pageY - t}
}

function Rc(e, t) {
	const n = [];
	for (let o = 0; o < e.length; o++) {
		const {identifier: r, pageX: i, pageY: s, clientX: a, clientY: l, force: c} = e[o];
		n.push({identifier: r, pageX: i, pageY: s - t, clientX: a, clientY: l - t, force: c || 0})
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
			const {x: n, y: o} = t, r = ic();
			e.detail = {x: n, y: o - r}, e.touches = e.changedTouches = [Nc(t, r)]
		}(i, e); else if ((e => 0 === e.type.indexOf("mouse") || ["contextmenu"].includes(e.type))(e)) !function (e, t) {
			const n = ic();
			e.pageX = t.pageX, e.pageY = t.pageY - n, e.clientX = t.clientX, e.clientY = t.clientY - n, e.touches = e.changedTouches = [Nc(t, n)]
		}(i, e); else if ((e => "undefined" != typeof TouchEvent && e instanceof TouchEvent || 0 === e.type.indexOf("touch") || ["longpress"].indexOf(e.type) >= 0)(e)) {
			const t = ic();
			i.touches = Rc(e.touches, t), i.changedTouches = Rc(e.changedTouches, t)
		}
		return Ic(i, t, n) || [i]
	}, createNativeEvent: jc
}, Symbol.toStringTag, {value: "Module"});

function Hc(e) {
	!function (e) {
		const t = e.globalProperties;
		k(t, Dc), t.$gcd = Oc
	}(e._context.config)
}

let zc = 1;

function qc() {
	return yc() + ".invokeViewApi"
}

const Vc = k(Pl("view"), {
	invokeOnCallback: (e, t) => dv.emit("api." + e, t), invokeViewMethod: (e, t, n, o) => {
		const {subscribe: r, publishHandler: i} = dv, s = o ? zc++ : 0;
		o && r("invokeViewApi." + s, o, !0), i(qc(), {id: s, name: e, args: t}, n)
	}, invokeViewMethodKeepAlive: (e, t, n, o) => {
		const {subscribe: r, unsubscribe: i, publishHandler: s} = dv, a = zc++, l = "invokeViewApi." + a;
		return r(l, n), s(qc(), {id: a, name: e, args: t}, o), () => {
			i(l)
		}
	}
});

function Wc(e) {
	Tc(vc(), "onResize", e), dv.invokeOnCallback("onWindowResize", e)
}

function $c(e) {
	const t = vc();
	Tc(um(), "onShow", e), Tc(t, "onShow")
}

function Qc() {
	Tc(um(), "onHide"), Tc(vc(), "onHide")
}

const Uc = ["onPageScroll", "onReachBottom"];

function Xc() {
	Uc.forEach((e => dv.subscribe(e, function (e) {
		return (t, n) => {
			Tc(parseInt(n), e, t)
		}
	}(e))))
}

function Yc() {
	!function () {
		const {on: e} = dv;
		e("onResize", Wc), e("onAppEnterForeground", $c), e("onAppEnterBackground", Qc)
	}(), Xc()
}

function Jc() {
	if (this.$route) {
		const e = this.$route.meta;
		return e.eventChannel || (e.eventChannel = new Ee(this.$page.id)), e.eventChannel
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
		const t = o[n], s = t.option.transition, a = function (e) {
			const t = ["matrix", "matrix3d", "scale", "scale3d", "rotate3d", "skew", "translate", "translate3d"],
				n = ["scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "translateX", "translateY", "translateZ"],
				o = ["opacity", "background-color"], r = ["width", "height", "left", "right", "top", "bottom"],
				i = e.animates, s = e.option, a = s.transition, l = {}, c = [];
			return i.forEach((e => {
				let i = e.type, s = [...e.args];
				if (t.concat(n).includes(i)) i.startsWith("rotate") || i.startsWith("skew") ? s = s.map((e => parseFloat(e) + "deg")) : i.startsWith("translate") && (s = s.map(Zc)), n.indexOf(i) >= 0 && (s.length = 1), c.push(`${i}(${s.join(",")})`); else if (o.concat(r).includes(s[0])) {
					i = s[0];
					const e = s[1];
					l[i] = r.includes(i) ? Zc(e) : e
				}
			})), l.transform = l.webkitTransform = c.join(" "), l.transition = l.webkitTransition = Object.keys(l).map((e => `${function (e) {
				return e.replace(/[A-Z]/g, (e => `-${e.toLowerCase()}`)).replace("webkit", "-webkit")
			}(e)} ${a.duration}ms ${a.timingFunction} ${a.delay}ms`)).join(","), l.transformOrigin = l.webkitTransformOrigin = s.transformOrigin, l
		}(t);
		Object.keys(a).forEach((t => {
			e.$el.style[t] = a[t]
		})), n += 1, n < r && setTimeout(i, s.duration + s.delay)
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
}, ou = e => (e.__reserved = !0, e.compatConfig = {MODE: 3}, ho(e)), ru = {
	hoverClass: {type: String, default: "none"},
	hoverStopPropagation: {type: Boolean, default: !1},
	hoverStartTime: {type: [Number, String], default: 50},
	hoverStayTime: {type: [Number, String], default: 400}
};

function iu(e) {
	const t = rn(!1);
	let n, o, r = !1;

	function i() {
		requestAnimationFrame((() => {
			clearTimeout(o), o = setTimeout((() => {
				t.value = !1
			}), parseInt(e.hoverStayTime))
		}))
	}

	function s(o) {
		o._hoverPropagationStopped || e.hoverClass && "none" !== e.hoverClass && !e.disabled && (e.hoverStopPropagation && (o._hoverPropagationStopped = !0), r = !0, n = setTimeout((() => {
			t.value = !0, r || i()
		}), parseInt(e.hoverStartTime)))
	}

	function a() {
		r = !1, t.value && i()
	}

	function l() {
		a(), window.removeEventListener("mouseup", l)
	}

	return {
		hovering: t, binding: {
			onTouchstartPassive: function (e) {
				e.touches.length > 1 || s(e)
			}, onMousedown: function (e) {
				r || (s(e), window.addEventListener("mouseup", l))
			}, onTouchend: function () {
				a()
			}, onMouseup: function () {
				r && l()
			}, onTouchcancel: function () {
				r = !1, t.value = !1, clearTimeout(n)
			}
		}
	}
}

function su(e, t) {
	return F(t) && (t = [t]), t.reduce(((t, n) => (e[n] && (t[n] = !0), t)), Object.create(null))
}

function au(e) {
	return e.__wwe = !0, e
}

function lu(e, t) {
	return (n, o, r) => {
		e.value && t(n, function (e, t, n, o) {
			const r = ye(n);
			return {type: o.type || e, timeStamp: t.timeStamp || 0, target: r, currentTarget: r, detail: o}
		}(n, o, e.value, r || {}))
	}
}

const cu = cc("uf"), uu = cc("ul");

function du(e, t, n) {
	const o = mc();
	n && !e || z(t) && Object.keys(t).forEach((r => {
		n ? 0 !== r.indexOf("@") && 0 !== r.indexOf("uni-") && uv.on(`uni-${r}-${o}-${e}`, t[r]) : 0 === r.indexOf("uni-") ? uv.on(r, t[r]) : e && uv.on(`uni-${r}-${o}-${e}`, t[r])
	}))
}

function pu(e, t, n) {
	const o = mc();
	n && !e || z(t) && Object.keys(t).forEach((r => {
		n ? 0 !== r.indexOf("@") && 0 !== r.indexOf("uni-") && uv.off(`uni-${r}-${o}-${e}`, t[r]) : 0 === r.indexOf("uni-") ? uv.off(r, t[r]) : e && uv.off(`uni-${r}-${o}-${e}`, t[r])
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
		const n = rn(null), o = Jn(cu, !1), {hovering: r, binding: i} = iu(e);
		Tl();
		const s = au(((t, r) => {
			if (e.disabled) return t.stopImmediatePropagation();
			r && n.value.click();
			const i = e.formType;
			if (i) {
				if (!o) return;
				"submit" === i ? o.submit(t) : "reset" === i && o.reset(t)
			} else ;
		})), a = Jn(uu, !1);
		return a && (a.addHandler(s), Ro((() => {
			a.removeHandler(s)
		}))), function (e, t) {
			du(e.id, t), Zn((() => e.id), ((e, n) => {
				pu(n, t, !0), du(e, t, !0)
			})), Do((() => {
				pu(e.id, t)
			}))
		}(e, {"label-click": s}), () => {
			const o = e.hoverClass, a = su(e, "disabled"), l = su(e, "loading"), c = su(e, "plain"),
				u = o && "none" !== o;
			return ei("uni-button", ai({
				ref: n,
				onClick: s,
				class: u && r.value ? o : ""
			}, u && i, a, l, c), [t.default && t.default()], 16, ["onClick"])
		}
	}
});

function hu(e) {
	return e.$el
}

function mu(e) {
	const {base: t} = __uniConfig.router;
	return 0 === ue(e).indexOf(t) ? ue(e) : t + e
}

function gu(e) {
	const {base: t, assets: n} = __uniConfig.router;
	if ("./" === t && (0 === e.indexOf("./static/") || n && 0 === e.indexOf("./" + n + "/")) && (e = e.slice(1)), 0 === e.indexOf("/")) {
		if (0 !== e.indexOf("//")) return mu(e.slice(1));
		e = "https:" + e
	}
	if (re.test(e) || ie.test(e) || 0 === e.indexOf("blob:")) return e;
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
	dv.invokeViewMethod("video." + e, {videoId: e, type: n, data: o}, t)
}

function Bu(e, t) {
	const n = {}, {top: o, topWindowHeight: r} = sc();
	if (t.id && (n.id = e.id), t.dataset && (n.dataset = ge(e)), t.rect || t.size) {
		const i = e.getBoundingClientRect();
		t.rect && (n.left = i.left, n.right = i.right, n.top = i.top - o - r, n.bottom = i.bottom - o - r), t.size && (n.width = i.width, n.height = i.height)
	}
	if (P(t.properties) && t.properties.forEach((e => {
		e = e.replace(/-([a-z])/g, (function (e, t) {
			return t.toUpperCase()
		}))
	})), t.scrollOffset) if ("UNI-SCROLL-VIEW" === e.tagName) {
		const t = e.children[0].children[0];
		n.scrollLeft = t.scrollLeft, n.scrollTop = t.scrollTop, n.scrollHeight = t.scrollHeight, n.scrollWidth = t.scrollWidth
	} else n.scrollLeft = 0, n.scrollTop = 0, n.scrollHeight = 0, n.scrollWidth = 0;
	if (P(t.computedStyle)) {
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
			}(t, e), s = i.parentElement;
			if (!s) return o ? null : [];
			const {nodeType: a} = i, l = 3 === a || 8 === a;
			if (o) {
				const e = l ? s.querySelector(n) : Pu(i, n) ? i : i.querySelector(n);
				return e ? Bu(e, r) : null
			}
			{
				let e = [];
				const t = (l ? s : i).querySelectorAll(n);
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
	return !P(e) || 0 === e.length || e.find((e => -1 === t.indexOf(e))) ? t : e
}

function Nu(e) {
	return function () {
		try {
			return e.apply(e, arguments)
		} catch (t) {
			console.error(t)
		}
	}
}

let Ru = 1;
const Du = {};

function Hu(e, t, n) {
	if ("number" == typeof e) {
		const o = Du[e];
		if (o) return o.keepAlive || delete Du[e], o.callback(t, n)
	}
	return t
}

const zu = "success", qu = "fail", Vu = "complete";

function Wu(e, t = {}, {beforeAll: n, beforeSuccess: o} = {}) {
	z(t) || (t = {});
	const {success: r, fail: i, complete: s} = function (e) {
		const t = {};
		for (const n in e) {
			const o = e[n];
			M(o) && (t[n] = Nu(o), delete e[n])
		}
		return t
	}(t), a = M(r), l = M(i), c = M(s), u = Ru++;
	return function (e, t, n, o = !1) {
		Du[e] = {name: t, keepAlive: o, callback: n}
	}(u, e, (u => {
		(u = u || {}).errMsg = function (e, t) {
			return e && -1 !== e.indexOf(":fail") ? t + e.substring(e.indexOf(":fail")) : t + ":ok"
		}(u.errMsg, e), M(n) && n(u), u.errMsg === e + ":ok" ? (M(o) && o(u, t), a && r(u)) : l && i(u), c && s(u)
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
			if (R(e) && (o = Promise.resolve(e)), !1 === e) return {
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
		if (!P(o)) return;
		const r = t[n];
		t[n] = function (e) {
			Gu(o, e, t).then((e => M(r) && r(e) || e))
		}
	})), t
}

function Zu(e, t) {
	const n = [];
	P(Xu.returnValue) && n.push(...Xu.returnValue);
	const o = Yu[e];
	return o && P(o.returnValue) && n.push(...o.returnValue), n.forEach((e => {
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
		if (P(r.invoke)) {
			return Gu(r.invoke, n).then((n => t(Ku(ed(e), n), ...o)))
		}
		return t(Ku(r, n), ...o)
	}
	return t(n, ...o)
}

function nd(e, t) {
	return (n = {}, ...o) => function (e) {
		return !(!z(e) || ![zu, qu, Vu].find((t => M(e[t]))))
	}(n) ? Zu(e, td(e, t, n, o)) : Zu(e, new Promise(((r, i) => {
		td(e, t, k(n, {success: r, fail: i}), o)
	})))
}

function od(e, t, n, o) {
	return Hu(e, k({errMsg: t + ":fail" + (n ? " " + n : "")}, o))
}

function rd(e, t, n, o) {
	if (o && o.beforeInvoke) {
		const e = o.beforeInvoke(t);
		if (F(e)) return e
	}
	const r = function (e, t) {
		const n = e[0];
		if (!t || !z(t.formatArgs) && z(n)) return;
		const o = t.formatArgs, r = Object.keys(o);
		for (let i = 0; i < r.length; i++) {
			const t = r[i], s = o[t];
			if (M(s)) {
				const o = s(e[0][t], n);
				if (F(o)) return o
			} else B(n, t) || (n[t] = s)
		}
	}(t, o);
	if (r) return r
}

function id(e, t, n, o) {
	return n => {
		const r = Wu(e, n, o), i = rd(0, [n], 0, o);
		return i ? od(r, e, i) : t(n, {
			resolve: t => function (e, t, n) {
				return Hu(e, k(n || {}, {errMsg: t + ":ok"}))
			}(r, e, t), reject: (t, n) => od(r, e, function (e) {
				return !e || F(e) ? e : e.stack ? (console.error(e.message + "\n" + e.stack), e.message) : e
			}(t), n)
		})
	}
}

function sd(e, t, n, o) {
	return nd(e, id(e, t, 0, o))
}

function ad(e, t, n, o) {
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

const vd = ad(0, ((e, t) => {
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
		M(t[n]) && (e[n] = function (e, t) {
			const n = t ? e ? e.concat(t) : P(t) ? t : [t] : e;
			return n ? function (e) {
				const t = [];
				for (let n = 0; n < e.length; n++) -1 === t.indexOf(e[n]) && t.push(e[n]);
				return t
			}(n) : n
		}(e[n], t[n]))
	}))
}

const yd = ad(0, ((e, t) => {
	F(e) && z(t) ? bd(Yu[e] || (Yu[e] = {}), t) : z(e) && bd(Xu, e)
})), _d = new Oe, wd = ad(0, ((e, t) => (_d.on(e, t), () => _d.off(e, t)))), xd = ad(0, ((e, t) => {
	e ? (P(e) || (e = [e]), e.forEach((e => _d.off(e, t)))) : _d.e = {}
})), Td = ad(0, ((e, ...t) => {
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

const kd = ad(0, ((e, t) => new Ed(e, gc(t || _c())))), Ad = (e, t, n, o) => {
	!function (e, t, n, o, r) {
		dv.invokeViewMethod("map." + e, {type: n, data: o}, t, r)
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
	if (B(Cd, n)) {
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

class Nd {
	constructor(e, t) {
		this._pageId = gc(e), this._component = e, this._options = k({}, Id, t)
	}

	relativeTo(e, t) {
		return this._options.relativeToSelector = e, this._options.rootMargin = jd(t), this
	}

	relativeToViewport(e) {
		return this._options.relativeToSelector = void 0, this._options.rootMargin = jd(e), this
	}

	observe(e, t) {
		M(t) && (this._options.selector = e, this._reqId = Fd++, function ({reqId: e, component: t, options: n, callback: o}, r) {
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

					function s(e, t) {
						var n = t || {};
						if ("function" != typeof e) throw new Error("callback must be a function");
						if (n.root && 1 != n.root.nodeType && 9 != n.root.nodeType) throw new Error("root must be a Document or Element");
						this._checkForIntersections = l(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = e, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(n.rootMargin), this.thresholds = this._initThresholds(n.threshold), this.root = n.root || null, this.rootMargin = this._rootMarginValues.map((function (e) {
							return e.value + e.unit
						})).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = []
					}

					function a() {
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
							i = Math.min(e.right, t.right), s = i - r, a = o - n;
						return s >= 0 && a >= 0 && {top: n, bottom: o, left: r, right: i, width: s, height: a} || null
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

					s.prototype.THROTTLE_TIMEOUT = 100, s.prototype.POLL_INTERVAL = null, s.prototype.USE_MUTATION_OBSERVER = !0, s._setupCrossOriginUpdater = function () {
						return o || (o = function (e, t) {
							r = e && t ? m(e, t) : f(), n.forEach((function (e) {
								e._checkForIntersections()
							}))
						}), o
					}, s._resetCrossOriginUpdater = function () {
						o = null, r = null
					}, s.prototype.observe = function (e) {
						if (!this._observationTargets.some((function (t) {
							return t.element == e
						}))) {
							if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
							this._registerInstance(), this._observationTargets.push({
								element: e,
								entry: null
							}), this._monitorIntersections(e.ownerDocument), this._checkForIntersections()
						}
					}, s.prototype.unobserve = function (e) {
						this._observationTargets = this._observationTargets.filter((function (t) {
							return t.element != e
						})), this._unmonitorIntersections(e.ownerDocument), 0 == this._observationTargets.length && this._unregisterInstance()
					}, s.prototype.disconnect = function () {
						this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance()
					}, s.prototype.takeRecords = function () {
						var e = this._queuedEntries.slice();
						return this._queuedEntries = [], e
					}, s.prototype._initThresholds = function (e) {
						var t = e || [0];
						return Array.isArray(t) || (t = [t]), t.sort().filter((function (e, t, n) {
							if ("number" != typeof e || isNaN(e) || e < 0 || e > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
							return e !== n[t - 1]
						}))
					}, s.prototype._parseRootMargin = function (e) {
						var t = (e || "0px").split(/\s+/).map((function (e) {
							var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
							if (!t) throw new Error("rootMargin must be specified in pixels or percent");
							return {value: parseFloat(t[1]), unit: t[2]}
						}));
						return t[1] = t[1] || t[0], t[2] = t[2] || t[0], t[3] = t[3] || t[1], t
					}, s.prototype._monitorIntersections = function (n) {
						var o = n.defaultView;
						if (o && -1 == this._monitoringDocuments.indexOf(n)) {
							var r = this._checkForIntersections, i = null, s = null;
							this.POLL_INTERVAL ? i = o.setInterval(r, this.POLL_INTERVAL) : (c(o, "resize", r, !0), c(n, "scroll", r, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in o && (s = new o.MutationObserver(r)).observe(n, {
								attributes: !0,
								childList: !0,
								characterData: !0,
								subtree: !0
							})), this._monitoringDocuments.push(n), this._monitoringUnsubscribes.push((function () {
								var e = n.defaultView;
								e && (i && e.clearInterval(i), u(e, "resize", r, !0)), u(n, "scroll", r, !0), s && s.disconnect()
							}));
							var a = this.root && (this.root.ownerDocument || this.root) || t;
							if (n != a) {
								var l = e(n);
								l && this._monitorIntersections(l.ownerDocument)
							}
						}
					}, s.prototype._unmonitorIntersections = function (n) {
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
									var s = e(n);
									s && this._unmonitorIntersections(s.ownerDocument)
								}
							}
						}
					}, s.prototype._unmonitorAllIntersections = function () {
						var e = this._monitoringUnsubscribes.slice(0);
						this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
						for (var t = 0; t < e.length; t++) e[t]()
					}, s.prototype._checkForIntersections = function () {
						if (this.root || !o || r) {
							var e = this._rootIsInDom(), t = e ? this._getRootRect() : f();
							this._observationTargets.forEach((function (n) {
								var r = n.element, s = p(r), l = this._rootContainsTarget(r), c = n.entry,
									u = e && l && this._computeTargetAndRootIntersection(r, s, t), d = null;
								this._rootContainsTarget(r) ? o && !this.root || (d = t) : d = f();
								var h = n.entry = new i({
									time: a(),
									target: r,
									boundingClientRect: s,
									rootBounds: d,
									intersectionRect: u
								});
								c ? e && l ? this._hasCrossedThreshold(c, h) && this._queuedEntries.push(h) : c && c.isIntersecting && this._queuedEntries.push(h) : this._queuedEntries.push(h)
							}), this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
						}
					}, s.prototype._computeTargetAndRootIntersection = function (e, n, i) {
						if ("none" != window.getComputedStyle(e).display) {
							for (var s = n, a = v(e), l = !1; !l && a;) {
								var c = null, u = 1 == a.nodeType ? window.getComputedStyle(a) : {};
								if ("none" == u.display) return null;
								if (a == this.root || 9 == a.nodeType) if (l = !0, a == this.root || a == t) o && !this.root ? !r || 0 == r.width && 0 == r.height ? (a = null, c = null, s = null) : c = r : c = i; else {
									var f = v(a), h = f && p(f),
										g = f && this._computeTargetAndRootIntersection(f, h, i);
									h && g ? (a = f, c = m(h, g)) : (a = null, s = null)
								} else {
									var b = a.ownerDocument;
									a != b.body && a != b.documentElement && "visible" != u.overflow && (c = p(a))
								}
								if (c && (s = d(c, s)), !s) break;
								a = a && v(a)
							}
							return s
						}
					}, s.prototype._getRootRect = function () {
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
					}, s.prototype._expandRectByRootMargin = function (e) {
						var t = this._rootMarginValues.map((function (t, n) {
							return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e.height) / 100
						})), n = {
							top: e.top - t[0],
							right: e.right + t[1],
							bottom: e.bottom + t[2],
							left: e.left - t[3]
						};
						return n.width = n.right - n.left, n.height = n.bottom - n.top, n
					}, s.prototype._hasCrossedThreshold = function (e, t) {
						var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
							o = t.isIntersecting ? t.intersectionRatio || 0 : -1;
						if (n !== o) for (var r = 0; r < this.thresholds.length; r++) {
							var i = this.thresholds[r];
							if (i == n || i == o || i < n != i < o) return !0
						}
					}, s.prototype._rootIsInDom = function () {
						return !this.root || g(t, this.root)
					}, s.prototype._rootContainsTarget = function (e) {
						var n = this.root && (this.root.ownerDocument || this.root) || t;
						return g(n, e) && (!this.root || n == e.ownerDocument)
					}, s.prototype._registerInstance = function () {
						n.indexOf(this) < 0 && n.push(this)
					}, s.prototype._unregisterInstance = function () {
						var e = n.indexOf(this);
						-1 != e && n.splice(e, 1)
					}, window.IntersectionObserver = s, window.IntersectionObserverEntry = i
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
								dataset: ge(e.target),
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

const Rd = ad(0, ((e, t) => ((e = se(e)) && !gc(e) && (t = e, e = null), new Nd(e || _c(), t))));
let Dd = 0, Hd = {};

function zd(e, t, n, o) {
	const r = {options: o}, i = o && ("success" in o || "fail" in o || "complete" in o);
	if (i) {
		const e = String(Dd++);
		r.callbackId = e, Hd[e] = o
	}
	dv.invokeViewMethod(`editor.${e}`, {type: n, data: r}, t, (({callbackId: e, data: t}) => {
		i && (!function (e, t) {
			e = e || {}, F(t) && (t = {errMsg: t}), /:ok$/.test(t.errMsg) ? M(e.success) && e.success(t) : M(e.fail) && e.fail(t), M(e.complete) && e.complete(t)
		}(Hd[e], t), delete Hd[e])
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
				dv.invokeViewMethod(`canvas.${e}`, {type: n, data: o}, t, (e => {
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
				var o = n[1].trim().split(/\s/), r = parseFloat(n[3]), i = n[7], s = [];
				o.forEach((function (e, n) {
					["italic", "oblique", "normal"].indexOf(e) > -1 ? (s.push({
						method: "setFontStyle",
						data: [e]
					}), t.state.fontStyle = e) : ["bold", "normal"].indexOf(e) > -1 ? (s.push({
						method: "setFontWeight",
						data: [e]
					}), t.state.fontWeight = e) : 0 === n ? (s.push({
						method: "setFontStyle",
						data: ["normal"]
					}), t.state.fontStyle = "normal") : 1 === n && a()
				})), 1 === o.length && a(), o = s.map((function (e) {
					return e.data[0]
				})).join(" "), this.state.fontSize = r, this.state.fontFamily = i, this.actions.push({
					method: "setFont",
					data: [`${o} ${r}px ${i}`]
				})
			} else console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");

			function a() {
				s.push({method: "setFontWeight", data: ["normal"]}), t.state.fontWeight = "normal"
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
			zd(this.id, this.pageId, e, t)
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
				P(e) ? e.forEach(Vd) : Vd(e);
				const o = n[t];
				M(o) && o.call(this, e)
			})), M(e) && e.call(this, t)
		})), this._nodesRef
	}

	in(e) {
		return this._component = se(e), this
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

const Qd = ad(0, (e => ((e = se(e)) && !gc(e) && (e = null), new $d(e || _c())))), Ud = ad(0, (() => {
	const e = um();
	return e && e.$vm ? e.$vm.$locale : Tl().getLocale()
})), Xd = ad(0, (e => {
	const t = um();
	if (!t) return !1;
	return t.$vm.$locale !== e && (t.$vm.$locale = e, navigator.cookieEnabled && window.localStorage && (localStorage.UNI_LOCALE = e), dv.invokeOnCallback("onLocaleChange", {locale: e}), !0)
})), Yd = {onUnhandledRejection: [], onPageNotFound: [], onError: [], onShow: [], onHide: []};
const Jd = ad(0, (() => k({}, Bp))), Gd = {
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
			t.urls = e.map((e => F(e) && e ? gu(e) : ""))
		}, current(e, t) {
			"number" == typeof e ? t.current = e > 0 && e < t.urls.length ? e : 0 : F(e) && e && (t.current = gu(e))
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
			t.method === Mu[0] && z(t.data) && Object.keys(t.data).length && (t.url = function (e, t) {
				let n = e.split("#");
				const o = n[1] || "";
				n = n[0].split("?");
				let r = n[1] || "";
				e = n[0];
				const i = r.split("&").filter((e => e)), s = {};
				i.forEach((e => {
					const t = e.split("=");
					s[t[0]] = t[1]
				}));
				for (const a in t) if (B(t, a)) {
					let e = t[a];
					null == e ? e = "" : z(e) && (e = JSON.stringify(e)), s[rp(a)] = rp(e)
				}
				return r = Object.keys(s).map((e => `${e}=${s[e]}`)).join("&"), e + (r ? "?" + r : "") + (o ? "#" + o : "")
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
}, sp = {
	formatArgs: {
		header(e, t) {
			t.header = e || {}
		}
	}
}, ap = {
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
			if (!F(e)) return e;
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
	const {bottom: t, height: n, left: o, right: r, top: i, width: s} = e || {};
	return {bottom: t, height: n, left: o, right: r, top: i, width: s}
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
		const s = new Uint8Array(i);
		for (; i--;) s[i] = r.charCodeAt(i);
		return kp(s, o)
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
	for (const n in Sp) if (B(Sp, n)) {
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
		const n = rn(null), o = function (e) {
			return () => {
				const {firstElementChild: t, lastElementChild: n} = e.value;
				t.scrollLeft = 1e5, t.scrollTop = 1e5, n.scrollLeft = 1e5, n.scrollTop = 1e5
			}
		}(n), r = function (e, t, n) {
			const o = Wt({width: -1, height: -1});
			return Zn((() => k({}, o)), (e => t("resize", e))), () => {
				const t = e.value;
				o.width = t.offsetWidth, o.height = t.offsetHeight, n()
			}
		}(n, t, o);
		return function (e, t, n, o) {
			To(o), Fo((() => {
				t.initial && Cn(n);
				const r = e.value;
				r.offsetParent !== r.parentElement && (r.parentElement.style.position = "relative"), "AnimationEvent" in window || o()
			}))
		}(n, e, r, o), () => ei("uni-resize-sensor", {
			ref: n,
			onAnimationstartOnce: r
		}, [ei("div", {onScroll: r}, [ei("div", null, null)], 40, ["onScroll"]), ei("div", {onScroll: r}, [ei("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"])
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
		const t = wi((() => 0 === String(navigator.vendor).indexOf("Apple")));
		e.addEventListener("focus", (() => {
			clearTimeout(undefined), document.addEventListener("click", Op, !1)
		}));
		e.addEventListener("blur", (() => {
			t.value && e.blur(), document.removeEventListener("click", Op, !1), t.value && document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop)
		}))
	}

	Zn((() => t.value), (e => e && o(e)))
}

var Fp = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
	jp = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
	Np = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
	Rp = Wp("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
	Dp = Wp("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
	Hp = Wp("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
	zp = Wp("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
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
			const n = rn(null), o = function (e, t) {
				const n = rn(""), o = wi((() => {
					let e = "auto", o = "";
					const r = Up[t.mode];
					return r ? (r[0] && (o = r[0]), r[1] && (e = r[1])) : (o = "0% 0%", e = "100% 100%"), `background-image:${n.value ? 'url("' + n.value + '")' : "none"};background-position:${o};background-size:${e};`
				})), r = Wt({
					rootEl: e,
					src: wi((() => t.src ? gu(t.src) : "")),
					origWidth: 0,
					origHeight: 0,
					origStyle: {width: "", height: ""},
					modeStyle: o,
					imgSrc: n
				});
				return Fo((() => {
					const t = e.value.style;
					r.origWidth = Number(t.width) || 0, r.origHeight = Number(t.height) || 0
				})), r
			}(n, e), r = lu(n, t), {fixSize: i} = function (e, t, n) {
				const o = () => {
					const {mode: o} = t, r = Qp[o];
					if (!r) return;
					const {origWidth: i, origHeight: s} = n, a = i && s ? i / s : 0;
					if (!a) return;
					const l = e.value, c = l[r[0]];
					c && (l.style[r[1]] = function (e) {
						Yp && e > 10 && (e = 2 * Math.round(e / 2));
						return e
					}(r[2](c, a)) + "px")
				}, r = () => {
					const {style: t} = e.value, {origStyle: {width: o, height: r}} = n;
					t.width = o, t.height = r
				};
				return Zn((() => t.mode), ((e, t) => {
					Qp[t] && r(), Qp[e] && o()
				})), {fixSize: o, resetSize: r}
			}(n, e, o);
			return function (e, t, n, o, r) {
				let i, s;
				const a = (t = 0, n = 0, o = "") => {
					e.origWidth = t, e.origHeight = n, e.imgSrc = o
				}, l = l => {
					if (!l) return c(), void a();
					i = i || new Image, i.onload = e => {
						const {width: u, height: d} = i;
						a(u, d, l), o(), i.draggable = t.draggable, s && s.remove(), s = i, n.value.appendChild(i), c(), r("load", e, {
							width: u,
							height: d
						})
					}, i.onerror = t => {
						a(), c(), r("error", t, {errMsg: `GET ${e.src} 404 (Not Found)`})
					}, i.src = l
				}, c = () => {
					i && (i.onload = null, i.onerror = null, i = null)
				};
				Zn((() => e.src), (e => l(e))), Zn((() => e.imgSrc), (e => {
					!e && s && (s.remove(), s = null)
				})), Fo((() => l(e.src))), Ro((() => c()))
			}(o, e, n, i, r), () => ei("uni-image", {ref: n}, [ei("div", {style: o.modeStyle}, null, 4), Qp[e.mode] ? ei(Lp, {onResize: i}, null, 8, ["onResize"]) : ei("span", null, null)], 512)
		}
	});
const Yp = "Google Inc." === navigator.vendor;
const Jp = be(!0), Gp = [];
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
	const e = Wt({userAction: !1});
	return Fo((() => {
		tf(e)
	})), Ro((() => {
		!function (e) {
			const t = Gp.indexOf(e);
			t >= 0 && Gp.splice(t, 1)
		}(e)
	})), {state: e}
}

function rf() {
	const e = Wt({attrs: {}});
	return Fo((() => {
		let t = pi();
		for (; t;) {
			const n = t.type.__scopeId;
			n && (e.attrs[n] = ""), t = t.proxy && "page" === t.proxy.$mpType ? null : t.parent
		}
	})), {state: e}
}

function sf(e, t) {
	const n = document.activeElement;
	if (!n) return t({});
	const o = {};
	["input", "textarea"].includes(n.tagName.toLowerCase()) && (o.start = n.selectionStart, o.end = n.selectionEnd), t(o)
}

function af(e, t) {
	return "number" === t && isNaN(Number(e)) && (e = ""), null === e ? "" : String(e)
}

const lf = ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"], cf = k({}, {
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
	const r = Se((n => {
		t.value = af(n, e.type)
	}), 100, {setTimeout: setTimeout, clearTimeout: clearTimeout});
	Zn((() => e.modelValue), r), Zn((() => e.value), r);
	const i = function (e, t) {
		let n, o, r = 0;
		const i = function (...i) {
			const s = Date.now();
			clearTimeout(n), o = () => {
				o = null, r = s, e.apply(this, i)
			}, s - r < t ? n = setTimeout(o, t - (s - r)) : o()
		};
		return i.cancel = function () {
			clearTimeout(n), o = null
		}, i.flush = function () {
			clearTimeout(n), o && o()
		}, i
	}(((e, t) => {
		r.cancel(), n("update:modelValue", t.value), n("update:value", t.value), o("input", e, t)
	}), 100);
	return Mo((() => {
		r.cancel(), i.cancel()
	})), {
		trigger: o, triggerInput: (e, t, n) => {
			r.cancel(), i(e, t), n && i.flush()
		}
	}
}

function pf(e, t) {
	of();
	const n = wi((() => e.autoFocus || e.focus));

	function o() {
		if (!n.value) return;
		const e = t.value;
		e ? e.focus() : setTimeout(o, 100)
	}

	Zn((() => e.focus), (e => {
		e ? o() : function () {
			const e = t.value;
			e && e.blur()
		}()
	})), Fo((() => {
		n.value && Cn(o)
	}))
}

function ff(e, t, n, o) {
	Ml(yc(), "getSelectedTextRange", sf);
	const {fieldRef: r, state: i, trigger: s} = function (e, t, n) {
		const o = rn(null), r = lu(t, n), i = wi((() => {
			const t = Number(e.selectionStart);
			return isNaN(t) ? -1 : t
		})), s = wi((() => {
			const t = Number(e.selectionEnd);
			return isNaN(t) ? -1 : t
		})), a = wi((() => {
			const t = Number(e.cursor);
			return isNaN(t) ? -1 : t
		})), l = wi((() => {
			var t = Number(e.maxlength);
			return isNaN(t) ? 140 : t
		})), c = af(e.modelValue, e.type) || af(e.value, e.type), u = Wt({
			value: c,
			valueOrigin: c,
			maxlength: l,
			focus: e.focus,
			composing: !1,
			selectionStart: i,
			selectionEnd: s,
			cursor: a
		});
		return Zn((() => u.focus), (e => n("update:focus", e))), Zn((() => u.maxlength), (e => u.value = u.value.slice(0, e))), {
			fieldRef: o,
			state: u,
			trigger: r
		}
	}(e, t, n), {triggerInput: a} = df(e, i, n, s);
	pf(e, r), Mp(0, r);
	const {state: l} = rf();
	!function (e, t) {
		const n = Jn(cu, !1);
		if (!n) return;
		const o = pi(), r = {
			submit() {
				const n = o.proxy;
				return [n[e], F(t) ? n[t] : t.value]
			}, reset() {
				F(t) ? o.proxy[t] = "" : t.value = ""
			}
		};
		n.addField(r), Ro((() => {
			n.removeField(r)
		}))
	}("name", i), function (e, t, n, o, r, i) {
		function s() {
			const n = e.value;
			n && t.focus && t.selectionStart > -1 && t.selectionEnd > -1 && "number" !== n.type && (n.selectionStart = t.selectionStart, n.selectionEnd = t.selectionEnd)
		}

		function a() {
			const n = e.value;
			n && t.focus && t.selectionStart < 0 && t.selectionEnd < 0 && t.cursor > -1 && "number" !== n.type && (n.selectionEnd = n.selectionStart = t.cursor)
		}

		function l(e) {
			return "number" === e.type ? null : e.selectionEnd
		}

		Zn([() => t.selectionStart, () => t.selectionEnd], s), Zn((() => t.cursor), a), Zn((() => e.value), (function () {
			const c = e.value;
			if (!c) return;
			const u = function (e, o) {
				e.stopPropagation(), M(i) && !1 === i(e, t) || (t.value = c.value, t.composing && n.ignoreCompositionEvent || r(e, {
					value: c.value,
					cursor: l(c)
				}, o))
			};

			function d(e) {
				n.ignoreCompositionEvent || o(e.type, e, {value: e.data})
			}

			c.addEventListener("change", (e => e.stopPropagation())), c.addEventListener("focus", (function (e) {
				t.focus = !0, o("focus", e, {value: t.value}), s(), a()
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
	}(r, i, e, s, a, o);
	return {
		fieldRef: r,
		state: i,
		scopedAttrsState: l,
		fixDisabledColor: 0 === String(navigator.vendor).indexOf("Apple") && CSS.supports("image-orientation:from-image"),
		trigger: s
	}
}

const hf = nu({
	name: "Input",
	props: k({}, cf, {
		placeholderClass: {type: String, default: "input-placeholder"},
		textContentType: {type: String, default: ""}
	}),
	emits: ["confirm", ...uf],
	setup(e, {emit: t}) {
		const n = ["text", "number", "idcard", "digit", "password", "tel"], o = ["off", "one-time-code"],
			r = wi((() => {
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
			})), i = wi((() => {
				const t = o.indexOf(e.textContentType), n = o.indexOf(X(e.textContentType));
				return o[-1 !== t ? t : -1 !== n ? n : 0]
			}));
		let s, a = rn("");
		const l = rn(null), {fieldRef: c, state: u, scopedAttrsState: d, fixDisabledColor: p, trigger: f} = ff(e, l, t, ((e, t) => {
			const n = e.target;
			if ("number" === r.value) {
				if (s && (n.removeEventListener("blur", s), s = null), n.validity && !n.validity.valid) {
					if ((!a.value || !n.value) && "-" === e.data || "-" === a.value[0] && "deleteContentBackward" === e.inputType) return a.value = "-", t.value = "", s = () => {
						a.value = n.value = ""
					}, n.addEventListener("blur", s), !1;
					if (a.value) if (-1 !== a.value.indexOf(".")) {
						if ("." !== e.data && "deleteContentBackward" === e.inputType) {
							const e = a.value.indexOf(".");
							return a.value = n.value = t.value = a.value.slice(0, e), !0
						}
					} else if ("." === e.data) return a.value += ".", s = () => {
						a.value = n.value = a.value.slice(0, -1)
					}, n.addEventListener("blur", s), !1;
					return a.value = t.value = n.value = "-" === a.value ? "" : a.value, !1
				}
				a.value = n.value;
				const o = t.maxlength;
				if (o > 0 && n.value.length > o) return n.value = n.value.slice(0, o), t.value = n.value, !1
			}
		}));
		Zn((() => u.value), (t => {
			"number" !== e.type || "-" === a.value && "" === t || (a.value = t)
		}));
		const h = ["number", "digit"], m = wi((() => h.includes(e.type) ? e.step : ""));

		function g(t) {
			if ("Enter" !== t.key) return;
			const n = t.target;
			t.stopPropagation(), f("confirm", t, {value: n.value}), !e.confirmHold && n.blur()
		}

		return () => {
			let t = e.disabled && p ? ei("input", {
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
			}, null, 40, ["value", "readonly", "type", "maxlength", "step", "onFocus"]) : Wo(ei("input", {
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
			}, null, 40, ["onUpdate:modelValue", "disabled", "type", "maxlength", "step", "enterkeyhint", "pattern", "autocomplete", "onKeyup", "inputmode"]), [[ys, u.value]]);
			return ei("uni-input", {ref: l}, [ei("div", {class: "uni-input-wrapper"}, [Wo(ei("div", ai(d.attrs, {
				style: e.placeholderStyle,
				class: ["uni-input-placeholder", e.placeholderClass]
			}), [e.placeholder], 16), [[Ss, !(u.value.length || "-" === a.value)]]), "search" === e.confirmType ? ei("form", {
				action: "",
				onSubmit: e => e.preventDefault(),
				class: "uni-input-form"
			}, [t], 40, ["onSubmit"]) : t])], 512)
		}
	}
});
const mf = ["class", "style"], gf = /^on[A-Z]+/, vf = (e = {}) => {
	const {excludeListeners: t = !1, excludeKeys: n = []} = e, o = pi(), r = sn({}), i = sn({}), s = sn({}),
		a = n.concat(mf);
	return o.attrs = Wt(o.attrs), Gn((() => {
		const e = (n = o.attrs, Object.keys(n).map((e => [e, n[e]]))).reduce(((e, [n, o]) => (a.includes(n) ? e.exclude[n] = o : gf.test(n) ? (t || (e.attrs[n] = o), e.listeners[n] = o) : e.attrs[n] = o, e)), {
			exclude: {},
			attrs: {},
			listeners: {}
		});
		var n;
		r.value = e.attrs, i.value = e.listeners, s.value = e.exclude
	})), {$attrs: r, $listeners: i, $excludeAttrs: s}
};

function bf(e) {
	const t = [];
	return P(e) && e.forEach((e => {
		Xr(e) ? e.type === jr ? t.push(...bf(e.children)) : t.push(e) : P(e) && t.push(...bf(e))
	})), t
}

const yf = nu({
	inheritAttrs: !1, name: "MovableArea", props: {scaleArea: {type: Boolean, default: !1}}, setup(e, {slots: t}) {
		const n = rn(null), o = rn(!1);
		let {setContexts: r, events: i} = function (e, t) {
			const n = rn(0), o = rn(0), r = Wt({x: null, y: null}), i = rn(null);
			let s = null, a = [];

			function l(t) {
				t && 1 !== t && (e.scaleArea ? a.forEach((function (e) {
					e._setScale(t)
				})) : s && s._setScale(t))
			}

			function c(e, n = a) {
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

			const u = au((t => {
				let n = t.touches;
				if (n && n.length > 1) {
					let t = {x: n[1].pageX - n[0].pageX, y: n[1].pageY - n[0].pageY};
					if (i.value = _f(t), r.x = t.x, r.y = t.y, !e.scaleArea) {
						let e = c(n[0].target), t = c(n[1].target);
						s = e && e === t ? e : null
					}
				}
			})), d = au((e => {
				let t = e.touches;
				if (t && t.length > 1) {
					e.preventDefault();
					let n = {x: t[1].pageX - t[0].pageX, y: t[1].pageY - t[0].pageY};
					if (null !== r.x && i.value && i.value > 0) {
						l(_f(n) / i.value)
					}
					r.x = n.x, r.y = n.y
				}
			})), p = au((t => {
				let n = t.touches;
				n && n.length || t.changedTouches && (r.x = 0, r.y = 0, i.value = null, e.scaleArea ? a.forEach((function (e) {
					e._endScale()
				})) : s && s._endScale())
			}));

			function f() {
				h(), a.forEach((function (e, t) {
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

			return Yn("movableAreaWidth", n), Yn("movableAreaHeight", o), {
				setContexts(e) {
					a = e
				}, events: {_onTouchstart: u, _onTouchmove: d, _onTouchend: p, _resize: f}
			}
		}(e, n);
		const {$listeners: s, $attrs: a, $excludeAttrs: l} = vf(), c = s.value;
		["onTouchstart", "onTouchmove", "onTouchend"].forEach((e => {
			let t = c[e], n = i[`_${e}`];
			c[e] = t ? [].concat(t, n) : n
		})), Fo((() => {
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
				o && e.push(Kt(o))
			}
			r(e)
		}

		return Yn("_isMounted", o), Yn("movableAreaRootRef", n), Yn("addMovableViewContext", (e => {
			d.push(e), p()
		})), Yn("removeMovableViewContext", (e => {
			const t = d.indexOf(e);
			t >= 0 && (d.splice(t, 1), p())
		})), () => {
			const e = t.default && t.default();
			return u = bf(e), ei("uni-movable-area", ai({ref: n}, a.value, l.value, c), [ei(Lp, {onResize: i._resize}, null, 8, ["onResize"]), u], 16)
		}
	}
});

function _f(e) {
	return Math.sqrt(e.x * e.x + e.y * e.y)
}

const wf = function (e, t, n, o) {
	e.addEventListener(t, (e => {
		M(n) && !1 === n(e) && ((void 0 === e.cancelable || e.cancelable) && e.preventDefault(), e.stopPropagation())
	}), {passive: !1})
};
let xf, Tf;

function Sf(e, t, n) {
	Ro((() => {
		document.removeEventListener("mousemove", xf), document.removeEventListener("mouseup", Tf)
	}));
	let o = 0, r = 0, i = 0, s = 0;
	const a = function (e, n, a, l) {
		if (!1 === t({
			cancelable: e.cancelable,
			target: e.target,
			currentTarget: e.currentTarget,
			preventDefault: e.preventDefault.bind(e),
			stopPropagation: e.stopPropagation.bind(e),
			touches: e.touches,
			changedTouches: e.changedTouches,
			detail: {state: n, x: a, y: l, dx: a - o, dy: l - r, ddx: a - i, ddy: l - s, timeStamp: e.timeStamp}
		})) return !1
	};
	let l, c, u = null;
	wf(e, "touchstart", (function (e) {
		if (l = !0, 1 === e.touches.length && !u) return u = e, o = i = e.touches[0].pageX, r = s = e.touches[0].pageY, a(e, "start", o, r)
	})), wf(e, "mousedown", (function (e) {
		if (c = !0, !l && !u) return u = e, o = i = e.pageX, r = s = e.pageY, a(e, "start", o, r)
	})), wf(e, "touchmove", (function (e) {
		if (1 === e.touches.length && u) {
			const t = a(e, "move", e.touches[0].pageX, e.touches[0].pageY);
			return i = e.touches[0].pageX, s = e.touches[0].pageY, t
		}
	}));
	const d = xf = function (e) {
		if (!l && c && u) {
			const t = a(e, "move", e.pageX, e.pageY);
			return i = e.pageX, s = e.pageY, t
		}
	};
	document.addEventListener("mousemove", d), wf(e, "touchend", (function (e) {
		if (0 === e.touches.length && u) return l = !1, u = null, a(e, "end", e.changedTouches[0].pageX, e.changedTouches[0].pageY)
	}));
	const p = Tf = function (e) {
		if (c = !1, !l && u) return u = null, a(e, "end", e.pageX, e.pageY)
	};
	document.addEventListener("mouseup", p), wf(e, "touchcancel", (function (e) {
		if (u) {
			l = !1;
			const t = u;
			return u = null, a(e, n ? "cancel" : "end", t.touches[0].pageX, t.touches[0].pageY)
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
		const r = -n / (2 * o), i = e, s = t / (r * e);
		return {
			x: function (e) {
				return (i + s * e) * Math.pow(Math.E, r * e)
			}, dx: function (e) {
				const t = Math.pow(Math.E, r * e);
				return r * (i + s * e) * t + s * t
			}
		}
	}
	if (i > 0) {
		const r = (-n - Math.sqrt(i)) / (2 * o), s = (-n + Math.sqrt(i)) / (2 * o), a = (t - r * e) / (s - r),
			l = e - a;
		return {
			x: function (e) {
				let t, n;
				return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s * e)), l * t + a * n
			}, dx: function (e) {
				let t, n;
				return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s * e)), l * r * t + a * s * n
			}
		}
	}
	const s = Math.sqrt(4 * o * r - n * n) / (2 * o), a = -n / 2 * o, l = e, c = (t - a * e) / s;
	return {
		x: function (e) {
			return Math.pow(Math.E, a * e) * (l * Math.cos(s * e) + c * Math.sin(s * e))
		}, dx: function (e) {
			const t = Math.pow(Math.E, a * e), n = Math.cos(s * e), o = Math.sin(s * e);
			return t * (c * s * n - l * s * o) + a * t * (c * o + l * n)
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
		const o = rn(null), r = lu(o, n), {setParent: i} = function (e, t, n) {
			const o = Jn("_isMounted", rn(!1)), r = Jn("addMovableViewContext", (() => {
			})), i = Jn("removeMovableViewContext", (() => {
			}));
			let s, a, l = rn(1), c = rn(1), u = rn(!1), d = rn(0), p = rn(0), f = null, h = null, m = !1, g = null,
				v = null;
			const b = new Af, y = new Af, _ = {historyX: [0, 0], historyY: [0, 0], historyT: [0, 0]}, w = wi((() => {
				let t = Number(e.friction);
				return isNaN(t) || t <= 0 ? 2 : t
			})), x = new Cf(1, w.value);
			Zn((() => e.disabled), (() => {
				$()
			}));
			const {_updateOldScale: T, _endScale: S, _setScale: E, scaleValueSync: k, _updateBoundary: A, _updateOffset: C, _updateWH: B, _scaleOffset: P, minX: L, minY: O, maxX: I, maxY: M, FAandSFACancel: F, _getLimitXY: j, _setTransform: N, _revise: R, dampingNumber: D, xMove: H, yMove: z, xSync: q, ySync: V, _STD: W} = function (e, t, n, o, r, i, s, a, l, c) {
				const u = wi((() => {
					let t = Number(e.scaleMin);
					return isNaN(t) ? .5 : t
				})), d = wi((() => {
					let t = Number(e.scaleMax);
					return isNaN(t) ? 10 : t
				})), p = rn(Number(e.scaleValue) || 1);
				Zn(p, (e => {
					N(e)
				})), Zn(u, (() => {
					j()
				})), Zn(d, (() => {
					j()
				})), Zn((() => e.scaleValue), (e => {
					p.value = Number(e) || 0
				}));
				const {_updateBoundary: f, _updateOffset: h, _updateWH: m, _scaleOffset: g, minX: v, minY: b, maxX: y, maxY: _} = function (e, t, n) {
					const o = Jn("movableAreaWidth", rn(0)), r = Jn("movableAreaHeight", rn(0)),
						i = Jn("movableAreaRootRef"), s = {x: 0, y: 0}, a = {x: 0, y: 0}, l = rn(0), c = rn(0),
						u = rn(0), d = rn(0), p = rn(0), f = rn(0);

					function h() {
						let e = 0 - s.x + a.x, t = o.value - l.value - s.x - a.x;
						u.value = Math.min(e, t), p.value = Math.max(e, t);
						let n = 0 - s.y + a.y, i = r.value - c.value - s.y - a.y;
						d.value = Math.min(n, i), f.value = Math.max(n, i)
					}

					function m() {
						s.x = Ff(e.value, i.value), s.y = jf(e.value, i.value)
					}

					function g(o) {
						o = o || t.value, o = n(o);
						let r = e.value.getBoundingClientRect();
						c.value = r.height / t.value, l.value = r.width / t.value;
						let i = c.value * o, s = l.value * o;
						a.x = (s - l.value) / 2, a.y = (i - c.value) / 2
					}

					return {
						_updateBoundary: h,
						_updateOffset: m,
						_updateWH: g,
						_scaleOffset: a,
						minX: u,
						minY: d,
						maxX: p,
						maxY: f
					}
				}(t, o, F), {FAandSFACancel: w, _getLimitXY: x, _animationTo: T, _setTransform: S, _revise: E, dampingNumber: k, xMove: A, yMove: C, xSync: B, ySync: P, _STD: L} = function (e, t, n, o, r, i, s, a, l, c, u, d, p, f) {
					const h = wi((() => {
							let e = Number(t.damping);
							return isNaN(e) ? 20 : e
						})), m = wi((() => "all" === t.direction || "horizontal" === t.direction)),
						g = wi((() => "all" === t.direction || "vertical" === t.direction)), v = rn(Rf(t.x)),
						b = rn(Rf(t.y));
					Zn((() => t.x), (e => {
						v.value = Rf(e)
					})), Zn((() => t.y), (e => {
						b.value = Rf(e)
					})), Zn(v, (e => {
						E(e)
					})), Zn(b, (e => {
						k(e)
					}));
					const y = new Pf(1, 9 * Math.pow(h.value, 2) / 40, h.value);

					function _(e, t) {
						let n = !1;
						return e > r.value ? (e = r.value, n = !0) : e < s.value && (e = s.value, n = !0), t > i.value ? (t = i.value, n = !0) : t < a.value && (t = a.value, n = !0), {
							x: e,
							y: t,
							outOfBounds: n
						}
					}

					function w() {
						d && d.cancel(), u && u.cancel()
					}

					function x(e, n, r, i, s, a) {
						w(), m.value || (e = l.value), g.value || (n = c.value), t.scale || (r = o.value);
						let d = _(e, n);
						e = d.x, n = d.y, t.animation ? (y._springX._solution = null, y._springY._solution = null, y._springScale._solution = null, y._springX._endPosition = l.value, y._springY._endPosition = c.value, y._springScale._endPosition = o.value, y.setEnd(e, n, r, 1), u = Nf(y, (function () {
							let e = y.x();
							T(e.x, e.y, e.scale, i, s, a)
						}), (function () {
							u.cancel()
						}))) : T(e, n, r, i, s, a)
					}

					function T(r, i, s, a = "", u, d) {
						null !== r && "NaN" !== r.toString() && "number" == typeof r || (r = l.value || 0), null !== i && "NaN" !== i.toString() && "number" == typeof i || (i = c.value || 0), r = Number(r.toFixed(1)), i = Number(i.toFixed(1)), s = Number(s.toFixed(1)), l.value === r && c.value === i || u || f("change", {}, {
							x: Lf(r, n.x),
							y: Lf(i, n.y),
							source: a
						}), t.scale || (s = o.value), s = +(s = p(s)).toFixed(3), d && s !== o.value && f("scale", {}, {
							x: r,
							y: i,
							scale: s
						});
						let h = "translateX(" + r + "px) translateY(" + i + "px) translateZ(0px) scale(" + s + ")";
						e.value && (e.value.style.transform = h, e.value.style.webkitTransform = h, l.value = r, c.value = i, o.value = s)
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
				}(t, e, g, o, y, _, v, b, s, a, l, c, F, n);

				function O(t, n) {
					if (e.scale) {
						t = F(t), m(t), f();
						const e = x(s.value, a.value), o = e.x, r = e.y;
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

				function N(t) {
					return !!e.scale && (O(t = F(t), !0), M(t), t)
				}

				function R() {
					i.value = !1, M(o.value)
				}

				function D(e) {
					e && (e = r.value * e, I(), O(e))
				}

				return {
					_updateOldScale: M,
					_endScale: R,
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
				u.value || e.disabled || (F(), _.historyX = [0, 0], _.historyY = [0, 0], _.historyT = [0, 0], H.value && (s = d.value), z.value && (a = p.value), n.value.style.willChange = "transform", g = null, v = null, m = !0)
			}

			function Q(t) {
				if (!u.value && !e.disabled && m) {
					let n = d.value, o = p.value;
					if (null === v && (v = Math.abs(t.detail.dx / t.detail.dy) > 1 ? "htouchmove" : "vtouchmove"), H.value && (n = t.detail.dx + s, _.historyX.shift(), _.historyX.push(n), z.value || null !== g || (g = Math.abs(t.detail.dx / t.detail.dy) < 1)), z.value && (o = t.detail.dy + a, _.historyY.shift(), _.historyY.push(o), H.value || null !== g || (g = Math.abs(t.detail.dy / t.detail.dx) < 1)), _.historyT.shift(), _.historyT.push(t.detail.timeStamp), !g) {
						t.preventDefault();
						let r = "touch";
						n < L.value ? e.outOfBounds ? (r = "touch-out-of-bounds", n = L.value - b.x(L.value - n)) : n = L.value : n > I.value && (e.outOfBounds ? (r = "touch-out-of-bounds", n = I.value + b.x(n - I.value)) : n = I.value), o < O.value ? e.outOfBounds ? (r = "touch-out-of-bounds", o = O.value - y.x(O.value - o)) : o = O.value : o > M.value && (e.outOfBounds ? (r = "touch-out-of-bounds", o = M.value + y.x(o - M.value)) : o = M.value), Mf((function () {
							N(n, o, l.value, r)
						}))
					}
				}
			}

			function U() {
				if (!u.value && !e.disabled && m && (n.value.style.willChange = "auto", m = !1, !g && !R("out-of-bounds") && e.inertia)) {
					const e = 1e3 * (_.historyX[1] - _.historyX[0]) / (_.historyT[1] - _.historyT[0]),
						t = 1e3 * (_.historyY[1] - _.historyY[0]) / (_.historyT[1] - _.historyT[0]), n = d.value,
						o = p.value;
					x.setV(e, t), x.setS(n, o);
					const r = x.delta().x, i = x.delta().y;
					let s = r + n, a = i + o;
					s < L.value ? (s = L.value, a = o + (L.value - n) * i / r) : s > I.value && (s = I.value, a = o + (I.value - n) * i / r), a < O.value ? (a = O.value, s = n + (O.value - o) * r / i) : a > M.value && (a = M.value, s = n + (M.value - o) * r / i), x.setEnd(s, a), h = Nf(x, (function () {
						let e = x.s(), t = e.x, n = e.y;
						N(t, n, l.value, "friction")
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
				N(r, i, t, "", !0), T(t)
			}

			return Fo((() => {
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
				r(e), Do((() => {
					i(e)
				}))
			})), Do((() => {
				F()
			})), {setParent: X}
		}(e, r, o);
		return () => ei("uni-movable-view", {ref: o}, [ei(Lp, {onResize: i}, null, 8, ["onResize"]), t.default && t.default()], 512)
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

function Nf(e, t, n) {
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

function Rf(e) {
	return /\d+[ur]px$/i.test(e) ? vd(parseFloat(e)) : Number(e) || 0
}

const Df = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"],
	Hf = ["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out", "zoom-fade-out", "pop-in", "none"],
	zf = ["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in", "zoom-fade-in", "pop-out", "none"],
	qf = {
		hoverClass: {type: String, default: "navigator-hover"},
		url: {type: String, default: ""},
		openType: {type: String, default: "navigate", validator: e => Boolean(~Df.indexOf(e))},
		delta: {type: Number, default: 1},
		hoverStartTime: {type: [Number, String], default: 50},
		hoverStayTime: {type: [Number, String], default: 600},
		exists: {type: String, default: ""},
		hoverStopPropagation: {type: Boolean, default: !1},
		animationType: {type: String, default: "", validator: e => !e || Hf.concat(zf).includes(e)},
		animationDuration: {type: [String, Number], default: 300}
	};
k({}, qf, {renderLink: {type: Boolean, default: !0}});
const Vf = nu({
	name: "PickerView", props: {
		value: {
			type: Array, default: () => [], validator: function (e) {
				return P(e) && e.filter((e => "number" == typeof e)).length === e.length
			}
		},
		indicatorStyle: {type: String, default: ""},
		indicatorClass: {type: String, default: ""},
		maskStyle: {type: String, default: ""},
		maskClass: {type: String, default: ""}
	}, emits: ["change", "pickstart", "pickend", "update:value"], setup(e, {slots: t, emit: n}) {
		const o = rn(null), r = rn(null), i = lu(o, n), s = function (e) {
			const t = Wt([...e.value]), n = Wt({value: t, height: 34});
			return Zn((() => e.value), ((e, t) => {
				n.value.length = e.length, e.forEach(((e, t) => {
					e !== n.value[t] && n.value.splice(t, 1, e)
				}))
			})), n
		}(e), a = rn(null);
		Fo((() => {
			const e = a.value;
			e && (s.height = e.$el.offsetHeight)
		}));
		let l = rn([]), c = rn([]);

		function u(e) {
			let t = c.value;
			t = t.filter((e => e.type !== Rr));
			let n = t.indexOf(e);
			return -1 !== n ? n : l.value.indexOf(e)
		}

		return Yn("getPickerViewColumn", (function (e) {
			return wi({
				get() {
					const t = u(e.vnode);
					return s.value[t] || 0
				}, set(t) {
					const o = u(e.vnode);
					if (o < 0) return;
					if (s.value[o] !== t) {
						s.value[o] = t;
						const e = s.value.map((e => e));
						n("update:value", e), i("change", {}, {value: e})
					}
				}
			})
		})), Yn("pickerViewProps", e), Yn("pickerViewState", s), () => {
			const e = t.default && t.default();
			{
				const t = bf(e);
				l.value = t, Cn((() => {
					c.value = t
				}))
			}
			return ei("uni-picker-view", {ref: o}, [ei(Lp, {
				ref: a,
				onResize: ({height: e}) => s.height = e
			}, null, 8, ["onResize"]), ei("div", {ref: r, class: "uni-picker-view-wrapper"}, [e], 512)], 512)
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
			const r = -n / (2 * o), i = e, s = t / (r * e);
			return {
				x: function (e) {
					return (i + s * e) * Math.pow(Math.E, r * e)
				}, dx: function (e) {
					const t = Math.pow(Math.E, r * e);
					return r * (i + s * e) * t + s * t
				}
			}
		}
		if (i > 0) {
			const r = (-n - Math.sqrt(i)) / (2 * o), s = (-n + Math.sqrt(i)) / (2 * o), a = (t - r * e) / (s - r),
				l = e - a;
			return {
				x: function (e) {
					let t, n;
					return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s * e)), l * t + a * n
				}, dx: function (e) {
					let t, n;
					return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s * e)), l * r * t + a * s * n
				}
			}
		}
		const s = Math.sqrt(4 * o * r - n * n) / (2 * o), a = -n / 2 * o, l = e, c = (t - a * e) / s;
		return {
			x: function (e) {
				return Math.pow(Math.E, a * e) * (l * Math.cos(s * e) + c * Math.sin(s * e))
			}, dx: function (e) {
				const t = Math.pow(Math.E, a * e), n = Math.cos(s * e), o = Math.sin(s * e);
				return t * (c * s * n - l * s * o) + a * t * (c * o + l * n)
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
			this._enableSnap && (o <= 0 && o >= -this._extent && (this._position = o, this.updatePosition()), M(this._options.onSnap) && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))), this._shouldDispatchScrollEvent && this.dispatchScroll(), this._scrolling = !1
		}))
	}

	onTransitionEnd() {
		this._element.style.webkitTransition = "", this._element.style.transition = "", this._element.removeEventListener("transitionend", this._onTransitionEnd), this._snapping && (this._snapping = !1), this.dispatchScroll()
	}

	snap() {
		const e = this._itemSize, t = this._position % e,
			n = Math.abs(t) > this._itemSize / 2 ? this._position - (e - Math.abs(t)) : this._position - t;
		this._position !== n && (this._snapping = !0, this.scrollTo(-n), M(this._options.onSnap) && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize)))
	}

	scrollTo(e, t) {
		this._animation && (this._animation.cancel(), this._scrolling = !1), "number" == typeof e && (this._position = -e), this._position < -this._extent ? this._position = -this._extent : this._position > 0 && (this._position = 0);
		const n = "transform " + (t || .2) + "s ease-out";
		this._element.style.webkitTransition = "-webkit-" + n, this._element.style.transition = n, this.updatePosition(), this._element.addEventListener("transitionend", this._onTransitionEnd)
	}

	dispatchScroll() {
		if (M(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
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
		this._enableX ? (o = this._element.childNodes.length ? (t || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0, this._scrollWidth = t) : (o = this._element.childNodes.length ? (t || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0, this._scrollHeight = t), "number" == typeof e && (this._position = -e), this._position < -o ? this._position = -o : this._position > 0 && (this._position = 0), this._itemSize = n || this._itemSize, this.updatePosition(), r !== this._position && (this.dispatchScroll(), M(this._options.onSnap) && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))), this._extent = o, this._scroll._extent = o
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
		const o = rn(null), r = rn(null), i = Jn("getPickerViewColumn"), s = pi(), a = i ? i(s) : rn(0),
			l = Jn("pickerViewProps"), c = Jn("pickerViewState"), u = rn(34), d = rn(null);
		Fo((() => {
			const e = d.value;
			u.value = e.$el.offsetHeight
		}));
		const p = wi((() => (c.height - u.value) / 2)), {state: f} = rf(), h = function (e) {
			const t = "uni-picker-view-content-" + Jf++;
			return Zn((() => e.value), (function () {
				const n = document.createElement("style");
				n.innerText = `.uni-picker-view-content.${t}>*{height: ${e.value}px;overflow: hidden;}`, document.head.appendChild(n)
			})), t
		}(u);
		let m;
		const g = Wt({current: a.value, length: 0});
		let v;

		function b() {
			m && !v && (v = !0, Cn((() => {
				v = !1;
				let e = Math.min(g.current, g.length - 1);
				e = Math.max(e, 0), m.update(e * u.value, void 0, u.value)
			})))
		}

		Zn((() => a.value), (e => {
			e !== g.current && (g.current = e, b())
		})), Zn((() => g.current), (e => a.value = e)), Zn([() => u.value, () => g.length, () => c.height], b);
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
				t = r.value, {scroller: n, handleTouchStart: i, handleTouchMove: s, handleTouchEnd: a} = function (e, t) {
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
									if (n.historyTime.length > 2) for (let t = n.historyTime.length - 1, r = n.historyTime[t], i = n.historyX[t], s = n.historyY[t]; t > 0;) {
										t--;
										const e = r - n.historyTime[t];
										if (e > 30 && e < 50) {
											o.x = (i - n.historyX[t]) / (e / 1e3), o.y = (s - n.historyY[t]) / (e / 1e3);
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
						s(e), e.stopPropagation();
						break;
					case"end":
					case"cancel":
						a(e)
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
		return Fo(x), () => {
			const e = t.default && t.default();
			g.length = bf(e).length;
			const n = `${p.value}px 0`;
			return ei("uni-picker-view-column", {ref: o}, [ei("div", {
				onWheel: _,
				onClick: w,
				class: "uni-picker-view-group"
			}, [ei("div", ai(f.attrs, {
				class: ["uni-picker-view-mask", l.maskClass],
				style: `background-size: 100% ${p.value}px;${l.maskStyle}`
			}), null, 16), ei("div", ai(f.attrs, {
				class: ["uni-picker-view-indicator", l.indicatorClass],
				style: l.indicatorStyle
			}), [ei(Lp, {
				ref: d,
				onResize: ({height: e}) => u.value = e
			}, null, 8, ["onResize"])], 16), ei("div", {
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
const eh = (e, t, n) => !n || P(n) && !n.length ? [] : n.map((n => {
	if (z(n)) {
		if (!B(n, "type") || "node" === n.type) {
			let o = {[e]: ""};
			const r = n.name.toLowerCase();
			if (!B(Kf, r)) return;
			return function (e, t) {
				if (z(t)) for (const n in t) if (B(t, n)) {
					const o = t[n];
					"img" === e && "src" === n && (t[n] = gu(o))
				}
			}(r, n.attrs), o = k(o, function (e, t) {
				if (["a", "img"].includes(e.name) && t) return {
					onClick: n => {
						t(n, {node: e}), n.stopPropagation(), n.preventDefault(), n.returnValue = !1
					}
				}
			}(n, t), n.attrs), xi(n.name, o, eh(e, t, n.children))
		}
		return "text" === n.type && F(n.text) && "" !== n.text ? ni((n.text || "").replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, (function (e, t) {
			return B(Zf, t) && Zf[t] ? Zf[t] : /^#[0-9]{1,4}$/.test(t) ? String.fromCharCode(t.slice(1)) : /^#x[0-9a-f]{1,4}$/i.test(t) ? String.fromCharCode(0 + t.slice(1)) : e
		}))) : void 0
	}
}));

function th(e) {
	e = function (e) {
		return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "")
	}(e);
	const t = [], n = {node: "root", children: []};
	return function (e, t) {
		var n, o, r, i = [], s = e;
		for (i.last = function () {
			return this[this.length - 1]
		}; e;) {
			if (o = !0, i.last() && Vp[i.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + i.last() + "[^>]*>"), (function (e, n) {
				return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), ""
			})), c("", i.last()); else if (0 == e.indexOf("\x3c!--") ? (n = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, n)), e = e.substring(n + 3), o = !1) : 0 == e.indexOf("</") ? (r = e.match(jp)) && (e = e.substring(r[0].length), r[0].replace(jp, c), o = !1) : 0 == e.indexOf("<") && (r = e.match(Fp)) && (e = e.substring(r[0].length), r[0].replace(Fp, l), o = !1), o) {
				var a = (n = e.indexOf("<")) < 0 ? e : e.substring(0, n);
				e = n < 0 ? "" : e.substring(n), t.chars && t.chars(a)
			}
			if (e == s) throw"Parse Error: " + e;
			s = e
		}

		function l(e, n, o, r) {
			if (n = n.toLowerCase(), Dp[n]) for (; i.last() && Hp[i.last()];) c("", i.last());
			if (zp[n] && i.last() == n && c("", n), (r = Rp[n] || !!r) || i.push(n), t.start) {
				var s = [];
				o.replace(Np, (function (e, t) {
					var n = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : qp[t] ? t : "";
					s.push({name: t, value: n, escaped: n.replace(/(^|[^\\])"/g, '$1\\"')})
				})), t.start && t.start(n, s, r)
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
		const n = pi(), o = n && n.vnode.scopeId || "", r = rn(null), i = rn([]), s = lu(r, t);

		function a(e, t = {}) {
			s("itemclick", e, t)
		}

		return Zn((() => e.nodes), (function () {
			let t = e.nodes;
			F(t) && (t = th(e.nodes)), i.value = eh(o, a, t)
		}), {immediate: !0}), () => xi("uni-rich-text", {ref: r}, xi("div", {}, i.value))
	}
}), oh = be(!0), rh = nu({
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
		const o = rn(null), r = rn(null), i = rn(null), s = rn(null), a = rn(null),
			l = lu(o, t), {state: c, scrollTopNumber: u, scrollLeftNumber: d} = function (e) {
				const t = wi((() => Number(e.scrollTop) || 0)), n = wi((() => Number(e.scrollLeft) || 0));
				return {
					state: Wt({
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
		!function (e, t, n, o, r, i, s, a, l) {
			let c = !1, u = 0, d = !1, p = () => {
			};
			const f = wi((() => {
				let t = Number(e.upperThreshold);
				return isNaN(t) ? 50 : t
			})), h = wi((() => {
				let t = Number(e.lowerThreshold);
				return isNaN(t) ? 50 : t
			}));

			function m(e, t) {
				const n = s.value;
				let o = 0, r = "";
				if (e < 0 ? e = 0 : "x" === t && e > n.scrollWidth - n.offsetWidth ? e = n.scrollWidth - n.offsetWidth : "y" === t && e > n.scrollHeight - n.offsetHeight && (e = n.scrollHeight - n.offsetHeight), "x" === t ? o = n.scrollLeft - e : "y" === t && (o = n.scrollTop - e), 0 === o) return;
				let i = a.value;
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
				e.scrollY && (e.scrollWithAnimation ? m(t, "y") : s.value.scrollTop = t)
			}

			function b(t) {
				e.scrollX && (e.scrollWithAnimation ? m(t, "x") : s.value.scrollLeft = t)
			}

			function y(t) {
				if (t) {
					if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(t)) return void console.error(`id error: scroll-into-view=${t}`);
					let n = i.value.querySelector("#" + t);
					if (n) {
						let t = s.value.getBoundingClientRect(), o = n.getBoundingClientRect();
						if (e.scrollX) {
							let n = o.left - t.left, r = s.value.scrollLeft + n;
							e.scrollWithAnimation ? m(r, "x") : s.value.scrollLeft = r
						}
						if (e.scrollY) {
							let n = o.top - t.top, r = s.value.scrollTop + n;
							e.scrollWithAnimation ? m(r, "y") : s.value.scrollTop = r
						}
					}
				}
			}

			function _(t, n) {
				a.value.style.transition = "", a.value.style.webkitTransition = "", a.value.style.transform = "", a.value.style.webkitTransform = "";
				let o = s.value;
				"x" === n ? (o.style.overflowX = e.scrollX ? "auto" : "hidden", o.scrollLeft = t) : "y" === n && (o.style.overflowY = e.scrollY ? "auto" : "hidden", o.scrollTop = t), a.value.removeEventListener("transitionend", p), a.value.removeEventListener("webkitTransitionEnd", p)
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

			Fo((() => {
				Cn((() => {
					v(n.value), b(o.value)
				})), y(e.scrollIntoView);
				let i = function (e) {
					e.preventDefault(), e.stopPropagation(), g(e)
				}, a = {x: 0, y: 0}, l = null, p = function (n) {
					if (null === a) return;
					let o = n.touches[0].pageX, i = n.touches[0].pageY, p = s.value;
					if (Math.abs(o - a.x) > Math.abs(i - a.y)) if (e.scrollX) {
						if (0 === p.scrollLeft && o > a.x) return void (l = !1);
						if (p.scrollWidth === p.offsetWidth + p.scrollLeft && o < a.x) return void (l = !1);
						l = !0
					} else l = !1; else if (e.scrollY) if (0 === p.scrollTop && i > a.y) l = !1, e.refresherEnabled && !1 !== n.cancelable && n.preventDefault(); else {
						if (p.scrollHeight === p.offsetHeight + p.scrollTop && i < a.y) return void (l = !1);
						l = !0
					} else l = !1;
					if (l && n.stopPropagation(), 0 === p.scrollTop && 1 === n.touches.length && w("pulling"), e.refresherEnabled && "pulling" === t.refreshState) {
						const o = i - a.y;
						0 === u && (u = i), c ? (t.refresherHeight = o + e.refresherThreshold, d = !1) : (t.refresherHeight = i - u, t.refresherHeight > 0 && (d = !0, r("refresherpulling", n, {deltaY: o})));
						const s = t.refresherHeight / e.refresherThreshold;
						t.refreshRotate = 360 * (s > 1 ? 1 : s)
					}
				}, f = function (e) {
					1 === e.touches.length && (a = {x: e.touches[0].pageX, y: e.touches[0].pageY})
				}, h = function (n) {
					a = null, t.refresherHeight >= e.refresherThreshold ? w("refreshing") : w("refresherabort")
				};
				s.value.addEventListener("touchstart", f, oh), s.value.addEventListener("touchmove", p, be(!1)), s.value.addEventListener("scroll", i, be(!1)), s.value.addEventListener("touchend", h, oh), Ro((() => {
					s.value.removeEventListener("touchstart", f), s.value.removeEventListener("touchmove", p), s.value.removeEventListener("scroll", i), s.value.removeEventListener("touchend", h)
				}))
			})), To((() => {
				e.scrollY && (s.value.scrollTop = t.lastScrollTop), e.scrollX && (s.value.scrollLeft = t.lastScrollLeft)
			})), Zn(n, (e => {
				v(e)
			})), Zn(o, (e => {
				b(e)
			})), Zn((() => e.scrollIntoView), (e => {
				y(e)
			})), Zn((() => e.refresherTriggered), (e => {
				!0 === e ? w("refreshing") : !1 === e && w("restore")
			}))
		}(e, c, u, d, l, o, r, s, t);
		const p = wi((() => {
			let t = "";
			return e.scrollX ? t += "overflow-x:auto;" : t += "overflow-x:hidden;", e.scrollY ? t += "overflow-y:auto;" : t += "overflow-y:hidden;", t
		}));
		return () => {
			const {refresherEnabled: t, refresherBackground: l, refresherDefaultStyle: u} = e, {refresherHeight: d, refreshState: f, refreshRotate: h} = c;
			return ei("uni-scroll-view", {ref: o}, [ei("div", {ref: i, class: "uni-scroll-view"}, [ei("div", {
				ref: r,
				style: p.value,
				class: "uni-scroll-view"
			}, [ei("div", {ref: s, class: "uni-scroll-view-content"}, [t ? ei("div", {
				ref: a,
				style: {backgroundColor: l, height: d + "px"},
				class: "uni-scroll-view-refresher"
			}, ["none" !== u ? ei("div", {class: "uni-scroll-view-refresh"}, [ei("div", {class: "uni-scroll-view-refresh-inner"}, ["pulling" == f ? ei("svg", {
				key: "refresh__icon",
				style: {transform: "rotate(" + h + "deg)"},
				fill: "#2BD009",
				class: "uni-scroll-view-refresh__icon",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24"
			}, [ei("path", {d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}, null), ei("path", {
				d: "M0 0h24v24H0z",
				fill: "none"
			}, null)], 4) : null, "refreshing" == f ? ei("svg", {
				key: "refresh__spinner",
				class: "uni-scroll-view-refresh__spinner",
				width: "24",
				height: "24",
				viewBox: "25 25 50 50"
			}, [ei("circle", {
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
	function s() {
		c && (clearTimeout(c), c = null)
	}

	let a, l, c = null, u = !0, d = 0, p = 1, f = null, h = !1, m = 0, g = "";
	const v = wi((() => n.value.length > t.displayMultipleItems)), b = wi((() => e.circular && v.value));

	function y(r) {
		Math.floor(2 * d) === Math.floor(2 * r) && Math.ceil(2 * d) === Math.ceil(2 * r) || b.value && function (o) {
			if (!u) for (let r = n.value, i = r.length, s = o + t.displayMultipleItems, a = 0; a < i; a++) {
				const t = r[a], n = Math.floor(o / i) * i + a, l = n + i, c = n - i,
					u = Math.max(o - (n + 1), n - s, 0), d = Math.max(o - (l + 1), l - s, 0),
					p = Math.max(o - (c + 1), c - s, 0), f = Math.min(u, d, p), h = [n, l, c][[u, d, p].indexOf(f)];
				t.updatePosition(h, e.vertical)
			}
		}(r);
		const s = "translate(" + (e.vertical ? "0" : 100 * -r * p + "%") + ", " + (e.vertical ? 100 * -r * p + "%" : "0") + ") translateZ(0)",
			l = o.value;
		if (l && (l.style.webkitTransform = s, l.style.transform = s), d = r, !a) {
			if (r % 1 == 0) return;
			a = r
		}
		r -= Math.floor(a);
		const c = n.value;
		r <= -(c.length - 1) ? r += c.length : r >= c.length && (r -= c.length), r = a % 1 > .5 || a < 0 ? r - 1 : r, i("transition", {}, {
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
		const e = f, o = e.toPos, r = e.acc, s = e.endTime, c = e.source, u = s - Date.now();
		if (u <= 0) {
			y(o), f = null, h = !1, a = null;
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
		const i = t.duration, s = n.value.length;
		let a = d;
		if (b.value) if (r < 0) {
			for (; a < e;) a += s;
			for (; a - s > e;) a -= s
		} else if (r > 0) {
			for (; a > e;) a -= s;
			for (; a + s < e;) a += s;
			a + s - e < e - a && (a += s)
		} else {
			for (; a + s < e;) a += s;
			for (; a - s > e;) a -= s;
			a + s - e < e - a && (a += s)
		} else "click" === o && (e = e + t.displayMultipleItems - 1 < s ? e : 0);
		f = {
			toPos: e,
			acc: 2 * (a - e) / (i * i),
			endTime: Date.now() + i,
			source: o
		}, h || (h = !0, l = requestAnimationFrame(x))
	}

	function S() {
		s();
		const e = n.value, o = function () {
			c = null, g = "autoplay", b.value ? t.current = _(t.current + 1) : t.current = t.current + t.displayMultipleItems < e.length ? t.current + 1 : 0, T(t.current, "autoplay", b.value ? 1 : 0), c = setTimeout(o, t.interval)
		};
		u || e.length <= t.displayMultipleItems || (c = setTimeout(o, t.interval))
	}

	function E(e) {
		e ? S() : s()
	}

	return Zn([() => e.current, () => e.currentItemId, () => [...n.value]], (() => {
		let o = -1;
		if (e.currentItemId) for (let t = 0, r = n.value; t < r.length; t++) {
			if (r[t].getItemId() === e.currentItemId) {
				o = t;
				break
			}
		}
		o < 0 && (o = Math.round(e.current) || 0), o = o < 0 ? 0 : o, t.current !== o && (g = "", t.current = o)
	})), Zn([() => e.vertical, () => b.value, () => t.displayMultipleItems, () => [...n.value]], (function () {
		s(), f && (y(f.toPos), f = null);
		const r = n.value;
		for (let t = 0; t < r.length; t++) r[t].updatePosition(t, e.vertical);
		p = 1;
		const i = o.value;
		if (1 === t.displayMultipleItems && r.length) {
			const e = r[0].getBoundingClientRect(), t = i.getBoundingClientRect();
			p = e.width / t.width, p > 0 && p < 1 || (p = 1)
		}
		const a = d;
		d = -2;
		const l = t.current;
		l >= 0 ? (u = !1, t.userTracking ? (y(a + l - m), m = l) : (y(l), e.autoplay && S())) : (u = !0, y(-t.displayMultipleItems - 1))
	})), Zn((() => t.interval), (() => {
		c && (s(), S())
	})), Zn((() => t.current), ((e, o) => {
		!function (e, o) {
			const r = g;
			g = "";
			const s = n.value;
			if (!r) {
				const t = s.length;
				T(e, "", b.value && o + (t - e) % t > t / 2 ? 1 : 0)
			}
			const a = s[e];
			if (a) {
				const e = t.currentItemId = a.getItemId();
				i("change", {}, {current: t.current, currentItemId: e, source: r})
			}
		}(e, o), r("update:current", e)
	})), Zn((() => t.currentItemId), (e => {
		r("update:currentItemId", e)
	})), Zn((() => e.autoplay && !t.userTracking), E), E(e.autoplay && !t.userTracking), Fo((() => {
		let r = !1, i = 0, a = 0;

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
				if ("start" === c.detail.state) return t.userTracking = !0, r = !1, s(), m = d, i = 0, a = Date.now(), void w();
				if ("end" === c.detail.state) return l(!1);
				if ("cancel" === c.detail.state) return l(!0);
				if (t.userTracking) {
					if (!r) {
						r = !0;
						const n = Math.abs(c.detail.dx), o = Math.abs(c.detail.dy);
						if ((n >= o && e.vertical || n <= o && !e.vertical) && (t.userTracking = !1), !t.userTracking) return void (e.autoplay && S())
					}
					return function (r) {
						const s = a;
						a = Date.now();
						const l = n.value.length - t.displayMultipleItems;

						function c(e) {
							return .5 - .25 / (e + .5)
						}

						function u(e, t) {
							let n = m + e;
							i = .6 * i + .4 * t, b.value || (n < 0 || n > l) && (n < 0 ? n = -c(-n) : n > l && (n = l + c(n - l)), i = 0), y(n)
						}

						const d = a - s || 1, p = o.value;
						e.vertical ? u(-r.dy / p.offsetHeight, -r.ddy / d) : u(-r.dx / p.offsetWidth, -r.ddx / d)
					}(c.detail), !1
				}
			}
		}))
	})), Do((() => {
		s(), cancelAnimationFrame(l)
	})), {
		onSwiperDotClick: function (e) {
			T(t.current = e, g = "click", b.value ? 1 : 0)
		}, circularEnabled: b, swiperEnabled: v
	}
}

const sh = nu({
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
		const o = rn(null), r = lu(o, n), i = rn(null), s = rn(null), a = function (e) {
			return Wt({
				interval: wi((() => {
					const t = Number(e.interval);
					return isNaN(t) ? 5e3 : t
				})), duration: wi((() => {
					const t = Number(e.duration);
					return isNaN(t) ? 500 : t
				})), displayMultipleItems: wi((() => {
					const t = Math.round(e.displayMultipleItems);
					return isNaN(t) ? 1 : t
				})), current: Math.round(e.current) || 0, currentItemId: e.currentItemId, userTracking: !1
			})
		}(e), l = wi((() => {
			let t = {};
			return (e.nextMargin || e.previousMargin) && (t = e.vertical ? {
				left: 0,
				right: 0,
				top: dc(e.previousMargin, !0),
				bottom: dc(e.nextMargin, !0)
			} : {top: 0, bottom: 0, left: dc(e.previousMargin, !0), right: dc(e.nextMargin, !0)}), t
		})), c = wi((() => {
			const t = Math.abs(100 / a.displayMultipleItems) + "%";
			return {width: e.vertical ? "100%" : t, height: e.vertical ? t : "100%"}
		}));
		let u = [];
		const d = [], p = rn([]);

		function f() {
			const e = [];
			for (let t = 0; t < u.length; t++) {
				let n = u[t];
				n instanceof Element || (n = n.el);
				const o = d.find((e => n === e.rootRef.value));
				o && e.push(Kt(o))
			}
			p.value = e
		}

		Yn("addSwiperContext", (function (e) {
			d.push(e), f()
		}));
		Yn("removeSwiperContext", (function (e) {
			const t = d.indexOf(e);
			t >= 0 && (d.splice(t, 1), f())
		}));
		const {onSwiperDotClick: h, circularEnabled: m, swiperEnabled: g} = ih(e, a, p, s, n, r);
		let v = () => null;
		return v = ah(o, e, a, h, p, m, g), () => {
			const n = t.default && t.default();
			return u = bf(n), ei("uni-swiper", {ref: o}, [ei("div", {
				ref: i,
				class: "uni-swiper-wrapper"
			}, [ei("div", {class: "uni-swiper-slides", style: l.value}, [ei("div", {
				ref: s,
				class: "uni-swiper-slide-frame",
				style: c.value
			}, [n], 4)], 4), e.indicatorDots && ei("div", {class: ["uni-swiper-dots", e.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"]}, [p.value.map(((t, n, o) => ei("div", {
				onClick: () => h(n),
				class: {
					"uni-swiper-dot": !0,
					"uni-swiper-dot-active": n < a.current + a.displayMultipleItems && n >= a.current || n < a.current + a.displayMultipleItems - o.length
				},
				style: {background: n === a.current ? e.indicatorActiveColor : e.indicatorColor}
			}, null, 14, ["onClick"])))], 2), v()], 512)], 512)
		}
	}
}), ah = (e, t, n, o, r, i, s) => {
	let a = !1, l = !1, c = !1, u = rn(!1);

	function d(e, n) {
		const o = e.currentTarget;
		o && (o.style.backgroundColor = "over" === n ? t.navigationActiveColor : "")
	}

	Gn((() => {
		a = "auto" === t.navigation, u.value = !0 !== t.navigation || a, b()
	})), Gn((() => {
		const e = r.value.length, t = !i.value;
		l = 0 === n.current && t, c = n.current === e - 1 && t || t && n.current + n.displayMultipleItems >= e, s.value || (l = !0, c = !0, a && (u.value = !0))
	}));
	const p = {onMouseover: e => d(e, "over"), onMouseout: e => d(e, "out")};

	function f(e, t, s) {
		if (e.stopPropagation(), s) return;
		const a = r.value.length;
		let l = n.current;
		switch (t) {
			case"prev":
				l--, l < 0 && i.value && (l = a - 1);
				break;
			case"next":
				l++, l >= a && i.value && (l = 0)
		}
		o(l)
	}

	const h = () => hc("M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z", t.navigationColor, 26);
	let m;
	const g = n => {
		clearTimeout(m);
		const {clientX: o, clientY: r} = n, {left: i, right: s, top: a, bottom: l, width: c, height: d} = e.value.getBoundingClientRect();
		let p = !1;
		if (p = t.vertical ? !(r - a < d / 3 || l - r < d / 3) : !(o - i < c / 3 || s - o < c / 3), p) return m = setTimeout((() => {
			u.value = p
		}), 300);
		u.value = p
	}, v = () => {
		u.value = !0
	};

	function b() {
		e.value && (e.value.removeEventListener("mousemove", g), e.value.removeEventListener("mouseleave", v), a && (e.value.addEventListener("mousemove", g), e.value.addEventListener("mouseleave", v)))
	}

	return Fo(b), function () {
		const e = {"uni-swiper-navigation-hide": u.value, "uni-swiper-navigation-vertical": t.vertical};
		return t.navigation ? ei(jr, null, [ei("div", ai({
			class: ["uni-swiper-navigation uni-swiper-navigation-prev", k({"uni-swiper-navigation-disabled": l}, e)],
			onClick: e => f(e, "prev", l)
		}, p), [h()], 16, ["onClick"]), ei("div", ai({
			class: ["uni-swiper-navigation uni-swiper-navigation-next", k({"uni-swiper-navigation-disabled": c}, e)],
			onClick: e => f(e, "next", c)
		}, p), [h()], 16, ["onClick"])]) : null
	}
}, lh = nu({
	name: "SwiperItem", props: {itemId: {type: String, default: ""}}, setup(e, {slots: t}) {
		const n = rn(null), o = {
			rootRef: n,
			getItemId: () => e.itemId,
			getBoundingClientRect: () => n.value.getBoundingClientRect(),
			updatePosition(e, t) {
				const o = t ? "0" : 100 * e + "%", r = t ? 100 * e + "%" : "0", i = n.value,
					s = `translate(${o},${r}) translateZ(0)`;
				i && (i.style.webkitTransform = s, i.style.transform = s)
			}
		};
		return Fo((() => {
			const e = Jn("addSwiperContext");
			e && e(o)
		})), Do((() => {
			const e = Jn("removeSwiperContext");
			e && e(o)
		})), () => ei("uni-swiper-item", {
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
			if (8 & t.shapeFlag && t.type !== Rr) {
				const o = uh(t.children, {space: e.space, decode: e.decode}), r = o.length - 1;
				o.forEach(((e, t) => {
					(0 !== t || e) && n.push(ni(e)), t !== r && n.push(ei("br"))
				}))
			} else n.push(t)
		})), ei("uni-text", {selectable: !!e.selectable || null}, [ei("span", null, n)], 8, ["selectable"])
	}
}), ph = nu({
	name: "View", props: k({}, ru), setup(e, {slots: t}) {
		const {hovering: n, binding: o} = iu(e);
		return () => {
			const r = e.hoverClass;
			return r && "none" !== r ? ei("uni-view", ai({class: n.value ? r : ""}, o), [t.default && t.default()], 16) : ei("uni-view", null, [t.default && t.default()])
		}
	}
});

function fh(e, t) {
	if (t || (t = e.id), t) return e.$options.name.toLowerCase() + "." + t
}

function hh(e, t, n) {
	e && Ml(n || yc(), e, (({type: e, data: n}, o) => {
		t(e, n, o)
	}))
}

function mh(e, t) {
	e && function (e, t) {
		t = Il(e, t), delete Ol[t]
	}(t || yc(), e)
}

let gh = 0;

function vh(e, t, n, o) {
	M(t) && Oo(e, t.bind(n), o)
}

function bh(e, t, n) {
	var o;
	const r = e.mpType || n.$mpType;
	if (r && "component" !== r && (Object.keys(e).forEach((o => {
		if (function (e, t, n = !0) {
			return !(n && !M(t)) && (Ce.indexOf(e) > -1 || 0 === e.indexOf("on"))
		}(o, e[o], !1)) {
			const r = e[o];
			P(r) ? r.forEach((e => vh(o, e, n, t))) : vh(o, r, n, t)
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

function yh(e, t, n) {
	bh(e, t, n)
}

function _h(e, t, n) {
	return e[t] = n
}

function wh(e) {
	return function (t, n, o) {
		if (!n) throw t;
		const r = e._instance;
		if (!r || !r.proxy) throw t;
		Tc(r.proxy, "onError", t)
	}
}

function xh(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function Th(e) {
	const t = e._context.config;
	var n;
	t.errorHandler = Pe(e, wh), n = t.optionMergeStrategies, Ce.forEach((e => {
		n[e] = xh
	}));
	const o = t.globalProperties;
	o.$set = _h, o.$applyOptions = yh, function (e) {
		Be.forEach((t => t(e)))
	}(e)
}

const Sh = cc("upm");

function Eh() {
	return Jn(Sh)
}

function kh(e) {
	const t = function (e) {
		return Wt(function (e) {
			if (history.state) {
				const t = history.state.__type__;
				"redirectTo" !== t && "reLaunch" !== t || 0 !== Hh().length || (e.isEntry = !0, e.isQuit = !0)
			}
			return e
		}(JSON.parse(JSON.stringify(xc(vl().meta, e)))))
	}(e);
	return Yn(Sh, t), t
}

function Ah() {
	return vl()
}

function Ch() {
	return history.state && history.state.__id__ || 1
}

let Bh;

function Ph() {
	var e;
	return Bh || (Bh = __uniConfig.tabBar && Wt((e = __uniConfig.tabBar, bl() && e.list && e.list.forEach((e => {
		xl(e, ["text"])
	})), e))), Bh
}

const Lh = window.CSS && window.CSS.supports;

function Oh(e) {
	return Lh && (Lh(e) || Lh.apply(window.CSS, e.split(":")))
}

const Ih = Oh("top:env(a)"), Mh = Oh("top:constant(a)"), Fh = Oh("backdrop-filter:blur(10px)"),
	jh = (() => Ih ? "env" : Mh ? "constant" : "")();

function Nh(e) {
	return jh ? `calc(${e}px + ${jh}(safe-area-inset-bottom))` : `${e}px`
}

const Rh = new Map;

function Dh() {
	return Rh
}

function Hh() {
	const e = [], t = Rh.values();
	for (const n of t) n.$.__isTabBar ? n.$.__isActive && e.push(n) : e.push(n);
	return e
}

function zh(e, t = !0) {
	const n = Rh.get(e);
	n.$.__isUnload = !0, Tc(n, "onUnload"), Rh.delete(e), t && function (e) {
		const t = Qh.get(e);
		t && (Qh.delete(e), Uh.pruneCacheEntry(t))
	}(e)
}

let qh = Ch();

function Vh(e) {
	const t = Eh();
	let n = e.fullPath;
	return e.meta.isEntry && -1 === n.indexOf(e.meta.route) && (n = "/" + e.meta.route + n.replace("/", "")), function (e, t, n, o, r, i) {
		const {id: s, route: a} = o, l = Me(o.navigationBar, __uniConfig.themeConfig, i).titleColor;
		return {
			id: s,
			path: ue(a),
			route: a,
			fullPath: t,
			options: n,
			meta: o,
			openType: e,
			eventChannel: r,
			statusBarStyle: "#ffffff" === l ? "light" : "dark"
		}
	}("navigateTo", n, {}, t)
}

function Wh(e) {
	const t = Vh(e.$route);
	!function (e, t) {
		e.route = t.route, e.$vm = e, e.$page = t, e.$mpType = "page", t.meta.isTabBar && (e.$.__isTabBar = !0, e.$.__isActive = !0)
	}(e, t), Rh.set($h(t.path, t.id), e)
}

function $h(e, t) {
	return e + "$$" + t
}

const Qh = new Map, Uh = {
	get: e => Qh.get(e), set(e, t) {
		!function (e) {
			const t = parseInt(e.split("$$")[1]);
			if (!t) return;
			Uh.forEach(((e, n) => {
				const o = parseInt(n.split("$$")[1]);
				if (o && o > t) {
					if (function (e) {
						return "tabBar" === e.props.type
					}(e)) return;
					Uh.delete(n), Uh.pruneCacheEntry(e), Cn((() => {
						Rh.forEach(((e, t) => {
							e.$.isUnmounted && Rh.delete(t)
						}))
					}))
				}
			}))
		}(e), Qh.set(e, t)
	}, delete(e) {
		Qh.get(e) && Qh.delete(e)
	}, forEach(e) {
		Qh.forEach(e)
	}
};

function Xh(e, t) {
	!function (e) {
		const t = Jh(e), {body: n} = document;
		Gh && n.removeAttribute(Gh), t && n.setAttribute(t, ""), Gh = t
	}(e), function (e) {
		let t = 0;
		if (e.isTabBar) {
			const e = Ph();
			e.shown && (t = parseInt(e.height))
		}
		var n;
		lc({
			"--window-top": (n = 0, jh ? `calc(${n}px + ${jh}(safe-area-inset-top))` : `${n}px`),
			"--window-bottom": Nh(t)
		})
	}(t), function (e) {
		const t = "nvue-dir-" + __uniConfig.nvue["flex-direction"];
		e.isNVue ? (document.body.setAttribute("nvue", ""), document.body.setAttribute(t, "")) : (document.body.removeAttribute("nvue"), document.body.removeAttribute(t))
	}(t), function (e, t) {
		document.removeEventListener("touchmove", Sc), Kh && document.removeEventListener("scroll", Kh);
		if (t.disableScroll) return document.addEventListener("touchmove", Sc);
		const {onPageScroll: n, onReachBottom: o} = e, r = "transparent" === t.navigationBar.type;
		if (!n && !o && !r) return;
		const i = {}, s = e.proxy.$page.id;
		(n || r) && (i.onPageScroll = function (e, t, n) {
			return o => {
				t && uv.publishHandler("onPageScroll", {scrollTop: o}, e), n && uv.emit(e + ".onPageScroll", {scrollTop: o})
			}
		}(s, n, r));
		o && (i.onReachBottomDistance = t.onReachBottomDistance || 50, i.onReachBottom = () => uv.publishHandler("onReachBottom", {}, s));
		Kh = Ac(i), requestAnimationFrame((() => document.addEventListener("scroll", Kh)))
	}(e, t)
}

function Yh(e) {
	const t = Jh(e);
	t && function (e) {
		const t = document.querySelector("uni-page-body");
		t && t.setAttribute(e, "")
	}(t)
}

function Jh(e) {
	return e.type.__scopeId
}

let Gh, Kh;

function Zh(e) {
	const t = ml({history: tm(), strict: !!__uniConfig.router.strict, routes: __uniRoutes, scrollBehavior: em});
	e.router = t, e.use(t)
}

const em = (e, t, n) => {
	if (n) return n
};

function tm() {
	let {routerBase: e} = __uniConfig.router;
	"/" === e && (e = "");
	const t = da(e);
	return t.listen(((e, t, n) => {
		"back" === n.direction && function (e = 1) {
			const t = Hh(), n = t.length - 1, o = n - e;
			for (let r = n; r > o; r--) {
				const e = t[r].$page;
				zh($h(e.path, e.id), !1)
			}
		}(Math.abs(n.delta))
	})), t
}

const nm = {
	install(e) {
		Th(e), Hc(e), Gc(e), e.config.warnHandler || (e.config.warnHandler = om), Zh(e)
	}
};

function om(e, t, n) {
	if (t) {
		if ("PageMetaHead" === t.$.type.name) return;
		const e = t.$.parent;
		if (e && "PageMeta" === e.type.name) return
	}
	const o = [`[Vue warn]: ${e}`];
	n.length && o.push("\n", n), console.warn(...o)
}

const rm = {class: "uni-async-loading"}, im = ei("i", {class: "uni-loading"}, null, -1),
	sm = ou({name: "AsyncLoading", render: () => (qr(), Ur("div", rm, [im]))});

function am() {
	window.location.reload()
}

const lm = ou({
	name: "AsyncError", setup() {
		El();
		const {t: e} = Tl();
		return () => ei("div", {class: "uni-async-error", onClick: am}, [e("uni.async.error")], 8, ["onClick"])
	}
});
let cm;

function um() {
	return cm
}

function dm(e) {
	cm = e, Object.defineProperty(cm.$.ctx, "$children", {get: () => Hh().map((e => e.$vm))});
	const t = cm.$.appContext.app;
	t.component(sm.name) || t.component(sm.name, sm), t.component(lm.name) || t.component(lm.name, lm), function (e) {
		e.$vm = e, e.$mpType = "app";
		const t = rn(Tl().getLocale());
		Object.defineProperty(e, "$locale", {
			get: () => t.value, set(e) {
				t.value = e
			}
		})
	}(cm), function (e, t) {
		const n = e.$options || {};
		n.globalData = k(n.globalData || {}, t), Object.defineProperty(e, "globalData", {
			get: () => n.globalData,
			set(e) {
				n.globalData = e
			}
		})
	}(cm), Yc(), Ql()
}

function pm(e, {clone: t, init: n, setup: o, before: r}) {
	t && (e = k({}, e)), r && r(e);
	const i = e.setup;
	return e.setup = (e, t) => {
		const r = pi();
		n(r.proxy);
		const s = o(r);
		if (i) return i(s || e, t)
	}, e
}

function fm(e, t) {
	return e && (e.__esModule || "Module" === e[Symbol.toStringTag]) ? pm(e.default, t) : pm(e, t)
}

function hm(e) {
	return fm(e, {
		clone: !0, init: Wh, setup(e) {
			e.$pageInstance = e;
			const t = Ah(), n = we(t.query);
			e.attrs.__pageQuery = n, e.proxy.$page.options = n;
			const o = Eh();
			var r, i, s;
			return Mo((() => {
				Xh(e, o)
			})), Fo((() => {
				Yh(e);
				const {onReady: n} = e;
				n && K(n), bm(t)
			})), Eo((() => {
				if (!e.__isVisible) {
					Xh(e, o), e.__isVisible = !0;
					const {onShow: n} = e;
					n && K(n), Cn((() => {
						bm(t)
					}))
				}
			}), "ba", r), function (e, t) {
				Eo(e, "bda", t)
			}((() => {
				if (e.__isVisible && !e.__isUnload) {
					e.__isVisible = !1;
					const {onHide: t} = e;
					t && K(t)
				}
			})), i = o.id, uv.subscribe(Il(i, "invokeViewApi"), s ? s(Fl) : Fl), Ro((() => {
				!function (e) {
					uv.unsubscribe(Il(e, "invokeViewApi")), Object.keys(Ol).forEach((t => {
						0 === t.indexOf(e + ".") && delete Ol[t]
					}))
				}(o.id)
			})), n
		}
	})
}

function mm() {
	const {windowWidth: e, windowHeight: t, screenWidth: n, screenHeight: o} = Rm(),
		r = 90 === Math.abs(Number(window.orientation)) ? "landscape" : "portrait";
	dv.emit("onResize", {
		deviceOrientation: r,
		size: {windowWidth: e, windowHeight: t, screenWidth: n, screenHeight: o}
	})
}

function gm(e) {
	z(e.data) && "WEB_INVOKE_APPSERVICE" === e.data.type && dv.emit("onWebInvokeAppService", e.data.data, e.data.pageId)
}

function vm() {
	const {emit: e} = dv;
	"visible" === document.visibilityState ? e("onAppEnterForeground", k({}, Pp)) : e("onAppEnterBackground")
}

function bm(e) {
	const {tabBarText: t, tabBarIndex: n, route: o} = e.meta;
	t && Tc("onTabItemTap", {index: n, text: t, pagePath: o})
}

function ym(e) {
	e = e > 0 && e < 1 / 0 ? e : 0;
	const t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), o = Math.floor(e % 3600 % 60),
		r = (t < 10 ? "0" : "") + t;
	let i = (n < 10 ? "0" : "") + n + ":" + ((o < 10 ? "0" : "") + o);
	return "00" !== r && (i = r + ":" + i), i
}

function _m(e, t, n) {
	const o = Wt({gestureType: "none", volumeOld: 0, volumeNew: 0, currentTimeOld: 0, currentTimeNew: 0}),
		r = {x: 0, y: 0};
	return {
		state: o, onTouchstart: function (e) {
			const t = e.targetTouches[0];
			r.x = t.pageX, r.y = t.pageY, o.gestureType = "none", o.volumeOld = 0, o.currentTimeOld = o.currentTimeNew = 0
		}, onTouchmove: function (i) {
			function s() {
				i.stopPropagation(), i.preventDefault()
			}

			n.fullscreen && s();
			const a = o.gestureType;
			if ("stop" === a) return;
			const l = i.targetTouches[0], c = l.pageX, u = l.pageY, d = r, p = t.value;
			if ("progress" === a ? function (e) {
				const n = t.value.duration;
				let r = e / 600 * n + o.currentTimeOld;
				r < 0 ? r = 0 : r > n && (r = n);
				o.currentTimeNew = r
			}(c - d.x) : "volume" === a && function (e) {
				const n = t.value, r = o.volumeOld;
				let i;
				"number" == typeof r && (i = r - e / 200, i < 0 ? i = 0 : i > 1 && (i = 1), n.volume = i, o.volumeNew = i)
			}(u - d.y), "none" === a) if (Math.abs(c - d.x) > Math.abs(u - d.y)) {
				if (!e.enableProgressGesture) return void (o.gestureType = "stop");
				o.gestureType = "progress", o.currentTimeOld = o.currentTimeNew = p.currentTime, n.fullscreen || s()
			} else {
				if (!e.pageGesture) return void (o.gestureType = "stop");
				o.gestureType = "volume", o.volumeOld = p.volume, n.fullscreen || s()
			}
		}, onTouchend: function (e) {
			const n = t.value;
			"none" !== o.gestureType && "stop" !== o.gestureType && (e.stopPropagation(), e.preventDefault()), "progress" === o.gestureType && o.currentTimeOld !== o.currentTimeNew && (n.currentTime = o.currentTimeNew), o.gestureType = "none"
		}
	}
}

function wm(e, t, n, o, r, i, s) {
	const a = {play: e, pause: t, seek: n, sendDanmu: o, playbackRate: r, requestFullScreen: i, exitFullScreen: s};
	!function (e, t, n, o) {
		const r = pi().proxy;
		Fo((() => {
			hh(t || fh(r), e, o), !n && t || Zn((() => r.id), ((t, n) => {
				hh(fh(r, t), e, o), mh(n && fh(r, n))
			}))
		})), Ro((() => {
			mh(t || fh(r), o)
		}))
	}(((e, t) => {
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
		e in a && a[e](n)
	}), function (e) {
		const t = mc(), n = pi().proxy, o = n.$options.name.toLowerCase(), r = e || n.id || "context" + gh++;
		return Fo((() => {
			n.$el.__uniContextInfo = {id: r, type: o, page: t}
		})), `${o}.${r}`
	}(), !0)
}

const xm = nu({
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
		const r = rn(null), i = rn(null),
			s = lu(r, t), {state: a} = of(), {$attrs: l} = vf({excludeListeners: !0}), {t: c} = Tl();
		Bl();
		const {videoRef: u, state: d, play: p, pause: f, seek: h, playbackRate: m, toggle: g, onDurationChange: v, onLoadedMetadata: b, onProgress: y, onWaiting: _, onVideoError: w, onPlay: x, onPause: T, onEnded: S, onTimeUpdate: E} = function (e, t, n) {
			const o = rn(null), r = wi((() => gu(e.src))),
				i = Wt({start: !1, src: r, playing: !1, currentTime: 0, duration: 0, progress: 0, buffered: 0});

			function s(e) {
				const t = e.target, n = t.buffered;
				n.length && (i.buffered = n.end(n.length - 1) / t.duration * 100)
			}

			return Zn((() => r.value), (() => {
				i.playing = !1, i.currentTime = 0
			})), Zn((() => i.buffered), (e => {
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
					}), s(t)
				}, onProgress: s, onWaiting: function (e) {
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
		}(e, 0, s), {state: k, danmuRef: A, updateDanmu: C, toggleDanmu: B, sendDanmu: L} = function (e, t) {
			const n = rn(null), o = Wt({enable: Boolean(e.enableDanmu)});
			let r = {time: 0, index: -1};
			const i = P(e.danmuList) ? JSON.parse(JSON.stringify(e.danmuList)) : [];

			function s(e) {
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
					const n = e.target.currentTime, a = r, l = {time: n, index: a.index};
					if (n > a.time) for (let r = a.index + 1; r < i.length; r++) {
						const e = i[r];
						if (!(n >= (e.time || 0))) break;
						l.index = r, t.playing && o.enable && s(e)
					} else if (n < a.time) for (let t = a.index - 1; t > -1 && n <= (i[t].time || 0); t--) l.index = t - 1;
					r = l
				}, toggleDanmu: function () {
					o.enable = !o.enable
				}, sendDanmu: function (e) {
					i.splice(r.index + 1, 0, {text: String(e.text), color: e.color, time: t.currentTime || 0})
				}
			}
		}(e, d), {state: O, onFullscreenChange: I, emitFullscreenChange: M, toggleFullscreen: F, requestFullScreen: j, exitFullScreen: N} = function (e, t, n, o, r) {
			const i = Wt({fullscreen: !1}), s = /^Apple/.test(navigator.vendor);

			function a(t) {
				i.fullscreen = t, e("fullscreenchange", {}, {fullScreen: t, direction: "vertical"})
			}

			function l(e) {
				const i = r.value, l = t.value, c = n.value;
				let u;
				e ? !document.fullscreenEnabled && !document.webkitFullscreenEnabled || s && !o.userAction ? c.webkitEnterFullScreen ? c.webkitEnterFullScreen() : (u = !0, l.remove(), l.classList.add("uni-video-type-fullscreen"), document.body.appendChild(l)) : l[document.fullscreenEnabled ? "requestFullscreen" : "webkitRequestFullscreen"]() : document.fullscreenEnabled || document.webkitFullscreenEnabled ? document.fullscreenElement ? document.exitFullscreen() : document.webkitFullscreenElement && document.webkitExitFullscreen() : c.webkitExitFullScreen ? c.webkitExitFullScreen() : (u = !0, l.remove(), l.classList.remove("uni-video-type-fullscreen"), i.appendChild(l)), u && a(e)
			}

			function c() {
				l(!1)
			}

			return Ro(c), {
				state: i, onFullscreenChange: function (e, t) {
					t && document.fullscreenEnabled || a(!(!document.fullscreenElement && !document.webkitFullscreenElement))
				}, emitFullscreenChange: a, toggleFullscreen: l, requestFullScreen: function () {
					l(!0)
				}, exitFullScreen: c
			}
		}(s, i, u, a, r), {state: R, onTouchstart: D, onTouchend: H, onTouchmove: z} = _m(e, u, O), {state: q, progressRef: V, ballRef: W, clickProgress: $, toggleControls: Q} = function (e, t, n) {
			const o = rn(null), r = rn(null), i = wi((() => e.showCenterPlayBtn && !t.start)), s = rn(!0),
				a = wi((() => !i.value && e.controls && s.value)),
				l = Wt({touching: !1, controlsTouching: !1, centerPlayBtnShow: i, controlsShow: a, controlsVisible: s});
			let c;

			function u() {
				c = setTimeout((() => {
					l.controlsVisible = !1
				}), 3e3)
			}

			function d() {
				c && (clearTimeout(c), c = null)
			}

			return Ro((() => {
				c && clearTimeout(c)
			})), Zn((() => l.controlsShow && t.playing && !l.controlsTouching), (e => {
				e ? u() : d()
			})), Zn([() => t.currentTime, () => {
				e.duration
			}], (function () {
				l.touching || (t.progress = t.currentTime / t.duration * 100)
			})), Fo((() => {
				const e = be(!1);
				let i, s, a, c = !0;
				const u = r.value;

				function d(e) {
					const n = e.targetTouches[0], r = n.pageX, l = n.pageY;
					if (c && Math.abs(r - i) < Math.abs(l - s)) return void p(e);
					c = !1;
					const u = o.value.offsetWidth;
					let d = a + (r - i) / u * 100;
					d < 0 ? d = 0 : d > 100 && (d = 100), t.progress = d, e.preventDefault(), e.stopPropagation()
				}

				function p(o) {
					l.controlsTouching = !1, l.touching && (u.removeEventListener("touchmove", d, e), c || (o.preventDefault(), o.stopPropagation(), n(t.duration * t.progress / 100)), l.touching = !1)
				}

				u.addEventListener("touchstart", (n => {
					l.controlsTouching = !0;
					const o = n.targetTouches[0];
					i = o.pageX, s = o.pageY, a = t.progress, c = !0, l.touching = !0, u.addEventListener("touchmove", d, e)
				})), u.addEventListener("touchend", p), u.addEventListener("touchcancel", p)
			})), {
				state: l, progressRef: o, ballRef: r, clickProgress: function (e) {
					const r = o.value;
					let i = e.target, s = e.offsetX;
					for (; i && i !== r;) s += i.offsetLeft, i = i.parentNode;
					const a = r.offsetWidth;
					let l = 0;
					s >= 0 && s <= a && (l = s / a, n(t.duration * l))
				}, toggleControls: function () {
					l.controlsVisible = !l.controlsVisible
				}, autoHideStart: u, autoHideEnd: d
			}
		}(e, d, h);
		return wm(p, f, h, L, m, j, N), () => ei("uni-video", {ref: r, id: e.id}, [ei("div", {
			ref: i,
			class: "uni-video-container",
			onTouchstart: D,
			onTouchend: H,
			onTouchmove: z,
			onFullscreenchange: Ts(I, ["stop"]),
			onWebkitfullscreenchange: Ts((e => I(e, !0)), ["stop"])
		}, [ei("video", ai({
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
				E(e), C(e)
			},
			onWebkitbeginfullscreen: () => M(!0),
			onX5videoenterfullscreen: () => M(!0),
			onWebkitendfullscreen: () => M(!1),
			onX5videoexitfullscreen: () => M(!1)
		}), null, 16, ["muted", "loop", "src", "poster", "autoplay", "webkit-playsinline", "playsinline", "onClick", "onDurationchange", "onLoadedmetadata", "onProgress", "onWaiting", "onError", "onPlay", "onPause", "onEnded", "onTimeupdate", "onWebkitbeginfullscreen", "onX5videoenterfullscreen", "onWebkitendfullscreen", "onX5videoexitfullscreen"]), Wo(ei("div", {
			class: "uni-video-bar uni-video-bar-full",
			onClick: Ts((() => {
			}), ["stop"])
		}, [ei("div", {class: "uni-video-controls"}, [Wo(ei("div", {
			class: {
				"uni-video-control-button": !0,
				"uni-video-control-button-play": !d.playing,
				"uni-video-control-button-pause": d.playing
			}, onClick: Ts(g, ["stop"])
		}, null, 10, ["onClick"]), [[Ss, e.showPlayBtn]]), Wo(ei("div", {class: "uni-video-current-time"}, [ym(d.currentTime)], 512), [[Ss, e.showProgress]]), Wo(ei("div", {
			ref: V,
			class: "uni-video-progress-container",
			onClick: Ts($, ["stop"])
		}, [ei("div", {class: "uni-video-progress"}, [ei("div", {
			style: {width: d.buffered + "%"},
			class: "uni-video-progress-buffered"
		}, null, 4), ei("div", {
			ref: W,
			style: {left: d.progress + "%"},
			class: "uni-video-ball"
		}, [ei("div", {class: "uni-video-inner"}, null)], 4)])], 8, ["onClick"]), [[Ss, e.showProgress]]), Wo(ei("div", {class: "uni-video-duration"}, [ym(Number(e.duration) || d.duration)], 512), [[Ss, e.showProgress]])]), Wo(ei("div", {
			class: {
				"uni-video-danmu-button": !0,
				"uni-video-danmu-button-active": k.enable
			}, onClick: Ts(B, ["stop"])
		}, [c("uni.video.danmu")], 10, ["onClick"]), [[Ss, e.danmuBtn]]), Wo(ei("div", {
			class: {
				"uni-video-fullscreen": !0,
				"uni-video-type-fullscreen": O.fullscreen
			}, onClick: Ts((() => F(!O.fullscreen)), ["stop"])
		}, null, 10, ["onClick"]), [[Ss, e.showFullscreenBtn]])], 8, ["onClick"]), [[Ss, q.controlsShow]]), Wo(ei("div", {
			ref: A,
			style: "z-index: 0;",
			class: "uni-video-danmu"
		}, null, 512), [[Ss, d.start && k.enable]]), q.centerPlayBtnShow && ei("div", {
			class: "uni-video-cover",
			onClick: Ts((() => {
			}), ["stop"])
		}, [ei("div", {
			class: "uni-video-cover-play-button",
			onClick: Ts(p, ["stop"])
		}, null, 8, ["onClick"]), ei("p", {class: "uni-video-cover-duration"}, [ym(Number(e.duration) || d.duration)])], 8, ["onClick"]), ei("div", {
			class: {
				"uni-video-toast": !0,
				"uni-video-toast-volume": "volume" === R.gestureType
			}
		}, [ei("div", {class: "uni-video-toast-title"}, [c("uni.video.volume")]), ei("svg", {
			class: "uni-video-toast-icon",
			width: "200px",
			height: "200px",
			viewBox: "0 0 1024 1024",
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg"
		}, [ei("path", {d: "M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"}, null)]), ei("div", {class: "uni-video-toast-value"}, [ei("div", {
			style: {width: 100 * R.volumeNew + "%"},
			class: "uni-video-toast-value-content"
		}, [ei("div", {class: "uni-video-toast-volume-grids"}, [Go(10, (() => ei("div", {class: "uni-video-toast-volume-grids-item"}, null)))])], 4)])], 2), ei("div", {
			class: {
				"uni-video-toast": !0,
				"uni-video-toast-progress": "progress" === R.gestureType
			}
		}, [ei("div", {class: "uni-video-toast-title"}, [ym(R.currentTimeNew), " / ", ym(d.duration)])], 2), ei("div", {class: "uni-video-slots"}, [o.default && o.default()])], 40, ["onTouchstart", "onTouchend", "onTouchmove", "onFullscreenchange", "onWebkitfullscreenchange"])], 8, ["id"])
	}
}), Tm = ({name: e, arg: t}) => {
	"postMessage" === e || uni[e](t)
}, Sm = fe((() => dv.on("onWebInvokeAppService", Tm))), Em = nu({
	inheritAttrs: !1,
	name: "WebView",
	props: {src: {type: String, default: ""}, fullscreen: {type: Boolean, default: !0}},
	setup(e) {
		Sm();
		const t = rn(null), n = rn(null), {$attrs: o, $excludeAttrs: r, $listeners: i} = vf({excludeListeners: !0});
		let s;
		return (() => {
			const r = document.createElement("iframe");
			Gn((() => {
				for (const e in o.value) if (B(o.value, e)) {
					const t = o.value[e];
					r[e] = t
				}
			})), Gn((() => {
				r.src = gu(e.src)
			})), n.value = r, s = function (e, t, n) {
				return () => {
					var o, r;
					if (n) {
						const {top: n, left: o, width: r, height: i} = e.value.getBoundingClientRect();
						pe(t.value, {
							position: "absolute",
							display: "block",
							border: "0",
							top: n + "px",
							left: o + "px",
							width: r + "px",
							height: i + "px"
						})
					} else pe(t.value, {
						width: (null == (o = e.value) ? void 0 : o.style.width) || "300px",
						height: (null == (r = e.value) ? void 0 : r.style.height) || "150px"
					})
				}
			}(t, n, e.fullscreen), e.fullscreen && document.body.appendChild(r)
		})(), Fo((() => {
			var o;
			s(), !e.fullscreen && (null == (o = t.value) || o.appendChild(n.value))
		})), To((() => {
			e.fullscreen && (n.value.style.display = "block")
		})), So((() => {
			e.fullscreen && (n.value.style.display = "none")
		})), Ro((() => {
			e.fullscreen && document.body.removeChild(n.value)
		})), () => ei(jr, null, [ei("uni-web-view", ai({class: e.fullscreen ? "uni-webview--fullscreen" : ""}, i.value, r.value, {ref: t}), [ei(Lp, {onResize: s}, null, 8, ["onResize"])], 16)])
	}
});
const km = ld("makePhoneCall", (({phoneNumber: e}, {resolve: t}) => (window.location.href = `tel:${e}`, t()))),
	Am = navigator.cookieEnabled && (window.localStorage || window.sessionStorage) || {};
let Cm;

function Bm() {
	if (Cm = Cm || Am.__DC_STAT_UUID, !Cm) {
		Cm = Date.now() + "" + Math.floor(1e7 * Math.random());
		try {
			Am.__DC_STAT_UUID = Cm
		} catch (e) {
		}
	}
	return Cm
}

function Pm() {
	if (!0 !== __uniConfig.darkmode) return F(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
	try {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
	} catch (e) {
		return "light"
	}
}

function Lm() {
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
			s = [/\bAndroid\b/i, /\bLinux\b/i, /\bU\b/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /\bwv\b/i, /\/[\d\.,]+$/, /^\s?[\d\.,]+$/, /\bBrowser\b/i, /\bMobile\b/i];
		for (let e = 0; e < i.length; e++) {
			const t = i[e];
			if (t.indexOf("Build") > 0) {
				n = t.split("Build")[0].trim();
				break
			}
			let o;
			for (let e = 0; e < s.length; e++) if (s[e].test(t)) {
				o = !0;
				break
			}
			if (!o) {
				n = t.trim();
				break
			}
		}
	} else if (Tu) n = "iPad", e = "iOS", o = "pad", t = M(window.BigInt) ? "14.0" : "13.0"; else if (_u || wu || xu) {
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
	const i = `${e} ${t}`, s = e.toLocaleLowerCase();
	let a = "", l = String(function () {
		const e = navigator.userAgent, t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1,
			n = e.indexOf("Edge") > -1 && !t, o = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
		if (t) {
			new RegExp("MSIE (\\d+\\.\\d+);").test(e);
			const t = parseFloat(RegExp.$1);
			return t > 6 ? t : 6
		}
		return n ? -1 : o ? 11 : -1
	}());
	if ("-1" !== l) a = "IE"; else {
		const e = ["Version", "Firefox", "Chrome", "Edge{0,1}"], t = ["Safari", "Firefox", "Chrome", "Edge"];
		for (let n = 0; n < e.length; n++) {
			const o = e[n], r = new RegExp(`(${o})/(\\S*)\\b`);
			r.test(vu) && (a = t[n], l = vu.match(r)[2])
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
		platform: s,
		browserName: a.toLocaleLowerCase(),
		browserVersion: l,
		language: r,
		deviceType: o,
		ua: vu,
		osname: e,
		osversion: t,
		theme: Pm()
	}
}

const Om = ad(0, (() => {
	const e = window.devicePixelRatio, t = Su(), n = Eu(t), o = ku(t, n), r = function (e, t) {
		return e ? Math[t ? "min" : "max"](screen.height, screen.width) : screen.height
	}(t, n), i = Au(o);
	let s = window.innerHeight;
	const a = nc.top, l = {
		left: nc.left,
		right: i - nc.right,
		top: nc.top,
		bottom: s - nc.bottom,
		width: i - nc.left - nc.right,
		height: s - nc.top - nc.bottom
	}, {top: c, bottom: u} = sc();
	return s -= c, s -= u, {
		windowTop: c,
		windowBottom: u,
		windowWidth: i,
		windowHeight: s,
		pixelRatio: e,
		screenWidth: o,
		screenHeight: r,
		statusBarHeight: a,
		safeArea: l,
		safeAreaInsets: {top: nc.top, right: nc.right, bottom: nc.bottom, left: nc.left},
		screenTop: r - s
	}
}));
let Im, Mm = !0;

function Fm() {
	Mm && (Im = Lm())
}

const jm = ad(0, (() => {
	Fm();
	const {deviceBrand: e, deviceModel: t, brand: n, model: o, platform: r, system: i, deviceOrientation: s, deviceType: a} = Im;
	return {
		brand: n,
		deviceBrand: e,
		deviceModel: t,
		devicePixelRatio: window.devicePixelRatio,
		deviceId: Bm(),
		deviceOrientation: s,
		deviceType: a,
		model: o,
		platform: r,
		system: i
	}
})), Nm = ad(0, (() => {
	Fm();
	const {theme: e, language: t, browserName: n, browserVersion: o} = Im;
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
})), Rm = ad(0, (() => {
	Mm = !0, Fm(), Mm = !1;
	const e = Om(), t = jm(), n = Nm();
	Mm = !0;
	const {ua: o, browserName: r, browserVersion: i, osname: s, osversion: a} = Im, l = k(e, t, n, {
		ua: o,
		browserName: r,
		browserVersion: i,
		uniPlatform: "web",
		uniCompileVersion: __uniConfig.compilerVersion,
		uniRuntimeVersion: __uniConfig.compilerVersion,
		fontSizeSetting: void 0,
		osName: s.toLocaleLowerCase(),
		osVersion: a,
		osLanguage: void 0,
		osTheme: void 0
	});
	return delete l.screenTop, delete l.enableDebug, __uniConfig.darkmode || delete l.theme, function (e) {
		let t = {};
		return z(e) && Object.keys(e).sort().forEach((n => {
			const o = n;
			t[o] = e[o]
		})), Object.keys(t) ? t : e
	}(l)
}));
const Dm = ad(0, ((e, t) => {
	const n = typeof t, o = "string" === n ? t : JSON.stringify({type: n, data: t});
	localStorage.setItem(e, o)
})), Hm = ld("setStorage", (({key: e, data: t}, {resolve: n, reject: o}) => {
	try {
		Dm(e, t), n()
	} catch (r) {
		o(r.message)
	}
}));

function zm(e) {
	const t = localStorage && localStorage.getItem(e);
	if (!F(t)) throw new Error("data not found");
	let n = t;
	try {
		const e = function (e) {
			const t = ["object", "string", "number", "boolean", "undefined"];
			try {
				const n = F(e) ? JSON.parse(e) : e, o = n.type;
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

const qm = ad(0, (e => {
	try {
		return zm(e)
	} catch (t) {
		return ""
	}
})), Vm = ld("getStorage", (({key: e}, {resolve: t, reject: n}) => {
	try {
		t({data: zm(e)})
	} catch (o) {
		n(o.message)
	}
})), Wm = ad(0, (e => {
	localStorage && localStorage.removeItem(e)
})), $m = ld("removeStorage", (({key: e}, {resolve: t}) => {
	Wm(e), t()
})), Qm = ld("hideKeyboard", ((e, {resolve: t, reject: n}) => {
	const o = document.activeElement;
	!o || "TEXTAREA" !== o.tagName && "INPUT" !== o.tagName || (o.blur(), t())
})), Um = {
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

function Xm({count: e, sourceType: t, type: n, extension: o}) {
	const r = document.createElement("input");
	return r.type = "file", pe(r, {
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
			return `${n}/${Um[n][t] || t}`
		}
		return function () {
			const e = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
			return !(!e || "micromessenger" !== e[0])
		}() ? "." : 0 === e.indexOf(".") ? e : `.${e}`
	})).join(","), e && e > 1 && (r.multiple = !0), "all" !== n && t instanceof Array && 1 === t.length && "camera" === t[0] && r.setAttribute("capture", "camera"), r
}

tf();
let Ym = null;
const Jm = ld("chooseFile", (({count: e, sourceType: t, type: n, extension: o}, {resolve: r, reject: i}) => {
	Cl();
	const {t: s} = Tl();
	Ym && (document.body.removeChild(Ym), Ym = null), Ym = Xm({
		count: e,
		sourceType: t,
		type: n,
		extension: o
	}), document.body.appendChild(Ym), Ym.addEventListener("change", (function (t) {
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
	})), Ym.click(), nf() || console.warn(s("uni.chooseFile.notUserActivation"))
}), 0, ep);
let Gm = null;
const Km = ld("chooseImage", (({count: e, sourceType: t, extension: n}, {resolve: o, reject: r}) => {
	Cl();
	const {t: i} = Tl();
	Gm && (document.body.removeChild(Gm), Gm = null), Gm = Xm({
		count: e,
		sourceType: t,
		extension: n,
		type: "image"
	}), document.body.appendChild(Gm), Gm.addEventListener("change", (function (t) {
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
	})), Gm.click(), nf() || console.warn(i("uni.chooseFile.notUserActivation"))
}), 0, Gd), Zm = {esc: ["Esc", "Escape"], enter: ["Enter"]}, eg = Object.keys(Zm);

function tg(e, t, n) {
	return t.onClose = (...e) => (t.visible = !1, n.apply(null, e)), Cs(ho({setup: () => () => (qr(), Ur(e, t, null, 16))}))
}

function ng(e) {
	let t = document.getElementById(e);
	return t || (t = document.createElement("div"), t.id = e, document.body.append(t)), t
}

function og(e, {onEsc: t, onEnter: n}) {
	const o = rn(e.visible), {key: r, disable: i} = function () {
		const e = rn(""), t = rn(!1), n = n => {
			if (t.value) return;
			const o = eg.find((e => -1 !== Zm[e].indexOf(n.key)));
			o && (e.value = o), Cn((() => e.value = ""))
		};
		return Fo((() => {
			document.addEventListener("keyup", n)
		})), Ro((() => {
			document.removeEventListener("keyup", n)
		})), {key: e, disable: t}
	}();
	return Zn((() => e.visible), (e => o.value = e)), Zn((() => o.value), (e => i.value = !e)), Gn((() => {
		const {value: e} = r;
		"esc" === e ? t && t() : "enter" === e && n && n()
	})), o
}

let rg = 0, ig = "";

function sg(e) {
	let t = rg;
	rg += e ? 1 : -1, rg = Math.max(0, rg), rg > 0 ? 0 === t && (ig = document.body.style.overflow, document.body.style.overflow = "hidden") : (document.body.style.overflow = ig, ig = "")
}

const ag = ou({
	name: "ImageView", props: {src: {type: String, default: ""}}, setup(e) {
		const t = Wt({direction: "none"});
		let n = 1, o = 0, r = 0, i = 0, s = 0;

		function a({detail: e}) {
			n = e.scale
		}

		function l(e) {
			const t = e.target.getBoundingClientRect();
			o = t.width, r = t.height
		}

		function c(e) {
			const t = e.target.getBoundingClientRect();
			i = t.width, s = t.height, d(e)
		}

		function u(e) {
			const a = n * o > i, l = n * r > s;
			t.direction = a && l ? "all" : a ? "horizontal" : l ? "vertical" : "none", d(e)
		}

		function d(e) {
			"all" !== t.direction && "horizontal" !== t.direction || e.stopPropagation()
		}

		return () => {
			const n = {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"};
			return ei(yf, {
				style: n,
				onTouchstart: au(c),
				onTouchmove: au(d),
				onTouchend: au(u)
			}, {
				default: () => [ei(Of, {
					style: n,
					direction: t.direction,
					inertia: !0,
					scale: !0,
					"scale-min": "1",
					"scale-max": "4",
					onScale: a
				}, {
					default: () => [ei("img", {
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

function lg(e) {
	let t = "number" == typeof e.current ? e.current : e.urls.indexOf(e.current);
	return t = t < 0 ? 0 : t, t
}

const cg = ou({
	name: "ImagePreview",
	props: {urls: {type: Array, default: () => []}, current: {type: [Number, String], default: 0}},
	emits: ["close"],
	setup(e, {emit: t}) {
		Fo((() => sg(!0))), Do((() => sg(!1)));
		const n = rn(null), o = rn(lg(e));
		let r;

		function i() {
			r || Cn((() => {
				t("close")
			}))
		}

		function s(e) {
			o.value = e.detail.current
		}

		Zn((() => e.current), (() => o.value = lg(e))), Fo((() => {
			const e = n.value;
			let t = 0, o = 0;
			e.addEventListener("mousedown", (e => {
				r = !1, t = e.clientX, o = e.clientY
			})), e.addEventListener("mouseup", (e => {
				(Math.abs(e.clientX - t) > 20 || Math.abs(e.clientY - o) > 20) && (r = !0)
			}))
		}));
		const a = {
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
			return ei("div", {
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
			}, [ei(sh, {
				navigation: "auto",
				current: o.value,
				onChange: s,
				"indicator-dots": !1,
				autoplay: !1,
				style: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"}
			}, (r = t = e.urls.map((e => ei(lh, null, {default: () => [ei(ag, {src: e}, null, 8, ["src"])]}))), "function" == typeof r || "[object Object]" === Object.prototype.toString.call(r) && !Xr(r) ? t : {
				default: () => [t],
				_: 1
			}), 8, ["current", "onChange"]), ei("div", {style: a}, [hc("M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z", "#ffffff", 26)], 4)], 8, ["onClick"]);
			var r
		}
	}
});
let ug, dg = null;
const pg = () => {
	dg = null, Cn((() => {
		null == ug || ug.unmount(), ug = null
	}))
}, fg = ld("previewImage", ((e, {resolve: t}) => {
	dg ? k(dg, e) : (dg = Wt(e), Cn((() => {
		ug = tg(cg, dg, pg), ug.mount(ng("u-a-p"))
	}))), t()
}), 0, tp);
let hg = null;
const mg = ld("chooseVideo", (({sourceType: e, extension: t}, {resolve: n, reject: o}) => {
		Cl();
		const {t: r} = Tl();
		hg && (document.body.removeChild(hg), hg = null), hg = Xm({
			sourceType: e,
			extension: t,
			type: "video"
		}), document.body.appendChild(hg), hg.addEventListener("change", (function (e) {
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
					Cp(e), n(k(r, {duration: i.duration || 0, width: i.videoWidth || 0, height: i.videoHeight || 0}))
				}, setTimeout((() => {
					i.onloadedmetadata = null, Cp(e), n(r)
				}), 300), i.src = e
			} else n(r)
		})), hg.click(), nf() || console.warn(r("uni.chooseFile.notUserActivation"))
	}), 0, Kd),
	gg = sd("request", (({url: e, data: t, header: n, method: o, dataType: r, responseType: i, withCredentials: s, timeout: a = __uniConfig.networkTimeout.request}, {resolve: l, reject: c}) => {
		let u = null;
		const d = function (e) {
			const t = Object.keys(e).find((e => "content-type" === e.toLowerCase()));
			if (!t) return;
			const n = e[t];
			if (0 === n.indexOf("application/json")) return "json";
			if (0 === n.indexOf("application/x-www-form-urlencoded")) return "urlencoded";
			return "string"
		}(n);
		if ("GET" !== o) if (F(t) || t instanceof ArrayBuffer) u = t; else if ("json" === d) try {
			u = JSON.stringify(t)
		} catch (m) {
			u = t.toString()
		} else if ("urlencoded" === d) {
			const e = [];
			for (const n in t) B(t, n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
			u = e.join("&")
		} else u = t.toString();
		const p = new XMLHttpRequest, f = new vg(p);
		p.open(o, e);
		for (const g in n) B(n, g) && p.setRequestHeader(g, n[g]);
		const h = setTimeout((function () {
			p.onload = p.onabort = p.onerror = null, f.abort(), c("timeout")
		}), a);
		return p.responseType = i, p.onload = function () {
			clearTimeout(h);
			const e = p.status;
			let t = "text" === i ? p.responseText : p.response;
			if ("text" === i && "json" === r) try {
				t = JSON.parse(t)
			} catch (m) {
			}
			l({data: t, statusCode: e, header: bg(p.getAllResponseHeaders()), cookies: []})
		}, p.onabort = function () {
			clearTimeout(h), c("abort")
		}, p.onerror = function () {
			clearTimeout(h), c()
		}, p.withCredentials = s, p.send(u), f
	}), 0, ip);

class vg {
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

function bg(e) {
	const t = {};
	return e.split("\n").forEach((e => {
		const n = e.match(/(\S+\s*):\s*(.*)/);
		n && 3 === n.length && (t[n[1]] = n[2])
	})), t
}

class yg {
	constructor(e) {
		this._callbacks = [], this._xhr = e
	}

	onProgressUpdate(e) {
		M(e) && this._callbacks.push(e)
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

const _g = sd("downloadFile", (({url: e, header: t, timeout: n = __uniConfig.networkTimeout.downloadFile}, {resolve: o, reject: r}) => {
	var i, s = new XMLHttpRequest, a = new yg(s);
	return s.open("GET", e, !0), Object.keys(t).forEach((e => {
		s.setRequestHeader(e, t[e])
	})), s.responseType = "blob", s.onload = function () {
		clearTimeout(i);
		const t = s.status, n = this.response;
		let r;
		const a = s.getResponseHeader("content-disposition");
		if (a) {
			const e = a.match(/filename="?(\S+)"?\b/);
			e && (r = e[1])
		}
		n.name = r || function (e) {
			const t = (e = e.split("#")[0].split("?")[0]).split("/");
			return t[t.length - 1]
		}(e), o({statusCode: t, tempFilePath: Ap(n)})
	}, s.onabort = function () {
		clearTimeout(i), r("abort")
	}, s.onerror = function () {
		clearTimeout(i), r()
	}, s.onprogress = function (e) {
		a._callbacks.forEach((t => {
			var n = e.loaded, o = e.total;
			t({progress: Math.round(n / o * 100), totalBytesWritten: n, totalBytesExpectedToWrite: o})
		}))
	}, s.send(), i = setTimeout((function () {
		s.onprogress = s.onload = s.onabort = s.onerror = null, a.abort(), r("timeout")
	}), n), a
}), 0, sp);

class wg {
	constructor(e) {
		this._callbacks = [], this._xhr = e
	}

	onProgressUpdate(e) {
		M(e) && this._callbacks.push(e)
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

const xg = sd("uploadFile", (({url: e, file: t, filePath: n, name: o, files: r, header: i, formData: s, timeout: a = __uniConfig.networkTimeout.uploadFile}, {resolve: l, reject: c}) => {
	var u = new wg;
	return P(r) && r.length || (r = [{
		name: o,
		file: t,
		uri: n
	}]), Promise.all(r.map((({file: e, uri: t}) => e instanceof Blob ? Promise.resolve(kp(e)) : Ep(t)))).then((function (t) {
		var n, o = new XMLHttpRequest, d = new FormData;
		Object.keys(s).forEach((e => {
			d.append(e, s[e])
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
		}), a), o.send(d), u._xhr = o)
	})).catch((() => {
		setTimeout((() => {
			c("file error")
		}), 0)
	})), u
}), 0, ap), Tg = ld("navigateBack", ((e, {resolve: t, reject: n}) => {
	let o = !0;
	return !0 === Tc("onBackPress", {from: e.from || "navigateBack"}) && (o = !1), o ? (um().$router.go(-e.delta), t()) : n("onBackPress")
}), 0, fp);

function Sg({type: e, url: t, tabBarText: n, events: o}, r) {
	const i = um().$router, {path: s, query: a} = function (e) {
		const [t, n] = e.split("?", 2);
		return {path: t, query: Te(n || "")}
	}(t);
	return new Promise(((t, l) => {
		const c = function (e, t) {
			return {__id__: t || ++qh, __type__: e}
		}(e, r);
		i["navigateTo" === e ? "push" : "replace"]({path: s, query: a, state: c, force: !0}).then((r => {
			if (ba(r)) return l(r.message);
			if ("switchTab" === e && (i.currentRoute.value.meta.tabBarText = n), "navigateTo" === e) {
				const e = i.currentRoute.value.meta;
				return e.eventChannel ? o && (Object.keys(o).forEach((t => {
					e.eventChannel._addListener(t, "on", o[t])
				})), e.eventChannel._clearCache()) : e.eventChannel = new Ee(c.__id__, o), t({eventChannel: e.eventChannel})
			}
			return t()
		}))
	}))
}

const Eg = ld("navigateTo", (({url: e, events: t}, {resolve: n, reject: o}) => Sg({
	type: "navigateTo",
	url: e,
	events: t
}).then(n).catch(o)), 0, cp);
const kg = ld("redirectTo", (({url: e}, {resolve: t, reject: n}) => (function () {
	const e = vc();
	if (!e) return;
	const t = e.$page;
	zh($h(t.path, t.id))
}(), Sg({type: "redirectTo", url: e}).then(t).catch(n))), 0, up);
const Ag = ld("reLaunch", (({url: e}, {resolve: t, reject: n}) => (function () {
	const e = Dh().keys();
	for (const t of e) zh(t)
}(), Sg({type: "reLaunch", url: e}).then(t).catch(n))), 0, dp);

function Cg(e, t) {
	return e === t.fullPath || "/" === e && t.meta.isEntry
}

const Bg = ld("switchTab", (({url: e, tabBarText: t}, {resolve: n, reject: o}) => (function () {
	const e = _c();
	if (!e) return;
	const t = Dh(), n = t.keys();
	for (const o of n) {
		const e = t.get(o);
		e.$.__isTabBar ? e.$.__isActive = !1 : zh(o)
	}
	e.$.__isTabBar && (e.$.__isVisible = !1, Tc(e, "onHide"))
}(), Sg({type: "switchTab", url: e, tabBarText: t}, function (e) {
	const t = Dh().values();
	for (const n of t) {
		const t = n.$page;
		if (Cg(e, t)) return n.$.__isActive = !0, t.id
	}
}(e)).then(n).catch(o))), 0, pp);

function Pg(e) {
	__uniConfig.darkmode && dv.on("onThemeChange", e)
}

function Lg(e) {
	let t = {};
	return __uniConfig.darkmode && (t = Me(e, __uniConfig.themeConfig, Pm())), __uniConfig.darkmode ? t : e
}

const Og = {
	title: {type: String, default: ""},
	icon: {default: "success", validator: e => -1 !== _p.indexOf(e)},
	image: {type: String, default: ""},
	duration: {type: Number, default: 1500},
	mask: {type: Boolean, default: !1},
	visible: {type: Boolean}
}, Ig = {light: "#fff", dark: "rgba(255,255,255,0.9)"}, Mg = e => Ig[e], Fg = ho({
	name: "Toast", props: Og, setup(e) {
		kl(), Al();
		const {Icon: t} = function (e) {
			const t = rn(Mg(Pm())), n = ({theme: e}) => t.value = Mg(e);
			Gn((() => {
				var t;
				e.visible ? Pg(n) : (t = n, dv.off("onThemeChange", t))
			}));
			return {
				Icon: wi((() => {
					switch (e.icon) {
						case"success":
							return ei(hc(pc, t.value, 38), {class: "uni-toast__icon"});
						case"error":
							return ei(hc(fc, t.value, 38), {class: "uni-toast__icon"});
						case"loading":
							return ei("i", {class: ["uni-toast__icon", "uni-loading"]}, null, 2);
						default:
							return null
					}
				}))
			}
		}(e), n = og(e, {});
		return () => {
			const {mask: o, duration: r, title: i, image: s} = e;
			return ei(Ji, {name: "uni-fade"}, {
				default: () => [Wo(ei("uni-toast", {"data-duration": r}, [o ? ei("div", {
					class: "uni-mask",
					style: "background: transparent;",
					onTouchmove: oc
				}, null, 40, ["onTouchmove"]) : "", s || t.value ? ei("div", {class: "uni-toast"}, [s ? ei("img", {
					src: s,
					class: "uni-toast__icon"
				}, null, 10, ["src"]) : t.value, ei("p", {class: "uni-toast__content"}, [i])]) : ei("div", {class: "uni-sample-toast"}, [ei("p", {class: "uni-simple-toast__text"}, [i])])], 8, ["data-duration"]), [[Ss, n.value]])]
			})
		}
	}
});
let jg, Ng, Rg = "";
const Dg = Ne();

function Hg(e) {
	jg ? k(jg, e) : (jg = Wt(k(e, {visible: !1})), Cn((() => {
		Dg.run((() => {
			Zn([() => jg.visible, () => jg.duration], (([e, t]) => {
				if (e) {
					if (Ng && clearTimeout(Ng), "onShowLoading" === Rg) return;
					Ng = setTimeout((() => {
						qg("onHideToast")
					}), t)
				} else Ng && clearTimeout(Ng)
			}))
		})), dv.on("onHidePopup", (() => qg("onHidePopup"))), tg(Fg, jg, (() => {
		})).mount(ng("u-a-t"))
	}))), setTimeout((() => {
		jg.visible = !0
	}), 10)
}

const zg = ld("showToast", ((e, {resolve: t, reject: n}) => {
	Hg(e), Rg = "onShowToast", t()
}), 0, wp);

function qg(e) {
	const {t: t} = Tl();
	if (!Rg) return;
	let n = "";
	if ("onHideToast" === e && "onShowToast" !== Rg ? n = t("uni.showToast.unpaired") : "onHideLoading" === e && "onShowLoading" !== Rg && (n = t("uni.showLoading.unpaired")), n) return console.warn(n);
	Rg = "", setTimeout((() => {
		jg.visible = !1
	}), 10)
}

const Vg = ld("loadFontFace", (({family: e, source: t, desc: n}, {resolve: o, reject: r}) => {
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
				const {style: e, weight: t, stretch: o, unicodeRange: r, variant: s, featureSettings: a} = n;
				e && i.push(`font-style:${e}`), t && i.push(`font-weight:${t}`), o && i.push(`font-stretch:${o}`), r && i.push(`unicode-range:${r}`), s && i.push(`font-variant:${s}`), a && i.push(`font-feature-settings:${a}`)
			}
			r.innerText = `@font-face{font-family:"${e}";src:${t};${i.join(";")}}`, document.head.appendChild(r), o()
		}))
	})(e, t, n).then((() => {
		o()
	})).catch((e => {
		r(`loadFontFace:fail ${e}`)
	}))
}));

function Wg(e) {
	function t() {
		var t;
		t = e.navigationBar.titleText, document.title = t, dv.emit("onNavigationBarChange", {titleText: t})
	}

	Gn(t), To(t)
}

const $g = ld("setNavigationBarTitle", ((e, {resolve: t, reject: n}) => {
		!function (e, t, n, o, r) {
			if (!e) return r("page not found");
			const {navigationBar: i} = e;
			switch (t) {
				case"setNavigationBarColor":
					const {frontColor: e, backgroundColor: t, animation: o} = n, {duration: r, timingFunc: s} = o;
					e && (i.titleColor = "#000000" === e ? "#000000" : "#ffffff"), t && (i.backgroundColor = t), i.duration = r + "ms", i.timingFunc = s;
					break;
				case"showNavigationBarLoading":
					i.loading = !0;
					break;
				case"hideNavigationBarLoading":
					i.loading = !1;
					break;
				case"setNavigationBarTitle":
					const {title: a} = n;
					i.titleText = a
			}
			o()
		}(bc(), "setNavigationBarTitle", e, t, n)
	})), Qg = ld("pageScrollTo", (({scrollTop: e, selector: t, duration: n}, {resolve: o}) => {
		!function (e, t, n) {
			if (F(e)) {
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
			const s = t => {
				if (t <= 0) return void window.scrollTo(0, e);
				const n = e - window.scrollY;
				requestAnimationFrame((function () {
					window.scrollTo(0, window.scrollY + n / t * 10), s(t - 10)
				}))
			};
			s(t)
		}(t || e || 0, n, !0), o()
	}), 0, yp), Ug = ld("startPullDownRefresh", ((e, {resolve: t}) => {
		dv.invokeViewMethod("startPullDownRefresh", {}, yc()), t()
	})), Xg = ld("stopPullDownRefresh", ((e, {resolve: t}) => {
		dv.invokeViewMethod("stopPullDownRefresh", {}, yc()), t()
	})), Yg = ["text", "iconPath", "iconfont", "selectedIconPath", "visible"],
	Jg = ["color", "selectedColor", "backgroundColor", "borderStyle", "midButton"], Gg = ["badge", "redDot"];

function Kg(e, t, n) {
	t.forEach((function (t) {
		B(n, t) && (e[t] = n[t])
	}))
}

function Zg(e, t, n) {
	const o = Ph();
	switch (e) {
		case"showTabBar":
			o.shown = !0;
			break;
		case"hideTabBar":
			o.shown = !1;
			break;
		case"setTabBarItem":
			const {index: e} = t, n = o.list[e], r = n.pagePath;
			Kg(n, Yg, t);
			const {pagePath: i} = t;
			if (i) {
				const t = ue(i);
				t !== r && function (e, t, n) {
					const o = Bc(ue(t));
					if (o) {
						const {meta: e} = o;
						delete e.tabBarIndex, e.isQuit = e.isTabBar = !1
					}
					const r = Bc(ue(n));
					if (r) {
						const {meta: t} = r;
						t.tabBarIndex = e, t.isQuit = t.isTabBar = !0;
						const o = __uniConfig.tabBar;
						o && o.list && o.list[e] && (o.list[e].pagePath = de(n))
					}
				}(e, r, t)
			}
			break;
		case"setTabBarStyle":
			Kg(o, Jg, t);
			break;
		case"showTabBarRedDot":
			Kg(o.list[t.index], Gg, {badge: "", redDot: !0});
			break;
		case"setTabBarBadge":
			Kg(o.list[t.index], Gg, {badge: t.text, redDot: !0});
			break;
		case"hideTabBarRedDot":
		case"removeTabBarBadge":
			Kg(o.list[t.index], Gg, {badge: "", redDot: !1})
	}
	n()
}

const ev = ld("hideTabBar", ((e, {resolve: t}) => {
	Zg("hideTabBar", e || {}, t)
})), tv = ou({
	name: "TabBar", setup() {
		const e = rn([]), t = Ph(), n = Wt(Lg(t));
		!function (e, t) {
			function n() {
				let n = [];
				n = e.list.filter((e => !1 !== e.visible)), t.value = n
			}

			rn(k({type: "midButton"}, e.midButton)), Gn(n)
		}(n, e), function (e) {
			Zn((() => e.shown), (t => {
				lc({"--window-bottom": Nh(t ? parseInt(e.height) : 0)})
			}))
		}(n);
		const o = function (e, t, n) {
			return Gn((() => {
				const o = e.meta;
				if (o.isTabBar) {
					const e = o.route, r = n.value.findIndex((t => t.pagePath === e));
					t.selectedIndex = r
				}
			})), (t, n) => () => {
				const {pagePath: o, text: r} = t;
				let i = ue(o);
				i === __uniRoutes[0].alias && (i = "/"), e.path !== i ? Bg({
					from: "tabBar",
					url: i,
					tabBarText: r
				}) : Tc("onTabItemTap", {index: n, text: r, pagePath: o})
			}
		}(vl(), n, e), {style: r, borderStyle: i, placeholderStyle: s} = function (e) {
			const t = wi((() => {
				let t = e.backgroundColor;
				const n = e.blurEffect;
				return t || Fh && n && "none" !== n && (t = nv[n]), {
					backgroundColor: t || "#f7f7fa",
					backdropFilter: "none" !== n ? "blur(10px)" : n
				}
			})), n = wi((() => {
				const {borderStyle: t} = e;
				return {backgroundColor: ov[t] || t}
			})), o = wi((() => ({height: e.height})));
			return {style: t, borderStyle: n, placeholderStyle: o}
		}(n);
		return Pg((() => {
			const e = Lg(t);
			n.backgroundColor = e.backgroundColor, n.borderStyle = e.borderStyle, n.color = e.color, n.selectedColor = e.selectedColor, n.blurEffect = e.blurEffect, e.list && e.list.length && e.list.forEach(((e, t) => {
				n.list[t].iconPath = e.iconPath, n.list[t].selectedIconPath = e.selectedIconPath
			}))
		})), Fo((() => {
			n.iconfontSrc && Vg({family: "UniTabbarIconFont", source: `url("${n.iconfontSrc}")`})
		})), () => {
			const t = function (e, t, n) {
				const {selectedIndex: o, selectedColor: r, color: i} = e;
				return n.value.map(((n, s) => {
					const a = o === s;
					return function (e, t, n, o, r, i, s, a) {
						return ei("div", {
							key: s,
							class: "uni-tabbar__item",
							onClick: a(r, s)
						}, [rv(e, t || "", n, o, r, i)], 8, ["onClick"])
					}(a ? r : i, a && n.selectedIconPath || n.iconPath || "", n.iconfont ? a && n.iconfont.selectedText || n.iconfont.text : void 0, n.iconfont ? a && n.iconfont.selectedColor || n.iconfont.color : void 0, n, e, s, t)
				}))
			}(n, o, e);
			return ei("uni-tabbar", {class: "uni-tabbar-" + n.position}, [ei("div", {
				class: "uni-tabbar",
				style: r.value
			}, [ei("div", {
				class: "uni-tabbar-border",
				style: i.value
			}, null, 4), t], 4), ei("div", {class: "uni-placeholder", style: s.value}, null, 4)], 2)
		}
	}
});
const nv = {dark: "rgb(0, 0, 0, 0.8)", light: "rgb(250, 250, 250, 0.8)", extralight: "rgb(250, 250, 250, 0.8)"},
	ov = {white: "rgba(255, 255, 255, 0.33)", black: "rgba(0, 0, 0, 0.33)"};

function rv(e, t, n, o, r, i) {
	const {height: s} = i;
	return ei("div", {
		class: "uni-tabbar__bd",
		style: {height: s}
	}, [n ? sv(n, o || "rgb(0, 0, 0, 0.8)", r, i) : t && iv(t, r, i), r.text && av(e, r, i), r.redDot && lv(r.badge)], 4)
}

function iv(e, t, n) {
	const {type: o, text: r} = t, {iconWidth: i} = n;
	return ei("div", {
		class: "uni-tabbar__icon" + (r ? " uni-tabbar__icon__diff" : ""),
		style: {width: i, height: i}
	}, ["midButton" !== o && ei("img", {src: gu(e)}, null, 8, ["src"])], 6)
}

function sv(e, t, n, o) {
	var r;
	const {type: i, text: s} = n, {iconWidth: a} = o, l = "uni-tabbar__icon" + (s ? " uni-tabbar__icon__diff" : ""),
		c = {width: a, height: a}, u = {fontSize: (null == (r = n.iconfont) ? void 0 : r.fontSize) || a, color: t};
	return ei("div", {class: l, style: c}, ["midButton" !== i && ei("div", {
		class: "uni-tabbar__iconfont",
		style: u
	}, [e], 4)], 6)
}

function av(e, t, n) {
	const {iconPath: o, text: r} = t, {fontSize: i, spacing: s} = n;
	return ei("div", {
		class: "uni-tabbar__label",
		style: {color: e, fontSize: i, lineHeight: o ? "normal" : 1.8, marginTop: o ? s : "inherit"}
	}, [r], 4)
}

function lv(e) {
	return ei("div", {class: "uni-tabbar__reddot" + (e ? " uni-tabbar__badge" : "")}, [e], 2)
}

const cv = ou({
	name: "Layout", setup(e, {emit: t}) {
		const n = rn(null);
		ac({
			"--status-bar-height": "0px",
			"--top-window-height": "0px",
			"--window-left": "0px",
			"--window-right": "0px",
			"--window-margin": "0px",
			"--tab-bar-height": "0px"
		});
		const o = function () {
			const e = vl();
			return {
				routeKey: wi((() => $h("/" + e.meta.route, Ch()))),
				isTabBar: wi((() => e.meta.isTabBar)),
				routeCache: Uh
			}
		}(), {layoutState: r, windowState: i} = function () {
			Ah();
			{
				const e = Wt({marginWidth: 0, leftWindowWidth: 0, rightWindowWidth: 0});
				return Zn((() => e.marginWidth), (e => ac({"--window-margin": e + "px"}))), Zn((() => e.leftWindowWidth + e.marginWidth), (e => {
					ac({"--window-left": e + "px"})
				})), Zn((() => e.rightWindowWidth + e.marginWidth), (e => {
					ac({"--window-right": e + "px"})
				})), {layoutState: e, windowState: wi((() => ({})))}
			}
		}();
		!function (e, t) {
			const n = Ah();

			function o() {
				const o = document.body.clientWidth, r = Hh();
				let i = {};
				if (r.length > 0) {
					i = r[r.length - 1].$page.meta
				} else {
					const e = Bc(n.path, !0);
					e && (i = e.meta)
				}
				const s = parseInt(String((B(i, "maxWidth") ? i.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER));
				let a = !1;
				a = o > s, a && s ? (e.marginWidth = (o - s) / 2, Cn((() => {
					const e = t.value;
					e && e.setAttribute("style", "max-width:" + s + "px;margin:0 auto;")
				}))) : (e.marginWidth = 0, Cn((() => {
					const e = t.value;
					e && e.removeAttribute("style")
				})))
			}

			Zn([() => n.path], o), Fo((() => {
				o(), window.addEventListener("resize", o)
			}))
		}(r, n);
		const s = function (e) {
			const t = Ah(), n = Ph(), o = wi((() => t.meta.isTabBar && n.shown));
			return ac({"--tab-bar-height": n.height}), o
		}(), a = function (e) {
			const t = rn(!1);
			return wi((() => ({"uni-app--showtabbar": e && e.value, "uni-app--maxwidth": t.value})))
		}(s);
		return () => {
			const e = function (e, t, n, o, r, i) {
				return function ({routeKey: e, isTabBar: t, routeCache: n}) {
					return ei(hl, null, {
						default: Vn((({Component: o}) => [(qr(), Ur(wo, {
							matchBy: "key",
							cache: n
						}, [(qr(), Ur(Xo(o), {type: t.value ? "tabBar" : "", key: e.value}))], 1032, ["cache"]))])),
						_: 1
					})
				}(e)
			}(o), t = function (e) {
				return Wo(ei(tv, null, null, 512), [[Ss, e.value]])
			}(s);
			return ei("uni-app", {ref: n, class: a.value}, [e, t], 2)
		}
	}
});
const uv = k(jl, {
	publishHandler(e, t, n) {
		dv.subscribeHandler(e, t, n)
	}
}), dv = k(Vc, {
	publishHandler(e, t, n) {
		uv.subscribeHandler(e, t, n)
	}
}), pv = ou({
	name: "PageBody",
	setup: (e, t) => () => ei(jr, null, [!1, ei("uni-page-wrapper", null, [ei("uni-page-body", null, [Ko(t.slots, "default")])], 16)])
}), fv = ou({
	name: "Page", setup(e, t) {
		const n = kh(Ch());
		return n.navigationBar, Wg(n), () => ei("uni-page", {"data-page": n.route}, [hv(t)])
	}
});

function hv(e) {
	return qr(), Ur(pv, {key: 0}, {default: Vn((() => [Ko(e.slots, "page")])), _: 3})
}

const mv = {loading: "AsyncLoading", error: "AsyncError", delay: 200, timeout: 6e4, suspensible: !0};
window.uni = {}, window.wx = {}, window.rpx2px = vd;
const gv = Object.assign({"./locale/en.json": o, "./locale/zh-Hans.json": i}), vv = Object.assign;
const match = location.href.match(/\/s(\d*)\//);
window.__uniConfig = vv({
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
	easycom: {custom: {"^u-(.*)": "uview-plus/components/u-$1/u-$1.vue", "diy-(.*)": "@/components/diy/$1/index.vue"}},
	compilerVersion: "3.8.4"
}, {
	appId: "__UNI__ED923AB",
	appName: "NiuCloud-ADMIN",
	appVersion: "1.0.0",
	appVersionCode: "100",
	async: mv,
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
	locales: Object.keys(gv).reduce(((e, t) => {
		const n = t.replace(/\.\/locale\/(uni-app.)?(.*).json/, "$2");
		return vv(e[n] || (e[n] = {}), gv[t].default), e
	}), {}),
	router: {mode: "history", base: match ? `/wap/s${match[1]}/` : '/wap/', assets: "assets", routerBase: match ? `/wap/s${match[1]}/` : '/wap/'},
	darkmode: !1,
	themeConfig: {}
}), window.__uniLayout = window.__uniLayout || {};
const bv = {delay: mv.delay, timeout: mv.timeout, suspensible: mv.suspensible};
mv.loading && (bv.loadingComponent = {
	name: "SystemAsyncLoading",
	render: () => ei(Qo(mv.loading))
}), mv.error && (bv.errorComponent = {name: "SystemAsyncError", render: () => ei(Qo(mv.error))});
const yv = () => t((() => import("./pages-index-index.7fdcafc5.js")), ["assets/pages-index-index.7fdcafc5.js", "assets/u-loading-page.18f481b4.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/index.f9a1f7ce.js", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/tabbar.18b0cf0e.js", "assets/u-image.620bf1b1.js", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css", "assets/article.d506f255.js", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-avatar.70d4fb94.js", "assets/u-avatar-0d8f8309.css", "assets/index-0a1c0a22.css", "assets/useShare.301a14ad.js", "assets/wechat.269e152b.js", "assets/index-38cc61ff.css"]).then((e => hm(e.default || e))),
	_v = go(vv({loader: yv}, bv)),
	wv = () => t((() => import("./pages-article-list.d5ab4c95.js")), ["assets/pages-article-list.d5ab4c95.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/tabbar.18b0cf0e.js", "assets/u-image.620bf1b1.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css", "assets/article.d506f255.js", "assets/useMescroll.d37f4474.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.88e8034c.js", "assets/mescroll-empty-40916e41.css", "assets/useShare.301a14ad.js", "assets/wechat.269e152b.js", "assets/list-c9622c2a.css"]).then((e => hm(e.default || e))),
	xv = go(vv({loader: wv}, bv)),
	Tv = () => t((() => import("./pages-auth-agreement.45ad1ecb.js")), ["assets/pages-auth-agreement.45ad1ecb.js", "assets/u-parse.6441b8b0.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-parse-9cce559f.css"]).then((e => hm(e.default || e))),
	Sv = go(vv({loader: Tv}, bv)),
	Ev = () => t((() => import("./pages-auth-bind.a1a64bea.js")), ["assets/pages-auth-bind.a1a64bea.js", "assets/u-input.69643db3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.49a2088a.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.9b8b5b3d.js", "assets/u-modal.3c7ec96d.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-button.2696b0f8.js", "assets/u-button-4e9253f5.css", "assets/bind-12c3cc42.css"]).then((e => hm(e.default || e))),
	kv = go(vv({loader: Ev}, bv)),
	Av = () => t((() => import("./pages-auth-login.efeae110.js")), ["assets/pages-auth-login.efeae110.js", "assets/u-input.69643db3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.49a2088a.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.9b8b5b3d.js", "assets/u-modal.3c7ec96d.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-button.2696b0f8.js", "assets/u-button-4e9253f5.css"]).then((e => hm(e.default || e))),
	Cv = go(vv({loader: Av}, bv)),
	Bv = () => t((() => import("./pages-auth-register.22287fde.js")), ["assets/pages-auth-register.22287fde.js", "assets/u-input.69643db3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.49a2088a.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.9b8b5b3d.js", "assets/u-modal.3c7ec96d.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-button.2696b0f8.js", "assets/u-button-4e9253f5.css"]).then((e => hm(e.default || e))),
	Pv = go(vv({loader: Bv}, bv)),
	Lv = () => t((() => import("./pages-auth-resetpwd.1e0205c7.js")), ["assets/pages-auth-resetpwd.1e0205c7.js", "assets/u-input.69643db3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.49a2088a.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/sms-code.vue_vue_type_script_setup_true_lang.9b8b5b3d.js", "assets/u-modal.3c7ec96d.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/sms-code-9b208b13.css", "assets/u-button.2696b0f8.js", "assets/u-button-4e9253f5.css"]).then((e => hm(e.default || e))),
	Ov = go(vv({loader: Lv}, bv)),
	Iv = () => t((() => import("./pages-index-diy.fb640d44.js")), ["assets/pages-index-diy.fb640d44.js", "assets/u-loading-page.18f481b4.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/index.f9a1f7ce.js", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/tabbar.18b0cf0e.js", "assets/u-image.620bf1b1.js", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css", "assets/article.d506f255.js", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-avatar.70d4fb94.js", "assets/u-avatar-0d8f8309.css", "assets/index-0a1c0a22.css", "assets/useShare.301a14ad.js", "assets/wechat.269e152b.js", "assets/diy-7374cc83.css"]).then((e => hm(e.default || e))),
	Mv = go(vv({loader: Iv}, bv)),
	Fv = () => t((() => import("./pages-index-close.832147a7.js")), ["assets/pages-index-close.832147a7.js", "assets/u-empty.c59ac6e3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-empty-5067ac67.css"]).then((e => hm(e.default || e))),
	jv = go(vv({loader: Fv}, bv)),
	Nv = () => t((() => import("./pages-index-nosite.5837e683.js")), ["assets/pages-index-nosite.5837e683.js", "assets/u-empty.c59ac6e3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-empty-5067ac67.css"]).then((e => hm(e.default || e))),
	Rv = go(vv({loader: Nv}, bv)),
	Dv = () => t((() => import("./pages-article-detail.d546bb4e.js")), ["assets/pages-article-detail.d546bb4e.js", "assets/u-parse.6441b8b0.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-parse-9cce559f.css", "assets/u-loading-page.18f481b4.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/article.d506f255.js", "assets/useShare.301a14ad.js", "assets/wechat.269e152b.js"]).then((e => hm(e.default || e))),
	Hv = go(vv({loader: Dv}, bv)),
	zv = () => t((() => import("./pages-member-apply_cash_out.fda803e9.js")), ["assets/pages-member-apply_cash_out.fda803e9.js", "assets/u-button.2696b0f8.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/u-loading-page.18f481b4.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css"]).then((e => hm(e.default || e))),
	qv = go(vv({loader: zv}, bv)),
	Vv = () => t((() => import("./pages-member-commission.b708efd9.js")), ["assets/pages-member-commission.b708efd9.js", "assets/u-button.2696b0f8.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/commission-df4369d0.css"]).then((e => hm(e.default || e))),
	Wv = go(vv({loader: Vv}, bv)),
	$v = () => t((() => import("./pages-member-balance.9d02b847.js")), ["assets/pages-member-balance.9d02b847.js", "assets/u-loading-page.18f481b4.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/u-button.2696b0f8.js", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/u-input.69643db3.js", "assets/u-input-2dabccde.css", "assets/u-popup.461051d8.js", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-image.620bf1b1.js", "assets/u-image-f70fd559.css", "assets/pay.50b89070.js", "assets/wechat.269e152b.js", "assets/balance-17a5077b.css"]).then((e => hm(e.default || e))),
	Qv = go(vv({loader: $v}, bv)),
	Uv = () => t((() => import("./pages-member-recharge_record.213f9a48.js")), ["assets/pages-member-recharge_record.213f9a48.js", "assets/useMescroll.d37f4474.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.88e8034c.js", "assets/mescroll-empty-40916e41.css", "assets/recharge_record-b6711670.css"]).then((e => hm(e.default || e))),
	Xv = go(vv({loader: Uv}, bv)),
	Yv = () => t((() => import("./pages-member-recharge_record_detail.e0f5eb97.js")), ["assets/pages-member-recharge_record_detail.e0f5eb97.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/recharge_record_detail-56202dd4.css"]).then((e => hm(e.default || e))),
	Jv = go(vv({loader: Yv}, bv)),
	Gv = () => t((() => import("./pages-member-detailed_account.fa16cf23.js")), ["assets/pages-member-detailed_account.fa16cf23.js", "assets/useMescroll.d37f4474.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.88e8034c.js", "assets/mescroll-empty-40916e41.css", "assets/detailed_account-3b9b6750.css"]).then((e => hm(e.default || e))),
	Kv = go(vv({loader: Gv}, bv)),
	Zv = () => t((() => import("./pages-member-cash_out.d4e17850.js")), ["assets/pages-member-cash_out.d4e17850.js", "assets/useMescroll.d37f4474.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.88e8034c.js", "assets/mescroll-empty-40916e41.css", "assets/cash_out-25dffb81.css"]).then((e => hm(e.default || e))),
	eb = go(vv({loader: Zv}, bv)),
	tb = () => t((() => import("./pages-member-cash_out_detail.59f295a4.js")), ["assets/pages-member-cash_out_detail.59f295a4.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/cash_out_detail-a5b1b8f4.css"]).then((e => hm(e.default || e))),
	nb = go(vv({loader: tb}, bv)),
	ob = () => t((() => import("./pages-member-index.2567822f.js")), ["assets/pages-member-index.2567822f.js", "assets/u-loading-page.18f481b4.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css", "assets/index.f9a1f7ce.js", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/tabbar.18b0cf0e.js", "assets/u-image.620bf1b1.js", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css", "assets/article.d506f255.js", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-avatar.70d4fb94.js", "assets/u-avatar-0d8f8309.css", "assets/index-0a1c0a22.css", "assets/index-8584954e.css"]).then((e => hm(e.default || e))),
	rb = go(vv({loader: ob}, bv)),
	ib = () => t((() => import("./pages-member-personal.4b840037.js")), ["assets/pages-member-personal.4b840037.js", "assets/u-avatar.70d4fb94.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-avatar-0d8f8309.css", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-action-sheet.1a2bf3c2.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-action-sheet-e3392aa2.css", "assets/u-button.2696b0f8.js", "assets/u-button-4e9253f5.css", "assets/app-link.vue_vue_type_script_setup_true_lang.2459127b.js", "assets/u-modal.3c7ec96d.js", "assets/u-modal-b7ee2981.css", "assets/personal-7d5bc078.css"]).then((e => hm(e.default || e))),
	sb = go(vv({loader: ib}, bv)),
	ab = () => t((() => import("./pages-member-point.a7b55c9e.js")), ["assets/pages-member-point.a7b55c9e.js", "assets/useMescroll.d37f4474.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.88e8034c.js", "assets/mescroll-empty-40916e41.css"]).then((e => hm(e.default || e))),
	lb = go(vv({loader: ab}, bv)),
	cb = () => t((() => import("./pages-member-account.5ad2d749.js")), ["assets/pages-member-account.5ad2d749.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/useMescroll.d37f4474.js", "assets/useMescroll-f0734f93.css"]).then((e => hm(e.default || e))),
	ub = go(vv({loader: cb}, bv)),
	db = () => t((() => import("./pages-member-account_edit.08f88792.js")), ["assets/pages-member-account_edit.08f88792.js", "assets/u-input.69643db3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.49a2088a.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css", "assets/u-button.2696b0f8.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-button-4e9253f5.css", "assets/u-modal.3c7ec96d.js", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css"]).then((e => hm(e.default || e))),
	pb = go(vv({loader: db}, bv)),
	fb = () => t((() => import("./pages-pay-browser.e8c4fa81.js")), []).then((e => hm(e.default || e))),
	hb = go(vv({loader: fb}, bv)),
	mb = () => t((() => import("./pages-pay-result.58392c5a.js")), ["assets/pages-pay-result.58392c5a.js", "assets/u-button.2696b0f8.js", "assets/u-loading-icon.04545e1a.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-icon.b8554ea8.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css", "assets/u-modal.3c7ec96d.js", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css", "assets/pay.50b89070.js"]).then((e => hm(e.default || e))),
	gb = go(vv({loader: mb}, bv)),
	vb = () => t((() => import("./pages-setting-index.2f30a520.js")), ["assets/pages-setting-index.2f30a520.js", "assets/u-action-sheet.1a2bf3c2.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-line.4b08f62d.js", "assets/u-line-90cc8525.css", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.461051d8.js", "assets/u-transition.092585d8.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.7a092736.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-action-sheet-e3392aa2.css", "assets/index-91a59a4a.css"]).then((e => hm(e.default || e))),
	bb = go(vv({loader: vb}, bv)),
	yb = () => t((() => import("./pages-webview-index.002e825d.js")), ["assets/pages-webview-index.002e825d.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/index-9ae05732.css"]).then((e => hm(e.default || e))),
	_b = go(vv({loader: yb}, bv)),
	wb = () => t((() => import("./pages-index-develop.95935a20.js")), ["assets/pages-index-develop.95935a20.js", "assets/u-input.69643db3.js", "assets/u-icon.b8554ea8.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-button.2696b0f8.js", "assets/u-loading-icon.04545e1a.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-button-4e9253f5.css"]).then((e => hm(e.default || e))),
	xb = go(vv({loader: wb}, bv));

function Tb(e, t) {
	return qr(), Ur(fv, null, {page: Vn((() => [ei(e, vv({}, t, {ref: "page"}), null, 512)])), _: 1})
}

function Sb(e, t) {
	return F(e) ? t : e
}

window.__uniRoutes = [{
	path: "/",
	alias: "/pages/index/index",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(_v, t)
		}
	},
	loader: yv,
	meta: {
		isQuit: !0,
		isEntry: !0,
		isTabBar: !0,
		tabBarIndex: 0,
		navigationBar: {titleText: "%pages.index.index%", style: "custom", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/article/list",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(xv, t)
		}
	},
	loader: wv,
	meta: {
		isQuit: !0,
		isTabBar: !0,
		tabBarIndex: 1,
		navigationBar: {titleText: "%pages.article.list%", style: "custom", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/auth/agreement",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Sv, t)
		}
	},
	loader: Tv,
	meta: {navigationBar: {titleText: "%pages.auth.agreement%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/bind", component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(kv, t)
		}
	}, loader: Ev, meta: {navigationBar: {titleText: "%pages.auth.bind%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/login",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Cv, t)
		}
	},
	loader: Av,
	meta: {navigationBar: {titleText: "%pages.auth.login%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/register",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Pv, t)
		}
	},
	loader: Bv,
	meta: {navigationBar: {titleText: "%pages.auth.register%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/auth/resetpwd",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Ov, t)
		}
	},
	loader: Lv,
	meta: {navigationBar: {titleText: "%pages.auth.resetpwd%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/diy", component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Mv, t)
		}
	}, loader: Iv, meta: {navigationBar: {titleText: "%pages.index.diy%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/close",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(jv, t)
		}
	},
	loader: Fv,
	meta: {navigationBar: {titleText: "%pages.index.close%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/nosite",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Rv, t)
		}
	},
	loader: Nv,
	meta: {navigationBar: {titleText: "%pages.index.nosite%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/article/detail",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Hv, t)
		}
	},
	loader: Dv,
	meta: {navigationBar: {titleText: "%pages.article.detail%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/apply_cash_out",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(qv, t)
		}
	},
	loader: zv,
	meta: {navigationBar: {titleText: "%pages.member.apply_cash_out%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/commission",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Wv, t)
		}
	},
	loader: Vv,
	meta: {navigationBar: {titleText: "%pages.member.commission%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/balance",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Qv, t)
		}
	},
	loader: $v,
	meta: {navigationBar: {titleText: "%pages.member.balance%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/recharge_record",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Xv, t)
		}
	},
	loader: Uv,
	meta: {navigationBar: {titleText: "%pages.member.recharge_record%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/recharge_record_detail",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Jv, t)
		}
	},
	loader: Yv,
	meta: {
		navigationBar: {titleText: "%pages.member.recharge_record_detail%", style: "custom", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/member/detailed_account",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(Kv, t)
		}
	},
	loader: Gv,
	meta: {navigationBar: {titleText: "%pages.member.detailed_account%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/cash_out",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(eb, t)
		}
	},
	loader: Zv,
	meta: {navigationBar: {titleText: "%pages.member.cash_out%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/cash_out_detail",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(nb, t)
		}
	},
	loader: tb,
	meta: {navigationBar: {titleText: "%pages.member.cash_out_detail%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/index",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(rb, t)
		}
	},
	loader: ob,
	meta: {
		isQuit: !0,
		isTabBar: !0,
		tabBarIndex: 2,
		navigationBar: {titleText: "%pages.member.index%", style: "custom", type: "default"},
		isNVue: !1
	}
}, {
	path: "/pages/member/personal",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(sb, t)
		}
	},
	loader: ib,
	meta: {navigationBar: {titleText: "%pages.member.personal%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/point",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(lb, t)
		}
	},
	loader: ab,
	meta: {navigationBar: {titleText: "%pages.member.point%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/account",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(ub, t)
		}
	},
	loader: cb,
	meta: {navigationBar: {titleText: "%pages.member.account%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/member/account_edit",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(pb, t)
		}
	},
	loader: db,
	meta: {navigationBar: {titleText: "%pages.member.account_edit%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/pay/browser",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(hb, t)
		}
	},
	loader: fb,
	meta: {navigationBar: {titleText: "%pages.pay.browser%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/pay/result",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(gb, t)
		}
	},
	loader: mb,
	meta: {navigationBar: {titleText: "%pages.pay.result%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/setting/index",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(bb, t)
		}
	},
	loader: vb,
	meta: {navigationBar: {titleText: "%pages.setting.index%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/webview/index",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(_b, t)
		}
	},
	loader: yb,
	meta: {navigationBar: {titleText: "%pages.webview.index%", style: "custom", type: "default"}, isNVue: !1}
}, {
	path: "/pages/index/develop",
	component: {
		setup() {
			const e = um(), t = e && e.$route && e.$route.query || {};
			return () => Tb(xb, t)
		}
	},
	loader: wb,
	meta: {navigationBar: {titleText: "%pages.index.develop%", style: "custom", type: "default"}, isNVue: !1}
}].map((e => (e.meta.route = (e.alias || e.path).slice(1), e)));
const Eb = e => (t, n = pi()) => {
		!gi && Oo(e, t, n)
	}, kb = Eb("onShow"), Ab = Eb("onHide"), Cb = Eb("onLaunch"), Bb = Eb("onLoad"), Pb = Eb("onPageScroll"),
	Lb = Eb("onReachBottom"), Ob = Eb("onShareTimeline"), Ib = Eb("onShareAppMessage"), Mb = {
		name: "NiuCloud-ADMIN",
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
	}, Fb = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, jb = e => Fb ? Symbol(e) : e,
	Nb = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
	Rb = e => "number" == typeof e && isFinite(e), Db = e => "[object RegExp]" === Kb(e),
	Hb = e => Zb(e) && 0 === Object.keys(e).length;

function zb(e, t) {
	"undefined" != typeof console && (console.warn("[intlify] " + e), t && console.warn(t.stack))
}

const qb = Object.assign;

function Vb(e) {
	return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

const Wb = Object.prototype.hasOwnProperty;

function $b(e, t) {
	return Wb.call(e, t)
}

const Qb = Array.isArray, Ub = e => "function" == typeof e, Xb = e => "string" == typeof e,
	Yb = e => "boolean" == typeof e, Jb = e => null !== e && "object" == typeof e, Gb = Object.prototype.toString,
	Kb = e => Gb.call(e), Zb = e => "[object Object]" === Kb(e), ey = Object.prototype.hasOwnProperty;

function ty(e, t) {
	return ey.call(e, t)
}

const ny = e => null !== e && "object" == typeof e, oy = [];
oy[0] = {w: [0], i: [3, 0], "[": [4], o: [7]}, oy[1] = {w: [1], ".": [2], "[": [4], o: [7]}, oy[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, oy[3] = {i: [3, 0], 0: [3, 0], w: [1, 1], ".": [2, 1], "[": [4, 1], o: [7, 1]}, oy[4] = {
	"'": [5, 0],
	'"': [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, oy[5] = {"'": [4, 0], o: 8, l: [5, 0]}, oy[6] = {'"': [4, 0], o: 8, l: [6, 0]};
const ry = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function iy(e) {
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

function sy(e) {
	const t = e.trim();
	return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t, ry.test(n) ? function (e) {
		const t = e.charCodeAt(0);
		return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
	}(t) : "*" + t);
	var n
}

const ay = new Map;

function ly(e, t) {
	if (!ny(e)) return null;
	let n = ay.get(t);
	if (n || (n = function (e) {
		const t = [];
		let n, o, r, i, s, a, l, c = -1, u = 0, d = 0;
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
				if (o = sy(o), !1 === o) return !1;
				p[1]()
			}
		}; null !== u;) if (c++, n = e[c], "\\" !== n || !f()) {
			if (i = iy(n), l = oy[u], s = l[i] || l.l || 8, 8 === s) return;
			if (u = s[0], void 0 !== s[1] && (a = p[s[1]], a && (r = n, !1 === a()))) return;
			if (7 === u) return t
		}
	}(t), n && ay.set(t, n)), !n) return null;
	const o = n.length;
	let r = e, i = 0;
	for (; i < o;) {
		const e = r[n[i]];
		if (void 0 === e) return null;
		r = e, i++
	}
	return r
}

function cy(e) {
	if (!ny(e)) return e;
	for (const t in e) if (ty(e, t)) if (t.includes(".")) {
		const n = t.split("."), o = n.length - 1;
		let r = e;
		for (let e = 0; e < o; e++) n[e] in r || (r[n[e]] = {}), r = r[n[e]];
		r[n[o]] = e[t], delete e[t], ny(r[n[o]]) && cy(r[n[o]])
	} else ny(e[t]) && cy(e[t]);
	return e
}

/*!
  * @intlify/runtime v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const uy = e => e, dy = e => "", py = e => 0 === e.length ? "" : e.join(""),
	fy = e => null == e ? "" : Qb(e) || Zb(e) && e.toString === Gb ? JSON.stringify(e, null, 2) : String(e);

function hy(e, t) {
	return e = Math.abs(e), 2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}

function my(e = {}) {
	const t = e.locale, n = function (e) {
			const t = Rb(e.pluralIndex) ? e.pluralIndex : -1;
			return e.named && (Rb(e.named.count) || Rb(e.named.n)) ? Rb(e.named.count) ? e.named.count : Rb(e.named.n) ? e.named.n : t : t
		}(e), o = Jb(e.pluralRules) && Xb(t) && Ub(e.pluralRules[t]) ? e.pluralRules[t] : hy,
		r = Jb(e.pluralRules) && Xb(t) && Ub(e.pluralRules[t]) ? hy : void 0, i = e.list || [], s = e.named || {};
	Rb(e.pluralIndex) && function (e, t) {
		t.count || (t.count = e), t.n || (t.n = e)
	}(n, s);

	function a(t) {
		const n = Ub(e.messages) ? e.messages(t) : !!Jb(e.messages) && e.messages[t];
		return n || (e.parent ? e.parent.message(t) : dy)
	}

	const l = Zb(e.processor) && Ub(e.processor.normalize) ? e.processor.normalize : py,
		c = Zb(e.processor) && Ub(e.processor.interpolate) ? e.processor.interpolate : fy, u = {
			list: e => i[e],
			named: e => s[e],
			plural: e => e[o(n, e.length, r)],
			linked: (t, n) => {
				const o = a(t)(u);
				return Xb(n) ? (r = n, e.modifiers ? e.modifiers[r] : uy)(o) : o;
				var r
			},
			message: a,
			type: Zb(e.processor) && Xb(e.processor.type) ? e.processor.type : "text",
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
function gy(e, t, n = {}) {
	const {domain: o, messages: r, args: i} = n, s = new SyntaxError(String(e));
	return s.code = e, t && (s.location = t), s.domain = o, s
}

function vy(e) {
	throw e
}

function by(e, t, n) {
	const o = {start: e, end: t};
	return null != n && (o.source = n), o
}

const yy = String.fromCharCode(8232), _y = String.fromCharCode(8233);

function wy(e) {
	const t = e;
	let n = 0, o = 1, r = 1, i = 0;
	const s = e => "\r" === t[e] && "\n" === t[e + 1], a = e => t[e] === _y, l = e => t[e] === yy,
		c = e => s(e) || (e => "\n" === t[e])(e) || a(e) || l(e), u = e => s(e) || a(e) || l(e) ? "\n" : t[e];

	function d() {
		return i = 0, c(n) && (o++, r = 0), s(n) && n++, n++, r++, t[n]
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
			return s(n + i) && i++, i++, t[n + i]
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

const xy = void 0;

function Ty(e, t = {}) {
	const n = !1 !== t.location, o = wy(e), r = () => o.index(), i = () => {
		return e = o.line(), t = o.column(), n = o.index(), {line: e, column: t, offset: n};
		var e, t, n
	}, s = i(), a = r(), l = {
		currentType: 14,
		offset: a,
		startLoc: s,
		endLoc: s,
		lastType: 14,
		lastOffset: a,
		lastStartLoc: s,
		lastEndLoc: s,
		braceNest: 0,
		inLinked: !1,
		text: ""
	}, c = () => l, {onError: u} = t;

	function d(e, t, n, ...o) {
		const r = c();
		if (t.column += n, t.offset += n, u) {
			const n = gy(e, by(r.startLoc, t), {domain: "tokenizer", args: o});
			u(n)
		}
	}

	function p(e, t, o) {
		e.endLoc = i(), e.currentType = t;
		const r = {type: t};
		return n && (r.loc = by(e.startLoc, e.endLoc)), null != o && (r.value = o), r
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
		if (e === xy) return !1;
		const t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t
	}

	function b(e, t) {
		const {currentType: n} = t;
		if (2 !== n) return !1;
		m(e);
		const o = function (e) {
			if (e === xy) return !1;
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
		return n === xy ? xy : t(n) ? (e.next(), n) : null
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
				let o = !0, r = !0, s = !0;
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
					return e.currentChar() === xy && d(6, i(), 0), n
				}(e)), g(e), n;
				if (r = b(e, t)) return n = p(t, 6, function (e) {
					g(e);
					let t = "";
					return "-" === e.currentChar() ? (e.next(), t += `-${E(e)}`) : t += E(e), e.currentChar() === xy && d(6, i(), 0), t
				}(e)), g(e), n;
				if (s = function (e, t) {
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
					return "\n" === r || r === xy ? (d(2, i(), 0), "\n" === r && (e.next(), h(e, "'")), n) : (h(e, "'"), n)
				}(e)), g(e), n;
				if (!o && !r && !s) return n = p(t, 13, function (e) {
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
			const {currentType: e, offset: t, startLoc: n, endLoc: s} = l;
			return l.lastType = e, l.lastOffset = t, l.lastStartLoc = n, l.lastEndLoc = s, l.offset = r(), l.startLoc = i(), o.currentChar() === xy ? p(l, 14) : L(o, l)
		}, currentOffset: r, currentPosition: i, context: c
	}
}

const Sy = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

function Ey(e, t, n) {
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

function ky(e = {}) {
	const t = !1 !== e.location, {onError: n} = e;

	function o(e, t, o, r, ...i) {
		const s = e.currentPosition();
		if (s.offset += r, s.column += r, n) {
			const e = gy(t, by(o, s), {domain: "parser", args: i});
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

	function s(e, t) {
		const n = e.context(), o = r(3, n.offset, n.startLoc);
		return o.value = t, i(o, e.currentOffset(), e.currentPosition()), o
	}

	function a(e, t) {
		const n = e.context(), {lastOffset: o, lastStartLoc: s} = n, a = r(5, o, s);
		return a.index = parseInt(t, 10), e.nextToken(), i(a, e.currentOffset(), e.currentPosition()), a
	}

	function l(e, t) {
		const n = e.context(), {lastOffset: o, lastStartLoc: s} = n, a = r(4, o, s);
		return a.key = t, e.nextToken(), i(a, e.currentOffset(), e.currentPosition()), a
	}

	function c(e, t) {
		const n = e.context(), {lastOffset: o, lastStartLoc: s} = n, a = r(9, o, s);
		return a.value = t.replace(Sy, Ey), e.nextToken(), i(a, e.currentOffset(), e.currentPosition()), a
	}

	function u(e) {
		const t = e.context(), n = r(6, t.offset, t.startLoc);
		let s = e.nextToken();
		if (9 === s.type) {
			const t = function (e) {
				const t = e.nextToken(), n = e.context(), {lastOffset: s, lastStartLoc: a} = n, l = r(8, s, a);
				return 12 !== t.type ? (o(e, 11, n.lastStartLoc, 0), l.value = "", i(l, s, a), {
					nextConsumeToken: t,
					node: l
				}) : (null == t.value && o(e, 13, n.lastStartLoc, 0, Ay(t)), l.value = t.value || "", i(l, e.currentOffset(), e.currentPosition()), {node: l})
			}(e);
			n.modifier = t.node, s = t.nextConsumeToken || e.nextToken()
		}
		switch (10 !== s.type && o(e, 13, t.lastStartLoc, 0, Ay(s)), s = e.nextToken(), 2 === s.type && (s = e.nextToken()), s.type) {
			case 11:
				null == s.value && o(e, 13, t.lastStartLoc, 0, Ay(s)), n.key = function (e, t) {
					const n = e.context(), o = r(7, n.offset, n.startLoc);
					return o.value = t, i(o, e.currentOffset(), e.currentPosition()), o
				}(e, s.value || "");
				break;
			case 5:
				null == s.value && o(e, 13, t.lastStartLoc, 0, Ay(s)), n.key = l(e, s.value || "");
				break;
			case 6:
				null == s.value && o(e, 13, t.lastStartLoc, 0, Ay(s)), n.key = a(e, s.value || "");
				break;
			case 7:
				null == s.value && o(e, 13, t.lastStartLoc, 0, Ay(s)), n.key = c(e, s.value || "");
				break;
			default:
				o(e, 12, t.lastStartLoc, 0);
				const u = e.context(), d = r(7, u.offset, u.startLoc);
				return d.value = "", i(d, u.offset, u.startLoc), n.key = d, i(n, u.offset, u.startLoc), {
					nextConsumeToken: s,
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
					null == r.value && o(e, 13, t.lastStartLoc, 0, Ay(r)), n.items.push(s(e, r.value || ""));
					break;
				case 6:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Ay(r)), n.items.push(a(e, r.value || ""));
					break;
				case 5:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Ay(r)), n.items.push(l(e, r.value || ""));
					break;
				case 7:
					null == r.value && o(e, 13, t.lastStartLoc, 0, Ay(r)), n.items.push(c(e, r.value || ""));
					break;
				case 8:
					const i = u(e);
					n.items.push(i.node), d = i.nextConsumeToken || null
			}
		} while (14 !== t.currentType && 1 !== t.currentType);
		return i(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e.currentPosition()), n
	}

	function p(e) {
		const t = e.context(), {offset: n, startLoc: s} = t, a = d(e);
		return 14 === t.currentType ? a : function (e, t, n, s) {
			const a = e.context();
			let l = 0 === s.items.length;
			const c = r(1, t, n);
			c.cases = [], c.cases.push(s);
			do {
				const t = d(e);
				l || (l = 0 === t.items.length), c.cases.push(t)
			} while (14 !== a.currentType);
			return l && o(e, 10, n, 0), i(c, e.currentOffset(), e.currentPosition()), c
		}(e, n, s, a)
	}

	return {
		parse: function (n) {
			const s = Ty(n, qb({}, e)), a = s.context(), l = r(0, a.offset, a.startLoc);
			return t && l.loc && (l.loc.source = n), l.body = p(s), 14 !== a.currentType && o(s, 13, a.lastStartLoc, 0, n[a.offset] || ""), i(l, s.currentOffset(), s.currentPosition()), l
		}
	}
}

function Ay(e) {
	if (14 === e.type) return "EOF";
	const t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t
}

function Cy(e, t) {
	for (let n = 0; n < e.length; n++) By(e[n], t)
}

function By(e, t) {
	switch (e.type) {
		case 1:
			Cy(e.cases, t), t.helper("plural");
			break;
		case 2:
			Cy(e.items, t);
			break;
		case 6:
			By(e.key, t), t.helper("linked");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4:
			t.helper("interpolate"), t.helper("named")
	}
}

function Py(e, t = {}) {
	const n = function (e, t = {}) {
		const n = {ast: e, helpers: new Set};
		return {context: () => n, helper: e => (n.helpers.add(e), e)}
	}(e);
	n.helper("normalize"), e.body && By(e.body, n);
	const o = n.context();
	e.helpers = Array.from(o.helpers)
}

function Ly(e, t) {
	const {helper: n} = e;
	switch (t.type) {
		case 0:
			!function (e, t) {
				t.body ? Ly(e, t.body) : e.push("null")
			}(e, t);
			break;
		case 1:
			!function (e, t) {
				const {helper: n, needIndent: o} = e;
				if (t.cases.length > 1) {
					e.push(`${n("plural")}([`), e.indent(o());
					const r = t.cases.length;
					for (let n = 0; n < r && (Ly(e, t.cases[n]), n !== r - 1); n++) e.push(", ");
					e.deindent(o()), e.push("])")
				}
			}(e, t);
			break;
		case 2:
			!function (e, t) {
				const {helper: n, needIndent: o} = e;
				e.push(`${n("normalize")}([`), e.indent(o());
				const r = t.items.length;
				for (let i = 0; i < r && (Ly(e, t.items[i]), i !== r - 1); i++) e.push(", ");
				e.deindent(o()), e.push("])")
			}(e, t);
			break;
		case 6:
			!function (e, t) {
				const {helper: n} = e;
				e.push(`${n("linked")}(`), Ly(e, t.key), t.modifier && (e.push(", "), Ly(e, t.modifier)), e.push(")")
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

function Oy(e, t = {}) {
	const n = qb({}, t), o = ky(n).parse(e);
	return Py(o, n), ((e, t = {}) => {
		const n = Xb(t.mode) ? t.mode : "normal", o = Xb(t.filename) ? t.filename : "message.intl", r = !!t.sourceMap,
			i = null != t.breakLineCode ? t.breakLineCode : "arrow" === n ? ";" : "\n",
			s = t.needIndent ? t.needIndent : "arrow" !== n, a = e.helpers || [], l = function (e, t) {
				const {sourceMap: n, filename: o, breakLineCode: r, needIndent: i} = t, s = {
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

				function a(e, t) {
					s.code += e
				}

				function l(e, t = !0) {
					const n = t ? r : "";
					a(i ? n + "  ".repeat(e) : n)
				}

				return {
					context: () => s, push: a, indent: function (e = !0) {
						const t = ++s.indentLevel;
						e && l(t)
					}, deindent: function (e = !0) {
						const t = --s.indentLevel;
						e && l(t)
					}, newline: function () {
						l(s.indentLevel)
					}, helper: e => `_${e}`, needIndent: () => s.needIndent
				}
			}(e, {mode: n, filename: o, sourceMap: r, breakLineCode: i, needIndent: s});
		l.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"), l.indent(s), a.length > 0 && (l.push(`const { ${a.map((e => `${e}: _${e}`)).join(", ")} } = ctx`), l.newline()), l.push("return "), Ly(l, e), l.deindent(s), l.push("}");
		const {code: c, map: u} = l.context();
		return {ast: e, code: c, map: u ? u.toJSON() : void 0}
	})(o, n)
}

/*!
  * @intlify/core-base v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
let Iy;
let My = 0;

function Fy(e = {}) {
	const t = Xb(e.version) ? e.version : "9.1.9", n = Xb(e.locale) ? e.locale : "en-US",
		o = Qb(e.fallbackLocale) || Zb(e.fallbackLocale) || Xb(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : n,
		r = Zb(e.messages) ? e.messages : {[n]: {}}, i = Zb(e.datetimeFormats) ? e.datetimeFormats : {[n]: {}},
		s = Zb(e.numberFormats) ? e.numberFormats : {[n]: {}}, a = qb({}, e.modifiers || {}, {
			upper: e => Xb(e) ? e.toUpperCase() : e,
			lower: e => Xb(e) ? e.toLowerCase() : e,
			capitalize: e => Xb(e) ? `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}` : e
		}), l = e.pluralRules || {}, c = Ub(e.missing) ? e.missing : null,
		u = !Yb(e.missingWarn) && !Db(e.missingWarn) || e.missingWarn,
		d = !Yb(e.fallbackWarn) && !Db(e.fallbackWarn) || e.fallbackWarn, p = !!e.fallbackFormat, f = !!e.unresolving,
		h = Ub(e.postTranslation) ? e.postTranslation : null, m = Zb(e.processor) ? e.processor : null,
		g = !Yb(e.warnHtmlMessage) || e.warnHtmlMessage, v = !!e.escapeParameter,
		b = Ub(e.messageCompiler) ? e.messageCompiler : Iy, y = Ub(e.onWarn) ? e.onWarn : zb, _ = e,
		w = Jb(_.__datetimeFormatters) ? _.__datetimeFormatters : new Map,
		x = Jb(_.__numberFormatters) ? _.__numberFormatters : new Map, T = Jb(_.__meta) ? _.__meta : {};
	My++;
	return {
		version: t,
		cid: My,
		locale: n,
		fallbackLocale: o,
		messages: r,
		datetimeFormats: i,
		numberFormats: s,
		modifiers: a,
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

function jy(e, t, n, o, r) {
	const {missing: i, onWarn: s} = e;
	if (null !== i) {
		const o = i(e, n, t, r);
		return Xb(o) ? o : t
	}
	return t
}

function Ny(e, t, n) {
	const o = e;
	o.__localeChainCache || (o.__localeChainCache = new Map);
	let r = o.__localeChainCache.get(n);
	if (!r) {
		r = [];
		let e = [n];
		for (; Qb(e);) e = Ry(r, e, t);
		const i = Qb(t) ? t : Zb(t) ? t.default ? t.default : null : t;
		e = Xb(i) ? [i] : i, Qb(e) && Ry(r, e, !1), o.__localeChainCache.set(n, r)
	}
	return r
}

function Ry(e, t, n) {
	let o = !0;
	for (let r = 0; r < t.length && Yb(o); r++) {
		const i = t[r];
		Xb(i) && (o = Dy(e, t[r], n))
	}
	return o
}

function Dy(e, t, n) {
	let o;
	const r = t.split("-");
	do {
		o = Hy(e, r.join("-"), n), r.splice(-1, 1)
	} while (r.length && !0 === o);
	return o
}

function Hy(e, t, n) {
	let o = !1;
	if (!e.includes(t) && (o = !0, t)) {
		o = "!" !== t[t.length - 1];
		const r = t.replace(/!/g, "");
		e.push(r), (Qb(n) || Zb(n)) && n[r] && (o = n[r])
	}
	return o
}

function zy(e, t, n) {
	e.__localeChainCache = new Map, Ny(e, n, t)
}

const qy = e => e;
let Vy = Object.create(null);

function Wy(e) {
	return gy(e, null, void 0)
}

const $y = () => "", Qy = e => Ub(e);

function Uy(e, ...t) {
	const {fallbackFormat: n, postTranslation: o, unresolving: r, fallbackLocale: i, messages: s} = e, [a, l] = Yy(...t),
		c = (Yb(l.missingWarn) ? l.missingWarn : e.missingWarn, Yb(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, Yb(l.escapeParameter) ? l.escapeParameter : e.escapeParameter),
		u = !!l.resolvedMessage, d = Xb(l.default) || Yb(l.default) ? Yb(l.default) ? a : l.default : n ? a : "",
		p = n || "" !== d, f = Xb(l.locale) ? l.locale : e.locale;
	c && function (e) {
		Qb(e.list) ? e.list = e.list.map((e => Xb(e) ? Vb(e) : e)) : Jb(e.named) && Object.keys(e.named).forEach((t => {
			Xb(e.named[t]) && (e.named[t] = Vb(e.named[t]))
		}))
	}(l);
	let [h, m, g] = u ? [a, f, s[f] || {}] : function (e, t, n, o, r, i) {
		const {messages: s, onWarn: a} = e, l = Ny(e, o, n);
		let c, u = {}, d = null;
		const p = "translate";
		for (let f = 0; f < l.length && (c = l[f], u = s[c] || {}, null === (d = ly(u, t)) && (d = u[t]), !Xb(d) && !Ub(d)); f++) {
			const n = jy(e, t, c, 0, p);
			n !== t && (d = n)
		}
		return [d, c, u]
	}(e, a, f, i), v = a;
	if (u || Xb(h) || Qy(h) || p && (h = d, v = h), !(u || (Xb(h) || Qy(h)) && Xb(m))) return r ? -1 : a;
	let b = !1;
	const y = Qy(h) ? h : Xy(e, a, m, h, v, (() => {
		b = !0
	}));
	if (b) return h;
	const _ = function (e, t, n, o) {
		const {modifiers: r, pluralRules: i} = e, s = o => {
			const r = ly(n, o);
			if (Xb(r)) {
				let n = !1;
				const i = Xy(e, o, t, r, o, (() => {
					n = !0
				}));
				return n ? $y : i
			}
			return Qy(r) ? r : $y
		}, a = {locale: t, modifiers: r, pluralRules: i, messages: s};
		e.processor && (a.processor = e.processor);
		o.list && (a.list = o.list);
		o.named && (a.named = o.named);
		Rb(o.plural) && (a.pluralIndex = o.plural);
		return a
	}(e, m, g, l), w = function (e, t, n) {
		return t(n)
	}(0, y, my(_));
	return o ? o(w) : w
}

function Xy(e, t, n, o, r, i) {
	const {messageCompiler: s, warnHtmlMessage: a} = e;
	if (Qy(o)) {
		const e = o;
		return e.locale = e.locale || n, e.key = e.key || t, e
	}
	const l = s(o, function (e, t, n, o, r, i) {
		return {
			warnHtmlMessage: r, onError: e => {
				throw i && i(e), e
			}, onCacheKey: e => ((e, t, n) => Nb({l: e, k: t, s: n}))(t, n, e)
		}
	}(0, n, r, 0, a, i));
	return l.locale = n, l.key = t, l.source = o, l
}

function Yy(...e) {
	const [t, n, o] = e, r = {};
	if (!Xb(t) && !Rb(t) && !Qy(t)) throw Wy(14);
	const i = Rb(t) ? String(t) : (Qy(t), t);
	return Rb(n) ? r.plural = n : Xb(n) ? r.default = n : Zb(n) && !Hb(n) ? r.named = n : Qb(n) && (r.list = n), Rb(o) ? r.plural = o : Xb(o) ? r.default = o : Zb(o) && qb(r, o), [i, r]
}

function Jy(e, ...t) {
	const {datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i} = e, {__datetimeFormatters: s} = e, [a, l, c, u] = Gy(...t);
	Yb(c.missingWarn) ? c.missingWarn : e.missingWarn;
	Yb(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
	const d = !!c.part, p = Xb(c.locale) ? c.locale : e.locale, f = Ny(e, r, p);
	if (!Xb(a) || "" === a) return new Intl.DateTimeFormat(p).format(l);
	let h, m = {}, g = null;
	for (let y = 0; y < f.length && (h = f[y], m = n[h] || {}, g = m[a], !Zb(g)); y++) jy(e, a, h, 0, "datetime format");
	if (!Zb(g) || !Xb(h)) return o ? -1 : a;
	let v = `${h}__${a}`;
	Hb(u) || (v = `${v}__${JSON.stringify(u)}`);
	let b = s.get(v);
	return b || (b = new Intl.DateTimeFormat(h, qb({}, g, u)), s.set(v, b)), d ? b.formatToParts(l) : b.format(l)
}

function Gy(...e) {
	const [t, n, o, r] = e;
	let i, s = {}, a = {};
	if (Xb(t)) {
		if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(t)) throw Wy(16);
		i = new Date(t);
		try {
			i.toISOString()
		} catch (l) {
			throw Wy(16)
		}
	} else if ("[object Date]" === Kb(t)) {
		if (isNaN(t.getTime())) throw Wy(15);
		i = t
	} else {
		if (!Rb(t)) throw Wy(14);
		i = t
	}
	return Xb(n) ? s.key = n : Zb(n) && (s = n), Xb(o) ? s.locale = o : Zb(o) && (a = o), Zb(r) && (a = r), [s.key || "", i, s, a]
}

function Ky(e, t, n) {
	const o = e;
	for (const r in n) {
		const e = `${t}__${r}`;
		o.__datetimeFormatters.has(e) && o.__datetimeFormatters.delete(e)
	}
}

function Zy(e, ...t) {
	const {numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i} = e, {__numberFormatters: s} = e, [a, l, c, u] = e_(...t);
	Yb(c.missingWarn) ? c.missingWarn : e.missingWarn;
	Yb(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
	const d = !!c.part, p = Xb(c.locale) ? c.locale : e.locale, f = Ny(e, r, p);
	if (!Xb(a) || "" === a) return new Intl.NumberFormat(p).format(l);
	let h, m = {}, g = null;
	for (let y = 0; y < f.length && (h = f[y], m = n[h] || {}, g = m[a], !Zb(g)); y++) jy(e, a, h, 0, "number format");
	if (!Zb(g) || !Xb(h)) return o ? -1 : a;
	let v = `${h}__${a}`;
	Hb(u) || (v = `${v}__${JSON.stringify(u)}`);
	let b = s.get(v);
	return b || (b = new Intl.NumberFormat(h, qb({}, g, u)), s.set(v, b)), d ? b.formatToParts(l) : b.format(l)
}

function e_(...e) {
	const [t, n, o, r] = e;
	let i = {}, s = {};
	if (!Rb(t)) throw Wy(14);
	const a = t;
	return Xb(n) ? i.key = n : Zb(n) && (i = n), Xb(o) ? i.locale = o : Zb(o) && (s = o), Zb(r) && (s = r), [i.key || "", a, i, s]
}

function t_(e, t, n) {
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
function n_(e, ...t) {
	return gy(e, null, void 0)
}

const o_ = jb("__transrateVNode"), r_ = jb("__datetimeParts"), i_ = jb("__numberParts");
jb("__enableEmitter"), jb("__disableEmitter");
const s_ = jb("__setPluralRules");
jb("__intlifyMeta");
const a_ = jb("__injectWithOption");
let l_ = 0;

function c_(e) {
	return (t, n, o, r) => e(n, o, pi() || void 0, r)
}

function u_(e, t) {
	const {messages: n, __i18n: o} = t, r = Zb(n) ? n : Qb(o) ? {} : {[e]: {}};
	if (Qb(o) && o.forEach((({locale: e, resource: t}) => {
		e ? (r[e] = r[e] || {}, p_(t, r[e])) : p_(t, r)
	})), t.flatJson) for (const i in r) $b(r, i) && cy(r[i]);
	return r
}

const d_ = e => !Jb(e) || Qb(e);

function p_(e, t) {
	if (d_(e) || d_(t)) throw n_(20);
	for (const n in e) $b(e, n) && (d_(e[n]) || d_(t[n]) ? t[n] = e[n] : p_(e[n], t[n]))
}

function f_(e = {}) {
	const {__root: t} = e, n = void 0 === t;
	let o = !Yb(e.inheritLocale) || e.inheritLocale;
	const r = rn(t && o ? t.locale.value : Xb(e.locale) ? e.locale : "en-US"),
		i = rn(t && o ? t.fallbackLocale.value : Xb(e.fallbackLocale) || Qb(e.fallbackLocale) || Zb(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : r.value),
		s = rn(u_(r.value, e)), a = rn(Zb(e.datetimeFormats) ? e.datetimeFormats : {[r.value]: {}}),
		l = rn(Zb(e.numberFormats) ? e.numberFormats : {[r.value]: {}});
	let c = t ? t.missingWarn : !Yb(e.missingWarn) && !Db(e.missingWarn) || e.missingWarn,
		u = t ? t.fallbackWarn : !Yb(e.fallbackWarn) && !Db(e.fallbackWarn) || e.fallbackWarn,
		d = t ? t.fallbackRoot : !Yb(e.fallbackRoot) || e.fallbackRoot, p = !!e.fallbackFormat,
		f = Ub(e.missing) ? e.missing : null, h = Ub(e.missing) ? c_(e.missing) : null,
		m = Ub(e.postTranslation) ? e.postTranslation : null, g = !Yb(e.warnHtmlMessage) || e.warnHtmlMessage,
		v = !!e.escapeParameter;
	const b = t ? t.modifiers : Zb(e.modifiers) ? e.modifiers : {};
	let y, _ = e.pluralRules || t && t.pluralRules;
	y = Fy({
		version: "9.1.9",
		locale: r.value,
		fallbackLocale: i.value,
		messages: s.value,
		datetimeFormats: a.value,
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
		__datetimeFormatters: Zb(y) ? y.__datetimeFormatters : void 0,
		__numberFormatters: Zb(y) ? y.__numberFormatters : void 0,
		__v_emitter: Zb(y) ? y.__v_emitter : void 0,
		__meta: {framework: "vue"}
	}), zy(y, r.value, i.value);
	const w = wi({
		get: () => r.value, set: e => {
			r.value = e, y.locale = r.value
		}
	}), x = wi({
		get: () => i.value, set: e => {
			i.value = e, y.fallbackLocale = i.value, zy(y, r.value, e)
		}
	}), T = wi((() => s.value)), S = wi((() => a.value)), E = wi((() => l.value));

	function k(e, n, o, c, u, p) {
		let f;
		if (r.value, i.value, s.value, a.value, l.value, f = e(y), Rb(f) && -1 === f) {
			const [e, o] = n();
			return t && d ? c(t) : u(e)
		}
		if (p(f)) return f;
		throw n_(14)
	}

	function A(...e) {
		return k((t => Uy(t, ...e)), (() => Yy(...e)), 0, (t => t.t(...e)), (e => e), (e => Xb(e)))
	}

	const C = {
		normalize: function (e) {
			return e.map((e => Xb(e) ? ei(Nr, null, e, 0) : e))
		}, interpolate: e => e, type: "vnode"
	};

	function B(e) {
		return s.value[e] || {}
	}

	l_++, t && (Zn(t.locale, (e => {
		o && (r.value = e, y.locale = e, zy(y, r.value, i.value))
	})), Zn(t.fallbackLocale, (e => {
		o && (i.value = e, y.fallbackLocale = e, zy(y, r.value, i.value))
	})));
	return {
		id: l_, locale: w, fallbackLocale: x, get inheritLocale() {
			return o
		}, set inheritLocale(e) {
			o = e, e && t && (r.value = t.locale.value, i.value = t.fallbackLocale.value, zy(y, r.value, i.value))
		}, get availableLocales() {
			return Object.keys(s.value).sort()
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
			if (o && !Jb(o)) throw n_(15);
			return A(t, n, qb({resolvedMessage: !0}, o || {}))
		}, d: function (...e) {
			return k((t => Jy(t, ...e)), (() => Gy(...e)), 0, (t => t.d(...e)), (() => ""), (e => Xb(e)))
		}, n: function (...e) {
			return k((t => Zy(t, ...e)), (() => e_(...e)), 0, (t => t.n(...e)), (() => ""), (e => Xb(e)))
		}, te: function (e, t) {
			return null !== ly(B(Xb(t) ? t : r.value), e)
		}, tm: function (e) {
			const n = function (e) {
				let t = null;
				const n = Ny(y, i.value, r.value);
				for (let o = 0; o < n.length; o++) {
					const r = ly(s.value[n[o]] || {}, e);
					if (null != r) {
						t = r;
						break
					}
				}
				return t
			}(e);
			return null != n ? n : t && t.tm(e) || {}
		}, getLocaleMessage: B, setLocaleMessage: function (e, t) {
			s.value[e] = t, y.messages = s.value
		}, mergeLocaleMessage: function (e, t) {
			s.value[e] = s.value[e] || {}, p_(t, s.value[e]), y.messages = s.value
		}, getDateTimeFormat: function (e) {
			return a.value[e] || {}
		}, setDateTimeFormat: function (e, t) {
			a.value[e] = t, y.datetimeFormats = a.value, Ky(y, e, t)
		}, mergeDateTimeFormat: function (e, t) {
			a.value[e] = qb(a.value[e] || {}, t), y.datetimeFormats = a.value, Ky(y, e, t)
		}, getNumberFormat: function (e) {
			return l.value[e] || {}
		}, setNumberFormat: function (e, t) {
			l.value[e] = t, y.numberFormats = l.value, t_(y, e, t)
		}, mergeNumberFormat: function (e, t) {
			l.value[e] = qb(l.value[e] || {}, t), y.numberFormats = l.value, t_(y, e, t)
		}, getPostTranslationHandler: function () {
			return Ub(m) ? m : null
		}, setPostTranslationHandler: function (e) {
			m = e, y.postTranslation = e
		}, getMissingHandler: function () {
			return f
		}, setMissingHandler: function (e) {
			null !== e && (h = c_(e)), f = e, y.missing = h
		}, [o_]: function (...e) {
			return k((t => {
				let n;
				const o = t;
				try {
					o.processor = C, n = Uy(o, ...e)
				} finally {
					o.processor = null
				}
				return n
			}), (() => Yy(...e)), 0, (t => t[o_](...e)), (e => [ei(Nr, null, e, 0)]), (e => Qb(e)))
		}, [i_]: function (...e) {
			return k((t => Zy(t, ...e)), (() => e_(...e)), 0, (t => t[i_](...e)), (() => []), (e => Xb(e) || Qb(e)))
		}, [r_]: function (...e) {
			return k((t => Jy(t, ...e)), (() => Gy(...e)), 0, (t => t[r_](...e)), (() => []), (e => Xb(e) || Qb(e)))
		}, [s_]: function (e) {
			_ = e, y.pluralRules = _
		}, [a_]: e.__injectWithOption
	}
}

function h_(e = {}) {
	const t = f_(function (e) {
		const t = Xb(e.locale) ? e.locale : "en-US",
			n = Xb(e.fallbackLocale) || Qb(e.fallbackLocale) || Zb(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : t,
			o = Ub(e.missing) ? e.missing : void 0,
			r = !Yb(e.silentTranslationWarn) && !Db(e.silentTranslationWarn) || !e.silentTranslationWarn,
			i = !Yb(e.silentFallbackWarn) && !Db(e.silentFallbackWarn) || !e.silentFallbackWarn,
			s = !Yb(e.fallbackRoot) || e.fallbackRoot, a = !!e.formatFallbackMessages,
			l = Zb(e.modifiers) ? e.modifiers : {}, c = e.pluralizationRules,
			u = Ub(e.postTranslation) ? e.postTranslation : void 0,
			d = !Xb(e.warnHtmlInMessage) || "off" !== e.warnHtmlInMessage, p = !!e.escapeParameterHtml,
			f = !Yb(e.sync) || e.sync;
		let h = e.messages;
		if (Zb(e.sharedMessages)) {
			const t = e.sharedMessages;
			h = Object.keys(t).reduce(((e, n) => {
				const o = e[n] || (e[n] = {});
				return qb(o, t[n]), e
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
			fallbackRoot: s,
			fallbackFormat: a,
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
			return Yb(t.missingWarn) ? !t.missingWarn : t.missingWarn
		},
		set silentTranslationWarn(e) {
			t.missingWarn = Yb(e) ? !e : e
		},
		get silentFallbackWarn() {
			return Yb(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn
		},
		set silentFallbackWarn(e) {
			t.fallbackWarn = Yb(e) ? !e : e
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
			let s = null, a = null;
			if (!Xb(n)) throw n_(15);
			const l = n;
			return Xb(o) ? i.locale = o : Qb(o) ? s = o : Zb(o) && (a = o), Qb(r) ? s = r : Zb(r) && (a = r), t.t(l, s || a || {}, i)
		},
		rt: (...e) => t.rt(...e),
		tc(...e) {
			const [n, o, r] = e, i = {plural: 1};
			let s = null, a = null;
			if (!Xb(n)) throw n_(15);
			const l = n;
			return Xb(o) ? i.locale = o : Rb(o) ? i.plural = o : Qb(o) ? s = o : Zb(o) && (a = o), Xb(r) ? i.locale = r : Qb(r) ? s = r : Zb(r) && (a = r), t.t(l, s || a || {}, i)
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

const m_ = {
	tag: {type: [String, Object]},
	locale: {type: String},
	scope: {type: String, validator: e => "parent" === e || "global" === e, default: "parent"},
	i18n: {type: Object}
}, g_ = {
	name: "i18n-t",
	props: qb({
		keypath: {type: String, required: !0},
		plural: {type: [Number, String], validator: e => Rb(e) || !isNaN(e)}
	}, m_),
	setup(e, t) {
		const {slots: n, attrs: o} = t, r = e.i18n || S_({useScope: e.scope, __useComponent: !0}),
			i = Object.keys(n).filter((e => "_" !== e));
		return () => {
			const n = {};
			e.locale && (n.locale = e.locale), void 0 !== e.plural && (n.plural = Xb(e.plural) ? +e.plural : e.plural);
			const s = function ({slots: e}, t) {
				return 1 === t.length && "default" === t[0] ? e.default ? e.default() : [] : t.reduce(((t, n) => {
					const o = e[n];
					return o && (t[n] = o()), t
				}), {})
			}(t, i), a = r[o_](e.keypath, s, n), l = qb({}, o);
			return Xb(e.tag) || Jb(e.tag) ? xi(e.tag, l, a) : xi(jr, l, a)
		}
	}
};

function v_(e, t, n, o) {
	const {slots: r, attrs: i} = t;
	return () => {
		const t = {part: !0};
		let s = {};
		e.locale && (t.locale = e.locale), Xb(e.format) ? t.key = e.format : Jb(e.format) && (Xb(e.format.key) && (t.key = e.format.key), s = Object.keys(e.format).reduce(((t, o) => n.includes(o) ? qb({}, t, {[o]: e.format[o]}) : t), {}));
		const a = o(e.value, t, s);
		let l = [t.key];
		Qb(a) ? l = a.map(((e, t) => {
			const n = r[e.type];
			return n ? n({[e.type]: e.value, index: t, parts: a}) : [e.value]
		})) : Xb(a) && (l = [a]);
		const c = qb({}, i);
		return Xb(e.tag) || Jb(e.tag) ? xi(e.tag, c, l) : xi(jr, c, l)
	}
}

const b_ = ["localeMatcher", "style", "unit", "unitDisplay", "currency", "currencyDisplay", "useGrouping", "numberingSystem", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "notation", "formatMatcher"],
	y_ = {
		name: "i18n-n",
		props: qb({value: {type: Number, required: !0}, format: {type: [String, Object]}}, m_),
		setup(e, t) {
			const n = e.i18n || S_({useScope: "parent", __useComponent: !0});
			return v_(e, t, b_, ((...e) => n[i_](...e)))
		}
	},
	__ = ["dateStyle", "timeStyle", "fractionalSecondDigits", "calendar", "dayPeriod", "numberingSystem", "localeMatcher", "timeZone", "hour12", "hourCycle", "formatMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"],
	w_ = {
		name: "i18n-d",
		props: qb({value: {type: [Number, Date], required: !0}, format: {type: [String, Object]}}, m_),
		setup(e, t) {
			const n = e.i18n || S_({useScope: "parent", __useComponent: !0});
			return v_(e, t, __, ((...e) => n[r_](...e)))
		}
	};

function x_(e) {
	const t = (t, {instance: n, value: o, modifiers: r}) => {
		if (!n || !n.$) throw n_(22);
		const i = function (e, t) {
			const n = e;
			if ("composition" === e.mode) return n.__getInstance(t) || e.global;
			{
				const o = n.__getInstance(t);
				return null != o ? o.__composer : e.global.__composer
			}
		}(e, n.$), s = function (e) {
			if (Xb(e)) return {path: e};
			if (Zb(e)) {
				if (!("path" in e)) throw n_(19);
				return e
			}
			throw n_(20)
		}(o);
		t.textContent = i.t(...function (e) {
			const {path: t, locale: n, args: o, choice: r, plural: i} = e, s = {}, a = o || {};
			Xb(n) && (s.locale = n);
			Rb(r) && (s.plural = r);
			Rb(i) && (s.plural = i);
			return [t, a, s]
		}(s))
	};
	return {beforeMount: t, beforeUpdate: t}
}

function T_(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[s_](t.pluralizationRules || e.pluralizationRules);
	const n = u_(e.locale, {messages: t.messages, __i18n: t.__i18n});
	return Object.keys(n).forEach((t => e.mergeLocaleMessage(t, n[t]))), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n => e.mergeDateTimeFormat(n, t.datetimeFormats[n]))), t.numberFormats && Object.keys(t.numberFormats).forEach((n => e.mergeNumberFormat(n, t.numberFormats[n]))), e
}

function S_(e = {}) {
	const t = pi();
	if (null == t) throw n_(16);
	if (!t.appContext.app.__VUE_I18N_SYMBOL__) throw n_(17);
	const n = Jn(t.appContext.app.__VUE_I18N_SYMBOL__);
	if (!n) throw n_(22);
	const o = "composition" === n.mode ? n.global : n.global.__composer,
		r = Hb(e) ? "__i18n" in t.type ? "local" : "global" : e.useScope ? e.useScope : "local";
	if ("global" === r) {
		let n = Jb(e.messages) ? e.messages : {};
		"__i18nGlobal" in t.type && (n = u_(o.locale.value, {messages: n, __i18n: t.type.__i18nGlobal}));
		const r = Object.keys(n);
		if (r.length && r.forEach((e => {
			o.mergeLocaleMessage(e, n[e])
		})), Jb(e.datetimeFormats)) {
			const t = Object.keys(e.datetimeFormats);
			t.length && t.forEach((t => {
				o.mergeDateTimeFormat(t, e.datetimeFormats[t])
			}))
		}
		if (Jb(e.numberFormats)) {
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
					null != e && (o = e.__composer), n && o && !o[a_] && (o = null)
				}
				if (null != o) break;
				if (r === i) break;
				i = i.parent
			}
			return o
		}(n, t, e.__useComponent);
		return null == r && (r = o), r
	}
	if ("legacy" === n.mode) throw n_(18);
	const i = n;
	let s = i.__getInstance(t);
	if (null == s) {
		const n = t.type, r = qb({}, e);
		n.__i18n && (r.__i18n = n.__i18n), o && (r.__root = o), s = f_(r), function (e, t, n) {
			Fo((() => {
			}), t), Do((() => {
				e.__deleteInstance(t)
			}), t)
		}(i, t), i.__setInstance(t, s)
	}
	return s
}

const E_ = ["locale", "fallbackLocale", "availableLocales"], k_ = ["t", "rt", "d", "n", "tm"];
Iy = function (e, t = {}) {
	{
		const n = (t.onCacheKey || qy)(e), o = Vy[n];
		if (o) return o;
		let r = !1;
		const i = t.onError || vy;
		t.onError = e => {
			r = !0, i(e)
		};
		const {code: s} = Oy(e, t), a = new Function(`return ${s}`)();
		return r ? a : Vy[n] = a
	}
};
const A_ = {
	pages: [{
		path: "pages/index/index",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.index.index%"}
	}, {
		path: "pages/article/list",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.article.list%"}
	}, {
		path: "pages/auth/agreement",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.auth.agreement%"}
	}, {
		path: "pages/auth/bind",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.auth.bind%"}
	}, {
		path: "pages/auth/login",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.auth.login%"}
	}, {
		path: "pages/auth/register",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.auth.register%"}
	}, {
		path: "pages/auth/resetpwd",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.auth.resetpwd%"}
	}, {
		path: "pages/index/diy",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.index.diy%"}
	}, {
		path: "pages/index/close",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.index.close%"}
	}, {
		path: "pages/index/nosite",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.index.nosite%"}
	}, {
		path: "pages/article/detail",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.article.detail%"}
	}, {
		path: "pages/member/apply_cash_out",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.apply_cash_out%"},
		needLogin: !0
	}, {
		path: "pages/member/commission",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.commission%"},
		needLogin: !0
	}, {
		path: "pages/member/balance",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.balance%"},
		needLogin: !0
	}, {
		path: "pages/member/recharge_record",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.recharge_record%"},
		needLogin: !0
	}, {
		path: "pages/member/recharge_record_detail",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.recharge_record_detail%"},
		needLogin: !0
	}, {
		path: "pages/member/detailed_account",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.detailed_account%"}
	}, {
		path: "pages/member/cash_out",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.cash_out%"}
	}, {
		path: "pages/member/cash_out_detail",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.cash_out_detail%"}
	}, {
		path: "pages/member/index",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.index%"}
	}, {
		path: "pages/member/personal",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.personal%"},
		needLogin: !0
	}, {
		path: "pages/member/point",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.point%"},
		needLogin: !0
	}, {
		path: "pages/member/account",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.account%"},
		needLogin: !0
	}, {
		path: "pages/member/account_edit",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.member.account_edit%"},
		needLogin: !0
	}, {
		path: "pages/pay/browser",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.pay.browser%"}
	}, {
		path: "pages/pay/result",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.pay.result%"}
	}, {
		path: "pages/setting/index",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.setting.index%"},
		needLogin: !0
	}, {
		path: "pages/webview/index",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.webview.index%"}
	}, {
		path: "pages/index/develop",
		style: {navigationStyle: "custom", navigationBarTitleText: "%pages.index.develop%"}
	}],
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
	easycom: {custom: {"^u-(.*)": "uview-plus/components/u-$1/u-$1.vue", "diy-(.*)": "@/components/diy/$1/index.vue"}}
};

function C_() {
	return "/" + A_.pages[0].path
}

/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let B_;
const P_ = e => B_ = e, L_ = Symbol();

function O_(e) {
	return e && "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) && "function" != typeof e.toJSON
}

var I_, M_;
(M_ = I_ || (I_ = {})).direct = "direct", M_.patchObject = "patch object", M_.patchFunction = "patch function";
const F_ = "undefined" != typeof window;

function j_() {
	const e = Ne(!0), t = e.run((() => rn({})));
	let n = [], o = [];
	const r = Kt({
		install(e) {
			P_(r), r._a = e, e.provide(L_, r), e.config.globalProperties.$pinia = r, o.forEach((e => n.push(e))), o = []
		}, use(e) {
			return this._a ? n.push(e) : o.push(e), this
		}, _p: n, _a: null, _e: e, _s: new Map, state: t
	});
	return r
}

const N_ = () => {
};

function R_(e, t, n, o = N_) {
	e.push(t);
	const r = () => {
		const n = e.indexOf(t);
		n > -1 && (e.splice(n, 1), o())
	};
	var i;
	return !n && Re() && (i = r, Fe && Fe.cleanups.push(i)), r
}

function D_(e, ...t) {
	e.slice().forEach((e => {
		e(...t)
	}))
}

function H_(e, t) {
	e instanceof Map && t instanceof Map && t.forEach(((t, n) => e.set(n, t))), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (const n in t) {
		if (!t.hasOwnProperty(n)) continue;
		const o = t[n], r = e[n];
		O_(r) && O_(o) && e.hasOwnProperty(n) && !on(o) && !Ut(o) ? e[n] = H_(r, o) : e[n] = o
	}
	return e
}

const z_ = Symbol();
const {assign: q_} = Object;

function V_(e, t, n, o) {
	const {state: r, actions: i, getters: s} = t, a = n.state.value[e];
	let l;
	return l = W_(e, (function () {
		a || (n.state.value[e] = r ? r() : {});
		const t = function (e) {
			const t = P(e) ? new Array(e.length) : {};
			for (const n in e) t[n] = fn(e, n);
			return t
		}(n.state.value[e]);
		return q_(t, i, Object.keys(s || {}).reduce(((t, o) => (t[o] = Kt(wi((() => {
			P_(n);
			const t = n._s.get(e);
			return s[o].call(t, t)
		}))), t)), {}))
	}), t, n, o, !0), l
}

function W_(e, t, n = {}, o, r, i) {
	let s;
	const a = q_({actions: {}}, n), l = {deep: !0};
	let c, u, d, p = Kt([]), f = Kt([]);
	const h = o.state.value[e];
	let m;

	function g(t) {
		let n;
		c = u = !1, "function" == typeof t ? (t(o.state.value[e]), n = {
			type: I_.patchFunction,
			storeId: e,
			events: d
		}) : (H_(o.state.value[e], t), n = {type: I_.patchObject, payload: t, storeId: e, events: d});
		const r = m = Symbol();
		Cn().then((() => {
			m === r && (c = !0)
		})), u = !0, D_(p, n, o.state.value[e])
	}

	i || h || (o.state.value[e] = {}), rn({});
	const v = i ? function () {
		const {state: e} = n, t = e ? e() : {};
		this.$patch((e => {
			q_(e, t)
		}))
	} : N_;

	function b(t, n) {
		return function () {
			P_(o);
			const r = Array.from(arguments), i = [], s = [];

			function a(e) {
				i.push(e)
			}

			function l(e) {
				s.push(e)
			}

			let c;
			D_(f, {args: r, name: t, store: y, after: a, onError: l});
			try {
				c = n.apply(this && this.$id === e ? this : y, r)
			} catch (u) {
				throw D_(s, u), u
			}
			return c instanceof Promise ? c.then((e => (D_(i, e), e))).catch((e => (D_(s, e), Promise.reject(e)))) : (D_(i, c), c)
		}
	}

	const y = Wt({
		_p: o, $id: e, $onAction: R_.bind(null, f), $patch: g, $reset: v, $subscribe(t, n = {}) {
			const r = R_(p, t, n.detached, (() => i())), i = s.run((() => Zn((() => o.state.value[e]), (o => {
				("sync" === n.flush ? u : c) && t({storeId: e, type: I_.direct, events: d}, o)
			}), q_({}, l, n))));
			return r
		}, $dispose: function () {
			s.stop(), p = [], f = [], o._s.delete(e)
		}
	});
	o._s.set(e, y);
	const _ = o._e.run((() => (s = Ne(), s.run((() => t())))));
	for (const T in _) {
		const t = _[T];
		if (on(t) && (!on(x = t) || !x.effect) || Ut(t)) i || (!h || O_(w = t) && w.hasOwnProperty(z_) || (on(t) ? t.value = h[T] : H_(t, h[T])), o.state.value[e][T] = t); else if ("function" == typeof t) {
			const e = b(T, t);
			_[T] = e, a.actions[T] = t
		}
	}
	var w, x;
	return q_(y, _), q_(Gt(y), _), Object.defineProperty(y, "$state", {
		get: () => o.state.value[e], set: e => {
			g((t => {
				q_(t, e)
			}))
		}
	}), o._p.forEach((e => {
		q_(y, s.run((() => e({store: y, app: o._a, pinia: o, options: a}))))
	})), h && i && n.hydrate && n.hydrate(y.$state, h), c = !0, u = !0, y
}

function $_(e, t, n) {
	let o, r;
	const i = "function" == typeof t;

	function s(e, n) {
		const s = pi();
		(e = e || s && Jn(L_, null)) && P_(e), (e = B_)._s.has(o) || (i ? W_(o, t, r, e) : V_(o, r, e));
		return e._s.get(o)
	}

	return "string" == typeof e ? (o = e, r = i ? n : t) : (r = e, o = e.id), s.$id = o, s
}

let Q_ = "Store";

function U_(e, t) {
	return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = function () {
		return e(this.$pinia)[n]
	}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = function () {
		const n = e(this.$pinia), r = t[o];
		return "function" == typeof r ? r.call(this, n) : n[r]
	}, n)), {})
}

const X_ = U_;
const Y_ = Object.freeze(Object.defineProperty({
	__proto__: null, get MutationType() {
		return I_
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
					this._provided[L_] = t, this.$pinia || (this.$pinia = t), t._a = this, F_ && P_(t)
				} else !this.$pinia && e.parent && e.parent.$pinia && (this.$pinia = e.parent.$pinia)
			}, destroyed() {
				delete this._pStores
			}
		})
	}, acceptHMRUpdate: function (e, t) {
		return () => {
		}
	}, createPinia: j_, defineStore: $_, getActivePinia: () => pi() && Jn(L_) || B_, mapActions: function (e, t) {
		return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = function (...t) {
			return e(this.$pinia)[n](...t)
		}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = function (...n) {
			return e(this.$pinia)[t[o]](...n)
		}, n)), {})
	}, mapGetters: X_, mapState: U_, mapStores: function (...e) {
		return e.reduce(((e, t) => (e[t.$id + Q_] = function () {
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
	}, setActivePinia: P_, setMapStoreSuffix: function (e) {
		Q_ = e
	}, skipHydrate: function (e) {
		return Object.defineProperty(e, z_, {})
	}, storeToRefs: function (e) {
		{
			e = Gt(e);
			const t = {};
			for (const n in e) {
				const o = e[n];
				(on(o) || Ut(o)) && (t[n] = fn(e, n))
			}
			return t
		}
	}
}, Symbol.toStringTag, {value: "Module"})), J_ = $_("diy", {
	state: () => ({
		mode: "",
		currentIndex: -99,
		global: {title: "", pageBgColor: "", bottomTabBarSwitch: !0, bgUrl: ""},
		value: []
	}), getters: {}, actions: {
		init() {
			var e = JSON.stringify({type: "init", load: !0});
			window.parent.postMessage(e, "*"), window.addEventListener("message", (e => {
				try {
					let t = JSON.parse(e.data);
					this.currentIndex = t.currentIndex, t.global && (this.global = t.global), t.value && (this.value = t.value), this.value && this.value.forEach(((e, t) => {
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
				global: Gt(this.global),
				value: Gt(this.value),
				component: Gt(t)
			});
			window.parent.postMessage(n, "*")
		}, changeCurrentIndex(e, t = null) {
			if ("" != this.mode && this.currentIndex != e) {
				this.currentIndex = e;
				var n = JSON.stringify({type: "change", index: e, component: Gt(t)});
				window.parent.postMessage(n, "*")
			}
		}
	}
});
const G_ = new class {
	constructor() {
		this.config = {url: "", header: {}}, this.baseUrl = `${location.origin}/api/`;
		try {
			this.config.header["site-id"] = Nw(""), this.config.header.channel = Mw()
		} catch (e) {
		}
	}

	requestInterceptors() {
		try {
			Bw() && (this.config.header.token = Bw()), this.config.header.channel = Mw(), this.config.header["site-id"] = Nw("")
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
			xg({
				...o, success: n => {
					const o = JSON.parse(n.data);
					1 == o.code ? (this.config.showSuccessMessage && zg({
						title: o.msg,
						icon: "none"
					}), e(o)) : (this.handleAuthError(o.code), this.config.showErrorMessage && zg({
						title: o.msg,
						icon: "none"
					}), t(o))
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
			gg({
				...o, success: n => {
					const o = n.data;
					1 == o.code ? (this.config.showSuccessMessage && zg({
						title: o.msg,
						icon: "none"
					}), e(o)) : (this.handleAuthError(o.code), this.config.showErrorMessage && zg({
						title: o.msg,
						icon: "none"
					}), t(o))
				}, fail: e => {
					t(e)
				}, complete: e => {
					this.handleRequestFail(e)
				}
			})
		}))
	}

	handleAuthError(e) {
		if (401 === e) Sw().logout()
	}

	handleRequestFail(e) {
		e.errMsg && "request:ok" == e.errMsg && "string" == typeof e.data ? zg({
			icon: "none",
			title: this.baseUrl + Qw("requestFail")
		}) : "request:fail" != e.errMsg ? e.errMsg && "request:fail url not in domain list" == e.errMsg && zg({
			icon: "none",
			title: this.baseUrl + Qw("notInDomainList")
		}) : zg({icon: "none", title: this.baseUrl + Qw("requestFail")})
	}
};

function K_(e) {
	return G_.get("member/account/point", e)
}

function Z_(e) {
	return G_.get("member/account/balance", e)
}

function ew(e) {
	return G_.get("member/account/money", e)
}

function tw(e) {
	return G_.put(`member/modify/${e.field}`, e, {showErrorMessage: !0})
}

function nw(e) {
	return G_.post("order/recharge", e, {showErrorMessage: !0})
}

function ow(e) {
	return G_.get("order/recharge", e, {showErrorMessage: !0})
}

function rw(e) {
	return G_.get(`order/recharge/${e}`, {}, {showErrorMessage: !0})
}

function iw(e) {
	return G_.put("member/mobile", e, {showErrorMessage: !0})
}

function sw() {
	return G_.get("member/cash_out/config")
}

function aw(e) {
	return G_.post("member/cash_out/apply", e, {showSuccessMessage: !0, showErrorMessage: !0})
}

function lw(e) {
	return G_.get(`member/cashout_account/${e.account_id}`, {})
}

function cw(e) {
	return G_.get("member/cashout_account/firstinfo", e)
}

function uw(e) {
	return G_.get("member/cashout_account", e)
}

function dw(e) {
	return G_.get("member/cash_out", e)
}

function pw(e) {
	return G_.get(`member/cash_out/${e}`)
}

function fw(e) {
	return G_.post("member/cashout_account", e, {showSuccessMessage: !0, showErrorMessage: !0})
}

function hw(e) {
	return G_.put(`member/cashout_account/${e.account_id}`, e, {showSuccessMessage: !0, showErrorMessage: !0})
}

function mw(e) {
	return G_.delete(`member/cashout_account/${e}`, {showSuccessMessage: !0, showErrorMessage: !0})
}

function gw(e) {
	return G_.get("member/account/commission", e)
}

function vw(e) {
	return G_.get("login", e, {showErrorMessage: !0})
}

function bw(e) {
	return G_.post("login/mobile", e, {showErrorMessage: !0})
}

function yw(e) {
	return G_.post("register", e, {showErrorMessage: !0})
}

function _w(e) {
	return G_.post("register/mobile", e, {showErrorMessage: !0})
}

function ww(e) {
	return G_.post("wechat/login", e)
}

function xw(e) {
	return G_.post("bind", e, {showErrorMessage: !0})
}

function Tw(e) {
	return G_.post("member/log", e, {showErrorMessage: !1})
}

const Sw = $_("member", {
	state: () => ({token: uni.getStorageSync("wapToken"), info: null}),
	actions: {
		async setToken(e) {
			this.token = e, function (e) {
				uni.setStorageSync("wapToken", e)
			}(e), await this.getMemberInfo()
		}, async getMemberInfo() {
			await G_.get("member/member").then((e => {
				this.info = e.data
			})).catch((async () => {
				await this.logout()
			}))
		}, async logout(e = !1) {
			await G_.put("auth/logout").then((() => {
				this.$reset(), Pw(), e && Ew({url: "/pages/index/index"})
			})).catch((() => {
				this.$reset(), Pw(), e && Ew({url: "/pages/index/index"})
			}))
		}
	}
}), Ew = e => {
	if ("decorate" == J_().mode) return;
	let {url: t, mode: n, param: o, success: r, fail: i, complete: s} = e;
	n = n || "navigateTo";
	switch (A_.tabBar.list.map((e => `/${e.pagePath}`)).includes(t) && (n = "switchTab"), "switchTab" != n && o && Object.keys(o).length && (t += uni.$u.queryParams(o)), n) {
		case"switchTab":
			Bg({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					s && s()
				}
			});
			break;
		case"navigateTo":
			Eg({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					s && s()
				}
			});
			break;
		case"reLaunch":
			Ag({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					s && s()
				}
			});
			break;
		case"redirectTo":
			kg({
				url: t, success: () => {
					r && r()
				}, fail: () => {
					i && i()
				}, complete: () => {
					s && s()
				}
			})
	}
}, kw = e => {
	"decorate" != J_().mode && null != e && 1 != Object.keys(e).length && e.url && (-1 != e.url.indexOf("http") || -1 != e.url.indexOf("http") ? window.location.href = e.url : Ew({url: e.url}))
}, Aw = () => {
	const e = Hh(), t = e[e.length - 1];
	return t ? t.route : ""
}, Cw = () => {
	const e = Hh();
	let t = e[e.length - 1].route, n = e[e.length - 1].$page.options, o = {};
	for (let r in n) o[r] = n[r];
	return {path: "/" + t, params: o}
};

function Bw() {
	return Sw().token
}

function Pw() {
	uni.removeStorageSync("wapToken")
}

function Lw(e) {
	const t = {}, [n, o] = e.split("?");
	return o && o.split("&").forEach((e => {
		let [n, o] = e.split("=");
		t[n] = o
	})), {path: n, query: t}
}

function Ow(e) {
	return -1 != (t = e).indexOf("http://") || -1 != t.indexOf("https://") ? e : `${location.origin}/${e}`;
	var t
}

function Iw() {
	let e = navigator.userAgent.toLowerCase();
	return !!/micromessenger/.test(e)
}

function Mw() {
	return Iw() ? "wechat" : "h5"
}

function Fw(e) {
	return isNaN(parseFloat(e)) ? e : parseFloat(e).toFixed(2)
}

function jw(e) {
	return e.substring(0, 3) + "****" + e.substr(e.length - 4)
}

function Nw(e) {
	const t = location.href.match(/\/s(\d*)\//);
	return t ? t[1] : e
}

function Rw(e) {
	try {
		const t = {"zh-Hans": r, en: n}, o = e.replace("/", "").replaceAll("/", ".");
		t[Ud()][o] && setTimeout((() => {
			$g({
				title: t[Ud()][o], fail(t) {
					Rw(e)
				}
			})
		}), 500)
	} catch (t) {
		console.log(t)
	}
}

const Dw = {
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
}, Hw = {
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
	pay: Dw,
	myBalance: "我的余额",
	myPoint: "我的积分",
	customerService: "联系客服",
	siteClose: "站点已关闭",
	noSite: "站点不存在"
}, zw = Object.freeze(Object.defineProperty({
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
	default: Hw,
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
	pay: Dw,
	point: "积分",
	privacyAgreement: "隐私协议",
	register: "注册",
	requestFail: "请求失败",
	save: "保存",
	siteClose: "站点已关闭",
	smsCodeChangeText: "秒后重新获取",
	userAgreement: "用户协议"
}, Symbol.toStringTag, {value: "Module"})), qw = {index: "Index"}, Vw = Object.freeze(Object.defineProperty({
	__proto__: null,
	default: qw,
	index: "Index"
}, Symbol.toStringTag, {value: "Module"}));
let Ww = function (e = {}) {
	const t = !Yb(e.legacy) || e.legacy, n = !!e.globalInjection, o = new Map, r = t ? h_(e) : f_(e), i = jb(""), s = {
		get mode() {
			return t ? "legacy" : "composition"
		}, async install(e, ...o) {
			e.__VUE_I18N_SYMBOL__ = i, e.provide(e.__VUE_I18N_SYMBOL__, s), !t && n && function (e, t) {
				const n = Object.create(null);
				E_.forEach((e => {
					const o = Object.getOwnPropertyDescriptor(t, e);
					if (!o) throw n_(22);
					const r = on(o.value) ? {
						get: () => o.value.value, set(e) {
							o.value.value = e
						}
					} : {get: () => o.get && o.get()};
					Object.defineProperty(n, e, r)
				})), e.config.globalProperties.$i18n = n, k_.forEach((n => {
					const o = Object.getOwnPropertyDescriptor(t, n);
					if (!o || !o.value) throw n_(22);
					Object.defineProperty(e.config.globalProperties, `$${n}`, o)
				}))
			}(e, s.global), function (e, t, ...n) {
				const o = Zb(n[0]) ? n[0] : {}, r = !!o.useI18nComponentName;
				(!Yb(o.globalInstall) || o.globalInstall) && (e.component(r ? "i18n" : g_.name, g_), e.component(y_.name, y_), e.component(w_.name, w_)), e.directive("t", x_(t))
			}(e, s, ...o), t && e.mixin(function (e, t, n) {
				return {
					beforeCreate() {
						const o = pi();
						if (!o) throw n_(22);
						const r = this.$options;
						if (r.i18n) {
							const n = r.i18n;
							r.__i18n && (n.__i18n = r.__i18n), n.__root = t, this === this.$root ? this.$i18n = T_(e, n) : (n.__injectWithOption = !0, this.$i18n = h_(n))
						} else r.__i18n ? this === this.$root ? this.$i18n = T_(e, r) : this.$i18n = h_({
							__i18n: r.__i18n,
							__injectWithOption: !0,
							__root: t
						}) : this.$i18n = e;
						e.__onComponentInstanceCreated(this.$i18n), n.__setInstance(o, this.$i18n), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$tc = (...e) => this.$i18n.tc(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = e => this.$i18n.tm(e)
					}, mounted() {
					}, beforeUnmount() {
						const e = pi();
						if (!e) throw n_(22);
						delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, n.__deleteInstance(e), delete this.$i18n
					}
				}
			}(r, r.__composer, s))
		}, get global() {
			return r
		}, __instances: o, __getInstance: e => o.get(e) || null, __setInstance(e, t) {
			o.set(e, t)
		}, __deleteInstance(e) {
			o.delete(e)
		}
	};
	return s
}({locale: Ud(), globalInjection: !0, messages: {"zh-Hans": Hw, en: qw}});
const $w = new class {
	constructor(e) {
		this.loadLocale = [], this.i18n = e
	}

	setI18nLanguage(e, t) {
		this.i18n.mode, this.i18n.global.locale = e, Xd(e), Rw(t)
	}

	async loadLocaleMessages(e, n) {
		try {
			const o = "/" == e ? "pages.index.index" : e.replace("/", "").replaceAll("/", ".");
			if (this.loadLocale.includes(`${n}/${o}`)) return this.setI18nLanguage(n, o), Cn();
			this.loadLocale.push(`${n}/${o}`);
			const r = await ((e, t) => {
				const n = e[t];
				return n ? "function" == typeof n ? n() : Promise.resolve(n) : new Promise(((e, n) => {
					("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + t)))
				}))
			})(Object.assign({
				"./en/common.json": () => t((() => Promise.resolve().then((() => Vw))), void 0),
				"./en/pages.setting.index.json": () => t((() => import("./locale-en-pages.setting.index.b1f97200.js")), []),
				"./zh-Hans/common.json": () => t((() => Promise.resolve().then((() => zw))), void 0),
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
			return this.i18n.global.mergeLocaleMessage(n, r.default), this.setI18nLanguage(n, e), Cn()
		} catch (o) {
			return this.setI18nLanguage(n, e), Cn()
		}
	}
}(Ww), Qw = e => Ww.global.t(e), Uw = {
	install(e) {
		e.use(Ww)
	}
};

function Xw() {
	return G_.get("captcha", {}, {showErrorMessage: !0})
}

function Yw(e) {
	return G_.post("wechat/sync", e)
}

function Jw(e) {
	return G_.get(`agreement/${e}`)
}

function Gw(e) {
	return G_.post("password/reset", e, {showErrorMessage: !0})
}

function Kw(e) {
	return G_.post(`send/mobile/${e.type}`, e, {showErrorMessage: !0})
}

function Zw(e) {
	return G_.get("wechat/jssdkconfig", e)
}

function ex(e) {
	return G_.upload("file/image", e, {showErrorMessage: !0})
}

function tx(e) {
	return G_.get("diy/diy", e)
}

function nx(e) {
	return G_.get("diy/share", e)
}

const ox = $_("config", {
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
			await G_.get("login/config").then((e => {
				this.login.is_username = parseInt(e.data.is_username), this.login.is_mobile = parseInt(e.data.is_mobile), this.login.is_auth_register = parseInt(e.data.is_auth_register), this.login.is_bind_mobile = parseInt(e.data.is_bind_mobile), this.login.agreement_show = parseInt(e.data.agreement_show)
			})).catch((() => {
			}))
		}, async getTabbarConfig() {
			await G_.get("diy/tabbar").then((e => {
				this.tabbar = e.data
			})).catch((() => {
			}))
		}
	}
});

function rx() {
	return {
		setLoginBack: e => {
			uni.setStorage({key: "loginBack", data: e}), setTimeout((() => {
				const e = ox();
				Iw() && uni.getStorageSync("openid") && e.login.is_bind_mobile ? Ew({
					url: "/pages/auth/bind",
					mode: "redirectTo"
				}) : Ew({url: "/pages/auth/login", mode: "redirectTo"})
			}))
		}, handleLoginBack: () => {
			uni.getStorage({
				key: "loginBack", success: e => {
					Ew(e ? e.data : {url: "/pages/index/index"})
				}, fail: e => {
					Ew({url: "/pages/index/index"})
				}
			})
		}, authLogin: e => {
			let t = null;
			t = ww, t({code: e}).then((e => {
				e.data.token ? Sw().setToken(e.data.token) : uni.setStorageSync("openid", e.data.openid)
			}))
		}, getAuthCode: (e = "snsapi_base") => {
			let t = `${location.origin}${location.pathname}`, n = Lw(location.href).query;
			var o;
			n.code && delete n.code, Object.keys(n).length && (t += uni.$u.queryParams(n)), (o = {
				url: t,
				scopes: e
			}, G_.get("wechat/codeurl", o)).then((e => {
				location.href = e.data.url
			}))
		}
	}
}

const ix = rx();

function sx(e) {
	(function () {
		const e = [];
		return A_.pages.forEach((t => {
			t.needLogin && e.push(`/${t.path}`)
		})), A_.subPackages && A_.subPackages.forEach((t => {
			t.pages.forEach((n => {
				n.needLogin && e.push(`/${t.root}/${n.path}`)
			}))
		})), e
	})().includes(e.path) && !Bw() && setTimeout((() => {
		ix.setLoginBack({url: e.path, param: e.query || {}})
	}), 100)
}

const ax = $_("system", {
	state: () => ({site: null}), actions: {
		async getSitenfo() {
			await G_.get("site").then((e => {
				this.site = e.data, 3 == this.site.status && Ew({url: "/pages/index/close", mode: "reLaunch"})
			})).catch((e => {
				Ew({url: "/pages/index/nosite", mode: "reLaunch"})
			}))
		}
	}
}), lx = ho({
	__name: "App", setup: e => (({}.VITE_APP_DEBUG && new window.VConsole, Cb((async e => {
		(() => {
			const e = Jd();
			e.path = `/${e.path}`, Rw(e.path), $w.loadLocaleMessages(e.path, Ud()), sx(e), e.query && e.query.mid && uni.setStorageSync("pid", e.query.mid), Bw() && Tw({
				route: e.path,
				params: JSON.stringify(e.query || {}),
				pre_route: ""
			})
		})(), ["navigateTo", "redirectTo", "reLaunch", "switchTab"].forEach((e => {
			yd(e, {
				invoke(e) {
					const t = Lw(e.url);
					$w.loadLocaleMessages(t.path, Ud()), Rw(t.path), sx(t), Bw() && Tw({
						route: t.path,
						params: JSON.stringify(t.query),
						pre_route: Hh()[0].route
					})
				}
			})
		})), "ios" == Rm().platform && uni.setStorageSync("initUrl", location.href);
		const t = ox();
		if (t.getTabbarConfig(), await t.getLoginConfig(), ax().getSitenfo(), ev(), Bw()) {
			const e = Sw();
			await e.setToken(Bw())
		}
		if (!Bw()) {
			const t = rx();
			Iw() && (e.query.code ? t.authLogin(e.query.code) : t.getAuthCode("snsapi_userinfo"))
		}
		window.addEventListener("popstate", (function (e) {
			const t = "/" + location.pathname.replace(Mb.h5.router.base, "");
			$w.loadLocaleMessages(t, Ud())
		}), !1)
	})), kb((() => {
	})), Ab((() => {
	})), () => {
	}))
});
fm(lx, {
	init: dm, setup(e) {
		const t = Ah(), n = () => {
			var n;
			n = e, Object.keys(Yd).forEach((e => {
				Yd[e].forEach((t => {
					Oo(e, t, n)
				}))
			}));
			const {onLaunch: o, onShow: r, onPageNotFound: i, onError: s} = e, a = function ({path: e, query: t}) {
				return k(Bp, {path: e, query: t}), k(Pp, Bp), k({}, Bp)
			}({path: t.path.slice(1) || __uniRoutes[0].meta.route, query: we(t.query)});
			if (o && K(o, a), r && K(r, a), !t.matched.length) {
				const e = {notFound: !0, openType: "appLaunch", path: t.path, query: {}, scene: 1001};
				i && K(i, e)
			}
			s && (e.appContext.config.errorHandler = e => {
				K(s, e)
			})
		};
		return Jn(ol).isReady().then(n), Fo((() => {
			window.addEventListener("resize", Se(mm, 50, {
				setTimeout: setTimeout,
				clearTimeout: clearTimeout
			})), window.addEventListener("message", gm), document.addEventListener("visibilitychange", vm), function () {
				let e = null;
				try {
					e = window.matchMedia("(prefers-color-scheme: dark)")
				} catch (t) {
				}
				if (e) {
					let t = e => {
						dv.emit("onThemeChange", {theme: e.matches ? "dark" : "light"})
					};
					e.addEventListener ? e.addEventListener("change", t) : e.addListener(t)
				}
			}()
		})), t.query
	}, before(e) {
		e.mpType = "app";
		const {setup: t} = e, n = () => (qr(), Ur(cv));
		e.setup = (e, o) => {
			const r = t && t(e, o);
			return M(r) ? n : r
		}, e.render = n
	}
});
const cx = {
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
}, ux = {}, {toString: dx} = Object.prototype;

function px(e) {
	return "[object Array]" === dx.call(e)
}

function fx(e, t) {
	if (null != e) if ("object" != typeof e && (e = [e]), px(e)) for (let n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e); else for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.call(null, e[n], n, e)
}

function hx() {
	const e = {};

	function t(t, n) {
		"object" == typeof e[n] && "object" == typeof t ? e[n] = hx(e[n], t) : e[n] = "object" == typeof t ? hx({}, t) : t
	}

	for (let n = 0, o = arguments.length; n < o; n++) fx(arguments[n], t);
	return e
}

function mx(e) {
	return void 0 === e
}

function gx(e) {
	return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function vx(e, t) {
	if (!t) return e;
	let n;
	if (o = t, "undefined" != typeof URLSearchParams && o instanceof URLSearchParams) n = t.toString(); else {
		const e = [];
		fx(t, ((t, n) => {
			null != t && (px(t) ? n = `${n}[]` : t = [t], fx(t, (t => {
				!function (e) {
					return "[object Date]" === dx.call(e)
				}(t) ? function (e) {
					return null !== e && "object" == typeof e
				}(t) && (t = JSON.stringify(t)) : t = t.toISOString(), e.push(`${gx(n)}=${gx(t)}`)
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

const bx = (e, t) => {
	const n = {};
	return e.forEach((e => {
		mx(t[e]) || (n[e] = t[e])
	})), n
}, yx = e => (e => new Promise(((t, n) => {
	const o = vx((r = e.baseURL, i = e.url, r && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(i) ? function (e, t) {
		return t ? `${e.replace(/\/+$/, "")}/${t.replace(/^\/+/, "")}` : e
	}(r, i) : i), e.params);
	var r, i;
	const s = {
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
	let a;
	if ("UPLOAD" === e.method) {
		delete s.header["content-type"], delete s.header["Content-Type"];
		const t = {filePath: e.filePath, name: e.name}, n = ["files", "file", "timeout", "formData"];
		a = xg({...s, ...t, ...bx(n, e)})
	} else if ("DOWNLOAD" === e.method) mx(e.timeout) || (s.timeout = e.timeout), a = _g(s); else {
		const t = ["data", "method", "timeout", "dataType", "responseType", "withCredentials"];
		a = gg({...s, ...bx(t, e)})
	}
	e.getTask && e.getTask(a, e)
})))(e);

function _x() {
	this.handlers = []
}

_x.prototype.use = function (e, t) {
	return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
}, _x.prototype.eject = function (e) {
	this.handlers[e] && (this.handlers[e] = null)
}, _x.prototype.forEach = function (e) {
	this.handlers.forEach((t => {
		null !== t && e(t)
	}))
};
const wx = (e, t, n) => {
	const o = {};
	return e.forEach((e => {
		mx(n[e]) ? mx(t[e]) || (o[e] = t[e]) : o[e] = n[e]
	})), o
}, xx = {
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
var Tx = function () {
	function e(e, t) {
		return null != t && e instanceof t
	}

	var t, n, o;
	try {
		t = Map
	} catch (a) {
		t = function () {
		}
	}
	try {
		n = Set
	} catch (a) {
		n = function () {
		}
	}
	try {
		o = Promise
	} catch (a) {
		o = function () {
		}
	}

	function r(i, a, l, c, u) {
		"object" == typeof a && (l = a.depth, c = a.prototype, u = a.includeNonEnumerable, a = a.circular);
		var d = [], p = [], f = "undefined" != typeof Buffer;
		return void 0 === a && (a = !0), void 0 === l && (l = 1 / 0), function i(l, h) {
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
			})); else if (r.__isArray(l)) m = []; else if (r.__isRegExp(l)) m = new RegExp(l.source, s(l)), l.lastIndex && (m.lastIndex = l.lastIndex); else if (r.__isDate(l)) m = new Date(l.getTime()); else {
				if (f && Buffer.isBuffer(l)) return Buffer.from ? m = Buffer.from(l) : (m = new Buffer(l.length), l.copy(m)), m;
				e(l, Error) ? m = Object.create(l) : void 0 === c ? (g = Object.getPrototypeOf(l), m = Object.create(g)) : (m = Object.create(c), g = c)
			}
			if (a) {
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

	function s(e) {
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
	}, r.__getRegExpFlags = s, r
}();
const Sx = (new class {
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
		"navigateTo" != e.type && "to" != e.type || Eg({
			url: t,
			animationType: r,
			animationDuration: i
		}), "redirectTo" != e.type && "redirect" != e.type || kg({url: t}), "switchTab" != e.type && "tab" != e.type || Bg({url: t}), "reLaunch" != e.type && "launch" != e.type || Ag({url: t}), "navigateBack" != e.type && "back" != e.type || Tg({delta: o})
	}
}).route;

function Ex(e, t = !0) {
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

function kx(e) {
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

const Ax = {
	colorGradient: function (e = "rgb(0, 0, 0)", t = "rgb(255, 255, 255)", n = 10) {
		const o = Ex(e, !1), r = o[0], i = o[1], s = o[2], a = Ex(t, !1), l = (a[0] - r) / n, c = (a[1] - i) / n,
			u = (a[2] - s) / n, d = [];
		for (let p = 0; p < n; p++) {
			let o = kx(`rgb(${Math.round(l * p + r)},${Math.round(c * p + i)},${Math.round(u * p + s)})`);
			0 === p && (o = kx(e)), p === n - 1 && (o = kx(t)), d.push(o)
		}
		return d
	}, hexToRgb: Ex, rgbToHex: kx, colorToRgba: function (e, t) {
		e = kx(e);
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

function Cx(e) {
	return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(e)
}

function Bx(e) {
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

function Px(e) {
	return "[object Object]" === Object.prototype.toString.call(e)
}

function Lx(e) {
	return "function" == typeof e
}

const Ox = {
	email: function (e) {
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e)
	}, mobile: function (e) {
		return /^1[23456789]\d{9}$/.test(e)
	}, url: function (e) {
		return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(e)
	}, date: function (e) {
		return !!e && (Cx(e) && (e = +e), !/Invalid|NaN/.test(new Date(e).toString()))
	}, dateISO: function (e) {
		return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
	}, number: Cx, digits: function (e) {
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
	}, empty: Bx, isEmpty: Bx, jsonString: function (e) {
		if ("string" == typeof e) try {
			const t = JSON.parse(e);
			return !("object" != typeof t || !t)
		} catch (t) {
			return !1
		}
		return !1
	}, landline: function (e) {
		return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(e)
	}, object: Px, array: function (e) {
		return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
	}, code: function (e, t = 6) {
		return new RegExp(`^\\d{${t}}$`).test(e)
	}, func: Lx, promise: function (e) {
		return Px(e) && Lx(e.then) && Lx(e.catch)
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
let Ix, Mx = null;

function Fx(e, t = 15) {
	return +parseFloat(Number(e).toPrecision(t))
}

function jx(e) {
	const t = e.toString().split(/[eE]/), n = (t[0].split(".")[1] || "").length - +(t[1] || 0);
	return n > 0 ? n : 0
}

function Nx(e) {
	if (-1 === e.toString().indexOf("e")) return Number(e.toString().replace(".", ""));
	const t = jx(e);
	return t > 0 ? Fx(Number(e) * Math.pow(10, t)) : Number(e)
}

function Rx(e) {
	(e > Number.MAX_SAFE_INTEGER || e < Number.MIN_SAFE_INTEGER) && console.warn(`${e} 超出了精度限制，结果可能不正确`)
}

function Dx(e, t) {
	const [n, o, ...r] = e;
	let i = t(n, o);
	return r.forEach((e => {
		i = t(i, e)
	})), i
}

function Hx(...e) {
	if (e.length > 2) return Dx(e, Hx);
	const [t, n] = e, o = Nx(t), r = Nx(n), i = jx(t) + jx(n), s = o * r;
	return Rx(s), s / Math.pow(10, i)
}

function zx(...e) {
	if (e.length > 2) return Dx(e, zx);
	const [t, n] = e, o = Nx(t), r = Nx(n);
	return Rx(o), Rx(r), Hx(o / r, Fx(Math.pow(10, jx(n) - jx(t))))
}

function qx(e) {
	if ([null, void 0, NaN, !1].includes(e)) return e;
	if ("object" != typeof e && "function" != typeof e) return e;
	const t = Ox.array(e) ? [] : {};
	for (const n in e) e.hasOwnProperty(n) && (t[n] = "object" == typeof e[n] ? qx(e[n]) : e[n]);
	return t
}

function Vx(e = null, t = "yyyy-mm-dd") {
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

function Wx(e, t = "both") {
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
const $x = {
	range: function (e = 0, t = 0, n = 0) {
		return Math.max(e, Math.min(t, Number(n)))
	}, getPx: function (e, t = !1) {
		return Ox.number(e) ? t ? `${e}px` : Number(e) : /(rpx|upx)$/.test(e) ? t ? `${vd(parseInt(e))}px` : Number(vd(parseInt(e))) : t ? `${parseInt(e)}px` : parseInt(e)
	}, sleep: function (e = 30) {
		return new Promise((t => {
			setTimeout((() => {
				t()
			}), e)
		}))
	}, os: function () {
		return Rm().platform.toLowerCase()
	}, sys: function () {
		return Rm()
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
		if (Ox.empty(e) || "object" == typeof e && "object" === t || "string" === t && "string" == typeof e) return e;
		if ("object" === t) {
			const t = (e = Wx(e)).split(";"), n = {};
			for (let e = 0; e < t.length; e++) if (t[e]) {
				const o = t[e].split(":");
				n[Wx(o[0])] = Wx(o[1])
			}
			return n
		}
		let n = "";
		for (const o in e) {
			n += `${o.replace(/([A-Z])/g, "-$1").toLowerCase()}:${e[o]};`
		}
		return Wx(n)
	}, addUnit: function (e = "auto", t = "") {
		return t || (t = uni.$u.config.unit || "px"), e = String(e), Ox.number(e) ? `${e}${t}` : e
	}, deepClone: qx, deepMerge: function e(t = {}, n = {}) {
		if ("object" != typeof (t = qx(t)) || "object" != typeof n) return !1;
		for (const o in n) n.hasOwnProperty(o) && (o in t ? "object" != typeof t[o] || "object" != typeof n[o] ? t[o] = n[o] : t[o].concat && n[o].concat ? t[o] = t[o].concat(n[o]) : t[o] = e(t[o], n[o]) : t[o] = n[o]);
		return t
	}, error: function (e) {
	}, randomArray: function (e = []) {
		return e.sort((() => Math.random() - .5))
	}, timeFormat: Vx, timeFrom: function (e = null, t = "yyyy-mm-dd") {
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
				o = !1 === t ? n >= 2592e3 && n < 31536e3 ? `${parseInt(n / 2592e3)}个月前` : `${parseInt(n / 31536e3)}年前` : Vx(e, t)
		}
		return o
	}, trim: Wx, queryParams: function (e = {}, t = !0, n = "brackets") {
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
		zg({title: String(e), icon: "none", duration: t})
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
		const r = isFinite(+e) ? +e : 0, i = isFinite(+t) ? Math.abs(t) : 0, s = void 0 === o ? "," : o,
			a = void 0 === n ? "." : n;
		let l = "";
		l = (i ? function (e, t) {
			const n = Math.pow(10, t);
			let o = zx(Math.round(Math.abs(Hx(e, n))), n);
			return e < 0 && 0 !== o && (o = Hx(o, -1)), o
		}(r, i) + "" : `${Math.round(r)}`).split(".");
		const c = /(-?\d+)(\d{3})/;
		for (; c.test(l[0]);) l[0] = l[0].replace(c, `$1${s}$2`);
		return (l[1] || "").length < i && (l[1] = l[1] || "", l[1] += new Array(i - l[1].length + 1).join("0")), l.join(a)
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
}, Qx = {
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
}, Ux = {
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
}, Xx = {
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
}, {color: Yx} = Qx, Jx = {
	icon: {
		name: "",
		color: Yx["u-content-color"],
		size: "16px",
		bold: !1,
		index: "",
		hoverClass: "",
		customPrefix: "uicon",
		label: "",
		labelPos: "right",
		labelSize: "15px",
		labelColor: Yx["u-content-color"],
		space: "3px",
		imgMode: "",
		width: "",
		height: "",
		top: 0,
		stop: !1
	}
}, {color: Gx} = Qx, Kx = {
	link: {
		color: Gx["u-primary"],
		fontSize: 15,
		underLine: !1,
		href: "",
		mpTips: "链接已复制，请在浏览器打开",
		lineColor: "",
		text: ""
	}
}, {color: Zx} = Qx, eT = {
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
}, tT = {
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
	}, ...Ux,
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
	}, ...Xx,
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
	gridItem: {name: null, bgColor: "transparent"}, ...Jx,
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
	lineProgress: {activeColor: "#19be6b", inactiveColor: "#ececec", percentage: 0, showText: !0, height: 12}, ...Kx,
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
			color: Zx["u-tips-color"],
			textColor: Zx["u-tips-color"],
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
			leftIconColor: eT.mainColor,
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
let nT = "none";
nT = "vue3", nT = "h5";
const oT = {
	route: Sx,
	date: $x.timeFormat,
	colorGradient: Ax.colorGradient,
	hexToRgb: Ax.hexToRgb,
	rgbToHex: Ax.rgbToHex,
	colorToRgba: Ax.colorToRgba,
	test: Ox,
	type: ["primary", "success", "error", "warning", "info"],
	http: new class {
		constructor(e = {}) {
			var t;
			t = e, "[object Object]" !== Object.prototype.toString.call(t) && (e = {}, console.warn("设置全局参数必须接收一个Object")), this.config = Tx({...xx, ...e}), this.interceptors = {
				request: new _x,
				response: new _x
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
					header: hx(e.header || {}, t.header || {})
				};
				if (o = {...o, ...wx(["getTask", "validateStatus"], e, t)}, "DOWNLOAD" === n) mx(t.timeout) ? mx(e.timeout) || (o.timeout = e.timeout) : o.timeout = t.timeout; else if ("UPLOAD" === n) delete o.header["content-type"], delete o.header["Content-Type"], ["files", "file", "filePath", "name", "timeout", "formData"].forEach((e => {
					mx(t[e]) || (o[e] = t[e])
				})), mx(o.timeout) && !mx(e.timeout) && (o.timeout = e.timeout); else {
					const n = ["data", "timeout", "dataType", "responseType", "withCredentials"];
					o = {...o, ...wx(n, e, t)}
				}
				return o
			})(this.config, e);
			const t = [yx, void 0];
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
	config: Qx,
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
		if (null !== Mx && clearTimeout(Mx), n) {
			const n = !Mx;
			Mx = setTimeout((() => {
				Mx = null
			}), t), n && "function" == typeof e && e()
		} else Mx = setTimeout((() => {
			"function" == typeof e && e()
		}), t)
	},
	throttle: function (e, t = 500, n = !0) {
		n ? Ix || (Ix = !0, "function" == typeof e && e(), setTimeout((() => {
			Ix = !1
		}), t)) : Ix || (Ix = !0, setTimeout((() => {
			Ix = !1, "function" == typeof e && e()
		}), t))
	},
	mixin: cx,
	mpMixin: ux,
	props: tT, ...$x,
	color: eT,
	platform: "h5"
};
uni.$u = oT;
const rT = {
	install: e => {
		e.config.globalProperties.$u = oT, e.config.globalProperties.$nextTick = e => {
			e()
		}, e.mixin(cx)
	}
}, iT = e => {
	const t = Nw(0);
	return (t ? `site${t}.` : "") + e
};
(function () {
	const e = Cs(lx);
	return e.use(j_()), e.use(Uw), e.use(rT), function () {
		const e = Dm, t = Hm, n = Vm, o = qm, r = $m, i = Wm;
		uni.setStorage = e => {
			e.key = iT(e.key), t(e)
		}, uni.setStorageSync = (t, n) => {
			e(iT(t), n)
		}, uni.getStorage = e => {
			e.key = iT(e.key), n(e)
		}, uni.getStorageSync = e => o(iT(e)), uni.removeStorage = e => {
			e.key = iT(e.key), r(e)
		}, uni.removeStorageSync = e => i(iT(e))
	}(), {app: e, Pinia: Y_}
})().app.use(nm).mount("#app");
export {
	Xp as $,
	ni as A,
	v as B,
	oi as C,
	p as D,
	Ts as E,
	dh as F,
	Qw as G,
	Fo as H,
	hf as I,
	on as J,
	Qr as K,
	Go as L,
	jr as M,
	Lb as N,
	Pb as O,
	Ew as P,
	Jw as Q,
	Sw as R,
	rh as S,
	iw as T,
	xw as U,
	rx as V,
	ox as W,
	vw as X,
	bw as Y,
	yw as Z,
	_w as _,
	Wt as a,
	xd as a$,
	Gw as a0,
	Kw as a1,
	Xw as a2,
	zg as a3,
	Rd as a4,
	kd as a5,
	fg as a6,
	Eg as a7,
	Bg as a8,
	Qo as a9,
	ew as aA,
	gw as aB,
	dw as aC,
	pw as aD,
	lh as aE,
	sh as aF,
	Lw as aG,
	Yw as aH,
	Cn as aI,
	G_ as aJ,
	Jm as aK,
	mg as aL,
	Km as aM,
	Gf as aN,
	Vf as aO,
	tw as aP,
	ex as aQ,
	jw as aR,
	km as aS,
	fu as aT,
	Bw as aU,
	kw as aV,
	K_ as aW,
	uw as aX,
	Ug as aY,
	Xg as aZ,
	vd as a_,
	xm as aa,
	nh as ab,
	Rm as ac,
	Qd as ad,
	Qg as ae,
	Cw as af,
	Aw as ag,
	nx as ah,
	Ib as ai,
	Ob as aj,
	Iw as ak,
	Zn as al,
	Tg as am,
	sw as an,
	Fw as ao,
	cw as ap,
	lw as aq,
	aw as ar,
	Zr as as,
	wd as at,
	Td as au,
	nw as av,
	Zw as aw,
	ow as ax,
	rw as ay,
	Z_ as az,
	kb as b,
	hw as b0,
	fw as b1,
	mw as b2,
	C_ as b3,
	$w as b4,
	Ud as b5,
	Em as b6,
	Mb as b7,
	Hh as b8,
	wi as c,
	ho as d,
	qr as e,
	Ur as f,
	tx as g,
	ei as h,
	Wo as i,
	cn as j,
	Sb as k,
	Xo as l,
	ph as m,
	a as n,
	Bb as o,
	Ow as p,
	tT as q,
	rn as r,
	$g as s,
	ux as t,
	J_ as u,
	Ss as v,
	Vn as w,
	cx as x,
	Qm as y,
	Ko as z
};
