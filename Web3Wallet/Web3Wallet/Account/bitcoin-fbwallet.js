/*! For license information please see bitcoin-fbwallet.js.LICENSE.txt */ ! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.BitcoinLibs = t() : e.BitcoinLibs = t()
}(this, (() => (() => {
    var e = {
            6273: (e, t, r) => {
                "use strict";
                var o = r(4533),
                    n = r(3146),
                    i = r(6977);

                function a(e) {
                    var t = Object.create(null);
                    return e && Object.keys(e).forEach((function(r) {
                        if ("default" !== r) {
                            var o = Object.getOwnPropertyDescriptor(e, r);
                            Object.defineProperty(t, r, o.get ? o : {
                                enumerable: !0,
                                get: function() {
                                    return e[r]
                                }
                            })
                        }
                    })), t.default = e, Object.freeze(t)
                }
                var s = a(n),
                    u = a(i);
                const c = o.secp256k1.ProjectivePoint,
                    l = "Expected Private",
                    f = "Expected Point",
                    d = "Expected Tweak",
                    h = "Expected Signature",
                    p = "Expected Extra Data (32 bytes)",
                    b = "Expected Scalar",
                    g = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 186, 174, 220, 230, 175, 72, 160, 59, 191, 210, 94, 140, 208, 54, 65, 65]),
                    m = new Uint8Array(32),
                    y = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 69, 81, 35, 25, 80, 183, 95, 196, 64, 45, 161, 114, 47, 201, 186, 238]),
                    v = BigInt(1);

                function w(e, t) {
                    for (let r = 0; r < 32; ++r)
                        if (e[r] !== t[r]) return e[r] < t[r] ? -1 : 1;
                    return 0
                }

                function k(e) {
                    return 0 === w(e, m)
                }

                function E(e) {
                    return e instanceof Uint8Array && 32 === e.length && !(w(e, g) >= 0)
                }

                function _(e) {
                    return e instanceof Uint8Array && 64 === e.length && w(e.subarray(0, 32), g) < 0 && w(e.subarray(32, 64), g) < 0
                }

                function S(e) {
                    return e instanceof Uint8Array && 32 === e.length
                }

                function T(e) {
                    return void 0 === e || e instanceof Uint8Array && 32 === e.length
                }

                function x(e) {
                    let t;
                    if ("bigint" == typeof e) t = e;
                    else if ("number" == typeof e && Number.isSafeInteger(e) && e >= 0) t = BigInt(e);
                    else if ("string" == typeof e) {
                        if (64 !== e.length) throw new Error("Expected 32 bytes of private scalar");
                        t = u.hexToNumber(e)
                    } else {
                        if (!(e instanceof Uint8Array)) throw new TypeError("Expected valid private scalar");
                        if (32 !== e.length) throw new Error("Expected 32 bytes of private scalar");
                        t = u.bytesToNumberBE(e)
                    }
                    if (t < 0) throw new Error("Expected private scalar >= 0");
                    return t
                }

                function I(e) {
                    return o.secp256k1.utils.normPrivateKeyToScalar(e)
                }

                function B(e, t, r) {
                    const o = z(e),
                        n = x(t),
                        i = c.BASE.multiplyAndAddUnsafe(o, n, v);
                    if (!i) throw new Error("Tweaked point at infinity");
                    return i.toRawBytes(r)
                }

                function A(e, t) {
                    return void 0 === e ? void 0 === t || L(t) : !!e
                }

                function O(e) {
                    try {
                        return e()
                    } catch (e) {
                        return null
                    }
                }

                function P(e) {
                    return o.schnorr.utils.lift_x(u.bytesToNumberBE(e))
                }

                function z(e) {
                    return 32 === e.length ? P(e) : c.fromHex(e)
                }

                function j(e, t) {
                    if (32 === e.length !== t) return !1;
                    try {
                        return t ? !!P(e) : !!c.fromHex(e)
                    } catch (e) {
                        return !1
                    }
                }

                function U(e) {
                    return j(e, !1)
                }

                function L(e) {
                    return j(e, !1) && 33 === e.length
                }

                function N(e) {
                    return o.secp256k1.utils.isValidPrivateKey(e)
                }

                function R(e) {
                    return j(e, !0)
                }

                function H(e) {
                    if (!U(e)) throw new Error(f);
                    return e.slice(1, 33)
                }

                function C(e, t) {
                    if (!N(e)) throw new Error(l);
                    return O((() => o.secp256k1.getPublicKey(e, A(t))))
                }
                t.isPoint = U, t.isPointCompressed = L, t.isPrivate = N, t.isXOnlyPoint = R, t.pointAdd = function(e, t, r) {
                    if (!U(e) || !U(t)) throw new Error(f);
                    return O((() => {
                        const o = z(e),
                            n = z(t);
                        return o.equals(n.negate()) ? null : o.add(n).toRawBytes(A(r, e))
                    }))
                }, t.pointAddScalar = function(e, t, r) {
                    if (!U(e)) throw new Error(f);
                    if (!E(t)) throw new Error(d);
                    return O((() => B(e, t, A(r, e))))
                }, t.pointCompress = function(e, t) {
                    if (!U(e)) throw new Error(f);
                    return z(e).toRawBytes(A(t, e))
                }, t.pointFromScalar = C, t.pointMultiply = function(e, t, r) {
                    if (!U(e)) throw new Error(f);
                    if (!E(t)) throw new Error(d);
                    return O((() => function(e, t, r) {
                        const o = z(e),
                            n = "string" == typeof t ? t : u.bytesToHex(t),
                            i = u.hexToNumber(n);
                        return o.multiply(i).toRawBytes(r)
                    }(e, t, A(r, e))))
                }, t.privateAdd = function(e, t) {
                    if (!N(e)) throw new Error(l);
                    if (!E(t)) throw new Error(d);
                    return O((() => function(e, t) {
                        const r = I(e),
                            n = x(t),
                            i = u.numberToBytesBE(s.mod(r + n, o.secp256k1.CURVE.n), 32);
                        return o.secp256k1.utils.isValidPrivateKey(i) ? i : null
                    }(e, t)))
                }, t.privateNegate = function(e) {
                    if (!N(e)) throw new Error(l);
                    return function(e) {
                        const t = I(e),
                            r = u.numberToBytesBE(o.secp256k1.CURVE.n - t, 32);
                        return o.secp256k1.utils.isValidPrivateKey(r) ? r : null
                    }(e)
                }, t.privateSub = function(e, t) {
                    if (!N(e)) throw new Error(l);
                    if (!E(t)) throw new Error(d);
                    return O((() => function(e, t) {
                        const r = I(e),
                            n = x(t),
                            i = u.numberToBytesBE(s.mod(r - n, o.secp256k1.CURVE.n), 32);
                        return o.secp256k1.utils.isValidPrivateKey(i) ? i : null
                    }(e, t)))
                }, t.recover = function(e, t, r, n) {
                    if (!S(e)) throw new Error("Expected Hash");
                    if (!_(t) || ! function(e) {
                            return !(k(e.subarray(0, 32)) || k(e.subarray(32, 64)))
                        }(t)) throw new Error(h);
                    if (2 & r && ! function(e) {
                            return e instanceof Uint8Array && 64 === e.length && w(e.subarray(0, 32), y) < 0
                        }(t)) throw new Error("Bad Recovery Id");
                    if (!R(t.subarray(0, 32))) throw new Error(h);
                    const i = o.secp256k1.Signature.fromCompact(t).addRecoveryBit(r).recoverPublicKey(e);
                    if (!i) throw new Error(h);
                    return i.toRawBytes(A(n))
                }, t.sign = function(e, t, r) {
                    if (!N(t)) throw new Error(l);
                    if (!S(e)) throw new Error(b);
                    if (!T(r)) throw new Error(p);
                    return o.secp256k1.sign(e, t, {
                        extraEntropy: r
                    }).toCompactRawBytes()
                }, t.signRecoverable = function(e, t, r) {
                    if (!N(t)) throw new Error(l);
                    if (!S(e)) throw new Error(b);
                    if (!T(r)) throw new Error(p);
                    const n = o.secp256k1.sign(e, t, {
                        extraEntropy: r
                    });
                    return {
                        signature: n.toCompactRawBytes(),
                        recoveryId: n.recovery
                    }
                }, t.signSchnorr = function(e, t, r) {
                    if (!N(t)) throw new Error(l);
                    if (!S(e)) throw new Error(b);
                    if (!T(r)) throw new Error(p);
                    return o.schnorr.sign(e, t, r)
                }, t.verify = function(e, t, r, n) {
                    if (!U(t)) throw new Error(f);
                    if (!_(r)) throw new Error(h);
                    if (!S(e)) throw new Error(b);
                    return o.secp256k1.verify(r, e, t, {
                        lowS: n
                    })
                }, t.verifySchnorr = function(e, t, r) {
                    if (!R(t)) throw new Error(f);
                    if (!_(r)) throw new Error(h);
                    if (!S(e)) throw new Error(b);
                    return o.schnorr.verify(r, e, t)
                }, t.xOnlyPointAddTweak = function(e, t) {
                    if (!R(e)) throw new Error(f);
                    if (!E(t)) throw new Error(d);
                    return O((() => {
                        const r = B(e, t, !0);
                        return {
                            parity: r[0] % 2 == 1 ? 1 : 0,
                            xOnlyPubkey: r.slice(1)
                        }
                    }))
                }, t.xOnlyPointFromPoint = H, t.xOnlyPointFromScalar = function(e) {
                    if (!N(e)) throw new Error(l);
                    return H(C(e))
                }
            },
            4169: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getHash = a, t.createCurve = function(e, t) {
                    const r = t => (0, i.weierstrass)({
                        ...e,
                        ...a(t)
                    });
                    return Object.freeze({
                        ...r(t),
                        create: r
                    })
                };
                const o = r(9737),
                    n = r(4981),
                    i = r(8192);

                function a(e) {
                    return {
                        hash: e,
                        hmac: (t, ...r) => (0, o.hmac)(e, t, (0, n.concatBytes)(...r)),
                        randomBytes: n.randomBytes
                    }
                }
            },
            4291: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.wNAF = function(e, t) {
                    return {
                        constTimeNegate: s,
                        hasPrecomputes: e => 1 !== p(e),
                        unsafeLadder(t, r, o = e.ZERO) {
                            let n = t;
                            for (; r > i;) r & a && (o = o.add(n)), n = n.double(), r >>= a;
                            return o
                        },
                        precomputeWindow(e, r) {
                            const {
                                windows: o,
                                windowSize: n
                            } = c(r, t), i = [];
                            let a = e,
                                s = a;
                            for (let e = 0; e < o; e++) {
                                s = a, i.push(s);
                                for (let e = 1; e < n; e++) s = s.add(a), i.push(s);
                                a = s.double()
                            }
                            return i
                        },
                        wNAF(r, o, n) {
                            const {
                                windows: i,
                                windowSize: u
                            } = c(r, t);
                            let l = e.ZERO,
                                f = e.BASE;
                            const d = BigInt(2 ** r - 1),
                                h = 2 ** r,
                                p = BigInt(r);
                            for (let e = 0; e < i; e++) {
                                const t = e * u;
                                let r = Number(n & d);
                                n >>= p, r > u && (r -= h, n += a);
                                const i = t,
                                    c = t + Math.abs(r) - 1,
                                    b = e % 2 != 0,
                                    g = r < 0;
                                0 === r ? f = f.add(s(b, o[i])) : l = l.add(s(g, o[c]))
                            }
                            return {
                                p: l,
                                f
                            }
                        },
                        wNAFUnsafe(r, o, n, s = e.ZERO) {
                            const {
                                windows: u,
                                windowSize: l
                            } = c(r, t), f = BigInt(2 ** r - 1), d = 2 ** r, h = BigInt(r);
                            for (let e = 0; e < u; e++) {
                                const t = e * l;
                                if (n === i) break;
                                let r = Number(n & f);
                                if (n >>= h, r > l && (r -= d, n += a), 0 === r) continue;
                                let u = o[t + Math.abs(r) - 1];
                                r < 0 && (u = u.negate()), s = s.add(u)
                            }
                            return s
                        },
                        getPrecomputes(e, t, r) {
                            let o = d.get(t);
                            return o || (o = this.precomputeWindow(t, e), 1 !== e && d.set(t, r(o))), o
                        },
                        wNAFCached(e, t, r) {
                            const o = p(e);
                            return this.wNAF(o, this.getPrecomputes(o, e, r), t)
                        },
                        wNAFCachedUnsafe(e, t, r, o) {
                            const n = p(e);
                            return 1 === n ? this.unsafeLadder(e, t, o) : this.wNAFUnsafe(n, this.getPrecomputes(n, e, r), t, o)
                        },
                        setWindowSize(e, r) {
                            u(r, t), h.set(e, r), d.delete(e)
                        }
                    }
                }, t.pippenger = function(e, t, r, o) {
                    if (l(r, e), f(o, t), r.length !== o.length) throw new Error("arrays of points and scalars must have equal length");
                    const i = e.ZERO,
                        a = (0, n.bitLen)(BigInt(r.length)),
                        s = a > 12 ? a - 3 : a > 4 ? a - 2 : a ? 2 : 1,
                        u = (1 << s) - 1,
                        c = new Array(u + 1).fill(i);
                    let d = i;
                    for (let e = Math.floor((t.BITS - 1) / s) * s; e >= 0; e -= s) {
                        c.fill(i);
                        for (let t = 0; t < o.length; t++) {
                            const n = o[t],
                                i = Number(n >> BigInt(e) & BigInt(u));
                            c[i] = c[i].add(r[t])
                        }
                        let t = i;
                        for (let e = c.length - 1, r = i; e > 0; e--) r = r.add(c[e]), t = t.add(r);
                        if (d = d.add(t), 0 !== e)
                            for (let e = 0; e < s; e++) d = d.double()
                    }
                    return d
                }, t.precomputeMSMUnsafe = function(e, t, r, o) {
                    u(o, t.BITS), l(r, e);
                    const n = e.ZERO,
                        i = 2 ** o - 1,
                        a = Math.ceil(t.BITS / o),
                        s = BigInt((1 << o) - 1),
                        c = r.map((e => {
                            const t = [];
                            for (let r = 0, o = e; r < i; r++) t.push(o), o = o.add(e);
                            return t
                        }));
                    return e => {
                        if (f(e, t), e.length > r.length) throw new Error("array of scalars must be smaller than array of points");
                        let i = n;
                        for (let t = 0; t < a; t++) {
                            if (i !== n)
                                for (let e = 0; e < o; e++) i = i.double();
                            const r = BigInt(a * o - (t + 1) * o);
                            for (let t = 0; t < e.length; t++) {
                                const o = e[t],
                                    n = Number(o >> r & s);
                                n && (i = i.add(c[t][n - 1]))
                            }
                        }
                        return i
                    }
                }, t.validateBasic = function(e) {
                    return (0, o.validateField)(e.Fp), (0, n.validateObject)(e, {
                        n: "bigint",
                        h: "bigint",
                        Gx: "field",
                        Gy: "field"
                    }, {
                        nBitLength: "isSafeInteger",
                        nByteLength: "isSafeInteger"
                    }), Object.freeze({
                        ...(0, o.nLength)(e.n, e.nBitLength),
                        ...e,
                        p: e.Fp.ORDER
                    })
                };
                const o = r(3146),
                    n = r(6977),
                    i = BigInt(0),
                    a = BigInt(1);

                function s(e, t) {
                    const r = t.negate();
                    return e ? r : t
                }

                function u(e, t) {
                    if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw new Error("invalid window size, expected [1.." + t + "], got W=" + e)
                }

                function c(e, t) {
                    return u(e, t), {
                        windows: Math.ceil(t / e) + 1,
                        windowSize: 2 ** (e - 1)
                    }
                }

                function l(e, t) {
                    if (!Array.isArray(e)) throw new Error("array expected");
                    e.forEach(((e, r) => {
                        if (!(e instanceof t)) throw new Error("invalid point at index " + r)
                    }))
                }

                function f(e, t) {
                    if (!Array.isArray(e)) throw new Error("array of scalars expected");
                    e.forEach(((e, r) => {
                        if (!t.isValid(e)) throw new Error("invalid scalar at index " + r)
                    }))
                }
                const d = new WeakMap,
                    h = new WeakMap;

                function p(e) {
                    return h.get(e) || 1
                }
            },
            88: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.expand_message_xmd = c, t.expand_message_xof = l, t.hash_to_field = f, t.isogenyMap = function(e, t) {
                    const r = t.map((e => Array.from(e).reverse()));
                    return (t, o) => {
                        const [n, i, a, s] = r.map((r => r.reduce(((r, o) => e.add(e.mul(r, t), o)))));
                        return t = e.div(n, i), o = e.mul(o, e.div(a, s)), {
                            x: t,
                            y: o
                        }
                    }
                }, t.createHasher = function(e, t, r) {
                    if ("function" != typeof t) throw new Error("mapToCurve() must be defined");
                    return {
                        hashToCurve(o, n) {
                            const i = f(o, 2, {
                                    ...r,
                                    DST: r.DST,
                                    ...n
                                }),
                                a = e.fromAffine(t(i[0])),
                                s = e.fromAffine(t(i[1])),
                                u = a.add(s).clearCofactor();
                            return u.assertValidity(), u
                        },
                        encodeToCurve(o, n) {
                            const i = f(o, 1, {
                                    ...r,
                                    DST: r.encodeDST,
                                    ...n
                                }),
                                a = e.fromAffine(t(i[0])).clearCofactor();
                            return a.assertValidity(), a
                        },
                        mapToCurve(r) {
                            if (!Array.isArray(r)) throw new Error("mapToCurve: expected array of bigints");
                            for (const e of r)
                                if ("bigint" != typeof e) throw new Error("mapToCurve: expected array of bigints");
                            const o = e.fromAffine(t(r)).clearCofactor();
                            return o.assertValidity(), o
                        }
                    }
                };
                const o = r(3146),
                    n = r(6977),
                    i = n.bytesToNumberBE;

                function a(e, t) {
                    if (u(e), u(t), e < 0 || e >= 1 << 8 * t) throw new Error("invalid I2OSP input: " + e);
                    const r = Array.from({
                        length: t
                    }).fill(0);
                    for (let o = t - 1; o >= 0; o--) r[o] = 255 & e, e >>>= 8;
                    return new Uint8Array(r)
                }

                function s(e, t) {
                    const r = new Uint8Array(e.length);
                    for (let o = 0; o < e.length; o++) r[o] = e[o] ^ t[o];
                    return r
                }

                function u(e) {
                    if (!Number.isSafeInteger(e)) throw new Error("number expected")
                }

                function c(e, t, r, o) {
                    (0, n.abytes)(e), (0, n.abytes)(t), u(r), t.length > 255 && (t = o((0, n.concatBytes)((0, n.utf8ToBytes)("H2C-OVERSIZE-DST-"), t)));
                    const {
                        outputLen: i,
                        blockLen: c
                    } = o, l = Math.ceil(r / i);
                    if (r > 65535 || l > 255) throw new Error("expand_message_xmd: invalid lenInBytes");
                    const f = (0, n.concatBytes)(t, a(t.length, 1)),
                        d = a(0, c),
                        h = a(r, 2),
                        p = new Array(l),
                        b = o((0, n.concatBytes)(d, e, h, a(0, 1), f));
                    p[0] = o((0, n.concatBytes)(b, a(1, 1), f));
                    for (let e = 1; e <= l; e++) {
                        const t = [s(b, p[e - 1]), a(e + 1, 1), f];
                        p[e] = o((0, n.concatBytes)(...t))
                    }
                    return (0, n.concatBytes)(...p).slice(0, r)
                }

                function l(e, t, r, o, i) {
                    if ((0, n.abytes)(e), (0, n.abytes)(t), u(r), t.length > 255) {
                        const e = Math.ceil(2 * o / 8);
                        t = i.create({
                            dkLen: e
                        }).update((0, n.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(t).digest()
                    }
                    if (r > 65535 || t.length > 255) throw new Error("expand_message_xof: invalid lenInBytes");
                    return i.create({
                        dkLen: r
                    }).update(e).update(a(r, 2)).update(t).update(a(t.length, 1)).digest()
                }

                function f(e, t, r) {
                    (0, n.validateObject)(r, {
                        DST: "stringOrUint8Array",
                        p: "bigint",
                        m: "isSafeInteger",
                        k: "isSafeInteger",
                        hash: "hash"
                    });
                    const {
                        p: a,
                        k: s,
                        m: f,
                        hash: d,
                        expand: h,
                        DST: p
                    } = r;
                    (0, n.abytes)(e), u(t);
                    const b = "string" == typeof p ? (0, n.utf8ToBytes)(p) : p,
                        g = a.toString(2).length,
                        m = Math.ceil((g + s) / 8),
                        y = t * f * m;
                    let v;
                    if ("xmd" === h) v = c(e, b, y, d);
                    else if ("xof" === h) v = l(e, b, y, s, d);
                    else {
                        if ("_internal_pass" !== h) throw new Error('expand must be "xmd" or "xof"');
                        v = e
                    }
                    const w = new Array(t);
                    for (let e = 0; e < t; e++) {
                        const t = new Array(f);
                        for (let r = 0; r < f; r++) {
                            const n = m * (r + e * f),
                                s = v.subarray(n, n + m);
                            t[r] = (0, o.mod)(i(s), a)
                        }
                        w[e] = t
                    }
                    return w
                }
            },
            3146: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.isNegativeLE = void 0, t.mod = f, t.pow = d, t.pow2 = function(e, t, r) {
                    let o = e;
                    for (; t-- > n;) o *= o, o %= r;
                    return o
                }, t.invert = h, t.tonelliShanks = p, t.FpSqrt = b, t.validateField = function(e) {
                    const t = g.reduce(((e, t) => (e[t] = "function", e)), {
                        ORDER: "bigint",
                        MASK: "bigint",
                        BYTES: "isSafeInteger",
                        BITS: "isSafeInteger"
                    });
                    return (0, o.validateObject)(e, t)
                }, t.FpPow = m, t.FpInvertBatch = y, t.FpDiv = function(e, t, r) {
                    return e.mul(t, "bigint" == typeof r ? h(r, e.ORDER) : e.inv(r))
                }, t.FpLegendre = v, t.FpIsSquare = function(e) {
                    const t = v(e.ORDER);
                    return r => {
                        const o = t(e, r);
                        return e.eql(o, e.ZERO) || e.eql(o, e.ONE)
                    }
                }, t.nLength = w, t.Field = function(e, t, r = !1, a = {}) {
                    if (e <= n) throw new Error("invalid field: expected ORDER > 0, got " + e);
                    const {
                        nBitLength: s,
                        nByteLength: u
                    } = w(e, t);
                    if (u > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
                    let c;
                    const l = Object.freeze({
                        ORDER: e,
                        BITS: s,
                        BYTES: u,
                        MASK: (0, o.bitMask)(s),
                        ZERO: n,
                        ONE: i,
                        create: t => f(t, e),
                        isValid: t => {
                            if ("bigint" != typeof t) throw new Error("invalid field element: expected bigint, got " + typeof t);
                            return n <= t && t < e
                        },
                        is0: e => e === n,
                        isOdd: e => (e & i) === i,
                        neg: t => f(-t, e),
                        eql: (e, t) => e === t,
                        sqr: t => f(t * t, e),
                        add: (t, r) => f(t + r, e),
                        sub: (t, r) => f(t - r, e),
                        mul: (t, r) => f(t * r, e),
                        pow: (e, t) => m(l, e, t),
                        div: (t, r) => f(t * h(r, e), e),
                        sqrN: e => e * e,
                        addN: (e, t) => e + t,
                        subN: (e, t) => e - t,
                        mulN: (e, t) => e * t,
                        inv: t => h(t, e),
                        sqrt: a.sqrt || (t => (c || (c = b(e)), c(l, t))),
                        invertBatch: e => y(l, e),
                        cmov: (e, t, r) => r ? t : e,
                        toBytes: e => r ? (0, o.numberToBytesLE)(e, u) : (0, o.numberToBytesBE)(e, u),
                        fromBytes: e => {
                            if (e.length !== u) throw new Error("Field.fromBytes: expected " + u + " bytes, got " + e.length);
                            return r ? (0, o.bytesToNumberLE)(e) : (0, o.bytesToNumberBE)(e)
                        }
                    });
                    return Object.freeze(l)
                }, t.FpSqrtOdd = function(e, t) {
                    if (!e.isOdd) throw new Error("Field doesn't have isOdd");
                    const r = e.sqrt(t);
                    return e.isOdd(r) ? r : e.neg(r)
                }, t.FpSqrtEven = function(e, t) {
                    if (!e.isOdd) throw new Error("Field doesn't have isOdd");
                    const r = e.sqrt(t);
                    return e.isOdd(r) ? e.neg(r) : r
                }, t.hashToPrivateScalar = function(e, t, r = !1) {
                    const n = (e = (0, o.ensureBytes)("privateHash", e)).length,
                        a = w(t).nByteLength + 8;
                    if (a < 24 || n < a || n > 1024) throw new Error("hashToPrivateScalar: expected " + a + "-1024 bytes of input, got " + n);
                    return f(r ? (0, o.bytesToNumberLE)(e) : (0, o.bytesToNumberBE)(e), t - i) + i
                }, t.getFieldBytesLength = k, t.getMinHashLength = E, t.mapHashToField = function(e, t, r = !1) {
                    const n = e.length,
                        a = k(t),
                        s = E(t);
                    if (n < 16 || n < s || n > 1024) throw new Error("expected " + s + "-1024 bytes of input, got " + n);
                    const u = f(r ? (0, o.bytesToNumberBE)(e) : (0, o.bytesToNumberLE)(e), t - i) + i;
                    return r ? (0, o.numberToBytesLE)(u, a) : (0, o.numberToBytesBE)(u, a)
                };
                const o = r(6977),
                    n = BigInt(0),
                    i = BigInt(1),
                    a = BigInt(2),
                    s = BigInt(3),
                    u = BigInt(4),
                    c = BigInt(5),
                    l = BigInt(8);

                function f(e, t) {
                    const r = e % t;
                    return r >= n ? r : t + r
                }

                function d(e, t, r) {
                    if (t < n) throw new Error("invalid exponent, negatives unsupported");
                    if (r <= n) throw new Error("invalid modulus");
                    if (r === i) return n;
                    let o = i;
                    for (; t > n;) t & i && (o = o * e % r), e = e * e % r, t >>= i;
                    return o
                }

                function h(e, t) {
                    if (e === n) throw new Error("invert: expected non-zero number");
                    if (t <= n) throw new Error("invert: expected positive modulus, got " + t);
                    let r = f(e, t),
                        o = t,
                        a = n,
                        s = i,
                        u = i,
                        c = n;
                    for (; r !== n;) {
                        const e = o / r,
                            t = o % r,
                            n = a - u * e,
                            i = s - c * e;
                        o = r, r = t, a = u, s = c, u = n, c = i
                    }
                    if (o !== i) throw new Error("invert: does not exist");
                    return f(a, t)
                }

                function p(e) {
                    const t = (e - i) / a;
                    let r, o, s;
                    for (r = e - i, o = 0; r % a === n; r /= a, o++);
                    for (s = a; s < e && d(s, t, e) !== e - i; s++)
                        if (s > 1e3) throw new Error("Cannot find square root: likely non-prime P");
                    if (1 === o) {
                        const t = (e + i) / u;
                        return function(e, r) {
                            const o = e.pow(r, t);
                            if (!e.eql(e.sqr(o), r)) throw new Error("Cannot find square root");
                            return o
                        }
                    }
                    const c = (r + i) / a;
                    return function(e, n) {
                        if (e.pow(n, t) === e.neg(e.ONE)) throw new Error("Cannot find square root");
                        let a = o,
                            u = e.pow(e.mul(e.ONE, s), r),
                            l = e.pow(n, c),
                            f = e.pow(n, r);
                        for (; !e.eql(f, e.ONE);) {
                            if (e.eql(f, e.ZERO)) return e.ZERO;
                            let t = 1;
                            for (let r = e.sqr(f); t < a && !e.eql(r, e.ONE); t++) r = e.sqr(r);
                            const r = e.pow(u, i << BigInt(a - t - 1));
                            u = e.sqr(r), l = e.mul(l, r), f = e.mul(f, u), a = t
                        }
                        return l
                    }
                }

                function b(e) {
                    if (e % u === s) {
                        const t = (e + i) / u;
                        return function(e, r) {
                            const o = e.pow(r, t);
                            if (!e.eql(e.sqr(o), r)) throw new Error("Cannot find square root");
                            return o
                        }
                    }
                    if (e % l === c) {
                        const t = (e - c) / l;
                        return function(e, r) {
                            const o = e.mul(r, a),
                                n = e.pow(o, t),
                                i = e.mul(r, n),
                                s = e.mul(e.mul(i, a), n),
                                u = e.mul(i, e.sub(s, e.ONE));
                            if (!e.eql(e.sqr(u), r)) throw new Error("Cannot find square root");
                            return u
                        }
                    }
                    return p(e)
                }
                t.isNegativeLE = (e, t) => (f(e, t) & i) === i;
                const g = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];

                function m(e, t, r) {
                    if (r < n) throw new Error("invalid exponent, negatives unsupported");
                    if (r === n) return e.ONE;
                    if (r === i) return t;
                    let o = e.ONE,
                        a = t;
                    for (; r > n;) r & i && (o = e.mul(o, a)), a = e.sqr(a), r >>= i;
                    return o
                }

                function y(e, t) {
                    const r = new Array(t.length),
                        o = t.reduce(((t, o, n) => e.is0(o) ? t : (r[n] = t, e.mul(t, o))), e.ONE),
                        n = e.inv(o);
                    return t.reduceRight(((t, o, n) => e.is0(o) ? t : (r[n] = e.mul(t, r[n]), e.mul(t, o))), n), r
                }

                function v(e) {
                    const t = (e - i) / a;
                    return (e, r) => e.pow(r, t)
                }

                function w(e, t) {
                    const r = void 0 !== t ? t : e.toString(2).length;
                    return {
                        nBitLength: r,
                        nByteLength: Math.ceil(r / 8)
                    }
                }

                function k(e) {
                    if ("bigint" != typeof e) throw new Error("field order must be bigint");
                    const t = e.toString(2).length;
                    return Math.ceil(t / 8)
                }

                function E(e) {
                    const t = k(e);
                    return t + Math.ceil(t / 2)
                }
            },
            6977: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.notImplemented = t.bitMask = void 0, t.isBytes = i, t.abytes = a, t.abool = function(e, t) {
                    if ("boolean" != typeof t) throw new Error(e + " boolean expected, got " + t)
                }, t.bytesToHex = u, t.numberToHexUnpadded = c, t.hexToNumber = l, t.hexToBytes = h, t.bytesToNumberBE = function(e) {
                    return l(u(e))
                }, t.bytesToNumberLE = function(e) {
                    return a(e), l(u(Uint8Array.from(e).reverse()))
                }, t.numberToBytesBE = p, t.numberToBytesLE = function(e, t) {
                    return p(e, t).reverse()
                }, t.numberToVarBytesBE = function(e) {
                    return h(c(e))
                }, t.ensureBytes = function(e, t, r) {
                    let o;
                    if ("string" == typeof t) try {
                        o = h(t)
                    } catch (t) {
                        throw new Error(e + " must be hex string or Uint8Array, cause: " + t)
                    } else {
                        if (!i(t)) throw new Error(e + " must be hex string or Uint8Array");
                        o = Uint8Array.from(t)
                    }
                    const n = o.length;
                    if ("number" == typeof r && n !== r) throw new Error(e + " of length " + r + " expected, got " + n);
                    return o
                }, t.concatBytes = b, t.equalBytes = function(e, t) {
                    if (e.length !== t.length) return !1;
                    let r = 0;
                    for (let o = 0; o < e.length; o++) r |= e[o] ^ t[o];
                    return 0 === r
                }, t.utf8ToBytes = function(e) {
                    if ("string" != typeof e) throw new Error("string expected");
                    return new Uint8Array((new TextEncoder).encode(e))
                }, t.inRange = m, t.aInRange = function(e, t, r, o) {
                    if (!m(t, r, o)) throw new Error("expected valid " + e + ": " + r + " <= n < " + o + ", got " + t)
                }, t.bitLen = function(e) {
                    let t;
                    for (t = 0; e > r; e >>= o, t += 1);
                    return t
                }, t.bitGet = function(e, t) {
                    return e >> BigInt(t) & o
                }, t.bitSet = function(e, t, n) {
                    return e | (n ? o : r) << BigInt(t)
                }, t.createHmacDrbg = function(e, t, r) {
                    if ("number" != typeof e || e < 2) throw new Error("hashLen must be a number");
                    if ("number" != typeof t || t < 2) throw new Error("qByteLen must be a number");
                    if ("function" != typeof r) throw new Error("hmacFn must be a function");
                    let o = y(e),
                        n = y(e),
                        i = 0;
                    const a = () => {
                            o.fill(1), n.fill(0), i = 0
                        },
                        s = (...e) => r(n, o, ...e),
                        u = (e = y()) => {
                            n = s(v([0]), e), o = s(), 0 !== e.length && (n = s(v([1]), e), o = s())
                        },
                        c = () => {
                            if (i++ >= 1e3) throw new Error("drbg: tried 1000 values");
                            let e = 0;
                            const r = [];
                            for (; e < t;) {
                                o = s();
                                const t = o.slice();
                                r.push(t), e += o.length
                            }
                            return b(...r)
                        };
                    return (e, t) => {
                        let r;
                        for (a(), u(e); !(r = t(c()));) u();
                        return a(), r
                    }
                }, t.validateObject = function(e, t, r = {}) {
                    const o = (t, r, o) => {
                        const n = w[r];
                        if ("function" != typeof n) throw new Error("invalid validator function");
                        const i = e[t];
                        if (!(o && void 0 === i || n(i, e))) throw new Error("param " + String(t) + " is invalid. Expected " + r + ", got " + i)
                    };
                    for (const [e, r] of Object.entries(t)) o(e, r, !1);
                    for (const [e, t] of Object.entries(r)) o(e, t, !0);
                    return e
                }, t.memoized = function(e) {
                    const t = new WeakMap;
                    return (r, ...o) => {
                        const n = t.get(r);
                        if (void 0 !== n) return n;
                        const i = e(r, ...o);
                        return t.set(r, i), i
                    }
                };
                const r = BigInt(0),
                    o = BigInt(1),
                    n = BigInt(2);

                function i(e) {
                    return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name
                }

                function a(e) {
                    if (!i(e)) throw new Error("Uint8Array expected")
                }
                const s = Array.from({
                    length: 256
                }, ((e, t) => t.toString(16).padStart(2, "0")));

                function u(e) {
                    a(e);
                    let t = "";
                    for (let r = 0; r < e.length; r++) t += s[e[r]];
                    return t
                }

                function c(e) {
                    const t = e.toString(16);
                    return 1 & t.length ? "0" + t : t
                }

                function l(e) {
                    if ("string" != typeof e) throw new Error("hex string expected, got " + typeof e);
                    return "" === e ? r : BigInt("0x" + e)
                }
                const f = {
                    _0: 48,
                    _9: 57,
                    A: 65,
                    F: 70,
                    a: 97,
                    f: 102
                };

                function d(e) {
                    return e >= f._0 && e <= f._9 ? e - f._0 : e >= f.A && e <= f.F ? e - (f.A - 10) : e >= f.a && e <= f.f ? e - (f.a - 10) : void 0
                }

                function h(e) {
                    if ("string" != typeof e) throw new Error("hex string expected, got " + typeof e);
                    const t = e.length,
                        r = t / 2;
                    if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
                    const o = new Uint8Array(r);
                    for (let t = 0, n = 0; t < r; t++, n += 2) {
                        const r = d(e.charCodeAt(n)),
                            i = d(e.charCodeAt(n + 1));
                        if (void 0 === r || void 0 === i) {
                            const t = e[n] + e[n + 1];
                            throw new Error('hex string expected, got non-hex character "' + t + '" at index ' + n)
                        }
                        o[t] = 16 * r + i
                    }
                    return o
                }

                function p(e, t) {
                    return h(e.toString(16).padStart(2 * t, "0"))
                }

                function b(...e) {
                    let t = 0;
                    for (let r = 0; r < e.length; r++) {
                        const o = e[r];
                        a(o), t += o.length
                    }
                    const r = new Uint8Array(t);
                    for (let t = 0, o = 0; t < e.length; t++) {
                        const n = e[t];
                        r.set(n, o), o += n.length
                    }
                    return r
                }
                const g = e => "bigint" == typeof e && r <= e;

                function m(e, t, r) {
                    return g(e) && g(t) && g(r) && t <= e && e < r
                }
                t.bitMask = e => (n << BigInt(e - 1)) - o;
                const y = e => new Uint8Array(e),
                    v = e => Uint8Array.from(e),
                    w = {
                        bigint: e => "bigint" == typeof e,
                        function: e => "function" == typeof e,
                        boolean: e => "boolean" == typeof e,
                        string: e => "string" == typeof e,
                        stringOrUint8Array: e => "string" == typeof e || i(e),
                        isSafeInteger: e => Number.isSafeInteger(e),
                        array: e => Array.isArray(e),
                        field: (e, t) => t.Fp.isValid(e),
                        hash: e => "function" == typeof e && Number.isSafeInteger(e.outputLen)
                    };
                t.notImplemented = () => {
                    throw new Error("not implemented")
                }
            },
            8192: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.DER = void 0, t.weierstrassPoints = b, t.weierstrass = function(e) {
                    const r = function(e) {
                            const t = (0, o.validateBasic)(e);
                            return i.validateObject(t, {
                                hash: "hash",
                                hmac: "function",
                                randomBytes: "function"
                            }, {
                                bits2int: "function",
                                bits2int_modN: "function",
                                lowS: "boolean"
                            }), Object.freeze({
                                lowS: !0,
                                ...t
                            })
                        }(e),
                        {
                            Fp: u,
                            n: c
                        } = r,
                        d = u.BYTES + 1,
                        h = 2 * u.BYTES + 1;

                    function p(e) {
                        return n.mod(e, c)
                    }

                    function g(e) {
                        return n.invert(e, c)
                    }
                    const {
                        ProjectivePoint: m,
                        normPrivateKeyToScalar: y,
                        weierstrassEquation: v,
                        isWithinCurveOrder: w
                    } = b({
                        ...r,
                        toBytes(e, t, r) {
                            const o = t.toAffine(),
                                n = u.toBytes(o.x),
                                s = i.concatBytes;
                            return (0, a.abool)("isCompressed", r), r ? s(Uint8Array.from([t.hasEvenY() ? 2 : 3]), n) : s(Uint8Array.from([4]), n, u.toBytes(o.y))
                        },
                        fromBytes(e) {
                            const t = e.length,
                                r = e[0],
                                o = e.subarray(1);
                            if (t !== d || 2 !== r && 3 !== r) {
                                if (t === h && 4 === r) return {
                                    x: u.fromBytes(o.subarray(0, u.BYTES)),
                                    y: u.fromBytes(o.subarray(u.BYTES, 2 * u.BYTES))
                                };
                                throw new Error("invalid Point, expected length of " + d + ", or uncompressed " + h + ", got " + t)
                            } {
                                const e = i.bytesToNumberBE(o);
                                if (!i.inRange(e, f, u.ORDER)) throw new Error("Point is not on curve");
                                const t = v(e);
                                let n;
                                try {
                                    n = u.sqrt(t)
                                } catch (e) {
                                    const t = e instanceof Error ? ": " + e.message : "";
                                    throw new Error("Point is not on curve" + t)
                                }
                                return !(1 & ~r) != ((n & f) === f) && (n = u.neg(n)), {
                                    x: e,
                                    y: n
                                }
                            }
                        }
                    }), k = e => i.bytesToHex(i.numberToBytesBE(e, r.nByteLength));

                    function E(e) {
                        return e > c >> f
                    }
                    const _ = (e, t, r) => i.bytesToNumberBE(e.slice(t, r));
                    class S {
                        constructor(e, t, r) {
                            this.r = e, this.s = t, this.recovery = r, this.assertValidity()
                        }
                        static fromCompact(e) {
                            const t = r.nByteLength;
                            return e = (0, a.ensureBytes)("compactSignature", e, 2 * t), new S(_(e, 0, t), _(e, t, 2 * t))
                        }
                        static fromDER(e) {
                            const {
                                r,
                                s: o
                            } = t.DER.toSig((0, a.ensureBytes)("DER", e));
                            return new S(r, o)
                        }
                        assertValidity() {
                            i.aInRange("r", this.r, f, c), i.aInRange("s", this.s, f, c)
                        }
                        addRecoveryBit(e) {
                            return new S(this.r, this.s, e)
                        }
                        recoverPublicKey(e) {
                            const {
                                r: t,
                                s: o,
                                recovery: n
                            } = this, i = B((0, a.ensureBytes)("msgHash", e));
                            if (null == n || ![0, 1, 2, 3].includes(n)) throw new Error("recovery id invalid");
                            const s = 2 === n || 3 === n ? t + r.n : t;
                            if (s >= u.ORDER) throw new Error("recovery id 2 or 3 invalid");
                            const c = 1 & n ? "03" : "02",
                                l = m.fromHex(c + k(s)),
                                f = g(s),
                                d = p(-i * f),
                                h = p(o * f),
                                b = m.BASE.multiplyAndAddUnsafe(l, d, h);
                            if (!b) throw new Error("point at infinify");
                            return b.assertValidity(), b
                        }
                        hasHighS() {
                            return E(this.s)
                        }
                        normalizeS() {
                            return this.hasHighS() ? new S(this.r, p(-this.s), this.recovery) : this
                        }
                        toDERRawBytes() {
                            return i.hexToBytes(this.toDERHex())
                        }
                        toDERHex() {
                            return t.DER.hexFromSig({
                                r: this.r,
                                s: this.s
                            })
                        }
                        toCompactRawBytes() {
                            return i.hexToBytes(this.toCompactHex())
                        }
                        toCompactHex() {
                            return k(this.r) + k(this.s)
                        }
                    }
                    const T = {
                        isValidPrivateKey(e) {
                            try {
                                return y(e), !0
                            } catch (e) {
                                return !1
                            }
                        },
                        normPrivateKeyToScalar: y,
                        randomPrivateKey: () => {
                            const e = n.getMinHashLength(r.n);
                            return n.mapHashToField(r.randomBytes(e), r.n)
                        },
                        precompute: (e = 8, t = m.BASE) => (t._setWindowSize(e), t.multiply(BigInt(3)), t)
                    };

                    function x(e) {
                        const t = i.isBytes(e),
                            r = "string" == typeof e,
                            o = (t || r) && e.length;
                        return t ? o === d || o === h : r ? o === 2 * d || o === 2 * h : e instanceof m
                    }
                    const I = r.bits2int || function(e) {
                            if (e.length > 8192) throw new Error("input is too large");
                            const t = i.bytesToNumberBE(e),
                                o = 8 * e.length - r.nBitLength;
                            return o > 0 ? t >> BigInt(o) : t
                        },
                        B = r.bits2int_modN || function(e) {
                            return p(I(e))
                        },
                        A = i.bitMask(r.nBitLength);

                    function O(e) {
                        return i.aInRange("num < 2^" + r.nBitLength, e, l, A), i.numberToBytesBE(e, r.nByteLength)
                    }
                    const P = {
                            lowS: r.lowS,
                            prehash: !1
                        },
                        z = {
                            lowS: r.lowS,
                            prehash: !1
                        };
                    return m.BASE._setWindowSize(8), {
                        CURVE: r,
                        getPublicKey: function(e, t = !0) {
                            return m.fromPrivateKey(e).toRawBytes(t)
                        },
                        getSharedSecret: function(e, t, r = !0) {
                            if (x(e)) throw new Error("first arg must be private key");
                            if (!x(t)) throw new Error("second arg must be public key");
                            return m.fromHex(t).multiply(y(e)).toRawBytes(r)
                        },
                        sign: function(e, t, o = P) {
                            const {
                                seed: n,
                                k2sig: c
                            } = function(e, t, o = P) {
                                if (["recovered", "canonical"].some((e => e in o))) throw new Error("sign() legacy options not supported");
                                const {
                                    hash: n,
                                    randomBytes: c
                                } = r;
                                let {
                                    lowS: d,
                                    prehash: h,
                                    extraEntropy: b
                                } = o;
                                null == d && (d = !0), e = (0, a.ensureBytes)("msgHash", e), s(o), h && (e = (0, a.ensureBytes)("prehashed msgHash", n(e)));
                                const v = B(e),
                                    k = y(t),
                                    _ = [O(k), O(v)];
                                if (null != b && !1 !== b) {
                                    const e = !0 === b ? c(u.BYTES) : b;
                                    _.push((0, a.ensureBytes)("extraEntropy", e))
                                }
                                const T = i.concatBytes(..._),
                                    x = v;
                                return {
                                    seed: T,
                                    k2sig: function(e) {
                                        const t = I(e);
                                        if (!w(t)) return;
                                        const r = g(t),
                                            o = m.BASE.multiply(t).toAffine(),
                                            n = p(o.x);
                                        if (n === l) return;
                                        const i = p(r * p(x + n * k));
                                        if (i === l) return;
                                        let a = (o.x === n ? 0 : 2) | Number(o.y & f),
                                            s = i;
                                        return d && E(i) && (s = function(e) {
                                            return E(e) ? p(-e) : e
                                        }(i), a ^= 1), new S(n, s, a)
                                    }
                                }
                            }(e, t, o), d = r;
                            return i.createHmacDrbg(d.hash.outputLen, d.nByteLength, d.hmac)(n, c)
                        },
                        verify: function(e, o, n, u = z) {
                            const c = e;
                            o = (0, a.ensureBytes)("msgHash", o), n = (0, a.ensureBytes)("publicKey", n);
                            const {
                                lowS: l,
                                prehash: f,
                                format: d
                            } = u;
                            if (s(u), "strict" in u) throw new Error("options.strict was renamed to lowS");
                            if (void 0 !== d && "compact" !== d && "der" !== d) throw new Error("format must be compact or der");
                            const h = "string" == typeof c || i.isBytes(c),
                                b = !h && !d && "object" == typeof c && null !== c && "bigint" == typeof c.r && "bigint" == typeof c.s;
                            if (!h && !b) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
                            let y, v;
                            try {
                                if (b && (y = new S(c.r, c.s)), h) {
                                    try {
                                        "compact" !== d && (y = S.fromDER(c))
                                    } catch (e) {
                                        if (!(e instanceof t.DER.Err)) throw e
                                    }
                                    y || "der" === d || (y = S.fromCompact(c))
                                }
                                v = m.fromHex(n)
                            } catch (e) {
                                return !1
                            }
                            if (!y) return !1;
                            if (l && y.hasHighS()) return !1;
                            f && (o = r.hash(o));
                            const {
                                r: w,
                                s: k
                            } = y, E = B(o), _ = g(k), T = p(E * _), x = p(w * _), I = m.BASE.multiplyAndAddUnsafe(v, T, x)?.toAffine();
                            return !!I && p(I.x) === w
                        },
                        ProjectivePoint: m,
                        Signature: S,
                        utils: T
                    }
                }, t.SWUFpSqrtRatio = g, t.mapToCurveSimpleSWU = function(e, t) {
                    if (n.validateField(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)) throw new Error("mapToCurveSimpleSWU: invalid opts");
                    const r = g(e, t.Z);
                    if (!e.isOdd) throw new Error("Fp.isOdd is not implemented!");
                    return o => {
                        let n, i, a, s, u, c, l, f;
                        n = e.sqr(o), n = e.mul(n, t.Z), i = e.sqr(n), i = e.add(i, n), a = e.add(i, e.ONE), a = e.mul(a, t.B), s = e.cmov(t.Z, e.neg(i), !e.eql(i, e.ZERO)), s = e.mul(s, t.A), i = e.sqr(a), c = e.sqr(s), u = e.mul(c, t.A), i = e.add(i, u), i = e.mul(i, a), c = e.mul(c, s), u = e.mul(c, t.B), i = e.add(i, u), l = e.mul(n, a);
                        const {
                            isValid: d,
                            value: h
                        } = r(i, c);
                        f = e.mul(n, o), f = e.mul(f, h), l = e.cmov(l, a, d), f = e.cmov(f, h, d);
                        const p = e.isOdd(o) === e.isOdd(f);
                        return f = e.cmov(e.neg(f), f, p), l = e.div(l, s), {
                            x: l,
                            y: f
                        }
                    }
                };
                const o = r(4291),
                    n = r(3146),
                    i = r(6977),
                    a = r(6977);

                function s(e) {
                    void 0 !== e.lowS && (0, a.abool)("lowS", e.lowS), void 0 !== e.prehash && (0, a.abool)("prehash", e.prehash)
                }
                const {
                    bytesToNumberBE: u,
                    hexToBytes: c
                } = i;
                t.DER = {
                    Err: class extends Error {
                        constructor(e = "") {
                            super(e)
                        }
                    },
                    _tlv: {
                        encode: (e, r) => {
                            const {
                                Err: o
                            } = t.DER;
                            if (e < 0 || e > 256) throw new o("tlv.encode: wrong tag");
                            if (1 & r.length) throw new o("tlv.encode: unpadded data");
                            const n = r.length / 2,
                                a = i.numberToHexUnpadded(n);
                            if (a.length / 2 & 128) throw new o("tlv.encode: long form length too big");
                            const s = n > 127 ? i.numberToHexUnpadded(a.length / 2 | 128) : "";
                            return i.numberToHexUnpadded(e) + s + a + r
                        },
                        decode(e, r) {
                            const {
                                Err: o
                            } = t.DER;
                            let n = 0;
                            if (e < 0 || e > 256) throw new o("tlv.encode: wrong tag");
                            if (r.length < 2 || r[n++] !== e) throw new o("tlv.decode: wrong tlv");
                            const i = r[n++];
                            let a = 0;
                            if (128 & i) {
                                const e = 127 & i;
                                if (!e) throw new o("tlv.decode(long): indefinite length not supported");
                                if (e > 4) throw new o("tlv.decode(long): byte length is too big");
                                const t = r.subarray(n, n + e);
                                if (t.length !== e) throw new o("tlv.decode: length bytes not complete");
                                if (0 === t[0]) throw new o("tlv.decode(long): zero leftmost byte");
                                for (const e of t) a = a << 8 | e;
                                if (n += e, a < 128) throw new o("tlv.decode(long): not minimal encoding")
                            } else a = i;
                            const s = r.subarray(n, n + a);
                            if (s.length !== a) throw new o("tlv.decode: wrong value length");
                            return {
                                v: s,
                                l: r.subarray(n + a)
                            }
                        }
                    },
                    _int: {
                        encode(e) {
                            const {
                                Err: r
                            } = t.DER;
                            if (e < l) throw new r("integer: negative integers are not allowed");
                            let o = i.numberToHexUnpadded(e);
                            if (8 & Number.parseInt(o[0], 16) && (o = "00" + o), 1 & o.length) throw new r("unexpected DER parsing assertion: unpadded hex");
                            return o
                        },
                        decode(e) {
                            const {
                                Err: r
                            } = t.DER;
                            if (128 & e[0]) throw new r("invalid signature integer: negative");
                            if (0 === e[0] && !(128 & e[1])) throw new r("invalid signature integer: unnecessary leading zero");
                            return u(e)
                        }
                    },
                    toSig(e) {
                        const {
                            Err: r,
                            _int: o,
                            _tlv: n
                        } = t.DER, a = "string" == typeof e ? c(e) : e;
                        i.abytes(a);
                        const {
                            v: s,
                            l: u
                        } = n.decode(48, a);
                        if (u.length) throw new r("invalid signature: left bytes after parsing");
                        const {
                            v: l,
                            l: f
                        } = n.decode(2, s), {
                            v: d,
                            l: h
                        } = n.decode(2, f);
                        if (h.length) throw new r("invalid signature: left bytes after parsing");
                        return {
                            r: o.decode(l),
                            s: o.decode(d)
                        }
                    },
                    hexFromSig(e) {
                        const {
                            _tlv: r,
                            _int: o
                        } = t.DER, n = r.encode(2, o.encode(e.r)) + r.encode(2, o.encode(e.s));
                        return r.encode(48, n)
                    }
                };
                const l = BigInt(0),
                    f = BigInt(1),
                    d = BigInt(2),
                    h = BigInt(3),
                    p = BigInt(4);

                function b(e) {
                    const t = function(e) {
                            const t = (0, o.validateBasic)(e);
                            i.validateObject(t, {
                                a: "field",
                                b: "field"
                            }, {
                                allowedPrivateKeyLengths: "array",
                                wrapPrivateKey: "boolean",
                                isTorsionFree: "function",
                                clearCofactor: "function",
                                allowInfinityPoint: "boolean",
                                fromBytes: "function",
                                toBytes: "function"
                            });
                            const {
                                endo: r,
                                Fp: n,
                                a
                            } = t;
                            if (r) {
                                if (!n.eql(a, n.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
                                if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar) throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function")
                            }
                            return Object.freeze({
                                ...t
                            })
                        }(e),
                        {
                            Fp: r
                        } = t,
                        s = n.Field(t.n, t.nBitLength),
                        u = t.toBytes || ((e, t, o) => {
                            const n = t.toAffine();
                            return i.concatBytes(Uint8Array.from([4]), r.toBytes(n.x), r.toBytes(n.y))
                        }),
                        c = t.fromBytes || (e => {
                            const t = e.subarray(1);
                            return {
                                x: r.fromBytes(t.subarray(0, r.BYTES)),
                                y: r.fromBytes(t.subarray(r.BYTES, 2 * r.BYTES))
                            }
                        });

                    function d(e) {
                        const {
                            a: o,
                            b: n
                        } = t, i = r.sqr(e), a = r.mul(i, e);
                        return r.add(r.add(a, r.mul(e, o)), n)
                    }
                    if (!r.eql(r.sqr(t.Gy), d(t.Gx))) throw new Error("bad generator point: equation left != right");

                    function p(e) {
                        const {
                            allowedPrivateKeyLengths: r,
                            nByteLength: o,
                            wrapPrivateKey: s,
                            n: u
                        } = t;
                        if (r && "bigint" != typeof e) {
                            if (i.isBytes(e) && (e = i.bytesToHex(e)), "string" != typeof e || !r.includes(e.length)) throw new Error("invalid private key");
                            e = e.padStart(2 * o, "0")
                        }
                        let c;
                        try {
                            c = "bigint" == typeof e ? e : i.bytesToNumberBE((0, a.ensureBytes)("private key", e, o))
                        } catch (t) {
                            throw new Error("invalid private key, expected hex or " + o + " bytes, got " + typeof e)
                        }
                        return s && (c = n.mod(c, u)), i.aInRange("private key", c, f, u), c
                    }

                    function b(e) {
                        if (!(e instanceof y)) throw new Error("ProjectivePoint expected")
                    }
                    const g = (0, a.memoized)(((e, t) => {
                            const {
                                px: o,
                                py: n,
                                pz: i
                            } = e;
                            if (r.eql(i, r.ONE)) return {
                                x: o,
                                y: n
                            };
                            const a = e.is0();
                            null == t && (t = a ? r.ONE : r.inv(i));
                            const s = r.mul(o, t),
                                u = r.mul(n, t),
                                c = r.mul(i, t);
                            if (a) return {
                                x: r.ZERO,
                                y: r.ZERO
                            };
                            if (!r.eql(c, r.ONE)) throw new Error("invZ was invalid");
                            return {
                                x: s,
                                y: u
                            }
                        })),
                        m = (0, a.memoized)((e => {
                            if (e.is0()) {
                                if (t.allowInfinityPoint && !r.is0(e.py)) return;
                                throw new Error("bad point: ZERO")
                            }
                            const {
                                x: o,
                                y: n
                            } = e.toAffine();
                            if (!r.isValid(o) || !r.isValid(n)) throw new Error("bad point: x or y not FE");
                            const i = r.sqr(n),
                                a = d(o);
                            if (!r.eql(i, a)) throw new Error("bad point: equation left != right");
                            if (!e.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
                            return !0
                        }));
                    class y {
                        constructor(e, t, o) {
                            if (this.px = e, this.py = t, this.pz = o, null == e || !r.isValid(e)) throw new Error("x required");
                            if (null == t || !r.isValid(t)) throw new Error("y required");
                            if (null == o || !r.isValid(o)) throw new Error("z required");
                            Object.freeze(this)
                        }
                        static fromAffine(e) {
                            const {
                                x: t,
                                y: o
                            } = e || {};
                            if (!e || !r.isValid(t) || !r.isValid(o)) throw new Error("invalid affine point");
                            if (e instanceof y) throw new Error("projective point not allowed");
                            const n = e => r.eql(e, r.ZERO);
                            return n(t) && n(o) ? y.ZERO : new y(t, o, r.ONE)
                        }
                        get x() {
                            return this.toAffine().x
                        }
                        get y() {
                            return this.toAffine().y
                        }
                        static normalizeZ(e) {
                            const t = r.invertBatch(e.map((e => e.pz)));
                            return e.map(((e, r) => e.toAffine(t[r]))).map(y.fromAffine)
                        }
                        static fromHex(e) {
                            const t = y.fromAffine(c((0, a.ensureBytes)("pointHex", e)));
                            return t.assertValidity(), t
                        }
                        static fromPrivateKey(e) {
                            return y.BASE.multiply(p(e))
                        }
                        static msm(e, t) {
                            return (0, o.pippenger)(y, s, e, t)
                        }
                        _setWindowSize(e) {
                            w.setWindowSize(this, e)
                        }
                        assertValidity() {
                            m(this)
                        }
                        hasEvenY() {
                            const {
                                y: e
                            } = this.toAffine();
                            if (r.isOdd) return !r.isOdd(e);
                            throw new Error("Field doesn't support isOdd")
                        }
                        equals(e) {
                            b(e);
                            const {
                                px: t,
                                py: o,
                                pz: n
                            } = this, {
                                px: i,
                                py: a,
                                pz: s
                            } = e, u = r.eql(r.mul(t, s), r.mul(i, n)), c = r.eql(r.mul(o, s), r.mul(a, n));
                            return u && c
                        }
                        negate() {
                            return new y(this.px, r.neg(this.py), this.pz)
                        }
                        double() {
                            const {
                                a: e,
                                b: o
                            } = t, n = r.mul(o, h), {
                                px: i,
                                py: a,
                                pz: s
                            } = this;
                            let u = r.ZERO,
                                c = r.ZERO,
                                l = r.ZERO,
                                f = r.mul(i, i),
                                d = r.mul(a, a),
                                p = r.mul(s, s),
                                b = r.mul(i, a);
                            return b = r.add(b, b), l = r.mul(i, s), l = r.add(l, l), u = r.mul(e, l), c = r.mul(n, p), c = r.add(u, c), u = r.sub(d, c), c = r.add(d, c), c = r.mul(u, c), u = r.mul(b, u), l = r.mul(n, l), p = r.mul(e, p), b = r.sub(f, p), b = r.mul(e, b), b = r.add(b, l), l = r.add(f, f), f = r.add(l, f), f = r.add(f, p), f = r.mul(f, b), c = r.add(c, f), p = r.mul(a, s), p = r.add(p, p), f = r.mul(p, b), u = r.sub(u, f), l = r.mul(p, d), l = r.add(l, l), l = r.add(l, l), new y(u, c, l)
                        }
                        add(e) {
                            b(e);
                            const {
                                px: o,
                                py: n,
                                pz: i
                            } = this, {
                                px: a,
                                py: s,
                                pz: u
                            } = e;
                            let c = r.ZERO,
                                l = r.ZERO,
                                f = r.ZERO;
                            const d = t.a,
                                p = r.mul(t.b, h);
                            let g = r.mul(o, a),
                                m = r.mul(n, s),
                                v = r.mul(i, u),
                                w = r.add(o, n),
                                k = r.add(a, s);
                            w = r.mul(w, k), k = r.add(g, m), w = r.sub(w, k), k = r.add(o, i);
                            let E = r.add(a, u);
                            return k = r.mul(k, E), E = r.add(g, v), k = r.sub(k, E), E = r.add(n, i), c = r.add(s, u), E = r.mul(E, c), c = r.add(m, v), E = r.sub(E, c), f = r.mul(d, k), c = r.mul(p, v), f = r.add(c, f), c = r.sub(m, f), f = r.add(m, f), l = r.mul(c, f), m = r.add(g, g), m = r.add(m, g), v = r.mul(d, v), k = r.mul(p, k), m = r.add(m, v), v = r.sub(g, v), v = r.mul(d, v), k = r.add(k, v), g = r.mul(m, k), l = r.add(l, g), g = r.mul(E, k), c = r.mul(w, c), c = r.sub(c, g), g = r.mul(w, m), f = r.mul(E, f), f = r.add(f, g), new y(c, l, f)
                        }
                        subtract(e) {
                            return this.add(e.negate())
                        }
                        is0() {
                            return this.equals(y.ZERO)
                        }
                        wNAF(e) {
                            return w.wNAFCached(this, e, y.normalizeZ)
                        }
                        multiplyUnsafe(e) {
                            const {
                                endo: o,
                                n
                            } = t;
                            i.aInRange("scalar", e, l, n);
                            const a = y.ZERO;
                            if (e === l) return a;
                            if (this.is0() || e === f) return this;
                            if (!o || w.hasPrecomputes(this)) return w.wNAFCachedUnsafe(this, e, y.normalizeZ);
                            let {
                                k1neg: s,
                                k1: u,
                                k2neg: c,
                                k2: d
                            } = o.splitScalar(e), h = a, p = a, b = this;
                            for (; u > l || d > l;) u & f && (h = h.add(b)), d & f && (p = p.add(b)), b = b.double(), u >>= f, d >>= f;
                            return s && (h = h.negate()), c && (p = p.negate()), p = new y(r.mul(p.px, o.beta), p.py, p.pz), h.add(p)
                        }
                        multiply(e) {
                            const {
                                endo: o,
                                n
                            } = t;
                            let a, s;
                            if (i.aInRange("scalar", e, f, n), o) {
                                const {
                                    k1neg: t,
                                    k1: n,
                                    k2neg: i,
                                    k2: u
                                } = o.splitScalar(e);
                                let {
                                    p: c,
                                    f: l
                                } = this.wNAF(n), {
                                    p: f,
                                    f: d
                                } = this.wNAF(u);
                                c = w.constTimeNegate(t, c), f = w.constTimeNegate(i, f), f = new y(r.mul(f.px, o.beta), f.py, f.pz), a = c.add(f), s = l.add(d)
                            } else {
                                const {
                                    p: t,
                                    f: r
                                } = this.wNAF(e);
                                a = t, s = r
                            }
                            return y.normalizeZ([a, s])[0]
                        }
                        multiplyAndAddUnsafe(e, t, r) {
                            const o = y.BASE,
                                n = (e, t) => t !== l && t !== f && e.equals(o) ? e.multiply(t) : e.multiplyUnsafe(t),
                                i = n(this, t).add(n(e, r));
                            return i.is0() ? void 0 : i
                        }
                        toAffine(e) {
                            return g(this, e)
                        }
                        isTorsionFree() {
                            const {
                                h: e,
                                isTorsionFree: r
                            } = t;
                            if (e === f) return !0;
                            if (r) return r(y, this);
                            throw new Error("isTorsionFree() has not been declared for the elliptic curve")
                        }
                        clearCofactor() {
                            const {
                                h: e,
                                clearCofactor: r
                            } = t;
                            return e === f ? this : r ? r(y, this) : this.multiplyUnsafe(t.h)
                        }
                        toRawBytes(e = !0) {
                            return (0, a.abool)("isCompressed", e), this.assertValidity(), u(y, this, e)
                        }
                        toHex(e = !0) {
                            return (0, a.abool)("isCompressed", e), i.bytesToHex(this.toRawBytes(e))
                        }
                    }
                    y.BASE = new y(t.Gx, t.Gy, r.ONE), y.ZERO = new y(r.ZERO, r.ONE, r.ZERO);
                    const v = t.nBitLength,
                        w = (0, o.wNAF)(y, t.endo ? Math.ceil(v / 2) : v);
                    return {
                        CURVE: t,
                        ProjectivePoint: y,
                        normPrivateKeyToScalar: p,
                        weierstrassEquation: d,
                        isWithinCurveOrder: function(e) {
                            return i.inRange(e, f, t.n)
                        }
                    }
                }

                function g(e, t) {
                    const r = e.ORDER;
                    let o = l;
                    for (let e = r - f; e % d === l; e /= d) o += f;
                    const n = o,
                        i = d << n - f - f,
                        a = i * d,
                        s = (r - f) / a,
                        u = (s - f) / d,
                        c = a - f,
                        b = i,
                        g = e.pow(t, s),
                        m = e.pow(t, (s + f) / d);
                    let y = (t, r) => {
                        let o = g,
                            i = e.pow(r, c),
                            a = e.sqr(i);
                        a = e.mul(a, r);
                        let s = e.mul(t, a);
                        s = e.pow(s, u), s = e.mul(s, i), i = e.mul(s, r), a = e.mul(s, t);
                        let l = e.mul(a, i);
                        s = e.pow(l, b);
                        let h = e.eql(s, e.ONE);
                        i = e.mul(a, m), s = e.mul(l, o), a = e.cmov(i, a, h), l = e.cmov(s, l, h);
                        for (let t = n; t > f; t--) {
                            let r = t - d;
                            r = d << r - f;
                            let n = e.pow(l, r);
                            const s = e.eql(n, e.ONE);
                            i = e.mul(a, o), o = e.mul(o, o), n = e.mul(l, o), a = e.cmov(i, a, s), l = e.cmov(n, l, s)
                        }
                        return {
                            isValid: h,
                            value: a
                        }
                    };
                    if (e.ORDER % p === h) {
                        const r = (e.ORDER - h) / p,
                            o = e.sqrt(e.neg(t));
                        y = (t, n) => {
                            let i = e.sqr(n);
                            const a = e.mul(t, n);
                            i = e.mul(i, a);
                            let s = e.pow(i, r);
                            s = e.mul(s, a);
                            const u = e.mul(s, o),
                                c = e.mul(e.sqr(s), n),
                                l = e.eql(c, t);
                            return {
                                isValid: l,
                                value: e.cmov(u, s, l)
                            }
                        }
                    }
                    return y
                }
            },
            4533: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.encodeToCurve = t.hashToCurve = t.schnorr = t.secp256k1 = void 0;
                const o = r(6121),
                    n = r(4981),
                    i = r(4169),
                    a = r(88),
                    s = r(3146),
                    u = r(6977),
                    c = r(8192),
                    l = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
                    f = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
                    d = BigInt(1),
                    h = BigInt(2),
                    p = (e, t) => (e + t / h) / t;

                function b(e) {
                    const t = l,
                        r = BigInt(3),
                        o = BigInt(6),
                        n = BigInt(11),
                        i = BigInt(22),
                        a = BigInt(23),
                        u = BigInt(44),
                        c = BigInt(88),
                        f = e * e * e % t,
                        d = f * f * e % t,
                        p = (0, s.pow2)(d, r, t) * d % t,
                        b = (0, s.pow2)(p, r, t) * d % t,
                        m = (0, s.pow2)(b, h, t) * f % t,
                        y = (0, s.pow2)(m, n, t) * m % t,
                        v = (0, s.pow2)(y, i, t) * y % t,
                        w = (0, s.pow2)(v, u, t) * v % t,
                        k = (0, s.pow2)(w, c, t) * w % t,
                        E = (0, s.pow2)(k, u, t) * v % t,
                        _ = (0, s.pow2)(E, r, t) * d % t,
                        S = (0, s.pow2)(_, a, t) * y % t,
                        T = (0, s.pow2)(S, o, t) * f % t,
                        x = (0, s.pow2)(T, h, t);
                    if (!g.eql(g.sqr(x), e)) throw new Error("Cannot find square root");
                    return x
                }
                const g = (0, s.Field)(l, void 0, void 0, {
                    sqrt: b
                });
                t.secp256k1 = (0, i.createCurve)({
                    a: BigInt(0),
                    b: BigInt(7),
                    Fp: g,
                    n: f,
                    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
                    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
                    h: BigInt(1),
                    lowS: !0,
                    endo: {
                        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                        splitScalar: e => {
                            const t = f,
                                r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                                o = -d * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                                n = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                                i = r,
                                a = BigInt("0x100000000000000000000000000000000"),
                                u = p(i * e, t),
                                c = p(-o * e, t);
                            let l = (0, s.mod)(e - u * r - c * n, t),
                                h = (0, s.mod)(-u * o - c * i, t);
                            const b = l > a,
                                g = h > a;
                            if (b && (l = t - l), g && (h = t - h), l > a || h > a) throw new Error("splitScalar: Endomorphism failed, k=" + e);
                            return {
                                k1neg: b,
                                k1: l,
                                k2neg: g,
                                k2: h
                            }
                        }
                    }
                }, o.sha256);
                const m = BigInt(0),
                    y = {};

                function v(e, ...t) {
                    let r = y[e];
                    if (void 0 === r) {
                        const t = (0, o.sha256)(Uint8Array.from(e, (e => e.charCodeAt(0))));
                        r = (0, u.concatBytes)(t, t), y[e] = r
                    }
                    return (0, o.sha256)((0, u.concatBytes)(r, ...t))
                }
                const w = e => e.toRawBytes(!0).slice(1),
                    k = e => (0, u.numberToBytesBE)(e, 32),
                    E = e => (0, s.mod)(e, l),
                    _ = e => (0, s.mod)(e, f),
                    S = t.secp256k1.ProjectivePoint;

                function T(e) {
                    let r = t.secp256k1.utils.normPrivateKeyToScalar(e),
                        o = S.fromPrivateKey(r);
                    return {
                        scalar: o.hasEvenY() ? r : _(-r),
                        bytes: w(o)
                    }
                }

                function x(e) {
                    (0, u.aInRange)("x", e, d, l);
                    const t = E(e * e);
                    let r = b(E(t * e + BigInt(7)));
                    r % h !== m && (r = E(-r));
                    const o = new S(e, r, d);
                    return o.assertValidity(), o
                }
                const I = u.bytesToNumberBE;

                function B(...e) {
                    return _(I(v("BIP0340/challenge", ...e)))
                }

                function A(e, t, r) {
                    const o = (0, u.ensureBytes)("signature", e, 64),
                        n = (0, u.ensureBytes)("message", t),
                        i = (0, u.ensureBytes)("publicKey", r, 32);
                    try {
                        const e = x(I(i)),
                            t = I(o.subarray(0, 32));
                        if (!(0, u.inRange)(t, d, l)) return !1;
                        const r = I(o.subarray(32, 64));
                        if (!(0, u.inRange)(r, d, f)) return !1;
                        const h = B(k(t), w(e), n),
                            p = (a = e, s = r, c = _(-h), S.BASE.multiplyAndAddUnsafe(a, s, c));
                        return !(!p || !p.hasEvenY() || p.toAffine().x !== t)
                    } catch (e) {
                        return !1
                    }
                    var a, s, c
                }
                t.schnorr = {
                    getPublicKey: function(e) {
                        return T(e).bytes
                    },
                    sign: function(e, t, r = (0, n.randomBytes)(32)) {
                        const o = (0, u.ensureBytes)("message", e),
                            {
                                bytes: i,
                                scalar: a
                            } = T(t),
                            s = (0, u.ensureBytes)("auxRand", r, 32),
                            c = k(a ^ I(v("BIP0340/aux", s))),
                            l = v("BIP0340/nonce", c, i, o),
                            f = _(I(l));
                        if (f === m) throw new Error("sign failed: k is zero");
                        const {
                            bytes: d,
                            scalar: h
                        } = T(f), p = B(d, i, o), b = new Uint8Array(64);
                        if (b.set(d, 0), b.set(k(_(h + p * a)), 32), !A(b, o, i)) throw new Error("sign: Invalid signature produced");
                        return b
                    },
                    verify: A,
                    utils: {
                        randomPrivateKey: t.secp256k1.utils.randomPrivateKey,
                        lift_x: x,
                        pointToBytes: w,
                        numberToBytesBE: u.numberToBytesBE,
                        bytesToNumberBE: u.bytesToNumberBE,
                        taggedHash: v,
                        mod: s.mod
                    }
                };
                const O = (() => (0, a.isogenyMap)(g, [
                        ["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7", "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581", "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262", "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"],
                        ["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b", "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14", "0x0000000000000000000000000000000000000000000000000000000000000001"],
                        ["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c", "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3", "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931", "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"],
                        ["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b", "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573", "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f", "0x0000000000000000000000000000000000000000000000000000000000000001"]
                    ].map((e => e.map((e => BigInt(e)))))))(),
                    P = (() => (0, c.mapToCurveSimpleSWU)(g, {
                        A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
                        B: BigInt("1771"),
                        Z: g.create(BigInt("-11"))
                    }))(),
                    z = (() => (0, a.createHasher)(t.secp256k1.ProjectivePoint, (e => {
                        const {
                            x: t,
                            y: r
                        } = P(g.create(e[0]));
                        return O(t, r)
                    }), {
                        DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
                        encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
                        p: g.ORDER,
                        m: 1,
                        k: 128,
                        expand: "xmd",
                        hash: o.sha256
                    }))();
                t.hashToCurve = z.hashToCurve, t.encodeToCurve = z.encodeToCurve
            },
            4007: (e, t) => {
                "use strict";

                function r(e) {
                    if (!Number.isSafeInteger(e) || e < 0) throw new Error("positive integer expected, got " + e)
                }

                function o(e, ...t) {
                    if (!((r = e) instanceof Uint8Array || ArrayBuffer.isView(r) && "Uint8Array" === r.constructor.name)) throw new Error("Uint8Array expected");
                    var r;
                    if (t.length > 0 && !t.includes(e.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length)
                }

                function n(e) {
                    if ("function" != typeof e || "function" != typeof e.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
                    r(e.outputLen), r(e.blockLen)
                }

                function i(e, t = !0) {
                    if (e.destroyed) throw new Error("Hash instance has been destroyed");
                    if (t && e.finished) throw new Error("Hash#digest() has already been called")
                }

                function a(e, t) {
                    o(e);
                    const r = t.outputLen;
                    if (e.length < r) throw new Error("digestInto() expects output buffer of length at least " + r)
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.anumber = r, t.number = r, t.abytes = o, t.bytes = o, t.ahash = n, t.aexists = i, t.aoutput = a;
                const s = {
                    number: r,
                    bytes: o,
                    hash: n,
                    exists: i,
                    output: a
                };
                t.default = s
            },
            4512: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.HashMD = t.Maj = t.Chi = void 0;
                const o = r(4007),
                    n = r(4981);
                t.Chi = (e, t, r) => e & t ^ ~e & r, t.Maj = (e, t, r) => e & t ^ e & r ^ t & r;
                class i extends n.Hash {
                    constructor(e, t, r, o) {
                        super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = (0, n.createView)(this.buffer)
                    }
                    update(e) {
                        (0, o.aexists)(this);
                        const {
                            view: t,
                            buffer: r,
                            blockLen: i
                        } = this, a = (e = (0, n.toBytes)(e)).length;
                        for (let o = 0; o < a;) {
                            const s = Math.min(i - this.pos, a - o);
                            if (s !== i) r.set(e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === i && (this.process(t, 0), this.pos = 0);
                            else {
                                const t = (0, n.createView)(e);
                                for (; i <= a - o; o += i) this.process(t, o)
                            }
                        }
                        return this.length += e.length, this.roundClean(), this
                    }
                    digestInto(e) {
                        (0, o.aexists)(this), (0, o.aoutput)(e, this), this.finished = !0;
                        const {
                            buffer: t,
                            view: r,
                            blockLen: i,
                            isLE: a
                        } = this;
                        let {
                            pos: s
                        } = this;
                        t[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > i - s && (this.process(r, 0), s = 0);
                        for (let e = s; e < i; e++) t[e] = 0;
                        ! function(e, t, r, o) {
                            if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, o);
                            const n = BigInt(32),
                                i = BigInt(4294967295),
                                a = Number(r >> n & i),
                                s = Number(r & i),
                                u = o ? 4 : 0,
                                c = o ? 0 : 4;
                            e.setUint32(t + u, a, o), e.setUint32(t + c, s, o)
                        }(r, i - 8, BigInt(8 * this.length), a), this.process(r, 0);
                        const u = (0, n.createView)(e),
                            c = this.outputLen;
                        if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
                        const l = c / 4,
                            f = this.get();
                        if (l > f.length) throw new Error("_sha2: outputLen bigger than state");
                        for (let e = 0; e < l; e++) u.setUint32(4 * e, f[e], a)
                    }
                    digest() {
                        const {
                            buffer: e,
                            outputLen: t
                        } = this;
                        this.digestInto(e);
                        const r = e.slice(0, t);
                        return this.destroy(), r
                    }
                    _cloneInto(e) {
                        e || (e = new this.constructor), e.set(...this.get());
                        const {
                            blockLen: t,
                            buffer: r,
                            length: o,
                            finished: n,
                            destroyed: i,
                            pos: a
                        } = this;
                        return e.length = o, e.pos = a, e.finished = n, e.destroyed = i, o % t && e.buffer.set(r), e
                    }
                }
                t.HashMD = i
            },
            827: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.crypto = void 0, t.crypto = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0
            },
            9737: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.hmac = t.HMAC = void 0;
                const o = r(4007),
                    n = r(4981);
                class i extends n.Hash {
                    constructor(e, t) {
                        super(), this.finished = !1, this.destroyed = !1, (0, o.ahash)(e);
                        const r = (0, n.toBytes)(t);
                        if (this.iHash = e.create(), "function" != typeof this.iHash.update) throw new Error("Expected instance of class which extends utils.Hash");
                        this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                        const i = this.blockLen,
                            a = new Uint8Array(i);
                        a.set(r.length > i ? e.create().update(r).digest() : r);
                        for (let e = 0; e < a.length; e++) a[e] ^= 54;
                        this.iHash.update(a), this.oHash = e.create();
                        for (let e = 0; e < a.length; e++) a[e] ^= 106;
                        this.oHash.update(a), a.fill(0)
                    }
                    update(e) {
                        return (0, o.aexists)(this), this.iHash.update(e), this
                    }
                    digestInto(e) {
                        (0, o.aexists)(this), (0, o.abytes)(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
                    }
                    digest() {
                        const e = new Uint8Array(this.oHash.outputLen);
                        return this.digestInto(e), e
                    }
                    _cloneInto(e) {
                        e || (e = Object.create(Object.getPrototypeOf(this), {}));
                        const {
                            oHash: t,
                            iHash: r,
                            finished: o,
                            destroyed: n,
                            blockLen: i,
                            outputLen: a
                        } = this;
                        return e.finished = o, e.destroyed = n, e.blockLen = i, e.outputLen = a, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
                    }
                    destroy() {
                        this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                    }
                }
                t.HMAC = i, t.hmac = (e, t, r) => new i(e, t).update(r).digest(), t.hmac.create = (e, t) => new i(e, t)
            },
            6121: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.sha224 = t.sha256 = t.SHA256 = void 0;
                const o = r(4512),
                    n = r(4981),
                    i = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                    a = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                    s = new Uint32Array(64);
                class u extends o.HashMD {
                    constructor() {
                        super(64, 32, 8, !1), this.A = 0 | a[0], this.B = 0 | a[1], this.C = 0 | a[2], this.D = 0 | a[3], this.E = 0 | a[4], this.F = 0 | a[5], this.G = 0 | a[6], this.H = 0 | a[7]
                    }
                    get() {
                        const {
                            A: e,
                            B: t,
                            C: r,
                            D: o,
                            E: n,
                            F: i,
                            G: a,
                            H: s
                        } = this;
                        return [e, t, r, o, n, i, a, s]
                    }
                    set(e, t, r, o, n, i, a, s) {
                        this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | o, this.E = 0 | n, this.F = 0 | i, this.G = 0 | a, this.H = 0 | s
                    }
                    process(e, t) {
                        for (let r = 0; r < 16; r++, t += 4) s[r] = e.getUint32(t, !1);
                        for (let e = 16; e < 64; e++) {
                            const t = s[e - 15],
                                r = s[e - 2],
                                o = (0, n.rotr)(t, 7) ^ (0, n.rotr)(t, 18) ^ t >>> 3,
                                i = (0, n.rotr)(r, 17) ^ (0, n.rotr)(r, 19) ^ r >>> 10;
                            s[e] = i + s[e - 7] + o + s[e - 16] | 0
                        }
                        let {
                            A: r,
                            B: a,
                            C: u,
                            D: c,
                            E: l,
                            F: f,
                            G: d,
                            H: h
                        } = this;
                        for (let e = 0; e < 64; e++) {
                            const t = h + ((0, n.rotr)(l, 6) ^ (0, n.rotr)(l, 11) ^ (0, n.rotr)(l, 25)) + (0, o.Chi)(l, f, d) + i[e] + s[e] | 0,
                                p = ((0, n.rotr)(r, 2) ^ (0, n.rotr)(r, 13) ^ (0, n.rotr)(r, 22)) + (0, o.Maj)(r, a, u) | 0;
                            h = d, d = f, f = l, l = c + t | 0, c = u, u = a, a = r, r = t + p | 0
                        }
                        r = r + this.A | 0, a = a + this.B | 0, u = u + this.C | 0, c = c + this.D | 0, l = l + this.E | 0, f = f + this.F | 0, d = d + this.G | 0, h = h + this.H | 0, this.set(r, a, u, c, l, f, d, h)
                    }
                    roundClean() {
                        s.fill(0)
                    }
                    destroy() {
                        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                    }
                }
                t.SHA256 = u;
                class c extends u {
                    constructor() {
                        super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28
                    }
                }
                t.sha256 = (0, n.wrapConstructor)((() => new u)), t.sha224 = (0, n.wrapConstructor)((() => new c))
            },
            4981: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = function(e) {
                    return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name
                }, t.byteSwap32 = function(e) {
                    for (let r = 0; r < e.length; r++) e[r] = (0, t.byteSwap)(e[r])
                }, t.bytesToHex = function(e) {
                    (0, n.abytes)(e);
                    let t = "";
                    for (let r = 0; r < e.length; r++) t += i[e[r]];
                    return t
                }, t.hexToBytes = function(e) {
                    if ("string" != typeof e) throw new Error("hex string expected, got " + typeof e);
                    const t = e.length,
                        r = t / 2;
                    if (t % 2) throw new Error("padded hex string expected, got unpadded hex of length " + t);
                    const o = new Uint8Array(r);
                    for (let t = 0, n = 0; t < r; t++, n += 2) {
                        const r = s(e.charCodeAt(n)),
                            i = s(e.charCodeAt(n + 1));
                        if (void 0 === r || void 0 === i) {
                            const t = e[n] + e[n + 1];
                            throw new Error('hex string expected, got non-hex character "' + t + '" at index ' + n)
                        }
                        o[t] = 16 * r + i
                    }
                    return o
                }, t.asyncLoop = async function(e, r, o) {
                    let n = Date.now();
                    for (let i = 0; i < e; i++) {
                        o(i);
                        const e = Date.now() - n;
                        e >= 0 && e < r || (await (0, t.nextTick)(), n += e)
                    }
                }, t.utf8ToBytes = u, t.toBytes = c, t.concatBytes = function(...e) {
                    let t = 0;
                    for (let r = 0; r < e.length; r++) {
                        const o = e[r];
                        (0, n.abytes)(o), t += o.length
                    }
                    const r = new Uint8Array(t);
                    for (let t = 0, o = 0; t < e.length; t++) {
                        const n = e[t];
                        r.set(n, o), o += n.length
                    }
                    return r
                }, t.checkOpts = function(e, t) {
                    if (void 0 !== t && "[object Object]" !== {}.toString.call(t)) throw new Error("Options should be object or undefined");
                    return Object.assign(e, t)
                }, t.wrapConstructor = function(e) {
                    const t = t => e().update(c(t)).digest(),
                        r = e();
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
                }, t.wrapConstructorWithOpts = function(e) {
                    const t = (t, r) => e(r).update(c(t)).digest(),
                        r = e({});
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
                }, t.wrapXOFConstructorWithOpts = function(e) {
                    const t = (t, r) => e(r).update(c(t)).digest(),
                        r = e({});
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
                }, t.randomBytes = function(e = 32) {
                    if (o.crypto && "function" == typeof o.crypto.getRandomValues) return o.crypto.getRandomValues(new Uint8Array(e));
                    if (o.crypto && "function" == typeof o.crypto.randomBytes) return o.crypto.randomBytes(e);
                    throw new Error("crypto.getRandomValues must be defined")
                };
                const o = r(827),
                    n = r(4007);
                t.u8 = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength), t.u32 = e => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), t.createView = e => new DataView(e.buffer, e.byteOffset, e.byteLength), t.rotr = (e, t) => e << 32 - t | e >>> t, t.rotl = (e, t) => e << t | e >>> 32 - t >>> 0, t.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0], t.byteSwap = e => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255, t.byteSwapIfBE = t.isLE ? e => e : e => (0, t.byteSwap)(e);
                const i = Array.from({
                        length: 256
                    }, ((e, t) => t.toString(16).padStart(2, "0"))),
                    a = {
                        _0: 48,
                        _9: 57,
                        A: 65,
                        F: 70,
                        a: 97,
                        f: 102
                    };

                function s(e) {
                    return e >= a._0 && e <= a._9 ? e - a._0 : e >= a.A && e <= a.F ? e - (a.A - 10) : e >= a.a && e <= a.f ? e - (a.a - 10) : void 0
                }

                function u(e) {
                    if ("string" != typeof e) throw new Error("utf8ToBytes expected string, got " + typeof e);
                    return new Uint8Array((new TextEncoder).encode(e))
                }

                function c(e) {
                    return "string" == typeof e && (e = u(e)), (0, n.abytes)(e), e
                }
                t.nextTick = async () => {}, t.Hash = class {
                    clone() {
                        return this._cloneInto()
                    }
                }
            },
            7210: (e, t) => {
                "use strict";

                function r(e) {
                    if (!Number.isSafeInteger(e) || e < 0) throw new Error("positive integer expected, got " + e)
                }

                function o(e, ...t) {
                    if (!((r = e) instanceof Uint8Array || ArrayBuffer.isView(r) && "Uint8Array" === r.constructor.name)) throw new Error("Uint8Array expected");
                    var r;
                    if (t.length > 0 && !t.includes(e.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length)
                }

                function n(e) {
                    if ("function" != typeof e || "function" != typeof e.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
                    r(e.outputLen), r(e.blockLen)
                }

                function i(e, t = !0) {
                    if (e.destroyed) throw new Error("Hash instance has been destroyed");
                    if (t && e.finished) throw new Error("Hash#digest() has already been called")
                }

                function a(e, t) {
                    o(e);
                    const r = t.outputLen;
                    if (e.length < r) throw new Error("digestInto() expects output buffer of length at least " + r)
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.anumber = r, t.number = r, t.abytes = o, t.bytes = o, t.ahash = n, t.aexists = i, t.aoutput = a;
                const s = {
                    number: r,
                    bytes: o,
                    hash: n,
                    exists: i,
                    output: a
                };
                t.default = s
            },
            6545: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.HashMD = t.Maj = t.Chi = void 0;
                const o = r(7210),
                    n = r(628);
                t.Chi = (e, t, r) => e & t ^ ~e & r, t.Maj = (e, t, r) => e & t ^ e & r ^ t & r;
                class i extends n.Hash {
                    constructor(e, t, r, o) {
                        super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = (0, n.createView)(this.buffer)
                    }
                    update(e) {
                        (0, o.aexists)(this);
                        const {
                            view: t,
                            buffer: r,
                            blockLen: i
                        } = this, a = (e = (0, n.toBytes)(e)).length;
                        for (let o = 0; o < a;) {
                            const s = Math.min(i - this.pos, a - o);
                            if (s !== i) r.set(e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === i && (this.process(t, 0), this.pos = 0);
                            else {
                                const t = (0, n.createView)(e);
                                for (; i <= a - o; o += i) this.process(t, o)
                            }
                        }
                        return this.length += e.length, this.roundClean(), this
                    }
                    digestInto(e) {
                        (0, o.aexists)(this), (0, o.aoutput)(e, this), this.finished = !0;
                        const {
                            buffer: t,
                            view: r,
                            blockLen: i,
                            isLE: a
                        } = this;
                        let {
                            pos: s
                        } = this;
                        t[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > i - s && (this.process(r, 0), s = 0);
                        for (let e = s; e < i; e++) t[e] = 0;
                        ! function(e, t, r, o) {
                            if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, o);
                            const n = BigInt(32),
                                i = BigInt(4294967295),
                                a = Number(r >> n & i),
                                s = Number(r & i),
                                u = o ? 4 : 0,
                                c = o ? 0 : 4;
                            e.setUint32(t + u, a, o), e.setUint32(t + c, s, o)
                        }(r, i - 8, BigInt(8 * this.length), a), this.process(r, 0);
                        const u = (0, n.createView)(e),
                            c = this.outputLen;
                        if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
                        const l = c / 4,
                            f = this.get();
                        if (l > f.length) throw new Error("_sha2: outputLen bigger than state");
                        for (let e = 0; e < l; e++) u.setUint32(4 * e, f[e], a)
                    }
                    digest() {
                        const {
                            buffer: e,
                            outputLen: t
                        } = this;
                        this.digestInto(e);
                        const r = e.slice(0, t);
                        return this.destroy(), r
                    }
                    _cloneInto(e) {
                        e || (e = new this.constructor), e.set(...this.get());
                        const {
                            blockLen: t,
                            buffer: r,
                            length: o,
                            finished: n,
                            destroyed: i,
                            pos: a
                        } = this;
                        return e.length = o, e.pos = a, e.finished = n, e.destroyed = i, o % t && e.buffer.set(r), e
                    }
                }
                t.HashMD = i
            },
            8843: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.add5L = t.add5H = t.add4H = t.add4L = t.add3H = t.add3L = t.rotlBL = t.rotlBH = t.rotlSL = t.rotlSH = t.rotr32L = t.rotr32H = t.rotrBL = t.rotrBH = t.rotrSL = t.rotrSH = t.shrSL = t.shrSH = t.toBig = void 0, t.fromBig = n, t.split = i, t.add = v;
                const r = BigInt(2 ** 32 - 1),
                    o = BigInt(32);

                function n(e, t = !1) {
                    return t ? {
                        h: Number(e & r),
                        l: Number(e >> o & r)
                    } : {
                        h: 0 | Number(e >> o & r),
                        l: 0 | Number(e & r)
                    }
                }

                function i(e, t = !1) {
                    let r = new Uint32Array(e.length),
                        o = new Uint32Array(e.length);
                    for (let i = 0; i < e.length; i++) {
                        const {
                            h: a,
                            l: s
                        } = n(e[i], t);
                        [r[i], o[i]] = [a, s]
                    }
                    return [r, o]
                }
                const a = (e, t) => BigInt(e >>> 0) << o | BigInt(t >>> 0);
                t.toBig = a;
                const s = (e, t, r) => e >>> r;
                t.shrSH = s;
                const u = (e, t, r) => e << 32 - r | t >>> r;
                t.shrSL = u;
                const c = (e, t, r) => e >>> r | t << 32 - r;
                t.rotrSH = c;
                const l = (e, t, r) => e << 32 - r | t >>> r;
                t.rotrSL = l;
                const f = (e, t, r) => e << 64 - r | t >>> r - 32;
                t.rotrBH = f;
                const d = (e, t, r) => e >>> r - 32 | t << 64 - r;
                t.rotrBL = d;
                const h = (e, t) => t;
                t.rotr32H = h;
                const p = (e, t) => e;
                t.rotr32L = p;
                const b = (e, t, r) => e << r | t >>> 32 - r;
                t.rotlSH = b;
                const g = (e, t, r) => t << r | e >>> 32 - r;
                t.rotlSL = g;
                const m = (e, t, r) => t << r - 32 | e >>> 64 - r;
                t.rotlBH = m;
                const y = (e, t, r) => e << r - 32 | t >>> 64 - r;

                function v(e, t, r, o) {
                    const n = (t >>> 0) + (o >>> 0);
                    return {
                        h: e + r + (n / 2 ** 32 | 0) | 0,
                        l: 0 | n
                    }
                }
                t.rotlBL = y;
                const w = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0);
                t.add3L = w;
                const k = (e, t, r, o) => t + r + o + (e / 2 ** 32 | 0) | 0;
                t.add3H = k;
                const E = (e, t, r, o) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (o >>> 0);
                t.add4L = E;
                const _ = (e, t, r, o, n) => t + r + o + n + (e / 2 ** 32 | 0) | 0;
                t.add4H = _;
                const S = (e, t, r, o, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (o >>> 0) + (n >>> 0);
                t.add5L = S;
                const T = (e, t, r, o, n, i) => t + r + o + n + i + (e / 2 ** 32 | 0) | 0;
                t.add5H = T;
                const x = {
                    fromBig: n,
                    split: i,
                    toBig: a,
                    shrSH: s,
                    shrSL: u,
                    rotrSH: c,
                    rotrSL: l,
                    rotrBH: f,
                    rotrBL: d,
                    rotr32H: h,
                    rotr32L: p,
                    rotlSH: b,
                    rotlSL: g,
                    rotlBH: m,
                    rotlBL: y,
                    add: v,
                    add3L: w,
                    add3H: k,
                    add4L: E,
                    add4H: _,
                    add5H: T,
                    add5L: S
                };
                t.default = x
            },
            1796: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.crypto = void 0, t.crypto = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0
            },
            8378: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.hmac = t.HMAC = void 0;
                const o = r(7210),
                    n = r(628);
                class i extends n.Hash {
                    constructor(e, t) {
                        super(), this.finished = !1, this.destroyed = !1, (0, o.ahash)(e);
                        const r = (0, n.toBytes)(t);
                        if (this.iHash = e.create(), "function" != typeof this.iHash.update) throw new Error("Expected instance of class which extends utils.Hash");
                        this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                        const i = this.blockLen,
                            a = new Uint8Array(i);
                        a.set(r.length > i ? e.create().update(r).digest() : r);
                        for (let e = 0; e < a.length; e++) a[e] ^= 54;
                        this.iHash.update(a), this.oHash = e.create();
                        for (let e = 0; e < a.length; e++) a[e] ^= 106;
                        this.oHash.update(a), a.fill(0)
                    }
                    update(e) {
                        return (0, o.aexists)(this), this.iHash.update(e), this
                    }
                    digestInto(e) {
                        (0, o.aexists)(this), (0, o.abytes)(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
                    }
                    digest() {
                        const e = new Uint8Array(this.oHash.outputLen);
                        return this.digestInto(e), e
                    }
                    _cloneInto(e) {
                        e || (e = Object.create(Object.getPrototypeOf(this), {}));
                        const {
                            oHash: t,
                            iHash: r,
                            finished: o,
                            destroyed: n,
                            blockLen: i,
                            outputLen: a
                        } = this;
                        return e.finished = o, e.destroyed = n, e.blockLen = i, e.outputLen = a, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
                    }
                    destroy() {
                        this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                    }
                }
                t.HMAC = i, t.hmac = (e, t, r) => new i(e, t).update(r).digest(), t.hmac.create = (e, t) => new i(e, t)
            },
            4700: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.pbkdf2 = function(e, t, r, o) {
                    const {
                        c: n,
                        dkLen: u,
                        DK: c,
                        PRF: l,
                        PRFSalt: f
                    } = a(e, t, r, o);
                    let d;
                    const h = new Uint8Array(4),
                        p = (0, i.createView)(h),
                        b = new Uint8Array(l.outputLen);
                    for (let e = 1, t = 0; t < u; e++, t += l.outputLen) {
                        const r = c.subarray(t, t + l.outputLen);
                        p.setInt32(0, e, !1), (d = f._cloneInto(d)).update(h).digestInto(b), r.set(b.subarray(0, r.length));
                        for (let e = 1; e < n; e++) {
                            l._cloneInto(d).update(b).digestInto(b);
                            for (let e = 0; e < r.length; e++) r[e] ^= b[e]
                        }
                    }
                    return s(l, f, c, d, b)
                }, t.pbkdf2Async = async function(e, t, r, o) {
                    const {
                        c: n,
                        dkLen: u,
                        asyncTick: c,
                        DK: l,
                        PRF: f,
                        PRFSalt: d
                    } = a(e, t, r, o);
                    let h;
                    const p = new Uint8Array(4),
                        b = (0, i.createView)(p),
                        g = new Uint8Array(f.outputLen);
                    for (let e = 1, t = 0; t < u; e++, t += f.outputLen) {
                        const r = l.subarray(t, t + f.outputLen);
                        b.setInt32(0, e, !1), (h = d._cloneInto(h)).update(p).digestInto(g), r.set(g.subarray(0, r.length)), await (0, i.asyncLoop)(n - 1, c, (() => {
                            f._cloneInto(h).update(g).digestInto(g);
                            for (let e = 0; e < r.length; e++) r[e] ^= g[e]
                        }))
                    }
                    return s(f, d, l, h, g)
                };
                const o = r(7210),
                    n = r(8378),
                    i = r(628);

                function a(e, t, r, a) {
                    (0, o.ahash)(e);
                    const s = (0, i.checkOpts)({
                            dkLen: 32,
                            asyncTick: 10
                        }, a),
                        {
                            c: u,
                            dkLen: c,
                            asyncTick: l
                        } = s;
                    if ((0, o.anumber)(u), (0, o.anumber)(c), (0, o.anumber)(l), u < 1) throw new Error("PBKDF2: iterations (c) should be >= 1");
                    const f = (0, i.toBytes)(t),
                        d = (0, i.toBytes)(r),
                        h = new Uint8Array(c),
                        p = n.hmac.create(e, f),
                        b = p._cloneInto().update(d);
                    return {
                        c: u,
                        dkLen: c,
                        asyncTick: l,
                        DK: h,
                        PRF: p,
                        PRFSalt: b
                    }
                }

                function s(e, t, r, o, n) {
                    return e.destroy(), t.destroy(), o && o.destroy(), n.fill(0), r
                }
            },
            9405: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ripemd160 = t.RIPEMD160 = void 0;
                const o = r(6545),
                    n = r(628),
                    i = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]),
                    a = new Uint8Array(new Array(16).fill(0).map(((e, t) => t)));
                let s = [a],
                    u = [a.map((e => (9 * e + 5) % 16))];
                for (let e = 0; e < 4; e++)
                    for (let t of [s, u]) t.push(t[e].map((e => i[e])));
                const c = [
                        [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
                        [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
                        [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
                        [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
                        [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
                    ].map((e => new Uint8Array(e))),
                    l = s.map(((e, t) => e.map((e => c[t][e])))),
                    f = u.map(((e, t) => e.map((e => c[t][e])))),
                    d = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                    h = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]);

                function p(e, t, r, o) {
                    return 0 === e ? t ^ r ^ o : 1 === e ? t & r | ~t & o : 2 === e ? (t | ~r) ^ o : 3 === e ? t & o | r & ~o : t ^ (r | ~o)
                }
                const b = new Uint32Array(16);
                class g extends o.HashMD {
                    constructor() {
                        super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776
                    }
                    get() {
                        const {
                            h0: e,
                            h1: t,
                            h2: r,
                            h3: o,
                            h4: n
                        } = this;
                        return [e, t, r, o, n]
                    }
                    set(e, t, r, o, n) {
                        this.h0 = 0 | e, this.h1 = 0 | t, this.h2 = 0 | r, this.h3 = 0 | o, this.h4 = 0 | n
                    }
                    process(e, t) {
                        for (let r = 0; r < 16; r++, t += 4) b[r] = e.getUint32(t, !0);
                        let r = 0 | this.h0,
                            o = r,
                            i = 0 | this.h1,
                            a = i,
                            c = 0 | this.h2,
                            g = c,
                            m = 0 | this.h3,
                            y = m,
                            v = 0 | this.h4,
                            w = v;
                        for (let e = 0; e < 5; e++) {
                            const t = 4 - e,
                                k = d[e],
                                E = h[e],
                                _ = s[e],
                                S = u[e],
                                T = l[e],
                                x = f[e];
                            for (let t = 0; t < 16; t++) {
                                const o = (0, n.rotl)(r + p(e, i, c, m) + b[_[t]] + k, T[t]) + v | 0;
                                r = v, v = m, m = 0 | (0, n.rotl)(c, 10), c = i, i = o
                            }
                            for (let e = 0; e < 16; e++) {
                                const r = (0, n.rotl)(o + p(t, a, g, y) + b[S[e]] + E, x[e]) + w | 0;
                                o = w, w = y, y = 0 | (0, n.rotl)(g, 10), g = a, a = r
                            }
                        }
                        this.set(this.h1 + c + y | 0, this.h2 + m + w | 0, this.h3 + v + o | 0, this.h4 + r + a | 0, this.h0 + i + g | 0)
                    }
                    roundClean() {
                        b.fill(0)
                    }
                    destroy() {
                        this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0)
                    }
                }
                t.RIPEMD160 = g, t.ripemd160 = (0, n.wrapConstructor)((() => new g))
            },
            6128: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.sha1 = t.SHA1 = void 0;
                const o = r(6545),
                    n = r(628),
                    i = new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
                    a = new Uint32Array(80);
                class s extends o.HashMD {
                    constructor() {
                        super(64, 20, 8, !1), this.A = 0 | i[0], this.B = 0 | i[1], this.C = 0 | i[2], this.D = 0 | i[3], this.E = 0 | i[4]
                    }
                    get() {
                        const {
                            A: e,
                            B: t,
                            C: r,
                            D: o,
                            E: n
                        } = this;
                        return [e, t, r, o, n]
                    }
                    set(e, t, r, o, n) {
                        this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | o, this.E = 0 | n
                    }
                    process(e, t) {
                        for (let r = 0; r < 16; r++, t += 4) a[r] = e.getUint32(t, !1);
                        for (let e = 16; e < 80; e++) a[e] = (0, n.rotl)(a[e - 3] ^ a[e - 8] ^ a[e - 14] ^ a[e - 16], 1);
                        let {
                            A: r,
                            B: i,
                            C: s,
                            D: u,
                            E: c
                        } = this;
                        for (let e = 0; e < 80; e++) {
                            let t, l;
                            e < 20 ? (t = (0, o.Chi)(i, s, u), l = 1518500249) : e < 40 ? (t = i ^ s ^ u, l = 1859775393) : e < 60 ? (t = (0, o.Maj)(i, s, u), l = 2400959708) : (t = i ^ s ^ u, l = 3395469782);
                            const f = (0, n.rotl)(r, 5) + t + c + l + a[e] | 0;
                            c = u, u = s, s = (0, n.rotl)(i, 30), i = r, r = f
                        }
                        r = r + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, u = u + this.D | 0, c = c + this.E | 0, this.set(r, i, s, u, c)
                    }
                    roundClean() {
                        a.fill(0)
                    }
                    destroy() {
                        this.set(0, 0, 0, 0, 0), this.buffer.fill(0)
                    }
                }
                t.SHA1 = s, t.sha1 = (0, n.wrapConstructor)((() => new s))
            },
            7494: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.sha224 = t.sha256 = t.SHA256 = void 0;
                const o = r(6545),
                    n = r(628),
                    i = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                    a = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                    s = new Uint32Array(64);
                class u extends o.HashMD {
                    constructor() {
                        super(64, 32, 8, !1), this.A = 0 | a[0], this.B = 0 | a[1], this.C = 0 | a[2], this.D = 0 | a[3], this.E = 0 | a[4], this.F = 0 | a[5], this.G = 0 | a[6], this.H = 0 | a[7]
                    }
                    get() {
                        const {
                            A: e,
                            B: t,
                            C: r,
                            D: o,
                            E: n,
                            F: i,
                            G: a,
                            H: s
                        } = this;
                        return [e, t, r, o, n, i, a, s]
                    }
                    set(e, t, r, o, n, i, a, s) {
                        this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | o, this.E = 0 | n, this.F = 0 | i, this.G = 0 | a, this.H = 0 | s
                    }
                    process(e, t) {
                        for (let r = 0; r < 16; r++, t += 4) s[r] = e.getUint32(t, !1);
                        for (let e = 16; e < 64; e++) {
                            const t = s[e - 15],
                                r = s[e - 2],
                                o = (0, n.rotr)(t, 7) ^ (0, n.rotr)(t, 18) ^ t >>> 3,
                                i = (0, n.rotr)(r, 17) ^ (0, n.rotr)(r, 19) ^ r >>> 10;
                            s[e] = i + s[e - 7] + o + s[e - 16] | 0
                        }
                        let {
                            A: r,
                            B: a,
                            C: u,
                            D: c,
                            E: l,
                            F: f,
                            G: d,
                            H: h
                        } = this;
                        for (let e = 0; e < 64; e++) {
                            const t = h + ((0, n.rotr)(l, 6) ^ (0, n.rotr)(l, 11) ^ (0, n.rotr)(l, 25)) + (0, o.Chi)(l, f, d) + i[e] + s[e] | 0,
                                p = ((0, n.rotr)(r, 2) ^ (0, n.rotr)(r, 13) ^ (0, n.rotr)(r, 22)) + (0, o.Maj)(r, a, u) | 0;
                            h = d, d = f, f = l, l = c + t | 0, c = u, u = a, a = r, r = t + p | 0
                        }
                        r = r + this.A | 0, a = a + this.B | 0, u = u + this.C | 0, c = c + this.D | 0, l = l + this.E | 0, f = f + this.F | 0, d = d + this.G | 0, h = h + this.H | 0, this.set(r, a, u, c, l, f, d, h)
                    }
                    roundClean() {
                        s.fill(0)
                    }
                    destroy() {
                        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                    }
                }
                t.SHA256 = u;
                class c extends u {
                    constructor() {
                        super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28
                    }
                }
                t.sha256 = (0, n.wrapConstructor)((() => new u)), t.sha224 = (0, n.wrapConstructor)((() => new c))
            },
            6439: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.sha384 = t.sha512_256 = t.sha512_224 = t.sha512 = t.SHA384 = t.SHA512_256 = t.SHA512_224 = t.SHA512 = void 0;
                const o = r(6545),
                    n = r(8843),
                    i = r(628),
                    [a, s] = (() => n.default.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((e => BigInt(e)))))(),
                    u = new Uint32Array(80),
                    c = new Uint32Array(80);
                class l extends o.HashMD {
                    constructor() {
                        super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
                    }
                    get() {
                        const {
                            Ah: e,
                            Al: t,
                            Bh: r,
                            Bl: o,
                            Ch: n,
                            Cl: i,
                            Dh: a,
                            Dl: s,
                            Eh: u,
                            El: c,
                            Fh: l,
                            Fl: f,
                            Gh: d,
                            Gl: h,
                            Hh: p,
                            Hl: b
                        } = this;
                        return [e, t, r, o, n, i, a, s, u, c, l, f, d, h, p, b]
                    }
                    set(e, t, r, o, n, i, a, s, u, c, l, f, d, h, p, b) {
                        this.Ah = 0 | e, this.Al = 0 | t, this.Bh = 0 | r, this.Bl = 0 | o, this.Ch = 0 | n, this.Cl = 0 | i, this.Dh = 0 | a, this.Dl = 0 | s, this.Eh = 0 | u, this.El = 0 | c, this.Fh = 0 | l, this.Fl = 0 | f, this.Gh = 0 | d, this.Gl = 0 | h, this.Hh = 0 | p, this.Hl = 0 | b
                    }
                    process(e, t) {
                        for (let r = 0; r < 16; r++, t += 4) u[r] = e.getUint32(t), c[r] = e.getUint32(t += 4);
                        for (let e = 16; e < 80; e++) {
                            const t = 0 | u[e - 15],
                                r = 0 | c[e - 15],
                                o = n.default.rotrSH(t, r, 1) ^ n.default.rotrSH(t, r, 8) ^ n.default.shrSH(t, r, 7),
                                i = n.default.rotrSL(t, r, 1) ^ n.default.rotrSL(t, r, 8) ^ n.default.shrSL(t, r, 7),
                                a = 0 | u[e - 2],
                                s = 0 | c[e - 2],
                                l = n.default.rotrSH(a, s, 19) ^ n.default.rotrBH(a, s, 61) ^ n.default.shrSH(a, s, 6),
                                f = n.default.rotrSL(a, s, 19) ^ n.default.rotrBL(a, s, 61) ^ n.default.shrSL(a, s, 6),
                                d = n.default.add4L(i, f, c[e - 7], c[e - 16]),
                                h = n.default.add4H(d, o, l, u[e - 7], u[e - 16]);
                            u[e] = 0 | h, c[e] = 0 | d
                        }
                        let {
                            Ah: r,
                            Al: o,
                            Bh: i,
                            Bl: l,
                            Ch: f,
                            Cl: d,
                            Dh: h,
                            Dl: p,
                            Eh: b,
                            El: g,
                            Fh: m,
                            Fl: y,
                            Gh: v,
                            Gl: w,
                            Hh: k,
                            Hl: E
                        } = this;
                        for (let e = 0; e < 80; e++) {
                            const t = n.default.rotrSH(b, g, 14) ^ n.default.rotrSH(b, g, 18) ^ n.default.rotrBH(b, g, 41),
                                _ = n.default.rotrSL(b, g, 14) ^ n.default.rotrSL(b, g, 18) ^ n.default.rotrBL(b, g, 41),
                                S = b & m ^ ~b & v,
                                T = g & y ^ ~g & w,
                                x = n.default.add5L(E, _, T, s[e], c[e]),
                                I = n.default.add5H(x, k, t, S, a[e], u[e]),
                                B = 0 | x,
                                A = n.default.rotrSH(r, o, 28) ^ n.default.rotrBH(r, o, 34) ^ n.default.rotrBH(r, o, 39),
                                O = n.default.rotrSL(r, o, 28) ^ n.default.rotrBL(r, o, 34) ^ n.default.rotrBL(r, o, 39),
                                P = r & i ^ r & f ^ i & f,
                                z = o & l ^ o & d ^ l & d;
                            k = 0 | v, E = 0 | w, v = 0 | m, w = 0 | y, m = 0 | b, y = 0 | g, ({
                                h: b,
                                l: g
                            } = n.default.add(0 | h, 0 | p, 0 | I, 0 | B)), h = 0 | f, p = 0 | d, f = 0 | i, d = 0 | l, i = 0 | r, l = 0 | o;
                            const j = n.default.add3L(B, O, z);
                            r = n.default.add3H(j, I, A, P), o = 0 | j
                        }({
                            h: r,
                            l: o
                        } = n.default.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | o)), ({
                            h: i,
                            l
                        } = n.default.add(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | l)), ({
                            h: f,
                            l: d
                        } = n.default.add(0 | this.Ch, 0 | this.Cl, 0 | f, 0 | d)), ({
                            h,
                            l: p
                        } = n.default.add(0 | this.Dh, 0 | this.Dl, 0 | h, 0 | p)), ({
                            h: b,
                            l: g
                        } = n.default.add(0 | this.Eh, 0 | this.El, 0 | b, 0 | g)), ({
                            h: m,
                            l: y
                        } = n.default.add(0 | this.Fh, 0 | this.Fl, 0 | m, 0 | y)), ({
                            h: v,
                            l: w
                        } = n.default.add(0 | this.Gh, 0 | this.Gl, 0 | v, 0 | w)), ({
                            h: k,
                            l: E
                        } = n.default.add(0 | this.Hh, 0 | this.Hl, 0 | k, 0 | E)), this.set(r, o, i, l, f, d, h, p, b, g, m, y, v, w, k, E)
                    }
                    roundClean() {
                        u.fill(0), c.fill(0)
                    }
                    destroy() {
                        this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                    }
                }
                t.SHA512 = l;
                class f extends l {
                    constructor() {
                        super(), this.Ah = -1942145080, this.Al = 424955298, this.Bh = 1944164710, this.Bl = -1982016298, this.Ch = 502970286, this.Cl = 855612546, this.Dh = 1738396948, this.Dl = 1479516111, this.Eh = 258812777, this.El = 2077511080, this.Fh = 2011393907, this.Fl = 79989058, this.Gh = 1067287976, this.Gl = 1780299464, this.Hh = 286451373, this.Hl = -1848208735, this.outputLen = 28
                    }
                }
                t.SHA512_224 = f;
                class d extends l {
                    constructor() {
                        super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32
                    }
                }
                t.SHA512_256 = d;
                class h extends l {
                    constructor() {
                        super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48
                    }
                }
                t.SHA384 = h, t.sha512 = (0, i.wrapConstructor)((() => new l)), t.sha512_224 = (0, i.wrapConstructor)((() => new f)), t.sha512_256 = (0, i.wrapConstructor)((() => new d)), t.sha384 = (0, i.wrapConstructor)((() => new h))
            },
            628: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = function(e) {
                    return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name
                }, t.byteSwap32 = function(e) {
                    for (let r = 0; r < e.length; r++) e[r] = (0, t.byteSwap)(e[r])
                }, t.bytesToHex = function(e) {
                    (0, n.abytes)(e);
                    let t = "";
                    for (let r = 0; r < e.length; r++) t += i[e[r]];
                    return t
                }, t.hexToBytes = function(e) {
                    if ("string" != typeof e) throw new Error("hex string expected, got " + typeof e);
                    const t = e.length,
                        r = t / 2;
                    if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
                    const o = new Uint8Array(r);
                    for (let t = 0, n = 0; t < r; t++, n += 2) {
                        const r = s(e.charCodeAt(n)),
                            i = s(e.charCodeAt(n + 1));
                        if (void 0 === r || void 0 === i) {
                            const t = e[n] + e[n + 1];
                            throw new Error('hex string expected, got non-hex character "' + t + '" at index ' + n)
                        }
                        o[t] = 16 * r + i
                    }
                    return o
                }, t.asyncLoop = async function(e, r, o) {
                    let n = Date.now();
                    for (let i = 0; i < e; i++) {
                        o(i);
                        const e = Date.now() - n;
                        e >= 0 && e < r || (await (0, t.nextTick)(), n += e)
                    }
                }, t.utf8ToBytes = u, t.toBytes = c, t.concatBytes = function(...e) {
                    let t = 0;
                    for (let r = 0; r < e.length; r++) {
                        const o = e[r];
                        (0, n.abytes)(o), t += o.length
                    }
                    const r = new Uint8Array(t);
                    for (let t = 0, o = 0; t < e.length; t++) {
                        const n = e[t];
                        r.set(n, o), o += n.length
                    }
                    return r
                }, t.checkOpts = function(e, t) {
                    if (void 0 !== t && "[object Object]" !== {}.toString.call(t)) throw new Error("Options should be object or undefined");
                    return Object.assign(e, t)
                }, t.wrapConstructor = function(e) {
                    const t = t => e().update(c(t)).digest(),
                        r = e();
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
                }, t.wrapConstructorWithOpts = function(e) {
                    const t = (t, r) => e(r).update(c(t)).digest(),
                        r = e({});
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
                }, t.wrapXOFConstructorWithOpts = function(e) {
                    const t = (t, r) => e(r).update(c(t)).digest(),
                        r = e({});
                    return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = t => e(t), t
                }, t.randomBytes = function(e = 32) {
                    if (o.crypto && "function" == typeof o.crypto.getRandomValues) return o.crypto.getRandomValues(new Uint8Array(e));
                    if (o.crypto && "function" == typeof o.crypto.randomBytes) return o.crypto.randomBytes(e);
                    throw new Error("crypto.getRandomValues must be defined")
                };
                const o = r(1796),
                    n = r(7210);
                t.u8 = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength), t.u32 = e => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), t.createView = e => new DataView(e.buffer, e.byteOffset, e.byteLength), t.rotr = (e, t) => e << 32 - t | e >>> t, t.rotl = (e, t) => e << t | e >>> 32 - t >>> 0, t.isLE = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0], t.byteSwap = e => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255, t.byteSwapIfBE = t.isLE ? e => e : e => (0, t.byteSwap)(e);
                const i = Array.from({
                        length: 256
                    }, ((e, t) => t.toString(16).padStart(2, "0"))),
                    a = {
                        _0: 48,
                        _9: 57,
                        A: 65,
                        F: 70,
                        a: 97,
                        f: 102
                    };

                function s(e) {
                    return e >= a._0 && e <= a._9 ? e - a._0 : e >= a.A && e <= a.F ? e - (a.A - 10) : e >= a.a && e <= a.f ? e - (a.a - 10) : void 0
                }

                function u(e) {
                    if ("string" != typeof e) throw new Error("utf8ToBytes expected string, got " + typeof e);
                    return new Uint8Array((new TextEncoder).encode(e))
                }

                function c(e) {
                    return "string" == typeof e && (e = u(e)), (0, n.abytes)(e), e
                }
                t.nextTick = async () => {}, t.Hash = class {
                    clone() {
                        return this._cloneInto()
                    }
                }
            },
            8916: (e, t, r) => {
                "use strict";
                var o = r(6671).Buffer;
                e.exports = function(e) {
                    if (e.length >= 255) throw new TypeError("Alphabet too long");
                    for (var t = new Uint8Array(256), r = 0; r < t.length; r++) t[r] = 255;
                    for (var n = 0; n < e.length; n++) {
                        var i = e.charAt(n),
                            a = i.charCodeAt(0);
                        if (255 !== t[a]) throw new TypeError(i + " is ambiguous");
                        t[a] = n
                    }
                    var s = e.length,
                        u = e.charAt(0),
                        c = Math.log(s) / Math.log(256),
                        l = Math.log(256) / Math.log(s);

                    function f(e) {
                        if ("string" != typeof e) throw new TypeError("Expected String");
                        if (0 === e.length) return o.alloc(0);
                        for (var r = 0, n = 0, i = 0; e[r] === u;) n++, r++;
                        for (var a = (e.length - r) * c + 1 >>> 0, l = new Uint8Array(a); r < e.length;) {
                            var f = t[e.charCodeAt(r)];
                            if (255 === f) return;
                            for (var d = 0, h = a - 1;
                                (0 !== f || d < i) && -1 !== h; h--, d++) f += s * l[h] >>> 0, l[h] = f % 256 >>> 0, f = f / 256 >>> 0;
                            if (0 !== f) throw new Error("Non-zero carry");
                            i = d, r++
                        }
                        for (var p = a - i; p !== a && 0 === l[p];) p++;
                        var b = o.allocUnsafe(n + (a - p));
                        b.fill(0, 0, n);
                        for (var g = n; p !== a;) b[g++] = l[p++];
                        return b
                    }
                    return {
                        encode: function(t) {
                            if ((Array.isArray(t) || t instanceof Uint8Array) && (t = o.from(t)), !o.isBuffer(t)) throw new TypeError("Expected Buffer");
                            if (0 === t.length) return "";
                            for (var r = 0, n = 0, i = 0, a = t.length; i !== a && 0 === t[i];) i++, r++;
                            for (var c = (a - i) * l + 1 >>> 0, f = new Uint8Array(c); i !== a;) {
                                for (var d = t[i], h = 0, p = c - 1;
                                    (0 !== d || h < n) && -1 !== p; p--, h++) d += 256 * f[p] >>> 0, f[p] = d % s >>> 0, d = d / s >>> 0;
                                if (0 !== d) throw new Error("Non-zero carry");
                                n = h, i++
                            }
                            for (var b = c - n; b !== c && 0 === f[b];) b++;
                            for (var g = u.repeat(r); b < c; ++b) g += e.charAt(f[b]);
                            return g
                        },
                        decodeUnsafe: f,
                        decode: function(e) {
                            var t = f(e);
                            if (t) return t;
                            throw new Error("Non-base" + s + " character")
                        }
                    }
                }
            },
            5912: e => {
                "use strict";
                e.exports = function(e) {
                    if (e.length >= 255) throw new TypeError("Alphabet too long");
                    for (var t = new Uint8Array(256), r = 0; r < t.length; r++) t[r] = 255;
                    for (var o = 0; o < e.length; o++) {
                        var n = e.charAt(o),
                            i = n.charCodeAt(0);
                        if (255 !== t[i]) throw new TypeError(n + " is ambiguous");
                        t[i] = o
                    }
                    var a = e.length,
                        s = e.charAt(0),
                        u = Math.log(a) / Math.log(256),
                        c = Math.log(256) / Math.log(a);

                    function l(e) {
                        if ("string" != typeof e) throw new TypeError("Expected String");
                        if (0 === e.length) return new Uint8Array;
                        for (var r = 0, o = 0, n = 0; e[r] === s;) o++, r++;
                        for (var i = (e.length - r) * u + 1 >>> 0, c = new Uint8Array(i); e[r];) {
                            var l = t[e.charCodeAt(r)];
                            if (255 === l) return;
                            for (var f = 0, d = i - 1;
                                (0 !== l || f < n) && -1 !== d; d--, f++) l += a * c[d] >>> 0, c[d] = l % 256 >>> 0, l = l / 256 >>> 0;
                            if (0 !== l) throw new Error("Non-zero carry");
                            n = f, r++
                        }
                        for (var h = i - n; h !== i && 0 === c[h];) h++;
                        for (var p = new Uint8Array(o + (i - h)), b = o; h !== i;) p[b++] = c[h++];
                        return p
                    }
                    return {
                        encode: function(t) {
                            if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
                            if (0 === t.length) return "";
                            for (var r = 0, o = 0, n = 0, i = t.length; n !== i && 0 === t[n];) n++, r++;
                            for (var u = (i - n) * c + 1 >>> 0, l = new Uint8Array(u); n !== i;) {
                                for (var f = t[n], d = 0, h = u - 1;
                                    (0 !== f || d < o) && -1 !== h; h--, d++) f += 256 * l[h] >>> 0, l[h] = f % a >>> 0, f = f / a >>> 0;
                                if (0 !== f) throw new Error("Non-zero carry");
                                o = d, n++
                            }
                            for (var p = u - o; p !== u && 0 === l[p];) p++;
                            for (var b = s.repeat(r); p < u; ++p) b += e.charAt(l[p]);
                            return b
                        },
                        decodeUnsafe: l,
                        decode: function(e) {
                            var t = l(e);
                            if (t) return t;
                            throw new Error("Non-base" + a + " character")
                        }
                    }
                }
            },
            5350: (e, t) => {
                "use strict";
                t.byteLength = function(e) {
                    var t = s(e),
                        r = t[0],
                        o = t[1];
                    return 3 * (r + o) / 4 - o
                }, t.toByteArray = function(e) {
                    var t, r, i = s(e),
                        a = i[0],
                        u = i[1],
                        c = new n(function(e, t, r) {
                            return 3 * (t + r) / 4 - r
                        }(0, a, u)),
                        l = 0,
                        f = u > 0 ? a - 4 : a;
                    for (r = 0; r < f; r += 4) t = o[e.charCodeAt(r)] << 18 | o[e.charCodeAt(r + 1)] << 12 | o[e.charCodeAt(r + 2)] << 6 | o[e.charCodeAt(r + 3)], c[l++] = t >> 16 & 255, c[l++] = t >> 8 & 255, c[l++] = 255 & t;
                    return 2 === u && (t = o[e.charCodeAt(r)] << 2 | o[e.charCodeAt(r + 1)] >> 4, c[l++] = 255 & t), 1 === u && (t = o[e.charCodeAt(r)] << 10 | o[e.charCodeAt(r + 1)] << 4 | o[e.charCodeAt(r + 2)] >> 2, c[l++] = t >> 8 & 255, c[l++] = 255 & t), c
                }, t.fromByteArray = function(e) {
                    for (var t, o = e.length, n = o % 3, i = [], a = 16383, s = 0, c = o - n; s < c; s += a) i.push(u(e, s, s + a > c ? c : s + a));
                    return 1 === n ? (t = e[o - 1], i.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === n && (t = (e[o - 2] << 8) + e[o - 1], i.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "=")), i.join("")
                };
                for (var r = [], o = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0; a < 64; ++a) r[a] = i[a], o[i.charCodeAt(a)] = a;

                function s(e) {
                    var t = e.length;
                    if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var r = e.indexOf("=");
                    return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
                }

                function u(e, t, o) {
                    for (var n, i, a = [], s = t; s < o; s += 3) n = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), a.push(r[(i = n) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
                    return a.join("")
                }
                o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
            },
            6976: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.bech32m = t.bech32 = void 0;
                const r = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
                    o = {};
                for (let e = 0; e < 32; e++) {
                    const t = r.charAt(e);
                    o[t] = e
                }

                function n(e) {
                    const t = e >> 25;
                    return (33554431 & e) << 5 ^ 996825010 & -(1 & t) ^ 642813549 & -(t >> 1 & 1) ^ 513874426 & -(t >> 2 & 1) ^ 1027748829 & -(t >> 3 & 1) ^ 705979059 & -(t >> 4 & 1)
                }

                function i(e) {
                    let t = 1;
                    for (let r = 0; r < e.length; ++r) {
                        const o = e.charCodeAt(r);
                        if (o < 33 || o > 126) return "Invalid prefix (" + e + ")";
                        t = n(t) ^ o >> 5
                    }
                    t = n(t);
                    for (let r = 0; r < e.length; ++r) {
                        const o = e.charCodeAt(r);
                        t = n(t) ^ 31 & o
                    }
                    return t
                }

                function a(e, t, r, o) {
                    let n = 0,
                        i = 0;
                    const a = (1 << r) - 1,
                        s = [];
                    for (let o = 0; o < e.length; ++o)
                        for (n = n << t | e[o], i += t; i >= r;) i -= r, s.push(n >> i & a);
                    if (o) i > 0 && s.push(n << r - i & a);
                    else {
                        if (i >= t) return "Excess padding";
                        if (n << r - i & a) return "Non-zero padding"
                    }
                    return s
                }

                function s(e) {
                    return a(e, 8, 5, !0)
                }

                function u(e) {
                    const t = a(e, 5, 8, !1);
                    if (Array.isArray(t)) return t
                }

                function c(e) {
                    const t = a(e, 5, 8, !1);
                    if (Array.isArray(t)) return t;
                    throw new Error(t)
                }

                function l(e) {
                    let t;

                    function a(e, r) {
                        if (r = r || 90, e.length < 8) return e + " too short";
                        if (e.length > r) return "Exceeds length limit";
                        const a = e.toLowerCase(),
                            s = e.toUpperCase();
                        if (e !== a && e !== s) return "Mixed-case string " + e;
                        const u = (e = a).lastIndexOf("1");
                        if (-1 === u) return "No separator character for " + e;
                        if (0 === u) return "Missing prefix for " + e;
                        const c = e.slice(0, u),
                            l = e.slice(u + 1);
                        if (l.length < 6) return "Data too short";
                        let f = i(c);
                        if ("string" == typeof f) return f;
                        const d = [];
                        for (let e = 0; e < l.length; ++e) {
                            const t = l.charAt(e),
                                r = o[t];
                            if (void 0 === r) return "Unknown character " + t;
                            f = n(f) ^ r, e + 6 >= l.length || d.push(r)
                        }
                        return f !== t ? "Invalid checksum for " + e : {
                            prefix: c,
                            words: d
                        }
                    }
                    return t = "bech32" === e ? 1 : 734539939, {
                        decodeUnsafe: function(e, t) {
                            const r = a(e, t);
                            if ("object" == typeof r) return r
                        },
                        decode: function(e, t) {
                            const r = a(e, t);
                            if ("object" == typeof r) return r;
                            throw new Error(r)
                        },
                        encode: function(e, o, a) {
                            if (a = a || 90, e.length + 7 + o.length > a) throw new TypeError("Exceeds length limit");
                            let s = i(e = e.toLowerCase());
                            if ("string" == typeof s) throw new Error(s);
                            let u = e + "1";
                            for (let e = 0; e < o.length; ++e) {
                                const t = o[e];
                                if (t >> 5) throw new Error("Non 5-bit word");
                                s = n(s) ^ t, u += r.charAt(t)
                            }
                            for (let e = 0; e < 6; ++e) s = n(s);
                            s ^= t;
                            for (let e = 0; e < 6; ++e) u += r.charAt(s >> 5 * (5 - e) & 31);
                            return u
                        },
                        toWords: s,
                        fromWordsUnsafe: u,
                        fromWords: c
                    }
                }
                t.bech32 = l("bech32"), t.bech32m = l("bech32m")
            },
            114: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(9664);

                function n(e, t, r) {
                    return o => {
                        if (e.has(o)) return;
                        const n = r.filter((e => e.key.toString("hex") === o))[0];
                        t.push(n), e.add(o)
                    }
                }

                function i(e) {
                    return e.globalMap.unsignedTx
                }

                function a(e) {
                    const t = new Set;
                    return e.forEach((e => {
                        const r = e.key.toString("hex");
                        if (t.has(r)) throw new Error("Combine: KeyValue Map keys should be unique");
                        t.add(r)
                    })), t
                }
                t.combine = function(e) {
                    const t = e[0],
                        r = o.psbtToKeyVals(t),
                        s = e.slice(1);
                    if (0 === s.length) throw new Error("Combine: Nothing to combine");
                    const u = i(t);
                    if (void 0 === u) throw new Error("Combine: Self missing transaction");
                    const c = a(r.globalKeyVals),
                        l = r.inputKeyVals.map(a),
                        f = r.outputKeyVals.map(a);
                    for (const e of s) {
                        const t = i(e);
                        if (void 0 === t || !t.toBuffer().equals(u.toBuffer())) throw new Error("Combine: One of the Psbts does not have the same transaction.");
                        const s = o.psbtToKeyVals(e);
                        a(s.globalKeyVals).forEach(n(c, r.globalKeyVals, s.globalKeyVals)), s.inputKeyVals.map(a).forEach(((e, t) => e.forEach(n(l[t], r.inputKeyVals[t], s.inputKeyVals[t])))), s.outputKeyVals.map(a).forEach(((e, t) => e.forEach(n(f[t], r.outputKeyVals[t], s.outputKeyVals[t]))))
                    }
                    return o.psbtFromKeyVals(u, {
                        globalMapKeyVals: r.globalKeyVals,
                        inputKeyVals: r.inputKeyVals,
                        outputKeyVals: r.outputKeyVals
                    })
                }
            },
            3441: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.GlobalTypes.GLOBAL_XPUB) throw new Error("Decode Error: could not decode globalXpub with key 0x" + e.key.toString("hex"));
                    if (79 !== e.key.length || ![2, 3].includes(e.key[46])) throw new Error("Decode Error: globalXpub has invalid extended pubkey in key 0x" + e.key.toString("hex"));
                    if (e.value.length / 4 % 1 != 0) throw new Error("Decode Error: Global GLOBAL_XPUB value length should be multiple of 4");
                    const t = e.key.slice(1),
                        r = {
                            masterFingerprint: e.value.slice(0, 4),
                            extendedPubkey: t,
                            path: "m"
                        };
                    for (const t of (n = e.value.length / 4 - 1, [...Array(n).keys()])) {
                        const o = e.value.readUInt32LE(4 * t + 4),
                            n = !!(2147483648 & o),
                            i = 2147483647 & o;
                        r.path += "/" + i.toString(10) + (n ? "'" : "")
                    }
                    var n;
                    return r
                }, t.encode = function(e) {
                    const t = Buffer.from([o.GlobalTypes.GLOBAL_XPUB]),
                        r = Buffer.concat([t, e.extendedPubkey]),
                        n = e.path.split("/"),
                        i = Buffer.allocUnsafe(4 * n.length);
                    e.masterFingerprint.copy(i, 0);
                    let a = 4;
                    return n.slice(1).forEach((e => {
                        const t = "'" === e.slice(-1);
                        let r = 2147483647 & parseInt(t ? e.slice(0, -1) : e, 10);
                        t && (r += 2147483648), i.writeUInt32LE(r, a), a += 4
                    })), {
                        key: r,
                        value: i
                    }
                }, t.expected = "{ masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; }", t.check = function(e) {
                    const t = e.extendedPubkey,
                        r = e.masterFingerprint,
                        o = e.path;
                    return Buffer.isBuffer(t) && 78 === t.length && [2, 3].indexOf(t[45]) > -1 && Buffer.isBuffer(r) && 4 === r.length && "string" == typeof o && !!o.match(/^m(\/\d+'?)*$/)
                }, t.canAddToArray = function(e, t, r) {
                    const o = t.extendedPubkey.toString("hex");
                    return !r.has(o) && (r.add(o), 0 === e.filter((e => e.extendedPubkey.equals(t.extendedPubkey))).length)
                }
            },
            5774: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.encode = function(e) {
                    return {
                        key: Buffer.from([o.GlobalTypes.UNSIGNED_TX]),
                        value: e.toBuffer()
                    }
                }
            },
            6933: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849),
                    n = r(3441),
                    i = r(5774),
                    a = r(8984),
                    s = r(2530),
                    u = r(7474),
                    c = r(2274),
                    l = r(3058),
                    f = r(1599),
                    d = r(6471),
                    h = r(5184),
                    p = r(8169),
                    b = r(2219),
                    g = r(9805),
                    m = r(2702),
                    y = r(7032),
                    v = r(1693),
                    w = r(3232),
                    k = r(2391),
                    E = r(5208),
                    _ = r(5791),
                    S = {
                        unsignedTx: i,
                        globalXpub: n,
                        checkPubkey: v.makeChecker([])
                    };
                t.globals = S;
                const T = {
                    nonWitnessUtxo: u,
                    partialSig: c,
                    sighashType: f,
                    finalScriptSig: a,
                    finalScriptWitness: s,
                    porCommitment: l,
                    witnessUtxo: g,
                    bip32Derivation: y.makeConverter(o.InputTypes.BIP32_DERIVATION),
                    redeemScript: w.makeConverter(o.InputTypes.REDEEM_SCRIPT),
                    witnessScript: _.makeConverter(o.InputTypes.WITNESS_SCRIPT),
                    checkPubkey: v.makeChecker([o.InputTypes.PARTIAL_SIG, o.InputTypes.BIP32_DERIVATION]),
                    tapKeySig: d,
                    tapScriptSig: b,
                    tapLeafScript: h,
                    tapBip32Derivation: k.makeConverter(o.InputTypes.TAP_BIP32_DERIVATION),
                    tapInternalKey: E.makeConverter(o.InputTypes.TAP_INTERNAL_KEY),
                    tapMerkleRoot: p
                };
                t.inputs = T;
                const x = {
                    bip32Derivation: y.makeConverter(o.OutputTypes.BIP32_DERIVATION),
                    redeemScript: w.makeConverter(o.OutputTypes.REDEEM_SCRIPT),
                    witnessScript: _.makeConverter(o.OutputTypes.WITNESS_SCRIPT),
                    checkPubkey: v.makeChecker([o.OutputTypes.BIP32_DERIVATION]),
                    tapBip32Derivation: k.makeConverter(o.OutputTypes.TAP_BIP32_DERIVATION),
                    tapTree: m,
                    tapInternalKey: E.makeConverter(o.OutputTypes.TAP_INTERNAL_KEY)
                };
                t.outputs = x
            },
            8984: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.FINAL_SCRIPTSIG) throw new Error("Decode Error: could not decode finalScriptSig with key 0x" + e.key.toString("hex"));
                    return e.value
                }, t.encode = function(e) {
                    return {
                        key: Buffer.from([o.InputTypes.FINAL_SCRIPTSIG]),
                        value: e
                    }
                }, t.expected = "Buffer", t.check = function(e) {
                    return Buffer.isBuffer(e)
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.finalScriptSig
                }
            },
            2530: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.FINAL_SCRIPTWITNESS) throw new Error("Decode Error: could not decode finalScriptWitness with key 0x" + e.key.toString("hex"));
                    return e.value
                }, t.encode = function(e) {
                    return {
                        key: Buffer.from([o.InputTypes.FINAL_SCRIPTWITNESS]),
                        value: e
                    }
                }, t.expected = "Buffer", t.check = function(e) {
                    return Buffer.isBuffer(e)
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.finalScriptWitness
                }
            },
            7474: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.NON_WITNESS_UTXO) throw new Error("Decode Error: could not decode nonWitnessUtxo with key 0x" + e.key.toString("hex"));
                    return e.value
                }, t.encode = function(e) {
                    return {
                        key: Buffer.from([o.InputTypes.NON_WITNESS_UTXO]),
                        value: e
                    }
                }, t.expected = "Buffer", t.check = function(e) {
                    return Buffer.isBuffer(e)
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.nonWitnessUtxo
                }
            },
            2274: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.PARTIAL_SIG) throw new Error("Decode Error: could not decode partialSig with key 0x" + e.key.toString("hex"));
                    if (34 !== e.key.length && 66 !== e.key.length || ![2, 3, 4].includes(e.key[1])) throw new Error("Decode Error: partialSig has invalid pubkey in key 0x" + e.key.toString("hex"));
                    return {
                        pubkey: e.key.slice(1),
                        signature: e.value
                    }
                }, t.encode = function(e) {
                    const t = Buffer.from([o.InputTypes.PARTIAL_SIG]);
                    return {
                        key: Buffer.concat([t, e.pubkey]),
                        value: e.signature
                    }
                }, t.expected = "{ pubkey: Buffer; signature: Buffer; }", t.check = function(e) {
                    return Buffer.isBuffer(e.pubkey) && Buffer.isBuffer(e.signature) && [33, 65].includes(e.pubkey.length) && [2, 3, 4].includes(e.pubkey[0]) && function(e) {
                        if (!Buffer.isBuffer(e) || e.length < 9) return !1;
                        if (48 !== e[0]) return !1;
                        if (e.length !== e[1] + 3) return !1;
                        if (2 !== e[2]) return !1;
                        const t = e[3];
                        if (t > 33 || t < 1) return !1;
                        if (2 !== e[3 + t + 1]) return !1;
                        const r = e[3 + t + 2];
                        return !(r > 33 || r < 1) && e.length === 3 + t + 2 + r + 2
                    }(e.signature)
                }, t.canAddToArray = function(e, t, r) {
                    const o = t.pubkey.toString("hex");
                    return !r.has(o) && (r.add(o), 0 === e.filter((e => e.pubkey.equals(t.pubkey))).length)
                }
            },
            3058: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.POR_COMMITMENT) throw new Error("Decode Error: could not decode porCommitment with key 0x" + e.key.toString("hex"));
                    return e.value.toString("utf8")
                }, t.encode = function(e) {
                    return {
                        key: Buffer.from([o.InputTypes.POR_COMMITMENT]),
                        value: Buffer.from(e, "utf8")
                    }
                }, t.expected = "string", t.check = function(e) {
                    return "string" == typeof e
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.porCommitment
                }
            },
            1599: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.SIGHASH_TYPE) throw new Error("Decode Error: could not decode sighashType with key 0x" + e.key.toString("hex"));
                    return e.value.readUInt32LE(0)
                }, t.encode = function(e) {
                    const t = Buffer.from([o.InputTypes.SIGHASH_TYPE]),
                        r = Buffer.allocUnsafe(4);
                    return r.writeUInt32LE(e, 0), {
                        key: t,
                        value: r
                    }
                }, t.expected = "number", t.check = function(e) {
                    return "number" == typeof e
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.sighashType
                }
            },
            6471: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);

                function n(e) {
                    return Buffer.isBuffer(e) && (64 === e.length || 65 === e.length)
                }
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.TAP_KEY_SIG || 1 !== e.key.length) throw new Error("Decode Error: could not decode tapKeySig with key 0x" + e.key.toString("hex"));
                    if (!n(e.value)) throw new Error("Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature");
                    return e.value
                }, t.encode = function(e) {
                    return {
                        key: Buffer.from([o.InputTypes.TAP_KEY_SIG]),
                        value: e
                    }
                }, t.expected = "Buffer", t.check = n, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.tapKeySig
                }
            },
            5184: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.TAP_LEAF_SCRIPT) throw new Error("Decode Error: could not decode tapLeafScript with key 0x" + e.key.toString("hex"));
                    if ((e.key.length - 2) % 32 != 0) throw new Error("Decode Error: tapLeafScript has invalid control block in key 0x" + e.key.toString("hex"));
                    const t = e.value[e.value.length - 1];
                    if ((254 & e.key[1]) !== t) throw new Error("Decode Error: tapLeafScript bad leaf version in key 0x" + e.key.toString("hex"));
                    const r = e.value.slice(0, -1);
                    return {
                        controlBlock: e.key.slice(1),
                        script: r,
                        leafVersion: t
                    }
                }, t.encode = function(e) {
                    const t = Buffer.from([o.InputTypes.TAP_LEAF_SCRIPT]),
                        r = Buffer.from([e.leafVersion]);
                    return {
                        key: Buffer.concat([t, e.controlBlock]),
                        value: Buffer.concat([e.script, r])
                    }
                }, t.expected = "{ controlBlock: Buffer; leafVersion: number, script: Buffer; }", t.check = function(e) {
                    return Buffer.isBuffer(e.controlBlock) && (e.controlBlock.length - 1) % 32 == 0 && (254 & e.controlBlock[0]) === e.leafVersion && Buffer.isBuffer(e.script)
                }, t.canAddToArray = function(e, t, r) {
                    const o = t.controlBlock.toString("hex");
                    return !r.has(o) && (r.add(o), 0 === e.filter((e => e.controlBlock.equals(t.controlBlock))).length)
                }
            },
            8169: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);

                function n(e) {
                    return Buffer.isBuffer(e) && 32 === e.length
                }
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.TAP_MERKLE_ROOT || 1 !== e.key.length) throw new Error("Decode Error: could not decode tapMerkleRoot with key 0x" + e.key.toString("hex"));
                    if (!n(e.value)) throw new Error("Decode Error: tapMerkleRoot not a 32-byte hash");
                    return e.value
                }, t.encode = function(e) {
                    return {
                        key: Buffer.from([o.InputTypes.TAP_MERKLE_ROOT]),
                        value: e
                    }
                }, t.expected = "Buffer", t.check = n, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.tapMerkleRoot
                }
            },
            2219: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.TAP_SCRIPT_SIG) throw new Error("Decode Error: could not decode tapScriptSig with key 0x" + e.key.toString("hex"));
                    if (65 !== e.key.length) throw new Error("Decode Error: tapScriptSig has invalid key 0x" + e.key.toString("hex"));
                    if (64 !== e.value.length && 65 !== e.value.length) throw new Error("Decode Error: tapScriptSig has invalid signature in key 0x" + e.key.toString("hex"));
                    return {
                        pubkey: e.key.slice(1, 33),
                        leafHash: e.key.slice(33),
                        signature: e.value
                    }
                }, t.encode = function(e) {
                    const t = Buffer.from([o.InputTypes.TAP_SCRIPT_SIG]);
                    return {
                        key: Buffer.concat([t, e.pubkey, e.leafHash]),
                        value: e.signature
                    }
                }, t.expected = "{ pubkey: Buffer; leafHash: Buffer; signature: Buffer; }", t.check = function(e) {
                    return Buffer.isBuffer(e.pubkey) && Buffer.isBuffer(e.leafHash) && Buffer.isBuffer(e.signature) && 32 === e.pubkey.length && 32 === e.leafHash.length && (64 === e.signature.length || 65 === e.signature.length)
                }, t.canAddToArray = function(e, t, r) {
                    const o = t.pubkey.toString("hex") + t.leafHash.toString("hex");
                    return !r.has(o) && (r.add(o), 0 === e.filter((e => e.pubkey.equals(t.pubkey) && e.leafHash.equals(t.leafHash))).length)
                }
            },
            9805: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849),
                    n = r(3218),
                    i = r(9043);
                t.decode = function(e) {
                    if (e.key[0] !== o.InputTypes.WITNESS_UTXO) throw new Error("Decode Error: could not decode witnessUtxo with key 0x" + e.key.toString("hex"));
                    const t = n.readUInt64LE(e.value, 0);
                    let r = 8;
                    const a = i.decode(e.value, r);
                    r += i.encodingLength(a);
                    const s = e.value.slice(r);
                    if (s.length !== a) throw new Error("Decode Error: WITNESS_UTXO script is not proper length");
                    return {
                        script: s,
                        value: t
                    }
                }, t.encode = function(e) {
                    const {
                        script: t,
                        value: r
                    } = e, a = i.encodingLength(t.length), s = Buffer.allocUnsafe(8 + a + t.length);
                    return n.writeUInt64LE(s, r, 0), i.encode(t.length, s, 8), t.copy(s, 8 + a), {
                        key: Buffer.from([o.InputTypes.WITNESS_UTXO]),
                        value: s
                    }
                }, t.expected = "{ script: Buffer; value: number; }", t.check = function(e) {
                    return Buffer.isBuffer(e.script) && "number" == typeof e.value
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.witnessUtxo
                }
            },
            2702: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(3849),
                    n = r(9043);
                t.decode = function(e) {
                    if (e.key[0] !== o.OutputTypes.TAP_TREE || 1 !== e.key.length) throw new Error("Decode Error: could not decode tapTree with key 0x" + e.key.toString("hex"));
                    let t = 0;
                    const r = [];
                    for (; t < e.value.length;) {
                        const o = e.value[t++],
                            i = e.value[t++],
                            a = n.decode(e.value, t);
                        t += n.encodingLength(a), r.push({
                            depth: o,
                            leafVersion: i,
                            script: e.value.slice(t, t + a)
                        }), t += a
                    }
                    return {
                        leaves: r
                    }
                }, t.encode = function(e) {
                    const t = Buffer.from([o.OutputTypes.TAP_TREE]),
                        r = [].concat(...e.leaves.map((e => [Buffer.of(e.depth, e.leafVersion), n.encode(e.script.length), e.script])));
                    return {
                        key: t,
                        value: Buffer.concat(r)
                    }
                }, t.expected = "{ leaves: [{ depth: number; leafVersion: number, script: Buffer; }] }", t.check = function(e) {
                    return Array.isArray(e.leaves) && e.leaves.every((e => e.depth >= 0 && e.depth <= 128 && (254 & e.leafVersion) === e.leafVersion && Buffer.isBuffer(e.script)))
                }, t.canAdd = function(e, t) {
                    return !!e && !!t && void 0 === e.tapTree
                }
            },
            7032: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const r = e => 33 === e.length && [2, 3].includes(e[0]) || 65 === e.length && 4 === e[0];
                t.makeConverter = function(e, t = r) {
                    return {
                        decode: function(r) {
                            if (r.key[0] !== e) throw new Error("Decode Error: could not decode bip32Derivation with key 0x" + r.key.toString("hex"));
                            const o = r.key.slice(1);
                            if (!t(o)) throw new Error("Decode Error: bip32Derivation has invalid pubkey in key 0x" + r.key.toString("hex"));
                            if (r.value.length / 4 % 1 != 0) throw new Error("Decode Error: Input BIP32_DERIVATION value length should be multiple of 4");
                            const n = {
                                masterFingerprint: r.value.slice(0, 4),
                                pubkey: o,
                                path: "m"
                            };
                            for (const e of (i = r.value.length / 4 - 1, [...Array(i).keys()])) {
                                const t = r.value.readUInt32LE(4 * e + 4),
                                    o = !!(2147483648 & t),
                                    i = 2147483647 & t;
                                n.path += "/" + i.toString(10) + (o ? "'" : "")
                            }
                            var i;
                            return n
                        },
                        encode: function(t) {
                            const r = Buffer.from([e]),
                                o = Buffer.concat([r, t.pubkey]),
                                n = t.path.split("/"),
                                i = Buffer.allocUnsafe(4 * n.length);
                            t.masterFingerprint.copy(i, 0);
                            let a = 4;
                            return n.slice(1).forEach((e => {
                                const t = "'" === e.slice(-1);
                                let r = 2147483647 & parseInt(t ? e.slice(0, -1) : e, 10);
                                t && (r += 2147483648), i.writeUInt32LE(r, a), a += 4
                            })), {
                                key: o,
                                value: i
                            }
                        },
                        check: function(e) {
                            return Buffer.isBuffer(e.pubkey) && Buffer.isBuffer(e.masterFingerprint) && "string" == typeof e.path && t(e.pubkey) && 4 === e.masterFingerprint.length
                        },
                        expected: "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; }",
                        canAddToArray: function(e, t, r) {
                            const o = t.pubkey.toString("hex");
                            return !r.has(o) && (r.add(o), 0 === e.filter((e => e.pubkey.equals(t.pubkey))).length)
                        }
                    }
                }
            },
            1693: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.makeChecker = function(e) {
                    return function(t) {
                        let r;
                        if (e.includes(t.key[0]) && (r = t.key.slice(1), 33 !== r.length && 65 !== r.length || ![2, 3, 4].includes(r[0]))) throw new Error("Format Error: invalid pubkey in key 0x" + t.key.toString("hex"));
                        return r
                    }
                }
            },
            3232: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.makeConverter = function(e) {
                    return {
                        decode: function(t) {
                            if (t.key[0] !== e) throw new Error("Decode Error: could not decode redeemScript with key 0x" + t.key.toString("hex"));
                            return t.value
                        },
                        encode: function(t) {
                            return {
                                key: Buffer.from([e]),
                                value: t
                            }
                        },
                        check: function(e) {
                            return Buffer.isBuffer(e)
                        },
                        expected: "Buffer",
                        canAdd: function(e, t) {
                            return !!e && !!t && void 0 === e.redeemScript
                        }
                    }
                }
            },
            2391: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(9043),
                    n = r(7032),
                    i = e => 32 === e.length;
                t.makeConverter = function(e) {
                    const t = n.makeConverter(e, i);
                    return {
                        decode: function(e) {
                            const r = o.decode(e.value),
                                n = o.encodingLength(r),
                                i = t.decode({
                                    key: e.key,
                                    value: e.value.slice(n + 32 * r)
                                }),
                                a = new Array(r);
                            for (let t = 0, o = n; t < r; t++, o += 32) a[t] = e.value.slice(o, o + 32);
                            return Object.assign({}, i, {
                                leafHashes: a
                            })
                        },
                        encode: function(e) {
                            const r = t.encode(e),
                                n = o.encodingLength(e.leafHashes.length),
                                i = Buffer.allocUnsafe(n);
                            o.encode(e.leafHashes.length, i);
                            const a = Buffer.concat([i, ...e.leafHashes, r.value]);
                            return Object.assign({}, r, {
                                value: a
                            })
                        },
                        check: function(e) {
                            return Array.isArray(e.leafHashes) && e.leafHashes.every((e => Buffer.isBuffer(e) && 32 === e.length)) && t.check(e)
                        },
                        expected: "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; leafHashes: Buffer[]; }",
                        canAddToArray: t.canAddToArray
                    }
                }
            },
            5208: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.makeConverter = function(e) {
                    return {
                        decode: function(t) {
                            if (t.key[0] !== e || 1 !== t.key.length) throw new Error("Decode Error: could not decode tapInternalKey with key 0x" + t.key.toString("hex"));
                            if (32 !== t.value.length) throw new Error("Decode Error: tapInternalKey not a 32-byte x-only pubkey");
                            return t.value
                        },
                        encode: function(t) {
                            return {
                                key: Buffer.from([e]),
                                value: t
                            }
                        },
                        check: function(e) {
                            return Buffer.isBuffer(e) && 32 === e.length
                        },
                        expected: "Buffer",
                        canAdd: function(e, t) {
                            return !!e && !!t && void 0 === e.tapInternalKey
                        }
                    }
                }
            },
            5791: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.makeConverter = function(e) {
                    return {
                        decode: function(t) {
                            if (t.key[0] !== e) throw new Error("Decode Error: could not decode witnessScript with key 0x" + t.key.toString("hex"));
                            return t.value
                        },
                        encode: function(t) {
                            return {
                                key: Buffer.from([e]),
                                value: t
                            }
                        },
                        check: function(e) {
                            return Buffer.isBuffer(e)
                        },
                        expected: "Buffer",
                        canAdd: function(e, t) {
                            return !!e && !!t && void 0 === e.witnessScript
                        }
                    }
                }
            },
            3218: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(9043);

                function n(e) {
                    const t = e.key.length,
                        r = e.value.length,
                        n = o.encodingLength(t),
                        i = o.encodingLength(r),
                        a = Buffer.allocUnsafe(n + t + i + r);
                    return o.encode(t, a, 0), e.key.copy(a, n), o.encode(r, a, n + t), e.value.copy(a, n + t + i), a
                }

                function i(e, t) {
                    if ("number" != typeof e) throw new Error("cannot write a non-number as a number");
                    if (e < 0) throw new Error("specified a negative value for writing an unsigned value");
                    if (e > t) throw new Error("RangeError: value out of range");
                    if (Math.floor(e) !== e) throw new Error("value has a fractional component")
                }
                t.range = e => [...Array(e).keys()], t.reverseBuffer = function(e) {
                    if (e.length < 1) return e;
                    let t = e.length - 1,
                        r = 0;
                    for (let o = 0; o < e.length / 2; o++) r = e[o], e[o] = e[t], e[t] = r, t--;
                    return e
                }, t.keyValsToBuffer = function(e) {
                    const t = e.map(n);
                    return t.push(Buffer.from([0])), Buffer.concat(t)
                }, t.keyValToBuffer = n, t.readUInt64LE = function(e, t) {
                    const r = e.readUInt32LE(t);
                    let o = e.readUInt32LE(t + 4);
                    return o *= 4294967296, i(o + r, 9007199254740991), o + r
                }, t.writeUInt64LE = function(e, t, r) {
                    return i(t, 9007199254740991), e.writeInt32LE(-1 & t, r), e.writeUInt32LE(Math.floor(t / 4294967296), r + 4), r + 8
                }
            },
            9043: (e, t) => {
                "use strict";

                function r(e) {
                    if (e < 0 || e > 9007199254740991 || e % 1 != 0) throw new RangeError("value out of range")
                }

                function o(e) {
                    return r(e), e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.encode = function e(t, n, i) {
                    if (r(t), n || (n = Buffer.allocUnsafe(o(t))), !Buffer.isBuffer(n)) throw new TypeError("buffer must be a Buffer instance");
                    return i || (i = 0), t < 253 ? (n.writeUInt8(t, i), Object.assign(e, {
                        bytes: 1
                    })) : t <= 65535 ? (n.writeUInt8(253, i), n.writeUInt16LE(t, i + 1), Object.assign(e, {
                        bytes: 3
                    })) : t <= 4294967295 ? (n.writeUInt8(254, i), n.writeUInt32LE(t, i + 1), Object.assign(e, {
                        bytes: 5
                    })) : (n.writeUInt8(255, i), n.writeUInt32LE(t >>> 0, i + 1), n.writeUInt32LE(t / 4294967296 | 0, i + 5), Object.assign(e, {
                        bytes: 9
                    })), n
                }, t.decode = function e(t, o) {
                    if (!Buffer.isBuffer(t)) throw new TypeError("buffer must be a Buffer instance");
                    o || (o = 0);
                    const n = t.readUInt8(o);
                    if (n < 253) return Object.assign(e, {
                        bytes: 1
                    }), n;
                    if (253 === n) return Object.assign(e, {
                        bytes: 3
                    }), t.readUInt16LE(o + 1);
                    if (254 === n) return Object.assign(e, {
                        bytes: 5
                    }), t.readUInt32LE(o + 1); {
                        Object.assign(e, {
                            bytes: 9
                        });
                        const n = t.readUInt32LE(o + 1),
                            i = 4294967296 * t.readUInt32LE(o + 5) + n;
                        return r(i), i
                    }
                }, t.encodingLength = o
            },
            440: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(6933),
                    n = r(3218),
                    i = r(9043),
                    a = r(3849);

                function s(e, t, r) {
                    if (!t.equals(Buffer.from([r]))) throw new Error(`Format Error: Invalid ${e} key: ${t.toString("hex")}`)
                }

                function u(e, {
                    globalMapKeyVals: t,
                    inputKeyVals: r,
                    outputKeyVals: i
                }) {
                    const u = {
                        unsignedTx: e
                    };
                    let c = 0;
                    for (const e of t) switch (e.key[0]) {
                        case a.GlobalTypes.UNSIGNED_TX:
                            if (s("global", e.key, a.GlobalTypes.UNSIGNED_TX), c > 0) throw new Error("Format Error: GlobalMap has multiple UNSIGNED_TX");
                            c++;
                            break;
                        case a.GlobalTypes.GLOBAL_XPUB:
                            void 0 === u.globalXpub && (u.globalXpub = []), u.globalXpub.push(o.globals.globalXpub.decode(e));
                            break;
                        default:
                            u.unknownKeyVals || (u.unknownKeyVals = []), u.unknownKeyVals.push(e)
                    }
                    const l = r.length,
                        f = i.length,
                        d = [],
                        h = [];
                    for (const e of n.range(l)) {
                        const t = {};
                        for (const n of r[e]) switch (o.inputs.checkPubkey(n), n.key[0]) {
                            case a.InputTypes.NON_WITNESS_UTXO:
                                if (s("input", n.key, a.InputTypes.NON_WITNESS_UTXO), void 0 !== t.nonWitnessUtxo) throw new Error("Format Error: Input has multiple NON_WITNESS_UTXO");
                                t.nonWitnessUtxo = o.inputs.nonWitnessUtxo.decode(n);
                                break;
                            case a.InputTypes.WITNESS_UTXO:
                                if (s("input", n.key, a.InputTypes.WITNESS_UTXO), void 0 !== t.witnessUtxo) throw new Error("Format Error: Input has multiple WITNESS_UTXO");
                                t.witnessUtxo = o.inputs.witnessUtxo.decode(n);
                                break;
                            case a.InputTypes.PARTIAL_SIG:
                                void 0 === t.partialSig && (t.partialSig = []), t.partialSig.push(o.inputs.partialSig.decode(n));
                                break;
                            case a.InputTypes.SIGHASH_TYPE:
                                if (s("input", n.key, a.InputTypes.SIGHASH_TYPE), void 0 !== t.sighashType) throw new Error("Format Error: Input has multiple SIGHASH_TYPE");
                                t.sighashType = o.inputs.sighashType.decode(n);
                                break;
                            case a.InputTypes.REDEEM_SCRIPT:
                                if (s("input", n.key, a.InputTypes.REDEEM_SCRIPT), void 0 !== t.redeemScript) throw new Error("Format Error: Input has multiple REDEEM_SCRIPT");
                                t.redeemScript = o.inputs.redeemScript.decode(n);
                                break;
                            case a.InputTypes.WITNESS_SCRIPT:
                                if (s("input", n.key, a.InputTypes.WITNESS_SCRIPT), void 0 !== t.witnessScript) throw new Error("Format Error: Input has multiple WITNESS_SCRIPT");
                                t.witnessScript = o.inputs.witnessScript.decode(n);
                                break;
                            case a.InputTypes.BIP32_DERIVATION:
                                void 0 === t.bip32Derivation && (t.bip32Derivation = []), t.bip32Derivation.push(o.inputs.bip32Derivation.decode(n));
                                break;
                            case a.InputTypes.FINAL_SCRIPTSIG:
                                s("input", n.key, a.InputTypes.FINAL_SCRIPTSIG), t.finalScriptSig = o.inputs.finalScriptSig.decode(n);
                                break;
                            case a.InputTypes.FINAL_SCRIPTWITNESS:
                                s("input", n.key, a.InputTypes.FINAL_SCRIPTWITNESS), t.finalScriptWitness = o.inputs.finalScriptWitness.decode(n);
                                break;
                            case a.InputTypes.POR_COMMITMENT:
                                s("input", n.key, a.InputTypes.POR_COMMITMENT), t.porCommitment = o.inputs.porCommitment.decode(n);
                                break;
                            case a.InputTypes.TAP_KEY_SIG:
                                s("input", n.key, a.InputTypes.TAP_KEY_SIG), t.tapKeySig = o.inputs.tapKeySig.decode(n);
                                break;
                            case a.InputTypes.TAP_SCRIPT_SIG:
                                void 0 === t.tapScriptSig && (t.tapScriptSig = []), t.tapScriptSig.push(o.inputs.tapScriptSig.decode(n));
                                break;
                            case a.InputTypes.TAP_LEAF_SCRIPT:
                                void 0 === t.tapLeafScript && (t.tapLeafScript = []), t.tapLeafScript.push(o.inputs.tapLeafScript.decode(n));
                                break;
                            case a.InputTypes.TAP_BIP32_DERIVATION:
                                void 0 === t.tapBip32Derivation && (t.tapBip32Derivation = []), t.tapBip32Derivation.push(o.inputs.tapBip32Derivation.decode(n));
                                break;
                            case a.InputTypes.TAP_INTERNAL_KEY:
                                s("input", n.key, a.InputTypes.TAP_INTERNAL_KEY), t.tapInternalKey = o.inputs.tapInternalKey.decode(n);
                                break;
                            case a.InputTypes.TAP_MERKLE_ROOT:
                                s("input", n.key, a.InputTypes.TAP_MERKLE_ROOT), t.tapMerkleRoot = o.inputs.tapMerkleRoot.decode(n);
                                break;
                            default:
                                t.unknownKeyVals || (t.unknownKeyVals = []), t.unknownKeyVals.push(n)
                        }
                        d.push(t)
                    }
                    for (const e of n.range(f)) {
                        const t = {};
                        for (const r of i[e]) switch (o.outputs.checkPubkey(r), r.key[0]) {
                            case a.OutputTypes.REDEEM_SCRIPT:
                                if (s("output", r.key, a.OutputTypes.REDEEM_SCRIPT), void 0 !== t.redeemScript) throw new Error("Format Error: Output has multiple REDEEM_SCRIPT");
                                t.redeemScript = o.outputs.redeemScript.decode(r);
                                break;
                            case a.OutputTypes.WITNESS_SCRIPT:
                                if (s("output", r.key, a.OutputTypes.WITNESS_SCRIPT), void 0 !== t.witnessScript) throw new Error("Format Error: Output has multiple WITNESS_SCRIPT");
                                t.witnessScript = o.outputs.witnessScript.decode(r);
                                break;
                            case a.OutputTypes.BIP32_DERIVATION:
                                void 0 === t.bip32Derivation && (t.bip32Derivation = []), t.bip32Derivation.push(o.outputs.bip32Derivation.decode(r));
                                break;
                            case a.OutputTypes.TAP_INTERNAL_KEY:
                                s("output", r.key, a.OutputTypes.TAP_INTERNAL_KEY), t.tapInternalKey = o.outputs.tapInternalKey.decode(r);
                                break;
                            case a.OutputTypes.TAP_TREE:
                                s("output", r.key, a.OutputTypes.TAP_TREE), t.tapTree = o.outputs.tapTree.decode(r);
                                break;
                            case a.OutputTypes.TAP_BIP32_DERIVATION:
                                void 0 === t.tapBip32Derivation && (t.tapBip32Derivation = []), t.tapBip32Derivation.push(o.outputs.tapBip32Derivation.decode(r));
                                break;
                            default:
                                t.unknownKeyVals || (t.unknownKeyVals = []), t.unknownKeyVals.push(r)
                        }
                        h.push(t)
                    }
                    return {
                        globalMap: u,
                        inputs: d,
                        outputs: h
                    }
                }
                t.psbtFromBuffer = function(e, t) {
                    let r = 0;

                    function o() {
                        const t = i.decode(e, r);
                        r += i.encodingLength(t);
                        const o = e.slice(r, r + t);
                        return r += t, o
                    }

                    function s() {
                        return {
                            key: o(),
                            value: o()
                        }
                    }

                    function c() {
                        if (r >= e.length) throw new Error("Format Error: Unexpected End of PSBT");
                        const t = 0 === e.readUInt8(r);
                        return t && r++, t
                    }
                    if (1886610036 !== function() {
                            const t = e.readUInt32BE(r);
                            return r += 4, t
                        }()) throw new Error("Format Error: Invalid Magic Number");
                    if (255 !== function() {
                            const t = e.readUInt8(r);
                            return r += 1, t
                        }()) throw new Error("Format Error: Magic Number must be followed by 0xff separator");
                    const l = [],
                        f = {};
                    for (; !c();) {
                        const e = s(),
                            t = e.key.toString("hex");
                        if (f[t]) throw new Error("Format Error: Keys must be unique for global keymap: key " + t);
                        f[t] = 1, l.push(e)
                    }
                    const d = l.filter((e => e.key[0] === a.GlobalTypes.UNSIGNED_TX));
                    if (1 !== d.length) throw new Error("Format Error: Only one UNSIGNED_TX allowed");
                    const h = t(d[0].value),
                        {
                            inputCount: p,
                            outputCount: b
                        } = h.getInputOutputCounts(),
                        g = [],
                        m = [];
                    for (const e of n.range(p)) {
                        const t = {},
                            r = [];
                        for (; !c();) {
                            const o = s(),
                                n = o.key.toString("hex");
                            if (t[n]) throw new Error("Format Error: Keys must be unique for each input: input index " + e + " key " + n);
                            t[n] = 1, r.push(o)
                        }
                        g.push(r)
                    }
                    for (const e of n.range(b)) {
                        const t = {},
                            r = [];
                        for (; !c();) {
                            const o = s(),
                                n = o.key.toString("hex");
                            if (t[n]) throw new Error("Format Error: Keys must be unique for each output: output index " + e + " key " + n);
                            t[n] = 1, r.push(o)
                        }
                        m.push(r)
                    }
                    return u(h, {
                        globalMapKeyVals: l,
                        inputKeyVals: g,
                        outputKeyVals: m
                    })
                }, t.checkKeyBuffer = s, t.psbtFromKeyVals = u
            },
            9664: (e, t, r) => {
                "use strict";

                function o(e) {
                    for (var r in e) t.hasOwnProperty(r) || (t[r] = e[r])
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), o(r(440)), o(r(5817))
            },
            5817: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(6933),
                    n = r(3218);
                t.psbtToBuffer = function({
                    globalMap: e,
                    inputs: t,
                    outputs: r
                }) {
                    const {
                        globalKeyVals: o,
                        inputKeyVals: i,
                        outputKeyVals: a
                    } = s({
                        globalMap: e,
                        inputs: t,
                        outputs: r
                    }), u = n.keyValsToBuffer(o), c = e => 0 === e.length ? [Buffer.from([0])] : e.map(n.keyValsToBuffer), l = c(i), f = c(a), d = Buffer.allocUnsafe(5);
                    return d.writeUIntBE(482972169471, 0, 5), Buffer.concat([d, u].concat(l, f))
                };
                const i = (e, t) => e.key.compare(t.key);

                function a(e, t) {
                    const r = new Set,
                        o = Object.entries(e).reduce(((e, [o, n]) => {
                            if ("unknownKeyVals" === o) return e;
                            const i = t[o];
                            if (void 0 === i) return e;
                            const a = (Array.isArray(n) ? n : [n]).map(i.encode);
                            return a.map((e => e.key.toString("hex"))).forEach((e => {
                                if (r.has(e)) throw new Error("Serialize Error: Duplicate key: " + e);
                                r.add(e)
                            })), e.concat(a)
                        }), []),
                        n = e.unknownKeyVals ? e.unknownKeyVals.filter((e => !r.has(e.key.toString("hex")))) : [];
                    return o.concat(n).sort(i)
                }

                function s({
                    globalMap: e,
                    inputs: t,
                    outputs: r
                }) {
                    return {
                        globalKeyVals: a(e, o.globals),
                        inputKeyVals: t.map((e => a(e, o.inputs))),
                        outputKeyVals: r.map((e => a(e, o.outputs)))
                    }
                }
                t.psbtToKeyVals = s
            },
            4611: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(114),
                    n = r(9664),
                    i = r(3849),
                    a = r(8759);
                t.Psbt = class {
                    constructor(e) {
                        this.inputs = [], this.outputs = [], this.globalMap = {
                            unsignedTx: e
                        }
                    }
                    static fromBase64(e, t) {
                        const r = Buffer.from(e, "base64");
                        return this.fromBuffer(r, t)
                    }
                    static fromHex(e, t) {
                        const r = Buffer.from(e, "hex");
                        return this.fromBuffer(r, t)
                    }
                    static fromBuffer(e, t) {
                        const r = n.psbtFromBuffer(e, t),
                            o = new this(r.globalMap.unsignedTx);
                        return Object.assign(o, r), o
                    }
                    toBase64() {
                        return this.toBuffer().toString("base64")
                    }
                    toHex() {
                        return this.toBuffer().toString("hex")
                    }
                    toBuffer() {
                        return n.psbtToBuffer(this)
                    }
                    updateGlobal(e) {
                        return a.updateGlobal(e, this.globalMap), this
                    }
                    updateInput(e, t) {
                        const r = a.checkForInput(this.inputs, e);
                        return a.updateInput(t, r), this
                    }
                    updateOutput(e, t) {
                        const r = a.checkForOutput(this.outputs, e);
                        return a.updateOutput(t, r), this
                    }
                    addUnknownKeyValToGlobal(e) {
                        return a.checkHasKey(e, this.globalMap.unknownKeyVals, a.getEnumLength(i.GlobalTypes)), this.globalMap.unknownKeyVals || (this.globalMap.unknownKeyVals = []), this.globalMap.unknownKeyVals.push(e), this
                    }
                    addUnknownKeyValToInput(e, t) {
                        const r = a.checkForInput(this.inputs, e);
                        return a.checkHasKey(t, r.unknownKeyVals, a.getEnumLength(i.InputTypes)), r.unknownKeyVals || (r.unknownKeyVals = []), r.unknownKeyVals.push(t), this
                    }
                    addUnknownKeyValToOutput(e, t) {
                        const r = a.checkForOutput(this.outputs, e);
                        return a.checkHasKey(t, r.unknownKeyVals, a.getEnumLength(i.OutputTypes)), r.unknownKeyVals || (r.unknownKeyVals = []), r.unknownKeyVals.push(t), this
                    }
                    addInput(e) {
                        this.globalMap.unsignedTx.addInput(e), this.inputs.push({
                            unknownKeyVals: []
                        });
                        const t = e.unknownKeyVals || [],
                            r = this.inputs.length - 1;
                        if (!Array.isArray(t)) throw new Error("unknownKeyVals must be an Array");
                        return t.forEach((e => this.addUnknownKeyValToInput(r, e))), a.addInputAttributes(this.inputs, e), this
                    }
                    addOutput(e) {
                        this.globalMap.unsignedTx.addOutput(e), this.outputs.push({
                            unknownKeyVals: []
                        });
                        const t = e.unknownKeyVals || [],
                            r = this.outputs.length - 1;
                        if (!Array.isArray(t)) throw new Error("unknownKeyVals must be an Array");
                        return t.forEach((e => this.addUnknownKeyValToOutput(r, e))), a.addOutputAttributes(this.outputs, e), this
                    }
                    clearFinalizedInput(e) {
                        const t = a.checkForInput(this.inputs, e);
                        a.inputCheckUncleanFinalized(e, t);
                        for (const e of Object.keys(t))["witnessUtxo", "nonWitnessUtxo", "finalScriptSig", "finalScriptWitness", "unknownKeyVals"].includes(e) || delete t[e];
                        return this
                    }
                    combine(...e) {
                        const t = o.combine([this].concat(e));
                        return Object.assign(this, t), this
                    }
                    getTransaction() {
                        return this.globalMap.unsignedTx.toBuffer()
                    }
                }
            },
            3849: (e, t) => {
                "use strict";
                var r, o, n;
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), (n = t.GlobalTypes || (t.GlobalTypes = {}))[n.UNSIGNED_TX = 0] = "UNSIGNED_TX", n[n.GLOBAL_XPUB = 1] = "GLOBAL_XPUB", t.GLOBAL_TYPE_NAMES = ["unsignedTx", "globalXpub"], (o = t.InputTypes || (t.InputTypes = {}))[o.NON_WITNESS_UTXO = 0] = "NON_WITNESS_UTXO", o[o.WITNESS_UTXO = 1] = "WITNESS_UTXO", o[o.PARTIAL_SIG = 2] = "PARTIAL_SIG", o[o.SIGHASH_TYPE = 3] = "SIGHASH_TYPE", o[o.REDEEM_SCRIPT = 4] = "REDEEM_SCRIPT", o[o.WITNESS_SCRIPT = 5] = "WITNESS_SCRIPT", o[o.BIP32_DERIVATION = 6] = "BIP32_DERIVATION", o[o.FINAL_SCRIPTSIG = 7] = "FINAL_SCRIPTSIG", o[o.FINAL_SCRIPTWITNESS = 8] = "FINAL_SCRIPTWITNESS", o[o.POR_COMMITMENT = 9] = "POR_COMMITMENT", o[o.TAP_KEY_SIG = 19] = "TAP_KEY_SIG", o[o.TAP_SCRIPT_SIG = 20] = "TAP_SCRIPT_SIG", o[o.TAP_LEAF_SCRIPT = 21] = "TAP_LEAF_SCRIPT", o[o.TAP_BIP32_DERIVATION = 22] = "TAP_BIP32_DERIVATION", o[o.TAP_INTERNAL_KEY = 23] = "TAP_INTERNAL_KEY", o[o.TAP_MERKLE_ROOT = 24] = "TAP_MERKLE_ROOT", t.INPUT_TYPE_NAMES = ["nonWitnessUtxo", "witnessUtxo", "partialSig", "sighashType", "redeemScript", "witnessScript", "bip32Derivation", "finalScriptSig", "finalScriptWitness", "porCommitment", "tapKeySig", "tapScriptSig", "tapLeafScript", "tapBip32Derivation", "tapInternalKey", "tapMerkleRoot"], (r = t.OutputTypes || (t.OutputTypes = {}))[r.REDEEM_SCRIPT = 0] = "REDEEM_SCRIPT", r[r.WITNESS_SCRIPT = 1] = "WITNESS_SCRIPT", r[r.BIP32_DERIVATION = 2] = "BIP32_DERIVATION", r[r.TAP_INTERNAL_KEY = 5] = "TAP_INTERNAL_KEY", r[r.TAP_TREE = 6] = "TAP_TREE", r[r.TAP_BIP32_DERIVATION = 7] = "TAP_BIP32_DERIVATION", t.OUTPUT_TYPE_NAMES = ["redeemScript", "witnessScript", "bip32Derivation", "tapInternalKey", "tapTree", "tapBip32Derivation"]
            },
            8759: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(6933);

                function n(e, t) {
                    const r = e[t];
                    if (void 0 === r) throw new Error(`No input #${t}`);
                    return r
                }

                function i(e, t) {
                    const r = e[t];
                    if (void 0 === r) throw new Error(`No output #${t}`);
                    return r
                }

                function a(e, t, r, o) {
                    throw new Error(`Data for ${e} key ${t} is incorrect: Expected ${r} and got ${JSON.stringify(o)}`)
                }

                function s(e) {
                    return (t, r) => {
                        for (const n of Object.keys(t)) {
                            const i = t[n],
                                {
                                    canAdd: s,
                                    canAddToArray: u,
                                    check: c,
                                    expected: l
                                } = o[e + "s"][n] || {};
                            if (c)
                                if (u) {
                                    if (!Array.isArray(i) || r[n] && !Array.isArray(r[n])) throw new Error(`Key type ${n} must be an array`);
                                    i.every(c) || a(e, n, l, i);
                                    const t = r[n] || [],
                                        o = new Set;
                                    if (!i.every((e => u(t, e, o)))) throw new Error("Can not add duplicate data to array");
                                    r[n] = t.concat(i)
                                } else {
                                    if (c(i) || a(e, n, l, i), !s(r, i)) throw new Error(`Can not add duplicate data to ${e}`);
                                    r[n] = i
                                }
                        }
                    }
                }
                t.checkForInput = n, t.checkForOutput = i, t.checkHasKey = function(e, t, r) {
                    if (e.key[0] < r) throw new Error("Use the method for your specific key instead of addUnknownKeyVal*");
                    if (t && 0 !== t.filter((t => t.key.equals(e.key))).length) throw new Error(`Duplicate Key: ${e.key.toString("hex")}`)
                }, t.getEnumLength = function(e) {
                    let t = 0;
                    return Object.keys(e).forEach((e => {
                        Number(isNaN(Number(e))) && t++
                    })), t
                }, t.inputCheckUncleanFinalized = function(e, t) {
                    let r = !1;
                    if (t.nonWitnessUtxo || t.witnessUtxo) {
                        const e = !!t.redeemScript,
                            o = !!t.witnessScript,
                            n = !e || !!t.finalScriptSig,
                            i = !o || !!t.finalScriptWitness,
                            a = !!t.finalScriptSig || !!t.finalScriptWitness;
                        r = n && i && a
                    }
                    if (!1 === r) throw new Error(`Input #${e} has too much or too little data to clean`)
                }, t.updateGlobal = s("global"), t.updateInput = s("input"), t.updateOutput = s("output"), t.addInputAttributes = function(e, r) {
                    const o = n(e, e.length - 1);
                    t.updateInput(r, o)
                }, t.addOutputAttributes = function(e, r) {
                    const o = i(e, e.length - 1);
                    t.updateOutput(r, o)
                }, t.defaultVersionSetter = function(e, t) {
                    if (!Buffer.isBuffer(t) || t.length < 4) throw new Error("Set Version: Invalid Transaction");
                    return t.writeUInt32LE(e, 0), t
                }, t.defaultLocktimeSetter = function(e, t) {
                    if (!Buffer.isBuffer(t) || t.length < 4) throw new Error("Set Locktime: Invalid Transaction");
                    return t.writeUInt32LE(e, t.length - 4), t
                }
            },
            4796: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = {};
                let n;
                t.wordlists = o, t._default = n;
                try {
                    t._default = n = r(6502), o.czech = n
                } catch (e) {}
                try {
                    t._default = n = r(1685), o.chinese_simplified = n
                } catch (e) {}
                try {
                    t._default = n = r(9272), o.chinese_traditional = n
                } catch (e) {}
                try {
                    t._default = n = r(8975), o.korean = n
                } catch (e) {}
                try {
                    t._default = n = r(1707), o.french = n
                } catch (e) {}
                try {
                    t._default = n = r(6709), o.italian = n
                } catch (e) {}
                try {
                    t._default = n = r(965), o.spanish = n
                } catch (e) {}
                try {
                    t._default = n = r(5684), o.japanese = n, o.JA = n
                } catch (e) {}
                try {
                    t._default = n = r(2838), o.portuguese = n
                } catch (e) {}
                try {
                    t._default = n = r(9237), o.english = n, o.EN = n
                } catch (e) {}
            },
            5696: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const o = r(7494),
                    n = r(6439),
                    i = r(4700),
                    a = r(628),
                    s = r(4796);
                let u = s._default;
                const c = "Invalid mnemonic",
                    l = "Invalid entropy",
                    f = "A wordlist is required but a default could not be found.\nPlease pass a 2048 word array explicitly.";

                function d(e) {
                    return (e || "").normalize("NFKD")
                }

                function h(e, t, r) {
                    for (; e.length < r;) e = t + e;
                    return e
                }

                function p(e) {
                    return parseInt(e, 2)
                }

                function b(e) {
                    return e.map((e => h(e.toString(2), "0", 8))).join("")
                }

                function g(e) {
                    const t = 8 * e.length / 32,
                        r = o.sha256(Uint8Array.from(e));
                    return b(Array.from(r)).slice(0, t)
                }

                function m(e) {
                    return "mnemonic" + (e || "")
                }

                function y(e, t) {
                    if (!(t = t || u)) throw new Error(f);
                    const r = d(e).split(" ");
                    if (r.length % 3 != 0) throw new Error(c);
                    const o = r.map((e => {
                            const r = t.indexOf(e);
                            if (-1 === r) throw new Error(c);
                            return h(r.toString(2), "0", 11)
                        })).join(""),
                        n = 32 * Math.floor(o.length / 33),
                        i = o.slice(0, n),
                        a = o.slice(n),
                        s = i.match(/(.{1,8})/g).map(p);
                    if (s.length < 16) throw new Error(l);
                    if (s.length > 32) throw new Error(l);
                    if (s.length % 4 != 0) throw new Error(l);
                    const b = Buffer.from(s);
                    if (g(b) !== a) throw new Error("Invalid mnemonic checksum");
                    return b.toString("hex")
                }

                function v(e, t) {
                    if (Buffer.isBuffer(e) || (e = Buffer.from(e, "hex")), !(t = t || u)) throw new Error(f);
                    if (e.length < 16) throw new TypeError(l);
                    if (e.length > 32) throw new TypeError(l);
                    if (e.length % 4 != 0) throw new TypeError(l);
                    const r = (b(Array.from(e)) + g(e)).match(/(.{1,11})/g).map((e => {
                        const r = p(e);
                        return t[r]
                    }));
                    return "あいこくしん" === t[0] ? r.join("　") : r.join(" ")
                }
                t.mnemonicToSeedSync = function(e, t) {
                    const r = Uint8Array.from(Buffer.from(d(e), "utf8")),
                        o = Uint8Array.from(Buffer.from(m(d(t)), "utf8")),
                        a = i.pbkdf2(n.sha512, r, o, {
                            c: 2048,
                            dkLen: 64
                        });
                    return Buffer.from(a)
                }, t.mnemonicToSeed = function(e, t) {
                    const r = Uint8Array.from(Buffer.from(d(e), "utf8")),
                        o = Uint8Array.from(Buffer.from(m(d(t)), "utf8"));
                    return i.pbkdf2Async(n.sha512, r, o, {
                        c: 2048,
                        dkLen: 64
                    }).then((e => Buffer.from(e)))
                }, t.mnemonicToEntropy = y, t.entropyToMnemonic = v, t.generateMnemonic = function(e, t, r) {
                    if ((e = e || 128) % 32 != 0) throw new TypeError(l);
                    return v((t = t || (e => Buffer.from(a.randomBytes(e))))(e / 8), r)
                }, t.validateMnemonic = function(e, t) {
                    try {
                        y(e, t)
                    } catch (e) {
                        return !1
                    }
                    return !0
                }, t.setDefaultWordlist = function(e) {
                    const t = s.wordlists[e];
                    if (!t) throw new Error('Could not find wordlist for language "' + e + '"');
                    u = t
                }, t.getDefaultWordlist = function() {
                    if (!u) throw new Error("No Default Wordlist set");
                    return Object.keys(s.wordlists).filter((e => "JA" !== e && "EN" !== e && s.wordlists[e].every(((e, t) => e === u[t]))))[0]
                };
                var w = r(4796);
                t.wordlists = w.wordlists
            },
            6774: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.toOutputScript = t.fromOutputScript = t.toBech32 = t.toBase58Check = t.fromBech32 = t.fromBase58Check = void 0;
                const o = r(2307),
                    n = r(9576),
                    i = r(6391),
                    a = r(547),
                    s = r(6976),
                    u = r(9383),
                    c = "WARNING: Sending to a future segwit version address can lead to loss of funds. End users MUST be warned carefully in the GUI and asked if they wish to proceed with caution. Wallets should verify the segwit version from the output of fromBech32, then decide when it is safe to use which version of segwit.";

                function l(e) {
                    const t = Buffer.from(u.decode(e));
                    if (t.length < 21) throw new TypeError(e + " is too short");
                    if (t.length > 21) throw new TypeError(e + " is too long");
                    return {
                        version: t.readUInt8(0),
                        hash: t.slice(1)
                    }
                }

                function f(e) {
                    let t, r;
                    try {
                        t = s.bech32.decode(e)
                    } catch (e) {}
                    if (t) {
                        if (r = t.words[0], 0 !== r) throw new TypeError(e + " uses wrong encoding")
                    } else if (t = s.bech32m.decode(e), r = t.words[0], 0 === r) throw new TypeError(e + " uses wrong encoding");
                    const o = s.bech32.fromWords(t.words.slice(1));
                    return {
                        version: r,
                        prefix: t.prefix,
                        data: Buffer.from(o)
                    }
                }

                function d(e, t, r) {
                    const o = s.bech32.toWords(e);
                    return o.unshift(t), 0 === t ? s.bech32.encode(r, o) : s.bech32m.encode(r, o)
                }
                t.fromBase58Check = l, t.fromBech32 = f, t.toBase58Check = function(e, t) {
                    (0, a.typeforce)((0, a.tuple)(a.Hash160bit, a.UInt8), arguments);
                    const r = Buffer.allocUnsafe(21);
                    return r.writeUInt8(t, 0), e.copy(r, 1), u.encode(r)
                }, t.toBech32 = d, t.fromOutputScript = function(e, t) {
                    t = t || o.bitcoin;
                    try {
                        return n.p2pkh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2sh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2wpkh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2wsh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2tr({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return function(e, t) {
                            const r = e.slice(2);
                            if (r.length < 2 || r.length > 40) throw new TypeError("Invalid program length for segwit address");
                            const o = e[0] - 80;
                            if (o < 2 || o > 16) throw new TypeError("Invalid version for segwit address");
                            if (e[1] !== r.length) throw new TypeError("Invalid script for segwit address");
                            return console.warn(c), d(r, o, t.bech32)
                        }(e, t)
                    } catch (e) {}
                    throw new Error(i.toASM(e) + " has no matching Address")
                }, t.toOutputScript = function(e, t) {
                    let r, a;
                    t = t || o.bitcoin;
                    try {
                        r = l(e)
                    } catch (e) {}
                    if (r) {
                        if (r.version === t.pubKeyHash) return n.p2pkh({
                            hash: r.hash
                        }).output;
                        if (r.version === t.scriptHash) return n.p2sh({
                            hash: r.hash
                        }).output
                    } else {
                        try {
                            a = f(e)
                        } catch (e) {}
                        if (a) {
                            if (a.prefix !== t.bech32) throw new Error(e + " has an invalid prefix");
                            if (0 === a.version) {
                                if (20 === a.data.length) return n.p2wpkh({
                                    hash: a.data
                                }).output;
                                if (32 === a.data.length) return n.p2wsh({
                                    hash: a.data
                                }).output
                            } else if (1 === a.version) {
                                if (32 === a.data.length) return n.p2tr({
                                    pubkey: a.data
                                }).output
                            } else if (a.version >= 2 && a.version <= 16 && a.data.length >= 2 && a.data.length <= 40) return console.warn(c), i.compile([a.version + 80, a.data])
                        }
                    }
                    throw new Error(e + " has no matching Script")
                }
            },
            8317: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.encode = t.decode = t.check = void 0, t.check = function(e) {
                    if (e.length < 8) return !1;
                    if (e.length > 72) return !1;
                    if (48 !== e[0]) return !1;
                    if (e[1] !== e.length - 2) return !1;
                    if (2 !== e[2]) return !1;
                    const t = e[3];
                    if (0 === t) return !1;
                    if (5 + t >= e.length) return !1;
                    if (2 !== e[4 + t]) return !1;
                    const r = e[5 + t];
                    return !(0 === r || 6 + t + r !== e.length || 128 & e[4] || t > 1 && 0 === e[4] && !(128 & e[5]) || 128 & e[t + 6] || r > 1 && 0 === e[t + 6] && !(128 & e[t + 7]))
                }, t.decode = function(e) {
                    if (e.length < 8) throw new Error("DER sequence length is too short");
                    if (e.length > 72) throw new Error("DER sequence length is too long");
                    if (48 !== e[0]) throw new Error("Expected DER sequence");
                    if (e[1] !== e.length - 2) throw new Error("DER sequence length is invalid");
                    if (2 !== e[2]) throw new Error("Expected DER integer");
                    const t = e[3];
                    if (0 === t) throw new Error("R length is zero");
                    if (5 + t >= e.length) throw new Error("R length is too long");
                    if (2 !== e[4 + t]) throw new Error("Expected DER integer (2)");
                    const r = e[5 + t];
                    if (0 === r) throw new Error("S length is zero");
                    if (6 + t + r !== e.length) throw new Error("S length is invalid");
                    if (128 & e[4]) throw new Error("R value is negative");
                    if (t > 1 && 0 === e[4] && !(128 & e[5])) throw new Error("R value excessively padded");
                    if (128 & e[t + 6]) throw new Error("S value is negative");
                    if (r > 1 && 0 === e[t + 6] && !(128 & e[t + 7])) throw new Error("S value excessively padded");
                    return {
                        r: e.slice(4, 4 + t),
                        s: e.slice(6 + t)
                    }
                }, t.encode = function(e, t) {
                    const r = e.length,
                        o = t.length;
                    if (0 === r) throw new Error("R length is zero");
                    if (0 === o) throw new Error("S length is zero");
                    if (r > 33) throw new Error("R length is too long");
                    if (o > 33) throw new Error("S length is too long");
                    if (128 & e[0]) throw new Error("R value is negative");
                    if (128 & t[0]) throw new Error("S value is negative");
                    if (r > 1 && 0 === e[0] && !(128 & e[1])) throw new Error("R value excessively padded");
                    if (o > 1 && 0 === t[0] && !(128 & t[1])) throw new Error("S value excessively padded");
                    const n = Buffer.allocUnsafe(6 + r + o);
                    return n[0] = 48, n[1] = n.length - 2, n[2] = 2, n[3] = e.length, e.copy(n, 4), n[4 + r] = 2, n[5 + r] = t.length, t.copy(n, 6 + r), n
                }
            },
            5183: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Block = void 0;
                const o = r(7809),
                    n = r(161),
                    i = r(7658),
                    a = r(2146),
                    s = r(547),
                    {
                        typeforce: u
                    } = s,
                    c = new TypeError("Cannot compute merkle root for zero transactions"),
                    l = new TypeError("Cannot compute witness commit for non-segwit block");
                class f {
                    constructor() {
                        this.version = 1, this.prevHash = void 0, this.merkleRoot = void 0, this.timestamp = 0, this.witnessCommit = void 0, this.bits = 0, this.nonce = 0, this.transactions = void 0
                    }
                    static fromBuffer(e) {
                        if (e.length < 80) throw new Error("Buffer too small (< 80 bytes)");
                        const t = new o.BufferReader(e),
                            r = new f;
                        if (r.version = t.readInt32(), r.prevHash = t.readSlice(32), r.merkleRoot = t.readSlice(32), r.timestamp = t.readUInt32(), r.bits = t.readUInt32(), r.nonce = t.readUInt32(), 80 === e.length) return r;
                        const n = () => {
                                const e = a.Transaction.fromBuffer(t.buffer.slice(t.offset), !0);
                                return t.offset += e.byteLength(), e
                            },
                            i = t.readVarInt();
                        r.transactions = [];
                        for (let e = 0; e < i; ++e) {
                            const e = n();
                            r.transactions.push(e)
                        }
                        const s = r.getWitnessCommit();
                        return s && (r.witnessCommit = s), r
                    }
                    static fromHex(e) {
                        return f.fromBuffer(Buffer.from(e, "hex"))
                    }
                    static calculateTarget(e) {
                        const t = ((4278190080 & e) >> 24) - 3,
                            r = 8388607 & e,
                            o = Buffer.alloc(32, 0);
                        return o.writeUIntBE(r, 29 - t, 3), o
                    }
                    static calculateMerkleRoot(e, t) {
                        if (u([{
                                getHash: s.Function
                            }], e), 0 === e.length) throw c;
                        if (t && !d(e)) throw l;
                        const r = e.map((e => e.getHash(t))),
                            o = (0, i.fastMerkleRoot)(r, n.hash256);
                        return t ? n.hash256(Buffer.concat([o, e[0].ins[0].witness[0]])) : o
                    }
                    getWitnessCommit() {
                        if (!d(this.transactions)) return null;
                        const e = this.transactions[0].outs.filter((e => e.script.slice(0, 6).equals(Buffer.from("6a24aa21a9ed", "hex")))).map((e => e.script.slice(6, 38)));
                        if (0 === e.length) return null;
                        const t = e[e.length - 1];
                        return t instanceof Buffer && 32 === t.length ? t : null
                    }
                    hasWitnessCommit() {
                        return this.witnessCommit instanceof Buffer && 32 === this.witnessCommit.length || null !== this.getWitnessCommit()
                    }
                    hasWitness() {
                        return (e = this.transactions) instanceof Array && e.some((e => "object" == typeof e && e.ins instanceof Array && e.ins.some((e => "object" == typeof e && e.witness instanceof Array && e.witness.length > 0))));
                        var e
                    }
                    weight() {
                        return 3 * this.byteLength(!1, !1) + this.byteLength(!1, !0)
                    }
                    byteLength(e, t = !0) {
                        return e || !this.transactions ? 80 : 80 + o.varuint.encodingLength(this.transactions.length) + this.transactions.reduce(((e, r) => e + r.byteLength(t)), 0)
                    }
                    getHash() {
                        return n.hash256(this.toBuffer(!0))
                    }
                    getId() {
                        return (0, o.reverseBuffer)(this.getHash()).toString("hex")
                    }
                    getUTCDate() {
                        const e = new Date(0);
                        return e.setUTCSeconds(this.timestamp), e
                    }
                    toBuffer(e) {
                        const t = Buffer.allocUnsafe(this.byteLength(e)),
                            r = new o.BufferWriter(t);
                        return r.writeInt32(this.version), r.writeSlice(this.prevHash), r.writeSlice(this.merkleRoot), r.writeUInt32(this.timestamp), r.writeUInt32(this.bits), r.writeUInt32(this.nonce), e || !this.transactions || (o.varuint.encode(this.transactions.length, t, r.offset), r.offset += o.varuint.encode.bytes, this.transactions.forEach((e => {
                            const o = e.byteLength();
                            e.toBuffer(t, r.offset), r.offset += o
                        }))), t
                    }
                    toHex(e) {
                        return this.toBuffer(e).toString("hex")
                    }
                    checkTxRoots() {
                        const e = this.hasWitnessCommit();
                        return !(!e && this.hasWitness()) && this.__checkMerkleRoot() && (!e || this.__checkWitnessCommit())
                    }
                    checkProofOfWork() {
                        const e = (0, o.reverseBuffer)(this.getHash()),
                            t = f.calculateTarget(this.bits);
                        return e.compare(t) <= 0
                    }
                    __checkMerkleRoot() {
                        if (!this.transactions) throw c;
                        const e = f.calculateMerkleRoot(this.transactions);
                        return 0 === this.merkleRoot.compare(e)
                    }
                    __checkWitnessCommit() {
                        if (!this.transactions) throw c;
                        if (!this.hasWitnessCommit()) throw l;
                        const e = f.calculateMerkleRoot(this.transactions, !0);
                        return 0 === this.witnessCommit.compare(e)
                    }
                }

                function d(e) {
                    return e instanceof Array && e[0] && e[0].ins && e[0].ins instanceof Array && e[0].ins[0] && e[0].ins[0].witness && e[0].ins[0].witness instanceof Array && e[0].ins[0].witness.length > 0
                }
                t.Block = f
            },
            7809: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.BufferReader = t.BufferWriter = t.cloneBuffer = t.reverseBuffer = t.writeUInt64LE = t.readUInt64LE = t.varuint = void 0;
                const o = r(547),
                    {
                        typeforce: n
                    } = o,
                    i = r(603);

                function a(e, t) {
                    if ("number" != typeof e) throw new Error("cannot write a non-number as a number");
                    if (e < 0) throw new Error("specified a negative value for writing an unsigned value");
                    if (e > t) throw new Error("RangeError: value out of range");
                    if (Math.floor(e) !== e) throw new Error("value has a fractional component")
                }

                function s(e, t) {
                    const r = e.readUInt32LE(t);
                    let o = e.readUInt32LE(t + 4);
                    return o *= 4294967296, a(o + r, 9007199254740991), o + r
                }

                function u(e, t, r) {
                    return a(t, 9007199254740991), e.writeInt32LE(-1 & t, r), e.writeUInt32LE(Math.floor(t / 4294967296), r + 4), r + 8
                }
                t.varuint = i, t.readUInt64LE = s, t.writeUInt64LE = u, t.reverseBuffer = function(e) {
                    if (e.length < 1) return e;
                    let t = e.length - 1,
                        r = 0;
                    for (let o = 0; o < e.length / 2; o++) r = e[o], e[o] = e[t], e[t] = r, t--;
                    return e
                }, t.cloneBuffer = function(e) {
                    const t = Buffer.allocUnsafe(e.length);
                    return e.copy(t), t
                };
                class c {
                    static withCapacity(e) {
                        return new c(Buffer.alloc(e))
                    }
                    constructor(e, t = 0) {
                        this.buffer = e, this.offset = t, n(o.tuple(o.Buffer, o.UInt32), [e, t])
                    }
                    writeUInt8(e) {
                        this.offset = this.buffer.writeUInt8(e, this.offset)
                    }
                    writeInt32(e) {
                        this.offset = this.buffer.writeInt32LE(e, this.offset)
                    }
                    writeUInt32(e) {
                        this.offset = this.buffer.writeUInt32LE(e, this.offset)
                    }
                    writeUInt64(e) {
                        this.offset = u(this.buffer, e, this.offset)
                    }
                    writeVarInt(e) {
                        i.encode(e, this.buffer, this.offset), this.offset += i.encode.bytes
                    }
                    writeSlice(e) {
                        if (this.buffer.length < this.offset + e.length) throw new Error("Cannot write slice out of bounds");
                        this.offset += e.copy(this.buffer, this.offset)
                    }
                    writeVarSlice(e) {
                        this.writeVarInt(e.length), this.writeSlice(e)
                    }
                    writeVector(e) {
                        this.writeVarInt(e.length), e.forEach((e => this.writeVarSlice(e)))
                    }
                    end() {
                        if (this.buffer.length === this.offset) return this.buffer;
                        throw new Error(`buffer size ${this.buffer.length}, offset ${this.offset}`)
                    }
                }
                t.BufferWriter = c, t.BufferReader = class {
                    constructor(e, t = 0) {
                        this.buffer = e, this.offset = t, n(o.tuple(o.Buffer, o.UInt32), [e, t])
                    }
                    readUInt8() {
                        const e = this.buffer.readUInt8(this.offset);
                        return this.offset++, e
                    }
                    readInt32() {
                        const e = this.buffer.readInt32LE(this.offset);
                        return this.offset += 4, e
                    }
                    readUInt32() {
                        const e = this.buffer.readUInt32LE(this.offset);
                        return this.offset += 4, e
                    }
                    readUInt64() {
                        const e = s(this.buffer, this.offset);
                        return this.offset += 8, e
                    }
                    readVarInt() {
                        const e = i.decode(this.buffer, this.offset);
                        return this.offset += i.decode.bytes, e
                    }
                    readSlice(e) {
                        if (this.buffer.length < this.offset + e) throw new Error("Cannot read slice out of bounds");
                        const t = this.buffer.slice(this.offset, this.offset + e);
                        return this.offset += e, t
                    }
                    readVarSlice() {
                        return this.readSlice(this.readVarInt())
                    }
                    readVector() {
                        const e = this.readVarInt(),
                            t = [];
                        for (let r = 0; r < e; r++) t.push(this.readVarSlice());
                        return t
                    }
                }
            },
            161: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.taggedHash = t.TAGGED_HASH_PREFIXES = t.TAGS = t.hash256 = t.hash160 = t.sha256 = t.sha1 = t.ripemd160 = void 0;
                const o = r(9405),
                    n = r(6128),
                    i = r(7494);

                function a(e) {
                    return Buffer.from((0, i.sha256)(Uint8Array.from(e)))
                }
                t.ripemd160 = function(e) {
                    return Buffer.from((0, o.ripemd160)(Uint8Array.from(e)))
                }, t.sha1 = function(e) {
                    return Buffer.from((0, n.sha1)(Uint8Array.from(e)))
                }, t.sha256 = a, t.hash160 = function(e) {
                    return Buffer.from((0, o.ripemd160)((0, i.sha256)(Uint8Array.from(e))))
                }, t.hash256 = function(e) {
                    return Buffer.from((0, i.sha256)((0, i.sha256)(Uint8Array.from(e))))
                }, t.TAGS = ["BIP0340/challenge", "BIP0340/aux", "BIP0340/nonce", "TapLeaf", "TapBranch", "TapSighash", "TapTweak", "KeyAgg list", "KeyAgg coefficient"], t.TAGGED_HASH_PREFIXES = {
                    "BIP0340/challenge": Buffer.from([123, 181, 45, 122, 159, 239, 88, 50, 62, 177, 191, 122, 64, 125, 179, 130, 210, 243, 242, 216, 27, 177, 34, 79, 73, 254, 81, 143, 109, 72, 211, 124, 123, 181, 45, 122, 159, 239, 88, 50, 62, 177, 191, 122, 64, 125, 179, 130, 210, 243, 242, 216, 27, 177, 34, 79, 73, 254, 81, 143, 109, 72, 211, 124]),
                    "BIP0340/aux": Buffer.from([241, 239, 78, 94, 192, 99, 202, 218, 109, 148, 202, 250, 157, 152, 126, 160, 105, 38, 88, 57, 236, 193, 31, 151, 45, 119, 165, 46, 216, 193, 204, 144, 241, 239, 78, 94, 192, 99, 202, 218, 109, 148, 202, 250, 157, 152, 126, 160, 105, 38, 88, 57, 236, 193, 31, 151, 45, 119, 165, 46, 216, 193, 204, 144]),
                    "BIP0340/nonce": Buffer.from([7, 73, 119, 52, 167, 155, 203, 53, 91, 155, 140, 125, 3, 79, 18, 28, 244, 52, 215, 62, 247, 45, 218, 25, 135, 0, 97, 251, 82, 191, 235, 47, 7, 73, 119, 52, 167, 155, 203, 53, 91, 155, 140, 125, 3, 79, 18, 28, 244, 52, 215, 62, 247, 45, 218, 25, 135, 0, 97, 251, 82, 191, 235, 47]),
                    TapLeaf: Buffer.from([174, 234, 143, 220, 66, 8, 152, 49, 5, 115, 75, 88, 8, 29, 30, 38, 56, 211, 95, 28, 181, 64, 8, 212, 211, 87, 202, 3, 190, 120, 233, 238, 174, 234, 143, 220, 66, 8, 152, 49, 5, 115, 75, 88, 8, 29, 30, 38, 56, 211, 95, 28, 181, 64, 8, 212, 211, 87, 202, 3, 190, 120, 233, 238]),
                    TapBranch: Buffer.from([25, 65, 161, 242, 229, 110, 185, 95, 162, 169, 241, 148, 190, 92, 1, 247, 33, 111, 51, 237, 130, 176, 145, 70, 52, 144, 208, 91, 245, 22, 160, 21, 25, 65, 161, 242, 229, 110, 185, 95, 162, 169, 241, 148, 190, 92, 1, 247, 33, 111, 51, 237, 130, 176, 145, 70, 52, 144, 208, 91, 245, 22, 160, 21]),
                    TapSighash: Buffer.from([244, 10, 72, 223, 75, 42, 112, 200, 180, 146, 75, 242, 101, 70, 97, 237, 61, 149, 253, 102, 163, 19, 235, 135, 35, 117, 151, 198, 40, 228, 160, 49, 244, 10, 72, 223, 75, 42, 112, 200, 180, 146, 75, 242, 101, 70, 97, 237, 61, 149, 253, 102, 163, 19, 235, 135, 35, 117, 151, 198, 40, 228, 160, 49]),
                    TapTweak: Buffer.from([232, 15, 225, 99, 156, 156, 160, 80, 227, 175, 27, 57, 193, 67, 198, 62, 66, 156, 188, 235, 21, 217, 64, 251, 181, 197, 161, 244, 175, 87, 197, 233, 232, 15, 225, 99, 156, 156, 160, 80, 227, 175, 27, 57, 193, 67, 198, 62, 66, 156, 188, 235, 21, 217, 64, 251, 181, 197, 161, 244, 175, 87, 197, 233]),
                    "KeyAgg list": Buffer.from([72, 28, 151, 28, 60, 11, 70, 215, 240, 178, 117, 174, 89, 141, 78, 44, 126, 215, 49, 156, 89, 74, 92, 110, 199, 158, 160, 212, 153, 2, 148, 240, 72, 28, 151, 28, 60, 11, 70, 215, 240, 178, 117, 174, 89, 141, 78, 44, 126, 215, 49, 156, 89, 74, 92, 110, 199, 158, 160, 212, 153, 2, 148, 240]),
                    "KeyAgg coefficient": Buffer.from([191, 201, 4, 3, 77, 28, 136, 232, 200, 14, 34, 229, 61, 36, 86, 109, 100, 130, 78, 214, 66, 114, 129, 192, 145, 0, 249, 77, 205, 82, 201, 129, 191, 201, 4, 3, 77, 28, 136, 232, 200, 14, 34, 229, 61, 36, 86, 109, 100, 130, 78, 214, 66, 114, 129, 192, 145, 0, 249, 77, 205, 82, 201, 129])
                }, t.taggedHash = function(e, r) {
                    return a(Buffer.concat([t.TAGGED_HASH_PREFIXES[e], r]))
                }
            },
            9639: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.getEccLib = t.initEccLib = void 0;
                const r = {};
                t.initEccLib = function(e, t) {
                    var a;
                    e ? e !== r.eccLib && (t?.DANGER_DO_NOT_VERIFY_ECCLIB || (n("function" == typeof(a = e).isXOnlyPoint), n(a.isXOnlyPoint(o("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), n(a.isXOnlyPoint(o("fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e"))), n(a.isXOnlyPoint(o("f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9"))), n(a.isXOnlyPoint(o("0000000000000000000000000000000000000000000000000000000000000001"))), n(!a.isXOnlyPoint(o("0000000000000000000000000000000000000000000000000000000000000000"))), n(!a.isXOnlyPoint(o("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"))), n("function" == typeof a.xOnlyPointAddTweak), i.forEach((e => {
                        const t = a.xOnlyPointAddTweak(o(e.pubkey), o(e.tweak));
                        null === e.result ? n(null === t) : (n(null !== t), n(t.parity === e.parity), n(Buffer.from(t.xOnlyPubkey).equals(o(e.result))))
                    }))), r.eccLib = e) : r.eccLib = e
                }, t.getEccLib = function() {
                    if (!r.eccLib) throw new Error("No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance");
                    return r.eccLib
                };
                const o = e => Buffer.from(e, "hex");

                function n(e) {
                    if (!e) throw new Error("ecc library invalid")
                }
                const i = [{
                    pubkey: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
                    tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
                    parity: -1,
                    result: null
                }, {
                    pubkey: "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
                    tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
                    parity: 1,
                    result: "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf"
                }, {
                    pubkey: "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
                    tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
                    parity: 0,
                    result: "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c"
                }]
            },
            3550: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.initEccLib = t.Transaction = t.opcodes = t.Psbt = t.Block = t.script = t.payments = t.networks = t.crypto = t.address = void 0;
                const o = r(6774);
                t.address = o;
                const n = r(161);
                t.crypto = n;
                const i = r(2307);
                t.networks = i;
                const a = r(9576);
                t.payments = a;
                const s = r(6391);
                t.script = s;
                var u = r(5183);
                Object.defineProperty(t, "Block", {
                    enumerable: !0,
                    get: function() {
                        return u.Block
                    }
                });
                var c = r(2344);
                Object.defineProperty(t, "Psbt", {
                    enumerable: !0,
                    get: function() {
                        return c.Psbt
                    }
                });
                var l = r(1898);
                Object.defineProperty(t, "opcodes", {
                    enumerable: !0,
                    get: function() {
                        return l.OPS
                    }
                });
                var f = r(2146);
                Object.defineProperty(t, "Transaction", {
                    enumerable: !0,
                    get: function() {
                        return f.Transaction
                    }
                });
                var d = r(9639);
                Object.defineProperty(t, "initEccLib", {
                    enumerable: !0,
                    get: function() {
                        return d.initEccLib
                    }
                })
            },
            7658: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.fastMerkleRoot = void 0, t.fastMerkleRoot = function(e, t) {
                    if (!Array.isArray(e)) throw TypeError("Expected values Array");
                    if ("function" != typeof t) throw TypeError("Expected digest Function");
                    let r = e.length;
                    const o = e.concat();
                    for (; r > 1;) {
                        let e = 0;
                        for (let n = 0; n < r; n += 2, ++e) {
                            const i = o[n],
                                a = n + 1 === r ? i : o[n + 1],
                                s = Buffer.concat([i, a]);
                            o[e] = t(s)
                        }
                        r = e
                    }
                    return o[0]
                }
            },
            2307: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.testnet = t.regtest = t.bitcoin = void 0, t.bitcoin = {
                    messagePrefix: "Bitcoin Signed Message:\n",
                    bech32: "bc",
                    bip32: {
                        public: 76067358,
                        private: 76066276
                    },
                    pubKeyHash: 0,
                    scriptHash: 5,
                    wif: 128
                }, t.regtest = {
                    messagePrefix: "Bitcoin Signed Message:\n",
                    bech32: "bcrt",
                    bip32: {
                        public: 70617039,
                        private: 70615956
                    },
                    pubKeyHash: 111,
                    scriptHash: 196,
                    wif: 239
                }, t.testnet = {
                    messagePrefix: "Bitcoin Signed Message:\n",
                    bech32: "tb",
                    bip32: {
                        public: 70617039,
                        private: 70615956
                    },
                    pubKeyHash: 111,
                    scriptHash: 196,
                    wif: 239
                }
            },
            1898: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.REVERSE_OPS = t.OPS = void 0;
                const r = {
                    OP_FALSE: 0,
                    OP_0: 0,
                    OP_PUSHDATA1: 76,
                    OP_PUSHDATA2: 77,
                    OP_PUSHDATA4: 78,
                    OP_1NEGATE: 79,
                    OP_RESERVED: 80,
                    OP_TRUE: 81,
                    OP_1: 81,
                    OP_2: 82,
                    OP_3: 83,
                    OP_4: 84,
                    OP_5: 85,
                    OP_6: 86,
                    OP_7: 87,
                    OP_8: 88,
                    OP_9: 89,
                    OP_10: 90,
                    OP_11: 91,
                    OP_12: 92,
                    OP_13: 93,
                    OP_14: 94,
                    OP_15: 95,
                    OP_16: 96,
                    OP_NOP: 97,
                    OP_VER: 98,
                    OP_IF: 99,
                    OP_NOTIF: 100,
                    OP_VERIF: 101,
                    OP_VERNOTIF: 102,
                    OP_ELSE: 103,
                    OP_ENDIF: 104,
                    OP_VERIFY: 105,
                    OP_RETURN: 106,
                    OP_TOALTSTACK: 107,
                    OP_FROMALTSTACK: 108,
                    OP_2DROP: 109,
                    OP_2DUP: 110,
                    OP_3DUP: 111,
                    OP_2OVER: 112,
                    OP_2ROT: 113,
                    OP_2SWAP: 114,
                    OP_IFDUP: 115,
                    OP_DEPTH: 116,
                    OP_DROP: 117,
                    OP_DUP: 118,
                    OP_NIP: 119,
                    OP_OVER: 120,
                    OP_PICK: 121,
                    OP_ROLL: 122,
                    OP_ROT: 123,
                    OP_SWAP: 124,
                    OP_TUCK: 125,
                    OP_CAT: 126,
                    OP_SUBSTR: 127,
                    OP_LEFT: 128,
                    OP_RIGHT: 129,
                    OP_SIZE: 130,
                    OP_INVERT: 131,
                    OP_AND: 132,
                    OP_OR: 133,
                    OP_XOR: 134,
                    OP_EQUAL: 135,
                    OP_EQUALVERIFY: 136,
                    OP_RESERVED1: 137,
                    OP_RESERVED2: 138,
                    OP_1ADD: 139,
                    OP_1SUB: 140,
                    OP_2MUL: 141,
                    OP_2DIV: 142,
                    OP_NEGATE: 143,
                    OP_ABS: 144,
                    OP_NOT: 145,
                    OP_0NOTEQUAL: 146,
                    OP_ADD: 147,
                    OP_SUB: 148,
                    OP_MUL: 149,
                    OP_DIV: 150,
                    OP_MOD: 151,
                    OP_LSHIFT: 152,
                    OP_RSHIFT: 153,
                    OP_BOOLAND: 154,
                    OP_BOOLOR: 155,
                    OP_NUMEQUAL: 156,
                    OP_NUMEQUALVERIFY: 157,
                    OP_NUMNOTEQUAL: 158,
                    OP_LESSTHAN: 159,
                    OP_GREATERTHAN: 160,
                    OP_LESSTHANOREQUAL: 161,
                    OP_GREATERTHANOREQUAL: 162,
                    OP_MIN: 163,
                    OP_MAX: 164,
                    OP_WITHIN: 165,
                    OP_RIPEMD160: 166,
                    OP_SHA1: 167,
                    OP_SHA256: 168,
                    OP_HASH160: 169,
                    OP_HASH256: 170,
                    OP_CODESEPARATOR: 171,
                    OP_CHECKSIG: 172,
                    OP_CHECKSIGVERIFY: 173,
                    OP_CHECKMULTISIG: 174,
                    OP_CHECKMULTISIGVERIFY: 175,
                    OP_NOP1: 176,
                    OP_NOP2: 177,
                    OP_CHECKLOCKTIMEVERIFY: 177,
                    OP_NOP3: 178,
                    OP_CHECKSEQUENCEVERIFY: 178,
                    OP_NOP4: 179,
                    OP_NOP5: 180,
                    OP_NOP6: 181,
                    OP_NOP7: 182,
                    OP_NOP8: 183,
                    OP_NOP9: 184,
                    OP_NOP10: 185,
                    OP_CHECKSIGADD: 186,
                    OP_PUBKEYHASH: 253,
                    OP_PUBKEY: 254,
                    OP_INVALIDOPCODE: 255
                };
                t.OPS = r;
                const o = {};
                t.REVERSE_OPS = o;
                for (const e of Object.keys(r)) o[r[e]] = e
            },
            153: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.tweakKey = t.tapTweakHash = t.tapleafHash = t.findScriptPath = t.toHashTree = t.rootHashFromPath = t.MAX_TAPTREE_DEPTH = t.LEAF_VERSION_TAPSCRIPT = void 0;
                const o = r(4686),
                    n = r(9639),
                    i = r(161),
                    a = r(7809),
                    s = r(547);

                function u(e) {
                    const r = e.version || t.LEAF_VERSION_TAPSCRIPT;
                    return i.taggedHash("TapLeaf", o.Buffer.concat([o.Buffer.from([r]), f(e.output)]))
                }

                function c(e, t) {
                    return i.taggedHash("TapTweak", o.Buffer.concat(t ? [e, t] : [e]))
                }

                function l(e, t) {
                    return i.taggedHash("TapBranch", o.Buffer.concat([e, t]))
                }

                function f(e) {
                    const t = a.varuint.encodingLength(e.length),
                        r = o.Buffer.allocUnsafe(t);
                    return a.varuint.encode(e.length, r), o.Buffer.concat([r, e])
                }
                t.LEAF_VERSION_TAPSCRIPT = 192, t.MAX_TAPTREE_DEPTH = 128, t.rootHashFromPath = function(e, t) {
                    if (e.length < 33) throw new TypeError(`The control-block length is too small. Got ${e.length}, expected min 33.`);
                    const r = (e.length - 33) / 32;
                    let o = t;
                    for (let t = 0; t < r; t++) {
                        const r = e.slice(33 + 32 * t, 65 + 32 * t);
                        o = o.compare(r) < 0 ? l(o, r) : l(r, o)
                    }
                    return o
                }, t.toHashTree = function e(t) {
                    if ((0, s.isTapleaf)(t)) return {
                        hash: u(t)
                    };
                    const r = [e(t[0]), e(t[1])];
                    r.sort(((e, t) => e.hash.compare(t.hash)));
                    const [o, n] = r;
                    return {
                        hash: l(o.hash, n.hash),
                        left: o,
                        right: n
                    }
                }, t.findScriptPath = function e(t, r) {
                    if ("left" in (o = t) && "right" in o) {
                        const o = e(t.left, r);
                        if (void 0 !== o) return [...o, t.right.hash];
                        const n = e(t.right, r);
                        if (void 0 !== n) return [...n, t.left.hash]
                    } else if (t.hash.equals(r)) return [];
                    var o
                }, t.tapleafHash = u, t.tapTweakHash = c, t.tweakKey = function(e, t) {
                    if (!o.Buffer.isBuffer(e)) return null;
                    if (32 !== e.length) return null;
                    if (t && 32 !== t.length) return null;
                    const r = c(e, t),
                        i = (0, n.getEccLib)().xOnlyPointAddTweak(e, r);
                    return i && null !== i.xOnlyPubkey ? {
                        parity: i.parity,
                        x: o.Buffer.from(i.xOnlyPubkey)
                    } : null
                }
            },
            5113: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2data = void 0;
                const o = r(2307),
                    n = r(6391),
                    i = r(547),
                    a = r(12),
                    s = n.OPS;
                t.p2data = function(e, t) {
                    if (!e.data && !e.output) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, i.typeforce)({
                        network: i.typeforce.maybe(i.typeforce.Object),
                        output: i.typeforce.maybe(i.typeforce.Buffer),
                        data: i.typeforce.maybe(i.typeforce.arrayOf(i.typeforce.Buffer))
                    }, e);
                    const r = {
                        name: "embed",
                        network: e.network || o.bitcoin
                    };
                    if (a.prop(r, "output", (() => {
                            if (e.data) return n.compile([s.OP_RETURN].concat(e.data))
                        })), a.prop(r, "data", (() => {
                            if (e.output) return n.decompile(e.output).slice(1)
                        })), t.validate && e.output) {
                        const t = n.decompile(e.output);
                        if (t[0] !== s.OP_RETURN) throw new TypeError("Output is invalid");
                        if (!t.slice(1).every(i.typeforce.Buffer)) throw new TypeError("Output is invalid");
                        if (e.data && !(0, i.stacksEqual)(e.data, r.data)) throw new TypeError("Data mismatch")
                    }
                    return Object.assign(r, e)
                }
            },
            9576: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2tr = t.p2wsh = t.p2wpkh = t.p2sh = t.p2pkh = t.p2pk = t.p2ms = t.embed = void 0;
                const o = r(5113);
                Object.defineProperty(t, "embed", {
                    enumerable: !0,
                    get: function() {
                        return o.p2data
                    }
                });
                const n = r(4436);
                Object.defineProperty(t, "p2ms", {
                    enumerable: !0,
                    get: function() {
                        return n.p2ms
                    }
                });
                const i = r(2037);
                Object.defineProperty(t, "p2pk", {
                    enumerable: !0,
                    get: function() {
                        return i.p2pk
                    }
                });
                const a = r(5889);
                Object.defineProperty(t, "p2pkh", {
                    enumerable: !0,
                    get: function() {
                        return a.p2pkh
                    }
                });
                const s = r(1931);
                Object.defineProperty(t, "p2sh", {
                    enumerable: !0,
                    get: function() {
                        return s.p2sh
                    }
                });
                const u = r(7856);
                Object.defineProperty(t, "p2wpkh", {
                    enumerable: !0,
                    get: function() {
                        return u.p2wpkh
                    }
                });
                const c = r(3392);
                Object.defineProperty(t, "p2wsh", {
                    enumerable: !0,
                    get: function() {
                        return c.p2wsh
                    }
                });
                const l = r(3242);
                Object.defineProperty(t, "p2tr", {
                    enumerable: !0,
                    get: function() {
                        return l.p2tr
                    }
                })
            },
            12: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.value = t.prop = void 0, t.prop = function(e, t, r) {
                    Object.defineProperty(e, t, {
                        configurable: !0,
                        enumerable: !0,
                        get() {
                            const e = r.call(this);
                            return this[t] = e, e
                        },
                        set(e) {
                            Object.defineProperty(this, t, {
                                configurable: !0,
                                enumerable: !0,
                                value: e,
                                writable: !0
                            })
                        }
                    })
                }, t.value = function(e) {
                    let t;
                    return () => (void 0 !== t || (t = e()), t)
                }
            },
            4436: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2ms = void 0;
                const o = r(2307),
                    n = r(6391),
                    i = r(547),
                    a = r(12),
                    s = n.OPS,
                    u = s.OP_RESERVED;
                t.p2ms = function(e, t) {
                    if (!(e.input || e.output || e.pubkeys && void 0 !== e.m || e.signatures)) throw new TypeError("Not enough data");

                    function r(e) {
                        return n.isCanonicalScriptSignature(e) || void 0 !== (t.allowIncomplete && e === s.OP_0)
                    }
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, i.typeforce)({
                        network: i.typeforce.maybe(i.typeforce.Object),
                        m: i.typeforce.maybe(i.typeforce.Number),
                        n: i.typeforce.maybe(i.typeforce.Number),
                        output: i.typeforce.maybe(i.typeforce.Buffer),
                        pubkeys: i.typeforce.maybe(i.typeforce.arrayOf(i.isPoint)),
                        signatures: i.typeforce.maybe(i.typeforce.arrayOf(r)),
                        input: i.typeforce.maybe(i.typeforce.Buffer)
                    }, e);
                    const c = {
                        network: e.network || o.bitcoin
                    };
                    let l = [],
                        f = !1;

                    function d(e) {
                        f || (f = !0, l = n.decompile(e), c.m = l[0] - u, c.n = l[l.length - 2] - u, c.pubkeys = l.slice(1, -2))
                    }
                    if (a.prop(c, "output", (() => {
                            if (e.m && c.n && e.pubkeys) return n.compile([].concat(u + e.m, e.pubkeys, u + c.n, s.OP_CHECKMULTISIG))
                        })), a.prop(c, "m", (() => {
                            if (c.output) return d(c.output), c.m
                        })), a.prop(c, "n", (() => {
                            if (c.pubkeys) return c.pubkeys.length
                        })), a.prop(c, "pubkeys", (() => {
                            if (e.output) return d(e.output), c.pubkeys
                        })), a.prop(c, "signatures", (() => {
                            if (e.input) return n.decompile(e.input).slice(1)
                        })), a.prop(c, "input", (() => {
                            if (e.signatures) return n.compile([s.OP_0].concat(e.signatures))
                        })), a.prop(c, "witness", (() => {
                            if (c.input) return []
                        })), a.prop(c, "name", (() => {
                            if (c.m && c.n) return `p2ms(${c.m} of ${c.n})`
                        })), t.validate) {
                        if (e.output) {
                            if (d(e.output), !i.typeforce.Number(l[0])) throw new TypeError("Output is invalid");
                            if (!i.typeforce.Number(l[l.length - 2])) throw new TypeError("Output is invalid");
                            if (l[l.length - 1] !== s.OP_CHECKMULTISIG) throw new TypeError("Output is invalid");
                            if (c.m <= 0 || c.n > 16 || c.m > c.n || c.n !== l.length - 3) throw new TypeError("Output is invalid");
                            if (!c.pubkeys.every((e => (0, i.isPoint)(e)))) throw new TypeError("Output is invalid");
                            if (void 0 !== e.m && e.m !== c.m) throw new TypeError("m mismatch");
                            if (void 0 !== e.n && e.n !== c.n) throw new TypeError("n mismatch");
                            if (e.pubkeys && !(0, i.stacksEqual)(e.pubkeys, c.pubkeys)) throw new TypeError("Pubkeys mismatch")
                        }
                        if (e.pubkeys) {
                            if (void 0 !== e.n && e.n !== e.pubkeys.length) throw new TypeError("Pubkey count mismatch");
                            if (c.n = e.pubkeys.length, c.n < c.m) throw new TypeError("Pubkey count cannot be less than m")
                        }
                        if (e.signatures) {
                            if (e.signatures.length < c.m) throw new TypeError("Not enough signatures provided");
                            if (e.signatures.length > c.m) throw new TypeError("Too many signatures provided")
                        }
                        if (e.input) {
                            if (e.input[0] !== s.OP_0) throw new TypeError("Input is invalid");
                            if (0 === c.signatures.length || !c.signatures.every(r)) throw new TypeError("Input has invalid signature(s)");
                            if (e.signatures && !(0, i.stacksEqual)(e.signatures, c.signatures)) throw new TypeError("Signature mismatch");
                            if (void 0 !== e.m && e.m !== e.signatures.length) throw new TypeError("Signature count mismatch")
                        }
                    }
                    return Object.assign(c, e)
                }
            },
            2037: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2pk = void 0;
                const o = r(2307),
                    n = r(6391),
                    i = r(547),
                    a = r(12),
                    s = n.OPS;
                t.p2pk = function(e, t) {
                    if (!(e.input || e.output || e.pubkey || e.input || e.signature)) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, i.typeforce)({
                        network: i.typeforce.maybe(i.typeforce.Object),
                        output: i.typeforce.maybe(i.typeforce.Buffer),
                        pubkey: i.typeforce.maybe(i.isPoint),
                        signature: i.typeforce.maybe(n.isCanonicalScriptSignature),
                        input: i.typeforce.maybe(i.typeforce.Buffer)
                    }, e);
                    const r = a.value((() => n.decompile(e.input))),
                        u = {
                            name: "p2pk",
                            network: e.network || o.bitcoin
                        };
                    if (a.prop(u, "output", (() => {
                            if (e.pubkey) return n.compile([e.pubkey, s.OP_CHECKSIG])
                        })), a.prop(u, "pubkey", (() => {
                            if (e.output) return e.output.slice(1, -1)
                        })), a.prop(u, "signature", (() => {
                            if (e.input) return r()[0]
                        })), a.prop(u, "input", (() => {
                            if (e.signature) return n.compile([e.signature])
                        })), a.prop(u, "witness", (() => {
                            if (u.input) return []
                        })), t.validate) {
                        if (e.output) {
                            if (e.output[e.output.length - 1] !== s.OP_CHECKSIG) throw new TypeError("Output is invalid");
                            if (!(0, i.isPoint)(u.pubkey)) throw new TypeError("Output pubkey is invalid");
                            if (e.pubkey && !e.pubkey.equals(u.pubkey)) throw new TypeError("Pubkey mismatch")
                        }
                        if (e.signature && e.input && !e.input.equals(u.input)) throw new TypeError("Signature mismatch");
                        if (e.input) {
                            if (1 !== r().length) throw new TypeError("Input is invalid");
                            if (!n.isCanonicalScriptSignature(u.signature)) throw new TypeError("Input has invalid signature")
                        }
                    }
                    return Object.assign(u, e)
                }
            },
            5889: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2pkh = void 0;
                const o = r(161),
                    n = r(2307),
                    i = r(6391),
                    a = r(547),
                    s = r(12),
                    u = r(9383),
                    c = i.OPS;
                t.p2pkh = function(e, t) {
                    if (!(e.address || e.hash || e.output || e.pubkey || e.input)) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, a.typeforce)({
                        network: a.typeforce.maybe(a.typeforce.Object),
                        address: a.typeforce.maybe(a.typeforce.String),
                        hash: a.typeforce.maybe(a.typeforce.BufferN(20)),
                        output: a.typeforce.maybe(a.typeforce.BufferN(25)),
                        pubkey: a.typeforce.maybe(a.isPoint),
                        signature: a.typeforce.maybe(i.isCanonicalScriptSignature),
                        input: a.typeforce.maybe(a.typeforce.Buffer)
                    }, e);
                    const r = s.value((() => {
                            const t = Buffer.from(u.decode(e.address));
                            return {
                                version: t.readUInt8(0),
                                hash: t.slice(1)
                            }
                        })),
                        l = s.value((() => i.decompile(e.input))),
                        f = e.network || n.bitcoin,
                        d = {
                            name: "p2pkh",
                            network: f
                        };
                    if (s.prop(d, "address", (() => {
                            if (!d.hash) return;
                            const e = Buffer.allocUnsafe(21);
                            return e.writeUInt8(f.pubKeyHash, 0), d.hash.copy(e, 1), u.encode(e)
                        })), s.prop(d, "hash", (() => e.output ? e.output.slice(3, 23) : e.address ? r().hash : e.pubkey || d.pubkey ? o.hash160(e.pubkey || d.pubkey) : void 0)), s.prop(d, "output", (() => {
                            if (d.hash) return i.compile([c.OP_DUP, c.OP_HASH160, d.hash, c.OP_EQUALVERIFY, c.OP_CHECKSIG])
                        })), s.prop(d, "pubkey", (() => {
                            if (e.input) return l()[1]
                        })), s.prop(d, "signature", (() => {
                            if (e.input) return l()[0]
                        })), s.prop(d, "input", (() => {
                            if (e.pubkey && e.signature) return i.compile([e.signature, e.pubkey])
                        })), s.prop(d, "witness", (() => {
                            if (d.input) return []
                        })), t.validate) {
                        let t = Buffer.from([]);
                        if (e.address) {
                            if (r().version !== f.pubKeyHash) throw new TypeError("Invalid version or Network mismatch");
                            if (20 !== r().hash.length) throw new TypeError("Invalid address");
                            t = r().hash
                        }
                        if (e.hash) {
                            if (t.length > 0 && !t.equals(e.hash)) throw new TypeError("Hash mismatch");
                            t = e.hash
                        }
                        if (e.output) {
                            if (25 !== e.output.length || e.output[0] !== c.OP_DUP || e.output[1] !== c.OP_HASH160 || 20 !== e.output[2] || e.output[23] !== c.OP_EQUALVERIFY || e.output[24] !== c.OP_CHECKSIG) throw new TypeError("Output is invalid");
                            const r = e.output.slice(3, 23);
                            if (t.length > 0 && !t.equals(r)) throw new TypeError("Hash mismatch");
                            t = r
                        }
                        if (e.pubkey) {
                            const r = o.hash160(e.pubkey);
                            if (t.length > 0 && !t.equals(r)) throw new TypeError("Hash mismatch");
                            t = r
                        }
                        if (e.input) {
                            const r = l();
                            if (2 !== r.length) throw new TypeError("Input is invalid");
                            if (!i.isCanonicalScriptSignature(r[0])) throw new TypeError("Input has invalid signature");
                            if (!(0, a.isPoint)(r[1])) throw new TypeError("Input has invalid pubkey");
                            if (e.signature && !e.signature.equals(r[0])) throw new TypeError("Signature mismatch");
                            if (e.pubkey && !e.pubkey.equals(r[1])) throw new TypeError("Pubkey mismatch");
                            const n = o.hash160(r[1]);
                            if (t.length > 0 && !t.equals(n)) throw new TypeError("Hash mismatch")
                        }
                    }
                    return Object.assign(d, e)
                }
            },
            1931: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2sh = void 0;
                const o = r(161),
                    n = r(2307),
                    i = r(6391),
                    a = r(547),
                    s = r(12),
                    u = r(9383),
                    c = i.OPS;
                t.p2sh = function(e, t) {
                    if (!(e.address || e.hash || e.output || e.redeem || e.input)) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, a.typeforce)({
                        network: a.typeforce.maybe(a.typeforce.Object),
                        address: a.typeforce.maybe(a.typeforce.String),
                        hash: a.typeforce.maybe(a.typeforce.BufferN(20)),
                        output: a.typeforce.maybe(a.typeforce.BufferN(23)),
                        redeem: a.typeforce.maybe({
                            network: a.typeforce.maybe(a.typeforce.Object),
                            output: a.typeforce.maybe(a.typeforce.Buffer),
                            input: a.typeforce.maybe(a.typeforce.Buffer),
                            witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                        }),
                        input: a.typeforce.maybe(a.typeforce.Buffer),
                        witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                    }, e);
                    let r = e.network;
                    r || (r = e.redeem && e.redeem.network || n.bitcoin);
                    const l = {
                            network: r
                        },
                        f = s.value((() => {
                            const t = Buffer.from(u.decode(e.address));
                            return {
                                version: t.readUInt8(0),
                                hash: t.slice(1)
                            }
                        })),
                        d = s.value((() => i.decompile(e.input))),
                        h = s.value((() => {
                            const t = d(),
                                o = t[t.length - 1];
                            return {
                                network: r,
                                output: o === c.OP_FALSE ? Buffer.from([]) : o,
                                input: i.compile(t.slice(0, -1)),
                                witness: e.witness || []
                            }
                        }));
                    if (s.prop(l, "address", (() => {
                            if (!l.hash) return;
                            const e = Buffer.allocUnsafe(21);
                            return e.writeUInt8(l.network.scriptHash, 0), l.hash.copy(e, 1), u.encode(e)
                        })), s.prop(l, "hash", (() => e.output ? e.output.slice(2, 22) : e.address ? f().hash : l.redeem && l.redeem.output ? o.hash160(l.redeem.output) : void 0)), s.prop(l, "output", (() => {
                            if (l.hash) return i.compile([c.OP_HASH160, l.hash, c.OP_EQUAL])
                        })), s.prop(l, "redeem", (() => {
                            if (e.input) return h()
                        })), s.prop(l, "input", (() => {
                            if (e.redeem && e.redeem.input && e.redeem.output) return i.compile([].concat(i.decompile(e.redeem.input), e.redeem.output))
                        })), s.prop(l, "witness", (() => l.redeem && l.redeem.witness ? l.redeem.witness : l.input ? [] : void 0)), s.prop(l, "name", (() => {
                            const e = ["p2sh"];
                            return void 0 !== l.redeem && void 0 !== l.redeem.name && e.push(l.redeem.name), e.join("-")
                        })), t.validate) {
                        let t = Buffer.from([]);
                        if (e.address) {
                            if (f().version !== r.scriptHash) throw new TypeError("Invalid version or Network mismatch");
                            if (20 !== f().hash.length) throw new TypeError("Invalid address");
                            t = f().hash
                        }
                        if (e.hash) {
                            if (t.length > 0 && !t.equals(e.hash)) throw new TypeError("Hash mismatch");
                            t = e.hash
                        }
                        if (e.output) {
                            if (23 !== e.output.length || e.output[0] !== c.OP_HASH160 || 20 !== e.output[1] || e.output[22] !== c.OP_EQUAL) throw new TypeError("Output is invalid");
                            const r = e.output.slice(2, 22);
                            if (t.length > 0 && !t.equals(r)) throw new TypeError("Hash mismatch");
                            t = r
                        }
                        const n = e => {
                            if (e.output) {
                                const r = i.decompile(e.output);
                                if (!r || r.length < 1) throw new TypeError("Redeem.output too short");
                                if (e.output.byteLength > 520) throw new TypeError("Redeem.output unspendable if larger than 520 bytes");
                                if (i.countNonPushOnlyOPs(r) > 201) throw new TypeError("Redeem.output unspendable with more than 201 non-push ops");
                                const n = o.hash160(e.output);
                                if (t.length > 0 && !t.equals(n)) throw new TypeError("Hash mismatch");
                                t = n
                            }
                            if (e.input) {
                                const t = e.input.length > 0,
                                    r = e.witness && e.witness.length > 0;
                                if (!t && !r) throw new TypeError("Empty input");
                                if (t && r) throw new TypeError("Input and witness provided");
                                if (t) {
                                    const t = i.decompile(e.input);
                                    if (!i.isPushOnly(t)) throw new TypeError("Non push-only scriptSig")
                                }
                            }
                        };
                        if (e.input) {
                            const e = d();
                            if (!e || e.length < 1) throw new TypeError("Input too short");
                            if (!Buffer.isBuffer(h().output)) throw new TypeError("Input is invalid");
                            n(h())
                        }
                        if (e.redeem) {
                            if (e.redeem.network && e.redeem.network !== r) throw new TypeError("Network mismatch");
                            if (e.input) {
                                const t = h();
                                if (e.redeem.output && !e.redeem.output.equals(t.output)) throw new TypeError("Redeem.output mismatch");
                                if (e.redeem.input && !e.redeem.input.equals(t.input)) throw new TypeError("Redeem.input mismatch")
                            }
                            n(e.redeem)
                        }
                        if (e.witness && e.redeem && e.redeem.witness && !(0, a.stacksEqual)(e.redeem.witness, e.witness)) throw new TypeError("Witness and redeem.witness mismatch")
                    }
                    return Object.assign(l, e)
                }
            },
            3242: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2tr = void 0;
                const o = r(4686),
                    n = r(2307),
                    i = r(6391),
                    a = r(547),
                    s = r(9639),
                    u = r(153),
                    c = r(12),
                    l = r(6976),
                    f = r(6774),
                    d = i.OPS;
                t.p2tr = function(e, t) {
                    if (!(e.address || e.output || e.pubkey || e.internalPubkey || e.witness && e.witness.length > 1)) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, a.typeforce)({
                        address: a.typeforce.maybe(a.typeforce.String),
                        input: a.typeforce.maybe(a.typeforce.BufferN(0)),
                        network: a.typeforce.maybe(a.typeforce.Object),
                        output: a.typeforce.maybe(a.typeforce.BufferN(34)),
                        internalPubkey: a.typeforce.maybe(a.typeforce.BufferN(32)),
                        hash: a.typeforce.maybe(a.typeforce.BufferN(32)),
                        pubkey: a.typeforce.maybe(a.typeforce.BufferN(32)),
                        signature: a.typeforce.maybe(a.typeforce.anyOf(a.typeforce.BufferN(64), a.typeforce.BufferN(65))),
                        witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer)),
                        scriptTree: a.typeforce.maybe(a.isTaptree),
                        redeem: a.typeforce.maybe({
                            output: a.typeforce.maybe(a.typeforce.Buffer),
                            redeemVersion: a.typeforce.maybe(a.typeforce.Number),
                            witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                        }),
                        redeemVersion: a.typeforce.maybe(a.typeforce.Number)
                    }, e);
                    const r = c.value((() => (0, f.fromBech32)(e.address))),
                        h = c.value((() => {
                            if (e.witness && e.witness.length) return e.witness.length >= 2 && 80 === e.witness[e.witness.length - 1][0] ? e.witness.slice(0, -1) : e.witness.slice()
                        })),
                        p = c.value((() => e.scriptTree ? (0, u.toHashTree)(e.scriptTree) : e.hash ? {
                            hash: e.hash
                        } : void 0)),
                        b = e.network || n.bitcoin,
                        g = {
                            name: "p2tr",
                            network: b
                        };
                    if (c.prop(g, "address", (() => {
                            if (!g.pubkey) return;
                            const e = l.bech32m.toWords(g.pubkey);
                            return e.unshift(1), l.bech32m.encode(b.bech32, e)
                        })), c.prop(g, "hash", (() => {
                            const e = p();
                            if (e) return e.hash;
                            const t = h();
                            if (t && t.length > 1) {
                                const e = t[t.length - 1],
                                    r = e[0] & a.TAPLEAF_VERSION_MASK,
                                    o = t[t.length - 2],
                                    n = (0, u.tapleafHash)({
                                        output: o,
                                        version: r
                                    });
                                return (0, u.rootHashFromPath)(e, n)
                            }
                            return null
                        })), c.prop(g, "output", (() => {
                            if (g.pubkey) return i.compile([d.OP_1, g.pubkey])
                        })), c.prop(g, "redeemVersion", (() => e.redeemVersion ? e.redeemVersion : e.redeem && void 0 !== e.redeem.redeemVersion && null !== e.redeem.redeemVersion ? e.redeem.redeemVersion : u.LEAF_VERSION_TAPSCRIPT)), c.prop(g, "redeem", (() => {
                            const e = h();
                            if (e && !(e.length < 2)) return {
                                output: e[e.length - 2],
                                witness: e.slice(0, -2),
                                redeemVersion: e[e.length - 1][0] & a.TAPLEAF_VERSION_MASK
                            }
                        })), c.prop(g, "pubkey", (() => {
                            if (e.pubkey) return e.pubkey;
                            if (e.output) return e.output.slice(2);
                            if (e.address) return r().data;
                            if (g.internalPubkey) {
                                const e = (0, u.tweakKey)(g.internalPubkey, g.hash);
                                if (e) return e.x
                            }
                        })), c.prop(g, "internalPubkey", (() => {
                            if (e.internalPubkey) return e.internalPubkey;
                            const t = h();
                            return t && t.length > 1 ? t[t.length - 1].slice(1, 33) : void 0
                        })), c.prop(g, "signature", (() => {
                            if (e.signature) return e.signature;
                            const t = h();
                            return t && 1 === t.length ? t[0] : void 0
                        })), c.prop(g, "witness", (() => {
                            if (e.witness) return e.witness;
                            const t = p();
                            if (t && e.redeem && e.redeem.output && e.internalPubkey) {
                                const r = (0, u.tapleafHash)({
                                        output: e.redeem.output,
                                        version: g.redeemVersion
                                    }),
                                    n = (0, u.findScriptPath)(t, r);
                                if (!n) return;
                                const i = (0, u.tweakKey)(e.internalPubkey, t.hash);
                                if (!i) return;
                                const a = o.Buffer.concat([o.Buffer.from([g.redeemVersion | i.parity]), e.internalPubkey].concat(n));
                                return [e.redeem.output, a]
                            }
                            return e.signature ? [e.signature] : void 0
                        })), t.validate) {
                        let t = o.Buffer.from([]);
                        if (e.address) {
                            if (b && b.bech32 !== r().prefix) throw new TypeError("Invalid prefix or Network mismatch");
                            if (1 !== r().version) throw new TypeError("Invalid address version");
                            if (32 !== r().data.length) throw new TypeError("Invalid address data");
                            t = r().data
                        }
                        if (e.pubkey) {
                            if (t.length > 0 && !t.equals(e.pubkey)) throw new TypeError("Pubkey mismatch");
                            t = e.pubkey
                        }
                        if (e.output) {
                            if (34 !== e.output.length || e.output[0] !== d.OP_1 || 32 !== e.output[1]) throw new TypeError("Output is invalid");
                            if (t.length > 0 && !t.equals(e.output.slice(2))) throw new TypeError("Pubkey mismatch");
                            t = e.output.slice(2)
                        }
                        if (e.internalPubkey) {
                            const r = (0, u.tweakKey)(e.internalPubkey, g.hash);
                            if (t.length > 0 && !t.equals(r.x)) throw new TypeError("Pubkey mismatch");
                            t = r.x
                        }
                        if (t && t.length && !(0, s.getEccLib)().isXOnlyPoint(t)) throw new TypeError("Invalid pubkey for p2tr");
                        const n = p();
                        if (e.hash && n && !e.hash.equals(n.hash)) throw new TypeError("Hash mismatch");
                        if (e.redeem && e.redeem.output && n) {
                            const t = (0, u.tapleafHash)({
                                output: e.redeem.output,
                                version: g.redeemVersion
                            });
                            if (!(0, u.findScriptPath)(n, t)) throw new TypeError("Redeem script not in tree")
                        }
                        const c = h();
                        if (e.redeem && g.redeem) {
                            if (e.redeem.redeemVersion && e.redeem.redeemVersion !== g.redeem.redeemVersion) throw new TypeError("Redeem.redeemVersion and witness mismatch");
                            if (e.redeem.output) {
                                if (0 === i.decompile(e.redeem.output).length) throw new TypeError("Redeem.output is invalid");
                                if (g.redeem.output && !e.redeem.output.equals(g.redeem.output)) throw new TypeError("Redeem.output and witness mismatch")
                            }
                            if (e.redeem.witness && g.redeem.witness && !(0, a.stacksEqual)(e.redeem.witness, g.redeem.witness)) throw new TypeError("Redeem.witness and witness mismatch")
                        }
                        if (c && c.length)
                            if (1 === c.length) {
                                if (e.signature && !e.signature.equals(c[0])) throw new TypeError("Signature mismatch")
                            } else {
                                const r = c[c.length - 1];
                                if (r.length < 33) throw new TypeError(`The control-block length is too small. Got ${r.length}, expected min 33.`);
                                if ((r.length - 33) % 32 != 0) throw new TypeError(`The control-block length of ${r.length} is incorrect!`);
                                const o = (r.length - 33) / 32;
                                if (o > 128) throw new TypeError(`The script path is too long. Got ${o}, expected max 128.`);
                                const n = r.slice(1, 33);
                                if (e.internalPubkey && !e.internalPubkey.equals(n)) throw new TypeError("Internal pubkey mismatch");
                                if (!(0, s.getEccLib)().isXOnlyPoint(n)) throw new TypeError("Invalid internalPubkey for p2tr witness");
                                const i = r[0] & a.TAPLEAF_VERSION_MASK,
                                    l = c[c.length - 2],
                                    f = (0, u.tapleafHash)({
                                        output: l,
                                        version: i
                                    }),
                                    d = (0, u.rootHashFromPath)(r, f),
                                    h = (0, u.tweakKey)(n, d);
                                if (!h) throw new TypeError("Invalid outputKey for p2tr witness");
                                if (t.length && !t.equals(h.x)) throw new TypeError("Pubkey mismatch for p2tr witness");
                                if (h.parity !== (1 & r[0])) throw new Error("Incorrect parity")
                            }
                    }
                    return Object.assign(g, e)
                }
            },
            7856: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2wpkh = void 0;
                const o = r(161),
                    n = r(2307),
                    i = r(6391),
                    a = r(547),
                    s = r(12),
                    u = r(6976),
                    c = i.OPS,
                    l = Buffer.alloc(0);
                t.p2wpkh = function(e, t) {
                    if (!(e.address || e.hash || e.output || e.pubkey || e.witness)) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, a.typeforce)({
                        address: a.typeforce.maybe(a.typeforce.String),
                        hash: a.typeforce.maybe(a.typeforce.BufferN(20)),
                        input: a.typeforce.maybe(a.typeforce.BufferN(0)),
                        network: a.typeforce.maybe(a.typeforce.Object),
                        output: a.typeforce.maybe(a.typeforce.BufferN(22)),
                        pubkey: a.typeforce.maybe(a.isPoint),
                        signature: a.typeforce.maybe(i.isCanonicalScriptSignature),
                        witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                    }, e);
                    const r = s.value((() => {
                            const t = u.bech32.decode(e.address),
                                r = t.words.shift(),
                                o = u.bech32.fromWords(t.words);
                            return {
                                version: r,
                                prefix: t.prefix,
                                data: Buffer.from(o)
                            }
                        })),
                        f = e.network || n.bitcoin,
                        d = {
                            name: "p2wpkh",
                            network: f
                        };
                    if (s.prop(d, "address", (() => {
                            if (!d.hash) return;
                            const e = u.bech32.toWords(d.hash);
                            return e.unshift(0), u.bech32.encode(f.bech32, e)
                        })), s.prop(d, "hash", (() => e.output ? e.output.slice(2, 22) : e.address ? r().data : e.pubkey || d.pubkey ? o.hash160(e.pubkey || d.pubkey) : void 0)), s.prop(d, "output", (() => {
                            if (d.hash) return i.compile([c.OP_0, d.hash])
                        })), s.prop(d, "pubkey", (() => e.pubkey ? e.pubkey : e.witness ? e.witness[1] : void 0)), s.prop(d, "signature", (() => {
                            if (e.witness) return e.witness[0]
                        })), s.prop(d, "input", (() => {
                            if (d.witness) return l
                        })), s.prop(d, "witness", (() => {
                            if (e.pubkey && e.signature) return [e.signature, e.pubkey]
                        })), t.validate) {
                        let t = Buffer.from([]);
                        if (e.address) {
                            if (f && f.bech32 !== r().prefix) throw new TypeError("Invalid prefix or Network mismatch");
                            if (0 !== r().version) throw new TypeError("Invalid address version");
                            if (20 !== r().data.length) throw new TypeError("Invalid address data");
                            t = r().data
                        }
                        if (e.hash) {
                            if (t.length > 0 && !t.equals(e.hash)) throw new TypeError("Hash mismatch");
                            t = e.hash
                        }
                        if (e.output) {
                            if (22 !== e.output.length || e.output[0] !== c.OP_0 || 20 !== e.output[1]) throw new TypeError("Output is invalid");
                            if (t.length > 0 && !t.equals(e.output.slice(2))) throw new TypeError("Hash mismatch");
                            t = e.output.slice(2)
                        }
                        if (e.pubkey) {
                            const r = o.hash160(e.pubkey);
                            if (t.length > 0 && !t.equals(r)) throw new TypeError("Hash mismatch");
                            if (t = r, !(0, a.isPoint)(e.pubkey) || 33 !== e.pubkey.length) throw new TypeError("Invalid pubkey for p2wpkh")
                        }
                        if (e.witness) {
                            if (2 !== e.witness.length) throw new TypeError("Witness is invalid");
                            if (!i.isCanonicalScriptSignature(e.witness[0])) throw new TypeError("Witness has invalid signature");
                            if (!(0, a.isPoint)(e.witness[1]) || 33 !== e.witness[1].length) throw new TypeError("Witness has invalid pubkey");
                            if (e.signature && !e.signature.equals(e.witness[0])) throw new TypeError("Signature mismatch");
                            if (e.pubkey && !e.pubkey.equals(e.witness[1])) throw new TypeError("Pubkey mismatch");
                            const r = o.hash160(e.witness[1]);
                            if (t.length > 0 && !t.equals(r)) throw new TypeError("Hash mismatch")
                        }
                    }
                    return Object.assign(d, e)
                }
            },
            3392: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.p2wsh = void 0;
                const o = r(161),
                    n = r(2307),
                    i = r(6391),
                    a = r(547),
                    s = r(12),
                    u = r(6976),
                    c = i.OPS,
                    l = Buffer.alloc(0);

                function f(e) {
                    return !(!Buffer.isBuffer(e) || 65 !== e.length || 4 !== e[0] || !(0, a.isPoint)(e))
                }
                t.p2wsh = function(e, t) {
                    if (!(e.address || e.hash || e.output || e.redeem || e.witness)) throw new TypeError("Not enough data");
                    t = Object.assign({
                        validate: !0
                    }, t || {}), (0, a.typeforce)({
                        network: a.typeforce.maybe(a.typeforce.Object),
                        address: a.typeforce.maybe(a.typeforce.String),
                        hash: a.typeforce.maybe(a.typeforce.BufferN(32)),
                        output: a.typeforce.maybe(a.typeforce.BufferN(34)),
                        redeem: a.typeforce.maybe({
                            input: a.typeforce.maybe(a.typeforce.Buffer),
                            network: a.typeforce.maybe(a.typeforce.Object),
                            output: a.typeforce.maybe(a.typeforce.Buffer),
                            witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                        }),
                        input: a.typeforce.maybe(a.typeforce.BufferN(0)),
                        witness: a.typeforce.maybe(a.typeforce.arrayOf(a.typeforce.Buffer))
                    }, e);
                    const r = s.value((() => {
                            const t = u.bech32.decode(e.address),
                                r = t.words.shift(),
                                o = u.bech32.fromWords(t.words);
                            return {
                                version: r,
                                prefix: t.prefix,
                                data: Buffer.from(o)
                            }
                        })),
                        d = s.value((() => i.decompile(e.redeem.input)));
                    let h = e.network;
                    h || (h = e.redeem && e.redeem.network || n.bitcoin);
                    const p = {
                        network: h
                    };
                    if (s.prop(p, "address", (() => {
                            if (!p.hash) return;
                            const e = u.bech32.toWords(p.hash);
                            return e.unshift(0), u.bech32.encode(h.bech32, e)
                        })), s.prop(p, "hash", (() => e.output ? e.output.slice(2) : e.address ? r().data : p.redeem && p.redeem.output ? o.sha256(p.redeem.output) : void 0)), s.prop(p, "output", (() => {
                            if (p.hash) return i.compile([c.OP_0, p.hash])
                        })), s.prop(p, "redeem", (() => {
                            if (e.witness) return {
                                output: e.witness[e.witness.length - 1],
                                input: l,
                                witness: e.witness.slice(0, -1)
                            }
                        })), s.prop(p, "input", (() => {
                            if (p.witness) return l
                        })), s.prop(p, "witness", (() => {
                            if (e.redeem && e.redeem.input && e.redeem.input.length > 0 && e.redeem.output && e.redeem.output.length > 0) {
                                const t = i.toStack(d());
                                return p.redeem = Object.assign({
                                    witness: t
                                }, e.redeem), p.redeem.input = l, [].concat(t, e.redeem.output)
                            }
                            if (e.redeem && e.redeem.output && e.redeem.witness) return [].concat(e.redeem.witness, e.redeem.output)
                        })), s.prop(p, "name", (() => {
                            const e = ["p2wsh"];
                            return void 0 !== p.redeem && void 0 !== p.redeem.name && e.push(p.redeem.name), e.join("-")
                        })), t.validate) {
                        let t = Buffer.from([]);
                        if (e.address) {
                            if (r().prefix !== h.bech32) throw new TypeError("Invalid prefix or Network mismatch");
                            if (0 !== r().version) throw new TypeError("Invalid address version");
                            if (32 !== r().data.length) throw new TypeError("Invalid address data");
                            t = r().data
                        }
                        if (e.hash) {
                            if (t.length > 0 && !t.equals(e.hash)) throw new TypeError("Hash mismatch");
                            t = e.hash
                        }
                        if (e.output) {
                            if (34 !== e.output.length || e.output[0] !== c.OP_0 || 32 !== e.output[1]) throw new TypeError("Output is invalid");
                            const r = e.output.slice(2);
                            if (t.length > 0 && !t.equals(r)) throw new TypeError("Hash mismatch");
                            t = r
                        }
                        if (e.redeem) {
                            if (e.redeem.network && e.redeem.network !== h) throw new TypeError("Network mismatch");
                            if (e.redeem.input && e.redeem.input.length > 0 && e.redeem.witness && e.redeem.witness.length > 0) throw new TypeError("Ambiguous witness source");
                            if (e.redeem.output) {
                                const r = i.decompile(e.redeem.output);
                                if (!r || r.length < 1) throw new TypeError("Redeem.output is invalid");
                                if (e.redeem.output.byteLength > 3600) throw new TypeError("Redeem.output unspendable if larger than 3600 bytes");
                                if (i.countNonPushOnlyOPs(r) > 201) throw new TypeError("Redeem.output unspendable with more than 201 non-push ops");
                                const n = o.sha256(e.redeem.output);
                                if (t.length > 0 && !t.equals(n)) throw new TypeError("Hash mismatch");
                                t = n
                            }
                            if (e.redeem.input && !i.isPushOnly(d())) throw new TypeError("Non push-only scriptSig");
                            if (e.witness && e.redeem.witness && !(0, a.stacksEqual)(e.witness, e.redeem.witness)) throw new TypeError("Witness and redeem.witness mismatch");
                            if (e.redeem.input && d().some(f) || e.redeem.output && (i.decompile(e.redeem.output) || []).some(f)) throw new TypeError("redeem.input or redeem.output contains uncompressed pubkey")
                        }
                        if (e.witness && e.witness.length > 0) {
                            const t = e.witness[e.witness.length - 1];
                            if (e.redeem && e.redeem.output && !e.redeem.output.equals(t)) throw new TypeError("Witness and redeem.output mismatch");
                            if (e.witness.some(f) || (i.decompile(t) || []).some(f)) throw new TypeError("Witness contains uncompressed pubkey")
                        }
                    }
                    return Object.assign(p, e)
                }
            },
            2344: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Psbt = void 0;
                const o = r(4611),
                    n = r(9043),
                    i = r(8759),
                    a = r(6774),
                    s = r(7809),
                    u = r(2307),
                    c = r(9576),
                    l = r(153),
                    f = r(6391),
                    d = r(2146),
                    h = r(9234),
                    p = r(9760),
                    b = {
                        network: u.bitcoin,
                        maximumFeeRate: 5e3
                    };
                class g {
                    static fromBase64(e, t = {}) {
                        const r = Buffer.from(e, "base64");
                        return this.fromBuffer(r, t)
                    }
                    static fromHex(e, t = {}) {
                        const r = Buffer.from(e, "hex");
                        return this.fromBuffer(r, t)
                    }
                    static fromBuffer(e, t = {}) {
                        const r = o.Psbt.fromBuffer(e, m),
                            n = new g(t, r);
                        var i, a;
                        return i = n.__CACHE.__TX, a = n.__CACHE, i.ins.forEach((e => {
                            x(a, e)
                        })), n
                    }
                    constructor(e = {}, t = new o.Psbt(new y)) {
                        this.data = t, this.opts = Object.assign({}, b, e), this.__CACHE = {
                            __NON_WITNESS_UTXO_TX_CACHE: [],
                            __NON_WITNESS_UTXO_BUF_CACHE: [],
                            __TX_IN_CACHE: {},
                            __TX: this.data.globalMap.unsignedTx.tx,
                            __UNSAFE_SIGN_NONSEGWIT: !1
                        }, 0 === this.data.inputs.length && this.setVersion(2);
                        const r = (e, t, r, o) => Object.defineProperty(e, t, {
                            enumerable: r,
                            writable: o
                        });
                        r(this, "__CACHE", !1, !0), r(this, "opts", !1, !0)
                    }
                    get inputCount() {
                        return this.data.inputs.length
                    }
                    get version() {
                        return this.__CACHE.__TX.version
                    }
                    set version(e) {
                        this.setVersion(e)
                    }
                    get locktime() {
                        return this.__CACHE.__TX.locktime
                    }
                    set locktime(e) {
                        this.setLocktime(e)
                    }
                    get txInputs() {
                        return this.__CACHE.__TX.ins.map((e => ({
                            hash: (0, s.cloneBuffer)(e.hash),
                            index: e.index,
                            sequence: e.sequence
                        })))
                    }
                    get txOutputs() {
                        return this.__CACHE.__TX.outs.map((e => {
                            let t;
                            try {
                                t = (0, a.fromOutputScript)(e.script, this.opts.network)
                            } catch (e) {}
                            return {
                                script: (0, s.cloneBuffer)(e.script),
                                value: e.value,
                                address: t
                            }
                        }))
                    }
                    combine(...e) {
                        return this.data.combine(...e.map((e => e.data))), this
                    }
                    clone() {
                        const e = g.fromBuffer(this.data.toBuffer());
                        return e.opts = JSON.parse(JSON.stringify(this.opts)), e
                    }
                    setMaximumFeeRate(e) {
                        _(e), this.opts.maximumFeeRate = e
                    }
                    setVersion(e) {
                        _(e), S(this.data.inputs, "setVersion");
                        const t = this.__CACHE;
                        return t.__TX.version = e, t.__EXTRACTED_TX = void 0, this
                    }
                    setLocktime(e) {
                        _(e), S(this.data.inputs, "setLocktime");
                        const t = this.__CACHE;
                        return t.__TX.locktime = e, t.__EXTRACTED_TX = void 0, this
                    }
                    setInputSequence(e, t) {
                        _(t), S(this.data.inputs, "setInputSequence");
                        const r = this.__CACHE;
                        if (r.__TX.ins.length <= e) throw new Error("Input index too high");
                        return r.__TX.ins[e].sequence = t, r.__EXTRACTED_TX = void 0, this
                    }
                    addInputs(e) {
                        return e.forEach((e => this.addInput(e))), this
                    }
                    addInput(e) {
                        if (arguments.length > 1 || !e || void 0 === e.hash || void 0 === e.index) throw new Error("Invalid arguments for Psbt.addInput. Requires single object with at least [hash] and [index]");
                        (0, h.checkTaprootInputFields)(e, e, "addInput"), S(this.data.inputs, "addInput"), e.witnessScript && G(e.witnessScript);
                        const t = this.__CACHE;
                        this.data.addInput(e), x(t, t.__TX.ins[t.__TX.ins.length - 1]);
                        const r = this.data.inputs.length - 1,
                            o = this.data.inputs[r];
                        return o.nonWitnessUtxo && M(this.__CACHE, o, r), t.__FEE = void 0, t.__FEE_RATE = void 0, t.__EXTRACTED_TX = void 0, this
                    }
                    addOutputs(e) {
                        return e.forEach((e => this.addOutput(e))), this
                    }
                    addOutput(e) {
                        if (arguments.length > 1 || !e || void 0 === e.value || void 0 === e.address && void 0 === e.script) throw new Error("Invalid arguments for Psbt.addOutput. Requires single object with at least [script or address] and [value]");
                        S(this.data.inputs, "addOutput");
                        const {
                            address: t
                        } = e;
                        if ("string" == typeof t) {
                            const {
                                network: r
                            } = this.opts, o = (0, a.toOutputScript)(t, r);
                            e = Object.assign({}, e, {
                                script: o
                            })
                        }(0, h.checkTaprootOutputFields)(e, e, "addOutput");
                        const r = this.__CACHE;
                        return this.data.addOutput(e), r.__FEE = void 0, r.__FEE_RATE = void 0, r.__EXTRACTED_TX = void 0, this
                    }
                    extractTransaction(e) {
                        if (!this.data.inputs.every(k)) throw new Error("Not finalized");
                        const t = this.__CACHE;
                        if (e || function(e, t, r) {
                                const o = t.__FEE_RATE || e.getFeeRate(),
                                    n = t.__EXTRACTED_TX.virtualSize(),
                                    i = o * n;
                                if (o >= r.maximumFeeRate) throw new Error(`Warning: You are paying around ${(i/1e8).toFixed(8)} in fees, which is ${o} satoshi per byte for a transaction with a VSize of ${n} bytes (segwit counted as 0.25 byte per byte). Use setMaximumFeeRate method to raise your threshold, or pass true to the first arg of extractTransaction.`)
                            }(this, t, this.opts), t.__EXTRACTED_TX) return t.__EXTRACTED_TX;
                        const r = t.__TX.clone();
                        return D(this.data.inputs, r, t, !0), r
                    }
                    getFeeRate() {
                        return O("__FEE_RATE", "fee rate", this.data.inputs, this.__CACHE)
                    }
                    getFee() {
                        return O("__FEE", "fee", this.data.inputs, this.__CACHE)
                    }
                    finalizeAllInputs() {
                        return (0, i.checkForInput)(this.data.inputs, 0), $(this.data.inputs.length).forEach((e => this.finalizeInput(e))), this
                    }
                    finalizeInput(e, t) {
                        const r = (0, i.checkForInput)(this.data.inputs, e);
                        return (0, h.isTaprootInput)(r) ? this._finalizeTaprootInput(e, r, void 0, t) : this._finalizeInput(e, r, t)
                    }
                    finalizeTaprootInput(e, t, r = h.tapScriptFinalizer) {
                        const o = (0, i.checkForInput)(this.data.inputs, e);
                        if ((0, h.isTaprootInput)(o)) return this._finalizeTaprootInput(e, o, t, r);
                        throw new Error(`Cannot finalize input #${e}. Not Taproot.`)
                    }
                    _finalizeInput(e, t, r = P) {
                        const {
                            script: o,
                            isP2SH: n,
                            isP2WSH: i,
                            isSegwit: a
                        } = function(e, t, r) {
                            const o = r.__TX,
                                n = {
                                    script: null,
                                    isSegwit: !1,
                                    isP2SH: !1,
                                    isP2WSH: !1
                                };
                            if (n.isP2SH = !!t.redeemScript, n.isP2WSH = !!t.witnessScript, t.witnessScript) n.script = t.witnessScript;
                            else if (t.redeemScript) n.script = t.redeemScript;
                            else if (t.nonWitnessUtxo) {
                                const i = q(r, t, e),
                                    a = o.ins[e].index;
                                n.script = i.outs[a].script
                            } else t.witnessUtxo && (n.script = t.witnessUtxo.script);
                            return (t.witnessScript || (0, p.isP2WPKH)(n.script)) && (n.isSegwit = !0), n
                        }(e, t, this.__CACHE);
                        if (!o) throw new Error(`No script found for input #${e}`);
                        ! function(e) {
                            if (!e.sighashType || !e.partialSig) return;
                            const {
                                partialSig: t,
                                sighashType: r
                            } = e;
                            t.forEach((e => {
                                const {
                                    hashType: t
                                } = f.signature.decode(e.signature);
                                if (r !== t) throw new Error("Signature sighash does not match input sighash type")
                            }))
                        }(t);
                        const {
                            finalScriptSig: s,
                            finalScriptWitness: u
                        } = r(e, t, o, a, n, i);
                        if (s && this.data.updateInput(e, {
                                finalScriptSig: s
                            }), u && this.data.updateInput(e, {
                                finalScriptWitness: u
                            }), !s && !u) throw new Error(`Unknown error finalizing input #${e}`);
                        return this.data.clearFinalizedInput(e), this
                    }
                    _finalizeTaprootInput(e, t, r, o = h.tapScriptFinalizer) {
                        if (!t.witnessUtxo) throw new Error(`Cannot finalize input #${e}. Missing withness utxo.`);
                        if (t.tapKeySig) {
                            const r = c.p2tr({
                                    output: t.witnessUtxo.script,
                                    signature: t.tapKeySig
                                }),
                                o = (0, p.witnessStackToScriptWitness)(r.witness);
                            this.data.updateInput(e, {
                                finalScriptWitness: o
                            })
                        } else {
                            const {
                                finalScriptWitness: n
                            } = o(e, t, r);
                            this.data.updateInput(e, {
                                finalScriptWitness: n
                            })
                        }
                        return this.data.clearFinalizedInput(e), this
                    }
                    getInputType(e) {
                        const t = (0, i.checkForInput)(this.data.inputs, e),
                            r = W(F(e, t, this.__CACHE), e, "input", t.redeemScript || function(e) {
                                if (!e) return;
                                const t = f.decompile(e);
                                if (!t) return;
                                const r = t[t.length - 1];
                                var o;
                                if (Buffer.isBuffer(r) && !V(r) && (o = r, !f.isCanonicalScriptSignature(o)) && f.decompile(r)) return r
                            }(t.finalScriptSig), t.witnessScript || function(e) {
                                if (!e) return;
                                const t = C(e),
                                    r = t[t.length - 1];
                                return !V(r) && f.decompile(r) ? r : void 0
                            }(t.finalScriptWitness));
                        return ("raw" === r.type ? "" : r.type + "-") + X(r.meaningfulScript)
                    }
                    inputHasPubkey(e, t) {
                        return function(e, t, r, o) {
                            const n = F(r, t, o),
                                {
                                    meaningfulScript: i
                                } = W(n, r, "input", t.redeemScript, t.witnessScript);
                            return (0, p.pubkeyInScript)(e, i)
                        }(t, (0, i.checkForInput)(this.data.inputs, e), e, this.__CACHE)
                    }
                    inputHasHDKey(e, t) {
                        const r = (0, i.checkForInput)(this.data.inputs, e),
                            o = E(t);
                        return !!r.bip32Derivation && r.bip32Derivation.some(o)
                    }
                    outputHasPubkey(e, t) {
                        return function(e, t, r, o) {
                            const n = o.__TX.outs[r].script,
                                {
                                    meaningfulScript: i
                                } = W(n, r, "output", t.redeemScript, t.witnessScript);
                            return (0, p.pubkeyInScript)(e, i)
                        }(t, (0, i.checkForOutput)(this.data.outputs, e), e, this.__CACHE)
                    }
                    outputHasHDKey(e, t) {
                        const r = (0, i.checkForOutput)(this.data.outputs, e),
                            o = E(t);
                        return !!r.bip32Derivation && r.bip32Derivation.some(o)
                    }
                    validateSignaturesOfAllInputs(e) {
                        return (0, i.checkForInput)(this.data.inputs, 0), $(this.data.inputs.length).map((t => this.validateSignaturesOfInput(t, e))).reduce(((e, t) => !0 === t && e), !0)
                    }
                    validateSignaturesOfInput(e, t, r) {
                        const o = this.data.inputs[e];
                        return (0, h.isTaprootInput)(o) ? this.validateSignaturesOfTaprootInput(e, t, r) : this._validateSignaturesOfInput(e, t, r)
                    }
                    _validateSignaturesOfInput(e, t, r) {
                        const o = this.data.inputs[e],
                            n = (o || {}).partialSig;
                        if (!o || !n || n.length < 1) throw new Error("No signatures to validate");
                        if ("function" != typeof t) throw new Error("Need validator function to validate signatures");
                        const i = r ? n.filter((e => e.pubkey.equals(r))) : n;
                        if (i.length < 1) throw new Error("No signatures for this pubkey");
                        const a = [];
                        let s, u, c;
                        for (const r of i) {
                            const n = f.signature.decode(r.signature),
                                {
                                    hash: i,
                                    script: l
                                } = c !== n.hashType ? j(e, Object.assign({}, o, {
                                    sighashType: n.hashType
                                }), this.__CACHE, !0) : {
                                    hash: s,
                                    script: u
                                };
                            c = n.hashType, s = i, u = l, T(r.pubkey, l, "verify"), a.push(t(r.pubkey, i, n.signature))
                        }
                        return a.every((e => !0 === e))
                    }
                    validateSignaturesOfTaprootInput(e, t, r) {
                        const o = this.data.inputs[e],
                            n = (o || {}).tapKeySig,
                            i = (o || {}).tapScriptSig;
                        if (!o && !n && (!i || i.length)) throw new Error("No signatures to validate");
                        if ("function" != typeof t) throw new Error("Need validator function to validate signatures");
                        const a = (r = r && (0, h.toXOnly)(r)) ? N(e, o, this.data.inputs, r, this.__CACHE) : function(e, t, r, o) {
                            const n = [];
                            if (t.tapInternalKey) {
                                const r = U(e, t, o);
                                r && n.push(r)
                            }
                            if (t.tapScriptSig) {
                                const e = t.tapScriptSig.map((e => e.pubkey));
                                n.push(...e)
                            }
                            return n.map((n => N(e, t, r, n, o))).flat()
                        }(e, o, this.data.inputs, this.__CACHE);
                        if (!a.length) throw new Error("No signatures for this pubkey");
                        const s = a.find((e => !e.leafHash));
                        let u = 0;
                        if (n && s) {
                            if (!t(s.pubkey, s.hash, L(n))) return !1;
                            u++
                        }
                        if (i)
                            for (const e of i) {
                                const r = a.find((t => e.pubkey.equals(t.pubkey)));
                                if (r) {
                                    if (!t(e.pubkey, r.hash, L(e.signature))) return !1;
                                    u++
                                }
                            }
                        return u > 0
                    }
                    signAllInputsHD(e, t = [d.Transaction.SIGHASH_ALL]) {
                        if (!e || !e.publicKey || !e.fingerprint) throw new Error("Need HDSigner to sign input");
                        const r = [];
                        for (const o of $(this.data.inputs.length)) try {
                            this.signInputHD(o, e, t), r.push(!0)
                        } catch (e) {
                            r.push(!1)
                        }
                        if (r.every((e => !1 === e))) throw new Error("No inputs were signed");
                        return this
                    }
                    signAllInputsHDAsync(e, t = [d.Transaction.SIGHASH_ALL]) {
                        return new Promise(((r, o) => {
                            if (!e || !e.publicKey || !e.fingerprint) return o(new Error("Need HDSigner to sign input"));
                            const n = [],
                                i = [];
                            for (const r of $(this.data.inputs.length)) i.push(this.signInputHDAsync(r, e, t).then((() => {
                                n.push(!0)
                            }), (() => {
                                n.push(!1)
                            })));
                            return Promise.all(i).then((() => {
                                if (n.every((e => !1 === e))) return o(new Error("No inputs were signed"));
                                r()
                            }))
                        }))
                    }
                    signInputHD(e, t, r = [d.Transaction.SIGHASH_ALL]) {
                        if (!t || !t.publicKey || !t.fingerprint) throw new Error("Need HDSigner to sign input");
                        return H(e, this.data.inputs, t).forEach((t => this.signInput(e, t, r))), this
                    }
                    signInputHDAsync(e, t, r = [d.Transaction.SIGHASH_ALL]) {
                        return new Promise(((o, n) => {
                            if (!t || !t.publicKey || !t.fingerprint) return n(new Error("Need HDSigner to sign input"));
                            const i = H(e, this.data.inputs, t).map((t => this.signInputAsync(e, t, r)));
                            return Promise.all(i).then((() => {
                                o()
                            })).catch(n)
                        }))
                    }
                    signAllInputs(e, t) {
                        if (!e || !e.publicKey) throw new Error("Need Signer to sign input");
                        const r = [];
                        for (const o of $(this.data.inputs.length)) try {
                            this.signInput(o, e, t), r.push(!0)
                        } catch (e) {
                            r.push(!1)
                        }
                        if (r.every((e => !1 === e))) throw new Error("No inputs were signed");
                        return this
                    }
                    signAllInputsAsync(e, t) {
                        return new Promise(((r, o) => {
                            if (!e || !e.publicKey) return o(new Error("Need Signer to sign input"));
                            const n = [],
                                i = [];
                            for (const [r] of this.data.inputs.entries()) i.push(this.signInputAsync(r, e, t).then((() => {
                                n.push(!0)
                            }), (() => {
                                n.push(!1)
                            })));
                            return Promise.all(i).then((() => {
                                if (n.every((e => !1 === e))) return o(new Error("No inputs were signed"));
                                r()
                            }))
                        }))
                    }
                    signInput(e, t, r) {
                        if (!t || !t.publicKey) throw new Error("Need Signer to sign input");
                        const o = (0, i.checkForInput)(this.data.inputs, e);
                        return (0, h.isTaprootInput)(o) ? this._signTaprootInput(e, o, t, void 0, r) : this._signInput(e, t, r)
                    }
                    signTaprootInput(e, t, r, o) {
                        if (!t || !t.publicKey) throw new Error("Need Signer to sign input");
                        const n = (0, i.checkForInput)(this.data.inputs, e);
                        if ((0, h.isTaprootInput)(n)) return this._signTaprootInput(e, n, t, r, o);
                        throw new Error(`Input #${e} is not of type Taproot.`)
                    }
                    _signInput(e, t, r = [d.Transaction.SIGHASH_ALL]) {
                        const {
                            hash: o,
                            sighashType: n
                        } = z(this.data.inputs, e, t.publicKey, this.__CACHE, r), i = [{
                            pubkey: t.publicKey,
                            signature: f.signature.encode(t.sign(o), n)
                        }];
                        return this.data.updateInput(e, {
                            partialSig: i
                        }), this
                    }
                    _signTaprootInput(e, t, r, o, n = [d.Transaction.SIGHASH_DEFAULT]) {
                        const i = this.checkTaprootHashesForSig(e, t, r, o, n),
                            a = i.filter((e => !e.leafHash)).map((e => (0, h.serializeTaprootSignature)(r.signSchnorr(e.hash), t.sighashType)))[0],
                            s = i.filter((e => !!e.leafHash)).map((e => ({
                                pubkey: (0, h.toXOnly)(r.publicKey),
                                signature: (0, h.serializeTaprootSignature)(r.signSchnorr(e.hash), t.sighashType),
                                leafHash: e.leafHash
                            })));
                        return a && this.data.updateInput(e, {
                            tapKeySig: a
                        }), s.length && this.data.updateInput(e, {
                            tapScriptSig: s
                        }), this
                    }
                    signInputAsync(e, t, r) {
                        return Promise.resolve().then((() => {
                            if (!t || !t.publicKey) throw new Error("Need Signer to sign input");
                            const o = (0, i.checkForInput)(this.data.inputs, e);
                            return (0, h.isTaprootInput)(o) ? this._signTaprootInputAsync(e, o, t, void 0, r) : this._signInputAsync(e, t, r)
                        }))
                    }
                    signTaprootInputAsync(e, t, r, o) {
                        return Promise.resolve().then((() => {
                            if (!t || !t.publicKey) throw new Error("Need Signer to sign input");
                            const n = (0, i.checkForInput)(this.data.inputs, e);
                            if ((0, h.isTaprootInput)(n)) return this._signTaprootInputAsync(e, n, t, r, o);
                            throw new Error(`Input #${e} is not of type Taproot.`)
                        }))
                    }
                    _signInputAsync(e, t, r = [d.Transaction.SIGHASH_ALL]) {
                        const {
                            hash: o,
                            sighashType: n
                        } = z(this.data.inputs, e, t.publicKey, this.__CACHE, r);
                        return Promise.resolve(t.sign(o)).then((r => {
                            const o = [{
                                pubkey: t.publicKey,
                                signature: f.signature.encode(r, n)
                            }];
                            this.data.updateInput(e, {
                                partialSig: o
                            })
                        }))
                    }
                    async _signTaprootInputAsync(e, t, r, o, n = [d.Transaction.SIGHASH_DEFAULT]) {
                        const i = this.checkTaprootHashesForSig(e, t, r, o, n),
                            a = [],
                            s = i.filter((e => !e.leafHash))[0];
                        if (s) {
                            const e = Promise.resolve(r.signSchnorr(s.hash)).then((e => ({
                                tapKeySig: (0, h.serializeTaprootSignature)(e, t.sighashType)
                            })));
                            a.push(e)
                        }
                        const u = i.filter((e => !!e.leafHash));
                        if (u.length) {
                            const e = u.map((e => Promise.resolve(r.signSchnorr(e.hash)).then((o => ({
                                tapScriptSig: [{
                                    pubkey: (0, h.toXOnly)(r.publicKey),
                                    signature: (0, h.serializeTaprootSignature)(o, t.sighashType),
                                    leafHash: e.leafHash
                                }]
                            })))));
                            a.push(...e)
                        }
                        return Promise.all(a).then((t => {
                            t.forEach((t => this.data.updateInput(e, t)))
                        }))
                    }
                    checkTaprootHashesForSig(e, t, r, o, n) {
                        if ("function" != typeof r.signSchnorr) throw new Error(`Need Schnorr Signer to sign taproot input #${e}.`);
                        const i = N(e, t, this.data.inputs, r.publicKey, this.__CACHE, o, n);
                        if (!i || !i.length) throw new Error(`Can not sign for input #${e} with the key ${r.publicKey.toString("hex")}`);
                        return i
                    }
                    toBuffer() {
                        return v(this.__CACHE), this.data.toBuffer()
                    }
                    toHex() {
                        return v(this.__CACHE), this.data.toHex()
                    }
                    toBase64() {
                        return v(this.__CACHE), this.data.toBase64()
                    }
                    updateGlobal(e) {
                        return this.data.updateGlobal(e), this
                    }
                    updateInput(e, t) {
                        return t.witnessScript && G(t.witnessScript), (0, h.checkTaprootInputFields)(this.data.inputs[e], t, "updateInput"), this.data.updateInput(e, t), t.nonWitnessUtxo && M(this.__CACHE, this.data.inputs[e], e), this
                    }
                    updateOutput(e, t) {
                        const r = this.data.outputs[e];
                        return (0, h.checkTaprootOutputFields)(r, t, "updateOutput"), this.data.updateOutput(e, t), this
                    }
                    addUnknownKeyValToGlobal(e) {
                        return this.data.addUnknownKeyValToGlobal(e), this
                    }
                    addUnknownKeyValToInput(e, t) {
                        return this.data.addUnknownKeyValToInput(e, t), this
                    }
                    addUnknownKeyValToOutput(e, t) {
                        return this.data.addUnknownKeyValToOutput(e, t), this
                    }
                    clearFinalizedInput(e) {
                        return this.data.clearFinalizedInput(e), this
                    }
                }
                t.Psbt = g;
                const m = e => new y(e);
                class y {
                    constructor(e = Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
                        this.tx = d.Transaction.fromBuffer(e),
                            function(e) {
                                if (!e.ins.every((e => e.script && 0 === e.script.length && e.witness && 0 === e.witness.length))) throw new Error("Format Error: Transaction ScriptSigs are not empty")
                            }(this.tx), Object.defineProperty(this, "tx", {
                                enumerable: !1,
                                writable: !0
                            })
                    }
                    getInputOutputCounts() {
                        return {
                            inputCount: this.tx.ins.length,
                            outputCount: this.tx.outs.length
                        }
                    }
                    addInput(e) {
                        if (void 0 === e.hash || void 0 === e.index || !Buffer.isBuffer(e.hash) && "string" != typeof e.hash || "number" != typeof e.index) throw new Error("Error adding input.");
                        const t = "string" == typeof e.hash ? (0, s.reverseBuffer)(Buffer.from(e.hash, "hex")) : e.hash;
                        this.tx.addInput(t, e.index, e.sequence)
                    }
                    addOutput(e) {
                        if (void 0 === e.script || void 0 === e.value || !Buffer.isBuffer(e.script) || "number" != typeof e.value) throw new Error("Error adding output.");
                        this.tx.addOutput(e.script, e.value)
                    }
                    toBuffer() {
                        return this.tx.toBuffer()
                    }
                }

                function v(e) {
                    if (!1 !== e.__UNSAFE_SIGN_NONSEGWIT) throw new Error("Not BIP174 compliant, can not export")
                }

                function w(e, t, r) {
                    if (!t) return !1;
                    let o;
                    if (o = r ? r.map((e => {
                            const r = function(e) {
                                if (65 === e.length) {
                                    const t = 1 & e[64],
                                        r = e.slice(0, 33);
                                    return r[0] = 2 | t, r
                                }
                                return e.slice()
                            }(e);
                            return t.find((e => e.pubkey.equals(r)))
                        })).filter((e => !!e)) : t, o.length > e) throw new Error("Too many signatures");
                    return o.length === e
                }

                function k(e) {
                    return !!e.finalScriptSig || !!e.finalScriptWitness
                }

                function E(e) {
                    return t => !!t.masterFingerprint.equals(e.fingerprint) && !!e.derivePath(t.path).publicKey.equals(t.pubkey)
                }

                function _(e) {
                    if ("number" != typeof e || e !== Math.floor(e) || e > 4294967295 || e < 0) throw new Error("Invalid 32 bit integer")
                }

                function S(e, t) {
                    e.forEach((e => {
                        if ((0, h.isTaprootInput)(e) ? (0, h.checkTaprootInputForSigs)(e, t) : (0, p.checkInputForSig)(e, t)) throw new Error("Can not modify transaction, signatures exist.")
                    }))
                }

                function T(e, t, r) {
                    if (!(0, p.pubkeyInScript)(e, t)) throw new Error(`Can not ${r} for this input with the key ${e.toString("hex")}`)
                }

                function x(e, t) {
                    const r = (0, s.reverseBuffer)(Buffer.from(t.hash)).toString("hex") + ":" + t.index;
                    if (e.__TX_IN_CACHE[r]) throw new Error("Duplicate input detected.");
                    e.__TX_IN_CACHE[r] = 1
                }

                function I(e, t) {
                    return (r, o, n, i) => {
                        const a = e({
                            redeem: {
                                output: n
                            }
                        }).output;
                        if (!o.equals(a)) throw new Error(`${t} for ${i} #${r} doesn't match the scriptPubKey in the prevout`)
                    }
                }
                const B = I(c.p2sh, "Redeem script"),
                    A = I(c.p2wsh, "Witness script");

                function O(e, t, r, o) {
                    if (!r.every(k)) throw new Error(`PSBT must be finalized to calculate ${t}`);
                    if ("__FEE_RATE" === e && o.__FEE_RATE) return o.__FEE_RATE;
                    if ("__FEE" === e && o.__FEE) return o.__FEE;
                    let n, i = !0;
                    return o.__EXTRACTED_TX ? (n = o.__EXTRACTED_TX, i = !1) : n = o.__TX.clone(), D(r, n, o, i), "__FEE_RATE" === e ? o.__FEE_RATE : "__FEE" === e ? o.__FEE : void 0
                }

                function P(e, t, r, o, n, i) {
                    const a = X(r);
                    if (! function(e, t, r) {
                            switch (r) {
                                case "pubkey":
                                case "pubkeyhash":
                                case "witnesspubkeyhash":
                                    return w(1, e.partialSig);
                                case "multisig":
                                    const r = c.p2ms({
                                        output: t
                                    });
                                    return w(r.m, e.partialSig, r.pubkeys);
                                default:
                                    return !1
                            }
                        }(t, r, a)) throw new Error(`Can not finalize input #${e}`);
                    return function(e, t, r, o, n, i) {
                        let a, s;
                        const u = function(e, t, r) {
                                let o;
                                switch (t) {
                                    case "multisig":
                                        const t = function(e, t) {
                                            return c.p2ms({
                                                output: e
                                            }).pubkeys.map((e => (t.filter((t => t.pubkey.equals(e)))[0] || {}).signature)).filter((e => !!e))
                                        }(e, r);
                                        o = c.p2ms({
                                            output: e,
                                            signatures: t
                                        });
                                        break;
                                    case "pubkey":
                                        o = c.p2pk({
                                            output: e,
                                            signature: r[0].signature
                                        });
                                        break;
                                    case "pubkeyhash":
                                        o = c.p2pkh({
                                            output: e,
                                            pubkey: r[0].pubkey,
                                            signature: r[0].signature
                                        });
                                        break;
                                    case "witnesspubkeyhash":
                                        o = c.p2wpkh({
                                            output: e,
                                            pubkey: r[0].pubkey,
                                            signature: r[0].signature
                                        })
                                }
                                return o
                            }(e, t, r),
                            l = i ? c.p2wsh({
                                redeem: u
                            }) : null,
                            f = n ? c.p2sh({
                                redeem: l || u
                            }) : null;
                        return o ? (s = l ? (0, p.witnessStackToScriptWitness)(l.witness) : (0, p.witnessStackToScriptWitness)(u.witness), f && (a = f.input)) : a = f ? f.input : u.input, {
                            finalScriptSig: a,
                            finalScriptWitness: s
                        }
                    }(r, a, t.partialSig, o, n, i)
                }

                function z(e, t, r, o, n) {
                    const a = (0, i.checkForInput)(e, t),
                        {
                            hash: s,
                            sighashType: u,
                            script: c
                        } = j(t, a, o, !1, n);
                    return T(r, c, "sign"), {
                        hash: s,
                        sighashType: u
                    }
                }

                function j(e, t, r, o, n) {
                    const i = r.__TX,
                        a = t.sighashType || d.Transaction.SIGHASH_ALL;
                    let s, u;
                    if (R(a, n), t.nonWitnessUtxo) {
                        const o = q(r, t, e),
                            n = i.ins[e].hash,
                            a = o.getHash();
                        if (!n.equals(a)) throw new Error(`Non-witness UTXO hash for input #${e} doesn't match the hash specified in the prevout`);
                        const s = i.ins[e].index;
                        u = o.outs[s]
                    } else {
                        if (!t.witnessUtxo) throw new Error("Need a Utxo input item for signing");
                        u = t.witnessUtxo
                    }
                    const {
                        meaningfulScript: l,
                        type: f
                    } = W(u.script, e, "input", t.redeemScript, t.witnessScript);
                    if (["p2sh-p2wsh", "p2wsh"].indexOf(f) >= 0) s = i.hashForWitnessV0(e, l, u.value, a);
                    else if ((0, p.isP2WPKH)(l)) {
                        const t = c.p2pkh({
                            hash: l.slice(2)
                        }).output;
                        s = i.hashForWitnessV0(e, t, u.value, a)
                    } else {
                        if (void 0 === t.nonWitnessUtxo && !1 === r.__UNSAFE_SIGN_NONSEGWIT) throw new Error(`Input #${e} has witnessUtxo but non-segwit script: ${l.toString("hex")}`);
                        o || !1 === r.__UNSAFE_SIGN_NONSEGWIT || console.warn("Warning: Signing non-segwit inputs without the full parent transaction means there is a chance that a miner could feed you incorrect information to trick you into paying large fees. This behavior is the same as Psbt's predecessor (TransactionBuilder - now removed) when signing non-segwit scripts. You are not able to export this Psbt with toBuffer|toBase64|toHex since it is not BIP174 compliant.\n*********************\nPROCEED WITH CAUTION!\n*********************"), s = i.hashForSignature(e, l, a)
                    }
                    return {
                        script: l,
                        sighashType: a,
                        hash: s
                    }
                }

                function U(e, t, r) {
                    const {
                        script: o
                    } = K(e, t, r);
                    return (0, p.isP2TR)(o) ? o.subarray(2, 34) : null
                }

                function L(e) {
                    return 64 === e.length ? e : e.subarray(0, 64)
                }

                function N(e, t, r, o, n, i, a) {
                    const s = n.__TX,
                        u = t.sighashType || d.Transaction.SIGHASH_DEFAULT;
                    R(u, a);
                    const c = r.map(((e, t) => K(t, e, n))),
                        f = c.map((e => e.script)),
                        b = c.map((e => e.value)),
                        g = [];
                    if (t.tapInternalKey && !i) {
                        const r = U(e, t, n) || Buffer.from([]);
                        if ((0, h.toXOnly)(o).equals(r)) {
                            const t = s.hashForWitnessV1(e, f, b, u);
                            g.push({
                                pubkey: o,
                                hash: t
                            })
                        }
                    }
                    const m = (t.tapLeafScript || []).filter((e => (0, p.pubkeyInScript)(o, e.script))).map((e => {
                        const t = (0, l.tapleafHash)({
                            output: e.script,
                            version: e.leafVersion
                        });
                        return Object.assign({
                            hash: t
                        }, e)
                    })).filter((e => !i || i.equals(e.hash))).map((t => {
                        const r = s.hashForWitnessV1(e, f, b, u, t.hash);
                        return {
                            pubkey: o,
                            hash: r,
                            leafHash: t.hash
                        }
                    }));
                    return g.concat(m)
                }

                function R(e, t) {
                    if (t && t.indexOf(e) < 0) {
                        const t = function(e) {
                            let t = e & d.Transaction.SIGHASH_ANYONECANPAY ? "SIGHASH_ANYONECANPAY | " : "";
                            switch (31 & e) {
                                case d.Transaction.SIGHASH_ALL:
                                    t += "SIGHASH_ALL";
                                    break;
                                case d.Transaction.SIGHASH_SINGLE:
                                    t += "SIGHASH_SINGLE";
                                    break;
                                case d.Transaction.SIGHASH_NONE:
                                    t += "SIGHASH_NONE"
                            }
                            return t
                        }(e);
                        throw new Error(`Sighash type is not allowed. Retry the sign method passing the sighashTypes array of whitelisted types. Sighash type: ${t}`)
                    }
                }

                function H(e, t, r) {
                    const o = (0, i.checkForInput)(t, e);
                    if (!o.bip32Derivation || 0 === o.bip32Derivation.length) throw new Error("Need bip32Derivation to sign with HD");
                    const n = o.bip32Derivation.map((e => e.masterFingerprint.equals(r.fingerprint) ? e : void 0)).filter((e => !!e));
                    if (0 === n.length) throw new Error("Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint");
                    return n.map((e => {
                        const t = r.derivePath(e.path);
                        if (!e.pubkey.equals(t.publicKey)) throw new Error("pubkey did not match bip32Derivation");
                        return t
                    }))
                }

                function C(e) {
                    let t = 0;

                    function r() {
                        const r = n.decode(e, t);
                        return t += n.decode.bytes, r
                    }
                    return function() {
                        const o = r(),
                            n = [];
                        for (let a = 0; a < o; a++) n.push((i = void 0, i = r(), t += i, e.slice(t - i, t)));
                        var i;
                        return n
                    }()
                }

                function M(e, t, r) {
                    e.__NON_WITNESS_UTXO_BUF_CACHE[r] = t.nonWitnessUtxo;
                    const o = d.Transaction.fromBuffer(t.nonWitnessUtxo);
                    e.__NON_WITNESS_UTXO_TX_CACHE[r] = o;
                    const n = e,
                        i = r;
                    delete t.nonWitnessUtxo, Object.defineProperty(t, "nonWitnessUtxo", {
                        enumerable: !0,
                        get() {
                            const e = n.__NON_WITNESS_UTXO_BUF_CACHE[i],
                                t = n.__NON_WITNESS_UTXO_TX_CACHE[i];
                            if (void 0 !== e) return e; {
                                const e = t.toBuffer();
                                return n.__NON_WITNESS_UTXO_BUF_CACHE[i] = e, e
                            }
                        },
                        set(e) {
                            n.__NON_WITNESS_UTXO_BUF_CACHE[i] = e
                        }
                    })
                }

                function D(e, t, r, o) {
                    let n = 0;
                    e.forEach(((e, i) => {
                        if (o && e.finalScriptSig && (t.ins[i].script = e.finalScriptSig), o && e.finalScriptWitness && (t.ins[i].witness = C(e.finalScriptWitness)), e.witnessUtxo) n += e.witnessUtxo.value;
                        else if (e.nonWitnessUtxo) {
                            const o = q(r, e, i),
                                a = t.ins[i].index,
                                s = o.outs[a];
                            n += s.value
                        }
                    }));
                    const i = t.outs.reduce(((e, t) => e + t.value), 0),
                        a = n - i;
                    if (a < 0) throw new Error("Outputs are spending more than Inputs");
                    const s = t.virtualSize();
                    r.__FEE = a, r.__EXTRACTED_TX = t, r.__FEE_RATE = Math.floor(a / s)
                }

                function q(e, t, r) {
                    const o = e.__NON_WITNESS_UTXO_TX_CACHE;
                    return o[r] || M(e, t, r), o[r]
                }

                function F(e, t, r) {
                    const {
                        script: o
                    } = K(e, t, r);
                    return o
                }

                function K(e, t, r) {
                    if (void 0 !== t.witnessUtxo) return {
                        script: t.witnessUtxo.script,
                        value: t.witnessUtxo.value
                    };
                    if (void 0 !== t.nonWitnessUtxo) {
                        const o = q(r, t, e).outs[r.__TX.ins[e].index];
                        return {
                            script: o.script,
                            value: o.value
                        }
                    }
                    throw new Error("Can't find pubkey in input without Utxo data")
                }

                function V(e) {
                    return 33 === e.length && f.isCanonicalPubKey(e)
                }

                function W(e, t, r, o, n) {
                    const i = (0, p.isP2SHScript)(e),
                        a = i && o && (0, p.isP2WSHScript)(o),
                        s = (0, p.isP2WSHScript)(e);
                    if (i && void 0 === o) throw new Error("scriptPubkey is P2SH but redeemScript missing");
                    if ((s || a) && void 0 === n) throw new Error("scriptPubkey or redeemScript is P2WSH but witnessScript missing");
                    let u;
                    return a ? (u = n, B(t, e, o, r), A(t, o, n, r), G(u)) : s ? (u = n, A(t, e, n, r), G(u)) : i ? (u = o, B(t, e, o, r)) : u = e, {
                        meaningfulScript: u,
                        type: a ? "p2sh-p2wsh" : i ? "p2sh" : s ? "p2wsh" : "raw"
                    }
                }

                function G(e) {
                    if ((0, p.isP2WPKH)(e) || (0, p.isP2SHScript)(e)) throw new Error("P2WPKH or P2SH can not be contained within P2WSH")
                }

                function X(e) {
                    return (0, p.isP2WPKH)(e) ? "witnesspubkeyhash" : (0, p.isP2PKH)(e) ? "pubkeyhash" : (0, p.isP2MS)(e) ? "multisig" : (0, p.isP2PK)(e) ? "pubkey" : "nonstandard"
                }

                function $(e) {
                    return [...Array(e).keys()]
                }
            },
            9234: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.checkTaprootInputForSigs = t.tapTreeFromList = t.tapTreeToList = t.tweakInternalPubKey = t.checkTaprootOutputFields = t.checkTaprootInputFields = t.isTaprootOutput = t.isTaprootInput = t.serializeTaprootSignature = t.tapScriptFinalizer = t.toXOnly = void 0;
                const o = r(547),
                    n = r(2146),
                    i = r(9760),
                    a = r(153),
                    s = r(9576),
                    u = r(9760);

                function c(e) {
                    return e && !!(e.tapInternalKey || e.tapMerkleRoot || e.tapLeafScript && e.tapLeafScript.length || e.tapBip32Derivation && e.tapBip32Derivation.length || e.witnessUtxo && (0, i.isP2TR)(e.witnessUtxo.script))
                }

                function l(e, t) {
                    return e && !!(e.tapInternalKey || e.tapTree || e.tapBip32Derivation && e.tapBip32Derivation.length || t && (0, i.isP2TR)(t))
                }

                function f(e = []) {
                    return 1 === e.length && 0 === e[0].depth ? {
                        output: e[0].script,
                        version: e[0].leafVersion
                    } : function(e) {
                        let t;
                        for (const r of e)
                            if (t = p(r, t), !t) throw new Error("No room left to insert tapleaf in tree");
                        return t
                    }(e)
                }

                function d(e) {
                    return {
                        signature: e.slice(0, 64),
                        hashType: e.slice(64)[0] || n.Transaction.SIGHASH_DEFAULT
                    }
                }

                function h(e, t = [], r = 0) {
                    if (r > a.MAX_TAPTREE_DEPTH) throw new Error("Max taptree depth exceeded.");
                    return e ? (0, o.isTapleaf)(e) ? (t.push({
                        depth: r,
                        leafVersion: e.version || a.LEAF_VERSION_TAPSCRIPT,
                        script: e.output
                    }), t) : (e[0] && h(e[0], t, r + 1), e[1] && h(e[1], t, r + 1), t) : []
                }

                function p(e, t, r = 0) {
                    if (r > a.MAX_TAPTREE_DEPTH) throw new Error("Max taptree depth exceeded.");
                    if (e.depth === r) return t ? void 0 : {
                        output: e.script,
                        version: e.leafVersion
                    };
                    if ((0, o.isTapleaf)(t)) return;
                    const n = p(e, t && t[0], r + 1);
                    if (n) return [n, t && t[1]];
                    const i = p(e, t && t[1], r + 1);
                    return i ? [t && t[0], i] : void 0
                }

                function b(e, t) {
                    if (!t) return !0;
                    const r = (0, a.tapleafHash)({
                        output: e.script,
                        version: e.leafVersion
                    });
                    return (0, a.rootHashFromPath)(e.controlBlock, r).equals(t)
                }

                function g(e) {
                    return e && !!(e.redeemScript || e.witnessScript || e.bip32Derivation && e.bip32Derivation.length)
                }
                t.toXOnly = e => 32 === e.length ? e : e.slice(1, 33), t.tapScriptFinalizer = function(e, t, r) {
                    const o = function(e, t, r) {
                        if (!e.tapScriptSig || !e.tapScriptSig.length) throw new Error(`Can not finalize taproot input #${t}. No tapleaf script signature provided.`);
                        const o = (e.tapLeafScript || []).sort(((e, t) => e.controlBlock.length - t.controlBlock.length)).find((t => function(e, t, r) {
                            const o = (0, a.tapleafHash)({
                                output: e.script,
                                version: e.leafVersion
                            });
                            return (!r || r.equals(o)) && void 0 !== t.find((e => e.leafHash.equals(o)))
                        }(t, e.tapScriptSig, r)));
                        if (!o) throw new Error(`Can not finalize taproot input #${t}. Signature for tapleaf script not found.`);
                        return o
                    }(t, e, r);
                    try {
                        const e = function(e, t) {
                                const r = (0, a.tapleafHash)({
                                    output: t.script,
                                    version: t.leafVersion
                                });
                                return (e.tapScriptSig || []).filter((e => e.leafHash.equals(r))).map((e => function(e, t) {
                                    return Object.assign({
                                        positionInScript: (0, i.pubkeyPositionInScript)(t.pubkey, e)
                                    }, t)
                                }(t.script, e))).sort(((e, t) => t.positionInScript - e.positionInScript)).map((e => e.signature))
                            }(t, o),
                            r = e.concat(o.script).concat(o.controlBlock);
                        return {
                            finalScriptWitness: (0, i.witnessStackToScriptWitness)(r)
                        }
                    } catch (t) {
                        throw new Error(`Can not finalize taproot input #${e}: ${t}`)
                    }
                }, t.serializeTaprootSignature = function(e, t) {
                    const r = t ? Buffer.from([t]) : Buffer.from([]);
                    return Buffer.concat([e, r])
                }, t.isTaprootInput = c, t.isTaprootOutput = l, t.checkTaprootInputFields = function(e, t, r) {
                    ! function(e, t, r) {
                        const o = c(e) && g(t),
                            n = g(e) && c(t),
                            i = e === t && c(t) && g(t);
                        if (o || n || i) throw new Error(`Invalid arguments for Psbt.${r}. Cannot use both taproot and non-taproot fields.`)
                    }(e, t, r),
                    function(e, t, r) {
                        if (t.tapMerkleRoot) {
                            const o = (t.tapLeafScript || []).every((e => b(e, t.tapMerkleRoot))),
                                n = (e.tapLeafScript || []).every((e => b(e, t.tapMerkleRoot)));
                            if (!o || !n) throw new Error(`Invalid arguments for Psbt.${r}. Tapleaf not part of taptree.`)
                        } else if (e.tapMerkleRoot && !(t.tapLeafScript || []).every((t => b(t, e.tapMerkleRoot)))) throw new Error(`Invalid arguments for Psbt.${r}. Tapleaf not part of taptree.`)
                    }(e, t, r)
                }, t.checkTaprootOutputFields = function(e, t, r) {
                    ! function(e, t, r) {
                        const o = l(e) && g(t),
                            n = g(e) && l(t),
                            i = e === t && l(t) && g(t);
                        if (o || n || i) throw new Error(`Invalid arguments for Psbt.${r}. Cannot use both taproot and non-taproot fields.`)
                    }(e, t, r),
                    function(e, t) {
                        if (!t.tapTree && !t.tapInternalKey) return;
                        const r = t.tapInternalKey || e.tapInternalKey,
                            o = t.tapTree || e.tapTree;
                        if (r) {
                            const {
                                script: t
                            } = e, n = function(e, t) {
                                const r = t && f(t.leaves),
                                    {
                                        output: o
                                    } = (0, s.p2tr)({
                                        internalPubkey: e,
                                        scriptTree: r
                                    });
                                return o
                            }(r, o);
                            if (t && !t.equals(n)) throw new Error("Error adding output. Script or address missmatch.")
                        }
                    }(e, t)
                }, t.tweakInternalPubKey = function(e, t) {
                    const r = t.tapInternalKey,
                        o = r && (0, a.tweakKey)(r, t.tapMerkleRoot);
                    if (!o) throw new Error(`Cannot tweak tap internal key for input #${e}. Public key: ${r&&r.toString("hex")}`);
                    return o.x
                }, t.tapTreeToList = function(e) {
                    if (!(0, o.isTaptree)(e)) throw new Error("Cannot convert taptree to tapleaf list. Expecting a tapree structure.");
                    return h(e)
                }, t.tapTreeFromList = f, t.checkTaprootInputForSigs = function(e, t) {
                    return function(e) {
                        const t = [];
                        if (e.tapKeySig && t.push(e.tapKeySig), e.tapScriptSig && t.push(...e.tapScriptSig.map((e => e.signature))), !t.length) {
                            const r = function(e) {
                                if (!e) return;
                                const t = e.slice(2);
                                return 64 === t.length || 65 === t.length ? t : void 0
                            }(e.finalScriptWitness);
                            r && t.push(r)
                        }
                        return t
                    }(e).some((e => (0, u.signatureBlocksAction)(e, d, t)))
                }
            },
            9760: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.signatureBlocksAction = t.checkInputForSig = t.pubkeyInScript = t.pubkeyPositionInScript = t.witnessStackToScriptWitness = t.isP2TR = t.isP2SHScript = t.isP2WSHScript = t.isP2WPKH = t.isP2PKH = t.isP2PK = t.isP2MS = void 0;
                const o = r(9043),
                    n = r(6391),
                    i = r(2146),
                    a = r(161),
                    s = r(9576);

                function u(e) {
                    return t => {
                        try {
                            return e({
                                output: t
                            }), !0
                        } catch (e) {
                            return !1
                        }
                    }
                }

                function c(e, t) {
                    const r = (0, a.hash160)(e),
                        o = e.slice(1, 33),
                        i = n.decompile(t);
                    if (null === i) throw new Error("Unknown script error");
                    return i.findIndex((t => "number" != typeof t && (t.equals(e) || t.equals(r) || t.equals(o))))
                }

                function l(e, t, r) {
                    const {
                        hashType: o
                    } = t(e), n = [];
                    switch (o & i.Transaction.SIGHASH_ANYONECANPAY && n.push("addInput"), 31 & o) {
                        case i.Transaction.SIGHASH_ALL:
                            break;
                        case i.Transaction.SIGHASH_SINGLE:
                        case i.Transaction.SIGHASH_NONE:
                            n.push("addOutput"), n.push("setInputSequence")
                    }
                    return -1 === n.indexOf(r)
                }
                t.isP2MS = u(s.p2ms), t.isP2PK = u(s.p2pk), t.isP2PKH = u(s.p2pkh), t.isP2WPKH = u(s.p2wpkh), t.isP2WSHScript = u(s.p2wsh), t.isP2SHScript = u(s.p2sh), t.isP2TR = u(s.p2tr), t.witnessStackToScriptWitness = function(e) {
                    let t = Buffer.allocUnsafe(0);

                    function r(e) {
                        const r = t.length,
                            n = o.encodingLength(e);
                        t = Buffer.concat([t, Buffer.allocUnsafe(n)]), o.encode(e, t, r)
                    }
                    var n;
                    return r((n = e).length), n.forEach((function(e) {
                        r(e.length),
                            function(e) {
                                t = Buffer.concat([t, Buffer.from(e)])
                            }(e)
                    })), t
                }, t.pubkeyPositionInScript = c, t.pubkeyInScript = function(e, t) {
                    return -1 !== c(e, t)
                }, t.checkInputForSig = function(e, t) {
                    return function(e) {
                        let t = [];
                        if (0 === (e.partialSig || []).length) {
                            if (!e.finalScriptSig && !e.finalScriptWitness) return [];
                            t = function(e) {
                                const t = e.finalScriptSig && n.decompile(e.finalScriptSig) || [],
                                    r = e.finalScriptWitness && n.decompile(e.finalScriptWitness) || [];
                                return t.concat(r).filter((e => Buffer.isBuffer(e) && n.isCanonicalScriptSignature(e))).map((e => ({
                                    signature: e
                                })))
                            }(e)
                        } else t = e.partialSig;
                        return t.map((e => e.signature))
                    }(e).some((e => l(e, n.signature.decode, t)))
                }, t.signatureBlocksAction = l
            },
            8875: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.decode = t.encode = t.encodingLength = void 0;
                const o = r(1898);

                function n(e) {
                    return e < o.OPS.OP_PUSHDATA1 ? 1 : e <= 255 ? 2 : e <= 65535 ? 3 : 5
                }
                t.encodingLength = n, t.encode = function(e, t, r) {
                    const i = n(t);
                    return 1 === i ? e.writeUInt8(t, r) : 2 === i ? (e.writeUInt8(o.OPS.OP_PUSHDATA1, r), e.writeUInt8(t, r + 1)) : 3 === i ? (e.writeUInt8(o.OPS.OP_PUSHDATA2, r), e.writeUInt16LE(t, r + 1)) : (e.writeUInt8(o.OPS.OP_PUSHDATA4, r), e.writeUInt32LE(t, r + 1)), i
                }, t.decode = function(e, t) {
                    const r = e.readUInt8(t);
                    let n, i;
                    if (r < o.OPS.OP_PUSHDATA1) n = r, i = 1;
                    else if (r === o.OPS.OP_PUSHDATA1) {
                        if (t + 2 > e.length) return null;
                        n = e.readUInt8(t + 1), i = 2
                    } else if (r === o.OPS.OP_PUSHDATA2) {
                        if (t + 3 > e.length) return null;
                        n = e.readUInt16LE(t + 1), i = 3
                    } else {
                        if (t + 5 > e.length) return null;
                        if (r !== o.OPS.OP_PUSHDATA4) throw new Error("Unexpected opcode");
                        n = e.readUInt32LE(t + 1), i = 5
                    }
                    return {
                        opcode: r,
                        number: n,
                        size: i
                    }
                }
            },
            6391: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.signature = t.number = t.isCanonicalScriptSignature = t.isDefinedHashType = t.isCanonicalPubKey = t.toStack = t.fromASM = t.toASM = t.decompile = t.compile = t.countNonPushOnlyOPs = t.isPushOnly = t.OPS = void 0;
                const o = r(8317),
                    n = r(1898);
                Object.defineProperty(t, "OPS", {
                    enumerable: !0,
                    get: function() {
                        return n.OPS
                    }
                });
                const i = r(8875),
                    a = r(4527),
                    s = r(5918),
                    u = r(547),
                    {
                        typeforce: c
                    } = u,
                    l = n.OPS.OP_RESERVED;

                function f(e) {
                    return u.Buffer(e) || function(e) {
                        return u.Number(e) && (e === n.OPS.OP_0 || e >= n.OPS.OP_1 && e <= n.OPS.OP_16 || e === n.OPS.OP_1NEGATE)
                    }(e)
                }

                function d(e) {
                    return u.Array(e) && e.every(f)
                }

                function h(e) {
                    return 0 === e.length ? n.OPS.OP_0 : 1 === e.length ? e[0] >= 1 && e[0] <= 16 ? l + e[0] : 129 === e[0] ? n.OPS.OP_1NEGATE : void 0 : void 0
                }

                function p(e) {
                    return Buffer.isBuffer(e)
                }

                function b(e) {
                    return Buffer.isBuffer(e)
                }

                function g(e) {
                    if (p(e)) return e;
                    c(u.Array, e);
                    const t = e.reduce(((e, t) => b(t) ? 1 === t.length && void 0 !== h(t) ? e + 1 : e + i.encodingLength(t.length) + t.length : e + 1), 0),
                        r = Buffer.allocUnsafe(t);
                    let o = 0;
                    if (e.forEach((e => {
                            if (b(e)) {
                                const t = h(e);
                                if (void 0 !== t) return r.writeUInt8(t, o), void(o += 1);
                                o += i.encode(r, e.length, o), e.copy(r, o), o += e.length
                            } else r.writeUInt8(e, o), o += 1
                        })), o !== r.length) throw new Error("Could not decode chunks");
                    return r
                }

                function m(e) {
                    if (t = e, u.Array(t)) return e;
                    var t;
                    c(u.Buffer, e);
                    const r = [];
                    let o = 0;
                    for (; o < e.length;) {
                        const t = e[o];
                        if (t > n.OPS.OP_0 && t <= n.OPS.OP_PUSHDATA4) {
                            const t = i.decode(e, o);
                            if (null === t) return null;
                            if (o += t.size, o + t.number > e.length) return null;
                            const n = e.slice(o, o + t.number);
                            o += t.number;
                            const a = h(n);
                            void 0 !== a ? r.push(a) : r.push(n)
                        } else r.push(t), o += 1
                    }
                    return r
                }

                function y(e) {
                    const t = -129 & e;
                    return t > 0 && t < 4
                }
                t.isPushOnly = d, t.countNonPushOnlyOPs = function(e) {
                    return e.length - e.filter(f).length
                }, t.compile = g, t.decompile = m, t.toASM = function(e) {
                    if (p(e) && (e = m(e)), !e) throw new Error("Could not convert invalid chunks to ASM");
                    return e.map((e => {
                        if (b(e)) {
                            const t = h(e);
                            if (void 0 === t) return e.toString("hex");
                            e = t
                        }
                        return n.REVERSE_OPS[e]
                    })).join(" ")
                }, t.fromASM = function(e) {
                    return c(u.String, e), g(e.split(" ").map((e => void 0 !== n.OPS[e] ? n.OPS[e] : (c(u.Hex, e), Buffer.from(e, "hex")))))
                }, t.toStack = function(e) {
                    return e = m(e), c(d, e), e.map((e => b(e) ? e : e === n.OPS.OP_0 ? Buffer.allocUnsafe(0) : a.encode(e - l)))
                }, t.isCanonicalPubKey = function(e) {
                    return u.isPoint(e)
                }, t.isDefinedHashType = y, t.isCanonicalScriptSignature = function(e) {
                    return !!Buffer.isBuffer(e) && !!y(e[e.length - 1]) && o.check(e.slice(0, -1))
                }, t.number = a, t.signature = s
            },
            4527: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.encode = t.decode = void 0, t.decode = function(e, t, r) {
                    t = t || 4, r = void 0 === r || r;
                    const o = e.length;
                    if (0 === o) return 0;
                    if (o > t) throw new TypeError("Script number overflow");
                    if (r && !(127 & e[o - 1] || !(o <= 1) && 128 & e[o - 2])) throw new Error("Non-minimally encoded script number");
                    if (5 === o) {
                        const t = e.readUInt32LE(0),
                            r = e.readUInt8(4);
                        return 128 & r ? -(4294967296 * (-129 & r) + t) : 4294967296 * r + t
                    }
                    let n = 0;
                    for (let t = 0; t < o; ++t) n |= e[t] << 8 * t;
                    return 128 & e[o - 1] ? -(n & ~(128 << 8 * (o - 1))) : n
                }, t.encode = function(e) {
                    let t = Math.abs(e);
                    const r = (o = t) > 2147483647 ? 5 : o > 8388607 ? 4 : o > 32767 ? 3 : o > 127 ? 2 : o > 0 ? 1 : 0;
                    var o;
                    const n = Buffer.allocUnsafe(r),
                        i = e < 0;
                    for (let e = 0; e < r; ++e) n.writeUInt8(255 & t, e), t >>= 8;
                    return 128 & n[r - 1] ? n.writeUInt8(i ? 128 : 0, r - 1) : i && (n[r - 1] |= 128), n
                }
            },
            5918: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.encode = t.decode = void 0;
                const o = r(8317),
                    n = r(6391),
                    i = r(547),
                    {
                        typeforce: a
                    } = i,
                    s = Buffer.alloc(1, 0);

                function u(e) {
                    let t = 0;
                    for (; 0 === e[t];) ++t;
                    return t === e.length ? s : 128 & (e = e.slice(t))[0] ? Buffer.concat([s, e], 1 + e.length) : e
                }

                function c(e) {
                    0 === e[0] && (e = e.slice(1));
                    const t = Buffer.alloc(32, 0),
                        r = Math.max(0, 32 - e.length);
                    return e.copy(t, r), t
                }
                t.decode = function(e) {
                    const t = e.readUInt8(e.length - 1);
                    if (!(0, n.isDefinedHashType)(t)) throw new Error("Invalid hashType " + t);
                    const r = o.decode(e.slice(0, -1)),
                        i = c(r.r),
                        a = c(r.s);
                    return {
                        signature: Buffer.concat([i, a], 64),
                        hashType: t
                    }
                }, t.encode = function(e, t) {
                    if (a({
                            signature: i.BufferN(64),
                            hashType: i.UInt8
                        }, {
                            signature: e,
                            hashType: t
                        }), !(0, n.isDefinedHashType)(t)) throw new Error("Invalid hashType " + t);
                    const r = Buffer.allocUnsafe(1);
                    r.writeUInt8(t, 0);
                    const s = u(e.slice(0, 32)),
                        c = u(e.slice(32, 64));
                    return Buffer.concat([o.encode(s, c), r])
                }
            },
            2146: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Transaction = void 0;
                const o = r(7809),
                    n = r(161),
                    i = r(6391),
                    a = r(6391),
                    s = r(547),
                    {
                        typeforce: u
                    } = s;

                function c(e) {
                    const t = e.length;
                    return o.varuint.encodingLength(t) + t
                }
                const l = Buffer.allocUnsafe(0),
                    f = [],
                    d = Buffer.from("0000000000000000000000000000000000000000000000000000000000000000", "hex"),
                    h = Buffer.from("0000000000000000000000000000000000000000000000000000000000000001", "hex"),
                    p = Buffer.from("ffffffffffffffff", "hex"),
                    b = {
                        script: l,
                        valueBuffer: p
                    };
                class g {
                    constructor() {
                        this.version = 1, this.locktime = 0, this.ins = [], this.outs = []
                    }
                    static fromBuffer(e, t) {
                        const r = new o.BufferReader(e),
                            n = new g;
                        n.version = r.readInt32();
                        const i = r.readUInt8(),
                            a = r.readUInt8();
                        let s = !1;
                        i === g.ADVANCED_TRANSACTION_MARKER && a === g.ADVANCED_TRANSACTION_FLAG ? s = !0 : r.offset -= 2;
                        const u = r.readVarInt();
                        for (let e = 0; e < u; ++e) n.ins.push({
                            hash: r.readSlice(32),
                            index: r.readUInt32(),
                            script: r.readVarSlice(),
                            sequence: r.readUInt32(),
                            witness: f
                        });
                        const c = r.readVarInt();
                        for (let e = 0; e < c; ++e) n.outs.push({
                            value: r.readUInt64(),
                            script: r.readVarSlice()
                        });
                        if (s) {
                            for (let e = 0; e < u; ++e) n.ins[e].witness = r.readVector();
                            if (!n.hasWitnesses()) throw new Error("Transaction has superfluous witness data")
                        }
                        if (n.locktime = r.readUInt32(), t) return n;
                        if (r.offset !== e.length) throw new Error("Transaction has unexpected data");
                        return n
                    }
                    static fromHex(e) {
                        return g.fromBuffer(Buffer.from(e, "hex"), !1)
                    }
                    static isCoinbaseHash(e) {
                        u(s.Hash256bit, e);
                        for (let t = 0; t < 32; ++t)
                            if (0 !== e[t]) return !1;
                        return !0
                    }
                    isCoinbase() {
                        return 1 === this.ins.length && g.isCoinbaseHash(this.ins[0].hash)
                    }
                    addInput(e, t, r, o) {
                        return u(s.tuple(s.Hash256bit, s.UInt32, s.maybe(s.UInt32), s.maybe(s.Buffer)), arguments), s.Null(r) && (r = g.DEFAULT_SEQUENCE), this.ins.push({
                            hash: e,
                            index: t,
                            script: o || l,
                            sequence: r,
                            witness: f
                        }) - 1
                    }
                    addOutput(e, t) {
                        return u(s.tuple(s.Buffer, s.Satoshi), arguments), this.outs.push({
                            script: e,
                            value: t
                        }) - 1
                    }
                    hasWitnesses() {
                        return this.ins.some((e => 0 !== e.witness.length))
                    }
                    stripWitnesses() {
                        this.ins.forEach((e => {
                            e.witness = f
                        }))
                    }
                    weight() {
                        return 3 * this.byteLength(!1) + this.byteLength(!0)
                    }
                    virtualSize() {
                        return Math.ceil(this.weight() / 4)
                    }
                    byteLength(e = !0) {
                        const t = e && this.hasWitnesses();
                        return (t ? 10 : 8) + o.varuint.encodingLength(this.ins.length) + o.varuint.encodingLength(this.outs.length) + this.ins.reduce(((e, t) => e + 40 + c(t.script)), 0) + this.outs.reduce(((e, t) => e + 8 + c(t.script)), 0) + (t ? this.ins.reduce(((e, t) => e + function(e) {
                            const t = e.length;
                            return o.varuint.encodingLength(t) + e.reduce(((e, t) => e + c(t)), 0)
                        }(t.witness)), 0) : 0)
                    }
                    clone() {
                        const e = new g;
                        return e.version = this.version, e.locktime = this.locktime, e.ins = this.ins.map((e => ({
                            hash: e.hash,
                            index: e.index,
                            script: e.script,
                            sequence: e.sequence,
                            witness: e.witness
                        }))), e.outs = this.outs.map((e => ({
                            script: e.script,
                            value: e.value
                        }))), e
                    }
                    hashForSignature(e, t, r) {
                        if (u(s.tuple(s.UInt32, s.Buffer, s.Number), arguments), e >= this.ins.length) return h;
                        const o = i.compile(i.decompile(t).filter((e => e !== a.OPS.OP_CODESEPARATOR))),
                            c = this.clone();
                        if ((31 & r) === g.SIGHASH_NONE) c.outs = [], c.ins.forEach(((t, r) => {
                            r !== e && (t.sequence = 0)
                        }));
                        else if ((31 & r) === g.SIGHASH_SINGLE) {
                            if (e >= this.outs.length) return h;
                            c.outs.length = e + 1;
                            for (let t = 0; t < e; t++) c.outs[t] = b;
                            c.ins.forEach(((t, r) => {
                                r !== e && (t.sequence = 0)
                            }))
                        }
                        r & g.SIGHASH_ANYONECANPAY ? (c.ins = [c.ins[e]], c.ins[0].script = o) : (c.ins.forEach((e => {
                            e.script = l
                        })), c.ins[e].script = o);
                        const f = Buffer.allocUnsafe(c.byteLength(!1) + 4);
                        return f.writeInt32LE(r, f.length - 4), c.__toBuffer(f, 0, !1), n.hash256(f)
                    }
                    hashForWitnessV1(e, t, r, i, a, f) {
                        if (u(s.tuple(s.UInt32, u.arrayOf(s.Buffer), u.arrayOf(s.Satoshi), s.UInt32), arguments), r.length !== this.ins.length || t.length !== this.ins.length) throw new Error("Must supply prevout script and value for all inputs");
                        const d = i === g.SIGHASH_DEFAULT ? g.SIGHASH_ALL : i & g.SIGHASH_OUTPUT_MASK,
                            h = (i & g.SIGHASH_INPUT_MASK) === g.SIGHASH_ANYONECANPAY,
                            p = d === g.SIGHASH_NONE,
                            b = d === g.SIGHASH_SINGLE;
                        let m = l,
                            y = l,
                            v = l,
                            w = l,
                            k = l;
                        if (!h) {
                            let e = o.BufferWriter.withCapacity(36 * this.ins.length);
                            this.ins.forEach((t => {
                                e.writeSlice(t.hash), e.writeUInt32(t.index)
                            })), m = n.sha256(e.end()), e = o.BufferWriter.withCapacity(8 * this.ins.length), r.forEach((t => e.writeUInt64(t))), y = n.sha256(e.end()), e = o.BufferWriter.withCapacity(t.map(c).reduce(((e, t) => e + t))), t.forEach((t => e.writeVarSlice(t))), v = n.sha256(e.end()), e = o.BufferWriter.withCapacity(4 * this.ins.length), this.ins.forEach((t => e.writeUInt32(t.sequence))), w = n.sha256(e.end())
                        }
                        if (p || b) {
                            if (b && e < this.outs.length) {
                                const t = this.outs[e],
                                    r = o.BufferWriter.withCapacity(8 + c(t.script));
                                r.writeUInt64(t.value), r.writeVarSlice(t.script), k = n.sha256(r.end())
                            }
                        } else {
                            const e = this.outs.map((e => 8 + c(e.script))).reduce(((e, t) => e + t)),
                                t = o.BufferWriter.withCapacity(e);
                            this.outs.forEach((e => {
                                t.writeUInt64(e.value), t.writeVarSlice(e.script)
                            })), k = n.sha256(t.end())
                        }
                        const E = (a ? 2 : 0) + (f ? 1 : 0),
                            _ = 174 - (h ? 49 : 0) - (p ? 32 : 0) + (f ? 32 : 0) + (a ? 37 : 0),
                            S = o.BufferWriter.withCapacity(_);
                        if (S.writeUInt8(i), S.writeInt32(this.version), S.writeUInt32(this.locktime), S.writeSlice(m), S.writeSlice(y), S.writeSlice(v), S.writeSlice(w), p || b || S.writeSlice(k), S.writeUInt8(E), h) {
                            const o = this.ins[e];
                            S.writeSlice(o.hash), S.writeUInt32(o.index), S.writeUInt64(r[e]), S.writeVarSlice(t[e]), S.writeUInt32(o.sequence)
                        } else S.writeUInt32(e);
                        if (f) {
                            const e = o.BufferWriter.withCapacity(c(f));
                            e.writeVarSlice(f), S.writeSlice(n.sha256(e.end()))
                        }
                        return b && S.writeSlice(k), a && (S.writeSlice(a), S.writeUInt8(0), S.writeUInt32(4294967295)), n.taggedHash("TapSighash", Buffer.concat([Buffer.from([0]), S.end()]))
                    }
                    hashForWitnessV0(e, t, r, i) {
                        u(s.tuple(s.UInt32, s.Buffer, s.Satoshi, s.UInt32), arguments);
                        let a, l = Buffer.from([]),
                            f = d,
                            h = d,
                            p = d;
                        if (i & g.SIGHASH_ANYONECANPAY || (l = Buffer.allocUnsafe(36 * this.ins.length), a = new o.BufferWriter(l, 0), this.ins.forEach((e => {
                                a.writeSlice(e.hash), a.writeUInt32(e.index)
                            })), h = n.hash256(l)), i & g.SIGHASH_ANYONECANPAY || (31 & i) === g.SIGHASH_SINGLE || (31 & i) === g.SIGHASH_NONE || (l = Buffer.allocUnsafe(4 * this.ins.length), a = new o.BufferWriter(l, 0), this.ins.forEach((e => {
                                a.writeUInt32(e.sequence)
                            })), p = n.hash256(l)), (31 & i) !== g.SIGHASH_SINGLE && (31 & i) !== g.SIGHASH_NONE) {
                            const e = this.outs.reduce(((e, t) => e + 8 + c(t.script)), 0);
                            l = Buffer.allocUnsafe(e), a = new o.BufferWriter(l, 0), this.outs.forEach((e => {
                                a.writeUInt64(e.value), a.writeVarSlice(e.script)
                            })), f = n.hash256(l)
                        } else if ((31 & i) === g.SIGHASH_SINGLE && e < this.outs.length) {
                            const t = this.outs[e];
                            l = Buffer.allocUnsafe(8 + c(t.script)), a = new o.BufferWriter(l, 0), a.writeUInt64(t.value), a.writeVarSlice(t.script), f = n.hash256(l)
                        }
                        l = Buffer.allocUnsafe(156 + c(t)), a = new o.BufferWriter(l, 0);
                        const b = this.ins[e];
                        return a.writeInt32(this.version), a.writeSlice(h), a.writeSlice(p), a.writeSlice(b.hash), a.writeUInt32(b.index), a.writeVarSlice(t), a.writeUInt64(r), a.writeUInt32(b.sequence), a.writeSlice(f), a.writeUInt32(this.locktime), a.writeUInt32(i), n.hash256(l)
                    }
                    getHash(e) {
                        return e && this.isCoinbase() ? Buffer.alloc(32, 0) : n.hash256(this.__toBuffer(void 0, void 0, e))
                    }
                    getId() {
                        return (0, o.reverseBuffer)(this.getHash(!1)).toString("hex")
                    }
                    toBuffer(e, t) {
                        return this.__toBuffer(e, t, !0)
                    }
                    toHex() {
                        return this.toBuffer(void 0, void 0).toString("hex")
                    }
                    setInputScript(e, t) {
                        u(s.tuple(s.Number, s.Buffer), arguments), this.ins[e].script = t
                    }
                    setWitness(e, t) {
                        u(s.tuple(s.Number, [s.Buffer]), arguments), this.ins[e].witness = t
                    }
                    __toBuffer(e, t, r = !1) {
                        e || (e = Buffer.allocUnsafe(this.byteLength(r)));
                        const n = new o.BufferWriter(e, t || 0);
                        n.writeInt32(this.version);
                        const i = r && this.hasWitnesses();
                        return i && (n.writeUInt8(g.ADVANCED_TRANSACTION_MARKER), n.writeUInt8(g.ADVANCED_TRANSACTION_FLAG)), n.writeVarInt(this.ins.length), this.ins.forEach((e => {
                            n.writeSlice(e.hash), n.writeUInt32(e.index), n.writeVarSlice(e.script), n.writeUInt32(e.sequence)
                        })), n.writeVarInt(this.outs.length), this.outs.forEach((e => {
                            void 0 !== e.value ? n.writeUInt64(e.value) : n.writeSlice(e.valueBuffer), n.writeVarSlice(e.script)
                        })), i && this.ins.forEach((e => {
                            n.writeVector(e.witness)
                        })), n.writeUInt32(this.locktime), void 0 !== t ? e.slice(t, n.offset) : e
                    }
                }
                t.Transaction = g, g.DEFAULT_SEQUENCE = 4294967295, g.SIGHASH_DEFAULT = 0, g.SIGHASH_ALL = 1, g.SIGHASH_NONE = 2, g.SIGHASH_SINGLE = 3, g.SIGHASH_ANYONECANPAY = 128, g.SIGHASH_OUTPUT_MASK = 3, g.SIGHASH_INPUT_MASK = 128, g.ADVANCED_TRANSACTION_MARKER = 0, g.ADVANCED_TRANSACTION_FLAG = 1
            },
            547: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.oneOf = t.Null = t.BufferN = t.Function = t.UInt32 = t.UInt8 = t.tuple = t.maybe = t.Hex = t.Buffer = t.String = t.Boolean = t.Array = t.Number = t.Hash256bit = t.Hash160bit = t.Buffer256bit = t.isTaptree = t.isTapleaf = t.TAPLEAF_VERSION_MASK = t.Satoshi = t.isPoint = t.stacksEqual = t.typeforce = void 0;
                const o = r(4686);
                t.typeforce = r(8087);
                const n = o.Buffer.alloc(32, 0),
                    i = o.Buffer.from("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f", "hex");

                function a(e) {
                    return !(!e || !("output" in e) || !o.Buffer.isBuffer(e.output) || void 0 !== e.version && (e.version & t.TAPLEAF_VERSION_MASK) !== e.version)
                }
                t.stacksEqual = function(e, t) {
                    return e.length === t.length && e.every(((e, r) => e.equals(t[r])))
                }, t.isPoint = function(e) {
                    if (!o.Buffer.isBuffer(e)) return !1;
                    if (e.length < 33) return !1;
                    const t = e[0],
                        r = e.slice(1, 33);
                    if (0 === r.compare(n)) return !1;
                    if (r.compare(i) >= 0) return !1;
                    if ((2 === t || 3 === t) && 33 === e.length) return !0;
                    const a = e.slice(33);
                    return 0 !== a.compare(n) && !(a.compare(i) >= 0) && 4 === t && 65 === e.length
                }, t.Satoshi = function(e) {
                    return t.typeforce.UInt53(e) && e <= 21e14
                }, t.TAPLEAF_VERSION_MASK = 254, t.isTapleaf = a, t.isTaptree = function e(r) {
                    return (0, t.Array)(r) ? 2 === r.length && r.every((t => e(t))) : a(r)
                }, t.Buffer256bit = t.typeforce.BufferN(32), t.Hash160bit = t.typeforce.BufferN(20), t.Hash256bit = t.typeforce.BufferN(32), t.Number = t.typeforce.Number, t.Array = t.typeforce.Array, t.Boolean = t.typeforce.Boolean, t.String = t.typeforce.String, t.Buffer = t.typeforce.Buffer, t.Hex = t.typeforce.Hex, t.maybe = t.typeforce.maybe, t.tuple = t.typeforce.tuple, t.UInt8 = t.typeforce.UInt8, t.UInt32 = t.typeforce.UInt32, t.Function = t.typeforce.Function, t.BufferN = t.typeforce.BufferN, t.Null = t.typeforce.Null, t.oneOf = t.typeforce.oneOf
            },
            1122: (e, t, r) => {
                var o = r(8916);
                e.exports = o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
            },
            7250: (e, t, r) => {
                const o = r(5912);
                e.exports = o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
            },
            1227: (e, t, r) => {
                "use strict";
                var o = r(1122),
                    n = r(6671).Buffer;
                e.exports = function(e) {
                    function t(t) {
                        var r = t.slice(0, -4),
                            o = t.slice(-4),
                            n = e(r);
                        if (!(o[0] ^ n[0] | o[1] ^ n[1] | o[2] ^ n[2] | o[3] ^ n[3])) return r
                    }
                    return {
                        encode: function(t) {
                            var r = e(t);
                            return o.encode(n.concat([t, r], t.length + 4))
                        },
                        decode: function(e) {
                            var r = t(o.decode(e));
                            if (!r) throw new Error("Invalid checksum");
                            return r
                        },
                        decodeUnsafe: function(e) {
                            var r = o.decodeUnsafe(e);
                            if (r) return t(r)
                        }
                    }
                }
            },
            9636: (e, t, r) => {
                "use strict";
                var o = r(7824),
                    n = r(1227);
                e.exports = n((function(e) {
                    var t = o("sha256").update(e).digest();
                    return o("sha256").update(t).digest()
                }))
            },
            6106: (e, t, r) => {
                "use strict";
                var o = r(7250);
                e.exports = function(e) {
                    function t(t) {
                        var r = t.slice(0, -4),
                            o = t.slice(-4),
                            n = e(r);
                        if (!(o[0] ^ n[0] | o[1] ^ n[1] | o[2] ^ n[2] | o[3] ^ n[3])) return r
                    }
                    return {
                        encode: function(t) {
                            var r = Uint8Array.from(t),
                                n = e(r),
                                i = r.length + 4,
                                a = new Uint8Array(i);
                            return a.set(r, 0), a.set(n.subarray(0, 4), r.length), o.encode(a, i)
                        },
                        decode: function(e) {
                            var r = t(o.decode(e));
                            if (!r) throw new Error("Invalid checksum");
                            return r
                        },
                        decodeUnsafe: function(e) {
                            var r = o.decodeUnsafe(e);
                            if (r) return t(r)
                        }
                    }
                }
            },
            9383: (e, t, r) => {
                "use strict";
                var {
                    sha256: o
                } = r(7494), n = r(6106);
                e.exports = n((function(e) {
                    return o(o(e))
                }))
            },
            4686: (e, t, r) => {
                "use strict";
                const o = r(5350),
                    n = r(7947),
                    i = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                t.Buffer = u, t.SlowBuffer = function(e) {
                    return +e != e && (e = 0), u.alloc(+e)
                }, t.INSPECT_MAX_BYTES = 50;
                const a = 2147483647;

                function s(e) {
                    if (e > a) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    const t = new Uint8Array(e);
                    return Object.setPrototypeOf(t, u.prototype), t
                }

                function u(e, t, r) {
                    if ("number" == typeof e) {
                        if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return f(e)
                    }
                    return c(e, t, r)
                }

                function c(e, t, r) {
                    if ("string" == typeof e) return function(e, t) {
                        if ("string" == typeof t && "" !== t || (t = "utf8"), !u.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                        const r = 0 | b(e, t);
                        let o = s(r);
                        const n = o.write(e, t);
                        return n !== r && (o = o.slice(0, n)), o
                    }(e, t);
                    if (ArrayBuffer.isView(e)) return function(e) {
                        if ($(e, Uint8Array)) {
                            const t = new Uint8Array(e);
                            return h(t.buffer, t.byteOffset, t.byteLength)
                        }
                        return d(e)
                    }(e);
                    if (null == e) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if ($(e, ArrayBuffer) || e && $(e.buffer, ArrayBuffer)) return h(e, t, r);
                    if ("undefined" != typeof SharedArrayBuffer && ($(e, SharedArrayBuffer) || e && $(e.buffer, SharedArrayBuffer))) return h(e, t, r);
                    if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    const o = e.valueOf && e.valueOf();
                    if (null != o && o !== e) return u.from(o, t, r);
                    const n = function(e) {
                        if (u.isBuffer(e)) {
                            const t = 0 | p(e.length),
                                r = s(t);
                            return 0 === r.length || e.copy(r, 0, 0, t), r
                        }
                        return void 0 !== e.length ? "number" != typeof e.length || Y(e.length) ? s(0) : d(e) : "Buffer" === e.type && Array.isArray(e.data) ? d(e.data) : void 0
                    }(e);
                    if (n) return n;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return u.from(e[Symbol.toPrimitive]("string"), t, r);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }

                function l(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function f(e) {
                    return l(e), s(e < 0 ? 0 : 0 | p(e))
                }

                function d(e) {
                    const t = e.length < 0 ? 0 : 0 | p(e.length),
                        r = s(t);
                    for (let o = 0; o < t; o += 1) r[o] = 255 & e[o];
                    return r
                }

                function h(e, t, r) {
                    if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    let o;
                    return o = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r), Object.setPrototypeOf(o, u.prototype), o
                }

                function p(e) {
                    if (e >= a) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
                    return 0 | e
                }

                function b(e, t) {
                    if (u.isBuffer(e)) return e.length;
                    if (ArrayBuffer.isView(e) || $(e, ArrayBuffer)) return e.byteLength;
                    if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    const r = e.length,
                        o = arguments.length > 2 && !0 === arguments[2];
                    if (!o && 0 === r) return 0;
                    let n = !1;
                    for (;;) switch (t) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                            return W(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * r;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return G(e).length;
                        default:
                            if (n) return o ? -1 : W(e).length;
                            t = ("" + t).toLowerCase(), n = !0
                    }
                }

                function g(e, t, r) {
                    let o = !1;
                    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e || (e = "utf8");;) switch (e) {
                        case "hex":
                            return O(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return x(this, t, r);
                        case "ascii":
                            return B(this, t, r);
                        case "latin1":
                        case "binary":
                            return A(this, t, r);
                        case "base64":
                            return T(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return P(this, t, r);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), o = !0
                    }
                }

                function m(e, t, r) {
                    const o = e[t];
                    e[t] = e[r], e[r] = o
                }

                function y(e, t, r, o, n) {
                    if (0 === e.length) return -1;
                    if ("string" == typeof r ? (o = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), Y(r = +r) && (r = n ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                        if (n) return -1;
                        r = e.length - 1
                    } else if (r < 0) {
                        if (!n) return -1;
                        r = 0
                    }
                    if ("string" == typeof t && (t = u.from(t, o)), u.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, r, o, n);
                    if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : v(e, [t], r, o, n);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function v(e, t, r, o, n) {
                    let i, a = 1,
                        s = e.length,
                        u = t.length;
                    if (void 0 !== o && ("ucs2" === (o = String(o).toLowerCase()) || "ucs-2" === o || "utf16le" === o || "utf-16le" === o)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        a = 2, s /= 2, u /= 2, r /= 2
                    }

                    function c(e, t) {
                        return 1 === a ? e[t] : e.readUInt16BE(t * a)
                    }
                    if (n) {
                        let o = -1;
                        for (i = r; i < s; i++)
                            if (c(e, i) === c(t, -1 === o ? 0 : i - o)) {
                                if (-1 === o && (o = i), i - o + 1 === u) return o * a
                            } else -1 !== o && (i -= i - o), o = -1
                    } else
                        for (r + u > s && (r = s - u), i = r; i >= 0; i--) {
                            let r = !0;
                            for (let o = 0; o < u; o++)
                                if (c(e, i + o) !== c(t, o)) {
                                    r = !1;
                                    break
                                } if (r) return i
                        }
                    return -1
                }

                function w(e, t, r, o) {
                    r = Number(r) || 0;
                    const n = e.length - r;
                    o ? (o = Number(o)) > n && (o = n) : o = n;
                    const i = t.length;
                    let a;
                    for (o > i / 2 && (o = i / 2), a = 0; a < o; ++a) {
                        const o = parseInt(t.substr(2 * a, 2), 16);
                        if (Y(o)) return a;
                        e[r + a] = o
                    }
                    return a
                }

                function k(e, t, r, o) {
                    return X(W(t, e.length - r), e, r, o)
                }

                function E(e, t, r, o) {
                    return X(function(e) {
                        const t = [];
                        for (let r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, o)
                }

                function _(e, t, r, o) {
                    return X(G(t), e, r, o)
                }

                function S(e, t, r, o) {
                    return X(function(e, t) {
                        let r, o, n;
                        const i = [];
                        for (let a = 0; a < e.length && !((t -= 2) < 0); ++a) r = e.charCodeAt(a), o = r >> 8, n = r % 256, i.push(n), i.push(o);
                        return i
                    }(t, e.length - r), e, r, o)
                }

                function T(e, t, r) {
                    return 0 === t && r === e.length ? o.fromByteArray(e) : o.fromByteArray(e.slice(t, r))
                }

                function x(e, t, r) {
                    r = Math.min(e.length, r);
                    const o = [];
                    let n = t;
                    for (; n < r;) {
                        const t = e[n];
                        let i = null,
                            a = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
                        if (n + a <= r) {
                            let r, o, s, u;
                            switch (a) {
                                case 1:
                                    t < 128 && (i = t);
                                    break;
                                case 2:
                                    r = e[n + 1], 128 == (192 & r) && (u = (31 & t) << 6 | 63 & r, u > 127 && (i = u));
                                    break;
                                case 3:
                                    r = e[n + 1], o = e[n + 2], 128 == (192 & r) && 128 == (192 & o) && (u = (15 & t) << 12 | (63 & r) << 6 | 63 & o, u > 2047 && (u < 55296 || u > 57343) && (i = u));
                                    break;
                                case 4:
                                    r = e[n + 1], o = e[n + 2], s = e[n + 3], 128 == (192 & r) && 128 == (192 & o) && 128 == (192 & s) && (u = (15 & t) << 18 | (63 & r) << 12 | (63 & o) << 6 | 63 & s, u > 65535 && u < 1114112 && (i = u))
                            }
                        }
                        null === i ? (i = 65533, a = 1) : i > 65535 && (i -= 65536, o.push(i >>> 10 & 1023 | 55296), i = 56320 | 1023 & i), o.push(i), n += a
                    }
                    return function(e) {
                        const t = e.length;
                        if (t <= I) return String.fromCharCode.apply(String, e);
                        let r = "",
                            o = 0;
                        for (; o < t;) r += String.fromCharCode.apply(String, e.slice(o, o += I));
                        return r
                    }(o)
                }
                t.kMaxLength = a, u.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        const e = new Uint8Array(1),
                            t = {
                                foo: function() {
                                    return 42
                                }
                            };
                        return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), 42 === e.foo()
                    } catch (e) {
                        return !1
                    }
                }(), u.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(u.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (u.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(u.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (u.isBuffer(this)) return this.byteOffset
                    }
                }), u.poolSize = 8192, u.from = function(e, t, r) {
                    return c(e, t, r)
                }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array), u.alloc = function(e, t, r) {
                    return function(e, t, r) {
                        return l(e), e <= 0 ? s(e) : void 0 !== t ? "string" == typeof r ? s(e).fill(t, r) : s(e).fill(t) : s(e)
                    }(e, t, r)
                }, u.allocUnsafe = function(e) {
                    return f(e)
                }, u.allocUnsafeSlow = function(e) {
                    return f(e)
                }, u.isBuffer = function(e) {
                    return null != e && !0 === e._isBuffer && e !== u.prototype
                }, u.compare = function(e, t) {
                    if ($(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)), $(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === t) return 0;
                    let r = e.length,
                        o = t.length;
                    for (let n = 0, i = Math.min(r, o); n < i; ++n)
                        if (e[n] !== t[n]) {
                            r = e[n], o = t[n];
                            break
                        } return r < o ? -1 : o < r ? 1 : 0
                }, u.isEncoding = function(e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, u.concat = function(e, t) {
                    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return u.alloc(0);
                    let r;
                    if (void 0 === t)
                        for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                    const o = u.allocUnsafe(t);
                    let n = 0;
                    for (r = 0; r < e.length; ++r) {
                        let t = e[r];
                        if ($(t, Uint8Array)) n + t.length > o.length ? (u.isBuffer(t) || (t = u.from(t)), t.copy(o, n)) : Uint8Array.prototype.set.call(o, t, n);
                        else {
                            if (!u.isBuffer(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                            t.copy(o, n)
                        }
                        n += t.length
                    }
                    return o
                }, u.byteLength = b, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
                    const e = this.length;
                    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (let t = 0; t < e; t += 2) m(this, t, t + 1);
                    return this
                }, u.prototype.swap32 = function() {
                    const e = this.length;
                    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (let t = 0; t < e; t += 4) m(this, t, t + 3), m(this, t + 1, t + 2);
                    return this
                }, u.prototype.swap64 = function() {
                    const e = this.length;
                    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (let t = 0; t < e; t += 8) m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t + 3, t + 4);
                    return this
                }, u.prototype.toString = function() {
                    const e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? x(this, 0, e) : g.apply(this, arguments)
                }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(e) {
                    if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === u.compare(this, e)
                }, u.prototype.inspect = function() {
                    let e = "";
                    const r = t.INSPECT_MAX_BYTES;
                    return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">"
                }, i && (u.prototype[i] = u.prototype.inspect), u.prototype.compare = function(e, t, r, o, n) {
                    if ($(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)), !u.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === o && (o = 0), void 0 === n && (n = this.length), t < 0 || r > e.length || o < 0 || n > this.length) throw new RangeError("out of range index");
                    if (o >= n && t >= r) return 0;
                    if (o >= n) return -1;
                    if (t >= r) return 1;
                    if (this === e) return 0;
                    let i = (n >>>= 0) - (o >>>= 0),
                        a = (r >>>= 0) - (t >>>= 0);
                    const s = Math.min(i, a),
                        c = this.slice(o, n),
                        l = e.slice(t, r);
                    for (let e = 0; e < s; ++e)
                        if (c[e] !== l[e]) {
                            i = c[e], a = l[e];
                            break
                        } return i < a ? -1 : a < i ? 1 : 0
                }, u.prototype.includes = function(e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }, u.prototype.indexOf = function(e, t, r) {
                    return y(this, e, t, r, !0)
                }, u.prototype.lastIndexOf = function(e, t, r) {
                    return y(this, e, t, r, !1)
                }, u.prototype.write = function(e, t, r, o) {
                    if (void 0 === t) o = "utf8", r = this.length, t = 0;
                    else if (void 0 === r && "string" == typeof t) o = t, r = this.length, t = 0;
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === o && (o = "utf8")) : (o = r, r = void 0)
                    }
                    const n = this.length - t;
                    if ((void 0 === r || r > n) && (r = n), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    o || (o = "utf8");
                    let i = !1;
                    for (;;) switch (o) {
                        case "hex":
                            return w(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return k(this, e, t, r);
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return E(this, e, t, r);
                        case "base64":
                            return _(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return S(this, e, t, r);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + o);
                            o = ("" + o).toLowerCase(), i = !0
                    }
                }, u.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                const I = 4096;

                function B(e, t, r) {
                    let o = "";
                    r = Math.min(e.length, r);
                    for (let n = t; n < r; ++n) o += String.fromCharCode(127 & e[n]);
                    return o
                }

                function A(e, t, r) {
                    let o = "";
                    r = Math.min(e.length, r);
                    for (let n = t; n < r; ++n) o += String.fromCharCode(e[n]);
                    return o
                }

                function O(e, t, r) {
                    const o = e.length;
                    (!t || t < 0) && (t = 0), (!r || r < 0 || r > o) && (r = o);
                    let n = "";
                    for (let o = t; o < r; ++o) n += J[e[o]];
                    return n
                }

                function P(e, t, r) {
                    const o = e.slice(t, r);
                    let n = "";
                    for (let e = 0; e < o.length - 1; e += 2) n += String.fromCharCode(o[e] + 256 * o[e + 1]);
                    return n
                }

                function z(e, t, r) {
                    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function j(e, t, r, o, n, i) {
                    if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (t > n || t < i) throw new RangeError('"value" argument is out of bounds');
                    if (r + o > e.length) throw new RangeError("Index out of range")
                }

                function U(e, t, r, o, n) {
                    q(t, o, n, e, r, 7);
                    let i = Number(t & BigInt(4294967295));
                    e[r++] = i, i >>= 8, e[r++] = i, i >>= 8, e[r++] = i, i >>= 8, e[r++] = i;
                    let a = Number(t >> BigInt(32) & BigInt(4294967295));
                    return e[r++] = a, a >>= 8, e[r++] = a, a >>= 8, e[r++] = a, a >>= 8, e[r++] = a, r
                }

                function L(e, t, r, o, n) {
                    q(t, o, n, e, r, 7);
                    let i = Number(t & BigInt(4294967295));
                    e[r + 7] = i, i >>= 8, e[r + 6] = i, i >>= 8, e[r + 5] = i, i >>= 8, e[r + 4] = i;
                    let a = Number(t >> BigInt(32) & BigInt(4294967295));
                    return e[r + 3] = a, a >>= 8, e[r + 2] = a, a >>= 8, e[r + 1] = a, a >>= 8, e[r] = a, r + 8
                }

                function N(e, t, r, o, n, i) {
                    if (r + o > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function R(e, t, r, o, i) {
                    return t = +t, r >>>= 0, i || N(e, 0, r, 4), n.write(e, t, r, o, 23, 4), r + 4
                }

                function H(e, t, r, o, i) {
                    return t = +t, r >>>= 0, i || N(e, 0, r, 8), n.write(e, t, r, o, 52, 8), r + 8
                }
                u.prototype.slice = function(e, t) {
                    const r = this.length;
                    (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
                    const o = this.subarray(e, t);
                    return Object.setPrototypeOf(o, u.prototype), o
                }, u.prototype.readUintLE = u.prototype.readUIntLE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || z(e, t, this.length);
                    let o = this[e],
                        n = 1,
                        i = 0;
                    for (; ++i < t && (n *= 256);) o += this[e + i] * n;
                    return o
                }, u.prototype.readUintBE = u.prototype.readUIntBE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || z(e, t, this.length);
                    let o = this[e + --t],
                        n = 1;
                    for (; t > 0 && (n *= 256);) o += this[e + --t] * n;
                    return o
                }, u.prototype.readUint8 = u.prototype.readUInt8 = function(e, t) {
                    return e >>>= 0, t || z(e, 1, this.length), this[e]
                }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(e, t) {
                    return e >>>= 0, t || z(e, 2, this.length), this[e] | this[e + 1] << 8
                }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(e, t) {
                    return e >>>= 0, t || z(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(e, t) {
                    return e >>>= 0, t || z(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(e, t) {
                    return e >>>= 0, t || z(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, u.prototype.readBigUInt64LE = Z((function(e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || K(e, this.length - 8);
                    const o = t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24,
                        n = this[++e] + 256 * this[++e] + 65536 * this[++e] + r * 2 ** 24;
                    return BigInt(o) + (BigInt(n) << BigInt(32))
                })), u.prototype.readBigUInt64BE = Z((function(e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || K(e, this.length - 8);
                    const o = t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e],
                        n = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r;
                    return (BigInt(o) << BigInt(32)) + BigInt(n)
                })), u.prototype.readIntLE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || z(e, t, this.length);
                    let o = this[e],
                        n = 1,
                        i = 0;
                    for (; ++i < t && (n *= 256);) o += this[e + i] * n;
                    return n *= 128, o >= n && (o -= Math.pow(2, 8 * t)), o
                }, u.prototype.readIntBE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || z(e, t, this.length);
                    let o = t,
                        n = 1,
                        i = this[e + --o];
                    for (; o > 0 && (n *= 256);) i += this[e + --o] * n;
                    return n *= 128, i >= n && (i -= Math.pow(2, 8 * t)), i
                }, u.prototype.readInt8 = function(e, t) {
                    return e >>>= 0, t || z(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, u.prototype.readInt16LE = function(e, t) {
                    e >>>= 0, t || z(e, 2, this.length);
                    const r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, u.prototype.readInt16BE = function(e, t) {
                    e >>>= 0, t || z(e, 2, this.length);
                    const r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, u.prototype.readInt32LE = function(e, t) {
                    return e >>>= 0, t || z(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, u.prototype.readInt32BE = function(e, t) {
                    return e >>>= 0, t || z(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, u.prototype.readBigInt64LE = Z((function(e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || K(e, this.length - 8);
                    const o = this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (r << 24);
                    return (BigInt(o) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
                })), u.prototype.readBigInt64BE = Z((function(e) {
                    F(e >>>= 0, "offset");
                    const t = this[e],
                        r = this[e + 7];
                    void 0 !== t && void 0 !== r || K(e, this.length - 8);
                    const o = (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e];
                    return (BigInt(o) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r)
                })), u.prototype.readFloatLE = function(e, t) {
                    return e >>>= 0, t || z(e, 4, this.length), n.read(this, e, !0, 23, 4)
                }, u.prototype.readFloatBE = function(e, t) {
                    return e >>>= 0, t || z(e, 4, this.length), n.read(this, e, !1, 23, 4)
                }, u.prototype.readDoubleLE = function(e, t) {
                    return e >>>= 0, t || z(e, 8, this.length), n.read(this, e, !0, 52, 8)
                }, u.prototype.readDoubleBE = function(e, t) {
                    return e >>>= 0, t || z(e, 8, this.length), n.read(this, e, !1, 52, 8)
                }, u.prototype.writeUintLE = u.prototype.writeUIntLE = function(e, t, r, o) {
                    e = +e, t >>>= 0, r >>>= 0, o || j(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    let n = 1,
                        i = 0;
                    for (this[t] = 255 & e; ++i < r && (n *= 256);) this[t + i] = e / n & 255;
                    return t + r
                }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(e, t, r, o) {
                    e = +e, t >>>= 0, r >>>= 0, o || j(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    let n = r - 1,
                        i = 1;
                    for (this[t + n] = 255 & e; --n >= 0 && (i *= 256);) this[t + n] = e / i & 255;
                    return t + r
                }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, u.prototype.writeBigUInt64LE = Z((function(e, t = 0) {
                    return U(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
                })), u.prototype.writeBigUInt64BE = Z((function(e, t = 0) {
                    return L(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
                })), u.prototype.writeIntLE = function(e, t, r, o) {
                    if (e = +e, t >>>= 0, !o) {
                        const o = Math.pow(2, 8 * r - 1);
                        j(this, e, t, r, o - 1, -o)
                    }
                    let n = 0,
                        i = 1,
                        a = 0;
                    for (this[t] = 255 & e; ++n < r && (i *= 256);) e < 0 && 0 === a && 0 !== this[t + n - 1] && (a = 1), this[t + n] = (e / i | 0) - a & 255;
                    return t + r
                }, u.prototype.writeIntBE = function(e, t, r, o) {
                    if (e = +e, t >>>= 0, !o) {
                        const o = Math.pow(2, 8 * r - 1);
                        j(this, e, t, r, o - 1, -o)
                    }
                    let n = r - 1,
                        i = 1,
                        a = 0;
                    for (this[t + n] = 255 & e; --n >= 0 && (i *= 256);) e < 0 && 0 === a && 0 !== this[t + n + 1] && (a = 1), this[t + n] = (e / i | 0) - a & 255;
                    return t + r
                }, u.prototype.writeInt8 = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, u.prototype.writeInt16LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, u.prototype.writeInt16BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, u.prototype.writeInt32LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, u.prototype.writeInt32BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || j(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, u.prototype.writeBigInt64LE = Z((function(e, t = 0) {
                    return U(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), u.prototype.writeBigInt64BE = Z((function(e, t = 0) {
                    return L(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), u.prototype.writeFloatLE = function(e, t, r) {
                    return R(this, e, t, !0, r)
                }, u.prototype.writeFloatBE = function(e, t, r) {
                    return R(this, e, t, !1, r)
                }, u.prototype.writeDoubleLE = function(e, t, r) {
                    return H(this, e, t, !0, r)
                }, u.prototype.writeDoubleBE = function(e, t, r) {
                    return H(this, e, t, !1, r)
                }, u.prototype.copy = function(e, t, r, o) {
                    if (!u.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                    if (r || (r = 0), o || 0 === o || (o = this.length), t >= e.length && (t = e.length), t || (t = 0), o > 0 && o < r && (o = r), o === r) return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (t < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                    if (o < 0) throw new RangeError("sourceEnd out of bounds");
                    o > this.length && (o = this.length), e.length - t < o - r && (o = e.length - t + r);
                    const n = o - r;
                    return this === e && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, r, o) : Uint8Array.prototype.set.call(e, this.subarray(r, o), t), n
                }, u.prototype.fill = function(e, t, r, o) {
                    if ("string" == typeof e) {
                        if ("string" == typeof t ? (o = t, t = 0, r = this.length) : "string" == typeof r && (o = r, r = this.length), void 0 !== o && "string" != typeof o) throw new TypeError("encoding must be a string");
                        if ("string" == typeof o && !u.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
                        if (1 === e.length) {
                            const t = e.charCodeAt(0);
                            ("utf8" === o && t < 128 || "latin1" === o) && (e = t)
                        }
                    } else "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
                    if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                    if (r <= t) return this;
                    let n;
                    if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
                        for (n = t; n < r; ++n) this[n] = e;
                    else {
                        const i = u.isBuffer(e) ? e : u.from(e, o),
                            a = i.length;
                        if (0 === a) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (n = 0; n < r - t; ++n) this[n + t] = i[n % a]
                    }
                    return this
                };
                const C = {};

                function M(e, t, r) {
                    C[e] = class extends r {
                        constructor() {
                            super(), Object.defineProperty(this, "message", {
                                value: t.apply(this, arguments),
                                writable: !0,
                                configurable: !0
                            }), this.name = `${this.name} [${e}]`, this.stack, delete this.name
                        }
                        get code() {
                            return e
                        }
                        set code(e) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: e,
                                writable: !0
                            })
                        }
                        toString() {
                            return `${this.name} [${e}]: ${this.message}`
                        }
                    }
                }

                function D(e) {
                    let t = "",
                        r = e.length;
                    const o = "-" === e[0] ? 1 : 0;
                    for (; r >= o + 4; r -= 3) t = `_${e.slice(r-3,r)}${t}`;
                    return `${e.slice(0,r)}${t}`
                }

                function q(e, t, r, o, n, i) {
                    if (e > r || e < t) {
                        const o = "bigint" == typeof t ? "n" : "";
                        let n;
                        throw n = i > 3 ? 0 === t || t === BigInt(0) ? `>= 0${o} and < 2${o} ** ${8*(i+1)}${o}` : `>= -(2${o} ** ${8*(i+1)-1}${o}) and < 2 ** ${8*(i+1)-1}${o}` : `>= ${t}${o} and <= ${r}${o}`, new C.ERR_OUT_OF_RANGE("value", n, e)
                    }! function(e, t, r) {
                        F(t, "offset"), void 0 !== e[t] && void 0 !== e[t + r] || K(t, e.length - (r + 1))
                    }(o, n, i)
                }

                function F(e, t) {
                    if ("number" != typeof e) throw new C.ERR_INVALID_ARG_TYPE(t, "number", e)
                }

                function K(e, t, r) {
                    if (Math.floor(e) !== e) throw F(e, r), new C.ERR_OUT_OF_RANGE(r || "offset", "an integer", e);
                    if (t < 0) throw new C.ERR_BUFFER_OUT_OF_BOUNDS;
                    throw new C.ERR_OUT_OF_RANGE(r || "offset", `>= ${r?1:0} and <= ${t}`, e)
                }
                M("ERR_BUFFER_OUT_OF_BOUNDS", (function(e) {
                    return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
                }), RangeError), M("ERR_INVALID_ARG_TYPE", (function(e, t) {
                    return `The "${e}" argument must be of type number. Received type ${typeof t}`
                }), TypeError), M("ERR_OUT_OF_RANGE", (function(e, t, r) {
                    let o = `The value of "${e}" is out of range.`,
                        n = r;
                    return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? n = D(String(r)) : "bigint" == typeof r && (n = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (n = D(n)), n += "n"), o += ` It must be ${t}. Received ${n}`, o
                }), RangeError);
                const V = /[^+/0-9A-Za-z-_]/g;

                function W(e, t) {
                    let r;
                    t = t || 1 / 0;
                    const o = e.length;
                    let n = null;
                    const i = [];
                    for (let a = 0; a < o; ++a) {
                        if (r = e.charCodeAt(a), r > 55295 && r < 57344) {
                            if (!n) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === o) {
                                    (t -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                n = r;
                                continue
                            }
                            if (r < 56320) {
                                (t -= 3) > -1 && i.push(239, 191, 189), n = r;
                                continue
                            }
                            r = 65536 + (n - 55296 << 10 | r - 56320)
                        } else n && (t -= 3) > -1 && i.push(239, 191, 189);
                        if (n = null, r < 128) {
                            if ((t -= 1) < 0) break;
                            i.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            i.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return i
                }

                function G(e) {
                    return o.toByteArray(function(e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(V, "")).length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }(e))
                }

                function X(e, t, r, o) {
                    let n;
                    for (n = 0; n < o && !(n + r >= t.length || n >= e.length); ++n) t[n + r] = e[n];
                    return n
                }

                function $(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function Y(e) {
                    return e != e
                }
                const J = function() {
                    const e = "0123456789abcdef",
                        t = new Array(256);
                    for (let r = 0; r < 16; ++r) {
                        const o = 16 * r;
                        for (let n = 0; n < 16; ++n) t[o + n] = e[r] + e[n]
                    }
                    return t
                }();

                function Z(e) {
                    return "undefined" == typeof BigInt ? Q : e
                }

                function Q() {
                    throw new Error("BigInt not supported")
                }
            },
            5744: (e, t, r) => {
                "use strict";
                var o = r(6671).Buffer,
                    n = r(896).Transform,
                    i = r(4105).I;

                function a(e) {
                    n.call(this), this.hashMode = "string" == typeof e, this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
                }
                r(6192)(a, n);
                var s = "undefined" != typeof Uint8Array,
                    u = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && ArrayBuffer.isView && (o.prototype instanceof Uint8Array || o.TYPED_ARRAY_SUPPORT);
                a.prototype.update = function(e, t, r) {
                    var n = function(e, t) {
                            if (e instanceof o) return e;
                            if ("string" == typeof e) return o.from(e, t);
                            if (u && ArrayBuffer.isView(e)) {
                                if (0 === e.byteLength) return o.alloc(0);
                                var r = o.from(e.buffer, e.byteOffset, e.byteLength);
                                if (r.byteLength === e.byteLength) return r
                            }
                            if (s && e instanceof Uint8Array) return o.from(e);
                            if (o.isBuffer(e) && e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)) return o.from(e);
                            throw new TypeError('The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView.')
                        }(e, t),
                        i = this._update(n);
                    return this.hashMode ? this : (r && (i = this._toString(i, r)), i)
                }, a.prototype.setAutoPadding = function() {}, a.prototype.getAuthTag = function() {
                    throw new Error("trying to get auth tag in unsupported state")
                }, a.prototype.setAuthTag = function() {
                    throw new Error("trying to set auth tag in unsupported state")
                }, a.prototype.setAAD = function() {
                    throw new Error("trying to set aad in unsupported state")
                }, a.prototype._transform = function(e, t, r) {
                    var o;
                    try {
                        this.hashMode ? this._update(e) : this.push(this._update(e))
                    } catch (e) {
                        o = e
                    } finally {
                        r(o)
                    }
                }, a.prototype._flush = function(e) {
                    var t;
                    try {
                        this.push(this.__final())
                    } catch (e) {
                        t = e
                    }
                    e(t)
                }, a.prototype._finalOrDigest = function(e) {
                    var t = this.__final() || o.alloc(0);
                    return e && (t = this._toString(t, e, !0)), t
                }, a.prototype._toString = function(e, t, r) {
                    if (this._decoder || (this._decoder = new i(t), this._encoding = t), this._encoding !== t) throw new Error("can’t switch encodings");
                    var o = this._decoder.write(e);
                    return r && (o += this._decoder.end()), o
                }, e.exports = a
            },
            7824: (e, t, r) => {
                "use strict";
                var o = r(6192),
                    n = r(5916),
                    i = r(1609),
                    a = r(9273),
                    s = r(5744);

                function u(e) {
                    s.call(this, "digest"), this._hash = e
                }
                o(u, s), u.prototype._update = function(e) {
                    this._hash.update(e)
                }, u.prototype._final = function() {
                    return this._hash.digest()
                }, e.exports = function(e) {
                    return "md5" === (e = e.toLowerCase()) ? new n : "rmd160" === e || "ripemd160" === e ? new i : new u(a(e))
                }
            },
            145: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ECPairFactory = t.networks = void 0;
                const o = r(3710);
                t.networks = o;
                const n = r(4116),
                    i = r(8030),
                    a = r(2657),
                    s = r(7172),
                    u = n.typeforce.maybe(n.typeforce.compile({
                        compressed: n.maybe(n.Boolean),
                        network: n.maybe(n.Network)
                    }));
                t.ECPairFactory = function(e) {
                    function t(t, r) {
                        if (n.typeforce(n.Buffer256bit, t), !e.isPrivate(t)) throw new TypeError("Private key not in range [1, n)");
                        return n.typeforce(u, r), new c(t, void 0, r)
                    }

                    function r(t, r) {
                        return n.typeforce(e.isPoint, t), n.typeforce(u, r), new c(void 0, t, r)
                    }(0, s.testEcc)(e);
                    class c {
                        __D;
                        __Q;
                        compressed;
                        network;
                        lowR;
                        constructor(t, r, n) {
                            this.__D = t, this.__Q = r, this.lowR = !1, void 0 === n && (n = {}), this.compressed = void 0 === n.compressed || n.compressed, this.network = n.network || o.bitcoin, void 0 !== r && (this.__Q = Buffer.from(e.pointCompress(r, this.compressed)))
                        }
                        get privateKey() {
                            return this.__D
                        }
                        get publicKey() {
                            if (!this.__Q) {
                                const t = e.pointFromScalar(this.__D, this.compressed);
                                this.__Q = Buffer.from(t)
                            }
                            return this.__Q
                        }
                        toWIF() {
                            if (!this.__D) throw new Error("Missing private key");
                            return a.encode(this.network.wif, this.__D, this.compressed)
                        }
                        tweak(e) {
                            return this.privateKey ? this.tweakFromPrivateKey(e) : this.tweakFromPublicKey(e)
                        }
                        sign(t, r) {
                            if (!this.__D) throw new Error("Missing private key");
                            if (void 0 === r && (r = this.lowR), !1 === r) return Buffer.from(e.sign(t, this.__D)); {
                                let r = e.sign(t, this.__D);
                                const o = Buffer.alloc(32, 0);
                                let n = 0;
                                for (; r[0] > 127;) n++, o.writeUIntLE(n, 0, 6), r = e.sign(t, this.__D, o);
                                return Buffer.from(r)
                            }
                        }
                        signSchnorr(t) {
                            if (!this.privateKey) throw new Error("Missing private key");
                            if (!e.signSchnorr) throw new Error("signSchnorr not supported by ecc library");
                            return Buffer.from(e.signSchnorr(t, this.privateKey))
                        }
                        verify(t, r) {
                            return e.verify(t, this.publicKey, r)
                        }
                        verifySchnorr(t, r) {
                            if (!e.verifySchnorr) throw new Error("verifySchnorr not supported by ecc library");
                            return e.verifySchnorr(t, this.publicKey.subarray(1, 33), r)
                        }
                        tweakFromPublicKey(t) {
                            const o = 32 === (n = this.publicKey).length ? n : n.slice(1, 33);
                            var n;
                            const i = e.xOnlyPointAddTweak(o, t);
                            if (!i || null === i.xOnlyPubkey) throw new Error("Cannot tweak public key!");
                            const a = Buffer.from([0 === i.parity ? 2 : 3]);
                            return r(Buffer.concat([a, i.xOnlyPubkey]), {
                                network: this.network,
                                compressed: this.compressed
                            })
                        }
                        tweakFromPrivateKey(r) {
                            const o = 3 !== this.publicKey[0] && (4 !== this.publicKey[0] || 1 & ~this.publicKey[64]) ? this.privateKey : e.privateNegate(this.privateKey),
                                n = e.privateAdd(o, r);
                            if (!n) throw new Error("Invalid tweaked private key!");
                            return t(Buffer.from(n), {
                                network: this.network,
                                compressed: this.compressed
                            })
                        }
                    }
                    return {
                        isPoint: function(t) {
                            return e.isPoint(t)
                        },
                        fromPrivateKey: t,
                        fromPublicKey: r,
                        fromWIF: function(e, r) {
                            const i = a.decode(e),
                                s = i.version;
                            if (n.Array(r)) {
                                if (!(r = r.filter((e => s === e.wif)).pop())) throw new Error("Unknown network version")
                            } else if (r = r || o.bitcoin, s !== r.wif) throw new Error("Invalid network version");
                            return t(i.privateKey, {
                                compressed: i.compressed,
                                network: r
                            })
                        },
                        makeRandom: function(r) {
                            n.typeforce(u, r), void 0 === r && (r = {});
                            const o = r.rng || i;
                            let a;
                            do {
                                a = o(32), n.typeforce(n.Buffer256bit, a)
                            } while (!e.isPrivate(a));
                            return t(a, r)
                        }
                    }
                }
            },
            7213: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.networks = t.ECPairFactory = t.default = void 0;
                var o = r(145);
                Object.defineProperty(t, "default", {
                    enumerable: !0,
                    get: function() {
                        return o.ECPairFactory
                    }
                }), Object.defineProperty(t, "ECPairFactory", {
                    enumerable: !0,
                    get: function() {
                        return o.ECPairFactory
                    }
                }), Object.defineProperty(t, "networks", {
                    enumerable: !0,
                    get: function() {
                        return o.networks
                    }
                })
            },
            3710: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.testnet = t.bitcoin = void 0, t.bitcoin = {
                    messagePrefix: "Bitcoin Signed Message:\n",
                    bech32: "bc",
                    bip32: {
                        public: 76067358,
                        private: 76066276
                    },
                    pubKeyHash: 0,
                    scriptHash: 5,
                    wif: 128
                }, t.testnet = {
                    messagePrefix: "Bitcoin Signed Message:\n",
                    bech32: "tb",
                    bip32: {
                        public: 70617039,
                        private: 70615956
                    },
                    pubKeyHash: 111,
                    scriptHash: 196,
                    wif: 239
                }
            },
            7172: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.testEcc = void 0;
                const r = e => Buffer.from(e, "hex");

                function o(e) {
                    if (!e) throw new Error("ecc library invalid")
                }
                t.testEcc = function(e) {
                    o(e.isPoint(r("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), o(!e.isPoint(r("030000000000000000000000000000000000000000000000000000000000000005"))), o(e.isPrivate(r("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), o(e.isPrivate(r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"))), o(!e.isPrivate(r("0000000000000000000000000000000000000000000000000000000000000000"))), o(!e.isPrivate(r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"))), o(!e.isPrivate(r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364142"))), o(Buffer.from(e.privateAdd(r("0000000000000000000000000000000000000000000000000000000000000001"), r("0000000000000000000000000000000000000000000000000000000000000000"))).equals(r("0000000000000000000000000000000000000000000000000000000000000001"))), o(null === e.privateAdd(r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e"), r("0000000000000000000000000000000000000000000000000000000000000003"))), o(Buffer.from(e.privateAdd(r("e211078564db65c3ce7704f08262b1f38f1ef412ad15b5ac2d76657a63b2c500"), r("b51fbb69051255d1becbd683de5848242a89c229348dd72896a87ada94ae8665"))).equals(r("9730c2ee69edbb958d42db7460bafa18fef9d955325aec99044c81c8282b0a24"))), o(Buffer.from(e.privateNegate(r("0000000000000000000000000000000000000000000000000000000000000001"))).equals(r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"))), o(Buffer.from(e.privateNegate(r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e"))).equals(r("0000000000000000000000000000000000000000000000000000000000000003"))), o(Buffer.from(e.privateNegate(r("b1121e4088a66a28f5b6b0f5844943ecd9f610196d7bb83b25214b60452c09af"))).equals(r("4eede1bf775995d70a494f0a7bb6bc11e0b8cccd41cce8009ab1132c8b0a3792"))), o(Buffer.from(e.pointCompress(r("0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"), !0)).equals(r("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), o(Buffer.from(e.pointCompress(r("0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"), !1)).equals(r("0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"))), o(Buffer.from(e.pointCompress(r("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), !0)).equals(r("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), o(Buffer.from(e.pointCompress(r("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), !1)).equals(r("0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"))), o(Buffer.from(e.pointFromScalar(r("b1121e4088a66a28f5b6b0f5844943ecd9f610196d7bb83b25214b60452c09af"))).equals(r("02b07ba9dca9523b7ef4bd97703d43d20399eb698e194704791a25ce77a400df99"))), o(null === e.xOnlyPointAddTweak(r("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140")));
                    let t = e.xOnlyPointAddTweak(r("1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b"), r("a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac"));
                    o(Buffer.from(t.xOnlyPubkey).equals(r("e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf")) && 1 === t.parity), t = e.xOnlyPointAddTweak(r("2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991"), r("823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47")), o(Buffer.from(t.xOnlyPubkey).equals(r("9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c")) && 0 === t.parity), o(Buffer.from(e.sign(r("5e9f0a0d593efdcf78ac923bc3313e4e7d408d574354ee2b3288c0da9fbba6ed"), r("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"))).equals(r("54c4a33c6423d689378f160a7ff8b61330444abb58fb470f96ea16d99d4a2fed07082304410efa6b2943111b6a4e0aaa7b7db55a07e9861d1fb3cb1f421044a5"))), o(e.verify(r("5e9f0a0d593efdcf78ac923bc3313e4e7d408d574354ee2b3288c0da9fbba6ed"), r("0379be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), r("54c4a33c6423d689378f160a7ff8b61330444abb58fb470f96ea16d99d4a2fed07082304410efa6b2943111b6a4e0aaa7b7db55a07e9861d1fb3cb1f421044a5"))), e.signSchnorr && o(Buffer.from(e.signSchnorr(r("7e2d58d8b3bcdf1abadec7829054f90dda9805aab56c77333024b9d0a508b75c"), r("c90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b14e5c9"), r("c87aa53824b4d7ae2eb035a2b5bbbccc080e76cdc6d1692c4b0b62d798e6d906"))).equals(r("5831aaeed7b44bb74e5eab94ba9d4294c49bcf2a60728d8b4c200f50dd313c1bab745879a5ad954a72c45a91c3a51d3c7adea98d82f8481e0e1e03674a6f3fb7"))), e.verifySchnorr && o(e.verifySchnorr(r("7e2d58d8b3bcdf1abadec7829054f90dda9805aab56c77333024b9d0a508b75c"), r("dd308afec5777e13121fa72b9cc1b7cc0139715309b086c960e18fd969774eb8"), r("5831aaeed7b44bb74e5eab94ba9d4294c49bcf2a60728d8b4c200f50dd313c1bab745879a5ad954a72c45a91c3a51d3c7adea98d82f8481e0e1e03674a6f3fb7")))
                }
            },
            4116: (e, t, r) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.maybe = t.Boolean = t.Array = t.Buffer256bit = t.Network = t.typeforce = void 0, t.typeforce = r(8087), t.Network = t.typeforce.compile({
                    messagePrefix: t.typeforce.oneOf(t.typeforce.Buffer, t.typeforce.String),
                    bip32: {
                        public: t.typeforce.UInt32,
                        private: t.typeforce.UInt32
                    },
                    pubKeyHash: t.typeforce.UInt8,
                    scriptHash: t.typeforce.UInt8,
                    wif: t.typeforce.UInt8
                }), t.Buffer256bit = t.typeforce.BufferN(32), t.Array = t.typeforce.Array, t.Boolean = t.typeforce.Boolean, t.maybe = t.typeforce.maybe
            },
            9784: e => {
                "use strict";
                var t, r = "object" == typeof Reflect ? Reflect : null,
                    o = r && "function" == typeof r.apply ? r.apply : function(e, t, r) {
                        return Function.prototype.apply.call(e, t, r)
                    };
                t = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function(e) {
                    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
                } : function(e) {
                    return Object.getOwnPropertyNames(e)
                };
                var n = Number.isNaN || function(e) {
                    return e != e
                };

                function i() {
                    i.init.call(this)
                }
                e.exports = i, e.exports.once = function(e, t) {
                    return new Promise((function(r, o) {
                        function n(r) {
                            e.removeListener(t, i), o(r)
                        }

                        function i() {
                            "function" == typeof e.removeListener && e.removeListener("error", n), r([].slice.call(arguments))
                        }
                        b(e, t, i, {
                            once: !0
                        }), "error" !== t && function(e, t) {
                            "function" == typeof e.on && b(e, "error", t, {
                                once: !0
                            })
                        }(e, n)
                    }))
                }, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
                var a = 10;

                function s(e) {
                    if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
                }

                function u(e) {
                    return void 0 === e._maxListeners ? i.defaultMaxListeners : e._maxListeners
                }

                function c(e, t, r, o) {
                    var n, i, a, c;
                    if (s(r), void 0 === (i = e._events) ? (i = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== i.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), i = e._events), a = i[t]), void 0 === a) a = i[t] = r, ++e._eventsCount;
                    else if ("function" == typeof a ? a = i[t] = o ? [r, a] : [a, r] : o ? a.unshift(r) : a.push(r), (n = u(e)) > 0 && a.length > n && !a.warned) {
                        a.warned = !0;
                        var l = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                        l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = a.length, c = l, console && console.warn && console.warn(c)
                    }
                    return e
                }

                function l() {
                    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
                }

                function f(e, t, r) {
                    var o = {
                            fired: !1,
                            wrapFn: void 0,
                            target: e,
                            type: t,
                            listener: r
                        },
                        n = l.bind(o);
                    return n.listener = r, o.wrapFn = n, n
                }

                function d(e, t, r) {
                    var o = e._events;
                    if (void 0 === o) return [];
                    var n = o[t];
                    return void 0 === n ? [] : "function" == typeof n ? r ? [n.listener || n] : [n] : r ? function(e) {
                        for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
                        return t
                    }(n) : p(n, n.length)
                }

                function h(e) {
                    var t = this._events;
                    if (void 0 !== t) {
                        var r = t[e];
                        if ("function" == typeof r) return 1;
                        if (void 0 !== r) return r.length
                    }
                    return 0
                }

                function p(e, t) {
                    for (var r = new Array(t), o = 0; o < t; ++o) r[o] = e[o];
                    return r
                }

                function b(e, t, r, o) {
                    if ("function" == typeof e.on) o.once ? e.once(t, r) : e.on(t, r);
                    else {
                        if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
                        e.addEventListener(t, (function n(i) {
                            o.once && e.removeEventListener(t, n), r(i)
                        }))
                    }
                }
                Object.defineProperty(i, "defaultMaxListeners", {
                    enumerable: !0,
                    get: function() {
                        return a
                    },
                    set: function(e) {
                        if ("number" != typeof e || e < 0 || n(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                        a = e
                    }
                }), i.init = function() {
                    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
                }, i.prototype.setMaxListeners = function(e) {
                    if ("number" != typeof e || e < 0 || n(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
                    return this._maxListeners = e, this
                }, i.prototype.getMaxListeners = function() {
                    return u(this)
                }, i.prototype.emit = function(e) {
                    for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
                    var n = "error" === e,
                        i = this._events;
                    if (void 0 !== i) n = n && void 0 === i.error;
                    else if (!n) return !1;
                    if (n) {
                        var a;
                        if (t.length > 0 && (a = t[0]), a instanceof Error) throw a;
                        var s = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
                        throw s.context = a, s
                    }
                    var u = i[e];
                    if (void 0 === u) return !1;
                    if ("function" == typeof u) o(u, this, t);
                    else {
                        var c = u.length,
                            l = p(u, c);
                        for (r = 0; r < c; ++r) o(l[r], this, t)
                    }
                    return !0
                }, i.prototype.addListener = function(e, t) {
                    return c(this, e, t, !1)
                }, i.prototype.on = i.prototype.addListener, i.prototype.prependListener = function(e, t) {
                    return c(this, e, t, !0)
                }, i.prototype.once = function(e, t) {
                    return s(t), this.on(e, f(this, e, t)), this
                }, i.prototype.prependOnceListener = function(e, t) {
                    return s(t), this.prependListener(e, f(this, e, t)), this
                }, i.prototype.removeListener = function(e, t) {
                    var r, o, n, i, a;
                    if (s(t), void 0 === (o = this._events)) return this;
                    if (void 0 === (r = o[e])) return this;
                    if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete o[e], o.removeListener && this.emit("removeListener", e, r.listener || t));
                    else if ("function" != typeof r) {
                        for (n = -1, i = r.length - 1; i >= 0; i--)
                            if (r[i] === t || r[i].listener === t) {
                                a = r[i].listener, n = i;
                                break
                            } if (n < 0) return this;
                        0 === n ? r.shift() : function(e, t) {
                            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                            e.pop()
                        }(r, n), 1 === r.length && (o[e] = r[0]), void 0 !== o.removeListener && this.emit("removeListener", e, a || t)
                    }
                    return this
                }, i.prototype.off = i.prototype.removeListener, i.prototype.removeAllListeners = function(e) {
                    var t, r, o;
                    if (void 0 === (r = this._events)) return this;
                    if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[e]), this;
                    if (0 === arguments.length) {
                        var n, i = Object.keys(r);
                        for (o = 0; o < i.length; ++o) "removeListener" !== (n = i[o]) && this.removeAllListeners(n);
                        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                    }
                    if ("function" == typeof(t = r[e])) this.removeListener(e, t);
                    else if (void 0 !== t)
                        for (o = t.length - 1; o >= 0; o--) this.removeListener(e, t[o]);
                    return this
                }, i.prototype.listeners = function(e) {
                    return d(this, e, !0)
                }, i.prototype.rawListeners = function(e) {
                    return d(this, e, !1)
                }, i.listenerCount = function(e, t) {
                    return "function" == typeof e.listenerCount ? e.listenerCount(t) : h.call(e, t)
                }, i.prototype.listenerCount = h, i.prototype.eventNames = function() {
                    return this._eventsCount > 0 ? t(this._events) : []
                }
            },
            859: (e, t, r) => {
                "use strict";
                var o = r(6671).Buffer,
                    n = r(5727).Transform;

                function i(e) {
                    n.call(this), this._block = o.allocUnsafe(e), this._blockSize = e, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
                }
                r(6192)(i, n), i.prototype._transform = function(e, t, r) {
                    var o = null;
                    try {
                        this.update(e, t)
                    } catch (e) {
                        o = e
                    }
                    r(o)
                }, i.prototype._flush = function(e) {
                    var t = null;
                    try {
                        this.push(this.digest())
                    } catch (e) {
                        t = e
                    }
                    e(t)
                }, i.prototype.update = function(e, t) {
                    if (function(e) {
                            if (!o.isBuffer(e) && "string" != typeof e) throw new TypeError("Data must be a string or a buffer")
                        }(e), this._finalized) throw new Error("Digest already called");
                    o.isBuffer(e) || (e = o.from(e, t));
                    for (var r = this._block, n = 0; this._blockOffset + e.length - n >= this._blockSize;) {
                        for (var i = this._blockOffset; i < this._blockSize;) r[i++] = e[n++];
                        this._update(), this._blockOffset = 0
                    }
                    for (; n < e.length;) r[this._blockOffset++] = e[n++];
                    for (var a = 0, s = 8 * e.length; s > 0; ++a) this._length[a] += s, (s = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * s);
                    return this
                }, i.prototype._update = function() {
                    throw new Error("_update is not implemented")
                }, i.prototype.digest = function(e) {
                    if (this._finalized) throw new Error("Digest already called");
                    this._finalized = !0;
                    var t = this._digest();
                    void 0 !== e && (t = t.toString(e)), this._block.fill(0), this._blockOffset = 0;
                    for (var r = 0; r < 4; ++r) this._length[r] = 0;
                    return t
                }, i.prototype._digest = function() {
                    throw new Error("_digest is not implemented")
                }, e.exports = i
            },
            7947: (e, t) => {
                t.read = function(e, t, r, o, n) {
                    var i, a, s = 8 * n - o - 1,
                        u = (1 << s) - 1,
                        c = u >> 1,
                        l = -7,
                        f = r ? n - 1 : 0,
                        d = r ? -1 : 1,
                        h = e[t + f];
                    for (f += d, i = h & (1 << -l) - 1, h >>= -l, l += s; l > 0; i = 256 * i + e[t + f], f += d, l -= 8);
                    for (a = i & (1 << -l) - 1, i >>= -l, l += o; l > 0; a = 256 * a + e[t + f], f += d, l -= 8);
                    if (0 === i) i = 1 - c;
                    else {
                        if (i === u) return a ? NaN : 1 / 0 * (h ? -1 : 1);
                        a += Math.pow(2, o), i -= c
                    }
                    return (h ? -1 : 1) * a * Math.pow(2, i - o)
                }, t.write = function(e, t, r, o, n, i) {
                    var a, s, u, c = 8 * i - n - 1,
                        l = (1 << c) - 1,
                        f = l >> 1,
                        d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        h = o ? 0 : i - 1,
                        p = o ? 1 : -1,
                        b = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = l) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (t += a + f >= 1 ? d / u : d * Math.pow(2, 1 - f)) * u >= 2 && (a++, u /= 2), a + f >= l ? (s = 0, a = l) : a + f >= 1 ? (s = (t * u - 1) * Math.pow(2, n), a += f) : (s = t * Math.pow(2, f - 1) * Math.pow(2, n), a = 0)); n >= 8; e[r + h] = 255 & s, h += p, s /= 256, n -= 8);
                    for (a = a << n | s, c += n; c > 0; e[r + h] = 255 & a, h += p, a /= 256, c -= 8);
                    e[r + h - p] |= 128 * b
                }
            },
            6192: e => {
                "function" == typeof Object.create ? e.exports = function(e, t) {
                    t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }))
                } : e.exports = function(e, t) {
                    if (t) {
                        e.super_ = t;
                        var r = function() {};
                        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                    }
                }
            },
            5916: (e, t, r) => {
                "use strict";
                var o = r(6192),
                    n = r(859),
                    i = r(6671).Buffer,
                    a = new Array(16);

                function s() {
                    n.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
                }

                function u(e, t) {
                    return e << t | e >>> 32 - t
                }

                function c(e, t, r, o, n, i, a) {
                    return u(e + (t & r | ~t & o) + n + i | 0, a) + t | 0
                }

                function l(e, t, r, o, n, i, a) {
                    return u(e + (t & o | r & ~o) + n + i | 0, a) + t | 0
                }

                function f(e, t, r, o, n, i, a) {
                    return u(e + (t ^ r ^ o) + n + i | 0, a) + t | 0
                }

                function d(e, t, r, o, n, i, a) {
                    return u(e + (r ^ (t | ~o)) + n + i | 0, a) + t | 0
                }
                o(s, n), s.prototype._update = function() {
                    for (var e = a, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
                    var r = this._a,
                        o = this._b,
                        n = this._c,
                        i = this._d;
                    r = c(r, o, n, i, e[0], 3614090360, 7), i = c(i, r, o, n, e[1], 3905402710, 12), n = c(n, i, r, o, e[2], 606105819, 17), o = c(o, n, i, r, e[3], 3250441966, 22), r = c(r, o, n, i, e[4], 4118548399, 7), i = c(i, r, o, n, e[5], 1200080426, 12), n = c(n, i, r, o, e[6], 2821735955, 17), o = c(o, n, i, r, e[7], 4249261313, 22), r = c(r, o, n, i, e[8], 1770035416, 7), i = c(i, r, o, n, e[9], 2336552879, 12), n = c(n, i, r, o, e[10], 4294925233, 17), o = c(o, n, i, r, e[11], 2304563134, 22), r = c(r, o, n, i, e[12], 1804603682, 7), i = c(i, r, o, n, e[13], 4254626195, 12), n = c(n, i, r, o, e[14], 2792965006, 17), r = l(r, o = c(o, n, i, r, e[15], 1236535329, 22), n, i, e[1], 4129170786, 5), i = l(i, r, o, n, e[6], 3225465664, 9), n = l(n, i, r, o, e[11], 643717713, 14), o = l(o, n, i, r, e[0], 3921069994, 20), r = l(r, o, n, i, e[5], 3593408605, 5), i = l(i, r, o, n, e[10], 38016083, 9), n = l(n, i, r, o, e[15], 3634488961, 14), o = l(o, n, i, r, e[4], 3889429448, 20), r = l(r, o, n, i, e[9], 568446438, 5), i = l(i, r, o, n, e[14], 3275163606, 9), n = l(n, i, r, o, e[3], 4107603335, 14), o = l(o, n, i, r, e[8], 1163531501, 20), r = l(r, o, n, i, e[13], 2850285829, 5), i = l(i, r, o, n, e[2], 4243563512, 9), n = l(n, i, r, o, e[7], 1735328473, 14), r = f(r, o = l(o, n, i, r, e[12], 2368359562, 20), n, i, e[5], 4294588738, 4), i = f(i, r, o, n, e[8], 2272392833, 11), n = f(n, i, r, o, e[11], 1839030562, 16), o = f(o, n, i, r, e[14], 4259657740, 23), r = f(r, o, n, i, e[1], 2763975236, 4), i = f(i, r, o, n, e[4], 1272893353, 11), n = f(n, i, r, o, e[7], 4139469664, 16), o = f(o, n, i, r, e[10], 3200236656, 23), r = f(r, o, n, i, e[13], 681279174, 4), i = f(i, r, o, n, e[0], 3936430074, 11), n = f(n, i, r, o, e[3], 3572445317, 16), o = f(o, n, i, r, e[6], 76029189, 23), r = f(r, o, n, i, e[9], 3654602809, 4), i = f(i, r, o, n, e[12], 3873151461, 11), n = f(n, i, r, o, e[15], 530742520, 16), r = d(r, o = f(o, n, i, r, e[2], 3299628645, 23), n, i, e[0], 4096336452, 6), i = d(i, r, o, n, e[7], 1126891415, 10), n = d(n, i, r, o, e[14], 2878612391, 15), o = d(o, n, i, r, e[5], 4237533241, 21), r = d(r, o, n, i, e[12], 1700485571, 6), i = d(i, r, o, n, e[3], 2399980690, 10), n = d(n, i, r, o, e[10], 4293915773, 15), o = d(o, n, i, r, e[1], 2240044497, 21), r = d(r, o, n, i, e[8], 1873313359, 6), i = d(i, r, o, n, e[15], 4264355552, 10), n = d(n, i, r, o, e[6], 2734768916, 15), o = d(o, n, i, r, e[13], 1309151649, 21), r = d(r, o, n, i, e[4], 4149444226, 6), i = d(i, r, o, n, e[11], 3174756917, 10), n = d(n, i, r, o, e[2], 718787259, 15), o = d(o, n, i, r, e[9], 3951481745, 21), this._a = this._a + r | 0, this._b = this._b + o | 0, this._c = this._c + n | 0, this._d = this._d + i | 0
                }, s.prototype._digest = function() {
                    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
                    var e = i.allocUnsafe(16);
                    return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e
                }, e.exports = s
            },
            8030: (e, t, r) => {
                "use strict";
                var o = 65536,
                    n = r(6671).Buffer,
                    i = r.g.crypto || r.g.msCrypto;
                i && i.getRandomValues ? e.exports = function(e, t) {
                    if (e > 4294967295) throw new RangeError("requested too many random bytes");
                    var r = n.allocUnsafe(e);
                    if (e > 0)
                        if (e > o)
                            for (var a = 0; a < e; a += o) i.getRandomValues(r.slice(a, a + o));
                        else i.getRandomValues(r);
                    return "function" == typeof t ? process.nextTick((function() {
                        t(null, r)
                    })) : r
                } : e.exports = function() {
                    throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
                }
            },
            8704: e => {
                "use strict";
                var t = {};

                function r(e, r, o) {
                    o || (o = Error);
                    var n = function(e) {
                        var t, o;

                        function n(t, o, n) {
                            return e.call(this, function(e, t, o) {
                                return "string" == typeof r ? r : r(e, t, o)
                            }(t, o, n)) || this
                        }
                        return o = e, (t = n).prototype = Object.create(o.prototype), t.prototype.constructor = t, t.__proto__ = o, n
                    }(o);
                    n.prototype.name = o.name, n.prototype.code = e, t[e] = n
                }

                function o(e, t) {
                    if (Array.isArray(e)) {
                        var r = e.length;
                        return e = e.map((function(e) {
                            return String(e)
                        })), r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0])
                    }
                    return "of ".concat(t, " ").concat(String(e))
                }
                r("ERR_INVALID_OPT_VALUE", (function(e, t) {
                    return 'The value "' + t + '" is invalid for option "' + e + '"'
                }), TypeError), r("ERR_INVALID_ARG_TYPE", (function(e, t, r) {
                    var n, i, a, s, u;
                    if ("string" == typeof t && (i = "not ", t.substr(0, 4) === i) ? (n = "must not be", t = t.replace(/^not /, "")) : n = "must be", function(e, t, r) {
                            return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - 9, r) === t
                        }(e, " argument")) a = "The ".concat(e, " ").concat(n, " ").concat(o(t, "type"));
                    else {
                        var c = ("number" != typeof u && (u = 0), u + 1 > (s = e).length || -1 === s.indexOf(".", u) ? "argument" : "property");
                        a = 'The "'.concat(e, '" ').concat(c, " ").concat(n, " ").concat(o(t, "type"))
                    }
                    return a + ". Received type ".concat(typeof r)
                }), TypeError), r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r("ERR_METHOD_NOT_IMPLEMENTED", (function(e) {
                    return "The " + e + " method is not implemented"
                })), r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r("ERR_STREAM_DESTROYED", (function(e) {
                    return "Cannot call " + e + " after a stream was destroyed"
                })), r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r("ERR_STREAM_WRITE_AFTER_END", "write after end"), r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r("ERR_UNKNOWN_ENCODING", (function(e) {
                    return "Unknown encoding: " + e
                }), TypeError), r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), e.exports.F = t
            },
            5606: (e, t, r) => {
                "use strict";
                var o = Object.keys || function(e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                };
                e.exports = c;
                var n = r(4324),
                    i = r(6868);
                r(6192)(c, n);
                for (var a = o(i.prototype), s = 0; s < a.length; s++) {
                    var u = a[s];
                    c.prototype[u] || (c.prototype[u] = i.prototype[u])
                }

                function c(e) {
                    if (!(this instanceof c)) return new c(e);
                    n.call(this, e), i.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", l)))
                }

                function l() {
                    this._writableState.ended || process.nextTick(f, this)
                }

                function f(e) {
                    e.end()
                }
                Object.defineProperty(c.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }), Object.defineProperty(c.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }), Object.defineProperty(c.prototype, "writableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.length
                    }
                }), Object.defineProperty(c.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
                    },
                    set: function(e) {
                        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                    }
                })
            },
            9648: (e, t, r) => {
                "use strict";
                e.exports = n;
                var o = r(4914);

                function n(e) {
                    if (!(this instanceof n)) return new n(e);
                    o.call(this, e)
                }
                r(6192)(n, o), n.prototype._transform = function(e, t, r) {
                    r(null, e)
                }
            },
            4324: (e, t, r) => {
                "use strict";
                var o;
                e.exports = S, S.ReadableState = _, r(9784).EventEmitter;
                var n, i = function(e, t) {
                        return e.listeners(t).length
                    },
                    a = r(9481),
                    s = r(4686).Buffer,
                    u = (void 0 !== r.g ? r.g : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {},
                    c = r(8854);
                n = c && c.debuglog ? c.debuglog("stream") : function() {};
                var l, f, d, h = r(9865),
                    p = r(4552),
                    b = r(7963).getHighWaterMark,
                    g = r(8704).F,
                    m = g.ERR_INVALID_ARG_TYPE,
                    y = g.ERR_STREAM_PUSH_AFTER_EOF,
                    v = g.ERR_METHOD_NOT_IMPLEMENTED,
                    w = g.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                r(6192)(S, a);
                var k = p.errorOrDestroy,
                    E = ["error", "close", "destroy", "pause", "resume"];

                function _(e, t, n) {
                    o = o || r(5606), e = e || {}, "boolean" != typeof n && (n = t instanceof o), this.objectMode = !!e.objectMode, n && (this.objectMode = this.objectMode || !!e.readableObjectMode), this.highWaterMark = b(this, e, "readableHighWaterMark", n), this.buffer = new h, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== e.emitClose, this.autoDestroy = !!e.autoDestroy, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (l || (l = r(4105).I), this.decoder = new l(e.encoding), this.encoding = e.encoding)
                }

                function S(e) {
                    if (o = o || r(5606), !(this instanceof S)) return new S(e);
                    var t = this instanceof o;
                    this._readableState = new _(e, this, t), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), a.call(this)
                }

                function T(e, t, r, o, i) {
                    n("readableAddChunk", t);
                    var a, c = e._readableState;
                    if (null === t) c.reading = !1,
                        function(e, t) {
                            if (n("onEofChunk"), !t.ended) {
                                if (t.decoder) {
                                    var r = t.decoder.end();
                                    r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                                }
                                t.ended = !0, t.sync ? A(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, O(e)))
                            }
                        }(e, c);
                    else if (i || (a = function(e, t) {
                            var r, o;
                            return o = t, s.isBuffer(o) || o instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk", ["string", "Buffer", "Uint8Array"], t)), r
                        }(c, t)), a) k(e, a);
                    else if (c.objectMode || t && t.length > 0)
                        if ("string" == typeof t || c.objectMode || Object.getPrototypeOf(t) === s.prototype || (t = function(e) {
                                return s.from(e)
                            }(t)), o) c.endEmitted ? k(e, new w) : x(e, c, t, !0);
                        else if (c.ended) k(e, new y);
                    else {
                        if (c.destroyed) return !1;
                        c.reading = !1, c.decoder && !r ? (t = c.decoder.write(t), c.objectMode || 0 !== t.length ? x(e, c, t, !1) : P(e, c)) : x(e, c, t, !1)
                    } else o || (c.reading = !1, P(e, c));
                    return !c.ended && (c.length < c.highWaterMark || 0 === c.length)
                }

                function x(e, t, r, o) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, o ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && A(e)), P(e, t)
                }
                Object.defineProperty(S.prototype, "destroyed", {
                    enumerable: !1,
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }), S.prototype.destroy = p.destroy, S.prototype._undestroy = p.undestroy, S.prototype._destroy = function(e, t) {
                    t(e)
                }, S.prototype.push = function(e, t) {
                    var r, o = this._readableState;
                    return o.objectMode ? r = !0 : "string" == typeof e && ((t = t || o.defaultEncoding) !== o.encoding && (e = s.from(e, t), t = ""), r = !0), T(this, e, t, !1, r)
                }, S.prototype.unshift = function(e) {
                    return T(this, e, null, !0, !1)
                }, S.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }, S.prototype.setEncoding = function(e) {
                    l || (l = r(4105).I);
                    var t = new l(e);
                    this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var o = this._readableState.buffer.head, n = ""; null !== o;) n += t.write(o.data), o = o.next;
                    return this._readableState.buffer.clear(), "" !== n && this._readableState.buffer.push(n), this._readableState.length = n.length, this
                };
                var I = 1073741824;

                function B(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        return e >= I ? e = I : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                    }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
                }

                function A(e) {
                    var t = e._readableState;
                    n("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (n("emitReadable", t.flowing), t.emittedReadable = !0, process.nextTick(O, e))
                }

                function O(e) {
                    var t = e._readableState;
                    n("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || !t.length && !t.ended || (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, N(e)
                }

                function P(e, t) {
                    t.readingMore || (t.readingMore = !0, process.nextTick(z, e, t))
                }

                function z(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                        var r = t.length;
                        if (n("maybeReadMore read 0"), e.read(0), r === t.length) break
                    }
                    t.readingMore = !1
                }

                function j(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }

                function U(e) {
                    n("readable nexttick read 0"), e.read(0)
                }

                function L(e, t) {
                    n("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), N(e), t.flowing && !t.reading && e.read(0)
                }

                function N(e) {
                    var t = e._readableState;
                    for (n("flow", t.flowing); t.flowing && null !== e.read(););
                }

                function R(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r);
                    var r
                }

                function H(e) {
                    var t = e._readableState;
                    n("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, process.nextTick(C, t, e))
                }

                function C(e, t) {
                    if (n("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }

                function M(e, t) {
                    for (var r = 0, o = e.length; r < o; r++)
                        if (e[r] === t) return r;
                    return -1
                }
                S.prototype.read = function(e) {
                    n("read", e), e = parseInt(e, 10);
                    var t = this._readableState,
                        r = e;
                    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return n("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? H(this) : A(this), null;
                    if (0 === (e = B(e, t)) && t.ended) return 0 === t.length && H(this), null;
                    var o, i = t.needReadable;
                    return n("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && n("length less than watermark", i = !0), t.ended || t.reading ? n("reading or ended", i = !1) : i && (n("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = B(r, t))), null === (o = e > 0 ? R(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && H(this)), null !== o && this.emit("data", o), o
                }, S.prototype._read = function(e) {
                    k(this, new v("_read()"))
                }, S.prototype.pipe = function(e, t) {
                    var r = this,
                        o = this._readableState;
                    switch (o.pipesCount) {
                        case 0:
                            o.pipes = e;
                            break;
                        case 1:
                            o.pipes = [o.pipes, e];
                            break;
                        default:
                            o.pipes.push(e)
                    }
                    o.pipesCount += 1, n("pipe count=%d opts=%j", o.pipesCount, t);
                    var a = t && !1 === t.end || e === process.stdout || e === process.stderr ? p : s;

                    function s() {
                        n("onend"), e.end()
                    }
                    o.endEmitted ? process.nextTick(a) : r.once("end", a), e.on("unpipe", (function t(i, a) {
                        n("onunpipe"), i === r && a && !1 === a.hasUnpiped && (a.hasUnpiped = !0, n("cleanup"), e.removeListener("close", d), e.removeListener("finish", h), e.removeListener("drain", u), e.removeListener("error", f), e.removeListener("unpipe", t), r.removeListener("end", s), r.removeListener("end", p), r.removeListener("data", l), c = !0, !o.awaitDrain || e._writableState && !e._writableState.needDrain || u())
                    }));
                    var u = function(e) {
                        return function() {
                            var t = e._readableState;
                            n("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && i(e, "data") && (t.flowing = !0, N(e))
                        }
                    }(r);
                    e.on("drain", u);
                    var c = !1;

                    function l(t) {
                        n("ondata");
                        var i = e.write(t);
                        n("dest.write", i), !1 === i && ((1 === o.pipesCount && o.pipes === e || o.pipesCount > 1 && -1 !== M(o.pipes, e)) && !c && (n("false write response, pause", o.awaitDrain), o.awaitDrain++), r.pause())
                    }

                    function f(t) {
                        n("onerror", t), p(), e.removeListener("error", f), 0 === i(e, "error") && k(e, t)
                    }

                    function d() {
                        e.removeListener("finish", h), p()
                    }

                    function h() {
                        n("onfinish"), e.removeListener("close", d), p()
                    }

                    function p() {
                        n("unpipe"), r.unpipe(e)
                    }
                    return r.on("data", l),
                        function(e, t, r) {
                            if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                            e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                        }(e, "error", f), e.once("close", d), e.once("finish", h), e.emit("pipe", r), o.flowing || (n("pipe resume"), r.resume()), e
                }, S.prototype.unpipe = function(e) {
                    var t = this._readableState,
                        r = {
                            hasUnpiped: !1
                        };
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount) return e && e !== t.pipes || (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r)), this;
                    if (!e) {
                        var o = t.pipes,
                            n = t.pipesCount;
                        t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                        for (var i = 0; i < n; i++) o[i].emit("unpipe", this, {
                            hasUnpiped: !1
                        });
                        return this
                    }
                    var a = M(t.pipes, e);
                    return -1 === a || (t.pipes.splice(a, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r)), this
                }, S.prototype.on = function(e, t) {
                    var r = a.prototype.on.call(this, e, t),
                        o = this._readableState;
                    return "data" === e ? (o.readableListening = this.listenerCount("readable") > 0, !1 !== o.flowing && this.resume()) : "readable" === e && (o.endEmitted || o.readableListening || (o.readableListening = o.needReadable = !0, o.flowing = !1, o.emittedReadable = !1, n("on readable", o.length, o.reading), o.length ? A(this) : o.reading || process.nextTick(U, this))), r
                }, S.prototype.addListener = S.prototype.on, S.prototype.removeListener = function(e, t) {
                    var r = a.prototype.removeListener.call(this, e, t);
                    return "readable" === e && process.nextTick(j, this), r
                }, S.prototype.removeAllListeners = function(e) {
                    var t = a.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || process.nextTick(j, this), t
                }, S.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (n("resume"), e.flowing = !e.readableListening, function(e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0, process.nextTick(L, e, t))
                    }(this, e)), e.paused = !1, this
                }, S.prototype.pause = function() {
                    return n("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (n("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
                }, S.prototype.wrap = function(e) {
                    var t = this,
                        r = this._readableState,
                        o = !1;
                    for (var i in e.on("end", (function() {
                            if (n("wrapped end"), r.decoder && !r.ended) {
                                var e = r.decoder.end();
                                e && e.length && t.push(e)
                            }
                            t.push(null)
                        })), e.on("data", (function(i) {
                            n("wrapped data"), r.decoder && (i = r.decoder.write(i)), r.objectMode && null == i || (r.objectMode || i && i.length) && (t.push(i) || (o = !0, e.pause()))
                        })), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(i));
                    for (var a = 0; a < E.length; a++) e.on(E[a], this.emit.bind(this, E[a]));
                    return this._read = function(t) {
                        n("wrapped _read", t), o && (o = !1, e.resume())
                    }, this
                }, "function" == typeof Symbol && (S.prototype[Symbol.asyncIterator] = function() {
                    return void 0 === f && (f = r(9035)), f(this)
                }), Object.defineProperty(S.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.highWaterMark
                    }
                }), Object.defineProperty(S.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState && this._readableState.buffer
                    }
                }), Object.defineProperty(S.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.flowing
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }), S._fromList = R, Object.defineProperty(S.prototype, "readableLength", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.length
                    }
                }), "function" == typeof Symbol && (S.from = function(e, t) {
                    return void 0 === d && (d = r(6869)), d(S, e, t)
                })
            },
            4914: (e, t, r) => {
                "use strict";
                e.exports = l;
                var o = r(8704).F,
                    n = o.ERR_METHOD_NOT_IMPLEMENTED,
                    i = o.ERR_MULTIPLE_CALLBACK,
                    a = o.ERR_TRANSFORM_ALREADY_TRANSFORMING,
                    s = o.ERR_TRANSFORM_WITH_LENGTH_0,
                    u = r(5606);

                function c(e, t) {
                    var r = this._transformState;
                    r.transforming = !1;
                    var o = r.writecb;
                    if (null === o) return this.emit("error", new i);
                    r.writechunk = null, r.writecb = null, null != t && this.push(t), o(e);
                    var n = this._readableState;
                    n.reading = !1, (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
                }

                function l(e) {
                    if (!(this instanceof l)) return new l(e);
                    u.call(this, e), this._transformState = {
                        afterTransform: c.bind(this),
                        needTransform: !1,
                        transforming: !1,
                        writecb: null,
                        writechunk: null,
                        writeencoding: null
                    }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", f)
                }

                function f() {
                    var e = this;
                    "function" != typeof this._flush || this._readableState.destroyed ? d(this, null, null) : this._flush((function(t, r) {
                        d(e, t, r)
                    }))
                }

                function d(e, t, r) {
                    if (t) return e.emit("error", t);
                    if (null != r && e.push(r), e._writableState.length) throw new s;
                    if (e._transformState.transforming) throw new a;
                    return e.push(null)
                }
                r(6192)(l, u), l.prototype.push = function(e, t) {
                    return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
                }, l.prototype._transform = function(e, t, r) {
                    r(new n("_transform()"))
                }, l.prototype._write = function(e, t, r) {
                    var o = this._transformState;
                    if (o.writecb = r, o.writechunk = e, o.writeencoding = t, !o.transforming) {
                        var n = this._readableState;
                        (o.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
                    }
                }, l.prototype._read = function(e) {
                    var t = this._transformState;
                    null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform))
                }, l.prototype._destroy = function(e, t) {
                    u.prototype._destroy.call(this, e, (function(e) {
                        t(e)
                    }))
                }
            },
            6868: (e, t, r) => {
                "use strict";

                function o(e) {
                    var t = this;
                    this.next = null, this.entry = null, this.finish = function() {
                        ! function(e, t) {
                            var r = e.entry;
                            for (e.entry = null; r;) {
                                var o = r.callback;
                                t.pendingcb--, o(undefined), r = r.next
                            }
                            t.corkedRequestsFree.next = e
                        }(t, e)
                    }
                }
                var n;
                e.exports = S, S.WritableState = _;
                var i, a = {
                        deprecate: r(1348)
                    },
                    s = r(9481),
                    u = r(4686).Buffer,
                    c = (void 0 !== r.g ? r.g : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {},
                    l = r(4552),
                    f = r(7963).getHighWaterMark,
                    d = r(8704).F,
                    h = d.ERR_INVALID_ARG_TYPE,
                    p = d.ERR_METHOD_NOT_IMPLEMENTED,
                    b = d.ERR_MULTIPLE_CALLBACK,
                    g = d.ERR_STREAM_CANNOT_PIPE,
                    m = d.ERR_STREAM_DESTROYED,
                    y = d.ERR_STREAM_NULL_VALUES,
                    v = d.ERR_STREAM_WRITE_AFTER_END,
                    w = d.ERR_UNKNOWN_ENCODING,
                    k = l.errorOrDestroy;

                function E() {}

                function _(e, t, i) {
                    n = n || r(5606), e = e || {}, "boolean" != typeof i && (i = t instanceof n), this.objectMode = !!e.objectMode, i && (this.objectMode = this.objectMode || !!e.writableObjectMode), this.highWaterMark = f(this, e, "writableHighWaterMark", i), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var a = !1 === e.decodeStrings;
                    this.decodeStrings = !a, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                        ! function(e, t) {
                            var r = e._writableState,
                                o = r.sync,
                                n = r.writecb;
                            if ("function" != typeof n) throw new b;
                            if (function(e) {
                                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                                }(r), t) ! function(e, t, r, o, n) {
                                --t.pendingcb, r ? (process.nextTick(n, o), process.nextTick(O, e, t), e._writableState.errorEmitted = !0, k(e, o)) : (n(o), e._writableState.errorEmitted = !0, k(e, o), O(e, t))
                            }(e, r, o, t, n);
                            else {
                                var i = B(r) || e.destroyed;
                                i || r.corked || r.bufferProcessing || !r.bufferedRequest || I(e, r), o ? process.nextTick(x, e, r, i, n) : x(e, r, i, n)
                            }
                        }(t, e)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== e.emitClose, this.autoDestroy = !!e.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this)
                }

                function S(e) {
                    var t = this instanceof(n = n || r(5606));
                    if (!t && !i.call(S, this)) return new S(e);
                    this._writableState = new _(e, this, t), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), s.call(this)
                }

                function T(e, t, r, o, n, i, a) {
                    t.writelen = o, t.writecb = a, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(n, t.onwrite) : e._write(n, i, t.onwrite), t.sync = !1
                }

                function x(e, t, r, o) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                    }(e, t), t.pendingcb--, o(), O(e, t)
                }

                function I(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount,
                            i = new Array(n),
                            a = t.corkedRequestsFree;
                        a.entry = r;
                        for (var s = 0, u = !0; r;) i[s] = r, r.isBuf || (u = !1), r = r.next, s += 1;
                        i.allBuffers = u, T(e, t, !0, t.length, i, "", a.finish), t.pendingcb++, t.lastBufferedRequest = null, a.next ? (t.corkedRequestsFree = a.next, a.next = null) : t.corkedRequestsFree = new o(t), t.bufferedRequestCount = 0
                    } else {
                        for (; r;) {
                            var c = r.chunk,
                                l = r.encoding,
                                f = r.callback;
                            if (T(e, t, !1, t.objectMode ? 1 : c.length, c, l, f), r = r.next, t.bufferedRequestCount--, t.writing) break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r, t.bufferProcessing = !1
                }

                function B(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }

                function A(e, t) {
                    e._final((function(r) {
                        t.pendingcb--, r && k(e, r), t.prefinished = !0, e.emit("prefinish"), O(e, t)
                    }))
                }

                function O(e, t) {
                    var r = B(t);
                    if (r && (function(e, t) {
                            t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, process.nextTick(A, e, t)))
                        }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
                        var o = e._readableState;
                        (!o || o.autoDestroy && o.endEmitted) && e.destroy()
                    }
                    return r
                }
                r(6192)(S, s), _.prototype.getBuffer = function() {
                        for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                        return t
                    },
                    function() {
                        try {
                            Object.defineProperty(_.prototype, "buffer", {
                                get: a.deprecate((function() {
                                    return this.getBuffer()
                                }), "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                            })
                        } catch (e) {}
                    }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (i = Function.prototype[Symbol.hasInstance], Object.defineProperty(S, Symbol.hasInstance, {
                        value: function(e) {
                            return !!i.call(this, e) || this === S && e && e._writableState instanceof _
                        }
                    })) : i = function(e) {
                        return e instanceof this
                    }, S.prototype.pipe = function() {
                        k(this, new g)
                    }, S.prototype.write = function(e, t, r) {
                        var o, n = this._writableState,
                            i = !1,
                            a = !n.objectMode && (o = e, u.isBuffer(o) || o instanceof c);
                        return a && !u.isBuffer(e) && (e = function(e) {
                            return u.from(e)
                        }(e)), "function" == typeof t && (r = t, t = null), a ? t = "buffer" : t || (t = n.defaultEncoding), "function" != typeof r && (r = E), n.ending ? function(e, t) {
                            var r = new v;
                            k(e, r), process.nextTick(t, r)
                        }(this, r) : (a || function(e, t, r, o) {
                            var n;
                            return null === r ? n = new y : "string" == typeof r || t.objectMode || (n = new h("chunk", ["string", "Buffer"], r)), !n || (k(e, n), process.nextTick(o, n), !1)
                        }(this, n, e, r)) && (n.pendingcb++, i = function(e, t, r, o, n, i) {
                            if (!r) {
                                var a = function(e, t, r) {
                                    return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r)), t
                                }(t, o, n);
                                o !== a && (r = !0, n = "buffer", o = a)
                            }
                            var s = t.objectMode ? 1 : o.length;
                            t.length += s;
                            var c = t.length < t.highWaterMark;
                            if (c || (t.needDrain = !0), t.writing || t.corked) {
                                var l = t.lastBufferedRequest;
                                t.lastBufferedRequest = {
                                    chunk: o,
                                    encoding: n,
                                    isBuf: r,
                                    callback: i,
                                    next: null
                                }, l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                            } else T(e, t, !1, s, o, n, i);
                            return c
                        }(this, n, a, e, t, r)), i
                    }, S.prototype.cork = function() {
                        this._writableState.corked++
                    }, S.prototype.uncork = function() {
                        var e = this._writableState;
                        e.corked && (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || I(this, e))
                    }, S.prototype.setDefaultEncoding = function(e) {
                        if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new w(e);
                        return this._writableState.defaultEncoding = e, this
                    }, Object.defineProperty(S.prototype, "writableBuffer", {
                        enumerable: !1,
                        get: function() {
                            return this._writableState && this._writableState.getBuffer()
                        }
                    }), Object.defineProperty(S.prototype, "writableHighWaterMark", {
                        enumerable: !1,
                        get: function() {
                            return this._writableState.highWaterMark
                        }
                    }), S.prototype._write = function(e, t, r) {
                        r(new p("_write()"))
                    }, S.prototype._writev = null, S.prototype.end = function(e, t, r) {
                        var o = this._writableState;
                        return "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null != e && this.write(e, t), o.corked && (o.corked = 1, this.uncork()), o.ending || function(e, t, r) {
                            t.ending = !0, O(e, t), r && (t.finished ? process.nextTick(r) : e.once("finish", r)), t.ended = !0, e.writable = !1
                        }(this, o, r), this
                    }, Object.defineProperty(S.prototype, "writableLength", {
                        enumerable: !1,
                        get: function() {
                            return this._writableState.length
                        }
                    }), Object.defineProperty(S.prototype, "destroyed", {
                        enumerable: !1,
                        get: function() {
                            return void 0 !== this._writableState && this._writableState.destroyed
                        },
                        set: function(e) {
                            this._writableState && (this._writableState.destroyed = e)
                        }
                    }), S.prototype.destroy = l.destroy, S.prototype._undestroy = l.undestroy, S.prototype._destroy = function(e, t) {
                        t(e)
                    }
            },
            9035: (e, t, r) => {
                "use strict";
                var o;

                function n(e, t, r) {
                    return (t = function(e) {
                        var t = function(e) {
                            if ("object" != typeof e || null === e) return e;
                            var t = e[Symbol.toPrimitive];
                            if (void 0 !== t) {
                                var r = t.call(e, "string");
                                if ("object" != typeof r) return r;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == typeof t ? t : String(t)
                    }(t)) in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r, e
                }
                var i = r(2862),
                    a = Symbol("lastResolve"),
                    s = Symbol("lastReject"),
                    u = Symbol("error"),
                    c = Symbol("ended"),
                    l = Symbol("lastPromise"),
                    f = Symbol("handlePromise"),
                    d = Symbol("stream");

                function h(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }

                function p(e) {
                    var t = e[a];
                    if (null !== t) {
                        var r = e[d].read();
                        null !== r && (e[l] = null, e[a] = null, e[s] = null, t(h(r, !1)))
                    }
                }

                function b(e) {
                    process.nextTick(p, e)
                }
                var g = Object.getPrototypeOf((function() {})),
                    m = Object.setPrototypeOf((n(o = {
                        get stream() {
                            return this[d]
                        },
                        next: function() {
                            var e = this,
                                t = this[u];
                            if (null !== t) return Promise.reject(t);
                            if (this[c]) return Promise.resolve(h(void 0, !0));
                            if (this[d].destroyed) return new Promise((function(t, r) {
                                process.nextTick((function() {
                                    e[u] ? r(e[u]) : t(h(void 0, !0))
                                }))
                            }));
                            var r, o = this[l];
                            if (o) r = new Promise(function(e, t) {
                                return function(r, o) {
                                    e.then((function() {
                                        t[c] ? r(h(void 0, !0)) : t[f](r, o)
                                    }), o)
                                }
                            }(o, this));
                            else {
                                var n = this[d].read();
                                if (null !== n) return Promise.resolve(h(n, !1));
                                r = new Promise(this[f])
                            }
                            return this[l] = r, r
                        }
                    }, Symbol.asyncIterator, (function() {
                        return this
                    })), n(o, "return", (function() {
                        var e = this;
                        return new Promise((function(t, r) {
                            e[d].destroy(null, (function(e) {
                                e ? r(e) : t(h(void 0, !0))
                            }))
                        }))
                    })), o), g);
                e.exports = function(e) {
                    var t, r = Object.create(m, (n(t = {}, d, {
                        value: e,
                        writable: !0
                    }), n(t, a, {
                        value: null,
                        writable: !0
                    }), n(t, s, {
                        value: null,
                        writable: !0
                    }), n(t, u, {
                        value: null,
                        writable: !0
                    }), n(t, c, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }), n(t, f, {
                        value: function(e, t) {
                            var o = r[d].read();
                            o ? (r[l] = null, r[a] = null, r[s] = null, e(h(o, !1))) : (r[a] = e, r[s] = t)
                        },
                        writable: !0
                    }), t));
                    return r[l] = null, i(e, (function(e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = r[s];
                            return null !== t && (r[l] = null, r[a] = null, r[s] = null, t(e)), void(r[u] = e)
                        }
                        var o = r[a];
                        null !== o && (r[l] = null, r[a] = null, r[s] = null, o(h(void 0, !0))), r[c] = !0
                    })), e.on("readable", b.bind(null, r)), r
                }
            },
            9865: (e, t, r) => {
                "use strict";

                function o(e, t) {
                    var r = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), r.push.apply(r, o)
                    }
                    return r
                }

                function n(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? o(Object(r), !0).forEach((function(t) {
                            i(e, t, r[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : o(Object(r)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                        }))
                    }
                    return e
                }

                function i(e, t, r) {
                    return (t = s(t)) in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r, e
                }

                function a(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var o = t[r];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, s(o.key), o)
                    }
                }

                function s(e) {
                    var t = function(e) {
                        if ("object" != typeof e || null === e) return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var r = t.call(e, "string");
                            if ("object" != typeof r) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == typeof t ? t : String(t)
                }
                var u = r(4686).Buffer,
                    c = r(1220).inspect,
                    l = c && c.custom || "inspect";
                e.exports = function() {
                    function e() {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), this.head = null, this.tail = null, this.length = 0
                    }
                    var t, r;
                    return t = e, (r = [{
                        key: "push",
                        value: function(e) {
                            var t = {
                                data: e,
                                next: null
                            };
                            this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
                        }
                    }, {
                        key: "unshift",
                        value: function(e) {
                            var t = {
                                data: e,
                                next: this.head
                            };
                            0 === this.length && (this.tail = t), this.head = t, ++this.length
                        }
                    }, {
                        key: "shift",
                        value: function() {
                            if (0 !== this.length) {
                                var e = this.head.data;
                                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
                            }
                        }
                    }, {
                        key: "clear",
                        value: function() {
                            this.head = this.tail = null, this.length = 0
                        }
                    }, {
                        key: "join",
                        value: function(e) {
                            if (0 === this.length) return "";
                            for (var t = this.head, r = "" + t.data; t = t.next;) r += e + t.data;
                            return r
                        }
                    }, {
                        key: "concat",
                        value: function(e) {
                            if (0 === this.length) return u.alloc(0);
                            for (var t, r, o, n = u.allocUnsafe(e >>> 0), i = this.head, a = 0; i;) t = i.data, r = n, o = a, u.prototype.copy.call(t, r, o), a += i.data.length, i = i.next;
                            return n
                        }
                    }, {
                        key: "consume",
                        value: function(e, t) {
                            var r;
                            return e < this.head.data.length ? (r = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), r
                        }
                    }, {
                        key: "first",
                        value: function() {
                            return this.head.data
                        }
                    }, {
                        key: "_getString",
                        value: function(e) {
                            var t = this.head,
                                r = 1,
                                o = t.data;
                            for (e -= o.length; t = t.next;) {
                                var n = t.data,
                                    i = e > n.length ? n.length : e;
                                if (i === n.length ? o += n : o += n.slice(0, e), 0 == (e -= i)) {
                                    i === n.length ? (++r, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = n.slice(i));
                                    break
                                }++r
                            }
                            return this.length -= r, o
                        }
                    }, {
                        key: "_getBuffer",
                        value: function(e) {
                            var t = u.allocUnsafe(e),
                                r = this.head,
                                o = 1;
                            for (r.data.copy(t), e -= r.data.length; r = r.next;) {
                                var n = r.data,
                                    i = e > n.length ? n.length : e;
                                if (n.copy(t, t.length - e, 0, i), 0 == (e -= i)) {
                                    i === n.length ? (++o, r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r, r.data = n.slice(i));
                                    break
                                }++o
                            }
                            return this.length -= o, t
                        }
                    }, {
                        key: l,
                        value: function(e, t) {
                            return c(this, n(n({}, t), {}, {
                                depth: 0,
                                customInspect: !1
                            }))
                        }
                    }]) && a(t.prototype, r), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), e
                }()
            },
            4552: e => {
                "use strict";

                function t(e, t) {
                    o(e, t), r(e)
                }

                function r(e) {
                    e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
                }

                function o(e, t) {
                    e.emit("error", t)
                }
                e.exports = {
                    destroy: function(e, n) {
                        var i = this,
                            a = this._readableState && this._readableState.destroyed,
                            s = this._writableState && this._writableState.destroyed;
                        return a || s ? (n ? n(e) : e && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process.nextTick(o, this, e)) : process.nextTick(o, this, e)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, (function(e) {
                            !n && e ? i._writableState ? i._writableState.errorEmitted ? process.nextTick(r, i) : (i._writableState.errorEmitted = !0, process.nextTick(t, i, e)) : process.nextTick(t, i, e) : n ? (process.nextTick(r, i), n(e)) : process.nextTick(r, i)
                        })), this)
                    },
                    undestroy: function() {
                        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
                    },
                    errorOrDestroy: function(e, t) {
                        var r = e._readableState,
                            o = e._writableState;
                        r && r.autoDestroy || o && o.autoDestroy ? e.destroy(t) : e.emit("error", t)
                    }
                }
            },
            2862: (e, t, r) => {
                "use strict";
                var o = r(8704).F.ERR_STREAM_PREMATURE_CLOSE;

                function n() {}
                e.exports = function e(t, r, i) {
                    if ("function" == typeof r) return e(t, null, r);
                    r || (r = {}), i = function(e) {
                        var t = !1;
                        return function() {
                            if (!t) {
                                t = !0;
                                for (var r = arguments.length, o = new Array(r), n = 0; n < r; n++) o[n] = arguments[n];
                                e.apply(this, o)
                            }
                        }
                    }(i || n);
                    var a = r.readable || !1 !== r.readable && t.readable,
                        s = r.writable || !1 !== r.writable && t.writable,
                        u = function() {
                            t.writable || l()
                        },
                        c = t._writableState && t._writableState.finished,
                        l = function() {
                            s = !1, c = !0, a || i.call(t)
                        },
                        f = t._readableState && t._readableState.endEmitted,
                        d = function() {
                            a = !1, f = !0, s || i.call(t)
                        },
                        h = function(e) {
                            i.call(t, e)
                        },
                        p = function() {
                            var e;
                            return a && !f ? (t._readableState && t._readableState.ended || (e = new o), i.call(t, e)) : s && !c ? (t._writableState && t._writableState.ended || (e = new o), i.call(t, e)) : void 0
                        },
                        b = function() {
                            t.req.on("finish", l)
                        };
                    return function(e) {
                            return e.setHeader && "function" == typeof e.abort
                        }(t) ? (t.on("complete", l), t.on("abort", p), t.req ? b() : t.on("request", b)) : s && !t._writableState && (t.on("end", u), t.on("close", u)), t.on("end", d), t.on("finish", l), !1 !== r.error && t.on("error", h), t.on("close", p),
                        function() {
                            t.removeListener("complete", l), t.removeListener("abort", p), t.removeListener("request", b), t.req && t.req.removeListener("finish", l), t.removeListener("end", u), t.removeListener("close", u), t.removeListener("finish", l), t.removeListener("end", d), t.removeListener("error", h), t.removeListener("close", p)
                        }
                }
            },
            6869: e => {
                e.exports = function() {
                    throw new Error("Readable.from is not available in the browser")
                }
            },
            110: (e, t, r) => {
                "use strict";
                var o, n = r(8704).F,
                    i = n.ERR_MISSING_ARGS,
                    a = n.ERR_STREAM_DESTROYED;

                function s(e) {
                    if (e) throw e
                }

                function u(e) {
                    e()
                }

                function c(e, t) {
                    return e.pipe(t)
                }
                e.exports = function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    var l, f = function(e) {
                        return e.length ? "function" != typeof e[e.length - 1] ? s : e.pop() : s
                    }(t);
                    if (Array.isArray(t[0]) && (t = t[0]), t.length < 2) throw new i("streams");
                    var d = t.map((function(e, n) {
                        var i = n < t.length - 1;
                        return function(e, t, n, i) {
                            i = function(e) {
                                var t = !1;
                                return function() {
                                    t || (t = !0, e.apply(void 0, arguments))
                                }
                            }(i);
                            var s = !1;
                            e.on("close", (function() {
                                s = !0
                            })), void 0 === o && (o = r(2862)), o(e, {
                                readable: t,
                                writable: n
                            }, (function(e) {
                                if (e) return i(e);
                                s = !0, i()
                            }));
                            var u = !1;
                            return function(t) {
                                if (!s && !u) return u = !0,
                                    function(e) {
                                        return e.setHeader && "function" == typeof e.abort
                                    }(e) ? e.abort() : "function" == typeof e.destroy ? e.destroy() : void i(t || new a("pipe"))
                            }
                        }(e, i, n > 0, (function(e) {
                            l || (l = e), e && d.forEach(u), i || (d.forEach(u), f(l))
                        }))
                    }));
                    return t.reduce(c)
                }
            },
            7963: (e, t, r) => {
                "use strict";
                var o = r(8704).F.ERR_INVALID_OPT_VALUE;
                e.exports = {
                    getHighWaterMark: function(e, t, r, n) {
                        var i = function(e, t, r) {
                            return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null
                        }(t, n, r);
                        if (null != i) {
                            if (!isFinite(i) || Math.floor(i) !== i || i < 0) throw new o(n ? r : "highWaterMark", i);
                            return Math.floor(i)
                        }
                        return e.objectMode ? 16 : 16384
                    }
                }
            },
            9481: (e, t, r) => {
                e.exports = r(9784).EventEmitter
            },
            5727: (e, t, r) => {
                (t = e.exports = r(4324)).Stream = t, t.Readable = t, t.Writable = r(6868), t.Duplex = r(5606), t.Transform = r(4914), t.PassThrough = r(9648), t.finished = r(2862), t.pipeline = r(110)
            },
            1609: (e, t, r) => {
                "use strict";
                var o = r(4686).Buffer,
                    n = r(6192),
                    i = r(859),
                    a = new Array(16),
                    s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
                    u = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
                    c = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
                    l = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
                    f = [0, 1518500249, 1859775393, 2400959708, 2840853838],
                    d = [1352829926, 1548603684, 1836072691, 2053994217, 0];

                function h() {
                    i.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
                }

                function p(e, t) {
                    return e << t | e >>> 32 - t
                }

                function b(e, t, r, o, n, i, a, s) {
                    return p(e + (t ^ r ^ o) + i + a | 0, s) + n | 0
                }

                function g(e, t, r, o, n, i, a, s) {
                    return p(e + (t & r | ~t & o) + i + a | 0, s) + n | 0
                }

                function m(e, t, r, o, n, i, a, s) {
                    return p(e + ((t | ~r) ^ o) + i + a | 0, s) + n | 0
                }

                function y(e, t, r, o, n, i, a, s) {
                    return p(e + (t & o | r & ~o) + i + a | 0, s) + n | 0
                }

                function v(e, t, r, o, n, i, a, s) {
                    return p(e + (t ^ (r | ~o)) + i + a | 0, s) + n | 0
                }
                n(h, i), h.prototype._update = function() {
                    for (var e = a, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
                    for (var r = 0 | this._a, o = 0 | this._b, n = 0 | this._c, i = 0 | this._d, h = 0 | this._e, w = 0 | this._a, k = 0 | this._b, E = 0 | this._c, _ = 0 | this._d, S = 0 | this._e, T = 0; T < 80; T += 1) {
                        var x, I;
                        T < 16 ? (x = b(r, o, n, i, h, e[s[T]], f[0], c[T]), I = v(w, k, E, _, S, e[u[T]], d[0], l[T])) : T < 32 ? (x = g(r, o, n, i, h, e[s[T]], f[1], c[T]), I = y(w, k, E, _, S, e[u[T]], d[1], l[T])) : T < 48 ? (x = m(r, o, n, i, h, e[s[T]], f[2], c[T]), I = m(w, k, E, _, S, e[u[T]], d[2], l[T])) : T < 64 ? (x = y(r, o, n, i, h, e[s[T]], f[3], c[T]), I = g(w, k, E, _, S, e[u[T]], d[3], l[T])) : (x = v(r, o, n, i, h, e[s[T]], f[4], c[T]), I = b(w, k, E, _, S, e[u[T]], d[4], l[T])), r = h, h = i, i = p(n, 10), n = o, o = x, w = S, S = _, _ = p(E, 10), E = k, k = I
                    }
                    var B = this._b + n + _ | 0;
                    this._b = this._c + i + S | 0, this._c = this._d + h + w | 0, this._d = this._e + r + k | 0, this._e = this._a + o + E | 0, this._a = B
                }, h.prototype._digest = function() {
                    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
                    var e = o.alloc ? o.alloc(20) : new o(20);
                    return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e.writeInt32LE(this._e, 16), e
                }, e.exports = h
            },
            6671: (e, t, r) => {
                var o = r(4686),
                    n = o.Buffer;

                function i(e, t) {
                    for (var r in e) t[r] = e[r]
                }

                function a(e, t, r) {
                    return n(e, t, r)
                }
                n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = o : (i(o, t), t.Buffer = a), a.prototype = Object.create(n.prototype), i(n, a), a.from = function(e, t, r) {
                    if ("number" == typeof e) throw new TypeError("Argument must not be a number");
                    return n(e, t, r)
                }, a.alloc = function(e, t, r) {
                    if ("number" != typeof e) throw new TypeError("Argument must be a number");
                    var o = n(e);
                    return void 0 !== t ? "string" == typeof r ? o.fill(t, r) : o.fill(t) : o.fill(0), o
                }, a.allocUnsafe = function(e) {
                    if ("number" != typeof e) throw new TypeError("Argument must be a number");
                    return n(e)
                }, a.allocUnsafeSlow = function(e) {
                    if ("number" != typeof e) throw new TypeError("Argument must be a number");
                    return o.SlowBuffer(e)
                }
            },
            9113: (e, t, r) => {
                var o = r(6671).Buffer;

                function n(e, t) {
                    this._block = o.alloc(e), this._finalSize = t, this._blockSize = e, this._len = 0
                }
                n.prototype.update = function(e, t) {
                    "string" == typeof e && (t = t || "utf8", e = o.from(e, t));
                    for (var r = this._block, n = this._blockSize, i = e.length, a = this._len, s = 0; s < i;) {
                        for (var u = a % n, c = Math.min(i - s, n - u), l = 0; l < c; l++) r[u + l] = e[s + l];
                        s += c, (a += c) % n == 0 && this._update(r)
                    }
                    return this._len += i, this
                }, n.prototype.digest = function(e) {
                    var t = this._len % this._blockSize;
                    this._block[t] = 128, this._block.fill(0, t + 1), t >= this._finalSize && (this._update(this._block), this._block.fill(0));
                    var r = 8 * this._len;
                    if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
                    else {
                        var o = (4294967295 & r) >>> 0,
                            n = (r - o) / 4294967296;
                        this._block.writeUInt32BE(n, this._blockSize - 8), this._block.writeUInt32BE(o, this._blockSize - 4)
                    }
                    this._update(this._block);
                    var i = this._hash();
                    return e ? i.toString(e) : i
                }, n.prototype._update = function() {
                    throw new Error("_update must be implemented by subclass")
                }, e.exports = n
            },
            9273: (e, t, r) => {
                var o = e.exports = function(e) {
                    e = e.toLowerCase();
                    var t = o[e];
                    if (!t) throw new Error(e + " is not supported (we accept pull requests)");
                    return new t
                };
                o.sha = r(7519), o.sha1 = r(2496), o.sha224 = r(9031), o.sha256 = r(6630), o.sha384 = r(7718), o.sha512 = r(1863)
            },
            7519: (e, t, r) => {
                var o = r(6192),
                    n = r(9113),
                    i = r(6671).Buffer,
                    a = [1518500249, 1859775393, -1894007588, -899497514],
                    s = new Array(80);

                function u() {
                    this.init(), this._w = s, n.call(this, 64, 56)
                }

                function c(e) {
                    return e << 30 | e >>> 2
                }

                function l(e, t, r, o) {
                    return 0 === e ? t & r | ~t & o : 2 === e ? t & r | t & o | r & o : t ^ r ^ o
                }
                o(u, n), u.prototype.init = function() {
                    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
                }, u.prototype._update = function(e) {
                    for (var t, r = this._w, o = 0 | this._a, n = 0 | this._b, i = 0 | this._c, s = 0 | this._d, u = 0 | this._e, f = 0; f < 16; ++f) r[f] = e.readInt32BE(4 * f);
                    for (; f < 80; ++f) r[f] = r[f - 3] ^ r[f - 8] ^ r[f - 14] ^ r[f - 16];
                    for (var d = 0; d < 80; ++d) {
                        var h = ~~(d / 20),
                            p = 0 | ((t = o) << 5 | t >>> 27) + l(h, n, i, s) + u + r[d] + a[h];
                        u = s, s = i, i = c(n), n = o, o = p
                    }
                    this._a = o + this._a | 0, this._b = n + this._b | 0, this._c = i + this._c | 0, this._d = s + this._d | 0, this._e = u + this._e | 0
                }, u.prototype._hash = function() {
                    var e = i.allocUnsafe(20);
                    return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
                }, e.exports = u
            },
            2496: (e, t, r) => {
                var o = r(6192),
                    n = r(9113),
                    i = r(6671).Buffer,
                    a = [1518500249, 1859775393, -1894007588, -899497514],
                    s = new Array(80);

                function u() {
                    this.init(), this._w = s, n.call(this, 64, 56)
                }

                function c(e) {
                    return e << 5 | e >>> 27
                }

                function l(e) {
                    return e << 30 | e >>> 2
                }

                function f(e, t, r, o) {
                    return 0 === e ? t & r | ~t & o : 2 === e ? t & r | t & o | r & o : t ^ r ^ o
                }
                o(u, n), u.prototype.init = function() {
                    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
                }, u.prototype._update = function(e) {
                    for (var t, r = this._w, o = 0 | this._a, n = 0 | this._b, i = 0 | this._c, s = 0 | this._d, u = 0 | this._e, d = 0; d < 16; ++d) r[d] = e.readInt32BE(4 * d);
                    for (; d < 80; ++d) r[d] = (t = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16]) << 1 | t >>> 31;
                    for (var h = 0; h < 80; ++h) {
                        var p = ~~(h / 20),
                            b = c(o) + f(p, n, i, s) + u + r[h] + a[p] | 0;
                        u = s, s = i, i = l(n), n = o, o = b
                    }
                    this._a = o + this._a | 0, this._b = n + this._b | 0, this._c = i + this._c | 0, this._d = s + this._d | 0, this._e = u + this._e | 0
                }, u.prototype._hash = function() {
                    var e = i.allocUnsafe(20);
                    return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
                }, e.exports = u
            },
            9031: (e, t, r) => {
                var o = r(6192),
                    n = r(6630),
                    i = r(9113),
                    a = r(6671).Buffer,
                    s = new Array(64);

                function u() {
                    this.init(), this._w = s, i.call(this, 64, 56)
                }
                o(u, n), u.prototype.init = function() {
                    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
                }, u.prototype._hash = function() {
                    var e = a.allocUnsafe(28);
                    return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e
                }, e.exports = u
            },
            6630: (e, t, r) => {
                var o = r(6192),
                    n = r(9113),
                    i = r(6671).Buffer,
                    a = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                    s = new Array(64);

                function u() {
                    this.init(), this._w = s, n.call(this, 64, 56)
                }

                function c(e, t, r) {
                    return r ^ e & (t ^ r)
                }

                function l(e, t, r) {
                    return e & t | r & (e | t)
                }

                function f(e) {
                    return (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10)
                }

                function d(e) {
                    return (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)
                }

                function h(e) {
                    return (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3
                }
                o(u, n), u.prototype.init = function() {
                    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
                }, u.prototype._update = function(e) {
                    for (var t, r = this._w, o = 0 | this._a, n = 0 | this._b, i = 0 | this._c, s = 0 | this._d, u = 0 | this._e, p = 0 | this._f, b = 0 | this._g, g = 0 | this._h, m = 0; m < 16; ++m) r[m] = e.readInt32BE(4 * m);
                    for (; m < 64; ++m) r[m] = 0 | (((t = r[m - 2]) >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) + r[m - 7] + h(r[m - 15]) + r[m - 16];
                    for (var y = 0; y < 64; ++y) {
                        var v = g + d(u) + c(u, p, b) + a[y] + r[y] | 0,
                            w = f(o) + l(o, n, i) | 0;
                        g = b, b = p, p = u, u = s + v | 0, s = i, i = n, n = o, o = v + w | 0
                    }
                    this._a = o + this._a | 0, this._b = n + this._b | 0, this._c = i + this._c | 0, this._d = s + this._d | 0, this._e = u + this._e | 0, this._f = p + this._f | 0, this._g = b + this._g | 0, this._h = g + this._h | 0
                }, u.prototype._hash = function() {
                    var e = i.allocUnsafe(32);
                    return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e.writeInt32BE(this._h, 28), e
                }, e.exports = u
            },
            7718: (e, t, r) => {
                var o = r(6192),
                    n = r(1863),
                    i = r(9113),
                    a = r(6671).Buffer,
                    s = new Array(160);

                function u() {
                    this.init(), this._w = s, i.call(this, 128, 112)
                }
                o(u, n), u.prototype.init = function() {
                    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
                }, u.prototype._hash = function() {
                    var e = a.allocUnsafe(48);

                    function t(t, r, o) {
                        e.writeInt32BE(t, o), e.writeInt32BE(r, o + 4)
                    }
                    return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), e
                }, e.exports = u
            },
            1863: (e, t, r) => {
                var o = r(6192),
                    n = r(9113),
                    i = r(6671).Buffer,
                    a = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
                    s = new Array(160);

                function u() {
                    this.init(), this._w = s, n.call(this, 128, 112)
                }

                function c(e, t, r) {
                    return r ^ e & (t ^ r)
                }

                function l(e, t, r) {
                    return e & t | r & (e | t)
                }

                function f(e, t) {
                    return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25)
                }

                function d(e, t) {
                    return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23)
                }

                function h(e, t) {
                    return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ e >>> 7
                }

                function p(e, t) {
                    return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ (e >>> 7 | t << 25)
                }

                function b(e, t) {
                    return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ e >>> 6
                }

                function g(e, t) {
                    return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ (e >>> 6 | t << 26)
                }

                function m(e, t) {
                    return e >>> 0 < t >>> 0 ? 1 : 0
                }
                o(u, n), u.prototype.init = function() {
                    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
                }, u.prototype._update = function(e) {
                    for (var t = this._w, r = 0 | this._ah, o = 0 | this._bh, n = 0 | this._ch, i = 0 | this._dh, s = 0 | this._eh, u = 0 | this._fh, y = 0 | this._gh, v = 0 | this._hh, w = 0 | this._al, k = 0 | this._bl, E = 0 | this._cl, _ = 0 | this._dl, S = 0 | this._el, T = 0 | this._fl, x = 0 | this._gl, I = 0 | this._hl, B = 0; B < 32; B += 2) t[B] = e.readInt32BE(4 * B), t[B + 1] = e.readInt32BE(4 * B + 4);
                    for (; B < 160; B += 2) {
                        var A = t[B - 30],
                            O = t[B - 30 + 1],
                            P = h(A, O),
                            z = p(O, A),
                            j = b(A = t[B - 4], O = t[B - 4 + 1]),
                            U = g(O, A),
                            L = t[B - 14],
                            N = t[B - 14 + 1],
                            R = t[B - 32],
                            H = t[B - 32 + 1],
                            C = z + N | 0,
                            M = P + L + m(C, z) | 0;
                        M = (M = M + j + m(C = C + U | 0, U) | 0) + R + m(C = C + H | 0, H) | 0, t[B] = M, t[B + 1] = C
                    }
                    for (var D = 0; D < 160; D += 2) {
                        M = t[D], C = t[D + 1];
                        var q = l(r, o, n),
                            F = l(w, k, E),
                            K = f(r, w),
                            V = f(w, r),
                            W = d(s, S),
                            G = d(S, s),
                            X = a[D],
                            $ = a[D + 1],
                            Y = c(s, u, y),
                            J = c(S, T, x),
                            Z = I + G | 0,
                            Q = v + W + m(Z, I) | 0;
                        Q = (Q = (Q = Q + Y + m(Z = Z + J | 0, J) | 0) + X + m(Z = Z + $ | 0, $) | 0) + M + m(Z = Z + C | 0, C) | 0;
                        var ee = V + F | 0,
                            te = K + q + m(ee, V) | 0;
                        v = y, I = x, y = u, x = T, u = s, T = S, s = i + Q + m(S = _ + Z | 0, _) | 0, i = n, _ = E, n = o, E = k, o = r, k = w, r = Q + te + m(w = Z + ee | 0, Z) | 0
                    }
                    this._al = this._al + w | 0, this._bl = this._bl + k | 0, this._cl = this._cl + E | 0, this._dl = this._dl + _ | 0, this._el = this._el + S | 0, this._fl = this._fl + T | 0, this._gl = this._gl + x | 0, this._hl = this._hl + I | 0, this._ah = this._ah + r + m(this._al, w) | 0, this._bh = this._bh + o + m(this._bl, k) | 0, this._ch = this._ch + n + m(this._cl, E) | 0, this._dh = this._dh + i + m(this._dl, _) | 0, this._eh = this._eh + s + m(this._el, S) | 0, this._fh = this._fh + u + m(this._fl, T) | 0, this._gh = this._gh + y + m(this._gl, x) | 0, this._hh = this._hh + v + m(this._hl, I) | 0
                }, u.prototype._hash = function() {
                    var e = i.allocUnsafe(64);

                    function t(t, r, o) {
                        e.writeInt32BE(t, o), e.writeInt32BE(r, o + 4)
                    }
                    return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), t(this._gh, this._gl, 48), t(this._hh, this._hl, 56), e
                }, e.exports = u
            },
            896: (e, t, r) => {
                e.exports = n;
                var o = r(9784).EventEmitter;

                function n() {
                    o.call(this)
                }
                r(6192)(n, o), n.Readable = r(4324), n.Writable = r(6868), n.Duplex = r(5606), n.Transform = r(4914), n.PassThrough = r(9648), n.finished = r(2862), n.pipeline = r(110), n.Stream = n, n.prototype.pipe = function(e, t) {
                    var r = this;

                    function n(t) {
                        e.writable && !1 === e.write(t) && r.pause && r.pause()
                    }

                    function i() {
                        r.readable && r.resume && r.resume()
                    }
                    r.on("data", n), e.on("drain", i), e._isStdio || t && !1 === t.end || (r.on("end", s), r.on("close", u));
                    var a = !1;

                    function s() {
                        a || (a = !0, e.end())
                    }

                    function u() {
                        a || (a = !0, "function" == typeof e.destroy && e.destroy())
                    }

                    function c(e) {
                        if (l(), 0 === o.listenerCount(this, "error")) throw e
                    }

                    function l() {
                        r.removeListener("data", n), e.removeListener("drain", i), r.removeListener("end", s), r.removeListener("close", u), r.removeListener("error", c), e.removeListener("error", c), r.removeListener("end", l), r.removeListener("close", l), e.removeListener("close", l)
                    }
                    return r.on("error", c), e.on("error", c), r.on("end", l), r.on("close", l), e.on("close", l), e.emit("pipe", r), e
                }
            },
            4105: (e, t, r) => {
                "use strict";
                var o = r(6671).Buffer,
                    n = o.isEncoding || function(e) {
                        switch ((e = "" + e) && e.toLowerCase()) {
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                            case "raw":
                                return !0;
                            default:
                                return !1
                        }
                    };

                function i(e) {
                    var t;
                    switch (this.encoding = function(e) {
                            var t = function(e) {
                                if (!e) return "utf8";
                                for (var t;;) switch (e) {
                                    case "utf8":
                                    case "utf-8":
                                        return "utf8";
                                    case "ucs2":
                                    case "ucs-2":
                                    case "utf16le":
                                    case "utf-16le":
                                        return "utf16le";
                                    case "latin1":
                                    case "binary":
                                        return "latin1";
                                    case "base64":
                                    case "ascii":
                                    case "hex":
                                        return e;
                                    default:
                                        if (t) return;
                                        e = ("" + e).toLowerCase(), t = !0
                                }
                            }(e);
                            if ("string" != typeof t && (o.isEncoding === n || !n(e))) throw new Error("Unknown encoding: " + e);
                            return t || e
                        }(e), this.encoding) {
                        case "utf16le":
                            this.text = u, this.end = c, t = 4;
                            break;
                        case "utf8":
                            this.fillLast = s, t = 4;
                            break;
                        case "base64":
                            this.text = l, this.end = f, t = 3;
                            break;
                        default:
                            return this.write = d, void(this.end = h)
                    }
                    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = o.allocUnsafe(t)
                }

                function a(e) {
                    return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
                }

                function s(e) {
                    var t = this.lastTotal - this.lastNeed,
                        r = function(e, t) {
                            if (128 != (192 & t[0])) return e.lastNeed = 0, "�";
                            if (e.lastNeed > 1 && t.length > 1) {
                                if (128 != (192 & t[1])) return e.lastNeed = 1, "�";
                                if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�"
                            }
                        }(this, e);
                    return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void(this.lastNeed -= e.length))
                }

                function u(e, t) {
                    if ((e.length - t) % 2 == 0) {
                        var r = e.toString("utf16le", t);
                        if (r) {
                            var o = r.charCodeAt(r.length - 1);
                            if (o >= 55296 && o <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1)
                        }
                        return r
                    }
                    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
                }

                function c(e) {
                    var t = e && e.length ? this.write(e) : "";
                    if (this.lastNeed) {
                        var r = this.lastTotal - this.lastNeed;
                        return t + this.lastChar.toString("utf16le", 0, r)
                    }
                    return t
                }

                function l(e, t) {
                    var r = (e.length - t) % 3;
                    return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
                }

                function f(e) {
                    var t = e && e.length ? this.write(e) : "";
                    return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
                }

                function d(e) {
                    return e.toString(this.encoding)
                }

                function h(e) {
                    return e && e.length ? this.write(e) : ""
                }
                t.I = i, i.prototype.write = function(e) {
                    if (0 === e.length) return "";
                    var t, r;
                    if (this.lastNeed) {
                        if (void 0 === (t = this.fillLast(e))) return "";
                        r = this.lastNeed, this.lastNeed = 0
                    } else r = 0;
                    return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
                }, i.prototype.end = function(e) {
                    var t = e && e.length ? this.write(e) : "";
                    return this.lastNeed ? t + "�" : t
                }, i.prototype.text = function(e, t) {
                    var r = function(e, t, r) {
                        var o = t.length - 1;
                        if (o < r) return 0;
                        var n = a(t[o]);
                        return n >= 0 ? (n > 0 && (e.lastNeed = n - 1), n) : --o < r || -2 === n ? 0 : (n = a(t[o])) >= 0 ? (n > 0 && (e.lastNeed = n - 2), n) : --o < r || -2 === n ? 0 : (n = a(t[o])) >= 0 ? (n > 0 && (2 === n ? n = 0 : e.lastNeed = n - 3), n) : 0
                    }(this, e, t);
                    if (!this.lastNeed) return e.toString("utf8", t);
                    this.lastTotal = r;
                    var o = e.length - (r - this.lastNeed);
                    return e.copy(this.lastChar, 0, o), e.toString("utf8", t, o)
                }, i.prototype.fillLast = function(e) {
                    if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                    e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
                }
            },
            512: (e, t, r) => {
                var o = r(3876);

                function n(e) {
                    return e.name || e.toString().match(/function (.*?)\s*\(/)[1]
                }

                function i(e) {
                    return o.Nil(e) ? "" : n(e.constructor)
                }

                function a(e, t) {
                    Error.captureStackTrace && Error.captureStackTrace(e, t)
                }

                function s(e) {
                    return o.Function(e) ? e.toJSON ? e.toJSON() : n(e) : o.Array(e) ? "Array" : e && o.Object(e) ? "Object" : void 0 !== e ? e : ""
                }

                function u(e, t, r) {
                    var n = function(e) {
                        return o.Function(e) ? "" : o.String(e) ? JSON.stringify(e) : e && o.Object(e) ? "" : e
                    }(t);
                    return "Expected " + s(e) + ", got" + ("" !== r ? " " + r : "") + ("" !== n ? " " + n : "")
                }

                function c(e, t, r) {
                    r = r || i(t), this.message = u(e, t, r), a(this, c), this.__type = e, this.__value = t, this.__valueTypeName = r
                }

                function l(e, t, r, o, n) {
                    e ? (n = n || i(o), this.message = function(e, t, r, o, n) {
                        var i = '" of type ';
                        return "key" === t && (i = '" with key type '), u('property "' + s(r) + i + s(e), o, n)
                    }(e, r, t, o, n)) : this.message = 'Unexpected property "' + t + '"', a(this, c), this.__label = r, this.__property = t, this.__type = e, this.__value = o, this.__valueTypeName = n
                }
                c.prototype = Object.create(Error.prototype), c.prototype.constructor = c, l.prototype = Object.create(Error.prototype), l.prototype.constructor = c, e.exports = {
                    TfTypeError: c,
                    TfPropertyTypeError: l,
                    tfCustomError: function(e, t) {
                        return new c(e, {}, t)
                    },
                    tfSubError: function(e, t, r) {
                        return e instanceof l ? (t = t + "." + e.__property, e = new l(e.__type, t, e.__label, e.__value, e.__valueTypeName)) : e instanceof c && (e = new l(e.__type, t, r, e.__value, e.__valueTypeName)), a(e), e
                    },
                    tfJSON: s,
                    getValueTypeName: i
                }
            },
            8981: (e, t, r) => {
                var o = r(3876),
                    n = r(512);

                function i(e) {
                    return Buffer.isBuffer(e)
                }

                function a(e) {
                    return "string" == typeof e && /^([0-9a-f]{2})+$/i.test(e)
                }

                function s(e, t) {
                    var r = e.toJSON();

                    function o(o) {
                        if (!e(o)) return !1;
                        if (o.length === t) return !0;
                        throw n.tfCustomError(r + "(Length: " + t + ")", r + "(Length: " + o.length + ")")
                    }
                    return o.toJSON = function() {
                        return r
                    }, o
                }
                var u = s.bind(null, o.Array),
                    c = s.bind(null, i),
                    l = s.bind(null, a),
                    f = s.bind(null, o.String),
                    d = Math.pow(2, 53) - 1,
                    h = {
                        ArrayN: u,
                        Buffer: i,
                        BufferN: c,
                        Finite: function(e) {
                            return "number" == typeof e && isFinite(e)
                        },
                        Hex: a,
                        HexN: l,
                        Int8: function(e) {
                            return e << 24 >> 24 === e
                        },
                        Int16: function(e) {
                            return e << 16 >> 16 === e
                        },
                        Int32: function(e) {
                            return (0 | e) === e
                        },
                        Int53: function(e) {
                            return "number" == typeof e && e >= -d && e <= d && Math.floor(e) === e
                        },
                        Range: function(e, t, r) {
                            function n(o, n) {
                                return r(o, n) && o > e && o < t
                            }
                            return r = r || o.Number, n.toJSON = function() {
                                return `${r.toJSON()} between [${e}, ${t}]`
                            }, n
                        },
                        StringN: f,
                        UInt8: function(e) {
                            return (255 & e) === e
                        },
                        UInt16: function(e) {
                            return (65535 & e) === e
                        },
                        UInt32: function(e) {
                            return e >>> 0 === e
                        },
                        UInt53: function(e) {
                            return "number" == typeof e && e >= 0 && e <= d && Math.floor(e) === e
                        }
                    };
                for (var p in h) h[p].toJSON = function(e) {
                    return e
                }.bind(null, p);
                e.exports = h
            },
            8087: (e, t, r) => {
                var o = r(512),
                    n = r(3876),
                    i = o.tfJSON,
                    a = o.TfTypeError,
                    s = o.TfPropertyTypeError,
                    u = o.tfSubError,
                    c = o.getValueTypeName,
                    l = {
                        arrayOf: function(e, t) {
                            function r(r, o) {
                                return !!n.Array(r) && !n.Nil(r) && !(void 0 !== t.minLength && r.length < t.minLength) && !(void 0 !== t.maxLength && r.length > t.maxLength) && (void 0 === t.length || r.length === t.length) && r.every((function(t, r) {
                                    try {
                                        return d(e, t, o)
                                    } catch (e) {
                                        throw u(e, r)
                                    }
                                }))
                            }
                            return e = f(e), t = t || {}, r.toJSON = function() {
                                var r = "[" + i(e) + "]";
                                return void 0 !== t.length ? r += "{" + t.length + "}" : void 0 === t.minLength && void 0 === t.maxLength || (r += "{" + (void 0 === t.minLength ? 0 : t.minLength) + "," + (void 0 === t.maxLength ? 1 / 0 : t.maxLength) + "}"), r
                            }, r
                        },
                        maybe: function e(t) {
                            function r(r, o) {
                                return n.Nil(r) || t(r, o, e)
                            }
                            return t = f(t), r.toJSON = function() {
                                return "?" + i(t)
                            }, r
                        },
                        map: function(e, t) {
                            function r(r, o) {
                                if (!n.Object(r)) return !1;
                                if (n.Nil(r)) return !1;
                                for (var i in r) {
                                    try {
                                        t && d(t, i, o)
                                    } catch (e) {
                                        throw u(e, i, "key")
                                    }
                                    try {
                                        var a = r[i];
                                        d(e, a, o)
                                    } catch (e) {
                                        throw u(e, i)
                                    }
                                }
                                return !0
                            }
                            return e = f(e), t && (t = f(t)), r.toJSON = t ? function() {
                                return "{" + i(t) + ": " + i(e) + "}"
                            } : function() {
                                return "{" + i(e) + "}"
                            }, r
                        },
                        object: function(e) {
                            var t = {};
                            for (var r in e) t[r] = f(e[r]);

                            function o(e, r) {
                                if (!n.Object(e)) return !1;
                                if (n.Nil(e)) return !1;
                                var o;
                                try {
                                    for (o in t) d(t[o], e[o], r)
                                } catch (e) {
                                    throw u(e, o)
                                }
                                if (r)
                                    for (o in e)
                                        if (!t[o]) throw new s(void 0, o);
                                return !0
                            }
                            return o.toJSON = function() {
                                return i(t)
                            }, o
                        },
                        anyOf: function() {
                            var e = [].slice.call(arguments).map(f);

                            function t(t, r) {
                                return e.some((function(e) {
                                    try {
                                        return d(e, t, r)
                                    } catch (e) {
                                        return !1
                                    }
                                }))
                            }
                            return t.toJSON = function() {
                                return e.map(i).join("|")
                            }, t
                        },
                        allOf: function() {
                            var e = [].slice.call(arguments).map(f);

                            function t(t, r) {
                                return e.every((function(e) {
                                    try {
                                        return d(e, t, r)
                                    } catch (e) {
                                        return !1
                                    }
                                }))
                            }
                            return t.toJSON = function() {
                                return e.map(i).join(" & ")
                            }, t
                        },
                        quacksLike: function(e) {
                            function t(t) {
                                return e === c(t)
                            }
                            return t.toJSON = function() {
                                return e
                            }, t
                        },
                        tuple: function() {
                            var e = [].slice.call(arguments).map(f);

                            function t(t, r) {
                                return !n.Nil(t) && !n.Nil(t.length) && (!r || t.length === e.length) && e.every((function(e, o) {
                                    try {
                                        return d(e, t[o], r)
                                    } catch (e) {
                                        throw u(e, o)
                                    }
                                }))
                            }
                            return t.toJSON = function() {
                                return "(" + e.map(i).join(", ") + ")"
                            }, t
                        },
                        value: function(e) {
                            function t(t) {
                                return t === e
                            }
                            return t.toJSON = function() {
                                return e
                            }, t
                        }
                    };

                function f(e) {
                    if (n.String(e)) return "?" === e[0] ? l.maybe(e.slice(1)) : n[e] || l.quacksLike(e);
                    if (e && n.Object(e)) {
                        if (n.Array(e)) {
                            if (1 !== e.length) throw new TypeError("Expected compile() parameter of type Array of length 1");
                            return l.arrayOf(e[0])
                        }
                        return l.object(e)
                    }
                    return n.Function(e) ? e : l.value(e)
                }

                function d(e, t, r, o) {
                    if (n.Function(e)) {
                        if (e(t, r)) return !0;
                        throw new a(o || e, t)
                    }
                    return d(f(e), t, r)
                }
                for (var h in l.oneOf = l.anyOf, n) d[h] = n[h];
                for (h in l) d[h] = l[h];
                var p = r(8981);
                for (h in p) d[h] = p[h];
                d.compile = f, d.TfTypeError = a, d.TfPropertyTypeError = s, e.exports = d
            },
            3876: e => {
                var t = {
                    Array: function(e) {
                        return null != e && e.constructor === Array
                    },
                    Boolean: function(e) {
                        return "boolean" == typeof e
                    },
                    Function: function(e) {
                        return "function" == typeof e
                    },
                    Nil: function(e) {
                        return null == e
                    },
                    Number: function(e) {
                        return "number" == typeof e
                    },
                    Object: function(e) {
                        return "object" == typeof e
                    },
                    String: function(e) {
                        return "string" == typeof e
                    },
                    "": function() {
                        return !0
                    }
                };
                for (var r in t.Null = t.Nil, t) t[r].toJSON = function(e) {
                    return e
                }.bind(null, r);
                e.exports = t
            },
            1348: (e, t, r) => {
                function o(e) {
                    try {
                        if (!r.g.localStorage) return !1
                    } catch (e) {
                        return !1
                    }
                    var t = r.g.localStorage[e];
                    return null != t && "true" === String(t).toLowerCase()
                }
                e.exports = function(e, t) {
                    if (o("noDeprecation")) return e;
                    var r = !1;
                    return function() {
                        if (!r) {
                            if (o("throwDeprecation")) throw new Error(t);
                            o("traceDeprecation") ? console.trace(t) : console.warn(t), r = !0
                        }
                        return e.apply(this, arguments)
                    }
                }
            },
            603: (e, t, r) => {
                "use strict";
                var o = r(6671).Buffer;

                function n(e) {
                    if (e < 0 || e > 9007199254740991 || e % 1 != 0) throw new RangeError("value out of range")
                }

                function i(e) {
                    return n(e), e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9
                }
                e.exports = {
                    encode: function e(t, r, a) {
                        if (n(t), r || (r = o.allocUnsafe(i(t))), !o.isBuffer(r)) throw new TypeError("buffer must be a Buffer instance");
                        return a || (a = 0), t < 253 ? (r.writeUInt8(t, a), e.bytes = 1) : t <= 65535 ? (r.writeUInt8(253, a), r.writeUInt16LE(t, a + 1), e.bytes = 3) : t <= 4294967295 ? (r.writeUInt8(254, a), r.writeUInt32LE(t, a + 1), e.bytes = 5) : (r.writeUInt8(255, a), r.writeUInt32LE(t >>> 0, a + 1), r.writeUInt32LE(t / 4294967296 | 0, a + 5), e.bytes = 9), r
                    },
                    decode: function e(t, r) {
                        if (!o.isBuffer(t)) throw new TypeError("buffer must be a Buffer instance");
                        r || (r = 0);
                        var i = t.readUInt8(r);
                        if (i < 253) return e.bytes = 1, i;
                        if (253 === i) return e.bytes = 3, t.readUInt16LE(r + 1);
                        if (254 === i) return e.bytes = 5, t.readUInt32LE(r + 1);
                        e.bytes = 9;
                        var a = t.readUInt32LE(r + 1),
                            s = 4294967296 * t.readUInt32LE(r + 5) + a;
                        return n(s), s
                    },
                    encodingLength: i
                }
            },
            2657: (e, t, r) => {
                var o = r(9636);

                function n(e, t) {
                    if (void 0 !== t && e[0] !== t) throw new Error("Invalid network version");
                    if (33 === e.length) return {
                        version: e[0],
                        privateKey: e.slice(1, 33),
                        compressed: !1
                    };
                    if (34 !== e.length) throw new Error("Invalid WIF length");
                    if (1 !== e[33]) throw new Error("Invalid compression flag");
                    return {
                        version: e[0],
                        privateKey: e.slice(1, 33),
                        compressed: !0
                    }
                }

                function i(e, t, r) {
                    var o = new Buffer(r ? 34 : 33);
                    return o.writeUInt8(e, 0), t.copy(o, 1), r && (o[33] = 1), o
                }
                e.exports = {
                    decode: function(e, t) {
                        return n(o.decode(e), t)
                    },
                    decodeRaw: n,
                    encode: function(e, t, r) {
                        return "number" == typeof e ? o.encode(i(e, t, r)) : o.encode(i(e.version, e.privateKey, e.compressed))
                    },
                    encodeRaw: i
                }
            },
            1220: () => {},
            8854: () => {},
            1685: e => {
                "use strict";
                e.exports = JSON.parse('["的","一","是","在","不","了","有","和","人","这","中","大","为","上","个","国","我","以","要","他","时","来","用","们","生","到","作","地","于","出","就","分","对","成","会","可","主","发","年","动","同","工","也","能","下","过","子","说","产","种","面","而","方","后","多","定","行","学","法","所","民","得","经","十","三","之","进","着","等","部","度","家","电","力","里","如","水","化","高","自","二","理","起","小","物","现","实","加","量","都","两","体","制","机","当","使","点","从","业","本","去","把","性","好","应","开","它","合","还","因","由","其","些","然","前","外","天","政","四","日","那","社","义","事","平","形","相","全","表","间","样","与","关","各","重","新","线","内","数","正","心","反","你","明","看","原","又","么","利","比","或","但","质","气","第","向","道","命","此","变","条","只","没","结","解","问","意","建","月","公","无","系","军","很","情","者","最","立","代","想","已","通","并","提","直","题","党","程","展","五","果","料","象","员","革","位","入","常","文","总","次","品","式","活","设","及","管","特","件","长","求","老","头","基","资","边","流","路","级","少","图","山","统","接","知","较","将","组","见","计","别","她","手","角","期","根","论","运","农","指","几","九","区","强","放","决","西","被","干","做","必","战","先","回","则","任","取","据","处","队","南","给","色","光","门","即","保","治","北","造","百","规","热","领","七","海","口","东","导","器","压","志","世","金","增","争","济","阶","油","思","术","极","交","受","联","什","认","六","共","权","收","证","改","清","美","再","采","转","更","单","风","切","打","白","教","速","花","带","安","场","身","车","例","真","务","具","万","每","目","至","达","走","积","示","议","声","报","斗","完","类","八","离","华","名","确","才","科","张","信","马","节","话","米","整","空","元","况","今","集","温","传","土","许","步","群","广","石","记","需","段","研","界","拉","林","律","叫","且","究","观","越","织","装","影","算","低","持","音","众","书","布","复","容","儿","须","际","商","非","验","连","断","深","难","近","矿","千","周","委","素","技","备","半","办","青","省","列","习","响","约","支","般","史","感","劳","便","团","往","酸","历","市","克","何","除","消","构","府","称","太","准","精","值","号","率","族","维","划","选","标","写","存","候","毛","亲","快","效","斯","院","查","江","型","眼","王","按","格","养","易","置","派","层","片","始","却","专","状","育","厂","京","识","适","属","圆","包","火","住","调","满","县","局","照","参","红","细","引","听","该","铁","价","严","首","底","液","官","德","随","病","苏","失","尔","死","讲","配","女","黄","推","显","谈","罪","神","艺","呢","席","含","企","望","密","批","营","项","防","举","球","英","氧","势","告","李","台","落","木","帮","轮","破","亚","师","围","注","远","字","材","排","供","河","态","封","另","施","减","树","溶","怎","止","案","言","士","均","武","固","叶","鱼","波","视","仅","费","紧","爱","左","章","早","朝","害","续","轻","服","试","食","充","兵","源","判","护","司","足","某","练","差","致","板","田","降","黑","犯","负","击","范","继","兴","似","余","坚","曲","输","修","故","城","夫","够","送","笔","船","占","右","财","吃","富","春","职","觉","汉","画","功","巴","跟","虽","杂","飞","检","吸","助","升","阳","互","初","创","抗","考","投","坏","策","古","径","换","未","跑","留","钢","曾","端","责","站","简","述","钱","副","尽","帝","射","草","冲","承","独","令","限","阿","宣","环","双","请","超","微","让","控","州","良","轴","找","否","纪","益","依","优","顶","础","载","倒","房","突","坐","粉","敌","略","客","袁","冷","胜","绝","析","块","剂","测","丝","协","诉","念","陈","仍","罗","盐","友","洋","错","苦","夜","刑","移","频","逐","靠","混","母","短","皮","终","聚","汽","村","云","哪","既","距","卫","停","烈","央","察","烧","迅","境","若","印","洲","刻","括","激","孔","搞","甚","室","待","核","校","散","侵","吧","甲","游","久","菜","味","旧","模","湖","货","损","预","阻","毫","普","稳","乙","妈","植","息","扩","银","语","挥","酒","守","拿","序","纸","医","缺","雨","吗","针","刘","啊","急","唱","误","训","愿","审","附","获","茶","鲜","粮","斤","孩","脱","硫","肥","善","龙","演","父","渐","血","欢","械","掌","歌","沙","刚","攻","谓","盾","讨","晚","粒","乱","燃","矛","乎","杀","药","宁","鲁","贵","钟","煤","读","班","伯","香","介","迫","句","丰","培","握","兰","担","弦","蛋","沉","假","穿","执","答","乐","谁","顺","烟","缩","征","脸","喜","松","脚","困","异","免","背","星","福","买","染","井","概","慢","怕","磁","倍","祖","皇","促","静","补","评","翻","肉","践","尼","衣","宽","扬","棉","希","伤","操","垂","秋","宜","氢","套","督","振","架","亮","末","宪","庆","编","牛","触","映","雷","销","诗","座","居","抓","裂","胞","呼","娘","景","威","绿","晶","厚","盟","衡","鸡","孙","延","危","胶","屋","乡","临","陆","顾","掉","呀","灯","岁","措","束","耐","剧","玉","赵","跳","哥","季","课","凯","胡","额","款","绍","卷","齐","伟","蒸","殖","永","宗","苗","川","炉","岩","弱","零","杨","奏","沿","露","杆","探","滑","镇","饭","浓","航","怀","赶","库","夺","伊","灵","税","途","灭","赛","归","召","鼓","播","盘","裁","险","康","唯","录","菌","纯","借","糖","盖","横","符","私","努","堂","域","枪","润","幅","哈","竟","熟","虫","泽","脑","壤","碳","欧","遍","侧","寨","敢","彻","虑","斜","薄","庭","纳","弹","饲","伸","折","麦","湿","暗","荷","瓦","塞","床","筑","恶","户","访","塔","奇","透","梁","刀","旋","迹","卡","氯","遇","份","毒","泥","退","洗","摆","灰","彩","卖","耗","夏","择","忙","铜","献","硬","予","繁","圈","雪","函","亦","抽","篇","阵","阴","丁","尺","追","堆","雄","迎","泛","爸","楼","避","谋","吨","野","猪","旗","累","偏","典","馆","索","秦","脂","潮","爷","豆","忽","托","惊","塑","遗","愈","朱","替","纤","粗","倾","尚","痛","楚","谢","奋","购","磨","君","池","旁","碎","骨","监","捕","弟","暴","割","贯","殊","释","词","亡","壁","顿","宝","午","尘","闻","揭","炮","残","冬","桥","妇","警","综","招","吴","付","浮","遭","徐","您","摇","谷","赞","箱","隔","订","男","吹","园","纷","唐","败","宋","玻","巨","耕","坦","荣","闭","湾","键","凡","驻","锅","救","恩","剥","凝","碱","齿","截","炼","麻","纺","禁","废","盛","版","缓","净","睛","昌","婚","涉","筒","嘴","插","岸","朗","庄","街","藏","姑","贸","腐","奴","啦","惯","乘","伙","恢","匀","纱","扎","辩","耳","彪","臣","亿","璃","抵","脉","秀","萨","俄","网","舞","店","喷","纵","寸","汗","挂","洪","贺","闪","柬","爆","烯","津","稻","墙","软","勇","像","滚","厘","蒙","芳","肯","坡","柱","荡","腿","仪","旅","尾","轧","冰","贡","登","黎","削","钻","勒","逃","障","氨","郭","峰","币","港","伏","轨","亩","毕","擦","莫","刺","浪","秘","援","株","健","售","股","岛","甘","泡","睡","童","铸","汤","阀","休","汇","舍","牧","绕","炸","哲","磷","绩","朋","淡","尖","启","陷","柴","呈","徒","颜","泪","稍","忘","泵","蓝","拖","洞","授","镜","辛","壮","锋","贫","虚","弯","摩","泰","幼","廷","尊","窗","纲","弄","隶","疑","氏","宫","姐","震","瑞","怪","尤","琴","循","描","膜","违","夹","腰","缘","珠","穷","森","枝","竹","沟","催","绳","忆","邦","剩","幸","浆","栏","拥","牙","贮","礼","滤","钠","纹","罢","拍","咱","喊","袖","埃","勤","罚","焦","潜","伍","墨","欲","缝","姓","刊","饱","仿","奖","铝","鬼","丽","跨","默","挖","链","扫","喝","袋","炭","污","幕","诸","弧","励","梅","奶","洁","灾","舟","鉴","苯","讼","抱","毁","懂","寒","智","埔","寄","届","跃","渡","挑","丹","艰","贝","碰","拔","爹","戴","码","梦","芽","熔","赤","渔","哭","敬","颗","奔","铅","仲","虎","稀","妹","乏","珍","申","桌","遵","允","隆","螺","仓","魏","锐","晓","氮","兼","隐","碍","赫","拨","忠","肃","缸","牵","抢","博","巧","壳","兄","杜","讯","诚","碧","祥","柯","页","巡","矩","悲","灌","龄","伦","票","寻","桂","铺","圣","恐","恰","郑","趣","抬","荒","腾","贴","柔","滴","猛","阔","辆","妻","填","撤","储","签","闹","扰","紫","砂","递","戏","吊","陶","伐","喂","疗","瓶","婆","抚","臂","摸","忍","虾","蜡","邻","胸","巩","挤","偶","弃","槽","劲","乳","邓","吉","仁","烂","砖","租","乌","舰","伴","瓜","浅","丙","暂","燥","橡","柳","迷","暖","牌","秧","胆","详","簧","踏","瓷","谱","呆","宾","糊","洛","辉","愤","竞","隙","怒","粘","乃","绪","肩","籍","敏","涂","熙","皆","侦","悬","掘","享","纠","醒","狂","锁","淀","恨","牲","霸","爬","赏","逆","玩","陵","祝","秒","浙","貌","役","彼","悉","鸭","趋","凤","晨","畜","辈","秩","卵","署","梯","炎","滩","棋","驱","筛","峡","冒","啥","寿","译","浸","泉","帽","迟","硅","疆","贷","漏","稿","冠","嫩","胁","芯","牢","叛","蚀","奥","鸣","岭","羊","凭","串","塘","绘","酵","融","盆","锡","庙","筹","冻","辅","摄","袭","筋","拒","僚","旱","钾","鸟","漆","沈","眉","疏","添","棒","穗","硝","韩","逼","扭","侨","凉","挺","碗","栽","炒","杯","患","馏","劝","豪","辽","勃","鸿","旦","吏","拜","狗","埋","辊","掩","饮","搬","骂","辞","勾","扣","估","蒋","绒","雾","丈","朵","姆","拟","宇","辑","陕","雕","偿","蓄","崇","剪","倡","厅","咬","驶","薯","刷","斥","番","赋","奉","佛","浇","漫","曼","扇","钙","桃","扶","仔","返","俗","亏","腔","鞋","棱","覆","框","悄","叔","撞","骗","勘","旺","沸","孤","吐","孟","渠","屈","疾","妙","惜","仰","狠","胀","谐","抛","霉","桑","岗","嘛","衰","盗","渗","脏","赖","涌","甜","曹","阅","肌","哩","厉","烃","纬","毅","昨","伪","症","煮","叹","钉","搭","茎","笼","酷","偷","弓","锥","恒","杰","坑","鼻","翼","纶","叙","狱","逮","罐","络","棚","抑","膨","蔬","寺","骤","穆","冶","枯","册","尸","凸","绅","坯","牺","焰","轰","欣","晋","瘦","御","锭","锦","丧","旬","锻","垄","搜","扑","邀","亭","酯","迈","舒","脆","酶","闲","忧","酚","顽","羽","涨","卸","仗","陪","辟","惩","杭","姚","肚","捉","飘","漂","昆","欺","吾","郎","烷","汁","呵","饰","萧","雅","邮","迁","燕","撒","姻","赴","宴","烦","债","帐","斑","铃","旨","醇","董","饼","雏","姿","拌","傅","腹","妥","揉","贤","拆","歪","葡","胺","丢","浩","徽","昂","垫","挡","览","贪","慰","缴","汪","慌","冯","诺","姜","谊","凶","劣","诬","耀","昏","躺","盈","骑","乔","溪","丛","卢","抹","闷","咨","刮","驾","缆","悟","摘","铒","掷","颇","幻","柄","惠","惨","佳","仇","腊","窝","涤","剑","瞧","堡","泼","葱","罩","霍","捞","胎","苍","滨","俩","捅","湘","砍","霞","邵","萄","疯","淮","遂","熊","粪","烘","宿","档","戈","驳","嫂","裕","徙","箭","捐","肠","撑","晒","辨","殿","莲","摊","搅","酱","屏","疫","哀","蔡","堵","沫","皱","畅","叠","阁","莱","敲","辖","钩","痕","坝","巷","饿","祸","丘","玄","溜","曰","逻","彭","尝","卿","妨","艇","吞","韦","怨","矮","歇"]')
            },
            9272: e => {
                "use strict";
                e.exports = JSON.parse('["的","一","是","在","不","了","有","和","人","這","中","大","為","上","個","國","我","以","要","他","時","來","用","們","生","到","作","地","於","出","就","分","對","成","會","可","主","發","年","動","同","工","也","能","下","過","子","說","產","種","面","而","方","後","多","定","行","學","法","所","民","得","經","十","三","之","進","著","等","部","度","家","電","力","裡","如","水","化","高","自","二","理","起","小","物","現","實","加","量","都","兩","體","制","機","當","使","點","從","業","本","去","把","性","好","應","開","它","合","還","因","由","其","些","然","前","外","天","政","四","日","那","社","義","事","平","形","相","全","表","間","樣","與","關","各","重","新","線","內","數","正","心","反","你","明","看","原","又","麼","利","比","或","但","質","氣","第","向","道","命","此","變","條","只","沒","結","解","問","意","建","月","公","無","系","軍","很","情","者","最","立","代","想","已","通","並","提","直","題","黨","程","展","五","果","料","象","員","革","位","入","常","文","總","次","品","式","活","設","及","管","特","件","長","求","老","頭","基","資","邊","流","路","級","少","圖","山","統","接","知","較","將","組","見","計","別","她","手","角","期","根","論","運","農","指","幾","九","區","強","放","決","西","被","幹","做","必","戰","先","回","則","任","取","據","處","隊","南","給","色","光","門","即","保","治","北","造","百","規","熱","領","七","海","口","東","導","器","壓","志","世","金","增","爭","濟","階","油","思","術","極","交","受","聯","什","認","六","共","權","收","證","改","清","美","再","採","轉","更","單","風","切","打","白","教","速","花","帶","安","場","身","車","例","真","務","具","萬","每","目","至","達","走","積","示","議","聲","報","鬥","完","類","八","離","華","名","確","才","科","張","信","馬","節","話","米","整","空","元","況","今","集","溫","傳","土","許","步","群","廣","石","記","需","段","研","界","拉","林","律","叫","且","究","觀","越","織","裝","影","算","低","持","音","眾","書","布","复","容","兒","須","際","商","非","驗","連","斷","深","難","近","礦","千","週","委","素","技","備","半","辦","青","省","列","習","響","約","支","般","史","感","勞","便","團","往","酸","歷","市","克","何","除","消","構","府","稱","太","準","精","值","號","率","族","維","劃","選","標","寫","存","候","毛","親","快","效","斯","院","查","江","型","眼","王","按","格","養","易","置","派","層","片","始","卻","專","狀","育","廠","京","識","適","屬","圓","包","火","住","調","滿","縣","局","照","參","紅","細","引","聽","該","鐵","價","嚴","首","底","液","官","德","隨","病","蘇","失","爾","死","講","配","女","黃","推","顯","談","罪","神","藝","呢","席","含","企","望","密","批","營","項","防","舉","球","英","氧","勢","告","李","台","落","木","幫","輪","破","亞","師","圍","注","遠","字","材","排","供","河","態","封","另","施","減","樹","溶","怎","止","案","言","士","均","武","固","葉","魚","波","視","僅","費","緊","愛","左","章","早","朝","害","續","輕","服","試","食","充","兵","源","判","護","司","足","某","練","差","致","板","田","降","黑","犯","負","擊","范","繼","興","似","餘","堅","曲","輸","修","故","城","夫","夠","送","筆","船","佔","右","財","吃","富","春","職","覺","漢","畫","功","巴","跟","雖","雜","飛","檢","吸","助","昇","陽","互","初","創","抗","考","投","壞","策","古","徑","換","未","跑","留","鋼","曾","端","責","站","簡","述","錢","副","盡","帝","射","草","衝","承","獨","令","限","阿","宣","環","雙","請","超","微","讓","控","州","良","軸","找","否","紀","益","依","優","頂","礎","載","倒","房","突","坐","粉","敵","略","客","袁","冷","勝","絕","析","塊","劑","測","絲","協","訴","念","陳","仍","羅","鹽","友","洋","錯","苦","夜","刑","移","頻","逐","靠","混","母","短","皮","終","聚","汽","村","雲","哪","既","距","衛","停","烈","央","察","燒","迅","境","若","印","洲","刻","括","激","孔","搞","甚","室","待","核","校","散","侵","吧","甲","遊","久","菜","味","舊","模","湖","貨","損","預","阻","毫","普","穩","乙","媽","植","息","擴","銀","語","揮","酒","守","拿","序","紙","醫","缺","雨","嗎","針","劉","啊","急","唱","誤","訓","願","審","附","獲","茶","鮮","糧","斤","孩","脫","硫","肥","善","龍","演","父","漸","血","歡","械","掌","歌","沙","剛","攻","謂","盾","討","晚","粒","亂","燃","矛","乎","殺","藥","寧","魯","貴","鐘","煤","讀","班","伯","香","介","迫","句","豐","培","握","蘭","擔","弦","蛋","沉","假","穿","執","答","樂","誰","順","煙","縮","徵","臉","喜","松","腳","困","異","免","背","星","福","買","染","井","概","慢","怕","磁","倍","祖","皇","促","靜","補","評","翻","肉","踐","尼","衣","寬","揚","棉","希","傷","操","垂","秋","宜","氫","套","督","振","架","亮","末","憲","慶","編","牛","觸","映","雷","銷","詩","座","居","抓","裂","胞","呼","娘","景","威","綠","晶","厚","盟","衡","雞","孫","延","危","膠","屋","鄉","臨","陸","顧","掉","呀","燈","歲","措","束","耐","劇","玉","趙","跳","哥","季","課","凱","胡","額","款","紹","卷","齊","偉","蒸","殖","永","宗","苗","川","爐","岩","弱","零","楊","奏","沿","露","桿","探","滑","鎮","飯","濃","航","懷","趕","庫","奪","伊","靈","稅","途","滅","賽","歸","召","鼓","播","盤","裁","險","康","唯","錄","菌","純","借","糖","蓋","橫","符","私","努","堂","域","槍","潤","幅","哈","竟","熟","蟲","澤","腦","壤","碳","歐","遍","側","寨","敢","徹","慮","斜","薄","庭","納","彈","飼","伸","折","麥","濕","暗","荷","瓦","塞","床","築","惡","戶","訪","塔","奇","透","梁","刀","旋","跡","卡","氯","遇","份","毒","泥","退","洗","擺","灰","彩","賣","耗","夏","擇","忙","銅","獻","硬","予","繁","圈","雪","函","亦","抽","篇","陣","陰","丁","尺","追","堆","雄","迎","泛","爸","樓","避","謀","噸","野","豬","旗","累","偏","典","館","索","秦","脂","潮","爺","豆","忽","托","驚","塑","遺","愈","朱","替","纖","粗","傾","尚","痛","楚","謝","奮","購","磨","君","池","旁","碎","骨","監","捕","弟","暴","割","貫","殊","釋","詞","亡","壁","頓","寶","午","塵","聞","揭","炮","殘","冬","橋","婦","警","綜","招","吳","付","浮","遭","徐","您","搖","谷","贊","箱","隔","訂","男","吹","園","紛","唐","敗","宋","玻","巨","耕","坦","榮","閉","灣","鍵","凡","駐","鍋","救","恩","剝","凝","鹼","齒","截","煉","麻","紡","禁","廢","盛","版","緩","淨","睛","昌","婚","涉","筒","嘴","插","岸","朗","莊","街","藏","姑","貿","腐","奴","啦","慣","乘","夥","恢","勻","紗","扎","辯","耳","彪","臣","億","璃","抵","脈","秀","薩","俄","網","舞","店","噴","縱","寸","汗","掛","洪","賀","閃","柬","爆","烯","津","稻","牆","軟","勇","像","滾","厘","蒙","芳","肯","坡","柱","盪","腿","儀","旅","尾","軋","冰","貢","登","黎","削","鑽","勒","逃","障","氨","郭","峰","幣","港","伏","軌","畝","畢","擦","莫","刺","浪","秘","援","株","健","售","股","島","甘","泡","睡","童","鑄","湯","閥","休","匯","舍","牧","繞","炸","哲","磷","績","朋","淡","尖","啟","陷","柴","呈","徒","顏","淚","稍","忘","泵","藍","拖","洞","授","鏡","辛","壯","鋒","貧","虛","彎","摩","泰","幼","廷","尊","窗","綱","弄","隸","疑","氏","宮","姐","震","瑞","怪","尤","琴","循","描","膜","違","夾","腰","緣","珠","窮","森","枝","竹","溝","催","繩","憶","邦","剩","幸","漿","欄","擁","牙","貯","禮","濾","鈉","紋","罷","拍","咱","喊","袖","埃","勤","罰","焦","潛","伍","墨","欲","縫","姓","刊","飽","仿","獎","鋁","鬼","麗","跨","默","挖","鏈","掃","喝","袋","炭","污","幕","諸","弧","勵","梅","奶","潔","災","舟","鑑","苯","訟","抱","毀","懂","寒","智","埔","寄","屆","躍","渡","挑","丹","艱","貝","碰","拔","爹","戴","碼","夢","芽","熔","赤","漁","哭","敬","顆","奔","鉛","仲","虎","稀","妹","乏","珍","申","桌","遵","允","隆","螺","倉","魏","銳","曉","氮","兼","隱","礙","赫","撥","忠","肅","缸","牽","搶","博","巧","殼","兄","杜","訊","誠","碧","祥","柯","頁","巡","矩","悲","灌","齡","倫","票","尋","桂","鋪","聖","恐","恰","鄭","趣","抬","荒","騰","貼","柔","滴","猛","闊","輛","妻","填","撤","儲","簽","鬧","擾","紫","砂","遞","戲","吊","陶","伐","餵","療","瓶","婆","撫","臂","摸","忍","蝦","蠟","鄰","胸","鞏","擠","偶","棄","槽","勁","乳","鄧","吉","仁","爛","磚","租","烏","艦","伴","瓜","淺","丙","暫","燥","橡","柳","迷","暖","牌","秧","膽","詳","簧","踏","瓷","譜","呆","賓","糊","洛","輝","憤","競","隙","怒","粘","乃","緒","肩","籍","敏","塗","熙","皆","偵","懸","掘","享","糾","醒","狂","鎖","淀","恨","牲","霸","爬","賞","逆","玩","陵","祝","秒","浙","貌","役","彼","悉","鴨","趨","鳳","晨","畜","輩","秩","卵","署","梯","炎","灘","棋","驅","篩","峽","冒","啥","壽","譯","浸","泉","帽","遲","矽","疆","貸","漏","稿","冠","嫩","脅","芯","牢","叛","蝕","奧","鳴","嶺","羊","憑","串","塘","繪","酵","融","盆","錫","廟","籌","凍","輔","攝","襲","筋","拒","僚","旱","鉀","鳥","漆","沈","眉","疏","添","棒","穗","硝","韓","逼","扭","僑","涼","挺","碗","栽","炒","杯","患","餾","勸","豪","遼","勃","鴻","旦","吏","拜","狗","埋","輥","掩","飲","搬","罵","辭","勾","扣","估","蔣","絨","霧","丈","朵","姆","擬","宇","輯","陝","雕","償","蓄","崇","剪","倡","廳","咬","駛","薯","刷","斥","番","賦","奉","佛","澆","漫","曼","扇","鈣","桃","扶","仔","返","俗","虧","腔","鞋","棱","覆","框","悄","叔","撞","騙","勘","旺","沸","孤","吐","孟","渠","屈","疾","妙","惜","仰","狠","脹","諧","拋","黴","桑","崗","嘛","衰","盜","滲","臟","賴","湧","甜","曹","閱","肌","哩","厲","烴","緯","毅","昨","偽","症","煮","嘆","釘","搭","莖","籠","酷","偷","弓","錐","恆","傑","坑","鼻","翼","綸","敘","獄","逮","罐","絡","棚","抑","膨","蔬","寺","驟","穆","冶","枯","冊","屍","凸","紳","坯","犧","焰","轟","欣","晉","瘦","禦","錠","錦","喪","旬","鍛","壟","搜","撲","邀","亭","酯","邁","舒","脆","酶","閒","憂","酚","頑","羽","漲","卸","仗","陪","闢","懲","杭","姚","肚","捉","飄","漂","昆","欺","吾","郎","烷","汁","呵","飾","蕭","雅","郵","遷","燕","撒","姻","赴","宴","煩","債","帳","斑","鈴","旨","醇","董","餅","雛","姿","拌","傅","腹","妥","揉","賢","拆","歪","葡","胺","丟","浩","徽","昂","墊","擋","覽","貪","慰","繳","汪","慌","馮","諾","姜","誼","兇","劣","誣","耀","昏","躺","盈","騎","喬","溪","叢","盧","抹","悶","諮","刮","駕","纜","悟","摘","鉺","擲","頗","幻","柄","惠","慘","佳","仇","臘","窩","滌","劍","瞧","堡","潑","蔥","罩","霍","撈","胎","蒼","濱","倆","捅","湘","砍","霞","邵","萄","瘋","淮","遂","熊","糞","烘","宿","檔","戈","駁","嫂","裕","徙","箭","捐","腸","撐","曬","辨","殿","蓮","攤","攪","醬","屏","疫","哀","蔡","堵","沫","皺","暢","疊","閣","萊","敲","轄","鉤","痕","壩","巷","餓","禍","丘","玄","溜","曰","邏","彭","嘗","卿","妨","艇","吞","韋","怨","矮","歇"]')
            },
            6502: e => {
                "use strict";
                e.exports = JSON.parse('["abdikace","abeceda","adresa","agrese","akce","aktovka","alej","alkohol","amputace","ananas","andulka","anekdota","anketa","antika","anulovat","archa","arogance","asfalt","asistent","aspirace","astma","astronom","atlas","atletika","atol","autobus","azyl","babka","bachor","bacil","baculka","badatel","bageta","bagr","bahno","bakterie","balada","baletka","balkon","balonek","balvan","balza","bambus","bankomat","barbar","baret","barman","baroko","barva","baterka","batoh","bavlna","bazalka","bazilika","bazuka","bedna","beran","beseda","bestie","beton","bezinka","bezmoc","beztak","bicykl","bidlo","biftek","bikiny","bilance","biograf","biolog","bitva","bizon","blahobyt","blatouch","blecha","bledule","blesk","blikat","blizna","blokovat","bloudit","blud","bobek","bobr","bodlina","bodnout","bohatost","bojkot","bojovat","bokorys","bolest","borec","borovice","bota","boubel","bouchat","bouda","boule","bourat","boxer","bradavka","brambora","branka","bratr","brepta","briketa","brko","brloh","bronz","broskev","brunetka","brusinka","brzda","brzy","bublina","bubnovat","buchta","buditel","budka","budova","bufet","bujarost","bukvice","buldok","bulva","bunda","bunkr","burza","butik","buvol","buzola","bydlet","bylina","bytovka","bzukot","capart","carevna","cedr","cedule","cejch","cejn","cela","celer","celkem","celnice","cenina","cennost","cenovka","centrum","cenzor","cestopis","cetka","chalupa","chapadlo","charita","chata","chechtat","chemie","chichot","chirurg","chlad","chleba","chlubit","chmel","chmura","chobot","chochol","chodba","cholera","chomout","chopit","choroba","chov","chrapot","chrlit","chrt","chrup","chtivost","chudina","chutnat","chvat","chvilka","chvost","chyba","chystat","chytit","cibule","cigareta","cihelna","cihla","cinkot","cirkus","cisterna","citace","citrus","cizinec","cizost","clona","cokoliv","couvat","ctitel","ctnost","cudnost","cuketa","cukr","cupot","cvaknout","cval","cvik","cvrkot","cyklista","daleko","dareba","datel","datum","dcera","debata","dechovka","decibel","deficit","deflace","dekl","dekret","demokrat","deprese","derby","deska","detektiv","dikobraz","diktovat","dioda","diplom","disk","displej","divadlo","divoch","dlaha","dlouho","dluhopis","dnes","dobro","dobytek","docent","dochutit","dodnes","dohled","dohoda","dohra","dojem","dojnice","doklad","dokola","doktor","dokument","dolar","doleva","dolina","doma","dominant","domluvit","domov","donutit","dopad","dopis","doplnit","doposud","doprovod","dopustit","dorazit","dorost","dort","dosah","doslov","dostatek","dosud","dosyta","dotaz","dotek","dotknout","doufat","doutnat","dovozce","dozadu","doznat","dozorce","drahota","drak","dramatik","dravec","draze","drdol","drobnost","drogerie","drozd","drsnost","drtit","drzost","duben","duchovno","dudek","duha","duhovka","dusit","dusno","dutost","dvojice","dvorec","dynamit","ekolog","ekonomie","elektron","elipsa","email","emise","emoce","empatie","epizoda","epocha","epopej","epos","esej","esence","eskorta","eskymo","etiketa","euforie","evoluce","exekuce","exkurze","expedice","exploze","export","extrakt","facka","fajfka","fakulta","fanatik","fantazie","farmacie","favorit","fazole","federace","fejeton","fenka","fialka","figurant","filozof","filtr","finance","finta","fixace","fjord","flanel","flirt","flotila","fond","fosfor","fotbal","fotka","foton","frakce","freska","fronta","fukar","funkce","fyzika","galeje","garant","genetika","geolog","gilotina","glazura","glejt","golem","golfista","gotika","graf","gramofon","granule","grep","gril","grog","groteska","guma","hadice","hadr","hala","halenka","hanba","hanopis","harfa","harpuna","havran","hebkost","hejkal","hejno","hejtman","hektar","helma","hematom","herec","herna","heslo","hezky","historik","hladovka","hlasivky","hlava","hledat","hlen","hlodavec","hloh","hloupost","hltat","hlubina","hluchota","hmat","hmota","hmyz","hnis","hnojivo","hnout","hoblina","hoboj","hoch","hodiny","hodlat","hodnota","hodovat","hojnost","hokej","holinka","holka","holub","homole","honitba","honorace","horal","horda","horizont","horko","horlivec","hormon","hornina","horoskop","horstvo","hospoda","hostina","hotovost","houba","houf","houpat","houska","hovor","hradba","hranice","hravost","hrazda","hrbolek","hrdina","hrdlo","hrdost","hrnek","hrobka","hromada","hrot","hrouda","hrozen","hrstka","hrubost","hryzat","hubenost","hubnout","hudba","hukot","humr","husita","hustota","hvozd","hybnost","hydrant","hygiena","hymna","hysterik","idylka","ihned","ikona","iluze","imunita","infekce","inflace","inkaso","inovace","inspekce","internet","invalida","investor","inzerce","ironie","jablko","jachta","jahoda","jakmile","jakost","jalovec","jantar","jarmark","jaro","jasan","jasno","jatka","javor","jazyk","jedinec","jedle","jednatel","jehlan","jekot","jelen","jelito","jemnost","jenom","jepice","jeseter","jevit","jezdec","jezero","jinak","jindy","jinoch","jiskra","jistota","jitrnice","jizva","jmenovat","jogurt","jurta","kabaret","kabel","kabinet","kachna","kadet","kadidlo","kahan","kajak","kajuta","kakao","kaktus","kalamita","kalhoty","kalibr","kalnost","kamera","kamkoliv","kamna","kanibal","kanoe","kantor","kapalina","kapela","kapitola","kapka","kaple","kapota","kapr","kapusta","kapybara","karamel","karotka","karton","kasa","katalog","katedra","kauce","kauza","kavalec","kazajka","kazeta","kazivost","kdekoliv","kdesi","kedluben","kemp","keramika","kino","klacek","kladivo","klam","klapot","klasika","klaun","klec","klenba","klepat","klesnout","klid","klima","klisna","klobouk","klokan","klopa","kloub","klubovna","klusat","kluzkost","kmen","kmitat","kmotr","kniha","knot","koalice","koberec","kobka","kobliha","kobyla","kocour","kohout","kojenec","kokos","koktejl","kolaps","koleda","kolize","kolo","komando","kometa","komik","komnata","komora","kompas","komunita","konat","koncept","kondice","konec","konfese","kongres","konina","konkurs","kontakt","konzerva","kopanec","kopie","kopnout","koprovka","korbel","korektor","kormidlo","koroptev","korpus","koruna","koryto","korzet","kosatec","kostka","kotel","kotleta","kotoul","koukat","koupelna","kousek","kouzlo","kovboj","koza","kozoroh","krabice","krach","krajina","kralovat","krasopis","kravata","kredit","krejcar","kresba","kreveta","kriket","kritik","krize","krkavec","krmelec","krmivo","krocan","krok","kronika","kropit","kroupa","krovka","krtek","kruhadlo","krupice","krutost","krvinka","krychle","krypta","krystal","kryt","kudlanka","kufr","kujnost","kukla","kulajda","kulich","kulka","kulomet","kultura","kuna","kupodivu","kurt","kurzor","kutil","kvalita","kvasinka","kvestor","kynolog","kyselina","kytara","kytice","kytka","kytovec","kyvadlo","labrador","lachtan","ladnost","laik","lakomec","lamela","lampa","lanovka","lasice","laso","lastura","latinka","lavina","lebka","leckdy","leden","lednice","ledovka","ledvina","legenda","legie","legrace","lehce","lehkost","lehnout","lektvar","lenochod","lentilka","lepenka","lepidlo","letadlo","letec","letmo","letokruh","levhart","levitace","levobok","libra","lichotka","lidojed","lidskost","lihovina","lijavec","lilek","limetka","linie","linka","linoleum","listopad","litina","litovat","lobista","lodivod","logika","logoped","lokalita","loket","lomcovat","lopata","lopuch","lord","losos","lotr","loudal","louh","louka","louskat","lovec","lstivost","lucerna","lucifer","lump","lusk","lustrace","lvice","lyra","lyrika","lysina","madam","madlo","magistr","mahagon","majetek","majitel","majorita","makak","makovice","makrela","malba","malina","malovat","malvice","maminka","mandle","manko","marnost","masakr","maskot","masopust","matice","matrika","maturita","mazanec","mazivo","mazlit","mazurka","mdloba","mechanik","meditace","medovina","melasa","meloun","mentolka","metla","metoda","metr","mezera","migrace","mihnout","mihule","mikina","mikrofon","milenec","milimetr","milost","mimika","mincovna","minibar","minomet","minulost","miska","mistr","mixovat","mladost","mlha","mlhovina","mlok","mlsat","mluvit","mnich","mnohem","mobil","mocnost","modelka","modlitba","mohyla","mokro","molekula","momentka","monarcha","monokl","monstrum","montovat","monzun","mosaz","moskyt","most","motivace","motorka","motyka","moucha","moudrost","mozaika","mozek","mozol","mramor","mravenec","mrkev","mrtvola","mrzet","mrzutost","mstitel","mudrc","muflon","mulat","mumie","munice","muset","mutace","muzeum","muzikant","myslivec","mzda","nabourat","nachytat","nadace","nadbytek","nadhoz","nadobro","nadpis","nahlas","nahnat","nahodile","nahradit","naivita","najednou","najisto","najmout","naklonit","nakonec","nakrmit","nalevo","namazat","namluvit","nanometr","naoko","naopak","naostro","napadat","napevno","naplnit","napnout","naposled","naprosto","narodit","naruby","narychlo","nasadit","nasekat","naslepo","nastat","natolik","navenek","navrch","navzdory","nazvat","nebe","nechat","necky","nedaleko","nedbat","neduh","negace","nehet","nehoda","nejen","nejprve","neklid","nelibost","nemilost","nemoc","neochota","neonka","nepokoj","nerost","nerv","nesmysl","nesoulad","netvor","neuron","nevina","nezvykle","nicota","nijak","nikam","nikdy","nikl","nikterak","nitro","nocleh","nohavice","nominace","nora","norek","nositel","nosnost","nouze","noviny","novota","nozdra","nuda","nudle","nuget","nutit","nutnost","nutrie","nymfa","obal","obarvit","obava","obdiv","obec","obehnat","obejmout","obezita","obhajoba","obilnice","objasnit","objekt","obklopit","oblast","oblek","obliba","obloha","obluda","obnos","obohatit","obojek","obout","obrazec","obrna","obruba","obrys","obsah","obsluha","obstarat","obuv","obvaz","obvinit","obvod","obvykle","obyvatel","obzor","ocas","ocel","ocenit","ochladit","ochota","ochrana","ocitnout","odboj","odbyt","odchod","odcizit","odebrat","odeslat","odevzdat","odezva","odhadce","odhodit","odjet","odjinud","odkaz","odkoupit","odliv","odluka","odmlka","odolnost","odpad","odpis","odplout","odpor","odpustit","odpykat","odrazka","odsoudit","odstup","odsun","odtok","odtud","odvaha","odveta","odvolat","odvracet","odznak","ofina","ofsajd","ohlas","ohnisko","ohrada","ohrozit","ohryzek","okap","okenice","oklika","okno","okouzlit","okovy","okrasa","okres","okrsek","okruh","okupant","okurka","okusit","olejnina","olizovat","omak","omeleta","omezit","omladina","omlouvat","omluva","omyl","onehdy","opakovat","opasek","operace","opice","opilost","opisovat","opora","opozice","opravdu","oproti","orbital","orchestr","orgie","orlice","orloj","ortel","osada","oschnout","osika","osivo","oslava","oslepit","oslnit","oslovit","osnova","osoba","osolit","ospalec","osten","ostraha","ostuda","ostych","osvojit","oteplit","otisk","otop","otrhat","otrlost","otrok","otruby","otvor","ovanout","ovar","oves","ovlivnit","ovoce","oxid","ozdoba","pachatel","pacient","padouch","pahorek","pakt","palanda","palec","palivo","paluba","pamflet","pamlsek","panenka","panika","panna","panovat","panstvo","pantofle","paprika","parketa","parodie","parta","paruka","paryba","paseka","pasivita","pastelka","patent","patrona","pavouk","pazneht","pazourek","pecka","pedagog","pejsek","peklo","peloton","penalta","pendrek","penze","periskop","pero","pestrost","petarda","petice","petrolej","pevnina","pexeso","pianista","piha","pijavice","pikle","piknik","pilina","pilnost","pilulka","pinzeta","pipeta","pisatel","pistole","pitevna","pivnice","pivovar","placenta","plakat","plamen","planeta","plastika","platit","plavidlo","plaz","plech","plemeno","plenta","ples","pletivo","plevel","plivat","plnit","plno","plocha","plodina","plomba","plout","pluk","plyn","pobavit","pobyt","pochod","pocit","poctivec","podat","podcenit","podepsat","podhled","podivit","podklad","podmanit","podnik","podoba","podpora","podraz","podstata","podvod","podzim","poezie","pohanka","pohnutka","pohovor","pohroma","pohyb","pointa","pojistka","pojmout","pokazit","pokles","pokoj","pokrok","pokuta","pokyn","poledne","polibek","polknout","poloha","polynom","pomalu","pominout","pomlka","pomoc","pomsta","pomyslet","ponechat","ponorka","ponurost","popadat","popel","popisek","poplach","poprosit","popsat","popud","poradce","porce","porod","porucha","poryv","posadit","posed","posila","poskok","poslanec","posoudit","pospolu","postava","posudek","posyp","potah","potkan","potlesk","potomek","potrava","potupa","potvora","poukaz","pouto","pouzdro","povaha","povidla","povlak","povoz","povrch","povstat","povyk","povzdech","pozdrav","pozemek","poznatek","pozor","pozvat","pracovat","prahory","praktika","prales","praotec","praporek","prase","pravda","princip","prkno","probudit","procento","prodej","profese","prohra","projekt","prolomit","promile","pronikat","propad","prorok","prosba","proton","proutek","provaz","prskavka","prsten","prudkost","prut","prvek","prvohory","psanec","psovod","pstruh","ptactvo","puberta","puch","pudl","pukavec","puklina","pukrle","pult","pumpa","punc","pupen","pusa","pusinka","pustina","putovat","putyka","pyramida","pysk","pytel","racek","rachot","radiace","radnice","radon","raft","ragby","raketa","rakovina","rameno","rampouch","rande","rarach","rarita","rasovna","rastr","ratolest","razance","razidlo","reagovat","reakce","recept","redaktor","referent","reflex","rejnok","reklama","rekord","rekrut","rektor","reputace","revize","revma","revolver","rezerva","riskovat","riziko","robotika","rodokmen","rohovka","rokle","rokoko","romaneto","ropovod","ropucha","rorejs","rosol","rostlina","rotmistr","rotoped","rotunda","roubenka","roucho","roup","roura","rovina","rovnice","rozbor","rozchod","rozdat","rozeznat","rozhodce","rozinka","rozjezd","rozkaz","rozloha","rozmar","rozpad","rozruch","rozsah","roztok","rozum","rozvod","rubrika","ruchadlo","rukavice","rukopis","ryba","rybolov","rychlost","rydlo","rypadlo","rytina","ryzost","sadista","sahat","sako","samec","samizdat","samota","sanitka","sardinka","sasanka","satelit","sazba","sazenice","sbor","schovat","sebranka","secese","sedadlo","sediment","sedlo","sehnat","sejmout","sekera","sekta","sekunda","sekvoje","semeno","seno","servis","sesadit","seshora","seskok","seslat","sestra","sesuv","sesypat","setba","setina","setkat","setnout","setrvat","sever","seznam","shoda","shrnout","sifon","silnice","sirka","sirotek","sirup","situace","skafandr","skalisko","skanzen","skaut","skeptik","skica","skladba","sklenice","sklo","skluz","skoba","skokan","skoro","skripta","skrz","skupina","skvost","skvrna","slabika","sladidlo","slanina","slast","slavnost","sledovat","slepec","sleva","slezina","slib","slina","sliznice","slon","sloupek","slovo","sluch","sluha","slunce","slupka","slza","smaragd","smetana","smilstvo","smlouva","smog","smrad","smrk","smrtka","smutek","smysl","snad","snaha","snob","sobota","socha","sodovka","sokol","sopka","sotva","souboj","soucit","soudce","souhlas","soulad","soumrak","souprava","soused","soutok","souviset","spalovna","spasitel","spis","splav","spodek","spojenec","spolu","sponzor","spornost","spousta","sprcha","spustit","sranda","sraz","srdce","srna","srnec","srovnat","srpen","srst","srub","stanice","starosta","statika","stavba","stehno","stezka","stodola","stolek","stopa","storno","stoupat","strach","stres","strhnout","strom","struna","studna","stupnice","stvol","styk","subjekt","subtropy","suchar","sudost","sukno","sundat","sunout","surikata","surovina","svah","svalstvo","svetr","svatba","svazek","svisle","svitek","svoboda","svodidlo","svorka","svrab","sykavka","sykot","synek","synovec","sypat","sypkost","syrovost","sysel","sytost","tabletka","tabule","tahoun","tajemno","tajfun","tajga","tajit","tajnost","taktika","tamhle","tampon","tancovat","tanec","tanker","tapeta","tavenina","tazatel","technika","tehdy","tekutina","telefon","temnota","tendence","tenista","tenor","teplota","tepna","teprve","terapie","termoska","textil","ticho","tiskopis","titulek","tkadlec","tkanina","tlapka","tleskat","tlukot","tlupa","tmel","toaleta","topinka","topol","torzo","touha","toulec","tradice","traktor","tramp","trasa","traverza","trefit","trest","trezor","trhavina","trhlina","trochu","trojice","troska","trouba","trpce","trpitel","trpkost","trubec","truchlit","truhlice","trus","trvat","tudy","tuhnout","tuhost","tundra","turista","turnaj","tuzemsko","tvaroh","tvorba","tvrdost","tvrz","tygr","tykev","ubohost","uboze","ubrat","ubrousek","ubrus","ubytovna","ucho","uctivost","udivit","uhradit","ujednat","ujistit","ujmout","ukazatel","uklidnit","uklonit","ukotvit","ukrojit","ulice","ulita","ulovit","umyvadlo","unavit","uniforma","uniknout","upadnout","uplatnit","uplynout","upoutat","upravit","uran","urazit","usednout","usilovat","usmrtit","usnadnit","usnout","usoudit","ustlat","ustrnout","utahovat","utkat","utlumit","utonout","utopenec","utrousit","uvalit","uvolnit","uvozovka","uzdravit","uzel","uzenina","uzlina","uznat","vagon","valcha","valoun","vana","vandal","vanilka","varan","varhany","varovat","vcelku","vchod","vdova","vedro","vegetace","vejce","velbloud","veletrh","velitel","velmoc","velryba","venkov","veranda","verze","veselka","veskrze","vesnice","vespodu","vesta","veterina","veverka","vibrace","vichr","videohra","vidina","vidle","vila","vinice","viset","vitalita","vize","vizitka","vjezd","vklad","vkus","vlajka","vlak","vlasec","vlevo","vlhkost","vliv","vlnovka","vloupat","vnucovat","vnuk","voda","vodivost","vodoznak","vodstvo","vojensky","vojna","vojsko","volant","volba","volit","volno","voskovka","vozidlo","vozovna","vpravo","vrabec","vracet","vrah","vrata","vrba","vrcholek","vrhat","vrstva","vrtule","vsadit","vstoupit","vstup","vtip","vybavit","vybrat","vychovat","vydat","vydra","vyfotit","vyhledat","vyhnout","vyhodit","vyhradit","vyhubit","vyjasnit","vyjet","vyjmout","vyklopit","vykonat","vylekat","vymazat","vymezit","vymizet","vymyslet","vynechat","vynikat","vynutit","vypadat","vyplatit","vypravit","vypustit","vyrazit","vyrovnat","vyrvat","vyslovit","vysoko","vystavit","vysunout","vysypat","vytasit","vytesat","vytratit","vyvinout","vyvolat","vyvrhel","vyzdobit","vyznat","vzadu","vzbudit","vzchopit","vzdor","vzduch","vzdychat","vzestup","vzhledem","vzkaz","vzlykat","vznik","vzorek","vzpoura","vztah","vztek","xylofon","zabrat","zabydlet","zachovat","zadarmo","zadusit","zafoukat","zahltit","zahodit","zahrada","zahynout","zajatec","zajet","zajistit","zaklepat","zakoupit","zalepit","zamezit","zamotat","zamyslet","zanechat","zanikat","zaplatit","zapojit","zapsat","zarazit","zastavit","zasunout","zatajit","zatemnit","zatknout","zaujmout","zavalit","zavelet","zavinit","zavolat","zavrtat","zazvonit","zbavit","zbrusu","zbudovat","zbytek","zdaleka","zdarma","zdatnost","zdivo","zdobit","zdroj","zdvih","zdymadlo","zelenina","zeman","zemina","zeptat","zezadu","zezdola","zhatit","zhltnout","zhluboka","zhotovit","zhruba","zima","zimnice","zjemnit","zklamat","zkoumat","zkratka","zkumavka","zlato","zlehka","zloba","zlom","zlost","zlozvyk","zmapovat","zmar","zmatek","zmije","zmizet","zmocnit","zmodrat","zmrzlina","zmutovat","znak","znalost","znamenat","znovu","zobrazit","zotavit","zoubek","zoufale","zplodit","zpomalit","zprava","zprostit","zprudka","zprvu","zrada","zranit","zrcadlo","zrnitost","zrno","zrovna","zrychlit","zrzavost","zticha","ztratit","zubovina","zubr","zvednout","zvenku","zvesela","zvon","zvrat","zvukovod","zvyk"]')
            },
            9237: e => {
                "use strict";
                e.exports = JSON.parse('["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"]')
            },
            1707: e => {
                "use strict";
                e.exports = JSON.parse('["abaisser","abandon","abdiquer","abeille","abolir","aborder","aboutir","aboyer","abrasif","abreuver","abriter","abroger","abrupt","absence","absolu","absurde","abusif","abyssal","académie","acajou","acarien","accabler","accepter","acclamer","accolade","accroche","accuser","acerbe","achat","acheter","aciduler","acier","acompte","acquérir","acronyme","acteur","actif","actuel","adepte","adéquat","adhésif","adjectif","adjuger","admettre","admirer","adopter","adorer","adoucir","adresse","adroit","adulte","adverbe","aérer","aéronef","affaire","affecter","affiche","affreux","affubler","agacer","agencer","agile","agiter","agrafer","agréable","agrume","aider","aiguille","ailier","aimable","aisance","ajouter","ajuster","alarmer","alchimie","alerte","algèbre","algue","aliéner","aliment","alléger","alliage","allouer","allumer","alourdir","alpaga","altesse","alvéole","amateur","ambigu","ambre","aménager","amertume","amidon","amiral","amorcer","amour","amovible","amphibie","ampleur","amusant","analyse","anaphore","anarchie","anatomie","ancien","anéantir","angle","angoisse","anguleux","animal","annexer","annonce","annuel","anodin","anomalie","anonyme","anormal","antenne","antidote","anxieux","apaiser","apéritif","aplanir","apologie","appareil","appeler","apporter","appuyer","aquarium","aqueduc","arbitre","arbuste","ardeur","ardoise","argent","arlequin","armature","armement","armoire","armure","arpenter","arracher","arriver","arroser","arsenic","artériel","article","aspect","asphalte","aspirer","assaut","asservir","assiette","associer","assurer","asticot","astre","astuce","atelier","atome","atrium","atroce","attaque","attentif","attirer","attraper","aubaine","auberge","audace","audible","augurer","aurore","automne","autruche","avaler","avancer","avarice","avenir","averse","aveugle","aviateur","avide","avion","aviser","avoine","avouer","avril","axial","axiome","badge","bafouer","bagage","baguette","baignade","balancer","balcon","baleine","balisage","bambin","bancaire","bandage","banlieue","bannière","banquier","barbier","baril","baron","barque","barrage","bassin","bastion","bataille","bateau","batterie","baudrier","bavarder","belette","bélier","belote","bénéfice","berceau","berger","berline","bermuda","besace","besogne","bétail","beurre","biberon","bicycle","bidule","bijou","bilan","bilingue","billard","binaire","biologie","biopsie","biotype","biscuit","bison","bistouri","bitume","bizarre","blafard","blague","blanchir","blessant","blinder","blond","bloquer","blouson","bobard","bobine","boire","boiser","bolide","bonbon","bondir","bonheur","bonifier","bonus","bordure","borne","botte","boucle","boueux","bougie","boulon","bouquin","bourse","boussole","boutique","boxeur","branche","brasier","brave","brebis","brèche","breuvage","bricoler","brigade","brillant","brioche","brique","brochure","broder","bronzer","brousse","broyeur","brume","brusque","brutal","bruyant","buffle","buisson","bulletin","bureau","burin","bustier","butiner","butoir","buvable","buvette","cabanon","cabine","cachette","cadeau","cadre","caféine","caillou","caisson","calculer","calepin","calibre","calmer","calomnie","calvaire","camarade","caméra","camion","campagne","canal","caneton","canon","cantine","canular","capable","caporal","caprice","capsule","capter","capuche","carabine","carbone","caresser","caribou","carnage","carotte","carreau","carton","cascade","casier","casque","cassure","causer","caution","cavalier","caverne","caviar","cédille","ceinture","céleste","cellule","cendrier","censurer","central","cercle","cérébral","cerise","cerner","cerveau","cesser","chagrin","chaise","chaleur","chambre","chance","chapitre","charbon","chasseur","chaton","chausson","chavirer","chemise","chenille","chéquier","chercher","cheval","chien","chiffre","chignon","chimère","chiot","chlorure","chocolat","choisir","chose","chouette","chrome","chute","cigare","cigogne","cimenter","cinéma","cintrer","circuler","cirer","cirque","citerne","citoyen","citron","civil","clairon","clameur","claquer","classe","clavier","client","cligner","climat","clivage","cloche","clonage","cloporte","cobalt","cobra","cocasse","cocotier","coder","codifier","coffre","cogner","cohésion","coiffer","coincer","colère","colibri","colline","colmater","colonel","combat","comédie","commande","compact","concert","conduire","confier","congeler","connoter","consonne","contact","convexe","copain","copie","corail","corbeau","cordage","corniche","corpus","correct","cortège","cosmique","costume","coton","coude","coupure","courage","couteau","couvrir","coyote","crabe","crainte","cravate","crayon","créature","créditer","crémeux","creuser","crevette","cribler","crier","cristal","critère","croire","croquer","crotale","crucial","cruel","crypter","cubique","cueillir","cuillère","cuisine","cuivre","culminer","cultiver","cumuler","cupide","curatif","curseur","cyanure","cycle","cylindre","cynique","daigner","damier","danger","danseur","dauphin","débattre","débiter","déborder","débrider","débutant","décaler","décembre","déchirer","décider","déclarer","décorer","décrire","décupler","dédale","déductif","déesse","défensif","défiler","défrayer","dégager","dégivrer","déglutir","dégrafer","déjeuner","délice","déloger","demander","demeurer","démolir","dénicher","dénouer","dentelle","dénuder","départ","dépenser","déphaser","déplacer","déposer","déranger","dérober","désastre","descente","désert","désigner","désobéir","dessiner","destrier","détacher","détester","détourer","détresse","devancer","devenir","deviner","devoir","diable","dialogue","diamant","dicter","différer","digérer","digital","digne","diluer","dimanche","diminuer","dioxyde","directif","diriger","discuter","disposer","dissiper","distance","divertir","diviser","docile","docteur","dogme","doigt","domaine","domicile","dompter","donateur","donjon","donner","dopamine","dortoir","dorure","dosage","doseur","dossier","dotation","douanier","double","douceur","douter","doyen","dragon","draper","dresser","dribbler","droiture","duperie","duplexe","durable","durcir","dynastie","éblouir","écarter","écharpe","échelle","éclairer","éclipse","éclore","écluse","école","économie","écorce","écouter","écraser","écrémer","écrivain","écrou","écume","écureuil","édifier","éduquer","effacer","effectif","effigie","effort","effrayer","effusion","égaliser","égarer","éjecter","élaborer","élargir","électron","élégant","éléphant","élève","éligible","élitisme","éloge","élucider","éluder","emballer","embellir","embryon","émeraude","émission","emmener","émotion","émouvoir","empereur","employer","emporter","emprise","émulsion","encadrer","enchère","enclave","encoche","endiguer","endosser","endroit","enduire","énergie","enfance","enfermer","enfouir","engager","engin","englober","énigme","enjamber","enjeu","enlever","ennemi","ennuyeux","enrichir","enrobage","enseigne","entasser","entendre","entier","entourer","entraver","énumérer","envahir","enviable","envoyer","enzyme","éolien","épaissir","épargne","épatant","épaule","épicerie","épidémie","épier","épilogue","épine","épisode","épitaphe","époque","épreuve","éprouver","épuisant","équerre","équipe","ériger","érosion","erreur","éruption","escalier","espadon","espèce","espiègle","espoir","esprit","esquiver","essayer","essence","essieu","essorer","estime","estomac","estrade","étagère","étaler","étanche","étatique","éteindre","étendoir","éternel","éthanol","éthique","ethnie","étirer","étoffer","étoile","étonnant","étourdir","étrange","étroit","étude","euphorie","évaluer","évasion","éventail","évidence","éviter","évolutif","évoquer","exact","exagérer","exaucer","exceller","excitant","exclusif","excuse","exécuter","exemple","exercer","exhaler","exhorter","exigence","exiler","exister","exotique","expédier","explorer","exposer","exprimer","exquis","extensif","extraire","exulter","fable","fabuleux","facette","facile","facture","faiblir","falaise","fameux","famille","farceur","farfelu","farine","farouche","fasciner","fatal","fatigue","faucon","fautif","faveur","favori","fébrile","féconder","fédérer","félin","femme","fémur","fendoir","féodal","fermer","féroce","ferveur","festival","feuille","feutre","février","fiasco","ficeler","fictif","fidèle","figure","filature","filetage","filière","filleul","filmer","filou","filtrer","financer","finir","fiole","firme","fissure","fixer","flairer","flamme","flasque","flatteur","fléau","flèche","fleur","flexion","flocon","flore","fluctuer","fluide","fluvial","folie","fonderie","fongible","fontaine","forcer","forgeron","formuler","fortune","fossile","foudre","fougère","fouiller","foulure","fourmi","fragile","fraise","franchir","frapper","frayeur","frégate","freiner","frelon","frémir","frénésie","frère","friable","friction","frisson","frivole","froid","fromage","frontal","frotter","fruit","fugitif","fuite","fureur","furieux","furtif","fusion","futur","gagner","galaxie","galerie","gambader","garantir","gardien","garnir","garrigue","gazelle","gazon","géant","gélatine","gélule","gendarme","général","génie","genou","gentil","géologie","géomètre","géranium","germe","gestuel","geyser","gibier","gicler","girafe","givre","glace","glaive","glisser","globe","gloire","glorieux","golfeur","gomme","gonfler","gorge","gorille","goudron","gouffre","goulot","goupille","gourmand","goutte","graduel","graffiti","graine","grand","grappin","gratuit","gravir","grenat","griffure","griller","grimper","grogner","gronder","grotte","groupe","gruger","grutier","gruyère","guépard","guerrier","guide","guimauve","guitare","gustatif","gymnaste","gyrostat","habitude","hachoir","halte","hameau","hangar","hanneton","haricot","harmonie","harpon","hasard","hélium","hématome","herbe","hérisson","hermine","héron","hésiter","heureux","hiberner","hibou","hilarant","histoire","hiver","homard","hommage","homogène","honneur","honorer","honteux","horde","horizon","horloge","hormone","horrible","houleux","housse","hublot","huileux","humain","humble","humide","humour","hurler","hydromel","hygiène","hymne","hypnose","idylle","ignorer","iguane","illicite","illusion","image","imbiber","imiter","immense","immobile","immuable","impact","impérial","implorer","imposer","imprimer","imputer","incarner","incendie","incident","incliner","incolore","indexer","indice","inductif","inédit","ineptie","inexact","infini","infliger","informer","infusion","ingérer","inhaler","inhiber","injecter","injure","innocent","inoculer","inonder","inscrire","insecte","insigne","insolite","inspirer","instinct","insulter","intact","intense","intime","intrigue","intuitif","inutile","invasion","inventer","inviter","invoquer","ironique","irradier","irréel","irriter","isoler","ivoire","ivresse","jaguar","jaillir","jambe","janvier","jardin","jauger","jaune","javelot","jetable","jeton","jeudi","jeunesse","joindre","joncher","jongler","joueur","jouissif","journal","jovial","joyau","joyeux","jubiler","jugement","junior","jupon","juriste","justice","juteux","juvénile","kayak","kimono","kiosque","label","labial","labourer","lacérer","lactose","lagune","laine","laisser","laitier","lambeau","lamelle","lampe","lanceur","langage","lanterne","lapin","largeur","larme","laurier","lavabo","lavoir","lecture","légal","léger","légume","lessive","lettre","levier","lexique","lézard","liasse","libérer","libre","licence","licorne","liège","lièvre","ligature","ligoter","ligue","limer","limite","limonade","limpide","linéaire","lingot","lionceau","liquide","lisière","lister","lithium","litige","littoral","livreur","logique","lointain","loisir","lombric","loterie","louer","lourd","loutre","louve","loyal","lubie","lucide","lucratif","lueur","lugubre","luisant","lumière","lunaire","lundi","luron","lutter","luxueux","machine","magasin","magenta","magique","maigre","maillon","maintien","mairie","maison","majorer","malaxer","maléfice","malheur","malice","mallette","mammouth","mandater","maniable","manquant","manteau","manuel","marathon","marbre","marchand","mardi","maritime","marqueur","marron","marteler","mascotte","massif","matériel","matière","matraque","maudire","maussade","mauve","maximal","méchant","méconnu","médaille","médecin","méditer","méduse","meilleur","mélange","mélodie","membre","mémoire","menacer","mener","menhir","mensonge","mentor","mercredi","mérite","merle","messager","mesure","métal","météore","méthode","métier","meuble","miauler","microbe","miette","mignon","migrer","milieu","million","mimique","mince","minéral","minimal","minorer","minute","miracle","miroiter","missile","mixte","mobile","moderne","moelleux","mondial","moniteur","monnaie","monotone","monstre","montagne","monument","moqueur","morceau","morsure","mortier","moteur","motif","mouche","moufle","moulin","mousson","mouton","mouvant","multiple","munition","muraille","murène","murmure","muscle","muséum","musicien","mutation","muter","mutuel","myriade","myrtille","mystère","mythique","nageur","nappe","narquois","narrer","natation","nation","nature","naufrage","nautique","navire","nébuleux","nectar","néfaste","négation","négliger","négocier","neige","nerveux","nettoyer","neurone","neutron","neveu","niche","nickel","nitrate","niveau","noble","nocif","nocturne","noirceur","noisette","nomade","nombreux","nommer","normatif","notable","notifier","notoire","nourrir","nouveau","novateur","novembre","novice","nuage","nuancer","nuire","nuisible","numéro","nuptial","nuque","nutritif","obéir","objectif","obliger","obscur","observer","obstacle","obtenir","obturer","occasion","occuper","océan","octobre","octroyer","octupler","oculaire","odeur","odorant","offenser","officier","offrir","ogive","oiseau","oisillon","olfactif","olivier","ombrage","omettre","onctueux","onduler","onéreux","onirique","opale","opaque","opérer","opinion","opportun","opprimer","opter","optique","orageux","orange","orbite","ordonner","oreille","organe","orgueil","orifice","ornement","orque","ortie","osciller","osmose","ossature","otarie","ouragan","ourson","outil","outrager","ouvrage","ovation","oxyde","oxygène","ozone","paisible","palace","palmarès","palourde","palper","panache","panda","pangolin","paniquer","panneau","panorama","pantalon","papaye","papier","papoter","papyrus","paradoxe","parcelle","paresse","parfumer","parler","parole","parrain","parsemer","partager","parure","parvenir","passion","pastèque","paternel","patience","patron","pavillon","pavoiser","payer","paysage","peigne","peintre","pelage","pélican","pelle","pelouse","peluche","pendule","pénétrer","pénible","pensif","pénurie","pépite","péplum","perdrix","perforer","période","permuter","perplexe","persil","perte","peser","pétale","petit","pétrir","peuple","pharaon","phobie","phoque","photon","phrase","physique","piano","pictural","pièce","pierre","pieuvre","pilote","pinceau","pipette","piquer","pirogue","piscine","piston","pivoter","pixel","pizza","placard","plafond","plaisir","planer","plaque","plastron","plateau","pleurer","plexus","pliage","plomb","plonger","pluie","plumage","pochette","poésie","poète","pointe","poirier","poisson","poivre","polaire","policier","pollen","polygone","pommade","pompier","ponctuel","pondérer","poney","portique","position","posséder","posture","potager","poteau","potion","pouce","poulain","poumon","pourpre","poussin","pouvoir","prairie","pratique","précieux","prédire","préfixe","prélude","prénom","présence","prétexte","prévoir","primitif","prince","prison","priver","problème","procéder","prodige","profond","progrès","proie","projeter","prologue","promener","propre","prospère","protéger","prouesse","proverbe","prudence","pruneau","psychose","public","puceron","puiser","pulpe","pulsar","punaise","punitif","pupitre","purifier","puzzle","pyramide","quasar","querelle","question","quiétude","quitter","quotient","racine","raconter","radieux","ragondin","raideur","raisin","ralentir","rallonge","ramasser","rapide","rasage","ratisser","ravager","ravin","rayonner","réactif","réagir","réaliser","réanimer","recevoir","réciter","réclamer","récolter","recruter","reculer","recycler","rédiger","redouter","refaire","réflexe","réformer","refrain","refuge","régalien","région","réglage","régulier","réitérer","rejeter","rejouer","relatif","relever","relief","remarque","remède","remise","remonter","remplir","remuer","renard","renfort","renifler","renoncer","rentrer","renvoi","replier","reporter","reprise","reptile","requin","réserve","résineux","résoudre","respect","rester","résultat","rétablir","retenir","réticule","retomber","retracer","réunion","réussir","revanche","revivre","révolte","révulsif","richesse","rideau","rieur","rigide","rigoler","rincer","riposter","risible","risque","rituel","rival","rivière","rocheux","romance","rompre","ronce","rondin","roseau","rosier","rotatif","rotor","rotule","rouge","rouille","rouleau","routine","royaume","ruban","rubis","ruche","ruelle","rugueux","ruiner","ruisseau","ruser","rustique","rythme","sabler","saboter","sabre","sacoche","safari","sagesse","saisir","salade","salive","salon","saluer","samedi","sanction","sanglier","sarcasme","sardine","saturer","saugrenu","saumon","sauter","sauvage","savant","savonner","scalpel","scandale","scélérat","scénario","sceptre","schéma","science","scinder","score","scrutin","sculpter","séance","sécable","sécher","secouer","sécréter","sédatif","séduire","seigneur","séjour","sélectif","semaine","sembler","semence","séminal","sénateur","sensible","sentence","séparer","séquence","serein","sergent","sérieux","serrure","sérum","service","sésame","sévir","sevrage","sextuple","sidéral","siècle","siéger","siffler","sigle","signal","silence","silicium","simple","sincère","sinistre","siphon","sirop","sismique","situer","skier","social","socle","sodium","soigneux","soldat","soleil","solitude","soluble","sombre","sommeil","somnoler","sonde","songeur","sonnette","sonore","sorcier","sortir","sosie","sottise","soucieux","soudure","souffle","soulever","soupape","source","soutirer","souvenir","spacieux","spatial","spécial","sphère","spiral","stable","station","sternum","stimulus","stipuler","strict","studieux","stupeur","styliste","sublime","substrat","subtil","subvenir","succès","sucre","suffixe","suggérer","suiveur","sulfate","superbe","supplier","surface","suricate","surmener","surprise","sursaut","survie","suspect","syllabe","symbole","symétrie","synapse","syntaxe","système","tabac","tablier","tactile","tailler","talent","talisman","talonner","tambour","tamiser","tangible","tapis","taquiner","tarder","tarif","tartine","tasse","tatami","tatouage","taupe","taureau","taxer","témoin","temporel","tenaille","tendre","teneur","tenir","tension","terminer","terne","terrible","tétine","texte","thème","théorie","thérapie","thorax","tibia","tiède","timide","tirelire","tiroir","tissu","titane","titre","tituber","toboggan","tolérant","tomate","tonique","tonneau","toponyme","torche","tordre","tornade","torpille","torrent","torse","tortue","totem","toucher","tournage","tousser","toxine","traction","trafic","tragique","trahir","train","trancher","travail","trèfle","tremper","trésor","treuil","triage","tribunal","tricoter","trilogie","triomphe","tripler","triturer","trivial","trombone","tronc","tropical","troupeau","tuile","tulipe","tumulte","tunnel","turbine","tuteur","tutoyer","tuyau","tympan","typhon","typique","tyran","ubuesque","ultime","ultrason","unanime","unifier","union","unique","unitaire","univers","uranium","urbain","urticant","usage","usine","usuel","usure","utile","utopie","vacarme","vaccin","vagabond","vague","vaillant","vaincre","vaisseau","valable","valise","vallon","valve","vampire","vanille","vapeur","varier","vaseux","vassal","vaste","vecteur","vedette","végétal","véhicule","veinard","véloce","vendredi","vénérer","venger","venimeux","ventouse","verdure","vérin","vernir","verrou","verser","vertu","veston","vétéran","vétuste","vexant","vexer","viaduc","viande","victoire","vidange","vidéo","vignette","vigueur","vilain","village","vinaigre","violon","vipère","virement","virtuose","virus","visage","viseur","vision","visqueux","visuel","vital","vitesse","viticole","vitrine","vivace","vivipare","vocation","voguer","voile","voisin","voiture","volaille","volcan","voltiger","volume","vorace","vortex","voter","vouloir","voyage","voyelle","wagon","xénon","yacht","zèbre","zénith","zeste","zoologie"]')
            },
            6709: e => {
                "use strict";
                e.exports = JSON.parse('["abaco","abbaglio","abbinato","abete","abisso","abolire","abrasivo","abrogato","accadere","accenno","accusato","acetone","achille","acido","acqua","acre","acrilico","acrobata","acuto","adagio","addebito","addome","adeguato","aderire","adipe","adottare","adulare","affabile","affetto","affisso","affranto","aforisma","afoso","africano","agave","agente","agevole","aggancio","agire","agitare","agonismo","agricolo","agrumeto","aguzzo","alabarda","alato","albatro","alberato","albo","albume","alce","alcolico","alettone","alfa","algebra","aliante","alibi","alimento","allagato","allegro","allievo","allodola","allusivo","almeno","alogeno","alpaca","alpestre","altalena","alterno","alticcio","altrove","alunno","alveolo","alzare","amalgama","amanita","amarena","ambito","ambrato","ameba","america","ametista","amico","ammasso","ammenda","ammirare","ammonito","amore","ampio","ampliare","amuleto","anacardo","anagrafe","analista","anarchia","anatra","anca","ancella","ancora","andare","andrea","anello","angelo","angolare","angusto","anima","annegare","annidato","anno","annuncio","anonimo","anticipo","anzi","apatico","apertura","apode","apparire","appetito","appoggio","approdo","appunto","aprile","arabica","arachide","aragosta","araldica","arancio","aratura","arazzo","arbitro","archivio","ardito","arenile","argento","argine","arguto","aria","armonia","arnese","arredato","arringa","arrosto","arsenico","arso","artefice","arzillo","asciutto","ascolto","asepsi","asettico","asfalto","asino","asola","aspirato","aspro","assaggio","asse","assoluto","assurdo","asta","astenuto","astice","astratto","atavico","ateismo","atomico","atono","attesa","attivare","attorno","attrito","attuale","ausilio","austria","autista","autonomo","autunno","avanzato","avere","avvenire","avviso","avvolgere","azione","azoto","azzimo","azzurro","babele","baccano","bacino","baco","badessa","badilata","bagnato","baita","balcone","baldo","balena","ballata","balzano","bambino","bandire","baraonda","barbaro","barca","baritono","barlume","barocco","basilico","basso","batosta","battuto","baule","bava","bavosa","becco","beffa","belgio","belva","benda","benevole","benigno","benzina","bere","berlina","beta","bibita","bici","bidone","bifido","biga","bilancia","bimbo","binocolo","biologo","bipede","bipolare","birbante","birra","biscotto","bisesto","bisnonno","bisonte","bisturi","bizzarro","blando","blatta","bollito","bonifico","bordo","bosco","botanico","bottino","bozzolo","braccio","bradipo","brama","branca","bravura","bretella","brevetto","brezza","briglia","brillante","brindare","broccolo","brodo","bronzina","brullo","bruno","bubbone","buca","budino","buffone","buio","bulbo","buono","burlone","burrasca","bussola","busta","cadetto","caduco","calamaro","calcolo","calesse","calibro","calmo","caloria","cambusa","camerata","camicia","cammino","camola","campale","canapa","candela","cane","canino","canotto","cantina","capace","capello","capitolo","capogiro","cappero","capra","capsula","carapace","carcassa","cardo","carisma","carovana","carretto","cartolina","casaccio","cascata","caserma","caso","cassone","castello","casuale","catasta","catena","catrame","cauto","cavillo","cedibile","cedrata","cefalo","celebre","cellulare","cena","cenone","centesimo","ceramica","cercare","certo","cerume","cervello","cesoia","cespo","ceto","chela","chiaro","chicca","chiedere","chimera","china","chirurgo","chitarra","ciao","ciclismo","cifrare","cigno","cilindro","ciottolo","circa","cirrosi","citrico","cittadino","ciuffo","civetta","civile","classico","clinica","cloro","cocco","codardo","codice","coerente","cognome","collare","colmato","colore","colposo","coltivato","colza","coma","cometa","commando","comodo","computer","comune","conciso","condurre","conferma","congelare","coniuge","connesso","conoscere","consumo","continuo","convegno","coperto","copione","coppia","copricapo","corazza","cordata","coricato","cornice","corolla","corpo","corredo","corsia","cortese","cosmico","costante","cottura","covato","cratere","cravatta","creato","credere","cremoso","crescita","creta","criceto","crinale","crisi","critico","croce","cronaca","crostata","cruciale","crusca","cucire","cuculo","cugino","cullato","cupola","curatore","cursore","curvo","cuscino","custode","dado","daino","dalmata","damerino","daniela","dannoso","danzare","datato","davanti","davvero","debutto","decennio","deciso","declino","decollo","decreto","dedicato","definito","deforme","degno","delegare","delfino","delirio","delta","demenza","denotato","dentro","deposito","derapata","derivare","deroga","descritto","deserto","desiderio","desumere","detersivo","devoto","diametro","dicembre","diedro","difeso","diffuso","digerire","digitale","diluvio","dinamico","dinnanzi","dipinto","diploma","dipolo","diradare","dire","dirotto","dirupo","disagio","discreto","disfare","disgelo","disposto","distanza","disumano","dito","divano","divelto","dividere","divorato","doblone","docente","doganale","dogma","dolce","domato","domenica","dominare","dondolo","dono","dormire","dote","dottore","dovuto","dozzina","drago","druido","dubbio","dubitare","ducale","duna","duomo","duplice","duraturo","ebano","eccesso","ecco","eclissi","economia","edera","edicola","edile","editoria","educare","egemonia","egli","egoismo","egregio","elaborato","elargire","elegante","elencato","eletto","elevare","elfico","elica","elmo","elsa","eluso","emanato","emblema","emesso","emiro","emotivo","emozione","empirico","emulo","endemico","enduro","energia","enfasi","enoteca","entrare","enzima","epatite","epilogo","episodio","epocale","eppure","equatore","erario","erba","erboso","erede","eremita","erigere","ermetico","eroe","erosivo","errante","esagono","esame","esanime","esaudire","esca","esempio","esercito","esibito","esigente","esistere","esito","esofago","esortato","esoso","espanso","espresso","essenza","esso","esteso","estimare","estonia","estroso","esultare","etilico","etnico","etrusco","etto","euclideo","europa","evaso","evidenza","evitato","evoluto","evviva","fabbrica","faccenda","fachiro","falco","famiglia","fanale","fanfara","fango","fantasma","fare","farfalla","farinoso","farmaco","fascia","fastoso","fasullo","faticare","fato","favoloso","febbre","fecola","fede","fegato","felpa","feltro","femmina","fendere","fenomeno","fermento","ferro","fertile","fessura","festivo","fetta","feudo","fiaba","fiducia","fifa","figurato","filo","finanza","finestra","finire","fiore","fiscale","fisico","fiume","flacone","flamenco","flebo","flemma","florido","fluente","fluoro","fobico","focaccia","focoso","foderato","foglio","folata","folclore","folgore","fondente","fonetico","fonia","fontana","forbito","forchetta","foresta","formica","fornaio","foro","fortezza","forzare","fosfato","fosso","fracasso","frana","frassino","fratello","freccetta","frenata","fresco","frigo","frollino","fronde","frugale","frutta","fucilata","fucsia","fuggente","fulmine","fulvo","fumante","fumetto","fumoso","fune","funzione","fuoco","furbo","furgone","furore","fuso","futile","gabbiano","gaffe","galateo","gallina","galoppo","gambero","gamma","garanzia","garbo","garofano","garzone","gasdotto","gasolio","gastrico","gatto","gaudio","gazebo","gazzella","geco","gelatina","gelso","gemello","gemmato","gene","genitore","gennaio","genotipo","gergo","ghepardo","ghiaccio","ghisa","giallo","gilda","ginepro","giocare","gioiello","giorno","giove","girato","girone","gittata","giudizio","giurato","giusto","globulo","glutine","gnomo","gobba","golf","gomito","gommone","gonfio","gonna","governo","gracile","grado","grafico","grammo","grande","grattare","gravoso","grazia","greca","gregge","grifone","grigio","grinza","grotta","gruppo","guadagno","guaio","guanto","guardare","gufo","guidare","ibernato","icona","identico","idillio","idolo","idra","idrico","idrogeno","igiene","ignaro","ignorato","ilare","illeso","illogico","illudere","imballo","imbevuto","imbocco","imbuto","immane","immerso","immolato","impacco","impeto","impiego","importo","impronta","inalare","inarcare","inattivo","incanto","incendio","inchino","incisivo","incluso","incontro","incrocio","incubo","indagine","india","indole","inedito","infatti","infilare","inflitto","ingaggio","ingegno","inglese","ingordo","ingrosso","innesco","inodore","inoltrare","inondato","insano","insetto","insieme","insonnia","insulina","intasato","intero","intonaco","intuito","inumidire","invalido","invece","invito","iperbole","ipnotico","ipotesi","ippica","iride","irlanda","ironico","irrigato","irrorare","isolato","isotopo","isterico","istituto","istrice","italia","iterare","labbro","labirinto","lacca","lacerato","lacrima","lacuna","laddove","lago","lampo","lancetta","lanterna","lardoso","larga","laringe","lastra","latenza","latino","lattuga","lavagna","lavoro","legale","leggero","lembo","lentezza","lenza","leone","lepre","lesivo","lessato","lesto","letterale","leva","levigato","libero","lido","lievito","lilla","limatura","limitare","limpido","lineare","lingua","liquido","lira","lirica","lisca","lite","litigio","livrea","locanda","lode","logica","lombare","londra","longevo","loquace","lorenzo","loto","lotteria","luce","lucidato","lumaca","luminoso","lungo","lupo","luppolo","lusinga","lusso","lutto","macabro","macchina","macero","macinato","madama","magico","maglia","magnete","magro","maiolica","malafede","malgrado","malinteso","malsano","malto","malumore","mana","mancia","mandorla","mangiare","manifesto","mannaro","manovra","mansarda","mantide","manubrio","mappa","maratona","marcire","maretta","marmo","marsupio","maschera","massaia","mastino","materasso","matricola","mattone","maturo","mazurca","meandro","meccanico","mecenate","medesimo","meditare","mega","melassa","melis","melodia","meninge","meno","mensola","mercurio","merenda","merlo","meschino","mese","messere","mestolo","metallo","metodo","mettere","miagolare","mica","micelio","michele","microbo","midollo","miele","migliore","milano","milite","mimosa","minerale","mini","minore","mirino","mirtillo","miscela","missiva","misto","misurare","mitezza","mitigare","mitra","mittente","mnemonico","modello","modifica","modulo","mogano","mogio","mole","molosso","monastero","monco","mondina","monetario","monile","monotono","monsone","montato","monviso","mora","mordere","morsicato","mostro","motivato","motosega","motto","movenza","movimento","mozzo","mucca","mucosa","muffa","mughetto","mugnaio","mulatto","mulinello","multiplo","mummia","munto","muovere","murale","musa","muscolo","musica","mutevole","muto","nababbo","nafta","nanometro","narciso","narice","narrato","nascere","nastrare","naturale","nautica","naviglio","nebulosa","necrosi","negativo","negozio","nemmeno","neofita","neretto","nervo","nessuno","nettuno","neutrale","neve","nevrotico","nicchia","ninfa","nitido","nobile","nocivo","nodo","nome","nomina","nordico","normale","norvegese","nostrano","notare","notizia","notturno","novella","nucleo","nulla","numero","nuovo","nutrire","nuvola","nuziale","oasi","obbedire","obbligo","obelisco","oblio","obolo","obsoleto","occasione","occhio","occidente","occorrere","occultare","ocra","oculato","odierno","odorare","offerta","offrire","offuscato","oggetto","oggi","ognuno","olandese","olfatto","oliato","oliva","ologramma","oltre","omaggio","ombelico","ombra","omega","omissione","ondoso","onere","onice","onnivoro","onorevole","onta","operato","opinione","opposto","oracolo","orafo","ordine","orecchino","orefice","orfano","organico","origine","orizzonte","orma","ormeggio","ornativo","orologio","orrendo","orribile","ortensia","ortica","orzata","orzo","osare","oscurare","osmosi","ospedale","ospite","ossa","ossidare","ostacolo","oste","otite","otre","ottagono","ottimo","ottobre","ovale","ovest","ovino","oviparo","ovocito","ovunque","ovviare","ozio","pacchetto","pace","pacifico","padella","padrone","paese","paga","pagina","palazzina","palesare","pallido","palo","palude","pandoro","pannello","paolo","paonazzo","paprica","parabola","parcella","parere","pargolo","pari","parlato","parola","partire","parvenza","parziale","passivo","pasticca","patacca","patologia","pattume","pavone","peccato","pedalare","pedonale","peggio","peloso","penare","pendice","penisola","pennuto","penombra","pensare","pentola","pepe","pepita","perbene","percorso","perdonato","perforare","pergamena","periodo","permesso","perno","perplesso","persuaso","pertugio","pervaso","pesatore","pesista","peso","pestifero","petalo","pettine","petulante","pezzo","piacere","pianta","piattino","piccino","picozza","piega","pietra","piffero","pigiama","pigolio","pigro","pila","pilifero","pillola","pilota","pimpante","pineta","pinna","pinolo","pioggia","piombo","piramide","piretico","pirite","pirolisi","pitone","pizzico","placebo","planare","plasma","platano","plenario","pochezza","poderoso","podismo","poesia","poggiare","polenta","poligono","pollice","polmonite","polpetta","polso","poltrona","polvere","pomice","pomodoro","ponte","popoloso","porfido","poroso","porpora","porre","portata","posa","positivo","possesso","postulato","potassio","potere","pranzo","prassi","pratica","precluso","predica","prefisso","pregiato","prelievo","premere","prenotare","preparato","presenza","pretesto","prevalso","prima","principe","privato","problema","procura","produrre","profumo","progetto","prolunga","promessa","pronome","proposta","proroga","proteso","prova","prudente","prugna","prurito","psiche","pubblico","pudica","pugilato","pugno","pulce","pulito","pulsante","puntare","pupazzo","pupilla","puro","quadro","qualcosa","quasi","querela","quota","raccolto","raddoppio","radicale","radunato","raffica","ragazzo","ragione","ragno","ramarro","ramingo","ramo","randagio","rantolare","rapato","rapina","rappreso","rasatura","raschiato","rasente","rassegna","rastrello","rata","ravveduto","reale","recepire","recinto","recluta","recondito","recupero","reddito","redimere","regalato","registro","regola","regresso","relazione","remare","remoto","renna","replica","reprimere","reputare","resa","residente","responso","restauro","rete","retina","retorica","rettifica","revocato","riassunto","ribadire","ribelle","ribrezzo","ricarica","ricco","ricevere","riciclato","ricordo","ricreduto","ridicolo","ridurre","rifasare","riflesso","riforma","rifugio","rigare","rigettato","righello","rilassato","rilevato","rimanere","rimbalzo","rimedio","rimorchio","rinascita","rincaro","rinforzo","rinnovo","rinomato","rinsavito","rintocco","rinuncia","rinvenire","riparato","ripetuto","ripieno","riportare","ripresa","ripulire","risata","rischio","riserva","risibile","riso","rispetto","ristoro","risultato","risvolto","ritardo","ritegno","ritmico","ritrovo","riunione","riva","riverso","rivincita","rivolto","rizoma","roba","robotico","robusto","roccia","roco","rodaggio","rodere","roditore","rogito","rollio","romantico","rompere","ronzio","rosolare","rospo","rotante","rotondo","rotula","rovescio","rubizzo","rubrica","ruga","rullino","rumine","rumoroso","ruolo","rupe","russare","rustico","sabato","sabbiare","sabotato","sagoma","salasso","saldatura","salgemma","salivare","salmone","salone","saltare","saluto","salvo","sapere","sapido","saporito","saraceno","sarcasmo","sarto","sassoso","satellite","satira","satollo","saturno","savana","savio","saziato","sbadiglio","sbalzo","sbancato","sbarra","sbattere","sbavare","sbendare","sbirciare","sbloccato","sbocciato","sbrinare","sbruffone","sbuffare","scabroso","scadenza","scala","scambiare","scandalo","scapola","scarso","scatenare","scavato","scelto","scenico","scettro","scheda","schiena","sciarpa","scienza","scindere","scippo","sciroppo","scivolo","sclerare","scodella","scolpito","scomparto","sconforto","scoprire","scorta","scossone","scozzese","scriba","scrollare","scrutinio","scuderia","scultore","scuola","scuro","scusare","sdebitare","sdoganare","seccatura","secondo","sedano","seggiola","segnalato","segregato","seguito","selciato","selettivo","sella","selvaggio","semaforo","sembrare","seme","seminato","sempre","senso","sentire","sepolto","sequenza","serata","serbato","sereno","serio","serpente","serraglio","servire","sestina","setola","settimana","sfacelo","sfaldare","sfamato","sfarzoso","sfaticato","sfera","sfida","sfilato","sfinge","sfocato","sfoderare","sfogo","sfoltire","sforzato","sfratto","sfruttato","sfuggito","sfumare","sfuso","sgabello","sgarbato","sgonfiare","sgorbio","sgrassato","sguardo","sibilo","siccome","sierra","sigla","signore","silenzio","sillaba","simbolo","simpatico","simulato","sinfonia","singolo","sinistro","sino","sintesi","sinusoide","sipario","sisma","sistole","situato","slitta","slogatura","sloveno","smarrito","smemorato","smentito","smeraldo","smilzo","smontare","smottato","smussato","snellire","snervato","snodo","sobbalzo","sobrio","soccorso","sociale","sodale","soffitto","sogno","soldato","solenne","solido","sollazzo","solo","solubile","solvente","somatico","somma","sonda","sonetto","sonnifero","sopire","soppeso","sopra","sorgere","sorpasso","sorriso","sorso","sorteggio","sorvolato","sospiro","sosta","sottile","spada","spalla","spargere","spatola","spavento","spazzola","specie","spedire","spegnere","spelatura","speranza","spessore","spettrale","spezzato","spia","spigoloso","spillato","spinoso","spirale","splendido","sportivo","sposo","spranga","sprecare","spronato","spruzzo","spuntino","squillo","sradicare","srotolato","stabile","stacco","staffa","stagnare","stampato","stantio","starnuto","stasera","statuto","stelo","steppa","sterzo","stiletto","stima","stirpe","stivale","stizzoso","stonato","storico","strappo","stregato","stridulo","strozzare","strutto","stuccare","stufo","stupendo","subentro","succoso","sudore","suggerito","sugo","sultano","suonare","superbo","supporto","surgelato","surrogato","sussurro","sutura","svagare","svedese","sveglio","svelare","svenuto","svezia","sviluppo","svista","svizzera","svolta","svuotare","tabacco","tabulato","tacciare","taciturno","tale","talismano","tampone","tannino","tara","tardivo","targato","tariffa","tarpare","tartaruga","tasto","tattico","taverna","tavolata","tazza","teca","tecnico","telefono","temerario","tempo","temuto","tendone","tenero","tensione","tentacolo","teorema","terme","terrazzo","terzetto","tesi","tesserato","testato","tetro","tettoia","tifare","tigella","timbro","tinto","tipico","tipografo","tiraggio","tiro","titanio","titolo","titubante","tizio","tizzone","toccare","tollerare","tolto","tombola","tomo","tonfo","tonsilla","topazio","topologia","toppa","torba","tornare","torrone","tortora","toscano","tossire","tostatura","totano","trabocco","trachea","trafila","tragedia","tralcio","tramonto","transito","trapano","trarre","trasloco","trattato","trave","treccia","tremolio","trespolo","tributo","tricheco","trifoglio","trillo","trincea","trio","tristezza","triturato","trivella","tromba","trono","troppo","trottola","trovare","truccato","tubatura","tuffato","tulipano","tumulto","tunisia","turbare","turchino","tuta","tutela","ubicato","uccello","uccisore","udire","uditivo","uffa","ufficio","uguale","ulisse","ultimato","umano","umile","umorismo","uncinetto","ungere","ungherese","unicorno","unificato","unisono","unitario","unte","uovo","upupa","uragano","urgenza","urlo","usanza","usato","uscito","usignolo","usuraio","utensile","utilizzo","utopia","vacante","vaccinato","vagabondo","vagliato","valanga","valgo","valico","valletta","valoroso","valutare","valvola","vampata","vangare","vanitoso","vano","vantaggio","vanvera","vapore","varano","varcato","variante","vasca","vedetta","vedova","veduto","vegetale","veicolo","velcro","velina","velluto","veloce","venato","vendemmia","vento","verace","verbale","vergogna","verifica","vero","verruca","verticale","vescica","vessillo","vestale","veterano","vetrina","vetusto","viandante","vibrante","vicenda","vichingo","vicinanza","vidimare","vigilia","vigneto","vigore","vile","villano","vimini","vincitore","viola","vipera","virgola","virologo","virulento","viscoso","visione","vispo","vissuto","visura","vita","vitello","vittima","vivanda","vivido","viziare","voce","voga","volatile","volere","volpe","voragine","vulcano","zampogna","zanna","zappato","zattera","zavorra","zefiro","zelante","zelo","zenzero","zerbino","zibetto","zinco","zircone","zitto","zolla","zotico","zucchero","zufolo","zulu","zuppa"]')
            },
            5684: e => {
                "use strict";
                e.exports = JSON.parse('["あいこくしん","あいさつ","あいだ","あおぞら","あかちゃん","あきる","あけがた","あける","あこがれる","あさい","あさひ","あしあと","あじわう","あずかる","あずき","あそぶ","あたえる","あたためる","あたりまえ","あたる","あつい","あつかう","あっしゅく","あつまり","あつめる","あてな","あてはまる","あひる","あぶら","あぶる","あふれる","あまい","あまど","あまやかす","あまり","あみもの","あめりか","あやまる","あゆむ","あらいぐま","あらし","あらすじ","あらためる","あらゆる","あらわす","ありがとう","あわせる","あわてる","あんい","あんがい","あんこ","あんぜん","あんてい","あんない","あんまり","いいだす","いおん","いがい","いがく","いきおい","いきなり","いきもの","いきる","いくじ","いくぶん","いけばな","いけん","いこう","いこく","いこつ","いさましい","いさん","いしき","いじゅう","いじょう","いじわる","いずみ","いずれ","いせい","いせえび","いせかい","いせき","いぜん","いそうろう","いそがしい","いだい","いだく","いたずら","いたみ","いたりあ","いちおう","いちじ","いちど","いちば","いちぶ","いちりゅう","いつか","いっしゅん","いっせい","いっそう","いったん","いっち","いってい","いっぽう","いてざ","いてん","いどう","いとこ","いない","いなか","いねむり","いのち","いのる","いはつ","いばる","いはん","いびき","いひん","いふく","いへん","いほう","いみん","いもうと","いもたれ","いもり","いやがる","いやす","いよかん","いよく","いらい","いらすと","いりぐち","いりょう","いれい","いれもの","いれる","いろえんぴつ","いわい","いわう","いわかん","いわば","いわゆる","いんげんまめ","いんさつ","いんしょう","いんよう","うえき","うえる","うおざ","うがい","うかぶ","うかべる","うきわ","うくらいな","うくれれ","うけたまわる","うけつけ","うけとる","うけもつ","うける","うごかす","うごく","うこん","うさぎ","うしなう","うしろがみ","うすい","うすぎ","うすぐらい","うすめる","うせつ","うちあわせ","うちがわ","うちき","うちゅう","うっかり","うつくしい","うったえる","うつる","うどん","うなぎ","うなじ","うなずく","うなる","うねる","うのう","うぶげ","うぶごえ","うまれる","うめる","うもう","うやまう","うよく","うらがえす","うらぐち","うらない","うりあげ","うりきれ","うるさい","うれしい","うれゆき","うれる","うろこ","うわき","うわさ","うんこう","うんちん","うんてん","うんどう","えいえん","えいが","えいきょう","えいご","えいせい","えいぶん","えいよう","えいわ","えおり","えがお","えがく","えきたい","えくせる","えしゃく","えすて","えつらん","えのぐ","えほうまき","えほん","えまき","えもじ","えもの","えらい","えらぶ","えりあ","えんえん","えんかい","えんぎ","えんげき","えんしゅう","えんぜつ","えんそく","えんちょう","えんとつ","おいかける","おいこす","おいしい","おいつく","おうえん","おうさま","おうじ","おうせつ","おうたい","おうふく","おうべい","おうよう","おえる","おおい","おおう","おおどおり","おおや","おおよそ","おかえり","おかず","おがむ","おかわり","おぎなう","おきる","おくさま","おくじょう","おくりがな","おくる","おくれる","おこす","おこなう","おこる","おさえる","おさない","おさめる","おしいれ","おしえる","おじぎ","おじさん","おしゃれ","おそらく","おそわる","おたがい","おたく","おだやか","おちつく","おっと","おつり","おでかけ","おとしもの","おとなしい","おどり","おどろかす","おばさん","おまいり","おめでとう","おもいで","おもう","おもたい","おもちゃ","おやつ","おやゆび","およぼす","おらんだ","おろす","おんがく","おんけい","おんしゃ","おんせん","おんだん","おんちゅう","おんどけい","かあつ","かいが","がいき","がいけん","がいこう","かいさつ","かいしゃ","かいすいよく","かいぜん","かいぞうど","かいつう","かいてん","かいとう","かいふく","がいへき","かいほう","かいよう","がいらい","かいわ","かえる","かおり","かかえる","かがく","かがし","かがみ","かくご","かくとく","かざる","がぞう","かたい","かたち","がちょう","がっきゅう","がっこう","がっさん","がっしょう","かなざわし","かのう","がはく","かぶか","かほう","かほご","かまう","かまぼこ","かめれおん","かゆい","かようび","からい","かるい","かろう","かわく","かわら","がんか","かんけい","かんこう","かんしゃ","かんそう","かんたん","かんち","がんばる","きあい","きあつ","きいろ","ぎいん","きうい","きうん","きえる","きおう","きおく","きおち","きおん","きかい","きかく","きかんしゃ","ききて","きくばり","きくらげ","きけんせい","きこう","きこえる","きこく","きさい","きさく","きさま","きさらぎ","ぎじかがく","ぎしき","ぎじたいけん","ぎじにってい","ぎじゅつしゃ","きすう","きせい","きせき","きせつ","きそう","きぞく","きぞん","きたえる","きちょう","きつえん","ぎっちり","きつつき","きつね","きてい","きどう","きどく","きない","きなが","きなこ","きぬごし","きねん","きのう","きのした","きはく","きびしい","きひん","きふく","きぶん","きぼう","きほん","きまる","きみつ","きむずかしい","きめる","きもだめし","きもち","きもの","きゃく","きやく","ぎゅうにく","きよう","きょうりゅう","きらい","きらく","きりん","きれい","きれつ","きろく","ぎろん","きわめる","ぎんいろ","きんかくじ","きんじょ","きんようび","ぐあい","くいず","くうかん","くうき","くうぐん","くうこう","ぐうせい","くうそう","ぐうたら","くうふく","くうぼ","くかん","くきょう","くげん","ぐこう","くさい","くさき","くさばな","くさる","くしゃみ","くしょう","くすのき","くすりゆび","くせげ","くせん","ぐたいてき","くださる","くたびれる","くちこみ","くちさき","くつした","ぐっすり","くつろぐ","くとうてん","くどく","くなん","くねくね","くのう","くふう","くみあわせ","くみたてる","くめる","くやくしょ","くらす","くらべる","くるま","くれる","くろう","くわしい","ぐんかん","ぐんしょく","ぐんたい","ぐんて","けあな","けいかく","けいけん","けいこ","けいさつ","げいじゅつ","けいたい","げいのうじん","けいれき","けいろ","けおとす","けおりもの","げきか","げきげん","げきだん","げきちん","げきとつ","げきは","げきやく","げこう","げこくじょう","げざい","けさき","げざん","けしき","けしごむ","けしょう","げすと","けたば","けちゃっぷ","けちらす","けつあつ","けつい","けつえき","けっこん","けつじょ","けっせき","けってい","けつまつ","げつようび","げつれい","けつろん","げどく","けとばす","けとる","けなげ","けなす","けなみ","けぬき","げねつ","けねん","けはい","げひん","けぶかい","げぼく","けまり","けみかる","けむし","けむり","けもの","けらい","けろけろ","けわしい","けんい","けんえつ","けんお","けんか","げんき","けんげん","けんこう","けんさく","けんしゅう","けんすう","げんそう","けんちく","けんてい","けんとう","けんない","けんにん","げんぶつ","けんま","けんみん","けんめい","けんらん","けんり","こあくま","こいぬ","こいびと","ごうい","こうえん","こうおん","こうかん","ごうきゅう","ごうけい","こうこう","こうさい","こうじ","こうすい","ごうせい","こうそく","こうたい","こうちゃ","こうつう","こうてい","こうどう","こうない","こうはい","ごうほう","ごうまん","こうもく","こうりつ","こえる","こおり","ごかい","ごがつ","ごかん","こくご","こくさい","こくとう","こくない","こくはく","こぐま","こけい","こける","ここのか","こころ","こさめ","こしつ","こすう","こせい","こせき","こぜん","こそだて","こたい","こたえる","こたつ","こちょう","こっか","こつこつ","こつばん","こつぶ","こてい","こてん","ことがら","ことし","ことば","ことり","こなごな","こねこね","このまま","このみ","このよ","ごはん","こひつじ","こふう","こふん","こぼれる","ごまあぶら","こまかい","ごますり","こまつな","こまる","こむぎこ","こもじ","こもち","こもの","こもん","こやく","こやま","こゆう","こゆび","こよい","こよう","こりる","これくしょん","ころっけ","こわもて","こわれる","こんいん","こんかい","こんき","こんしゅう","こんすい","こんだて","こんとん","こんなん","こんびに","こんぽん","こんまけ","こんや","こんれい","こんわく","ざいえき","さいかい","さいきん","ざいげん","ざいこ","さいしょ","さいせい","ざいたく","ざいちゅう","さいてき","ざいりょう","さうな","さかいし","さがす","さかな","さかみち","さがる","さぎょう","さくし","さくひん","さくら","さこく","さこつ","さずかる","ざせき","さたん","さつえい","ざつおん","ざっか","ざつがく","さっきょく","ざっし","さつじん","ざっそう","さつたば","さつまいも","さてい","さといも","さとう","さとおや","さとし","さとる","さのう","さばく","さびしい","さべつ","さほう","さほど","さます","さみしい","さみだれ","さむけ","さめる","さやえんどう","さゆう","さよう","さよく","さらだ","ざるそば","さわやか","さわる","さんいん","さんか","さんきゃく","さんこう","さんさい","ざんしょ","さんすう","さんせい","さんそ","さんち","さんま","さんみ","さんらん","しあい","しあげ","しあさって","しあわせ","しいく","しいん","しうち","しえい","しおけ","しかい","しかく","じかん","しごと","しすう","じだい","したうけ","したぎ","したて","したみ","しちょう","しちりん","しっかり","しつじ","しつもん","してい","してき","してつ","じてん","じどう","しなぎれ","しなもの","しなん","しねま","しねん","しのぐ","しのぶ","しはい","しばかり","しはつ","しはらい","しはん","しひょう","しふく","じぶん","しへい","しほう","しほん","しまう","しまる","しみん","しむける","じむしょ","しめい","しめる","しもん","しゃいん","しゃうん","しゃおん","じゃがいも","しやくしょ","しゃくほう","しゃけん","しゃこ","しゃざい","しゃしん","しゃせん","しゃそう","しゃたい","しゃちょう","しゃっきん","じゃま","しゃりん","しゃれい","じゆう","じゅうしょ","しゅくはく","じゅしん","しゅっせき","しゅみ","しゅらば","じゅんばん","しょうかい","しょくたく","しょっけん","しょどう","しょもつ","しらせる","しらべる","しんか","しんこう","じんじゃ","しんせいじ","しんちく","しんりん","すあげ","すあし","すあな","ずあん","すいえい","すいか","すいとう","ずいぶん","すいようび","すうがく","すうじつ","すうせん","すおどり","すきま","すくう","すくない","すける","すごい","すこし","ずさん","すずしい","すすむ","すすめる","すっかり","ずっしり","ずっと","すてき","すてる","すねる","すのこ","すはだ","すばらしい","ずひょう","ずぶぬれ","すぶり","すふれ","すべて","すべる","ずほう","すぼん","すまい","すめし","すもう","すやき","すらすら","するめ","すれちがう","すろっと","すわる","すんぜん","すんぽう","せあぶら","せいかつ","せいげん","せいじ","せいよう","せおう","せかいかん","せきにん","せきむ","せきゆ","せきらんうん","せけん","せこう","せすじ","せたい","せたけ","せっかく","せっきゃく","ぜっく","せっけん","せっこつ","せっさたくま","せつぞく","せつだん","せつでん","せっぱん","せつび","せつぶん","せつめい","せつりつ","せなか","せのび","せはば","せびろ","せぼね","せまい","せまる","せめる","せもたれ","せりふ","ぜんあく","せんい","せんえい","せんか","せんきょ","せんく","せんげん","ぜんご","せんさい","せんしゅ","せんすい","せんせい","せんぞ","せんたく","せんちょう","せんてい","せんとう","せんぬき","せんねん","せんぱい","ぜんぶ","ぜんぽう","せんむ","せんめんじょ","せんもん","せんやく","せんゆう","せんよう","ぜんら","ぜんりゃく","せんれい","せんろ","そあく","そいとげる","そいね","そうがんきょう","そうき","そうご","そうしん","そうだん","そうなん","そうび","そうめん","そうり","そえもの","そえん","そがい","そげき","そこう","そこそこ","そざい","そしな","そせい","そせん","そそぐ","そだてる","そつう","そつえん","そっかん","そつぎょう","そっけつ","そっこう","そっせん","そっと","そとがわ","そとづら","そなえる","そなた","そふぼ","そぼく","そぼろ","そまつ","そまる","そむく","そむりえ","そめる","そもそも","そよかぜ","そらまめ","そろう","そんかい","そんけい","そんざい","そんしつ","そんぞく","そんちょう","ぞんび","ぞんぶん","そんみん","たあい","たいいん","たいうん","たいえき","たいおう","だいがく","たいき","たいぐう","たいけん","たいこ","たいざい","だいじょうぶ","だいすき","たいせつ","たいそう","だいたい","たいちょう","たいてい","だいどころ","たいない","たいねつ","たいのう","たいはん","だいひょう","たいふう","たいへん","たいほ","たいまつばな","たいみんぐ","たいむ","たいめん","たいやき","たいよう","たいら","たいりょく","たいる","たいわん","たうえ","たえる","たおす","たおる","たおれる","たかい","たかね","たきび","たくさん","たこく","たこやき","たさい","たしざん","だじゃれ","たすける","たずさわる","たそがれ","たたかう","たたく","ただしい","たたみ","たちばな","だっかい","だっきゃく","だっこ","だっしゅつ","だったい","たてる","たとえる","たなばた","たにん","たぬき","たのしみ","たはつ","たぶん","たべる","たぼう","たまご","たまる","だむる","ためいき","ためす","ためる","たもつ","たやすい","たよる","たらす","たりきほんがん","たりょう","たりる","たると","たれる","たれんと","たろっと","たわむれる","だんあつ","たんい","たんおん","たんか","たんき","たんけん","たんご","たんさん","たんじょうび","だんせい","たんそく","たんたい","だんち","たんてい","たんとう","だんな","たんにん","だんねつ","たんのう","たんぴん","だんぼう","たんまつ","たんめい","だんれつ","だんろ","だんわ","ちあい","ちあん","ちいき","ちいさい","ちえん","ちかい","ちから","ちきゅう","ちきん","ちけいず","ちけん","ちこく","ちさい","ちしき","ちしりょう","ちせい","ちそう","ちたい","ちたん","ちちおや","ちつじょ","ちてき","ちてん","ちぬき","ちぬり","ちのう","ちひょう","ちへいせん","ちほう","ちまた","ちみつ","ちみどろ","ちめいど","ちゃんこなべ","ちゅうい","ちゆりょく","ちょうし","ちょさくけん","ちらし","ちらみ","ちりがみ","ちりょう","ちるど","ちわわ","ちんたい","ちんもく","ついか","ついたち","つうか","つうじょう","つうはん","つうわ","つかう","つかれる","つくね","つくる","つけね","つける","つごう","つたえる","つづく","つつじ","つつむ","つとめる","つながる","つなみ","つねづね","つのる","つぶす","つまらない","つまる","つみき","つめたい","つもり","つもる","つよい","つるぼ","つるみく","つわもの","つわり","てあし","てあて","てあみ","ていおん","ていか","ていき","ていけい","ていこく","ていさつ","ていし","ていせい","ていたい","ていど","ていねい","ていひょう","ていへん","ていぼう","てうち","ておくれ","てきとう","てくび","でこぼこ","てさぎょう","てさげ","てすり","てそう","てちがい","てちょう","てつがく","てつづき","でっぱ","てつぼう","てつや","でぬかえ","てぬき","てぬぐい","てのひら","てはい","てぶくろ","てふだ","てほどき","てほん","てまえ","てまきずし","てみじか","てみやげ","てらす","てれび","てわけ","てわたし","でんあつ","てんいん","てんかい","てんき","てんぐ","てんけん","てんごく","てんさい","てんし","てんすう","でんち","てんてき","てんとう","てんない","てんぷら","てんぼうだい","てんめつ","てんらんかい","でんりょく","でんわ","どあい","といれ","どうかん","とうきゅう","どうぐ","とうし","とうむぎ","とおい","とおか","とおく","とおす","とおる","とかい","とかす","ときおり","ときどき","とくい","とくしゅう","とくてん","とくに","とくべつ","とけい","とける","とこや","とさか","としょかん","とそう","とたん","とちゅう","とっきゅう","とっくん","とつぜん","とつにゅう","とどける","ととのえる","とない","となえる","となり","とのさま","とばす","どぶがわ","とほう","とまる","とめる","ともだち","ともる","どようび","とらえる","とんかつ","どんぶり","ないかく","ないこう","ないしょ","ないす","ないせん","ないそう","なおす","ながい","なくす","なげる","なこうど","なさけ","なたでここ","なっとう","なつやすみ","ななおし","なにごと","なにもの","なにわ","なのか","なふだ","なまいき","なまえ","なまみ","なみだ","なめらか","なめる","なやむ","ならう","ならび","ならぶ","なれる","なわとび","なわばり","にあう","にいがた","にうけ","におい","にかい","にがて","にきび","にくしみ","にくまん","にげる","にさんかたんそ","にしき","にせもの","にちじょう","にちようび","にっか","にっき","にっけい","にっこう","にっさん","にっしょく","にっすう","にっせき","にってい","になう","にほん","にまめ","にもつ","にやり","にゅういん","にりんしゃ","にわとり","にんい","にんか","にんき","にんげん","にんしき","にんずう","にんそう","にんたい","にんち","にんてい","にんにく","にんぷ","にんまり","にんむ","にんめい","にんよう","ぬいくぎ","ぬかす","ぬぐいとる","ぬぐう","ぬくもり","ぬすむ","ぬまえび","ぬめり","ぬらす","ぬんちゃく","ねあげ","ねいき","ねいる","ねいろ","ねぐせ","ねくたい","ねくら","ねこぜ","ねこむ","ねさげ","ねすごす","ねそべる","ねだん","ねつい","ねっしん","ねつぞう","ねったいぎょ","ねぶそく","ねふだ","ねぼう","ねほりはほり","ねまき","ねまわし","ねみみ","ねむい","ねむたい","ねもと","ねらう","ねわざ","ねんいり","ねんおし","ねんかん","ねんきん","ねんぐ","ねんざ","ねんし","ねんちゃく","ねんど","ねんぴ","ねんぶつ","ねんまつ","ねんりょう","ねんれい","のいず","のおづま","のがす","のきなみ","のこぎり","のこす","のこる","のせる","のぞく","のぞむ","のたまう","のちほど","のっく","のばす","のはら","のべる","のぼる","のみもの","のやま","のらいぬ","のらねこ","のりもの","のりゆき","のれん","のんき","ばあい","はあく","ばあさん","ばいか","ばいく","はいけん","はいご","はいしん","はいすい","はいせん","はいそう","はいち","ばいばい","はいれつ","はえる","はおる","はかい","ばかり","はかる","はくしゅ","はけん","はこぶ","はさみ","はさん","はしご","ばしょ","はしる","はせる","ぱそこん","はそん","はたん","はちみつ","はつおん","はっかく","はづき","はっきり","はっくつ","はっけん","はっこう","はっさん","はっしん","はったつ","はっちゅう","はってん","はっぴょう","はっぽう","はなす","はなび","はにかむ","はぶらし","はみがき","はむかう","はめつ","はやい","はやし","はらう","はろうぃん","はわい","はんい","はんえい","はんおん","はんかく","はんきょう","ばんぐみ","はんこ","はんしゃ","はんすう","はんだん","ぱんち","ぱんつ","はんてい","はんとし","はんのう","はんぱ","はんぶん","はんぺん","はんぼうき","はんめい","はんらん","はんろん","ひいき","ひうん","ひえる","ひかく","ひかり","ひかる","ひかん","ひくい","ひけつ","ひこうき","ひこく","ひさい","ひさしぶり","ひさん","びじゅつかん","ひしょ","ひそか","ひそむ","ひたむき","ひだり","ひたる","ひつぎ","ひっこし","ひっし","ひつじゅひん","ひっす","ひつぜん","ぴったり","ぴっちり","ひつよう","ひてい","ひとごみ","ひなまつり","ひなん","ひねる","ひはん","ひびく","ひひょう","ひほう","ひまわり","ひまん","ひみつ","ひめい","ひめじし","ひやけ","ひやす","ひよう","びょうき","ひらがな","ひらく","ひりつ","ひりょう","ひるま","ひるやすみ","ひれい","ひろい","ひろう","ひろき","ひろゆき","ひんかく","ひんけつ","ひんこん","ひんしゅ","ひんそう","ぴんち","ひんぱん","びんぼう","ふあん","ふいうち","ふうけい","ふうせん","ぷうたろう","ふうとう","ふうふ","ふえる","ふおん","ふかい","ふきん","ふくざつ","ふくぶくろ","ふこう","ふさい","ふしぎ","ふじみ","ふすま","ふせい","ふせぐ","ふそく","ぶたにく","ふたん","ふちょう","ふつう","ふつか","ふっかつ","ふっき","ふっこく","ぶどう","ふとる","ふとん","ふのう","ふはい","ふひょう","ふへん","ふまん","ふみん","ふめつ","ふめん","ふよう","ふりこ","ふりる","ふるい","ふんいき","ぶんがく","ぶんぐ","ふんしつ","ぶんせき","ふんそう","ぶんぽう","へいあん","へいおん","へいがい","へいき","へいげん","へいこう","へいさ","へいしゃ","へいせつ","へいそ","へいたく","へいてん","へいねつ","へいわ","へきが","へこむ","べにいろ","べにしょうが","へらす","へんかん","べんきょう","べんごし","へんさい","へんたい","べんり","ほあん","ほいく","ぼうぎょ","ほうこく","ほうそう","ほうほう","ほうもん","ほうりつ","ほえる","ほおん","ほかん","ほきょう","ぼきん","ほくろ","ほけつ","ほけん","ほこう","ほこる","ほしい","ほしつ","ほしゅ","ほしょう","ほせい","ほそい","ほそく","ほたて","ほたる","ぽちぶくろ","ほっきょく","ほっさ","ほったん","ほとんど","ほめる","ほんい","ほんき","ほんけ","ほんしつ","ほんやく","まいにち","まかい","まかせる","まがる","まける","まこと","まさつ","まじめ","ますく","まぜる","まつり","まとめ","まなぶ","まぬけ","まねく","まほう","まもる","まゆげ","まよう","まろやか","まわす","まわり","まわる","まんが","まんきつ","まんぞく","まんなか","みいら","みうち","みえる","みがく","みかた","みかん","みけん","みこん","みじかい","みすい","みすえる","みせる","みっか","みつかる","みつける","みてい","みとめる","みなと","みなみかさい","みねらる","みのう","みのがす","みほん","みもと","みやげ","みらい","みりょく","みわく","みんか","みんぞく","むいか","むえき","むえん","むかい","むかう","むかえ","むかし","むぎちゃ","むける","むげん","むさぼる","むしあつい","むしば","むじゅん","むしろ","むすう","むすこ","むすぶ","むすめ","むせる","むせん","むちゅう","むなしい","むのう","むやみ","むよう","むらさき","むりょう","むろん","めいあん","めいうん","めいえん","めいかく","めいきょく","めいさい","めいし","めいそう","めいぶつ","めいれい","めいわく","めぐまれる","めざす","めした","めずらしい","めだつ","めまい","めやす","めんきょ","めんせき","めんどう","もうしあげる","もうどうけん","もえる","もくし","もくてき","もくようび","もちろん","もどる","もらう","もんく","もんだい","やおや","やける","やさい","やさしい","やすい","やすたろう","やすみ","やせる","やそう","やたい","やちん","やっと","やっぱり","やぶる","やめる","ややこしい","やよい","やわらかい","ゆうき","ゆうびんきょく","ゆうべ","ゆうめい","ゆけつ","ゆしゅつ","ゆせん","ゆそう","ゆたか","ゆちゃく","ゆでる","ゆにゅう","ゆびわ","ゆらい","ゆれる","ようい","ようか","ようきゅう","ようじ","ようす","ようちえん","よかぜ","よかん","よきん","よくせい","よくぼう","よけい","よごれる","よさん","よしゅう","よそう","よそく","よっか","よてい","よどがわく","よねつ","よやく","よゆう","よろこぶ","よろしい","らいう","らくがき","らくご","らくさつ","らくだ","らしんばん","らせん","らぞく","らたい","らっか","られつ","りえき","りかい","りきさく","りきせつ","りくぐん","りくつ","りけん","りこう","りせい","りそう","りそく","りてん","りねん","りゆう","りゅうがく","りよう","りょうり","りょかん","りょくちゃ","りょこう","りりく","りれき","りろん","りんご","るいけい","るいさい","るいじ","るいせき","るすばん","るりがわら","れいかん","れいぎ","れいせい","れいぞうこ","れいとう","れいぼう","れきし","れきだい","れんあい","れんけい","れんこん","れんさい","れんしゅう","れんぞく","れんらく","ろうか","ろうご","ろうじん","ろうそく","ろくが","ろこつ","ろじうら","ろしゅつ","ろせん","ろてん","ろめん","ろれつ","ろんぎ","ろんぱ","ろんぶん","ろんり","わかす","わかめ","わかやま","わかれる","わしつ","わじまし","わすれもの","わらう","われる"]')
            },
            8975: e => {
                "use strict";
                e.exports = JSON.parse('["가격","가끔","가난","가능","가득","가르침","가뭄","가방","가상","가슴","가운데","가을","가이드","가입","가장","가정","가족","가죽","각오","각자","간격","간부","간섭","간장","간접","간판","갈등","갈비","갈색","갈증","감각","감기","감소","감수성","감자","감정","갑자기","강남","강당","강도","강력히","강변","강북","강사","강수량","강아지","강원도","강의","강제","강조","같이","개구리","개나리","개방","개별","개선","개성","개인","객관적","거실","거액","거울","거짓","거품","걱정","건강","건물","건설","건조","건축","걸음","검사","검토","게시판","게임","겨울","견해","결과","결국","결론","결석","결승","결심","결정","결혼","경계","경고","경기","경력","경복궁","경비","경상도","경영","경우","경쟁","경제","경주","경찰","경치","경향","경험","계곡","계단","계란","계산","계속","계약","계절","계층","계획","고객","고구려","고궁","고급","고등학생","고무신","고민","고양이","고장","고전","고집","고춧가루","고통","고향","곡식","골목","골짜기","골프","공간","공개","공격","공군","공급","공기","공동","공무원","공부","공사","공식","공업","공연","공원","공장","공짜","공책","공통","공포","공항","공휴일","과목","과일","과장","과정","과학","관객","관계","관광","관념","관람","관련","관리","관습","관심","관점","관찰","광경","광고","광장","광주","괴로움","굉장히","교과서","교문","교복","교실","교양","교육","교장","교직","교통","교환","교훈","구경","구름","구멍","구별","구분","구석","구성","구속","구역","구입","구청","구체적","국가","국기","국내","국립","국물","국민","국수","국어","국왕","국적","국제","국회","군대","군사","군인","궁극적","권리","권위","권투","귀국","귀신","규정","규칙","균형","그날","그냥","그늘","그러나","그룹","그릇","그림","그제서야","그토록","극복","극히","근거","근교","근래","근로","근무","근본","근원","근육","근처","글씨","글자","금강산","금고","금년","금메달","금액","금연","금요일","금지","긍정적","기간","기관","기념","기능","기독교","기둥","기록","기름","기법","기본","기분","기쁨","기숙사","기술","기억","기업","기온","기운","기원","기적","기준","기침","기혼","기획","긴급","긴장","길이","김밥","김치","김포공항","깍두기","깜빡","깨달음","깨소금","껍질","꼭대기","꽃잎","나들이","나란히","나머지","나물","나침반","나흘","낙엽","난방","날개","날씨","날짜","남녀","남대문","남매","남산","남자","남편","남학생","낭비","낱말","내년","내용","내일","냄비","냄새","냇물","냉동","냉면","냉방","냉장고","넥타이","넷째","노동","노란색","노력","노인","녹음","녹차","녹화","논리","논문","논쟁","놀이","농구","농담","농민","농부","농업","농장","농촌","높이","눈동자","눈물","눈썹","뉴욕","느낌","늑대","능동적","능력","다방","다양성","다음","다이어트","다행","단계","단골","단독","단맛","단순","단어","단위","단점","단체","단추","단편","단풍","달걀","달러","달력","달리","닭고기","담당","담배","담요","담임","답변","답장","당근","당분간","당연히","당장","대규모","대낮","대단히","대답","대도시","대략","대량","대륙","대문","대부분","대신","대응","대장","대전","대접","대중","대책","대출","대충","대통령","대학","대한민국","대합실","대형","덩어리","데이트","도대체","도덕","도둑","도망","도서관","도심","도움","도입","도자기","도저히","도전","도중","도착","독감","독립","독서","독일","독창적","동화책","뒷모습","뒷산","딸아이","마누라","마늘","마당","마라톤","마련","마무리","마사지","마약","마요네즈","마을","마음","마이크","마중","마지막","마찬가지","마찰","마흔","막걸리","막내","막상","만남","만두","만세","만약","만일","만점","만족","만화","많이","말기","말씀","말투","맘대로","망원경","매년","매달","매력","매번","매스컴","매일","매장","맥주","먹이","먼저","먼지","멀리","메일","며느리","며칠","면담","멸치","명단","명령","명예","명의","명절","명칭","명함","모금","모니터","모델","모든","모범","모습","모양","모임","모조리","모집","모퉁이","목걸이","목록","목사","목소리","목숨","목적","목표","몰래","몸매","몸무게","몸살","몸속","몸짓","몸통","몹시","무관심","무궁화","무더위","무덤","무릎","무슨","무엇","무역","무용","무조건","무지개","무척","문구","문득","문법","문서","문제","문학","문화","물가","물건","물결","물고기","물론","물리학","물음","물질","물체","미국","미디어","미사일","미술","미역","미용실","미움","미인","미팅","미혼","민간","민족","민주","믿음","밀가루","밀리미터","밑바닥","바가지","바구니","바나나","바늘","바닥","바닷가","바람","바이러스","바탕","박물관","박사","박수","반대","반드시","반말","반발","반성","반응","반장","반죽","반지","반찬","받침","발가락","발걸음","발견","발달","발레","발목","발바닥","발생","발음","발자국","발전","발톱","발표","밤하늘","밥그릇","밥맛","밥상","밥솥","방금","방면","방문","방바닥","방법","방송","방식","방안","방울","방지","방학","방해","방향","배경","배꼽","배달","배드민턴","백두산","백색","백성","백인","백제","백화점","버릇","버섯","버튼","번개","번역","번지","번호","벌금","벌레","벌써","범위","범인","범죄","법률","법원","법적","법칙","베이징","벨트","변경","변동","변명","변신","변호사","변화","별도","별명","별일","병실","병아리","병원","보관","보너스","보라색","보람","보름","보상","보안","보자기","보장","보전","보존","보통","보편적","보험","복도","복사","복숭아","복습","볶음","본격적","본래","본부","본사","본성","본인","본질","볼펜","봉사","봉지","봉투","부근","부끄러움","부담","부동산","부문","부분","부산","부상","부엌","부인","부작용","부장","부정","부족","부지런히","부친","부탁","부품","부회장","북부","북한","분노","분량","분리","분명","분석","분야","분위기","분필","분홍색","불고기","불과","불교","불꽃","불만","불법","불빛","불안","불이익","불행","브랜드","비극","비난","비닐","비둘기","비디오","비로소","비만","비명","비밀","비바람","비빔밥","비상","비용","비율","비중","비타민","비판","빌딩","빗물","빗방울","빗줄기","빛깔","빨간색","빨래","빨리","사건","사계절","사나이","사냥","사람","사랑","사립","사모님","사물","사방","사상","사생활","사설","사슴","사실","사업","사용","사월","사장","사전","사진","사촌","사춘기","사탕","사투리","사흘","산길","산부인과","산업","산책","살림","살인","살짝","삼계탕","삼국","삼십","삼월","삼촌","상관","상금","상대","상류","상반기","상상","상식","상업","상인","상자","상점","상처","상추","상태","상표","상품","상황","새벽","색깔","색연필","생각","생명","생물","생방송","생산","생선","생신","생일","생활","서랍","서른","서명","서민","서비스","서양","서울","서적","서점","서쪽","서클","석사","석유","선거","선물","선배","선생","선수","선원","선장","선전","선택","선풍기","설거지","설날","설렁탕","설명","설문","설사","설악산","설치","설탕","섭씨","성공","성당","성명","성별","성인","성장","성적","성질","성함","세금","세미나","세상","세월","세종대왕","세탁","센터","센티미터","셋째","소규모","소극적","소금","소나기","소년","소득","소망","소문","소설","소속","소아과","소용","소원","소음","소중히","소지품","소질","소풍","소형","속담","속도","속옷","손가락","손길","손녀","손님","손등","손목","손뼉","손실","손질","손톱","손해","솔직히","솜씨","송아지","송이","송편","쇠고기","쇼핑","수건","수년","수단","수돗물","수동적","수면","수명","수박","수상","수석","수술","수시로","수업","수염","수영","수입","수준","수집","수출","수컷","수필","수학","수험생","수화기","숙녀","숙소","숙제","순간","순서","순수","순식간","순위","숟가락","술병","술집","숫자","스님","스물","스스로","스승","스웨터","스위치","스케이트","스튜디오","스트레스","스포츠","슬쩍","슬픔","습관","습기","승객","승리","승부","승용차","승진","시각","시간","시골","시금치","시나리오","시댁","시리즈","시멘트","시민","시부모","시선","시설","시스템","시아버지","시어머니","시월","시인","시일","시작","시장","시절","시점","시중","시즌","시집","시청","시합","시험","식구","식기","식당","식량","식료품","식물","식빵","식사","식생활","식초","식탁","식품","신고","신규","신념","신문","신발","신비","신사","신세","신용","신제품","신청","신체","신화","실감","실내","실력","실례","실망","실수","실습","실시","실장","실정","실질적","실천","실체","실컷","실태","실패","실험","실현","심리","심부름","심사","심장","심정","심판","쌍둥이","씨름","씨앗","아가씨","아나운서","아드님","아들","아쉬움","아스팔트","아시아","아울러","아저씨","아줌마","아직","아침","아파트","아프리카","아픔","아홉","아흔","악기","악몽","악수","안개","안경","안과","안내","안녕","안동","안방","안부","안주","알루미늄","알코올","암시","암컷","압력","앞날","앞문","애인","애정","액수","앨범","야간","야단","야옹","약간","약국","약속","약수","약점","약품","약혼녀","양념","양력","양말","양배추","양주","양파","어둠","어려움","어른","어젯밤","어쨌든","어쩌다가","어쩐지","언니","언덕","언론","언어","얼굴","얼른","얼음","얼핏","엄마","업무","업종","업체","엉덩이","엉망","엉터리","엊그제","에너지","에어컨","엔진","여건","여고생","여관","여군","여권","여대생","여덟","여동생","여든","여론","여름","여섯","여성","여왕","여인","여전히","여직원","여학생","여행","역사","역시","역할","연결","연구","연극","연기","연락","연설","연세","연속","연습","연애","연예인","연인","연장","연주","연출","연필","연합","연휴","열기","열매","열쇠","열심히","열정","열차","열흘","염려","엽서","영국","영남","영상","영양","영역","영웅","영원히","영하","영향","영혼","영화","옆구리","옆방","옆집","예감","예금","예방","예산","예상","예선","예술","예습","예식장","예약","예전","예절","예정","예컨대","옛날","오늘","오락","오랫동안","오렌지","오로지","오른발","오븐","오십","오염","오월","오전","오직","오징어","오페라","오피스텔","오히려","옥상","옥수수","온갖","온라인","온몸","온종일","온통","올가을","올림픽","올해","옷차림","와이셔츠","와인","완성","완전","왕비","왕자","왜냐하면","왠지","외갓집","외국","외로움","외삼촌","외출","외침","외할머니","왼발","왼손","왼쪽","요금","요일","요즘","요청","용기","용서","용어","우산","우선","우승","우연히","우정","우체국","우편","운동","운명","운반","운전","운행","울산","울음","움직임","웃어른","웃음","워낙","원고","원래","원서","원숭이","원인","원장","원피스","월급","월드컵","월세","월요일","웨이터","위반","위법","위성","위원","위험","위협","윗사람","유난히","유럽","유명","유물","유산","유적","유치원","유학","유행","유형","육군","육상","육십","육체","은행","음력","음료","음반","음성","음식","음악","음주","의견","의논","의문","의복","의식","의심","의외로","의욕","의원","의학","이것","이곳","이념","이놈","이달","이대로","이동","이렇게","이력서","이론적","이름","이민","이발소","이별","이불","이빨","이상","이성","이슬","이야기","이용","이웃","이월","이윽고","이익","이전","이중","이튿날","이틀","이혼","인간","인격","인공","인구","인근","인기","인도","인류","인물","인생","인쇄","인연","인원","인재","인종","인천","인체","인터넷","인하","인형","일곱","일기","일단","일대","일등","일반","일본","일부","일상","일생","일손","일요일","일월","일정","일종","일주일","일찍","일체","일치","일행","일회용","임금","임무","입대","입력","입맛","입사","입술","입시","입원","입장","입학","자가용","자격","자극","자동","자랑","자부심","자식","자신","자연","자원","자율","자전거","자정","자존심","자판","작가","작년","작성","작업","작용","작은딸","작품","잔디","잔뜩","잔치","잘못","잠깐","잠수함","잠시","잠옷","잠자리","잡지","장관","장군","장기간","장래","장례","장르","장마","장면","장모","장미","장비","장사","장소","장식","장애인","장인","장점","장차","장학금","재능","재빨리","재산","재생","재작년","재정","재채기","재판","재학","재활용","저것","저고리","저곳","저녁","저런","저렇게","저번","저울","저절로","저축","적극","적당히","적성","적용","적응","전개","전공","전기","전달","전라도","전망","전문","전반","전부","전세","전시","전용","전자","전쟁","전주","전철","전체","전통","전혀","전후","절대","절망","절반","절약","절차","점검","점수","점심","점원","점점","점차","접근","접시","접촉","젓가락","정거장","정도","정류장","정리","정말","정면","정문","정반대","정보","정부","정비","정상","정성","정오","정원","정장","정지","정치","정확히","제공","제과점","제대로","제목","제발","제법","제삿날","제안","제일","제작","제주도","제출","제품","제한","조각","조건","조금","조깅","조명","조미료","조상","조선","조용히","조절","조정","조직","존댓말","존재","졸업","졸음","종교","종로","종류","종소리","종업원","종종","종합","좌석","죄인","주관적","주름","주말","주머니","주먹","주문","주민","주방","주변","주식","주인","주일","주장","주전자","주택","준비","줄거리","줄기","줄무늬","중간","중계방송","중국","중년","중단","중독","중반","중부","중세","중소기업","중순","중앙","중요","중학교","즉석","즉시","즐거움","증가","증거","증권","증상","증세","지각","지갑","지경","지극히","지금","지급","지능","지름길","지리산","지방","지붕","지식","지역","지우개","지원","지적","지점","지진","지출","직선","직업","직원","직장","진급","진동","진로","진료","진리","진짜","진찰","진출","진통","진행","질문","질병","질서","짐작","집단","집안","집중","짜증","찌꺼기","차남","차라리","차량","차림","차별","차선","차츰","착각","찬물","찬성","참가","참기름","참새","참석","참여","참외","참조","찻잔","창가","창고","창구","창문","창밖","창작","창조","채널","채점","책가방","책방","책상","책임","챔피언","처벌","처음","천국","천둥","천장","천재","천천히","철도","철저히","철학","첫날","첫째","청년","청바지","청소","청춘","체계","체력","체온","체육","체중","체험","초등학생","초반","초밥","초상화","초순","초여름","초원","초저녁","초점","초청","초콜릿","촛불","총각","총리","총장","촬영","최근","최상","최선","최신","최악","최종","추석","추억","추진","추천","추측","축구","축소","축제","축하","출근","출발","출산","출신","출연","출입","출장","출판","충격","충고","충돌","충분히","충청도","취업","취직","취향","치약","친구","친척","칠십","칠월","칠판","침대","침묵","침실","칫솔","칭찬","카메라","카운터","칼국수","캐릭터","캠퍼스","캠페인","커튼","컨디션","컬러","컴퓨터","코끼리","코미디","콘서트","콜라","콤플렉스","콩나물","쾌감","쿠데타","크림","큰길","큰딸","큰소리","큰아들","큰어머니","큰일","큰절","클래식","클럽","킬로","타입","타자기","탁구","탁자","탄생","태권도","태양","태풍","택시","탤런트","터널","터미널","테니스","테스트","테이블","텔레비전","토론","토마토","토요일","통계","통과","통로","통신","통역","통일","통장","통제","통증","통합","통화","퇴근","퇴원","퇴직금","튀김","트럭","특급","특별","특성","특수","특징","특히","튼튼히","티셔츠","파란색","파일","파출소","판결","판단","판매","판사","팔십","팔월","팝송","패션","팩스","팩시밀리","팬티","퍼센트","페인트","편견","편의","편지","편히","평가","평균","평생","평소","평양","평일","평화","포스터","포인트","포장","포함","표면","표정","표준","표현","품목","품질","풍경","풍속","풍습","프랑스","프린터","플라스틱","피곤","피망","피아노","필름","필수","필요","필자","필통","핑계","하느님","하늘","하드웨어","하룻밤","하반기","하숙집","하순","하여튼","하지만","하천","하품","하필","학과","학교","학급","학기","학년","학력","학번","학부모","학비","학생","학술","학습","학용품","학원","학위","학자","학점","한계","한글","한꺼번에","한낮","한눈","한동안","한때","한라산","한마디","한문","한번","한복","한식","한여름","한쪽","할머니","할아버지","할인","함께","함부로","합격","합리적","항공","항구","항상","항의","해결","해군","해답","해당","해물","해석","해설","해수욕장","해안","핵심","핸드백","햄버거","햇볕","햇살","행동","행복","행사","행운","행위","향기","향상","향수","허락","허용","헬기","현관","현금","현대","현상","현실","현장","현재","현지","혈액","협력","형부","형사","형수","형식","형제","형태","형편","혜택","호기심","호남","호랑이","호박","호텔","호흡","혹시","홀로","홈페이지","홍보","홍수","홍차","화면","화분","화살","화요일","화장","화학","확보","확인","확장","확정","환갑","환경","환영","환율","환자","활기","활동","활발히","활용","활짝","회견","회관","회복","회색","회원","회장","회전","횟수","횡단보도","효율적","후반","후춧가루","훈련","훨씬","휴식","휴일","흉내","흐름","흑백","흑인","흔적","흔히","흥미","흥분","희곡","희망","희생","흰색","힘껏"]')
            },
            2838: e => {
                "use strict";
                e.exports = JSON.parse('["abacate","abaixo","abalar","abater","abduzir","abelha","aberto","abismo","abotoar","abranger","abreviar","abrigar","abrupto","absinto","absoluto","absurdo","abutre","acabado","acalmar","acampar","acanhar","acaso","aceitar","acelerar","acenar","acervo","acessar","acetona","achatar","acidez","acima","acionado","acirrar","aclamar","aclive","acolhida","acomodar","acoplar","acordar","acumular","acusador","adaptar","adega","adentro","adepto","adequar","aderente","adesivo","adeus","adiante","aditivo","adjetivo","adjunto","admirar","adorar","adquirir","adubo","adverso","advogado","aeronave","afastar","aferir","afetivo","afinador","afivelar","aflito","afluente","afrontar","agachar","agarrar","agasalho","agenciar","agilizar","agiota","agitado","agora","agradar","agreste","agrupar","aguardar","agulha","ajoelhar","ajudar","ajustar","alameda","alarme","alastrar","alavanca","albergue","albino","alcatra","aldeia","alecrim","alegria","alertar","alface","alfinete","algum","alheio","aliar","alicate","alienar","alinhar","aliviar","almofada","alocar","alpiste","alterar","altitude","alucinar","alugar","aluno","alusivo","alvo","amaciar","amador","amarelo","amassar","ambas","ambiente","ameixa","amenizar","amido","amistoso","amizade","amolador","amontoar","amoroso","amostra","amparar","ampliar","ampola","anagrama","analisar","anarquia","anatomia","andaime","anel","anexo","angular","animar","anjo","anomalia","anotado","ansioso","anterior","anuidade","anunciar","anzol","apagador","apalpar","apanhado","apego","apelido","apertada","apesar","apetite","apito","aplauso","aplicada","apoio","apontar","aposta","aprendiz","aprovar","aquecer","arame","aranha","arara","arcada","ardente","areia","arejar","arenito","aresta","argiloso","argola","arma","arquivo","arraial","arrebate","arriscar","arroba","arrumar","arsenal","arterial","artigo","arvoredo","asfaltar","asilado","aspirar","assador","assinar","assoalho","assunto","astral","atacado","atadura","atalho","atarefar","atear","atender","aterro","ateu","atingir","atirador","ativo","atoleiro","atracar","atrevido","atriz","atual","atum","auditor","aumentar","aura","aurora","autismo","autoria","autuar","avaliar","avante","avaria","avental","avesso","aviador","avisar","avulso","axila","azarar","azedo","azeite","azulejo","babar","babosa","bacalhau","bacharel","bacia","bagagem","baiano","bailar","baioneta","bairro","baixista","bajular","baleia","baliza","balsa","banal","bandeira","banho","banir","banquete","barato","barbado","baronesa","barraca","barulho","baseado","bastante","batata","batedor","batida","batom","batucar","baunilha","beber","beijo","beirada","beisebol","beldade","beleza","belga","beliscar","bendito","bengala","benzer","berimbau","berlinda","berro","besouro","bexiga","bezerro","bico","bicudo","bienal","bifocal","bifurcar","bigorna","bilhete","bimestre","bimotor","biologia","biombo","biosfera","bipolar","birrento","biscoito","bisneto","bispo","bissexto","bitola","bizarro","blindado","bloco","bloquear","boato","bobagem","bocado","bocejo","bochecha","boicotar","bolada","boletim","bolha","bolo","bombeiro","bonde","boneco","bonita","borbulha","borda","boreal","borracha","bovino","boxeador","branco","brasa","braveza","breu","briga","brilho","brincar","broa","brochura","bronzear","broto","bruxo","bucha","budismo","bufar","bule","buraco","busca","busto","buzina","cabana","cabelo","cabide","cabo","cabrito","cacau","cacetada","cachorro","cacique","cadastro","cadeado","cafezal","caiaque","caipira","caixote","cajado","caju","calafrio","calcular","caldeira","calibrar","calmante","calota","camada","cambista","camisa","camomila","campanha","camuflar","canavial","cancelar","caneta","canguru","canhoto","canivete","canoa","cansado","cantar","canudo","capacho","capela","capinar","capotar","capricho","captador","capuz","caracol","carbono","cardeal","careca","carimbar","carneiro","carpete","carreira","cartaz","carvalho","casaco","casca","casebre","castelo","casulo","catarata","cativar","caule","causador","cautelar","cavalo","caverna","cebola","cedilha","cegonha","celebrar","celular","cenoura","censo","centeio","cercar","cerrado","certeiro","cerveja","cetim","cevada","chacota","chaleira","chamado","chapada","charme","chatice","chave","chefe","chegada","cheiro","cheque","chicote","chifre","chinelo","chocalho","chover","chumbo","chutar","chuva","cicatriz","ciclone","cidade","cidreira","ciente","cigana","cimento","cinto","cinza","ciranda","circuito","cirurgia","citar","clareza","clero","clicar","clone","clube","coado","coagir","cobaia","cobertor","cobrar","cocada","coelho","coentro","coeso","cogumelo","coibir","coifa","coiote","colar","coleira","colher","colidir","colmeia","colono","coluna","comando","combinar","comentar","comitiva","comover","complexo","comum","concha","condor","conectar","confuso","congelar","conhecer","conjugar","consumir","contrato","convite","cooperar","copeiro","copiador","copo","coquetel","coragem","cordial","corneta","coronha","corporal","correio","cortejo","coruja","corvo","cosseno","costela","cotonete","couro","couve","covil","cozinha","cratera","cravo","creche","credor","creme","crer","crespo","criada","criminal","crioulo","crise","criticar","crosta","crua","cruzeiro","cubano","cueca","cuidado","cujo","culatra","culminar","culpar","cultura","cumprir","cunhado","cupido","curativo","curral","cursar","curto","cuspir","custear","cutelo","damasco","datar","debater","debitar","deboche","debulhar","decalque","decimal","declive","decote","decretar","dedal","dedicado","deduzir","defesa","defumar","degelo","degrau","degustar","deitado","deixar","delator","delegado","delinear","delonga","demanda","demitir","demolido","dentista","depenado","depilar","depois","depressa","depurar","deriva","derramar","desafio","desbotar","descanso","desenho","desfiado","desgaste","desigual","deslize","desmamar","desova","despesa","destaque","desviar","detalhar","detentor","detonar","detrito","deusa","dever","devido","devotado","dezena","diagrama","dialeto","didata","difuso","digitar","dilatado","diluente","diminuir","dinastia","dinheiro","diocese","direto","discreta","disfarce","disparo","disquete","dissipar","distante","ditador","diurno","diverso","divisor","divulgar","dizer","dobrador","dolorido","domador","dominado","donativo","donzela","dormente","dorsal","dosagem","dourado","doutor","drenagem","drible","drogaria","duelar","duende","dueto","duplo","duquesa","durante","duvidoso","eclodir","ecoar","ecologia","edificar","edital","educado","efeito","efetivar","ejetar","elaborar","eleger","eleitor","elenco","elevador","eliminar","elogiar","embargo","embolado","embrulho","embutido","emenda","emergir","emissor","empatia","empenho","empinado","empolgar","emprego","empurrar","emulador","encaixe","encenado","enchente","encontro","endeusar","endossar","enfaixar","enfeite","enfim","engajado","engenho","englobar","engomado","engraxar","enguia","enjoar","enlatar","enquanto","enraizar","enrolado","enrugar","ensaio","enseada","ensino","ensopado","entanto","enteado","entidade","entortar","entrada","entulho","envergar","enviado","envolver","enxame","enxerto","enxofre","enxuto","epiderme","equipar","ereto","erguido","errata","erva","ervilha","esbanjar","esbelto","escama","escola","escrita","escuta","esfinge","esfolar","esfregar","esfumado","esgrima","esmalte","espanto","espelho","espiga","esponja","espreita","espumar","esquerda","estaca","esteira","esticar","estofado","estrela","estudo","esvaziar","etanol","etiqueta","euforia","europeu","evacuar","evaporar","evasivo","eventual","evidente","evoluir","exagero","exalar","examinar","exato","exausto","excesso","excitar","exclamar","executar","exemplo","exibir","exigente","exonerar","expandir","expelir","expirar","explanar","exposto","expresso","expulsar","externo","extinto","extrato","fabricar","fabuloso","faceta","facial","fada","fadiga","faixa","falar","falta","familiar","fandango","fanfarra","fantoche","fardado","farelo","farinha","farofa","farpa","fartura","fatia","fator","favorita","faxina","fazenda","fechado","feijoada","feirante","felino","feminino","fenda","feno","fera","feriado","ferrugem","ferver","festejar","fetal","feudal","fiapo","fibrose","ficar","ficheiro","figurado","fileira","filho","filme","filtrar","firmeza","fisgada","fissura","fita","fivela","fixador","fixo","flacidez","flamingo","flanela","flechada","flora","flutuar","fluxo","focal","focinho","fofocar","fogo","foguete","foice","folgado","folheto","forjar","formiga","forno","forte","fosco","fossa","fragata","fralda","frango","frasco","fraterno","freira","frente","fretar","frieza","friso","fritura","fronha","frustrar","fruteira","fugir","fulano","fuligem","fundar","fungo","funil","furador","furioso","futebol","gabarito","gabinete","gado","gaiato","gaiola","gaivota","galega","galho","galinha","galocha","ganhar","garagem","garfo","gargalo","garimpo","garoupa","garrafa","gasoduto","gasto","gata","gatilho","gaveta","gazela","gelado","geleia","gelo","gemada","gemer","gemido","generoso","gengiva","genial","genoma","genro","geologia","gerador","germinar","gesso","gestor","ginasta","gincana","gingado","girafa","girino","glacial","glicose","global","glorioso","goela","goiaba","golfe","golpear","gordura","gorjeta","gorro","gostoso","goteira","governar","gracejo","gradual","grafite","gralha","grampo","granada","gratuito","graveto","graxa","grego","grelhar","greve","grilo","grisalho","gritaria","grosso","grotesco","grudado","grunhido","gruta","guache","guarani","guaxinim","guerrear","guiar","guincho","guisado","gula","guloso","guru","habitar","harmonia","haste","haver","hectare","herdar","heresia","hesitar","hiato","hibernar","hidratar","hiena","hino","hipismo","hipnose","hipoteca","hoje","holofote","homem","honesto","honrado","hormonal","hospedar","humorado","iate","ideia","idoso","ignorado","igreja","iguana","ileso","ilha","iludido","iluminar","ilustrar","imagem","imediato","imenso","imersivo","iminente","imitador","imortal","impacto","impedir","implante","impor","imprensa","impune","imunizar","inalador","inapto","inativo","incenso","inchar","incidir","incluir","incolor","indeciso","indireto","indutor","ineficaz","inerente","infantil","infestar","infinito","inflamar","informal","infrator","ingerir","inibido","inicial","inimigo","injetar","inocente","inodoro","inovador","inox","inquieto","inscrito","inseto","insistir","inspetor","instalar","insulto","intacto","integral","intimar","intocado","intriga","invasor","inverno","invicto","invocar","iogurte","iraniano","ironizar","irreal","irritado","isca","isento","isolado","isqueiro","italiano","janeiro","jangada","janta","jararaca","jardim","jarro","jasmim","jato","javali","jazida","jejum","joaninha","joelhada","jogador","joia","jornal","jorrar","jovem","juba","judeu","judoca","juiz","julgador","julho","jurado","jurista","juro","justa","labareda","laboral","lacre","lactante","ladrilho","lagarta","lagoa","laje","lamber","lamentar","laminar","lampejo","lanche","lapidar","lapso","laranja","lareira","largura","lasanha","lastro","lateral","latido","lavanda","lavoura","lavrador","laxante","lazer","lealdade","lebre","legado","legendar","legista","leigo","leiloar","leitura","lembrete","leme","lenhador","lentilha","leoa","lesma","leste","letivo","letreiro","levar","leveza","levitar","liberal","libido","liderar","ligar","ligeiro","limitar","limoeiro","limpador","linda","linear","linhagem","liquidez","listagem","lisura","litoral","livro","lixa","lixeira","locador","locutor","lojista","lombo","lona","longe","lontra","lorde","lotado","loteria","loucura","lousa","louvar","luar","lucidez","lucro","luneta","lustre","lutador","luva","macaco","macete","machado","macio","madeira","madrinha","magnata","magreza","maior","mais","malandro","malha","malote","maluco","mamilo","mamoeiro","mamute","manada","mancha","mandato","manequim","manhoso","manivela","manobrar","mansa","manter","manusear","mapeado","maquinar","marcador","maresia","marfim","margem","marinho","marmita","maroto","marquise","marreco","martelo","marujo","mascote","masmorra","massagem","mastigar","matagal","materno","matinal","matutar","maxilar","medalha","medida","medusa","megafone","meiga","melancia","melhor","membro","memorial","menino","menos","mensagem","mental","merecer","mergulho","mesada","mesclar","mesmo","mesquita","mestre","metade","meteoro","metragem","mexer","mexicano","micro","migalha","migrar","milagre","milenar","milhar","mimado","minerar","minhoca","ministro","minoria","miolo","mirante","mirtilo","misturar","mocidade","moderno","modular","moeda","moer","moinho","moita","moldura","moleza","molho","molinete","molusco","montanha","moqueca","morango","morcego","mordomo","morena","mosaico","mosquete","mostarda","motel","motim","moto","motriz","muda","muito","mulata","mulher","multar","mundial","munido","muralha","murcho","muscular","museu","musical","nacional","nadador","naja","namoro","narina","narrado","nascer","nativa","natureza","navalha","navegar","navio","neblina","nebuloso","negativa","negociar","negrito","nervoso","neta","neural","nevasca","nevoeiro","ninar","ninho","nitidez","nivelar","nobreza","noite","noiva","nomear","nominal","nordeste","nortear","notar","noticiar","noturno","novelo","novilho","novo","nublado","nudez","numeral","nupcial","nutrir","nuvem","obcecado","obedecer","objetivo","obrigado","obscuro","obstetra","obter","obturar","ocidente","ocioso","ocorrer","oculista","ocupado","ofegante","ofensiva","oferenda","oficina","ofuscado","ogiva","olaria","oleoso","olhar","oliveira","ombro","omelete","omisso","omitir","ondulado","oneroso","ontem","opcional","operador","oponente","oportuno","oposto","orar","orbitar","ordem","ordinal","orfanato","orgasmo","orgulho","oriental","origem","oriundo","orla","ortodoxo","orvalho","oscilar","ossada","osso","ostentar","otimismo","ousadia","outono","outubro","ouvido","ovelha","ovular","oxidar","oxigenar","pacato","paciente","pacote","pactuar","padaria","padrinho","pagar","pagode","painel","pairar","paisagem","palavra","palestra","palheta","palito","palmada","palpitar","pancada","panela","panfleto","panqueca","pantanal","papagaio","papelada","papiro","parafina","parcial","pardal","parede","partida","pasmo","passado","pastel","patamar","patente","patinar","patrono","paulada","pausar","peculiar","pedalar","pedestre","pediatra","pedra","pegada","peitoral","peixe","pele","pelicano","penca","pendurar","peneira","penhasco","pensador","pente","perceber","perfeito","pergunta","perito","permitir","perna","perplexo","persiana","pertence","peruca","pescado","pesquisa","pessoa","petiscar","piada","picado","piedade","pigmento","pilastra","pilhado","pilotar","pimenta","pincel","pinguim","pinha","pinote","pintar","pioneiro","pipoca","piquete","piranha","pires","pirueta","piscar","pistola","pitanga","pivete","planta","plaqueta","platina","plebeu","plumagem","pluvial","pneu","poda","poeira","poetisa","polegada","policiar","poluente","polvilho","pomar","pomba","ponderar","pontaria","populoso","porta","possuir","postal","pote","poupar","pouso","povoar","praia","prancha","prato","praxe","prece","predador","prefeito","premiar","prensar","preparar","presilha","pretexto","prevenir","prezar","primata","princesa","prisma","privado","processo","produto","profeta","proibido","projeto","prometer","propagar","prosa","protetor","provador","publicar","pudim","pular","pulmonar","pulseira","punhal","punir","pupilo","pureza","puxador","quadra","quantia","quarto","quase","quebrar","queda","queijo","quente","querido","quimono","quina","quiosque","rabanada","rabisco","rachar","racionar","radial","raiar","rainha","raio","raiva","rajada","ralado","ramal","ranger","ranhura","rapadura","rapel","rapidez","raposa","raquete","raridade","rasante","rascunho","rasgar","raspador","rasteira","rasurar","ratazana","ratoeira","realeza","reanimar","reaver","rebaixar","rebelde","rebolar","recado","recente","recheio","recibo","recordar","recrutar","recuar","rede","redimir","redonda","reduzida","reenvio","refinar","refletir","refogar","refresco","refugiar","regalia","regime","regra","reinado","reitor","rejeitar","relativo","remador","remendo","remorso","renovado","reparo","repelir","repleto","repolho","represa","repudiar","requerer","resenha","resfriar","resgatar","residir","resolver","respeito","ressaca","restante","resumir","retalho","reter","retirar","retomada","retratar","revelar","revisor","revolta","riacho","rica","rigidez","rigoroso","rimar","ringue","risada","risco","risonho","robalo","rochedo","rodada","rodeio","rodovia","roedor","roleta","romano","roncar","rosado","roseira","rosto","rota","roteiro","rotina","rotular","rouco","roupa","roxo","rubro","rugido","rugoso","ruivo","rumo","rupestre","russo","sabor","saciar","sacola","sacudir","sadio","safira","saga","sagrada","saibro","salada","saleiro","salgado","saliva","salpicar","salsicha","saltar","salvador","sambar","samurai","sanar","sanfona","sangue","sanidade","sapato","sarda","sargento","sarjeta","saturar","saudade","saxofone","sazonal","secar","secular","seda","sedento","sediado","sedoso","sedutor","segmento","segredo","segundo","seiva","seleto","selvagem","semanal","semente","senador","senhor","sensual","sentado","separado","sereia","seringa","serra","servo","setembro","setor","sigilo","silhueta","silicone","simetria","simpatia","simular","sinal","sincero","singular","sinopse","sintonia","sirene","siri","situado","soberano","sobra","socorro","sogro","soja","solda","soletrar","solteiro","sombrio","sonata","sondar","sonegar","sonhador","sono","soprano","soquete","sorrir","sorteio","sossego","sotaque","soterrar","sovado","sozinho","suavizar","subida","submerso","subsolo","subtrair","sucata","sucesso","suco","sudeste","sufixo","sugador","sugerir","sujeito","sulfato","sumir","suor","superior","suplicar","suposto","suprimir","surdina","surfista","surpresa","surreal","surtir","suspiro","sustento","tabela","tablete","tabuada","tacho","tagarela","talher","talo","talvez","tamanho","tamborim","tampa","tangente","tanto","tapar","tapioca","tardio","tarefa","tarja","tarraxa","tatuagem","taurino","taxativo","taxista","teatral","tecer","tecido","teclado","tedioso","teia","teimar","telefone","telhado","tempero","tenente","tensor","tentar","termal","terno","terreno","tese","tesoura","testado","teto","textura","texugo","tiara","tigela","tijolo","timbrar","timidez","tingido","tinteiro","tiragem","titular","toalha","tocha","tolerar","tolice","tomada","tomilho","tonel","tontura","topete","tora","torcido","torneio","torque","torrada","torto","tostar","touca","toupeira","toxina","trabalho","tracejar","tradutor","trafegar","trajeto","trama","trancar","trapo","traseiro","tratador","travar","treino","tremer","trepidar","trevo","triagem","tribo","triciclo","tridente","trilogia","trindade","triplo","triturar","triunfal","trocar","trombeta","trova","trunfo","truque","tubular","tucano","tudo","tulipa","tupi","turbo","turma","turquesa","tutelar","tutorial","uivar","umbigo","unha","unidade","uniforme","urologia","urso","urtiga","urubu","usado","usina","usufruir","vacina","vadiar","vagaroso","vaidoso","vala","valente","validade","valores","vantagem","vaqueiro","varanda","vareta","varrer","vascular","vasilha","vassoura","vazar","vazio","veado","vedar","vegetar","veicular","veleiro","velhice","veludo","vencedor","vendaval","venerar","ventre","verbal","verdade","vereador","vergonha","vermelho","verniz","versar","vertente","vespa","vestido","vetorial","viaduto","viagem","viajar","viatura","vibrador","videira","vidraria","viela","viga","vigente","vigiar","vigorar","vilarejo","vinco","vinheta","vinil","violeta","virada","virtude","visitar","visto","vitral","viveiro","vizinho","voador","voar","vogal","volante","voleibol","voltagem","volumoso","vontade","vulto","vuvuzela","xadrez","xarope","xeque","xeretar","xerife","xingar","zangado","zarpar","zebu","zelador","zombar","zoologia","zumbido"]')
            },
            965: e => {
                "use strict";
                e.exports = JSON.parse('["ábaco","abdomen","abeja","abierto","abogado","abono","aborto","abrazo","abrir","abuelo","abuso","acabar","academia","acceso","acción","aceite","acelga","acento","aceptar","ácido","aclarar","acné","acoger","acoso","activo","acto","actriz","actuar","acudir","acuerdo","acusar","adicto","admitir","adoptar","adorno","aduana","adulto","aéreo","afectar","afición","afinar","afirmar","ágil","agitar","agonía","agosto","agotar","agregar","agrio","agua","agudo","águila","aguja","ahogo","ahorro","aire","aislar","ajedrez","ajeno","ajuste","alacrán","alambre","alarma","alba","álbum","alcalde","aldea","alegre","alejar","alerta","aleta","alfiler","alga","algodón","aliado","aliento","alivio","alma","almeja","almíbar","altar","alteza","altivo","alto","altura","alumno","alzar","amable","amante","amapola","amargo","amasar","ámbar","ámbito","ameno","amigo","amistad","amor","amparo","amplio","ancho","anciano","ancla","andar","andén","anemia","ángulo","anillo","ánimo","anís","anotar","antena","antiguo","antojo","anual","anular","anuncio","añadir","añejo","año","apagar","aparato","apetito","apio","aplicar","apodo","aporte","apoyo","aprender","aprobar","apuesta","apuro","arado","araña","arar","árbitro","árbol","arbusto","archivo","arco","arder","ardilla","arduo","área","árido","aries","armonía","arnés","aroma","arpa","arpón","arreglo","arroz","arruga","arte","artista","asa","asado","asalto","ascenso","asegurar","aseo","asesor","asiento","asilo","asistir","asno","asombro","áspero","astilla","astro","astuto","asumir","asunto","atajo","ataque","atar","atento","ateo","ático","atleta","átomo","atraer","atroz","atún","audaz","audio","auge","aula","aumento","ausente","autor","aval","avance","avaro","ave","avellana","avena","avestruz","avión","aviso","ayer","ayuda","ayuno","azafrán","azar","azote","azúcar","azufre","azul","baba","babor","bache","bahía","baile","bajar","balanza","balcón","balde","bambú","banco","banda","baño","barba","barco","barniz","barro","báscula","bastón","basura","batalla","batería","batir","batuta","baúl","bazar","bebé","bebida","bello","besar","beso","bestia","bicho","bien","bingo","blanco","bloque","blusa","boa","bobina","bobo","boca","bocina","boda","bodega","boina","bola","bolero","bolsa","bomba","bondad","bonito","bono","bonsái","borde","borrar","bosque","bote","botín","bóveda","bozal","bravo","brazo","brecha","breve","brillo","brinco","brisa","broca","broma","bronce","brote","bruja","brusco","bruto","buceo","bucle","bueno","buey","bufanda","bufón","búho","buitre","bulto","burbuja","burla","burro","buscar","butaca","buzón","caballo","cabeza","cabina","cabra","cacao","cadáver","cadena","caer","café","caída","caimán","caja","cajón","cal","calamar","calcio","caldo","calidad","calle","calma","calor","calvo","cama","cambio","camello","camino","campo","cáncer","candil","canela","canguro","canica","canto","caña","cañón","caoba","caos","capaz","capitán","capote","captar","capucha","cara","carbón","cárcel","careta","carga","cariño","carne","carpeta","carro","carta","casa","casco","casero","caspa","castor","catorce","catre","caudal","causa","cazo","cebolla","ceder","cedro","celda","célebre","celoso","célula","cemento","ceniza","centro","cerca","cerdo","cereza","cero","cerrar","certeza","césped","cetro","chacal","chaleco","champú","chancla","chapa","charla","chico","chiste","chivo","choque","choza","chuleta","chupar","ciclón","ciego","cielo","cien","cierto","cifra","cigarro","cima","cinco","cine","cinta","ciprés","circo","ciruela","cisne","cita","ciudad","clamor","clan","claro","clase","clave","cliente","clima","clínica","cobre","cocción","cochino","cocina","coco","código","codo","cofre","coger","cohete","cojín","cojo","cola","colcha","colegio","colgar","colina","collar","colmo","columna","combate","comer","comida","cómodo","compra","conde","conejo","conga","conocer","consejo","contar","copa","copia","corazón","corbata","corcho","cordón","corona","correr","coser","cosmos","costa","cráneo","cráter","crear","crecer","creído","crema","cría","crimen","cripta","crisis","cromo","crónica","croqueta","crudo","cruz","cuadro","cuarto","cuatro","cubo","cubrir","cuchara","cuello","cuento","cuerda","cuesta","cueva","cuidar","culebra","culpa","culto","cumbre","cumplir","cuna","cuneta","cuota","cupón","cúpula","curar","curioso","curso","curva","cutis","dama","danza","dar","dardo","dátil","deber","débil","década","decir","dedo","defensa","definir","dejar","delfín","delgado","delito","demora","denso","dental","deporte","derecho","derrota","desayuno","deseo","desfile","desnudo","destino","desvío","detalle","detener","deuda","día","diablo","diadema","diamante","diana","diario","dibujo","dictar","diente","dieta","diez","difícil","digno","dilema","diluir","dinero","directo","dirigir","disco","diseño","disfraz","diva","divino","doble","doce","dolor","domingo","don","donar","dorado","dormir","dorso","dos","dosis","dragón","droga","ducha","duda","duelo","dueño","dulce","dúo","duque","durar","dureza","duro","ébano","ebrio","echar","eco","ecuador","edad","edición","edificio","editor","educar","efecto","eficaz","eje","ejemplo","elefante","elegir","elemento","elevar","elipse","élite","elixir","elogio","eludir","embudo","emitir","emoción","empate","empeño","empleo","empresa","enano","encargo","enchufe","encía","enemigo","enero","enfado","enfermo","engaño","enigma","enlace","enorme","enredo","ensayo","enseñar","entero","entrar","envase","envío","época","equipo","erizo","escala","escena","escolar","escribir","escudo","esencia","esfera","esfuerzo","espada","espejo","espía","esposa","espuma","esquí","estar","este","estilo","estufa","etapa","eterno","ética","etnia","evadir","evaluar","evento","evitar","exacto","examen","exceso","excusa","exento","exigir","exilio","existir","éxito","experto","explicar","exponer","extremo","fábrica","fábula","fachada","fácil","factor","faena","faja","falda","fallo","falso","faltar","fama","familia","famoso","faraón","farmacia","farol","farsa","fase","fatiga","fauna","favor","fax","febrero","fecha","feliz","feo","feria","feroz","fértil","fervor","festín","fiable","fianza","fiar","fibra","ficción","ficha","fideo","fiebre","fiel","fiera","fiesta","figura","fijar","fijo","fila","filete","filial","filtro","fin","finca","fingir","finito","firma","flaco","flauta","flecha","flor","flota","fluir","flujo","flúor","fobia","foca","fogata","fogón","folio","folleto","fondo","forma","forro","fortuna","forzar","fosa","foto","fracaso","frágil","franja","frase","fraude","freír","freno","fresa","frío","frito","fruta","fuego","fuente","fuerza","fuga","fumar","función","funda","furgón","furia","fusil","fútbol","futuro","gacela","gafas","gaita","gajo","gala","galería","gallo","gamba","ganar","gancho","ganga","ganso","garaje","garza","gasolina","gastar","gato","gavilán","gemelo","gemir","gen","género","genio","gente","geranio","gerente","germen","gesto","gigante","gimnasio","girar","giro","glaciar","globo","gloria","gol","golfo","goloso","golpe","goma","gordo","gorila","gorra","gota","goteo","gozar","grada","gráfico","grano","grasa","gratis","grave","grieta","grillo","gripe","gris","grito","grosor","grúa","grueso","grumo","grupo","guante","guapo","guardia","guerra","guía","guiño","guion","guiso","guitarra","gusano","gustar","haber","hábil","hablar","hacer","hacha","hada","hallar","hamaca","harina","haz","hazaña","hebilla","hebra","hecho","helado","helio","hembra","herir","hermano","héroe","hervir","hielo","hierro","hígado","higiene","hijo","himno","historia","hocico","hogar","hoguera","hoja","hombre","hongo","honor","honra","hora","hormiga","horno","hostil","hoyo","hueco","huelga","huerta","hueso","huevo","huida","huir","humano","húmedo","humilde","humo","hundir","huracán","hurto","icono","ideal","idioma","ídolo","iglesia","iglú","igual","ilegal","ilusión","imagen","imán","imitar","impar","imperio","imponer","impulso","incapaz","índice","inerte","infiel","informe","ingenio","inicio","inmenso","inmune","innato","insecto","instante","interés","íntimo","intuir","inútil","invierno","ira","iris","ironía","isla","islote","jabalí","jabón","jamón","jarabe","jardín","jarra","jaula","jazmín","jefe","jeringa","jinete","jornada","joroba","joven","joya","juerga","jueves","juez","jugador","jugo","juguete","juicio","junco","jungla","junio","juntar","júpiter","jurar","justo","juvenil","juzgar","kilo","koala","labio","lacio","lacra","lado","ladrón","lagarto","lágrima","laguna","laico","lamer","lámina","lámpara","lana","lancha","langosta","lanza","lápiz","largo","larva","lástima","lata","látex","latir","laurel","lavar","lazo","leal","lección","leche","lector","leer","legión","legumbre","lejano","lengua","lento","leña","león","leopardo","lesión","letal","letra","leve","leyenda","libertad","libro","licor","líder","lidiar","lienzo","liga","ligero","lima","límite","limón","limpio","lince","lindo","línea","lingote","lino","linterna","líquido","liso","lista","litera","litio","litro","llaga","llama","llanto","llave","llegar","llenar","llevar","llorar","llover","lluvia","lobo","loción","loco","locura","lógica","logro","lombriz","lomo","lonja","lote","lucha","lucir","lugar","lujo","luna","lunes","lupa","lustro","luto","luz","maceta","macho","madera","madre","maduro","maestro","mafia","magia","mago","maíz","maldad","maleta","malla","malo","mamá","mambo","mamut","manco","mando","manejar","manga","maniquí","manjar","mano","manso","manta","mañana","mapa","máquina","mar","marco","marea","marfil","margen","marido","mármol","marrón","martes","marzo","masa","máscara","masivo","matar","materia","matiz","matriz","máximo","mayor","mazorca","mecha","medalla","medio","médula","mejilla","mejor","melena","melón","memoria","menor","mensaje","mente","menú","mercado","merengue","mérito","mes","mesón","meta","meter","método","metro","mezcla","miedo","miel","miembro","miga","mil","milagro","militar","millón","mimo","mina","minero","mínimo","minuto","miope","mirar","misa","miseria","misil","mismo","mitad","mito","mochila","moción","moda","modelo","moho","mojar","molde","moler","molino","momento","momia","monarca","moneda","monja","monto","moño","morada","morder","moreno","morir","morro","morsa","mortal","mosca","mostrar","motivo","mover","móvil","mozo","mucho","mudar","mueble","muela","muerte","muestra","mugre","mujer","mula","muleta","multa","mundo","muñeca","mural","muro","músculo","museo","musgo","música","muslo","nácar","nación","nadar","naipe","naranja","nariz","narrar","nasal","natal","nativo","natural","náusea","naval","nave","navidad","necio","néctar","negar","negocio","negro","neón","nervio","neto","neutro","nevar","nevera","nicho","nido","niebla","nieto","niñez","niño","nítido","nivel","nobleza","noche","nómina","noria","norma","norte","nota","noticia","novato","novela","novio","nube","nuca","núcleo","nudillo","nudo","nuera","nueve","nuez","nulo","número","nutria","oasis","obeso","obispo","objeto","obra","obrero","observar","obtener","obvio","oca","ocaso","océano","ochenta","ocho","ocio","ocre","octavo","octubre","oculto","ocupar","ocurrir","odiar","odio","odisea","oeste","ofensa","oferta","oficio","ofrecer","ogro","oído","oír","ojo","ola","oleada","olfato","olivo","olla","olmo","olor","olvido","ombligo","onda","onza","opaco","opción","ópera","opinar","oponer","optar","óptica","opuesto","oración","orador","oral","órbita","orca","orden","oreja","órgano","orgía","orgullo","oriente","origen","orilla","oro","orquesta","oruga","osadía","oscuro","osezno","oso","ostra","otoño","otro","oveja","óvulo","óxido","oxígeno","oyente","ozono","pacto","padre","paella","página","pago","país","pájaro","palabra","palco","paleta","pálido","palma","paloma","palpar","pan","panal","pánico","pantera","pañuelo","papá","papel","papilla","paquete","parar","parcela","pared","parir","paro","párpado","parque","párrafo","parte","pasar","paseo","pasión","paso","pasta","pata","patio","patria","pausa","pauta","pavo","payaso","peatón","pecado","pecera","pecho","pedal","pedir","pegar","peine","pelar","peldaño","pelea","peligro","pellejo","pelo","peluca","pena","pensar","peñón","peón","peor","pepino","pequeño","pera","percha","perder","pereza","perfil","perico","perla","permiso","perro","persona","pesa","pesca","pésimo","pestaña","pétalo","petróleo","pez","pezuña","picar","pichón","pie","piedra","pierna","pieza","pijama","pilar","piloto","pimienta","pino","pintor","pinza","piña","piojo","pipa","pirata","pisar","piscina","piso","pista","pitón","pizca","placa","plan","plata","playa","plaza","pleito","pleno","plomo","pluma","plural","pobre","poco","poder","podio","poema","poesía","poeta","polen","policía","pollo","polvo","pomada","pomelo","pomo","pompa","poner","porción","portal","posada","poseer","posible","poste","potencia","potro","pozo","prado","precoz","pregunta","premio","prensa","preso","previo","primo","príncipe","prisión","privar","proa","probar","proceso","producto","proeza","profesor","programa","prole","promesa","pronto","propio","próximo","prueba","público","puchero","pudor","pueblo","puerta","puesto","pulga","pulir","pulmón","pulpo","pulso","puma","punto","puñal","puño","pupa","pupila","puré","quedar","queja","quemar","querer","queso","quieto","química","quince","quitar","rábano","rabia","rabo","ración","radical","raíz","rama","rampa","rancho","rango","rapaz","rápido","rapto","rasgo","raspa","rato","rayo","raza","razón","reacción","realidad","rebaño","rebote","recaer","receta","rechazo","recoger","recreo","recto","recurso","red","redondo","reducir","reflejo","reforma","refrán","refugio","regalo","regir","regla","regreso","rehén","reino","reír","reja","relato","relevo","relieve","relleno","reloj","remar","remedio","remo","rencor","rendir","renta","reparto","repetir","reposo","reptil","res","rescate","resina","respeto","resto","resumen","retiro","retorno","retrato","reunir","revés","revista","rey","rezar","rico","riego","rienda","riesgo","rifa","rígido","rigor","rincón","riñón","río","riqueza","risa","ritmo","rito","rizo","roble","roce","rociar","rodar","rodeo","rodilla","roer","rojizo","rojo","romero","romper","ron","ronco","ronda","ropa","ropero","rosa","rosca","rostro","rotar","rubí","rubor","rudo","rueda","rugir","ruido","ruina","ruleta","rulo","rumbo","rumor","ruptura","ruta","rutina","sábado","saber","sabio","sable","sacar","sagaz","sagrado","sala","saldo","salero","salir","salmón","salón","salsa","salto","salud","salvar","samba","sanción","sandía","sanear","sangre","sanidad","sano","santo","sapo","saque","sardina","sartén","sastre","satán","sauna","saxofón","sección","seco","secreto","secta","sed","seguir","seis","sello","selva","semana","semilla","senda","sensor","señal","señor","separar","sepia","sequía","ser","serie","sermón","servir","sesenta","sesión","seta","setenta","severo","sexo","sexto","sidra","siesta","siete","siglo","signo","sílaba","silbar","silencio","silla","símbolo","simio","sirena","sistema","sitio","situar","sobre","socio","sodio","sol","solapa","soldado","soledad","sólido","soltar","solución","sombra","sondeo","sonido","sonoro","sonrisa","sopa","soplar","soporte","sordo","sorpresa","sorteo","sostén","sótano","suave","subir","suceso","sudor","suegra","suelo","sueño","suerte","sufrir","sujeto","sultán","sumar","superar","suplir","suponer","supremo","sur","surco","sureño","surgir","susto","sutil","tabaco","tabique","tabla","tabú","taco","tacto","tajo","talar","talco","talento","talla","talón","tamaño","tambor","tango","tanque","tapa","tapete","tapia","tapón","taquilla","tarde","tarea","tarifa","tarjeta","tarot","tarro","tarta","tatuaje","tauro","taza","tazón","teatro","techo","tecla","técnica","tejado","tejer","tejido","tela","teléfono","tema","temor","templo","tenaz","tender","tener","tenis","tenso","teoría","terapia","terco","término","ternura","terror","tesis","tesoro","testigo","tetera","texto","tez","tibio","tiburón","tiempo","tienda","tierra","tieso","tigre","tijera","tilde","timbre","tímido","timo","tinta","tío","típico","tipo","tira","tirón","titán","títere","título","tiza","toalla","tobillo","tocar","tocino","todo","toga","toldo","tomar","tono","tonto","topar","tope","toque","tórax","torero","tormenta","torneo","toro","torpedo","torre","torso","tortuga","tos","tosco","toser","tóxico","trabajo","tractor","traer","tráfico","trago","traje","tramo","trance","trato","trauma","trazar","trébol","tregua","treinta","tren","trepar","tres","tribu","trigo","tripa","triste","triunfo","trofeo","trompa","tronco","tropa","trote","trozo","truco","trueno","trufa","tubería","tubo","tuerto","tumba","tumor","túnel","túnica","turbina","turismo","turno","tutor","ubicar","úlcera","umbral","unidad","unir","universo","uno","untar","uña","urbano","urbe","urgente","urna","usar","usuario","útil","utopía","uva","vaca","vacío","vacuna","vagar","vago","vaina","vajilla","vale","válido","valle","valor","válvula","vampiro","vara","variar","varón","vaso","vecino","vector","vehículo","veinte","vejez","vela","velero","veloz","vena","vencer","venda","veneno","vengar","venir","venta","venus","ver","verano","verbo","verde","vereda","verja","verso","verter","vía","viaje","vibrar","vicio","víctima","vida","vídeo","vidrio","viejo","viernes","vigor","vil","villa","vinagre","vino","viñedo","violín","viral","virgo","virtud","visor","víspera","vista","vitamina","viudo","vivaz","vivero","vivir","vivo","volcán","volumen","volver","voraz","votar","voto","voz","vuelo","vulgar","yacer","yate","yegua","yema","yerno","yeso","yodo","yoga","yogur","zafiro","zanja","zapato","zarza","zona","zorro","zumo","zurdo"]')
            }
        },
        t = {};

    function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o](i, i.exports, r), i.exports
    }
    r.d = (e, t) => {
        for (var o in t) r.o(t, o) && !r.o(e, o) && Object.defineProperty(e, o, {
            enumerable: !0,
            get: t[o]
        })
    }, r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    };
    var o = {};
    return (() => {
        "use strict";
        var e = r(4686);
        window.Buffer = e.Buffer
    })(), (() => {
        "use strict";
        r.r(o), r.d(o, {
            BitcoinLibs: () => rt
        });
        var e = {};

        function t(e) {
            if (!Number.isSafeInteger(e) || e < 0) throw new Error("positive integer expected, got " + e)
        }

        function n(e, ...t) {
            if (!((r = e) instanceof Uint8Array || ArrayBuffer.isView(r) && "Uint8Array" === r.constructor.name)) throw new Error("Uint8Array expected");
            var r;
            if (t.length > 0 && !t.includes(e.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length)
        }

        function i(e, t = !0) {
            if (e.destroyed) throw new Error("Hash instance has been destroyed");
            if (t && e.finished) throw new Error("Hash#digest() has already been called")
        }
        r.r(e), r.d(e, {
            BIP32Factory: () => tt,
            default: () => tt
        });
        const a = e => new DataView(e.buffer, e.byteOffset, e.byteLength),
            s = (e, t) => e << 32 - t | e >>> t,
            u = (e, t) => e << t | e >>> 32 - t >>> 0;

        function c(e) {
            return "string" == typeof e && (e = function(e) {
                if ("string" != typeof e) throw new Error("utf8ToBytes expected string, got " + typeof e);
                return new Uint8Array((new TextEncoder).encode(e))
            }(e)), n(e), e
        }
        class l {
            clone() {
                return this._cloneInto()
            }
        }

        function f(e) {
            const t = t => e().update(c(t)).digest(),
                r = e();
            return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t
        }
        class d extends l {
            constructor(e, r) {
                super(), this.finished = !1, this.destroyed = !1,
                    function(e) {
                        if ("function" != typeof e || "function" != typeof e.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
                        t(e.outputLen), t(e.blockLen)
                    }(e);
                const o = c(r);
                if (this.iHash = e.create(), "function" != typeof this.iHash.update) throw new Error("Expected instance of class which extends utils.Hash");
                this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                const n = this.blockLen,
                    i = new Uint8Array(n);
                i.set(o.length > n ? e.create().update(o).digest() : o);
                for (let e = 0; e < i.length; e++) i[e] ^= 54;
                this.iHash.update(i), this.oHash = e.create();
                for (let e = 0; e < i.length; e++) i[e] ^= 106;
                this.oHash.update(i), i.fill(0)
            }
            update(e) {
                return i(this), this.iHash.update(e), this
            }
            digestInto(e) {
                i(this), n(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy()
            }
            digest() {
                const e = new Uint8Array(this.oHash.outputLen);
                return this.digestInto(e), e
            }
            _cloneInto(e) {
                e || (e = Object.create(Object.getPrototypeOf(this), {}));
                const {
                    oHash: t,
                    iHash: r,
                    finished: o,
                    destroyed: n,
                    blockLen: i,
                    outputLen: a
                } = this;
                return e.finished = o, e.destroyed = n, e.blockLen = i, e.outputLen = a, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e
            }
            destroy() {
                this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
            }
        }
        const h = (e, t, r) => new d(e, t).update(r).digest();
        h.create = (e, t) => new d(e, t);
        const p = (e, t, r) => e & t ^ e & r ^ t & r;
        class b extends l {
            constructor(e, t, r, o) {
                super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = a(this.buffer)
            }
            update(e) {
                i(this);
                const {
                    view: t,
                    buffer: r,
                    blockLen: o
                } = this, n = (e = c(e)).length;
                for (let i = 0; i < n;) {
                    const s = Math.min(o - this.pos, n - i);
                    if (s !== o) r.set(e.subarray(i, i + s), this.pos), this.pos += s, i += s, this.pos === o && (this.process(t, 0), this.pos = 0);
                    else {
                        const t = a(e);
                        for (; o <= n - i; i += o) this.process(t, i)
                    }
                }
                return this.length += e.length, this.roundClean(), this
            }
            digestInto(e) {
                i(this),
                    function(e, t) {
                        n(e);
                        const r = t.outputLen;
                        if (e.length < r) throw new Error("digestInto() expects output buffer of length at least " + r)
                    }(e, this), this.finished = !0;
                const {
                    buffer: t,
                    view: r,
                    blockLen: o,
                    isLE: s
                } = this;
                let {
                    pos: u
                } = this;
                t[u++] = 128, this.buffer.subarray(u).fill(0), this.padOffset > o - u && (this.process(r, 0), u = 0);
                for (let e = u; e < o; e++) t[e] = 0;
                ! function(e, t, r, o) {
                    if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, o);
                    const n = BigInt(32),
                        i = BigInt(4294967295),
                        a = Number(r >> n & i),
                        s = Number(r & i),
                        u = o ? 4 : 0,
                        c = o ? 0 : 4;
                    e.setUint32(t + u, a, o), e.setUint32(t + c, s, o)
                }(r, o - 8, BigInt(8 * this.length), s), this.process(r, 0);
                const c = a(e),
                    l = this.outputLen;
                if (l % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
                const f = l / 4,
                    d = this.get();
                if (f > d.length) throw new Error("_sha2: outputLen bigger than state");
                for (let e = 0; e < f; e++) c.setUint32(4 * e, d[e], s)
            }
            digest() {
                const {
                    buffer: e,
                    outputLen: t
                } = this;
                this.digestInto(e);
                const r = e.slice(0, t);
                return this.destroy(), r
            }
            _cloneInto(e) {
                e || (e = new this.constructor), e.set(...this.get());
                const {
                    blockLen: t,
                    buffer: r,
                    length: o,
                    finished: n,
                    destroyed: i,
                    pos: a
                } = this;
                return e.length = o, e.pos = a, e.finished = n, e.destroyed = i, o % t && e.buffer.set(r), e
            }
        }
        const g = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]),
            m = new Uint8Array(new Array(16).fill(0).map(((e, t) => t)));
        let y = [m],
            v = [m.map((e => (9 * e + 5) % 16))];
        for (let e = 0; e < 4; e++)
            for (let t of [y, v]) t.push(t[e].map((e => g[e])));
        const w = [
                [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
                [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
                [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
                [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
                [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
            ].map((e => new Uint8Array(e))),
            k = y.map(((e, t) => e.map((e => w[t][e])))),
            E = v.map(((e, t) => e.map((e => w[t][e])))),
            _ = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]),
            S = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]);

        function T(e, t, r, o) {
            return 0 === e ? t ^ r ^ o : 1 === e ? t & r | ~t & o : 2 === e ? (t | ~r) ^ o : 3 === e ? t & o | r & ~o : t ^ (r | ~o)
        }
        const x = new Uint32Array(16);
        class I extends b {
            constructor() {
                super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776
            }
            get() {
                const {
                    h0: e,
                    h1: t,
                    h2: r,
                    h3: o,
                    h4: n
                } = this;
                return [e, t, r, o, n]
            }
            set(e, t, r, o, n) {
                this.h0 = 0 | e, this.h1 = 0 | t, this.h2 = 0 | r, this.h3 = 0 | o, this.h4 = 0 | n
            }
            process(e, t) {
                for (let r = 0; r < 16; r++, t += 4) x[r] = e.getUint32(t, !0);
                let r = 0 | this.h0,
                    o = r,
                    n = 0 | this.h1,
                    i = n,
                    a = 0 | this.h2,
                    s = a,
                    c = 0 | this.h3,
                    l = c,
                    f = 0 | this.h4,
                    d = f;
                for (let e = 0; e < 5; e++) {
                    const t = 4 - e,
                        h = _[e],
                        p = S[e],
                        b = y[e],
                        g = v[e],
                        m = k[e],
                        w = E[e];
                    for (let t = 0; t < 16; t++) {
                        const o = u(r + T(e, n, a, c) + x[b[t]] + h, m[t]) + f | 0;
                        r = f, f = c, c = 0 | u(a, 10), a = n, n = o
                    }
                    for (let e = 0; e < 16; e++) {
                        const r = u(o + T(t, i, s, l) + x[g[e]] + p, w[e]) + d | 0;
                        o = d, d = l, l = 0 | u(s, 10), s = i, i = r
                    }
                }
                this.set(this.h1 + a + l | 0, this.h2 + c + d | 0, this.h3 + f + o | 0, this.h4 + r + i | 0, this.h0 + n + s | 0)
            }
            roundClean() {
                x.fill(0)
            }
            destroy() {
                this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0)
            }
        }
        const B = f((() => new I)),
            A = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
            O = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
            P = new Uint32Array(64);
        class z extends b {
            constructor() {
                super(64, 32, 8, !1), this.A = 0 | O[0], this.B = 0 | O[1], this.C = 0 | O[2], this.D = 0 | O[3], this.E = 0 | O[4], this.F = 0 | O[5], this.G = 0 | O[6], this.H = 0 | O[7]
            }
            get() {
                const {
                    A: e,
                    B: t,
                    C: r,
                    D: o,
                    E: n,
                    F: i,
                    G: a,
                    H: s
                } = this;
                return [e, t, r, o, n, i, a, s]
            }
            set(e, t, r, o, n, i, a, s) {
                this.A = 0 | e, this.B = 0 | t, this.C = 0 | r, this.D = 0 | o, this.E = 0 | n, this.F = 0 | i, this.G = 0 | a, this.H = 0 | s
            }
            process(e, t) {
                for (let r = 0; r < 16; r++, t += 4) P[r] = e.getUint32(t, !1);
                for (let e = 16; e < 64; e++) {
                    const t = P[e - 15],
                        r = P[e - 2],
                        o = s(t, 7) ^ s(t, 18) ^ t >>> 3,
                        n = s(r, 17) ^ s(r, 19) ^ r >>> 10;
                    P[e] = n + P[e - 7] + o + P[e - 16] | 0
                }
                let {
                    A: r,
                    B: o,
                    C: n,
                    D: i,
                    E: a,
                    F: u,
                    G: c,
                    H: l
                } = this;
                for (let e = 0; e < 64; e++) {
                    const t = l + (s(a, 6) ^ s(a, 11) ^ s(a, 25)) + ((f = a) & u ^ ~f & c) + A[e] + P[e] | 0,
                        d = (s(r, 2) ^ s(r, 13) ^ s(r, 22)) + p(r, o, n) | 0;
                    l = c, c = u, u = a, a = i + t | 0, i = n, n = o, o = r, r = t + d | 0
                }
                var f;
                r = r + this.A | 0, o = o + this.B | 0, n = n + this.C | 0, i = i + this.D | 0, a = a + this.E | 0, u = u + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(r, o, n, i, a, u, c, l)
            }
            roundClean() {
                P.fill(0)
            }
            destroy() {
                this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
            }
        }
        const j = f((() => new z)),
            U = BigInt(2 ** 32 - 1),
            L = BigInt(32);

        function N(e, t = !1) {
            return t ? {
                h: Number(e & U),
                l: Number(e >> L & U)
            } : {
                h: 0 | Number(e >> L & U),
                l: 0 | Number(e & U)
            }
        }
        const R = {
                fromBig: N,
                split: function(e, t = !1) {
                    let r = new Uint32Array(e.length),
                        o = new Uint32Array(e.length);
                    for (let n = 0; n < e.length; n++) {
                        const {
                            h: i,
                            l: a
                        } = N(e[n], t);
                        [r[n], o[n]] = [i, a]
                    }
                    return [r, o]
                },
                toBig: (e, t) => BigInt(e >>> 0) << L | BigInt(t >>> 0),
                shrSH: (e, t, r) => e >>> r,
                shrSL: (e, t, r) => e << 32 - r | t >>> r,
                rotrSH: (e, t, r) => e >>> r | t << 32 - r,
                rotrSL: (e, t, r) => e << 32 - r | t >>> r,
                rotrBH: (e, t, r) => e << 64 - r | t >>> r - 32,
                rotrBL: (e, t, r) => e >>> r - 32 | t << 64 - r,
                rotr32H: (e, t) => t,
                rotr32L: (e, t) => e,
                rotlSH: (e, t, r) => e << r | t >>> 32 - r,
                rotlSL: (e, t, r) => t << r | e >>> 32 - r,
                rotlBH: (e, t, r) => t << r - 32 | e >>> 64 - r,
                rotlBL: (e, t, r) => e << r - 32 | t >>> 64 - r,
                add: function(e, t, r, o) {
                    const n = (t >>> 0) + (o >>> 0);
                    return {
                        h: e + r + (n / 2 ** 32 | 0) | 0,
                        l: 0 | n
                    }
                },
                add3L: (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0),
                add3H: (e, t, r, o) => t + r + o + (e / 2 ** 32 | 0) | 0,
                add4L: (e, t, r, o) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (o >>> 0),
                add4H: (e, t, r, o, n) => t + r + o + n + (e / 2 ** 32 | 0) | 0,
                add5H: (e, t, r, o, n, i) => t + r + o + n + i + (e / 2 ** 32 | 0) | 0,
                add5L: (e, t, r, o, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (o >>> 0) + (n >>> 0)
            },
            H = R,
            [C, M] = (() => H.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((e => BigInt(e)))))(),
            D = new Uint32Array(80),
            q = new Uint32Array(80);
        class F extends b {
            constructor() {
                super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
            }
            get() {
                const {
                    Ah: e,
                    Al: t,
                    Bh: r,
                    Bl: o,
                    Ch: n,
                    Cl: i,
                    Dh: a,
                    Dl: s,
                    Eh: u,
                    El: c,
                    Fh: l,
                    Fl: f,
                    Gh: d,
                    Gl: h,
                    Hh: p,
                    Hl: b
                } = this;
                return [e, t, r, o, n, i, a, s, u, c, l, f, d, h, p, b]
            }
            set(e, t, r, o, n, i, a, s, u, c, l, f, d, h, p, b) {
                this.Ah = 0 | e, this.Al = 0 | t, this.Bh = 0 | r, this.Bl = 0 | o, this.Ch = 0 | n, this.Cl = 0 | i, this.Dh = 0 | a, this.Dl = 0 | s, this.Eh = 0 | u, this.El = 0 | c, this.Fh = 0 | l, this.Fl = 0 | f, this.Gh = 0 | d, this.Gl = 0 | h, this.Hh = 0 | p, this.Hl = 0 | b
            }
            process(e, t) {
                for (let r = 0; r < 16; r++, t += 4) D[r] = e.getUint32(t), q[r] = e.getUint32(t += 4);
                for (let e = 16; e < 80; e++) {
                    const t = 0 | D[e - 15],
                        r = 0 | q[e - 15],
                        o = H.rotrSH(t, r, 1) ^ H.rotrSH(t, r, 8) ^ H.shrSH(t, r, 7),
                        n = H.rotrSL(t, r, 1) ^ H.rotrSL(t, r, 8) ^ H.shrSL(t, r, 7),
                        i = 0 | D[e - 2],
                        a = 0 | q[e - 2],
                        s = H.rotrSH(i, a, 19) ^ H.rotrBH(i, a, 61) ^ H.shrSH(i, a, 6),
                        u = H.rotrSL(i, a, 19) ^ H.rotrBL(i, a, 61) ^ H.shrSL(i, a, 6),
                        c = H.add4L(n, u, q[e - 7], q[e - 16]),
                        l = H.add4H(c, o, s, D[e - 7], D[e - 16]);
                    D[e] = 0 | l, q[e] = 0 | c
                }
                let {
                    Ah: r,
                    Al: o,
                    Bh: n,
                    Bl: i,
                    Ch: a,
                    Cl: s,
                    Dh: u,
                    Dl: c,
                    Eh: l,
                    El: f,
                    Fh: d,
                    Fl: h,
                    Gh: p,
                    Gl: b,
                    Hh: g,
                    Hl: m
                } = this;
                for (let e = 0; e < 80; e++) {
                    const t = H.rotrSH(l, f, 14) ^ H.rotrSH(l, f, 18) ^ H.rotrBH(l, f, 41),
                        y = H.rotrSL(l, f, 14) ^ H.rotrSL(l, f, 18) ^ H.rotrBL(l, f, 41),
                        v = l & d ^ ~l & p,
                        w = f & h ^ ~f & b,
                        k = H.add5L(m, y, w, M[e], q[e]),
                        E = H.add5H(k, g, t, v, C[e], D[e]),
                        _ = 0 | k,
                        S = H.rotrSH(r, o, 28) ^ H.rotrBH(r, o, 34) ^ H.rotrBH(r, o, 39),
                        T = H.rotrSL(r, o, 28) ^ H.rotrBL(r, o, 34) ^ H.rotrBL(r, o, 39),
                        x = r & n ^ r & a ^ n & a,
                        I = o & i ^ o & s ^ i & s;
                    g = 0 | p, m = 0 | b, p = 0 | d, b = 0 | h, d = 0 | l, h = 0 | f, ({
                        h: l,
                        l: f
                    } = H.add(0 | u, 0 | c, 0 | E, 0 | _)), u = 0 | a, c = 0 | s, a = 0 | n, s = 0 | i, n = 0 | r, i = 0 | o;
                    const B = H.add3L(_, T, I);
                    r = H.add3H(B, E, S, x), o = 0 | B
                }({
                    h: r,
                    l: o
                } = H.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | o)), ({
                    h: n,
                    l: i
                } = H.add(0 | this.Bh, 0 | this.Bl, 0 | n, 0 | i)), ({
                    h: a,
                    l: s
                } = H.add(0 | this.Ch, 0 | this.Cl, 0 | a, 0 | s)), ({
                    h: u,
                    l: c
                } = H.add(0 | this.Dh, 0 | this.Dl, 0 | u, 0 | c)), ({
                    h: l,
                    l: f
                } = H.add(0 | this.Eh, 0 | this.El, 0 | l, 0 | f)), ({
                    h: d,
                    l: h
                } = H.add(0 | this.Fh, 0 | this.Fl, 0 | d, 0 | h)), ({
                    h: p,
                    l: b
                } = H.add(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | b)), ({
                    h: g,
                    l: m
                } = H.add(0 | this.Hh, 0 | this.Hl, 0 | g, 0 | m)), this.set(r, o, n, i, a, s, u, c, l, f, d, h, p, b, g, m)
            }
            roundClean() {
                D.fill(0), q.fill(0)
            }
            destroy() {
                this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        const K = f((() => new F));

        function V(e, t) {
            return h(K, e, t)
        }
        const W = "0123456789abcdefABCDEF",
            G = (W.split("").map((e => e.codePointAt(0))), Array(256).fill(!0).map(((e, t) => {
                const r = String.fromCodePoint(t),
                    o = W.indexOf(r);
                return o < 0 ? void 0 : o < 16 ? o : o - 6
            }))),
            X = new TextEncoder;

        function $(e, t) {
            const r = Math.min(e.length, t.length);
            for (let o = 0; o < r; ++o)
                if (e[o] !== t[o]) return e[o] < t[o] ? -1 : 1;
            return e.length === t.length ? 0 : e.length > t.length ? 1 : -1
        }

        function Y(e, t, r) {
            if (t + 1 > e.length) throw new Error("Offset is outside the bounds of Uint8Array");
            if (r > 255) throw new Error(`The value of "value" is out of range. It must be >= 0 and <= 255. Received ${r}`);
            e[t] = r
        }

        function J(e, t, r, o) {
            if (t + 4 > e.length) throw new Error("Offset is outside the bounds of Uint8Array");
            if (o = o.toUpperCase(), r > 4294967295) throw new Error(`The value of "value" is out of range. It must be >= 0 and <= 4294967295. Received ${r}`);
            "LE" === o ? (e[t] = 255 & r, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255) : (e[t] = r >> 24 & 255, e[t + 1] = r >> 16 & 255, e[t + 2] = r >> 8 & 255, e[t + 3] = 255 & r)
        }

        function Z(e, t, r) {
            if (t + 4 > e.length) throw new Error("Offset is outside the bounds of Uint8Array");
            if ("LE" === (r = r.toUpperCase())) {
                let r = 0;
                return r = (r << 8) + e[t + 3] >>> 0, r = (r << 8) + e[t + 2] >>> 0, r = (r << 8) + e[t + 1] >>> 0, r = (r << 8) + e[t] >>> 0, r
            } {
                let r = 0;
                return r = (r << 8) + e[t] >>> 0, r = (r << 8) + e[t + 1] >>> 0, r = (r << 8) + e[t + 2] >>> 0, r = (r << 8) + e[t + 3] >>> 0, r
            }
        }
        new TextDecoder;
        const Q = e => function(e) {
            const t = X.encode(e || ""),
                r = new Uint8Array(Math.floor(t.length / 2));
            let o;
            for (o = 0; o < r.length; o++) {
                const e = G[t[2 * o]],
                    n = G[t[2 * o + 1]];
                if (void 0 === e || void 0 === n) break;
                r[o] = e << 4 | n
            }
            return o === r.length ? r : r.slice(0, o)
        }(e);

        function ee(e) {
            if (!e) throw new Error("ecc library invalid")
        }

        function te(e) {
            return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name
        }

        function re(e, t) {
            return !!Array.isArray(t) && (0 === t.length || (e ? t.every((e => "string" == typeof e)) : t.every((e => Number.isSafeInteger(e)))))
        }

        function oe(e) {
            if ("function" != typeof e) throw new Error("function expected");
            return !0
        }

        function ne(e, t) {
            if ("string" != typeof t) throw new Error(`${e}: string expected`);
            return !0
        }

        function ie(e) {
            if (!Number.isSafeInteger(e)) throw new Error(`invalid integer: ${e}`)
        }

        function ae(e) {
            if (!Array.isArray(e)) throw new Error("array expected")
        }

        function se(e, t) {
            if (!re(!0, t)) throw new Error(`${e}: array of strings expected`)
        }

        function ue(e, t) {
            if (!re(!1, t)) throw new Error(`${e}: array of numbers expected`)
        }

        function ce(...e) {
            const t = e => e,
                r = (e, t) => r => e(t(r));
            return {
                encode: e.map((e => e.encode)).reduceRight(r, t),
                decode: e.map((e => e.decode)).reduce(r, t)
            }
        }

        function le(e) {
            const t = "string" == typeof e ? e.split("") : e,
                r = t.length;
            se("alphabet", t);
            const o = new Map(t.map(((e, t) => [e, t])));
            return {
                encode: o => (ae(o), o.map((o => {
                    if (!Number.isSafeInteger(o) || o < 0 || o >= r) throw new Error(`alphabet.encode: digit index outside alphabet "${o}". Allowed: ${e}`);
                    return t[o]
                }))),
                decode: t => (ae(t), t.map((t => {
                    ne("alphabet.decode", t);
                    const r = o.get(t);
                    if (void 0 === r) throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                    return r
                })))
            }
        }

        function fe(e = "") {
            return ne("join", e), {
                encode: t => (se("join.decode", t), t.join(e)),
                decode: t => (ne("join.decode", t), t.split(e))
            }
        }

        function de(e, t = "=") {
            return ie(e), ne("padding", t), {
                encode(r) {
                    for (se("padding.encode", r); r.length * e % 8;) r.push(t);
                    return r
                },
                decode(r) {
                    se("padding.decode", r);
                    let o = r.length;
                    if (o * e % 8) throw new Error("padding: invalid, string should have whole number of bytes");
                    for (; o > 0 && r[o - 1] === t; o--)
                        if ((o - 1) * e % 8 == 0) throw new Error("padding: invalid, string has too much padding");
                    return r.slice(0, o)
                }
            }
        }

        function he(e) {
            return oe(e), {
                encode: e => e,
                decode: t => e(t)
            }
        }

        function pe(e, t, r) {
            if (t < 2) throw new Error(`convertRadix: invalid from=${t}, base cannot be less than 2`);
            if (r < 2) throw new Error(`convertRadix: invalid to=${r}, base cannot be less than 2`);
            if (ae(e), !e.length) return [];
            let o = 0;
            const n = [],
                i = Array.from(e, (e => {
                    if (ie(e), e < 0 || e >= t) throw new Error(`invalid integer: ${e}`);
                    return e
                })),
                a = i.length;
            for (;;) {
                let e = 0,
                    s = !0;
                for (let n = o; n < a; n++) {
                    const a = i[n],
                        u = t * e,
                        c = u + a;
                    if (!Number.isSafeInteger(c) || u / t !== e || c - a !== u) throw new Error("convertRadix: carry overflow");
                    const l = c / r;
                    e = c % r;
                    const f = Math.floor(l);
                    if (i[n] = f, !Number.isSafeInteger(f) || f * r + e !== c) throw new Error("convertRadix: carry overflow");
                    s && (f ? s = !1 : o = n)
                }
                if (n.push(e), s) break
            }
            for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) n.push(0);
            return n.reverse()
        }
        const be = (e, t) => 0 === t ? e : be(t, e % t),
            ge = (e, t) => e + (t - be(e, t)),
            me = (() => {
                let e = [];
                for (let t = 0; t < 40; t++) e.push(2 ** t);
                return e
            })();

        function ye(e, t, r, o) {
            if (ae(e), t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
            if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
            if (ge(t, r) > 32) throw new Error(`convertRadix2: carry overflow from=${t} to=${r} carryBits=${ge(t,r)}`);
            let n = 0,
                i = 0;
            const a = me[t],
                s = me[r] - 1,
                u = [];
            for (const o of e) {
                if (ie(o), o >= a) throw new Error(`convertRadix2: invalid data word=${o} from=${t}`);
                if (n = n << t | o, i + t > 32) throw new Error(`convertRadix2: carry overflow pos=${i} from=${t}`);
                for (i += t; i >= r; i -= r) u.push((n >> i - r & s) >>> 0);
                const e = me[i];
                if (void 0 === e) throw new Error("invalid carry");
                n &= e - 1
            }
            if (n = n << r - i & s, !o && i >= t) throw new Error("Excess padding");
            if (!o && n > 0) throw new Error(`Non-zero padding: ${n}`);
            return o && i > 0 && u.push(n >>> 0), u
        }

        function ve(e, t = !1) {
            if (ie(e), e <= 0 || e > 32) throw new Error("radix2: bits should be in (0..32]");
            if (ge(8, e) > 32 || ge(e, 8) > 32) throw new Error("radix2: carry overflow");
            return {
                encode: r => {
                    if (!te(r)) throw new Error("radix2.encode input should be Uint8Array");
                    return ye(Array.from(r), 8, e, !t)
                },
                decode: r => (ue("radix2.decode", r), Uint8Array.from(ye(r, e, 8, t)))
            }
        }

        function we(e) {
            return oe(e),
                function(...t) {
                    try {
                        return e.apply(null, t)
                    } catch (e) {}
                }
        }
        ce(ve(4), le("0123456789ABCDEF"), fe("")), ce(ve(5), le("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), de(5), fe("")), ce(ve(5), le("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), fe("")), ce(ve(5), le("0123456789ABCDEFGHIJKLMNOPQRSTUV"), de(5), fe("")), ce(ve(5), le("0123456789ABCDEFGHIJKLMNOPQRSTUV"), fe("")), ce(ve(5), le("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), fe(""), he((e => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")))), ce(ve(6), le("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), de(6), fe("")), ce(ve(6), le("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), fe("")), ce(ve(6), le("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), de(6), fe(""));
        const ke = (ce(ve(6), le("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), fe("")), e => {
                return ce((ie(t = 58), {
                    encode: e => {
                        if (!te(e)) throw new Error("radix.encode input should be Uint8Array");
                        return pe(Array.from(e), 256, t)
                    },
                    decode: e => (ue("radix.decode", e), Uint8Array.from(pe(e, t, 256)))
                }), le(e), fe(""));
                var t
            }),
            Ee = ke("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),
            _e = (ke("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"), ke("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"), ce(le("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), fe(""))),
            Se = [996825010, 642813549, 513874426, 1027748829, 705979059];

        function Te(e) {
            const t = e >> 25;
            let r = (33554431 & e) << 5;
            for (let e = 0; e < Se.length; e++) 1 == (t >> e & 1) && (r ^= Se[e]);
            return r
        }

        function xe(e, t, r = 1) {
            const o = e.length;
            let n = 1;
            for (let t = 0; t < o; t++) {
                const r = e.charCodeAt(t);
                if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                n = Te(n) ^ r >> 5
            }
            n = Te(n);
            for (let t = 0; t < o; t++) n = Te(n) ^ 31 & e.charCodeAt(t);
            for (let e of t) n = Te(n) ^ e;
            for (let e = 0; e < 6; e++) n = Te(n);
            return n ^= r, _e.encode(ye([n % me[30]], 30, 5, !1))
        }

        function Ie(e) {
            const t = "bech32" === e ? 1 : 734539939,
                r = ve(5),
                o = r.decode,
                n = r.encode,
                i = we(o);

            function a(e, r, o = 90) {
                ne("bech32.encode prefix", e), te(r) && (r = Array.from(r)), ue("bech32.encode", r);
                const n = e.length;
                if (0 === n) throw new TypeError(`Invalid prefix length ${n}`);
                const i = n + 7 + r.length;
                if (!1 !== o && i > o) throw new TypeError(`Length ${i} exceeds limit ${o}`);
                const a = e.toLowerCase(),
                    s = xe(a, r, t);
                return `${a}1${_e.encode(r)}${s}`
            }

            function s(e, r = 90) {
                ne("bech32.decode input", e);
                const o = e.length;
                if (o < 8 || !1 !== r && o > r) throw new TypeError(`invalid string length: ${o} (${e}). Expected (8..${r})`);
                const n = e.toLowerCase();
                if (e !== n && e !== e.toUpperCase()) throw new Error("String must be lowercase or uppercase");
                const i = n.lastIndexOf("1");
                if (0 === i || -1 === i) throw new Error('Letter "1" must be present between prefix and data only');
                const a = n.slice(0, i),
                    s = n.slice(i + 1);
                if (s.length < 6) throw new Error("Data must be at least 6 characters long");
                const u = _e.decode(s).slice(0, -6),
                    c = xe(a, u, t);
                if (!s.endsWith(c)) throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
                return {
                    prefix: a,
                    words: u
                }
            }
            return {
                encode: a,
                decode: s,
                encodeFromBytes: function(e, t) {
                    return a(e, n(t))
                },
                decodeToBytes: function(e) {
                    const {
                        prefix: t,
                        words: r
                    } = s(e, !1);
                    return {
                        prefix: t,
                        words: r,
                        bytes: o(r)
                    }
                },
                decodeUnsafe: we(s),
                fromWords: o,
                fromWordsUnsafe: i,
                toWords: n
            }
        }
        Ie("bech32"), Ie("bech32m");
        var Be, Ae, Oe, Pe;

        function ze(e) {
            const t = typeof e;
            return "string" === t ? `"${e}"` : "number" === t || "bigint" === t || "boolean" === t ? `${e}` : "object" === t || "function" === t ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t
        }

        function je(e, t, r, o, n) {
            const i = n && "input" in n ? n.input : r.value,
                a = n?.expected ?? e.expects ?? null,
                s = n?.received ?? ze(i),
                u = {
                    kind: e.kind,
                    type: e.type,
                    input: i,
                    expected: a,
                    received: s,
                    message: `Invalid ${t}: ${a?`Expected ${a} but r`:"R"}eceived ${s}`,
                    requirement: e.requirement,
                    path: n?.path,
                    issues: n?.issues,
                    lang: o.lang,
                    abortEarly: o.abortEarly,
                    abortPipeEarly: o.abortPipeEarly
                },
                c = "schema" === e.kind,
                l = n?.message ?? e.message ?? (f = e.reference, d = u.lang, Pe?.get(f)?.get(d)) ?? (c ? function(e) {
                    return Oe?.get(e)
                }(u.lang) : null) ?? o.message ?? function(e) {
                    return Ae?.get(e)
                }(u.lang);
            var f, d;
            l && (u.message = "function" == typeof l ? l(u) : l), c && (r.typed = !1), r.issues ? r.issues.push(u) : r.issues = [u]
        }
        ce(ve(4), le("0123456789abcdef"), fe(""), he((e => {
            if ("string" != typeof e || e.length % 2 != 0) throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
            return e.toLowerCase()
        })));
        var Ue = class extends Error {
            issues;
            constructor(e) {
                super(e[0].message), this.name = "ValiError", this.issues = e
            }
        };

        function Le(e) {
            return {
                kind: "validation",
                type: "integer",
                reference: Le,
                async: !1,
                expects: null,
                requirement: Number.isInteger,
                message: e,
                _run(e, t) {
                    return e.typed && !this.requirement(e.value) && je(this, "integer", e, t), e
                }
            }
        }

        function Ne(e, t) {
            return {
                kind: "validation",
                type: "length",
                reference: Ne,
                async: !1,
                expects: `${e}`,
                requirement: e,
                message: t,
                _run(e, t) {
                    return e.typed && e.value.length !== this.requirement && je(this, "length", e, t, {
                        received: `${e.value.length}`
                    }), e
                }
            }
        }

        function Re(e, t) {
            return {
                kind: "validation",
                type: "max_value",
                reference: Re,
                async: !1,
                expects: `<=${e instanceof Date?e.toJSON():ze(e)}`,
                requirement: e,
                message: t,
                _run(e, t) {
                    return e.typed && e.value > this.requirement && je(this, "value", e, t, {
                        received: e.value instanceof Date ? e.value.toJSON() : ze(e.value)
                    }), e
                }
            }
        }

        function He(e, t) {
            return {
                kind: "validation",
                type: "min_value",
                reference: He,
                async: !1,
                expects: `>=${e instanceof Date?e.toJSON():ze(e)}`,
                requirement: e,
                message: t,
                _run(e, t) {
                    return e.typed && e.value < this.requirement && je(this, "value", e, t, {
                        received: e.value instanceof Date ? e.value.toJSON() : ze(e.value)
                    }), e
                }
            }
        }

        function Ce(e, t) {
            return {
                kind: "schema",
                type: "instance",
                reference: Ce,
                expects: e.name,
                async: !1,
                class: e,
                message: t,
                _run(e, t) {
                    return e.value instanceof this.class ? e.typed = !0 : je(this, "type", e, t), e
                }
            }
        }

        function Me(e) {
            return {
                kind: "schema",
                type: "number",
                reference: Me,
                expects: "number",
                async: !1,
                message: e,
                _run(e, t) {
                    return "number" != typeof e.value || isNaN(e.value) ? je(this, "type", e, t) : e.typed = !0, e
                }
            }
        }

        function De(e, t) {
            return {
                kind: "schema",
                type: "object",
                reference: De,
                expects: "Object",
                async: !1,
                entries: e,
                message: t,
                _run(e, t) {
                    const r = e.value;
                    if (r && "object" == typeof r) {
                        e.typed = !0, e.value = {};
                        for (const o in this.entries) {
                            const n = r[o],
                                i = this.entries[o]._run({
                                    typed: !1,
                                    value: n
                                }, t);
                            if (i.issues) {
                                const a = {
                                    type: "object",
                                    origin: "value",
                                    input: r,
                                    key: o,
                                    value: n
                                };
                                for (const t of i.issues) t.path ? t.path.unshift(a) : t.path = [a], e.issues?.push(t);
                                if (e.issues || (e.issues = i.issues), t.abortEarly) {
                                    e.typed = !1;
                                    break
                                }
                            }
                            i.typed || (e.typed = !1), (void 0 !== i.value || o in r) && (e.value[o] = i.value)
                        }
                    } else je(this, "type", e, t);
                    return e
                }
            }
        }

        function qe(e, t, r) {
            const o = e._run({
                typed: !1,
                value: t
            }, function(e) {
                return {
                    lang: e?.lang ?? Be?.lang,
                    message: e?.message,
                    abortEarly: e?.abortEarly ?? Be?.abortEarly,
                    abortPipeEarly: e?.abortPipeEarly ?? Be?.abortPipeEarly
                }
            }(r));
            if (o.issues) throw new Ue(o.issues);
            return o.value
        }

        function Fe(...e) {
            return {
                ...e[0],
                pipe: e,
                _run(t, r) {
                    for (const o of e)
                        if ("metadata" !== o.kind) {
                            if (t.issues && ("schema" === o.kind || "transformation" === o.kind)) {
                                t.typed = !1;
                                break
                            }
                            t.issues && (r.abortEarly || r.abortPipeEarly) || (t = o._run(t, r))
                        } return t
                }
            }
        }
        const Ke = Fe(Me(), Le(), He(0), Re(4294967295)),
            Ve = Fe(Me(), Le(), He(0), Re(2147483647)),
            We = Fe(Me(), Le(), He(0), Re(255)),
            Ge = Fe(Ce(Uint8Array), Ne(32)),
            Xe = Fe(Ce(Uint8Array), Ne(33)),
            $e = De({
                wif: We,
                bip32: De({
                    public: Ke,
                    private: Ke
                })
            }),
            Ye = Fe(function e(t) {
                return {
                    kind: "schema",
                    type: "string",
                    reference: e,
                    expects: "string",
                    async: !1,
                    message: t,
                    _run(e, t) {
                        return "string" == typeof e.value ? e.typed = !0 : je(this, "type", e, t), e
                    }
                }
            }(), function e(t, r) {
                return {
                    kind: "validation",
                    type: "regex",
                    reference: e,
                    async: !1,
                    expects: `${t}`,
                    requirement: t,
                    message: r,
                    _run(e, t) {
                        return e.typed && !this.requirement.test(e.value) && je(this, "format", e, t), e
                    }
                }
            }(/^(m\/)?(\d+'?\/)*\d+'?$/)),
            Je = function(e) {
                if (e.length >= 255) throw new TypeError("Alphabet too long");
                const t = new Uint8Array(256);
                for (let e = 0; e < t.length; e++) t[e] = 255;
                for (let r = 0; r < e.length; r++) {
                    const o = e.charAt(r),
                        n = o.charCodeAt(0);
                    if (255 !== t[n]) throw new TypeError(o + " is ambiguous");
                    t[n] = r
                }
                const r = e.length,
                    o = e.charAt(0),
                    n = Math.log(r) / Math.log(256),
                    i = Math.log(256) / Math.log(r);

                function a(e) {
                    if ("string" != typeof e) throw new TypeError("Expected String");
                    if (0 === e.length) return new Uint8Array;
                    let i = 0,
                        a = 0,
                        s = 0;
                    for (; e[i] === o;) a++, i++;
                    const u = (e.length - i) * n + 1 >>> 0,
                        c = new Uint8Array(u);
                    for (; e[i];) {
                        let o = t[e.charCodeAt(i)];
                        if (255 === o) return;
                        let n = 0;
                        for (let e = u - 1;
                            (0 !== o || n < s) && -1 !== e; e--, n++) o += r * c[e] >>> 0, c[e] = o % 256 >>> 0, o = o / 256 >>> 0;
                        if (0 !== o) throw new Error("Non-zero carry");
                        s = n, i++
                    }
                    let l = u - s;
                    for (; l !== u && 0 === c[l];) l++;
                    const f = new Uint8Array(a + (u - l));
                    let d = a;
                    for (; l !== u;) f[d++] = c[l++];
                    return f
                }
                return {
                    encode: function(t) {
                        if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
                        if (0 === t.length) return "";
                        let n = 0,
                            a = 0,
                            s = 0;
                        const u = t.length;
                        for (; s !== u && 0 === t[s];) s++, n++;
                        const c = (u - s) * i + 1 >>> 0,
                            l = new Uint8Array(c);
                        for (; s !== u;) {
                            let e = t[s],
                                o = 0;
                            for (let t = c - 1;
                                (0 !== e || o < a) && -1 !== t; t--, o++) e += 256 * l[t] >>> 0, l[t] = e % r >>> 0, e = e / r >>> 0;
                            if (0 !== e) throw new Error("Non-zero carry");
                            a = o, s++
                        }
                        let f = c - a;
                        for (; f !== c && 0 === l[f];) f++;
                        let d = o.repeat(n);
                        for (; f < c; ++f) d += e.charAt(l[f]);
                        return d
                    },
                    decodeUnsafe: a,
                    decode: function(e) {
                        const t = a(e);
                        if (t) return t;
                        throw new Error("Non-base" + r + " character")
                    }
                }
            }("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),
            Ze = function(e) {
                function t(t) {
                    var r = t.slice(0, -4),
                        o = t.slice(-4),
                        n = e(r);
                    if (!(o[0] ^ n[0] | o[1] ^ n[1] | o[2] ^ n[2] | o[3] ^ n[3])) return r
                }
                return {
                    encode: function(t) {
                        var r = Uint8Array.from(t),
                            o = e(r),
                            n = r.length + 4,
                            i = new Uint8Array(n);
                        return i.set(r, 0), i.set(o.subarray(0, 4), r.length), Je.encode(i)
                    },
                    decode: function(e) {
                        var r = t(Je.decode(e));
                        if (null == r) throw new Error("Invalid checksum");
                        return r
                    },
                    decodeUnsafe: function(e) {
                        var r = Je.decodeUnsafe(e);
                        if (null != r) return t(r)
                    }
                }
            }((function(e) {
                return j(j(e))
            }));
        const Qe = (e => {
                return ce((r = t => e(e(t)), ie(t = 4), oe(r), {
                    encode(e) {
                        if (!te(e)) throw new Error("checksum.encode: input should be Uint8Array");
                        const o = r(e).slice(0, t),
                            n = new Uint8Array(e.length + t);
                        return n.set(e), n.set(o, e.length), n
                    },
                    decode(e) {
                        if (!te(e)) throw new Error("checksum.decode: input should be Uint8Array");
                        const o = e.slice(0, -t),
                            n = e.slice(-t),
                            i = r(o).slice(0, t);
                        for (let e = 0; e < t; e++)
                            if (i[e] !== n[e]) throw new Error("Invalid checksum");
                        return o
                    }
                }), Ee);
                var t, r
            })(j),
            et = {
                encode: e => Qe.encode(e),
                decode: e => Qe.decode(e)
            };

        function tt(e) {
            ! function(e) {
                if (ee(e.isPoint(Q("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), ee(!e.isPoint(Q("030000000000000000000000000000000000000000000000000000000000000005"))), ee(e.isPrivate(Q("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"))), ee(e.isPrivate(Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"))), ee(!e.isPrivate(Q("0000000000000000000000000000000000000000000000000000000000000000"))), ee(!e.isPrivate(Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"))), ee(!e.isPrivate(Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364142"))), ee(0 === $(e.pointFromScalar(Q("b1121e4088a66a28f5b6b0f5844943ecd9f610196d7bb83b25214b60452c09af")), Q("02b07ba9dca9523b7ef4bd97703d43d20399eb698e194704791a25ce77a400df99"))), e.xOnlyPointAddTweak) {
                    ee(null === e.xOnlyPointAddTweak(Q("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140")));
                    let t = e.xOnlyPointAddTweak(Q("1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b"), Q("a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac"));
                    ee(0 === $(t.xOnlyPubkey, Q("e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf")) && 1 === t.parity), t = e.xOnlyPointAddTweak(Q("2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991"), Q("823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47"))
                }
                ee(0 === $(e.pointAddScalar(Q("0379be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), Q("0000000000000000000000000000000000000000000000000000000000000003")), Q("02c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5"))), ee(0 === $(e.privateAdd(Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e"), Q("0000000000000000000000000000000000000000000000000000000000000002")), Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"))), e.privateNegate && (ee(0 === $(e.privateNegate(Q("0000000000000000000000000000000000000000000000000000000000000001")), Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140"))), ee(0 === $(e.privateNegate(Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036413e")), Q("0000000000000000000000000000000000000000000000000000000000000003"))), ee(0 === $(e.privateNegate(Q("b1121e4088a66a28f5b6b0f5844943ecd9f610196d7bb83b25214b60452c09af")), Q("4eede1bf775995d70a494f0a7bb6bc11e0b8cccd41cce8009ab1132c8b0a3792")))), ee(0 === $(e.sign(Q("5e9f0a0d593efdcf78ac923bc3313e4e7d408d574354ee2b3288c0da9fbba6ed"), Q("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140")), Q("54c4a33c6423d689378f160a7ff8b61330444abb58fb470f96ea16d99d4a2fed07082304410efa6b2943111b6a4e0aaa7b7db55a07e9861d1fb3cb1f421044a5"))), ee(e.verify(Q("5e9f0a0d593efdcf78ac923bc3313e4e7d408d574354ee2b3288c0da9fbba6ed"), Q("0379be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), Q("54c4a33c6423d689378f160a7ff8b61330444abb58fb470f96ea16d99d4a2fed07082304410efa6b2943111b6a4e0aaa7b7db55a07e9861d1fb3cb1f421044a5"))), e.signSchnorr && ee(0 === $(e.signSchnorr(Q("7e2d58d8b3bcdf1abadec7829054f90dda9805aab56c77333024b9d0a508b75c"), Q("c90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b14e5c9"), Q("c87aa53824b4d7ae2eb035a2b5bbbccc080e76cdc6d1692c4b0b62d798e6d906")), Q("5831aaeed7b44bb74e5eab94ba9d4294c49bcf2a60728d8b4c200f50dd313c1bab745879a5ad954a72c45a91c3a51d3c7adea98d82f8481e0e1e03674a6f3fb7"))), e.verifySchnorr && ee(e.verifySchnorr(Q("7e2d58d8b3bcdf1abadec7829054f90dda9805aab56c77333024b9d0a508b75c"), Q("dd308afec5777e13121fa72b9cc1b7cc0139715309b086c960e18fd969774eb8"), Q("5831aaeed7b44bb74e5eab94ba9d4294c49bcf2a60728d8b4c200f50dd313c1bab745879a5ad954a72c45a91c3a51d3c7adea98d82f8481e0e1e03674a6f3fb7")))
            }(e);
            const t = {
                    messagePrefix: "Bitcoin Signed Message:\n",
                    bech32: "bc",
                    bip32: {
                        public: 76067358,
                        private: 76066276
                    },
                    pubKeyHash: 0,
                    scriptHash: 5,
                    wif: 128
                },
                r = 2147483648;
            class o {
                __D;
                __Q;
                lowR = !1;
                constructor(e, t) {
                    this.__D = e, this.__Q = t
                }
                get publicKey() {
                    return void 0 === this.__Q && (this.__Q = e.pointFromScalar(this.__D, !0)), this.__Q
                }
                get privateKey() {
                    return this.__D
                }
                sign(t, r) {
                    if (!this.privateKey) throw new Error("Missing private key");
                    if (void 0 === r && (r = this.lowR), !1 === r) return e.sign(t, this.privateKey); {
                        let r = e.sign(t, this.privateKey);
                        const o = new Uint8Array(32);
                        let n = 0;
                        for (; r[0] > 127;) n++, J(o, 0, n, "LE"), r = e.sign(t, this.privateKey, o);
                        return r
                    }
                }
                signSchnorr(t) {
                    if (!this.privateKey) throw new Error("Missing private key");
                    if (!e.signSchnorr) throw new Error("signSchnorr not supported by ecc library");
                    return e.signSchnorr(t, this.privateKey)
                }
                verify(t, r) {
                    return e.verify(t, this.publicKey, r)
                }
                verifySchnorr(t, r) {
                    if (!e.verifySchnorr) throw new Error("verifySchnorr not supported by ecc library");
                    return e.verifySchnorr(t, this.publicKey.subarray(1, 33), r)
                }
            }
            class n extends o {
                chainCode;
                network;
                __DEPTH;
                __INDEX;
                __PARENT_FINGERPRINT;
                constructor(e, t, r, o, n = 0, i = 0, a = 0) {
                    super(e, t), this.chainCode = r, this.network = o, this.__DEPTH = n, this.__INDEX = i, this.__PARENT_FINGERPRINT = a, qe($e, o)
                }
                get depth() {
                    return this.__DEPTH
                }
                get index() {
                    return this.__INDEX
                }
                get parentFingerprint() {
                    return this.__PARENT_FINGERPRINT
                }
                get identifier() {
                    return e = this.publicKey, B(j(e));
                    var e
                }
                get fingerprint() {
                    return this.identifier.slice(0, 4)
                }
                get compressed() {
                    return !0
                }
                isNeutered() {
                    return void 0 === this.__D
                }
                neutered() {
                    return s(this.publicKey, this.chainCode, this.network, this.depth, this.index, this.parentFingerprint)
                }
                toBase58() {
                    const e = this.network,
                        t = this.isNeutered() ? e.bip32.public : e.bip32.private,
                        r = new Uint8Array(78);
                    return J(r, 0, t, "BE"), Y(r, 4, this.depth), J(r, 5, this.parentFingerprint, "BE"), J(r, 9, this.index, "BE"), r.set(this.chainCode, 13), this.isNeutered() ? r.set(this.publicKey, 45) : (Y(r, 45, 0), r.set(this.privateKey, 46)), et.encode(r)
                }
                toWIF() {
                    if (!this.privateKey) throw new TypeError("Missing private key");
                    return e = {
                        version: this.network.wif,
                        privateKey: this.privateKey,
                        compressed: !0
                    }, Ze.encode(function(e, t, r) {
                        if (32 !== t.length) throw new TypeError("Invalid privateKey length");
                        var o = new Uint8Array(r ? 34 : 33);
                        return new DataView(o.buffer).setUint8(0, e), o.set(t, 1), r && (o[33] = 1), o
                    }(e.version, e.privateKey, e.compressed));
                    var e
                }
                derive(t) {
                    qe(Ke, t);
                    const o = t >= r,
                        n = new Uint8Array(37);
                    if (o) {
                        if (this.isNeutered()) throw new TypeError("Missing private key for hardened child key");
                        n[0] = 0, n.set(this.privateKey, 1), J(n, 33, t, "BE")
                    } else n.set(this.publicKey, 0), J(n, 33, t, "BE");
                    const i = V(this.chainCode, n),
                        u = i.slice(0, 32),
                        c = i.slice(32);
                    if (!e.isPrivate(u)) return this.derive(t + 1);
                    let l;
                    if (this.isNeutered()) {
                        const r = e.pointAddScalar(this.publicKey, u, !0);
                        if (null === r) return this.derive(t + 1);
                        l = s(r, c, this.network, this.depth + 1, t, Z(this.fingerprint, 0, "BE"))
                    } else {
                        const r = e.privateAdd(this.privateKey, u);
                        if (null == r) return this.derive(t + 1);
                        l = a(r, c, this.network, this.depth + 1, t, Z(this.fingerprint, 0, "BE"))
                    }
                    return l
                }
                deriveHardened(e) {
                    if ("number" == typeof qe(Ve, e)) return this.derive(e + r);
                    throw new TypeError("Expected UInt31, got " + e)
                }
                derivePath(e) {
                    qe(Ye, e);
                    let t = e.split("/");
                    if ("m" === t[0]) {
                        if (this.parentFingerprint) throw new TypeError("Expected master, got child");
                        t = t.slice(1)
                    }
                    return t.reduce(((e, t) => {
                        let r;
                        return "'" === t.slice(-1) ? (r = parseInt(t.slice(0, -1), 10), e.deriveHardened(r)) : (r = parseInt(t, 10), e.derive(r))
                    }), this)
                }
                tweak(e) {
                    return this.privateKey ? this.tweakFromPrivateKey(e) : this.tweakFromPublicKey(e)
                }
                tweakFromPublicKey(t) {
                    const r = 32 === (n = this.publicKey).length ? n : n.slice(1, 33);
                    var n;
                    if (!e.xOnlyPointAddTweak) throw new Error("xOnlyPointAddTweak not supported by ecc library");
                    const i = e.xOnlyPointAddTweak(r, t);
                    if (!i || null === i.xOnlyPubkey) throw new Error("Cannot tweak public key!");
                    const a = function(e) {
                        const t = e.reduce(((e, t) => e + t.length), 0),
                            r = new Uint8Array(t);
                        let o = 0;
                        for (const t of e) r.set(t, o), o += t.length;
                        return r
                    }([Uint8Array.from([0 === i.parity ? 2 : 3]), i.xOnlyPubkey]);
                    return new o(void 0, a)
                }
                tweakFromPrivateKey(t) {
                    const r = 3 === this.publicKey[0] || 4 === this.publicKey[0] && !(1 & ~this.publicKey[64]),
                        n = (() => {
                            if (r) {
                                if (e.privateNegate) return e.privateNegate(this.privateKey);
                                throw new Error("privateNegate not supported by ecc library")
                            }
                            return this.privateKey
                        })(),
                        i = e.privateAdd(n, t);
                    if (!i) throw new Error("Invalid tweaked private key!");
                    return new o(i, void 0)
                }
            }

            function i(e, t, r) {
                return a(e, t, r)
            }

            function a(r, o, i, a, s, u) {
                if (qe(Ge, r), qe(Ge, o), i = i || t, !e.isPrivate(r)) throw new TypeError("Private key not in range [1, n)");
                return new n(r, void 0, o, i, a, s, u)
            }

            function s(r, o, i, a, s, u) {
                if (qe(Xe, r), qe(Ge, o), i = i || t, !e.isPoint(r)) throw new TypeError("Point is not on the curve");
                return new n(void 0, r, o, i, a, s, u)
            }
            return {
                fromSeed: function(e, r) {
                    if (qe(Ce(Uint8Array), e), e.length < 16) throw new TypeError("Seed should be at least 128 bits");
                    if (e.length > 64) throw new TypeError("Seed should be at most 512 bits");
                    r = r || t;
                    const o = V(X.encode("Bitcoin seed"), e);
                    return i(o.slice(0, 32), o.slice(32), r)
                },
                fromBase58: function(e, r) {
                    const o = et.decode(e);
                    if (78 !== o.length) throw new TypeError("Invalid buffer length");
                    r = r || t;
                    const n = Z(o, 0, "BE");
                    if (n !== r.bip32.private && n !== r.bip32.public) throw new TypeError("Invalid network version");
                    const i = o[4],
                        u = Z(o, 5, "BE");
                    if (0 === i && 0 !== u) throw new TypeError("Invalid parent fingerprint");
                    const c = Z(o, 9, "BE");
                    if (0 === i && 0 !== c) throw new TypeError("Invalid index");
                    const l = o.slice(13, 45);
                    let f;
                    if (n === r.bip32.private) {
                        if (0 !== o[45]) throw new TypeError("Invalid private key");
                        f = a(o.slice(46, 78), l, r, i, c, u)
                    } else f = s(o.slice(45, 78), l, r, i, c, u);
                    return f
                },
                fromPublicKey: function(e, t, r) {
                    return s(e, t, r)
                },
                fromPrivateKey: i
            }
        }
        var rt = {
            bip32: e,
            bip39: r(5696),
            ecpair: r(7213),
            bitcoin: r(3550),
            BIP32Factory: tt,
            ecc: r(6273),
            toX: r(9234),
        }
    })(), o
})()));
