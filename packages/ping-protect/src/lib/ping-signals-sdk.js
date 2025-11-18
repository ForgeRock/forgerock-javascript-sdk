/**
 *
 * Copyright (c) 2024 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

if (typeof window !== 'undefined') {
  var _POSignalsEntities;
  !(function (t, e) {
    'use strict';
    'function' != typeof t.CustomEvent &&
      (t.CustomEvent = (function () {
        return function (t, e) {
          e = e || { bubbles: !1, cancelable: !1, detail: null };
          var n = document.createEvent('CustomEvent');
          return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
        };
      })());
  })(window),
    (function () {
      var t = 'st-ping-div';
      function e(t) {
        'loading' !== document.readyState ? t() : document.addEventListener('DOMContentLoaded', t);
      }
      function n(n) {
        e(function () {
          var e;
          n &&
            ((e = document.getElementById(t)) ||
              (((e = document.createElement('div')).style.border = 'none'),
              (e.style.position = 'absolute'),
              (e.style.top = '-999px'),
              (e.style.left = '-999px'),
              (e.style.width = '0'),
              (e.style.height = '0'),
              (e.style.visibility = 'hidden'),
              (e.style.overflow = 'hidden'),
              (e.id = t),
              document.body.appendChild(e)),
            (e = e),
            (window._pingOneSignalsToken = getComputedStyle(e, '::after').content.replace(
              /['"]+/g,
              '',
            )),
            document.dispatchEvent(new CustomEvent('PingOneSignalsTokenReadyEvent'))),
            (e = 'Finished - ' + (n ? 'success' : 'failure')),
            window['enable-logs-pingOneSignals'] && console.log(e);
        });
      }
      var i,
        r,
        o = document.querySelector('script[data-pingOneSignalsSkipToken]');
      o && 'true' === o.getAttribute('data-pingOneSignalsSkipToken')
        ? ((window._pingOneSignalsToken = 'skipped_token_' + new Date().getTime()),
          e(function () {
            document.dispatchEvent(new CustomEvent('PingOneSignalsTokenSkippedEvent'));
          }))
        : (window._pingOneSignalsToken ||
            (window._pingOneSignalsToken = 'uninitialized_token_' + new Date().getTime()),
          (o = window._pingOneSignalsCustomHost || 'apps.pingone.com'),
          (i = { sdkVersion: '5.6.4w', platform: navigator.platform || '' }),
          (i = encodeURIComponent(
            (function (t) {
              var e,
                n,
                i,
                r,
                o,
                a,
                s = '',
                u = 0,
                c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
              for (
                t = (function (t) {
                  t = t.replace(/\r\n/g, '\n');
                  for (var e = '', n = 0; n < t.length; n++) {
                    var i = t.charCodeAt(n);
                    i < 128
                      ? (e += String.fromCharCode(i))
                      : (e =
                          127 < i && i < 2048
                            ? (e += String.fromCharCode((i >> 6) | 192)) +
                              String.fromCharCode((63 & i) | 128)
                            : (e =
                                (e += String.fromCharCode((i >> 12) | 224)) +
                                String.fromCharCode(((i >> 6) & 63) | 128)) +
                              String.fromCharCode((63 & i) | 128));
                  }
                  return e;
                })(t);
                u < t.length;

              )
                (i = (e = t.charCodeAt(u++)) >> 2),
                  (r = ((3 & e) << 4) | ((e = t.charCodeAt(u++)) >> 4)),
                  (o = ((15 & e) << 2) | ((n = t.charCodeAt(u++)) >> 6)),
                  (a = 63 & n),
                  isNaN(e) ? (o = a = 64) : isNaN(n) && (a = 64),
                  (s = s + c.charAt(i) + c.charAt(r) + c.charAt(o) + c.charAt(a));
              return s;
            })(
              (function (t, e) {
                for (var n = [], i = 0; i < t.length; i++) {
                  var r = t.charCodeAt(i) ^ e.charCodeAt(i % e.length);
                  n.push(String.fromCharCode(r));
                }
                return n.join('');
              })(JSON.stringify(i), 'dkiBm42'),
            ),
          )),
          ((r = document.createElement('link')).type = 'text/css'),
          (r.rel = 'stylesheet'),
          (r.href = 'https://' + o + '/signals/sdk/pong.css?body=' + i + '&e=2'),
          (document.head || document.getElementsByTagName('head')[0]).appendChild(r),
          (r.onload = function () {
            n(!0);
          }),
          (r.onerror = function () {
            n(!1);
          }));
    })(),
    (function (t) {
      t._POSignalsEntities || (t._POSignalsEntities = {}),
        t._pingOneSignals && console.warn('PingOne Signals script was imported multiple times');
    })(window),
    (function (t) {
      'use strict';
      function e(t) {
        var e = this.constructor;
        return this.then(
          function (n) {
            return e.resolve(t()).then(function () {
              return n;
            });
          },
          function (n) {
            return e.resolve(t()).then(function () {
              return e.reject(n);
            });
          },
        );
      }
      var n = setTimeout;
      function i(t) {
        return Boolean(t && void 0 !== t.length);
      }
      function r() {}
      function o(t) {
        if (!(this instanceof o)) throw new TypeError('Promises must be constructed via new');
        if ('function' != typeof t) throw new TypeError('not a function');
        (this._state = 0),
          (this._handled = !1),
          (this._value = void 0),
          (this._deferreds = []),
          l(t, this);
      }
      function a(t, e) {
        for (; 3 === t._state; ) t = t._value;
        0 !== t._state
          ? ((t._handled = !0),
            o._immediateFn(function () {
              var n = 1 === t._state ? e.onFulfilled : e.onRejected;
              if (null !== n) {
                var i;
                try {
                  i = n(t._value);
                } catch (t) {
                  return void u(e.promise, t);
                }
                s(e.promise, i);
              } else (1 === t._state ? s : u)(e.promise, t._value);
            }))
          : t._deferreds.push(e);
      }
      function s(t, e) {
        try {
          if (e === t) throw new TypeError('A promise cannot be resolved with itself.');
          if (e && ('object' == typeof e || 'function' == typeof e)) {
            var n = e.then;
            if (e instanceof o) return (t._state = 3), (t._value = e), void c(t);
            if ('function' == typeof n)
              return void l(
                ((i = n),
                (r = e),
                function () {
                  i.apply(r, arguments);
                }),
                t,
              );
          }
          (t._state = 1), (t._value = e), c(t);
        } catch (e) {
          u(t, e);
        }
        var i, r;
      }
      function u(t, e) {
        (t._state = 2), (t._value = e), c(t);
      }
      function c(t) {
        2 === t._state &&
          0 === t._deferreds.length &&
          o._immediateFn(function () {
            t._handled || o._unhandledRejectionFn(t._value);
          });
        for (var e = 0, n = t._deferreds.length; e < n; e++) a(t, t._deferreds[e]);
        t._deferreds = null;
      }
      function l(t, e) {
        var n = !1;
        try {
          t(
            function (t) {
              n || ((n = !0), s(e, t));
            },
            function (t) {
              n || ((n = !0), u(e, t));
            },
          );
        } catch (t) {
          if (n) return;
          (n = !0), u(e, t);
        }
      }
      (o.prototype.catch = function (t) {
        return this.then(null, t);
      }),
        (o.prototype.then = function (t, e) {
          var n = new this.constructor(r);
          return (
            a(
              this,
              new (function (t, e, n) {
                (this.onFulfilled = 'function' == typeof t ? t : null),
                  (this.onRejected = 'function' == typeof e ? e : null),
                  (this.promise = n);
              })(t, e, n),
            ),
            n
          );
        }),
        (o.prototype.finally = e),
        (o.all = function (t) {
          return new o(function (e, n) {
            if (!i(t)) return n(new TypeError('Promise.all accepts an array'));
            var r = Array.prototype.slice.call(t);
            if (0 === r.length) return e([]);
            var o = r.length;
            function a(t, i) {
              try {
                if (i && ('object' == typeof i || 'function' == typeof i)) {
                  var s = i.then;
                  if ('function' == typeof s)
                    return void s.call(
                      i,
                      function (e) {
                        a(t, e);
                      },
                      n,
                    );
                }
                (r[t] = i), 0 == --o && e(r);
              } catch (t) {
                n(t);
              }
            }
            for (var s = 0; s < r.length; s++) a(s, r[s]);
          });
        }),
        (o.resolve = function (t) {
          return t && 'object' == typeof t && t.constructor === o
            ? t
            : new o(function (e) {
                e(t);
              });
        }),
        (o.reject = function (t) {
          return new o(function (e, n) {
            n(t);
          });
        }),
        (o.race = function (t) {
          return new o(function (e, n) {
            if (!i(t)) return n(new TypeError('Promise.race accepts an array'));
            for (var r = 0, a = t.length; r < a; r++) o.resolve(t[r]).then(e, n);
          });
        }),
        (o._immediateFn =
          ('function' == typeof setImmediate &&
            function (t) {
              setImmediate(t);
            }) ||
          function (t) {
            n(t, 0);
          }),
        (o._unhandledRejectionFn = function (t) {
          'undefined' != typeof console &&
            console &&
            console.warn('Possible Unhandled Promise Rejection:', t);
        }),
        'function' != typeof t.Promise
          ? (t.Promise = o)
          : t.Promise.prototype.finally || (t.Promise.prototype.finally = e);
    })(window),
    (function (t, e) {
      'use strict';
      (_POSignalsEntities || (_POSignalsEntities = {})).PromiseQueue = (function () {
        var t = function () {};
        function e(t, e, n) {
          (this.options = n = n || {}),
            (this.pendingPromises = 0),
            (this.maxPendingPromises = void 0 !== t ? t : 1 / 0),
            (this.maxQueuedPromises = void 0 !== e ? e : 1 / 0),
            (this.queue = []);
        }
        return (
          (e.prototype.add = function (e) {
            var n = this;
            return new Promise(function (i, r, o) {
              n.queue.length >= n.maxQueuedPromises
                ? r(new Error('Queue limit reached'))
                : (n.queue.push({ promiseGenerator: e, resolve: i, reject: r, notify: o || t }),
                  n._dequeue());
            });
          }),
          (e.prototype.getPendingLength = function () {
            return this.pendingPromises;
          }),
          (e.prototype.getQueueLength = function () {
            return this.queue.length;
          }),
          (e.prototype._dequeue = function () {
            var t = this;
            if (this.pendingPromises >= this.maxPendingPromises) return !1;
            var e,
              n = this.queue.shift();
            if (!n) return this.options.onEmpty && this.options.onEmpty(), !1;
            try {
              this.pendingPromises++,
                ((e = n.promiseGenerator()),
                e && 'function' == typeof e.then
                  ? e
                  : new Promise(function (t) {
                      t(e);
                    })).then(
                  function (e) {
                    t.pendingPromises--, n.resolve(e), t._dequeue();
                  },
                  function (e) {
                    t.pendingPromises--, n.reject(e), t._dequeue();
                  },
                  function (t) {
                    n.notify(t);
                  },
                );
            } catch (e) {
              t.pendingPromises--, n.reject(e), t._dequeue();
            }
            return !0;
          }),
          e
        );
      })();
    })(),
    (function (t) {
      'use strict';
      var e = 'input is invalid type',
        n = !t.JS_SHA256_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
        i = '0123456789abcdef'.split(''),
        r = [-2147483648, 8388608, 32768, 128],
        o = [24, 16, 8, 0],
        a = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
          2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
          2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
          1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372,
          1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
          3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734,
          506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
          3329325298,
        ],
        s = ['hex', 'array', 'digest', 'arrayBuffer'],
        u = [];
      (!t.JS_SHA256_NO_NODE_JS && Array.isArray) ||
        (Array.isArray = function (t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        }),
        !n ||
          (!t.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
          (ArrayBuffer.isView = function (t) {
            return 'object' == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;
          });
      var c = function (t, e) {
          return function (n) {
            return new f(e, !0).update(n)[t]();
          };
        },
        l = function (t) {
          var e = c('hex', t);
          (e.create = function () {
            return new f(t);
          }),
            (e.update = function (t) {
              return e.create().update(t);
            });
          for (var n = 0; n < s.length; ++n) {
            var i = s[n];
            e[i] = c(i, t);
          }
          return e;
        },
        d = function (t, e) {
          return function (n, i) {
            return new g(n, e, !0).update(i)[t]();
          };
        },
        h = function (t) {
          var e = d('hex', t);
          (e.create = function (e) {
            return new g(e, t);
          }),
            (e.update = function (t, n) {
              return e.create(t).update(n);
            });
          for (var n = 0; n < s.length; ++n) {
            var i = s[n];
            e[i] = d(i, t);
          }
          return e;
        };
      function f(t, e) {
        e
          ? ((u[0] =
              u[16] =
              u[1] =
              u[2] =
              u[3] =
              u[4] =
              u[5] =
              u[6] =
              u[7] =
              u[8] =
              u[9] =
              u[10] =
              u[11] =
              u[12] =
              u[13] =
              u[14] =
              u[15] =
                0),
            (this.blocks = u))
          : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          t
            ? ((this.h0 = 3238371032),
              (this.h1 = 914150663),
              (this.h2 = 812702999),
              (this.h3 = 4144912697),
              (this.h4 = 4290775857),
              (this.h5 = 1750603025),
              (this.h6 = 1694076839),
              (this.h7 = 3204075428))
            : ((this.h0 = 1779033703),
              (this.h1 = 3144134277),
              (this.h2 = 1013904242),
              (this.h3 = 2773480762),
              (this.h4 = 1359893119),
              (this.h5 = 2600822924),
              (this.h6 = 528734635),
              (this.h7 = 1541459225)),
          (this.block = this.start = this.bytes = this.hBytes = 0),
          (this.finalized = this.hashed = !1),
          (this.first = !0),
          (this.is224 = t);
      }
      function g(t, i, r) {
        var o,
          a = typeof t;
        if ('string' === a) {
          var s,
            u = [],
            c = t.length,
            l = 0;
          for (o = 0; o < c; ++o)
            (s = t.charCodeAt(o)) < 128
              ? (u[l++] = s)
              : s < 2048
                ? ((u[l++] = 192 | (s >> 6)), (u[l++] = 128 | (63 & s)))
                : s < 55296 || s >= 57344
                  ? ((u[l++] = 224 | (s >> 12)),
                    (u[l++] = 128 | ((s >> 6) & 63)),
                    (u[l++] = 128 | (63 & s)))
                  : ((s = 65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++o)))),
                    (u[l++] = 240 | (s >> 18)),
                    (u[l++] = 128 | ((s >> 12) & 63)),
                    (u[l++] = 128 | ((s >> 6) & 63)),
                    (u[l++] = 128 | (63 & s)));
          t = u;
        } else {
          if ('object' !== a) throw new Error(e);
          if (null === t) throw new Error(e);
          if (n && t.constructor === ArrayBuffer) t = new Uint8Array(t);
          else if (!(Array.isArray(t) || (n && ArrayBuffer.isView(t)))) throw new Error(e);
        }
        t.length > 64 && (t = new f(i, !0).update(t).array());
        var d = [],
          h = [];
        for (o = 0; o < 64; ++o) {
          var g = t[o] || 0;
          (d[o] = 92 ^ g), (h[o] = 54 ^ g);
        }
        f.call(this, i, r),
          this.update(h),
          (this.oKeyPad = d),
          (this.inner = !0),
          (this.sharedMemory = r);
      }
      (f.prototype.update = function (t) {
        if (!this.finalized) {
          var i,
            r = typeof t;
          if ('string' !== r) {
            if ('object' !== r) throw new Error(e);
            if (null === t) throw new Error(e);
            if (n && t.constructor === ArrayBuffer) t = new Uint8Array(t);
            else if (!(Array.isArray(t) || (n && ArrayBuffer.isView(t)))) throw new Error(e);
            i = !0;
          }
          for (var a, s, u = 0, c = t.length, l = this.blocks; u < c; ) {
            if (
              (this.hashed &&
                ((this.hashed = !1),
                (l[0] = this.block),
                (l[16] =
                  l[1] =
                  l[2] =
                  l[3] =
                  l[4] =
                  l[5] =
                  l[6] =
                  l[7] =
                  l[8] =
                  l[9] =
                  l[10] =
                  l[11] =
                  l[12] =
                  l[13] =
                  l[14] =
                  l[15] =
                    0)),
              i)
            )
              for (s = this.start; u < c && s < 64; ++u) l[s >> 2] |= t[u] << o[3 & s++];
            else
              for (s = this.start; u < c && s < 64; ++u)
                (a = t.charCodeAt(u)) < 128
                  ? (l[s >> 2] |= a << o[3 & s++])
                  : a < 2048
                    ? ((l[s >> 2] |= (192 | (a >> 6)) << o[3 & s++]),
                      (l[s >> 2] |= (128 | (63 & a)) << o[3 & s++]))
                    : a < 55296 || a >= 57344
                      ? ((l[s >> 2] |= (224 | (a >> 12)) << o[3 & s++]),
                        (l[s >> 2] |= (128 | ((a >> 6) & 63)) << o[3 & s++]),
                        (l[s >> 2] |= (128 | (63 & a)) << o[3 & s++]))
                      : ((a = 65536 + (((1023 & a) << 10) | (1023 & t.charCodeAt(++u)))),
                        (l[s >> 2] |= (240 | (a >> 18)) << o[3 & s++]),
                        (l[s >> 2] |= (128 | ((a >> 12) & 63)) << o[3 & s++]),
                        (l[s >> 2] |= (128 | ((a >> 6) & 63)) << o[3 & s++]),
                        (l[s >> 2] |= (128 | (63 & a)) << o[3 & s++]));
            (this.lastByteIndex = s),
              (this.bytes += s - this.start),
              s >= 64
                ? ((this.block = l[16]), (this.start = s - 64), this.hash(), (this.hashed = !0))
                : (this.start = s);
          }
          return (
            this.bytes > 4294967295 &&
              ((this.hBytes += (this.bytes / 4294967296) << 0),
              (this.bytes = this.bytes % 4294967296)),
            this
          );
        }
      }),
        (f.prototype.finalize = function () {
          if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks,
              e = this.lastByteIndex;
            (t[16] = this.block),
              (t[e >> 2] |= r[3 & e]),
              (this.block = t[16]),
              e >= 56 &&
                (this.hashed || this.hash(),
                (t[0] = this.block),
                (t[16] =
                  t[1] =
                  t[2] =
                  t[3] =
                  t[4] =
                  t[5] =
                  t[6] =
                  t[7] =
                  t[8] =
                  t[9] =
                  t[10] =
                  t[11] =
                  t[12] =
                  t[13] =
                  t[14] =
                  t[15] =
                    0)),
              (t[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
              (t[15] = this.bytes << 3),
              this.hash();
          }
        }),
        (f.prototype.hash = function () {
          var t,
            e,
            n,
            i,
            r,
            o,
            s,
            u,
            c,
            l = this.h0,
            d = this.h1,
            h = this.h2,
            f = this.h3,
            g = this.h4,
            p = this.h5,
            v = this.h6,
            _ = this.h7,
            m = this.blocks;
          for (t = 16; t < 64; ++t)
            (e = (((r = m[t - 15]) >>> 7) | (r << 25)) ^ ((r >>> 18) | (r << 14)) ^ (r >>> 3)),
              (n = (((r = m[t - 2]) >>> 17) | (r << 15)) ^ ((r >>> 19) | (r << 13)) ^ (r >>> 10)),
              (m[t] = (m[t - 16] + e + m[t - 7] + n) << 0);
          for (c = d & h, t = 0; t < 64; t += 4)
            this.first
              ? (this.is224
                  ? ((o = 300032),
                    (_ = ((r = m[0] - 1413257819) - 150054599) << 0),
                    (f = (r + 24177077) << 0))
                  : ((o = 704751109),
                    (_ = ((r = m[0] - 210244248) - 1521486534) << 0),
                    (f = (r + 143694565) << 0)),
                (this.first = !1))
              : ((e =
                  ((l >>> 2) | (l << 30)) ^ ((l >>> 13) | (l << 19)) ^ ((l >>> 22) | (l << 10))),
                (i = (o = l & d) ^ (l & h) ^ c),
                (_ =
                  (f +
                    (r =
                      _ +
                      (n =
                        ((g >>> 6) | (g << 26)) ^
                        ((g >>> 11) | (g << 21)) ^
                        ((g >>> 25) | (g << 7))) +
                      ((g & p) ^ (~g & v)) +
                      a[t] +
                      m[t])) <<
                  0),
                (f = (r + (e + i)) << 0)),
              (e = ((f >>> 2) | (f << 30)) ^ ((f >>> 13) | (f << 19)) ^ ((f >>> 22) | (f << 10))),
              (i = (s = f & l) ^ (f & d) ^ o),
              (v =
                (h +
                  (r =
                    v +
                    (n =
                      ((_ >>> 6) | (_ << 26)) ^
                      ((_ >>> 11) | (_ << 21)) ^
                      ((_ >>> 25) | (_ << 7))) +
                    ((_ & g) ^ (~_ & p)) +
                    a[t + 1] +
                    m[t + 1])) <<
                0),
              (e =
                (((h = (r + (e + i)) << 0) >>> 2) | (h << 30)) ^
                ((h >>> 13) | (h << 19)) ^
                ((h >>> 22) | (h << 10))),
              (i = (u = h & f) ^ (h & l) ^ s),
              (p =
                (d +
                  (r =
                    p +
                    (n =
                      ((v >>> 6) | (v << 26)) ^
                      ((v >>> 11) | (v << 21)) ^
                      ((v >>> 25) | (v << 7))) +
                    ((v & _) ^ (~v & g)) +
                    a[t + 2] +
                    m[t + 2])) <<
                0),
              (e =
                (((d = (r + (e + i)) << 0) >>> 2) | (d << 30)) ^
                ((d >>> 13) | (d << 19)) ^
                ((d >>> 22) | (d << 10))),
              (i = (c = d & h) ^ (d & f) ^ u),
              (g =
                (l +
                  (r =
                    g +
                    (n =
                      ((p >>> 6) | (p << 26)) ^
                      ((p >>> 11) | (p << 21)) ^
                      ((p >>> 25) | (p << 7))) +
                    ((p & v) ^ (~p & _)) +
                    a[t + 3] +
                    m[t + 3])) <<
                0),
              (l = (r + (e + i)) << 0);
          (this.h0 = (this.h0 + l) << 0),
            (this.h1 = (this.h1 + d) << 0),
            (this.h2 = (this.h2 + h) << 0),
            (this.h3 = (this.h3 + f) << 0),
            (this.h4 = (this.h4 + g) << 0),
            (this.h5 = (this.h5 + p) << 0),
            (this.h6 = (this.h6 + v) << 0),
            (this.h7 = (this.h7 + _) << 0);
        }),
        (f.prototype.hex = function () {
          this.finalize();
          var t = this.h0,
            e = this.h1,
            n = this.h2,
            r = this.h3,
            o = this.h4,
            a = this.h5,
            s = this.h6,
            u = this.h7,
            c =
              i[(t >> 28) & 15] +
              i[(t >> 24) & 15] +
              i[(t >> 20) & 15] +
              i[(t >> 16) & 15] +
              i[(t >> 12) & 15] +
              i[(t >> 8) & 15] +
              i[(t >> 4) & 15] +
              i[15 & t] +
              i[(e >> 28) & 15] +
              i[(e >> 24) & 15] +
              i[(e >> 20) & 15] +
              i[(e >> 16) & 15] +
              i[(e >> 12) & 15] +
              i[(e >> 8) & 15] +
              i[(e >> 4) & 15] +
              i[15 & e] +
              i[(n >> 28) & 15] +
              i[(n >> 24) & 15] +
              i[(n >> 20) & 15] +
              i[(n >> 16) & 15] +
              i[(n >> 12) & 15] +
              i[(n >> 8) & 15] +
              i[(n >> 4) & 15] +
              i[15 & n] +
              i[(r >> 28) & 15] +
              i[(r >> 24) & 15] +
              i[(r >> 20) & 15] +
              i[(r >> 16) & 15] +
              i[(r >> 12) & 15] +
              i[(r >> 8) & 15] +
              i[(r >> 4) & 15] +
              i[15 & r] +
              i[(o >> 28) & 15] +
              i[(o >> 24) & 15] +
              i[(o >> 20) & 15] +
              i[(o >> 16) & 15] +
              i[(o >> 12) & 15] +
              i[(o >> 8) & 15] +
              i[(o >> 4) & 15] +
              i[15 & o] +
              i[(a >> 28) & 15] +
              i[(a >> 24) & 15] +
              i[(a >> 20) & 15] +
              i[(a >> 16) & 15] +
              i[(a >> 12) & 15] +
              i[(a >> 8) & 15] +
              i[(a >> 4) & 15] +
              i[15 & a] +
              i[(s >> 28) & 15] +
              i[(s >> 24) & 15] +
              i[(s >> 20) & 15] +
              i[(s >> 16) & 15] +
              i[(s >> 12) & 15] +
              i[(s >> 8) & 15] +
              i[(s >> 4) & 15] +
              i[15 & s];
          return (
            this.is224 ||
              (c +=
                i[(u >> 28) & 15] +
                i[(u >> 24) & 15] +
                i[(u >> 20) & 15] +
                i[(u >> 16) & 15] +
                i[(u >> 12) & 15] +
                i[(u >> 8) & 15] +
                i[(u >> 4) & 15] +
                i[15 & u]),
            c
          );
        }),
        (f.prototype.toString = f.prototype.hex),
        (f.prototype.digest = function () {
          this.finalize();
          var t = this.h0,
            e = this.h1,
            n = this.h2,
            i = this.h3,
            r = this.h4,
            o = this.h5,
            a = this.h6,
            s = this.h7,
            u = [
              (t >> 24) & 255,
              (t >> 16) & 255,
              (t >> 8) & 255,
              255 & t,
              (e >> 24) & 255,
              (e >> 16) & 255,
              (e >> 8) & 255,
              255 & e,
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              255 & n,
              (i >> 24) & 255,
              (i >> 16) & 255,
              (i >> 8) & 255,
              255 & i,
              (r >> 24) & 255,
              (r >> 16) & 255,
              (r >> 8) & 255,
              255 & r,
              (o >> 24) & 255,
              (o >> 16) & 255,
              (o >> 8) & 255,
              255 & o,
              (a >> 24) & 255,
              (a >> 16) & 255,
              (a >> 8) & 255,
              255 & a,
            ];
          return this.is224 || u.push((s >> 24) & 255, (s >> 16) & 255, (s >> 8) & 255, 255 & s), u;
        }),
        (f.prototype.array = f.prototype.digest),
        (f.prototype.arrayBuffer = function () {
          this.finalize();
          var t = new ArrayBuffer(this.is224 ? 28 : 32),
            e = new DataView(t);
          return (
            e.setUint32(0, this.h0),
            e.setUint32(4, this.h1),
            e.setUint32(8, this.h2),
            e.setUint32(12, this.h3),
            e.setUint32(16, this.h4),
            e.setUint32(20, this.h5),
            e.setUint32(24, this.h6),
            this.is224 || e.setUint32(28, this.h7),
            t
          );
        }),
        (g.prototype = new f()),
        (g.prototype.finalize = function () {
          if ((f.prototype.finalize.call(this), this.inner)) {
            this.inner = !1;
            var t = this.array();
            f.call(this, this.is224, this.sharedMemory),
              this.update(this.oKeyPad),
              this.update(t),
              f.prototype.finalize.call(this);
          }
        });
      var p = l();
      (p.sha256 = p),
        (p.sha224 = l(!0)),
        (p.sha256.hmac = h()),
        (p.sha224.hmac = h(!0)),
        (t.sha256 = p.sha256),
        (t.sha224 = p.sha224);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    ((_POSignalsEntities || (_POSignalsEntities = {})).FingerprintJS = (function (t) {
      'use strict';
      var e = function () {
        return (e =
          Object.assign ||
          function (t) {
            for (var e, n = 1, i = arguments.length; n < i; n++)
              for (var r in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t;
          }).apply(this, arguments);
      };
      function n(t, e, n, i) {
        return new (n || (n = Promise))(function (r, o) {
          function a(t) {
            try {
              u(i.next(t));
            } catch (t) {
              o(t);
            }
          }
          function s(t) {
            try {
              u(i.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? r(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((i = i.apply(t, e || [])).next());
        });
      }
      function i(t, e) {
        var n,
          i,
          r,
          o,
          a = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function s(s) {
          return function (u) {
            return (function (s) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; o && ((o = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & s[0]
                          ? i.return
                          : s[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, s[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (s = [2 & s[0], r.value]), s[0])) {
                    case 0:
                    case 1:
                      r = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (i = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = a.trys).length > 0 && r[r.length - 1]) &&
                        (6 === s[0] || 2 === s[0])
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!r || (s[1] > r[0] && s[1] < r[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < r[1]) {
                        (a.label = r[1]), (r = s);
                        break;
                      }
                      if (r && a.label < r[2]) {
                        (a.label = r[2]), a.ops.push(s);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = e.call(t, a);
                } catch (t) {
                  (s = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, u]);
          };
        }
      }
      function r(t, e, n) {
        if (n || 2 === arguments.length)
          for (var i, r = 0, o = e.length; r < o; r++)
            (!i && r in e) || (i || (i = Array.prototype.slice.call(e, 0, r)), (i[r] = e[r]));
        return t.concat(i || Array.prototype.slice.call(e));
      }
      var o = '4.6.1';
      function a(t, e) {
        return new Promise(function (n) {
          return setTimeout(n, t, e);
        });
      }
      function s(t) {
        return !!t && 'function' == typeof t.then;
      }
      function u(t, e) {
        try {
          var n = t();
          s(n)
            ? n.then(
                function (t) {
                  return e(!0, t);
                },
                function (t) {
                  return e(!1, t);
                },
              )
            : e(!0, n);
        } catch (t) {
          e(!1, t);
        }
      }
      function c(t, e, r) {
        return (
          void 0 === r && (r = 16),
          n(this, void 0, void 0, function () {
            var n, o, a, s;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  (n = Array(t.length)), (o = Date.now()), (a = 0), (i.label = 1);
                case 1:
                  return a < t.length
                    ? ((n[a] = e(t[a], a)),
                      (s = Date.now()) >= o + r
                        ? ((o = s),
                          [
                            4,
                            new Promise(function (t) {
                              var e = new MessageChannel();
                              (e.port1.onmessage = function () {
                                return t();
                              }),
                                e.port2.postMessage(null);
                            }),
                          ])
                        : [3, 3])
                    : [3, 4];
                case 2:
                  i.sent(), (i.label = 3);
                case 3:
                  return ++a, [3, 1];
                case 4:
                  return [2, n];
              }
            });
          })
        );
      }
      function l(t) {
        return t.then(void 0, function () {}), t;
      }
      function d(t) {
        return parseInt(t);
      }
      function h(t) {
        return parseFloat(t);
      }
      function f(t, e) {
        return 'number' == typeof t && isNaN(t) ? e : t;
      }
      function g(t) {
        return t.reduce(function (t, e) {
          return t + (e ? 1 : 0);
        }, 0);
      }
      function p(t, e) {
        if ((void 0 === e && (e = 1), Math.abs(e) >= 1)) return Math.round(t / e) * e;
        var n = 1 / e;
        return Math.round(t * n) / n;
      }
      function v(t, e) {
        var n = t[0] >>> 16,
          i = 65535 & t[0],
          r = t[1] >>> 16,
          o = 65535 & t[1],
          a = e[0] >>> 16,
          s = 65535 & e[0],
          u = e[1] >>> 16,
          c = 0,
          l = 0,
          d = 0,
          h = 0;
        (d += (h += o + (65535 & e[1])) >>> 16),
          (h &= 65535),
          (l += (d += r + u) >>> 16),
          (d &= 65535),
          (c += (l += i + s) >>> 16),
          (l &= 65535),
          (c += n + a),
          (c &= 65535),
          (t[0] = (c << 16) | l),
          (t[1] = (d << 16) | h);
      }
      function _(t, e) {
        var n = t[0] >>> 16,
          i = 65535 & t[0],
          r = t[1] >>> 16,
          o = 65535 & t[1],
          a = e[0] >>> 16,
          s = 65535 & e[0],
          u = e[1] >>> 16,
          c = 65535 & e[1],
          l = 0,
          d = 0,
          h = 0,
          f = 0;
        (h += (f += o * c) >>> 16),
          (f &= 65535),
          (d += (h += r * c) >>> 16),
          (h &= 65535),
          (d += (h += o * u) >>> 16),
          (h &= 65535),
          (l += (d += i * c) >>> 16),
          (d &= 65535),
          (l += (d += r * u) >>> 16),
          (d &= 65535),
          (l += (d += o * s) >>> 16),
          (d &= 65535),
          (l += n * c + i * u + r * s + o * a),
          (l &= 65535),
          (t[0] = (l << 16) | d),
          (t[1] = (h << 16) | f);
      }
      function m(t, e) {
        var n = t[0];
        32 == (e %= 64)
          ? ((t[0] = t[1]), (t[1] = n))
          : e < 32
            ? ((t[0] = (n << e) | (t[1] >>> (32 - e))), (t[1] = (t[1] << e) | (n >>> (32 - e))))
            : ((e -= 32),
              (t[0] = (t[1] << e) | (n >>> (32 - e))),
              (t[1] = (n << e) | (t[1] >>> (32 - e))));
      }
      function b(t, e) {
        0 != (e %= 64) &&
          (e < 32
            ? ((t[0] = t[1] >>> (32 - e)), (t[1] = t[1] << e))
            : ((t[0] = t[1] << (e - 32)), (t[1] = 0)));
      }
      function y(t, e) {
        (t[0] ^= e[0]), (t[1] ^= e[1]);
      }
      var E = [4283543511, 3981806797],
        w = [3301882366, 444984403];
      function S(t) {
        var e = [0, t[0] >>> 1];
        y(t, e), _(t, E), (e[1] = t[0] >>> 1), y(t, e), _(t, w), (e[1] = t[0] >>> 1), y(t, e);
      }
      var O = [2277735313, 289559509],
        I = [1291169091, 658871167],
        T = [0, 5],
        A = [0, 1390208809],
        P = [0, 944331445];
      function C(t, e) {
        var n = (function (t) {
          for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) {
            var i = t.charCodeAt(n);
            if (i > 127) return new TextEncoder().encode(t);
            e[n] = i;
          }
          return e;
        })(t);
        e = e || 0;
        var i,
          r = [0, n.length],
          o = r[1] % 16,
          a = r[1] - o,
          s = [0, e],
          u = [0, e],
          c = [0, 0],
          l = [0, 0];
        for (i = 0; i < a; i += 16)
          (c[0] = n[i + 4] | (n[i + 5] << 8) | (n[i + 6] << 16) | (n[i + 7] << 24)),
            (c[1] = n[i] | (n[i + 1] << 8) | (n[i + 2] << 16) | (n[i + 3] << 24)),
            (l[0] = n[i + 12] | (n[i + 13] << 8) | (n[i + 14] << 16) | (n[i + 15] << 24)),
            (l[1] = n[i + 8] | (n[i + 9] << 8) | (n[i + 10] << 16) | (n[i + 11] << 24)),
            _(c, O),
            m(c, 31),
            _(c, I),
            y(s, c),
            m(s, 27),
            v(s, u),
            _(s, T),
            v(s, A),
            _(l, I),
            m(l, 33),
            _(l, O),
            y(u, l),
            m(u, 31),
            v(u, s),
            _(u, T),
            v(u, P);
        (c[0] = 0), (c[1] = 0), (l[0] = 0), (l[1] = 0);
        var d = [0, 0];
        switch (o) {
          case 15:
            (d[1] = n[i + 14]), b(d, 48), y(l, d);
          case 14:
            (d[1] = n[i + 13]), b(d, 40), y(l, d);
          case 13:
            (d[1] = n[i + 12]), b(d, 32), y(l, d);
          case 12:
            (d[1] = n[i + 11]), b(d, 24), y(l, d);
          case 11:
            (d[1] = n[i + 10]), b(d, 16), y(l, d);
          case 10:
            (d[1] = n[i + 9]), b(d, 8), y(l, d);
          case 9:
            (d[1] = n[i + 8]), y(l, d), _(l, I), m(l, 33), _(l, O), y(u, l);
          case 8:
            (d[1] = n[i + 7]), b(d, 56), y(c, d);
          case 7:
            (d[1] = n[i + 6]), b(d, 48), y(c, d);
          case 6:
            (d[1] = n[i + 5]), b(d, 40), y(c, d);
          case 5:
            (d[1] = n[i + 4]), b(d, 32), y(c, d);
          case 4:
            (d[1] = n[i + 3]), b(d, 24), y(c, d);
          case 3:
            (d[1] = n[i + 2]), b(d, 16), y(c, d);
          case 2:
            (d[1] = n[i + 1]), b(d, 8), y(c, d);
          case 1:
            (d[1] = n[i]), y(c, d), _(c, O), m(c, 31), _(c, I), y(s, c);
        }
        return (
          y(s, r),
          y(u, r),
          v(s, u),
          v(u, s),
          S(s),
          S(u),
          v(s, u),
          v(u, s),
          ('00000000' + (s[0] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (s[1] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (u[0] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (u[1] >>> 0).toString(16)).slice(-8)
        );
      }
      function L(t) {
        return 'function' != typeof t;
      }
      function D(t, e, r, o) {
        var a = Object.keys(t).filter(function (t) {
            return !(function (t, e) {
              for (var n = 0, i = t.length; n < i; ++n) if (t[n] === e) return !0;
              return !1;
            })(r, t);
          }),
          s = l(
            c(
              a,
              function (n) {
                return (function (t, e) {
                  var n = l(
                    new Promise(function (n) {
                      var i = Date.now();
                      u(t.bind(null, e), function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        var r = Date.now() - i;
                        if (!t[0])
                          return n(function () {
                            return { error: t[1], duration: r };
                          });
                        var o = t[1];
                        if (L(o))
                          return n(function () {
                            return { value: o, duration: r };
                          });
                        n(function () {
                          return new Promise(function (t) {
                            var e = Date.now();
                            u(o, function () {
                              for (var n = [], i = 0; i < arguments.length; i++)
                                n[i] = arguments[i];
                              var o = r + Date.now() - e;
                              if (!n[0]) return t({ error: n[1], duration: o });
                              t({ value: n[1], duration: o });
                            });
                          });
                        });
                      });
                    }),
                  );
                  return function () {
                    return n.then(function (t) {
                      return t();
                    });
                  };
                })(t[n], e);
              },
              o,
            ),
          );
        return function () {
          return n(this, void 0, void 0, function () {
            var t, e, n, r;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return [4, s];
                case 1:
                  return [
                    4,
                    c(
                      i.sent(),
                      function (t) {
                        return l(t());
                      },
                      o,
                    ),
                  ];
                case 2:
                  return (t = i.sent()), [4, Promise.all(t)];
                case 3:
                  for (e = i.sent(), n = {}, r = 0; r < a.length; ++r) n[a[r]] = e[r];
                  return [2, n];
              }
            });
          });
        };
      }
      function x() {
        var t = window,
          e = navigator;
        return (
          g([
            'MSCSSMatrix' in t,
            'msSetImmediate' in t,
            'msIndexedDB' in t,
            'msMaxTouchPoints' in e,
            'msPointerEnabled' in e,
          ]) >= 4
        );
      }
      function M() {
        var t = window,
          e = navigator;
        return (
          g(['msWriteProfilerMark' in t, 'MSStream' in t, 'msLaunchUri' in e, 'msSaveBlob' in e]) >=
            3 && !x()
        );
      }
      function R() {
        var t = window,
          e = navigator;
        return (
          g([
            'webkitPersistentStorage' in e,
            'webkitTemporaryStorage' in e,
            0 === (e.vendor || '').indexOf('Google'),
            'webkitResolveLocalFileSystemURL' in t,
            'BatteryManager' in t,
            'webkitMediaStream' in t,
            'webkitSpeechGrammar' in t,
          ]) >= 5
        );
      }
      function U() {
        var t = window;
        return (
          g([
            'ApplePayError' in t,
            'CSSPrimitiveValue' in t,
            'Counter' in t,
            0 === navigator.vendor.indexOf('Apple'),
            'RGBColor' in t,
            'WebKitMediaKeys' in t,
          ]) >= 4
        );
      }
      function k() {
        var t = window,
          e = t.HTMLElement,
          n = t.Document;
        return (
          g([
            'safari' in t,
            !('ongestureend' in t),
            !('TouchEvent' in t),
            !('orientation' in t),
            e && !('autocapitalize' in e.prototype),
            n && 'pointerLockElement' in n.prototype,
          ]) >= 4
        );
      }
      function N() {
        var t,
          e = window;
        return (
          (t = e.print),
          /^function\s.*?\{\s*\[native code]\s*}$/.test(String(t)) &&
            '[object WebPageNamespace]' === String(e.browser)
        );
      }
      function B() {
        var t,
          e,
          n = window;
        return (
          g([
            'buildID' in navigator,
            'MozAppearance' in
              (null !==
                (e = null === (t = document.documentElement) || void 0 === t ? void 0 : t.style) &&
              void 0 !== e
                ? e
                : {}),
            'onmozfullscreenchange' in n,
            'mozInnerScreenX' in n,
            'CSSMozDocumentRule' in n,
            'CanvasCaptureMediaStream' in n,
          ]) >= 4
        );
      }
      function F() {
        var t = window,
          e = navigator,
          n = t.CSS,
          i = t.HTMLButtonElement;
        return (
          g([
            !('getStorageUpdates' in e),
            i && 'popover' in i.prototype,
            'CSSCounterStyleRule' in t,
            n.supports('font-size-adjust: ex-height 0.5'),
            n.supports('text-transform: full-width'),
          ]) >= 4
        );
      }
      function H() {
        var t = document;
        return (
          t.fullscreenElement ||
          t.msFullscreenElement ||
          t.mozFullScreenElement ||
          t.webkitFullscreenElement ||
          null
        );
      }
      function V() {
        var t = R(),
          e = B(),
          n = window,
          i = navigator,
          r = 'connection';
        return t
          ? g([
              !('SharedWorker' in n),
              i[r] && 'ontypechange' in i[r],
              !('sinkId' in new Audio()),
            ]) >= 2
          : !!e &&
              g(['onorientationchange' in n, 'orientation' in n, /android/i.test(i.appVersion)]) >=
                2;
      }
      function G() {
        var t = navigator,
          e = window,
          n = Audio.prototype,
          i = e.visualViewport;
        return (
          g([
            'srLatency' in n,
            'srChannelCount' in n,
            'devicePosture' in t,
            i && 'segments' in i,
            'getTextInformation' in Image.prototype,
          ]) >= 3
        );
      }
      function j() {
        var t = window,
          e = t.OfflineAudioContext || t.webkitOfflineAudioContext;
        if (!e) return -2;
        if (
          (function () {
            return (
              U() &&
              !k() &&
              !(
                g([
                  'DOMRectList' in (t = window),
                  'RTCPeerConnectionIceEvent' in t,
                  'SVGGeometryElement' in t,
                  'ontransitioncancel' in t,
                ]) >= 3
              )
            );
            var t;
          })()
        )
          return -1;
        var n = new e(1, 5e3, 44100),
          i = n.createOscillator();
        (i.type = 'triangle'), (i.frequency.value = 1e4);
        var r = n.createDynamicsCompressor();
        (r.threshold.value = -50),
          (r.knee.value = 40),
          (r.ratio.value = 12),
          (r.attack.value = 0),
          (r.release.value = 0.25),
          i.connect(r),
          r.connect(n.destination),
          i.start(0);
        var o = (function (t) {
            var e = function () {};
            return [
              new Promise(function (n, i) {
                var r = !1,
                  o = 0,
                  a = 0;
                t.oncomplete = function (t) {
                  return n(t.renderedBuffer);
                };
                var u = function () {
                    setTimeout(
                      function () {
                        return i(W('timeout'));
                      },
                      Math.min(500, a + 5e3 - Date.now()),
                    );
                  },
                  c = function () {
                    try {
                      var e = t.startRendering();
                      switch ((s(e) && l(e), t.state)) {
                        case 'running':
                          (a = Date.now()), r && u();
                          break;
                        case 'suspended':
                          document.hidden || o++,
                            r && o >= 3 ? i(W('suspended')) : setTimeout(c, 500);
                      }
                    } catch (t) {
                      i(t);
                    }
                  };
                c(),
                  (e = function () {
                    r || ((r = !0), a > 0 && u());
                  });
              }),
              e,
            ];
          })(n),
          a = o[0],
          u = o[1],
          c = l(
            a.then(
              function (t) {
                return (function (t) {
                  for (var e = 0, n = 0; n < t.length; ++n) e += Math.abs(t[n]);
                  return e;
                })(t.getChannelData(0).subarray(4500));
              },
              function (t) {
                if ('timeout' === t.name || 'suspended' === t.name) return -3;
                throw t;
              },
            ),
          );
        return function () {
          return u(), c;
        };
      }
      function W(t) {
        var e = new Error(t);
        return (e.name = t), e;
      }
      function K(t, e, r) {
        var o, s, u;
        return (
          void 0 === r && (r = 50),
          n(this, void 0, void 0, function () {
            var n, c;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  (n = document), (i.label = 1);
                case 1:
                  return n.body ? [3, 3] : [4, a(r)];
                case 2:
                  return i.sent(), [3, 1];
                case 3:
                  (c = n.createElement('iframe')), (i.label = 4);
                case 4:
                  return (
                    i.trys.push([4, , 10, 11]),
                    [
                      4,
                      new Promise(function (t, i) {
                        var r = !1,
                          o = function () {
                            (r = !0), t();
                          };
                        (c.onload = o),
                          (c.onerror = function (t) {
                            (r = !0), i(t);
                          });
                        var a = c.style;
                        a.setProperty('display', 'block', 'important'),
                          (a.position = 'absolute'),
                          (a.top = '0'),
                          (a.left = '0'),
                          (a.visibility = 'hidden'),
                          e && 'srcdoc' in c ? (c.srcdoc = e) : (c.src = 'about:blank'),
                          n.body.appendChild(c);
                        var s = function () {
                          var t, e;
                          r ||
                            ('complete' ===
                            (null ===
                              (e =
                                null === (t = c.contentWindow) || void 0 === t
                                  ? void 0
                                  : t.document) || void 0 === e
                              ? void 0
                              : e.readyState)
                              ? o()
                              : setTimeout(s, 10));
                        };
                        s();
                      }),
                    ]
                  );
                case 5:
                  i.sent(), (i.label = 6);
                case 6:
                  return (
                    null ===
                      (s = null === (o = c.contentWindow) || void 0 === o ? void 0 : o.document) ||
                    void 0 === s
                      ? void 0
                      : s.body
                  )
                    ? [3, 8]
                    : [4, a(r)];
                case 7:
                  return i.sent(), [3, 6];
                case 8:
                  return [4, t(c, c.contentWindow)];
                case 9:
                  return [2, i.sent()];
                case 10:
                  return null === (u = c.parentNode) || void 0 === u || u.removeChild(c), [7];
                case 11:
                  return [2];
              }
            });
          })
        );
      }
      function z(t) {
        for (
          var e = (function (t) {
              for (
                var e,
                  n,
                  i = "Unexpected syntax '".concat(t, "'"),
                  r = /^\s*([a-z-]*)(.*)$/i.exec(t),
                  o = r[1] || void 0,
                  a = {},
                  s = /([.:#][\w-]+|\[.+?\])/gi,
                  u = function (t, e) {
                    (a[t] = a[t] || []), a[t].push(e);
                  };
                ;

              ) {
                var c = s.exec(r[2]);
                if (!c) break;
                var l = c[0];
                switch (l[0]) {
                  case '.':
                    u('class', l.slice(1));
                    break;
                  case '#':
                    u('id', l.slice(1));
                    break;
                  case '[':
                    var d = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(l);
                    if (!d) throw new Error(i);
                    u(
                      d[1],
                      null !== (n = null !== (e = d[4]) && void 0 !== e ? e : d[5]) && void 0 !== n
                        ? n
                        : '',
                    );
                    break;
                  default:
                    throw new Error(i);
                }
              }
              return [o, a];
            })(t),
            n = e[0],
            i = e[1],
            r = document.createElement(null !== n && void 0 !== n ? n : 'div'),
            o = 0,
            a = Object.keys(i);
          o < a.length;
          o++
        ) {
          var s = a[o],
            u = i[s].join(' ');
          'style' === s ? Y(r.style, u) : r.setAttribute(s, u);
        }
        return r;
      }
      function Y(t, e) {
        for (var n = 0, i = e.split(';'); n < i.length; n++) {
          var r = i[n],
            o = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(r);
          if (o) {
            var a = o[1],
              s = o[2],
              u = o[4];
            t.setProperty(a, s, u || '');
          }
        }
      }
      var X = 'mmMwWLliI0O&1',
        q = '48px',
        J = ['monospace', 'sans-serif', 'serif'],
        Z = [
          'sans-serif-thin',
          'ARNO PRO',
          'Agency FB',
          'Arabic Typesetting',
          'Arial Unicode MS',
          'AvantGarde Bk BT',
          'BankGothic Md BT',
          'Batang',
          'Bitstream Vera Sans Mono',
          'Calibri',
          'Century',
          'Century Gothic',
          'Clarendon',
          'EUROSTILE',
          'Franklin Gothic',
          'Futura Bk BT',
          'Futura Md BT',
          'GOTHAM',
          'Gill Sans',
          'HELV',
          'Haettenschweiler',
          'Helvetica Neue',
          'Humanst521 BT',
          'Leelawadee',
          'Letter Gothic',
          'Levenim MT',
          'Lucida Bright',
          'Lucida Sans',
          'Menlo',
          'MS Mincho',
          'MS Outlook',
          'MS Reference Specialty',
          'MS UI Gothic',
          'MT Extra',
          'MYRIAD PRO',
          'Marlett',
          'Meiryo UI',
          'Microsoft Uighur',
          'Minion Pro',
          'Monotype Corsiva',
          'PMingLiU',
          'Pristina',
          'SCRIPTINA',
          'Segoe UI Light',
          'Serifa',
          'SimHei',
          'Small Fonts',
          'Staccato222 BT',
          'TRAJAN PRO',
          'Univers CE 55 Medium',
          'Vrinda',
          'ZWAdobeF',
        ];
      function Q(t) {
        var e,
          n,
          i,
          r = !1,
          o = (function () {
            var t = document.createElement('canvas');
            return (t.width = 1), (t.height = 1), [t, t.getContext('2d')];
          })(),
          a = o[0],
          s = o[1];
        return (
          (function (t, e) {
            return !(!e || !t.toDataURL);
          })(a, s)
            ? ((r = (function (t) {
                return t.rect(0, 0, 10, 10), t.rect(2, 2, 6, 6), !t.isPointInPath(5, 5, 'evenodd');
              })(s)),
              t
                ? (n = i = 'skipped')
                : ((n = (e = (function (t, e) {
                    !(function (t, e) {
                      (t.width = 240),
                        (t.height = 60),
                        (e.textBaseline = 'alphabetic'),
                        (e.fillStyle = '#f60'),
                        e.fillRect(100, 1, 62, 20),
                        (e.fillStyle = '#069'),
                        (e.font = '11pt "Times New Roman"');
                      var n = 'Cwm fjordbank gly '.concat(String.fromCharCode(55357, 56835));
                      e.fillText(n, 2, 15),
                        (e.fillStyle = 'rgba(102, 204, 0, 0.2)'),
                        (e.font = '18pt Arial'),
                        e.fillText(n, 4, 45);
                    })(t, e);
                    var n = $(t),
                      i = $(t);
                    return n !== i
                      ? ['unstable', 'unstable']
                      : ((function (t, e) {
                          (t.width = 122),
                            (t.height = 110),
                            (e.globalCompositeOperation = 'multiply');
                          for (
                            var n = 0,
                              i = [
                                ['#f2f', 40, 40],
                                ['#2ff', 80, 40],
                                ['#ff2', 60, 80],
                              ];
                            n < i.length;
                            n++
                          ) {
                            var r = i[n],
                              o = r[0],
                              a = r[1],
                              s = r[2];
                            (e.fillStyle = o),
                              e.beginPath(),
                              e.arc(a, s, 40, 0, 2 * Math.PI, !0),
                              e.closePath(),
                              e.fill();
                          }
                          (e.fillStyle = '#f9c'),
                            e.arc(60, 60, 60, 0, 2 * Math.PI, !0),
                            e.arc(60, 60, 20, 0, 2 * Math.PI, !0),
                            e.fill('evenodd');
                        })(t, e),
                        [$(t), n]);
                  })(a, s))[0]),
                  (i = e[1])))
            : (n = i = 'unsupported'),
          { winding: r, geometry: n, text: i }
        );
      }
      function $(t) {
        return t.toDataURL();
      }
      function tt() {
        var t = screen,
          e = function (t) {
            return f(d(t), null);
          },
          n = [e(t.width), e(t.height)];
        return n.sort().reverse(), n;
      }
      var et,
        nt,
        it = 2500,
        rt = 10;
      function ot() {
        var t = this;
        return (
          (function () {
            if (void 0 === nt) {
              var t = function () {
                var e = at();
                st(e) ? (nt = setTimeout(t, it)) : ((et = e), (nt = void 0));
              };
              t();
            }
          })(),
          function () {
            return n(t, void 0, void 0, function () {
              var t;
              return i(this, function (e) {
                switch (e.label) {
                  case 0:
                    return st((t = at()))
                      ? et
                        ? [2, r([], et, !0)]
                        : H()
                          ? [
                              4,
                              ((n = document),
                              (
                                n.exitFullscreen ||
                                n.msExitFullscreen ||
                                n.mozCancelFullScreen ||
                                n.webkitExitFullscreen
                              ).call(n)),
                            ]
                          : [3, 2]
                      : [3, 2];
                  case 1:
                    e.sent(), (t = at()), (e.label = 2);
                  case 2:
                    return st(t) || (et = t), [2, t];
                }
                var n;
              });
            });
          }
        );
      }
      function at() {
        var t = screen;
        return [
          f(h(t.availTop), null),
          f(h(t.width) - h(t.availWidth) - f(h(t.availLeft), 0), null),
          f(h(t.height) - h(t.availHeight) - f(h(t.availTop), 0), null),
          f(h(t.availLeft), null),
        ];
      }
      function st(t) {
        for (var e = 0; e < 4; ++e) if (t[e]) return !1;
        return !0;
      }
      function ut(t) {
        t.style.setProperty('visibility', 'hidden', 'important'),
          t.style.setProperty('display', 'block', 'important');
      }
      function ct(t) {
        return matchMedia('(inverted-colors: '.concat(t, ')')).matches;
      }
      function lt(t) {
        return matchMedia('(forced-colors: '.concat(t, ')')).matches;
      }
      var dt = 100;
      function ht(t) {
        return matchMedia('(prefers-contrast: '.concat(t, ')')).matches;
      }
      function ft(t) {
        return matchMedia('(prefers-reduced-motion: '.concat(t, ')')).matches;
      }
      function gt(t) {
        return matchMedia('(prefers-reduced-transparency: '.concat(t, ')')).matches;
      }
      function pt(t) {
        return matchMedia('(dynamic-range: '.concat(t, ')')).matches;
      }
      var vt = Math,
        _t = function () {
          return 0;
        },
        mt = 'mmMwWLliI0fiflO&1',
        bt = {
          default: [],
          apple: [{ font: '-apple-system-body' }],
          serif: [{ fontFamily: 'serif' }],
          sans: [{ fontFamily: 'sans-serif' }],
          mono: [{ fontFamily: 'monospace' }],
          min: [{ fontSize: '1px' }],
          system: [{ fontFamily: 'system-ui' }],
        },
        yt = function () {
          for (var t = window; ; ) {
            var e = t.parent;
            if (!e || e === t) return !1;
            try {
              if (e.location.origin !== t.location.origin) return !0;
            } catch (t) {
              if (t instanceof Error && 'SecurityError' === t.name) return !0;
              throw t;
            }
            t = e;
          }
        },
        Et = -1,
        wt = -2,
        St = new Set([
          10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961, 2962, 2963, 2964,
          2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089, 3106, 3107, 32773, 32777, 32777,
          32823, 32824, 32936, 32937, 32938, 32939, 32968, 32969, 32970, 32971, 3317, 33170, 3333,
          3379, 3386, 33901, 33902, 34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414, 3415,
          34467, 34816, 34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661, 35724, 35738, 35739,
          36003, 36004, 36005, 36347, 36348, 36349, 37440, 37441, 37443, 7936, 7937, 7938,
        ]),
        Ot = new Set([34047, 35723, 36063, 34852, 34853, 34854, 34229, 36392, 36795, 38449]),
        It = ['FRAGMENT_SHADER', 'VERTEX_SHADER'],
        Tt = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'],
        At = 'WEBGL_debug_renderer_info',
        Pt = 'WEBGL_polygon_mode';
      function Ct(t) {
        if (t.webgl) return t.webgl.context;
        var e,
          n = document.createElement('canvas');
        n.addEventListener('webglCreateContextError', function () {
          return (e = void 0);
        });
        for (var i = 0, r = ['webgl', 'experimental-webgl']; i < r.length; i++) {
          var o = r[i];
          try {
            e = n.getContext(o);
          } catch (t) {}
          if (e) break;
        }
        return (t.webgl = { context: e }), e;
      }
      function Lt(t, e, n) {
        var i = t.getShaderPrecisionFormat(t[e], t[n]);
        return i ? [i.rangeMin, i.rangeMax, i.precision] : [];
      }
      function Dt(t) {
        return Object.keys(t.__proto__).filter(xt);
      }
      function xt(t) {
        return 'string' == typeof t && !t.match(/[^A-Z0-9_x]/);
      }
      function Mt() {
        return B();
      }
      function Rt(t) {
        return 'function' == typeof t.getParameter;
      }
      var Ut = {
          fonts: function () {
            var t = this;
            return K(function (e, r) {
              var o = r.document;
              return n(t, void 0, void 0, function () {
                var t, e, n, r, a, s, u, c, l, d, h;
                return i(this, function (i) {
                  for (
                    (t = o.body).style.fontSize = q,
                      (e = o.createElement('div')).style.setProperty(
                        'visibility',
                        'hidden',
                        'important',
                      ),
                      n = {},
                      r = {},
                      a = function (t) {
                        var n = o.createElement('span'),
                          i = n.style;
                        return (
                          (i.position = 'absolute'),
                          (i.top = '0'),
                          (i.left = '0'),
                          (i.fontFamily = t),
                          (n.textContent = X),
                          e.appendChild(n),
                          n
                        );
                      },
                      s = function (t, e) {
                        return a("'".concat(t, "',").concat(e));
                      },
                      u = function () {
                        for (
                          var t = {},
                            e = function (e) {
                              t[e] = J.map(function (t) {
                                return s(e, t);
                              });
                            },
                            n = 0,
                            i = Z;
                          n < i.length;
                          n++
                        )
                          e(i[n]);
                        return t;
                      },
                      c = function (t) {
                        return J.some(function (e, i) {
                          return t[i].offsetWidth !== n[e] || t[i].offsetHeight !== r[e];
                        });
                      },
                      l = J.map(a),
                      d = u(),
                      t.appendChild(e),
                      h = 0;
                    h < J.length;
                    h++
                  )
                    (n[J[h]] = l[h].offsetWidth), (r[J[h]] = l[h].offsetHeight);
                  return [
                    2,
                    Z.filter(function (t) {
                      return c(d[t]);
                    }),
                  ];
                });
              });
            });
          },
          domBlockers: function (t) {
            var e = (void 0 === t ? {} : t).debug;
            return n(this, void 0, void 0, function () {
              var t, r, o, s, u;
              return i(this, function (c) {
                switch (c.label) {
                  case 0:
                    return U() || V()
                      ? ((l = atob),
                        (t = {
                          abpIndo: [
                            '#Iklan-Melayang',
                            '#Kolom-Iklan-728',
                            '#SidebarIklan-wrapper',
                            '[title="ALIENBOLA" i]',
                            l('I0JveC1CYW5uZXItYWRz'),
                          ],
                          abpvn: [
                            '.quangcao',
                            '#mobileCatfish',
                            l('LmNsb3NlLWFkcw=='),
                            '[id^="bn_bottom_fixed_"]',
                            '#pmadv',
                          ],
                          adBlockFinland: [
                            '.mainostila',
                            l('LnNwb25zb3JpdA=='),
                            '.ylamainos',
                            l('YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd'),
                            l('YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd'),
                          ],
                          adBlockPersian: [
                            '#navbar_notice_50',
                            '.kadr',
                            'TABLE[width="140px"]',
                            '#divAgahi',
                            l('YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd'),
                          ],
                          adBlockWarningRemoval: [
                            '#adblock-honeypot',
                            '.adblocker-root',
                            '.wp_adblock_detect',
                            l('LmhlYWRlci1ibG9ja2VkLWFk'),
                            l('I2FkX2Jsb2NrZXI='),
                          ],
                          adGuardAnnoyances: [
                            '.hs-sosyal',
                            '#cookieconsentdiv',
                            'div[class^="app_gdpr"]',
                            '.as-oil',
                            '[data-cypress="soft-push-notification-modal"]',
                          ],
                          adGuardBase: [
                            '.BetterJsPopOverlay',
                            l('I2FkXzMwMFgyNTA='),
                            l('I2Jhbm5lcmZsb2F0MjI='),
                            l('I2NhbXBhaWduLWJhbm5lcg=='),
                            l('I0FkLUNvbnRlbnQ='),
                          ],
                          adGuardChinese: [
                            l('LlppX2FkX2FfSA=='),
                            l('YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd'),
                            '#widget-quan',
                            l('YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd'),
                            l('YVtocmVmKj0iLjE5NTZobC5jb20vIl0='),
                          ],
                          adGuardFrench: [
                            '#pavePub',
                            l('LmFkLWRlc2t0b3AtcmVjdGFuZ2xl'),
                            '.mobile_adhesion',
                            '.widgetadv',
                            l('LmFkc19iYW4='),
                          ],
                          adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                          adGuardJapanese: [
                            '#kauli_yad_1',
                            l('YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0='),
                            l('Ll9wb3BJbl9pbmZpbml0ZV9hZA=='),
                            l('LmFkZ29vZ2xl'),
                            l('Ll9faXNib29zdFJldHVybkFk'),
                          ],
                          adGuardMobile: [
                            l('YW1wLWF1dG8tYWRz'),
                            l('LmFtcF9hZA=='),
                            'amp-embed[type="24smi"]',
                            '#mgid_iframe1',
                            l('I2FkX2ludmlld19hcmVh'),
                          ],
                          adGuardRussian: [
                            l('YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0='),
                            l('LnJlY2xhbWE='),
                            'div[id^="smi2adblock"]',
                            l('ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd'),
                            '#psyduckpockeball',
                          ],
                          adGuardSocial: [
                            l('YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0='),
                            l('YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0='),
                            '.etsy-tweet',
                            '#inlineShare',
                            '.popup-social',
                          ],
                          adGuardSpanishPortuguese: [
                            '#barraPublicidade',
                            '#Publicidade',
                            '#publiEspecial',
                            '#queTooltip',
                            '.cnt-publi',
                          ],
                          adGuardTrackingProtection: [
                            '#qoo-counter',
                            l('YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=='),
                            l('YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0='),
                            l('YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=='),
                            '#top100counter',
                          ],
                          adGuardTurkish: [
                            '#backkapat',
                            l('I3Jla2xhbWk='),
                            l('YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0='),
                            l('YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd'),
                            l('YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ=='),
                          ],
                          bulgarian: [
                            l('dGQjZnJlZW5ldF90YWJsZV9hZHM='),
                            '#ea_intext_div',
                            '.lapni-pop-over',
                            '#xenium_hot_offers',
                          ],
                          easyList: [
                            '.yb-floorad',
                            l('LndpZGdldF9wb19hZHNfd2lkZ2V0'),
                            l('LnRyYWZmaWNqdW5reS1hZA=='),
                            '.textad_headline',
                            l('LnNwb25zb3JlZC10ZXh0LWxpbmtz'),
                          ],
                          easyListChina: [
                            l('LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=='),
                            l('LmZyb250cGFnZUFkdk0='),
                            '#taotaole',
                            '#aafoot.top_box',
                            '.cfa_popup',
                          ],
                          easyListCookie: [
                            '.ezmob-footer',
                            '.cc-CookieWarning',
                            '[data-cookie-number]',
                            l('LmF3LWNvb2tpZS1iYW5uZXI='),
                            '.sygnal24-gdpr-modal-wrap',
                          ],
                          easyListCzechSlovak: [
                            '#onlajny-stickers',
                            l('I3Jla2xhbW5pLWJveA=='),
                            l('LnJla2xhbWEtbWVnYWJvYXJk'),
                            '.sklik',
                            l('W2lkXj0ic2tsaWtSZWtsYW1hIl0='),
                          ],
                          easyListDutch: [
                            l('I2FkdmVydGVudGll'),
                            l('I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=='),
                            '.adstekst',
                            l('YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0='),
                            '#semilo-lrectangle',
                          ],
                          easyListGermany: [
                            '#SSpotIMPopSlider',
                            l('LnNwb25zb3JsaW5rZ3J1ZW4='),
                            l('I3dlcmJ1bmdza3k='),
                            l('I3Jla2xhbWUtcmVjaHRzLW1pdHRl'),
                            l('YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0='),
                          ],
                          easyListItaly: [
                            l('LmJveF9hZHZfYW5udW5jaQ=='),
                            '.sb-box-pubbliredazionale',
                            l('YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd'),
                            l('YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd'),
                            l('YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ=='),
                          ],
                          easyListLithuania: [
                            l('LnJla2xhbW9zX3RhcnBhcw=='),
                            l('LnJla2xhbW9zX251b3JvZG9z'),
                            l('aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd'),
                            l('aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd'),
                            l('aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd'),
                          ],
                          estonian: [l('QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==')],
                          fanboyAnnoyances: [
                            '#ac-lre-player',
                            '.navigate-to-top',
                            '#subscribe_popup',
                            '.newsletter_holder',
                            '#back-top',
                          ],
                          fanboyAntiFacebook: ['.util-bar-module-firefly-visible'],
                          fanboyEnhancedTrackers: [
                            '.open.pushModal',
                            '#issuem-leaky-paywall-articles-zero-remaining-nag',
                            '#sovrn_container',
                            'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
                            '.BlockNag__Card',
                          ],
                          fanboySocial: [
                            '#FollowUs',
                            '#meteored_share',
                            '#social_follow',
                            '.article-sharer',
                            '.community__social-desc',
                          ],
                          frellwitSwedish: [
                            l('YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=='),
                            l('YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=='),
                            'article.category-samarbete',
                            l('ZGl2LmhvbGlkQWRz'),
                            'ul.adsmodern',
                          ],
                          greekAdBlock: [
                            l('QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd'),
                            l('QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=='),
                            l('QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd'),
                            'DIV.agores300',
                            'TABLE.advright',
                          ],
                          hungarian: [
                            '#cemp_doboz',
                            '.optimonk-iframe-container',
                            l('LmFkX19tYWlu'),
                            l('W2NsYXNzKj0iR29vZ2xlQWRzIl0='),
                            '#hirdetesek_box',
                          ],
                          iDontCareAboutCookies: [
                            '.alert-info[data-block-track*="CookieNotice"]',
                            '.ModuleTemplateCookieIndicator',
                            '.o--cookies--container',
                            '#cookies-policy-sticky',
                            '#stickyCookieBar',
                          ],
                          icelandicAbp: [
                            l('QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ=='),
                          ],
                          latvian: [
                            l(
                              'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0=',
                            ),
                            l(
                              'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==',
                            ),
                          ],
                          listKr: [
                            l('YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0='),
                            l('I2xpdmVyZUFkV3JhcHBlcg=='),
                            l('YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=='),
                            l('aW5zLmZhc3R2aWV3LWFk'),
                            '.revenue_unit_item.dable',
                          ],
                          listeAr: [
                            l('LmdlbWluaUxCMUFk'),
                            '.right-and-left-sponsers',
                            l('YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=='),
                            l('YVtocmVmKj0iYm9vcmFxLm9yZyJd'),
                            l('YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd'),
                          ],
                          listeFr: [
                            l('YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=='),
                            l('I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=='),
                            l('YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0='),
                            '.site-pub-interstitiel',
                            'div[id^="crt-"][data-criteo-id]',
                          ],
                          officialPolish: [
                            '#ceneo-placeholder-ceneo-12',
                            l('W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd'),
                            l(
                              'YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ==',
                            ),
                            l('YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=='),
                            l('ZGl2I3NrYXBpZWNfYWQ='),
                          ],
                          ro: [
                            l('YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd'),
                            l('YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd'),
                            l(
                              'YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0=',
                            ),
                            l('YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd'),
                            'a[href^="/url/"]',
                          ],
                          ruAd: [
                            l('YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd'),
                            l('YVtocmVmKj0iLy91dGltZy5ydS8iXQ=='),
                            l('YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0='),
                            '#pgeldiz',
                            '.yandex-rtb-block',
                          ],
                          thaiAds: [
                            'a[href*=macau-uta-popup]',
                            l('I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=='),
                            l('LmFkczMwMHM='),
                            '.bumq',
                            '.img-kosana',
                          ],
                          webAnnoyancesUltralist: [
                            '#mod-social-share-2',
                            '#social-tools',
                            l('LmN0cGwtZnVsbGJhbm5lcg=='),
                            '.zergnet-recommend',
                            '.yt.btn-link.btn-md.btn',
                          ],
                        }),
                        (r = Object.keys(t)),
                        [
                          4,
                          (function (t) {
                            var e;
                            return n(this, void 0, void 0, function () {
                              var n, r, o, s, u, c, l;
                              return i(this, function (i) {
                                switch (i.label) {
                                  case 0:
                                    for (
                                      n = document,
                                        r = n.createElement('div'),
                                        o = new Array(t.length),
                                        s = {},
                                        ut(r),
                                        l = 0;
                                      l < t.length;
                                      ++l
                                    )
                                      'DIALOG' === (u = z(t[l])).tagName && u.show(),
                                        ut((c = n.createElement('div'))),
                                        c.appendChild(u),
                                        r.appendChild(c),
                                        (o[l] = u);
                                    i.label = 1;
                                  case 1:
                                    return n.body ? [3, 3] : [4, a(50)];
                                  case 2:
                                    return i.sent(), [3, 1];
                                  case 3:
                                    n.body.appendChild(r);
                                    try {
                                      for (l = 0; l < t.length; ++l)
                                        o[l].offsetParent || (s[t[l]] = !0);
                                    } finally {
                                      null === (e = r.parentNode) ||
                                        void 0 === e ||
                                        e.removeChild(r);
                                    }
                                    return [2, s];
                                }
                              });
                            });
                          })(
                            (u = []).concat.apply(
                              u,
                              r.map(function (e) {
                                return t[e];
                              }),
                            ),
                          ),
                        ])
                      : [2, void 0];
                  case 1:
                    return (
                      (o = c.sent()),
                      e &&
                        (function (t, e) {
                          for (
                            var n = 'DOM blockers debug:\n```', i = 0, r = Object.keys(t);
                            i < r.length;
                            i++
                          ) {
                            var o = r[i];
                            n += '\n'.concat(o, ':');
                            for (var a = 0, s = t[o]; a < s.length; a++) {
                              var u = s[a];
                              n += '\n  '.concat(e[u] ? 'ðŸš«' : 'âž¡ï¸', ' ').concat(u);
                            }
                          }
                          console.log(''.concat(n, '\n```'));
                        })(t, o),
                      (s = r.filter(function (e) {
                        var n = t[e];
                        return (
                          g(
                            n.map(function (t) {
                              return o[t];
                            }),
                          ) >
                          0.6 * n.length
                        );
                      })).sort(),
                      [2, s]
                    );
                }
                var l;
              });
            });
          },
          fontPreferences: function () {
            return (
              (t = function (t, e) {
                for (var n = {}, i = {}, r = 0, o = Object.keys(bt); r < o.length; r++) {
                  var a = o[r],
                    s = bt[a],
                    u = s[0],
                    c = void 0 === u ? {} : u,
                    l = s[1],
                    d = void 0 === l ? mt : l,
                    h = t.createElement('span');
                  (h.textContent = d), (h.style.whiteSpace = 'nowrap');
                  for (var f = 0, g = Object.keys(c); f < g.length; f++) {
                    var p = g[f],
                      v = c[p];
                    void 0 !== v && (h.style[p] = v);
                  }
                  (n[a] = h), e.append(t.createElement('br'), h);
                }
                for (var _ = 0, m = Object.keys(bt); _ < m.length; _++)
                  i[(a = m[_])] = n[a].getBoundingClientRect().width;
                return i;
              }),
              void 0 === e && (e = 4e3),
              K(function (n, i) {
                var o = i.document,
                  a = o.body,
                  s = a.style;
                (s.width = ''.concat(e, 'px')),
                  (s.webkitTextSizeAdjust = s.textSizeAdjust = 'none'),
                  R()
                    ? (a.style.zoom = ''.concat(1 / i.devicePixelRatio))
                    : U() && (a.style.zoom = 'reset');
                var u = o.createElement('div');
                return (
                  (u.textContent = r([], Array((e / 20) << 0), !0)
                    .map(function () {
                      return 'word';
                    })
                    .join(' ')),
                  a.appendChild(u),
                  t(o, a)
                );
              }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
            );
            var t, e;
          },
          audio: function () {
            return (U() && F() && N()) ||
              (R() &&
                G() &&
                ((t = window),
                (e = t.URLPattern),
                g([
                  'union' in Set.prototype,
                  'Iterator' in t,
                  e && 'hasRegExpGroups' in e.prototype,
                  'RGB8' in WebGLRenderingContext.prototype,
                ]) >= 3))
              ? -4
              : j();
            var t, e;
          },
          screenFrame: function () {
            var t = this;
            if (U() && F() && N())
              return function () {
                return Promise.resolve(void 0);
              };
            var e = ot();
            return function () {
              return n(t, void 0, void 0, function () {
                var t, n;
                return i(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [4, e()];
                    case 1:
                      return (
                        (t = i.sent()),
                        [
                          2,
                          [
                            (n = function (t) {
                              return null === t ? null : p(t, rt);
                            })(t[0]),
                            n(t[1]),
                            n(t[2]),
                            n(t[3]),
                          ],
                        ]
                      );
                  }
                });
              });
            };
          },
          canvas: function () {
            return Q(U() && F() && N());
          },
          osCpu: function () {
            return navigator.oscpu;
          },
          languages: function () {
            var t,
              e = navigator,
              n = [],
              i = e.language || e.userLanguage || e.browserLanguage || e.systemLanguage;
            if ((void 0 !== i && n.push([i]), Array.isArray(e.languages)))
              (R() &&
                g([
                  !('MediaSettingsRange' in (t = window)),
                  'RTCEncodedAudioFrame' in t,
                  '' + t.Intl == '[object Intl]',
                  '' + t.Reflect == '[object Reflect]',
                ]) >= 3) ||
                n.push(e.languages);
            else if ('string' == typeof e.languages) {
              var r = e.languages;
              r && n.push(r.split(','));
            }
            return n;
          },
          colorDepth: function () {
            return window.screen.colorDepth;
          },
          deviceMemory: function () {
            return f(h(navigator.deviceMemory), void 0);
          },
          screenResolution: function () {
            if (!(U() && F() && N())) return tt();
          },
          hardwareConcurrency: function () {
            return f(d(navigator.hardwareConcurrency), void 0);
          },
          timezone: function () {
            var t,
              e = null === (t = window.Intl) || void 0 === t ? void 0 : t.DateTimeFormat;
            if (e) {
              var n = new e().resolvedOptions().timeZone;
              if (n) return n;
            }
            var i,
              r =
                ((i = new Date().getFullYear()),
                -Math.max(
                  h(new Date(i, 0, 1).getTimezoneOffset()),
                  h(new Date(i, 6, 1).getTimezoneOffset()),
                ));
            return 'UTC'.concat(r >= 0 ? '+' : '').concat(r);
          },
          sessionStorage: function () {
            try {
              return !!window.sessionStorage;
            } catch (t) {
              return !0;
            }
          },
          localStorage: function () {
            try {
              return !!window.localStorage;
            } catch (t) {
              return !0;
            }
          },
          indexedDB: function () {
            if (!x() && !M())
              try {
                return !!window.indexedDB;
              } catch (t) {
                return !0;
              }
          },
          openDatabase: function () {
            return !!window.openDatabase;
          },
          cpuClass: function () {
            return navigator.cpuClass;
          },
          platform: function () {
            var t = navigator.platform;
            return 'MacIntel' === t && U() && !k()
              ? (function () {
                  if ('iPad' === navigator.platform) return !0;
                  var t = screen,
                    e = t.width / t.height;
                  return (
                    g([
                      'MediaSource' in window,
                      !!Element.prototype.webkitRequestFullscreen,
                      e > 0.65 && e < 1.53,
                    ]) >= 2
                  );
                })()
                ? 'iPad'
                : 'iPhone'
              : t;
          },
          plugins: function () {
            var t = navigator.plugins;
            if (t) {
              for (var e = [], n = 0; n < t.length; ++n) {
                var i = t[n];
                if (i) {
                  for (var r = [], o = 0; o < i.length; ++o) {
                    var a = i[o];
                    r.push({ type: a.type, suffixes: a.suffixes });
                  }
                  e.push({ name: i.name, description: i.description, mimeTypes: r });
                }
              }
              return e;
            }
          },
          touchSupport: function () {
            var t,
              e = navigator,
              n = 0;
            void 0 !== e.maxTouchPoints
              ? (n = d(e.maxTouchPoints))
              : void 0 !== e.msMaxTouchPoints && (n = e.msMaxTouchPoints);
            try {
              document.createEvent('TouchEvent'), (t = !0);
            } catch (e) {
              t = !1;
            }
            return { maxTouchPoints: n, touchEvent: t, touchStart: 'ontouchstart' in window };
          },
          vendor: function () {
            return navigator.vendor || '';
          },
          vendorFlavors: function () {
            for (
              var t = [],
                e = 0,
                n = [
                  'chrome',
                  'safari',
                  '__crWeb',
                  '__gCrWeb',
                  'yandex',
                  '__yb',
                  '__ybro',
                  '__firefox__',
                  '__edgeTrackingPreventionStatistics',
                  'webkit',
                  'oprt',
                  'samsungAr',
                  'ucweb',
                  'UCShellJava',
                  'puffinDevice',
                ];
              e < n.length;
              e++
            ) {
              var i = n[e],
                r = window[i];
              r && 'object' == typeof r && t.push(i);
            }
            return t.sort();
          },
          cookiesEnabled: function () {
            var t = document;
            try {
              t.cookie = 'cookietest=1; SameSite=Strict;';
              var e = -1 !== t.cookie.indexOf('cookietest=');
              return (
                (t.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'),
                e
              );
            } catch (t) {
              return !1;
            }
          },
          colorGamut: function () {
            for (var t = 0, e = ['rec2020', 'p3', 'srgb']; t < e.length; t++) {
              var n = e[t];
              if (matchMedia('(color-gamut: '.concat(n, ')')).matches) return n;
            }
          },
          invertedColors: function () {
            return !!ct('inverted') || (!ct('none') && void 0);
          },
          forcedColors: function () {
            return !!lt('active') || (!lt('none') && void 0);
          },
          monochrome: function () {
            if (matchMedia('(min-monochrome: 0)').matches) {
              for (var t = 0; t <= dt; ++t)
                if (matchMedia('(max-monochrome: '.concat(t, ')')).matches) return t;
              throw new Error('Too high value');
            }
          },
          contrast: function () {
            return ht('no-preference')
              ? 0
              : ht('high') || ht('more')
                ? 1
                : ht('low') || ht('less')
                  ? -1
                  : ht('forced')
                    ? 10
                    : void 0;
          },
          reducedMotion: function () {
            return !!ft('reduce') || (!ft('no-preference') && void 0);
          },
          reducedTransparency: function () {
            return !!gt('reduce') || (!gt('no-preference') && void 0);
          },
          hdr: function () {
            return !!pt('high') || (!pt('standard') && void 0);
          },
          math: function () {
            var t,
              e = vt.acos || _t,
              n = vt.acosh || _t,
              i = vt.asin || _t,
              r = vt.asinh || _t,
              o = vt.atanh || _t,
              a = vt.atan || _t,
              s = vt.sin || _t,
              u = vt.sinh || _t,
              c = vt.cos || _t,
              l = vt.cosh || _t,
              d = vt.tan || _t,
              h = vt.tanh || _t,
              f = vt.exp || _t,
              g = vt.expm1 || _t,
              p = vt.log1p || _t;
            return {
              acos: e(0.12312423423423424),
              acosh: n(1e308),
              acoshPf: ((t = 1e154), vt.log(t + vt.sqrt(t * t - 1))),
              asin: i(0.12312423423423424),
              asinh: r(1),
              asinhPf: (function (t) {
                return vt.log(t + vt.sqrt(t * t + 1));
              })(1),
              atanh: o(0.5),
              atanhPf: (function (t) {
                return vt.log((1 + t) / (1 - t)) / 2;
              })(0.5),
              atan: a(0.5),
              sin: s(-1e300),
              sinh: u(1),
              sinhPf: (function (t) {
                return vt.exp(t) - 1 / vt.exp(t) / 2;
              })(1),
              cos: c(10.000000000123),
              cosh: l(1),
              coshPf: (function (t) {
                return (vt.exp(t) + 1 / vt.exp(t)) / 2;
              })(1),
              tan: d(-1e300),
              tanh: h(1),
              tanhPf: (function (t) {
                return (vt.exp(2 * t) - 1) / (vt.exp(2 * t) + 1);
              })(1),
              exp: f(1),
              expm1: g(1),
              expm1Pf: (function (t) {
                return vt.exp(t) - 1;
              })(1),
              log1p: p(10),
              log1pPf: (function (t) {
                return vt.log(1 + t);
              })(10),
              powPI: (function (t) {
                return vt.pow(vt.PI, t);
              })(-100),
            };
          },
          pdfViewerEnabled: function () {
            return navigator.pdfViewerEnabled;
          },
          architecture: function () {
            var t = new Float32Array(1),
              e = new Uint8Array(t.buffer);
            return (t[0] = 1 / 0), (t[0] = t[0] - t[0]), e[3];
          },
          applePay: function () {
            var t = window.ApplePaySession;
            if ('function' != typeof (null === t || void 0 === t ? void 0 : t.canMakePayments))
              return -1;
            if (yt()) return -3;
            try {
              return t.canMakePayments() ? 1 : 0;
            } catch (t) {
              return (function (t) {
                if (
                  t instanceof Error &&
                  'InvalidAccessError' === t.name &&
                  /\bfrom\b.*\binsecure\b/i.test(t.message)
                )
                  return -2;
                throw t;
              })(t);
            }
          },
          privateClickMeasurement: function () {
            var t,
              e = document.createElement('a'),
              n = null !== (t = e.attributionSourceId) && void 0 !== t ? t : e.attributionsourceid;
            return void 0 === n ? void 0 : String(n);
          },
          audioBaseLatency: function () {
            var t;
            return V() || U()
              ? window.AudioContext && null !== (t = new AudioContext().baseLatency) && void 0 !== t
                ? t
                : -1
              : -2;
          },
          dateTimeLocale: function () {
            if (!window.Intl) return -1;
            var t = window.Intl.DateTimeFormat;
            if (!t) return -2;
            var e = t().resolvedOptions().locale;
            return e || '' === e ? e : -3;
          },
          webGlBasics: function (t) {
            var e,
              n,
              i,
              r,
              o,
              a,
              s = Ct(t.cache);
            if (!s) return Et;
            if (!Rt(s)) return wt;
            var u = Mt() ? null : s.getExtension(At);
            return {
              version:
                (null === (e = s.getParameter(s.VERSION)) || void 0 === e
                  ? void 0
                  : e.toString()) || '',
              vendor:
                (null === (n = s.getParameter(s.VENDOR)) || void 0 === n ? void 0 : n.toString()) ||
                '',
              vendorUnmasked: u
                ? null === (i = s.getParameter(u.UNMASKED_VENDOR_WEBGL)) || void 0 === i
                  ? void 0
                  : i.toString()
                : '',
              renderer:
                (null === (r = s.getParameter(s.RENDERER)) || void 0 === r
                  ? void 0
                  : r.toString()) || '',
              rendererUnmasked: u
                ? null === (o = s.getParameter(u.UNMASKED_RENDERER_WEBGL)) || void 0 === o
                  ? void 0
                  : o.toString()
                : '',
              shadingLanguageVersion:
                (null === (a = s.getParameter(s.SHADING_LANGUAGE_VERSION)) || void 0 === a
                  ? void 0
                  : a.toString()) || '',
            };
          },
          webGlExtensions: function (t) {
            var e = Ct(t.cache);
            if (!e) return Et;
            if (!Rt(e)) return wt;
            var n = e.getSupportedExtensions(),
              i = e.getContextAttributes(),
              r = [],
              o = [],
              a = [],
              s = [],
              u = [];
            if (i)
              for (var c = 0, l = Object.keys(i); c < l.length; c++) {
                var d = l[c];
                o.push(''.concat(d, '=').concat(i[d]));
              }
            for (var h = 0, f = Dt(e); h < f.length; h++) {
              var g = e[(E = f[h])];
              a.push(
                ''
                  .concat(E, '=')
                  .concat(g)
                  .concat(St.has(g) ? '='.concat(e.getParameter(g)) : ''),
              );
            }
            if (n)
              for (var p = 0, v = n; p < v.length; p++) {
                var _ = v[p];
                if (!((_ === At && Mt()) || (_ === Pt && (R() || U())))) {
                  var m = e.getExtension(_);
                  if (m)
                    for (var b = 0, y = Dt(m); b < y.length; b++) {
                      var E;
                      (g = m[(E = y[b])]),
                        s.push(
                          ''
                            .concat(E, '=')
                            .concat(g)
                            .concat(Ot.has(g) ? '='.concat(e.getParameter(g)) : ''),
                        );
                    }
                  else r.push(_);
                }
              }
            for (var w = 0, S = It; w < S.length; w++)
              for (var O = S[w], I = 0, T = Tt; I < T.length; I++) {
                var A = T[I],
                  P = Lt(e, O, A);
                u.push(''.concat(O, '.').concat(A, '=').concat(P.join(',')));
              }
            return (
              s.sort(),
              a.sort(),
              {
                contextAttributes: o,
                parameters: a,
                shaderPrecisions: u,
                extensions: n,
                extensionParameters: s,
                unsupportedExtensions: r,
              }
            );
          },
        },
        kt = '$ if upgrade to Pro: https://fpjs.dev/pro';
      function Nt(t) {
        var e = (function (t) {
            if (V()) return 0.4;
            if (U()) return !k() || (F() && N()) ? 0.3 : 0.5;
            var e = 'value' in t.platform ? t.platform.value : '';
            return /^Win/.test(e) ? 0.6 : /^Mac/.test(e) ? 0.5 : 0.7;
          })(t),
          n = (function (t) {
            return p(0.99 + 0.01 * t, 1e-4);
          })(e);
        return { score: e, comment: kt.replace(/\$/g, ''.concat(n)) };
      }
      function Bt(t) {
        return JSON.stringify(
          t,
          function (t, n) {
            return n instanceof Error
              ? e(
                  {
                    name: (i = n).name,
                    message: i.message,
                    stack: null === (r = i.stack) || void 0 === r ? void 0 : r.split('\n'),
                  },
                  i,
                )
              : n;
            var i, r;
          },
          2,
        );
      }
      function Ft(t) {
        return C(
          (function (t) {
            for (var e = '', n = 0, i = Object.keys(t).sort(); n < i.length; n++) {
              var r = i[n],
                o = t[r],
                a = 'error' in o ? 'error' : JSON.stringify(o.value);
              e += ''
                .concat(e ? '|' : '')
                .concat(r.replace(/([:|\\])/g, '\\$1'), ':')
                .concat(a);
            }
            return e;
          })(t),
        );
      }
      function Ht(t) {
        return (
          void 0 === t && (t = 50),
          (function (t, e) {
            void 0 === e && (e = 1 / 0);
            var n = window.requestIdleCallback;
            return n
              ? new Promise(function (t) {
                  return n.call(
                    window,
                    function () {
                      return t();
                    },
                    { timeout: e },
                  );
                })
              : a(Math.min(t, e));
          })(t, 2 * t)
        );
      }
      function Vt(t, e) {
        var r = Date.now();
        return {
          get: function (a) {
            return n(this, void 0, void 0, function () {
              var n, s, u;
              return i(this, function (i) {
                switch (i.label) {
                  case 0:
                    return (n = Date.now()), [4, t()];
                  case 1:
                    return (
                      (s = i.sent()),
                      (u = (function (t) {
                        var e,
                          n = Nt(t);
                        return {
                          get visitorId() {
                            return void 0 === e && (e = Ft(this.components)), e;
                          },
                          set visitorId(t) {
                            e = t;
                          },
                          confidence: n,
                          components: t,
                          version: o,
                        };
                      })(s)),
                      (e || (null === a || void 0 === a ? void 0 : a.debug)) &&
                        console.log(
                          'Copy the text below to get the debug data:\n\n```\nversion: '
                            .concat(u.version, '\nuserAgent: ')
                            .concat(navigator.userAgent, '\ntimeBetweenLoadAndGet: ')
                            .concat(n - r, '\nvisitorId: ')
                            .concat(u.visitorId, '\ncomponents: ')
                            .concat(Bt(s), '\n```'),
                        ),
                      [2, u]
                    );
                }
              });
            });
          },
        };
      }
      function Gt(t) {
        var e;
        return (
          void 0 === t && (t = {}),
          n(this, void 0, void 0, function () {
            var n, r;
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (null === (e = t.monitoring) || void 0 === e || e) &&
                      (function () {
                        if (!(window.__fpjs_d_m || Math.random() >= 0.001))
                          try {
                            var t = new XMLHttpRequest();
                            t.open(
                              'get',
                              'https://m1.openfpcdn.io/fingerprintjs/v'.concat(
                                o,
                                '/npm-monitoring',
                              ),
                              !0,
                            ),
                              t.send();
                          } catch (t) {
                            console.error(t);
                          }
                      })(),
                    (n = t.delayFallback),
                    (r = t.debug),
                    [4, Ht(n)]
                  );
                case 1:
                  return (
                    i.sent(),
                    [
                      2,
                      Vt(
                        (function (t) {
                          return D(Ut, t, []);
                        })({ cache: {}, debug: r }),
                        r,
                      ),
                    ]
                  );
              }
            });
          })
        );
      }
      var jt = { load: Gt, hashComponents: Ft, componentsToDebugString: Bt },
        Wt = C;
      return (
        (t.componentsToDebugString = Bt),
        (t.default = jt),
        (t.getFullscreenElement = H),
        (t.getUnstableAudioFingerprint = j),
        (t.getUnstableCanvasFingerprint = Q),
        (t.getUnstableScreenFrame = ot),
        (t.getUnstableScreenResolution = tt),
        (t.getWebGLContext = Ct),
        (t.hashComponents = Ft),
        (t.isAndroid = V),
        (t.isChromium = R),
        (t.isDesktopWebKit = k),
        (t.isEdgeHTML = M),
        (t.isGecko = B),
        (t.isSamsungInternet = G),
        (t.isTrident = x),
        (t.isWebKit = U),
        (t.load = Gt),
        (t.loadSources = D),
        (t.murmurX64Hash128 = Wt),
        (t.prepareForSources = Ht),
        (t.sources = Ut),
        (t.transformSource = function (t, e) {
          var n = function (t) {
            return L(t)
              ? e(t)
              : function () {
                  var n = t();
                  return s(n) ? n.then(e) : e(n);
                };
          };
          return function (e) {
            var i = t(e);
            return s(i) ? i.then(n) : n(i);
          };
        }),
        (t.withIframe = K),
        Object.defineProperty(t, '__esModule', { value: !0 }),
        t
      );
    })({})),
    ((_POSignalsEntities || (_POSignalsEntities = {})).BroprintJS = (function (t) {
      'use strict';
      const e = function (t, e = 0) {
          let n = 3735928559 ^ e,
            i = 1103547991 ^ e;
          for (let e, r = 0; r < t.length; r++)
            (e = t.charCodeAt(r)),
              (n = Math.imul(n ^ e, 2654435761)),
              (i = Math.imul(i ^ e, 1597334677));
          return (
            (n = Math.imul(n ^ (n >>> 16), 2246822507) ^ Math.imul(i ^ (i >>> 13), 3266489909)),
            4294967296 *
              (2097151 &
                (i =
                  Math.imul(i ^ (i >>> 16), 2246822507) ^ Math.imul(n ^ (n >>> 13), 3266489909))) +
              (n >>> 0)
          );
        },
        n = () => {
          if (
            !(() => {
              const t = document.createElement('canvas');
              return !(!t.getContext || !t.getContext('2d'));
            })()
          )
            return 'canvas not supported';
          var t = document.createElement('canvas'),
            e = t.getContext('2d'),
            n = 'BroPrint.65@345876';
          return (
            (e.textBaseline = 'top'),
            (e.font = "14px 'Arial'"),
            (e.textBaseline = 'alphabetic'),
            (e.fillStyle = '#f60'),
            e.fillRect(125, 1, 62, 20),
            (e.fillStyle = '#069'),
            e.fillText(n, 2, 15),
            (e.fillStyle = 'rgba(102, 204, 0, 0.7)'),
            e.fillText(n, 4, 17),
            t.toDataURL()
          );
        },
        i = (function () {
          let t = null,
            e = null,
            n = null,
            i = null,
            r = null,
            o = null;
          function a(e, n) {
            void 0 !== i[e] &&
              'function' == typeof i[e].setValueAtTime &&
              i[e].setValueAtTime(n, t.currentTime);
          }
          function s(t) {
            !(function (t) {
              let e = null;
              for (var n = 4500; 5e3 > n; n++) {
                var i = t.renderedBuffer.getChannelData(0)[n];
                e += Math.abs(i);
              }
              (r = e.toString()), 'function' == typeof o && o(r);
            })(t),
              i.disconnect();
          }
          return {
            run: function (r, u = !1) {
              o = r;
              try {
                (function () {
                  let e = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                  t = new e(1, 44100, 44100);
                })(),
                  (e = t.currentTime),
                  ((n = t.createOscillator()).type = 'triangle'),
                  n.frequency.setValueAtTime(1e4, e),
                  (i = t.createDynamicsCompressor()),
                  a('threshold', -50),
                  a('knee', 40),
                  a('ratio', 12),
                  a('reduction', -20),
                  a('attack', 0),
                  a('release', 0.25),
                  n.connect(i),
                  i.connect(t.destination),
                  n.start(0),
                  t.startRendering(),
                  (t.oncomplete = s);
              } catch (t) {
                if (u) throw t;
              }
            },
          };
        })();
      return (
        (t.getCurrentBrowserFingerPrint = function () {
          const t = new Promise((t, e) => {
            i.run(function (e) {
              t(e);
            });
          });
          return new Promise((i, r) => {
            t.then(async (t) => {
              let r = '';
              navigator.brave && (await navigator.brave.isBrave()),
                (r = window.btoa(t) + n()),
                i(e(r, 0));
            }).catch(() => {
              try {
                i(e(n()).toString());
              } catch (t) {
                r('Failed to generate the finger print of this browser');
              }
            });
          });
        }),
        Object.defineProperty(t, '__esModule', { value: !0 }),
        t
      );
    })({})),
    (function (t) {
      'use strict';
      var e,
        n,
        i = function (t, e) {
          var n = 'function' == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var i,
            r,
            o = n.call(t),
            a = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = o.next()).done; ) a.push(i.value);
          } catch (t) {
            r = { error: t };
          } finally {
            try {
              i && !i.done && (n = o.return) && n.call(o);
            } finally {
              if (r) throw r.error;
            }
          }
          return a;
        },
        r = function (t, e, n) {
          if (n || 2 === arguments.length)
            for (var i, r = 0, o = e.length; r < o; r++)
              (!i && r in e) || (i || (i = Array.prototype.slice.call(e, 0, r)), (i[r] = e[r]));
          return t.concat(i || Array.prototype.slice.call(e));
        },
        o = new WeakMap(),
        a = new WeakMap(),
        s = new WeakMap(),
        u = new WeakMap(),
        c = new WeakMap(),
        l = {
          get: function (t, e, n) {
            if (t instanceof IDBTransaction) {
              if ('done' === e) return a.get(t);
              if ('objectStoreNames' === e) return t.objectStoreNames || s.get(t);
              if ('store' === e)
                return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
            }
            return f(t[e]);
          },
          set: function (t, e, n) {
            return (t[e] = n), !0;
          },
          has: function (t, e) {
            return (t instanceof IDBTransaction && ('done' === e || 'store' === e)) || e in t;
          },
        };
      function d(t) {
        return t !== IDBDatabase.prototype.transaction ||
          'objectStoreNames' in IDBTransaction.prototype
          ? (
              n ||
              (n = [
                IDBCursor.prototype.advance,
                IDBCursor.prototype.continue,
                IDBCursor.prototype.continuePrimaryKey,
              ])
            ).includes(t)
            ? function () {
                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                return t.apply(g(this), e), f(o.get(this));
              }
            : function () {
                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                return f(t.apply(g(this), e));
              }
          : function (e) {
              for (var n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
              var a = t.call.apply(t, r([g(this), e], i(n), !1));
              return s.set(a, e.sort ? e.sort() : [e]), f(a);
            };
      }
      function h(t) {
        return 'function' == typeof t
          ? d(t)
          : (t instanceof IDBTransaction &&
              (function (t) {
                if (!a.has(t)) {
                  var e = new Promise(function (e, n) {
                    var i = function () {
                        t.removeEventListener('complete', r),
                          t.removeEventListener('error', o),
                          t.removeEventListener('abort', o);
                      },
                      r = function () {
                        e(), i();
                      },
                      o = function () {
                        n(t.error || new DOMException('AbortError', 'AbortError')), i();
                      };
                    t.addEventListener('complete', r),
                      t.addEventListener('error', o),
                      t.addEventListener('abort', o);
                  });
                  a.set(t, e);
                }
              })(t),
            (n = t),
            (e || (e = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some(
              function (t) {
                return n instanceof t;
              },
            )
              ? new Proxy(t, l)
              : t);
        var n;
      }
      function f(t) {
        if (t instanceof IDBRequest)
          return (
            (e = t),
            (n = new Promise(function (t, n) {
              var i = function () {
                  e.removeEventListener('success', r), e.removeEventListener('error', o);
                },
                r = function () {
                  t(f(e.result)), i();
                },
                o = function () {
                  n(e.error), i();
                };
              e.addEventListener('success', r), e.addEventListener('error', o);
            }))
              .then(function (t) {
                t instanceof IDBCursor && o.set(t, e);
              })
              .catch(function () {}),
            c.set(n, e),
            n
          );
        var e, n;
        if (u.has(t)) return u.get(t);
        var i = h(t);
        return i !== t && (u.set(t, i), c.set(i, t)), i;
      }
      var g = function (t) {
          return c.get(t);
        },
        p = function () {
          return (p =
            Object.assign ||
            function (t) {
              for (var e, n = 1, i = arguments.length; n < i; n++)
                for (var r in (e = arguments[n]))
                  Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
              return t;
            }).apply(this, arguments);
        },
        v = function (t, e, n, i) {
          return new (n || (n = Promise))(function (r, o) {
            function a(t) {
              try {
                u(i.next(t));
              } catch (t) {
                o(t);
              }
            }
            function s(t) {
              try {
                u(i.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(t) {
              var e;
              t.done
                ? r(t.value)
                : ((e = t.value),
                  e instanceof n
                    ? e
                    : new n(function (t) {
                        t(e);
                      })).then(a, s);
            }
            u((i = i.apply(t, e || [])).next());
          });
        },
        _ = function (t, e) {
          var n,
            i,
            r,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & r[0]) throw r[1];
                return r[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function s(o) {
            return function (s) {
              return (function (o) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; a; )
                  try {
                    if (
                      ((n = 1),
                      i &&
                        (r =
                          2 & o[0]
                            ? i.return
                            : o[0]
                              ? i.throw || ((r = i.return) && r.call(i), 0)
                              : i.next) &&
                        !(r = r.call(i, o[1])).done)
                    )
                      return r;
                    switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                      case 0:
                      case 1:
                        r = o;
                        break;
                      case 4:
                        return a.label++, { value: o[1], done: !1 };
                      case 5:
                        a.label++, (i = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(
                            (r = (r = a.trys).length > 0 && r[r.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0])
                          )
                        ) {
                          a = 0;
                          continue;
                        }
                        if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                          a.label = o[1];
                          break;
                        }
                        if (6 === o[0] && a.label < r[1]) {
                          (a.label = r[1]), (r = o);
                          break;
                        }
                        if (r && a.label < r[2]) {
                          (a.label = r[2]), a.ops.push(o);
                          break;
                        }
                        r[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    o = e.call(t, a);
                  } catch (t) {
                    (o = [6, t]), (i = 0);
                  } finally {
                    n = r = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, s]);
            };
          }
        },
        m = function (t, e) {
          var n = 'function' == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var i,
            r,
            o = n.call(t),
            a = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = o.next()).done; ) a.push(i.value);
          } catch (t) {
            r = { error: t };
          } finally {
            try {
              i && !i.done && (n = o.return) && n.call(o);
            } finally {
              if (r) throw r.error;
            }
          }
          return a;
        },
        b = function (t, e, n) {
          if (n || 2 === arguments.length)
            for (var i, r = 0, o = e.length; r < o; r++)
              (!i && r in e) || (i || (i = Array.prototype.slice.call(e, 0, r)), (i[r] = e[r]));
          return t.concat(i || Array.prototype.slice.call(e));
        },
        y = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
        E = ['put', 'add', 'delete', 'clear'],
        w = new Map();
      function S(t, e) {
        if (t instanceof IDBDatabase && !(e in t) && 'string' == typeof e) {
          if (w.get(e)) return w.get(e);
          var n = e.replace(/FromIndex$/, ''),
            i = e !== n,
            r = E.includes(n);
          if (n in (i ? IDBIndex : IDBObjectStore).prototype && (r || y.includes(n))) {
            var o = function (t) {
              for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
              return v(this, void 0, void 0, function () {
                var o, a, s;
                return _(this, function (u) {
                  switch (u.label) {
                    case 0:
                      return (
                        (o = this.transaction(t, r ? 'readwrite' : 'readonly')),
                        (a = o.store),
                        i && (a = a.index(e.shift())),
                        [4, Promise.all([(s = a)[n].apply(s, b([], m(e), !1)), r && o.done])]
                      );
                    case 1:
                      return [2, u.sent()[0]];
                  }
                });
              });
            };
            return w.set(e, o), o;
          }
        }
      }
      (l = (function (t) {
        return p(p({}, t), {
          get: function (e, n, i) {
            return S(e, n) || t.get(e, n, i);
          },
          has: function (e, n) {
            return !!S(e, n) || t.has(e, n);
          },
        });
      })(l)),
        (t.deleteDB = function (t, e) {
          var n = (void 0 === e ? {} : e).blocked,
            i = indexedDB.deleteDatabase(t);
          return (
            n &&
              i.addEventListener('blocked', function (t) {
                return n(t.oldVersion, t);
              }),
            f(i).then(function () {})
          );
        }),
        (t.openDB = function (t, e, n) {
          var i = void 0 === n ? {} : n,
            r = i.blocked,
            o = i.upgrade,
            a = i.blocking,
            s = i.terminated,
            u = indexedDB.open(t, e),
            c = f(u);
          return (
            o &&
              u.addEventListener('upgradeneeded', function (t) {
                o(f(u.result), t.oldVersion, t.newVersion, f(u.transaction), t);
              }),
            r &&
              u.addEventListener('blocked', function (t) {
                return r(t.oldVersion, t.newVersion, t);
              }),
            c
              .then(function (t) {
                s &&
                  t.addEventListener('close', function () {
                    return s();
                  }),
                  a &&
                    t.addEventListener('versionchange', function (t) {
                      return a(t.oldVersion, t.newVersion, t);
                    });
              })
              .catch(function () {}),
            c
          );
        }),
        (t.unwrap = g),
        (t.wrap = f);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      function e(t, n) {
        var i;
        (n = n || {}),
          (this._id = e._generateUUID()),
          (this._promise = n.promise || Promise),
          (this._frameId = n.frameId || 'CrossStorageClient-' + this._id),
          (this._origin = e._getOrigin(t)),
          (this._requests = {}),
          (this._connected = !1),
          (this._closed = !1),
          (this._count = 0),
          (this._timeout = n.timeout || 5e3),
          (this._listener = null),
          this._installListener(),
          n.frameId && (i = document.getElementById(n.frameId)),
          i && this._poll(),
          (i = i || this._createFrame(t)),
          (this._hub = i.contentWindow);
      }
      (e.frameStyle = {
        width: 0,
        height: 0,
        border: 'none',
        display: 'none',
        position: 'absolute',
        top: '-999px',
        left: '-999px',
      }),
        (e._getOrigin = function (t) {
          var e;
          return (
            ((e = document.createElement('a')).href = t),
            e.host || (e = window.location),
            (
              (e.protocol && ':' !== e.protocol ? e.protocol : window.location.protocol) +
              '//' +
              e.host
            ).replace(/:80$|:443$/, '')
          );
        }),
        (e._generateUUID = function () {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
            var e = (16 * Math.random()) | 0;
            return ('x' == t ? e : (3 & e) | 8).toString(16);
          });
        }),
        (e.prototype.onConnect = function () {
          var t = this;
          return this._connected
            ? this._promise.resolve()
            : this._closed
              ? this._promise.reject(new Error('CrossStorageClient has closed'))
              : (this._requests.connect || (this._requests.connect = []),
                new this._promise(function (e, n) {
                  var i = setTimeout(function () {
                    n(new Error('CrossStorageClient could not connect'));
                  }, t._timeout);
                  t._requests.connect.push(function (t) {
                    if ((clearTimeout(i), t)) return n(t);
                    e();
                  });
                }));
        }),
        (e.prototype.set = function (t, e) {
          return this._request('set', { key: t, value: e });
        }),
        (e.prototype.getSignedPayload = function (t, e) {
          return this._request('getSignedData', { payload: t, deviceId: e });
        }),
        (e.prototype.getDeviceDetails = function (t) {
          return this._request('getDeviceDetails', { deviceName: t });
        }),
        (e.prototype.setDeviceDetails = function (t, e) {
          return this._request('setDeviceDetails', { deviceName: t, deviceId: e });
        }),
        (e.prototype.get = function (t) {
          var e = Array.prototype.slice.call(arguments);
          return this._request('get', { keys: e });
        }),
        (e.prototype.del = function () {
          var t = Array.prototype.slice.call(arguments);
          return this._request('del', { keys: t });
        }),
        (e.prototype.clear = function () {
          return this._request('clear');
        }),
        (e.prototype.getKeys = function () {
          return this._request('getKeys');
        }),
        (e.prototype.close = function (t) {
          const e = this._frameId,
            n = this;
          this._request('close')
            .catch(function (t) {})
            .finally(function () {
              try {
                var i = document.getElementById(e);
                i && !t && i.parentNode.removeChild(i),
                  window.removeEventListener
                    ? window.removeEventListener('message', n._listener, !1)
                    : window.detachEvent('onmessage', n._listener),
                  (n._connected = !1),
                  (n._closed = !0);
              } catch (t) {}
            });
        }),
        (e.prototype._installListener = function () {
          var t = this;
          (this._listener = function (e) {
            var n, i, r;
            if (
              !t._closed &&
              e.data &&
              'string' == typeof e.data &&
              ('null' === e.origin ? 'file://' : e.origin) === t._origin
            )
              if ('cross-storage:unavailable' !== e.data) {
                if (-1 !== e.data.indexOf('cross-storage:') && !t._connected) {
                  if (((t._connected = !0), !t._requests.connect)) return;
                  for (n = 0; n < t._requests.connect.length; n++) t._requests.connect[n](i);
                  delete t._requests.connect;
                }
                if ('cross-storage:ready' !== e.data) {
                  try {
                    r = JSON.parse(e.data);
                  } catch (t) {
                    return;
                  }
                  r.id && t._requests[r.id] && t._requests[r.id](r.error, r.result);
                }
              } else {
                if ((t._closed || t.close(), !t._requests.connect)) return;
                for (
                  i = new Error('Closing client. Could not access localStorage in hub.'), n = 0;
                  n < t._requests.connect.length;
                  n++
                )
                  t._requests.connect[n](i);
              }
          }),
            window.addEventListener
              ? window.addEventListener('message', this._listener, !1)
              : window.attachEvent('onmessage', this._listener);
        }),
        (e.prototype._poll = function () {
          var t, e, n;
          (n = 'file://' === (t = this)._origin ? '*' : t._origin),
            (e = setInterval(function () {
              if (t._connected) return clearInterval(e);
              t._hub && t._hub.postMessage('cross-storage:poll', n);
            }, 1e3));
        }),
        (e.prototype._createFrame = function (t) {
          var n, i;
          for (i in (((n = window.document.createElement('iframe')).id = this._frameId),
          e.frameStyle))
            e.frameStyle.hasOwnProperty(i) && (n.style[i] = e.frameStyle[i]);
          return window.document.body.appendChild(n), (n.src = t), n;
        }),
        (e.prototype._request = function (t, e) {
          var n, i;
          return this._closed
            ? this._promise.reject(new Error('CrossStorageClient has closed'))
            : ((i = this)._count++,
              (n = { id: this._id + ':' + i._count, method: 'cross-storage:' + t, params: e }),
              new this._promise(function (t, e) {
                var r, o, a;
                (r = setTimeout(function () {
                  i._requests[n.id] &&
                    (delete i._requests[n.id],
                    e(new Error('Timeout: could not perform ' + n.method)));
                }, i._timeout)),
                  (i._requests[n.id] = function (o, a) {
                    if ((clearTimeout(r), delete i._requests[n.id], o)) return e(new Error(o));
                    t(a);
                  }),
                  Array.prototype.toJSON &&
                    ((o = Array.prototype.toJSON), (Array.prototype.toJSON = null)),
                  (a = 'file://' === i._origin ? '*' : i._origin),
                  i._hub.postMessage(JSON.stringify(n), a),
                  o && (Array.prototype.toJSON = o);
              }));
        }),
        (t.CrossStorageClient = e);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function () {
      'use strict';
      'function' != typeof Object.assign &&
        Object.defineProperty(Object, 'assign', {
          value: function (t, e) {
            if (null === t || void 0 === t)
              throw new TypeError('Cannot convert undefined or null to object');
            for (var n = Object(t), i = 1; i < arguments.length; i++) {
              var r = arguments[i];
              if (null !== r && void 0 !== r)
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
            }
            return n;
          },
          writable: !0,
          configurable: !0,
        });
    })(),
    Array.from ||
      (Array.from = (function () {
        var t = Object.prototype.toString,
          e = function (e) {
            return 'function' == typeof e || '[object Function]' === t.call(e);
          },
          n = Math.pow(2, 53) - 1,
          i = function (t) {
            var e = (function (t) {
              var e = Number(t);
              return isNaN(e)
                ? 0
                : 0 !== e && isFinite(e)
                  ? (e > 0 ? 1 : -1) * Math.floor(Math.abs(e))
                  : e;
            })(t);
            return Math.min(Math.max(e, 0), n);
          };
        return function (t) {
          var n = Object(t);
          if (null == t)
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          var r,
            o = arguments.length > 1 ? arguments[1] : void 0;
          if (void 0 !== o) {
            if (!e(o))
              throw new TypeError(
                'Array.from: when provided, the second argument must be a function',
              );
            arguments.length > 2 && (r = arguments[2]);
          }
          for (
            var a, s = i(n.length), u = e(this) ? Object(new this(s)) : new Array(s), c = 0;
            c < s;

          )
            (a = n[c]), (u[c] = o ? (void 0 === r ? o(a, c) : o.call(r, a, c)) : a), (c += 1);
          return (u.length = s), u;
        };
      })()),
    (function () {
      'use strict';
      String.prototype.endsWith ||
        (String.prototype.endsWith = function (t, e) {
          return (
            (void 0 === e || e > this.length) && (e = this.length),
            this.substring(e - t.length, e) === t
          );
        });
    })(),
    (function () {
      'use strict';
      Promise.allSettled =
        Promise.allSettled ||
        function (t) {
          return Promise.all(
            t.map(function (t) {
              return t
                .then(function (t) {
                  return { status: 'fulfilled', value: t };
                })
                .catch(function (t) {
                  return { status: 'rejected', reason: t };
                });
            }),
          );
        };
    })(),
    (function (t, e) {
      'use strict';
      var n,
        i = 500,
        r = 'user-agent',
        o = '',
        a = 'function',
        s = 'undefined',
        u = 'object',
        c = 'string',
        l = 'browser',
        d = 'cpu',
        h = 'device',
        f = 'engine',
        g = 'os',
        p = 'result',
        v = 'name',
        _ = 'type',
        m = 'vendor',
        b = 'version',
        y = 'architecture',
        E = 'major',
        w = 'model',
        S = 'mobile',
        O = 'tablet',
        I = 'smarttv',
        T = 'brands',
        A = 'formFactors',
        P = 'fullVersionList',
        C = 'platform',
        L = 'platformVersion',
        D = 'bitness',
        x = 'sec-ch-ua',
        M = x + '-full-version-list',
        R = x + '-arch',
        U = x + '-' + D,
        k = x + '-form-factors',
        N = x + '-' + S,
        B = x + '-' + w,
        F = x + '-' + C,
        H = F + '-version',
        V = [T, P, S, w, C, L, y, A, D],
        G = 'Chromium',
        j = 'Windows',
        W = typeof window !== s && window.navigator ? window.navigator : e,
        K = W && W.userAgentData ? W.userAgentData : e,
        z = function (t, e) {
          var n = {},
            i = e;
          if (!q(e))
            for (var r in ((i = {}), e))
              for (var o in e[r]) i[o] = e[r][o].concat(i[o] ? i[o] : []);
          for (var a in t) n[a] = i[a] && i[a].length % 2 == 0 ? i[a].concat(t[a]) : t[a];
          return n;
        },
        Y = function (t) {
          for (var e = {}, n = 0; n < t.length; n++) e[t[n].toUpperCase()] = t[n];
          return e;
        },
        X = function (t, e) {
          if (typeof t === u && t.length > 0) {
            for (var n in t) if (Q(t[n]) == Q(e)) return !0;
            return !1;
          }
          return !!J(t) && -1 !== Q(e).indexOf(Q(t));
        },
        q = function (t, e) {
          for (var n in t) return /^(browser|cpu|device|engine|os)$/.test(n) || (!!e && q(t[n]));
        },
        J = function (t) {
          return typeof t === c;
        },
        Z = function (t) {
          if (!t) return e;
          for (var n = [], i = et(/\\?\"/g, t).split(','), r = 0; r < i.length; r++)
            if (i[r].indexOf(';') > -1) {
              var o = it(i[r]).split(';v=');
              n[r] = { brand: o[0], version: o[1] };
            } else n[r] = it(i[r]);
          return n;
        },
        Q = function (t) {
          return J(t) ? t.toLowerCase() : t;
        },
        $ = function (t) {
          return J(t) ? et(/[^\d\.]/g, t).split('.')[0] : e;
        },
        tt = function (t) {
          for (var n in t) {
            var i = t[n];
            typeof i == u && 2 == i.length ? (this[i[0]] = i[1]) : (this[i] = e);
          }
          return this;
        },
        et = function (t, e) {
          return J(e) ? e.replace(t, o) : e;
        },
        nt = function (t) {
          return et(/\\?\"/g, t);
        },
        it = function (t, e) {
          if (J(t)) return (t = et(/^\s\s*/, t)), typeof e === s ? t : t.substring(0, i);
        },
        rt = function (t, n) {
          if (t && n)
            for (var i, r, o, s, c, l, d = 0; d < n.length && !c; ) {
              var h = n[d],
                f = n[d + 1];
              for (i = r = 0; i < h.length && !c && h[i]; )
                if ((c = h[i++].exec(t)))
                  for (o = 0; o < f.length; o++)
                    (l = c[++r]),
                      typeof (s = f[o]) === u && s.length > 0
                        ? 2 === s.length
                          ? typeof s[1] == a
                            ? (this[s[0]] = s[1].call(this, l))
                            : (this[s[0]] = s[1])
                          : 3 === s.length
                            ? typeof s[1] !== a || (s[1].exec && s[1].test)
                              ? (this[s[0]] = l ? l.replace(s[1], s[2]) : e)
                              : (this[s[0]] = l ? s[1].call(this, l, s[2]) : e)
                            : 4 === s.length &&
                              (this[s[0]] = l ? s[3].call(this, l.replace(s[1], s[2])) : e)
                        : (this[s] = l || e);
              d += 2;
            }
        },
        ot = function (t, n) {
          for (var i in n)
            if (typeof n[i] === u && n[i].length > 0) {
              for (var r = 0; r < n[i].length; r++) if (X(n[i][r], t)) return '?' === i ? e : i;
            } else if (X(n[i], t)) return '?' === i ? e : i;
          return n.hasOwnProperty('*') ? n['*'] : t;
        },
        at = {
          ME: '4.90',
          'NT 3.11': 'NT3.51',
          'NT 4.0': 'NT4.0',
          2000: 'NT 5.0',
          XP: ['NT 5.1', 'NT 5.2'],
          Vista: 'NT 6.0',
          7: 'NT 6.1',
          8: 'NT 6.2',
          8.1: 'NT 6.3',
          10: ['NT 6.4', 'NT 10.0'],
          RT: 'ARM',
        },
        st = {
          embedded: 'Automotive',
          mobile: 'Mobile',
          tablet: ['Tablet', 'EInk'],
          smarttv: 'TV',
          wearable: 'Watch',
          xr: ['VR', 'XR'],
          '?': ['Desktop', 'Unknown'],
          '*': e,
        },
        ut = {
          browser: [
            [/\b(?:crmo|crios)\/([\w\.]+)/i],
            [b, [v, 'Mobile Chrome']],
            [/edg(?:e|ios|a)?\/([\w\.]+)/i],
            [b, [v, 'Edge']],
            [
              /(opera mini)\/([-\w\.]+)/i,
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
            ],
            [v, b],
            [/opios[\/ ]+([\w\.]+)/i],
            [b, [v, 'Opera Mini']],
            [/\bop(?:rg)?x\/([\w\.]+)/i],
            [b, [v, 'Opera GX']],
            [/\bopr\/([\w\.]+)/i],
            [b, [v, 'Opera']],
            [/\bb[a]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
            [b, [v, 'Baidu']],
            [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
            [b, [v, 'Maxthon']],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
              /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
              /(?:ms|\()(ie) ([\w\.]+)/i,
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
              /(heytap|ovi|115)browser\/([\d\.]+)/i,
              /(weibo)__([\d\.]+)/i,
            ],
            [v, b],
            [/quark(?:pc)?\/([-\w\.]+)/i],
            [b, [v, 'Quark']],
            [/\bddg\/([\w\.]+)/i],
            [b, [v, 'DuckDuckGo']],
            [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
            [b, [v, 'UCBrowser']],
            [
              /microm.+\bqbcore\/([\w\.]+)/i,
              /\bqbcore\/([\w\.]+).+microm/i,
              /micromessenger\/([\w\.]+)/i,
            ],
            [b, [v, 'WeChat']],
            [/konqueror\/([\w\.]+)/i],
            [b, [v, 'Konqueror']],
            [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
            [b, [v, 'IE']],
            [/ya(?:search)?browser\/([\w\.]+)/i],
            [b, [v, 'Yandex']],
            [/slbrowser\/([\w\.]+)/i],
            [b, [v, 'Smart Lenovo Browser']],
            [/(avast|avg)\/([\w\.]+)/i],
            [[v, /(.+)/, '$1 Secure Browser'], b],
            [/\bfocus\/([\w\.]+)/i],
            [b, [v, 'Firefox Focus']],
            [/\bopt\/([\w\.]+)/i],
            [b, [v, 'Opera Touch']],
            [/coc_coc\w+\/([\w\.]+)/i],
            [b, [v, 'Coc Coc']],
            [/dolfin\/([\w\.]+)/i],
            [b, [v, 'Dolphin']],
            [/coast\/([\w\.]+)/i],
            [b, [v, 'Opera Coast']],
            [/miuibrowser\/([\w\.]+)/i],
            [b, [v, 'MIUI Browser']],
            [/fxios\/([\w\.-]+)/i],
            [b, [v, 'Mobile Firefox']],
            [/\bqihoobrowser\/?([\w\.]*)/i],
            [b, [v, '360']],
            [/\b(qq)\/([\w\.]+)/i],
            [[v, /(.+)/, '$1Browser'], b],
            [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
            [[v, /(.+)/, '$1 Browser'], b],
            [/samsungbrowser\/([\w\.]+)/i],
            [b, [v, 'Samsung Internet']],
            [/metasr[\/ ]?([\d\.]+)/i],
            [b, [v, 'Sogou Explorer']],
            [/(sogou)mo\w+\/([\d\.]+)/i],
            [[v, 'Sogou Mobile'], b],
            [
              /(electron)\/([\w\.]+) safari/i,
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i,
            ],
            [v, b],
            [/(lbbrowser|rekonq)/i],
            [v],
            [/ome\/([\w\.]+) \w* ?(iron) saf/i, /ome\/([\w\.]+).+qihu (360)[es]e/i],
            [b, v],
            [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
            [[v, 'Facebook'], b, [_, 'inapp']],
            [
              /(Klarna)\/([\w\.]+)/i,
              /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
              /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
              /(daum)apps[\/ ]([\w\.]+)/i,
              /safari (line)\/([\w\.]+)/i,
              /\b(line)\/([\w\.]+)\/iab/i,
              /(alipay)client\/([\w\.]+)/i,
              /(twitter)(?:and| f.+e\/([\w\.]+))/i,
              /(instagram|snapchat)[\/ ]([-\w\.]+)/i,
            ],
            [v, b, [_, 'inapp']],
            [/\bgsa\/([\w\.]+) .*safari\//i],
            [b, [v, 'GSA'], [_, 'inapp']],
            [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
            [b, [v, 'TikTok'], [_, 'inapp']],
            [/\[(linkedin)app\]/i],
            [v, [_, 'inapp']],
            [/(chromium)[\/ ]([-\w\.]+)/i],
            [v, b],
            [/headlesschrome(?:\/([\w\.]+)| )/i],
            [b, [v, 'Chrome Headless']],
            [/ wv\).+(chrome)\/([\w\.]+)/i],
            [[v, 'Chrome WebView'], b],
            [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
            [b, [v, 'Android Browser']],
            [/chrome\/([\w\.]+) mobile/i],
            [b, [v, 'Mobile Chrome']],
            [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
            [v, b],
            [/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i],
            [b, [v, 'Mobile Safari']],
            [/iphone .*mobile(?:\/\w+ | ?)safari/i],
            [[v, 'Mobile Safari']],
            [/version\/([\w\.\,]+) .*(safari)/i],
            [b, v],
            [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
            [v, [b, '1']],
            [/(webkit|khtml)\/([\w\.]+)/i],
            [v, b],
            [/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i],
            [[v, 'Mobile Firefox'], b],
            [/(navigator|netscape\d?)\/([-\w\.]+)/i],
            [[v, 'Netscape'], b],
            [/(wolvic|librewolf)\/([\w\.]+)/i],
            [v, b],
            [/mobile vr; rv:([\w\.]+)\).+firefox/i],
            [b, [v, 'Firefox Reality']],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              /(firefox)\/([\w\.]+)/i,
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              /\b(links) \(([\w\.]+)/i,
            ],
            [v, [b, /_/g, '.']],
            [/(cobalt)\/([\w\.]+)/i],
            [v, [b, /[^\d\.]+./, o]],
          ],
          cpu: [
            [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
            [[y, 'amd64']],
            [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
            [[y, 'ia32']],
            [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
            [[y, 'arm64']],
            [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
            [[y, 'armhf']],
            [/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],
            [[y, 'arm']],
            [/((ppc|powerpc)(64)?)( mac|;|\))/i],
            [[y, /ower/, o, Q]],
            [/ sun4\w[;\)]/i],
            [[y, 'sparc']],
            [
              /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
            ],
            [[y, Q]],
          ],
          device: [
            [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
            [w, [m, 'Samsung'], [_, O]],
            [
              /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]((?!sm-[lr])[-\w]+)/i,
              /sec-(sgh\w+)/i,
            ],
            [w, [m, 'Samsung'], [_, S]],
            [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
            [w, [m, 'Apple'], [_, S]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
            ],
            [w, [m, 'Apple'], [_, O]],
            [/(macintosh);/i],
            [w, [m, 'Apple']],
            [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
            [w, [m, 'Sharp'], [_, S]],
            [
              /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i,
            ],
            [w, [m, 'Honor'], [_, O]],
            [/honor([-\w ]+)[;\)]/i],
            [w, [m, 'Honor'], [_, S]],
            [
              /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i,
            ],
            [w, [m, 'Huawei'], [_, O]],
            [
              /(?:huawei)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
            ],
            [w, [m, 'Huawei'], [_, S]],
            [
              /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
              /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
            ],
            [
              [w, /_/g, ' '],
              [m, 'Xiaomi'],
              [_, O],
            ],
            [
              /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
              /\b; (\w+) build\/hm\1/i,
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,
              / ([\w ]+) miui\/v?\d/i,
            ],
            [
              [w, /_/g, ' '],
              [m, 'Xiaomi'],
              [_, S],
            ],
            [
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
            ],
            [w, [m, 'OPPO'], [_, S]],
            [/\b(opd2(\d{3}a?))(?: bui|\))/i],
            [w, [m, ot, { OnePlus: ['304', '403', '203'], '*': 'OPPO' }], [_, O]],
            [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
            [w, [m, 'Vivo'], [_, S]],
            [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
            [w, [m, 'Realme'], [_, S]],
            [
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
            ],
            [w, [m, 'Motorola'], [_, S]],
            [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
            [w, [m, 'Motorola'], [_, O]],
            [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
            [w, [m, 'LG'], [_, O]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
              /\blg-?([\d\w]+) bui/i,
            ],
            [w, [m, 'LG'], [_, S]],
            [
              /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
              /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
            ],
            [w, [m, 'Lenovo'], [_, O]],
            [/(nokia) (t[12][01])/i],
            [m, w, [_, O]],
            [/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w\. ]*))/i],
            [
              [w, /_/g, ' '],
              [_, S],
              [m, 'Nokia'],
            ],
            [/(pixel (c|tablet))\b/i],
            [w, [m, 'Google'], [_, O]],
            [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
            [w, [m, 'Google'], [_, S]],
            [
              /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
            ],
            [w, [m, 'Sony'], [_, S]],
            [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
            [
              [w, 'Xperia Tablet'],
              [m, 'Sony'],
              [_, O],
            ],
            [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
            [w, [m, 'OnePlus'], [_, S]],
            [
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
              /(kf[a-z]+)( bui|\)).+silk\//i,
            ],
            [w, [m, 'Amazon'], [_, O]],
            [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
            [
              [w, /(.+)/g, 'Fire Phone $1'],
              [m, 'Amazon'],
              [_, S],
            ],
            [/(playbook);[-\w\),; ]+(rim)/i],
            [w, m, [_, O]],
            [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
            [w, [m, 'BlackBerry'], [_, S]],
            [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
            [w, [m, 'ASUS'], [_, O]],
            [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
            [w, [m, 'ASUS'], [_, S]],
            [/(nexus 9)/i],
            [w, [m, 'HTC'], [_, O]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
            ],
            [m, [w, /_/g, ' '], [_, S]],
            [
              /tcl (xess p17aa)/i,
              /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i,
            ],
            [w, [m, 'TCL'], [_, O]],
            [
              /droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i,
            ],
            [w, [m, 'TCL'], [_, S]],
            [/(itel) ((\w+))/i],
            [[m, Q], w, [_, ot, { tablet: ['p10001l', 'w7001'], '*': 'mobile' }]],
            [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
            [w, [m, 'Acer'], [_, O]],
            [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
            [w, [m, 'Meizu'], [_, S]],
            [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
            [w, [m, 'Ulefone'], [_, S]],
            [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
            [w, [m, 'Energizer'], [_, S]],
            [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
            [w, [m, 'Cat'], [_, S]],
            [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
            [w, [m, 'Smartfren'], [_, S]],
            [/droid.+; (a(?:015|06[35]|142p?))/i],
            [w, [m, 'Nothing'], [_, S]],
            [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i],
            [m, w, [_, O]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
              /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
              /(hp) ([\w ]+\w)/i,
              /(microsoft); (lumia[\w ]+)/i,
              /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
              /(oppo) ?([\w ]+) bui/i,
            ],
            [m, w, [_, S]],
            [
              /(kobo)\s(ereader|touch)/i,
              /(archos) (gamepad2?)/i,
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              /(kindle)\/([\w\.]+)/i,
            ],
            [m, w, [_, O]],
            [/(surface duo)/i],
            [w, [m, 'Microsoft'], [_, O]],
            [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
            [w, [m, 'Fairphone'], [_, S]],
            [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
            [w, [m, 'Nvidia'], [_, O]],
            [/(sprint) (\w+)/i],
            [m, w, [_, S]],
            [/(kin\.[onetw]{3})/i],
            [
              [w, /\./g, ' '],
              [m, 'Microsoft'],
              [_, S],
            ],
            [/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
            [w, [m, 'Zebra'], [_, O]],
            [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
            [w, [m, 'Zebra'], [_, S]],
            [/smart-tv.+(samsung)/i],
            [m, [_, I]],
            [/hbbtv.+maple;(\d+)/i],
            [
              [w, /^/, 'SmartTV'],
              [m, 'Samsung'],
              [_, I],
            ],
            [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
            [
              [m, 'LG'],
              [_, I],
            ],
            [/(apple) ?tv/i],
            [m, [w, 'Apple TV'], [_, I]],
            [/crkey.*devicetype\/chromecast/i],
            [
              [w, 'Chromecast Third Generation'],
              [m, 'Google'],
              [_, I],
            ],
            [/crkey.*devicetype\/([^/]*)/i],
            [
              [w, /^/, 'Chromecast '],
              [m, 'Google'],
              [_, I],
            ],
            [/fuchsia.*crkey/i],
            [
              [w, 'Chromecast Nest Hub'],
              [m, 'Google'],
              [_, I],
            ],
            [/crkey/i],
            [
              [w, 'Chromecast'],
              [m, 'Google'],
              [_, I],
            ],
            [/droid.+aft(\w+)( bui|\))/i],
            [w, [m, 'Amazon'], [_, I]],
            [/(shield \w+ tv)/i],
            [w, [m, 'Nvidia'], [_, I]],
            [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
            [w, [m, 'Sharp'], [_, I]],
            [/(bravia[\w ]+)( bui|\))/i],
            [w, [m, 'Sony'], [_, I]],
            [/(mi(tv|box)-?\w+) bui/i],
            [w, [m, 'Xiaomi'], [_, I]],
            [/Hbbtv.*(technisat) (.*);/i],
            [m, w, [_, I]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
            ],
            [
              [m, it],
              [w, it],
              [_, I],
            ],
            [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],
            [w, [_, I]],
            [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
            [[_, I]],
            [/(ouya)/i, /(nintendo) (\w+)/i],
            [m, w, [_, 'console']],
            [/droid.+; (shield)( bui|\))/i],
            [w, [m, 'Nvidia'], [_, 'console']],
            [/(playstation \w+)/i],
            [w, [m, 'Sony'], [_, 'console']],
            [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
            [w, [m, 'Microsoft'], [_, 'console']],
            [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
            [w, [m, 'Samsung'], [_, 'wearable']],
            [/((pebble))app/i, /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i],
            [m, w, [_, 'wearable']],
            [/(ow(?:19|20)?we?[1-3]{1,3})/i],
            [w, [m, 'OPPO'], [_, 'wearable']],
            [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
            [w, [m, 'Apple'], [_, 'wearable']],
            [/(opwwe\d{3})/i],
            [w, [m, 'OnePlus'], [_, 'wearable']],
            [/(moto 360)/i],
            [w, [m, 'Motorola'], [_, 'wearable']],
            [/(smartwatch 3)/i],
            [w, [m, 'Sony'], [_, 'wearable']],
            [/(g watch r)/i],
            [w, [m, 'LG'], [_, 'wearable']],
            [/droid.+; (wt63?0{2,3})\)/i],
            [w, [m, 'Zebra'], [_, 'wearable']],
            [/droid.+; (glass) \d/i],
            [w, [m, 'Google'], [_, 'xr']],
            [/(pico) (4|neo3(?: link|pro)?)/i],
            [m, w, [_, 'xr']],
            [/; (quest( \d| pro)?)/i],
            [w, [m, 'Facebook'], [_, 'xr']],
            [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
            [m, [_, 'embedded']],
            [/(aeobc)\b/i],
            [w, [m, 'Amazon'], [_, 'embedded']],
            [/(homepod).+mac os/i],
            [w, [m, 'Apple'], [_, 'embedded']],
            [/windows iot/i],
            [[_, 'embedded']],
            [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+?(mobile|vr|\d) safari/i],
            [w, [_, ot, { mobile: 'Mobile', xr: 'VR', '*': O }]],
            [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
            [[_, O]],
            [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
            [[_, S]],
            [/droid .+?; ([\w\. -]+)( bui|\))/i],
            [w, [m, 'Generic']],
          ],
          engine: [
            [/windows.+ edge\/([\w\.]+)/i],
            [b, [v, 'EdgeHTML']],
            [/(arkweb)\/([\w\.]+)/i],
            [v, b],
            [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
            [b, [v, 'Blink']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
              /ekioh(flow)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
              /\b(libweb)/i,
            ],
            [v, b],
            [/ladybird\//i],
            [[v, 'LibWeb']],
            [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
            [b, v],
          ],
          os: [
            [/microsoft (windows) (vista|xp)/i],
            [v, b],
            [/(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i],
            [v, [b, ot, at]],
            [
              /windows nt 6\.2; (arm)/i,
              /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
              /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
            ],
            [
              [b, ot, at],
              [v, j],
            ],
            [
              /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
              /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
              /cfnetwork\/.+darwin/i,
            ],
            [
              [b, /_/g, '.'],
              [v, 'iOS'],
            ],
            [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
            [
              [v, 'macOS'],
              [b, /_/g, '.'],
            ],
            [/android ([\d\.]+).*crkey/i],
            [b, [v, 'Chromecast Android']],
            [/fuchsia.*crkey\/([\d\.]+)/i],
            [b, [v, 'Chromecast Fuchsia']],
            [/crkey\/([\d\.]+).*devicetype\/smartspeaker/i],
            [b, [v, 'Chromecast SmartSpeaker']],
            [/linux.*crkey\/([\d\.]+)/i],
            [b, [v, 'Chromecast Linux']],
            [/crkey\/([\d\.]+)/i],
            [b, [v, 'Chromecast']],
            [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
            [b, v],
            [/(ubuntu) ([\w\.]+) like android/i],
            [[v, /(.+)/, '$1 Touch'], b],
            [
              /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i,
            ],
            [v, b],
            [/\(bb(10);/i],
            [b, [v, 'BlackBerry']],
            [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
            [b, [v, 'Symbian']],
            [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
            [b, [v, 'Firefox OS']],
            [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
            [b, [v, 'webOS']],
            [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
            [b, [v, 'watchOS']],
            [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
            [[v, 'Chrome OS'], b],
            [
              /panasonic;(viera)/i,
              /(netrange)mmh/i,
              /(nettv)\/(\d+\.[\w\.]+)/i,
              /(nintendo|playstation) (\w+)/i,
              /(xbox); +xbox ([^\);]+)/i,
              /(pico) .+os([\w\.]+)/i,
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              /(mint)[\/\(\) ]?(\w*)/i,
              /(mageia|vectorlinux)[; ]/i,
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              /(hurd|linux)(?: arm\w*| x86\w*| ?)([\w\.]*)/i,
              /(gnu) ?([\w\.]*)/i,
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              /(haiku) (\w+)/i,
            ],
            [v, b],
            [/(sunos) ?([\w\.\d]*)/i],
            [[v, 'Solaris'], b],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
              /(unix) ?([\w\.]*)/i,
            ],
            [v, b],
          ],
        },
        ct =
          ((n = { init: {}, isIgnore: {}, isIgnoreRgx: {}, toString: {} }),
          tt.call(n.init, [
            [l, [v, b, E, _]],
            [d, [y]],
            [h, [_, w, m]],
            [f, [v, b]],
            [g, [v, b]],
          ]),
          tt.call(n.isIgnore, [
            [l, [b, E]],
            [f, [b]],
            [g, [b]],
          ]),
          tt.call(n.isIgnoreRgx, [
            [l, / ?browser$/i],
            [g, / ?os$/i],
          ]),
          tt.call(n.toString, [
            [l, [v, b]],
            [d, [y]],
            [h, [m, w]],
            [f, [v, b]],
            [g, [v, b]],
          ]),
          n),
        lt = function (t, e) {
          var n = ct.init[e],
            i = ct.isIgnore[e] || 0,
            r = ct.isIgnoreRgx[e] || 0,
            a = ct.toString[e] || 0;
          function u() {
            tt.call(this, n);
          }
          return (
            (u.prototype.getItem = function () {
              return t;
            }),
            (u.prototype.withClientHints = function () {
              return K
                ? K.getHighEntropyValues(V).then(function (e) {
                    return t.setCH(new dt(e, !1)).parseCH().get();
                  })
                : t.parseCH().get();
            }),
            (u.prototype.withFeatureCheck = function () {
              return t.detectFeature().get();
            }),
            e != p &&
              ((u.prototype.is = function (t) {
                var e = !1;
                for (var n in this)
                  if (
                    this.hasOwnProperty(n) &&
                    !X(i, n) &&
                    Q(r ? et(r, this[n]) : this[n]) == Q(r ? et(r, t) : t)
                  ) {
                    if (((e = !0), t != s)) break;
                  } else if (t == s && e) {
                    e = !e;
                    break;
                  }
                return e;
              }),
              (u.prototype.toString = function () {
                var t = o;
                for (var e in a) typeof this[a[e]] !== s && (t += (t ? ' ' : o) + this[a[e]]);
                return t || s;
              })),
            K ||
              (u.prototype.then = function (t) {
                var e = this,
                  n = function () {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                  };
                n.prototype = { is: u.prototype.is, toString: u.prototype.toString };
                var i = new n();
                return t(i), i;
              }),
            new u()
          );
        };
      function dt(t, e) {
        if (((t = t || {}), tt.call(this, V), e))
          tt.call(this, [
            [T, Z(t[x])],
            [P, Z(t[M])],
            [S, /\?1/.test(t[N])],
            [w, nt(t[B])],
            [C, nt(t[F])],
            [L, nt(t[H])],
            [y, nt(t[R])],
            [A, Z(t[k])],
            [D, nt(t[U])],
          ]);
        else for (var n in t) this.hasOwnProperty(n) && typeof t[n] !== s && (this[n] = t[n]);
      }
      function ht(t, n, i, r) {
        return (
          (this.get = function (t) {
            return t ? (this.data.hasOwnProperty(t) ? this.data[t] : e) : this.data;
          }),
          (this.set = function (t, e) {
            return (this.data[t] = e), this;
          }),
          (this.setCH = function (t) {
            return (this.uaCH = t), this;
          }),
          (this.detectFeature = function () {
            if (W && W.userAgent == this.ua)
              switch (this.itemType) {
                case l:
                  W.brave && typeof W.brave.isBrave == a && this.set(v, 'Brave');
                  break;
                case h:
                  !this.get(_) && K && K[S] && this.set(_, S),
                    'Macintosh' == this.get(w) &&
                      W &&
                      typeof W.standalone !== s &&
                      W.maxTouchPoints &&
                      W.maxTouchPoints > 2 &&
                      this.set(w, 'iPad').set(_, O);
                  break;
                case g:
                  !this.get(v) && K && K[C] && this.set(v, K[C]);
                  break;
                case p:
                  var t = this.data,
                    e = function (e) {
                      return t[e].getItem().detectFeature().get();
                    };
                  this.set(l, e(l)).set(d, e(d)).set(h, e(h)).set(f, e(f)).set(g, e(g));
              }
            return this;
          }),
          (this.parseUA = function () {
            return (
              this.itemType != p && rt.call(this.data, this.ua, this.rgxMap),
              this.itemType == l && this.set(E, $(this.get(b))),
              this
            );
          }),
          (this.parseCH = function () {
            var t = this.uaCH,
              n = this.rgxMap;
            switch (this.itemType) {
              case l:
              case f:
                var i,
                  r = t[P] || t[T];
                if (r)
                  for (var o in r) {
                    var a = r[o].brand || r[o],
                      s = r[o].version;
                    this.itemType != l ||
                      /not.a.brand/i.test(a) ||
                      (i && (!/chrom/i.test(i) || a == G)) ||
                      ((a = ot(a, {
                        Chrome: 'Google Chrome',
                        Edge: 'Microsoft Edge',
                        'Chrome WebView': 'Android WebView',
                        'Chrome Headless': 'HeadlessChrome',
                      })),
                      this.set(v, a).set(b, s).set(E, $(s)),
                      (i = a)),
                      this.itemType == f && a == G && this.set(b, s);
                  }
                break;
              case d:
                var u = t[y];
                u && (u && '64' == t[D] && (u += '64'), rt.call(this.data, u + ';', n));
                break;
              case h:
                if (
                  (t[S] && this.set(_, S),
                  t[w] && (this.set(w, t[w]), !this.get(_) || !this.get(m)))
                ) {
                  var c = {};
                  rt.call(c, 'droid 9; ' + t[w] + ')', n),
                    !this.get(_) && c.type && this.set(_, c.type),
                    !this.get(m) && c.vendor && this.set(m, c.vendor);
                }
                if (t[A]) {
                  var O;
                  if ('string' != typeof t[A])
                    for (var I = 0; !O && I < t[A].length; ) O = ot(t[A][I++], st);
                  else O = ot(t[A], st);
                  this.set(_, O);
                }
                break;
              case g:
                var x = t[C];
                if (x) {
                  var M = t[L];
                  x == j && (M = parseInt($(M), 10) >= 13 ? '11' : '10'), this.set(v, x).set(b, M);
                }
                this.get(v) == j && 'Xbox' == t[w] && this.set(v, 'Xbox').set(b, e);
                break;
              case p:
                var R = this.data,
                  U = function (e) {
                    return R[e].getItem().setCH(t).parseCH().get();
                  };
                this.set(l, U(l)).set(d, U(d)).set(h, U(h)).set(f, U(f)).set(g, U(g));
            }
            return this;
          }),
          tt.call(this, [
            ['itemType', t],
            ['ua', n],
            ['uaCH', r],
            ['rgxMap', i],
            ['data', lt(this, t)],
          ]),
          this
        );
      }
      function ft(t, n, s) {
        if (
          (typeof t === u
            ? (q(t, !0) ? (typeof n === u && (s = n), (n = t)) : ((s = t), (n = e)), (t = e))
            : typeof t !== c || q(n, !0) || ((s = n), (n = e)),
          s && typeof s.append === a)
        ) {
          var v = {};
          s.forEach(function (t, e) {
            v[e] = t;
          }),
            (s = v);
        }
        if (!(this instanceof ft)) return new ft(t, n, s).getResult();
        var _ = typeof t === c ? t : s && s[r] ? s[r] : W && W.userAgent ? W.userAgent : o,
          m = new dt(s, !0),
          b = n ? z(ut, n) : ut,
          y = function (t) {
            return t == p
              ? function () {
                  return new ht(t, _, b, m)
                    .set('ua', _)
                    .set(l, this.getBrowser())
                    .set(d, this.getCPU())
                    .set(h, this.getDevice())
                    .set(f, this.getEngine())
                    .set(g, this.getOS())
                    .get();
                }
              : function () {
                  return new ht(t, _, b[t], m).parseUA().get();
                };
          };
        return (
          tt
            .call(this, [
              ['getBrowser', y(l)],
              ['getCPU', y(d)],
              ['getDevice', y(h)],
              ['getEngine', y(f)],
              ['getOS', y(g)],
              ['getResult', y(p)],
              [
                'getUA',
                function () {
                  return _;
                },
              ],
              [
                'setUA',
                function (t) {
                  return J(t) && (_ = t.length > i ? it(t, i) : t), this;
                },
              ],
            ])
            .setUA(_),
          this
        );
      }
      (ft.VERSION = '2.0.2'),
        (ft.BROWSER = Y([v, b, E, _])),
        (ft.CPU = Y([y])),
        (ft.DEVICE = Y([w, m, _, 'console', S, I, O, 'wearable', 'embedded'])),
        (ft.ENGINE = ft.OS = Y([v, b])),
        (t.UAParser = ft);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    ((_POSignalsEntities || (_POSignalsEntities = {})).evaluateModernizr = function () {
      !(function (t, e, n, i) {
        function r(t, e) {
          return typeof t === e;
        }
        function o() {
          return 'function' != typeof n.createElement
            ? n.createElement(arguments[0])
            : E
              ? n.createElementNS.call(n, 'http://www.w3.org/2000/svg', arguments[0])
              : n.createElement.apply(n, arguments);
        }
        function a(t, e) {
          return !!~('' + t).indexOf(e);
        }
        function s(t, e, i, r) {
          var a,
            s,
            u,
            c,
            l = 'modernizr',
            d = o('div'),
            h = (function () {
              var t = n.body;
              return t || ((t = o(E ? 'svg' : 'body')).fake = !0), t;
            })();
          if (parseInt(i, 10))
            for (; i--; ) ((u = o('div')).id = r ? r[i] : l + (i + 1)), d.appendChild(u);
          return (
            ((a = o('style')).type = 'text/css'),
            (a.id = 's' + l),
            (h.fake ? h : d).appendChild(a),
            h.appendChild(d),
            a.styleSheet ? (a.styleSheet.cssText = t) : a.appendChild(n.createTextNode(t)),
            (d.id = l),
            h.fake &&
              ((h.style.background = ''),
              (h.style.overflow = 'hidden'),
              (c = y.style.overflow),
              (y.style.overflow = 'hidden'),
              y.appendChild(h)),
            (s = e(d, t)),
            h.fake && h.parentNode
              ? (h.parentNode.removeChild(h), (y.style.overflow = c), y.offsetHeight)
              : d.parentNode.removeChild(d),
            !!s
          );
        }
        function u(t) {
          return t
            .replace(/([A-Z])/g, function (t, e) {
              return '-' + e.toLowerCase();
            })
            .replace(/^ms-/, '-ms-');
        }
        function c(t, n, i) {
          var r;
          if ('getComputedStyle' in e) {
            r = getComputedStyle.call(e, t, n);
            var o = e.console;
            if (null !== r) i && (r = r.getPropertyValue(i));
            else if (o) {
              o[o.error ? 'error' : 'log'].call(
                o,
                'getComputedStyle returning null, its possible modernizr test results are inaccurate',
              );
            }
          } else r = !n && t.currentStyle && t.currentStyle[i];
          return r;
        }
        function l(t, n) {
          var r = t.length;
          if (e && e.CSS && 'supports' in e.CSS) {
            for (; r--; ) if (e.CSS.supports(u(t[r]), n)) return !0;
            return !1;
          }
          if ('CSSSupportsRule' in e) {
            for (var o = []; r--; ) o.push('(' + u(t[r]) + ':' + n + ')');
            return s(
              '@supports (' + (o = o.join(' or ')) + ') { #modernizr { position: absolute; } }',
              function (t) {
                return 'absolute' === c(t, null, 'position');
              },
            );
          }
          return i;
        }
        function d(t) {
          return t
            .replace(/([a-z])-([a-z])/g, function (t, e, n) {
              return e + n.toUpperCase();
            })
            .replace(/^-/, '');
        }
        function h(t, e, n, s) {
          function u() {
            h && (delete T.style, delete T.modElem);
          }
          if (((s = !r(s, 'undefined') && s), !r(n, 'undefined'))) {
            var c = l(t, n);
            if (!r(c, 'undefined')) return c;
          }
          for (var h, f, g, p, v, _ = ['modernizr', 'tspan', 'samp']; !T.style && _.length; )
            (h = !0), (T.modElem = o(_.shift())), (T.style = T.modElem.style);
          for (g = t.length, f = 0; f < g; f++)
            if (((p = t[f]), (v = T.style[p]), a(p, '-') && (p = d(p)), T.style[p] !== i)) {
              if (s || r(n, 'undefined')) return u(), 'pfx' !== e || p;
              try {
                T.style[p] = n;
              } catch (t) {}
              if (T.style[p] !== v) return u(), 'pfx' !== e || p;
            }
          return u(), !1;
        }
        function f(t, e) {
          return function () {
            return t.apply(e, arguments);
          };
        }
        function g(t, e, n, i, o) {
          var a = t.charAt(0).toUpperCase() + t.slice(1),
            s = (t + ' ' + O.join(a + ' ') + a).split(' ');
          return r(e, 'string') || r(e, 'undefined')
            ? h(s, e, i, o)
            : (function (t, e, n) {
                var i;
                for (var o in t)
                  if (t[o] in e)
                    return !1 === n ? t[o] : r((i = e[t[o]]), 'function') ? f(i, n || e) : i;
                return !1;
              })((s = (t + ' ' + A.join(a + ' ') + a).split(' ')), e, n);
        }
        function p(t, e, n) {
          return g(t, i, i, e, n);
        }
        var v = [],
          _ = {
            _version: '3.13.0',
            _config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function (t, e) {
              var n = this;
              setTimeout(function () {
                e(n[t]);
              }, 0);
            },
            addTest: function (t, e, n) {
              v.push({ name: t, fn: e, options: n });
            },
            addAsyncTest: function (t) {
              v.push({ name: null, fn: t });
            },
          },
          m = function () {};
        (m.prototype = _), (m = new m());
        var b = [],
          y = n.documentElement,
          E = 'svg' === y.nodeName.toLowerCase(),
          w = (function () {
            var t = !('onblur' in y);
            return function (e, n) {
              var r;
              return (
                !!e &&
                ((n && 'string' != typeof n) || (n = o(n || 'div')),
                !(r = (e = 'on' + e) in n) &&
                  t &&
                  (n.setAttribute || (n = o('div')),
                  n.setAttribute(e, ''),
                  (r = 'function' == typeof n[e]),
                  n[e] !== i && (n[e] = i),
                  n.removeAttribute(e)),
                r)
              );
            };
          })();
        (_.hasEvent = w),
          m.addTest('ambientlight', w('devicelight', e)),
          m.addTest('applicationcache', 'applicationCache' in e),
          (function () {
            var t = o('audio');
            m.addTest('audio', function () {
              var e = !1;
              try {
                (e = !!t.canPlayType) && (e = new Boolean(e));
              } catch (t) {}
              return e;
            });
            try {
              t.canPlayType &&
                (m.addTest(
                  'audio.ogg',
                  t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'audio.mp3',
                  t.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'audio.opus',
                  t.canPlayType('audio/ogg; codecs="opus"') ||
                    t.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ''),
                ),
                m.addTest('audio.wav', t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')),
                m.addTest(
                  'audio.m4a',
                  (t.canPlayType('audio/x-m4a;') || t.canPlayType('audio/aac;')).replace(
                    /^no$/,
                    '',
                  ),
                ));
            } catch (t) {}
          })();
        var S = 'Moz O ms Webkit',
          O = _._config.usePrefixes ? S.split(' ') : [];
        _._cssomPrefixes = O;
        var I = { elem: o('modernizr') };
        m._q.push(function () {
          delete I.elem;
        });
        var T = { style: I.elem.style };
        m._q.unshift(function () {
          delete T.style;
        });
        var A = _._config.usePrefixes ? S.toLowerCase().split(' ') : [];
        (_._domPrefixes = A), (_.testAllProps = g);
        var P = function (t) {
          var n,
            r = x.length,
            o = e.CSSRule;
          if (void 0 === o) return i;
          if (!t) return !1;
          if ((n = (t = t.replace(/^@/, '')).replace(/-/g, '_').toUpperCase() + '_RULE') in o)
            return '@' + t;
          for (var a = 0; a < r; a++) {
            var s = x[a];
            if (s.toUpperCase() + '_' + n in o) return '@-' + s.toLowerCase() + '-' + t;
          }
          return !1;
        };
        _.atRule = P;
        var C = (_.prefixed = function (t, e, n) {
          return 0 === t.indexOf('@')
            ? P(t)
            : (-1 !== t.indexOf('-') && (t = d(t)), e ? g(t, e, n) : g(t, 'pfx'));
        });
        m.addTest('batteryapi', !!C('battery', navigator) || !!C('getBattery', navigator), {
          aliases: ['battery-api'],
        }),
          m.addTest(
            'blobconstructor',
            function () {
              try {
                return !!new Blob();
              } catch (t) {
                return !1;
              }
            },
            { aliases: ['blob-constructor'] },
          ),
          m.addTest('contextmenu', 'contextMenu' in y && 'HTMLMenuItemElement' in e),
          m.addTest('cors', 'XMLHttpRequest' in e && 'withCredentials' in new XMLHttpRequest());
        var L = C('crypto', e);
        m.addTest('crypto', !!C('subtle', L)),
          m.addTest('customelements', 'customElements' in e),
          m.addTest('customprotocolhandler', function () {
            if (!navigator.registerProtocolHandler) return !1;
            try {
              navigator.registerProtocolHandler('thisShouldFail');
            } catch (t) {
              return t instanceof TypeError;
            }
            return !1;
          }),
          m.addTest('customevent', 'CustomEvent' in e && 'function' == typeof e.CustomEvent),
          m.addTest('dart', !!C('startDart', navigator)),
          m.addTest(
            'dataview',
            'undefined' != typeof DataView && 'getFloat64' in DataView.prototype,
          ),
          m.addTest('eventlistener', 'addEventListener' in e),
          m.addTest('forcetouch', function () {
            return (
              !!w(C('mouseforcewillbegin', e, !1), e) &&
              MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN &&
              MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN
            );
          }),
          m.addTest('fullscreen', !(!C('exitFullscreen', n, !1) && !C('cancelFullScreen', n, !1))),
          m.addTest('gamepads', !!C('getGamepads', navigator)),
          m.addTest('geolocation', 'geolocation' in navigator),
          m.addTest('ie8compat', !e.addEventListener && !!n.documentMode && 7 === n.documentMode),
          m.addTest('intl', !!C('Intl', e)),
          m.addTest('json', 'JSON' in e && 'parse' in JSON && 'stringify' in JSON),
          (_.testAllProps = p),
          m.addTest('ligatures', p('fontFeatureSettings', '"liga" 1')),
          m.addTest('messagechannel', 'MessageChannel' in e),
          m.addTest('notification', function () {
            if (!e.Notification || !e.Notification.requestPermission) return !1;
            if ('granted' === e.Notification.permission) return !0;
            try {
              new e.Notification('');
            } catch (t) {
              if ('TypeError' === t.name) return !1;
            }
            return !0;
          }),
          m.addTest('pagevisibility', !!C('hidden', n, !1)),
          m.addTest('performance', !!C('performance', e));
        var D = [''].concat(A);
        (_._domPrefixesAll = D),
          m.addTest('pointerevents', function () {
            for (var t = 0, e = D.length; t < e; t++) if (w(D[t] + 'pointerdown')) return !0;
            return !1;
          }),
          m.addTest('pointerlock', !!C('exitPointerLock', n)),
          m.addTest('queryselector', 'querySelector' in n && 'querySelectorAll' in n),
          m.addTest('quotamanagement', function () {
            var t = C('temporaryStorage', navigator),
              e = C('persistentStorage', navigator);
            return !(!t || !e);
          }),
          m.addTest('requestanimationframe', !!C('requestAnimationFrame', e), { aliases: ['raf'] }),
          m.addTest('serviceworker', 'serviceWorker' in navigator);
        var x = _._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
        _._prefixes = x;
        var M = (function () {
          var t = e.matchMedia || e.msMatchMedia;
          return t
            ? function (e) {
                var n = t(e);
                return (n && n.matches) || !1;
              }
            : function (t) {
                var e = !1;
                return (
                  s('@media ' + t + ' { #modernizr { position: absolute; } }', function (t) {
                    e = 'absolute' === c(t, null, 'position');
                  }),
                  e
                );
              };
        })();
        (_.mq = M),
          m.addTest('touchevents', function () {
            if (
              'ontouchstart' in e ||
              e.TouchEvent ||
              (e.DocumentTouch && n instanceof DocumentTouch)
            )
              return !0;
            var t = ['(', x.join('touch-enabled),('), 'heartz', ')'].join('');
            return M(t);
          }),
          m.addTest('typedarrays', 'ArrayBuffer' in e),
          m.addTest('vibrate', !!C('vibrate', navigator)),
          (function () {
            var t = o('video');
            m.addTest('video', function () {
              var e = !1;
              try {
                (e = !!t.canPlayType) && (e = new Boolean(e));
              } catch (t) {}
              return e;
            });
            try {
              t.canPlayType &&
                (m.addTest(
                  'video.ogg',
                  t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'video.h264',
                  t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'video.h265',
                  t.canPlayType('video/mp4; codecs="hev1"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'video.webm',
                  t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'video.vp9',
                  t.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'video.hls',
                  t.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ''),
                ),
                m.addTest(
                  'video.av1',
                  t.canPlayType('video/mp4; codecs="av01"').replace(/^no$/, ''),
                ));
            } catch (t) {}
          })(),
          m.addTest('webgl', function () {
            return 'WebGLRenderingContext' in e;
          });
        var R = !1;
        try {
          R = 'WebSocket' in e && 2 === e.WebSocket.CLOSING;
        } catch (t) {}
        m.addTest('websockets', R),
          m.addTest('xdomainrequest', 'XDomainRequest' in e),
          m.addTest('matchmedia', !!C('matchMedia', e)),
          (function () {
            var t, e, n, i, o, a;
            for (var s in v)
              if (v.hasOwnProperty(s)) {
                if (
                  ((t = []),
                  (e = v[s]).name &&
                    (t.push(e.name.toLowerCase()),
                    e.options && e.options.aliases && e.options.aliases.length))
                )
                  for (n = 0; n < e.options.aliases.length; n++)
                    t.push(e.options.aliases[n].toLowerCase());
                for (i = r(e.fn, 'function') ? e.fn() : e.fn, o = 0; o < t.length; o++)
                  1 === (a = t[o].split('.')).length
                    ? (m[a[0]] = i)
                    : ((m[a[0]] && (!m[a[0]] || m[a[0]] instanceof Boolean)) ||
                        (m[a[0]] = new Boolean(m[a[0]])),
                      (m[a[0]][a[1]] = i)),
                    b.push((i ? '' : 'no-') + a.join('-'));
              }
          })(),
          delete _.addTest,
          delete _.addAsyncTest;
        for (var U = 0; U < m._q.length; U++) m._q[U]();
        t.Modernizr = m;
      })(_POSignalsEntities || (_POSignalsEntities = {}), window, document);
    }),
    ((void 0 !== _POSignalsEntities ? _POSignalsEntities : (_POSignalsEntities = {})).AiaSignals =
      (function (t) {
        'use strict';
        var e = [
            { name: 'IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', value: !1, error: null },
            { name: 'FILE_INJECT_JS_FOUND', value: !1, error: null },
            { name: 'FILE_CONTENT_JS_FOUND', value: !1, error: null },
            { name: 'WINDOW_GLOBAL_KEY_FOUND', value: !1, error: null },
          ],
          n = { webAuthn: 1e3, manus: 5e3, anchor: 5e3, skyvern: 5e3, detect: 1e4 };
        function i(t) {
          for (var n = 0; n < e.length; n++) if (e[n].name === t) return e[n];
          return null;
        }
        function r(t, e) {
          var n = i(t);
          n && ((n.value = e), (n.error = null));
        }
        function o(t, e, n) {
          var r = i(t);
          r && ((r.value = e), (r.error = n));
        }
        function a() {
          return new Promise(function (t) {
            var i = n.webAuthn,
              a = setTimeout(function () {
                o('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1004), t(e);
              }, i);
            try {
              window.PublicKeyCredential &&
              'function' == typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
                ? PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
                    .then(function (n) {
                      clearTimeout(a),
                        n
                          ? r('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !0)
                          : o('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1001),
                        t(e);
                    })
                    .catch(function () {
                      clearTimeout(a),
                        o('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1002),
                        t(e);
                    })
                : (clearTimeout(a),
                  o('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1003),
                  t(e));
            } catch (n) {
              clearTimeout(a),
                o('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1002),
                t(e);
            }
          });
        }
        function s() {
          return new Promise(function (t) {
            var i,
              a = n.manus,
              s = document.createElement('script');
            (s.src = 'chrome-extension://mljmkmodkfigdopcpgboaalildgijkoc/content.ts.js'),
              (s.onload = function () {
                clearTimeout(i), r('FILE_CONTENT_JS_FOUND', !0), t(e);
              }),
              (s.onerror = function () {
                clearTimeout(i), o('FILE_CONTENT_JS_FOUND', !1, 2002), t(e);
              }),
              document.getElementsByTagName('head')[0].appendChild(s),
              (i = setTimeout(function () {
                o('FILE_CONTENT_JS_FOUND', !1, 2001), t(e);
              }, a));
          });
        }
        function u() {
          return new Promise(function (t) {
            var i,
              a = n.anchor,
              s = document.createElement('script');
            (s.src = 'chrome-extension://bppehibnhionalpjigdjdilknbljaeai/inject.js'),
              (s.onload = function () {
                clearTimeout(i), r('FILE_INJECT_JS_FOUND', !0), t(e);
              }),
              (s.onerror = function () {
                clearTimeout(i), o('FILE_INJECT_JS_FOUND', !1, 4002), t(e);
              }),
              document.getElementsByTagName('head')[0].appendChild(s),
              (i = setTimeout(function () {
                o('FILE_INJECT_JS_FOUND', !1, 4001), t(e);
              }, a));
          });
        }
        function c() {
          return new Promise(function (t) {
            var i = n.skyvern,
              a = 1e3,
              s = 0;
            function u() {
              if (
                window.globalDomDepthMap ||
                window.GlobalEnableAllTextualElements ||
                window.globalObserverForDOMIncrement ||
                window.globalListnerFlag ||
                window.globalDomDepthMap ||
                window.globalOneTimeIncrementElements ||
                window.globalHoverStylesMap ||
                window.globalParsedElementCounter
              )
                return r('WINDOW_GLOBAL_KEY_FOUND', !0), void t(e);
              for (var n in window)
                if (
                  'string' == typeof n &&
                  -1 !== n.toLowerCase().indexOf('skyvern') &&
                  'isSkyvern' !== n
                )
                  return r('WINDOW_GLOBAL_KEY_FOUND', !0), void t(e);
              (s += a) >= i ? (o('WINDOW_GLOBAL_KEY_FOUND', !1, 5002), t(e)) : setTimeout(u, a);
            }
            'loading' === document.readyState
              ? document.addEventListener('DOMContentLoaded', u)
              : u();
          });
        }
        return (
          (t.detect = function () {
            return new Promise(function (t) {
              var r = setTimeout(function () {
                t(e);
              }, n.detect);
              a()
                .then(function (n) {
                  var o = i('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE');
                  if (o && o.value) return clearTimeout(r), void t(e);
                  for (
                    var a = [
                        s().then(function (t) {
                          return { key: 'manus', result: t };
                        }),
                        u().then(function (t) {
                          return { key: 'anchor', result: t };
                        }),
                        c().then(function (t) {
                          return { key: 'skyvern', result: t };
                        }),
                      ],
                      l = 0,
                      d = function () {
                        ++l === a.length && (clearTimeout(r), t(e));
                      },
                      h = 0;
                    h < a.length;
                    h++
                  )
                    a[h].then(d).catch(function () {
                      d();
                    });
                })
                .catch(function () {
                  clearTimeout(r), t(e);
                });
            });
          }),
          (t.checkWebAuthnPlatformSupport = a),
          (t.isManus = s),
          (t.isAnchor = u),
          (t.isSkyvern = c),
          Object.defineProperty(t, '__esModule', { value: !0 }),
          t
        );
      })({})),
    ((_POSignalsEntities || (_POSignalsEntities = {})).pako = (function t(e, n, i) {
      function r(a, s) {
        if (!n[a]) {
          if (!e[a]) {
            var u = 'function' == typeof require && require;
            if (!s && u) return u(a, !0);
            if (o) return o(a, !0);
            var c = new Error("Cannot find module '" + a + "'");
            throw ((c.code = 'MODULE_NOT_FOUND'), c);
          }
          var l = (n[a] = { exports: {} });
          e[a][0].call(
            l.exports,
            function (t) {
              var n = e[a][1][t];
              return r(n || t);
            },
            l,
            l.exports,
            t,
            e,
            n,
            i,
          );
        }
        return n[a].exports;
      }
      for (var o = 'function' == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
      return r;
    })(
      {
        1: [
          function (t, e, n) {
            'use strict';
            function i(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }
            var r =
              'undefined' != typeof Uint8Array &&
              'undefined' != typeof Uint16Array &&
              'undefined' != typeof Int32Array;
            (n.assign = function (t) {
              for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
                var n = e.shift();
                if (n) {
                  if ('object' != typeof n) throw new TypeError(n + 'must be non-object');
                  for (var r in n) i(n, r) && (t[r] = n[r]);
                }
              }
              return t;
            }),
              (n.shrinkBuf = function (t, e) {
                return t.length === e ? t : t.subarray ? t.subarray(0, e) : ((t.length = e), t);
              });
            var o = {
                arraySet: function (t, e, n, i, r) {
                  if (e.subarray && t.subarray) t.set(e.subarray(n, n + i), r);
                  else for (var o = 0; o < i; o++) t[r + o] = e[n + o];
                },
                flattenChunks: function (t) {
                  var e, n, i, r, o, a;
                  for (i = 0, e = 0, n = t.length; e < n; e++) i += t[e].length;
                  for (a = new Uint8Array(i), r = 0, e = 0, n = t.length; e < n; e++)
                    (o = t[e]), a.set(o, r), (r += o.length);
                  return a;
                },
              },
              a = {
                arraySet: function (t, e, n, i, r) {
                  for (var o = 0; o < i; o++) t[r + o] = e[n + o];
                },
                flattenChunks: function (t) {
                  return [].concat.apply([], t);
                },
              };
            (n.setTyped = function (t) {
              t
                ? ((n.Buf8 = Uint8Array),
                  (n.Buf16 = Uint16Array),
                  (n.Buf32 = Int32Array),
                  n.assign(n, o))
                : ((n.Buf8 = Array), (n.Buf16 = Array), (n.Buf32 = Array), n.assign(n, a));
            }),
              n.setTyped(r);
          },
          {},
        ],
        2: [
          function (t, e, n) {
            'use strict';
            function i(t, e) {
              if (e < 65537 && ((t.subarray && a) || (!t.subarray && o)))
                return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
              for (var n = '', i = 0; i < e; i++) n += String.fromCharCode(t[i]);
              return n;
            }
            var r = t('./common'),
              o = !0,
              a = !0;
            try {
              String.fromCharCode.apply(null, [0]);
            } catch (t) {
              o = !1;
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1));
            } catch (t) {
              a = !1;
            }
            for (var s = new r.Buf8(256), u = 0; u < 256; u++)
              s[u] = u >= 252 ? 6 : u >= 248 ? 5 : u >= 240 ? 4 : u >= 224 ? 3 : u >= 192 ? 2 : 1;
            (s[254] = s[254] = 1),
              (n.string2buf = function (t) {
                var e,
                  n,
                  i,
                  o,
                  a,
                  s = t.length,
                  u = 0;
                for (o = 0; o < s; o++)
                  55296 == (64512 & (n = t.charCodeAt(o))) &&
                    o + 1 < s &&
                    56320 == (64512 & (i = t.charCodeAt(o + 1))) &&
                    ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), o++),
                    (u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
                for (e = new r.Buf8(u), a = 0, o = 0; a < u; o++)
                  55296 == (64512 & (n = t.charCodeAt(o))) &&
                    o + 1 < s &&
                    56320 == (64512 & (i = t.charCodeAt(o + 1))) &&
                    ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), o++),
                    n < 128
                      ? (e[a++] = n)
                      : n < 2048
                        ? ((e[a++] = 192 | (n >>> 6)), (e[a++] = 128 | (63 & n)))
                        : n < 65536
                          ? ((e[a++] = 224 | (n >>> 12)),
                            (e[a++] = 128 | ((n >>> 6) & 63)),
                            (e[a++] = 128 | (63 & n)))
                          : ((e[a++] = 240 | (n >>> 18)),
                            (e[a++] = 128 | ((n >>> 12) & 63)),
                            (e[a++] = 128 | ((n >>> 6) & 63)),
                            (e[a++] = 128 | (63 & n)));
                return e;
              }),
              (n.buf2binstring = function (t) {
                return i(t, t.length);
              }),
              (n.binstring2buf = function (t) {
                for (var e = new r.Buf8(t.length), n = 0, i = e.length; n < i; n++)
                  e[n] = t.charCodeAt(n);
                return e;
              }),
              (n.buf2string = function (t, e) {
                var n,
                  r,
                  o,
                  a,
                  u = e || t.length,
                  c = new Array(2 * u);
                for (r = 0, n = 0; n < u; )
                  if ((o = t[n++]) < 128) c[r++] = o;
                  else if ((a = s[o]) > 4) (c[r++] = 65533), (n += a - 1);
                  else {
                    for (o &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && n < u; )
                      (o = (o << 6) | (63 & t[n++])), a--;
                    a > 1
                      ? (c[r++] = 65533)
                      : o < 65536
                        ? (c[r++] = o)
                        : ((o -= 65536),
                          (c[r++] = 55296 | ((o >> 10) & 1023)),
                          (c[r++] = 56320 | (1023 & o)));
                  }
                return i(c, r);
              }),
              (n.utf8border = function (t, e) {
                var n;
                for (
                  (e = e || t.length) > t.length && (e = t.length), n = e - 1;
                  n >= 0 && 128 == (192 & t[n]);

                )
                  n--;
                return n < 0 ? e : 0 === n ? e : n + s[t[n]] > e ? n : e;
              });
          },
          { './common': 1 },
        ],
        3: [
          function (t, e, n) {
            'use strict';
            e.exports = function (t, e, n, i) {
              for (var r = (65535 & t) | 0, o = ((t >>> 16) & 65535) | 0, a = 0; 0 !== n; ) {
                n -= a = n > 2e3 ? 2e3 : n;
                do {
                  o = (o + (r = (r + e[i++]) | 0)) | 0;
                } while (--a);
                (r %= 65521), (o %= 65521);
              }
              return r | (o << 16) | 0;
            };
          },
          {},
        ],
        4: [
          function (t, e, n) {
            'use strict';
            var i = (function () {
              for (var t, e = [], n = 0; n < 256; n++) {
                t = n;
                for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
                e[n] = t;
              }
              return e;
            })();
            e.exports = function (t, e, n, r) {
              var o = i,
                a = r + n;
              t ^= -1;
              for (var s = r; s < a; s++) t = (t >>> 8) ^ o[255 & (t ^ e[s])];
              return -1 ^ t;
            };
          },
          {},
        ],
        5: [
          function (t, e, n) {
            'use strict';
            function i(t, e) {
              return (t.msg = A[e]), e;
            }
            function r(t) {
              return (t << 1) - (t > 4 ? 9 : 0);
            }
            function o(t) {
              for (var e = t.length; --e >= 0; ) t[e] = 0;
            }
            function a(t) {
              var e = t.state,
                n = e.pending;
              n > t.avail_out && (n = t.avail_out),
                0 !== n &&
                  (S.arraySet(t.output, e.pending_buf, e.pending_out, n, t.next_out),
                  (t.next_out += n),
                  (e.pending_out += n),
                  (t.total_out += n),
                  (t.avail_out -= n),
                  (e.pending -= n),
                  0 === e.pending && (e.pending_out = 0));
            }
            function s(t, e) {
              O._tr_flush_block(
                t,
                t.block_start >= 0 ? t.block_start : -1,
                t.strstart - t.block_start,
                e,
              ),
                (t.block_start = t.strstart),
                a(t.strm);
            }
            function u(t, e) {
              t.pending_buf[t.pending++] = e;
            }
            function c(t, e) {
              (t.pending_buf[t.pending++] = (e >>> 8) & 255),
                (t.pending_buf[t.pending++] = 255 & e);
            }
            function l(t, e, n, i) {
              var r = t.avail_in;
              return (
                r > i && (r = i),
                0 === r
                  ? 0
                  : ((t.avail_in -= r),
                    S.arraySet(e, t.input, t.next_in, r, n),
                    1 === t.state.wrap
                      ? (t.adler = I(t.adler, e, r, n))
                      : 2 === t.state.wrap && (t.adler = T(t.adler, e, r, n)),
                    (t.next_in += r),
                    (t.total_in += r),
                    r)
              );
            }
            function d(t, e) {
              var n,
                i,
                r = t.max_chain_length,
                o = t.strstart,
                a = t.prev_length,
                s = t.nice_match,
                u = t.strstart > t.w_size - K ? t.strstart - (t.w_size - K) : 0,
                c = t.window,
                l = t.w_mask,
                d = t.prev,
                h = t.strstart + W,
                f = c[o + a - 1],
                g = c[o + a];
              t.prev_length >= t.good_match && (r >>= 2), s > t.lookahead && (s = t.lookahead);
              do {
                if (
                  c[(n = e) + a] === g &&
                  c[n + a - 1] === f &&
                  c[n] === c[o] &&
                  c[++n] === c[o + 1]
                ) {
                  (o += 2), n++;
                  do {} while (
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    c[++o] === c[++n] &&
                    o < h
                  );
                  if (((i = W - (h - o)), (o = h - W), i > a)) {
                    if (((t.match_start = e), (a = i), i >= s)) break;
                    (f = c[o + a - 1]), (g = c[o + a]);
                  }
                }
              } while ((e = d[e & l]) > u && 0 != --r);
              return a <= t.lookahead ? a : t.lookahead;
            }
            function h(t) {
              var e,
                n,
                i,
                r,
                o,
                a = t.w_size;
              do {
                if (((r = t.window_size - t.lookahead - t.strstart), t.strstart >= a + (a - K))) {
                  S.arraySet(t.window, t.window, a, a, 0),
                    (t.match_start -= a),
                    (t.strstart -= a),
                    (t.block_start -= a),
                    (e = n = t.hash_size);
                  do {
                    (i = t.head[--e]), (t.head[e] = i >= a ? i - a : 0);
                  } while (--n);
                  e = n = a;
                  do {
                    (i = t.prev[--e]), (t.prev[e] = i >= a ? i - a : 0);
                  } while (--n);
                  r += a;
                }
                if (0 === t.strm.avail_in) break;
                if (
                  ((n = l(t.strm, t.window, t.strstart + t.lookahead, r)),
                  (t.lookahead += n),
                  t.lookahead + t.insert >= j)
                )
                  for (
                    o = t.strstart - t.insert,
                      t.ins_h = t.window[o],
                      t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[o + 1]) & t.hash_mask;
                    t.insert &&
                    ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[o + j - 1]) & t.hash_mask),
                    (t.prev[o & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = o),
                    o++,
                    t.insert--,
                    !(t.lookahead + t.insert < j));

                  );
              } while (t.lookahead < K && 0 !== t.strm.avail_in);
            }
            function f(t, e) {
              for (var n, i; ; ) {
                if (t.lookahead < K) {
                  if ((h(t), t.lookahead < K && e === P)) return X;
                  if (0 === t.lookahead) break;
                }
                if (
                  ((n = 0),
                  t.lookahead >= j &&
                    ((t.ins_h =
                      ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + j - 1]) & t.hash_mask),
                    (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = t.strstart)),
                  0 !== n && t.strstart - n <= t.w_size - K && (t.match_length = d(t, n)),
                  t.match_length >= j)
                )
                  if (
                    ((i = O._tr_tally(t, t.strstart - t.match_start, t.match_length - j)),
                    (t.lookahead -= t.match_length),
                    t.match_length <= t.max_lazy_match && t.lookahead >= j)
                  ) {
                    t.match_length--;
                    do {
                      t.strstart++,
                        (t.ins_h =
                          ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + j - 1]) & t.hash_mask),
                        (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                        (t.head[t.ins_h] = t.strstart);
                    } while (0 != --t.match_length);
                    t.strstart++;
                  } else
                    (t.strstart += t.match_length),
                      (t.match_length = 0),
                      (t.ins_h = t.window[t.strstart]),
                      (t.ins_h =
                        ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 1]) & t.hash_mask);
                else (i = O._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
                if (i && (s(t, !1), 0 === t.strm.avail_out)) return X;
              }
              return (
                (t.insert = t.strstart < j - 1 ? t.strstart : j - 1),
                e === C
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? X
                    : q
              );
            }
            function g(t, e) {
              for (var n, i, r; ; ) {
                if (t.lookahead < K) {
                  if ((h(t), t.lookahead < K && e === P)) return X;
                  if (0 === t.lookahead) break;
                }
                if (
                  ((n = 0),
                  t.lookahead >= j &&
                    ((t.ins_h =
                      ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + j - 1]) & t.hash_mask),
                    (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = t.strstart)),
                  (t.prev_length = t.match_length),
                  (t.prev_match = t.match_start),
                  (t.match_length = j - 1),
                  0 !== n &&
                    t.prev_length < t.max_lazy_match &&
                    t.strstart - n <= t.w_size - K &&
                    ((t.match_length = d(t, n)),
                    t.match_length <= 5 &&
                      (t.strategy === M ||
                        (t.match_length === j && t.strstart - t.match_start > 4096)) &&
                      (t.match_length = j - 1)),
                  t.prev_length >= j && t.match_length <= t.prev_length)
                ) {
                  (r = t.strstart + t.lookahead - j),
                    (i = O._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - j)),
                    (t.lookahead -= t.prev_length - 1),
                    (t.prev_length -= 2);
                  do {
                    ++t.strstart <= r &&
                      ((t.ins_h =
                        ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + j - 1]) & t.hash_mask),
                      (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                      (t.head[t.ins_h] = t.strstart));
                  } while (0 != --t.prev_length);
                  if (
                    ((t.match_available = 0),
                    (t.match_length = j - 1),
                    t.strstart++,
                    i && (s(t, !1), 0 === t.strm.avail_out))
                  )
                    return X;
                } else if (t.match_available) {
                  if (
                    ((i = O._tr_tally(t, 0, t.window[t.strstart - 1])) && s(t, !1),
                    t.strstart++,
                    t.lookahead--,
                    0 === t.strm.avail_out)
                  )
                    return X;
                } else (t.match_available = 1), t.strstart++, t.lookahead--;
              }
              return (
                t.match_available &&
                  ((i = O._tr_tally(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
                (t.insert = t.strstart < j - 1 ? t.strstart : j - 1),
                e === C
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? X
                    : q
              );
            }
            function p(t, e) {
              for (var n, i, r, o, a = t.window; ; ) {
                if (t.lookahead <= W) {
                  if ((h(t), t.lookahead <= W && e === P)) return X;
                  if (0 === t.lookahead) break;
                }
                if (
                  ((t.match_length = 0),
                  t.lookahead >= j &&
                    t.strstart > 0 &&
                    ((r = t.strstart - 1), (i = a[r]) === a[++r] && i === a[++r] && i === a[++r]))
                ) {
                  o = t.strstart + W;
                  do {} while (
                    i === a[++r] &&
                    i === a[++r] &&
                    i === a[++r] &&
                    i === a[++r] &&
                    i === a[++r] &&
                    i === a[++r] &&
                    i === a[++r] &&
                    i === a[++r] &&
                    r < o
                  );
                  (t.match_length = W - (o - r)),
                    t.match_length > t.lookahead && (t.match_length = t.lookahead);
                }
                if (
                  (t.match_length >= j
                    ? ((n = O._tr_tally(t, 1, t.match_length - j)),
                      (t.lookahead -= t.match_length),
                      (t.strstart += t.match_length),
                      (t.match_length = 0))
                    : ((n = O._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                  n && (s(t, !1), 0 === t.strm.avail_out))
                )
                  return X;
              }
              return (
                (t.insert = 0),
                e === C
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? X
                    : q
              );
            }
            function v(t, e) {
              for (var n; ; ) {
                if (0 === t.lookahead && (h(t), 0 === t.lookahead)) {
                  if (e === P) return X;
                  break;
                }
                if (
                  ((t.match_length = 0),
                  (n = O._tr_tally(t, 0, t.window[t.strstart])),
                  t.lookahead--,
                  t.strstart++,
                  n && (s(t, !1), 0 === t.strm.avail_out))
                )
                  return X;
              }
              return (
                (t.insert = 0),
                e === C
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? X
                    : q
              );
            }
            function _(t, e, n, i, r) {
              (this.good_length = t),
                (this.max_lazy = e),
                (this.nice_length = n),
                (this.max_chain = i),
                (this.func = r);
            }
            function m() {
              (this.strm = null),
                (this.status = 0),
                (this.pending_buf = null),
                (this.pending_buf_size = 0),
                (this.pending_out = 0),
                (this.pending = 0),
                (this.wrap = 0),
                (this.gzhead = null),
                (this.gzindex = 0),
                (this.method = k),
                (this.last_flush = -1),
                (this.w_size = 0),
                (this.w_bits = 0),
                (this.w_mask = 0),
                (this.window = null),
                (this.window_size = 0),
                (this.prev = null),
                (this.head = null),
                (this.ins_h = 0),
                (this.hash_size = 0),
                (this.hash_bits = 0),
                (this.hash_mask = 0),
                (this.hash_shift = 0),
                (this.block_start = 0),
                (this.match_length = 0),
                (this.prev_match = 0),
                (this.match_available = 0),
                (this.strstart = 0),
                (this.match_start = 0),
                (this.lookahead = 0),
                (this.prev_length = 0),
                (this.max_chain_length = 0),
                (this.max_lazy_match = 0),
                (this.level = 0),
                (this.strategy = 0),
                (this.good_match = 0),
                (this.nice_match = 0),
                (this.dyn_ltree = new S.Buf16(2 * V)),
                (this.dyn_dtree = new S.Buf16(2 * (2 * F + 1))),
                (this.bl_tree = new S.Buf16(2 * (2 * H + 1))),
                o(this.dyn_ltree),
                o(this.dyn_dtree),
                o(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new S.Buf16(G + 1)),
                (this.heap = new S.Buf16(2 * B + 1)),
                o(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new S.Buf16(2 * B + 1)),
                o(this.depth),
                (this.l_buf = 0),
                (this.lit_bufsize = 0),
                (this.last_lit = 0),
                (this.d_buf = 0),
                (this.opt_len = 0),
                (this.static_len = 0),
                (this.matches = 0),
                (this.insert = 0),
                (this.bi_buf = 0),
                (this.bi_valid = 0);
            }
            function b(t) {
              var e;
              return t && t.state
                ? ((t.total_in = t.total_out = 0),
                  (t.data_type = U),
                  ((e = t.state).pending = 0),
                  (e.pending_out = 0),
                  e.wrap < 0 && (e.wrap = -e.wrap),
                  (e.status = e.wrap ? z : Y),
                  (t.adler = 2 === e.wrap ? 0 : 1),
                  (e.last_flush = P),
                  O._tr_init(e),
                  L)
                : i(t, D);
            }
            function y(t) {
              var e = b(t);
              return (
                e === L &&
                  (function (t) {
                    (t.window_size = 2 * t.w_size),
                      o(t.head),
                      (t.max_lazy_match = w[t.level].max_lazy),
                      (t.good_match = w[t.level].good_length),
                      (t.nice_match = w[t.level].nice_length),
                      (t.max_chain_length = w[t.level].max_chain),
                      (t.strstart = 0),
                      (t.block_start = 0),
                      (t.lookahead = 0),
                      (t.insert = 0),
                      (t.match_length = t.prev_length = j - 1),
                      (t.match_available = 0),
                      (t.ins_h = 0);
                  })(t.state),
                e
              );
            }
            function E(t, e, n, r, o, a) {
              if (!t) return D;
              var s = 1;
              if (
                (e === x && (e = 6),
                r < 0 ? ((s = 0), (r = -r)) : r > 15 && ((s = 2), (r -= 16)),
                o < 1 || o > N || n !== k || r < 8 || r > 15 || e < 0 || e > 9 || a < 0 || a > R)
              )
                return i(t, D);
              8 === r && (r = 9);
              var u = new m();
              return (
                (t.state = u),
                (u.strm = t),
                (u.wrap = s),
                (u.gzhead = null),
                (u.w_bits = r),
                (u.w_size = 1 << u.w_bits),
                (u.w_mask = u.w_size - 1),
                (u.hash_bits = o + 7),
                (u.hash_size = 1 << u.hash_bits),
                (u.hash_mask = u.hash_size - 1),
                (u.hash_shift = ~~((u.hash_bits + j - 1) / j)),
                (u.window = new S.Buf8(2 * u.w_size)),
                (u.head = new S.Buf16(u.hash_size)),
                (u.prev = new S.Buf16(u.w_size)),
                (u.lit_bufsize = 1 << (o + 6)),
                (u.pending_buf_size = 4 * u.lit_bufsize),
                (u.pending_buf = new S.Buf8(u.pending_buf_size)),
                (u.d_buf = 1 * u.lit_bufsize),
                (u.l_buf = 3 * u.lit_bufsize),
                (u.level = e),
                (u.strategy = a),
                (u.method = n),
                y(t)
              );
            }
            var w,
              S = t('../utils/common'),
              O = t('./trees'),
              I = t('./adler32'),
              T = t('./crc32'),
              A = t('./messages'),
              P = 0,
              C = 4,
              L = 0,
              D = -2,
              x = -1,
              M = 1,
              R = 4,
              U = 2,
              k = 8,
              N = 9,
              B = 286,
              F = 30,
              H = 19,
              V = 2 * B + 1,
              G = 15,
              j = 3,
              W = 258,
              K = W + j + 1,
              z = 42,
              Y = 113,
              X = 1,
              q = 2,
              J = 3,
              Z = 4;
            (w = [
              new _(0, 0, 0, 0, function (t, e) {
                var n = 65535;
                for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5); ; ) {
                  if (t.lookahead <= 1) {
                    if ((h(t), 0 === t.lookahead && e === P)) return X;
                    if (0 === t.lookahead) break;
                  }
                  (t.strstart += t.lookahead), (t.lookahead = 0);
                  var i = t.block_start + n;
                  if (
                    (0 === t.strstart || t.strstart >= i) &&
                    ((t.lookahead = t.strstart - i),
                    (t.strstart = i),
                    s(t, !1),
                    0 === t.strm.avail_out)
                  )
                    return X;
                  if (
                    t.strstart - t.block_start >= t.w_size - K &&
                    (s(t, !1), 0 === t.strm.avail_out)
                  )
                    return X;
                }
                return (
                  (t.insert = 0),
                  e === C
                    ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                    : (t.strstart > t.block_start && (s(t, !1), t.strm.avail_out), X)
                );
              }),
              new _(4, 4, 8, 4, f),
              new _(4, 5, 16, 8, f),
              new _(4, 6, 32, 32, f),
              new _(4, 4, 16, 16, g),
              new _(8, 16, 32, 32, g),
              new _(8, 16, 128, 128, g),
              new _(8, 32, 128, 256, g),
              new _(32, 128, 258, 1024, g),
              new _(32, 258, 258, 4096, g),
            ]),
              (n.deflateInit = function (t, e) {
                return E(t, e, k, 15, 8, 0);
              }),
              (n.deflateInit2 = E),
              (n.deflateReset = y),
              (n.deflateResetKeep = b),
              (n.deflateSetHeader = function (t, e) {
                return t && t.state ? (2 !== t.state.wrap ? D : ((t.state.gzhead = e), L)) : D;
              }),
              (n.deflate = function (t, e) {
                var n, s, l, d;
                if (!t || !t.state || e > 5 || e < 0) return t ? i(t, D) : D;
                if (
                  ((s = t.state),
                  !t.output || (!t.input && 0 !== t.avail_in) || (666 === s.status && e !== C))
                )
                  return i(t, 0 === t.avail_out ? -5 : D);
                if (((s.strm = t), (n = s.last_flush), (s.last_flush = e), s.status === z))
                  if (2 === s.wrap)
                    (t.adler = 0),
                      u(s, 31),
                      u(s, 139),
                      u(s, 8),
                      s.gzhead
                        ? (u(
                            s,
                            (s.gzhead.text ? 1 : 0) +
                              (s.gzhead.hcrc ? 2 : 0) +
                              (s.gzhead.extra ? 4 : 0) +
                              (s.gzhead.name ? 8 : 0) +
                              (s.gzhead.comment ? 16 : 0),
                          ),
                          u(s, 255 & s.gzhead.time),
                          u(s, (s.gzhead.time >> 8) & 255),
                          u(s, (s.gzhead.time >> 16) & 255),
                          u(s, (s.gzhead.time >> 24) & 255),
                          u(s, 9 === s.level ? 2 : s.strategy >= 2 || s.level < 2 ? 4 : 0),
                          u(s, 255 & s.gzhead.os),
                          s.gzhead.extra &&
                            s.gzhead.extra.length &&
                            (u(s, 255 & s.gzhead.extra.length),
                            u(s, (s.gzhead.extra.length >> 8) & 255)),
                          s.gzhead.hcrc && (t.adler = T(t.adler, s.pending_buf, s.pending, 0)),
                          (s.gzindex = 0),
                          (s.status = 69))
                        : (u(s, 0),
                          u(s, 0),
                          u(s, 0),
                          u(s, 0),
                          u(s, 0),
                          u(s, 9 === s.level ? 2 : s.strategy >= 2 || s.level < 2 ? 4 : 0),
                          u(s, 3),
                          (s.status = Y));
                  else {
                    var h = (k + ((s.w_bits - 8) << 4)) << 8;
                    (h |=
                      (s.strategy >= 2 || s.level < 2
                        ? 0
                        : s.level < 6
                          ? 1
                          : 6 === s.level
                            ? 2
                            : 3) << 6),
                      0 !== s.strstart && (h |= 32),
                      (h += 31 - (h % 31)),
                      (s.status = Y),
                      c(s, h),
                      0 !== s.strstart && (c(s, t.adler >>> 16), c(s, 65535 & t.adler)),
                      (t.adler = 1);
                  }
                if (69 === s.status)
                  if (s.gzhead.extra) {
                    for (
                      l = s.pending;
                      s.gzindex < (65535 & s.gzhead.extra.length) &&
                      (s.pending !== s.pending_buf_size ||
                        (s.gzhead.hcrc &&
                          s.pending > l &&
                          (t.adler = T(t.adler, s.pending_buf, s.pending - l, l)),
                        a(t),
                        (l = s.pending),
                        s.pending !== s.pending_buf_size));

                    )
                      u(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
                    s.gzhead.hcrc &&
                      s.pending > l &&
                      (t.adler = T(t.adler, s.pending_buf, s.pending - l, l)),
                      s.gzindex === s.gzhead.extra.length && ((s.gzindex = 0), (s.status = 73));
                  } else s.status = 73;
                if (73 === s.status)
                  if (s.gzhead.name) {
                    l = s.pending;
                    do {
                      if (
                        s.pending === s.pending_buf_size &&
                        (s.gzhead.hcrc &&
                          s.pending > l &&
                          (t.adler = T(t.adler, s.pending_buf, s.pending - l, l)),
                        a(t),
                        (l = s.pending),
                        s.pending === s.pending_buf_size)
                      ) {
                        d = 1;
                        break;
                      }
                      (d =
                        s.gzindex < s.gzhead.name.length
                          ? 255 & s.gzhead.name.charCodeAt(s.gzindex++)
                          : 0),
                        u(s, d);
                    } while (0 !== d);
                    s.gzhead.hcrc &&
                      s.pending > l &&
                      (t.adler = T(t.adler, s.pending_buf, s.pending - l, l)),
                      0 === d && ((s.gzindex = 0), (s.status = 91));
                  } else s.status = 91;
                if (91 === s.status)
                  if (s.gzhead.comment) {
                    l = s.pending;
                    do {
                      if (
                        s.pending === s.pending_buf_size &&
                        (s.gzhead.hcrc &&
                          s.pending > l &&
                          (t.adler = T(t.adler, s.pending_buf, s.pending - l, l)),
                        a(t),
                        (l = s.pending),
                        s.pending === s.pending_buf_size)
                      ) {
                        d = 1;
                        break;
                      }
                      (d =
                        s.gzindex < s.gzhead.comment.length
                          ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++)
                          : 0),
                        u(s, d);
                    } while (0 !== d);
                    s.gzhead.hcrc &&
                      s.pending > l &&
                      (t.adler = T(t.adler, s.pending_buf, s.pending - l, l)),
                      0 === d && (s.status = 103);
                  } else s.status = 103;
                if (
                  (103 === s.status &&
                    (s.gzhead.hcrc
                      ? (s.pending + 2 > s.pending_buf_size && a(t),
                        s.pending + 2 <= s.pending_buf_size &&
                          (u(s, 255 & t.adler),
                          u(s, (t.adler >> 8) & 255),
                          (t.adler = 0),
                          (s.status = Y)))
                      : (s.status = Y)),
                  0 !== s.pending)
                ) {
                  if ((a(t), 0 === t.avail_out)) return (s.last_flush = -1), L;
                } else if (0 === t.avail_in && r(e) <= r(n) && e !== C) return i(t, -5);
                if (666 === s.status && 0 !== t.avail_in) return i(t, -5);
                if (0 !== t.avail_in || 0 !== s.lookahead || (e !== P && 666 !== s.status)) {
                  var f =
                    2 === s.strategy ? v(s, e) : 3 === s.strategy ? p(s, e) : w[s.level].func(s, e);
                  if (((f !== J && f !== Z) || (s.status = 666), f === X || f === J))
                    return 0 === t.avail_out && (s.last_flush = -1), L;
                  if (
                    f === q &&
                    (1 === e
                      ? O._tr_align(s)
                      : 5 !== e &&
                        (O._tr_stored_block(s, 0, 0, !1),
                        3 === e &&
                          (o(s.head),
                          0 === s.lookahead &&
                            ((s.strstart = 0), (s.block_start = 0), (s.insert = 0)))),
                    a(t),
                    0 === t.avail_out)
                  )
                    return (s.last_flush = -1), L;
                }
                return e !== C
                  ? L
                  : s.wrap <= 0
                    ? 1
                    : (2 === s.wrap
                        ? (u(s, 255 & t.adler),
                          u(s, (t.adler >> 8) & 255),
                          u(s, (t.adler >> 16) & 255),
                          u(s, (t.adler >> 24) & 255),
                          u(s, 255 & t.total_in),
                          u(s, (t.total_in >> 8) & 255),
                          u(s, (t.total_in >> 16) & 255),
                          u(s, (t.total_in >> 24) & 255))
                        : (c(s, t.adler >>> 16), c(s, 65535 & t.adler)),
                      a(t),
                      s.wrap > 0 && (s.wrap = -s.wrap),
                      0 !== s.pending ? L : 1);
              }),
              (n.deflateEnd = function (t) {
                var e;
                return t && t.state
                  ? (e = t.state.status) !== z &&
                    69 !== e &&
                    73 !== e &&
                    91 !== e &&
                    103 !== e &&
                    e !== Y &&
                    666 !== e
                    ? i(t, D)
                    : ((t.state = null), e === Y ? i(t, -3) : L)
                  : D;
              }),
              (n.deflateSetDictionary = function (t, e) {
                var n,
                  i,
                  r,
                  a,
                  s,
                  u,
                  c,
                  l,
                  d = e.length;
                if (!t || !t.state) return D;
                if (
                  ((n = t.state), 2 === (a = n.wrap) || (1 === a && n.status !== z) || n.lookahead)
                )
                  return D;
                for (
                  1 === a && (t.adler = I(t.adler, e, d, 0)),
                    n.wrap = 0,
                    d >= n.w_size &&
                      (0 === a &&
                        (o(n.head), (n.strstart = 0), (n.block_start = 0), (n.insert = 0)),
                      (l = new S.Buf8(n.w_size)),
                      S.arraySet(l, e, d - n.w_size, n.w_size, 0),
                      (e = l),
                      (d = n.w_size)),
                    s = t.avail_in,
                    u = t.next_in,
                    c = t.input,
                    t.avail_in = d,
                    t.next_in = 0,
                    t.input = e,
                    h(n);
                  n.lookahead >= j;

                ) {
                  (i = n.strstart), (r = n.lookahead - (j - 1));
                  do {
                    (n.ins_h = ((n.ins_h << n.hash_shift) ^ n.window[i + j - 1]) & n.hash_mask),
                      (n.prev[i & n.w_mask] = n.head[n.ins_h]),
                      (n.head[n.ins_h] = i),
                      i++;
                  } while (--r);
                  (n.strstart = i), (n.lookahead = j - 1), h(n);
                }
                return (
                  (n.strstart += n.lookahead),
                  (n.block_start = n.strstart),
                  (n.insert = n.lookahead),
                  (n.lookahead = 0),
                  (n.match_length = n.prev_length = j - 1),
                  (n.match_available = 0),
                  (t.next_in = u),
                  (t.input = c),
                  (t.avail_in = s),
                  (n.wrap = a),
                  L
                );
              }),
              (n.deflateInfo = 'pako deflate (from Nodeca project)');
          },
          { '../utils/common': 1, './adler32': 3, './crc32': 4, './messages': 6, './trees': 7 },
        ],
        6: [
          function (t, e, n) {
            'use strict';
            e.exports = {
              2: 'need dictionary',
              1: 'stream end',
              0: '',
              '-1': 'file error',
              '-2': 'stream error',
              '-3': 'data error',
              '-4': 'insufficient memory',
              '-5': 'buffer error',
              '-6': 'incompatible version',
            };
          },
          {},
        ],
        7: [
          function (t, e, n) {
            'use strict';
            function i(t) {
              for (var e = t.length; --e >= 0; ) t[e] = 0;
            }
            function r(t, e, n, i, r) {
              (this.static_tree = t),
                (this.extra_bits = e),
                (this.extra_base = n),
                (this.elems = i),
                (this.max_length = r),
                (this.has_stree = t && t.length);
            }
            function o(t, e) {
              (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
            }
            function a(t) {
              return t < 256 ? W[t] : W[256 + (t >>> 7)];
            }
            function s(t, e) {
              (t.pending_buf[t.pending++] = 255 & e),
                (t.pending_buf[t.pending++] = (e >>> 8) & 255);
            }
            function u(t, e, n) {
              t.bi_valid > x - n
                ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
                  s(t, t.bi_buf),
                  (t.bi_buf = e >> (x - t.bi_valid)),
                  (t.bi_valid += n - x))
                : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += n));
            }
            function c(t, e, n) {
              u(t, n[2 * e], n[2 * e + 1]);
            }
            function l(t, e) {
              var n = 0;
              do {
                (n |= 1 & t), (t >>>= 1), (n <<= 1);
              } while (--e > 0);
              return n >>> 1;
            }
            function d(t, e, n) {
              var i,
                r,
                o = new Array(D + 1),
                a = 0;
              for (i = 1; i <= D; i++) o[i] = a = (a + n[i - 1]) << 1;
              for (r = 0; r <= e; r++) {
                var s = t[2 * r + 1];
                0 !== s && (t[2 * r] = l(o[s]++, s));
              }
            }
            function h(t) {
              var e;
              for (e = 0; e < A; e++) t.dyn_ltree[2 * e] = 0;
              for (e = 0; e < P; e++) t.dyn_dtree[2 * e] = 0;
              for (e = 0; e < C; e++) t.bl_tree[2 * e] = 0;
              (t.dyn_ltree[2 * R] = 1),
                (t.opt_len = t.static_len = 0),
                (t.last_lit = t.matches = 0);
            }
            function f(t) {
              t.bi_valid > 8
                ? s(t, t.bi_buf)
                : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
                (t.bi_buf = 0),
                (t.bi_valid = 0);
            }
            function g(t, e, n, i) {
              var r = 2 * e,
                o = 2 * n;
              return t[r] < t[o] || (t[r] === t[o] && i[e] <= i[n]);
            }
            function p(t, e, n) {
              for (
                var i = t.heap[n], r = n << 1;
                r <= t.heap_len &&
                (r < t.heap_len && g(e, t.heap[r + 1], t.heap[r], t.depth) && r++,
                !g(e, i, t.heap[r], t.depth));

              )
                (t.heap[n] = t.heap[r]), (n = r), (r <<= 1);
              t.heap[n] = i;
            }
            function v(t, e, n) {
              var i,
                r,
                o,
                s,
                l = 0;
              if (0 !== t.last_lit)
                do {
                  (i = (t.pending_buf[t.d_buf + 2 * l] << 8) | t.pending_buf[t.d_buf + 2 * l + 1]),
                    (r = t.pending_buf[t.l_buf + l]),
                    l++,
                    0 === i
                      ? c(t, r, e)
                      : (c(t, (o = K[r]) + T + 1, e),
                        0 !== (s = B[o]) && u(t, (r -= z[o]), s),
                        c(t, (o = a(--i)), n),
                        0 !== (s = F[o]) && u(t, (i -= Y[o]), s));
                } while (l < t.last_lit);
              c(t, R, e);
            }
            function _(t, e) {
              var n,
                i,
                r,
                o = e.dyn_tree,
                a = e.stat_desc.static_tree,
                s = e.stat_desc.has_stree,
                u = e.stat_desc.elems,
                c = -1;
              for (t.heap_len = 0, t.heap_max = L, n = 0; n < u; n++)
                0 !== o[2 * n]
                  ? ((t.heap[++t.heap_len] = c = n), (t.depth[n] = 0))
                  : (o[2 * n + 1] = 0);
              for (; t.heap_len < 2; )
                (o[2 * (r = t.heap[++t.heap_len] = c < 2 ? ++c : 0)] = 1),
                  (t.depth[r] = 0),
                  t.opt_len--,
                  s && (t.static_len -= a[2 * r + 1]);
              for (e.max_code = c, n = t.heap_len >> 1; n >= 1; n--) p(t, o, n);
              r = u;
              do {
                (n = t.heap[1]),
                  (t.heap[1] = t.heap[t.heap_len--]),
                  p(t, o, 1),
                  (i = t.heap[1]),
                  (t.heap[--t.heap_max] = n),
                  (t.heap[--t.heap_max] = i),
                  (o[2 * r] = o[2 * n] + o[2 * i]),
                  (t.depth[r] = (t.depth[n] >= t.depth[i] ? t.depth[n] : t.depth[i]) + 1),
                  (o[2 * n + 1] = o[2 * i + 1] = r),
                  (t.heap[1] = r++),
                  p(t, o, 1);
              } while (t.heap_len >= 2);
              (t.heap[--t.heap_max] = t.heap[1]),
                (function (t, e) {
                  var n,
                    i,
                    r,
                    o,
                    a,
                    s,
                    u = e.dyn_tree,
                    c = e.max_code,
                    l = e.stat_desc.static_tree,
                    d = e.stat_desc.has_stree,
                    h = e.stat_desc.extra_bits,
                    f = e.stat_desc.extra_base,
                    g = e.stat_desc.max_length,
                    p = 0;
                  for (o = 0; o <= D; o++) t.bl_count[o] = 0;
                  for (u[2 * t.heap[t.heap_max] + 1] = 0, n = t.heap_max + 1; n < L; n++)
                    (o = u[2 * u[2 * (i = t.heap[n]) + 1] + 1] + 1) > g && ((o = g), p++),
                      (u[2 * i + 1] = o),
                      i > c ||
                        (t.bl_count[o]++,
                        (a = 0),
                        i >= f && (a = h[i - f]),
                        (s = u[2 * i]),
                        (t.opt_len += s * (o + a)),
                        d && (t.static_len += s * (l[2 * i + 1] + a)));
                  if (0 !== p) {
                    do {
                      for (o = g - 1; 0 === t.bl_count[o]; ) o--;
                      t.bl_count[o]--, (t.bl_count[o + 1] += 2), t.bl_count[g]--, (p -= 2);
                    } while (p > 0);
                    for (o = g; 0 !== o; o--)
                      for (i = t.bl_count[o]; 0 !== i; )
                        (r = t.heap[--n]) > c ||
                          (u[2 * r + 1] !== o &&
                            ((t.opt_len += (o - u[2 * r + 1]) * u[2 * r]), (u[2 * r + 1] = o)),
                          i--);
                  }
                })(t, e),
                d(o, c, t.bl_count);
            }
            function m(t, e, n) {
              var i,
                r,
                o = -1,
                a = e[1],
                s = 0,
                u = 7,
                c = 4;
              for (0 === a && ((u = 138), (c = 3)), e[2 * (n + 1) + 1] = 65535, i = 0; i <= n; i++)
                (r = a),
                  (a = e[2 * (i + 1) + 1]),
                  (++s < u && r === a) ||
                    (s < c
                      ? (t.bl_tree[2 * r] += s)
                      : 0 !== r
                        ? (r !== o && t.bl_tree[2 * r]++, t.bl_tree[2 * U]++)
                        : s <= 10
                          ? t.bl_tree[2 * k]++
                          : t.bl_tree[2 * N]++,
                    (s = 0),
                    (o = r),
                    0 === a
                      ? ((u = 138), (c = 3))
                      : r === a
                        ? ((u = 6), (c = 3))
                        : ((u = 7), (c = 4)));
            }
            function b(t, e, n) {
              var i,
                r,
                o = -1,
                a = e[1],
                s = 0,
                l = 7,
                d = 4;
              for (0 === a && ((l = 138), (d = 3)), i = 0; i <= n; i++)
                if (((r = a), (a = e[2 * (i + 1) + 1]), !(++s < l && r === a))) {
                  if (s < d)
                    do {
                      c(t, r, t.bl_tree);
                    } while (0 != --s);
                  else
                    0 !== r
                      ? (r !== o && (c(t, r, t.bl_tree), s--), c(t, U, t.bl_tree), u(t, s - 3, 2))
                      : s <= 10
                        ? (c(t, k, t.bl_tree), u(t, s - 3, 3))
                        : (c(t, N, t.bl_tree), u(t, s - 11, 7));
                  (s = 0),
                    (o = r),
                    0 === a
                      ? ((l = 138), (d = 3))
                      : r === a
                        ? ((l = 6), (d = 3))
                        : ((l = 7), (d = 4));
                }
            }
            function y(t, e, n, i) {
              u(t, (O << 1) + (i ? 1 : 0), 3),
                (function (t, e, n, i) {
                  f(t),
                    i && (s(t, n), s(t, ~n)),
                    E.arraySet(t.pending_buf, t.window, e, n, t.pending),
                    (t.pending += n);
                })(t, e, n, !0);
            }
            var E = t('../utils/common'),
              w = 0,
              S = 1,
              O = 0,
              I = 29,
              T = 256,
              A = T + 1 + I,
              P = 30,
              C = 19,
              L = 2 * A + 1,
              D = 15,
              x = 16,
              M = 7,
              R = 256,
              U = 16,
              k = 17,
              N = 18,
              B = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5,
                0,
              ],
              F = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
                12, 12, 13, 13,
              ],
              H = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              V = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
              G = new Array(2 * (A + 2));
            i(G);
            var j = new Array(2 * P);
            i(j);
            var W = new Array(512);
            i(W);
            var K = new Array(256);
            i(K);
            var z = new Array(I);
            i(z);
            var Y = new Array(P);
            i(Y);
            var X,
              q,
              J,
              Z = !1;
            (n._tr_init = function (t) {
              Z ||
                ((function () {
                  var t,
                    e,
                    n,
                    i,
                    o,
                    a = new Array(D + 1);
                  for (n = 0, i = 0; i < I - 1; i++)
                    for (z[i] = n, t = 0; t < 1 << B[i]; t++) K[n++] = i;
                  for (K[n - 1] = i, o = 0, i = 0; i < 16; i++)
                    for (Y[i] = o, t = 0; t < 1 << F[i]; t++) W[o++] = i;
                  for (o >>= 7; i < P; i++)
                    for (Y[i] = o << 7, t = 0; t < 1 << (F[i] - 7); t++) W[256 + o++] = i;
                  for (e = 0; e <= D; e++) a[e] = 0;
                  for (t = 0; t <= 143; ) (G[2 * t + 1] = 8), t++, a[8]++;
                  for (; t <= 255; ) (G[2 * t + 1] = 9), t++, a[9]++;
                  for (; t <= 279; ) (G[2 * t + 1] = 7), t++, a[7]++;
                  for (; t <= 287; ) (G[2 * t + 1] = 8), t++, a[8]++;
                  for (d(G, A + 1, a), t = 0; t < P; t++) (j[2 * t + 1] = 5), (j[2 * t] = l(t, 5));
                  (X = new r(G, B, T + 1, A, D)),
                    (q = new r(j, F, 0, P, D)),
                    (J = new r(new Array(0), H, 0, C, M));
                })(),
                (Z = !0)),
                (t.l_desc = new o(t.dyn_ltree, X)),
                (t.d_desc = new o(t.dyn_dtree, q)),
                (t.bl_desc = new o(t.bl_tree, J)),
                (t.bi_buf = 0),
                (t.bi_valid = 0),
                h(t);
            }),
              (n._tr_stored_block = y),
              (n._tr_flush_block = function (t, e, n, i) {
                var r,
                  o,
                  a = 0;
                t.level > 0
                  ? (2 === t.strm.data_type &&
                      (t.strm.data_type = (function (t) {
                        var e,
                          n = 4093624447;
                        for (e = 0; e <= 31; e++, n >>>= 1)
                          if (1 & n && 0 !== t.dyn_ltree[2 * e]) return w;
                        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
                          return S;
                        for (e = 32; e < T; e++) if (0 !== t.dyn_ltree[2 * e]) return S;
                        return w;
                      })(t)),
                    _(t, t.l_desc),
                    _(t, t.d_desc),
                    (a = (function (t) {
                      var e;
                      for (
                        m(t, t.dyn_ltree, t.l_desc.max_code),
                          m(t, t.dyn_dtree, t.d_desc.max_code),
                          _(t, t.bl_desc),
                          e = C - 1;
                        e >= 3 && 0 === t.bl_tree[2 * V[e] + 1];
                        e--
                      );
                      return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
                    })(t)),
                    (r = (t.opt_len + 3 + 7) >>> 3),
                    (o = (t.static_len + 3 + 7) >>> 3) <= r && (r = o))
                  : (r = o = n + 5),
                  n + 4 <= r && -1 !== e
                    ? y(t, e, n, i)
                    : 4 === t.strategy || o === r
                      ? (u(t, 2 + (i ? 1 : 0), 3), v(t, G, j))
                      : (u(t, 4 + (i ? 1 : 0), 3),
                        (function (t, e, n, i) {
                          var r;
                          for (u(t, e - 257, 5), u(t, n - 1, 5), u(t, i - 4, 4), r = 0; r < i; r++)
                            u(t, t.bl_tree[2 * V[r] + 1], 3);
                          b(t, t.dyn_ltree, e - 1), b(t, t.dyn_dtree, n - 1);
                        })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1),
                        v(t, t.dyn_ltree, t.dyn_dtree)),
                  h(t),
                  i && f(t);
              }),
              (n._tr_tally = function (t, e, n) {
                return (
                  (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
                  (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
                  (t.pending_buf[t.l_buf + t.last_lit] = 255 & n),
                  t.last_lit++,
                  0 === e
                    ? t.dyn_ltree[2 * n]++
                    : (t.matches++,
                      e--,
                      t.dyn_ltree[2 * (K[n] + T + 1)]++,
                      t.dyn_dtree[2 * a(e)]++),
                  t.last_lit === t.lit_bufsize - 1
                );
              }),
              (n._tr_align = function (t) {
                u(t, 2, 3),
                  c(t, R, G),
                  (function (t) {
                    16 === t.bi_valid
                      ? (s(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
                      : t.bi_valid >= 8 &&
                        ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
                        (t.bi_buf >>= 8),
                        (t.bi_valid -= 8));
                  })(t);
              });
          },
          { '../utils/common': 1 },
        ],
        8: [
          function (t, e, n) {
            'use strict';
            e.exports = function () {
              (this.input = null),
                (this.next_in = 0),
                (this.avail_in = 0),
                (this.total_in = 0),
                (this.output = null),
                (this.next_out = 0),
                (this.avail_out = 0),
                (this.total_out = 0),
                (this.msg = ''),
                (this.state = null),
                (this.data_type = 2),
                (this.adler = 0);
            };
          },
          {},
        ],
        '/lib/deflate.js': [
          function (t, e, n) {
            'use strict';
            function i(t) {
              if (!(this instanceof i)) return new i(t);
              this.options = a.assign(
                {
                  level: h,
                  method: g,
                  chunkSize: 16384,
                  windowBits: 15,
                  memLevel: 8,
                  strategy: f,
                  to: '',
                },
                t || {},
              );
              var e = this.options;
              e.raw && e.windowBits > 0
                ? (e.windowBits = -e.windowBits)
                : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16),
                (this.err = 0),
                (this.msg = ''),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new c()),
                (this.strm.avail_out = 0);
              var n = o.deflateInit2(
                this.strm,
                e.level,
                e.method,
                e.windowBits,
                e.memLevel,
                e.strategy,
              );
              if (n !== d) throw new Error(u[n]);
              if ((e.header && o.deflateSetHeader(this.strm, e.header), e.dictionary)) {
                var r;
                if (
                  ((r =
                    'string' == typeof e.dictionary
                      ? s.string2buf(e.dictionary)
                      : '[object ArrayBuffer]' === l.call(e.dictionary)
                        ? new Uint8Array(e.dictionary)
                        : e.dictionary),
                  (n = o.deflateSetDictionary(this.strm, r)) !== d)
                )
                  throw new Error(u[n]);
                this._dict_set = !0;
              }
            }
            function r(t, e) {
              var n = new i(e);
              if ((n.push(t, !0), n.err)) throw n.msg || u[n.err];
              return n.result;
            }
            var o = t('./zlib/deflate'),
              a = t('./utils/common'),
              s = t('./utils/strings'),
              u = t('./zlib/messages'),
              c = t('./zlib/zstream'),
              l = Object.prototype.toString,
              d = 0,
              h = -1,
              f = 0,
              g = 8;
            (i.prototype.push = function (t, e) {
              var n,
                i,
                r = this.strm,
                u = this.options.chunkSize;
              if (this.ended) return !1;
              (i = e === ~~e ? e : !0 === e ? 4 : 0),
                'string' == typeof t
                  ? (r.input = s.string2buf(t))
                  : '[object ArrayBuffer]' === l.call(t)
                    ? (r.input = new Uint8Array(t))
                    : (r.input = t),
                (r.next_in = 0),
                (r.avail_in = r.input.length);
              do {
                if (
                  (0 === r.avail_out &&
                    ((r.output = new a.Buf8(u)), (r.next_out = 0), (r.avail_out = u)),
                  1 !== (n = o.deflate(r, i)) && n !== d)
                )
                  return this.onEnd(n), (this.ended = !0), !1;
                (0 !== r.avail_out && (0 !== r.avail_in || (4 !== i && 2 !== i))) ||
                  ('string' === this.options.to
                    ? this.onData(s.buf2binstring(a.shrinkBuf(r.output, r.next_out)))
                    : this.onData(a.shrinkBuf(r.output, r.next_out)));
              } while ((r.avail_in > 0 || 0 === r.avail_out) && 1 !== n);
              return 4 === i
                ? ((n = o.deflateEnd(this.strm)), this.onEnd(n), (this.ended = !0), n === d)
                : 2 !== i || (this.onEnd(d), (r.avail_out = 0), !0);
            }),
              (i.prototype.onData = function (t) {
                this.chunks.push(t);
              }),
              (i.prototype.onEnd = function (t) {
                t === d &&
                  ('string' === this.options.to
                    ? (this.result = this.chunks.join(''))
                    : (this.result = a.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = t),
                  (this.msg = this.strm.msg);
              }),
              (n.Deflate = i),
              (n.deflate = r),
              (n.deflateRaw = function (t, e) {
                return ((e = e || {}).raw = !0), r(t, e);
              }),
              (n.gzip = function (t, e) {
                return ((e = e || {}).gzip = !0), r(t, e);
              });
          },
          {
            './utils/common': 1,
            './utils/strings': 2,
            './zlib/deflate': 5,
            './zlib/messages': 6,
            './zlib/zstream': 8,
          },
        ],
      },
      {},
      [],
    )('/lib/deflate.js'));
  var __awaiter =
      (this && this.__awaiter) ||
      function (t, e, n, i) {
        return new (n || (n = Promise))(function (r, o) {
          function a(t) {
            try {
              u(i.next(t));
            } catch (t) {
              o(t);
            }
          }
          function s(t) {
            try {
              u(i.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function u(t) {
            var e;
            t.done
              ? r(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((i = i.apply(t, e || [])).next());
        });
      },
    __generator =
      (this && this.__generator) ||
      function (t, e) {
        var n,
          i,
          r,
          o,
          a = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function s(o) {
          return function (s) {
            return (function (o) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & o[0]
                          ? i.return
                          : o[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, o[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                    case 0:
                    case 1:
                      r = o;
                      break;
                    case 4:
                      return a.label++, { value: o[1], done: !1 };
                    case 5:
                      a.label++, (i = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = a.trys).length > 0 && r[r.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                        a.label = o[1];
                        break;
                      }
                      if (6 === o[0] && a.label < r[1]) {
                        (a.label = r[1]), (r = o);
                        break;
                      }
                      if (r && a.label < r[2]) {
                        (a.label = r[2]), a.ops.push(o);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  o = e.call(t, a);
                } catch (t) {
                  (o = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, s]);
          };
        }
      },
    __assign =
      (this && this.__assign) ||
      function () {
        return (__assign =
          Object.assign ||
          function (t) {
            for (var e, n = 1, i = arguments.length; n < i; n++)
              for (var r in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t;
          }).apply(this, arguments);
      };
  !(function (t) {
    !(function (e) {
      var n = (function () {
        function n() {
          (this._isIphoneOrIPad = !1),
            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) &&
              (this._isIphoneOrIPad = !0),
            this.initUAParser();
        }
        return (
          Object.defineProperty(n.prototype, 'userAgentData', {
            get: function () {
              return this._userAgentData;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'deviceType', {
            get: function () {
              return (
                this._deviceType ||
                  (e.Util.isMobile
                    ? (this._deviceType =
                        this.mobileType || this.desktopType || n.UNKNOWN_DEVICE_TYPE)
                    : (this._deviceType =
                        this.desktopType || this.mobileType || n.UNKNOWN_DEVICE_TYPE)),
                this._deviceType
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'isIphoneOrIPad', {
            get: function () {
              return this._isIphoneOrIPad;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'browserName', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.browser &&
                this._userAgentData.browser.name
                ? this._userAgentData.browser.name.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'browserVersion', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.browser &&
                this._userAgentData.browser.version
                ? this._userAgentData.browser.version.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'browserMajor', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.browser &&
                this._userAgentData.browser.major
                ? this._userAgentData.browser.major.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'browserType', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.browser &&
                this._userAgentData.browser.type
                ? this._userAgentData.browser.type.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'osName', {
            get: function () {
              return this._userAgentData && this._userAgentData.os && this._userAgentData.os.name
                ? this._userAgentData.os.name.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'osVersion', {
            get: function () {
              return this._userAgentData && this._userAgentData.os && this._userAgentData.os.version
                ? this._userAgentData.os.version.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'deviceCategory', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.device &&
                this._userAgentData.device.type
                ? this._userAgentData.device.type.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'engineName', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.engine &&
                this._userAgentData.engine.name
                ? this._userAgentData.engine.name.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'engineVersion', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.engine &&
                this._userAgentData.engine.version
                ? this._userAgentData.engine.version.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'cpuArchitecture', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.cpu &&
                this._userAgentData.cpu.architecture
                ? this._userAgentData.cpu.architecture.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'deviceModel', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.device &&
                this._userAgentData.device.model
                ? this._userAgentData.device.model.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'deviceVendor', {
            get: function () {
              return this._userAgentData &&
                this._userAgentData.device &&
                this._userAgentData.device.vendor
                ? this._userAgentData.device.vendor.trim()
                : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'desktopType', {
            get: function () {
              var t = this.browserName;
              this.browserVersion && (t = t + '(' + this.browserVersion + ')');
              var e = this.osName;
              this.osVersion && (e = e + '(' + this.osVersion + ')');
              var n = t && e ? t + '-' + e : t || e;
              return n ? n.trim() : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'mobileType', {
            get: function () {
              var t = this.deviceModel,
                e = this.deviceVendor,
                n = t && e ? t + ' ' + e : t || e;
              return n ? n.trim() : '';
            },
            enumerable: !1,
            configurable: !0,
          }),
          (n.prototype.initUAParser = function () {
            try {
              var n = new t.UAParser();
              n.setUA(navigator.userAgent), (this._userAgentData = n.getResult());
            } catch (t) {
              e.Logger.warn('UAParser failure', t);
            }
          }),
          (n.UNKNOWN_DEVICE_TYPE = 'unknown'),
          n
        );
      })();
      e.BrowserInfo = n;
    })(t._POSignalsUtils || (t._POSignalsUtils = {}));
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (t) {
        var e = (function () {
          function t() {}
          return (
            Object.defineProperty(t, 'CLIENT_VERSION', {
              get: function () {
                return '5.6.4w';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'SALT', {
              get: function () {
                return 'ST8irbd3bB';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'TAB_UUID_KEY', {
              get: function () {
                return 'pos_tid';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'OPS_KEY', {
              get: function () {
                return 'pos_ops';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'DEVICE_ID_KEY', {
              get: function () {
                return 'SecuredTouchDeviceId';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'DEVICE_ID_CREATED_AT', {
              get: function () {
                return 'pos_dca';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'LAST_DEVICE_KEY_RESYNC', {
              get: function () {
                return 'DeviceRefreshDate';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'CAPTURED_KEYBOARD_INTERACTIONS', {
              get: function () {
                return 'pos_cki';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'CAPTURED_MOUSE_INTERACTIONS', {
              get: function () {
                return 'pos_cmi';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'CAPTURED_GESTURES', {
              get: function () {
                return 'pos_cg';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'CAPTURED_INDIRECT', {
              get: function () {
                return 'pos_cie';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'CAPTURED_TAGS', {
              get: function () {
                return 'pos_ct';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'CAPTURED_MOUSE_INTERACTIONS_SUMMARY', {
              get: function () {
                return 'pos_mdp';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'KEYBOARD_INTERACTIONS_COUNT', {
              get: function () {
                return 'pos_kic';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'MOUSE_INTERACTIONS_COUNT', {
              get: function () {
                return 'pos_mic';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'GESTURES_COUNT', {
              get: function () {
                return 'pos_gc';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'EVENT_COUNTERS', {
              get: function () {
                return 'pos_ec';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'PINGID_AGENT_DEFAULT_PORT', {
              get: function () {
                return 9400;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'PINGID_AGENT_DEFAULT_TIMEOUT', {
              get: function () {
                return 1e3;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'MOUSE_EVENT_COUNTERS', {
              get: function () {
                return 'pos_mec';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'KEYBOARD_EVENT_COUNTERS', {
              get: function () {
                return 'pos_kec';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'TOUCH_EVENT_COUNTERS', {
              get: function () {
                return 'pos_tec';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'INDIRECT_EVENT_COUNTERS', {
              get: function () {
                return 'pos_iec';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'GeoDataKey', {
              get: function () {
                return 'pos_geo';
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })();
        t.Constants = e;
      })(t._POSignalsUtils || (t._POSignalsUtils = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (t) {
        var e = (function () {
          function e(t, e, n) {
            if (
              (void 0 === t && (t = 'ECDSA'),
              void 0 === e && (e = ['sign', 'verify']),
              void 0 === n && (n = 'SHA-256'),
              (this.signingKeyType = t),
              (this.keyUsage = e),
              (this.algorithm = n),
              (this._crypto = window.crypto || window.msCrypto),
              !this._crypto || !this._crypto.subtle)
            )
              throw new Error('Cryptography API not supported in this browser');
          }
          return (
            (e.prototype.generateKeys = function () {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (t) {
                  return [
                    2,
                    this._crypto.subtle.generateKey(
                      { name: this.signingKeyType, namedCurve: 'P-256' },
                      !1,
                      this.keyUsage,
                    ),
                  ];
                });
              });
            }),
            (e.prototype.exportPublicKey = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n, i, r, o;
                return __generator(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return [4, this._crypto.subtle.exportKey('spki', e.publicKey)];
                    case 1:
                      return (
                        (n = a.sent()),
                        (i = t.Util.ab2str(n)),
                        (r = btoa(i)),
                        (o = '-----BEGIN PUBLIC KEY-----\n' + r + '\n-----END PUBLIC KEY-----'),
                        t.Logger.debug('Exported base64 pub key: ', o),
                        [2, o]
                      );
                  }
                });
              });
            }),
            (e.prototype.exportPublicKeyJwk = function (t) {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, window.crypto.subtle.exportKey('jwk', t.publicKey)];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.exportPrivateKey = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n, i, r, o;
                return __generator(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return [4, this._crypto.subtle.exportKey('pkcs8', e.privateKey)];
                    case 1:
                      return (
                        (n = a.sent()),
                        (i = t.Util.ab2str(n)),
                        (r = btoa(i)),
                        (o = '-----BEGIN PRIVATE KEY-----\n' + r + '\n-----END PRIVATE KEY-----'),
                        t.Logger.debug('Exported base64 pem:', o),
                        [2, o]
                      );
                  }
                });
              });
            }),
            (e.prototype.signJWT = function (e, n, i, r, o) {
              return (
                void 0 === i && (i = 0),
                __awaiter(this, void 0, void 0, function () {
                  var i, a, s, u, c, l, d, h, f;
                  return __generator(this, function (g) {
                    switch (g.label) {
                      case 0:
                        return [4, this.exportPublicKeyJwk(n)];
                      case 1:
                        if (
                          ((i = g.sent()),
                          (a = { alg: 'ES256', typ: 'JWT', jwk: i, kid: o }),
                          (s = { deviceAttributesSerialized: e, iat: Math.floor(r / 1e3) }),
                          !n.privateKey)
                        )
                          throw new Error('Require key');
                        if ('ES256' !== a.alg && 'JWT' !== a.typ)
                          throw new Error(
                            'jwt-encode only support the ES256 algorithm and the JWT type of hash',
                          );
                        return (
                          (u = t.Util.encode(a)),
                          (c = t.Util.encode(s)),
                          (l = u + '.' + c),
                          (d = t.Util.string2buf(l)),
                          [
                            4,
                            this._crypto.subtle.sign(
                              { name: this.signingKeyType, hash: this.algorithm },
                              n.privateKey,
                              d,
                            ),
                          ]
                        );
                      case 2:
                        return (
                          (h = g.sent()),
                          (f = t.Util.base64url(btoa(t.Util.ab2str(h)))),
                          t.Logger.debug('Signed JWT: ', l + '.' + f),
                          [2, l + '.' + f]
                        );
                    }
                  });
                })
              );
            }),
            (e.prototype.verifyJwtToken = function (e, n) {
              return __awaiter(this, void 0, void 0, function () {
                var i, r, o, a, s, u, c;
                return __generator(this, function (l) {
                  switch (l.label) {
                    case 0:
                      if (
                        ((i = e.split('.')),
                        (r = i[0]),
                        (o = i[1]),
                        (a = i[2]),
                        'ES256' !== (s = t.Util.parseJwt(r)).alg && 'JWT' !== s.typ)
                      )
                        throw new Error(
                          'JWT header supports only ES256 algorithm and the JWT type of hash',
                        );
                      return (
                        t.Util.parseJwt(o),
                        (u = Uint8Array.from(
                          atob(a.replace(/-/g, '+').replace(/_/g, '/')),
                          function (t) {
                            return t.charCodeAt(0);
                          },
                        )),
                        (c = t.Util.string2buf(r + '.' + o)),
                        [
                          4,
                          this._crypto.subtle.verify(
                            { name: this.signingKeyType, hash: this.algorithm },
                            n,
                            u,
                            c,
                          ),
                        ]
                      );
                    case 1:
                      return [2, l.sent()];
                  }
                });
              });
            }),
            e
          );
        })();
        t.CryptoOperator = e;
      })(t._POSignalsUtils || (t._POSignalsUtils = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (t) {
        var e = (function () {
          function t() {}
          return (
            Object.defineProperty(t, 'isLogEnabled', {
              get: function () {
                return this._isLogEnabled || window['enable-logs-pingOneSignals'];
              },
              set: function (t) {
                this._isLogEnabled = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.debug = function (e) {
              for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
              (e = t.TAG + ' ' + e),
                t.isLogEnabled &&
                  (n && n.length > 0
                    ? console.debug
                      ? console.debug(e, n)
                      : console.log(e, n)
                    : console.debug
                      ? console.debug(e)
                      : console.log(e));
            }),
            (t.error = function (e) {
              for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
              (e = t.TAG + ' ' + e),
                t.isLogEnabled && (n && n.length > 0 ? console.error(e, n) : console.error(e));
            }),
            (t.warn = function (e) {
              for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
              (e = t.TAG + ' ' + e),
                t.isLogEnabled && (n && n.length > 0 ? console.warn(e, n) : console.warn(e));
            }),
            (t.info = function (e) {
              for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
              (e = t.TAG + ' ' + e),
                t.isLogEnabled && (n && n.length > 0 ? console.info(e, n) : console.info(e));
            }),
            (t.TAG = '[SignalsSDK]'),
            t
          );
        })();
        t.Logger = e;
      })(t._POSignalsUtils || (t._POSignalsUtils = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (t) {
        var e = (function () {
          function t() {}
          return (
            Object.defineProperty(t, 'INITIALIZATION_ERROR', {
              get: function () {
                return 'INITIALIZATION_ERROR';
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, 'UNEXPECTED_ERROR', {
              get: function () {
                return 'UNEXPECTED_ERROR';
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })();
        t.POErrorCodes = e;
      })(t._POSignalsUtils || (t._POSignalsUtils = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {}));
  var Browser = {
      115: '115',
      2345: '2345',
      360: '360',
      ALIPAY: 'Alipay',
      AMAYA: 'Amaya',
      ANDROID: 'Android Browser',
      ARORA: 'Arora',
      AVANT: 'Avant',
      AVAST: 'Avast Secure Browser',
      AVG: 'AVG Secure Browser',
      BAIDU: 'Baidu Browser',
      BASILISK: 'Basilisk',
      BLAZER: 'Blazer',
      BOLT: 'Bolt',
      BOWSER: 'Bowser',
      BRAVE: 'Brave',
      CAMINO: 'Camino',
      CHIMERA: 'Chimera',
      CHROME: 'Chrome',
      CHROME_HEADLESS: 'Chrome Headless',
      CHROME_MOBILE: 'Mobile Chrome',
      CHROME_WEBVIEW: 'Chrome WebView',
      CHROMIUM: 'Chromium',
      COBALT: 'Cobalt',
      COC_COC: 'Coc Coc',
      CONKEROR: 'Conkeror',
      DAUM: 'Daum',
      DILLO: 'Dillo',
      DOLPHIN: 'Dolphin',
      DORIS: 'Doris',
      DRAGON: 'Dragon',
      DUCKDUCKGO: 'DuckDuckGo',
      EDGE: 'Edge',
      EPIPHANY: 'Epiphany',
      FACEBOOK: 'Facebook',
      FALKON: 'Falkon',
      FIREBIRD: 'Firebird',
      FIREFOX: 'Firefox',
      FIREFOX_FOCUS: 'Firefox Focus',
      FIREFOX_MOBILE: 'Mobile Firefox',
      FIREFOX_REALITY: 'Firefox Reality',
      FENNEC: 'Fennec',
      FLOCK: 'Flock',
      FLOW: 'Flow',
      GO: 'GoBrowser',
      GOOGLE_SEARCH: 'GSA',
      HELIO: 'Helio',
      HEYTAP: 'HeyTap',
      HONOR: 'Honor',
      HUAWEI: 'Huawei Browser',
      ICAB: 'iCab',
      ICE: 'ICE Browser',
      ICEAPE: 'IceApe',
      ICECAT: 'IceCat',
      ICEDRAGON: 'IceDragon',
      ICEWEASEL: 'IceWeasel',
      IE: 'IE',
      INSTAGRAM: 'Instagram',
      IRIDIUM: 'Iridium',
      IRON: 'Iron',
      JASMINE: 'Jasmine',
      KONQUEROR: 'Konqueror',
      KAKAO: 'KakaoTalk',
      KHTML: 'KHTML',
      K_MELEON: 'K-Meleon',
      KLAR: 'Klar',
      KLARNA: 'Klarna',
      KINDLE: 'Kindle',
      LENOVO: 'Smart Lenovo Browser',
      LADYBIRD: 'Ladybird',
      LIBREWOLF: 'LibreWolf',
      LIEBAO: 'LBBROWSER',
      LINE: 'Line',
      LINKEDIN: 'LinkedIn',
      LINKS: 'Links',
      LUNASCAPE: 'Lunascape',
      LYNX: 'Lynx',
      MAEMO: 'Maemo Browser',
      MAXTHON: 'Maxthon',
      MIDORI: 'Midori',
      MINIMO: 'Minimo',
      MIUI: 'MIUI Browser',
      MOZILLA: 'Mozilla',
      MOSAIC: 'Mosaic',
      NAVER: 'Naver',
      NETFRONT: 'NetFront',
      NETSCAPE: 'Netscape',
      NETSURF: 'Netsurf',
      NOKIA: 'Nokia Browser',
      OBIGO: 'Obigo',
      OCULUS: 'Oculus Browser',
      OMNIWEB: 'OmniWeb',
      OPERA: 'Opera',
      OPERA_COAST: 'Opera Coast',
      OPERA_GX: 'Opera GX',
      OPERA_MINI: 'Opera Mini',
      OPERA_MOBI: 'Opera Mobi',
      OPERA_TABLET: 'Opera Tablet',
      OPERA_TOUCH: 'Opera Touch',
      OVI: 'OviBrowser',
      PALEMOON: 'PaleMoon',
      PHANTOMJS: 'PhantomJS',
      PHOENIX: 'Phoenix',
      PICOBROWSER: 'Pico Browser',
      POLARIS: 'Polaris',
      PUFFIN: 'Puffin',
      QQ: 'QQBrowser',
      QQ_LITE: 'QQBrowserLite',
      QUARK: 'Quark',
      QUPZILLA: 'QupZilla',
      REKONQ: 'rekonq',
      ROCKMELT: 'Rockmelt',
      SAFARI: 'Safari',
      SAFARI_MOBILE: 'Mobile Safari',
      SAILFISH: 'Sailfish Browser',
      SAMSUNG: 'Samsung Internet',
      SEAMONKEY: 'SeaMonkey',
      SILK: 'Silk',
      SKYFIRE: 'Skyfire',
      SLEIPNIR: 'Sleipnir',
      SLIMBOAT: 'SlimBoat',
      SLIMBROWSER: 'SlimBrowser',
      SLIMJET: 'Slimjet',
      SNAPCHAT: 'Snapchat',
      SOGOU_EXPLORER: 'Sogou Explorer',
      SOGOU_MOBILE: 'Sogou Mobile',
      SWIFTFOX: 'Swiftfox',
      TESLA: 'Tesla',
      TIKTOK: 'TikTok',
      TIZEN: 'Tizen Browser',
      TWITTER: 'Twitter',
      UC: 'UCBrowser',
      UP: 'UP.Browser',
      VIVALDI: 'Vivaldi',
      VIVO: 'Vivo Browser',
      W3M: 'w3m',
      WATERFOX: 'Waterfox',
      WEBKIT: 'WebKit',
      WECHAT: 'WeChat',
      WEIBO: 'Weibo',
      WHALE: 'Whale',
      WOLVIC: 'Wolvic',
      YANDEX: 'Yandex',
    },
    BrowserType = {
      CRAWLER: 'crawler',
      CLI: 'cli',
      EMAIL: 'email',
      FETCHER: 'fetcher',
      INAPP: 'inapp',
      MEDIAPLAYER: 'mediaplayer',
      LIBRARY: 'library',
    },
    CPU = {
      '68K': '68k',
      ARM: 'arm',
      ARM_64: 'arm64',
      ARM_HF: 'armhf',
      AVR: 'avr',
      AVR_32: 'avr32',
      IA64: 'ia64',
      IRIX: 'irix',
      IRIX_64: 'irix64',
      MIPS: 'mips',
      MIPS_64: 'mips64',
      PA_RISC: 'pa-risc',
      PPC: 'ppc',
      SPARC: 'sparc',
      SPARC_64: 'sparc64',
      X86: 'ia32',
      X86_64: 'amd64',
    },
    Device = {
      CONSOLE: 'console',
      DESKTOP: 'desktop',
      EMBEDDED: 'embedded',
      MOBILE: 'mobile',
      SMARTTV: 'smarttv',
      TABLET: 'tablet',
      WEARABLE: 'wearable',
      XR: 'xr',
    },
    Vendor = {
      ACER: 'Acer',
      ADVAN: 'Advan',
      ALCATEL: 'Alcatel',
      APPLE: 'Apple',
      AMAZON: 'Amazon',
      ARCHOS: 'Archos',
      ASUS: 'ASUS',
      ATT: 'AT&T',
      BENQ: 'BenQ',
      BLACKBERRY: 'BlackBerry',
      CAT: 'Cat',
      DELL: 'Dell',
      ENERGIZER: 'Energizer',
      ESSENTIAL: 'Essential',
      FACEBOOK: 'Facebook',
      FAIRPHONE: 'Fairphone',
      GEEKSPHONE: 'GeeksPhone',
      GENERIC: 'Generic',
      GOOGLE: 'Google',
      HMD: 'HMD',
      HP: 'HP',
      HTC: 'HTC',
      HUAWEI: 'Huawei',
      IMO: 'IMO',
      INFINIX: 'Infinix',
      ITEL: 'itel',
      JOLLA: 'Jolla',
      KOBO: 'Kobo',
      LENOVO: 'Lenovo',
      LG: 'LG',
      MEIZU: 'Meizu',
      MICROMAX: 'Micromax',
      MICROSOFT: 'Microsoft',
      MOTOROLA: 'Motorola',
      NEXIAN: 'Nexian',
      NINTENDO: 'Nintendo',
      NOKIA: 'Nokia',
      NOTHING: 'Nothing',
      NVIDIA: 'Nvidia',
      ONEPLUS: 'OnePlus',
      OPPO: 'OPPO',
      OUYA: 'Ouya',
      PALM: 'Palm',
      PANASONIC: 'Panasonic',
      PEBBLE: 'Pebble',
      PICO: 'Pico',
      POLYTRON: 'Polytron',
      REALME: 'Realme',
      RIM: 'RIM',
      ROKU: 'Roku',
      SAMSUNG: 'Samsung',
      SHARP: 'Sharp',
      SIEMENS: 'Siemens',
      SMARTFREN: 'Smartfren',
      SONY: 'Sony',
      SPRINT: 'Sprint',
      TCL: 'TCL',
      TECHNISAT: 'TechniSAT',
      TECNO: 'Tecno',
      TESLA: 'Tesla',
      ULEFONE: 'Ulefone',
      VIVO: 'Vivo',
      VODAFONE: 'Vodafone',
      XBOX: 'Xbox',
      XIAOMI: 'Xiaomi',
      ZEBRA: 'Zebra',
      ZTE: 'ZTE',
    },
    Engine = {
      AMAYA: 'Amaya',
      ARKWEB: 'ArkWeb',
      BLINK: 'Blink',
      EDGEHTML: 'EdgeHTML',
      FLOW: 'Flow',
      GECKO: 'Gecko',
      GOANNA: 'Goanna',
      ICAB: 'iCab',
      KHTML: 'KHTML',
      LIBWEB: 'LibWeb',
      LINKS: 'Links',
      LYNX: 'Lynx',
      NETFRONT: 'NetFront',
      NETSURF: 'NetSurf',
      PRESTO: 'Presto',
      SERVO: 'Servo',
      TASMAN: 'Tasman',
      TRIDENT: 'Trident',
      W3M: 'w3m',
      WEBKIT: 'WebKit',
    },
    UAParserEnumOS = {
      AIX: 'AIX',
      AMIGA_OS: 'Amiga OS',
      ANDROID: 'Android',
      ANDROID_X86: 'Android-x86',
      ARCH: 'Arch',
      BADA: 'Bada',
      BEOS: 'BeOS',
      BLACKBERRY: 'BlackBerry',
      CENTOS: 'CentOS',
      CHROME_OS: 'Chrome OS',
      CHROMECAST: 'Chromecast',
      CHROMECAST_ANDROID: 'Chromecast Android',
      CHROMECAST_FUCHSIA: 'Chromecast Fuchsia',
      CHROMECAST_LINUX: 'Chromecast Linux',
      CHROMECAST_SMARTSPEAKER: 'Chromecast SmartSpeaker',
      CONTIKI: 'Contiki',
      DEBIAN: 'Debian',
      DEEPIN: 'Deepin',
      DRAGONFLY: 'DragonFly',
      ELEMENTARY_OS: 'elementary OS',
      FEDORA: 'Fedora',
      FIREFOX_OS: 'Firefox OS',
      FREEBSD: 'FreeBSD',
      FUCHSIA: 'Fuchsia',
      GENTOO: 'Gentoo',
      GHOSTBSD: 'GhostBSD',
      GNU: 'GNU',
      HAIKU: 'Haiku',
      HARMONYOS: 'HarmonyOS',
      HP_UX: 'HP-UX',
      HURD: 'Hurd',
      IOS: 'iOS',
      JOLI: 'Joli',
      KAIOS: 'KaiOS',
      KUBUNTU: 'Kubuntu',
      LINPUS: 'Linpus',
      LINSPIRE: 'Linspire',
      LINUX: 'Linux',
      MACOS: 'macOS',
      MAEMO: 'Maemo',
      MAGEIA: 'Mageia',
      MANDRIVA: 'Mandriva',
      MANJARO: 'Manjaro',
      MEEGO: 'MeeGo',
      MINIX: 'Minix',
      MINT: 'Mint',
      MORPH_OS: 'Morph OS',
      NETBSD: 'NetBSD',
      NETRANGE: 'NetRange',
      NETTV: 'NetTV',
      NINTENDO: 'Nintendo',
      OPENHARMONY: 'OpenHarmony',
      OPENBSD: 'OpenBSD',
      OPENVMS: 'OpenVMS',
      OS2: 'OS/2',
      PALM: 'Palm',
      PC_BSD: 'PC-BSD',
      PCLINUXOS: 'PCLinuxOS',
      PICO: 'Pico',
      PLAN9: 'Plan9',
      PLAYSTATION: 'PlayStation',
      QNX: 'QNX',
      RASPBIAN: 'Raspbian',
      REDHAT: 'RedHat',
      RIM_TABLET_OS: 'RIM Tablet OS',
      RISC_OS: 'RISC OS',
      SABAYON: 'Sabayon',
      SAILFISH: 'Sailfish',
      SERENITYOS: 'SerenityOS',
      SERIES40: 'Series40',
      SLACKWARE: 'Slackware',
      SOLARIS: 'Solaris',
      SUSE: 'SUSE',
      SYMBIAN: 'Symbian',
      TIZEN: 'Tizen',
      UBUNTU: 'Ubuntu',
      UBUNTU_TOUCH: 'Ubuntu Touch',
      UNIX: 'Unix',
      VECTORLINUX: 'VectorLinux',
      WATCHOS: 'watchOS',
      WEBOS: 'WebOS',
      WINDOWS: 'Windows',
      WINDOWS_IOT: 'Windows IoT',
      WINDOWS_MOBILE: 'Windows Mobile',
      WINDOWS_PHONE: 'Windows Phone',
      XBOX: 'Xbox',
      ZENWALK: 'Zenwalk',
    };
  !(function (t) {
    !(function (t) {
      var e = (function () {
        function t() {}
        return (
          Object.defineProperty(t, 'Browser', {
            get: function () {
              return Browser;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t, 'BrowserType', {
            get: function () {
              return BrowserType;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t, 'CPU', {
            get: function () {
              return CPU;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t, 'Device', {
            get: function () {
              return Device;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t, 'Vendor', {
            get: function () {
              return Vendor;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t, 'Engine', {
            get: function () {
              return Engine;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t, 'UAParserEnumOS', {
            get: function () {
              return UAParserEnumOS;
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })();
      t.UAParserEnums = e;
    })(t._POSignalsUtils || (t._POSignalsUtils = {}));
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function n() {}
          return (
            Object.defineProperty(n, 'isMobile', {
              get: function () {
                var t,
                  e = !1;
                return (
                  (t = navigator.userAgent || navigator.vendor || window.opera),
                  (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    t,
                  ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                      t.substr(0, 4),
                    )) &&
                    (e = !0),
                  e
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.newGuid = function () {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
                var e = (16 * Math.random()) | 0;
                return ('x' === t ? e : (3 & e) | 8).toString(16);
              });
            }),
            (n.ieFix = function () {
              (-1 != navigator.userAgent.indexOf('MSIE')
                ? /MSIE (\d+\.\d+);/
                : /Trident.*rv[ :]*(\d+\.\d+)/
              ).test(navigator.userAgent) &&
                (document.body.setAttribute('style', '-ms-touch-action:none;'),
                (document.body.style.touchAction = 'none'),
                (document.body.style.msTouchAction = 'none'));
            }),
            (n.now = function () {
              var t = window.performance || {};
              return (
                (t.now =
                  t.now ||
                  t.webkitNow ||
                  t.msNow ||
                  t.oNow ||
                  t.mozNow ||
                  function () {
                    return new Date().getTime();
                  }),
                t.now()
              );
            }),
            (n.base64Uint8Array = function (t) {
              var e,
                n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                i = t.length,
                r = '';
              for (e = 0; e < i; e += 3)
                (r += n[t[e] >> 2]),
                  (r += n[((3 & t[e]) << 4) | (t[e + 1] >> 4)]),
                  (r += n[((15 & t[e + 1]) << 2) | (t[e + 2] >> 6)]),
                  (r += n[63 & t[e + 2]]);
              return (
                i % 3 == 2
                  ? (r = r.substring(0, r.length - 1) + '=')
                  : i % 3 == 1 && (r = r.substring(0, r.length - 2) + '=='),
                r
              );
            }),
            (n.string2buf = function (t) {
              if ('function' == typeof TextEncoder && TextEncoder.prototype.encode)
                return new TextEncoder().encode(t);
              var e,
                n,
                i,
                r,
                o,
                a = t.length,
                s = 0;
              for (r = 0; r < a; r++)
                55296 == (64512 & (n = t.charCodeAt(r))) &&
                  r + 1 < a &&
                  56320 == (64512 & (i = t.charCodeAt(r + 1))) &&
                  ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++),
                  (s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
              for (e = new Uint8Array(s), o = 0, r = 0; o < s; r++)
                55296 == (64512 & (n = t.charCodeAt(r))) &&
                  r + 1 < a &&
                  56320 == (64512 & (i = t.charCodeAt(r + 1))) &&
                  ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++),
                  n < 128
                    ? (e[o++] = n)
                    : n < 2048
                      ? ((e[o++] = 192 | (n >>> 6)), (e[o++] = 128 | (63 & n)))
                      : n < 65536
                        ? ((e[o++] = 224 | (n >>> 12)),
                          (e[o++] = 128 | ((n >>> 6) & 63)),
                          (e[o++] = 128 | (63 & n)))
                        : ((e[o++] = 240 | (n >>> 18)),
                          (e[o++] = 128 | ((n >>> 12) & 63)),
                          (e[o++] = 128 | ((n >>> 6) & 63)),
                          (e[o++] = 128 | (63 & n)));
              return e;
            }),
            (n.utf8Encode = function (t) {
              t = t.replace(/\r\n/g, '\n');
              for (var e = '', n = 0; n < t.length; n++) {
                var i = t.charCodeAt(n);
                i < 128
                  ? (e += String.fromCharCode(i))
                  : i > 127 && i < 2048
                    ? ((e += String.fromCharCode((i >> 6) | 192)),
                      (e += String.fromCharCode((63 & i) | 128)))
                    : ((e += String.fromCharCode((i >> 12) | 224)),
                      (e += String.fromCharCode(((i >> 6) & 63) | 128)),
                      (e += String.fromCharCode((63 & i) | 128)));
              }
              return e;
            }),
            (n.hash = function (i) {
              var r = n.hashCache.get(i);
              return r || ((r = t.sha256(i + e.Constants.SALT)), n.hashCache.set(i, r)), r;
            }),
            (n.hashMini = function (t) {
              var e,
                n,
                i = '' + JSON.stringify(t),
                r = 2166136261;
              for (e = 0, n = i.length; e < n; e++) r = (Math.imul(31, r) + i.charCodeAt(e)) | 0;
              return ('0000000' + (r >>> 0).toString(16)).substr(-8);
            }),
            (n.hashCode = function (t) {
              var e = 0,
                n = t ? t.length : 0,
                i = 0;
              if (n > 0) for (; i < n; ) e = ((e << 5) - e + t.charCodeAt(i++)) | 0;
              return e;
            }),
            (n.mod = function (t, e) {
              return ((n.hashCode(t) % e) + e) % e;
            }),
            (n.isEmail = function (t) {
              try {
                return (
                  t &&
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    t.toLowerCase(),
                  )
                );
              } catch (t) {
                return e.Logger.warn('isEmail function failed to parse string', t), !1;
              }
            }),
            (n.getEmailDomain = function (t) {
              return n.isEmail(t) ? t.substring(t.lastIndexOf('@') + 1) : '';
            }),
            (n.extendPrimitiveValues = function (t, e, i) {
              for (var r = n.allKeys(e), o = 0; o < r.length; )
                n.isObject(e[r[o]]) || (i && (!i || void 0 !== t[r[o]])) || (t[r[o]] = e[r[o]]),
                  o++;
              return t;
            }),
            (n.flatten = function (t) {
              var e = {};
              return n.dive('', t, e), e;
            }),
            (n.isFunction = function (t) {
              return t && 'function' == typeof t;
            }),
            (n.isPassiveSupported = function () {
              var t = !1,
                e = function () {};
              try {
                var n = {
                  get passive() {
                    return (t = !0), !0;
                  },
                };
                window.addEventListener('test', e, n), window.removeEventListener('test', e, !1);
              } catch (e) {
                t = !1;
              }
              return t;
            }),
            (n.getAttribute = function (t, e) {
              try {
                if (t && 'function' == typeof t.getAttribute) return t.getAttribute(e) || '';
              } catch (t) {}
              return '';
            }),
            (n.createInvisibleElement = function (t) {
              try {
                var n = document.createElement(t);
                return (
                  (n.style.display = 'none'),
                  (n.style.border = 'none'),
                  (n.style.position = 'absolute'),
                  (n.style.top = '-999px'),
                  (n.style.left = '-999px'),
                  (n.style.width = '0'),
                  (n.style.height = '0'),
                  (n.style.visibility = 'hidden'),
                  n
                );
              } catch (t) {
                return e.Logger.warn('Failed to create element', t), null;
              }
            }),
            (n.values = function (t) {
              for (var e = n.allKeys(t), i = e.length, r = Array(i), o = 0; o < i; o++)
                r[o] = t[e[o]];
              return r;
            }),
            (n.getValuesOfMap = function (t) {
              if (this.isFunction(t.values)) return Array.from(t.values());
              var e = [];
              return (
                t.forEach(function (t) {
                  return e.push(t);
                }),
                e
              );
            }),
            (n.typesCounter = function (t) {
              for (var e = { epochTs: Date.now() }, n = 0, i = t; n < i.length; n++) {
                var r = i[n];
                e[r.type] = (e[r.type] || 0) + 1;
              }
              return e;
            }),
            (n.modifiersKeys = function (t) {
              var e = [];
              return (
                t.getModifierState &&
                  [
                    'Alt',
                    'AltGraph',
                    'CapsLock',
                    'Control',
                    'Fn',
                    'FnLock',
                    'Hyper',
                    'Meta',
                    'NumLock',
                    'OS',
                    'ScrollLock',
                    'Shift',
                    'Super',
                    'Symbol',
                    'SymbolLock',
                  ].forEach(function (n) {
                    t.getModifierState(n.toString()) && e.push(n);
                  }),
                e
              );
            }),
            (n.getElementText = function (t) {
              var e, n;
              return t instanceof HTMLInputElement
                ? ['checkbox', 'radio'].indexOf(t.type) >= 0
                  ? '' + t.checked
                  : t.value
                : t instanceof HTMLSelectElement
                  ? null ===
                      (n = null === (e = t.selectedOptions) || void 0 === e ? void 0 : e[0]) ||
                    void 0 === n
                    ? void 0
                    : n.innerText
                  : t.innerText;
            }),
            (n.getSrcElement = function (t) {
              return t.srcElement || t.target;
            }),
            (n.getObjectType = function (t) {
              try {
                var e = /function (.{1,})\(/.exec(t.constructor.toString());
                return e && e.length > 1 ? e[1] : '';
              } catch (t) {
                return '';
              }
            }),
            (n.isSelectorMatches = function (t, e, n) {
              try {
                var i = Element.prototype,
                  r =
                    i.matches ||
                    i.webkitMatchesSelector ||
                    i.mozMatchesSelector ||
                    i.msMatchesSelector,
                  o = 0;
                do {
                  if (r.call(t, e)) return t;
                  t = t.parentElement || t.parentNode;
                } while (null !== t && 1 === t.nodeType && o++ < n);
                return null;
              } catch (t) {
                return null;
              }
            }),
            (n.anySelectorMatches = function (t, n, i) {
              try {
                for (var r = 0, o = n; r < o.length; r++) {
                  var a = o[r];
                  if (this.isSelectorMatches(t, a, i)) return !0;
                }
              } catch (t) {
                e.Logger.warn(t);
              }
              return !1;
            }),
            (n.isArray = function (t) {
              return Array.isArray
                ? Array.isArray(t)
                : '[object Array]' === Object.prototype.toString.call(t);
            }),
            (n.safeJsonParse = function (t) {
              var n = null;
              try {
                t && (n = JSON.parse(t));
              } catch (t) {
                e.Logger.warn('Failed to parse object ' + t), (n = null);
              }
              return n;
            }),
            (n.getElementSelectionStart = function (t) {
              var e;
              try {
                e = t.selectionStart;
              } catch (t) {
                e = '';
              }
              return e;
            }),
            (n.getElementSelectionEnd = function (t) {
              var e;
              try {
                e = t.selectionEnd;
              } catch (t) {
                e = '';
              }
              return e;
            }),
            (n.isClickableInput = function (t) {
              return (
                t &&
                [
                  'button',
                  'checkbox',
                  'color',
                  'radio',
                  'range',
                  'image',
                  'submit',
                  'file',
                  'reset',
                ].indexOf(t.type) >= 0
              );
            }),
            (n.isTextInput = function (t) {
              return (
                t &&
                [
                  'date',
                  'datetime-local',
                  'email',
                  'month',
                  'number',
                  'password',
                  'search',
                  'tel',
                  'text',
                  'time',
                  'url',
                  'week',
                  'datetime',
                ].indexOf(t.type) >= 0
              );
            }),
            (n.getDeviceOrientation = function () {
              var t = screen.orientation || screen.mozOrientation || {},
                e = screen.msOrientation || t.type,
                n = t.angle;
              return {
                orientation: null === e || void 0 === e ? void 0 : e.toString(),
                angle: null === n || void 0 === n ? void 0 : n.toString(),
              };
            }),
            (n.getDevToolsState = function () {
              var t,
                e,
                n = window.outerWidth - window.innerWidth > 160,
                i = window.outerHeight - window.innerHeight > 160,
                r = n ? 'vertical' : 'horizontal';
              return (i && n) ||
                !(
                  (null ===
                    (e = null === (t = window.Firebug) || void 0 === t ? void 0 : t.chrome) ||
                  void 0 === e
                    ? void 0
                    : e.isInitialized) ||
                  n ||
                  i
                )
                ? { open: !1, orientation: void 0 }
                : { open: !0, orientation: r };
            }),
            (n.getCookie = function (t) {
              var e = document.cookie.match('(^|;) ?' + t + '=([^;]*)(;|$)');
              return e ? e[2] : null;
            }),
            (n.setCookie = function (t, e, n) {
              var i = new Date();
              i.setTime(i.getTime() + 1e3 * n),
                (document.cookie =
                  t + '=' + e + ';path=/;secure;SameSite=None;expires=' + i.toUTCString());
            }),
            (n.deleteCookie = function (t) {
              n.setCookie(t, '', -1);
            }),
            (n.delay = function (t) {
              return new Promise(function (e) {
                return setTimeout(e, t);
              });
            }),
            (n.getHostnameFromRegex = function (t) {
              if (t) {
                var e = t.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
                return e && e[1];
              }
              return null;
            }),
            (n.inIframe = function () {
              try {
                return window.self !== window.top;
              } catch (t) {
                return !0;
              }
            }),
            (n.promiseTimeout = function (t, e) {
              var n = new Promise(function (e, n) {
                var i = setTimeout(function () {
                  clearTimeout(i), n(new Error('Timed out in ' + t + 'ms.'));
                }, t);
              });
              return Promise.race([e, n]);
            }),
            (n.getProperty = function (t, e) {
              return e.split('.').reduce(function (t, e) {
                return t ? t[e] : null;
              }, t);
            }),
            (n.filterReduce = function (t, e) {
              return Object.keys(t)
                .filter(function (n) {
                  return e(t[n]);
                })
                .reduce(function (e, n) {
                  var i;
                  return __assign(__assign({}, e), (((i = {})[n] = t[n]), i));
                }, {});
            }),
            (n.dive = function (t, e, i) {
              for (var r in e)
                if (e.hasOwnProperty(r)) {
                  var o = r,
                    a = e[r];
                  t.length > 0 && (o = t + '.' + r), n.isObject(a) ? n.dive(o, a, i) : (i[o] = a);
                }
            }),
            (n.isObject = function (t) {
              var e = typeof t;
              return 'function' === e || ('object' === e && !!t);
            }),
            (n.allKeys = function (t) {
              if (!n.isObject(t)) return [];
              var e = [];
              for (var i in t) e.push(i);
              return e;
            }),
            (n.encryptionString = function (t, e) {
              for (var n = [], i = 0; i < t.length; i++) {
                var r = t.charCodeAt(i) ^ e.charCodeAt(i % e.length);
                n.push(String.fromCharCode(r));
              }
              return n.join('');
            }),
            (n.encryptionBytes = function (t, e) {
              for (var n = new Uint8Array(t.length), i = 0; i < t.length; i++)
                n[i] = t[i] ^ e.charCodeAt(i % e.length);
              return n;
            }),
            (n.parseJwt = function (t) {
              var e = t.replace(/-/g, '+').replace(/_/g, '/'),
                n = decodeURIComponent(
                  window
                    .atob(e)
                    .split('')
                    .map(function (t) {
                      return '%' + ('00' + t.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join(''),
                );
              return JSON.parse(n);
            }),
            (n.calculateMeanTimeDeltasBetweenEvents = function (t) {
              var e = 0;
              if ((null === t || void 0 === t ? void 0 : t.length) > 1) {
                for (var n = t[0].epochTs, i = 1; i < t.length; i++)
                  (e += t[i].epochTs - n), (n = t[i].epochTs);
                e /= t.length - 1;
              }
              return e;
            }),
            (n.sortEventsByTimestamp = function (t) {
              return t.sort(function (t, e) {
                return t.eventTs > e.eventTs
                  ? 1
                  : t.eventTs < e.eventTs
                    ? -1
                    : t.epochTs > e.epochTs
                      ? 1
                      : t.epochTs < e.epochTs
                        ? -1
                        : 'click' === t.type
                          ? 1
                          : -1;
              });
            }),
            (n.distanceBetweenPoints = function (t, e) {
              return Math.sqrt(Math.pow(t.getX() - e.getX(), 2) + Math.pow(t.getY() - e.getY(), 2));
            }),
            (n.calculateMeanDistanceBetweenPoints = function (t) {
              var e = 0;
              if ((null === t || void 0 === t ? void 0 : t.length) > 1) {
                for (var i = 1; i < t.length; i++) e += n.distanceBetweenPoints(t[i - 1], t[i]);
                e /= t.length - 1;
              }
              return e;
            }),
            (n.filterArrayByLength = function (t, e) {
              return t.length <= e ? t : t.slice(0, e).concat(t[t.length - 1]);
            }),
            (n.keepFirstEventsWithDistance = function (t) {
              var e = t.events,
                n = t.threshold,
                i = t.min,
                r = t.max;
              if (e.length <= i) return e;
              var o,
                a = e[0];
              for (o = 1; o < e.length && o < r; o++) {
                if (
                  Math.max(Math.abs(e[o].getX() - a.getX()), Math.abs(e[o].getY() - a.getY())) >= n
                )
                  break;
              }
              return e.slice(0, Math.max(o + 1, i));
            }),
            (n.ab2str = function (t) {
              return String.fromCharCode.apply(null, new Uint8Array(t));
            }),
            (n.str2ab = function (t) {
              for (
                var e = new ArrayBuffer(t.length), n = new Uint8Array(e), i = 0, r = t.length;
                i < r;
                i++
              )
                n[i] = t.charCodeAt(i);
              return e;
            }),
            (n.encode = function (t) {
              var e = JSON.stringify(t),
                i = new TextEncoder().encode(e),
                r = n.base64Uint8Array(i);
              return n.base64url(r);
            }),
            (n.base64url = function (t) {
              return t.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            }),
            (n.hashCache = new Map()),
            (n.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='),
            n
          );
        })();
        e.Util = n;
      })(t._POSignalsUtils || (t._POSignalsUtils = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {}));
  (__awaiter =
    (this && this.__awaiter) ||
    function (t, e, n, i) {
      return new (n || (n = Promise))(function (r, o) {
        function a(t) {
          try {
            u(i.next(t));
          } catch (t) {
            o(t);
          }
        }
        function s(t) {
          try {
            u(i.throw(t));
          } catch (t) {
            o(t);
          }
        }
        function u(t) {
          var e;
          t.done
            ? r(t.value)
            : ((e = t.value),
              e instanceof n
                ? e
                : new n(function (t) {
                    t(e);
                  })).then(a, s);
        }
        u((i = i.apply(t, e || [])).next());
      });
    }),
    (__generator =
      (this && this.__generator) ||
      function (t, e) {
        var n,
          i,
          r,
          o,
          a = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function s(o) {
          return function (s) {
            return (function (o) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & o[0]
                          ? i.return
                          : o[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, o[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                    case 0:
                    case 1:
                      r = o;
                      break;
                    case 4:
                      return a.label++, { value: o[1], done: !1 };
                    case 5:
                      a.label++, (i = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = a.trys).length > 0 && r[r.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                        a.label = o[1];
                        break;
                      }
                      if (6 === o[0] && a.label < r[1]) {
                        (a.label = r[1]), (r = o);
                        break;
                      }
                      if (r && a.label < r[2]) {
                        (a.label = r[2]), a.ops.push(o);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  o = e.call(t, a);
                } catch (t) {
                  (o = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, s]);
          };
        }
      });
  !(function (t) {
    var e = t.openDB;
    !(function (t) {
      var n = (function () {
        function t() {}
        return (
          (t.initDB = function () {
            return __awaiter(this, void 0, void 0, function () {
              var n,
                i = this;
              return __generator(this, function (r) {
                if (
                  !(
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                  )
                )
                  throw new Error('IndexedDB is not supported');
                return (
                  (n = new t()),
                  [
                    2,
                    new Promise(function (r) {
                      return __awaiter(i, void 0, void 0, function () {
                        var i;
                        return __generator(this, function (o) {
                          switch (o.label) {
                            case 0:
                              return (
                                (i = n),
                                [
                                  4,
                                  e(this._PingDBName, t._version, {
                                    upgrade: function (e, n, i, r, o) {
                                      e.createObjectStore(t._storeDefaultName);
                                    },
                                  }),
                                ]
                              );
                            case 1:
                              return (i.indexedDatabase = o.sent()), r(n), [2];
                          }
                        });
                      });
                    }),
                  ]
                );
              });
            });
          }),
          (t.prototype.close = function () {
            this.indexedDatabase.close();
          }),
          (t.prototype.getValue = function (e) {
            return this.indexedDatabase.get(t._storeDefaultName, e);
          }),
          (t.prototype.setValue = function (e, n) {
            return this.indexedDatabase.put(t._storeDefaultName, n, e);
          }),
          (t._PingDBName = 'Ping'),
          (t._version = 1),
          (t._storeDefaultName = 'PING_ONE'),
          t
        );
      })();
      t.IndexedDBStorage = n;
    })(t._POSignalsStorage || (t._POSignalsStorage = {}));
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function e(e, n) {
            this.crossStorageClient = new t.CrossStorageClient(e, n);
          }
          return (
            (e.prototype.get = function (e) {
              var n = t._POSignalsUtils.Util.hash(e);
              return this.crossStorageClient.get(n);
            }),
            (e.prototype.del = function (e) {
              return this.crossStorageClient.del(t._POSignalsUtils.Util.hash(e));
            }),
            (e.prototype.set = function (e, n, i) {
              return this.crossStorageClient.set(t._POSignalsUtils.Util.hash(e), n, i);
            }),
            (e.prototype.onConnect = function () {
              return this.crossStorageClient.onConnect();
            }),
            (e.prototype.close = function (t) {
              return this.crossStorageClient.close(t);
            }),
            (e.prototype.getSignedPayload = function (t, e) {
              return this.crossStorageClient.getSignedPayload(t, e);
            }),
            (e.prototype.getDeviceDetails = function (e) {
              var n = t._POSignalsUtils.Util.hash(e);
              return this.crossStorageClient.getDeviceDetails(n);
            }),
            (e.prototype.setDeviceDetails = function (e, n) {
              var i = t._POSignalsUtils.Util.hash(e);
              return this.crossStorageClient.setDeviceDetails(i, n);
            }),
            e
          );
        })();
        e.CrossStorage = n;
        var i = (function () {
          function t(t) {
            this.storage = t;
          }
          return (
            (t.prototype.get = function (t) {
              return Promise.resolve(this.storage.getItem(t));
            }),
            (t.prototype.del = function (t) {
              return this.storage.removeItem(t), Promise.resolve();
            }),
            (t.prototype.set = function (t, e) {
              return this.storage.setItem(t, e), Promise.resolve();
            }),
            (t.prototype.onConnect = function () {
              return Promise.resolve();
            }),
            (t.prototype.close = function (t) {
              return Promise.resolve();
            }),
            (t.prototype.getSignedPayload = function (t, e) {
              return Promise.resolve([]);
            }),
            (t.prototype.getDeviceDetails = function (t) {
              return Promise.resolve([]);
            }),
            (t.prototype.setDeviceDetails = function (t, e) {
              return Promise.resolve([]);
            }),
            t
          );
        })();
        e.CrossStorageFallback = i;
      })(t._POSignalsStorage || (t._POSignalsStorage = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t, e, n) {
          (this.deviceId = t), (this.dbStorage = e), (this.cryptoHandler = n);
        }
        return (
          (e.prototype.getExportedPublicKey = function () {
            return __awaiter(this, void 0, void 0, function () {
              var e, n;
              return __generator(this, function (i) {
                switch (i.label) {
                  case 0:
                    return this.cachedPublicKey ? [3, 3] : [4, this.getDeviceKeys()];
                  case 1:
                    return (e = i.sent())
                      ? ((n = this), [4, this.cryptoHandler.exportPublicKey(e)])
                      : [3, 3];
                  case 2:
                    (n.cachedPublicKey = i.sent()), (i.label = 3);
                  case 3:
                    return (
                      t._POSignalsUtils.Logger.info('Exported public key:', this.cachedPublicKey),
                      [2, this.cachedPublicKey]
                    );
                }
              });
            });
          }),
          (e.prototype.setDeviceKeys = function (t) {
            return __awaiter(this, void 0, void 0, function () {
              var e;
              return __generator(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, this.dbStorage.setValue(this.deviceId, t)];
                  case 1:
                    return (e = n.sent()), (this.cachedDeviceKey = t), [2, e];
                }
              });
            });
          }),
          (e.prototype.associateDeviceKeys = function () {
            return __awaiter(this, void 0, void 0, function () {
              var e;
              return __generator(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, this.cryptoHandler.generateKeys()];
                  case 1:
                    return (
                      (e = n.sent()),
                      t._POSignalsUtils.Logger.info('Associating new device domain keys'),
                      [4, this.setDeviceKeys(e)]
                    );
                  case 2:
                    return n.sent(), [2, e];
                }
              });
            });
          }),
          (e.prototype.getDeviceKeys = function () {
            return __awaiter(this, void 0, void 0, function () {
              var t;
              return __generator(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.cachedDeviceKey
                      ? [3, 2]
                      : ((t = this), [4, this.dbStorage.getValue(this.deviceId)]);
                  case 1:
                    (t.cachedDeviceKey = e.sent()), (e.label = 2);
                  case 2:
                    return [2, this.cachedDeviceKey];
                }
              });
            });
          }),
          (e.prototype.signDeviceAttributeWithJWT = function (t, n, i) {
            return __awaiter(this, void 0, void 0, function () {
              var r, o, a;
              return __generator(this, function (s) {
                switch (s.label) {
                  case 0:
                    return (
                      (o = (r = this.cryptoHandler).signJWT), (a = [t]), [4, this.getDeviceKeys()]
                    );
                  case 1:
                    return [4, o.apply(r, a.concat([s.sent(), e._default_salt, n, i]))];
                  case 2:
                    return [2, s.sent()];
                }
              });
            });
          }),
          (e.prototype.verifyJWT = function (t) {
            return __awaiter(this, void 0, void 0, function () {
              var e, n, i;
              return __generator(this, function (r) {
                switch (r.label) {
                  case 0:
                    return (
                      (n = (e = this.cryptoHandler).verifyJwtToken),
                      (i = [t]),
                      [4, this.getDeviceKeys()]
                    );
                  case 1:
                    return [2, n.apply(e, i.concat([r.sent().publicKey]))];
                }
              });
            });
          }),
          (e._default_salt = 32),
          e
        );
      })();
      t.DeviceKeys = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function n() {
            (this._disabledStorage = []),
              (this.assertionValues = [
                'BROWSER_ENGINE_VERSION',
                'NAVIGATOR_LANGUAGE',
                'OS_NAME',
                'OS_VERSION',
                'NAVIGATOR_USER_AGENT',
                'FINGER_PRINT',
                'RESOLUTION',
                'PUSH_NOTIFICATIONS_SUPPORTED',
                'COOKIES_ENABLED',
                'IS_INCOGNITO',
                'IS_PRIVATE_MODE',
              ]);
            try {
              window.sessionStorage.setItem('_st_storage_enabled_check', 'test'),
                window.sessionStorage.removeItem('_st_storage_enabled_check'),
                (this.signalsSessionStorage = window.sessionStorage);
            } catch (n) {
              t._POSignalsUtils.Logger.warn('session storage disabled'),
                this._disabledStorage.push('sessionStorage'),
                (this.signalsSessionStorage = new e.StorageFallback());
            }
            try {
              window.localStorage.setItem('_st_storage_enabled_check', 'test'),
                window.localStorage.removeItem('_st_storage_enabled_check'),
                (this.signalsLocalStorage = new e.StorageWrapper(window.localStorage));
            } catch (n) {
              t._POSignalsUtils.Logger.warn('local storage disabled'),
                this._disabledStorage.push('localStorage'),
                (this.signalsLocalStorage = new e.StorageWrapper(new e.StorageFallback())),
                (this.crossStorage = new e.CrossStorageFallback(this.signalsLocalStorage));
            }
          }
          return (
            (n.prototype.setStorageConfig = function (t) {
              (this.disableHub = !0),
                (this.hubUrl = ''),
                (this.universalTrustEnabled = this.isConfigurationEnabled(
                  t.universalDeviceIdentification,
                )),
                (this.agentIdentificationEnabled = this.isConfigurationEnabled(
                  t.agentIdentification,
                )),
                (this.devEnv = t.devEnv),
                (this.agentPort = t.agentPort),
                (this.agentTimeout = t.agentTimeout),
                (this.htmlGeoLocation = this.isConfigurationEnabled(t.htmlGeoLocation)),
                (this.isIAFDetectionEnabled = this.isConfigurationEnabled(t.isIAFDetectionEnabled));
            }),
            Object.defineProperty(n, 'instance', {
              get: function () {
                return n._instance || (n._instance = new n()), n._instance;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(n.prototype, 'tabUUID', {
              get: function () {
                var e = this.signalsSessionStorage.getItem(
                  t._POSignalsUtils.Constants.TAB_UUID_KEY,
                );
                return (
                  e ||
                    ((e = t._POSignalsUtils.Util.newGuid()),
                    this.signalsSessionStorage.setItem(
                      t._POSignalsUtils.Constants.TAB_UUID_KEY,
                      e,
                    )),
                  e
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(n.prototype, 'ops', {
              get: function () {
                var e = Number(
                  this.signalsSessionStorage.getItem(t._POSignalsUtils.Constants.OPS_KEY),
                );
                return isNaN(e) ? null : e;
              },
              set: function (e) {
                e
                  ? this.signalsSessionStorage.setItem(
                      t._POSignalsUtils.Constants.OPS_KEY,
                      e.toString(),
                    )
                  : this.signalsSessionStorage.removeItem(t._POSignalsUtils.Constants.OPS_KEY);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(n.prototype, 'disabledStorage', {
              get: function () {
                return this._disabledStorage;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(n.prototype, 'sessionStorage', {
              get: function () {
                return this.signalsSessionStorage;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(n.prototype, 'localStorage', {
              get: function () {
                return this.signalsLocalStorage;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.prototype.initDeviceIdentity = function () {
              return __awaiter(this, void 0, void 0, function () {
                var n, i, r, o;
                return __generator(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return (
                        (i = this.signalsLocalStorage.getItem(
                          t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                        )),
                        (r = this.signalsLocalStorage.getItem(
                          t._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT,
                        )),
                        i && (this.cachedDeviceId = i),
                        this.universalTrustEnabled
                          ? ((this.deviceTrust = { attestation: {}, dtts: new Date().getTime() }),
                            (o = this),
                            [4, e.IndexedDBStorage.initDB()])
                          : [3, 3]
                      );
                    case 1:
                      return (o.indexedDBStorage = a.sent()), [4, this.loadLocalDeviceTrust()];
                    case 2:
                      (n = a.sent()), (a.label = 3);
                    case 3:
                      return this.disableHub || (i && !this.shouldFallbackToP1Key(n))
                        ? [3, 5]
                        : [4, this.fallbackToCrossStorage(this.hubUrl)];
                    case 4:
                      return a.sent(), [3, 6];
                    case 5:
                      (this.crossStorage = new e.CrossStorageFallback(this.signalsLocalStorage)),
                        (a.label = 6);
                    case 6:
                      return this.getDeviceId()
                        ? [3, 8]
                        : [4, this.associateDeviceDetails(this.disableHub)];
                    case 7:
                      a.sent(), (a.label = 8);
                    case 8:
                      return (
                        r ||
                          this.signalsLocalStorage.setItem(
                            t._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT,
                            Date.now(),
                          ),
                        !this.universalTrustEnabled || (this.getDeviceId() && n)
                          ? [3, 10]
                          : [4, this.createDomainKeys(this.disableHub)]
                      );
                    case 9:
                      a.sent(), (a.label = 10);
                    case 10:
                      return [2, this.getDeviceId()];
                  }
                });
              });
            }),
            (n.prototype.shouldFallbackToP1Key = function (t) {
              return (
                this.universalTrustEnabled &&
                !this.disableHub &&
                (!t || this.isRefreshRequired(this.deviceKeyRsyncIntervals))
              );
            }),
            (n.prototype.isRefreshRequired = function (e) {
              if ((void 0 === e && (e = 3), !this.deviceTrust.dtts)) return !0;
              var n = this.signalsLocalStorage.getItem(
                t._POSignalsUtils.Constants.LAST_DEVICE_KEY_RESYNC,
              );
              if (!n || isNaN(parseInt(n))) return !0;
              var i = this.deviceTrust.dtts - n > 864e5 * e;
              return i && t._POSignalsUtils.Logger.debug('Refresh required'), i;
            }),
            (n.prototype.loadLocalDeviceTrust = function () {
              return __awaiter(this, void 0, void 0, function () {
                var n, i;
                return __generator(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        r.trys.push([0, 4, , 5]),
                        void 0,
                        this.cachedDeviceId
                          ? this.cachedDeviceId
                            ? ((this.domainDeviceKeys = new t.DeviceKeys(
                                this.getDeviceId(),
                                this.indexedDBStorage,
                                new t._POSignalsUtils.CryptoOperator(),
                              )),
                              [4, this.domainDeviceKeys.getDeviceKeys()])
                            : [3, 3]
                          : (t._POSignalsUtils.Logger.debug(
                              'No device id found on customer domain',
                            ),
                            [2, !1])
                      );
                    case 1:
                      return r.sent()
                        ? ((n = this.deviceTrust.attestation),
                          [4, this.domainDeviceKeys.getExportedPublicKey()])
                        : (t._POSignalsUtils.Logger.debug(
                            'No device keys found on customer domain',
                          ),
                          [2, !1]);
                    case 2:
                      return (
                        (n.deviceKey = r.sent()),
                        (this.crossStorage = new e.CrossStorageFallback(this.signalsLocalStorage)),
                        [2, !0]
                      );
                    case 3:
                      return [3, 5];
                    case 4:
                      return (
                        (i = r.sent()),
                        t._POSignalsUtils.Logger.error('Domain PKI initialization failed', i),
                        [2, !1]
                      );
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (n.prototype.createDomainKeys = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n, i;
                return __generator(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        r.trys.push([0, 3, , 4]),
                        !e && this._disabledStorage.lastIndexOf('hub') > -1
                          ? (t._POSignalsUtils.Logger.debug(
                              'Hub unavailable - skipping domain trust creation',
                            ),
                            [2])
                          : ((this.domainDeviceKeys = new t.DeviceKeys(
                              this.getDeviceId(),
                              this.indexedDBStorage,
                              new t._POSignalsUtils.CryptoOperator(),
                            )),
                            [4, this.domainDeviceKeys.associateDeviceKeys()])
                      );
                    case 1:
                      return (
                        r.sent(),
                        (n = this.deviceTrust.attestation),
                        [4, this.domainDeviceKeys.getExportedPublicKey()]
                      );
                    case 2:
                      return (n.deviceKey = r.sent()), [3, 4];
                    case 3:
                      return (
                        (i = r.sent()),
                        t._POSignalsUtils.Logger.error('Domain PKI initialization failed', i),
                        [3, 4]
                      );
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (n.prototype.getDeviceId = function () {
              return this.cachedDeviceId;
            }),
            (n.prototype.getDeviceCreatedAt = function () {
              return this.signalsLocalStorage.getItem(
                t._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT,
              );
            }),
            (n.prototype.associateDeviceDetails = function (e) {
              var n, i;
              return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return (
                        t._POSignalsUtils.Logger.debug('Associating fresh device details'),
                        (this.cachedDeviceId = 'Id-' + t._POSignalsUtils.Util.newGuid()),
                        this.signalsLocalStorage.setItem(
                          t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                          this.cachedDeviceId,
                        ),
                        this.signalsLocalStorage.setItem(
                          t._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT,
                          Date.now(),
                        ),
                        e
                          ? [3, 4]
                          : this.universalTrustEnabled
                            ? ((r = this.deviceTrust.attestation),
                              [
                                4,
                                this.crossStorage.setDeviceDetails(
                                  t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                                  this.cachedDeviceId,
                                ),
                              ])
                            : [3, 2]
                      );
                    case 1:
                      return (r.fallbackDeviceKey = o.sent()[0]), [3, 4];
                    case 2:
                      return [
                        4,
                        this.crossStorage.set(
                          t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                          this.cachedDeviceId,
                        ),
                      ];
                    case 3:
                      o.sent(), (o.label = 4);
                    case 4:
                      return (
                        t._POSignalsUtils.Logger.debug(
                          'PingOne Signals deviceId: ' + this.cachedDeviceId,
                        ),
                        [
                          2,
                          [
                            this.cachedDeviceId,
                            null ===
                              (i =
                                null === (n = this.deviceTrust) || void 0 === n
                                  ? void 0
                                  : n.attestation) || void 0 === i
                              ? void 0
                              : i.fallbackDeviceKey,
                          ],
                        ]
                      );
                  }
                });
              });
            }),
            (n.prototype.closeTrustStore = function () {
              try {
                this.crossStorage.close(this.devEnv),
                  this.indexedDBStorage && this.indexedDBStorage.close();
              } catch (e) {
                t._POSignalsUtils.Logger.info('Unable to close trust store:', e);
              }
            }),
            (n.prototype.fallbackToCrossStorage = function (n) {
              return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (r) {
                  switch (r.label) {
                    case 0:
                      t._POSignalsUtils.Logger.debug(
                        'PingOne Signals cross storage is required, initializing',
                      ),
                        (r.label = 1);
                    case 1:
                      return r.trys.push([1, 3, , 4]), [4, this.initCrossStorage(n)];
                    case 2:
                      return (
                        r.sent(),
                        t._POSignalsUtils.Logger.info('PingOne Signals cross storage initiated'),
                        [3, 4]
                      );
                    case 3:
                      return (
                        (i = r.sent()),
                        t._POSignalsUtils.Logger.warn(
                          'PingOne Signals Session crossStorage failed to connect ' + i,
                        ),
                        this._disabledStorage.push('hub'),
                        (this.crossStorage = new e.CrossStorageFallback(this.signalsLocalStorage)),
                        [3, 4]
                      );
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (n.prototype.initCrossStorage = function (n) {
              return __awaiter(this, void 0, void 0, function () {
                var i, r, o, a, s;
                return __generator(this, function (u) {
                  switch (u.label) {
                    case 0:
                      return (
                        (i = this.universalTrustEnabled ? '1.0.7' : '1.0.1'),
                        (r = 'https://apps.pingone.com/signals/web-sdk/hub-' + i + '/hub.html'),
                        (o = ((null === n || void 0 === n ? void 0 : n.trim()) || r).replace(
                          /\/$/,
                          '',
                        )).endsWith('html') || (o += '/hub.html'),
                        (this.crossStorage = new e.CrossStorage(o, { timeout: 2e3 })),
                        [4, this.crossStorage.onConnect()]
                      );
                    case 1:
                      return (
                        u.sent(),
                        this.universalTrustEnabled
                          ? [
                              4,
                              this.crossStorage.getDeviceDetails(
                                t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                              ),
                            ]
                          : [3, 3]
                      );
                    case 2:
                      return (a = u.sent()), (this.cachedDeviceId = a[0]), [3, 5];
                    case 3:
                      return (
                        (s = this),
                        [4, this.crossStorage.get(t._POSignalsUtils.Constants.DEVICE_ID_KEY)]
                      );
                    case 4:
                      (s.cachedDeviceId = u.sent()), (u.label = 5);
                    case 5:
                      return (
                        this.cachedDeviceId
                          ? this.signalsLocalStorage.setItem(
                              t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                              this.cachedDeviceId,
                            )
                          : t._POSignalsUtils.Logger.info('no device id from hub'),
                        this.universalTrustEnabled &&
                          (a && a[1]
                            ? ((this.deviceTrust.attestation.fallbackDeviceKey = a[1]),
                              t._POSignalsUtils.Logger.info(
                                'Using fallback device keys from hub ' +
                                  this.deviceTrust.attestation.fallbackDeviceKey,
                              ))
                            : t._POSignalsUtils.Logger.info('failed to use any device keys')),
                        [2]
                      );
                  }
                });
              });
            }),
            (n.prototype.isConfigurationEnabled = function (t) {
              return (
                void 0 !== t &&
                null !== t &&
                ('boolean' == typeof t ? t : 'string' == typeof t && 'true' === t.toLowerCase())
              );
            }),
            (n.prototype.signJWTChallenge = function (t, e, n) {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (i) {
                  return [2, this.domainDeviceKeys.signDeviceAttributeWithJWT(t, e, n)];
                });
              });
            }),
            (n.prototype.getGeoSessionData = function () {
              var e = this.signalsSessionStorage.getItem(t._POSignalsUtils.Constants.GeoDataKey);
              return null === e || void 0 === e ? null : e;
            }),
            n
          );
        })();
        e.SessionStorage = n;
      })(t._POSignalsStorage || (t._POSignalsStorage = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function e(t) {
            this.storage = t;
          }
          return (
            (e.prototype.getItem = function (e) {
              var n = t._POSignalsUtils.Util.hash(e),
                i = this.storage.getItem(n);
              return (
                i ||
                  ((i = this.storage.getItem(e)) &&
                    (this.storage.setItem(n, i), this.storage.removeItem(e))),
                i
              );
            }),
            (e.prototype.removeItem = function (e) {
              return this.storage.removeItem(t._POSignalsUtils.Util.hash(e));
            }),
            (e.prototype.setItem = function (e, n) {
              return this.storage.setItem(t._POSignalsUtils.Util.hash(e), n);
            }),
            e
          );
        })();
        e.StorageWrapper = n;
        var i = (function () {
          function t() {
            this.internalStorageMap = new Map();
          }
          return (
            (t.prototype.getItem = function (t) {
              return this.internalStorageMap.get(t);
            }),
            (t.prototype.removeItem = function (t) {
              this.internalStorageMap.delete(t);
            }),
            (t.prototype.setItem = function (t, e) {
              this.internalStorageMap.set(t, e);
            }),
            t
          );
        })();
        e.StorageFallback = i;
      })(t._POSignalsStorage || (t._POSignalsStorage = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _0x2a96a4 = _0x34d2;
  !(function (t, e) {
    for (
      var n = 1064,
        i = 803,
        r = 1147,
        o = 748,
        a = 753,
        s = 720,
        u = 1245,
        c = _0x34d2,
        l = _0x2ece();
      ;

    )
      try {
        if (
          328021 ===
          -parseInt(c(n)) / 1 +
            -parseInt(c(715)) / 2 +
            (-parseInt(c(1241)) / 3) * (-parseInt(c(652)) / 4) +
            (-parseInt(c(868)) / 5) * (parseInt(c(i)) / 6) +
            (parseInt(c(r)) / 7) * (-parseInt(c(o)) / 8) +
            (-parseInt(c(a)) / 9) * (-parseInt(c(s)) / 10) +
            -parseInt(c(u)) / 11
        )
          break;
        l.push(l.shift());
      } catch (t) {
        l.push(l.shift());
      }
  })();
  (__assign =
    (this && this[_0x2a96a4(642)]) ||
    function () {
      var t = 601,
        e = 816,
        n = _0x2a96a4;
      return (__assign =
        Object[n(1188)] ||
        function (i) {
          for (var r, o = n, a = 1, s = arguments[o(t)]; a < s; a++)
            for (var u in (r = arguments[a])) Object[o(e)][o(1232)][o(675)](r, u) && (i[u] = r[u]);
          return i;
        })[n(1209)](this, arguments);
    }),
    (__awaiter =
      (this && this[_0x2a96a4(864)]) ||
      function (t, e, n, i) {
        var r = { _0x17e08c: 893 };
        return new (n || (n = Promise))(function (o, a) {
          var s = _0x34d2;
          function u(t) {
            var e = _0x34d2;
            try {
              l(i[e(704)](t));
            } catch (t) {
              a(t);
            }
          }
          function c(t) {
            try {
              l(i.throw(t));
            } catch (t) {
              a(t);
            }
          }
          function l(t) {
            var e,
              i = _0x34d2;
            t.done
              ? o(t[i(809)])
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    }))[i(r._0x17e08c)](u, c);
          }
          l((i = i[s(1209)](t, e || []))[s(704)]());
        });
      }),
    (__generator =
      (this && this.__generator) ||
      function (t, e) {
        var n,
          i,
          r,
          o,
          a = {
            _0x180a2e: 852,
            _0x654500: 704,
            _0x35e1a5: 675,
            _0x2178ca: 968,
            _0x1d2c43: 699,
            _0x23a91f: 766,
            _0x1a8942: 737,
            _0x585542: 601,
            _0x846770: 1161,
            _0x35b40c: 737,
          },
          s = _0x2a96a4,
          u = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: c(0), throw: c(1), return: c(2) }),
          typeof Symbol === s(974) &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function c(o) {
          return function (c) {
            return (function (o) {
              var c = s;
              if (n) throw new TypeError('Generator is already executing.');
              for (; u; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & o[0]
                          ? i.return
                          : o[0]
                            ? i[c(905)] || ((r = i[c(a._0x180a2e)]) && r.call(i), 0)
                            : i[c(a._0x654500)]) &&
                      !(r = r[c(a._0x35e1a5)](i, o[1]))[c(805)])
                  )
                    return r;
                  switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                    case 0:
                    case 1:
                      r = o;
                      break;
                    case 4:
                      return u[c(a._0x2178ca)]++, { value: o[1], done: !1 };
                    case 5:
                      u[c(968)]++, (i = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = u[c(a._0x1d2c43)][c(a._0x23a91f)]()), u.trys[c(766)]();
                      continue;
                    default:
                      if (
                        !(r = (r = u[c(a._0x1a8942)])[c(a._0x585542)] > 0 && r[r[c(601)] - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        u = 0;
                        continue;
                      }
                      if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                        u[c(968)] = o[1];
                        break;
                      }
                      if (6 === o[0] && u[c(968)] < r[1]) {
                        (u[c(a._0x2178ca)] = r[1]), (r = o);
                        break;
                      }
                      if (r && u[c(968)] < r[2]) {
                        (u.label = r[2]), u[c(699)][c(a._0x846770)](o);
                        break;
                      }
                      r[2] && u[c(a._0x1d2c43)].pop(), u[c(a._0x35b40c)].pop();
                      continue;
                  }
                  o = e.call(t, u);
                } catch (t) {
                  (o = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, c]);
          };
        }
      });
  var __spreadArrays =
    (this && this.__spreadArrays) ||
    function () {
      for (var t = _0x2a96a4, e = 0, n = 0, i = arguments[t(601)]; n < i; n++)
        e += arguments[n].length;
      var r = Array(e),
        o = 0;
      for (n = 0; n < i; n++)
        for (var a = arguments[n], s = 0, u = a[t(601)]; s < u; s++, o++) r[o] = a[s];
      return r;
    };
  function _0x34d2(t, e) {
    var n = _0x2ece();
    return (_0x34d2 = function (t, e) {
      return n[(t -= 477)];
    })(t, e);
  }
  function _0x2ece() {
    var t = [
      'concat',
      '_selenium',
      'WEBGLVENDORANDRENDERER',
      'serial',
      'result',
      'HAS_TOUCH',
      'Modernizr.on Failed with feature ',
      'srcdoc',
      'DEVICE_CATEGORY',
      'UNMASKED_VENDOR_WEBGL',
      'code',
      ' failed',
      'localStorage',
      'page intentionally left blank',
      'broJsFingerprint',
      'find',
      'TypeError',
      '    [native code]',
      'matchmedia',
      'IS_BOT',
      'serializedDeviceAttributes',
      'Geolocation retrieval failed: Location information is unavailable.',
      'floc',
      'LIES',
      'dateTimeLocale',
      'getWebglData',
      'isMobile',
      'DOCUMENT_ELEMENT_WEBDRIVER',
      'Metadata',
      'Other',
      'get',
      'Geolocation retrieval failed: Location permission denied by the user.',
      'HAS_SPEAKERS',
      'htmlGeoLocation_ErrorCode',
      'dataforseobot',
      'chrome_runtime_functions_invalid',
      'opera',
      'background-sync',
      'calculated workstation device attributes.',
      'permissions_api',
      'dataview',
      '__webdriver_evaluate',
      'configurable',
      'NAVIGATOR_PRODUCT',
      'JS_CHALLENGE',
      'target',
      'label',
      'connect',
      'selenium_in_navigator',
      'failed to get headless results',
      'atanh',
      'customprotocolhandler',
      'function',
      'maxVertexAttribs',
      'systemLanguage',
      'message_channel',
      'BroprintJS',
      'matchMedia',
      'unknown',
      'browserInfo',
      'sessionData',
      'navigator.languages_blank',
      'getOwnPropertyNames',
      'batteryDischargingTime',
      'WEBGL_MAXCOMBINEDTEXTUREIMAGEUNITS',
      'hardwareConcurrency',
      'webdriverCommand',
      'OS_CPU',
      'message',
      'createInvisibleElement',
      'function () {',
      '_WEBDRIVER_ELEM_CACHE',
      'geo_location',
      'NAVIGATOR_VIBRATE',
      'appendChild',
      'devicePixelRatio',
      'Ops : ',
      'heading',
      'Siemens',
      'localAgentJwt',
      'clipboard-read',
      'maxRenderbufferSize',
      'createDataChannel',
      'webGlStatus',
      'toLowerCase',
      'driver',
      'ie8compat',
      'cosh',
      'NAVIGATOR_POINTER_ENABLED',
      'Failed to add ',
      'DEVICE_MODEL',
      'isWebGl',
      'browserVersion',
      'getSerializedDeviceAttributes',
      'collectWebRtc',
      'Chrome',
      'permission',
      'webkitRTCPeerConnection',
      '__webdriver_script_func',
      'function query() { [native code] }',
      'performance',
      'info',
      'href',
      'origin',
      'videoInputDevices',
      'Rotor',
      'http://127.0.0.1',
      'NAVIGATOR_LANGUAGES',
      'RTCPeerConnection',
      'fonts',
      '_FAILED',
      'NuVision',
      'android',
      'metadataQueue',
      'shadingLanguageVersion',
      'Battery ',
      'keyboard',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'productSub',
      'accessibility-events',
      'internationalization',
      'safeAddMetadata',
      'iphone',
      'detectIncognitoInternal',
      'isInvalidStackTraceSize',
      'video/mp4;; codecs = "avc1.42E01E"',
      'consistent_plugins_prototype',
      'propertyDescriptors',
      'opr',
      'reducedTransparency',
      '__lastWatirAlert',
      'seleniumSequentum',
      'resolve',
      'getDevicePayload',
      'canPlayType',
      'PREFERS_COLOR_SCHEME',
      'diffbot',
      'detectChromium',
      'NAVIGATOR_WEB_DRIVER',
      'getParameter',
      'onupgradeneeded',
      'page_visibility',
      '35866TVtBjV',
      'cookieStore',
      'hasEvent',
      'expm1',
      'custom_protocol_handler',
      'getAttribute',
      'ambient-light-sensor',
      'getAllLies',
      'email',
      'fingerPrintComponents',
      'onicecandidate',
      'pagevisibility',
      'NAVIGATOR_PLUGINS_LENGTH',
      'add',
      'lastCalculatedMetadata',
      'seleniumInNavigator',
      'NAVIGATOR_SERIAL_SUPPORTED',
      'duration',
      'ai2bot',
      'intl',
      'pow',
      'ACCELEROMETER_SUPPORTED',
      'matches',
      'rtt',
      'maxVertexTextureImageUnits',
      'HAS_CHROME_LOADTIMES',
      'signal',
      'kind',
      'NAVIGATOR_KEYBOARD_SUPPORTED',
      'selenium_in_window',
      'addStealthTest',
      'round',
      "Geolocation permission state is '",
      '_pingOneSignalsPingResult',
      'batteryInit',
      'iframeWindow',
      'height',
      'SCREEN_FRAME',
      'function toString() { [native code] }',
      'messagechannel',
      'closed',
      'WEBGL_MAXVARYINGVECTORS',
      'failed to add properties descriptor',
      'googleother-image',
      'seleniumInDocument',
      'videoCard',
      'HAS_MICROPHONE',
      'Essential',
      'experimental-webgl',
      'blob_constructor',
      'name',
      'OS_NAME',
      'SeleniumProperties',
      'hasMicrophone',
      'library',
      'proximity',
      'getFrequencyResponse',
      'createOffer',
      'Security error',
      'vendorFlavors',
      'AUDIO',
      'deviceId',
      '__driver_unwrapped',
      'pointerevents',
      'AGENT_BASE_URL',
      'anthropic-ai',
      'Dell',
      'gamepads',
      'getHasLiedBrowser',
      'string',
      '__lastWatirConfirm',
      'Battery not supported!',
      'NAVIGATOR_LANGUAGE',
      'scrapy',
      'promiseTimeout',
      '__nightmare',
      'forEach',
      'iframe_window',
      'addPropertyDescriptorInfo',
      'function ',
      'calledSelenium',
      'random',
      'BLUTOOTH_SUPPORTED',
      '49TVcSOF',
      'deviceMemory',
      'ipod',
      'clipboard-write',
      'BATTERY_LEVEL',
      '() {',
      'MQ_SCREEN',
      'agentIdentificationEnabled',
      'unknown transient reason',
      'spawn',
      'persistent-storage',
      'navigator.plugins_empty',
      'getExtension',
      'flatAndAddMetadata',
      'push',
      'maxFragmentUniformVectors',
      'calculateDeviceMetadata',
      'getCurrentBrowserFingerPrint',
      'trustTokenOperationError',
      'blank page',
      'universalTrustEnabled',
      'you',
      'metadataBlackList',
      'battery',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'domBlockers',
      'getUndefinedValueLie',
      'fingerPrintComponentKeys',
      'Geolocation API is not supported by this browser.',
      'electron',
      'ligatures',
      'game_pads',
      'hasWebcam',
      'invertedColors',
      'set',
      'canvas',
      'engine',
      'WEBGL_MAXTEXTURESIZE',
      'mozRTCPeerConnection',
      'NAVIGATOR_USER_AGENT',
      'perplexitybot',
      'assign',
      "' in browser '",
      'cookieEnabled',
      'quota detection failed: ',
      'interestCohort',
      'permissions_api_overriden',
      'webkitRequestFileSystem',
      'getLies',
      'openDatabase',
      'getFingerPrint',
      'memory',
      'browserMajor',
      'ZTE',
      'isBot',
      'debug',
      'WEBGL_VERSION',
      'fmget_targets',
      'stringify',
      'innerHeight',
      '20030107',
      'statusText',
      'apply',
      'custom_event',
      'mediaplayer',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'addIframeData',
      'sessionStorage.length',
      'filename',
      'allSettled',
      'NOTIFICATION_PERMISSION',
      'tablet',
      'onLine',
      'enumerateDevices',
      'rad.io',
      'HAS_CHROME_APP',
      'documentElement',
      'enumerateDevicesEnabled',
      'calculated browser device attributes.',
      'applePay',
      'failed to get fingerprint info',
      'Brave',
      'longitude',
      'charging',
      '__selenium_unwrapped',
      'hasOwnProperty',
      'document',
      'availHeight',
      'deleteDatabase',
      'coords',
      'lieTypes',
      'getWebglCanvas',
      'getOwnPropertyDescriptors',
      'indexeddbblob',
      '462291Onrrdu',
      'stack',
      'iframe',
      'function get ',
      '659461WYWsqS',
      'MEMORY_HEAP_SIZE_LIMIT',
      'chargingTime',
      'websockets',
      'DetectHeadless',
      'open',
      'speed',
      'Geolocation retrieval failed: Unknown geolocation error occurred.',
      'availWidth',
      'function () { [native code] }',
      'race',
      'NAVIGATOR_APP_VERSION',
      'cant',
      'all',
      'Windows',
      'PERMISSIONS',
      'data_view',
      'refreshDeviceAttributes',
      'DOCUMENT_ELEMENT_SELENIUM',
      'ondeviceproximity',
      'sin',
      'isBatterySupported',
      'indexeddb',
      'BLINK',
      'media',
      'query',
      'DOM_BLOCKERS',
      'CPU_ARCHITECTURE',
      'html',
      'getGeoSessionData',
      'numberOfAudioDevices',
      'Verizon',
      'NAVIGATOR_CONNECTION_RTT',
      'sent',
      'caller',
      'timpibot',
      'PromiseQueue',
      'INCOMPATIBLE_BROWSER',
      'audiooutput',
      'freeze',
      'NAVIGATOR_CLIENT_HINTS_PLATFORM',
      'referrer',
      'getRandomValues',
      'media_source',
      'Promise',
      'application/json',
      'type',
      'window_geb',
      '__driver_evaluate',
      'IS_TOUCH_DEVICE',
      'getPermissionsMetadata',
      'isWebGlSupported',
      'agentPort',
      'batteryChargingTime',
      'queryselector',
      'exif_orientation',
      'plugins',
      'webdriver',
      'BROWSER_TYPE',
      'architecture',
      'RunPerfTest',
      'failed to add iframe data',
      'audioinput',
      '__fxdriver_unwrapped',
      'youbot',
      'ccbot',
      'IS_AIBot',
      'failed to add client hints',
      'floc_version',
      'Volvo',
      'function get contentWindow() { [native code] }',
      'MAX_VERTEX_ATTRIBS',
      'htmlGeoLocation_timestamp',
      'WEB_RTC_SRFLX_IP',
      'latitude',
      'agentTimeout',
      'batteryCharging',
      'AiaSignals',
      'driver-evaluate',
      'history',
      'enumerateDevices() not supported.',
      'trim',
      'audio/aac',
      'getHeadlessResults',
      'Slack',
      'Yahoo! Japan',
      'DeviceOrientationEvent',
      'custom_elements',
      '() { [native code] }',
      'getMediaCodec',
      'getOps',
      'browser',
      'isPrivateMode',
      'ambient_light',
      'HAS_CAMERA',
      'ignore',
      'force_touch',
      'remove',
      'tan',
      'cors',
      'substr',
      'googleother-video',
      'contentWindow',
      'BROWSER_ENGINE_NAME',
      'WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN',
      'getLineDash',
      'maxVaryingVectors',
      'omgilibot',
      'BROWSER_NAME',
      'createObjectStore',
      'browserName',
      'toUpperCase',
      'indexedDB',
      'NAVIGATOR_PLATFORM',
      'userLanguage',
      'FONT_PREFERENCES',
      'searchLies',
      'audioIntVideoInit',
      'webGlBasics',
      'disabledStorage',
      'externalIdentifiers',
      'webgl',
      'match',
      '__$webdriverAsyncExecutor',
      'outerHeight',
      'numberOfVideoDevices',
      'onerror',
      'Voice',
      'HAS_CHROME_RUNTIME',
      'setTrustToken',
      'isAIBot',
      'Sequentum',
      'external',
      'gptbot',
      'error_code',
      'userAgentData',
      'callPhantom',
      'TIMEOUT',
      'GYROSCOPE_SUPPORTED',
      'Invalid geoData JSON in session storage:',
      'inIframe',
      'LOG2E',
      'Util',
      'Failed to get FingerPrint ',
      'window.chrome_missing',
      'enumerateDevices failed',
      ' headless test was failed',
      'AGENT_DEVICE_URL',
      'callSelenium',
      'constructor',
      'getSupportedExtensions',
      'deviceType',
      'Notification',
      'cos',
      'Xq7tSbjB517mhZwt',
      'includes',
      'VIDEO_INPUT_DEVICES',
      'force_touch.webkit_force_at_mouse_down',
      'hide',
      'Geolocation retrieval failed: Location request timed out.',
      'maxCombinedTextureImageUnits',
      'RCA',
      'htmlGeoLocation_accuracy',
      'addClientHints',
      'htmlGeoLocation',
      'getPrototypeInFunctionLie',
      'acos',
      'MEMORY_USED_HEAP_SIZE',
      'getSensorsMetadata',
      'getIdentificationMetadata',
      'documentLie',
      'WEBGL_MAXFRAGMENTUNIFORMVECTORS',
      'cros',
      'hasSpeakers',
      'ondevicemotion',
      'Incognito',
      'pdfViewerEnabled',
      'PingOne Signals deviceId: ',
      'engineName',
      'host',
      'IS_WEB_GLSTATUS',
      'toString',
      '__phantomas',
      'domAutomationController',
      'dataPoints',
      'put',
      'FingerPrint failed',
      'loadTimes',
      'batteryLevel',
      'accuracy',
      'HASLIEDLANGUAGES',
      'tanh',
      'Dragon Touch',
      'cbrt',
      'AUDIO_INPUT_DEVICES',
      'FINGER_PRINT',
      'detect',
      'vertical',
      'claude-web',
      'isElectronFamily',
      'crawler',
      'selenium-evaluate',
      'fingerprintTimeoutMillis',
      'GPS_SUPPORTED',
      'getDirectory',
      'aiaSignals',
      'languages',
      'request_animation_frame',
      'create',
      'components',
      'NextBook',
      'applebot',
      'getRTCPeerConnection',
      'failed to get lies results',
      'ARCHITECTURE',
      'Logger',
      'webglVersion',
      'length',
      'getAiaSignals',
      'horizontal',
      '_Selenium_IDE_Recorder',
      'prompt',
      'filter',
      'geb',
      'webgl2',
      'htmlGeoLocation_longitude',
      'LvTel',
      'contrast',
      'failed to get deviceId info',
      'WEBGL_MAXRENDERBUFFERSIZE',
      'audioOutputDevices',
      'additionalMediaCodecs',
      'accelerometer',
      'pointerlock',
      'gyroscope',
      'MEDIA_CODEC_X_M4A',
      'setLocalDescription',
      'NAVIGATOR_DEVICE_MEMORY',
      'platform',
      'left',
      'service_worker',
      'microphone',
      'timestamp',
      'AT&T',
      'app',
      'toSource',
      'NAVIGATOR_PRESENTATION_SUPPORTED',
      'IS_MOBILE',
      'msMaxTouchPoints',
      'geolocation',
      'semrushbot-ocob',
      'denied',
      'metadataParams',
      'ChromeDriverw',
      'audioInputDevices',
      'version',
      'fingerPrint',
      'permissions',
      '__assign',
      'isIAFDetectionEnabled',
      'lieTests',
      'msPointerEnabled',
      'deviceCreatedAt',
      'split',
      'iOS',
      'test',
      '...',
      'IS_ELECTRON_FAMILY',
      '4ciBhSC',
      'domAutomation',
      'createElement',
      'monochrome',
      'navigator',
      'context_menu',
      '[[IsRevoked]]',
      'getIoMetadata',
      'getStealthResult',
      'visitorId',
      'Flip Player',
      'continue',
      'payment-handler',
      'AUDIO_FINGERPRINT',
      'fetcher',
      'MEDIA_CODEC_AAC',
      'SHADING_LANGUAGE_VERSION',
      'level',
      'contextmenu',
      'video',
      'getContext',
      'camera',
      'mimeTypes',
      'call',
      'connection',
      'colorGamut',
      'text',
      'getLocalAgentJwt',
      'facebookbot',
      'Envizen',
      'Failed to fetch the Workstation data. Request timed out after ',
      'cpuClass',
      'aiSignalsResult',
      'SDKBP_FINGERPRINT',
      'innerWidth',
      'sinh',
      'isFunction',
      'HASLIEDOS',
      'error',
      'safeModernizrOn',
      'forcedColors',
      'omgili',
      'notifications',
      'localAgentJwtRequestCount',
      'eventlistener',
      'getHasLiedOs',
      'ambientlight',
      'ops',
      'exec',
      'localAgentAccessor',
      'Error during detection of aiasignals:',
      '__webdriver_script_fn',
      'next',
      'serviceworker',
      'appName',
      '__fxdriver_evaluate',
      'isIphoneOrIPad',
      '_POSignalsMetadata',
      'gpsSupported',
      'forcetouch',
      'osCpu',
      'mediaDevices',
      'trustToken',
      '77962nplGEe',
      'isWebGl2',
      'indexOf',
      'maxTouchPoints',
      'full_screen',
      '40tAfuey',
      'mac',
      'NAVIGATOR_APP_CODE_NAME',
      'WebGLMetadata',
      'htmlGeoLocation_ErrorMessage',
      'audioBaseLatency',
      'Neither WebGL 2.0 nor WebGL 1.0 is supported.',
      'undefined',
      'evaluateModernizr',
      'floc_id',
      'json',
      'MEMORY_TOTAL_HEAP_SIZE',
      'fingerprint',
      'DetectLies',
      '[[Handler]]',
      'Linux',
      'Opera',
      'trys',
      'WEBGL2VENDORANDRENDERER',
      'arguments',
      'speechSynthesis',
      'htmlGeoLocation_heading',
      'trident',
      'FingerprintJS',
      'extensions',
      'body',
      'setItem',
      '__proto__',
      '167168BPQvBl',
      'index_chrome_too_high',
      'calculatedDevToolsOpen',
      '__selenium_evaluate',
      'timezone',
      '1278549CGIQXB',
      'win',
      'propertyBlackList',
      'getDeviceAttributes',
      'webkitTemporaryStorage',
      'Firefox',
      'log10',
      'audio/x-m4a',
      'hid',
      'webRtcUrl',
      'dart',
      'Function',
      'headlessTests',
      'pop',
      'googleother',
      'toFixed',
      'copyFromChannel',
      'LN2',
      'ipad',
      'stealth test ',
      'window_html_webdriver',
      'WEBKIT_FORCE_AT_MOUSE_DOWN',
      'SQRT2',
      'iframe.contentWindow',
      'webzio-extended',
      'ontouchstart',
      'screenResolution',
      'midi',
      'chrome',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'join',
      'fullscreen',
      'meta-externalagent',
      'headlessResults',
      'Unknown',
      '__webdriver_unwrapped',
      'oai-searchbot',
      'webdriver-evaluate-response',
      'pike',
      'delay',
      'jsHeapSizeLimit',
      'MEDIA_CODEC_',
      'getElementsByTagName',
      'downlinkMax',
      'failed ',
      'DetectStealth',
      'vendor',
      'RESOLUTION',
      'PERMISSION_DENIED',
      'candidate',
      '36fvgLzH',
      'Windows Phone',
      'done',
      'msSaveBlob',
      'NAVIGATOR_CLIENT_HINTS_BRAND_',
      'usedJSHeapSize',
      'value',
      'GET',
      'MAX_RENDERBUFFER_SIZE',
      'deviceVendor',
      'getGeoLocationData',
      'product',
      '_POSignalsUtils',
      'prototype',
      'HASLIEDBROWSER',
      'number',
      'cpuArchitecture',
      'UAParserHelperMetadata',
      'totalJSHeapSize',
      'linux',
      'window_RunPerfTest',
      'WEBGL_MAXVERTEXTEXTUREIMAGEUNITS',
      'isChromeFamily',
      'NAVIGATOR_VENDOR',
      'screen',
      'renderer',
      'getNewObjectToStringTypeErrorLie',
      'audio',
      'firefox',
      'RENDERER',
      'PingOne Signals deviceCreatedAt: ',
      'isCanvasSupported',
      'StackTraceTester',
      'dischargingTime',
      'vibrate',
      'POSITION_UNAVAILABLE',
      'Modernizr',
      'warn',
      'userAgent',
      'notification',
      'MediaSource',
      'getClientRects',
      'width',
      'NAVIGATOR_HARDWARE_CONCURRENCY',
      'browserType',
      'prefixed',
      'getOwnPropertyDescriptor',
      'BROWSER_VERSION',
      'brand',
      'return',
      'BROWSER_TAB_HISTORY_LENGTH',
      'cookiesEnabled',
      'HAS_CHROME_CSI',
      'IS_ACCEPT_COOKIES',
      'catch',
      'WEBGL_EXTENSIONS',
      'osVersion',
      'touchevents',
      'Safari',
      'navigator.webdriver_present',
      'colorDepth',
      '__awaiter',
      'state',
      'getHasLiedResolution',
      'sendMessage',
      '94375WvHsBB',
      'blobconstructor',
      'IS_WEBGL',
      'brands',
      'OPS',
      'Barnes & Noble',
      'emit',
      'getOwnPropertyLie',
      'window_fmget_targets',
      'WEBGL_MAXVERTEXATTRIBS',
      'dark',
      'mobile',
      'typedarrays',
      'MAX_VARYING_VECTORS',
      'keys',
      'storage',
      'typed_arrays',
      'BATTERY_DISCHARGING_TIME',
      'has',
      'NAVIGATOR_MAX_TOUCH_POINTS',
      'isPrivateModeV2',
      'getBattery',
      'engineVersion',
      'safari',
      'AbortError',
      'then',
      'osName',
      'Android',
      'PUSH_NOTIFICATIONS_SUPPORTED',
      'selenium_sequentum',
      'outerWidth',
      'slice',
      'getTime',
      'LIES.',
      'runtime',
      'abort',
      'cryptography',
      'throw',
      'cli',
      'quota_management',
      'WEB_RTC_ENABLED',
      'supported',
      'Internet Explorer',
      'NAVIGATOR_MIME_TYPES_LENGTH',
      'NETWORK_TYPE',
      'appVersion',
      '_phantom',
      'Mac',
      '__webdriver_script_function',
      'screenFrame',
      'hdr',
      'webRtcIps',
      'initDeviceIdentity',
      'sessionStorage',
    ];
    return (_0x2ece = function () {
      return t;
    })();
  }
  !(function (t) {
    var e = 709,
      n = 816,
      i = 756,
      r = 816,
      o = 813,
      a = 1262,
      s = 750,
      u = 1163,
      c = 1098,
      l = 816,
      d = 596,
      h = 816,
      f = 1197,
      g = 547,
      p = 816,
      v = 1295,
      _ = 1334,
      m = 659,
      b = 816,
      y = 1043,
      E = 691,
      w = 602,
      S = _0x2a96a4;
    !(function (e) {
      var S = 900,
        O = 1145,
        I = 599,
        T = 815,
        A = 1043,
        P = 886,
        C = 526,
        L = 991,
        D = 929,
        x = 745,
        M = 996,
        R = 1160,
        U = 1185,
        k = 1019,
        N = 776,
        B = 1019,
        F = 981,
        H = 708,
        V = 982,
        G = {
          _0x43ccf4: 982,
          _0x168bc9: 1125,
          _0x999568: 646,
          _0x356ce9: 572,
          _0x986a95: 1321,
          _0x215d28: 710,
          _0x3a661b: 1174,
          _0xb9732d: 1182,
          _0x688888: 863,
          _0x2f97f2: 611,
          _0x5cfaa9: 854,
          _0x41c264: 946,
          _0x121c2f: 1148,
          _0x5ce79b: 692,
          _0x630a2e: 1180,
          _0x52c419: 934,
          _0xe785b8: 655,
          _0x28bde2: 712,
          _0x3be455: 1301,
          _0x3b90b6: 917,
          _0x51ad63: 921,
          _0x5134e2: 502,
          _0xb56e9: 1005,
          _0x5a9bc0: 509,
          _0x29b917: 1275,
          _0xa2e74: 1026,
          _0x4254d: 614,
          _0x44f51a: 1078,
          _0x19272b: 1035,
          _0x257ce9: 1281,
        },
        j = (function () {
          var n = 550,
            j = 525,
            W = 1067,
            K = 1265,
            z = 684,
            Y = 1078,
            X = 589,
            q = 1023,
            J = 676,
            Z = 1160,
            Q = 1160,
            $ = 1146,
            tt = 954,
            et = 478,
            nt = 1151,
            it = 1160,
            rt = 587,
            ot = 927,
            at = 979,
            st = 1086,
            ut = 878,
            ct = 815,
            lt = 948,
            dt = 1117,
            ht = 796,
            ft = 1160,
            gt = 851,
            pt = 1232,
            vt = 639,
            _t = 1160,
            mt = 807,
            bt = 1085,
            yt = 522,
            Et = 778,
            wt = 596,
            St = 1326,
            Ot = 1074,
            It = 1004,
            Tt = 1121,
            At = 841,
            Pt = 815,
            Ct = 526,
            Lt = _0x34d2;
          function Dt(e, n, i, r) {
            var o = _0x34d2;
            (this[o(G._0x43ccf4)] = e),
              (this[o(636)] = n),
              (this.externalIdentifiers = i),
              (this[o(701)] = r),
              (this[o(G._0x168bc9)] = null),
              (this[o(G._0x999568)] = null),
              (this[o(1117)] = null),
              (this[o(557)] = null),
              (this[o(1179)] = null),
              (this[o(1266)] = null),
              (this[o(G._0x356ce9)] = null),
              (this[o(G._0x986a95)] = null),
              (this[o(1298)] = null),
              (this[o(985)] = null),
              (this.headlessTests = new Map()),
              (this.lieTests = {}),
              (this[o(G._0x215d28)] = null),
              (this[o(G._0x3a661b)] = new Set([
                o(1226),
                'architecture',
                o(830),
                o(725),
                o(G._0xb9732d),
                o(G._0x688888),
                o(677),
                o(G._0x2f97f2),
                o(G._0x5cfaa9),
                o(683),
                o(G._0x41c264),
                o(G._0x121c2f),
                o(1172),
                'fontPreferences',
                o(1031),
                o(G._0x5ce79b),
                'hardwareConcurrency',
                o(918),
                o(496),
                o(G._0x630a2e),
                o(590),
                o(G._0x52c419),
                o(G._0xe785b8),
                'openDatabase',
                o(G._0x28bde2),
                'pdfViewerEnabled',
                o(622),
                o(G._0x3be455),
                'privateClickMeasurement',
                'reducedMotion',
                o(1051),
                o(G._0x3b90b6),
                o(779),
                o(G._0x51ad63),
                o(752),
                'touchSupport',
                o(799),
                o(1123),
                o(G._0x5134e2),
              ])),
              (this[o(G._0xb56e9)] = -1),
              (this[o(G._0x5a9bc0)] = 0),
              (this[o(G._0x29b917)] = 0),
              (this[o(G._0xa2e74)] = []),
              (this.audioInputDevices = []),
              (this[o(G._0x4254d)] = []),
              (this[o(919)] = new Map()),
              (this[o(G._0x44f51a)] = null),
              (this[o(1001)] = null),
              (this[o(695)] = 0),
              (this[o(G._0x19272b)] = new t[o(G._0x257ce9)](1)),
              (this[o(942)] = null),
              (this[o(684)] = null);
          }
          return (
            Object.defineProperty(Dt[Lt(816)], Lt(872), {
              get: function () {
                var t = Lt;
                if (!this.metadataParams[t(F)][t(H)]) return 0;
                var e = this[t(982)][t(699)];
                return !e && ((e = this.getOps()), (this[t(V)].ops = e)), e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (Dt[Lt(816)][Lt(i)] = function () {
              var e = 1035;
              return __awaiter(this, void 0, void 0, function () {
                var n = this;
                return __generator(this, function (i) {
                  return [
                    2,
                    this[_0x34d2(e)].add(function () {
                      var e = 968,
                        i = 1163,
                        r = 1023,
                        o = 1225,
                        a = 599,
                        s = 1023,
                        u = 833,
                        c = 646,
                        l = 968,
                        d = 601,
                        h = 818,
                        f = 1324,
                        g = 601,
                        p = 548,
                        v = 813,
                        _ = 643,
                        m = 602,
                        b = 1167,
                        y = 942,
                        E = 1078;
                      return __awaiter(n, void 0, void 0, function () {
                        var n, w;
                        return __generator(this, function (S) {
                          var O = _0x34d2;
                          switch (S[O(e)]) {
                            case 0:
                              return this.lastCalculatedMetadata
                                ? [3, 2]
                                : ((n = this), [4, this[O(i)]()]);
                            case 1:
                              (n.lastCalculatedMetadata = S[O(1278)]()),
                                t._POSignalsUtils.Logger[O(r)](O(o)),
                                t[O(815)][O(a)][O(s)](O(561) + this[O(1125)]),
                                t[O(815)].Logger[O(1023)](O(u) + this[O(c)]),
                                this[O(982)].closeTrustStore(),
                                (S[O(l)] = 2);
                            case 2:
                              return (
                                (w =
                                  typeof window !== O(727) &&
                                  window[O(1324)] &&
                                  typeof window[O(1324)][O(d)] === O(h)
                                    ? window[O(f)][O(g)]
                                    : null),
                                this[O(1078)] && (this[O(1078)][O(853)] = w),
                                this.sessionData && this[O(982)][O(p)] ? [4, this[O(v)]()] : [3, 4]
                              );
                            case 3:
                              S[O(1278)](), (S.label = 4);
                            case 4:
                              return [4, this.refreshDeviceAttributes()];
                            case 5:
                              return (
                                S.sent(),
                                this.sessionData && this[O(982)][O(_)] && this[O(m)](),
                                this[O(982)][O(b)] && (this[O(y)] = JSON.stringify(this[O(E)])),
                                [2, this.lastCalculatedMetadata]
                              );
                          }
                        });
                      });
                    }),
                  ];
                });
              });
            }),
            (Dt[Lt(r)][Lt(o)] = function () {
              var e,
                n,
                i,
                r,
                o = 1078,
                a = 1006,
                s = 539,
                u = 831,
                c = 539,
                l = 641,
                d = 1270,
                h = 1278,
                f = 865,
                g = 801,
                p = 982,
                v = 1274,
                _ = 1078,
                m = 609,
                b = 1229,
                y = 768,
                E = 1078,
                w = 1251,
                S = 1078,
                O = 1317,
                I = 626,
                T = 724,
                A = 599,
                P = 865,
                C = 1189;
              return __awaiter(this, void 0, void 0, function () {
                var L,
                  D,
                  x,
                  M,
                  R,
                  U,
                  k,
                  N,
                  B,
                  F = 953,
                  H = 801,
                  V = 943,
                  G = 543,
                  j = 521,
                  W = 838,
                  K = 899,
                  z = 1078,
                  Y = this;
                return __generator(this, function (X) {
                  var q = _0x34d2;
                  switch (X.label) {
                    case 0:
                      return (
                        (this[q(o)] = __assign(__assign({}, this.lastCalculatedMetadata), {
                          htmlGeoLocation_latitude: void 0,
                          htmlGeoLocation_longitude: void 0,
                          htmlGeoLocation_accuracy: void 0,
                          htmlGeoLocation_speed: void 0,
                          htmlGeoLocation_heading: void 0,
                          htmlGeoLocation_timestamp: void 0,
                          htmlGeoLocation_ErrorMessage: '',
                          htmlGeoLocation_ErrorCode: '',
                        })),
                        (L = function (t, e) {
                          var n = q;
                          void 0 === e && (e = '');
                          var i = t.length > 255 ? t[n(K)](0, 252) + n(650) : t;
                          return (
                            (Y.lastCalculatedMetadata.htmlGeoLocation_ErrorMessage = i),
                            (Y[n(z)].htmlGeoLocation_ErrorCode = e),
                            { status: n(690), message: i }
                          );
                        }),
                        (D = function (t) {
                          var e = q;
                          switch (t) {
                            case 1:
                              return L(e(F), e(H));
                            case 2:
                              return L(e(V), e(838));
                            case 3:
                              return L(e(G), e(j));
                            default:
                              return L(e(1252), e(W));
                          }
                        }),
                        navigator[q(633)]
                          ? ((x = this[q(1078)][q(492)][q(a)]()),
                            (M = x[q(s)](q(u))),
                            (R = x[q(c)](q(891))),
                            (U = !1),
                            [4, navigator[q(l)][q(d)]({ name: q(633) })])
                          : [2, L(q(1175), q(1282))]
                      );
                    case 1:
                      if (
                        ((k = X[q(h)]()),
                        (this[q(o)]['PERMISSIONS.geolocation'] = k[q(865)]),
                        k[q(865)] === q(635))
                      )
                        return [2, L(q(1096) + k[q(f)] + " in browser '" + x + "'.", q(g))];
                      if ((N = this[q(p)][q(v)]()))
                        try {
                          if ((B = JSON.parse(N)) && B[q(1319)] && B.longitude)
                            (this[q(_)].htmlGeoLocation_latitude = B.latitude
                              ? parseFloat(B[q(1319)][q(768)](2))
                              : null),
                              (this[q(_)][q(m)] = B[q(1229)] ? parseFloat(B[q(b)][q(y)](2)) : null),
                              (this.lastCalculatedMetadata.htmlGeoLocation_accuracy =
                                null !== (e = B[q(573)]) && void 0 !== e ? e : null),
                              (this[q(E)].htmlGeoLocation_speed =
                                null !== (n = B[q(w)]) && void 0 !== n ? n : null),
                              (this[q(S)].htmlGeoLocation_heading =
                                null !== (i = B[q(999)]) && void 0 !== i ? i : null),
                              (this[q(1078)][q(O)] =
                                null !== (r = B[q(I)]) && void 0 !== r ? r : null),
                              delete this[q(E)][q(T)],
                              delete this[q(1078)].htmlGeoLocation_ErrorCode,
                              (U = !0);
                          else if (B && B.error_code) return (U = !1), [2, D(B[q(518)])];
                        } catch (e) {
                          t[q(815)][q(A)][q(840)](q(523), e);
                        }
                      return 'granted' !== k.state
                        ? [3, 3]
                        : [
                            4,
                            new Promise(function (t) {
                              var e = 932,
                                n = 1236,
                                i = 1319,
                                r = 999,
                                o = 1078,
                                a = 768,
                                s = 768,
                                u = 546,
                                c = 724,
                                l = { timeout: 500 },
                                d = function (h) {
                                  void 0 === h && (h = 1),
                                    navigator.geolocation.getCurrentPosition(
                                      function (e) {
                                        var l,
                                          f = _0x34d2,
                                          g = e[f(n)],
                                          p = g[f(i)],
                                          v = g[f(1229)],
                                          _ = g.accuracy,
                                          m = g.speed,
                                          b = g[f(r)];
                                        if ((!p || !v || 0 === p || 0 === v) && (M || R) && 1 === h)
                                          return d(2);
                                        (Y[f(o)].htmlGeoLocation_latitude = p
                                          ? parseFloat(p[f(a)](2))
                                          : void 0),
                                          (Y[f(1078)][f(609)] = v
                                            ? parseFloat(v[f(s)](2))
                                            : void 0),
                                          (Y[f(1078)][f(u)] = _),
                                          (Y[f(1078)].htmlGeoLocation_speed = m),
                                          (Y.lastCalculatedMetadata[f(741)] = b),
                                          (Y[f(o)].htmlGeoLocation_timestamp =
                                            null !== (l = e[f(626)]) && void 0 !== l ? l : null),
                                          delete Y[f(o)][f(c)],
                                          delete Y[f(1078)][f(955)],
                                          (U = !0),
                                          t({ status: 'granted' });
                                      },
                                      function (n) {
                                        t(D(n[_0x34d2(e)])), (U = !1);
                                      },
                                      l,
                                    );
                                };
                              d();
                            }),
                          ];
                    case 2:
                      return [2, X[q(1278)]()];
                    case 3:
                      return U
                        ? [2]
                        : [
                            2,
                            L(
                              "Geolocation permission state is '" + k[q(P)] + q(C) + x + "'",
                              q(838),
                            ),
                          ];
                  }
                });
              });
            }),
            (Dt[Lt(816)][Lt(a)] = function () {
              return __awaiter(this, void 0, void 0, function () {
                var t,
                  e = 750,
                  n = 727,
                  i = 1324,
                  r = 1324;
                return __generator(this, function (o) {
                  var a = _0x34d2;
                  switch (o.label) {
                    case 0:
                      return [4, this[a(e)]()];
                    case 1:
                      return (
                        o[a(1278)](),
                        (t =
                          typeof window !== a(n) &&
                          window[a(i)] &&
                          typeof window[a(r)].length === a(818)
                            ? window[a(1324)][a(601)]
                            : null),
                        this[a(1078)] && (this[a(1078)].BROWSER_TAB_HISTORY_LENGTH = t),
                        [2]
                      );
                  }
                });
              });
            }),
            (Dt.prototype[Lt(s)] = function () {
              return __awaiter(this, void 0, void 0, function () {
                var t,
                  e,
                  n,
                  i,
                  r = 686,
                  o = 1206,
                  a = 603,
                  s = 1078,
                  u = 1104,
                  c = 1078,
                  l = 980;
                return __generator(this, function (d) {
                  var h = _0x34d2;
                  return (
                    (t = 160),
                    (e = window[h(898)] - window[h(r)] > t),
                    (n = window[h(508)] - window[h(o)] > t),
                    (i = h(e ? 581 : a)),
                    (this[h(s)].devToolsOpen = h(e || n ? 1250 : u)),
                    (this[h(c)].devToolsOrientation = e || n ? i : h(l)),
                    [2]
                  );
                });
              });
            }),
            (Dt[Lt(816)][Lt(679)] = function () {
              var t = 1077;
              return __awaiter(this, void 0, void 0, function () {
                var e = this;
                return __generator(this, function (n) {
                  var i = _0x34d2;
                  return [
                    2,
                    this.metadataQueue[i(t)](function () {
                      var t = 968,
                        n = 1154,
                        i = 1001,
                        r = 701,
                        o = 1278;
                      return __awaiter(e, void 0, void 0, function () {
                        var e;
                        return __generator(this, function (a) {
                          var s = _0x34d2;
                          switch (a[s(t)]) {
                            case 0:
                              return this.localAgentJwtRequestCount >= 5
                                ? [2, this[s(1001)]]
                                : this[s(982)][s(n)]
                                  ? this[s(i)]
                                    ? [3, 2]
                                    : ((e = this), [4, this[s(r)][s(1055)]()])
                                  : [3, 3];
                            case 1:
                              (e[s(i)] = a[s(o)]()), (a.label = 2);
                            case 2:
                              return this[s(695)]++, [2, this.localAgentJwt];
                            case 3:
                              return [2];
                          }
                        });
                      });
                    }),
                  ];
                });
              });
            }),
            (Dt.prototype.getObfsInfo = function () {
              return { identifier: 'x1', key: Lt(538) };
            }),
            (Dt[Lt(r)][Lt(1015)] = function () {
              return this[Lt(942)];
            }),
            (Dt[Lt(816)][Lt(u)] = function () {
              var n = 968,
                i = 633,
                r = 636,
                o = 1169,
                a = 920,
                s = 857,
                u = 1197,
                c = 559,
                l = 1337,
                d = 1071,
                h = 1125,
                f = 888,
                g = 644,
                p = 646,
                v = 845,
                _ = 827,
                m = 1100,
                b = 815,
                y = 1125,
                E = 646,
                w = 636,
                S = 1326,
                O = 504,
                I = 1025,
                T = 1209,
                A = 552;
              return __awaiter(this, void 0, void 0, function () {
                var P,
                  C,
                  L,
                  D,
                  x,
                  M = 599,
                  R = 815;
                return __generator(this, function (U) {
                  var k = 840,
                    N = 815,
                    B = 599,
                    F = 599,
                    H = 599,
                    V = 1227,
                    G = _0x34d2;
                  switch (U[G(n)]) {
                    case 0:
                      return (
                        (this.gpsSupported = null != navigator[G(i)]),
                        (P = this[G(r)][G(o)]),
                        (C = [
                          this[G(982)][G(a)]()[G(s)](function (e) {
                            var n = G;
                            t[n(R)].Logger.warn(n(612), e);
                          }),
                          this[G(u)](P).catch(function (e) {
                            var n = G;
                            t._POSignalsUtils[n(H)][n(840)](n(V), e.message);
                          }),
                          this.getBroPrintFingerPrint().catch(function (e) {
                            var n = G;
                            t[n(815)][n(599)][n(840)](
                              'failed to get broJsFingerprint info',
                              e[n(990)],
                            );
                          }),
                          e[G(c)][G(l)]().catch(function (e) {
                            var n = G;
                            return t[n(815)][n(F)].warn('failed to get private mode info', e);
                          }),
                          this[G(1295)]()[G(857)](function (e) {
                            var n = G;
                            return t[n(N)][n(B)].warn('failed to get permissions info', e);
                          }),
                          new e.DetectHeadless(P).getHeadlessResults()[G(s)](function (e) {
                            var n = G;
                            return t[n(815)][n(599)].warn(n(971), e);
                          }),
                          new e[G(733)](P)[G(d)]()[G(857)](function (e) {
                            var n = G;
                            return t._POSignalsUtils[n(M)][n(840)](n(597), e);
                          }),
                          this[G(501)]()[G(s)](function (e) {
                            var n = G;
                            return t[n(815)][n(599)][n(840)]('failed to get audio-video info', e);
                          }),
                          this[G(1098)]().catch(function (e) {
                            var n = G;
                            return t[n(815)].Logger[n(k)]('failed to get battery info', e);
                          }),
                        ]),
                        [4, Promise.all(C)]
                      );
                    case 1:
                      return (
                        (x = U[G(1278)]()),
                        (this[G(h)] = x[0]),
                        (this[G(640)] = x[1]),
                        (this.broJsFingerprint = x[2]),
                        (this[G(f)] = x[3]),
                        (this[G(641)] = x[4]),
                        (this[G(765)] = x[5]),
                        (this[G(g)] = x[6]),
                        (this[G(p)] = this.sessionData.getDeviceCreatedAt()),
                        (L = {
                          ops: this.OPS,
                          devicePixelRatio: window[G(997)],
                          screenWidth: window.screen[G(v)],
                          screenHeight: window[G(_)][G(m)],
                        }),
                        t[G(b)].Util.extendPrimitiveValues(L, screen, !1),
                        (D = [
                          {
                            deviceId: this[G(y)],
                            device_created_ts: this[G(E)],
                            deviceType: this[G(w)].browserInfo[G(535)],
                            osVersion:
                              (this[G(636)][G(981)][G(894)] + ' ' + this[G(w)][G(981)][G(859)])[
                                G(S)
                              ]() || '',
                            externalIdentifiers: this[G(O)],
                            origin: location[G(I)],
                            href: location[G(1024)],
                          },
                        ]),
                        [4, this[G(553)](P)]
                      );
                    case 2:
                      return [
                        2,
                        __assign[G(1209)](void 0, [
                          __assign[G(T)](void 0, [
                            __assign[G(T)](void 0, [
                              __assign[G(1209)](void 0, D[G(922)]([U.sent()])),
                              this.getIoMetadata(),
                            ]),
                            this[G(A)](),
                          ]),
                          L,
                        ]),
                      ];
                  }
                });
              });
            }),
            (Dt.prototype[Lt(c)] = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n = 1278,
                  i = this;
                return __generator(this, function (r) {
                  var o = 815,
                    a = 599,
                    s = 815,
                    u = 669,
                    c = 1298,
                    l = 836,
                    d = _0x34d2;
                  switch (r[d(968)]) {
                    case 0:
                      return (
                        (e = this),
                        [
                          4,
                          t[d(815)][d(526)][d(1138)](
                            50,
                            new Promise(function (n, r) {
                              var h = d;
                              navigator[h(889)]
                                ? ((i[h(1266)] = !0),
                                  navigator
                                    .getBattery()
                                    [h(893)](function (t) {
                                      var i = h;
                                      t &&
                                        ((e[i(572)] = t[i(u)]),
                                        (e.batteryCharging = t[i(1230)]),
                                        (e[i(c)] = t[i(1247)]),
                                        (e[i(985)] = t[i(l)])),
                                        n();
                                    })
                                    .catch(function (e) {
                                      var i = h;
                                      t[i(s)][i(599)][i(840)](i(1037) + e), n();
                                    }))
                                : (t[h(o)][h(a)][h(1202)](h(1135)), n());
                            }),
                          ),
                        ]
                      );
                    case 1:
                      return r[d(n)](), [2];
                  }
                });
              });
            }),
            (Dt[Lt(l)].enumerateDevicesEnabled = function () {
              var e = Lt,
                n = /^((?!chrome|android).)*safari/i[e(649)](navigator[e(At)]);
              return !t[e(Pt)][e(Ct)][e(524)]() || !n;
            }),
            (Dt.prototype[Lt(d)] = function () {
              var t = Lt,
                e = window[t(1030)] || window[t(U)] || window[t(k)];
              if (!e) {
                var n = window[t(N)];
                n && (e = n.RTCPeerConnection || n[t(1185)] || n[t(B)]);
              }
              return e;
            }),
            (Dt.prototype[Lt(1016)] = function () {
              var t = 700,
                e = 802,
                n = 717,
                i = 563,
                r = 717,
                o = Lt,
                a = this;
              try {
                var s = {},
                  u = this[o(wt)](),
                  c = new u(
                    { iceServers: [{ urls: this[o(636)][o(762)][o(St)]() }] },
                    { optional: [{ RtpDataChannels: !0 }] },
                  );
                (c[o(Ot)] = function (u) {
                  var c = o;
                  if (u.candidate) {
                    var l = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/[c(t)](
                      u.candidate[c(e)],
                    )[1];
                    void 0 === s[l] &&
                      (u[c(802)].candidate[c(n)](c(i)) > 0
                        ? a[c(919)][c(1181)]('WEB_RTC_HOST_IP', l)
                        : u[c(e)].candidate[c(r)]('srflx') > 0 && a.webRtcIps.set(c(1318), l)),
                      (s[l] = !0);
                  }
                }),
                  c[o(It)](''),
                  c[o(Tt)](
                    function (t) {
                      c[o(620)](
                        t,
                        function () {},
                        function () {},
                      );
                    },
                    function () {},
                  );
              } catch (t) {}
            }),
            (Dt[Lt(h)][Lt(501)] = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n = 968,
                  i = 1138,
                  r = this;
                return __generator(this, function (o) {
                  var a = 1224,
                    s = 1202,
                    u = 815,
                    c = 599,
                    l = 1202,
                    d = 1325,
                    h = 713,
                    f = 1140,
                    g = _0x34d2;
                  switch (o[g(n)]) {
                    case 0:
                      return (
                        (e = this),
                        [
                          4,
                          t._POSignalsUtils.Util[g(i)](
                            50,
                            new Promise(function (n, i) {
                              var o = 815,
                                p = 599,
                                v = 840,
                                _ = 1117,
                                m = 1161,
                                b = 1091,
                                y = 1179,
                                E = 968,
                                w = 1283,
                                S = 1161,
                                O = g;
                              return r[O(a)]()
                                ? navigator.mediaDevices && navigator[O(713)].enumerateDevices
                                  ? void navigator[O(h)]
                                      [O(1220)]()
                                      [O(893)](function (t) {
                                        var i = O;
                                        t[i(f)](function (t) {
                                          var n = i;
                                          t[n(1091)] &&
                                            (t[n(1091)][n(1006)]() == n(1307)
                                              ? ((e[n(_)] = !0),
                                                e[n(1275)]++,
                                                t.label && e[n(638)][n(m)](t[n(968)]))
                                              : 'videoinput' == t[n(b)].toLowerCase()
                                                ? ((e[n(y)] = !0),
                                                  e.numberOfVideoDevices++,
                                                  t.label && e[n(1026)].push(t[n(E)]))
                                                : t[n(1091)][n(1006)]() == n(w) &&
                                                  ((e[n(557)] = !0),
                                                  e.numberOfAudioDevices++,
                                                  t[n(968)] &&
                                                    e.audioOutputDevices[n(S)](t.label)));
                                        }),
                                          n();
                                      })
                                      [O(857)](function (e) {
                                        var i = O;
                                        t[i(o)][i(p)][i(v)](i(529), e), n();
                                      })
                                  : (t[O(u)][O(c)][O(l)](O(d)), void n())
                                : (t[O(815)][O(599)][O(s)](
                                    'enumerateDevices() cannot run within safari iframe',
                                  ),
                                  void n());
                            }),
                          ),
                        ]
                      );
                    case 1:
                      return o.sent(), [2];
                  }
                });
              });
            }),
            (Dt.prototype[Lt(f)] = function (e) {
              var n = 732,
                i = 1054,
                r = 1255,
                o = 1278;
              return __awaiter(this, void 0, void 0, function () {
                var a,
                  s,
                  u = this;
                return __generator(this, function (c) {
                  var l = _0x34d2;
                  switch (c[l(968)]) {
                    case 0:
                      return e[l(886)](l(n))
                        ? [2, Promise[l(i)]('')]
                        : ((a = new Promise(function (e, n) {
                            return __awaiter(u, void 0, void 0, function () {
                              var i,
                                r,
                                o,
                                a = 1278,
                                s = 661,
                                u = 599,
                                c = 570;
                              return __generator(this, function (l) {
                                var d = _0x34d2;
                                switch (l[d(968)]) {
                                  case 0:
                                    return l.trys.push([0, 3, , 4]), [4, t[d(743)].load()];
                                  case 1:
                                    return [4, l[d(a)]().get()];
                                  case 2:
                                    return (
                                      (i = l[d(1278)]()),
                                      (this[d(640)] = i[d(s)]),
                                      (this[d(1073)] = i[d(593)]),
                                      e(i[d(661)]),
                                      [3, 4]
                                    );
                                  case 3:
                                    return (
                                      (r = l[d(1278)]()),
                                      t._POSignalsUtils[d(u)][d(840)](d(527) + r),
                                      (o = { err: r, message: d(c) }),
                                      n(o),
                                      [3, 4]
                                    );
                                  case 4:
                                    return [2];
                                }
                              });
                            });
                          })),
                          (s = new Promise(function (e, n) {
                            return __awaiter(u, void 0, void 0, function () {
                              var e = 968,
                                i = 792,
                                r = 636,
                                o = 1278;
                              return __generator(this, function (a) {
                                var s = _0x34d2;
                                switch (a[s(e)]) {
                                  case 0:
                                    return [4, t._POSignalsUtils.Util[s(i)](this[s(r)][s(586)])];
                                  case 1:
                                    return a[s(o)](), n({ message: 'Fingerprint timeout' }), [2];
                                }
                              });
                            });
                          })),
                          [4, Promise[l(r)]([a, s])]);
                    case 1:
                      return [2, c[l(o)]()];
                  }
                });
              });
            }),
            (Dt.prototype.getBroPrintFingerPrint = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e = 857,
                  n = this;
                return __generator(this, function (i) {
                  return [
                    2,
                    new Promise(function (i, r) {
                      var o = 599,
                        a = _0x34d2;
                      t[a(978)]
                        [a(1164)]()
                        .then(function (t) {
                          (n[a(936)] = t), i(t);
                        })
                        [a(e)](function (e) {
                          var n = a;
                          t[n(815)][n(o)].warn(
                            'Failed to get Fingerprint from getCurrentBrowserFingerPrint',
                            e,
                          ),
                            r(e);
                        });
                    }),
                  ];
                });
              });
            }),
            (Dt[Lt(816)].getSensorsMetadata = function () {
              var t = Lt,
                e = {};
              return (
                this.flatAndAddMetadata(e, 'DEDVCE_LIGHT_SUPPORTED', function () {
                  return 'ondevicelight' in window;
                }),
                this[t(1160)](e, t(1294), function () {
                  return t(Et) in window;
                }),
                !window.DeviceMotionEvent &&
                  this[t(1160)](e, t(bt), function () {
                    return !1;
                  }),
                !window[t(1331)] &&
                  this[t(1160)](e, t(yt), function () {
                    return !1;
                  }),
                this.flatAndAddMetadata(e, 'PROXIMITY_SUPPORTED', function () {
                  return t(1264) in window;
                }),
                e
              );
            }),
            (Dt[Lt(816)][Lt(553)] = function (n) {
              return __awaiter(this, void 0, void 0, function () {
                var i,
                  r,
                  o,
                  a,
                  s,
                  u,
                  c,
                  l,
                  d,
                  h,
                  f,
                  g,
                  p,
                  v,
                  _,
                  m,
                  b,
                  y,
                  E,
                  w,
                  S,
                  O,
                  I = 968,
                  T = 981,
                  A = 1160,
                  P = 1115,
                  C = 1160,
                  L = 636,
                  D = 1160,
                  x = 1012,
                  M = 930,
                  R = 487,
                  U = 1160,
                  k = 519,
                  N = 1272,
                  B = 1160,
                  F = 1160,
                  H = 820,
                  V = 1160,
                  G = 651,
                  j = 1076,
                  W = 1160,
                  K = 1136,
                  z = 887,
                  Y = 1160,
                  X = 1060,
                  q = 995,
                  J = 722,
                  Z = 497,
                  Q = 1160,
                  $ = 1186,
                  tt = 621,
                  et = 1278,
                  nt = 1097,
                  it = 1160,
                  rt = 966,
                  ot = 1160,
                  at = 1160,
                  st = 1160,
                  ut = 738,
                  ct = 1160,
                  lt = 1160,
                  dt = 1160,
                  ht = 1160,
                  ft = 824,
                  gt = 877,
                  pt = 1105,
                  vt = 555,
                  _t = 574,
                  mt = 1160,
                  bt = 689,
                  yt = 817,
                  Et = 1073,
                  wt = 1073,
                  St = 564,
                  Ot = 1233,
                  It = 566,
                  Tt = 520,
                  At = 1156,
                  Pt = 1160,
                  Ct = 945,
                  Lt = 1160,
                  Dt = 1124,
                  xt = 540,
                  Mt = 578,
                  Rt = 619,
                  Ut = 667,
                  kt = 1022,
                  Nt = 1198,
                  Bt = 1160,
                  Ft = 1160,
                  Ht = 731,
                  Vt = 1093,
                  Gt = 1160,
                  jt = 1160,
                  Wt = 1263,
                  Kt = 949,
                  zt = 773,
                  Yt = 1292,
                  Xt = 823,
                  qt = 876,
                  Jt = 1165,
                  Zt = 714,
                  Qt = 1160,
                  $t = 1214,
                  te = 982,
                  ee = 503,
                  ne = 1140,
                  ie = 919,
                  re = 1160,
                  oe = 1153,
                  ae = 536,
                  se = 1089,
                  ue = 512,
                  ce = 1160,
                  le = 1192,
                  de = 639,
                  he = 1232,
                  fe = 1142,
                  ge = 1160,
                  pe = 628,
                  ve = 686,
                  _e = 714,
                  me = 607,
                  be = 1233,
                  ye = 1022,
                  Ee = 1022,
                  we = 821,
                  Se = 1160,
                  Oe = 794,
                  Ie = 1047,
                  Te = 565,
                  Ae = 638,
                  Pe = 565,
                  Ce = 601,
                  Le = 1161,
                  De = 1114,
                  xe = 1301,
                  Me = 765,
                  Re = 947,
                  Ue = 490,
                  ke = 947,
                  Ne = 1003,
                  Be = 1036,
                  Fe = 828,
                  He = 799,
                  Ve = 947,
                  Ge = 828,
                  je = 1013,
                  We = 1087,
                  Ke = 590,
                  ze = 498,
                  Ye = 976,
                  Xe = 519,
                  qe = 825,
                  Je = 636,
                  Ze = 981,
                  Qe = 519,
                  $e = 1183,
                  tn = 981,
                  en = 519,
                  nn = 636,
                  rn = 981,
                  on = 636,
                  an = 494,
                  sn = 981,
                  un = 819,
                  cn = 562,
                  ln = 812,
                  dn = 981,
                  hn = 640,
                  fn = this;
                return __generator(this, function (gn) {
                  var pn = 925,
                    vn = 1038,
                    _n = 781,
                    mn = 571,
                    bn = 781,
                    yn = 1160,
                    En = 1302,
                    wn = 1223,
                    Sn = 1007,
                    On = 1069,
                    In = 1223,
                    Tn = 1302,
                    An = 1116,
                    Pn = 1190,
                    Cn = 1334,
                    Ln = 1327,
                    Dn = 1026,
                    xn = 565,
                    Mn = 509,
                    Rn = 1286,
                    Un = 660,
                    kn = 1205,
                    Nn = 644,
                    Bn = 882,
                    Fn = 1005,
                    Hn = 888,
                    Vn = 663,
                    Gn = 1073,
                    jn = 1031,
                    Wn = 1160,
                    Kn = 1182,
                    zn = 1160,
                    Yn = 809,
                    Xn = 1160,
                    qn = 800,
                    Jn = 1160,
                    Zn = 830,
                    Qn = 665,
                    $n = 989,
                    ti = 854,
                    ei = 1160,
                    ni = 917,
                    ii = 809,
                    ri = 1172,
                    oi = 1081,
                    ai = 560,
                    si = 809,
                    ui = 601,
                    ci = 495,
                    li = 809,
                    di = 783,
                    hi = 809,
                    fi = 947,
                    gi = 947,
                    pi = 975,
                    vi = 947,
                    _i = 601,
                    mi = 600,
                    bi = 1219,
                    yi = 837,
                    Ei = 645,
                    wi = 674,
                    Si = 601,
                    Oi = 636,
                    Ii = 981,
                    Ti = 636,
                    Ai = _0x34d2;
                  switch (gn[Ai(I)]) {
                    case 0:
                      return (
                        (i = this),
                        (r = {}),
                        this.flatAndAddMetadata(r, Ai(579), function () {
                          return fn[Ai(hn)];
                        }),
                        this[Ai(1160)](r, Ai(685), function () {
                          return fn[Ai(936)];
                        }),
                        this[Ai(636)][Ai(T)].userAgentData &&
                          (this[Ai(A)](r, Ai(P), function () {
                            var t = Ai;
                            return fn.metadataParams[t(dn)][t(894)];
                          }),
                          this[Ai(C)](r, 'OS_VERSION', function () {
                            var t = Ai;
                            return fn[t(Ti)].browserInfo[t(859)];
                          })),
                        this[Ai(L)][Ai(981)][Ai(519)] &&
                          (this[Ai(D)](r, Ai(x), function () {
                            var t = Ai;
                            return fn[t(636)][t(981)].deviceModel;
                          }),
                          this[Ai(D)](r, 'DEVICE_VENDOR', function () {
                            var t = Ai;
                            return fn[t(636)][t(981)][t(ln)];
                          }),
                          this[Ai(1160)](r, Ai(M), function () {
                            var t = Ai;
                            return fn[t(636)][t(981)].deviceCategory;
                          })),
                        this[Ai(L)][Ai(981)][Ai(519)] &&
                          (this.flatAndAddMetadata(r, Ai(R), function () {
                            var t = Ai;
                            return fn.metadataParams.browserInfo[t(cn)];
                          }),
                          this[Ai(U)](r, 'BROWSER_ENGINE_VERSION', function () {
                            var t = Ai;
                            return fn[t(636)][t(Ii)][t(890)];
                          })),
                        this.metadataParams[Ai(981)][Ai(k)] &&
                          this[Ai(1160)](r, Ai(N), function () {
                            var t = Ai;
                            return fn[t(636)][t(sn)][t(un)];
                          }),
                        this[Ai(L)][Ai(981)][Ai(519)] &&
                          (this[Ai(B)](r, Ai(492), function () {
                            var t = Ai;
                            return fn[t(on)].browserInfo[t(an)];
                          }),
                          this[Ai(F)](r, Ai(850), function () {
                            var t = Ai;
                            return fn[t(636)].browserInfo[t(1014)];
                          }),
                          this[Ai(1160)](r, 'BROWSER_MAJOR', function () {
                            var t = Ai;
                            return fn[t(nn)][t(rn)][t(1199)];
                          }),
                          this[Ai(D)](r, Ai(1303), function () {
                            var t = Ai;
                            return fn[t(Oi)][t(981)][t(847)];
                          })),
                        (o = new e[Ai(H)]()),
                        this[Ai(D)](r, Ai(1311), function () {
                          var t = Ai;
                          return o[t(514)](fn[t(636)][t(981)][t(519)].ua);
                        }),
                        this[Ai(1160)](r, Ai(941), function () {
                          var t = Ai;
                          return o[t(1201)](fn[t(636)][t(tn)][t(en)].ua);
                        }),
                        this[Ai(V)](r, 'IS_CHROME_FAMILY', function () {
                          var t = Ai;
                          return o[t(qe)](fn[t(Je)][t(Ze)][t(Qe)][t($e)]);
                        }),
                        this.flatAndAddMetadata(r, Ai(G), function () {
                          var t = Ai;
                          return o.isElectronFamily(fn[t(636)].browserInfo[t(Xe)].ua);
                        }),
                        this[Ai(1160)](r, Ai(826), function () {
                          return navigator[Ai(799)];
                        }),
                        this[Ai(1160)](r, Ai(j), function () {
                          var t = Ai;
                          return navigator.plugins ? navigator[t(1301)][t(Si)] : null;
                        }),
                        this.flatAndAddMetadata(r, Ai(911), function () {
                          var t = Ai;
                          return navigator[t(wi)] ? navigator[t(wi)].length : null;
                        }),
                        this[Ai(W)](r, Ai(K), function () {
                          var t = Ai;
                          return (
                            navigator.language ||
                            navigator[t(ze)] ||
                            navigator.browserLanguage ||
                            navigator[t(Ye)]
                          );
                        }),
                        this[Ai(1160)](r, Ai(1029), function () {
                          return navigator[Ai(Ke)];
                        }),
                        this.flatAndAddMetadata(r, Ai(z), function () {
                          return navigator[Ai(718)] || navigator.msMaxTouchPoints;
                        }),
                        this[Ai(Y)](r, Ai(1010), function () {
                          var t = Ai;
                          return navigator.pointerEnabled || navigator[t(Ei)];
                        }),
                        this[Ai(F)](r, Ai(X), function () {
                          return navigator.webdriver;
                        }),
                        this.flatAndAddMetadata(r, Ai(846), function () {
                          return navigator[Ai(987)];
                        }),
                        this[Ai(Y)](r, Ai(q), function () {
                          return null != navigator[Ai(yi)];
                        }),
                        this.flatAndAddMetadata(r, Ai(896), function () {
                          return 'Notification' in window;
                        }),
                        this[Ai(1160)](r, Ai(J), function () {
                          return navigator.appCodeName;
                        }),
                        this[Ai(1160)](r, 'NAVIGATOR_APP_NAME', function () {
                          return navigator[Ai(706)];
                        }),
                        this[Ai(1160)](r, Ai(1256), function () {
                          return navigator[Ai(913)];
                        }),
                        this[Ai(1160)](r, 'NAVIGATOR_ON_LINE', function () {
                          return navigator[Ai(bi)];
                        }),
                        this[Ai(F)](r, Ai(Z), function () {
                          return navigator[Ai(622)];
                        }),
                        this[Ai(Q)](r, Ai(965), function () {
                          return navigator[Ai(814)];
                        }),
                        this.flatAndAddMetadata(r, Ai($), function () {
                          return navigator[Ai(841)];
                        }),
                        this[Ai(D)](r, 'NAVIGATOR_PDF_VIEWER_ENABLED', function () {
                          return navigator.pdfViewerEnabled;
                        }),
                        this[Ai(Q)](r, Ai(tt), function () {
                          return navigator.deviceMemory;
                        }),
                        this[Ai(1160)](r, Ai(1277), function () {
                          var t = Ai;
                          return navigator[t(676)] ? navigator.connection[t(We)] : null;
                        }),
                        n[Ai(886)]('modernizr') ? [3, 2] : [4, this.safeAddModernizrFeatures(r)]
                      );
                    case 1:
                      gn[Ai(et)](), (gn[Ai(I)] = 2);
                    case 2:
                      if (
                        ((a = window[Ai(nt)] || window._ST_PING)
                          ? this[Ai(it)](r, Ai(rt), function () {
                              return a;
                            })
                          : this[Ai(A)](r, Ai(rt), function () {
                              return Ai(980);
                            }),
                        this[Ai(ot)](r, Ai(853), function () {
                          var t = Ai;
                          return typeof window !== t(727) &&
                            window.history &&
                            typeof window.history.length === t(818)
                            ? window.history.length
                            : null;
                        }),
                        (s = new e.WebGLMetadata()),
                        this[Ai(at)](r, Ai(870), function () {
                          return s[Ai(je)]();
                        }),
                        this[Ai(Q)](r, Ai(924), function () {
                          var t = Ai;
                          return s[t(947)]()[t(He)] + '~' + s[t(Ve)]()[t(Ge)];
                        }),
                        this.flatAndAddMetadata(r, 'IS_WEBGL2', function () {
                          return s[Ai(716)]();
                        }),
                        s[Ai(716)]()
                          ? this[Ai(st)](r, Ai(ut), function () {
                              var t = Ai;
                              return s[t(947)]().vendor + '~' + s.getWebglData()[t(Fe)];
                            })
                          : this[Ai(1160)](r, Ai(ut), function () {
                              return '';
                            }),
                        this[Ai(ct)](r, Ai(1203), function () {
                          var t = Ai;
                          return s[t(947)]()[t(mi)];
                        }),
                        this[Ai(lt)](r, 'WEBGL_SHADINGLANGUAGEVERSION', function () {
                          var t = Ai;
                          return s.getWebglData()[t(Be)];
                        }),
                        this.flatAndAddMetadata(r, Ai(858), function () {
                          var t = Ai;
                          return s.getWebglData()[t(744)][t(_i)];
                        }),
                        this[Ai(dt)](r, Ai(1184), function () {
                          return s[Ai(947)]().maxTextureSize;
                        }),
                        this[Ai(ht)](r, Ai(613), function () {
                          var t = Ai;
                          return s.getWebglData()[t(Ne)];
                        }),
                        this.flatAndAddMetadata(r, 'WEBGL_MAXTEXTUREIMAGEUNITS', function () {
                          return s[Ai(947)]().maxTextureImageUnits;
                        }),
                        this[Ai(1160)](r, Ai(ft), function () {
                          var t = Ai;
                          return s[t(vi)]()[t(1088)];
                        }),
                        this[Ai(1160)](r, Ai(986), function () {
                          var t = Ai;
                          return s[t(ke)]()[t(544)];
                        }),
                        this[Ai(1160)](r, Ai(gt), function () {
                          var t = Ai;
                          return s.getWebglData()[t(pi)];
                        }),
                        this[Ai(1160)](r, Ai(pt), function () {
                          var t = Ai;
                          return s[t(Re)]()[t(Ue)];
                        }),
                        this[Ai(it)](r, 'WEBGL_MAXVERTEXUNIFORMVECTORS', function () {
                          return s[Ai(gi)]().maxVertexUniformVectors;
                        }),
                        this[Ai(1160)](r, Ai(vt), function () {
                          var t = Ai;
                          return s[t(fi)]()[t(1162)];
                        }),
                        this[Ai(1160)](r, Ai(_t), function () {
                          return s.getHasLiedLanguages();
                        }),
                        this.flatAndAddMetadata(r, 'HASLIEDRESOLUTION', function () {
                          return s.getHasLiedResolution();
                        }),
                        this[Ai(mt)](r, Ai(bt), function () {
                          return s[Ai(697)]();
                        }),
                        this[Ai(1160)](r, Ai(yt), function () {
                          return s[Ai(1132)]();
                        }),
                        this[Ai(Et)])
                      )
                        for (l in ((u = function (t) {
                          var e = 809,
                            n = 809,
                            o = 809,
                            a = 783,
                            s = 783,
                            u = Ai;
                          if (!c[u(1073)].hasOwnProperty(t)) return u(Vn);
                          var l = c[u(Gn)][t];
                          t == u(jn)
                            ? c[u(Wn)](r, 'JS_FONTS', function () {
                                var t = u;
                                return l[t(809)][t(601)];
                              })
                            : t == u(Kn)
                              ? c[u(zn)](r, 'IS_CANVAS', function () {
                                  return null != l[u(809)];
                                })
                              : 'screenResolution' == t && l.value && l[u(Yn)].length
                                ? c[u(Xn)](r, u(qn), function () {
                                    var t = u;
                                    return l[t(809)][t(s)](',');
                                  })
                                : 'touchSupport' == t && l[u(809)]
                                  ? c[u(Jn)](r, 'TOUCH_SUPPORT', function () {
                                      return l.value;
                                    })
                                  : t == u(Zn) && l.value
                                    ? c.flatAndAddMetadata(r, u(Qn), function () {
                                        return l[u(809)];
                                      })
                                    : 'osCpu' == t && l[u(809)]
                                      ? c[u(1160)](r, u($n), function () {
                                          return l[u(809)];
                                        })
                                      : t == u(ti) && l.value
                                        ? c[u(ei)](r, 'COOKIES_ENABLED', function () {
                                            return l[u(hi)];
                                          })
                                        : t == u(ni) && l[u(809)] && l[u(ii)].length
                                          ? c.flatAndAddMetadata(r, u(1101), function () {
                                              var t = u;
                                              return l[t(809)][t(a)](',');
                                            })
                                          : t == u(1304) && l[u(809)]
                                            ? c[u(1160)](r, u(598), function () {
                                                return l.value;
                                              })
                                            : t == u(ri) && l[u(oi)]
                                              ? c[u(1160)](r, u(1271), function () {
                                                  return l[u(1081)];
                                                })
                                              : 'fontPreferences' == t && l[u(809)]
                                                ? c[u(Xn)](r, u(499), function () {
                                                    return l[u(o)];
                                                  })
                                                : t == u(ai) && l[u(809)]
                                                  ? c[u(zn)](r, 'PDF_VIEWER_ENABLED', function () {
                                                      return l[u(n)];
                                                    })
                                                  : 'vendorFlavors' == t &&
                                                      l[u(si)] &&
                                                      l.value[u(ui)]
                                                    ? c.flatAndAddMetadata(
                                                        r,
                                                        'VENDOR_FLAVORS',
                                                        function () {
                                                          var t = u;
                                                          return l[t(809)][t(di)](',');
                                                        },
                                                      )
                                                    : t == u(1109) && l[u(si)]
                                                      ? c.flatAndAddMetadata(
                                                          r,
                                                          'VIDEO_CARD',
                                                          function () {
                                                            var t = u;
                                                            return l[t(e)][t(828)];
                                                          },
                                                        )
                                                      : i.fingerPrintComponentKeys[u(886)](t) &&
                                                        null != t &&
                                                        c[u(1160)](r, t[u(ci)](), function () {
                                                          return l[u(li)];
                                                        });
                        }),
                        (c = this),
                        this[Ai(wt)]))
                          u(l);
                      for (p in (this[Ai(1160)](r, 'IS_PRIVATE_MODE', function () {
                        return fn[Ai(Hn)];
                      }),
                      this[Ai(1160)](r, Ai(St), function () {
                        return fn[Ai(Fn)];
                      }),
                      (d = {
                        selenium:
                          navigator[Ai(1302)] ||
                          t[Ai(815)].Util.getAttribute(
                            window[Ai(Ot)].documentElement,
                            'webdriver',
                          ) ||
                          '',
                        phantomjs: {
                          _phantom: window._phantom || '',
                          __phantomas: window[Ai(It)] || '',
                          callPhantom: window[Ai(Tt)] || '',
                        },
                        nodejs: { Buffer: window.Buffer || '' },
                        couchjs: { emit: window[Ai(874)] || '' },
                        rhino: { spawn: window[Ai(At)] || '' },
                        chromium: {
                          domAutomationController: window[Ai(567)] || '',
                          domAutomation: window[Ai(653)] || '',
                        },
                        outerWidth: window.outerWidth,
                        outerHeight: window.outerHeight,
                      }),
                      this[Ai(it)](r, 'HEADLESS', function () {
                        return d;
                      }),
                      this[Ai(Pt)](r, 'HEADLESS', function () {
                        return fn[Ai(Me)];
                      }),
                      this.flatAndAddMetadata(r, Ai(Ct), function () {
                        var t = Ai,
                          e = {};
                        for (var n in fn.lieTests) e[n] = JSON[t(kn)](fn[t(Nn)][n]);
                        return Object[t(Bn)](e).length > 0 ? e : null;
                      }),
                      this[Ai(1160)](r, 'STEALTH', function () {
                        var t = Ai;
                        return new e.DetectStealth(n)[t(Un)]();
                      }),
                      this[Ai(Lt)](r, 'REF_LINK', function () {
                        return document[Ai(Rn)];
                      }),
                      this.flatAndAddMetadata(r, 'PLUGINS', function () {
                        for (
                          var t = Ai, e = { length: navigator.plugins[t(601)], details: [] }, n = 0;
                          n < e[t(Ce)];
                          n++
                        )
                          e.details[t(Le)]({
                            length: navigator[t(1301)][n][t(601)],
                            name: navigator.plugins[n][t(De)],
                            version: navigator[t(1301)][n].version,
                            filename: navigator[t(xe)][n][t(1215)],
                          });
                        return e;
                      }),
                      this.flatAndAddMetadata(r, Ai(Dt), function () {
                        return fn[Ai(1275)];
                      }),
                      this[Ai(lt)](r, 'VIDEO', function () {
                        return fn[Ai(Mn)];
                      }),
                      this.flatAndAddMetadata(r, Ai(xt), function () {
                        var t = Ai;
                        return fn[t(Dn)][t(xn)]();
                      }),
                      this.flatAndAddMetadata(r, Ai(Mt), function () {
                        var t = Ai;
                        return fn[t(Ae)][t(Pe)]();
                      }),
                      this[Ai(mt)](r, 'AUDIO_OUTPUT_DEVICES', function () {
                        var t = Ai;
                        return fn[t(614)][t(Te)]();
                      }),
                      this[Ai(1160)](r, 'MEDIA_CODEC_MP4_AVC1', function () {
                        var t = Ai;
                        return fn.getMediaCodec(t(Ie));
                      }),
                      this.flatAndAddMetadata(r, Ai(Rt), function () {
                        var t = Ai;
                        return fn[t(1334)](t(760));
                      }),
                      this[Ai(1160)](r, Ai(Ut), function () {
                        var t = Ai;
                        return fn[t(Cn)](t(Ln));
                      }),
                      (h = this.metadataParams[Ai(615)]),
                      (f = function (t) {
                        var e = 1334,
                          n = Ai;
                        if (!h.hasOwnProperty(t)) return n(663);
                        g[n(Se)](r, n(Oe) + t, function () {
                          return fn[n(e)](h[t]);
                        });
                      }),
                      (g = this),
                      h))
                        f(p);
                      window[Ai(kt)] &&
                        window.performance[Ai(Nt)] &&
                        (this[Ai(Bt)](r, Ai(1246), function () {
                          return window[Ai(1022)].memory.jsHeapSizeLimit;
                        }),
                        this[Ai(Ft)](r, Ai(Ht), function () {
                          var t = Ai;
                          return window[t(Ee)].memory[t(we)];
                        }),
                        this[Ai(ot)](r, Ai(551), function () {
                          var t = Ai;
                          return window[t(ye)][t(1198)][t(808)];
                        })),
                        this.flatAndAddMetadata(r, Ai(856), function () {
                          return navigator[Ai(Pn)];
                        }),
                        this[Ai(lt)](r, 'selenium_in_document', function () {
                          var t = Ai;
                          return e[t(1116)][t(1108)]();
                        }),
                        this[Ai(1160)](r, Ai(Vt), function () {
                          return e.SeleniumProperties.seleniumInWindow();
                        }),
                        this[Ai(1160)](r, Ai(970), function () {
                          return e[Ai(An)].seleniumInNavigator();
                        }),
                        this[Ai(Gt)](r, Ai(897), function () {
                          var t = Ai;
                          return e.SeleniumProperties[t(1053)]();
                        }),
                        this[Ai(jt)](r, Ai(Wt), function () {
                          var e = Ai;
                          return t._POSignalsUtils.Util.getAttribute(
                            window[e(be)].documentElement,
                            'selenium',
                          );
                        }),
                        this[Ai(1160)](r, Ai(Kt), function () {
                          var e = Ai;
                          return t[e(815)].Util[e(On)](window[e(1233)][e(In)], e(Tn));
                        }),
                        this[Ai(1160)](r, 'DOCUMENT_ELEMENT_DRIVER', function () {
                          var e = Ai;
                          return t[e(815)][e(526)][e(1069)](window[e(1233)][e(wn)], e(Sn));
                        }),
                        this.flatAndAddMetadata(r, Ai(zt), function () {
                          var e = Ai;
                          return !!t[e(815)].Util[e(1069)](document[e(795)](e(1273))[0], e(En));
                        }),
                        this[Ai(1160)](r, Ai(Yt), function () {
                          return !!window[Ai(me)];
                        }),
                        this[Ai(1160)](r, 'window_awesomium', function () {
                          return !!window.awesomium;
                        }),
                        this.flatAndAddMetadata(r, Ai(Xt), function () {
                          return !!window[Ai(1305)];
                        }),
                        this[Ai(ot)](r, Ai(qt), function () {
                          return !!window[Ai(1204)];
                        }),
                        this[Ai(D)](r, 'hasTrustToken', function () {
                          return 'hasTrustToken' in document;
                        }),
                        this[Ai(1160)](r, Ai(Jt), function () {
                          return 'trustTokenOperationError' in XMLHttpRequest[Ai(816)];
                        }),
                        this[Ai(1160)](r, Ai(513), function () {
                          var t = Ai;
                          return t(513) in XMLHttpRequest[t(816)];
                        }),
                        this.flatAndAddMetadata(r, Ai(Zt), function () {
                          var t = Ai;
                          return t(_e) in HTMLIFrameElement[t(816)];
                        }),
                        this[Ai(A)](r, 'localStorage.length', function () {
                          return localStorage[Ai(601)];
                        }),
                        this[Ai(Qt)](r, Ai($t), function () {
                          return sessionStorage.length;
                        }),
                        this[Ai(te)][Ai(ee)][Ai(ne)](function (t) {
                          var e = Ai;
                          fn[e(1160)](r, t[e(495)]() + e(1032), function () {
                            return !0;
                          });
                        }),
                        this[Ai(Bt)](r, Ai(908), function () {
                          return !!fn[Ai(596)]();
                        }),
                        this[Ai(L)].webRtcUrl &&
                          this[Ai(L)][Ai(762)][Ai(601)] > 0 &&
                          (this[Ai(1016)](),
                          this[Ai(ie)][Ai(ne)](function (t, e) {
                            null != e &&
                              null != t &&
                              fn[Ai(yn)](r, e, function () {
                                return t;
                              });
                          }),
                          this.webRtcIps.clear()),
                        window.matchMedia &&
                          this[Ai(re)](r, Ai(oe), function () {
                            var t = Ai,
                              e = window[t(979)]('(min-width: ' + (window[t(ve)] - 1) + 'px)');
                            return { matches: e[t(1086)], media: e[t(1269)] };
                          }),
                        this[Ai(1213)](r, n),
                        window[Ai(ae)] &&
                          this[Ai(1160)](r, Ai(1217), function () {
                            var t = Ai;
                            return window.Notification[t(1018)];
                          }),
                        this.flatAndAddMetadata(r, Ai(1222), function () {
                          var t = Ai;
                          return window.chrome && t(pe) in window.chrome;
                        }),
                        this[Ai(1160)](r, Ai(855), function () {
                          var t = Ai;
                          return window[t(781)] && 'csi' in window[t(bn)];
                        }),
                        this[Ai(1160)](r, Ai(se), function () {
                          var t = Ai;
                          return window[t(_n)] && t(mn) in window[t(_n)];
                        }),
                        this[Ai(1160)](r, Ai(ue), function () {
                          return window.chrome && 'runtime' in window.chrome;
                        }),
                        this.addClientHints(r),
                        this[Ai(it)](r, Ai(1092), function () {
                          return !!navigator[Ai(vn)];
                        }),
                        this[Ai(1160)](r, 'NAVIGATOR_HID_SUPPORTED', function () {
                          return !!navigator[Ai(761)];
                        }),
                        this[Ai(ce)](r, Ai(1080), function () {
                          return !!navigator[Ai(pn)];
                        }),
                        this[Ai(1160)](r, Ai(630), function () {
                          return !!navigator.presentation;
                        }),
                        (gn[Ai(968)] = 3);
                    case 3:
                      return (
                        gn.trys[Ai(1161)]([3, 6, , 7]),
                        n[Ai(886)](Ai(944)) || !t[Ai(526)][Ai(688)](document[Ai(le)])
                          ? [3, 5]
                          : [4, t.Util[Ai(1138)](100, document.interestCohort())]
                      );
                    case 4:
                      (v = gn[Ai(1278)]()),
                        (_ = v.id),
                        (m = v[Ai(de)]),
                        this[Ai(mt)](r, Ai(729), function () {
                          return _;
                        }),
                        this.flatAndAddMetadata(r, Ai(1313), function () {
                          return m;
                        }),
                        (gn[Ai(968)] = 5);
                    case 5:
                      return [3, 7];
                    case 6:
                      return gn[Ai(et)](), [3, 7];
                    case 7:
                      for (E in ((b = function (e) {
                        var n = 526,
                          i = 636,
                          o = Ai;
                        y[o(ge)](r, e, function () {
                          var r = o;
                          return t[r(815)][r(n)].getProperty(window, fn[r(i)].dataPoints[e]);
                        });
                      }),
                      (y = this),
                      this.metadataParams[Ai(568)]))
                        b(E);
                      for (S in (w = this[Ai(636)][Ai(1049)]))
                        w[Ai(he)](S) &&
                          (O = 'window' === S ? window : window[S]) &&
                          this[Ai(fe)](O, S.toUpperCase() + '_PROPERTY_DESCRIPTOR', w[S], r);
                      return [2, r];
                  }
                });
              });
            }),
            (Dt[Lt(h)][Lt(g)] = function (e) {
              var n = 622,
                i = Lt;
              try {
                var r = navigator[i(519)];
                if (!r) return;
                this.flatAndAddMetadata(e, i(1285), function () {
                  return r[i(n)];
                }),
                  this[i(ft)](e, 'NAVIGATOR_CLIENT_HINTS_MOBILE', function () {
                    return r[i(879)];
                  });
                var o = r[i(871)];
                if (!o) return;
                for (
                  var a = function (t) {
                      var n = i;
                      if (o[t][n(1232)](n(gt)) && o[t][n(pt)]('version')) {
                        var r = o[t][n(851)] + ':' + o[t][n(vt)];
                        s[n(_t)](e, n(mt) + t, function () {
                          return r;
                        });
                      }
                    },
                    s = this,
                    u = 0;
                  u < o[i(601)];
                  u++
                )
                  a(u);
              } catch (e) {
                t[i(815)].Logger.warn(i(1312), e);
              }
            }),
            (Dt.prototype.addPropertyDescriptorInfo = function (e, n, i, r) {
              var o = 495,
                a = Lt;
              try {
                for (
                  var s = function (t) {
                      var i = 816,
                        a = 849,
                        s = 952,
                        c = _0x34d2;
                      u[c(1160)](r, n + '_' + t[c(o)](), function () {
                        var n = c,
                          r = e[n(i)] ? e[n(816)] : e,
                          o = Object[n(a)](r, t);
                        if (o) {
                          var u = o.get ? o[n(s)][n(565)]() : void 0;
                          return JSON[n(1205)]({
                            configurable: o[n(964)],
                            enumerable: o.enumerable,
                            value: o[n(809)],
                            writable: o.writable,
                            getter: null != u && u.length < 100 ? u : void 0,
                          });
                        }
                        return n(727);
                      });
                    },
                    u = this,
                    c = 0,
                    l = i;
                  c < l.length;
                  c++
                ) {
                  s(l[c]);
                }
              } catch (e) {
                t[a(815)].Logger.warn(a(1106), e);
              }
            }),
            (Dt[Lt(816)][Lt(1213)] = function (e, n) {
              var i = 486,
                r = 845,
                o = Lt;
              if (!n[o(P)]('IFRAME_DATA'))
                try {
                  var a = t._POSignalsUtils[o(C)][o(L)](o(1243));
                  if (!a) return;
                  (a[o(D)] = o(1166)),
                    document[o(x)][o(M)](a),
                    this.flatAndAddMetadata(e, 'IFRAME_CHROME', function () {
                      return typeof a.contentWindow.chrome;
                    }),
                    this[o(1160)](e, 'IFRAME_WIDTH', function () {
                      var t = o;
                      return a[t(i)][t(827)][t(r)];
                    }),
                    this[o(R)](e, 'IFRAME_HEIGHT', function () {
                      var t = o;
                      return a[t(486)].screen[t(1100)];
                    }),
                    a.remove();
                } catch (e) {
                  t[o(815)].Logger.warn(o(1306), e);
                }
            }),
            (Dt[Lt(p)][Lt(v)] = function () {
              var e = 1041,
                n = 1070,
                i = 673,
                r = 633,
                o = 618,
                a = 780,
                s = 694,
                u = 664,
                c = 1157,
                l = 1161,
                d = 815;
              return __awaiter(this, void 0, void 0, function () {
                var h, f, g, p, v, _;
                return __generator(this, function (m) {
                  var b = 1161,
                    y = 865,
                    E = _0x34d2;
                  switch (m[E(968)]) {
                    case 0:
                      if (
                        ((h = {}),
                        (f = [
                          E(616),
                          E(e),
                          E(n),
                          E(959),
                          E(i),
                          E(1002),
                          E(1150),
                          E(r),
                          E(o),
                          'magnetometer',
                          E(625),
                          E(a),
                          E(s),
                          E(u),
                          E(c),
                          'push',
                        ]),
                        (g = []),
                        navigator.permissions)
                      )
                        for (v in ((p = function (t) {
                          var e = E,
                            n = f[t];
                          g[e(b)](
                            navigator[e(641)]
                              .query({ name: n })
                              [e(893)](function (t) {
                                var i = e;
                                h[n] = t[i(y)];
                              })
                              [e(857)](function (t) {}),
                          );
                        }),
                        f))
                          p(v);
                      m[E(968)] = 1;
                    case 1:
                      return m[E(737)][E(l)]([1, 3, , 4]), [4, Promise[E(1258)](g)];
                    case 2:
                      return m[E(1278)](), [3, 4];
                    case 3:
                      return (_ = m[E(1278)]()), t[E(d)][E(599)].warn(_), [3, 4];
                    case 4:
                      return [2, h];
                  }
                });
              });
            }),
            (Dt.prototype[Lt(_)] = function (t) {
              var e = Lt,
                n = document.createElement(e(671));
              if (n && n[e(1056)]) return n[e(1056)](t);
            }),
            (Dt[Lt(r)].safeAddModernizrFeatures = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n,
                  i,
                  r,
                  o,
                  a,
                  s,
                  u = 839,
                  c = 1066,
                  l = 1160,
                  d = 830,
                  h = 1113,
                  f = 483,
                  g = 1332,
                  p = 1068,
                  v = 1210,
                  _ = 1160,
                  m = 1261,
                  b = 480,
                  y = 711,
                  E = 541,
                  w = 1278,
                  S = 1288,
                  O = 977,
                  I = 1160,
                  T = 842,
                  A = 1160,
                  P = 1063,
                  C = 624,
                  L = 884,
                  D = 1160,
                  x = 940,
                  M = 1248,
                  R = 671,
                  U = 860,
                  k = 1075,
                  N = 842,
                  B = 1177,
                  F = 730,
                  H = 1240,
                  V = 633,
                  G = 784,
                  j = 488,
                  W = 962,
                  K = 973,
                  z = 904,
                  Y = 830;
                return __generator(this, function (X) {
                  var q = 940,
                    J = 1299,
                    Z = 843,
                    Q = 774,
                    $ = 670,
                    tt = 698,
                    et = _0x34d2;
                  switch (X[et(968)]) {
                    case 0:
                      return (
                        t[et(728)](),
                        (n = this),
                        (i = t[et(u)]),
                        (r = i[et(848)]),
                        (o = i[et(c)]),
                        this.flatAndAddMetadata(e, et(477), function () {
                          return i[et(tt)];
                        }),
                        this[et(l)](e, 'application_cache', function () {
                          return i.applicationcache;
                        }),
                        this[et(1160)](e, et(d), function () {
                          return !!i[et(Y)];
                        }),
                        i.audio &&
                          this.flatAndAddMetadata(e, et(830), function () {
                            return i.audio;
                          }),
                        this[et(1160)](e, 'battery_api', function () {
                          return !!r(et(1170), navigator) || !!r('getBattery', navigator);
                        }),
                        this.flatAndAddMetadata(e, et(h), function () {
                          return i[et(869)];
                        }),
                        this.flatAndAddMetadata(e, et(657), function () {
                          return i[et($)];
                        }),
                        this[et(l)](e, et(f), function () {
                          return i[et(483)];
                        }),
                        this[et(l)](e, et(904), function () {
                          return i[et(z)];
                        }),
                        this[et(1160)](e, et(g), function () {
                          return i.customelements;
                        }),
                        this[et(1160)](e, et(p), function () {
                          return i[et(K)];
                        }),
                        this[et(l)](e, et(v), function () {
                          return i.customevent;
                        }),
                        this[et(_)](e, et(763), function () {
                          return i[et(763)];
                        }),
                        this[et(_)](e, et(m), function () {
                          return i[et(W)];
                        }),
                        this[et(l)](e, 'event_listener', function () {
                          return i[et(696)];
                        }),
                        [4, this[et(691)]('exiforientation')]
                      );
                    case 1:
                      return (
                        (a = X[et(1278)]()),
                        n[et(l)](e, et(1300), function () {
                          return a;
                        }),
                        this[et(l)](e, et(b), function () {
                          return i.forcetouch;
                        }),
                        i[et(y)] &&
                          (this[et(1160)](e, 'force_touch.mouse_force_will_begin', function () {
                            return o(r('mouseforcewillbegin', window, !1), window);
                          }),
                          this[et(_)](e, et(E), function () {
                            return MouseEvent[et(Q)];
                          }),
                          this[et(1160)](
                            e,
                            'force_touch.webkit_force_at_force_mouse_down',
                            function () {
                              return MouseEvent[et(j)];
                            },
                          )),
                        this[et(_)](e, et(719), function () {
                          return i[et(G)];
                        }),
                        this[et(l)](e, et(1178), function () {
                          return i[et(1131)];
                        }),
                        this[et(1160)](e, et(994), function () {
                          return i[et(V)];
                        }),
                        this.flatAndAddMetadata(e, 'ie8compat', function () {
                          return i[et(1008)];
                        }),
                        [4, this[et(691)](et(1267))]
                      );
                    case 2:
                      return (
                        (s = X[et(w)]()),
                        n[et(1160)](e, 'indexed_db', function () {
                          return s;
                        }),
                        this[et(1160)](e, 'indexed_db_blob', function () {
                          return i[et(H)];
                        }),
                        this[et(_)](e, et(1042), function () {
                          return i[et(1083)];
                        }),
                        this[et(1160)](e, et(730), function () {
                          return i[et(F)];
                        }),
                        this.flatAndAddMetadata(e, et(1177), function () {
                          return i[et(B)];
                        }),
                        this[et(_)](e, et(S), function () {
                          return et(Z) in window;
                        }),
                        this.flatAndAddMetadata(e, et(O), function () {
                          return i[et(1103)];
                        }),
                        this[et(I)](e, et(T), function () {
                          return i[et(N)];
                        }),
                        this[et(A)](e, et(P), function () {
                          return i[et(k)];
                        }),
                        this.flatAndAddMetadata(e, et(1022), function () {
                          return i.performance;
                        }),
                        this[et(1160)](e, 'pointer_events', function () {
                          return i[et(1127)];
                        }),
                        this[et(1160)](e, 'pointer_lock', function () {
                          return i[et(617)];
                        }),
                        this[et(_)](e, et(1119), function () {
                          return i[et(1119)];
                        }),
                        this[et(1160)](e, 'query_selector', function () {
                          return i[et(J)];
                        }),
                        this[et(1160)](e, et(907), function () {
                          return i.quotamanagement;
                        }),
                        this[et(1160)](e, et(591), function () {
                          return i.requestanimationframe;
                        }),
                        this[et(1160)](e, et(C), function () {
                          return i[et(705)];
                        }),
                        this.flatAndAddMetadata(e, 'touch_events', function () {
                          return i[et(U)];
                        }),
                        this[et(1160)](e, et(L), function () {
                          return i[et(880)];
                        }),
                        this[et(I)](e, et(837), function () {
                          return i[et(837)];
                        }),
                        this[et(_)](e, et(671), function () {
                          return !!i[et(R)];
                        }),
                        i[et(671)] &&
                          this[et(1160)](e, et(671), function () {
                            return i[et(671)];
                          }),
                        this[et(1160)](e, 'web_gl', function () {
                          return i[et(505)];
                        }),
                        this[et(1160)](e, 'web_sockets', function () {
                          return i[et(M)];
                        }),
                        this[et(D)](e, 'x_domain_request', function () {
                          return i.xdomainrequest;
                        }),
                        this[et(1160)](e, et(x), function () {
                          return i[et(q)];
                        }),
                        [2]
                      );
                  }
                });
              });
            }),
            (Dt[Lt(816)][Lt(m)] = function () {
              var e = 1223,
                n = 710,
                i = 1266,
                r = 557,
                o = Lt,
                a = this,
                s = {},
                u = navigator[o(J)] || navigator.mozConnection || navigator.webkitConnection;
              return (
                this[o(Z)](s, o(912), function () {
                  return u ? u.type : null;
                }),
                this[o(Z)](s, 'NETWORK_DOWNLOAD_MAX', function () {
                  return u ? u[o(ht)] : null;
                }),
                this[o(Q)](s, o($), function () {
                  return !!navigator.bluetooth;
                }),
                this[o(1160)](s, o(tt), function () {
                  return a[o(r)];
                }),
                this[o(1160)](s, o(1110), function () {
                  return a[o(dt)];
                }),
                this[o(1160)](s, o(et), function () {
                  return a[o(1179)];
                }),
                this.flatAndAddMetadata(s, 'BATTERY_SUPPORTED', function () {
                  return a[o(i)];
                }),
                this[o(1160)](s, o(nt), function () {
                  return a[o(572)];
                }),
                this[o(it)](s, 'BATTERY_CHARGING', function () {
                  return a[o(1321)];
                }),
                this[o(1160)](s, 'BATTERY_CHARGING_TIME', function () {
                  return a.batteryChargingTime;
                }),
                this[o(Z)](s, o(885), function () {
                  return a.batteryDischargingTime;
                }),
                this[o(it)](s, o(rt), function () {
                  return a[o(n)];
                }),
                this.flatAndAddMetadata(s, o(631), function () {
                  var e = o;
                  return t[e(ct)].Util[e(lt)];
                }),
                this[o(1160)](s, o(ot), function () {
                  return 'ontouchstart' in document[o(e)];
                }),
                this[o(it)](s, o(1260), function () {
                  return a[o(641)];
                }),
                this[o(it)](s, o(1057), function () {
                  var t = o;
                  return window[t(at)]('(prefers-color-scheme: light)')[t(st)]
                    ? 'light'
                    : window[t(979)]('(prefers-color-scheme: dark)').matches
                      ? t(ut)
                      : void 0;
                }),
                s
              );
            }),
            (Dt[Lt(b)][Lt(y)] = function (e, n, i) {
              var r = Lt;
              try {
                var o = new Set(this.metadataParams[r(1169)] || []);
                null != n && null != i && !o.has(n) && (e[n] = i);
              } catch (e) {
                t[r(815)].Logger.warn(r(1011) + n + ' -> ' + i + ', ' + e);
              }
            }),
            (Dt[Lt(816)][Lt(E)] = function (e) {
              var n = 1278;
              return __awaiter(this, void 0, void 0, function () {
                var i, r;
                return __generator(this, function (o) {
                  var a = 599,
                    s = _0x34d2;
                  switch (o[s(968)]) {
                    case 0:
                      return (
                        (i = new Promise(function (n) {
                          var i = s;
                          try {
                            t[i(839)].on(e, function (t) {
                              n(t);
                            });
                          } catch (r) {
                            n(null), t._POSignalsUtils[i(a)][i(840)](i(928) + e, r);
                          }
                        })),
                        (r = t[s(815)].Util[s(792)](250).then(function () {
                          return null;
                        })),
                        [4, Promise[s(1255)]([i, r])]
                      );
                    case 1:
                      return [2, o[s(n)]()];
                  }
                });
              });
            }),
            (Dt[Lt(816)][Lt(1160)] = function (e, n, i) {
              var r = Lt;
              try {
                var o = new Set(this[r(636)][r(1169)] || []);
                if (!n || o.has(n)) return;
                var a = i();
                if ('object' == typeof a && null !== a) {
                  var s = t[r(T)][r(526)].flatten(a);
                  for (var u in s) this[r(A)](e, n + '.' + u, s[u]);
                } else this.safeAddMetadata(e, n, a);
              } catch (e) {
                t[r(815)].Logger[r(840)]('Failed to add ' + n, e);
              }
            }),
            (Dt[Lt(l)][Lt(1335)] = function () {
              var e,
                n = Lt,
                i = new Date(),
                r = 0;
              do {
                r++, (e = new Date()[n(S)]() - i[n(900)]()), Math.sqrt(r * Math[n(O)]());
              } while (e < 500);
              var o = r / e;
              return t[n(815)][n(I)][n(1202)](n(998) + o), o;
            }),
            (Dt[Lt(816)][Lt(w)] = function () {
              var e = Lt,
                n = this;
              !this[e(z)] &&
                t[e(1322)]
                  [e(580)]()
                  .then(function (t) {
                    n[e(684)] = t;
                  })
                  [e(857)](function (n) {
                    var i = e;
                    t._POSignalsUtils.Logger[i(q)](i(702), n);
                  }),
                this.aiSignalsResult && (this[e(Y)][e(X)] = this[e(684)]);
            }),
            (Dt[Lt(1059)] = function () {
              var t = Lt;
              return (
                1.4474840516030247 == Math[t(n)](0.123) &&
                0.881373587019543 == Math.acosh(Math[t(775)]) &&
                1.1071487177940904 == Math.atan(2) &&
                0.5493061443340548 == Math[t(972)](0.5) &&
                1.4645918875615231 == Math[t(577)](Math.PI) &&
                -0.4067775970251724 == Math[t(537)](21 * Math[t(770)]) &&
                9.199870313877772e307 == Math[t(1009)](492 * Math[t(j)]) &&
                1.718281828459045 == Math[t(W)](1) &&
                101.76102278593319 == Math.hypot(6 * Math.PI, -100) &&
                0.4971498726941338 == Math[t(759)](Math.PI) &&
                1.2246467991473532e-16 == Math[t(K)](Math.PI) &&
                11.548739357257748 == Math[t(687)](Math.PI) &&
                -3.3537128705376014 == Math[t(482)](10 * Math[t(525)]) &&
                0.12238344189440875 == Math[t(575)](0.123) &&
                1.9275814160560204e-50 == Math[t(1084)](Math.PI, -100)
              );
            }),
            Dt
          );
        })();
      e.Metadata = j;
      var W = (function () {
        var e = _0x34d2;
        function i(t, e) {
          var n = _0x34d2;
          (this[n(1297)] = t),
            (this.agentTimeout = e),
            (this[n(1128)] = n(1028)),
            (this[n(531)] = '/device');
        }
        return (
          (i[e(n)][e(1055)] = function () {
            return __awaiter(this, void 0, void 0, function () {
              var e,
                n,
                i,
                r,
                o,
                a,
                s,
                u = 1128,
                c = 1090,
                l = 1320,
                d = 1161,
                h = 810,
                f = 1290,
                g = 815,
                p = 599,
                v = 1278,
                _ = 1114,
                m = 682,
                b = 599,
                y = 1023,
                E = 990,
                w = 903;
              return __generator(this, function (S) {
                var O = _0x34d2;
                switch (S.label) {
                  case 0:
                    (e = this[O(u)] + ':' + this[O(1297)] + this[O(531)]),
                      (n = new AbortController()),
                      (i = n[O(c)]),
                      (r = setTimeout(function () {
                        return n[O(w)]();
                      }, this[O(l)])),
                      (S.label = 1);
                  case 1:
                    return (
                      S[O(737)][O(d)]([1, 4, 5, 6]),
                      [4, fetch(e, { method: O(h), headers: { 'Content-Type': O(f) }, signal: i })]
                    );
                  case 2:
                    return (o = S[O(1278)]()).ok
                      ? [4, o[O(678)]()]
                      : (t[O(g)][O(p)][O(1023)](
                          'Failed to fetch the Workstation data. Invalid network response: ' +
                            o[O(1208)],
                        ),
                        [2, void 0]);
                  case 3:
                    return (a = S.sent()), t._POSignalsUtils[O(599)][O(1023)](O(960)), [2, a];
                  case 4:
                    return (
                      (s = S[O(v)]())[O(_)] === O(892)
                        ? t[O(815)][O(599)][O(690)](O(m) + this.agentTimeout + 'ms')
                        : t._POSignalsUtils[O(b)][O(y)](
                            'Failed to fetch the Workstation data: ' + s[O(E)],
                          ),
                      [2, void 0]
                    );
                  case 5:
                    return clearTimeout(r), [7];
                  case 6:
                    return [2];
                }
              });
            });
          }),
          i
        );
      })();
      e.LocalAgentAccessor = W;
    })(t[S(709)] || (t[S(e)] = {}));
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s,
        u,
        c,
        l,
        d,
        h,
        f,
        g,
        p,
        v,
        _,
        m,
        b,
        y,
        E,
        w,
        S,
        O,
        I = 1108,
        T = 1079,
        A = _0x2a96a4;
      (e = t._POSignalsMetadata || (t[A(709)] = {})),
        (n = 963),
        (i = 1126),
        (r = 788),
        (o = 1231),
        (a = 1308),
        (s = 604),
        (u = 1144),
        (c = 993),
        (l = 637),
        (d = 1323),
        (h = 585),
        (f = 790),
        (g = 507),
        (p = 1052),
        (v = 1134),
        (_ = 532),
        (m = 751),
        (b = 1020),
        (y = 707),
        (E = 1126),
        (w = 788),
        (S = 601),
        (O = (function () {
          var t = 516,
            e = 565,
            O = 717,
            A = _0x34d2;
          function P() {}
          return (
            (P[A(I)] = function () {
              for (
                var t = A,
                  e = 0,
                  n = [
                    t(963),
                    t(m),
                    t(916),
                    t(b),
                    t(703),
                    t(y),
                    t(E),
                    t(w),
                    t(1293),
                    t(1231),
                    '__fxdriver_unwrapped',
                  ];
                e < n[t(S)];
                e++
              ) {
                if (document[n[e]]) return !0;
              }
              return !1;
            }),
            (P.seleniumInWindow = function () {
              for (
                var t = A, e = 0, n = [t(914), t(1139), t(923), t(520), t(1144), t(_), t(604)];
                e < n[t(601)];
                e++
              ) {
                if (window[n[e]]) return !0;
              }
              return !1;
            }),
            (P[A(T)] = function () {
              for (
                var t = A,
                  e = 0,
                  _ = [
                    'webdriver',
                    t(1293),
                    t(n),
                    t(751),
                    t(707),
                    t(i),
                    t(r),
                    t(o),
                    t(a),
                    t(s),
                    '_selenium',
                    t(u),
                    t(c),
                    t(l),
                    t(d),
                    'webdriver-evaluate',
                    t(h),
                    t(988),
                    t(f),
                    '__webdriverFunc',
                    t(703),
                    t(g),
                    t(p),
                    t(v),
                    '__lastWatirPrompt',
                    '$chrome_asyncScriptInfo',
                    '$cdc_asdjflasutopfhvcZLmcfl_',
                  ];
                e < _[t(601)];
                e++
              ) {
                if (navigator[_[e]]) return !0;
              }
              return !1;
            }),
            (P.seleniumSequentum = function () {
              var n = A;
              return (
                window[n(t)] &&
                window[n(t)].toString() &&
                -1 != window[n(516)][n(e)]()[n(O)](n(515))
              );
            }),
            P
          );
        })()),
        (e.SeleniumProperties = O);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s,
        u,
        c,
        l,
        d,
        h,
        f,
        g,
        p,
        v,
        _,
        m,
        b,
        y,
        E = 709,
        w = 879,
        S = 1218,
        O = 906,
        I = 1072,
        T = 1211,
        A = 1284,
        P = 873,
        C = 1200,
        L = 511,
        D = 1111,
        x = 1284,
        M = 1329,
        R = 1330,
        U = 662,
        k = 1284,
        N = 1336,
        B = _0x2a96a4;
      (e = t[B(709)] || (t[B(E)] = {})),
        (i = (n = _0x34d2)(1114)),
        (r = n(1291)),
        (o = n(799)),
        (a = n(639)),
        (s = n(w)),
        (u = n(S)),
        (c = n(584)),
        (l = n(O)),
        (d = n(I)),
        (h = n(666)),
        (f = n(T)),
        (g = n(1118)),
        (p = Object[n(A)]({
          browser: [[/(wget|curl|lynx|elinks|httpie)[\/ ]\(?([\w\.-]+)/i], [i, a, [r, l]]],
        })),
        (v = Object[n(1284)]({
          browser: [
            [
              /((?:ahrefs|amazon|bing|cc|dot|duckduck|exa|facebook|gpt|mj12|mojeek|oai-search|perplexity|semrush|seznam)bot)\/([\w\.-]+)/i,
              /(applebot(?:-extended)?)\/([\w\.]+)/i,
              /(baiduspider)[-imagevdonsfcpr]{0,6}\/([\w\.]+)/i,
              /(claude(?:bot|-web)|anthropic-ai)\/?([\w\.]*)/i,
              /(coccocbot-(?:image|web))\/([\w\.]+)/i,
              /(facebook(?:externalhit|catalog)|meta-externalagent)\/([\w\.]+)/i,
              /(google(?:bot|other|-inspectiontool)(?:-image|-video|-news)?|storebot-google)\/?([\w\.]*)/i,
              /(ia_archiver|archive\.org_bot)\/?([\w\.]*)/i,
              /((?:semrush|splitsignal)bot[-abcfimostw]*)\/([\w\.-]+)/i,
              /(sogou (?:pic|head|web|orion|news) spider)\/([\w\.]+)/i,
              /(y!?j-(?:asr|br[uw]|dscv|mmp|vsidx|wsc))\/([\w\.]+)/i,
              /(yandex(?:(?:mobile)?(?:accessibility|additional|renderresources|screenshot|sprav)?bot|image(?:s|resizer)|video(?:parser)?|blogs|adnet|favicons|fordomain|market|media|metrika|news|ontodb(?:api)?|pagechecker|partner|rca|tracker|turbo|vertis|webmaster|antivirus))\/([\w\.]+)/i,
              /(yeti)\/([\w\.]+)/i,
              /((?:aihit|diff|timpi|you)bot|omgili(?:bot)?|(?:magpie-|velenpublicweb)crawler|webzio-extended|(?:screaming frog seo |yisou)spider)\/?([\w\.]*)/i,
            ],
            [i, a, [r, c]],
            [
              /((?:adsbot|apis|mediapartners)-google(?:-mobile)?|google-?(?:other|cloudvertexbot|extended|safety))/i,
              /\b(360spider-?(?:image|video)?|bytespider|(?:ai2|aspiegel|dataforseo|imagesift|petal|turnitin)bot|teoma|(?=yahoo! )slurp)/i,
            ],
            [i, [r, c]],
          ],
        })),
        Object[n(A)]({
          device: [
            [
              /(nook)[\w ]+build\/(\w+)/i,
              /(dell) (strea[kpr\d ]*[\dko])/i,
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              /(trinity)[- ]*(t\d{3}) bui/i,
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              /(vodafone) ([\w ]+)(?:\)| bui)/i,
            ],
            [o, 'model', [r, u]],
            [/(u304aa)/i],
            ['model', [o, n(627)], [r, s]],
            [/\bsie-(\w*)/i],
            ['model', [o, n(1e3)], [r, s]],
            [/\b(rct\w+) b/i],
            ['model', [o, n(545)], [r, u]],
            [/\b(venue[\d ]{2,7}) b/i],
            ['model', [o, n(1130)], [r, u]],
            [/\b(q(?:mv|ta)\w+) b/i],
            ['model', [o, n(1276)], [r, u]],
            [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
            ['model', [o, n(P)], [r, u]],
            [/\b(tm\d{3}\w+) b/i],
            ['model', [o, n(1033)], [r, u]],
            [/\b(k88) b/i],
            ['model', [o, n(C)], [r, u]],
            [/\b(nx\d{3}j) b/i],
            ['model', [o, n(1200)], [r, s]],
            [/\b(gen\d{3}) b.+49h/i],
            ['model', [o, 'Swiss'], [r, s]],
            [/\b(zur\d{3}) b/i],
            ['model', [o, 'Swiss'], [r, u]],
            [/^((zeki)?tb.*\b) b/i],
            ['model', [o, 'Zeki'], [r, u]],
            [/\b([yr]\d{2}) b/i, /\b(?:dragon[- ]+touch |dt)(\w{5}) b/i],
            ['model', [o, n(576)], [r, u]],
            [/\b(ns-?\w{0,9}) b/i],
            ['model', [o, 'Insignia'], [r, u]],
            [/\b((nxa|next)-?\w{0,9}) b/i],
            ['model', [o, n(594)], [r, u]],
            [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
            [[o, n(L)], 'model', [r, s]],
            [/\b(lvtel\-)?(v1[12]) b/i],
            [[o, n(610)], 'model', [r, s]],
            [/\b(ph-1) /i],
            ['model', [o, n(D)], [r, s]],
            [/\b(v(100md|700na|7011|917g).*\b) b/i],
            ['model', [o, n(681)], [r, u]],
            [/\b(trio[-\w\. ]+) b/i],
            ['model', [o, 'MachSpeed'], [r, u]],
            [/\btu_(1491) b/i],
            ['model', [o, n(1027)], [r, u]],
          ],
        }),
        Object.freeze({
          browser: [
            [
              /(airmail|bluemail|emclient|evolution|foxmail|kmail2?|kontact|(?:microsoft |mac)?outlook(?:-express)?|navermailapp|(?!chrom.+)sparrow|thunderbird|yahoo)(?:m.+ail; |[\/ ])([\w\.]+)/i,
            ],
            [i, a, [r, d]],
          ],
        }),
        (_ = Object[n(1284)]({
          browser: [
            [
              /(ahrefssiteaudit|bingpreview|chatgpt-user|mastodon|(?:discord|duckassist|linkedin|pinterest|reddit|roger|siteaudit|telegram|twitter|uptimero)bot|google-site-verification|meta-externalfetcher|y!?j-dlc|yandex(?:calendar|direct(?:dyn)?|searchshop)|yadirectfetcher)\/([\w\.]+)/i,
              /(bluesky) cardyb\/([\w\.]+)/i,
              /(slack(?:bot)?(?:-imgproxy|-linkexpanding)?) ([\w\.]+)/i,
              /(whatsapp)\/([\w\.]+)[\/ ][ianw]/i,
            ],
            [i, a, [r, h]],
            [
              /(cohere-ai|vercelbot|feedfetcher-google|google(?:-read-aloud|producer)|(?=bot; )snapchat|yandex(?:sitelinks|userproxy))/i,
            ],
            [i, [r, h]],
          ],
        })),
        Object[n(x)]({
          browser: [
            [/chatlyio\/([\d\.]+)/i],
            [a, n(M), [r, 'inapp']],
            [/jp\.co\.yahoo\.android\.yjtop\/([\d\.]+)/i],
            [a, n(R), [r, 'inapp']],
          ],
        }),
        Object[n(1284)]({
          browser: [
            [
              /(apple(?:coremedia|tv))\/([\w\._]+)/i,
              /(coremedia) v([\w\._]+)/i,
              /(ares|clementine|music player daemon|nexplayer|ossproxy) ([\w\.-]+)/i,
              /^(aqualung|audacious|audimusicstream|amarok|bass|bsplayer|core|gnomemplayer|gvfs|irapp|lyssna|music on console|nero (?:home|scout)|nokia\d+|nsplayer|psp-internetradioplayer|quicktime|rma|radioapp|radioclientapplication|soundtap|stagefright|streamium|totem|videos|xbmc|xine|xmms)\/([\w\.-]+)/i,
              /(lg player|nexplayer) ([\d\.]+)/i,
              /player\/(nexplayer|lg player) ([\w\.-]+)/i,
              /(gstreamer) souphttpsrc.+libsoup\/([\w\.-]+)/i,
              /(htc streaming player) [\w_]+ \/ ([\d\.]+)/i,
              /(lavf)([\d\.]+)/i,
              /(mplayer)(?: |\/)(?:(?:sherpya-){0,1}svn)(?:-| )(r\d+(?:-\d+[\w\.-]+))/i,
              / (songbird)\/([\w\.-]+)/i,
              /(winamp)(?:3 version|mpeg| ) ([\w\.-]+)/i,
              /(vlc)(?:\/| media player - version )([\w\.-]+)/i,
              /^(foobar2000|itunes|smp)\/([\d\.]+)/i,
              /com\.(riseupradioalarm)\/([\d\.]*)/i,
              /(mplayer)(?:\s|\/| unknown-)([\w\.\-]+)/i,
              /(windows)\/([\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ home media server/i,
            ],
            [i, a, [r, f]],
            [/(flrp)\/([\w\.-]+)/i],
            [[i, n(U)], a, [r, f]],
            [
              /(fstream|media player classic|inlight radio|mplayer|nativehost|nero showtime|ocms-bot|queryseekspider|tapinradio|tunein radio|winamp|yourmuze)/i,
            ],
            [i, [r, f]],
            [/(htc_one_s|windows-media-player|wmplayer)\/([\w\.-]+)/i],
            [[i, /[_-]/g, ' '], a, [r, f]],
            [/(rad.io|radio.(?:de|at|fr)) ([\d\.]+)/i],
            [[i, n(1221)], a, [r, f]],
          ],
        }),
        (m = Object.freeze({
          browser: [
            [
              /^(apache-httpclient|axios|(?:go|java)-http-client|got|guzzlehttp|java|libwww-perl|lua-resty-http|needle|node-(?:fetch|superagent)|okhttp|php-soap|postmanruntime|python-(?:urllib|requests)|scrapy)\/([\w\.]+)/i,
              /(jsdom|java)\/([\w\.]+)/i,
            ],
            [i, a, [r, g]],
          ],
        })),
        Object[n(1284)]({
          device: [
            [/dilink.+(byd) auto/i],
            [o],
            [/(rivian) (r1t)/i],
            [o, 'model'],
            [/vcc.+netfront/i],
            [[o, n(1314)]],
          ],
        }),
        (b = Object[n(k)]({ browser: __spreadArrays(p[n(N)], v[n(N)], _[n(N)], m[n(1336)]) })),
        (y = (function () {
          var t = { _0x3f4902: 825, _0x530840: 583 },
            e = { _0x423863: 601, _0x1cec5f: 649 };
          return function () {
            var n = 1129,
              i = 582,
              r = 956,
              o = 1058,
              a = 767,
              s = 1107,
              u = 680,
              c = 517,
              l = 789,
              d = 1187,
              h = 634,
              f = 693,
              g = 491,
              p = _0x34d2;
            (this[p(514)] = function (t) {
              var e = p;
              return [
                e(1082),
                'amazonbot',
                e(n),
                e(i),
                'claudebot',
                e(595),
                'applebot-extended',
                'bytespider',
                e(1310),
                e(r),
                e(o),
                e(a),
                e(s),
                e(485),
                'google-extended',
                'imagesiftbot',
                'petalbot',
                e(u),
                e(785),
                e(c),
                e(l),
                e(d),
                e(h),
                e(1280),
                'velenpublicwebcrawler',
                e(f),
                e(g),
                e(777),
                e(1309),
                e(1137),
              ].some(function (n) {
                var i = e;
                return t.toLowerCase()[i(539)](n);
              });
            }),
              (this.isBot = function (t) {
                for (var n = p, i = t[n(1006)](), r = b[n(1336)], o = 0; o < r[n(601)]; o += 2)
                  for (
                    var a = r[o], s = 0, u = Array.isArray(a) ? a : [a];
                    s < u[n(e._0x423863)];
                    s++
                  ) {
                    var c = u[s];
                    if (c instanceof RegExp && c[n(e._0x1cec5f)](i)) return !0;
                  }
                return !1;
              }),
              (this[p(t._0x3f4902)] = function (t) {
                var e = p;
                return t.name === Engine[e(1268)];
              }),
              (this[p(t._0x530840)] = function (t) {
                var e = p;
                return t[e(1006)]()[e(539)](e(1176));
              });
          };
        })()),
        (e[n(820)] = y);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s,
        u,
        c,
        l,
        d,
        h,
        f,
        g,
        p,
        v,
        _,
        m,
        b,
        y,
        E,
        w,
        S,
        O,
        I,
        T,
        A,
        P,
        C,
        L,
        D,
        x,
        M,
        R,
        U,
        k,
        N,
        B,
        F,
        H,
        V,
        G,
        j,
        W,
        K,
        z,
        Y,
        X,
        q,
        J,
        Z,
        Q,
        $,
        tt,
        et,
        nt,
        it = 709,
        rt = 723,
        ot = _0x2a96a4;
      (e = t[ot(it)] || (t[ot(it)] = {})),
        (n = 816),
        (i = 816),
        (r = 1238),
        (o = 716),
        (a = 816),
        (s = 1006),
        (u = 1040),
        (c = 758),
        (l = 717),
        (d = 1050),
        (h = 736),
        (f = 1017),
        (g = 717),
        (p = 861),
        (v = 742),
        (_ = 1207),
        (m = 565),
        (b = 601),
        (y = 736),
        (E = 629),
        (w = 841),
        (S = 1006),
        (O = 622),
        (I = 804),
        (T = 754),
        (A = 1259),
        (P = 895),
        (C = 717),
        (L = 648),
        (D = 721),
        (x = 718),
        (M = 648),
        (R = 951),
        (U = 717),
        (k = 717),
        (N = 822),
        (B = 717),
        (F = 1034),
        (H = 771),
        (V = 1149),
        (G = 717),
        (j = 717),
        (W = 1044),
        (K = 771),
        (z = 1259),
        (Y = 804),
        (X = 1296),
        (q = 1291),
        (J = 608),
        (Z = 1182),
        (Q = 672),
        ($ = 654),
        (tt = 672),
        (et = _0x34d2),
        (nt = (function () {
          var t = 845,
            e = 1253,
            et = 827,
            nt = 1234,
            it = 484,
            rt = 654,
            ot = 1182,
            at = 1112,
            st = 726,
            ut = 726,
            ct = 931,
            lt = 1061,
            dt = 832,
            ht = 811,
            ft = 1212,
            gt = 1061,
            pt = 1061,
            vt = 881,
            _t = 1061,
            mt = 1039,
            bt = _0x34d2;
          function yt() {}
          return (
            (yt[bt(n)][bt(834)] = function () {
              var t = bt,
                e = document[t($)](t(1182));
              return !(!e[t(tt)] || !e[t(tt)]('2d'));
            }),
            (yt[bt(i)][bt(r)] = function (t) {
              var e = bt,
                n = document[e(654)](e(Z)),
                i = null;
              try {
                i =
                  'webgl' === t
                    ? n.getContext(e(505)) || n[e(672)]('experimental-webgl')
                    : n[e(Q)]('webgl2');
              } catch (t) {}
              return i;
            }),
            (yt[bt(816)][bt(1296)] = function () {
              var t = bt;
              if (!this[t(834)]()) return { supported: !1, type: null };
              var e = this.getWebglCanvas(t(608));
              return e
                ? { supported: !0, type: t(608) }
                : (e = this.getWebglCanvas(t(505)))
                  ? { supported: !0, type: t(505) }
                  : { supported: !1, type: null };
            }),
            (yt.prototype[bt(1013)] = function () {
              var t = bt;
              return this[t(1296)]()[t(909)];
            }),
            (yt[bt(i)][bt(o)] = function () {
              var t = bt,
                e = this[t(X)](),
                n = e.supported,
                i = e[t(q)];
              return n && i === t(J);
            }),
            (yt[bt(816)][bt(947)] = function () {
              var t,
                e,
                n,
                i,
                r = bt,
                o = document[r(rt)](r(ot));
              try {
                !(t = o[r(672)](r(608))) &&
                  !(t = o.getContext(r(505)) || o.getContext(r(at))) &&
                  console.log(r(st));
              } catch (t) {
                console.log(r(ut));
              }
              try {
                (e = t[r(1159)]('WEBGL_debug_renderer_info')),
                  (n = t.getParameter(e[r(ct)])),
                  (i = t[r(lt)](e.UNMASKED_RENDERER_WEBGL));
              } catch (e) {
                (n = t.getParameter(t.VENDOR)), (i = t[r(1061)](t[r(dt)]));
              }
              return {
                vendor: n,
                renderer: i,
                webglVersion: t[r(1061)](t.VERSION),
                shadingLanguageVersion: t[r(1061)](t[r(668)]),
                extensions: t[r(534)](),
                maxTextureSize: t.getParameter(t.MAX_TEXTURE_SIZE),
                maxRenderbufferSize: t[r(lt)](t[r(ht)]),
                maxTextureImageUnits: t[r(1061)](t.MAX_TEXTURE_IMAGE_UNITS),
                maxVertexTextureImageUnits: t[r(1061)](t[r(ft)]),
                maxCombinedTextureImageUnits: t[r(gt)](t[r(1171)]),
                maxVertexAttribs: t[r(pt)](t[r(1316)]),
                maxVaryingVectors: t[r(gt)](t[r(vt)]),
                maxVertexUniformVectors: t[r(_t)](t[r(mt)]),
                maxFragmentUniformVectors: t.getParameter(t[r(782)]),
              };
            }),
            (yt.prototype.getHasLiedLanguages = function () {
              var t = bt;
              if (void 0 !== navigator.languages)
                try {
                  if (navigator.languages[0][t(it)](0, 2) !== navigator.language[t(484)](0, 2))
                    return !0;
                } catch (t) {
                  return !0;
                }
              return !1;
            }),
            (yt.prototype[bt(866)] = function () {
              var n = bt;
              return (
                window.screen[n(t)] < window[n(827)][n(e)] ||
                window[n(827)][n(1100)] < window[n(et)][n(nt)]
              );
            }),
            (yt[bt(a)].getHasLiedOs = function () {
              var t,
                e = bt,
                n = navigator[e(w)][e(S)](),
                i = navigator.oscpu,
                r = navigator[e(O)].toLowerCase();
              if (
                ((t =
                  n[e(717)]('windows phone') >= 0
                    ? e(I)
                    : n[e(717)](e(T)) >= 0
                      ? e(A)
                      : n[e(717)](e(1034)) >= 0
                        ? e(P)
                        : n[e(717)]('linux') >= 0 || n.indexOf(e(556)) >= 0
                          ? e(735)
                          : n[e(C)](e(1044)) >= 0 || n[e(717)](e(771)) >= 0
                            ? e(L)
                            : n.indexOf(e(D)) >= 0
                              ? e(915)
                              : 'Other'),
                ('ontouchstart' in window || navigator[e(x)] > 0 || navigator[e(632)] > 0) &&
                  'Windows Phone' !== t &&
                  t !== e(895) &&
                  t !== e(M) &&
                  t !== e(R))
              )
                return !0;
              if (typeof i !== e(727)) {
                if ((i = i[e(1006)]())[e(U)]('win') >= 0 && t !== e(A) && t !== e(804)) return !0;
                if (i.indexOf('linux') >= 0 && t !== e(735) && t !== e(895)) return !0;
                if (i.indexOf(e(721)) >= 0 && 'Mac' !== t && t !== e(M)) return !0;
                if (
                  (-1 === i[e(717)](e(754)) && -1 === i[e(k)](e(822)) && -1 === i[e(717)]('mac')) !=
                  ('Other' === t)
                )
                  return !0;
              }
              return (
                (r[e(717)](e(754)) >= 0 && t !== e(A) && t !== e(804)) ||
                ((r.indexOf(e(N)) >= 0 || r[e(B)](e(F)) >= 0 || r[e(C)](e(791)) >= 0) &&
                  t !== e(735) &&
                  t !== e(895)) ||
                ((r[e(717)](e(D)) >= 0 ||
                  r[e(717)](e(H)) >= 0 ||
                  r.indexOf(e(V)) >= 0 ||
                  r.indexOf(e(1044)) >= 0) &&
                  t !== e(915) &&
                  'iOS' !== t) ||
                (r[e(717)]('win') < 0 &&
                  r[e(G)]('linux') < 0 &&
                  r[e(j)](e(D)) < 0 &&
                  r[e(717)](e(W)) < 0 &&
                  r.indexOf(e(K)) < 0) !==
                  (t === e(R)) ||
                (typeof navigator[e(1301)] === e(727) && t !== e(z) && t !== e(Y))
              );
            }),
            (yt.prototype[bt(1132)] = function () {
              var t,
                e = bt,
                n = navigator.userAgent[e(s)](),
                i = navigator[e(u)];
              if (
                ((t =
                  n.indexOf('firefox') >= 0
                    ? e(c)
                    : n[e(l)](e(958)) >= 0 || n.indexOf(e(d)) >= 0
                      ? e(h)
                      : n.indexOf('chrome') >= 0
                        ? e(f)
                        : n[e(g)]('safari') >= 0
                          ? e(p)
                          : n.indexOf(e(v)) >= 0
                            ? 'Internet Explorer'
                            : e(951)) === e(1017) ||
                  'Safari' === t ||
                  'Opera' === t) &&
                i !== e(_)
              )
                return !0;
              var r,
                o = eval[e(m)]()[e(b)];
              if (37 === o && t !== e(p) && 'Firefox' !== t && 'Other' !== t) return !0;
              if (39 === o && t !== e(910) && 'Other' !== t) return !0;
              if (33 === o && t !== e(f) && t !== e(y) && t !== e(951)) return !0;
              try {
                throw 'a';
              } catch (t) {
                try {
                  t[e(E)](), (r = !0);
                } catch (t) {
                  r = !1;
                }
              }
              return r && 'Firefox' !== t && t !== e(951);
            }),
            yt
          );
        })()),
        (e[et(rt)] = nt);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o = 816,
        a = 816,
        s = _0x2a96a4;
      (e = t._POSignalsMetadata || (t[s(709)] = {})),
        (n = { _0x5e45cd: 755 }),
        (i = _0x34d2),
        (r = (function () {
          var e = _0x34d2;
          function i(t) {
            this[_0x34d2(n._0x5e45cd)] = t;
          }
          return (
            (i[e(816)][e(1328)] = function () {
              var e = 786,
                n = 1278,
                i = 1141;
              return __awaiter(this, void 0, void 0, function () {
                var r,
                  o = this;
                return __generator(this, function (a) {
                  var s = _0x34d2;
                  switch (a.label) {
                    case 0:
                      return [4, this[s(e)](window)];
                    case 1:
                      return (
                        (r = a[s(n)]()),
                        [
                          4,
                          this.test(r, s(i), function () {
                            return __awaiter(o, void 0, void 0, function () {
                              var e,
                                n,
                                i = 968,
                                r = 815,
                                o = 935,
                                a = 745,
                                s = 1239,
                                u = 486,
                                c = 565;
                              return __generator(this, function (l) {
                                var d = _0x34d2;
                                switch (l[d(i)]) {
                                  case 0:
                                    return Object[d(1239)] &&
                                      (e = t[d(r)][d(526)].createInvisibleElement('iframe'))
                                      ? ((e[d(929)] = d(o)),
                                        document[d(a)].appendChild(e),
                                        Object[d(s)](HTMLIFrameElement[d(816)])[d(u)][d(952)][
                                          d(c)
                                        ]() !== d(1315)
                                          ? [2, !0]
                                          : e.contentWindow === window
                                            ? [2, !0]
                                            : [4, this.headlessResults(e.contentWindow)])
                                      : [2];
                                  case 1:
                                    return (n = l[d(1278)]()), e.remove(), [2, n];
                                }
                              });
                            });
                          }),
                        ]
                      );
                    case 2:
                      return a[s(n)](), [2, r];
                  }
                });
              });
            }),
            (i[e(o)].headlessResults = function (t) {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n,
                  i = 649,
                  r = 862,
                  o = 528,
                  a = 1161,
                  s = 649,
                  u = 983,
                  c = 1048,
                  l = 649,
                  d = 1278,
                  h = this;
                return __generator(this, function (f) {
                  var g = _0x34d2;
                  switch (f.label) {
                    case 0:
                      return (
                        (e = new Map()),
                        (n = [])[g(1161)](
                          this[g(i)](e, 'headless_chrome', function () {
                            var e = 649;
                            return __awaiter(h, void 0, void 0, function () {
                              return __generator(this, function (n) {
                                return [2, /HeadlessChrome/[_0x34d2(e)](t.navigator.userAgent)];
                              });
                            });
                          }),
                        ),
                        n[g(1161)](
                          this[g(649)](e, g(r), function () {
                            return __awaiter(h, void 0, void 0, function () {
                              return __generator(this, function (e) {
                                var n = _0x34d2;
                                return [2, t[n(656)][n(1302)]];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, g(o), function () {
                            var e = 649;
                            return __awaiter(h, void 0, void 0, function () {
                              return __generator(this, function (n) {
                                var i = _0x34d2;
                                return [2, /Chrome/[i(e)](t.navigator[i(841)]) && !t[i(781)]];
                              });
                            });
                          }),
                        ),
                        n[g(a)](
                          this[g(649)](e, g(961), function () {
                            return __awaiter(h, void 0, void 0, function () {
                              var e,
                                n = 968,
                                i = 641,
                                r = 656,
                                o = 1270,
                                a = 635;
                              return __generator(this, function (s) {
                                var u = _0x34d2;
                                switch (s[u(n)]) {
                                  case 0:
                                    return t[u(656)][u(i)] && t[u(536)]
                                      ? [4, t[u(r)][u(641)][u(o)]({ name: 'notifications' })]
                                      : [3, 2];
                                  case 1:
                                    return (
                                      (e = s.sent()),
                                      [2, t[u(536)].permission === u(a) && e[u(865)] === u(605)]
                                    );
                                  case 2:
                                    return [2];
                                }
                              });
                            });
                          }),
                        ),
                        n[g(1161)](
                          this.test(e, g(1193), function () {
                            return __awaiter(h, void 0, void 0, function () {
                              var e,
                                n = 1270,
                                i = 1021,
                                r = 565,
                                o = 565,
                                a = 565,
                                s = 1232,
                                u = 658;
                              return __generator(this, function (c) {
                                var l = _0x34d2;
                                return (e = t[l(656)][l(641)])
                                  ? e[l(n)][l(565)]() !== l(i)
                                    ? [2, !0]
                                    : e[l(1270)][l(r)][l(o)]() !== l(1102)
                                      ? [2, !0]
                                      : e[l(1270)][l(565)][l(1232)](l(734)) &&
                                          e[l(1270)][l(565)][l(1232)]('[[Target]]') &&
                                          e[l(1270)][l(a)][l(s)](l(u))
                                        ? [2, !0]
                                        : [2, e[l(s)]('query')]
                                  : [2];
                              });
                            });
                          }),
                        ),
                        n[g(a)](
                          this[g(s)](e, g(1158), function () {
                            var t = 601;
                            return __awaiter(h, void 0, void 0, function () {
                              return __generator(this, function (e) {
                                var n = _0x34d2;
                                return [2, 0 === navigator[n(1301)][n(t)]];
                              });
                            });
                          }),
                        ),
                        n[g(1161)](
                          this[g(s)](e, g(u), function () {
                            return __awaiter(h, void 0, void 0, function () {
                              var t = 590;
                              return __generator(this, function (e) {
                                return [2, '' === navigator[_0x34d2(t)]];
                              });
                            });
                          }),
                        ),
                        n[g(a)](
                          this.test(e, g(c), function () {
                            var t = 1301,
                              e = 1301;
                            return __awaiter(h, void 0, void 0, function () {
                              var n;
                              return __generator(this, function (i) {
                                var r = _0x34d2;
                                return (
                                  (n = PluginArray[r(816)] === navigator[r(t)][r(747)]),
                                  navigator[r(1301)][r(601)] > 0 &&
                                    (n = n && Plugin[r(816)] === navigator[r(e)][0][r(747)]),
                                  [2, n]
                                );
                              });
                            });
                          }),
                        ),
                        n[g(a)](
                          this[g(l)](e, 'consistent_mimetypes_prototype', function () {
                            return __awaiter(h, void 0, void 0, function () {
                              var t,
                                e = 816,
                                n = 674,
                                i = 601;
                              return __generator(this, function (r) {
                                var o = _0x34d2;
                                return (
                                  (t = MimeTypeArray[o(e)] === navigator[o(674)][o(747)]),
                                  navigator[o(n)][o(i)] > 0 &&
                                    (t =
                                      t && MimeType.prototype === navigator[o(674)][0].__proto__),
                                  [2, t]
                                );
                              });
                            });
                          }),
                        ),
                        [4, Promise.all(n)]
                      );
                    case 1:
                      return f[g(d)](), [2, e];
                  }
                });
              });
            }),
            (i[e(a)][e(649)] = function (e, n, i) {
              return __awaiter(this, void 0, void 0, function () {
                var r,
                  o,
                  a = 968,
                  s = 1161,
                  u = 815,
                  c = 840;
                return __generator(this, function (l) {
                  var d = _0x34d2;
                  switch (l[d(a)]) {
                    case 0:
                      return (
                        l[d(737)][d(s)]([0, 3, , 4]),
                        this[d(755)][d(886)](n)
                          ? [3, 2]
                          : [4, t._POSignalsUtils.Util[d(1138)](100, i())]
                      );
                    case 1:
                      null != (r = l.sent()) && (e[n] = r), (l[d(a)] = 2);
                    case 2:
                      return [3, 4];
                    case 3:
                      return (o = l[d(1278)]()), t[d(u)][d(599)][d(c)](n + d(530), o), [3, 4];
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            i
          );
        })()),
        (e[i(1249)] = r);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = _0x2a96a4;
      !(function (n) {
        (t[e(709)] || (t[e(709)] = {})).detectIncognitoInternal = function () {
          var t = 857,
            e = { _0x4887ec: 1196, _0x596187: 649 },
            n = { _0x35d710: 990 };
          return new Promise(function (i, r) {
            var o = { _0x46452b: 1095 },
              a = { _0x328475: 926, _0x303829: 569, _0x4e8668: 539, _0x41dc0a: 1235 },
              s = { _0x50ed0b: 506, _0x1dbfcf: 1228 },
              u = _0x34d2,
              c = u(787),
              l = !1;
            function d(t) {
              l || ((l = !0), i({ isPrivate: t, browserName: c }));
            }
            function h() {
              var t = u,
                e = 0,
                i = parseInt('-1');
              try {
                i[t(768)](i);
              } catch (i) {
                e = i[t(n._0x35d710)].length;
              }
              return e;
            }
            function f() {
              return (
                void 0 !== navigator[u(806)] &&
                (function (t) {
                  var e = u;
                  try {
                    return t === eval[e(565)]()[e(601)];
                  } catch (t) {
                    return !1;
                  }
                })(39)
              );
            }
            function g() {
              var t = 883;
              return __awaiter(this, void 0, void 0, function () {
                var n;
                return __generator(this, function (i) {
                  var r = _0x34d2;
                  switch (i[r(968)]) {
                    case 0:
                      return typeof (null === (n = navigator[r(t)]) || void 0 === n
                        ? void 0
                        : n[r(588)]) !== r(974)
                        ? [3, 2]
                        : [
                            4,
                            (function () {
                              var t,
                                e = 1161,
                                n = 588,
                                i = 1278,
                                r = 968,
                                o = 1278,
                                a = 990,
                                s = 1155;
                              return __awaiter(this, void 0, void 0, function () {
                                var u, c, l;
                                return __generator(this, function (h) {
                                  var f = _0x34d2;
                                  switch (h[f(968)]) {
                                    case 0:
                                      return (
                                        h[f(737)][f(e)]([0, 4, , 5]),
                                        typeof (null === (u = navigator[f(883)]) || void 0 === u
                                          ? void 0
                                          : u[f(n)]) !== f(974)
                                          ? [3, 2]
                                          : [4, u[f(588)]()]
                                      );
                                    case 1:
                                      return h[f(i)](), d(!1), [3, 3];
                                    case 2:
                                      d(!1), (h[f(r)] = 3);
                                    case 3:
                                      return [3, 5];
                                    case 4:
                                      return (
                                        (c = h[f(o)]()),
                                        d(
                                          typeof (l =
                                            c instanceof Error &&
                                            null !== (t = c[f(a)]) &&
                                            void 0 !== t
                                              ? t
                                              : c) === f(1133) && l[f(539)](f(s)),
                                        ),
                                        [3, 5]
                                      );
                                    case 5:
                                      return [2];
                                  }
                                });
                              });
                            })(),
                          ];
                    case 1:
                      return i[r(1278)](), [3, 3];
                    case 2:
                      void 0 !== navigator[r(718)]
                        ? (function () {
                            var t = u,
                              e = String(Math.random());
                            try {
                              var n = indexedDB[t(1250)](e, 1);
                              (n[t(1062)] = function (n) {
                                var i = t,
                                  r = n[i(967)][i(a._0x328475)];
                                try {
                                  r[i(493)]('t', { autoIncrement: !0 })[i(a._0x303829)](new Blob()),
                                    d(!1);
                                } catch (t) {
                                  d((t.message || '')[i(a._0x4e8668)]('are not yet supported'));
                                } finally {
                                  r.close(), indexedDB[i(a._0x41dc0a)](e);
                                }
                              }),
                                (n[t(510)] = function () {
                                  return d(!1);
                                });
                            } catch (t) {
                              d(!1);
                            }
                          })()
                        : (function () {
                            var t = u;
                            try {
                              window[t(e._0x4887ec)](null, null, null, null);
                            } catch (t) {
                              return d(!0);
                            }
                            try {
                              localStorage[t(746)](t(649), '1'),
                                localStorage.removeItem(t(e._0x596187));
                            } catch (t) {
                              return d(!0);
                            }
                            d(!1);
                          })(),
                        (i.label = 3);
                    case 3:
                      return [2];
                  }
                });
              });
            }
            function p() {
              var t = u;
              navigator[t(757)].queryUsageAndQuota(
                function (e, n) {
                  var i,
                    r,
                    a,
                    s,
                    c = t;
                  d(
                    Math.round(n / 1048576) <
                      2 *
                        Math[c(o._0x46452b)](
                          ((a = u),
                          (null !==
                            (s =
                              null ===
                                (r =
                                  null === (i = performance) || void 0 === i ? void 0 : i.memory) ||
                              void 0 === r
                                ? void 0
                                : r[a(793)]) && void 0 !== s
                            ? s
                            : 1073741824) / 1048576),
                        ),
                  );
                },
                function (e) {
                  var n = t;
                  r(new Error(n(1191) + e[n(990)]));
                },
              );
            }
            function v() {
              var t = u;
              self[t(1289)] && self[t(1289)][t(1216)]
                ? p()
                : (0, window[u(1194)])(
                    0,
                    1,
                    function () {
                      return d(!1);
                    },
                    function () {
                      return d(!0);
                    },
                  );
            }
            (function () {
              var t = 910;
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (e) {
                  var n,
                    i,
                    o = _0x34d2;
                  switch (e[o(968)]) {
                    case 0:
                      return 44 !== h() ? [3, 2] : ((c = 'Safari'), [4, g()]);
                    case 1:
                      return e[o(1278)](), [3, 6];
                    case 2:
                      return 51 !== h()
                        ? [3, 3]
                        : ((n = u),
                          (i = navigator[n(841)]),
                          (c = i[n(s._0x50ed0b)](/Chrome/)
                            ? void 0 !== navigator.brave
                              ? n(s._0x1dbfcf)
                              : i[n(506)](/Edg/)
                                ? 'Edge'
                                : i.match(/OPR/)
                                  ? n(736)
                                  : n(1017)
                            : 'Chromium'),
                          v(),
                          [3, 6]);
                    case 3:
                      return 25 !== h()
                        ? [3, 5]
                        : ((c = 'Firefox'),
                          [
                            4,
                            (function () {
                              var t = 588,
                                e = 737,
                                n = 1161,
                                i = 1133,
                                r = 1122;
                              return __awaiter(this, void 0, void 0, function () {
                                var o, a, s;
                                return __generator(this, function (u) {
                                  var c = _0x34d2;
                                  switch (u.label) {
                                    case 0:
                                      if (
                                        typeof (null === (o = navigator[c(883)]) || void 0 === o
                                          ? void 0
                                          : o[c(t)]) !== c(974)
                                      )
                                        return [3, 5];
                                      u[c(968)] = 1;
                                    case 1:
                                      return u[c(e)][c(n)]([1, 3, , 4]), [4, o[c(588)]()];
                                    case 2:
                                      return u.sent(), d(!1), [3, 4];
                                    case 3:
                                      return (
                                        (a = u[c(1278)]()),
                                        d(
                                          typeof (s =
                                            a instanceof Error ? a[c(990)] : String(a)) === c(i) &&
                                            s[c(539)](c(r)),
                                        ),
                                        [2]
                                      );
                                    case 4:
                                      return [3, 6];
                                    case 5:
                                      d(void 0 === navigator.serviceWorker), (u[c(968)] = 6);
                                    case 6:
                                      return [2];
                                  }
                                });
                              });
                            })(),
                          ]);
                    case 4:
                      return e.sent(), [3, 6];
                    case 5:
                      f()
                        ? ((c = o(t)), d(void 0 === window[u(496)]))
                        : r(new Error('Browser unknown')),
                        (e[o(968)] = 6);
                    case 6:
                      return [2];
                  }
                });
              });
            })()[u(t)](r);
          });
        };
      })();
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s,
        u,
        c,
        l,
        d,
        h,
        f,
        g,
        p,
        v = 733,
        _ = _0x2a96a4;
      (e = t._POSignalsMetadata || (t[_(709)] = {})),
        (n = 1071),
        (i = 816),
        (r = 829),
        (o = 899),
        (a = 781),
        (s = 950),
        (u = 1059),
        (c = 739),
        (l = 1279),
        (d = 816),
        (h = 974),
        (f = 882),
        (g = _0x34d2),
        (p = (function () {
          var g = 816,
            p = 764,
            v = 816,
            _ = 565,
            m = 899,
            b = 727,
            y = 849,
            E = 886,
            w = 901,
            S = 875,
            O = 549,
            I = 1237,
            T = 926,
            A = _0x34d2;
          function P(t) {
            (this.propertyBlackList = t), (this.result = {});
          }
          return (
            (P[A(816)].documentLie = function (t, e) {
              var n = A;
              if (e.lied)
                for (var i = 0, r = e[n(I)]; i < r.length; i++) {
                  var o = r[i];
                  !this[n(T)][o] && (this.result[o] = []), this[n(926)][o][n(1161)](t);
                }
            }),
            (P[A(816)][A(1195)] = function (t, e, n) {
              var i = 1099,
                r = A,
                o = this;
              if ((void 0 === n && (n = null), typeof t != r(h))) return { lied: !1, lieTypes: [] };
              var a = t.name.replace(/get\s/, ''),
                s = {
                  undefined_properties: function () {
                    return !!n && P[r(1173)](n, a);
                  },
                  to_string: function () {
                    var e = r;
                    return P.getToStringLie(t, a, o[e(i)]);
                  },
                  prototype_in_function: function () {
                    return P[r(O)](t);
                  },
                  own_property: function () {
                    return P[r(S)](t);
                  },
                  object_to_string_error: function () {
                    return P[r(829)](t);
                  },
                },
                u = Object[r(f)](s)[r(606)](function (t) {
                  var e = r;
                  return !o.propertyBlackList[e(E)](e(w) + t) && !!s[t]();
                });
              return { lied: u[r(601)] > 0, lieTypes: u };
            }),
            (P[A(816)][A(n)] = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n = 755,
                  i = 945,
                  r = 815,
                  o = 991,
                  a = 1243,
                  s = 745,
                  u = 996,
                  c = 1258,
                  l = 500,
                  d = 769,
                  h = 500,
                  f = 623,
                  g = 844,
                  p = 500,
                  v = 1220,
                  _ = 500,
                  m = 1301,
                  b = 1278,
                  y = 481,
                  E = 926;
                return __generator(this, function (w) {
                  var S = _0x34d2;
                  switch (w.label) {
                    case 0:
                      return this[S(n)].has(S(i))
                        ? [2, this.result]
                        : (!this[S(755)].has('LIES_IFRAME') &&
                            (e = t[S(r)].Util[S(o)](S(a))) &&
                            (document[S(s)][S(u)](e), (this[S(1099)] = e)),
                          [
                            4,
                            Promise[S(c)]([
                              this[S(l)](
                                function () {
                                  return AnalyserNode;
                                },
                                { target: ['minDecibels'] },
                              ),
                              this[S(500)](
                                function () {
                                  return AudioBuffer;
                                },
                                { target: [S(d)] },
                              ),
                              this[S(500)](
                                function () {
                                  return BiquadFilterNode;
                                },
                                { target: [S(1120)] },
                              ),
                              this[S(l)](
                                function () {
                                  return CanvasRenderingContext2D;
                                },
                                { target: ['getLineDash'] },
                              ),
                              this[S(500)](
                                function () {
                                  return DOMRect;
                                },
                                { target: [S(1100)] },
                              ),
                              this[S(h)](
                                function () {
                                  return DOMRectReadOnly;
                                },
                                { target: [S(f)] },
                              ),
                              this[S(500)](
                                function () {
                                  return Element;
                                },
                                { target: [S(g)] },
                              ),
                              this[S(p)](
                                function () {
                                  return HTMLCanvasElement;
                                },
                                { target: [S(1100)] },
                              ),
                              this[S(p)](
                                function () {
                                  return Math;
                                },
                                { target: [S(687)] },
                              ),
                              this.searchLies(
                                function () {
                                  return MediaDevices;
                                },
                                { target: [S(v)] },
                              ),
                              this[S(_)](
                                function () {
                                  return Navigator;
                                },
                                { target: [S(m)] },
                              ),
                              this[S(l)](
                                function () {
                                  return OffscreenCanvasRenderingContext2D;
                                },
                                { target: [S(489)] },
                              ),
                              this[S(500)](
                                function () {
                                  return SVGRect;
                                },
                                { target: ['x'] },
                              ),
                            ]),
                          ]);
                    case 1:
                      return w[S(b)](), this[S(1099)][S(y)](), [2, this[S(E)]];
                  }
                });
              });
            }),
            (P[A(i)][A(500)] = function (e, n) {
              var i = 816,
                r = 1140,
                o = { _0x5c76d2: 727 },
                a = A,
                s = void 0 === n ? {} : n,
                u = s.target,
                c = void 0 === u ? [] : u,
                l = s[a(479)],
                d = void 0 === l ? [] : l;
              return __awaiter(this, void 0, void 0, function () {
                var n = 533,
                  a = 886,
                  s = 1114,
                  u = 649,
                  l = 700,
                  h = 816,
                  f = 1195,
                  g = 1195,
                  p = 599;
                var v,
                  _,
                  m = this;
                return __generator(this, function (b) {
                  var y,
                    E = _0x34d2;
                  try {
                    if (((v = e()), typeof (y = v) == _0x34d2(o._0x5c76d2) || !y)) return [2];
                  } catch (t) {
                    return [2];
                  }
                  return (
                    (_ = v[E(i)] ? v.prototype : v),
                    Object[E(984)](_)[E(r)](function (e) {
                      var i = E;
                      if (
                        !(
                          e == i(n) ||
                          (c.length && !new Set(c)[i(a)](e)) ||
                          (d[i(601)] && new Set(d).has(e))
                        )
                      ) {
                        var r = /\s(.+)\]/,
                          o = (v[i(s)] ? v.name : r[i(u)](v) ? r[i(l)](v)[1] : void 0) + '.' + e;
                        try {
                          var _ = v[i(h)] ? v[i(816)] : v;
                          try {
                            if ('function' == typeof _[e]) {
                              var b = m[i(f)](_[e], _);
                              return void m[i(554)](o, b);
                            }
                          } catch (t) {}
                          var y = Object[i(849)](_, e)[i(952)],
                            w = m[i(g)](y, _, v);
                          m[i(554)](o, w);
                        } catch (n) {
                          t._POSignalsUtils[i(p)][i(840)](i(797) + e + ' test execution', n);
                        }
                      }
                    }),
                    [2]
                  );
                });
              });
            }),
            (P[A(1173)] = function (t, e) {
              var n = A,
                i = t[n(1114)],
                r = window[i.charAt(0).toLowerCase() + i[n(m)](1)];
              return !!r && (typeof Object[n(849)](r, e) != n(b) || void 0 !== Reflect[n(y)](r, e));
            }),
            (P.getToStringLie = function (t, e, n) {
              var i,
                r,
                o = 1244,
                a = 1143,
                s = 1152,
                u = 939,
                c = A;
              try {
                i = n[c(764)][c(816)][c(565)][c(675)](t);
              } catch (t) {}
              try {
                r = n[c(p)][c(v)][c(_)].call(t[c(_)]);
              } catch (t) {}
              var l = i || t[c(565)](),
                d = r || t[c(565)][c(565)](),
                h = function (t) {
                  var e,
                    n = c;
                  return (
                    ((e = {})[n(1143) + t + '() { [native code] }'] = !0),
                    (e[n(o) + t + n(1333)] = !0),
                    (e[n(1254)] = !0),
                    (e[n(a) + t + n(s) + '\n' + n(u) + '\n}'] = !0),
                    (e[n(1244) + t + '() {\n' + n(939) + '\n}'] = !0),
                    (e[n(992) + '\n    [native code]\n}'] = !0),
                    e
                  );
                };
              return !h(e)[l] || !h(c(565))[d];
            }),
            (P[A(549)] = function (t) {
              return A(g) in t;
            }),
            (P[A(875)] = function (t) {
              var e = A;
              return (
                t[e(1232)](e(c)) ||
                t[e(1232)](e(l)) ||
                t.hasOwnProperty(e(d)) ||
                t.hasOwnProperty('toString')
              );
            }),
            (P[A(r)] = function (t) {
              var n = 649,
                i = A;
              try {
                return Object[i(592)](t)[i(565)](), !0;
              } catch (t) {
                var r = t.stack[i(647)]('\n'),
                  c = /at Object\.apply/,
                  l = !r[i(o)](1)[i(937)](function (t) {
                    return c[i(n)](t);
                  }),
                  d = 'TypeError' == t.constructor[i(1114)] && r[i(601)] > 1,
                  h = i(a) in window || e[i(s)][i(u)]();
                return !(!d || !h || (/at Function\.toString/[i(649)](r[1]) && l)) || !d;
              }
            }),
            P
          );
        })()),
        (e[g(v)] = p);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o,
        a,
        s = 798,
        u = 1094,
        c = _0x2a96a4;
      (e = t[c(709)] || (t[c(709)] = {})),
        (n = 816),
        (i = 933),
        (r = { _0x3ea1cb: 755 }),
        (o = _0x34d2),
        (a = (function () {
          var o = 1168,
            a = 542,
            s = 647,
            c = 649,
            l = 938,
            d = 781,
            h = 950,
            f = 1094,
            g = 926,
            p = 1046,
            v = 565,
            _ = 1046,
            m = 781,
            b = 902,
            y = 533,
            E = 938,
            w = 558,
            S = 929,
            O = _0x34d2;
          function I(t) {
            var e = _0x34d2;
            (this[e(r._0x3ea1cb)] = t), (this[e(926)] = new Map());
          }
          return (
            (I[O(816)][O(660)] = function () {
              var e = 1243,
                n = 815,
                i = 526,
                r = O;
              return (
                this[r(f)]('srcdoc_throws_error', function () {
                  var t = r;
                  try {
                    return !!document[t(654)](t(1243))[t(S)];
                  } catch (t) {
                    return !0;
                  }
                }),
                this.addStealthTest('srcdoc_triggers_window_proxy', function () {
                  var o = r,
                    a = document[o(654)](o(e));
                  return (
                    (a.srcdoc = '' + t[o(n)][o(i)].hashMini(crypto[o(1287)](new Uint32Array(10)))),
                    !!a.contentWindow
                  );
                }),
                this.addStealthTest(r(749), function () {
                  var t = r,
                    e = 'cookieStore' in window ? t(1065) : t(558) in window ? t(w) : t(740),
                    n = [];
                  for (var i in window) n[t(1161)](i);
                  return n.indexOf('chrome') > n[t(717)](e);
                }),
                this[r(1094)](r(957), function () {
                  var t = r;
                  if (!(t(m) in window && t(902) in window.chrome)) return !1;
                  try {
                    return (
                      t(816) in window[t(781)][t(b)][t(867)] ||
                      t(816) in window[t(781)][t(902)][t(969)] ||
                      (new window[t(m)][t(b)][t(867)](), new window[t(m)][t(b)].connect(), !0)
                    );
                  } catch (e) {
                    return e[t(y)][t(1114)] != t(E);
                  }
                }),
                this[r(1094)]('Function_prototype_toString_invalid_typeError', function () {
                  var t = r,
                    e = new I.StackTraceTester();
                  return e[t(p)](Function.prototype[t(v)]) || e[t(_)](function () {});
                }),
                this[r(g)]
              );
            }),
            (I[O(816)][O(u)] = function (e, n) {
              var r = O;
              if (!this.propertyBlackList[r(886)](e))
                try {
                  this.result[e] = n();
                } catch (n) {
                  t._POSignalsUtils.Logger[r(840)](r(772) + e + r(i), n);
                }
            }),
            (I[O(835)] = (function () {
              var t = O;
              function i() {}
              return (
                (i[t(n)][t(1046)] = function (n) {
                  var i = t,
                    r = this;
                  try {
                    return (
                      (this[i(o)] = function () {
                        var t = i;
                        return Object[t(592)](n)[t(565)]();
                      }),
                      (this.cant = function () {
                        return r[i(1168)]();
                      }),
                      (this[i(a)] = function () {
                        return r[i(1257)]();
                      }),
                      this[i(542)](),
                      !0
                    );
                  } catch (t) {
                    var u = t[i(1242)][i(s)]('\n'),
                      f = !/at Object\.apply/[i(c)](u[1]),
                      g = t[i(533)][i(1114)] == i(l) && u.length >= 5,
                      p = i(d) in window || e[i(h)][i(1059)]();
                    return (
                      !(
                        !g ||
                        !p ||
                        (f &&
                          /at Function\.toString/[i(649)](u[1]) &&
                          /\.you/.test(u[2]) &&
                          /\.cant/[i(649)](u[3]) &&
                          /\.hide/.test(u[4]))
                      ) || !g
                    );
                  }
                }),
                i
              );
            })()),
            I
          );
        })()),
        (e[o(s)] = a);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e,
        n,
        i,
        r,
        o,
        a = _0x2a96a4;
      (e = t[a(709)] || (t[a(709)] = {})),
        (n = 1045),
        (i = 893),
        (r = _0x34d2),
        (o = (function () {
          var e = _0x34d2;
          function r() {}
          return (
            (r[e(1337)] = function () {
              var r = e;
              return t[r(709)]
                [r(n)]()
                [r(i)](function (t) {
                  return t.isPrivate;
                })
                [r(857)](function () {
                  return !1;
                });
            }),
            r
          );
        })()),
        (e[r(559)] = o);
    })(_POSignalsEntities || (_POSignalsEntities = {}));
  var __extends =
    (this && this.__extends) ||
    (function () {
      var t = function (e, n) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          })(e, n);
      };
      return function (e, n) {
        function i() {
          this.constructor = e;
        }
        t(e, n),
          (e.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
      };
    })();
  (__awaiter =
    (this && this.__awaiter) ||
    function (t, e, n, i) {
      return new (n || (n = Promise))(function (r, o) {
        function a(t) {
          try {
            u(i.next(t));
          } catch (t) {
            o(t);
          }
        }
        function s(t) {
          try {
            u(i.throw(t));
          } catch (t) {
            o(t);
          }
        }
        function u(t) {
          var e;
          t.done
            ? r(t.value)
            : ((e = t.value),
              e instanceof n
                ? e
                : new n(function (t) {
                    t(e);
                  })).then(a, s);
        }
        u((i = i.apply(t, e || [])).next());
      });
    }),
    (__generator =
      (this && this.__generator) ||
      function (t, e) {
        var n,
          i,
          r,
          o,
          a = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function s(o) {
          return function (s) {
            return (function (o) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & o[0]
                          ? i.return
                          : o[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, o[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                    case 0:
                    case 1:
                      r = o;
                      break;
                    case 4:
                      return a.label++, { value: o[1], done: !1 };
                    case 5:
                      a.label++, (i = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = a.trys).length > 0 && r[r.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                        a.label = o[1];
                        break;
                      }
                      if (6 === o[0] && a.label < r[1]) {
                        (a.label = r[1]), (r = o);
                        break;
                      }
                      if (r && a.label < r[2]) {
                        (a.label = r[2]), a.ops.push(o);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  o = e.call(t, a);
                } catch (t) {
                  (o = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, s]);
          };
        }
      }),
    (__assign =
      (this && this.__assign) ||
      function () {
        return (__assign =
          Object.assign ||
          function (t) {
            for (var e, n = 1, i = arguments.length; n < i; n++)
              for (var r in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t;
          }).apply(this, arguments);
      }),
    (__spreadArrays =
      (this && this.__spreadArrays) ||
      function () {
        for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
        var i = Array(t),
          r = 0;
        for (e = 0; e < n; e++)
          for (var o = arguments[e], a = 0, s = o.length; a < s; a++, r++) i[r] = o[a];
        return i;
      });
  !(function (t) {
    !(function (t) {
      (t[(t.Unknown = 0)] = 'Unknown'),
        (t[(t.FlingRight = 1)] = 'FlingRight'),
        (t[(t.FlingLeft = 2)] = 'FlingLeft'),
        (t[(t.FlingUp = 3)] = 'FlingUp'),
        (t[(t.FlingDown = 4)] = 'FlingDown'),
        (t[(t.Diagonal = 5)] = 'Diagonal'),
        (t[(t.ScrollRight = 6)] = 'ScrollRight'),
        (t[(t.ScrollLeft = 7)] = 'ScrollLeft'),
        (t[(t.ScrollUp = 8)] = 'ScrollUp'),
        (t[(t.ScrollDown = 9)] = 'ScrollDown'),
        (t[(t.Tap = 10)] = 'Tap'),
        (t[(t.DoubleTap = 11)] = 'DoubleTap');
    })(t.GestureType || (t.GestureType = {}));
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      'use strict';
      var e = (function () {
          function t(t, e) {
            (this.handler = t), (this.isOnce = e), (this.isExecuted = !1);
          }
          return (
            (t.prototype.execute = function (t, e, n) {
              if (!this.isOnce || !this.isExecuted) {
                this.isExecuted = !0;
                var i = this.handler;
                t
                  ? setTimeout(function () {
                      i.apply(e, n);
                    }, 1)
                  : i.apply(e, n);
              }
            }),
            t
          );
        })(),
        n = (function () {
          function t() {
            (this._wrap = new a(this)), (this._subscriptions = new Array());
          }
          return (
            (t.prototype.subscribe = function (t) {
              t && this._subscriptions.push(new e(t, !1));
            }),
            (t.prototype.sub = function (t) {
              this.subscribe(t);
            }),
            (t.prototype.one = function (t) {
              t && this._subscriptions.push(new e(t, !0));
            }),
            (t.prototype.has = function (t) {
              if (t)
                for (var e = 0, n = this._subscriptions; e < n.length; e++) {
                  if (n[e].handler == t) return !0;
                }
              return !1;
            }),
            (t.prototype.unsubscribe = function (t) {
              if (t)
                for (var e = 0; e < this._subscriptions.length; e++) {
                  if (this._subscriptions[e].handler == t) {
                    this._subscriptions.splice(e, 1);
                    break;
                  }
                }
            }),
            (t.prototype.unsub = function (t) {
              this.unsubscribe(t);
            }),
            (t.prototype._dispatch = function (t, e, n) {
              for (var i = 0; i < this._subscriptions.length; i++) {
                var r = this._subscriptions[i];
                if (r.isOnce) {
                  if (!0 === r.isExecuted) continue;
                  this._subscriptions.splice(i, 1), i--;
                }
                r.execute(t, e, n);
              }
            }),
            (t.prototype.asEvent = function () {
              return this._wrap;
            }),
            t
          );
        })();
      t.DispatcherBase = n;
      var i = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.dispatch = function (t, e) {
            this._dispatch(!1, this, arguments);
          }),
          (e.prototype.dispatchAsync = function (t, e) {
            this._dispatch(!0, this, arguments);
          }),
          e
        );
      })(n);
      t.EventDispatcher = i;
      var r = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            __extends(e, t),
            (e.prototype.dispatch = function (t) {
              this._dispatch(!1, this, arguments);
            }),
            (e.prototype.dispatchAsync = function (t) {
              this._dispatch(!0, this, arguments);
            }),
            e
          );
        })(n),
        o = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            __extends(e, t),
            (e.prototype.dispatch = function () {
              this._dispatch(!1, this, arguments);
            }),
            (e.prototype.dispatchAsync = function () {
              this._dispatch(!0, this, arguments);
            }),
            e
          );
        })(n),
        a = (function () {
          function t(t) {
            (this._subscribe = function (e) {
              return t.subscribe(e);
            }),
              (this._unsubscribe = function (e) {
                return t.unsubscribe(e);
              }),
              (this._one = function (e) {
                return t.one(e);
              }),
              (this._has = function (e) {
                return t.has(e);
              });
          }
          return (
            (t.prototype.subscribe = function (t) {
              this._subscribe(t);
            }),
            (t.prototype.sub = function (t) {
              this.subscribe(t);
            }),
            (t.prototype.unsubscribe = function (t) {
              this._unsubscribe(t);
            }),
            (t.prototype.unsub = function (t) {
              this.unsubscribe(t);
            }),
            (t.prototype.one = function (t) {
              this._one(t);
            }),
            (t.prototype.has = function (t) {
              return this._has(t);
            }),
            t
          );
        })(),
        s = (function () {
          function t() {
            this._events = {};
          }
          return (
            (t.prototype.get = function (t) {
              var e = this._events[t];
              return e || ((e = this.createDispatcher()), (this._events[t] = e), e);
            }),
            (t.prototype.remove = function (t) {
              this._events[t] = null;
            }),
            t
          );
        })(),
        u = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            __extends(e, t),
            (e.prototype.createDispatcher = function () {
              return new i();
            }),
            e
          );
        })(s),
        c = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            __extends(e, t),
            (e.prototype.createDispatcher = function () {
              return new r();
            }),
            e
          );
        })(s),
        l = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            __extends(e, t),
            (e.prototype.createDispatcher = function () {
              return new o();
            }),
            e
          );
        })(s);
      (function () {
        function t() {
          this._events = new u();
        }
        Object.defineProperty(t.prototype, 'events', {
          get: function () {
            return this._events;
          },
          enumerable: !1,
          configurable: !0,
        }),
          (t.prototype.subscribe = function (t, e) {
            this._events.get(t).subscribe(e);
          }),
          (t.prototype.sub = function (t, e) {
            this.subscribe(t, e);
          }),
          (t.prototype.unsubscribe = function (t, e) {
            this._events.get(t).unsubscribe(e);
          }),
          (t.prototype.unsub = function (t, e) {
            this.unsubscribe(t, e);
          }),
          (t.prototype.one = function (t, e) {
            this._events.get(t).one(e);
          }),
          (t.prototype.has = function (t, e) {
            return this._events.get(t).has(e);
          });
      })(),
        (function () {
          function t() {
            this._events = new c();
          }
          Object.defineProperty(t.prototype, 'events', {
            get: function () {
              return this._events;
            },
            enumerable: !1,
            configurable: !0,
          }),
            (t.prototype.subscribe = function (t, e) {
              this._events.get(t).subscribe(e);
            }),
            (t.prototype.sub = function (t, e) {
              this.subscribe(t, e);
            }),
            (t.prototype.one = function (t, e) {
              this._events.get(t).one(e);
            }),
            (t.prototype.has = function (t, e) {
              return this._events.get(t).has(e);
            }),
            (t.prototype.unsubscribe = function (t, e) {
              this._events.get(t).unsubscribe(e);
            }),
            (t.prototype.unsub = function (t, e) {
              this.unsubscribe(t, e);
            });
        })(),
        (function () {
          function t() {
            this._events = new l();
          }
          Object.defineProperty(t.prototype, 'events', {
            get: function () {
              return this._events;
            },
            enumerable: !1,
            configurable: !0,
          }),
            (t.prototype.one = function (t, e) {
              this._events.get(t).one(e);
            }),
            (t.prototype.has = function (t, e) {
              return this._events.get(t).has(e);
            }),
            (t.prototype.subscribe = function (t, e) {
              this._events.get(t).subscribe(e);
            }),
            (t.prototype.sub = function (t, e) {
              this.subscribe(t, e);
            }),
            (t.prototype.unsubscribe = function (t, e) {
              this._events.get(t).unsubscribe(e);
            }),
            (t.prototype.unsub = function (t, e) {
              this.unsubscribe(t, e);
            });
        })();
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          (this._isStarted = !1),
            (this._isEventsStarted = !1),
            (this._gestureTimestamps = []),
            (this._maxSensorSamples = 0),
            (this._sensorsTimestampDeltaInMillis = 0),
            (this._accelerometerList = []),
            (this._gyroscopeList = []),
            (this._linearAccelerometerList = []),
            (this._rotationList = []),
            (this.orientationImplementationFix = 1),
            (this.delegate = t),
            window.navigator.userAgent.match(
              /^.*(iPhone|iPad).*(OS\s[0-9]).*(CriOS|Version)\/[.0-9]*\sMobile.*$/i,
            ) && (this.orientationImplementationFix = -1),
            (this.accelerometerUpdateHandle = this.accelerometerUpdate.bind(this)),
            (this.orientationUpdateHandle = this.orientationUpdate.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'LAST_GESTURE_SENSOR_TIMEOUT_MILI_SECONDS', {
            get: function () {
              return 3e3;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'accX', {
            get: function () {
              return this._accX;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'accY', {
            get: function () {
              return this._accY;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'accZ', {
            get: function () {
              return this._accZ;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'lienarAccX', {
            get: function () {
              return this._lienarAccX;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'lienarAccY', {
            get: function () {
              return this._lienarAccY;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'lienarAccZ', {
            get: function () {
              return this._lienarAccZ;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'rotX', {
            get: function () {
              return this._rotX;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'rotY', {
            get: function () {
              return this._rotY;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'rotZ', {
            get: function () {
              return this._rotZ;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'maxSensorSamples', {
            get: function () {
              return this._maxSensorSamples;
            },
            set: function (t) {
              this._maxSensorSamples = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'sensorsTimestampDeltaInMillis', {
            get: function () {
              return this._sensorsTimestampDeltaInMillis;
            },
            set: function (t) {
              this._sensorsTimestampDeltaInMillis = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'accelerometerList', {
            get: function () {
              return this.getRelevantSensorSamples(this._accelerometerList);
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'gyroscopeList', {
            get: function () {
              return this.getRelevantSensorSamples(this._gyroscopeList);
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'linearAccelerometerList', {
            get: function () {
              return this.getRelevantSensorSamples(this._linearAccelerometerList);
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'rotationList', {
            get: function () {
              return this._rotationList;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this._isStarted = !0), t._POSignalsUtils.Logger.debug('Sensor events started...'));
          }),
          (e.prototype.getRotationListCopy = function () {
            return this._rotationList ? Array.from(this._rotationList) : [];
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              (void 0 != window.DeviceMotionEvent &&
                window.removeEventListener('devicemotion', this.accelerometerUpdateHandle, !0),
              window.DeviceOrientationEvent &&
                window.removeEventListener('deviceorientation', this.orientationUpdateHandle, !0),
              (this._isStarted = !1),
              t._POSignalsUtils.Logger.debug('Sensor events stopped'));
          }),
          (e.prototype.getRelevantSensorSamples = function (e) {
            if (
              0 == e.length ||
              this._sensorsTimestampDeltaInMillis < 1 ||
              0 == this._gestureTimestamps.length
            )
              return e;
            for (var n = new Map(), i = null, r = 0, o = 0; o < e.length; o++)
              for (var a = 0; a < this._gestureTimestamps.length; a++)
                (r = e[o].timestamp) >=
                  (i = this._gestureTimestamps[a]).start - this._sensorsTimestampDeltaInMillis &&
                  r <= i.end + this._sensorsTimestampDeltaInMillis &&
                  n.set(e[o].timestamp, e[o]);
            return t._POSignalsUtils.Util.getValuesOfMap(n);
          }),
          (e.prototype.stopEvents = function () {
            this._isEventsStarted &&
              (void 0 != window.DeviceMotionEvent &&
                window.removeEventListener('devicemotion', this.accelerometerUpdateHandle, !0),
              window.DeviceOrientationEvent &&
                window.removeEventListener('deviceorientation', this.orientationUpdateHandle, !0),
              (this._isEventsStarted = !1),
              t._POSignalsUtils.Logger.debug('Sensor events stopped listening'));
          }),
          (e.prototype.startEvents = function () {
            this._isEventsStarted ||
              (void 0 != window.DeviceMotionEvent
                ? this.delegate.addEventListener(
                    window,
                    'devicemotion',
                    this.accelerometerUpdateHandle,
                    !0,
                  )
                : t._POSignalsUtils.Logger.warn('DeviceMotion not supported!'),
              window.DeviceOrientationEvent
                ? this.delegate.addEventListener(
                    window,
                    'deviceorientation',
                    this.orientationUpdateHandle,
                    !0,
                  )
                : t._POSignalsUtils.Logger.warn('DeviceOrientation not supported!'),
              t._POSignalsUtils.Logger.debug('Sensor events start listening...'),
              (this._isEventsStarted = !0));
          }),
          (e.prototype.reset = function () {
            (this._accelerometerList = []),
              (this._gyroscopeList = []),
              (this._linearAccelerometerList = []),
              (this._rotationList = []),
              this._gestureTimestamps.length > 0
                ? (this._gestureTimestamps = [
                    this._gestureTimestamps[this._gestureTimestamps.length - 1],
                  ])
                : (this._gestureTimestamps = []),
              (this._accX = 0),
              (this._accY = 0),
              (this._accZ = 0),
              (this._rotX = 0),
              (this._rotY = 0),
              (this._rotZ = 0);
          }),
          (e.prototype.onGesture = function (t) {
            this._isEventsStarted || this.startEvents(),
              t.events.length > 1 &&
                this._gestureTimestamps.push({
                  start: t.events[0].eventTs,
                  end: t.events[t.events.length - 1].eventTs,
                });
          }),
          (e.prototype.puaseSensorsCollectionIfNoActivity = function (t) {
            return (this._gestureTimestamps.length > 0
              ? this._gestureTimestamps[this._gestureTimestamps.length - 1].end
              : 0) > 0
              ? Math.abs(t - this._gestureTimestamps[this._gestureTimestamps.length - 1].end) >
                  this.LAST_GESTURE_SENSOR_TIMEOUT_MILI_SECONDS && (this.stopEvents(), !0)
              : (this.stopEvents(), !0);
          }),
          (e.prototype.getDeviceAcceleration = function (t) {
            return t && null != t.x && null != t.y && null != t.z ? t : null;
          }),
          (e.prototype.accelerometerUpdate = function (e) {
            try {
              if (
                !this.delegate.collectBehavioralData() ||
                this.puaseSensorsCollectionIfNoActivity(t._POSignalsUtils.Util.now())
              )
                return;
              var n = this.getDeviceAcceleration(e.accelerationIncludingGravity);
              n &&
                ((this._accX = n.x * this.orientationImplementationFix),
                (this._accY = n.y * this.orientationImplementationFix),
                (this._accZ = n.z),
                this.safeAddSensorSample(
                  {
                    x: this._accX,
                    y: this._accY,
                    z: this._accX,
                    timestamp: t._POSignalsUtils.Util.now(),
                  },
                  this._accelerometerList,
                ));
              var i = this.getDeviceAcceleration(e.acceleration);
              i &&
                ((this._lienarAccX = i.x * this.orientationImplementationFix),
                (this._lienarAccY = i.y * this.orientationImplementationFix),
                (this._lienarAccZ = i.z),
                this.safeAddSensorSample(
                  {
                    x: this._lienarAccX,
                    y: this._lienarAccY,
                    z: this._lienarAccZ,
                    timestamp: t._POSignalsUtils.Util.now(),
                  },
                  this._linearAccelerometerList,
                )),
                e.rotationRate &&
                  null != e.rotationRate.alpha &&
                  null != e.rotationRate.beta &&
                  null != e.rotationRate.gamma &&
                  ((this._rotX = e.rotationRate.alpha),
                  (this._rotY = e.rotationRate.beta),
                  (this._rotZ = e.rotationRate.gamma),
                  this.safeAddSensorSample(
                    {
                      x: this._rotX,
                      y: this._rotY,
                      z: this._rotZ,
                      timestamp: t._POSignalsUtils.Util.now(),
                    },
                    this._gyroscopeList,
                  ));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in accelerometer handler', e);
            }
          }),
          (e.prototype.orientationUpdate = function (e) {
            try {
              if (
                !this.delegate.collectBehavioralData() ||
                this.puaseSensorsCollectionIfNoActivity(t._POSignalsUtils.Util.now())
              )
                return;
              null != e.alpha &&
                null != e.beta &&
                null != e.gamma &&
                this.safeAddSensorSample(
                  { x: e.alpha, y: e.beta, z: e.gamma, timestamp: t._POSignalsUtils.Util.now() },
                  this._rotationList,
                );
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in orientation handler', e);
            }
          }),
          (e.prototype.safeAddSensorSample = function (t, e) {
            this.maxSensorSamples > e.length && e.push(t);
          }),
          e
        );
      })();
      t.Sensors = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          this._pointerParams = new t.PointerParams();
        }
        return (
          Object.defineProperty(e, 'instance', {
            get: function () {
              return e._instance || (e._instance = new e()), e._instance;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'pointerParams', {
            get: function () {
              return this._pointerParams;
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })();
      t.PointerConfig = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e;
      !(function (t) {
        (t[(t.Up = 1)] = 'Up'),
          (t[(t.Down = 2)] = 'Down'),
          (t[(t.Left = 3)] = 'Left'),
          (t[(t.Right = 4)] = 'Right');
      })(e || (e = {}));
      var n = (function () {
        function n(e, n) {
          (this.BEHAVIORAL_TYPE = 'gestures'),
            (this._isStarted = !1),
            (this._onGesture = new t.EventDispatcher()),
            (this.touchSnapshotsMap = new Map()),
            (this.snapshotStartTime = new Map()),
            (this.delegate = e),
            (this.sensors = n),
            (this.touchStartHandler = this.touchStart.bind(this)),
            (this.touchMoveHandler = this.touchMove.bind(this)),
            (this.touchEndHandler = this.touchEnd.bind(this)),
            (this.touchCancelHandler = this.touchCancel.bind(this));
        }
        return (
          Object.defineProperty(n.prototype, 'onGesture', {
            get: function () {
              return this._onGesture.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'SCROLL_MIN_DURATION', {
            get: function () {
              return 500;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'SWIPE_MAX_ANGLE', {
            get: function () {
              return 45;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'TAP_MOVEMENT_TRESHOLD', {
            get: function () {
              return 10;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (n.prototype.countEvents = function (t) {
            for (var e = { epochTs: Date.now() }, n = 0, i = t; n < i.length; n++) {
              var r = i[n];
              e[r.type] = (e[r.type] || 0) + 1;
            }
            return e;
          }),
          (n.prototype.clearTouchSnapshots = function (t) {
            this.touchSnapshotsMap.delete(t), this.snapshotStartTime.delete(t);
          }),
          (n.prototype.getTouchSnapshots = function (t) {
            var e;
            return (
              this.touchSnapshotsMap.has(t)
                ? (e = this.touchSnapshotsMap.get(t))
                : ((e = []), this.touchSnapshotsMap.set(t, e)),
              e
            );
          }),
          (n.prototype.isEmpty = function () {
            return 0 === this.touchSnapshotsMap.size;
          }),
          (n.prototype.start = function () {
            this._isStarted ||
              (this.delegate.addEventListener(document, 'touchstart', this.touchStartHandler),
              this.delegate.addEventListener(document, 'touchmove', this.touchMoveHandler),
              this.delegate.addEventListener(document, 'touchend', this.touchEndHandler),
              this.delegate.addEventListener(document, 'touchcancel', this.touchCancelHandler),
              (this._isStarted = !0));
          }),
          (n.prototype.stop = function () {
            this._isStarted &&
              (document.removeEventListener('touchstart', this.touchStartHandler),
              document.removeEventListener('touchmove', this.touchMoveHandler),
              document.removeEventListener('touchend', this.touchEndHandler),
              document.removeEventListener('touchcancel', this.touchCancelHandler),
              (this._isStarted = !1));
          }),
          (n.prototype.touchStart = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              if (t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type)) return;
              t._POSignalsUtils.Logger.debug('touchstart(' + e.changedTouches.length + ')', e),
                e.changedTouches.length > 0 && this.pushSnapshot(e);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in touchStart handler', e);
            }
          }),
          (n.prototype.touchMove = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              if (t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type)) return;
              t._POSignalsUtils.Logger.debug('touchmove(' + e.changedTouches.length + ')', e),
                e.changedTouches.length > 0 && this.pushSnapshot(e);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in touchMove handler', e);
            }
          }),
          (n.prototype.touchEnd = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
                return void this._onGesture.dispatch(this, null);
              if (t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type)) return;
              t._POSignalsUtils.Logger.debug('touchend(' + e.changedTouches.length + ')', e),
                this.gestureEnd(e);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in touchEnd handler', e);
            }
          }),
          (n.prototype.touchCancel = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
                return void this._onGesture.dispatch(this, null);
              if (t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type)) return;
              t._POSignalsUtils.Logger.debug('touchcancel(' + e.changedTouches.length + ')', e),
                this.gestureEnd(e);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in touchCancel handler', e);
            }
          }),
          (n.prototype.gestureEnd = function (e) {
            e.changedTouches.length > 0 && this.pushSnapshot(e);
            for (var n = 0; n < e.changedTouches.length; n++) {
              var i = e.changedTouches.item(n),
                r = this.getTouchSnapshots(i.identifier);
              r.length > 0 &&
                (this.isTap(r)
                  ? this.dispatchGesture(t.GestureType.Tap, i.identifier)
                  : this.dispatchGesture(this.calcGestureType(r), i.identifier));
            }
          }),
          (n.prototype.calcGestureType = function (n) {
            var i,
              r = this.getDirection(n);
            if (this.isFling(n))
              switch (r) {
                case e.Up:
                  i = t.GestureType.FlingUp;
                  break;
                case e.Right:
                  i = t.GestureType.FlingRight;
                  break;
                case e.Down:
                  i = t.GestureType.FlingDown;
                  break;
                case e.Left:
                  i = t.GestureType.FlingLeft;
              }
            else if (this.isScroll(n))
              switch (r) {
                case e.Up:
                  i = t.GestureType.ScrollUp;
                  break;
                case e.Right:
                  i = t.GestureType.ScrollRight;
                  break;
                case e.Down:
                  i = t.GestureType.ScrollDown;
                  break;
                case e.Left:
                  i = t.GestureType.ScrollLeft;
              }
            return i;
          }),
          (n.prototype.pushSnapshot = function (e) {
            if (e.changedTouches && e.changedTouches.length > 0)
              for (
                var n,
                  i = function () {
                    var i = e.changedTouches.item(o);
                    (n = i.radiusX && i.radiusY ? (i.radiusX + i.radiusY) / 2 : null),
                      r.snapshotStartTime.has(i.identifier) ||
                        r.snapshotStartTime.set(i.identifier, Date.now());
                    var a = r.getTouchSnapshots(i.identifier);
                    a.length < t.PointerConfig.instance.pointerParams.maxSnapshotsCount &&
                      a.push({
                        type: e.type,
                        eventTs: e.timeStamp,
                        epochTs: Date.now(),
                        relativeX: i.screenX,
                        relativeY: i.screenY,
                        x: i.clientX,
                        y: i.clientY,
                        pressure: i.force,
                        size: n,
                        xaccelerometer: r.sensors.accX,
                        yaccelerometer: r.sensors.accY,
                        zaccelerometer: r.sensors.accZ,
                        xlinearaccelerometer: r.sensors.lienarAccX,
                        ylinearaccelerometer: r.sensors.lienarAccY,
                        zlinearaccelerometer: r.sensors.lienarAccZ,
                        xrotation: r.sensors.rotX,
                        yrotation: r.sensors.rotY,
                        zrotation: r.sensors.rotZ,
                        radiusX: i.radiusX,
                        radiusY: i.radiusY,
                        rotationAngle: i.rotationAngle,
                        pageX: i.pageX,
                        pageY: i.pageY,
                        getX: function () {
                          return i.screenX;
                        },
                        getY: function () {
                          return i.screenY;
                        },
                      });
                  },
                  r = this,
                  o = 0;
                o < e.changedTouches.length;
                o++
              )
                i();
          }),
          (n.prototype.dispatchGesture = function (e, n) {
            var i = this.touchSnapshotsMap.get(n) || [],
              r = i.filter(function (t) {
                return 'touchmove' === t.type;
              });
            this._onGesture.dispatch(this, {
              epochTs: this.snapshotStartTime.get(n) || 0,
              counter: this.delegate.gesturesCounter,
              type: e,
              events: i,
              eventCounters: this.countEvents(i),
              duration: this.delegate.getInteractionDuration(i),
              additionalData: this.delegate.additionalData,
              uiControl: void 0,
              timeProximity: t._POSignalsUtils.Util.calculateMeanTimeDeltasBetweenEvents(r),
              meanEuclidean: t._POSignalsUtils.Util.calculateMeanDistanceBetweenPoints(r),
              reduction: {},
              quality: '',
            }),
              this.clearTouchSnapshots(n);
          }),
          (n.prototype.isTap = function (t) {
            var e = Math.abs(t[0].x - t[1].x),
              n = Math.abs(t[0].y - t[1].y);
            return (
              2 == t.length && e < this.TAP_MOVEMENT_TRESHOLD && n < this.TAP_MOVEMENT_TRESHOLD
            );
          }),
          (n.prototype.isFling = function (t) {
            return (
              t.length > 1 && t[t.length - 1].eventTs - t[0].eventTs < this.SCROLL_MIN_DURATION
            );
          }),
          (n.prototype.isScroll = function (t) {
            return (
              t.length > 1 && t[t.length - 1].eventTs - t[0].eventTs > this.SCROLL_MIN_DURATION
            );
          }),
          (n.prototype.getDirection = function (t) {
            var n = this.calcAngle(t[0], t[t.length - 1]);
            return n > 90 - this.SWIPE_MAX_ANGLE && n <= 90 + this.SWIPE_MAX_ANGLE
              ? e.Up
              : n > 180 - this.SWIPE_MAX_ANGLE && n <= 180 + this.SWIPE_MAX_ANGLE
                ? e.Right
                : n > 270 - this.SWIPE_MAX_ANGLE && n <= 270 + this.SWIPE_MAX_ANGLE
                  ? e.Down
                  : e.Left;
          }),
          (n.prototype.calcAngle = function (t, e) {
            return (180 * Math.atan2(e.y - t.y, e.x - t.x)) / Math.PI + 180;
          }),
          n
        );
      })();
      t.GestureEvents = n;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          (this.key = t), (this.cache = this.loadFromStorage());
        }
        return (
          (e.prototype.loadFromStorage = function () {
            var t = e.sessionStorage.getItem(this.key);
            return t || (t = JSON.stringify([])), JSON.parse(t);
          }),
          (e.prototype.get = function () {
            return this.cache;
          }),
          Object.defineProperty(e.prototype, 'length', {
            get: function () {
              return this.cache.length;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.push = function (t) {
            var n = this.cache.push(t);
            return e.sessionStorage.setItem(this.key, JSON.stringify(this.cache)), n;
          }),
          (e.prototype.set = function (t) {
            (this.cache = t), e.sessionStorage.setItem(this.key, JSON.stringify(this.cache));
          }),
          (e.prototype.remove = function (t) {
            this.cache.splice(t, 1), e.sessionStorage.setItem(this.key, JSON.stringify(this.cache));
          }),
          (e.prototype.concat = function (t) {
            return this.cache.concat(t);
          }),
          (e.prototype.clear = function () {
            (this.cache = []), e.sessionStorage.removeItem(this.key);
          }),
          (e.sessionStorage = t._POSignalsStorage.SessionStorage.instance.sessionStorage),
          e
        );
      })();
      t.StorageArray = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          (this.MAX_TAGS = 10),
            (this._tags = new t.StorageArray(t._POSignalsUtils.Constants.CAPTURED_TAGS));
        }
        return (
          Object.defineProperty(e, 'instance', {
            get: function () {
              return e._instance || (e._instance = new e()), e._instance;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'tags', {
            get: function () {
              return this._tags.get();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'disableTags', {
            set: function (t) {
              this._disableTags = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.setTag = function (e, n) {
            var i;
            if (!this._disableTags)
              if (t.PointerConfig.instance.pointerParams.enabled)
                if (e) {
                  var r = t.PointerConfig.instance.pointerParams.tagsBlacklistRegex;
                  if (
                    r &&
                    (e.match(r) ||
                      ('string' == typeof n && (null === n || void 0 === n ? void 0 : n.match(r))))
                  )
                    t._POSignalsUtils.Logger.info('Tag name or value is blacklisted');
                  else if (!(this._tags.length >= this.MAX_TAGS)) {
                    'number' != typeof n
                      ? this._tags.push({
                          name: e.trim(),
                          value:
                            (null === (i = null === n || void 0 === n ? void 0 : n.trim) ||
                            void 0 === i
                              ? void 0
                              : i.call(n)) || void 0,
                          epochTs: Date.now(),
                          timestamp: Date.now(),
                        })
                      : this._tags.push({
                          name: e.trim(),
                          value: n,
                          epochTs: Date.now(),
                          timestamp: Date.now(),
                        });
                    var o = n ? e + ':' + n : e;
                    t._POSignalsUtils.Logger.info('Add tag: ' + o);
                  }
                } else t._POSignalsUtils.Logger.info("Can't add tag, missing name");
              else t._POSignalsUtils.Logger.info("Can't add tag, PingOneSignals SDK is disabled");
          }),
          (e.prototype.reset = function () {
            this._tags.clear();
          }),
          e
        );
      })();
      t.Tags = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          this.client = t;
        }
        return (
          (e.prototype.calculateStrategyResult = function (e, n) {
            return {
              shouldCollect:
                this.client.getBufferSize() < t.PointerConfig.instance.pointerParams.bufferSize,
            };
          }),
          e
        );
      })();
      t.FirstInteractionsStrategy = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e;
      !(function (t) {
        (t[(t.RICH = 3)] = 'RICH'),
          (t[(t.CLICK = 2)] = 'CLICK'),
          (t[(t.MOVE = 1)] = 'MOVE'),
          (t[(t.POOR = 0)] = 'POOR');
      })(e || (e = {}));
      var n = (function () {
        function n(t) {
          (this.client = t),
            (this.MAX_INTERACTIONS_PER_TYPE = 7),
            (this.RICH_MOUSE_MOVES_AMOUNT = 8),
            (this.MIN_KEYBOARD_EVENTS = 6),
            (this.MIN_TOUCH_EVENTS = 20);
        }
        return (
          (n.prototype.isRichMouseInteraction = function (t) {
            return t.mousemove >= this.RICH_MOUSE_MOVES_AMOUNT && this.isClickInteraction(t);
          }),
          (n.prototype.isClickInteraction = function (t) {
            return t.mousedown > 0 && t.mouseup > 0;
          }),
          (n.prototype.isMoveInteraction = function (t) {
            return t.mousemove >= this.RICH_MOUSE_MOVES_AMOUNT;
          }),
          (n.prototype.classifyMouseInteraction = function (n) {
            var i = t._POSignalsUtils.Util.typesCounter(n.events);
            return this.isRichMouseInteraction(i)
              ? e.RICH
              : this.isClickInteraction(i)
                ? e.CLICK
                : this.isMoveInteraction(i)
                  ? e.MOVE
                  : e.POOR;
          }),
          (n.prototype.classifyKeyboardInteraction = function (t) {
            return t.events.length >= this.MIN_KEYBOARD_EVENTS ? e.RICH : e.POOR;
          }),
          (n.prototype.classifyTouchInteraction = function (t) {
            return t.events.length >= this.MIN_TOUCH_EVENTS ? e.RICH : e.POOR;
          }),
          (n.prototype.handleMouseInteraction = function (t, n) {
            var i = Date.now(),
              r = this.classifyMouseInteraction(t),
              o = this.getEnumKeyByValue(r);
            if (n.mouse.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
              return { shouldCollect: !0, quality: o };
            if (r === e.RICH) {
              var a = this.findOldestInteractionWithLowestQuality(n.mouse.interactions);
              if (-1 !== a)
                return { shouldCollect: !0, remove: { type: 'mouse', index: a }, quality: o };
            }
            var s = this.splitInteractionsByTime(n.mouse.interactions, i, 18e4),
              u = s[0],
              c = s[1];
            return u.length < 2
              ? this.handleOlderInteractions(c, o)
              : this.handleRecentInteractions(u, c, r, o);
          }),
          (n.prototype.splitInteractionsByTime = function (t, e, n) {
            return t.reduce(
              function (t, i) {
                return i.epochTs >= e - n ? t[0].push(i) : t[1].push(i), t;
              },
              [[], []],
            );
          }),
          (n.prototype.handleOlderInteractions = function (t, e) {
            var n = this.findOldestInteractionWithLowestQuality(t);
            return -1 !== n
              ? { shouldCollect: !0, remove: { type: 'mouse', index: n }, quality: e }
              : { shouldCollect: !1, quality: e };
          }),
          (n.prototype.handleRecentInteractions = function (t, n, i, r) {
            var o = this.findOldestInteractionWithLowestQuality(t, i);
            if (-1 !== o) {
              var a = t[o],
                s = this.client.getBehavioralData().mouse.interactions.indexOf(a),
                u = this.findOldestInteractionWithLowestQuality(
                  n,
                  e[this.client.getBehavioralData().mouse.interactions[s].quality],
                );
              return -1 !== u
                ? { shouldCollect: !0, remove: { type: 'mouse', index: u }, quality: r }
                : { shouldCollect: !0, remove: { type: 'mouse', index: s }, quality: r };
            }
            return { shouldCollect: !1, quality: r };
          }),
          (n.prototype.handleKeyboardInteraction = function (t, n) {
            var i = Date.now(),
              r = this.classifyKeyboardInteraction(t),
              o = this.getEnumKeyByValue(r);
            if (n.keyboard.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
              return { shouldCollect: !0, quality: o };
            if (r === e.RICH) {
              var a = this.findOldestInteractionWithLowestQuality(n.keyboard.interactions);
              if (-1 !== a)
                return { shouldCollect: !0, remove: { type: 'keyboard', index: a }, quality: o };
            }
            var s = this.splitInteractionsByTime(n.keyboard.interactions, i, 18e4),
              u = s[0],
              c = s[1];
            return u.length < 2
              ? this.handleOlderInteractions(c, o)
              : this.handleRecentInteractions(u, c, r, o);
          }),
          (n.prototype.handleTouchInteraction = function (t, n) {
            var i = Date.now(),
              r = this.classifyTouchInteraction(t),
              o = this.getEnumKeyByValue(r);
            if (n.touch.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
              return { shouldCollect: !0, quality: o };
            if (r === e.RICH) {
              var a = this.findOldestInteractionWithLowestQuality(n.touch.interactions);
              if (-1 !== a)
                return { shouldCollect: !0, remove: { type: 'touch', index: a }, quality: o };
            }
            var s = this.splitInteractionsByTime(n.touch.interactions, i, 18e4),
              u = s[0],
              c = s[1];
            return u.length < 2
              ? this.handleOlderInteractions(c, o)
              : this.handleRecentInteractions(u, c, r, o);
          }),
          (n.prototype.calculateStrategyResult = function (t, e) {
            var n = this.client.getBehavioralData();
            switch (e) {
              case 'mouse':
                return this.handleMouseInteraction(t, n);
              case 'keyboard':
                return this.handleKeyboardInteraction(t, n);
              case 'touch':
                return this.handleTouchInteraction(t, n);
              default:
                throw new Error('Unknown interaction type: ' + e);
            }
          }),
          (n.prototype.getEnumKeyByValue = function (t) {
            return Object.keys(e).find(function (n) {
              return e[n] === t;
            });
          }),
          (n.prototype.findOldestInteractionWithLowestQuality = function (t, n) {
            for (
              var i = void 0 !== n && null !== n ? n : e.RICH,
                r = -1,
                o = Number.MAX_SAFE_INTEGER,
                a = 0;
              a < t.length;
              a++
            ) {
              var s = e[t[a].quality];
              (s < i || (s === i && t[a].epochTs < o)) && ((i = s), (o = t[a].epochTs), (r = a));
            }
            return r;
          }),
          n
        );
      })();
      t.PriorityStrategy = n;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e;
      !(function (t) {
        (t[(t.FIRST_INTERACTIONS = 0)] = 'FIRST_INTERACTIONS'),
          (t[(t.PRIORITY_INTERACTIONS = 1)] = 'PRIORITY_INTERACTIONS');
      })((e = t.BufferingStrategyType || (t.BufferingStrategyType = {})));
      var n = (function () {
        function n() {}
        return (
          (n.createBufferingStrategy = function (n, i) {
            switch (n) {
              case e.FIRST_INTERACTIONS:
                return new t.FirstInteractionsStrategy(i);
              case e.PRIORITY_INTERACTIONS:
                return new t.PriorityStrategy(i);
            }
          }),
          n
        );
      })();
      t.StrategyFactory = n;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.sessionData = e),
            (this.instanceUUID = t._POSignalsUtils.Util.newGuid()),
            (this._isBehavioralDataPaused = !1),
            (this.started = !1),
            (this.initQueue = new t.PromiseQueue(1));
        }
        return (
          (e.instance = function () {
            if (!this._instance) {
              var e = t._POSignalsStorage.SessionStorage.instance;
              if (!document.body)
                throw (
                  (t._POSignalsUtils.Logger.error(
                    'PingOne Signals can be started only after DOM Ready!',
                  ),
                  new Error('PingOne Signals can be started only after DOM Ready!'))
                );
              this._instance = new t.Client(e, t.BufferingStrategyType.PRIORITY_INTERACTIONS);
            }
            return this._instance;
          }),
          (e.prototype.getData = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (t) {
                switch (t.label) {
                  case 0:
                    if (!this.startedPromise) throw new Error('SDK not initialized');
                    return [4, this.startedPromise];
                  case 1:
                    return t.sent(), [4, this.dataHandler.getData(Date.now())];
                  case 2:
                    return [2, t.sent()];
                }
              });
            });
          }),
          (e.prototype.addTag = function (e, n) {
            t.Tags.instance.setTag(e, n);
          }),
          (e.prototype.start = function (e) {
            var n, i, r, o;
            return (
              void 0 === e && (e = {}),
              __awaiter(this, void 0, void 0, function () {
                var a, s;
                return __generator(this, function (u) {
                  switch (u.label) {
                    case 0:
                      return null === (n = e.waitForWindowLoad) || void 0 === n || n
                        ? [4, this.loadEventPromise()]
                        : [3, 2];
                    case 1:
                      u.sent(), (u.label = 2);
                    case 2:
                      if (
                        ((this.initParams = e),
                        this.validateStartParams(e),
                        (this.clientVersion = t._POSignalsUtils.Constants.CLIENT_VERSION),
                        this.started)
                      )
                        return t._POSignalsUtils.Logger.warn('SDK already initialized'), [2];
                      (this.browserInfo = new t._POSignalsUtils.BrowserInfo()),
                        (t._POSignalsUtils.Logger.isLogEnabled =
                          !!e.consoleLogEnabled || !!e.devEnv),
                        t._POSignalsUtils.Logger.info('Starting Signals SDK...'),
                        (t.Tags.instance.disableTags = !!this.initParams.disableTags),
                        this.sessionData.setStorageConfig(e),
                        (a = t.PointerConfig.instance.pointerParams),
                        (s = {
                          additionalMediaCodecs: a.additionalMediaCodecs,
                          browserInfo: this.browserInfo,
                          fingerprintTimeoutMillis: a.fingerprintTimeoutMillis,
                          metadataBlackList: new Set(
                            a.metadataBlackList.concat(e.deviceAttributesToIgnore),
                          ),
                          propertyDescriptors: a.propertyDescriptors,
                          webRtcUrl: a.webRtcUrl,
                          dataPoints: a.metadataDataPoints,
                        }),
                        (this.localAgentAccessor = new t._POSignalsMetadata.LocalAgentAccessor(
                          null !== (i = e.agentPort) && void 0 !== i
                            ? i
                            : t._POSignalsUtils.Constants.PINGID_AGENT_DEFAULT_PORT,
                          null !== (r = e.agentTimeout) && void 0 !== r
                            ? r
                            : t._POSignalsUtils.Constants.PINGID_AGENT_DEFAULT_TIMEOUT,
                        )),
                        (this.metadata = new t._POSignalsMetadata.Metadata(
                          this.sessionData,
                          s,
                          e.externalIdentifiers,
                          this.localAgentAccessor,
                        )),
                        (this.dataHandler = new t.DataHandler(
                          this.clientVersion,
                          this.instanceUUID,
                          this.initParams,
                          this.metadata,
                          this,
                          this.sessionData,
                        )),
                        (null === (o = this.initParams.behavioralDataCollection) ||
                          void 0 === o ||
                          o) &&
                          this.refreshListening(),
                        e.lazyMetadata ||
                          (this.metadata.getDeviceAttributes(), this.metadata.getLocalAgentJwt()),
                        (this.started = !0);
                      try {
                        this.logInit(), this.addStartupTags();
                      } catch (e) {
                        t._POSignalsUtils.Logger.warn('SDK post init failed', e);
                      }
                      return [2];
                  }
                });
              })
            );
          }),
          (e.prototype.logInit = function () {
            var e, n;
            t._POSignalsUtils.Logger.info(
              'PingOne Signals initialized. ' +
                JSON.stringify(
                  {
                    timestamp: new Date().getTime(),
                    sdkVersion: this.clientVersion,
                    instanceUUID: this.instanceUUID,
                    tabUUID: this.sessionData.tabUUID,
                  },
                  null,
                  2,
                ),
            );
            var i = function () {
                return t._POSignalsUtils.Logger.info('Token Ready: ' + window._pingOneSignalsToken);
              },
              r = function () {
                t._POSignalsUtils.Logger.info('Signals token fetch is disabled'),
                  (window._pingOneSignalsToken = void 0);
              };
            'skipped' ===
            (null === (e = window._pingOneSignalsToken) || void 0 === e
              ? void 0
              : e.substring(0, 'skipped'.length))
              ? r()
              : 'uninitialized' !==
                  (null === (n = window._pingOneSignalsToken) || void 0 === n
                    ? void 0
                    : n.substring(0, 'uninitialized'.length)) && i(),
              document.addEventListener('PingOneSignalsTokenReadyEvent', i),
              document.addEventListener('PingOneSignalsTokenSkippedEvent', r);
          }),
          Object.defineProperty(e.prototype, 'isBehavioralDataPaused', {
            get: function () {
              return this._isBehavioralDataPaused;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.getSignalsToken = function () {
            var t = '';
            if (
              'string' == typeof window._pingOneSignalsToken &&
              0 <= window._pingOneSignalsToken.indexOf(':')
            ) {
              var e = window._pingOneSignalsToken.match(/t:(.*?)(&|$)/g);
              e && 0 < e.length && (t = e[0].replace(/&s*$/, '').replace(/t:/, ''));
            } else
              'string' == typeof window._pingOneSignalsToken && (t = window._pingOneSignalsToken);
            return t;
          }),
          (e.prototype.pauseBehavioralData = function () {
            this._isBehavioralDataPaused ||
              ((this._isBehavioralDataPaused = !0), this.addTag('SDK paused behaviorally'));
          }),
          (e.prototype.resumeBehavioralData = function () {
            this._isBehavioralDataPaused &&
              ((this._isBehavioralDataPaused = !1), this.addTag('SDK resumed behaviorally'));
          }),
          (e.prototype.startSignals = function (e) {
            return __awaiter(this, void 0, void 0, function () {
              var n,
                i,
                r = this;
              return __generator(this, function (o) {
                switch (o.label) {
                  case 0:
                    return (
                      o.trys.push([0, 2, , 3]),
                      (this.startedPromise = this.initQueue.add(function () {
                        return r.start(e);
                      })),
                      [4, this.startedPromise]
                    );
                  case 1:
                    return [2, o.sent()];
                  case 2:
                    throw (
                      ((n = o.sent()),
                      (i = {
                        id: t._POSignalsUtils.POErrorCodes.INITIALIZATION_ERROR,
                        message: n.message,
                        code: 'SDK initialization failed.',
                      }),
                      new Error(JSON.stringify(i)))
                    );
                  case 3:
                    return [2];
                }
              });
            });
          }),
          (e.prototype.validateStartParams = function (e) {
            if (!document.body)
              throw (
                (t._POSignalsUtils.Logger.error(
                  'PingOne Signals can be started only after DOM Ready!',
                ),
                new Error('PingOne Signals can be started only after DOM Ready!'))
              );
            e.externalIdentifiers = e.externalIdentifiers || {};
          }),
          (e.prototype.loadEventPromise = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (t) {
                return [
                  2,
                  new Promise(function (t) {
                    'complete' === document.readyState
                      ? t()
                      : window.addEventListener('load', function (e) {
                          t();
                        });
                  }),
                ];
              });
            });
          }),
          (e.prototype.addStartupTags = function () {
            this.addTag('SDK started'),
              document.referrer && this.addTag('referrer', document.referrer),
              this.addTag('location', window.location.href);
          }),
          e
        );
      })();
      t.ClientBase = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.BEHAVIORAL_TYPE = 'indirect'),
            (this._isStarted = !1),
            (this._onClipboardEvent = new t.EventDispatcher()),
            (this.delegate = e),
            (this.onClipboardEventHandler = this.onEvent.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onClipboardEvent', {
            get: function () {
              return this._onClipboardEvent.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.onEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              this._onClipboardEvent.dispatch(this, this.createClipboardEvent(e));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in clipboard handler', e);
            }
          }),
          (e.prototype.createClipboardEvent = function (e) {
            var n = t._POSignalsUtils.Util.getSrcElement(e);
            return {
              category: 'ClipboardEvent',
              type: e.type,
              eventTs: e.timeStamp,
              epochTs: new Date().getTime(),
              additionalData: {
                locationHref: location.href,
                stId: this.delegate.getElementsStID(n),
                elementId: null === n || void 0 === n ? void 0 : n.id,
              },
            };
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this._isStarted = !0),
              this.delegate.addEventListener(document, 'cut', this.onClipboardEventHandler),
              this.delegate.addEventListener(document, 'copy', this.onClipboardEventHandler),
              this.delegate.addEventListener(document, 'paste', this.onClipboardEventHandler));
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              ((this._isStarted = !1),
              document.removeEventListener('cut', this.onClipboardEventHandler),
              document.removeEventListener('copy', this.onClipboardEventHandler),
              document.removeEventListener('paste', this.onClipboardEventHandler));
          }),
          e
        );
      })();
      t.ClipboardEvents = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.BEHAVIORAL_TYPE = 'indirect'),
            (this._isStarted = !1),
            (this._onDragEvent = new t.EventDispatcher()),
            (this.delegate = e),
            (this.onDragEventHandler = this.onEvent.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onDragEvent', {
            get: function () {
              return this._onDragEvent.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.createDragEvent = function (t) {
            return {
              category: 'DragEvent',
              type: t.type,
              eventTs: t.timeStamp,
              epochTs: new Date().getTime(),
              additionalData: { locationHref: location.href },
            };
          }),
          (e.prototype.onEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              this._onDragEvent.dispatch(this, this.createDragEvent(e));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in drag handler', e);
            }
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this._isStarted = !0),
              this.delegate.addEventListener(document, 'dragstart', this.onDragEventHandler),
              this.delegate.addEventListener(document, 'dragexit', this.onDragEventHandler),
              this.delegate.addEventListener(document, 'drop', this.onDragEventHandler),
              this.delegate.addEventListener(document, 'dragend', this.onDragEventHandler));
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              ((this._isStarted = !1),
              document.removeEventListener('dragstart', this.onDragEventHandler),
              document.removeEventListener('dragexit', this.onDragEventHandler),
              document.removeEventListener('drop', this.onDragEventHandler),
              document.removeEventListener('dragend', this.onDragEventHandler));
          }),
          e
        );
      })();
      t.DragEvents = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.BEHAVIORAL_TYPE = 'indirect'),
            (this._isStarted = !1),
            (this._onFocusEvent = new t.EventDispatcher()),
            (this.delegate = e),
            (this.onFocusEventHandler = this.onEvent.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onFocusEvent', {
            get: function () {
              return this._onFocusEvent.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.getRelatedTarget = function (e) {
            if (!e.relatedTarget) return { type: '', stId: '', elementId: '' };
            var n = {
              type: t._POSignalsUtils.Util.getObjectType(e.relatedTarget),
              stId: '',
              elementId: '',
            };
            e.relatedTarget.id && (n.elementId = e.relatedTarget.id);
            try {
              var i = e.relatedTarget;
              n.stId = this.delegate.getElementsStID(i);
            } catch (t) {}
            return n;
          }),
          (e.prototype.createFocusEvent = function (e) {
            var n = t._POSignalsUtils.Util.getSrcElement(e),
              i = this.getRelatedTarget(e);
            return {
              category: 'FocusEvent',
              type: e.type,
              eventTs: e.timeStamp,
              epochTs: new Date().getTime(),
              additionalData: {
                locationHref: location.href,
                stId: this.delegate.getElementsStID(n),
                elementId: n ? n.id : '',
                relatedTarget: i,
              },
            };
          }),
          (e.prototype.onEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              this._onFocusEvent.dispatch(this, this.createFocusEvent(e));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in focus handler', e);
            }
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this._isStarted = !0),
              this.delegate.addEventListener(document, 'DOMFocusIn', this.onFocusEventHandler),
              this.delegate.addEventListener(document, 'DOMFocusOut', this.onFocusEventHandler),
              this.delegate.addEventListener(document, 'focus', this.onFocusEventHandler),
              this.delegate.addEventListener(document, 'focusin', this.onFocusEventHandler),
              this.delegate.addEventListener(document, 'focusout', this.onFocusEventHandler));
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              ((this._isStarted = !1),
              document.removeEventListener('DOMFocusIn', this.onFocusEventHandler),
              document.removeEventListener('DOMFocusOut', this.onFocusEventHandler),
              document.removeEventListener('focus', this.onFocusEventHandler),
              document.removeEventListener('focusin', this.onFocusEventHandler),
              document.removeEventListener('focusout', this.onFocusEventHandler));
          }),
          e
        );
      })();
      t.FocusEvents = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.BEHAVIORAL_TYPE = 'indirect'),
            (this._isStarted = !1),
            (this._onUIEvent = new t.EventDispatcher()),
            (this.delegate = e),
            (this.onUIEventHandler = this.onEvent.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onUIEvent', {
            get: function () {
              return this._onUIEvent.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.createUIEvent = function (t) {
            return {
              category: 'UIEvent',
              type: t.type,
              eventTs: t.timeStamp,
              epochTs: new Date().getTime(),
              additionalData: { locationHref: location.href },
            };
          }),
          (e.prototype.onEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              this._onUIEvent.dispatch(this, this.createUIEvent(e));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in UIEvent handler', e);
            }
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this._isStarted = !0),
              this.delegate.addEventListener(document, 'resize', this.onUIEventHandler),
              this.delegate.addEventListener(document, 'scroll', this.onUIEventHandler),
              this.delegate.addEventListener(document, 'select', this.onUIEventHandler));
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              ((this._isStarted = !1),
              document.removeEventListener('resize', this.onUIEventHandler),
              document.removeEventListener('scroll', this.onUIEventHandler),
              document.removeEventListener('select', this.onUIEventHandler));
          }),
          e
        );
      })();
      t.UIEvents = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.BEHAVIORAL_TYPE = 'indirect'),
            (this.visibilityChangeEventName = 'visibilitychange'),
            (this.hiddenProperty = 'hidden'),
            (this._isStarted = !1),
            (this._onGeneralEvent = new t.EventDispatcher()),
            (this.delegate = e),
            (this.onGeneralEventHandler = this.onEvent.bind(this)),
            (this.onLangChangeHandler = this.onLangChangeEvent.bind(this)),
            (this.onOrientationChangeHandler = this.onOrientationChangeEvent.bind(this)),
            (this.onVisibilityChangeHandler = this.onVisibilityChangeEvent.bind(this)),
            void 0 !== document.msHidden
              ? ((this.hiddenProperty = 'msHidden'),
                (this.visibilityChangeEventName = 'msvisibilitychange'))
              : void 0 !== document.webkitHidden &&
                ((this.hiddenProperty = 'webkitHidden'),
                (this.visibilityChangeEventName = 'webkitvisibilitychange'));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onGeneralEvent', {
            get: function () {
              return this._onGeneralEvent.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.onEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              this._onGeneralEvent.dispatch(this, this.createGeneralEvent(e));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in general event handler', e);
            }
          }),
          (e.prototype.onLangChangeEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              var n = this.createGeneralEvent(e);
              this._onGeneralEvent.dispatch(this, n);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in LangChange event handler', e);
            }
          }),
          (e.prototype.onOrientationChangeEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              var n = this.createGeneralEvent(e),
                i = t._POSignalsUtils.Util.getDeviceOrientation();
              (n.additionalData.deviceOrientation = i.orientation),
                (n.additionalData.deviceAngle = i.angle),
                this._onGeneralEvent.dispatch(this, n);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in OrientationChange event handler', e);
            }
          }),
          (e.prototype.onVisibilityChangeEvent = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
              var n = this.createGeneralEvent(e);
              (n.additionalData.hidden = !!document[this.hiddenProperty]),
                document.visibilityState &&
                  (n.additionalData.visibilityState = document.visibilityState.toString()),
                this._onGeneralEvent.dispatch(this, n);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in VisibilityChange event handler', e);
            }
          }),
          (e.prototype.createGeneralEvent = function (t) {
            return {
              category: 'Event',
              type: t.type,
              eventTs: t.timeStamp,
              epochTs: new Date().getTime(),
              additionalData: { locationHref: location.href },
            };
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this._isStarted = !0),
              this.delegate.addEventListener(
                document,
                this.visibilityChangeEventName,
                this.onVisibilityChangeHandler,
              ),
              this.delegate.addEventListener(document, 'change', this.onGeneralEventHandler),
              this.delegate.addEventListener(
                document,
                'fullscreenchange',
                this.onGeneralEventHandler,
              ),
              this.delegate.addEventListener(document, 'invalid', this.onGeneralEventHandler),
              this.delegate.addEventListener(window, 'languagechange', this.onLangChangeHandler),
              this.delegate.addEventListener(
                window,
                'orientationchange',
                this.onOrientationChangeHandler,
              ),
              this.delegate.addEventListener(document, 'seeked', this.onGeneralEventHandler),
              this.delegate.addEventListener(document, 'seeking', this.onGeneralEventHandler),
              this.delegate.addEventListener(document, 'selectstart', this.onGeneralEventHandler),
              this.delegate.addEventListener(
                document,
                'selectionchange',
                this.onGeneralEventHandler,
              ),
              this.delegate.addEventListener(document, 'submit', this.onGeneralEventHandler),
              this.delegate.addEventListener(document, 'volumechange', this.onGeneralEventHandler),
              this.delegate.addEventListener(document, 'reset', this.onGeneralEventHandler),
              this.delegate.addEventListener(document, 'textInput', this.onGeneralEventHandler));
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              ((this._isStarted = !1),
              document.removeEventListener(
                this.visibilityChangeEventName,
                this.onVisibilityChangeHandler,
              ),
              document.removeEventListener('change', this.onGeneralEventHandler),
              document.removeEventListener('fullscreenchange', this.onGeneralEventHandler),
              document.removeEventListener('invalid', this.onGeneralEventHandler),
              window.removeEventListener('languagechange', this.onLangChangeHandler),
              window.removeEventListener('orientationchange', this.onOrientationChangeHandler),
              document.removeEventListener('seeked', this.onGeneralEventHandler),
              document.removeEventListener('seeking', this.onGeneralEventHandler),
              document.removeEventListener('selectstart', this.onGeneralEventHandler),
              document.removeEventListener('selectionchange', this.onGeneralEventHandler),
              document.removeEventListener('submit', this.onGeneralEventHandler),
              document.removeEventListener('volumechange', this.onGeneralEventHandler),
              document.removeEventListener('reset', this.onGeneralEventHandler),
              document.removeEventListener('textInput', this.onGeneralEventHandler));
          }),
          e
        );
      })();
      t.GeneralEvents = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e) {
          (this.DEFAULT_INDIRECT_IDLE_INTERVAL = 1e3),
            (this.MAX_INDIRECT_EVENTS = 25),
            (this._onIndirect = new t.EventDispatcher()),
            (this.indirectEvents = []),
            (this.idleTimeInMillis = this.DEFAULT_INDIRECT_IDLE_INTERVAL),
            (this.lastIndirectEventTimestamp = 0),
            (this._isStarted = !1),
            (this.clipboardEvents = new t.ClipboardEvents(e)),
            this.clipboardEvents.onClipboardEvent.subscribe(this.handleEvent.bind(this)),
            (this.dragEvents = new t.DragEvents(e)),
            this.dragEvents.onDragEvent.subscribe(this.handleEvent.bind(this)),
            (this.focusEvents = new t.FocusEvents(e)),
            this.focusEvents.onFocusEvent.subscribe(this.handleEvent.bind(this)),
            (this.uiEvents = new t.UIEvents(e)),
            this.uiEvents.onUIEvent.subscribe(this.handleEvent.bind(this)),
            (this.generalEvents = new t.GeneralEvents(e)),
            this.generalEvents.onGeneralEvent.subscribe(this.handleEvent.bind(this)),
            (this.onTimeElapsedHandler = this.onTimeElapsed.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'onIndirect', {
            get: function () {
              return this._onIndirect.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.onTimeElapsed = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (t) {
                return (
                  this.indirectEvents.length > 0 &&
                    new Date().getTime() - this.lastIndirectEventTimestamp >=
                      this.idleTimeInMillis &&
                    this.dispatch(),
                  [2]
                );
              });
            });
          }),
          (e.prototype.handleEvent = function (t, e) {
            (this.lastIndirectEventTimestamp = new Date().getTime()), this.pushEvent(e);
          }),
          (e.prototype.pushEvent = function (t) {
            this.indirectEvents.push(t),
              this.indirectEvents.length >= this.MAX_INDIRECT_EVENTS && this.dispatch();
          }),
          (e.prototype.clearBuffer = function () {
            var t = { events: this.indirectEvents };
            return (this.indirectEvents = []), t;
          }),
          (e.prototype.dispatch = function () {
            try {
              clearInterval(this.updateIntervalHandle),
                this._onIndirect.dispatch(this, this.clearBuffer()),
                (this.updateIntervalHandle = setInterval(
                  this.onTimeElapsedHandler,
                  t.PointerConfig.instance.pointerParams.indirectIntervalMillis,
                ));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('Failed to dispatch indirect events', e);
            }
          }),
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.start = function () {
            this._isStarted ||
              ((this.updateIntervalHandle = setInterval(
                this.onTimeElapsedHandler,
                t.PointerConfig.instance.pointerParams.indirectIntervalMillis,
              )),
              this.clipboardEvents.start(),
              this.dragEvents.start(),
              this.focusEvents.start(),
              this.uiEvents.start(),
              this.generalEvents.start(),
              (this._isStarted = !0));
          }),
          (e.prototype.stop = function () {
            this._isStarted &&
              (this.clipboardEvents.stop(),
              this.dragEvents.stop(),
              this.focusEvents.stop(),
              this.uiEvents.stop(),
              this.generalEvents.stop(),
              clearInterval(this.updateIntervalHandle),
              (this.updateIntervalHandle = null),
              (this._isStarted = !1));
          }),
          (e.prototype.unsubscribe = function () {
            this.clipboardEvents.onClipboardEvent.unsubscribe(this.handleEvent.bind(this)),
              this.dragEvents.onDragEvent.unsubscribe(this.handleEvent.bind(this)),
              this.focusEvents.onFocusEvent.unsubscribe(this.handleEvent.bind(this)),
              this.uiEvents.onUIEvent.unsubscribe(this.handleEvent.bind(this)),
              this.generalEvents.onGeneralEvent.unsubscribe(this.handleEvent.bind(this));
          }),
          e
        );
      })();
      t.IndirectClient = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          (this.config = {}), (this._cacheHash = 0), (this.cache = new Map());
        }
        return (
          (e.prototype.refreshCssSelectors = function (e) {
            try {
              if (!e) return;
              var n = t._POSignalsUtils.Util.hashCode(JSON.stringify(e));
              if (this._cacheHash === n) return;
              (this.config = e), (this._cacheHash = n), (this.cache = new Map());
            } catch (e) {
              t._POSignalsUtils.Logger.warn('Failed to set css selectors', e);
            }
          }),
          (e.prototype.getIdentification = function (e, n) {
            if (null === this.cache.get(e)) return null;
            if (void 0 !== this.cache.get(e)) return this.cache.get(e);
            for (var i in this.config)
              try {
                if (!this.config.hasOwnProperty(i)) continue;
                var r = this.config[i] || [];
                t._POSignalsUtils.Util.isArray(r) || (r = [].concat(r));
                for (var o = 0, a = r; o < a.length; o++) {
                  var s = a[o];
                  if (t._POSignalsUtils.Util.isSelectorMatches(e, s, n))
                    return this.cache.set(e, i), i;
                }
              } catch (e) {
                t._POSignalsUtils.Logger.warn('Failed to find selector for ' + i, e);
              }
            return this.cache.set(e, null), null;
          }),
          Object.defineProperty(e.prototype, 'cacheHash', {
            get: function () {
              return this._cacheHash;
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })();
      t.ElementsIdentifications = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e, n) {
          (this.BEHAVIORAL_TYPE = 'eventKeyboard'),
            (this._isStarted = !1),
            (this._onInteraction = new t.EventDispatcher()),
            (this._onEnterPress = new t.EventDispatcher()),
            (this._onObfuscatedValue = new t.EventDispatcher()),
            (this.interactionsMap = new Map()),
            (this._fieldsIdentifications = new t.ElementsIdentifications()),
            (this.keyStrokeMap = new Map()),
            (this.delegate = e),
            (this.uiControlManager = n),
            (this.onKeyDownHandle = this.onKeyDown.bind(this)),
            (this.onKeyUpHandle = this.onKeyUp.bind(this)),
            (this.onFocusHandle = this.onFocus.bind(this)),
            (this.onBlurHandle = this.onBlur.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onInteraction', {
            get: function () {
              return this._onInteraction.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onEnterPress', {
            get: function () {
              return this._onEnterPress.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onObfuscatedValue', {
            get: function () {
              return this._onObfuscatedValue.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.refreshKeyboardCssSelectors = function (t) {
            this._fieldsIdentifications.refreshCssSelectors(t);
          }),
          Object.defineProperty(e.prototype, 'modifiersKeys', {
            get: function () {
              return [
                'Alt',
                'AltGraph',
                'CapsLock',
                'Control',
                'Fn',
                'FnLock',
                'Hyper',
                'Meta',
                'NumLock',
                'OS',
                'ScrollLock',
                'Shift',
                'Super',
                'Symbol',
                'SymbolLock',
              ];
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'specialKeys', {
            get: function () {
              return [
                'Tab',
                'Shift',
                'Backspace',
                'Enter',
                'CapsLock',
                'Meta',
                'Delete',
                'Alt',
                'ArrowDown',
                'ArrowUp',
                'Control',
                'ArrowLeft',
                'End',
                'Unidentified',
                'Home',
                'ArrowRight',
                'Insert',
                'Pause',
                'PageDown',
                'PageUp',
                'F1',
                'F2',
                'F3',
                'F4',
                'F5',
                'F6',
                'F7',
                'F8',
                'F9',
                'F10',
                'F11',
                'F12',
                'AltGraph',
                'Escape',
              ];
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.countEvent = function (t, e) {
            e && (e.eventCounters[t] = (e.eventCounters[t] || 0) + 1);
          }),
          (e.prototype.clearBuffer = function () {
            var e = t._POSignalsUtils.Util.getValuesOfMap(this.interactionsMap);
            return this.interactionsMap.clear(), e;
          }),
          (e.prototype.start = function () {
            this._isStarted
              ? t._POSignalsUtils.Logger.debug('Desktop Keyboard events already listening')
              : (this.delegate.addEventListener(document, 'keydown', this.onKeyDownHandle),
                this.delegate.addEventListener(document, 'keyup', this.onKeyUpHandle),
                this.delegate.addEventListener(document, 'focus', this.onFocusHandle, !0),
                this.delegate.addEventListener(document, 'blur', this.onBlurHandle, !0),
                (this._isStarted = !0),
                t._POSignalsUtils.Logger.debug('Desktop Keyboard events start listening...'));
          }),
          (e.prototype.stop = function () {
            this._isStarted
              ? (document.removeEventListener('keydown', this.onKeyDownHandle),
                document.removeEventListener('keyup', this.onKeyUpHandle),
                document.removeEventListener('focus', this.onFocusHandle, !0),
                document.removeEventListener('blur', this.onBlurHandle, !0),
                (this._isStarted = !1),
                t._POSignalsUtils.Logger.debug('Desktop Keyboard events stop listening...'))
              : t._POSignalsUtils.Logger.debug('Desktop Keyboard events already stopped');
          }),
          (e.prototype.getInteractionFromElement = function (e) {
            var n,
              i = null,
              r = null,
              o = t._POSignalsUtils.Util.getSrcElement(e);
            if (
              o &&
              o instanceof HTMLInputElement &&
              !t._POSignalsUtils.Util.isClickableInput(o) &&
              t._POSignalsUtils.Util.isFunction(o.getAttribute) &&
              !(null === (n = o.hasAttribute) || void 0 === n
                ? void 0
                : n.call(o, 'data-st-ignore')) &&
              !t._POSignalsUtils.Util.anySelectorMatches(
                o,
                t.PointerConfig.instance.pointerParams.keyboardCssSelectorsBlacklist,
                0,
              )
            ) {
              r = this.delegate.getElementsStID(o);
              for (
                var a = t.PointerConfig.instance.pointerParams.keyboardIdentifierAttributes, s = 0;
                s < a.length && !r;
                s++
              )
                r = o.getAttribute(a[s]);
              r &&
                !t.PointerConfig.instance.pointerParams.keyboardFieldBlackList.has(r) &&
                ((i = this.interactionsMap.get(o)) ||
                  ((i = {
                    epochTs: Date.now(),
                    stId: r,
                    elementId: t._POSignalsUtils.Util.getAttribute(o, 'id'),
                    name: t._POSignalsUtils.Util.getAttribute(o, 'name'),
                    type: t._POSignalsUtils.Util.getAttribute(o, 'type'),
                    events: [],
                    counter: this.delegate.keyboardCounter,
                    eventCounters: { epochTs: Date.now() },
                    duration: 0,
                    numOfDeletions: 0,
                    additionalData: this.delegate.additionalData,
                    quality: '',
                  }),
                  this.interactionsMap.set(o, i)));
            }
            return i;
          }),
          (e.prototype.getKeyCode = function (e) {
            return e.keyCode
              ? e.keyCode
              : e.which
                ? e.which
                : e.code
                  ? t._POSignalsUtils.Util.hashCode(e.code)
                  : t._POSignalsUtils.Util.hashCode(e.key) + (e.location || 0);
          }),
          (e.prototype.getKeyboardEvent = function (t) {
            return t || window.event;
          }),
          (e.prototype.getKeystrokeId = function (e, n) {
            var i,
              r = this.getKeyCode(e);
            return (
              'keyup' === n &&
                (this.keyStrokeMap.has(r)
                  ? ((i = this.keyStrokeMap.get(r)), this.keyStrokeMap.delete(r))
                  : (i = t._POSignalsUtils.Util.newGuid())),
              'keydown' === n &&
                (this.keyStrokeMap.has(r) && e.repeat
                  ? (i = this.keyStrokeMap.get(r))
                  : ((i = t._POSignalsUtils.Util.newGuid()), this.keyStrokeMap.set(r, i))),
              i
            );
          }),
          (e.prototype.createKeyboardInteractionEvent = function (e, n) {
            var i = t._POSignalsUtils.Util.getSrcElement(n),
              r = i.value ? i.value.toString().length : 0;
            return {
              type: e,
              eventTs: n.timeStamp,
              epochTs: Date.now(),
              selectionStart: t._POSignalsUtils.Util.getElementSelectionStart(i),
              selectionEnd: t._POSignalsUtils.Util.getElementSelectionEnd(i),
              key: n.key,
              keystrokeId: null,
              currentLength: r,
            };
          }),
          (e.prototype.enrichKeyboardEvent = function (e, n) {
            (this.modifiersKeys.indexOf(e.key) >= 0 || this.specialKeys.indexOf(e.key) >= 0) &&
              (n.key = e.key),
              (n.keystrokeId = this.getKeystrokeId(e, n.type));
            var i = t._POSignalsUtils.Util.getSrcElement(e);
            n.currentLength = String(i.value).length;
          }),
          (e.prototype.onFocus = function (e) {
            var n, i;
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
                return void this._onInteraction.dispatch(this, null);
              e = this.getKeyboardEvent(e);
              var r = this.getInteractionFromElement(e);
              if (
                (this.countEvent(e.type, r),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              if (r) {
                var o = this.createKeyboardInteractionEvent('focus', e);
                r.events.push(o);
                var a = this.uiControlManager.createUIControlData(e);
                a &&
                  ((r.uiControl = { uiElement: a.uiElement, enrichedData: a.enrichedData }),
                  (null === (i = null === (n = a.uiElement) || void 0 === n ? void 0 : n.id) ||
                  void 0 === i
                    ? void 0
                    : i.length) > 0 &&
                    t._POSignalsUtils.Logger.info(
                      "Typing in element with id '" + a.uiElement.id + "'",
                    ));
              }
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in keyboard focus handler', e);
            }
          }),
          (e.prototype.onKeyUp = function (e) {
            try {
              if (
                ((13 !== (e = this.getKeyboardEvent(e)).keyCode && 13 !== e.which) ||
                  this._onEnterPress.dispatch(this, t._POSignalsUtils.Util.getSrcElement(e)),
                !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
              )
                return void this._onInteraction.dispatch(this, null);
              var n = this.getInteractionFromElement(e);
              if (
                (this.countEvent(e.type, n),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              if (n) {
                var i = this.createKeyboardInteractionEvent('keyup', e);
                this.enrichKeyboardEvent(e, i), n.events.push(i);
              } else this.keyStrokeMap.delete(this.getKeyCode(e));
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in keyUp handler', e);
            }
          }),
          (e.prototype.isEmpty = function () {
            return 0 === this.interactionsMap.size;
          }),
          (e.prototype.onKeyDown = function (e) {
            try {
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
                return void this._onInteraction.dispatch(this, null);
              e = this.getKeyboardEvent(e);
              var n = this.getInteractionFromElement(e);
              if (
                (this.countEvent(e.type, n),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              if (n) {
                var i = this.createKeyboardInteractionEvent('keydown', e);
                this.enrichKeyboardEvent(e, i), n.events.push(i);
              }
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in keyDown handler', e);
            }
          }),
          (e.prototype.onBlur = function (e) {
            try {
              e = this.getKeyboardEvent(e);
              var n = this.getInteractionFromElement(e);
              if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
                return void this._onInteraction.dispatch(this, null);
              if (
                (this.countEvent(e.type, n),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              if (n) {
                var i = this.createKeyboardInteractionEvent('blur', e);
                n.events.push(i),
                  (n.duration = this.delegate.getInteractionDuration(n.events)),
                  (n.numOfDeletions = this.calculateNumOfDeletions(n.events));
                var r = t._POSignalsUtils.Util.getSrcElement(e);
                this.interactionsMap.delete(r), this._onInteraction.dispatch(this, n);
              }
            } catch (e) {
              t._POSignalsUtils.Logger.warn('error in blur handler', e);
            }
          }),
          (e.prototype.calculateNumOfDeletions = function (t) {
            if (!(null === t || void 0 === t ? void 0 : t[0])) return 0;
            for (var e = 0, n = t[0].currentLength, i = 1; i < t.length; i++)
              t[i].currentLength < n && e++, (n = t[i].currentLength);
            return e;
          }),
          Object.defineProperty(e.prototype, 'fieldsIdentifications', {
            get: function () {
              return this._fieldsIdentifications;
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })();
      t.Keyboard = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e, n) {
          var i,
            r = this,
            o = t.PointerConfig.instance.pointerParams.uiModelingElementFilters,
            a = t._POSignalsUtils.Util.getAttribute,
            s = null === (i = e.getBoundingClientRect) || void 0 === i ? void 0 : i.call(e);
          (this._htmlElement = e),
            (this._data = {
              location: this.getUIElementAttribute(o.location, function () {
                return window.location.href;
              }),
              id: this.getUIElementAttribute(o.id, function () {
                return a(e, 'id');
              }),
              aria_label: this.getUIElementAttribute(o.aria_label, function () {
                return a(e, 'aria-label');
              }),
              data_st_field: this.getUIElementAttribute(o.data_st_field, function () {
                return n.getElementsStID(e);
              }),
              data_st_tag: this.getUIElementAttribute(o.data_st_tag, function () {
                return a(e, 'data-st-tag');
              }),
              data_selenium: this.getUIElementAttribute(o.data_selenium, function () {
                return a(e, 'data-selenium');
              }),
              data_selenium_id: this.getUIElementAttribute(o.data_selenium_id, function () {
                return a(e, 'data-selenium-id');
              }),
              data_testid: this.getUIElementAttribute(o.data_testid, function () {
                return a(e, 'data-testid');
              }),
              data_test_id: this.getUIElementAttribute(o.data_test_id, function () {
                return a(e, 'data-test-id');
              }),
              data_qa_id: this.getUIElementAttribute(o.data_qa_id, function () {
                return a(e, 'data-qa-id');
              }),
              data_id: this.getUIElementAttribute(o.data_id, function () {
                return a(e, 'data-id');
              }),
              name: this.getUIElementAttribute(o.name, function () {
                return a(e, 'name');
              }),
              placeholder: this.getUIElementAttribute(o.placeholder, function () {
                return a(e, 'placeholder');
              }),
              role: this.getUIElementAttribute(o.role, function () {
                return a(e, 'role');
              }),
              type: this.getUIElementAttribute(o.type, function () {
                return a(e, 'type');
              }),
              nodeTypeInt: this.getUIElementAttribute(o.nodeTypeInt, function () {
                return e.nodeType;
              }),
              nodeName: this.getUIElementAttribute(o.nodeName, function () {
                return e.nodeName;
              }),
              cursorType: this.getUIElementAttribute(o.cursorType, function () {
                return window.getComputedStyle(e).cursor;
              }),
              text: this.getUIElementAttribute(o.text, function () {
                return r.getElementText(e);
              }),
              textLength: this.getUIElementAttribute(o.textLength, function () {
                var t;
                return (
                  (null === (t = r.getElementText(e)) || void 0 === t ? void 0 : t.length) || null
                );
              }),
              bottom: this.getUIElementAttribute(o.bottom, function () {
                return null === s || void 0 === s ? void 0 : s.bottom;
              }),
              height: this.getUIElementAttribute(o.height, function () {
                return null === s || void 0 === s ? void 0 : s.height;
              }),
              left: this.getUIElementAttribute(o.left, function () {
                return null === s || void 0 === s ? void 0 : s.left;
              }),
              right: this.getUIElementAttribute(o.right, function () {
                return null === s || void 0 === s ? void 0 : s.right;
              }),
              top: this.getUIElementAttribute(o.top, function () {
                return null === s || void 0 === s ? void 0 : s.top;
              }),
              width: this.getUIElementAttribute(o.width, function () {
                return null === s || void 0 === s ? void 0 : s.width;
              }),
              x: this.getUIElementAttribute(o.x, function () {
                return null === s || void 0 === s ? void 0 : s.x;
              }),
              y: this.getUIElementAttribute(o.y, function () {
                return null === s || void 0 === s ? void 0 : s.y;
              }),
            }),
            (this._data.elementId = this.getStrongestElementID());
        }
        return (
          Object.defineProperty(e.prototype, 'data', {
            get: function () {
              return t._POSignalsUtils.Util.filterReduce(this._data, function (t) {
                return null != t && '' !== t;
              });
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'htmlElement', {
            get: function () {
              return this._htmlElement;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.getUIElementAttribute = function (e, n) {
            var i;
            try {
              if (
                null === (i = null === e || void 0 === e ? void 0 : e.enabled) ||
                void 0 === i ||
                i
              ) {
                var r = n();
                return (
                  'string' == typeof r &&
                    ('number' == typeof (null === e || void 0 === e ? void 0 : e.maxLength) &&
                      r.length > e.maxLength &&
                      (r = r.substring(0, e.maxLength)),
                    (null === e || void 0 === e ? void 0 : e.filterRegex) &&
                      (r = r.replace(new RegExp(e.filterRegex, 'g'), '*'))),
                  r
                );
              }
            } catch (e) {
              t._POSignalsUtils.Logger.warn('Failed to add ui element attribute', e);
            }
            return null;
          }),
          (e.prototype.getStrongestElementID = function () {
            return (
              this._data.data_st_field ||
              this._data.data_selenium_id ||
              this._data.data_selenium ||
              this._data.data_testid ||
              this._data.data_test_id ||
              this._data.data_qa_id ||
              this._data.data_id ||
              this._data.id ||
              ''
            );
          }),
          (e.prototype.getElementText = function (e) {
            return e instanceof HTMLInputElement && !t._POSignalsUtils.Util.isClickableInput(e)
              ? null
              : t._POSignalsUtils.Util.getElementText(e);
          }),
          (e.prototype.equals = function (t) {
            return (
              !!t &&
              !(t.location && location.href.indexOf(t.location) < 0) &&
              (!t.elementId || t.elementId === this._data.elementId) &&
              (!t.id || t.id === this._data.id) &&
              (!t.aria_label || t.aria_label === this._data.aria_label) &&
              (!t.data_st_field || t.data_st_field === this._data.data_st_field) &&
              (!t.data_st_tag || t.data_st_tag === this._data.data_st_tag) &&
              (!t.data_selenium || t.data_selenium === this._data.data_selenium) &&
              (!t.data_selenium_id || t.data_selenium_id === this._data.data_selenium_id) &&
              (!t.data_testid || t.data_testid === this._data.data_testid) &&
              (!t.data_test_id || t.data_test_id === this._data.data_test_id) &&
              (!t.data_qa_id || t.data_qa_id === this._data.data_qa_id) &&
              (!t.data_id || t.data_id === this._data.data_id) &&
              (!t.name || t.name === this._data.name) &&
              (!t.placeholder || t.placeholder === this._data.placeholder) &&
              (!t.role || t.role === this._data.role) &&
              (!t.type || t.type === this._data.type) &&
              (!t.nodeTypeInt || t.nodeTypeInt === this._data.nodeTypeInt) &&
              (!t.nodeName || t.nodeName === this._data.nodeName) &&
              (!t.cursorType || t.cursorType === this._data.cursorType) &&
              (!t.text || t.text === this._data.text) &&
              (!t.textLength || t.textLength === this._data.textLength) &&
              (!t.bottom || t.bottom === this._data.bottom) &&
              (!t.height || t.height === this._data.height) &&
              (!t.left || t.left === this._data.left) &&
              (!t.right || t.right === this._data.right) &&
              (!t.top || t.top === this._data.top) &&
              (!t.width || t.width === this._data.width) &&
              (!t.x || t.x === this._data.x) &&
              (!t.y || t.y === this._data.y)
            );
          }),
          (e.createCssSelector = function (t) {
            var e = '';
            return (
              (null === t || void 0 === t ? void 0 : t.nodeName) && (e += t.nodeName.toLowerCase()),
              (null === t || void 0 === t ? void 0 : t.id) && (e += '[id="' + t.id + '"]'),
              (null === t || void 0 === t ? void 0 : t.aria_label) &&
                (e += '[aria-label="' + t.aria_label + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_st_field) &&
                (e += '[data-st-field="' + t.data_st_field + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_st_tag) &&
                (e += '[data-st-tag="' + t.data_st_tag + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_selenium) &&
                (e += '[data-selenium="' + t.data_selenium + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_selenium_id) &&
                (e += '[data-selenium-id="' + t.data_selenium_id + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_testid) &&
                (e += '[data-testid="' + t.data_testid + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_test_id) &&
                (e += '[data-test-id="' + t.data_test_id + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_qa_id) &&
                (e += '[data-qa-id="' + t.data_qa_id + '"]'),
              (null === t || void 0 === t ? void 0 : t.data_id) &&
                (e += '[data-id="' + t.data_id + '"]'),
              (null === t || void 0 === t ? void 0 : t.name) && (e += '[name="' + t.name + '"]'),
              (null === t || void 0 === t ? void 0 : t.placeholder) &&
                (e += '[placeholder="' + t.placeholder + '"]'),
              (null === t || void 0 === t ? void 0 : t.role) && (e += '[role="' + t.role + '"]'),
              (null === t || void 0 === t ? void 0 : t.type) && (e += '[type="' + t.type + '"]'),
              e
            );
          }),
          e
        );
      })();
      t.UiElement = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          this._clientDelegate = t;
        }
        return (
          (e.prototype.createUIControlData = function (e) {
            var n = t._POSignalsUtils.Util.getSrcElement(e);
            if (!n) return null;
            var i = t.PointerConfig.instance.pointerParams.uiModelingBlacklistRegex;
            if (i && window.location.href.match(i))
              return (
                t._POSignalsUtils.Logger.debug('ui control data is disabled for this url'), null
              );
            var r = new t.UiElement(n, this._clientDelegate);
            return this.findMatchingUiControl(r) || { uiElement: r.data };
          }),
          (e.prototype.findMatchingUiControl = function (e, n) {
            void 0 === n && (n = 0);
            try {
              var i = t.PointerConfig.instance.pointerParams.uiControlsConfig;
              if (0 === i.length) return null;
              if (n > t.PointerConfig.instance.pointerParams.uiModelingMaxMatchingParents)
                return null;
              for (var r = !1, o = 0, a = i; o < a.length; o++) {
                var s = a[o];
                if ((s.tagConfig || s.enrichedData) && ((r = !0), e.equals(s.uiElement)))
                  return {
                    uiElement: e.data,
                    enrichedData: s.enrichedData,
                    tagConfig: s.tagConfig,
                  };
              }
              if (!r) return null;
              var u = e.htmlElement.parentElement;
              if ((null === u || void 0 === u ? void 0 : u.nodeType) === Node.ELEMENT_NODE) {
                var c = new t.UiElement(u, this._clientDelegate);
                return this.findMatchingUiControl(c, n + 1);
              }
            } catch (e) {
              t._POSignalsUtils.Logger.warn('failed to find matching ui control', e);
            }
            return null;
          }),
          (e.prototype.convertToTagValueConfig = function (e) {
            var n;
            return {
              context:
                null === (n = null === e || void 0 === e ? void 0 : e.uiElement) || void 0 === n
                  ? void 0
                  : n.location,
              valueSelector: t.UiElement.createCssSelector(
                null === e || void 0 === e ? void 0 : e.uiElement,
              ),
              operation: null === e || void 0 === e ? void 0 : e.operation,
              valueMandatory: null === e || void 0 === e ? void 0 : e.valueMandatory,
            };
          }),
          e
        );
      })();
      t.UIControlManager = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(e, n) {
          (this.BEHAVIORAL_TYPE = 'mouse'),
            (this._isStarted = !1),
            (this._onInteraction = new t.EventDispatcher()),
            (this._onClickEvent = new t.EventDispatcher()),
            (this.lastMouseInteractionTimestamp = null),
            (this.mouseEventsCounter = 0),
            (this.eventCounters = { epochTs: Date.now() }),
            (this.delegate = e),
            (this.uiControlManager = n),
            (this.wheelOptions = !!t._POSignalsUtils.Util.isPassiveSupported() && { passive: !0 }),
            (this.onPointerHandle = this.onPointerEvent.bind(this)),
            (this.onClickHandle = this.onClick.bind(this)),
            (this.onDblclickHandle = this.onMouseClickEvent.bind(this)),
            (this.onMousedownHandle = this.onMouseClickEvent.bind(this)),
            (this.onMousemoveHandle = this.onMouseEvent.bind(this)),
            (this.onMouseoutHandle = this.onMouseout.bind(this)),
            (this.onMouseoverHandle = this.onMouseEvent.bind(this)),
            (this.onMouseupHandle = this.onMouseClickEvent.bind(this)),
            (this.onWheelHandle = this.onMouseEvent.bind(this)),
            (this.interactionUpdateHandle = this.interactionUpdate.bind(this));
        }
        return (
          Object.defineProperty(e.prototype, 'isStarted', {
            get: function () {
              return this._isStarted;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onInteraction', {
            get: function () {
              return this._onInteraction.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'onClickEvent', {
            get: function () {
              return this._onClickEvent.asEvent();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.countEvent = function (t) {
            this.eventCounters[t] = (this.eventCounters[t] || 0) + 1;
          }),
          (e.prototype.interactionUpdate = function () {
            this.lastMouseInteraction
              ? Date.now() - this.lastMouseInteractionTimestamp >=
                  t.PointerConfig.instance.pointerParams.mouseIdleTimeoutMillis && this.dispatch()
              : !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) &&
                Date.now() - this.lastMouseInteractionTimestamp <=
                  t.PointerConfig.instance.pointerParams.mouseIntervalMillis &&
                this.dispatch();
          }),
          (e.prototype.enrichLastInteraction = function () {
            var e;
            if (this.lastMouseInteraction) {
              (this.lastMouseInteraction.eventCounters = this.eventCounters),
                (this.lastMouseInteraction.duration = this.delegate.getInteractionDuration(
                  this.lastMouseInteraction.events,
                ));
              var n =
                null === (e = this.lastMouseInteraction.events) || void 0 === e
                  ? void 0
                  : e.filter(function (t) {
                      return 'mousemove' === t.type;
                    });
              (this.lastMouseInteraction.timeProximity =
                t._POSignalsUtils.Util.calculateMeanTimeDeltasBetweenEvents(n)),
                (this.lastMouseInteraction.meanEuclidean =
                  t._POSignalsUtils.Util.calculateMeanDistanceBetweenPoints(n));
            }
          }),
          (e.prototype.dispatch = function () {
            try {
              this.enrichLastInteraction(),
                this._onInteraction.dispatch(this, this.lastMouseInteraction),
                (this.eventCounters = { epochTs: Date.now() }),
                (this.lastMouseInteraction = null),
                (this.mouseEventsCounter = 0);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('Failed to dispatch mouse events', e);
            }
          }),
          (e.prototype.updateInteraction = function (e, n) {
            this.lastMouseInteraction ||
              (this.lastMouseInteraction = {
                epochTs: Date.now(),
                events: [],
                counter: this.delegate.mouseCounter,
                additionalData: this.delegate.additionalData,
                eventCounters: { epochTs: Date.now() },
                duration: 0,
                timeProximity: 0,
                uiControl: void 0,
                meanEuclidean: 0,
                reduction: {},
                quality: '',
              }),
              this.lastMouseInteraction.events.push(e),
              this.mouseEventsCounter++,
              n &&
                ((this.lastMouseInteraction.uiControl = {
                  uiElement: n.uiElement,
                  enrichedData: n.enrichedData,
                }),
                this.delegate.addUiControlTags(n.tagConfig)),
              this.mouseEventsCounter >= t.PointerConfig.instance.pointerParams.maxMouseEvents &&
                this.dispatch();
          }),
          (e.prototype.start = function () {
            this._isStarted
              ? t._POSignalsUtils.Logger.debug('Desktop Mouse events already listening')
              : (this.delegate.addEventListener(document, 'click', this.onClickHandle, !0),
                this.delegate.addEventListener(document, 'dblclick', this.onDblclickHandle),
                this.delegate.addEventListener(document, 'mousedown', this.onMousedownHandle),
                this.delegate.addEventListener(document, 'mousemove', this.onMousemoveHandle),
                this.delegate.addEventListener(document, 'mouseout', this.onMouseoutHandle),
                this.delegate.addEventListener(document, 'mouseover', this.onMouseoverHandle),
                this.delegate.addEventListener(document, 'mouseup', this.onMouseupHandle),
                this.delegate.addEventListener(
                  document,
                  'wheel',
                  this.onWheelHandle,
                  this.wheelOptions,
                ),
                this.delegate.addEventListener(document, 'pointerover', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointerenter', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointerdown', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointermove', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointerup', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointercancel', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointerout', this.onPointerHandle),
                this.delegate.addEventListener(document, 'pointerleave', this.onPointerHandle),
                (this.updateIntervalHandle = setInterval(
                  this.interactionUpdateHandle,
                  t.PointerConfig.instance.pointerParams.mouseIntervalMillis,
                )),
                (this._isStarted = !0),
                t._POSignalsUtils.Logger.debug('Desktop Mouse events start listening...'));
          }),
          (e.prototype.stop = function () {
            this._isStarted
              ? (document.removeEventListener('click', this.onClickHandle, !0),
                document.removeEventListener('dblclick', this.onDblclickHandle),
                document.removeEventListener('mousedown', this.onMousedownHandle),
                document.removeEventListener('mousemove', this.onMousemoveHandle),
                document.removeEventListener('mouseout', this.onMouseoutHandle),
                document.removeEventListener('mouseover', this.onMouseoverHandle),
                document.removeEventListener('mouseup', this.onMouseupHandle),
                document.removeEventListener('wheel', this.onWheelHandle, this.wheelOptions),
                document.removeEventListener('pointerover', this.onPointerHandle),
                document.removeEventListener('pointerenter', this.onPointerHandle),
                document.removeEventListener('pointerdown', this.onPointerHandle),
                document.removeEventListener('pointermove', this.onPointerHandle),
                document.removeEventListener('pointerup', this.onPointerHandle),
                document.removeEventListener('pointercancel', this.onPointerHandle),
                document.removeEventListener('pointerout', this.onPointerHandle),
                document.removeEventListener('pointerleave', this.onPointerHandle),
                clearInterval(this.updateIntervalHandle),
                (this.updateIntervalHandle = null),
                (this._isStarted = !1),
                t._POSignalsUtils.Logger.debug('Desktop Mouse events stop listening...'))
              : t._POSignalsUtils.Logger.debug('Desktop Mouse events already stopped');
          }),
          (e.prototype.onClick = function (e) {
            var n, i;
            try {
              this.lastMouseInteractionTimestamp = Date.now();
              var r = t._POSignalsUtils.Util.getSrcElement(e);
              if (
                (this._onClickEvent.dispatch(this, r),
                !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
              )
                return;
              if (
                (this.countEvent(e.type),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              var o = this.uiControlManager.createUIControlData(e);
              this.updateInteraction(this.createMouseClickEvent(e.type, e), o),
                this.dispatch(),
                (null ===
                  (i =
                    null === (n = null === o || void 0 === o ? void 0 : o.uiElement) || void 0 === n
                      ? void 0
                      : n.id) || void 0 === i
                  ? void 0
                  : i.length) > 0 &&
                  t._POSignalsUtils.Logger.info(
                    "Tapped on element with id '" + o.uiElement.id + "'",
                  );
            } catch (n) {
              t._POSignalsUtils.Logger.warn('error in ' + e.type + ' handler', n);
            }
          }),
          (e.prototype.onMouseout = function (e) {
            try {
              this.onMouseEvent(e);
              var n = e.relatedTarget || e.toElement;
              (n && 'HTML' !== n.nodeName) || this.dispatch();
            } catch (n) {
              t._POSignalsUtils.Logger.warn('error in ' + e.type + ' handler', n);
            }
          }),
          (e.prototype.onMouseEvent = function (e) {
            try {
              if (
                ('wheel' !== e.type && (this.lastMouseInteractionTimestamp = Date.now()),
                !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
              )
                return;
              if (
                (this.countEvent(e.type),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              this.updateInteraction(this.createMouseEvent(e.type, e));
            } catch (n) {
              t._POSignalsUtils.Logger.warn('error in ' + e.type + ' handler', n);
            }
          }),
          (e.prototype.onMouseClickEvent = function (e) {
            try {
              if (
                ((this.lastMouseInteractionTimestamp = Date.now()),
                !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
              )
                return;
              if (
                (this.countEvent(e.type),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              this.updateInteraction(this.createMouseClickEvent(e.type, e));
            } catch (n) {
              t._POSignalsUtils.Logger.warn('error in ' + e.type + ' handler', n);
            }
          }),
          (e.prototype.onPointerEvent = function (e) {
            try {
              if (
                ((this.lastMouseInteractionTimestamp = Date.now()),
                !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
              )
                return;
              if (
                (this.countEvent(e.type),
                t.PointerConfig.instance.pointerParams.eventsToIgnore.has(e.type))
              )
                return;
              this.updateInteraction(this.createPointerEvent(e.type, e));
            } catch (n) {
              t._POSignalsUtils.Logger.warn('error in ' + e.type + ' handler', n);
            }
          }),
          (e.prototype.clearBuffer = function () {
            var t = null;
            return (
              this.lastMouseInteraction && (t = this.lastMouseInteraction),
              (this.lastMouseInteraction = null),
              t
            );
          }),
          (e.prototype.isEmpty = function () {
            return !this.lastMouseInteraction;
          }),
          (e.prototype.createMouseEvent = function (t, e) {
            return {
              type: t,
              eventTs: e.timeStamp,
              epochTs: Date.now(),
              button: e.button,
              offsetX: e.offsetX,
              offsetY: e.offsetY,
              pageX: e.pageX,
              pageY: e.pageY,
              screenX: e.screenX,
              screenY: e.screenY,
              getX: function () {
                return e.screenX;
              },
              getY: function () {
                return e.screenY;
              },
            };
          }),
          (e.prototype.createPointerEvent = function (t, e) {
            var n = this.createMouseEvent(t, e);
            return __assign(__assign({}, n), {
              pointerId: e.pointerId,
              width: e.width,
              height: e.height,
              pressure: e.pressure,
              tangentialPressure: e.tangentialPressure,
              tiltX: e.tiltX,
              tiltY: e.tiltY,
              twist: e.twist,
              pointerType: e.pointerType,
              isPrimary: e.isPrimary,
            });
          }),
          (e.prototype.createMouseClickEvent = function (e, n) {
            var i = this.createMouseEvent(e, n);
            if (n.target && t._POSignalsUtils.Util.isFunction(n.target.getBoundingClientRect)) {
              var r = n.target.getBoundingClientRect();
              (i.targetBottom = r.bottom),
                (i.targetHeight = r.height),
                (i.targetLeft = r.left),
                (i.targetRight = r.right),
                (i.targetTop = r.top),
                (i.targetWidth = r.width),
                (i.targetX = r.x),
                (i.targetY = r.y);
            }
            return i;
          }),
          e
        );
      })();
      t.Mouse = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          (this.counter = 0), (this.key = t), (this.counter = this.loadFromStorage());
        }
        return (
          (e.prototype.loadFromStorage = function () {
            var t = e.sessionStorage.getItem(this.key);
            return Number(t) || 0;
          }),
          (e.prototype.get = function () {
            return this.counter;
          }),
          (e.prototype.increment = function (t) {
            void 0 === t && (t = 1),
              (this.counter += t),
              e.sessionStorage.setItem(this.key, this.counter);
          }),
          (e.prototype.decrement = function (t) {
            void 0 === t && (t = 1), this.increment(-1 * t);
          }),
          (e.prototype.reset = function () {
            (this.counter = 0), e.sessionStorage.removeItem(this.key);
          }),
          (e.sessionStorage = t._POSignalsStorage.SessionStorage.instance.sessionStorage),
          e
        );
      })();
      t.StorageCounter = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          (this.mapKey = t), (this.cache = this.loadFromStorage());
        }
        return (
          (e.prototype.loadFromStorage = function () {
            var t = e.sessionStorage.getItem(this.mapKey);
            return t || (t = JSON.stringify({})), JSON.parse(t);
          }),
          (e.prototype.asMap = function () {
            return this.cache;
          }),
          (e.prototype.set = function (t, n, i) {
            void 0 === i && (i = !0),
              (this.cache[t] = n),
              i && e.sessionStorage.setItem(this.mapKey, JSON.stringify(this.cache));
          }),
          (e.prototype.sync = function () {
            e.sessionStorage.setItem(this.mapKey, JSON.stringify(this.cache));
          }),
          (e.prototype.get = function (t) {
            return this.cache[t];
          }),
          (e.prototype.delete = function (t) {
            delete this.cache[t], e.sessionStorage.setItem(this.mapKey, JSON.stringify(this.cache));
          }),
          (e.prototype.values = function () {
            return t._POSignalsUtils.Util.values(this.cache);
          }),
          (e.prototype.clear = function () {
            (this.cache = {}), e.sessionStorage.removeItem(this.mapKey);
          }),
          (e.prototype.forEach = function (t) {
            for (var e in this.cache) this.cache.hasOwnProperty(e) && t(this.cache[e], e);
          }),
          (e.sessionStorage = t._POSignalsStorage.SessionStorage.instance.sessionStorage),
          e
        );
      })();
      t.StorageMap = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          (this.config = {}), (this._cacheHash = 0), (this.cache = new Map());
        }
        return (
          (e.prototype.refreshConfig = function (e) {
            try {
              if (!e) return;
              var n = t._POSignalsUtils.Util.hashCode(JSON.stringify(e));
              if (this._cacheHash === n) return;
              (this.config = e), (this._cacheHash = n), (this.cache = new Map());
            } catch (e) {
              t._POSignalsUtils.Logger.warn('Failed to set css selectors', e);
            }
          }),
          (e.prototype.getMatchingTags = function (e, n) {
            var i = this.cache.get(e);
            if (i) return i;
            var r = {};
            for (var o in this.config)
              try {
                if (!this.config.hasOwnProperty(o)) continue;
                var a = this.config[o].selector || [];
                t._POSignalsUtils.Util.isArray(a) || (a = [].concat(a));
                for (var s = 0, u = a; s < u.length; s++) {
                  var c = u[s];
                  t._POSignalsUtils.Util.isSelectorMatches(e, c, n) && (r[o] = this.config[o]);
                }
              } catch (e) {
                t._POSignalsUtils.Logger.warn('Failed to get the config for ' + o + ' tag', e);
              }
            return this.cache.set(e, r), r;
          }),
          (e.prototype.getValue = function (e, n) {
            if (n && e)
              switch (((n = n.trim()), e)) {
                case 'email_domain':
                  return t._POSignalsUtils.Util.getEmailDomain(n);
                case 'obfuscate':
                  return '' + t._POSignalsUtils.Util.mod(n, 1e3);
                case 'plain':
                  return n;
                case 'zip':
                  return n.substr(0, 3);
                case 'length':
                  return '' + n.length;
              }
            return '';
          }),
          Object.defineProperty(e.prototype, 'cacheHash', {
            get: function () {
              return this._cacheHash;
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })();
      t.TagsIdentifications = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          this._reduceFactorMap = null;
        }
        return (
          Object.defineProperty(e.prototype, 'reduceFactorMap', {
            get: function () {
              return this._reduceFactorMap;
            },
            set: function (t) {
              this._reduceFactorMap = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.reduceEventsByFactor = function (e) {
            var n = this;
            try {
              if (!e || 0 === e.length || !this.reduceFactorMap) return e;
              for (var i = new Map(), r = [], o = 0; o < e.length; o++)
                i.get(e[o].type) ? i.get(e[o].type).push(o) : i.set(e[o].type, [o]);
              i.forEach(function (t, e) {
                var i = n.reduceFactorMap[e] ? Number(n.reduceFactorMap[e]) : 0;
                n.reduceByFactor(i, t, function (e) {
                  r[t[e]] = !0;
                });
              });
              var a = [];
              for (o = 0; o < e.length; o++) r[o] && a.push(e[o]);
              return (
                e.length !== a.length &&
                  t._POSignalsUtils.Logger.debug(
                    e.length - a.length + ' events reduced out of ' + e.length,
                  ),
                a
              );
            } catch (n) {
              return t._POSignalsUtils.Logger.warn('Failed to reduce events', n), e;
            }
          }),
          (e.prototype.reduceByFactor = function (t, e, n) {
            t = Math.min(t, 1);
            for (
              var i = Math.round(Math.max(e.length * (1 - t), 2)),
                r = (e.length - 1) / (i - 1),
                o = Math.min(e.length, i),
                a = 0;
              a < o;
              a++
            ) {
              n(Math.round(a * r));
            }
          }),
          e
        );
      })();
      t.ReduceFactor = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          this.algorithm = t;
        }
        return (
          (e.prototype.reduce = function (n, i) {
            if (-1 === e.TYPES_TO_REDUCE.indexOf(i)) return { keptEvents: n, epsilon: 0 };
            if (n.length <= e.MIN_EVENTS_TO_REDUCE) return { keptEvents: n, epsilon: 0 };
            var r = n.length < 50 ? 0.55 : n.length < 100 ? 0.35 : 0.2,
              o = n.length < 50 ? 1 : n.length < 100 ? 3 : 7,
              a = this.algorithm.reduceEvents(n, o),
              s = a.length / n.length;
            if (a.length >= 10 && s >= r) return { keptEvents: a, epsilon: o };
            var u = n.length < 50 ? 0.1 : n.length < 100 ? 0.3 : 0.7,
              c = this.algorithm.reduceEvents(n, u),
              l = c.length / n.length;
            if (c.length <= e.MIN_EVENTS_TO_REDUCE || l <= r) return { keptEvents: c, epsilon: u };
            var d =
              (Math.min(o, Math.pow(o, s / r)) * Math.abs(l - r) + u * Math.abs(s - r)) /
              Math.abs(s - l);
            return (
              (d < u || d > o) &&
                t._POSignalsUtils.Logger.warn(
                  'linear weighted average - calculated epsilon is out of range, lowEpsilon: ' +
                    u +
                    ', highEpsilon: ' +
                    o +
                    ', epsilon: ' +
                    d,
                ),
              { keptEvents: this.algorithm.reduceEvents(n, d), epsilon: d }
            );
          }),
          (e.MIN_EVENTS_TO_REDUCE = 18),
          (e.TYPES_TO_REDUCE = ['mousemove', 'touchmove']),
          e
        );
      })();
      t.RDPEpsilonStrategy = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e(t) {
          this.rdpStrategy = t;
        }
        return (
          (e.prototype.reduceWithRPD = function (e) {
            var n = this;
            if (!e || 0 === e.length) return { events: e, reductionInfo: {} };
            for (var i = new Map(), r = [], o = 0, a = e; o < a.length; o++) {
              var s = a[o];
              i.get(s.type) ? i.get(s.type).push(s) : i.set(s.type, [s]);
            }
            var u = {};
            return (
              i.forEach(function (t, e) {
                var i = n.rdpStrategy.reduce(t, e),
                  o = i.keptEvents,
                  a = i.epsilon;
                a > 0 && (u[e] = { epsilon: a, originalLength: t.length, keptLength: o.length }),
                  (r = r.concat(o));
              }),
              { events: t._POSignalsUtils.Util.sortEventsByTimestamp(r), reductionInfo: u }
            );
          }),
          e
        );
      })();
      t.ReduceRDP = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function t() {}
        return (
          (t.prototype.getSqDist = function (t, e) {
            var n = t.getX() - e.getX(),
              i = t.getY() - e.getY();
            return n * n + i * i;
          }),
          (t.prototype.getSqSegDist = function (t, e, n) {
            var i = e.getX(),
              r = e.getY(),
              o = n.getX() - i,
              a = n.getY() - r;
            if (0 !== o || 0 !== a) {
              var s = ((t.getX() - i) * o + (t.getY() - r) * a) / (o * o + a * a);
              s > 1 ? ((i = n.getX()), (r = n.getY())) : s > 0 && ((i += o * s), (r += a * s));
            }
            return (o = t.getX() - i) * o + (a = t.getY() - r) * a;
          }),
          (t.prototype.simplifyRadialDist = function (t, e) {
            for (var n, i = t[0], r = [i], o = 1, a = t.length; o < a; o++)
              (n = t[o]), this.getSqDist(n, i) > e && (r.push(n), (i = n));
            return i !== n && r.push(n), r;
          }),
          (t.prototype.simplifyDPStep = function (t, e, n, i, r) {
            for (var o, a = i, s = e + 1; s < n; s++) {
              var u = this.getSqSegDist(t[s], t[e], t[n]);
              u > a && ((o = s), (a = u));
            }
            a > i &&
              (o - e > 1 && this.simplifyDPStep(t, e, o, i, r),
              r.push(t[o]),
              n - o > 1 && this.simplifyDPStep(t, o, n, i, r));
          }),
          (t.prototype.simplifyDouglasPeucker = function (t, e) {
            var n = t.length - 1,
              i = [t[0]];
            return this.simplifyDPStep(t, 0, n, e, i), i.push(t[n]), i;
          }),
          (t.prototype.simplify = function (t, e, n) {
            if (t.length <= 2) return t;
            var i = void 0 !== e ? e * e : 1;
            return (
              (t = n ? t : this.simplifyRadialDist(t, i)), (t = this.simplifyDouglasPeucker(t, i))
            );
          }),
          (t.prototype.reduceEvents = function (t, e) {
            return this.simplify(t, e);
          }),
          t
        );
      })();
      t.RDPReduction = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {}
        return (
          (e.prototype.filterMoveEvents = function (e, n) {
            if (e.length <= 18) return e;
            for (
              var i = e.filter(function (t) {
                  return t.type === n;
                }),
                r = t._POSignalsUtils.Util.keepFirstEventsWithDistance({
                  events: i,
                  threshold: 200,
                  min: 18,
                  max: 30,
                }),
                o = -1,
                a = {},
                s = 0;
              s < e.length;
              s++
            ) {
              var u = e[s];
              u.type !== n &&
                ('mousedown' !== u.type ? a[u.type] || (r.push(u), (a[u.type] = !0)) : (o = s));
            }
            return o >= 0 && r.push(e[o]), t._POSignalsUtils.Util.sortEventsByTimestamp(r);
          }),
          e
        );
      })();
      t.EventsReduction = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          (this.reduceFactor = new t.ReduceFactor()),
            (this.reduceRDP = new t.ReduceRDP(new t.RDPEpsilonStrategy(new t.RDPReduction()))),
            (this.eventsReduction = new t.EventsReduction());
        }
        return (
          Object.defineProperty(e.prototype, 'reduceFactorMap', {
            set: function (t) {
              this.reduceFactor.reduceFactorMap = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.reduceGesture = function (t) {
            var e = this.reduceRDP.reduceWithRPD(t.events);
            (t.events = this.eventsReduction.filterMoveEvents(e.events, 'touchmove')),
              (t.reduction = e.reductionInfo);
          }),
          (e.prototype.reduceKeyboardInteraction = function (e) {
            e.events = t._POSignalsUtils.Util.filterArrayByLength(e.events, 50);
          }),
          (e.prototype.reduceMouseInteraction = function (t) {
            var e = this.reduceRDP.reduceWithRPD(t.events);
            (t.events = this.eventsReduction.filterMoveEvents(e.events, 'mousemove')),
              (t.reduction = e.reductionInfo);
          }),
          e
        );
      })();
      t.ReductionManager = e;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function (e) {
        function n(n, i) {
          var r = e.call(this, n) || this;
          return (
            (r.tagsWithValueIdentifications = new t.TagsIdentifications()),
            (r.reductionManager = new t.ReductionManager()),
            (r.lastGestureTimestamp = 0),
            (r.currentBufferSize = 0),
            (r.MAX_EVENT_COUNTERS = 20),
            (r.bufferingStrategy = t.StrategyFactory.createBufferingStrategy(i, r)),
            (r.capturedKeyboardInteractions = new t.StorageArray(
              t._POSignalsUtils.Constants.CAPTURED_KEYBOARD_INTERACTIONS,
            )),
            (r.keyboardInteractionsCount = new t.StorageCounter(
              t._POSignalsUtils.Constants.KEYBOARD_INTERACTIONS_COUNT,
            )),
            (r.mouseInteractionsCount = new t.StorageCounter(
              t._POSignalsUtils.Constants.MOUSE_INTERACTIONS_COUNT,
            )),
            (r.gesturesCount = new t.StorageCounter(t._POSignalsUtils.Constants.GESTURES_COUNT)),
            (r.mouseEventCounters = new t.StorageArray(
              t._POSignalsUtils.Constants.MOUSE_EVENT_COUNTERS,
            )),
            (r.keyboardEventCounters = new t.StorageArray(
              t._POSignalsUtils.Constants.KEYBOARD_EVENT_COUNTERS,
            )),
            (r.touchEventCounters = new t.StorageArray(
              t._POSignalsUtils.Constants.TOUCH_EVENT_COUNTERS,
            )),
            (r.indirectEventCounters = new t.StorageArray(
              t._POSignalsUtils.Constants.INDIRECT_EVENT_COUNTERS,
            )),
            (r.capturedMouseInteractions = new t.StorageArray(
              t._POSignalsUtils.Constants.CAPTURED_MOUSE_INTERACTIONS,
            )),
            (r.capturedGestures = new t.StorageArray(
              t._POSignalsUtils.Constants.CAPTURED_GESTURES,
            )),
            (r.capturedIndirectEvents = new t.StorageArray(
              t._POSignalsUtils.Constants.CAPTURED_INDIRECT,
            )),
            (r.capturedMouseInteractionSummary = new t.StorageArray(
              t._POSignalsUtils.Constants.CAPTURED_MOUSE_INTERACTIONS_SUMMARY,
            )),
            (r.currentBufferSize =
              r.capturedGestures.length +
              r.capturedMouseInteractions.length +
              r.capturedKeyboardInteractions.length),
            (r.uiControlManager = new t.UIControlManager(r)),
            (r.keyboard = new t.Keyboard(r, r.uiControlManager)),
            r.keyboard.onInteraction.subscribe(r.handleKeyboardInteraction.bind(r)),
            r.keyboard.onEnterPress.subscribe(r.handleStTagOnEnter.bind(r)),
            r.keyboard.onObfuscatedValue.subscribe(r.handleTagValueOnBlur.bind(r)),
            (r.mouse = new t.Mouse(r, r.uiControlManager)),
            r.mouse.onInteraction.subscribe(r.handleMouseInteraction.bind(r)),
            r.mouse.onClickEvent.subscribe(r.handleStTagOnClick.bind(r)),
            (r.sensors = new t.Sensors(r)),
            (r.gesture = new t.GestureEvents(r, r.sensors)),
            r.gesture.onGesture.subscribe(r.handleGesture.bind(r)),
            (r.indirect = new t.IndirectClient(r)),
            r.indirect.onIndirect.subscribe(r.handleIndirect.bind(r)),
            (r.onUrlChangeHandler = r.onUrlChange.bind(r)),
            r
          );
        }
        return (
          __extends(n, e),
          Object.defineProperty(n.prototype, 'keyboardCounter', {
            get: function () {
              return this.keyboardInteractionsCount.get();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'mouseCounter', {
            get: function () {
              return this.mouseInteractionsCount.get();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'gesturesCounter', {
            get: function () {
              return this.gesturesCount.get();
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(n.prototype, 'additionalData', {
            get: function () {
              var e = t._POSignalsUtils.Util.getDeviceOrientation();
              return {
                locationHref: location.href,
                devTools: t._POSignalsUtils.Util.getDevToolsState(),
                innerWidth:
                  window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth,
                innerHeight:
                  window.innerHeight ||
                  document.documentElement.clientHeight ||
                  document.body.clientHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                pixelRatio: window.devicePixelRatio,
                deviceOrientation: e.orientation,
                deviceAngle: e.angle,
              };
            },
            enumerable: !1,
            configurable: !0,
          }),
          (n.prototype.getBehavioralData = function () {
            this.clearIndirectBuffer();
            var t = this.reduceEpochEventCounters();
            return {
              mouse: {
                count: this.mouseInteractionsCount.get(),
                interactions: this.capturedMouseInteractions.get(),
              },
              keyboard: {
                count: this.keyboardInteractionsCount.get(),
                interactions: this.capturedKeyboardInteractions.get(),
              },
              touch: { count: this.gesturesCount.get(), interactions: this.capturedGestures.get() },
              indirect: { events: this.capturedIndirectEvents.get() },
              mouseSummary: { events: this.capturedMouseInteractionSummary.get() },
              eventCounters: t,
            };
          }),
          (n.prototype.getBufferSize = function () {
            return this.currentBufferSize;
          }),
          (n.prototype.getInteractionDuration = function (t) {
            return (null === t || void 0 === t ? void 0 : t.length) > 0
              ? t[t.length - 1].epochTs - t[0].epochTs
              : 0;
          }),
          (n.prototype.dispose = function () {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (t) {
                return (
                  this.stopListening(),
                  this.keyboard.onInteraction.unsubscribe(
                    this.handleKeyboardInteraction.bind(this),
                  ),
                  this.keyboard.onEnterPress.unsubscribe(this.handleStTagOnEnter.bind(this)),
                  this.keyboard.onObfuscatedValue.unsubscribe(this.handleTagValueOnBlur.bind(this)),
                  this.mouse.onInteraction.unsubscribe(this.handleMouseInteraction.bind(this)),
                  this.mouse.onClickEvent.unsubscribe(this.handleStTagOnClick.bind(this)),
                  this.gesture.onGesture.unsubscribe(this.handleGesture.bind(this)),
                  this.indirect.unsubscribe(),
                  this.indirect.onIndirect.unsubscribe(this.handleIndirect.bind(this)),
                  [2]
                );
              });
            });
          }),
          (n.prototype.collectBehavioralData = function (e) {
            if (this.isBehavioralDataPaused) return !1;
            var n = t.PointerConfig.instance.pointerParams.behavioralBlacklist;
            return !(e && n && n[e]) || !Boolean(window.location.href.match(n[e]));
          }),
          (n.prototype.getElementsStID = function (e) {
            try {
              return (
                t._POSignalsUtils.Util.getAttribute(e, 'data-st-field') ||
                this.keyboard.fieldsIdentifications.getIdentification(e, 0) ||
                ''
              );
            } catch (e) {
              return t._POSignalsUtils.Logger.warn('failed to get element stId', e), '';
            }
          }),
          (n.prototype.addEventListener = function (e, n, i, r) {
            t.PointerConfig.instance.pointerParams.eventsBlackList.has(n) ||
              (e.addEventListener(n, this.onEventHandler, r), e.addEventListener(n, i, r));
          }),
          (n.prototype.addUiControlTags = function (e) {
            if ((null === e || void 0 === e ? void 0 : e.length) > 0)
              for (var n = !1, i = 0, r = e; i < r.length; i++) {
                var o = r[i];
                try {
                  if (null === o || void 0 === o ? void 0 : o.name) {
                    var a = this.uiControlManager.convertToTagValueConfig(o.value);
                    n = this.addSingleTagWithValue(o.name, a) || n;
                  }
                } catch (e) {
                  t._POSignalsUtils.Logger.warn('failed to add tag config', e);
                }
              }
          }),
          (n.prototype.refreshListening = function () {
            var e = t.PointerConfig.instance;
            this.tagsWithValueIdentifications.refreshConfig(e.pointerParams.remoteTags),
              (this.reductionManager.reduceFactorMap = e.pointerParams.eventsReduceFactorMap),
              this.keyboard.refreshKeyboardCssSelectors(e.pointerParams.keyboardCssSelectors),
              (this.sensors.maxSensorSamples = e.pointerParams.maxSensorSamples),
              (this.sensors.sensorsTimestampDeltaInMillis = e.pointerParams.sensorsDeltaInMillis),
              this.mouse.start(),
              this.keyboard.start(),
              this.gesture.start(),
              this.indirect.start(),
              0 == e.pointerParams.maxSensorSamples ? this.sensors.stop() : this.sensors.start(),
              this.addEventListener(window, '_onlocationchange', this.onUrlChangeHandler),
              this.addEventListener(window, 'popstate', this.onUrlChangeHandler);
          }),
          (n.prototype.addSingleTagWithValue = function (e, n) {
            try {
              if (
                (null === n || void 0 === n ? void 0 : n.context) &&
                !Boolean(window.location.href.match(n.context))
              )
                return !1;
              var i = '';
              if (
                (null === n || void 0 === n ? void 0 : n.operation) &&
                (null === n || void 0 === n ? void 0 : n.valueSelector)
              ) {
                var r = document.querySelector(n.valueSelector);
                if (r) {
                  var o = t._POSignalsUtils.Util.getElementText(r);
                  i = this.tagsWithValueIdentifications.getValue(n.operation, o);
                }
              }
              if ((null === n || void 0 === n ? void 0 : n.valueMandatory) && !i)
                return (
                  t._POSignalsUtils.Logger.warn("tag '" + e + "' wasn't added. value is missing"),
                  !1
                );
              this.addTag(e, i);
            } catch (n) {
              t._POSignalsUtils.Logger.warn('failed to add ' + e + ' tag', n);
            }
            return !1;
          }),
          (n.prototype.addTagsWithValue = function (t) {
            var e = !1;
            for (var n in t) t.hasOwnProperty(n) && (e = this.addSingleTagWithValue(n, t[n]) || e);
          }),
          (n.prototype.handleStTagOnEnter = function (e, n) {
            n instanceof HTMLInputElement &&
              t._POSignalsUtils.Util.isTextInput(n) &&
              this.handleStTagElement(n);
          }),
          (n.prototype.handleTagValueOnBlur = function (t, e) {
            e && this.addTag(e.fieldKey, e.obfuscatedValue);
          }),
          (n.prototype.handleStTagOnClick = function (e, n) {
            (n instanceof HTMLInputElement && !t._POSignalsUtils.Util.isClickableInput(n)) ||
              this.handleStTagElement(n);
          }),
          (n.prototype.handleMouseInteraction = function (t, e) {
            if (e) {
              this.incrementEventCounters(e.eventCounters, 'mouse'),
                this.filterOldMouseEvents(),
                this.mouseInteractionsCount.increment(),
                this.reductionManager.reduceMouseInteraction(e);
              var n = this.bufferingStrategy.calculateStrategyResult(e, 'mouse');
              (e.quality = n.quality),
                this.handleMouseInteractionSummary(e),
                n.shouldCollect &&
                  (n.remove && this.removeInteraction(n.remove),
                  this.capturedMouseInteractions.push(e),
                  this.lastGestureTimestamp !== e.events[e.events.length - 1].eventTs &&
                    this.currentBufferSize++);
            }
          }),
          (n.prototype.handleMouseInteractionSummary = function (t) {
            var e = {
              epochTs: t.epochTs,
              duration: this.getInteractionDuration(t.events),
              quality: t.quality,
            };
            this.capturedMouseInteractionSummary.push(e),
              this.capturedMouseInteractionSummary.length > 10 &&
                this.capturedMouseInteractionSummary.remove(0);
          }),
          (n.prototype.handleIndirect = function (t, e) {
            this.filterOldIndirectEvents(), this.addIndirectEvents(e);
          }),
          (n.prototype.handleKeyboardInteraction = function (t, e) {
            if (e) {
              this.incrementEventCounters(e.eventCounters, 'keyboard'),
                this.filterOldKeyboardEvents(),
                this.keyboardInteractionsCount.increment(),
                this.reductionManager.reduceKeyboardInteraction(e);
              var n = this.bufferingStrategy.calculateStrategyResult(e, 'keyboard');
              n.shouldCollect &&
                (n.remove && this.removeInteraction(n.remove),
                (e.quality = n.quality),
                this.capturedKeyboardInteractions.push(e),
                this.currentBufferSize++);
            }
          }),
          (n.prototype.handleGesture = function (t, e) {
            var n;
            if (this.isValidGesture(e)) {
              this.incrementEventCounters(e.eventCounters, 'touch'),
                this.filterOldGesturesEvents(),
                this.gesturesCount.increment(),
                this.reductionManager.reduceGesture(e);
              var i = this.bufferingStrategy.calculateStrategyResult(e, 'touch');
              i.shouldCollect &&
                (i.remove && this.removeInteraction(i.remove),
                (e.quality = i.quality),
                this.sensors.onGesture(e),
                this.capturedGestures.push(e),
                this.currentBufferSize++,
                (this.lastGestureTimestamp =
                  null === (n = e.events[e.events.length - 1]) || void 0 === n
                    ? void 0
                    : n.eventTs));
            }
          }),
          (n.prototype.clearIndirectBuffer = function () {
            var t = this.indirect.clearBuffer();
            this.addIndirectEvents(t);
          }),
          (n.prototype.removeInteraction = function (t) {
            switch (t.type) {
              case 'mouse':
                this.capturedMouseInteractions.remove(t.index);
                break;
              case 'keyboard':
                this.capturedKeyboardInteractions.remove(t.index);
                break;
              case 'touch':
                this.capturedGestures.remove(t.index);
            }
          }),
          (n.prototype.addIndirectEvents = function (e) {
            var n;
            if (
              (null === (n = null === e || void 0 === e ? void 0 : e.events) || void 0 === n
                ? void 0
                : n.length) > 0
            ) {
              for (
                var i = [],
                  r = t._POSignalsUtils.Util.typesCounter(this.capturedIndirectEvents.get()),
                  o = 0,
                  a = e.events;
                o < a.length;
                o++
              ) {
                var s = a[o];
                t.PointerConfig.instance.pointerParams.highPriorityIndirectEvents.has(s.type) &&
                  this.capturedIndirectEvents.length + i.length <
                    t.PointerConfig.instance.pointerParams.maxIndirectEvents &&
                  i.push(s),
                  r[s.type] > 0 || (i.push(s), (r[s.type] = 1));
              }
              this.incrementEventCounters(r, 'indirect'),
                this.capturedIndirectEvents.set(this.capturedIndirectEvents.concat(i));
            }
          }),
          (n.prototype.onUrlChange = function () {
            this.addTag('location', window.location.href);
          }),
          (n.prototype.handleStTagElement = function (e) {
            if (e) {
              var n = t.PointerConfig.instance.pointerParams.maxSelectorChildren,
                i = this.tagsWithValueIdentifications.getMatchingTags(e, n);
              this.addTagsWithValue(i);
              var r = t._POSignalsUtils.Util.isSelectorMatches(e, '[data-st-tag]', n);
              if (r instanceof Element) {
                var o = t._POSignalsUtils.Util.getAttribute(r, 'data-st-tag'),
                  a = t._POSignalsUtils.Util.getAttribute(r, 'data-st-tag-value');
                o && this.addTag(o, a);
              }
            }
          }),
          (n.prototype.stopListening = function () {
            this.keyboard.stop(),
              this.mouse.stop(),
              this.gesture.stop(),
              this.indirect.stop(),
              this.sensors.stop(),
              window.removeEventListener('_onlocationchange', this.onUrlChangeHandler),
              window.removeEventListener('popstate', this.onUrlChangeHandler);
          }),
          (n.prototype.clearBehavioralData = function () {
            this.capturedKeyboardInteractions.clear(),
              this.capturedMouseInteractions.clear(),
              this.capturedGestures.clear(),
              this.capturedIndirectEvents.clear(),
              this.sensors.reset(),
              t.Tags.instance.reset(),
              (this.currentBufferSize = 0),
              this.keyboardInteractionsCount.reset(),
              this.mouseInteractionsCount.reset(),
              this.gesturesCount.reset(),
              this.mouseEventCounters.clear(),
              this.mouseEventCounters.clear(),
              this.indirectEventCounters.clear(),
              this.keyboardEventCounters.clear(),
              this.touchEventCounters.clear(),
              this.eventCounters.clear();
          }),
          (n.prototype.isValidGesture = function (e) {
            var n, i;
            return (
              (null === (n = null === e || void 0 === e ? void 0 : e.events) || void 0 === n
                ? void 0
                : n.length) > 0 &&
              (null === (i = null === e || void 0 === e ? void 0 : e.events) || void 0 === i
                ? void 0
                : i.length) < t.PointerConfig.instance.pointerParams.maxSnapshotsCount
            );
          }),
          (n.prototype.filterOldIndirectEvents = function () {
            var t = new Date().getTime();
            this.capturedIndirectEvents.set(
              this.capturedIndirectEvents.get().filter(function (e) {
                return t - e.epochTs <= 36e5;
              }),
            );
          }),
          (n.prototype.filterOldMouseEvents = function () {
            var t = new Date().getTime();
            this.capturedMouseInteractions.set(
              this.capturedMouseInteractions.get().filter(function (e) {
                return t - e.epochTs <= 36e5;
              }),
            );
          }),
          (n.prototype.filterOldKeyboardEvents = function () {
            var t = new Date().getTime();
            this.capturedKeyboardInteractions.set(
              this.capturedKeyboardInteractions.get().filter(function (e) {
                return t - e.epochTs <= 36e5;
              }),
            );
          }),
          (n.prototype.filterOldGesturesEvents = function () {
            var t = new Date().getTime();
            this.capturedGestures.set(
              this.capturedGestures.get().filter(function (e) {
                return t - e.epochTs <= 36e5;
              }),
            );
          }),
          (n.prototype.incrementEventCounters = function (t, e) {
            var n,
              i = Date.now();
            switch (e) {
              case 'mouse':
                n = this.mouseEventCounters;
                break;
              case 'keyboard':
                n = this.keyboardEventCounters;
                break;
              case 'touch':
                n = this.touchEventCounters;
                break;
              case 'indirect':
                n = this.indirectEventCounters;
            }
            n.set(
              n.get().filter(function (t) {
                return i - t.epochTs <= 36e5;
              }),
            ),
              n.length < this.MAX_EVENT_COUNTERS ? n.push(t) : (n.remove(0), n.push(t));
          }),
          (n.prototype.reduceEpochEventCounters = function () {
            var t = { epochTs: Date.now() };
            return (
              __spreadArrays(
                this.mouseEventCounters.get(),
                this.keyboardEventCounters.get(),
                this.touchEventCounters.get(),
                this.indirectEventCounters.get(),
              ).forEach(function (e) {
                Object.keys(e).forEach(function (n) {
                  'epochTs' !== n && (t[n] ? (t[n] += e[n]) : (t[n] = e[n]));
                });
              }),
              delete t.epochTs,
              t
            );
          }),
          n
        );
      })(t.ClientBase);
      t.Client = e;
    })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities,
    _pingOneSignals = (function () {
      function t() {}
      return (
        (t.getData = function () {
          return _POSignalsEntities.ClientBase.instance().getData();
        }),
        (t.init = function (t) {
          return (
            _POSignalsEntities._POSignalsUtils.Util.ieFix(),
            _POSignalsEntities.ClientBase.instance().startSignals(t)
          );
        }),
        (t.initSilent = function (t) {
          return this.init(t);
        }),
        (t.pauseBehavioralData = function () {
          _POSignalsEntities.ClientBase.instance().pauseBehavioralData();
        }),
        (t.resumeBehavioralData = function () {
          _POSignalsEntities.ClientBase.instance().resumeBehavioralData();
        }),
        t
      );
    })(),
    onDomReady = function (t) {
      'loading' !== document.readyState ? t() : document.addEventListener('DOMContentLoaded', t);
    };
  onDomReady(function () {
    if (!window._pingOneSignalsReady) {
      var t = new CustomEvent('PingOneSignalsReadyEvent');
      document.dispatchEvent(t), (window._pingOneSignalsReady = !0);
    }
  }),
    (function (t) {
      var e;
      !(function (t) {
        (t[(t.RICH = 3)] = 'RICH'),
          (t[(t.CLICK = 2)] = 'CLICK'),
          (t[(t.MOVE = 1)] = 'MOVE'),
          (t[(t.POOR = 0)] = 'POOR');
      })(e || (e = {}));
      var n = (function () {
        function n(t, e, n, i, r, o) {
          (this.clientVersion = t),
            (this.instanceUUID = e),
            (this.initParams = n),
            (this.metadata = i),
            (this.behavioralDataHandler = r),
            (this.sessionData = o),
            (this.Max_Mouse_Touch_Interactions = 6);
        }
        return (
          (n.prototype.getData = function (t) {
            return __awaiter(this, void 0, void 0, function () {
              var e, n;
              return __generator(this, function (i) {
                switch (i.label) {
                  case 0:
                    return this.incrementGetData(), [4, this.getRiskData(t)];
                  case 1:
                    return (
                      (e = i.sent()),
                      -1 !==
                      (n = e.tags.findIndex(function (t) {
                        return 'Get Data' === t.name;
                      }))
                        ? (e.tags[n] = this._getDataCounter)
                        : e.tags.push(this._getDataCounter),
                      [2, this.toString(e)]
                    );
                }
              });
            });
          }),
          (n.prototype.getRiskData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
              var n, i, r, o, a, s, u;
              return __generator(this, function (c) {
                switch (c.label) {
                  case 0:
                    return [
                      4,
                      Promise.all([
                        this.metadata.getDeviceAttributes(),
                        this.metadata.getLocalAgentJwt(),
                      ]),
                    ];
                  case 1:
                    return (
                      (n = c.sent()),
                      (i = n[0]),
                      (r = n[1]),
                      (o = this.behavioralDataHandler.getBehavioralData()),
                      [4, this.modifyBehavioralData(o)]
                    );
                  case 2:
                    return (
                      (o = c.sent()),
                      (a = {
                        behavioral: o,
                        tags: t.Tags.instance.tags,
                        sdkConfig: this.initParams,
                        epochTs: e,
                        instanceUUID: this.instanceUUID,
                        tabUUID: t._POSignalsStorage.SessionStorage.instance.tabUUID,
                        sdkVersion: this.clientVersion,
                        platform: 'web',
                        clientToken: window._pingOneSignalsToken,
                      }),
                      this.sessionData.universalTrustEnabled
                        ? ((u = {}), [4, this.getJWTSignedPayload(e, i.deviceId)])
                        : [3, 4]
                    );
                  case 3:
                    return (
                      (s = __assign.apply(void 0, [((u.jwtDeviceAttributes = c.sent()), u), a])),
                      [3, 5]
                    );
                  case 4:
                    (s = __assign({ deviceAttributes: i }, a)), (c.label = 5);
                  case 5:
                    return (
                      this.sessionData.agentIdentificationEnabled &&
                        (s = __assign({ jwtAgentPayload: r }, s)),
                      [2, s]
                    );
                }
              });
            });
          }),
          (n.prototype.toString = function (e) {
            var n,
              i = this.metadata.getObfsInfo();
            try {
              n = t._POSignalsUtils.Util.string2buf(JSON.stringify(e));
            } catch (t) {
              throw new Error('Failed to create data, ' + t.message);
            }
            try {
              n = t.pako.gzip(n);
            } catch (t) {
              throw new Error('Failed to compress data, ' + t.message);
            }
            try {
              n = t._POSignalsUtils.Util.encryptionBytes(n, i.key);
            } catch (t) {
              throw new Error('failed to obfuscate data, ' + t.message);
            }
            try {
              return t._POSignalsUtils.Util.base64Uint8Array(n) + '.' + btoa(i.identifier);
            } catch (t) {
              throw new Error('failed to encode data, ' + t.message);
            }
          }),
          (n.prototype.getJWTSignedPayload = function (t, e) {
            return __awaiter(this, void 0, void 0, function () {
              var n;
              return __generator(this, function (i) {
                return (
                  (n = this.metadata.getSerializedDeviceAttributes()),
                  [2, this.sessionData.signJWTChallenge(n, t, e)]
                );
              });
            });
          }),
          (n.prototype.modifyBehavioralData = function (t) {
            return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (e) {
                return (
                  (t.mouse.interactions = this.getBestMouseInteractions(t.mouse.interactions)),
                  (t.touch.interactions = this.getBestTouchInteractions(
                    t.touch.interactions,
                    t.mouse.interactions,
                  )),
                  (t.keyboard.interactions = this.getBestKeyboardInteractions(
                    t.keyboard.interactions,
                  )),
                  [2, t]
                );
              });
            });
          }),
          (n.prototype.getBestInteractions = function (e) {
            var n = Date.now();
            t._POSignalsUtils.Logger.debug('total interactions:', e);
            var i = e.filter(function (t) {
                return n - t.epochTs <= 18e4;
              }),
              r = this.sortInteractions(i).slice(0, 2),
              o = e.filter(function (t) {
                return !r.some(function (e) {
                  return e.epochTs === t.epochTs;
                });
              }),
              a = this.sortInteractions(o).slice(0, 5 - r.length);
            return (
              t._POSignalsUtils.Logger.debug(
                'final interactions for getData:',
                __spreadArrays(r, a),
              ),
              __spreadArrays(r, a).sort(function (t, e) {
                return t.epochTs - e.epochTs;
              })
            );
          }),
          (n.prototype.getBestMouseInteractions = function (t) {
            return this.getBestInteractions(t);
          }),
          (n.prototype.getBestKeyboardInteractions = function (t) {
            return this.getBestInteractions(t);
          }),
          (n.prototype.getBestTouchInteractions = function (t, e) {
            var n = this.Max_Mouse_Touch_Interactions - e.length;
            return this.getTouchBestInteraction(t, n);
          }),
          (n.prototype.incrementGetData = function () {
            this._getDataCounter
              ? (this._getDataCounter.value++, (this._getDataCounter.timestamp = Date.now()))
              : (this._getDataCounter = {
                  value: 1,
                  name: 'Get Data',
                  timestamp: Date.now(),
                  epochTs: Date.now(),
                });
          }),
          (n.prototype.getTouchBestInteraction = function (t, e) {
            return (t = this.sortInteractions(t)).slice(0, e);
          }),
          (n.prototype.sortInteractions = function (t) {
            return t.sort(function (t, n) {
              var i = e[t.quality],
                r = e[n.quality];
              return i === r ? n.epochTs - t.epochTs : r - i;
            });
          }),
          n
        );
      })();
      t.DataHandler = n;
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      var e = (function () {
        function e() {
          this._configuration = {
            enabled: e.ENABLED_DEFAULT,
            bufferSize: e.BUFFER_SIZE_DEFAULT,
            maxSnapshotsCount: e.MAX_SNAPSHOTS_COUNT_DEFAULT,
            sensors: e.SENSORS_DEFAULT,
            metadataBlacklist: e.METADATA_BLACK_LIST_DEFAULT,
            tagsBlacklistRegex: e.TAGS_BLACK_LIST_REGEX_DEFAULT,
            behavioralBlacklist: e.BEHAVIORAL_BLACK_LIST_DEFAULT,
            webRtcUrl: e.WEB_RTC_URL_DEFAULT,
            eventsBlackList: e.EVENTS_BLACK_LIST_DEFAULT,
            eventsToIgnore: e.EVENTS_TO_IGNORE_DEFAULT,
            highPriorityIndirectEvents: e.HIGH_PRIORITY_INDIRECT_EVENTS_DEFAULT,
            indirectIntervalMillis: e.INDIRECT_INTERVAL_MILLIS_DEFAULT,
            mouseIntervalMillis: e.MOUSE_INTERVAL_MILLIS_DEFAULT,
            mouseIdleTimeoutMillis: e.MOUSE_IDLE_TIMEOUT_MILLIS_DEFAULT,
            maxMouseEvents: e.MAX_MOUSE_EVENTS_DEFAULT,
            maxIndirectEvents: e.MAX_INDIRECT_EVENTS_DEFAULT,
            keyboardFieldBlackList: e.KEYBOARD_FIELD_BLACK_LIST_DEFAULT,
            keyboardCssSelectors: e.KEYBOARD_CSS_SELECTORS_DEFAULT,
            keyboardCssSelectorsBlacklist: e.KEYBOARD_CSS_SELECTORS_BLACKLIST_DEFAULT,
            keyboardIdentifierAttributes: e.KEYBOARD_IDENTIFIER_ATTRIBUTES_DEFAULT,
            remoteTags: e.REMOTE_TAGS_DEFAULT,
            maxSelectorChildren: e.MAX_SELECTOR_CHILDREN_DEFAULT,
            eventsReduceFactorMap: e.EVENTS_REDUCE_FACTOR_MAP_DEFAULT,
            propertyDescriptors: e.PROPERTY_DESCRIPTORS_DEFAULT,
            additionalMediaCodecs: e.ADDITIONAL_MEDIA_CODECS_DEFAULT,
            fingerprintTimeoutMillis: e.FINGER_PRINT_TIMEOUT_MILLIS_DEFAULT,
            metadataDataPoints: e.METADATA_DATA_POINTS_DEFAULT,
            uiModeling: e.UI_MODELING_CONFIG_DEFAULT,
            uiControl: e.UI_CONTROL_LIST_DEFAULT,
          };
        }
        return (
          (e.prototype.updateParams = function (t) {
            t && (this._configuration = t);
          }),
          Object.defineProperty(e.prototype, 'enabled', {
            get: function () {
              return 'boolean' == typeof this._configuration.enabled
                ? this._configuration.enabled
                : e.ENABLED_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'bufferSize', {
            get: function () {
              return 'number' == typeof this._configuration.bufferSize &&
                this._configuration.bufferSize > 0
                ? this._configuration.bufferSize
                : e.BUFFER_SIZE_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'maxSnapshotsCount', {
            get: function () {
              return 'number' == typeof this._configuration.maxSnapshotsCount &&
                this._configuration.maxSnapshotsCount >= 0
                ? this._configuration.maxSnapshotsCount
                : e.MAX_SNAPSHOTS_COUNT_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'maxSensorSamples', {
            get: function () {
              var t = this._configuration.sensors;
              return t && 'number' == typeof t.maxSensorSamples && t.maxSensorSamples >= 0
                ? t.maxSensorSamples
                : e.SENSORS_DEFAULT.maxSensorSamples;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'sensorsDeltaInMillis', {
            get: function () {
              var t = this._configuration.sensors;
              return t && 'number' == typeof t.sensorsDeltaInMillis && t.sensorsDeltaInMillis >= 0
                ? t.sensorsDeltaInMillis
                : e.SENSORS_DEFAULT.sensorsDeltaInMillis;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'metadataBlackList', {
            get: function () {
              var n;
              return t._POSignalsUtils.Util.isArray(this._configuration.metadataBlacklist) &&
                (null === (n = this._configuration.metadataBlacklist) || void 0 === n
                  ? void 0
                  : n.length) > 0
                ? this._configuration.metadataBlacklist
                : e.METADATA_BLACK_LIST_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'behavioralBlacklist', {
            get: function () {
              return this._configuration.behavioralBlacklist
                ? this._configuration.behavioralBlacklist
                : e.BEHAVIORAL_BLACK_LIST_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'tagsBlacklistRegex', {
            get: function () {
              return 'string' == typeof this._configuration.tagsBlacklistRegex
                ? this._configuration.tagsBlacklistRegex
                : e.TAGS_BLACK_LIST_REGEX_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'webRtcUrl', {
            get: function () {
              return 'string' == typeof this._configuration.webRtcUrl
                ? this._configuration.webRtcUrl
                : e.WEB_RTC_URL_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'eventsBlackList', {
            get: function () {
              return (
                t._POSignalsUtils.Util.isArray(this._configuration.eventsBlackList) &&
                  (this._configuration.eventsBlackList = new Set(
                    this._configuration.eventsBlackList,
                  )),
                this._configuration.eventsBlackList instanceof Set
                  ? this._configuration.eventsBlackList
                  : e.EVENTS_BLACK_LIST_DEFAULT
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'eventsToIgnore', {
            get: function () {
              return (
                t._POSignalsUtils.Util.isArray(this._configuration.eventsToIgnore) &&
                  (this._configuration.eventsToIgnore = new Set(
                    this._configuration.eventsToIgnore,
                  )),
                this._configuration.eventsToIgnore instanceof Set
                  ? this._configuration.eventsToIgnore
                  : e.EVENTS_TO_IGNORE_DEFAULT
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'highPriorityIndirectEvents', {
            get: function () {
              return (
                t._POSignalsUtils.Util.isArray(this._configuration.highPriorityIndirectEvents) &&
                  (this._configuration.highPriorityIndirectEvents = new Set(
                    this._configuration.highPriorityIndirectEvents,
                  )),
                this._configuration.highPriorityIndirectEvents instanceof Set
                  ? this._configuration.highPriorityIndirectEvents
                  : e.HIGH_PRIORITY_INDIRECT_EVENTS_DEFAULT
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'indirectIntervalMillis', {
            get: function () {
              return 'number' == typeof this._configuration.indirectIntervalMillis &&
                this._configuration.indirectIntervalMillis > 0
                ? this._configuration.indirectIntervalMillis
                : e.INDIRECT_INTERVAL_MILLIS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'mouseIntervalMillis', {
            get: function () {
              return 'number' == typeof this._configuration.mouseIntervalMillis &&
                this._configuration.mouseIntervalMillis > 0
                ? this._configuration.mouseIntervalMillis
                : e.MOUSE_INTERVAL_MILLIS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'mouseIdleTimeoutMillis', {
            get: function () {
              return 'number' == typeof this._configuration.mouseIdleTimeoutMillis &&
                this._configuration.mouseIdleTimeoutMillis > 0
                ? this._configuration.mouseIdleTimeoutMillis
                : e.MOUSE_IDLE_TIMEOUT_MILLIS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'maxMouseEvents', {
            get: function () {
              return 'number' == typeof this._configuration.maxMouseEvents &&
                this._configuration.maxMouseEvents >= 0
                ? this._configuration.maxMouseEvents
                : e.MAX_MOUSE_EVENTS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'maxIndirectEvents', {
            get: function () {
              return 'number' == typeof this._configuration.maxIndirectEvents &&
                this._configuration.maxIndirectEvents >= 0
                ? this._configuration.maxIndirectEvents
                : e.MAX_INDIRECT_EVENTS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'keyboardFieldBlackList', {
            get: function () {
              return (
                t._POSignalsUtils.Util.isArray(this._configuration.keyboardFieldBlackList) &&
                  (this._configuration.keyboardFieldBlackList = new Set(
                    this._configuration.keyboardFieldBlackList,
                  )),
                this._configuration.keyboardFieldBlackList instanceof Set
                  ? this._configuration.keyboardFieldBlackList
                  : e.KEYBOARD_FIELD_BLACK_LIST_DEFAULT
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'keyboardCssSelectors', {
            get: function () {
              return this._configuration.keyboardCssSelectors
                ? this._configuration.keyboardCssSelectors
                : e.KEYBOARD_CSS_SELECTORS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'keyboardCssSelectorsBlacklist', {
            get: function () {
              return t._POSignalsUtils.Util.isArray(
                this._configuration.keyboardCssSelectorsBlacklist,
              )
                ? this._configuration.keyboardCssSelectorsBlacklist
                : e.KEYBOARD_CSS_SELECTORS_BLACKLIST_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'keyboardIdentifierAttributes', {
            get: function () {
              return t._POSignalsUtils.Util.isArray(
                this._configuration.keyboardIdentifierAttributes,
              )
                ? this._configuration.keyboardIdentifierAttributes
                : e.KEYBOARD_IDENTIFIER_ATTRIBUTES_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'remoteTags', {
            get: function () {
              return this._configuration.remoteTags
                ? this._configuration.remoteTags
                : e.REMOTE_TAGS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'maxSelectorChildren', {
            get: function () {
              return 'number' == typeof this._configuration.maxSelectorChildren &&
                this._configuration.maxSelectorChildren > 0
                ? this._configuration.maxSelectorChildren
                : e.MAX_SELECTOR_CHILDREN_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'eventsReduceFactorMap', {
            get: function () {
              return this._configuration.eventsReduceFactorMap
                ? this._configuration.eventsReduceFactorMap
                : e.EVENTS_REDUCE_FACTOR_MAP_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'propertyDescriptors', {
            get: function () {
              return this._configuration.propertyDescriptors
                ? this._configuration.propertyDescriptors
                : e.PROPERTY_DESCRIPTORS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'additionalMediaCodecs', {
            get: function () {
              return this._configuration.additionalMediaCodecs
                ? this._configuration.additionalMediaCodecs
                : e.ADDITIONAL_MEDIA_CODECS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'fingerprintTimeoutMillis', {
            get: function () {
              return 'number' == typeof this._configuration.fingerprintTimeoutMillis &&
                this._configuration.fingerprintTimeoutMillis > 0
                ? this._configuration.fingerprintTimeoutMillis
                : e.FINGER_PRINT_TIMEOUT_MILLIS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'metadataDataPoints', {
            get: function () {
              return this._configuration.metadataDataPoints
                ? this._configuration.metadataDataPoints
                : e.METADATA_DATA_POINTS_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'uiModelingBlacklistRegex', {
            get: function () {
              var t;
              return 'string' ==
                typeof (null === (t = this._configuration.uiModeling) || void 0 === t
                  ? void 0
                  : t.blacklistRegex)
                ? this._configuration.uiModeling.blacklistRegex
                : e.UI_MODELING_CONFIG_DEFAULT.blacklistRegex;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'uiModelingElementFilters', {
            get: function () {
              var t;
              return (
                null === (t = this._configuration.uiModeling) || void 0 === t
                  ? void 0
                  : t.uiElementFilters
              )
                ? this._configuration.uiModeling.uiElementFilters
                : e.UI_MODELING_CONFIG_DEFAULT.uiElementFilters;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'uiModelingMaxMatchingParents', {
            get: function () {
              var t;
              return 'number' ==
                typeof (null === (t = this._configuration.uiModeling) || void 0 === t
                  ? void 0
                  : t.maxMatchingParents)
                ? this._configuration.uiModeling.maxMatchingParents
                : e.UI_MODELING_CONFIG_DEFAULT.maxMatchingParents;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'uiControlsConfig', {
            get: function () {
              return t._POSignalsUtils.Util.isArray(this._configuration.uiControl)
                ? this._configuration.uiControl
                : e.UI_CONTROL_LIST_DEFAULT;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.ENABLED_DEFAULT = !0),
          (e.BUFFER_SIZE_DEFAULT = 10),
          (e.MAX_SNAPSHOTS_COUNT_DEFAULT = 500),
          (e.METADATA_BLACK_LIST_DEFAULT = []),
          (e.TAGS_BLACK_LIST_REGEX_DEFAULT = ''),
          (e.BEHAVIORAL_BLACK_LIST_DEFAULT = {}),
          (e.WEB_RTC_URL_DEFAULT = ''),
          (e.EVENTS_BLACK_LIST_DEFAULT = new Set()),
          (e.EVENTS_TO_IGNORE_DEFAULT = new Set([
            'pointerover',
            'pointerenter',
            'pointerdown',
            'pointermove',
            'pointerup',
            'pointercancel',
            'pointerout',
            'pointerleave',
            'dragstart',
            'dragexit',
            'drop',
            'dragend',
          ])),
          (e.MAX_INDIRECT_EVENTS_DEFAULT = 15),
          (e.HIGH_PRIORITY_INDIRECT_EVENTS_DEFAULT = new Set([
            'copy',
            'cut',
            'paste',
            'resize',
            'orientationchange',
            'languagechange',
            'submit',
            'select',
          ])),
          (e.INDIRECT_INTERVAL_MILLIS_DEFAULT = 1e3),
          (e.MOUSE_INTERVAL_MILLIS_DEFAULT = 1e3),
          (e.MOUSE_IDLE_TIMEOUT_MILLIS_DEFAULT = 1e3),
          (e.MAX_MOUSE_EVENTS_DEFAULT = 500),
          (e.KEYBOARD_FIELD_BLACK_LIST_DEFAULT = new Set()),
          (e.KEYBOARD_CSS_SELECTORS_DEFAULT = {}),
          (e.KEYBOARD_CSS_SELECTORS_BLACKLIST_DEFAULT = []),
          (e.KEYBOARD_IDENTIFIER_ATTRIBUTES_DEFAULT = [
            'data-selenium',
            'data-selenium-id',
            'data-testid',
            'data-test-id',
            'data-qa-id',
            'data-id',
            'id',
          ]),
          (e.REMOTE_TAGS_DEFAULT = {
            dv_form_submit: { selector: '[data-skbuttontype="form-submit"]' },
            login_attempt_email_domain: {
              selector: '[data-st-tag="login.login_attempt"]',
              operation: 'email_domain',
              valueSelector: '[data-st-field="username"]',
              valueMandatory: !0,
            },
            login_attempt_hash: {
              selector: '[data-st-tag="login.login_attempt"]',
              operation: 'obfuscate',
              valueSelector: '[data-st-field="username"]',
              valueMandatory: !0,
            },
            login_attempt_length: {
              selector: '[data-st-tag="login.login_attempt"]',
              operation: 'length',
              valueSelector: '[data-st-field="username"]',
              valueMandatory: !0,
            },
            registration_attempt_email_domain: {
              selector: '[data-st-tag="registration.registration_attempt"]',
              operation: 'email_domain',
              valueSelector: '[data-st-field="username"]',
              valueMandatory: !0,
            },
            registration_attempt_hash: {
              selector: '[data-st-tag="registration.registration_attempt"]',
              operation: 'obfuscate',
              valueSelector: '[data-st-field="username"]',
              valueMandatory: !0,
            },
            registration_attempt_length: {
              selector: '[data-st-tag="registration.registration_attempt"]',
              operation: 'length',
              valueSelector: '[data-st-field="username"]',
              valueMandatory: !0,
            },
          }),
          (e.MAX_SELECTOR_CHILDREN_DEFAULT = 2),
          (e.EVENTS_REDUCE_FACTOR_MAP_DEFAULT = {}),
          (e.PROPERTY_DESCRIPTORS_DEFAULT = {
            chrome: ['app', 'csi', 'loadtimes', 'runtime'],
            navigator: ['webdriver'],
            Navigator: ['languages', 'hardwareConcurrency'],
            window: ['outerWidth', 'outerHeight'],
            Screen: ['width', 'height'],
          }),
          (e.ADDITIONAL_MEDIA_CODECS_DEFAULT = {}),
          (e.FINGER_PRINT_TIMEOUT_MILLIS_DEFAULT = 3e3),
          (e.METADATA_DATA_POINTS_DEFAULT = {}),
          (e.UI_CONTROL_LIST_DEFAULT = []),
          (e.UI_MODELING_CONFIG_DEFAULT = {
            blacklistRegex: '',
            uiElementFilters: { text: { maxLength: 25 }, placeholder: { maxLength: 25 } },
            maxMatchingParents: 2,
          }),
          (e.SENSORS_DEFAULT = { maxSensorSamples: 1, sensorsDeltaInMillis: 0 }),
          e
        );
      })();
      t.PointerParams = e;
    })(_POSignalsEntities || (_POSignalsEntities = {}));
  window._POSignalsEntities = _POSignalsEntities;
  window._pingOneSignals = _pingOneSignals;
}

// Ping Identity INC.
// ï¿½ ALL RIGHTS RESERVED
//Build: 25 (5.6.4)  Tue Sep 16 2025 12:56:52 GMT+0000 (Coordinated Universal Time)
