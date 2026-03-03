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
  (function (c, h) {
    'use strict';
    typeof c.CustomEvent != 'function' && (c.CustomEvent = h());
  })(window, function () {
    function c(h, p) {
      p = p || { bubbles: !1, cancelable: !1, detail: null };
      var n = document.createEvent('CustomEvent');
      return n.initCustomEvent(h, p.bubbles, p.cancelable, p.detail), n;
    }
    return c;
  }),
    (function () {
      'use strict';
      var c = 'PING-SDK-VERSION-PLACEHOLDER',
        h = 'st-ping-div',
        p = /(console|auth)((\w|\d|-)*)\.pingone\.(eu|asia|ca|com\.au|com|sg)/,
        n = /(console|auth)-(test|staging)((\w|\d|-)*)\.pingone.com/,
        r = /(console|auth)((\w|\d|-)*)\.test-(one|two)-pingone\.com/,
        a = /(console|auth)((\w|\d|-)*)\.ort-(one|two)-pingone\.com/,
        s = /localhost/,
        i = window.location.hostname;
      function t(S) {
        window['enable-logs-pingOneSignals'] && console.log(S);
      }
      function e(S) {
        function U(le) {
          le = le.replace(/\r\n/g, ``);
          for (var q = '', be = 0; be < le.length; be++) {
            var we = le.charCodeAt(be);
            we < 128
              ? (q += String.fromCharCode(we))
              : we > 127 && we < 2048
                ? ((q += String.fromCharCode((we >> 6) | 192)),
                  (q += String.fromCharCode((we & 63) | 128)))
                : ((q += String.fromCharCode((we >> 12) | 224)),
                  (q += String.fromCharCode(((we >> 6) & 63) | 128)),
                  (q += String.fromCharCode((we & 63) | 128)));
          }
          return q;
        }
        var T = '',
          O,
          C,
          k,
          R,
          H,
          ee,
          M,
          K = 0,
          Z = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        for (S = U(S); K < S.length; )
          (O = S.charCodeAt(K++)),
            (C = S.charCodeAt(K++)),
            (k = S.charCodeAt(K++)),
            (R = O >> 2),
            (H = ((O & 3) << 4) | (C >> 4)),
            (ee = ((C & 15) << 2) | (k >> 6)),
            (M = k & 63),
            isNaN(C) ? (ee = M = 64) : isNaN(k) && (M = 64),
            (T = T + Z.charAt(R) + Z.charAt(H) + Z.charAt(ee) + Z.charAt(M));
        return T;
      }
      function l() {
        var S = document.getElementById(h);
        return (
          S ||
          ((S = document.createElement('div')),
          (S.style.border = 'none'),
          (S.style.position = 'absolute'),
          (S.style.top = '-999px'),
          (S.style.left = '-999px'),
          (S.style.width = '0'),
          (S.style.height = '0'),
          (S.style.visibility = 'hidden'),
          (S.style.overflow = 'hidden'),
          (S.id = h),
          document.body.appendChild(S),
          S)
        );
      }
      function o(S) {
        document.readyState !== 'loading' ? S() : document.addEventListener('DOMContentLoaded', S);
      }
      function x(S) {
        o(function () {
          if (S) {
            var U = l();
            (window._pingOneSignalsToken = getComputedStyle(U, '::after').content.replace(
              /['"]+/g,
              '',
            )),
              document.dispatchEvent(new CustomEvent('PingOneSignalsTokenReadyEvent'));
          }
          var T = S ? 'success' : 'failure';
          t('Finished - ' + T);
        });
      }
      function v(S, U) {
        for (var T = [], O = 0; O < S.length; O++) {
          var C = S.charCodeAt(O) ^ U.charCodeAt(O % U.length);
          T.push(String.fromCharCode(C));
        }
        return T.join('');
      }
      function y(S) {
        var U = { sdkVersion: c, platform: navigator.platform || '' },
          T = 'dkiBm42',
          O = encodeURIComponent(e(v(JSON.stringify(U), T))),
          C = document.createElement('link');
        (C.type = 'text/css'),
          (C.rel = 'stylesheet'),
          (C.href = 'https://' + S + '/signals/sdk/pong.css?body=' + O + '&e=2');
        var k = document.head || document.getElementsByTagName('head')[0];
        k.appendChild(C),
          (C.onload = function () {
            x(!0);
          }),
          (C.onerror = function () {
            x(!1);
          });
      }
      var L = document.querySelector('script[data-pingOneSignalsSkipToken]');
      if (L && L.getAttribute('data-pingOneSignalsSkipToken') === 'true') {
        (window._pingOneSignalsToken = 'skipped_token_' + new Date().getTime()),
          o(function () {
            document.dispatchEvent(new CustomEvent('PingOneSignalsTokenSkippedEvent'));
          });
        return;
      }
      window._pingOneSignalsToken ||
        (window._pingOneSignalsToken = 'uninitialized_token_' + new Date().getTime());
      var g = window._pingOneSignalsCustomHost,
        E = g || 'apps.test-one-pingone.com',
        f = g || 'apps.ort-one-pingone.com',
        m = g || 'apps.pingone.com',
        w = g || (s.test(i) || r.test(i) || n.test(i) ? E : a.test(i) ? f : m);
      y(w);
    })(),
    (function (c) {
      c._POSignalsEntities || (c._POSignalsEntities = {}),
        c._pingOneSignals && console.warn('PingOne Signals script was imported multiple times');
    })(window),
    (function (c, h) {
      h(c);
    })(window, function (c) {
      'use strict';
      function h(v) {
        var y = this.constructor;
        return this.then(
          function (L) {
            return y.resolve(v()).then(function () {
              return L;
            });
          },
          function (L) {
            return y.resolve(v()).then(function () {
              return y.reject(L);
            });
          },
        );
      }
      var p = setTimeout;
      function n(v) {
        return !!(v && typeof v.length != 'undefined');
      }
      function r() {}
      function a(v, y) {
        return function () {
          v.apply(y, arguments);
        };
      }
      function s(v) {
        if (!(this instanceof s)) throw new TypeError('Promises must be constructed via new');
        if (typeof v != 'function') throw new TypeError('not a function');
        (this._state = 0),
          (this._handled = !1),
          (this._value = void 0),
          (this._deferreds = []),
          x(v, this);
      }
      function i(v, y) {
        for (; v._state === 3; ) v = v._value;
        if (v._state === 0) {
          v._deferreds.push(y);
          return;
        }
        (v._handled = !0),
          s._immediateFn(function () {
            var L = v._state === 1 ? y.onFulfilled : y.onRejected;
            if (L === null) {
              (v._state === 1 ? t : e)(y.promise, v._value);
              return;
            }
            var g;
            try {
              g = L(v._value);
            } catch (E) {
              e(y.promise, E);
              return;
            }
            t(y.promise, g);
          });
      }
      function t(v, y) {
        try {
          if (y === v) throw new TypeError('A promise cannot be resolved with itself.');
          if (y && (typeof y == 'object' || typeof y == 'function')) {
            var L = y.then;
            if (y instanceof s) {
              (v._state = 3), (v._value = y), l(v);
              return;
            } else if (typeof L == 'function') {
              x(a(L, y), v);
              return;
            }
          }
          (v._state = 1), (v._value = y), l(v);
        } catch (g) {
          e(v, g);
        }
      }
      function e(v, y) {
        (v._state = 2), (v._value = y), l(v);
      }
      function l(v) {
        v._state === 2 &&
          v._deferreds.length === 0 &&
          s._immediateFn(function () {
            v._handled || s._unhandledRejectionFn(v._value);
          });
        for (var y = 0, L = v._deferreds.length; y < L; y++) i(v, v._deferreds[y]);
        v._deferreds = null;
      }
      function o(v, y, L) {
        (this.onFulfilled = typeof v == 'function' ? v : null),
          (this.onRejected = typeof y == 'function' ? y : null),
          (this.promise = L);
      }
      function x(v, y) {
        var L = !1;
        try {
          v(
            function (g) {
              L || ((L = !0), t(y, g));
            },
            function (g) {
              L || ((L = !0), e(y, g));
            },
          );
        } catch (g) {
          if (L) return;
          (L = !0), e(y, g);
        }
      }
      (s.prototype.catch = function (v) {
        return this.then(null, v);
      }),
        (s.prototype.then = function (v, y) {
          var L = new this.constructor(r);
          return i(this, new o(v, y, L)), L;
        }),
        (s.prototype.finally = h),
        (s.all = function (v) {
          return new s(function (y, L) {
            if (!n(v)) return L(new TypeError('Promise.all accepts an array'));
            var g = Array.prototype.slice.call(v);
            if (g.length === 0) return y([]);
            var E = g.length;
            function f(w, S) {
              try {
                if (S && (typeof S == 'object' || typeof S == 'function')) {
                  var U = S.then;
                  if (typeof U == 'function') {
                    U.call(
                      S,
                      function (T) {
                        f(w, T);
                      },
                      L,
                    );
                    return;
                  }
                }
                (g[w] = S), --E === 0 && y(g);
              } catch (T) {
                L(T);
              }
            }
            for (var m = 0; m < g.length; m++) f(m, g[m]);
          });
        }),
        (s.resolve = function (v) {
          return v && typeof v == 'object' && v.constructor === s
            ? v
            : new s(function (y) {
                y(v);
              });
        }),
        (s.reject = function (v) {
          return new s(function (y, L) {
            L(v);
          });
        }),
        (s.race = function (v) {
          return new s(function (y, L) {
            if (!n(v)) return L(new TypeError('Promise.race accepts an array'));
            for (var g = 0, E = v.length; g < E; g++) s.resolve(v[g]).then(y, L);
          });
        }),
        (s._immediateFn =
          (typeof setImmediate == 'function' &&
            function (v) {
              setImmediate(v);
            }) ||
          function (v) {
            p(v, 0);
          }),
        (s._unhandledRejectionFn = function (y) {
          typeof console != 'undefined' &&
            console &&
            console.warn('Possible Unhandled Promise Rejection:', y);
        }),
        typeof c.Promise != 'function'
          ? (c.Promise = s)
          : c.Promise.prototype.finally || (c.Promise.prototype.finally = h);
    }),
    (function (c, h) {
      'use strict';
      c.PromiseQueue = h();
    })(_POSignalsEntities || (_POSignalsEntities = {}), function () {
      'use strict';
      var c = function () {},
        h = function (n) {
          return n && typeof n.then == 'function'
            ? n
            : new Promise(function (r) {
                r(n);
              });
        };
      function p(n, r, a) {
        (this.options = a = a || {}),
          (this.pendingPromises = 0),
          (this.maxPendingPromises = typeof n != 'undefined' ? n : 1 / 0),
          (this.maxQueuedPromises = typeof r != 'undefined' ? r : 1 / 0),
          (this.queue = []);
      }
      return (
        (p.prototype.add = function (n) {
          var r = this;
          return new Promise(function (a, s, i) {
            if (r.queue.length >= r.maxQueuedPromises) {
              s(new Error('Queue limit reached'));
              return;
            }
            r.queue.push({ promiseGenerator: n, resolve: a, reject: s, notify: i || c }),
              r._dequeue();
          });
        }),
        (p.prototype.getPendingLength = function () {
          return this.pendingPromises;
        }),
        (p.prototype.getQueueLength = function () {
          return this.queue.length;
        }),
        (p.prototype._dequeue = function () {
          var n = this;
          if (this.pendingPromises >= this.maxPendingPromises) return !1;
          var r = this.queue.shift();
          if (!r) return this.options.onEmpty && this.options.onEmpty(), !1;
          try {
            this.pendingPromises++,
              h(r.promiseGenerator()).then(
                function (a) {
                  n.pendingPromises--, r.resolve(a), n._dequeue();
                },
                function (a) {
                  n.pendingPromises--, r.reject(a), n._dequeue();
                },
                function (a) {
                  r.notify(a);
                },
              );
          } catch (a) {
            n.pendingPromises--, r.reject(a), n._dequeue();
          }
          return !0;
        }),
        p
      );
    });
  (function (c) {
    'use strict';
    var h = 'input is invalid type',
      p = !c.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer != 'undefined',
      n = '0123456789abcdef'.split(''),
      r = [-2147483648, 8388608, 32768, 128],
      a = [24, 16, 8, 0],
      s = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
        2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
        2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122,
        1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891,
        3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
        1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
        3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877,
        958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452,
        2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
      ],
      i = ['hex', 'array', 'digest', 'arrayBuffer'],
      t = [];
    (c.JS_SHA256_NO_NODE_JS || !Array.isArray) &&
      (Array.isArray = function (g) {
        return Object.prototype.toString.call(g) === '[object Array]';
      }),
      p &&
        (c.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) &&
        (ArrayBuffer.isView = function (g) {
          return typeof g == 'object' && g.buffer && g.buffer.constructor === ArrayBuffer;
        });
    var e = function (g, E) {
        return function (f) {
          return new v(E, !0).update(f)[g]();
        };
      },
      l = function (g) {
        var E = e('hex', g);
        (E.create = function () {
          return new v(g);
        }),
          (E.update = function (w) {
            return E.create().update(w);
          });
        for (var f = 0; f < i.length; ++f) {
          var m = i[f];
          E[m] = e(m, g);
        }
        return E;
      },
      o = function (g, E) {
        return function (f, m) {
          return new y(f, E, !0).update(m)[g]();
        };
      },
      x = function (g) {
        var E = o('hex', g);
        (E.create = function (w) {
          return new y(w, g);
        }),
          (E.update = function (w, S) {
            return E.create(w).update(S);
          });
        for (var f = 0; f < i.length; ++f) {
          var m = i[f];
          E[m] = o(m, g);
        }
        return E;
      };
    function v(g, E) {
      E
        ? ((t[0] =
            t[16] =
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
              0),
          (this.blocks = t))
        : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        g
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
        (this.is224 = g);
    }
    (v.prototype.update = function (g) {
      if (!this.finalized) {
        var E,
          f = typeof g;
        if (f !== 'string') {
          if (f === 'object') {
            if (g === null) throw new Error(h);
            if (p && g.constructor === ArrayBuffer) g = new Uint8Array(g);
            else if (!Array.isArray(g) && (!p || !ArrayBuffer.isView(g))) throw new Error(h);
          } else throw new Error(h);
          E = !0;
        }
        for (var m, w = 0, S, U = g.length, T = this.blocks; w < U; ) {
          if (
            (this.hashed &&
              ((this.hashed = !1),
              (T[0] = this.block),
              (T[16] =
                T[1] =
                T[2] =
                T[3] =
                T[4] =
                T[5] =
                T[6] =
                T[7] =
                T[8] =
                T[9] =
                T[10] =
                T[11] =
                T[12] =
                T[13] =
                T[14] =
                T[15] =
                  0)),
            E)
          )
            for (S = this.start; w < U && S < 64; ++w) T[S >> 2] |= g[w] << a[S++ & 3];
          else
            for (S = this.start; w < U && S < 64; ++w)
              (m = g.charCodeAt(w)),
                m < 128
                  ? (T[S >> 2] |= m << a[S++ & 3])
                  : m < 2048
                    ? ((T[S >> 2] |= (192 | (m >> 6)) << a[S++ & 3]),
                      (T[S >> 2] |= (128 | (m & 63)) << a[S++ & 3]))
                    : m < 55296 || m >= 57344
                      ? ((T[S >> 2] |= (224 | (m >> 12)) << a[S++ & 3]),
                        (T[S >> 2] |= (128 | ((m >> 6) & 63)) << a[S++ & 3]),
                        (T[S >> 2] |= (128 | (m & 63)) << a[S++ & 3]))
                      : ((m = 65536 + (((m & 1023) << 10) | (g.charCodeAt(++w) & 1023))),
                        (T[S >> 2] |= (240 | (m >> 18)) << a[S++ & 3]),
                        (T[S >> 2] |= (128 | ((m >> 12) & 63)) << a[S++ & 3]),
                        (T[S >> 2] |= (128 | ((m >> 6) & 63)) << a[S++ & 3]),
                        (T[S >> 2] |= (128 | (m & 63)) << a[S++ & 3]));
          (this.lastByteIndex = S),
            (this.bytes += S - this.start),
            S >= 64
              ? ((this.block = T[16]), (this.start = S - 64), this.hash(), (this.hashed = !0))
              : (this.start = S);
        }
        return (
          this.bytes > 4294967295 &&
            ((this.hBytes += (this.bytes / 4294967296) << 0),
            (this.bytes = this.bytes % 4294967296)),
          this
        );
      }
    }),
      (v.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0;
          var g = this.blocks,
            E = this.lastByteIndex;
          (g[16] = this.block),
            (g[E >> 2] |= r[E & 3]),
            (this.block = g[16]),
            E >= 56 &&
              (this.hashed || this.hash(),
              (g[0] = this.block),
              (g[16] =
                g[1] =
                g[2] =
                g[3] =
                g[4] =
                g[5] =
                g[6] =
                g[7] =
                g[8] =
                g[9] =
                g[10] =
                g[11] =
                g[12] =
                g[13] =
                g[14] =
                g[15] =
                  0)),
            (g[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
            (g[15] = this.bytes << 3),
            this.hash();
        }
      }),
      (v.prototype.hash = function () {
        var g = this.h0,
          E = this.h1,
          f = this.h2,
          m = this.h3,
          w = this.h4,
          S = this.h5,
          U = this.h6,
          T = this.h7,
          O = this.blocks,
          C,
          k,
          R,
          H,
          ee,
          M,
          K,
          Z,
          le,
          q,
          be;
        for (C = 16; C < 64; ++C)
          (ee = O[C - 15]),
            (k = ((ee >>> 7) | (ee << 25)) ^ ((ee >>> 18) | (ee << 14)) ^ (ee >>> 3)),
            (ee = O[C - 2]),
            (R = ((ee >>> 17) | (ee << 15)) ^ ((ee >>> 19) | (ee << 13)) ^ (ee >>> 10)),
            (O[C] = (O[C - 16] + k + O[C - 7] + R) << 0);
        for (be = E & f, C = 0; C < 64; C += 4)
          this.first
            ? (this.is224
                ? ((Z = 300032),
                  (ee = O[0] - 1413257819),
                  (T = (ee - 150054599) << 0),
                  (m = (ee + 24177077) << 0))
                : ((Z = 704751109),
                  (ee = O[0] - 210244248),
                  (T = (ee - 1521486534) << 0),
                  (m = (ee + 143694565) << 0)),
              (this.first = !1))
            : ((k = ((g >>> 2) | (g << 30)) ^ ((g >>> 13) | (g << 19)) ^ ((g >>> 22) | (g << 10))),
              (R = ((w >>> 6) | (w << 26)) ^ ((w >>> 11) | (w << 21)) ^ ((w >>> 25) | (w << 7))),
              (Z = g & E),
              (H = Z ^ (g & f) ^ be),
              (K = (w & S) ^ (~w & U)),
              (ee = T + R + K + s[C] + O[C]),
              (M = k + H),
              (T = (m + ee) << 0),
              (m = (ee + M) << 0)),
            (k = ((m >>> 2) | (m << 30)) ^ ((m >>> 13) | (m << 19)) ^ ((m >>> 22) | (m << 10))),
            (R = ((T >>> 6) | (T << 26)) ^ ((T >>> 11) | (T << 21)) ^ ((T >>> 25) | (T << 7))),
            (le = m & g),
            (H = le ^ (m & E) ^ Z),
            (K = (T & w) ^ (~T & S)),
            (ee = U + R + K + s[C + 1] + O[C + 1]),
            (M = k + H),
            (U = (f + ee) << 0),
            (f = (ee + M) << 0),
            (k = ((f >>> 2) | (f << 30)) ^ ((f >>> 13) | (f << 19)) ^ ((f >>> 22) | (f << 10))),
            (R = ((U >>> 6) | (U << 26)) ^ ((U >>> 11) | (U << 21)) ^ ((U >>> 25) | (U << 7))),
            (q = f & m),
            (H = q ^ (f & g) ^ le),
            (K = (U & T) ^ (~U & w)),
            (ee = S + R + K + s[C + 2] + O[C + 2]),
            (M = k + H),
            (S = (E + ee) << 0),
            (E = (ee + M) << 0),
            (k = ((E >>> 2) | (E << 30)) ^ ((E >>> 13) | (E << 19)) ^ ((E >>> 22) | (E << 10))),
            (R = ((S >>> 6) | (S << 26)) ^ ((S >>> 11) | (S << 21)) ^ ((S >>> 25) | (S << 7))),
            (be = E & f),
            (H = be ^ (E & m) ^ q),
            (K = (S & U) ^ (~S & T)),
            (ee = w + R + K + s[C + 3] + O[C + 3]),
            (M = k + H),
            (w = (g + ee) << 0),
            (g = (ee + M) << 0);
        (this.h0 = (this.h0 + g) << 0),
          (this.h1 = (this.h1 + E) << 0),
          (this.h2 = (this.h2 + f) << 0),
          (this.h3 = (this.h3 + m) << 0),
          (this.h4 = (this.h4 + w) << 0),
          (this.h5 = (this.h5 + S) << 0),
          (this.h6 = (this.h6 + U) << 0),
          (this.h7 = (this.h7 + T) << 0);
      }),
      (v.prototype.hex = function () {
        this.finalize();
        var g = this.h0,
          E = this.h1,
          f = this.h2,
          m = this.h3,
          w = this.h4,
          S = this.h5,
          U = this.h6,
          T = this.h7,
          O =
            n[(g >> 28) & 15] +
            n[(g >> 24) & 15] +
            n[(g >> 20) & 15] +
            n[(g >> 16) & 15] +
            n[(g >> 12) & 15] +
            n[(g >> 8) & 15] +
            n[(g >> 4) & 15] +
            n[g & 15] +
            n[(E >> 28) & 15] +
            n[(E >> 24) & 15] +
            n[(E >> 20) & 15] +
            n[(E >> 16) & 15] +
            n[(E >> 12) & 15] +
            n[(E >> 8) & 15] +
            n[(E >> 4) & 15] +
            n[E & 15] +
            n[(f >> 28) & 15] +
            n[(f >> 24) & 15] +
            n[(f >> 20) & 15] +
            n[(f >> 16) & 15] +
            n[(f >> 12) & 15] +
            n[(f >> 8) & 15] +
            n[(f >> 4) & 15] +
            n[f & 15] +
            n[(m >> 28) & 15] +
            n[(m >> 24) & 15] +
            n[(m >> 20) & 15] +
            n[(m >> 16) & 15] +
            n[(m >> 12) & 15] +
            n[(m >> 8) & 15] +
            n[(m >> 4) & 15] +
            n[m & 15] +
            n[(w >> 28) & 15] +
            n[(w >> 24) & 15] +
            n[(w >> 20) & 15] +
            n[(w >> 16) & 15] +
            n[(w >> 12) & 15] +
            n[(w >> 8) & 15] +
            n[(w >> 4) & 15] +
            n[w & 15] +
            n[(S >> 28) & 15] +
            n[(S >> 24) & 15] +
            n[(S >> 20) & 15] +
            n[(S >> 16) & 15] +
            n[(S >> 12) & 15] +
            n[(S >> 8) & 15] +
            n[(S >> 4) & 15] +
            n[S & 15] +
            n[(U >> 28) & 15] +
            n[(U >> 24) & 15] +
            n[(U >> 20) & 15] +
            n[(U >> 16) & 15] +
            n[(U >> 12) & 15] +
            n[(U >> 8) & 15] +
            n[(U >> 4) & 15] +
            n[U & 15];
        return (
          this.is224 ||
            (O +=
              n[(T >> 28) & 15] +
              n[(T >> 24) & 15] +
              n[(T >> 20) & 15] +
              n[(T >> 16) & 15] +
              n[(T >> 12) & 15] +
              n[(T >> 8) & 15] +
              n[(T >> 4) & 15] +
              n[T & 15]),
          O
        );
      }),
      (v.prototype.toString = v.prototype.hex),
      (v.prototype.digest = function () {
        this.finalize();
        var g = this.h0,
          E = this.h1,
          f = this.h2,
          m = this.h3,
          w = this.h4,
          S = this.h5,
          U = this.h6,
          T = this.h7,
          O = [
            (g >> 24) & 255,
            (g >> 16) & 255,
            (g >> 8) & 255,
            g & 255,
            (E >> 24) & 255,
            (E >> 16) & 255,
            (E >> 8) & 255,
            E & 255,
            (f >> 24) & 255,
            (f >> 16) & 255,
            (f >> 8) & 255,
            f & 255,
            (m >> 24) & 255,
            (m >> 16) & 255,
            (m >> 8) & 255,
            m & 255,
            (w >> 24) & 255,
            (w >> 16) & 255,
            (w >> 8) & 255,
            w & 255,
            (S >> 24) & 255,
            (S >> 16) & 255,
            (S >> 8) & 255,
            S & 255,
            (U >> 24) & 255,
            (U >> 16) & 255,
            (U >> 8) & 255,
            U & 255,
          ];
        return this.is224 || O.push((T >> 24) & 255, (T >> 16) & 255, (T >> 8) & 255, T & 255), O;
      }),
      (v.prototype.array = v.prototype.digest),
      (v.prototype.arrayBuffer = function () {
        this.finalize();
        var g = new ArrayBuffer(this.is224 ? 28 : 32),
          E = new DataView(g);
        return (
          E.setUint32(0, this.h0),
          E.setUint32(4, this.h1),
          E.setUint32(8, this.h2),
          E.setUint32(12, this.h3),
          E.setUint32(16, this.h4),
          E.setUint32(20, this.h5),
          E.setUint32(24, this.h6),
          this.is224 || E.setUint32(28, this.h7),
          g
        );
      });
    function y(g, E, f) {
      var m,
        w = typeof g;
      if (w === 'string') {
        var S = [],
          U = g.length,
          T = 0,
          O;
        for (m = 0; m < U; ++m)
          (O = g.charCodeAt(m)),
            O < 128
              ? (S[T++] = O)
              : O < 2048
                ? ((S[T++] = 192 | (O >> 6)), (S[T++] = 128 | (O & 63)))
                : O < 55296 || O >= 57344
                  ? ((S[T++] = 224 | (O >> 12)),
                    (S[T++] = 128 | ((O >> 6) & 63)),
                    (S[T++] = 128 | (O & 63)))
                  : ((O = 65536 + (((O & 1023) << 10) | (g.charCodeAt(++m) & 1023))),
                    (S[T++] = 240 | (O >> 18)),
                    (S[T++] = 128 | ((O >> 12) & 63)),
                    (S[T++] = 128 | ((O >> 6) & 63)),
                    (S[T++] = 128 | (O & 63)));
        g = S;
      } else if (w === 'object') {
        if (g === null) throw new Error(h);
        if (p && g.constructor === ArrayBuffer) g = new Uint8Array(g);
        else if (!Array.isArray(g) && (!p || !ArrayBuffer.isView(g))) throw new Error(h);
      } else throw new Error(h);
      g.length > 64 && (g = new v(E, !0).update(g).array());
      var C = [],
        k = [];
      for (m = 0; m < 64; ++m) {
        var R = g[m] || 0;
        (C[m] = 92 ^ R), (k[m] = 54 ^ R);
      }
      v.call(this, E, f),
        this.update(k),
        (this.oKeyPad = C),
        (this.inner = !0),
        (this.sharedMemory = f);
    }
    (y.prototype = new v()),
      (y.prototype.finalize = function () {
        if ((v.prototype.finalize.call(this), this.inner)) {
          this.inner = !1;
          var g = this.array();
          v.call(this, this.is224, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(g),
            v.prototype.finalize.call(this);
        }
      });
    var L = l();
    (L.sha256 = L),
      (L.sha224 = l(!0)),
      (L.sha256.hmac = x()),
      (L.sha224.hmac = x(!0)),
      (c.sha256 = L.sha256),
      (c.sha224 = L.sha224);
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (c) {
      c.FingerprintJS = (function (h) {
        'use strict';
        var p = function () {
          return (
            (p =
              Object.assign ||
              function (b) {
                for (var I, D = 1, P = arguments.length; D < P; D++) {
                  I = arguments[D];
                  for (var N in I) Object.prototype.hasOwnProperty.call(I, N) && (b[N] = I[N]);
                }
                return b;
              }),
            p.apply(this, arguments)
          );
        };
        function n(u, b, I, D) {
          function P(N) {
            return N instanceof I
              ? N
              : new I(function (V) {
                  V(N);
                });
          }
          return new (I || (I = Promise))(function (N, V) {
            function X(Q) {
              try {
                J(D.next(Q));
              } catch (z) {
                V(z);
              }
            }
            function Y(Q) {
              try {
                J(D.throw(Q));
              } catch (z) {
                V(z);
              }
            }
            function J(Q) {
              Q.done ? N(Q.value) : P(Q.value).then(X, Y);
            }
            J((D = D.apply(u, b || [])).next());
          });
        }
        function r(u, b) {
          var I = {
              label: 0,
              sent: function () {
                if (N[0] & 1) throw N[1];
                return N[1];
              },
              trys: [],
              ops: [],
            },
            D,
            P,
            N,
            V;
          return (
            (V = { next: X(0), throw: X(1), return: X(2) }),
            typeof Symbol == 'function' &&
              (V[Symbol.iterator] = function () {
                return this;
              }),
            V
          );
          function X(J) {
            return function (Q) {
              return Y([J, Q]);
            };
          }
          function Y(J) {
            if (D) throw new TypeError('Generator is already executing.');
            for (; V && ((V = 0), J[0] && (I = 0)), I; )
              try {
                if (
                  ((D = 1),
                  P &&
                    (N =
                      J[0] & 2
                        ? P.return
                        : J[0]
                          ? P.throw || ((N = P.return) && N.call(P), 0)
                          : P.next) &&
                    !(N = N.call(P, J[1])).done)
                )
                  return N;
                switch (((P = 0), N && (J = [J[0] & 2, N.value]), J[0])) {
                  case 0:
                  case 1:
                    N = J;
                    break;
                  case 4:
                    return I.label++, { value: J[1], done: !1 };
                  case 5:
                    I.label++, (P = J[1]), (J = [0]);
                    continue;
                  case 7:
                    (J = I.ops.pop()), I.trys.pop();
                    continue;
                  default:
                    if (
                      ((N = I.trys),
                      !(N = N.length > 0 && N[N.length - 1]) && (J[0] === 6 || J[0] === 2))
                    ) {
                      I = 0;
                      continue;
                    }
                    if (J[0] === 3 && (!N || (J[1] > N[0] && J[1] < N[3]))) {
                      I.label = J[1];
                      break;
                    }
                    if (J[0] === 6 && I.label < N[1]) {
                      (I.label = N[1]), (N = J);
                      break;
                    }
                    if (N && I.label < N[2]) {
                      (I.label = N[2]), I.ops.push(J);
                      break;
                    }
                    N[2] && I.ops.pop(), I.trys.pop();
                    continue;
                }
                J = b.call(u, I);
              } catch (Q) {
                (J = [6, Q]), (P = 0);
              } finally {
                D = N = 0;
              }
            if (J[0] & 5) throw J[1];
            return { value: J[0] ? J[1] : void 0, done: !0 };
          }
        }
        function a(u, b, I) {
          if (I || arguments.length === 2)
            for (var D = 0, P = b.length, N; D < P; D++)
              (N || !(D in b)) && (N || (N = Array.prototype.slice.call(b, 0, D)), (N[D] = b[D]));
          return u.concat(N || Array.prototype.slice.call(b));
        }
        var s = '4.6.1';
        function i(u, b) {
          return new Promise(function (I) {
            return setTimeout(I, u, b);
          });
        }
        function t() {
          return new Promise(function (u) {
            var b = new MessageChannel();
            (b.port1.onmessage = function () {
              return u();
            }),
              b.port2.postMessage(null);
          });
        }
        function e(u, b) {
          b === void 0 && (b = 1 / 0);
          var I = window.requestIdleCallback;
          return I
            ? new Promise(function (D) {
                return I.call(
                  window,
                  function () {
                    return D();
                  },
                  { timeout: b },
                );
              })
            : i(Math.min(u, b));
        }
        function l(u) {
          return !!u && typeof u.then == 'function';
        }
        function o(u, b) {
          try {
            var I = u();
            l(I)
              ? I.then(
                  function (D) {
                    return b(!0, D);
                  },
                  function (D) {
                    return b(!1, D);
                  },
                )
              : b(!0, I);
          } catch (D) {
            b(!1, D);
          }
        }
        function x(u, b, I) {
          return (
            I === void 0 && (I = 16),
            n(this, void 0, void 0, function () {
              var D, P, N, V;
              return r(this, function (X) {
                switch (X.label) {
                  case 0:
                    (D = Array(u.length)), (P = Date.now()), (N = 0), (X.label = 1);
                  case 1:
                    return N < u.length
                      ? ((D[N] = b(u[N], N)),
                        (V = Date.now()),
                        V >= P + I ? ((P = V), [4, t()]) : [3, 3])
                      : [3, 4];
                  case 2:
                    X.sent(), (X.label = 3);
                  case 3:
                    return ++N, [3, 1];
                  case 4:
                    return [2, D];
                }
              });
            })
          );
        }
        function v(u) {
          return u.then(void 0, function () {}), u;
        }
        function y(u, b) {
          for (var I = 0, D = u.length; I < D; ++I) if (u[I] === b) return !0;
          return !1;
        }
        function L(u, b) {
          return !y(u, b);
        }
        function g(u) {
          return parseInt(u);
        }
        function E(u) {
          return parseFloat(u);
        }
        function f(u, b) {
          return typeof u == 'number' && isNaN(u) ? b : u;
        }
        function m(u) {
          return u.reduce(function (b, I) {
            return b + (I ? 1 : 0);
          }, 0);
        }
        function w(u, b) {
          if ((b === void 0 && (b = 1), Math.abs(b) >= 1)) return Math.round(u / b) * b;
          var I = 1 / b;
          return Math.round(u * I) / I;
        }
        function S(u) {
          for (
            var b,
              I,
              D = "Unexpected syntax '".concat(u, "'"),
              P = /^\s*([a-z-]*)(.*)$/i.exec(u),
              N = P[1] || void 0,
              V = {},
              X = /([.:#][\w-]+|\[.+?\])/gi,
              Y = function (me, Ie) {
                (V[me] = V[me] || []), V[me].push(Ie);
              };
            ;

          ) {
            var J = X.exec(P[2]);
            if (!J) break;
            var Q = J[0];
            switch (Q[0]) {
              case '.':
                Y('class', Q.slice(1));
                break;
              case '#':
                Y('id', Q.slice(1));
                break;
              case '[': {
                var z = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(Q);
                if (z)
                  Y(
                    z[1],
                    (I = (b = z[4]) !== null && b !== void 0 ? b : z[5]) !== null && I !== void 0
                      ? I
                      : '',
                  );
                else throw new Error(D);
                break;
              }
              default:
                throw new Error(D);
            }
          }
          return [N, V];
        }
        function U(u) {
          for (var b = new Uint8Array(u.length), I = 0; I < u.length; I++) {
            var D = u.charCodeAt(I);
            if (D > 127) return new TextEncoder().encode(u);
            b[I] = D;
          }
          return b;
        }
        function T(u, b) {
          var I = u[0] >>> 16,
            D = u[0] & 65535,
            P = u[1] >>> 16,
            N = u[1] & 65535,
            V = b[0] >>> 16,
            X = b[0] & 65535,
            Y = b[1] >>> 16,
            J = b[1] & 65535,
            Q = 0,
            z = 0,
            me = 0,
            Ie = 0;
          (Ie += N + J),
            (me += Ie >>> 16),
            (Ie &= 65535),
            (me += P + Y),
            (z += me >>> 16),
            (me &= 65535),
            (z += D + X),
            (Q += z >>> 16),
            (z &= 65535),
            (Q += I + V),
            (Q &= 65535),
            (u[0] = (Q << 16) | z),
            (u[1] = (me << 16) | Ie);
        }
        function O(u, b) {
          var I = u[0] >>> 16,
            D = u[0] & 65535,
            P = u[1] >>> 16,
            N = u[1] & 65535,
            V = b[0] >>> 16,
            X = b[0] & 65535,
            Y = b[1] >>> 16,
            J = b[1] & 65535,
            Q = 0,
            z = 0,
            me = 0,
            Ie = 0;
          (Ie += N * J),
            (me += Ie >>> 16),
            (Ie &= 65535),
            (me += P * J),
            (z += me >>> 16),
            (me &= 65535),
            (me += N * Y),
            (z += me >>> 16),
            (me &= 65535),
            (z += D * J),
            (Q += z >>> 16),
            (z &= 65535),
            (z += P * Y),
            (Q += z >>> 16),
            (z &= 65535),
            (z += N * X),
            (Q += z >>> 16),
            (z &= 65535),
            (Q += I * J + D * Y + P * X + N * V),
            (Q &= 65535),
            (u[0] = (Q << 16) | z),
            (u[1] = (me << 16) | Ie);
        }
        function C(u, b) {
          var I = u[0];
          (b %= 64),
            b === 32
              ? ((u[0] = u[1]), (u[1] = I))
              : b < 32
                ? ((u[0] = (I << b) | (u[1] >>> (32 - b))), (u[1] = (u[1] << b) | (I >>> (32 - b))))
                : ((b -= 32),
                  (u[0] = (u[1] << b) | (I >>> (32 - b))),
                  (u[1] = (I << b) | (u[1] >>> (32 - b))));
        }
        function k(u, b) {
          (b %= 64),
            b !== 0 &&
              (b < 32
                ? ((u[0] = u[1] >>> (32 - b)), (u[1] = u[1] << b))
                : ((u[0] = u[1] << (b - 32)), (u[1] = 0)));
        }
        function R(u, b) {
          (u[0] ^= b[0]), (u[1] ^= b[1]);
        }
        var H = [4283543511, 3981806797],
          ee = [3301882366, 444984403];
        function M(u) {
          var b = [0, u[0] >>> 1];
          R(u, b), O(u, H), (b[1] = u[0] >>> 1), R(u, b), O(u, ee), (b[1] = u[0] >>> 1), R(u, b);
        }
        var K = [2277735313, 289559509],
          Z = [1291169091, 658871167],
          le = [0, 5],
          q = [0, 1390208809],
          be = [0, 944331445];
        function we(u, b) {
          var I = U(u);
          b = b || 0;
          var D = [0, I.length],
            P = D[1] % 16,
            N = D[1] - P,
            V = [0, b],
            X = [0, b],
            Y = [0, 0],
            J = [0, 0],
            Q;
          for (Q = 0; Q < N; Q = Q + 16)
            (Y[0] = I[Q + 4] | (I[Q + 5] << 8) | (I[Q + 6] << 16) | (I[Q + 7] << 24)),
              (Y[1] = I[Q] | (I[Q + 1] << 8) | (I[Q + 2] << 16) | (I[Q + 3] << 24)),
              (J[0] = I[Q + 12] | (I[Q + 13] << 8) | (I[Q + 14] << 16) | (I[Q + 15] << 24)),
              (J[1] = I[Q + 8] | (I[Q + 9] << 8) | (I[Q + 10] << 16) | (I[Q + 11] << 24)),
              O(Y, K),
              C(Y, 31),
              O(Y, Z),
              R(V, Y),
              C(V, 27),
              T(V, X),
              O(V, le),
              T(V, q),
              O(J, Z),
              C(J, 33),
              O(J, K),
              R(X, J),
              C(X, 31),
              T(X, V),
              O(X, le),
              T(X, be);
          (Y[0] = 0), (Y[1] = 0), (J[0] = 0), (J[1] = 0);
          var z = [0, 0];
          switch (P) {
            case 15:
              (z[1] = I[Q + 14]), k(z, 48), R(J, z);
            case 14:
              (z[1] = I[Q + 13]), k(z, 40), R(J, z);
            case 13:
              (z[1] = I[Q + 12]), k(z, 32), R(J, z);
            case 12:
              (z[1] = I[Q + 11]), k(z, 24), R(J, z);
            case 11:
              (z[1] = I[Q + 10]), k(z, 16), R(J, z);
            case 10:
              (z[1] = I[Q + 9]), k(z, 8), R(J, z);
            case 9:
              (z[1] = I[Q + 8]), R(J, z), O(J, Z), C(J, 33), O(J, K), R(X, J);
            case 8:
              (z[1] = I[Q + 7]), k(z, 56), R(Y, z);
            case 7:
              (z[1] = I[Q + 6]), k(z, 48), R(Y, z);
            case 6:
              (z[1] = I[Q + 5]), k(z, 40), R(Y, z);
            case 5:
              (z[1] = I[Q + 4]), k(z, 32), R(Y, z);
            case 4:
              (z[1] = I[Q + 3]), k(z, 24), R(Y, z);
            case 3:
              (z[1] = I[Q + 2]), k(z, 16), R(Y, z);
            case 2:
              (z[1] = I[Q + 1]), k(z, 8), R(Y, z);
            case 1:
              (z[1] = I[Q]), R(Y, z), O(Y, K), C(Y, 31), O(Y, Z), R(V, Y);
          }
          return (
            R(V, D),
            R(X, D),
            T(V, X),
            T(X, V),
            M(V),
            M(X),
            T(V, X),
            T(X, V),
            ('00000000' + (V[0] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (V[1] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (X[0] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (X[1] >>> 0).toString(16)).slice(-8)
          );
        }
        function He(u) {
          var b;
          return p(
            {
              name: u.name,
              message: u.message,
              stack:
                (b = u.stack) === null || b === void 0
                  ? void 0
                  : b.split(`
`),
            },
            u,
          );
        }
        function B(u) {
          return /^function\s.*?\{\s*\[native code]\s*}$/.test(String(u));
        }
        function ne(u) {
          return typeof u != 'function';
        }
        function se(u, b) {
          var I = v(
            new Promise(function (D) {
              var P = Date.now();
              o(u.bind(null, b), function () {
                for (var N = [], V = 0; V < arguments.length; V++) N[V] = arguments[V];
                var X = Date.now() - P;
                if (!N[0])
                  return D(function () {
                    return { error: N[1], duration: X };
                  });
                var Y = N[1];
                if (ne(Y))
                  return D(function () {
                    return { value: Y, duration: X };
                  });
                D(function () {
                  return new Promise(function (J) {
                    var Q = Date.now();
                    o(Y, function () {
                      for (var z = [], me = 0; me < arguments.length; me++) z[me] = arguments[me];
                      var Ie = X + Date.now() - Q;
                      if (!z[0]) return J({ error: z[1], duration: Ie });
                      J({ value: z[1], duration: Ie });
                    });
                  });
                });
              });
            }),
          );
          return function () {
            return I.then(function (P) {
              return P();
            });
          };
        }
        function oe(u, b, I, D) {
          var P = Object.keys(u).filter(function (V) {
              return L(I, V);
            }),
            N = v(
              x(
                P,
                function (V) {
                  return se(u[V], b);
                },
                D,
              ),
            );
          return function () {
            return n(this, void 0, void 0, function () {
              var X, Y, J, Q, z;
              return r(this, function (me) {
                switch (me.label) {
                  case 0:
                    return [4, N];
                  case 1:
                    return (
                      (X = me.sent()),
                      [
                        4,
                        x(
                          X,
                          function (Ie) {
                            return v(Ie());
                          },
                          D,
                        ),
                      ]
                    );
                  case 2:
                    return (Y = me.sent()), [4, Promise.all(Y)];
                  case 3:
                    for (J = me.sent(), Q = {}, z = 0; z < P.length; ++z) Q[P[z]] = J[z];
                    return [2, Q];
                }
              });
            });
          };
        }
        function ge(u, b) {
          var I = function (D) {
            return ne(D)
              ? b(D)
              : function () {
                  var P = D();
                  return l(P) ? P.then(b) : b(P);
                };
          };
          return function (D) {
            var P = u(D);
            return l(P) ? P.then(I) : I(P);
          };
        }
        function De() {
          var u = window,
            b = navigator;
          return (
            m([
              'MSCSSMatrix' in u,
              'msSetImmediate' in u,
              'msIndexedDB' in u,
              'msMaxTouchPoints' in b,
              'msPointerEnabled' in b,
            ]) >= 4
          );
        }
        function Te() {
          var u = window,
            b = navigator;
          return (
            m([
              'msWriteProfilerMark' in u,
              'MSStream' in u,
              'msLaunchUri' in b,
              'msSaveBlob' in b,
            ]) >= 3 && !De()
          );
        }
        function Fe() {
          var u = window,
            b = navigator;
          return (
            m([
              'webkitPersistentStorage' in b,
              'webkitTemporaryStorage' in b,
              (b.vendor || '').indexOf('Google') === 0,
              'webkitResolveLocalFileSystemURL' in u,
              'BatteryManager' in u,
              'webkitMediaStream' in u,
              'webkitSpeechGrammar' in u,
            ]) >= 5
          );
        }
        function Re() {
          var u = window,
            b = navigator;
          return (
            m([
              'ApplePayError' in u,
              'CSSPrimitiveValue' in u,
              'Counter' in u,
              b.vendor.indexOf('Apple') === 0,
              'RGBColor' in u,
              'WebKitMediaKeys' in u,
            ]) >= 4
          );
        }
        function Le() {
          var u = window,
            b = u.HTMLElement,
            I = u.Document;
          return (
            m([
              'safari' in u,
              !('ongestureend' in u),
              !('TouchEvent' in u),
              !('orientation' in u),
              b && !('autocapitalize' in b.prototype),
              I && 'pointerLockElement' in I.prototype,
            ]) >= 4
          );
        }
        function Oe() {
          var u = window;
          return B(u.print) && String(u.browser) === '[object WebPageNamespace]';
        }
        function Xe() {
          var u,
            b,
            I = window;
          return (
            m([
              'buildID' in navigator,
              'MozAppearance' in
                ((b =
                  (u = document.documentElement) === null || u === void 0 ? void 0 : u.style) !==
                  null && b !== void 0
                  ? b
                  : {}),
              'onmozfullscreenchange' in I,
              'mozInnerScreenX' in I,
              'CSSMozDocumentRule' in I,
              'CanvasCaptureMediaStream' in I,
            ]) >= 4
          );
        }
        function $e() {
          var u = window;
          return (
            m([
              !('MediaSettingsRange' in u),
              'RTCEncodedAudioFrame' in u,
              '' + u.Intl == '[object Intl]',
              '' + u.Reflect == '[object Reflect]',
            ]) >= 3
          );
        }
        function pt() {
          var u = window,
            b = u.URLPattern;
          return (
            m([
              'union' in Set.prototype,
              'Iterator' in u,
              b && 'hasRegExpGroups' in b.prototype,
              'RGB8' in WebGLRenderingContext.prototype,
            ]) >= 3
          );
        }
        function Qe() {
          var u = window;
          return (
            m([
              'DOMRectList' in u,
              'RTCPeerConnectionIceEvent' in u,
              'SVGGeometryElement' in u,
              'ontransitioncancel' in u,
            ]) >= 3
          );
        }
        function Ke() {
          var u = window,
            b = navigator,
            I = u.CSS,
            D = u.HTMLButtonElement;
          return (
            m([
              !('getStorageUpdates' in b),
              D && 'popover' in D.prototype,
              'CSSCounterStyleRule' in u,
              I.supports('font-size-adjust: ex-height 0.5'),
              I.supports('text-transform: full-width'),
            ]) >= 4
          );
        }
        function it() {
          if (navigator.platform === 'iPad') return !0;
          var u = screen,
            b = u.width / u.height;
          return (
            m([
              'MediaSource' in window,
              !!Element.prototype.webkitRequestFullscreen,
              b > 0.65 && b < 1.53,
            ]) >= 2
          );
        }
        function _e() {
          var u = document;
          return (
            u.fullscreenElement ||
            u.msFullscreenElement ||
            u.mozFullScreenElement ||
            u.webkitFullscreenElement ||
            null
          );
        }
        function Ge() {
          var u = document;
          return (
            u.exitFullscreen ||
            u.msExitFullscreen ||
            u.mozCancelFullScreen ||
            u.webkitExitFullscreen
          ).call(u);
        }
        function Pe() {
          var u = Fe(),
            b = Xe(),
            I = window,
            D = navigator,
            P = 'connection';
          return u
            ? m([
                !('SharedWorker' in I),
                D[P] && 'ontypechange' in D[P],
                !('sinkId' in new Audio()),
              ]) >= 2
            : b
              ? m([
                  'onorientationchange' in I,
                  'orientation' in I,
                  /android/i.test(D.appVersion),
                ]) >= 2
              : !1;
        }
        function et() {
          var u = navigator,
            b = window,
            I = Audio.prototype,
            D = b.visualViewport;
          return (
            m([
              'srLatency' in I,
              'srChannelCount' in I,
              'devicePosture' in u,
              D && 'segments' in D,
              'getTextInformation' in Image.prototype,
            ]) >= 3
          );
        }
        function tt() {
          return Je() ? -4 : rt();
        }
        function rt() {
          var u = window,
            b = u.OfflineAudioContext || u.webkitOfflineAudioContext;
          if (!b) return -2;
          if (nt()) return -1;
          var I = 4500,
            D = 5e3,
            P = new b(1, D, 44100),
            N = P.createOscillator();
          (N.type = 'triangle'), (N.frequency.value = 1e4);
          var V = P.createDynamicsCompressor();
          (V.threshold.value = -50),
            (V.knee.value = 40),
            (V.ratio.value = 12),
            (V.attack.value = 0),
            (V.release.value = 0.25),
            N.connect(V),
            V.connect(P.destination),
            N.start(0);
          var X = _(P),
            Y = X[0],
            J = X[1],
            Q = v(
              Y.then(
                function (z) {
                  return W(z.getChannelData(0).subarray(I));
                },
                function (z) {
                  if (z.name === 'timeout' || z.name === 'suspended') return -3;
                  throw z;
                },
              ),
            );
          return function () {
            return J(), Q;
          };
        }
        function nt() {
          return Re() && !Le() && !Qe();
        }
        function Je() {
          return (Re() && Ke() && Oe()) || (Fe() && et() && pt());
        }
        function _(u) {
          var b = 3,
            I = 500,
            D = 500,
            P = 5e3,
            N = function () {},
            V = new Promise(function (X, Y) {
              var J = !1,
                Q = 0,
                z = 0;
              u.oncomplete = function (Ve) {
                return X(Ve.renderedBuffer);
              };
              var me = function () {
                  setTimeout(
                    function () {
                      return Y($('timeout'));
                    },
                    Math.min(D, z + P - Date.now()),
                  );
                },
                Ie = function () {
                  try {
                    var Ve = u.startRendering();
                    switch ((l(Ve) && v(Ve), u.state)) {
                      case 'running':
                        (z = Date.now()), J && me();
                        break;
                      case 'suspended':
                        document.hidden || Q++, J && Q >= b ? Y($('suspended')) : setTimeout(Ie, I);
                        break;
                    }
                  } catch (ze) {
                    Y(ze);
                  }
                };
              Ie(),
                (N = function () {
                  J || ((J = !0), z > 0 && me());
                });
            });
          return [V, N];
        }
        function W(u) {
          for (var b = 0, I = 0; I < u.length; ++I) b += Math.abs(u[I]);
          return b;
        }
        function $(u) {
          var b = new Error(u);
          return (b.name = u), b;
        }
        function j(u, b, I) {
          var D, P, N;
          return (
            I === void 0 && (I = 50),
            n(this, void 0, void 0, function () {
              var V, X;
              return r(this, function (Y) {
                switch (Y.label) {
                  case 0:
                    (V = document), (Y.label = 1);
                  case 1:
                    return V.body ? [3, 3] : [4, i(I)];
                  case 2:
                    return Y.sent(), [3, 1];
                  case 3:
                    (X = V.createElement('iframe')), (Y.label = 4);
                  case 4:
                    return (
                      Y.trys.push([4, , 10, 11]),
                      [
                        4,
                        new Promise(function (J, Q) {
                          var z = !1,
                            me = function () {
                              (z = !0), J();
                            },
                            Ie = function (je) {
                              (z = !0), Q(je);
                            };
                          (X.onload = me), (X.onerror = Ie);
                          var Ve = X.style;
                          Ve.setProperty('display', 'block', 'important'),
                            (Ve.position = 'absolute'),
                            (Ve.top = '0'),
                            (Ve.left = '0'),
                            (Ve.visibility = 'hidden'),
                            b && 'srcdoc' in X ? (X.srcdoc = b) : (X.src = 'about:blank'),
                            V.body.appendChild(X);
                          var ze = function () {
                            var je, ke;
                            z ||
                              (((ke =
                                (je = X.contentWindow) === null || je === void 0
                                  ? void 0
                                  : je.document) === null || ke === void 0
                                ? void 0
                                : ke.readyState) === 'complete'
                                ? me()
                                : setTimeout(ze, 10));
                          };
                          ze();
                        }),
                      ]
                    );
                  case 5:
                    Y.sent(), (Y.label = 6);
                  case 6:
                    return !(
                      (P = (D = X.contentWindow) === null || D === void 0 ? void 0 : D.document) ===
                        null || P === void 0
                    ) && P.body
                      ? [3, 8]
                      : [4, i(I)];
                  case 7:
                    return Y.sent(), [3, 6];
                  case 8:
                    return [4, u(X, X.contentWindow)];
                  case 9:
                    return [2, Y.sent()];
                  case 10:
                    return (N = X.parentNode) === null || N === void 0 || N.removeChild(X), [7];
                  case 11:
                    return [2];
                }
              });
            })
          );
        }
        function ie(u) {
          for (
            var b = S(u),
              I = b[0],
              D = b[1],
              P = document.createElement(I != null ? I : 'div'),
              N = 0,
              V = Object.keys(D);
            N < V.length;
            N++
          ) {
            var X = V[N],
              Y = D[X].join(' ');
            X === 'style' ? ae(P.style, Y) : P.setAttribute(X, Y);
          }
          return P;
        }
        function ae(u, b) {
          for (var I = 0, D = b.split(';'); I < D.length; I++) {
            var P = D[I],
              N = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(P);
            if (N) {
              var V = N[1],
                X = N[2],
                Y = N[4];
              u.setProperty(V, X, Y || '');
            }
          }
        }
        function ve() {
          for (var u = window; ; ) {
            var b = u.parent;
            if (!b || b === u) return !1;
            try {
              if (b.location.origin !== u.location.origin) return !0;
            } catch (I) {
              if (I instanceof Error && I.name === 'SecurityError') return !0;
              throw I;
            }
            u = b;
          }
        }
        var Se = 'mmMwWLliI0O&1',
          d = '48px',
          F = ['monospace', 'sans-serif', 'serif'],
          G = [
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
        function A() {
          var u = this;
          return j(function (b, I) {
            var D = I.document;
            return n(u, void 0, void 0, function () {
              var P, N, V, X, Y, J, Q, z, me, Ie, Ve, ze;
              return r(this, function (je) {
                for (
                  P = D.body,
                    P.style.fontSize = d,
                    N = D.createElement('div'),
                    N.style.setProperty('visibility', 'hidden', 'important'),
                    V = {},
                    X = {},
                    Y = function (ke) {
                      var Ye = D.createElement('span'),
                        qe = Ye.style;
                      return (
                        (qe.position = 'absolute'),
                        (qe.top = '0'),
                        (qe.left = '0'),
                        (qe.fontFamily = ke),
                        (Ye.textContent = Se),
                        N.appendChild(Ye),
                        Ye
                      );
                    },
                    J = function (ke, Ye) {
                      return Y("'".concat(ke, "',").concat(Ye));
                    },
                    Q = function () {
                      return F.map(Y);
                    },
                    z = function () {
                      for (
                        var ke = {},
                          Ye = function (bt) {
                            ke[bt] = F.map(function (Rt) {
                              return J(bt, Rt);
                            });
                          },
                          qe = 0,
                          gt = G;
                        qe < gt.length;
                        qe++
                      ) {
                        var At = gt[qe];
                        Ye(At);
                      }
                      return ke;
                    },
                    me = function (ke) {
                      return F.some(function (Ye, qe) {
                        return ke[qe].offsetWidth !== V[Ye] || ke[qe].offsetHeight !== X[Ye];
                      });
                    },
                    Ie = Q(),
                    Ve = z(),
                    P.appendChild(N),
                    ze = 0;
                  ze < F.length;
                  ze++
                )
                  (V[F[ze]] = Ie[ze].offsetWidth), (X[F[ze]] = Ie[ze].offsetHeight);
                return [
                  2,
                  G.filter(function (ke) {
                    return me(Ve[ke]);
                  }),
                ];
              });
            });
          });
        }
        function re() {
          var u = navigator.plugins;
          if (u) {
            for (var b = [], I = 0; I < u.length; ++I) {
              var D = u[I];
              if (D) {
                for (var P = [], N = 0; N < D.length; ++N) {
                  var V = D[N];
                  P.push({ type: V.type, suffixes: V.suffixes });
                }
                b.push({ name: D.name, description: D.description, mimeTypes: P });
              }
            }
            return b;
          }
        }
        function de() {
          return ce(ot());
        }
        function ce(u) {
          var b,
            I = !1,
            D,
            P,
            N = fe(),
            V = N[0],
            X = N[1];
          return (
            We(V, X)
              ? ((I = ye(X)), u ? (D = P = 'skipped') : ((b = at(V, X)), (D = b[0]), (P = b[1])))
              : (D = P = 'unsupported'),
            { winding: I, geometry: D, text: P }
          );
        }
        function fe() {
          var u = document.createElement('canvas');
          return (u.width = 1), (u.height = 1), [u, u.getContext('2d')];
        }
        function We(u, b) {
          return !!(b && u.toDataURL);
        }
        function ye(u) {
          return u.rect(0, 0, 10, 10), u.rect(2, 2, 6, 6), !u.isPointInPath(5, 5, 'evenodd');
        }
        function at(u, b) {
          mt(u, b);
          var I = st(u),
            D = st(u);
          if (I !== D) return ['unstable', 'unstable'];
          xt(u, b);
          var P = st(u);
          return [P, I];
        }
        function mt(u, b) {
          (u.width = 240),
            (u.height = 60),
            (b.textBaseline = 'alphabetic'),
            (b.fillStyle = '#f60'),
            b.fillRect(100, 1, 62, 20),
            (b.fillStyle = '#069'),
            (b.font = '11pt "Times New Roman"');
          var I = 'Cwm fjordbank gly '.concat('\u{1F603}');
          b.fillText(I, 2, 15),
            (b.fillStyle = 'rgba(102, 204, 0, 0.2)'),
            (b.font = '18pt Arial'),
            b.fillText(I, 4, 45);
        }
        function xt(u, b) {
          (u.width = 122), (u.height = 110), (b.globalCompositeOperation = 'multiply');
          for (
            var I = 0,
              D = [
                ['#f2f', 40, 40],
                ['#2ff', 80, 40],
                ['#ff2', 60, 80],
              ];
            I < D.length;
            I++
          ) {
            var P = D[I],
              N = P[0],
              V = P[1],
              X = P[2];
            (b.fillStyle = N),
              b.beginPath(),
              b.arc(V, X, 40, 0, Math.PI * 2, !0),
              b.closePath(),
              b.fill();
          }
          (b.fillStyle = '#f9c'),
            b.arc(60, 60, 60, 0, Math.PI * 2, !0),
            b.arc(60, 60, 20, 0, Math.PI * 2, !0),
            b.fill('evenodd');
        }
        function st(u) {
          return u.toDataURL();
        }
        function ot() {
          return Re() && Ke() && Oe();
        }
        function Ut() {
          var u = navigator,
            b = 0,
            I;
          u.maxTouchPoints !== void 0
            ? (b = g(u.maxTouchPoints))
            : u.msMaxTouchPoints !== void 0 && (b = u.msMaxTouchPoints);
          try {
            document.createEvent('TouchEvent'), (I = !0);
          } catch {
            I = !1;
          }
          var D = 'ontouchstart' in window;
          return { maxTouchPoints: b, touchEvent: I, touchStart: D };
        }
        function ct() {
          return navigator.oscpu;
        }
        function kt() {
          var u = navigator,
            b = [],
            I = u.language || u.userLanguage || u.browserLanguage || u.systemLanguage;
          if ((I !== void 0 && b.push([I]), Array.isArray(u.languages)))
            (Fe() && $e()) || b.push(u.languages);
          else if (typeof u.languages == 'string') {
            var D = u.languages;
            D && b.push(D.split(','));
          }
          return b;
        }
        function lt() {
          return window.screen.colorDepth;
        }
        function vt() {
          return f(E(navigator.deviceMemory), void 0);
        }
        function wt() {
          if (!(Re() && Ke() && Oe())) return _t();
        }
        function _t() {
          var u = screen,
            b = function (D) {
              return f(g(D), null);
            },
            I = [b(u.width), b(u.height)];
          return I.sort().reverse(), I;
        }
        var Nt = 2500,
          ht = 10,
          yt,
          Tt;
        function Pt() {
          if (Tt === void 0) {
            var u = function () {
              var b = Lt();
              Ct(b) ? (Tt = setTimeout(u, Nt)) : ((yt = b), (Tt = void 0));
            };
            u();
          }
        }
        function Et() {
          var u = this;
          return (
            Pt(),
            function () {
              return n(u, void 0, void 0, function () {
                var b;
                return r(this, function (I) {
                  switch (I.label) {
                    case 0:
                      return (
                        (b = Lt()),
                        Ct(b) ? (yt ? [2, a([], yt, !0)] : _e() ? [4, Ge()] : [3, 2]) : [3, 2]
                      );
                    case 1:
                      I.sent(), (b = Lt()), (I.label = 2);
                    case 2:
                      return Ct(b) || (yt = b), [2, b];
                  }
                });
              });
            }
          );
        }
        function Vt() {
          var u = this;
          if (Re() && Ke() && Oe())
            return function () {
              return Promise.resolve(void 0);
            };
          var b = Et();
          return function () {
            return n(u, void 0, void 0, function () {
              var I, D;
              return r(this, function (P) {
                switch (P.label) {
                  case 0:
                    return [4, b()];
                  case 1:
                    return (
                      (I = P.sent()),
                      (D = function (N) {
                        return N === null ? null : w(N, ht);
                      }),
                      [2, [D(I[0]), D(I[1]), D(I[2]), D(I[3])]]
                    );
                }
              });
            });
          };
        }
        function Lt() {
          var u = screen;
          return [
            f(E(u.availTop), null),
            f(E(u.width) - E(u.availWidth) - f(E(u.availLeft), 0), null),
            f(E(u.height) - E(u.availHeight) - f(E(u.availTop), 0), null),
            f(E(u.availLeft), null),
          ];
        }
        function Ct(u) {
          for (var b = 0; b < 4; ++b) if (u[b]) return !1;
          return !0;
        }
        function dt() {
          return f(g(navigator.hardwareConcurrency), void 0);
        }
        function te() {
          var u,
            b = (u = window.Intl) === null || u === void 0 ? void 0 : u.DateTimeFormat;
          if (b) {
            var I = new b().resolvedOptions().timeZone;
            if (I) return I;
          }
          var D = -ue();
          return 'UTC'.concat(D >= 0 ? '+' : '').concat(D);
        }
        function ue() {
          var u = new Date().getFullYear();
          return Math.max(
            E(new Date(u, 0, 1).getTimezoneOffset()),
            E(new Date(u, 6, 1).getTimezoneOffset()),
          );
        }
        function he() {
          try {
            return !!window.sessionStorage;
          } catch {
            return !0;
          }
        }
        function Ae() {
          try {
            return !!window.localStorage;
          } catch {
            return !0;
          }
        }
        function pe() {
          if (!(De() || Te()))
            try {
              return !!window.indexedDB;
            } catch {
              return !0;
            }
        }
        function Ue() {
          return !!window.openDatabase;
        }
        function xe() {
          return navigator.cpuClass;
        }
        function Ce() {
          var u = navigator.platform;
          return u === 'MacIntel' && Re() && !Le() ? (it() ? 'iPad' : 'iPhone') : u;
        }
        function Ee() {
          return navigator.vendor || '';
        }
        function Be() {
          for (
            var u = [],
              b = 0,
              I = [
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
            b < I.length;
            b++
          ) {
            var D = I[b],
              P = window[D];
            P && typeof P == 'object' && u.push(D);
          }
          return u.sort();
        }
        function ut() {
          var u = document;
          try {
            u.cookie = 'cookietest=1; SameSite=Strict;';
            var b = u.cookie.indexOf('cookietest=') !== -1;
            return (
              (u.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'), b
            );
          } catch {
            return !1;
          }
        }
        function ft() {
          var u = atob;
          return {
            abpIndo: [
              '#Iklan-Melayang',
              '#Kolom-Iklan-728',
              '#SidebarIklan-wrapper',
              '[title="ALIENBOLA" i]',
              u('I0JveC1CYW5uZXItYWRz'),
            ],
            abpvn: [
              '.quangcao',
              '#mobileCatfish',
              u('LmNsb3NlLWFkcw=='),
              '[id^="bn_bottom_fixed_"]',
              '#pmadv',
            ],
            adBlockFinland: [
              '.mainostila',
              u('LnNwb25zb3JpdA=='),
              '.ylamainos',
              u('YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd'),
              u('YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd'),
            ],
            adBlockPersian: [
              '#navbar_notice_50',
              '.kadr',
              'TABLE[width="140px"]',
              '#divAgahi',
              u('YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd'),
            ],
            adBlockWarningRemoval: [
              '#adblock-honeypot',
              '.adblocker-root',
              '.wp_adblock_detect',
              u('LmhlYWRlci1ibG9ja2VkLWFk'),
              u('I2FkX2Jsb2NrZXI='),
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
              u('I2FkXzMwMFgyNTA='),
              u('I2Jhbm5lcmZsb2F0MjI='),
              u('I2NhbXBhaWduLWJhbm5lcg=='),
              u('I0FkLUNvbnRlbnQ='),
            ],
            adGuardChinese: [
              u('LlppX2FkX2FfSA=='),
              u('YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd'),
              '#widget-quan',
              u('YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd'),
              u('YVtocmVmKj0iLjE5NTZobC5jb20vIl0='),
            ],
            adGuardFrench: [
              '#pavePub',
              u('LmFkLWRlc2t0b3AtcmVjdGFuZ2xl'),
              '.mobile_adhesion',
              '.widgetadv',
              u('LmFkc19iYW4='),
            ],
            adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
            adGuardJapanese: [
              '#kauli_yad_1',
              u('YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0='),
              u('Ll9wb3BJbl9pbmZpbml0ZV9hZA=='),
              u('LmFkZ29vZ2xl'),
              u('Ll9faXNib29zdFJldHVybkFk'),
            ],
            adGuardMobile: [
              u('YW1wLWF1dG8tYWRz'),
              u('LmFtcF9hZA=='),
              'amp-embed[type="24smi"]',
              '#mgid_iframe1',
              u('I2FkX2ludmlld19hcmVh'),
            ],
            adGuardRussian: [
              u('YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0='),
              u('LnJlY2xhbWE='),
              'div[id^="smi2adblock"]',
              u('ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd'),
              '#psyduckpockeball',
            ],
            adGuardSocial: [
              u('YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0='),
              u('YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0='),
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
              u('YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=='),
              u('YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0='),
              u('YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=='),
              '#top100counter',
            ],
            adGuardTurkish: [
              '#backkapat',
              u('I3Jla2xhbWk='),
              u('YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0='),
              u('YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd'),
              u('YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ=='),
            ],
            bulgarian: [
              u('dGQjZnJlZW5ldF90YWJsZV9hZHM='),
              '#ea_intext_div',
              '.lapni-pop-over',
              '#xenium_hot_offers',
            ],
            easyList: [
              '.yb-floorad',
              u('LndpZGdldF9wb19hZHNfd2lkZ2V0'),
              u('LnRyYWZmaWNqdW5reS1hZA=='),
              '.textad_headline',
              u('LnNwb25zb3JlZC10ZXh0LWxpbmtz'),
            ],
            easyListChina: [
              u('LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=='),
              u('LmZyb250cGFnZUFkdk0='),
              '#taotaole',
              '#aafoot.top_box',
              '.cfa_popup',
            ],
            easyListCookie: [
              '.ezmob-footer',
              '.cc-CookieWarning',
              '[data-cookie-number]',
              u('LmF3LWNvb2tpZS1iYW5uZXI='),
              '.sygnal24-gdpr-modal-wrap',
            ],
            easyListCzechSlovak: [
              '#onlajny-stickers',
              u('I3Jla2xhbW5pLWJveA=='),
              u('LnJla2xhbWEtbWVnYWJvYXJk'),
              '.sklik',
              u('W2lkXj0ic2tsaWtSZWtsYW1hIl0='),
            ],
            easyListDutch: [
              u('I2FkdmVydGVudGll'),
              u('I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=='),
              '.adstekst',
              u('YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0='),
              '#semilo-lrectangle',
            ],
            easyListGermany: [
              '#SSpotIMPopSlider',
              u('LnNwb25zb3JsaW5rZ3J1ZW4='),
              u('I3dlcmJ1bmdza3k='),
              u('I3Jla2xhbWUtcmVjaHRzLW1pdHRl'),
              u('YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0='),
            ],
            easyListItaly: [
              u('LmJveF9hZHZfYW5udW5jaQ=='),
              '.sb-box-pubbliredazionale',
              u('YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd'),
              u('YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd'),
              u('YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ=='),
            ],
            easyListLithuania: [
              u('LnJla2xhbW9zX3RhcnBhcw=='),
              u('LnJla2xhbW9zX251b3JvZG9z'),
              u('aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd'),
              u('aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd'),
              u('aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd'),
            ],
            estonian: [u('QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==')],
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
              u('YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=='),
              u('YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=='),
              'article.category-samarbete',
              u('ZGl2LmhvbGlkQWRz'),
              'ul.adsmodern',
            ],
            greekAdBlock: [
              u('QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd'),
              u('QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=='),
              u('QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd'),
              'DIV.agores300',
              'TABLE.advright',
            ],
            hungarian: [
              '#cemp_doboz',
              '.optimonk-iframe-container',
              u('LmFkX19tYWlu'),
              u('W2NsYXNzKj0iR29vZ2xlQWRzIl0='),
              '#hirdetesek_box',
            ],
            iDontCareAboutCookies: [
              '.alert-info[data-block-track*="CookieNotice"]',
              '.ModuleTemplateCookieIndicator',
              '.o--cookies--container',
              '#cookies-policy-sticky',
              '#stickyCookieBar',
            ],
            icelandicAbp: [u('QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==')],
            latvian: [
              u(
                'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0=',
              ),
              u(
                'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==',
              ),
            ],
            listKr: [
              u('YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0='),
              u('I2xpdmVyZUFkV3JhcHBlcg=='),
              u('YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=='),
              u('aW5zLmZhc3R2aWV3LWFk'),
              '.revenue_unit_item.dable',
            ],
            listeAr: [
              u('LmdlbWluaUxCMUFk'),
              '.right-and-left-sponsers',
              u('YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=='),
              u('YVtocmVmKj0iYm9vcmFxLm9yZyJd'),
              u('YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd'),
            ],
            listeFr: [
              u('YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=='),
              u('I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=='),
              u('YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0='),
              '.site-pub-interstitiel',
              'div[id^="crt-"][data-criteo-id]',
            ],
            officialPolish: [
              '#ceneo-placeholder-ceneo-12',
              u('W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd'),
              u('YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=='),
              u('YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=='),
              u('ZGl2I3NrYXBpZWNfYWQ='),
            ],
            ro: [
              u('YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd'),
              u('YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd'),
              u('YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0='),
              u('YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd'),
              'a[href^="/url/"]',
            ],
            ruAd: [
              u('YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd'),
              u('YVtocmVmKj0iLy91dGltZy5ydS8iXQ=='),
              u('YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0='),
              '#pgeldiz',
              '.yandex-rtb-block',
            ],
            thaiAds: [
              'a[href*=macau-uta-popup]',
              u('I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=='),
              u('LmFkczMwMHM='),
              '.bumq',
              '.img-kosana',
            ],
            webAnnoyancesUltralist: [
              '#mod-social-share-2',
              '#social-tools',
              u('LmN0cGwtZnVsbGJhbm5lcg=='),
              '.zergnet-recommend',
              '.yt.btn-link.btn-md.btn',
            ],
          };
        }
        function St(u) {
          var b = u === void 0 ? {} : u,
            I = b.debug;
          return n(this, void 0, void 0, function () {
            var D, P, N, V, X, Y;
            return r(this, function (J) {
              switch (J.label) {
                case 0:
                  return Dt()
                    ? ((D = ft()),
                      (P = Object.keys(D)),
                      (N = (Y = []).concat.apply(
                        Y,
                        P.map(function (Q) {
                          return D[Q];
                        }),
                      )),
                      [4, Bt(N)])
                    : [2, void 0];
                case 1:
                  return (
                    (V = J.sent()),
                    I && Ft(D, V),
                    (X = P.filter(function (Q) {
                      var z = D[Q],
                        me = m(
                          z.map(function (Ie) {
                            return V[Ie];
                          }),
                        );
                      return me > z.length * 0.6;
                    })),
                    X.sort(),
                    [2, X]
                  );
              }
            });
          });
        }
        function Dt() {
          return Re() || Pe();
        }
        function Bt(u) {
          var b;
          return n(this, void 0, void 0, function () {
            var I, D, P, N, Y, V, X, Y;
            return r(this, function (J) {
              switch (J.label) {
                case 0:
                  for (
                    I = document,
                      D = I.createElement('div'),
                      P = new Array(u.length),
                      N = {},
                      Ot(D),
                      Y = 0;
                    Y < u.length;
                    ++Y
                  )
                    (V = ie(u[Y])),
                      V.tagName === 'DIALOG' && V.show(),
                      (X = I.createElement('div')),
                      Ot(X),
                      X.appendChild(V),
                      D.appendChild(X),
                      (P[Y] = V);
                  J.label = 1;
                case 1:
                  return I.body ? [3, 3] : [4, i(50)];
                case 2:
                  return J.sent(), [3, 1];
                case 3:
                  I.body.appendChild(D);
                  try {
                    for (Y = 0; Y < u.length; ++Y) P[Y].offsetParent || (N[u[Y]] = !0);
                  } finally {
                    (b = D.parentNode) === null || b === void 0 || b.removeChild(D);
                  }
                  return [2, N];
              }
            });
          });
        }
        function Ot(u) {
          u.style.setProperty('visibility', 'hidden', 'important'),
            u.style.setProperty('display', 'block', 'important');
        }
        function Ft(u, b) {
          for (var I = 'DOM blockers debug:\n```', D = 0, P = Object.keys(u); D < P.length; D++) {
            var N = P[D];
            I += `
`.concat(N, ':');
            for (var V = 0, X = u[N]; V < X.length; V++) {
              var Y = X[V];
              I += `
  `
                .concat(b[Y] ? '\u{1F6AB}' : '\u27A1\uFE0F', ' ')
                .concat(Y);
            }
          }
          console.log(''.concat(I, '\n```'));
        }
        function Gt() {
          for (var u = 0, b = ['rec2020', 'p3', 'srgb']; u < b.length; u++) {
            var I = b[u];
            if (matchMedia('(color-gamut: '.concat(I, ')')).matches) return I;
          }
        }
        function It() {
          if (Ht('inverted')) return !0;
          if (Ht('none')) return !1;
        }
        function Ht(u) {
          return matchMedia('(inverted-colors: '.concat(u, ')')).matches;
        }
        function hn() {
          if (jt('active')) return !0;
          if (jt('none')) return !1;
        }
        function jt(u) {
          return matchMedia('(forced-colors: '.concat(u, ')')).matches;
        }
        var fn = 100;
        function xn() {
          if (matchMedia('(min-monochrome: 0)').matches) {
            for (var u = 0; u <= fn; ++u)
              if (matchMedia('(max-monochrome: '.concat(u, ')')).matches) return u;
            throw new Error('Too high value');
          }
        }
        function gn() {
          if (Mt('no-preference')) return 0;
          if (Mt('high') || Mt('more')) return 1;
          if (Mt('low') || Mt('less')) return -1;
          if (Mt('forced')) return 10;
        }
        function Mt(u) {
          return matchMedia('(prefers-contrast: '.concat(u, ')')).matches;
        }
        function pn() {
          if (qt('reduce')) return !0;
          if (qt('no-preference')) return !1;
        }
        function qt(u) {
          return matchMedia('(prefers-reduced-motion: '.concat(u, ')')).matches;
        }
        function mn() {
          if (Jt('reduce')) return !0;
          if (Jt('no-preference')) return !1;
        }
        function Jt(u) {
          return matchMedia('(prefers-reduced-transparency: '.concat(u, ')')).matches;
        }
        function vn() {
          if (Zt('high')) return !0;
          if (Zt('standard')) return !1;
        }
        function Zt(u) {
          return matchMedia('(dynamic-range: '.concat(u, ')')).matches;
        }
        var Me = Math,
          Ze = function () {
            return 0;
          };
        function _n() {
          var u = Me.acos || Ze,
            b = Me.acosh || Ze,
            I = Me.asin || Ze,
            D = Me.asinh || Ze,
            P = Me.atanh || Ze,
            N = Me.atan || Ze,
            V = Me.sin || Ze,
            X = Me.sinh || Ze,
            Y = Me.cos || Ze,
            J = Me.cosh || Ze,
            Q = Me.tan || Ze,
            z = Me.tanh || Ze,
            me = Me.exp || Ze,
            Ie = Me.expm1 || Ze,
            Ve = Me.log1p || Ze,
            ze = function (Ne) {
              return Me.pow(Me.PI, Ne);
            },
            je = function (Ne) {
              return Me.log(Ne + Me.sqrt(Ne * Ne - 1));
            },
            ke = function (Ne) {
              return Me.log(Ne + Me.sqrt(Ne * Ne + 1));
            },
            Ye = function (Ne) {
              return Me.log((1 + Ne) / (1 - Ne)) / 2;
            },
            qe = function (Ne) {
              return Me.exp(Ne) - 1 / Me.exp(Ne) / 2;
            },
            gt = function (Ne) {
              return (Me.exp(Ne) + 1 / Me.exp(Ne)) / 2;
            },
            At = function (Ne) {
              return Me.exp(Ne) - 1;
            },
            bt = function (Ne) {
              return (Me.exp(2 * Ne) - 1) / (Me.exp(2 * Ne) + 1);
            },
            Rt = function (Ne) {
              return Me.log(1 + Ne);
            };
          return {
            acos: u(0.12312423423423424),
            acosh: b(1e308),
            acoshPf: je(1e154),
            asin: I(0.12312423423423424),
            asinh: D(1),
            asinhPf: ke(1),
            atanh: P(0.5),
            atanhPf: Ye(0.5),
            atan: N(0.5),
            sin: V(-1e300),
            sinh: X(1),
            sinhPf: qe(1),
            cos: Y(10.000000000123),
            cosh: J(1),
            coshPf: gt(1),
            tan: Q(-1e300),
            tanh: z(1),
            tanhPf: bt(1),
            exp: me(1),
            expm1: Ie(1),
            expm1Pf: At(1),
            log1p: Ve(10),
            log1pPf: Rt(10),
            powPI: ze(-100),
          };
        }
        var bn = 'mmMwWLliI0fiflO&1',
          Wt = {
            default: [],
            apple: [{ font: '-apple-system-body' }],
            serif: [{ fontFamily: 'serif' }],
            sans: [{ fontFamily: 'sans-serif' }],
            mono: [{ fontFamily: 'monospace' }],
            min: [{ fontSize: '1px' }],
            system: [{ fontFamily: 'system-ui' }],
          };
        function wn() {
          return yn(function (u, b) {
            for (var I = {}, D = {}, P = 0, N = Object.keys(Wt); P < N.length; P++) {
              var V = N[P],
                X = Wt[V],
                Y = X[0],
                J = Y === void 0 ? {} : Y,
                Q = X[1],
                z = Q === void 0 ? bn : Q,
                me = u.createElement('span');
              (me.textContent = z), (me.style.whiteSpace = 'nowrap');
              for (var Ie = 0, Ve = Object.keys(J); Ie < Ve.length; Ie++) {
                var ze = Ve[Ie],
                  je = J[ze];
                je !== void 0 && (me.style[ze] = je);
              }
              (I[V] = me), b.append(u.createElement('br'), me);
            }
            for (var ke = 0, Ye = Object.keys(Wt); ke < Ye.length; ke++) {
              var V = Ye[ke];
              D[V] = I[V].getBoundingClientRect().width;
            }
            return D;
          });
        }
        function yn(u, b) {
          return (
            b === void 0 && (b = 4e3),
            j(function (I, D) {
              var P = D.document,
                N = P.body,
                V = N.style;
              (V.width = ''.concat(b, 'px')),
                (V.webkitTextSizeAdjust = V.textSizeAdjust = 'none'),
                Fe()
                  ? (N.style.zoom = ''.concat(1 / D.devicePixelRatio))
                  : Re() && (N.style.zoom = 'reset');
              var X = P.createElement('div');
              return (
                (X.textContent = a([], Array((b / 20) << 0), !0)
                  .map(function () {
                    return 'word';
                  })
                  .join(' ')),
                N.appendChild(X),
                u(P, N)
              );
            }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
          );
        }
        function En() {
          return navigator.pdfViewerEnabled;
        }
        function Sn() {
          var u = new Float32Array(1),
            b = new Uint8Array(u.buffer);
          return (u[0] = 1 / 0), (u[0] = u[0] - u[0]), b[3];
        }
        function In() {
          var u = window.ApplePaySession;
          if (typeof (u == null ? void 0 : u.canMakePayments) != 'function') return -1;
          if (An()) return -3;
          try {
            return u.canMakePayments() ? 1 : 0;
          } catch (b) {
            return Tn(b);
          }
        }
        var An = ve;
        function Tn(u) {
          if (
            u instanceof Error &&
            u.name === 'InvalidAccessError' &&
            /\bfrom\b.*\binsecure\b/i.test(u.message)
          )
            return -2;
          throw u;
        }
        function Ln() {
          var u,
            b = document.createElement('a'),
            I = (u = b.attributionSourceId) !== null && u !== void 0 ? u : b.attributionsourceid;
          return I === void 0 ? void 0 : String(I);
        }
        var $t = -1,
          Qt = -2,
          Cn = new Set([
            10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961, 2962, 2963,
            2964, 2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089, 3106, 3107, 32773, 32777,
            32777, 32823, 32824, 32936, 32937, 32938, 32939, 32968, 32969, 32970, 32971, 3317,
            33170, 3333, 3379, 3386, 33901, 33902, 34016, 34024, 34076, 3408, 3410, 3411, 3412,
            3413, 3414, 3415, 34467, 34816, 34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661,
            35724, 35738, 35739, 36003, 36004, 36005, 36347, 36348, 36349, 37440, 37441, 37443,
            7936, 7937, 7938,
          ]),
          Dn = new Set([34047, 35723, 36063, 34852, 34853, 34854, 34229, 36392, 36795, 38449]),
          On = ['FRAGMENT_SHADER', 'VERTEX_SHADER'],
          Mn = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'],
          en = 'WEBGL_debug_renderer_info',
          Rn = 'WEBGL_polygon_mode';
        function Un(u) {
          var b,
            I,
            D,
            P,
            N,
            V,
            X = u.cache,
            Y = Kt(X);
          if (!Y) return $t;
          if (!rn(Y)) return Qt;
          var J = nn() ? null : Y.getExtension(en);
          return {
            version:
              ((b = Y.getParameter(Y.VERSION)) === null || b === void 0 ? void 0 : b.toString()) ||
              '',
            vendor:
              ((I = Y.getParameter(Y.VENDOR)) === null || I === void 0 ? void 0 : I.toString()) ||
              '',
            vendorUnmasked: J
              ? (D = Y.getParameter(J.UNMASKED_VENDOR_WEBGL)) === null || D === void 0
                ? void 0
                : D.toString()
              : '',
            renderer:
              ((P = Y.getParameter(Y.RENDERER)) === null || P === void 0 ? void 0 : P.toString()) ||
              '',
            rendererUnmasked: J
              ? (N = Y.getParameter(J.UNMASKED_RENDERER_WEBGL)) === null || N === void 0
                ? void 0
                : N.toString()
              : '',
            shadingLanguageVersion:
              ((V = Y.getParameter(Y.SHADING_LANGUAGE_VERSION)) === null || V === void 0
                ? void 0
                : V.toString()) || '',
          };
        }
        function kn(u) {
          var b = u.cache,
            I = Kt(b);
          if (!I) return $t;
          if (!rn(I)) return Qt;
          var D = I.getSupportedExtensions(),
            P = I.getContextAttributes(),
            N = [],
            V = [],
            X = [],
            Y = [],
            J = [];
          if (P)
            for (var Q = 0, z = Object.keys(P); Q < z.length; Q++) {
              var me = z[Q];
              V.push(''.concat(me, '=').concat(P[me]));
            }
          for (var Ie = tn(I), Ve = 0, ze = Ie; Ve < ze.length; Ve++) {
            var je = ze[Ve],
              ke = I[je];
            X.push(
              ''
                .concat(je, '=')
                .concat(ke)
                .concat(Cn.has(ke) ? '='.concat(I.getParameter(ke)) : ''),
            );
          }
          if (D)
            for (var Ye = 0, qe = D; Ye < qe.length; Ye++) {
              var gt = qe[Ye];
              if (!((gt === en && nn()) || (gt === Rn && Pn()))) {
                var At = I.getExtension(gt);
                if (!At) {
                  N.push(gt);
                  continue;
                }
                for (var bt = 0, Rt = tn(At); bt < Rt.length; bt++) {
                  var je = Rt[bt],
                    ke = At[je];
                  Y.push(
                    ''
                      .concat(je, '=')
                      .concat(ke)
                      .concat(Dn.has(ke) ? '='.concat(I.getParameter(ke)) : ''),
                  );
                }
              }
            }
          for (var Ne = 0, cn = On; Ne < cn.length; Ne++)
            for (var ln = cn[Ne], Xt = 0, dn = Mn; Xt < dn.length; Xt++) {
              var un = dn[Xt],
                $n = Nn(I, ln, un);
              J.push(''.concat(ln, '.').concat(un, '=').concat($n.join(',')));
            }
          return (
            Y.sort(),
            X.sort(),
            {
              contextAttributes: V,
              parameters: X,
              shaderPrecisions: J,
              extensions: D,
              extensionParameters: Y,
              unsupportedExtensions: N,
            }
          );
        }
        function Kt(u) {
          if (u.webgl) return u.webgl.context;
          var b = document.createElement('canvas'),
            I;
          b.addEventListener('webglCreateContextError', function () {
            return (I = void 0);
          });
          for (var D = 0, P = ['webgl', 'experimental-webgl']; D < P.length; D++) {
            var N = P[D];
            try {
              I = b.getContext(N);
            } catch {}
            if (I) break;
          }
          return (u.webgl = { context: I }), I;
        }
        function Nn(u, b, I) {
          var D = u.getShaderPrecisionFormat(u[b], u[I]);
          return D ? [D.rangeMin, D.rangeMax, D.precision] : [];
        }
        function tn(u) {
          var b = Object.keys(u.__proto__);
          return b.filter(Fn);
        }
        function Fn(u) {
          return typeof u == 'string' && !u.match(/[^A-Z0-9_x]/);
        }
        function nn() {
          return Xe();
        }
        function Pn() {
          return Fe() || Re();
        }
        function rn(u) {
          return typeof u.getParameter == 'function';
        }
        function Bn() {
          var u,
            b = Pe() || Re();
          return b
            ? window.AudioContext && (u = new AudioContext().baseLatency) !== null && u !== void 0
              ? u
              : -1
            : -2;
        }
        function Hn() {
          if (!window.Intl) return -1;
          var u = window.Intl.DateTimeFormat;
          if (!u) return -2;
          var b = u().resolvedOptions().locale;
          return !b && b !== '' ? -3 : b;
        }
        var an = {
          fonts: A,
          domBlockers: St,
          fontPreferences: wn,
          audio: tt,
          screenFrame: Vt,
          canvas: de,
          osCpu: ct,
          languages: kt,
          colorDepth: lt,
          deviceMemory: vt,
          screenResolution: wt,
          hardwareConcurrency: dt,
          timezone: te,
          sessionStorage: he,
          localStorage: Ae,
          indexedDB: pe,
          openDatabase: Ue,
          cpuClass: xe,
          platform: Ce,
          plugins: re,
          touchSupport: Ut,
          vendor: Ee,
          vendorFlavors: Be,
          cookiesEnabled: ut,
          colorGamut: Gt,
          invertedColors: It,
          forcedColors: hn,
          monochrome: xn,
          contrast: gn,
          reducedMotion: pn,
          reducedTransparency: mn,
          hdr: vn,
          math: _n,
          pdfViewerEnabled: En,
          architecture: Sn,
          applePay: In,
          privateClickMeasurement: Ln,
          audioBaseLatency: Bn,
          dateTimeLocale: Hn,
          webGlBasics: Un,
          webGlExtensions: kn,
        };
        function Vn(u) {
          return oe(an, u, []);
        }
        var Gn = '$ if upgrade to Pro: https://fpjs.dev/pro';
        function Wn(u) {
          var b = Kn(u),
            I = zn(b);
          return { score: b, comment: Gn.replace(/\$/g, ''.concat(I)) };
        }
        function Kn(u) {
          if (Pe()) return 0.4;
          if (Re()) return Le() && !(Ke() && Oe()) ? 0.5 : 0.3;
          var b = 'value' in u.platform ? u.platform.value : '';
          return /^Win/.test(b) ? 0.6 : /^Mac/.test(b) ? 0.5 : 0.7;
        }
        function zn(u) {
          return w(0.99 + 0.01 * u, 1e-4);
        }
        function Yn(u) {
          for (var b = '', I = 0, D = Object.keys(u).sort(); I < D.length; I++) {
            var P = D[I],
              N = u[P],
              V = 'error' in N ? 'error' : JSON.stringify(N.value);
            b += ''
              .concat(b ? '|' : '')
              .concat(P.replace(/([:|\\])/g, '\\$1'), ':')
              .concat(V);
          }
          return b;
        }
        function zt(u) {
          return JSON.stringify(
            u,
            function (b, I) {
              return I instanceof Error ? He(I) : I;
            },
            2,
          );
        }
        function Yt(u) {
          return we(Yn(u));
        }
        function Xn(u) {
          var b,
            I = Wn(u);
          return {
            get visitorId() {
              return b === void 0 && (b = Yt(this.components)), b;
            },
            set visitorId(D) {
              b = D;
            },
            confidence: I,
            components: u,
            version: s,
          };
        }
        function sn(u) {
          return u === void 0 && (u = 50), e(u, u * 2);
        }
        function jn(u, b) {
          var I = Date.now();
          return {
            get: function (D) {
              return n(this, void 0, void 0, function () {
                var P, N, V;
                return r(this, function (X) {
                  switch (X.label) {
                    case 0:
                      return (P = Date.now()), [4, u()];
                    case 1:
                      return (
                        (N = X.sent()),
                        (V = Xn(N)),
                        (b || (D != null && D.debug)) &&
                          console.log(
                            'Copy the text below to get the debug data:\n\n```\nversion: '
                              .concat(
                                V.version,
                                `
userAgent: `,
                              )
                              .concat(
                                navigator.userAgent,
                                `
timeBetweenLoadAndGet: `,
                              )
                              .concat(
                                P - I,
                                `
visitorId: `,
                              )
                              .concat(
                                V.visitorId,
                                `
components: `,
                              )
                              .concat(zt(N), '\n```'),
                          ),
                        [2, V]
                      );
                  }
                });
              });
            },
          };
        }
        function qn() {
          if (!(window.__fpjs_d_m || Math.random() >= 0.001))
            try {
              var u = new XMLHttpRequest();
              u.open(
                'get',
                'https://m1.openfpcdn.io/fingerprintjs/v'.concat(s, '/npm-monitoring'),
                !0,
              ),
                u.send();
            } catch (b) {
              console.error(b);
            }
        }
        function on(u) {
          var b;
          return (
            u === void 0 && (u = {}),
            n(this, void 0, void 0, function () {
              var I, D, P;
              return r(this, function (N) {
                switch (N.label) {
                  case 0:
                    return (
                      (!((b = u.monitoring) !== null && b !== void 0) || b) && qn(),
                      (I = u.delayFallback),
                      (D = u.debug),
                      [4, sn(I)]
                    );
                  case 1:
                    return N.sent(), (P = Vn({ cache: {}, debug: D })), [2, jn(P, D)];
                }
              });
            })
          );
        }
        var Jn = { load: on, hashComponents: Yt, componentsToDebugString: zt },
          Zn = we;
        return (
          (h.componentsToDebugString = zt),
          (h.default = Jn),
          (h.getFullscreenElement = _e),
          (h.getUnstableAudioFingerprint = rt),
          (h.getUnstableCanvasFingerprint = ce),
          (h.getUnstableScreenFrame = Et),
          (h.getUnstableScreenResolution = _t),
          (h.getWebGLContext = Kt),
          (h.hashComponents = Yt),
          (h.isAndroid = Pe),
          (h.isChromium = Fe),
          (h.isDesktopWebKit = Le),
          (h.isEdgeHTML = Te),
          (h.isGecko = Xe),
          (h.isSamsungInternet = et),
          (h.isTrident = De),
          (h.isWebKit = Re),
          (h.load = on),
          (h.loadSources = oe),
          (h.murmurX64Hash128 = Zn),
          (h.prepareForSources = sn),
          (h.sources = an),
          (h.transformSource = ge),
          (h.withIframe = j),
          Object.defineProperty(h, '__esModule', { value: !0 }),
          h
        );
      })({});
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (c) {
      c.BroprintJS = (function (h) {
        'use strict';
        const p = function (i, t = 0) {
            let e = 3735928559 ^ t,
              l = 1103547991 ^ t;
            for (let o = 0, x; o < i.length; o++)
              (x = i.charCodeAt(o)),
                (e = Math.imul(e ^ x, 2654435761)),
                (l = Math.imul(l ^ x, 1597334677));
            return (
              (e = Math.imul(e ^ (e >>> 16), 2246822507) ^ Math.imul(l ^ (l >>> 13), 3266489909)),
              (l = Math.imul(l ^ (l >>> 16), 2246822507) ^ Math.imul(e ^ (e >>> 13), 3266489909)),
              4294967296 * (2097151 & l) + (e >>> 0)
            );
          },
          n = () => {
            const i = document.createElement('canvas');
            return !!(i.getContext && i.getContext('2d'));
          },
          r = () => {
            if (!n()) return 'canvas not supported';
            var i = document.createElement('canvas'),
              t = i.getContext('2d'),
              e = 'BroPrint.65@345876';
            return (
              (t.textBaseline = 'top'),
              (t.font = "14px 'Arial'"),
              (t.textBaseline = 'alphabetic'),
              (t.fillStyle = '#f60'),
              t.fillRect(125, 1, 62, 20),
              (t.fillStyle = '#069'),
              t.fillText(e, 2, 15),
              (t.fillStyle = 'rgba(102, 204, 0, 0.7)'),
              t.fillText(e, 4, 17),
              i.toDataURL()
            );
          },
          a = (function () {
            let i = null,
              t = null,
              e = null,
              l = null,
              o = null,
              x = null;
            function v(S, U = !1) {
              x = S;
              try {
                y(),
                  e.connect(l),
                  l.connect(i.destination),
                  e.start(0),
                  i.startRendering(),
                  (i.oncomplete = m);
              } catch (T) {
                if (U) throw T;
              }
            }
            function y() {
              L(), (t = i.currentTime), g(), E();
            }
            function L() {
              let S = window.OfflineAudioContext || window.webkitOfflineAudioContext;
              i = new S(1, 44100, 44100);
            }
            function g() {
              (e = i.createOscillator()), (e.type = 'triangle'), e.frequency.setValueAtTime(1e4, t);
            }
            function E() {
              (l = i.createDynamicsCompressor()),
                f('threshold', -50),
                f('knee', 40),
                f('ratio', 12),
                f('reduction', -20),
                f('attack', 0),
                f('release', 0.25);
            }
            function f(S, U) {
              l[S] !== void 0 &&
                typeof l[S].setValueAtTime == 'function' &&
                l[S].setValueAtTime(U, i.currentTime);
            }
            function m(S) {
              w(S), l.disconnect();
            }
            function w(S) {
              let U = null;
              for (var T = 4500; 5e3 > T; T++) {
                var O = S.renderedBuffer.getChannelData(0)[T];
                U += Math.abs(O);
              }
              if (((o = U.toString()), typeof x == 'function')) return x(o);
            }
            return { run: v };
          })();
        function s() {
          const i = new Promise((t, e) => {
            a.run(function (l) {
              t(l);
            });
          });
          return new Promise((t, e) => {
            i.then(async (l) => {
              let o = '';
              navigator.brave && (await navigator.brave.isBrave()),
                (o = window.btoa(l) + r()),
                t(p(o, 0));
            }).catch(() => {
              try {
                t(p(r()).toString());
              } catch {
                e('Failed to generate the finger print of this browser');
              }
            });
          });
        }
        return (
          (h.getCurrentBrowserFingerPrint = s),
          Object.defineProperty(h, '__esModule', { value: !0 }),
          h
        );
      })({});
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function (c, h) {
      h(c);
    })(_POSignalsEntities || (_POSignalsEntities = {}), function (c) {
      'use strict';
      var h,
        p,
        n = function (O, C) {
          var k = typeof Symbol == 'function' && O[Symbol.iterator];
          if (!k) return O;
          var R,
            H,
            ee = k.call(O),
            M = [];
          try {
            for (; (C === void 0 || C-- > 0) && !(R = ee.next()).done; ) M.push(R.value);
          } catch (K) {
            H = { error: K };
          } finally {
            try {
              R && !R.done && (k = ee.return) && k.call(ee);
            } finally {
              if (H) throw H.error;
            }
          }
          return M;
        },
        r = function (O, C, k) {
          if (k || arguments.length === 2)
            for (var R, H = 0, ee = C.length; H < ee; H++)
              (!R && H in C) || (R || (R = Array.prototype.slice.call(C, 0, H)), (R[H] = C[H]));
          return O.concat(R || Array.prototype.slice.call(C));
        },
        a = new WeakMap(),
        s = new WeakMap(),
        i = new WeakMap(),
        t = new WeakMap(),
        e = new WeakMap(),
        l = {
          get: function (O, C, k) {
            if (O instanceof IDBTransaction) {
              if (C === 'done') return s.get(O);
              if (C === 'objectStoreNames') return O.objectStoreNames || i.get(O);
              if (C === 'store')
                return k.objectStoreNames[1] ? void 0 : k.objectStore(k.objectStoreNames[0]);
            }
            return v(O[C]);
          },
          set: function (O, C, k) {
            return (O[C] = k), !0;
          },
          has: function (O, C) {
            return (O instanceof IDBTransaction && (C === 'done' || C === 'store')) || C in O;
          },
        };
      function o(O) {
        return O !== IDBDatabase.prototype.transaction ||
          'objectStoreNames' in IDBTransaction.prototype
          ? (
              p ||
              (p = [
                IDBCursor.prototype.advance,
                IDBCursor.prototype.continue,
                IDBCursor.prototype.continuePrimaryKey,
              ])
            ).includes(O)
            ? function () {
                for (var C = [], k = 0; k < arguments.length; k++) C[k] = arguments[k];
                return O.apply(y(this), C), v(a.get(this));
              }
            : function () {
                for (var C = [], k = 0; k < arguments.length; k++) C[k] = arguments[k];
                return v(O.apply(y(this), C));
              }
          : function (C) {
              for (var k = [], R = 1; R < arguments.length; R++) k[R - 1] = arguments[R];
              var H = O.call.apply(O, r([y(this), C], n(k), !1));
              return i.set(H, C.sort ? C.sort() : [C]), v(H);
            };
      }
      function x(O) {
        return typeof O == 'function'
          ? o(O)
          : (O instanceof IDBTransaction &&
              (function (k) {
                if (!s.has(k)) {
                  var R = new Promise(function (H, ee) {
                    var M = function () {
                        k.removeEventListener('complete', K),
                          k.removeEventListener('error', Z),
                          k.removeEventListener('abort', Z);
                      },
                      K = function () {
                        H(), M();
                      },
                      Z = function () {
                        ee(k.error || new DOMException('AbortError', 'AbortError')), M();
                      };
                    k.addEventListener('complete', K),
                      k.addEventListener('error', Z),
                      k.addEventListener('abort', Z);
                  });
                  s.set(k, R);
                }
              })(O),
            (C = O),
            (h || (h = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some(
              function (k) {
                return C instanceof k;
              },
            )
              ? new Proxy(O, l)
              : O);
        var C;
      }
      function v(O) {
        if (O instanceof IDBRequest)
          return (
            (C = O),
            (k = new Promise(function (H, ee) {
              var M = function () {
                  C.removeEventListener('success', K), C.removeEventListener('error', Z);
                },
                K = function () {
                  H(v(C.result)), M();
                },
                Z = function () {
                  ee(C.error), M();
                };
              C.addEventListener('success', K), C.addEventListener('error', Z);
            }))
              .then(function (H) {
                H instanceof IDBCursor && a.set(H, C);
              })
              .catch(function () {}),
            e.set(k, C),
            k
          );
        var C, k;
        if (t.has(O)) return t.get(O);
        var R = x(O);
        return R !== O && (t.set(O, R), e.set(R, O)), R;
      }
      var y = function (O) {
          return e.get(O);
        },
        L = function () {
          return (
            (L =
              Object.assign ||
              function (O) {
                for (var C, k = 1, R = arguments.length; k < R; k++)
                  for (var H in (C = arguments[k]))
                    Object.prototype.hasOwnProperty.call(C, H) && (O[H] = C[H]);
                return O;
              }),
            L.apply(this, arguments)
          );
        },
        g = function (O, C, k, R) {
          return new (k || (k = Promise))(function (H, ee) {
            function M(le) {
              try {
                Z(R.next(le));
              } catch (q) {
                ee(q);
              }
            }
            function K(le) {
              try {
                Z(R.throw(le));
              } catch (q) {
                ee(q);
              }
            }
            function Z(le) {
              var q;
              le.done
                ? H(le.value)
                : ((q = le.value),
                  q instanceof k
                    ? q
                    : new k(function (be) {
                        be(q);
                      })).then(M, K);
            }
            Z((R = R.apply(O, C || [])).next());
          });
        },
        E = function (O, C) {
          var k,
            R,
            H,
            ee,
            M = {
              label: 0,
              sent: function () {
                if (1 & H[0]) throw H[1];
                return H[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (ee = { next: K(0), throw: K(1), return: K(2) }),
            typeof Symbol == 'function' &&
              (ee[Symbol.iterator] = function () {
                return this;
              }),
            ee
          );
          function K(Z) {
            return function (le) {
              return (function (q) {
                if (k) throw new TypeError('Generator is already executing.');
                for (; M; )
                  try {
                    if (
                      ((k = 1),
                      R &&
                        (H =
                          2 & q[0]
                            ? R.return
                            : q[0]
                              ? R.throw || ((H = R.return) && H.call(R), 0)
                              : R.next) &&
                        !(H = H.call(R, q[1])).done)
                    )
                      return H;
                    switch (((R = 0), H && (q = [2 & q[0], H.value]), q[0])) {
                      case 0:
                      case 1:
                        H = q;
                        break;
                      case 4:
                        return M.label++, { value: q[1], done: !1 };
                      case 5:
                        M.label++, (R = q[1]), (q = [0]);
                        continue;
                      case 7:
                        (q = M.ops.pop()), M.trys.pop();
                        continue;
                      default:
                        if (
                          ((H = M.trys),
                          !((H = H.length > 0 && H[H.length - 1]) || (q[0] !== 6 && q[0] !== 2)))
                        ) {
                          M = 0;
                          continue;
                        }
                        if (q[0] === 3 && (!H || (q[1] > H[0] && q[1] < H[3]))) {
                          M.label = q[1];
                          break;
                        }
                        if (q[0] === 6 && M.label < H[1]) {
                          (M.label = H[1]), (H = q);
                          break;
                        }
                        if (H && M.label < H[2]) {
                          (M.label = H[2]), M.ops.push(q);
                          break;
                        }
                        H[2] && M.ops.pop(), M.trys.pop();
                        continue;
                    }
                    q = C.call(O, M);
                  } catch (be) {
                    (q = [6, be]), (R = 0);
                  } finally {
                    k = H = 0;
                  }
                if (5 & q[0]) throw q[1];
                return { value: q[0] ? q[1] : void 0, done: !0 };
              })([Z, le]);
            };
          }
        },
        f = function (O, C) {
          var k = typeof Symbol == 'function' && O[Symbol.iterator];
          if (!k) return O;
          var R,
            H,
            ee = k.call(O),
            M = [];
          try {
            for (; (C === void 0 || C-- > 0) && !(R = ee.next()).done; ) M.push(R.value);
          } catch (K) {
            H = { error: K };
          } finally {
            try {
              R && !R.done && (k = ee.return) && k.call(ee);
            } finally {
              if (H) throw H.error;
            }
          }
          return M;
        },
        m = function (O, C, k) {
          if (k || arguments.length === 2)
            for (var R, H = 0, ee = C.length; H < ee; H++)
              (!R && H in C) || (R || (R = Array.prototype.slice.call(C, 0, H)), (R[H] = C[H]));
          return O.concat(R || Array.prototype.slice.call(C));
        },
        w = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
        S = ['put', 'add', 'delete', 'clear'],
        U = new Map();
      function T(O, C) {
        if (O instanceof IDBDatabase && !(C in O) && typeof C == 'string') {
          if (U.get(C)) return U.get(C);
          var k = C.replace(/FromIndex$/, ''),
            R = C !== k,
            H = S.includes(k);
          if (k in (R ? IDBIndex : IDBObjectStore).prototype && (H || w.includes(k))) {
            var ee = function (M) {
              for (var K = [], Z = 1; Z < arguments.length; Z++) K[Z - 1] = arguments[Z];
              return g(this, void 0, void 0, function () {
                var le, q, be;
                return E(this, function (we) {
                  switch (we.label) {
                    case 0:
                      return (
                        (le = this.transaction(M, H ? 'readwrite' : 'readonly')),
                        (q = le.store),
                        R && (q = q.index(K.shift())),
                        [4, Promise.all([(be = q)[k].apply(be, m([], f(K), !1)), H && le.done])]
                      );
                    case 1:
                      return [2, we.sent()[0]];
                  }
                });
              });
            };
            return U.set(C, ee), ee;
          }
        }
      }
      (l = (function (O) {
        return L(L({}, O), {
          get: function (C, k, R) {
            return T(C, k) || O.get(C, k, R);
          },
          has: function (C, k) {
            return !!T(C, k) || O.has(C, k);
          },
        });
      })(l)),
        (c.deleteDB = function (O, C) {
          var k = (C === void 0 ? {} : C).blocked,
            R = indexedDB.deleteDatabase(O);
          return (
            k &&
              R.addEventListener('blocked', function (H) {
                return k(H.oldVersion, H);
              }),
            v(R).then(function () {})
          );
        }),
        (c.openDB = function (O, C, k) {
          var R = k === void 0 ? {} : k,
            H = R.blocked,
            ee = R.upgrade,
            M = R.blocking,
            K = R.terminated,
            Z = indexedDB.open(O, C),
            le = v(Z);
          return (
            ee &&
              Z.addEventListener('upgradeneeded', function (q) {
                ee(v(Z.result), q.oldVersion, q.newVersion, v(Z.transaction), q);
              }),
            H &&
              Z.addEventListener('blocked', function (q) {
                return H(q.oldVersion, q.newVersion, q);
              }),
            le
              .then(function (q) {
                K &&
                  q.addEventListener('close', function () {
                    return K();
                  }),
                  M &&
                    q.addEventListener('versionchange', function (be) {
                      return M(be.oldVersion, be.newVersion, be);
                    });
              })
              .catch(function () {}),
            le
          );
        }),
        (c.unwrap = y),
        (c.wrap = v);
    }),
    (function (c) {
      function h(p, n) {
        (n = n || {}),
          (this._id = h._generateUUID()),
          (this._promise = n.promise || Promise),
          (this._frameId = n.frameId || 'CrossStorageClient-' + this._id),
          (this._origin = h._getOrigin(p)),
          (this._requests = {}),
          (this._connected = !1),
          (this._closed = !1),
          (this._count = 0),
          (this._timeout = n.timeout || 5e3),
          (this._listener = null),
          this._installListener();
        var r;
        n.frameId && (r = document.getElementById(n.frameId)),
          r && this._poll(),
          (r = r || this._createFrame(p)),
          (this._hub = r.contentWindow);
      }
      (h.frameStyle = {
        width: 0,
        height: 0,
        border: 'none',
        display: 'none',
        position: 'absolute',
        top: '-999px',
        left: '-999px',
      }),
        (h._getOrigin = function (p) {
          var n, r, a;
          return (
            (n = document.createElement('a')),
            (n.href = p),
            n.host || (n = window.location),
            !n.protocol || n.protocol === ':' ? (r = window.location.protocol) : (r = n.protocol),
            (a = r + '//' + n.host),
            (a = a.replace(/:80$|:443$/, '')),
            a
          );
        }),
        (h._generateUUID = function () {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (p) {
            var n = (Math.random() * 16) | 0,
              r = p == 'x' ? n : (n & 3) | 8;
            return r.toString(16);
          });
        }),
        (h.prototype.onConnect = function () {
          var p = this;
          return this._connected
            ? this._promise.resolve()
            : this._closed
              ? this._promise.reject(new Error('CrossStorageClient has closed'))
              : (this._requests.connect || (this._requests.connect = []),
                new this._promise(function (n, r) {
                  var a = setTimeout(function () {
                    r(new Error('CrossStorageClient could not connect'));
                  }, p._timeout);
                  p._requests.connect.push(function (s) {
                    if ((clearTimeout(a), s)) return r(s);
                    n();
                  });
                }));
        }),
        (h.prototype.set = function (p, n) {
          return this._request('set', { key: p, value: n });
        }),
        (h.prototype.getSignedPayload = function (p, n) {
          return this._request('getSignedData', { payload: p, deviceId: n });
        }),
        (h.prototype.getDeviceDetails = function (p) {
          return this._request('getDeviceDetails', { deviceName: p });
        }),
        (h.prototype.setDeviceDetails = function (p, n) {
          return this._request('setDeviceDetails', { deviceName: p, deviceId: n });
        }),
        (h.prototype.get = function (p) {
          var n = Array.prototype.slice.call(arguments);
          return this._request('get', { keys: n });
        }),
        (h.prototype.del = function () {
          var p = Array.prototype.slice.call(arguments);
          return this._request('del', { keys: p });
        }),
        (h.prototype.clear = function () {
          return this._request('clear');
        }),
        (h.prototype.getKeys = function () {
          return this._request('getKeys');
        }),
        (h.prototype.close = function (p) {
          const n = this._frameId,
            r = this;
          this._request('close')
            .catch(function (a) {})
            .finally(function () {
              try {
                var a = document.getElementById(n);
                a && !p && a.parentNode.removeChild(a),
                  window.removeEventListener
                    ? window.removeEventListener('message', r._listener, !1)
                    : window.detachEvent('onmessage', r._listener),
                  (r._connected = !1),
                  (r._closed = !0);
              } catch {}
            });
        }),
        (h.prototype._installListener = function () {
          var p = this;
          (this._listener = function (n) {
            var r, a, s, i;
            if (
              !(p._closed || !n.data || typeof n.data != 'string') &&
              ((a = n.origin === 'null' ? 'file://' : n.origin), a === p._origin)
            ) {
              if (n.data === 'cross-storage:unavailable') {
                if ((p._closed || p.close(), !p._requests.connect)) return;
                for (
                  s = new Error('Closing client. Could not access localStorage in hub.'), r = 0;
                  r < p._requests.connect.length;
                  r++
                )
                  p._requests.connect[r](s);
                return;
              }
              if (n.data.indexOf('cross-storage:') !== -1 && !p._connected) {
                if (((p._connected = !0), !p._requests.connect)) return;
                for (r = 0; r < p._requests.connect.length; r++) p._requests.connect[r](s);
                delete p._requests.connect;
              }
              if (n.data !== 'cross-storage:ready') {
                try {
                  i = JSON.parse(n.data);
                } catch {
                  return;
                }
                i.id && p._requests[i.id] && p._requests[i.id](i.error, i.result);
              }
            }
          }),
            window.addEventListener
              ? window.addEventListener('message', this._listener, !1)
              : window.attachEvent('onmessage', this._listener);
        }),
        (h.prototype._poll = function () {
          var p, n, r;
          (p = this),
            (r = p._origin === 'file://' ? '*' : p._origin),
            (n = setInterval(function () {
              if (p._connected) return clearInterval(n);
              p._hub && p._hub.postMessage('cross-storage:poll', r);
            }, 1e3));
        }),
        (h.prototype._createFrame = function (p) {
          var n, r;
          (n = window.document.createElement('iframe')), (n.id = this._frameId);
          for (r in h.frameStyle) h.frameStyle.hasOwnProperty(r) && (n.style[r] = h.frameStyle[r]);
          return window.document.body.appendChild(n), (n.src = p), n;
        }),
        (h.prototype._request = function (p, n) {
          var r, a;
          return this._closed
            ? this._promise.reject(new Error('CrossStorageClient has closed'))
            : ((a = this),
              a._count++,
              (r = { id: this._id + ':' + a._count, method: 'cross-storage:' + p, params: n }),
              new this._promise(function (s, i) {
                var t, e, l;
                (t = setTimeout(function () {
                  a._requests[r.id] &&
                    (delete a._requests[r.id],
                    i(new Error('Timeout: could not perform ' + r.method)));
                }, a._timeout)),
                  (a._requests[r.id] = function (o, x) {
                    if ((clearTimeout(t), delete a._requests[r.id], o)) return i(new Error(o));
                    s(x);
                  }),
                  Array.prototype.toJSON &&
                    ((e = Array.prototype.toJSON), (Array.prototype.toJSON = null)),
                  (l = a._origin === 'file://' ? '*' : a._origin),
                  a._hub.postMessage(JSON.stringify(r), l),
                  e && (Array.prototype.toJSON = e);
              }));
        }),
        (c.CrossStorageClient = h);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    (function () {
      'use strict';
      typeof Object.assign != 'function' &&
        Object.defineProperty(Object, 'assign', {
          value: function (h, p) {
            'use strict';
            if (h == null) throw new TypeError('Cannot convert undefined or null to object');
            for (var n = Object(h), r = 1; r < arguments.length; r++) {
              var a = arguments[r];
              if (a != null)
                for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (n[s] = a[s]);
            }
            return n;
          },
          writable: !0,
          configurable: !0,
        });
    })(),
    Array.from ||
      (Array.from = (function () {
        var c = Object.prototype.toString,
          h = function (a) {
            return typeof a == 'function' || c.call(a) === '[object Function]';
          },
          p = function (a) {
            var s = Number(a);
            return isNaN(s)
              ? 0
              : s === 0 || !isFinite(s)
                ? s
                : (s > 0 ? 1 : -1) * Math.floor(Math.abs(s));
          },
          n = Math.pow(2, 53) - 1,
          r = function (a) {
            var s = p(a);
            return Math.min(Math.max(s, 0), n);
          };
        return function (s) {
          var i = this,
            t = Object(s);
          if (s == null)
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          var e = arguments.length > 1 ? arguments[1] : void 0,
            l;
          if (typeof e != 'undefined') {
            if (!h(e))
              throw new TypeError(
                'Array.from: when provided, the second argument must be a function',
              );
            arguments.length > 2 && (l = arguments[2]);
          }
          for (var o = r(t.length), x = h(i) ? Object(new i(o)) : new Array(o), v = 0, y; v < o; )
            (y = t[v]),
              e ? (x[v] = typeof l == 'undefined' ? e(y, v) : e.call(l, y, v)) : (x[v] = y),
              (v += 1);
          return (x.length = o), x;
        };
      })()),
    (function () {
      'use strict';
      String.prototype.endsWith ||
        (String.prototype.endsWith = function (c, h) {
          return (
            (h === void 0 || h > this.length) && (h = this.length),
            this.substring(h - c.length, h) === c
          );
        });
    })(),
    (function () {
      'use strict';
      Promise.allSettled =
        Promise.allSettled ||
        function (c) {
          return Promise.all(
            c.map(function (h) {
              return h
                .then(function (p) {
                  return { status: 'fulfilled', value: p };
                })
                .catch(function (p) {
                  return { status: 'rejected', reason: p };
                });
            }),
          );
        };
    })(),
    (function (c, h) {
      'use strict';
      var p = '2.0.2',
        n = 500,
        r = 'user-agent',
        a = '',
        s = '?',
        i = 'function',
        t = 'undefined',
        e = 'object',
        l = 'string',
        o = 'browser',
        x = 'cpu',
        v = 'device',
        y = 'engine',
        L = 'os',
        g = 'result',
        E = 'name',
        f = 'type',
        m = 'vendor',
        w = 'version',
        S = 'architecture',
        U = 'major',
        T = 'model',
        O = 'console',
        C = 'mobile',
        k = 'tablet',
        R = 'smarttv',
        H = 'wearable',
        ee = 'xr',
        M = 'embedded',
        K = 'inapp',
        Z = 'brands',
        le = 'formFactors',
        q = 'fullVersionList',
        be = 'platform',
        we = 'platformVersion',
        He = 'bitness',
        B = 'sec-ch-ua',
        ne = B + '-full-version-list',
        se = B + '-arch',
        oe = B + '-' + He,
        ge = B + '-form-factors',
        De = B + '-' + C,
        Te = B + '-' + T,
        Fe = B + '-' + be,
        Re = Fe + '-version',
        Le = [Z, q, C, T, be, we, S, le, He],
        Oe = 'Amazon',
        Xe = 'Apple',
        $e = 'ASUS',
        pt = 'BlackBerry',
        Qe = 'Google',
        Ke = 'Huawei',
        it = 'Lenovo',
        _e = 'Honor',
        Ge = 'LG',
        Pe = 'Microsoft',
        et = 'Motorola',
        tt = 'Nvidia',
        rt = 'OnePlus',
        nt = 'OPPO',
        Je = 'Samsung',
        _ = 'Sharp',
        W = 'Sony',
        $ = 'Xiaomi',
        j = 'Zebra',
        ie = 'Chrome',
        ae = 'Chromium',
        ve = 'Chromecast',
        Se = 'Edge',
        d = 'Firefox',
        F = 'Opera',
        G = 'Facebook',
        A = 'Sogou',
        re = 'Mobile ',
        de = ' Browser',
        ce = 'Windows',
        fe = typeof window !== t,
        We = fe && window.navigator ? window.navigator : h,
        ye = We && We.userAgentData ? We.userAgentData : h,
        at = function (te, ue) {
          var he = {},
            Ae = ue;
          if (!st(ue)) {
            Ae = {};
            for (var pe in ue)
              for (var Ue in ue[pe]) Ae[Ue] = ue[pe][Ue].concat(Ae[Ue] ? Ae[Ue] : []);
          }
          for (var xe in te)
            he[xe] = Ae[xe] && Ae[xe].length % 2 === 0 ? Ae[xe].concat(te[xe]) : te[xe];
          return he;
        },
        mt = function (te) {
          for (var ue = {}, he = 0; he < te.length; he++) ue[te[he].toUpperCase()] = te[he];
          return ue;
        },
        xt = function (te, ue) {
          if (typeof te === e && te.length > 0) {
            for (var he in te) if (ct(te[he]) == ct(ue)) return !0;
            return !1;
          }
          return ot(te) ? ct(ue).indexOf(ct(te)) !== -1 : !1;
        },
        st = function (te, ue) {
          for (var he in te)
            return /^(browser|cpu|device|engine|os)$/.test(he) || (ue ? st(te[he]) : !1);
        },
        ot = function (te) {
          return typeof te === l;
        },
        Ut = function (te) {
          if (!te) return h;
          for (var ue = [], he = vt(/\\?\"/g, te).split(','), Ae = 0; Ae < he.length; Ae++)
            if (he[Ae].indexOf(';') > -1) {
              var pe = _t(he[Ae]).split(';v=');
              ue[Ae] = { brand: pe[0], version: pe[1] };
            } else ue[Ae] = _t(he[Ae]);
          return ue;
        },
        ct = function (te) {
          return ot(te) ? te.toLowerCase() : te;
        },
        kt = function (te) {
          return ot(te) ? vt(/[^\d\.]/g, te).split('.')[0] : h;
        },
        lt = function (te) {
          for (var ue in te) {
            var he = te[ue];
            typeof he == e && he.length == 2 ? (this[he[0]] = he[1]) : (this[he] = h);
          }
          return this;
        },
        vt = function (te, ue) {
          return ot(ue) ? ue.replace(te, a) : ue;
        },
        wt = function (te) {
          return vt(/\\?\"/g, te);
        },
        _t = function (te, ue) {
          if (ot(te)) return (te = vt(/^\s\s*/, te)), typeof ue === t ? te : te.substring(0, n);
        },
        Nt = function (te, ue) {
          if (!(!te || !ue))
            for (var he = 0, Ae, pe, Ue, xe, Ce, Ee; he < ue.length && !Ce; ) {
              var Be = ue[he],
                ut = ue[he + 1];
              for (Ae = pe = 0; Ae < Be.length && !Ce && Be[Ae]; )
                if (((Ce = Be[Ae++].exec(te)), Ce))
                  for (Ue = 0; Ue < ut.length; Ue++)
                    (Ee = Ce[++pe]),
                      (xe = ut[Ue]),
                      typeof xe === e && xe.length > 0
                        ? xe.length === 2
                          ? typeof xe[1] == i
                            ? (this[xe[0]] = xe[1].call(this, Ee))
                            : (this[xe[0]] = xe[1])
                          : xe.length === 3
                            ? typeof xe[1] === i && !(xe[1].exec && xe[1].test)
                              ? (this[xe[0]] = Ee ? xe[1].call(this, Ee, xe[2]) : h)
                              : (this[xe[0]] = Ee ? Ee.replace(xe[1], xe[2]) : h)
                            : xe.length === 4 &&
                              (this[xe[0]] = Ee ? xe[3].call(this, Ee.replace(xe[1], xe[2])) : h)
                        : (this[xe] = Ee || h);
              he += 2;
            }
        },
        ht = function (te, ue) {
          for (var he in ue)
            if (typeof ue[he] === e && ue[he].length > 0) {
              for (var Ae = 0; Ae < ue[he].length; Ae++)
                if (xt(ue[he][Ae], te)) return he === s ? h : he;
            } else if (xt(ue[he], te)) return he === s ? h : he;
          return ue.hasOwnProperty('*') ? ue['*'] : te;
        },
        yt = {
          ME: '4.90',
          'NT 3.11': 'NT3.51',
          'NT 4.0': 'NT4.0',
          2e3: 'NT 5.0',
          XP: ['NT 5.1', 'NT 5.2'],
          Vista: 'NT 6.0',
          7: 'NT 6.1',
          8: 'NT 6.2',
          8.1: 'NT 6.3',
          10: ['NT 6.4', 'NT 10.0'],
          RT: 'ARM',
        },
        Tt = {
          embedded: 'Automotive',
          mobile: 'Mobile',
          tablet: ['Tablet', 'EInk'],
          smarttv: 'TV',
          wearable: 'Watch',
          xr: ['VR', 'XR'],
          '?': ['Desktop', 'Unknown'],
          '*': h,
        },
        Pt = {
          browser: [
            [/\b(?:crmo|crios)\/([\w\.]+)/i],
            [w, [E, re + 'Chrome']],
            [/edg(?:e|ios|a)?\/([\w\.]+)/i],
            [w, [E, 'Edge']],
            [
              /(opera mini)\/([-\w\.]+)/i,
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
            ],
            [E, w],
            [/opios[\/ ]+([\w\.]+)/i],
            [w, [E, F + ' Mini']],
            [/\bop(?:rg)?x\/([\w\.]+)/i],
            [w, [E, F + ' GX']],
            [/\bopr\/([\w\.]+)/i],
            [w, [E, F]],
            [/\bb[a]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
            [w, [E, 'Baidu']],
            [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
            [w, [E, 'Maxthon']],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
              /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
              /(?:ms|\()(ie) ([\w\.]+)/i,
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
              /(heytap|ovi|115)browser\/([\d\.]+)/i,
              /(weibo)__([\d\.]+)/i,
            ],
            [E, w],
            [/quark(?:pc)?\/([-\w\.]+)/i],
            [w, [E, 'Quark']],
            [/\bddg\/([\w\.]+)/i],
            [w, [E, 'DuckDuckGo']],
            [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
            [w, [E, 'UCBrowser']],
            [
              /microm.+\bqbcore\/([\w\.]+)/i,
              /\bqbcore\/([\w\.]+).+microm/i,
              /micromessenger\/([\w\.]+)/i,
            ],
            [w, [E, 'WeChat']],
            [/konqueror\/([\w\.]+)/i],
            [w, [E, 'Konqueror']],
            [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
            [w, [E, 'IE']],
            [/ya(?:search)?browser\/([\w\.]+)/i],
            [w, [E, 'Yandex']],
            [/slbrowser\/([\w\.]+)/i],
            [w, [E, 'Smart ' + it + de]],
            [/(avast|avg)\/([\w\.]+)/i],
            [[E, /(.+)/, '$1 Secure' + de], w],
            [/\bfocus\/([\w\.]+)/i],
            [w, [E, d + ' Focus']],
            [/\bopt\/([\w\.]+)/i],
            [w, [E, F + ' Touch']],
            [/coc_coc\w+\/([\w\.]+)/i],
            [w, [E, 'Coc Coc']],
            [/dolfin\/([\w\.]+)/i],
            [w, [E, 'Dolphin']],
            [/coast\/([\w\.]+)/i],
            [w, [E, F + ' Coast']],
            [/miuibrowser\/([\w\.]+)/i],
            [w, [E, 'MIUI' + de]],
            [/fxios\/([\w\.-]+)/i],
            [w, [E, re + d]],
            [/\bqihoobrowser\/?([\w\.]*)/i],
            [w, [E, '360']],
            [/\b(qq)\/([\w\.]+)/i],
            [[E, /(.+)/, '$1Browser'], w],
            [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
            [[E, /(.+)/, '$1' + de], w],
            [/samsungbrowser\/([\w\.]+)/i],
            [w, [E, Je + ' Internet']],
            [/metasr[\/ ]?([\d\.]+)/i],
            [w, [E, A + ' Explorer']],
            [/(sogou)mo\w+\/([\d\.]+)/i],
            [[E, A + ' Mobile'], w],
            [
              /(electron)\/([\w\.]+) safari/i,
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i,
            ],
            [E, w],
            [/(lbbrowser|rekonq)/i],
            [E],
            [/ome\/([\w\.]+) \w* ?(iron) saf/i, /ome\/([\w\.]+).+qihu (360)[es]e/i],
            [w, E],
            [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
            [[E, G], w, [f, K]],
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
            [E, w, [f, K]],
            [/\bgsa\/([\w\.]+) .*safari\//i],
            [w, [E, 'GSA'], [f, K]],
            [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
            [w, [E, 'TikTok'], [f, K]],
            [/\[(linkedin)app\]/i],
            [E, [f, K]],
            [/(chromium)[\/ ]([-\w\.]+)/i],
            [E, w],
            [/headlesschrome(?:\/([\w\.]+)| )/i],
            [w, [E, ie + ' Headless']],
            [/ wv\).+(chrome)\/([\w\.]+)/i],
            [[E, ie + ' WebView'], w],
            [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
            [w, [E, 'Android' + de]],
            [/chrome\/([\w\.]+) mobile/i],
            [w, [E, re + 'Chrome']],
            [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
            [E, w],
            [/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i],
            [w, [E, re + 'Safari']],
            [/iphone .*mobile(?:\/\w+ | ?)safari/i],
            [[E, re + 'Safari']],
            [/version\/([\w\.\,]+) .*(safari)/i],
            [w, E],
            [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
            [E, [w, '1']],
            [/(webkit|khtml)\/([\w\.]+)/i],
            [E, w],
            [/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i],
            [[E, re + d], w],
            [/(navigator|netscape\d?)\/([-\w\.]+)/i],
            [[E, 'Netscape'], w],
            [/(wolvic|librewolf)\/([\w\.]+)/i],
            [E, w],
            [/mobile vr; rv:([\w\.]+)\).+firefox/i],
            [w, [E, d + ' Reality']],
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
            [E, [w, /_/g, '.']],
            [/(cobalt)\/([\w\.]+)/i],
            [E, [w, /[^\d\.]+./, a]],
          ],
          cpu: [
            [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
            [[S, 'amd64']],
            [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
            [[S, 'ia32']],
            [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
            [[S, 'arm64']],
            [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
            [[S, 'armhf']],
            [/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],
            [[S, 'arm']],
            [/((ppc|powerpc)(64)?)( mac|;|\))/i],
            [[S, /ower/, a, ct]],
            [/ sun4\w[;\)]/i],
            [[S, 'sparc']],
            [
              /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
            ],
            [[S, ct]],
          ],
          device: [
            [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
            [T, [m, Je], [f, k]],
            [
              /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]((?!sm-[lr])[-\w]+)/i,
              /sec-(sgh\w+)/i,
            ],
            [T, [m, Je], [f, C]],
            [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
            [T, [m, Xe], [f, C]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
            ],
            [T, [m, Xe], [f, k]],
            [/(macintosh);/i],
            [T, [m, Xe]],
            [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
            [T, [m, _], [f, C]],
            [
              /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i,
            ],
            [T, [m, _e], [f, k]],
            [/honor([-\w ]+)[;\)]/i],
            [T, [m, _e], [f, C]],
            [
              /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i,
            ],
            [T, [m, Ke], [f, k]],
            [
              /(?:huawei)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
            ],
            [T, [m, Ke], [f, C]],
            [
              /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
              /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
            ],
            [
              [T, /_/g, ' '],
              [m, $],
              [f, k],
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
              [T, /_/g, ' '],
              [m, $],
              [f, C],
            ],
            [
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
            ],
            [T, [m, nt], [f, C]],
            [/\b(opd2(\d{3}a?))(?: bui|\))/i],
            [T, [m, ht, { OnePlus: ['304', '403', '203'], '*': nt }], [f, k]],
            [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
            [T, [m, 'Vivo'], [f, C]],
            [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
            [T, [m, 'Realme'], [f, C]],
            [
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
            ],
            [T, [m, et], [f, C]],
            [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
            [T, [m, et], [f, k]],
            [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
            [T, [m, Ge], [f, k]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
              /\blg-?([\d\w]+) bui/i,
            ],
            [T, [m, Ge], [f, C]],
            [
              /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
              /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
            ],
            [T, [m, it], [f, k]],
            [/(nokia) (t[12][01])/i],
            [m, T, [f, k]],
            [/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w\. ]*))/i],
            [
              [T, /_/g, ' '],
              [f, C],
              [m, 'Nokia'],
            ],
            [/(pixel (c|tablet))\b/i],
            [T, [m, Qe], [f, k]],
            [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
            [T, [m, Qe], [f, C]],
            [
              /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
            ],
            [T, [m, W], [f, C]],
            [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
            [
              [T, 'Xperia Tablet'],
              [m, W],
              [f, k],
            ],
            [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
            [T, [m, rt], [f, C]],
            [
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
              /(kf[a-z]+)( bui|\)).+silk\//i,
            ],
            [T, [m, Oe], [f, k]],
            [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
            [
              [T, /(.+)/g, 'Fire Phone $1'],
              [m, Oe],
              [f, C],
            ],
            [/(playbook);[-\w\),; ]+(rim)/i],
            [T, m, [f, k]],
            [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
            [T, [m, pt], [f, C]],
            [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
            [T, [m, $e], [f, k]],
            [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
            [T, [m, $e], [f, C]],
            [/(nexus 9)/i],
            [T, [m, 'HTC'], [f, k]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
            ],
            [m, [T, /_/g, ' '], [f, C]],
            [
              /tcl (xess p17aa)/i,
              /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i,
            ],
            [T, [m, 'TCL'], [f, k]],
            [
              /droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i,
            ],
            [T, [m, 'TCL'], [f, C]],
            [/(itel) ((\w+))/i],
            [[m, ct], T, [f, ht, { tablet: ['p10001l', 'w7001'], '*': 'mobile' }]],
            [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
            [T, [m, 'Acer'], [f, k]],
            [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
            [T, [m, 'Meizu'], [f, C]],
            [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
            [T, [m, 'Ulefone'], [f, C]],
            [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
            [T, [m, 'Energizer'], [f, C]],
            [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
            [T, [m, 'Cat'], [f, C]],
            [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
            [T, [m, 'Smartfren'], [f, C]],
            [/droid.+; (a(?:015|06[35]|142p?))/i],
            [T, [m, 'Nothing'], [f, C]],
            [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i],
            [m, T, [f, k]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
              /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
              /(hp) ([\w ]+\w)/i,
              /(microsoft); (lumia[\w ]+)/i,
              /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
              /(oppo) ?([\w ]+) bui/i,
            ],
            [m, T, [f, C]],
            [
              /(kobo)\s(ereader|touch)/i,
              /(archos) (gamepad2?)/i,
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              /(kindle)\/([\w\.]+)/i,
            ],
            [m, T, [f, k]],
            [/(surface duo)/i],
            [T, [m, Pe], [f, k]],
            [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
            [T, [m, 'Fairphone'], [f, C]],
            [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
            [T, [m, tt], [f, k]],
            [/(sprint) (\w+)/i],
            [m, T, [f, C]],
            [/(kin\.[onetw]{3})/i],
            [
              [T, /\./g, ' '],
              [m, Pe],
              [f, C],
            ],
            [/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
            [T, [m, j], [f, k]],
            [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
            [T, [m, j], [f, C]],
            [/smart-tv.+(samsung)/i],
            [m, [f, R]],
            [/hbbtv.+maple;(\d+)/i],
            [
              [T, /^/, 'SmartTV'],
              [m, Je],
              [f, R],
            ],
            [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
            [
              [m, Ge],
              [f, R],
            ],
            [/(apple) ?tv/i],
            [m, [T, Xe + ' TV'], [f, R]],
            [/crkey.*devicetype\/chromecast/i],
            [
              [T, ve + ' Third Generation'],
              [m, Qe],
              [f, R],
            ],
            [/crkey.*devicetype\/([^/]*)/i],
            [
              [T, /^/, 'Chromecast '],
              [m, Qe],
              [f, R],
            ],
            [/fuchsia.*crkey/i],
            [
              [T, ve + ' Nest Hub'],
              [m, Qe],
              [f, R],
            ],
            [/crkey/i],
            [
              [T, ve],
              [m, Qe],
              [f, R],
            ],
            [/droid.+aft(\w+)( bui|\))/i],
            [T, [m, Oe], [f, R]],
            [/(shield \w+ tv)/i],
            [T, [m, tt], [f, R]],
            [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
            [T, [m, _], [f, R]],
            [/(bravia[\w ]+)( bui|\))/i],
            [T, [m, W], [f, R]],
            [/(mi(tv|box)-?\w+) bui/i],
            [T, [m, $], [f, R]],
            [/Hbbtv.*(technisat) (.*);/i],
            [m, T, [f, R]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
            ],
            [
              [m, _t],
              [T, _t],
              [f, R],
            ],
            [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],
            [T, [f, R]],
            [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
            [[f, R]],
            [/(ouya)/i, /(nintendo) (\w+)/i],
            [m, T, [f, O]],
            [/droid.+; (shield)( bui|\))/i],
            [T, [m, tt], [f, O]],
            [/(playstation \w+)/i],
            [T, [m, W], [f, O]],
            [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
            [T, [m, Pe], [f, O]],
            [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
            [T, [m, Je], [f, H]],
            [/((pebble))app/i, /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i],
            [m, T, [f, H]],
            [/(ow(?:19|20)?we?[1-3]{1,3})/i],
            [T, [m, nt], [f, H]],
            [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
            [T, [m, Xe], [f, H]],
            [/(opwwe\d{3})/i],
            [T, [m, rt], [f, H]],
            [/(moto 360)/i],
            [T, [m, et], [f, H]],
            [/(smartwatch 3)/i],
            [T, [m, W], [f, H]],
            [/(g watch r)/i],
            [T, [m, Ge], [f, H]],
            [/droid.+; (wt63?0{2,3})\)/i],
            [T, [m, j], [f, H]],
            [/droid.+; (glass) \d/i],
            [T, [m, Qe], [f, ee]],
            [/(pico) (4|neo3(?: link|pro)?)/i],
            [m, T, [f, ee]],
            [/; (quest( \d| pro)?)/i],
            [T, [m, G], [f, ee]],
            [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
            [m, [f, M]],
            [/(aeobc)\b/i],
            [T, [m, Oe], [f, M]],
            [/(homepod).+mac os/i],
            [T, [m, Xe], [f, M]],
            [/windows iot/i],
            [[f, M]],
            [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+?(mobile|vr|\d) safari/i],
            [T, [f, ht, { mobile: 'Mobile', xr: 'VR', '*': k }]],
            [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
            [[f, k]],
            [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
            [[f, C]],
            [/droid .+?; ([\w\. -]+)( bui|\))/i],
            [T, [m, 'Generic']],
          ],
          engine: [
            [/windows.+ edge\/([\w\.]+)/i],
            [w, [E, Se + 'HTML']],
            [/(arkweb)\/([\w\.]+)/i],
            [E, w],
            [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
            [w, [E, 'Blink']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
              /ekioh(flow)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
              /\b(libweb)/i,
            ],
            [E, w],
            [/ladybird\//i],
            [[E, 'LibWeb']],
            [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
            [w, E],
          ],
          os: [
            [/microsoft (windows) (vista|xp)/i],
            [E, w],
            [/(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i],
            [E, [w, ht, yt]],
            [
              /windows nt 6\.2; (arm)/i,
              /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
              /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
            ],
            [
              [w, ht, yt],
              [E, ce],
            ],
            [
              /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
              /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
              /cfnetwork\/.+darwin/i,
            ],
            [
              [w, /_/g, '.'],
              [E, 'iOS'],
            ],
            [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
            [
              [E, 'macOS'],
              [w, /_/g, '.'],
            ],
            [/android ([\d\.]+).*crkey/i],
            [w, [E, ve + ' Android']],
            [/fuchsia.*crkey\/([\d\.]+)/i],
            [w, [E, ve + ' Fuchsia']],
            [/crkey\/([\d\.]+).*devicetype\/smartspeaker/i],
            [w, [E, ve + ' SmartSpeaker']],
            [/linux.*crkey\/([\d\.]+)/i],
            [w, [E, ve + ' Linux']],
            [/crkey\/([\d\.]+)/i],
            [w, [E, ve]],
            [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
            [w, E],
            [/(ubuntu) ([\w\.]+) like android/i],
            [[E, /(.+)/, '$1 Touch'], w],
            [
              /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i,
            ],
            [E, w],
            [/\(bb(10);/i],
            [w, [E, pt]],
            [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
            [w, [E, 'Symbian']],
            [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
            [w, [E, d + ' OS']],
            [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
            [w, [E, 'webOS']],
            [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
            [w, [E, 'watchOS']],
            [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
            [[E, 'Chrome OS'], w],
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
            [E, w],
            [/(sunos) ?([\w\.\d]*)/i],
            [[E, 'Solaris'], w],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
              /(unix) ?([\w\.]*)/i,
            ],
            [E, w],
          ],
        },
        Et = (function () {
          var te = { init: {}, isIgnore: {}, isIgnoreRgx: {}, toString: {} };
          return (
            lt.call(te.init, [
              [o, [E, w, U, f]],
              [x, [S]],
              [v, [f, T, m]],
              [y, [E, w]],
              [L, [E, w]],
            ]),
            lt.call(te.isIgnore, [
              [o, [w, U]],
              [y, [w]],
              [L, [w]],
            ]),
            lt.call(te.isIgnoreRgx, [
              [o, / ?browser$/i],
              [L, / ?os$/i],
            ]),
            lt.call(te.toString, [
              [o, [E, w]],
              [x, [S]],
              [v, [m, T]],
              [y, [E, w]],
              [L, [E, w]],
            ]),
            te
          );
        })(),
        Vt = function (te, ue) {
          var he = Et.init[ue],
            Ae = Et.isIgnore[ue] || 0,
            pe = Et.isIgnoreRgx[ue] || 0,
            Ue = Et.toString[ue] || 0;
          function xe() {
            lt.call(this, he);
          }
          return (
            (xe.prototype.getItem = function () {
              return te;
            }),
            (xe.prototype.withClientHints = function () {
              return ye
                ? ye.getHighEntropyValues(Le).then(function (Ce) {
                    return te.setCH(new Lt(Ce, !1)).parseCH().get();
                  })
                : te.parseCH().get();
            }),
            (xe.prototype.withFeatureCheck = function () {
              return te.detectFeature().get();
            }),
            ue != g &&
              ((xe.prototype.is = function (Ce) {
                var Ee = !1;
                for (var Be in this)
                  if (
                    this.hasOwnProperty(Be) &&
                    !xt(Ae, Be) &&
                    ct(pe ? vt(pe, this[Be]) : this[Be]) == ct(pe ? vt(pe, Ce) : Ce)
                  ) {
                    if (((Ee = !0), Ce != t)) break;
                  } else if (Ce == t && Ee) {
                    Ee = !Ee;
                    break;
                  }
                return Ee;
              }),
              (xe.prototype.toString = function () {
                var Ce = a;
                for (var Ee in Ue)
                  typeof this[Ue[Ee]] !== t && (Ce += (Ce ? ' ' : a) + this[Ue[Ee]]);
                return Ce || t;
              })),
            ye ||
              (xe.prototype.then = function (Ce) {
                var Ee = this,
                  Be = function () {
                    for (var ft in Ee) Ee.hasOwnProperty(ft) && (this[ft] = Ee[ft]);
                  };
                Be.prototype = { is: xe.prototype.is, toString: xe.prototype.toString };
                var ut = new Be();
                return Ce(ut), ut;
              }),
            new xe()
          );
        };
      function Lt(te, ue) {
        if (((te = te || {}), lt.call(this, Le), ue))
          lt.call(this, [
            [Z, Ut(te[B])],
            [q, Ut(te[ne])],
            [C, /\?1/.test(te[De])],
            [T, wt(te[Te])],
            [be, wt(te[Fe])],
            [we, wt(te[Re])],
            [S, wt(te[se])],
            [le, Ut(te[ge])],
            [He, wt(te[oe])],
          ]);
        else
          for (var he in te) this.hasOwnProperty(he) && typeof te[he] !== t && (this[he] = te[he]);
      }
      function Ct(te, ue, he, Ae) {
        return (
          (this.get = function (pe) {
            return pe ? (this.data.hasOwnProperty(pe) ? this.data[pe] : h) : this.data;
          }),
          (this.set = function (pe, Ue) {
            return (this.data[pe] = Ue), this;
          }),
          (this.setCH = function (pe) {
            return (this.uaCH = pe), this;
          }),
          (this.detectFeature = function () {
            if (We && We.userAgent == this.ua)
              switch (this.itemType) {
                case o:
                  We.brave && typeof We.brave.isBrave == i && this.set(E, 'Brave');
                  break;
                case v:
                  !this.get(f) && ye && ye[C] && this.set(f, C),
                    this.get(T) == 'Macintosh' &&
                      We &&
                      typeof We.standalone !== t &&
                      We.maxTouchPoints &&
                      We.maxTouchPoints > 2 &&
                      this.set(T, 'iPad').set(f, k);
                  break;
                case L:
                  !this.get(E) && ye && ye[be] && this.set(E, ye[be]);
                  break;
                case g:
                  var pe = this.data,
                    Ue = function (xe) {
                      return pe[xe].getItem().detectFeature().get();
                    };
                  this.set(o, Ue(o)).set(x, Ue(x)).set(v, Ue(v)).set(y, Ue(y)).set(L, Ue(L));
              }
            return this;
          }),
          (this.parseUA = function () {
            return (
              this.itemType != g && Nt.call(this.data, this.ua, this.rgxMap),
              this.itemType == o && this.set(U, kt(this.get(w))),
              this
            );
          }),
          (this.parseCH = function () {
            var pe = this.uaCH,
              Ue = this.rgxMap;
            switch (this.itemType) {
              case o:
              case y:
                var xe = pe[q] || pe[Z],
                  Ce;
                if (xe)
                  for (var Ee in xe) {
                    var Be = xe[Ee].brand || xe[Ee],
                      ut = xe[Ee].version;
                    this.itemType == o &&
                      !/not.a.brand/i.test(Be) &&
                      (!Ce || (/chrom/i.test(Ce) && Be != ae)) &&
                      ((Be = ht(Be, {
                        Chrome: 'Google Chrome',
                        Edge: 'Microsoft Edge',
                        'Chrome WebView': 'Android WebView',
                        'Chrome Headless': 'HeadlessChrome',
                      })),
                      this.set(E, Be).set(w, ut).set(U, kt(ut)),
                      (Ce = Be)),
                      this.itemType == y && Be == ae && this.set(w, ut);
                  }
                break;
              case x:
                var ft = pe[S];
                ft && (ft && pe[He] == '64' && (ft += '64'), Nt.call(this.data, ft + ';', Ue));
                break;
              case v:
                if (
                  (pe[C] && this.set(f, C),
                  pe[T] && (this.set(T, pe[T]), !this.get(f) || !this.get(m)))
                ) {
                  var St = {};
                  Nt.call(St, 'droid 9; ' + pe[T] + ')', Ue),
                    !this.get(f) && St.type && this.set(f, St.type),
                    !this.get(m) && St.vendor && this.set(m, St.vendor);
                }
                if (pe[le]) {
                  var Dt;
                  if (typeof pe[le] != 'string')
                    for (var Bt = 0; !Dt && Bt < pe[le].length; ) Dt = ht(pe[le][Bt++], Tt);
                  else Dt = ht(pe[le], Tt);
                  this.set(f, Dt);
                }
                break;
              case L:
                var Ot = pe[be];
                if (Ot) {
                  var Ft = pe[we];
                  Ot == ce && (Ft = parseInt(kt(Ft), 10) >= 13 ? '11' : '10'),
                    this.set(E, Ot).set(w, Ft);
                }
                this.get(E) == ce && pe[T] == 'Xbox' && this.set(E, 'Xbox').set(w, h);
                break;
              case g:
                var Gt = this.data,
                  It = function (Ht) {
                    return Gt[Ht].getItem().setCH(pe).parseCH().get();
                  };
                this.set(o, It(o)).set(x, It(x)).set(v, It(v)).set(y, It(y)).set(L, It(L));
            }
            return this;
          }),
          lt.call(this, [
            ['itemType', te],
            ['ua', ue],
            ['uaCH', Ae],
            ['rgxMap', he],
            ['data', Vt(this, te)],
          ]),
          this
        );
      }
      function dt(te, ue, he) {
        if (
          (typeof te === e
            ? (st(te, !0) ? (typeof ue === e && (he = ue), (ue = te)) : ((he = te), (ue = h)),
              (te = h))
            : typeof te === l && !st(ue, !0) && ((he = ue), (ue = h)),
          he && typeof he.append === i)
        ) {
          var Ae = {};
          he.forEach(function (Ee, Be) {
            Ae[Be] = Ee;
          }),
            (he = Ae);
        }
        if (!(this instanceof dt)) return new dt(te, ue, he).getResult();
        var pe = typeof te === l ? te : he && he[r] ? he[r] : We && We.userAgent ? We.userAgent : a,
          Ue = new Lt(he, !0),
          xe = ue ? at(Pt, ue) : Pt,
          Ce = function (Ee) {
            return Ee == g
              ? function () {
                  return new Ct(Ee, pe, xe, Ue)
                    .set('ua', pe)
                    .set(o, this.getBrowser())
                    .set(x, this.getCPU())
                    .set(v, this.getDevice())
                    .set(y, this.getEngine())
                    .set(L, this.getOS())
                    .get();
                }
              : function () {
                  return new Ct(Ee, pe, xe[Ee], Ue).parseUA().get();
                };
          };
        return (
          lt
            .call(this, [
              ['getBrowser', Ce(o)],
              ['getCPU', Ce(x)],
              ['getDevice', Ce(v)],
              ['getEngine', Ce(y)],
              ['getOS', Ce(L)],
              ['getResult', Ce(g)],
              [
                'getUA',
                function () {
                  return pe;
                },
              ],
              [
                'setUA',
                function (Ee) {
                  return ot(Ee) && (pe = Ee.length > n ? _t(Ee, n) : Ee), this;
                },
              ],
            ])
            .setUA(pe),
          this
        );
      }
      (dt.VERSION = p),
        (dt.BROWSER = mt([E, w, U, f])),
        (dt.CPU = mt([S])),
        (dt.DEVICE = mt([T, m, f, O, C, R, k, H, M])),
        (dt.ENGINE = dt.OS = mt([E, w])),
        (c.UAParser = dt);
    })(_POSignalsEntities || (_POSignalsEntities = {})),
    ((_POSignalsEntities || (_POSignalsEntities = {})).evaluateModernizr = function () {
      (function (c, h, p, n) {
        function r(B, ne) {
          return typeof B === ne;
        }
        function a() {
          return typeof p.createElement != 'function'
            ? p.createElement(arguments[0])
            : T
              ? p.createElementNS.call(p, 'http://www.w3.org/2000/svg', arguments[0])
              : p.createElement.apply(p, arguments);
        }
        function s(B, ne) {
          return !!~('' + B).indexOf(ne);
        }
        function i() {
          var B = p.body;
          return B || ((B = a(T ? 'svg' : 'body')), (B.fake = !0)), B;
        }
        function t(B, ne, se, oe) {
          var ge,
            De,
            Te,
            Fe,
            Re = 'modernizr',
            Le = a('div'),
            Oe = i();
          if (parseInt(se, 10))
            for (; se--; )
              (Te = a('div')), (Te.id = oe ? oe[se] : Re + (se + 1)), Le.appendChild(Te);
          return (
            (ge = a('style')),
            (ge.type = 'text/css'),
            (ge.id = 's' + Re),
            (Oe.fake ? Oe : Le).appendChild(ge),
            Oe.appendChild(Le),
            ge.styleSheet ? (ge.styleSheet.cssText = B) : ge.appendChild(p.createTextNode(B)),
            (Le.id = Re),
            Oe.fake &&
              ((Oe.style.background = ''),
              (Oe.style.overflow = 'hidden'),
              (Fe = U.style.overflow),
              (U.style.overflow = 'hidden'),
              U.appendChild(Oe)),
            (De = ne(Le, B)),
            Oe.fake && Oe.parentNode
              ? (Oe.parentNode.removeChild(Oe), (U.style.overflow = Fe), U.offsetHeight)
              : Le.parentNode.removeChild(Le),
            !!De
          );
        }
        function e(B) {
          return B.replace(/([A-Z])/g, function (ne, se) {
            return '-' + se.toLowerCase();
          }).replace(/^ms-/, '-ms-');
        }
        function l(B, ne, se) {
          var oe;
          if ('getComputedStyle' in h) {
            oe = getComputedStyle.call(h, B, ne);
            var ge = h.console;
            if (oe !== null) se && (oe = oe.getPropertyValue(se));
            else if (ge) {
              var De = ge.error ? 'error' : 'log';
              ge[De].call(
                ge,
                'getComputedStyle returning null, its possible modernizr test results are inaccurate',
              );
            }
          } else oe = !ne && B.currentStyle && B.currentStyle[se];
          return oe;
        }
        function o(B, ne) {
          var se = B.length;
          if (h && h.CSS && 'supports' in h.CSS) {
            for (; se--; ) if (h.CSS.supports(e(B[se]), ne)) return !0;
            return !1;
          }
          if ('CSSSupportsRule' in h) {
            for (var oe = []; se--; ) oe.push('(' + e(B[se]) + ':' + ne + ')');
            return (
              (oe = oe.join(' or ')),
              t('@supports (' + oe + ') { #modernizr { position: absolute; } }', function (ge) {
                return l(ge, null, 'position') === 'absolute';
              })
            );
          }
          return n;
        }
        function x(B) {
          return B.replace(/([a-z])-([a-z])/g, function (ne, se, oe) {
            return se + oe.toUpperCase();
          }).replace(/^-/, '');
        }
        function v(B, ne, se, oe) {
          function ge() {
            Te && (delete H.style, delete H.modElem);
          }
          if (((oe = !r(oe, 'undefined') && oe), !r(se, 'undefined'))) {
            var De = o(B, se);
            if (!r(De, 'undefined')) return De;
          }
          for (var Te, Fe, Re, Le, Oe, Xe = ['modernizr', 'tspan', 'samp']; !H.style && Xe.length; )
            (Te = !0), (H.modElem = a(Xe.shift())), (H.style = H.modElem.style);
          for (Re = B.length, Fe = 0; Fe < Re; Fe++)
            if (((Le = B[Fe]), (Oe = H.style[Le]), s(Le, '-') && (Le = x(Le)), H.style[Le] !== n)) {
              if (oe || r(se, 'undefined')) return ge(), ne !== 'pfx' || Le;
              try {
                H.style[Le] = se;
              } catch {}
              if (H.style[Le] !== Oe) return ge(), ne !== 'pfx' || Le;
            }
          return ge(), !1;
        }
        function y(B, ne) {
          return function () {
            return B.apply(ne, arguments);
          };
        }
        function L(B, ne, se) {
          var oe;
          for (var ge in B)
            if (B[ge] in ne)
              return se === !1
                ? B[ge]
                : ((oe = ne[B[ge]]), r(oe, 'function') ? y(oe, se || ne) : oe);
          return !1;
        }
        function g(B, ne, se, oe, ge) {
          var De = B.charAt(0).toUpperCase() + B.slice(1),
            Te = (B + ' ' + k.join(De + ' ') + De).split(' ');
          return r(ne, 'string') || r(ne, 'undefined')
            ? v(Te, ne, oe, ge)
            : ((Te = (B + ' ' + ee.join(De + ' ') + De).split(' ')), L(Te, ne, se));
        }
        function E(B, ne, se) {
          return g(B, n, n, ne, se);
        }
        var f = [],
          m = {
            _version: '3.13.0',
            _config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function (B, ne) {
              var se = this;
              setTimeout(function () {
                ne(se[B]);
              }, 0);
            },
            addTest: function (B, ne, se) {
              f.push({ name: B, fn: ne, options: se });
            },
            addAsyncTest: function (B) {
              f.push({ name: null, fn: B });
            },
          },
          w = function () {};
        (w.prototype = m), (w = new w());
        var S = [],
          U = p.documentElement,
          T = U.nodeName.toLowerCase() === 'svg',
          O = (function () {
            function B(se, oe) {
              var ge;
              return (
                !!se &&
                ((oe && typeof oe != 'string') || (oe = a(oe || 'div')),
                (se = 'on' + se),
                (ge = se in oe),
                !ge &&
                  ne &&
                  (oe.setAttribute || (oe = a('div')),
                  oe.setAttribute(se, ''),
                  (ge = typeof oe[se] == 'function'),
                  oe[se] !== n && (oe[se] = n),
                  oe.removeAttribute(se)),
                ge)
              );
            }
            var ne = !('onblur' in U);
            return B;
          })();
        (m.hasEvent = O),
          w.addTest('ambientlight', O('devicelight', h)),
          w.addTest('applicationcache', 'applicationCache' in h),
          (function () {
            var B = a('audio');
            w.addTest('audio', function () {
              var ne = !1;
              try {
                (ne = !!B.canPlayType), ne && (ne = new Boolean(ne));
              } catch {}
              return ne;
            });
            try {
              B.canPlayType &&
                (w.addTest(
                  'audio.ogg',
                  B.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'audio.mp3',
                  B.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'audio.opus',
                  B.canPlayType('audio/ogg; codecs="opus"') ||
                    B.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ''),
                ),
                w.addTest('audio.wav', B.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')),
                w.addTest(
                  'audio.m4a',
                  (B.canPlayType('audio/x-m4a;') || B.canPlayType('audio/aac;')).replace(
                    /^no$/,
                    '',
                  ),
                ));
            } catch {}
          })();
        var C = 'Moz O ms Webkit',
          k = m._config.usePrefixes ? C.split(' ') : [];
        m._cssomPrefixes = k;
        var R = { elem: a('modernizr') };
        w._q.push(function () {
          delete R.elem;
        });
        var H = { style: R.elem.style };
        w._q.unshift(function () {
          delete H.style;
        });
        var ee = m._config.usePrefixes ? C.toLowerCase().split(' ') : [];
        (m._domPrefixes = ee), (m.testAllProps = g);
        var M = function (B) {
          var ne,
            se = q.length,
            oe = h.CSSRule;
          if (oe === void 0) return n;
          if (!B) return !1;
          if (
            ((B = B.replace(/^@/, '')), (ne = B.replace(/-/g, '_').toUpperCase() + '_RULE') in oe)
          )
            return '@' + B;
          for (var ge = 0; ge < se; ge++) {
            var De = q[ge];
            if (De.toUpperCase() + '_' + ne in oe) return '@-' + De.toLowerCase() + '-' + B;
          }
          return !1;
        };
        m.atRule = M;
        var K = (m.prefixed = function (B, ne, se) {
          return B.indexOf('@') === 0
            ? M(B)
            : (B.indexOf('-') !== -1 && (B = x(B)), ne ? g(B, ne, se) : g(B, 'pfx'));
        });
        w.addTest('batteryapi', !!K('battery', navigator) || !!K('getBattery', navigator), {
          aliases: ['battery-api'],
        }),
          w.addTest(
            'blobconstructor',
            function () {
              try {
                return !!new Blob();
              } catch {
                return !1;
              }
            },
            { aliases: ['blob-constructor'] },
          ),
          w.addTest('contextmenu', 'contextMenu' in U && 'HTMLMenuItemElement' in h),
          w.addTest('cors', 'XMLHttpRequest' in h && 'withCredentials' in new XMLHttpRequest());
        var Z = K('crypto', h);
        w.addTest('crypto', !!K('subtle', Z)),
          w.addTest('customelements', 'customElements' in h),
          w.addTest('customprotocolhandler', function () {
            if (!navigator.registerProtocolHandler) return !1;
            try {
              navigator.registerProtocolHandler('thisShouldFail');
            } catch (B) {
              return B instanceof TypeError;
            }
            return !1;
          }),
          w.addTest('customevent', 'CustomEvent' in h && typeof h.CustomEvent == 'function'),
          w.addTest('dart', !!K('startDart', navigator)),
          w.addTest(
            'dataview',
            typeof DataView != 'undefined' && 'getFloat64' in DataView.prototype,
          ),
          w.addTest('eventlistener', 'addEventListener' in h),
          w.addTest('forcetouch', function () {
            return (
              !!O(K('mouseforcewillbegin', h, !1), h) &&
              MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN &&
              MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN
            );
          }),
          w.addTest('fullscreen', !(!K('exitFullscreen', p, !1) && !K('cancelFullScreen', p, !1))),
          w.addTest('gamepads', !!K('getGamepads', navigator)),
          w.addTest('geolocation', 'geolocation' in navigator),
          w.addTest('ie8compat', !h.addEventListener && !!p.documentMode && p.documentMode === 7),
          w.addTest('intl', !!K('Intl', h)),
          w.addTest('json', 'JSON' in h && 'parse' in JSON && 'stringify' in JSON),
          (m.testAllProps = E),
          w.addTest('ligatures', E('fontFeatureSettings', '"liga" 1')),
          w.addTest('messagechannel', 'MessageChannel' in h),
          w.addTest('notification', function () {
            if (!h.Notification || !h.Notification.requestPermission) return !1;
            if (h.Notification.permission === 'granted') return !0;
            try {
              new h.Notification('');
            } catch (B) {
              if (B.name === 'TypeError') return !1;
            }
            return !0;
          }),
          w.addTest('pagevisibility', !!K('hidden', p, !1)),
          w.addTest('performance', !!K('performance', h));
        var le = [''].concat(ee);
        (m._domPrefixesAll = le),
          w.addTest('pointerevents', function () {
            for (var B = 0, ne = le.length; B < ne; B++) if (O(le[B] + 'pointerdown')) return !0;
            return !1;
          }),
          w.addTest('pointerlock', !!K('exitPointerLock', p)),
          w.addTest('queryselector', 'querySelector' in p && 'querySelectorAll' in p),
          w.addTest('quotamanagement', function () {
            var B = K('temporaryStorage', navigator),
              ne = K('persistentStorage', navigator);
            return !(!B || !ne);
          }),
          w.addTest('requestanimationframe', !!K('requestAnimationFrame', h), { aliases: ['raf'] }),
          w.addTest('serviceworker', 'serviceWorker' in navigator);
        var q = m._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
        m._prefixes = q;
        var be = (function () {
          var B = h.matchMedia || h.msMatchMedia;
          return B
            ? function (ne) {
                var se = B(ne);
                return (se && se.matches) || !1;
              }
            : function (ne) {
                var se = !1;
                return (
                  t('@media ' + ne + ' { #modernizr { position: absolute; } }', function (oe) {
                    se = l(oe, null, 'position') === 'absolute';
                  }),
                  se
                );
              };
        })();
        (m.mq = be),
          w.addTest('touchevents', function () {
            if (
              'ontouchstart' in h ||
              h.TouchEvent ||
              (h.DocumentTouch && p instanceof DocumentTouch)
            )
              return !0;
            var B = ['(', q.join('touch-enabled),('), 'heartz', ')'].join('');
            return be(B);
          }),
          w.addTest('typedarrays', 'ArrayBuffer' in h),
          w.addTest('vibrate', !!K('vibrate', navigator)),
          (function () {
            var B = a('video');
            w.addTest('video', function () {
              var ne = !1;
              try {
                (ne = !!B.canPlayType), ne && (ne = new Boolean(ne));
              } catch {}
              return ne;
            });
            try {
              B.canPlayType &&
                (w.addTest(
                  'video.ogg',
                  B.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'video.h264',
                  B.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'video.h265',
                  B.canPlayType('video/mp4; codecs="hev1"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'video.webm',
                  B.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'video.vp9',
                  B.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'video.hls',
                  B.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ''),
                ),
                w.addTest(
                  'video.av1',
                  B.canPlayType('video/mp4; codecs="av01"').replace(/^no$/, ''),
                ));
            } catch {}
          })(),
          w.addTest('webgl', function () {
            return 'WebGLRenderingContext' in h;
          });
        var we = !1;
        try {
          we = 'WebSocket' in h && h.WebSocket.CLOSING === 2;
        } catch {}
        w.addTest('websockets', we),
          w.addTest('xdomainrequest', 'XDomainRequest' in h),
          w.addTest('matchmedia', !!K('matchMedia', h)),
          (function () {
            var B, ne, se, oe, ge, De, Te;
            for (var Fe in f)
              if (f.hasOwnProperty(Fe)) {
                if (
                  ((B = []),
                  (ne = f[Fe]),
                  ne.name &&
                    (B.push(ne.name.toLowerCase()),
                    ne.options && ne.options.aliases && ne.options.aliases.length))
                )
                  for (se = 0; se < ne.options.aliases.length; se++)
                    B.push(ne.options.aliases[se].toLowerCase());
                for (oe = r(ne.fn, 'function') ? ne.fn() : ne.fn, ge = 0; ge < B.length; ge++)
                  (De = B[ge]),
                    (Te = De.split('.')),
                    Te.length === 1
                      ? (w[Te[0]] = oe)
                      : ((w[Te[0]] && (!w[Te[0]] || w[Te[0]] instanceof Boolean)) ||
                          (w[Te[0]] = new Boolean(w[Te[0]])),
                        (w[Te[0]][Te[1]] = oe)),
                    S.push((oe ? '' : 'no-') + Te.join('-'));
              }
          })(),
          delete m.addTest,
          delete m.addAsyncTest;
        for (var He = 0; He < w._q.length; He++) w._q[He]();
        c.Modernizr = w;
      })(_POSignalsEntities || (_POSignalsEntities = {}), window, document);
    }),
    (function (c) {
      c.AiaSignals = (function (h) {
        'use strict';
        var p = [
            { name: 'IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', value: !1, error: null },
            { name: 'FILE_INJECT_JS_FOUND', value: !1, error: null },
            { name: 'FILE_CONTENT_JS_FOUND', value: !1, error: null },
            { name: 'WINDOW_GLOBAL_KEY_FOUND', value: !1, error: null },
          ],
          n = { webAuthn: 1e3, manus: 5e3, anchor: 5e3, skyvern: 5e3, detect: 1e4 };
        function r(x) {
          for (var v = 0; v < p.length; v++) if (p[v].name === x) return p[v];
          return null;
        }
        function a(x, v) {
          var y = r(x);
          y && ((y.value = v), (y.error = null));
        }
        function s(x, v, y) {
          var L = r(x);
          L && ((L.value = v), (L.error = y));
        }
        function i() {
          return new Promise(function (x) {
            var v = setTimeout(function () {
              x(p);
            }, n.detect);
            t()
              .then(function (y) {
                var L = r('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE');
                if (L && L.value) {
                  clearTimeout(v), x(p);
                  return;
                }
                for (
                  var g = [
                      e().then(function (w) {
                        return { key: 'manus', result: w };
                      }),
                      l().then(function (w) {
                        return { key: 'anchor', result: w };
                      }),
                      o().then(function (w) {
                        return { key: 'skyvern', result: w };
                      }),
                    ],
                    E = 0,
                    f = function () {
                      E++, E === g.length && (clearTimeout(v), x(p));
                    },
                    m = 0;
                  m < g.length;
                  m++
                )
                  (function (w) {
                    w.then(f).catch(function () {
                      f();
                    });
                  })(g[m]);
              })
              .catch(function () {
                clearTimeout(v), x(p);
              });
          });
        }
        function t() {
          return new Promise(function (x) {
            var v = n.webAuthn,
              y = setTimeout(function () {
                s('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1004), x(p);
              }, v);
            try {
              window.PublicKeyCredential &&
              typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable == 'function'
                ? PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
                    .then(function (L) {
                      clearTimeout(y),
                        L
                          ? a('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !0)
                          : s('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1001),
                        x(p);
                    })
                    .catch(function () {
                      clearTimeout(y),
                        s('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1002),
                        x(p);
                    })
                : (clearTimeout(y),
                  s('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1003),
                  x(p));
            } catch {
              clearTimeout(y),
                s('IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE', !1, 1002),
                x(p);
            }
          });
        }
        function e() {
          return new Promise(function (x) {
            var v = n.manus,
              y;
            function L() {
              clearTimeout(y), a('FILE_CONTENT_JS_FOUND', !0), x(p);
            }
            function g() {
              s('FILE_CONTENT_JS_FOUND', !1, 2001), x(p);
            }
            var E = document.createElement('script');
            (E.src = 'chrome-extension://mljmkmodkfigdopcpgboaalildgijkoc/content.ts.js'),
              (E.onload = L),
              (E.onerror = function () {
                clearTimeout(y), s('FILE_CONTENT_JS_FOUND', !1, 2002), x(p);
              }),
              document.getElementsByTagName('head')[0].appendChild(E),
              (y = setTimeout(g, v));
          });
        }
        function l() {
          return new Promise(function (x) {
            var v = n.anchor,
              y;
            function L() {
              clearTimeout(y), a('FILE_INJECT_JS_FOUND', !0), x(p);
            }
            function g() {
              s('FILE_INJECT_JS_FOUND', !1, 4001), x(p);
            }
            var E = document.createElement('script');
            (E.src = 'chrome-extension://bppehibnhionalpjigdjdilknbljaeai/inject.js'),
              (E.onload = L),
              (E.onerror = function () {
                clearTimeout(y), s('FILE_INJECT_JS_FOUND', !1, 4002), x(p);
              }),
              document.getElementsByTagName('head')[0].appendChild(E),
              (y = setTimeout(g, v));
          });
        }
        function o() {
          return new Promise(function (x) {
            var v = n.skyvern,
              y = 1e3,
              L = 0;
            function g() {
              if (
                window.globalDomDepthMap ||
                window.GlobalEnableAllTextualElements ||
                window.globalObserverForDOMIncrement ||
                window.globalListnerFlag ||
                window.globalDomDepthMap ||
                window.globalOneTimeIncrementElements ||
                window.globalHoverStylesMap ||
                window.globalParsedElementCounter
              ) {
                a('WINDOW_GLOBAL_KEY_FOUND', !0), x(p);
                return;
              }
              for (var E in window)
                if (typeof E == 'string') {
                  var f = E.toLowerCase();
                  if (f.indexOf('skyvern') !== -1 && E !== 'isSkyvern') {
                    a('WINDOW_GLOBAL_KEY_FOUND', !0), x(p);
                    return;
                  }
                }
              (L += y), L >= v ? (s('WINDOW_GLOBAL_KEY_FOUND', !1, 5002), x(p)) : setTimeout(g, y);
            }
            document.readyState === 'loading'
              ? document.addEventListener('DOMContentLoaded', g)
              : g();
          });
        }
        return (
          (h.detect = i),
          (h.checkWebAuthnPlatformSupport = t),
          (h.isManus = e),
          (h.isAnchor = l),
          (h.isSkyvern = o),
          Object.defineProperty(h, '__esModule', { value: !0 }),
          h
        );
      })({});
    })(typeof _POSignalsEntities != 'undefined' ? _POSignalsEntities : (_POSignalsEntities = {})),
    (function (c) {
      (_POSignalsEntities || (_POSignalsEntities = {})).pako = c();
    })(function () {
      return (function c(h, p, n) {
        function r(i, t) {
          if (!p[i]) {
            if (!h[i]) {
              var e = typeof require == 'function' && require;
              if (!t && e) return e(i, !0);
              if (a) return a(i, !0);
              var l = new Error("Cannot find module '" + i + "'");
              throw ((l.code = 'MODULE_NOT_FOUND'), l);
            }
            var o = (p[i] = { exports: {} });
            h[i][0].call(
              o.exports,
              function (x) {
                var v = h[i][1][x];
                return r(v || x);
              },
              o,
              o.exports,
              c,
              h,
              p,
              n,
            );
          }
          return p[i].exports;
        }
        for (var a = typeof require == 'function' && require, s = 0; s < n.length; s++) r(n[s]);
        return r;
      })(
        {
          1: [
            function (c, h, p) {
              'use strict';
              function n(i, t) {
                return Object.prototype.hasOwnProperty.call(i, t);
              }
              var r =
                typeof Uint8Array != 'undefined' &&
                typeof Uint16Array != 'undefined' &&
                typeof Int32Array != 'undefined';
              (p.assign = function (i) {
                for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
                  var e = t.shift();
                  if (e) {
                    if (typeof e != 'object') throw new TypeError(e + 'must be non-object');
                    for (var l in e) n(e, l) && (i[l] = e[l]);
                  }
                }
                return i;
              }),
                (p.shrinkBuf = function (i, t) {
                  return i.length === t ? i : i.subarray ? i.subarray(0, t) : ((i.length = t), i);
                });
              var a = {
                  arraySet: function (i, t, e, l, o) {
                    if (t.subarray && i.subarray) i.set(t.subarray(e, e + l), o);
                    else for (var x = 0; x < l; x++) i[o + x] = t[e + x];
                  },
                  flattenChunks: function (i) {
                    var t, e, l, o, x, v;
                    for (l = 0, t = 0, e = i.length; t < e; t++) l += i[t].length;
                    for (v = new Uint8Array(l), o = 0, t = 0, e = i.length; t < e; t++)
                      (x = i[t]), v.set(x, o), (o += x.length);
                    return v;
                  },
                },
                s = {
                  arraySet: function (i, t, e, l, o) {
                    for (var x = 0; x < l; x++) i[o + x] = t[e + x];
                  },
                  flattenChunks: function (i) {
                    return [].concat.apply([], i);
                  },
                };
              (p.setTyped = function (i) {
                i
                  ? ((p.Buf8 = Uint8Array),
                    (p.Buf16 = Uint16Array),
                    (p.Buf32 = Int32Array),
                    p.assign(p, a))
                  : ((p.Buf8 = Array), (p.Buf16 = Array), (p.Buf32 = Array), p.assign(p, s));
              }),
                p.setTyped(r);
            },
            {},
          ],
          2: [
            function (c, h, p) {
              'use strict';
              function n(e, l) {
                if (l < 65537 && ((e.subarray && s) || (!e.subarray && a)))
                  return String.fromCharCode.apply(null, r.shrinkBuf(e, l));
                for (var o = '', x = 0; x < l; x++) o += String.fromCharCode(e[x]);
                return o;
              }
              var r = c('./common'),
                a = !0,
                s = !0;
              try {
                String.fromCharCode.apply(null, [0]);
              } catch {
                a = !1;
              }
              try {
                String.fromCharCode.apply(null, new Uint8Array(1));
              } catch {
                s = !1;
              }
              for (var i = new r.Buf8(256), t = 0; t < 256; t++)
                i[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
              (i[254] = i[254] = 1),
                (p.string2buf = function (e) {
                  var l,
                    o,
                    x,
                    v,
                    y,
                    L = e.length,
                    g = 0;
                  for (v = 0; v < L; v++)
                    (64512 & (o = e.charCodeAt(v))) == 55296 &&
                      v + 1 < L &&
                      (64512 & (x = e.charCodeAt(v + 1))) == 56320 &&
                      ((o = 65536 + ((o - 55296) << 10) + (x - 56320)), v++),
                      (g += o < 128 ? 1 : o < 2048 ? 2 : o < 65536 ? 3 : 4);
                  for (l = new r.Buf8(g), y = 0, v = 0; y < g; v++)
                    (64512 & (o = e.charCodeAt(v))) == 55296 &&
                      v + 1 < L &&
                      (64512 & (x = e.charCodeAt(v + 1))) == 56320 &&
                      ((o = 65536 + ((o - 55296) << 10) + (x - 56320)), v++),
                      o < 128
                        ? (l[y++] = o)
                        : o < 2048
                          ? ((l[y++] = 192 | (o >>> 6)), (l[y++] = 128 | (63 & o)))
                          : o < 65536
                            ? ((l[y++] = 224 | (o >>> 12)),
                              (l[y++] = 128 | ((o >>> 6) & 63)),
                              (l[y++] = 128 | (63 & o)))
                            : ((l[y++] = 240 | (o >>> 18)),
                              (l[y++] = 128 | ((o >>> 12) & 63)),
                              (l[y++] = 128 | ((o >>> 6) & 63)),
                              (l[y++] = 128 | (63 & o)));
                  return l;
                }),
                (p.buf2binstring = function (e) {
                  return n(e, e.length);
                }),
                (p.binstring2buf = function (e) {
                  for (var l = new r.Buf8(e.length), o = 0, x = l.length; o < x; o++)
                    l[o] = e.charCodeAt(o);
                  return l;
                }),
                (p.buf2string = function (e, l) {
                  var o,
                    x,
                    v,
                    y,
                    L = l || e.length,
                    g = new Array(2 * L);
                  for (x = 0, o = 0; o < L; )
                    if ((v = e[o++]) < 128) g[x++] = v;
                    else if ((y = i[v]) > 4) (g[x++] = 65533), (o += y - 1);
                    else {
                      for (v &= y === 2 ? 31 : y === 3 ? 15 : 7; y > 1 && o < L; )
                        (v = (v << 6) | (63 & e[o++])), y--;
                      y > 1
                        ? (g[x++] = 65533)
                        : v < 65536
                          ? (g[x++] = v)
                          : ((v -= 65536),
                            (g[x++] = 55296 | ((v >> 10) & 1023)),
                            (g[x++] = 56320 | (1023 & v)));
                    }
                  return n(g, x);
                }),
                (p.utf8border = function (e, l) {
                  var o;
                  for (
                    (l = l || e.length) > e.length && (l = e.length), o = l - 1;
                    o >= 0 && (192 & e[o]) == 128;

                  )
                    o--;
                  return o < 0 || o === 0 ? l : o + i[e[o]] > l ? o : l;
                });
            },
            { './common': 1 },
          ],
          3: [
            function (c, h, p) {
              'use strict';
              h.exports = function (n, r, a, s) {
                for (var i = (65535 & n) | 0, t = ((n >>> 16) & 65535) | 0, e = 0; a !== 0; ) {
                  a -= e = a > 2e3 ? 2e3 : a;
                  do t = (t + (i = (i + r[s++]) | 0)) | 0;
                  while (--e);
                  (i %= 65521), (t %= 65521);
                }
                return i | (t << 16) | 0;
              };
            },
            {},
          ],
          4: [
            function (c, h, p) {
              'use strict';
              var n = (function () {
                for (var r, a = [], s = 0; s < 256; s++) {
                  r = s;
                  for (var i = 0; i < 8; i++) r = 1 & r ? 3988292384 ^ (r >>> 1) : r >>> 1;
                  a[s] = r;
                }
                return a;
              })();
              h.exports = function (r, a, s, i) {
                var t = n,
                  e = i + s;
                r ^= -1;
                for (var l = i; l < e; l++) r = (r >>> 8) ^ t[255 & (r ^ a[l])];
                return -1 ^ r;
              };
            },
            {},
          ],
          5: [
            function (c, h, p) {
              'use strict';
              function n(d, F) {
                return (d.msg = H[F]), F;
              }
              function r(d) {
                return (d << 1) - (d > 4 ? 9 : 0);
              }
              function a(d) {
                for (var F = d.length; --F >= 0; ) d[F] = 0;
              }
              function s(d) {
                var F = d.state,
                  G = F.pending;
                G > d.avail_out && (G = d.avail_out),
                  G !== 0 &&
                    (O.arraySet(d.output, F.pending_buf, F.pending_out, G, d.next_out),
                    (d.next_out += G),
                    (F.pending_out += G),
                    (d.total_out += G),
                    (d.avail_out -= G),
                    (F.pending -= G),
                    F.pending === 0 && (F.pending_out = 0));
              }
              function i(d, F) {
                C._tr_flush_block(
                  d,
                  d.block_start >= 0 ? d.block_start : -1,
                  d.strstart - d.block_start,
                  F,
                ),
                  (d.block_start = d.strstart),
                  s(d.strm);
              }
              function t(d, F) {
                d.pending_buf[d.pending++] = F;
              }
              function e(d, F) {
                (d.pending_buf[d.pending++] = (F >>> 8) & 255),
                  (d.pending_buf[d.pending++] = 255 & F);
              }
              function l(d, F, G, A) {
                var re = d.avail_in;
                return (
                  re > A && (re = A),
                  re === 0
                    ? 0
                    : ((d.avail_in -= re),
                      O.arraySet(F, d.input, d.next_in, re, G),
                      d.state.wrap === 1
                        ? (d.adler = k(d.adler, F, re, G))
                        : d.state.wrap === 2 && (d.adler = R(d.adler, F, re, G)),
                      (d.next_in += re),
                      (d.total_in += re),
                      re)
                );
              }
              function o(d, F) {
                var G,
                  A,
                  re = d.max_chain_length,
                  de = d.strstart,
                  ce = d.prev_length,
                  fe = d.nice_match,
                  We = d.strstart > d.w_size - Pe ? d.strstart - (d.w_size - Pe) : 0,
                  ye = d.window,
                  at = d.w_mask,
                  mt = d.prev,
                  xt = d.strstart + Ge,
                  st = ye[de + ce - 1],
                  ot = ye[de + ce];
                d.prev_length >= d.good_match && (re >>= 2), fe > d.lookahead && (fe = d.lookahead);
                do
                  if (
                    ((G = F),
                    ye[G + ce] === ot &&
                      ye[G + ce - 1] === st &&
                      ye[G] === ye[de] &&
                      ye[++G] === ye[de + 1])
                  ) {
                    (de += 2), G++;
                    do;
                    while (
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      ye[++de] === ye[++G] &&
                      de < xt
                    );
                    if (((A = Ge - (xt - de)), (de = xt - Ge), A > ce)) {
                      if (((d.match_start = F), (ce = A), A >= fe)) break;
                      (st = ye[de + ce - 1]), (ot = ye[de + ce]);
                    }
                  }
                while ((F = mt[F & at]) > We && --re != 0);
                return ce <= d.lookahead ? ce : d.lookahead;
              }
              function x(d) {
                var F,
                  G,
                  A,
                  re,
                  de,
                  ce = d.w_size;
                do {
                  if (
                    ((re = d.window_size - d.lookahead - d.strstart), d.strstart >= ce + (ce - Pe))
                  ) {
                    O.arraySet(d.window, d.window, ce, ce, 0),
                      (d.match_start -= ce),
                      (d.strstart -= ce),
                      (d.block_start -= ce),
                      (F = G = d.hash_size);
                    do (A = d.head[--F]), (d.head[F] = A >= ce ? A - ce : 0);
                    while (--G);
                    F = G = ce;
                    do (A = d.prev[--F]), (d.prev[F] = A >= ce ? A - ce : 0);
                    while (--G);
                    re += ce;
                  }
                  if (d.strm.avail_in === 0) break;
                  if (
                    ((G = l(d.strm, d.window, d.strstart + d.lookahead, re)),
                    (d.lookahead += G),
                    d.lookahead + d.insert >= _e)
                  )
                    for (
                      de = d.strstart - d.insert,
                        d.ins_h = d.window[de],
                        d.ins_h = ((d.ins_h << d.hash_shift) ^ d.window[de + 1]) & d.hash_mask;
                      d.insert &&
                      ((d.ins_h =
                        ((d.ins_h << d.hash_shift) ^ d.window[de + _e - 1]) & d.hash_mask),
                      (d.prev[de & d.w_mask] = d.head[d.ins_h]),
                      (d.head[d.ins_h] = de),
                      de++,
                      d.insert--,
                      !(d.lookahead + d.insert < _e));

                    );
                } while (d.lookahead < Pe && d.strm.avail_in !== 0);
              }
              function v(d, F) {
                for (var G, A; ; ) {
                  if (d.lookahead < Pe) {
                    if ((x(d), d.lookahead < Pe && F === ee)) return j;
                    if (d.lookahead === 0) break;
                  }
                  if (
                    ((G = 0),
                    d.lookahead >= _e &&
                      ((d.ins_h =
                        ((d.ins_h << d.hash_shift) ^ d.window[d.strstart + _e - 1]) & d.hash_mask),
                      (G = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h]),
                      (d.head[d.ins_h] = d.strstart)),
                    G !== 0 && d.strstart - G <= d.w_size - Pe && (d.match_length = o(d, G)),
                    d.match_length >= _e)
                  )
                    if (
                      ((A = C._tr_tally(d, d.strstart - d.match_start, d.match_length - _e)),
                      (d.lookahead -= d.match_length),
                      d.match_length <= d.max_lazy_match && d.lookahead >= _e)
                    ) {
                      d.match_length--;
                      do
                        d.strstart++,
                          (d.ins_h =
                            ((d.ins_h << d.hash_shift) ^ d.window[d.strstart + _e - 1]) &
                            d.hash_mask),
                          (G = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h]),
                          (d.head[d.ins_h] = d.strstart);
                      while (--d.match_length != 0);
                      d.strstart++;
                    } else
                      (d.strstart += d.match_length),
                        (d.match_length = 0),
                        (d.ins_h = d.window[d.strstart]),
                        (d.ins_h =
                          ((d.ins_h << d.hash_shift) ^ d.window[d.strstart + 1]) & d.hash_mask);
                  else (A = C._tr_tally(d, 0, d.window[d.strstart])), d.lookahead--, d.strstart++;
                  if (A && (i(d, !1), d.strm.avail_out === 0)) return j;
                }
                return (
                  (d.insert = d.strstart < _e - 1 ? d.strstart : _e - 1),
                  F === Z
                    ? (i(d, !0), d.strm.avail_out === 0 ? ae : ve)
                    : d.last_lit && (i(d, !1), d.strm.avail_out === 0)
                      ? j
                      : ie
                );
              }
              function y(d, F) {
                for (var G, A, re; ; ) {
                  if (d.lookahead < Pe) {
                    if ((x(d), d.lookahead < Pe && F === ee)) return j;
                    if (d.lookahead === 0) break;
                  }
                  if (
                    ((G = 0),
                    d.lookahead >= _e &&
                      ((d.ins_h =
                        ((d.ins_h << d.hash_shift) ^ d.window[d.strstart + _e - 1]) & d.hash_mask),
                      (G = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h]),
                      (d.head[d.ins_h] = d.strstart)),
                    (d.prev_length = d.match_length),
                    (d.prev_match = d.match_start),
                    (d.match_length = _e - 1),
                    G !== 0 &&
                      d.prev_length < d.max_lazy_match &&
                      d.strstart - G <= d.w_size - Pe &&
                      ((d.match_length = o(d, G)),
                      d.match_length <= 5 &&
                        (d.strategy === se ||
                          (d.match_length === _e && d.strstart - d.match_start > 4096)) &&
                        (d.match_length = _e - 1)),
                    d.prev_length >= _e && d.match_length <= d.prev_length)
                  ) {
                    (re = d.strstart + d.lookahead - _e),
                      (A = C._tr_tally(d, d.strstart - 1 - d.prev_match, d.prev_length - _e)),
                      (d.lookahead -= d.prev_length - 1),
                      (d.prev_length -= 2);
                    do
                      ++d.strstart <= re &&
                        ((d.ins_h =
                          ((d.ins_h << d.hash_shift) ^ d.window[d.strstart + _e - 1]) &
                          d.hash_mask),
                        (G = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h]),
                        (d.head[d.ins_h] = d.strstart));
                    while (--d.prev_length != 0);
                    if (
                      ((d.match_available = 0),
                      (d.match_length = _e - 1),
                      d.strstart++,
                      A && (i(d, !1), d.strm.avail_out === 0))
                    )
                      return j;
                  } else if (d.match_available) {
                    if (
                      ((A = C._tr_tally(d, 0, d.window[d.strstart - 1])) && i(d, !1),
                      d.strstart++,
                      d.lookahead--,
                      d.strm.avail_out === 0)
                    )
                      return j;
                  } else (d.match_available = 1), d.strstart++, d.lookahead--;
                }
                return (
                  d.match_available &&
                    ((A = C._tr_tally(d, 0, d.window[d.strstart - 1])), (d.match_available = 0)),
                  (d.insert = d.strstart < _e - 1 ? d.strstart : _e - 1),
                  F === Z
                    ? (i(d, !0), d.strm.avail_out === 0 ? ae : ve)
                    : d.last_lit && (i(d, !1), d.strm.avail_out === 0)
                      ? j
                      : ie
                );
              }
              function L(d, F) {
                for (var G, A, re, de, ce = d.window; ; ) {
                  if (d.lookahead <= Ge) {
                    if ((x(d), d.lookahead <= Ge && F === ee)) return j;
                    if (d.lookahead === 0) break;
                  }
                  if (
                    ((d.match_length = 0),
                    d.lookahead >= _e &&
                      d.strstart > 0 &&
                      ((re = d.strstart - 1),
                      (A = ce[re]) === ce[++re] && A === ce[++re] && A === ce[++re]))
                  ) {
                    de = d.strstart + Ge;
                    do;
                    while (
                      A === ce[++re] &&
                      A === ce[++re] &&
                      A === ce[++re] &&
                      A === ce[++re] &&
                      A === ce[++re] &&
                      A === ce[++re] &&
                      A === ce[++re] &&
                      A === ce[++re] &&
                      re < de
                    );
                    (d.match_length = Ge - (de - re)),
                      d.match_length > d.lookahead && (d.match_length = d.lookahead);
                  }
                  if (
                    (d.match_length >= _e
                      ? ((G = C._tr_tally(d, 1, d.match_length - _e)),
                        (d.lookahead -= d.match_length),
                        (d.strstart += d.match_length),
                        (d.match_length = 0))
                      : ((G = C._tr_tally(d, 0, d.window[d.strstart])),
                        d.lookahead--,
                        d.strstart++),
                    G && (i(d, !1), d.strm.avail_out === 0))
                  )
                    return j;
                }
                return (
                  (d.insert = 0),
                  F === Z
                    ? (i(d, !0), d.strm.avail_out === 0 ? ae : ve)
                    : d.last_lit && (i(d, !1), d.strm.avail_out === 0)
                      ? j
                      : ie
                );
              }
              function g(d, F) {
                for (var G; ; ) {
                  if (d.lookahead === 0 && (x(d), d.lookahead === 0)) {
                    if (F === ee) return j;
                    break;
                  }
                  if (
                    ((d.match_length = 0),
                    (G = C._tr_tally(d, 0, d.window[d.strstart])),
                    d.lookahead--,
                    d.strstart++,
                    G && (i(d, !1), d.strm.avail_out === 0))
                  )
                    return j;
                }
                return (
                  (d.insert = 0),
                  F === Z
                    ? (i(d, !0), d.strm.avail_out === 0 ? ae : ve)
                    : d.last_lit && (i(d, !1), d.strm.avail_out === 0)
                      ? j
                      : ie
                );
              }
              function E(d, F, G, A, re) {
                (this.good_length = d),
                  (this.max_lazy = F),
                  (this.nice_length = G),
                  (this.max_chain = A),
                  (this.func = re);
              }
              function f(d) {
                (d.window_size = 2 * d.w_size),
                  a(d.head),
                  (d.max_lazy_match = T[d.level].max_lazy),
                  (d.good_match = T[d.level].good_length),
                  (d.nice_match = T[d.level].nice_length),
                  (d.max_chain_length = T[d.level].max_chain),
                  (d.strstart = 0),
                  (d.block_start = 0),
                  (d.lookahead = 0),
                  (d.insert = 0),
                  (d.match_length = d.prev_length = _e - 1),
                  (d.match_available = 0),
                  (d.ins_h = 0);
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
                  (this.method = Re),
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
                  (this.dyn_ltree = new O.Buf16(2 * Ke)),
                  (this.dyn_dtree = new O.Buf16(2 * (2 * pt + 1))),
                  (this.bl_tree = new O.Buf16(2 * (2 * Qe + 1))),
                  a(this.dyn_ltree),
                  a(this.dyn_dtree),
                  a(this.bl_tree),
                  (this.l_desc = null),
                  (this.d_desc = null),
                  (this.bl_desc = null),
                  (this.bl_count = new O.Buf16(it + 1)),
                  (this.heap = new O.Buf16(2 * $e + 1)),
                  a(this.heap),
                  (this.heap_len = 0),
                  (this.heap_max = 0),
                  (this.depth = new O.Buf16(2 * $e + 1)),
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
              function w(d) {
                var F;
                return d && d.state
                  ? ((d.total_in = d.total_out = 0),
                    (d.data_type = Fe),
                    (F = d.state),
                    (F.pending = 0),
                    (F.pending_out = 0),
                    F.wrap < 0 && (F.wrap = -F.wrap),
                    (F.status = F.wrap ? tt : W),
                    (d.adler = F.wrap === 2 ? 0 : 1),
                    (F.last_flush = ee),
                    C._tr_init(F),
                    q)
                  : n(d, we);
              }
              function S(d) {
                var F = w(d);
                return F === q && f(d.state), F;
              }
              function U(d, F, G, A, re, de) {
                if (!d) return we;
                var ce = 1;
                if (
                  (F === ne && (F = 6),
                  A < 0 ? ((ce = 0), (A = -A)) : A > 15 && ((ce = 2), (A -= 16)),
                  re < 1 ||
                    re > Le ||
                    G !== Re ||
                    A < 8 ||
                    A > 15 ||
                    F < 0 ||
                    F > 9 ||
                    de < 0 ||
                    de > De)
                )
                  return n(d, we);
                A === 8 && (A = 9);
                var fe = new m();
                return (
                  (d.state = fe),
                  (fe.strm = d),
                  (fe.wrap = ce),
                  (fe.gzhead = null),
                  (fe.w_bits = A),
                  (fe.w_size = 1 << fe.w_bits),
                  (fe.w_mask = fe.w_size - 1),
                  (fe.hash_bits = re + 7),
                  (fe.hash_size = 1 << fe.hash_bits),
                  (fe.hash_mask = fe.hash_size - 1),
                  (fe.hash_shift = ~~((fe.hash_bits + _e - 1) / _e)),
                  (fe.window = new O.Buf8(2 * fe.w_size)),
                  (fe.head = new O.Buf16(fe.hash_size)),
                  (fe.prev = new O.Buf16(fe.w_size)),
                  (fe.lit_bufsize = 1 << (re + 6)),
                  (fe.pending_buf_size = 4 * fe.lit_bufsize),
                  (fe.pending_buf = new O.Buf8(fe.pending_buf_size)),
                  (fe.d_buf = 1 * fe.lit_bufsize),
                  (fe.l_buf = 3 * fe.lit_bufsize),
                  (fe.level = F),
                  (fe.strategy = de),
                  (fe.method = G),
                  S(d)
                );
              }
              var T,
                O = c('../utils/common'),
                C = c('./trees'),
                k = c('./adler32'),
                R = c('./crc32'),
                H = c('./messages'),
                ee = 0,
                M = 1,
                K = 3,
                Z = 4,
                le = 5,
                q = 0,
                be = 1,
                we = -2,
                He = -3,
                B = -5,
                ne = -1,
                se = 1,
                oe = 2,
                ge = 3,
                De = 4,
                Te = 0,
                Fe = 2,
                Re = 8,
                Le = 9,
                Oe = 15,
                Xe = 8,
                $e = 286,
                pt = 30,
                Qe = 19,
                Ke = 2 * $e + 1,
                it = 15,
                _e = 3,
                Ge = 258,
                Pe = Ge + _e + 1,
                et = 32,
                tt = 42,
                rt = 69,
                nt = 73,
                Je = 91,
                _ = 103,
                W = 113,
                $ = 666,
                j = 1,
                ie = 2,
                ae = 3,
                ve = 4,
                Se = 3;
              (T = [
                new E(0, 0, 0, 0, function (d, F) {
                  var G = 65535;
                  for (G > d.pending_buf_size - 5 && (G = d.pending_buf_size - 5); ; ) {
                    if (d.lookahead <= 1) {
                      if ((x(d), d.lookahead === 0 && F === ee)) return j;
                      if (d.lookahead === 0) break;
                    }
                    (d.strstart += d.lookahead), (d.lookahead = 0);
                    var A = d.block_start + G;
                    if (
                      ((d.strstart === 0 || d.strstart >= A) &&
                        ((d.lookahead = d.strstart - A),
                        (d.strstart = A),
                        i(d, !1),
                        d.strm.avail_out === 0)) ||
                      (d.strstart - d.block_start >= d.w_size - Pe &&
                        (i(d, !1), d.strm.avail_out === 0))
                    )
                      return j;
                  }
                  return (
                    (d.insert = 0),
                    F === Z
                      ? (i(d, !0), d.strm.avail_out === 0 ? ae : ve)
                      : (d.strstart > d.block_start && (i(d, !1), d.strm.avail_out), j)
                  );
                }),
                new E(4, 4, 8, 4, v),
                new E(4, 5, 16, 8, v),
                new E(4, 6, 32, 32, v),
                new E(4, 4, 16, 16, y),
                new E(8, 16, 32, 32, y),
                new E(8, 16, 128, 128, y),
                new E(8, 32, 128, 256, y),
                new E(32, 128, 258, 1024, y),
                new E(32, 258, 258, 4096, y),
              ]),
                (p.deflateInit = function (d, F) {
                  return U(d, F, Re, Oe, Xe, Te);
                }),
                (p.deflateInit2 = U),
                (p.deflateReset = S),
                (p.deflateResetKeep = w),
                (p.deflateSetHeader = function (d, F) {
                  return d && d.state ? (d.state.wrap !== 2 ? we : ((d.state.gzhead = F), q)) : we;
                }),
                (p.deflate = function (d, F) {
                  var G, A, re, de;
                  if (!d || !d.state || F > le || F < 0) return d ? n(d, we) : we;
                  if (
                    ((A = d.state),
                    !d.output || (!d.input && d.avail_in !== 0) || (A.status === $ && F !== Z))
                  )
                    return n(d, d.avail_out === 0 ? B : we);
                  if (((A.strm = d), (G = A.last_flush), (A.last_flush = F), A.status === tt))
                    if (A.wrap === 2)
                      (d.adler = 0),
                        t(A, 31),
                        t(A, 139),
                        t(A, 8),
                        A.gzhead
                          ? (t(
                              A,
                              (A.gzhead.text ? 1 : 0) +
                                (A.gzhead.hcrc ? 2 : 0) +
                                (A.gzhead.extra ? 4 : 0) +
                                (A.gzhead.name ? 8 : 0) +
                                (A.gzhead.comment ? 16 : 0),
                            ),
                            t(A, 255 & A.gzhead.time),
                            t(A, (A.gzhead.time >> 8) & 255),
                            t(A, (A.gzhead.time >> 16) & 255),
                            t(A, (A.gzhead.time >> 24) & 255),
                            t(A, A.level === 9 ? 2 : A.strategy >= oe || A.level < 2 ? 4 : 0),
                            t(A, 255 & A.gzhead.os),
                            A.gzhead.extra &&
                              A.gzhead.extra.length &&
                              (t(A, 255 & A.gzhead.extra.length),
                              t(A, (A.gzhead.extra.length >> 8) & 255)),
                            A.gzhead.hcrc && (d.adler = R(d.adler, A.pending_buf, A.pending, 0)),
                            (A.gzindex = 0),
                            (A.status = rt))
                          : (t(A, 0),
                            t(A, 0),
                            t(A, 0),
                            t(A, 0),
                            t(A, 0),
                            t(A, A.level === 9 ? 2 : A.strategy >= oe || A.level < 2 ? 4 : 0),
                            t(A, Se),
                            (A.status = W));
                    else {
                      var ce = (Re + ((A.w_bits - 8) << 4)) << 8;
                      (ce |=
                        (A.strategy >= oe || A.level < 2
                          ? 0
                          : A.level < 6
                            ? 1
                            : A.level === 6
                              ? 2
                              : 3) << 6),
                        A.strstart !== 0 && (ce |= et),
                        (ce += 31 - (ce % 31)),
                        (A.status = W),
                        e(A, ce),
                        A.strstart !== 0 && (e(A, d.adler >>> 16), e(A, 65535 & d.adler)),
                        (d.adler = 1);
                    }
                  if (A.status === rt)
                    if (A.gzhead.extra) {
                      for (
                        re = A.pending;
                        A.gzindex < (65535 & A.gzhead.extra.length) &&
                        (A.pending !== A.pending_buf_size ||
                          (A.gzhead.hcrc &&
                            A.pending > re &&
                            (d.adler = R(d.adler, A.pending_buf, A.pending - re, re)),
                          s(d),
                          (re = A.pending),
                          A.pending !== A.pending_buf_size));

                      )
                        t(A, 255 & A.gzhead.extra[A.gzindex]), A.gzindex++;
                      A.gzhead.hcrc &&
                        A.pending > re &&
                        (d.adler = R(d.adler, A.pending_buf, A.pending - re, re)),
                        A.gzindex === A.gzhead.extra.length && ((A.gzindex = 0), (A.status = nt));
                    } else A.status = nt;
                  if (A.status === nt)
                    if (A.gzhead.name) {
                      re = A.pending;
                      do {
                        if (
                          A.pending === A.pending_buf_size &&
                          (A.gzhead.hcrc &&
                            A.pending > re &&
                            (d.adler = R(d.adler, A.pending_buf, A.pending - re, re)),
                          s(d),
                          (re = A.pending),
                          A.pending === A.pending_buf_size)
                        ) {
                          de = 1;
                          break;
                        }
                        (de =
                          A.gzindex < A.gzhead.name.length
                            ? 255 & A.gzhead.name.charCodeAt(A.gzindex++)
                            : 0),
                          t(A, de);
                      } while (de !== 0);
                      A.gzhead.hcrc &&
                        A.pending > re &&
                        (d.adler = R(d.adler, A.pending_buf, A.pending - re, re)),
                        de === 0 && ((A.gzindex = 0), (A.status = Je));
                    } else A.status = Je;
                  if (A.status === Je)
                    if (A.gzhead.comment) {
                      re = A.pending;
                      do {
                        if (
                          A.pending === A.pending_buf_size &&
                          (A.gzhead.hcrc &&
                            A.pending > re &&
                            (d.adler = R(d.adler, A.pending_buf, A.pending - re, re)),
                          s(d),
                          (re = A.pending),
                          A.pending === A.pending_buf_size)
                        ) {
                          de = 1;
                          break;
                        }
                        (de =
                          A.gzindex < A.gzhead.comment.length
                            ? 255 & A.gzhead.comment.charCodeAt(A.gzindex++)
                            : 0),
                          t(A, de);
                      } while (de !== 0);
                      A.gzhead.hcrc &&
                        A.pending > re &&
                        (d.adler = R(d.adler, A.pending_buf, A.pending - re, re)),
                        de === 0 && (A.status = _);
                    } else A.status = _;
                  if (
                    (A.status === _ &&
                      (A.gzhead.hcrc
                        ? (A.pending + 2 > A.pending_buf_size && s(d),
                          A.pending + 2 <= A.pending_buf_size &&
                            (t(A, 255 & d.adler),
                            t(A, (d.adler >> 8) & 255),
                            (d.adler = 0),
                            (A.status = W)))
                        : (A.status = W)),
                    A.pending !== 0)
                  ) {
                    if ((s(d), d.avail_out === 0)) return (A.last_flush = -1), q;
                  } else if (d.avail_in === 0 && r(F) <= r(G) && F !== Z) return n(d, B);
                  if (A.status === $ && d.avail_in !== 0) return n(d, B);
                  if (d.avail_in !== 0 || A.lookahead !== 0 || (F !== ee && A.status !== $)) {
                    var fe =
                      A.strategy === oe
                        ? g(A, F)
                        : A.strategy === ge
                          ? L(A, F)
                          : T[A.level].func(A, F);
                    if (((fe !== ae && fe !== ve) || (A.status = $), fe === j || fe === ae))
                      return d.avail_out === 0 && (A.last_flush = -1), q;
                    if (
                      fe === ie &&
                      (F === M
                        ? C._tr_align(A)
                        : F !== le &&
                          (C._tr_stored_block(A, 0, 0, !1),
                          F === K &&
                            (a(A.head),
                            A.lookahead === 0 &&
                              ((A.strstart = 0), (A.block_start = 0), (A.insert = 0)))),
                      s(d),
                      d.avail_out === 0)
                    )
                      return (A.last_flush = -1), q;
                  }
                  return F !== Z
                    ? q
                    : A.wrap <= 0
                      ? be
                      : (A.wrap === 2
                          ? (t(A, 255 & d.adler),
                            t(A, (d.adler >> 8) & 255),
                            t(A, (d.adler >> 16) & 255),
                            t(A, (d.adler >> 24) & 255),
                            t(A, 255 & d.total_in),
                            t(A, (d.total_in >> 8) & 255),
                            t(A, (d.total_in >> 16) & 255),
                            t(A, (d.total_in >> 24) & 255))
                          : (e(A, d.adler >>> 16), e(A, 65535 & d.adler)),
                        s(d),
                        A.wrap > 0 && (A.wrap = -A.wrap),
                        A.pending !== 0 ? q : be);
                }),
                (p.deflateEnd = function (d) {
                  var F;
                  return d && d.state
                    ? (F = d.state.status) !== tt &&
                      F !== rt &&
                      F !== nt &&
                      F !== Je &&
                      F !== _ &&
                      F !== W &&
                      F !== $
                      ? n(d, we)
                      : ((d.state = null), F === W ? n(d, He) : q)
                    : we;
                }),
                (p.deflateSetDictionary = function (d, F) {
                  var G,
                    A,
                    re,
                    de,
                    ce,
                    fe,
                    We,
                    ye,
                    at = F.length;
                  if (
                    !d ||
                    !d.state ||
                    ((G = d.state),
                    (de = G.wrap) === 2 || (de === 1 && G.status !== tt) || G.lookahead)
                  )
                    return we;
                  for (
                    de === 1 && (d.adler = k(d.adler, F, at, 0)),
                      G.wrap = 0,
                      at >= G.w_size &&
                        (de === 0 &&
                          (a(G.head), (G.strstart = 0), (G.block_start = 0), (G.insert = 0)),
                        (ye = new O.Buf8(G.w_size)),
                        O.arraySet(ye, F, at - G.w_size, G.w_size, 0),
                        (F = ye),
                        (at = G.w_size)),
                      ce = d.avail_in,
                      fe = d.next_in,
                      We = d.input,
                      d.avail_in = at,
                      d.next_in = 0,
                      d.input = F,
                      x(G);
                    G.lookahead >= _e;

                  ) {
                    (A = G.strstart), (re = G.lookahead - (_e - 1));
                    do
                      (G.ins_h = ((G.ins_h << G.hash_shift) ^ G.window[A + _e - 1]) & G.hash_mask),
                        (G.prev[A & G.w_mask] = G.head[G.ins_h]),
                        (G.head[G.ins_h] = A),
                        A++;
                    while (--re);
                    (G.strstart = A), (G.lookahead = _e - 1), x(G);
                  }
                  return (
                    (G.strstart += G.lookahead),
                    (G.block_start = G.strstart),
                    (G.insert = G.lookahead),
                    (G.lookahead = 0),
                    (G.match_length = G.prev_length = _e - 1),
                    (G.match_available = 0),
                    (d.next_in = fe),
                    (d.input = We),
                    (d.avail_in = ce),
                    (G.wrap = de),
                    q
                  );
                }),
                (p.deflateInfo = 'pako deflate (from Nodeca project)');
            },
            { '../utils/common': 1, './adler32': 3, './crc32': 4, './messages': 6, './trees': 7 },
          ],
          6: [
            function (c, h, p) {
              'use strict';
              h.exports = {
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
            function (c, h, p) {
              'use strict';
              function n(_) {
                for (var W = _.length; --W >= 0; ) _[W] = 0;
              }
              function r(_, W, $, j, ie) {
                (this.static_tree = _),
                  (this.extra_bits = W),
                  (this.extra_base = $),
                  (this.elems = j),
                  (this.max_length = ie),
                  (this.has_stree = _ && _.length);
              }
              function a(_, W) {
                (this.dyn_tree = _), (this.max_code = 0), (this.stat_desc = W);
              }
              function s(_) {
                return _ < 256 ? _e[_] : _e[256 + (_ >>> 7)];
              }
              function i(_, W) {
                (_.pending_buf[_.pending++] = 255 & W),
                  (_.pending_buf[_.pending++] = (W >>> 8) & 255);
              }
              function t(_, W, $) {
                _.bi_valid > De - $
                  ? ((_.bi_buf |= (W << _.bi_valid) & 65535),
                    i(_, _.bi_buf),
                    (_.bi_buf = W >> (De - _.bi_valid)),
                    (_.bi_valid += $ - De))
                  : ((_.bi_buf |= (W << _.bi_valid) & 65535), (_.bi_valid += $));
              }
              function e(_, W, $) {
                t(_, $[2 * W], $[2 * W + 1]);
              }
              function l(_, W) {
                var $ = 0;
                do ($ |= 1 & _), (_ >>>= 1), ($ <<= 1);
                while (--W > 0);
                return $ >>> 1;
              }
              function o(_) {
                _.bi_valid === 16
                  ? (i(_, _.bi_buf), (_.bi_buf = 0), (_.bi_valid = 0))
                  : _.bi_valid >= 8 &&
                    ((_.pending_buf[_.pending++] = 255 & _.bi_buf),
                    (_.bi_buf >>= 8),
                    (_.bi_valid -= 8));
              }
              function x(_, W) {
                var $,
                  j,
                  ie,
                  ae,
                  ve,
                  Se,
                  d = W.dyn_tree,
                  F = W.max_code,
                  G = W.stat_desc.static_tree,
                  A = W.stat_desc.has_stree,
                  re = W.stat_desc.extra_bits,
                  de = W.stat_desc.extra_base,
                  ce = W.stat_desc.max_length,
                  fe = 0;
                for (ae = 0; ae <= ge; ae++) _.bl_count[ae] = 0;
                for (d[2 * _.heap[_.heap_max] + 1] = 0, $ = _.heap_max + 1; $ < oe; $++)
                  (ae = d[2 * d[2 * (j = _.heap[$]) + 1] + 1] + 1) > ce && ((ae = ce), fe++),
                    (d[2 * j + 1] = ae),
                    j > F ||
                      (_.bl_count[ae]++,
                      (ve = 0),
                      j >= de && (ve = re[j - de]),
                      (Se = d[2 * j]),
                      (_.opt_len += Se * (ae + ve)),
                      A && (_.static_len += Se * (G[2 * j + 1] + ve)));
                if (fe !== 0) {
                  do {
                    for (ae = ce - 1; _.bl_count[ae] === 0; ) ae--;
                    _.bl_count[ae]--, (_.bl_count[ae + 1] += 2), _.bl_count[ce]--, (fe -= 2);
                  } while (fe > 0);
                  for (ae = ce; ae !== 0; ae--)
                    for (j = _.bl_count[ae]; j !== 0; )
                      (ie = _.heap[--$]) > F ||
                        (d[2 * ie + 1] !== ae &&
                          ((_.opt_len += (ae - d[2 * ie + 1]) * d[2 * ie]), (d[2 * ie + 1] = ae)),
                        j--);
                }
              }
              function v(_, W, $) {
                var j,
                  ie,
                  ae = new Array(ge + 1),
                  ve = 0;
                for (j = 1; j <= ge; j++) ae[j] = ve = (ve + $[j - 1]) << 1;
                for (ie = 0; ie <= W; ie++) {
                  var Se = _[2 * ie + 1];
                  Se !== 0 && (_[2 * ie] = l(ae[Se]++, Se));
                }
              }
              function y() {
                var _,
                  W,
                  $,
                  j,
                  ie,
                  ae = new Array(ge + 1);
                for ($ = 0, j = 0; j < we - 1; j++)
                  for (Pe[j] = $, _ = 0; _ < 1 << Xe[j]; _++) Ge[$++] = j;
                for (Ge[$ - 1] = j, ie = 0, j = 0; j < 16; j++)
                  for (et[j] = ie, _ = 0; _ < 1 << $e[j]; _++) _e[ie++] = j;
                for (ie >>= 7; j < ne; j++)
                  for (et[j] = ie << 7, _ = 0; _ < 1 << ($e[j] - 7); _++) _e[256 + ie++] = j;
                for (W = 0; W <= ge; W++) ae[W] = 0;
                for (_ = 0; _ <= 143; ) (Ke[2 * _ + 1] = 8), _++, ae[8]++;
                for (; _ <= 255; ) (Ke[2 * _ + 1] = 9), _++, ae[9]++;
                for (; _ <= 279; ) (Ke[2 * _ + 1] = 7), _++, ae[7]++;
                for (; _ <= 287; ) (Ke[2 * _ + 1] = 8), _++, ae[8]++;
                for (v(Ke, B + 1, ae), _ = 0; _ < ne; _++)
                  (it[2 * _ + 1] = 5), (it[2 * _] = l(_, 5));
                (tt = new r(Ke, Xe, He + 1, B, ge)),
                  (rt = new r(it, $e, 0, ne, ge)),
                  (nt = new r(new Array(0), pt, 0, se, Te));
              }
              function L(_) {
                var W;
                for (W = 0; W < B; W++) _.dyn_ltree[2 * W] = 0;
                for (W = 0; W < ne; W++) _.dyn_dtree[2 * W] = 0;
                for (W = 0; W < se; W++) _.bl_tree[2 * W] = 0;
                (_.dyn_ltree[2 * Fe] = 1),
                  (_.opt_len = _.static_len = 0),
                  (_.last_lit = _.matches = 0);
              }
              function g(_) {
                _.bi_valid > 8
                  ? i(_, _.bi_buf)
                  : _.bi_valid > 0 && (_.pending_buf[_.pending++] = _.bi_buf),
                  (_.bi_buf = 0),
                  (_.bi_valid = 0);
              }
              function E(_, W, $, j) {
                g(_),
                  j && (i(_, $), i(_, ~$)),
                  H.arraySet(_.pending_buf, _.window, W, $, _.pending),
                  (_.pending += $);
              }
              function f(_, W, $, j) {
                var ie = 2 * W,
                  ae = 2 * $;
                return _[ie] < _[ae] || (_[ie] === _[ae] && j[W] <= j[$]);
              }
              function m(_, W, $) {
                for (
                  var j = _.heap[$], ie = $ << 1;
                  ie <= _.heap_len &&
                  (ie < _.heap_len && f(W, _.heap[ie + 1], _.heap[ie], _.depth) && ie++,
                  !f(W, j, _.heap[ie], _.depth));

                )
                  (_.heap[$] = _.heap[ie]), ($ = ie), (ie <<= 1);
                _.heap[$] = j;
              }
              function w(_, W, $) {
                var j,
                  ie,
                  ae,
                  ve,
                  Se = 0;
                if (_.last_lit !== 0)
                  do
                    (j =
                      (_.pending_buf[_.d_buf + 2 * Se] << 8) | _.pending_buf[_.d_buf + 2 * Se + 1]),
                      (ie = _.pending_buf[_.l_buf + Se]),
                      Se++,
                      j === 0
                        ? e(_, ie, W)
                        : (e(_, (ae = Ge[ie]) + He + 1, W),
                          (ve = Xe[ae]) !== 0 && t(_, (ie -= Pe[ae]), ve),
                          e(_, (ae = s(--j)), $),
                          (ve = $e[ae]) !== 0 && t(_, (j -= et[ae]), ve));
                  while (Se < _.last_lit);
                e(_, Fe, W);
              }
              function S(_, W) {
                var $,
                  j,
                  ie,
                  ae = W.dyn_tree,
                  ve = W.stat_desc.static_tree,
                  Se = W.stat_desc.has_stree,
                  d = W.stat_desc.elems,
                  F = -1;
                for (_.heap_len = 0, _.heap_max = oe, $ = 0; $ < d; $++)
                  ae[2 * $] !== 0
                    ? ((_.heap[++_.heap_len] = F = $), (_.depth[$] = 0))
                    : (ae[2 * $ + 1] = 0);
                for (; _.heap_len < 2; )
                  (ae[2 * (ie = _.heap[++_.heap_len] = F < 2 ? ++F : 0)] = 1),
                    (_.depth[ie] = 0),
                    _.opt_len--,
                    Se && (_.static_len -= ve[2 * ie + 1]);
                for (W.max_code = F, $ = _.heap_len >> 1; $ >= 1; $--) m(_, ae, $);
                ie = d;
                do
                  ($ = _.heap[1]),
                    (_.heap[1] = _.heap[_.heap_len--]),
                    m(_, ae, 1),
                    (j = _.heap[1]),
                    (_.heap[--_.heap_max] = $),
                    (_.heap[--_.heap_max] = j),
                    (ae[2 * ie] = ae[2 * $] + ae[2 * j]),
                    (_.depth[ie] = (_.depth[$] >= _.depth[j] ? _.depth[$] : _.depth[j]) + 1),
                    (ae[2 * $ + 1] = ae[2 * j + 1] = ie),
                    (_.heap[1] = ie++),
                    m(_, ae, 1);
                while (_.heap_len >= 2);
                (_.heap[--_.heap_max] = _.heap[1]), x(_, W), v(ae, F, _.bl_count);
              }
              function U(_, W, $) {
                var j,
                  ie,
                  ae = -1,
                  ve = W[1],
                  Se = 0,
                  d = 7,
                  F = 4;
                for (
                  ve === 0 && ((d = 138), (F = 3)), W[2 * ($ + 1) + 1] = 65535, j = 0;
                  j <= $;
                  j++
                )
                  (ie = ve),
                    (ve = W[2 * (j + 1) + 1]),
                    (++Se < d && ie === ve) ||
                      (Se < F
                        ? (_.bl_tree[2 * ie] += Se)
                        : ie !== 0
                          ? (ie !== ae && _.bl_tree[2 * ie]++, _.bl_tree[2 * Re]++)
                          : Se <= 10
                            ? _.bl_tree[2 * Le]++
                            : _.bl_tree[2 * Oe]++,
                      (Se = 0),
                      (ae = ie),
                      ve === 0
                        ? ((d = 138), (F = 3))
                        : ie === ve
                          ? ((d = 6), (F = 3))
                          : ((d = 7), (F = 4)));
              }
              function T(_, W, $) {
                var j,
                  ie,
                  ae = -1,
                  ve = W[1],
                  Se = 0,
                  d = 7,
                  F = 4;
                for (ve === 0 && ((d = 138), (F = 3)), j = 0; j <= $; j++)
                  if (((ie = ve), (ve = W[2 * (j + 1) + 1]), !(++Se < d && ie === ve))) {
                    if (Se < F)
                      do e(_, ie, _.bl_tree);
                      while (--Se != 0);
                    else
                      ie !== 0
                        ? (ie !== ae && (e(_, ie, _.bl_tree), Se--),
                          e(_, Re, _.bl_tree),
                          t(_, Se - 3, 2))
                        : Se <= 10
                          ? (e(_, Le, _.bl_tree), t(_, Se - 3, 3))
                          : (e(_, Oe, _.bl_tree), t(_, Se - 11, 7));
                    (Se = 0),
                      (ae = ie),
                      ve === 0
                        ? ((d = 138), (F = 3))
                        : ie === ve
                          ? ((d = 6), (F = 3))
                          : ((d = 7), (F = 4));
                  }
              }
              function O(_) {
                var W;
                for (
                  U(_, _.dyn_ltree, _.l_desc.max_code),
                    U(_, _.dyn_dtree, _.d_desc.max_code),
                    S(_, _.bl_desc),
                    W = se - 1;
                  W >= 3 && _.bl_tree[2 * Qe[W] + 1] === 0;
                  W--
                );
                return (_.opt_len += 3 * (W + 1) + 5 + 5 + 4), W;
              }
              function C(_, W, $, j) {
                var ie;
                for (t(_, W - 257, 5), t(_, $ - 1, 5), t(_, j - 4, 4), ie = 0; ie < j; ie++)
                  t(_, _.bl_tree[2 * Qe[ie] + 1], 3);
                T(_, _.dyn_ltree, W - 1), T(_, _.dyn_dtree, $ - 1);
              }
              function k(_) {
                var W,
                  $ = 4093624447;
                for (W = 0; W <= 31; W++, $ >>>= 1) if (1 & $ && _.dyn_ltree[2 * W] !== 0) return M;
                if (_.dyn_ltree[18] !== 0 || _.dyn_ltree[20] !== 0 || _.dyn_ltree[26] !== 0)
                  return K;
                for (W = 32; W < He; W++) if (_.dyn_ltree[2 * W] !== 0) return K;
                return M;
              }
              function R(_, W, $, j) {
                t(_, (le << 1) + (j ? 1 : 0), 3), E(_, W, $, !0);
              }
              var H = c('../utils/common'),
                ee = 4,
                M = 0,
                K = 1,
                Z = 2,
                le = 0,
                q = 1,
                be = 2,
                we = 29,
                He = 256,
                B = He + 1 + we,
                ne = 30,
                se = 19,
                oe = 2 * B + 1,
                ge = 15,
                De = 16,
                Te = 7,
                Fe = 256,
                Re = 16,
                Le = 17,
                Oe = 18,
                Xe = [
                  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5,
                  5, 0,
                ],
                $e = [
                  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
                  12, 12, 13, 13,
                ],
                pt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                Qe = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                Ke = new Array(2 * (B + 2));
              n(Ke);
              var it = new Array(2 * ne);
              n(it);
              var _e = new Array(512);
              n(_e);
              var Ge = new Array(256);
              n(Ge);
              var Pe = new Array(we);
              n(Pe);
              var et = new Array(ne);
              n(et);
              var tt,
                rt,
                nt,
                Je = !1;
              (p._tr_init = function (_) {
                Je || (y(), (Je = !0)),
                  (_.l_desc = new a(_.dyn_ltree, tt)),
                  (_.d_desc = new a(_.dyn_dtree, rt)),
                  (_.bl_desc = new a(_.bl_tree, nt)),
                  (_.bi_buf = 0),
                  (_.bi_valid = 0),
                  L(_);
              }),
                (p._tr_stored_block = R),
                (p._tr_flush_block = function (_, W, $, j) {
                  var ie,
                    ae,
                    ve = 0;
                  _.level > 0
                    ? (_.strm.data_type === Z && (_.strm.data_type = k(_)),
                      S(_, _.l_desc),
                      S(_, _.d_desc),
                      (ve = O(_)),
                      (ie = (_.opt_len + 3 + 7) >>> 3),
                      (ae = (_.static_len + 3 + 7) >>> 3) <= ie && (ie = ae))
                    : (ie = ae = $ + 5),
                    $ + 4 <= ie && W !== -1
                      ? R(_, W, $, j)
                      : _.strategy === ee || ae === ie
                        ? (t(_, (q << 1) + (j ? 1 : 0), 3), w(_, Ke, it))
                        : (t(_, (be << 1) + (j ? 1 : 0), 3),
                          C(_, _.l_desc.max_code + 1, _.d_desc.max_code + 1, ve + 1),
                          w(_, _.dyn_ltree, _.dyn_dtree)),
                    L(_),
                    j && g(_);
                }),
                (p._tr_tally = function (_, W, $) {
                  return (
                    (_.pending_buf[_.d_buf + 2 * _.last_lit] = (W >>> 8) & 255),
                    (_.pending_buf[_.d_buf + 2 * _.last_lit + 1] = 255 & W),
                    (_.pending_buf[_.l_buf + _.last_lit] = 255 & $),
                    _.last_lit++,
                    W === 0
                      ? _.dyn_ltree[2 * $]++
                      : (_.matches++,
                        W--,
                        _.dyn_ltree[2 * (Ge[$] + He + 1)]++,
                        _.dyn_dtree[2 * s(W)]++),
                    _.last_lit === _.lit_bufsize - 1
                  );
                }),
                (p._tr_align = function (_) {
                  t(_, q << 1, 3), e(_, Fe, Ke), o(_);
                });
            },
            { '../utils/common': 1 },
          ],
          8: [
            function (c, h, p) {
              'use strict';
              h.exports = function () {
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
            function (c, h, p) {
              'use strict';
              function n(L) {
                if (!(this instanceof n)) return new n(L);
                this.options = s.assign(
                  {
                    level: x,
                    method: y,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: v,
                    to: '',
                  },
                  L || {},
                );
                var g = this.options;
                g.raw && g.windowBits > 0
                  ? (g.windowBits = -g.windowBits)
                  : g.gzip && g.windowBits > 0 && g.windowBits < 16 && (g.windowBits += 16),
                  (this.err = 0),
                  (this.msg = ''),
                  (this.ended = !1),
                  (this.chunks = []),
                  (this.strm = new e()),
                  (this.strm.avail_out = 0);
                var E = a.deflateInit2(
                  this.strm,
                  g.level,
                  g.method,
                  g.windowBits,
                  g.memLevel,
                  g.strategy,
                );
                if (E !== o) throw new Error(t[E]);
                if ((g.header && a.deflateSetHeader(this.strm, g.header), g.dictionary)) {
                  var f;
                  if (
                    ((f =
                      typeof g.dictionary == 'string'
                        ? i.string2buf(g.dictionary)
                        : l.call(g.dictionary) === '[object ArrayBuffer]'
                          ? new Uint8Array(g.dictionary)
                          : g.dictionary),
                    (E = a.deflateSetDictionary(this.strm, f)) !== o)
                  )
                    throw new Error(t[E]);
                  this._dict_set = !0;
                }
              }
              function r(L, g) {
                var E = new n(g);
                if ((E.push(L, !0), E.err)) throw E.msg || t[E.err];
                return E.result;
              }
              var a = c('./zlib/deflate'),
                s = c('./utils/common'),
                i = c('./utils/strings'),
                t = c('./zlib/messages'),
                e = c('./zlib/zstream'),
                l = Object.prototype.toString,
                o = 0,
                x = -1,
                v = 0,
                y = 8;
              (n.prototype.push = function (L, g) {
                var E,
                  f,
                  m = this.strm,
                  w = this.options.chunkSize;
                if (this.ended) return !1;
                (f = g === ~~g ? g : g === !0 ? 4 : 0),
                  typeof L == 'string'
                    ? (m.input = i.string2buf(L))
                    : l.call(L) === '[object ArrayBuffer]'
                      ? (m.input = new Uint8Array(L))
                      : (m.input = L),
                  (m.next_in = 0),
                  (m.avail_in = m.input.length);
                do {
                  if (
                    (m.avail_out === 0 &&
                      ((m.output = new s.Buf8(w)), (m.next_out = 0), (m.avail_out = w)),
                    (E = a.deflate(m, f)) !== 1 && E !== o)
                  )
                    return this.onEnd(E), (this.ended = !0), !1;
                  (m.avail_out !== 0 && (m.avail_in !== 0 || (f !== 4 && f !== 2))) ||
                    (this.options.to === 'string'
                      ? this.onData(i.buf2binstring(s.shrinkBuf(m.output, m.next_out)))
                      : this.onData(s.shrinkBuf(m.output, m.next_out)));
                } while ((m.avail_in > 0 || m.avail_out === 0) && E !== 1);
                return f === 4
                  ? ((E = a.deflateEnd(this.strm)), this.onEnd(E), (this.ended = !0), E === o)
                  : f !== 2 || (this.onEnd(o), (m.avail_out = 0), !0);
              }),
                (n.prototype.onData = function (L) {
                  this.chunks.push(L);
                }),
                (n.prototype.onEnd = function (L) {
                  L === o &&
                    (this.options.to === 'string'
                      ? (this.result = this.chunks.join(''))
                      : (this.result = s.flattenChunks(this.chunks))),
                    (this.chunks = []),
                    (this.err = L),
                    (this.msg = this.strm.msg);
                }),
                (p.Deflate = n),
                (p.deflate = r),
                (p.deflateRaw = function (L, g) {
                  return (g = g || {}), (g.raw = !0), r(L, g);
                }),
                (p.gzip = function (L, g) {
                  return (g = g || {}), (g.gzip = !0), r(L, g);
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
      )('/lib/deflate.js');
    });
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        constructor() {
          (this._isIphoneOrIPad = !1),
            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) &&
              (this._isIphoneOrIPad = !0),
            this.initUAParser();
        }
        get userAgentData() {
          return this._userAgentData;
        }
        get deviceType() {
          return (
            this._deviceType ||
              (p.Util.isMobile
                ? (this._deviceType = this.mobileType || this.desktopType || n.UNKNOWN_DEVICE_TYPE)
                : (this._deviceType =
                    this.desktopType || this.mobileType || n.UNKNOWN_DEVICE_TYPE)),
            this._deviceType
          );
        }
        get isIphoneOrIPad() {
          return this._isIphoneOrIPad;
        }
        get browserName() {
          return this._userAgentData &&
            this._userAgentData.browser &&
            this._userAgentData.browser.name
            ? this._userAgentData.browser.name.trim()
            : '';
        }
        get browserVersion() {
          return this._userAgentData &&
            this._userAgentData.browser &&
            this._userAgentData.browser.version
            ? this._userAgentData.browser.version.trim()
            : '';
        }
        get browserMajor() {
          return this._userAgentData &&
            this._userAgentData.browser &&
            this._userAgentData.browser.major
            ? this._userAgentData.browser.major.trim()
            : '';
        }
        get browserType() {
          return this._userAgentData &&
            this._userAgentData.browser &&
            this._userAgentData.browser.type
            ? this._userAgentData.browser.type.trim()
            : '';
        }
        get osName() {
          return this._userAgentData && this._userAgentData.os && this._userAgentData.os.name
            ? this._userAgentData.os.name.trim()
            : '';
        }
        get osVersion() {
          return this._userAgentData && this._userAgentData.os && this._userAgentData.os.version
            ? this._userAgentData.os.version.trim()
            : '';
        }
        get deviceCategory() {
          return this._userAgentData &&
            this._userAgentData.device &&
            this._userAgentData.device.type
            ? this._userAgentData.device.type.trim()
            : '';
        }
        get engineName() {
          return this._userAgentData &&
            this._userAgentData.engine &&
            this._userAgentData.engine.name
            ? this._userAgentData.engine.name.trim()
            : '';
        }
        get engineVersion() {
          return this._userAgentData &&
            this._userAgentData.engine &&
            this._userAgentData.engine.version
            ? this._userAgentData.engine.version.trim()
            : '';
        }
        get cpuArchitecture() {
          return this._userAgentData &&
            this._userAgentData.cpu &&
            this._userAgentData.cpu.architecture
            ? this._userAgentData.cpu.architecture.trim()
            : '';
        }
        get deviceModel() {
          return this._userAgentData &&
            this._userAgentData.device &&
            this._userAgentData.device.model
            ? this._userAgentData.device.model.trim()
            : '';
        }
        get deviceVendor() {
          return this._userAgentData &&
            this._userAgentData.device &&
            this._userAgentData.device.vendor
            ? this._userAgentData.device.vendor.trim()
            : '';
        }
        get desktopType() {
          let a = this.browserName;
          this.browserVersion && (a = a + `(${this.browserVersion})`);
          let s = this.osName;
          this.osVersion && (s = s + `(${this.osVersion})`);
          const i = a && s ? `${a}-${s}` : a || s;
          return i ? i.trim() : '';
        }
        get mobileType() {
          const a = this.deviceModel,
            s = this.deviceVendor,
            i = a && s ? `${a} ${s}` : a || s;
          return i ? i.trim() : '';
        }
        initUAParser() {
          try {
            const a = new c.UAParser();
            a.setUA(navigator.userAgent), (this._userAgentData = a.getResult());
          } catch (a) {
            p.Logger.warn('UAParser failure', a);
          }
        }
      }
      (n.UNKNOWN_DEVICE_TYPE = 'unknown'), (p.BrowserInfo = n);
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        static get CLIENT_VERSION() {
          return '5.6.8w';
        }
        static get SALT() {
          return 'ST8irbd3bB';
        }
        static get TAB_UUID_KEY() {
          return 'pos_tid';
        }
        static get OPS_KEY() {
          return 'pos_ops';
        }
        static get DEVICE_ID_KEY() {
          return 'SecuredTouchDeviceId';
        }
        static get DEVICE_ID_CREATED_AT() {
          return 'pos_dca';
        }
        static get LAST_DEVICE_KEY_RESYNC() {
          return 'DeviceRefreshDate';
        }
        static get CAPTURED_KEYBOARD_INTERACTIONS() {
          return 'pos_cki';
        }
        static get CAPTURED_MOUSE_INTERACTIONS() {
          return 'pos_cmi';
        }
        static get CAPTURED_GESTURES() {
          return 'pos_cg';
        }
        static get CAPTURED_INDIRECT() {
          return 'pos_cie';
        }
        static get CAPTURED_TAGS() {
          return 'pos_ct';
        }
        static get CAPTURED_MOUSE_INTERACTIONS_SUMMARY() {
          return 'pos_mdp';
        }
        static get KEYBOARD_INTERACTIONS_COUNT() {
          return 'pos_kic';
        }
        static get MOUSE_INTERACTIONS_COUNT() {
          return 'pos_mic';
        }
        static get GESTURES_COUNT() {
          return 'pos_gc';
        }
        static get EVENT_COUNTERS() {
          return 'pos_ec';
        }
        static get PINGID_AGENT_DEFAULT_PORT() {
          return 9400;
        }
        static get PINGID_AGENT_DEFAULT_TIMEOUT() {
          return 1e3;
        }
        static get MOUSE_EVENT_COUNTERS() {
          return 'pos_mec';
        }
        static get KEYBOARD_EVENT_COUNTERS() {
          return 'pos_kec';
        }
        static get TOUCH_EVENT_COUNTERS() {
          return 'pos_tec';
        }
        static get INDIRECT_EVENT_COUNTERS() {
          return 'pos_iec';
        }
        static get GeoDataKey() {
          return 'pos_geo';
        }
      }
      p.Constants = n;
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        constructor(a = 'ECDSA', s = ['sign', 'verify'], i = 'SHA-256') {
          if (
            ((this.signingKeyType = a),
            (this.keyUsage = s),
            (this.algorithm = i),
            (this._crypto = window.crypto || window.msCrypto),
            !this._crypto || !this._crypto.subtle)
          )
            throw new Error('Cryptography API not supported in this browser');
        }
        async generateKeys() {
          return this._crypto.subtle.generateKey(
            { name: this.signingKeyType, namedCurve: 'P-256' },
            !1,
            this.keyUsage,
          );
        }
        async exportPublicKey(a) {
          const s = await this._crypto.subtle.exportKey('spki', a.publicKey),
            i = p.Util.ab2str(s),
            e = `-----BEGIN PUBLIC KEY-----
${btoa(i)}
-----END PUBLIC KEY-----`;
          return p.Logger.debug('Exported base64 pub key: ', e), e;
        }
        async exportPublicKeyJwk(a) {
          return await window.crypto.subtle.exportKey('jwk', a.publicKey);
        }
        async exportPrivateKey(a) {
          const s = await this._crypto.subtle.exportKey('pkcs8', a.privateKey),
            i = p.Util.ab2str(s),
            e = `-----BEGIN PRIVATE KEY-----
${btoa(i)}
-----END PRIVATE KEY-----`;
          return p.Logger.debug('Exported base64 pem:', e), e;
        }
        async signJWT(a, s, i = 0, t, e) {
          const o = { alg: 'ES256', typ: 'JWT', jwk: await this.exportPublicKeyJwk(s), kid: e },
            x = { deviceAttributesSerialized: a, iat: Math.floor(t / 1e3) };
          if (!s.privateKey) throw new Error('Require key');
          if (o.alg !== 'ES256' && o.typ !== 'JWT')
            throw new Error('jwt-encode only support the ES256 algorithm and the JWT type of hash');
          const v = p.Util.encode(o),
            y = p.Util.encode(x),
            L = `${v}.${y}`,
            g = p.Util.string2buf(L),
            E = await this._crypto.subtle.sign(
              { name: this.signingKeyType, hash: this.algorithm },
              s.privateKey,
              g,
            ),
            f = p.Util.base64url(btoa(p.Util.ab2str(E)));
          return p.Logger.debug('Signed JWT: ', `${L}.${f}`), `${L}.${f}`;
        }
        async verifyJwtToken(a, s) {
          const [i, t, e] = a.split('.'),
            l = p.Util.parseJwt(i);
          if (l.alg !== 'ES256' && l.typ !== 'JWT')
            throw new Error('JWT header supports only ES256 algorithm and the JWT type of hash');
          const o = p.Util.parseJwt(t),
            x = Uint8Array.from(atob(e.replace(/-/g, '+').replace(/_/g, '/')), (L) =>
              L.charCodeAt(0),
            ),
            v = p.Util.string2buf(`${i}.${t}`);
          return await this._crypto.subtle.verify(
            { name: this.signingKeyType, hash: this.algorithm },
            s,
            x,
            v,
          );
        }
      }
      p.CryptoOperator = n;
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        static get isLogEnabled() {
          return this._isLogEnabled || window['enable-logs-pingOneSignals'];
        }
        static set isLogEnabled(a) {
          this._isLogEnabled = a;
        }
        static debug(a, ...s) {
          (a = `${n.TAG} ${a}`),
            n.isLogEnabled &&
              (s && s.length > 0
                ? console.debug
                  ? console.debug(a, s)
                  : console.log(a, s)
                : console.debug
                  ? console.debug(a)
                  : console.log(a));
        }
        static error(a, ...s) {
          (a = `${n.TAG} ${a}`),
            n.isLogEnabled && (s && s.length > 0 ? console.error(a, s) : console.error(a));
        }
        static warn(a, ...s) {
          (a = `${n.TAG} ${a}`),
            n.isLogEnabled && (s && s.length > 0 ? console.warn(a, s) : console.warn(a));
        }
        static info(a, ...s) {
          (a = `${n.TAG} ${a}`),
            n.isLogEnabled && (s && s.length > 0 ? console.info(a, s) : console.info(a));
        }
      }
      (n.TAG = '[SignalsSDK]'), (p.Logger = n);
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        static get INITIALIZATION_ERROR() {
          return 'INITIALIZATION_ERROR';
        }
        static get UNEXPECTED_ERROR() {
          return 'UNEXPECTED_ERROR';
        }
      }
      p.POErrorCodes = n;
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  const Browser = {
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
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        static get Browser() {
          return Browser;
        }
        static get BrowserType() {
          return BrowserType;
        }
        static get CPU() {
          return CPU;
        }
        static get Device() {
          return Device;
        }
        static get Vendor() {
          return Vendor;
        }
        static get Engine() {
          return Engine;
        }
        static get UAParserEnumOS() {
          return UAParserEnumOS;
        }
      }
      p.UAParserEnums = n;
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        static get isMobile() {
          let a = !1;
          return (
            (function (s) {
              (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                s,
              ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                  s.substr(0, 4),
                )) &&
                (a = !0);
            })(navigator.userAgent || navigator.vendor || window.opera),
            a
          );
        }
        static newGuid() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
            const s = (Math.random() * 16) | 0;
            return (a === 'x' ? s : (s & 3) | 8).toString(16);
          });
        }
        static ieFix() {
          let a;
          navigator.userAgent.indexOf('MSIE') != -1
            ? (a = /MSIE (\d+\.\d+);/)
            : (a = /Trident.*rv[ :]*(\d+\.\d+)/),
            a.test(navigator.userAgent) &&
              (document.body.setAttribute('style', '-ms-touch-action:none;'),
              (document.body.style.touchAction = 'none'),
              (document.body.style.msTouchAction = 'none'));
        }
        static now() {
          const a = window.performance || {};
          return (
            (a.now = (function () {
              return (
                a.now ||
                a.webkitNow ||
                a.msNow ||
                a.oNow ||
                a.mozNow ||
                function () {
                  return new Date().getTime();
                }
              );
            })()),
            a.now()
          );
        }
        static base64Uint8Array(a) {
          const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          let i,
            t = a.length,
            e = '';
          for (i = 0; i < t; i += 3)
            (e += s[a[i] >> 2]),
              (e += s[((a[i] & 3) << 4) | (a[i + 1] >> 4)]),
              (e += s[((a[i + 1] & 15) << 2) | (a[i + 2] >> 6)]),
              (e += s[a[i + 2] & 63]);
          return (
            t % 3 === 2
              ? (e = e.substring(0, e.length - 1) + '=')
              : t % 3 === 1 && (e = e.substring(0, e.length - 2) + '=='),
            e
          );
        }
        static string2buf(a) {
          if (typeof TextEncoder == 'function' && TextEncoder.prototype.encode)
            return new TextEncoder().encode(a);
          let s,
            i,
            t,
            e,
            l,
            o = a.length,
            x = 0;
          for (e = 0; e < o; e++)
            (i = a.charCodeAt(e)),
              (i & 64512) === 55296 &&
                e + 1 < o &&
                ((t = a.charCodeAt(e + 1)),
                (t & 64512) === 56320 && ((i = 65536 + ((i - 55296) << 10) + (t - 56320)), e++)),
              (x += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
          for (s = new Uint8Array(x), l = 0, e = 0; l < x; e++)
            (i = a.charCodeAt(e)),
              (i & 64512) === 55296 &&
                e + 1 < o &&
                ((t = a.charCodeAt(e + 1)),
                (t & 64512) === 56320 && ((i = 65536 + ((i - 55296) << 10) + (t - 56320)), e++)),
              i < 128
                ? (s[l++] = i)
                : i < 2048
                  ? ((s[l++] = 192 | (i >>> 6)), (s[l++] = 128 | (i & 63)))
                  : i < 65536
                    ? ((s[l++] = 224 | (i >>> 12)),
                      (s[l++] = 128 | ((i >>> 6) & 63)),
                      (s[l++] = 128 | (i & 63)))
                    : ((s[l++] = 240 | (i >>> 18)),
                      (s[l++] = 128 | ((i >>> 12) & 63)),
                      (s[l++] = 128 | ((i >>> 6) & 63)),
                      (s[l++] = 128 | (i & 63)));
          return s;
        }
        static utf8Encode(a) {
          a = a.replace(
            /\r\n/g,
            `
`,
          );
          let s = '';
          for (let i = 0; i < a.length; i++) {
            const t = a.charCodeAt(i);
            t < 128
              ? (s += String.fromCharCode(t))
              : t > 127 && t < 2048
                ? ((s += String.fromCharCode((t >> 6) | 192)),
                  (s += String.fromCharCode((t & 63) | 128)))
                : ((s += String.fromCharCode((t >> 12) | 224)),
                  (s += String.fromCharCode(((t >> 6) & 63) | 128)),
                  (s += String.fromCharCode((t & 63) | 128)));
          }
          return s;
        }
        static hash(a) {
          let s = n.hashCache.get(a);
          return s || ((s = c.sha256(a + p.Constants.SALT)), n.hashCache.set(a, s)), s;
        }
        static hashMini(a) {
          const s = `${JSON.stringify(a)}`;
          let i,
            t,
            e = 2166136261;
          for (i = 0, t = s.length; i < t; i++) e = (Math.imul(31, e) + s.charCodeAt(i)) | 0;
          return ('0000000' + (e >>> 0).toString(16)).substr(-8);
        }
        static hashCode(a) {
          let s = 0,
            i = a ? a.length : 0,
            t = 0;
          if (i > 0) for (; t < i; ) s = ((s << 5) - s + a.charCodeAt(t++)) | 0;
          return s;
        }
        static mod(a, s) {
          return ((n.hashCode(a) % s) + s) % s;
        }
        static isEmail(a) {
          try {
            return (
              a &&
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                a.toLowerCase(),
              )
            );
          } catch (s) {
            return p.Logger.warn('isEmail function failed to parse string', s), !1;
          }
        }
        static getEmailDomain(a) {
          return n.isEmail(a) ? a.substring(a.lastIndexOf('@') + 1) : '';
        }
        static extendPrimitiveValues(a, s, i) {
          const t = n.allKeys(s);
          let e = 0;
          for (; e < t.length; )
            !n.isObject(s[t[e]]) && (!i || (i && a[t[e]] === void 0)) && (a[t[e]] = s[t[e]]), e++;
          return a;
        }
        static flatten(a) {
          const s = {};
          return n.dive('', a, s), s;
        }
        static isFunction(a) {
          return a && typeof a == 'function';
        }
        static isPassiveSupported() {
          let a = !1;
          const s = function () {};
          try {
            const i = {
              get passive() {
                return (a = !0), !0;
              },
            };
            window.addEventListener('test', s, i), window.removeEventListener('test', s, !1);
          } catch {
            a = !1;
          }
          return a;
        }
        static getAttribute(a, s) {
          try {
            if (a && typeof a.getAttribute == 'function') return a.getAttribute(s) || '';
          } catch {}
          return '';
        }
        static createInvisibleElement(a) {
          try {
            const s = document.createElement(a);
            return (
              (s.style.display = 'none'),
              (s.style.border = 'none'),
              (s.style.position = 'absolute'),
              (s.style.top = '-999px'),
              (s.style.left = '-999px'),
              (s.style.width = '0'),
              (s.style.height = '0'),
              (s.style.visibility = 'hidden'),
              s
            );
          } catch (s) {
            return p.Logger.warn('Failed to create element', s), null;
          }
        }
        static values(a) {
          const s = n.allKeys(a),
            i = s.length,
            t = Array(i);
          for (let e = 0; e < i; e++) t[e] = a[s[e]];
          return t;
        }
        static getValuesOfMap(a) {
          if (this.isFunction(a.values)) return Array.from(a.values());
          const s = [];
          return a.forEach((i) => s.push(i)), s;
        }
        static typesCounter(a) {
          const s = { epochTs: Date.now() };
          for (const i of a) s[i.type] = (s[i.type] || 0) + 1;
          return s;
        }
        static modifiersKeys(a) {
          const s = [
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
            ],
            i = [];
          return (
            a.getModifierState &&
              s.forEach((t) => {
                a.getModifierState(t.toString()) && i.push(t);
              }),
            i
          );
        }
        static getElementText(a) {
          var s, i;
          return a instanceof HTMLInputElement
            ? ['checkbox', 'radio'].indexOf(a.type) >= 0
              ? `${a.checked}`
              : a.value
            : a instanceof HTMLSelectElement
              ? (i = (s = a.selectedOptions) === null || s === void 0 ? void 0 : s[0]) === null ||
                i === void 0
                ? void 0
                : i.innerText
              : a.innerText;
        }
        static getSrcElement(a) {
          return a.srcElement || a.target;
        }
        static getObjectType(a) {
          try {
            const i = /function (.{1,})\(/.exec(a.constructor.toString());
            return i && i.length > 1 ? i[1] : '';
          } catch {
            return '';
          }
        }
        static isSelectorMatches(a, s, i) {
          try {
            const t = Element.prototype,
              e =
                t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector;
            let l = 0;
            do {
              if (e.call(a, s)) return a;
              a = a.parentElement || a.parentNode;
            } while (a !== null && a.nodeType === 1 && l++ < i);
            return null;
          } catch {
            return null;
          }
        }
        static anySelectorMatches(a, s, i) {
          try {
            for (const t of s) if (this.isSelectorMatches(a, t, i)) return !0;
          } catch (t) {
            p.Logger.warn(t);
          }
          return !1;
        }
        static isArray(a) {
          return Array.isArray
            ? Array.isArray(a)
            : Object.prototype.toString.call(a) === '[object Array]';
        }
        static safeJsonParse(a) {
          let s = null;
          try {
            a && (s = JSON.parse(a));
          } catch (i) {
            p.Logger.warn('Failed to parse object ' + i), (s = null);
          }
          return s;
        }
        static getElementSelectionStart(a) {
          let s;
          try {
            s = a.selectionStart;
          } catch {
            s = '';
          }
          return s;
        }
        static getElementSelectionEnd(a) {
          let s;
          try {
            s = a.selectionEnd;
          } catch {
            s = '';
          }
          return s;
        }
        static isClickableInput(a) {
          return (
            a &&
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
            ].indexOf(a.type) >= 0
          );
        }
        static isTextInput(a) {
          return (
            a &&
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
            ].indexOf(a.type) >= 0
          );
        }
        static getDeviceOrientation() {
          const a = screen.orientation || screen.mozOrientation || {},
            s = screen.msOrientation || a.type,
            i = a.angle;
          return {
            orientation: s == null ? void 0 : s.toString(),
            angle: i == null ? void 0 : i.toString(),
          };
        }
        static getDevToolsState() {
          var a, s;
          const t = window.outerWidth - window.innerWidth > 160,
            e = window.outerHeight - window.innerHeight > 160,
            l = t ? 'vertical' : 'horizontal';
          return !(e && t) &&
            ((!(
              (s = (a = window.Firebug) === null || a === void 0 ? void 0 : a.chrome) === null ||
              s === void 0
            ) &&
              s.isInitialized) ||
              t ||
              e)
            ? { open: !0, orientation: l }
            : { open: !1, orientation: void 0 };
        }
        static getCookie(a) {
          const s = document.cookie.match('(^|;) ?' + a + '=([^;]*)(;|$)');
          return s ? s[2] : null;
        }
        static setCookie(a, s, i) {
          const t = new Date();
          t.setTime(t.getTime() + 1e3 * i),
            (document.cookie =
              a + '=' + s + ';path=/;secure;SameSite=None;expires=' + t.toUTCString());
        }
        static deleteCookie(a) {
          n.setCookie(a, '', -1);
        }
        static delay(a) {
          return new Promise((s) => setTimeout(s, a));
        }
        static getHostnameFromRegex(a) {
          if (a) {
            const s = a.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            return s && s[1];
          }
          return null;
        }
        static inIframe() {
          try {
            return window.self !== window.top;
          } catch {
            return !0;
          }
        }
        static promiseTimeout(a, s) {
          const i = new Promise((t, e) => {
            const l = setTimeout(() => {
              clearTimeout(l), e(new Error('Timed out in ' + a + 'ms.'));
            }, a);
          });
          return Promise.race([s, i]);
        }
        static getProperty(a, s) {
          return s.split('.').reduce(function (i, t) {
            return i ? i[t] : null;
          }, a);
        }
        static filterReduce(a, s) {
          return Object.keys(a)
            .filter((i) => s(a[i]))
            .reduce((i, t) => ({ ...i, [t]: a[t] }), {});
        }
        static dive(a, s, i) {
          for (const t in s)
            if (s.hasOwnProperty(t)) {
              let e = t;
              const l = s[t];
              a.length > 0 && (e = a + '.' + t), n.isObject(l) ? n.dive(e, l, i) : (i[e] = l);
            }
        }
        static isObject(a) {
          const s = typeof a;
          return s === 'function' || (s === 'object' && !!a);
        }
        static allKeys(a) {
          if (!n.isObject(a)) return [];
          const s = [];
          for (const i in a) s.push(i);
          return s;
        }
        static encryptionString(a, s) {
          const i = [];
          for (let t = 0; t < a.length; t++) {
            const e = a.charCodeAt(t) ^ s.charCodeAt(t % s.length);
            i.push(String.fromCharCode(e));
          }
          return i.join('');
        }
        static encryptionBytes(a, s) {
          const i = new Uint8Array(a.length);
          for (let t = 0; t < a.length; t++) i[t] = a[t] ^ s.charCodeAt(t % s.length);
          return i;
        }
        static parseJwt(a) {
          const s = a.replace(/-/g, '+').replace(/_/g, '/'),
            i = decodeURIComponent(
              window
                .atob(s)
                .split('')
                .map((t) => '%' + ('00' + t.charCodeAt(0).toString(16)).slice(-2))
                .join(''),
            );
          return JSON.parse(i);
        }
        static calculateMeanTimeDeltasBetweenEvents(a) {
          let s = 0;
          if ((a == null ? void 0 : a.length) > 1) {
            let i = a[0].epochTs;
            for (let t = 1; t < a.length; t++) (s += a[t].epochTs - i), (i = a[t].epochTs);
            s /= a.length - 1;
          }
          return s;
        }
        static sortEventsByTimestamp(a) {
          return a.sort((s, i) =>
            s.eventTs > i.eventTs
              ? 1
              : s.eventTs < i.eventTs
                ? -1
                : s.epochTs > i.epochTs
                  ? 1
                  : s.epochTs < i.epochTs
                    ? -1
                    : s.type === 'click'
                      ? 1
                      : -1,
          );
        }
        static distanceBetweenPoints(a, s) {
          return Math.sqrt(Math.pow(a.getX() - s.getX(), 2) + Math.pow(a.getY() - s.getY(), 2));
        }
        static calculateMeanDistanceBetweenPoints(a) {
          let s = 0;
          if ((a == null ? void 0 : a.length) > 1) {
            for (let i = 1; i < a.length; i++) s += n.distanceBetweenPoints(a[i - 1], a[i]);
            s /= a.length - 1;
          }
          return s;
        }
        static filterArrayByLength(a, s) {
          return a.length <= s ? a : a.slice(0, s).concat(a[a.length - 1]);
        }
        static keepFirstEventsWithDistance(a) {
          const { events: s, threshold: i, min: t, max: e } = a;
          if (s.length <= t) return s;
          const l = s[0];
          let o;
          for (
            o = 1;
            o < s.length &&
            o < e &&
            !(Math.max(Math.abs(s[o].getX() - l.getX()), Math.abs(s[o].getY() - l.getY())) >= i);
            o++
          );
          return s.slice(0, Math.max(o + 1, t));
        }
        static ab2str(a) {
          return String.fromCharCode.apply(null, new Uint8Array(a));
        }
        static str2ab(a) {
          const s = new ArrayBuffer(a.length),
            i = new Uint8Array(s);
          for (let t = 0, e = a.length; t < e; t++) i[t] = a.charCodeAt(t);
          return s;
        }
        static encode(a) {
          const s = JSON.stringify(a),
            i = new TextEncoder().encode(s),
            t = n.base64Uint8Array(i);
          return n.base64url(t);
        }
        static base64url(a) {
          return a.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
      }
      (n.hashCache = new Map()),
        (n.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='),
        (p.Util = n);
    })((h = c._POSignalsUtils || (c._POSignalsUtils = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    var h = c.openDB;
    let p;
    (function (n) {
      class r {
        constructor() {}
        static async initDB() {
          if (
            !(
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB
            )
          )
            throw new Error('IndexedDB is not supported');
          const i = new r();
          return new Promise(async (t) => {
            (i.indexedDatabase = await h(this._PingDBName, r._version, {
              upgrade(e, l, o, x, v) {
                e.createObjectStore(r._storeDefaultName);
              },
            })),
              t(i);
          });
        }
        close() {
          this.indexedDatabase.close();
        }
        getValue(s) {
          return this.indexedDatabase.get(r._storeDefaultName, s);
        }
        setValue(s, i) {
          return this.indexedDatabase.put(r._storeDefaultName, i, s);
        }
      }
      (r._PingDBName = 'Ping'),
        (r._version = 1),
        (r._storeDefaultName = 'PING_ONE'),
        (n.IndexedDBStorage = r);
    })((p = c._POSignalsStorage || (c._POSignalsStorage = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        constructor(s, i) {
          this.crossStorageClient = new c.CrossStorageClient(s, i);
        }
        get(s) {
          const i = c._POSignalsUtils.Util.hash(s);
          return this.crossStorageClient.get(i);
        }
        del(s) {
          return this.crossStorageClient.del(c._POSignalsUtils.Util.hash(s));
        }
        set(s, i, t) {
          return this.crossStorageClient.set(c._POSignalsUtils.Util.hash(s), i, t);
        }
        onConnect() {
          return this.crossStorageClient.onConnect();
        }
        close(s) {
          return this.crossStorageClient.close(s);
        }
        getSignedPayload(s, i) {
          return this.crossStorageClient.getSignedPayload(s, i);
        }
        getDeviceDetails(s) {
          const i = c._POSignalsUtils.Util.hash(s);
          return this.crossStorageClient.getDeviceDetails(i);
        }
        setDeviceDetails(s, i) {
          const t = c._POSignalsUtils.Util.hash(s);
          return this.crossStorageClient.setDeviceDetails(t, i);
        }
      }
      p.CrossStorage = n;
      class r {
        constructor(s) {
          this.storage = s;
        }
        get(s) {
          return Promise.resolve(this.storage.getItem(s));
        }
        del(s) {
          return this.storage.removeItem(s), Promise.resolve();
        }
        set(s, i) {
          return this.storage.setItem(s, i), Promise.resolve();
        }
        onConnect() {
          return Promise.resolve();
        }
        close(s) {
          return Promise.resolve();
        }
        getSignedPayload(s, i) {
          return Promise.resolve([]);
        }
        getDeviceDetails(s) {
          return Promise.resolve([]);
        }
        setDeviceDetails(s, i) {
          return Promise.resolve([]);
        }
      }
      p.CrossStorageFallback = r;
    })((h = c._POSignalsStorage || (c._POSignalsStorage = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n, r, a) {
        (this.deviceId = n), (this.dbStorage = r), (this.cryptoHandler = a);
      }
      async getExportedPublicKey() {
        if (!this.cachedPublicKey) {
          const n = await this.getDeviceKeys();
          n && (this.cachedPublicKey = await this.cryptoHandler.exportPublicKey(n));
        }
        return (
          c._POSignalsUtils.Logger.info('Exported public key:', this.cachedPublicKey),
          this.cachedPublicKey
        );
      }
      async setDeviceKeys(n) {
        const r = await this.dbStorage.setValue(this.deviceId, n);
        return (this.cachedDeviceKey = n), r;
      }
      async associateDeviceKeys() {
        const n = await this.cryptoHandler.generateKeys();
        return (
          c._POSignalsUtils.Logger.info('Associating new device domain keys'),
          await this.setDeviceKeys(n),
          n
        );
      }
      async getDeviceKeys() {
        return (
          this.cachedDeviceKey ||
            (this.cachedDeviceKey = await this.dbStorage.getValue(this.deviceId)),
          this.cachedDeviceKey
        );
      }
      async signDeviceAttributeWithJWT(n, r, a) {
        return await this.cryptoHandler.signJWT(
          n,
          await this.getDeviceKeys(),
          h._default_salt,
          r,
          a,
        );
      }
      async verifyJWT(n) {
        return this.cryptoHandler.verifyJwtToken(n, (await this.getDeviceKeys()).publicKey);
      }
    }
    (h._default_salt = 32), (c.DeviceKeys = h);
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        constructor() {
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
          } catch {
            c._POSignalsUtils.Logger.warn('session storage disabled'),
              this._disabledStorage.push('sessionStorage'),
              (this.signalsSessionStorage = new p.StorageFallback());
          }
          try {
            window.localStorage.setItem('_st_storage_enabled_check', 'test'),
              window.localStorage.removeItem('_st_storage_enabled_check'),
              (this.signalsLocalStorage = new p.StorageWrapper(window.localStorage));
          } catch {
            c._POSignalsUtils.Logger.warn('local storage disabled'),
              this._disabledStorage.push('localStorage'),
              (this.signalsLocalStorage = new p.StorageWrapper(new p.StorageFallback())),
              (this.crossStorage = new p.CrossStorageFallback(this.signalsLocalStorage));
          }
        }
        setStorageConfig(a) {
          (this.disableHub = !0),
            (this.hubUrl = ''),
            (this.universalTrustEnabled = this.isConfigurationEnabled(
              a.universalDeviceIdentification,
            )),
            (this.agentIdentificationEnabled = this.isConfigurationEnabled(a.agentIdentification)),
            (this.devEnv = a.devEnv),
            (this.agentPort = a.agentPort),
            (this.agentTimeout = a.agentTimeout),
            (this.htmlGeoLocation = this.isConfigurationEnabled(a.htmlGeoLocation)),
            (this.isIAFDetectionEnabled = this.isConfigurationEnabled(a.isIAFDetectionEnabled));
        }
        static get instance() {
          return n._instance || (n._instance = new n()), n._instance;
        }
        get tabUUID() {
          let a = this.signalsSessionStorage.getItem(c._POSignalsUtils.Constants.TAB_UUID_KEY);
          return (
            a ||
              ((a = c._POSignalsUtils.Util.newGuid()),
              this.signalsSessionStorage.setItem(c._POSignalsUtils.Constants.TAB_UUID_KEY, a)),
            a
          );
        }
        get ops() {
          const a = Number(this.signalsSessionStorage.getItem(c._POSignalsUtils.Constants.OPS_KEY));
          return isNaN(a) ? null : a;
        }
        set ops(a) {
          a
            ? this.signalsSessionStorage.setItem(c._POSignalsUtils.Constants.OPS_KEY, a.toString())
            : this.signalsSessionStorage.removeItem(c._POSignalsUtils.Constants.OPS_KEY);
        }
        get disabledStorage() {
          return this._disabledStorage;
        }
        get sessionStorage() {
          return this.signalsSessionStorage;
        }
        get localStorage() {
          return this.signalsLocalStorage;
        }
        async initDeviceIdentity() {
          let a;
          const s = this.signalsLocalStorage.getItem(c._POSignalsUtils.Constants.DEVICE_ID_KEY),
            i = this.signalsLocalStorage.getItem(c._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT);
          return (
            s && (this.cachedDeviceId = s),
            this.universalTrustEnabled &&
              ((this.deviceTrust = { attestation: {}, dtts: new Date().getTime() }),
              (this.indexedDBStorage = await p.IndexedDBStorage.initDB()),
              (a = await this.loadLocalDeviceTrust())),
            !this.disableHub && (!s || this.shouldFallbackToP1Key(a))
              ? await this.fallbackToCrossStorage(this.hubUrl)
              : (this.crossStorage = new p.CrossStorageFallback(this.signalsLocalStorage)),
            this.getDeviceId() || (await this.associateDeviceDetails(this.disableHub)),
            i ||
              this.signalsLocalStorage.setItem(
                c._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT,
                Date.now(),
              ),
            this.universalTrustEnabled &&
              (!this.getDeviceId() || !a) &&
              (await this.createDomainKeys(this.disableHub)),
            this.getDeviceId()
          );
        }
        shouldFallbackToP1Key(a) {
          return (
            this.universalTrustEnabled &&
            !this.disableHub &&
            (!a || this.isRefreshRequired(this.deviceKeyRsyncIntervals))
          );
        }
        isRefreshRequired(a = 3) {
          if (!this.deviceTrust.dtts) return !0;
          const s = this.signalsLocalStorage.getItem(
            c._POSignalsUtils.Constants.LAST_DEVICE_KEY_RESYNC,
          );
          if (!s || isNaN(parseInt(s))) return !0;
          const t = this.deviceTrust.dtts - s > 60 * 60 * 24 * 1e3 * a;
          return t && c._POSignalsUtils.Logger.debug('Refresh required'), t;
        }
        async loadLocalDeviceTrust() {
          try {
            let a;
            if (!this.cachedDeviceId)
              return c._POSignalsUtils.Logger.debug('No device id found on customer domain'), !1;
            if (this.cachedDeviceId)
              return (
                (this.domainDeviceKeys = new c.DeviceKeys(
                  this.getDeviceId(),
                  this.indexedDBStorage,
                  new c._POSignalsUtils.CryptoOperator(),
                )),
                (a = await this.domainDeviceKeys.getDeviceKeys()),
                a
                  ? ((this.deviceTrust.attestation.deviceKey =
                      await this.domainDeviceKeys.getExportedPublicKey()),
                    (this.crossStorage = new p.CrossStorageFallback(this.signalsLocalStorage)),
                    !0)
                  : (c._POSignalsUtils.Logger.debug('No device keys found on customer domain'), !1)
              );
          } catch (a) {
            return c._POSignalsUtils.Logger.error('Domain PKI initialization failed', a), !1;
          }
        }
        async createDomainKeys(a) {
          try {
            if (!a && this._disabledStorage.lastIndexOf('hub') > -1) {
              c._POSignalsUtils.Logger.debug('Hub unavailable - skipping domain trust creation');
              return;
            }
            (this.domainDeviceKeys = new c.DeviceKeys(
              this.getDeviceId(),
              this.indexedDBStorage,
              new c._POSignalsUtils.CryptoOperator(),
            )),
              await this.domainDeviceKeys.associateDeviceKeys(),
              (this.deviceTrust.attestation.deviceKey =
                await this.domainDeviceKeys.getExportedPublicKey());
          } catch (s) {
            c._POSignalsUtils.Logger.error('Domain PKI initialization failed', s);
          }
        }
        getDeviceId() {
          return this.cachedDeviceId;
        }
        getDeviceCreatedAt() {
          return this.signalsLocalStorage.getItem(c._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT);
        }
        async associateDeviceDetails(a) {
          var s, i;
          return (
            c._POSignalsUtils.Logger.debug('Associating fresh device details'),
            (this.cachedDeviceId = `Id-${c._POSignalsUtils.Util.newGuid()}`),
            this.signalsLocalStorage.setItem(
              c._POSignalsUtils.Constants.DEVICE_ID_KEY,
              this.cachedDeviceId,
            ),
            this.signalsLocalStorage.setItem(
              c._POSignalsUtils.Constants.DEVICE_ID_CREATED_AT,
              Date.now(),
            ),
            a ||
              (this.universalTrustEnabled
                ? (this.deviceTrust.attestation.fallbackDeviceKey = (
                    await this.crossStorage.setDeviceDetails(
                      c._POSignalsUtils.Constants.DEVICE_ID_KEY,
                      this.cachedDeviceId,
                    )
                  )[0])
                : await this.crossStorage.set(
                    c._POSignalsUtils.Constants.DEVICE_ID_KEY,
                    this.cachedDeviceId,
                  )),
            c._POSignalsUtils.Logger.debug(`PingOne Signals deviceId: ${this.cachedDeviceId}`),
            [
              this.cachedDeviceId,
              (i = (s = this.deviceTrust) === null || s === void 0 ? void 0 : s.attestation) ===
                null || i === void 0
                ? void 0
                : i.fallbackDeviceKey,
            ]
          );
        }
        closeTrustStore() {
          try {
            this.crossStorage.close(this.devEnv),
              this.indexedDBStorage && this.indexedDBStorage.close();
          } catch (a) {
            c._POSignalsUtils.Logger.info('Unable to close trust store:', a);
          }
        }
        async fallbackToCrossStorage(a) {
          c._POSignalsUtils.Logger.debug('PingOne Signals cross storage is required, initializing');
          try {
            await this.initCrossStorage(a),
              c._POSignalsUtils.Logger.info('PingOne Signals cross storage initiated');
          } catch (s) {
            c._POSignalsUtils.Logger.warn(
              `PingOne Signals Session crossStorage failed to connect ${s}`,
            ),
              this._disabledStorage.push('hub'),
              (this.crossStorage = new p.CrossStorageFallback(this.signalsLocalStorage));
          }
        }
        async initCrossStorage(a) {
          const i =
            'https://apps.pingone.com/signals/web-sdk/hub-' +
            (this.universalTrustEnabled ? '1.0.7' : '1.0.1') +
            '/hub.html';
          let t = ((a == null ? void 0 : a.trim()) || i).replace(/\/$/, '');
          t.endsWith('html') || (t += '/hub.html'),
            (this.crossStorage = new p.CrossStorage(t, { timeout: 2e3 })),
            await this.crossStorage.onConnect();
          let e;
          this.universalTrustEnabled
            ? ((e = await this.crossStorage.getDeviceDetails(
                c._POSignalsUtils.Constants.DEVICE_ID_KEY,
              )),
              (this.cachedDeviceId = e[0]))
            : (this.cachedDeviceId = await this.crossStorage.get(
                c._POSignalsUtils.Constants.DEVICE_ID_KEY,
              )),
            this.cachedDeviceId
              ? this.signalsLocalStorage.setItem(
                  c._POSignalsUtils.Constants.DEVICE_ID_KEY,
                  this.cachedDeviceId,
                )
              : c._POSignalsUtils.Logger.info('no device id from hub'),
            this.universalTrustEnabled &&
              (e && e[1]
                ? ((this.deviceTrust.attestation.fallbackDeviceKey = e[1]),
                  c._POSignalsUtils.Logger.info(
                    `Using fallback device keys from hub ${this.deviceTrust.attestation.fallbackDeviceKey}`,
                  ))
                : c._POSignalsUtils.Logger.info('failed to use any device keys'));
        }
        isConfigurationEnabled(a) {
          return a == null
            ? !1
            : typeof a == 'boolean'
              ? a
              : typeof a == 'string' && a.toLowerCase() === 'true';
        }
        async signJWTChallenge(a, s, i) {
          return this.domainDeviceKeys.signDeviceAttributeWithJWT(a, s, i);
        }
        getGeoSessionData() {
          const a = this.signalsSessionStorage.getItem(c._POSignalsUtils.Constants.GeoDataKey);
          return a == null ? null : a;
        }
      }
      p.SessionStorage = n;
    })((h = c._POSignalsStorage || (c._POSignalsStorage = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      class n {
        constructor(s) {
          this.storage = s;
        }
        getItem(s) {
          const i = c._POSignalsUtils.Util.hash(s);
          let t = this.storage.getItem(i);
          return (
            t ||
              ((t = this.storage.getItem(s)),
              t && (this.storage.setItem(i, t), this.storage.removeItem(s))),
            t
          );
        }
        removeItem(s) {
          return this.storage.removeItem(c._POSignalsUtils.Util.hash(s));
        }
        setItem(s, i) {
          return this.storage.setItem(c._POSignalsUtils.Util.hash(s), i);
        }
      }
      p.StorageWrapper = n;
      class r {
        constructor() {
          this.internalStorageMap = new Map();
        }
        getItem(s) {
          return this.internalStorageMap.get(s);
        }
        removeItem(s) {
          this.internalStorageMap.delete(s);
        }
        setItem(s, i) {
          this.internalStorageMap.set(s, i);
        }
      }
      p.StorageFallback = r;
    })((h = c._POSignalsStorage || (c._POSignalsStorage = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  const _0x7ea2 = _0x4e19;
  (function (c, h) {
    const p = _0x4e19,
      n = c();
    for (;;)
      try {
        if (
          (parseInt(p(773)) / 1) * (-parseInt(p(715)) / 2) +
            -parseInt(p(1083)) / 3 +
            (parseInt(p(882)) / 4) * (parseInt(p(747)) / 5) +
            (parseInt(p(794)) / 6) * (parseInt(p(741)) / 7) +
            -parseInt(p(1176)) / 8 +
            -parseInt(p(1045)) / 9 +
            (parseInt(p(1102)) / 10) * (parseInt(p(432)) / 11) ===
          h
        )
          break;
        n.push(n.shift());
      } catch {
        n.push(n.shift());
      }
  })(_0x455d, 976621);
  var __awaiter =
      (this && this[_0x7ea2(1160)]) ||
      function (c, h, p, n) {
        function r(a) {
          return a instanceof p
            ? a
            : new p(function (s) {
                s(a);
              });
        }
        return new (p || (p = Promise))(function (a, s) {
          const i = _0x4e19;
          function t(o) {
            try {
              l(n.next(o));
            } catch (x) {
              s(x);
            }
          }
          function e(o) {
            const x = _0x4e19;
            try {
              l(n[x(967)](o));
            } catch (v) {
              s(v);
            }
          }
          function l(o) {
            const x = _0x4e19;
            o[x(989)] ? a(o[x(534)]) : r(o[x(534)]).then(t, e);
          }
          l((n = n[i(892)](c, h || []))[i(1321)]());
        });
      },
    _POSignalsEntities;
  function _0x455d() {
    const c = [
      'RENDERER',
      'JS_FONTS',
      'function query() { [native code] }',
      'Buffer',
      'PromiseQueue',
      'expm1',
      'method',
      'IS_CHROME_FAMILY',
      'queryselector-unsupported',
      'force_touch',
      '_POSignalsMetadata',
      'log',
      'Chromium',
      'maxVertexTextureImageUnits',
      'message_channel',
      'createOffer',
      'keys',
      'data-attribute',
      'NAVIGATOR_ON_LINE',
      'keyboard',
      'gyroscope',
      'HAS_CHROME_LOADTIMES',
      'speechSynthesis',
      'privateClickMeasurement',
      'coords',
      'put',
      'indexeddb',
      'touchSupport',
      'youbot',
      'pointerevents',
      'map',
      'browser-autofilled',
      'external',
      'NAVIGATOR_HID_SUPPORTED',
      'Failed to start async autofill detection:',
      'getAllLies',
      'IS_WEB_GLSTATUS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'language',
      'windows phone',
      'history',
      'navigator.plugins_empty',
      'availWidth',
      'Failed to add ',
      'userAgent',
      'maxTouchPoints',
      'type',
      '_Selenium_IDE_Recorder',
      'csi',
      'PingOne Signals deviceId: ',
      'driver-evaluate',
      'isIAFDetectionEnabled',
      'background-sync',
      ' in async detection:',
      'function () {',
      'jsHeapSizeLimit',
      'LOG2E',
      'has',
      'WEB_RTC_HOST_IP',
      'electron',
      'html',
      'AutofillDetector',
      '__webdriver_script_func',
      'getTime',
      'LIES.',
      'floc_id',
      'model',
      'htmlGeoLocation_latitude',
      'window.chrome_missing',
      'toSource',
      'calculated browser device attributes.',
      'win',
      'Logger',
      'input',
      'caller',
      'get',
      'deviceCreatedAt',
      'Sequentum',
      'autofilled',
      'getBattery',
      'setLocalDescription',
      'customelements',
      'hypot',
      '...',
      'request_animation_frame',
      'AGENT_DEVICE_URL',
      'totalJSHeapSize',
      'INPUT',
      'WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN',
      'ondevicemotion',
      'GET',
      'IS_WEBGL2',
      'htmlGeoLocation_ErrorMessage',
      'onerror',
      'callPhantom',
      'isAIBot',
      'battery',
      'VIDEO_CARD',
      'maxVertexAttribs',
      'ambientlight',
      'htmlGeoLocation_timestamp',
      'number',
      'getHasLiedBrowser',
      'createDataChannel',
      'brave',
      'browserLanguage',
      'FILE_CONTENT_JS_FOUND',
      'cli',
      'getIoMetadata',
      'sessionData',
      'eventlistener',
      'documentLie',
      'LocalAgentAccessor',
      'acosh',
      'getGeoSessionData',
      'next',
      'BATTERY_CHARGING_TIME',
      'webglVersion',
      'trustTokenOperationError',
      'WEBGL_debug_renderer_info',
      'permissions_api_overriden',
      'Normal DOM size (',
      'isCanvasSupported',
      'IS_USER_VERIFYING_PLATFORM_AUTHENTICATOR_AVAILABLE',
      'AbortError',
      'mozRTCPeerConnection',
      'getAutofillMetadata',
      'runtime',
      'AT&T',
      'MEMORY_USED_HEAP_SIZE',
      'Flip Player',
      'getSensorsMetadata',
      'close',
      'plugins',
      'toString',
      'googleother-image',
      'Error processing input ',
      'connection',
      'some',
      'getIdentificationMetadata',
      'lieTests',
      'Modernizr',
      'AiaSignals',
      'processInputsSynchronously',
      'cbrt',
      'clipboard-write',
      'WebGLMetadata',
      'deleteDatabase',
      'log10',
      'numberOfAudioDevices',
      'mouseforcewillbegin',
      'constructor',
      'gamepads',
      'osName',
      'web_sockets',
      'getDevicePayload',
      'Error during detection of aiasignals:',
      'firefox',
      'data-rapid-fill',
      'min',
      'Promise',
      'calledSelenium',
      'MAX_RENDERBUFFER_SIZE',
      'Windows Phone',
      'COOKIES_ENABLED',
      'px)',
      "' in browser '",
      ' inputs), using async autofill detection',
      'hdr',
      'getGeoLocationData',
      'devToolsOpen',
      'intl',
      'audio',
      'atanh',
      'getFingerPrint',
      'quota detection failed: ',
      'videoInputDevices',
      'getHeadlessResults',
      'document-unavailable',
      'BROWSER_ENGINE_VERSION',
      'exif_orientation',
      'loadTimes',
      'toFixed',
      '250, 255, 189',
      '@keyframes autofill-detection { 0% { opacity: 1; } 100% { opacity: 1; } }',
      ' inputs), using sync autofill detection',
      'canvas',
      'PREFERS_COLOR_SCHEME',
      'AUDIO',
      'Function',
      'perplexitybot',
      'failed to add iframe data',
      'force_touch.webkit_force_at_mouse_down',
      '113905FKopIR',
      '__webdriver_evaluate',
      'fingerPrint',
      'MQ_SCREEN',
      'tanh',
      'engineName',
      'Large DOM detected: ',
      'fmget_targets',
      'enumerateDevices() not supported.',
      'error_code',
      'matches',
      'createElement',
      'MEDIA_CODEC_MP4_AVC1',
      'vibrate',
      'hashMini',
      'forEach',
      'cryptography',
      'srcdoc_triggers_window_proxy',
      'STEALTH',
      'appVersion',
      'isPrivateMode',
      'getOwnPropertyLie',
      'webRtcIps',
      'DetectStealth',
      'force_touch.mouse_force_will_begin',
      'webzio-extended',
      'function ',
      'window_awesomium',
      'enumerateDevices failed',
      'selenium_in_document',
      'anthropic-ai',
      'enumerateDevicesEnabled',
      'getMediaCodec',
      'batteryLevel',
      'getHasLiedResolution',
      'Failed to get FingerPrint ',
      'isInvalidStackTraceSize',
      'closed',
      'browserMajor',
      'Security error',
      'agentIdentificationEnabled',
      'NAVIGATOR_PLUGINS_LENGTH',
      '__driver_evaluate',
      'AGENT_BASE_URL',
      'Android',
      'flatten',
      'application_cache',
      'failed to add properties descriptor',
      'Browser unknown',
      'speed',
      'warn',
      'TOUCH_SUPPORT',
      'getToStringLie',
      'Yahoo! Japan',
      'getDirectory',
      " in browser '",
      'remove',
      'HASLIEDBROWSER',
      'browserType',
      'isWebGl2',
      'batteryDischargingTime',
      'Document not available for async autofill detection',
      'detectAutofillFields',
      'queryselector',
      ' -> ',
      'setTrustToken',
      'password',
      'hasTrustToken',
      'WEBGL_MAXVERTEXATTRIBS',
      '__nightmare',
      'getPermissionsMetadata',
      'tablet',
      'outerHeight',
      'getHasLiedLanguages',
      'detectedFields',
      '_ST_PING',
      'applePay',
      'Xq7tSbjB517mhZwt',
      'dom-query-error',
      'pointer_lock',
      'omgilibot',
      'matchmedia',
      'IFRAME_WIDTH',
      'emit',
      'WEBGL_MAXRENDERBUFFERSIZE',
      '_selenium',
      'Ops : ',
      'createObjectStore',
      ' inputs',
      'isPrivate',
      'Internet Explorer',
      'call',
      'deviceMemory',
      'NAVIGATOR_CONNECTION_RTT',
      'interestCohort',
      'width',
      'left',
      'evaluateModernizr',
      'DetectLies',
      'autoFillMeta',
      'enumerateDevices() cannot run within safari iframe',
      'NAVIGATOR_APP_VERSION',
      'value',
      'GPS_SUPPORTED',
      'Battery ',
      'NETWORK_DOWNLOAD_MAX',
      'colorGamut',
      'chrome',
      'deviceId',
      'height',
      'dateTimeLocale',
      'getWebglData',
      'now',
      'productSub',
      'SQRT2',
      'NAVIGATOR_MIME_TYPES_LENGTH',
      'seleniumInNavigator',
      'querySelectorAll',
      'UAParserHelperMetadata',
      'components',
      'safeModernizrOn',
      'round',
      'deviceType',
      'IS_AIBot',
      'unknown',
      'Large DOM detected (',
      'latitude',
      'POSITION_UNAVAILABLE',
      'audioOutputDevices',
      'webdriver-evaluate',
      'localAgentJwt',
      'result',
      'blank page',
      'isPrivateModeV2',
      'Zeki',
      'mac',
      'string',
      'webGlBasics',
      'getOwnPropertyDescriptors',
      'cosh',
      'notification',
      'Error in smart autofill detection, falling back to sync:',
      'pointer_events',
      'browser-class',
      'proximity',
      'sinh',
      'meta-externalagent',
      'WEB_RTC_ENABLED',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'videoCard',
      'HEADLESS',
      'applebot-extended',
      'flatAndAddMetadata',
      'getParameter',
      'WEBGL2VENDORANDRENDERER',
      'TypeError',
      'NAVIGATOR_LANGUAGES',
      'dataview',
      'indexed_db_blob',
      'getExtension',
      'midi',
      'forcedColors',
      'getElementsByTagName',
      'NAVIGATOR_USER_AGENT',
      'htmlGeoLocation_speed',
      'PLUGINS',
      '[[Target]]',
      'Invalid geoData JSON in session storage:',
      'heading',
      'webdriver',
      'cos',
      'hasWebcam',
      'async-error',
      '__lastWatirPrompt',
      'backgroundColor',
      'classList',
      'applebot',
      'LIES',
      'http://127.0.0.1',
      'ambient-light-sensor',
      'page intentionally left blank',
      'info',
      'HASLIEDLANGUAGES',
      'reducedMotion',
      'crawler',
      'webkit-autofill',
      'hasOwnProperty',
      'VERSION',
      'prototype',
      'Siemens',
      'getLies',
      'window',
      'universalTrustEnabled',
      'none',
      'isWebGl',
      'webgl',
      'htmlGeoLocation_accuracy',
      'aiaSignals',
      'getFrequencyResponse',
      'BroprintJS',
      'googleother',
      'pointerlock',
      'index_chrome_too_high',
      'broJsFingerprint',
      'notifications',
      'metadataBlackList',
      '__webdriver_unwrapped',
      'video',
      'force_touch.webkit_force_at_force_mouse_down',
      'IS_BOT',
      'custom_protocol_handler',
      'substring',
      'addAutofillResult',
      'DetectHeadless',
      'target',
      'Document not available for autofill detection',
      'denied',
      'webkitRTCPeerConnection',
      '__fxdriver_evaluate',
      'RTCPeerConnection',
      'state',
      'addStealthTest',
      'getProperty',
      'domBlockers',
      'seleniumSequentum',
      'JS_CHALLENGE',
      'innerHeight',
      'then',
      'Fingerprint timeout',
      'serializedDeviceAttributes',
      'stringify',
      'agentTimeout',
      'DOCUMENT_ELEMENT_DRIVER',
      'vendorFlavors',
      'Mac',
      'refreshDeviceAttributes',
      'amazonbot',
      'ambient_light',
      'screenFrame',
      'Volvo',
      'screen',
      'test',
      'Failed to fetch the Workstation data: ',
      'iframeWindow',
      'granted',
      'msPointerEnabled',
      'AUDIO_INPUT_DEVICES',
      'webgl2',
      'cpuClass',
      'OPS',
      'experimental-webgl',
      'semrushbot-ocob',
      'length',
      'pointerEnabled',
      'BROWSER_TYPE',
      'htmlGeoLocation_longitude',
      'mozConnection',
      'canPlayType',
      'systemLanguage',
      'lastCalculatedMetadata',
      'NAVIGATOR_VENDOR',
      'PROXIMITY_SUPPORTED',
      'isFunction',
      'permission',
      'getAutofillMetadataSmart',
      'function () { [native code] }',
      'safeAddModernizrFeatures',
      'AUDIO_OUTPUT_DEVICES',
      'assign',
      'autofill-detection',
      'ChromeDriverw',
      'detectAutofillFieldsAsync',
      'closeTrustStore',
      'velenpublicwebcrawler',
      'BROWSER_TAB_HISTORY_LENGTH',
      '__webdriverFunc',
      'fingerPrintComponentKeys',
      'UNMASKED_RENDERER_WEBGL',
      'rgb(250, 255, 189)',
      '    [native code]',
      'srcdoc',
      ' inputs, checking first ',
      'auto-filled',
      '134966JLWZeC',
      'WEBGL_MAXVARYINGVECTORS',
      'getContext',
      'getUndefinedValueLie',
      'window_RunPerfTest',
      'video/mp4;; codecs = "avc1.42E01E"',
      'timezone',
      'pdfViewerEnabled',
      'blob_constructor',
      'cookieEnabled',
      'deviceCategory',
      'maxVertexUniformVectors',
      '() {',
      'message',
      'localAgentJwtRequestCount',
      '_POSignalsUtils',
      'android',
      'dataforseobot',
      'details',
      'FONT_PREFERENCES',
      'window_fmget_targets',
      'DEDVCE_LIGHT_SUPPORTED',
      'magnetometer',
      'devicePixelRatio',
      '__webdriver_script_fn',
      'ligatures',
      '7WNrfWV',
      'charAt',
      'contrast',
      'hardwareConcurrency',
      'sendMessage',
      'getDeviceCreatedAt',
      '5NNuPlr',
      'failed to get lies results',
      'WEBGL_EXTENSIONS',
      'audiooutput',
      'trim',
      'metadataQueue',
      'isElectronFamily',
      'LvTel',
      'timestamp',
      'WEBGL_SHADINGLANGUAGEVERSION',
      'indexeddbblob',
      'indexedDB',
      '$cdc_asdjflasutopfhvcZLmcfl_',
      'failed to get headless results',
      'hide',
      'hasAutofill',
      'stack',
      'version',
      'catch',
      "Geolocation permission state is '",
      'Geolocation retrieval failed: Unknown geolocation error occurred.',
      'Incognito',
      'substr',
      'metadataParams',
      'serviceWorker',
      'indexed_db',
      '11ZffRNu',
      '[[IsRevoked]]',
      'autofill-detector-styles',
      'getSerializedDeviceAttributes',
      'contextmenu',
      'light',
      'longitude',
      'documentElement',
      'BATTERY_DISCHARGING_TIME',
      '***',
      'inapp',
      'facebookbot',
      'htmlGeoLocation_ErrorCode',
      'failed to add client hints',
      'getBroPrintFingerPrint',
      'object',
      'ontouchstart',
      'getAutofillMetadataAsync',
      'prompt',
      'detectInputAutofill',
      'removeItem',
      '2430492PIrYHv',
      'accuracy',
      'MEDIA_CODEC_',
      'payment-handler',
      'autofillCount',
      'ipad',
      'disabledStorage',
      'fingerprint',
      'propertyBlackList',
      'function get contentWindow() { [native code] }',
      'vendor',
      'hasEvent',
      'includes',
      'Linux',
      'data-com-onepassword-filled',
      'isMobile',
      'screenResolution',
      'quota_management',
      'cors',
      'BROWSER_VERSION',
      'createInvisibleElement',
      'HAS_SPEAKERS',
      'iphone',
      'function',
      '$chrome_asyncScriptInfo',
      'NAVIGATOR_LANGUAGE',
      'failed to get private mode info',
      'INCOMPATIBLE_BROWSER',
      'WEBGL_VERSION',
      'ondevicelight',
      'BATTERY_SUPPORTED',
      'getOwnPropertyNames',
      'appName',
      'cookieStore',
      'webkitConnection',
      'isWebGlSupported',
      'PDF_VIEWER_ENABLED',
      'extensions',
      'IS_WEBGL',
      'NextBook',
      'undefined',
      'BATTERY_LEVEL',
      'prefixed',
      'HAS_TOUCH',
      'query',
      'touch_events',
      'addClientHints',
      'host',
      'address',
      'MEDIA_CODEC_AAC',
      'NAVIGATOR_HARDWARE_CONCURRENCY',
      'MAX_VERTEX_ATTRIBS',
      'innerWidth',
      '_phantom',
      'style',
      'toUpperCase',
      'headlessTests',
      'IFRAME_HEIGHT',
      'VIDEO',
      'full_screen',
      'IS_ELECTRON_FAMILY',
      'OS_CPU',
      'webkitTemporaryStorage',
      'platform',
      'seleniumInDocument',
      'contentWindow',
      'DeviceOrientationEvent',
      'IS_ACCEPT_COOKIES',
      'ondeviceproximity',
      'head',
      'mediaDevices',
      'product',
      'code',
      'trident',
      'HAS_MICROPHONE',
      'detectionMethods',
      'CPU_ARCHITECTURE',
      'NAVIGATOR_WEB_DRIVER',
      'externalIdentifiers',
      'browserInfo',
      'hasMicrophone',
      'Metadata',
      'Battery not supported!',
      'tel',
      'htmlGeoLocation_heading',
      'getComputedStyle',
      'FINGER_PRINT',
      'all',
      '1835012icbJLw',
      'unknown transient reason',
      'NOTIFICATION_PERMISSION',
      'timeout',
      'BROWSER_ENGINE_NAME',
      'Geolocation retrieval failed: Location request timed out.',
      'vertical',
      '__lastWatirConfirm',
      'mobile',
      'getCurrentBrowserFingerPrint',
      'apply',
      'permissions_api',
      'RESOLUTION',
      'petalbot',
      'calculateDeviceMetadata',
      'MEDIA_CODEC_X_M4A',
      'IFRAME_DATA',
      'tan',
      'batteryCharging',
      'sessionStorage.length',
      'domAutomation',
      'body',
      'driver',
      'field-type-heuristic',
      'typed_arrays',
      'isChromeFamily',
      'RCA',
      'DOCUMENT_ELEMENT_WEBDRIVER',
      'linux',
      'PUSH_NOTIFICATIONS_SUPPORTED',
      'rtt',
      'detectIncognitoInternal',
      'audio/x-m4a',
      'selenium',
      'webdriver-evaluate-response',
      'failed to get audio-video info',
      'rad.io',
      'candidate',
      'gptbot',
      'persistent-storage',
      'isBatterySupported',
      'navigator.languages_blank',
      'google-extended',
      'placeholder',
      'getAiaSignals',
      'data-autofilled',
      ':-moz-autofill',
      'failed to get permissions info',
      'pagevisibility',
      'forcetouch',
      '__fxdriver_unwrapped',
      'duration',
      'diffbot',
      'ACCELEROMETER_SUPPORTED',
      'localStorage',
      'processInputsWithTimeout',
      'Verizon',
      'Failed to detect autofill:',
      'document',
      'srcdoc_throws_error',
      'spawn',
      'opera',
      'indexOf',
      '(prefers-color-scheme: dark)',
      'PERMISSIONS.geolocation',
      'agentPort',
      'getObfsInfo',
      'devToolsOrientation',
      'audioInputDevices',
      'trustToken',
      'random',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'visitorId',
      'touchevents',
      'add',
      'webGlStatus',
      'cros',
      'engineVersion',
      'you',
      'queryUsageAndQuota',
      'floc_version',
      'horizontal',
      'outerWidth',
      'extendPrimitiveValues',
      'maxFragmentUniformVectors',
      'throw',
      'getRTCPeerConnection',
      'getOwnPropertyDescriptor',
      'Swiss',
      'web_gl',
      'MAX_TEXTURE_SIZE',
      'BLUTOOTH_SUPPORTED',
      'level',
      'WEB_RTC_SRFLX_IP',
      'json',
      'awesomium',
      'Safari',
      'Function_prototype_toString_invalid_typeError',
      'IS_CANVAS',
      'NAVIGATOR_VIBRATE',
      'arguments',
      'promiseTimeout',
      'tagName',
      '20030107',
      'contains',
      'claude-web',
      'consistent_plugins_prototype',
      'done',
      'REF_LINK',
      'exec',
      'MAX_VARYING_VECTORS',
      'headless_chrome',
      'Other',
      'join',
      'oai-searchbot',
      'safari',
      'race',
      'WEBKIT_FORCE_AT_MOUSE_DOWN',
      'webRtcUrl',
      'iframe_window',
      'push',
      'fontPreferences',
      'error',
      'permissions',
      'NAVIGATOR_PRESENTATION_SUPPORTED',
      'querySelectorAll not supported for autofill detection',
      'NAVIGATOR_CLIENT_HINTS_MOBILE',
      'consistent_mimetypes_prototype',
      'Chrome',
      'Failed to query input elements:',
      'userAgentData',
      'isBot',
      'geb',
      'Modernizr.on Failed with feature ',
      'quotamanagement',
      'FingerPrint failed',
      'moz-autofill',
      'NAVIGATOR_CLIENT_HINTS_PLATFORM',
      'data_view',
      'PERMISSIONS',
      'NAVIGATOR_APP_NAME',
      'minDecibels',
      'ZTE',
      'getWebglCanvas',
      'selenium-evaluate',
      'oscpu',
      'selenium_in_navigator',
      'WEBGL_MAXTEXTUREIMAGEUNITS',
      'StackTraceTester',
      'Dell',
      'monochrome',
      'browser',
      'split',
      'maxTextureImageUnits',
      'getHasLiedOs',
      'aiSignalsResult',
      'getCurrentPosition',
      'additionalMediaCodecs',
      'sqrt',
      'text',
      'window_html_webdriver',
      'load',
      'WEBGL_MAXTEXTURESIZE',
      '6157656ZpfHUz',
      'clipboard-read',
      'storage',
      'osVersion',
      'scrapy',
      'omgili',
      'architecture',
      'availHeight',
      'brand',
      'NETWORK_TYPE',
      ':-webkit-autofill',
      'SeleniumProperties',
      'fingerPrintComponents',
      'kind',
      'slice',
      'dischargingTime',
      'headlessResults',
      'searchLies',
      'Neither WebGL 2.0 nor WebGL 1.0 is supported.',
      'batteryInit',
      'pow',
      'isIphoneOrIPad',
      'failed to get broJsFingerprint info',
      'failed to get fingerprint info',
      'NAVIGATOR_MAX_TOUCH_POINTS',
      'writable',
      'failed to get battery info',
      'addEventListener',
      'Windows',
      'SCREEN_FRAME',
      'input:-webkit-autofill { animation: autofill-detection 0.001s; }',
      'IS_TOUCH_DEVICE',
      'localAgentAccessor',
      'PingOne Signals deviceCreatedAt: ',
      'initDeviceIdentity',
      'audioinput',
      'getLineDash',
      'batteryChargingTime',
      '4639743pRrmii',
      'openDatabase',
      'iframe',
      'onAutoFillStart',
      'msSaveBlob',
      '_WEBDRIVER_ELEM_CACHE',
      'HAS_CAMERA',
      'application/json',
      'DOCUMENT_ELEMENT_SELENIUM',
      'x_domain_request',
      'lied',
      'rgb(232, 240, 254)',
      'Failed to fetch the Workstation data. Invalid network response: ',
      'safeAddMetadata',
      'toLowerCase',
      'app',
      '(min-width: ',
      'WEBGL_MAXFRAGMENTUNIFORMVECTORS',
      'VENDOR_FLAVORS',
      '4710QYuxeJ',
      '__webdriver_script_function',
      'memory',
      'Unknown',
      'getOps',
      'requestIdleCallback',
      'custom_elements',
      '__selenium_unwrapped',
      'SDKBP_FINGERPRINT',
      'NAVIGATOR_DEVICE_MEMORY',
      'gpsSupported',
      'event_listener',
      'animationName',
      '(prefers-color-scheme: light)',
      'Insignia',
      'cant',
      'match',
      'mimeTypes',
      'exiforientation',
      'Envizen',
      'function get ',
      'open',
      'dark',
      'email',
      'Geolocation API is not supported by this browser.',
      'WEBGL_MAXCOMBINEDTEXTUREIMAGEUNITS',
      'service_worker',
      'DeviceMotionEvent',
      'deviceVendor',
      'customevent',
      'hasAttribute',
      'isArray',
      'dart',
      'setAttribute',
      '__proto__',
      'timpibot',
      'query_selector',
      'reducedTransparency',
      'Autofill detection timeout after processing ',
      'debug',
      'geolocation',
      'performance',
      'configurable',
      'collectWebRtc',
      'isAutofilled',
      'DEVICE_VENDOR',
      'ai2bot',
      'appendChild',
      'webkitRequestFileSystem',
      'parse',
      'renderer',
      'filter',
      'name',
      'onupgradeneeded',
      'xdomainrequest',
      '__driver_unwrapped',
      'atan',
      'Util',
      '__awaiter',
      'dataPoints',
      'maxRenderbufferSize',
      'getLocalAgentJwt',
      'set',
      'claudebot',
      'domAutomationController',
      'seleniumInWindow',
      'freeze',
      'data-lastpass-icon-id',
      'Failed to query input elements in async detection:',
      'fullscreen',
      'create',
      'localStorage.length',
      'Brave',
      'addIframeData',
      '14330728RUXYai',
      'Firefox',
      'fonts',
      'osCpu',
      'referrer',
      'numberOfVideoDevices',
      'detectChromium',
      'abort',
      '__selenium_evaluate',
      'Failed to get Fingerprint from getCurrentBrowserFingerPrint',
      'ops',
      'Notification',
      'languages',
      'ipod',
      'getAttribute',
      'label',
      'connect',
      'googleother-video',
      'floc',
      'Opera',
      'navigator',
      'audioIntVideoInit',
      'getSupportedExtensions',
      'PERMISSION_DENIED',
      'audioBaseLatency',
      'matchMedia',
      'find',
      'serviceworker',
      'cookiesEnabled',
      'statusText',
    ];
    return (
      (_0x455d = function () {
        return c;
      }),
      _0x455d()
    );
  }
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        [r(494)]() {
          const i = r;
          try {
            const t = {
              hasAutofill: !1,
              autofillCount: 0,
              detectedFields: [],
              detectionMethods: [],
            };
            if (typeof document === i(834))
              return (
                c[i(730)].Logger.warn(i(647)),
                {
                  hasAutofill: !1,
                  autofillCount: 0,
                  detectedFields: [],
                  detectionMethods: ['document-unavailable'],
                }
              );
            if (!document[i(549)])
              return (
                c[i(730)][i(1278)][i(482)](i(1007)),
                {
                  hasAutofill: !1,
                  autofillCount: 0,
                  detectedFields: [],
                  detectionMethods: [i(1214)],
                }
              );
            let e;
            try {
              e = document[i(549)]('input');
            } catch (v) {
              return (
                c[i(730)].Logger[i(482)](i(1011), v),
                {
                  hasAutofill: !1,
                  autofillCount: 0,
                  detectedFields: [],
                  detectionMethods: ['dom-query-error'],
                }
              );
            }
            if (e[i(684)] <= 50) return this[i(1349)](e, t);
            const o = 1e3,
              x = Math[i(398)](e[i(684)], o);
            return (
              e[i(684)] > o && c[i(730)][i(1278)][i(482)](i(438) + e[i(684)] + i(713) + o),
              this[i(937)](e, x, t)
            );
          } catch (t) {
            return (
              c[i(730)][i(1278)].warn(i(939), t),
              { hasAutofill: !1, autofillCount: 0, detectedFields: [], detectionMethods: [i(1004)] }
            );
          }
        }
        [r(1349)](i, t) {
          const e = r;
          for (let l = 0; l < i[e(684)]; l++)
            try {
              const o = i[l],
                x = this[e(792)](o);
              x[e(1146)] && this[e(644)](t, o, x);
            } catch (o) {
              c[e(730)][e(1278)][e(482)](e(1342) + l + ':', o);
            }
          return t;
        }
        [r(937)](i, t, e) {
          const l = r,
            o = performance[l(544)](),
            x = 100,
            v = 10;
          let y = 0;
          for (; y < t; ) {
            if (performance[l(544)]() - o > x) {
              c[l(730)][l(1278)][l(482)](l(1140) + y + '/' + t + l(520)),
                e[l(869)][l(944)](l(885)) === -1 && e[l(869)].push(l(885));
              break;
            }
            const L = Math[l(398)](y + v, t);
            for (let g = y; g < L; g++)
              try {
                const E = i[g],
                  f = this[l(792)](E);
                f[l(1146)] && this[l(644)](e, E, f);
              } catch (E) {
                c[l(730)][l(1278)][l(482)](l(1342) + g + ':', E);
              }
            y = L;
          }
          return e;
        }
        [r(644)](i, t, e) {
          const l = r;
          (i.hasAutofill = !0),
            i[l(798)]++,
            i.detectedFields[l(1002)]({
              type: t.type || l(1041),
              name: t[l(1154)] || '',
              id: t.id || '',
              placeholder: t[l(925)] || '',
              value: t[l(534)] ? t.value[l(643)](0, 3) + l(782) : '',
              detectionMethod: e[l(1212)],
            }),
            i[l(869)][l(944)](e[l(1212)]) === -1 && i[l(869)][l(1002)](e[l(1212)]);
        }
        [r(792)](i) {
          const t = r;
          if (!i || i[t(984)] !== t(1293)) return { isAutofilled: !1, method: 'none' };
          try {
            if (i[t(442)] && i[t(442)](t(1055))) return { isAutofilled: !0, method: t(617) };
          } catch {}
          try {
            if (i.matches && i[t(442)](t(928))) return { isAutofilled: !0, method: t(1018) };
          } catch {}
          try {
            const e = window[t(879)](i),
              l = e[t(606)];
            if ([t(710), t(1094)].indexOf(l) !== -1 || l.indexOf(t(422)) !== -1)
              return { isAutofilled: !0, method: 'background-color' };
          } catch {}
          try {
            if (i.value && i.value[t(684)] > 0) {
              if (i.hasAttribute(t(927)) || i.hasAttribute('autocompleted'))
                return { isAutofilled: !0, method: t(1223) };
              if (i[t(1132)](t(397)) || i.classList[t(986)](t(1237))) {
                const e = [t(1125), t(498), t(877), t(1154), t(842)];
                if (
                  e[t(806)](i[t(1252)]) ||
                  e.some((l) => i.name && i[t(1154)][t(1097)]()[t(806)](l))
                )
                  return { isAutofilled: !0, method: t(905) };
              }
            }
          } catch {}
          try {
            if (
              i.classList[t(986)](t(1284)) ||
              i[t(607)][t(986)](t(714)) ||
              i[t(1132)](t(808)) ||
              i[t(1132)](t(1169))
            )
              return { isAutofilled: !0, method: t(575) };
          } catch {}
          try {
            if (i[t(848)][t(1114)] === t(701) || i.style.animationName === t(1086))
              return { isAutofilled: !0, method: 'animation-detection' };
          } catch {}
          return { isAutofilled: !1, method: t(625) };
        }
        static setupAutofillDetection() {
          const i = r;
          try {
            if (!document.getElementById(i(775))) {
              const t = document[i(443)]('style');
              (t.id = i(775)), (t.textContent = i(1075) + i(423)), document[i(863)][i(1149)](t);
            }
            document[i(1072)](
              'animationstart',
              function (t) {
                const e = i;
                if (t[e(1114)] === 'autofill-detection') {
                  const l = t[e(646)];
                  l &&
                    l[e(984)] === e(1293) &&
                    (l[e(1135)](e(927), 'true'), l[e(607)].add(e(1284)));
                }
              },
              !0,
            );
          } catch (t) {
            c[i(730)][i(1278)][i(482)]('Failed to setup autofill detection:', t);
          }
        }
        [r(1332)]() {
          const i = r,
            t = this[i(494)]();
          return {
            AUTOFILL_DETECTED: t.hasAutofill,
            AUTOFILL_COUNT: t[i(798)],
            AUTOFILL_FIELDS_COUNT: t[i(506)][i(684)],
            AUTOFILL_METHODS: t[i(869)][i(995)](','),
            AUTOFILL_FIELD_TYPES: t[i(506)][i(1236)]((e) => e[i(1252)])[i(995)](','),
            AUTOFILL_HAS_EMAIL: t.detectedFields[i(1344)]((e) => e[i(1252)] === 'email'),
            AUTOFILL_HAS_PASSWORD: t.detectedFields[i(1344)]((e) => e.type === i(498)),
            AUTOFILL_HAS_NAME: t[i(506)][i(1344)](
              (e) => e[i(1154)][i(1097)]().includes('name') || e[i(1252)] === i(1041),
            ),
          };
        }
        getAutofillMetadataAsync() {
          return __awaiter(this, void 0, void 0, function* () {
            const i = _0x4e19,
              t = yield this[i(703)]();
            return {
              AUTOFILL_DETECTED: t[i(762)],
              AUTOFILL_COUNT: t.autofillCount,
              AUTOFILL_FIELDS_COUNT: t[i(506)][i(684)],
              AUTOFILL_METHODS: t.detectionMethods[i(995)](','),
              AUTOFILL_FIELD_TYPES: t[i(506)][i(1236)]((e) => e[i(1252)])[i(995)](','),
              AUTOFILL_HAS_EMAIL: t.detectedFields.some((e) => e.type === i(1125)),
              AUTOFILL_HAS_PASSWORD: t[i(506)][i(1344)]((e) => e[i(1252)] === i(498)),
              AUTOFILL_HAS_NAME: t[i(506)][i(1344)](
                (e) => e[i(1154)][i(1097)]()[i(806)]('name') || e[i(1252)] === i(1041),
              ),
            };
          });
        }
        [r(696)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const i = _0x4e19;
            try {
              const t = document.querySelectorAll(i(1279))[i(684)];
              return t > 500
                ? (c[i(730)][i(1278)][i(613)](i(557) + t + i(406)), yield this[i(790)]())
                : (c._POSignalsUtils[i(1278)][i(613)](i(1327) + t + i(424)),
                  this.getAutofillMetadata());
            } catch (t) {
              return c[i(730)].Logger[i(482)](i(573), t), this[i(1332)]();
            }
          });
        }
        [r(703)]() {
          return __awaiter(this, void 0, void 0, function* () {
            return new Promise((i) => {
              const t = _0x4e19;
              try {
                const e = {
                  hasAutofill: !1,
                  autofillCount: 0,
                  detectedFields: [],
                  detectionMethods: [],
                };
                if (typeof document === t(834)) {
                  c[t(730)][t(1278)][t(482)](t(493)),
                    i({
                      hasAutofill: !1,
                      autofillCount: 0,
                      detectedFields: [],
                      detectionMethods: [t(417)],
                    });
                  return;
                }
                let l;
                try {
                  l = document.querySelectorAll(t(1279));
                } catch (g) {
                  c._POSignalsUtils[t(1278)].warn(t(1170), g),
                    i({
                      hasAutofill: !1,
                      autofillCount: 0,
                      detectedFields: [],
                      detectionMethods: [t(510)],
                    });
                  return;
                }
                const o = 2e3,
                  x = Math[t(398)](l[t(684)], o),
                  v = 20;
                let y = 0;
                const L = () => {
                  const g = t,
                    E = Math[g(398)](y + v, x);
                  for (let f = y; f < E; f++)
                    try {
                      const m = l[f],
                        w = this[g(792)](m);
                      w[g(1146)] && this[g(644)](e, m, w);
                    } catch (m) {
                      c[g(730)].Logger[g(482)]('Error processing input ' + f + g(1259), m);
                    }
                  (y = E),
                    y >= x
                      ? i(e)
                      : window[g(1107)]
                        ? window[g(1107)](L, { timeout: 50 })
                        : setTimeout(L, 0);
                };
                window[t(1107)] ? window[t(1107)](L, { timeout: 50 }) : setTimeout(L, 0);
              } catch (e) {
                c[t(730)][t(1278)][t(482)](t(1240), e),
                  i({
                    hasAutofill: !1,
                    autofillCount: 0,
                    detectedFields: [],
                    detectionMethods: [t(604)],
                  });
              }
            });
          });
        }
      }
      n.AutofillDetector = a;
    })((p = c[h(1216)] || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        get OPS() {
          const t = _0x4e19;
          if (!this[t(770)][t(873)][t(1066)]) return 0;
          let e = this[t(1315)][t(1186)];
          return !e && ((e = this[t(1106)]()), (this[t(1315)][t(1186)] = e)), e;
        }
        constructor(t, e, l, o) {
          const x = _0x4e19;
          (this.sessionData = t),
            (this.metadataParams = e),
            (this.externalIdentifiers = l),
            (this[x(1077)] = o),
            (this[x(540)] = null),
            (this[x(1282)] = null),
            (this[x(874)] = null),
            (this.hasSpeakers = null),
            (this[x(603)] = null),
            (this[x(922)] = null),
            (this[x(465)] = null),
            (this[x(900)] = null),
            (this[x(1082)] = null),
            (this.batteryDischargingTime = null),
            (this[x(850)] = new Map()),
            (this.lieTests = {}),
            (this.gpsSupported = null),
            (this[x(708)] = new Set([
              x(508),
              x(1051),
              x(411),
              x(1200),
              x(425),
              'colorDepth',
              x(538),
              x(743),
              x(1204),
              x(680),
              x(542),
              x(524),
              'domBlockers',
              x(1003),
              x(1178),
              x(593),
              x(744),
              x(407),
              x(758),
              'invertedColors',
              x(1188),
              x(936),
              x(1032),
              x(1084),
              x(1179),
              x(722),
              x(857),
              x(1339),
              x(1229),
              x(615),
              x(1139),
              x(670),
              x(810),
              'sessionStorage',
              x(721),
              'touchSupport',
              x(804),
              x(665),
              x(569),
            ])),
            (this[x(957)] = -1),
            (this[x(1181)] = 0),
            (this[x(388)] = 0),
            (this.videoInputDevices = []),
            (this.audioInputDevices = []),
            (this.audioOutputDevices = []),
            (this[x(454)] = new Map()),
            (this[x(691)] = null),
            (this[x(562)] = null),
            (this[x(729)] = 0),
            (this[x(752)] = new c[x(1210)](1)),
            (this[x(661)] = null),
            (this[x(1037)] = null),
            (this[x(531)] = new n[x(1267)]());
        }
        getDeviceAttributes() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19;
            return this[t(752)][t(956)](() =>
              __awaiter(this, void 0, void 0, function* () {
                const e = t;
                !this[e(691)] &&
                  ((this[e(691)] = yield this[e(896)]()),
                  c[e(730)].Logger[e(613)](e(1276)),
                  c._POSignalsUtils[e(1278)][e(613)](e(1255) + this[e(540)]),
                  c._POSignalsUtils.Logger[e(613)](e(1078) + this[e(1282)]),
                  this.sessionData[e(704)]());
                const l =
                  typeof window != 'undefined' &&
                  window[e(1246)] &&
                  typeof window[e(1246)][e(684)] === e(1307)
                    ? window[e(1246)].length
                    : null;
                return (
                  this[e(691)] && (this.lastCalculatedMetadata.BROWSER_TAB_HISTORY_LENGTH = l),
                  this[e(1315)] && this[e(1315)].htmlGeoLocation && (yield this[e(408)]()),
                  yield this[e(667)](),
                  this[e(1315)] && this[e(1315)][e(1257)] && this[e(926)](),
                  this.sessionData[e(624)] && (this[e(661)] = JSON[e(662)](this[e(691)])),
                  this.lastCalculatedMetadata
                );
              }),
            );
          });
        }
        getGeoLocationData() {
          var t, e, l, o;
          return __awaiter(this, void 0, void 0, function* () {
            const x = _0x4e19;
            this[x(691)] = Object[x(700)](Object[x(700)]({}, this.lastCalculatedMetadata), {
              htmlGeoLocation_latitude: void 0,
              htmlGeoLocation_longitude: void 0,
              htmlGeoLocation_accuracy: void 0,
              htmlGeoLocation_speed: void 0,
              htmlGeoLocation_heading: void 0,
              htmlGeoLocation_timestamp: void 0,
              htmlGeoLocation_ErrorMessage: '',
              htmlGeoLocation_ErrorCode: '',
            });
            const v = (S, U = '') => {
                const T = x,
                  O = S[T(684)] > 255 ? S[T(1059)](0, 252) + T(1289) : S;
                return (
                  (this[T(691)][T(1298)] = O),
                  (this[T(691)].htmlGeoLocation_ErrorCode = U),
                  { status: 'error', message: O }
                );
              },
              y = (S) => {
                const U = x;
                switch (S) {
                  case 1:
                    return v(
                      'Geolocation retrieval failed: Location permission denied by the user.',
                      U(1199),
                    );
                  case 2:
                    return v(
                      'Geolocation retrieval failed: Location information is unavailable.',
                      U(559),
                    );
                  case 3:
                    return v(U(887), 'TIMEOUT');
                  default:
                    return v(U(767), 'POSITION_UNAVAILABLE');
                }
              };
            if (!navigator.geolocation) return v(x(1126), x(821));
            const L = this[x(691)].BROWSER_NAME[x(1097)](),
              g = L[x(806)](x(396)),
              E = L[x(806)](x(997));
            let f = !1;
            const m = yield navigator[x(1005)][x(838)]({ name: 'geolocation' });
            if (((this[x(691)][x(946)] = m[x(652)]), m[x(652)] === x(648)))
              return v(x(766) + m.state + x(487) + L + "'.", x(1199));
            const w = this[x(1315)][x(1320)]();
            if (w)
              try {
                const S = JSON[x(1151)](w);
                if (S && S.latitude && S[x(779)])
                  (this[x(691)][x(1273)] = S[x(558)] ? parseFloat(S[x(558)][x(421)](2)) : null),
                    (this.lastCalculatedMetadata[x(687)] = S[x(779)]
                      ? parseFloat(S[x(779)][x(421)](2))
                      : null),
                    (this[x(691)][x(628)] = (t = S[x(795)]) !== null && t !== void 0 ? t : null),
                    (this[x(691)][x(596)] = (e = S[x(481)]) !== null && e !== void 0 ? e : null),
                    (this[x(691)][x(878)] = (l = S[x(600)]) !== null && l !== void 0 ? l : null),
                    (this[x(691)][x(1306)] = (o = S[x(755)]) !== null && o !== void 0 ? o : null),
                    delete this[x(691)][x(1298)],
                    delete this[x(691)].htmlGeoLocation_ErrorCode,
                    (f = !0);
                else if (S && S[x(441)]) return (f = !1), y(S.error_code);
              } catch (S) {
                c[x(730)][x(1278)][x(482)](x(599), S);
              }
            if (m[x(652)] === x(676))
              return yield new Promise((S) => {
                const U = { timeout: 500 },
                  T = (O = 1) => {
                    const C = _0x4e19;
                    navigator[C(1142)][C(1038)](
                      (k) => {
                        const R = C;
                        var H;
                        const {
                          latitude: ee,
                          longitude: M,
                          accuracy: K,
                          speed: Z,
                          heading: le,
                        } = k[R(1230)];
                        if ((!ee || !M || ee === 0 || M === 0) && (g || E) && O === 1) return T(2);
                        (this[R(691)].htmlGeoLocation_latitude = ee
                          ? parseFloat(ee[R(421)](2))
                          : void 0),
                          (this[R(691)][R(687)] = M ? parseFloat(M[R(421)](2)) : void 0),
                          (this[R(691)].htmlGeoLocation_accuracy = K),
                          (this.lastCalculatedMetadata[R(596)] = Z),
                          (this[R(691)][R(878)] = le),
                          (this[R(691)][R(1306)] =
                            (H = k[R(755)]) !== null && H !== void 0 ? H : null),
                          delete this[R(691)][R(1298)],
                          delete this[R(691)][R(785)],
                          (f = !0),
                          S({ status: 'granted' });
                      },
                      (k) => {
                        S(y(k[C(866)])), (f = !1);
                      },
                      U,
                    );
                  };
                T();
              });
            if (!f)
              return v("Geolocation permission state is '" + m[x(652)] + x(405) + L + "'", x(559));
          });
        }
        [r(667)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19;
            yield this.calculatedDevToolsOpen();
            const e =
              typeof window !== t(834) &&
              window[t(1246)] &&
              typeof window[t(1246)][t(684)] === t(1307)
                ? window[t(1246)].length
                : null;
            this[t(691)] && (this.lastCalculatedMetadata[t(706)] = e);
            const l = this[t(531)].getAutofillMetadata();
            Object[t(700)](this.lastCalculatedMetadata, l);
          });
        }
        calculatedDevToolsOpen() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19,
              e = 160,
              l = window[t(964)] - window.innerWidth > e,
              o = window[t(504)] - window[t(658)] > e,
              x = t(l ? 888 : 963);
            (this[t(691)][t(409)] = t(l || o ? 1123 : 469)),
              (this[t(691)][t(949)] = l || o ? x : t(556));
          });
        }
        [r(1163)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19;
            return this[t(752)][t(956)](() =>
              __awaiter(this, void 0, void 0, function* () {
                const e = t;
                if (this.localAgentJwtRequestCount >= 5) return this[e(562)];
                if (this.sessionData[e(472)])
                  return (
                    !this[e(562)] && (this[e(562)] = yield this[e(1077)][e(394)]()),
                    this[e(729)]++,
                    this[e(562)]
                  );
              }),
            );
          });
        }
        [r(948)]() {
          return { identifier: 'x1', key: r(509) };
        }
        [r(776)]() {
          return this[r(661)];
        }
        [r(896)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19;
            this[t(1112)] = navigator.geolocation != null;
            const e = this[t(770)].metadataBlackList,
              l = [
                this.sessionData[t(1079)]()[t(765)]((x) => {
                  const v = t;
                  c._POSignalsUtils.Logger[v(482)]('failed to get deviceId info', x);
                }),
                this.getFingerPrint(e)[t(765)]((x) => {
                  const v = t;
                  c[v(730)][v(1278)][v(482)](v(1068), x[v(728)]);
                }),
                this[t(787)]()[t(765)]((x) => {
                  const v = t;
                  c._POSignalsUtils.Logger[v(482)](v(1067), x[v(728)]);
                }),
                n[t(768)][t(452)]()[t(765)]((x) => c._POSignalsUtils[t(1278)][t(482)](t(820), x)),
                this[t(502)]().catch((x) => c[t(730)].Logger[t(482)](t(929), x)),
                new n[t(645)](e)
                  [t(416)]()
                  [t(765)]((x) => c._POSignalsUtils.Logger[t(482)](t(760), x)),
                new n[t(530)](e)
                  [t(1241)]()
                  [t(765)]((x) => c._POSignalsUtils[t(1278)][t(482)](t(748), x)),
                this[t(1197)]()[t(765)]((x) => c[t(730)].Logger[t(482)](t(917), x)),
                this[t(1064)]()[t(765)]((x) => c._POSignalsUtils[t(1278)][t(482)](t(1071), x)),
              ];
            ([
              this[t(540)],
              this[t(434)],
              this[t(635)],
              this[t(565)],
              this[t(1005)],
              this[t(850)],
              this[t(1346)],
            ] = yield Promise[t(881)](l)),
              (this[t(1282)] = this[t(1315)][t(746)]());
            const o = {
              ops: this[t(681)],
              devicePixelRatio: window[t(738)],
              screenWidth: window[t(672)][t(527)],
              screenHeight: window[t(672)][t(541)],
            };
            return (
              c[t(730)][t(1159)][t(965)](o, screen, !1),
              Object[t(700)](
                Object[t(700)](
                  Object[t(700)](
                    Object[t(700)](
                      {
                        deviceId: this[t(540)],
                        device_created_ts: this[t(1282)],
                        deviceType: this[t(770)][t(873)][t(554)],
                        osVersion:
                          (this[t(770)][t(873)][t(392)] + ' ' + this[t(770)][t(873)].osVersion)[
                            t(751)
                          ]() || '',
                        externalIdentifiers: this[t(872)],
                        origin: location.origin,
                        href: location.href,
                      },
                      yield this[t(1345)](e),
                    ),
                    this[t(1314)](),
                  ),
                  this[t(1337)](),
                ),
                o,
              )
            );
          });
        }
        [r(1064)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19,
              e = this;
            yield c[t(730)].Util[t(983)](
              50,
              new Promise((l, o) => {
                const x = t;
                navigator.getBattery
                  ? ((this[x(922)] = !0),
                    navigator[x(1285)]()
                      [x(659)]((v) => {
                        const y = x;
                        v &&
                          ((e[y(465)] = v[y(974)]),
                          (e.batteryCharging = v.charging),
                          (e[y(1082)] = v.chargingTime),
                          (e[y(492)] = v[y(1060)])),
                          l();
                      })
                      [x(765)]((v) => {
                        const y = x;
                        c._POSignalsUtils.Logger[y(482)](y(536) + v), l();
                      }))
                  : (c._POSignalsUtils.Logger[x(1141)](x(876)), l());
              }),
            );
          });
        }
        [r(463)]() {
          const t = r,
            e = /^((?!chrome|android).)*safari/i.test(navigator[t(1250)]);
          return !c[t(730)][t(1159)].inIframe() || !e;
        }
        [r(968)]() {
          const t = r;
          let e = window[t(651)] || window[t(1331)] || window[t(649)];
          if (!e) {
            const l = window['iframe.contentWindow'];
            l && (e = l.RTCPeerConnection || l[t(1331)] || l[t(649)]);
          }
          return e;
        }
        [r(1145)]() {
          const t = r,
            e = this;
          try {
            const l = {},
              o = this[t(968)](),
              x = { optional: [{ RtpDataChannels: !0 }] },
              v = { iceServers: [{ urls: this[t(770)][t(1e3)][t(751)]() }] },
              y = new o(v, x);
            (y.onicecandidate = (L) => {
              const g = t,
                E = 1;
              if (L[g(919)]) {
                const f = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/,
                  m = f[g(991)](L.candidate[g(919)])[1];
                l[m] === void 0 &&
                  (L[g(919)][g(919)].indexOf(g(841)) > 0
                    ? e.webRtcIps[g(1164)](g(1264), m)
                    : L[g(919)].candidate.indexOf('srflx') > 0 && e[g(454)][g(1164)](g(975), m)),
                  (l[m] = !0);
              }
            }),
              y[t(1309)](''),
              y[t(1221)](
                function (L) {
                  y[t(1286)](
                    L,
                    function () {},
                    function () {},
                  );
                },
                function () {},
              );
          } catch {}
        }
        [r(1197)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19,
              e = this;
            yield c[t(730)][t(1159)][t(983)](
              50,
              new Promise((l, o) => {
                const x = t;
                if (!this[x(463)]()) {
                  c[x(730)][x(1278)][x(1141)](x(532)), l();
                  return;
                }
                if (!navigator[x(864)] || !navigator.mediaDevices.enumerateDevices) {
                  c._POSignalsUtils.Logger.debug(x(440)), l();
                  return;
                }
                navigator.mediaDevices
                  .enumerateDevices()
                  .then((v) => {
                    const y = x;
                    v[y(447)]((L) => {
                      const g = y;
                      L[g(1058)] &&
                        (L[g(1058)].toLowerCase() == g(1080)
                          ? ((e[g(874)] = !0),
                            e.numberOfAudioDevices++,
                            L.label && e[g(950)][g(1002)](L[g(1191)]))
                          : L[g(1058)][g(1097)]() == 'videoinput'
                            ? ((e[g(603)] = !0),
                              e.numberOfVideoDevices++,
                              L[g(1191)] && e[g(415)][g(1002)](L[g(1191)]))
                            : L.kind[g(1097)]() == g(750) &&
                              ((e.hasSpeakers = !0),
                              e[g(388)]++,
                              L[g(1191)] && e.audioOutputDevices[g(1002)](L.label)));
                    }),
                      l();
                  })
                  [x(765)]((v) => {
                    const y = x;
                    c[y(730)][y(1278)][y(482)](y(460), v), l();
                  });
              }),
            );
          });
        }
        [r(413)](t) {
          return __awaiter(this, void 0, void 0, function* () {
            const e = _0x4e19;
            if (t[e(1263)](e(801))) return Promise.resolve('');
            const l = new Promise((x, v) =>
                __awaiter(this, void 0, void 0, function* () {
                  const y = e;
                  try {
                    const L = yield c.FingerprintJS[y(1043)](),
                      g = yield L[y(1281)]();
                    (this[y(434)] = g[y(954)]), (this[y(1057)] = g[y(551)]), x(g[y(954)]);
                  } catch (L) {
                    c._POSignalsUtils[y(1278)][y(482)](y(467) + L);
                    const g = { err: L, message: y(1017) };
                    v(g);
                  }
                }),
              ),
              o = new Promise((x, v) =>
                __awaiter(this, void 0, void 0, function* () {
                  const y = e;
                  yield c._POSignalsUtils.Util.delay(this[y(770)].fingerprintTimeoutMillis);
                  const L = { message: y(660) };
                  v(L);
                }),
              );
            return yield Promise[e(998)]([l, o]);
          });
        }
        [r(787)]() {
          return __awaiter(this, void 0, void 0, function* () {
            return new Promise((t, e) => {
              const l = _0x4e19;
              c[l(631)]
                [l(891)]()
                [l(659)]((o) => {
                  const x = l;
                  (this[x(635)] = o), t(o);
                })
                [l(765)]((o) => {
                  const x = l;
                  c[x(730)].Logger[x(482)](x(1185), o), e(o);
                });
            });
          });
        }
        getSensorsMetadata() {
          const t = r,
            e = {};
          return (
            this[t(584)](e, t(736), () => t(823) in window),
            this[t(584)](e, t(1076), () => t(789) in window),
            !window[t(1129)] && this[t(584)](e, t(935), () => !1),
            !window[t(860)] && this[t(584)](e, 'GYROSCOPE_SUPPORTED', () => !1),
            this[t(584)](e, t(693), () => t(862) in window),
            e
          );
        }
        [r(1345)](t) {
          return __awaiter(this, void 0, void 0, function* () {
            const e = _0x4e19,
              l = this,
              o = {};
            this.flatAndAddMetadata(o, e(880), () => this[e(434)]),
              this[e(584)](o, e(1110), () => this.broJsFingerprint),
              this[e(770)][e(873)][e(1012)] &&
                (this[e(584)](o, 'OS_NAME', () => {
                  const f = e;
                  return this.metadataParams.browserInfo[f(392)];
                }),
                this[e(584)](o, 'OS_VERSION', () => {
                  const f = e;
                  return this[f(770)][f(873)][f(1048)];
                })),
              this[e(770)].browserInfo[e(1012)] &&
                (this[e(584)](o, 'DEVICE_MODEL', () => {
                  const f = e;
                  return this.metadataParams[f(873)].deviceModel;
                }),
                this.flatAndAddMetadata(o, e(1147), () => {
                  const f = e;
                  return this.metadataParams[f(873)][f(1130)];
                }),
                this.flatAndAddMetadata(o, 'DEVICE_CATEGORY', () => {
                  const f = e;
                  return this[f(770)].browserInfo[f(725)];
                })),
              this[e(770)].browserInfo[e(1012)] &&
                (this.flatAndAddMetadata(o, e(886), () => {
                  const f = e;
                  return this[f(770)].browserInfo[f(437)];
                }),
                this[e(584)](o, e(418), () => {
                  const f = e;
                  return this.metadataParams.browserInfo[f(959)];
                })),
              this.metadataParams[e(873)][e(1012)] &&
                this.flatAndAddMetadata(o, e(870), () => {
                  const f = e;
                  return this.metadataParams[f(873)].cpuArchitecture;
                }),
              this[e(770)][e(873)].userAgentData &&
                (this[e(584)](o, 'BROWSER_NAME', () => this[e(770)].browserInfo.browserName),
                this.flatAndAddMetadata(o, e(813), () => {
                  const f = e;
                  return this[f(770)][f(873)].browserVersion;
                }),
                this[e(584)](o, 'BROWSER_MAJOR', () => {
                  const f = e;
                  return this[f(770)].browserInfo[f(470)];
                }),
                this.flatAndAddMetadata(o, e(686), () => {
                  const f = e;
                  return this[f(770)][f(873)][f(490)];
                }));
            const x = new n[e(550)]();
            this[e(584)](o, e(555), () => {
              const f = e;
              return x[f(1301)](this[f(770)][f(873)][f(1012)].ua);
            }),
              this.flatAndAddMetadata(o, e(641), () => {
                const f = e;
                return x[f(1013)](this[f(770)][f(873)][f(1012)].ua);
              }),
              this[e(584)](o, e(1213), () => {
                const f = e;
                return x[f(907)](this[f(770)][f(873)][f(1012)].engine);
              }),
              this[e(584)](o, e(854), () => {
                const f = e;
                return x[f(753)](this[f(770)][f(873)][f(1012)].ua);
              }),
              this[e(584)](o, e(692), () => navigator.vendor),
              this[e(584)](o, e(473), () => {
                const f = e;
                return navigator[f(1339)] ? navigator[f(1339)][f(684)] : null;
              }),
              this.flatAndAddMetadata(o, e(547), () => {
                const f = e;
                return navigator[f(1119)] ? navigator.mimeTypes[f(684)] : null;
              }),
              this[e(584)](o, e(819), () => {
                const f = e;
                return (
                  navigator[f(1244)] ||
                  navigator.userLanguage ||
                  navigator[f(1311)] ||
                  navigator[f(690)]
                );
              }),
              this.flatAndAddMetadata(o, e(588), () => navigator[e(1188)]),
              this[e(584)](o, e(1069), () => navigator[e(1251)] || navigator.msMaxTouchPoints),
              this.flatAndAddMetadata(o, 'NAVIGATOR_POINTER_ENABLED', () => {
                const f = e;
                return navigator[f(685)] || navigator[f(677)];
              }),
              this.flatAndAddMetadata(o, e(871), () => navigator[e(601)]),
              this[e(584)](o, e(844), () => navigator.hardwareConcurrency),
              this[e(584)](o, e(981), () => navigator[e(445)] != null),
              this.flatAndAddMetadata(o, e(911), () => e(1187) in window),
              this[e(584)](o, 'NAVIGATOR_APP_CODE_NAME', () => navigator.appCodeName),
              this[e(584)](o, e(1022), () => navigator[e(826)]),
              this[e(584)](o, e(533), () => navigator[e(451)]),
              this.flatAndAddMetadata(o, e(1224), () => navigator.onLine),
              this[e(584)](o, 'NAVIGATOR_PLATFORM', () => navigator[e(857)]),
              this[e(584)](o, 'NAVIGATOR_PRODUCT', () => navigator[e(865)]),
              this[e(584)](o, e(595), () => navigator[e(1250)]),
              this[e(584)](o, 'NAVIGATOR_PDF_VIEWER_ENABLED', () => navigator.pdfViewerEnabled),
              this[e(584)](o, e(1111), () => navigator[e(524)]),
              this[e(584)](o, e(525), () => {
                const f = e;
                return navigator[f(1343)] ? navigator[f(1343)][f(912)] : null;
              }),
              !t[e(1263)]('modernizr') && (yield this.safeAddModernizrFeatures(o));
            const v = window._pingOneSignalsPingResult || window[e(507)];
            v
              ? this.flatAndAddMetadata(o, e(657), () => v)
              : this.flatAndAddMetadata(o, 'JS_CHALLENGE', () => 'unknown'),
              this[e(584)](o, e(706), () => {
                const f = e;
                return typeof window !== f(834) &&
                  window.history &&
                  typeof window.history[f(684)] == 'number'
                  ? window[f(1246)][f(684)]
                  : null;
              });
            const y = new n.WebGLMetadata();
            if (
              (this.flatAndAddMetadata(o, e(832), () => y[e(626)]()),
              this[e(584)](o, 'WEBGLVENDORANDRENDERER', () => {
                const f = e;
                return y[f(543)]().vendor + '~' + y[f(543)]()[f(1152)];
              }),
              this[e(584)](o, e(1297), () => y[e(491)]()),
              y[e(491)]()
                ? this[e(584)](o, 'WEBGL2VENDORANDRENDERER', () => {
                    const f = e;
                    return y[f(543)]()[f(804)] + '~' + y[f(543)]()[f(1152)];
                  })
                : this[e(584)](o, e(586), () => ''),
              this[e(584)](o, e(822), () => {
                const f = e;
                return y[f(543)]()[f(1323)];
              }),
              this[e(584)](o, e(756), () => y.getWebglData().shadingLanguageVersion),
              this[e(584)](o, e(749), () => {
                const f = e;
                return y[f(543)]()[f(831)][f(684)];
              }),
              this.flatAndAddMetadata(o, e(1044), () => y[e(543)]().maxTextureSize),
              this.flatAndAddMetadata(o, e(516), () => {
                const f = e;
                return y.getWebglData()[f(1162)];
              }),
              this[e(584)](o, e(1029), () => {
                const f = e;
                return y.getWebglData()[f(1035)];
              }),
              this[e(584)](o, 'WEBGL_MAXVERTEXTEXTUREIMAGEUNITS', () => {
                const f = e;
                return y[f(543)]()[f(1219)];
              }),
              this.flatAndAddMetadata(o, e(1127), () => y[e(543)]().maxCombinedTextureImageUnits),
              this.flatAndAddMetadata(o, e(500), () => {
                const f = e;
                return y[f(543)]()[f(1304)];
              }),
              this[e(584)](o, e(716), () => y[e(543)]().maxVaryingVectors),
              this[e(584)](o, 'WEBGL_MAXVERTEXUNIFORMVECTORS', () => {
                const f = e;
                return y.getWebglData()[f(726)];
              }),
              this.flatAndAddMetadata(o, e(1100), () => {
                const f = e;
                return y[f(543)]()[f(966)];
              }),
              this[e(584)](o, e(614), () => y[e(505)]()),
              this[e(584)](o, 'HASLIEDRESOLUTION', () => y[e(466)]()),
              this[e(584)](o, 'HASLIEDOS', () => y[e(1036)]()),
              this.flatAndAddMetadata(o, e(489), () => y[e(1308)]()),
              this.fingerPrintComponents)
            )
              for (const f in this[e(1057)]) {
                if (!this[e(1057)][e(618)](f)) continue;
                const m = this[e(1057)][f];
                f == e(1178)
                  ? this.flatAndAddMetadata(o, e(1207), () => m[e(534)].length)
                  : f == e(425)
                    ? this[e(584)](o, e(980), () => m[e(534)] != null)
                    : f == e(810) && m[e(534)] && m[e(534)].length
                      ? this[e(584)](o, e(894), () => {
                          const w = e;
                          return m[w(534)][w(995)](',');
                        })
                      : f == e(1233) && m[e(534)]
                        ? this[e(584)](o, e(483), () => m[e(534)])
                        : f == e(411) && m[e(534)]
                          ? this[e(584)](o, 'AUDIO_FINGERPRINT', () => m[e(534)])
                          : f == 'osCpu' && m.value
                            ? this[e(584)](o, e(855), () => m[e(534)])
                            : f == 'cookiesEnabled' && m.value
                              ? this[e(584)](o, e(403), () => m[e(534)])
                              : f == e(670) && m[e(534)] && m[e(534)][e(684)]
                                ? this[e(584)](o, e(1074), () => m.value.join(','))
                                : f == e(1051) && m[e(534)]
                                  ? this[e(584)](o, 'ARCHITECTURE', () => m[e(534)])
                                  : f == e(655) && m[e(933)]
                                    ? this[e(584)](o, 'DOM_BLOCKERS', () => m[e(933)])
                                    : f == e(1003) && m.value
                                      ? this[e(584)](o, e(734), () => m.value)
                                      : f == e(722) && m[e(534)]
                                        ? this[e(584)](o, e(830), () => m[e(534)])
                                        : f == e(665) && m[e(534)] && m[e(534)][e(684)]
                                          ? this[e(584)](o, e(1101), () => m[e(534)].join(','))
                                          : f == e(581) && m[e(534)]
                                            ? this[e(584)](o, e(1303), () => {
                                                const w = e;
                                                return m[w(534)][w(1152)];
                                              })
                                            : l.fingerPrintComponentKeys[e(1263)](f) &&
                                              f != null &&
                                              this[e(584)](o, f[e(849)](), () => m.value);
              }
            this[e(584)](o, 'IS_PRIVATE_MODE', () => this[e(565)]),
              this[e(584)](o, e(1242), () => this[e(957)]);
            const L = {
              selenium:
                navigator[e(601)] ||
                c[e(730)][e(1159)][e(1190)](window[e(940)][e(780)], e(601)) ||
                '',
              phantomjs: {
                _phantom: window[e(847)] || '',
                __phantomas: window.__phantomas || '',
                callPhantom: window.callPhantom || '',
              },
              nodejs: { Buffer: window[e(1209)] || '' },
              couchjs: { emit: window[e(515)] || '' },
              rhino: { spawn: window[e(942)] || '' },
              chromium: {
                domAutomationController: window[e(1166)] || '',
                domAutomation: window[e(902)] || '',
              },
              outerWidth: window.outerWidth,
              outerHeight: window[e(504)],
            };
            this[e(584)](o, e(582), () => L),
              this[e(584)](o, e(582), () => this[e(850)]),
              this[e(584)](o, e(609), () => {
                const f = e,
                  m = {};
                for (const w in this.lieTests) m[w] = JSON.stringify(this.lieTests[w]);
                return Object[f(1222)](m)[f(684)] > 0 ? m : null;
              }),
              this[e(584)](o, e(450), () => new n.DetectStealth(t).getStealthResult()),
              this.flatAndAddMetadata(o, e(990), () => document[e(1180)]),
              this[e(584)](o, e(597), () => {
                const f = e,
                  m = { length: navigator[f(1339)][f(684)], details: [] };
                for (let w = 0; w < m.length; w++)
                  m[f(733)][f(1002)]({
                    length: navigator[f(1339)][w].length,
                    name: navigator.plugins[w][f(1154)],
                    version: navigator[f(1339)][w].version,
                    filename: navigator[f(1339)][w].filename,
                  });
                return m;
              }),
              this[e(584)](o, e(427), () => this[e(388)]),
              this[e(584)](o, e(852), () => this[e(1181)]),
              this[e(584)](o, 'VIDEO_INPUT_DEVICES', () => this[e(415)].toString()),
              this[e(584)](o, e(678), () => this.audioInputDevices.toString()),
              this.flatAndAddMetadata(o, e(699), () => {
                const f = e;
                return this[f(560)][f(1340)]();
              }),
              this[e(584)](o, e(444), () => {
                const f = e;
                return this[f(464)](f(720));
              }),
              this[e(584)](o, e(897), () => {
                const f = e;
                return this[f(464)](f(914));
              }),
              this[e(584)](o, e(843), () => this[e(464)]('audio/aac'));
            const g = this[e(770)][e(1039)];
            for (const f in g)
              g.hasOwnProperty(f) && this[e(584)](o, e(796) + f, () => this[e(464)](g[f]));
            window[e(1143)] &&
              window[e(1143)][e(1104)] &&
              (this[e(584)](o, 'MEMORY_HEAP_SIZE_LIMIT', () => {
                const f = e;
                return window[f(1143)][f(1104)].jsHeapSizeLimit;
              }),
              this[e(584)](o, 'MEMORY_TOTAL_HEAP_SIZE', () => {
                const f = e;
                return window[f(1143)][f(1104)][f(1292)];
              }),
              this[e(584)](o, e(1335), () => window.performance.memory.usedJSHeapSize)),
              this[e(584)](o, e(861), () => navigator[e(724)]),
              this[e(584)](o, e(461), () => n.SeleniumProperties.seleniumInDocument()),
              this[e(584)](o, 'selenium_in_window', () => {
                const f = e;
                return n[f(1056)][f(1167)]();
              }),
              this[e(584)](o, e(1028), () => {
                const f = e;
                return n.SeleniumProperties[f(548)]();
              }),
              this[e(584)](o, 'selenium_sequentum', () => {
                const f = e;
                return n[f(1056)][f(656)]();
              }),
              this[e(584)](o, e(1091), () => {
                const f = e;
                return c[f(730)][f(1159)][f(1190)](window[f(940)][f(780)], f(915));
              }),
              this[e(584)](o, e(909), () => {
                const f = e;
                return c[f(730)][f(1159)][f(1190)](window[f(940)][f(780)], f(601));
              }),
              this[e(584)](o, e(664), () => {
                const f = e;
                return c[f(730)][f(1159)][f(1190)](window[f(940)].documentElement, f(904));
              }),
              this[e(584)](
                o,
                e(1042),
                () => !!c[e(730)].Util[e(1190)](document[e(594)](e(1266))[0], 'webdriver'),
              ),
              this[e(584)](o, 'window_geb', () => !!window[e(1014)]),
              this.flatAndAddMetadata(o, e(459), () => !!window[e(977)]),
              this[e(584)](o, e(719), () => !!window.RunPerfTest),
              this[e(584)](o, e(735), () => !!window[e(439)]),
              this.flatAndAddMetadata(o, e(499), () => e(499) in document),
              this[e(584)](o, e(1324), () => e(1324) in XMLHttpRequest[e(620)]),
              this.flatAndAddMetadata(o, e(497), () => e(497) in XMLHttpRequest[e(620)]),
              this[e(584)](o, e(951), () => 'trustToken' in HTMLIFrameElement.prototype),
              this[e(584)](o, e(1173), () => localStorage.length),
              this[e(584)](o, e(901), () => sessionStorage.length),
              this.sessionData[e(800)].forEach((f) => {
                const m = e;
                this[m(584)](o, f[m(849)]() + '_FAILED', () => !0);
              }),
              this[e(584)](o, e(579), () => !!this[e(968)]()),
              this[e(770)][e(1e3)] &&
                this[e(770)][e(1e3)].length > 0 &&
                (this[e(1145)](),
                this[e(454)][e(447)]((f, m) => {
                  const w = e;
                  m != null && f != null && this[w(584)](o, m, () => f);
                }),
                this[e(454)].clear()),
              window[e(1201)] &&
                this[e(584)](o, e(435), () => {
                  const f = e,
                    m = window[f(1201)](f(1099) + (window[f(846)] - 1) + f(404));
                  return { matches: m[f(442)], media: m.media };
                }),
              this.addIframeData(o, t),
              window[e(1187)] &&
                this.flatAndAddMetadata(o, e(884), () => {
                  const f = e;
                  return window[f(1187)][f(695)];
                }),
              this[e(584)](o, 'HAS_CHROME_APP', () => window[e(539)] && e(1098) in window[e(539)]),
              this[e(584)](o, 'HAS_CHROME_CSI', () => window.chrome && e(1254) in window.chrome),
              this[e(584)](o, e(1227), () => window[e(539)] && e(420) in window[e(539)]),
              this[e(584)](
                o,
                'HAS_CHROME_RUNTIME',
                () => window[e(539)] && e(1333) in window[e(539)],
              ),
              this.addClientHints(o),
              this.flatAndAddMetadata(
                o,
                'NAVIGATOR_KEYBOARD_SUPPORTED',
                () => !!navigator[e(1225)],
              ),
              this.flatAndAddMetadata(o, e(1239), () => !!navigator.hid),
              this[e(584)](o, 'NAVIGATOR_SERIAL_SUPPORTED', () => !!navigator.serial),
              this.flatAndAddMetadata(o, e(1006), () => !!navigator.presentation);
            try {
              if (!t[e(1263)](e(1194)) && c[e(1159)][e(694)](document[e(526)])) {
                const { id: f, version: m } = yield c[e(1159)][e(983)](100, document[e(526)]());
                this.flatAndAddMetadata(o, e(1271), () => f), this[e(584)](o, e(962), () => m);
              }
            } catch {}
            for (const f in this[e(770)][e(1161)])
              this[e(584)](o, f, () =>
                c._POSignalsUtils.Util[e(654)](window, this[e(770)][e(1161)][f]),
              );
            const E = this[e(770)].propertyDescriptors;
            for (const f in E) {
              if (!E[e(618)](f)) continue;
              const m = f === e(623) ? window : window[f];
              m && this.addPropertyDescriptorInfo(m, f[e(849)]() + '_PROPERTY_DESCRIPTOR', E[f], o);
            }
            return o;
          });
        }
        [r(840)](t) {
          const e = r;
          try {
            const l = navigator[e(1012)];
            if (!l) return;
            this[e(584)](t, e(1019), () => l[e(857)]), this[e(584)](t, e(1008), () => l.mobile);
            const o = l.brands;
            if (!o) return;
            for (let x = 0; x < o[e(684)]; x++)
              if (o[x][e(618)](e(1053)) && o[x][e(618)](e(764))) {
                const v = o[x][e(1053)] + ':' + o[x].version;
                this.flatAndAddMetadata(t, 'NAVIGATOR_CLIENT_HINTS_BRAND_' + x, () => v);
              }
          } catch (l) {
            c[e(730)][e(1278)][e(482)](e(786), l);
          }
        }
        addPropertyDescriptorInfo(t, e, l, o) {
          const x = r;
          try {
            for (const v of l)
              this[x(584)](o, e + '_' + v[x(849)](), () => {
                const y = x,
                  L = t.prototype ? t.prototype : t,
                  g = Object[y(969)](L, v);
                if (g) {
                  const E = g[y(1281)] ? g[y(1281)].toString() : void 0;
                  return JSON[y(662)]({
                    configurable: g[y(1144)],
                    enumerable: g.enumerable,
                    value: g[y(534)],
                    writable: g[y(1070)],
                    getter: E != null && E[y(684)] < 100 ? E : void 0,
                  });
                }
                return 'undefined';
              });
          } catch (v) {
            c[x(730)].Logger[x(482)](x(479), v);
          }
        }
        [r(1175)](t, e) {
          const l = r;
          if (!e[l(1263)](l(898)))
            try {
              const o = c._POSignalsUtils[l(1159)].createInvisibleElement(l(1085));
              if (!o) return;
              (o.srcdoc = l(564)),
                document.body[l(1149)](o),
                this[l(584)](t, 'IFRAME_CHROME', () => {
                  const x = l;
                  return typeof o[x(859)][x(539)];
                }),
                this[l(584)](t, l(514), () => {
                  const x = l;
                  return o[x(859)].screen[x(527)];
                }),
                this.flatAndAddMetadata(t, l(851), () => {
                  const x = l;
                  return o[x(859)][x(672)][x(541)];
                }),
                o.remove();
            } catch (o) {
              c[l(730)][l(1278)][l(482)](l(430), o);
            }
        }
        [r(502)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19,
              e = {},
              l = [
                'accelerometer',
                'accessibility-events',
                t(611),
                t(1258),
                'camera',
                t(1046),
                t(1351),
                'geolocation',
                t(1226),
                t(737),
                'microphone',
                t(592),
                t(636),
                t(797),
                t(921),
                t(1002),
              ],
              o = [];
            if (navigator[t(1005)])
              for (const x in l) {
                const v = l[x];
                o[t(1002)](
                  navigator[t(1005)]
                    [t(838)]({ name: v })
                    [t(659)]((y) => {
                      e[v] = y.state;
                    })
                    .catch((y) => {}),
                );
              }
            try {
              yield Promise[t(881)](o);
            } catch (x) {
              c._POSignalsUtils.Logger[t(482)](x);
            }
            return e;
          });
        }
        [r(464)](t) {
          const e = r,
            l = document.createElement(e(639));
          if (l && l.canPlayType) return l[e(689)](t);
        }
        [r(698)](t) {
          return __awaiter(this, void 0, void 0, function* () {
            const e = _0x4e19;
            c[e(529)]();
            const l = this,
              o = c[e(1347)],
              x = o[e(836)],
              v = o[e(805)];
            this[e(584)](t, e(669), () => o[e(1305)]),
              this[e(584)](t, e(478), () => o.applicationcache),
              this.flatAndAddMetadata(t, e(411), () => !!o[e(411)]),
              o.audio && this[e(584)](t, e(411), () => o[e(411)]),
              this[e(584)](
                t,
                'battery_api',
                () => !!x(e(1302), navigator) || !!x('getBattery', navigator),
              ),
              this[e(584)](t, e(723), () => o.blobconstructor),
              this[e(584)](t, 'context_menu', () => o[e(777)]),
              this[e(584)](t, e(812), () => o[e(812)]),
              this.flatAndAddMetadata(t, 'cryptography', () => o[e(448)]),
              this[e(584)](t, e(1108), () => o[e(1287)]),
              this[e(584)](t, e(642), () => o.customprotocolhandler),
              this[e(584)](t, 'custom_event', () => o[e(1131)]),
              this[e(584)](t, e(1134), () => o.dart),
              this[e(584)](t, e(1020), () => o[e(589)]),
              this[e(584)](t, e(1113), () => o[e(1316)]);
            const y = yield this[e(552)](e(1120));
            l[e(584)](t, e(419), () => y),
              this[e(584)](t, e(1215), () => o[e(931)]),
              o[e(931)] &&
                (this.flatAndAddMetadata(t, e(456), () => v(x(e(389), window, !1), window)),
                this[e(584)](t, e(431), () => MouseEvent[e(999)]),
                this[e(584)](t, e(640), () => MouseEvent[e(1294)])),
              this[e(584)](t, e(853), () => o[e(1171)]),
              this[e(584)](t, 'game_pads', () => o[e(391)]),
              this.flatAndAddMetadata(t, 'geo_location', () => o[e(1142)]),
              this[e(584)](t, 'ie8compat', () => o.ie8compat);
            const L = yield this[e(552)](e(1232));
            l[e(584)](t, e(772), () => L),
              this.flatAndAddMetadata(t, e(590), () => o[e(757)]),
              this[e(584)](t, 'internationalization', () => o[e(410)]),
              this[e(584)](t, 'json', () => o[e(976)]),
              this[e(584)](t, e(740), () => o.ligatures),
              this.flatAndAddMetadata(t, 'media_source', () => 'MediaSource' in window),
              this.flatAndAddMetadata(t, e(1220), () => o.messagechannel),
              this[e(584)](t, 'notification', () => o[e(572)]),
              this[e(584)](t, 'page_visibility', () => o[e(930)]),
              this.flatAndAddMetadata(t, e(1143), () => o.performance),
              this[e(584)](t, e(574), () => o[e(1235)]),
              this[e(584)](t, e(511), () => o[e(633)]),
              this[e(584)](t, e(576), () => o[e(576)]),
              this.flatAndAddMetadata(t, e(1138), () => o[e(495)]),
              this[e(584)](t, e(811), () => o[e(1016)]),
              this[e(584)](t, e(1290), () => o.requestanimationframe),
              this[e(584)](t, e(1128), () => o[e(1203)]),
              this[e(584)](t, e(839), () => o[e(955)]),
              this[e(584)](t, e(906), () => o.typedarrays),
              this.flatAndAddMetadata(t, 'vibrate', () => o[e(445)]),
              this[e(584)](t, 'video', () => !!o[e(639)]),
              o.video && this[e(584)](t, 'video', () => o[e(639)]),
              this[e(584)](t, e(971), () => o[e(627)]),
              this[e(584)](t, e(393), () => o.websockets),
              this[e(584)](t, e(1092), () => o[e(1156)]),
              this[e(584)](t, e(513), () => o[e(513)]);
          });
        }
        [r(1314)]() {
          const t = r,
            e = {},
            l = navigator.connection || navigator[t(688)] || navigator[t(828)];
          return (
            this[t(584)](e, t(1054), () => (l ? l[t(1252)] : null)),
            this.flatAndAddMetadata(e, t(537), () => (l ? l.downlinkMax : null)),
            this.flatAndAddMetadata(e, t(973), () => !!navigator.bluetooth),
            this[t(584)](e, t(815), () => this.hasSpeakers),
            this[t(584)](e, t(868), () => this[t(874)]),
            this[t(584)](e, t(1089), () => this[t(603)]),
            this.flatAndAddMetadata(e, t(824), () => this[t(922)]),
            this[t(584)](e, t(835), () => this[t(465)]),
            this.flatAndAddMetadata(e, 'BATTERY_CHARGING', () => this[t(900)]),
            this.flatAndAddMetadata(e, t(1322), () => this[t(1082)]),
            this[t(584)](e, t(781), () => this[t(492)]),
            this[t(584)](e, t(535), () => this[t(1112)]),
            this.flatAndAddMetadata(e, 'IS_MOBILE', () => {
              const o = t;
              return c[o(730)][o(1159)][o(809)];
            }),
            this[t(584)](e, t(837), () => 'ontouchstart' in document[t(780)]),
            this[t(584)](e, t(1021), () => this[t(1005)]),
            this[t(584)](e, t(426), () => {
              const o = t;
              return window[o(1201)](o(1115))[o(442)]
                ? o(778)
                : window[o(1201)](o(945))[o(442)]
                  ? o(1124)
                  : void 0;
            }),
            e
          );
        }
        [r(1096)](t, e, l) {
          const o = r;
          try {
            const x = new Set(this[o(770)].metadataBlackList || []);
            e != null && l != null && !x[o(1263)](e) && (t[e] = l);
          } catch (x) {
            c[o(730)][o(1278)].warn(o(1249) + e + o(496) + l + ', ' + x);
          }
        }
        [r(552)](t) {
          return __awaiter(this, void 0, void 0, function* () {
            const e = _0x4e19,
              l = new Promise((x) => {
                const v = _0x4e19;
                try {
                  c[v(1347)].on(t, (y) => {
                    x(y);
                  });
                } catch (y) {
                  x(null), c[v(730)][v(1278)][v(482)](v(1015) + t, y);
                }
              }),
              o = c[e(730)][e(1159)].delay(250).then(() => null);
            return yield Promise[e(998)]([l, o]);
          });
        }
        [r(584)](t, e, l) {
          const o = r;
          try {
            const x = new Set(this.metadataParams[o(637)] || []);
            if (!e || x[o(1263)](e)) return;
            const v = l();
            if (typeof v === o(788) && v !== null) {
              const y = c[o(730)][o(1159)][o(477)](v);
              for (const L in y) this[o(1096)](t, e + '.' + L, y[L]);
            } else this.safeAddMetadata(t, e, v);
          } catch (x) {
            c[o(730)][o(1278)][o(482)](o(1249) + e, x);
          }
        }
        [r(1106)]() {
          const t = r;
          let e = new Date(),
            l = 0,
            o;
          do l++, (o = new Date()[t(1269)]() - e[t(1269)]()), Math[t(1040)](l * Math[t(952)]());
          while (o < 500);
          const x = l / o;
          return c._POSignalsUtils[t(1278)].debug(t(518) + x), x;
        }
        [r(926)]() {
          const t = r,
            e = [
              { name: t(1329), value: !1, error: null },
              { name: 'FILE_INJECT_JS_FOUND', value: !1, error: null },
              { name: t(1312), value: !1, error: null },
              { name: 'WINDOW_GLOBAL_KEY_FOUND', value: !1, error: null },
            ];
          !this[t(1037)] &&
            ((this[t(1037)] = e),
            (this[t(691)].aiaSignals = e),
            c[t(1348)]
              .detect()
              [t(659)]((l) => {
                const o = t;
                (this[o(1037)] = l), (this.lastCalculatedMetadata[o(629)] = l);
              })
              .catch((l) => {
                const o = t;
                c[o(730)][o(1278)][o(613)](o(395), l);
              })),
            this[t(1037)] && (this.lastCalculatedMetadata[t(629)] = this.aiSignalsResult);
        }
        static [r(1182)]() {
          const t = r;
          return (
            Math.acos(0.123) == 1.4474840516030247 &&
            Math[t(1319)](Math[t(546)]) == 0.881373587019543 &&
            Math[t(1158)](2) == 1.1071487177940904 &&
            Math[t(412)](0.5) == 0.5493061443340548 &&
            Math[t(1350)](Math.PI) == 1.4645918875615231 &&
            Math[t(602)](21 * Math.LN2) == -0.4067775970251724 &&
            Math[t(571)](492 * Math[t(1262)]) == 9199870313877772e292 &&
            Math[t(1211)](1) == 1.718281828459045 &&
            Math[t(1288)](6 * Math.PI, -100) == 101.76102278593319 &&
            Math[t(387)](Math.PI) == 0.4971498726941338 &&
            Math.sin(Math.PI) == 12246467991473532e-32 &&
            Math[t(577)](Math.PI) == 11.548739357257748 &&
            Math[t(899)](10 * Math[t(1262)]) == -3.3537128705376014 &&
            Math[t(436)](0.123) == 0.12238344189440875 &&
            Math[t(1065)](Math.PI, -100) == 19275814160560204e-66
          );
        }
      }
      n[r(875)] = a;
      class s {
        constructor(t, e) {
          const l = r;
          (this[l(947)] = t),
            (this[l(663)] = e),
            (this[l(475)] = l(610)),
            (this.AGENT_DEVICE_URL = '/device');
        }
        getDevicePayload() {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19,
              e = this[t(475)] + ':' + this[t(947)] + this[t(1291)],
              l = new AbortController(),
              o = l.signal,
              x = setTimeout(() => l[t(1183)](), this.agentTimeout);
            try {
              const v = yield fetch(e, {
                method: t(1296),
                headers: { 'Content-Type': t(1090) },
                signal: o,
              });
              if (!v.ok) return c._POSignalsUtils[t(1278)][t(613)](t(1095) + v[t(1205)]), void 0;
              const y = yield v[t(1041)]();
              return c[t(730)][t(1278)][t(613)]('calculated workstation device attributes.'), y;
            } catch (v) {
              return (
                v[t(1154)] === t(1330)
                  ? c[t(730)][t(1278)].error(
                      'Failed to fetch the Workstation data. Request timed out after ' +
                        this[t(663)] +
                        'ms',
                    )
                  : c[t(730)][t(1278)].info(t(674) + v[t(728)]),
                void 0
              );
            } finally {
              clearTimeout(x);
            }
          });
        }
      }
      n[r(1318)] = s;
    })((p = c[h(1216)] || (c._POSignalsMetadata = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        static [r(858)]() {
          const i = r,
            t = [
              i(433),
              i(1184),
              i(1103),
              i(1268),
              '__webdriver_script_fn',
              i(650),
              i(1157),
              i(638),
              i(474),
              i(1109),
              i(932),
            ];
          for (const e of t) if (document[e]) return !0;
          return !1;
        }
        static [r(1167)]() {
          const i = r,
            t = [i(847), i(501), i(517), i(1300), i(400), 'callSelenium', i(1253)];
          for (const e of t) if (window[e]) return !0;
          return !1;
        }
        static [r(548)]() {
          const i = r,
            t = [
              i(601),
              '__driver_evaluate',
              i(433),
              i(1184),
              i(650),
              i(1157),
              '__webdriver_unwrapped',
              i(1109),
              '__fxdriver_unwrapped',
              i(1253),
              i(517),
              'calledSelenium',
              i(1088),
              i(702),
              i(1256),
              i(561),
              i(1026),
              'webdriverCommand',
              i(916),
              i(707),
              i(739),
              '__$webdriverAsyncExecutor',
              '__lastWatirAlert',
              i(889),
              i(605),
              i(818),
              i(759),
            ];
          for (const e of t) if (navigator[e]) return !0;
          return !1;
        }
        static seleniumSequentum() {
          const i = r;
          return (
            window[i(1238)] &&
            window[i(1238)].toString() &&
            window[i(1238)][i(1340)]().indexOf(i(1283)) != -1
          );
        }
      }
      n[r(1056)] = a;
    })((p = c[h(1216)] || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      const n = _0x4e19,
        r = n(1272),
        a = n(1154),
        s = 'type',
        i = n(804),
        t = n(764),
        e = n(890),
        l = n(503),
        o = n(616),
        x = n(1313),
        v = n(1125),
        y = 'fetcher',
        L = n(783),
        g = 'mediaplayer',
        E = 'library',
        f = Object[n(1168)]({
          browser: [[/(wget|curl|lynx|elinks|httpie)[\/ ]\(?([\w\.-]+)/i], [a, t, [s, x]]],
        }),
        m = Object.freeze({
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
            [a, t, [s, o]],
            [
              /((?:adsbot|apis|mediapartners)-google(?:-mobile)?|google-?(?:other|cloudvertexbot|extended|safety))/i,
              /\b(360spider-?(?:image|video)?|bytespider|(?:ai2|aspiegel|dataforseo|imagesift|petal|turnitin)bot|teoma|(?=yahoo! )slurp)/i,
            ],
            [a, [s, o]],
          ],
        }),
        w = Object[n(1168)]({
          device: [
            [
              /(nook)[\w ]+build\/(\w+)/i,
              /(dell) (strea[kpr\d ]*[\dko])/i,
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              /(trinity)[- ]*(t\d{3}) bui/i,
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              /(vodafone) ([\w ]+)(?:\)| bui)/i,
            ],
            [i, r, [s, l]],
            [/(u304aa)/i],
            [r, [i, n(1334)], [s, e]],
            [/\bsie-(\w*)/i],
            [r, [i, n(621)], [s, e]],
            [/\b(rct\w+) b/i],
            [r, [i, n(908)], [s, l]],
            [/\b(venue[\d ]{2,7}) b/i],
            [r, [i, n(1031)], [s, l]],
            [/\b(q(?:mv|ta)\w+) b/i],
            [r, [i, n(938)], [s, l]],
            [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
            [r, [i, 'Barnes & Noble'], [s, l]],
            [/\b(tm\d{3}\w+) b/i],
            [r, [i, 'NuVision'], [s, l]],
            [/\b(k88) b/i],
            [r, [i, 'ZTE'], [s, l]],
            [/\b(nx\d{3}j) b/i],
            [r, [i, n(1024)], [s, e]],
            [/\b(gen\d{3}) b.+49h/i],
            [r, [i, n(970)], [s, e]],
            [/\b(zur\d{3}) b/i],
            [r, [i, n(970)], [s, l]],
            [/^((zeki)?tb.*\b) b/i],
            [r, [i, n(566)], [s, l]],
            [/\b([yr]\d{2}) b/i, /\b(?:dragon[- ]+touch |dt)(\w{5}) b/i],
            [r, [i, 'Dragon Touch'], [s, l]],
            [/\b(ns-?\w{0,9}) b/i],
            [r, [i, n(1116)], [s, l]],
            [/\b((nxa|next)-?\w{0,9}) b/i],
            [r, [i, n(833)], [s, l]],
            [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
            [[i, 'Voice'], r, [s, e]],
            [/\b(lvtel\-)?(v1[12]) b/i],
            [[i, n(754)], r, [s, e]],
            [/\b(ph-1) /i],
            [r, [i, 'Essential'], [s, e]],
            [/\b(v(100md|700na|7011|917g).*\b) b/i],
            [r, [i, n(1121)], [s, l]],
            [/\b(trio[-\w\. ]+) b/i],
            [r, [i, 'MachSpeed'], [s, l]],
            [/\btu_(1491) b/i],
            [r, [i, 'Rotor'], [s, l]],
          ],
        }),
        S = Object.freeze({
          browser: [
            [
              /(airmail|bluemail|emclient|evolution|foxmail|kmail2?|kontact|(?:microsoft |mac)?outlook(?:-express)?|navermailapp|(?!chrom.+)sparrow|thunderbird|yahoo)(?:m.+ail; |[\/ ])([\w\.]+)/i,
            ],
            [a, t, [s, v]],
          ],
        }),
        U = Object[n(1168)]({
          browser: [
            [
              /(ahrefssiteaudit|bingpreview|chatgpt-user|mastodon|(?:discord|duckassist|linkedin|pinterest|reddit|roger|siteaudit|telegram|twitter|uptimero)bot|google-site-verification|meta-externalfetcher|y!?j-dlc|yandex(?:calendar|direct(?:dyn)?|searchshop)|yadirectfetcher)\/([\w\.]+)/i,
              /(bluesky) cardyb\/([\w\.]+)/i,
              /(slack(?:bot)?(?:-imgproxy|-linkexpanding)?) ([\w\.]+)/i,
              /(whatsapp)\/([\w\.]+)[\/ ][ianw]/i,
            ],
            [a, t, [s, y]],
            [
              /(cohere-ai|vercelbot|feedfetcher-google|google(?:-read-aloud|producer)|(?=bot; )snapchat|yandex(?:sitelinks|userproxy))/i,
            ],
            [a, [s, y]],
          ],
        }),
        T = Object.freeze({
          browser: [
            [/chatlyio\/([\d\.]+)/i],
            [t, 'Slack', [s, L]],
            [/jp\.co\.yahoo\.android\.yjtop\/([\d\.]+)/i],
            [t, n(485), [s, L]],
          ],
        }),
        O = Object[n(1168)]({
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
            [a, t, [s, g]],
            [/(flrp)\/([\w\.-]+)/i],
            [[a, n(1336)], t, [s, g]],
            [
              /(fstream|media player classic|inlight radio|mplayer|nativehost|nero showtime|ocms-bot|queryseekspider|tapinradio|tunein radio|winamp|yourmuze)/i,
            ],
            [a, [s, g]],
            [/(htc_one_s|windows-media-player|wmplayer)\/([\w\.-]+)/i],
            [[a, /[_-]/g, ' '], t, [s, g]],
            [/(rad.io|radio.(?:de|at|fr)) ([\d\.]+)/i],
            [[a, n(918)], t, [s, g]],
          ],
        }),
        C = Object[n(1168)]({
          browser: [
            [
              /^(apache-httpclient|axios|(?:go|java)-http-client|got|guzzlehttp|java|libwww-perl|lua-resty-http|needle|node-(?:fetch|superagent)|okhttp|php-soap|postmanruntime|python-(?:urllib|requests)|scrapy)\/([\w\.]+)/i,
              /(jsdom|java)\/([\w\.]+)/i,
            ],
            [a, t, [s, E]],
          ],
        }),
        k = Object.freeze({
          device: [
            [/dilink.+(byd) auto/i],
            [i],
            [/(rivian) (r1t)/i],
            [i, r],
            [/vcc.+netfront/i],
            [[i, n(671)]],
          ],
        }),
        R = Object.freeze({ browser: [...f[n(1033)], ...m[n(1033)], ...U.browser, ...C[n(1033)]] });
      class H {
        constructor() {
          const M = n;
          (this[M(1301)] = (K) =>
            [
              M(1148),
              M(668),
              M(462),
              M(987),
              M(1165),
              M(608),
              M(583),
              'bytespider',
              'ccbot',
              M(732),
              M(934),
              M(632),
              M(1341),
              M(1193),
              M(924),
              'imagesiftbot',
              M(895),
              M(784),
              M(578),
              M(920),
              M(996),
              M(429),
              M(683),
              M(1137),
              M(705),
              M(1050),
              M(512),
              M(457),
              M(1234),
              M(1049),
            ][M(1344)]((Z) => K[M(1097)]()[M(806)](Z))),
            (this[M(1013)] = (K) => {
              const Z = M,
                le = K.toLowerCase(),
                q = R.browser;
              for (let be = 0; be < q[Z(684)]; be += 2) {
                const we = q[be],
                  He = Array[Z(1133)](we) ? we : [we];
                for (const B of He) if (B instanceof RegExp && B.test(le)) return !0;
              }
              return !1;
            }),
            (this[M(907)] = (K) => K[M(1154)] === Engine.BLINK),
            (this[M(753)] = (K) => K[M(1097)]()[M(806)](M(1265)));
        }
      }
      p[n(550)] = H;
    })((h = c._POSignalsMetadata || (c._POSignalsMetadata = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        isCanvasSupported() {
          const i = _0x4e19,
            t = document[i(443)](i(425));
          return !!(t[i(717)] && t[i(717)]('2d'));
        }
        [r(1025)](i) {
          const t = r,
            e = document[t(443)]('canvas');
          let l = null;
          try {
            i === t(627)
              ? (l = e[t(717)](t(627)) || e[t(717)](t(682)))
              : (l = e.getContext(t(679)));
          } catch {}
          return l;
        }
        [r(829)]() {
          const i = r;
          if (!this[i(1328)]()) return { supported: !1, type: null };
          let t = this[i(1025)](i(679));
          return t
            ? { supported: !0, type: i(679) }
            : ((t = this[i(1025)](i(627))),
              t ? { supported: !0, type: 'webgl' } : { supported: !1, type: null });
        }
        [r(626)]() {
          const i = r,
            { supported: t } = this[i(829)]();
          return t;
        }
        [r(491)]() {
          const i = r,
            { supported: t, type: e } = this[i(829)]();
          return t && e === i(679);
        }
        [r(543)]() {
          const i = r,
            t = document.createElement(i(425));
          let e, l, o, x;
          try {
            (e = t[i(717)](i(679))),
              !e &&
                ((e = t[i(717)](i(627)) || t.getContext(i(682))), !e && console[i(1217)](i(1063)));
          } catch {
            console[i(1217)]('Neither WebGL 2.0 nor WebGL 1.0 is supported.');
          }
          try {
            (l = e[i(591)](i(1325))),
              (o = e.getParameter(l.UNMASKED_VENDOR_WEBGL)),
              (x = e[i(585)](l[i(709)]));
          } catch {
            (o = e.getParameter(e.VENDOR)), (x = e[i(585)](e[i(1206)]));
          }
          return {
            vendor: o,
            renderer: x,
            webglVersion: e.getParameter(e[i(619)]),
            shadingLanguageVersion: e[i(585)](e.SHADING_LANGUAGE_VERSION),
            extensions: e[i(1198)](),
            maxTextureSize: e.getParameter(e[i(972)]),
            maxRenderbufferSize: e[i(585)](e[i(401)]),
            maxTextureImageUnits: e[i(585)](e.MAX_TEXTURE_IMAGE_UNITS),
            maxVertexTextureImageUnits: e.getParameter(e[i(953)]),
            maxCombinedTextureImageUnits: e[i(585)](e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
            maxVertexAttribs: e[i(585)](e[i(845)]),
            maxVaryingVectors: e[i(585)](e[i(992)]),
            maxVertexUniformVectors: e[i(585)](e[i(1243)]),
            maxFragmentUniformVectors: e[i(585)](e[i(580)]),
          };
        }
        getHasLiedLanguages() {
          const i = r;
          if (typeof navigator[i(1188)] !== i(834))
            try {
              if (navigator[i(1188)][0].substr(0, 2) !== navigator[i(1244)][i(769)](0, 2))
                return !0;
            } catch {
              return !0;
            }
          return !1;
        }
        [r(466)]() {
          const i = r;
          return (
            window[i(672)].width < window[i(672)][i(1248)] ||
            window.screen.height < window[i(672)][i(1052)]
          );
        }
        getHasLiedOs() {
          const i = r,
            t = navigator[i(1250)][i(1097)]();
          let e = navigator[i(1027)];
          const l = navigator[i(857)][i(1097)]();
          let o;
          if (
            (t.indexOf(i(1245)) >= 0
              ? (o = i(402))
              : t[i(944)](i(1277)) >= 0
                ? (o = 'Windows')
                : t[i(944)](i(731)) >= 0
                  ? (o = 'Android')
                  : t[i(944)](i(910)) >= 0 || t[i(944)](i(958)) >= 0
                    ? (o = i(807))
                    : t[i(944)]('iphone') >= 0 || t[i(944)]('ipad') >= 0
                      ? (o = 'iOS')
                      : t.indexOf(i(567)) >= 0
                        ? (o = i(666))
                        : (o = i(994)),
            ('ontouchstart' in window ||
              navigator[i(1251)] > 0 ||
              navigator.msMaxTouchPoints > 0) &&
              o !== i(402) &&
              o !== 'Android' &&
              o !== 'iOS' &&
              o !== i(994))
          )
            return !0;
          if (typeof e !== i(834)) {
            if (((e = e[i(1097)]()), e[i(944)](i(1277)) >= 0 && o !== i(1073) && o !== i(402)))
              return !0;
            if (e.indexOf('linux') >= 0 && o !== 'Linux' && o !== i(476)) return !0;
            if (e[i(944)](i(567)) >= 0 && o !== i(666) && o !== 'iOS') return !0;
            if (
              (e.indexOf(i(1277)) === -1 &&
                e[i(944)]('linux') === -1 &&
                e[i(944)](i(567)) === -1) !=
              (o === i(994))
            )
              return !0;
          }
          return (l[i(944)](i(1277)) >= 0 && o !== i(1073) && o !== i(402)) ||
            ((l[i(944)](i(910)) >= 0 || l[i(944)](i(731)) >= 0 || l[i(944)]('pike') >= 0) &&
              o !== i(807) &&
              o !== i(476)) ||
            ((l.indexOf('mac') >= 0 ||
              l[i(944)](i(799)) >= 0 ||
              l[i(944)](i(1189)) >= 0 ||
              l[i(944)](i(816)) >= 0) &&
              o !== i(666) &&
              o !== 'iOS') ||
            (l.indexOf(i(1277)) < 0 &&
              l.indexOf('linux') < 0 &&
              l[i(944)]('mac') < 0 &&
              l[i(944)](i(816)) < 0 &&
              l.indexOf(i(799)) < 0) !==
              (o === 'Other')
            ? !0
            : typeof navigator[i(1339)] === i(834) && o !== 'Windows' && o !== i(402);
        }
        [r(1308)]() {
          const i = r,
            t = navigator.userAgent[i(1097)](),
            e = navigator[i(545)];
          let l;
          if (
            (t.indexOf(i(396)) >= 0
              ? (l = 'Firefox')
              : t[i(944)](i(943)) >= 0 || t[i(944)]('opr') >= 0
                ? (l = i(1195))
                : t[i(944)](i(539)) >= 0
                  ? (l = i(1010))
                  : t[i(944)]('safari') >= 0
                    ? (l = i(978))
                    : t[i(944)](i(867)) >= 0
                      ? (l = 'Internet Explorer')
                      : (l = 'Other'),
            (l === 'Chrome' || l === 'Safari' || l === 'Opera') && e !== i(985))
          )
            return !0;
          const o = eval[i(1340)]().length;
          if (o === 37 && l !== 'Safari' && l !== i(1177) && l !== 'Other') return !0;
          if (o === 39 && l !== i(522) && l !== i(994)) return !0;
          if (o === 33 && l !== 'Chrome' && l !== 'Opera' && l !== i(994)) return !0;
          let x;
          try {
            throw 'a';
          } catch (v) {
            try {
              v[i(1275)](), (x = !0);
            } catch {
              x = !1;
            }
          }
          return x && l !== i(1177) && l !== 'Other';
        }
      }
      n[r(1352)] = a;
    })((p = c[h(1216)] || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        constructor(i) {
          const t = _0x4e19;
          this[t(802)] = i;
        }
        [r(416)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const i = _0x4e19,
              t = yield this.headlessResults(window);
            return (
              yield this[i(673)](t, i(1001), () =>
                __awaiter(this, void 0, void 0, function* () {
                  const e = i;
                  if (!Object[e(570)]) return;
                  const l = c._POSignalsUtils[e(1159)][e(814)](e(1085));
                  if (!l) return;
                  if (
                    ((l[e(712)] = e(612)),
                    document[e(903)][e(1149)](l),
                    Object[e(570)](HTMLIFrameElement[e(620)])[e(859)][e(1281)].toString() !==
                      e(803) || l[e(859)] === window)
                  )
                    return !0;
                  const x = yield this[e(1061)](l.contentWindow);
                  return l[e(488)](), x;
                }),
              ),
              t
            );
          });
        }
        [r(1061)](i) {
          return __awaiter(this, void 0, void 0, function* () {
            const t = _0x4e19,
              e = new Map(),
              l = [];
            return (
              l.push(
                this[t(673)](e, t(993), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t;
                    return /HeadlessChrome/[o(673)](i[o(1196)].userAgent);
                  }),
                ),
              ),
              l.push(
                this.test(e, 'navigator.webdriver_present', () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t;
                    return i[o(1196)][o(601)];
                  }),
                ),
              ),
              l[t(1002)](
                this[t(673)](e, t(1274), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t;
                    return /Chrome/[o(673)](i.navigator[o(1250)]) && !i[o(539)];
                  }),
                ),
              ),
              l[t(1002)](
                this.test(e, t(893), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t;
                    if (i.navigator[o(1005)] && i[o(1187)]) {
                      const x = yield i[o(1196)][o(1005)].query({ name: o(636) });
                      return i[o(1187)][o(695)] === 'denied' && x[o(652)] === o(791);
                    }
                  }),
                ),
              ),
              l[t(1002)](
                this[t(673)](e, t(1326), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t,
                      x = i[o(1196)].permissions;
                    if (x)
                      return x.query[o(1340)]() !== o(1208) ||
                        x.query[o(1340)][o(1340)]() !== 'function toString() { [native code] }' ||
                        (x[o(838)].toString[o(618)]('[[Handler]]') &&
                          x[o(838)].toString[o(618)](o(598)) &&
                          x[o(838)][o(1340)].hasOwnProperty(o(774)))
                        ? !0
                        : x[o(618)](o(838));
                  }),
                ),
              ),
              l[t(1002)](
                this[t(673)](e, t(1247), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    return navigator[t(1339)].length === 0;
                  }),
                ),
              ),
              l[t(1002)](
                this[t(673)](e, t(923), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    return navigator.languages === '';
                  }),
                ),
              ),
              l.push(
                this[t(673)](e, t(988), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t;
                    let x = PluginArray.prototype === navigator[o(1339)][o(1136)];
                    return (
                      navigator.plugins.length > 0 &&
                        (x = x && Plugin[o(620)] === navigator[o(1339)][0][o(1136)]),
                      x
                    );
                  }),
                ),
              ),
              l.push(
                this[t(673)](e, t(1009), () =>
                  __awaiter(this, void 0, void 0, function* () {
                    const o = t;
                    let x = MimeTypeArray[o(620)] === navigator[o(1119)].__proto__;
                    return (
                      navigator[o(1119)].length > 0 &&
                        (x = x && MimeType[o(620)] === navigator.mimeTypes[0][o(1136)]),
                      x
                    );
                  }),
                ),
              ),
              yield Promise[t(881)](l),
              e
            );
          });
        }
        test(i, t, e) {
          return __awaiter(this, void 0, void 0, function* () {
            const l = _0x4e19;
            try {
              if (!this.propertyBlackList[l(1263)](t)) {
                const o = yield c[l(730)].Util[l(983)](100, e());
                o != null && (i[t] = o);
              }
            } catch (o) {
              c[l(730)].Logger.warn(t + ' headless test was failed', o);
            }
          });
        }
      }
      n.DetectHeadless = a;
    })((p = c[h(1216)] || (c._POSignalsMetadata = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  function _0x4e19(c, h) {
    const p = _0x455d();
    return (
      (_0x4e19 = function (n, r) {
        return (n = n - 387), p[n];
      }),
      _0x4e19(c, h)
    );
  }
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      function a() {
        return new Promise((s, i) => {
          const t = _0x4e19;
          let e = t(1105),
            l = !1;
          function o(M) {
            l || ((l = !0), s({ isPrivate: M, browserName: e }));
          }
          function x() {
            const M = t,
              K = navigator.userAgent;
            return K.match(/Chrome/)
              ? navigator[M(1310)] !== void 0
                ? M(1174)
                : K[M(1118)](/Edg/)
                  ? 'Edge'
                  : K[M(1118)](/OPR/)
                    ? M(1195)
                    : M(1010)
              : M(1218);
          }
          function v(M) {
            try {
              return M === eval.toString().length;
            } catch {
              return !1;
            }
          }
          function y() {
            const M = t;
            let K = 0;
            const Z = parseInt('-1');
            try {
              Z[M(421)](Z);
            } catch (le) {
              K = le[M(728)][M(684)];
            }
            return K;
          }
          function L() {
            return y() === 44;
          }
          function g() {
            return y() === 51;
          }
          function E() {
            return y() === 25;
          }
          function f() {
            return navigator[t(1087)] !== void 0 && v(39);
          }
          function m() {
            var M;
            return __awaiter(this, void 0, void 0, function* () {
              const K = _0x4e19;
              try {
                const Z = navigator.storage;
                typeof (Z == null ? void 0 : Z[K(486)]) == 'function' && (yield Z[K(486)]()), o(!1);
              } catch (Z) {
                const le = Z instanceof Error && (M = Z[K(728)]) !== null && M !== void 0 ? M : Z;
                o(typeof le == 'string' && le.includes(K(883)));
              }
            });
          }
          function w() {
            const M = t,
              K = String(Math[M(952)]());
            try {
              const Z = indexedDB[M(1123)](K, 1);
              (Z[M(1155)] = (le) => {
                const q = M,
                  be = le[q(646)].result;
                try {
                  be[q(519)]('t', { autoIncrement: !0 })[q(1231)](new Blob()), o(!1);
                } catch (we) {
                  const He = we[q(728)] || '';
                  o(He[q(806)]('are not yet supported'));
                } finally {
                  be[q(1338)](), indexedDB[q(1353)](K);
                }
              }),
                (Z[M(1299)] = () => o(!1));
            } catch {
              o(!1);
            }
          }
          function S() {
            const M = t;
            try {
              window[M(1084)](null, null, null, null);
            } catch {
              return o(!0);
            }
            try {
              localStorage.setItem(M(673), '1'), localStorage[M(793)](M(673));
            } catch {
              return o(!0);
            }
            o(!1);
          }
          function U() {
            return __awaiter(this, void 0, void 0, function* () {
              const M = _0x4e19,
                K = navigator[M(1047)];
              typeof (K == null ? void 0 : K[M(486)]) == 'function'
                ? yield m()
                : navigator[M(1251)] !== void 0
                  ? w()
                  : S();
            });
          }
          function T() {
            const M = t;
            var K;
            const Z =
              (K = performance == null ? void 0 : performance[M(1104)]) === null || K === void 0
                ? void 0
                : K[M(1261)];
            return Z != null ? Z : 1073741824;
          }
          function O() {
            const M = t;
            navigator[M(856)][M(961)](
              function (K, Z) {
                const le = M,
                  q = Math[le(553)](Z / (1024 * 1024)),
                  be = Math[le(553)](T() / (1024 * 1024)) * 2;
                o(q < be);
              },
              function (K) {
                const Z = M;
                i(new Error(Z(414) + K[Z(728)]));
              },
            );
          }
          function C() {
            const M = t,
              K = window[M(1150)];
            K(
              0,
              1,
              () => o(!1),
              () => o(!0),
            );
          }
          function k() {
            const M = t;
            self.Promise && self[M(399)].allSettled ? O() : C();
          }
          function R() {
            return __awaiter(this, void 0, void 0, function* () {
              const M = _0x4e19,
                K = navigator[M(1047)];
              if (typeof (K == null ? void 0 : K.getDirectory) == 'function')
                try {
                  yield K[M(486)](), o(!1);
                } catch (Z) {
                  const le = Z instanceof Error ? Z[M(728)] : String(Z);
                  o(typeof le === M(568) && le.includes(M(471)));
                  return;
                }
              else o(navigator[M(771)] === void 0);
            });
          }
          function H() {
            o(window[t(758)] === void 0);
          }
          function ee() {
            return __awaiter(this, void 0, void 0, function* () {
              const M = _0x4e19;
              L()
                ? ((e = M(978)), yield U())
                : g()
                  ? ((e = x()), k())
                  : E()
                    ? ((e = M(1177)), yield R())
                    : f()
                      ? ((e = M(522)), H())
                      : i(new Error(M(480)));
            });
          }
          ee()[t(765)](i);
        });
      }
      n[r(913)] = a;
    })((p = c[h(1216)] || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        constructor(i) {
          const t = _0x4e19;
          (this[t(802)] = i), (this[t(563)] = {});
        }
        documentLie(i, t) {
          const e = _0x4e19;
          if (t[e(1093)])
            for (const l of t.lieTypes)
              !this[e(563)][l] && (this[e(563)][l] = []), this.result[l][e(1002)](i);
        }
        [r(622)](i, t, e = null) {
          const l = r;
          if (typeof i != 'function') return { lied: !1, lieTypes: [] };
          const o = i[l(1154)].replace(/get\s/, ''),
            x = {
              undefined_properties: () => (e ? a[l(718)](e, o) : !1),
              to_string: () => a[l(484)](i, o, this[l(675)]),
              prototype_in_function: () => a.getPrototypeInFunctionLie(i),
              own_property: () => a.getOwnPropertyLie(i),
              object_to_string_error: () => a.getNewObjectToStringTypeErrorLie(i),
            },
            v = Object[l(1222)](x)[l(1153)](
              (y) => !this.propertyBlackList[l(1263)](l(1270) + y) && !!x[y](),
            );
          return { lied: v.length > 0, lieTypes: v };
        }
        [r(1241)]() {
          return __awaiter(this, void 0, void 0, function* () {
            const i = _0x4e19;
            if (this[i(802)][i(1263)](i(609))) return this[i(563)];
            if (!this[i(802)][i(1263)]('LIES_IFRAME')) {
              const t = c[i(730)][i(1159)][i(814)](i(1085));
              t && (document[i(903)][i(1149)](t), (this.iframeWindow = t));
            }
            return (
              yield Promise[i(881)]([
                this.searchLies(() => AnalyserNode, { target: [i(1023)] }),
                this.searchLies(() => AudioBuffer, { target: ['copyFromChannel'] }),
                this[i(1062)](() => BiquadFilterNode, { target: [i(630)] }),
                this[i(1062)](() => CanvasRenderingContext2D, { target: [i(1081)] }),
                this[i(1062)](() => DOMRect, { target: [i(541)] }),
                this.searchLies(() => DOMRectReadOnly, { target: [i(528)] }),
                this[i(1062)](() => Element, { target: ['getClientRects'] }),
                this[i(1062)](() => HTMLCanvasElement, { target: [i(541)] }),
                this[i(1062)](() => Math, { target: [i(577)] }),
                this[i(1062)](() => MediaDevices, { target: ['enumerateDevices'] }),
                this.searchLies(() => Navigator, { target: ['plugins'] }),
                this[i(1062)](() => OffscreenCanvasRenderingContext2D, { target: [i(1081)] }),
                this[i(1062)](() => SVGRect, { target: ['x'] }),
              ]),
              this[i(675)][i(488)](),
              this[i(563)]
            );
          });
        }
        [r(1062)](i, { target: t = [], ignore: e = [] } = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            const l = _0x4e19;
            function o(y) {
              return typeof y != _0x4e19(834) && !!y;
            }
            let x;
            try {
              if (((x = i()), !o(x))) return;
            } catch {
              return;
            }
            const v = x[l(620)] ? x[l(620)] : x;
            Object[l(825)](v).forEach((y) => {
              const L = l;
              if (
                y == L(390) ||
                (t[L(684)] && !new Set(t).has(y)) ||
                (e[L(684)] && new Set(e).has(y))
              )
                return;
              const E = /\s(.+)\]/,
                f = (x[L(1154)] ? x.name : E[L(673)](x) ? E.exec(x)[1] : void 0) + '.' + y;
              try {
                const m = x[L(620)] ? x[L(620)] : x;
                try {
                  if (typeof m[y] == L(817)) {
                    const T = this[L(622)](m[y], m);
                    this[L(1317)](f, T);
                    return;
                  }
                } catch {}
                const w = Object[L(969)](m, y).get,
                  S = this[L(622)](w, m, x);
                this[L(1317)](f, S);
              } catch (m) {
                c[L(730)].Logger.warn('failed ' + y + ' test execution', m);
              }
            });
          });
        }
        static getUndefinedValueLie(i, t) {
          const e = r,
            l = i.name,
            o = window[l[e(742)](0)[e(1097)]() + l[e(1059)](1)];
          return (
            !!o && (typeof Object[e(969)](o, t) != e(834) || typeof Reflect[e(969)](o, t) != e(834))
          );
        }
        static [r(484)](i, t, e) {
          const l = r;
          let o, x;
          try {
            o = e.Function[l(620)].toString[l(523)](i);
          } catch {}
          try {
            x = e[l(428)].prototype[l(1340)][l(523)](i[l(1340)]);
          } catch {}
          const v = o || i.toString(),
            y = x || i[l(1340)][l(1340)](),
            L = (g) => ({
              [l(458) + g + '() { [native code] }']: !0,
              ['function get ' + g + '() { [native code] }']: !0,
              [l(697)]: !0,
              [l(458) +
              g +
              l(727) +
              `
    [native code]
}`]: !0,
              [l(1122) +
              g +
              l(727) +
              `
` +
              l(711) +
              `
}`]: !0,
              [l(1260) +
              `
` +
              l(711) +
              `
}`]: !0,
            });
          return !L(t)[v] || !L(l(1340))[y];
        }
        static getPrototypeInFunctionLie(i) {
          return r(620) in i;
        }
        static [r(453)](i) {
          const t = r;
          return i[t(618)](t(982)) || i[t(618)](t(1280)) || i[t(618)](t(620)) || i[t(618)](t(1340));
        }
        static getNewObjectToStringTypeErrorLie(i) {
          const t = r;
          try {
            return Object[t(1172)](i)[t(1340)](), !0;
          } catch (e) {
            const l = e[t(763)].split(`
`),
              o = l[t(1059)](1),
              x = /at Object\.apply/,
              v = /at Function\.toString/,
              y = !o[t(1202)]((E) => x[t(673)](E)),
              L = e[t(390)][t(1154)] == 'TypeError' && l[t(684)] > 1,
              g = t(539) in window || n[t(875)][t(1182)]();
            return L && g && (!v[t(673)](l[1]) || !y) ? !0 : !L;
          }
        }
      }
      n[r(530)] = a;
    })((p = c[h(1216)] || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        constructor(i) {
          const t = _0x4e19;
          (this[t(802)] = i), (this[t(563)] = new Map());
        }
        getStealthResult() {
          const i = _0x4e19;
          return (
            this[i(653)](i(941), () => {
              const t = i;
              try {
                const { srcdoc: e } = document.createElement(t(1085));
                return !!e;
              } catch {
                return !0;
              }
            }),
            this[i(653)](i(449), () => {
              const t = i,
                e = document[t(443)](t(1085));
              return (
                (e[t(712)] =
                  '' + c[t(730)][t(1159)][t(446)](crypto.getRandomValues(new Uint32Array(10)))),
                !!e[t(859)]
              );
            }),
            this[i(653)](i(634), () => {
              const t = i,
                e =
                  t(827) in window ? 'cookieStore' : 'ondevicemotion' in window ? t(1295) : t(1228),
                l = [];
              for (const v in window) l.push(v);
              const o = l[t(944)](t(539)),
                x = l[t(944)](e);
              return o > x;
            }),
            this.addStealthTest('chrome_runtime_functions_invalid', () => {
              const t = i;
              if (!(t(539) in window && t(1333) in window[t(539)])) return !1;
              try {
                return (
                  'prototype' in window[t(539)][t(1333)][t(745)] ||
                    t(620) in window[t(539)][t(1333)][t(1192)] ||
                    (new window[t(539)][t(1333)][t(745)](), new window[t(539)][t(1333)][t(1192)]()),
                  !0
                );
              } catch (e) {
                return e[t(390)][t(1154)] != t(587);
              }
            }),
            this[i(653)](i(979), () => {
              const t = i,
                e = new a.StackTraceTester();
              return e.isInvalidStackTraceSize(Function[t(620)].toString) || e[t(468)](() => {});
            }),
            this[i(563)]
          );
        }
        addStealthTest(i, t) {
          const e = _0x4e19;
          if (!this[e(802)][e(1263)](i))
            try {
              this[e(563)][i] = t();
            } catch (l) {
              c[e(730)].Logger[e(482)]('stealth test ' + i + ' failed', l);
            }
        }
      }
      (a[r(1030)] = class {
        isInvalidStackTraceSize(s) {
          const i = r;
          try {
            return (
              (this.you = () => Object[i(1172)](s)[i(1340)]()),
              (this.cant = () => this[i(960)]()),
              (this[i(761)] = () => this[i(1117)]()),
              this[i(761)](),
              !0
            );
          } catch (t) {
            const e = t[i(763)][i(1034)](`
`),
              l = !/at Object\.apply/.test(e[1]),
              o = t.constructor.name == i(587) && e[i(684)] >= 5,
              x = i(539) in window || n.Metadata[i(1182)]();
            return o &&
              x &&
              (!l ||
                !/at Function\.toString/[i(673)](e[1]) ||
                !/\.you/[i(673)](e[2]) ||
                !/\.cant/.test(e[3]) ||
                !/\.hide/[i(673)](e[4]))
              ? !0
              : !o;
          }
        }
      }),
        (n[r(455)] = a);
    })((p = c[h(1216)] || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = _0x7ea2;
    let p;
    (function (n) {
      const r = _0x4e19;
      class a {
        static [r(452)]() {
          const i = r;
          return c[i(1216)]
            .detectIncognitoInternal()
            .then((t) => t[i(521)])
            [i(765)](() => !1);
        }
      }
      n[r(768)] = a;
    })((p = c._POSignalsMetadata || (c[h(1216)] = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (p) {
      (p[(p.Unknown = 0)] = 'Unknown'),
        (p[(p.FlingRight = 1)] = 'FlingRight'),
        (p[(p.FlingLeft = 2)] = 'FlingLeft'),
        (p[(p.FlingUp = 3)] = 'FlingUp'),
        (p[(p.FlingDown = 4)] = 'FlingDown'),
        (p[(p.Diagonal = 5)] = 'Diagonal'),
        (p[(p.ScrollRight = 6)] = 'ScrollRight'),
        (p[(p.ScrollLeft = 7)] = 'ScrollLeft'),
        (p[(p.ScrollUp = 8)] = 'ScrollUp'),
        (p[(p.ScrollDown = 9)] = 'ScrollDown'),
        (p[(p.Tap = 10)] = 'Tap'),
        (p[(p.DoubleTap = 11)] = 'DoubleTap');
    })((h = c.GestureType || (c.GestureType = {})));
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    'use strict';
    class h {
      constructor(S, U) {
        (this.handler = S), (this.isOnce = U), (this.isExecuted = !1);
      }
      execute(S, U, T) {
        if (!this.isOnce || !this.isExecuted) {
          this.isExecuted = !0;
          const O = this.handler;
          S
            ? setTimeout(() => {
                O.apply(U, T);
              }, 1)
            : O.apply(U, T);
        }
      }
    }
    class p {
      constructor() {
        (this._wrap = new s(this)), (this._subscriptions = new Array());
      }
      subscribe(S) {
        S && this._subscriptions.push(new h(S, !1));
      }
      sub(S) {
        this.subscribe(S);
      }
      one(S) {
        S && this._subscriptions.push(new h(S, !0));
      }
      has(S) {
        if (S) {
          for (const U of this._subscriptions) if (U.handler == S) return !0;
        }
        return !1;
      }
      unsubscribe(S) {
        if (S) {
          for (let U = 0; U < this._subscriptions.length; U++)
            if (this._subscriptions[U].handler == S) {
              this._subscriptions.splice(U, 1);
              break;
            }
        }
      }
      unsub(S) {
        this.unsubscribe(S);
      }
      _dispatch(S, U, T) {
        for (let O = 0; O < this._subscriptions.length; O++) {
          const C = this._subscriptions[O];
          if (C.isOnce) {
            if (C.isExecuted === !0) continue;
            this._subscriptions.splice(O, 1), O--;
          }
          C.execute(S, U, T);
        }
      }
      asEvent() {
        return this._wrap;
      }
    }
    c.DispatcherBase = p;
    class n extends p {
      dispatch(S, U) {
        this._dispatch(!1, this, arguments);
      }
      dispatchAsync(S, U) {
        this._dispatch(!0, this, arguments);
      }
    }
    c.EventDispatcher = n;
    class r extends p {
      dispatch(S) {
        this._dispatch(!1, this, arguments);
      }
      dispatchAsync(S) {
        this._dispatch(!0, this, arguments);
      }
    }
    class a extends p {
      dispatch() {
        this._dispatch(!1, this, arguments);
      }
      dispatchAsync() {
        this._dispatch(!0, this, arguments);
      }
    }
    class s {
      constructor(S) {
        (this._subscribe = (U) => S.subscribe(U)),
          (this._unsubscribe = (U) => S.unsubscribe(U)),
          (this._one = (U) => S.one(U)),
          (this._has = (U) => S.has(U));
      }
      subscribe(S) {
        this._subscribe(S);
      }
      sub(S) {
        this.subscribe(S);
      }
      unsubscribe(S) {
        this._unsubscribe(S);
      }
      unsub(S) {
        this.unsubscribe(S);
      }
      one(S) {
        this._one(S);
      }
      has(S) {
        return this._has(S);
      }
    }
    class i {
      constructor() {
        this._events = {};
      }
      get(S) {
        let U = this._events[S];
        return U || ((U = this.createDispatcher()), (this._events[S] = U), U);
      }
      remove(S) {
        this._events[S] = null;
      }
    }
    class t extends i {
      createDispatcher() {
        return new n();
      }
    }
    class e extends i {
      createDispatcher() {
        return new r();
      }
    }
    class l extends i {
      createDispatcher() {
        return new a();
      }
    }
    class o {
      constructor() {
        this._events = new t();
      }
      get events() {
        return this._events;
      }
      subscribe(S, U) {
        this._events.get(S).subscribe(U);
      }
      sub(S, U) {
        this.subscribe(S, U);
      }
      unsubscribe(S, U) {
        this._events.get(S).unsubscribe(U);
      }
      unsub(S, U) {
        this.unsubscribe(S, U);
      }
      one(S, U) {
        this._events.get(S).one(U);
      }
      has(S, U) {
        return this._events.get(S).has(U);
      }
    }
    class x {
      constructor() {
        this._events = new e();
      }
      get events() {
        return this._events;
      }
      subscribe(S, U) {
        this._events.get(S).subscribe(U);
      }
      sub(S, U) {
        this.subscribe(S, U);
      }
      one(S, U) {
        this._events.get(S).one(U);
      }
      has(S, U) {
        return this._events.get(S).has(U);
      }
      unsubscribe(S, U) {
        this._events.get(S).unsubscribe(U);
      }
      unsub(S, U) {
        this.unsubscribe(S, U);
      }
    }
    class v {
      constructor() {
        this._events = new l();
      }
      get events() {
        return this._events;
      }
      one(S, U) {
        this._events.get(S).one(U);
      }
      has(S, U) {
        return this._events.get(S).has(U);
      }
      subscribe(S, U) {
        this._events.get(S).subscribe(U);
      }
      sub(S, U) {
        this.subscribe(S, U);
      }
      unsubscribe(S, U) {
        this._events.get(S).unsubscribe(U);
      }
      unsub(S, U) {
        this.unsubscribe(S, U);
      }
    }
    function y() {
      return new n();
    }
    function L() {
      return new t();
    }
    function g() {
      return new r();
    }
    function E() {
      return new e();
    }
    function f() {
      return new a();
    }
    function m() {
      return new l();
    }
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      get LAST_GESTURE_SENSOR_TIMEOUT_MILI_SECONDS() {
        return 3e3;
      }
      get accX() {
        return this._accX;
      }
      get accY() {
        return this._accY;
      }
      get accZ() {
        return this._accZ;
      }
      get lienarAccX() {
        return this._lienarAccX;
      }
      get lienarAccY() {
        return this._lienarAccY;
      }
      get lienarAccZ() {
        return this._lienarAccZ;
      }
      get isStarted() {
        return this._isStarted;
      }
      get rotX() {
        return this._rotX;
      }
      get rotY() {
        return this._rotY;
      }
      get rotZ() {
        return this._rotZ;
      }
      get maxSensorSamples() {
        return this._maxSensorSamples;
      }
      set maxSensorSamples(n) {
        this._maxSensorSamples = n;
      }
      get sensorsTimestampDeltaInMillis() {
        return this._sensorsTimestampDeltaInMillis;
      }
      set sensorsTimestampDeltaInMillis(n) {
        this._sensorsTimestampDeltaInMillis = n;
      }
      get accelerometerList() {
        return this.getRelevantSensorSamples(this._accelerometerList);
      }
      get gyroscopeList() {
        return this.getRelevantSensorSamples(this._gyroscopeList);
      }
      get linearAccelerometerList() {
        return this.getRelevantSensorSamples(this._linearAccelerometerList);
      }
      get rotationList() {
        return this._rotationList;
      }
      constructor(n) {
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
          (this.delegate = n),
          window.navigator.userAgent.match(
            /^.*(iPhone|iPad).*(OS\s[0-9]).*(CriOS|Version)\/[.0-9]*\sMobile.*$/i,
          ) && (this.orientationImplementationFix = -1),
          (this.accelerometerUpdateHandle = this.accelerometerUpdate.bind(this)),
          (this.orientationUpdateHandle = this.orientationUpdate.bind(this));
      }
      start() {
        this._isStarted ||
          ((this._isStarted = !0), c._POSignalsUtils.Logger.debug('Sensor events started...'));
      }
      getRotationListCopy() {
        return this._rotationList ? Array.from(this._rotationList) : [];
      }
      stop() {
        this._isStarted &&
          (window.DeviceMotionEvent != null &&
            window.removeEventListener('devicemotion', this.accelerometerUpdateHandle, !0),
          window.DeviceOrientationEvent &&
            window.removeEventListener('deviceorientation', this.orientationUpdateHandle, !0),
          (this._isStarted = !1),
          c._POSignalsUtils.Logger.debug('Sensor events stopped'));
      }
      getRelevantSensorSamples(n) {
        if (
          n.length == 0 ||
          this._sensorsTimestampDeltaInMillis < 1 ||
          this._gestureTimestamps.length == 0
        )
          return n;
        const r = new Map();
        let a = null,
          s = 0;
        for (let i = 0; i < n.length; i++)
          for (let t = 0; t < this._gestureTimestamps.length; t++)
            (s = n[i].timestamp),
              (a = this._gestureTimestamps[t]),
              s >= a.start - this._sensorsTimestampDeltaInMillis &&
                s <= a.end + this._sensorsTimestampDeltaInMillis &&
                r.set(n[i].timestamp, n[i]);
        return c._POSignalsUtils.Util.getValuesOfMap(r);
      }
      stopEvents() {
        this._isEventsStarted &&
          (window.DeviceMotionEvent != null &&
            window.removeEventListener('devicemotion', this.accelerometerUpdateHandle, !0),
          window.DeviceOrientationEvent &&
            window.removeEventListener('deviceorientation', this.orientationUpdateHandle, !0),
          (this._isEventsStarted = !1),
          c._POSignalsUtils.Logger.debug('Sensor events stopped listening'));
      }
      startEvents() {
        this._isEventsStarted ||
          (window.DeviceMotionEvent != null
            ? this.delegate.addEventListener(
                window,
                'devicemotion',
                this.accelerometerUpdateHandle,
                !0,
              )
            : c._POSignalsUtils.Logger.warn('DeviceMotion not supported!'),
          window.DeviceOrientationEvent
            ? this.delegate.addEventListener(
                window,
                'deviceorientation',
                this.orientationUpdateHandle,
                !0,
              )
            : c._POSignalsUtils.Logger.warn('DeviceOrientation not supported!'),
          c._POSignalsUtils.Logger.debug('Sensor events start listening...'),
          (this._isEventsStarted = !0));
      }
      reset() {
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
      }
      onGesture(n) {
        this._isEventsStarted || this.startEvents(),
          n.events.length > 1 &&
            this._gestureTimestamps.push({
              start: n.events[0].eventTs,
              end: n.events[n.events.length - 1].eventTs,
            });
      }
      puaseSensorsCollectionIfNoActivity(n) {
        if (
          (this._gestureTimestamps.length > 0
            ? this._gestureTimestamps[this._gestureTimestamps.length - 1].end
            : 0) > 0
        ) {
          if (
            Math.abs(n - this._gestureTimestamps[this._gestureTimestamps.length - 1].end) >
            this.LAST_GESTURE_SENSOR_TIMEOUT_MILI_SECONDS
          )
            return this.stopEvents(), !0;
        } else return this.stopEvents(), !0;
        return !1;
      }
      getDeviceAcceleration(n) {
        return !n || n.x == null || n.y == null || n.z == null ? null : n;
      }
      accelerometerUpdate(n) {
        try {
          if (
            !this.delegate.collectBehavioralData() ||
            this.puaseSensorsCollectionIfNoActivity(c._POSignalsUtils.Util.now())
          )
            return;
          const r = this.getDeviceAcceleration(n.accelerationIncludingGravity);
          r &&
            ((this._accX = r.x * this.orientationImplementationFix),
            (this._accY = r.y * this.orientationImplementationFix),
            (this._accZ = r.z),
            this.safeAddSensorSample(
              {
                x: this._accX,
                y: this._accY,
                z: this._accX,
                timestamp: c._POSignalsUtils.Util.now(),
              },
              this._accelerometerList,
            ));
          const a = this.getDeviceAcceleration(n.acceleration);
          a &&
            ((this._lienarAccX = a.x * this.orientationImplementationFix),
            (this._lienarAccY = a.y * this.orientationImplementationFix),
            (this._lienarAccZ = a.z),
            this.safeAddSensorSample(
              {
                x: this._lienarAccX,
                y: this._lienarAccY,
                z: this._lienarAccZ,
                timestamp: c._POSignalsUtils.Util.now(),
              },
              this._linearAccelerometerList,
            )),
            n.rotationRate &&
              n.rotationRate.alpha != null &&
              n.rotationRate.beta != null &&
              n.rotationRate.gamma != null &&
              ((this._rotX = n.rotationRate.alpha),
              (this._rotY = n.rotationRate.beta),
              (this._rotZ = n.rotationRate.gamma),
              this.safeAddSensorSample(
                {
                  x: this._rotX,
                  y: this._rotY,
                  z: this._rotZ,
                  timestamp: c._POSignalsUtils.Util.now(),
                },
                this._gyroscopeList,
              ));
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in accelerometer handler', r);
        }
      }
      orientationUpdate(n) {
        try {
          if (
            !this.delegate.collectBehavioralData() ||
            this.puaseSensorsCollectionIfNoActivity(c._POSignalsUtils.Util.now())
          )
            return;
          n.alpha != null &&
            n.beta != null &&
            n.gamma != null &&
            this.safeAddSensorSample(
              { x: n.alpha, y: n.beta, z: n.gamma, timestamp: c._POSignalsUtils.Util.now() },
              this._rotationList,
            );
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in orientation handler', r);
        }
      }
      safeAddSensorSample(n, r) {
        this.maxSensorSamples > r.length && r.push(n);
      }
    }
    c.Sensors = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      static get instance() {
        return h._instance || (h._instance = new h()), h._instance;
      }
      constructor() {
        this._pointerParams = new c.PointerParams();
      }
      get pointerParams() {
        return this._pointerParams;
      }
    }
    c.PointerConfig = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (n) {
      (n[(n.Up = 1)] = 'Up'),
        (n[(n.Down = 2)] = 'Down'),
        (n[(n.Left = 3)] = 'Left'),
        (n[(n.Right = 4)] = 'Right');
    })(h || (h = {}));
    class p {
      get onGesture() {
        return this._onGesture.asEvent();
      }
      get isStarted() {
        return this._isStarted;
      }
      get SCROLL_MIN_DURATION() {
        return 500;
      }
      get SWIPE_MAX_ANGLE() {
        return 45;
      }
      get TAP_MOVEMENT_TRESHOLD() {
        return 10;
      }
      constructor(r, a) {
        (this.BEHAVIORAL_TYPE = 'gestures'),
          (this._isStarted = !1),
          (this._onGesture = new c.EventDispatcher()),
          (this.touchSnapshotsMap = new Map()),
          (this.snapshotStartTime = new Map()),
          (this.delegate = r),
          (this.sensors = a),
          (this.touchStartHandler = this.touchStart.bind(this)),
          (this.touchMoveHandler = this.touchMove.bind(this)),
          (this.touchEndHandler = this.touchEnd.bind(this)),
          (this.touchCancelHandler = this.touchCancel.bind(this));
      }
      countEvents(r) {
        const a = { epochTs: Date.now() };
        for (const s of r) a[s.type] = (a[s.type] || 0) + 1;
        return a;
      }
      clearTouchSnapshots(r) {
        this.touchSnapshotsMap.delete(r), this.snapshotStartTime.delete(r);
      }
      getTouchSnapshots(r) {
        let a;
        return (
          this.touchSnapshotsMap.has(r)
            ? (a = this.touchSnapshotsMap.get(r))
            : ((a = []), this.touchSnapshotsMap.set(r, a)),
          a
        );
      }
      isEmpty() {
        return this.touchSnapshotsMap.size === 0;
      }
      start() {
        this._isStarted ||
          (this.delegate.addEventListener(document, 'touchstart', this.touchStartHandler),
          this.delegate.addEventListener(document, 'touchmove', this.touchMoveHandler),
          this.delegate.addEventListener(document, 'touchend', this.touchEndHandler),
          this.delegate.addEventListener(document, 'touchcancel', this.touchCancelHandler),
          (this._isStarted = !0));
      }
      stop() {
        this._isStarted &&
          (document.removeEventListener('touchstart', this.touchStartHandler),
          document.removeEventListener('touchmove', this.touchMoveHandler),
          document.removeEventListener('touchend', this.touchEndHandler),
          document.removeEventListener('touchcancel', this.touchCancelHandler),
          (this._isStarted = !1));
      }
      touchStart(r) {
        try {
          if (
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) ||
            c.PointerConfig.instance.pointerParams.eventsToIgnore.has(r.type)
          )
            return;
          c._POSignalsUtils.Logger.debug('touchstart(' + r.changedTouches.length + ')', r),
            r.changedTouches.length > 0 && this.pushSnapshot(r);
        } catch (a) {
          c._POSignalsUtils.Logger.warn('error in touchStart handler', a);
        }
      }
      touchMove(r) {
        try {
          if (
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) ||
            c.PointerConfig.instance.pointerParams.eventsToIgnore.has(r.type)
          )
            return;
          c._POSignalsUtils.Logger.debug('touchmove(' + r.changedTouches.length + ')', r),
            r.changedTouches.length > 0 && this.pushSnapshot(r);
        } catch (a) {
          c._POSignalsUtils.Logger.warn('error in touchMove handler', a);
        }
      }
      touchEnd(r) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) {
            this._onGesture.dispatch(this, null);
            return;
          }
          if (c.PointerConfig.instance.pointerParams.eventsToIgnore.has(r.type)) return;
          c._POSignalsUtils.Logger.debug('touchend(' + r.changedTouches.length + ')', r),
            this.gestureEnd(r);
        } catch (a) {
          c._POSignalsUtils.Logger.warn('error in touchEnd handler', a);
        }
      }
      touchCancel(r) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) {
            this._onGesture.dispatch(this, null);
            return;
          }
          if (c.PointerConfig.instance.pointerParams.eventsToIgnore.has(r.type)) return;
          c._POSignalsUtils.Logger.debug('touchcancel(' + r.changedTouches.length + ')', r),
            this.gestureEnd(r);
        } catch (a) {
          c._POSignalsUtils.Logger.warn('error in touchCancel handler', a);
        }
      }
      gestureEnd(r) {
        r.changedTouches.length > 0 && this.pushSnapshot(r);
        for (let a = 0; a < r.changedTouches.length; a++) {
          const s = r.changedTouches.item(a),
            i = this.getTouchSnapshots(s.identifier);
          i.length > 0 &&
            (this.isTap(i)
              ? this.dispatchGesture(c.GestureType.Tap, s.identifier)
              : this.dispatchGesture(this.calcGestureType(i), s.identifier));
        }
      }
      calcGestureType(r) {
        let a;
        const s = this.getDirection(r);
        if (this.isFling(r))
          switch (s) {
            case h.Up: {
              a = c.GestureType.FlingUp;
              break;
            }
            case h.Right: {
              a = c.GestureType.FlingRight;
              break;
            }
            case h.Down: {
              a = c.GestureType.FlingDown;
              break;
            }
            case h.Left: {
              a = c.GestureType.FlingLeft;
              break;
            }
          }
        else if (this.isScroll(r))
          switch (s) {
            case h.Up: {
              a = c.GestureType.ScrollUp;
              break;
            }
            case h.Right: {
              a = c.GestureType.ScrollRight;
              break;
            }
            case h.Down: {
              a = c.GestureType.ScrollDown;
              break;
            }
            case h.Left: {
              a = c.GestureType.ScrollLeft;
              break;
            }
          }
        return a;
      }
      pushSnapshot(r) {
        if (r.changedTouches && r.changedTouches.length > 0)
          for (let a = 0; a < r.changedTouches.length; a++) {
            const s = r.changedTouches.item(a),
              i = s.radiusX && s.radiusY ? (s.radiusX + s.radiusY) / 2 : null;
            this.snapshotStartTime.has(s.identifier) ||
              this.snapshotStartTime.set(s.identifier, Date.now());
            const t = this.getTouchSnapshots(s.identifier);
            t.length < c.PointerConfig.instance.pointerParams.maxSnapshotsCount &&
              t.push({
                type: r.type,
                eventTs: r.timeStamp,
                epochTs: Date.now(),
                relativeX: s.screenX,
                relativeY: s.screenY,
                x: s.clientX,
                y: s.clientY,
                pressure: s.force,
                size: i,
                xaccelerometer: this.sensors.accX,
                yaccelerometer: this.sensors.accY,
                zaccelerometer: this.sensors.accZ,
                xlinearaccelerometer: this.sensors.lienarAccX,
                ylinearaccelerometer: this.sensors.lienarAccY,
                zlinearaccelerometer: this.sensors.lienarAccZ,
                xrotation: this.sensors.rotX,
                yrotation: this.sensors.rotY,
                zrotation: this.sensors.rotZ,
                radiusX: s.radiusX,
                radiusY: s.radiusY,
                rotationAngle: s.rotationAngle,
                pageX: s.pageX,
                pageY: s.pageY,
                getX() {
                  return s.screenX;
                },
                getY() {
                  return s.screenY;
                },
              });
          }
      }
      dispatchGesture(r, a) {
        const s = this.touchSnapshotsMap.get(a) || [],
          i = s.filter((t) => t.type === 'touchmove');
        this._onGesture.dispatch(this, {
          epochTs: this.snapshotStartTime.get(a) || 0,
          counter: this.delegate.gesturesCounter,
          type: r,
          events: s,
          eventCounters: this.countEvents(s),
          duration: this.delegate.getInteractionDuration(s),
          additionalData: this.delegate.additionalData,
          uiControl: void 0,
          timeProximity: c._POSignalsUtils.Util.calculateMeanTimeDeltasBetweenEvents(i),
          meanEuclidean: c._POSignalsUtils.Util.calculateMeanDistanceBetweenPoints(i),
          reduction: {},
          quality: '',
        }),
          this.clearTouchSnapshots(a);
      }
      isTap(r) {
        const a = Math.abs(r[0].x - r[1].x),
          s = Math.abs(r[0].y - r[1].y);
        return r.length == 2 && a < this.TAP_MOVEMENT_TRESHOLD && s < this.TAP_MOVEMENT_TRESHOLD;
      }
      isFling(r) {
        return r.length > 1 && r[r.length - 1].eventTs - r[0].eventTs < this.SCROLL_MIN_DURATION;
      }
      isScroll(r) {
        return r.length > 1 && r[r.length - 1].eventTs - r[0].eventTs > this.SCROLL_MIN_DURATION;
      }
      getDirection(r) {
        const a = this.calcAngle(r[0], r[r.length - 1]);
        return a > 90 - this.SWIPE_MAX_ANGLE && a <= 90 + this.SWIPE_MAX_ANGLE
          ? h.Up
          : a > 180 - this.SWIPE_MAX_ANGLE && a <= 180 + this.SWIPE_MAX_ANGLE
            ? h.Right
            : a > 270 - this.SWIPE_MAX_ANGLE && a <= 270 + this.SWIPE_MAX_ANGLE
              ? h.Down
              : h.Left;
      }
      calcAngle(r, a) {
        return (Math.atan2(a.y - r.y, a.x - r.x) * 180) / Math.PI + 180;
      }
    }
    c.GestureEvents = p;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.key = n), (this.cache = this.loadFromStorage());
      }
      loadFromStorage() {
        let n = h.sessionStorage.getItem(this.key);
        return n || (n = JSON.stringify([])), JSON.parse(n);
      }
      get() {
        return this.cache;
      }
      get length() {
        return this.cache.length;
      }
      push(n) {
        const r = this.cache.push(n);
        return h.sessionStorage.setItem(this.key, JSON.stringify(this.cache)), r;
      }
      set(n) {
        (this.cache = n), h.sessionStorage.setItem(this.key, JSON.stringify(this.cache));
      }
      remove(n) {
        this.cache.splice(n, 1), h.sessionStorage.setItem(this.key, JSON.stringify(this.cache));
      }
      concat(n) {
        return this.cache.concat(n);
      }
      clear() {
        (this.cache = []), h.sessionStorage.removeItem(this.key);
      }
    }
    (h.sessionStorage = c._POSignalsStorage.SessionStorage.instance.sessionStorage),
      (c.StorageArray = h);
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor() {
        (this.MAX_TAGS = 10),
          (this._tags = new c.StorageArray(c._POSignalsUtils.Constants.CAPTURED_TAGS));
      }
      static get instance() {
        return h._instance || (h._instance = new h()), h._instance;
      }
      get tags() {
        return this._tags.get();
      }
      set disableTags(n) {
        this._disableTags = n;
      }
      setTag(n, r) {
        var a;
        if (this._disableTags) return;
        if (!c.PointerConfig.instance.pointerParams.enabled) {
          c._POSignalsUtils.Logger.info("Can't add tag, PingOneSignals SDK is disabled");
          return;
        }
        if (!n) {
          c._POSignalsUtils.Logger.info("Can't add tag, missing name");
          return;
        }
        const s = c.PointerConfig.instance.pointerParams.tagsBlacklistRegex;
        if (s && (n.match(s) || (typeof r == 'string' && r != null && r.match(s)))) {
          c._POSignalsUtils.Logger.info('Tag name or value is blacklisted');
          return;
        }
        if (this._tags.length >= this.MAX_TAGS) return;
        typeof r != 'number'
          ? this._tags.push({
              name: n.trim(),
              value:
                ((a = r == null ? void 0 : r.trim) === null || a === void 0 ? void 0 : a.call(r)) ||
                void 0,
              epochTs: Date.now(),
              timestamp: Date.now(),
            })
          : this._tags.push({
              name: n.trim(),
              value: r,
              epochTs: Date.now(),
              timestamp: Date.now(),
            });
        const i = r ? `${n}:${r}` : n;
        c._POSignalsUtils.Logger.info(`Add tag: ${i}`);
      }
      reset() {
        this._tags.clear();
      }
    }
    c.Tags = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        this.client = n;
      }
      calculateStrategyResult(n, r) {
        return {
          shouldCollect:
            this.client.getBufferSize() < c.PointerConfig.instance.pointerParams.bufferSize,
        };
      }
    }
    c.FirstInteractionsStrategy = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (n) {
      (n[(n.RICH = 3)] = 'RICH'),
        (n[(n.CLICK = 2)] = 'CLICK'),
        (n[(n.MOVE = 1)] = 'MOVE'),
        (n[(n.POOR = 0)] = 'POOR');
    })(h || (h = {}));
    class p {
      constructor(r) {
        (this.client = r),
          (this.MAX_INTERACTIONS_PER_TYPE = 7),
          (this.RICH_MOUSE_MOVES_AMOUNT = 8),
          (this.MIN_KEYBOARD_EVENTS = 6),
          (this.MIN_TOUCH_EVENTS = 20);
      }
      isRichMouseInteraction(r) {
        return r.mousemove >= this.RICH_MOUSE_MOVES_AMOUNT && this.isClickInteraction(r);
      }
      isClickInteraction(r) {
        return r.mousedown > 0 && r.mouseup > 0;
      }
      isMoveInteraction(r) {
        return r.mousemove >= this.RICH_MOUSE_MOVES_AMOUNT;
      }
      classifyMouseInteraction(r) {
        const a = c._POSignalsUtils.Util.typesCounter(r.events);
        return this.isRichMouseInteraction(a)
          ? h.RICH
          : this.isClickInteraction(a)
            ? h.CLICK
            : this.isMoveInteraction(a)
              ? h.MOVE
              : h.POOR;
      }
      classifyKeyboardInteraction(r) {
        return r.events.length >= this.MIN_KEYBOARD_EVENTS ? h.RICH : h.POOR;
      }
      classifyTouchInteraction(r) {
        return r.events.length >= this.MIN_TOUCH_EVENTS ? h.RICH : h.POOR;
      }
      handleMouseInteraction(r, a) {
        const i = Date.now(),
          t = this.classifyMouseInteraction(r),
          e = this.getEnumKeyByValue(t);
        if (a.mouse.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
          return { shouldCollect: !0, quality: e };
        if (t === h.RICH) {
          const x = this.findOldestInteractionWithLowestQuality(a.mouse.interactions);
          if (x !== -1)
            return { shouldCollect: !0, remove: { type: 'mouse', index: x }, quality: e };
        }
        const [l, o] = this.splitInteractionsByTime(a.mouse.interactions, i, 18e4);
        return l.length < 2
          ? this.handleOlderInteractions(o, e)
          : this.handleRecentInteractions(l, o, t, e);
      }
      splitInteractionsByTime(r, a, s) {
        return r.reduce((i, t) => (t.epochTs >= a - s ? i[0].push(t) : i[1].push(t), i), [[], []]);
      }
      handleOlderInteractions(r, a) {
        const s = this.findOldestInteractionWithLowestQuality(r);
        return s !== -1
          ? { shouldCollect: !0, remove: { type: 'mouse', index: s }, quality: a }
          : { shouldCollect: !1, quality: a };
      }
      handleRecentInteractions(r, a, s, i) {
        const t = this.findOldestInteractionWithLowestQuality(r, s);
        if (t !== -1) {
          const e = r[t],
            l = this.client.getBehavioralData().mouse.interactions.indexOf(e),
            o = this.findOldestInteractionWithLowestQuality(
              a,
              h[this.client.getBehavioralData().mouse.interactions[l].quality],
            );
          return o !== -1
            ? { shouldCollect: !0, remove: { type: 'mouse', index: o }, quality: i }
            : { shouldCollect: !0, remove: { type: 'mouse', index: l }, quality: i };
        }
        return { shouldCollect: !1, quality: i };
      }
      handleKeyboardInteraction(r, a) {
        const i = Date.now(),
          t = this.classifyKeyboardInteraction(r),
          e = this.getEnumKeyByValue(t);
        if (a.keyboard.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
          return { shouldCollect: !0, quality: e };
        if (t === h.RICH) {
          const x = this.findOldestInteractionWithLowestQuality(a.keyboard.interactions);
          if (x !== -1)
            return { shouldCollect: !0, remove: { type: 'keyboard', index: x }, quality: e };
        }
        const [l, o] = this.splitInteractionsByTime(a.keyboard.interactions, i, 18e4);
        return l.length < 2
          ? this.handleOlderInteractions(o, e)
          : this.handleRecentInteractions(l, o, t, e);
      }
      handleTouchInteraction(r, a) {
        const i = Date.now(),
          t = this.classifyTouchInteraction(r),
          e = this.getEnumKeyByValue(t);
        if (a.touch.interactions.length < this.MAX_INTERACTIONS_PER_TYPE)
          return { shouldCollect: !0, quality: e };
        if (t === h.RICH) {
          const x = this.findOldestInteractionWithLowestQuality(a.touch.interactions);
          if (x !== -1)
            return { shouldCollect: !0, remove: { type: 'touch', index: x }, quality: e };
        }
        const [l, o] = this.splitInteractionsByTime(a.touch.interactions, i, 18e4);
        return l.length < 2
          ? this.handleOlderInteractions(o, e)
          : this.handleRecentInteractions(l, o, t, e);
      }
      calculateStrategyResult(r, a) {
        const s = this.client.getBehavioralData();
        switch (a) {
          case 'mouse':
            return this.handleMouseInteraction(r, s);
          case 'keyboard':
            return this.handleKeyboardInteraction(r, s);
          case 'touch':
            return this.handleTouchInteraction(r, s);
          default:
            throw new Error(`Unknown interaction type: ${a}`);
        }
      }
      getEnumKeyByValue(r) {
        return Object.keys(h).find((a) => h[a] === r);
      }
      findOldestInteractionWithLowestQuality(r, a) {
        let s = a != null ? a : h.RICH,
          i = -1,
          t = Number.MAX_SAFE_INTEGER;
        for (let e = 0; e < r.length; e++) {
          const l = h[r[e].quality];
          (l < s || (l === s && r[e].epochTs < t)) && ((s = l), (t = r[e].epochTs), (i = e));
        }
        return i;
      }
    }
    c.PriorityStrategy = p;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (n) {
      (n[(n.FIRST_INTERACTIONS = 0)] = 'FIRST_INTERACTIONS'),
        (n[(n.PRIORITY_INTERACTIONS = 1)] = 'PRIORITY_INTERACTIONS');
    })((h = c.BufferingStrategyType || (c.BufferingStrategyType = {})));
    class p {
      static createBufferingStrategy(r, a) {
        switch (r) {
          case h.FIRST_INTERACTIONS:
            return new c.FirstInteractionsStrategy(a);
          case h.PRIORITY_INTERACTIONS:
            return new c.PriorityStrategy(a);
        }
      }
    }
    c.StrategyFactory = p;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.sessionData = n),
          (this.instanceUUID = c._POSignalsUtils.Util.newGuid()),
          (this._isBehavioralDataPaused = !1),
          (this.started = !1),
          (this.initQueue = new c.PromiseQueue(1));
      }
      static instance() {
        if (!this._instance) {
          const n = c._POSignalsStorage.SessionStorage.instance;
          if (!document.body)
            throw (
              (c._POSignalsUtils.Logger.error(
                'PingOne Signals can be started only after DOM Ready!',
              ),
              new Error('PingOne Signals can be started only after DOM Ready!'))
            );
          this._instance = new c.Client(n, c.BufferingStrategyType.PRIORITY_INTERACTIONS);
        }
        return this._instance;
      }
      async getData() {
        if (!this.startedPromise) throw new Error('SDK not initialized');
        return await this.startedPromise, await this.dataHandler.getData(Date.now());
      }
      addTag(n, r) {
        c.Tags.instance.setTag(n, r);
      }
      async start(n = {}) {
        var r, a, s, i;
        if (
          (((r = n.waitForWindowLoad) !== null && r !== void 0 ? r : !0) &&
            (await this.loadEventPromise()),
          (this.initParams = n),
          this.validateStartParams(n),
          (this.clientVersion = c._POSignalsUtils.Constants.CLIENT_VERSION),
          this.started)
        ) {
          c._POSignalsUtils.Logger.warn('SDK already initialized');
          return;
        }
        (this.browserInfo = new c._POSignalsUtils.BrowserInfo()),
          (c._POSignalsUtils.Logger.isLogEnabled = !!n.consoleLogEnabled || !!n.devEnv),
          c._POSignalsUtils.Logger.info('Starting Signals SDK...'),
          (c.Tags.instance.disableTags = !!this.initParams.disableTags),
          this.sessionData.setStorageConfig(n);
        const e = c.PointerConfig.instance.pointerParams,
          l = {
            additionalMediaCodecs: e.additionalMediaCodecs,
            browserInfo: this.browserInfo,
            fingerprintTimeoutMillis: e.fingerprintTimeoutMillis,
            metadataBlackList: new Set(e.metadataBlackList.concat(n.deviceAttributesToIgnore)),
            propertyDescriptors: e.propertyDescriptors,
            webRtcUrl: e.webRtcUrl,
            dataPoints: e.metadataDataPoints,
          };
        (this.localAgentAccessor = new c._POSignalsMetadata.LocalAgentAccessor(
          (a = n.agentPort) !== null && a !== void 0
            ? a
            : c._POSignalsUtils.Constants.PINGID_AGENT_DEFAULT_PORT,
          (s = n.agentTimeout) !== null && s !== void 0
            ? s
            : c._POSignalsUtils.Constants.PINGID_AGENT_DEFAULT_TIMEOUT,
        )),
          (this.metadata = new c._POSignalsMetadata.Metadata(
            this.sessionData,
            l,
            n.externalIdentifiers,
            this.localAgentAccessor,
          )),
          (this.dataHandler = new c.DataHandler(
            this.clientVersion,
            this.instanceUUID,
            this.initParams,
            this.metadata,
            this,
            this.sessionData,
          )),
          (!((i = this.initParams.behavioralDataCollection) !== null && i !== void 0) || i) &&
            this.refreshListening(),
          n.lazyMetadata || (this.metadata.getDeviceAttributes(), this.metadata.getLocalAgentJwt()),
          (this.started = !0);
        try {
          this.logInit(), this.addStartupTags();
        } catch (o) {
          c._POSignalsUtils.Logger.warn('SDK post init failed', o);
        }
      }
      logInit() {
        var n, r;
        c._POSignalsUtils.Logger.info(
          `PingOne Signals initialized. ${JSON.stringify({ timestamp: new Date().getTime(), sdkVersion: this.clientVersion, instanceUUID: this.instanceUUID, tabUUID: this.sessionData.tabUUID }, null, 2)}`,
        );
        const a = () =>
            c._POSignalsUtils.Logger.info(`Token Ready: ${window._pingOneSignalsToken}`),
          s = () => {
            c._POSignalsUtils.Logger.info('Signals token fetch is disabled'),
              (window._pingOneSignalsToken = void 0);
          },
          i = 'uninitialized',
          t = 'skipped';
        ((n = window._pingOneSignalsToken) === null || n === void 0
          ? void 0
          : n.substring(0, t.length)) === t
          ? s()
          : ((r = window._pingOneSignalsToken) === null || r === void 0
              ? void 0
              : r.substring(0, i.length)) !== i && a(),
          document.addEventListener('PingOneSignalsTokenReadyEvent', a),
          document.addEventListener('PingOneSignalsTokenSkippedEvent', s);
      }
      get isBehavioralDataPaused() {
        return this._isBehavioralDataPaused;
      }
      getSignalsToken() {
        let n = '';
        if (
          typeof window._pingOneSignalsToken == 'string' &&
          0 <= window._pingOneSignalsToken.indexOf(':')
        ) {
          const r = window._pingOneSignalsToken.match(/t:(.*?)(&|$)/g);
          r && 0 < r.length && (n = r[0].replace(/&s*$/, '').replace(/t:/, ''));
        } else typeof window._pingOneSignalsToken == 'string' && (n = window._pingOneSignalsToken);
        return n;
      }
      pauseBehavioralData() {
        this._isBehavioralDataPaused ||
          ((this._isBehavioralDataPaused = !0), this.addTag('SDK paused behaviorally'));
      }
      resumeBehavioralData() {
        this._isBehavioralDataPaused &&
          ((this._isBehavioralDataPaused = !1), this.addTag('SDK resumed behaviorally'));
      }
      async startSignals(n) {
        try {
          return (
            (this.startedPromise = this.initQueue.add(() => this.start(n))),
            await this.startedPromise
          );
        } catch (r) {
          const a = {
            id: c._POSignalsUtils.POErrorCodes.INITIALIZATION_ERROR,
            message: r.message,
            code: 'SDK initialization failed.',
          };
          throw new Error(JSON.stringify(a));
        }
      }
      validateStartParams(n) {
        if (!document.body)
          throw (
            (c._POSignalsUtils.Logger.error('PingOne Signals can be started only after DOM Ready!'),
            new Error('PingOne Signals can be started only after DOM Ready!'))
          );
        n.externalIdentifiers = n.externalIdentifiers || {};
      }
      async loadEventPromise() {
        return new Promise((n) => {
          document.readyState === 'complete'
            ? n()
            : window.addEventListener('load', (r) => {
                n();
              });
        });
      }
      addStartupTags() {
        this.addTag('SDK started'),
          document.referrer && this.addTag('referrer', document.referrer),
          this.addTag('location', window.location.href);
      }
    }
    c.ClientBase = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.BEHAVIORAL_TYPE = 'indirect'),
          (this._isStarted = !1),
          (this._onClipboardEvent = new c.EventDispatcher()),
          (this.delegate = n),
          (this.onClipboardEventHandler = this.onEvent.bind(this));
      }
      get isStarted() {
        return this._isStarted;
      }
      get onClipboardEvent() {
        return this._onClipboardEvent.asEvent();
      }
      onEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          this._onClipboardEvent.dispatch(this, this.createClipboardEvent(n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in clipboard handler', r);
        }
      }
      createClipboardEvent(n) {
        const r = c._POSignalsUtils.Util.getSrcElement(n);
        return {
          category: 'ClipboardEvent',
          type: n.type,
          eventTs: n.timeStamp,
          epochTs: new Date().getTime(),
          additionalData: {
            locationHref: location.href,
            stId: this.delegate.getElementsStID(r),
            elementId: r == null ? void 0 : r.id,
          },
        };
      }
      start() {
        this._isStarted ||
          ((this._isStarted = !0),
          this.delegate.addEventListener(document, 'cut', this.onClipboardEventHandler),
          this.delegate.addEventListener(document, 'copy', this.onClipboardEventHandler),
          this.delegate.addEventListener(document, 'paste', this.onClipboardEventHandler));
      }
      stop() {
        this._isStarted &&
          ((this._isStarted = !1),
          document.removeEventListener('cut', this.onClipboardEventHandler),
          document.removeEventListener('copy', this.onClipboardEventHandler),
          document.removeEventListener('paste', this.onClipboardEventHandler));
      }
    }
    c.ClipboardEvents = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.BEHAVIORAL_TYPE = 'indirect'),
          (this._isStarted = !1),
          (this._onDragEvent = new c.EventDispatcher()),
          (this.delegate = n),
          (this.onDragEventHandler = this.onEvent.bind(this));
      }
      get isStarted() {
        return this._isStarted;
      }
      get onDragEvent() {
        return this._onDragEvent.asEvent();
      }
      createDragEvent(n) {
        return {
          category: 'DragEvent',
          type: n.type,
          eventTs: n.timeStamp,
          epochTs: new Date().getTime(),
          additionalData: { locationHref: location.href },
        };
      }
      onEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          this._onDragEvent.dispatch(this, this.createDragEvent(n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in drag handler', r);
        }
      }
      start() {
        this._isStarted ||
          ((this._isStarted = !0),
          this.delegate.addEventListener(document, 'dragstart', this.onDragEventHandler),
          this.delegate.addEventListener(document, 'dragexit', this.onDragEventHandler),
          this.delegate.addEventListener(document, 'drop', this.onDragEventHandler),
          this.delegate.addEventListener(document, 'dragend', this.onDragEventHandler));
      }
      stop() {
        this._isStarted &&
          ((this._isStarted = !1),
          document.removeEventListener('dragstart', this.onDragEventHandler),
          document.removeEventListener('dragexit', this.onDragEventHandler),
          document.removeEventListener('drop', this.onDragEventHandler),
          document.removeEventListener('dragend', this.onDragEventHandler));
      }
    }
    c.DragEvents = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.BEHAVIORAL_TYPE = 'indirect'),
          (this._isStarted = !1),
          (this._onFocusEvent = new c.EventDispatcher()),
          (this.delegate = n),
          (this.onFocusEventHandler = this.onEvent.bind(this));
      }
      get isStarted() {
        return this._isStarted;
      }
      get onFocusEvent() {
        return this._onFocusEvent.asEvent();
      }
      getRelatedTarget(n) {
        if (!n.relatedTarget) return { type: '', stId: '', elementId: '' };
        const r = {
          type: c._POSignalsUtils.Util.getObjectType(n.relatedTarget),
          stId: '',
          elementId: '',
        };
        n.relatedTarget.id && (r.elementId = n.relatedTarget.id);
        try {
          const a = n.relatedTarget;
          r.stId = this.delegate.getElementsStID(a);
        } catch {}
        return r;
      }
      createFocusEvent(n) {
        const r = c._POSignalsUtils.Util.getSrcElement(n),
          a = this.getRelatedTarget(n);
        return {
          category: 'FocusEvent',
          type: n.type,
          eventTs: n.timeStamp,
          epochTs: new Date().getTime(),
          additionalData: {
            locationHref: location.href,
            stId: this.delegate.getElementsStID(r),
            elementId: r ? r.id : '',
            relatedTarget: a,
          },
        };
      }
      onEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          this._onFocusEvent.dispatch(this, this.createFocusEvent(n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in focus handler', r);
        }
      }
      start() {
        this._isStarted ||
          ((this._isStarted = !0),
          this.delegate.addEventListener(document, 'DOMFocusIn', this.onFocusEventHandler),
          this.delegate.addEventListener(document, 'DOMFocusOut', this.onFocusEventHandler),
          this.delegate.addEventListener(document, 'focus', this.onFocusEventHandler),
          this.delegate.addEventListener(document, 'focusin', this.onFocusEventHandler),
          this.delegate.addEventListener(document, 'focusout', this.onFocusEventHandler));
      }
      stop() {
        this._isStarted &&
          ((this._isStarted = !1),
          document.removeEventListener('DOMFocusIn', this.onFocusEventHandler),
          document.removeEventListener('DOMFocusOut', this.onFocusEventHandler),
          document.removeEventListener('focus', this.onFocusEventHandler),
          document.removeEventListener('focusin', this.onFocusEventHandler),
          document.removeEventListener('focusout', this.onFocusEventHandler));
      }
    }
    c.FocusEvents = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.BEHAVIORAL_TYPE = 'indirect'),
          (this._isStarted = !1),
          (this._onUIEvent = new c.EventDispatcher()),
          (this.delegate = n),
          (this.onUIEventHandler = this.onEvent.bind(this));
      }
      get isStarted() {
        return this._isStarted;
      }
      get onUIEvent() {
        return this._onUIEvent.asEvent();
      }
      createUIEvent(n) {
        return {
          category: 'UIEvent',
          type: n.type,
          eventTs: n.timeStamp,
          epochTs: new Date().getTime(),
          additionalData: { locationHref: location.href },
        };
      }
      onEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          this._onUIEvent.dispatch(this, this.createUIEvent(n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in UIEvent handler', r);
        }
      }
      start() {
        this._isStarted ||
          ((this._isStarted = !0),
          this.delegate.addEventListener(document, 'resize', this.onUIEventHandler),
          this.delegate.addEventListener(document, 'scroll', this.onUIEventHandler),
          this.delegate.addEventListener(document, 'select', this.onUIEventHandler));
      }
      stop() {
        this._isStarted &&
          ((this._isStarted = !1),
          document.removeEventListener('resize', this.onUIEventHandler),
          document.removeEventListener('scroll', this.onUIEventHandler),
          document.removeEventListener('select', this.onUIEventHandler));
      }
    }
    c.UIEvents = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.BEHAVIORAL_TYPE = 'indirect'),
          (this.visibilityChangeEventName = 'visibilitychange'),
          (this.hiddenProperty = 'hidden'),
          (this._isStarted = !1),
          (this._onGeneralEvent = new c.EventDispatcher()),
          (this.delegate = n),
          (this.onGeneralEventHandler = this.onEvent.bind(this)),
          (this.onLangChangeHandler = this.onLangChangeEvent.bind(this)),
          (this.onOrientationChangeHandler = this.onOrientationChangeEvent.bind(this)),
          (this.onVisibilityChangeHandler = this.onVisibilityChangeEvent.bind(this)),
          typeof document.msHidden != 'undefined'
            ? ((this.hiddenProperty = 'msHidden'),
              (this.visibilityChangeEventName = 'msvisibilitychange'))
            : typeof document.webkitHidden != 'undefined' &&
              ((this.hiddenProperty = 'webkitHidden'),
              (this.visibilityChangeEventName = 'webkitvisibilitychange'));
      }
      get isStarted() {
        return this._isStarted;
      }
      get onGeneralEvent() {
        return this._onGeneralEvent.asEvent();
      }
      onEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          this._onGeneralEvent.dispatch(this, this.createGeneralEvent(n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in general event handler', r);
        }
      }
      onLangChangeEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          const r = this.createGeneralEvent(n);
          this._onGeneralEvent.dispatch(this, r);
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in LangChange event handler', r);
        }
      }
      onOrientationChangeEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          const r = this.createGeneralEvent(n),
            a = c._POSignalsUtils.Util.getDeviceOrientation();
          (r.additionalData.deviceOrientation = a.orientation),
            (r.additionalData.deviceAngle = a.angle),
            this._onGeneralEvent.dispatch(this, r);
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in OrientationChange event handler', r);
        }
      }
      onVisibilityChangeEvent(n) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) return;
          const r = this.createGeneralEvent(n);
          (r.additionalData.hidden = !!document[this.hiddenProperty]),
            document.visibilityState &&
              (r.additionalData.visibilityState = document.visibilityState.toString()),
            this._onGeneralEvent.dispatch(this, r);
        } catch (r) {
          c._POSignalsUtils.Logger.warn('error in VisibilityChange event handler', r);
        }
      }
      createGeneralEvent(n) {
        return {
          category: 'Event',
          type: n.type,
          eventTs: n.timeStamp,
          epochTs: new Date().getTime(),
          additionalData: { locationHref: location.href },
        };
      }
      start() {
        this._isStarted ||
          ((this._isStarted = !0),
          this.delegate.addEventListener(
            document,
            this.visibilityChangeEventName,
            this.onVisibilityChangeHandler,
          ),
          this.delegate.addEventListener(document, 'change', this.onGeneralEventHandler),
          this.delegate.addEventListener(document, 'fullscreenchange', this.onGeneralEventHandler),
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
          this.delegate.addEventListener(document, 'selectionchange', this.onGeneralEventHandler),
          this.delegate.addEventListener(document, 'submit', this.onGeneralEventHandler),
          this.delegate.addEventListener(document, 'volumechange', this.onGeneralEventHandler),
          this.delegate.addEventListener(document, 'reset', this.onGeneralEventHandler),
          this.delegate.addEventListener(document, 'textInput', this.onGeneralEventHandler));
      }
      stop() {
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
      }
    }
    c.GeneralEvents = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.DEFAULT_INDIRECT_IDLE_INTERVAL = 1e3),
          (this.MAX_INDIRECT_EVENTS = 25),
          (this._onIndirect = new c.EventDispatcher()),
          (this.indirectEvents = []),
          (this.idleTimeInMillis = this.DEFAULT_INDIRECT_IDLE_INTERVAL),
          (this.lastIndirectEventTimestamp = 0),
          (this._isStarted = !1),
          (this.clipboardEvents = new c.ClipboardEvents(n)),
          this.clipboardEvents.onClipboardEvent.subscribe(this.handleEvent.bind(this)),
          (this.dragEvents = new c.DragEvents(n)),
          this.dragEvents.onDragEvent.subscribe(this.handleEvent.bind(this)),
          (this.focusEvents = new c.FocusEvents(n)),
          this.focusEvents.onFocusEvent.subscribe(this.handleEvent.bind(this)),
          (this.uiEvents = new c.UIEvents(n)),
          this.uiEvents.onUIEvent.subscribe(this.handleEvent.bind(this)),
          (this.generalEvents = new c.GeneralEvents(n)),
          this.generalEvents.onGeneralEvent.subscribe(this.handleEvent.bind(this)),
          (this.onTimeElapsedHandler = this.onTimeElapsed.bind(this));
      }
      get onIndirect() {
        return this._onIndirect.asEvent();
      }
      async onTimeElapsed() {
        this.indirectEvents.length > 0 &&
          new Date().getTime() - this.lastIndirectEventTimestamp >= this.idleTimeInMillis &&
          this.dispatch();
      }
      handleEvent(n, r) {
        (this.lastIndirectEventTimestamp = new Date().getTime()), this.pushEvent(r);
      }
      pushEvent(n) {
        this.indirectEvents.push(n),
          this.indirectEvents.length >= this.MAX_INDIRECT_EVENTS && this.dispatch();
      }
      clearBuffer() {
        const n = { events: this.indirectEvents };
        return (this.indirectEvents = []), n;
      }
      dispatch() {
        try {
          clearInterval(this.updateIntervalHandle),
            this._onIndirect.dispatch(this, this.clearBuffer()),
            (this.updateIntervalHandle = setInterval(
              this.onTimeElapsedHandler,
              c.PointerConfig.instance.pointerParams.indirectIntervalMillis,
            ));
        } catch (n) {
          c._POSignalsUtils.Logger.warn('Failed to dispatch indirect events', n);
        }
      }
      get isStarted() {
        return this._isStarted;
      }
      start() {
        this._isStarted ||
          ((this.updateIntervalHandle = setInterval(
            this.onTimeElapsedHandler,
            c.PointerConfig.instance.pointerParams.indirectIntervalMillis,
          )),
          this.clipboardEvents.start(),
          this.dragEvents.start(),
          this.focusEvents.start(),
          this.uiEvents.start(),
          this.generalEvents.start(),
          (this._isStarted = !0));
      }
      stop() {
        this._isStarted &&
          (this.clipboardEvents.stop(),
          this.dragEvents.stop(),
          this.focusEvents.stop(),
          this.uiEvents.stop(),
          this.generalEvents.stop(),
          clearInterval(this.updateIntervalHandle),
          (this.updateIntervalHandle = null),
          (this._isStarted = !1));
      }
      unsubscribe() {
        this.clipboardEvents.onClipboardEvent.unsubscribe(this.handleEvent.bind(this)),
          this.dragEvents.onDragEvent.unsubscribe(this.handleEvent.bind(this)),
          this.focusEvents.onFocusEvent.unsubscribe(this.handleEvent.bind(this)),
          this.uiEvents.onUIEvent.unsubscribe(this.handleEvent.bind(this)),
          this.generalEvents.onGeneralEvent.unsubscribe(this.handleEvent.bind(this));
      }
    }
    c.IndirectClient = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor() {
        (this.config = {}), (this._cacheHash = 0), (this.cache = new Map());
      }
      refreshCssSelectors(n) {
        try {
          if (!n) return;
          const r = c._POSignalsUtils.Util.hashCode(JSON.stringify(n));
          if (this._cacheHash === r) return;
          (this.config = n), (this._cacheHash = r), (this.cache = new Map());
        } catch (r) {
          c._POSignalsUtils.Logger.warn('Failed to set css selectors', r);
        }
      }
      getIdentification(n, r) {
        if (this.cache.get(n) === null) return null;
        if (this.cache.get(n) !== void 0) return this.cache.get(n);
        for (const a in this.config)
          try {
            if (!this.config.hasOwnProperty(a)) continue;
            let s = this.config[a] || [];
            c._POSignalsUtils.Util.isArray(s) || (s = [].concat(s));
            for (const i of s)
              if (c._POSignalsUtils.Util.isSelectorMatches(n, i, r)) return this.cache.set(n, a), a;
          } catch (s) {
            c._POSignalsUtils.Logger.warn(`Failed to find selector for ${a}`, s);
          }
        return this.cache.set(n, null), null;
      }
      get cacheHash() {
        return this._cacheHash;
      }
    }
    c.ElementsIdentifications = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    const h = 'keydown',
      p = 'keyup',
      n = 'blur',
      r = 'focus';
    class s {
      get isStarted() {
        return this._isStarted;
      }
      get onInteraction() {
        return this._onInteraction.asEvent();
      }
      get onEnterPress() {
        return this._onEnterPress.asEvent();
      }
      get onObfuscatedValue() {
        return this._onObfuscatedValue.asEvent();
      }
      refreshKeyboardCssSelectors(t) {
        this._fieldsIdentifications.refreshCssSelectors(t);
      }
      get modifiersKeys() {
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
      }
      get specialKeys() {
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
      }
      constructor(t, e) {
        (this.BEHAVIORAL_TYPE = 'eventKeyboard'),
          (this._isStarted = !1),
          (this._onInteraction = new c.EventDispatcher()),
          (this._onEnterPress = new c.EventDispatcher()),
          (this._onObfuscatedValue = new c.EventDispatcher()),
          (this.interactionsMap = new Map()),
          (this._fieldsIdentifications = new c.ElementsIdentifications()),
          (this.keyStrokeMap = new Map()),
          (this.delegate = t),
          (this.uiControlManager = e),
          (this.onKeyDownHandle = this.onKeyDown.bind(this)),
          (this.onKeyUpHandle = this.onKeyUp.bind(this)),
          (this.onFocusHandle = this.onFocus.bind(this)),
          (this.onBlurHandle = this.onBlur.bind(this));
      }
      countEvent(t, e) {
        e && (e.eventCounters[t] = (e.eventCounters[t] || 0) + 1);
      }
      clearBuffer() {
        const t = c._POSignalsUtils.Util.getValuesOfMap(this.interactionsMap);
        return this.interactionsMap.clear(), t;
      }
      start() {
        this._isStarted
          ? c._POSignalsUtils.Logger.debug('Desktop Keyboard events already listening')
          : (this.delegate.addEventListener(document, h, this.onKeyDownHandle),
            this.delegate.addEventListener(document, p, this.onKeyUpHandle),
            this.delegate.addEventListener(document, r, this.onFocusHandle, !0),
            this.delegate.addEventListener(document, n, this.onBlurHandle, !0),
            (this._isStarted = !0),
            c._POSignalsUtils.Logger.debug('Desktop Keyboard events start listening...'));
      }
      stop() {
        this._isStarted
          ? (document.removeEventListener(h, this.onKeyDownHandle),
            document.removeEventListener(p, this.onKeyUpHandle),
            document.removeEventListener(r, this.onFocusHandle, !0),
            document.removeEventListener(n, this.onBlurHandle, !0),
            (this._isStarted = !1),
            c._POSignalsUtils.Logger.debug('Desktop Keyboard events stop listening...'))
          : c._POSignalsUtils.Logger.debug('Desktop Keyboard events already stopped');
      }
      getInteractionFromElement(t) {
        var e;
        let l = null,
          o = null;
        const x = c._POSignalsUtils.Util.getSrcElement(t);
        if (
          x &&
          x instanceof HTMLInputElement &&
          !c._POSignalsUtils.Util.isClickableInput(x) &&
          c._POSignalsUtils.Util.isFunction(x.getAttribute) &&
          !(!((e = x.hasAttribute) === null || e === void 0) && e.call(x, 'data-st-ignore')) &&
          !c._POSignalsUtils.Util.anySelectorMatches(
            x,
            c.PointerConfig.instance.pointerParams.keyboardCssSelectorsBlacklist,
            0,
          )
        ) {
          o = this.delegate.getElementsStID(x);
          const v = c.PointerConfig.instance.pointerParams.keyboardIdentifierAttributes;
          for (let y = 0; y < v.length && !o; y++) o = x.getAttribute(v[y]);
          o &&
            !c.PointerConfig.instance.pointerParams.keyboardFieldBlackList.has(o) &&
            ((l = this.interactionsMap.get(x)),
            l ||
              ((l = {
                epochTs: Date.now(),
                stId: o,
                elementId: c._POSignalsUtils.Util.getAttribute(x, 'id'),
                name: c._POSignalsUtils.Util.getAttribute(x, 'name'),
                type: c._POSignalsUtils.Util.getAttribute(x, 'type'),
                events: [],
                counter: this.delegate.keyboardCounter,
                eventCounters: { epochTs: Date.now() },
                duration: 0,
                numOfDeletions: 0,
                additionalData: this.delegate.additionalData,
                quality: '',
              }),
              this.interactionsMap.set(x, l)));
        }
        return l;
      }
      getKeyCode(t) {
        return t.keyCode
          ? t.keyCode
          : t.which
            ? t.which
            : t.code
              ? c._POSignalsUtils.Util.hashCode(t.code)
              : c._POSignalsUtils.Util.hashCode(t.key) + (t.location || 0);
      }
      getKeyboardEvent(t) {
        return t || window.event;
      }
      getKeystrokeId(t, e) {
        const l = this.getKeyCode(t);
        let o;
        return (
          e === p &&
            (this.keyStrokeMap.has(l)
              ? ((o = this.keyStrokeMap.get(l)), this.keyStrokeMap.delete(l))
              : (o = c._POSignalsUtils.Util.newGuid())),
          e === h &&
            (this.keyStrokeMap.has(l) && t.repeat
              ? (o = this.keyStrokeMap.get(l))
              : ((o = c._POSignalsUtils.Util.newGuid()), this.keyStrokeMap.set(l, o))),
          o
        );
      }
      createKeyboardInteractionEvent(t, e) {
        const l = c._POSignalsUtils.Util.getSrcElement(e),
          o = l.value ? l.value.toString().length : 0;
        return {
          type: t,
          eventTs: e.timeStamp,
          epochTs: Date.now(),
          selectionStart: c._POSignalsUtils.Util.getElementSelectionStart(l),
          selectionEnd: c._POSignalsUtils.Util.getElementSelectionEnd(l),
          key: e.key,
          keystrokeId: null,
          currentLength: o,
        };
      }
      enrichKeyboardEvent(t, e) {
        (this.modifiersKeys.indexOf(t.key) >= 0 || this.specialKeys.indexOf(t.key) >= 0) &&
          (e.key = t.key),
          (e.keystrokeId = this.getKeystrokeId(t, e.type));
        const l = c._POSignalsUtils.Util.getSrcElement(t);
        e.currentLength = String(l.value).length;
      }
      onFocus(t) {
        var e, l;
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) {
            this._onInteraction.dispatch(this, null);
            return;
          }
          t = this.getKeyboardEvent(t);
          const o = this.getInteractionFromElement(t);
          if (
            (this.countEvent(t.type, o),
            c.PointerConfig.instance.pointerParams.eventsToIgnore.has(t.type))
          )
            return;
          if (o) {
            const x = this.createKeyboardInteractionEvent(r, t);
            o.events.push(x);
            const v = this.uiControlManager.createUIControlData(t);
            v &&
              ((o.uiControl = { uiElement: v.uiElement, enrichedData: v.enrichedData }),
              ((l = (e = v.uiElement) === null || e === void 0 ? void 0 : e.id) === null ||
              l === void 0
                ? void 0
                : l.length) > 0 &&
                c._POSignalsUtils.Logger.info(`Typing in element with id '${v.uiElement.id}'`));
          }
        } catch (o) {
          c._POSignalsUtils.Logger.warn('error in keyboard focus handler', o);
        }
      }
      onKeyUp(t) {
        try {
          if (
            ((t = this.getKeyboardEvent(t)),
            (t.keyCode === 13 || t.which === 13) &&
              this._onEnterPress.dispatch(this, c._POSignalsUtils.Util.getSrcElement(t)),
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE))
          ) {
            this._onInteraction.dispatch(this, null);
            return;
          }
          const e = this.getInteractionFromElement(t);
          if (
            (this.countEvent(t.type, e),
            c.PointerConfig.instance.pointerParams.eventsToIgnore.has(t.type))
          )
            return;
          if (e) {
            const l = this.createKeyboardInteractionEvent(p, t);
            this.enrichKeyboardEvent(t, l), e.events.push(l);
          } else this.keyStrokeMap.delete(this.getKeyCode(t));
        } catch (e) {
          c._POSignalsUtils.Logger.warn('error in keyUp handler', e);
        }
      }
      isEmpty() {
        return this.interactionsMap.size === 0;
      }
      onKeyDown(t) {
        try {
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) {
            this._onInteraction.dispatch(this, null);
            return;
          }
          t = this.getKeyboardEvent(t);
          const e = this.getInteractionFromElement(t);
          if (
            (this.countEvent(t.type, e),
            c.PointerConfig.instance.pointerParams.eventsToIgnore.has(t.type))
          )
            return;
          if (e) {
            const l = this.createKeyboardInteractionEvent(h, t);
            this.enrichKeyboardEvent(t, l), e.events.push(l);
          }
        } catch (e) {
          c._POSignalsUtils.Logger.warn('error in keyDown handler', e);
        }
      }
      onBlur(t) {
        try {
          t = this.getKeyboardEvent(t);
          const e = this.getInteractionFromElement(t);
          if (!this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE)) {
            this._onInteraction.dispatch(this, null);
            return;
          }
          if (
            (this.countEvent(t.type, e),
            c.PointerConfig.instance.pointerParams.eventsToIgnore.has(t.type))
          )
            return;
          if (e) {
            const l = this.createKeyboardInteractionEvent(n, t);
            e.events.push(l),
              (e.duration = this.delegate.getInteractionDuration(e.events)),
              (e.numOfDeletions = this.calculateNumOfDeletions(e.events));
            const o = c._POSignalsUtils.Util.getSrcElement(t);
            this.interactionsMap.delete(o), this._onInteraction.dispatch(this, e);
          }
        } catch (e) {
          c._POSignalsUtils.Logger.warn('error in blur handler', e);
        }
      }
      calculateNumOfDeletions(t) {
        if (!(t != null && t[0])) return 0;
        let e = 0,
          l = t[0].currentLength;
        for (let o = 1; o < t.length; o++) t[o].currentLength < l && e++, (l = t[o].currentLength);
        return e;
      }
      get fieldsIdentifications() {
        return this._fieldsIdentifications;
      }
    }
    c.Keyboard = s;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n, r) {
        var a;
        const s = c.PointerConfig.instance.pointerParams.uiModelingElementFilters,
          i = c._POSignalsUtils.Util.getAttribute,
          t = (a = n.getBoundingClientRect) === null || a === void 0 ? void 0 : a.call(n);
        (this._htmlElement = n),
          (this._data = {
            location: this.getUIElementAttribute(s.location, () => window.location.href),
            id: this.getUIElementAttribute(s.id, () => i(n, 'id')),
            aria_label: this.getUIElementAttribute(s.aria_label, () => i(n, 'aria-label')),
            data_st_field: this.getUIElementAttribute(s.data_st_field, () => r.getElementsStID(n)),
            data_st_tag: this.getUIElementAttribute(s.data_st_tag, () => i(n, 'data-st-tag')),
            data_selenium: this.getUIElementAttribute(s.data_selenium, () => i(n, 'data-selenium')),
            data_selenium_id: this.getUIElementAttribute(s.data_selenium_id, () =>
              i(n, 'data-selenium-id'),
            ),
            data_testid: this.getUIElementAttribute(s.data_testid, () => i(n, 'data-testid')),
            data_test_id: this.getUIElementAttribute(s.data_test_id, () => i(n, 'data-test-id')),
            data_qa_id: this.getUIElementAttribute(s.data_qa_id, () => i(n, 'data-qa-id')),
            data_id: this.getUIElementAttribute(s.data_id, () => i(n, 'data-id')),
            name: this.getUIElementAttribute(s.name, () => i(n, 'name')),
            placeholder: this.getUIElementAttribute(s.placeholder, () => i(n, 'placeholder')),
            role: this.getUIElementAttribute(s.role, () => i(n, 'role')),
            type: this.getUIElementAttribute(s.type, () => i(n, 'type')),
            nodeTypeInt: this.getUIElementAttribute(s.nodeTypeInt, () => n.nodeType),
            nodeName: this.getUIElementAttribute(s.nodeName, () => n.nodeName),
            cursorType: this.getUIElementAttribute(
              s.cursorType,
              () => window.getComputedStyle(n).cursor,
            ),
            text: this.getUIElementAttribute(s.text, () => this.getElementText(n)),
            textLength: this.getUIElementAttribute(s.textLength, () => {
              var e;
              return (
                ((e = this.getElementText(n)) === null || e === void 0 ? void 0 : e.length) || null
              );
            }),
            bottom: this.getUIElementAttribute(s.bottom, () => (t == null ? void 0 : t.bottom)),
            height: this.getUIElementAttribute(s.height, () => (t == null ? void 0 : t.height)),
            left: this.getUIElementAttribute(s.left, () => (t == null ? void 0 : t.left)),
            right: this.getUIElementAttribute(s.right, () => (t == null ? void 0 : t.right)),
            top: this.getUIElementAttribute(s.top, () => (t == null ? void 0 : t.top)),
            width: this.getUIElementAttribute(s.width, () => (t == null ? void 0 : t.width)),
            x: this.getUIElementAttribute(s.x, () => (t == null ? void 0 : t.x)),
            y: this.getUIElementAttribute(s.y, () => (t == null ? void 0 : t.y)),
          }),
          (this._data.elementId = this.getStrongestElementID());
      }
      get data() {
        return c._POSignalsUtils.Util.filterReduce(this._data, (n) => n != null && n !== '');
      }
      get htmlElement() {
        return this._htmlElement;
      }
      getUIElementAttribute(n, r) {
        var a;
        try {
          if (!((a = n == null ? void 0 : n.enabled) !== null && a !== void 0) || a) {
            let s = r();
            return (
              typeof s == 'string' &&
                (typeof (n == null ? void 0 : n.maxLength) == 'number' &&
                  s.length > n.maxLength &&
                  (s = s.substring(0, n.maxLength)),
                n != null && n.filterRegex && (s = s.replace(new RegExp(n.filterRegex, 'g'), '*'))),
              s
            );
          }
        } catch (s) {
          c._POSignalsUtils.Logger.warn('Failed to add ui element attribute', s);
        }
        return null;
      }
      getStrongestElementID() {
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
      }
      getElementText(n) {
        return n instanceof HTMLInputElement && !c._POSignalsUtils.Util.isClickableInput(n)
          ? null
          : c._POSignalsUtils.Util.getElementText(n);
      }
      equals(n) {
        return !(
          !n ||
          (n.location && location.href.indexOf(n.location) < 0) ||
          (n.elementId && n.elementId !== this._data.elementId) ||
          (n.id && n.id !== this._data.id) ||
          (n.aria_label && n.aria_label !== this._data.aria_label) ||
          (n.data_st_field && n.data_st_field !== this._data.data_st_field) ||
          (n.data_st_tag && n.data_st_tag !== this._data.data_st_tag) ||
          (n.data_selenium && n.data_selenium !== this._data.data_selenium) ||
          (n.data_selenium_id && n.data_selenium_id !== this._data.data_selenium_id) ||
          (n.data_testid && n.data_testid !== this._data.data_testid) ||
          (n.data_test_id && n.data_test_id !== this._data.data_test_id) ||
          (n.data_qa_id && n.data_qa_id !== this._data.data_qa_id) ||
          (n.data_id && n.data_id !== this._data.data_id) ||
          (n.name && n.name !== this._data.name) ||
          (n.placeholder && n.placeholder !== this._data.placeholder) ||
          (n.role && n.role !== this._data.role) ||
          (n.type && n.type !== this._data.type) ||
          (n.nodeTypeInt && n.nodeTypeInt !== this._data.nodeTypeInt) ||
          (n.nodeName && n.nodeName !== this._data.nodeName) ||
          (n.cursorType && n.cursorType !== this._data.cursorType) ||
          (n.text && n.text !== this._data.text) ||
          (n.textLength && n.textLength !== this._data.textLength) ||
          (n.bottom && n.bottom !== this._data.bottom) ||
          (n.height && n.height !== this._data.height) ||
          (n.left && n.left !== this._data.left) ||
          (n.right && n.right !== this._data.right) ||
          (n.top && n.top !== this._data.top) ||
          (n.width && n.width !== this._data.width) ||
          (n.x && n.x !== this._data.x) ||
          (n.y && n.y !== this._data.y)
        );
      }
      static createCssSelector(n) {
        let r = '';
        return (
          n != null && n.nodeName && (r += n.nodeName.toLowerCase()),
          n != null && n.id && (r += `[id="${n.id}"]`),
          n != null && n.aria_label && (r += `[aria-label="${n.aria_label}"]`),
          n != null && n.data_st_field && (r += `[data-st-field="${n.data_st_field}"]`),
          n != null && n.data_st_tag && (r += `[data-st-tag="${n.data_st_tag}"]`),
          n != null && n.data_selenium && (r += `[data-selenium="${n.data_selenium}"]`),
          n != null && n.data_selenium_id && (r += `[data-selenium-id="${n.data_selenium_id}"]`),
          n != null && n.data_testid && (r += `[data-testid="${n.data_testid}"]`),
          n != null && n.data_test_id && (r += `[data-test-id="${n.data_test_id}"]`),
          n != null && n.data_qa_id && (r += `[data-qa-id="${n.data_qa_id}"]`),
          n != null && n.data_id && (r += `[data-id="${n.data_id}"]`),
          n != null && n.name && (r += `[name="${n.name}"]`),
          n != null && n.placeholder && (r += `[placeholder="${n.placeholder}"]`),
          n != null && n.role && (r += `[role="${n.role}"]`),
          n != null && n.type && (r += `[type="${n.type}"]`),
          r
        );
      }
    }
    c.UiElement = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        this._clientDelegate = n;
      }
      createUIControlData(n) {
        const r = c._POSignalsUtils.Util.getSrcElement(n);
        if (!r) return null;
        const a = c.PointerConfig.instance.pointerParams.uiModelingBlacklistRegex;
        if (a && window.location.href.match(a))
          return c._POSignalsUtils.Logger.debug('ui control data is disabled for this url'), null;
        const s = new c.UiElement(r, this._clientDelegate);
        return this.findMatchingUiControl(s) || { uiElement: s.data };
      }
      findMatchingUiControl(n, r = 0) {
        try {
          const a = c.PointerConfig.instance.pointerParams.uiControlsConfig;
          if (
            a.length === 0 ||
            r > c.PointerConfig.instance.pointerParams.uiModelingMaxMatchingParents
          )
            return null;
          let s = !1;
          for (const t of a)
            if (!(!t.tagConfig && !t.enrichedData) && ((s = !0), n.equals(t.uiElement)))
              return { uiElement: n.data, enrichedData: t.enrichedData, tagConfig: t.tagConfig };
          if (!s) return null;
          const i = n.htmlElement.parentElement;
          if ((i == null ? void 0 : i.nodeType) === Node.ELEMENT_NODE) {
            const t = new c.UiElement(i, this._clientDelegate);
            return this.findMatchingUiControl(t, r + 1);
          }
        } catch (a) {
          c._POSignalsUtils.Logger.warn('failed to find matching ui control', a);
        }
        return null;
      }
      convertToTagValueConfig(n) {
        var r;
        return {
          context:
            (r = n == null ? void 0 : n.uiElement) === null || r === void 0 ? void 0 : r.location,
          valueSelector: c.UiElement.createCssSelector(n == null ? void 0 : n.uiElement),
          operation: n == null ? void 0 : n.operation,
          valueMandatory: n == null ? void 0 : n.valueMandatory,
        };
      }
    }
    c.UIControlManager = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      get isStarted() {
        return this._isStarted;
      }
      get onInteraction() {
        return this._onInteraction.asEvent();
      }
      get onClickEvent() {
        return this._onClickEvent.asEvent();
      }
      constructor(n, r) {
        (this.BEHAVIORAL_TYPE = 'mouse'),
          (this._isStarted = !1),
          (this._onInteraction = new c.EventDispatcher()),
          (this._onClickEvent = new c.EventDispatcher()),
          (this.lastMouseInteractionTimestamp = null),
          (this.mouseEventsCounter = 0),
          (this.eventCounters = { epochTs: Date.now() }),
          (this.delegate = n),
          (this.uiControlManager = r),
          (this.wheelOptions = c._POSignalsUtils.Util.isPassiveSupported() ? { passive: !0 } : !1),
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
      countEvent(n) {
        this.eventCounters[n] = (this.eventCounters[n] || 0) + 1;
      }
      interactionUpdate() {
        this.lastMouseInteraction
          ? Date.now() - this.lastMouseInteractionTimestamp >=
              c.PointerConfig.instance.pointerParams.mouseIdleTimeoutMillis && this.dispatch()
          : !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) &&
            Date.now() - this.lastMouseInteractionTimestamp <=
              c.PointerConfig.instance.pointerParams.mouseIntervalMillis &&
            this.dispatch();
      }
      enrichLastInteraction() {
        var n;
        if (!this.lastMouseInteraction) return;
        (this.lastMouseInteraction.eventCounters = this.eventCounters),
          (this.lastMouseInteraction.duration = this.delegate.getInteractionDuration(
            this.lastMouseInteraction.events,
          ));
        const r =
          (n = this.lastMouseInteraction.events) === null || n === void 0
            ? void 0
            : n.filter((a) => a.type === 'mousemove');
        (this.lastMouseInteraction.timeProximity =
          c._POSignalsUtils.Util.calculateMeanTimeDeltasBetweenEvents(r)),
          (this.lastMouseInteraction.meanEuclidean =
            c._POSignalsUtils.Util.calculateMeanDistanceBetweenPoints(r));
      }
      dispatch() {
        try {
          this.enrichLastInteraction(),
            this._onInteraction.dispatch(this, this.lastMouseInteraction),
            (this.eventCounters = { epochTs: Date.now() }),
            (this.lastMouseInteraction = null),
            (this.mouseEventsCounter = 0);
        } catch (n) {
          c._POSignalsUtils.Logger.warn('Failed to dispatch mouse events', n);
        }
      }
      updateInteraction(n, r) {
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
          this.lastMouseInteraction.events.push(n),
          this.mouseEventsCounter++,
          r &&
            ((this.lastMouseInteraction.uiControl = {
              uiElement: r.uiElement,
              enrichedData: r.enrichedData,
            }),
            this.delegate.addUiControlTags(r.tagConfig)),
          this.mouseEventsCounter >= c.PointerConfig.instance.pointerParams.maxMouseEvents &&
            this.dispatch();
      }
      start() {
        this._isStarted
          ? c._POSignalsUtils.Logger.debug('Desktop Mouse events already listening')
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
              c.PointerConfig.instance.pointerParams.mouseIntervalMillis,
            )),
            (this._isStarted = !0),
            c._POSignalsUtils.Logger.debug('Desktop Mouse events start listening...'));
      }
      stop() {
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
            c._POSignalsUtils.Logger.debug('Desktop Mouse events stop listening...'))
          : c._POSignalsUtils.Logger.debug('Desktop Mouse events already stopped');
      }
      onClick(n) {
        var r, a;
        try {
          this.lastMouseInteractionTimestamp = Date.now();
          const s = c._POSignalsUtils.Util.getSrcElement(n);
          if (
            (this._onClickEvent.dispatch(this, s),
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) ||
              (this.countEvent(n.type),
              c.PointerConfig.instance.pointerParams.eventsToIgnore.has(n.type)))
          )
            return;
          const i = this.uiControlManager.createUIControlData(n);
          this.updateInteraction(this.createMouseClickEvent(n.type, n), i),
            this.dispatch(),
            ((a =
              (r = i == null ? void 0 : i.uiElement) === null || r === void 0 ? void 0 : r.id) ===
              null || a === void 0
              ? void 0
              : a.length) > 0 &&
              c._POSignalsUtils.Logger.info(`Tapped on element with id '${i.uiElement.id}'`);
        } catch (s) {
          c._POSignalsUtils.Logger.warn(`error in ${n.type} handler`, s);
        }
      }
      onMouseout(n) {
        try {
          this.onMouseEvent(n);
          const r = n.relatedTarget || n.toElement;
          (!r || r.nodeName === 'HTML') && this.dispatch();
        } catch (r) {
          c._POSignalsUtils.Logger.warn(`error in ${n.type} handler`, r);
        }
      }
      onMouseEvent(n) {
        try {
          if (
            (n.type !== 'wheel' && (this.lastMouseInteractionTimestamp = Date.now()),
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) ||
              (this.countEvent(n.type),
              c.PointerConfig.instance.pointerParams.eventsToIgnore.has(n.type)))
          )
            return;
          this.updateInteraction(this.createMouseEvent(n.type, n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn(`error in ${n.type} handler`, r);
        }
      }
      onMouseClickEvent(n) {
        try {
          if (
            ((this.lastMouseInteractionTimestamp = Date.now()),
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) ||
              (this.countEvent(n.type),
              c.PointerConfig.instance.pointerParams.eventsToIgnore.has(n.type)))
          )
            return;
          this.updateInteraction(this.createMouseClickEvent(n.type, n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn(`error in ${n.type} handler`, r);
        }
      }
      onPointerEvent(n) {
        try {
          if (
            ((this.lastMouseInteractionTimestamp = Date.now()),
            !this.delegate.collectBehavioralData(this.BEHAVIORAL_TYPE) ||
              (this.countEvent(n.type),
              c.PointerConfig.instance.pointerParams.eventsToIgnore.has(n.type)))
          )
            return;
          this.updateInteraction(this.createPointerEvent(n.type, n));
        } catch (r) {
          c._POSignalsUtils.Logger.warn(`error in ${n.type} handler`, r);
        }
      }
      clearBuffer() {
        let n = null;
        return (
          this.lastMouseInteraction && (n = this.lastMouseInteraction),
          (this.lastMouseInteraction = null),
          n
        );
      }
      isEmpty() {
        return !this.lastMouseInteraction;
      }
      createMouseEvent(n, r) {
        return {
          type: n,
          eventTs: r.timeStamp,
          epochTs: Date.now(),
          button: r.button,
          offsetX: r.offsetX,
          offsetY: r.offsetY,
          pageX: r.pageX,
          pageY: r.pageY,
          screenX: r.screenX,
          screenY: r.screenY,
          getX() {
            return r.screenX;
          },
          getY() {
            return r.screenY;
          },
        };
      }
      createPointerEvent(n, r) {
        return {
          ...this.createMouseEvent(n, r),
          pointerId: r.pointerId,
          width: r.width,
          height: r.height,
          pressure: r.pressure,
          tangentialPressure: r.tangentialPressure,
          tiltX: r.tiltX,
          tiltY: r.tiltY,
          twist: r.twist,
          pointerType: r.pointerType,
          isPrimary: r.isPrimary,
        };
      }
      createMouseClickEvent(n, r) {
        const a = this.createMouseEvent(n, r);
        if (r.target && c._POSignalsUtils.Util.isFunction(r.target.getBoundingClientRect)) {
          const s = r.target.getBoundingClientRect();
          (a.targetBottom = s.bottom),
            (a.targetHeight = s.height),
            (a.targetLeft = s.left),
            (a.targetRight = s.right),
            (a.targetTop = s.top),
            (a.targetWidth = s.width),
            (a.targetX = s.x),
            (a.targetY = s.y);
        }
        return a;
      }
    }
    c.Mouse = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.counter = 0), (this.key = n), (this.counter = this.loadFromStorage());
      }
      loadFromStorage() {
        const n = h.sessionStorage.getItem(this.key);
        return Number(n) || 0;
      }
      get() {
        return this.counter;
      }
      increment(n = 1) {
        (this.counter += n), h.sessionStorage.setItem(this.key, this.counter);
      }
      decrement(n = 1) {
        this.increment(n * -1);
      }
      reset() {
        (this.counter = 0), h.sessionStorage.removeItem(this.key);
      }
    }
    (h.sessionStorage = c._POSignalsStorage.SessionStorage.instance.sessionStorage),
      (c.StorageCounter = h);
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        (this.mapKey = n), (this.cache = this.loadFromStorage());
      }
      loadFromStorage() {
        let n = h.sessionStorage.getItem(this.mapKey);
        return n || (n = JSON.stringify({})), JSON.parse(n);
      }
      asMap() {
        return this.cache;
      }
      set(n, r, a = !0) {
        (this.cache[n] = r), a && h.sessionStorage.setItem(this.mapKey, JSON.stringify(this.cache));
      }
      sync() {
        h.sessionStorage.setItem(this.mapKey, JSON.stringify(this.cache));
      }
      get(n) {
        return this.cache[n];
      }
      delete(n) {
        delete this.cache[n], h.sessionStorage.setItem(this.mapKey, JSON.stringify(this.cache));
      }
      values() {
        return c._POSignalsUtils.Util.values(this.cache);
      }
      clear() {
        (this.cache = {}), h.sessionStorage.removeItem(this.mapKey);
      }
      forEach(n) {
        for (const r in this.cache) this.cache.hasOwnProperty(r) && n(this.cache[r], r);
      }
    }
    (h.sessionStorage = c._POSignalsStorage.SessionStorage.instance.sessionStorage),
      (c.StorageMap = h);
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor() {
        (this.config = {}), (this._cacheHash = 0), (this.cache = new Map());
      }
      refreshConfig(n) {
        try {
          if (!n) return;
          const r = c._POSignalsUtils.Util.hashCode(JSON.stringify(n));
          if (this._cacheHash === r) return;
          (this.config = n), (this._cacheHash = r), (this.cache = new Map());
        } catch (r) {
          c._POSignalsUtils.Logger.warn('Failed to set css selectors', r);
        }
      }
      getMatchingTags(n, r) {
        const a = this.cache.get(n);
        if (a) return a;
        const s = {};
        for (const i in this.config)
          try {
            if (!this.config.hasOwnProperty(i)) continue;
            let t = this.config[i].selector || [];
            c._POSignalsUtils.Util.isArray(t) || (t = [].concat(t));
            for (const e of t)
              c._POSignalsUtils.Util.isSelectorMatches(n, e, r) && (s[i] = this.config[i]);
          } catch (t) {
            c._POSignalsUtils.Logger.warn(`Failed to get the config for ${i} tag`, t);
          }
        return this.cache.set(n, s), s;
      }
      getValue(n, r) {
        if (r && n)
          switch (((r = r.trim()), n)) {
            case 'email_domain':
              return c._POSignalsUtils.Util.getEmailDomain(r);
            case 'obfuscate':
              return `${c._POSignalsUtils.Util.mod(r, 1e3)}`;
            case 'plain':
              return r;
            case 'zip':
              return r.substr(0, 3);
            case 'length':
              return `${r.length}`;
          }
        return '';
      }
      get cacheHash() {
        return this._cacheHash;
      }
    }
    c.TagsIdentifications = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor() {
        this._reduceFactorMap = null;
      }
      set reduceFactorMap(n) {
        this._reduceFactorMap = n;
      }
      get reduceFactorMap() {
        return this._reduceFactorMap;
      }
      reduceEventsByFactor(n) {
        try {
          if (!n || n.length === 0 || !this.reduceFactorMap) return n;
          const r = new Map(),
            a = [];
          for (let i = 0; i < n.length; i++)
            r.get(n[i].type) ? r.get(n[i].type).push(i) : r.set(n[i].type, [i]);
          r.forEach((i, t) => {
            const e = this.reduceFactorMap[t] ? Number(this.reduceFactorMap[t]) : 0;
            this.reduceByFactor(e, i, (l) => {
              a[i[l]] = !0;
            });
          });
          const s = [];
          for (let i = 0; i < n.length; i++) a[i] && s.push(n[i]);
          return (
            n.length !== s.length &&
              c._POSignalsUtils.Logger.debug(
                `${n.length - s.length} events reduced out of ${n.length}`,
              ),
            s
          );
        } catch (r) {
          return c._POSignalsUtils.Logger.warn('Failed to reduce events', r), n;
        }
      }
      reduceByFactor(n, r, a) {
        n = Math.min(n, 1);
        const s = Math.round(Math.max(r.length * (1 - n), 2)),
          i = (r.length - 1) / (s - 1),
          t = Math.min(r.length, s);
        for (let e = 0; e < t; e++) {
          const l = Math.round(e * i);
          a(l);
        }
      }
    }
    c.ReduceFactor = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        this.algorithm = n;
      }
      reduce(n, r) {
        if (h.TYPES_TO_REDUCE.indexOf(r) === -1) return { keptEvents: n, epsilon: 0 };
        if (n.length <= h.MIN_EVENTS_TO_REDUCE) return { keptEvents: n, epsilon: 0 };
        const a = n.length < 50 ? 0.55 : n.length < 100 ? 0.35 : 0.2,
          s = n.length < 50 ? 1 : n.length < 100 ? 3 : 7,
          i = this.algorithm.reduceEvents(n, s),
          t = i.length / n.length;
        if (i.length >= 10 && t >= a) return { keptEvents: i, epsilon: s };
        const e = n.length < 50 ? 0.1 : n.length < 100 ? 0.3 : 0.7,
          l = this.algorithm.reduceEvents(n, e),
          o = l.length / n.length;
        if (l.length <= h.MIN_EVENTS_TO_REDUCE || o <= a) return { keptEvents: l, epsilon: e };
        const v =
          (Math.min(s, Math.pow(s, t / a)) * Math.abs(o - a) + e * Math.abs(t - a)) /
          Math.abs(t - o);
        return (
          (v < e || v > s) &&
            c._POSignalsUtils.Logger.warn(
              `linear weighted average - calculated epsilon is out of range, lowEpsilon: ${e}, highEpsilon: ${s}, epsilon: ${v}`,
            ),
          { keptEvents: this.algorithm.reduceEvents(n, v), epsilon: v }
        );
      }
    }
    (h.MIN_EVENTS_TO_REDUCE = 18),
      (h.TYPES_TO_REDUCE = ['mousemove', 'touchmove']),
      (c.RDPEpsilonStrategy = h);
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor(n) {
        this.rdpStrategy = n;
      }
      reduceWithRPD(n) {
        if (!n || n.length === 0) return { events: n, reductionInfo: {} };
        const r = new Map();
        let a = [];
        for (const t of n) r.get(t.type) ? r.get(t.type).push(t) : r.set(t.type, [t]);
        const s = {};
        return (
          r.forEach((t, e) => {
            const { keptEvents: l, epsilon: o } = this.rdpStrategy.reduce(t, e);
            o > 0 && (s[e] = { epsilon: o, originalLength: t.length, keptLength: l.length }),
              (a = a.concat(l));
          }),
          { events: c._POSignalsUtils.Util.sortEventsByTimestamp(a), reductionInfo: s }
        );
      }
    }
    c.ReduceRDP = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      getSqDist(n, r) {
        const a = n.getX() - r.getX(),
          s = n.getY() - r.getY();
        return a * a + s * s;
      }
      getSqSegDist(n, r, a) {
        let s = r.getX(),
          i = r.getY(),
          t = a.getX() - s,
          e = a.getY() - i;
        if (t !== 0 || e !== 0) {
          const l = ((n.getX() - s) * t + (n.getY() - i) * e) / (t * t + e * e);
          l > 1 ? ((s = a.getX()), (i = a.getY())) : l > 0 && ((s += t * l), (i += e * l));
        }
        return (t = n.getX() - s), (e = n.getY() - i), t * t + e * e;
      }
      simplifyRadialDist(n, r) {
        let a = n[0],
          s = [a],
          i;
        for (let t = 1, e = n.length; t < e; t++)
          (i = n[t]), this.getSqDist(i, a) > r && (s.push(i), (a = i));
        return a !== i && s.push(i), s;
      }
      simplifyDPStep(n, r, a, s, i) {
        let t = s,
          e;
        for (let l = r + 1; l < a; l++) {
          const o = this.getSqSegDist(n[l], n[r], n[a]);
          o > t && ((e = l), (t = o));
        }
        t > s &&
          (e - r > 1 && this.simplifyDPStep(n, r, e, s, i),
          i.push(n[e]),
          a - e > 1 && this.simplifyDPStep(n, e, a, s, i));
      }
      simplifyDouglasPeucker(n, r) {
        const a = n.length - 1,
          s = [n[0]];
        return this.simplifyDPStep(n, 0, a, r, s), s.push(n[a]), s;
      }
      simplify(n, r, a) {
        if (n.length <= 2) return n;
        const s = r !== void 0 ? r * r : 1;
        return (
          (n = a ? n : this.simplifyRadialDist(n, s)), (n = this.simplifyDouglasPeucker(n, s)), n
        );
      }
      reduceEvents(n, r) {
        return this.simplify(n, r);
      }
    }
    c.RDPReduction = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      filterMoveEvents(n, r) {
        if (n.length <= 18) return n;
        const a = n.filter((e) => e.type === r),
          s = c._POSignalsUtils.Util.keepFirstEventsWithDistance({
            events: a,
            threshold: 200,
            min: 18,
            max: 30,
          });
        let i = -1;
        const t = {};
        for (let e = 0; e < n.length; e++) {
          const l = n[e];
          if (l.type !== r) {
            if (l.type === 'mousedown') {
              i = e;
              continue;
            }
            t[l.type] || (s.push(l), (t[l.type] = !0));
          }
        }
        return i >= 0 && s.push(n[i]), c._POSignalsUtils.Util.sortEventsByTimestamp(s);
      }
    }
    c.EventsReduction = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor() {
        (this.reduceFactor = new c.ReduceFactor()),
          (this.reduceRDP = new c.ReduceRDP(new c.RDPEpsilonStrategy(new c.RDPReduction()))),
          (this.eventsReduction = new c.EventsReduction());
      }
      set reduceFactorMap(n) {
        this.reduceFactor.reduceFactorMap = n;
      }
      reduceGesture(n) {
        const r = this.reduceRDP.reduceWithRPD(n.events);
        (n.events = this.eventsReduction.filterMoveEvents(r.events, 'touchmove')),
          (n.reduction = r.reductionInfo);
      }
      reduceKeyboardInteraction(n) {
        n.events = c._POSignalsUtils.Util.filterArrayByLength(n.events, 50);
      }
      reduceMouseInteraction(n) {
        const r = this.reduceRDP.reduceWithRPD(n.events);
        (n.events = this.eventsReduction.filterMoveEvents(r.events, 'mousemove')),
          (n.reduction = r.reductionInfo);
      }
    }
    c.ReductionManager = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h extends c.ClientBase {
      constructor(n, r) {
        super(n),
          (this.tagsWithValueIdentifications = new c.TagsIdentifications()),
          (this.reductionManager = new c.ReductionManager()),
          (this.lastGestureTimestamp = 0),
          (this.currentBufferSize = 0),
          (this.MAX_EVENT_COUNTERS = 20),
          (this.bufferingStrategy = c.StrategyFactory.createBufferingStrategy(r, this)),
          (this.capturedKeyboardInteractions = new c.StorageArray(
            c._POSignalsUtils.Constants.CAPTURED_KEYBOARD_INTERACTIONS,
          )),
          (this.keyboardInteractionsCount = new c.StorageCounter(
            c._POSignalsUtils.Constants.KEYBOARD_INTERACTIONS_COUNT,
          )),
          (this.mouseInteractionsCount = new c.StorageCounter(
            c._POSignalsUtils.Constants.MOUSE_INTERACTIONS_COUNT,
          )),
          (this.gesturesCount = new c.StorageCounter(c._POSignalsUtils.Constants.GESTURES_COUNT)),
          (this.mouseEventCounters = new c.StorageArray(
            c._POSignalsUtils.Constants.MOUSE_EVENT_COUNTERS,
          )),
          (this.keyboardEventCounters = new c.StorageArray(
            c._POSignalsUtils.Constants.KEYBOARD_EVENT_COUNTERS,
          )),
          (this.touchEventCounters = new c.StorageArray(
            c._POSignalsUtils.Constants.TOUCH_EVENT_COUNTERS,
          )),
          (this.indirectEventCounters = new c.StorageArray(
            c._POSignalsUtils.Constants.INDIRECT_EVENT_COUNTERS,
          )),
          (this.capturedMouseInteractions = new c.StorageArray(
            c._POSignalsUtils.Constants.CAPTURED_MOUSE_INTERACTIONS,
          )),
          (this.capturedGestures = new c.StorageArray(
            c._POSignalsUtils.Constants.CAPTURED_GESTURES,
          )),
          (this.capturedIndirectEvents = new c.StorageArray(
            c._POSignalsUtils.Constants.CAPTURED_INDIRECT,
          )),
          (this.capturedMouseInteractionSummary = new c.StorageArray(
            c._POSignalsUtils.Constants.CAPTURED_MOUSE_INTERACTIONS_SUMMARY,
          )),
          (this.currentBufferSize =
            this.capturedGestures.length +
            this.capturedMouseInteractions.length +
            this.capturedKeyboardInteractions.length),
          (this.uiControlManager = new c.UIControlManager(this)),
          (this.keyboard = new c.Keyboard(this, this.uiControlManager)),
          this.keyboard.onInteraction.subscribe(this.handleKeyboardInteraction.bind(this)),
          this.keyboard.onEnterPress.subscribe(this.handleStTagOnEnter.bind(this)),
          this.keyboard.onObfuscatedValue.subscribe(this.handleTagValueOnBlur.bind(this)),
          (this.mouse = new c.Mouse(this, this.uiControlManager)),
          this.mouse.onInteraction.subscribe(this.handleMouseInteraction.bind(this)),
          this.mouse.onClickEvent.subscribe(this.handleStTagOnClick.bind(this)),
          (this.sensors = new c.Sensors(this)),
          (this.gesture = new c.GestureEvents(this, this.sensors)),
          this.gesture.onGesture.subscribe(this.handleGesture.bind(this)),
          (this.indirect = new c.IndirectClient(this)),
          this.indirect.onIndirect.subscribe(this.handleIndirect.bind(this)),
          (this.onUrlChangeHandler = this.onUrlChange.bind(this));
      }
      get keyboardCounter() {
        return this.keyboardInteractionsCount.get();
      }
      get mouseCounter() {
        return this.mouseInteractionsCount.get();
      }
      get gesturesCounter() {
        return this.gesturesCount.get();
      }
      get additionalData() {
        const n = c._POSignalsUtils.Util.getDeviceOrientation();
        return {
          locationHref: location.href,
          devTools: c._POSignalsUtils.Util.getDevToolsState(),
          innerWidth:
            window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
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
          deviceOrientation: n.orientation,
          deviceAngle: n.angle,
        };
      }
      getBehavioralData() {
        this.clearIndirectBuffer();
        const n = this.reduceEpochEventCounters();
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
          eventCounters: n,
        };
      }
      getBufferSize() {
        return this.currentBufferSize;
      }
      getInteractionDuration(n) {
        return (n == null ? void 0 : n.length) > 0 ? n[n.length - 1].epochTs - n[0].epochTs : 0;
      }
      async dispose() {
        this.stopListening(),
          this.keyboard.onInteraction.unsubscribe(this.handleKeyboardInteraction.bind(this)),
          this.keyboard.onEnterPress.unsubscribe(this.handleStTagOnEnter.bind(this)),
          this.keyboard.onObfuscatedValue.unsubscribe(this.handleTagValueOnBlur.bind(this)),
          this.mouse.onInteraction.unsubscribe(this.handleMouseInteraction.bind(this)),
          this.mouse.onClickEvent.unsubscribe(this.handleStTagOnClick.bind(this)),
          this.gesture.onGesture.unsubscribe(this.handleGesture.bind(this)),
          this.indirect.unsubscribe(),
          this.indirect.onIndirect.unsubscribe(this.handleIndirect.bind(this));
      }
      collectBehavioralData(n) {
        if (this.isBehavioralDataPaused) return !1;
        const r = c.PointerConfig.instance.pointerParams.behavioralBlacklist;
        return !n || !r || !r[n] ? !0 : !window.location.href.match(r[n]);
      }
      getElementsStID(n) {
        try {
          return (
            c._POSignalsUtils.Util.getAttribute(n, 'data-st-field') ||
            this.keyboard.fieldsIdentifications.getIdentification(n, 0) ||
            ''
          );
        } catch (r) {
          return c._POSignalsUtils.Logger.warn('failed to get element stId', r), '';
        }
      }
      addEventListener(n, r, a, s) {
        c.PointerConfig.instance.pointerParams.eventsBlackList.has(r) ||
          (n.addEventListener(r, this.onEventHandler, s), n.addEventListener(r, a, s));
      }
      addUiControlTags(n) {
        if ((n == null ? void 0 : n.length) > 0) {
          let r = !1;
          for (const a of n)
            try {
              if (a != null && a.name) {
                const s = this.uiControlManager.convertToTagValueConfig(a.value);
                r = this.addSingleTagWithValue(a.name, s) || r;
              }
            } catch (s) {
              c._POSignalsUtils.Logger.warn('failed to add tag config', s);
            }
        }
      }
      refreshListening() {
        const n = c.PointerConfig.instance;
        this.tagsWithValueIdentifications.refreshConfig(n.pointerParams.remoteTags),
          (this.reductionManager.reduceFactorMap = n.pointerParams.eventsReduceFactorMap),
          this.keyboard.refreshKeyboardCssSelectors(n.pointerParams.keyboardCssSelectors),
          (this.sensors.maxSensorSamples = n.pointerParams.maxSensorSamples),
          (this.sensors.sensorsTimestampDeltaInMillis = n.pointerParams.sensorsDeltaInMillis),
          this.mouse.start(),
          this.keyboard.start(),
          this.gesture.start(),
          this.indirect.start(),
          n.pointerParams.maxSensorSamples == 0 ? this.sensors.stop() : this.sensors.start(),
          this.addEventListener(window, '_onlocationchange', this.onUrlChangeHandler),
          this.addEventListener(window, 'popstate', this.onUrlChangeHandler);
      }
      addSingleTagWithValue(n, r) {
        try {
          if (r != null && r.context && !window.location.href.match(r.context)) return !1;
          let a = '';
          if (r != null && r.operation && r != null && r.valueSelector) {
            const s = document.querySelector(r.valueSelector);
            if (s) {
              const i = c._POSignalsUtils.Util.getElementText(s);
              a = this.tagsWithValueIdentifications.getValue(r.operation, i);
            }
          }
          if (r != null && r.valueMandatory && !a)
            return c._POSignalsUtils.Logger.warn(`tag '${n}' wasn't added. value is missing`), !1;
          this.addTag(n, a);
        } catch (a) {
          c._POSignalsUtils.Logger.warn(`failed to add ${n} tag`, a);
        }
        return !1;
      }
      addTagsWithValue(n) {
        let r = !1;
        for (const a in n) n.hasOwnProperty(a) && (r = this.addSingleTagWithValue(a, n[a]) || r);
      }
      handleStTagOnEnter(n, r) {
        r instanceof HTMLInputElement &&
          c._POSignalsUtils.Util.isTextInput(r) &&
          this.handleStTagElement(r);
      }
      handleTagValueOnBlur(n, r) {
        r && this.addTag(r.fieldKey, r.obfuscatedValue);
      }
      handleStTagOnClick(n, r) {
        (!(r instanceof HTMLInputElement) || c._POSignalsUtils.Util.isClickableInput(r)) &&
          this.handleStTagElement(r);
      }
      handleMouseInteraction(n, r) {
        if (!r) return;
        this.incrementEventCounters(r.eventCounters, 'mouse'),
          this.filterOldMouseEvents(),
          this.mouseInteractionsCount.increment(),
          this.reductionManager.reduceMouseInteraction(r);
        const a = this.bufferingStrategy.calculateStrategyResult(r, 'mouse');
        (r.quality = a.quality),
          this.handleMouseInteractionSummary(r),
          a.shouldCollect &&
            (a.remove && this.removeInteraction(a.remove),
            this.capturedMouseInteractions.push(r),
            this.lastGestureTimestamp !== r.events[r.events.length - 1].eventTs &&
              this.currentBufferSize++);
      }
      handleMouseInteractionSummary(n) {
        const r = {
          epochTs: n.epochTs,
          duration: this.getInteractionDuration(n.events),
          quality: n.quality,
        };
        this.capturedMouseInteractionSummary.push(r),
          this.capturedMouseInteractionSummary.length > 10 &&
            this.capturedMouseInteractionSummary.remove(0);
      }
      handleIndirect(n, r) {
        this.filterOldIndirectEvents(), this.addIndirectEvents(r);
      }
      handleKeyboardInteraction(n, r) {
        if (!r) return;
        this.incrementEventCounters(r.eventCounters, 'keyboard'),
          this.filterOldKeyboardEvents(),
          this.keyboardInteractionsCount.increment(),
          this.reductionManager.reduceKeyboardInteraction(r);
        const a = this.bufferingStrategy.calculateStrategyResult(r, 'keyboard');
        a.shouldCollect &&
          (a.remove && this.removeInteraction(a.remove),
          (r.quality = a.quality),
          this.capturedKeyboardInteractions.push(r),
          this.currentBufferSize++);
      }
      handleGesture(n, r) {
        var a;
        if (!this.isValidGesture(r)) return;
        this.incrementEventCounters(r.eventCounters, 'touch'),
          this.filterOldGesturesEvents(),
          this.gesturesCount.increment(),
          this.reductionManager.reduceGesture(r);
        const s = this.bufferingStrategy.calculateStrategyResult(r, 'touch');
        s.shouldCollect &&
          (s.remove && this.removeInteraction(s.remove),
          (r.quality = s.quality),
          this.sensors.onGesture(r),
          this.capturedGestures.push(r),
          this.currentBufferSize++,
          (this.lastGestureTimestamp =
            (a = r.events[r.events.length - 1]) === null || a === void 0 ? void 0 : a.eventTs));
      }
      clearIndirectBuffer() {
        const n = this.indirect.clearBuffer();
        this.addIndirectEvents(n);
      }
      removeInteraction(n) {
        switch (n.type) {
          case 'mouse':
            this.capturedMouseInteractions.remove(n.index);
            break;
          case 'keyboard':
            this.capturedKeyboardInteractions.remove(n.index);
            break;
          case 'touch':
            this.capturedGestures.remove(n.index);
            break;
        }
      }
      addIndirectEvents(n) {
        var r;
        if (
          ((r = n == null ? void 0 : n.events) === null || r === void 0 ? void 0 : r.length) > 0
        ) {
          const a = [],
            s = c._POSignalsUtils.Util.typesCounter(this.capturedIndirectEvents.get());
          for (const i of n.events)
            c.PointerConfig.instance.pointerParams.highPriorityIndirectEvents.has(i.type) &&
              this.capturedIndirectEvents.length + a.length <
                c.PointerConfig.instance.pointerParams.maxIndirectEvents &&
              a.push(i),
              s[i.type] > 0 || (a.push(i), (s[i.type] = 1));
          this.incrementEventCounters(s, 'indirect'),
            this.capturedIndirectEvents.set(this.capturedIndirectEvents.concat(a));
        }
      }
      onUrlChange() {
        this.addTag('location', window.location.href);
      }
      handleStTagElement(n) {
        if (n) {
          const r = c.PointerConfig.instance.pointerParams.maxSelectorChildren,
            a = this.tagsWithValueIdentifications.getMatchingTags(n, r);
          this.addTagsWithValue(a);
          const s = c._POSignalsUtils.Util.isSelectorMatches(n, '[data-st-tag]', r);
          if (s instanceof Element) {
            const i = c._POSignalsUtils.Util.getAttribute(s, 'data-st-tag'),
              t = c._POSignalsUtils.Util.getAttribute(s, 'data-st-tag-value');
            i && this.addTag(i, t);
          }
        }
      }
      stopListening() {
        this.keyboard.stop(),
          this.mouse.stop(),
          this.gesture.stop(),
          this.indirect.stop(),
          this.sensors.stop(),
          window.removeEventListener('_onlocationchange', this.onUrlChangeHandler),
          window.removeEventListener('popstate', this.onUrlChangeHandler);
      }
      clearBehavioralData() {
        this.capturedKeyboardInteractions.clear(),
          this.capturedMouseInteractions.clear(),
          this.capturedGestures.clear(),
          this.capturedIndirectEvents.clear(),
          this.sensors.reset(),
          c.Tags.instance.reset(),
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
      }
      isValidGesture(n) {
        var r, a;
        return (
          ((r = n == null ? void 0 : n.events) === null || r === void 0 ? void 0 : r.length) > 0 &&
          ((a = n == null ? void 0 : n.events) === null || a === void 0 ? void 0 : a.length) <
            c.PointerConfig.instance.pointerParams.maxSnapshotsCount
        );
      }
      filterOldIndirectEvents() {
        const r = new Date().getTime();
        this.capturedIndirectEvents.set(
          this.capturedIndirectEvents.get().filter((a) => r - a.epochTs <= 36e5),
        );
      }
      filterOldMouseEvents() {
        const r = new Date().getTime();
        this.capturedMouseInteractions.set(
          this.capturedMouseInteractions.get().filter((a) => r - a.epochTs <= 36e5),
        );
      }
      filterOldKeyboardEvents() {
        const r = new Date().getTime();
        this.capturedKeyboardInteractions.set(
          this.capturedKeyboardInteractions.get().filter((a) => r - a.epochTs <= 36e5),
        );
      }
      filterOldGesturesEvents() {
        const r = new Date().getTime();
        this.capturedGestures.set(this.capturedGestures.get().filter((a) => r - a.epochTs <= 36e5));
      }
      incrementEventCounters(n, r) {
        const s = Date.now();
        let i;
        switch (r) {
          case 'mouse':
            i = this.mouseEventCounters;
            break;
          case 'keyboard':
            i = this.keyboardEventCounters;
            break;
          case 'touch':
            i = this.touchEventCounters;
            break;
          case 'indirect':
            i = this.indirectEventCounters;
            break;
        }
        i.set(i.get().filter((t) => s - t.epochTs <= 36e5)),
          i.length < this.MAX_EVENT_COUNTERS || i.remove(0),
          i.push(n);
      }
      reduceEpochEventCounters() {
        const n = { epochTs: Date.now() };
        return (
          [
            ...this.mouseEventCounters.get(),
            ...this.keyboardEventCounters.get(),
            ...this.touchEventCounters.get(),
            ...this.indirectEventCounters.get(),
          ].forEach((a) => {
            Object.keys(a).forEach((s) => {
              s !== 'epochTs' && (n[s] ? (n[s] += a[s]) : (n[s] = a[s]));
            });
          }),
          delete n.epochTs,
          n
        );
      }
    }
    c.Client = h;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  class _pingOneSignals {
    static getData() {
      return _POSignalsEntities.ClientBase.instance().getData();
    }
    static init(h) {
      return (
        _POSignalsEntities._POSignalsUtils.Util.ieFix(),
        _POSignalsEntities.ClientBase.instance().startSignals(h)
      );
    }
    static initSilent(h) {
      return this.init(h);
    }
    static pauseBehavioralData() {
      _POSignalsEntities.ClientBase.instance().pauseBehavioralData();
    }
    static resumeBehavioralData() {
      _POSignalsEntities.ClientBase.instance().resumeBehavioralData();
    }
  }
  const onDomReady = function (c) {
    document.readyState !== 'loading' ? c() : document.addEventListener('DOMContentLoaded', c);
  };
  onDomReady(function () {
    if (!window._pingOneSignalsReady) {
      const c = new CustomEvent('PingOneSignalsReadyEvent');
      document.dispatchEvent(c), (window._pingOneSignalsReady = !0);
    }
  });
  var _POSignalsEntities;
  (function (c) {
    let h;
    (function (n) {
      (n[(n.RICH = 3)] = 'RICH'),
        (n[(n.CLICK = 2)] = 'CLICK'),
        (n[(n.MOVE = 1)] = 'MOVE'),
        (n[(n.POOR = 0)] = 'POOR');
    })(h || (h = {}));
    class p {
      constructor(r, a, s, i, t, e) {
        (this.clientVersion = r),
          (this.instanceUUID = a),
          (this.initParams = s),
          (this.metadata = i),
          (this.behavioralDataHandler = t),
          (this.sessionData = e),
          (this.Max_Mouse_Touch_Interactions = 6);
      }
      async getData(r) {
        this.incrementGetData();
        const a = await this.getRiskData(r),
          s = a.tags.findIndex((i) => i.name === 'Get Data');
        return (
          s !== -1 ? (a.tags[s] = this._getDataCounter) : a.tags.push(this._getDataCounter),
          this.toString(a)
        );
      }
      async getRiskData(r) {
        const [a, s] = await Promise.all([
          this.metadata.getDeviceAttributes(),
          this.metadata.getLocalAgentJwt(),
        ]);
        let i = this.behavioralDataHandler.getBehavioralData();
        i = await this.modifyBehavioralData(i);
        const t = {
          behavioral: i,
          tags: c.Tags.instance.tags,
          sdkConfig: this.initParams,
          epochTs: r,
          instanceUUID: this.instanceUUID,
          tabUUID: c._POSignalsStorage.SessionStorage.instance.tabUUID,
          sdkVersion: this.clientVersion,
          platform: 'web',
          clientToken: window._pingOneSignalsToken,
        };
        let e;
        return (
          this.sessionData.universalTrustEnabled
            ? (e = { jwtDeviceAttributes: await this.getJWTSignedPayload(r, a.deviceId), ...t })
            : (e = { deviceAttributes: a, ...t }),
          this.sessionData.agentIdentificationEnabled && (e = { jwtAgentPayload: s, ...e }),
          e
        );
      }
      toString(r) {
        let a;
        const s = this.metadata.getObfsInfo();
        try {
          a = c._POSignalsUtils.Util.string2buf(JSON.stringify(r));
        } catch (i) {
          throw new Error(`Failed to create data, ${i.message}`);
        }
        try {
          a = c.pako.gzip(a);
        } catch (i) {
          throw new Error(`Failed to compress data, ${i.message}`);
        }
        try {
          a = c._POSignalsUtils.Util.encryptionBytes(a, s.key);
        } catch (i) {
          throw new Error(`failed to obfuscate data, ${i.message}`);
        }
        try {
          return `${c._POSignalsUtils.Util.base64Uint8Array(a)}.${btoa(s.identifier)}`;
        } catch (i) {
          throw new Error(`failed to encode data, ${i.message}`);
        }
      }
      async getJWTSignedPayload(r, a) {
        const s = this.metadata.getSerializedDeviceAttributes();
        return this.sessionData.signJWTChallenge(s, r, a);
      }
      async modifyBehavioralData(r) {
        return (
          (r.mouse.interactions = this.getBestMouseInteractions(r.mouse.interactions)),
          (r.touch.interactions = this.getBestTouchInteractions(
            r.touch.interactions,
            r.mouse.interactions,
          )),
          (r.keyboard.interactions = this.getBestKeyboardInteractions(r.keyboard.interactions)),
          r
        );
      }
      getBestInteractions(r) {
        const s = Date.now();
        c._POSignalsUtils.Logger.debug('total interactions:', r);
        const i = r.filter((o) => s - o.epochTs <= 18e4),
          t = this.sortInteractions(i).slice(0, 2),
          e = r.filter((o) => !t.some((x) => x.epochTs === o.epochTs)),
          l = this.sortInteractions(e).slice(0, 5 - t.length);
        return (
          c._POSignalsUtils.Logger.debug('final interactions for getData:', [...t, ...l]),
          [...t, ...l].sort((o, x) => o.epochTs - x.epochTs)
        );
      }
      getBestMouseInteractions(r) {
        return this.getBestInteractions(r);
      }
      getBestKeyboardInteractions(r) {
        return this.getBestInteractions(r);
      }
      getBestTouchInteractions(r, a) {
        const s = this.Max_Mouse_Touch_Interactions - a.length;
        return this.getTouchBestInteraction(r, s);
      }
      incrementGetData() {
        this._getDataCounter
          ? (this._getDataCounter.value++, (this._getDataCounter.timestamp = Date.now()))
          : (this._getDataCounter = {
              value: 1,
              name: 'Get Data',
              timestamp: Date.now(),
              epochTs: Date.now(),
            });
      }
      getTouchBestInteraction(r, a) {
        return (r = this.sortInteractions(r)), r.slice(0, a);
      }
      sortInteractions(r) {
        return r.sort((a, s) => {
          const i = h[a.quality],
            t = h[s.quality];
          return i === t ? s.epochTs - a.epochTs : t - i;
        });
      }
    }
    c.DataHandler = p;
  })(_POSignalsEntities || (_POSignalsEntities = {}));
  var _POSignalsEntities;
  (function (c) {
    class h {
      constructor() {
        this._configuration = {
          enabled: h.ENABLED_DEFAULT,
          bufferSize: h.BUFFER_SIZE_DEFAULT,
          maxSnapshotsCount: h.MAX_SNAPSHOTS_COUNT_DEFAULT,
          sensors: h.SENSORS_DEFAULT,
          metadataBlacklist: h.METADATA_BLACK_LIST_DEFAULT,
          tagsBlacklistRegex: h.TAGS_BLACK_LIST_REGEX_DEFAULT,
          behavioralBlacklist: h.BEHAVIORAL_BLACK_LIST_DEFAULT,
          webRtcUrl: h.WEB_RTC_URL_DEFAULT,
          eventsBlackList: h.EVENTS_BLACK_LIST_DEFAULT,
          eventsToIgnore: h.EVENTS_TO_IGNORE_DEFAULT,
          highPriorityIndirectEvents: h.HIGH_PRIORITY_INDIRECT_EVENTS_DEFAULT,
          indirectIntervalMillis: h.INDIRECT_INTERVAL_MILLIS_DEFAULT,
          mouseIntervalMillis: h.MOUSE_INTERVAL_MILLIS_DEFAULT,
          mouseIdleTimeoutMillis: h.MOUSE_IDLE_TIMEOUT_MILLIS_DEFAULT,
          maxMouseEvents: h.MAX_MOUSE_EVENTS_DEFAULT,
          maxIndirectEvents: h.MAX_INDIRECT_EVENTS_DEFAULT,
          keyboardFieldBlackList: h.KEYBOARD_FIELD_BLACK_LIST_DEFAULT,
          keyboardCssSelectors: h.KEYBOARD_CSS_SELECTORS_DEFAULT,
          keyboardCssSelectorsBlacklist: h.KEYBOARD_CSS_SELECTORS_BLACKLIST_DEFAULT,
          keyboardIdentifierAttributes: h.KEYBOARD_IDENTIFIER_ATTRIBUTES_DEFAULT,
          remoteTags: h.REMOTE_TAGS_DEFAULT,
          maxSelectorChildren: h.MAX_SELECTOR_CHILDREN_DEFAULT,
          eventsReduceFactorMap: h.EVENTS_REDUCE_FACTOR_MAP_DEFAULT,
          propertyDescriptors: h.PROPERTY_DESCRIPTORS_DEFAULT,
          additionalMediaCodecs: h.ADDITIONAL_MEDIA_CODECS_DEFAULT,
          fingerprintTimeoutMillis: h.FINGER_PRINT_TIMEOUT_MILLIS_DEFAULT,
          metadataDataPoints: h.METADATA_DATA_POINTS_DEFAULT,
          uiModeling: h.UI_MODELING_CONFIG_DEFAULT,
          uiControl: h.UI_CONTROL_LIST_DEFAULT,
        };
      }
      updateParams(n) {
        n && (this._configuration = n);
      }
      get enabled() {
        return typeof this._configuration.enabled == 'boolean'
          ? this._configuration.enabled
          : h.ENABLED_DEFAULT;
      }
      get bufferSize() {
        return typeof this._configuration.bufferSize == 'number' &&
          this._configuration.bufferSize > 0
          ? this._configuration.bufferSize
          : h.BUFFER_SIZE_DEFAULT;
      }
      get maxSnapshotsCount() {
        return typeof this._configuration.maxSnapshotsCount == 'number' &&
          this._configuration.maxSnapshotsCount >= 0
          ? this._configuration.maxSnapshotsCount
          : h.MAX_SNAPSHOTS_COUNT_DEFAULT;
      }
      get maxSensorSamples() {
        const n = this._configuration.sensors;
        return n && typeof n.maxSensorSamples == 'number' && n.maxSensorSamples >= 0
          ? n.maxSensorSamples
          : h.SENSORS_DEFAULT.maxSensorSamples;
      }
      get sensorsDeltaInMillis() {
        const n = this._configuration.sensors;
        return n && typeof n.sensorsDeltaInMillis == 'number' && n.sensorsDeltaInMillis >= 0
          ? n.sensorsDeltaInMillis
          : h.SENSORS_DEFAULT.sensorsDeltaInMillis;
      }
      get metadataBlackList() {
        var n;
        return c._POSignalsUtils.Util.isArray(this._configuration.metadataBlacklist) &&
          ((n = this._configuration.metadataBlacklist) === null || n === void 0
            ? void 0
            : n.length) > 0
          ? this._configuration.metadataBlacklist
          : h.METADATA_BLACK_LIST_DEFAULT;
      }
      get behavioralBlacklist() {
        return this._configuration.behavioralBlacklist
          ? this._configuration.behavioralBlacklist
          : h.BEHAVIORAL_BLACK_LIST_DEFAULT;
      }
      get tagsBlacklistRegex() {
        return typeof this._configuration.tagsBlacklistRegex == 'string'
          ? this._configuration.tagsBlacklistRegex
          : h.TAGS_BLACK_LIST_REGEX_DEFAULT;
      }
      get webRtcUrl() {
        return typeof this._configuration.webRtcUrl == 'string'
          ? this._configuration.webRtcUrl
          : h.WEB_RTC_URL_DEFAULT;
      }
      get eventsBlackList() {
        return (
          c._POSignalsUtils.Util.isArray(this._configuration.eventsBlackList) &&
            (this._configuration.eventsBlackList = new Set(this._configuration.eventsBlackList)),
          this._configuration.eventsBlackList instanceof Set
            ? this._configuration.eventsBlackList
            : h.EVENTS_BLACK_LIST_DEFAULT
        );
      }
      get eventsToIgnore() {
        return (
          c._POSignalsUtils.Util.isArray(this._configuration.eventsToIgnore) &&
            (this._configuration.eventsToIgnore = new Set(this._configuration.eventsToIgnore)),
          this._configuration.eventsToIgnore instanceof Set
            ? this._configuration.eventsToIgnore
            : h.EVENTS_TO_IGNORE_DEFAULT
        );
      }
      get highPriorityIndirectEvents() {
        return (
          c._POSignalsUtils.Util.isArray(this._configuration.highPriorityIndirectEvents) &&
            (this._configuration.highPriorityIndirectEvents = new Set(
              this._configuration.highPriorityIndirectEvents,
            )),
          this._configuration.highPriorityIndirectEvents instanceof Set
            ? this._configuration.highPriorityIndirectEvents
            : h.HIGH_PRIORITY_INDIRECT_EVENTS_DEFAULT
        );
      }
      get indirectIntervalMillis() {
        return typeof this._configuration.indirectIntervalMillis == 'number' &&
          this._configuration.indirectIntervalMillis > 0
          ? this._configuration.indirectIntervalMillis
          : h.INDIRECT_INTERVAL_MILLIS_DEFAULT;
      }
      get mouseIntervalMillis() {
        return typeof this._configuration.mouseIntervalMillis == 'number' &&
          this._configuration.mouseIntervalMillis > 0
          ? this._configuration.mouseIntervalMillis
          : h.MOUSE_INTERVAL_MILLIS_DEFAULT;
      }
      get mouseIdleTimeoutMillis() {
        return typeof this._configuration.mouseIdleTimeoutMillis == 'number' &&
          this._configuration.mouseIdleTimeoutMillis > 0
          ? this._configuration.mouseIdleTimeoutMillis
          : h.MOUSE_IDLE_TIMEOUT_MILLIS_DEFAULT;
      }
      get maxMouseEvents() {
        return typeof this._configuration.maxMouseEvents == 'number' &&
          this._configuration.maxMouseEvents >= 0
          ? this._configuration.maxMouseEvents
          : h.MAX_MOUSE_EVENTS_DEFAULT;
      }
      get maxIndirectEvents() {
        return typeof this._configuration.maxIndirectEvents == 'number' &&
          this._configuration.maxIndirectEvents >= 0
          ? this._configuration.maxIndirectEvents
          : h.MAX_INDIRECT_EVENTS_DEFAULT;
      }
      get keyboardFieldBlackList() {
        return (
          c._POSignalsUtils.Util.isArray(this._configuration.keyboardFieldBlackList) &&
            (this._configuration.keyboardFieldBlackList = new Set(
              this._configuration.keyboardFieldBlackList,
            )),
          this._configuration.keyboardFieldBlackList instanceof Set
            ? this._configuration.keyboardFieldBlackList
            : h.KEYBOARD_FIELD_BLACK_LIST_DEFAULT
        );
      }
      get keyboardCssSelectors() {
        return this._configuration.keyboardCssSelectors
          ? this._configuration.keyboardCssSelectors
          : h.KEYBOARD_CSS_SELECTORS_DEFAULT;
      }
      get keyboardCssSelectorsBlacklist() {
        return c._POSignalsUtils.Util.isArray(this._configuration.keyboardCssSelectorsBlacklist)
          ? this._configuration.keyboardCssSelectorsBlacklist
          : h.KEYBOARD_CSS_SELECTORS_BLACKLIST_DEFAULT;
      }
      get keyboardIdentifierAttributes() {
        return c._POSignalsUtils.Util.isArray(this._configuration.keyboardIdentifierAttributes)
          ? this._configuration.keyboardIdentifierAttributes
          : h.KEYBOARD_IDENTIFIER_ATTRIBUTES_DEFAULT;
      }
      get remoteTags() {
        return this._configuration.remoteTags
          ? this._configuration.remoteTags
          : h.REMOTE_TAGS_DEFAULT;
      }
      get maxSelectorChildren() {
        return typeof this._configuration.maxSelectorChildren == 'number' &&
          this._configuration.maxSelectorChildren > 0
          ? this._configuration.maxSelectorChildren
          : h.MAX_SELECTOR_CHILDREN_DEFAULT;
      }
      get eventsReduceFactorMap() {
        return this._configuration.eventsReduceFactorMap
          ? this._configuration.eventsReduceFactorMap
          : h.EVENTS_REDUCE_FACTOR_MAP_DEFAULT;
      }
      get propertyDescriptors() {
        return this._configuration.propertyDescriptors
          ? this._configuration.propertyDescriptors
          : h.PROPERTY_DESCRIPTORS_DEFAULT;
      }
      get additionalMediaCodecs() {
        return this._configuration.additionalMediaCodecs
          ? this._configuration.additionalMediaCodecs
          : h.ADDITIONAL_MEDIA_CODECS_DEFAULT;
      }
      get fingerprintTimeoutMillis() {
        return typeof this._configuration.fingerprintTimeoutMillis == 'number' &&
          this._configuration.fingerprintTimeoutMillis > 0
          ? this._configuration.fingerprintTimeoutMillis
          : h.FINGER_PRINT_TIMEOUT_MILLIS_DEFAULT;
      }
      get metadataDataPoints() {
        return this._configuration.metadataDataPoints
          ? this._configuration.metadataDataPoints
          : h.METADATA_DATA_POINTS_DEFAULT;
      }
      get uiModelingBlacklistRegex() {
        var n;
        return typeof ((n = this._configuration.uiModeling) === null || n === void 0
          ? void 0
          : n.blacklistRegex) == 'string'
          ? this._configuration.uiModeling.blacklistRegex
          : h.UI_MODELING_CONFIG_DEFAULT.blacklistRegex;
      }
      get uiModelingElementFilters() {
        var n;
        return !((n = this._configuration.uiModeling) === null || n === void 0) &&
          n.uiElementFilters
          ? this._configuration.uiModeling.uiElementFilters
          : h.UI_MODELING_CONFIG_DEFAULT.uiElementFilters;
      }
      get uiModelingMaxMatchingParents() {
        var n;
        return typeof ((n = this._configuration.uiModeling) === null || n === void 0
          ? void 0
          : n.maxMatchingParents) == 'number'
          ? this._configuration.uiModeling.maxMatchingParents
          : h.UI_MODELING_CONFIG_DEFAULT.maxMatchingParents;
      }
      get uiControlsConfig() {
        return c._POSignalsUtils.Util.isArray(this._configuration.uiControl)
          ? this._configuration.uiControl
          : h.UI_CONTROL_LIST_DEFAULT;
      }
    }
    (h.ENABLED_DEFAULT = !0),
      (h.BUFFER_SIZE_DEFAULT = 10),
      (h.MAX_SNAPSHOTS_COUNT_DEFAULT = 500),
      (h.METADATA_BLACK_LIST_DEFAULT = []),
      (h.TAGS_BLACK_LIST_REGEX_DEFAULT = ''),
      (h.BEHAVIORAL_BLACK_LIST_DEFAULT = {}),
      (h.WEB_RTC_URL_DEFAULT = ''),
      (h.EVENTS_BLACK_LIST_DEFAULT = new Set()),
      (h.EVENTS_TO_IGNORE_DEFAULT = new Set([
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
      (h.MAX_INDIRECT_EVENTS_DEFAULT = 15),
      (h.HIGH_PRIORITY_INDIRECT_EVENTS_DEFAULT = new Set([
        'copy',
        'cut',
        'paste',
        'resize',
        'orientationchange',
        'languagechange',
        'submit',
        'select',
      ])),
      (h.INDIRECT_INTERVAL_MILLIS_DEFAULT = 1e3),
      (h.MOUSE_INTERVAL_MILLIS_DEFAULT = 1e3),
      (h.MOUSE_IDLE_TIMEOUT_MILLIS_DEFAULT = 1e3),
      (h.MAX_MOUSE_EVENTS_DEFAULT = 500),
      (h.KEYBOARD_FIELD_BLACK_LIST_DEFAULT = new Set()),
      (h.KEYBOARD_CSS_SELECTORS_DEFAULT = {}),
      (h.KEYBOARD_CSS_SELECTORS_BLACKLIST_DEFAULT = []),
      (h.KEYBOARD_IDENTIFIER_ATTRIBUTES_DEFAULT = [
        'data-selenium',
        'data-selenium-id',
        'data-testid',
        'data-test-id',
        'data-qa-id',
        'data-id',
        'id',
      ]),
      (h.REMOTE_TAGS_DEFAULT = {
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
      (h.MAX_SELECTOR_CHILDREN_DEFAULT = 2),
      (h.EVENTS_REDUCE_FACTOR_MAP_DEFAULT = {}),
      (h.PROPERTY_DESCRIPTORS_DEFAULT = {
        chrome: ['app', 'csi', 'loadtimes', 'runtime'],
        navigator: ['webdriver'],
        Navigator: ['languages', 'hardwareConcurrency'],
        window: ['outerWidth', 'outerHeight'],
        Screen: ['width', 'height'],
      }),
      (h.ADDITIONAL_MEDIA_CODECS_DEFAULT = {}),
      (h.FINGER_PRINT_TIMEOUT_MILLIS_DEFAULT = 3e3),
      (h.METADATA_DATA_POINTS_DEFAULT = {}),
      (h.UI_CONTROL_LIST_DEFAULT = []),
      (h.UI_MODELING_CONFIG_DEFAULT = {
        blacklistRegex: '',
        uiElementFilters: { text: { maxLength: 25 }, placeholder: { maxLength: 25 } },
        maxMatchingParents: 2,
      }),
      (h.SENSORS_DEFAULT = { maxSensorSamples: 1, sensorsDeltaInMillis: 0 }),
      (c.PointerParams = h);
  })(_POSignalsEntities || (_POSignalsEntities = {})),
    (window._POSignalsEntities = _POSignalsEntities),
    (window._pingOneSignals = _pingOneSignals);
  /**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.9.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   */
  /*! modernizr 3.13.0 (Custom Build) | MIT *
   * https://modernizr.com/download/?-ambientlight-applicationcache-audio-batteryapi-blobconstructor-contextmenu-cors-cryptography-customelements-customevent-customprotocolhandler-dart-dataview-eventlistener-forcetouch-fullscreen-gamepads-geolocation-ie8compat-intl-json-ligatures-matchmedia-messagechannel-notification-pagevisibility-performance-pointerevents-pointerlock-queryselector-quotamanagement-requestanimationframe-serviceworker-touchevents-typedarrays-vibrate-video-webgl-websockets-xdomainrequest !*/
  //# sourceMappingURL=signals-sdk.js.map
}

// Ping Identity INC.
// Â© ALL RIGHTS RESERVED
//Wed Dec 24 2025 13:39:16 GMT+0000 (Coordinated Universal Time)
