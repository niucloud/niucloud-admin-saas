! function() {
	const e = document.createElement("link").relList;
	if (!(e && e.supports && e.supports("modulepreload"))) {
		for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
		new MutationObserver((e => {
			for (const n of e)
				if ("childList" === n.type)
					for (const e of n.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
		})).observe(document, {
			childList: !0,
			subtree: !0
		})
	}

	function t(e) {
		if (e.ep) return;
		e.ep = !0;
		const t = function(e) {
			const t = {};
			return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e
					.referrerPolicy), "use-credentials" === e.crossOrigin ? t.credentials = "include" :
				"anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin", t
		}(e);
		fetch(e.href, t)
	}
}();
const e = {},
	t = function(t, n, o) {
		if (!n || 0 === n.length) return t();
		const r = document.getElementsByTagName("link");
		return Promise.all(n.map((t => {
			if ((t = function(e) {
					return "/wap/" + e
				}(t)) in e) return;
			e[t] = !0;
			const n = t.endsWith(".css"),
				i = n ? '[rel="stylesheet"]' : "";
			if (!!o)
				for (let e = r.length - 1; e >= 0; e--) {
					const o = r[e];
					if (o.href === t && (!n || "stylesheet" === o.rel)) return
				} else if (document.querySelector(`link[href="${t}"]${i}`)) return;
			const s = document.createElement("link");
			return s.rel = n ? "stylesheet" : "modulepreload", n || (s.as = "script", s.crossOrigin =
				""), s.href = t, document.head.appendChild(s), n ? new Promise(((e, n) => {
				s.addEventListener("load", e), s.addEventListener("error", (() => n(
					new Error(`Unable to preload CSS for ${t}`))))
			})) : void 0
		}))).then((() => t()))
	},
	n = Object.freeze(Object.defineProperty({
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
	}, Symbol.toStringTag, {
		value: "Module"
	})),
	o = Object.freeze(Object.defineProperty({
		__proto__: null,
		default: {
			"pages.index.index": "",
			"pages.article.list": "资讯中心",
			"pages.article.detail": "文章详情",
			"pages.member.index": "",
			"pages.auth.login": "登录",
			"pages.auth.register": "注册",
			"pages.auth.resetpwd": "找回密码",
			"pages.setting.index": "设置",
			"pages.auth.bind": "绑定手机号",
			"pages.member.personal": "个人资料",
			"pages.member.balance": "我的余额",
			"pages.member.detailed_account": "流水明细",
			"pages.member.apply_cash_out": "申请提现",
			"pages.member.cash_out": "提现记录",
			"pages.member.cash_out_detail": "提现详情",
			"pages.index.close": "站点已关闭",
			"pages.index.nonexistence": "站点不存在"
		}
	}, Symbol.toStringTag, {
		value: "Module"
	}));

function r(e, t) {
	const n = Object.create(null),
		o = e.split(",");
	for (let r = 0; r < o.length; r++) n[o[r]] = !0;
	return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

function i(e) {
	if (k(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const o = e[n],
				r = P(o) ? c(o) : i(o);
			if (r)
				for (const e in r) t[e] = r[e]
		}
		return t
	}
	return P(e) || O(e) ? e : void 0
}
const s = /;(?![^(]*\))/g,
	a = /:([^]+)/,
	l = /\/\*.*?\*\//gs;

function c(e) {
	const t = {};
	return e.replace(l, "").split(s).forEach((e => {
		if (e) {
			const n = e.split(a);
			n.length > 1 && (t[n[0].trim()] = n[1].trim())
		}
	})), t
}

function u(e) {
	let t = "";
	if (P(e)) t = e;
	else if (k(e))
		for (let n = 0; n < e.length; n++) {
			const o = u(e[n]);
			o && (t += o + " ")
		} else if (O(e))
			for (const n in e) e[n] && (t += n + " ");
	return t.trim()
}
const d = r("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function f(e) {
	return !!e || "" === e
}
const p = e => P(e) ? e : null == e ? "" : k(e) || O(e) && (e.toString === M || !B(e.toString)) ? JSON.stringify(e, h,
		2) : String(e),
	h = (e, t) => t && t.__v_isRef ? h(e, t.value) : A(t) ? {
		[`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})
	} : C(t) ? {
		[`Set(${t.size})`]: [...t.values()]
	} : !O(t) || k(t) || j(t) ? t : String(t),
	m = {},
	g = [],
	v = () => {},
	b = () => !1,
	y = /^on[^a-z]/,
	_ = e => y.test(e),
	w = e => e.startsWith("onUpdate:"),
	x = Object.assign,
	T = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1)
	},
	S = Object.prototype.hasOwnProperty,
	E = (e, t) => S.call(e, t),
	k = Array.isArray,
	A = e => "[object Map]" === F(e),
	C = e => "[object Set]" === F(e),
	B = e => "function" == typeof e,
	P = e => "string" == typeof e,
	L = e => "symbol" == typeof e,
	O = e => null !== e && "object" == typeof e,
	I = e => O(e) && B(e.then) && B(e.catch),
	M = Object.prototype.toString,
	F = e => M.call(e),
	j = e => "[object Object]" === F(e),
	N = e => P(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
	R = r(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
		),
	D = e => {
		const t = Object.create(null);
		return n => t[n] || (t[n] = e(n))
	},
	q = /-(\w)/g,
	z = D((e => e.replace(q, ((e, t) => t ? t.toUpperCase() : "")))),
	H = /\B([A-Z])/g,
	W = D((e => e.replace(H, "-$1").toLowerCase())),
	V = D((e => e.charAt(0).toUpperCase() + e.slice(1))),
	$ = D((e => e ? `on${V(e)}` : "")),
	Q = (e, t) => !Object.is(e, t),
	U = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t)
	},
	X = (e, t, n) => {
		Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !1,
			value: n
		})
	},
	Y = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t
	};
let J;
const G = ["ad", "ad-content-page", "ad-draw", "audio", "button", "camera", "canvas", "checkbox", "checkbox-group",
	"cover-image", "cover-view", "editor", "form", "functional-page-navigator", "icon", "image", "input", "label",
	"live-player", "live-pusher", "map", "movable-area", "movable-view", "navigator", "official-account",
	"open-data", "picker", "picker-view", "picker-view-column", "progress", "radio", "radio-group", "rich-text",
	"scroll-view", "slider", "swiper", "swiper-item", "switch", "text", "textarea", "video", "view", "web-view"
].map((e => "uni-" + e));
const K = "\n",
	Z = "UNI_LOCALE",
	ee = ["%", "%"],
	te = /^([a-z-]+:)?\/\//i,
	ne = /^data:.*,.*/,
	oe = "onShow",
	re = "onHide",
	ie = "onLaunch",
	se = "onError",
	ae = "onThemeChange",
	le = "onPageNotFound",
	ce = "onUnhandledRejection",
	ue = "onLoad",
	de = "onUnload",
	fe = "onInit",
	pe = "onSaveExitState",
	he = "onResize",
	me = "onBackPress",
	ge = "onPageScroll",
	ve = "onTabItemTap",
	be = "onReachBottom",
	ye = "onPullDownRefresh",
	_e = "onShareTimeline",
	we = "onAddToFavorites",
	xe = "onShareAppMessage",
	Te = "onNavigationBarButtonTap",
	Se = "onNavigationBarSearchInputClicked",
	Ee = "onNavigationBarSearchInputChanged",
	ke = "onNavigationBarSearchInputConfirmed",
	Ae = "onNavigationBarSearchInputFocusChanged",
	Ce = "onAppEnterForeground",
	Be = "onAppEnterBackground",
	Pe = "onWebInvokeAppService";

function Le(e) {
	return e && (e.appContext ? e.proxy : e)
}

function Oe(e) {
	if (!e) return;
	let t = e.type.name;
	for (; t && (n = W(t), -1 !== G.indexOf("uni-" + n.replace("v-uni-", "")));) t = (e = e.parent).type.name;
	var n;
	return e.proxy
}

function Ie(e) {
	return 1 === e.nodeType
}

function Me(e) {
	return 0 === e.indexOf("/")
}

function Fe(e) {
	return Me(e) ? e : "/" + e
}

function je(e) {
	return Me(e) ? e.slice(1) : e
}

function Ne(e, t) {
	for (const n in t) e.style[n] = t[n]
}

function Re(e, t = null) {
	let n;
	return (...o) => (e && (n = e.apply(t, o), e = null), n)
}

function De(e) {
	return z(e.substring(5))
}
const qe = Re((() => {
	const e = HTMLElement.prototype,
		t = e.setAttribute;
	e.setAttribute = function(e, n) {
		if (e.startsWith("data-") && this.tagName.startsWith("UNI-")) {
			(this.__uniDataset || (this.__uniDataset = {}))[De(e)] = n
		}
		t.call(this, e, n)
	};
	const n = e.removeAttribute;
	e.removeAttribute = function(e) {
		this.__uniDataset && e.startsWith("data-") && this.tagName.startsWith("UNI-") && delete this
			.__uniDataset[De(e)], n.call(this, e)
	}
}));

function ze(e) {
	return x({}, e.dataset, e.__uniDataset)
}
const He = new RegExp("\"[^\"]+\"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px", "g");

function We(e) {
	return {
		passive: e
	}
}

function Ve(e) {
	const {
		id: t,
		offsetTop: n,
		offsetLeft: o
	} = e;
	return {
		id: t,
		dataset: ze(e),
		offsetTop: n,
		offsetLeft: o
	}
}

function $e(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {}
	return "" + e
}

function Qe(e = {}) {
	const t = {};
	return Object.keys(e).forEach((n => {
		try {
			t[n] = $e(e[n])
		} catch (o) {
			t[n] = e[n]
		}
	})), t
}
const Ue = /\+/g;

function Xe(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e).split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(Ue, " ");
		let r = e.indexOf("="),
			i = $e(r < 0 ? e : e.slice(0, r)),
			s = r < 0 ? null : $e(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			k(e) || (e = t[i] = [e]), e.push(s)
		} else t[i] = s
	}
	return t
}

function Ye(e, t, {
	clearTimeout: n,
	setTimeout: o
}) {
	let r;
	const i = function() {
		n(r);
		const i = () => e.apply(this, arguments);
		r = o(i, t)
	};
	return i.cancel = function() {
		n(r)
	}, i
}
class Je {
	constructor(e, t) {
		this.id = e, this.listener = {}, this.emitCache = [], t && Object.keys(t).forEach((e => {
			this.on(e, t[e])
		}))
	}
	emit(e, ...t) {
		const n = this.listener[e];
		if (!n) return this.emitCache.push({
			eventName: e,
			args: t
		});
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
		if (n)
			if (t)
				for (let o = 0; o < n.length;) n[o].fn === t && (n.splice(o, 1), o--), o++;
			else delete this.listener[e]
	}
	_clearCache(e) {
		for (let t = 0; t < this.emitCache.length; t++) {
			const n = this.emitCache[t],
				o = e ? n.eventName === e ? e : null : n.eventName;
			if (!o) continue;
			"number" != typeof this.emit.apply(this, [o, ...n.args]) ? (this.emitCache.splice(t, 1), t--) : this
				.emitCache.pop()
		}
	}
	_addListener(e, t, n) {
		(this.listener[e] || (this.listener[e] = [])).push({
			fn: n,
			type: t
		})
	}
}
const Ge = [fe, ue, oe, re, de, me, ge, ve, be, ye, _e, xe, we, pe, Te, Se, Ee, ke, Ae],
	Ke = [ue, oe];
const Ze = [oe, re, ie, se, ae, le, ce, fe, ue, "onReady", de, he, me, ge, ve, be, ye, _e, we, xe, pe, Te, Se, Ee, ke,
	Ae
];
const et = [];
const tt = Re(((e, t) => {
		if (B(e._component.onError)) return t(e)
	})),
	nt = function() {};
nt.prototype = {
	on: function(e, t, n) {
		var o = this.e || (this.e = {});
		return (o[e] || (o[e] = [])).push({
			fn: t,
			ctx: n
		}), this
	},
	once: function(e, t, n) {
		var o = this;

		function r() {
			o.off(e, r), t.apply(n, arguments)
		}
		return r._ = t, this.on(e, r, n)
	},
	emit: function(e) {
		for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), o = 0, r = n
				.length; o < r; o++) n[o].fn.apply(n[o].ctx, t);
		return this
	},
	off: function(e, t) {
		var n = this.e || (this.e = {}),
			o = n[e],
			r = [];
		if (o && t)
			for (var i = 0, s = o.length; i < s; i++) o[i].fn !== t && o[i].fn._ !== t && r.push(o[i]);
		return r.length ? n[e] = r : delete n[e], this
	}
};
var ot = nt;
const rt = {
	black: "rgba(0,0,0,0.4)",
	white: "rgba(255,255,255,0.4)"
};

function it(e, t = {}, n = "light") {
	const o = t[n],
		r = {};
	return o ? (Object.keys(e).forEach((i => {
		let s = e[i];
		r[i] = (() => {
			if (j(s)) return it(s, t, n);
			if (k(s)) return s.map((e => j(e) ? it(e, t, n) : e));
			if (P(s) && s.startsWith("@")) {
				const t = s.replace("@", "");
				let n = o[t] || s;
				switch (i) {
					case "titleColor":
						n = "black" === n ? "#000000" : "#ffffff";
						break;
					case "borderStyle":
						n = (e = n) && e in rt ? rt[e] : e
				}
				return n
			}
			var e;
			return s
		})()
	})), r) : e
}
let st;
class at {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = st, !e && st && (
			this.index = (st.scopes || (st.scopes = [])).push(this) - 1)
	}
	get active() {
		return this._active
	}
	run(e) {
		if (this._active) {
			const t = st;
			try {
				return st = this, e()
			} finally {
				st = t
			}
		}
	}
	on() {
		st = this
	}
	off() {
		st = this.parent
	}
	stop(e) {
		if (this._active) {
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.scopes)
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
			if (!this.detached && this.parent && !e) {
				const e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
			}
			this.parent = void 0, this._active = !1
		}
	}
}

function lt(e) {
	return new at(e)
}

function ct() {
	return st
}
const ut = e => {
		const t = new Set(e);
		return t.w = 0, t.n = 0, t
	},
	dt = e => (e.w & mt) > 0,
	ft = e => (e.n & mt) > 0,
	pt = new WeakMap;
let ht = 0,
	mt = 1;
let gt;
const vt = Symbol(""),
	bt = Symbol("");
class yt {
	constructor(e, t = null, n) {
		this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0,
			function(e, t = st) {
				t && t.active && t.effects.push(e)
			}(this, n)
	}
	run() {
		if (!this.active) return this.fn();
		let e = gt,
			t = wt;
		for (; e;) {
			if (e === this) return;
			e = e.parent
		}
		try {
			return this.parent = gt, gt = this, wt = !0, mt = 1 << ++ht, ht <= 30 ? (({
				deps: e
			}) => {
				if (e.length)
					for (let t = 0; t < e.length; t++) e[t].w |= mt
			})(this) : _t(this), this.fn()
		} finally {
			ht <= 30 && (e => {
					const {
						deps: t
					} = e;
					if (t.length) {
						let n = 0;
						for (let o = 0; o < t.length; o++) {
							const r = t[o];
							dt(r) && !ft(r) ? r.delete(e) : t[n++] = r, r.w &= ~mt, r.n &= ~mt
						}
						t.length = n
					}
				})(this), mt = 1 << --ht, gt = this.parent, wt = t, this.parent = void 0, this.deferStop && this
				.stop()
		}
	}
	stop() {
		gt === this ? this.deferStop = !0 : this.active && (_t(this), this.onStop && this.onStop(), this.active = !
			1)
	}
}

function _t(e) {
	const {
		deps: t
	} = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0
	}
}
let wt = !0;
const xt = [];

function Tt() {
	xt.push(wt), wt = !1
}

function St() {
	const e = xt.pop();
	wt = void 0 === e || e
}

function Et(e, t, n) {
	if (wt && gt) {
		let t = pt.get(e);
		t || pt.set(e, t = new Map);
		let o = t.get(n);
		o || t.set(n, o = ut()), kt(o)
	}
}

function kt(e, t) {
	let n = !1;
	ht <= 30 ? ft(e) || (e.n |= mt, n = !dt(e)) : n = !e.has(gt), n && (e.add(gt), gt.deps.push(e))
}

function At(e, t, n, o, r, i) {
	const s = pt.get(e);
	if (!s) return;
	let a = [];
	if ("clear" === t) a = [...s.values()];
	else if ("length" === n && k(e)) {
		const e = Number(o);
		s.forEach(((t, n) => {
			("length" === n || n >= e) && a.push(t)
		}))
	} else switch (void 0 !== n && a.push(s.get(n)), t) {
		case "add":
			k(e) ? N(n) && a.push(s.get("length")) : (a.push(s.get(vt)), A(e) && a.push(s.get(bt)));
			break;
		case "delete":
			k(e) || (a.push(s.get(vt)), A(e) && a.push(s.get(bt)));
			break;
		case "set":
			A(e) && a.push(s.get(vt))
	}
	if (1 === a.length) a[0] && Ct(a[0]);
	else {
		const e = [];
		for (const t of a) t && e.push(...t);
		Ct(ut(e))
	}
}

function Ct(e, t) {
	const n = k(e) ? e : [...e];
	for (const o of n) o.computed && Bt(o);
	for (const o of n) o.computed || Bt(o)
}

function Bt(e, t) {
	(e !== gt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Pt = r("__proto__,__v_isRef,__isVue"),
	Lt = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[
		e])).filter(L)),
	Ot = Rt(),
	It = Rt(!1, !0),
	Mt = Rt(!0),
	Ft = jt();

function jt() {
	const e = {};
	return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
		e[t] = function(...e) {
			const n = Tn(this);
			for (let t = 0, r = this.length; t < r; t++) Et(n, 0, t + "");
			const o = n[t](...e);
			return -1 === o || !1 === o ? n[t](...e.map(Tn)) : o
		}
	})), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
		e[t] = function(...e) {
			Tt();
			const n = Tn(this)[t].apply(this, e);
			return St(), n
		}
	})), e
}

function Nt(e) {
	const t = Tn(this);
	return Et(t, 0, e), t.hasOwnProperty(e)
}

function Rt(e = !1, t = !1) {
	return function(n, o, r) {
		if ("__v_isReactive" === o) return !e;
		if ("__v_isReadonly" === o) return e;
		if ("__v_isShallow" === o) return t;
		if ("__v_raw" === o && r === (e ? t ? hn : pn : t ? fn : dn).get(n)) return n;
		const i = k(n);
		if (!e) {
			if (i && E(Ft, o)) return Reflect.get(Ft, o, r);
			if ("hasOwnProperty" === o) return Nt
		}
		const s = Reflect.get(n, o, r);
		return (L(o) ? Lt.has(o) : Pt(o)) ? s : (e || Et(n, 0, o), t ? s : Bn(s) ? i && N(o) ? s : s.value : O(s) ?
			e ? vn(s) : gn(s) : s)
	}
}

function Dt(e = !1) {
	return function(t, n, o, r) {
		let i = t[n];
		if (_n(i) && Bn(i) && !Bn(o)) return !1;
		if (!e && (wn(o) || _n(o) || (i = Tn(i), o = Tn(o)), !k(t) && Bn(i) && !Bn(o))) return i.value = o, !0;
		const s = k(t) && N(n) ? Number(n) < t.length : E(t, n),
			a = Reflect.set(t, n, o, r);
		return t === Tn(r) && (s ? Q(o, i) && At(t, "set", n, o) : At(t, "add", n, o)), a
	}
}
const qt = {
		get: Ot,
		set: Dt(),
		deleteProperty: function(e, t) {
			const n = E(e, t);
			e[t];
			const o = Reflect.deleteProperty(e, t);
			return o && n && At(e, "delete", t, void 0), o
		},
		has: function(e, t) {
			const n = Reflect.has(e, t);
			return L(t) && Lt.has(t) || Et(e, 0, t), n
		},
		ownKeys: function(e) {
			return Et(e, 0, k(e) ? "length" : vt), Reflect.ownKeys(e)
		}
	},
	zt = {
		get: Mt,
		set: (e, t) => !0,
		deleteProperty: (e, t) => !0
	},
	Ht = x({}, qt, {
		get: It,
		set: Dt(!0)
	}),
	Wt = e => e,
	Vt = e => Reflect.getPrototypeOf(e);

function $t(e, t, n = !1, o = !1) {
	const r = Tn(e = e.__v_raw),
		i = Tn(t);
	n || (t !== i && Et(r, 0, t), Et(r, 0, i));
	const {
		has: s
	} = Vt(r), a = o ? Wt : n ? kn : En;
	return s.call(r, t) ? a(e.get(t)) : s.call(r, i) ? a(e.get(i)) : void(e !== r && e.get(t))
}

function Qt(e, t = !1) {
	const n = this.__v_raw,
		o = Tn(n),
		r = Tn(e);
	return t || (e !== r && Et(o, 0, e), Et(o, 0, r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function Ut(e, t = !1) {
	return e = e.__v_raw, !t && Et(Tn(e), 0, vt), Reflect.get(e, "size", e)
}

function Xt(e) {
	e = Tn(e);
	const t = Tn(this);
	return Vt(t).has.call(t, e) || (t.add(e), At(t, "add", e, e)), this
}

function Yt(e, t) {
	t = Tn(t);
	const n = Tn(this),
		{
			has: o,
			get: r
		} = Vt(n);
	let i = o.call(n, e);
	i || (e = Tn(e), i = o.call(n, e));
	const s = r.call(n, e);
	return n.set(e, t), i ? Q(t, s) && At(n, "set", e, t) : At(n, "add", e, t), this
}

function Jt(e) {
	const t = Tn(this),
		{
			has: n,
			get: o
		} = Vt(t);
	let r = n.call(t, e);
	r || (e = Tn(e), r = n.call(t, e)), o && o.call(t, e);
	const i = t.delete(e);
	return r && At(t, "delete", e, void 0), i
}

function Gt() {
	const e = Tn(this),
		t = 0 !== e.size,
		n = e.clear();
	return t && At(e, "clear", void 0, void 0), n
}

function Kt(e, t) {
	return function(n, o) {
		const r = this,
			i = r.__v_raw,
			s = Tn(i),
			a = t ? Wt : e ? kn : En;
		return !e && Et(s, 0, vt), i.forEach(((e, t) => n.call(o, a(e), a(t), r)))
	}
}

function Zt(e, t, n) {
	return function(...o) {
		const r = this.__v_raw,
			i = Tn(r),
			s = A(i),
			a = "entries" === e || e === Symbol.iterator && s,
			l = "keys" === e && s,
			c = r[e](...o),
			u = n ? Wt : t ? kn : En;
		return !t && Et(i, 0, l ? bt : vt), {
			next() {
				const {
					value: e,
					done: t
				} = c.next();
				return t ? {
					value: e,
					done: t
				} : {
					value: a ? [u(e[0]), u(e[1])] : u(e),
					done: t
				}
			},
			[Symbol.iterator]() {
				return this
			}
		}
	}
}

function en(e) {
	return function(...t) {
		return "delete" !== e && this
	}
}

function tn() {
	const e = {
			get(e) {
				return $t(this, e)
			},
			get size() {
				return Ut(this)
			},
			has: Qt,
			add: Xt,
			set: Yt,
			delete: Jt,
			clear: Gt,
			forEach: Kt(!1, !1)
		},
		t = {
			get(e) {
				return $t(this, e, !1, !0)
			},
			get size() {
				return Ut(this)
			},
			has: Qt,
			add: Xt,
			set: Yt,
			delete: Jt,
			clear: Gt,
			forEach: Kt(!1, !0)
		},
		n = {
			get(e) {
				return $t(this, e, !0)
			},
			get size() {
				return Ut(this, !0)
			},
			has(e) {
				return Qt.call(this, e, !0)
			},
			add: en("add"),
			set: en("set"),
			delete: en("delete"),
			clear: en("clear"),
			forEach: Kt(!0, !1)
		},
		o = {
			get(e) {
				return $t(this, e, !0, !0)
			},
			get size() {
				return Ut(this, !0)
			},
			has(e) {
				return Qt.call(this, e, !0)
			},
			add: en("add"),
			set: en("set"),
			delete: en("delete"),
			clear: en("clear"),
			forEach: Kt(!0, !0)
		};
	return ["keys", "values", "entries", Symbol.iterator].forEach((r => {
		e[r] = Zt(r, !1, !1), n[r] = Zt(r, !0, !1), t[r] = Zt(r, !1, !0), o[r] = Zt(r, !0, !0)
	})), [e, n, t, o]
}
const [nn, on, rn, sn] = tn();

function an(e, t) {
	const n = t ? e ? sn : rn : e ? on : nn;
	return (t, o, r) => "__v_isReactive" === o ? !e : "__v_isReadonly" === o ? e : "__v_raw" === o ? t : Reflect.get(E(
		n, o) && o in t ? n : t, o, r)
}
const ln = {
		get: an(!1, !1)
	},
	cn = {
		get: an(!1, !0)
	},
	un = {
		get: an(!0, !1)
	},
	dn = new WeakMap,
	fn = new WeakMap,
	pn = new WeakMap,
	hn = new WeakMap;

function mn(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : function(e) {
		switch (e) {
			case "Object":
			case "Array":
				return 1;
			case "Map":
			case "Set":
			case "WeakMap":
			case "WeakSet":
				return 2;
			default:
				return 0
		}
	}((e => F(e).slice(8, -1))(e))
}

function gn(e) {
	return _n(e) ? e : bn(e, !1, qt, ln, dn)
}

function vn(e) {
	return bn(e, !0, zt, un, pn)
}

function bn(e, t, n, o, r) {
	if (!O(e)) return e;
	if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
	const i = r.get(e);
	if (i) return i;
	const s = mn(e);
	if (0 === s) return e;
	const a = new Proxy(e, 2 === s ? o : n);
	return r.set(e, a), a
}

function yn(e) {
	return _n(e) ? yn(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function _n(e) {
	return !(!e || !e.__v_isReadonly)
}

function wn(e) {
	return !(!e || !e.__v_isShallow)
}

function xn(e) {
	return yn(e) || _n(e)
}

function Tn(e) {
	const t = e && e.__v_raw;
	return t ? Tn(t) : e
}

function Sn(e) {
	return X(e, "__v_skip", !0), e
}
const En = e => O(e) ? gn(e) : e,
	kn = e => O(e) ? vn(e) : e;

function An(e) {
	wt && gt && kt((e = Tn(e)).dep || (e.dep = ut()))
}

function Cn(e, t) {
	const n = (e = Tn(e)).dep;
	n && Ct(n)
}

function Bn(e) {
	return !(!e || !0 !== e.__v_isRef)
}

function Pn(e) {
	return On(e, !1)
}

function Ln(e) {
	return On(e, !0)
}

function On(e, t) {
	return Bn(e) ? e : new In(e, t)
}
class In {
	constructor(e, t) {
		this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Tn(e), this
			._value = t ? e : En(e)
	}
	get value() {
		return An(this), this._value
	}
	set value(e) {
		const t = this.__v_isShallow || wn(e) || _n(e);
		e = t ? e : Tn(e), Q(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : En(e), Cn(this))
	}
}

function Mn(e) {
	return Bn(e) ? e.value : e
}
const Fn = {
	get: (e, t, n) => Mn(Reflect.get(e, t, n)),
	set: (e, t, n, o) => {
		const r = e[t];
		return Bn(r) && !Bn(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o)
	}
};

function jn(e) {
	return yn(e) ? e : new Proxy(e, Fn)
}
class Nn {
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
		return e = Tn(this._object), t = this._key, null === (n = pt.get(e)) || void 0 === n ? void 0 : n.get(t);
		var e, t, n
	}
}

function Rn(e, t, n) {
	const o = e[t];
	return Bn(o) ? o : new Nn(e, t, n)
}
var Dn;
class qn {
	constructor(e, t, n, o) {
		this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[Dn] = !1, this._dirty = !0, this.effect =
			new yt(e, (() => {
				this._dirty || (this._dirty = !0, Cn(this))
			})), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n
	}
	get value() {
		const e = Tn(this);
		return An(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
	}
	set value(e) {
		this._setter(e)
	}
}

function zn(e, t, n, o) {
	let r;
	try {
		r = o ? e(...o) : e()
	} catch (i) {
		Wn(i, t, n)
	}
	return r
}

function Hn(e, t, n, o) {
	if (B(e)) {
		const r = zn(e, t, n, o);
		return r && I(r) && r.catch((e => {
			Wn(e, t, n)
		})), r
	}
	const r = [];
	for (let i = 0; i < e.length; i++) r.push(Hn(e[i], t, n, o));
	return r
}

function Wn(e, t, n, o = !0) {
	t && t.vnode;
	if (t) {
		let o = t.parent;
		const r = t.proxy,
			i = n;
		for (; o;) {
			const t = o.ec;
			if (t)
				for (let n = 0; n < t.length; n++)
					if (!1 === t[n](e, r, i)) return;
			o = o.parent
		}
		const s = t.appContext.config.errorHandler;
		if (s) return void zn(s, null, 10, [e, r, i])
	}! function(e, t, n, o = !0) {
		console.error(e)
	}(e, 0, 0, o)
}
Dn = "__v_isReadonly";
let Vn = !1,
	$n = !1;
const Qn = [];
let Un = 0;
const Xn = [];
let Yn = null,
	Jn = 0;
const Gn = Promise.resolve();
let Kn = null;

function Zn(e) {
	const t = Kn || Gn;
	return e ? t.then(this ? e.bind(this) : e) : t
}

function eo(e) {
	Qn.length && Qn.includes(e, Vn && e.allowRecurse ? Un + 1 : Un) || (null == e.id ? Qn.push(e) : Qn.splice(function(
		e) {
		let t = Un + 1,
			n = Qn.length;
		for (; t < n;) {
			const o = t + n >>> 1;
			ro(Qn[o]) < e ? t = o + 1 : n = o
		}
		return t
	}(e.id), 0, e), to())
}

function to() {
	Vn || $n || ($n = !0, Kn = Gn.then(so))
}

function no(e, t = (Vn ? Un + 1 : 0)) {
	for (; t < Qn.length; t++) {
		const e = Qn[t];
		e && e.pre && (Qn.splice(t, 1), t--, e())
	}
}

function oo(e) {
	if (Xn.length) {
		const e = [...new Set(Xn)];
		if (Xn.length = 0, Yn) return void Yn.push(...e);
		for (Yn = e, Yn.sort(((e, t) => ro(e) - ro(t))), Jn = 0; Jn < Yn.length; Jn++) Yn[Jn]();
		Yn = null, Jn = 0
	}
}
const ro = e => null == e.id ? 1 / 0 : e.id,
	io = (e, t) => {
		const n = ro(e) - ro(t);
		if (0 === n) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1
		}
		return n
	};

function so(e) {
	$n = !1, Vn = !0, Qn.sort(io);
	try {
		for (Un = 0; Un < Qn.length; Un++) {
			const e = Qn[Un];
			e && !1 !== e.active && zn(e, null, 14)
		}
	} finally {
		Un = 0, Qn.length = 0, oo(), Vn = !1, Kn = null, (Qn.length || Xn.length) && so()
	}
}

function ao(e, t, ...n) {
	if (e.isUnmounted) return;
	const o = e.vnode.props || m;
	let r = n;
	const i = t.startsWith("update:"),
		s = i && t.slice(7);
	if (s && s in o) {
		const e = `${"modelValue"===s?"model":s}Modifiers`,
			{
				number: t,
				trim: i
			} = o[e] || m;
		i && (r = n.map((e => P(e) ? e.trim() : e))), t && (r = n.map(Y))
	}
	let a, l = o[a = $(t)] || o[a = $(z(t))];
	!l && i && (l = o[a = $(W(t))]), l && Hn(l, e, 6, lo(e, l, r));
	const c = o[a + "Once"];
	if (c) {
		if (e.emitted) {
			if (e.emitted[a]) return
		} else e.emitted = {};
		e.emitted[a] = !0, Hn(c, e, 6, lo(e, c, r))
	}
}

function lo(e, t, n) {
	if (1 !== n.length) return n;
	if (B(t)) {
		if (t.length < 2) return n
	} else if (!t.find((e => e.length >= 2))) return n;
	const o = n[0];
	if (o && E(o, "type") && E(o, "timeStamp") && E(o, "target") && E(o, "currentTarget") && E(o, "detail")) {
		const t = e.proxy,
			o = t.$gcd(t, !0);
		o && n.push(o)
	}
	return n
}

function co(e, t, n = !1) {
	const o = t.emitsCache,
		r = o.get(e);
	if (void 0 !== r) return r;
	const i = e.emits;
	let s = {},
		a = !1;
	if (!B(e)) {
		const o = e => {
			const n = co(e, t, !0);
			n && (a = !0, x(s, n))
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	return i || a ? (k(i) ? i.forEach((e => s[e] = null)) : x(s, i), O(e) && o.set(e, s), s) : (O(e) && o.set(e, null),
		null)
}

function uo(e, t) {
	return !(!e || !_(t)) && (t = t.slice(2).replace(/Once$/, ""), E(e, t[0].toLowerCase() + t.slice(1)) || E(e, W(
		t)) || E(e, t))
}
let fo = null,
	po = null;

function ho(e) {
	const t = fo;
	return fo = e, po = e && e.type.__scopeId || null, t
}

function mo(e, t = fo, n) {
	if (!t) return e;
	if (e._n) return e;
	const o = (...n) => {
		o._d && gi(-1);
		const r = ho(t);
		let i;
		try {
			i = e(...n)
		} finally {
			ho(r), o._d && gi(1)
		}
		return i
	};
	return o._n = !0, o._c = !0, o._d = !0, o
}

function go(e) {
	const {
		type: t,
		vnode: n,
		proxy: o,
		withProxy: r,
		props: i,
		propsOptions: [s],
		slots: a,
		attrs: l,
		emit: c,
		render: u,
		renderCache: d,
		data: f,
		setupState: p,
		ctx: h,
		inheritAttrs: m
	} = e;
	let g, v;
	const b = ho(e);
	try {
		if (4 & n.shapeFlag) {
			const e = r || o;
			g = Pi(u.call(e, e, d, i, p, f, h)), v = l
		} else {
			const e = t;
			0, g = Pi(e.length > 1 ? e(i, {
				attrs: l,
				slots: a,
				emit: c
			}) : e(i, null)), v = t.props ? l : vo(l)
		}
	} catch (_) {
		fi.length = 0, Wn(_, e, 1), g = ki(ui)
	}
	let y = g;
	if (v && !1 !== m) {
		const e = Object.keys(v),
			{
				shapeFlag: t
			} = y;
		e.length && 7 & t && (s && e.some(w) && (v = bo(v, s)), y = Ai(y, v))
	}
	return n.dirs && (y = Ai(y), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && (y.transition = n
		.transition), g = y, ho(b), g
}
const vo = e => {
		let t;
		for (const n in e)("class" === n || "style" === n || _(n)) && ((t || (t = {}))[n] = e[n]);
		return t
	},
	bo = (e, t) => {
		const n = {};
		for (const o in e) w(o) && o.slice(9) in t || (n[o] = e[o]);
		return n
	};

function yo(e, t, n) {
	const o = Object.keys(t);
	if (o.length !== Object.keys(e).length) return !0;
	for (let r = 0; r < o.length; r++) {
		const i = o[r];
		if (t[i] !== e[i] && !uo(n, i)) return !0
	}
	return !1
}
const _o = e => e.__isSuspense;

function wo(e, t) {
	if (Ni) {
		let n = Ni.provides;
		const o = Ni.parent && Ni.parent.provides;
		o === n && (n = Ni.provides = Object.create(o)), n[e] = t, "app" === Ni.type.mpType && Ni.appContext.app
			.provide(e, t)
	} else;
}

function xo(e, t, n = !1) {
	const o = Ni || fo;
	if (o) {
		const r = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return n && B(t) ? t.call(o.proxy) : t
	}
}

function To(e, t) {
	return ko(e, null, t)
}
const So = {};

function Eo(e, t, n) {
	return ko(e, t, n)
}

function ko(e, t, {
	immediate: n,
	deep: o,
	flush: r,
	onTrack: i,
	onTrigger: s
} = m) {
	const a = ct() === (null == Ni ? void 0 : Ni.scope) ? Ni : null;
	let l, c, u = !1,
		d = !1;
	if (Bn(e) ? (l = () => e.value, u = wn(e)) : yn(e) ? (l = () => e, o = !0) : k(e) ? (d = !0, u = e.some((e => yn(
			e) || wn(e))), l = () => e.map((e => Bn(e) ? e.value : yn(e) ? Bo(e) : B(e) ? zn(e, a, 2) : void 0))) : l =
		B(e) ? t ? () => zn(e, a, 2) : () => {
			if (!a || !a.isUnmounted) return c && c(), Hn(e, a, 3, [p])
		} : v, t && o) {
		const e = l;
		l = () => Bo(e())
	}
	let f, p = e => {
		c = y.onStop = () => {
			zn(e, a, 4)
		}
	};
	if (Hi) {
		if (p = v, t ? n && Hn(t, a, 3, [l(), d ? [] : void 0, p]) : l(), "sync" !== r) return v; {
			const e = Ji();
			f = e.__watcherHandles || (e.__watcherHandles = [])
		}
	}
	let h = d ? new Array(e.length).fill(So) : So;
	const g = () => {
		if (y.active)
			if (t) {
				const e = y.run();
				(o || u || (d ? e.some(((e, t) => Q(e, h[t]))) : Q(e, h))) && (c && c(), Hn(t, a, 3, [e, h === So ?
					void 0 : d && h[0] === So ? [] : h, p
				]), h = e)
			} else y.run()
	};
	let b;
	g.allowRecurse = !!t, "sync" === r ? b = g : "post" === r ? b = () => ri(g, a && a.suspense) : (g.pre = !0, a && (g
		.id = a.uid), b = () => eo(g));
	const y = new yt(l, b);
	t ? n ? g() : h = y.run() : "post" === r ? ri(y.run.bind(y), a && a.suspense) : y.run();
	const _ = () => {
		y.stop(), a && a.scope && T(a.scope.effects, y)
	};
	return f && f.push(_), _
}

function Ao(e, t, n) {
	const o = this.proxy,
		r = P(e) ? e.includes(".") ? Co(o, e) : () => o[e] : e.bind(o, o);
	let i;
	B(t) ? i = t : (i = t.handler, n = t);
	const s = Ni;
	Di(this);
	const a = ko(r, i.bind(o), n);
	return s ? Di(s) : qi(), a
}

function Co(e, t) {
	const n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t
	}
}

function Bo(e, t) {
	if (!O(e) || e.__v_skip) return e;
	if ((t = t || new Set).has(e)) return e;
	if (t.add(e), Bn(e)) Bo(e.value, t);
	else if (k(e))
		for (let n = 0; n < e.length; n++) Bo(e[n], t);
	else if (C(e) || A(e)) e.forEach((e => {
		Bo(e, t)
	}));
	else if (j(e))
		for (const n in e) Bo(e[n], t);
	return e
}
const Po = [Function, Array],
	Lo = {
		mode: String,
		appear: Boolean,
		persisted: Boolean,
		onBeforeEnter: Po,
		onEnter: Po,
		onAfterEnter: Po,
		onEnterCancelled: Po,
		onBeforeLeave: Po,
		onLeave: Po,
		onAfterLeave: Po,
		onLeaveCancelled: Po,
		onBeforeAppear: Po,
		onAppear: Po,
		onAfterAppear: Po,
		onAppearCancelled: Po
	},
	Oo = {
		name: "BaseTransition",
		props: Lo,
		setup(e, {
			slots: t
		}) {
			const n = Ri(),
				o = function() {
					const e = {
						isMounted: !1,
						isLeaving: !1,
						isUnmounting: !1,
						leavingVNodes: new Map
					};
					return sr((() => {
						e.isMounted = !0
					})), cr((() => {
						e.isUnmounting = !0
					})), e
				}();
			let r;
			return () => {
				const i = t.default && Ro(t.default(), !0);
				if (!i || !i.length) return;
				let s = i[0];
				if (i.length > 1)
					for (const e of i)
						if (e.type !== ui) {
							s = e;
							break
						} const a = Tn(e),
					{
						mode: l
					} = a;
				if (o.isLeaving) return Fo(s);
				const c = jo(s);
				if (!c) return Fo(s);
				const u = Mo(c, a, o, n);
				No(c, u);
				const d = n.subTree,
					f = d && jo(d);
				let p = !1;
				const {
					getTransitionKey: h
				} = c.type;
				if (h) {
					const e = h();
					void 0 === r ? r = e : e !== r && (r = e, p = !0)
				}
				if (f && f.type !== ui && (!wi(c, f) || p)) {
					const e = Mo(f, a, o, n);
					if (No(f, e), "out-in" === l) return o.isLeaving = !0, e.afterLeave = () => {
						o.isLeaving = !1, !1 !== n.update.active && n.update()
					}, Fo(s);
					"in-out" === l && c.type !== ui && (e.delayLeave = (e, t, n) => {
						Io(o, f)[String(f.key)] = f, e._leaveCb = () => {
							t(), e._leaveCb = void 0, delete u.delayedLeave
						}, u.delayedLeave = n
					})
				}
				return s
			}
		}
	};

function Io(e, t) {
	const {
		leavingVNodes: n
	} = e;
	let o = n.get(t.type);
	return o || (o = Object.create(null), n.set(t.type, o)), o
}

function Mo(e, t, n, o) {
	const {
		appear: r,
		mode: i,
		persisted: s = !1,
		onBeforeEnter: a,
		onEnter: l,
		onAfterEnter: c,
		onEnterCancelled: u,
		onBeforeLeave: d,
		onLeave: f,
		onAfterLeave: p,
		onLeaveCancelled: h,
		onBeforeAppear: m,
		onAppear: g,
		onAfterAppear: v,
		onAppearCancelled: b
	} = t, y = String(e.key), _ = Io(n, e), w = (e, t) => {
		e && Hn(e, o, 9, t)
	}, x = (e, t) => {
		const n = t[1];
		w(e, t), k(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n()
	}, T = {
		mode: i,
		persisted: s,
		beforeEnter(t) {
			let o = a;
			if (!n.isMounted) {
				if (!r) return;
				o = m || a
			}
			t._leaveCb && t._leaveCb(!0);
			const i = _[y];
			i && wi(e, i) && i.el._leaveCb && i.el._leaveCb(), w(o, [t])
		},
		enter(e) {
			let t = l,
				o = c,
				i = u;
			if (!n.isMounted) {
				if (!r) return;
				t = g || l, o = v || c, i = b || u
			}
			let s = !1;
			const a = e._enterCb = t => {
				s || (s = !0, w(t ? i : o, [e]), T.delayedLeave && T.delayedLeave(), e._enterCb = void 0)
			};
			t ? x(t, [e, a]) : a()
		},
		leave(t, o) {
			const r = String(e.key);
			if (t._enterCb && t._enterCb(!0), n.isUnmounting) return o();
			w(d, [t]);
			let i = !1;
			const s = t._leaveCb = n => {
				i || (i = !0, o(), w(n ? h : p, [t]), t._leaveCb = void 0, _[r] === e && delete _[r])
			};
			_[r] = e, f ? x(f, [t, s]) : s()
		},
		clone: e => Mo(e, t, n, o)
	};
	return T
}

function Fo(e) {
	if (Wo(e)) return (e = Ai(e)).children = null, e
}

function jo(e) {
	return Wo(e) ? e.children ? e.children[0] : void 0 : e
}

function No(e, t) {
	6 & e.shapeFlag && e.component ? No(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(
		e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Ro(e, t = !1, n) {
	let o = [],
		r = 0;
	for (let i = 0; i < e.length; i++) {
		let s = e[i];
		const a = null == n ? s.key : String(n) + String(null != s.key ? s.key : i);
		s.type === li ? (128 & s.patchFlag && r++, o = o.concat(Ro(s.children, t, a))) : (t || s.type !== ui) && o.push(
			null != a ? Ai(s, {
				key: a
			}) : s)
	}
	if (r > 1)
		for (let i = 0; i < o.length; i++) o[i].patchFlag = -2;
	return o
}

function Do(e) {
	return B(e) ? {
		setup: e,
		name: e.name
	} : e
}
const qo = e => !!e.type.__asyncLoader;

function zo(e) {
	B(e) && (e = {
		loader: e
	});
	const {
		loader: t,
		loadingComponent: n,
		errorComponent: o,
		delay: r = 200,
		timeout: i,
		suspensible: s = !0,
		onError: a
	} = e;
	let l, c = null,
		u = 0;
	const d = () => {
		let e;
		return c || (e = c = t().catch((e => {
			if (e = e instanceof Error ? e : new Error(String(e)), a) return new Promise(((t,
			n) => {
				a(e, (() => t((u++, c = null, d()))), (() => n(e)), u + 1)
			}));
			throw e
		})).then((t => e !== c && c ? c : (t && (t.__esModule || "Module" === t[Symbol.toStringTag]) && (t =
			t.default), l = t, t))))
	};
	return Do({
		name: "AsyncComponentWrapper",
		__asyncLoader: d,
		get __asyncResolved() {
			return l
		},
		setup() {
			const e = Ni;
			if (l) return () => Ho(l, e);
			const t = t => {
				c = null, Wn(t, e, 13, !o)
			};
			if (s && e.suspense || Hi) return d().then((t => () => Ho(t, e))).catch((e => (t(e), () => o ? ki(
			o, {
				error: e
			}) : null)));
			const a = Pn(!1),
				u = Pn(),
				f = Pn(!!r);
			return r && setTimeout((() => {
				f.value = !1
			}), r), null != i && setTimeout((() => {
				if (!a.value && !u.value) {
					const e = new Error(`Async component timed out after ${i}ms.`);
					t(e), u.value = e
				}
			}), i), d().then((() => {
				a.value = !0, e.parent && Wo(e.parent.vnode) && eo(e.parent.update)
			})).catch((e => {
				t(e), u.value = e
			})), () => a.value && l ? Ho(l, e) : u.value && o ? ki(o, {
				error: u.value
			}) : n && !f.value ? ki(n) : void 0
		}
	})
}

function Ho(e, t) {
	const {
		ref: n,
		props: o,
		children: r,
		ce: i
	} = t.vnode, s = ki(e, o, r);
	return s.ref = n, s.ce = i, delete t.vnode.ce, s
}
const Wo = e => e.type.__isKeepAlive;
class Vo {
	constructor(e) {
		this.max = e, this._cache = new Map, this._keys = new Set, this._max = parseInt(e, 10)
	}
	get(e) {
		const {
			_cache: t,
			_keys: n,
			_max: o
		} = this, r = t.get(e);
		if (r) n.delete(e), n.add(e);
		else if (n.add(e), o && n.size > o) {
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
const $o = {
		name: "KeepAlive",
		__isKeepAlive: !0,
		props: {
			include: [String, RegExp, Array],
			exclude: [String, RegExp, Array],
			max: [String, Number],
			matchBy: {
				type: String,
				default: "name"
			},
			cache: Object
		},
		setup(e, {
			slots: t
		}) {
			const n = Ri(),
				o = n.ctx;
			if (!o.renderer) return () => {
				const e = t.default && t.default();
				return e && 1 === e.length ? e[0] : e
			};
			const r = e.cache || new Vo(e.max);
			r.pruneCacheEntry = s;
			let i = null;

			function s(t) {
				var o;
				!i || !wi(t, i) || "key" === e.matchBy && t.key !== i.key ? (Ko(o = t), u(o, n, a, !0)) : i && Ko(i)
			}
			const a = n.suspense,
				{
					renderer: {
						p: l,
						m: c,
						um: u,
						o: {
							createElement: d
						}
					}
				} = o,
				f = d("div");

			function p(t) {
				r.forEach(((n, o) => {
					const i = er(n, e.matchBy);
					!i || t && t(i) || (r.delete(o), s(n))
				}))
			}
			o.activate = (e, t, n, o, r) => {
				const i = e.component;
				if (i.ba) {
					const e = i.isDeactivated;
					i.isDeactivated = !1, U(i.ba), i.isDeactivated = e
				}
				c(e, t, n, 0, a), l(i.vnode, e, t, n, i, a, o, e.slotScopeIds, r), ri((() => {
					i.isDeactivated = !1, i.a && U(i.a);
					const t = e.props && e.props.onVnodeMounted;
					t && Mi(t, i.parent, e)
				}), a)
			}, o.deactivate = e => {
				const t = e.component;
				t.bda && tr(t.bda), c(e, f, null, 1, a), ri((() => {
					t.bda && nr(t.bda), t.da && U(t.da);
					const n = e.props && e.props.onVnodeUnmounted;
					n && Mi(n, t.parent, e), t.isDeactivated = !0
				}), a)
			}, Eo((() => [e.include, e.exclude, e.matchBy]), (([e, t]) => {
				e && p((t => Uo(e, t))), t && p((e => !Uo(t, e)))
			}), {
				flush: "post",
				deep: !0
			});
			let h = null;
			const m = () => {
				null != h && r.set(h, Zo(n.subTree))
			};
			return sr(m), lr(m), cr((() => {
				r.forEach(((t, o) => {
					r.delete(o), s(t);
					const {
						subTree: i,
						suspense: a
					} = n, l = Zo(i);
					if (t.type !== l.type || "key" === e.matchBy && t.key !== l.key);
					else {
						l.component.bda && U(l.component.bda), Ko(l);
						const e = l.component.da;
						e && ri(e, a)
					}
				}))
			})), () => {
				if (h = null, !t.default) return null;
				const n = t.default(),
					o = n[0];
				if (n.length > 1) return i = null, n;
				if (!_i(o) || !(4 & o.shapeFlag) && !_o(o.type)) return i = null, o;
				let s = Zo(o);
				const a = s.type,
					l = er(s, e.matchBy),
					{
						include: c,
						exclude: u
					} = e;
				if (c && (!l || !Uo(c, l)) || u && l && Uo(u, l)) return i = s, o;
				const d = null == s.key ? a : s.key,
					f = r.get(d);
				return s.el && (s = Ai(s), _o(o.type) && (o.ssContent = s)), h = d, f && (s.el = f.el, s.component =
						f.component, s.transition && No(s, s.transition), s.shapeFlag |= 512), s.shapeFlag |= 256,
					i = s, _o(o.type) ? o : s
			}
		}
	},
	Qo = $o;

function Uo(e, t) {
	return k(e) ? e.some((e => Uo(e, t))) : P(e) ? e.split(",").includes(t) : !!e.test && e.test(t)
}

function Xo(e, t) {
	Jo(e, "a", t)
}

function Yo(e, t) {
	Jo(e, "da", t)
}

function Jo(e, t, n = Ni) {
	const o = e.__wdc || (e.__wdc = () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent
		}
		return e()
	});
	if (o.__called = !1, or(t, o, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Wo(e.parent.vnode) && Go(o, t, n, e), e = e.parent
	}
}

function Go(e, t, n, o) {
	const r = or(t, e, o, !0);
	ur((() => {
		T(o[t], r)
	}), n)
}

function Ko(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513
}

function Zo(e) {
	return _o(e.type) ? e.ssContent : e
}

function er(e, t) {
	if ("name" === t) {
		const t = e.type;
		return Qi(qo(e) ? t.__asyncResolved || {} : t)
	}
	return String(e.key)
}

function tr(e) {
	for (let t = 0; t < e.length; t++) {
		const n = e[t];
		n.__called || (n(), n.__called = !0)
	}
}

function nr(e) {
	e.forEach((e => e.__called = !1))
}

function or(e, t, n = Ni, o = !1) {
	if (n) {
		if (r = e, Ge.indexOf(r) > -1 && n.$pageInstance) {
			if (n.type.__reserved) return;
			if (n !== n.$pageInstance && (n = n.$pageInstance, function(e) {
					return Ke.indexOf(e) > -1
				}(e))) {
				const o = n.proxy;
				Hn(t.bind(o), n, e, ue === e ? [o.$page.options] : [])
			}
		}
		const i = n[e] || (n[e] = []),
			s = t.__weh || (t.__weh = (...o) => {
				if (n.isUnmounted) return;
				Tt(), Di(n);
				const r = Hn(t, n, e, o);
				return qi(), St(), r
			});
		return o ? i.unshift(s) : i.push(s), s
	}
	var r
}
const rr = e => (t, n = Ni) => (!Hi || "sp" === e) && or(e, ((...e) => t(...e)), n),
	ir = rr("bm"),
	sr = rr("m"),
	ar = rr("bu"),
	lr = rr("u"),
	cr = rr("bum"),
	ur = rr("um"),
	dr = rr("sp"),
	fr = rr("rtg"),
	pr = rr("rtc");

function hr(e, t = Ni) {
	or("ec", e, t)
}

function mr(e, t) {
	const n = fo;
	if (null === n) return e;
	const o = $i(n) || n.proxy,
		r = e.dirs || (e.dirs = []);
	for (let i = 0; i < t.length; i++) {
		let [e, n, s, a = m] = t[i];
		e && (B(e) && (e = {
			mounted: e,
			updated: e
		}), e.deep && Bo(n), r.push({
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

function gr(e, t, n, o) {
	const r = e.dirs,
		i = t && t.dirs;
	for (let s = 0; s < r.length; s++) {
		const a = r[s];
		i && (a.oldValue = i[s].value);
		let l = a.dir[o];
		l && (Tt(), Hn(l, n, 8, [e.el, a, e, t]), St())
	}
}
const vr = "components";

function br(e, t) {
	return wr(vr, e, !0, t) || e
}
const yr = Symbol();

function _r(e) {
	return P(e) ? wr(vr, e, !1) || e : e || yr
}

function wr(e, t, n = !0, o = !1) {
	const r = fo || Ni;
	if (r) {
		const n = r.type;
		if (e === vr) {
			const e = Qi(n, !1);
			if (e && (e === t || e === z(t) || e === V(z(t)))) return n
		}
		const i = xr(r[e] || n[e], t) || xr(r.appContext[e], t);
		return !i && o ? n : i
	}
}

function xr(e, t) {
	return e && (e[t] || e[z(t)] || e[V(z(t))])
}

function Tr(e, t, n, o) {
	let r;
	const i = n && n[o];
	if (k(e) || P(e)) {
		r = new Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) r[n] = t(e[n], n, void 0, i && i[n])
	} else if ("number" == typeof e) {
		r = new Array(e);
		for (let n = 0; n < e; n++) r[n] = t(n + 1, n, void 0, i && i[n])
	} else if (O(e))
		if (e[Symbol.iterator]) r = Array.from(e, ((e, n) => t(e, n, void 0, i && i[n])));
		else {
			const n = Object.keys(e);
			r = new Array(n.length);
			for (let o = 0, s = n.length; o < s; o++) {
				const s = n[o];
				r[o] = t(e[s], s, o, i && i[o])
			}
		}
	else r = [];
	return n && (n[o] = r), r
}

function Sr(e, t, n = {}, o, r) {
	if (fo.isCE || fo.parent && qo(fo.parent) && fo.parent.isCE) return "default" !== t && (n.name = t), ki("slot", n,
		o && o());
	let i = e[t];
	i && i._c && (i._d = !1), hi();
	const s = i && Er(i(n)),
		a = yi(li, {
			key: n.key || s && s.key || `_${t}`
		}, s || (o ? o() : []), s && 1 === e._ ? 64 : -2);
	return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
}

function Er(e) {
	return e.some((e => !_i(e) || e.type !== ui && !(e.type === li && !Er(e.children)))) ? e : null
}
const kr = e => e ? zi(e) ? $i(e) || e.proxy : kr(e.parent) : null,
	Ar = x(Object.create(null), {
		$: e => e,
		$el: e => e.vnode.el,
		$data: e => e.data,
		$props: e => e.props,
		$attrs: e => e.attrs,
		$slots: e => e.slots,
		$refs: e => e.refs,
		$parent: e => kr(e.parent),
		$root: e => kr(e.root),
		$emit: e => e.emit,
		$options: e => Mr(e),
		$forceUpdate: e => e.f || (e.f = () => eo(e.update)),
		$nextTick: e => e.n || (e.n = Zn.bind(e.proxy)),
		$watch: e => Ao.bind(e)
	}),
	Cr = (e, t) => e !== m && !e.__isScriptSetup && E(e, t),
	Br = {
		get({
			_: e
		}, t) {
			const {
				ctx: n,
				setupState: o,
				data: r,
				props: i,
				accessCache: s,
				type: a,
				appContext: l
			} = e;
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
					if (Cr(o, t)) return s[t] = 1, o[t];
					if (r !== m && E(r, t)) return s[t] = 2, r[t];
					if ((c = e.propsOptions[0]) && E(c, t)) return s[t] = 3, i[t];
					if (n !== m && E(n, t)) return s[t] = 4, n[t];
					Pr && (s[t] = 0)
				}
			}
			const u = Ar[t];
			let d, f;
			return u ? ("$attrs" === t && Et(e, 0, t), u(e)) : (d = a.__cssModules) && (d = d[t]) ? d : n !== m &&
				E(n, t) ? (s[t] = 4, n[t]) : (f = l.config.globalProperties, E(f, t) ? f[t] : void 0)
		},
		set({
			_: e
		}, t, n) {
			const {
				data: o,
				setupState: r,
				ctx: i
			} = e;
			return Cr(r, t) ? (r[t] = n, !0) : o !== m && E(o, t) ? (o[t] = n, !0) : !E(e.props, t) && (("$" !== t[
				0] || !(t.slice(1) in e)) && (i[t] = n, !0))
		},
		has({
			_: {
				data: e,
				setupState: t,
				accessCache: n,
				ctx: o,
				appContext: r,
				propsOptions: i
			}
		}, s) {
			let a;
			return !!n[s] || e !== m && E(e, s) || Cr(t, s) || (a = i[0]) && E(a, s) || E(o, s) || E(Ar, s) || E(r
				.config.globalProperties, s)
		},
		defineProperty(e, t, n) {
			return null != n.get ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect
				.defineProperty(e, t, n)
		}
	};
let Pr = !0;

function Lr(e) {
	const t = Mr(e),
		n = e.proxy,
		o = e.ctx;
	Pr = !1, t.beforeCreate && Or(t.beforeCreate, e, "bc");
	const {
		data: r,
		computed: i,
		methods: s,
		watch: a,
		provide: l,
		inject: c,
		created: u,
		beforeMount: d,
		mounted: f,
		beforeUpdate: p,
		updated: h,
		activated: m,
		deactivated: g,
		beforeDestroy: b,
		beforeUnmount: y,
		destroyed: _,
		unmounted: w,
		render: x,
		renderTracked: T,
		renderTriggered: S,
		errorCaptured: E,
		serverPrefetch: A,
		expose: C,
		inheritAttrs: P,
		components: L,
		directives: I,
		filters: M
	} = t;
	if (c && function(e, t, n = v, o = !1) {
			k(e) && (e = Rr(e));
			for (const r in e) {
				const n = e[r];
				let i;
				i = O(n) ? "default" in n ? xo(n.from || r, n.default, !0) : xo(n.from || r) : xo(n), Bn(i) && o ?
					Object.defineProperty(t, r, {
						enumerable: !0,
						configurable: !0,
						get: () => i.value,
						set: e => i.value = e
					}) : t[r] = i
			}
		}(c, o, null, e.appContext.config.unwrapInjectedRef), s)
		for (const v in s) {
			const e = s[v];
			B(e) && (o[v] = e.bind(n))
		}
	if (r) {
		const t = r.call(n, n);
		O(t) && (e.data = gn(t))
	}
	if (Pr = !0, i)
		for (const k in i) {
			const e = i[k],
				t = B(e) ? e.bind(n, n) : B(e.get) ? e.get.bind(n, n) : v,
				r = !B(e) && B(e.set) ? e.set.bind(n) : v,
				s = Ui({
					get: t,
					set: r
				});
			Object.defineProperty(o, k, {
				enumerable: !0,
				configurable: !0,
				get: () => s.value,
				set: e => s.value = e
			})
		}
	if (a)
		for (const v in a) Ir(a[v], o, n, v);
	if (l) {
		const e = B(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t => {
			wo(t, e[t])
		}))
	}

	function F(e, t) {
		k(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
	}
	if (u && Or(u, e, "c"), F(ir, d), F(sr, f), F(ar, p), F(lr, h), F(Xo, m), F(Yo, g), F(hr, E), F(pr, T), F(fr, S), F(
			cr, y), F(ur, w), F(dr, A), k(C))
		if (C.length) {
			const t = e.exposed || (e.exposed = {});
			C.forEach((e => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: t => n[e] = t
				})
			}))
		} else e.exposed || (e.exposed = {});
	x && e.render === v && (e.render = x), null != P && (e.inheritAttrs = P), L && (e.components = L), I && (e
		.directives = I);
	const j = e.appContext.config.globalProperties.$applyOptions;
	j && j(t, e, n)
}

function Or(e, t, n) {
	Hn(k(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
}

function Ir(e, t, n, o) {
	const r = o.includes(".") ? Co(n, o) : () => n[o];
	if (P(e)) {
		const n = t[e];
		B(n) && Eo(r, n)
	} else if (B(e)) Eo(r, e.bind(n));
	else if (O(e))
		if (k(e)) e.forEach((e => Ir(e, t, n, o)));
		else {
			const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
			B(o) && Eo(r, o, e)
		}
}

function Mr(e) {
	const t = e.type,
		{
			mixins: n,
			extends: o
		} = t,
		{
			mixins: r,
			optionsCache: i,
			config: {
				optionMergeStrategies: s
			}
		} = e.appContext,
		a = i.get(t);
	let l;
	return a ? l = a : r.length || n || o ? (l = {}, r.length && r.forEach((e => Fr(l, e, s, !0))), Fr(l, t, s)) : l =
		t, O(t) && i.set(t, l), l
}

function Fr(e, t, n, o = !1) {
	const {
		mixins: r,
		extends: i
	} = t;
	i && Fr(e, i, n, !0), r && r.forEach((t => Fr(e, t, n, !0)));
	for (const s in t)
		if (o && "expose" === s);
		else {
			const o = jr[s] || n && n[s];
			e[s] = o ? o(e[s], t[s]) : t[s]
		} return e
}
const jr = {
	data: Nr,
	props: qr,
	emits: qr,
	methods: qr,
	computed: qr,
	beforeCreate: Dr,
	created: Dr,
	beforeMount: Dr,
	mounted: Dr,
	beforeUpdate: Dr,
	updated: Dr,
	beforeDestroy: Dr,
	beforeUnmount: Dr,
	destroyed: Dr,
	unmounted: Dr,
	activated: Dr,
	deactivated: Dr,
	errorCaptured: Dr,
	serverPrefetch: Dr,
	components: qr,
	directives: qr,
	watch: function(e, t) {
		if (!e) return t;
		if (!t) return e;
		const n = x(Object.create(null), e);
		for (const o in t) n[o] = Dr(e[o], t[o]);
		return n
	},
	provide: Nr,
	inject: function(e, t) {
		return qr(Rr(e), Rr(t))
	}
};

function Nr(e, t) {
	return t ? e ? function() {
		return x(B(e) ? e.call(this, this) : e, B(t) ? t.call(this, this) : t)
	} : t : e
}

function Rr(e) {
	if (k(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t
	}
	return e
}

function Dr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function qr(e, t) {
	return e ? x(x(Object.create(null), e), t) : t
}

function zr(e, t, n, o = !1) {
	const r = {},
		i = {};
	X(i, xi, 1), e.propsDefaults = Object.create(null), Hr(e, t, r, i);
	for (const s in e.propsOptions[0]) s in r || (r[s] = void 0);
	n ? e.props = o ? r : bn(r, !1, Ht, cn, fn) : e.type.props ? e.props = r : e.props = i, e.attrs = i
}

function Hr(e, t, n, o) {
	const [r, i] = e.propsOptions;
	let s, a = !1;
	if (t)
		for (let l in t) {
			if (R(l)) continue;
			const c = t[l];
			let u;
			r && E(r, u = z(l)) ? i && i.includes(u) ? (s || (s = {}))[u] = c : n[u] = c : uo(e.emitsOptions, l) || l in
				o && c === o[l] || (o[l] = c, a = !0)
		}
	if (i) {
		const t = Tn(n),
			o = s || m;
		for (let s = 0; s < i.length; s++) {
			const a = i[s];
			n[a] = Wr(r, t, a, o[a], e, !E(o, a))
		}
	}
	return a
}

function Wr(e, t, n, o, r, i) {
	const s = e[n];
	if (null != s) {
		const e = E(s, "default");
		if (e && void 0 === o) {
			const e = s.default;
			if (s.type !== Function && B(e)) {
				const {
					propsDefaults: i
				} = r;
				n in i ? o = i[n] : (Di(r), o = i[n] = e.call(null, t), qi())
			} else o = e
		}
		s[0] && (i && !e ? o = !1 : !s[1] || "" !== o && o !== W(n) || (o = !0))
	}
	return o
}

function Vr(e, t, n = !1) {
	const o = t.propsCache,
		r = o.get(e);
	if (r) return r;
	const i = e.props,
		s = {},
		a = [];
	let l = !1;
	if (!B(e)) {
		const o = e => {
			l = !0;
			const [n, o] = Vr(e, t, !0);
			x(s, n), o && a.push(...o)
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	if (!i && !l) return O(e) && o.set(e, g), g;
	if (k(i))
		for (let u = 0; u < i.length; u++) {
			const e = z(i[u]);
			$r(e) && (s[e] = m)
		} else if (i)
			for (const u in i) {
				const e = z(u);
				if ($r(e)) {
					const t = i[u],
						n = s[e] = k(t) || B(t) ? {
							type: t
						} : Object.assign({}, t);
					if (n) {
						const t = Xr(Boolean, n.type),
							o = Xr(String, n.type);
						n[0] = t > -1, n[1] = o < 0 || t < o, (t > -1 || E(n, "default")) && a.push(e)
					}
				}
			}
	const c = [s, a];
	return O(e) && o.set(e, c), c
}

function $r(e) {
	return "$" !== e[0]
}

function Qr(e) {
	const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : null === e ? "null" : ""
}

function Ur(e, t) {
	return Qr(e) === Qr(t)
}

function Xr(e, t) {
	return k(t) ? t.findIndex((t => Ur(t, e))) : B(t) && Ur(t, e) ? 0 : -1
}
const Yr = e => "_" === e[0] || "$stable" === e,
	Jr = e => k(e) ? e.map(Pi) : [Pi(e)],
	Gr = (e, t, n) => {
		if (t._n) return t;
		const o = mo(((...e) => Jr(t(...e))), n);
		return o._c = !1, o
	},
	Kr = (e, t, n) => {
		const o = e._ctx;
		for (const r in e) {
			if (Yr(r)) continue;
			const n = e[r];
			if (B(n)) t[r] = Gr(0, n, o);
			else if (null != n) {
				const e = Jr(n);
				t[r] = () => e
			}
		}
	},
	Zr = (e, t) => {
		const n = Jr(t);
		e.slots.default = () => n
	};

function ei() {
	return {
		app: null,
		config: {
			isNativeTag: b,
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
let ti = 0;

function ni(e, t) {
	return function(n, o = null) {
		B(n) || (n = Object.assign({}, n)), null == o || O(o) || (o = null);
		const r = ei(),
			i = new Set;
		let s = !1;
		const a = r.app = {
			_uid: ti++,
			_component: n,
			_props: o,
			_container: null,
			_context: r,
			_instance: null,
			version: Gi,
			get config() {
				return r.config
			},
			set config(e) {},
			use: (e, ...t) => (i.has(e) || (e && B(e.install) ? (i.add(e), e.install(a, ...t)) : B(e) && (i.add(
				e), e(a, ...t))), a),
			mixin: e => (r.mixins.includes(e) || r.mixins.push(e), a),
			component: (e, t) => t ? (r.components[e] = t, a) : r.components[e],
			directive: (e, t) => t ? (r.directives[e] = t, a) : r.directives[e],
			mount(i, l, c) {
				if (!s) {
					const u = ki(n, o);
					return u.appContext = r, l && t ? t(u, i) : e(u, i, c), s = !0, a._container = i, i
						.__vue_app__ = a, a._instance = u.component, $i(u.component) || u.component.proxy
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

function oi(e, t, n, o, r = !1) {
	if (k(e)) return void e.forEach(((e, i) => oi(e, t && (k(t) ? t[i] : t), n, o, r)));
	if (qo(o) && !r) return;
	const i = 4 & o.shapeFlag ? $i(o.component) || o.component.proxy : o.el,
		s = r ? null : i,
		{
			i: a,
			r: l
		} = e,
		c = t && t.r,
		u = a.refs === m ? a.refs = {} : a.refs,
		d = a.setupState;
	if (null != c && c !== l && (P(c) ? (u[c] = null, E(d, c) && (d[c] = null)) : Bn(c) && (c.value = null)), B(l)) zn(
		l, a, 12, [s, u]);
	else {
		const t = P(l),
			o = Bn(l);
		if (t || o) {
			const a = () => {
				if (e.f) {
					const n = t ? E(d, l) ? d[l] : u[l] : l.value;
					r ? k(n) && T(n, i) : k(n) ? n.includes(i) || n.push(i) : t ? (u[l] = [i], E(d, l) && (d[l] = u[
						l])) : (l.value = [i], e.k && (u[e.k] = l.value))
				} else t ? (u[l] = s, E(d, l) && (d[l] = s)) : o && (l.value = s, e.k && (u[e.k] = s))
			};
			s ? (a.id = -1, ri(a, n)) : a()
		}
	}
}
const ri = function(e, t) {
	var n;
	t && t.pendingBranch ? k(e) ? t.effects.push(...e) : t.effects.push(e) : (k(n = e) ? Xn.push(...n) : Yn && Yn
		.includes(n, n.allowRecurse ? Jn + 1 : Jn) || Xn.push(n), to())
};

function ii(e) {
	return function(e, t) {
		(J || (J = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self :
			"undefined" != typeof window ? window : "undefined" != typeof global ? global : {})).__VUE__ = !0;
		const {
			insert: n,
			remove: o,
			patchProp: r,
			forcePatchProp: i,
			createElement: s,
			createText: a,
			createComment: l,
			setText: c,
			setElementText: u,
			parentNode: d,
			nextSibling: f,
			setScopeId: p = v,
			insertStaticContent: h
		} = e, b = (e, t, n, o = null, r = null, i = null, s = !1, a = null, l = !!t.dynamicChildren) => {
			if (e === t) return;
			e && !wi(e, t) && (o = te(e), Y(e, r, i, !0), e = null), -2 === t.patchFlag && (l = !1, t
				.dynamicChildren = null);
			const {
				type: c,
				ref: u,
				shapeFlag: d
			} = t;
			switch (c) {
				case ci:
					y(e, t, n, o);
					break;
				case ui:
					_(e, t, n, o);
					break;
				case di:
					null == e && w(t, n, o, s);
					break;
				case li:
					M(e, t, n, o, r, i, s, a, l);
					break;
				default:
					1 & d ? k(e, t, n, o, r, i, s, a, l) : 6 & d ? F(e, t, n, o, r, i, s, a, l) : (64 & d ||
						128 & d) && c.process(e, t, n, o, r, i, s, a, l, oe)
			}
			null != u && r && oi(u, e && e.ref, i, t || e, !t)
		}, y = (e, t, o, r) => {
			if (null == e) n(t.el = a(t.children), o, r);
			else {
				const n = t.el = e.el;
				t.children !== e.children && c(n, t.children)
			}
		}, _ = (e, t, o, r) => {
			null == e ? n(t.el = l(t.children || ""), o, r) : t.el = e.el
		}, w = (e, t, n, o) => {
			[e.el, e.anchor] = h(e.children, t, n, o, e.el, e.anchor)
		}, T = ({
			el: e,
			anchor: t
		}, o, r) => {
			let i;
			for (; e && e !== t;) i = f(e), n(e, o, r), e = i;
			n(t, o, r)
		}, S = ({
			el: e,
			anchor: t
		}) => {
			let n;
			for (; e && e !== t;) n = f(e), o(e), e = n;
			o(t)
		}, k = (e, t, n, o, r, i, s, a, l) => {
			s = s || "svg" === t.type, null == e ? A(t, n, o, r, i, s, a, l) : P(e, t, r, i, s, a, l)
		}, A = (e, t, o, i, a, l, c, d) => {
			let f, p;
			const {
				type: h,
				props: m,
				shapeFlag: g,
				transition: v,
				dirs: b
			} = e;
			if (f = e.el = s(e.type, l, m && m.is, m), 8 & g ? u(f, e.children) : 16 & g && B(e.children, f,
					null, i, a, l && "foreignObject" !== h, c, d), b && gr(e, null, i, "created"), C(f, e, e
					.scopeId, c, i), m) {
				for (const t in m) "value" === t || R(t) || r(f, t, null, m[t], l, e.children, i, a, ee);
				"value" in m && r(f, "value", null, m.value), (p = m.onVnodeBeforeMount) && Mi(p, i, e)
			}
			Object.defineProperty(f, "__vueParentComponent", {
				value: i,
				enumerable: !1
			}), b && gr(e, null, i, "beforeMount");
			const y = (!a || a && !a.pendingBranch) && v && !v.persisted;
			y && v.beforeEnter(f), n(f, t, o), ((p = m && m.onVnodeMounted) || y || b) && ri((() => {
				p && Mi(p, i, e), y && v.enter(f), b && gr(e, null, i, "mounted")
			}), a)
		}, C = (e, t, n, o, r) => {
			if (n && p(e, n), o)
				for (let i = 0; i < o.length; i++) p(e, o[i]);
			if (r) {
				if (t === r.subTree) {
					const t = r.vnode;
					C(e, t, t.scopeId, t.slotScopeIds, r.parent)
				}
			}
		}, B = (e, t, n, o, r, i, s, a, l = 0) => {
			for (let c = l; c < e.length; c++) {
				const l = e[c] = a ? Li(e[c]) : Pi(e[c]);
				b(null, l, t, n, o, r, i, s, a)
			}
		}, P = (e, t, n, o, s, a, l) => {
			const c = t.el = e.el;
			let {
				patchFlag: d,
				dynamicChildren: f,
				dirs: p
			} = t;
			d |= 16 & e.patchFlag;
			const h = e.props || m,
				g = t.props || m;
			let v;
			n && si(n, !1), (v = g.onVnodeBeforeUpdate) && Mi(v, n, t, e), p && gr(t, e, n, "beforeUpdate"),
				n && si(n, !0);
			const b = s && "foreignObject" !== t.type;
			if (f ? L(e.dynamicChildren, f, c, n, o, b, a) : l || H(e, t, c, null, n, o, b, a, !1), d > 0) {
				if (16 & d) O(c, t, h, g, n, o, s);
				else if (2 & d && h.class !== g.class && r(c, "class", null, g.class, s), 4 & d && r(c, "style",
						h.style, g.style, s), 8 & d) {
					const a = t.dynamicProps;
					for (let t = 0; t < a.length; t++) {
						const l = a[t],
							u = h[l],
							d = g[l];
						(d !== u || "value" === l || i && i(c, l)) && r(c, l, u, d, s, e.children, n, o, ee)
					}
				}
				1 & d && e.children !== t.children && u(c, t.children)
			} else l || null != f || O(c, t, h, g, n, o, s);
			((v = g.onVnodeUpdated) || p) && ri((() => {
				v && Mi(v, n, t, e), p && gr(t, e, n, "updated")
			}), o)
		}, L = (e, t, n, o, r, i, s) => {
			for (let a = 0; a < t.length; a++) {
				const l = e[a],
					c = t[a],
					u = l.el && (l.type === li || !wi(l, c) || 70 & l.shapeFlag) ? d(l.el) : n;
				b(l, c, u, null, o, r, i, s, !0)
			}
		}, O = (e, t, n, o, s, a, l) => {
			if (n !== o) {
				if (n !== m)
					for (const i in n) R(i) || i in o || r(e, i, n[i], null, l, t.children, s, a, ee);
				for (const c in o) {
					if (R(c)) continue;
					const u = o[c],
						d = n[c];
					(u !== d && "value" !== c || i && i(e, c)) && r(e, c, d, u, l, t.children, s, a, ee)
				}
				"value" in o && r(e, "value", n.value, o.value)
			}
		}, M = (e, t, o, r, i, s, l, c, u) => {
			const d = t.el = e ? e.el : a(""),
				f = t.anchor = e ? e.anchor : a("");
			let {
				patchFlag: p,
				dynamicChildren: h,
				slotScopeIds: m
			} = t;
			m && (c = c ? c.concat(m) : m), null == e ? (n(d, o, r), n(f, o, r), B(t.children, o, f, i, s, l, c,
				u)) : p > 0 && 64 & p && h && e.dynamicChildren ? (L(e.dynamicChildren, h, o, i, s, l, c), (
				null != t.key || i && t === i.subTree) && ai(e, t, !0)) : H(e, t, o, f, i, s, l, c, u)
		}, F = (e, t, n, o, r, i, s, a, l) => {
			t.slotScopeIds = a, null == e ? 512 & t.shapeFlag ? r.ctx.activate(t, n, o, s, l) : j(t, n, o, r, i,
				s, l) : N(e, t, l)
		}, j = (e, t, n, o, r, i, s) => {
			const a = e.component = function(e, t, n) {
				const o = e.type,
					r = (t ? t.appContext : e.appContext) || Fi,
					i = {
						uid: ji++,
						vnode: e,
						type: o,
						parent: t,
						appContext: r,
						root: null,
						next: null,
						subTree: null,
						effect: null,
						update: null,
						scope: new at(!0),
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
						propsOptions: Vr(o, r),
						emitsOptions: co(o, r),
						emit: null,
						emitted: null,
						propsDefaults: m,
						inheritAttrs: o.inheritAttrs,
						ctx: m,
						data: m,
						props: m,
						attrs: m,
						slots: m,
						refs: m,
						setupState: m,
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
				i.ctx = {
						_: i
					}, i.root = t ? t.root : i, i.emit = ao.bind(null, i), i.$pageInstance = t && t
					.$pageInstance, e.ce && e.ce(i);
				return i
			}(e, o, r);
			if (Wo(e) && (a.ctx.renderer = oe), function(e, t = !1) {
					Hi = t;
					const {
						props: n,
						children: o
					} = e.vnode, r = zi(e);
					zr(e, n, r, t), ((e, t) => {
						if (32 & e.vnode.shapeFlag) {
							const n = t._;
							n ? (e.slots = Tn(t), X(t, "_", n)) : Kr(t, e.slots = {})
						} else e.slots = {}, t && Zr(e, t);
						X(e.slots, xi, 1)
					})(e, o);
					const i = r ? function(e, t) {
						const n = e.type;
						e.accessCache = Object.create(null), e.proxy = Sn(new Proxy(e.ctx, Br));
						const {
							setup: o
						} = n;
						if (o) {
							const n = e.setupContext = o.length > 1 ? function(e) {
								const t = t => {
									e.exposed = t || {}
								};
								let n;
								return {
									get attrs() {
										return n || (n = function(e) {
											return new Proxy(e.attrs, {
												get: (t, n) => (Et(e, 0, "$attrs"),
													t[n])
											})
										}(e))
									},
									slots: e.slots,
									emit: e.emit,
									expose: t
								}
							}(e) : null;
							Di(e), Tt();
							const r = zn(o, e, 0, [e.props, n]);
							if (St(), qi(), I(r)) {
								if (r.then(qi, qi), t) return r.then((n => {
									Wi(e, n, t)
								})).catch((t => {
									Wn(t, e, 0)
								}));
								e.asyncDep = r
							} else Wi(e, r, t)
						} else Vi(e, t)
					}(e, t) : void 0;
					Hi = !1
				}(a), a.asyncDep) {
				if (r && r.registerDep(a, D), !e.el) {
					const e = a.subTree = ki(ui);
					_(null, e, t, n)
				}
			} else D(a, e, t, n, r, i, s)
		}, N = (e, t, n) => {
			const o = t.component = e.component;
			if (function(e, t, n) {
					const {
						props: o,
						children: r,
						component: i
					} = e, {
						props: s,
						children: a,
						patchFlag: l
					} = t, c = i.emitsOptions;
					if (t.dirs || t.transition) return !0;
					if (!(n && l >= 0)) return !(!r && !a || a && a.$stable) || o !== s && (o ? !s || yo(o, s,
						c) : !!s);
					if (1024 & l) return !0;
					if (16 & l) return o ? yo(o, s, c) : !!s;
					if (8 & l) {
						const e = t.dynamicProps;
						for (let t = 0; t < e.length; t++) {
							const n = e[t];
							if (s[n] !== o[n] && !uo(c, n)) return !0
						}
					}
					return !1
				}(e, t, n)) {
				if (o.asyncDep && !o.asyncResolved) return void q(o, t, n);
				o.next = t,
					function(e) {
						const t = Qn.indexOf(e);
						t > Un && Qn.splice(t, 1)
					}(o.update), o.update()
			} else t.el = e.el, o.vnode = t
		}, D = (e, t, n, o, r, i, s) => {
			const a = () => {
					if (e.isMounted) {
						let t, {
								next: n,
								bu: o,
								u: a,
								parent: l,
								vnode: c
							} = e,
							u = n;
						si(e, !1), n ? (n.el = c.el, q(e, n, s)) : n = c, o && U(o), (t = n.props && n.props
							.onVnodeBeforeUpdate) && Mi(t, l, n, c), si(e, !0);
						const f = go(e),
							p = e.subTree;
						e.subTree = f, b(p, f, d(p.el), te(p), e, r, i), n.el = f.el, null === u && function({
							vnode: e,
							parent: t
						}, n) {
							for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent
						}(e, f.el), a && ri(a, r), (t = n.props && n.props.onVnodeUpdated) && ri((() => Mi(
							t, l, n, c)), r)
					} else {
						let s;
						const {
							el: a,
							props: l
						} = t, {
							bm: c,
							m: u,
							parent: d
						} = e, f = qo(t);
						if (si(e, !1), c && U(c), !f && (s = l && l.onVnodeBeforeMount) && Mi(s, d, t), si(e, !
								0), a && ie) {
							const n = () => {
								e.subTree = go(e), ie(a, e.subTree, e, r, null)
							};
							f ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
						} else {
							const s = e.subTree = go(e);
							b(null, s, n, o, e, r, i), t.el = s.el
						}
						if (u && ri(u, r), !f && (s = l && l.onVnodeMounted)) {
							const e = t;
							ri((() => Mi(s, d, e)), r)
						}
						const {
							ba: p,
							a: h
						} = e;
						(256 & t.shapeFlag || d && qo(d.vnode) && 256 & d.vnode.shapeFlag) && (p && tr(p), h &&
							ri(h, r), p && ri((() => nr(p)), r)), e.isMounted = !0, t = n = o = null
					}
				},
				l = e.effect = new yt(a, (() => eo(c)), e.scope),
				c = e.update = () => l.run();
			c.id = e.uid, si(e, !0), c()
		}, q = (e, t, n) => {
			t.component = e;
			const o = e.vnode.props;
			e.vnode = t, e.next = null,
				function(e, t, n, o) {
					const {
						props: r,
						attrs: i,
						vnode: {
							patchFlag: s
						}
					} = e, a = Tn(r), [l] = e.propsOptions;
					let c = !1;
					if (!(o || s > 0) || 16 & s) {
						let o;
						Hr(e, t, r, i) && (c = !0);
						for (const i in a) t && (E(t, i) || (o = W(i)) !== i && E(t, o)) || (l ? !n ||
							void 0 === n[i] && void 0 === n[o] || (r[i] = Wr(l, a, i, void 0, e, !0)) :
							delete r[i]);
						if (i !== a)
							for (const e in i) t && E(t, e) || (delete i[e], c = !0)
					} else if (8 & s) {
						const n = e.vnode.dynamicProps;
						for (let o = 0; o < n.length; o++) {
							let s = n[o];
							if (uo(e.emitsOptions, s)) continue;
							const u = t[s];
							if (l)
								if (E(i, s)) u !== i[s] && (i[s] = u, c = !0);
								else {
									const t = z(s);
									r[t] = Wr(l, a, t, u, e, !1)
								}
							else u !== i[s] && (i[s] = u, c = !0)
						}
					}
					c && At(e, "set", "$attrs")
				}(e, t.props, o, n), ((e, t, n) => {
					const {
						vnode: o,
						slots: r
					} = e;
					let i = !0,
						s = m;
					if (32 & o.shapeFlag) {
						const e = t._;
						e ? n && 1 === e ? i = !1 : (x(r, t), n || 1 !== e || delete r._) : (i = !t.$stable,
							Kr(t, r)), s = t
					} else t && (Zr(e, t), s = {
						default: 1
					});
					if (i)
						for (const a in r) Yr(a) || a in s || delete r[a]
				})(e, t.children, n), Tt(), no(), St()
		}, H = (e, t, n, o, r, i, s, a, l = !1) => {
			const c = e && e.children,
				d = e ? e.shapeFlag : 0,
				f = t.children,
				{
					patchFlag: p,
					shapeFlag: h
				} = t;
			if (p > 0) {
				if (128 & p) return void $(c, f, n, o, r, i, s, a, l);
				if (256 & p) return void V(c, f, n, o, r, i, s, a, l)
			}
			8 & h ? (16 & d && ee(c, r, i), f !== c && u(n, f)) : 16 & d ? 16 & h ? $(c, f, n, o, r, i, s, a,
				l) : ee(c, r, i, !0) : (8 & d && u(n, ""), 16 & h && B(f, n, o, r, i, s, a, l))
		}, V = (e, t, n, o, r, i, s, a, l) => {
			t = t || g;
			const c = (e = e || g).length,
				u = t.length,
				d = Math.min(c, u);
			let f;
			for (f = 0; f < d; f++) {
				const o = t[f] = l ? Li(t[f]) : Pi(t[f]);
				b(e[f], o, n, null, r, i, s, a, l)
			}
			c > u ? ee(e, r, i, !0, !1, d) : B(t, n, o, r, i, s, a, l, d)
		}, $ = (e, t, n, o, r, i, s, a, l) => {
			let c = 0;
			const u = t.length;
			let d = e.length - 1,
				f = u - 1;
			for (; c <= d && c <= f;) {
				const o = e[c],
					u = t[c] = l ? Li(t[c]) : Pi(t[c]);
				if (!wi(o, u)) break;
				b(o, u, n, null, r, i, s, a, l), c++
			}
			for (; c <= d && c <= f;) {
				const o = e[d],
					c = t[f] = l ? Li(t[f]) : Pi(t[f]);
				if (!wi(o, c)) break;
				b(o, c, n, null, r, i, s, a, l), d--, f--
			}
			if (c > d) {
				if (c <= f) {
					const e = f + 1,
						d = e < u ? t[e].el : o;
					for (; c <= f;) b(null, t[c] = l ? Li(t[c]) : Pi(t[c]), n, d, r, i, s, a, l), c++
				}
			} else if (c > f)
				for (; c <= d;) Y(e[c], r, i, !0), c++;
			else {
				const p = c,
					h = c,
					m = new Map;
				for (c = h; c <= f; c++) {
					const e = t[c] = l ? Li(t[c]) : Pi(t[c]);
					null != e.key && m.set(e.key, c)
				}
				let v, y = 0;
				const _ = f - h + 1;
				let w = !1,
					x = 0;
				const T = new Array(_);
				for (c = 0; c < _; c++) T[c] = 0;
				for (c = p; c <= d; c++) {
					const o = e[c];
					if (y >= _) {
						Y(o, r, i, !0);
						continue
					}
					let u;
					if (null != o.key) u = m.get(o.key);
					else
						for (v = h; v <= f; v++)
							if (0 === T[v - h] && wi(o, t[v])) {
								u = v;
								break
							} void 0 === u ? Y(o, r, i, !0) : (T[u - h] = c + 1, u >= x ? x = u : w = !0, b(o,
						t[u], n, null, r, i, s, a, l), y++)
				}
				const S = w ? function(e) {
					const t = e.slice(),
						n = [0];
					let o, r, i, s, a;
					const l = e.length;
					for (o = 0; o < l; o++) {
						const l = e[o];
						if (0 !== l) {
							if (r = n[n.length - 1], e[r] < l) {
								t[o] = r, n.push(o);
								continue
							}
							for (i = 0, s = n.length - 1; i < s;) a = i + s >> 1, e[n[a]] < l ? i = a + 1 :
								s = a;
							l < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o)
						}
					}
					i = n.length, s = n[i - 1];
					for (; i-- > 0;) n[i] = s, s = t[s];
					return n
				}(T) : g;
				for (v = S.length - 1, c = _ - 1; c >= 0; c--) {
					const e = h + c,
						d = t[e],
						f = e + 1 < u ? t[e + 1].el : o;
					0 === T[c] ? b(null, d, n, f, r, i, s, a, l) : w && (v < 0 || c !== S[v] ? Q(d, n, f, 2) :
						v--)
				}
			}
		}, Q = (e, t, o, r, i = null) => {
			const {
				el: s,
				type: a,
				transition: l,
				children: c,
				shapeFlag: u
			} = e;
			if (6 & u) return void Q(e.component.subTree, t, o, r);
			if (128 & u) return void e.suspense.move(t, o, r);
			if (64 & u) return void a.move(e, t, o, oe);
			if (a === li) {
				n(s, t, o);
				for (let e = 0; e < c.length; e++) Q(c[e], t, o, r);
				return void n(e.anchor, t, o)
			}
			if (a === di) return void T(e, t, o);
			if (2 !== r && 1 & u && l)
				if (0 === r) l.beforeEnter(s), n(s, t, o), ri((() => l.enter(s)), i);
				else {
					const {
						leave: e,
						delayLeave: r,
						afterLeave: i
					} = l, a = () => n(s, t, o), c = () => {
						e(s, (() => {
							a(), i && i()
						}))
					};
					r ? r(s, a, c) : c()
				}
			else n(s, t, o)
		}, Y = (e, t, n, o = !1, r = !1) => {
			const {
				type: i,
				props: s,
				ref: a,
				children: l,
				dynamicChildren: c,
				shapeFlag: u,
				patchFlag: d,
				dirs: f
			} = e;
			if (null != a && oi(a, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
			const p = 1 & u && f,
				h = !qo(e);
			let m;
			if (h && (m = s && s.onVnodeBeforeUnmount) && Mi(m, t, e), 6 & u) Z(e.component, n, o);
			else {
				if (128 & u) return void e.suspense.unmount(n, o);
				p && gr(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, r, oe, o) : c && (i !==
						li || d > 0 && 64 & d) ? ee(c, t, n, !1, !0) : (i === li && 384 & d || !r && 16 & u) &&
					ee(l, t, n), o && G(e)
			}(h && (m = s && s.onVnodeUnmounted) || p) && ri((() => {
				m && Mi(m, t, e), p && gr(e, null, t, "unmounted")
			}), n)
		}, G = e => {
			const {
				type: t,
				el: n,
				anchor: r,
				transition: i
			} = e;
			if (t === li) return void K(n, r);
			if (t === di) return void S(e);
			const s = () => {
				o(n), i && !i.persisted && i.afterLeave && i.afterLeave()
			};
			if (1 & e.shapeFlag && i && !i.persisted) {
				const {
					leave: t,
					delayLeave: o
				} = i, r = () => t(n, s);
				o ? o(e.el, s, r) : r()
			} else s()
		}, K = (e, t) => {
			let n;
			for (; e !== t;) n = f(e), o(e), e = n;
			o(t)
		}, Z = (e, t, n) => {
			const {
				bum: o,
				scope: r,
				update: i,
				subTree: s,
				um: a
			} = e;
			o && U(o), r.stop(), i && (i.active = !1, Y(s, e, t, n)), a && ri(a, t), ri((() => {
					e.isUnmounted = !0
				}), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e
				.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
		}, ee = (e, t, n, o = !1, r = !1, i = 0) => {
			for (let s = i; s < e.length; s++) Y(e[s], t, n, o, r)
		}, te = e => 6 & e.shapeFlag ? te(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : f(e
			.anchor || e.el), ne = (e, t, n) => {
			null == e ? t._vnode && Y(t._vnode, null, null, !0) : b(t._vnode || null, e, t, null, null, null,
				n), no(), oo(), t._vnode = e
		}, oe = {
			p: b,
			um: Y,
			m: Q,
			r: G,
			mt: j,
			mc: B,
			pc: H,
			pbc: L,
			n: te,
			o: e
		};
		let re, ie;
		t && ([re, ie] = t(oe));
		return {
			render: ne,
			hydrate: re,
			createApp: ni(ne, re)
		}
	}(e)
}

function si({
	effect: e,
	update: t
}, n) {
	e.allowRecurse = t.allowRecurse = n
}

function ai(e, t, n = !1) {
	const o = e.children,
		r = t.children;
	if (k(o) && k(r))
		for (let i = 0; i < o.length; i++) {
			const e = o[i];
			let t = r[i];
			1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = r[i] = Li(r[i]),
				t.el = e.el), n || ai(e, t)), t.type === ci && (t.el = e.el)
		}
}
const li = Symbol(void 0),
	ci = Symbol(void 0),
	ui = Symbol(void 0),
	di = Symbol(void 0),
	fi = [];
let pi = null;

function hi(e = !1) {
	fi.push(pi = e ? null : [])
}
let mi = 1;

function gi(e) {
	mi += e
}

function vi(e) {
	return e.dynamicChildren = mi > 0 ? pi || g : null, fi.pop(), pi = fi[fi.length - 1] || null, mi > 0 && pi && pi
		.push(e), e
}

function bi(e, t, n, o, r, i) {
	return vi(Ei(e, t, n, o, r, i, !0))
}

function yi(e, t, n, o, r) {
	return vi(ki(e, t, n, o, r, !0))
}

function _i(e) {
	return !!e && !0 === e.__v_isVNode
}

function wi(e, t) {
	return e.type === t.type && e.key === t.key
}
const xi = "__vInternal",
	Ti = ({
		key: e
	}) => null != e ? e : null,
	Si = ({
		ref: e,
		ref_key: t,
		ref_for: n
	}) => null != e ? P(e) || Bn(e) || B(e) ? {
		i: fo,
		r: e,
		k: t,
		f: !!n
	} : e : null;

function Ei(e, t = null, n = null, o = 0, r = null, i = (e === li ? 0 : 1), s = !1, a = !1) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Ti(t),
		ref: t && Si(t),
		scopeId: po,
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
		ctx: fo
	};
	return a ? (Oi(l, n), 128 & i && e.normalize(l)) : n && (l.shapeFlag |= P(n) ? 8 : 16), mi > 0 && !s && pi && (l
		.patchFlag > 0 || 6 & i) && 32 !== l.patchFlag && pi.push(l), l
}
const ki = function(e, t = null, n = null, o = 0, r = null, s = !1) {
	e && e !== yr || (e = ui);
	if (_i(e)) {
		const o = Ai(e, t, !0);
		return n && Oi(o, n), mi > 0 && !s && pi && (6 & o.shapeFlag ? pi[pi.indexOf(e)] = o : pi.push(o)), o
			.patchFlag |= -2, o
	}
	a = e, B(a) && "__vccOpts" in a && (e = e.__vccOpts);
	var a;
	if (t) {
		t = function(e) {
			return e ? xn(e) || xi in e ? x({}, e) : e : null
		}(t);
		let {
			class: e,
			style: n
		} = t;
		e && !P(e) && (t.class = u(e)), O(n) && (xn(n) && !k(n) && (n = x({}, n)), t.style = i(n))
	}
	const l = P(e) ? 1 : _o(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : O(e) ? 4 : B(e) ? 2 : 0;
	return Ei(e, t, n, o, r, l, s, !0)
};

function Ai(e, t, n = !1) {
	const {
		props: o,
		ref: r,
		patchFlag: i,
		children: s
	} = e, a = t ? Ii(o || {}, t) : o;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: a,
		key: a && Ti(a),
		ref: t && t.ref ? n && r ? k(r) ? r.concat(Si(t)) : [r, Si(t)] : Si(t) : r,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== li ? -1 === i ? 16 : 16 | i : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Ai(e.ssContent),
		ssFallback: e.ssFallback && Ai(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	}
}

function Ci(e = " ", t = 0) {
	return ki(ci, null, e, t)
}

function Bi(e = "", t = !1) {
	return t ? (hi(), yi(ui, null, e)) : ki(ui, null, e)
}

function Pi(e) {
	return null == e || "boolean" == typeof e ? ki(ui) : k(e) ? ki(li, null, e.slice()) : "object" == typeof e ? Li(e) :
		ki(ci, null, String(e))
}

function Li(e) {
	return null === e.el && -1 !== e.patchFlag || e.memo ? e : Ai(e)
}

function Oi(e, t) {
	let n = 0;
	const {
		shapeFlag: o
	} = e;
	if (null == t) t = null;
	else if (k(t)) n = 16;
	else if ("object" == typeof t) {
		if (65 & o) {
			const n = t.default;
			return void(n && (n._c && (n._d = !1), Oi(e, n()), n._c && (n._d = !0)))
		} {
			n = 32;
			const o = t._;
			o || xi in t ? 3 === o && fo && (1 === fo.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = fo
		}
	} else B(t) ? (t = {
		default: t,
		_ctx: fo
	}, n = 32) : (t = String(t), 64 & o ? (n = 16, t = [Ci(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n
}

function Ii(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const o = e[n];
		for (const e in o)
			if ("class" === e) t.class !== o.class && (t.class = u([t.class, o.class]));
			else if ("style" === e) t.style = i([t.style, o.style]);
		else if (_(e)) {
			const n = t[e],
				r = o[e];
			!r || n === r || k(n) && n.includes(r) || (t[e] = n ? [].concat(n, r) : r)
		} else "" !== e && (t[e] = o[e])
	}
	return t
}

function Mi(e, t, n, o = null) {
	Hn(e, t, 7, [n, o])
}
const Fi = ei();
let ji = 0;
let Ni = null;
const Ri = () => Ni || fo,
	Di = e => {
		Ni = e, e.scope.on()
	},
	qi = () => {
		Ni && Ni.scope.off(), Ni = null
	};

function zi(e) {
	return 4 & e.vnode.shapeFlag
}
let Hi = !1;

function Wi(e, t, n) {
	B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : O(t) && (e.setupState = jn(t)), Vi(e, n)
}

function Vi(e, t, n) {
	const o = e.type;
	e.render || (e.render = o.render || v), Di(e), Tt(), Lr(e), St(), qi()
}

function $i(e) {
	if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(jn(Sn(e.exposed)), {
		get: (t, n) => n in t ? t[n] : n in Ar ? Ar[n](e) : void 0,
		has: (e, t) => t in e || t in Ar
	}))
}

function Qi(e, t = !0) {
	return B(e) ? e.displayName || e.name : e.name || t && e.__name
}
const Ui = (e, t) => function(e, t, n = !1) {
	let o, r;
	const i = B(e);
	return i ? (o = e, r = v) : (o = e.get, r = e.set), new qn(o, r, i || !r, n)
}(e, 0, Hi);

function Xi(e, t, n) {
	const o = arguments.length;
	return 2 === o ? O(t) && !k(t) ? _i(t) ? ki(e, null, [t]) : ki(e, t) : ki(e, null, t) : (o > 3 ? n = Array.prototype
		.slice.call(arguments, 2) : 3 === o && _i(n) && (n = [n]), ki(e, t, n))
}
const Yi = Symbol(""),
	Ji = () => xo(Yi),
	Gi = "3.2.47",
	Ki = "undefined" != typeof document ? document : null,
	Zi = Ki && Ki.createElement("template"),
	es = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null)
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e)
		},
		createElement: (e, t, n, o) => {
			const r = t ? Ki.createElementNS("http://www.w3.org/2000/svg", e) : Ki.createElement(e, n ? {
				is: n
			} : void 0);
			return "select" === e && o && null != o.multiple && r.setAttribute("multiple", o.multiple), r
		},
		createText: e => Ki.createTextNode(e),
		createComment: e => Ki.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t
		},
		setElementText: (e, t) => {
			e.textContent = t
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => Ki.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "")
		},
		insertStaticContent(e, t, n, o, r, i) {
			const s = n ? n.previousSibling : t.lastChild;
			if (r && (r === i || r.nextSibling))
				for (; t.insertBefore(r.cloneNode(!0), n), r !== i && (r = r.nextSibling););
			else {
				Zi.innerHTML = o ? `<svg>${e}</svg>` : e;
				const r = Zi.content;
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
const ts = /\s*!important$/;

function ns(e, t, n) {
	if (k(n)) n.forEach((n => ns(e, t, n)));
	else if (null == n && (n = ""), n = fs(n), t.startsWith("--")) e.setProperty(t, n);
	else {
		const o = function(e, t) {
			const n = rs[t];
			if (n) return n;
			let o = z(t);
			if ("filter" !== o && o in e) return rs[t] = o;
			o = V(o);
			for (let r = 0; r < os.length; r++) {
				const n = os[r] + o;
				if (n in e) return rs[t] = n
			}
			return t
		}(e, t);
		ts.test(n) ? e.setProperty(W(o), n.replace(ts, ""), "important") : e[o] = n
	}
}
const os = ["Webkit", "Moz", "ms"],
	rs = {};
const {
	unit: is,
	unitRatio: ss,
	unitPrecision: as
} = {
	unit: "rem",
	unitRatio: 10 / 320,
	unitPrecision: 5
}, ls = (cs = is, us = ss, ds = as, e => e.replace(He, ((e, t) => {
	if (!t) return e;
	if (1 === us) return `${t}${cs}`;
	const n = function(e, t) {
		const n = Math.pow(10, t + 1),
			o = Math.floor(e * n);
		return 10 * Math.round(o / 10) / n
	}(parseFloat(t) * us, ds);
	return 0 === n ? "0" : `${n}${cs}`
})));
var cs, us, ds;
const fs = e => P(e) ? ls(e) : e,
	ps = "http://www.w3.org/1999/xlink";

function hs(e, t, n, o, r = null) {
	const i = e._vei || (e._vei = {}),
		s = i[t];
	if (o && s) s.value = o;
	else {
		const [n, a] = function(e) {
			let t;
			if (ms.test(e)) {
				let n;
				for (t = {}; n = e.match(ms);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
			}
			const n = ":" === e[2] ? e.slice(3) : W(e.slice(2));
			return [n, t]
		}(t);
		if (o) {
			const s = i[t] = function(e, t) {
				const n = e => {
					if (e._vts) {
						if (e._vts <= n.attached) return
					} else e._vts = Date.now();
					const o = t && t.proxy,
						r = o && o.$nne,
						{
							value: i
						} = n;
					if (r && k(i)) {
						const n = bs(e, i);
						for (let o = 0; o < n.length; o++) {
							const i = n[o];
							Hn(i, t, 5, i.__wwe ? [e] : r(e))
						}
					} else Hn(bs(e, i), t, 5, r && !i.__wwe ? r(e, i, t) : [e])
				};
				return n.value = e, n.attached = (() => gs || (vs.then((() => gs = 0)), gs = Date.now()))(), n
			}(o, r);
			! function(e, t, n, o) {
				e.addEventListener(t, n, o)
			}(e, n, s, a)
		} else s && (! function(e, t, n, o) {
			e.removeEventListener(t, n, o)
		}(e, n, s, a), i[t] = void 0)
	}
}
const ms = /(?:Once|Passive|Capture)$/;
let gs = 0;
const vs = Promise.resolve();

function bs(e, t) {
	if (k(t)) {
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
const ys = /^on[a-z]/;
const _s = "transition",
	ws = "animation",
	xs = (e, {
		slots: t
	}) => Xi(Oo, function(e) {
		const t = {};
		for (const x in e) x in Ts || (t[x] = e[x]);
		if (!1 === e.css) return t;
		const {
			name: n = "v",
			type: o,
			duration: r,
			enterFromClass: i = `${n}-enter-from`,
			enterActiveClass: s = `${n}-enter-active`,
			enterToClass: a = `${n}-enter-to`,
			appearFromClass: l = i,
			appearActiveClass: c = s,
			appearToClass: u = a,
			leaveFromClass: d = `${n}-leave-from`,
			leaveActiveClass: f = `${n}-leave-active`,
			leaveToClass: p = `${n}-leave-to`
		} = e, h = function(e) {
			if (null == e) return null;
			if (O(e)) return [ks(e.enter), ks(e.leave)]; {
				const t = ks(e);
				return [t, t]
			}
		}(r), m = h && h[0], g = h && h[1], {
			onBeforeEnter: v,
			onEnter: b,
			onEnterCancelled: y,
			onLeave: _,
			onLeaveCancelled: w,
			onBeforeAppear: T = v,
			onAppear: S = b,
			onAppearCancelled: E = y
		} = t, k = (e, t, n) => {
			Cs(e, t ? u : a), Cs(e, t ? c : s), n && n()
		}, A = (e, t) => {
			e._isLeaving = !1, Cs(e, d), Cs(e, p), Cs(e, f), t && t()
		}, C = e => (t, n) => {
			const r = e ? S : b,
				s = () => k(t, e, n);
			Ss(r, [t, s]), Bs((() => {
				Cs(t, e ? l : i), As(t, e ? u : a), Es(r) || Ls(t, o, m, s)
			}))
		};
		return x(t, {
			onBeforeEnter(e) {
				Ss(v, [e]), As(e, i), As(e, s)
			},
			onBeforeAppear(e) {
				Ss(T, [e]), As(e, l), As(e, c)
			},
			onEnter: C(!1),
			onAppear: C(!0),
			onLeave(e, t) {
				e._isLeaving = !0;
				const n = () => A(e, t);
				As(e, d), document.body.offsetHeight, As(e, f), Bs((() => {
					e._isLeaving && (Cs(e, d), As(e, p), Es(_) || Ls(e, o, g, n))
				})), Ss(_, [e, n])
			},
			onEnterCancelled(e) {
				k(e, !1), Ss(y, [e])
			},
			onAppearCancelled(e) {
				k(e, !0), Ss(E, [e])
			},
			onLeaveCancelled(e) {
				A(e), Ss(w, [e])
			}
		})
	}(e), t);
xs.displayName = "Transition";
const Ts = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
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
xs.props = x({}, Lo, Ts);
const Ss = (e, t = []) => {
		k(e) ? e.forEach((e => e(...t))) : e && e(...t)
	},
	Es = e => !!e && (k(e) ? e.some((e => e.length > 1)) : e.length > 1);

function ks(e) {
	const t = (e => {
		const t = P(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t
	})(e);
	return t
}

function As(e, t) {
	t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set)).add(t)
}

function Cs(e, t) {
	t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
	const {
		_vtc: n
	} = e;
	n && (n.delete(t), n.size || (e._vtc = void 0))
}

function Bs(e) {
	requestAnimationFrame((() => {
		requestAnimationFrame(e)
	}))
}
let Ps = 0;

function Ls(e, t, n, o) {
	const r = e._endId = ++Ps,
		i = () => {
			r === e._endId && o()
		};
	if (n) return setTimeout(i, n);
	const {
		type: s,
		timeout: a,
		propCount: l
	} = function(e, t) {
		const n = window.getComputedStyle(e),
			o = e => (n[e] || "").split(", "),
			r = o(`${_s}Delay`),
			i = o(`${_s}Duration`),
			s = Os(r, i),
			a = o(`${ws}Delay`),
			l = o(`${ws}Duration`),
			c = Os(a, l);
		let u = null,
			d = 0,
			f = 0;
		t === _s ? s > 0 && (u = _s, d = s, f = i.length) : t === ws ? c > 0 && (u = ws, d = c, f = l.length) : (d =
			Math.max(s, c), u = d > 0 ? s > c ? _s : ws : null, f = u ? u === _s ? i.length : l.length : 0);
		const p = u === _s && /\b(transform|all)(,|$)/.test(o(`${_s}Property`).toString());
		return {
			type: u,
			timeout: d,
			propCount: f,
			hasTransform: p
		}
	}(e, t);
	if (!s) return o();
	const c = s + "end";
	let u = 0;
	const d = () => {
			e.removeEventListener(c, f), i()
		},
		f = t => {
			t.target === e && ++u >= l && d()
		};
	setTimeout((() => {
		u < l && d()
	}), a + 1), e.addEventListener(c, f)
}

function Os(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map(((t, n) => Is(t) + Is(e[n]))))
}

function Is(e) {
	return 1e3 * Number(e.slice(0, -1).replace(",", "."))
}
const Ms = ["ctrl", "shift", "alt", "meta"],
	Fs = {
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
		exact: (e, t) => Ms.some((n => e[`${n}Key`] && !t.includes(n)))
	},
	js = (e, t) => (n, ...o) => {
		for (let e = 0; e < t.length; e++) {
			const o = Fs[t[e]];
			if (o && o(n, t)) return
		}
		return e(n, ...o)
	},
	Ns = {
		beforeMount(e, {
			value: t
		}, {
			transition: n
		}) {
			e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : Rs(e, t)
		},
		mounted(e, {
			value: t
		}, {
			transition: n
		}) {
			n && t && n.enter(e)
		},
		updated(e, {
			value: t,
			oldValue: n
		}, {
			transition: o
		}) {
			!t != !n && (o ? t ? (o.beforeEnter(e), Rs(e, !0), o.enter(e)) : o.leave(e, (() => {
				Rs(e, !1)
			})) : Rs(e, t))
		},
		beforeUnmount(e, {
			value: t
		}) {
			Rs(e, t)
		}
	};

function Rs(e, t) {
	e.style.display = t ? e._vod : "none"
}
const Ds = x({
	patchProp: (e, t, n, o, r = !1, i, s, a, l) => {
		if (0 === t.indexOf("change:")) return function(e, t, n, o = null) {
			if (!n || !o) return;
			const r = t.replace("change:", ""),
				{
					attrs: i
				} = o,
				s = i[r],
				a = (e.__wxsProps || (e.__wxsProps = {}))[r];
			if (a === s) return;
			e.__wxsProps[r] = s;
			const l = o.proxy;
			Zn((() => {
				n(s, a, l.$gcd(l, !0), l.$gcd(l, !1))
			}))
		}(e, t, o, s);
		"class" === t ? function(e, t, n) {
			const {
				__wxsAddClass: o,
				__wxsRemoveClass: r
			} = e;
			r && r.length && (t = (t || "").split(/\s+/).filter((e => -1 === r.indexOf(e))).join(" "), r
				.length = 0), o && o.length && (t = (t || "") + " " + o.join(" "));
			const i = e._vtc;
			i && (t = (t ? [t, ...i] : [...i]).join(" ")), null == t ? e.removeAttribute("class") : n ?
				e.setAttribute("class", t) : e.className = t
		}(e, o, r) : "style" === t ? function(e, t, n) {
			const o = e.style,
				r = P(n);
			if (n && !r) {
				if (t && !P(t))
					for (const e in t) null == n[e] && ns(o, e, "");
				for (const e in n) ns(o, e, n[e])
			} else {
				const i = o.display;
				r ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o
					.display = i)
			}
			const {
				__wxsStyle: i
			} = e;
			if (i)
				for (const s in i) ns(o, s, i[s])
		}(e, n, o) : _(t) ? w(t) || hs(e, t, 0, o, s) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[
			0] ? (t = t.slice(1), 0) : function(e, t, n, o) {
			if (o) return "innerHTML" === t || "textContent" === t || !!(t in e && ys.test(t) && B(
				n));
			if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
			if ("form" === t) return !1;
			if ("list" === t && "INPUT" === e.tagName) return !1;
			if ("type" === t && "TEXTAREA" === e.tagName) return !1;
			if (ys.test(t) && P(n)) return !1;
			return t in e
		}(e, t, o, r)) ? function(e, t, n, o, r, i, s) {
			if ("innerHTML" === t || "textContent" === t) return o && s(o, r, i), void(e[t] = null ==
				n ? "" : n);
			if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
				e._value = n;
				const o = null == n ? "" : n;
				return e.value === o && "OPTION" !== e.tagName || (e.value = o), void(null == n && e
					.removeAttribute(t))
			}
			let a = !1;
			if ("" === n || null == n) {
				const o = typeof e[t];
				"boolean" === o ? n = f(n) : null == n && "string" === o ? (n = "", a = !0) :
					"number" === o && (n = 0, a = !0)
			}
			try {
				e[t] = n
			} catch (l) {}
			a && e.removeAttribute(t)
		}(e, t, o, i, s, a, l) : ("true-value" === t ? e._trueValue = o : "false-value" === t && (e
			._falseValue = o), function(e, t, n, o, r) {
			if (o && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(ps, t.slice(6, t
				.length)) : e.setAttributeNS(ps, t, n);
			else {
				const o = d(t);
				null == n || o && !f(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
			}
		}(e, t, o, r))
	},
	forcePatchProp: (e, t) => 0 === t.indexOf("change:") || ("class" === t && e.__wxsClassChanged ? (e
		.__wxsClassChanged = !1, !0) : !("style" !== t || !e.__wxsStyleChanged) && (e
		.__wxsStyleChanged = !1, !0))
}, es);
let qs;
const zs = (...e) => {
	const t = (qs || (qs = ii(Ds))).createApp(...e),
		{
			mount: n
		} = t;
	return t.mount = e => {
		const o = function(e) {
			if (P(e)) {
				return document.querySelector(e)
			}
			return e
		}(e);
		if (!o) return;
		const r = t._component;
		B(r) || r.render || r.template || (r.template = o.innerHTML), o.innerHTML = "";
		const i = n(o, !1, o instanceof SVGElement);
		return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i
	}, t
};
const Hs = ["{", "}"];
const Ws = /^(?:\d)+/,
	Vs = /^(?:\w)+/;
const $s = "zh-Hans",
	Qs = "zh-Hant",
	Us = "en",
	Xs = "fr",
	Ys = "es",
	Js = Object.prototype.hasOwnProperty,
	Gs = (e, t) => Js.call(e, t),
	Ks = new class {
		constructor() {
			this._caches = Object.create(null)
		}
		interpolate(e, t, n = Hs) {
			if (!t) return [e];
			let o = this._caches[e];
			return o || (o = function(e, [t, n]) {
					const o = [];
					let r = 0,
						i = "";
					for (; r < e.length;) {
						let s = e[r++];
						if (s === t) {
							i && o.push({
								type: "text",
								value: i
							}), i = "";
							let t = "";
							for (s = e[r++]; void 0 !== s && s !== n;) t += s, s = e[r++];
							const a = s === n,
								l = Ws.test(t) ? "list" : a && Vs.test(t) ? "named" : "unknown";
							o.push({
								value: t,
								type: l
							})
						} else i += s
					}
					return i && o.push({
						type: "text",
						value: i
					}), o
				}(e, n), this._caches[e] = o),
				function(e, t) {
					const n = [];
					let o = 0;
					const r = Array.isArray(t) ? "list" : (i = t, null !== i && "object" == typeof i ? "named" :
						"unknown");
					var i;
					if ("unknown" === r) return n;
					for (; o < e.length;) {
						const i = e[o];
						switch (i.type) {
							case "text":
								n.push(i.value);
								break;
							case "list":
								n.push(t[parseInt(i.value, 10)]);
								break;
							case "named":
								"named" === r && n.push(t[i.value])
						}
						o++
					}
					return n
				}(o, t)
		}
	};

function Zs(e, t) {
	if (!e) return;
	if (e = e.trim().replace(/_/g, "-"), t && t[e]) return e;
	if ("chinese" === (e = e.toLowerCase())) return $s;
	if (0 === e.indexOf("zh")) return e.indexOf("-hans") > -1 ? $s : e.indexOf("-hant") > -1 ? Qs : (n = e, ["-tw",
		"-hk", "-mo", "-cht"
	].find((e => -1 !== n.indexOf(e))) ? Qs : $s);
	var n;
	const o = function(e, t) {
		return t.find((t => 0 === e.indexOf(t)))
	}(e, [Us, Xs, Ys]);
	return o || void 0
}
class ea {
	constructor({
		locale: e,
		fallbackLocale: t,
		messages: n,
		watcher: o,
		formater: r
	}) {
		this.locale = Us, this.fallbackLocale = Us, this.message = {}, this.messages = {}, this.watchers = [], t &&
			(this.fallbackLocale = t), this.formater = r || Ks, this.messages = n || {}, this.setLocale(e || Us),
			o && this.watchLocale(o)
	}
	setLocale(e) {
		const t = this.locale;
		this.locale = Zs(e, this.messages) || this.fallbackLocale, this.messages[this.locale] || (this.messages[this
				.locale] = {}), this.message = this.messages[this.locale], t !== this.locale && this.watchers
			.forEach((e => {
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
			Gs(o, e) || (o[e] = t[e])
		})) : this.messages[e] = t
	}
	f(e, t, n) {
		return this.formater.interpolate(e, t, n).join("")
	}
	t(e, t, n) {
		let o = this.message;
		return "string" == typeof t ? (t = Zs(t, this.messages)) && (o = this.messages[t]) : n = t, Gs(o, e) ? this
			.formater.interpolate(o[e], n).join("") : (console.warn(
				`Cannot translate the value of keypath ${e}. Use the value of keypath as default.`), e)
	}
}

function ta(e, t = {}, n, o) {
	"string" != typeof e && ([e, t] = [t, e]), "string" != typeof e && (e = "undefined" != typeof uni && mf ? mf() :
		"undefined" != typeof global && global.getLocale ? global.getLocale() : Us), "string" != typeof n && (n =
		"undefined" != typeof __uniConfig && __uniConfig.fallbackLocale || Us);
	const r = new ea({
		locale: e,
		fallbackLocale: n,
		messages: t,
		watcher: o
	});
	let i = (e, t) => {
		{
			let e = !1;
			i = function(t, n) {
				const o = zm().$vm;
				return o && (o.$locale, e || (e = !0, function(e, t) {
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

function na(e, t) {
	return e.indexOf(t[0]) > -1
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
const oa = "undefined" != typeof window;
const ra = Object.assign;

function ia(e, t) {
	const n = {};
	for (const o in t) {
		const r = t[o];
		n[o] = aa(r) ? r.map(e) : e(r)
	}
	return n
}
const sa = () => {},
	aa = Array.isArray,
	la = /\/$/;

function ca(e, t, n = "/") {
	let o, r = {},
		i = "",
		s = "";
	const a = t.indexOf("#");
	let l = t.indexOf("?");
	return a < l && a >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), i = t.slice(l + 1, a > -1 ? a : t.length), r = e(
		i)), a > -1 && (o = o || t.slice(0, a), s = t.slice(a, t.length)), o = function(e, t) {
		if (e.startsWith("/")) return e;
		if (!e) return t;
		const n = t.split("/"),
			o = e.split("/");
		let r, i, s = n.length - 1;
		for (r = 0; r < o.length; r++)
			if (i = o[r], "." !== i) {
				if (".." !== i) break;
				s > 1 && s--
			} return n.slice(0, s).join("/") + "/" + o.slice(r - (r === o.length ? 1 : 0)).join("/")
	}(null != o ? o : t, n), {
		fullPath: o + (i && "?") + i + s,
		path: o,
		query: r,
		hash: s
	}
}

function ua(e, t) {
	return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}

function da(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t)
}

function fa(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const n in e)
		if (!pa(e[n], t[n])) return !1;
	return !0
}

function pa(e, t) {
	return aa(e) ? ha(e, t) : aa(t) ? ha(t, e) : e === t
}

function ha(e, t) {
	return aa(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}
var ma, ga, va, ba;

function ya(e) {
	if (!e)
		if (oa) {
			const t = document.querySelector("base");
			e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
		} else e = "/";
	return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(la, "")
}(ga = ma || (ma = {})).pop = "pop", ga.push = "push", (ba = va || (va = {})).back = "back", ba.forward = "forward", ba
	.unknown = "";
const _a = /^[^#]+#/;

function wa(e, t) {
	return e.replace(_a, "#") + t
}
const xa = () => ({
	left: window.pageXOffset,
	top: window.pageYOffset
});

function Ta(e) {
	let t;
	if ("el" in e) {
		const n = e.el,
			o = "string" == typeof n && n.startsWith("#"),
			r = "string" == typeof n ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
		if (!r) return;
		t = function(e, t) {
			const n = document.documentElement.getBoundingClientRect(),
				o = e.getBoundingClientRect();
			return {
				behavior: t.behavior,
				left: o.left - n.left - (t.left || 0),
				top: o.top - n.top - (t.top || 0)
			}
		}(r, e)
	} else t = e;
	"scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left :
		window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}

function Sa(e, t) {
	return (history.state ? history.state.position - t : -1) + e
}
const Ea = new Map;

function ka(e, t) {
	const {
		pathname: n,
		search: o,
		hash: r
	} = t, i = e.indexOf("#");
	if (i > -1) {
		let t = r.includes(e.slice(i)) ? e.slice(i).length : 1,
			n = r.slice(t);
		return "/" !== n[0] && (n = "/" + n), ua(n, "")
	}
	return ua(n, e) + o + r
}

function Aa(e, t, n, o = !1, r = !1) {
	return {
		back: e,
		current: t,
		forward: n,
		replaced: o,
		position: window.history.length,
		scroll: r ? xa() : null
	}
}

function Ca(e) {
	const {
		history: t,
		location: n
	} = window, o = {
		value: ka(e, n)
	}, r = {
		value: t.state
	};

	function i(o, i, s) {
		const a = e.indexOf("#"),
			l = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + o : location.protocol + "//" +
			location.host + e + o;
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
		location: o,
		state: r,
		push: function(e, n) {
			const s = ra({}, r.value, t.state, {
				forward: e,
				scroll: xa()
			});
			i(s.current, s, !0), i(e, ra({}, Aa(o.value, e, null), {
				position: s.position + 1
			}, n), !1), o.value = e
		},
		replace: function(e, n) {
			i(e, ra({}, t.state, Aa(r.value.back, e, r.value.forward, !0), n, {
				position: r.value.position
			}), !0), o.value = e
		}
	}
}

function Ba(e) {
	const t = Ca(e = ya(e)),
		n = function(e, t, n, o) {
			let r = [],
				i = [],
				s = null;
			const a = ({
				state: i
			}) => {
				const a = ka(e, location),
					l = n.value,
					c = t.value;
				let u = 0;
				if (i) {
					if (n.value = a, t.value = i, s && s === l) return void(s = null);
					u = c ? i.position - c.position : 0
				} else o(a);
				r.forEach((e => {
					e(n.value, l, {
						delta: u,
						type: ma.pop,
						direction: u ? u > 0 ? va.forward : va.back : va.unknown
					})
				}))
			};

			function l() {
				const {
					history: e
				} = window;
				e.state && e.replaceState(ra({}, e.state, {
					scroll: xa()
				}), "")
			}
			return window.addEventListener("popstate", a), window.addEventListener("beforeunload", l), {
				pauseListeners: function() {
					s = n.value
				},
				listen: function(e) {
					r.push(e);
					const t = () => {
						const t = r.indexOf(e);
						t > -1 && r.splice(t, 1)
					};
					return i.push(t), t
				},
				destroy: function() {
					for (const e of i) e();
					i = [], window.removeEventListener("popstate", a), window.removeEventListener(
						"beforeunload", l)
				}
			}
		}(e, t.state, t.location, t.replace);
	const o = ra({
		location: "",
		base: e,
		go: function(e, t = !0) {
			t || n.pauseListeners(), history.go(e)
		},
		createHref: wa.bind(null, e)
	}, t, n);
	return Object.defineProperty(o, "location", {
		enumerable: !0,
		get: () => t.location.value
	}), Object.defineProperty(o, "state", {
		enumerable: !0,
		get: () => t.state.value
	}), o
}

function Pa(e) {
	return "string" == typeof e || "symbol" == typeof e
}
const La = {
		path: "/",
		name: void 0,
		params: {},
		query: {},
		hash: "",
		fullPath: "/",
		matched: [],
		meta: {},
		redirectedFrom: void 0
	},
	Oa = Symbol("");
var Ia, Ma;

function Fa(e, t) {
	return ra(new Error, {
		type: e,
		[Oa]: !0
	}, t)
}

function ja(e, t) {
	return e instanceof Error && Oa in e && (null == t || !!(e.type & t))
}(Ma = Ia || (Ia = {}))[Ma.aborted = 4] = "aborted", Ma[Ma.cancelled = 8] = "cancelled", Ma[Ma.duplicated = 16] =
	"duplicated";
const Na = "[^/]+?",
	Ra = {
		sensitive: !1,
		strict: !1,
		start: !0,
		end: !0
	},
	Da = /[.+*?^${}()[\]/\\]/g;

function qa(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length;) {
		const o = t[n] - e[n];
		if (o) return o;
		n++
	}
	return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 ===
		t[0] ? 1 : -1 : 0
}

function za(e, t) {
	let n = 0;
	const o = e.score,
		r = t.score;
	for (; n < o.length && n < r.length;) {
		const e = qa(o[n], r[n]);
		if (e) return e;
		n++
	}
	if (1 === Math.abs(r.length - o.length)) {
		if (Ha(o)) return 1;
		if (Ha(r)) return -1
	}
	return r.length - o.length
}

function Ha(e) {
	const t = e[e.length - 1];
	return e.length > 0 && t[t.length - 1] < 0
}
const Wa = {
		type: 0,
		value: ""
	},
	Va = /[a-zA-Z0-9_]/;

function $a(e, t, n) {
	const o = function(e, t) {
			const n = ra({}, Ra, t),
				o = [];
			let r = n.start ? "^" : "";
			const i = [];
			for (const l of e) {
				const e = l.length ? [] : [90];
				n.strict && !l.length && (r += "/");
				for (let t = 0; t < l.length; t++) {
					const o = l[t];
					let s = 40 + (n.sensitive ? .25 : 0);
					if (0 === o.type) t || (r += "/"), r += o.value.replace(Da, "\\$&"), s += 40;
					else if (1 === o.type) {
						const {
							value: e,
							repeatable: n,
							optional: c,
							regexp: u
						} = o;
						i.push({
							name: e,
							repeatable: n,
							optional: c
						});
						const d = u || Na;
						if (d !== Na) {
							s += 10;
							try {
								new RegExp(`(${d})`)
							} catch (a) {
								throw new Error(`Invalid custom RegExp for param "${e}" (${d}): ` + a.message)
							}
						}
						let f = n ? `((?:${d})(?:/(?:${d}))*)` : `(${d})`;
						t || (f = c && l.length < 2 ? `(?:/${f})` : "/" + f), c && (f += "?"), r += f, s += 20, c && (
							s += -8), n && (s += -20), ".*" === d && (s += -50)
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
				re: s,
				score: o,
				keys: i,
				parse: function(e) {
					const t = e.match(s),
						n = {};
					if (!t) return null;
					for (let o = 1; o < t.length; o++) {
						const e = t[o] || "",
							r = i[o - 1];
						n[r.name] = e && r.repeatable ? e.split("/") : e
					}
					return n
				},
				stringify: function(t) {
					let n = "",
						o = !1;
					for (const r of e) {
						o && n.endsWith("/") || (n += "/"), o = !1;
						for (const e of r)
							if (0 === e.type) n += e.value;
							else if (1 === e.type) {
							const {
								value: i,
								repeatable: s,
								optional: a
							} = e, l = i in t ? t[i] : "";
							if (aa(l) && !s) throw new Error(
								`Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`
								);
							const c = aa(l) ? l.join("/") : l;
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
		}(function(e) {
			if (!e) return [
				[]
			];
			if ("/" === e) return [
				[Wa]
			];
			if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

			function t(e) {
				throw new Error(`ERR (${n})/"${c}": ${e}`)
			}
			let n = 0,
				o = n;
			const r = [];
			let i;

			function s() {
				i && r.push(i), i = []
			}
			let a, l = 0,
				c = "",
				u = "";

			function d() {
				c && (0 === n ? i.push({
					type: 0,
					value: c
				}) : 1 === n || 2 === n || 3 === n ? (i.length > 1 && ("*" === a || "+" === a) && t(
					`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
					type: 1,
					value: c,
					regexp: u,
					repeatable: "*" === a || "+" === a,
					optional: "*" === a || "?" === a
				})) : t("Invalid state to consume buffer"), c = "")
			}

			function f() {
				c += a
			}
			for (; l < e.length;)
				if (a = e[l++], "\\" !== a || 2 === n) switch (n) {
					case 0:
						"/" === a ? (c && d(), s()) : ":" === a ? (d(), n = 1) : f();
						break;
					case 4:
						f(), n = o;
						break;
					case 1:
						"(" === a ? n = 2 : Va.test(a) ? f() : (d(), n = 0, "*" !== a && "?" !== a && "+" !==
							a && l--);
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
		}(e.path), n),
		r = ra(o, {
			record: e,
			parent: t,
			children: [],
			alias: []
		});
	return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}

function Qa(e, t) {
	const n = [],
		o = new Map;

	function r(e, n, o) {
		const a = !o,
			l = function(e) {
				return {
					path: e.path,
					redirect: e.redirect,
					name: e.name,
					meta: e.meta || {},
					aliasOf: void 0,
					beforeEnter: e.beforeEnter,
					props: Xa(e),
					children: e.children || [],
					instances: {},
					leaveGuards: new Set,
					updateGuards: new Set,
					enterCallbacks: {},
					components: "components" in e ? e.components || null : e.component && {
						default: e.component
					}
				}
			}(e);
		l.aliasOf = o && o.record;
		const c = Ga(t, e),
			u = [l];
		if ("alias" in e) {
			const t = "string" == typeof e.alias ? [e.alias] : e.alias;
			for (const e of t) u.push(ra({}, l, {
				components: o ? o.record.components : l.components,
				path: e,
				aliasOf: o ? o.record : l
			}))
		}
		let d, f;
		for (const t of u) {
			const {
				path: u
			} = t;
			if (n && "/" !== u[0]) {
				const e = n.record.path,
					o = "/" === e[e.length - 1] ? "" : "/";
				t.path = n.record.path + (u && o + u)
			}
			if (d = $a(t, n, c), o ? o.alias.push(d) : (f = f || d, f !== d && f.alias.push(d), a && e.name && !Ya(d) &&
					i(e.name)), l.children) {
				const e = l.children;
				for (let t = 0; t < e.length; t++) r(e[t], d, o && o.children[t])
			}
			o = o || d, (d.record.components && Object.keys(d.record.components).length || d.record.name || d.record
				.redirect) && s(d)
		}
		return f ? () => {
			i(f)
		} : sa
	}

	function i(e) {
		if (Pa(e)) {
			const t = o.get(e);
			t && (o.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(i), t.alias.forEach(i))
		} else {
			const t = n.indexOf(e);
			t > -1 && (n.splice(t, 1), e.record.name && o.delete(e.record.name), e.children.forEach(i), e.alias.forEach(
				i))
		}
	}

	function s(e) {
		let t = 0;
		for (; t < n.length && za(e, n[t]) >= 0 && (e.record.path !== n[t].record.path || !Ka(e, n[t]));) t++;
		n.splice(t, 0, e), e.record.name && !Ya(e) && o.set(e.record.name, e)
	}
	return t = Ga({
		strict: !1,
		end: !0,
		sensitive: !1
	}, t), e.forEach((e => r(e))), {
		addRoute: r,
		resolve: function(e, t) {
			let r, i, s, a = {};
			if ("name" in e && e.name) {
				if (r = o.get(e.name), !r) throw Fa(1, {
					location: e
				});
				s = r.record.name, a = ra(Ua(t.params, r.keys.filter((e => !e.optional)).map((e => e.name))), e
					.params && Ua(e.params, r.keys.map((e => e.name)))), i = r.stringify(a)
			} else if ("path" in e) i = e.path, r = n.find((e => e.re.test(i))), r && (a = r.parse(i), s = r
				.record.name);
			else {
				if (r = t.name ? o.get(t.name) : n.find((e => e.re.test(t.path))), !r) throw Fa(1, {
					location: e,
					currentLocation: t
				});
				s = r.record.name, a = ra({}, t.params, e.params), i = r.stringify(a)
			}
			const l = [];
			let c = r;
			for (; c;) l.unshift(c.record), c = c.parent;
			return {
				name: s,
				path: i,
				params: a,
				matched: l,
				meta: Ja(l)
			}
		},
		removeRoute: i,
		getRoutes: function() {
			return n
		},
		getRecordMatcher: function(e) {
			return o.get(e)
		}
	}
}

function Ua(e, t) {
	const n = {};
	for (const o of t) o in e && (n[o] = e[o]);
	return n
}

function Xa(e) {
	const t = {},
		n = e.props || !1;
	if ("component" in e) t.default = n;
	else
		for (const o in e.components) t[o] = "boolean" == typeof n ? n : n[o];
	return t
}

function Ya(e) {
	for (; e;) {
		if (e.record.aliasOf) return !0;
		e = e.parent
	}
	return !1
}

function Ja(e) {
	return e.reduce(((e, t) => ra(e, t.meta)), {})
}

function Ga(e, t) {
	const n = {};
	for (const o in e) n[o] = o in t ? t[o] : e[o];
	return n
}

function Ka(e, t) {
	return t.children.some((t => t === e || Ka(e, t)))
}
const Za = /#/g,
	el = /&/g,
	tl = /\//g,
	nl = /=/g,
	ol = /\?/g,
	rl = /\+/g,
	il = /%5B/g,
	sl = /%5D/g,
	al = /%5E/g,
	ll = /%60/g,
	cl = /%7B/g,
	ul = /%7C/g,
	dl = /%7D/g,
	fl = /%20/g;

function pl(e) {
	return encodeURI("" + e).replace(ul, "|").replace(il, "[").replace(sl, "]")
}

function hl(e) {
	return pl(e).replace(rl, "%2B").replace(fl, "+").replace(Za, "%23").replace(el, "%26").replace(ll, "`").replace(cl,
		"{").replace(dl, "}").replace(al, "^")
}

function ml(e) {
	return null == e ? "" : function(e) {
		return pl(e).replace(Za, "%23").replace(ol, "%3F")
	}(e).replace(tl, "%2F")
}

function gl(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {}
	return "" + e
}

function vl(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e).split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(rl, " "),
			r = e.indexOf("="),
			i = gl(r < 0 ? e : e.slice(0, r)),
			s = r < 0 ? null : gl(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			aa(e) || (e = t[i] = [e]), e.push(s)
		} else t[i] = s
	}
	return t
}

function bl(e) {
	let t = "";
	for (let n in e) {
		const o = e[n];
		if (n = hl(n).replace(nl, "%3D"), null == o) {
			void 0 !== o && (t += (t.length ? "&" : "") + n);
			continue
		}(aa(o) ? o.map((e => e && hl(e))) : [o && hl(o)]).forEach((e => {
			void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e))
		}))
	}
	return t
}

function yl(e) {
	const t = {};
	for (const n in e) {
		const o = e[n];
		void 0 !== o && (t[n] = aa(o) ? o.map((e => null == e ? null : "" + e)) : null == o ? o : "" + o)
	}
	return t
}
const _l = Symbol(""),
	wl = Symbol(""),
	xl = Symbol(""),
	Tl = Symbol(""),
	Sl = Symbol("");

function El() {
	let e = [];
	return {
		add: function(t) {
			return e.push(t), () => {
				const n = e.indexOf(t);
				n > -1 && e.splice(n, 1)
			}
		},
		list: () => e,
		reset: function() {
			e = []
		}
	}
}

function kl(e, t, n, o, r) {
	const i = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
	return () => new Promise(((s, a) => {
		const l = e => {
				var l;
				!1 === e ? a(Fa(4, {
						from: n,
						to: t
					})) : e instanceof Error ? a(e) : "string" == typeof(l = e) || l && "object" ==
					typeof l ? a(Fa(2, {
						from: t,
						to: e
					})) : (i && o.enterCallbacks[r] === i && "function" == typeof e && i.push(e), s())
			},
			c = e.call(o && o.instances[r], t, n, l);
		let u = Promise.resolve(c);
		e.length < 3 && (u = u.then(l)), u.catch((e => a(e)))
	}))
}

function Al(e, t, n, o) {
	const r = [];
	for (const s of e)
		for (const e in s.components) {
			let a = s.components[e];
			if ("beforeRouteEnter" === t || s.instances[e])
				if ("object" == typeof(i = a) || "displayName" in i || "props" in i || "__vccOpts" in i) {
					const i = (a.__vccOpts || a)[t];
					i && r.push(kl(i, n, o, s, e))
				} else {
					let i = a();
					r.push((() => i.then((r => {
						if (!r) return Promise.reject(new Error(
							`Couldn't resolve component "${e}" at "${s.path}"`));
						const i = (a = r).__esModule || "Module" === a[Symbol.toStringTag] ? r
							.default : r;
						var a;
						s.components[e] = i;
						const l = (i.__vccOpts || i)[t];
						return l && kl(l, n, o, s, e)()
					}))))
				}
		}
	var i;
	return r
}

function Cl(e) {
	const t = xo(xl),
		n = xo(Tl),
		o = Ui((() => t.resolve(Mn(e.to)))),
		r = Ui((() => {
			const {
				matched: e
			} = o.value, {
				length: t
			} = e, r = e[t - 1], i = n.matched;
			if (!r || !i.length) return -1;
			const s = i.findIndex(da.bind(null, r));
			if (s > -1) return s;
			const a = Pl(e[t - 2]);
			return t > 1 && Pl(r) === a && i[i.length - 1].path !== a ? i.findIndex(da.bind(null, e[t - 2])) : s
		})),
		i = Ui((() => r.value > -1 && function(e, t) {
			for (const n in t) {
				const o = t[n],
					r = e[n];
				if ("string" == typeof o) {
					if (o !== r) return !1
				} else if (!aa(r) || r.length !== o.length || o.some(((e, t) => e !== r[t]))) return !1
			}
			return !0
		}(n.params, o.value.params))),
		s = Ui((() => r.value > -1 && r.value === n.matched.length - 1 && fa(n.params, o.value.params)));
	return {
		route: o,
		href: Ui((() => o.value.href)),
		isActive: i,
		isExactActive: s,
		navigate: function(n = {}) {
			return function(e) {
				if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
				if (e.defaultPrevented) return;
				if (void 0 !== e.button && 0 !== e.button) return;
				if (e.currentTarget && e.currentTarget.getAttribute) {
					const t = e.currentTarget.getAttribute("target");
					if (/\b_blank\b/i.test(t)) return
				}
				e.preventDefault && e.preventDefault();
				return !0
			}(n) ? t[Mn(e.replace) ? "replace" : "push"](Mn(e.to)).catch(sa) : Promise.resolve()
		}
	}
}
const Bl = Do({
	name: "RouterLink",
	compatConfig: {
		MODE: 3
	},
	props: {
		to: {
			type: [String, Object],
			required: !0
		},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {
			type: String,
			default: "page"
		}
	},
	useLink: Cl,
	setup(e, {
		slots: t
	}) {
		const n = gn(Cl(e)),
			{
				options: o
			} = xo(xl),
			r = Ui((() => ({
				[Ll(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
				[Ll(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n
					.isExactActive
			})));
		return () => {
			const o = t.default && t.default(n);
			return e.custom ? o : Xi("a", {
				"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
				href: n.href,
				onClick: n.navigate,
				class: r.value
			}, o)
		}
	}
});

function Pl(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Ll = (e, t, n) => null != e ? e : null != t ? t : n;

function Ol(e, t) {
	if (!e) return null;
	const n = e(t);
	return 1 === n.length ? n[0] : n
}
const Il = Do({
	name: "RouterView",
	inheritAttrs: !1,
	props: {
		name: {
			type: String,
			default: "default"
		},
		route: Object
	},
	compatConfig: {
		MODE: 3
	},
	setup(e, {
		attrs: t,
		slots: n
	}) {
		const o = xo(Sl),
			r = Ui((() => e.route || o.value)),
			i = xo(wl, 0),
			s = Ui((() => {
				let e = Mn(i);
				const {
					matched: t
				} = r.value;
				let n;
				for (;
					(n = t[e]) && !n.components;) e++;
				return e
			})),
			a = Ui((() => r.value.matched[s.value]));
		wo(wl, Ui((() => s.value + 1))), wo(_l, a), wo(Sl, r);
		const l = Pn();
		return Eo((() => [l.value, a.value, e.name]), (([e, t, n], [o, r, i]) => {
			t && (t.instances[n] = e, r && r !== t && e && e === o && (t.leaveGuards.size || (t
					.leaveGuards = r.leaveGuards), t.updateGuards.size || (t.updateGuards =
					r.updateGuards))), !e || !t || r && da(t, r) && o || (t.enterCallbacks[n] || [])
				.forEach((t => t(e)))
		}), {
			flush: "post"
		}), () => {
			const o = r.value,
				i = e.name,
				s = a.value,
				c = s && s.components[i];
			if (!c) return Ol(n.default, {
				Component: c,
				route: o
			});
			const u = s.props[i],
				d = u ? !0 === u ? o.params : "function" == typeof u ? u(o) : u : null,
				f = Xi(c, ra({}, d, t, {
					onVnodeUnmounted: e => {
						e.component.isUnmounted && (s.instances[i] = null)
					},
					ref: l
				}));
			return Ol(n.default, {
				Component: f,
				route: o
			}) || f
		}
	}
});

function Ml(e) {
	const t = Qa(e.routes, e),
		n = e.parseQuery || vl,
		o = e.stringifyQuery || bl,
		r = e.history,
		i = El(),
		s = El(),
		a = El(),
		l = Ln(La);
	let c = La;
	oa && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
	const u = ia.bind(null, (e => "" + e)),
		d = ia.bind(null, ml),
		f = ia.bind(null, gl);

	function p(e, i) {
		if (i = ra({}, i || l.value), "string" == typeof e) {
			const o = ca(n, e, i.path),
				s = t.resolve({
					path: o.path
				}, i),
				a = r.createHref(o.fullPath);
			return ra(o, s, {
				params: f(s.params),
				hash: gl(o.hash),
				redirectedFrom: void 0,
				href: a
			})
		}
		let s;
		if ("path" in e) s = ra({}, e, {
			path: ca(n, e.path, i.path).path
		});
		else {
			const t = ra({}, e.params);
			for (const e in t) null == t[e] && delete t[e];
			s = ra({}, e, {
				params: d(e.params)
			}), i.params = d(i.params)
		}
		const a = t.resolve(s, i),
			c = e.hash || "";
		a.params = u(f(a.params));
		const p = function(e, t) {
			const n = t.query ? e(t.query) : "";
			return t.path + (n && "?") + n + (t.hash || "")
		}(o, ra({}, e, {
			hash: (h = c, pl(h).replace(cl, "{").replace(dl, "}").replace(al, "^")),
			path: a.path
		}));
		var h;
		const m = r.createHref(p);
		return ra({
			fullPath: p,
			hash: c,
			query: o === bl ? yl(e.query) : e.query || {}
		}, a, {
			redirectedFrom: void 0,
			href: m
		})
	}

	function h(e) {
		return "string" == typeof e ? ca(n, e, l.value.path) : ra({}, e)
	}

	function m(e, t) {
		if (c !== e) return Fa(8, {
			from: t,
			to: e
		})
	}

	function g(e) {
		return b(e)
	}

	function v(e) {
		const t = e.matched[e.matched.length - 1];
		if (t && t.redirect) {
			const {
				redirect: n
			} = t;
			let o = "function" == typeof n ? n(e) : n;
			return "string" == typeof o && (o = o.includes("?") || o.includes("#") ? o = h(o) : {
				path: o
			}, o.params = {}), ra({
				query: e.query,
				hash: e.hash,
				params: "path" in o ? {} : e.params
			}, o)
		}
	}

	function b(e, t) {
		const n = c = p(e),
			r = l.value,
			i = e.state,
			s = e.force,
			a = !0 === e.replace,
			u = v(n);
		if (u) return b(ra(h(u), {
			state: "object" == typeof u ? ra({}, i, u.state) : i,
			force: s,
			replace: a
		}), t || n);
		const d = n;
		let f;
		return d.redirectedFrom = t, !s && function(e, t, n) {
			const o = t.matched.length - 1,
				r = n.matched.length - 1;
			return o > -1 && o === r && da(t.matched[o], n.matched[r]) && fa(t.params, n.params) && e(t.query) ===
				e(n.query) && t.hash === n.hash
		}(o, r, n) && (f = Fa(16, {
			to: d,
			from: r
		}), P(r, r, !0, !1)), (f ? Promise.resolve(f) : _(d, r)).catch((e => ja(e) ? ja(e, 2) ? e : B(e) : C(e, d,
			r))).then((e => {
			if (e) {
				if (ja(e, 2)) return b(ra({
					replace: a
				}, h(e.to), {
					state: "object" == typeof e.to ? ra({}, i, e.to.state) : i,
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
		const [o, r, a] = function(e, t) {
			const n = [],
				o = [],
				r = [],
				i = Math.max(t.matched.length, e.matched.length);
			for (let s = 0; s < i; s++) {
				const i = t.matched[s];
				i && (e.matched.find((e => da(e, i))) ? o.push(i) : n.push(i));
				const a = e.matched[s];
				a && (t.matched.find((e => da(e, a))) || r.push(a))
			}
			return [n, o, r]
		}(e, t);
		n = Al(o.reverse(), "beforeRouteLeave", e, t);
		for (const i of o) i.leaveGuards.forEach((o => {
			n.push(kl(o, e, t))
		}));
		const l = y.bind(null, e, t);
		return n.push(l), Fl(n).then((() => {
			n = [];
			for (const o of i.list()) n.push(kl(o, e, t));
			return n.push(l), Fl(n)
		})).then((() => {
			n = Al(r, "beforeRouteUpdate", e, t);
			for (const o of r) o.updateGuards.forEach((o => {
				n.push(kl(o, e, t))
			}));
			return n.push(l), Fl(n)
		})).then((() => {
			n = [];
			for (const o of e.matched)
				if (o.beforeEnter && !t.matched.includes(o))
					if (aa(o.beforeEnter))
						for (const r of o.beforeEnter) n.push(kl(r, e, t));
					else n.push(kl(o.beforeEnter, e, t));
			return n.push(l), Fl(n)
		})).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = Al(a, "beforeRouteEnter", e, t), n
			.push(l), Fl(n)))).then((() => {
			n = [];
			for (const o of s.list()) n.push(kl(o, e, t));
			return n.push(l), Fl(n)
		})).catch((e => ja(e, 8) ? e : Promise.reject(e)))
	}

	function w(e, t, n) {
		for (const o of a.list()) o(e, t, n)
	}

	function x(e, t, n, o, i) {
		const s = m(e, t);
		if (s) return s;
		const a = t === La,
			c = oa ? history.state : {};
		n && (o || a ? r.replace(e.fullPath, ra({
			scroll: a && c && c.scroll
		}, i)) : r.push(e.fullPath, i)), l.value = e, P(e, t, n, a), B()
	}
	let T;

	function S() {
		T || (T = r.listen(((e, t, n) => {
			if (!M.listening) return;
			const o = p(e),
				i = v(o);
			if (i) return void b(ra(i, {
				replace: !0
			}), o).catch(sa);
			c = o;
			const s = l.value;
			var a, u;
			oa && (a = Sa(s.fullPath, n.delta), u = xa(), Ea.set(a, u)), _(o, s).catch((e => ja(e, 12) ?
					e : ja(e, 2) ? (b(e.to, o).then((e => {
						ja(e, 20) && !n.delta && n.type === ma.pop && r.go(-1, !1)
					})).catch(sa), Promise.reject()) : (n.delta && r.go(-n.delta, !1), C(e, o, s))))
				.then((e => {
					(e = e || x(o, s, !1)) && (n.delta && !ja(e, 8) ? r.go(-n.delta, !1) : n
						.type === ma.pop && ja(e, 20) && r.go(-1, !1)), w(o, s, e)
				})).catch(sa)
		})))
	}
	let E, k = El(),
		A = El();

	function C(e, t, n) {
		B(e);
		const o = A.list();
		return o.length ? o.forEach((o => o(e, t, n))) : console.error(e), Promise.reject(e)
	}

	function B(e) {
		return E || (E = !e, S(), k.list().forEach((([t, n]) => e ? n(e) : t())), k.reset()), e
	}

	function P(t, n, o, r) {
		const {
			scrollBehavior: i
		} = e;
		if (!oa || !i) return Promise.resolve();
		const s = !o && function(e) {
			const t = Ea.get(e);
			return Ea.delete(e), t
		}(Sa(t.fullPath, 0)) || (r || !o) && history.state && history.state.scroll || null;
		return Zn().then((() => i(t, n, s))).then((e => e && Ta(e))).catch((e => C(e, t, n)))
	}
	const L = e => r.go(e);
	let O;
	const I = new Set,
		M = {
			currentRoute: l,
			listening: !0,
			addRoute: function(e, n) {
				let o, r;
				return Pa(e) ? (o = t.getRecordMatcher(e), r = n) : r = e, t.addRoute(r, o)
			},
			removeRoute: function(e) {
				const n = t.getRecordMatcher(e);
				n && t.removeRoute(n)
			},
			hasRoute: function(e) {
				return !!t.getRecordMatcher(e)
			},
			getRoutes: function() {
				return t.getRoutes().map((e => e.record))
			},
			resolve: p,
			options: e,
			push: g,
			replace: function(e) {
				return g(ra(h(e), {
					replace: !0
				}))
			},
			go: L,
			back: () => L(-1),
			forward: () => L(1),
			beforeEach: i.add,
			beforeResolve: s.add,
			afterEach: a.add,
			onError: A.add,
			isReady: function() {
				return E && l.value !== La ? Promise.resolve() : new Promise(((e, t) => {
					k.add([e, t])
				}))
			},
			install(e) {
				e.component("RouterLink", Bl), e.component("RouterView", Il), e.config.globalProperties.$router = this,
					Object.defineProperty(e.config.globalProperties, "$route", {
						enumerable: !0,
						get: () => Mn(l)
					}), oa && !O && l.value === La && (O = !0, g(r.location).catch((e => {})));
				const t = {};
				for (const o in La) t[o] = Ui((() => l.value[o]));
				e.provide(xl, this), e.provide(Tl, gn(t)), e.provide(Sl, l);
				const n = e.unmount;
				I.add(e), e.unmount = function() {
					I.delete(e), I.size < 1 && (c = La, T && T(), T = null, l.value = La, O = !1, E = !1), n()
				}
			}
		};
	return M
}

function Fl(e) {
	return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}

function jl() {
	return xo(Tl)
}
const Nl = Re((() => "undefined" != typeof __uniConfig && __uniConfig.locales && !!Object.keys(__uniConfig.locales)
	.length));
let Rl;

function Dl(e) {
	return na(e, ee) ? Hl().f(e, function() {
		const e = mf(),
			t = __uniConfig.locales;
		return t[e] || t[__uniConfig.fallbackLocale] || t.en || {}
	}(), ee) : e
}

function ql(e, t) {
	if (1 === t.length) {
		if (e) {
			const n = e => P(e) && na(e, ee),
				o = t[0];
			let r = [];
			if (k(e) && (r = e.filter((e => n(e[o])))).length) return r;
			const i = e[t[0]];
			if (n(i)) return e
		}
		return
	}
	const n = t.shift();
	return ql(e && e[n], t)
}

function zl(e, t) {
	const n = ql(e, t);
	if (!n) return !1;
	const o = t[t.length - 1];
	if (k(n)) n.forEach((e => zl(e, [o])));
	else {
		let e = n[o];
		Object.defineProperty(n, o, {
			get: () => Dl(e),
			set(t) {
				e = t
			}
		})
	}
	return !0
}

function Hl() {
	if (!Rl) {
		let e;
		if (e = window.localStorage && localStorage[Z] || __uniConfig.locale || navigator.language, Rl = ta(e), Nl()) {
			const t = Object.keys(__uniConfig.locales || {});
			t.length && t.forEach((e => Rl.add(e, __uniConfig.locales[e]))), Rl.setLocale(e)
		}
	}
	return Rl
}

function Wl(e, t, n) {
	return t.reduce(((t, o, r) => (t[e + o] = n[r], t)), {})
}
const Vl = Re((() => {
		const e = "uni.async.",
			t = ["error"];
		Hl().add(Us, Wl(e, t, ["The connection timed out, click the screen to try again."]), !1), Hl().add(Ys,
				Wl(e, t, [
				"Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."]), !1),
			Hl().add(Xs, Wl(e, t, ["La connexion a expiré, cliquez sur l'écran pour réessayer."]), !1), Hl()
			.add($s, Wl(e, t, ["连接服务器超时，点击屏幕重试"]), !1), Hl().add(Qs, Wl(e, t, ["連接服務器超時，點擊屏幕重試"]), !1)
	})),
	$l = Re((() => {
		const e = "uni.showToast.",
			t = ["unpaired"];
		Hl().add(Us, Wl(e, t, ["Please note showToast must be paired with hideToast"]), !1), Hl().add(Ys, Wl(e,
			t, ["Tenga en cuenta que showToast debe estar emparejado con hideToast"]), !1), Hl().add(Xs, Wl(
			e, t, ["Veuillez noter que showToast doit être associé à hideToast"]), !1), Hl().add($s, Wl(e,
			t, ["请注意 showToast 与 hideToast 必须配对使用"]), !1), Hl().add(Qs, Wl(e, t, [
			"請注意 showToast 與 hideToast 必須配對使用"
		]), !1)
	})),
	Ql = Re((() => {
		const e = "uni.showLoading.",
			t = ["unpaired"];
		Hl().add(Us, Wl(e, t, ["Please note showLoading must be paired with hideLoading"]), !1), Hl().add(Ys,
				Wl(e, t, ["Tenga en cuenta que showLoading debe estar emparejado con hideLoading"]), !1), Hl()
			.add(Xs, Wl(e, t, ["Veuillez noter que showLoading doit être associé à hideLoading"]), !1), Hl()
			.add($s, Wl(e, t, ["请注意 showLoading 与 hideLoading 必须配对使用"]), !1), Hl().add(Qs, Wl(e, t, [
				"請注意 showLoading 與 hideLoading 必須配對使用"
			]), !1)
	})),
	Ul = Re((() => {
		const e = "uni.chooseFile.",
			t = ["notUserActivation"];
		Hl().add(Us, Wl(e, t, ["File chooser dialog can only be shown with a user activation"]), !1), Hl().add(
			Ys, Wl(e, t, [
				"El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario"
			]), !1), Hl().add(Xs, Wl(e, t, [
			"La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur"
		]), !1), Hl().add($s, Wl(e, t, ["文件选择器对话框只能在用户激活时显示"]), !1), Hl().add(Qs, Wl(e, t, [
			"文件選擇器對話框只能在用戶激活時顯示"
		]), !1)
	})),
	Xl = Re((() => {
		const e = "uni.video.",
			t = ["danmu", "volume"];
		Hl().add(Us, Wl(e, t, ["Danmu", "Volume"]), !1), Hl().add(Ys, Wl(e, t, ["Danmu", "Volumen"]), !1), Hl()
			.add(Xs, Wl(e, t, ["Danmu", "Le Volume"]), !1), Hl().add($s, Wl(e, t, ["弹幕", "音量"]), !1), Hl().add(
				Qs, Wl(e, t, ["彈幕", "音量"]), !1)
	}));

function Yl(e) {
	const t = new ot;
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
const Jl = "invokeViewApi",
	Gl = "invokeServiceApi";
let Kl = 1;
const Zl = Object.create(null);

function ec(e, t) {
	return e + "." + t
}

function tc(e, t, n) {
	t = ec(e, t), Zl[t] || (Zl[t] = n)
}

function nc({
	id: e,
	name: t,
	args: n
}, o) {
	t = ec(o, t);
	const r = t => {
			e && Uv.publishHandler(Jl + "." + e, t)
		},
		i = Zl[t];
	i ? i(n, r) : r({})
}
const oc = x(Yl("service"), {
		invokeServiceMethod: (e, t, n) => {
			const {
				subscribe: o,
				publishHandler: r
			} = Uv, i = n ? Kl++ : 0;
			n && o(Gl + "." + i, n, !0), r(Gl, {
				id: i,
				name: e,
				args: t
			})
		}
	}),
	rc = We(!0);
let ic;

function sc() {
	ic && (clearTimeout(ic), ic = null)
}
let ac = 0,
	lc = 0;

function cc(e) {
	if (sc(), 1 !== e.touches.length) return;
	const {
		pageX: t,
		pageY: n
	} = e.touches[0];
	ac = t, lc = n, ic = setTimeout((function() {
		const t = new CustomEvent("longpress", {
			bubbles: !0,
			cancelable: !0,
			target: e.target,
			currentTarget: e.currentTarget
		});
		t.touches = e.touches, t.changedTouches = e.changedTouches, e.target.dispatchEvent(t)
	}), 350)
}

function uc(e) {
	if (!ic) return;
	if (1 !== e.touches.length) return sc();
	const {
		pageX: t,
		pageY: n
	} = e.touches[0];
	return Math.abs(t - ac) > 10 || Math.abs(n - lc) > 10 ? sc() : void 0
}

function dc(e, t) {
	const n = Number(e);
	return isNaN(n) ? t : n
}

function fc() {
	const e = __uniConfig.globalStyle || {},
		t = dc(e.rpxCalcMaxDeviceWidth, 960),
		n = dc(e.rpxCalcBaseDeviceWidth, 375);

	function o() {
		let e = function() {
			const e = /^Apple/.test(navigator.vendor) && "number" == typeof window.orientation,
				t = e && 90 === Math.abs(window.orientation);
			var n = e ? Math[t ? "max" : "min"](screen.width, screen.height) : screen.width;
			return Math.min(window.innerWidth, document.documentElement.clientWidth, n) || n
		}();
		e = e <= t ? e : n, document.documentElement.style.fontSize = e / 23.4375 + "px"
	}
	o(), document.addEventListener("DOMContentLoaded", o), window.addEventListener("load", o), window.addEventListener(
		"resize", o)
}

function pc() {
	fc(), qe(), window.addEventListener("touchstart", cc, rc), window.addEventListener("touchmove", uc, rc), window
		.addEventListener("touchend", sc, rc), window.addEventListener("touchcancel", sc, rc)
}
var hc, mc, gc = ["top", "left", "right", "bottom"],
	vc = {};

function bc() {
	return mc = "CSS" in window && "function" == typeof CSS.supports ? CSS.supports("top: env(safe-area-inset-top)") ?
		"env" : CSS.supports("top: constant(safe-area-inset-top)") ? "constant" : "" : ""
}

function yc() {
	if (mc = "string" == typeof mc ? mc : bc()) {
		var e = [],
			t = !1;
		try {
			var n = Object.defineProperty({}, "passive", {
				get: function() {
					t = {
						passive: !0
					}
				}
			});
			window.addEventListener("test", null, n)
		} catch (a) {}
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
		}), gc.forEach((function(e) {
			s(o, e)
		})), document.body.appendChild(o), i(), hc = !0
	} else gc.forEach((function(e) {
		vc[e] = 0
	}));

	function r(e, t) {
		var n = e.style;
		Object.keys(t).forEach((function(e) {
			var o = t[e];
			n[e] = o
		}))
	}

	function i(t) {
		t ? e.push(t) : e.forEach((function(e) {
			e()
		}))
	}

	function s(e, n) {
		var o = document.createElement("div"),
			s = document.createElement("div"),
			a = document.createElement("div"),
			l = document.createElement("div"),
			c = {
				position: "absolute",
				width: "100px",
				height: "200px",
				boxSizing: "border-box",
				overflow: "hidden",
				paddingBottom: mc + "(safe-area-inset-" + n + ")"
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
		}), o.appendChild(a), s.appendChild(l), e.appendChild(o), e.appendChild(s), i((function() {
			o.scrollTop = s.scrollTop = 1e4;
			var e = o.scrollTop,
				r = s.scrollTop;

			function i() {
				this.scrollTop !== (this === o ? e : r) && (o.scrollTop = s.scrollTop = 1e4, e = o
					.scrollTop, r = s.scrollTop,
					function(e) {
						wc.length || setTimeout((function() {
							var e = {};
							wc.forEach((function(t) {
								e[t] = vc[t]
							})), wc.length = 0, xc.forEach((function(t) {
								t(e)
							}))
						}), 0);
						wc.push(e)
					}(n))
			}
			o.addEventListener("scroll", i, t), s.addEventListener("scroll", i, t)
		}));
		var u = getComputedStyle(o);
		Object.defineProperty(vc, n, {
			configurable: !0,
			get: function() {
				return parseFloat(u.paddingBottom)
			}
		})
	}
}

function _c(e) {
	return hc || yc(), vc[e]
}
var wc = [];
var xc = [];
var Tc = {
	get support() {
		return 0 != ("string" == typeof mc ? mc : bc()).length
	},
	get top() {
		return _c("top")
	},
	get left() {
		return _c("left")
	},
	get right() {
		return _c("right")
	},
	get bottom() {
		return _c("bottom")
	},
	onChange: function(e) {
		bc() && (hc || yc(), "function" == typeof e && xc.push(e))
	},
	offChange: function(e) {
		var t = xc.indexOf(e);
		t >= 0 && xc.splice(t, 1)
	}
};
const Sc = js((() => {}), ["prevent"]);

function Ec(e, t) {
	return parseInt((e.getPropertyValue(t).match(/\d+/) || ["0"])[0])
}

function kc() {
	const e = Ec(document.documentElement.style, "--window-top");
	return e ? e + Tc.top : 0
}

function Ac() {
	const e = document.documentElement.style,
		t = kc(),
		n = Ec(e, "--window-bottom"),
		o = Ec(e, "--window-left"),
		r = Ec(e, "--window-right"),
		i = Ec(e, "--top-window-height");
	return {
		top: t,
		bottom: n ? n + Tc.bottom : 0,
		left: o ? o + Tc.left : 0,
		right: r ? r + Tc.right : 0,
		topWindowHeight: i || 0
	}
}

function Cc(e) {
	const t = document.documentElement.style;
	Object.keys(e).forEach((n => {
		t.setProperty(n, e[n])
	}))
}

function Bc(e) {
	return Cc(e)
}

function Pc(e) {
	return Symbol(e)
}

function Lc(e) {
	return -1 !== (e += "").indexOf("rpx") || -1 !== e.indexOf("upx")
}

function Oc(e, t = !1) {
	if (t) return function(e) {
		if (!Lc(e)) return e;
		return e.replace(/(\d+(\.\d+)?)[ru]px/g, ((e, t) => Rd(parseFloat(t)) + "px"))
	}(e);
	if (P(e)) {
		const t = parseInt(e) || 0;
		return Lc(e) ? Rd(t) : t
	}
	return e
}
const Ic =
	"M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z",
	Mc =
	"M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";

function Fc(e, t = "#000", n = 27) {
	return ki("svg", {
		width: n,
		height: n,
		viewBox: "0 0 32 32"
	}, [ki("path", {
		d: e,
		fill: t
	}, null, 8, ["d", "fill"])], 8, ["width", "height"])
}

function jc() {
	{
		const {
			$pageInstance: e
		} = Ri();
		return e && e.proxy.$page.id
	}
}

function Nc(e) {
	const t = Le(e);
	if (t.$page) return t.$page.id;
	if (t.$) {
		const {
			$pageInstance: e
		} = t.$;
		return e && e.proxy.$page.id
	}
}

function Rc() {
	const e = vm(),
		t = e.length;
	if (t) return e[t - 1]
}

function Dc() {
	const e = Rc();
	if (e) return e.$page.meta
}

function qc() {
	const e = Dc();
	return e ? e.id : -1
}

function zc() {
	const e = Rc();
	if (e) return e.$vm
}
const Hc = ["navigationBar", "pullToRefresh"];

function Wc(e, t) {
	const n = JSON.parse(JSON.stringify(__uniConfig.globalStyle || {})),
		o = x({
			id: t
		}, n, e);
	Hc.forEach((t => {
		o[t] = x({}, n[t], e[t])
	}));
	const {
		navigationBar: r
	} = o;
	return r.titleText && r.titleImage && (r.titleText = ""), o
}

function Vc(e, t, n) {
	if (P(e)) n = t, t = e, e = zc();
	else if ("number" == typeof e) {
		const t = vm().find((t => t.$page.id === e));
		e = t ? t.$vm : zc()
	}
	if (!e) return;
	const o = e.$[t];
	return o && ((e, t) => {
		let n;
		for (let o = 0; o < e.length; o++) n = e[o](t);
		return n
	})(o, n)
}

function $c(e) {
	e.preventDefault()
}
let Qc, Uc = 0;

function Xc({
	onPageScroll: e,
	onReachBottom: t,
	onReachBottomDistance: n
}) {
	let o = !1,
		r = !1,
		i = !0;
	const s = () => {
		function s() {
			if ((() => {
					const {
						scrollHeight: e
					} = document.documentElement, t = window.innerHeight, o = window.scrollY, i = o > 0 && e >
						t && o + t + n >= e, s = Math.abs(e - Uc) > n;
					return !i || r && !s ? (!i && r && (r = !1), !1) : (Uc = e, r = !0, !0)
				})()) return t && t(), i = !1, setTimeout((function() {
				i = !0
			}), 350), !0
		}
		e && e(window.pageYOffset), t && i && (s() || (Qc = setTimeout(s, 300))), o = !1
	};
	return function() {
		clearTimeout(Qc), o || requestAnimationFrame(s), o = !0
	}
}

function Yc(e, t) {
	if (0 === t.indexOf("/")) return t;
	if (0 === t.indexOf("./")) return Yc(e, t.slice(2));
	const n = t.split("/"),
		o = n.length;
	let r = 0;
	for (; r < o && ".." === n[r]; r++);
	n.splice(0, r), t = n.join("/");
	const i = e.length > 0 ? e.split("/") : [];
	return i.splice(i.length - r - 1, r + 1), Fe(i.concat(n).join("/"))
}

function Jc(e, t = !1) {
	return t ? __uniRoutes.find((t => t.path === e || t.alias === e)) : __uniRoutes.find((t => t.path === e))
}
class Gc {
	constructor(e) {
		this.$bindClass = !1, this.$bindStyle = !1, this.$vm = e, this.$el = function(e, t = !1) {
			const {
				vnode: n
			} = e;
			if (Ie(n.el)) return t ? n.el ? [n.el] : [] : n.el;
			const {
				subTree: o
			} = e;
			if (16 & o.shapeFlag) {
				const e = o.children.filter((e => e.el && Ie(e.el)));
				if (e.length > 0) return t ? e.map((e => e.el)) : e[0].el
			}
			return t ? n.el ? [n.el] : [] : n.el
		}(e.$), this.$el.getAttribute && (this.$bindClass = !!this.$el.getAttribute("class"), this
			.$bindStyle = !!this.$el.getAttribute("style"))
	}
	selectComponent(e) {
		if (!this.$el || !e) return;
		const t = tu(this.$el.querySelector(e));
		return t ? Kc(t, !1) : void 0
	}
	selectAllComponents(e) {
		if (!this.$el || !e) return [];
		const t = [],
			n = this.$el.querySelectorAll(e);
		for (let o = 0; o < n.length; o++) {
			const e = tu(n[o]);
			e && t.push(Kc(e, !1))
		}
		return t
	}
	forceUpdate(e) {
		"class" === e ? this.$bindClass ? (this.$el.__wxsClassChanged = !0, this.$vm.$forceUpdate()) : this
			.updateWxsClass() : "style" === e && (this.$bindStyle ? (this.$el.__wxsStyleChanged = !0, this.$vm
				.$forceUpdate()) : this.updateWxsStyle())
	}
	updateWxsClass() {
		const {
			__wxsAddClass: e
		} = this.$el;
		e.length && (this.$el.className = e.join(" "))
	}
	updateWxsStyle() {
		const {
			__wxsStyle: e
		} = this.$el;
		e && this.$el.setAttribute("style", function(e) {
			let t = "";
			if (!e || P(e)) return t;
			for (const n in e) {
				const o = e[n],
					r = n.startsWith("--") ? n : W(n);
				(P(o) || "number" == typeof o) && (t += `${r}:${o};`)
			}
			return t
		}(e))
	}
	setStyle(e) {
		return this.$el && e ? (P(e) && (e = c(e)), j(e) && (this.$el.__wxsStyle = e, this.forceUpdate("style")),
			this) : this
	}
	addClass(e) {
		if (!this.$el || !e) return this;
		const t = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
		return -1 === t.indexOf(e) && (t.push(e), this.forceUpdate("class")), this
	}
	removeClass(e) {
		if (!this.$el || !e) return this;
		const {
			__wxsAddClass: t
		} = this.$el;
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
		B(n) ? n(JSON.parse(JSON.stringify(t))) : this.$vm.ownerId && Uv.publishHandler("onWxsInvokeCallMethod", {
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

function Kc(e, t = !0) {
	if (t && e && (e = Oe(e.$)), e && e.$el) return e.$el.__wxsComponentDescriptor || (e.$el.__wxsComponentDescriptor =
		new Gc(e)), e.$el.__wxsComponentDescriptor
}

function Zc(e, t) {
	return Kc(e, t)
}

function eu(e, t, n, o = !0) {
	if (t) {
		e.__instance || (e.__instance = !0, Object.defineProperty(e, "instance", {
			get: () => Zc(n.proxy, !1)
		}));
		const r = function(e, t, n = !0) {
			if (!t) return !1;
			if (n && e.length < 2) return !1;
			const o = Oe(t);
			if (!o) return !1;
			const r = o.$.type;
			return !(!r.$wxs && !r.$renderjs) && o
		}(t, n, o);
		if (r) return [e, Zc(r, !1)]
	}
}

function tu(e) {
	if (e) return e.__vueParentComponent && e.__vueParentComponent.proxy
}

function nu(e) {
	for (; e && 0 !== e.tagName.indexOf("UNI-");) e = e.parentElement;
	return e
}

function ou(e, t = !1) {
	const {
		type: n,
		timeStamp: o,
		target: r,
		currentTarget: i
	} = e, s = {
		type: n,
		timeStamp: o,
		target: Ve(t ? r : nu(r)),
		detail: {},
		currentTarget: Ve(i)
	};
	return e._stopped && (s._stopped = !0), e.type.startsWith("touch") && (s.touches = e.touches, s.changedTouches = e
			.changedTouches),
		function(e, t) {
			x(e, {
				preventDefault: () => t.preventDefault(),
				stopPropagation: () => t.stopPropagation()
			})
		}(s, e), s
}

function ru(e, t) {
	return {
		force: 1,
		identifier: 0,
		clientX: e.clientX,
		clientY: e.clientY - t,
		pageX: e.pageX,
		pageY: e.pageY - t
	}
}

function iu(e, t) {
	const n = [];
	for (let o = 0; o < e.length; o++) {
		const {
			identifier: r,
			pageX: i,
			pageY: s,
			clientX: a,
			clientY: l,
			force: c
		} = e[o];
		n.push({
			identifier: r,
			pageX: i,
			pageY: s - t,
			clientX: a,
			clientY: l - t,
			force: c || 0
		})
	}
	return n
}
const su = Object.defineProperty({
	__proto__: null,
	$nne: function(e, t, n) {
		const {
			currentTarget: o
		} = e;
		if (!(e instanceof Event && o instanceof HTMLElement)) return [e];
		const r = 0 !== o.tagName.indexOf("UNI-");
		if (r) return eu(e, t, n, !1) || [e];
		const i = ou(e, r);
		if ("click" === e.type) ! function(e, t) {
			const {
				x: n,
				y: o
			} = t, r = kc();
			e.detail = {
				x: n,
				y: o - r
			}, e.touches = e.changedTouches = [ru(t, r)]
		}(i, e);
		else if ((e => 0 === e.type.indexOf("mouse") || ["contextmenu"].includes(e.type))(e)) ! function(e,
			t) {
			const n = kc();
			e.pageX = t.pageX, e.pageY = t.pageY - n, e.clientX = t.clientX, e.clientY = t.clientY - n,
				e.touches = e.changedTouches = [ru(t, n)]
		}(i, e);
		else if ((e => "undefined" != typeof TouchEvent && e instanceof TouchEvent || 0 === e.type.indexOf(
				"touch"))(e)) {
			const t = kc();
			i.touches = iu(e.touches, t), i.changedTouches = iu(e.changedTouches, t)
		}
		return eu(i, t, n) || [i]
	},
	createNativeEvent: ou
}, Symbol.toStringTag, {
	value: "Module"
});

function au(e) {
	! function(e) {
		const t = e.globalProperties;
		x(t, su), t.$gcd = Zc
	}(e._context.config)
}
let lu = 1;

function cu() {
	return qc() + "." + Jl
}
const uu = x(Yl("view"), {
	invokeOnCallback: (e, t) => Xv.emit("api." + e, t),
	invokeViewMethod: (e, t, n, o) => {
		const {
			subscribe: r,
			publishHandler: i
		} = Xv, s = o ? lu++ : 0;
		o && r(Jl + "." + s, o, !0), i(cu(), {
			id: s,
			name: e,
			args: t
		}, n)
	},
	invokeViewMethodKeepAlive: (e, t, n, o) => {
		const {
			subscribe: r,
			unsubscribe: i,
			publishHandler: s
		} = Xv, a = lu++, l = Jl + "." + a;
		return r(l, n), s(cu(), {
			id: a,
			name: e,
			args: t
		}, o), () => {
			i(l)
		}
	}
});

function du(e) {
	Vc(Rc(), he, e), Xv.invokeOnCallback("onWindowResize", e)
}

function fu(e) {
	const t = Rc();
	Vc(zm(), oe, e), Vc(t, oe)
}

function pu() {
	Vc(zm(), re), Vc(Rc(), re)
}
const hu = [ge, be];

function mu() {
	hu.forEach((e => Xv.subscribe(e, function(e) {
		return (t, n) => {
			Vc(parseInt(n), e, t)
		}
	}(e))))
}

function gu() {
	! function() {
		const {
			on: e
		} = Xv;
		e(he, du), e(Ce, fu), e(Be, pu)
	}(), mu()
}

function vu() {
	if (this.$route) {
		const e = this.$route.meta;
		return e.eventChannel || (e.eventChannel = new Je(this.$page.id)), e.eventChannel
	}
}

function bu(e) {
	e._context.config.globalProperties.getOpenerEventChannel = vu
}

function yu() {
	return {
		path: "",
		query: {},
		scene: 1001,
		referrerInfo: {
			appId: "",
			extraData: {}
		}
	}
}

function _u(e) {
	return /^-?\d+[ur]px$/i.test(e) ? e.replace(/(^-?\d+)[ur]px$/i, ((e, t) => `${Rd(parseFloat(t))}px`)) :
		/^-?[\d\.]+$/.test(e) ? `${e}px` : e || ""
}

function wu(e) {
	const t = e.animation;
	if (!t || !t.actions || !t.actions.length) return;
	let n = 0;
	const o = t.actions,
		r = t.actions.length;

	function i() {
		const t = o[n],
			s = t.option.transition,
			a = function(e) {
				const t = ["matrix", "matrix3d", "scale", "scale3d", "rotate3d", "skew", "translate", "translate3d"],
					n = ["scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY",
						"translateX", "translateY", "translateZ"
					],
					o = ["opacity", "background-color"],
					r = ["width", "height", "left", "right", "top", "bottom"],
					i = e.animates,
					s = e.option,
					a = s.transition,
					l = {},
					c = [];
				return i.forEach((e => {
					let i = e.type,
						s = [...e.args];
					if (t.concat(n).includes(i)) i.startsWith("rotate") || i.startsWith("skew") ? s = s.map(
							(e => parseFloat(e) + "deg")) : i.startsWith("translate") && (s = s.map(_u)), n
						.indexOf(i) >= 0 && (s.length = 1), c.push(`${i}(${s.join(",")})`);
					else if (o.concat(r).includes(s[0])) {
						i = s[0];
						const e = s[1];
						l[i] = r.includes(i) ? _u(e) : e
					}
				})), l.transform = l.webkitTransform = c.join(" "), l.transition = l.webkitTransition = Object.keys(
					l).map((e =>
					`${function(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`)).replace("webkit","-webkit")}(e)} ${a.duration}ms ${a.timingFunction} ${a.delay}ms`
					)).join(","), l.transformOrigin = l.webkitTransformOrigin = s.transformOrigin, l
			}(t);
		Object.keys(a).forEach((t => {
			e.$el.style[t] = a[t]
		})), n += 1, n < r && setTimeout(i, s.duration + s.delay)
	}
	setTimeout((() => {
		i()
	}), 0)
}
const xu = {
		props: ["animation"],
		watch: {
			animation: {
				deep: !0,
				handler() {
					wu(this)
				}
			}
		},
		mounted() {
			wu(this)
		}
	},
	Tu = e => {
		e.__reserved = !0;
		const {
			props: t,
			mixins: n
		} = e;
		return t && t.animation || (n || (e.mixins = [])).push(xu), Su(e)
	},
	Su = e => (e.__reserved = !0, e.compatConfig = {
		MODE: 3
	}, Do(e)),
	Eu = {
		hoverClass: {
			type: String,
			default: "none"
		},
		hoverStopPropagation: {
			type: Boolean,
			default: !1
		},
		hoverStartTime: {
			type: [Number, String],
			default: 50
		},
		hoverStayTime: {
			type: [Number, String],
			default: 400
		}
	};

function ku(e) {
	const t = Pn(!1);
	let n, o, r = !1;

	function i() {
		requestAnimationFrame((() => {
			clearTimeout(o), o = setTimeout((() => {
				t.value = !1
			}), parseInt(e.hoverStayTime))
		}))
	}

	function s(o) {
		o._hoverPropagationStopped || e.hoverClass && "none" !== e.hoverClass && !e.disabled && (e
			.hoverStopPropagation && (o._hoverPropagationStopped = !0), r = !0, n = setTimeout((() => {
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
		hovering: t,
		binding: {
			onTouchstartPassive: function(e) {
				e.touches.length > 1 || s(e)
			},
			onMousedown: function(e) {
				r || (s(e), window.addEventListener("mouseup", l))
			},
			onTouchend: function() {
				a()
			},
			onMouseup: function() {
				r && l()
			},
			onTouchcancel: function() {
				r = !1, t.value = !1, clearTimeout(n)
			}
		}
	}
}

function Au(e, t) {
	return P(t) && (t = [t]), t.reduce(((t, n) => (e[n] && (t[n] = !0), t)), Object.create(null))
}

function Cu(e) {
	return e.__wwe = !0, e
}

function Bu(e, t) {
	return (n, o, r) => {
		e.value && t(n, function(e, t, n, o) {
			const r = Ve(n);
			return {
				type: o.type || e,
				timeStamp: t.timeStamp || 0,
				target: r,
				currentTarget: r,
				detail: o
			}
		}(n, o, e.value, r || {}))
	}
}
const Pu = Pc("uf"),
	Lu = Pc("ul");

function Ou(e, t, n) {
	const o = jc();
	n && !e || j(t) && Object.keys(t).forEach((r => {
		n ? 0 !== r.indexOf("@") && 0 !== r.indexOf("uni-") && Uv.on(`uni-${r}-${o}-${e}`, t[r]) : 0 === r
			.indexOf("uni-") ? Uv.on(r, t[r]) : e && Uv.on(`uni-${r}-${o}-${e}`, t[r])
	}))
}

function Iu(e, t, n) {
	const o = jc();
	n && !e || j(t) && Object.keys(t).forEach((r => {
		n ? 0 !== r.indexOf("@") && 0 !== r.indexOf("uni-") && Uv.off(`uni-${r}-${o}-${e}`, t[r]) : 0 === r
			.indexOf("uni-") ? Uv.off(r, t[r]) : e && Uv.off(`uni-${r}-${o}-${e}`, t[r])
	}))
}
const Mu = Tu({
	name: "Button",
	props: {
		id: {
			type: String,
			default: ""
		},
		hoverClass: {
			type: String,
			default: "button-hover"
		},
		hoverStartTime: {
			type: [Number, String],
			default: 20
		},
		hoverStayTime: {
			type: [Number, String],
			default: 70
		},
		hoverStopPropagation: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: [Boolean, String],
			default: !1
		},
		formType: {
			type: String,
			default: ""
		},
		openType: {
			type: String,
			default: ""
		},
		loading: {
			type: [Boolean, String],
			default: !1
		},
		plain: {
			type: [Boolean, String],
			default: !1
		}
	},
	setup(e, {
		slots: t
	}) {
		const n = Pn(null),
			o = xo(Pu, !1),
			{
				hovering: r,
				binding: i
			} = ku(e);
		Hl();
		const s = Cu(((t, r) => {
				if (e.disabled) return t.stopImmediatePropagation();
				r && n.value.click();
				const i = e.formType;
				if (i) {
					if (!o) return;
					"submit" === i ? o.submit(t) : "reset" === i && o.reset(t)
				} else;
			})),
			a = xo(Lu, !1);
		return a && (a.addHandler(s), cr((() => {
				a.removeHandler(s)
			}))),
			function(e, t) {
				Ou(e.id, t), Eo((() => e.id), ((e, n) => {
					Iu(n, t, !0), Ou(e, t, !0)
				})), ur((() => {
					Iu(e.id, t)
				}))
			}(e, {
				"label-click": s
			}), () => {
				const o = e.hoverClass,
					a = Au(e, "disabled"),
					l = Au(e, "loading"),
					c = Au(e, "plain"),
					u = o && "none" !== o;
				return ki("uni-button", Ii({
					ref: n,
					onClick: s,
					class: u && r.value ? o : ""
				}, u && i, a, l, c), [t.default && t.default()], 16, ["onClick"])
			}
	}
});

function Fu(e) {
	return e.$el
}

function ju(e) {
	const {
		base: t
	} = __uniConfig.router;
	return 0 === Fe(e).indexOf(t) ? Fe(e) : t + e
}

function Nu(e) {
	const {
		base: t,
		assets: n
	} = __uniConfig.router;
	if ("./" === t && (0 === e.indexOf("./static/") || n && 0 === e.indexOf("./" + n + "/")) && (e = e.slice(1)), 0 ===
		e.indexOf("/")) {
		if (0 !== e.indexOf("//")) return ju(e.slice(1));
		e = "https:" + e
	}
	if (te.test(e) || ne.test(e) || 0 === e.indexOf("blob:")) return e;
	const o = vm();
	return o.length ? ju(Yc(o[o.length - 1].$page.route, e).slice(1)) : e
}
const Ru = navigator.userAgent,
	Du = /android/i.test(Ru),
	qu = /iphone|ipad|ipod/i.test(Ru),
	zu = Ru.match(/Windows NT ([\d|\d.\d]*)/i),
	Hu = /Macintosh|Mac/i.test(Ru),
	Wu = /Linux|X11/i.test(Ru),
	Vu = Hu && navigator.maxTouchPoints > 0;

function $u() {
	return /^Apple/.test(navigator.vendor) && "number" == typeof window.orientation
}

function Qu(e) {
	return e && 90 === Math.abs(window.orientation)
}

function Uu(e, t) {
	return e ? Math[t ? "max" : "min"](screen.width, screen.height) : screen.width
}

function Xu(e) {
	return Math.min(window.innerWidth, document.documentElement.clientWidth, e) || e
}

function Yu(e, t, n, o) {
	Xv.invokeViewMethod("video." + e, {
		videoId: e,
		type: n,
		data: o
	}, t)
}

function Ju(e, t) {
	const n = {},
		{
			top: o,
			topWindowHeight: r
		} = Ac();
	if (t.id && (n.id = e.id), t.dataset && (n.dataset = ze(e)), t.rect || t.size) {
		const i = e.getBoundingClientRect();
		t.rect && (n.left = i.left, n.right = i.right, n.top = i.top - o - r, n.bottom = i.bottom - o - r), t.size && (n
			.width = i.width, n.height = i.height)
	}
	if (k(t.properties) && t.properties.forEach((e => {
			e = e.replace(/-([a-z])/g, (function(e, t) {
				return t.toUpperCase()
			}))
		})), t.scrollOffset)
		if ("UNI-SCROLL-VIEW" === e.tagName) {
			const t = e.children[0].children[0];
			n.scrollLeft = t.scrollLeft, n.scrollTop = t.scrollTop, n.scrollHeight = t.scrollHeight, n.scrollWidth = t
				.scrollWidth
		} else n.scrollLeft = 0, n.scrollTop = 0, n.scrollHeight = 0, n.scrollWidth = 0;
	if (k(t.computedStyle)) {
		const o = getComputedStyle(e);
		t.computedStyle.forEach((e => {
			n[e] = o[e]
		}))
	}
	return t.context && (n.contextInfo = function(e) {
		return e.__uniContextInfo
	}(e)), n
}

function Gu(e, t) {
	return (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e
		.webkitMatchesSelector || function(e) {
			const t = this.parentElement.querySelectorAll(e);
			let n = t.length;
			for (; --n >= 0 && t.item(n) !== this;);
			return n > -1
		}).call(e, t)
}

function Ku(e, t, n) {
	const o = [];
	t.forEach((({
		component: t,
		selector: n,
		single: r,
		fields: i
	}) => {
		null === t ? o.push(function(e) {
			const t = {};
			if (e.id && (t.id = ""), e.dataset && (t.dataset = {}), e.rect && (t.left = 0, t.right =
					0, t.top = 0, t.bottom = 0), e.size && (t.width = document.documentElement
					.clientWidth, t.height = document.documentElement.clientHeight), e
				.scrollOffset) {
				const e = document.documentElement,
					n = document.body;
				t.scrollLeft = e.scrollLeft || n.scrollLeft || 0, t.scrollTop = e.scrollTop || n
					.scrollTop || 0, t.scrollHeight = e.scrollHeight || n.scrollHeight || 0, t
					.scrollWidth = e.scrollWidth || n.scrollWidth || 0
			}
			return t
		}(i)) : o.push(function(e, t, n, o, r) {
			const i = function(e, t) {
					return e ? e.$el : t.$el
				}(t, e),
				s = i.parentElement;
			if (!s) return o ? null : [];
			const {
				nodeType: a
			} = i, l = 3 === a || 8 === a;
			if (o) {
				const e = l ? s.querySelector(n) : Gu(i, n) ? i : i.querySelector(n);
				return e ? Ju(e, r) : null
			} {
				let e = [];
				const t = (l ? s : i).querySelectorAll(n);
				return t && t.length && [].forEach.call(t, (t => {
					e.push(Ju(t, r))
				})), !l && Gu(i, n) && e.unshift(Ju(i, r)), e
			}
		}(e, t, n, r, i))
	})), n(o)
}
const Zu = ["original", "compressed"],
	ed = ["album", "camera"],
	td = ["GET", "OPTIONS", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT", "PATCH"];

function nd(e, t) {
	return e && -1 !== t.indexOf(e) ? e : t[0]
}

function od(e, t) {
	return !k(e) || 0 === e.length || e.find((e => -1 === t.indexOf(e))) ? t : e
}

function rd(e) {
	return function() {
		try {
			return e.apply(e, arguments)
		} catch (t) {
			console.error(t)
		}
	}
}
let id = 1;
const sd = {};

function ad(e, t, n) {
	if ("number" == typeof e) {
		const o = sd[e];
		if (o) return o.keepAlive || delete sd[e], o.callback(t, n)
	}
	return t
}
const ld = "success",
	cd = "fail",
	ud = "complete";

function dd(e, t = {}, {
	beforeAll: n,
	beforeSuccess: o
} = {}) {
	j(t) || (t = {});
	const {
		success: r,
		fail: i,
		complete: s
	} = function(e) {
		const t = {};
		for (const n in e) {
			const o = e[n];
			B(o) && (t[n] = rd(o), delete e[n])
		}
		return t
	}(t), a = B(r), l = B(i), c = B(s), u = id++;
	return function(e, t, n, o = !1) {
		sd[e] = {
			name: t,
			keepAlive: o,
			callback: n
		}
	}(u, e, (u => {
		(u = u || {}).errMsg = function(e, t) {
				return e && -1 !== e.indexOf(":fail") ? t + e.substring(e.indexOf(":fail")) : t + ":ok"
			}(u.errMsg, e), B(n) && n(u), u.errMsg === e + ":ok" ? (B(o) && o(u, t), a && r(u)) : l && i(u),
			c && s(u)
	})), u
}
const fd = "success",
	pd = "fail",
	hd = "complete",
	md = {},
	gd = {};

function vd(e, t) {
	return function(n) {
		return e(n, t) || n
	}
}

function bd(e, t, n) {
	let o = !1;
	for (let r = 0; r < e.length; r++) {
		const i = e[r];
		if (o) o = Promise.resolve(vd(i, n));
		else {
			const e = i(t, n);
			if (I(e) && (o = Promise.resolve(e)), !1 === e) return {
				then() {},
				catch () {}
			}
		}
	}
	return o || {
		then: e => e(t),
		catch () {}
	}
}

function yd(e, t = {}) {
	return [fd, pd, hd].forEach((n => {
		const o = e[n];
		if (!k(o)) return;
		const r = t[n];
		t[n] = function(e) {
			bd(o, e, t).then((e => B(r) && r(e) || e))
		}
	})), t
}

function _d(e, t) {
	const n = [];
	k(md.returnValue) && n.push(...md.returnValue);
	const o = gd[e];
	return o && k(o.returnValue) && n.push(...o.returnValue), n.forEach((e => {
		t = e(t) || t
	})), t
}

function wd(e) {
	const t = Object.create(null);
	Object.keys(md).forEach((e => {
		"returnValue" !== e && (t[e] = md[e].slice())
	}));
	const n = gd[e];
	return n && Object.keys(n).forEach((e => {
		"returnValue" !== e && (t[e] = (t[e] || []).concat(n[e]))
	})), t
}

function xd(e, t, n, o) {
	const r = wd(e);
	if (r && Object.keys(r).length) {
		if (k(r.invoke)) {
			return bd(r.invoke, n).then((n => t(yd(wd(e), n), ...o)))
		}
		return t(yd(r, n), ...o)
	}
	return t(n, ...o)
}

function Td(e, t) {
	return (n = {}, ...o) => function(e) {
		return !(!j(e) || ![ld, cd, ud].find((t => B(e[t]))))
	}(n) ? _d(e, xd(e, t, n, o)) : _d(e, new Promise(((r, i) => {
		xd(e, t, x(n, {
			success: r,
			fail: i
		}), o)
	})))
}

function Sd(e, t, n, o) {
	return ad(e, x({
		errMsg: t + ":fail" + (n ? " " + n : "")
	}, o))
}

function Ed(e, t, n, o) {
	if (o && o.beforeInvoke) {
		const e = o.beforeInvoke(t);
		if (P(e)) return e
	}
	const r = function(e, t) {
		const n = e[0];
		if (!t || !j(t.formatArgs) && j(n)) return;
		const o = t.formatArgs,
			r = Object.keys(o);
		for (let i = 0; i < r.length; i++) {
			const t = r[i],
				s = o[t];
			if (B(s)) {
				const o = s(e[0][t], n);
				if (P(o)) return o
			} else E(n, t) || (n[t] = s)
		}
	}(t, o);
	if (r) return r
}

function kd(e, t, n, o) {
	return n => {
		const r = dd(e, n, o),
			i = Ed(0, [n], 0, o);
		return i ? Sd(r, e, i) : t(n, {
			resolve: t => function(e, t, n) {
				return ad(e, x(n || {}, {
					errMsg: t + ":ok"
				}))
			}(r, e, t),
			reject: (t, n) => Sd(r, e, function(e) {
				return !e || P(e) ? e : e.stack ? (console.error(e.message + K + e.stack), e
					.message) : e
			}(t), n)
		})
	}
}

function Ad(e, t, n, o) {
	return Td(e, kd(e, t, 0, o))
}

function Cd(e, t, n, o) {
	return function(e, t, n, o) {
		return (...e) => {
			const n = Ed(0, e, 0, o);
			if (n) throw new Error(n);
			return t.apply(null, e)
		}
	}(0, t, 0, o)
}

function Bd(e, t, n, o) {
	return Td(e, function(e, t, n, o) {
		return kd(e, t, 0, o)
	}(e, t, 0, o))
}
let Pd = !1,
	Ld = 0,
	Od = 0,
	Id = 960,
	Md = 375,
	Fd = 750;

function jd() {
	const {
		platform: e,
		pixelRatio: t,
		windowWidth: n
	} = function() {
		const e = $u(),
			t = Xu(Uu(e, Qu(e)));
		return {
			platform: qu ? "ios" : "other",
			pixelRatio: window.devicePixelRatio,
			windowWidth: t
		}
	}();
	Ld = n, Od = t, Pd = "ios" === e
}

function Nd(e, t) {
	const n = Number(e);
	return isNaN(n) ? t : n
}
const Rd = Cd(0, ((e, t) => {
	if (0 === Ld && (jd(), function() {
			const e = __uniConfig.globalStyle || {};
			Id = Nd(e.rpxCalcMaxDeviceWidth, 960), Md = Nd(e.rpxCalcBaseDeviceWidth, 375), Fd = Nd(e
				.rpxCalcBaseDeviceWidth, 750)
		}()), 0 === (e = Number(e))) return 0;
	let n = t || Ld;
	n = e === Fd || n <= Id ? n : Md;
	let o = e / 750 * n;
	return o < 0 && (o = -o), o = Math.floor(o + 1e-4), 0 === o && (o = 1 !== Od && Pd ? .5 : 1), e < 0 ? -
		o : o
}));

function Dd(e, t) {
	Object.keys(t).forEach((n => {
		B(t[n]) && (e[n] = function(e, t) {
			const n = t ? e ? e.concat(t) : k(t) ? t : [t] : e;
			return n ? function(e) {
				const t = [];
				for (let n = 0; n < e.length; n++) - 1 === t.indexOf(e[n]) && t.push(e[n]);
				return t
			}(n) : n
		}(e[n], t[n]))
	}))
}
const qd = Cd(0, ((e, t) => {
		P(e) && j(t) ? Dd(gd[e] || (gd[e] = {}), t) : j(e) && Dd(md, e)
	})),
	zd = new ot,
	Hd = Cd(0, ((e, t) => (zd.on(e, t), () => zd.off(e, t)))),
	Wd = Cd(0, ((e, t) => {
		e ? (k(e) || (e = [e]), e.forEach((e => zd.off(e, t)))) : zd.e = {}
	})),
	Vd = Cd(0, ((e, ...t) => {
		zd.emit(e, ...t)
	})),
	$d = [.5, .8, 1, 1.25, 1.5, 2];
class Qd {
	constructor(e, t) {
		this.id = e, this.pageId = t
	}
	play() {
		Yu(this.id, this.pageId, "play")
	}
	pause() {
		Yu(this.id, this.pageId, "pause")
	}
	stop() {
		Yu(this.id, this.pageId, "stop")
	}
	seek(e) {
		Yu(this.id, this.pageId, "seek", {
			position: e
		})
	}
	sendDanmu(e) {
		Yu(this.id, this.pageId, "sendDanmu", e)
	}
	playbackRate(e) {
		~$d.indexOf(e) || (e = 1), Yu(this.id, this.pageId, "playbackRate", {
			rate: e
		})
	}
	requestFullScreen(e = {}) {
		Yu(this.id, this.pageId, "requestFullScreen", e)
	}
	exitFullScreen() {
		Yu(this.id, this.pageId, "exitFullScreen")
	}
	showStatusBar() {
		Yu(this.id, this.pageId, "showStatusBar")
	}
	hideStatusBar() {
		Yu(this.id, this.pageId, "hideStatusBar")
	}
}
const Ud = Cd(0, ((e, t) => new Qd(e, Nc(t || zc())))),
	Xd = (e, t, n, o) => {
		! function(e, t, n, o, r) {
			Xv.invokeViewMethod("map." + e, {
				type: n,
				data: o
			}, t, r)
		}(e, t, n, o, (e => {
			o && ((e, t) => {
				const n = t.errMsg || "";
				new RegExp("\\:\\s*fail").test(n) ? e.fail && e.fail(t) : e.success && e.success(t), e
					.complete && e.complete(t)
			})(o, e)
		}))
	};
const Yd = {
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

function Jd(e) {
	var t = null;
	if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e = e || "#000000"))) {
		return [parseInt(t[1].slice(0, 2), 16), parseInt(t[1].slice(2, 4), 16), parseInt(t[1].slice(4), 16), 255]
	}
	if (null != (t = /^#([0-9|A-F|a-f]{3})$/.exec(e))) {
		let e = t[1].slice(0, 1),
			n = t[1].slice(1, 2),
			o = t[1].slice(2, 3);
		return e = parseInt(e + e, 16), n = parseInt(n + n, 16), o = parseInt(o + o, 16), [e, n, o, 255]
	}
	if (null != (t = /^rgb\((.+)\)$/.exec(e))) return t[1].split(",").map((function(e) {
		return Math.min(255, parseInt(e.trim()))
	})).concat(255);
	if (null != (t = /^rgba\((.+)\)$/.exec(e))) return t[1].split(",").map((function(e, t) {
		return 3 === t ? Math.floor(255 * parseFloat(e.trim())) : Math.min(255, parseInt(e.trim()))
	}));
	var n = e.toLowerCase();
	if (E(Yd, n)) {
		t = /^#([0-9|A-F|a-f]{6,8})$/.exec(Yd[n]);
		const e = parseInt(t[1].slice(0, 2), 16),
			o = parseInt(t[1].slice(2, 4), 16),
			r = parseInt(t[1].slice(4, 6), 16);
		let i = parseInt(t[1].slice(6, 8), 16);
		return i = i >= 0 ? i : 255, [e, o, r, i]
	}
	return console.error("unsupported color:" + e), [0, 0, 0, 255]
}
class Gd {
	constructor(e, t) {
		this.type = e, this.data = t, this.colorStop = []
	}
	addColorStop(e, t) {
		this.colorStop.push([e, Jd(t)])
	}
}
class Kd {
	constructor(e, t) {
		this.type = "pattern", this.data = e, this.colorStop = t
	}
}
class Zd {
	constructor(e) {
		this.width = e
	}
}
const ef = {
		thresholds: [0],
		initialRatio: 0,
		observeAll: !1
	},
	tf = ["top", "right", "bottom", "left"];
let nf = 1;

function of(e = {}) {
	return tf.map((t => `${Number(e[t])||0}px`)).join(" ")
}
class rf {
	constructor(e, t) {
		this._pageId = Nc(e), this._component = e, this._options = x({}, ef, t)
	}
	relativeTo(e, t) {
		return this._options.relativeToSelector = e, this._options.rootMargin = of(t), this
	}
	relativeToViewport(e) {
		return this._options.relativeToSelector = void 0, this._options.rootMargin = of(e), this
	}
	observe(e, t) {
		B(t) && (this._options.selector = e, this._reqId = nf++, function({
			reqId: e,
			component: t,
			options: n,
			callback: o
		}, r) {
			const i = Fu(t);
			(i.__io || (i.__io = {}))[e] = function(e, t, n) {
				! function() {
					if ("object" != typeof window) return;
					if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window &&
						"intersectionRatio" in window.IntersectionObserverEntry.prototype) return void(
						"isIntersecting" in window.IntersectionObserverEntry.prototype || Object
						.defineProperty(window.IntersectionObserverEntry.prototype,
							"isIntersecting", {
								get: function() {
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
					var t = function(t) {
							for (var n = window.document, o = e(n); o;) o = e(n = o.ownerDocument);
							return n
						}(),
						n = [],
						o = null,
						r = null;

					function i(e) {
						this.time = e.time, this.target = e.target, this.rootBounds = h(e.rootBounds), this
							.boundingClientRect = h(e.boundingClientRect), this.intersectionRect = h(e
								.intersectionRect || p()), this.isIntersecting = !!e.intersectionRect;
						var t = this.boundingClientRect,
							n = t.width * t.height,
							o = this.intersectionRect,
							r = o.width * o.height;
						this.intersectionRatio = n ? Number((r / n).toFixed(4)) : this.isIntersecting ? 1 :
							0
					}

					function s(e, t) {
						var n = t || {};
						if ("function" != typeof e) throw new Error("callback must be a function");
						if (n.root && 1 != n.root.nodeType && 9 != n.root.nodeType) throw new Error(
							"root must be a Document or Element");
						this._checkForIntersections = l(this._checkForIntersections.bind(this), this
								.THROTTLE_TIMEOUT), this._callback = e, this._observationTargets = [], this
							._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(n
								.rootMargin), this.thresholds = this._initThresholds(n.threshold), this
							.root = n.root || null, this.rootMargin = this._rootMarginValues.map((function(
								e) {
								return e.value + e.unit
							})).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = []
					}

					function a() {
						return window.performance && performance.now && performance.now()
					}

					function l(e, t) {
						var n = null;
						return function() {
							n || (n = setTimeout((function() {
								e(), n = null
							}), t))
						}
					}

					function c(e, t, n, o) {
						"function" == typeof e.addEventListener ? e.addEventListener(t, n, o || !1) :
							"function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
					}

					function u(e, t, n, o) {
						"function" == typeof e.removeEventListener ? e.removeEventListener(t, n, o || !1) :
							"function" == typeof e.detatchEvent && e.detatchEvent("on" + t, n)
					}

					function d(e, t) {
						var n = Math.max(e.top, t.top),
							o = Math.min(e.bottom, t.bottom),
							r = Math.max(e.left, t.left),
							i = Math.min(e.right, t.right),
							s = i - r,
							a = o - n;
						return s >= 0 && a >= 0 && {
							top: n,
							bottom: o,
							left: r,
							right: i,
							width: s,
							height: a
						} || null
					}

					function f(e) {
						var t;
						try {
							t = e.getBoundingClientRect()
						} catch (n) {}
						return t ? (t.width && t.height || (t = {
							top: t.top,
							right: t.right,
							bottom: t.bottom,
							left: t.left,
							width: t.right - t.left,
							height: t.bottom - t.top
						}), t) : p()
					}

					function p() {
						return {
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							width: 0,
							height: 0
						}
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
						var n = t.top - e.top,
							o = t.left - e.left;
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
						return 9 == n.nodeType && n != t ? e(n) : (o && o.assignedSlot && (o = o
							.assignedSlot.parentNode), o && 11 == o.nodeType && o.host ? o.host : o)
					}

					function b(e) {
						return e && 9 === e.nodeType
					}
					s.prototype.THROTTLE_TIMEOUT = 100, s.prototype.POLL_INTERVAL = null, s.prototype
						.USE_MUTATION_OBSERVER = !0, s._setupCrossOriginUpdater = function() {
							return o || (o = function(e, t) {
								r = e && t ? m(e, t) : p(), n.forEach((function(e) {
									e._checkForIntersections()
								}))
							}), o
						}, s._resetCrossOriginUpdater = function() {
							o = null, r = null
						}, s.prototype.observe = function(e) {
							if (!this._observationTargets.some((function(t) {
									return t.element == e
								}))) {
								if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
								this._registerInstance(), this._observationTargets.push({
										element: e,
										entry: null
									}), this._monitorIntersections(e.ownerDocument), this
									._checkForIntersections()
							}
						}, s.prototype.unobserve = function(e) {
							this._observationTargets = this._observationTargets.filter((function(t) {
									return t.element != e
								})), this._unmonitorIntersections(e.ownerDocument), 0 == this
								._observationTargets.length && this._unregisterInstance()
						}, s.prototype.disconnect = function() {
							this._observationTargets = [], this._unmonitorAllIntersections(), this
								._unregisterInstance()
						}, s.prototype.takeRecords = function() {
							var e = this._queuedEntries.slice();
							return this._queuedEntries = [], e
						}, s.prototype._initThresholds = function(e) {
							var t = e || [0];
							return Array.isArray(t) || (t = [t]), t.sort().filter((function(e, t, n) {
								if ("number" != typeof e || isNaN(e) || e < 0 || e > 1)
								throw new Error(
										"threshold must be a number between 0 and 1 inclusively"
										);
								return e !== n[t - 1]
							}))
						}, s.prototype._parseRootMargin = function(e) {
							var t = (e || "0px").split(/\s+/).map((function(e) {
								var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
								if (!t) throw new Error(
									"rootMargin must be specified in pixels or percent");
								return {
									value: parseFloat(t[1]),
									unit: t[2]
								}
							}));
							return t[1] = t[1] || t[0], t[2] = t[2] || t[0], t[3] = t[3] || t[1], t
						}, s.prototype._monitorIntersections = function(n) {
							var o = n.defaultView;
							if (o && -1 == this._monitoringDocuments.indexOf(n)) {
								var r = this._checkForIntersections,
									i = null,
									s = null;
								this.POLL_INTERVAL ? i = o.setInterval(r, this.POLL_INTERVAL) : (c(o,
											"resize", r, !0), c(n, "scroll", r, !0), this
										.USE_MUTATION_OBSERVER && "MutationObserver" in o && (s = new o
											.MutationObserver(r)).observe(n, {
											attributes: !0,
											childList: !0,
											characterData: !0,
											subtree: !0
										})), this._monitoringDocuments.push(n), this._monitoringUnsubscribes
									.push((function() {
										var e = n.defaultView;
										e && (i && e.clearInterval(i), u(e, "resize", r, !0)), u(n,
											"scroll", r, !0), s && s.disconnect()
									}));
								var a = this.root && (this.root.ownerDocument || this.root) || t;
								if (n != a) {
									var l = e(n);
									l && this._monitorIntersections(l.ownerDocument)
								}
							}
						}, s.prototype._unmonitorIntersections = function(n) {
							var o = this._monitoringDocuments.indexOf(n);
							if (-1 != o) {
								var r = this.root && (this.root.ownerDocument || this.root) || t;
								if (!this._observationTargets.some((function(t) {
										var o = t.element.ownerDocument;
										if (o == n) return !0;
										for (; o && o != r;) {
											var i = e(o);
											if ((o = i && i.ownerDocument) == n) return !0
										}
										return !1
									}))) {
									var i = this._monitoringUnsubscribes[o];
									if (this._monitoringDocuments.splice(o, 1), this._monitoringUnsubscribes
										.splice(o, 1), i(), n != r) {
										var s = e(n);
										s && this._unmonitorIntersections(s.ownerDocument)
									}
								}
							}
						}, s.prototype._unmonitorAllIntersections = function() {
							var e = this._monitoringUnsubscribes.slice(0);
							this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
							for (var t = 0; t < e.length; t++) e[t]()
						}, s.prototype._checkForIntersections = function() {
							if (this.root || !o || r) {
								var e = this._rootIsInDom(),
									t = e ? this._getRootRect() : p();
								this._observationTargets.forEach((function(n) {
									var r = n.element,
										s = f(r),
										l = this._rootContainsTarget(r),
										c = n.entry,
										u = e && l && this._computeTargetAndRootIntersection(r,
											s, t),
										d = null;
									this._rootContainsTarget(r) ? o && !this.root || (d = t) :
										d = p();
									var h = n.entry = new i({
										time: a(),
										target: r,
										boundingClientRect: s,
										rootBounds: d,
										intersectionRect: u
									});
									c ? e && l ? this._hasCrossedThreshold(c, h) && this
										._queuedEntries.push(h) : c && c.isIntersecting && this
										._queuedEntries.push(h) : this._queuedEntries.push(h)
								}), this), this._queuedEntries.length && this._callback(this
									.takeRecords(), this)
							}
						}, s.prototype._computeTargetAndRootIntersection = function(e, n, i) {
							if ("none" != window.getComputedStyle(e).display) {
								for (var s = n, a = v(e), l = !1; !l && a;) {
									var c = null,
										u = 1 == a.nodeType ? window.getComputedStyle(a) : {};
									if ("none" == u.display) return null;
									if (a == this.root || 9 == a.nodeType)
										if (l = !0, a == this.root || a == t) o && !this.root ? !r || 0 == r
											.width && 0 == r.height ? (a = null, c = null, s = null) : c =
											r : c = i;
										else {
											var p = v(a),
												h = p && f(p),
												g = p && this._computeTargetAndRootIntersection(p, h, i);
											h && g ? (a = p, c = m(h, g)) : (a = null, s = null)
										}
									else {
										var b = a.ownerDocument;
										a != b.body && a != b.documentElement && "visible" != u.overflow &&
											(c = f(a))
									}
									if (c && (s = d(c, s)), !s) break;
									a = a && v(a)
								}
								return s
							}
						}, s.prototype._getRootRect = function() {
							var e;
							if (this.root && !b(this.root)) e = f(this.root);
							else {
								var n = b(this.root) ? this.root : t,
									o = n.documentElement,
									r = n.body;
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
						}, s.prototype._expandRectByRootMargin = function(e) {
							var t = this._rootMarginValues.map((function(t, n) {
									return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e
										.height) / 100
								})),
								n = {
									top: e.top - t[0],
									right: e.right + t[1],
									bottom: e.bottom + t[2],
									left: e.left - t[3]
								};
							return n.width = n.right - n.left, n.height = n.bottom - n.top, n
						}, s.prototype._hasCrossedThreshold = function(e, t) {
							var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
								o = t.isIntersecting ? t.intersectionRatio || 0 : -1;
							if (n !== o)
								for (var r = 0; r < this.thresholds.length; r++) {
									var i = this.thresholds[r];
									if (i == n || i == o || i < n != i < o) return !0
								}
						}, s.prototype._rootIsInDom = function() {
							return !this.root || g(t, this.root)
						}, s.prototype._rootContainsTarget = function(e) {
							var n = this.root && (this.root.ownerDocument || this.root) || t;
							return g(n, e) && (!this.root || n == e.ownerDocument)
						}, s.prototype._registerInstance = function() {
							n.indexOf(this) < 0 && n.push(this)
						}, s.prototype._unregisterInstance = function() {
							var e = n.indexOf(this); - 1 != e && n.splice(e, 1)
						}, window.IntersectionObserver = s, window.IntersectionObserverEntry = i
				}();
				const o = t.relativeToSelector ? e.querySelector(t.relativeToSelector) : null,
					r = new IntersectionObserver((e => {
						e.forEach((e => {
							n({
								intersectionRatio: ep(e),
								intersectionRect: Zf(e.intersectionRect),
								boundingClientRect: Zf(e.boundingClientRect),
								relativeRect: Zf(e.rootBounds),
								time: Date.now(),
								dataset: ze(e.target),
								id: e.target.id
							})
						}))
					}), {
						root: o,
						rootMargin: t.rootMargin,
						threshold: t.thresholds
					});
				if (t.observeAll) {
					r.USE_MUTATION_OBSERVER = !0;
					const n = e.querySelectorAll(t.selector);
					for (let e = 0; e < n.length; e++) r.observe(n[e])
				} else {
					r.USE_MUTATION_OBSERVER = !1;
					const n = e.querySelector(t.selector);
					n ? r.observe(n) : console.warn(
						`Node ${t.selector} is not found. Intersection observer will not trigger.`)
				}
				return r
			}(i, n, o)
		}({
			reqId: this._reqId,
			component: this._component,
			options: this._options,
			callback: t
		}, this._pageId))
	}
	disconnect() {
		this._reqId && function({
			reqId: e,
			component: t
		}, n) {
			const o = Fu(t),
				r = o.__io && o.__io[e];
			r && (r.disconnect(), delete o.__io[e])
		}({
			reqId: this._reqId,
			component: this._component
		}, this._pageId)
	}
}
const sf = Cd(0, ((e, t) => ((e = Le(e)) && !Nc(e) && (t = e, e = null), new rf(e || zc(), t))));
let af = 0,
	lf = {};

function cf(e, t, n, o) {
	const r = {
			options: o
		},
		i = o && ("success" in o || "fail" in o || "complete" in o);
	if (i) {
		const e = String(af++);
		r.callbackId = e, lf[e] = o
	}
	Xv.invokeViewMethod(`editor.${e}`, {
		type: n,
		data: r
	}, t, (({
		callbackId: e,
		data: t
	}) => {
		i && (! function(e, t) {
			e = e || {}, P(t) && (t = {
					errMsg: t
				}), /:ok$/.test(t.errMsg) ? B(e.success) && e.success(t) : B(e.fail) && e.fail(t),
				B(e.complete) && e.complete(t)
		}(lf[e], t), delete lf[e])
	}))
}
const uf = {
	canvas: class {
		constructor(e, t) {
			this.id = e, this.pageId = t, this.actions = [], this.path = [], this.subpath = [], this
				.drawingState = [], this.state = {
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
			this.actions = [], this.path = [],
				function(e, t, n, o, r) {
					Xv.invokeViewMethod(`canvas.${e}`, {
						type: n,
						data: o
					}, t, (e => {
						r && r(e)
					}))
				}(this.id, this.pageId, "actionsChanged", {
					actions: n,
					reserve: e
				}, t)
		}
		createLinearGradient(e, t, n, o) {
			return new Gd("linear", [e, t, n, o])
		}
		createCircularGradient(e, t, n) {
			return new Gd("radial", [e, t, n])
		}
		createPattern(e, t) {
			if (void 0 === t) console.error(
				"Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present."
				);
			else {
				if (!(["repeat", "repeat-x", "repeat-y", "no-repeat"].indexOf(t) < 0)) return new Kd(e, t);
				console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" +
					t + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.")
			}
		}
		measureText(e) {
			let t = 0;
			return t = function(e, t) {
				const n = document.createElement("canvas").getContext("2d");
				return n.font = t, n.measureText(e).width || 0
			}(e, this.state.font), new Zd(t)
		}
		save() {
			this.actions.push({
				method: "save",
				data: []
			}), this.drawingState.push(this.state)
		}
		restore() {
			this.actions.push({
				method: "restore",
				data: []
			}), this.state = this.drawingState.pop() || {
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
			this.path = [], this.subpath = [], this.path.push({
				method: "beginPath",
				data: []
			})
		}
		moveTo(e, t) {
			this.path.push({
				method: "moveTo",
				data: [e, t]
			}), this.subpath = [
				[e, t]
			]
		}
		lineTo(e, t) {
			0 === this.path.length && 0 === this.subpath.length ? this.path.push({
				method: "moveTo",
				data: [e, t]
			}) : this.path.push({
				method: "lineTo",
				data: [e, t]
			}), this.subpath.push([e, t])
		}
		quadraticCurveTo(e, t, n, o) {
			this.path.push({
				method: "quadraticCurveTo",
				data: [e, t, n, o]
			}), this.subpath.push([n, o])
		}
		bezierCurveTo(e, t, n, o, r, i) {
			this.path.push({
				method: "bezierCurveTo",
				data: [e, t, n, o, r, i]
			}), this.subpath.push([r, i])
		}
		arc(e, t, n, o, r, i = !1) {
			this.path.push({
				method: "arc",
				data: [e, t, n, o, r, i]
			}), this.subpath.push([e, t])
		}
		rect(e, t, n, o) {
			this.path.push({
				method: "rect",
				data: [e, t, n, o]
			}), this.subpath = [
				[e, t]
			]
		}
		arcTo(e, t, n, o, r) {
			this.path.push({
				method: "arcTo",
				data: [e, t, n, o, r]
			}), this.subpath.push([n, o])
		}
		clip() {
			this.actions.push({
				method: "clip",
				data: [...this.path]
			})
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
			this.actions.push({
				method: "setLineDashOffset",
				data: [e]
			})
		}
		set globalCompositeOperation(e) {
			this.actions.push({
				method: "setGlobalCompositeOperation",
				data: [e]
			})
		}
		set shadowBlur(e) {
			this.actions.push({
				method: "setShadowBlur",
				data: [e]
			})
		}
		set shadowColor(e) {
			this.actions.push({
				method: "setShadowColor",
				data: [e]
			})
		}
		set shadowOffsetX(e) {
			this.actions.push({
				method: "setShadowOffsetX",
				data: [e]
			})
		}
		set shadowOffsetY(e) {
			this.actions.push({
				method: "setShadowOffsetY",
				data: [e]
			})
		}
		set font(e) {
			var t = this;
			this.state.font = e;
			var n = e.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);
			if (n) {
				var o = n[1].trim().split(/\s/),
					r = parseFloat(n[3]),
					i = n[7],
					s = [];
				o.forEach((function(e, n) {
					["italic", "oblique", "normal"].indexOf(e) > -1 ? (s.push({
						method: "setFontStyle",
						data: [e]
					}), t.state.fontStyle = e) : ["bold", "normal"].indexOf(e) > -1 ? (s
						.push({
							method: "setFontWeight",
							data: [e]
						}), t.state.fontWeight = e) : 0 === n ? (s.push({
						method: "setFontStyle",
						data: ["normal"]
					}), t.state.fontStyle = "normal") : 1 === n && a()
				})), 1 === o.length && a(), o = s.map((function(e) {
					return e.data[0]
				})).join(" "), this.state.fontSize = r, this.state.fontFamily = i, this.actions.push({
					method: "setFont",
					data: [`${o} ${r}px ${i}`]
				})
			} else console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");

			function a() {
				s.push({
					method: "setFontWeight",
					data: ["normal"]
				}), t.state.fontWeight = "normal"
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
			e = Math.floor(255 * parseFloat(e)), this.actions.push({
				method: "setGlobalAlpha",
				data: [e]
			})
		}
		set textAlign(e) {
			this.actions.push({
				method: "setTextAlign",
				data: [e]
			})
		}
		set lineCap(e) {
			this.actions.push({
				method: "setLineCap",
				data: [e]
			})
		}
		set lineJoin(e) {
			this.actions.push({
				method: "setLineJoin",
				data: [e]
			})
		}
		set lineWidth(e) {
			this.actions.push({
				method: "setLineWidth",
				data: [e]
			})
		}
		set miterLimit(e) {
			this.actions.push({
				method: "setMiterLimit",
				data: [e]
			})
		}
		set textBaseline(e) {
			this.actions.push({
				method: "setTextBaseline",
				data: [e]
			})
		}
	},
	map: class {
		constructor(e, t) {
			this.id = e, this.pageId = t
		}
		getCenterLocation(e) {
			Xd(this.id, this.pageId, "getCenterLocation", e)
		}
		moveToLocation(e) {
			Xd(this.id, this.pageId, "moveToLocation", e)
		}
		getScale(e) {
			Xd(this.id, this.pageId, "getScale", e)
		}
		getRegion(e) {
			Xd(this.id, this.pageId, "getRegion", e)
		}
		includePoints(e) {
			Xd(this.id, this.pageId, "includePoints", e)
		}
		translateMarker(e) {
			Xd(this.id, this.pageId, "translateMarker", e)
		}
		$getAppMap() {}
		addCustomLayer(e) {
			Xd(this.id, this.pageId, "addCustomLayer", e)
		}
		removeCustomLayer(e) {
			Xd(this.id, this.pageId, "removeCustomLayer", e)
		}
		addGroundOverlay(e) {
			Xd(this.id, this.pageId, "addGroundOverlay", e)
		}
		removeGroundOverlay(e) {
			Xd(this.id, this.pageId, "removeGroundOverlay", e)
		}
		updateGroundOverlay(e) {
			Xd(this.id, this.pageId, "updateGroundOverlay", e)
		}
		initMarkerCluster(e) {
			Xd(this.id, this.pageId, "initMarkerCluster", e)
		}
		addMarkers(e) {
			Xd(this.id, this.pageId, "addMarkers", e)
		}
		removeMarkers(e) {
			Xd(this.id, this.pageId, "removeMarkers", e)
		}
		moveAlong(e) {
			Xd(this.id, this.pageId, "moveAlong", e)
		}
		setLocMarkerIcon(e) {
			Xd(this.id, this.pageId, "setLocMarkerIcon", e)
		}
		openMapApp(e) {
			Xd(this.id, this.pageId, "openMapApp", e)
		}
		on(e) {
			Xd(this.id, this.pageId, "on", e)
		}
	},
	video: Qd,
	editor: class {
		constructor(e, t) {
			this.id = e, this.pageId = t
		}
		format(e, t) {
			this._exec("format", {
				name: e,
				value: t
			})
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
			cf(this.id, this.pageId, e, t)
		}
	}
};

function df(e) {
	if (e && e.contextInfo) {
		const {
			id: t,
			type: n,
			page: o
		} = e.contextInfo, r = uf[n];
		e.context = new r(t, o), delete e.contextInfo
	}
}
class ff {
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
		return this._selectorQuery._push(this._selector, this._component, this._single, {
			context: !0
		}, e), this._selectorQuery
	}
	node(e) {
		return this._selectorQuery
	}
}
class pf {
	constructor(e) {
		this._component = void 0, this._page = e, this._queue = [], this._queueCb = []
	}
	exec(e) {
		return Ku(this._page, this._queue, (t => {
			const n = this._queueCb;
			t.forEach(((e, t) => {
				k(e) ? e.forEach(df) : df(e);
				const o = n[t];
				B(o) && o.call(this, e)
			})), B(e) && e.call(this, t)
		})), this._nodesRef
	}
	in(e) {
		return this._component = Le(e), this
	}
	select(e) {
		return this._nodesRef = new ff(this, this._component, e, !0)
	}
	selectAll(e) {
		return this._nodesRef = new ff(this, this._component, e, !1)
	}
	selectViewport() {
		return this._nodesRef = new ff(this, null, "", !0)
	}
	_push(e, t, n, o, r) {
		this._queue.push({
			component: t,
			selector: e,
			single: n,
			fields: o
		}), this._queueCb.push(r)
	}
}
const hf = Cd(0, (e => ((e = Le(e)) && !Nc(e) && (e = null), new pf(e || zc())))),
	mf = Cd(0, (() => {
		const e = zm();
		return e && e.$vm ? e.$vm.$locale : Hl().getLocale()
	})),
	gf = Cd(0, (e => {
		const t = zm();
		if (!t) return !1;
		return t.$vm.$locale !== e && (t.$vm.$locale = e, window.localStorage && (localStorage[Z] = e), Xv
			.invokeOnCallback("onLocaleChange", {
				locale: e
			}), !0)
	})),
	vf = {
		[ce]: [],
		[le]: [],
		[se]: [],
		[oe]: [],
		[re]: []
	};
const bf = Cd(0, (() => x({}, sp))),
	yf = {
		formatArgs: {
			count(e, t) {
				(!e || e <= 0) && (t.count = 9)
			},
			sizeType(e, t) {
				t.sizeType = od(e, Zu)
			},
			sourceType(e, t) {
				t.sourceType = od(e, ed)
			},
			extension(e, t) {
				if (e instanceof Array && 0 === e.length) return "param extension should not be empty.";
				e || (t.extension = ["*"])
			}
		}
	},
	_f = {
		formatArgs: {
			sourceType(e, t) {
				t.sourceType = od(e, ed)
			},
			compressed: !0,
			maxDuration: 60,
			camera: "back",
			extension(e, t) {
				if (e instanceof Array && 0 === e.length) return "param extension should not be empty.";
				e || (t.extension = ["*"])
			}
		}
	},
	wf = (Boolean, ["all", "image", "video"]),
	xf = {
		formatArgs: {
			count(e, t) {
				(!e || e <= 0) && (t.count = 100)
			},
			sourceType(e, t) {
				t.sourceType = od(e, ed)
			},
			type(e, t) {
				t.type = nd(e, wf)
			},
			extension(e, t) {
				if (e instanceof Array && 0 === e.length) return "param extension should not be empty.";
				e || (t.extension = [""])
			}
		}
	},
	Tf = {
		formatArgs: {
			urls(e, t) {
				t.urls = e.map((e => P(e) && e ? Nu(e) : ""))
			},
			current(e, t) {
				"number" == typeof e ? t.current = e > 0 && e < t.urls.length ? e : 0 : P(e) && e && (t.current = Nu(e))
			}
		}
	},
	Sf = "json",
	Ef = ["text", "arraybuffer"],
	kf = encodeURIComponent;
ArrayBuffer, Boolean;
const Af = {
		formatArgs: {
			method(e, t) {
				t.method = nd((e || "").toUpperCase(), td)
			},
			data(e, t) {
				t.data = e || ""
			},
			url(e, t) {
				t.method === td[0] && j(t.data) && Object.keys(t.data).length && (t.url = function(e, t) {
					let n = e.split("#");
					const o = n[1] || "";
					n = n[0].split("?");
					let r = n[1] || "";
					e = n[0];
					const i = r.split("&").filter((e => e)),
						s = {};
					i.forEach((e => {
						const t = e.split("=");
						s[t[0]] = t[1]
					}));
					for (const a in t)
						if (E(t, a)) {
							let e = t[a];
							null == e ? e = "" : j(e) && (e = JSON.stringify(e)), s[kf(a)] = kf(e)
						} return r = Object.keys(s).map((e => `${e}=${s[e]}`)).join("&"), e + (r ? "?" + r :
						"") + (o ? "#" + o : "")
				}(e, t.data))
			},
			header(e, t) {
				const n = t.header = e || {};
				t.method !== td[0] && (Object.keys(n).find((e => "content-type" === e.toLowerCase())) || (n[
					"Content-Type"] = "application/json"))
			},
			dataType(e, t) {
				t.dataType = (e || Sf).toLowerCase()
			},
			responseType(e, t) {
				t.responseType = (e || "").toLowerCase(), -1 === Ef.indexOf(t.responseType) && (t.responseType = "text")
			}
		}
	},
	Cf = {
		formatArgs: {
			header(e, t) {
				t.header = e || {}
			}
		}
	},
	Bf = {
		formatArgs: {
			filePath(e, t) {
				e && (t.filePath = Nu(e))
			},
			header(e, t) {
				t.header = e || {}
			},
			formData(e, t) {
				t.formData = e || {}
			}
		}
	};
const Pf = {
		url: {
			type: String,
			required: !0
		}
	},
	Lf = "navigateTo",
	Of = "redirectTo",
	If = "reLaunch",
	Mf = "switchTab",
	Ff = "preloadPage",
	jf = (zf(["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out",
		"zoom-fade-out", "pop-in", "none"
	]), zf(["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in",
		"zoom-fade-in", "pop-out", "none"
	]), Vf(Lf)),
	Nf = Vf(Of),
	Rf = Vf(If),
	Df = Vf(Mf),
	qf = {
		formatArgs: {
			delta(e, t) {
				e = parseInt(e + "") || 1, t.delta = Math.min(vm().length - 1, e)
			}
		}
	};

function zf(e) {
	return {
		animationType: {
			type: String,
			validator(t) {
				if (t && -1 === e.indexOf(t)) return "`" + t +
					"` is not supported for `animationType` (supported values are: `" + e.join("`|`") + "`)"
			}
		},
		animationDuration: {
			type: Number
		}
	}
}
let Hf;

function Wf() {
	Hf = ""
}

function Vf(e) {
	return {
		formatArgs: {
			url: $f(e)
		},
		beforeAll: Wf
	}
}

function $f(e) {
	return function(t, n) {
		if (!t) return 'Missing required args: "url"';
		const o = (t = function(e) {
				if (0 === e.indexOf("/")) return e;
				let t = "";
				const n = vm();
				return n.length && (t = n[n.length - 1].$page.route), Yc(t, e)
			}(t)).split("?")[0],
			r = Jc(o, !0);
		if (!r) return "page `" + t + "` is not found";
		if (e === Lf || e === Of) {
			if (r.meta.isTabBar) return `can not ${e} a tabbar page`
		} else if (e === Mf && !r.meta.isTabBar) return "can not switch to no-tabBar page";
		if (e !== Mf && e !== Ff || !r.meta.isTabBar || "appLaunch" === n.openType || (t = o), r.meta.isEntry && (
				t = t.replace(r.alias, "/")), n.url = function(e) {
				if (!P(e)) return e;
				const t = e.indexOf("?");
				if (-1 === t) return e;
				const n = e.slice(t + 1).trim().replace(/^(\?|#|&)/, "");
				if (!n) return e;
				e = e.slice(0, t);
				const o = [];
				return n.split("&").forEach((e => {
					const t = e.replace(/\+/g, " ").split("="),
						n = t.shift(),
						r = t.length > 0 ? t.join("=") : "";
					o.push(n + "=" + encodeURIComponent(r))
				})), o.length ? e + "?" + o.join("&") : e
			}(t), "unPreloadPage" !== e)
			if (e !== Ff) {
				if (Hf === t && "appLaunch" !== n.openType) return `${Hf} locked`;
				__uniConfig.ready && (Hf = t)
			} else if (r.meta.isTabBar) {
			const e = vm(),
				t = r.path.slice(1);
			if (e.find((e => e.route === t))) return "tabBar page `" + t + "` already exists"
		}
	}
}
const Qf = "setNavigationBarTitle",
	Uf = {
		formatArgs: {
			duration: 300
		}
	},
	Xf = ["success", "loading", "none", "error"],
	Yf = (Boolean, {
		formatArgs: {
			title: "",
			icon(e, t) {
				t.icon = nd(e, Xf)
			},
			image(e, t) {
				t.image = e ? Nu(e) : ""
			},
			duration: 1500,
			mask: !1
		}
	}),
	Jf = "startPullDownRefresh",
	Gf = "stopPullDownRefresh",
	Kf = "hideTabBar";

function Zf(e) {
	const {
		bottom: t,
		height: n,
		left: o,
		right: r,
		top: i,
		width: s
	} = e || {};
	return {
		bottom: t,
		height: n,
		left: o,
		right: r,
		top: i,
		width: s
	}
}

function ep(e) {
	const {
		intersectionRatio: t,
		boundingClientRect: {
			height: n,
			width: o
		},
		intersectionRect: {
			height: r,
			width: i
		}
	} = e;
	return 0 !== t ? t : r === n ? i / o : r / n
}
const tp = {};

function np(e, t) {
	const n = tp[e];
	return n ? Promise.resolve(n) : /^data:[a-z-]+\/[a-z-]+;base64,/.test(e) ? Promise.resolve(function(e) {
		const t = e.split(","),
			n = t[0].match(/:(.*?);/),
			o = n ? n[1] : "",
			r = atob(t[1]);
		let i = r.length;
		const s = new Uint8Array(i);
		for (; i--;) s[i] = r.charCodeAt(i);
		return op(s, o)
	}(e)) : t ? Promise.reject(new Error("not find")) : new Promise(((t, n) => {
		const o = new XMLHttpRequest;
		o.open("GET", e, !0), o.responseType = "blob", o.onload = function() {
			t(this.response)
		}, o.onerror = n, o.send()
	}))
}

function op(e, t) {
	let n;
	if (e instanceof File) n = e;
	else {
		t = t || e.type || "";
		const r = `${Date.now()}${function(e){const t=e.split("/")[1];return t?`.${t}`:""}(t)}`;
		try {
			n = new File([e], r, {
				type: t
			})
		} catch (o) {
			n = e = e instanceof Blob ? e : new Blob([e], {
				type: t
			}), n.name = n.name || r
		}
	}
	return n
}

function rp(e) {
	for (const n in tp)
		if (E(tp, n)) {
			if (tp[n] === e) return n
		} var t = (window.URL || window.webkitURL).createObjectURL(e);
	return tp[t] = e, t
}

function ip(e) {
	(window.URL || window.webkitURL).revokeObjectURL(e), delete tp[e]
}
const sp = yu(),
	ap = yu();
const lp = Tu({
	name: "ResizeSensor",
	props: {
		initial: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["resize"],
	setup(e, {
		emit: t
	}) {
		const n = Pn(null),
			o = function(e) {
				return () => {
					const {
						firstElementChild: t,
						lastElementChild: n
					} = e.value;
					t.scrollLeft = 1e5, t.scrollTop = 1e5, n.scrollLeft = 1e5, n.scrollTop = 1e5
				}
			}(n),
			r = function(e, t, n) {
				const o = gn({
					width: -1,
					height: -1
				});
				return Eo((() => x({}, o)), (e => t("resize", e))), () => {
					const t = e.value;
					o.width = t.offsetWidth, o.height = t.offsetHeight, n()
				}
			}(n, t, o);
		return function(e, t, n, o) {
			Xo(o), sr((() => {
				t.initial && Zn(n);
				const r = e.value;
				r.offsetParent !== r.parentElement && (r.parentElement.style.position =
					"relative"), "AnimationEvent" in window || o()
			}))
		}(n, e, r, o), () => ki("uni-resize-sensor", {
			ref: n,
			onAnimationstartOnce: r
		}, [ki("div", {
			onScroll: r
		}, [ki("div", null, null)], 40, ["onScroll"]), ki("div", {
			onScroll: r
		}, [ki("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"])
	}
});

function cp() {}
const up = {
	cursorSpacing: {
		type: [Number, String],
		default: 0
	},
	showConfirmBar: {
		type: [Boolean, String],
		default: "auto"
	},
	adjustPosition: {
		type: [Boolean, String],
		default: !0
	},
	autoBlur: {
		type: [Boolean, String],
		default: !1
	}
};

function dp(e, t, n) {
	function o(e) {
		const t = Ui((() => 0 === String(navigator.vendor).indexOf("Apple")));
		e.addEventListener("focus", (() => {
			clearTimeout(undefined), document.addEventListener("click", cp, !1)
		}));
		e.addEventListener("blur", (() => {
			t.value && e.blur(), document.removeEventListener("click", cp, !1), t.value && document
				.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement
					.scrollTop)
		}))
	}
	Eo((() => t.value), (e => e && o(e)))
}
var fp =
	/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
	pp = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
	hp = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
	mp = wp("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
	gp = wp(
		"a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"
		),
	vp = wp(
		"abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
		),
	bp = wp("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
	yp = wp("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
	_p = wp("script,style");

function wp(e) {
	for (var t = {}, n = e.split(","), o = 0; o < n.length; o++) t[n[o]] = !0;
	return t
}
const xp = {
		src: {
			type: String,
			default: ""
		},
		mode: {
			type: String,
			default: "scaleToFill"
		},
		lazyLoad: {
			type: [Boolean, String],
			default: !1
		},
		draggable: {
			type: Boolean,
			default: !1
		}
	},
	Tp = {
		widthFix: ["offsetWidth", "height", (e, t) => e / t],
		heightFix: ["offsetHeight", "width", (e, t) => e * t]
	},
	Sp = {
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
	},
	Ep = Tu({
		name: "Image",
		props: xp,
		setup(e, {
			emit: t
		}) {
			const n = Pn(null),
				o = function(e, t) {
					const n = Pn(""),
						o = Ui((() => {
							let e = "auto",
								o = "";
							const r = Sp[t.mode];
							return r ? (r[0] && (o = r[0]), r[1] && (e = r[1])) : (o = "0% 0%", e =
									"100% 100%"),
								`background-image:${n.value?'url("'+n.value+'")':"none"};background-position:${o};background-size:${e};`
						})),
						r = gn({
							rootEl: e,
							src: Ui((() => t.src ? Nu(t.src) : "")),
							origWidth: 0,
							origHeight: 0,
							origStyle: {
								width: "",
								height: ""
							},
							modeStyle: o,
							imgSrc: n
						});
					return sr((() => {
						const t = e.value.style;
						r.origWidth = Number(t.width) || 0, r.origHeight = Number(t.height) || 0
					})), r
				}(n, e),
				r = Bu(n, t),
				{
					fixSize: i
				} = function(e, t, n) {
					const o = () => {
							const {
								mode: o
							} = t, r = Tp[o];
							if (!r) return;
							const {
								origWidth: i,
								origHeight: s
							} = n, a = i && s ? i / s : 0;
							if (!a) return;
							const l = e.value,
								c = l[r[0]];
							c && (l.style[r[1]] = function(e) {
								kp && e > 10 && (e = 2 * Math.round(e / 2));
								return e
							}(r[2](c, a)) + "px")
						},
						r = () => {
							const {
								style: t
							} = e.value, {
								origStyle: {
									width: o,
									height: r
								}
							} = n;
							t.width = o, t.height = r
						};
					return Eo((() => t.mode), ((e, t) => {
						Tp[t] && r(), Tp[e] && o()
					})), {
						fixSize: o,
						resetSize: r
					}
				}(n, e, o);
			return function(e, t, n, o, r) {
				let i, s;
				const a = (t = 0, n = 0, o = "") => {
						e.origWidth = t, e.origHeight = n, e.imgSrc = o
					},
					l = l => {
						if (!l) return c(), void a();
						i = i || new Image, i.onload = e => {
							const {
								width: u,
								height: d
							} = i;
							a(u, d, l), o(), i.draggable = t.draggable, s && s.remove(), s = i, n.value
								.appendChild(i), c(), r("load", e, {
									width: u,
									height: d
								})
						}, i.onerror = t => {
							a(), c(), r("error", t, {
								errMsg: `GET ${e.src} 404 (Not Found)`
							})
						}, i.src = l
					},
					c = () => {
						i && (i.onload = null, i.onerror = null, i = null)
					};
				Eo((() => e.src), (e => l(e))), Eo((() => e.imgSrc), (e => {
					!e && s && (s.remove(), s = null)
				})), sr((() => l(e.src))), cr((() => c()))
			}(o, e, n, i, r), () => ki("uni-image", {
				ref: n
			}, [ki("div", {
				style: o.modeStyle
			}, null, 4), Tp[e.mode] ? ki(lp, {
				onResize: i
			}, null, 8, ["onResize"]) : ki("span", null, null)], 512)
		}
	});
const kp = "Google Inc." === navigator.vendor;
const Ap = We(!0),
	Cp = [];
let Bp, Pp = 0;
const Lp = e => Cp.forEach((t => t.userAction = e));

function Op(e = {
	userAction: !1
}) {
	if (!Bp) {
		["touchstart", "touchmove", "touchend", "mousedown", "mouseup"].forEach((e => {
			document.addEventListener(e, (function() {
				!Pp && Lp(!0), Pp++, setTimeout((() => {
					!--Pp && Lp(!1)
				}), 0)
			}), Ap)
		})), Bp = !0
	}
	Cp.push(e)
}
const Ip = () => !!Pp;

function Mp() {
	const e = gn({
		userAction: !1
	});
	return sr((() => {
		Op(e)
	})), cr((() => {
		! function(e) {
			const t = Cp.indexOf(e);
			t >= 0 && Cp.splice(t, 1)
		}(e)
	})), {
		state: e
	}
}

function Fp() {
	const e = gn({
		attrs: {}
	});
	return sr((() => {
		let t = Ri();
		for (; t;) {
			const n = t.type.__scopeId;
			n && (e.attrs[n] = ""), t = t.proxy && "page" === t.proxy.$mpType ? null : t.parent
		}
	})), {
		state: e
	}
}

function jp(e, t) {
	const n = document.activeElement;
	if (!n) return t({});
	const o = {};
	["input", "textarea"].includes(n.tagName.toLowerCase()) && (o.start = n.selectionStart, o.end = n.selectionEnd), t(
		o)
}

function Np(e, t) {
	return "number" === t && isNaN(Number(e)) && (e = ""), null === e ? "" : String(e)
}
const Rp = ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"],
	Dp = x({}, {
		name: {
			type: String,
			default: ""
		},
		modelValue: {
			type: [String, Number],
			default: ""
		},
		value: {
			type: [String, Number],
			default: ""
		},
		disabled: {
			type: [Boolean, String],
			default: !1
		},
		autoFocus: {
			type: [Boolean, String],
			default: !1
		},
		focus: {
			type: [Boolean, String],
			default: !1
		},
		cursor: {
			type: [Number, String],
			default: -1
		},
		selectionStart: {
			type: [Number, String],
			default: -1
		},
		selectionEnd: {
			type: [Number, String],
			default: -1
		},
		type: {
			type: String,
			default: "text"
		},
		password: {
			type: [Boolean, String],
			default: !1
		},
		placeholder: {
			type: String,
			default: ""
		},
		placeholderStyle: {
			type: String,
			default: ""
		},
		placeholderClass: {
			type: String,
			default: ""
		},
		maxlength: {
			type: [Number, String],
			default: 140
		},
		confirmType: {
			type: String,
			default: "done"
		},
		confirmHold: {
			type: Boolean,
			default: !1
		},
		ignoreCompositionEvent: {
			type: Boolean,
			default: !0
		},
		step: {
			type: String,
			default: "0.000000000000000001"
		},
		inputmode: {
			type: String,
			default: void 0,
			validator: e => !!~Rp.indexOf(e)
		}
	}, up),
	qp = ["input", "focus", "blur", "update:value", "update:modelValue", "update:focus", "compositionstart",
		"compositionupdate", "compositionend", "keyboardheightchange"
	];

function zp(e, t, n, o) {
	const r = Ye((n => {
		t.value = Np(n, e.type)
	}), 100, {
		setTimeout: setTimeout,
		clearTimeout: clearTimeout
	});
	Eo((() => e.modelValue), r), Eo((() => e.value), r);
	const i = function(e, t) {
		let n, o, r = 0;
		const i = function(...i) {
			const s = Date.now();
			clearTimeout(n), o = () => {
				o = null, r = s, e.apply(this, i)
			}, s - r < t ? n = setTimeout(o, t - (s - r)) : o()
		};
		return i.cancel = function() {
			clearTimeout(n), o = null
		}, i.flush = function() {
			clearTimeout(n), o && o()
		}, i
	}(((e, t) => {
		r.cancel(), n("update:modelValue", t.value), n("update:value", t.value), o("input", e, t)
	}), 100);
	return ir((() => {
		r.cancel(), i.cancel()
	})), {
		trigger: o,
		triggerInput: (e, t, n) => {
			r.cancel(), i(e, t), n && i.flush()
		}
	}
}

function Hp(e, t) {
	Mp();
	const n = Ui((() => e.autoFocus || e.focus));

	function o() {
		if (!n.value) return;
		const e = t.value;
		e ? e.focus() : setTimeout(o, 100)
	}
	Eo((() => e.focus), (e => {
		e ? o() : function() {
			const e = t.value;
			e && e.blur()
		}()
	})), sr((() => {
		n.value && Zn(o)
	}))
}

function Wp(e, t, n, o) {
	tc(qc(), "getSelectedTextRange", jp);
	const {
		fieldRef: r,
		state: i,
		trigger: s
	} = function(e, t, n) {
		const o = Pn(null),
			r = Bu(t, n),
			i = Ui((() => {
				const t = Number(e.selectionStart);
				return isNaN(t) ? -1 : t
			})),
			s = Ui((() => {
				const t = Number(e.selectionEnd);
				return isNaN(t) ? -1 : t
			})),
			a = Ui((() => {
				const t = Number(e.cursor);
				return isNaN(t) ? -1 : t
			})),
			l = Ui((() => {
				var t = Number(e.maxlength);
				return isNaN(t) ? 140 : t
			})),
			c = Np(e.modelValue, e.type) || Np(e.value, e.type),
			u = gn({
				value: c,
				valueOrigin: c,
				maxlength: l,
				focus: e.focus,
				composing: !1,
				selectionStart: i,
				selectionEnd: s,
				cursor: a
			});
		return Eo((() => u.focus), (e => n("update:focus", e))), Eo((() => u.maxlength), (e => u.value = u.value.slice(
			0, e))), {
			fieldRef: o,
			state: u,
			trigger: r
		}
	}(e, t, n), {
		triggerInput: a
	} = zp(e, i, n, s);
	Hp(e, r), dp(0, r);
	const {
		state: l
	} = Fp();
	! function(e, t) {
		const n = xo(Pu, !1);
		if (!n) return;
		const o = Ri(),
			r = {
				submit() {
					const n = o.proxy;
					return [n[e], P(t) ? n[t] : t.value]
				},
				reset() {
					P(t) ? o.proxy[t] = "" : t.value = ""
				}
			};
		n.addField(r), cr((() => {
			n.removeField(r)
		}))
	}("name", i),
	function(e, t, n, o, r, i) {
		function s() {
			const n = e.value;
			n && t.focus && t.selectionStart > -1 && t.selectionEnd > -1 && "number" !== n.type && (n.selectionStart = t
				.selectionStart, n.selectionEnd = t.selectionEnd)
		}

		function a() {
			const n = e.value;
			n && t.focus && t.selectionStart < 0 && t.selectionEnd < 0 && t.cursor > -1 && "number" !== n.type && (n
				.selectionEnd = n.selectionStart = t.cursor)
		}

		function l(e) {
			return "number" === e.type ? null : e.selectionEnd
		}
		Eo([() => t.selectionStart, () => t.selectionEnd], s), Eo((() => t.cursor), a), Eo((() => e.value), (
	function() {
			const c = e.value;
			if (!c) return;
			const u = function(e, o) {
				e.stopPropagation(), B(i) && !1 === i(e, t) || (t.value = c.value, t.composing && n
					.ignoreCompositionEvent || r(e, {
						value: c.value,
						cursor: l(c)
					}, o))
			};

			function d(e) {
				n.ignoreCompositionEvent || o(e.type, e, {
					value: e.data
				})
			}
			c.addEventListener("change", (e => e.stopPropagation())), c.addEventListener("focus", (function(
				e) {
				t.focus = !0, o("focus", e, {
					value: t.value
				}), s(), a()
			})), c.addEventListener("blur", (function(e) {
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
		fixDisabledColor: 0 === String(navigator.vendor).indexOf("Apple") && CSS.supports(
			"image-orientation:from-image"),
		trigger: s
	}
}
const Vp = Tu({
	name: "Input",
	props: x({}, Dp, {
		placeholderClass: {
			type: String,
			default: "input-placeholder"
		},
		textContentType: {
			type: String,
			default: ""
		}
	}),
	emits: ["confirm", ...qp],
	setup(e, {
		emit: t
	}) {
		const n = ["text", "number", "idcard", "digit", "password", "tel"],
			o = ["off", "one-time-code"],
			r = Ui((() => {
				let t = "";
				switch (e.type) {
					case "text":
						"search" === e.confirmType && (t = "search");
						break;
					case "idcard":
						t = "text";
						break;
					case "digit":
						t = "number";
						break;
					default:
						t = ~n.includes(e.type) ? e.type : "text"
				}
				return e.password ? "password" : t
			})),
			i = Ui((() => {
				const t = o.indexOf(e.textContentType),
					n = o.indexOf(W(e.textContentType));
				return o[-1 !== t ? t : -1 !== n ? n : 0]
			}));
		let s, a = Pn("");
		const l = Pn(null),
			{
				fieldRef: c,
				state: u,
				scopedAttrsState: d,
				fixDisabledColor: f,
				trigger: p
			} = Wp(e, l, t, ((e, t) => {
				const n = e.target;
				if ("number" === r.value) {
					if (s && (n.removeEventListener("blur", s), s = null), n.validity && !n.validity
						.valid) {
						if ((!a.value || !n.value) && "-" === e.data || "-" === a.value[0] &&
							"deleteContentBackward" === e.inputType) return a.value = "-", t.value = "",
							s = () => {
								a.value = n.value = ""
							}, n.addEventListener("blur", s), !1;
						if (a.value)
							if (-1 !== a.value.indexOf(".")) {
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
					if (o > 0 && n.value.length > o) return n.value = n.value.slice(0, o), t.value = n
						.value, !1
				}
			}));
		Eo((() => u.value), (t => {
			"number" !== e.type || "-" === a.value && "" === t || (a.value = t)
		}));
		const h = ["number", "digit"],
			m = Ui((() => h.includes(e.type) ? e.step : ""));

		function g(t) {
			if ("Enter" !== t.key) return;
			const n = t.target;
			t.stopPropagation(), p("confirm", t, {
				value: n.value
			}), !e.confirmHold && n.blur()
		}
		return () => {
			let t = e.disabled && f ? ki("input", {
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
			}, null, 40, ["value", "readonly", "type", "maxlength", "step", "onFocus"]) : ki("input", {
				key: "input",
				ref: c,
				value: u.value,
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
			}, null, 40, ["value", "disabled", "type", "maxlength", "step", "enterkeyhint",
				"pattern", "autocomplete", "onKeyup", "inputmode"
			]);
			return ki("uni-input", {
				ref: l
			}, [ki("div", {
				class: "uni-input-wrapper"
			}, [mr(ki("div", Ii(d.attrs, {
				style: e.placeholderStyle,
				class: ["uni-input-placeholder", e.placeholderClass]
			}), [e.placeholder], 16), [
				[Ns, !(u.value.length || "-" === a.value)]
			]), "search" === e.confirmType ? ki("form", {
				action: "",
				onSubmit: e => e.preventDefault(),
				class: "uni-input-form"
			}, [t], 40, ["onSubmit"]) : t])], 512)
		}
	}
});
const $p = ["class", "style"],
	Qp = /^on[A-Z]+/,
	Up = (e = {}) => {
		const {
			excludeListeners: t = !1,
			excludeKeys: n = []
		} = e, o = Ri(), r = Ln({}), i = Ln({}), s = Ln({}), a = n.concat($p);
		return o.attrs = gn(o.attrs), To((() => {
			const e = (n = o.attrs, Object.keys(n).map((e => [e, n[e]]))).reduce(((e, [n, o]) => (a
				.includes(n) ? e.exclude[n] = o : Qp.test(n) ? (t || (e.attrs[n] = o), e
					.listeners[n] = o) : e.attrs[n] = o, e)), {
				exclude: {},
				attrs: {},
				listeners: {}
			});
			var n;
			r.value = e.attrs, i.value = e.listeners, s.value = e.exclude
		})), {
			$attrs: r,
			$listeners: i,
			$excludeAttrs: s
		}
	};

function Xp(e) {
	const t = [];
	return k(e) && e.forEach((e => {
		_i(e) ? e.type === li ? t.push(...Xp(e.children)) : t.push(e) : k(e) && t.push(...Xp(e))
	})), t
}
const Yp = Tu({
	inheritAttrs: !1,
	name: "MovableArea",
	props: {
		scaleArea: {
			type: Boolean,
			default: !1
		}
	},
	setup(e, {
		slots: t
	}) {
		const n = Pn(null),
			o = Pn(!1);
		let {
			setContexts: r,
			events: i
		} = function(e, t) {
			const n = Pn(0),
				o = Pn(0),
				r = gn({
					x: null,
					y: null
				}),
				i = Pn(null);
			let s = null,
				a = [];

			function l(t) {
				t && 1 !== t && (e.scaleArea ? a.forEach((function(e) {
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
			const u = Cu((t => {
					let n = t.touches;
					if (n && n.length > 1) {
						let t = {
							x: n[1].pageX - n[0].pageX,
							y: n[1].pageY - n[0].pageY
						};
						if (i.value = Jp(t), r.x = t.x, r.y = t.y, !e.scaleArea) {
							let e = c(n[0].target),
								t = c(n[1].target);
							s = e && e === t ? e : null
						}
					}
				})),
				d = Cu((e => {
					let t = e.touches;
					if (t && t.length > 1) {
						e.preventDefault();
						let n = {
							x: t[1].pageX - t[0].pageX,
							y: t[1].pageY - t[0].pageY
						};
						if (null !== r.x && i.value && i.value > 0) {
							l(Jp(n) / i.value)
						}
						r.x = n.x, r.y = n.y
					}
				})),
				f = Cu((t => {
					let n = t.touches;
					n && n.length || t.changedTouches && (r.x = 0, r.y = 0, i.value = null, e
						.scaleArea ? a.forEach((function(e) {
							e._endScale()
						})) : s && s._endScale())
				}));

			function p() {
				h(), a.forEach((function(e, t) {
					e.setParent()
				}))
			}

			function h() {
				let e = window.getComputedStyle(t.value),
					r = t.value.getBoundingClientRect();
				n.value = r.width - ["Left", "Right"].reduce((function(t, n) {
					const o = "padding" + n;
					return t + parseFloat(e["border" + n + "Width"]) + parseFloat(e[o])
				}), 0), o.value = r.height - ["Top", "Bottom"].reduce((function(t, n) {
					const o = "padding" + n;
					return t + parseFloat(e["border" + n + "Width"]) + parseFloat(e[o])
				}), 0)
			}
			return wo("movableAreaWidth", n), wo("movableAreaHeight", o), {
				setContexts(e) {
					a = e
				},
				events: {
					_onTouchstart: u,
					_onTouchmove: d,
					_onTouchend: f,
					_resize: p
				}
			}
		}(e, n);
		const {
			$listeners: s,
			$attrs: a,
			$excludeAttrs: l
		} = Up(), c = s.value;
		["onTouchstart", "onTouchmove", "onTouchend"].forEach((e => {
			let t = c[e],
				n = i[`_${e}`];
			c[e] = t ? [].concat(t, n) : n
		})), sr((() => {
			i._resize(), o.value = !0
		}));
		let u = [];
		const d = [];

		function f() {
			const e = [];
			for (let t = 0; t < u.length; t++) {
				let n = u[t];
				n = n.el;
				const o = d.find((e => n === e.rootRef.value));
				o && e.push(Sn(o))
			}
			r(e)
		}
		return wo("_isMounted", o), wo("movableAreaRootRef", n), wo("addMovableViewContext", (e => {
			d.push(e), f()
		})), wo("removeMovableViewContext", (e => {
			const t = d.indexOf(e);
			t >= 0 && (d.splice(t, 1), f())
		})), () => {
			const e = t.default && t.default();
			return u = Xp(e), ki("uni-movable-area", Ii({
				ref: n
			}, a.value, l.value, c), [ki(lp, {
				onResize: i._resize
			}, null, 8, ["onResize"]), u], 16)
		}
	}
});

function Jp(e) {
	return Math.sqrt(e.x * e.x + e.y * e.y)
}
const Gp = function(e, t, n, o) {
	e.addEventListener(t, (e => {
		B(n) && !1 === n(e) && ((void 0 === e.cancelable || e.cancelable) && e.preventDefault(), e
			.stopPropagation())
	}), {
		passive: !1
	})
};
let Kp, Zp;

function eh(e, t, n) {
	cr((() => {
		document.removeEventListener("mousemove", Kp), document.removeEventListener("mouseup", Zp)
	}));
	let o = 0,
		r = 0,
		i = 0,
		s = 0;
	const a = function(e, n, a, l) {
		if (!1 === t({
				cancelable: e.cancelable,
				target: e.target,
				currentTarget: e.currentTarget,
				preventDefault: e.preventDefault.bind(e),
				stopPropagation: e.stopPropagation.bind(e),
				touches: e.touches,
				changedTouches: e.changedTouches,
				detail: {
					state: n,
					x: a,
					y: l,
					dx: a - o,
					dy: l - r,
					ddx: a - i,
					ddy: l - s,
					timeStamp: e.timeStamp
				}
			})) return !1
	};
	let l, c, u = null;
	Gp(e, "touchstart", (function(e) {
		if (l = !0, 1 === e.touches.length && !u) return u = e, o = i = e.touches[0].pageX, r = s = e
			.touches[0].pageY, a(e, "start", o, r)
	})), Gp(e, "mousedown", (function(e) {
		if (c = !0, !l && !u) return u = e, o = i = e.pageX, r = s = e.pageY, a(e, "start", o, r)
	})), Gp(e, "touchmove", (function(e) {
		if (1 === e.touches.length && u) {
			const t = a(e, "move", e.touches[0].pageX, e.touches[0].pageY);
			return i = e.touches[0].pageX, s = e.touches[0].pageY, t
		}
	}));
	const d = Kp = function(e) {
		if (!l && c && u) {
			const t = a(e, "move", e.pageX, e.pageY);
			return i = e.pageX, s = e.pageY, t
		}
	};
	document.addEventListener("mousemove", d), Gp(e, "touchend", (function(e) {
		if (0 === e.touches.length && u) return l = !1, u = null, a(e, "end", e.changedTouches[0].pageX, e
			.changedTouches[0].pageY)
	}));
	const f = Zp = function(e) {
		if (c = !1, !l && u) return u = null, a(e, "end", e.pageX, e.pageY)
	};
	document.addEventListener("mouseup", f), Gp(e, "touchcancel", (function(e) {
		if (u) {
			l = !1;
			const t = u;
			return u = null, a(e, n ? "cancel" : "end", t.touches[0].pageX, t.touches[0].pageY)
		}
	}))
}

function th(e, t, n) {
	return e > t - n && e < t + n
}

function nh(e, t) {
	return th(e, 0, t)
}

function oh() {}

function rh(e, t) {
	this._m = e, this._f = 1e3 * t, this._startTime = 0, this._v = 0
}

function ih(e, t, n) {
	this._m = e, this._k = t, this._c = n, this._solution = null, this._endPosition = 0, this._startTime = 0
}

function sh(e, t, n) {
	this._springX = new ih(e, t, n), this._springY = new ih(e, t, n), this._springScale = new ih(e, t, n), this
		._startTime = 0
}
oh.prototype.x = function(e) {
	return Math.sqrt(e)
}, rh.prototype.setV = function(e, t) {
	const n = Math.pow(Math.pow(e, 2) + Math.pow(t, 2), .5);
	this._x_v = e, this._y_v = t, this._x_a = -this._f * this._x_v / n, this._y_a = -this._f * this._y_v / n, this
		._t = Math.abs(e / this._x_a) || Math.abs(t / this._y_a), this._lastDt = null, this._startTime = (new Date)
		.getTime()
}, rh.prototype.setS = function(e, t) {
	this._x_s = e, this._y_s = t
}, rh.prototype.s = function(e) {
	void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), e > this._t && (e = this._t, this
		._lastDt = e);
	let t = this._x_v * e + .5 * this._x_a * Math.pow(e, 2) + this._x_s,
		n = this._y_v * e + .5 * this._y_a * Math.pow(e, 2) + this._y_s;
	return (this._x_a > 0 && t < this._endPositionX || this._x_a < 0 && t > this._endPositionX) && (t = this
			._endPositionX), (this._y_a > 0 && n < this._endPositionY || this._y_a < 0 && n > this._endPositionY) &&
		(n = this._endPositionY), {
			x: t,
			y: n
		}
}, rh.prototype.ds = function(e) {
	return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), e > this._t && (e = this._t), {
		dx: this._x_v + this._x_a * e,
		dy: this._y_v + this._y_a * e
	}
}, rh.prototype.delta = function() {
	return {
		x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
		y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
	}
}, rh.prototype.dt = function() {
	return -this._x_v / this._x_a
}, rh.prototype.done = function() {
	const e = th(this.s().x, this._endPositionX) || th(this.s().y, this._endPositionY) || this._lastDt === this._t;
	return this._lastDt = null, e
}, rh.prototype.setEnd = function(e, t) {
	this._endPositionX = e, this._endPositionY = t
}, rh.prototype.reconfigure = function(e, t) {
	this._m = e, this._f = 1e3 * t
}, ih.prototype._solve = function(e, t) {
	const n = this._c,
		o = this._m,
		r = this._k,
		i = n * n - 4 * o * r;
	if (0 === i) {
		const r = -n / (2 * o),
			i = e,
			s = t / (r * e);
		return {
			x: function(e) {
				return (i + s * e) * Math.pow(Math.E, r * e)
			},
			dx: function(e) {
				const t = Math.pow(Math.E, r * e);
				return r * (i + s * e) * t + s * t
			}
		}
	}
	if (i > 0) {
		const r = (-n - Math.sqrt(i)) / (2 * o),
			s = (-n + Math.sqrt(i)) / (2 * o),
			a = (t - r * e) / (s - r),
			l = e - a;
		return {
			x: function(e) {
				let t, n;
				return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this
						._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s *
					e)), l * t + a * n
			},
			dx: function(e) {
				let t, n;
				return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this
						._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s *
					e)), l * r * t + a * s * n
			}
		}
	}
	const s = Math.sqrt(4 * o * r - n * n) / (2 * o),
		a = -n / 2 * o,
		l = e,
		c = (t - a * e) / s;
	return {
		x: function(e) {
			return Math.pow(Math.E, a * e) * (l * Math.cos(s * e) + c * Math.sin(s * e))
		},
		dx: function(e) {
			const t = Math.pow(Math.E, a * e),
				n = Math.cos(s * e),
				o = Math.sin(s * e);
			return t * (c * s * n - l * s * o) + a * t * (c * o + l * n)
		}
	}
}, ih.prototype.x = function(e) {
	return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this
		._endPosition + this._solution.x(e) : 0
}, ih.prototype.dx = function(e) {
	return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(
		e) : 0
}, ih.prototype.setEnd = function(e, t, n) {
	if (n || (n = (new Date).getTime()), e !== this._endPosition || !nh(t, .1)) {
		t = t || 0;
		let o = this._endPosition;
		this._solution && (nh(t, .1) && (t = this._solution.dx((n - this._startTime) / 1e3)), o = this._solution.x((
				n - this._startTime) / 1e3), nh(t, .1) && (t = 0), nh(o, .1) && (o = 0), o += this._endPosition),
			this._solution && nh(o - e, .1) && nh(t, .1) || (this._endPosition = e, this._solution = this._solve(o -
				this._endPosition, t), this._startTime = n)
	}
}, ih.prototype.snap = function(e) {
	this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
		x: function() {
			return 0
		},
		dx: function() {
			return 0
		}
	}
}, ih.prototype.done = function(e) {
	return e || (e = (new Date).getTime()), th(this.x(), this._endPosition, .1) && nh(this.dx(), .1)
}, ih.prototype.reconfigure = function(e, t, n) {
	this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this
		._endPosition, this.dx()), this._startTime = (new Date).getTime())
}, ih.prototype.springConstant = function() {
	return this._k
}, ih.prototype.damping = function() {
	return this._c
}, ih.prototype.configuration = function() {
	return [{
		label: "Spring Constant",
		read: this.springConstant.bind(this),
		write: function(e, t) {
			e.reconfigure(1, t, e.damping())
		}.bind(this, this),
		min: 100,
		max: 1e3
	}, {
		label: "Damping",
		read: this.damping.bind(this),
		write: function(e, t) {
			e.reconfigure(1, e.springConstant(), t)
		}.bind(this, this),
		min: 1,
		max: 500
	}]
}, sh.prototype.setEnd = function(e, t, n, o) {
	const r = (new Date).getTime();
	this._springX.setEnd(e, o, r), this._springY.setEnd(t, o, r), this._springScale.setEnd(n, o, r), this
		._startTime = r
}, sh.prototype.x = function() {
	const e = ((new Date).getTime() - this._startTime) / 1e3;
	return {
		x: this._springX.x(e),
		y: this._springY.x(e),
		scale: this._springScale.x(e)
	}
}, sh.prototype.done = function() {
	const e = (new Date).getTime();
	return this._springX.done(e) && this._springY.done(e) && this._springScale.done(e)
}, sh.prototype.reconfigure = function(e, t, n) {
	this._springX.reconfigure(e, t, n), this._springY.reconfigure(e, t, n), this._springScale.reconfigure(e, t, n)
};

function ah(e, t) {
	return +((1e3 * e - 1e3 * t) / 1e3).toFixed(1)
}
const lh = Tu({
	name: "MovableView",
	props: {
		direction: {
			type: String,
			default: "none"
		},
		inertia: {
			type: [Boolean, String],
			default: !1
		},
		outOfBounds: {
			type: [Boolean, String],
			default: !1
		},
		x: {
			type: [Number, String],
			default: 0
		},
		y: {
			type: [Number, String],
			default: 0
		},
		damping: {
			type: [Number, String],
			default: 20
		},
		friction: {
			type: [Number, String],
			default: 2
		},
		disabled: {
			type: [Boolean, String],
			default: !1
		},
		scale: {
			type: [Boolean, String],
			default: !1
		},
		scaleMin: {
			type: [Number, String],
			default: .5
		},
		scaleMax: {
			type: [Number, String],
			default: 10
		},
		scaleValue: {
			type: [Number, String],
			default: 1
		},
		animation: {
			type: [Boolean, String],
			default: !0
		}
	},
	emits: ["change", "scale"],
	setup(e, {
		slots: t,
		emit: n
	}) {
		const o = Pn(null),
			r = Bu(o, n),
			{
				setParent: i
			} = function(e, t, n) {
				const o = xo("_isMounted", Pn(!1)),
					r = xo("addMovableViewContext", (() => {})),
					i = xo("removeMovableViewContext", (() => {}));
				let s, a, l = Pn(1),
					c = Pn(1),
					u = Pn(!1),
					d = Pn(0),
					f = Pn(0),
					p = null,
					h = null,
					m = !1,
					g = null,
					v = null;
				const b = new oh,
					y = new oh,
					_ = {
						historyX: [0, 0],
						historyY: [0, 0],
						historyT: [0, 0]
					},
					w = Ui((() => {
						let t = Number(e.friction);
						return isNaN(t) || t <= 0 ? 2 : t
					})),
					x = new rh(1, w.value);
				Eo((() => e.disabled), (() => {
					$()
				}));
				const {
					_updateOldScale: T,
					_endScale: S,
					_setScale: E,
					scaleValueSync: k,
					_updateBoundary: A,
					_updateOffset: C,
					_updateWH: B,
					_scaleOffset: P,
					minX: L,
					minY: O,
					maxX: I,
					maxY: M,
					FAandSFACancel: F,
					_getLimitXY: j,
					_setTransform: N,
					_revise: R,
					dampingNumber: D,
					xMove: q,
					yMove: z,
					xSync: H,
					ySync: W,
					_STD: V
				} = function(e, t, n, o, r, i, s, a, l, c) {
					const u = Ui((() => {
							let t = Number(e.scaleMin);
							return isNaN(t) ? .5 : t
						})),
						d = Ui((() => {
							let t = Number(e.scaleMax);
							return isNaN(t) ? 10 : t
						})),
						f = Pn(Number(e.scaleValue) || 1);
					Eo(f, (e => {
						N(e)
					})), Eo(u, (() => {
						j()
					})), Eo(d, (() => {
						j()
					})), Eo((() => e.scaleValue), (e => {
						f.value = Number(e) || 0
					}));
					const {
						_updateBoundary: p,
						_updateOffset: h,
						_updateWH: m,
						_scaleOffset: g,
						minX: v,
						minY: b,
						maxX: y,
						maxY: _
					} = function(e, t, n) {
						const o = xo("movableAreaWidth", Pn(0)),
							r = xo("movableAreaHeight", Pn(0)),
							i = xo("movableAreaRootRef"),
							s = {
								x: 0,
								y: 0
							},
							a = {
								x: 0,
								y: 0
							},
							l = Pn(0),
							c = Pn(0),
							u = Pn(0),
							d = Pn(0),
							f = Pn(0),
							p = Pn(0);

						function h() {
							let e = 0 - s.x + a.x,
								t = o.value - l.value - s.x - a.x;
							u.value = Math.min(e, t), f.value = Math.max(e, t);
							let n = 0 - s.y + a.y,
								i = r.value - c.value - s.y - a.y;
							d.value = Math.min(n, i), p.value = Math.max(n, i)
						}

						function m() {
							s.x = dh(e.value, i.value), s.y = fh(e.value, i.value)
						}

						function g(o) {
							o = o || t.value, o = n(o);
							let r = e.value.getBoundingClientRect();
							c.value = r.height / t.value, l.value = r.width / t.value;
							let i = c.value * o,
								s = l.value * o;
							a.x = (s - l.value) / 2, a.y = (i - c.value) / 2
						}
						return {
							_updateBoundary: h,
							_updateOffset: m,
							_updateWH: g,
							_scaleOffset: a,
							minX: u,
							minY: d,
							maxX: f,
							maxY: p
						}
					}(t, o, F), {
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
					} = function(e, t, n, o, r, i, s, a, l, c, u, d, f, p) {
						const h = Ui((() => {
								let e = Number(t.damping);
								return isNaN(e) ? 20 : e
							})),
							m = Ui((() => "all" === t.direction || "horizontal" === t.direction)),
							g = Ui((() => "all" === t.direction || "vertical" === t.direction)),
							v = Pn(hh(t.x)),
							b = Pn(hh(t.y));
						Eo((() => t.x), (e => {
							v.value = hh(e)
						})), Eo((() => t.y), (e => {
							b.value = hh(e)
						})), Eo(v, (e => {
							E(e)
						})), Eo(b, (e => {
							k(e)
						}));
						const y = new sh(1, 9 * Math.pow(h.value, 2) / 40, h.value);

						function _(e, t) {
							let n = !1;
							return e > r.value ? (e = r.value, n = !0) : e < s.value && (e = s.value, n = !0),
								t > i.value ? (t = i.value, n = !0) : t < a.value && (t = a.value, n = !0), {
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
							e = d.x, n = d.y, t.animation ? (y._springX._solution = null, y._springY._solution =
								null, y._springScale._solution = null, y._springX._endPosition = l.value, y
								._springY._endPosition = c.value, y._springScale._endPosition = o.value, y
								.setEnd(e, n, r, 1), u = ph(y, (function() {
									let e = y.x();
									T(e.x, e.y, e.scale, i, s, a)
								}), (function() {
									u.cancel()
								}))) : T(e, n, r, i, s, a)
						}

						function T(r, i, s, a = "", u, d) {
							null !== r && "NaN" !== r.toString() && "number" == typeof r || (r = l.value || 0),
								null !== i && "NaN" !== i.toString() && "number" == typeof i || (i = c.value ||
									0), r = Number(r.toFixed(1)), i = Number(i.toFixed(1)), s = Number(s
									.toFixed(1)), l.value === r && c.value === i || u || p("change", {}, {
									x: ah(r, n.x),
									y: ah(i, n.y),
									source: a
								}), t.scale || (s = o.value), s = +(s = f(s)).toFixed(3), d && s !== o.value &&
								p("scale", {}, {
									x: r,
									y: i,
									scale: s
								});
							let h = "translateX(" + r + "px) translateY(" + i + "px) translateZ(0px) scale(" +
								s + ")";
							e.value && (e.value.style.transform = h, e.value.style.webkitTransform = h, l
								.value = r, c.value = i, o.value = s)
						}

						function S(e) {
							let t = _(l.value, c.value),
								n = t.x,
								r = t.y,
								i = t.outOfBounds;
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
							t = F(t), m(t), p();
							const e = x(s.value, a.value),
								o = e.x,
								r = e.y;
							n ? T(o, r, t, "", !0, !0) : uh((function() {
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
						scaleValueSync: f,
						_updateBoundary: p,
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
				}(e, n, t, l, c, u, d, f, p, h);

				function $() {
					u.value || e.disabled || (F(), _.historyX = [0, 0], _.historyY = [0, 0], _.historyT = [0,
						0], q.value && (s = d.value), z.value && (a = f.value), n.value.style.willChange =
						"transform", g = null, v = null, m = !0)
				}

				function Q(t) {
					if (!u.value && !e.disabled && m) {
						let n = d.value,
							o = f.value;
						if (null === v && (v = Math.abs(t.detail.dx / t.detail.dy) > 1 ? "htouchmove" :
								"vtouchmove"), q.value && (n = t.detail.dx + s, _.historyX.shift(), _.historyX
								.push(n), z.value || null !== g || (g = Math.abs(t.detail.dx / t.detail.dy) < 1)
								), z.value && (o = t.detail.dy + a, _.historyY.shift(), _.historyY.push(o), q
								.value || null !== g || (g = Math.abs(t.detail.dy / t.detail.dx) < 1)), _
							.historyT.shift(), _.historyT.push(t.detail.timeStamp), !g) {
							t.preventDefault();
							let r = "touch";
							n < L.value ? e.outOfBounds ? (r = "touch-out-of-bounds", n = L.value - b.x(L
									.value - n)) : n = L.value : n > I.value && (e.outOfBounds ? (r =
									"touch-out-of-bounds", n = I.value + b.x(n - I.value)) : n = I.value), o < O
								.value ? e.outOfBounds ? (r = "touch-out-of-bounds", o = O.value - y.x(O.value -
									o)) : o = O.value : o > M.value && (e.outOfBounds ? (r =
									"touch-out-of-bounds", o = M.value + y.x(o - M.value)) : o = M.value), uh((
									function() {
										N(n, o, l.value, r)
									}))
						}
					}
				}

				function U() {
					if (!u.value && !e.disabled && m && (n.value.style.willChange = "auto", m = !1, !g && !R(
							"out-of-bounds") && e.inertia)) {
						const e = 1e3 * (_.historyX[1] - _.historyX[0]) / (_.historyT[1] - _.historyT[0]),
							t = 1e3 * (_.historyY[1] - _.historyY[0]) / (_.historyT[1] - _.historyT[0]),
							n = d.value,
							o = f.value;
						x.setV(e, t), x.setS(n, o);
						const r = x.delta().x,
							i = x.delta().y;
						let s = r + n,
							a = i + o;
						s < L.value ? (s = L.value, a = o + (L.value - n) * i / r) : s > I.value && (s = I
							.value, a = o + (I.value - n) * i / r), a < O.value ? (a = O.value, s = n + (O
							.value - o) * r / i) : a > M.value && (a = M.value, s = n + (M.value - o) * r /
							i), x.setEnd(s, a), h = ph(x, (function() {
							let e = x.s(),
								t = e.x,
								n = e.y;
							N(t, n, l.value, "friction")
						}), (function() {
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
					let n = j(H.value + P.x, W.value + P.y),
						r = n.x,
						i = n.y;
					N(r, i, t, "", !0), T(t)
				}
				return sr((() => {
					eh(n.value, (e => {
						switch (e.detail.state) {
							case "start":
								$();
								break;
							case "move":
								Q(e);
								break;
							case "end":
								U()
						}
					})), X(), x.reconfigure(1, w.value), V.reconfigure(1, 9 * Math.pow(D.value,
						2) / 40, D.value), n.value.style.transformOrigin = "center";
					const e = {
						rootRef: n,
						setParent: X,
						_endScale: S,
						_setScale: E
					};
					r(e), ur((() => {
						i(e)
					}))
				})), ur((() => {
					F()
				})), {
					setParent: X
				}
			}(e, r, o);
		return () => ki("uni-movable-view", {
			ref: o
		}, [ki(lp, {
			onResize: i
		}, null, 8, ["onResize"]), t.default && t.default()], 512)
	}
});
let ch = !1;

function uh(e) {
	ch || (ch = !0, requestAnimationFrame((function() {
		e(), ch = !1
	})))
}

function dh(e, t) {
	if (e === t) return 0;
	let n = e.offsetLeft;
	return e.offsetParent ? n += dh(e.offsetParent, t) : 0
}

function fh(e, t) {
	if (e === t) return 0;
	let n = e.offsetTop;
	return e.offsetParent ? n += fh(e.offsetParent, t) : 0
}

function ph(e, t, n) {
	let o = {
		id: 0,
		cancelled: !1
	};
	return function e(t, n, o, r) {
		if (!t || !t.cancelled) {
			o(n);
			let i = n.done();
			i || t.cancelled || (t.id = requestAnimationFrame(e.bind(null, t, n, o, r))), i && r && r(n)
		}
	}(o, e, t, n), {
		cancel: function(e) {
			e && e.id && cancelAnimationFrame(e.id), e && (e.cancelled = !0)
		}.bind(null, o),
		model: e
	}
}

function hh(e) {
	return /\d+[ur]px$/i.test(e) ? Rd(parseFloat(e)) : Number(e) || 0
}
const mh = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"],
	gh = ["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out", "zoom-fade-out",
		"pop-in", "none"
	],
	vh = ["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in",
		"zoom-fade-in", "pop-out", "none"
	],
	bh = {
		hoverClass: {
			type: String,
			default: "navigator-hover"
		},
		url: {
			type: String,
			default: ""
		},
		openType: {
			type: String,
			default: "navigate",
			validator: e => Boolean(~mh.indexOf(e))
		},
		delta: {
			type: Number,
			default: 1
		},
		hoverStartTime: {
			type: [Number, String],
			default: 50
		},
		hoverStayTime: {
			type: [Number, String],
			default: 600
		},
		exists: {
			type: String,
			default: ""
		},
		hoverStopPropagation: {
			type: Boolean,
			default: !1
		},
		animationType: {
			type: String,
			default: "",
			validator: e => !e || gh.concat(vh).includes(e)
		},
		animationDuration: {
			type: [String, Number],
			default: 300
		}
	};
x({}, bh, {
	renderLink: {
		type: Boolean,
		default: !0
	}
});
const yh = Tu({
	name: "PickerView",
	props: {
		value: {
			type: Array,
			default: () => [],
			validator: function(e) {
				return k(e) && e.filter((e => "number" == typeof e)).length === e.length
			}
		},
		indicatorStyle: {
			type: String,
			default: ""
		},
		indicatorClass: {
			type: String,
			default: ""
		},
		maskStyle: {
			type: String,
			default: ""
		},
		maskClass: {
			type: String,
			default: ""
		}
	},
	emits: ["change", "pickstart", "pickend", "update:value"],
	setup(e, {
		slots: t,
		emit: n
	}) {
		const o = Pn(null),
			r = Pn(null),
			i = Bu(o, n),
			s = function(e) {
				const t = gn([...e.value]),
					n = gn({
						value: t,
						height: 34
					});
				return Eo((() => e.value), ((e, t) => {
					n.value.length = e.length, e.forEach(((e, t) => {
						e !== n.value[t] && n.value.splice(t, 1, e)
					}))
				})), n
			}(e),
			a = Pn(null);
		sr((() => {
			const e = a.value;
			s.height = e.$el.offsetHeight
		}));
		let l = Pn([]),
			c = Pn([]);

		function u(e) {
			let t = c.value;
			t = t.filter((e => e.type !== ui));
			let n = t.indexOf(e);
			return -1 !== n ? n : l.value.indexOf(e)
		}
		return wo("getPickerViewColumn", (function(e) {
			return Ui({
				get() {
					const t = u(e.vnode);
					return s.value[t] || 0
				},
				set(t) {
					const o = u(e.vnode);
					if (o < 0) return;
					if (s.value[o] !== t) {
						s.value[o] = t;
						const e = s.value.map((e => e));
						n("update:value", e), i("change", {}, {
							value: e
						})
					}
				}
			})
		})), wo("pickerViewProps", e), wo("pickerViewState", s), () => {
			const e = t.default && t.default(); {
				const t = Xp(e);
				l.value = t, Zn((() => {
					c.value = t
				}))
			}
			return ki("uni-picker-view", {
				ref: o
			}, [ki(lp, {
				ref: a,
				onResize: ({
					height: e
				}) => s.height = e
			}, null, 8, ["onResize"]), ki("div", {
				ref: r,
				class: "uni-picker-view-wrapper"
			}, [e], 512)], 512)
		}
	}
});
class _h {
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
		const t = this.x(),
			n = this.dx();
		this._drag = e, this._dragLog = Math.log(e), this.set(t, n)
	}
	configuration() {
		const e = this;
		return [{
			label: "Friction",
			read: function() {
				return e._drag
			},
			write: function(t) {
				e.reconfigure(t)
			},
			min: .001,
			max: .1,
			step: .001
		}]
	}
}

function wh(e, t, n) {
	return e > t - n && e < t + n
}

function xh(e, t) {
	return wh(e, 0, t)
}
class Th {
	constructor(e, t, n) {
		this._m = e, this._k = t, this._c = n, this._solution = null, this._endPosition = 0, this._startTime = 0
	}
	_solve(e, t) {
		const n = this._c,
			o = this._m,
			r = this._k,
			i = n * n - 4 * o * r;
		if (0 === i) {
			const r = -n / (2 * o),
				i = e,
				s = t / (r * e);
			return {
				x: function(e) {
					return (i + s * e) * Math.pow(Math.E, r * e)
				},
				dx: function(e) {
					const t = Math.pow(Math.E, r * e);
					return r * (i + s * e) * t + s * t
				}
			}
		}
		if (i > 0) {
			const r = (-n - Math.sqrt(i)) / (2 * o),
				s = (-n + Math.sqrt(i)) / (2 * o),
				a = (t - r * e) / (s - r),
				l = e - a;
			return {
				x: function(e) {
					let t, n;
					return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this
						._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s *
						e)), l * t + a * n
				},
				dx: function(e) {
					let t, n;
					return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this
						._powER1T = Math.pow(Math.E, r * e)), n || (n = this._powER2T = Math.pow(Math.E, s *
						e)), l * r * t + a * s * n
				}
			}
		}
		const s = Math.sqrt(4 * o * r - n * n) / (2 * o),
			a = -n / 2 * o,
			l = e,
			c = (t - a * e) / s;
		return {
			x: function(e) {
				return Math.pow(Math.E, a * e) * (l * Math.cos(s * e) + c * Math.sin(s * e))
			},
			dx: function(e) {
				const t = Math.pow(Math.E, a * e),
					n = Math.cos(s * e),
					o = Math.sin(s * e);
				return t * (c * s * n - l * s * o) + a * t * (c * o + l * n)
			}
		}
	}
	x(e) {
		return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this
			._endPosition + this._solution.x(e) : 0
	}
	dx(e) {
		return void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution
			.dx(e) : 0
	}
	setEnd(e, t, n) {
		if (n || (n = (new Date).getTime()), e !== this._endPosition || !xh(t, .4)) {
			t = t || 0;
			let o = this._endPosition;
			this._solution && (xh(t, .4) && (t = this._solution.dx((n - this._startTime) / 1e3)), o = this._solution
				.x((n - this._startTime) / 1e3), xh(t, .4) && (t = 0), xh(o, .4) && (o = 0), o += this
				._endPosition), this._solution && xh(o - e, .4) && xh(t, .4) || (this._endPosition = e, this
				._solution = this._solve(o - this._endPosition, t), this._startTime = n)
		}
	}
	snap(e) {
		this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
			x: function() {
				return 0
			},
			dx: function() {
				return 0
			}
		}
	}
	done(e) {
		return e || (e = (new Date).getTime()), wh(this.x(), this._endPosition, .4) && xh(this.dx(), .4)
	}
	reconfigure(e, t, n) {
		this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this
			._endPosition, this.dx()), this._startTime = (new Date).getTime())
	}
	springConstant() {
		return this._k
	}
	damping() {
		return this._c
	}
	configuration() {
		return [{
			label: "Spring Constant",
			read: this.springConstant.bind(this),
			write: function(e, t) {
				e.reconfigure(1, t, e.damping())
			}.bind(this, this),
			min: 100,
			max: 1e3
		}, {
			label: "Damping",
			read: this.damping.bind(this),
			write: function(e, t) {
				e.reconfigure(1, e.springConstant(), t)
			}.bind(this, this),
			min: 1,
			max: 500
		}]
	}
}
class Sh {
	constructor(e, t, n) {
		this._extent = e, this._friction = t || new _h(.01), this._spring = n || new Th(1, 90, 20), this
			._startTime = 0, this._springing = !1, this._springOffset = 0
	}
	snap(e, t) {
		this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(t)
	}
	set(e, t) {
		this._friction.set(e, t), e > 0 && t >= 0 ? (this._springOffset = 0, this._springing = !0, this._spring
				.snap(e), this._spring.setEnd(0)) : e < -this._extent && t <= 0 ? (this._springOffset = 0, this
				._springing = !0, this._spring.snap(e), this._spring.setEnd(-this._extent)) : this._springing = !1,
			this._startTime = (new Date).getTime()
	}
	x(e) {
		if (!this._startTime) return 0;
		if (e || (e = ((new Date).getTime() - this._startTime) / 1e3), this._springing) return this._spring.x() +
			this._springOffset;
		let t = this._friction.x(e),
			n = this.dx(e);
		return (t > 0 && n >= 0 || t < -this._extent && n <= 0) && (this._springing = !0, this._spring.setEnd(0, n),
			t < -this._extent ? this._springOffset = -this._extent : this._springOffset = 0, t = this._spring
			.x() + this._springOffset), t
	}
	dx(e) {
		let t;
		return t = this._lastTime === e ? this._lastDx : this._springing ? this._spring.dx(e) : this._friction.dx(
			e), this._lastTime = e, this._lastDx = t, t
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
class Eh {
	constructor(e, t) {
		t = t || {}, this._element = e, this._options = t, this._enableSnap = t.enableSnap || !1, this._itemSize = t
			.itemSize || 0, this._enableX = t.enableX || !1, this._enableY = t.enableY || !1, this
			._shouldDispatchScrollEvent = !!t.onScroll, this._enableX ? (this._extent = (t.scrollWidth || this
					._element.offsetWidth) - this._element.parentElement.offsetWidth, this._scrollWidth = t
				.scrollWidth) : (this._extent = (t.scrollHeight || this._element.offsetHeight) - this._element
				.parentElement.offsetHeight, this._scrollHeight = t.scrollHeight), this._position = 0, this
			._scroll = new Sh(this._extent, t.friction, t.spring), this._onTransitionEnd = this.onTransitionEnd
			.bind(this), this.updatePosition()
	}
	onTouchStart() {
		this._startPosition = this._position, this._lastChangePos = this._startPosition, this._startPosition > 0 ?
			this._startPosition /= .5 : this._startPosition < -this._extent && (this._startPosition = (this
				._startPosition + this._extent) / .5 - this._extent), this._animation && (this._animation.cancel(),
				this._scrolling = !1), this.updatePosition()
	}
	onTouchMove(e, t) {
		let n = this._startPosition;
		this._enableX ? n += e : this._enableY && (n += t), n > 0 ? n *= .5 : n < -this._extent && (n = .5 * (n +
			this._extent) - this._extent), this._position = n, this.updatePosition(), this.dispatchScroll()
	}
	onTouchEnd(e, t, n) {
		if (this._enableSnap && this._position > -this._extent && this._position < 0) {
			if (this._enableY && (Math.abs(t) < this._itemSize && Math.abs(n.y) < 300 || Math.abs(n.y) < 150))
				return void this.snap();
			if (this._enableX && (Math.abs(e) < this._itemSize && Math.abs(n.x) < 300 || Math.abs(n.x) < 150))
				return void this.snap()
		}
		let o;
		if (this._enableX ? this._scroll.set(this._position, n.x) : this._enableY && this._scroll.set(this
				._position, n.y), this._enableSnap) {
			const e = this._scroll._friction.x(100),
				t = e % this._itemSize;
			o = Math.abs(t) > this._itemSize / 2 ? e - (this._itemSize - Math.abs(t)) : e - t, o <= 0 && o >= -this
				._extent && this._scroll.setVelocityByEnd(o)
		}
		this._lastTime = Date.now(), this._lastDelay = 0, this._scrolling = !0, this._lastChangePos = this
			._position, this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize)), this._animation =
			function(e, t, n) {
				const o = {
					id: 0,
					cancelled: !1
				};
				return function e(t, n, o, r) {
					if (!t || !t.cancelled) {
						o(n);
						const i = n.done();
						i || t.cancelled || (t.id = requestAnimationFrame(e.bind(null, t, n, o, r))), i && r &&
							r(n)
					}
				}(o, e, t, n), {
					cancel: function(e) {
						e && e.id && cancelAnimationFrame(e.id), e && (e.cancelled = !0)
					}.bind(null, o),
					model: e
				}
			}(this._scroll, (() => {
				const e = Date.now(),
					t = (e - this._scroll._startTime) / 1e3,
					n = this._scroll.x(t);
				this._position = n, this.updatePosition();
				const o = this._scroll.dx(t);
				this._shouldDispatchScrollEvent && e - this._lastTime > this._lastDelay && (this
					.dispatchScroll(), this._lastDelay = Math.abs(2e3 / o), this._lastTime = e)
			}), (() => {
				this._enableSnap && (o <= 0 && o >= -this._extent && (this._position = o, this
						.updatePosition()), B(this._options.onSnap) && this._options.onSnap(Math.floor(
						Math.abs(this._position) / this._itemSize))), this._shouldDispatchScrollEvent &&
					this.dispatchScroll(), this._scrolling = !1
			}))
	}
	onTransitionEnd() {
		this._element.style.webkitTransition = "", this._element.style.transition = "", this._element
			.removeEventListener("transitionend", this._onTransitionEnd), this._snapping && (this._snapping = !1),
			this.dispatchScroll()
	}
	snap() {
		const e = this._itemSize,
			t = this._position % e,
			n = Math.abs(t) > this._itemSize / 2 ? this._position - (e - Math.abs(t)) : this._position - t;
		this._position !== n && (this._snapping = !0, this.scrollTo(-n), B(this._options.onSnap) && this._options
			.onSnap(Math.floor(Math.abs(this._position) / this._itemSize)))
	}
	scrollTo(e, t) {
		this._animation && (this._animation.cancel(), this._scrolling = !1), "number" == typeof e && (this
				._position = -e), this._position < -this._extent ? this._position = -this._extent : this._position >
			0 && (this._position = 0);
		const n = "transform " + (t || .2) + "s ease-out";
		this._element.style.webkitTransition = "-webkit-" + n, this._element.style.transition = n, this
			.updatePosition(), this._element.addEventListener("transitionend", this._onTransitionEnd)
	}
	dispatchScroll() {
		if (B(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
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
		this._enableX ? (o = this._element.childNodes.length ? (t || this._element.offsetWidth) - this._element
				.parentElement.offsetWidth : 0, this._scrollWidth = t) : (o = this._element.childNodes.length ? (
					t || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0, this
				._scrollHeight = t), "number" == typeof e && (this._position = -e), this._position < -o ? this
			._position = -o : this._position > 0 && (this._position = 0), this._itemSize = n || this._itemSize, this
			.updatePosition(), r !== this._position && (this.dispatchScroll(), B(this._options.onSnap) && this
				._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))), this._extent = o, this
			._scroll._extent = o
	}
	updatePosition() {
		let e = "";
		this._enableX ? e = "translateX(" + this._position + "px) translateZ(0)" : this._enableY && (e =
				"translateY(" + this._position + "px) translateZ(0)"), this._element.style.webkitTransform = e, this
			._element.style.transform = e
	}
	isScrolling() {
		return this._scrolling || this._snapping
	}
}
let kh = 0;
const Ah = Tu({
		name: "PickerViewColumn",
		setup(e, {
			slots: t,
			emit: n
		}) {
			const o = Pn(null),
				r = Pn(null),
				i = xo("getPickerViewColumn"),
				s = Ri(),
				a = i ? i(s) : Pn(0),
				l = xo("pickerViewProps"),
				c = xo("pickerViewState"),
				u = Pn(34),
				d = Pn(null);
			sr((() => {
				const e = d.value;
				u.value = e.$el.offsetHeight
			}));
			const f = Ui((() => (c.height - u.value) / 2)),
				{
					state: p
				} = Fp(),
				h = function(e) {
					const t = "uni-picker-view-content-" + kh++;
					return Eo((() => e.value), (function() {
						const n = document.createElement("style");
						n.innerText =
							`.uni-picker-view-content.${t}>*{height: ${e.value}px;overflow: hidden;}`,
							document.head.appendChild(n)
					})), t
				}(u);
			let m;
			const g = gn({
				current: a.value,
				length: 0
			});
			let v;

			function b() {
				m && !v && (v = !0, Zn((() => {
					v = !1;
					let e = Math.min(g.current, g.length - 1);
					e = Math.max(e, 0), m.update(e * u.value, void 0, u.value)
				})))
			}
			Eo((() => a.value), (e => {
				e !== g.current && (g.current = e, b())
			})), Eo((() => g.current), (e => a.value = e)), Eo([() => u.value, () => g.length, () => c.height],
				b);
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

			function w({
				clientY: e
			}) {
				const t = o.value;
				if (!m.isScrolling()) {
					const n = e - t.getBoundingClientRect().top - c.height / 2,
						o = u.value / 2;
					if (!(Math.abs(n) <= o)) {
						const e = Math.ceil((Math.abs(n) - o) / u.value),
							t = n < 0 ? -e : e;
						let r = Math.min(g.current + t, g.length - 1);
						g.current = r = Math.max(r, 0), m.scrollTo(r * u.value)
					}
				}
			}
			const x = () => {
				const e = o.value,
					t = r.value,
					{
						scroller: n,
						handleTouchStart: i,
						handleTouchMove: s,
						handleTouchEnd: a
					} = function(e, t) {
						const n = {
								trackingID: -1,
								maxDy: 0,
								maxDx: 0
							},
							o = new Eh(e, t);

						function r(e) {
							const t = e,
								o = e;
							return "move" === t.detail.state || "end" === t.detail.state ? {
								x: t.detail.dx,
								y: t.detail.dy
							} : {
								x: o.screenX - n.x,
								y: o.screenY - n.y
							}
						}
						return {
							scroller: o,
							handleTouchStart: function(e) {
								const t = e,
									r = e;
								"start" === t.detail.state ? (n.trackingID = "touch", n.x = t.detail.x, n
										.y = t.detail.y) : (n.trackingID = "mouse", n.x = r.screenX, n.y = r
										.screenY), n.maxDx = 0, n.maxDy = 0, n.historyX = [0], n
									.historyY = [0], n.historyTime = [t.detail.timeStamp || r.timeStamp], n
									.listener = o, o.onTouchStart && o.onTouchStart(), ("boolean" !=
										typeof e.cancelable || e.cancelable) && e.preventDefault()
							},
							handleTouchMove: function(e) {
								const t = e,
									o = e;
								if (-1 !== n.trackingID) {
									("boolean" != typeof e.cancelable || e.cancelable) && e
								.preventDefault();
									const i = r(e);
									if (i) {
										for (n.maxDy = Math.max(n.maxDy, Math.abs(i.y)), n.maxDx = Math.max(
												n.maxDx, Math.abs(i.x)), n.historyX.push(i.x), n.historyY
											.push(i.y), n.historyTime.push(t.detail.timeStamp || o
												.timeStamp); n.historyTime.length > 10;) n.historyTime
											.shift(), n.historyX.shift(), n.historyY.shift();
										n.listener && n.listener.onTouchMove && n.listener.onTouchMove(i.x,
											i.y)
									}
								}
							},
							handleTouchEnd: function(e) {
								if (-1 !== n.trackingID) {
									e.preventDefault();
									const t = r(e);
									if (t) {
										const e = n.listener;
										n.trackingID = -1, n.listener = null;
										const o = {
											x: 0,
											y: 0
										};
										if (n.historyTime.length > 2)
											for (let t = n.historyTime.length - 1, r = n.historyTime[t], i =
													n.historyX[t], s = n.historyY[t]; t > 0;) {
												t--;
												const e = r - n.historyTime[t];
												if (e > 30 && e < 50) {
													o.x = (i - n.historyX[t]) / (e / 1e3), o.y = (s - n
														.historyY[t]) / (e / 1e3);
													break
												}
											}
										n.historyTime = [], n.historyX = [], n.historyY = [], e && e
											.onTouchEnd && e.onTouchEnd(t.x, t.y, o)
									}
								}
							}
						}
					}(t, {
						enableY: !0,
						enableX: !1,
						enableSnap: !0,
						itemSize: u.value,
						friction: new _h(1e-4),
						spring: new Th(2, 90, 20),
						onSnap: e => {
							isNaN(e) || e === g.current || (g.current = e)
						}
					});
				m = n, eh(e, (e => {
						switch (e.detail.state) {
							case "start":
								i(e);
								break;
							case "move":
								s(e), e.stopPropagation();
								break;
							case "end":
							case "cancel":
								a(e)
						}
					}), !0),
					function(e) {
						let t = 0,
							n = 0;
						e.addEventListener("touchstart", (e => {
							const o = e.changedTouches[0];
							t = o.clientX, n = o.clientY
						})), e.addEventListener("touchend", (e => {
							const o = e.changedTouches[0];
							if (Math.abs(o.clientX - t) < 20 && Math.abs(o.clientY - n) < 20) {
								const t = {
										bubbles: !0,
										cancelable: !0,
										target: e.target,
										currentTarget: e.currentTarget
									},
									n = new CustomEvent("click", t);
								["screenX", "screenY", "clientX", "clientY", "pageX", "pageY"]
								.forEach((e => {
									n[e] = o[e]
								})), e.target.dispatchEvent(n)
							}
						}))
					}(e), b()
			};
			return sr(x), () => {
				const e = t.default && t.default();
				g.length = Xp(e).length;
				const n = `${f.value}px 0`;
				return ki("uni-picker-view-column", {
					ref: o
				}, [ki("div", {
					onWheel: _,
					onClick: w,
					class: "uni-picker-view-group"
				}, [ki("div", Ii(p.attrs, {
					class: ["uni-picker-view-mask", l.maskClass],
					style: `background-size: 100% ${f.value}px;${l.maskStyle}`
				}), null, 16), ki("div", Ii(p.attrs, {
					class: ["uni-picker-view-indicator", l.indicatorClass],
					style: l.indicatorStyle
				}), [ki(lp, {
					ref: d,
					onResize: ({
						height: e
					}) => u.value = e
				}, null, 8, ["onResize"])], 16), ki("div", {
					ref: r,
					class: ["uni-picker-view-content", h],
					style: {
						padding: n
					}
				}, [e], 6)], 40, ["onWheel", "onClick"])], 512)
			}
		}
	}),
	Ch = {
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
	},
	Bh = {
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
const Ph = (e, t, n) => !n || k(n) && !n.length ? [] : n.map((n => {
	if (j(n)) {
		if (!E(n, "type") || "node" === n.type) {
			let o = {
				[e]: ""
			};
			const r = n.name.toLowerCase();
			if (!E(Ch, r)) return;
			return function(e, t) {
				if (j(t))
					for (const n in t)
						if (E(t, n)) {
							const o = t[n];
							"img" === e && "src" === n && (t[n] = Nu(o))
						}
			}(r, n.attrs), o = x(o, function(e, t) {
				if (["a", "img"].includes(e.name) && t) return {
					onClick: n => {
						t(n, {
							node: e
						}), n.stopPropagation(), n.preventDefault(), n.returnValue = !1
					}
				}
			}(n, t), n.attrs), Xi(n.name, o, Ph(e, t, n.children))
		}
		return "text" === n.type && P(n.text) && "" !== n.text ? Ci((n.text || "").replace(
			/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, (function(e, t) {
				return E(Bh, t) && Bh[t] ? Bh[t] : /^#[0-9]{1,4}$/.test(t) ? String
					.fromCharCode(t.slice(1)) : /^#x[0-9a-f]{1,4}$/i.test(t) ? String
					.fromCharCode(0 + t.slice(1)) : e
			}))) : void 0
	}
}));

function Lh(e) {
	e = function(e) {
		return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "")
	}(e);
	const t = [],
		n = {
			node: "root",
			children: []
		};
	return function(e, t) {
		var n, o, r, i = [],
			s = e;
		for (i.last = function() {
				return this[this.length - 1]
			}; e;) {
			if (o = !0, i.last() && _p[i.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + i.last() + "[^>]*>"),
				(function(e, n) {
					return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars &&
						t.chars(n), ""
				})), c("", i.last());
			else if (0 == e.indexOf("\x3c!--") ? (n = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e
					.substring(4, n)), e = e.substring(n + 3), o = !1) : 0 == e.indexOf("</") ? (r = e.match(pp)) &&
				(e = e.substring(r[0].length), r[0].replace(pp, c), o = !1) : 0 == e.indexOf("<") && (r = e.match(
					fp)) && (e = e.substring(r[0].length), r[0].replace(fp, l), o = !1), o) {
				var a = (n = e.indexOf("<")) < 0 ? e : e.substring(0, n);
				e = n < 0 ? "" : e.substring(n), t.chars && t.chars(a)
			}
			if (e == s) throw "Parse Error: " + e;
			s = e
		}

		function l(e, n, o, r) {
			if (n = n.toLowerCase(), gp[n])
				for (; i.last() && vp[i.last()];) c("", i.last());
			if (bp[n] && i.last() == n && c("", n), (r = mp[n] || !!r) || i.push(n), t.start) {
				var s = [];
				o.replace(hp, (function(e, t) {
					var n = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ?
						arguments[4] : yp[t] ? t : "";
					s.push({
						name: t,
						value: n,
						escaped: n.replace(/(^|[^\\])"/g, '$1\\"')
					})
				})), t.start && t.start(n, s, r)
			}
		}

		function c(e, n) {
			if (n)
				for (o = i.length - 1; o >= 0 && i[o] != n; o--);
			else var o = 0;
			if (o >= 0) {
				for (var r = i.length - 1; r >= o; r--) t.end && t.end(i[r]);
				i.length = o
			}
		}
		c()
	}(e, {
		start: function(e, o, r) {
			const i = {
				name: e
			};
			if (0 !== o.length && (i.attrs = function(e) {
					return e.reduce((function(e, t) {
						let n = t.value;
						const o = t.name;
						return n.match(/ /) && -1 === ["style", "src"].indexOf(o) && (n = n
							.split(" ")), e[o] ? Array.isArray(e[o]) ? e[o].push(n) : e[
							o] = [e[o], n] : e[o] = n, e
					}), {})
				}(o)), r) {
				const e = t[0] || n;
				e.children || (e.children = []), e.children.push(i)
			} else t.unshift(i)
		},
		end: function(e) {
			const o = t.shift();
			if (o.name !== e && console.error("invalid state: mismatch end tag"), 0 === t.length) n.children
				.push(o);
			else {
				const e = t[0];
				e.children || (e.children = []), e.children.push(o)
			}
		},
		chars: function(e) {
			const o = {
				type: "text",
				text: e
			};
			if (0 === t.length) n.children.push(o);
			else {
				const e = t[0];
				e.children || (e.children = []), e.children.push(o)
			}
		},
		comment: function(e) {
			const n = {
					node: "comment",
					text: e
				},
				o = t[0];
			o.children || (o.children = []), o.children.push(n)
		}
	}), n.children
}
const Oh = Tu({
		name: "RichText",
		compatConfig: {
			MODE: 3
		},
		props: {
			nodes: {
				type: [Array, String],
				default: function() {
					return []
				}
			}
		},
		emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "longpress", "itemclick"],
		setup(e, {
			emit: t
		}) {
			const n = Ri(),
				o = n && n.vnode.scopeId || "",
				r = Pn(null),
				i = Pn([]),
				s = Bu(r, t);

			function a(e, t = {}) {
				s("itemclick", e, t)
			}
			return Eo((() => e.nodes), (function() {
				let t = e.nodes;
				P(t) && (t = Lh(e.nodes)), i.value = Ph(o, a, t)
			}), {
				immediate: !0
			}), () => Xi("uni-rich-text", {
				ref: r
			}, Xi("div", {}, i.value))
		}
	}),
	Ih = We(!0),
	Mh = Tu({
		name: "ScrollView",
		compatConfig: {
			MODE: 3
		},
		props: {
			scrollX: {
				type: [Boolean, String],
				default: !1
			},
			scrollY: {
				type: [Boolean, String],
				default: !1
			},
			upperThreshold: {
				type: [Number, String],
				default: 50
			},
			lowerThreshold: {
				type: [Number, String],
				default: 50
			},
			scrollTop: {
				type: [Number, String],
				default: 0
			},
			scrollLeft: {
				type: [Number, String],
				default: 0
			},
			scrollIntoView: {
				type: String,
				default: ""
			},
			scrollWithAnimation: {
				type: [Boolean, String],
				default: !1
			},
			enableBackToTop: {
				type: [Boolean, String],
				default: !1
			},
			refresherEnabled: {
				type: [Boolean, String],
				default: !1
			},
			refresherThreshold: {
				type: Number,
				default: 45
			},
			refresherDefaultStyle: {
				type: String,
				default: "back"
			},
			refresherBackground: {
				type: String,
				default: "#fff"
			},
			refresherTriggered: {
				type: [Boolean, String],
				default: !1
			}
		},
		emits: ["scroll", "scrolltoupper", "scrolltolower", "refresherrefresh", "refresherrestore",
			"refresherpulling", "refresherabort", "update:refresherTriggered"
		],
		setup(e, {
			emit: t,
			slots: n
		}) {
			const o = Pn(null),
				r = Pn(null),
				i = Pn(null),
				s = Pn(null),
				a = Pn(null),
				l = Bu(o, t),
				{
					state: c,
					scrollTopNumber: u,
					scrollLeftNumber: d
				} = function(e) {
					const t = Ui((() => Number(e.scrollTop) || 0)),
						n = Ui((() => Number(e.scrollLeft) || 0)),
						o = gn({
							lastScrollTop: t.value,
							lastScrollLeft: n.value,
							lastScrollToUpperTime: 0,
							lastScrollToLowerTime: 0,
							refresherHeight: 0,
							refreshRotate: 0,
							refreshState: ""
						});
					return {
						state: o,
						scrollTopNumber: t,
						scrollLeftNumber: n
					}
				}(e);
			! function(e, t, n, o, r, i, s, a, l) {
				let c = !1,
					u = 0,
					d = !1,
					f = () => {};
				const p = Ui((() => {
						let t = Number(e.upperThreshold);
						return isNaN(t) ? 50 : t
					})),
					h = Ui((() => {
						let t = Number(e.lowerThreshold);
						return isNaN(t) ? 50 : t
					}));

				function m(e, t) {
					const n = s.value;
					let o = 0,
						r = "";
					if (e < 0 ? e = 0 : "x" === t && e > n.scrollWidth - n.offsetWidth ? e = n.scrollWidth - n
						.offsetWidth : "y" === t && e > n.scrollHeight - n.offsetHeight && (e = n.scrollHeight - n
							.offsetHeight), "x" === t ? o = n.scrollLeft - e : "y" === t && (o = n.scrollTop - e),
						0 === o) return;
					let i = a.value;
					i.style.transition = "transform .3s ease-out", i.style.webkitTransition =
						"-webkit-transform .3s ease-out", "x" === t ? r = "translateX(" + o + "px) translateZ(0)" :
						"y" === t && (r = "translateY(" + o + "px) translateZ(0)"), i.removeEventListener(
							"transitionend", f), i.removeEventListener("webkitTransitionEnd", f), f = () => _(e, t),
						i.addEventListener("transitionend", f), i.addEventListener("webkitTransitionEnd", f),
						"x" === t ? n.style.overflowX = "hidden" : "y" === t && (n.style.overflowY = "hidden"), i
						.style.transform = r, i.style.webkitTransform = r
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
						}), e.scrollY && (o.scrollTop <= p.value && t.lastScrollTop - o.scrollTop > 0 && n
							.timeStamp - t.lastScrollToUpperTime > 200 && (r("scrolltoupper", n, {
								direction: "top"
							}), t.lastScrollToUpperTime = n.timeStamp), o.scrollTop + o.offsetHeight + h.value >= o
							.scrollHeight && t.lastScrollTop - o.scrollTop < 0 && n.timeStamp - t
							.lastScrollToLowerTime > 200 && (r("scrolltolower", n, {
								direction: "bottom"
							}), t.lastScrollToLowerTime = n.timeStamp)), e.scrollX && (o.scrollLeft <= p.value && t
							.lastScrollLeft - o.scrollLeft > 0 && n.timeStamp - t.lastScrollToUpperTime > 200 && (r(
								"scrolltoupper", n, {
									direction: "left"
								}), t.lastScrollToUpperTime = n.timeStamp), o.scrollLeft + o.offsetWidth + h
							.value >= o.scrollWidth && t.lastScrollLeft - o.scrollLeft < 0 && n.timeStamp - t
							.lastScrollToLowerTime > 200 && (r("scrolltolower", n, {
								direction: "right"
							}), t.lastScrollToLowerTime = n.timeStamp)), t.lastScrollTop = o.scrollTop, t
						.lastScrollLeft = o.scrollLeft
				}

				function v(t) {
					e.scrollY && (e.scrollWithAnimation ? m(t, "y") : s.value.scrollTop = t)
				}

				function b(t) {
					e.scrollX && (e.scrollWithAnimation ? m(t, "x") : s.value.scrollLeft = t)
				}

				function y(t) {
					if (t) {
						if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(t)) return void console.error(
							`id error: scroll-into-view=${t}`);
						let n = i.value.querySelector("#" + t);
						if (n) {
							let t = s.value.getBoundingClientRect(),
								o = n.getBoundingClientRect();
							if (e.scrollX) {
								let n = o.left - t.left,
									r = s.value.scrollLeft + n;
								e.scrollWithAnimation ? m(r, "x") : s.value.scrollLeft = r
							}
							if (e.scrollY) {
								let n = o.top - t.top,
									r = s.value.scrollTop + n;
								e.scrollWithAnimation ? m(r, "y") : s.value.scrollTop = r
							}
						}
					}
				}

				function _(t, n) {
					a.value.style.transition = "", a.value.style.webkitTransition = "", a.value.style.transform =
						"", a.value.style.webkitTransform = "";
					let o = s.value;
					"x" === n ? (o.style.overflowX = e.scrollX ? "auto" : "hidden", o.scrollLeft = t) : "y" === n &&
						(o.style.overflowY = e.scrollY ? "auto" : "hidden", o.scrollTop = t), a.value
						.removeEventListener("transitionend", f), a.value.removeEventListener("webkitTransitionEnd",
							f)
				}

				function w(n) {
					if (e.refresherEnabled) {
						switch (n) {
							case "refreshing":
								t.refresherHeight = e.refresherThreshold, c || (c = !0, r(
									"refresherrefresh", {}, {}), l("update:refresherTriggered", !0));
								break;
							case "restore":
							case "refresherabort":
								c = !1, t.refresherHeight = u = 0, "restore" === n && (d = !1, r(
								"refresherrestore", {}, {})), "refresherabort" === n && d && (d = !1, r(
									"refresherabort", {}, {}))
						}
						t.refreshState = n
					}
				}
				sr((() => {
					Zn((() => {
						v(n.value), b(o.value)
					})), y(e.scrollIntoView);
					let i = function(e) {
							e.preventDefault(), e.stopPropagation(), g(e)
						},
						a = {
							x: 0,
							y: 0
						},
						l = null,
						f = function(n) {
							if (null === a) return;
							let o = n.touches[0].pageX,
								i = n.touches[0].pageY,
								f = s.value;
							if (Math.abs(o - a.x) > Math.abs(i - a.y))
								if (e.scrollX) {
									if (0 === f.scrollLeft && o > a.x) return void(l = !1);
									if (f.scrollWidth === f.offsetWidth + f.scrollLeft && o < a.x)
										return void(l = !1);
									l = !0
								} else l = !1;
							else if (e.scrollY)
								if (0 === f.scrollTop && i > a.y) l = !1, e.refresherEnabled && !1 !== n
									.cancelable && n.preventDefault();
								else {
									if (f.scrollHeight === f.offsetHeight + f.scrollTop && i < a.y)
										return void(l = !1);
									l = !0
								}
							else l = !1;
							if (l && n.stopPropagation(), 0 === f.scrollTop && 1 === n.touches.length &&
								w("pulling"), e.refresherEnabled && "pulling" === t.refreshState) {
								const o = i - a.y;
								0 === u && (u = i), c ? (t.refresherHeight = o + e.refresherThreshold,
									d = !1) : (t.refresherHeight = i - u, t.refresherHeight > 0 && (
									d = !0, r("refresherpulling", n, {
										deltaY: o
									})));
								const s = t.refresherHeight / e.refresherThreshold;
								t.refreshRotate = 360 * (s > 1 ? 1 : s)
							}
						},
						p = function(e) {
							1 === e.touches.length && (a = {
								x: e.touches[0].pageX,
								y: e.touches[0].pageY
							})
						},
						h = function(n) {
							a = null, t.refresherHeight >= e.refresherThreshold ? w("refreshing") : w(
								"refresherabort")
						};
					s.value.addEventListener("touchstart", p, Ih), s.value.addEventListener("touchmove",
							f, We(!1)), s.value.addEventListener("scroll", i, We(!1)), s.value
						.addEventListener("touchend", h, Ih), cr((() => {
							s.value.removeEventListener("touchstart", p), s.value
								.removeEventListener("touchmove", f), s.value
								.removeEventListener("scroll", i), s.value.removeEventListener(
									"touchend", h)
						}))
				})), Xo((() => {
					e.scrollY && (s.value.scrollTop = t.lastScrollTop), e.scrollX && (s.value
						.scrollLeft = t.lastScrollLeft)
				})), Eo(n, (e => {
					v(e)
				})), Eo(o, (e => {
					b(e)
				})), Eo((() => e.scrollIntoView), (e => {
					y(e)
				})), Eo((() => e.refresherTriggered), (e => {
					!0 === e ? w("refreshing") : !1 === e && w("restore")
				}))
			}(e, c, u, d, l, o, r, s, t);
			const f = Ui((() => {
				let t = "";
				return e.scrollX ? t += "overflow-x:auto;" : t += "overflow-x:hidden;", e.scrollY ? t +=
					"overflow-y:auto;" : t += "overflow-y:hidden;", t
			}));
			return () => {
				const {
					refresherEnabled: t,
					refresherBackground: l,
					refresherDefaultStyle: u
				} = e, {
					refresherHeight: d,
					refreshState: p,
					refreshRotate: h
				} = c;
				return ki("uni-scroll-view", {
					ref: o
				}, [ki("div", {
					ref: i,
					class: "uni-scroll-view"
				}, [ki("div", {
					ref: r,
					style: f.value,
					class: "uni-scroll-view"
				}, [ki("div", {
					ref: s,
					class: "uni-scroll-view-content"
				}, [t ? ki("div", {
					ref: a,
					style: {
						backgroundColor: l,
						height: d + "px"
					},
					class: "uni-scroll-view-refresher"
				}, ["none" !== u ? ki("div", {
						class: "uni-scroll-view-refresh"
					}, [ki("div", {
						class: "uni-scroll-view-refresh-inner"
					}, ["pulling" == p ? ki("svg", {
							key: "refresh__icon",
							style: {
								transform: "rotate(" +
									h + "deg)"
							},
							fill: "#2BD009",
							class: "uni-scroll-view-refresh__icon",
							width: "24",
							height: "24",
							viewBox: "0 0 24 24"
						}, [ki("path", {
							d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
						}, null), ki("path", {
							d: "M0 0h24v24H0z",
							fill: "none"
						}, null)], 4) : null,
						"refreshing" == p ? ki("svg", {
							key: "refresh__spinner",
							class: "uni-scroll-view-refresh__spinner",
							width: "24",
							height: "24",
							viewBox: "25 25 50 50"
						}, [ki("circle", {
							cx: "50",
							cy: "50",
							r: "20",
							fill: "none",
							style: "color: #2bd009",
							"stroke-width": "3"
						}, null)]) : null
					])]) : null, "none" == u ? n.refresher && n
					.refresher() : null
				], 4) : null, n.default && n.default()], 512)], 4)], 512)], 512)
			}
		}
	});

function Fh(e, t, n, o, r, i) {
	function s() {
		c && (clearTimeout(c), c = null)
	}
	let a, l, c = null,
		u = !0,
		d = 0,
		f = 1,
		p = null,
		h = !1,
		m = 0,
		g = "";
	const v = Ui((() => n.value.length > t.displayMultipleItems)),
		b = Ui((() => e.circular && v.value));

	function y(r) {
		Math.floor(2 * d) === Math.floor(2 * r) && Math.ceil(2 * d) === Math.ceil(2 * r) || b.value && function(o) {
			if (!u)
				for (let r = n.value, i = r.length, s = o + t.displayMultipleItems, a = 0; a < i; a++) {
					const t = r[a],
						n = Math.floor(o / i) * i + a,
						l = n + i,
						c = n - i,
						u = Math.max(o - (n + 1), n - s, 0),
						d = Math.max(o - (l + 1), l - s, 0),
						f = Math.max(o - (c + 1), c - s, 0),
						p = Math.min(u, d, f),
						h = [n, l, c][
							[u, d, f].indexOf(p)
						];
					t.updatePosition(h, e.vertical)
				}
		}(r);
		const s = "translate(" + (e.vertical ? "0" : 100 * -r * f + "%") + ", " + (e.vertical ? 100 * -r * f + "%" :
				"0") + ") translateZ(0)",
			l = o.value;
		if (l && (l.style.webkitTransform = s, l.style.transform = s), d = r, !a) {
			if (r % 1 == 0) return;
			a = r
		}
		r -= Math.floor(a);
		const c = n.value;
		r <= -(c.length - 1) ? r += c.length : r >= c.length && (r -= c.length), r = a % 1 > .5 || a < 0 ? r - 1 : r, i(
			"transition", {}, {
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
		p = null
	}

	function x() {
		if (!p) return void(h = !1);
		const e = p,
			o = e.toPos,
			r = e.acc,
			s = e.endTime,
			c = e.source,
			u = s - Date.now();
		if (u <= 0) {
			y(o), p = null, h = !1, a = null;
			const e = n.value[t.current];
			if (e) {
				const n = e.getItemId();
				i("animationfinish", {}, {
					current: t.current,
					currentItemId: n,
					source: c
				})
			}
			return
		}
		y(o + r * u * u / 2), l = requestAnimationFrame(x)
	}

	function T(e, o, r) {
		w();
		const i = t.duration,
			s = n.value.length;
		let a = d;
		if (b.value)
			if (r < 0) {
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
		p = {
			toPos: e,
			acc: 2 * (a - e) / (i * i),
			endTime: Date.now() + i,
			source: o
		}, h || (h = !0, l = requestAnimationFrame(x))
	}

	function S() {
		s();
		const e = n.value,
			o = function() {
				c = null, g = "autoplay", b.value ? t.current = _(t.current + 1) : t.current = t.current + t
					.displayMultipleItems < e.length ? t.current + 1 : 0, T(t.current, "autoplay", b.value ? 1 : 0), c =
					setTimeout(o, t.interval)
			};
		u || e.length <= t.displayMultipleItems || (c = setTimeout(o, t.interval))
	}

	function E(e) {
		e ? S() : s()
	}
	return Eo([() => e.current, () => e.currentItemId, () => [...n.value]], (() => {
		let o = -1;
		if (e.currentItemId)
			for (let t = 0, r = n.value; t < r.length; t++) {
				if (r[t].getItemId() === e.currentItemId) {
					o = t;
					break
				}
			}
		o < 0 && (o = Math.round(e.current) || 0), o = o < 0 ? 0 : o, t.current !== o && (g = "", t
			.current = o)
	})), Eo([() => e.vertical, () => b.value, () => t.displayMultipleItems, () => [...n.value]], (function() {
		s(), p && (y(p.toPos), p = null);
		const r = n.value;
		for (let t = 0; t < r.length; t++) r[t].updatePosition(t, e.vertical);
		f = 1;
		const i = o.value;
		if (1 === t.displayMultipleItems && r.length) {
			const e = r[0].getBoundingClientRect(),
				t = i.getBoundingClientRect();
			f = e.width / t.width, f > 0 && f < 1 || (f = 1)
		}
		const a = d;
		d = -2;
		const l = t.current;
		l >= 0 ? (u = !1, t.userTracking ? (y(a + l - m), m = l) : (y(l), e.autoplay && S())) : (u = !0, y(-
			t.displayMultipleItems - 1))
	})), Eo((() => t.interval), (() => {
		c && (s(), S())
	})), Eo((() => t.current), ((e, o) => {
		! function(e, o) {
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
				i("change", {}, {
					current: t.current,
					currentItemId: e,
					source: r
				})
			}
		}(e, o), r("update:current", e)
	})), Eo((() => t.currentItemId), (e => {
		r("update:currentItemId", e)
	})), Eo((() => e.autoplay && !t.userTracking), E), E(e.autoplay && !t.userTracking), sr((() => {
		let r = !1,
			i = 0,
			a = 0;

		function l(e) {
			t.userTracking = !1;
			const n = i / Math.abs(i);
			let o = 0;
			!e && Math.abs(i) > .2 && (o = .5 * n);
			const r = _(d + o);
			e ? y(m) : (g = "touch", t.current = r, T(r, "touch", 0 !== o ? o : 0 === r && b.value && d >=
				1 ? 1 : 0))
		}
		eh(o.value, (c => {
			if (!e.disableTouch && !u) {
				if ("start" === c.detail.state) return t.userTracking = !0, r = !1, s(), m = d,
					i = 0, a = Date.now(), void w();
				if ("end" === c.detail.state) return l(!1);
				if ("cancel" === c.detail.state) return l(!0);
				if (t.userTracking) {
					if (!r) {
						r = !0;
						const n = Math.abs(c.detail.dx),
							o = Math.abs(c.detail.dy);
						if ((n >= o && e.vertical || n <= o && !e.vertical) && (t
								.userTracking = !1), !t.userTracking) return void(e.autoplay &&
							S())
					}
					return function(r) {
						const s = a;
						a = Date.now();
						const l = n.value.length - t.displayMultipleItems;

						function c(e) {
							return .5 - .25 / (e + .5)
						}

						function u(e, t) {
							let n = m + e;
							i = .6 * i + .4 * t, b.value || (n < 0 || n > l) && (n < 0 ?
								n = -c(-n) : n > l && (n = l + c(n - l)), i = 0), y(n)
						}
						const d = a - s || 1,
							f = o.value;
						e.vertical ? u(-r.dy / f.offsetHeight, -r.ddy / d) : u(-r.dx / f
							.offsetWidth, -r.ddx / d)
					}(c.detail), !1
				}
			}
		}))
	})), ur((() => {
		s(), cancelAnimationFrame(l)
	})), {
		onSwiperDotClick: function(e) {
			T(t.current = e, g = "click", b.value ? 1 : 0)
		},
		circularEnabled: b,
		swiperEnabled: v
	}
}
const jh = Tu({
		name: "Swiper",
		props: {
			indicatorDots: {
				type: [Boolean, String],
				default: !1
			},
			vertical: {
				type: [Boolean, String],
				default: !1
			},
			autoplay: {
				type: [Boolean, String],
				default: !1
			},
			circular: {
				type: [Boolean, String],
				default: !1
			},
			interval: {
				type: [Number, String],
				default: 5e3
			},
			duration: {
				type: [Number, String],
				default: 500
			},
			current: {
				type: [Number, String],
				default: 0
			},
			indicatorColor: {
				type: String,
				default: ""
			},
			indicatorActiveColor: {
				type: String,
				default: ""
			},
			previousMargin: {
				type: String,
				default: ""
			},
			nextMargin: {
				type: String,
				default: ""
			},
			currentItemId: {
				type: String,
				default: ""
			},
			skipHiddenItemLayout: {
				type: [Boolean, String],
				default: !1
			},
			displayMultipleItems: {
				type: [Number, String],
				default: 1
			},
			disableTouch: {
				type: [Boolean, String],
				default: !1
			},
			navigation: {
				type: [Boolean, String],
				default: !1
			},
			navigationColor: {
				type: String,
				default: "#fff"
			},
			navigationActiveColor: {
				type: String,
				default: "rgba(53, 53, 53, 0.6)"
			}
		},
		emits: ["change", "transition", "animationfinish", "update:current", "update:currentItemId"],
		setup(e, {
			slots: t,
			emit: n
		}) {
			const o = Pn(null),
				r = Bu(o, n),
				i = Pn(null),
				s = Pn(null),
				a = function(e) {
					return gn({
						interval: Ui((() => {
							const t = Number(e.interval);
							return isNaN(t) ? 5e3 : t
						})),
						duration: Ui((() => {
							const t = Number(e.duration);
							return isNaN(t) ? 500 : t
						})),
						displayMultipleItems: Ui((() => {
							const t = Math.round(e.displayMultipleItems);
							return isNaN(t) ? 1 : t
						})),
						current: Math.round(e.current) || 0,
						currentItemId: e.currentItemId,
						userTracking: !1
					})
				}(e),
				l = Ui((() => {
					let t = {};
					return (e.nextMargin || e.previousMargin) && (t = e.vertical ? {
						left: 0,
						right: 0,
						top: Oc(e.previousMargin, !0),
						bottom: Oc(e.nextMargin, !0)
					} : {
						top: 0,
						bottom: 0,
						left: Oc(e.previousMargin, !0),
						right: Oc(e.nextMargin, !0)
					}), t
				})),
				c = Ui((() => {
					const t = Math.abs(100 / a.displayMultipleItems) + "%";
					return {
						width: e.vertical ? "100%" : t,
						height: e.vertical ? t : "100%"
					}
				}));
			let u = [];
			const d = [],
				f = Pn([]);

			function p() {
				const e = [];
				for (let t = 0; t < u.length; t++) {
					let n = u[t];
					n instanceof Element || (n = n.el);
					const o = d.find((e => n === e.rootRef.value));
					o && e.push(Sn(o))
				}
				f.value = e
			}
			wo("addSwiperContext", (function(e) {
				d.push(e), p()
			}));
			wo("removeSwiperContext", (function(e) {
				const t = d.indexOf(e);
				t >= 0 && (d.splice(t, 1), p())
			}));
			const {
				onSwiperDotClick: h,
				circularEnabled: m,
				swiperEnabled: g
			} = Fh(e, a, f, s, n, r);
			let v = () => null;
			return v = Nh(o, e, a, h, f, m, g), () => {
				const n = t.default && t.default();
				return u = Xp(n), ki("uni-swiper", {
					ref: o
				}, [ki("div", {
					ref: i,
					class: "uni-swiper-wrapper"
				}, [ki("div", {
					class: "uni-swiper-slides",
					style: l.value
				}, [ki("div", {
					ref: s,
					class: "uni-swiper-slide-frame",
					style: c.value
				}, [n], 4)], 4), e.indicatorDots && ki("div", {
					class: ["uni-swiper-dots", e.vertical ? "uni-swiper-dots-vertical" :
						"uni-swiper-dots-horizontal"
					]
				}, [f.value.map(((t, n, o) => ki("div", {
					onClick: () => h(n),
					class: {
						"uni-swiper-dot": !0,
						"uni-swiper-dot-active": n < a.current + a
							.displayMultipleItems && n >= a.current ||
							n < a.current + a.displayMultipleItems - o
							.length
					},
					style: {
						background: n === a.current ? e
							.indicatorActiveColor : e.indicatorColor
					}
				}, null, 14, ["onClick"])))], 2), v()], 512)], 512)
			}
		}
	}),
	Nh = (e, t, n, o, r, i, s) => {
		let a = !1,
			l = !1,
			c = !1,
			u = Pn(!1);

		function d(e, n) {
			const o = e.currentTarget;
			o && (o.style.backgroundColor = "over" === n ? t.navigationActiveColor : "")
		}
		To((() => {
			a = "auto" === t.navigation, u.value = !0 !== t.navigation || a, b()
		})), To((() => {
			const e = r.value.length,
				t = !i.value;
			l = 0 === n.current && t, c = n.current === e - 1 && t || t && n.current + n
				.displayMultipleItems >= e, s.value || (l = !0, c = !0, a && (u.value = !0))
		}));
		const f = {
			onMouseover: e => d(e, "over"),
			onMouseout: e => d(e, "out")
		};

		function p(e, t, s) {
			if (e.stopPropagation(), s) return;
			const a = r.value.length;
			let l = n.current;
			switch (t) {
				case "prev":
					l--, l < 0 && i.value && (l = a - 1);
					break;
				case "next":
					l++, l >= a && i.value && (l = 0)
			}
			o(l)
		}
		const h = () => Fc(
			"M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z",
			t.navigationColor, 26);
		let m;
		const g = n => {
				clearTimeout(m);
				const {
					clientX: o,
					clientY: r
				} = n, {
					left: i,
					right: s,
					top: a,
					bottom: l,
					width: c,
					height: d
				} = e.value.getBoundingClientRect();
				let f = !1;
				if (f = t.vertical ? !(r - a < d / 3 || l - r < d / 3) : !(o - i < c / 3 || s - o < c / 3), f)
				return m = setTimeout((() => {
						u.value = f
					}), 300);
				u.value = f
			},
			v = () => {
				u.value = !0
			};

		function b() {
			e.value && (e.value.removeEventListener("mousemove", g), e.value.removeEventListener("mouseleave", v), a &&
				(e.value.addEventListener("mousemove", g), e.value.addEventListener("mouseleave", v)))
		}
		return sr(b),
			function() {
				const e = {
					"uni-swiper-navigation-hide": u.value,
					"uni-swiper-navigation-vertical": t.vertical
				};
				return t.navigation ? ki(li, null, [ki("div", Ii({
					class: ["uni-swiper-navigation uni-swiper-navigation-prev", x({
						"uni-swiper-navigation-disabled": l
					}, e)],
					onClick: e => p(e, "prev", l)
				}, f), [h()], 16, ["onClick"]), ki("div", Ii({
					class: ["uni-swiper-navigation uni-swiper-navigation-next", x({
						"uni-swiper-navigation-disabled": c
					}, e)],
					onClick: e => p(e, "next", c)
				}, f), [h()], 16, ["onClick"])]) : null
			}
	},
	Rh = Tu({
		name: "SwiperItem",
		props: {
			itemId: {
				type: String,
				default: ""
			}
		},
		setup(e, {
			slots: t
		}) {
			const n = Pn(null),
				o = {
					rootRef: n,
					getItemId: () => e.itemId,
					getBoundingClientRect: () => n.value.getBoundingClientRect(),
					updatePosition(e, t) {
						const o = t ? "0" : 100 * e + "%",
							r = t ? 100 * e + "%" : "0",
							i = n.value,
							s = `translate(${o},${r}) translateZ(0)`;
						i && (i.style.webkitTransform = s, i.style.transform = s)
					}
				};
			return sr((() => {
				const e = xo("addSwiperContext");
				e && e(o)
			})), ur((() => {
				const e = xo("removeSwiperContext");
				e && e(o)
			})), () => ki("uni-swiper-item", {
				ref: n,
				style: {
					position: "absolute",
					width: "100%",
					height: "100%"
				}
			}, [t.default && t.default()], 512)
		}
	}),
	Dh = {
		ensp: " ",
		emsp: " ",
		nbsp: " "
	};

function qh(e, t) {
	return e.replace(/\\n/g, K).split(K).map((e => function(e, {
		space: t,
		decode: n
	}) {
		if (!e) return e;
		t && Dh[t] && (e = e.replace(/ /g, Dh[t]));
		if (!n) return e;
		return e.replace(/&nbsp;/g, Dh.nbsp).replace(/&ensp;/g, Dh.ensp).replace(/&emsp;/g, Dh.emsp)
			.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'")
	}(e, t)))
}
const zh = Tu({
		name: "Text",
		props: {
			selectable: {
				type: [Boolean, String],
				default: !1
			},
			space: {
				type: String,
				default: ""
			},
			decode: {
				type: [Boolean, String],
				default: !1
			}
		},
		setup: (e, {
			slots: t
		}) => () => {
			const n = [];
			return t.default && t.default().forEach((t => {
				if (8 & t.shapeFlag && t.type !== ui) {
					const o = qh(t.children, {
							space: e.space,
							decode: e.decode
						}),
						r = o.length - 1;
					o.forEach(((e, t) => {
						(0 !== t || e) && n.push(Ci(e)), t !== r && n.push(ki("br"))
					}))
				} else n.push(t)
			})), ki("uni-text", {
				selectable: !!e.selectable || null
			}, [ki("span", null, n)], 8, ["selectable"])
		}
	}),
	Hh = Tu({
		name: "View",
		props: x({}, Eu),
		setup(e, {
			slots: t
		}) {
			const {
				hovering: n,
				binding: o
			} = ku(e);
			return () => {
				const r = e.hoverClass;
				return r && "none" !== r ? ki("uni-view", Ii({
					class: n.value ? r : ""
				}, o), [t.default && t.default()], 16) : ki("uni-view", null, [t.default && t.default()])
			}
		}
	});

function Wh(e, t) {
	if (t || (t = e.id), t) return e.$options.name.toLowerCase() + "." + t
}

function Vh(e, t, n) {
	e && tc(n || qc(), e, (({
		type: e,
		data: n
	}, o) => {
		t(e, n, o)
	}))
}

function $h(e, t) {
	e && function(e, t) {
		t = ec(e, t), delete Zl[t]
	}(t || qc(), e)
}
let Qh = 0;

function Uh(e, t, n, o) {
	B(t) && or(e, t.bind(n), o)
}

function Xh(e, t, n) {
	var o;
	const r = e.mpType || n.$mpType;
	if (r && "component" !== r && (Object.keys(e).forEach((o => {
			if (function(e, t, n = !0) {
					return !(n && !B(t)) && (Ze.indexOf(e) > -1 || 0 === e.indexOf("on"))
				}(o, e[o], !1)) {
				const r = e[o];
				k(r) ? r.forEach((e => Uh(o, e, n, t))) : Uh(o, r, n, t)
			}
		})), "page" === r)) {
		t.__isVisible = !0;
		try {
			Vc(n, ue, t.attrs.__pageQuery), delete t.attrs.__pageQuery, "preloadPage" !== (null == (o = n.$page) ?
				void 0 : o.openType) && Vc(n, oe)
		} catch (i) {
			console.error(i.message + K + i.stack)
		}
	}
}

function Yh(e, t, n) {
	Xh(e, t, n)
}

function Jh(e, t, n) {
	return e[t] = n
}

function Gh(e) {
	return function(t, n, o) {
		if (!n) throw t;
		const r = e._instance;
		if (!r || !r.proxy) throw t;
		Vc(r.proxy, se, t)
	}
}

function Kh(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function Zh(e) {
	const t = e._context.config;
	var n;
	t.errorHandler = tt(e, Gh), n = t.optionMergeStrategies, Ze.forEach((e => {
		n[e] = Kh
	}));
	const o = t.globalProperties;
	o.$set = Jh, o.$applyOptions = Yh,
		function(e) {
			et.forEach((t => t(e)))
		}(e)
}
const em = Pc("upm");

function tm() {
	return xo(em)
}

function nm(e) {
	const t = function(e) {
		return gn(function(e) {
			if (history.state) {
				const t = history.state.__type__;
				"redirectTo" !== t && "reLaunch" !== t || 0 !== vm().length || (e.isEntry = !0, e.isQuit = !
					0)
			}
			return e
		}(JSON.parse(JSON.stringify(Wc(jl().meta, e)))))
	}(e);
	return wo(em, t), t
}

function om() {
	return jl()
}

function rm() {
	return history.state && history.state.__id__ || 1
}
let im;

function sm() {
	var e;
	return im || (im = __uniConfig.tabBar && gn((e = __uniConfig.tabBar, Nl() && e.list && e.list.forEach((e => {
		zl(e, ["text"])
	})), e))), im
}
const am = window.CSS && window.CSS.supports;

function lm(e) {
	return am && (am(e) || am.apply(window.CSS, e.split(":")))
}
const cm = lm("top:env(a)"),
	um = lm("top:constant(a)"),
	dm = lm("backdrop-filter:blur(10px)"),
	fm = (() => cm ? "env" : um ? "constant" : "")();

function pm(e) {
	return fm ? `calc(${e}px + ${fm}(safe-area-inset-bottom))` : `${e}px`
}
const hm = "$$",
	mm = new Map;

function gm() {
	return mm
}

function vm() {
	const e = [],
		t = mm.values();
	for (const n of t) n.$.__isTabBar ? n.$.__isActive && e.push(n) : e.push(n);
	return e
}

function bm(e, t = !0) {
	const n = mm.get(e);
	n.$.__isUnload = !0, Vc(n, de), mm.delete(e), t && function(e) {
		const t = Tm.get(e);
		t && (Tm.delete(e), Sm.pruneCacheEntry(t))
	}(e)
}
let ym = rm();

function _m(e) {
	const t = tm();
	let n = e.fullPath;
	return e.meta.isEntry && -1 === n.indexOf(e.meta.route) && (n = "/" + e.meta.route + n.replace("/", "")),
		function(e, t, n, o, r, i) {
			const {
				id: s,
				route: a
			} = o, l = it(o.navigationBar, __uniConfig.themeConfig, i).titleColor;
			return {
				id: s,
				path: Fe(a),
				route: a,
				fullPath: t,
				options: n,
				meta: o,
				openType: e,
				eventChannel: r,
				statusBarStyle: "#000000" === l ? "dark" : "light"
			}
		}("navigateTo", n, {}, t)
}

function wm(e) {
	const t = _m(e.$route);
	! function(e, t) {
		e.route = t.route, e.$vm = e, e.$page = t, e.$mpType = "page", t.meta.isTabBar && (e.$.__isTabBar = !0, e.$
			.__isActive = !0)
	}(e, t), mm.set(xm(t.path, t.id), e)
}

function xm(e, t) {
	return e + hm + t
}
const Tm = new Map,
	Sm = {
		get: e => Tm.get(e),
		set(e, t) {
			! function(e) {
				const t = parseInt(e.split(hm)[1]);
				if (!t) return;
				Sm.forEach(((e, n) => {
					const o = parseInt(n.split(hm)[1]);
					if (o && o > t) {
						if (function(e) {
								return "tabBar" === e.props.type
							}(e)) return;
						Sm.delete(n), Sm.pruneCacheEntry(e), Zn((() => {
							mm.forEach(((e, t) => {
								e.$.isUnmounted && mm.delete(t)
							}))
						}))
					}
				}))
			}(e), Tm.set(e, t)
		},
		delete(e) {
			Tm.get(e) && Tm.delete(e)
		},
		forEach(e) {
			Tm.forEach(e)
		}
	};

function Em(e, t) {
	! function(e) {
		const t = Am(e),
			{
				body: n
			} = document;
		Cm && n.removeAttribute(Cm), t && n.setAttribute(t, ""), Cm = t
	}(e),
	function(e) {
		let t = 0;
		if (e.isTabBar) {
			const e = sm();
			e.shown && (t = parseInt(e.height))
		}
		var n;
		Bc({
			"--window-top": (n = 0, fm ? `calc(${n}px + ${fm}(safe-area-inset-top))` : `${n}px`),
			"--window-bottom": pm(t)
		})
	}(t),
	function(e) {
		const t = "nvue-dir-" + __uniConfig.nvue["flex-direction"];
		e.isNVue ? (document.body.setAttribute("nvue", ""), document.body.setAttribute(t, "")) : (document.body
			.removeAttribute("nvue"), document.body.removeAttribute(t))
	}(t),
	function(e, t) {
		document.removeEventListener("touchmove", $c), Bm && document.removeEventListener("scroll", Bm);
		if (t.disableScroll) return document.addEventListener("touchmove", $c);
		const {
			onPageScroll: n,
			onReachBottom: o
		} = e, r = "transparent" === t.navigationBar.type;
		if (!n && !o && !r) return;
		const i = {},
			s = e.proxy.$page.id;
		(n || r) && (i.onPageScroll = function(e, t, n) {
			return o => {
				t && Uv.publishHandler(ge, {
					scrollTop: o
				}, e), n && Uv.emit(e + "." + ge, {
					scrollTop: o
				})
			}
		}(s, n, r));
		o && (i.onReachBottomDistance = t.onReachBottomDistance || 50, i.onReachBottom = () => Uv.publishHandler(be, {},
			s));
		Bm = Xc(i), requestAnimationFrame((() => document.addEventListener("scroll", Bm)))
	}(e, t)
}

function km(e) {
	const t = Am(e);
	t && function(e) {
		const t = document.querySelector("uni-page-body");
		t && t.setAttribute(e, "")
	}(t)
}

function Am(e) {
	return e.type.__scopeId
}
let Cm, Bm;

function Pm(e) {
	const t = Ml({
		history: Om(),
		strict: !!__uniConfig.router.strict,
		routes: __uniRoutes,
		scrollBehavior: Lm
	});
	e.router = t, e.use(t)
}
const Lm = (e, t, n) => {
	if (n) return n
};

function Om() {
	let {
		routerBase: e
	} = __uniConfig.router;
	"/" === e && (e = "");
	const t = Ba(e);
	return t.listen(((e, t, n) => {
		"back" === n.direction && function(e = 1) {
			const t = vm(),
				n = t.length - 1,
				o = n - e;
			for (let r = n; r > o; r--) {
				const e = t[r].$page;
				bm(xm(e.path, e.id), !1)
			}
		}(Math.abs(n.delta))
	})), t
}
const Im = {
	install(e) {
		Zh(e), au(e), bu(e), e.config.warnHandler || (e.config.warnHandler = Mm), Pm(e)
	}
};

function Mm(e, t, n) {
	if (t) {
		if ("PageMetaHead" === t.$.type.name) return;
		const e = t.$.parent;
		if (e && "PageMeta" === e.type.name) return
	}
	const o = [`[Vue warn]: ${e}`];
	n.length && o.push("\n", n), console.warn(...o)
}
const Fm = {
		class: "uni-async-loading"
	},
	jm = ki("i", {
		class: "uni-loading"
	}, null, -1),
	Nm = Su({
		name: "AsyncLoading",
		render: () => (hi(), yi("div", Fm, [jm]))
	});

function Rm() {
	window.location.reload()
}
const Dm = Su({
	name: "AsyncError",
	setup() {
		Vl();
		const {
			t: e
		} = Hl();
		return () => ki("div", {
			class: "uni-async-error",
			onClick: Rm
		}, [e("uni.async.error")], 8, ["onClick"])
	}
});
let qm;

function zm() {
	return qm
}

function Hm(e) {
	qm = e, Object.defineProperty(qm.$.ctx, "$children", {
		get: () => vm().map((e => e.$vm))
	});
	const t = qm.$.appContext.app;
	t.component(Nm.name) || t.component(Nm.name, Nm), t.component(Dm.name) || t.component(Dm.name, Dm),
		function(e) {
			e.$vm = e, e.$mpType = "app";
			const t = Pn(Hl().getLocale());
			Object.defineProperty(e, "$locale", {
				get: () => t.value,
				set(e) {
					t.value = e
				}
			})
		}(qm),
		function(e, t) {
			const n = e.$options || {};
			n.globalData = x(n.globalData || {}, t), Object.defineProperty(e, "globalData", {
				get: () => n.globalData,
				set(e) {
					n.globalData = e
				}
			})
		}(qm), gu(), pc()
}

function Wm(e, {
	clone: t,
	init: n,
	setup: o,
	before: r
}) {
	t && (e = x({}, e)), r && r(e);
	const i = e.setup;
	return e.setup = (e, t) => {
		const r = Ri();
		n(r.proxy);
		const s = o(r);
		if (i) return i(s || e, t)
	}, e
}

function Vm(e, t) {
	return e && (e.__esModule || "Module" === e[Symbol.toStringTag]) ? Wm(e.default, t) : Wm(e, t)
}

function $m(e) {
	return Vm(e, {
		clone: !0,
		init: wm,
		setup(e) {
			e.$pageInstance = e;
			const t = om(),
				n = Qe(t.query);
			e.attrs.__pageQuery = n, e.proxy.$page.options = n;
			const o = tm();
			var r, i, s;
			return ir((() => {
					Em(e, o)
				})), sr((() => {
					km(e);
					const {
						onReady: n
					} = e;
					n && U(n), Ym(t)
				})), Jo((() => {
					if (!e.__isVisible) {
						Em(e, o), e.__isVisible = !0;
						const {
							onShow: n
						} = e;
						n && U(n), Zn((() => {
							Ym(t)
						}))
					}
				}), "ba", r),
				function(e, t) {
					Jo(e, "bda", t)
				}((() => {
					if (e.__isVisible && !e.__isUnload) {
						e.__isVisible = !1;
						const {
							onHide: t
						} = e;
						t && U(t)
					}
				})), i = o.id, Uv.subscribe(ec(i, Jl), s ? s(nc) : nc), cr((() => {
					! function(e) {
						Uv.unsubscribe(ec(e, Jl)), Object.keys(Zl).forEach((t => {
							0 === t.indexOf(e + ".") && delete Zl[t]
						}))
					}(o.id)
				})), n
		}
	})
}

function Qm() {
	const {
		windowWidth: e,
		windowHeight: t,
		screenWidth: n,
		screenHeight: o
	} = gg(), r = 90 === Math.abs(Number(window.orientation)) ? "landscape" : "portrait";
	Xv.emit(he, {
		deviceOrientation: r,
		size: {
			windowWidth: e,
			windowHeight: t,
			screenWidth: n,
			screenHeight: o
		}
	})
}

function Um(e) {
	j(e.data) && "WEB_INVOKE_APPSERVICE" === e.data.type && Xv.emit(Pe, e.data.data, e.data.pageId)
}

function Xm() {
	const {
		emit: e
	} = Xv;
	"visible" === document.visibilityState ? e(Ce, x({}, ap)) : e(Be)
}

function Ym(e) {
	const {
		tabBarText: t,
		tabBarIndex: n,
		route: o
	} = e.meta;
	t && Vc("onTabItemTap", {
		index: n,
		text: t,
		pagePath: o
	})
}

function Jm(e) {
	e = e > 0 && e < 1 / 0 ? e : 0;
	const t = Math.floor(e / 3600),
		n = Math.floor(e % 3600 / 60),
		o = Math.floor(e % 3600 % 60),
		r = (t < 10 ? "0" : "") + t;
	let i = (n < 10 ? "0" : "") + n + ":" + ((o < 10 ? "0" : "") + o);
	return "00" !== r && (i = r + ":" + i), i
}

function Gm(e, t, n) {
	const o = gn({
			gestureType: "none",
			volumeOld: 0,
			volumeNew: 0,
			currentTimeOld: 0,
			currentTimeNew: 0
		}),
		r = {
			x: 0,
			y: 0
		};
	return {
		state: o,
		onTouchstart: function(e) {
			const t = e.targetTouches[0];
			r.x = t.pageX, r.y = t.pageY, o.gestureType = "none", o.volumeOld = 0, o.currentTimeOld = o
				.currentTimeNew = 0
		},
		onTouchmove: function(i) {
			function s() {
				i.stopPropagation(), i.preventDefault()
			}
			n.fullscreen && s();
			const a = o.gestureType;
			if ("stop" === a) return;
			const l = i.targetTouches[0],
				c = l.pageX,
				u = l.pageY,
				d = r,
				f = t.value;
			if ("progress" === a ? function(e) {
					const n = t.value,
						r = n.duration;
					let i = e / 600 * r + o.currentTimeOld;
					i < 0 ? i = 0 : i > r && (i = r);
					o.currentTimeNew = i
				}(c - d.x) : "volume" === a && function(e) {
					const n = t.value,
						r = o.volumeOld;
					let i;
					"number" == typeof r && (i = r - e / 200, i < 0 ? i = 0 : i > 1 && (i = 1), n.volume = i, o
						.volumeNew = i)
				}(u - d.y), "none" === a)
				if (Math.abs(c - d.x) > Math.abs(u - d.y)) {
					if (!e.enableProgressGesture) return void(o.gestureType = "stop");
					o.gestureType = "progress", o.currentTimeOld = o.currentTimeNew = f.currentTime, n.fullscreen ||
						s()
				} else {
					if (!e.pageGesture) return void(o.gestureType = "stop");
					o.gestureType = "volume", o.volumeOld = f.volume, n.fullscreen || s()
				}
		},
		onTouchend: function(e) {
			const n = t.value;
			"none" !== o.gestureType && "stop" !== o.gestureType && (e.stopPropagation(), e.preventDefault()),
				"progress" === o.gestureType && o.currentTimeOld !== o.currentTimeNew && (n.currentTime = o
					.currentTimeNew), o.gestureType = "none"
		}
	}
}

function Km(e, t, n, o, r, i, s) {
	const a = {
		play: e,
		pause: t,
		seek: n,
		sendDanmu: o,
		playbackRate: r,
		requestFullScreen: i,
		exitFullScreen: s
	};
	! function(e, t, n, o) {
		const r = Ri().proxy;
		sr((() => {
			Vh(t || Wh(r), e, o), !n && t || Eo((() => r.id), ((t, n) => {
				Vh(Wh(r, t), e, o), $h(n && Wh(r, n))
			}))
		})), cr((() => {
			$h(t || Wh(r), o)
		}))
	}(((e, t) => {
		let n;
		switch (e) {
			case "seek":
				n = t.position;
				break;
			case "sendDanmu":
				n = t;
				break;
			case "playbackRate":
				n = t.rate
		}
		e in a && a[e](n)
	}), function(e) {
		const t = jc(),
			n = Ri().proxy,
			o = n.$options.name.toLowerCase(),
			r = e || n.id || "context" + Qh++;
		return sr((() => {
			n.$el.__uniContextInfo = {
				id: r,
				type: o,
				page: t
			}
		})), `${o}.${r}`
	}(), !0)
}
const Zm = Tu({
		name: "Video",
		props: {
			id: {
				type: String,
				default: ""
			},
			src: {
				type: String,
				default: ""
			},
			duration: {
				type: [Number, String],
				default: ""
			},
			controls: {
				type: [Boolean, String],
				default: !0
			},
			danmuList: {
				type: Array,
				default: () => []
			},
			danmuBtn: {
				type: [Boolean, String],
				default: !1
			},
			enableDanmu: {
				type: [Boolean, String],
				default: !1
			},
			autoplay: {
				type: [Boolean, String],
				default: !1
			},
			loop: {
				type: [Boolean, String],
				default: !1
			},
			muted: {
				type: [Boolean, String],
				default: !1
			},
			objectFit: {
				type: String,
				default: "contain"
			},
			poster: {
				type: String,
				default: ""
			},
			direction: {
				type: [String, Number],
				default: ""
			},
			showProgress: {
				type: Boolean,
				default: !0
			},
			initialTime: {
				type: [String, Number],
				default: 0
			},
			showFullscreenBtn: {
				type: [Boolean, String],
				default: !0
			},
			pageGesture: {
				type: [Boolean, String],
				default: !1
			},
			enableProgressGesture: {
				type: [Boolean, String],
				default: !0
			},
			showPlayBtn: {
				type: [Boolean, String],
				default: !0
			},
			showCenterPlayBtn: {
				type: [Boolean, String],
				default: !0
			}
		},
		emits: ["fullscreenchange", "progress", "loadedmetadata", "waiting", "error", "play", "pause", "ended",
			"timeupdate"
		],
		setup(e, {
			emit: t,
			attrs: n,
			slots: o
		}) {
			const r = Pn(null),
				i = Pn(null),
				s = Bu(r, t),
				{
					state: a
				} = Mp(),
				{
					$attrs: l
				} = Up({
					excludeListeners: !0
				}),
				{
					t: c
				} = Hl();
			Xl();
			const {
				videoRef: u,
				state: d,
				play: f,
				pause: p,
				seek: h,
				playbackRate: m,
				toggle: g,
				onDurationChange: v,
				onLoadedMetadata: b,
				onProgress: y,
				onWaiting: _,
				onVideoError: w,
				onPlay: x,
				onPause: T,
				onEnded: S,
				onTimeUpdate: E
			} = function(e, t, n) {
				const o = Pn(null),
					r = Ui((() => Nu(e.src))),
					i = gn({
						start: !1,
						src: r,
						playing: !1,
						currentTime: 0,
						duration: 0,
						progress: 0,
						buffered: 0
					});

				function s(e) {
					const t = e.target,
						n = t.buffered;
					n.length && (i.buffered = n.end(n.length - 1) / t.duration * 100)
				}
				return Eo((() => r.value), (() => {
					i.playing = !1, i.currentTime = 0
				})), Eo((() => i.buffered), (e => {
					n("progress", {}, {
						buffered: e
					})
				})), {
					videoRef: o,
					state: i,
					play: function() {
						const e = o.value;
						i.start = !0, e.play()
					},
					pause: function() {
						o.value.pause()
					},
					seek: function(e) {
						const t = o.value;
						"number" != typeof(e = Number(e)) || isNaN(e) || (t.currentTime = e)
					},
					playbackRate: function(e) {
						o.value.playbackRate = e
					},
					toggle: function() {
						const e = o.value;
						i.playing ? e.pause() : e.play()
					},
					onDurationChange: function({
						target: e
					}) {
						i.duration = e.duration
					},
					onLoadedMetadata: function(t) {
						const o = Number(e.initialTime) || 0,
							r = t.target;
						o > 0 && (r.currentTime = o), n("loadedmetadata", t, {
							width: r.videoWidth,
							height: r.videoHeight,
							duration: r.duration
						}), s(t)
					},
					onProgress: s,
					onWaiting: function(e) {
						n("waiting", e, {})
					},
					onVideoError: function(e) {
						i.playing = !1, n("error", e, {})
					},
					onPlay: function(e) {
						i.start = !0, i.playing = !0, n("play", e, {})
					},
					onPause: function(e) {
						i.playing = !1, n("pause", e, {})
					},
					onEnded: function(e) {
						i.playing = !1, n("ended", e, {})
					},
					onTimeUpdate: function(e) {
						const t = e.target,
							o = i.currentTime = t.currentTime;
						n("timeupdate", e, {
							currentTime: o,
							duration: t.duration
						})
					}
				}
			}(e, 0, s), {
				state: A,
				danmuRef: C,
				updateDanmu: B,
				toggleDanmu: P,
				sendDanmu: L
			} = function(e, t) {
				const n = Pn(null),
					o = gn({
						enable: Boolean(e.enableDanmu)
					});
				let r = {
					time: 0,
					index: -1
				};
				const i = k(e.danmuList) ? JSON.parse(JSON.stringify(e.danmuList)) : [];

				function s(e) {
					const t = document.createElement("p");
					t.className = "uni-video-danmu-item", t.innerText = e.text;
					let o = `bottom: ${100*Math.random()}%;color: ${e.color};`;
					t.setAttribute("style", o), n.value.appendChild(t), setTimeout((function() {
						o += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);",
							t.setAttribute("style", o), setTimeout((function() {
								t.remove()
							}), 4e3)
					}), 17)
				}
				return i.sort((function(e, t) {
					return (e.time || 0) - (t.time || 0)
				})), {
					state: o,
					danmuRef: n,
					updateDanmu: function(e) {
						const n = e.target.currentTime,
							a = r,
							l = {
								time: n,
								index: a.index
							};
						if (n > a.time)
							for (let r = a.index + 1; r < i.length; r++) {
								const e = i[r];
								if (!(n >= (e.time || 0))) break;
								l.index = r, t.playing && o.enable && s(e)
							} else if (n < a.time)
								for (let t = a.index - 1; t > -1 && n <= (i[t].time || 0); t--) l.index =
									t - 1;
						r = l
					},
					toggleDanmu: function() {
						o.enable = !o.enable
					},
					sendDanmu: function(e) {
						i.splice(r.index + 1, 0, {
							text: String(e.text),
							color: e.color,
							time: t.currentTime || 0
						})
					}
				}
			}(e, d), {
				state: O,
				onFullscreenChange: I,
				emitFullscreenChange: M,
				toggleFullscreen: F,
				requestFullScreen: j,
				exitFullScreen: N
			} = function(e, t, n, o, r) {
				const i = gn({
						fullscreen: !1
					}),
					s = /^Apple/.test(navigator.vendor);

				function a(t) {
					i.fullscreen = t, e("fullscreenchange", {}, {
						fullScreen: t,
						direction: "vertical"
					})
				}

				function l(e) {
					const i = r.value,
						l = t.value,
						c = n.value;
					let u;
					e ? !document.fullscreenEnabled && !document.webkitFullscreenEnabled || s && !o.userAction ? c
						.webkitEnterFullScreen ? c.webkitEnterFullScreen() : (u = !0, l.remove(), l.classList.add(
							"uni-video-type-fullscreen"), document.body.appendChild(l)) : l[document
							.fullscreenEnabled ? "requestFullscreen" : "webkitRequestFullscreen"]() : document
						.fullscreenEnabled || document.webkitFullscreenEnabled ? document.fullscreenElement ?
						document.exitFullscreen() : document.webkitFullscreenElement && document
						.webkitExitFullscreen() : c.webkitExitFullScreen ? c.webkitExitFullScreen() : (u = !0, l
							.remove(), l.classList.remove("uni-video-type-fullscreen"), i.appendChild(l)), u && a(e)
				}

				function c() {
					l(!1)
				}
				return cr(c), {
					state: i,
					onFullscreenChange: function(e, t) {
						t && document.fullscreenEnabled || a(!(!document.fullscreenElement && !document
							.webkitFullscreenElement))
					},
					emitFullscreenChange: a,
					toggleFullscreen: l,
					requestFullScreen: function() {
						l(!0)
					},
					exitFullScreen: c
				}
			}(s, i, u, a, r), {
				state: R,
				onTouchstart: D,
				onTouchend: q,
				onTouchmove: z
			} = Gm(e, u, O), {
				state: H,
				progressRef: W,
				ballRef: V,
				clickProgress: $,
				toggleControls: Q
			} = function(e, t, n) {
				const o = Pn(null),
					r = Pn(null),
					i = Ui((() => e.showCenterPlayBtn && !t.start)),
					s = Pn(!0),
					a = Ui((() => !i.value && e.controls && s.value)),
					l = gn({
						touching: !1,
						controlsTouching: !1,
						centerPlayBtnShow: i,
						controlsShow: a,
						controlsVisible: s
					});
				let c;

				function u() {
					c = setTimeout((() => {
						l.controlsVisible = !1
					}), 3e3)
				}

				function d() {
					c && (clearTimeout(c), c = null)
				}
				return cr((() => {
					c && clearTimeout(c)
				})), Eo((() => l.controlsShow && t.playing && !l.controlsTouching), (e => {
					e ? u() : d()
				})), Eo([() => t.currentTime, () => {
					e.duration
				}], (function() {
					l.touching || (t.progress = t.currentTime / t.duration * 100)
				})), sr((() => {
					const e = We(!1);
					let i, s, a, c = !0;
					const u = r.value;

					function d(e) {
						const n = e.targetTouches[0],
							r = n.pageX,
							l = n.pageY;
						if (c && Math.abs(r - i) < Math.abs(l - s)) return void f(e);
						c = !1;
						const u = o.value.offsetWidth;
						let d = a + (r - i) / u * 100;
						d < 0 ? d = 0 : d > 100 && (d = 100), t.progress = d, e.preventDefault(), e
							.stopPropagation()
					}

					function f(o) {
						l.controlsTouching = !1, l.touching && (u.removeEventListener("touchmove",
							d, e), c || (o.preventDefault(), o.stopPropagation(), n(t
							.duration * t.progress / 100)), l.touching = !1)
					}
					u.addEventListener("touchstart", (n => {
						l.controlsTouching = !0;
						const o = n.targetTouches[0];
						i = o.pageX, s = o.pageY, a = t.progress, c = !0, l.touching = !
							0, u.addEventListener("touchmove", d, e)
					})), u.addEventListener("touchend", f), u.addEventListener("touchcancel", f)
				})), {
					state: l,
					progressRef: o,
					ballRef: r,
					clickProgress: function(e) {
						const r = o.value;
						let i = e.target,
							s = e.offsetX;
						for (; i && i !== r;) s += i.offsetLeft, i = i.parentNode;
						const a = r.offsetWidth;
						let l = 0;
						s >= 0 && s <= a && (l = s / a, n(t.duration * l))
					},
					toggleControls: function() {
						l.controlsVisible = !l.controlsVisible
					},
					autoHideStart: u,
					autoHideEnd: d
				}
			}(e, d, h);
			return Km(f, p, h, L, m, j, N), () => ki("uni-video", {
				ref: r,
				id: e.id
			}, [ki("div", {
				ref: i,
				class: "uni-video-container",
				onTouchstart: D,
				onTouchend: q,
				onTouchmove: z,
				onFullscreenchange: js(I, ["stop"]),
				onWebkitfullscreenchange: js((e => I(e, !0)), ["stop"])
			}, [ki("video", Ii({
				ref: u,
				style: {
					"object-fit": e.objectFit
				},
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
			}), null, 16, ["muted", "loop", "src", "poster", "autoplay",
				"webkit-playsinline", "playsinline", "onClick", "onDurationchange",
				"onLoadedmetadata", "onProgress", "onWaiting", "onError", "onPlay",
				"onPause", "onEnded", "onTimeupdate", "onWebkitbeginfullscreen",
				"onX5videoenterfullscreen", "onWebkitendfullscreen",
				"onX5videoexitfullscreen"
			]), mr(ki("div", {
				class: "uni-video-bar uni-video-bar-full",
				onClick: js((() => {}), ["stop"])
			}, [ki("div", {
				class: "uni-video-controls"
			}, [mr(ki("div", {
				class: {
					"uni-video-control-button": !0,
					"uni-video-control-button-play": !d.playing,
					"uni-video-control-button-pause": d.playing
				},
				onClick: js(g, ["stop"])
			}, null, 10, ["onClick"]), [
				[Ns, e.showPlayBtn]
			]), mr(ki("div", {
				class: "uni-video-current-time"
			}, [Jm(d.currentTime)], 512), [
				[Ns, e.showProgress]
			]), mr(ki("div", {
				ref: W,
				class: "uni-video-progress-container",
				onClick: js($, ["stop"])
			}, [ki("div", {
				class: "uni-video-progress"
			}, [ki("div", {
				style: {
					width: d.buffered + "%"
				},
				class: "uni-video-progress-buffered"
			}, null, 4), ki("div", {
				ref: V,
				style: {
					left: d.progress + "%"
				},
				class: "uni-video-ball"
			}, [ki("div", {
				class: "uni-video-inner"
			}, null)], 4)])], 8, ["onClick"]), [
				[Ns, e.showProgress]
			]), mr(ki("div", {
				class: "uni-video-duration"
			}, [Jm(Number(e.duration) || d.duration)], 512), [
				[Ns, e.showProgress]
			])]), mr(ki("div", {
				class: {
					"uni-video-danmu-button": !0,
					"uni-video-danmu-button-active": A.enable
				},
				onClick: js(P, ["stop"])
			}, [c("uni.video.danmu")], 10, ["onClick"]), [
				[Ns, e.danmuBtn]
			]), mr(ki("div", {
				class: {
					"uni-video-fullscreen": !0,
					"uni-video-type-fullscreen": O.fullscreen
				},
				onClick: js((() => F(!O.fullscreen)), ["stop"])
			}, null, 10, ["onClick"]), [
				[Ns, e.showFullscreenBtn]
			])], 8, ["onClick"]), [
				[Ns, H.controlsShow]
			]), mr(ki("div", {
				ref: C,
				style: "z-index: 0;",
				class: "uni-video-danmu"
			}, null, 512), [
				[Ns, d.start && A.enable]
			]), H.centerPlayBtnShow && ki("div", {
				class: "uni-video-cover",
				onClick: js((() => {}), ["stop"])
			}, [ki("div", {
				class: "uni-video-cover-play-button",
				onClick: js(f, ["stop"])
			}, null, 8, ["onClick"]), ki("p", {
				class: "uni-video-cover-duration"
			}, [Jm(Number(e.duration) || d.duration)])], 8, ["onClick"]), ki("div", {
				class: {
					"uni-video-toast": !0,
					"uni-video-toast-volume": "volume" === R.gestureType
				}
			}, [ki("div", {
				class: "uni-video-toast-title"
			}, [c("uni.video.volume")]), ki("svg", {
				class: "uni-video-toast-icon",
				width: "200px",
				height: "200px",
				viewBox: "0 0 1024 1024",
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg"
			}, [ki("path", {
				d: "M475.400704 201.19552l0 621.674496q0 14.856192-10.856448 25.71264t-25.71264 10.856448-25.71264-10.856448l-190.273536-190.273536-149.704704 0q-14.856192 0-25.71264-10.856448t-10.856448-25.71264l0-219.414528q0-14.856192 10.856448-25.71264t25.71264-10.856448l149.704704 0 190.273536-190.273536q10.856448-10.856448 25.71264-10.856448t25.71264 10.856448 10.856448 25.71264zm219.414528 310.837248q0 43.425792-24.28416 80.851968t-64.2816 53.425152q-5.71392 2.85696-14.2848 2.85696-14.856192 0-25.71264-10.570752t-10.856448-25.998336q0-11.999232 6.856704-20.284416t16.570368-14.2848 19.427328-13.142016 16.570368-20.284416 6.856704-32.569344-6.856704-32.569344-16.570368-20.284416-19.427328-13.142016-16.570368-14.2848-6.856704-20.284416q0-15.427584 10.856448-25.998336t25.71264-10.570752q8.57088 0 14.2848 2.85696 39.99744 15.427584 64.2816 53.139456t24.28416 81.137664zm146.276352 0q0 87.422976-48.56832 161.41824t-128.5632 107.707392q-7.428096 2.85696-14.2848 2.85696-15.427584 0-26.284032-10.856448t-10.856448-25.71264q0-22.284288 22.284288-33.712128 31.997952-16.570368 43.425792-25.141248 42.283008-30.855168 65.995776-77.423616t23.712768-99.136512-23.712768-99.136512-65.995776-77.423616q-11.42784-8.57088-43.425792-25.141248-22.284288-11.42784-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 79.99488 33.712128 128.5632 107.707392t48.56832 161.41824zm146.276352 0q0 131.42016-72.566784 241.41312t-193.130496 161.989632q-7.428096 2.85696-14.856192 2.85696-14.856192 0-25.71264-10.856448t-10.856448-25.71264q0-20.570112 22.284288-33.712128 3.999744-2.285568 12.85632-5.999616t12.85632-5.999616q26.284032-14.2848 46.854144-29.140992 70.281216-51.996672 109.707264-129.705984t39.426048-165.132288-39.426048-165.132288-109.707264-129.705984q-20.570112-14.856192-46.854144-29.140992-3.999744-2.285568-12.85632-5.999616t-12.85632-5.999616q-22.284288-13.142016-22.284288-33.712128 0-14.856192 10.856448-25.71264t25.71264-10.856448q7.428096 0 14.856192 2.85696 120.563712 51.996672 193.130496 161.989632t72.566784 241.41312z"
			}, null)]), ki("div", {
				class: "uni-video-toast-value"
			}, [ki("div", {
				style: {
					width: 100 * R.volumeNew + "%"
				},
				class: "uni-video-toast-value-content"
			}, [ki("div", {
				class: "uni-video-toast-volume-grids"
			}, [Tr(10, (() => ki("div", {
				class: "uni-video-toast-volume-grids-item"
			}, null)))])], 4)])], 2), ki("div", {
				class: {
					"uni-video-toast": !0,
					"uni-video-toast-progress": "progress" === R.gestureType
				}
			}, [ki("div", {
				class: "uni-video-toast-title"
			}, [Jm(R.currentTimeNew), " / ", Jm(d.duration)])], 2), ki("div", {
				class: "uni-video-slots"
			}, [o.default && o.default()])], 40, ["onTouchstart", "onTouchend", "onTouchmove",
				"onFullscreenchange", "onWebkitfullscreenchange"
			])], 8, ["id"])
		}
	}),
	eg = ({
		name: e,
		arg: t
	}) => {
		"postMessage" === e || uni[e](t)
	},
	tg = Re((() => Xv.on(Pe, eg))),
	ng = Tu({
		inheritAttrs: !1,
		name: "WebView",
		props: {
			src: {
				type: String,
				default: ""
			},
			fullscreen: {
				type: Boolean,
				default: !0
			}
		},
		setup(e) {
			tg();
			const t = Pn(null),
				n = Pn(null),
				{
					$attrs: o,
					$excludeAttrs: r,
					$listeners: i
				} = Up({
					excludeListeners: !0
				});
			let s;
			return (() => {
				const r = document.createElement("iframe");
				To((() => {
					for (const e in o.value)
						if (E(o.value, e)) {
							const t = o.value[e];
							r[e] = t
						}
				})), To((() => {
					r.src = Nu(e.src)
				})), n.value = r, s = function(e, t, n) {
					const o = () => {
						var o, r;
						if (n) {
							const {
								top: n,
								left: o,
								width: r,
								height: i
							} = e.value.getBoundingClientRect();
							Ne(t.value, {
								position: "absolute",
								display: "block",
								border: "0",
								top: n + "px",
								left: o + "px",
								width: r + "px",
								height: i + "px"
							})
						} else Ne(t.value, {
							width: (null == (o = e.value) ? void 0 : o.style.width) ||
								"300px",
							height: (null == (r = e.value) ? void 0 : r.style.height) ||
								"150px"
						})
					};
					return o
				}(t, n, e.fullscreen), e.fullscreen && document.body.appendChild(r)
			})(), sr((() => {
				var o;
				s(), !e.fullscreen && (null == (o = t.value) || o.appendChild(n.value))
			})), Xo((() => {
				e.fullscreen && (n.value.style.display = "block")
			})), Yo((() => {
				e.fullscreen && (n.value.style.display = "none")
			})), cr((() => {
				e.fullscreen && document.body.removeChild(n.value)
			})), () => ki(li, null, [ki("uni-web-view", Ii({
				class: e.fullscreen ? "uni-webview--fullscreen" : ""
			}, i.value, r.value, {
				ref: t
			}), [ki(lp, {
				onResize: s
			}, null, 8, ["onResize"])], 16)])
		}
	});
const og = Bd("makePhoneCall", (({
		phoneNumber: e
	}, {
		resolve: t
	}) => (window.location.href = `tel:${e}`, t()))),
	rg = "__DC_STAT_UUID",
	ig = window.localStorage || window.sessionStorage || {};
let sg;

function ag() {
	if (sg = sg || ig[rg], !sg) {
		sg = Date.now() + "" + Math.floor(1e7 * Math.random());
		try {
			ig[rg] = sg
		} catch (e) {}
	}
	return sg
}

function lg() {
	if (!0 !== __uniConfig.darkmode) return P(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
	try {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
	} catch (e) {
		return "light"
	}
}

function cg() {
	let e, t = "0",
		n = "",
		o = "phone";
	const r = navigator.language;
	if (qu) {
		e = "iOS";
		const o = Ru.match(/OS\s([\w_]+)\slike/);
		o && (t = o[1].replace(/_/g, "."));
		const r = Ru.match(/\(([a-zA-Z]+);/);
		r && (n = r[1])
	} else if (Du) {
		e = "Android";
		const o = Ru.match(/Android[\s/]([\w\.]+)[;\s]/);
		o && (t = o[1]);
		const r = Ru.match(/\((.+?)\)/),
			i = r ? r[1].split(";") : Ru.split(" "),
			s = [/\bAndroid\b/i, /\bLinux\b/i, /\bU\b/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /\bwv\b/i,
				/\/[\d\.,]+$/, /^\s?[\d\.,]+$/, /\bBrowser\b/i, /\bMobile\b/i
			];
		for (let e = 0; e < i.length; e++) {
			const t = i[e];
			if (t.indexOf("Build") > 0) {
				n = t.split("Build")[0].trim();
				break
			}
			let o;
			for (let e = 0; e < s.length; e++)
				if (s[e].test(t)) {
					o = !0;
					break
				} if (!o) {
				n = t.trim();
				break
			}
		}
	} else if (Vu) n = "iPad", e = "iOS", o = "pad", t = B(window.BigInt) ? "14.0" : "13.0";
	else if (zu || Hu || Wu) {
		n = "PC", e = "PC", o = "pc", t = "0";
		let r = Ru.match(/\((.+?)\)/)[1];
		if (zu) {
			switch (e = "Windows", zu[1]) {
				case "5.1":
					t = "XP";
					break;
				case "6.0":
					t = "Vista";
					break;
				case "6.1":
					t = "7";
					break;
				case "6.2":
					t = "8";
					break;
				case "6.3":
					t = "8.1";
					break;
				case "10.0":
					t = "10"
			}
			const n = r && r.match(/[Win|WOW]([\d]+)/);
			n && (t += ` x${n[1]}`)
		} else if (Hu) {
			e = "macOS";
			const n = r && r.match(/Mac OS X (.+)/) || "";
			t && (t = n[1].replace(/_/g, "."), -1 !== t.indexOf(";") && (t = t.split(";")[0]))
		} else if (Wu) {
			e = "Linux";
			const n = r && r.match(/Linux (.*)/) || "";
			n && (t = n[1], -1 !== t.indexOf(";") && (t = t.split(";")[0]))
		}
	} else e = "Other", t = "0", o = "unknown";
	const i = `${e} ${t}`,
		s = e.toLocaleLowerCase();
	let a = "",
		l = String(function() {
			const e = navigator.userAgent,
				t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1,
				n = e.indexOf("Edge") > -1 && !t,
				o = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
			if (t) {
				new RegExp("MSIE (\\d+\\.\\d+);").test(e);
				const t = parseFloat(RegExp.$1);
				return t > 6 ? t : 6
			}
			return n ? -1 : o ? 11 : -1
		}());
	if ("-1" !== l) a = "IE";
	else {
		const e = ["Version", "Firefox", "Chrome", "Edge{0,1}"],
			t = ["Safari", "Firefox", "Chrome", "Edge"];
		for (let n = 0; n < e.length; n++) {
			const o = e[n],
				r = new RegExp(`(${o})/(\\S*)\\b`);
			r.test(Ru) && (a = t[n], l = Ru.match(r)[2])
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
		ua: Ru,
		osname: e,
		osversion: t,
		theme: lg()
	}
}
const ug = Cd(0, (() => {
	const e = window.devicePixelRatio,
		t = $u(),
		n = Qu(t),
		o = Uu(t, n),
		r = function(e, t) {
			return e ? Math[t ? "min" : "max"](screen.height, screen.width) : screen.height
		}(t, n),
		i = Xu(o);
	let s = window.innerHeight;
	const a = Tc.top,
		l = {
			left: Tc.left,
			right: i - Tc.right,
			top: Tc.top,
			bottom: s - Tc.bottom,
			width: i - Tc.left - Tc.right,
			height: s - Tc.top - Tc.bottom
		},
		{
			top: c,
			bottom: u
		} = Ac();
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
		safeAreaInsets: {
			top: Tc.top,
			right: Tc.right,
			bottom: Tc.bottom,
			left: Tc.left
		},
		screenTop: r - s
	}
}));
let dg, fg = !0;

function pg() {
	fg && (dg = cg())
}
const hg = Cd(0, (() => {
		pg();
		const {
			deviceBrand: e,
			deviceModel: t,
			brand: n,
			model: o,
			platform: r,
			system: i,
			deviceOrientation: s,
			deviceType: a
		} = dg;
		return {
			brand: n,
			deviceBrand: e,
			deviceModel: t,
			devicePixelRatio: window.devicePixelRatio,
			deviceId: ag(),
			deviceOrientation: s,
			deviceType: a,
			model: o,
			platform: r,
			system: i
		}
	})),
	mg = Cd(0, (() => {
		pg();
		const {
			theme: e,
			language: t,
			browserName: n,
			browserVersion: o
		} = dg;
		return {
			appId: __uniConfig.appId,
			appName: __uniConfig.appName,
			appVersion: __uniConfig.appVersion,
			appVersionCode: __uniConfig.appVersionCode,
			appLanguage: mf ? mf() : t,
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
	})),
	gg = Cd(0, (() => {
		fg = !0, pg(), fg = !1;
		const e = ug(),
			t = hg(),
			n = mg();
		fg = !0;
		const {
			ua: o,
			browserName: r,
			browserVersion: i,
			osname: s,
			osversion: a
		} = dg, l = x(e, t, n, {
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
		return delete l.screenTop, delete l.enableDebug, __uniConfig.darkmode || delete l.theme,
			function(e) {
				let t = {};
				return j(e) && Object.keys(e).sort().forEach((n => {
					const o = n;
					t[o] = e[o]
				})), Object.keys(t) ? t : e
			}(l)
	})),
	vg = Bd("getSystemInfo", ((e, {
		resolve: t
	}) => t(gg())));
const bg = Cd(0, ((e, t) => {
		const n = typeof t,
			o = "string" === n ? t : JSON.stringify({
				type: n,
				data: t
			});
		localStorage.setItem(e, o)
	})),
	yg = Bd("setStorage", (({
		key: e,
		data: t
	}, {
		resolve: n,
		reject: o
	}) => {
		try {
			bg(e, t), n()
		} catch (r) {
			o(r.message)
		}
	}));

function _g(e) {
	const t = localStorage && localStorage.getItem(e);
	if (!P(t)) throw new Error("data not found");
	let n = t;
	try {
		const e = function(e) {
			const t = ["object", "string", "number", "boolean", "undefined"];
			try {
				const n = P(e) ? JSON.parse(e) : e,
					o = n.type;
				if (t.indexOf(o) >= 0) {
					const e = Object.keys(n);
					if (2 === e.length && "data" in n) {
						if (typeof n.data === o) return n.data;
						if ("object" === o && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(n.data))
						return new Date(n.data)
					} else if (1 === e.length) return ""
				}
			} catch (n) {}
		}(JSON.parse(t));
		void 0 !== e && (n = e)
	} catch (o) {}
	return n
}
const wg = Cd(0, (e => {
		try {
			return _g(e)
		} catch (t) {
			return ""
		}
	})),
	xg = Bd("getStorage", (({
		key: e
	}, {
		resolve: t,
		reject: n
	}) => {
		try {
			t({
				data: _g(e)
			})
		} catch (o) {
			n(o.message)
		}
	})),
	Tg = Cd(0, (e => {
		localStorage && localStorage.removeItem(e)
	})),
	Sg = Bd("hideKeyboard", ((e, {
		resolve: t,
		reject: n
	}) => {
		const o = document.activeElement;
		!o || "TEXTAREA" !== o.tagName && "INPUT" !== o.tagName || (o.blur(), t())
	})),
	Eg = {
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

function kg({
	count: e,
	sourceType: t,
	type: n,
	extension: o
}) {
	const r = document.createElement("input");
	return r.type = "file", Ne(r, {
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
				return `${n}/${Eg[n][t]||t}`
			}
			return function() {
				const e = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
				return !(!e || "micromessenger" !== e[0])
			}() ? "." : 0 === e.indexOf(".") ? e : `.${e}`
		})).join(","), e && e > 1 && (r.multiple = !0), "all" !== n && t instanceof Array && 1 === t.length &&
		"camera" === t[0] && r.setAttribute("capture", "camera"), r
}
Op();
let Ag = null;
const Cg = Bd("chooseFile", (({
	count: e,
	sourceType: t,
	type: n,
	extension: o
}, {
	resolve: r,
	reject: i
}) => {
	Ul();
	const {
		t: s
	} = Hl();
	Ag && (document.body.removeChild(Ag), Ag = null), Ag = kg({
		count: e,
		sourceType: t,
		type: n,
		extension: o
	}), document.body.appendChild(Ag), Ag.addEventListener("change", (function(t) {
		const n = t.target,
			o = [];
		if (n && n.files) {
			const t = n.files.length;
			for (let r = 0; r < t; r++) {
				const t = n.files[r];
				let i;
				Object.defineProperty(t, "path", {
					get: () => (i = i || rp(t), i)
				}), r < e && o.push(t)
			}
		}
		r({
			get tempFilePaths() {
				return o.map((({
					path: e
				}) => e))
			},
			tempFiles: o
		})
	})), Ag.click(), Ip() || console.warn(s("uni.chooseFile.notUserActivation"))
}), 0, xf);
let Bg = null;
const Pg = Bd("chooseImage", (({
		count: e,
		sourceType: t,
		extension: n
	}, {
		resolve: o,
		reject: r
	}) => {
		Ul();
		const {
			t: i
		} = Hl();
		Bg && (document.body.removeChild(Bg), Bg = null), Bg = kg({
			count: e,
			sourceType: t,
			extension: n,
			type: "image"
		}), document.body.appendChild(Bg), Bg.addEventListener("change", (function(t) {
			const n = t.target,
				r = [];
			if (n && n.files) {
				const t = n.files.length;
				for (let o = 0; o < t; o++) {
					const t = n.files[o];
					let i;
					Object.defineProperty(t, "path", {
						get: () => (i = i || rp(t), i)
					}), o < e && r.push(t)
				}
			}
			o({
				get tempFilePaths() {
					return r.map((({
						path: e
					}) => e))
				},
				tempFiles: r
			})
		})), Bg.click(), Ip() || console.warn(i("uni.chooseFile.notUserActivation"))
	}), 0, yf),
	Lg = {
		esc: ["Esc", "Escape"],
		enter: ["Enter"]
	},
	Og = Object.keys(Lg);

function Ig(e, t, n) {
	return t.onClose = (...e) => (t.visible = !1, n.apply(null, e)), zs(Do({
		setup: () => () => (hi(), yi(e, t, null, 16))
	}))
}

function Mg(e) {
	let t = document.getElementById(e);
	return t || (t = document.createElement("div"), t.id = e, document.body.append(t)), t
}

function Fg(e, {
	onEsc: t,
	onEnter: n
}) {
	const o = Pn(e.visible),
		{
			key: r,
			disable: i
		} = function() {
			const e = Pn(""),
				t = Pn(!1),
				n = n => {
					if (t.value) return;
					const o = Og.find((e => -1 !== Lg[e].indexOf(n.key)));
					o && (e.value = o), Zn((() => e.value = ""))
				};
			return sr((() => {
				document.addEventListener("keyup", n)
			})), cr((() => {
				document.removeEventListener("keyup", n)
			})), {
				key: e,
				disable: t
			}
		}();
	return Eo((() => e.visible), (e => o.value = e)), Eo((() => o.value), (e => i.value = !e)), To((() => {
		const {
			value: e
		} = r;
		"esc" === e ? t && t() : "enter" === e && n && n()
	})), o
}
let jg = 0,
	Ng = "";

function Rg(e) {
	let t = jg;
	jg += e ? 1 : -1, jg = Math.max(0, jg), jg > 0 ? 0 === t && (Ng = document.body.style.overflow, document.body.style
		.overflow = "hidden") : (document.body.style.overflow = Ng, Ng = "")
}
const Dg = Su({
	name: "ImageView",
	props: {
		src: {
			type: String,
			default: ""
		}
	},
	setup(e) {
		const t = gn({
			direction: "none"
		});
		let n = 1,
			o = 0,
			r = 0,
			i = 0,
			s = 0;

		function a({
			detail: e
		}) {
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
			const a = n * o > i,
				l = n * r > s;
			t.direction = a && l ? "all" : a ? "horizontal" : l ? "vertical" : "none", d(e)
		}

		function d(e) {
			"all" !== t.direction && "horizontal" !== t.direction || e.stopPropagation()
		}
		return () => {
			const n = {
				position: "absolute",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%"
			};
			return ki(Yp, {
				style: n,
				onTouchstart: Cu(c),
				onTouchmove: Cu(d),
				onTouchend: Cu(u)
			}, {
				default: () => [ki(lh, {
					style: n,
					direction: t.direction,
					inertia: !0,
					scale: !0,
					"scale-min": "1",
					"scale-max": "4",
					onScale: a
				}, {
					default: () => [ki("img", {
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

function qg(e) {
	let t = "number" == typeof e.current ? e.current : e.urls.indexOf(e.current);
	return t = t < 0 ? 0 : t, t
}
const zg = Su({
	name: "ImagePreview",
	props: {
		urls: {
			type: Array,
			default: () => []
		},
		current: {
			type: [Number, String],
			default: 0
		}
	},
	emits: ["close"],
	setup(e, {
		emit: t
	}) {
		sr((() => Rg(!0))), ur((() => Rg(!1)));
		const n = Pn(null),
			o = Pn(qg(e));
		let r;

		function i() {
			r || Zn((() => {
				t("close")
			}))
		}

		function s(e) {
			o.value = e.detail.current
		}
		Eo((() => e.current), (() => o.value = qg(e))), sr((() => {
			const e = n.value;
			let t = 0,
				o = 0;
			e.addEventListener("mousedown", (e => {
				r = !1, t = e.clientX, o = e.clientY
			})), e.addEventListener("mouseup", (e => {
				(Math.abs(e.clientX - t) > 20 || Math.abs(e.clientY - o) > 20) && (r = !
					0)
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
			return ki("div", {
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
			}, [ki(jh, {
				navigation: "auto",
				current: o.value,
				onChange: s,
				"indicator-dots": !1,
				autoplay: !1,
				style: {
					position: "absolute",
					left: "0",
					top: "0",
					width: "100%",
					height: "100%"
				}
			}, (r = t = e.urls.map((e => ki(Rh, null, {
					default: () => [ki(Dg, {
						src: e
					}, null, 8, ["src"])]
				}))), "function" == typeof r || "[object Object]" === Object.prototype
				.toString.call(r) && !_i(r) ? t : {
					default: () => [t],
					_: 1
				}), 8, ["current", "onChange"]), ki("div", {
				style: a
			}, [Fc("M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z",
				"#ffffff", 26)], 4)], 8, ["onClick"]);
			var r
		}
	}
});
let Hg, Wg = null;
const Vg = () => {
		Wg = null, Zn((() => {
			null == Hg || Hg.unmount(), Hg = null
		}))
	},
	$g = Bd("previewImage", ((e, {
		resolve: t
	}) => {
		Wg ? x(Wg, e) : (Wg = gn(e), Zn((() => {
			Hg = Ig(zg, Wg, Vg), Hg.mount(Mg("u-a-p"))
		}))), t()
	}), 0, Tf);
let Qg = null;
const Ug = Bd("chooseVideo", (({
		sourceType: e,
		extension: t
	}, {
		resolve: n,
		reject: o
	}) => {
		Ul();
		const {
			t: r
		} = Hl();
		Qg && (document.body.removeChild(Qg), Qg = null), Qg = kg({
			sourceType: e,
			extension: t,
			type: "video"
		}), document.body.appendChild(Qg), Qg.addEventListener("change", (function(e) {
			const t = e.target.files[0];
			let o = "";
			const r = {
				tempFilePath: o,
				tempFile: t,
				size: t.size,
				duration: 0,
				width: 0,
				height: 0,
				name: t.name
			};
			Object.defineProperty(r, "tempFilePath", {
				get() {
					return o = o || rp(this.tempFile), o
				}
			});
			const i = document.createElement("video");
			if (void 0 !== i.onloadedmetadata) {
				const e = rp(t);
				i.onloadedmetadata = function() {
					ip(e), n(x(r, {
						duration: i.duration || 0,
						width: i.videoWidth || 0,
						height: i.videoHeight || 0
					}))
				}, setTimeout((() => {
					i.onloadedmetadata = null, ip(e), n(r)
				}), 300), i.src = e
			} else n(r)
		})), Qg.click(), Ip() || console.warn(r("uni.chooseFile.notUserActivation"))
	}), 0, _f),
	Xg = Ad("request", (({
		url: e,
		data: t,
		header: n,
		method: o,
		dataType: r,
		responseType: i,
		withCredentials: s,
		timeout: a = __uniConfig.networkTimeout.request
	}, {
		resolve: l,
		reject: c
	}) => {
		let u = null;
		const d = function(e) {
			const t = Object.keys(e).find((e => "content-type" === e.toLowerCase()));
			if (!t) return;
			const n = e[t];
			if (0 === n.indexOf("application/json")) return "json";
			if (0 === n.indexOf("application/x-www-form-urlencoded")) return "urlencoded";
			return "string"
		}(n);
		if ("GET" !== o)
			if (P(t) || t instanceof ArrayBuffer) u = t;
			else if ("json" === d) try {
			u = JSON.stringify(t)
		} catch (m) {
			u = t.toString()
		} else if ("urlencoded" === d) {
			const e = [];
			for (const n in t) E(t, n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
			u = e.join("&")
		} else u = t.toString();
		const f = new XMLHttpRequest,
			p = new Yg(f);
		f.open(o, e);
		for (const g in n) E(n, g) && f.setRequestHeader(g, n[g]);
		const h = setTimeout((function() {
			f.onload = f.onabort = f.onerror = null, p.abort(), c("timeout")
		}), a);
		return f.responseType = i, f.onload = function() {
			clearTimeout(h);
			const e = f.status;
			let t = "text" === i ? f.responseText : f.response;
			if ("text" === i && "json" === r) try {
				t = JSON.parse(t)
			} catch (m) {}
			l({
				data: t,
				statusCode: e,
				header: Jg(f.getAllResponseHeaders()),
				cookies: []
			})
		}, f.onabort = function() {
			clearTimeout(h), c("abort")
		}, f.onerror = function() {
			clearTimeout(h), c()
		}, f.withCredentials = s, f.send(u), p
	}), 0, Af);
class Yg {
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

function Jg(e) {
	const t = {};
	return e.split(K).forEach((e => {
		const n = e.match(/(\S+\s*):\s*(.*)/);
		n && 3 === n.length && (t[n[1]] = n[2])
	})), t
}
class Gg {
	constructor(e) {
		this._callbacks = [], this._xhr = e
	}
	onProgressUpdate(e) {
		B(e) && this._callbacks.push(e)
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
const Kg = Ad("downloadFile", (({
	url: e,
	header: t,
	timeout: n = __uniConfig.networkTimeout.downloadFile
}, {
	resolve: o,
	reject: r
}) => {
	var i, s = new XMLHttpRequest,
		a = new Gg(s);
	return s.open("GET", e, !0), Object.keys(t).forEach((e => {
		s.setRequestHeader(e, t[e])
	})), s.responseType = "blob", s.onload = function() {
		clearTimeout(i);
		const t = s.status,
			n = this.response;
		let r;
		const a = s.getResponseHeader("content-disposition");
		if (a) {
			const e = a.match(/filename="?(\S+)"?\b/);
			e && (r = e[1])
		}
		n.name = r || function(e) {
			const t = (e = e.split("#")[0].split("?")[0]).split("/");
			return t[t.length - 1]
		}(e), o({
			statusCode: t,
			tempFilePath: rp(n)
		})
	}, s.onabort = function() {
		clearTimeout(i), r("abort")
	}, s.onerror = function() {
		clearTimeout(i), r()
	}, s.onprogress = function(e) {
		a._callbacks.forEach((t => {
			var n = e.loaded,
				o = e.total;
			t({
				progress: Math.round(n / o * 100),
				totalBytesWritten: n,
				totalBytesExpectedToWrite: o
			})
		}))
	}, s.send(), i = setTimeout((function() {
		s.onprogress = s.onload = s.onabort = s.onerror = null, a.abort(), r("timeout")
	}), n), a
}), 0, Cf);
class Zg {
	constructor(e) {
		this._callbacks = [], this._xhr = e
	}
	onProgressUpdate(e) {
		B(e) && this._callbacks.push(e)
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
const ev = Ad("uploadFile", (({
		url: e,
		file: t,
		filePath: n,
		name: o,
		files: r,
		header: i,
		formData: s,
		timeout: a = __uniConfig.networkTimeout.uploadFile
	}, {
		resolve: l,
		reject: c
	}) => {
		var u = new Zg;
		return k(r) && r.length || (r = [{
			name: o,
			file: t,
			uri: n
		}]), Promise.all(r.map((({
			file: e,
			uri: t
		}) => e instanceof Blob ? Promise.resolve(op(e)) : np(t)))).then((function(t) {
			var n, o = new XMLHttpRequest,
				d = new FormData;
			Object.keys(s).forEach((e => {
				d.append(e, s[e])
			})), Object.values(r).forEach((({
				name: e
			}, n) => {
				const o = t[n];
				d.append(e || "file", o, o.name || `file-${Date.now()}`)
			})), o.open("POST", e), Object.keys(i).forEach((e => {
				o.setRequestHeader(e, i[e])
			})), o.upload.onprogress = function(e) {
				u._callbacks.forEach((t => {
					var n = e.loaded,
						o = e.total;
					t({
						progress: Math.round(n / o * 100),
						totalBytesSent: n,
						totalBytesExpectedToSend: o
					})
				}))
			}, o.onerror = function() {
				clearTimeout(n), c()
			}, o.onabort = function() {
				clearTimeout(n), c("abort")
			}, o.onload = function() {
				clearTimeout(n);
				const e = o.status;
				l({
					statusCode: e,
					data: o.responseText || o.response
				})
			}, u._isAbort ? c("abort") : (n = setTimeout((function() {
				o.upload.onprogress = o.onload = o.onabort = o.onerror = null, u
					.abort(), c("timeout")
			}), a), o.send(d), u._xhr = o)
		})).catch((() => {
			setTimeout((() => {
				c("file error")
			}), 0)
		})), u
	}), 0, Bf),
	tv = Bd("navigateBack", ((e, {
		resolve: t,
		reject: n
	}) => {
		let o = !0;
		return !0 === Vc(me, {
			from: e.from || "navigateBack"
		}) && (o = !1), o ? (zm().$router.go(-e.delta), t()) : n(me)
	}), 0, qf);

function nv({
	type: e,
	url: t,
	tabBarText: n,
	events: o
}, r) {
	const i = zm().$router,
		{
			path: s,
			query: a
		} = function(e) {
			const [t, n] = e.split("?", 2);
			return {
				path: t,
				query: Xe(n || "")
			}
		}(t);
	return new Promise(((t, l) => {
		const c = function(e, t) {
			return {
				__id__: t || ++ym,
				__type__: e
			}
		}(e, r);
		i["navigateTo" === e ? "push" : "replace"]({
			path: s,
			query: a,
			state: c,
			force: !0
		}).then((r => {
			if (ja(r)) return l(r.message);
			if ("switchTab" === e && (i.currentRoute.value.meta.tabBarText = n),
				"navigateTo" === e) {
				const e = i.currentRoute.value.meta;
				return e.eventChannel ? o && (Object.keys(o).forEach((t => {
						e.eventChannel._addListener(t, "on", o[t])
					})), e.eventChannel._clearCache()) : e.eventChannel = new Je(c.__id__, o),
					t({
						eventChannel: e.eventChannel
					})
			}
			return t()
		}))
	}))
}
const ov = Bd(Lf, (({
	url: e,
	events: t
}, {
	resolve: n,
	reject: o
}) => nv({
	type: Lf,
	url: e,
	events: t
}).then(n).catch(o)), 0, jf);
const rv = Bd(Of, (({
	url: e
}, {
	resolve: t,
	reject: n
}) => (function() {
	const e = Rc();
	if (!e) return;
	const t = e.$page;
	bm(xm(t.path, t.id))
}(), nv({
	type: Of,
	url: e
}).then(t).catch(n))), 0, Nf);
const iv = Bd(If, (({
	url: e
}, {
	resolve: t,
	reject: n
}) => (function() {
	const e = gm().keys();
	for (const t of e) bm(t)
}(), nv({
	type: If,
	url: e
}).then(t).catch(n))), 0, Rf);

function sv(e, t) {
	return e === t.fullPath || "/" === e && t.meta.isEntry
}
const av = Bd(Mf, (({
	url: e,
	tabBarText: t
}, {
	resolve: n,
	reject: o
}) => (function() {
	const e = zc();
	if (!e) return;
	const t = gm(),
		n = t.keys();
	for (const o of n) {
		const e = t.get(o);
		e.$.__isTabBar ? e.$.__isActive = !1 : bm(o)
	}
	e.$.__isTabBar && (e.$.__isVisible = !1, Vc(e, re))
}(), nv({
	type: Mf,
	url: e,
	tabBarText: t
}, function(e) {
	const t = gm().values();
	for (const n of t) {
		const t = n.$page;
		if (sv(e, t)) return n.$.__isActive = !0, t.id
	}
}(e)).then(n).catch(o))), 0, Df);

function lv(e) {
	__uniConfig.darkmode && Xv.on(ae, e)
}

function cv(e) {
	let t = {};
	return __uniConfig.darkmode && (t = it(e, __uniConfig.themeConfig, lg())), __uniConfig.darkmode ? t : e
}
const uv = {
		title: {
			type: String,
			default: ""
		},
		icon: {
			default: "success",
			validator: e => -1 !== Xf.indexOf(e)
		},
		image: {
			type: String,
			default: ""
		},
		duration: {
			type: Number,
			default: 1500
		},
		mask: {
			type: Boolean,
			default: !1
		},
		visible: {
			type: Boolean
		}
	},
	dv = "uni-toast__icon",
	fv = {
		light: "#fff",
		dark: "rgba(255,255,255,0.9)"
	},
	pv = e => fv[e],
	hv = Do({
		name: "Toast",
		props: uv,
		setup(e) {
			$l(), Ql();
			const {
				Icon: t
			} = function(e) {
				const t = Pn(pv(lg())),
					n = ({
						theme: e
					}) => t.value = pv(e);
				To((() => {
					var t;
					e.visible ? lv(n) : (t = n, Xv.off(ae, t))
				}));
				const o = Ui((() => {
					switch (e.icon) {
						case "success":
							return ki(Fc(Ic, t.value, 38), {
								class: dv
							});
						case "error":
							return ki(Fc(Mc, t.value, 38), {
								class: dv
							});
						case "loading":
							return ki("i", {
								class: [dv, "uni-loading"]
							}, null, 2);
						default:
							return null
					}
				}));
				return {
					Icon: o
				}
			}(e), n = Fg(e, {});
			return () => {
				const {
					mask: o,
					duration: r,
					title: i,
					image: s
				} = e;
				return ki(xs, {
					name: "uni-fade"
				}, {
					default: () => [mr(ki("uni-toast", {
						"data-duration": r
					}, [o ? ki("div", {
						class: "uni-mask",
						style: "background: transparent;",
						onTouchmove: Sc
					}, null, 40, ["onTouchmove"]) : "", s || t.value ? ki("div", {
						class: "uni-toast"
					}, [s ? ki("img", {
						src: s,
						class: dv
					}, null, 10, ["src"]) : t.value, ki("p", {
						class: "uni-toast__content"
					}, [i])]) : ki("div", {
						class: "uni-sample-toast"
					}, [ki("p", {
						class: "uni-simple-toast__text"
					}, [i])])], 8, ["data-duration"]), [
						[Ns, n.value]
					])]
				})
			}
		}
	});
let mv, gv, vv = "";
const bv = lt();

function yv(e) {
	mv ? x(mv, e) : (mv = gn(x(e, {
		visible: !1
	})), Zn((() => {
		bv.run((() => {
			Eo([() => mv.visible, () => mv.duration], (([e, t]) => {
				if (e) {
					if (gv && clearTimeout(gv), "onShowLoading" === vv) return;
					gv = setTimeout((() => {
						wv("onHideToast")
					}), t)
				} else gv && clearTimeout(gv)
			}))
		})), Xv.on("onHidePopup", (() => wv("onHidePopup"))), Ig(hv, mv, (() => {})).mount(Mg(
			"u-a-t"))
	}))), setTimeout((() => {
		mv.visible = !0
	}), 10)
}
const _v = Bd("showToast", ((e, {
	resolve: t,
	reject: n
}) => {
	yv(e), vv = "onShowToast", t()
}), 0, Yf);

function wv(e) {
	const {
		t: t
	} = Hl();
	if (!vv) return;
	let n = "";
	if ("onHideToast" === e && "onShowToast" !== vv ? n = t("uni.showToast.unpaired") : "onHideLoading" === e &&
		"onShowLoading" !== vv && (n = t("uni.showLoading.unpaired")), n) return console.warn(n);
	vv = "", setTimeout((() => {
		mv.visible = !1
	}), 10)
}
const xv = Bd("loadFontFace", (({
	family: e,
	source: t,
	desc: n
}, {
	resolve: o,
	reject: r
}) => {
	(function(e, t, n) {
		const o = document.fonts;
		if (o) {
			const r = new FontFace(e, t, n);
			return r.load().then((() => {
				o.add && o.add(r)
			}))
		}
		return new Promise((o => {
			const r = document.createElement("style"),
				i = [];
			if (n) {
				const {
					style: e,
					weight: t,
					stretch: o,
					unicodeRange: r,
					variant: s,
					featureSettings: a
				} = n;
				e && i.push(`font-style:${e}`), t && i.push(`font-weight:${t}`), o && i
					.push(`font-stretch:${o}`), r && i.push(`unicode-range:${r}`), s && i
					.push(`font-variant:${s}`), a && i.push(`font-feature-settings:${a}`)
			}
			r.innerText = `@font-face{font-family:"${e}";src:${t};${i.join(";")}}`, document
				.head.appendChild(r), o()
		}))
	})(e, t, n).then((() => {
		o()
	})).catch((e => {
		r(`loadFontFace:fail ${e}`)
	}))
}));

function Tv(e) {
	function t() {
		var t;
		t = e.navigationBar.titleText, document.title = t, Xv.emit("onNavigationBarChange", {
			titleText: t
		})
	}
	To(t), Xo(t)
}
const Sv = Bd(Qf, ((e, {
		resolve: t,
		reject: n
	}) => {
		! function(e, t, n, o, r) {
			if (!e) return r("page not found");
			const {
				navigationBar: i
			} = e;
			switch (t) {
				case "setNavigationBarColor":
					const {
						frontColor: e, backgroundColor: t, animation: o
					} = n, {
						duration: r, timingFunc: s
					} = o;
					e && (i.titleColor = "#000000" === e ? "#000000" : "#ffffff"), t && (i.backgroundColor = t),
						i.duration = r + "ms", i.timingFunc = s;
					break;
				case "showNavigationBarLoading":
					i.loading = !0;
					break;
				case "hideNavigationBarLoading":
					i.loading = !1;
					break;
				case Qf:
					const {
						title: a
					} = n;
					i.titleText = a
			}
			o()
		}(Dc(), Qf, e, t, n)
	})),
	Ev = Bd("pageScrollTo", (({
		scrollTop: e,
		selector: t,
		duration: n
	}, {
		resolve: o
	}) => {
		! function(e, t, n) {
			if (P(e)) {
				const t = document.querySelector(e);
				if (t) {
					const {
						height: o,
						top: r
					} = t.getBoundingClientRect();
					e = r + window.pageYOffset, n && (e -= o)
				}
			}
			e < 0 && (e = 0);
			const o = document.documentElement,
				{
					clientHeight: r,
					scrollHeight: i
				} = o;
			if (e = Math.min(e, i - r), 0 === t) return void(o.scrollTop = document.body.scrollTop = e);
			if (window.scrollY === e) return;
			const s = t => {
				if (t <= 0) return void window.scrollTo(0, e);
				const n = e - window.scrollY;
				requestAnimationFrame((function() {
					window.scrollTo(0, window.scrollY + n / t * 10), s(t - 10)
				}))
			};
			s(t)
		}(t || e || 0, n, !0), o()
	}), 0, Uf),
	kv = Bd(Jf, ((e, {
		resolve: t
	}) => {
		Xv.invokeViewMethod(Jf, {}, qc()), t()
	})),
	Av = Bd(Gf, ((e, {
		resolve: t
	}) => {
		Xv.invokeViewMethod(Gf, {}, qc()), t()
	})),
	Cv = ["text", "iconPath", "iconfont", "selectedIconPath", "visible"],
	Bv = ["color", "selectedColor", "backgroundColor", "borderStyle", "midButton"],
	Pv = ["badge", "redDot"];

function Lv(e, t, n) {
	t.forEach((function(t) {
		E(n, t) && (e[t] = n[t])
	}))
}

function Ov(e, t, n) {
	const o = sm();
	switch (e) {
		case "showTabBar":
			o.shown = !0;
			break;
		case Kf:
			o.shown = !1;
			break;
		case "setTabBarItem":
			const {
				index: e
			} = t, n = o.list[e], r = n.pagePath;
			Lv(n, Cv, t);
			const {
				pagePath: i
			} = t;
			if (i) {
				const t = Fe(i);
				t !== r && function(e, t, n) {
					const o = Jc(Fe(t));
					if (o) {
						const {
							meta: e
						} = o;
						delete e.tabBarIndex, e.isQuit = e.isTabBar = !1
					}
					const r = Jc(Fe(n));
					if (r) {
						const {
							meta: t
						} = r;
						t.tabBarIndex = e, t.isQuit = t.isTabBar = !0;
						const o = __uniConfig.tabBar;
						o && o.list && o.list[e] && (o.list[e].pagePath = je(n))
					}
				}(e, r, t)
			}
			break;
		case "setTabBarStyle":
			Lv(o, Bv, t);
			break;
		case "showTabBarRedDot":
			Lv(o.list[t.index], Pv, {
				badge: "",
				redDot: !0
			});
			break;
		case "setTabBarBadge":
			Lv(o.list[t.index], Pv, {
				badge: t.text,
				redDot: !0
			});
			break;
		case "hideTabBarRedDot":
		case "removeTabBarBadge":
			Lv(o.list[t.index], Pv, {
				badge: "",
				redDot: !1
			})
	}
	n()
}
const Iv = Bd(Kf, ((e, {
		resolve: t
	}) => {
		Ov(Kf, e || {}, t)
	})),
	Mv = Su({
		name: "TabBar",
		setup() {
			const e = Pn([]),
				t = sm(),
				n = gn(cv(t));
			! function(e, t) {
				function n() {
					let n = [];
					n = e.list.filter((e => !1 !== e.visible)), t.value = n
				}
				Pn(x({
					type: "midButton"
				}, e.midButton)), To(n)
			}(n, e),
			function(e) {
				Eo((() => e.shown), (t => {
					Bc({
						"--window-bottom": pm(t ? parseInt(e.height) : 0)
					})
				}))
			}(n);
			const o = function(e, t, n) {
					return To((() => {
						const o = e.meta;
						if (o.isTabBar) {
							const e = o.route,
								r = n.value.findIndex((t => t.pagePath === e));
							t.selectedIndex = r
						}
					})), (t, n) => () => {
						const {
							pagePath: o,
							text: r
						} = t;
						let i = Fe(o);
						i === __uniRoutes[0].alias && (i = "/"), e.path !== i ? av({
							from: "tabBar",
							url: i,
							tabBarText: r
						}) : Vc("onTabItemTap", {
							index: n,
							text: r,
							pagePath: o
						})
					}
				}(jl(), n, e),
				{
					style: r,
					borderStyle: i,
					placeholderStyle: s
				} = function(e) {
					const t = Ui((() => {
							let t = e.backgroundColor;
							const n = e.blurEffect;
							return t || dm && n && "none" !== n && (t = Rv[n]), {
								backgroundColor: t || Fv,
								backdropFilter: "none" !== n ? "blur(10px)" : n
							}
						})),
						n = Ui((() => {
							const {
								borderStyle: t
							} = e;
							return {
								backgroundColor: Dv[t] || t
							}
						})),
						o = Ui((() => ({
							height: e.height
						})));
					return {
						style: t,
						borderStyle: n,
						placeholderStyle: o
					}
				}(n);
			return lv((() => {
				const e = cv(t);
				n.backgroundColor = e.backgroundColor, n.borderStyle = e.borderStyle, n.color = e.color,
					n.selectedColor = e.selectedColor, n.blurEffect = e.blurEffect, e.list && e.list
					.length && e.list.forEach(((e, t) => {
						n.list[t].iconPath = e.iconPath, n.list[t].selectedIconPath = e
							.selectedIconPath
					}))
			})), sr((() => {
				n.iconfontSrc && xv({
					family: "UniTabbarIconFont",
					source: `url("${n.iconfontSrc}")`
				})
			})), () => {
				const t = function(e, t, n) {
					const {
						selectedIndex: o,
						selectedColor: r,
						color: i
					} = e;
					return n.value.map(((n, s) => {
						const a = o === s;
						return function(e, t, n, o, r, i, s, a) {
							return ki("div", {
								key: s,
								class: "uni-tabbar__item",
								onClick: a(r, s)
							}, [qv(e, t || "", n, o, r, i)], 8, ["onClick"])
						}(a ? r : i, a && n.selectedIconPath || n.iconPath || "", n
							.iconfont ? a && n.iconfont.selectedText || n.iconfont.text :
							void 0, n.iconfont ? a && n.iconfont.selectedColor || n.iconfont
							.color : void 0, n, e, s, t)
					}))
				}(n, o, e);
				return ki("uni-tabbar", {
					class: "uni-tabbar-" + n.position
				}, [ki("div", {
					class: "uni-tabbar",
					style: r.value
				}, [ki("div", {
					class: "uni-tabbar-border",
					style: i.value
				}, null, 4), t], 4), ki("div", {
					class: "uni-placeholder",
					style: s.value
				}, null, 4)], 2)
			}
		}
	});
const Fv = "#f7f7fa",
	jv = "rgb(0, 0, 0, 0.8)",
	Nv = "rgb(250, 250, 250, 0.8)",
	Rv = {
		dark: jv,
		light: Nv,
		extralight: Nv
	},
	Dv = {
		white: "rgba(255, 255, 255, 0.33)",
		black: "rgba(0, 0, 0, 0.33)"
	};

function qv(e, t, n, o, r, i) {
	const {
		height: s
	} = i;
	return ki("div", {
		class: "uni-tabbar__bd",
		style: {
			height: s
		}
	}, [n ? Hv(n, o || jv, r, i) : t && zv(t, r, i), r.text && Wv(e, r, i), r.redDot && Vv(r.badge)], 4)
}

function zv(e, t, n) {
	const {
		type: o,
		text: r
	} = t, {
		iconWidth: i
	} = n;
	return ki("div", {
		class: "uni-tabbar__icon" + (r ? " uni-tabbar__icon__diff" : ""),
		style: {
			width: i,
			height: i
		}
	}, ["midButton" !== o && ki("img", {
		src: Nu(e)
	}, null, 8, ["src"])], 6)
}

function Hv(e, t, n, o) {
	var r;
	const {
		type: i,
		text: s
	} = n, {
		iconWidth: a
	} = o, l = "uni-tabbar__icon" + (s ? " uni-tabbar__icon__diff" : ""), c = {
		width: a,
		height: a
	}, u = {
		fontSize: (null == (r = n.iconfont) ? void 0 : r.fontSize) || a,
		color: t
	};
	return ki("div", {
		class: l,
		style: c
	}, ["midButton" !== i && ki("div", {
		class: "uni-tabbar__iconfont",
		style: u
	}, [e], 4)], 6)
}

function Wv(e, t, n) {
	const {
		iconPath: o,
		text: r
	} = t, {
		fontSize: i,
		spacing: s
	} = n;
	return ki("div", {
		class: "uni-tabbar__label",
		style: {
			color: e,
			fontSize: i,
			lineHeight: o ? "normal" : 1.8,
			marginTop: o ? s : "inherit"
		}
	}, [r], 4)
}

function Vv(e) {
	return ki("div", {
		class: "uni-tabbar__reddot" + (e ? " uni-tabbar__badge" : "")
	}, [e], 2)
}
const $v = "0px",
	Qv = Su({
		name: "Layout",
		setup(e, {
			emit: t
		}) {
			const n = Pn(null);
			Cc({
				"--status-bar-height": $v,
				"--top-window-height": $v,
				"--window-left": $v,
				"--window-right": $v,
				"--window-margin": $v,
				"--tab-bar-height": $v
			});
			const o = function() {
					const e = jl();
					return {
						routeKey: Ui((() => xm("/" + e.meta.route, rm()))),
						isTabBar: Ui((() => e.meta.isTabBar)),
						routeCache: Sm
					}
				}(),
				{
					layoutState: r,
					windowState: i
				} = function() {
					om(); {
						const e = gn({
							marginWidth: 0,
							leftWindowWidth: 0,
							rightWindowWidth: 0
						});
						return Eo((() => e.marginWidth), (e => Cc({
							"--window-margin": e + "px"
						}))), Eo((() => e.leftWindowWidth + e.marginWidth), (e => {
							Cc({
								"--window-left": e + "px"
							})
						})), Eo((() => e.rightWindowWidth + e.marginWidth), (e => {
							Cc({
								"--window-right": e + "px"
							})
						})), {
							layoutState: e,
							windowState: Ui((() => ({})))
						}
					}
				}();
			! function(e, t) {
				const n = om();

				function o() {
					const o = document.body.clientWidth,
						r = vm();
					let i = {};
					if (r.length > 0) {
						i = r[r.length - 1].$page.meta
					} else {
						const e = Jc(n.path, !0);
						e && (i = e.meta)
					}
					const s = parseInt(String((E(i, "maxWidth") ? i.maxWidth : __uniConfig.globalStyle.maxWidth) ||
						Number.MAX_SAFE_INTEGER));
					let a = !1;
					a = o > s, a && s ? (e.marginWidth = (o - s) / 2, Zn((() => {
						const e = t.value;
						e && e.setAttribute("style", "max-width:" + s + "px;margin:0 auto;")
					}))) : (e.marginWidth = 0, Zn((() => {
						const e = t.value;
						e && e.removeAttribute("style")
					})))
				}
				Eo([() => n.path], o), sr((() => {
					o(), window.addEventListener("resize", o)
				}))
			}(r, n);
			const s = function(e) {
					const t = om(),
						n = sm(),
						o = Ui((() => t.meta.isTabBar && n.shown));
					return Cc({
						"--tab-bar-height": n.height
					}), o
				}(),
				a = function(e) {
					const t = Pn(!1);
					return Ui((() => ({
						"uni-app--showtabbar": e && e.value,
						"uni-app--maxwidth": t.value
					})))
				}(s);
			return () => {
				const e = function(e, t, n, o, r, i) {
						const s = function({
							routeKey: e,
							isTabBar: t,
							routeCache: n
						}) {
							return ki(Il, null, {
								default: mo((({
									Component: o
								}) => [(hi(), yi(Qo, {
									matchBy: "key",
									cache: n
								}, [(hi(), yi(_r(o), {
									type: t.value ? "tabBar" :
										"",
									key: e.value
								}))], 1032, ["cache"]))])),
								_: 1
							})
						}(e);
						return s
					}(o),
					t = function(e) {
						return mr(ki(Mv, null, null, 512), [
							[Ns, e.value]
						])
					}(s);
				return ki("uni-app", {
					ref: n,
					class: a.value
				}, [e, t], 2)
			}
		}
	});
const Uv = x(oc, {
		publishHandler(e, t, n) {
			Xv.subscribeHandler(e, t, n)
		}
	}),
	Xv = x(uu, {
		publishHandler(e, t, n) {
			Uv.subscribeHandler(e, t, n)
		}
	}),
	Yv = Su({
		name: "PageBody",
		setup: (e, t) => () => ki(li, null, [!1, ki("uni-page-wrapper", null, [ki("uni-page-body", null, [Sr(t
			.slots, "default")])], 16)])
	}),
	Jv = Su({
		name: "Page",
		setup(e, t) {
			const n = nm(rm());
			return n.navigationBar, Tv(n), () => ki("uni-page", {
				"data-page": n.route
			}, [Gv(t)])
		}
	});

function Gv(e) {
	return hi(), yi(Yv, {
		key: 0
	}, {
		default: mo((() => [Sr(e.slots, "page")])),
		_: 3
	})
}
const Kv = {
	loading: "AsyncLoading",
	error: "AsyncError",
	delay: 200,
	timeout: 6e4,
	suspensible: !0
};
window.uni = {}, window.wx = {}, window.rpx2px = Rd;
const Zv = Object.assign({
		"./locale/en.json": n,
		"./locale/zh-Hans.json": o
	}),
	eb = Object.assign;
const match = location.href.match(/\/s(\d*)\//);
window.__uniConfig = eb({
	globalStyle: {
		backgroundColor: "#F8F8F8",
		backgroundColorTop: "#F8F8F8",
		backgroundColorBottom: "#F8F8F8",
		navigationBar: {
			backgroundColor: "#ffffff",
			titleText: "",
			type: "default",
			titleColor: "#000000"
		},
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
		list: [{
			pagePath: "pages/index/index"
		}, {
			pagePath: "pages/article/list"
		}, {
			pagePath: "pages/member/index"
		}],
		selectedIndex: 0,
		shown: !0
	},
	uniIdRouter: {},
	easycom: {
		custom: {
			"^u-(.*)": "uview-plus/components/u-$1/u-$1.vue",
			"diy-(.*)": "@/components/diy/$1/index.vue"
		}
	},
	compilerVersion: "3.7.9"
}, {
	appId: "__UNI__9B03DBD",
	appName: "NiuCloud-ADMIN",
	appVersion: "1.0.0",
	appVersionCode: "100",
	async: Kv,
	debug: !1,
	networkTimeout: {
		request: 6e4,
		connectSocket: 6e4,
		uploadFile: 6e4,
		downloadFile: 6e4
	},
	sdkConfigs: {},
	qqMapKey: void 0,
	googleMapKey: void 0,
	aMapKey: void 0,
	aMapSecurityJsCode: void 0,
	aMapServiceHost: void 0,
	nvue: {
		"flex-direction": "column"
	},
	locale: "",
	fallbackLocale: "zh-Hans",
	locales: Object.keys(Zv).reduce(((e, t) => {
		const n = t.replace(/\.\/locale\/(uni-app.)?(.*).json/, "$2");
		return eb(e[n] || (e[n] = {}), Zv[t].default), e
	}), {}),
	router: {
		mode: "history",
		base: match ? `/wap/s${match[1]}/` : '/wap/',
		assets: "assets",
		routerBase: match ? `/wap/s${match[1]}/` : '/wap/'
	},
	darkmode: !1,
	themeConfig: {}
}), window.__uniLayout = window.__uniLayout || {};
const tb = {
	delay: Kv.delay,
	timeout: Kv.timeout,
	suspensible: Kv.suspensible
};
Kv.loading && (tb.loadingComponent = {
	name: "SystemAsyncLoading",
	render: () => ki(br(Kv.loading))
}), Kv.error && (tb.errorComponent = {
	name: "SystemAsyncError",
	render: () => ki(br(Kv.error))
});
const nb = () => t((() => import("./pages-index-index.c8f2dcc5.js")), ["assets/pages-index-index.c8f2dcc5.js",
		"assets/u-loading-page.267b8385.js", "assets/u-loading-icon.5a04567d.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css",
		"assets/index.6e8d5422.js", "assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css",
		"assets/tabbar.7fc713f1.js", "assets/u-image.dd0f853d.js", "assets/u-image-f70fd559.css",
		"assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css",
		"assets/article.d72d1faf.js", "assets/u-avatar.7ae27837.js", "assets/u-avatar-0d8f8309.css",
		"assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js", "assets/index-9647601b.css",
		"assets/useShare.cbd12643.js", "assets/wechat.12fb2d71.js", "assets/index-38cc61ff.css"
	]).then((e => $m(e.default || e))),
	ob = zo(eb({
		loader: nb
	}, tb)),
	rb = () => t((() => import("./pages-article-list.8e0c3740.js")), ["assets/pages-article-list.8e0c3740.js",
		"assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css",
		"assets/tabbar.7fc713f1.js", "assets/u-image.dd0f853d.js", "assets/u-transition.d4c1e034.js",
		"assets/u-transition-607b6047.css", "assets/u-image-f70fd559.css", "assets/u-safe-bottom.1d02e76a.js",
		"assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css", "assets/article.d72d1faf.js",
		"assets/useMescroll.291c7061.js", "assets/useMescroll-f0734f93.css", "assets/mescroll-empty.8a3add74.js",
		"assets/mescroll-empty-40916e41.css", "assets/useShare.cbd12643.js", "assets/wechat.12fb2d71.js",
		"assets/list-c9622c2a.css"
	]).then((e => $m(e.default || e))),
	ib = zo(eb({
		loader: rb
	}, tb)),
	sb = () => t((() => import("./pages-auth-agreement.b5e7de4b.js")), ["assets/pages-auth-agreement.b5e7de4b.js",
		"assets/u-parse.0fc3a3e0.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-parse-9cce559f.css"
	]).then((e => $m(e.default || e))),
	ab = zo(eb({
		loader: sb
	}, tb)),
	lb = () => t((() => import("./pages-auth-bind.4e2b268e.js")), ["assets/pages-auth-bind.4e2b268e.js",
		"assets/u-input.7a3c5066.js", "assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.71c81480.js",
		"assets/u-line.6a74bc71.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css",
		"assets/sms-code.vue_vue_type_script_setup_true_lang.3cbf0063.js", "assets/u-modal.276d8a5f.js",
		"assets/u-loading-icon.5a04567d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.bc41148f.js",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.1d02e76a.js",
		"assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css",
		"assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js",
		"assets/u-button.092119b5.js", "assets/u-button-4e9253f5.css", "assets/bind-12c3cc42.css"
	]).then((e => $m(e.default || e))),
	cb = zo(eb({
		loader: lb
	}, tb)),
	ub = () => t((() => import("./pages-auth-login.26c9f481.js")), ["assets/pages-auth-login.26c9f481.js",
		"assets/u-input.7a3c5066.js", "assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.71c81480.js",
		"assets/u-line.6a74bc71.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css",
		"assets/sms-code.vue_vue_type_script_setup_true_lang.3cbf0063.js", "assets/u-modal.276d8a5f.js",
		"assets/u-loading-icon.5a04567d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.bc41148f.js",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.1d02e76a.js",
		"assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css",
		"assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js",
		"assets/u-button.092119b5.js", "assets/u-button-4e9253f5.css"
	]).then((e => $m(e.default || e))),
	db = zo(eb({
		loader: ub
	}, tb)),
	fb = () => t((() => import("./pages-auth-register.bf761a88.js")), ["assets/pages-auth-register.bf761a88.js",
		"assets/u-input.7a3c5066.js", "assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.71c81480.js",
		"assets/u-line.6a74bc71.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css",
		"assets/sms-code.vue_vue_type_script_setup_true_lang.3cbf0063.js", "assets/u-modal.276d8a5f.js",
		"assets/u-loading-icon.5a04567d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.bc41148f.js",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.1d02e76a.js",
		"assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css",
		"assets/sms-code-9b208b13.css", "assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js",
		"assets/u-button.092119b5.js", "assets/u-button-4e9253f5.css"
	]).then((e => $m(e.default || e))),
	pb = zo(eb({
		loader: fb
	}, tb)),
	hb = () => t((() => import("./pages-auth-resetpwd.12a8f39d.js")), ["assets/pages-auth-resetpwd.12a8f39d.js",
		"assets/u-input.7a3c5066.js", "assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css", "assets/u-form.71c81480.js",
		"assets/u-line.6a74bc71.js", "assets/u-line-90cc8525.css", "assets/u-form-c93addfb.css",
		"assets/sms-code.vue_vue_type_script_setup_true_lang.3cbf0063.js", "assets/u-modal.276d8a5f.js",
		"assets/u-loading-icon.5a04567d.js", "assets/u-loading-icon-4a706ea2.css", "assets/u-popup.bc41148f.js",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.1d02e76a.js",
		"assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-modal-b7ee2981.css",
		"assets/sms-code-9b208b13.css", "assets/u-button.092119b5.js", "assets/u-button-4e9253f5.css"
	]).then((e => $m(e.default || e))),
	mb = zo(eb({
		loader: hb
	}, tb)),
	gb = () => t((() => import("./pages-index-diy.ab6d47d5.js")), ["assets/pages-index-diy.ab6d47d5.js",
		"assets/u-loading-page.267b8385.js", "assets/u-loading-icon.5a04567d.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css",
		"assets/index.6e8d5422.js", "assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css",
		"assets/tabbar.7fc713f1.js", "assets/u-image.dd0f853d.js", "assets/u-image-f70fd559.css",
		"assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css",
		"assets/article.d72d1faf.js", "assets/u-avatar.7ae27837.js", "assets/u-avatar-0d8f8309.css",
		"assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js", "assets/index-9647601b.css",
		"assets/useShare.cbd12643.js", "assets/wechat.12fb2d71.js", "assets/diy-7374cc83.css"
	]).then((e => $m(e.default || e))),
	vb = zo(eb({
		loader: gb
	}, tb)),
	bb = () => t((() => import("./pages-index-close.9ab1e6b4.js")), ["assets/pages-index-close.9ab1e6b4.js",
		"assets/u-empty.3ae06840.js", "assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-icon-3406a03e.css", "assets/u-empty-5067ac67.css"
	]).then((e => $m(e.default || e))),
	yb = zo(eb({
		loader: bb
	}, tb)),
	_b = () => t((() => import("./pages-index-nonexistence.b6620697.js")), [
		"assets/pages-index-nonexistence.b6620697.js", "assets/u-empty.3ae06840.js", "assets/u-icon.b7c42932.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-empty-5067ac67.css"
	]).then((e => $m(e.default || e))),
	wb = zo(eb({
		loader: _b
	}, tb)),
	xb = () => t((() => import("./pages-article-detail.8e68b136.js")), ["assets/pages-article-detail.8e68b136.js",
		"assets/u-parse.0fc3a3e0.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-parse-9cce559f.css",
		"assets/u-loading-page.267b8385.js", "assets/u-loading-icon.5a04567d.js",
		"assets/u-loading-icon-4a706ea2.css", "assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css",
		"assets/u-loading-page-2116306f.css", "assets/article.d72d1faf.js", "assets/useShare.cbd12643.js",
		"assets/wechat.12fb2d71.js"
	]).then((e => $m(e.default || e))),
	Tb = zo(eb({
		loader: xb
	}, tb)),
	Sb = () => t((() => import("./pages-member-apply_cash_out.75b1071a.js")), [
		"assets/pages-member-apply_cash_out.75b1071a.js", "assets/u-button.092119b5.js",
		"assets/u-loading-icon.5a04567d.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-loading-icon-4a706ea2.css", "assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css",
		"assets/u-button-4e9253f5.css", "assets/u-loading-page.267b8385.js", "assets/u-transition.d4c1e034.js",
		"assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css"
	]).then((e => $m(e.default || e))),
	Eb = zo(eb({
		loader: Sb
	}, tb)),
	kb = () => t((() => import("./pages-member-commission.76d56c87.js")), ["assets/pages-member-commission.76d56c87.js",
		"assets/u-button.092119b5.js", "assets/u-loading-icon.5a04567d.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css",
		"assets/commission-df4369d0.css"
	]).then((e => $m(e.default || e))),
	Ab = zo(eb({
		loader: kb
	}, tb)),
	Cb = () => t((() => import("./pages-member-balance.3a1d51f0.js")), ["assets/pages-member-balance.3a1d51f0.js",
		"assets/u-button.092119b5.js", "assets/u-loading-icon.5a04567d.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css",
		"assets/u-input.7a3c5066.js", "assets/u-input-2dabccde.css", "assets/u-popup.bc41148f.js",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-safe-bottom.1d02e76a.js",
		"assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css", "assets/u-image.dd0f853d.js",
		"assets/u-image-f70fd559.css", "assets/pay.1f709bf2.js", "assets/wechat.12fb2d71.js",
		"assets/balance-e372b961.css"
	]).then((e => $m(e.default || e))),
	Bb = zo(eb({
		loader: Cb
	}, tb)),
	Pb = () => t((() => import("./pages-member-recharge_record.e65609e0.js")), [
		"assets/pages-member-recharge_record.e65609e0.js", "assets/useMescroll.291c7061.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css",
		"assets/mescroll-empty.8a3add74.js", "assets/mescroll-empty-40916e41.css",
		"assets/recharge_record-0466e598.css"
	]).then((e => $m(e.default || e))),
	Lb = zo(eb({
		loader: Pb
	}, tb)),
	Ob = () => t((() => import("./pages-member-recharge_record_detail.99c2ae46.js")), [
		"assets/pages-member-recharge_record_detail.99c2ae46.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/recharge_record_detail-ddcd3306.css"
	]).then((e => $m(e.default || e))),
	Ib = zo(eb({
		loader: Ob
	}, tb)),
	Mb = () => t((() => import("./pages-member-detailed_account.7c4f1388.js")), [
		"assets/pages-member-detailed_account.7c4f1388.js", "assets/useMescroll.291c7061.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/useMescroll-f0734f93.css",
		"assets/mescroll-empty.8a3add74.js", "assets/mescroll-empty-40916e41.css",
		"assets/detailed_account-3b9b6750.css"
	]).then((e => $m(e.default || e))),
	Fb = zo(eb({
		loader: Mb
	}, tb)),
	jb = () => t((() => import("./pages-member-cash_out.deaccae6.js")), ["assets/pages-member-cash_out.deaccae6.js",
		"assets/useMescroll.291c7061.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/useMescroll-f0734f93.css", "assets/mescroll-empty.8a3add74.js",
		"assets/mescroll-empty-40916e41.css", "assets/cash_out-f0cc7571.css"
	]).then((e => $m(e.default || e))),
	Nb = zo(eb({
		loader: jb
	}, tb)),
	Rb = () => t((() => import("./pages-member-cash_out_detail.14684e45.js")), [
		"assets/pages-member-cash_out_detail.14684e45.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/cash_out_detail-a5b1b8f4.css"
	]).then((e => $m(e.default || e))),
	Db = zo(eb({
		loader: Rb
	}, tb)),
	qb = () => t((() => import("./pages-member-index.b23dd3e7.js")), ["assets/pages-member-index.b23dd3e7.js",
		"assets/u-loading-page.267b8385.js", "assets/u-loading-icon.5a04567d.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css", "assets/u-loading-page-2116306f.css",
		"assets/index.6e8d5422.js", "assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css",
		"assets/tabbar.7fc713f1.js", "assets/u-image.dd0f853d.js", "assets/u-image-f70fd559.css",
		"assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/tabbar-8a0d9fd7.css",
		"assets/article.d72d1faf.js", "assets/u-avatar.7ae27837.js", "assets/u-avatar-0d8f8309.css",
		"assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js", "assets/index-9647601b.css",
		"assets/index-8584954e.css"
	]).then((e => $m(e.default || e))),
	zb = zo(eb({
		loader: qb
	}, tb)),
	Hb = () => t((() => import("./pages-member-info.296a756b.js")), ["assets/pages-member-info.296a756b.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js"
	]).then((e => $m(e.default || e))),
	Wb = zo(eb({
		loader: Hb
	}, tb)),
	Vb = () => t((() => import("./pages-member-personal.4a868e14.js")), ["assets/pages-member-personal.4a868e14.js",
		"assets/u-avatar.7ae27837.js", "assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/u-icon-3406a03e.css", "assets/u-avatar-0d8f8309.css", "assets/u-loading-icon.5a04567d.js",
		"assets/u-loading-icon-4a706ea2.css", "assets/u-action-sheet.837e581c.js", "assets/u-line.6a74bc71.js",
		"assets/u-line-90cc8525.css", "assets/u-popup.bc41148f.js", "assets/u-transition.d4c1e034.js",
		"assets/u-transition-607b6047.css", "assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css",
		"assets/u-popup-b896d01d.css", "assets/u-action-sheet-e3392aa2.css", "assets/u-button.092119b5.js",
		"assets/u-button-4e9253f5.css", "assets/app-link.vue_vue_type_script_setup_true_lang.f7d1a8fa.js",
		"assets/u-modal.276d8a5f.js", "assets/u-modal-b7ee2981.css", "assets/personal-7d5bc078.css"
	]).then((e => $m(e.default || e))),
	$b = zo(eb({
		loader: Vb
	}, tb)),
	Qb = () => t((() => import("./pages-member-point.335fe15c.js")), ["assets/pages-member-point.335fe15c.js",
		"assets/useMescroll.291c7061.js", "assets/_plugin-vue_export-helper.1b428a4d.js",
		"assets/useMescroll-f0734f93.css", "assets/mescroll-empty.8a3add74.js", "assets/mescroll-empty-40916e41.css"
	]).then((e => $m(e.default || e))),
	Ub = zo(eb({
		loader: Qb
	}, tb)),
	Xb = () => t((() => import("./pages-member-account.aaf0591c.js")), ["assets/pages-member-account.aaf0591c.js",
		"assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css",
		"assets/useMescroll.291c7061.js", "assets/useMescroll-f0734f93.css"
	]).then((e => $m(e.default || e))),
	Yb = zo(eb({
		loader: Xb
	}, tb)),
	Jb = () => t((() => import("./pages-member-account_edit.e61eef88.js")), [
		"assets/pages-member-account_edit.e61eef88.js", "assets/u-input.7a3c5066.js", "assets/u-icon.b7c42932.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-input-2dabccde.css",
		"assets/u-form.71c81480.js", "assets/u-line.6a74bc71.js", "assets/u-line-90cc8525.css",
		"assets/u-form-c93addfb.css", "assets/u-button.092119b5.js", "assets/u-loading-icon.5a04567d.js",
		"assets/u-loading-icon-4a706ea2.css", "assets/u-button-4e9253f5.css", "assets/u-modal.276d8a5f.js",
		"assets/u-popup.bc41148f.js", "assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css",
		"assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css",
		"assets/u-modal-b7ee2981.css"
	]).then((e => $m(e.default || e))),
	Gb = zo(eb({
		loader: Jb
	}, tb)),
	Kb = () => t((() => import("./pages-pay-browser.2b869e08.js")), []).then((e => $m(e.default || e))),
	Zb = zo(eb({
		loader: Kb
	}, tb)),
	ey = () => t((() => import("./pages-pay-result.461793d7.js")), ["assets/pages-pay-result.461793d7.js",
		"assets/u-button.092119b5.js", "assets/u-loading-icon.5a04567d.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-icon.b7c42932.js", "assets/u-icon-3406a03e.css", "assets/u-button-4e9253f5.css",
		"assets/u-modal.276d8a5f.js", "assets/u-line.6a74bc71.js", "assets/u-line-90cc8525.css",
		"assets/u-popup.bc41148f.js", "assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css",
		"assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css",
		"assets/u-modal-b7ee2981.css", "assets/pay.1f709bf2.js"
	]).then((e => $m(e.default || e))),
	ty = zo(eb({
		loader: ey
	}, tb)),
	ny = () => t((() => import("./pages-setting-index.e0ed7d5a.js")), ["assets/pages-setting-index.e0ed7d5a.js",
		"assets/u-action-sheet.837e581c.js", "assets/u-icon.b7c42932.js",
		"assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css", "assets/u-line.6a74bc71.js",
		"assets/u-line-90cc8525.css", "assets/u-loading-icon.5a04567d.js", "assets/u-loading-icon-4a706ea2.css",
		"assets/u-popup.bc41148f.js", "assets/u-transition.d4c1e034.js", "assets/u-transition-607b6047.css",
		"assets/u-safe-bottom.1d02e76a.js", "assets/u-safe-bottom-fd70ea8a.css", "assets/u-popup-b896d01d.css",
		"assets/u-action-sheet-e3392aa2.css", "assets/index-91a59a4a.css"
	]).then((e => $m(e.default || e))),
	oy = zo(eb({
		loader: ny
	}, tb)),
	ry = () => t((() => import("./pages-webview-index.dae0a8d7.js")), ["assets/pages-webview-index.dae0a8d7.js",
		"assets/u-icon.b7c42932.js", "assets/_plugin-vue_export-helper.1b428a4d.js", "assets/u-icon-3406a03e.css",
		"assets/index-9ae05732.css"
	]).then((e => $m(e.default || e))),
	iy = zo(eb({
		loader: ry
	}, tb));

function sy(e, t) {
	return hi(), yi(Jv, null, {
		page: mo((() => [ki(e, eb({}, t, {
			ref: "page"
		}), null, 512)])),
		_: 1
	})
}

function ay(e, t) {
	return P(e) ? t : e
}
window.__uniRoutes = [{
	path: "/",
	alias: "/pages/index/index",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(ob, t)
		}
	},
	loader: nb,
	meta: {
		isQuit: !0,
		isEntry: !0,
		isTabBar: !0,
		tabBarIndex: 0,
		navigationBar: {
			titleText: "%pages.index.index%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/article/list",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(ib, t)
		}
	},
	loader: rb,
	meta: {
		isQuit: !0,
		isTabBar: !0,
		tabBarIndex: 1,
		navigationBar: {
			titleText: "%pages.article.list%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/auth/agreement",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(ab, t)
		}
	},
	loader: sb,
	meta: {
		navigationBar: {
			titleText: "%pages.auth.agreement%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/auth/bind",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(cb, t)
		}
	},
	loader: lb,
	meta: {
		navigationBar: {
			titleText: "%pages.auth.bind%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/auth/login",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(db, t)
		}
	},
	loader: ub,
	meta: {
		navigationBar: {
			titleText: "%pages.auth.login%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/auth/register",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(pb, t)
		}
	},
	loader: fb,
	meta: {
		navigationBar: {
			titleText: "%pages.auth.register%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/auth/resetpwd",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(mb, t)
		}
	},
	loader: hb,
	meta: {
		navigationBar: {
			titleText: "%pages.auth.resetpwd%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/index/diy",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(vb, t)
		}
	},
	loader: gb,
	meta: {
		navigationBar: {
			titleText: "%pages.index.diy%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/index/close",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(yb, t)
		}
	},
	loader: bb,
	meta: {
		navigationBar: {
			titleText: "%pages.index.close%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/index/nonexistence",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(wb, t)
		}
	},
	loader: _b,
	meta: {
		navigationBar: {
			titleText: "%pages.index.nonexistence%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/article/detail",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Tb, t)
		}
	},
	loader: xb,
	meta: {
		navigationBar: {
			titleText: "%pages.article.detail%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/apply_cash_out",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Eb, t)
		}
	},
	loader: Sb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.apply_cash_out%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/commission",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Ab, t)
		}
	},
	loader: kb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.commission%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/balance",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Bb, t)
		}
	},
	loader: Cb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.balance%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/recharge_record",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Lb, t)
		}
	},
	loader: Pb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.recharge_record%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/recharge_record_detail",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Ib, t)
		}
	},
	loader: Ob,
	meta: {
		navigationBar: {
			titleText: "%pages.member.recharge_record_detail%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/detailed_account",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Fb, t)
		}
	},
	loader: Mb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.detailed_account%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/cash_out",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Nb, t)
		}
	},
	loader: jb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.cash_out%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/cash_out_detail",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Db, t)
		}
	},
	loader: Rb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.cash_out_detail%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/index",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(zb, t)
		}
	},
	loader: qb,
	meta: {
		isQuit: !0,
		isTabBar: !0,
		tabBarIndex: 2,
		navigationBar: {
			titleText: "%pages.member.index%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/info",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Wb, t)
		}
	},
	loader: Hb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.info%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/personal",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy($b, t)
		}
	},
	loader: Vb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.personal%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/point",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Ub, t)
		}
	},
	loader: Qb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.point%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/account",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Yb, t)
		}
	},
	loader: Xb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.account%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/member/account_edit",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Gb, t)
		}
	},
	loader: Jb,
	meta: {
		navigationBar: {
			titleText: "%pages.member.account_edit%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/pay/browser",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(Zb, t)
		}
	},
	loader: Kb,
	meta: {
		navigationBar: {
			titleText: "%pages.pay.browser%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/pay/result",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(ty, t)
		}
	},
	loader: ey,
	meta: {
		navigationBar: {
			titleText: "%pages.pay.result%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/setting/index",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(oy, t)
		}
	},
	loader: ny,
	meta: {
		navigationBar: {
			titleText: "%pages.setting.index%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}, {
	path: "/pages/webview/index",
	component: {
		setup() {
			const e = zm(),
				t = e && e.$route && e.$route.query || {};
			return () => sy(iy, t)
		}
	},
	loader: ry,
	meta: {
		navigationBar: {
			titleText: "%pages.webview.index%",
			style: "custom",
			type: "default"
		},
		isNVue: !1
	}
}].map((e => (e.meta.route = (e.alias || e.path).slice(1), e)));
const ly = e => (t, n = Ri()) => {
		!Hi && or(e, t, n)
	},
	cy = ly(oe),
	uy = ly(re),
	dy = ly(ie),
	fy = ly(ue),
	py = ly(ge),
	hy = ly(be),
	my = ly(_e),
	gy = ly(xe),
	vy = {
		router: {
			mode: "history",
			base: "/wap/"
		}
	},
	by = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
	yy = e => by ? Symbol(e) : e,
	_y = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g,
		"\\u0027"),
	wy = e => "number" == typeof e && isFinite(e),
	xy = e => "[object RegExp]" === Fy(e),
	Ty = e => jy(e) && 0 === Object.keys(e).length;

function Sy(e, t) {
	"undefined" != typeof console && (console.warn("[intlify] " + e), t && console.warn(t.stack))
}
const Ey = Object.assign;

function ky(e) {
	return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}
const Ay = Object.prototype.hasOwnProperty;

function Cy(e, t) {
	return Ay.call(e, t)
}
const By = Array.isArray,
	Py = e => "function" == typeof e,
	Ly = e => "string" == typeof e,
	Oy = e => "boolean" == typeof e,
	Iy = e => null !== e && "object" == typeof e,
	My = Object.prototype.toString,
	Fy = e => My.call(e),
	jy = e => "[object Object]" === Fy(e),
	Ny = Object.prototype.hasOwnProperty;

function Ry(e, t) {
	return Ny.call(e, t)
}
const Dy = e => null !== e && "object" == typeof e,
	qy = [];
qy[0] = {
	w: [0],
	i: [3, 0],
	"[": [4],
	o: [7]
}, qy[1] = {
	w: [1],
	".": [2],
	"[": [4],
	o: [7]
}, qy[2] = {
	w: [2],
	i: [3, 0],
	0: [3, 0]
}, qy[3] = {
	i: [3, 0],
	0: [3, 0],
	w: [1, 1],
	".": [2, 1],
	"[": [4, 1],
	o: [7, 1]
}, qy[4] = {
	"'": [5, 0],
	'"': [6, 0],
	"[": [4, 2],
	"]": [1, 3],
	o: 8,
	l: [4, 0]
}, qy[5] = {
	"'": [4, 0],
	o: 8,
	l: [5, 0]
}, qy[6] = {
	'"': [4, 0],
	o: 8,
	l: [6, 0]
};
const zy = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function Hy(e) {
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

function Wy(e) {
	const t = e.trim();
	return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t, zy.test(n) ? function(e) {
		const t = e.charCodeAt(0);
		return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
	}(t) : "*" + t);
	var n
}
const Vy = new Map;

function $y(e, t) {
	if (!Dy(e)) return null;
	let n = Vy.get(t);
	if (n || (n = function(e) {
			const t = [];
			let n, o, r, i, s, a, l, c = -1,
				u = 0,
				d = 0;
			const f = [];

			function p() {
				const t = e[c + 1];
				if (5 === u && "'" === t || 6 === u && '"' === t) return c++, r = "\\" + t, f[0](), !0
			}
			for (f[0] = () => {
					void 0 === o ? o = r : o += r
				}, f[1] = () => {
					void 0 !== o && (t.push(o), o = void 0)
				}, f[2] = () => {
					f[0](), d++
				}, f[3] = () => {
					if (d > 0) d--, u = 4, f[0]();
					else {
						if (d = 0, void 0 === o) return !1;
						if (o = Wy(o), !1 === o) return !1;
						f[1]()
					}
				}; null !== u;)
				if (c++, n = e[c], "\\" !== n || !p()) {
					if (i = Hy(n), l = qy[u], s = l[i] || l.l || 8, 8 === s) return;
					if (u = s[0], void 0 !== s[1] && (a = f[s[1]], a && (r = n, !1 === a()))) return;
					if (7 === u) return t
				}
		}(t), n && Vy.set(t, n)), !n) return null;
	const o = n.length;
	let r = e,
		i = 0;
	for (; i < o;) {
		const e = r[n[i]];
		if (void 0 === e) return null;
		r = e, i++
	}
	return r
}

function Qy(e) {
	if (!Dy(e)) return e;
	for (const t in e)
		if (Ry(e, t))
			if (t.includes(".")) {
				const n = t.split("."),
					o = n.length - 1;
				let r = e;
				for (let e = 0; e < o; e++) n[e] in r || (r[n[e]] = {}), r = r[n[e]];
				r[n[o]] = e[t], delete e[t], Dy(r[n[o]]) && Qy(r[n[o]])
			} else Dy(e[t]) && Qy(e[t]);
	return e
}
/*!
 * @intlify/runtime v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
const Uy = e => e,
	Xy = e => "",
	Yy = e => 0 === e.length ? "" : e.join(""),
	Jy = e => null == e ? "" : By(e) || jy(e) && e.toString === My ? JSON.stringify(e, null, 2) : String(e);

function Gy(e, t) {
	return e = Math.abs(e), 2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}

function Ky(e = {}) {
	const t = e.locale,
		n = function(e) {
			const t = wy(e.pluralIndex) ? e.pluralIndex : -1;
			return e.named && (wy(e.named.count) || wy(e.named.n)) ? wy(e.named.count) ? e.named.count : wy(e.named.n) ?
				e.named.n : t : t
		}(e),
		o = Iy(e.pluralRules) && Ly(t) && Py(e.pluralRules[t]) ? e.pluralRules[t] : Gy,
		r = Iy(e.pluralRules) && Ly(t) && Py(e.pluralRules[t]) ? Gy : void 0,
		i = e.list || [],
		s = e.named || {};
	wy(e.pluralIndex) && function(e, t) {
		t.count || (t.count = e), t.n || (t.n = e)
	}(n, s);

	function a(t) {
		const n = Py(e.messages) ? e.messages(t) : !!Iy(e.messages) && e.messages[t];
		return n || (e.parent ? e.parent.message(t) : Xy)
	}
	const l = jy(e.processor) && Py(e.processor.normalize) ? e.processor.normalize : Yy,
		c = jy(e.processor) && Py(e.processor.interpolate) ? e.processor.interpolate : Jy,
		u = {
			list: e => i[e],
			named: e => s[e],
			plural: e => e[o(n, e.length, r)],
			linked: (t, n) => {
				const o = a(t)(u);
				return Ly(n) ? (r = n, e.modifiers ? e.modifiers[r] : Uy)(o) : o;
				var r
			},
			message: a,
			type: jy(e.processor) && Ly(e.processor.type) ? e.processor.type : "text",
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
function Zy(e, t, n = {}) {
	const {
		domain: o,
		messages: r,
		args: i
	} = n, s = new SyntaxError(String(e));
	return s.code = e, t && (s.location = t), s.domain = o, s
}

function e_(e) {
	throw e
}

function t_(e, t, n) {
	const o = {
		start: e,
		end: t
	};
	return null != n && (o.source = n), o
}
const n_ = " ",
	o_ = "\n",
	r_ = String.fromCharCode(8232),
	i_ = String.fromCharCode(8233);

function s_(e) {
	const t = e;
	let n = 0,
		o = 1,
		r = 1,
		i = 0;
	const s = e => "\r" === t[e] && t[e + 1] === o_,
		a = e => t[e] === i_,
		l = e => t[e] === r_,
		c = e => s(e) || (e => t[e] === o_)(e) || a(e) || l(e),
		u = e => s(e) || a(e) || l(e) ? o_ : t[e];

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
		peek: function() {
			return s(n + i) && i++, i++, t[n + i]
		},
		reset: function() {
			n = 0, o = 1, r = 1, i = 0
		},
		resetPeek: function(e = 0) {
			i = e
		},
		skipToPeek: function() {
			const e = n + i;
			for (; e !== n;) d();
			i = 0
		}
	}
}
const a_ = void 0;

function l_(e, t = {}) {
	const n = !1 !== t.location,
		o = s_(e),
		r = () => o.index(),
		i = () => {
			return e = o.line(), t = o.column(), n = o.index(), {
				line: e,
				column: t,
				offset: n
			};
			var e, t, n
		},
		s = i(),
		a = r(),
		l = {
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
		},
		c = () => l,
		{
			onError: u
		} = t;

	function d(e, t, n, ...o) {
		const r = c();
		if (t.column += n, t.offset += n, u) {
			const n = Zy(e, t_(r.startLoc, t), {
				domain: "tokenizer",
				args: o
			});
			u(n)
		}
	}

	function f(e, t, o) {
		e.endLoc = i(), e.currentType = t;
		const r = {
			type: t
		};
		return n && (r.loc = t_(e.startLoc, e.endLoc)), null != o && (r.value = o), r
	}
	const p = e => f(e, 14);

	function h(e, t) {
		return e.currentChar() === t ? (e.next(), t) : (d(0, i(), 0, t), "")
	}

	function m(e) {
		let t = "";
		for (; e.currentPeek() === n_ || e.currentPeek() === o_;) t += e.currentPeek(), e.peek();
		return t
	}

	function g(e) {
		const t = m(e);
		return e.skipToPeek(), t
	}

	function v(e) {
		if (e === a_) return !1;
		const t = e.charCodeAt(0);
		return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t
	}

	function b(e, t) {
		const {
			currentType: n
		} = t;
		if (2 !== n) return !1;
		m(e);
		const o = function(e) {
			if (e === a_) return !1;
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
				return "{" === i ? "%" !== o && t : "@" !== i && i ? "%" === i ? (e.peek(), n(t, "%", !0)) : "|" === i ?
					!("%" !== o && !r) || !(o === n_ || o === o_) : i === n_ ? (e.peek(), n(!0, n_, r)) : i !== o_ || (e
						.peek(), n(!0, o_, r)) : "%" === o || t
			},
			o = n();
		return t && e.resetPeek(), o
	}

	function w(e, t) {
		const n = e.currentChar();
		return n === a_ ? a_ : t(n) ? (e.next(), n) : null
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
		let t = "",
			n = "";
		for (; t = T(e);) n += t;
		return n
	}

	function k(e) {
		const t = e.currentChar();
		switch (t) {
			case "\\":
			case "'":
				return e.next(), `\\${t}`;
			case "u":
				return A(e, t, 4);
			case "U":
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
			case "{":
				return t.braceNest >= 1 && d(8, i(), 0), e.next(), n = f(t, 2, "{"), g(e), t.braceNest++, n;
			case "}":
				return t.braceNest > 0 && 2 === t.currentType && d(7, i(), 0), e.next(), n = f(t, 3, "}"), t
					.braceNest--, t.braceNest > 0 && g(e), t.inLinked && 0 === t.braceNest && (t.inLinked = !1), n;
			case "@":
				return t.braceNest > 0 && d(6, i(), 0), n = P(e, t) || p(t), t.braceNest = 0, n;
			default:
				let o = !0,
					r = !0,
					s = !0;
				if (y(e)) return t.braceNest > 0 && d(6, i(), 0), n = f(t, 1, C(e)), t.braceNest = 0, t.inLinked = !1,
				n;
				if (t.braceNest > 0 && (5 === t.currentType || 6 === t.currentType || 7 === t.currentType)) return d(6,
					i(), 0), t.braceNest = 0, L(e, t);
				if (o = function(e, t) {
						const {
							currentType: n
						} = t;
						if (2 !== n) return !1;
						m(e);
						const o = v(e.currentPeek());
						return e.resetPeek(), o
					}(e, t)) return n = f(t, 5, function(e) {
					g(e);
					let t = "",
						n = "";
					for (; t = x(e);) n += t;
					return e.currentChar() === a_ && d(6, i(), 0), n
				}(e)), g(e), n;
				if (r = b(e, t)) return n = f(t, 6, function(e) {
					g(e);
					let t = "";
					return "-" === e.currentChar() ? (e.next(), t += `-${E(e)}`) : t += E(e), e
					.currentChar() === a_ && d(6, i(), 0), t
				}(e)), g(e), n;
				if (s = function(e, t) {
						const {
							currentType: n
						} = t;
						if (2 !== n) return !1;
						m(e);
						const o = "'" === e.currentPeek();
						return e.resetPeek(), o
					}(e, t)) return n = f(t, 7, function(e) {
					g(e), h(e, "'");
					let t = "",
						n = "";
					const o = e => "'" !== e && e !== o_;
					for (; t = w(e, o);) n += "\\" === t ? k(e) : t;
					const r = e.currentChar();
					return r === o_ || r === a_ ? (d(2, i(), 0), r === o_ && (e.next(), h(e, "'")), n) : (h(
						e, "'"), n)
				}(e)), g(e), n;
				if (!o && !r && !s) return n = f(t, 13, function(e) {
					g(e);
					let t = "",
						n = "";
					const o = e => "{" !== e && "}" !== e && e !== n_ && e !== o_;
					for (; t = w(e, o);) n += t;
					return n
				}(e)), d(1, i(), 0, n.value), g(e), n
		}
		return n
	}

	function P(e, t) {
		const {
			currentType: n
		} = t;
		let o = null;
		const r = e.currentChar();
		switch (8 !== n && 9 !== n && 12 !== n && 10 !== n || r !== o_ && r !== n_ || d(9, i(), 0), r) {
			case "@":
				return e.next(), o = f(t, 8, "@"), t.inLinked = !0, o;
			case ".":
				return g(e), e.next(), f(t, 9, ".");
			case ":":
				return g(e), e.next(), f(t, 10, ":");
			default:
				return y(e) ? (o = f(t, 1, C(e)), t.braceNest = 0, t.inLinked = !1, o) : function(e, t) {
					const {
						currentType: n
					} = t;
					if (8 !== n) return !1;
					m(e);
					const o = "." === e.currentPeek();
					return e.resetPeek(), o
				}(e, t) || function(e, t) {
					const {
						currentType: n
					} = t;
					if (8 !== n && 12 !== n) return !1;
					m(e);
					const o = ":" === e.currentPeek();
					return e.resetPeek(), o
				}(e, t) ? (g(e), P(e, t)) : function(e, t) {
					const {
						currentType: n
					} = t;
					if (9 !== n) return !1;
					m(e);
					const o = v(e.currentPeek());
					return e.resetPeek(), o
				}(e, t) ? (g(e), f(t, 12, function(e) {
					let t = "",
						n = "";
					for (; t = x(e);) n += t;
					return n
				}(e))) : function(e, t) {
					const {
						currentType: n
					} = t;
					if (10 !== n) return !1;
					const o = () => {
							const t = e.currentPeek();
							return "{" === t ? v(e.peek()) : !("@" === t || "%" === t || "|" === t || ":" === t ||
								"." === t || t === n_ || !t) && (t === o_ ? (e.peek(), o()) : v(t))
						},
						r = o();
					return e.resetPeek(), r
				}(e, t) ? (g(e), "{" === r ? B(e, t) || o : f(t, 11, function(e) {
					const t = (n = !1, o) => {
						const r = e.currentChar();
						return "{" !== r && "%" !== r && "@" !== r && "|" !== r && r ? r === n_ ? o :
							r === o_ ? (o += r, e.next(), t(n, o)) : (o += r, e.next(), t(!0, o)) : o
					};
					return t(!1, "")
				}(e))) : (8 === n && d(9, i(), 0), t.braceNest = 0, t.inLinked = !1, L(e, t))
		}
	}

	function L(e, t) {
		let n = {
			type: 14
		};
		if (t.braceNest > 0) return B(e, t) || p(t);
		if (t.inLinked) return P(e, t) || p(t);
		const o = e.currentChar();
		switch (o) {
			case "{":
				return B(e, t) || p(t);
			case "}":
				return d(5, i(), 0), e.next(), f(t, 3, "}");
			case "@":
				return P(e, t) || p(t);
			default:
				if (y(e)) return n = f(t, 1, C(e)), t.braceNest = 0, t.inLinked = !1, n;
				if (_(e)) return f(t, 0, function(e) {
					let t = "";
					for (;;) {
						const n = e.currentChar();
						if ("{" === n || "}" === n || "@" === n || "|" === n || !n) break;
						if ("%" === n) {
							if (!_(e)) break;
							t += n, e.next()
						} else if (n === n_ || n === o_)
							if (_(e)) t += n, e.next();
							else {
								if (y(e)) break;
								t += n, e.next()
							}
						else t += n, e.next()
					}
					return t
				}(e));
				if ("%" === o) return e.next(), f(t, 4, "%")
		}
		return n
	}
	return {
		nextToken: function() {
			const {
				currentType: e,
				offset: t,
				startLoc: n,
				endLoc: s
			} = l;
			return l.lastType = e, l.lastOffset = t, l.lastStartLoc = n, l.lastEndLoc = s, l.offset = r(), l
				.startLoc = i(), o.currentChar() === a_ ? f(l, 14) : L(o, l)
		},
		currentOffset: r,
		currentPosition: i,
		context: c
	}
}
const c_ = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

function u_(e, t, n) {
	switch (e) {
		case "\\\\":
			return "\\";
		case "\\'":
			return "'";
		default: {
			const e = parseInt(t || n, 16);
			return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�"
		}
	}
}

function d_(e = {}) {
	const t = !1 !== e.location,
		{
			onError: n
		} = e;

	function o(e, t, o, r, ...i) {
		const s = e.currentPosition();
		if (s.offset += r, s.column += r, n) {
			const e = Zy(t, t_(o, s), {
				domain: "parser",
				args: i
			});
			n(e)
		}
	}

	function r(e, n, o) {
		const r = {
			type: e,
			start: n,
			end: n
		};
		return t && (r.loc = {
			start: o,
			end: o
		}), r
	}

	function i(e, n, o, r) {
		e.end = n, r && (e.type = r), t && e.loc && (e.loc.end = o)
	}

	function s(e, t) {
		const n = e.context(),
			o = r(3, n.offset, n.startLoc);
		return o.value = t, i(o, e.currentOffset(), e.currentPosition()), o
	}

	function a(e, t) {
		const n = e.context(),
			{
				lastOffset: o,
				lastStartLoc: s
			} = n,
			a = r(5, o, s);
		return a.index = parseInt(t, 10), e.nextToken(), i(a, e.currentOffset(), e.currentPosition()), a
	}

	function l(e, t) {
		const n = e.context(),
			{
				lastOffset: o,
				lastStartLoc: s
			} = n,
			a = r(4, o, s);
		return a.key = t, e.nextToken(), i(a, e.currentOffset(), e.currentPosition()), a
	}

	function c(e, t) {
		const n = e.context(),
			{
				lastOffset: o,
				lastStartLoc: s
			} = n,
			a = r(9, o, s);
		return a.value = t.replace(c_, u_), e.nextToken(), i(a, e.currentOffset(), e.currentPosition()), a
	}

	function u(e) {
		const t = e.context(),
			n = r(6, t.offset, t.startLoc);
		let s = e.nextToken();
		if (9 === s.type) {
			const t = function(e) {
				const t = e.nextToken(),
					n = e.context(),
					{
						lastOffset: s,
						lastStartLoc: a
					} = n,
					l = r(8, s, a);
				return 12 !== t.type ? (o(e, 11, n.lastStartLoc, 0), l.value = "", i(l, s, a), {
					nextConsumeToken: t,
					node: l
				}) : (null == t.value && o(e, 13, n.lastStartLoc, 0, f_(t)), l.value = t.value || "", i(l, e
					.currentOffset(), e.currentPosition()), {
					node: l
				})
			}(e);
			n.modifier = t.node, s = t.nextConsumeToken || e.nextToken()
		}
		switch (10 !== s.type && o(e, 13, t.lastStartLoc, 0, f_(s)), s = e.nextToken(), 2 === s.type && (s = e
				.nextToken()), s.type) {
			case 11:
				null == s.value && o(e, 13, t.lastStartLoc, 0, f_(s)), n.key = function(e, t) {
					const n = e.context(),
						o = r(7, n.offset, n.startLoc);
					return o.value = t, i(o, e.currentOffset(), e.currentPosition()), o
				}(e, s.value || "");
				break;
			case 5:
				null == s.value && o(e, 13, t.lastStartLoc, 0, f_(s)), n.key = l(e, s.value || "");
				break;
			case 6:
				null == s.value && o(e, 13, t.lastStartLoc, 0, f_(s)), n.key = a(e, s.value || "");
				break;
			case 7:
				null == s.value && o(e, 13, t.lastStartLoc, 0, f_(s)), n.key = c(e, s.value || "");
				break;
			default:
				o(e, 12, t.lastStartLoc, 0);
				const u = e.context(),
					d = r(7, u.offset, u.startLoc);
				return d.value = "", i(d, u.offset, u.startLoc), n.key = d, i(n, u.offset, u.startLoc), {
					nextConsumeToken: s,
					node: n
				}
		}
		return i(n, e.currentOffset(), e.currentPosition()), {
			node: n
		}
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
					null == r.value && o(e, 13, t.lastStartLoc, 0, f_(r)), n.items.push(s(e, r.value || ""));
					break;
				case 6:
					null == r.value && o(e, 13, t.lastStartLoc, 0, f_(r)), n.items.push(a(e, r.value || ""));
					break;
				case 5:
					null == r.value && o(e, 13, t.lastStartLoc, 0, f_(r)), n.items.push(l(e, r.value || ""));
					break;
				case 7:
					null == r.value && o(e, 13, t.lastStartLoc, 0, f_(r)), n.items.push(c(e, r.value || ""));
					break;
				case 8:
					const i = u(e);
					n.items.push(i.node), d = i.nextConsumeToken || null
			}
		} while (14 !== t.currentType && 1 !== t.currentType);
		return i(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e
			.currentPosition()), n
	}

	function f(e) {
		const t = e.context(),
			{
				offset: n,
				startLoc: s
			} = t,
			a = d(e);
		return 14 === t.currentType ? a : function(e, t, n, s) {
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
		parse: function(n) {
			const s = l_(n, Ey({}, e)),
				a = s.context(),
				l = r(0, a.offset, a.startLoc);
			return t && l.loc && (l.loc.source = n), l.body = f(s), 14 !== a.currentType && o(s, 13, a.lastStartLoc,
				0, n[a.offset] || ""), i(l, s.currentOffset(), s.currentPosition()), l
		}
	}
}

function f_(e) {
	if (14 === e.type) return "EOF";
	const t = (e.value || "").replace(/\r?\n/gu, "\\n");
	return t.length > 10 ? t.slice(0, 9) + "…" : t
}

function p_(e, t) {
	for (let n = 0; n < e.length; n++) h_(e[n], t)
}

function h_(e, t) {
	switch (e.type) {
		case 1:
			p_(e.cases, t), t.helper("plural");
			break;
		case 2:
			p_(e.items, t);
			break;
		case 6:
			h_(e.key, t), t.helper("linked");
			break;
		case 5:
			t.helper("interpolate"), t.helper("list");
			break;
		case 4:
			t.helper("interpolate"), t.helper("named")
	}
}

function m_(e, t = {}) {
	const n = function(e, t = {}) {
		const n = {
			ast: e,
			helpers: new Set
		};
		return {
			context: () => n,
			helper: e => (n.helpers.add(e), e)
		}
	}(e);
	n.helper("normalize"), e.body && h_(e.body, n);
	const o = n.context();
	e.helpers = Array.from(o.helpers)
}

function g_(e, t) {
	const {
		helper: n
	} = e;
	switch (t.type) {
		case 0:
			! function(e, t) {
				t.body ? g_(e, t.body) : e.push("null")
			}(e, t);
			break;
		case 1:
			! function(e, t) {
				const {
					helper: n,
					needIndent: o
				} = e;
				if (t.cases.length > 1) {
					e.push(`${n("plural")}([`), e.indent(o());
					const r = t.cases.length;
					for (let n = 0; n < r && (g_(e, t.cases[n]), n !== r - 1); n++) e.push(", ");
					e.deindent(o()), e.push("])")
				}
			}(e, t);
			break;
		case 2:
			! function(e, t) {
				const {
					helper: n,
					needIndent: o
				} = e;
				e.push(`${n("normalize")}([`), e.indent(o());
				const r = t.items.length;
				for (let i = 0; i < r && (g_(e, t.items[i]), i !== r - 1); i++) e.push(", ");
				e.deindent(o()), e.push("])")
			}(e, t);
			break;
		case 6:
			! function(e, t) {
				const {
					helper: n
				} = e;
				e.push(`${n("linked")}(`), g_(e, t.key), t.modifier && (e.push(", "), g_(e, t.modifier)), e.push(")")
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

function v_(e, t = {}) {
	const n = Ey({}, t),
		o = d_(n).parse(e);
	return m_(o, n), ((e, t = {}) => {
		const n = Ly(t.mode) ? t.mode : "normal",
			o = Ly(t.filename) ? t.filename : "message.intl",
			r = !!t.sourceMap,
			i = null != t.breakLineCode ? t.breakLineCode : "arrow" === n ? ";" : "\n",
			s = t.needIndent ? t.needIndent : "arrow" !== n,
			a = e.helpers || [],
			l = function(e, t) {
				const {
					sourceMap: n,
					filename: o,
					breakLineCode: r,
					needIndent: i
				} = t, s = {
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
					context: () => s,
					push: a,
					indent: function(e = !0) {
						const t = ++s.indentLevel;
						e && l(t)
					},
					deindent: function(e = !0) {
						const t = --s.indentLevel;
						e && l(t)
					},
					newline: function() {
						l(s.indentLevel)
					},
					helper: e => `_${e}`,
					needIndent: () => s.needIndent
				}
			}(e, {
				mode: n,
				filename: o,
				sourceMap: r,
				breakLineCode: i,
				needIndent: s
			});
		l.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"), l.indent(s), a.length > 0 && (l
			.push(`const { ${a.map((e=>`${e}: _${e}`)).join(", ")} } = ctx`), l.newline()), l.push(
			"return "), g_(l, e), l.deindent(s), l.push("}");
		const {
			code: c,
			map: u
		} = l.context();
		return {
			ast: e,
			code: c,
			map: u ? u.toJSON() : void 0
		}
	})(o, n)
}
/*!
 * @intlify/core-base v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
let b_;
let y_ = 0;

function __(e = {}) {
	const t = Ly(e.version) ? e.version : "9.1.9",
		n = Ly(e.locale) ? e.locale : "en-US",
		o = By(e.fallbackLocale) || jy(e.fallbackLocale) || Ly(e.fallbackLocale) || !1 === e.fallbackLocale ? e
		.fallbackLocale : n,
		r = jy(e.messages) ? e.messages : {
			[n]: {}
		},
		i = jy(e.datetimeFormats) ? e.datetimeFormats : {
			[n]: {}
		},
		s = jy(e.numberFormats) ? e.numberFormats : {
			[n]: {}
		},
		a = Ey({}, e.modifiers || {}, {
			upper: e => Ly(e) ? e.toUpperCase() : e,
			lower: e => Ly(e) ? e.toLowerCase() : e,
			capitalize: e => Ly(e) ? `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}` : e
		}),
		l = e.pluralRules || {},
		c = Py(e.missing) ? e.missing : null,
		u = !Oy(e.missingWarn) && !xy(e.missingWarn) || e.missingWarn,
		d = !Oy(e.fallbackWarn) && !xy(e.fallbackWarn) || e.fallbackWarn,
		f = !!e.fallbackFormat,
		p = !!e.unresolving,
		h = Py(e.postTranslation) ? e.postTranslation : null,
		m = jy(e.processor) ? e.processor : null,
		g = !Oy(e.warnHtmlMessage) || e.warnHtmlMessage,
		v = !!e.escapeParameter,
		b = Py(e.messageCompiler) ? e.messageCompiler : b_,
		y = Py(e.onWarn) ? e.onWarn : Sy,
		_ = e,
		w = Iy(_.__datetimeFormatters) ? _.__datetimeFormatters : new Map,
		x = Iy(_.__numberFormatters) ? _.__numberFormatters : new Map,
		T = Iy(_.__meta) ? _.__meta : {};
	y_++;
	return {
		version: t,
		cid: y_,
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
		fallbackFormat: f,
		unresolving: p,
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

function w_(e, t, n, o, r) {
	const {
		missing: i,
		onWarn: s
	} = e;
	if (null !== i) {
		const o = i(e, n, t, r);
		return Ly(o) ? o : t
	}
	return t
}

function x_(e, t, n) {
	const o = e;
	o.__localeChainCache || (o.__localeChainCache = new Map);
	let r = o.__localeChainCache.get(n);
	if (!r) {
		r = [];
		let e = [n];
		for (; By(e);) e = T_(r, e, t);
		const i = By(t) ? t : jy(t) ? t.default ? t.default : null : t;
		e = Ly(i) ? [i] : i, By(e) && T_(r, e, !1), o.__localeChainCache.set(n, r)
	}
	return r
}

function T_(e, t, n) {
	let o = !0;
	for (let r = 0; r < t.length && Oy(o); r++) {
		const i = t[r];
		Ly(i) && (o = S_(e, t[r], n))
	}
	return o
}

function S_(e, t, n) {
	let o;
	const r = t.split("-");
	do {
		o = E_(e, r.join("-"), n), r.splice(-1, 1)
	} while (r.length && !0 === o);
	return o
}

function E_(e, t, n) {
	let o = !1;
	if (!e.includes(t) && (o = !0, t)) {
		o = "!" !== t[t.length - 1];
		const r = t.replace(/!/g, "");
		e.push(r), (By(n) || jy(n)) && n[r] && (o = n[r])
	}
	return o
}

function k_(e, t, n) {
	e.__localeChainCache = new Map, x_(e, n, t)
}
const A_ = e => e;
let C_ = Object.create(null);

function B_(e) {
	return Zy(e, null, void 0)
}
const P_ = () => "",
	L_ = e => Py(e);

function O_(e, ...t) {
	const {
		fallbackFormat: n,
		postTranslation: o,
		unresolving: r,
		fallbackLocale: i,
		messages: s
	} = e, [a, l] = M_(...t), c = (Oy(l.missingWarn) ? l.missingWarn : e.missingWarn, Oy(l.fallbackWarn) ? l
			.fallbackWarn : e.fallbackWarn, Oy(l.escapeParameter) ? l.escapeParameter : e.escapeParameter), u = !!l
		.resolvedMessage, d = Ly(l.default) || Oy(l.default) ? Oy(l.default) ? a : l.default : n ? a : "", f = n ||
		"" !== d, p = Ly(l.locale) ? l.locale : e.locale;
	c && function(e) {
		By(e.list) ? e.list = e.list.map((e => Ly(e) ? ky(e) : e)) : Iy(e.named) && Object.keys(e.named).forEach((
			t => {
				Ly(e.named[t]) && (e.named[t] = ky(e.named[t]))
			}))
	}(l);
	let [h, m, g] = u ? [a, p, s[p] || {}] : function(e, t, n, o, r, i) {
		const {
			messages: s,
			onWarn: a
		} = e, l = x_(e, o, n);
		let c, u = {},
			d = null;
		const f = "translate";
		for (let p = 0; p < l.length && (c = l[p], u = s[c] || {}, null === (d = $y(u, t)) && (d = u[t]), !Ly(d) &&
				!Py(d)); p++) {
			const n = w_(e, t, c, 0, f);
			n !== t && (d = n)
		}
		return [d, c, u]
	}(e, a, p, i), v = a;
	if (u || Ly(h) || L_(h) || f && (h = d, v = h), !(u || (Ly(h) || L_(h)) && Ly(m))) return r ? -1 : a;
	let b = !1;
	const y = L_(h) ? h : I_(e, a, m, h, v, (() => {
		b = !0
	}));
	if (b) return h;
	const _ = function(e, t, n, o) {
			const {
				modifiers: r,
				pluralRules: i
			} = e, s = o => {
				const r = $y(n, o);
				if (Ly(r)) {
					let n = !1;
					const i = I_(e, o, t, r, o, (() => {
						n = !0
					}));
					return n ? P_ : i
				}
				return L_(r) ? r : P_
			}, a = {
				locale: t,
				modifiers: r,
				pluralRules: i,
				messages: s
			};
			e.processor && (a.processor = e.processor);
			o.list && (a.list = o.list);
			o.named && (a.named = o.named);
			wy(o.plural) && (a.pluralIndex = o.plural);
			return a
		}(e, m, g, l),
		w = function(e, t, n) {
			const o = t(n);
			return o
		}(0, y, Ky(_));
	return o ? o(w) : w
}

function I_(e, t, n, o, r, i) {
	const {
		messageCompiler: s,
		warnHtmlMessage: a
	} = e;
	if (L_(o)) {
		const e = o;
		return e.locale = e.locale || n, e.key = e.key || t, e
	}
	const l = s(o, function(e, t, n, o, r, i) {
		return {
			warnHtmlMessage: r,
			onError: e => {
				throw i && i(e), e
			},
			onCacheKey: e => ((e, t, n) => _y({
				l: e,
				k: t,
				s: n
			}))(t, n, e)
		}
	}(0, n, r, 0, a, i));
	return l.locale = n, l.key = t, l.source = o, l
}

function M_(...e) {
	const [t, n, o] = e, r = {};
	if (!Ly(t) && !wy(t) && !L_(t)) throw B_(14);
	const i = wy(t) ? String(t) : (L_(t), t);
	return wy(n) ? r.plural = n : Ly(n) ? r.default = n : jy(n) && !Ty(n) ? r.named = n : By(n) && (r.list = n), wy(o) ?
		r.plural = o : Ly(o) ? r.default = o : jy(o) && Ey(r, o), [i, r]
}

function F_(e, ...t) {
	const {
		datetimeFormats: n,
		unresolving: o,
		fallbackLocale: r,
		onWarn: i
	} = e, {
		__datetimeFormatters: s
	} = e, [a, l, c, u] = j_(...t);
	Oy(c.missingWarn) ? c.missingWarn : e.missingWarn;
	Oy(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
	const d = !!c.part,
		f = Ly(c.locale) ? c.locale : e.locale,
		p = x_(e, r, f);
	if (!Ly(a) || "" === a) return new Intl.DateTimeFormat(f).format(l);
	let h, m = {},
		g = null;
	for (let y = 0; y < p.length && (h = p[y], m = n[h] || {}, g = m[a], !jy(g)); y++) w_(e, a, h, 0,
	"datetime format");
	if (!jy(g) || !Ly(h)) return o ? -1 : a;
	let v = `${h}__${a}`;
	Ty(u) || (v = `${v}__${JSON.stringify(u)}`);
	let b = s.get(v);
	return b || (b = new Intl.DateTimeFormat(h, Ey({}, g, u)), s.set(v, b)), d ? b.formatToParts(l) : b.format(l)
}

function j_(...e) {
	const [t, n, o, r] = e;
	let i, s = {},
		a = {};
	if (Ly(t)) {
		if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(t)) throw B_(16);
		i = new Date(t);
		try {
			i.toISOString()
		} catch (l) {
			throw B_(16)
		}
	} else if ("[object Date]" === Fy(t)) {
		if (isNaN(t.getTime())) throw B_(15);
		i = t
	} else {
		if (!wy(t)) throw B_(14);
		i = t
	}
	return Ly(n) ? s.key = n : jy(n) && (s = n), Ly(o) ? s.locale = o : jy(o) && (a = o), jy(r) && (a = r), [s.key ||
		"", i, s, a
	]
}

function N_(e, t, n) {
	const o = e;
	for (const r in n) {
		const e = `${t}__${r}`;
		o.__datetimeFormatters.has(e) && o.__datetimeFormatters.delete(e)
	}
}

function R_(e, ...t) {
	const {
		numberFormats: n,
		unresolving: o,
		fallbackLocale: r,
		onWarn: i
	} = e, {
		__numberFormatters: s
	} = e, [a, l, c, u] = D_(...t);
	Oy(c.missingWarn) ? c.missingWarn : e.missingWarn;
	Oy(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
	const d = !!c.part,
		f = Ly(c.locale) ? c.locale : e.locale,
		p = x_(e, r, f);
	if (!Ly(a) || "" === a) return new Intl.NumberFormat(f).format(l);
	let h, m = {},
		g = null;
	for (let y = 0; y < p.length && (h = p[y], m = n[h] || {}, g = m[a], !jy(g)); y++) w_(e, a, h, 0, "number format");
	if (!jy(g) || !Ly(h)) return o ? -1 : a;
	let v = `${h}__${a}`;
	Ty(u) || (v = `${v}__${JSON.stringify(u)}`);
	let b = s.get(v);
	return b || (b = new Intl.NumberFormat(h, Ey({}, g, u)), s.set(v, b)), d ? b.formatToParts(l) : b.format(l)
}

function D_(...e) {
	const [t, n, o, r] = e;
	let i = {},
		s = {};
	if (!wy(t)) throw B_(14);
	const a = t;
	return Ly(n) ? i.key = n : jy(n) && (i = n), Ly(o) ? i.locale = o : jy(o) && (s = o), jy(r) && (s = r), [i.key ||
		"", a, i, s
	]
}

function q_(e, t, n) {
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
function z_(e, ...t) {
	return Zy(e, null, void 0)
}
const H_ = yy("__transrateVNode"),
	W_ = yy("__datetimeParts"),
	V_ = yy("__numberParts");
yy("__enableEmitter"), yy("__disableEmitter");
const $_ = yy("__setPluralRules");
yy("__intlifyMeta");
const Q_ = yy("__injectWithOption");
let U_ = 0;

function X_(e) {
	return (t, n, o, r) => e(n, o, Ri() || void 0, r)
}

function Y_(e, t) {
	const {
		messages: n,
		__i18n: o
	} = t, r = jy(n) ? n : By(o) ? {} : {
		[e]: {}
	};
	if (By(o) && o.forEach((({
			locale: e,
			resource: t
		}) => {
			e ? (r[e] = r[e] || {}, G_(t, r[e])) : G_(t, r)
		})), t.flatJson)
		for (const i in r) Cy(r, i) && Qy(r[i]);
	return r
}
const J_ = e => !Iy(e) || By(e);

function G_(e, t) {
	if (J_(e) || J_(t)) throw z_(20);
	for (const n in e) Cy(e, n) && (J_(e[n]) || J_(t[n]) ? t[n] = e[n] : G_(e[n], t[n]))
}

function K_(e = {}) {
	const {
		__root: t
	} = e, n = void 0 === t;
	let o = !Oy(e.inheritLocale) || e.inheritLocale;
	const r = Pn(t && o ? t.locale.value : Ly(e.locale) ? e.locale : "en-US"),
		i = Pn(t && o ? t.fallbackLocale.value : Ly(e.fallbackLocale) || By(e.fallbackLocale) || jy(e.fallbackLocale) ||
			!1 === e.fallbackLocale ? e.fallbackLocale : r.value),
		s = Pn(Y_(r.value, e)),
		a = Pn(jy(e.datetimeFormats) ? e.datetimeFormats : {
			[r.value]: {}
		}),
		l = Pn(jy(e.numberFormats) ? e.numberFormats : {
			[r.value]: {}
		});
	let c = t ? t.missingWarn : !Oy(e.missingWarn) && !xy(e.missingWarn) || e.missingWarn,
		u = t ? t.fallbackWarn : !Oy(e.fallbackWarn) && !xy(e.fallbackWarn) || e.fallbackWarn,
		d = t ? t.fallbackRoot : !Oy(e.fallbackRoot) || e.fallbackRoot,
		f = !!e.fallbackFormat,
		p = Py(e.missing) ? e.missing : null,
		h = Py(e.missing) ? X_(e.missing) : null,
		m = Py(e.postTranslation) ? e.postTranslation : null,
		g = !Oy(e.warnHtmlMessage) || e.warnHtmlMessage,
		v = !!e.escapeParameter;
	const b = t ? t.modifiers : jy(e.modifiers) ? e.modifiers : {};
	let y, _ = e.pluralRules || t && t.pluralRules;
	y = __({
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
		fallbackFormat: f,
		unresolving: !0,
		postTranslation: null === m ? void 0 : m,
		warnHtmlMessage: g,
		escapeParameter: v,
		__datetimeFormatters: jy(y) ? y.__datetimeFormatters : void 0,
		__numberFormatters: jy(y) ? y.__numberFormatters : void 0,
		__v_emitter: jy(y) ? y.__v_emitter : void 0,
		__meta: {
			framework: "vue"
		}
	}), k_(y, r.value, i.value);
	const w = Ui({
			get: () => r.value,
			set: e => {
				r.value = e, y.locale = r.value
			}
		}),
		x = Ui({
			get: () => i.value,
			set: e => {
				i.value = e, y.fallbackLocale = i.value, k_(y, r.value, e)
			}
		}),
		T = Ui((() => s.value)),
		S = Ui((() => a.value)),
		E = Ui((() => l.value));

	function k(e, n, o, c, u, f) {
		let p;
		if (r.value, i.value, s.value, a.value, l.value, p = e(y), wy(p) && -1 === p) {
			const [e, o] = n();
			return t && d ? c(t) : u(e)
		}
		if (f(p)) return p;
		throw z_(14)
	}

	function A(...e) {
		return k((t => O_(t, ...e)), (() => M_(...e)), 0, (t => t.t(...e)), (e => e), (e => Ly(e)))
	}
	const C = {
		normalize: function(e) {
			return e.map((e => Ly(e) ? ki(ci, null, e, 0) : e))
		},
		interpolate: e => e,
		type: "vnode"
	};

	function B(e) {
		return s.value[e] || {}
	}
	U_++, t && (Eo(t.locale, (e => {
		o && (r.value = e, y.locale = e, k_(y, r.value, i.value))
	})), Eo(t.fallbackLocale, (e => {
		o && (i.value = e, y.fallbackLocale = e, k_(y, r.value, i.value))
	})));
	return {
		id: U_,
		locale: w,
		fallbackLocale: x,
		get inheritLocale() {
			return o
		},
		set inheritLocale(e) {
			o = e, e && t && (r.value = t.locale.value, i.value = t.fallbackLocale.value, k_(y, r.value, i.value))
		},
		get availableLocales() {
			return Object.keys(s.value).sort()
		},
		messages: T,
		datetimeFormats: S,
		numberFormats: E,
		get modifiers() {
			return b
		},
		get pluralRules() {
			return _ || {}
		},
		get isGlobal() {
			return n
		},
		get missingWarn() {
			return c
		},
		set missingWarn(e) {
			c = e, y.missingWarn = c
		},
		get fallbackWarn() {
			return u
		},
		set fallbackWarn(e) {
			u = e, y.fallbackWarn = u
		},
		get fallbackRoot() {
			return d
		},
		set fallbackRoot(e) {
			d = e
		},
		get fallbackFormat() {
			return f
		},
		set fallbackFormat(e) {
			f = e, y.fallbackFormat = f
		},
		get warnHtmlMessage() {
			return g
		},
		set warnHtmlMessage(e) {
			g = e, y.warnHtmlMessage = e
		},
		get escapeParameter() {
			return v
		},
		set escapeParameter(e) {
			v = e, y.escapeParameter = e
		},
		t: A,
		rt: function(...e) {
			const [t, n, o] = e;
			if (o && !Iy(o)) throw z_(15);
			return A(t, n, Ey({
				resolvedMessage: !0
			}, o || {}))
		},
		d: function(...e) {
			return k((t => F_(t, ...e)), (() => j_(...e)), 0, (t => t.d(...e)), (() => ""), (e => Ly(e)))
		},
		n: function(...e) {
			return k((t => R_(t, ...e)), (() => D_(...e)), 0, (t => t.n(...e)), (() => ""), (e => Ly(e)))
		},
		te: function(e, t) {
			return null !== $y(B(Ly(t) ? t : r.value), e)
		},
		tm: function(e) {
			const n = function(e) {
				let t = null;
				const n = x_(y, i.value, r.value);
				for (let o = 0; o < n.length; o++) {
					const r = $y(s.value[n[o]] || {}, e);
					if (null != r) {
						t = r;
						break
					}
				}
				return t
			}(e);
			return null != n ? n : t && t.tm(e) || {}
		},
		getLocaleMessage: B,
		setLocaleMessage: function(e, t) {
			s.value[e] = t, y.messages = s.value
		},
		mergeLocaleMessage: function(e, t) {
			s.value[e] = s.value[e] || {}, G_(t, s.value[e]), y.messages = s.value
		},
		getDateTimeFormat: function(e) {
			return a.value[e] || {}
		},
		setDateTimeFormat: function(e, t) {
			a.value[e] = t, y.datetimeFormats = a.value, N_(y, e, t)
		},
		mergeDateTimeFormat: function(e, t) {
			a.value[e] = Ey(a.value[e] || {}, t), y.datetimeFormats = a.value, N_(y, e, t)
		},
		getNumberFormat: function(e) {
			return l.value[e] || {}
		},
		setNumberFormat: function(e, t) {
			l.value[e] = t, y.numberFormats = l.value, q_(y, e, t)
		},
		mergeNumberFormat: function(e, t) {
			l.value[e] = Ey(l.value[e] || {}, t), y.numberFormats = l.value, q_(y, e, t)
		},
		getPostTranslationHandler: function() {
			return Py(m) ? m : null
		},
		setPostTranslationHandler: function(e) {
			m = e, y.postTranslation = e
		},
		getMissingHandler: function() {
			return p
		},
		setMissingHandler: function(e) {
			null !== e && (h = X_(e)), p = e, y.missing = h
		},
		[H_]: function(...e) {
			return k((t => {
				let n;
				const o = t;
				try {
					o.processor = C, n = O_(o, ...e)
				} finally {
					o.processor = null
				}
				return n
			}), (() => M_(...e)), 0, (t => t[H_](...e)), (e => [ki(ci, null, e, 0)]), (e => By(e)))
		},
		[V_]: function(...e) {
			return k((t => R_(t, ...e)), (() => D_(...e)), 0, (t => t[V_](...e)), (() => []), (e => Ly(e) || By(e)))
		},
		[W_]: function(...e) {
			return k((t => F_(t, ...e)), (() => j_(...e)), 0, (t => t[W_](...e)), (() => []), (e => Ly(e) || By(e)))
		},
		[$_]: function(e) {
			_ = e, y.pluralRules = _
		},
		[Q_]: e.__injectWithOption
	}
}

function Z_(e = {}) {
	const t = K_(function(e) {
			const t = Ly(e.locale) ? e.locale : "en-US",
				n = Ly(e.fallbackLocale) || By(e.fallbackLocale) || jy(e.fallbackLocale) || !1 === e
				.fallbackLocale ? e.fallbackLocale : t,
				o = Py(e.missing) ? e.missing : void 0,
				r = !Oy(e.silentTranslationWarn) && !xy(e.silentTranslationWarn) || !e.silentTranslationWarn,
				i = !Oy(e.silentFallbackWarn) && !xy(e.silentFallbackWarn) || !e.silentFallbackWarn,
				s = !Oy(e.fallbackRoot) || e.fallbackRoot,
				a = !!e.formatFallbackMessages,
				l = jy(e.modifiers) ? e.modifiers : {},
				c = e.pluralizationRules,
				u = Py(e.postTranslation) ? e.postTranslation : void 0,
				d = !Ly(e.warnHtmlInMessage) || "off" !== e.warnHtmlInMessage,
				f = !!e.escapeParameterHtml,
				p = !Oy(e.sync) || e.sync;
			let h = e.messages;
			if (jy(e.sharedMessages)) {
				const t = e.sharedMessages;
				h = Object.keys(t).reduce(((e, n) => {
					const o = e[n] || (e[n] = {});
					return Ey(o, t[n]), e
				}), h || {})
			}
			const {
				__i18n: m,
				__root: g,
				__injectWithOption: v
			} = e, b = e.datetimeFormats, y = e.numberFormats;
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
				escapeParameter: f,
				inheritLocale: p,
				__i18n: m,
				__root: g,
				__injectWithOption: v
			}
		}(e)),
		n = {
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
				return {
					interpolate: () => []
				}
			},
			set formatter(e) {},
			get missing() {
				return t.getMissingHandler()
			},
			set missing(e) {
				t.setMissingHandler(e)
			},
			get silentTranslationWarn() {
				return Oy(t.missingWarn) ? !t.missingWarn : t.missingWarn
			},
			set silentTranslationWarn(e) {
				t.missingWarn = Oy(e) ? !e : e
			},
			get silentFallbackWarn() {
				return Oy(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn
			},
			set silentFallbackWarn(e) {
				t.fallbackWarn = Oy(e) ? !e : e
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
			set preserveDirectiveContent(e) {},
			get pluralizationRules() {
				return t.pluralRules || {}
			},
			__composer: t,
			t(...e) {
				const [n, o, r] = e, i = {};
				let s = null,
					a = null;
				if (!Ly(n)) throw z_(15);
				const l = n;
				return Ly(o) ? i.locale = o : By(o) ? s = o : jy(o) && (a = o), By(r) ? s = r : jy(r) && (a = r), t.t(l,
					s || a || {}, i)
			},
			rt: (...e) => t.rt(...e),
			tc(...e) {
				const [n, o, r] = e, i = {
					plural: 1
				};
				let s = null,
					a = null;
				if (!Ly(n)) throw z_(15);
				const l = n;
				return Ly(o) ? i.locale = o : wy(o) ? i.plural = o : By(o) ? s = o : jy(o) && (a = o), Ly(r) ? i
					.locale = r : By(r) ? s = r : jy(r) && (a = r), t.t(l, s || a || {}, i)
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
				const {
					componentInstanceCreatedListener: o
				} = e;
				o && o(t, n)
			}
		};
	return n
}
const ew = {
		tag: {
			type: [String, Object]
		},
		locale: {
			type: String
		},
		scope: {
			type: String,
			validator: e => "parent" === e || "global" === e,
			default: "parent"
		},
		i18n: {
			type: Object
		}
	},
	tw = {
		name: "i18n-t",
		props: Ey({
			keypath: {
				type: String,
				required: !0
			},
			plural: {
				type: [Number, String],
				validator: e => wy(e) || !isNaN(e)
			}
		}, ew),
		setup(e, t) {
			const {
				slots: n,
				attrs: o
			} = t, r = e.i18n || cw({
				useScope: e.scope,
				__useComponent: !0
			}), i = Object.keys(n).filter((e => "_" !== e));
			return () => {
				const n = {};
				e.locale && (n.locale = e.locale), void 0 !== e.plural && (n.plural = Ly(e.plural) ? +e.plural : e
					.plural);
				const s = function({
						slots: e
					}, t) {
						return 1 === t.length && "default" === t[0] ? e.default ? e.default() : [] : t.reduce(((t,
							n) => {
							const o = e[n];
							return o && (t[n] = o()), t
						}), {})
					}(t, i),
					a = r[H_](e.keypath, s, n),
					l = Ey({}, o);
				return Ly(e.tag) || Iy(e.tag) ? Xi(e.tag, l, a) : Xi(li, l, a)
			}
		}
	};

function nw(e, t, n, o) {
	const {
		slots: r,
		attrs: i
	} = t;
	return () => {
		const t = {
			part: !0
		};
		let s = {};
		e.locale && (t.locale = e.locale), Ly(e.format) ? t.key = e.format : Iy(e.format) && (Ly(e.format.key) && (t
			.key = e.format.key), s = Object.keys(e.format).reduce(((t, o) => n.includes(o) ? Ey({}, t, {
			[o]: e.format[o]
		}) : t), {}));
		const a = o(e.value, t, s);
		let l = [t.key];
		By(a) ? l = a.map(((e, t) => {
			const n = r[e.type];
			return n ? n({
				[e.type]: e.value,
				index: t,
				parts: a
			}) : [e.value]
		})) : Ly(a) && (l = [a]);
		const c = Ey({}, i);
		return Ly(e.tag) || Iy(e.tag) ? Xi(e.tag, c, l) : Xi(li, c, l)
	}
}
const ow = ["localeMatcher", "style", "unit", "unitDisplay", "currency", "currencyDisplay", "useGrouping",
		"numberingSystem", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits",
		"minimumSignificantDigits", "maximumSignificantDigits", "notation", "formatMatcher"
	],
	rw = {
		name: "i18n-n",
		props: Ey({
			value: {
				type: Number,
				required: !0
			},
			format: {
				type: [String, Object]
			}
		}, ew),
		setup(e, t) {
			const n = e.i18n || cw({
				useScope: "parent",
				__useComponent: !0
			});
			return nw(e, t, ow, ((...e) => n[V_](...e)))
		}
	},
	iw = ["dateStyle", "timeStyle", "fractionalSecondDigits", "calendar", "dayPeriod", "numberingSystem",
		"localeMatcher", "timeZone", "hour12", "hourCycle", "formatMatcher", "weekday", "era", "year", "month", "day",
		"hour", "minute", "second", "timeZoneName"
	],
	sw = {
		name: "i18n-d",
		props: Ey({
			value: {
				type: [Number, Date],
				required: !0
			},
			format: {
				type: [String, Object]
			}
		}, ew),
		setup(e, t) {
			const n = e.i18n || cw({
				useScope: "parent",
				__useComponent: !0
			});
			return nw(e, t, iw, ((...e) => n[W_](...e)))
		}
	};

function aw(e) {
	const t = (t, {
		instance: n,
		value: o,
		modifiers: r
	}) => {
		if (!n || !n.$) throw z_(22);
		const i = function(e, t) {
				const n = e;
				if ("composition" === e.mode) return n.__getInstance(t) || e.global; {
					const o = n.__getInstance(t);
					return null != o ? o.__composer : e.global.__composer
				}
			}(e, n.$),
			s = function(e) {
				if (Ly(e)) return {
					path: e
				};
				if (jy(e)) {
					if (!("path" in e)) throw z_(19);
					return e
				}
				throw z_(20)
			}(o);
		t.textContent = i.t(... function(e) {
			const {
				path: t,
				locale: n,
				args: o,
				choice: r,
				plural: i
			} = e, s = {}, a = o || {};
			Ly(n) && (s.locale = n);
			wy(r) && (s.plural = r);
			wy(i) && (s.plural = i);
			return [t, a, s]
		}(s))
	};
	return {
		beforeMount: t,
		beforeUpdate: t
	}
}

function lw(e, t) {
	e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e
		.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t
		.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e
		.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t
		.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e
		.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[$_](t.pluralizationRules || e.pluralizationRules);
	const n = Y_(e.locale, {
		messages: t.messages,
		__i18n: t.__i18n
	});
	return Object.keys(n).forEach((t => e.mergeLocaleMessage(t, n[t]))), t.datetimeFormats && Object.keys(t
			.datetimeFormats).forEach((n => e.mergeDateTimeFormat(n, t.datetimeFormats[n]))), t.numberFormats && Object
		.keys(t.numberFormats).forEach((n => e.mergeNumberFormat(n, t.numberFormats[n]))), e
}

function cw(e = {}) {
	const t = Ri();
	if (null == t) throw z_(16);
	if (!t.appContext.app.__VUE_I18N_SYMBOL__) throw z_(17);
	const n = xo(t.appContext.app.__VUE_I18N_SYMBOL__);
	if (!n) throw z_(22);
	const o = "composition" === n.mode ? n.global : n.global.__composer,
		r = Ty(e) ? "__i18n" in t.type ? "local" : "global" : e.useScope ? e.useScope : "local";
	if ("global" === r) {
		let n = Iy(e.messages) ? e.messages : {};
		"__i18nGlobal" in t.type && (n = Y_(o.locale.value, {
			messages: n,
			__i18n: t.type.__i18nGlobal
		}));
		const r = Object.keys(n);
		if (r.length && r.forEach((e => {
				o.mergeLocaleMessage(e, n[e])
			})), Iy(e.datetimeFormats)) {
			const t = Object.keys(e.datetimeFormats);
			t.length && t.forEach((t => {
				o.mergeDateTimeFormat(t, e.datetimeFormats[t])
			}))
		}
		if (Iy(e.numberFormats)) {
			const t = Object.keys(e.numberFormats);
			t.length && t.forEach((t => {
				o.mergeNumberFormat(t, e.numberFormats[t])
			}))
		}
		return o
	}
	if ("parent" === r) {
		let r = function(e, t, n = !1) {
			let o = null;
			const r = t.root;
			let i = t.parent;
			for (; null != i;) {
				const t = e;
				if ("composition" === e.mode) o = t.__getInstance(i);
				else {
					const e = t.__getInstance(i);
					null != e && (o = e.__composer), n && o && !o[Q_] && (o = null)
				}
				if (null != o) break;
				if (r === i) break;
				i = i.parent
			}
			return o
		}(n, t, e.__useComponent);
		return null == r && (r = o), r
	}
	if ("legacy" === n.mode) throw z_(18);
	const i = n;
	let s = i.__getInstance(t);
	if (null == s) {
		const n = t.type,
			r = Ey({}, e);
		n.__i18n && (r.__i18n = n.__i18n), o && (r.__root = o), s = K_(r),
			function(e, t, n) {
				sr((() => {}), t), ur((() => {
					e.__deleteInstance(t)
				}), t)
			}(i, t), i.__setInstance(t, s)
	}
	return s
}
const uw = ["locale", "fallbackLocale", "availableLocales"],
	dw = ["t", "rt", "d", "n", "tm"];
b_ = function(e, t = {}) {
	{
		const n = (t.onCacheKey || A_)(e),
			o = C_[n];
		if (o) return o;
		let r = !1;
		const i = t.onError || e_;
		t.onError = e => {
			r = !0, i(e)
		};
		const {
			code: s
		} = v_(e, t), a = new Function(`return ${s}`)();
		return r ? a : C_[n] = a
	}
};
const fw = "请求失败",
	pw = "不在request 合法域名列表中",
	hw = "获取验证码",
	mw = "秒后重新获取",
	gw = "请完成验证",
	vw = "请输入验证码",
	bw = "请输入手机号码",
	yw = "请输入正确的手机号",
	_w = "请输入手机验证码",
	ww = "个人中心",
	xw = "用户协议",
	Tw = "隐私协议",
	Sw = "请输入昵称",
	Ew = "请设置头像",
	kw = "获取您的昵称头像",
	Aw = "获取用户头像、昵称完善个人资料，主要用于向用户提供具有辨识度的用户中心界面",
	Cw = {
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
	},
	Bw = "我的余额",
	Pw = "我的积分",
	Lw = "联系客服",
	Ow = "站点已关闭",
	Iw = "站点不存在",
	Mw = {
		requestFail: fw,
		notInDomainList: pw,
		currency: "￥",
		getSmsCode: hw,
		smsCodeChangeText: mw,
		captchaTitle: gw,
		confirm: "确认",
		cancel: "取消",
		save: "保存",
		delete: "删除",
		captchaPlaceholder: vw,
		mobilePlaceholder: bw,
		mobileError: yw,
		codePlaceholder: _w,
		memberCenter: ww,
		userAgreement: xw,
		privacyAgreement: Tw,
		nickname: "昵称",
		nicknamePlaceholder: Sw,
		headimg: "头像",
		headimgPlaceholder: Ew,
		getAvatarNickname: kw,
		getAvatarNicknameTips: Aw,
		point: "积分",
		balance: "余额",
		login: "登录",
		register: "注册",
		complete: "完成",
		close: "关闭",
		pay: Cw,
		myBalance: Bw,
		myPoint: Pw,
		customerService: Lw,
		siteClose: Ow,
		siteNonexistence: Iw
	},
	Fw = Object.freeze(Object.defineProperty({
		__proto__: null,
		balance: "余额",
		cancel: "取消",
		captchaPlaceholder: vw,
		captchaTitle: gw,
		close: "关闭",
		codePlaceholder: _w,
		complete: "完成",
		confirm: "确认",
		currency: "￥",
		customerService: Lw,
		default: Mw,
		getAvatarNickname: kw,
		getAvatarNicknameTips: Aw,
		getSmsCode: hw,
		headimg: "头像",
		headimgPlaceholder: Ew,
		login: "登录",
		memberCenter: ww,
		mobileError: yw,
		mobilePlaceholder: bw,
		myBalance: Bw,
		myPoint: Pw,
		nickname: "昵称",
		nicknamePlaceholder: Sw,
		notInDomainList: pw,
		pay: Cw,
		point: "积分",
		privacyAgreement: Tw,
		register: "注册",
		requestFail: fw,
		save: "保存",
		siteClose: Ow,
		siteNonexistence: Iw,
		smsCodeChangeText: mw,
		userAgreement: xw
	}, Symbol.toStringTag, {
		value: "Module"
	})),
	jw = "Index",
	Nw = {
		index: jw
	},
	Rw = Object.freeze(Object.defineProperty({
		__proto__: null,
		default: Nw,
		index: jw
	}, Symbol.toStringTag, {
		value: "Module"
	}));
let Dw = function(e = {}) {
	const t = !Oy(e.legacy) || e.legacy,
		n = !!e.globalInjection,
		o = new Map,
		r = t ? Z_(e) : K_(e),
		i = yy(""),
		s = {
			get mode() {
				return t ? "legacy" : "composition"
			},
			async install(e, ...o) {
				e.__VUE_I18N_SYMBOL__ = i, e.provide(e.__VUE_I18N_SYMBOL__, s), !t && n && function(e, t) {
						const n = Object.create(null);
						uw.forEach((e => {
							const o = Object.getOwnPropertyDescriptor(t, e);
							if (!o) throw z_(22);
							const r = Bn(o.value) ? {
								get: () => o.value.value,
								set(e) {
									o.value.value = e
								}
							} : {
								get: () => o.get && o.get()
							};
							Object.defineProperty(n, e, r)
						})), e.config.globalProperties.$i18n = n, dw.forEach((n => {
							const o = Object.getOwnPropertyDescriptor(t, n);
							if (!o || !o.value) throw z_(22);
							Object.defineProperty(e.config.globalProperties, `$${n}`, o)
						}))
					}(e, s.global),
					function(e, t, ...n) {
						const o = jy(n[0]) ? n[0] : {},
							r = !!o.useI18nComponentName;
						(!Oy(o.globalInstall) || o.globalInstall) && (e.component(r ? "i18n" : tw.name, tw), e
							.component(rw.name, rw), e.component(sw.name, sw)), e.directive("t", aw(t))
					}(e, s, ...o), t && e.mixin(function(e, t, n) {
						return {
							beforeCreate() {
								const o = Ri();
								if (!o) throw z_(22);
								const r = this.$options;
								if (r.i18n) {
									const n = r.i18n;
									r.__i18n && (n.__i18n = r.__i18n), n.__root = t, this === this.$root ?
										this.$i18n = lw(e, n) : (n.__injectWithOption = !0, this.$i18n = Z_(
											n))
								} else r.__i18n ? this === this.$root ? this.$i18n = lw(e, r) : this.$i18n =
									Z_({
										__i18n: r.__i18n,
										__injectWithOption: !0,
										__root: t
									}) : this.$i18n = e;
								e.__onComponentInstanceCreated(this.$i18n), n.__setInstance(o, this.$i18n),
									this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n
									.rt(...e), this.$tc = (...e) => this.$i18n.tc(...e), this.$te = (e,
									t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this
									.$n = (...e) => this.$i18n.n(...e), this.$tm = e => this.$i18n.tm(e)
							},
							mounted() {},
							beforeUnmount() {
								const e = Ri();
								if (!e) throw z_(22);
								delete this.$t, delete this.$rt, delete this.$tc, delete this.$te,
									delete this.$d, delete this.$n, delete this.$tm, n.__deleteInstance(e),
									delete this.$i18n
							}
						}
					}(r, r.__composer, s))
			},
			get global() {
				return r
			},
			__instances: o,
			__getInstance: e => o.get(e) || null,
			__setInstance(e, t) {
				o.set(e, t)
			},
			__deleteInstance(e) {
				o.delete(e)
			}
		};
	return s
}({
	locale: mf(),
	globalInjection: !0,
	messages: {
		"zh-Hans": Mw,
		en: Nw
	}
});
const qw = new class {
		constructor(e) {
			this.loadLocale = [], this.i18n = e
		}
		setI18nLanguage(e) {
			this.i18n.mode, this.i18n.global.locale = e, gf(e)
		}
		async loadLocaleMessages(e, n) {
			try {
				const o = "/" == e ? "pages.index.index" : e.replace("/", "").replaceAll("/", ".");
				if (this.loadLocale.includes(`${n}/${o}`)) return this.setI18nLanguage(n), Zn();
				this.loadLocale.push(`${n}/${o}`);
				const r = await ((e, t) => {
					const n = e[t];
					return n ? "function" == typeof n ? n() : Promise.resolve(n) : new Promise(((e, n) => {
						("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n
							.bind(null, new Error("Unknown variable dynamic import: " + t)))
					}))
				})(Object.assign({
					"./en/common.json": () => t((() => Promise.resolve().then((() => Rw))), void 0),
					"./en/pages.setting.index.json": () => t((() => import(
						"./locale-en-pages.setting.index.7f2a9cf4.js")), []),
					"./zh-Hans/common.json": () => t((() => Promise.resolve().then((() => Fw))),
						void 0),
					"./zh-Hans/pages.article.detail.json": () => t((() => import(
						"./locale-zh-Hans-pages.article.detail.7b286748.js")), []),
					"./zh-Hans/pages.article.list.json": () => t((() => import(
						"./locale-zh-Hans-pages.article.list.079553e7.js")), []),
					"./zh-Hans/pages.auth.bind.json": () => t((() => import(
						"./locale-zh-Hans-pages.auth.bind.356a10db.js")), []),
					"./zh-Hans/pages.auth.login.json": () => t((() => import(
						"./locale-zh-Hans-pages.auth.login.0404bd09.js")), []),
					"./zh-Hans/pages.auth.register.json": () => t((() => import(
						"./locale-zh-Hans-pages.auth.register.a5ee0e14.js")), []),
					"./zh-Hans/pages.auth.resetpwd.json": () => t((() => import(
						"./locale-zh-Hans-pages.auth.resetpwd.75e76a8e.js")), []),
					"./zh-Hans/pages.member.account.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.account.a20f7aba.js")), []),
					"./zh-Hans/pages.member.account_edit.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.account_edit.10181839.js")), []),
					"./zh-Hans/pages.member.apply_cash_out.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.apply_cash_out.7f44b3a1.js")), []),
					"./zh-Hans/pages.member.balance.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.balance.0a372d3c.js")), []),
					"./zh-Hans/pages.member.cash_out.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.cash_out.e9b5df1c.js")), []),
					"./zh-Hans/pages.member.cash_out_detail.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.cash_out_detail.587d5494.js")), []),
					"./zh-Hans/pages.member.commission.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.commission.c54dbf6f.js")), []),
					"./zh-Hans/pages.member.detailed_account.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.detailed_account.d74ec38a.js")), []),
					"./zh-Hans/pages.member.recharge_record.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.recharge_record.20315090.js")), []),
					"./zh-Hans/pages.member.recharge_record_detail.json": () => t((() => import(
							"./locale-zh-Hans-pages.member.recharge_record_detail.587d5494.js")),
					[]),
					"./zh-Hans/pages.member.withdrawal_detail.json": () => t((() => import(
						"./locale-zh-Hans-pages.member.withdrawal_detail.c63044ba.js")), []),
					"./zh-Hans/pages.setting.index.json": () => t((() => import(
						"./locale-zh-Hans-pages.setting.index.81e854bb.js")), [])
				}), `./${n}/${o}.json`);
				return this.i18n.global.mergeLocaleMessage(n, r.default), this.setI18nLanguage(n), Zn()
			} catch (o) {
				return this.setI18nLanguage(n), Zn()
			}
		}
	}(Dw),
	zw = e => Dw.global.t(e),
	Hw = {
		install(e) {
			e.use(Dw)
		}
	},
	Ww = {
		pages: [{
			path: "pages/index/index",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.index.index%"
			}
		}, {
			path: "pages/article/list",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.article.list%"
			}
		}, {
			path: "pages/auth/agreement",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.auth.agreement%"
			}
		}, {
			path: "pages/auth/bind",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.auth.bind%"
			}
		}, {
			path: "pages/auth/login",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.auth.login%"
			}
		}, {
			path: "pages/auth/register",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.auth.register%"
			}
		}, {
			path: "pages/auth/resetpwd",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.auth.resetpwd%"
			}
		}, {
			path: "pages/index/diy",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.index.diy%"
			}
		}, {
			path: "pages/index/close",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.index.close%"
			}
		}, {
			path: "pages/index/nonexistence",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.index.nonexistence%"
			}
		}, {
			path: "pages/article/detail",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.article.detail%"
			}
		}, {
			path: "pages/member/apply_cash_out",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.apply_cash_out%"
			},
			needLogin: !0
		}, {
			path: "pages/member/commission",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.commission%"
			},
			needLogin: !0
		}, {
			path: "pages/member/balance",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.balance%"
			},
			needLogin: !0
		}, {
			path: "pages/member/recharge_record",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.recharge_record%"
			},
			needLogin: !0
		}, {
			path: "pages/member/recharge_record_detail",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.recharge_record_detail%"
			},
			needLogin: !0
		}, {
			path: "pages/member/detailed_account",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.detailed_account%"
			}
		}, {
			path: "pages/member/cash_out",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.cash_out%"
			}
		}, {
			path: "pages/member/cash_out_detail",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.cash_out_detail%"
			}
		}, {
			path: "pages/member/index",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.index%"
			}
		}, {
			path: "pages/member/info",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.info%"
			},
			needLogin: !0
		}, {
			path: "pages/member/personal",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.personal%"
			},
			needLogin: !0
		}, {
			path: "pages/member/point",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.point%"
			},
			needLogin: !0
		}, {
			path: "pages/member/account",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.account%"
			},
			needLogin: !0
		}, {
			path: "pages/member/account_edit",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.member.account_edit%"
			},
			needLogin: !0
		}, {
			path: "pages/pay/browser",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.pay.browser%"
			}
		}, {
			path: "pages/pay/result",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.pay.result%"
			}
		}, {
			path: "pages/setting/index",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.setting.index%"
			},
			needLogin: !0
		}, {
			path: "pages/webview/index",
			style: {
				navigationStyle: "custom",
				navigationBarTitleText: "%pages.webview.index%"
			}
		}],
		globalStyle: {
			navigationBarTextStyle: "black",
			navigationBarTitleText: "",
			navigationBarBackgroundColor: "#ffffff",
			backgroundColor: "#F8F8F8",
			backgroundColorTop: "#F8F8F8",
			backgroundColorBottom: "#F8F8F8"
		},
		tabBar: {
			list: [{
				pagePath: "pages/index/index"
			}, {
				pagePath: "pages/article/list"
			}, {
				pagePath: "pages/member/index"
			}]
		},
		uniIdRouter: {},
		easycom: {
			custom: {
				"^u-(.*)": "uview-plus/components/u-$1/u-$1.vue",
				"diy-(.*)": "@/components/diy/$1/index.vue"
			}
		}
	};

function Vw() {
	return "/" + Ww.pages[0].path
}
/*!
 * pinia v2.0.32
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let $w;
const Qw = e => $w = e,
	Uw = Symbol();

function Xw(e) {
	return e && "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) && "function" !=
		typeof e.toJSON
}
var Yw, Jw;
(Jw = Yw || (Yw = {})).direct = "direct", Jw.patchObject = "patch object", Jw.patchFunction = "patch function";
const Gw = "undefined" != typeof window;

function Kw() {
	const e = lt(!0),
		t = e.run((() => Pn({})));
	let n = [],
		o = [];
	const r = Sn({
		install(e) {
			Qw(r), r._a = e, e.provide(Uw, r), e.config.globalProperties.$pinia = r, o.forEach((e => n.push(
				e))), o = []
		},
		use(e) {
			return this._a ? n.push(e) : o.push(e), this
		},
		_p: n,
		_a: null,
		_e: e,
		_s: new Map,
		state: t
	});
	return r
}
const Zw = () => {};

function ex(e, t, n, o = Zw) {
	e.push(t);
	const r = () => {
		const n = e.indexOf(t);
		n > -1 && (e.splice(n, 1), o())
	};
	var i;
	return !n && ct() && (i = r, st && st.cleanups.push(i)), r
}

function tx(e, ...t) {
	e.slice().forEach((e => {
		e(...t)
	}))
}

function nx(e, t) {
	e instanceof Map && t instanceof Map && t.forEach(((t, n) => e.set(n, t))), e instanceof Set && t instanceof Set &&
		t.forEach(e.add, e);
	for (const n in t) {
		if (!t.hasOwnProperty(n)) continue;
		const o = t[n],
			r = e[n];
		Xw(r) && Xw(o) && e.hasOwnProperty(n) && !Bn(o) && !yn(o) ? e[n] = nx(r, o) : e[n] = o
	}
	return e
}
const ox = Symbol();
const {
	assign: rx
} = Object;

function ix(e, t, n, o) {
	const {
		state: r,
		actions: i,
		getters: s
	} = t, a = n.state.value[e];
	let l;
	return l = sx(e, (function() {
		a || (n.state.value[e] = r ? r() : {});
		const t = function(e) {
			const t = k(e) ? new Array(e.length) : {};
			for (const n in e) t[n] = Rn(e, n);
			return t
		}(n.state.value[e]);
		return rx(t, i, Object.keys(s || {}).reduce(((t, o) => (t[o] = Sn(Ui((() => {
			Qw(n);
			const t = n._s.get(e);
			return s[o].call(t, t)
		}))), t)), {}))
	}), t, n, o, !0), l.$reset = function() {
		const e = r ? r() : {};
		this.$patch((t => {
			rx(t, e)
		}))
	}, l
}

function sx(e, t, n = {}, o, r, i) {
	let s;
	const a = rx({
			actions: {}
		}, n),
		l = {
			deep: !0
		};
	let c, u, d, f = Sn([]),
		p = Sn([]);
	const h = o.state.value[e];
	let m;

	function g(t) {
		let n;
		c = u = !1, "function" == typeof t ? (t(o.state.value[e]), n = {
			type: Yw.patchFunction,
			storeId: e,
			events: d
		}) : (nx(o.state.value[e], t), n = {
			type: Yw.patchObject,
			payload: t,
			storeId: e,
			events: d
		});
		const r = m = Symbol();
		Zn().then((() => {
			m === r && (c = !0)
		})), u = !0, tx(f, n, o.state.value[e])
	}
	i || h || (o.state.value[e] = {}), Pn({});
	const v = Zw;

	function b(t, n) {
		return function() {
			Qw(o);
			const r = Array.from(arguments),
				i = [],
				s = [];

			function a(e) {
				i.push(e)
			}

			function l(e) {
				s.push(e)
			}
			let c;
			tx(p, {
				args: r,
				name: t,
				store: y,
				after: a,
				onError: l
			});
			try {
				c = n.apply(this && this.$id === e ? this : y, r)
			} catch (u) {
				throw tx(s, u), u
			}
			return c instanceof Promise ? c.then((e => (tx(i, e), e))).catch((e => (tx(s, e), Promise.reject(e)))) :
				(tx(i, c), c)
		}
	}
	const y = gn({
		_p: o,
		$id: e,
		$onAction: ex.bind(null, p),
		$patch: g,
		$reset: v,
		$subscribe(t, n = {}) {
			const r = ex(f, t, n.detached, (() => i())),
				i = s.run((() => Eo((() => o.state.value[e]), (o => {
					("sync" === n.flush ? u : c) && t({
						storeId: e,
						type: Yw.direct,
						events: d
					}, o)
				}), rx({}, l, n))));
			return r
		},
		$dispose: function() {
			s.stop(), f = [], p = [], o._s.delete(e)
		}
	});
	o._s.set(e, y);
	const _ = o._e.run((() => (s = lt(), s.run((() => t())))));
	for (const T in _) {
		const t = _[T];
		if (Bn(t) && (!Bn(x = t) || !x.effect) || yn(t)) i || (!h || Xw(w = t) && w.hasOwnProperty(ox) || (Bn(t) ? t
			.value = h[T] : nx(t, h[T])), o.state.value[e][T] = t);
		else if ("function" == typeof t) {
			const e = b(T, t);
			_[T] = e, a.actions[T] = t
		}
	}
	var w, x;
	return rx(y, _), rx(Tn(y), _), Object.defineProperty(y, "$state", {
		get: () => o.state.value[e],
		set: e => {
			g((t => {
				rx(t, e)
			}))
		}
	}), o._p.forEach((e => {
		rx(y, s.run((() => e({
			store: y,
			app: o._a,
			pinia: o,
			options: a
		}))))
	})), h && i && n.hydrate && n.hydrate(y.$state, h), c = !0, u = !0, y
}

function ax(e, t, n) {
	let o, r;
	const i = "function" == typeof t;

	function s(e, n) {
		const s = Ri();
		(e = e || s && xo(Uw, null)) && Qw(e), (e = $w)._s.has(o) || (i ? sx(o, t, r, e) : ix(o, r, e));
		return e._s.get(o)
	}
	return "string" == typeof e ? (o = e, r = i ? n : t) : (r = e, o = e.id), s.$id = o, s
}
let lx = "Store";

function cx(e, t) {
	return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = function() {
		return e(this.$pinia)[n]
	}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = function() {
		const n = e(this.$pinia),
			r = t[o];
		return "function" == typeof r ? r.call(this, n) : n[r]
	}, n)), {})
}
const ux = cx;
const dx = Object.freeze(Object.defineProperty({
		__proto__: null,
		get MutationType() {
			return Yw
		},
		PiniaVuePlugin: function(e) {
			e.mixin({
				beforeCreate() {
					const e = this.$options;
					if (e.pinia) {
						const t = e.pinia;
						if (!this._provided) {
							const e = {};
							Object.defineProperty(this, "_provided", {
								get: () => e,
								set: t => Object.assign(e, t)
							})
						}
						this._provided[Uw] = t, this.$pinia || (this.$pinia = t), t._a = this, Gw &&
							Qw(t)
					} else !this.$pinia && e.parent && e.parent.$pinia && (this.$pinia = e.parent
						.$pinia)
				},
				destroyed() {
					delete this._pStores
				}
			})
		},
		acceptHMRUpdate: function(e, t) {
			return () => {}
		},
		createPinia: Kw,
		defineStore: ax,
		getActivePinia: () => Ri() && xo(Uw) || $w,
		mapActions: function(e, t) {
			return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = function(...t) {
				return e(this.$pinia)[n](...t)
			}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = function(...n) {
				return e(this.$pinia)[t[o]](...n)
			}, n)), {})
		},
		mapGetters: ux,
		mapState: cx,
		mapStores: function(...e) {
			return e.reduce(((e, t) => (e[t.$id + lx] = function() {
				return t(this.$pinia)
			}, e)), {})
		},
		mapWritableState: function(e, t) {
			return Array.isArray(t) ? t.reduce(((t, n) => (t[n] = {
				get() {
					return e(this.$pinia)[n]
				},
				set(t) {
					return e(this.$pinia)[n] = t
				}
			}, t)), {}) : Object.keys(t).reduce(((n, o) => (n[o] = {
				get() {
					return e(this.$pinia)[t[o]]
				},
				set(n) {
					return e(this.$pinia)[t[o]] = n
				}
			}, n)), {})
		},
		setActivePinia: Qw,
		setMapStoreSuffix: function(e) {
			lx = e
		},
		skipHydrate: function(e) {
			return Object.defineProperty(e, ox, {})
		},
		storeToRefs: function(e) {
			{
				e = Tn(e);
				const t = {};
				for (const n in e) {
					const o = e[n];
					(Bn(o) || yn(o)) && (t[n] = Rn(e, n))
				}
				return t
			}
		}
	}, Symbol.toStringTag, {
		value: "Module"
	})),
	fx = ax("diy", {
		state: () => ({
			mode: "",
			currentIndex: -99,
			global: {
				title: "",
				pageBgColor: "",
				bottomTabBarSwitch: !0,
				bgUrl: ""
			},
			value: []
		}),
		getters: {},
		actions: {
			init() {
				var e = JSON.stringify({
					type: "init",
					load: !0
				});
				window.parent.postMessage(e, "*"), window.addEventListener("message", (e => {
					try {
						let t = JSON.parse(e.data);
						this.currentIndex = t.currentIndex, t.global && (this.global = t.global), t
							.value && (this.value = t.value), this.value && this.value.forEach(((e,
								t) => {
									e.pageStyle = "", e.pageBgColor && (e.pageStyle +=
											"background-color:" + e.pageBgColor + ";"), e.margin &&
										(e.pageStyle += "padding-top:" + 2 * e.margin.top + "rpx;",
											e.pageStyle += "padding-bottom:" + 2 * e.margin.bottom +
											"rpx;", e.pageStyle += "padding-right:" + 2 * e.margin
											.both + "rpx;", e.pageStyle += "padding-left:" + 2 * e
											.margin.both + "rpx;")
								}))
					} catch (t) {
						console.log("uniapp接受数据错误", t)
					}
				}), !1)
			},
			postMessage(e, t) {
				if (this.currentIndex = e, t) var n = JSON.stringify({
					type: "data",
					index: this.currentIndex,
					global: Tn(this.global),
					value: Tn(this.value),
					component: Tn(t)
				});
				window.parent.postMessage(n, "*")
			},
			changeCurrentIndex(e, t = null) {
				if ("" != this.mode && this.currentIndex != e) {
					this.currentIndex = e;
					var n = JSON.stringify({
						type: "change",
						index: e,
						component: Tn(t)
					});
					window.parent.postMessage(n, "*")
				}
			}
		}
	});
const px = new class {
	constructor() {
		this.config = {
				url: "",
				header: {}
			}, this.baseUrl = `${location.origin}/api/`, this.config.header["site-id"] = wg("wap_site_id") ||
			"1", this.config.header.channel = Yx() ? "wechat" : "h5"
	}
	requestInterceptors() {
		$x() && (this.config.header.token = $x())
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
		const o = Object.assign(uni.$u.deepClone(this.config), {
			url: this.baseUrl + e,
			...t
		});
		return new Promise(((e, t) => {
			ev({
				...o,
				success: n => {
					const o = JSON.parse(n.data);
					1 == o.code ? (this.config.showSuccessMessage && _v({
						title: o.msg,
						icon: "none"
					}), e(o)) : (this.handleAuthError(o.code), this.config
						.showErrorMessage && _v({
							title: o.msg,
							icon: "none"
						}), t(o))
				},
				fail: e => {
					t(e)
				}
			})
		}))
	}
	request(e, t, n) {
		this.requestInterceptors();
		const o = Object.assign(uni.$u.deepClone(this.config), {
			url: this.baseUrl + t,
			method: e,
			data: n
		});
		return new Promise(((e, t) => {
			Xg({
				...o,
				success: n => {
					const o = n.data;
					1 == o.code ? (this.config.showSuccessMessage && _v({
						title: o.msg,
						icon: "none"
					}), e(o)) : (this.handleAuthError(o.code), this.config
						.showErrorMessage && _v({
							title: o.msg,
							icon: "none"
						}), t(o))
				},
				fail: e => {
					t(e)
				},
				complete: e => {
					this.handleRequestFail(e)
				}
			})
		}))
	}
	handleAuthError(e) {
		if (401 === e) qx().logout()
	}
	handleRequestFail(e) {
		e.errMsg && "request:ok" == e.errMsg && "string" == typeof e.data ? _v({
				icon: "none",
				title: this.baseUrl + zw("requestFail")
			}) : "request:fail" != e.errMsg ? e.errMsg && "request:fail url not in domain list" == e.errMsg &&
			_v({
				icon: "none",
				title: this.baseUrl + zw("notInDomainList")
			}) : _v({
				icon: "none",
				title: this.baseUrl + zw("requestFail")
			})
	}
};

function hx(e) {
	return px.get("member/account/point", e)
}

function mx(e) {
	return px.get("member/account/balance", e)
}

function gx(e) {
	return px.get("member/account/money", e)
}

function vx(e) {
	return px.put(`member/modify/${e.field}`, e, {
		showErrorMessage: !0
	})
}

function bx(e) {
	return px.post("order/recharge", e, {
		showErrorMessage: !0
	})
}

function yx(e) {
	return px.get("order/recharge", e, {
		showErrorMessage: !0
	})
}

function _x(e) {
	return px.get(`order/recharge/${e}`, {}, {
		showErrorMessage: !0
	})
}

function wx(e) {
	return px.put("member/mobile", e, {
		showErrorMessage: !0
	})
}

function xx() {
	return px.get("member/cash_out/config")
}

function Tx(e) {
	return px.post("member/cash_out/apply", e, {
		showSuccessMessage: !0,
		showErrorMessage: !0
	})
}

function Sx(e) {
	return px.get(`member/cashout_account/${e.account_id}`, {})
}

function Ex(e) {
	return px.get("member/cashout_account/firstinfo", e)
}

function kx(e) {
	return px.get("member/cashout_account", e)
}

function Ax(e) {
	return px.get("member/cash_out", e)
}

function Cx(e) {
	return px.get(`member/cash_out/${e}`)
}

function Bx(e) {
	return px.post("member/cashout_account", e, {
		showSuccessMessage: !0,
		showErrorMessage: !0
	})
}

function Px(e) {
	return px.put(`member/cashout_account/${e.account_id}`, e, {
		showSuccessMessage: !0,
		showErrorMessage: !0
	})
}

function Lx(e) {
	return px.delete(`member/cashout_account/${e}`, {
		showSuccessMessage: !0,
		showErrorMessage: !0
	})
}

function Ox(e) {
	return px.get("member/account/commission", e)
}

function Ix(e) {
	return px.get("login", e, {
		showErrorMessage: !0
	})
}

function Mx(e) {
	return px.post("login/mobile", e, {
		showErrorMessage: !0
	})
}

function Fx(e) {
	return px.post("register", e, {
		showErrorMessage: !0
	})
}

function jx(e) {
	return px.post("register/mobile", e, {
		showErrorMessage: !0
	})
}

function Nx(e) {
	return px.post("wechat/login", e)
}

function Rx(e) {
	return px.post("bind", e, {
		showErrorMessage: !0
	})
}

function Dx(e) {
	return px.post("member/log", e)
}
const qx = ax("member", {
		state: () => ({
			token: wg("wapToken"),
			info: null
		}),
		actions: {
			async setToken(e) {
				this.token = e,
					function(e) {
						bg("wapToken", e)
					}(e), await this.getMemberInfo()
			},
			async getMemberInfo() {
				await px.get("member/member").then((e => {
					this.info = e.data
				})).catch((async () => {
					await this.logout()
				}))
			},
			async logout(e = !1) {
				await px.put("auth/logout").then((() => {
					this.$reset(), Qx(), e && zx({
						url: "/pages/index/index"
					})
				})).catch((() => {
					this.$reset(), Qx(), e && zx({
						url: "/pages/index/index"
					})
				}))
			}
		}
	}),
	zx = e => {
		if ("decorate" == fx().mode) return;
		let {
			url: t,
			mode: n,
			param: o,
			success: r,
			fail: i,
			complete: s
		} = e;
		n = n || "navigateTo";
		switch (Ww.tabBar.list.map((e => `/${e.pagePath}`)).includes(t) && (n = "switchTab"), "switchTab" != n && o &&
			Object.keys(o).length && (t += uni.$u.queryParams(o)), n) {
			case "switchTab":
				av({
					url: t,
					success: () => {
						r && r()
					},
					fail: () => {
						i && i()
					},
					complete: () => {
						s && s()
					}
				});
				break;
			case "navigateTo":
				ov({
					url: t,
					success: () => {
						r && r()
					},
					fail: () => {
						i && i()
					},
					complete: () => {
						s && s()
					}
				});
				break;
			case "reLaunch":
				iv({
					url: t,
					success: () => {
						r && r()
					},
					fail: () => {
						i && i()
					},
					complete: () => {
						s && s()
					}
				});
				break;
			case "redirectTo":
				rv({
					url: t,
					success: () => {
						r && r()
					},
					fail: () => {
						i && i()
					},
					complete: () => {
						s && s()
					}
				})
		}
	},
	Hx = e => {
		"decorate" != fx().mode && null != e && 1 != Object.keys(e).length && e.url && (-1 != e.url.indexOf("http") || -
			1 != e.url.indexOf("http") ? window.location.href = e.url : zx({
				url: e.url
			}))
	},
	Wx = () => {
		const e = vm(),
			t = e[e.length - 1];
		return t ? t.route : ""
	},
	Vx = () => {
		const e = vm();
		let t = e[e.length - 1].route,
			n = e[e.length - 1].$page.options,
			o = {};
		for (let r in n) o[r] = n[r];
		return {
			path: "/" + t,
			params: o
		}
	};

function $x() {
	return qx().token
}

function Qx() {
	Tg("wapToken")
}

function Ux(e) {
	const t = {},
		[n, o] = e.split("?");
	return o && o.split("&").forEach((e => {
		let [n, o] = e.split("=");
		t[n] = o
	})), {
		path: n,
		query: t
	}
}

function Xx(e) {
	return -1 != (t = e).indexOf("http://") || -1 != t.indexOf("https://") ? e : `${location.origin}/${e}`;
	var t
}

function Yx() {
	let e = navigator.userAgent.toLowerCase();
	return !!/micromessenger/.test(e)
}

function Jx(e) {
	return isNaN(parseFloat(e)) ? e : parseFloat(e).toFixed(2)
}

function Gx(e) {
	return e.substring(0, 3) + "****" + e.substr(e.length - 4)
}

function Kx() {
	return px.get("captcha", {}, {
		showErrorMessage: !0
	})
}

function Zx(e) {
	return px.post("wechat/sync", e)
}

function eT(e) {
	return px.get(`agreement/${e}`)
}

function tT(e) {
	return px.post("password/reset", e, {
		showErrorMessage: !0
	})
}

function nT(e) {
	return px.post(`send/mobile/${e.type}`, e, {
		showErrorMessage: !0
	})
}

function oT(e) {
	return px.get("wechat/jssdkconfig", e)
}

function rT(e) {
	return px.upload("file/image", e, {
		showErrorMessage: !0
	})
}

function iT(e) {
	return px.get("diy/diy", e)
}

function sT(e) {
	return px.get("diy/share", e)
}
const aT = ax("config", {
	state: () => ({
		login: {
			is_username: 0,
			is_mobile: 0,
			is_auth_register: 0,
			is_bind_mobile: 0,
			agreement_show: 0
		},
		tabbar: null
	}),
	actions: {
		async getLoginConfig() {
			await px.get("login/config").then((e => {
				this.login.is_username = parseInt(e.data.is_username), this.login.is_mobile =
					parseInt(e.data.is_mobile), this.login.is_auth_register = parseInt(e.data
						.is_auth_register), this.login.is_bind_mobile = parseInt(e.data
						.is_bind_mobile), this.login.agreement_show = parseInt(e.data
						.agreement_show)
			})).catch((() => {}))
		},
		async getTabbarConfig() {
			await px.get("diy/tabbar").then((e => {
				this.tabbar = e.data
			})).catch((() => {}))
		}
	}
});

function lT() {
	return {
		setLoginBack: e => {
			yg({
				key: "loginBack",
				data: e
			}), setTimeout((() => {
				const e = aT();
				Yx() && wg("openid") && e.login.is_bind_mobile ? zx({
					url: "/pages/auth/bind",
					mode: "redirectTo"
				}) : zx({
					url: "/pages/auth/login",
					mode: "redirectTo"
				})
			}))
		},
		handleLoginBack: () => {
			xg({
				key: "loginBack",
				success: e => {
					zx(e ? e.data : {
						url: "/pages/index/index"
					})
				},
				fail: e => {
					zx({
						url: "/pages/index/index"
					})
				}
			})
		},
		authLogin: e => {
			let t = null;
			t = Nx, t({
				code: e
			}).then((e => {
				e.data.token ? qx().setToken(e.data.token) : bg("openid", e.data.openid)
			}))
		},
		getAuthCode: (e = "snsapi_base") => {
			let t = `${location.origin}${location.pathname}`,
				n = Ux(location.href).query;
			var o;
			n.code && delete n.code, Object.keys(n).length && (t += uni.$u.queryParams(n)), (o = {
				url: t,
				scopes: e
			}, px.get("wechat/codeurl", o)).then((e => {
				location.href = e.data.url
			}))
		}
	}
}
const cT = lT();

function uT(e) {
	(function() {
		const e = [];
		return Ww.pages.forEach((t => {
			t.needLogin && e.push(`/${t.path}`)
		})), Ww.subPackages && Ww.subPackages.forEach((t => {
			t.pages.forEach((n => {
				n.needLogin && e.push(`/${t.root}/${n.path}`)
			}))
		})), e
	})().includes(e.path) && !$x() && cT.setLoginBack({
		url: e.path,
		param: e.query || {}
	})
}
const dT = ax("system", {
		state: () => ({
			site: null
		}),
		actions: {
			async getSitenfo() {
				await px.get("site").then((e => {
					this.site = e.data, 3 == this.site.status && zx({
						url: "/pages/index/close",
						mode: "reLaunch"
					})
				})).catch((e => {
					zx({
						url: "/pages/index/nonexistence",
						mode: "reLaunch"
					})
				}))
			}
		}
	}),
	fT = Do({
		__name: "App",
		setup: e => (({}.VITE_APP_DEBUG && new window.VConsole, dy((async e => {
			(() => {
				const e = bf();
				e.path = `/${e.path}`, qw.loadLocaleMessages(e.path, mf()), uT(e), e
					.query && e.query.mid && bg("pid", e.query.mid);
				const t = location.href.match(/\/s(\d*)\//);
				t ? bg("wap_site_id", t[1]) : Tg("wap_site_id"), $x() && Dx({
					route: e.path,
					params: JSON.stringify(e.query || {}),
					pre_route: ""
				})
			})(), ["navigateTo", "redirectTo", "reLaunch", "switchTab"].forEach((e => {
				qd(e, {
					invoke(e) {
						const t = Ux(e.url);
						qw.loadLocaleMessages(t.path, mf()), uT(t),
						$x() && Dx({
								route: t.path,
								params: JSON.stringify(t.query),
								pre_route: vm()[0].route
							})
					}
				})
			})), "ios" == gg().platform && bg("initUrl", location.href);
			const t = aT();
			if (t.getTabbarConfig(), await t.getLoginConfig(), dT().getSitenfo(), Iv(),
			$x()) {
				const e = qx();
				await e.setToken($x())
			}
			if (!$x()) {
				const t = lT();
				Yx() && (e.query.code ? t.authLogin(e.query.code) : t.getAuthCode(
					"snsapi_userinfo"))
			}
			window.addEventListener("popstate", (function(e) {
				const t = "/" + location.pathname.replace(vy.router.base, "");
				qw.loadLocaleMessages(t, mf())
			}), !1)
		})), cy((() => {})), uy((() => {})), () => {}))
	});
Vm(fT, {
	init: Hm,
	setup(e) {
		const t = om(),
			n = () => {
				var n;
				n = e, Object.keys(vf).forEach((e => {
					vf[e].forEach((t => {
						or(e, t, n)
					}))
				}));
				const {
					onLaunch: o,
					onShow: r,
					onPageNotFound: i
				} = e, s = function({
					path: e,
					query: t
				}) {
					return x(sp, {
						path: e,
						query: t
					}), x(ap, sp), x({}, sp)
				}({
					path: t.path.slice(1) || __uniRoutes[0].meta.route,
					query: Qe(t.query)
				});
				if (o && U(o, s), r && U(r, s), !t.matched.length) {
					const e = {
						notFound: !0,
						openType: "appLaunch",
						path: t.path,
						query: {},
						scene: 1001
					};
					i && U(i, e)
				}
			};
		return xo(xl).isReady().then(n), sr((() => {
			window.addEventListener("resize", Ye(Qm, 50, {
					setTimeout: setTimeout,
					clearTimeout: clearTimeout
				})), window.addEventListener("message", Um), document.addEventListener(
					"visibilitychange", Xm),
				function() {
					let e = null;
					try {
						e = window.matchMedia("(prefers-color-scheme: dark)")
					} catch (t) {}
					e && e.addEventListener("change", (e => {
						Xv.emit(ae, {
							theme: e.matches ? "dark" : "light"
						})
					}))
				}()
		})), t.query
	},
	before(e) {
		e.mpType = "app";
		const {
			setup: t
		} = e, n = () => (hi(), yi(Qv));
		e.setup = (e, o) => {
			const r = t && t(e, o);
			return B(r) ? n : r
		}, e.render = n
	}
});
const pT = {
		props: {
			customStyle: {
				type: [Object, String],
				default: () => ({})
			},
			customClass: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: ""
			},
			linkType: {
				type: String,
				default: "navigateTo"
			}
		},
		data: () => ({}),
		onLoad() {
			this.$u.getRect = this.$uGetRect
		},
		created() {
			this.$u.getRect = this.$uGetRect
		},
		computed: {
			$u: () => uni.$u.deepMerge(uni.$u, {
				props: void 0,
				http: void 0,
				mixin: void 0
			}),
			bem: () => function(e, t, n) {
				const o = `u-${e}--`,
					r = {};
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
				t && this.$u.route({
					type: this.linkType,
					url: t
				})
			},
			$uGetRect(e, t) {
				return new Promise((n => {
					hf().in(this)[t ? "selectAll" : "select"](e).boundingClientRect((e => {
						t && Array.isArray(e) && e.length && n(e), !t && e && n(e)
					})).exec()
				}))
			},
			getParentData(e = "") {
				this.parent || (this.parent = {}), this.parent = uni.$u.$parent.call(this, e), this.parent.children && -
					1 === this.parent.children.indexOf(this) && this.parent.children.push(this), this.parent && this
					.parentData && Object.keys(this.parentData).map((e => {
						this.parentData[e] = this.parent[e]
					}))
			},
			preventEvent(e) {
				e && "function" == typeof e.stopPropagation && e.stopPropagation()
			},
			noop(e) {
				this.preventEvent(e)
			}
		},
		onReachBottom() {
			Vd("uOnReachBottom")
		},
		beforeDestroy() {
			if (this.parent && uni.$u.test.array(this.parent.children)) {
				const e = this.parent.children;
				e.map(((t, n) => {
					t === this && e.splice(n, 1)
				}))
			}
		}
	},
	hT = {},
	{
		toString: mT
	} = Object.prototype;

function gT(e) {
	return "[object Array]" === mT.call(e)
}

function vT(e, t) {
	if (null != e)
		if ("object" != typeof e && (e = [e]), gT(e))
			for (let n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
		else
			for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.call(null, e[n], n, e)
}

function bT() {
	const e = {};

	function t(t, n) {
		"object" == typeof e[n] && "object" == typeof t ? e[n] = bT(e[n], t) : e[n] = "object" == typeof t ? bT({}, t) :
			t
	}
	for (let n = 0, o = arguments.length; n < o; n++) vT(arguments[n], t);
	return e
}

function yT(e) {
	return void 0 === e
}

function _T(e) {
	return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
		.replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function wT(e, t) {
	if (!t) return e;
	let n;
	if (o = t, "undefined" != typeof URLSearchParams && o instanceof URLSearchParams) n = t.toString();
	else {
		const e = [];
		vT(t, ((t, n) => {
			null != t && (gT(t) ? n = `${n}[]` : t = [t], vT(t, (t => {
				! function(e) {
					return "[object Date]" === mT.call(e)
				}(t) ? function(e) {
					return null !== e && "object" == typeof e
				}(t) && (t = JSON.stringify(t)) : t = t.toISOString(), e.push(
					`${_T(n)}=${_T(t)}`)
			})))
		})), n = e.join("&")
	}
	var o;
	if (n) {
		const t = e.indexOf("#"); - 1 !== t && (e = e.slice(0, t)), e += (-1 === e.indexOf("?") ? "?" : "&") + n
	}
	return e
}
const xT = (e, t) => {
		const n = {};
		return e.forEach((e => {
			yT(t[e]) || (n[e] = t[e])
		})), n
	},
	TT = e => (e => new Promise(((t, n) => {
		const o = wT((r = e.baseURL, i = e.url, r && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(i) ? function(e,
		t) {
			return t ? `${e.replace(/\/+$/,"")}/${t.replace(/^\/+/,"")}` : e
		}(r, i) : i), e.params);
		var r, i;
		const s = {
			url: o,
			header: e.header,
			complete: r => {
				e.fullPath = o, r.config = e;
				try {
					"string" == typeof r.data && (r.data = JSON.parse(r.data))
				} catch (i) {}! function(e, t, n) {
					const {
						validateStatus: o
					} = n.config, r = n.statusCode;
					!r || o && !o(r) ? t(n) : e(n)
				}(t, n, r)
			}
		};
		let a;
		if ("UPLOAD" === e.method) {
			delete s.header["content-type"], delete s.header["Content-Type"];
			const t = {
					filePath: e.filePath,
					name: e.name
				},
				n = ["files", "file", "timeout", "formData"];
			a = ev({
				...s,
				...t,
				...xT(n, e)
			})
		} else if ("DOWNLOAD" === e.method) yT(e.timeout) || (s.timeout = e.timeout), a = Kg(s);
		else {
			const t = ["data", "method", "timeout", "dataType", "responseType", "withCredentials"];
			a = Xg({
				...s,
				...xT(t, e)
			})
		}
		e.getTask && e.getTask(a, e)
	})))(e);

function ST() {
	this.handlers = []
}
ST.prototype.use = function(e, t) {
	return this.handlers.push({
		fulfilled: e,
		rejected: t
	}), this.handlers.length - 1
}, ST.prototype.eject = function(e) {
	this.handlers[e] && (this.handlers[e] = null)
}, ST.prototype.forEach = function(e) {
	this.handlers.forEach((t => {
		null !== t && e(t)
	}))
};
const ET = (e, t, n) => {
		const o = {};
		return e.forEach((e => {
			yT(n[e]) ? yT(t[e]) || (o[e] = t[e]) : o[e] = n[e]
		})), o
	},
	kT = {
		baseURL: "",
		header: {},
		method: "GET",
		dataType: "json",
		responseType: "text",
		custom: {},
		timeout: 6e4,
		withCredentials: !1,
		validateStatus: function(e) {
			return e >= 200 && e < 300
		}
	};
var AT = function() {
	function e(e, t) {
		return null != t && e instanceof t
	}
	var t, n, o;
	try {
		t = Map
	} catch (a) {
		t = function() {}
	}
	try {
		n = Set
	} catch (a) {
		n = function() {}
	}
	try {
		o = Promise
	} catch (a) {
		o = function() {}
	}

	function r(i, a, l, c, u) {
		"object" == typeof a && (l = a.depth, c = a.prototype, u = a.includeNonEnumerable, a = a.circular);
		var d = [],
			f = [],
			p = "undefined" != typeof Buffer;
		return void 0 === a && (a = !0), void 0 === l && (l = 1 / 0),
			function i(l, h) {
				if (null === l) return null;
				if (0 === h) return l;
				var m, g;
				if ("object" != typeof l) return l;
				if (e(l, t)) m = new t;
				else if (e(l, n)) m = new n;
				else if (e(l, o)) m = new o((function(e, t) {
					l.then((function(t) {
						e(i(t, h - 1))
					}), (function(e) {
						t(i(e, h - 1))
					}))
				}));
				else if (r.__isArray(l)) m = [];
				else if (r.__isRegExp(l)) m = new RegExp(l.source, s(l)), l.lastIndex && (m.lastIndex = l
				.lastIndex);
				else if (r.__isDate(l)) m = new Date(l.getTime());
				else {
					if (p && Buffer.isBuffer(l)) return Buffer.from ? m = Buffer.from(l) : (m = new Buffer(l
						.length), l.copy(m)), m;
					e(l, Error) ? m = Object.create(l) : void 0 === c ? (g = Object.getPrototypeOf(l), m = Object
						.create(g)) : (m = Object.create(c), g = c)
				}
				if (a) {
					var v = d.indexOf(l);
					if (-1 != v) return f[v];
					d.push(l), f.push(m)
				}
				for (var b in e(l, t) && l.forEach((function(e, t) {
						var n = i(t, h - 1),
							o = i(e, h - 1);
						m.set(n, o)
					})), e(l, n) && l.forEach((function(e) {
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
						(!(x = Object.getOwnPropertyDescriptor(l, _)) || x.enumerable || u) && (m[_] = i(l[_], h -
							1), Object.defineProperty(m, _, x))
					}
				}
				if (u) {
					var w = Object.getOwnPropertyNames(l);
					for (b = 0; b < w.length; b++) {
						var x, T = w[b];
						(x = Object.getOwnPropertyDescriptor(l, T)) && x.enumerable || (m[T] = i(l[T], h - 1),
							Object.defineProperty(m, T, x))
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
	return r.clonePrototype = function(e) {
		if (null === e) return null;
		var t = function() {};
		return t.prototype = e, new t
	}, r.__objToStr = i, r.__isDate = function(e) {
		return "object" == typeof e && "[object Date]" === i(e)
	}, r.__isArray = function(e) {
		return "object" == typeof e && "[object Array]" === i(e)
	}, r.__isRegExp = function(e) {
		return "object" == typeof e && "[object RegExp]" === i(e)
	}, r.__getRegExpFlags = s, r
}();
const CT = (new class {
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
		return /.*\/.*\?.*=.*/.test(e) ? (n = uni.$u.queryParams(t, !1), e + `&${n}`) : (n = uni.$u
			.queryParams(t), e + n)
	}
	async route(e = {}, t = {}) {
		let n = {};
		if ("string" == typeof e ? (n.url = this.mixinParam(e, t), n.type = "navigateTo") : (n = uni.$u
				.deepMerge(this.config, e), n.url = this.mixinParam(e.url, e.params)), n.url !== uni.$u
			.page())
			if (t.intercept && (this.config.intercept = t.intercept), n.params = t, n = uni.$u.deepMerge(
					this.config, n), "function" == typeof uni.$u.routeIntercept) {
				await new Promise(((e, t) => {
					uni.$u.routeIntercept(n, e)
				})) && this.openPage(n)
			} else this.openPage(n)
	}
	openPage(e) {
		const {
			url: t,
			type: n,
			delta: o,
			animationType: r,
			animationDuration: i
		} = e;
		"navigateTo" != e.type && "to" != e.type || ov({
			url: t,
			animationType: r,
			animationDuration: i
		}), "redirectTo" != e.type && "redirect" != e.type || rv({
			url: t
		}), "switchTab" != e.type && "tab" != e.type || av({
			url: t
		}), "reLaunch" != e.type && "launch" != e.type || iv({
			url: t
		}), "navigateBack" != e.type && "back" != e.type || tv({
			delta: o
		})
	}
}).route;

function BT(e, t = !0) {
	if ((e = String(e).toLowerCase()) && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)) {
		if (4 === e.length) {
			let t = "#";
			for (let n = 1; n < 4; n += 1) t += e.slice(n, n + 1).concat(e.slice(n, n + 1));
			e = t
		}
		const n = [];
		for (let t = 1; t < 7; t += 2) n.push(parseInt(`0x${e.slice(t,t+2)}`));
		return t ? `rgb(${n[0]},${n[1]},${n[2]})` : n
	}
	if (/^(rgb|RGB)/.test(e)) {
		return e.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",").map((e => Number(e)))
	}
	return e
}

function PT(e) {
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
	if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) return t; {
		const e = t.replace(/#/, "").split("");
		if (6 === e.length) return t;
		if (3 === e.length) {
			let t = "#";
			for (let n = 0; n < e.length; n += 1) t += e[n] + e[n];
			return t
		}
	}
}
const LT = {
	colorGradient: function(e = "rgb(0, 0, 0)", t = "rgb(255, 255, 255)", n = 10) {
		const o = BT(e, !1),
			r = o[0],
			i = o[1],
			s = o[2],
			a = BT(t, !1),
			l = (a[0] - r) / n,
			c = (a[1] - i) / n,
			u = (a[2] - s) / n,
			d = [];
		for (let f = 0; f < n; f++) {
			let o = PT(`rgb(${Math.round(l*f+r)},${Math.round(c*f+i)},${Math.round(u*f+s)})`);
			0 === f && (o = PT(e)), f === n - 1 && (o = PT(t)), d.push(o)
		}
		return d
	},
	hexToRgb: BT,
	rgbToHex: PT,
	colorToRgba: function(e, t) {
		e = PT(e);
		let n = String(e).toLowerCase();
		if (n && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(n)) {
			if (4 === n.length) {
				let e = "#";
				for (let t = 1; t < 4; t += 1) e += n.slice(t, t + 1).concat(n.slice(t, t + 1));
				n = e
			}
			const e = [];
			for (let t = 1; t < 7; t += 2) e.push(parseInt(`0x${n.slice(t,t+2)}`));
			return `rgba(${e.join(",")},${t})`
		}
		return n
	}
};

function OT(e) {
	return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(e)
}

function IT(e) {
	switch (typeof e) {
		case "undefined":
			return !0;
		case "string":
			if (0 == e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length) return !0;
			break;
		case "boolean":
			if (!e) return !0;
			break;
		case "number":
			if (0 === e || isNaN(e)) return !0;
			break;
		case "object":
			if (null === e || 0 === e.length) return !0;
			for (const t in e) return !1;
			return !0
	}
	return !1
}

function MT(e) {
	return "[object Object]" === Object.prototype.toString.call(e)
}

function FT(e) {
	return "function" == typeof e
}
const jT = {
	email: function(e) {
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e)
	},
	mobile: function(e) {
		return /^1[23456789]\d{9}$/.test(e)
	},
	url: function(e) {
		return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/
			.test(e)
	},
	date: function(e) {
		return !!e && (OT(e) && (e = +e), !/Invalid|NaN/.test(new Date(e).toString()))
	},
	dateISO: function(e) {
		return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
	},
	number: OT,
	digits: function(e) {
		return /^\d+$/.test(e)
	},
	idCard: function(e) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e)
	},
	carNo: function(e) {
		const t =
			/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/,
			n = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
		return 7 === e.length ? n.test(e) : 8 === e.length && t.test(e)
	},
	amount: function(e) {
		return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(e)
	},
	chinese: function(e) {
		return /^[\u4e00-\u9fa5]+$/gi.test(e)
	},
	letter: function(e) {
		return /^[a-zA-Z]*$/.test(e)
	},
	enOrNum: function(e) {
		return /^[0-9a-zA-Z]*$/g.test(e)
	},
	contains: function(e, t) {
		return e.indexOf(t) >= 0
	},
	range: function(e, t) {
		return e >= t[0] && e <= t[1]
	},
	rangeLength: function(e, t) {
		return e.length >= t[0] && e.length <= t[1]
	},
	empty: IT,
	isEmpty: IT,
	jsonString: function(e) {
		if ("string" == typeof e) try {
			const t = JSON.parse(e);
			return !("object" != typeof t || !t)
		} catch (t) {
			return !1
		}
		return !1
	},
	landline: function(e) {
		return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(e)
	},
	object: MT,
	array: function(e) {
		return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype
			.toString.call(e)
	},
	code: function(e, t = 6) {
		return new RegExp(`^\\d{${t}}$`).test(e)
	},
	func: FT,
	promise: function(e) {
		return MT(e) && FT(e.then) && FT(e.catch)
	},
	video: function(e) {
		return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i.test(e)
	},
	image: function(e) {
		const t = e.split("?")[0];
		return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i.test(t)
	},
	regExp: function(e) {
		return e && "[object RegExp]" === Object.prototype.toString.call(e)
	},
	string: function(e) {
		return "string" == typeof e
	}
};
let NT, RT = null;

function DT(e, t = 15) {
	return +parseFloat(Number(e).toPrecision(t))
}

function qT(e) {
	const t = e.toString().split(/[eE]/),
		n = (t[0].split(".")[1] || "").length - +(t[1] || 0);
	return n > 0 ? n : 0
}

function zT(e) {
	if (-1 === e.toString().indexOf("e")) return Number(e.toString().replace(".", ""));
	const t = qT(e);
	return t > 0 ? DT(Number(e) * Math.pow(10, t)) : Number(e)
}

function HT(e) {
	(e > Number.MAX_SAFE_INTEGER || e < Number.MIN_SAFE_INTEGER) && console.warn(`${e} 超出了精度限制，结果可能不正确`)
}

function WT(e, t) {
	const [n, o, ...r] = e;
	let i = t(n, o);
	return r.forEach((e => {
		i = t(i, e)
	})), i
}

function VT(...e) {
	if (e.length > 2) return WT(e, VT);
	const [t, n] = e, o = zT(t), r = zT(n), i = qT(t) + qT(n), s = o * r;
	return HT(s), s / Math.pow(10, i)
}

function $T(...e) {
	if (e.length > 2) return WT(e, $T);
	const [t, n] = e, o = zT(t), r = zT(n);
	return HT(o), HT(r), VT(o / r, DT(Math.pow(10, qT(n) - qT(t))))
}

function QT(e) {
	if ([null, void 0, NaN, !1].includes(e)) return e;
	if ("object" != typeof e && "function" != typeof e) return e;
	const t = jT.array(e) ? [] : {};
	for (const n in e) e.hasOwnProperty(n) && (t[n] = "object" == typeof e[n] ? QT(e[n]) : e[n]);
	return t
}

function UT(e = null, t = "yyyy-mm-dd") {
	let n;
	n = e ? /^\d{10}$/.test(e.toString().trim()) ? new Date(1e3 * e) : "string" == typeof e && /^\d+$/.test(e.trim()) ?
		new Date(Number(e)) : new Date("string" == typeof e ? e.replace(/-/g, "/") : e) : new Date;
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

function XT(e, t = "both") {
	return e = String(e), "both" == t ? e.replace(/^\s+|\s+$/g, "") : "left" == t ? e.replace(/^\s*/, "") : "right" ==
		t ? e.replace(/(\s*$)/g, "") : "all" == t ? e.replace(/\s+/g, "") : e
}
String.prototype.padStart || (String.prototype.padStart = function(e, t = " ") {
	if ("[object String]" !== Object.prototype.toString.call(t)) throw new TypeError(
		"fillString must be String");
	const n = this;
	if (n.length >= e) return String(n);
	const o = e - n.length;
	let r = Math.ceil(o / t.length);
	for (; r >>= 1;) t += t, 1 === r && (t += t);
	return t.slice(0, o) + n
});
const YT = {
		range: function(e = 0, t = 0, n = 0) {
			return Math.max(e, Math.min(t, Number(n)))
		},
		getPx: function(e, t = !1) {
			return jT.number(e) ? t ? `${e}px` : Number(e) : /(rpx|upx)$/.test(e) ? t ? `${Rd(parseInt(e))}px` :
				Number(Rd(parseInt(e))) : t ? `${parseInt(e)}px` : parseInt(e)
		},
		sleep: function(e = 30) {
			return new Promise((t => {
				setTimeout((() => {
					t()
				}), e)
			}))
		},
		os: function() {
			return gg().platform.toLowerCase()
		},
		sys: function() {
			return gg()
		},
		random: function(e, t) {
			if (e >= 0 && t > 0 && t >= e) {
				const n = t - e + 1;
				return Math.floor(Math.random() * n + e)
			}
			return 0
		},
		guid: function(e = 32, t = !0, n = null) {
			const o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
				r = [];
			if (n = n || o.length, e)
				for (let i = 0; i < e; i++) r[i] = o[0 | Math.random() * n];
			else {
				let e;
				r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4";
				for (let t = 0; t < 36; t++) r[t] || (e = 0 | 16 * Math.random(), r[t] = o[19 == t ? 3 & e | 8 : e])
			}
			return t ? (r.shift(), `u${r.join("")}`) : r.join("")
		},
		$parent: function(e) {
			let t = this.$parent;
			for (; t;) {
				if (!t.$options || t.$options.name === e) return t;
				t = t.$parent
			}
			return !1
		},
		addStyle: function(e, t = "object") {
			if (jT.empty(e) || "object" == typeof e && "object" === t || "string" === t && "string" == typeof e)
				return e;
			if ("object" === t) {
				const t = (e = XT(e)).split(";"),
					n = {};
				for (let e = 0; e < t.length; e++)
					if (t[e]) {
						const o = t[e].split(":");
						n[XT(o[0])] = XT(o[1])
					} return n
			}
			let n = "";
			for (const o in e) {
				n += `${o.replace(/([A-Z])/g,"-$1").toLowerCase()}:${e[o]};`
			}
			return XT(n)
		},
		addUnit: function(e = "auto", t = "") {
			return t || (t = uni.$u.config.unit || "px"), e = String(e), jT.number(e) ? `${e}${t}` : e
		},
		deepClone: QT,
		deepMerge: function e(t = {}, n = {}) {
			if ("object" != typeof(t = QT(t)) || "object" != typeof n) return !1;
			for (const o in n) n.hasOwnProperty(o) && (o in t ? "object" != typeof t[o] || "object" != typeof n[o] ?
				t[o] = n[o] : t[o].concat && n[o].concat ? t[o] = t[o].concat(n[o]) : t[o] = e(t[o], n[o]) : t[
					o] = n[o]);
			return t
		},
		error: function(e) {},
		randomArray: function(e = []) {
			return e.sort((() => Math.random() - .5))
		},
		timeFormat: UT,
		timeFrom: function(e = null, t = "yyyy-mm-dd") {
			null == e && (e = Number(new Date)), 10 == (e = parseInt(e)).toString().length && (e *= 1e3);
			let n = (new Date).getTime() - e;
			n = parseInt(n / 1e3);
			let o = "";
			switch (!0) {
				case n < 300:
					o = "刚刚";
					break;
				case n >= 300 && n < 3600:
					o = `${parseInt(n/60)}分钟前`;
					break;
				case n >= 3600 && n < 86400:
					o = `${parseInt(n/3600)}小时前`;
					break;
				case n >= 86400 && n < 2592e3:
					o = `${parseInt(n/86400)}天前`;
					break;
				default:
					o = !1 === t ? n >= 2592e3 && n < 31536e3 ? `${parseInt(n/2592e3)}个月前` :
						`${parseInt(n/31536e3)}年前` : UT(e, t)
			}
			return o
		},
		trim: XT,
		queryParams: function(e = {}, t = !0, n = "brackets") {
			const o = t ? "?" : "",
				r = []; - 1 == ["indices", "brackets", "repeat", "comma"].indexOf(n) && (n = "brackets");
			for (const i in e) {
				const t = e[i];
				if (!(["", void 0, null].indexOf(t) >= 0))
					if (t.constructor === Array) switch (n) {
						case "indices":
							for (let n = 0; n < t.length; n++) r.push(`${i}[${n}]=${t[n]}`);
							break;
						case "brackets":
						default:
							t.forEach((e => {
								r.push(`${i}[]=${e}`)
							}));
							break;
						case "repeat":
							t.forEach((e => {
								r.push(`${i}=${e}`)
							}));
							break;
						case "comma":
							let e = "";
							t.forEach((t => {
								e += (e ? "," : "") + t
							})), r.push(`${i}=${e}`)
					} else r.push(`${i}=${t}`)
			}
			return r.length ? o + r.join("&") : ""
		},
		toast: function(e, t = 2e3) {
			_v({
				title: String(e),
				icon: "none",
				duration: t
			})
		},
		type2icon: function(e = "success", t = !1) {
			-1 == ["primary", "info", "error", "warning", "success"].indexOf(e) && (e = "success");
			let n = "";
			switch (e) {
				case "primary":
				case "info":
					n = "info-circle";
					break;
				case "error":
					n = "close-circle";
					break;
				case "warning":
					n = "error-circle";
					break;
				default:
					n = "checkmark-circle"
			}
			return t && (n += "-fill"), n
		},
		priceFormat: function(e, t = 0, n = ".", o = ",") {
			e = `${e}`.replace(/[^0-9+-Ee.]/g, "");
			const r = isFinite(+e) ? +e : 0,
				i = isFinite(+t) ? Math.abs(t) : 0,
				s = void 0 === o ? "," : o,
				a = void 0 === n ? "." : n;
			let l = "";
			l = (i ? function(e, t) {
				const n = Math.pow(10, t);
				let o = $T(Math.round(Math.abs(VT(e, n))), n);
				return e < 0 && 0 !== o && (o = VT(o, -1)), o
			}(r, i) + "" : `${Math.round(r)}`).split(".");
			const c = /(-?\d+)(\d{3})/;
			for (; c.test(l[0]);) l[0] = l[0].replace(c, `$1${s}$2`);
			return (l[1] || "").length < i && (l[1] = l[1] || "", l[1] += new Array(i - l[1].length + 1).join("0")),
				l.join(a)
		},
		getDuration: function(e, t = !0) {
			const n = parseInt(e);
			return t ? /s$/.test(e) ? e : e > 30 ? `${e}ms` : `${e}s` : /ms$/.test(e) ? n : /s$/.test(e) ? n > 30 ?
				n : 1e3 * n : n
		},
		padZero: function(e) {
			return `00${e}`.slice(-2)
		},
		formValidate: function(e, t) {
			const n = uni.$u.$parent.call(e, "u-form-item"),
				o = uni.$u.$parent.call(e, "u-form");
			n && o && o.validateField(n.prop, (() => {}), t)
		},
		getProperty: function(e, t) {
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
		},
		setProperty: function(e, t, n) {
			if (!e) return;
			const o = function(e, t, n) {
				if (1 !== t.length)
					for (; t.length > 1;) {
						const r = t[0];
						e[r] && "object" == typeof e[r] || (e[r] = {}), t.shift(), o(e[r], t, n)
					} else e[t[0]] = n
			};
			if ("string" != typeof t || "" === t);
			else if (-1 !== t.indexOf(".")) {
				const r = t.split(".");
				o(e, r, n)
			} else e[t] = n
		},
		page: function() {
			const e = vm();
			return `/${e[e.length-1].route||""}`
		},
		pages: function() {
			return vm()
		},
		setConfig: function({
			props: e = {},
			config: t = {},
			color: n = {},
			zIndex: o = {}
		}) {
			const {
				deepMerge: r
			} = uni.$u;
			uni.$u.config = r(uni.$u.config, t), uni.$u.props = r(uni.$u.props, e), uni.$u.color = r(uni.$u.color,
				n), uni.$u.zIndex = r(uni.$u.zIndex, o)
		}
	},
	JT = {
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
	},
	GT = {
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
	},
	KT = {
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
	},
	{
		color: ZT
	} = JT,
	eS = {
		icon: {
			name: "",
			color: ZT["u-content-color"],
			size: "16px",
			bold: !1,
			index: "",
			hoverClass: "",
			customPrefix: "uicon",
			label: "",
			labelPos: "right",
			labelSize: "15px",
			labelColor: ZT["u-content-color"],
			space: "3px",
			imgMode: "",
			width: "",
			height: "",
			top: 0,
			stop: !1
		}
	},
	{
		color: tS
	} = JT,
	nS = {
		link: {
			color: tS["u-primary"],
			fontSize: 15,
			underLine: !1,
			href: "",
			mpTips: "链接已复制，请在浏览器打开",
			lineColor: "",
			text: ""
		}
	},
	{
		color: oS
	} = JT,
	rS = {
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
	},
	iS = {
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
			iconStyle: () => ({
				color: "#909399",
				fontSize: "19px"
			})
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
		},
		...GT,
		carKeyboard: {
			random: !1
		},
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
		cellGroup: {
			title: "",
			border: !0,
			customStyle: {}
		},
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
		circleProgress: {
			percentage: 30
		},
		code: {
			seconds: 60,
			startText: "获取验证码",
			changeText: "X秒重新获取",
			endText: "重新获取",
			keepRunning: !1,
			uniqueKey: ""
		},
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
		col: {
			span: 12,
			offset: 0,
			justify: "start",
			align: "stretch",
			textAlign: "left"
		},
		collapse: {
			value: null,
			accordion: !1,
			border: !0
		},
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
		countDown: {
			time: 0,
			format: "HH:mm:ss",
			autoStart: !0,
			millisecond: !1
		},
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
		},
		...KT,
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
		gap: {
			bgColor: "transparent",
			height: 20,
			marginTop: 0,
			marginBottom: 0,
			customStyle: {}
		},
		grid: {
			col: 3,
			border: !1,
			align: "left"
		},
		gridItem: {
			name: null,
			bgColor: "transparent"
		},
		...eS,
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
		indexAnchor: {
			text: "",
			color: "#606266",
			size: 14,
			bgColor: "#dedede",
			height: 32
		},
		indexList: {
			inactiveColor: "#606266",
			activeColor: "#5677fc",
			indexList: () => [],
			sticky: !0,
			customNavHeight: 0
		},
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
		line: {
			color: "#d6d7d9",
			length: "100%",
			direction: "row",
			hairline: !0,
			margin: 0,
			dashed: !1
		},
		lineProgress: {
			activeColor: "#19be6b",
			inactiveColor: "#ececec",
			percentage: 0,
			showText: !0,
			height: 12
		},
		...nS,
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
		listItem: {
			anchor: ""
		},
		...{
			loadingIcon: {
				show: !0,
				color: oS["u-tips-color"],
				textColor: oS["u-tips-color"],
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
		},
		...{
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
				leftIconColor: rS.mainColor,
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
		},
		...{
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
		numberKeyboard: {
			mode: "number",
			dotDisabled: !1,
			random: !1
		},
		overlay: {
			show: !1,
			zIndex: 10070,
			duration: 300,
			opacity: .5
		},
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
			overlayStyle: () => {},
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
		row: {
			gutter: 0,
			justify: "start",
			align: "center"
		},
		rowNotice: {
			text: "",
			icon: "volume",
			mode: "",
			color: "#f9ae3d",
			bgColor: "#fdf6ec",
			fontSize: 14,
			speed: 80
		},
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
			blockStyle: () => {}
		},
		statusBar: {
			bgColor: "transparent"
		},
		steps: {
			direction: "row",
			current: 0,
			activeColor: "#3c9cff",
			inactiveColor: "#969799",
			activeIcon: "",
			inactiveIcon: "",
			dot: !1
		},
		stepsItem: {
			title: "",
			desc: "",
			iconSize: 17,
			error: !1
		},
		sticky: {
			offsetTop: 0,
			customNavHeight: 0,
			disabled: !1,
			bgColor: "transparent",
			zIndex: "",
			index: ""
		},
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
		swipeAction: {
			autoClose: !0
		},
		swipeActionItem: {
			show: !1,
			name: "",
			disabled: !1,
			threshold: 20,
			autoClose: !0,
			options: [],
			duration: 300
		},
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
		tabbarItem: {
			name: null,
			icon: "",
			badge: null,
			dot: !1,
			text: "",
			badgeStyle: "top: 6px;right:2px;"
		},
		tabs: {
			duration: 300,
			list: () => [],
			lineColor: "#3c9cff",
			activeStyle: () => ({
				color: "#303133"
			}),
			inactiveStyle: () => ({
				color: "#606266"
			}),
			lineWidth: 20,
			lineHeight: 3,
			lineBgSize: "cover",
			itemStyle: () => ({
				height: "44px"
			}),
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
			iconStyle: () => ({
				fontSize: "15px"
			}),
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
			params: () => {},
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
		transition: {
			show: !1,
			mode: "fade",
			duration: "300",
			timingFunction: "ease-out"
		},
		...{
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
let sS = "none";
sS = "vue3", sS = "h5";
const aS = {
	route: CT,
	date: YT.timeFormat,
	colorGradient: LT.colorGradient,
	hexToRgb: LT.hexToRgb,
	rgbToHex: LT.rgbToHex,
	colorToRgba: LT.colorToRgba,
	test: jT,
	type: ["primary", "success", "error", "warning", "info"],
	http: new class {
		constructor(e = {}) {
			var t;
			t = e, "[object Object]" !== Object.prototype.toString.call(t) && (e = {}, console.warn(
				"设置全局参数必须接收一个Object")), this.config = AT({
				...kT,
				...e
			}), this.interceptors = {
				request: new ST,
				response: new ST
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
					custom: {
						...e.custom || {},
						...t.custom || {}
					},
					header: bT(e.header || {}, t.header || {})
				};
				if (o = {
						...o,
						...ET(["getTask", "validateStatus"], e, t)
					}, "DOWNLOAD" === n) yT(t.timeout) ? yT(e.timeout) || (o.timeout = e.timeout) :
					o.timeout = t.timeout;
				else if ("UPLOAD" === n) delete o.header["content-type"], delete o.header[
					"Content-Type"], ["files", "file", "filePath", "name", "timeout",
					"formData"].forEach((e => {
					yT(t[e]) || (o[e] = t[e])
				})), yT(o.timeout) && !yT(e.timeout) && (o.timeout = e.timeout);
				else {
					const n = ["data", "timeout", "dataType", "responseType", "withCredentials"];
					o = {
						...o,
						...ET(n, e, t)
					}
				}
				return o
			})(this.config, e);
			const t = [TT, void 0];
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
			return this.middleware({
				url: e,
				method: "GET",
				...t
			})
		}
		post(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "POST",
				...n
			})
		}
		put(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "PUT",
				...n
			})
		}
		delete(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "DELETE",
				...n
			})
		}
		connect(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "CONNECT",
				...n
			})
		}
		head(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "HEAD",
				...n
			})
		}
		options(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "OPTIONS",
				...n
			})
		}
		trace(e, t, n = {}) {
			return this.middleware({
				url: e,
				data: t,
				method: "TRACE",
				...n
			})
		}
		upload(e, t = {}) {
			return t.url = e, t.method = "UPLOAD", this.middleware(t)
		}
		download(e, t = {}) {
			return t.url = e, t.method = "DOWNLOAD", this.middleware(t)
		}
	},
	config: JT,
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
	debounce: function(e, t = 500, n = !1) {
		if (null !== RT && clearTimeout(RT), n) {
			const n = !RT;
			RT = setTimeout((() => {
				RT = null
			}), t), n && "function" == typeof e && e()
		} else RT = setTimeout((() => {
			"function" == typeof e && e()
		}), t)
	},
	throttle: function(e, t = 500, n = !0) {
		n ? NT || (NT = !0, "function" == typeof e && e(), setTimeout((() => {
			NT = !1
		}), t)) : NT || (NT = !0, setTimeout((() => {
			NT = !1, "function" == typeof e && e()
		}), t))
	},
	mixin: pT,
	mpMixin: hT,
	props: iS,
	...YT,
	color: rS,
	platform: "h5"
};
uni.$u = aS;
const lS = {
	install: e => {
		e.config.globalProperties.$u = aS, e.config.globalProperties.$nextTick = e => {
			e()
		}, e.mixin(pT)
	}
};
(function() {
	const e = zs(fT);
	return e.use(Kw()), e.use(Hw), e.use(lS), {
		app: e,
		Pinia: dx
	}
})().app.use(Im).mount("#app");
export {
	jx as $, Ci as A, p as B, Bi as C, u as D, js as E, zh as F, zw as G, sr as H, Vp as I, Bn as J, bi as K, Tr as L,
	li as M, hy as N, py as O, zx as P, eT as Q, qx as R, Mh as S, wg as T, wx as U, Rx as V, lT as W, aT as X, Ix as Y,
	Mx as Z, Fx as _, gn as a, hx as a$, Ep as a0, tT as a1, Tg as a2, yg as a3, nT as a4, Kx as a5, _v as a6, sf as a7,
	Ud as a8, $g as a9, oT as aA, yx as aB, _x as aC, mx as aD, gx as aE, Ox as aF, Ax as aG, Cx as aH, $x as aI,
	Hx as aJ, Rh as aK, jh as aL, vg as aM, Ux as aN, Zx as aO, Zn as aP, px as aQ, Cg as aR, Ug as aS, Pg as aT,
	Ah as aU, yh as aV, vx as aW, rT as aX, Gx as aY, og as aZ, Mu as a_, ov as aa, av as ab, br as ac, Zm as ad,
	Oh as ae, gg as af, hf as ag, Ev as ah, Vx as ai, Wx as aj, sT as ak, gy as al, my as am, Yx as an, Eo as ao,
	tv as ap, xx as aq, Jx as ar, Ex as as, Sx as at, Tx as au, Ei as av, bg as aw, Hd as ax, Vd as ay, bx as az,
	cy as b, kx as b0, kv as b1, Av as b2, Rd as b3, Wd as b4, Px as b5, Bx as b6, Lx as b7, Vw as b8, qw as b9,
	mf as ba, vm as bb, ng as bc, Ui as c, Do as d, hi as e, yi as f, iT as g, ki as h, mr as i, Mn as j, ay as k,
	_r as l, Hh as m, i as n, fy as o, Xx as p, iS as q, Pn as r, Sv as s, hT as t, fx as u, Ns as v, mo as w, pT as x,
	Sg as y, Sr as z
};