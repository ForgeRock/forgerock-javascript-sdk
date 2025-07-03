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
      'use strict';
      var t = 'st-ping-div';
      function e(t) {
        'loading' !== document.readyState ? t() : document.addEventListener('DOMContentLoaded', t);
      }
      function n(n) {
        e(function () {
          if (n) {
            var e =
              (i = document.getElementById(t)) ||
              (((i = document.createElement('div')).style.border = 'none'),
              (i.style.position = 'absolute'),
              (i.style.top = '-999px'),
              (i.style.left = '-999px'),
              (i.style.width = '0'),
              (i.style.height = '0'),
              (i.style.visibility = 'hidden'),
              (i.style.overflow = 'hidden'),
              (i.id = t),
              document.body.appendChild(i),
              i);
            (window._pingOneSignalsToken = getComputedStyle(e, '::after').content.replace(
              /['"]+/g,
              '',
            )),
              document.dispatchEvent(new CustomEvent('PingOneSignalsTokenReadyEvent'));
          }
          var i, r;
          (r = 'Finished - ' + (n ? 'success' : 'failure')),
            window['enable-logs-pingOneSignals'] && console.log(r);
        });
      }
      var i,
        r,
        a,
        o,
        s = document.querySelector('script[data-pingOneSignalsSkipToken]');
      if (s && 'true' === s.getAttribute('data-pingOneSignalsSkipToken'))
        return (
          (window._pingOneSignalsToken = 'skipped_token_' + new Date().getTime()),
          e(function () {
            document.dispatchEvent(new CustomEvent('PingOneSignalsTokenSkippedEvent'));
          })
        );
      window._pingOneSignalsToken ||
        (window._pingOneSignalsToken = 'uninitialized_token_' + new Date().getTime()),
        (i = window._pingOneSignalsCustomHost || 'apps.pingone.com'),
        (r = { sdkVersion: '5.4.0w', platform: navigator.platform || '' }),
        (a = encodeURIComponent(
          (function (t) {
            var e,
              n,
              i,
              r,
              a,
              o,
              s,
              u = '',
              c = 0,
              l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            for (
              t = (function (t) {
                t = t.replace(/\r\n/g, '\n');
                for (var e = '', n = 0; n < t.length; n++) {
                  var i = t.charCodeAt(n);
                  i < 128
                    ? (e += String.fromCharCode(i))
                    : (127 < i && i < 2048
                        ? (e += String.fromCharCode((i >> 6) | 192))
                        : ((e += String.fromCharCode((i >> 12) | 224)),
                          (e += String.fromCharCode(((i >> 6) & 63) | 128))),
                      (e += String.fromCharCode((63 & i) | 128)));
                }
                return e;
              })(t);
              c < t.length;

            )
              (r = (e = t.charCodeAt(c++)) >> 2),
                (a = ((3 & e) << 4) | ((n = t.charCodeAt(c++)) >> 4)),
                (o = ((15 & n) << 2) | ((i = t.charCodeAt(c++)) >> 6)),
                (s = 63 & i),
                isNaN(n) ? (o = s = 64) : isNaN(i) && (s = 64),
                (u = u + l.charAt(r) + l.charAt(a) + l.charAt(o) + l.charAt(s));
            return u;
          })(
            (function (t, e) {
              for (var n = [], i = 0; i < t.length; i++) {
                var r = t.charCodeAt(i) ^ e.charCodeAt(i % e.length);
                n.push(String.fromCharCode(r));
              }
              return n.join('');
            })(JSON.stringify(r), 'dkiBm42'),
          ),
        )),
        ((o = document.createElement('link')).type = 'text/css'),
        (o.rel = 'stylesheet'),
        (o.href = 'https://' + i + '/signals/sdk/pong.css?body=' + a + '&e=2'),
        (document.head || document.getElementsByTagName('head')[0]).appendChild(o),
        (o.onload = function () {
          n(!0);
        }),
        (o.onerror = function () {
          n(!1);
        });
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
      function a(t) {
        if (!(this instanceof a)) throw new TypeError('Promises must be constructed via new');
        if ('function' != typeof t) throw new TypeError('not a function');
        (this._state = 0),
          (this._handled = !1),
          (this._value = void 0),
          (this._deferreds = []),
          l(t, this);
      }
      function o(t, e) {
        for (; 3 === t._state; ) t = t._value;
        0 !== t._state
          ? ((t._handled = !0),
            a._immediateFn(function () {
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
            if (e instanceof a) return (t._state = 3), (t._value = e), void c(t);
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
          a._immediateFn(function () {
            t._handled || a._unhandledRejectionFn(t._value);
          });
        for (var e = 0, n = t._deferreds.length; e < n; e++) o(t, t._deferreds[e]);
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
      (a.prototype.catch = function (t) {
        return this.then(null, t);
      }),
        (a.prototype.then = function (t, e) {
          var n = new this.constructor(r);
          return (
            o(
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
        (a.prototype.finally = e),
        (a.all = function (t) {
          return new a(function (e, n) {
            if (!i(t)) return n(new TypeError('Promise.all accepts an array'));
            var r = Array.prototype.slice.call(t);
            if (0 === r.length) return e([]);
            var a = r.length;
            function o(t, i) {
              try {
                if (i && ('object' == typeof i || 'function' == typeof i)) {
                  var s = i.then;
                  if ('function' == typeof s)
                    return void s.call(
                      i,
                      function (e) {
                        o(t, e);
                      },
                      n,
                    );
                }
                (r[t] = i), 0 == --a && e(r);
              } catch (t) {
                n(t);
              }
            }
            for (var s = 0; s < r.length; s++) o(s, r[s]);
          });
        }),
        (a.resolve = function (t) {
          return t && 'object' == typeof t && t.constructor === a
            ? t
            : new a(function (e) {
                e(t);
              });
        }),
        (a.reject = function (t) {
          return new a(function (e, n) {
            n(t);
          });
        }),
        (a.race = function (t) {
          return new a(function (e, n) {
            if (!i(t)) return n(new TypeError('Promise.race accepts an array'));
            for (var r = 0, o = t.length; r < o; r++) a.resolve(t[r]).then(e, n);
          });
        }),
        (a._immediateFn =
          ('function' == typeof setImmediate &&
            function (t) {
              setImmediate(t);
            }) ||
          function (t) {
            n(t, 0);
          }),
        (a._unhandledRejectionFn = function (t) {
          'undefined' != typeof console &&
            console &&
            console.warn('Possible Unhandled Promise Rejection:', t);
        }),
        'function' != typeof t.Promise
          ? (t.Promise = a)
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
            return new Promise(function (i, r, a) {
              n.queue.length >= n.maxQueuedPromises
                ? r(new Error('Queue limit reached'))
                : (n.queue.push({ promiseGenerator: e, resolve: i, reject: r, notify: a || t }),
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
        a = [24, 16, 8, 0],
        o = [
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
        var a,
          o = typeof t;
        if ('string' === o) {
          var s,
            u = [],
            c = t.length,
            l = 0;
          for (a = 0; a < c; ++a)
            (s = t.charCodeAt(a)) < 128
              ? (u[l++] = s)
              : s < 2048
                ? ((u[l++] = 192 | (s >> 6)), (u[l++] = 128 | (63 & s)))
                : s < 55296 || s >= 57344
                  ? ((u[l++] = 224 | (s >> 12)),
                    (u[l++] = 128 | ((s >> 6) & 63)),
                    (u[l++] = 128 | (63 & s)))
                  : ((s = 65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++a)))),
                    (u[l++] = 240 | (s >> 18)),
                    (u[l++] = 128 | ((s >> 12) & 63)),
                    (u[l++] = 128 | ((s >> 6) & 63)),
                    (u[l++] = 128 | (63 & s)));
          t = u;
        } else {
          if ('object' !== o) throw new Error(e);
          if (null === t) throw new Error(e);
          if (n && t.constructor === ArrayBuffer) t = new Uint8Array(t);
          else if (!(Array.isArray(t) || (n && ArrayBuffer.isView(t)))) throw new Error(e);
        }
        t.length > 64 && (t = new f(i, !0).update(t).array());
        var d = [],
          h = [];
        for (a = 0; a < 64; ++a) {
          var g = t[a] || 0;
          (d[a] = 92 ^ g), (h[a] = 54 ^ g);
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
          for (var o, s, u = 0, c = t.length, l = this.blocks; u < c; ) {
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
              for (s = this.start; u < c && s < 64; ++u) l[s >> 2] |= t[u] << a[3 & s++];
            else
              for (s = this.start; u < c && s < 64; ++u)
                (o = t.charCodeAt(u)) < 128
                  ? (l[s >> 2] |= o << a[3 & s++])
                  : o < 2048
                    ? ((l[s >> 2] |= (192 | (o >> 6)) << a[3 & s++]),
                      (l[s >> 2] |= (128 | (63 & o)) << a[3 & s++]))
                    : o < 55296 || o >= 57344
                      ? ((l[s >> 2] |= (224 | (o >> 12)) << a[3 & s++]),
                        (l[s >> 2] |= (128 | ((o >> 6) & 63)) << a[3 & s++]),
                        (l[s >> 2] |= (128 | (63 & o)) << a[3 & s++]))
                      : ((o = 65536 + (((1023 & o) << 10) | (1023 & t.charCodeAt(++u)))),
                        (l[s >> 2] |= (240 | (o >> 18)) << a[3 & s++]),
                        (l[s >> 2] |= (128 | ((o >> 12) & 63)) << a[3 & s++]),
                        (l[s >> 2] |= (128 | ((o >> 6) & 63)) << a[3 & s++]),
                        (l[s >> 2] |= (128 | (63 & o)) << a[3 & s++]));
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
            a,
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
                  ? ((a = 300032),
                    (_ = ((r = m[0] - 1413257819) - 150054599) << 0),
                    (f = (r + 24177077) << 0))
                  : ((a = 704751109),
                    (_ = ((r = m[0] - 210244248) - 1521486534) << 0),
                    (f = (r + 143694565) << 0)),
                (this.first = !1))
              : ((e =
                  ((l >>> 2) | (l << 30)) ^ ((l >>> 13) | (l << 19)) ^ ((l >>> 22) | (l << 10))),
                (i = (a = l & d) ^ (l & h) ^ c),
                (_ =
                  (f +
                    (r =
                      _ +
                      (n =
                        ((g >>> 6) | (g << 26)) ^
                        ((g >>> 11) | (g << 21)) ^
                        ((g >>> 25) | (g << 7))) +
                      ((g & p) ^ (~g & v)) +
                      o[t] +
                      m[t])) <<
                  0),
                (f = (r + (e + i)) << 0)),
              (e = ((f >>> 2) | (f << 30)) ^ ((f >>> 13) | (f << 19)) ^ ((f >>> 22) | (f << 10))),
              (i = (s = f & l) ^ (f & d) ^ a),
              (v =
                (h +
                  (r =
                    v +
                    (n =
                      ((_ >>> 6) | (_ << 26)) ^
                      ((_ >>> 11) | (_ << 21)) ^
                      ((_ >>> 25) | (_ << 7))) +
                    ((_ & g) ^ (~_ & p)) +
                    o[t + 1] +
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
                    o[t + 2] +
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
                    o[t + 3] +
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
            a = this.h4,
            o = this.h5,
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
              i[(a >> 28) & 15] +
              i[(a >> 24) & 15] +
              i[(a >> 20) & 15] +
              i[(a >> 16) & 15] +
              i[(a >> 12) & 15] +
              i[(a >> 8) & 15] +
              i[(a >> 4) & 15] +
              i[15 & a] +
              i[(o >> 28) & 15] +
              i[(o >> 24) & 15] +
              i[(o >> 20) & 15] +
              i[(o >> 16) & 15] +
              i[(o >> 12) & 15] +
              i[(o >> 8) & 15] +
              i[(o >> 4) & 15] +
              i[15 & o] +
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
            a = this.h5,
            o = this.h6,
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
              (a >> 24) & 255,
              (a >> 16) & 255,
              (a >> 8) & 255,
              255 & a,
              (o >> 24) & 255,
              (o >> 16) & 255,
              (o >> 8) & 255,
              255 & o,
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
      function e(t, e) {
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]),
          (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]);
        var n = [0, 0, 0, 0];
        return (
          (n[3] += t[3] + e[3]),
          (n[2] += n[3] >>> 16),
          (n[3] &= 65535),
          (n[2] += t[2] + e[2]),
          (n[1] += n[2] >>> 16),
          (n[2] &= 65535),
          (n[1] += t[1] + e[1]),
          (n[0] += n[1] >>> 16),
          (n[1] &= 65535),
          (n[0] += t[0] + e[0]),
          (n[0] &= 65535),
          [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
        );
      }
      function n(t, e) {
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]),
          (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]);
        var n = [0, 0, 0, 0];
        return (
          (n[3] += t[3] * e[3]),
          (n[2] += n[3] >>> 16),
          (n[3] &= 65535),
          (n[2] += t[2] * e[3]),
          (n[1] += n[2] >>> 16),
          (n[2] &= 65535),
          (n[2] += t[3] * e[2]),
          (n[1] += n[2] >>> 16),
          (n[2] &= 65535),
          (n[1] += t[1] * e[3]),
          (n[0] += n[1] >>> 16),
          (n[1] &= 65535),
          (n[1] += t[2] * e[2]),
          (n[0] += n[1] >>> 16),
          (n[1] &= 65535),
          (n[1] += t[3] * e[1]),
          (n[0] += n[1] >>> 16),
          (n[1] &= 65535),
          (n[0] += t[0] * e[3] + t[1] * e[2] + t[2] * e[1] + t[3] * e[0]),
          (n[0] &= 65535),
          [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
        );
      }
      function i(t, e) {
        return 32 == (e %= 64)
          ? [t[1], t[0]]
          : e < 32
            ? [(t[0] << e) | (t[1] >>> (32 - e)), (t[1] << e) | (t[0] >>> (32 - e))]
            : ((e -= 32), [(t[1] << e) | (t[0] >>> (32 - e)), (t[0] << e) | (t[1] >>> (32 - e))]);
      }
      function r(t, e) {
        return 0 == (e %= 64)
          ? t
          : e < 32
            ? [(t[0] << e) | (t[1] >>> (32 - e)), t[1] << e]
            : [t[1] << (e - 32), 0];
      }
      function a(t, e) {
        return [t[0] ^ e[0], t[1] ^ e[1]];
      }
      function o(t) {
        return (t = a(
          (t = n(
            (t = a((t = n((t = a(t, [0, t[0] >>> 1])), [4283543511, 3981806797])), [
              0,
              t[0] >>> 1,
            ])),
            [3301882366, 444984403],
          )),
          [0, t[0] >>> 1],
        ));
      }
      function s(t, s) {
        (t = t || ''), (s = s || 0);
        var u,
          c = t.length % 16,
          l = t.length - c,
          d = [0, s],
          h = [0, s],
          f = [0, 0],
          g = [0, 0],
          p = [2277735313, 289559509],
          v = [1291169091, 658871167];
        for (u = 0; u < l; u += 16)
          (f = [
            (255 & t.charCodeAt(u + 4)) |
              ((255 & t.charCodeAt(u + 5)) << 8) |
              ((255 & t.charCodeAt(u + 6)) << 16) |
              ((255 & t.charCodeAt(u + 7)) << 24),
            (255 & t.charCodeAt(u)) |
              ((255 & t.charCodeAt(u + 1)) << 8) |
              ((255 & t.charCodeAt(u + 2)) << 16) |
              ((255 & t.charCodeAt(u + 3)) << 24),
          ]),
            (g = [
              (255 & t.charCodeAt(u + 12)) |
                ((255 & t.charCodeAt(u + 13)) << 8) |
                ((255 & t.charCodeAt(u + 14)) << 16) |
                ((255 & t.charCodeAt(u + 15)) << 24),
              (255 & t.charCodeAt(u + 8)) |
                ((255 & t.charCodeAt(u + 9)) << 8) |
                ((255 & t.charCodeAt(u + 10)) << 16) |
                ((255 & t.charCodeAt(u + 11)) << 24),
            ]),
            (d = e(
              n(
                (d = e((d = i((d = a(d, (f = n((f = i((f = n(f, p)), 31)), v)))), 27)), h)),
                [0, 5],
              ),
              [0, 1390208809],
            )),
            (h = e(
              n(
                (h = e((h = i((h = a(h, (g = n((g = i((g = n(g, v)), 33)), p)))), 31)), d)),
                [0, 5],
              ),
              [0, 944331445],
            ));
        switch (((f = [0, 0]), (g = [0, 0]), c)) {
          case 15:
            g = a(g, r([0, t.charCodeAt(u + 14)], 48));
          case 14:
            g = a(g, r([0, t.charCodeAt(u + 13)], 40));
          case 13:
            g = a(g, r([0, t.charCodeAt(u + 12)], 32));
          case 12:
            g = a(g, r([0, t.charCodeAt(u + 11)], 24));
          case 11:
            g = a(g, r([0, t.charCodeAt(u + 10)], 16));
          case 10:
            g = a(g, r([0, t.charCodeAt(u + 9)], 8));
          case 9:
            h = a(h, (g = n((g = i((g = n((g = a(g, [0, t.charCodeAt(u + 8)])), v)), 33)), p)));
          case 8:
            f = a(f, r([0, t.charCodeAt(u + 7)], 56));
          case 7:
            f = a(f, r([0, t.charCodeAt(u + 6)], 48));
          case 6:
            f = a(f, r([0, t.charCodeAt(u + 5)], 40));
          case 5:
            f = a(f, r([0, t.charCodeAt(u + 4)], 32));
          case 4:
            f = a(f, r([0, t.charCodeAt(u + 3)], 24));
          case 3:
            f = a(f, r([0, t.charCodeAt(u + 2)], 16));
          case 2:
            f = a(f, r([0, t.charCodeAt(u + 1)], 8));
          case 1:
            d = a(d, (f = n((f = i((f = n((f = a(f, [0, t.charCodeAt(u)])), p)), 31)), v)));
        }
        return (
          (d = a(d, [0, t.length])),
          (h = e((h = a(h, [0, t.length])), (d = e(d, h)))),
          (d = o(d)),
          (h = e((h = o(h)), (d = e(d, h)))),
          ('00000000' + (d[0] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (d[1] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (h[0] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (h[1] >>> 0).toString(16)).slice(-8)
        );
      }
      var u = function () {
        return (u =
          Object.assign ||
          function (t) {
            for (var e, n = 1, i = arguments.length; n < i; n++)
              for (var r in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t;
          }).apply(this, arguments);
      };
      function c(t, e, n, i) {
        return new (n || (n = Promise))(function (r, a) {
          function o(t) {
            try {
              u(i.next(t));
            } catch (t) {
              a(t);
            }
          }
          function s(t) {
            try {
              u(i.throw(t));
            } catch (t) {
              a(t);
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
                    })).then(o, s);
          }
          u((i = i.apply(t, e || [])).next());
        });
      }
      function l(t, e) {
        var n,
          i,
          r,
          a,
          o = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (a = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (a[Symbol.iterator] = function () {
              return this;
            }),
          a
        );
        function s(a) {
          return function (s) {
            return (function (a) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; o; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & a[0]
                          ? i.return
                          : a[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, a[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                    case 0:
                    case 1:
                      r = a;
                      break;
                    case 4:
                      return o.label++, { value: a[1], done: !1 };
                    case 5:
                      o.label++, (i = a[1]), (a = [0]);
                      continue;
                    case 7:
                      (a = o.ops.pop()), o.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = o.trys).length > 0 && r[r.length - 1]) &&
                        (6 === a[0] || 2 === a[0])
                      ) {
                        o = 0;
                        continue;
                      }
                      if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                        o.label = a[1];
                        break;
                      }
                      if (6 === a[0] && o.label < r[1]) {
                        (o.label = r[1]), (r = a);
                        break;
                      }
                      if (r && o.label < r[2]) {
                        (o.label = r[2]), o.ops.push(a);
                        break;
                      }
                      r[2] && o.ops.pop(), o.trys.pop();
                      continue;
                  }
                  a = e.call(t, o);
                } catch (t) {
                  (a = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & a[0]) throw a[1];
              return { value: a[0] ? a[1] : void 0, done: !0 };
            })([a, s]);
          };
        }
      }
      var d = window;
      function h(t) {
        return parseInt(t);
      }
      function f(t) {
        return parseFloat(t);
      }
      function g(t) {
        return t.reduce(function (t, e) {
          return t + (e ? 1 : 0);
        }, 0);
      }
      var p = window,
        v = navigator,
        _ = document;
      function m() {
        return (
          g([
            'MSCSSMatrix' in p,
            'msSetImmediate' in p,
            'msIndexedDB' in p,
            'msMaxTouchPoints' in v,
            'msPointerEnabled' in v,
          ]) >= 4
        );
      }
      function y() {
        return (
          g(['msWriteProfilerMark' in p, 'MSStream' in p, 'msLaunchUri' in v, 'msSaveBlob' in v]) >=
            3 && !m()
        );
      }
      function b() {
        return (
          g([
            'webkitPersistentStorage' in v,
            'webkitTemporaryStorage' in v,
            0 === v.vendor.indexOf('Google'),
            'webkitResolveLocalFileSystemURL' in p,
            'BatteryManager' in p,
            'webkitMediaStream' in p,
            'webkitSpeechGrammar' in p,
          ]) >= 5
        );
      }
      function w() {
        return (
          g([
            'ApplePayError' in p,
            'CSSPrimitiveValue' in p,
            'Counter' in p,
            0 === v.vendor.indexOf('Apple'),
            'getStorageUpdates' in v,
            'WebKitMediaKeys' in p,
          ]) >= 4
        );
      }
      function E() {
        return (
          g([
            'safari' in p,
            !('DeviceMotionEvent' in p),
            !('ongestureend' in p),
            !('standalone' in v),
          ]) >= 3
        );
      }
      var S = window,
        O = document;
      function A(t, e, n) {
        (function (t) {
          return t && 'function' == typeof t.setValueAtTime;
        })(e) && e.setValueAtTime(n, t.currentTime);
      }
      function P(t) {
        var e = new Error(t);
        return (e.name = t), e;
      }
      var T = document,
        I = 'mmMwWLliI0O&1',
        D = ['monospace', 'sans-serif', 'serif'],
        C = [
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
        ],
        M = {
          fontStyle: 'normal',
          fontWeight: 'normal',
          letterSpacing: 'normal',
          lineBreak: 'auto',
          lineHeight: 'normal',
          textTransform: 'none',
          textAlign: 'left',
          textDecoration: 'none',
          textShadow: 'none',
          whiteSpace: 'normal',
          wordBreak: 'normal',
          wordSpacing: 'normal',
          position: 'absolute',
          left: '-9999px',
          fontSize: '48px',
        },
        L = navigator,
        U = window,
        k = navigator,
        x = window,
        R = window,
        N = window,
        B = document,
        H = {
          osCpu: function () {
            return navigator.oscpu;
          },
          languages: function () {
            var t = [],
              e = k.language || k.userLanguage || k.browserLanguage || k.systemLanguage;
            if ((void 0 !== e && t.push([e]), Array.isArray(k.languages)))
              (b() &&
                g([
                  !('MediaSettingsRange' in p),
                  'RTCEncodedAudioFrame' in p,
                  '' + p.Intl == '[object Intl]',
                  '' + p.Reflect == '[object Reflect]',
                ]) >= 3) ||
                t.push(k.languages);
            else if ('string' == typeof k.languages) {
              var n = k.languages;
              n && t.push(n.split(','));
            }
            return t;
          },
          colorDepth: function () {
            return window.screen.colorDepth;
          },
          deviceMemory: function () {
            return (
              (t = f(navigator.deviceMemory)),
              (e = void 0),
              'number' == typeof t && isNaN(t) ? e : t
            );
            var t, e;
          },
          screenResolution: function () {
            var t = [h(x.screen.width), h(x.screen.height)];
            return t.sort().reverse(), t;
          },
          availableScreenResolution: function () {
            if (R.screen.availWidth && R.screen.availHeight) {
              var t = [h(R.screen.availWidth), h(R.screen.availHeight)];
              return t.sort().reverse(), t;
            }
          },
          hardwareConcurrency: function () {
            try {
              var t = h(navigator.hardwareConcurrency);
              return isNaN(t) ? 1 : t;
            } catch (t) {
              return 1;
            }
          },
          timezoneOffset: function () {
            var t = new Date().getFullYear();
            return Math.max(
              f(new Date(t, 0, 1).getTimezoneOffset()),
              f(new Date(t, 6, 1).getTimezoneOffset()),
            );
          },
          timezone: function () {
            var t;
            if (null === (t = N.Intl) || void 0 === t ? void 0 : t.DateTimeFormat)
              return new N.Intl.DateTimeFormat().resolvedOptions().timeZone;
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
            if (!m() && !y())
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
            return navigator.platform;
          },
          plugins: function () {
            if (m()) return [];
            if (navigator.plugins) {
              for (var t = [], e = 0; e < navigator.plugins.length; ++e) {
                var n = navigator.plugins[e];
                if (n) {
                  for (var i = [], r = 0; r < n.length; ++r) {
                    var a = n[r];
                    i.push({ type: a.type, suffixes: a.suffixes });
                  }
                  t.push({ name: n.name, description: n.description, mimeTypes: i });
                }
              }
              return t;
            }
          },
          canvas: function () {
            var t = (function () {
                var t = document.createElement('canvas');
                return (
                  (t.width = 240),
                  (t.height = 140),
                  (t.style.display = 'inline'),
                  [t, t.getContext('2d')]
                );
              })(),
              e = t[0],
              n = t[1];
            if (
              !(function (t, e) {
                return !(!e || !t.toDataURL);
              })(e, n)
            )
              return { winding: !1, data: '' };
            n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6);
            var i = !n.isPointInPath(5, 5, 'evenodd');
            return (
              (n.textBaseline = 'alphabetic'),
              (n.fillStyle = '#f60'),
              n.fillRect(125, 1, 62, 20),
              (n.fillStyle = '#069'),
              (n.font = '11pt no-real-font-123'),
              n.fillText('Cwm fjordbank ðŸ˜ƒ gly', 2, 15),
              (n.fillStyle = 'rgba(102, 204, 0, 0.2)'),
              (n.font = '18pt Arial'),
              n.fillText('Cwm fjordbank ðŸ˜ƒ gly', 4, 45),
              (n.globalCompositeOperation = 'multiply'),
              (n.fillStyle = 'rgb(255,0,255)'),
              n.beginPath(),
              n.arc(50, 50, 50, 0, 2 * Math.PI, !0),
              n.closePath(),
              n.fill(),
              (n.fillStyle = 'rgb(0,255,255)'),
              n.beginPath(),
              n.arc(100, 50, 50, 0, 2 * Math.PI, !0),
              n.closePath(),
              n.fill(),
              (n.fillStyle = 'rgb(255,255,0)'),
              n.beginPath(),
              n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
              n.closePath(),
              n.fill(),
              (n.fillStyle = 'rgb(255,0,255)'),
              n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
              n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
              n.fill('evenodd'),
              {
                winding: i,
                data: (function (t) {
                  return t.toDataURL();
                })(e),
              }
            );
          },
          touchSupport: function () {
            var t,
              e = 0;
            void 0 !== L.maxTouchPoints
              ? (e = h(L.maxTouchPoints))
              : void 0 !== L.msMaxTouchPoints && (e = L.msMaxTouchPoints);
            try {
              document.createEvent('TouchEvent'), (t = !0);
            } catch (e) {
              t = !1;
            }
            return { maxTouchPoints: e, touchEvent: t, touchStart: 'ontouchstart' in U };
          },
          fonts: function () {
            var t = T.body,
              e = T.createElement('div'),
              n = T.createElement('div'),
              i = {},
              r = {},
              a = function () {
                var t = T.createElement('span');
                t.textContent = I;
                for (var e = 0, n = Object.keys(M); e < n.length; e++) {
                  var i = n[e];
                  t.style[i] = M[i];
                }
                return t;
              },
              o = function (t) {
                return D.some(function (e, n) {
                  return t[n].offsetWidth !== i[e] || t[n].offsetHeight !== r[e];
                });
              },
              s = D.map(function (t) {
                var n = a();
                return (n.style.fontFamily = t), e.appendChild(n), n;
              });
            t.appendChild(e);
            for (var u = 0, c = D.length; u < c; u++)
              (i[D[u]] = s[u].offsetWidth), (r[D[u]] = s[u].offsetHeight);
            var l = (function () {
              for (
                var t = {},
                  e = function (e) {
                    t[e] = D.map(function (t) {
                      var i = (function (t, e) {
                        var n = a();
                        return (n.style.fontFamily = "'" + t + "'," + e), n;
                      })(e, t);
                      return n.appendChild(i), i;
                    });
                  },
                  i = 0,
                  r = C;
                i < r.length;
                i++
              )
                e(r[i]);
              return t;
            })();
            t.appendChild(n);
            for (var d = [], h = 0, f = C.length; h < f; h++) o(l[C[h]]) && d.push(C[h]);
            return t.removeChild(n), t.removeChild(e), d;
          },
          audio: function () {
            return c(this, void 0, void 0, function () {
              var t, e, n, i, r, a;
              return l(this, function (o) {
                switch (o.label) {
                  case 0:
                    if (!(t = S.OfflineAudioContext || S.webkitOfflineAudioContext)) return [2, -2];
                    if (
                      w() &&
                      !E() &&
                      !(
                        g([
                          'DOMRectList' in p,
                          'RTCPeerConnectionIceEvent' in p,
                          'SVGGeometryElement' in p,
                          'ontransitioncancel' in p,
                        ]) >= 3
                      )
                    )
                      return [2, -1];
                    (e = new t(1, 44100, 44100)),
                      ((n = e.createOscillator()).type = 'triangle'),
                      A(e, n.frequency, 1e4),
                      (i = e.createDynamicsCompressor()),
                      A(e, i.threshold, -50),
                      A(e, i.knee, 40),
                      A(e, i.ratio, 12),
                      A(e, i.reduction, -20),
                      A(e, i.attack, 0),
                      A(e, i.release, 0.25),
                      n.connect(i),
                      i.connect(e.destination),
                      n.start(0),
                      (o.label = 1);
                  case 1:
                    return (
                      o.trys.push([1, 3, 4, 5]),
                      [
                        4,
                        (function (t) {
                          return new Promise(function (e, n) {
                            t.oncomplete = function (t) {
                              return e(t.renderedBuffer);
                            };
                            var i = 3,
                              r = function () {
                                switch ((t.startRendering(), t.state)) {
                                  case 'running':
                                    setTimeout(function () {
                                      return n(P('timeout'));
                                    }, 1e3);
                                    break;
                                  case 'suspended':
                                    O.hidden || i--, i > 0 ? setTimeout(r, 500) : n(P('suspended'));
                                }
                              };
                            r();
                          });
                        })(e),
                      ]
                    );
                  case 2:
                    return (r = o.sent()), [3, 5];
                  case 3:
                    if ('timeout' === (a = o.sent()).name || 'suspended' === a.name) return [2, -3];
                    throw a;
                  case 4:
                    return n.disconnect(), i.disconnect(), [7];
                  case 5:
                    return [
                      2,
                      (function (t) {
                        for (var e = 0, n = 4500; n < 5e3; ++n) e += Math.abs(t[n]);
                        return e;
                      })(r.getChannelData(0)),
                    ];
                }
              });
            });
          },
          pluginsSupport: function () {
            return void 0 !== navigator.plugins;
          },
          productSub: function () {
            return navigator.productSub;
          },
          emptyEvalLength: function () {
            return eval.toString().length;
          },
          errorFF: function () {
            try {
              throw 'a';
            } catch (t) {
              try {
                return t.toSource(), !0;
              } catch (t) {
                return !1;
              }
            }
          },
          vendor: function () {
            return navigator.vendor;
          },
          chrome: function () {
            return void 0 !== window.chrome;
          },
          cookiesEnabled: function () {
            try {
              B.cookie = 'cookietest=1; SameSite=Strict;';
              var t = -1 !== B.cookie.indexOf('cookietest=');
              return (
                (B.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'),
                t
              );
            } catch (t) {
              return !1;
            }
          },
        };
      function F(t, e, n) {
        return c(this, void 0, void 0, function () {
          var i, r, a, o, s, c, d, h, f;
          return l(this, function (l) {
            switch (l.label) {
              case 0:
                (i = Date.now()), (r = {}), (a = 0), (o = Object.keys(t)), (l.label = 1);
              case 1:
                if (!(a < o.length)) return [3, 7];
                if (
                  ((s = o[a]),
                  (function (t, e) {
                    for (var n = 0, i = t.length; n < i; ++n) if (t[n] === e) return !0;
                    return !1;
                  })(n, s))
                )
                  return [3, 6];
                (c = void 0), (l.label = 2);
              case 2:
                return l.trys.push([2, 4, , 5]), (f = {}), [4, t[s](e)];
              case 3:
                return (f.value = l.sent()), (c = f), [3, 5];
              case 4:
                return (
                  (d = l.sent()),
                  (c =
                    d && 'object' == typeof d && 'message' in d
                      ? { error: d }
                      : { error: { message: d } }),
                  [3, 5]
                );
              case 5:
                (h = Date.now()), (r[s] = u(u({}, c), { duration: h - i })), (i = h), (l.label = 6);
              case 6:
                return a++, [3, 1];
              case 7:
                return [2, r];
            }
          });
        });
      }
      function j(t) {
        return JSON.stringify(
          t,
          function (t, e) {
            return e instanceof Error
              ? u(
                  {
                    name: (n = e).name,
                    message: n.message,
                    stack: null === (i = n.stack) || void 0 === i ? void 0 : i.split('\n'),
                  },
                  n,
                )
              : e;
            var n, i;
          },
          2,
        );
      }
      function G(t) {
        return s(
          (function (t) {
            for (var e = '', n = 0, i = Object.keys(t); n < i.length; n++) {
              var r = i[n],
                a = t[r],
                o = a.error ? 'error' : JSON.stringify(a.value);
              e += (e ? '|' : '') + r.replace(/([:|\\])/g, '\\$1') + ':' + o;
            }
            return e;
          })(t),
        );
      }
      var V = (function () {
        function t() {}
        return (
          (t.prototype.get = function (t) {
            return (
              void 0 === t && (t = {}),
              c(this, void 0, void 0, function () {
                var e, n;
                return l(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [4, F(H, void 0, [])];
                    case 1:
                      return (
                        (e = i.sent()),
                        (n = (function (t) {
                          var e;
                          return {
                            components: t,
                            get visitorId() {
                              return void 0 === e && (e = G(this.components)), e;
                            },
                            set visitorId(t) {
                              e = t;
                            },
                          };
                        })(e)),
                        t.debug &&
                          console.log(
                            'Copy the text below to get the debug data:\n\n```\nversion: 3.0.5\nuserAgent: ' +
                              navigator.userAgent +
                              '\ngetOptions: ' +
                              JSON.stringify(t, void 0, 2) +
                              '\nvisitorId: ' +
                              n.visitorId +
                              '\ncomponents: ' +
                              j(e) +
                              '\n```',
                          ),
                        [2, n]
                      );
                  }
                });
              })
            );
          }),
          t
        );
      })();
      function z(t) {
        var e = (void 0 === t ? {} : t).delayFallback,
          n = void 0 === e ? 50 : e;
        return c(this, void 0, void 0, function () {
          return l(this, function (t) {
            switch (t.label) {
              case 0:
                return [
                  4,
                  ((e = n),
                  (i = 2 * n),
                  void 0 === i && (i = 1 / 0),
                  new Promise(function (t) {
                    d.requestIdleCallback
                      ? d.requestIdleCallback(
                          function () {
                            return t();
                          },
                          { timeout: i },
                        )
                      : setTimeout(t, Math.min(e, i));
                  })),
                ];
              case 1:
                return t.sent(), [2, new V()];
            }
            var e, i;
          });
        });
      }
      var K = { load: z, hashComponents: G, componentsToDebugString: j },
        W = s;
      return (
        (t.componentsToDebugString = j),
        (t.default = K),
        (t.getComponents = F),
        (t.hashComponents = G),
        (t.isChromium = b),
        (t.isDesktopSafari = E),
        (t.isEdgeHTML = y),
        (t.isGecko = function () {
          var t;
          return (
            g([
              'buildID' in v,
              (null === (t = _.documentElement) || void 0 === t ? void 0 : t.style) &&
                'MozAppearance' in _.documentElement.style,
              'MediaRecorderErrorEvent' in p,
              'mozInnerScreenX' in p,
              'CSSMozDocumentRule' in p,
              'CanvasCaptureMediaStream' in p,
            ]) >= 4
          );
        }),
        (t.isTrident = m),
        (t.isWebKit = w),
        (t.load = z),
        (t.murmurX64Hash128 = W),
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
            a = n.call(t),
            o = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = a.next()).done; ) o.push(i.value);
          } catch (t) {
            r = { error: t };
          } finally {
            try {
              i && !i.done && (n = a.return) && n.call(a);
            } finally {
              if (r) throw r.error;
            }
          }
          return o;
        },
        r = function (t, e, n) {
          if (n || 2 === arguments.length)
            for (var i, r = 0, a = e.length; r < a; r++)
              (!i && r in e) || (i || (i = Array.prototype.slice.call(e, 0, r)), (i[r] = e[r]));
          return t.concat(i || Array.prototype.slice.call(e));
        },
        a = new WeakMap(),
        o = new WeakMap(),
        s = new WeakMap(),
        u = new WeakMap(),
        c = new WeakMap(),
        l = {
          get: function (t, e, n) {
            if (t instanceof IDBTransaction) {
              if ('done' === e) return o.get(t);
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
                return t.apply(g(this), e), f(a.get(this));
              }
            : function () {
                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                return f(t.apply(g(this), e));
              }
          : function (e) {
              for (var n = [], a = 1; a < arguments.length; a++) n[a - 1] = arguments[a];
              var o = t.call.apply(t, r([g(this), e], i(n), !1));
              return s.set(o, e.sort ? e.sort() : [e]), f(o);
            };
      }
      function h(t) {
        return 'function' == typeof t
          ? d(t)
          : (t instanceof IDBTransaction &&
              (function (t) {
                if (!o.has(t)) {
                  var e = new Promise(function (e, n) {
                    var i = function () {
                        t.removeEventListener('complete', r),
                          t.removeEventListener('error', a),
                          t.removeEventListener('abort', a);
                      },
                      r = function () {
                        e(), i();
                      },
                      a = function () {
                        n(t.error || new DOMException('AbortError', 'AbortError')), i();
                      };
                    t.addEventListener('complete', r),
                      t.addEventListener('error', a),
                      t.addEventListener('abort', a);
                  });
                  o.set(t, e);
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
                  e.removeEventListener('success', r), e.removeEventListener('error', a);
                },
                r = function () {
                  t(f(e.result)), i();
                },
                a = function () {
                  n(e.error), i();
                };
              e.addEventListener('success', r), e.addEventListener('error', a);
            }))
              .then(function (t) {
                t instanceof IDBCursor && a.set(t, e);
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
          return new (n || (n = Promise))(function (r, a) {
            function o(t) {
              try {
                u(i.next(t));
              } catch (t) {
                a(t);
              }
            }
            function s(t) {
              try {
                u(i.throw(t));
              } catch (t) {
                a(t);
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
                      })).then(o, s);
            }
            u((i = i.apply(t, e || [])).next());
          });
        },
        _ = function (t, e) {
          var n,
            i,
            r,
            a,
            o = {
              label: 0,
              sent: function () {
                if (1 & r[0]) throw r[1];
                return r[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(a) {
            return function (s) {
              return (function (a) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; o; )
                  try {
                    if (
                      ((n = 1),
                      i &&
                        (r =
                          2 & a[0]
                            ? i.return
                            : a[0]
                              ? i.throw || ((r = i.return) && r.call(i), 0)
                              : i.next) &&
                        !(r = r.call(i, a[1])).done)
                    )
                      return r;
                    switch (((i = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                      case 0:
                      case 1:
                        r = a;
                        break;
                      case 4:
                        return o.label++, { value: a[1], done: !1 };
                      case 5:
                        o.label++, (i = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !(
                            (r = (r = o.trys).length > 0 && r[r.length - 1]) ||
                            (6 !== a[0] && 2 !== a[0])
                          )
                        ) {
                          o = 0;
                          continue;
                        }
                        if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                          o.label = a[1];
                          break;
                        }
                        if (6 === a[0] && o.label < r[1]) {
                          (o.label = r[1]), (r = a);
                          break;
                        }
                        if (r && o.label < r[2]) {
                          (o.label = r[2]), o.ops.push(a);
                          break;
                        }
                        r[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    a = e.call(t, o);
                  } catch (t) {
                    (a = [6, t]), (i = 0);
                  } finally {
                    n = r = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, s]);
            };
          }
        },
        m = function (t, e) {
          var n = 'function' == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var i,
            r,
            a = n.call(t),
            o = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = a.next()).done; ) o.push(i.value);
          } catch (t) {
            r = { error: t };
          } finally {
            try {
              i && !i.done && (n = a.return) && n.call(a);
            } finally {
              if (r) throw r.error;
            }
          }
          return o;
        },
        y = function (t, e, n) {
          if (n || 2 === arguments.length)
            for (var i, r = 0, a = e.length; r < a; r++)
              (!i && r in e) || (i || (i = Array.prototype.slice.call(e, 0, r)), (i[r] = e[r]));
          return t.concat(i || Array.prototype.slice.call(e));
        },
        b = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
        w = ['put', 'add', 'delete', 'clear'],
        E = new Map();
      function S(t, e) {
        if (t instanceof IDBDatabase && !(e in t) && 'string' == typeof e) {
          if (E.get(e)) return E.get(e);
          var n = e.replace(/FromIndex$/, ''),
            i = e !== n,
            r = w.includes(n);
          if (n in (i ? IDBIndex : IDBObjectStore).prototype && (r || b.includes(n))) {
            var a = function (t) {
              for (var e = [], a = 1; a < arguments.length; a++) e[a - 1] = arguments[a];
              return v(this, void 0, void 0, function () {
                var a, o, s;
                return _(this, function (u) {
                  switch (u.label) {
                    case 0:
                      return (
                        (a = this.transaction(t, r ? 'readwrite' : 'readonly')),
                        (o = a.store),
                        i && (o = o.index(e.shift())),
                        [4, Promise.all([(s = o)[n].apply(s, y([], m(e), !1)), r && a.done])]
                      );
                    case 1:
                      return [2, u.sent()[0]];
                  }
                });
              });
            };
            return E.set(e, a), a;
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
            a = i.upgrade,
            o = i.blocking,
            s = i.terminated,
            u = indexedDB.open(t, e),
            c = f(u);
          return (
            a &&
              u.addEventListener('upgradeneeded', function (t) {
                a(f(u.result), t.oldVersion, t.newVersion, f(u.transaction), t);
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
                  o &&
                    t.addEventListener('versionchange', function (t) {
                      return o(t.oldVersion, t.newVersion, t);
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
                var r, a, o;
                (r = setTimeout(function () {
                  i._requests[n.id] &&
                    (delete i._requests[n.id],
                    e(new Error('Timeout: could not perform ' + n.method)));
                }, i._timeout)),
                  (i._requests[n.id] = function (a, o) {
                    if ((clearTimeout(r), delete i._requests[n.id], a)) return e(new Error(a));
                    t(o);
                  }),
                  Array.prototype.toJSON &&
                    ((a = Array.prototype.toJSON), (Array.prototype.toJSON = null)),
                  (o = 'file://' === i._origin ? '*' : i._origin),
                  i._hub.postMessage(JSON.stringify(n), o),
                  a && (Array.prototype.toJSON = a);
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
                for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a]);
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
            a = arguments.length > 1 ? arguments[1] : void 0;
          if (void 0 !== a) {
            if (!e(a))
              throw new TypeError(
                'Array.from: when provided, the second argument must be a function',
              );
            arguments.length > 2 && (r = arguments[2]);
          }
          for (
            var o, s = i(n.length), u = e(this) ? Object(new this(s)) : new Array(s), c = 0;
            c < s;

          )
            (o = n[c]), (u[c] = a ? (void 0 === r ? a(o, c) : a.call(r, o, c)) : o), (c += 1);
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
      var n = 'model',
        i = 'name',
        r = 'type',
        a = 'vendor',
        o = 'version',
        s = 'mobile',
        u = 'tablet',
        c = 'smarttv',
        l = function (t) {
          for (var e = {}, n = 0; n < t.length; n++) e[t[n].toUpperCase()] = t[n];
          return e;
        },
        d = function (t, e) {
          return 'string' == typeof t && -1 !== h(e).indexOf(h(t));
        },
        h = function (t) {
          return t.toLowerCase();
        },
        f = function (t, e) {
          if ('string' == typeof t)
            return (
              (t = t.replace(/^\s\s*/, '').replace(/\s\s*$/, '')),
              void 0 === e ? t : t.substring(0, 255)
            );
        },
        g = function (t, e) {
          for (var n, i, r, a, o, s, u = 0; u < e.length && !o; ) {
            var c = e[u],
              l = e[u + 1];
            for (n = i = 0; n < c.length && !o; )
              if ((o = c[n++].exec(t)))
                for (r = 0; r < l.length; r++)
                  (s = o[++i]),
                    'object' == typeof (a = l[r]) && a.length > 0
                      ? 2 === a.length
                        ? 'function' == typeof a[1]
                          ? (this[a[0]] = a[1].call(this, s))
                          : (this[a[0]] = a[1])
                        : 3 === a.length
                          ? 'function' != typeof a[1] || (a[1].exec && a[1].test)
                            ? (this[a[0]] = s ? s.replace(a[1], a[2]) : void 0)
                            : (this[a[0]] = s ? a[1].call(this, s, a[2]) : void 0)
                          : 4 === a.length &&
                            (this[a[0]] = s ? a[3].call(this, s.replace(a[1], a[2])) : void 0)
                      : (this[a] = s || void 0);
            u += 2;
          }
        },
        p = function (t, e) {
          for (var n in e)
            if ('object' == typeof e[n] && e[n].length > 0) {
              for (var i = 0; i < e[n].length; i++)
                if (d(e[n][i], t)) return '?' === n ? void 0 : n;
            } else if (d(e[n], t)) return '?' === n ? void 0 : n;
          return t;
        },
        v = {
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
        _ = {
          browser: [
            [/\b(?:crmo|crios)\/([\w\.]+)/i],
            [o, [i, 'Chrome']],
            [/edg(?:e|ios|a)?\/([\w\.]+)/i],
            [o, [i, 'Edge']],
            [
              /(opera mini)\/([-\w\.]+)/i,
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
            ],
            [i, o],
            [/opios[\/ ]+([\w\.]+)/i],
            [o, [i, 'Opera Mini']],
            [/\bopr\/([\w\.]+)/i],
            [o, [i, 'Opera']],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
              /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
              /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
              /(?:ms|\()(ie) ([\w\.]+)/i,
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,
              /(weibo)__([\d\.]+)/i,
            ],
            [i, o],
            [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
            [o, [i, 'UCBrowser']],
            [/\bqbcore\/([\w\.]+)/i],
            [o, [i, 'WeChat(Win) Desktop']],
            [/micromessenger\/([\w\.]+)/i],
            [o, [i, 'WeChat']],
            [/konqueror\/([\w\.]+)/i],
            [o, [i, 'Konqueror']],
            [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
            [o, [i, 'IE']],
            [/yabrowser\/([\w\.]+)/i],
            [o, [i, 'Yandex']],
            [/(avast|avg)\/([\w\.]+)/i],
            [[i, /(.+)/, '$1 Secure Browser'], o],
            [/\bfocus\/([\w\.]+)/i],
            [o, [i, 'Firefox Focus']],
            [/\bopt\/([\w\.]+)/i],
            [o, [i, 'Opera Touch']],
            [/coc_coc\w+\/([\w\.]+)/i],
            [o, [i, 'Coc Coc']],
            [/dolfin\/([\w\.]+)/i],
            [o, [i, 'Dolphin']],
            [/coast\/([\w\.]+)/i],
            [o, [i, 'Opera Coast']],
            [/miuibrowser\/([\w\.]+)/i],
            [o, [i, 'MIUI Browser']],
            [/fxios\/([-\w\.]+)/i],
            [o, [i, 'Firefox']],
            [/\bqihu|(qi?ho?o?|360)browser/i],
            [[i, '360 Browser']],
            [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],
            [[i, /(.+)/, '$1 Browser'], o],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [[i, /_/g, ' '], o],
            [
              /(electron)\/([\w\.]+) safari/i,
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
            ],
            [i, o],
            [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i],
            [i],
            [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
            [[i, 'Facebook'], o],
            [
              /safari (line)\/([\w\.]+)/i,
              /\b(line)\/([\w\.]+)\/iab/i,
              /(chromium|instagram)[\/ ]([-\w\.]+)/i,
            ],
            [i, o],
            [/\bgsa\/([\w\.]+) .*safari\//i],
            [o, [i, 'GSA']],
            [/headlesschrome(?:\/([\w\.]+)| )/i],
            [o, [i, 'Chrome Headless']],
            [/ wv\).+(chrome)\/([\w\.]+)/i],
            [[i, 'Chrome WebView'], o],
            [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
            [o, [i, 'Android Browser']],
            [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
            [i, o],
            [/version\/([\w\.]+) .*mobile\/\w+ (safari)/i],
            [o, [i, 'Mobile Safari']],
            [/version\/([\w\.]+) .*(mobile ?safari|safari)/i],
            [o, i],
            [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
            [
              i,
              [
                o,
                p,
                {
                  '1.0': '/8',
                  1.2: '/1',
                  1.3: '/3',
                  '2.0': '/412',
                  '2.0.2': '/416',
                  '2.0.3': '/417',
                  '2.0.4': '/419',
                  '?': '/',
                },
              ],
            ],
            [/(webkit|khtml)\/([\w\.]+)/i],
            [i, o],
            [/(navigator|netscape\d?)\/([-\w\.]+)/i],
            [[i, 'Netscape'], o],
            [/mobile vr; rv:([\w\.]+)\).+firefox/i],
            [o, [i, 'Firefox Reality']],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              /(firefox)\/([\w\.]+)/i,
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              /(links) \(([\w\.]+)/i,
            ],
            [i, o],
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
            [['architecture', 'amd64']],
            [/(ia32(?=;))/i],
            [['architecture', h]],
            [/((?:i[346]|x)86)[;\)]/i],
            [['architecture', 'ia32']],
            [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
            [['architecture', 'arm64']],
            [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
            [['architecture', 'armhf']],
            [/windows (ce|mobile); ppc;/i],
            [['architecture', 'arm']],
            [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
            [['architecture', /ower/, '', h]],
            [/(sun4\w)[;\)]/i],
            [['architecture', 'sparc']],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
            ],
            [['architecture', h]],
          ],
          device: [
            [/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
            [n, [a, 'Samsung'], [r, u]],
            [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
            [n, [a, 'Samsung'], [r, s]],
            [/\((ip(?:hone|od)[\w ]*);/i],
            [n, [a, 'Apple'], [r, s]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
            ],
            [n, [a, 'Apple'], [r, u]],
            [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
            [n, [a, 'Huawei'], [r, u]],
            [
              /(?:huawei|honor)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i,
            ],
            [n, [a, 'Huawei'], [r, s]],
            [
              /\b(poco[\w ]+)(?: bui|\))/i,
              /\b; (\w+) build\/hm\1/i,
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
            ],
            [
              [n, /_/g, ' '],
              [a, 'Xiaomi'],
              [r, s],
            ],
            [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
            [
              [n, /_/g, ' '],
              [a, 'Xiaomi'],
              [r, u],
            ],
            [
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
            ],
            [n, [a, 'OPPO'], [r, s]],
            [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
            [n, [a, 'Vivo'], [r, s]],
            [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
            [n, [a, 'Realme'], [r, s]],
            [
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
            ],
            [n, [a, 'Motorola'], [r, s]],
            [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
            [n, [a, 'Motorola'], [r, u]],
            [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
            [n, [a, 'LG'], [r, u]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
              /\blg-?([\d\w]+) bui/i,
            ],
            [n, [a, 'LG'], [r, s]],
            [
              /(ideatab[-\w ]+)/i,
              /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
            ],
            [n, [a, 'Lenovo'], [r, u]],
            [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
            [
              [n, /_/g, ' '],
              [a, 'Nokia'],
              [r, s],
            ],
            [/(pixel c)\b/i],
            [n, [a, 'Google'], [r, u]],
            [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
            [n, [a, 'Google'], [r, s]],
            [
              /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
            ],
            [n, [a, 'Sony'], [r, s]],
            [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
            [
              [n, 'Xperia Tablet'],
              [a, 'Sony'],
              [r, u],
            ],
            [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
            [n, [a, 'OnePlus'], [r, s]],
            [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
            [n, [a, 'Amazon'], [r, u]],
            [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
            [
              [n, /(.+)/g, 'Fire Phone $1'],
              [a, 'Amazon'],
              [r, s],
            ],
            [/(playbook);[-\w\),; ]+(rim)/i],
            [n, a, [r, u]],
            [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
            [n, [a, 'BlackBerry'], [r, s]],
            [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
            [n, [a, 'ASUS'], [r, u]],
            [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
            [n, [a, 'ASUS'], [r, s]],
            [/(nexus 9)/i],
            [n, [a, 'HTC'], [r, u]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i,
            ],
            [a, [n, /_/g, ' '], [r, s]],
            [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
            [n, [a, 'Acer'], [r, u]],
            [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
            [n, [a, 'Meizu'], [r, s]],
            [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
            [n, [a, 'Sharp'], [r, s]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
              /(hp) ([\w ]+\w)/i,
              /(asus)-?(\w+)/i,
              /(microsoft); (lumia[\w ]+)/i,
              /(lenovo)[-_ ]?([-\w]+)/i,
              /(jolla)/i,
              /(oppo) ?([\w ]+) bui/i,
            ],
            [a, n, [r, s]],
            [
              /(archos) (gamepad2?)/i,
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              /(kindle)\/([\w\.]+)/i,
              /(nook)[\w ]+build\/(\w+)/i,
              /(dell) (strea[kpr\d ]*[\dko])/i,
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              /(trinity)[- ]*(t\d{3}) bui/i,
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              /(vodafone) ([\w ]+)(?:\)| bui)/i,
            ],
            [a, n, [r, u]],
            [/(surface duo)/i],
            [n, [a, 'Microsoft'], [r, u]],
            [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
            [n, [a, 'Fairphone'], [r, s]],
            [/(u304aa)/i],
            [n, [a, 'AT&T'], [r, s]],
            [/\bsie-(\w*)/i],
            [n, [a, 'Siemens'], [r, s]],
            [/\b(rct\w+) b/i],
            [n, [a, 'RCA'], [r, u]],
            [/\b(venue[\d ]{2,7}) b/i],
            [n, [a, 'Dell'], [r, u]],
            [/\b(q(?:mv|ta)\w+) b/i],
            [n, [a, 'Verizon'], [r, u]],
            [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
            [n, [a, 'Barnes & Noble'], [r, u]],
            [/\b(tm\d{3}\w+) b/i],
            [n, [a, 'NuVision'], [r, u]],
            [/\b(k88) b/i],
            [n, [a, 'ZTE'], [r, u]],
            [/\b(nx\d{3}j) b/i],
            [n, [a, 'ZTE'], [r, s]],
            [/\b(gen\d{3}) b.+49h/i],
            [n, [a, 'Swiss'], [r, s]],
            [/\b(zur\d{3}) b/i],
            [n, [a, 'Swiss'], [r, u]],
            [/\b((zeki)?tb.*\b) b/i],
            [n, [a, 'Zeki'], [r, u]],
            [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
            [[a, 'Dragon Touch'], n, [r, u]],
            [/\b(ns-?\w{0,9}) b/i],
            [n, [a, 'Insignia'], [r, u]],
            [/\b((nxa|next)-?\w{0,9}) b/i],
            [n, [a, 'NextBook'], [r, u]],
            [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
            [[a, 'Voice'], n, [r, s]],
            [/\b(lvtel\-)?(v1[12]) b/i],
            [[a, 'LvTel'], n, [r, s]],
            [/\b(ph-1) /i],
            [n, [a, 'Essential'], [r, s]],
            [/\b(v(100md|700na|7011|917g).*\b) b/i],
            [n, [a, 'Envizen'], [r, u]],
            [/\b(trio[-\w\. ]+) b/i],
            [n, [a, 'MachSpeed'], [r, u]],
            [/\btu_(1491) b/i],
            [n, [a, 'Rotor'], [r, u]],
            [/(shield[\w ]+) b/i],
            [n, [a, 'Nvidia'], [r, u]],
            [/(sprint) (\w+)/i],
            [a, n, [r, s]],
            [/(kin\.[onetw]{3})/i],
            [
              [n, /\./g, ' '],
              [a, 'Microsoft'],
              [r, s],
            ],
            [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
            [n, [a, 'Zebra'], [r, u]],
            [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
            [n, [a, 'Zebra'], [r, s]],
            [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
            [a, n, [r, 'console']],
            [/droid.+; (shield) bui/i],
            [n, [a, 'Nvidia'], [r, 'console']],
            [/(playstation [345portablevi]+)/i],
            [n, [a, 'Sony'], [r, 'console']],
            [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
            [n, [a, 'Microsoft'], [r, 'console']],
            [/smart-tv.+(samsung)/i],
            [a, [r, c]],
            [/hbbtv.+maple;(\d+)/i],
            [
              [n, /^/, 'SmartTV'],
              [a, 'Samsung'],
              [r, c],
            ],
            [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
            [
              [a, 'LG'],
              [r, c],
            ],
            [/(apple) ?tv/i],
            [a, [n, 'Apple TV'], [r, c]],
            [/crkey/i],
            [
              [n, 'Chromecast'],
              [a, 'Google'],
              [r, c],
            ],
            [/droid.+aft(\w)( bui|\))/i],
            [n, [a, 'Amazon'], [r, c]],
            [/\(dtv[\);].+(aquos)/i],
            [n, [a, 'Sharp'], [r, c]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i,
            ],
            [
              [a, f],
              [n, f],
              [r, c],
            ],
            [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
            [[r, c]],
            [/((pebble))app/i],
            [a, n, [r, 'wearable']],
            [/droid.+; (glass) \d/i],
            [n, [a, 'Google'], [r, 'wearable']],
            [/droid.+; (wt63?0{2,3})\)/i],
            [n, [a, 'Zebra'], [r, 'wearable']],
            [/(quest( 2)?)/i],
            [n, [a, 'Facebook'], [r, 'wearable']],
            [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
            [a, [r, 'embedded']],
            [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
            [n, [r, s]],
            [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
            [n, [r, u]],
            [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
            [[r, u]],
            [/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i],
            [[r, s]],
            [/(android[-\w\. ]{0,9});.+buil/i],
            [n, [a, 'Generic']],
          ],
          engine: [
            [/windows.+ edge\/([\w\.]+)/i],
            [o, [i, 'EdgeHTML']],
            [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
            [o, [i, 'Blink']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
              /ekioh(flow)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
            ],
            [i, o],
            [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
            [o, i],
          ],
          os: [
            [/microsoft (windows) (vista|xp)/i],
            [i, o],
            [
              /(windows) nt 6\.2; (arm)/i,
              /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
              /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            ],
            [i, [o, p, v]],
            [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
            [
              [i, 'Windows'],
              [o, p, v],
            ],
            [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
            [
              [o, /_/g, '.'],
              [i, 'iOS'],
            ],
            [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
            [
              [i, 'Mac OS'],
              [o, /_/g, '.'],
            ],
            [/droid ([\w\.]+)\b.+(android[- ]x86)/i],
            [o, i],
            [
              /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
              /(blackberry)\w*\/([\w\.]*)/i,
              /(tizen|kaios)[\/ ]([\w\.]+)/i,
              /\((series40);/i,
            ],
            [i, o],
            [/\(bb(10);/i],
            [o, [i, 'BlackBerry']],
            [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
            [o, [i, 'Symbian']],
            [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
            [o, [i, 'Firefox OS']],
            [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
            [o, [i, 'webOS']],
            [/crkey\/([\d\.]+)/i],
            [o, [i, 'Chromecast']],
            [/(cros) [\w]+ ([\w\.]+\w)/i],
            [[i, 'Chromium OS'], o],
            [
              /(nintendo|playstation) ([wids345portablevuch]+)/i,
              /(xbox); +xbox ([^\);]+)/i,
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              /(mint)[\/\(\) ]?(\w*)/i,
              /(mageia|vectorlinux)[; ]/i,
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              /(hurd|linux) ?([\w\.]*)/i,
              /(gnu) ?([\w\.]*)/i,
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              /(haiku) (\w+)/i,
            ],
            [i, o],
            [/(sunos) ?([\w\.\d]*)/i],
            [[i, 'Solaris'], o],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
              /(unix) ?([\w\.]*)/i,
            ],
            [i, o],
          ],
        },
        m = function (t, e) {
          if (('object' == typeof t && ((e = t), (t = void 0)), !(this instanceof m)))
            return new m(t, e).getResult();
          var n =
              t ||
              ('undefined' != typeof window && window.navigator && window.navigator.userAgent
                ? window.navigator.userAgent
                : ''),
            i = e
              ? (function (t, e) {
                  var n = {};
                  for (var i in t)
                    e[i] && e[i].length % 2 == 0 ? (n[i] = e[i].concat(t[i])) : (n[i] = t[i]);
                  return n;
                })(_, e)
              : _;
          return (
            (this.getBrowser = function () {
              var t,
                e = {};
              return (
                (e.name = void 0),
                (e.version = void 0),
                g.call(e, n, i.browser),
                (e.major =
                  'string' == typeof (t = e.version)
                    ? t.replace(/[^\d\.]/g, '').split('.')[0]
                    : void 0),
                e
              );
            }),
            (this.getCPU = function () {
              var t = { architecture: void 0 };
              return g.call(t, n, i.cpu), t;
            }),
            (this.getDevice = function () {
              var t = { vendor: void 0, model: void 0, type: void 0 };
              return g.call(t, n, i.device), t;
            }),
            (this.getEngine = function () {
              var t = { name: void 0, version: void 0 };
              return g.call(t, n, i.engine), t;
            }),
            (this.getOS = function () {
              var t = { name: void 0, version: void 0 };
              return g.call(t, n, i.os), t;
            }),
            (this.getResult = function () {
              return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU(),
              };
            }),
            (this.getUA = function () {
              return n;
            }),
            (this.setUA = function (t) {
              return (n = 'string' == typeof t && t.length > 255 ? f(t, 255) : t), this;
            }),
            this.setUA(n),
            this
          );
        };
      (m.VERSION = '1.0.2'),
        (m.BROWSER = l([i, o, 'major'])),
        (m.CPU = l(['architecture'])),
        (m.DEVICE = l([n, a, r, 'console', s, c, u, 'wearable', 'embedded'])),
        (m.ENGINE = m.OS = l([i, o])),
        (t.UAParser = m);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    ((_POSignalsEntities || (_POSignalsEntities = {})).pako = (function t(e, n, i) {
      function r(o, s) {
        if (!n[o]) {
          if (!e[o]) {
            var u = 'function' == typeof require && require;
            if (!s && u) return u(o, !0);
            if (a) return a(o, !0);
            var c = new Error("Cannot find module '" + o + "'");
            throw ((c.code = 'MODULE_NOT_FOUND'), c);
          }
          var l = (n[o] = { exports: {} });
          e[o][0].call(
            l.exports,
            function (t) {
              var n = e[o][1][t];
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
        return n[o].exports;
      }
      for (var a = 'function' == typeof require && require, o = 0; o < i.length; o++) r(i[o]);
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
            var a = {
                arraySet: function (t, e, n, i, r) {
                  if (e.subarray && t.subarray) t.set(e.subarray(n, n + i), r);
                  else for (var a = 0; a < i; a++) t[r + a] = e[n + a];
                },
                flattenChunks: function (t) {
                  var e, n, i, r, a, o;
                  for (i = 0, e = 0, n = t.length; e < n; e++) i += t[e].length;
                  for (o = new Uint8Array(i), r = 0, e = 0, n = t.length; e < n; e++)
                    (a = t[e]), o.set(a, r), (r += a.length);
                  return o;
                },
              },
              o = {
                arraySet: function (t, e, n, i, r) {
                  for (var a = 0; a < i; a++) t[r + a] = e[n + a];
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
                  n.assign(n, a))
                : ((n.Buf8 = Array), (n.Buf16 = Array), (n.Buf32 = Array), n.assign(n, o));
            }),
              n.setTyped(r);
          },
          {},
        ],
        2: [
          function (t, e, n) {
            'use strict';
            function i(t, e) {
              if (e < 65537 && ((t.subarray && o) || (!t.subarray && a)))
                return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
              for (var n = '', i = 0; i < e; i++) n += String.fromCharCode(t[i]);
              return n;
            }
            var r = t('./common'),
              a = !0,
              o = !0;
            try {
              String.fromCharCode.apply(null, [0]);
            } catch (t) {
              a = !1;
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1));
            } catch (t) {
              o = !1;
            }
            for (var s = new r.Buf8(256), u = 0; u < 256; u++)
              s[u] = u >= 252 ? 6 : u >= 248 ? 5 : u >= 240 ? 4 : u >= 224 ? 3 : u >= 192 ? 2 : 1;
            (s[254] = s[254] = 1),
              (n.string2buf = function (t) {
                var e,
                  n,
                  i,
                  a,
                  o,
                  s = t.length,
                  u = 0;
                for (a = 0; a < s; a++)
                  55296 == (64512 & (n = t.charCodeAt(a))) &&
                    a + 1 < s &&
                    56320 == (64512 & (i = t.charCodeAt(a + 1))) &&
                    ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), a++),
                    (u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
                for (e = new r.Buf8(u), o = 0, a = 0; o < u; a++)
                  55296 == (64512 & (n = t.charCodeAt(a))) &&
                    a + 1 < s &&
                    56320 == (64512 & (i = t.charCodeAt(a + 1))) &&
                    ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), a++),
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
                  a,
                  o,
                  u = e || t.length,
                  c = new Array(2 * u);
                for (r = 0, n = 0; n < u; )
                  if ((a = t[n++]) < 128) c[r++] = a;
                  else if ((o = s[a]) > 4) (c[r++] = 65533), (n += o - 1);
                  else {
                    for (a &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && n < u; )
                      (a = (a << 6) | (63 & t[n++])), o--;
                    o > 1
                      ? (c[r++] = 65533)
                      : a < 65536
                        ? (c[r++] = a)
                        : ((a -= 65536),
                          (c[r++] = 55296 | ((a >> 10) & 1023)),
                          (c[r++] = 56320 | (1023 & a)));
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
              for (var r = (65535 & t) | 0, a = ((t >>> 16) & 65535) | 0, o = 0; 0 !== n; ) {
                n -= o = n > 2e3 ? 2e3 : n;
                do {
                  a = (a + (r = (r + e[i++]) | 0)) | 0;
                } while (--o);
                (r %= 65521), (a %= 65521);
              }
              return r | (a << 16) | 0;
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
              var a = i,
                o = r + n;
              t ^= -1;
              for (var s = r; s < o; s++) t = (t >>> 8) ^ a[255 & (t ^ e[s])];
              return -1 ^ t;
            };
          },
          {},
        ],
        5: [
          function (t, e, n) {
            'use strict';
            function i(t, e) {
              return (t.msg = T[e]), e;
            }
            function r(t) {
              return (t << 1) - (t > 4 ? 9 : 0);
            }
            function a(t) {
              for (var e = t.length; --e >= 0; ) t[e] = 0;
            }
            function o(t) {
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
                o(t.strm);
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
                      ? (t.adler = A(t.adler, e, r, n))
                      : 2 === t.state.wrap && (t.adler = P(t.adler, e, r, n)),
                    (t.next_in += r),
                    (t.total_in += r),
                    r)
              );
            }
            function d(t, e) {
              var n,
                i,
                r = t.max_chain_length,
                a = t.strstart,
                o = t.prev_length,
                s = t.nice_match,
                u = t.strstart > t.w_size - K ? t.strstart - (t.w_size - K) : 0,
                c = t.window,
                l = t.w_mask,
                d = t.prev,
                h = t.strstart + z,
                f = c[a + o - 1],
                g = c[a + o];
              t.prev_length >= t.good_match && (r >>= 2), s > t.lookahead && (s = t.lookahead);
              do {
                if (
                  c[(n = e) + o] === g &&
                  c[n + o - 1] === f &&
                  c[n] === c[a] &&
                  c[++n] === c[a + 1]
                ) {
                  (a += 2), n++;
                  do {} while (
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    c[++a] === c[++n] &&
                    a < h
                  );
                  if (((i = z - (h - a)), (a = h - z), i > o)) {
                    if (((t.match_start = e), (o = i), i >= s)) break;
                    (f = c[a + o - 1]), (g = c[a + o]);
                  }
                }
              } while ((e = d[e & l]) > u && 0 != --r);
              return o <= t.lookahead ? o : t.lookahead;
            }
            function h(t) {
              var e,
                n,
                i,
                r,
                a,
                o = t.w_size;
              do {
                if (((r = t.window_size - t.lookahead - t.strstart), t.strstart >= o + (o - K))) {
                  S.arraySet(t.window, t.window, o, o, 0),
                    (t.match_start -= o),
                    (t.strstart -= o),
                    (t.block_start -= o),
                    (e = n = t.hash_size);
                  do {
                    (i = t.head[--e]), (t.head[e] = i >= o ? i - o : 0);
                  } while (--n);
                  e = n = o;
                  do {
                    (i = t.prev[--e]), (t.prev[e] = i >= o ? i - o : 0);
                  } while (--n);
                  r += o;
                }
                if (0 === t.strm.avail_in) break;
                if (
                  ((n = l(t.strm, t.window, t.strstart + t.lookahead, r)),
                  (t.lookahead += n),
                  t.lookahead + t.insert >= V)
                )
                  for (
                    a = t.strstart - t.insert,
                      t.ins_h = t.window[a],
                      t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[a + 1]) & t.hash_mask;
                    t.insert &&
                    ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[a + V - 1]) & t.hash_mask),
                    (t.prev[a & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = a),
                    a++,
                    t.insert--,
                    !(t.lookahead + t.insert < V));

                  );
              } while (t.lookahead < K && 0 !== t.strm.avail_in);
            }
            function f(t, e) {
              for (var n, i; ; ) {
                if (t.lookahead < K) {
                  if ((h(t), t.lookahead < K && e === I)) return Y;
                  if (0 === t.lookahead) break;
                }
                if (
                  ((n = 0),
                  t.lookahead >= V &&
                    ((t.ins_h =
                      ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + V - 1]) & t.hash_mask),
                    (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = t.strstart)),
                  0 !== n && t.strstart - n <= t.w_size - K && (t.match_length = d(t, n)),
                  t.match_length >= V)
                )
                  if (
                    ((i = O._tr_tally(t, t.strstart - t.match_start, t.match_length - V)),
                    (t.lookahead -= t.match_length),
                    t.match_length <= t.max_lazy_match && t.lookahead >= V)
                  ) {
                    t.match_length--;
                    do {
                      t.strstart++,
                        (t.ins_h =
                          ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + V - 1]) & t.hash_mask),
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
                if (i && (s(t, !1), 0 === t.strm.avail_out)) return Y;
              }
              return (
                (t.insert = t.strstart < V - 1 ? t.strstart : V - 1),
                e === D
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? Y
                    : X
              );
            }
            function g(t, e) {
              for (var n, i, r; ; ) {
                if (t.lookahead < K) {
                  if ((h(t), t.lookahead < K && e === I)) return Y;
                  if (0 === t.lookahead) break;
                }
                if (
                  ((n = 0),
                  t.lookahead >= V &&
                    ((t.ins_h =
                      ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + V - 1]) & t.hash_mask),
                    (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                    (t.head[t.ins_h] = t.strstart)),
                  (t.prev_length = t.match_length),
                  (t.prev_match = t.match_start),
                  (t.match_length = V - 1),
                  0 !== n &&
                    t.prev_length < t.max_lazy_match &&
                    t.strstart - n <= t.w_size - K &&
                    ((t.match_length = d(t, n)),
                    t.match_length <= 5 &&
                      (t.strategy === U ||
                        (t.match_length === V && t.strstart - t.match_start > 4096)) &&
                      (t.match_length = V - 1)),
                  t.prev_length >= V && t.match_length <= t.prev_length)
                ) {
                  (r = t.strstart + t.lookahead - V),
                    (i = O._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - V)),
                    (t.lookahead -= t.prev_length - 1),
                    (t.prev_length -= 2);
                  do {
                    ++t.strstart <= r &&
                      ((t.ins_h =
                        ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + V - 1]) & t.hash_mask),
                      (n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                      (t.head[t.ins_h] = t.strstart));
                  } while (0 != --t.prev_length);
                  if (
                    ((t.match_available = 0),
                    (t.match_length = V - 1),
                    t.strstart++,
                    i && (s(t, !1), 0 === t.strm.avail_out))
                  )
                    return Y;
                } else if (t.match_available) {
                  if (
                    ((i = O._tr_tally(t, 0, t.window[t.strstart - 1])) && s(t, !1),
                    t.strstart++,
                    t.lookahead--,
                    0 === t.strm.avail_out)
                  )
                    return Y;
                } else (t.match_available = 1), t.strstart++, t.lookahead--;
              }
              return (
                t.match_available &&
                  ((i = O._tr_tally(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
                (t.insert = t.strstart < V - 1 ? t.strstart : V - 1),
                e === D
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? Y
                    : X
              );
            }
            function p(t, e) {
              for (var n, i, r, a, o = t.window; ; ) {
                if (t.lookahead <= z) {
                  if ((h(t), t.lookahead <= z && e === I)) return Y;
                  if (0 === t.lookahead) break;
                }
                if (
                  ((t.match_length = 0),
                  t.lookahead >= V &&
                    t.strstart > 0 &&
                    ((r = t.strstart - 1), (i = o[r]) === o[++r] && i === o[++r] && i === o[++r]))
                ) {
                  a = t.strstart + z;
                  do {} while (
                    i === o[++r] &&
                    i === o[++r] &&
                    i === o[++r] &&
                    i === o[++r] &&
                    i === o[++r] &&
                    i === o[++r] &&
                    i === o[++r] &&
                    i === o[++r] &&
                    r < a
                  );
                  (t.match_length = z - (a - r)),
                    t.match_length > t.lookahead && (t.match_length = t.lookahead);
                }
                if (
                  (t.match_length >= V
                    ? ((n = O._tr_tally(t, 1, t.match_length - V)),
                      (t.lookahead -= t.match_length),
                      (t.strstart += t.match_length),
                      (t.match_length = 0))
                    : ((n = O._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                  n && (s(t, !1), 0 === t.strm.avail_out))
                )
                  return Y;
              }
              return (
                (t.insert = 0),
                e === D
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? Y
                    : X
              );
            }
            function v(t, e) {
              for (var n; ; ) {
                if (0 === t.lookahead && (h(t), 0 === t.lookahead)) {
                  if (e === I) return Y;
                  break;
                }
                if (
                  ((t.match_length = 0),
                  (n = O._tr_tally(t, 0, t.window[t.strstart])),
                  t.lookahead--,
                  t.strstart++,
                  n && (s(t, !1), 0 === t.strm.avail_out))
                )
                  return Y;
              }
              return (
                (t.insert = 0),
                e === D
                  ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                  : t.last_lit && (s(t, !1), 0 === t.strm.avail_out)
                    ? Y
                    : X
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
                (this.method = R),
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
                (this.dyn_ltree = new S.Buf16(2 * j)),
                (this.dyn_dtree = new S.Buf16(2 * (2 * H + 1))),
                (this.bl_tree = new S.Buf16(2 * (2 * F + 1))),
                a(this.dyn_ltree),
                a(this.dyn_dtree),
                a(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new S.Buf16(G + 1)),
                (this.heap = new S.Buf16(2 * B + 1)),
                a(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new S.Buf16(2 * B + 1)),
                a(this.depth),
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
            function y(t) {
              var e;
              return t && t.state
                ? ((t.total_in = t.total_out = 0),
                  (t.data_type = x),
                  ((e = t.state).pending = 0),
                  (e.pending_out = 0),
                  e.wrap < 0 && (e.wrap = -e.wrap),
                  (e.status = e.wrap ? W : q),
                  (t.adler = 2 === e.wrap ? 0 : 1),
                  (e.last_flush = I),
                  O._tr_init(e),
                  C)
                : i(t, M);
            }
            function b(t) {
              var e = y(t);
              return (
                e === C &&
                  (function (t) {
                    (t.window_size = 2 * t.w_size),
                      a(t.head),
                      (t.max_lazy_match = E[t.level].max_lazy),
                      (t.good_match = E[t.level].good_length),
                      (t.nice_match = E[t.level].nice_length),
                      (t.max_chain_length = E[t.level].max_chain),
                      (t.strstart = 0),
                      (t.block_start = 0),
                      (t.lookahead = 0),
                      (t.insert = 0),
                      (t.match_length = t.prev_length = V - 1),
                      (t.match_available = 0),
                      (t.ins_h = 0);
                  })(t.state),
                e
              );
            }
            function w(t, e, n, r, a, o) {
              if (!t) return M;
              var s = 1;
              if (
                (e === L && (e = 6),
                r < 0 ? ((s = 0), (r = -r)) : r > 15 && ((s = 2), (r -= 16)),
                a < 1 || a > N || n !== R || r < 8 || r > 15 || e < 0 || e > 9 || o < 0 || o > k)
              )
                return i(t, M);
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
                (u.hash_bits = a + 7),
                (u.hash_size = 1 << u.hash_bits),
                (u.hash_mask = u.hash_size - 1),
                (u.hash_shift = ~~((u.hash_bits + V - 1) / V)),
                (u.window = new S.Buf8(2 * u.w_size)),
                (u.head = new S.Buf16(u.hash_size)),
                (u.prev = new S.Buf16(u.w_size)),
                (u.lit_bufsize = 1 << (a + 6)),
                (u.pending_buf_size = 4 * u.lit_bufsize),
                (u.pending_buf = new S.Buf8(u.pending_buf_size)),
                (u.d_buf = 1 * u.lit_bufsize),
                (u.l_buf = 3 * u.lit_bufsize),
                (u.level = e),
                (u.strategy = o),
                (u.method = n),
                b(t)
              );
            }
            var E,
              S = t('../utils/common'),
              O = t('./trees'),
              A = t('./adler32'),
              P = t('./crc32'),
              T = t('./messages'),
              I = 0,
              D = 4,
              C = 0,
              M = -2,
              L = -1,
              U = 1,
              k = 4,
              x = 2,
              R = 8,
              N = 9,
              B = 286,
              H = 30,
              F = 19,
              j = 2 * B + 1,
              G = 15,
              V = 3,
              z = 258,
              K = z + V + 1,
              W = 42,
              q = 113,
              Y = 1,
              X = 2,
              J = 3,
              Z = 4;
            (E = [
              new _(0, 0, 0, 0, function (t, e) {
                var n = 65535;
                for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5); ; ) {
                  if (t.lookahead <= 1) {
                    if ((h(t), 0 === t.lookahead && e === I)) return Y;
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
                    return Y;
                  if (
                    t.strstart - t.block_start >= t.w_size - K &&
                    (s(t, !1), 0 === t.strm.avail_out)
                  )
                    return Y;
                }
                return (
                  (t.insert = 0),
                  e === D
                    ? (s(t, !0), 0 === t.strm.avail_out ? J : Z)
                    : (t.strstart > t.block_start && (s(t, !1), t.strm.avail_out), Y)
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
                return w(t, e, R, 15, 8, 0);
              }),
              (n.deflateInit2 = w),
              (n.deflateReset = b),
              (n.deflateResetKeep = y),
              (n.deflateSetHeader = function (t, e) {
                return t && t.state ? (2 !== t.state.wrap ? M : ((t.state.gzhead = e), C)) : M;
              }),
              (n.deflate = function (t, e) {
                var n, s, l, d;
                if (!t || !t.state || e > 5 || e < 0) return t ? i(t, M) : M;
                if (
                  ((s = t.state),
                  !t.output || (!t.input && 0 !== t.avail_in) || (666 === s.status && e !== D))
                )
                  return i(t, 0 === t.avail_out ? -5 : M);
                if (((s.strm = t), (n = s.last_flush), (s.last_flush = e), s.status === W))
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
                          s.gzhead.hcrc && (t.adler = P(t.adler, s.pending_buf, s.pending, 0)),
                          (s.gzindex = 0),
                          (s.status = 69))
                        : (u(s, 0),
                          u(s, 0),
                          u(s, 0),
                          u(s, 0),
                          u(s, 0),
                          u(s, 9 === s.level ? 2 : s.strategy >= 2 || s.level < 2 ? 4 : 0),
                          u(s, 3),
                          (s.status = q));
                  else {
                    var h = (R + ((s.w_bits - 8) << 4)) << 8;
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
                      (s.status = q),
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
                          (t.adler = P(t.adler, s.pending_buf, s.pending - l, l)),
                        o(t),
                        (l = s.pending),
                        s.pending !== s.pending_buf_size));

                    )
                      u(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
                    s.gzhead.hcrc &&
                      s.pending > l &&
                      (t.adler = P(t.adler, s.pending_buf, s.pending - l, l)),
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
                          (t.adler = P(t.adler, s.pending_buf, s.pending - l, l)),
                        o(t),
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
                      (t.adler = P(t.adler, s.pending_buf, s.pending - l, l)),
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
                          (t.adler = P(t.adler, s.pending_buf, s.pending - l, l)),
                        o(t),
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
                      (t.adler = P(t.adler, s.pending_buf, s.pending - l, l)),
                      0 === d && (s.status = 103);
                  } else s.status = 103;
                if (
                  (103 === s.status &&
                    (s.gzhead.hcrc
                      ? (s.pending + 2 > s.pending_buf_size && o(t),
                        s.pending + 2 <= s.pending_buf_size &&
                          (u(s, 255 & t.adler),
                          u(s, (t.adler >> 8) & 255),
                          (t.adler = 0),
                          (s.status = q)))
                      : (s.status = q)),
                  0 !== s.pending)
                ) {
                  if ((o(t), 0 === t.avail_out)) return (s.last_flush = -1), C;
                } else if (0 === t.avail_in && r(e) <= r(n) && e !== D) return i(t, -5);
                if (666 === s.status && 0 !== t.avail_in) return i(t, -5);
                if (0 !== t.avail_in || 0 !== s.lookahead || (e !== I && 666 !== s.status)) {
                  var f =
                    2 === s.strategy ? v(s, e) : 3 === s.strategy ? p(s, e) : E[s.level].func(s, e);
                  if (((f !== J && f !== Z) || (s.status = 666), f === Y || f === J))
                    return 0 === t.avail_out && (s.last_flush = -1), C;
                  if (
                    f === X &&
                    (1 === e
                      ? O._tr_align(s)
                      : 5 !== e &&
                        (O._tr_stored_block(s, 0, 0, !1),
                        3 === e &&
                          (a(s.head),
                          0 === s.lookahead &&
                            ((s.strstart = 0), (s.block_start = 0), (s.insert = 0)))),
                    o(t),
                    0 === t.avail_out)
                  )
                    return (s.last_flush = -1), C;
                }
                return e !== D
                  ? C
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
                      o(t),
                      s.wrap > 0 && (s.wrap = -s.wrap),
                      0 !== s.pending ? C : 1);
              }),
              (n.deflateEnd = function (t) {
                var e;
                return t && t.state
                  ? (e = t.state.status) !== W &&
                    69 !== e &&
                    73 !== e &&
                    91 !== e &&
                    103 !== e &&
                    e !== q &&
                    666 !== e
                    ? i(t, M)
                    : ((t.state = null), e === q ? i(t, -3) : C)
                  : M;
              }),
              (n.deflateSetDictionary = function (t, e) {
                var n,
                  i,
                  r,
                  o,
                  s,
                  u,
                  c,
                  l,
                  d = e.length;
                if (!t || !t.state) return M;
                if (
                  ((n = t.state), 2 === (o = n.wrap) || (1 === o && n.status !== W) || n.lookahead)
                )
                  return M;
                for (
                  1 === o && (t.adler = A(t.adler, e, d, 0)),
                    n.wrap = 0,
                    d >= n.w_size &&
                      (0 === o &&
                        (a(n.head), (n.strstart = 0), (n.block_start = 0), (n.insert = 0)),
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
                  n.lookahead >= V;

                ) {
                  (i = n.strstart), (r = n.lookahead - (V - 1));
                  do {
                    (n.ins_h = ((n.ins_h << n.hash_shift) ^ n.window[i + V - 1]) & n.hash_mask),
                      (n.prev[i & n.w_mask] = n.head[n.ins_h]),
                      (n.head[n.ins_h] = i),
                      i++;
                  } while (--r);
                  (n.strstart = i), (n.lookahead = V - 1), h(n);
                }
                return (
                  (n.strstart += n.lookahead),
                  (n.block_start = n.strstart),
                  (n.insert = n.lookahead),
                  (n.lookahead = 0),
                  (n.match_length = n.prev_length = V - 1),
                  (n.match_available = 0),
                  (t.next_in = u),
                  (t.input = c),
                  (t.avail_in = s),
                  (n.wrap = o),
                  C
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
            function a(t, e) {
              (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
            }
            function o(t) {
              return t < 256 ? z[t] : z[256 + (t >>> 7)];
            }
            function s(t, e) {
              (t.pending_buf[t.pending++] = 255 & e),
                (t.pending_buf[t.pending++] = (e >>> 8) & 255);
            }
            function u(t, e, n) {
              t.bi_valid > L - n
                ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
                  s(t, t.bi_buf),
                  (t.bi_buf = e >> (L - t.bi_valid)),
                  (t.bi_valid += n - L))
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
                a = new Array(M + 1),
                o = 0;
              for (i = 1; i <= M; i++) a[i] = o = (o + n[i - 1]) << 1;
              for (r = 0; r <= e; r++) {
                var s = t[2 * r + 1];
                0 !== s && (t[2 * r] = l(a[s]++, s));
              }
            }
            function h(t) {
              var e;
              for (e = 0; e < T; e++) t.dyn_ltree[2 * e] = 0;
              for (e = 0; e < I; e++) t.dyn_dtree[2 * e] = 0;
              for (e = 0; e < D; e++) t.bl_tree[2 * e] = 0;
              (t.dyn_ltree[2 * k] = 1),
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
                a = 2 * n;
              return t[r] < t[a] || (t[r] === t[a] && i[e] <= i[n]);
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
                a,
                s,
                l = 0;
              if (0 !== t.last_lit)
                do {
                  (i = (t.pending_buf[t.d_buf + 2 * l] << 8) | t.pending_buf[t.d_buf + 2 * l + 1]),
                    (r = t.pending_buf[t.l_buf + l]),
                    l++,
                    0 === i
                      ? c(t, r, e)
                      : (c(t, (a = K[r]) + P + 1, e),
                        0 !== (s = B[a]) && u(t, (r -= W[a]), s),
                        c(t, (a = o(--i)), n),
                        0 !== (s = H[a]) && u(t, (i -= q[a]), s));
                } while (l < t.last_lit);
              c(t, k, e);
            }
            function _(t, e) {
              var n,
                i,
                r,
                a = e.dyn_tree,
                o = e.stat_desc.static_tree,
                s = e.stat_desc.has_stree,
                u = e.stat_desc.elems,
                c = -1;
              for (t.heap_len = 0, t.heap_max = C, n = 0; n < u; n++)
                0 !== a[2 * n]
                  ? ((t.heap[++t.heap_len] = c = n), (t.depth[n] = 0))
                  : (a[2 * n + 1] = 0);
              for (; t.heap_len < 2; )
                (a[2 * (r = t.heap[++t.heap_len] = c < 2 ? ++c : 0)] = 1),
                  (t.depth[r] = 0),
                  t.opt_len--,
                  s && (t.static_len -= o[2 * r + 1]);
              for (e.max_code = c, n = t.heap_len >> 1; n >= 1; n--) p(t, a, n);
              r = u;
              do {
                (n = t.heap[1]),
                  (t.heap[1] = t.heap[t.heap_len--]),
                  p(t, a, 1),
                  (i = t.heap[1]),
                  (t.heap[--t.heap_max] = n),
                  (t.heap[--t.heap_max] = i),
                  (a[2 * r] = a[2 * n] + a[2 * i]),
                  (t.depth[r] = (t.depth[n] >= t.depth[i] ? t.depth[n] : t.depth[i]) + 1),
                  (a[2 * n + 1] = a[2 * i + 1] = r),
                  (t.heap[1] = r++),
                  p(t, a, 1);
              } while (t.heap_len >= 2);
              (t.heap[--t.heap_max] = t.heap[1]),
                (function (t, e) {
                  var n,
                    i,
                    r,
                    a,
                    o,
                    s,
                    u = e.dyn_tree,
                    c = e.max_code,
                    l = e.stat_desc.static_tree,
                    d = e.stat_desc.has_stree,
                    h = e.stat_desc.extra_bits,
                    f = e.stat_desc.extra_base,
                    g = e.stat_desc.max_length,
                    p = 0;
                  for (a = 0; a <= M; a++) t.bl_count[a] = 0;
                  for (u[2 * t.heap[t.heap_max] + 1] = 0, n = t.heap_max + 1; n < C; n++)
                    (a = u[2 * u[2 * (i = t.heap[n]) + 1] + 1] + 1) > g && ((a = g), p++),
                      (u[2 * i + 1] = a),
                      i > c ||
                        (t.bl_count[a]++,
                        (o = 0),
                        i >= f && (o = h[i - f]),
                        (s = u[2 * i]),
                        (t.opt_len += s * (a + o)),
                        d && (t.static_len += s * (l[2 * i + 1] + o)));
                  if (0 !== p) {
                    do {
                      for (a = g - 1; 0 === t.bl_count[a]; ) a--;
                      t.bl_count[a]--, (t.bl_count[a + 1] += 2), t.bl_count[g]--, (p -= 2);
                    } while (p > 0);
                    for (a = g; 0 !== a; a--)
                      for (i = t.bl_count[a]; 0 !== i; )
                        (r = t.heap[--n]) > c ||
                          (u[2 * r + 1] !== a &&
                            ((t.opt_len += (a - u[2 * r + 1]) * u[2 * r]), (u[2 * r + 1] = a)),
                          i--);
                  }
                })(t, e),
                d(a, c, t.bl_count);
            }
            function m(t, e, n) {
              var i,
                r,
                a = -1,
                o = e[1],
                s = 0,
                u = 7,
                c = 4;
              for (0 === o && ((u = 138), (c = 3)), e[2 * (n + 1) + 1] = 65535, i = 0; i <= n; i++)
                (r = o),
                  (o = e[2 * (i + 1) + 1]),
                  (++s < u && r === o) ||
                    (s < c
                      ? (t.bl_tree[2 * r] += s)
                      : 0 !== r
                        ? (r !== a && t.bl_tree[2 * r]++, t.bl_tree[2 * x]++)
                        : s <= 10
                          ? t.bl_tree[2 * R]++
                          : t.bl_tree[2 * N]++,
                    (s = 0),
                    (a = r),
                    0 === o
                      ? ((u = 138), (c = 3))
                      : r === o
                        ? ((u = 6), (c = 3))
                        : ((u = 7), (c = 4)));
            }
            function y(t, e, n) {
              var i,
                r,
                a = -1,
                o = e[1],
                s = 0,
                l = 7,
                d = 4;
              for (0 === o && ((l = 138), (d = 3)), i = 0; i <= n; i++)
                if (((r = o), (o = e[2 * (i + 1) + 1]), !(++s < l && r === o))) {
                  if (s < d)
                    do {
                      c(t, r, t.bl_tree);
                    } while (0 != --s);
                  else
                    0 !== r
                      ? (r !== a && (c(t, r, t.bl_tree), s--), c(t, x, t.bl_tree), u(t, s - 3, 2))
                      : s <= 10
                        ? (c(t, R, t.bl_tree), u(t, s - 3, 3))
                        : (c(t, N, t.bl_tree), u(t, s - 11, 7));
                  (s = 0),
                    (a = r),
                    0 === o
                      ? ((l = 138), (d = 3))
                      : r === o
                        ? ((l = 6), (d = 3))
                        : ((l = 7), (d = 4));
                }
            }
            function b(t, e, n, i) {
              u(t, (O << 1) + (i ? 1 : 0), 3),
                (function (t, e, n, i) {
                  f(t),
                    i && (s(t, n), s(t, ~n)),
                    w.arraySet(t.pending_buf, t.window, e, n, t.pending),
                    (t.pending += n);
                })(t, e, n, !0);
            }
            var w = t('../utils/common'),
              E = 0,
              S = 1,
              O = 0,
              A = 29,
              P = 256,
              T = P + 1 + A,
              I = 30,
              D = 19,
              C = 2 * T + 1,
              M = 15,
              L = 16,
              U = 7,
              k = 256,
              x = 16,
              R = 17,
              N = 18,
              B = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5,
                0,
              ],
              H = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
                12, 12, 13, 13,
              ],
              F = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              j = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
              G = new Array(2 * (T + 2));
            i(G);
            var V = new Array(2 * I);
            i(V);
            var z = new Array(512);
            i(z);
            var K = new Array(256);
            i(K);
            var W = new Array(A);
            i(W);
            var q = new Array(I);
            i(q);
            var Y,
              X,
              J,
              Z = !1;
            (n._tr_init = function (t) {
              Z ||
                ((function () {
                  var t,
                    e,
                    n,
                    i,
                    a,
                    o = new Array(M + 1);
                  for (n = 0, i = 0; i < A - 1; i++)
                    for (W[i] = n, t = 0; t < 1 << B[i]; t++) K[n++] = i;
                  for (K[n - 1] = i, a = 0, i = 0; i < 16; i++)
                    for (q[i] = a, t = 0; t < 1 << H[i]; t++) z[a++] = i;
                  for (a >>= 7; i < I; i++)
                    for (q[i] = a << 7, t = 0; t < 1 << (H[i] - 7); t++) z[256 + a++] = i;
                  for (e = 0; e <= M; e++) o[e] = 0;
                  for (t = 0; t <= 143; ) (G[2 * t + 1] = 8), t++, o[8]++;
                  for (; t <= 255; ) (G[2 * t + 1] = 9), t++, o[9]++;
                  for (; t <= 279; ) (G[2 * t + 1] = 7), t++, o[7]++;
                  for (; t <= 287; ) (G[2 * t + 1] = 8), t++, o[8]++;
                  for (d(G, T + 1, o), t = 0; t < I; t++) (V[2 * t + 1] = 5), (V[2 * t] = l(t, 5));
                  (Y = new r(G, B, P + 1, T, M)),
                    (X = new r(V, H, 0, I, M)),
                    (J = new r(new Array(0), F, 0, D, U));
                })(),
                (Z = !0)),
                (t.l_desc = new a(t.dyn_ltree, Y)),
                (t.d_desc = new a(t.dyn_dtree, X)),
                (t.bl_desc = new a(t.bl_tree, J)),
                (t.bi_buf = 0),
                (t.bi_valid = 0),
                h(t);
            }),
              (n._tr_stored_block = b),
              (n._tr_flush_block = function (t, e, n, i) {
                var r,
                  a,
                  o = 0;
                t.level > 0
                  ? (2 === t.strm.data_type &&
                      (t.strm.data_type = (function (t) {
                        var e,
                          n = 4093624447;
                        for (e = 0; e <= 31; e++, n >>>= 1)
                          if (1 & n && 0 !== t.dyn_ltree[2 * e]) return E;
                        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
                          return S;
                        for (e = 32; e < P; e++) if (0 !== t.dyn_ltree[2 * e]) return S;
                        return E;
                      })(t)),
                    _(t, t.l_desc),
                    _(t, t.d_desc),
                    (o = (function (t) {
                      var e;
                      for (
                        m(t, t.dyn_ltree, t.l_desc.max_code),
                          m(t, t.dyn_dtree, t.d_desc.max_code),
                          _(t, t.bl_desc),
                          e = D - 1;
                        e >= 3 && 0 === t.bl_tree[2 * j[e] + 1];
                        e--
                      );
                      return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
                    })(t)),
                    (r = (t.opt_len + 3 + 7) >>> 3),
                    (a = (t.static_len + 3 + 7) >>> 3) <= r && (r = a))
                  : (r = a = n + 5),
                  n + 4 <= r && -1 !== e
                    ? b(t, e, n, i)
                    : 4 === t.strategy || a === r
                      ? (u(t, 2 + (i ? 1 : 0), 3), v(t, G, V))
                      : (u(t, 4 + (i ? 1 : 0), 3),
                        (function (t, e, n, i) {
                          var r;
                          for (u(t, e - 257, 5), u(t, n - 1, 5), u(t, i - 4, 4), r = 0; r < i; r++)
                            u(t, t.bl_tree[2 * j[r] + 1], 3);
                          y(t, t.dyn_ltree, e - 1), y(t, t.dyn_dtree, n - 1);
                        })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1),
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
                      t.dyn_ltree[2 * (K[n] + P + 1)]++,
                      t.dyn_dtree[2 * o(e)]++),
                  t.last_lit === t.lit_bufsize - 1
                );
              }),
              (n._tr_align = function (t) {
                u(t, 2, 3),
                  c(t, k, G),
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
              this.options = o.assign(
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
              var n = a.deflateInit2(
                this.strm,
                e.level,
                e.method,
                e.windowBits,
                e.memLevel,
                e.strategy,
              );
              if (n !== d) throw new Error(u[n]);
              if ((e.header && a.deflateSetHeader(this.strm, e.header), e.dictionary)) {
                var r;
                if (
                  ((r =
                    'string' == typeof e.dictionary
                      ? s.string2buf(e.dictionary)
                      : '[object ArrayBuffer]' === l.call(e.dictionary)
                        ? new Uint8Array(e.dictionary)
                        : e.dictionary),
                  (n = a.deflateSetDictionary(this.strm, r)) !== d)
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
            var a = t('./zlib/deflate'),
              o = t('./utils/common'),
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
                    ((r.output = new o.Buf8(u)), (r.next_out = 0), (r.avail_out = u)),
                  1 !== (n = a.deflate(r, i)) && n !== d)
                )
                  return this.onEnd(n), (this.ended = !0), !1;
                (0 !== r.avail_out && (0 !== r.avail_in || (4 !== i && 2 !== i))) ||
                  ('string' === this.options.to
                    ? this.onData(s.buf2binstring(o.shrinkBuf(r.output, r.next_out)))
                    : this.onData(o.shrinkBuf(r.output, r.next_out)));
              } while ((r.avail_in > 0 || 0 === r.avail_out) && 1 !== n);
              return 4 === i
                ? ((n = a.deflateEnd(this.strm)), this.onEnd(n), (this.ended = !0), n === d)
                : 2 !== i || (this.onEnd(d), (r.avail_out = 0), !0);
            }),
              (i.prototype.onData = function (t) {
                this.chunks.push(t);
              }),
              (i.prototype.onEnd = function (t) {
                t === d &&
                  ('string' === this.options.to
                    ? (this.result = this.chunks.join(''))
                    : (this.result = o.flattenChunks(this.chunks))),
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
    )('/lib/deflate.js')),
    ((_POSignalsEntities || (_POSignalsEntities = {})).evaluateModernizr = function () {
      !(function (t, e, n, i) {
        function r(t, e) {
          return typeof t === e;
        }
        function a() {
          return 'function' != typeof n.createElement
            ? n.createElement(arguments[0])
            : w
              ? n.createElementNS.call(n, 'http://www.w3.org/2000/svg', arguments[0])
              : n.createElement.apply(n, arguments);
        }
        function o(t, e) {
          return !!~('' + t).indexOf(e);
        }
        function s(t, e, i, r) {
          var o,
            s,
            u,
            c,
            l = 'modernizr',
            d = a('div'),
            h = (function () {
              var t = n.body;
              return t || ((t = a(w ? 'svg' : 'body')).fake = !0), t;
            })();
          if (parseInt(i, 10))
            for (; i--; ) ((u = a('div')).id = r ? r[i] : l + (i + 1)), d.appendChild(u);
          return (
            ((o = a('style')).type = 'text/css'),
            (o.id = 's' + l),
            (h.fake ? h : d).appendChild(o),
            h.appendChild(d),
            o.styleSheet ? (o.styleSheet.cssText = t) : o.appendChild(n.createTextNode(t)),
            (d.id = l),
            h.fake &&
              ((h.style.background = ''),
              (h.style.overflow = 'hidden'),
              (c = b.style.overflow),
              (b.style.overflow = 'hidden'),
              b.appendChild(h)),
            (s = e(d, t)),
            h.fake
              ? (h.parentNode.removeChild(h), (b.style.overflow = c), b.offsetHeight)
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
            var a = e.console;
            if (null !== r) i && (r = r.getPropertyValue(i));
            else if (a) {
              a[a.error ? 'error' : 'log'].call(
                a,
                'getComputedStyle returning null, its possible modernizr test results are inaccurate',
              );
            }
          } else r = !n && t.currentStyle && t.currentStyle[i];
          return r;
        }
        function l(t, n) {
          var r = t.length;
          if ('CSS' in e && 'supports' in e.CSS) {
            for (; r--; ) if (e.CSS.supports(u(t[r]), n)) return !0;
            return !1;
          }
          if ('CSSSupportsRule' in e) {
            for (var a = []; r--; ) a.push('(' + u(t[r]) + ':' + n + ')');
            return s(
              '@supports (' + (a = a.join(' or ')) + ') { #modernizr { position: absolute; } }',
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
            h && (delete P.style, delete P.modElem);
          }
          if (((s = !r(s, 'undefined') && s), !r(n, 'undefined'))) {
            var c = l(t, n);
            if (!r(c, 'undefined')) return c;
          }
          for (var h, f, g, p, v, _ = ['modernizr', 'tspan', 'samp']; !P.style && _.length; )
            (h = !0), (P.modElem = a(_.shift())), (P.style = P.modElem.style);
          for (g = t.length, f = 0; f < g; f++)
            if (((p = t[f]), (v = P.style[p]), o(p, '-') && (p = d(p)), P.style[p] !== i)) {
              if (s || r(n, 'undefined')) return u(), 'pfx' !== e || p;
              try {
                P.style[p] = n;
              } catch (t) {}
              if (P.style[p] !== v) return u(), 'pfx' !== e || p;
            }
          return u(), !1;
        }
        function f(t, e) {
          return function () {
            return t.apply(e, arguments);
          };
        }
        function g(t, e, n, i, a) {
          var o = t.charAt(0).toUpperCase() + t.slice(1),
            s = (t + ' ' + O.join(o + ' ') + o).split(' ');
          return r(e, 'string') || r(e, 'undefined')
            ? h(s, e, i, a)
            : (function (t, e, n) {
                var i;
                for (var a in t)
                  if (t[a] in e)
                    return !1 === n ? t[a] : r((i = e[t[a]]), 'function') ? f(i, n || e) : i;
                return !1;
              })((s = (t + ' ' + T.join(o + ' ') + o).split(' ')), e, n);
        }
        function p(t, e, n) {
          return g(t, i, i, e, n);
        }
        var v = [],
          _ = {
            _version: '3.11.1',
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
        var y = [],
          b = n.documentElement,
          w = 'svg' === b.nodeName.toLowerCase(),
          E = (function () {
            var t = !('onblur' in b);
            return function (e, n) {
              var r;
              return (
                !!e &&
                ((n && 'string' != typeof n) || (n = a(n || 'div')),
                !(r = (e = 'on' + e) in n) &&
                  t &&
                  (n.setAttribute || (n = a('div')),
                  n.setAttribute(e, ''),
                  (r = 'function' == typeof n[e]),
                  n[e] !== i && (n[e] = i),
                  n.removeAttribute(e)),
                r)
              );
            };
          })();
        (_.hasEvent = E),
          m.addTest('ambientlight', E('devicelight', e)),
          m.addTest('applicationcache', 'applicationCache' in e),
          (function () {
            var t = a('audio');
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
        var A = { elem: a('modernizr') };
        m._q.push(function () {
          delete A.elem;
        });
        var P = { style: A.elem.style };
        m._q.unshift(function () {
          delete P.style;
        });
        var T = _._config.usePrefixes ? S.toLowerCase().split(' ') : [];
        (_._domPrefixes = T), (_.testAllProps = g);
        var I = function (t) {
          var n,
            r = L.length,
            a = e.CSSRule;
          if (void 0 === a) return i;
          if (!t) return !1;
          if ((n = (t = t.replace(/^@/, '')).replace(/-/g, '_').toUpperCase() + '_RULE') in a)
            return '@' + t;
          for (var o = 0; o < r; o++) {
            var s = L[o];
            if (s.toUpperCase() + '_' + n in a) return '@-' + s.toLowerCase() + '-' + t;
          }
          return !1;
        };
        _.atRule = I;
        var D = (_.prefixed = function (t, e, n) {
          return 0 === t.indexOf('@')
            ? I(t)
            : (-1 !== t.indexOf('-') && (t = d(t)), e ? g(t, e, n) : g(t, 'pfx'));
        });
        m.addTest('batteryapi', !!D('battery', navigator) || !!D('getBattery', navigator), {
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
          m.addTest('contextmenu', 'contextMenu' in b && 'HTMLMenuItemElement' in e),
          m.addTest('cors', 'XMLHttpRequest' in e && 'withCredentials' in new XMLHttpRequest());
        var C = D('crypto', e);
        m.addTest('crypto', !!D('subtle', C)),
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
          m.addTest('dart', !!D('startDart', navigator)),
          m.addTest(
            'dataview',
            'undefined' != typeof DataView && 'getFloat64' in DataView.prototype,
          ),
          m.addTest('eventlistener', 'addEventListener' in e),
          m.addTest('forcetouch', function () {
            return (
              !!E(D('mouseforcewillbegin', e, !1), e) &&
              MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN &&
              MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN
            );
          }),
          m.addTest('fullscreen', !(!D('exitFullscreen', n, !1) && !D('cancelFullScreen', n, !1))),
          m.addTest('gamepads', !!D('getGamepads', navigator)),
          m.addTest('geolocation', 'geolocation' in navigator),
          m.addTest('ie8compat', !e.addEventListener && !!n.documentMode && 7 === n.documentMode),
          m.addTest('intl', !!D('Intl', e)),
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
          m.addTest('pagevisibility', !!D('hidden', n, !1)),
          m.addTest('performance', !!D('performance', e));
        var M = [''].concat(T);
        (_._domPrefixesAll = M),
          m.addTest('pointerevents', function () {
            for (var t = 0, e = M.length; t < e; t++) if (E(M[t] + 'pointerdown')) return !0;
            return !1;
          }),
          m.addTest('pointerlock', !!D('exitPointerLock', n)),
          m.addTest('queryselector', 'querySelector' in n && 'querySelectorAll' in n),
          m.addTest('quotamanagement', function () {
            var t = D('temporaryStorage', navigator),
              e = D('persistentStorage', navigator);
            return !(!t || !e);
          }),
          m.addTest('requestanimationframe', !!D('requestAnimationFrame', e), { aliases: ['raf'] }),
          m.addTest('serviceworker', 'serviceWorker' in navigator);
        var L = _._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
        _._prefixes = L;
        var U = (function () {
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
        (_.mq = U),
          m.addTest('touchevents', function () {
            if (
              'ontouchstart' in e ||
              e.TouchEvent ||
              (e.DocumentTouch && n instanceof DocumentTouch)
            )
              return !0;
            var t = ['(', L.join('touch-enabled),('), 'heartz', ')'].join('');
            return U(t);
          }),
          m.addTest('typedarrays', 'ArrayBuffer' in e),
          m.addTest('vibrate', !!D('vibrate', navigator)),
          (function () {
            var t = a('video');
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
        var k = !1;
        try {
          k = 'WebSocket' in e && 2 === e.WebSocket.CLOSING;
        } catch (t) {}
        m.addTest('websockets', k),
          m.addTest('xdomainrequest', 'XDomainRequest' in e),
          m.addTest('matchmedia', !!D('matchMedia', e)),
          (function () {
            var t, e, n, i, a, o;
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
                for (i = r(e.fn, 'function') ? e.fn() : e.fn, a = 0; a < t.length; a++)
                  1 === (o = t[a].split('.')).length
                    ? (m[o[0]] = i)
                    : ((m[o[0]] && (!m[o[0]] || m[o[0]] instanceof Boolean)) ||
                        (m[o[0]] = new Boolean(m[o[0]])),
                      (m[o[0]][o[1]] = i)),
                    y.push((i ? '' : 'no-') + o.join('-'));
              }
          })(),
          delete _.addTest,
          delete _.addAsyncTest;
        for (var x = 0; x < m._q.length; x++) m._q[x]();
        t.Modernizr = m;
      })(_POSignalsEntities || (_POSignalsEntities = {}), window, document);
    });
  var __awaiter =
      (this && this.__awaiter) ||
      function (t, e, n, i) {
        return new (n || (n = Promise))(function (r, a) {
          function o(t) {
            try {
              u(i.next(t));
            } catch (t) {
              a(t);
            }
          }
          function s(t) {
            try {
              u(i.throw(t));
            } catch (t) {
              a(t);
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
                    })).then(o, s);
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
          a,
          o = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (a = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (a[Symbol.iterator] = function () {
              return this;
            }),
          a
        );
        function s(a) {
          return function (s) {
            return (function (a) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; o; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & a[0]
                          ? i.return
                          : a[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, a[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                    case 0:
                    case 1:
                      r = a;
                      break;
                    case 4:
                      return o.label++, { value: a[1], done: !1 };
                    case 5:
                      o.label++, (i = a[1]), (a = [0]);
                      continue;
                    case 7:
                      (a = o.ops.pop()), o.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = o.trys).length > 0 && r[r.length - 1]) &&
                        (6 === a[0] || 2 === a[0])
                      ) {
                        o = 0;
                        continue;
                      }
                      if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                        o.label = a[1];
                        break;
                      }
                      if (6 === a[0] && o.label < r[1]) {
                        (o.label = r[1]), (r = a);
                        break;
                      }
                      if (r && o.label < r[2]) {
                        (o.label = r[2]), o.ops.push(a);
                        break;
                      }
                      r[2] && o.ops.pop(), o.trys.pop();
                      continue;
                  }
                  a = e.call(t, o);
                } catch (t) {
                  (a = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & a[0]) throw a[1];
              return { value: a[0] ? a[1] : void 0, done: !0 };
            })([a, s]);
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
              return this._userAgentData && this._userAgentData.device
                ? this._userAgentData.device.type
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
                return '5.4.0w';
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
                var n, i, r, a;
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return [4, this._crypto.subtle.exportKey('spki', e.publicKey)];
                    case 1:
                      return (
                        (n = o.sent()),
                        (i = t.Util.ab2str(n)),
                        (r = btoa(i)),
                        (a = '-----BEGIN PUBLIC KEY-----\n' + r + '\n-----END PUBLIC KEY-----'),
                        t.Logger.debug('Exported base64 pub key: ', a),
                        [2, a]
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
                var n, i, r, a;
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return [4, this._crypto.subtle.exportKey('pkcs8', e.privateKey)];
                    case 1:
                      return (
                        (n = o.sent()),
                        (i = t.Util.ab2str(n)),
                        (r = btoa(i)),
                        (a = '-----BEGIN PRIVATE KEY-----\n' + r + '\n-----END PRIVATE KEY-----'),
                        t.Logger.debug('Exported base64 pem:', a),
                        [2, a]
                      );
                  }
                });
              });
            }),
            (e.prototype.signJWT = function (e, n, i, r, a) {
              return (
                void 0 === i && (i = 0),
                __awaiter(this, void 0, void 0, function () {
                  var i, o, s, u, c, l, d, h, f;
                  return __generator(this, function (g) {
                    switch (g.label) {
                      case 0:
                        return [4, this.exportPublicKeyJwk(n)];
                      case 1:
                        if (
                          ((i = g.sent()),
                          (o = { alg: 'ES256', typ: 'JWT', jwk: i, kid: a }),
                          (s = { deviceAttributesSerialized: e, iat: Math.floor(r / 1e3) }),
                          !n.privateKey)
                        )
                          throw new Error('Require key');
                        if ('ES256' !== o.alg && 'JWT' !== o.typ)
                          throw new Error(
                            'jwt-encode only support the ES256 algorithm and the JWT type of hash',
                          );
                        return (
                          (u = t.Util.encode(o)),
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
                var i, r, a, o, s, u, c;
                return __generator(this, function (l) {
                  switch (l.label) {
                    case 0:
                      if (
                        ((i = e.split('.')),
                        (r = i[0]),
                        (a = i[1]),
                        (o = i[2]),
                        'ES256' !== (s = t.Util.parseJwt(r)).alg && 'JWT' !== s.typ)
                      )
                        throw new Error(
                          'JWT header supports only ES256 algorithm and the JWT type of hash',
                        );
                      return (
                        t.Util.parseJwt(a),
                        (u = Uint8Array.from(
                          atob(o.replace(/-/g, '+').replace(/_/g, '/')),
                          function (t) {
                            return t.charCodeAt(0);
                          },
                        )),
                        (c = t.Util.string2buf(r + '.' + a)),
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
                a,
                o = t.length,
                s = 0;
              for (r = 0; r < o; r++)
                55296 == (64512 & (n = t.charCodeAt(r))) &&
                  r + 1 < o &&
                  56320 == (64512 & (i = t.charCodeAt(r + 1))) &&
                  ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++),
                  (s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
              for (e = new Uint8Array(s), a = 0, r = 0; a < s; r++)
                55296 == (64512 & (n = t.charCodeAt(r))) &&
                  r + 1 < o &&
                  56320 == (64512 & (i = t.charCodeAt(r + 1))) &&
                  ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++),
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
              for (var r = n.allKeys(e), a = 0; a < r.length; )
                n.isObject(e[r[a]]) || (i && (!i || void 0 !== t[r[a]])) || (t[r[a]] = e[r[a]]),
                  a++;
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
              for (var e = n.allKeys(t), i = e.length, r = Array(i), a = 0; a < i; a++)
                r[a] = t[e[a]];
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
              for (var e = {}, n = 0, i = t; n < i.length; n++) {
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
                  a = 0;
                do {
                  if (r.call(t, e)) return t;
                  t = t.parentElement || t.parentNode;
                } while (null !== t && 1 === t.nodeType && a++ < n);
                return null;
              } catch (t) {
                return null;
              }
            }),
            (n.anySelectorMatches = function (t, n, i) {
              try {
                for (var r = 0, a = n; r < a.length; r++) {
                  var o = a[r];
                  if (this.isSelectorMatches(t, o, i)) return !0;
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
                  var a = r,
                    o = e[r];
                  t.length > 0 && (a = t + '.' + r), n.isObject(o) ? n.dive(a, o, i) : (i[a] = o);
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
              var a,
                o = e[0];
              for (a = 1; a < e.length && a < r; a++) {
                if (
                  Math.max(Math.abs(e[a].getX() - o.getX()), Math.abs(e[a].getY() - o.getY())) >= n
                )
                  break;
              }
              return e.slice(0, Math.max(a + 1, i));
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
              return n.base64url(btoa(JSON.stringify(t)));
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
      return new (n || (n = Promise))(function (r, a) {
        function o(t) {
          try {
            u(i.next(t));
          } catch (t) {
            a(t);
          }
        }
        function s(t) {
          try {
            u(i.throw(t));
          } catch (t) {
            a(t);
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
                  })).then(o, s);
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
          a,
          o = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (a = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (a[Symbol.iterator] = function () {
              return this;
            }),
          a
        );
        function s(a) {
          return function (s) {
            return (function (a) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; o; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & a[0]
                          ? i.return
                          : a[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, a[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                    case 0:
                    case 1:
                      r = a;
                      break;
                    case 4:
                      return o.label++, { value: a[1], done: !1 };
                    case 5:
                      o.label++, (i = a[1]), (a = [0]);
                      continue;
                    case 7:
                      (a = o.ops.pop()), o.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = o.trys).length > 0 && r[r.length - 1]) &&
                        (6 === a[0] || 2 === a[0])
                      ) {
                        o = 0;
                        continue;
                      }
                      if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                        o.label = a[1];
                        break;
                      }
                      if (6 === a[0] && o.label < r[1]) {
                        (o.label = r[1]), (r = a);
                        break;
                      }
                      if (r && o.label < r[2]) {
                        (o.label = r[2]), o.ops.push(a);
                        break;
                      }
                      r[2] && o.ops.pop(), o.trys.pop();
                      continue;
                  }
                  a = e.call(t, o);
                } catch (t) {
                  (a = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & a[0]) throw a[1];
              return { value: a[0] ? a[1] : void 0, done: !0 };
            })([a, s]);
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
                        return __generator(this, function (a) {
                          switch (a.label) {
                            case 0:
                              return (
                                (i = n),
                                [
                                  4,
                                  e(this._PingDBName, t._version, {
                                    upgrade: function (e, n, i, r, a) {
                                      e.createObjectStore(t._storeDefaultName);
                                    },
                                  }),
                                ]
                              );
                            case 1:
                              return (i.indexedDatabase = a.sent()), r(n), [2];
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
              var r, a, o;
              return __generator(this, function (s) {
                switch (s.label) {
                  case 0:
                    return (
                      (a = (r = this.cryptoHandler).signJWT), (o = [t]), [4, this.getDeviceKeys()]
                    );
                  case 1:
                    return [4, a.apply(r, o.concat([s.sent(), e._default_salt, n, i]))];
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
                (this.universalTrustEnabled = this.isUniversalTrustEnabled(
                  t.universalDeviceIdentification,
                )),
                (this.devEnv = t.devEnv);
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
                var n, i, r;
                return __generator(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return (
                        (i = this.signalsLocalStorage.getItem(
                          t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                        )) && (this.cachedDeviceId = i),
                        this.universalTrustEnabled
                          ? ((this.deviceTrust = { attestation: {}, dtts: new Date().getTime() }),
                            (r = this),
                            [4, e.IndexedDBStorage.initDB()])
                          : [3, 3]
                      );
                    case 1:
                      return (r.indexedDBStorage = a.sent()), [4, this.loadLocalDeviceTrust()];
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
                      return !this.universalTrustEnabled || (this.getDeviceId() && n)
                        ? [3, 10]
                        : [4, this.createDomainKeys(this.disableHub)];
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
            (n.prototype.associateDeviceDetails = function (e) {
              var n, i;
              return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return (
                        t._POSignalsUtils.Logger.debug('Associating fresh device details'),
                        (this.cachedDeviceId = 'Id-' + t._POSignalsUtils.Util.newGuid()),
                        this.signalsLocalStorage.setItem(
                          t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                          this.cachedDeviceId,
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
                      return (r.fallbackDeviceKey = a.sent()[0]), [3, 4];
                    case 2:
                      return [
                        4,
                        this.crossStorage.set(
                          t._POSignalsUtils.Constants.DEVICE_ID_KEY,
                          this.cachedDeviceId,
                        ),
                      ];
                    case 3:
                      a.sent(), (a.label = 4);
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
                var i, r, a, o, s;
                return __generator(this, function (u) {
                  switch (u.label) {
                    case 0:
                      return (
                        (i = this.universalTrustEnabled ? '1.0.7' : '1.0.1'),
                        (r = 'https://apps.pingone.com/signals/web-sdk/hub-' + i + '/hub.html'),
                        (a = ((null === n || void 0 === n ? void 0 : n.trim()) || r).replace(
                          /\/$/,
                          '',
                        )).endsWith('html') || (a += '/hub.html'),
                        (this.crossStorage = new e.CrossStorage(a, { timeout: 2e3 })),
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
                      return (o = u.sent()), (this.cachedDeviceId = o[0]), [3, 5];
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
                          (o && o[1]
                            ? ((this.deviceTrust.attestation.fallbackDeviceKey = o[1]),
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
            (n.prototype.isUniversalTrustEnabled = function (t) {
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
    (__awaiter =
      (this && this.__awaiter) ||
      function (t, e, n, i) {
        return new (n || (n = Promise))(function (r, a) {
          function o(t) {
            try {
              u(i.next(t));
            } catch (t) {
              a(t);
            }
          }
          function s(t) {
            try {
              u(i.throw(t));
            } catch (t) {
              a(t);
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
                    })).then(o, s);
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
          a,
          o = {
            label: 0,
            sent: function () {
              if (1 & r[0]) throw r[1];
              return r[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (a = { next: s(0), throw: s(1), return: s(2) }),
          'function' == typeof Symbol &&
            (a[Symbol.iterator] = function () {
              return this;
            }),
          a
        );
        function s(a) {
          return function (s) {
            return (function (a) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; o; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (r =
                        2 & a[0]
                          ? i.return
                          : a[0]
                            ? i.throw || ((r = i.return) && r.call(i), 0)
                            : i.next) &&
                      !(r = r.call(i, a[1])).done)
                  )
                    return r;
                  switch (((i = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                    case 0:
                    case 1:
                      r = a;
                      break;
                    case 4:
                      return o.label++, { value: a[1], done: !1 };
                    case 5:
                      o.label++, (i = a[1]), (a = [0]);
                      continue;
                    case 7:
                      (a = o.ops.pop()), o.trys.pop();
                      continue;
                    default:
                      if (
                        !(r = (r = o.trys).length > 0 && r[r.length - 1]) &&
                        (6 === a[0] || 2 === a[0])
                      ) {
                        o = 0;
                        continue;
                      }
                      if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                        o.label = a[1];
                        break;
                      }
                      if (6 === a[0] && o.label < r[1]) {
                        (o.label = r[1]), (r = a);
                        break;
                      }
                      if (r && o.label < r[2]) {
                        (o.label = r[2]), o.ops.push(a);
                        break;
                      }
                      r[2] && o.ops.pop(), o.trys.pop();
                      continue;
                  }
                  a = e.call(t, o);
                } catch (t) {
                  (a = [6, t]), (i = 0);
                } finally {
                  n = r = 0;
                }
              if (5 & a[0]) throw a[1];
              return { value: a[0] ? a[1] : void 0, done: !0 };
            })([a, s]);
          };
        }
      });
  !(function (t) {
    !(function (t) {
      var e = (function () {
        function t() {}
        return (
          (t.prototype.isCanvasSupported = function () {
            var t = document.createElement('canvas');
            return !(!t.getContext || !t.getContext('2d'));
          }),
          (t.prototype.getWebglCanvas = function (t) {
            var e = document.createElement('canvas'),
              n = null;
            try {
              n =
                'webgl' === t
                  ? e.getContext('webgl') || e.getContext('experimental-webgl')
                  : e.getContext('webgl2');
            } catch (t) {}
            return n || (n = null), n;
          }),
          (t.prototype.isWebGlSupported = function (t) {
            if (!this.isCanvasSupported()) return !1;
            var e = this.getWebglCanvas(t);
            return (
              ('webgl' === t ? !!window.WebGLRenderingContext : !!window.WebGL2RenderingContext) &&
              !!e
            );
          }),
          (t.prototype.isWebGl = function (t) {
            return !!this.isWebGlSupported(t) && !!this.getWebglCanvas(t);
          }),
          (t.prototype.getWebglVendorAndRenderer = function (t) {
            try {
              if (this.isWebGlSupported(t)) {
                var e = this.getWebglCanvas(t),
                  n = e.getExtension('WEBGL_debug_renderer_info');
                return (
                  e.getParameter(n.UNMASKED_VENDOR_WEBGL) +
                  '~' +
                  e.getParameter(n.UNMASKED_RENDERER_WEBGL)
                );
              }
            } catch (t) {}
            return null;
          }),
          (t.prototype.getHasLiedLanguages = function () {
            if (void 0 !== navigator.languages)
              try {
                if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2))
                  return !0;
              } catch (t) {
                return !0;
              }
            return !1;
          }),
          (t.prototype.getHasLiedResolution = function () {
            return (
              window.screen.width < window.screen.availWidth ||
              window.screen.height < window.screen.availHeight
            );
          }),
          (t.prototype.getHasLiedOs = function () {
            var t,
              e = navigator.userAgent.toLowerCase(),
              n = navigator.oscpu,
              i = navigator.platform.toLowerCase();
            if (
              ((t =
                e.indexOf('windows phone') >= 0
                  ? 'Windows Phone'
                  : e.indexOf('win') >= 0
                    ? 'Windows'
                    : e.indexOf('android') >= 0
                      ? 'Android'
                      : e.indexOf('linux') >= 0 || e.indexOf('cros') >= 0
                        ? 'Linux'
                        : e.indexOf('iphone') >= 0 || e.indexOf('ipad') >= 0
                          ? 'iOS'
                          : e.indexOf('mac') >= 0
                            ? 'Mac'
                            : 'Other'),
              ('ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0) &&
                'Windows Phone' !== t &&
                'Android' !== t &&
                'iOS' !== t &&
                'Other' !== t)
            )
              return !0;
            if (void 0 !== n) {
              if (
                (n = n.toLowerCase()).indexOf('win') >= 0 &&
                'Windows' !== t &&
                'Windows Phone' !== t
              )
                return !0;
              if (n.indexOf('linux') >= 0 && 'Linux' !== t && 'Android' !== t) return !0;
              if (n.indexOf('mac') >= 0 && 'Mac' !== t && 'iOS' !== t) return !0;
              if (
                (-1 === n.indexOf('win') && -1 === n.indexOf('linux') && -1 === n.indexOf('mac')) !=
                ('Other' === t)
              )
                return !0;
            }
            return (
              (i.indexOf('win') >= 0 && 'Windows' !== t && 'Windows Phone' !== t) ||
              ((i.indexOf('linux') >= 0 || i.indexOf('android') >= 0 || i.indexOf('pike') >= 0) &&
                'Linux' !== t &&
                'Android' !== t) ||
              ((i.indexOf('mac') >= 0 ||
                i.indexOf('ipad') >= 0 ||
                i.indexOf('ipod') >= 0 ||
                i.indexOf('iphone') >= 0) &&
                'Mac' !== t &&
                'iOS' !== t) ||
              (i.indexOf('win') < 0 &&
                i.indexOf('linux') < 0 &&
                i.indexOf('mac') < 0 &&
                i.indexOf('iphone') < 0 &&
                i.indexOf('ipad') < 0) !==
                ('Other' === t) ||
              (void 0 === navigator.plugins && 'Windows' !== t && 'Windows Phone' !== t)
            );
          }),
          (t.prototype.getHasLiedBrowser = function () {
            var t,
              e = navigator.userAgent.toLowerCase(),
              n = navigator.productSub;
            if (
              ('Chrome' ===
                (t =
                  e.indexOf('firefox') >= 0
                    ? 'Firefox'
                    : e.indexOf('opera') >= 0 || e.indexOf('opr') >= 0
                      ? 'Opera'
                      : e.indexOf('chrome') >= 0
                        ? 'Chrome'
                        : e.indexOf('safari') >= 0
                          ? 'Safari'
                          : e.indexOf('trident') >= 0
                            ? 'Internet Explorer'
                            : 'Other') ||
                'Safari' === t ||
                'Opera' === t) &&
              '20030107' !== n
            )
              return !0;
            var i,
              r = eval.toString().length;
            if (37 === r && 'Safari' !== t && 'Firefox' !== t && 'Other' !== t) return !0;
            if (39 === r && 'Internet Explorer' !== t && 'Other' !== t) return !0;
            if (33 === r && 'Chrome' !== t && 'Opera' !== t && 'Other' !== t) return !0;
            try {
              throw 'a';
            } catch (t) {
              try {
                t.toSource(), (i = !0);
              } catch (t) {
                i = !1;
              }
            }
            return i && 'Firefox' !== t && 'Other' !== t;
          }),
          t
        );
      })();
      t.FingerprintLegacyMetadata = e;
    })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function n(e, n, i) {
            (this.sessionData = e),
              (this.metadataParams = n),
              (this.externalIdentifiers = i),
              (this.deviceId = null),
              (this.hasMicrophone = null),
              (this.hasSpeakers = null),
              (this.hasWebcam = null),
              (this.isBatterySupported = null),
              (this.batteryLevel = null),
              (this.batteryCharging = null),
              (this.batteryChargingTime = null),
              (this.batteryDischargingTime = null),
              (this.headlessTests = new Map()),
              (this.lieTests = {}),
              (this.gpsSupported = null),
              (this.fingerPrintComponentKeys = new Set([
                'navigatorPlatform',
                'colorDepth',
                'deviceMemory',
                'pixelRatio',
                'hardwareConcurrency',
                'screenResolution',
                'availableScreenResolution',
                'timezoneOffset',
                'timezone',
                'sessionStorage',
                'localStorage',
                'indexedDB',
                'addBehavior',
                'openDatabase',
                'cpuClass',
                'platform',
                'canvas',
                'adBlock',
                'touchSupport',
                'fonts',
                'audio',
                'osCpu',
                'productSub',
                'emptyEvalLength',
                'errorFF',
                'chrome',
                'cookiesEnabled',
              ])),
              (this.webGlStatus = -1),
              (this.numberOfVideoDevices = 0),
              (this.numberOfAudioDevices = 0),
              (this.videoInputDevices = []),
              (this.audioInputDevices = []),
              (this.audioOutputDevices = []),
              (this.webRtcIps = new Map()),
              (this.lastCalculatedMetadata = null),
              (this.metadataQueue = new t.PromiseQueue(1)),
              (this.serializedDeviceAttributes = null);
          }
          return (
            Object.defineProperty(n.prototype, 'OPS', {
              get: function () {
                if (!this.metadataParams.browserInfo.isIphoneOrIPad) return 0;
                var t = this.sessionData.ops;
                return t || ((t = this.getOps()), (this.sessionData.ops = t)), t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.prototype.getDeviceAttributes = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e = this;
                return __generator(this, function (n) {
                  return [
                    2,
                    this.metadataQueue.add(function () {
                      return __awaiter(e, void 0, void 0, function () {
                        var e;
                        return __generator(this, function (n) {
                          switch (n.label) {
                            case 0:
                              return this.lastCalculatedMetadata
                                ? [3, 2]
                                : ((e = this), [4, this.calculateDeviceMetadata()]);
                            case 1:
                              (e.lastCalculatedMetadata = n.sent()),
                                t._POSignalsUtils.Logger.info('calculated device attributes.'),
                                t._POSignalsUtils.Logger.info(
                                  'PingOne Signals deviceId: ' + this.deviceId,
                                ),
                                this.sessionData.closeTrustStore(),
                                (n.label = 2);
                            case 2:
                              return (
                                this.sessionData.universalTrustEnabled &&
                                  (this.serializedDeviceAttributes =
                                    this.serializedDeviceAttributes ||
                                    JSON.stringify(this.lastCalculatedMetadata)),
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
            (n.prototype.getObfsInfo = function () {
              return { identifier: 'x1', key: 'Xq7tSbjB517mhZwt' };
            }),
            (n.prototype.getSerializedDeviceAttributes = function () {
              return this.serializedDeviceAttributes;
            }),
            (n.prototype.calculateDeviceMetadata = function () {
              return __awaiter(this, void 0, void 0, function () {
                var n, i, r, a, o;
                return __generator(this, function (s) {
                  switch (s.label) {
                    case 0:
                      return (
                        (this.gpsSupported = null != navigator.geolocation),
                        (n = this.metadataParams.metadataBlackList),
                        (i = [
                          this.sessionData.initDeviceIdentity().catch(function (e) {
                            t._POSignalsUtils.Logger.warn('failed to get deviceId info', e);
                          }),
                          this.getFingerPrint(n).catch(function (e) {
                            t._POSignalsUtils.Logger.warn(
                              'failed to get fingerprint info',
                              e.message,
                            );
                          }),
                          this.getPrivateMode().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn('failed to get incognito info', e);
                          }),
                          e.Incognito.isPrivateMode().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn(
                              'failed to get private mode info',
                              e,
                            );
                          }),
                          this.getPermissionsMetadata().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn(
                              'failed to get permissions info',
                              e,
                            );
                          }),
                          new e.DetectHeadless(n).getHeadlessResults().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn(
                              'failed to get headless results',
                              e,
                            );
                          }),
                          new e.DetectLies(n).getAllLies().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn('failed to get lies results', e);
                          }),
                          this.audioIntVideoInit().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn(
                              'failed to get audio-video info',
                              e,
                            );
                          }),
                          this.batteryInit().catch(function (e) {
                            return t._POSignalsUtils.Logger.warn('failed to get battery info', e);
                          }),
                        ]),
                        [4, Promise.all(i)]
                      );
                    case 1:
                      return (
                        (o = s.sent()),
                        (this.deviceId = o[0]),
                        (this.fingerPrint = o[1]),
                        (this.isPrivateMode = o[2]),
                        (this.isPrivateModeV2 = o[3]),
                        (this.permissions = o[4]),
                        (this.headlessTests = o[5]),
                        (this.lieTests = o[6]),
                        (r = {
                          ops: this.OPS,
                          devicePixelRatio: window.devicePixelRatio,
                          screenWidth: window.screen.width,
                          screenHeight: window.screen.height,
                        }),
                        t._POSignalsUtils.Util.extendPrimitiveValues(r, screen, !1),
                        (a = [
                          {
                            deviceId: this.deviceId,
                            deviceType: this.metadataParams.browserInfo.deviceType,
                            osVersion:
                              (
                                this.metadataParams.browserInfo.osName +
                                ' ' +
                                this.metadataParams.browserInfo.osVersion
                              ).trim() || '',
                            externalIdentifiers: this.externalIdentifiers,
                            origin: location.origin,
                            href: location.href,
                          },
                        ]),
                        [4, this.getIdentificationMetadata(n)]
                      );
                    case 2:
                      return [
                        2,
                        __assign.apply(void 0, [
                          __assign.apply(void 0, [
                            __assign.apply(void 0, [
                              __assign.apply(void 0, a.concat([s.sent()])),
                              this.getIoMetadata(),
                            ]),
                            this.getSensorsMetadata(),
                          ]),
                          r,
                        ]),
                      ];
                  }
                });
              });
            }),
            (n.prototype.batteryInit = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n = this;
                return __generator(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return (
                        (e = this),
                        [
                          4,
                          t._POSignalsUtils.Util.promiseTimeout(
                            50,
                            new Promise(function (i, r) {
                              navigator.getBattery
                                ? ((n.isBatterySupported = !0),
                                  navigator
                                    .getBattery()
                                    .then(function (t) {
                                      t &&
                                        ((e.batteryLevel = t.level),
                                        (e.batteryCharging = t.charging),
                                        (e.batteryChargingTime = t.chargingTime),
                                        (e.batteryDischargingTime = t.dischargingTime)),
                                        i();
                                    })
                                    .catch(function (e) {
                                      t._POSignalsUtils.Logger.warn('Battery ' + e), i();
                                    }))
                                : (t._POSignalsUtils.Logger.debug('Battery not supported!'), i());
                            }),
                          ),
                        ]
                      );
                    case 1:
                      return i.sent(), [2];
                  }
                });
              });
            }),
            (n.prototype.enumerateDevicesEnabled = function () {
              var e = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              return !t._POSignalsUtils.Util.inIframe() || !e;
            }),
            (n.prototype.getRTCPeerConnection = function () {
              var t =
                window.RTCPeerConnection ||
                window.mozRTCPeerConnection ||
                window.webkitRTCPeerConnection;
              if (!t) {
                var e = window['iframe.contentWindow'];
                e &&
                  (t = e.RTCPeerConnection || e.mozRTCPeerConnection || e.webkitRTCPeerConnection);
              }
              return t;
            }),
            (n.prototype.collectWebRtc = function () {
              var t = this;
              try {
                var e = {},
                  n = this.getRTCPeerConnection(),
                  i = new n(
                    { iceServers: [{ urls: this.metadataParams.webRtcUrl.trim() }] },
                    { optional: [{ RtpDataChannels: !0 }] },
                  );
                (i.onicecandidate = function (n) {
                  if (n.candidate) {
                    var i = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
                      n.candidate.candidate,
                    )[1];
                    void 0 === e[i] &&
                      (n.candidate.candidate.indexOf('host') > 0
                        ? t.webRtcIps.set('WEB_RTC_HOST_IP', i)
                        : n.candidate.candidate.indexOf('srflx') > 0 &&
                          t.webRtcIps.set('WEB_RTC_SRFLX_IP', i)),
                      (e[i] = !0);
                  }
                }),
                  i.createDataChannel(''),
                  i.createOffer(
                    function (t) {
                      i.setLocalDescription(
                        t,
                        function () {},
                        function () {},
                      );
                    },
                    function () {},
                  );
              } catch (t) {}
            }),
            (n.prototype.audioIntVideoInit = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n = this;
                return __generator(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return (
                        (e = this),
                        [
                          4,
                          t._POSignalsUtils.Util.promiseTimeout(
                            50,
                            new Promise(function (i, r) {
                              return n.enumerateDevicesEnabled()
                                ? navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
                                  ? void navigator.mediaDevices
                                      .enumerateDevices()
                                      .then(function (t) {
                                        t.forEach(function (t) {
                                          t.kind &&
                                            ('audioinput' == t.kind.toLowerCase()
                                              ? ((e.hasMicrophone = !0),
                                                e.numberOfAudioDevices++,
                                                t.label && e.audioInputDevices.push(t.label))
                                              : 'videoinput' == t.kind.toLowerCase()
                                                ? ((e.hasWebcam = !0),
                                                  e.numberOfVideoDevices++,
                                                  t.label && e.videoInputDevices.push(t.label))
                                                : 'audiooutput' == t.kind.toLowerCase() &&
                                                  ((e.hasSpeakers = !0),
                                                  e.numberOfAudioDevices++,
                                                  t.label && e.audioOutputDevices.push(t.label)));
                                        }),
                                          i();
                                      })
                                      .catch(function (e) {
                                        t._POSignalsUtils.Logger.warn('enumerateDevices failed', e),
                                          i();
                                      })
                                  : (t._POSignalsUtils.Logger.debug(
                                      'enumerateDevices() not supported.',
                                    ),
                                    void i())
                                : (t._POSignalsUtils.Logger.debug(
                                    'enumerateDevices() cannot run within safari iframe',
                                  ),
                                  void i());
                            }),
                          ),
                        ]
                      );
                    case 1:
                      return i.sent(), [2];
                  }
                });
              });
            }),
            (n.prototype.getFingerPrint = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n,
                  i,
                  r = this;
                return __generator(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return e.has('fingerprint')
                        ? [2, Promise.resolve('')]
                        : ((n = new Promise(function (e, n) {
                            return __awaiter(r, void 0, void 0, function () {
                              var i, r;
                              return __generator(this, function (a) {
                                switch (a.label) {
                                  case 0:
                                    return a.trys.push([0, 3, , 4]), [4, t.FingerprintJS.load()];
                                  case 1:
                                    return [4, a.sent().get()];
                                  case 2:
                                    return (
                                      (i = a.sent()),
                                      (this.fingerPrint = i.visitorId),
                                      (this.fingerPrintComponents = i.components),
                                      e(i.visitorId),
                                      [3, 4]
                                    );
                                  case 3:
                                    return (
                                      (r = a.sent()),
                                      t._POSignalsUtils.Logger.warn(
                                        'Failed to get FingerPrint ' + r,
                                      ),
                                      n({ err: r, message: 'FingerPrint failed' }),
                                      [3, 4]
                                    );
                                  case 4:
                                    return [2];
                                }
                              });
                            });
                          })),
                          (i = new Promise(function (e, n) {
                            return __awaiter(r, void 0, void 0, function () {
                              return __generator(this, function (e) {
                                switch (e.label) {
                                  case 0:
                                    return [
                                      4,
                                      t._POSignalsUtils.Util.delay(
                                        this.metadataParams.fingerprintTimeoutMillis,
                                      ),
                                    ];
                                  case 1:
                                    return e.sent(), n({ message: 'Fingerprint timeout' }), [2];
                                }
                              });
                            });
                          })),
                          [4, Promise.race([n, i])]);
                    case 1:
                      return [2, a.sent()];
                  }
                });
              });
            }),
            (n.prototype.getSensorsMetadata = function () {
              var t = {};
              return (
                this.flatAndAddMetadata(t, 'DEDVCE_LIGHT_SUPPORTED', function () {
                  return 'ondevicelight' in window;
                }),
                this.flatAndAddMetadata(t, 'IS_TOUCH_DEVICE', function () {
                  return 'ontouchstart' in window;
                }),
                window.DeviceMotionEvent ||
                  this.flatAndAddMetadata(t, 'ACCELEROMETER_SUPPORTED', function () {
                    return !1;
                  }),
                window.DeviceOrientationEvent ||
                  this.flatAndAddMetadata(t, 'GYROSCOPE_SUPPORTED', function () {
                    return !1;
                  }),
                this.flatAndAddMetadata(t, 'PROXIMITY_SUPPORTED', function () {
                  return 'ondeviceproximity' in window;
                }),
                t
              );
            }),
            (n.prototype.getIdentificationMetadata = function (i) {
              return __awaiter(this, void 0, void 0, function () {
                var r,
                  a,
                  o,
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
                  y,
                  b,
                  w,
                  E,
                  S,
                  O,
                  A = this;
                return __generator(this, function (P) {
                  switch (P.label) {
                    case 0:
                      return (
                        (r = this),
                        (a = {}),
                        this.flatAndAddMetadata(a, 'FINGER_PRINT', function () {
                          return A.fingerPrint;
                        }),
                        this.metadataParams.browserInfo.userAgentData &&
                          (this.flatAndAddMetadata(a, 'OS_NAME', function () {
                            return A.metadataParams.browserInfo.osName;
                          }),
                          this.flatAndAddMetadata(a, 'OS_VERSION', function () {
                            return A.metadataParams.browserInfo.osVersion;
                          })),
                        this.metadataParams.browserInfo.userAgentData &&
                          (this.flatAndAddMetadata(a, 'DEVICE_MODEL', function () {
                            return A.metadataParams.browserInfo.deviceModel;
                          }),
                          this.flatAndAddMetadata(a, 'DEVICE_VENDOR', function () {
                            return A.metadataParams.browserInfo.deviceVendor;
                          })),
                        this.metadataParams.browserInfo.userAgentData &&
                          (this.flatAndAddMetadata(a, 'BROWSER_ENGINE_NAME', function () {
                            return A.metadataParams.browserInfo.engineName;
                          }),
                          this.flatAndAddMetadata(a, 'BROWSER_ENGINE_VERSION', function () {
                            return A.metadataParams.browserInfo.engineVersion;
                          })),
                        this.metadataParams.browserInfo.userAgentData &&
                          this.flatAndAddMetadata(a, 'CPU_ARCHITECTURE', function () {
                            return A.metadataParams.browserInfo.cpuArchitecture;
                          }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_VENDOR', function () {
                          return navigator.vendor;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_PLUGINS_LENGTH', function () {
                          return navigator.plugins ? navigator.plugins.length : null;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_MIME_TYPES_LENGTH', function () {
                          return navigator.mimeTypes ? navigator.mimeTypes.length : null;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_LANGUAGE', function () {
                          return (
                            navigator.language ||
                            navigator.userLanguage ||
                            navigator.browserLanguage ||
                            navigator.systemLanguage
                          );
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_LANGUAGES', function () {
                          return navigator.languages;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_MAX_TOUCH_POINTS', function () {
                          return navigator.maxTouchPoints || navigator.msMaxTouchPoints;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_POINTER_ENABLED', function () {
                          return navigator.pointerEnabled || navigator.msPointerEnabled;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_WEB_DRIVER', function () {
                          return navigator.webdriver;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_HARDWARE_CONCURRENCY', function () {
                          return navigator.hardwareConcurrency;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_VIBRATE', function () {
                          return null != navigator.vibrate;
                        }),
                        this.flatAndAddMetadata(a, 'PUSH_NOTIFICATIONS_SUPPORTED', function () {
                          return 'Notification' in window;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_APP_CODE_NAME', function () {
                          return navigator.appCodeName;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_APP_NAME', function () {
                          return navigator.appName;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_APP_VERSION', function () {
                          return navigator.appVersion;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_ON_LINE', function () {
                          return navigator.onLine;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_PLATFORM', function () {
                          return navigator.platform;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_PRODUCT', function () {
                          return navigator.product;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_USER_AGENT', function () {
                          return navigator.userAgent;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_PDF_VIEWER_ENABLED', function () {
                          return navigator.pdfViewerEnabled;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_DEVICE_MEMORY', function () {
                          return navigator.deviceMemory;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_CONNECTION_RTT', function () {
                          return navigator.connection ? navigator.connection.rtt : null;
                        }),
                        i.has('modernizr') ? [3, 2] : [4, this.safeAddModernizrFeatures(a)]
                      );
                    case 1:
                      P.sent(), (P.label = 2);
                    case 2:
                      if (
                        ((o = window._pingOneSignalsPingResult || window._ST_PING)
                          ? this.flatAndAddMetadata(a, 'JS_CHALLENGE', function () {
                              return o;
                            })
                          : this.flatAndAddMetadata(a, 'JS_CHALLENGE', function () {
                              return 'unknown';
                            }),
                        (s = new e.FingerprintLegacyMetadata()),
                        this.flatAndAddMetadata(a, 'IS_WEBGL', function () {
                          return s.isWebGl('webgl');
                        }),
                        this.flatAndAddMetadata(a, 'WEBGLVENDORANDRENDERER', function () {
                          return s.getWebglVendorAndRenderer('webgl');
                        }),
                        this.flatAndAddMetadata(a, 'IS_WEBGL2', function () {
                          return s.isWebGl('webgl2');
                        }),
                        this.flatAndAddMetadata(a, 'WEBGL2VENDORANDRENDERER', function () {
                          return s.getWebglVendorAndRenderer('webgl2');
                        }),
                        this.flatAndAddMetadata(a, 'HASLIEDLANGUAGES', function () {
                          return s.getHasLiedLanguages();
                        }),
                        this.flatAndAddMetadata(a, 'HASLIEDRESOLUTION', function () {
                          return s.getHasLiedResolution();
                        }),
                        this.flatAndAddMetadata(a, 'HASLIEDOS', function () {
                          return s.getHasLiedOs();
                        }),
                        this.flatAndAddMetadata(a, 'HASLIEDBROWSER', function () {
                          return s.getHasLiedBrowser();
                        }),
                        this.fingerPrintComponents)
                      )
                        for (l in ((u = function (t) {
                          if (!c.fingerPrintComponents.hasOwnProperty(t)) return 'continue';
                          var e = c.fingerPrintComponents[t];
                          'fonts' == t
                            ? c.flatAndAddMetadata(a, 'JS_FONTS', function () {
                                return e.value.length;
                              })
                            : 'canvas' == t
                              ? c.flatAndAddMetadata(a, 'IS_CANVAS', function () {
                                  return null != e.value;
                                })
                              : 'screenResolution' == t && e.value && e.value.length
                                ? c.flatAndAddMetadata(a, 'RESOLUTION', function () {
                                    return e.value.join(',');
                                  })
                                : 'availableScreenResolution' == t && e.value && e.value.length
                                  ? c.flatAndAddMetadata(a, 'AVAILABLE_RESOLUTION', function () {
                                      return e.value.join(',');
                                    })
                                  : 'touchSupport' == t && e.value
                                    ? c.flatAndAddMetadata(a, 'TOUCH_SUPPORT', function () {
                                        return e.value;
                                      })
                                    : 'audio' == t && e.value
                                      ? c.flatAndAddMetadata(a, 'AUDIO_FINGERPRINT', function () {
                                          return e.value;
                                        })
                                      : 'osCpu' == t && e.value
                                        ? c.flatAndAddMetadata(a, 'OS_CPU', function () {
                                            return e.value;
                                          })
                                        : 'productSub' == t && e.value
                                          ? c.flatAndAddMetadata(a, 'PRODUCT_SUB', function () {
                                              return e.value;
                                            })
                                          : 'emptyEvalLength' == t && e.value
                                            ? c.flatAndAddMetadata(
                                                a,
                                                'EMPTY_EVAL_LENGTH',
                                                function () {
                                                  return e.value;
                                                },
                                              )
                                            : 'errorFF' == t && e.value
                                              ? c.flatAndAddMetadata(a, 'ERROR_FF', function () {
                                                  return e.value;
                                                })
                                              : 'chrome' == t && e.value
                                                ? c.flatAndAddMetadata(a, 'CHROME', function () {
                                                    return e.value;
                                                  })
                                                : 'cookiesEnabled' == t && e.value
                                                  ? c.flatAndAddMetadata(
                                                      a,
                                                      'COOKIES_ENABLED',
                                                      function () {
                                                        return e.value;
                                                      },
                                                    )
                                                  : r.fingerPrintComponentKeys.has(t) &&
                                                    null != t &&
                                                    c.flatAndAddMetadata(
                                                      a,
                                                      t.toUpperCase(),
                                                      function () {
                                                        return e.value;
                                                      },
                                                    );
                        }),
                        (c = this),
                        this.fingerPrintComponents))
                          u(l);
                      for (p in (this.flatAndAddMetadata(a, 'IS_INCOGNITO', function () {
                        return A.isPrivateMode;
                      }),
                      this.flatAndAddMetadata(a, 'IS_PRIVATE_MODE', function () {
                        return A.isPrivateModeV2;
                      }),
                      this.flatAndAddMetadata(a, 'IS_WEB_GLSTATUS', function () {
                        return A.webGlStatus;
                      }),
                      (d = {
                        selenium:
                          navigator.webdriver ||
                          t._POSignalsUtils.Util.getAttribute(
                            window.document.documentElement,
                            'webdriver',
                          ) ||
                          '',
                        phantomjs: {
                          _phantom: window._phantom || '',
                          __phantomas: window.__phantomas || '',
                          callPhantom: window.callPhantom || '',
                        },
                        nodejs: { Buffer: window.Buffer || '' },
                        couchjs: { emit: window.emit || '' },
                        rhino: { spawn: window.spawn || '' },
                        chromium: {
                          domAutomationController: window.domAutomationController || '',
                          domAutomation: window.domAutomation || '',
                        },
                        outerWidth: window.outerWidth,
                        outerHeight: window.outerHeight,
                      }),
                      this.flatAndAddMetadata(a, 'HEADLESS', function () {
                        return d;
                      }),
                      this.flatAndAddMetadata(a, 'HEADLESS', function () {
                        return A.headlessTests;
                      }),
                      this.flatAndAddMetadata(a, 'LIES', function () {
                        var t = {};
                        for (var e in A.lieTests) t[e] = JSON.stringify(A.lieTests[e]);
                        return Object.keys(t).length > 0 ? t : null;
                      }),
                      this.flatAndAddMetadata(a, 'STEALTH', function () {
                        return new e.DetectStealth(i).getStealthResult();
                      }),
                      this.flatAndAddMetadata(a, 'REF_LINK', function () {
                        return document.referrer;
                      }),
                      this.flatAndAddMetadata(a, 'PLUGINS', function () {
                        for (
                          var t = { length: navigator.plugins.length, details: [] }, e = 0;
                          e < t.length;
                          e++
                        )
                          t.details.push({
                            length: navigator.plugins[e].length,
                            name: navigator.plugins[e].name,
                            version: navigator.plugins[e].version,
                            filename: navigator.plugins[e].filename,
                          });
                        return t;
                      }),
                      this.flatAndAddMetadata(a, 'AUDIO', function () {
                        return A.numberOfAudioDevices;
                      }),
                      this.flatAndAddMetadata(a, 'VIDEO', function () {
                        return A.numberOfVideoDevices;
                      }),
                      this.flatAndAddMetadata(a, 'VIDEO_INPUT_DEVICES', function () {
                        return A.videoInputDevices.toString();
                      }),
                      this.flatAndAddMetadata(a, 'AUDIO_INPUT_DEVICES', function () {
                        return A.audioInputDevices.toString();
                      }),
                      this.flatAndAddMetadata(a, 'AUDIO_OUTPUT_DEVICES', function () {
                        return A.audioOutputDevices.toString();
                      }),
                      this.flatAndAddMetadata(a, 'MEDIA_CODEC_MP4_AVC1', function () {
                        return A.getMediaCodec('video/mp4;; codecs = "avc1.42E01E"');
                      }),
                      this.flatAndAddMetadata(a, 'MEDIA_CODEC_X_M4A', function () {
                        return A.getMediaCodec('audio/x-m4a');
                      }),
                      this.flatAndAddMetadata(a, 'MEDIA_CODEC_AAC', function () {
                        return A.getMediaCodec('audio/aac');
                      }),
                      (h = this.metadataParams.additionalMediaCodecs),
                      (f = function (t) {
                        if (!h.hasOwnProperty(t)) return 'continue';
                        g.flatAndAddMetadata(a, 'MEDIA_CODEC_' + t, function () {
                          return A.getMediaCodec(h[t]);
                        });
                      }),
                      (g = this),
                      h))
                        f(p);
                      window.performance &&
                        window.performance.memory &&
                        (this.flatAndAddMetadata(a, 'MEMORY_HEAP_SIZE_LIMIT', function () {
                          return window.performance.memory.jsHeapSizeLimit;
                        }),
                        this.flatAndAddMetadata(a, 'MEMORY_TOTAL_HEAP_SIZE', function () {
                          return window.performance.memory.totalJSHeapSize;
                        }),
                        this.flatAndAddMetadata(a, 'MEMORY_USED_HEAP_SIZE', function () {
                          return window.performance.memory.usedJSHeapSize;
                        })),
                        this.flatAndAddMetadata(a, 'IS_ACCEPT_COOKIES', function () {
                          return navigator.cookieEnabled;
                        }),
                        this.flatAndAddMetadata(a, 'selenium_in_document', function () {
                          return e.SeleniumProperties.seleniumInDocument();
                        }),
                        this.flatAndAddMetadata(a, 'selenium_in_window', function () {
                          return e.SeleniumProperties.seleniumInWindow();
                        }),
                        this.flatAndAddMetadata(a, 'selenium_in_navigator', function () {
                          return e.SeleniumProperties.seleniumInNavigator();
                        }),
                        this.flatAndAddMetadata(a, 'selenium_sequentum', function () {
                          return e.SeleniumProperties.seleniumSequentum();
                        }),
                        this.flatAndAddMetadata(a, 'DOCUMENT_ELEMENT_SELENIUM', function () {
                          return t._POSignalsUtils.Util.getAttribute(
                            window.document.documentElement,
                            'selenium',
                          );
                        }),
                        this.flatAndAddMetadata(a, 'DOCUMENT_ELEMENT_WEBDRIVER', function () {
                          return t._POSignalsUtils.Util.getAttribute(
                            window.document.documentElement,
                            'webdriver',
                          );
                        }),
                        this.flatAndAddMetadata(a, 'DOCUMENT_ELEMENT_DRIVER', function () {
                          return t._POSignalsUtils.Util.getAttribute(
                            window.document.documentElement,
                            'driver',
                          );
                        }),
                        this.flatAndAddMetadata(a, 'window_html_webdriver', function () {
                          return !!t._POSignalsUtils.Util.getAttribute(
                            document.getElementsByTagName('html')[0],
                            'webdriver',
                          );
                        }),
                        this.flatAndAddMetadata(a, 'window_geb', function () {
                          return !!window.geb;
                        }),
                        this.flatAndAddMetadata(a, 'window_awesomium', function () {
                          return !!window.awesomium;
                        }),
                        this.flatAndAddMetadata(a, 'window_RunPerfTest', function () {
                          return !!window.RunPerfTest;
                        }),
                        this.flatAndAddMetadata(a, 'window_fmget_targets', function () {
                          return !!window.fmget_targets;
                        }),
                        this.flatAndAddMetadata(a, 'hasTrustToken', function () {
                          return 'hasTrustToken' in document;
                        }),
                        this.flatAndAddMetadata(a, 'trustTokenOperationError', function () {
                          return 'trustTokenOperationError' in XMLHttpRequest.prototype;
                        }),
                        this.flatAndAddMetadata(a, 'setTrustToken', function () {
                          return 'setTrustToken' in XMLHttpRequest.prototype;
                        }),
                        this.flatAndAddMetadata(a, 'trustToken', function () {
                          return 'trustToken' in HTMLIFrameElement.prototype;
                        }),
                        this.flatAndAddMetadata(a, 'localStorage.length', function () {
                          return localStorage.length;
                        }),
                        this.flatAndAddMetadata(a, 'sessionStorage.length', function () {
                          return sessionStorage.length;
                        }),
                        this.sessionData.disabledStorage.forEach(function (t) {
                          A.flatAndAddMetadata(a, t.toUpperCase() + '_FAILED', function () {
                            return !0;
                          });
                        }),
                        this.flatAndAddMetadata(a, 'WEB_RTC_ENABLED', function () {
                          return !!A.getRTCPeerConnection();
                        }),
                        this.metadataParams.webRtcUrl &&
                          this.metadataParams.webRtcUrl.length > 0 &&
                          (this.collectWebRtc(),
                          this.webRtcIps.forEach(function (t, e) {
                            null != e &&
                              null != t &&
                              A.flatAndAddMetadata(a, e, function () {
                                return t;
                              });
                          }),
                          this.webRtcIps.clear()),
                        window.matchMedia &&
                          this.flatAndAddMetadata(a, 'MQ_SCREEN', function () {
                            var t = window.matchMedia(
                              '(min-width: ' + (window.innerWidth - 1) + 'px)',
                            );
                            return { matches: t.matches, media: t.media };
                          }),
                        this.addIframeData(a, i),
                        window.Notification &&
                          this.flatAndAddMetadata(a, 'NOTIFICATION_PERMISSION', function () {
                            return window.Notification.permission;
                          }),
                        this.flatAndAddMetadata(a, 'HAS_CHROME_APP', function () {
                          return window.chrome && 'app' in window.chrome;
                        }),
                        this.flatAndAddMetadata(a, 'HAS_CHROME_CSI', function () {
                          return window.chrome && 'csi' in window.chrome;
                        }),
                        this.flatAndAddMetadata(a, 'HAS_CHROME_LOADTIMES', function () {
                          return window.chrome && 'loadTimes' in window.chrome;
                        }),
                        this.flatAndAddMetadata(a, 'HAS_CHROME_RUNTIME', function () {
                          return window.chrome && 'runtime' in window.chrome;
                        }),
                        this.flatAndAddMetadata(a, 'CHROMIUM_MATH', n.detectChromium),
                        this.addClientHints(a),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_KEYBOARD_SUPPORTED', function () {
                          return !!navigator.keyboard;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_HID_SUPPORTED', function () {
                          return !!navigator.hid;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_SERIAL_SUPPORTED', function () {
                          return !!navigator.serial;
                        }),
                        this.flatAndAddMetadata(a, 'NAVIGATOR_PRESENTATION_SUPPORTED', function () {
                          return !!navigator.presentation;
                        }),
                        (P.label = 3);
                    case 3:
                      return (
                        P.trys.push([3, 6, , 7]),
                        i.has('floc') || !t.Util.isFunction(document.interestCohort)
                          ? [3, 5]
                          : [4, t.Util.promiseTimeout(100, document.interestCohort())]
                      );
                    case 4:
                      (v = P.sent()),
                        (_ = v.id),
                        (m = v.version),
                        this.flatAndAddMetadata(a, 'floc_id', function () {
                          return _;
                        }),
                        this.flatAndAddMetadata(a, 'floc_version', function () {
                          return m;
                        }),
                        (P.label = 5);
                    case 5:
                      return [3, 7];
                    case 6:
                      return P.sent(), [3, 7];
                    case 7:
                      for (w in ((y = function (e) {
                        b.flatAndAddMetadata(a, e, function () {
                          return t._POSignalsUtils.Util.getProperty(
                            window,
                            A.metadataParams.dataPoints[e],
                          );
                        });
                      }),
                      (b = this),
                      this.metadataParams.dataPoints))
                        y(w);
                      for (S in (E = this.metadataParams.propertyDescriptors))
                        E.hasOwnProperty(S) &&
                          (O = 'window' === S ? window : window[S]) &&
                          this.addPropertyDescriptorInfo(
                            O,
                            S.toUpperCase() + '_PROPERTY_DESCRIPTOR',
                            E[S],
                            a,
                          );
                      return [2, a];
                  }
                });
              });
            }),
            (n.prototype.addClientHints = function (e) {
              try {
                var n = navigator.userAgentData;
                if (!n) return;
                this.flatAndAddMetadata(e, 'NAVIGATOR_CLIENT_HINTS_PLATFORM', function () {
                  return n.platform;
                }),
                  this.flatAndAddMetadata(e, 'NAVIGATOR_CLIENT_HINTS_MOBILE', function () {
                    return n.mobile;
                  });
                var i = n.brands;
                if (!i) return;
                for (
                  var r = function (t) {
                      if (i[t].hasOwnProperty('brand') && i[t].hasOwnProperty('version')) {
                        var n = i[t].brand + ':' + i[t].version;
                        a.flatAndAddMetadata(e, 'NAVIGATOR_CLIENT_HINTS_BRAND_' + t, function () {
                          return n;
                        });
                      }
                    },
                    a = this,
                    o = 0;
                  o < i.length;
                  o++
                )
                  r(o);
              } catch (e) {
                t._POSignalsUtils.Logger.warn('failed to add client hints', e);
              }
            }),
            (n.prototype.addPropertyDescriptorInfo = function (e, n, i, r) {
              try {
                for (
                  var a = function (t) {
                      o.flatAndAddMetadata(r, n + '_' + t.toUpperCase(), function () {
                        var n = e.prototype ? e.prototype : e,
                          i = Object.getOwnPropertyDescriptor(n, t);
                        if (i) {
                          var r = i.get ? i.get.toString() : void 0;
                          return JSON.stringify({
                            configurable: i.configurable,
                            enumerable: i.enumerable,
                            value: i.value,
                            writable: i.writable,
                            getter: null != r && r.length < 100 ? r : void 0,
                          });
                        }
                        return 'undefined';
                      });
                    },
                    o = this,
                    s = 0,
                    u = i;
                  s < u.length;
                  s++
                ) {
                  a(u[s]);
                }
              } catch (e) {
                t._POSignalsUtils.Logger.warn('failed to add properties descriptor', e);
              }
            }),
            (n.prototype.addIframeData = function (e, n) {
              if (!n.has('IFRAME_DATA'))
                try {
                  var i = t._POSignalsUtils.Util.createInvisibleElement('iframe');
                  if (!i) return;
                  (i.srcdoc = 'blank page'),
                    document.body.appendChild(i),
                    this.flatAndAddMetadata(e, 'IFRAME_CHROME', function () {
                      return typeof i.contentWindow.chrome;
                    }),
                    this.flatAndAddMetadata(e, 'IFRAME_WIDTH', function () {
                      return i.contentWindow.screen.width;
                    }),
                    this.flatAndAddMetadata(e, 'IFRAME_HEIGHT', function () {
                      return i.contentWindow.screen.height;
                    }),
                    i.remove();
                } catch (e) {
                  t._POSignalsUtils.Logger.warn('failed to add iframe data', e);
                }
            }),
            (n.prototype.getPermissionsMetadata = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e, n, i, r, a, o;
                return __generator(this, function (s) {
                  switch (s.label) {
                    case 0:
                      if (
                        ((e = {}),
                        (n = [
                          'accelerometer',
                          'accessibility-events',
                          'ambient-light-sensor',
                          'background-sync',
                          'camera',
                          'clipboard-read',
                          'clipboard-write',
                          'geolocation',
                          'gyroscope',
                          'magnetometer',
                          'microphone',
                          'midi',
                          'notifications',
                          'payment-handler',
                          'persistent-storage',
                          'push',
                        ]),
                        (i = []),
                        navigator.permissions)
                      )
                        for (a in ((r = function (t) {
                          var r = n[t];
                          i.push(
                            navigator.permissions
                              .query({ name: r })
                              .then(function (t) {
                                e[r] = t.state;
                              })
                              .catch(function (t) {}),
                          );
                        }),
                        n))
                          r(a);
                      s.label = 1;
                    case 1:
                      return s.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                    case 2:
                      return s.sent(), [3, 4];
                    case 3:
                      return (o = s.sent()), t._POSignalsUtils.Logger.warn(o), [3, 4];
                    case 4:
                      return [2, e];
                  }
                });
              });
            }),
            (n.prototype.getMediaCodec = function (t) {
              var e = document.createElement('video');
              if (e && e.canPlayType) return e.canPlayType(t);
            }),
            (n.prototype.safeAddModernizrFeatures = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n, i, r, a, o, s;
                return __generator(this, function (u) {
                  switch (u.label) {
                    case 0:
                      return (
                        t.evaluateModernizr(),
                        (n = this),
                        (i = t.Modernizr),
                        (r = i.prefixed),
                        (a = i.hasEvent),
                        this.flatAndAddMetadata(e, 'ambient_light', function () {
                          return i.ambientlight;
                        }),
                        this.flatAndAddMetadata(e, 'application_cache', function () {
                          return i.applicationcache;
                        }),
                        this.flatAndAddMetadata(e, 'audio', function () {
                          return !!i.audio;
                        }),
                        i.audio &&
                          this.flatAndAddMetadata(e, 'audio', function () {
                            return i.audio;
                          }),
                        this.flatAndAddMetadata(e, 'battery_api', function () {
                          return !!r('battery', navigator) || !!r('getBattery', navigator);
                        }),
                        this.flatAndAddMetadata(e, 'blob_constructor', function () {
                          return i.blobconstructor;
                        }),
                        this.flatAndAddMetadata(e, 'context_menu', function () {
                          return i.contextmenu;
                        }),
                        this.flatAndAddMetadata(e, 'cors', function () {
                          return i.cors;
                        }),
                        this.flatAndAddMetadata(e, 'cryptography', function () {
                          return i.cryptography;
                        }),
                        this.flatAndAddMetadata(e, 'custom_elements', function () {
                          return i.customelements;
                        }),
                        this.flatAndAddMetadata(e, 'custom_protocol_handler', function () {
                          return i.customprotocolhandler;
                        }),
                        this.flatAndAddMetadata(e, 'custom_event', function () {
                          return i.customevent;
                        }),
                        this.flatAndAddMetadata(e, 'dart', function () {
                          return i.dart;
                        }),
                        this.flatAndAddMetadata(e, 'data_view', function () {
                          return i.dataview;
                        }),
                        this.flatAndAddMetadata(e, 'event_listener', function () {
                          return i.eventlistener;
                        }),
                        [4, this.safeModernizrOn('exiforientation')]
                      );
                    case 1:
                      return (
                        (o = u.sent()),
                        n.flatAndAddMetadata(e, 'exif_orientation', function () {
                          return o;
                        }),
                        this.flatAndAddMetadata(e, 'force_touch', function () {
                          return i.forcetouch;
                        }),
                        i.forcetouch &&
                          (this.flatAndAddMetadata(
                            e,
                            'force_touch.mouse_force_will_begin',
                            function () {
                              return a(r('mouseforcewillbegin', window, !1), window);
                            },
                          ),
                          this.flatAndAddMetadata(
                            e,
                            'force_touch.webkit_force_at_mouse_down',
                            function () {
                              return MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN;
                            },
                          ),
                          this.flatAndAddMetadata(
                            e,
                            'force_touch.webkit_force_at_force_mouse_down',
                            function () {
                              return MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;
                            },
                          )),
                        this.flatAndAddMetadata(e, 'full_screen', function () {
                          return i.fullscreen;
                        }),
                        this.flatAndAddMetadata(e, 'game_pads', function () {
                          return i.gamepads;
                        }),
                        this.flatAndAddMetadata(e, 'geo_location', function () {
                          return i.geolocation;
                        }),
                        this.flatAndAddMetadata(e, 'ie8compat', function () {
                          return i.ie8compat;
                        }),
                        [4, this.safeModernizrOn('indexeddb')]
                      );
                    case 2:
                      return (
                        (s = u.sent()),
                        n.flatAndAddMetadata(e, 'indexed_db', function () {
                          return s;
                        }),
                        this.flatAndAddMetadata(e, 'indexed_db_blob', function () {
                          return i.indexeddbblob;
                        }),
                        this.flatAndAddMetadata(e, 'internationalization', function () {
                          return i.intl;
                        }),
                        this.flatAndAddMetadata(e, 'json', function () {
                          return i.json;
                        }),
                        this.flatAndAddMetadata(e, 'ligatures', function () {
                          return i.ligatures;
                        }),
                        this.flatAndAddMetadata(e, 'media_source', function () {
                          return 'MediaSource' in window;
                        }),
                        this.flatAndAddMetadata(e, 'message_channel', function () {
                          return i.messagechannel;
                        }),
                        this.flatAndAddMetadata(e, 'notification', function () {
                          return i.notification;
                        }),
                        this.flatAndAddMetadata(e, 'page_visibility', function () {
                          return i.pagevisibility;
                        }),
                        this.flatAndAddMetadata(e, 'performance', function () {
                          return i.performance;
                        }),
                        this.flatAndAddMetadata(e, 'pointer_events', function () {
                          return i.pointerevents;
                        }),
                        this.flatAndAddMetadata(e, 'pointer_lock', function () {
                          return i.pointerlock;
                        }),
                        this.flatAndAddMetadata(e, 'proximity', function () {
                          return i.proximity;
                        }),
                        this.flatAndAddMetadata(e, 'query_selector', function () {
                          return i.queryselector;
                        }),
                        this.flatAndAddMetadata(e, 'quota_management', function () {
                          return i.quotamanagement;
                        }),
                        this.flatAndAddMetadata(e, 'request_animation_frame', function () {
                          return i.requestanimationframe;
                        }),
                        this.flatAndAddMetadata(e, 'service_worker', function () {
                          return i.serviceworker;
                        }),
                        this.flatAndAddMetadata(e, 'touch_events', function () {
                          return i.touchevents;
                        }),
                        this.flatAndAddMetadata(e, 'typed_arrays', function () {
                          return i.typedarrays;
                        }),
                        this.flatAndAddMetadata(e, 'vibrate', function () {
                          return i.vibrate;
                        }),
                        this.flatAndAddMetadata(e, 'video', function () {
                          return !!i.video;
                        }),
                        i.video &&
                          this.flatAndAddMetadata(e, 'video', function () {
                            return i.video;
                          }),
                        this.flatAndAddMetadata(e, 'web_gl', function () {
                          return i.webgl;
                        }),
                        this.flatAndAddMetadata(e, 'web_sockets', function () {
                          return i.websockets;
                        }),
                        this.flatAndAddMetadata(e, 'x_domain_request', function () {
                          return i.xdomainrequest;
                        }),
                        this.flatAndAddMetadata(e, 'matchmedia', function () {
                          return i.matchmedia;
                        }),
                        [2]
                      );
                  }
                });
              });
            }),
            (n.prototype.getIoMetadata = function () {
              var e = this,
                n = {},
                i = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
              return (
                this.flatAndAddMetadata(n, 'NETWORK_TYPE', function () {
                  return i ? i.type : null;
                }),
                this.flatAndAddMetadata(n, 'NETWORK_DOWNLOAD_MAX', function () {
                  return i ? i.downlinkMax : null;
                }),
                this.flatAndAddMetadata(n, 'BLUTOOTH_SUPPORTED', function () {
                  return !!navigator.bluetooth;
                }),
                this.flatAndAddMetadata(n, 'HAS_SPEAKERS', function () {
                  return e.hasSpeakers;
                }),
                this.flatAndAddMetadata(n, 'HAS_MICROPHONE', function () {
                  return e.hasMicrophone;
                }),
                this.flatAndAddMetadata(n, 'HAS_CAMERA', function () {
                  return e.hasWebcam;
                }),
                this.flatAndAddMetadata(n, 'BATTERY_SUPPORTED', function () {
                  return e.isBatterySupported;
                }),
                this.flatAndAddMetadata(n, 'BATTERY_LEVEL', function () {
                  return e.batteryLevel;
                }),
                this.flatAndAddMetadata(n, 'BATTERY_CHARGING', function () {
                  return e.batteryCharging;
                }),
                this.flatAndAddMetadata(n, 'BATTERY_CHARGING_TIME', function () {
                  return e.batteryChargingTime;
                }),
                this.flatAndAddMetadata(n, 'BATTERY_DISCHARGING_TIME', function () {
                  return e.batteryDischargingTime;
                }),
                this.flatAndAddMetadata(n, 'GPS_SUPPORTED', function () {
                  return e.gpsSupported;
                }),
                this.flatAndAddMetadata(n, 'IS_MOBILE', function () {
                  return t._POSignalsUtils.Util.isMobile;
                }),
                this.flatAndAddMetadata(n, 'HAS_TOUCH', function () {
                  return 'ontouchstart' in document.documentElement;
                }),
                this.flatAndAddMetadata(n, 'PERMISSIONS', function () {
                  return e.permissions;
                }),
                this.flatAndAddMetadata(n, 'PREFERS_COLOR_SCHEME', function () {
                  return window.matchMedia('(prefers-color-scheme: light)').matches
                    ? 'light'
                    : window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark'
                      : void 0;
                }),
                n
              );
            }),
            (n.prototype.safeAddMetadata = function (e, n, i) {
              try {
                var r = new Set(this.metadataParams.metadataBlackList || []);
                null == n || null == i || r.has(n) || (e[n] = i);
              } catch (e) {
                t._POSignalsUtils.Logger.warn('Failed to add ' + n + ' -> ' + i + ', ' + e);
              }
            }),
            (n.prototype.safeModernizrOn = function (e) {
              return __awaiter(this, void 0, void 0, function () {
                var n, i;
                return __generator(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (n = new Promise(function (n) {
                          try {
                            t.Modernizr.on(e, function (t) {
                              n(t);
                            });
                          } catch (i) {
                            n(null),
                              t._POSignalsUtils.Logger.warn(
                                'Modernizr.on Failed with feature ' + e,
                                i,
                              );
                          }
                        })),
                        (i = t._POSignalsUtils.Util.delay(250).then(function () {
                          return null;
                        })),
                        [4, Promise.race([n, i])]
                      );
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (n.prototype.flatAndAddMetadata = function (e, n, i) {
              try {
                var r = new Set(this.metadataParams.metadataBlackList || []);
                if (!n || r.has(n)) return;
                var a = i();
                if ('object' == typeof a && null !== a) {
                  var o = t._POSignalsUtils.Util.flatten(a);
                  for (var s in o) this.safeAddMetadata(e, n + '.' + s, o[s]);
                } else this.safeAddMetadata(e, n, a);
              } catch (e) {
                t._POSignalsUtils.Logger.warn('Failed to add ' + n, e);
              }
            }),
            (n.prototype.getOps = function () {
              var e,
                n = new Date(),
                i = 0;
              do {
                i++, (e = new Date().getTime() - n.getTime()), Math.sqrt(i * Math.random());
              } while (e < 500);
              var r = i / e;
              return t._POSignalsUtils.Logger.debug('Ops : ' + r), r;
            }),
            (n.prototype.getPrivateMode = function () {
              return __awaiter(this, void 0, void 0, function () {
                var t;
                return __generator(this, function (e) {
                  return (
                    (t = this),
                    [
                      2,
                      new Promise(function (e, n) {
                        t.detectPrivateMode(function (t) {
                          e(t);
                        });
                      }),
                    ]
                  );
                });
              });
            }),
            (n.prototype.detectPrivateMode = function (t) {
              var e,
                n = t.bind(null, !0),
                i = t.bind(null, !1);
              window.webkitRequestFileSystem
                ? window.webkitRequestFileSystem(0, 0, i, n)
                : 'MozAppearance' in document.documentElement.style
                  ? (((e = indexedDB.open('test')).onerror = n), (e.onsuccess = i))
                  : /constructor/i.test(window.HTMLElement) || window.safari
                    ? (function () {
                        try {
                          localStorage.length
                            ? i()
                            : ((localStorage.x = 1), localStorage.removeItem('x'), i());
                        } catch (t) {
                          navigator.cookieEnabled ? n() : i();
                        }
                      })()
                    : window.indexedDB || (!window.PointerEvent && !window.MSPointerEvent)
                      ? i()
                      : n();
            }),
            (n.detectChromium = function () {
              return (
                1.4474840516030247 == Math.acos(0.123) &&
                0.881373587019543 == Math.acosh(Math.SQRT2) &&
                1.1071487177940904 == Math.atan(2) &&
                0.5493061443340548 == Math.atanh(0.5) &&
                1.4645918875615231 == Math.cbrt(Math.PI) &&
                -0.4067775970251724 == Math.cos(21 * Math.LN2) &&
                9.199870313877772e307 == Math.cosh(492 * Math.LOG2E) &&
                1.718281828459045 == Math.expm1(1) &&
                101.76102278593319 == Math.hypot(6 * Math.PI, -100) &&
                0.4971498726941338 == Math.log10(Math.PI) &&
                1.2246467991473532e-16 == Math.sin(Math.PI) &&
                11.548739357257748 == Math.sinh(Math.PI) &&
                -3.3537128705376014 == Math.tan(10 * Math.LOG2E) &&
                0.12238344189440875 == Math.tanh(0.123) &&
                1.9275814160560204e-50 == Math.pow(Math.PI, -100)
              );
            }),
            n
          );
        })();
        e.Metadata = n;
      })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (t) {
        var e = (function () {
          function t() {}
          return (
            (t.seleniumInDocument = function () {
              for (
                var t = 0,
                  e = [
                    '__webdriver_evaluate',
                    '__selenium_evaluate',
                    '__webdriver_script_function',
                    '__webdriver_script_func',
                    '__webdriver_script_fn',
                    '__fxdriver_evaluate',
                    '__driver_unwrapped',
                    '__webdriver_unwrapped',
                    '__driver_evaluate',
                    '__selenium_unwrapped',
                    '__fxdriver_unwrapped',
                  ];
                t < e.length;
                t++
              ) {
                if (document[e[t]]) return !0;
              }
              return !1;
            }),
            (t.seleniumInWindow = function () {
              for (
                var t = 0,
                  e = [
                    '_phantom',
                    '__nightmare',
                    '_selenium',
                    'callPhantom',
                    'calledSelenium',
                    'callSelenium',
                    '_Selenium_IDE_Recorder',
                  ];
                t < e.length;
                t++
              ) {
                if (window[e[t]]) return !0;
              }
              return !1;
            }),
            (t.seleniumInNavigator = function () {
              for (
                var t = 0,
                  e = [
                    'webdriver',
                    '__driver_evaluate',
                    '__webdriver_evaluate',
                    '__selenium_evaluate',
                    '__fxdriver_evaluate',
                    '__driver_unwrapped',
                    '__webdriver_unwrapped',
                    '__selenium_unwrapped',
                    '__fxdriver_unwrapped',
                    '_Selenium_IDE_Recorder',
                    '_selenium',
                    'calledSelenium',
                    '_WEBDRIVER_ELEM_CACHE',
                    'ChromeDriverw',
                    'driver-evaluate',
                    'webdriver-evaluate',
                    'selenium-evaluate',
                    'webdriverCommand',
                    'webdriver-evaluate-response',
                    '__webdriverFunc',
                    '__webdriver_script_fn',
                    '__$webdriverAsyncExecutor',
                    '__lastWatirAlert',
                    '__lastWatirConfirm',
                    '__lastWatirPrompt',
                    '$chrome_asyncScriptInfo',
                    '$cdc_asdjflasutopfhvcZLmcfl_',
                  ];
                t < e.length;
                t++
              ) {
                if (navigator[e[t]]) return !0;
              }
              return !1;
            }),
            (t.seleniumSequentum = function () {
              return (
                window.external &&
                window.external.toString() &&
                -1 != window.external.toString().indexOf('Sequentum')
              );
            }),
            t
          );
        })();
        t.SeleniumProperties = e;
      })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function e(t) {
            this.propertyBlackList = t;
          }
          return (
            (e.prototype.getHeadlessResults = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n = this;
                return __generator(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [4, this.headlessResults(window)];
                    case 1:
                      return (
                        (e = i.sent()),
                        [
                          4,
                          this.test(e, 'iframe_window', function () {
                            return __awaiter(n, void 0, void 0, function () {
                              var e, n;
                              return __generator(this, function (i) {
                                switch (i.label) {
                                  case 0:
                                    return Object.getOwnPropertyDescriptors &&
                                      (e = t._POSignalsUtils.Util.createInvisibleElement('iframe'))
                                      ? ((e.srcdoc = 'page intentionally left blank'),
                                        document.body.appendChild(e),
                                        'function get contentWindow() { [native code] }' !==
                                        Object.getOwnPropertyDescriptors(
                                          HTMLIFrameElement.prototype,
                                        ).contentWindow.get.toString()
                                          ? [2, !0]
                                          : e.contentWindow === window
                                            ? [2, !0]
                                            : [4, this.headlessResults(e.contentWindow)])
                                      : [2];
                                  case 1:
                                    return (n = i.sent()), e.remove(), [2, n];
                                }
                              });
                            });
                          }),
                        ]
                      );
                    case 2:
                      return i.sent(), [2, e];
                  }
                });
              });
            }),
            (e.prototype.headlessResults = function (t) {
              return __awaiter(this, void 0, void 0, function () {
                var e,
                  n,
                  i = this;
                return __generator(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (e = new Map()),
                        (n = []).push(
                          this.test(e, 'headless_chrome', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              return __generator(this, function (e) {
                                return [2, /HeadlessChrome/.test(t.navigator.userAgent)];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'navigator.webdriver_present', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              return __generator(this, function (e) {
                                return [2, 'webdriver' in t.navigator];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'window.chrome_missing', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              return __generator(this, function (e) {
                                return [2, /Chrome/.test(t.navigator.userAgent) && !t.chrome];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'permissions_api', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              var e;
                              return __generator(this, function (n) {
                                switch (n.label) {
                                  case 0:
                                    return t.navigator.permissions && t.Notification
                                      ? [
                                          4,
                                          t.navigator.permissions.query({ name: 'notifications' }),
                                        ]
                                      : [3, 2];
                                  case 1:
                                    return (
                                      (e = n.sent()),
                                      [
                                        2,
                                        'denied' === t.Notification.permission &&
                                          'prompt' === e.state,
                                      ]
                                    );
                                  case 2:
                                    return [2];
                                }
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'permissions_api_overriden', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              var e;
                              return __generator(this, function (n) {
                                return (e = t.navigator.permissions)
                                  ? 'function query() { [native code] }' !== e.query.toString()
                                    ? [2, !0]
                                    : 'function toString() { [native code] }' !==
                                        e.query.toString.toString()
                                      ? [2, !0]
                                      : e.query.toString.hasOwnProperty('[[Handler]]') &&
                                          e.query.toString.hasOwnProperty('[[Target]]') &&
                                          e.query.toString.hasOwnProperty('[[IsRevoked]]')
                                        ? [2, !0]
                                        : [2, e.hasOwnProperty('query')]
                                  : [2];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'navigator.plugins_empty', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              return __generator(this, function (t) {
                                return [2, 0 === navigator.plugins.length];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'navigator.languages_blank', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              return __generator(this, function (t) {
                                return [2, '' === navigator.languages];
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'consistent_plugins_prototype', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              var t;
                              return __generator(this, function (e) {
                                return (
                                  (t = PluginArray.prototype === navigator.plugins.__proto__),
                                  navigator.plugins.length > 0 &&
                                    (t = t && Plugin.prototype === navigator.plugins[0].__proto__),
                                  [2, t]
                                );
                              });
                            });
                          }),
                        ),
                        n.push(
                          this.test(e, 'consistent_mimetypes_prototype', function () {
                            return __awaiter(i, void 0, void 0, function () {
                              var t;
                              return __generator(this, function (e) {
                                return (
                                  (t = MimeTypeArray.prototype === navigator.mimeTypes.__proto__),
                                  navigator.mimeTypes.length > 0 &&
                                    (t =
                                      t && MimeType.prototype === navigator.mimeTypes[0].__proto__),
                                  [2, t]
                                );
                              });
                            });
                          }),
                        ),
                        [4, Promise.all(n)]
                      );
                    case 1:
                      return r.sent(), [2, e];
                  }
                });
              });
            }),
            (e.prototype.test = function (e, n, i) {
              return __awaiter(this, void 0, void 0, function () {
                var r, a;
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return (
                        o.trys.push([0, 3, , 4]),
                        this.propertyBlackList.has(n)
                          ? [3, 2]
                          : [4, t._POSignalsUtils.Util.promiseTimeout(100, i())]
                      );
                    case 1:
                      null != (r = o.sent()) && (e[n] = r), (o.label = 2);
                    case 2:
                      return [3, 4];
                    case 3:
                      return (
                        (a = o.sent()),
                        t._POSignalsUtils.Logger.warn(n + ' headless test was failed', a),
                        [3, 4]
                      );
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            e
          );
        })();
        e.DetectHeadless = n;
      })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function n(t) {
            (this.propertyBlackList = t), (this.result = {});
          }
          return (
            (n.prototype.documentLie = function (t, e) {
              if (e.lied)
                for (var n = 0, i = e.lieTypes; n < i.length; n++) {
                  var r = i[n];
                  this.result[r] || (this.result[r] = []), this.result[r].push(t);
                }
            }),
            (n.prototype.getLies = function (t, e, i) {
              var r = this;
              if ((void 0 === i && (i = null), 'function' != typeof t))
                return { lied: !1, lieTypes: [] };
              var a = t.name.replace(/get\s/, ''),
                o = {
                  undefined_properties: function () {
                    return !!i && n.getUndefinedValueLie(i, a);
                  },
                  to_string: function () {
                    return n.getToStringLie(t, a, r.iframeWindow);
                  },
                  prototype_in_function: function () {
                    return n.getPrototypeInFunctionLie(t);
                  },
                  own_property: function () {
                    return n.getOwnPropertyLie(t);
                  },
                  object_to_string_error: function () {
                    return n.getNewObjectToStringTypeErrorLie(t);
                  },
                },
                s = Object.keys(o).filter(function (t) {
                  return !r.propertyBlackList.has('LIES.' + t) && !!o[t]();
                });
              return { lied: s.length > 0, lieTypes: s };
            }),
            (n.prototype.getAllLies = function () {
              return __awaiter(this, void 0, void 0, function () {
                var e;
                return __generator(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return this.propertyBlackList.has('LIES')
                        ? [2, this.result]
                        : (this.propertyBlackList.has('LIES_IFRAME') ||
                            ((e = t._POSignalsUtils.Util.createInvisibleElement('iframe')) &&
                              (document.body.appendChild(e), (this.iframeWindow = e))),
                          [
                            4,
                            Promise.all([
                              this.searchLies(
                                function () {
                                  return AnalyserNode;
                                },
                                { target: ['minDecibels'] },
                              ),
                              this.searchLies(
                                function () {
                                  return AudioBuffer;
                                },
                                { target: ['copyFromChannel'] },
                              ),
                              this.searchLies(
                                function () {
                                  return BiquadFilterNode;
                                },
                                { target: ['getFrequencyResponse'] },
                              ),
                              this.searchLies(
                                function () {
                                  return CanvasRenderingContext2D;
                                },
                                { target: ['getLineDash'] },
                              ),
                              this.searchLies(
                                function () {
                                  return DOMRect;
                                },
                                { target: ['height'] },
                              ),
                              this.searchLies(
                                function () {
                                  return DOMRectReadOnly;
                                },
                                { target: ['left'] },
                              ),
                              this.searchLies(
                                function () {
                                  return Element;
                                },
                                { target: ['getClientRects'] },
                              ),
                              this.searchLies(
                                function () {
                                  return HTMLCanvasElement;
                                },
                                { target: ['height'] },
                              ),
                              this.searchLies(
                                function () {
                                  return Math;
                                },
                                { target: ['sinh'] },
                              ),
                              this.searchLies(
                                function () {
                                  return MediaDevices;
                                },
                                { target: ['enumerateDevices'] },
                              ),
                              this.searchLies(
                                function () {
                                  return Navigator;
                                },
                                { target: ['plugins'] },
                              ),
                              this.searchLies(
                                function () {
                                  return OffscreenCanvasRenderingContext2D;
                                },
                                { target: ['getLineDash'] },
                              ),
                              this.searchLies(
                                function () {
                                  return SVGRect;
                                },
                                { target: ['x'] },
                              ),
                            ]),
                          ]);
                    case 1:
                      return n.sent(), this.iframeWindow.remove(), [2, this.result];
                  }
                });
              });
            }),
            (n.prototype.searchLies = function (e, n) {
              var i = void 0 === n ? {} : n,
                r = i.target,
                a = void 0 === r ? [] : r,
                o = i.ignore,
                s = void 0 === o ? [] : o;
              return __awaiter(this, void 0, void 0, function () {
                var n,
                  i,
                  r = this;
                return __generator(this, function (o) {
                  try {
                    if (((n = e()), void 0 === (u = n) || !u)) return [2];
                  } catch (t) {
                    return [2];
                  }
                  var u;
                  return (
                    (i = n.prototype ? n.prototype : n),
                    Object.getOwnPropertyNames(i).forEach(function (e) {
                      if (
                        !(
                          'constructor' == e ||
                          (a.length && !new Set(a).has(e)) ||
                          (s.length && new Set(s).has(e))
                        )
                      ) {
                        var i = /\s(.+)\]/,
                          o = (n.name ? n.name : i.test(n) ? i.exec(n)[1] : void 0) + '.' + e;
                        try {
                          var u = n.prototype ? n.prototype : n;
                          try {
                            if ('function' == typeof u[e]) {
                              var c = r.getLies(u[e], u);
                              return void r.documentLie(o, c);
                            }
                          } catch (t) {}
                          var l = Object.getOwnPropertyDescriptor(u, e).get,
                            d = r.getLies(l, u, n);
                          r.documentLie(o, d);
                        } catch (n) {
                          t._POSignalsUtils.Logger.warn('failed ' + e + ' test execution', n);
                        }
                      }
                    }),
                    [2]
                  );
                });
              });
            }),
            (n.getUndefinedValueLie = function (t, e) {
              var n = t.name,
                i = window[n.charAt(0).toLowerCase() + n.slice(1)];
              return (
                !!i &&
                (void 0 !== Object.getOwnPropertyDescriptor(i, e) ||
                  void 0 !== Reflect.getOwnPropertyDescriptor(i, e))
              );
            }),
            (n.getToStringLie = function (t, e, n) {
              var i, r;
              try {
                i = n.Function.prototype.toString.call(t);
              } catch (t) {}
              try {
                r = n.Function.prototype.toString.call(t.toString);
              } catch (t) {}
              var a = i || t.toString(),
                o = r || t.toString.toString(),
                s = function (t) {
                  var e;
                  return (
                    ((e = {})['function ' + t + '() { [native code] }'] = !0),
                    (e['function get ' + t + '() { [native code] }'] = !0),
                    (e['function () { [native code] }'] = !0),
                    (e['function ' + t + '() {\n    [native code]\n}'] = !0),
                    (e['function get ' + t + '() {\n    [native code]\n}'] = !0),
                    (e['function () {\n    [native code]\n}'] = !0),
                    e
                  );
                };
              return !s(e)[a] || !s('toString')[o];
            }),
            (n.getPrototypeInFunctionLie = function (t) {
              return 'prototype' in t;
            }),
            (n.getOwnPropertyLie = function (t) {
              return (
                t.hasOwnProperty('arguments') ||
                t.hasOwnProperty('caller') ||
                t.hasOwnProperty('prototype') ||
                t.hasOwnProperty('toString')
              );
            }),
            (n.getNewObjectToStringTypeErrorLie = function (t) {
              try {
                return Object.create(t).toString(), !0;
              } catch (t) {
                var n = t.stack.split('\n'),
                  i = /at Object\.apply/,
                  r = !n.slice(1).find(function (t) {
                    return i.test(t);
                  }),
                  a = 'TypeError' == t.constructor.name && n.length > 1,
                  o = 'chrome' in window || e.Metadata.detectChromium();
                return !(!a || !o || (/at Function\.toString/.test(n[1]) && r)) || !a;
              }
            }),
            n
          );
        })();
        e.DetectLies = n;
      })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (e) {
        var n = (function () {
          function n(t) {
            (this.propertyBlackList = t), (this.result = new Map());
          }
          return (
            (n.prototype.getStealthResult = function () {
              return (
                this.addStealthTest('srcdoc_throws_error', function () {
                  try {
                    return !!document.createElement('iframe').srcdoc;
                  } catch (t) {
                    return !0;
                  }
                }),
                this.addStealthTest('srcdoc_triggers_window_proxy', function () {
                  var e = document.createElement('iframe');
                  return (
                    (e.srcdoc =
                      '' +
                      t._POSignalsUtils.Util.hashMini(crypto.getRandomValues(new Uint32Array(10)))),
                    !!e.contentWindow
                  );
                }),
                this.addStealthTest('index_chrome_too_high', function () {
                  var t =
                      'cookieStore' in window
                        ? 'cookieStore'
                        : 'ondevicemotion' in window
                          ? 'ondevicemotion'
                          : 'speechSynthesis',
                    e = [];
                  for (var n in window) e.push(n);
                  return e.indexOf('chrome') > e.indexOf(t);
                }),
                this.addStealthTest('chrome_runtime_functions_invalid', function () {
                  if (!('chrome' in window && 'runtime' in window.chrome)) return !1;
                  try {
                    return (
                      'prototype' in window.chrome.runtime.sendMessage ||
                      'prototype' in window.chrome.runtime.connect ||
                      (new window.chrome.runtime.sendMessage(),
                      new window.chrome.runtime.connect(),
                      !0)
                    );
                  } catch (t) {
                    return 'TypeError' != t.constructor.name;
                  }
                }),
                this.addStealthTest('Function_prototype_toString_invalid_typeError', function () {
                  var t = new n.StackTraceTester();
                  return (
                    t.isInvalidStackTraceSize(Function.prototype.toString) ||
                    t.isInvalidStackTraceSize(function () {})
                  );
                }),
                this.result
              );
            }),
            (n.prototype.addStealthTest = function (e, n) {
              if (!this.propertyBlackList.has(e))
                try {
                  this.result[e] = n();
                } catch (n) {
                  t._POSignalsUtils.Logger.warn('stealth test ' + e + ' failed', n);
                }
            }),
            (n.StackTraceTester = (function () {
              function t() {}
              return (
                (t.prototype.isInvalidStackTraceSize = function (t) {
                  var n = this;
                  try {
                    return (
                      (this.you = function () {
                        return Object.create(t).toString();
                      }),
                      (this.cant = function () {
                        return n.you();
                      }),
                      (this.hide = function () {
                        return n.cant();
                      }),
                      this.hide(),
                      !0
                    );
                  } catch (t) {
                    var i = t.stack.split('\n'),
                      r = !/at Object\.apply/.test(i[1]),
                      a = 'TypeError' == t.constructor.name && i.length >= 5,
                      o = 'chrome' in window || e.Metadata.detectChromium();
                    return (
                      !(
                        !a ||
                        !o ||
                        (r &&
                          /at Function\.toString/.test(i[1]) &&
                          /\.you/.test(i[2]) &&
                          /\.cant/.test(i[3]) &&
                          /\.hide/.test(i[4]))
                      ) || !a
                    );
                  }
                }),
                t
              );
            })()),
            n
          );
        })();
        e.DetectStealth = n;
      })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (t) {
      !(function (t) {
        var e = (function () {
          function t() {}
          return (
            (t.isPrivateMode = function () {
              return new Promise(function (t) {
                var e,
                  n,
                  i = function () {
                    return t(!0);
                  },
                  r = function () {
                    return t(!1);
                  };
                try {
                  if (
                    ((n =
                      navigator &&
                      /(?=.*(opera|chrome)).*/i.test(navigator.userAgent) &&
                      navigator.storage &&
                      navigator.storage.estimate) &&
                      navigator.storage
                        .estimate()
                        .then(function (t) {
                          t.quota < 12e7 ? i() : r();
                        })
                        .catch(function (t) {
                          r();
                        }),
                    n)
                  )
                    return;
                  if (
                    (function () {
                      var t = 'MozAppearance' in document.documentElement.style;
                      if (t)
                        if (null == indexedDB) i();
                        else {
                          var e = indexedDB.open('inPrivate');
                          (e.onsuccess = r), (e.onerror = i);
                        }
                      return t;
                    })()
                  )
                    return;
                  if (
                    (function () {
                      var t =
                        navigator &&
                        navigator.userAgent &&
                        navigator.userAgent.match(/Version\/([0-9\._]+).*Safari/);
                      if (t) {
                        if (parseInt(t[1], 10) < 11)
                          return (function () {
                            try {
                              localStorage.length
                                ? r()
                                : (localStorage.setItem('inPrivate', '0'),
                                  localStorage.removeItem('inPrivate'),
                                  r());
                            } catch (t) {
                              navigator.cookieEnabled ? i() : r();
                            }
                            return !0;
                          })();
                        try {
                          window.openDatabase(null, null, null, null), r();
                        } catch (t) {
                          i();
                        }
                      }
                      return !!t;
                    })()
                  )
                    return;
                  if (
                    ((e = !window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) &&
                      i(),
                    e)
                  )
                    return;
                } catch (t) {}
                return r();
              });
            }),
            t
          );
        })();
        t.Incognito = e;
      })(t._POSignalsMetadata || (t._POSignalsMetadata = {}));
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
      })(),
    __spreadArrays =
      ((__awaiter =
        (this && this.__awaiter) ||
        function (t, e, n, i) {
          return new (n || (n = Promise))(function (r, a) {
            function o(t) {
              try {
                u(i.next(t));
              } catch (t) {
                a(t);
              }
            }
            function s(t) {
              try {
                u(i.throw(t));
              } catch (t) {
                a(t);
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
                      })).then(o, s);
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
            a,
            o = {
              label: 0,
              sent: function () {
                if (1 & r[0]) throw r[1];
                return r[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            'function' == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(a) {
            return function (s) {
              return (function (a) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; o; )
                  try {
                    if (
                      ((n = 1),
                      i &&
                        (r =
                          2 & a[0]
                            ? i.return
                            : a[0]
                              ? i.throw || ((r = i.return) && r.call(i), 0)
                              : i.next) &&
                        !(r = r.call(i, a[1])).done)
                    )
                      return r;
                    switch (((i = 0), r && (a = [2 & a[0], r.value]), a[0])) {
                      case 0:
                      case 1:
                        r = a;
                        break;
                      case 4:
                        return o.label++, { value: a[1], done: !1 };
                      case 5:
                        o.label++, (i = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !(r = (r = o.trys).length > 0 && r[r.length - 1]) &&
                          (6 === a[0] || 2 === a[0])
                        ) {
                          o = 0;
                          continue;
                        }
                        if (3 === a[0] && (!r || (a[1] > r[0] && a[1] < r[3]))) {
                          o.label = a[1];
                          break;
                        }
                        if (6 === a[0] && o.label < r[1]) {
                          (o.label = r[1]), (r = a);
                          break;
                        }
                        if (r && o.label < r[2]) {
                          (o.label = r[2]), o.ops.push(a);
                          break;
                        }
                        r[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    a = e.call(t, o);
                  } catch (t) {
                    (a = [6, t]), (i = 0);
                  } finally {
                    n = r = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, s]);
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
      (this && this.__spreadArrays) ||
        function () {
          for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
          var i = Array(t),
            r = 0;
          for (e = 0; e < n; e++)
            for (var a = arguments[e], o = 0, s = a.length; o < s; o++, r++) i[r] = a[o];
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
            (this._wrap = new o(this)), (this._subscriptions = new Array());
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
        a = (function (t) {
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
        o = (function () {
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
              return new a();
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
            for (var n = new Map(), i = null, r = 0, a = 0; a < e.length; a++)
              for (var o = 0; o < this._gestureTimestamps.length; o++)
                (r = e[a].timestamp) >=
                  (i = this._gestureTimestamps[o]).start - this._sensorsTimestampDeltaInMillis &&
                  r <= i.end + this._sensorsTimestampDeltaInMillis &&
                  n.set(e[a].timestamp, e[a]);
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
            for (var e = {}, n = 0, i = t; n < i.length; n++) {
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
              if (
                (console.log('touchend', e),
                !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
              )
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
                    var i = e.changedTouches.item(a);
                    (n = i.radiusX && i.radiusY ? (i.radiusX + i.radiusY) / 2 : null),
                      r.snapshotStartTime.has(i.identifier) ||
                        r.snapshotStartTime.set(i.identifier, new Date().getTime());
                    var o = r.getTouchSnapshots(i.identifier);
                    o.length < t.PointerConfig.instance.pointerParams.maxSnapshotsCount &&
                      o.push({
                        type: e.type,
                        eventTs: e.timeStamp,
                        epochTs: new Date().getTime(),
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
                  a = 0;
                a < e.changedTouches.length;
                a++
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
                    var a = n ? e + ':' + n : e;
                    t._POSignalsUtils.Logger.info('Add tag: ' + a);
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
              a = this.getEnumKeyByValue(r);
            if (n.mouse.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
              return { shouldCollect: !0, quality: a };
            if (
              r === e.RICH &&
              -1 !== (d = this.findOldestInteractionWithLowestQuality(n.mouse.interactions))
            )
              return { shouldCollect: !0, remove: { type: 'mouse', index: d }, quality: a };
            var o,
              s = n.mouse.interactions.reduce(
                function (t, e) {
                  return e.epochTs >= i - 18e4 ? t[0].push(e) : t[1].push(e), t;
                },
                [[], []],
              ),
              u = s[0],
              c = s[1];
            if (u.length < 2) {
              if (-1 !== (o = this.findOldestInteractionWithLowestQuality(c))) {
                var l = c[o];
                if (-1 !== (f = n.mouse.interactions.indexOf(l)))
                  return { shouldCollect: !0, remove: { type: 'mouse', index: f }, quality: a };
              }
            } else if (-1 !== (o = this.findOldestInteractionWithLowestQuality(u, r))) {
              var d,
                h = u[o],
                f = n.mouse.interactions.indexOf(h);
              return -1 !==
                (d = this.findOldestInteractionWithLowestQuality(
                  c,
                  e[n.mouse.interactions[f].quality],
                ))
                ? { shouldCollect: !0, remove: { type: 'mouse', index: d }, quality: a }
                : { shouldCollect: !0, remove: { type: 'mouse', index: f }, quality: a };
            }
            return { shouldCollect: !1, quality: a };
          }),
          (n.prototype.handleKeyboardInteraction = function (t, n) {
            var i = Date.now(),
              r = this.classifyKeyboardInteraction(t),
              a = this.getEnumKeyByValue(r);
            if (n.keyboard.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
              return { shouldCollect: !0, quality: a };
            if (
              r === e.RICH &&
              -1 !== (d = this.findOldestInteractionWithLowestQuality(n.keyboard.interactions))
            )
              return { shouldCollect: !0, remove: { type: 'keyboard', index: d }, quality: a };
            var o,
              s = n.keyboard.interactions.reduce(
                function (t, e) {
                  return e.epochTs >= i - 18e4 ? t[0].push(e) : t[1].push(e), t;
                },
                [[], []],
              ),
              u = s[0],
              c = s[1];
            if (u.length < 2) {
              if (-1 !== (o = this.findOldestInteractionWithLowestQuality(c))) {
                var l = c[o];
                if (-1 !== (f = n.keyboard.interactions.indexOf(l)))
                  return { shouldCollect: !0, remove: { type: 'keyboard', index: f }, quality: a };
              }
            } else if (-1 !== (o = this.findOldestInteractionWithLowestQuality(u, r))) {
              var d,
                h = u[o],
                f = n.keyboard.interactions.indexOf(h);
              return -1 !==
                (d = this.findOldestInteractionWithLowestQuality(
                  c,
                  e[n.keyboard.interactions[f].quality],
                ))
                ? { shouldCollect: !0, remove: { type: 'keyboard', index: d }, quality: a }
                : { shouldCollect: !0, remove: { type: 'keyboard', index: f }, quality: a };
            }
            return { shouldCollect: !1, quality: a };
          }),
          (n.prototype.handleTouchInteraction = function (t, n) {
            var i = Date.now(),
              r = this.classifyTouchInteraction(t),
              a = this.getEnumKeyByValue(r);
            if (n.touch.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
              return { shouldCollect: !0, quality: a };
            if (
              r === e.RICH &&
              -1 !== (h = this.findOldestInteractionWithLowestQuality(n.touch.interactions))
            )
              return { shouldCollect: !0, remove: { type: 'touch', index: h }, quality: a };
            var o = n.touch.interactions.reduce(
                function (t, e) {
                  return e.epochTs >= i - 18e4 ? t[0].push(e) : t[1].push(e), t;
                },
                [[], []],
              ),
              s = o[0],
              u = o[1];
            if (s.length < 2) {
              var c = this.findOldestInteractionWithLowestQuality(u);
              if (-1 !== c) {
                var l = u[c];
                if (-1 !== (g = n.touch.interactions.indexOf(l)))
                  return { shouldCollect: !0, remove: { type: 'touch', index: g }, quality: a };
              }
            } else {
              var d = this.findOldestInteractionWithLowestQuality(s, r);
              if (-1 !== d) {
                var h,
                  f = s[d],
                  g = n.touch.interactions.indexOf(f);
                return -1 !==
                  (h = this.findOldestInteractionWithLowestQuality(
                    u,
                    e[n.touch.interactions[g].quality],
                  ))
                  ? { shouldCollect: !0, remove: { type: 'touch', index: h }, quality: a }
                  : { shouldCollect: !0, remove: { type: 'touch', index: g }, quality: a };
              }
            }
            return { shouldCollect: !1, quality: a };
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
                a = Number.MAX_SAFE_INTEGER,
                o = 0;
              o < t.length;
              o++
            ) {
              var s = e[t[o].quality];
              (s < i || (s === i && t[o].epochTs < a)) && ((i = s), (a = t[o].epochTs), (r = o));
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
            var n, i;
            return (
              void 0 === e && (e = {}),
              __awaiter(this, void 0, void 0, function () {
                var r, a;
                return __generator(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return null === (n = e.waitForWindowLoad) || void 0 === n || n
                        ? [4, this.loadEventPromise()]
                        : [3, 2];
                    case 1:
                      o.sent(), (o.label = 2);
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
                        (r = t.PointerConfig.instance.pointerParams),
                        (a = {
                          additionalMediaCodecs: r.additionalMediaCodecs,
                          browserInfo: this.browserInfo,
                          fingerprintTimeoutMillis: r.fingerprintTimeoutMillis,
                          metadataBlackList: new Set(
                            r.metadataBlackList.concat(e.deviceAttributesToIgnore),
                          ),
                          propertyDescriptors: r.propertyDescriptors,
                          webRtcUrl: r.webRtcUrl,
                          dataPoints: r.metadataDataPoints,
                        }),
                        (this.metadata = new t._POSignalsMetadata.Metadata(
                          this.sessionData,
                          a,
                          e.externalIdentifiers,
                        )),
                        (this.dataHandler = new t.DataHandler(
                          this.clientVersion,
                          this.instanceUUID,
                          this.initParams,
                          this.metadata,
                          this,
                          this.sessionData,
                        )),
                        (null === (i = this.initParams.behavioralDataCollection) ||
                          void 0 === i ||
                          i) &&
                          this.refreshListening(),
                        e.lazyMetadata || this.metadata.getDeviceAttributes(),
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
              return __generator(this, function (a) {
                switch (a.label) {
                  case 0:
                    return (
                      a.trys.push([0, 2, , 3]),
                      (this.startedPromise = this.initQueue.add(function () {
                        return r.start(e);
                      })),
                      [4, this.startedPromise]
                    );
                  case 1:
                    return [2, a.sent()];
                  case 2:
                    throw (
                      ((n = a.sent()),
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
                for (var a = 0, o = r; a < o.length; a++) {
                  var s = o[a];
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
              a = t._POSignalsUtils.Util.getSrcElement(e);
            if (
              a &&
              a instanceof HTMLInputElement &&
              !t._POSignalsUtils.Util.isClickableInput(a) &&
              t._POSignalsUtils.Util.isFunction(a.getAttribute) &&
              !(null === (n = a.hasAttribute) || void 0 === n
                ? void 0
                : n.call(a, 'data-st-ignore')) &&
              !t._POSignalsUtils.Util.anySelectorMatches(
                a,
                t.PointerConfig.instance.pointerParams.keyboardCssSelectorsBlacklist,
                0,
              )
            ) {
              r = this.delegate.getElementsStID(a);
              for (
                var o = t.PointerConfig.instance.pointerParams.keyboardIdentifierAttributes, s = 0;
                s < o.length && !r;
                s++
              )
                r = a.getAttribute(o[s]);
              r &&
                !t.PointerConfig.instance.pointerParams.keyboardFieldBlackList.has(r) &&
                ((i = this.interactionsMap.get(a)) ||
                  ((i = {
                    epochTs: new Date().getTime(),
                    stId: r,
                    elementId: t._POSignalsUtils.Util.getAttribute(a, 'id'),
                    name: t._POSignalsUtils.Util.getAttribute(a, 'name'),
                    type: t._POSignalsUtils.Util.getAttribute(a, 'type'),
                    events: [],
                    counter: this.delegate.keyboardCounter,
                    eventCounters: {},
                    duration: 0,
                    numOfDeletions: 0,
                    additionalData: this.delegate.additionalData,
                    quality: '',
                  }),
                  this.interactionsMap.set(a, i)));
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
              epochTs: new Date().getTime(),
              selectionStart: t._POSignalsUtils.Util.getElementSelectionStart(i),
              selectionEnd: t._POSignalsUtils.Util.getElementSelectionEnd(i),
              key: null,
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
                var a = this.createKeyboardInteractionEvent('focus', e);
                r.events.push(a);
                var o = this.uiControlManager.createUIControlData(e);
                o &&
                  ((r.uiControl = { uiElement: o.uiElement, enrichedData: o.enrichedData }),
                  (null === (i = null === (n = o.uiElement) || void 0 === n ? void 0 : n.id) ||
                  void 0 === i
                    ? void 0
                    : i.length) > 0 &&
                    t._POSignalsUtils.Logger.info(
                      "Typing in element with id '" + o.uiElement.id + "'",
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
            a = t.PointerConfig.instance.pointerParams.uiModelingElementFilters,
            o = t._POSignalsUtils.Util.getAttribute,
            s = null === (i = e.getBoundingClientRect) || void 0 === i ? void 0 : i.call(e);
          (this._htmlElement = e),
            (this._data = {
              location: this.getUIElementAttribute(a.location, function () {
                return window.location.href;
              }),
              id: this.getUIElementAttribute(a.id, function () {
                return o(e, 'id');
              }),
              aria_label: this.getUIElementAttribute(a.aria_label, function () {
                return o(e, 'aria-label');
              }),
              data_st_field: this.getUIElementAttribute(a.data_st_field, function () {
                return n.getElementsStID(e);
              }),
              data_st_tag: this.getUIElementAttribute(a.data_st_tag, function () {
                return o(e, 'data-st-tag');
              }),
              data_selenium: this.getUIElementAttribute(a.data_selenium, function () {
                return o(e, 'data-selenium');
              }),
              data_selenium_id: this.getUIElementAttribute(a.data_selenium_id, function () {
                return o(e, 'data-selenium-id');
              }),
              data_testid: this.getUIElementAttribute(a.data_testid, function () {
                return o(e, 'data-testid');
              }),
              data_test_id: this.getUIElementAttribute(a.data_test_id, function () {
                return o(e, 'data-test-id');
              }),
              data_qa_id: this.getUIElementAttribute(a.data_qa_id, function () {
                return o(e, 'data-qa-id');
              }),
              data_id: this.getUIElementAttribute(a.data_id, function () {
                return o(e, 'data-id');
              }),
              name: this.getUIElementAttribute(a.name, function () {
                return o(e, 'name');
              }),
              placeholder: this.getUIElementAttribute(a.placeholder, function () {
                return o(e, 'placeholder');
              }),
              role: this.getUIElementAttribute(a.role, function () {
                return o(e, 'role');
              }),
              type: this.getUIElementAttribute(a.type, function () {
                return o(e, 'type');
              }),
              nodeTypeInt: this.getUIElementAttribute(a.nodeTypeInt, function () {
                return e.nodeType;
              }),
              nodeName: this.getUIElementAttribute(a.nodeName, function () {
                return e.nodeName;
              }),
              cursorType: this.getUIElementAttribute(a.cursorType, function () {
                return window.getComputedStyle(e).cursor;
              }),
              text: this.getUIElementAttribute(a.text, function () {
                return r.getElementText(e);
              }),
              textLength: this.getUIElementAttribute(a.textLength, function () {
                var t;
                return (
                  (null === (t = r.getElementText(e)) || void 0 === t ? void 0 : t.length) || null
                );
              }),
              bottom: this.getUIElementAttribute(a.bottom, function () {
                return null === s || void 0 === s ? void 0 : s.bottom;
              }),
              height: this.getUIElementAttribute(a.height, function () {
                return null === s || void 0 === s ? void 0 : s.height;
              }),
              left: this.getUIElementAttribute(a.left, function () {
                return null === s || void 0 === s ? void 0 : s.left;
              }),
              right: this.getUIElementAttribute(a.right, function () {
                return null === s || void 0 === s ? void 0 : s.right;
              }),
              top: this.getUIElementAttribute(a.top, function () {
                return null === s || void 0 === s ? void 0 : s.top;
              }),
              width: this.getUIElementAttribute(a.width, function () {
                return null === s || void 0 === s ? void 0 : s.width;
              }),
              x: this.getUIElementAttribute(a.x, function () {
                return null === s || void 0 === s ? void 0 : s.x;
              }),
              y: this.getUIElementAttribute(a.y, function () {
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
              for (var r = !1, a = 0, o = i; a < o.length; a++) {
                var s = o[a];
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
            (this.eventCounters = {}),
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
              ? new Date().getTime() - this.lastMouseInteractionTimestamp >=
                  t.PointerConfig.instance.pointerParams.mouseIdleTimeoutMillis && this.dispatch()
              : !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) &&
                new Date().getTime() - this.lastMouseInteractionTimestamp <=
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
                (this.eventCounters = {}),
                (this.lastMouseInteraction = null),
                (this.mouseEventsCounter = 0);
            } catch (e) {
              t._POSignalsUtils.Logger.warn('Failed to dispatch mouse events', e);
            }
          }),
          (e.prototype.updateInteraction = function (e, n) {
            this.lastMouseInteraction ||
              (this.lastMouseInteraction = {
                epochTs: new Date().getTime(),
                events: [],
                counter: this.delegate.mouseCounter,
                additionalData: this.delegate.additionalData,
                eventCounters: {},
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
              this.lastMouseInteractionTimestamp = new Date().getTime();
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
              var a = this.uiControlManager.createUIControlData(e);
              this.updateInteraction(this.createMouseClickEvent(e.type, e), a),
                this.dispatch(),
                (null ===
                  (i =
                    null === (n = null === a || void 0 === a ? void 0 : a.uiElement) || void 0 === n
                      ? void 0
                      : n.id) || void 0 === i
                  ? void 0
                  : i.length) > 0 &&
                  t._POSignalsUtils.Logger.info(
                    "Tapped on element with id '" + a.uiElement.id + "'",
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
                ('wheel' !== e.type && (this.lastMouseInteractionTimestamp = new Date().getTime()),
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
                ((this.lastMouseInteractionTimestamp = new Date().getTime()),
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
                ((this.lastMouseInteractionTimestamp = new Date().getTime()),
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
              epochTs: new Date().getTime(),
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
            for (var a in this.config)
              try {
                if (!this.config.hasOwnProperty(a)) continue;
                var o = this.config[a].selector || [];
                t._POSignalsUtils.Util.isArray(o) || (o = [].concat(o));
                for (var s = 0, u = o; s < u.length; s++) {
                  var c = u[s];
                  t._POSignalsUtils.Util.isSelectorMatches(e, c, n) && (r[a] = this.config[a]);
                }
              } catch (e) {
                t._POSignalsUtils.Logger.warn('Failed to get the config for ' + a + ' tag', e);
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
              for (var i = new Map(), r = [], a = 0; a < e.length; a++)
                i.get(e[a].type) ? i.get(e[a].type).push(a) : i.set(e[a].type, [a]);
              i.forEach(function (t, e) {
                var i = n.reduceFactorMap[e] ? Number(n.reduceFactorMap[e]) : 0;
                n.reduceByFactor(i, t, function (e) {
                  r[t[e]] = !0;
                });
              });
              var o = [];
              for (a = 0; a < e.length; a++) r[a] && o.push(e[a]);
              return (
                e.length !== o.length &&
                  t._POSignalsUtils.Logger.debug(
                    e.length - o.length + ' events reduced out of ' + e.length,
                  ),
                o
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
                a = Math.min(e.length, i),
                o = 0;
              o < a;
              o++
            ) {
              n(Math.round(o * r));
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
              a = n.length < 50 ? 1 : n.length < 100 ? 3 : 7,
              o = this.algorithm.reduceEvents(n, a),
              s = o.length / n.length;
            if (o.length >= 10 && s >= r) return { keptEvents: o, epsilon: a };
            var u = n.length < 50 ? 0.1 : n.length < 100 ? 0.3 : 0.7,
              c = this.algorithm.reduceEvents(n, u),
              l = c.length / n.length;
            if (c.length <= e.MIN_EVENTS_TO_REDUCE || l <= r) return { keptEvents: c, epsilon: u };
            var d =
              (Math.min(a, Math.pow(a, s / r)) * Math.abs(l - r) + u * Math.abs(s - r)) /
              Math.abs(s - l);
            return (
              (d < u || d > a) &&
                t._POSignalsUtils.Logger.warn(
                  'linear weighted average - calculated epsilon is out of range, lowEpsilon: ' +
                    u +
                    ', highEpsilon: ' +
                    a +
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
            for (var i = new Map(), r = [], a = 0, o = e; a < o.length; a++) {
              var s = o[a];
              i.get(s.type) ? i.get(s.type).push(s) : i.set(s.type, [s]);
            }
            var u = {};
            return (
              i.forEach(function (t, e) {
                var i = n.rdpStrategy.reduce(t, e),
                  a = i.keptEvents,
                  o = i.epsilon;
                o > 0 && (u[e] = { epsilon: o, originalLength: t.length, keptLength: a.length }),
                  (r = r.concat(a));
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
              a = n.getX() - i,
              o = n.getY() - r;
            if (0 !== a || 0 !== o) {
              var s = ((t.getX() - i) * a + (t.getY() - r) * o) / (a * a + o * o);
              s > 1 ? ((i = n.getX()), (r = n.getY())) : s > 0 && ((i += a * s), (r += o * s));
            }
            return (a = t.getX() - i) * a + (o = t.getY() - r) * o;
          }),
          (t.prototype.simplifyRadialDist = function (t, e) {
            for (var n, i = t[0], r = [i], a = 1, o = t.length; a < o; a++)
              (n = t[a]), this.getSqDist(n, i) > e && (r.push(n), (i = n));
            return i !== n && r.push(n), r;
          }),
          (t.prototype.simplifyDPStep = function (t, e, n, i, r) {
            for (var a, o = i, s = e + 1; s < n; s++) {
              var u = this.getSqSegDist(t[s], t[e], t[n]);
              u > o && ((a = s), (o = u));
            }
            o > i &&
              (a - e > 1 && this.simplifyDPStep(t, e, a, i, r),
              r.push(t[a]),
              n - a > 1 && this.simplifyDPStep(t, a, n, i, r));
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
                a = -1,
                o = {},
                s = 0;
              s < e.length;
              s++
            ) {
              var u = e[s];
              u.type !== n &&
                ('mousedown' !== u.type ? o[u.type] || (r.push(u), (o[u.type] = !0)) : (a = s));
            }
            return a >= 0 && r.push(e[a]), t._POSignalsUtils.Util.sortEventsByTimestamp(r);
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
            (r.eventCounters = new t.StorageMap(t._POSignalsUtils.Constants.EVENT_COUNTERS)),
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
            (r.onEventHandler = r.onEvent.bind(r)),
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
            return (
              this.clearIndirectBuffer(),
              {
                mouse: {
                  count: this.mouseInteractionsCount.get(),
                  interactions: this.capturedMouseInteractions.get(),
                },
                keyboard: {
                  count: this.keyboardInteractionsCount.get(),
                  interactions: this.capturedKeyboardInteractions.get(),
                },
                touch: {
                  count: this.gesturesCount.get(),
                  interactions: this.capturedGestures.get(),
                },
                indirect: { events: this.capturedIndirectEvents.get() },
                mouseSummary: { events: this.capturedMouseInteractionSummary.get() },
                eventCounters: this.eventCounters.asMap(),
              }
            );
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
                var a = r[i];
                try {
                  if (null === a || void 0 === a ? void 0 : a.name) {
                    var o = this.uiControlManager.convertToTagValueConfig(a.value);
                    n = this.addSingleTagWithValue(a.name, o) || n;
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
                  var a = t._POSignalsUtils.Util.getElementText(r);
                  i = this.tagsWithValueIdentifications.getValue(n.operation, a);
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
                    this.currentBufferSize++,
                  this.eventCounters.sync());
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
            this.filterOldIndirectEvents(), this.addIndirectEvents(e), this.eventCounters.sync();
          }),
          (n.prototype.handleKeyboardInteraction = function (t, e) {
            if (e) {
              this.filterOldKeyboardEvents(),
                this.keyboardInteractionsCount.increment(),
                this.reductionManager.reduceKeyboardInteraction(e);
              var n = this.bufferingStrategy.calculateStrategyResult(e, 'keyboard');
              n.shouldCollect &&
                (n.remove && this.removeInteraction(n.remove),
                (e.quality = n.quality),
                this.capturedKeyboardInteractions.push(e),
                this.currentBufferSize++,
                this.eventCounters.sync());
            }
          }),
          (n.prototype.handleGesture = function (t, e) {
            var n;
            if (this.isValidGesture(e)) {
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
                    : n.eventTs),
                this.eventCounters.sync());
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
                  a = 0,
                  o = e.events;
                a < o.length;
                a++
              ) {
                var s = o[a];
                t.PointerConfig.instance.pointerParams.highPriorityIndirectEvents.has(s.type) &&
                  this.capturedIndirectEvents.length + i.length <
                    t.PointerConfig.instance.pointerParams.maxIndirectEvents &&
                  i.push(s),
                  r[s.type] > 0 || (i.push(s), (r[s.type] = 1));
              }
              this.capturedIndirectEvents.set(this.capturedIndirectEvents.concat(i));
            }
          }),
          (n.prototype.onUrlChange = function () {
            this.addTag('location', window.location.href);
          }),
          (n.prototype.onEvent = function (t) {
            this.eventCounters.set(t.type, (this.eventCounters.get(t.type) || 0) + 1, !1);
          }),
          (n.prototype.handleStTagElement = function (e) {
            if (e) {
              var n = t.PointerConfig.instance.pointerParams.maxSelectorChildren,
                i = this.tagsWithValueIdentifications.getMatchingTags(e, n);
              this.addTagsWithValue(i);
              var r = t._POSignalsUtils.Util.isSelectorMatches(e, '[data-st-tag]', n);
              if (r instanceof Element) {
                var a = t._POSignalsUtils.Util.getAttribute(r, 'data-st-tag'),
                  o = t._POSignalsUtils.Util.getAttribute(r, 'data-st-tag-value');
                a && this.addTag(a, o);
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
        function n(t, e, n, i, r, a) {
          (this.clientVersion = t),
            (this.instanceUUID = e),
            (this.initParams = n),
            (this.metadata = i),
            (this.behavioralDataHandler = r),
            (this.sessionData = a),
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
              var n, i, r, a;
              return __generator(this, function (o) {
                switch (o.label) {
                  case 0:
                    return [4, this.metadata.getDeviceAttributes()];
                  case 1:
                    return (
                      (n = o.sent()),
                      (i = this.behavioralDataHandler.getBehavioralData()),
                      [4, this.modifyBehavioralData(i)]
                    );
                  case 2:
                    return (
                      (i = o.sent()),
                      (r = {
                        behavioral: i,
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
                        ? ((a = {}), [4, this.getJWTSignedPayload(e, n.deviceId)])
                        : [3, 4]
                    );
                  case 3:
                    return [
                      2,
                      __assign.apply(void 0, [((a.jwtDeviceAttributes = o.sent()), a), r]),
                    ];
                  case 4:
                    return [2, __assign({ deviceAttributes: n }, r)];
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
              a = e.filter(function (t) {
                return !r.some(function (e) {
                  return e.epochTs === t.epochTs;
                });
              }),
              o = this.sortInteractions(a).slice(0, 5 - r.length);
            return (
              t._POSignalsUtils.Logger.debug(
                'final interactions for getData:',
                __spreadArrays(r, o),
              ),
              __spreadArrays(r, o).sort(function (t, e) {
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

  // Ping Identity INC.
  // ï¿½ ALL RIGHTS RESERVED
  //Build: 2  Thu Sep 12 2024 07:06:03 GMT+0000 (Coordinated Universal Time)
}
