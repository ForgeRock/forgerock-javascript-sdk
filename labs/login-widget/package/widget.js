var t = function () {
  return (
    (t =
      Object.assign ||
      function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++)
          for (var o in (e = arguments[n]))
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
      }),
    t.apply(this, arguments)
  );
};
var e,
  n = (function () {
    function e() {}
    return (
      (e.set = function (e) {
        if (!this.isValid(e)) throw new Error('Configuration is invalid');
        e.serverConfig && this.validateServerConfig(e.serverConfig),
          (this.options = t(
            {},
            (function (e) {
              return t(t({}, e), { oauthThreshold: e.oauthThreshold || 3e4 });
            })(e),
          ));
      }),
      (e.get = function (e) {
        if (!this.options && !e) throw new Error('Configuration has not been set');
        var n = t(t({}, this.options), e);
        if (!n.serverConfig || !n.serverConfig.baseUrl)
          throw new Error('Server configuration has not been set');
        return n;
      }),
      (e.isValid = function (t) {
        return !(!t || !t.serverConfig);
      }),
      (e.validateServerConfig = function (t) {
        t.timeout || (t.timeout = 6e4);
        var e = t.baseUrl;
        e && '/' !== e.charAt(e.length - 1) && (t.baseUrl = e + '/');
      }),
      e
    );
  })();
!(function (t) {
  (t.Authenticate = 'AUTHENTICATE'),
    (t.Authorize = 'AUTHORIZE'),
    (t.EndSession = 'END_SESSION'),
    (t.Logout = 'LOGOUT'),
    (t.ExchangeToken = 'EXCHANGE_TOKEN'),
    (t.RefreshToken = 'REFRESH_TOKEN'),
    (t.ResumeAuthenticate = 'RESUME_AUTHENTICATE'),
    (t.RevokeToken = 'REVOKE_TOKEN'),
    (t.StartAuthenticate = 'START_AUTHENTICATE'),
    (t.UserInfo = 'USER_INFO');
})(e || (e = {}));
function r(t, e) {
  void 0 === e && (e = 6e4);
  var n = e || 6e4,
    r = new Promise(function (t, e) {
      return window.setTimeout(function () {
        return e(new Error('Timeout'));
      }, n);
    });
  return Promise.race([t, r]);
}
var o = function (t, e, n) {
  if (n || 2 === arguments.length)
    for (var r, o = 0, i = e.length; o < i; o++)
      (!r && o in e) || (r || (r = Array.prototype.slice.call(e, 0, o)), (r[o] = e[o]));
  return t.concat(r || Array.prototype.slice.call(e));
};
function i(t) {
  var e =
    ('http:' === t.protocol && -1 === ['', '80'].indexOf(t.port)) ||
    ('https:' === t.protocol && -1 === ['', '443'].indexOf(t.port))
      ? ':'.concat(t.port)
      : '';
  return ''.concat(t.protocol, '//').concat(t.hostname).concat(e);
}
function a(t, e, n) {
  var r = (function (t) {
      var e = (t || '')
        .split('/')
        .map(function (t) {
          return t.trim();
        })
        .filter(function (t) {
          return '' !== t;
        });
      return (
        'root' !== e[0] && e.unshift('root'),
        e
          .map(function (t) {
            return 'realms/'.concat(t);
          })
          .join('/')
      );
    })(e),
    o = {
      authenticate: 'json/'.concat(r, '/authenticate'),
      authorize: 'oauth2/'.concat(r, '/authorize'),
      accessToken: 'oauth2/'.concat(r, '/access_token'),
      endSession: 'oauth2/'.concat(r, '/connect/endSession'),
      userInfo: 'oauth2/'.concat(r, '/userinfo'),
      revoke: 'oauth2/'.concat(r, '/token/revoke'),
      sessions: 'json/'.concat(r, '/sessions/'),
    };
  return n && n[t] ? n[t] : o[t];
}
function c(t, e) {
  var n = new URL(t);
  if (e.startsWith('/')) return ''.concat(i(n)).concat(e);
  var r = n.pathname.split('/'),
    a = e.split('/').filter(function (t) {
      return !!t;
    }),
    c = o(o([], r.slice(0, -1), !0), a, !0).join('/');
  return ''.concat(i(n)).concat(c);
}
function u(t) {
  var e = [];
  for (var n in t) t[n] && e.push(n + '=' + encodeURIComponent(t[n]));
  return e.join('&');
}
function s(t, e) {
  var n = e.type,
    r = e.payload,
    o = Object.freeze({ type: n, payload: r });
  return function (e) {
    if (!Array.isArray(e)) return t;
    var n = e.map(function (t) {
      return t;
    });
    return (function e() {
      var r = n.shift();
      return r && r(t, o, e), t;
    })();
  };
}
var l,
  f,
  p = function () {
    return (
      (p =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      p.apply(this, arguments)
    );
  },
  d = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  h = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  y = (function () {
    function t() {}
    return (
      (t.next = function (t, o) {
        return d(this, void 0, void 0, function () {
          var i, a, c, u, l, f, p, d, y, v, g;
          return h(this, function (h) {
            switch (h.label) {
              case 0:
                return (
                  (i = n.get(o)),
                  (a = i.middleware),
                  (c = i.realmPath),
                  (u = i.serverConfig),
                  (l = i.tree),
                  (f = i.type),
                  (p = o ? o.query : {}),
                  (d = this.constructUrl(u, c, l, p)),
                  (y = s(
                    { url: new URL(d), init: this.configureRequest(t) },
                    {
                      type: t ? e.Authenticate : e.StartAuthenticate,
                      payload: { tree: l, type: f || 'service' },
                    },
                  )),
                  (v = y(a)),
                  [4, r(fetch(v.url.toString(), v.init), u.timeout)]
                );
              case 1:
                return (g = h.sent()), [4, this.getResponseJson(g)];
              case 2:
                return [2, h.sent()];
            }
          });
        });
      }),
      (t.constructUrl = function (t, e, n, r) {
        var o = n ? { authIndexType: 'service', authIndexValue: n } : void 0,
          i = p(p({}, r), o),
          s = Object.keys(i).length > 0 ? '?'.concat(u(i)) : '',
          l = a('authenticate', e, t.paths);
        return c(t.baseUrl, ''.concat(l).concat(s));
      }),
      (t.configureRequest = function (t) {
        return {
          body: t ? JSON.stringify(t) : void 0,
          credentials: 'include',
          headers: new Headers({
            accept: 'application/json',
            'accept-api-version': 'protocol=1.0,resource=2.1',
            'content-type': 'application/json',
            'x-requested-with': 'forgerock-sdk',
          }),
          method: 'POST',
        };
      }),
      (t.getResponseJson = function (t) {
        return d(this, void 0, void 0, function () {
          var e, n, r;
          return h(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (e = t.headers.get('content-type')),
                  e && e.indexOf('application/json') > -1 ? [4, t.json()] : [3, 2]
                );
              case 1:
                return (r = o.sent()), [3, 3];
              case 2:
                (r = {}), (o.label = 3);
              case 3:
                return ((n = r).status = t.status), (n.ok = t.ok), [2, n];
            }
          });
        });
      }),
      t
    );
  })();
!(function (t) {
  (t.BadRequest = 'BAD_REQUEST'),
    (t.Timeout = 'TIMEOUT'),
    (t.Unauthorized = 'UNAUTHORIZED'),
    (t.Unknown = 'UNKNOWN');
})(l || (l = {})),
  (function (t) {
    (t.BooleanAttributeInputCallback = 'BooleanAttributeInputCallback'),
      (t.ChoiceCallback = 'ChoiceCallback'),
      (t.ConfirmationCallback = 'ConfirmationCallback'),
      (t.DeviceProfileCallback = 'DeviceProfileCallback'),
      (t.HiddenValueCallback = 'HiddenValueCallback'),
      (t.KbaCreateCallback = 'KbaCreateCallback'),
      (t.MetadataCallback = 'MetadataCallback'),
      (t.NameCallback = 'NameCallback'),
      (t.NumberAttributeInputCallback = 'NumberAttributeInputCallback'),
      (t.PasswordCallback = 'PasswordCallback'),
      (t.PollingWaitCallback = 'PollingWaitCallback'),
      (t.ReCaptchaCallback = 'ReCaptchaCallback'),
      (t.RedirectCallback = 'RedirectCallback'),
      (t.SelectIdPCallback = 'SelectIdPCallback'),
      (t.StringAttributeInputCallback = 'StringAttributeInputCallback'),
      (t.SuspendedTextOutputCallback = 'SuspendedTextOutputCallback'),
      (t.TermsAndConditionsCallback = 'TermsAndConditionsCallback'),
      (t.TextOutputCallback = 'TextOutputCallback'),
      (t.ValidatedCreatePasswordCallback = 'ValidatedCreatePasswordCallback'),
      (t.ValidatedCreateUsernameCallback = 'ValidatedCreateUsernameCallback');
  })(f || (f = {}));
var v,
  g,
  w = (function () {
    function t() {
      this.callbacks = {};
    }
    return (
      (t.prototype.addEventListener = function (t, e) {
        !(function (t, e, n) {
          (t[e] = t[e] || []), t[e].indexOf(n) < 0 && t[e].push(n);
        })(this.callbacks, t, e);
      }),
      (t.prototype.removeEventListener = function (t, e) {
        !(function (t, e, n) {
          if (t[e]) {
            var r = t[e].indexOf(n);
            r >= 0 && t[e].splice(r, 1);
          }
        })(this.callbacks, t, e);
      }),
      (t.prototype.clearEventListeners = function (t) {
        !(function (t, e) {
          Object.keys(t).forEach(function (n) {
            (e && n !== e) || delete t[n];
          });
        })(this.callbacks, t);
      }),
      (t.prototype.dispatchEvent = function (t) {
        if (this.callbacks[t.type])
          for (var e = 0, n = this.callbacks[t.type]; e < n.length; e++) {
            (0, n[e])(t);
          }
      }),
      t
    );
  })();
function b(t, e, n) {
  return 1 === t ? e : void 0 !== n ? n : e + 's';
}
function m(t, e, n) {
  return t && void 0 !== t[e] ? t[e] : n;
}
!(function (t) {
  (t.CannotContainCharacters = 'CANNOT_CONTAIN_CHARACTERS'),
    (t.CannotContainDuplicates = 'CANNOT_CONTAIN_DUPLICATES'),
    (t.CannotContainOthers = 'CANNOT_CONTAIN_OTHERS'),
    (t.LeastCapitalLetters = 'AT_LEAST_X_CAPITAL_LETTERS'),
    (t.LeastNumbers = 'AT_LEAST_X_NUMBERS'),
    (t.MatchRegexp = 'MATCH_REGEXP'),
    (t.MaximumLength = 'MAX_LENGTH'),
    (t.MaximumNumber = 'MAXIMUM_NUMBER_VALUE'),
    (t.MinimumLength = 'MIN_LENGTH'),
    (t.MinimumNumber = 'MINIMUM_NUMBER_VALUE'),
    (t.Required = 'REQUIRED'),
    (t.Unique = 'UNIQUE'),
    (t.UnknownPolicy = 'UNKNOWN_POLICY'),
    (t.ValidArrayItems = 'VALID_ARRAY_ITEMS'),
    (t.ValidDate = 'VALID_DATE'),
    (t.ValidEmailAddress = 'VALID_EMAIL_ADDRESS_FORMAT'),
    (t.ValidNameFormat = 'VALID_NAME_FORMAT'),
    (t.ValidNumber = 'VALID_NUMBER'),
    (t.ValidPhoneFormat = 'VALID_PHONE_FORMAT'),
    (t.ValidQueryFilter = 'VALID_QUERY_FILTER'),
    (t.ValidType = 'VALID_TYPE');
})(v || (v = {}));
var k,
  C =
    (((g = {})[v.CannotContainCharacters] = function (t, e) {
      var n = m(e, 'forbiddenChars', '');
      return ''.concat(t, ' must not contain following characters: "').concat(n, '"');
    }),
    (g[v.CannotContainDuplicates] = function (t, e) {
      var n = m(e, 'duplicateValue', '');
      return ''.concat(t, '  must not contain duplicates: "').concat(n, '"');
    }),
    (g[v.CannotContainOthers] = function (t, e) {
      var n = m(e, 'disallowedFields', '');
      return ''.concat(t, ' must not contain: "').concat(n, '"');
    }),
    (g[v.LeastCapitalLetters] = function (t, e) {
      var n = m(e, 'numCaps', 0);
      return ''.concat(t, ' must contain at least ').concat(n, ' capital ').concat(b(n, 'letter'));
    }),
    (g[v.LeastNumbers] = function (t, e) {
      var n = m(e, 'numNums', 0);
      return ''.concat(t, ' must contain at least ').concat(n, ' numeric ').concat(b(n, 'value'));
    }),
    (g[v.MatchRegexp] = function (t) {
      return ''.concat(t, ' has failed the "MATCH_REGEXP" policy');
    }),
    (g[v.MaximumLength] = function (t, e) {
      var n = m(e, 'maxLength', 0);
      return ''.concat(t, ' must be at most ').concat(n, ' ').concat(b(n, 'character'));
    }),
    (g[v.MaximumNumber] = function (t) {
      return ''.concat(t, ' has failed the "MAXIMUM_NUMBER_VALUE" policy');
    }),
    (g[v.MinimumLength] = function (t, e) {
      var n = m(e, 'minLength', 0);
      return ''.concat(t, ' must be at least ').concat(n, ' ').concat(b(n, 'character'));
    }),
    (g[v.MinimumNumber] = function (t) {
      return ''.concat(t, ' has failed the "MINIMUM_NUMBER_VALUE" policy');
    }),
    (g[v.Required] = function (t) {
      return ''.concat(t, ' is required');
    }),
    (g[v.Unique] = function (t) {
      return ''.concat(t, ' must be unique');
    }),
    (g[v.UnknownPolicy] = function (t, e) {
      var n = m(e, 'policyRequirement', 'Unknown');
      return ''.concat(t, ': Unknown policy requirement "').concat(n, '"');
    }),
    (g[v.ValidArrayItems] = function (t) {
      return ''.concat(t, ' has failed the "VALID_ARRAY_ITEMS" policy');
    }),
    (g[v.ValidDate] = function (t) {
      return ''.concat(t, ' has an invalid date');
    }),
    (g[v.ValidEmailAddress] = function (t) {
      return ''.concat(t, ' has an invalid email address');
    }),
    (g[v.ValidNameFormat] = function (t) {
      return ''.concat(t, ' has an invalid name format');
    }),
    (g[v.ValidNumber] = function (t) {
      return ''.concat(t, ' has an invalid number');
    }),
    (g[v.ValidPhoneFormat] = function (t) {
      return ''.concat(t, ' has an invalid phone number');
    }),
    (g[v.ValidQueryFilter] = function (t) {
      return ''.concat(t, ' has failed the "VALID_QUERY_FILTER" policy');
    }),
    (g[v.ValidType] = function (t) {
      return ''.concat(t, ' has failed the "VALID_TYPE" policy');
    }),
    g),
  _ = function () {
    return (
      (_ =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      _.apply(this, arguments)
    );
  },
  O = (function () {
    function t() {}
    return (
      (t.parseErrors = function (t, e) {
        var n = this,
          r = [];
        return (
          t.detail &&
            t.detail.failedPolicyRequirements &&
            t.detail.failedPolicyRequirements.map(function (t) {
              r.push.apply(r, [{ detail: t, messages: n.parseFailedPolicyRequirement(t, e) }]);
            }),
          r
        );
      }),
      (t.parseFailedPolicyRequirement = function (t, e) {
        var n = this,
          r = [];
        return (
          t.policyRequirements.map(function (o) {
            r.push(n.parsePolicyRequirement(t.property, o, e));
          }),
          r
        );
      }),
      (t.parsePolicyRequirement = function (t, e, n) {
        void 0 === n && (n = {});
        var r = 'string' == typeof e ? JSON.parse(e) : _({}, e),
          o = r.policyRequirement;
        return (n[o] || C[o] || C[v.UnknownPolicy])(
          t,
          r.params ? _(_({}, r.params), { policyRequirement: o }) : { policyRequirement: o },
        );
      }),
      t
    );
  })();
!(function (t) {
  (t.LoginFailure = 'LoginFailure'), (t.LoginSuccess = 'LoginSuccess'), (t.Step = 'Step');
})(k || (k = {}));
var S,
  T = (function () {
    function t(t) {
      (this.payload = t), (this.type = k.LoginFailure);
    }
    return (
      (t.prototype.getCode = function () {
        return Number(this.payload.code);
      }),
      (t.prototype.getDetail = function () {
        return this.payload.detail;
      }),
      (t.prototype.getMessage = function () {
        return this.payload.message;
      }),
      (t.prototype.getProcessedMessage = function (t) {
        return O.parseErrors(this.payload, t);
      }),
      (t.prototype.getReason = function () {
        return this.payload.reason;
      }),
      t
    );
  })(),
  x = (function () {
    function t(t) {
      (this.payload = t), (this.type = k.LoginSuccess);
    }
    return (
      (t.prototype.getRealm = function () {
        return this.payload.realm;
      }),
      (t.prototype.getSessionToken = function () {
        return this.payload.tokenId;
      }),
      (t.prototype.getSuccessUrl = function () {
        return this.payload.successUrl;
      }),
      t
    );
  })(),
  E = (function () {
    function t(t) {
      this.payload = t;
    }
    return (
      (t.prototype.getType = function () {
        return this.payload.type;
      }),
      (t.prototype.getInputValue = function (t) {
        return void 0 === t && (t = 0), this.getArrayElement(this.payload.input, t).value;
      }),
      (t.prototype.setInputValue = function (t, e) {
        void 0 === e && (e = 0), (this.getArrayElement(this.payload.input, e).value = t);
      }),
      (t.prototype.getOutputValue = function (t) {
        return void 0 === t && (t = 0), this.getArrayElement(this.payload.output, t).value;
      }),
      (t.prototype.getOutputByName = function (t, e) {
        var n = this.payload.output.find(function (e) {
          return e.name === t;
        });
        return n ? n.value : e;
      }),
      (t.prototype.getArrayElement = function (t, e) {
        if ((void 0 === e && (e = 0), void 0 === t))
          throw new Error('No NameValue array was provided to search (selector '.concat(e, ')'));
        if ('number' == typeof e) {
          if (e < 0 || e > t.length - 1)
            throw new Error('Selector index '.concat(e, ' is out of range'));
          return t[e];
        }
        if ('string' == typeof e) {
          if (
            !(n = t.find(function (t) {
              return t.name === e;
            }))
          )
            throw new Error('Missing callback input entry "'.concat(e, '"'));
          return n;
        }
        if ('object' == typeof e && e.test && e.exec) {
          var n;
          if (
            !(n = t.find(function (t) {
              return e.test(t.name);
            }))
          )
            throw new Error('Missing callback input entry "'.concat(e, '"'));
          return n;
        }
        throw new Error('Invalid selector value type');
      }),
      t
    );
  })(),
  A =
    ((S = function (t, e) {
      return (
        (S =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        S(t, e)
      );
    }),
    function (t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
      function n() {
        this.constructor = t;
      }
      S(t, e),
        (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
    }),
  P = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      A(e, t),
      (e.prototype.getName = function () {
        return this.getOutputByName('name', '');
      }),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.isRequired = function () {
        return this.getOutputByName('required', !1);
      }),
      (e.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
      }),
      (e.prototype.getPolicies = function () {
        return this.getOutputByName('policies', {});
      }),
      (e.prototype.setValidateOnly = function (t) {
        this.setInputValue(t, /validateOnly/);
      }),
      (e.prototype.setValue = function (t) {
        this.setInputValue(t);
      }),
      e
    );
  })(E),
  N = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  I = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      N(e, t),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.getDefaultChoice = function () {
        return this.getOutputByName('defaultChoice', 0);
      }),
      (e.prototype.getChoices = function () {
        return this.getOutputByName('choices', []);
      }),
      (e.prototype.setChoiceIndex = function (t) {
        var e = this.getChoices().length;
        if (t < 0 || t > e - 1) throw new Error(''.concat(t, ' is out of bounds'));
        this.setInputValue(t);
      }),
      (e.prototype.setChoiceValue = function (t) {
        var e = this.getChoices().indexOf(t);
        if (-1 === e) throw new Error('"'.concat(t, '" is not a valid choice'));
        this.setInputValue(e);
      }),
      e
    );
  })(E),
  j = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  R = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      j(e, t),
      (e.prototype.getDefaultOption = function () {
        return Number(this.getOutputByName('defaultOption', 0));
      }),
      (e.prototype.getMessageType = function () {
        return Number(this.getOutputByName('messageType', 0));
      }),
      (e.prototype.getOptions = function () {
        return this.getOutputByName('options', []);
      }),
      (e.prototype.getOptionType = function () {
        return Number(this.getOutputByName('optionType', 0));
      }),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.setOptionIndex = function (t) {
        if (0 !== t && 1 !== t) throw new Error('"'.concat(t, '" is not a valid choice'));
        this.setInputValue(t);
      }),
      (e.prototype.setOptionValue = function (t) {
        var e = this.getOptions().indexOf(t);
        if (-1 === e) throw new Error('"'.concat(t, '" is not a valid choice'));
        this.setInputValue(e);
      }),
      e
    );
  })(E),
  U = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  V = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      U(e, t),
      (e.prototype.getMessage = function () {
        return this.getOutputByName('message', '');
      }),
      (e.prototype.isMetadataRequired = function () {
        return this.getOutputByName('metadata', !1);
      }),
      (e.prototype.isLocationRequired = function () {
        return this.getOutputByName('location', !1);
      }),
      (e.prototype.setProfile = function (t) {
        this.setInputValue(JSON.stringify(t));
      }),
      e
    );
  })(E),
  B = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  L = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return B(e, t), e;
  })(E),
  M = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  $ = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      M(e, t),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.getPredefinedQuestions = function () {
        return this.getOutputByName('predefinedQuestions', []);
      }),
      (e.prototype.setQuestion = function (t) {
        this.setValue('question', t);
      }),
      (e.prototype.setAnswer = function (t) {
        this.setValue('answer', t);
      }),
      (e.prototype.setValue = function (t, e) {
        if (!this.payload.input) throw new Error('KBA payload is missing input');
        var n = this.payload.input.find(function (e) {
          return e.name.endsWith(t);
        });
        if (!n) throw new Error('No input has name ending in "'.concat(t, '"'));
        n.value = e;
      }),
      e
    );
  })(E),
  q = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  D = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      q(e, t),
      (e.prototype.getData = function () {
        return this.getOutputByName('data', {});
      }),
      e
    );
  })(E),
  z = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  F = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      z(e, t),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.setName = function (t) {
        this.setInputValue(t);
      }),
      e
    );
  })(E),
  H = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  G = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      H(e, t),
      (e.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
      }),
      (e.prototype.getPolicies = function () {
        return this.getOutputByName('policies', []);
      }),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.setPassword = function (t) {
        this.setInputValue(t);
      }),
      e
    );
  })(E),
  K = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  W = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      K(e, t),
      (e.prototype.getMessage = function () {
        return this.getOutputByName('message', '');
      }),
      (e.prototype.getWaitTime = function () {
        return Number(this.getOutputByName('waitTime', 0));
      }),
      e
    );
  })(E),
  J = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  Q = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      J(e, t),
      (e.prototype.getSiteKey = function () {
        return this.getOutputByName('recaptchaSiteKey', '');
      }),
      (e.prototype.setResult = function (t) {
        this.setInputValue(t);
      }),
      e
    );
  })(E),
  X = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  Y = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      X(e, t),
      (e.prototype.getRedirectUrl = function () {
        return this.getOutputByName('redirectUrl', '');
      }),
      e
    );
  })(E),
  Z = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  tt = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      Z(e, t),
      (e.prototype.getProviders = function () {
        return this.getOutputByName('providers', []);
      }),
      (e.prototype.setProvider = function (t) {
        var e = this.getProviders().find(function (e) {
          return e.provider === t;
        });
        if (!e) throw new Error('"'.concat(t, '" is not a valid choice'));
        this.setInputValue(e.provider);
      }),
      e
    );
  })(E),
  et = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  nt = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      et(e, t),
      (e.prototype.getMessage = function () {
        return this.getOutputByName('message', '');
      }),
      (e.prototype.getMessageType = function () {
        return this.getOutputByName('messageType', '');
      }),
      e
    );
  })(E),
  rt = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  ot = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return rt(e, t), e;
  })(nt),
  it = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  at = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      it(e, t),
      (e.prototype.getTerms = function () {
        return this.getOutputByName('terms', '');
      }),
      (e.prototype.getVersion = function () {
        return this.getOutputByName('version', '');
      }),
      (e.prototype.getCreateDate = function () {
        var t = this.getOutputByName('createDate', '');
        return new Date(t);
      }),
      (e.prototype.setAccepted = function (t) {
        void 0 === t && (t = !0), this.setInputValue(t);
      }),
      e
    );
  })(E),
  ct = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  ut = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      ct(e, t),
      (e.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
      }),
      (e.prototype.getPolicies = function () {
        return this.getOutputByName('policies', {});
      }),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.isRequired = function () {
        return this.getOutputByName('required', !1);
      }),
      (e.prototype.setPassword = function (t) {
        this.setInputValue(t);
      }),
      (e.prototype.setValidateOnly = function (t) {
        this.setInputValue(t, /validateOnly/);
      }),
      e
    );
  })(E),
  st = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  lt = (function (t) {
    function e(e) {
      var n = t.call(this, e) || this;
      return (n.payload = e), n;
    }
    return (
      st(e, t),
      (e.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
      }),
      (e.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
      }),
      (e.prototype.getPolicies = function () {
        return this.getOutputByName('policies', {});
      }),
      (e.prototype.isRequired = function () {
        return this.getOutputByName('required', !1);
      }),
      (e.prototype.setName = function (t) {
        this.setInputValue(t);
      }),
      (e.prototype.setValidateOnly = function (t) {
        this.setInputValue(t, /validateOnly/);
      }),
      e
    );
  })(E);
function ft(t) {
  switch (t.type) {
    case f.BooleanAttributeInputCallback:
      return new P(t);
    case f.ChoiceCallback:
      return new I(t);
    case f.ConfirmationCallback:
      return new R(t);
    case f.DeviceProfileCallback:
      return new V(t);
    case f.HiddenValueCallback:
      return new L(t);
    case f.KbaCreateCallback:
      return new $(t);
    case f.MetadataCallback:
      return new D(t);
    case f.NameCallback:
      return new F(t);
    case f.NumberAttributeInputCallback:
      return new P(t);
    case f.PasswordCallback:
      return new G(t);
    case f.PollingWaitCallback:
      return new W(t);
    case f.ReCaptchaCallback:
      return new Q(t);
    case f.RedirectCallback:
      return new Y(t);
    case f.SelectIdPCallback:
      return new tt(t);
    case f.StringAttributeInputCallback:
      return new P(t);
    case f.SuspendedTextOutputCallback:
      return new ot(t);
    case f.TermsAndConditionsCallback:
      return new at(t);
    case f.TextOutputCallback:
      return new nt(t);
    case f.ValidatedCreatePasswordCallback:
      return new ut(t);
    case f.ValidatedCreateUsernameCallback:
      return new lt(t);
    default:
      return new E(t);
  }
}
var pt = (function () {
    function t(t, e) {
      (this.payload = t),
        (this.type = k.Step),
        (this.callbacks = []),
        t.callbacks && (this.callbacks = this.convertCallbacks(t.callbacks, e));
    }
    return (
      (t.prototype.getCallbackOfType = function (t) {
        var e = this.getCallbacksOfType(t);
        if (1 !== e.length)
          throw new Error(
            'Expected 1 callback of type "'.concat(t, '", but found ').concat(e.length),
          );
        return e[0];
      }),
      (t.prototype.getCallbacksOfType = function (t) {
        return this.callbacks.filter(function (e) {
          return e.getType() === t;
        });
      }),
      (t.prototype.setCallbackValue = function (t, e) {
        var n = this.getCallbacksOfType(t);
        if (1 !== n.length)
          throw new Error(
            'Expected 1 callback of type "'.concat(t, '", but found ').concat(n.length),
          );
        n[0].setInputValue(e);
      }),
      (t.prototype.getDescription = function () {
        return this.payload.description;
      }),
      (t.prototype.getHeader = function () {
        return this.payload.header;
      }),
      (t.prototype.getStage = function () {
        return this.payload.stage;
      }),
      (t.prototype.convertCallbacks = function (t, e) {
        return t.map(function (t) {
          return (e || ft)(t) || ft(t);
        });
      }),
      t
    );
  })(),
  dt = function () {
    return (
      (dt =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      dt.apply(this, arguments)
    );
  },
  ht = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  yt = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  vt = (function () {
    function t() {}
    return (
      (t.next = function (t, e) {
        return ht(this, void 0, void 0, function () {
          var n, r;
          return yt(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, y.next(t ? t.payload : void 0, e)];
              case 1:
                return (n = o.sent()).authId
                  ? ((r = e ? e.callbackFactory : void 0), [2, new pt(n, r)])
                  : !n.authId && n.ok
                  ? [2, new x(n)]
                  : [2, new T(n)];
            }
          });
        });
      }),
      (t.redirect = function (t) {
        var e = t.getCallbackOfType(f.RedirectCallback).getRedirectUrl();
        window.localStorage.setItem(this.previousStepKey, JSON.stringify(t)),
          window.location.assign(e);
      }),
      (t.resume = function (t, e) {
        return ht(this, void 0, void 0, function () {
          var n, r, o, i, a, c, u, s, l, f;
          return yt(this, function (p) {
            switch (p.label) {
              case 0:
                if (
                  ((n = new URL(t)),
                  (r = n.searchParams.get('code')),
                  (o = n.searchParams.get('form_post_entry')),
                  (i = n.searchParams.get('nonce')),
                  (a = n.searchParams.get('scope')),
                  (c = n.searchParams.get('state')),
                  (u = n.searchParams.get('suspendedId')),
                  (r && c) || o)
                ) {
                  if (!(l = window.localStorage.getItem(this.previousStepKey)))
                    throw new Error('Error: could not retrieve original redirect information.');
                  try {
                    s = JSON.parse(l);
                  } catch (t) {
                    throw new Error('Error: could not parse redirect params or step information');
                  }
                  window.localStorage.removeItem(this.previousStepKey);
                }
                return (
                  (f = dt(dt({}, e), {
                    query: dt(
                      dt(
                        dt(
                          dt(
                            dt(
                              dt(dt({}, e && e.query), r && { code: r }),
                              o && { form_post_entry: o },
                            ),
                            i && { nonce: i },
                          ),
                          a && { scope: a },
                        ),
                        c && { state: c },
                      ),
                      u && { suspendedId: u },
                    ),
                  })),
                  [4, this.next(s, f)]
                );
              case 1:
                return [2, p.sent()];
            }
          });
        });
      }),
      (t.start = function (e) {
        return ht(this, void 0, void 0, function () {
          return yt(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, t.next(void 0, e)];
              case 1:
                return [2, n.sent()];
            }
          });
        });
      }),
      (t.previousStepKey = 'FRAuth_PreviousStep'),
      t
    );
  })(),
  gt = [
    'userAgent',
    'appName',
    'appCodeName',
    'appVersion',
    'appMinorVersion',
    'buildID',
    'product',
    'productSub',
    'vendor',
    'vendorSub',
    'browserLanguage',
  ],
  wt = ['fontNames', 'displayProps', 'browserProps', 'hardwareProps', 'platformProps'],
  bt = {
    mac: ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windows: ['Win32', 'Win64', 'Windows', 'WinCE'],
    ios: ['iPhone', 'iPad', 'iPod'],
  },
  mt = ['width', 'height', 'pixelDepth', 'orientation.angle'],
  kt = [
    'cursive',
    'monospace',
    'serif',
    'sans-serif',
    'fantasy',
    'Arial',
    'Arial Black',
    'Arial Narrow',
    'Arial Rounded MT Bold',
    'Bookman Old Style',
    'Bradley Hand ITC',
    'Century',
    'Century Gothic',
    'Comic Sans MS',
    'Courier',
    'Courier New',
    'Georgia',
    'Gentium',
    'Impact',
    'King',
    'Lucida Console',
    'Lalit',
    'Modena',
    'Monotype Corsiva',
    'Papyrus',
    'Tahoma',
    'TeX',
    'Times',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Verona',
  ],
  Ct = ['cpuClass', 'deviceMemory', 'hardwareConcurrency', 'maxTouchPoints', 'oscpu'],
  _t = ['language', 'platform', 'userLanguage', 'systemLanguage'],
  Ot = (function () {
    function t() {}
    return (
      (t.prototype.reduceToObject = function (t, e) {
        return t.reduce(function (t, n) {
          if (n.includes('.')) {
            var r = n.split('.'),
              o = r[0],
              i = r[1],
              a = e[o] && e[o][i];
            t[i] = null != a ? a : '';
          } else t[n] = null != e[n] ? e[n] : null;
          return t;
        }, {});
      }),
      (t.prototype.reduceToString = function (t, e) {
        return t.reduce(function (t, n) {
          return (t = ''.concat(t).concat(e[n].filename, ';'));
        }, '');
      }),
      t
    );
  })(),
  St = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  Tt = function () {
    return (
      (Tt =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      Tt.apply(this, arguments)
    );
  },
  xt = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Et = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  };
!(function (t) {
  function e(e) {
    var n = t.call(this) || this;
    return (
      (n.config = {
        fontNames: kt,
        devicePlatforms: bt,
        displayProps: mt,
        browserProps: gt,
        hardwareProps: Ct,
        platformProps: _t,
      }),
      e &&
        Object.keys(e).forEach(function (t) {
          if (!wt.includes(t))
            throw new Error('Device profile configuration category does not exist.');
          n.config[t] = e[t];
        }),
      n
    );
  }
  St(e, t),
    (e.prototype.getBrowserMeta = function () {
      return navigator
        ? this.reduceToObject(this.config.browserProps, navigator)
        : (console.warn('Cannot collect browser metadata. navigator is not defined.'), {});
    }),
    (e.prototype.getBrowserPluginsNames = function () {
      return navigator && navigator.plugins
        ? this.reduceToString(Object.keys(navigator.plugins), navigator.plugins)
        : (console.warn(
            'Cannot collect browser plugin information. navigator.plugins is not defined.',
          ),
          '');
    }),
    (e.prototype.getDeviceName = function () {
      if (!navigator)
        return console.warn('Cannot collect device name. navigator is not defined.'), '';
      var t = navigator.userAgent,
        e = navigator.platform;
      switch (!0) {
        case this.config.devicePlatforms.mac.includes(e):
          return 'Mac (Browser)';
        case this.config.devicePlatforms.ios.includes(e):
          return ''.concat(e, ' (Browser)');
        case this.config.devicePlatforms.windows.includes(e):
          return 'Windows (Browser)';
        case /Android/.test(e) || /Android/.test(t):
          return 'Android (Browser)';
        case /CrOS/.test(t) || /Chromebook/.test(t):
          return 'Chrome OS (Browser)';
        case /Linux/.test(e):
          return 'Linux (Browser)';
        default:
          return ''.concat(e || 'Unknown', ' (Browser)');
      }
    }),
    (e.prototype.getDisplayMeta = function () {
      return (
        screen || console.warn('Cannot collect screen information. screen is not defined.'),
        this.reduceToObject(this.config.displayProps, screen)
      );
    }),
    (e.prototype.getHardwareMeta = function () {
      return navigator
        ? this.reduceToObject(this.config.hardwareProps, navigator)
        : (console.warn('Cannot collect OS metadata. Navigator is not defined.'), {});
    }),
    (e.prototype.getIdentifier = function () {
      if (!window.crypto || !window.crypto.getRandomValues)
        return (
          console.warn(
            'Cannot generate profile ID. Crypto and/or getRandomValues is not supported.',
          ),
          ''
        );
      if (!localStorage)
        return console.warn('Cannot store profile ID. localStorage is not supported.'), '';
      var t = localStorage.getItem('profile-id');
      return (
        t ||
          ((t = window.crypto.getRandomValues(new Uint32Array(3)).join('-')),
          localStorage.setItem('profile-id', t)),
        t
      );
    }),
    (e.prototype.getInstalledFonts = function () {
      var t = document.createElement('canvas');
      if (!t)
        return (
          console.warn('Cannot collect font data. Browser does not support canvas element'), ''
        );
      var e = t.getContext && t.getContext('2d');
      if (!e)
        return (
          console.warn('Cannot collect font data. Browser does not support 2d canvas context'), ''
        );
      var n = 'abcdefghi0123456789';
      e.font = '72px Comic Sans';
      var r = e.measureText(n).width;
      return this.config.fontNames.reduce(function (t, o) {
        return (
          (e.font = '72px '.concat(o, ', Comic Sans')),
          e.measureText(n).width !== r && (t = ''.concat(t).concat(o, ';')),
          t
        );
      }, '');
    }),
    (e.prototype.getLocationCoordinates = function () {
      return xt(this, void 0, void 0, function () {
        var t = this;
        return Et(this, function (e) {
          return navigator && navigator.geolocation
            ? [
                2,
                new Promise(function (e) {
                  return xt(t, void 0, void 0, function () {
                    return Et(this, function (t) {
                      return (
                        navigator.geolocation.getCurrentPosition(
                          function (t) {
                            return e({
                              latitude: t.coords.latitude,
                              longitude: t.coords.longitude,
                            });
                          },
                          function (t) {
                            console.warn(
                              'Cannot collect geolocation information. ' +
                                t.code +
                                ': ' +
                                t.message,
                            ),
                              e({});
                          },
                          { enableHighAccuracy: !0, timeout: 3e4, maximumAge: 0 },
                        ),
                        [2]
                      );
                    });
                  });
                }),
              ]
            : (console.warn(
                'Cannot collect geolocation information. navigator.geolocation is not defined.',
              ),
              [2, Promise.resolve({})]);
        });
      });
    }),
    (e.prototype.getOSMeta = function () {
      return navigator
        ? this.reduceToObject(this.config.platformProps, navigator)
        : (console.warn('Cannot collect OS metadata. navigator is not defined.'), {});
    }),
    (e.prototype.getProfile = function (t) {
      var e = t.location,
        n = t.metadata;
      return xt(this, void 0, void 0, function () {
        var t, r;
        return Et(this, function (o) {
          switch (o.label) {
            case 0:
              return (
                (t = { identifier: this.getIdentifier() }),
                n &&
                  (t.metadata = {
                    hardware: Tt(Tt({}, this.getHardwareMeta()), {
                      display: this.getDisplayMeta(),
                    }),
                    browser: Tt(Tt({}, this.getBrowserMeta()), {
                      plugins: this.getBrowserPluginsNames(),
                    }),
                    platform: Tt(Tt({}, this.getOSMeta()), {
                      deviceName: this.getDeviceName(),
                      fonts: this.getInstalledFonts(),
                      timezone: this.getTimezoneOffset(),
                    }),
                  }),
                e ? ((r = t), [4, this.getLocationCoordinates()]) : [3, 2]
              );
            case 1:
              (r.location = o.sent()), (o.label = 2);
            case 2:
              return [2, t];
          }
        });
      });
    }),
    (e.prototype.getTimezoneOffset = function () {
      try {
        return new Date().getTimezoneOffset();
      } catch (t) {
        return (
          console.warn('Cannot collect timezone information. getTimezoneOffset is not defined.'),
          null
        );
      }
    });
})(Ot);
var At = 'forgerock-sdk',
  Pt = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Nt = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  It = (function () {
    function t() {}
    return (
      (t.get = function (t) {
        return Pt(this, void 0, void 0, function () {
          return Nt(this, function (e) {
            return [
              2,
              new Promise(function (e, n) {
                var r = function () {
                    return n();
                  },
                  o = window.indexedDB.open(At);
                (o.onsuccess = function () {
                  if (!o.result.objectStoreNames.contains(t))
                    return o.result.close(), n('Client ID not found');
                  var i = o.result.transaction(t, 'readonly').objectStore(t).get('tokens');
                  (i.onsuccess = function (t) {
                    if (!t || !t.target) throw new Error('Missing storage event target');
                    o.result.close(), e(t.target.result);
                  }),
                    (i.onerror = r);
                }),
                  (o.onupgradeneeded = function () {
                    o.result.close(), n('IndexedDB upgrade needed');
                  }),
                  (o.onerror = r);
              }),
            ];
          });
        });
      }),
      (t.set = function (t, e) {
        return Pt(this, void 0, void 0, function () {
          return Nt(this, function (n) {
            return [
              2,
              new Promise(function (n, r) {
                var o = window.indexedDB.open(At),
                  i = function () {
                    o.result.close(), n();
                  },
                  a = function () {
                    return r();
                  },
                  c = function () {
                    o.result.createObjectStore(t);
                  },
                  u = function () {
                    if (!o.result.objectStoreNames.contains(t)) {
                      var n = o.result.version + 1;
                      return (
                        o.result.close(),
                        ((o = window.indexedDB.open(At, n)).onupgradeneeded = c),
                        (o.onsuccess = u),
                        void (o.onerror = a)
                      );
                    }
                    var r = o.result.transaction(t, 'readwrite');
                    r.onerror = a;
                    var s = r.objectStore(t).put(e, 'tokens');
                    (s.onsuccess = i), (s.onerror = a);
                  };
                (o.onupgradeneeded = c), (o.onsuccess = u), (o.onerror = a);
              }),
            ];
          });
        });
      }),
      (t.remove = function (t) {
        return Pt(this, void 0, void 0, function () {
          return Nt(this, function (e) {
            return [
              2,
              new Promise(function (e, n) {
                var r = function () {
                    return n();
                  },
                  o = window.indexedDB.open(At);
                (o.onsuccess = function () {
                  if (!o.result.objectStoreNames.contains(t)) return e();
                  var n = o.result.transaction(t, 'readwrite').objectStore(t).delete('tokens');
                  (n.onsuccess = function () {
                    e();
                  }),
                    (n.onerror = r);
                }),
                  (o.onerror = r);
              }),
            ];
          });
        });
      }),
      t
    );
  })(),
  jt = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Rt = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  Ut = (function () {
    function t() {}
    return (
      (t.get = function (t) {
        return jt(this, void 0, void 0, function () {
          var e;
          return Rt(this, function (n) {
            e = localStorage.getItem(''.concat(At, '-').concat(t));
            try {
              return [2, Promise.resolve(JSON.parse(e || ''))];
            } catch (t) {
              return (
                console.warn(
                  'Could not parse token from localStorage. This could be due to accessing a removed token',
                ),
                [2, void 0]
              );
            }
            return [2];
          });
        });
      }),
      (t.set = function (t, e) {
        return jt(this, void 0, void 0, function () {
          var n;
          return Rt(this, function (r) {
            return (
              (n = JSON.stringify(e)), localStorage.setItem(''.concat(At, '-').concat(t), n), [2]
            );
          });
        });
      }),
      (t.remove = function (t) {
        return jt(this, void 0, void 0, function () {
          return Rt(this, function (e) {
            return localStorage.removeItem(''.concat(At, '-').concat(t)), [2];
          });
        });
      }),
      t
    );
  })(),
  Vt = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Bt = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  Lt = (function () {
    function t() {}
    return (
      (t.get = function (t) {
        return Vt(this, void 0, void 0, function () {
          var e;
          return Bt(this, function (n) {
            e = sessionStorage.getItem(''.concat(At, '-').concat(t));
            try {
              return [2, Promise.resolve(JSON.parse(e || ''))];
            } catch (t) {
              return (
                console.warn(
                  'Could not parse token from sessionStorage. This could be due to accessing a removed token',
                ),
                [2, void 0]
              );
            }
            return [2];
          });
        });
      }),
      (t.set = function (t, e) {
        return Vt(this, void 0, void 0, function () {
          var n;
          return Bt(this, function (r) {
            return (
              (n = JSON.stringify(e)), sessionStorage.setItem(''.concat(At, '-').concat(t), n), [2]
            );
          });
        });
      }),
      (t.remove = function (t) {
        return Vt(this, void 0, void 0, function () {
          return Bt(this, function (e) {
            return sessionStorage.removeItem(''.concat(At, '-').concat(t)), [2];
          });
        });
      }),
      t
    );
  })(),
  Mt = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  $t = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  qt = (function () {
    function t() {}
    return (
      (t.get = function () {
        return Mt(this, void 0, void 0, function () {
          var t, e, n;
          return $t(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  (t = this.getClientConfig()),
                  (e = t.clientId),
                  'sessionStorage' !== (n = t.tokenStore) ? [3, 2] : [4, Lt.get(e)]
                );
              case 1:
              case 3:
              case 5:
              case 7:
              case 9:
                return [2, r.sent()];
              case 2:
                return 'localStorage' !== n ? [3, 4] : [4, Ut.get(e)];
              case 4:
                return 'indexedDB' !== n ? [3, 6] : [4, It.get(e)];
              case 6:
                return n && n.get ? [4, n.get(e)] : [3, 8];
              case 8:
                return [4, Ut.get(e)];
            }
          });
        });
      }),
      (t.set = function (t) {
        return Mt(this, void 0, void 0, function () {
          var e, n, r;
          return $t(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (e = this.getClientConfig()),
                  (n = e.clientId),
                  'sessionStorage' !== (r = e.tokenStore) ? [3, 2] : [4, Lt.set(n, t)]
                );
              case 1:
              case 3:
              case 5:
              case 7:
              case 9:
                return [2, o.sent()];
              case 2:
                return 'localStorage' !== r ? [3, 4] : [4, Ut.set(n, t)];
              case 4:
                return 'indexedDB' !== r ? [3, 6] : [4, It.set(n, t)];
              case 6:
                return r && r.set ? [4, r.set(n, t)] : [3, 8];
              case 8:
                return [4, Ut.set(n, t)];
            }
          });
        });
      }),
      (t.remove = function () {
        return Mt(this, void 0, void 0, function () {
          var t, e, n;
          return $t(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  (t = this.getClientConfig()),
                  (e = t.clientId),
                  'sessionStorage' !== (n = t.tokenStore) ? [3, 2] : [4, Lt.remove(e)]
                );
              case 1:
              case 3:
              case 5:
              case 7:
              case 9:
                return [2, r.sent()];
              case 2:
                return 'localStorage' !== n ? [3, 4] : [4, Ut.remove(e)];
              case 4:
                return 'indexedDB' !== n ? [3, 6] : [4, It.remove(e)];
              case 6:
                return n && n.remove ? [4, n.remove(e)] : [3, 8];
              case 8:
                return [4, Ut.remove(e)];
            }
          });
        });
      }),
      (t.getClientConfig = function () {
        var t = n.get(),
          e = t.clientId,
          r = t.tokenStore;
        if (!e) throw new Error('clientId is required to manage token storage');
        return { clientId: e, tokenStore: r };
      }),
      t
    );
  })();
function Dt(t) {
  return t.ok || 4 === Math.floor(t.status / 100);
}
var zt,
  Ft = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Ht = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  Gt = (function () {
    function t() {}
    return (
      (t.createState = function () {
        return this.createRandomString(16);
      }),
      (t.createVerifier = function () {
        return this.createRandomString(32);
      }),
      (t.createChallenge = function (t) {
        return Ft(this, void 0, void 0, function () {
          var e;
          return Ht(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.sha256(t)];
              case 1:
                return (e = n.sent()), [2, this.base64UrlEncode(e)];
            }
          });
        });
      }),
      (t.base64UrlEncode = function (t) {
        var e = Array.prototype.slice.call(t);
        return window
          .btoa(String.fromCharCode.apply(null, e))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      }),
      (t.sha256 = function (t) {
        return Ft(this, void 0, void 0, function () {
          var e, n;
          return Ht(this, function (r) {
            switch (r.label) {
              case 0:
                return (
                  (e = new TextEncoder().encode(t)), [4, window.crypto.subtle.digest('SHA-256', e)]
                );
              case 1:
                return (n = r.sent()), [2, new Uint8Array(n)];
            }
          });
        });
      }),
      (t.createRandomString = function (t) {
        void 0 === t && (t = 32);
        var e = new Uint8Array(t);
        return window.crypto.getRandomValues(e), btoa(e.join('')).replace(/[^a-zA-Z0-9]+/, '');
      }),
      t
    );
  })();
!(function (t) {
  (t.Code = 'code'), (t.Token = 'token');
})(zt || (zt = {}));
var Kt = function () {
    return (
      (Kt =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      Kt.apply(this, arguments)
    );
  },
  Wt = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Jt = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  Qt = 'Authentication or consent required',
  Xt = 'Authorization timed out',
  Yt = 'Failed to fetch',
  Zt = 'NetworkError when attempting to fetch resource.',
  te = 'Cross-origin redirection',
  ee = (function () {
    function t() {}
    return (
      (t.createAuthorizeUrl = function (t) {
        return Wt(this, void 0, void 0, function () {
          var r, o, i, a, c, u, l, f;
          return Jt(this, function (p) {
            switch (p.label) {
              case 0:
                return (
                  (r = n.get(t)),
                  (o = r.clientId),
                  (i = r.middleware),
                  (a = r.redirectUri),
                  (c = r.scope),
                  (u = Kt(Kt({}, t.query), {
                    client_id: o,
                    redirect_uri: a,
                    response_type: t.responseType,
                    scope: c,
                    state: t.state,
                  })),
                  t.verifier ? [4, Gt.createChallenge(t.verifier)] : [3, 2]
                );
              case 1:
                (l = p.sent()),
                  (u.code_challenge = l),
                  (u.code_challenge_method = 'S256'),
                  (p.label = 2);
              case 2:
                return (
                  (f = s(
                    { url: new URL(this.getUrl('authorize', u, t)), init: {} },
                    { type: e.Authorize },
                  )),
                  [2, f(i).url.toString()]
                );
            }
          });
        });
      }),
      (t.getAuthCodeByIframe = function (t) {
        return Wt(this, void 0, void 0, function () {
          var e,
            r,
            o = this;
          return Jt(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.createAuthorizeUrl(t)];
              case 1:
                return (
                  (e = i.sent()),
                  (r = n.get(t).serverConfig),
                  [
                    2,
                    new Promise(function (t, n) {
                      var i,
                        a = document.createElement('iframe'),
                        c = function () {},
                        u = c,
                        s = 0;
                      (i = function () {
                        window.clearTimeout(s), a.removeEventListener('load', u), a.remove();
                      }),
                        (u = function () {
                          if (a.contentWindow) {
                            var e = a.contentWindow.location.href;
                            (o.containsAuthCode(e) || o.containsAuthError(e)) && (i(), t(e));
                          }
                        }),
                        (s = window.setTimeout(function () {
                          i(), n(new Error(Xt));
                        }, r.timeout)),
                        (a.style.display = 'none'),
                        a.addEventListener('load', u),
                        document.body.appendChild(a),
                        (a.src = e);
                    }),
                  ]
                );
            }
          });
        });
      }),
      (t.getOAuth2Tokens = function (t) {
        return Wt(this, void 0, void 0, function () {
          var e, r, o, i, a, c, s, l, f, p, d;
          return Jt(this, function (h) {
            switch (h.label) {
              case 0:
                return (
                  (e = n.get(t)),
                  (r = e.clientId),
                  (o = e.redirectUri),
                  (i = {
                    client_id: r,
                    code: t.authorizationCode,
                    grant_type: 'authorization_code',
                    redirect_uri: o,
                  }),
                  t.verifier && (i.code_verifier = t.verifier),
                  (a = u(i)),
                  (c = {
                    body: a,
                    headers: new Headers({
                      'content-length': a.length.toString(),
                      'content-type': 'application/x-www-form-urlencoded',
                    }),
                    method: 'POST',
                  }),
                  [4, this.request('accessToken', void 0, !1, c, t)]
                );
              case 1:
                return (s = h.sent()), [4, this.getBody(s)];
              case 2:
                if (((l = h.sent()), 200 !== s.status))
                  throw (
                    ((f =
                      'string' == typeof l
                        ? 'Expected 200, received '.concat(s.status)
                        : this.parseError(l)),
                    new Error(f))
                  );
                if (!(p = l).access_token) throw new Error('Access token not found in response');
                return (
                  (d = void 0),
                  p.expires_in && (d = Date.now() + 1e3 * p.expires_in),
                  [
                    2,
                    {
                      accessToken: p.access_token,
                      idToken: p.id_token,
                      refreshToken: p.refresh_token,
                      tokenExpiry: d,
                    },
                  ]
                );
            }
          });
        });
      }),
      (t.getUserInfo = function (t) {
        return Wt(this, void 0, void 0, function () {
          var e;
          return Jt(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.request('userInfo', void 0, !0, void 0, t)];
              case 1:
                if (200 !== (e = n.sent()).status)
                  throw new Error('Failed to get user info; received '.concat(e.status));
                return [4, e.json()];
              case 2:
                return [2, n.sent()];
            }
          });
        });
      }),
      (t.endSession = function (t) {
        return Wt(this, void 0, void 0, function () {
          var e, n, r;
          return Jt(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, qt.get()];
              case 1:
                return (
                  (e = o.sent().idToken),
                  (n = {}),
                  e && (n.id_token_hint = e),
                  [4, this.request('endSession', n, !0, void 0, t)]
                );
              case 2:
                if (!Dt((r = o.sent())))
                  throw new Error('Failed to end session; received '.concat(r.status));
                return [2, r];
            }
          });
        });
      }),
      (t.revokeToken = function (t) {
        return Wt(this, void 0, void 0, function () {
          var e, r, o, i;
          return Jt(this, function (a) {
            switch (a.label) {
              case 0:
                return (e = n.get(t).clientId), [4, qt.get()];
              case 1:
                return (
                  (r = a.sent().accessToken),
                  (o = {
                    body: u({ client_id: e, token: r }),
                    credentials: 'include',
                    headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
                    method: 'POST',
                  }),
                  [4, this.request('revoke', void 0, !1, o, t)]
                );
              case 2:
                if (!Dt((i = a.sent())))
                  throw new Error('Failed to revoke token; received '.concat(i.status));
                return [2, i];
            }
          });
        });
      }),
      (t.request = function (t, o, i, a, c) {
        return Wt(this, void 0, void 0, function () {
          var u, l, f, p, d, h, y, v;
          return Jt(this, function (g) {
            switch (g.label) {
              case 0:
                return (
                  (u = n.get(c)),
                  (l = u.middleware),
                  (f = u.serverConfig),
                  (p = this.getUrl(t, o, c)),
                  (d = function (t) {
                    switch (t) {
                      case 'accessToken':
                        return e.ExchangeToken;
                      case 'endSession':
                        return e.EndSession;
                      case 'revoke':
                        return e.RevokeToken;
                      default:
                        return e.UserInfo;
                    }
                  }),
                  (a = a || {}),
                  i ? [4, qt.get()] : [3, 2]
                );
              case 1:
                (h = g.sent().accessToken),
                  (a.credentials = 'include'),
                  (a.headers = a.headers || new Headers()),
                  a.headers.set('authorization', 'Bearer '.concat(h)),
                  (g.label = 2);
              case 2:
                return (
                  (y = s({ url: new URL(p), init: a }, { type: d(t) })),
                  (v = y(l)),
                  [4, r(fetch(v.url.toString(), v.init), f.timeout)]
                );
              case 3:
                return [2, g.sent()];
            }
          });
        });
      }),
      (t.containsAuthCode = function (t) {
        return !!t && /code=([^&]+)/.test(t);
      }),
      (t.containsAuthError = function (t) {
        return !!t && /error=([^&]+)/.test(t);
      }),
      (t.getBody = function (t) {
        return Wt(this, void 0, void 0, function () {
          var e;
          return Jt(this, function (n) {
            switch (n.label) {
              case 0:
                return (e = t.headers.get('content-type')) && e.indexOf('application/json') > -1
                  ? [4, t.json()]
                  : [3, 2];
              case 1:
              case 3:
                return [2, n.sent()];
              case 2:
                return [4, t.text()];
            }
          });
        });
      }),
      (t.parseError = function (t) {
        if (t) {
          if (t.error && t.error_description)
            return ''.concat(t.error, ': ').concat(t.error_description);
          if (t.code && t.message) return ''.concat(t.code, ': ').concat(t.message);
        }
      }),
      (t.getUrl = function (t, e, r) {
        var o = n.get(r),
          i = o.realmPath,
          s = o.serverConfig,
          l = a(t, i, s.paths),
          f = c(s.baseUrl, l);
        return e && (f += '?'.concat(u(e))), f;
      }),
      t
    );
  })(),
  ne = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  re = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  oe = (function () {
    function t() {}
    return (
      (t.logout = function (t) {
        return ne(this, void 0, void 0, function () {
          var o, i, u, l, f, p, d, h, y, v;
          return re(this, function (g) {
            switch (g.label) {
              case 0:
                return (
                  (o = n.get(t)),
                  (i = o.middleware),
                  (u = o.realmPath),
                  (l = o.serverConfig),
                  (f = {
                    credentials: 'include',
                    headers: new Headers({
                      'accept-api-version': 'protocol=1.0,resource=2.0',
                      'x-requested-with': 'forgerock-sdk',
                    }),
                    method: 'POST',
                  }),
                  (p = ''.concat(a('sessions', u, l.paths), '?_action=logout')),
                  (d = c(l.baseUrl, p)),
                  (h = s({ url: new URL(d), init: f }, { type: e.Logout })),
                  (y = h(i)),
                  [4, r(fetch(y.url.toString(), y.init), l.timeout)]
                );
              case 1:
                if (!Dt((v = g.sent())))
                  throw new Error('Failed to log out; received '.concat(v.status));
                return [2, v];
            }
          });
        });
      }),
      t
    );
  })();
var ie,
  ae,
  ce,
  ue = function () {
    return (
      (ue =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      ue.apply(this, arguments)
    );
  },
  se = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  le = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  fe = (function () {
    function t() {}
    return (
      (t.getTokens = function (o) {
        var i, a, c;
        return se(this, void 0, void 0, function () {
          var u, l, f, p, d, h, y, v, g, w, b, m, k, C, _, O, S, T, x, E, A, P;
          return le(this, function (N) {
            switch (N.label) {
              case 0:
                (u = null),
                  (l = n.get(o)),
                  (f = l.clientId),
                  (p = l.middleware),
                  (d = l.serverConfig),
                  (h = l.support),
                  (y = l.oauthThreshold),
                  (N.label = 1);
              case 1:
                return N.trys.push([1, 3, , 4]), [4, qt.get()];
              case 2:
                return (u = N.sent()), [3, 4];
              case 3:
                return (v = N.sent()), console.info('No stored tokens available', v), [3, 4];
              case 4:
                if (
                  u &&
                  !(null == o ? void 0 : o.forceRenew) &&
                  !(null === (i = null == o ? void 0 : o.query) || void 0 === i
                    ? void 0
                    : i.code) &&
                  !(function (t, e) {
                    return !(!t || !e) && e - t < Date.now();
                  })(y, u.tokenExpiry)
                )
                  return [2, u];
                if (!u) return [3, 9];
                N.label = 5;
              case 5:
                return N.trys.push([5, 8, , 9]), [4, ee.revokeToken(o)];
              case 6:
                return N.sent(), [4, t.deleteTokens()];
              case 7:
                return N.sent(), [3, 9];
              case 8:
                return (
                  (g = N.sent()),
                  console.warn('Existing tokens could not be revoked or deleted', g),
                  [3, 9]
                );
              case 9:
                return (null === (a = null == o ? void 0 : o.query) || void 0 === a
                  ? void 0
                  : a.code) &&
                  (null === (c = null == o ? void 0 : o.query) || void 0 === c ? void 0 : c.state)
                  ? ((w = window.sessionStorage.getItem(f)),
                    window.sessionStorage.removeItem(f),
                    (b = JSON.parse(w)),
                    [4, this.tokenExchange(o, b)])
                  : [3, 11];
              case 10:
                return [2, N.sent()];
              case 11:
                return (
                  (m = Gt.createVerifier()),
                  (k = Gt.createState()),
                  (C = ue(ue({}, o), { responseType: zt.Code, state: k, verifier: m })),
                  [4, ee.createAuthorizeUrl(C)]
                );
              case 12:
                (_ = N.sent()), (N.label = 13);
              case 13:
                return (
                  N.trys.push([13, 18, , 19]),
                  (O = void 0),
                  'legacy' !== h && void 0 !== h
                    ? [3, 15]
                    : ((S = URL.bind), [4, ee.getAuthCodeByIframe(C)])
                );
              case 14:
                return (O = new (S.apply(URL, [void 0, N.sent()]))()), [3, 17];
              case 15:
                return (
                  (T = s(
                    { url: new URL(_), init: { credentials: 'include', mode: 'cors' } },
                    { type: e.Authorize },
                  )),
                  (x = T(p).init),
                  [4, r(fetch(_, x), d.timeout)]
                );
              case 16:
                (E = N.sent()), (O = new URL(E.url)), (N.label = 17);
              case 17:
                if (O.searchParams.get('error'))
                  throw Error(''.concat(O.searchParams.get('error_description')));
                if (!O.searchParams.get('code')) throw Error(Qt);
                return (
                  (I = O.toString()),
                  (j = new URL(I)),
                  (R = {}),
                  j.searchParams.forEach(function (t, e) {
                    return (R[e] = t);
                  }),
                  (A = R),
                  o || (o = {}),
                  (o.query = A),
                  [3, 19]
                );
              case 18:
                if (
                  !((P = N.sent()) instanceof Error) ||
                  'redirect' !== (null == o ? void 0 : o.login)
                )
                  throw P;
                if (
                  Qt !== P.message &&
                  Xt !== P.message &&
                  Yt !== P.message &&
                  Zt !== P.message &&
                  !P.message.includes(te)
                )
                  throw P;
                return (
                  window.sessionStorage.setItem(f, JSON.stringify(C)),
                  [2, window.location.assign(_)]
                );
              case 19:
                return [4, this.tokenExchange(o, { state: k, verifier: m })];
              case 20:
                return [2, N.sent()];
            }
            var I, j, R;
          });
        });
      }),
      (t.deleteTokens = function () {
        return se(this, void 0, void 0, function () {
          return le(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, qt.remove()];
              case 1:
                return t.sent(), [2];
            }
          });
        });
      }),
      (t.tokenExchange = function (t, e) {
        var n, r, o, i;
        return se(this, void 0, void 0, function () {
          var a, c, u, s, l;
          return le(this, function (f) {
            switch (f.label) {
              case 0:
                if ((null === (n = t.query) || void 0 === n ? void 0 : n.state) !== e.state)
                  throw new Error('State mismatch');
                if (
                  !(null === (r = t.query) || void 0 === r ? void 0 : r.code) ||
                  Array.isArray(null === (o = t.query) || void 0 === o ? void 0 : o.code)
                )
                  throw new Error('Failed to acquire authorization code');
                return (
                  (a = null === (i = t.query) || void 0 === i ? void 0 : i.code),
                  (c = e.verifier),
                  (u = ue(ue({}, t), { authorizationCode: a, verifier: c })),
                  [4, ee.getOAuth2Tokens(u)]
                );
              case 1:
                if (!(s = f.sent()) || !s.accessToken)
                  throw new Error('Unable to exchange authorization for tokens');
                f.label = 2;
              case 2:
                return f.trys.push([2, 4, , 5]), [4, qt.set(s)];
              case 3:
                return f.sent(), [3, 5];
              case 4:
                return (l = f.sent()), console.error('Failed to store tokens', l), [3, 5];
              case 5:
                return [2, s];
            }
          });
        });
      }),
      t
    );
  })(),
  pe = (function () {
    function t() {}
    return (
      (t.getCurrentUser = function (t) {
        return ee.getUserInfo(t);
      }),
      t
    );
  })(),
  de = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  he = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  },
  ye = (function () {
    function t() {}
    return (
      (t.login = function (t, e) {
        return de(this, void 0, void 0, function () {
          return he(this, function (n) {
            throw (console.info(t, e), new Error('FRUser.login() not implemented'));
          });
        });
      }),
      (t.loginWithUI = function (t, e) {
        return de(this, void 0, void 0, function () {
          return he(this, function (n) {
            switch (n.label) {
              case 0:
                return n.trys.push([0, 4, , 5]), [4, t.getSession(e)];
              case 1:
                return n.sent(), [4, fe.getTokens({ forceRenew: !0 })];
              case 2:
                return n.sent(), [4, pe.getCurrentUser()];
              case 3:
                return [2, n.sent()];
              case 4:
                throw (n.sent(), new Error('Login failed'));
              case 5:
                return [2];
            }
          });
        });
      }),
      (t.logout = function (t) {
        return de(this, void 0, void 0, function () {
          return he(this, function (e) {
            switch (e.label) {
              case 0:
                return e.trys.push([0, 2, , 3]), [4, oe.logout(t)];
              case 1:
                return e.sent(), [3, 3];
              case 2:
                return e.sent(), console.warn('Session logout was not successful'), [3, 3];
              case 3:
                return e.trys.push([3, 5, , 6]), [4, ee.endSession(t)];
              case 4:
                return e.sent(), [3, 6];
              case 5:
                return e.sent(), console.warn('OAuth endSession was not successful'), [3, 6];
              case 6:
                return e.trys.push([6, 8, , 9]), [4, ee.revokeToken(t)];
              case 7:
                return e.sent(), [3, 9];
              case 8:
                return e.sent(), console.warn('OAuth revokeToken was not successful'), [3, 9];
              case 9:
                return [4, fe.deleteTokens()];
              case 10:
                return e.sent(), [2];
            }
          });
        });
      }),
      t
    );
  })();
!(function (t) {
  (t.Error = 'ERROR'), (t.Unsupported = 'unsupported');
})(ie || (ie = {})),
  (function (t) {
    (t.AbortError = 'AbortError'),
      (t.DataError = 'DataError'),
      (t.ConstraintError = 'ConstraintError'),
      (t.EncodingError = 'EncodingError'),
      (t.InvalidError = 'InvalidError'),
      (t.NetworkError = 'NetworkError'),
      (t.NotAllowedError = 'NotAllowedError'),
      (t.NotSupportedError = 'NotSupportedError'),
      (t.SecurityError = 'SecurityError'),
      (t.TimeoutError = 'TimeoutError'),
      (t.UnknownError = 'UnknownError');
  })(ae || (ae = {})),
  (function (t) {
    (t[(t.None = 0)] = 'None'),
      (t[(t.Authentication = 1)] = 'Authentication'),
      (t[(t.Registration = 2)] = 'Registration');
  })(ce || (ce = {}));
var ve = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  ge = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  };
function we(t) {
  return ve(this, void 0, void 0, function () {
    return ge(this, function (e) {
      switch (e.label) {
        case 0:
          return [4, t.clone().json()];
        case 1:
          return [2, !!e.sent().advices];
      }
    });
  });
}
function be(t) {
  var e = new URL(t).searchParams.get('authIndexValue') || '',
    n = new DOMParser(),
    r = decodeURIComponent(e),
    o = n.parseFromString(r, 'application/xml').querySelector('Value');
  return o ? o.innerHTML : '';
}
function me(t) {
  return ve(this, void 0, void 0, function () {
    return ge(this, function (e) {
      switch (e.label) {
        case 0:
          return [4, t.clone().json()];
        case 1:
          return [2, !!e.sent().callbacks];
      }
    });
  });
}
function ke(t) {
  return ve(this, void 0, void 0, function () {
    return ge(this, function (e) {
      switch (e.label) {
        case 0:
          return [4, t.json()];
        case 1:
          return [2, e.sent()];
      }
    });
  });
}
var Ce = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          }),
        t(e, n)
      );
    };
    return function (e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })(),
  _e = function (t, e, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(t) {
        try {
          u(r.next(t));
        } catch (t) {
          i(t);
        }
      }
      function c(t) {
        try {
          u(r.throw(t));
        } catch (t) {
          i(t);
        }
      }
      function u(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(a, c);
      }
      u((r = r.apply(t, e || [])).next());
    });
  },
  Oe = function (t, e) {
    var n,
      r,
      o,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(i) {
      return function (c) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; a; )
            try {
              if (
                ((n = 1),
                r &&
                  (o =
                    2 & i[0]
                      ? r.return
                      : i[0]
                      ? r.throw || ((o = r.return) && o.call(r), 0)
                      : r.next) &&
                  !(o = o.call(r, i[1])).done)
              )
                return o;
              switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                case 0:
                case 1:
                  o = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((o = a.trys),
                    (o = o.length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < o[1]) {
                    (a.label = o[1]), (o = i);
                    break;
                  }
                  if (o && a.label < o[2]) {
                    (a.label = o[2]), a.ops.push(i);
                    break;
                  }
                  o[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = e.call(t, a);
            } catch (t) {
              (i = [6, t]), (r = 0);
            } finally {
              n = o = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, c]);
      };
    }
  };
function Se() {}
function Te(t) {
  return t();
}
function xe() {
  return Object.create(null);
}
function Ee(t) {
  t.forEach(Te);
}
function Ae(t) {
  return 'function' == typeof t;
}
function Pe(t, e) {
  return t != t ? e == e : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
}
function Ne(t, e, n) {
  t.$$.on_destroy.push(
    (function (t, ...e) {
      if (null == t) return Se;
      const n = t.subscribe(...e);
      return n.unsubscribe ? () => n.unsubscribe() : n;
    })(e, n),
  );
}
function Ie(t, e) {
  t.appendChild(e);
}
function je(t, e, n) {
  t.insertBefore(e, n || null);
}
function Re(t) {
  t.parentNode.removeChild(t);
}
function Ue(t) {
  return document.createElement(t);
}
function Ve(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function Be(t) {
  return document.createTextNode(t);
}
function Le() {
  return Be(' ');
}
function Me() {
  return Be('');
}
function $e(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function qe(t, e, n) {
  null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
let De;
function ze(t) {
  De = t;
}
!(function (t) {
  function o() {
    return (null !== t && t.apply(this, arguments)) || this;
  }
  Ce(o, t),
    (o.request = function (t) {
      return _e(this, void 0, void 0, function () {
        var r, o, i, l, f, p, d, h, y, v, g, w, b, m, k, C, _;
        return Oe(this, function (O) {
          switch (O.label) {
            case 0:
              return [4, this._request(t, !1)];
            case 1:
              return (
                (r = O.sent()),
                (i = !1),
                (function (t, e) {
                  return 'function' == typeof e ? e(t) : 401 === t.status;
                })(r, t.requiresNewToken)
                  ? [4, this._request(t, !0)]
                  : [3, 3]
              );
            case 2:
              (r = O.sent()), (O.label = 3);
            case 3:
              return t.authorization && t.authorization.handleStep
                ? r.redirected &&
                  (function (t) {
                    return (
                      (t.headers.get('Content-Type') || '').includes('html') &&
                      t.url.includes('composite_advice')
                    );
                  })(r)
                  ? ((i = !0),
                    (o = (function (t) {
                      var e = {};
                      return (
                        t.url.includes('AuthenticateToServiceConditionAdvice')
                          ? (e.AuthenticateToServiceConditionAdvice = [be(t.url)])
                          : (e.TransactionConditionAdvice = [be(t.url)]),
                        { resource: '', actions: {}, attributes: {}, advices: e, ttl: 0 }
                      );
                    })(r)),
                    [3, 7])
                  : [3, 4]
                : [3, 16];
            case 4:
              return [4, we(r)];
            case 5:
              return O.sent() ? [4, ke(r)] : [3, 7];
            case 6:
              (o = O.sent()), (O.label = 7);
            case 7:
              return o && o.advices
                ? ((l = n.get(t.authorization.config)),
                  (f = l.middleware),
                  (p = l.realmPath),
                  (d = l.serverConfig),
                  (h = (function (t, e, n, r, o) {
                    var i = t.advices && t.advices.AuthenticateToServiceConditionAdvice,
                      s = t.advices && t.advices.TransactionConditionAdvice,
                      l = '',
                      f = '';
                    i
                      ? ((l = i.reduce(function (t, e) {
                          var n = t ? ' '.concat(t) : t;
                          return ''.concat(e).concat(n);
                        }, '')),
                        (f = 'AuthenticateToServiceConditionAdvice'))
                      : s &&
                        ((l = s.reduce(function (t, e) {
                          var n = t ? ' '.concat(t) : t;
                          return ''.concat(e).concat(n);
                        }, '')),
                        (f = 'TransactionConditionAdvice'));
                    var p = '<Attribute name="'.concat(f, '"/>'),
                      d = '<Value>'.concat(l, '</Value>'),
                      h = ''
                        .concat('<Advices><AttributeValuePair>')
                        .concat(p)
                        .concat(d)
                        .concat('</AttributeValuePair></Advices>'),
                      y = a('authenticate', r, o),
                      v = { authIndexType: 'composite_advice', authIndexValue: h };
                    return {
                      init: {
                        method: 'POST',
                        credentials: 'include',
                        headers: new Headers({
                          'Accept-API-Version': 'resource=2.0, protocol=1.0',
                        }),
                      },
                      timeout: n,
                      url: c(e, ''.concat(y, '?').concat(u(v))),
                    };
                  })(o, d.baseUrl, t.timeout, p, d.paths)),
                  (y = new URL(h.url)),
                  (v = y.searchParams.get('authIndexType')),
                  (g = y.searchParams.get('authIndexValue')),
                  (w = s(
                    { url: new URL(h.url), init: h.init },
                    { type: e.StartAuthenticate, payload: { type: v, tree: g } },
                  )),
                  (b = w(f)),
                  (m = b.url),
                  (k = b.init),
                  (h.url = m.toString()),
                  (h.init = k),
                  [4, this._request(h, !1)])
                : [3, 16];
            case 8:
              return [4, me((C = O.sent()))];
            case 9:
              if (!O.sent())
                throw new Error('Error: Initial response from auth server not a "step".');
              if (
                !((S = o).advices && S.advices.AuthenticateToServiceConditionAdvice
                  ? Array.isArray(S.advices.AuthenticateToServiceConditionAdvice) &&
                    S.advices.AuthenticateToServiceConditionAdvice.length > 0
                  : S.advices &&
                    S.advices.TransactionConditionAdvice &&
                    Array.isArray(S.advices.TransactionConditionAdvice) &&
                    S.advices.TransactionConditionAdvice.length > 0)
              )
                throw new Error('Error: Transactional or Service Advice is empty.');
              return [4, this.stepIterator(C, t.authorization.handleStep, v, g)];
            case 10:
              O.sent(), (_ = void 0), (O.label = 11);
            case 11:
              return O.trys.push([11, 13, , 14]), [4, qt.get()];
            case 12:
              return (_ = O.sent()), [3, 14];
            case 13:
              return O.sent(), [3, 14];
            case 14:
              return (
                i
                  ? (t.url = (function (t, e, n) {
                      var r = new URL(t);
                      if (e.TransactionConditionAdvice) {
                        var o = e.TransactionConditionAdvice[0];
                        r.searchParams.append('_txid', o);
                      }
                      return (
                        n && n.idToken && r.searchParams.append('_idtoken', n.idToken), r.toString()
                      );
                    })(t.url, o.advices, _))
                  : (t.init.headers = (function (t, e, n) {
                      var r = new Headers(t.headers);
                      return (
                        e.AuthenticateToServiceConditionAdvice
                          ? r.set('x-tree', e.AuthenticateToServiceConditionAdvice[0])
                          : e.TransactionConditionAdvice &&
                            r.set('x-txid', e.TransactionConditionAdvice[0]),
                        n && n.idToken && r.set('x-idtoken', n.idToken),
                        r
                      );
                    })(t.init, o.advices, _)),
                [4, this._request(t, !1)]
              );
            case 15:
              (r = O.sent()), (O.label = 16);
            case 16:
              return [2, r];
          }
          var S;
        });
      });
    }),
    (o.setAuthHeaders = function (t, e) {
      return _e(this, void 0, void 0, function () {
        var n;
        return Oe(this, function (r) {
          switch (r.label) {
            case 0:
              return r.trys.push([0, 2, , 3]), [4, qt.get()];
            case 1:
              return (n = r.sent()), [3, 3];
            case 2:
              return r.sent(), [3, 3];
            case 3:
              return n && n.accessToken ? [4, fe.getTokens({ forceRenew: e })] : [3, 5];
            case 4:
              (n = r.sent()) &&
                n.accessToken &&
                t.set('Authorization', 'Bearer '.concat(n.accessToken)),
                (r.label = 5);
            case 5:
              return [2, t];
          }
        });
      });
    }),
    (o.stepIterator = function (t, e, n, r) {
      return _e(this, void 0, void 0, function () {
        var o,
          i,
          a = this;
        return Oe(this, function (c) {
          switch (c.label) {
            case 0:
              return [4, t.json()];
            case 1:
              return (
                (o = c.sent()),
                (i = new pt(o)),
                [
                  2,
                  new Promise(function (t, o) {
                    return _e(a, void 0, void 0, function () {
                      function a(i) {
                        return _e(this, void 0, void 0, function () {
                          var c, u;
                          return Oe(this, function (s) {
                            switch (s.label) {
                              case 0:
                                return [4, e(i)];
                              case 1:
                                return (c = s.sent()), [4, vt.next(c, { type: n, tree: r })];
                              case 2:
                                return (
                                  (u = s.sent()).type === k.LoginSuccess
                                    ? t()
                                    : u.type === k.LoginFailure
                                    ? o('Authentication tree failure.')
                                    : a(u),
                                  [2]
                                );
                            }
                          });
                        });
                      }
                      return Oe(this, function (t) {
                        return a(i), [2];
                      });
                    });
                  }),
                ]
              );
          }
        });
      });
    }),
    (o._request = function (t, e) {
      return _e(this, void 0, void 0, function () {
        var n, o, i, a;
        return Oe(this, function (c) {
          switch (c.label) {
            case 0:
              return (
                (n = t.url),
                (o = t.init),
                (i = t.timeout),
                (a = new Headers(o.headers || {})),
                t.bypassAuthentication ? [3, 2] : [4, this.setAuthHeaders(a, e)]
              );
            case 1:
              (a = c.sent()), (c.label = 2);
            case 2:
              return (o.headers = a), [2, r(fetch(n, o), i)];
          }
        });
      });
    });
})(w);
const Fe = [],
  He = [],
  Ge = [],
  Ke = [],
  We = Promise.resolve();
let Je = !1;
function Qe(t) {
  Ge.push(t);
}
const Xe = new Set();
let Ye = 0;
function Ze() {
  const t = De;
  do {
    for (; Ye < Fe.length; ) {
      const t = Fe[Ye];
      Ye++, ze(t), tn(t.$$);
    }
    for (ze(null), Fe.length = 0, Ye = 0; He.length; ) He.pop()();
    for (let t = 0; t < Ge.length; t += 1) {
      const e = Ge[t];
      Xe.has(e) || (Xe.add(e), e());
    }
    Ge.length = 0;
  } while (Fe.length);
  for (; Ke.length; ) Ke.pop()();
  (Je = !1), Xe.clear(), ze(t);
}
function tn(t) {
  if (null !== t.fragment) {
    t.update(), Ee(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Qe);
  }
}
const en = new Set();
let nn;
function rn() {
  nn = { r: 0, c: [], p: nn };
}
function on() {
  nn.r || Ee(nn.c), (nn = nn.p);
}
function an(t, e) {
  t && t.i && (en.delete(t), t.i(e));
}
function cn(t, e, n, r) {
  if (t && t.o) {
    if (en.has(t)) return;
    en.add(t),
      nn.c.push(() => {
        en.delete(t), r && (n && t.d(1), r());
      }),
      t.o(e);
  }
}
function un(t) {
  t && t.c();
}
function sn(t, e, n, r) {
  const { fragment: o, on_mount: i, on_destroy: a, after_update: c } = t.$$;
  o && o.m(e, n),
    r ||
      Qe(() => {
        const e = i.map(Te).filter(Ae);
        a ? a.push(...e) : Ee(e), (t.$$.on_mount = []);
      }),
    c.forEach(Qe);
}
function ln(t, e) {
  const n = t.$$;
  null !== n.fragment &&
    (Ee(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function fn(t, e) {
  -1 === t.$$.dirty[0] && (Fe.push(t), Je || ((Je = !0), We.then(Ze)), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function pn(t, e, n, r, o, i, a, c = [-1]) {
  const u = De;
  ze(t);
  const s = (t.$$ = {
    fragment: null,
    ctx: null,
    props: i,
    update: Se,
    not_equal: o,
    bound: xe(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (u ? u.$$.context : [])),
    callbacks: xe(),
    dirty: c,
    skip_bound: !1,
    root: e.target || u.$$.root,
  });
  a && a(s.root);
  let l = !1;
  if (
    ((s.ctx = n
      ? n(t, e.props || {}, (e, n, ...r) => {
          const i = r.length ? r[0] : n;
          return (
            s.ctx &&
              o(s.ctx[e], (s.ctx[e] = i)) &&
              (!s.skip_bound && s.bound[e] && s.bound[e](i), l && fn(t, e)),
            n
          );
        })
      : []),
    s.update(),
    (l = !0),
    Ee(s.before_update),
    (s.fragment = !!r && r(s.ctx)),
    e.target)
  ) {
    if (e.hydrate) {
      const t = (function (t) {
        return Array.from(t.childNodes);
      })(e.target);
      s.fragment && s.fragment.l(t), t.forEach(Re);
    } else s.fragment && s.fragment.c();
    e.intro && an(t.$$.fragment), sn(t, e.target, e.anchor, e.customElement), Ze();
  }
  ze(u);
}
class dn {
  $destroy() {
    ln(this, 1), (this.$destroy = Se);
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return (
      n.push(e),
      () => {
        const t = n.indexOf(e);
        -1 !== t && n.splice(t, 1);
      }
    );
  }
  $set(t) {
    var e;
    this.$$set &&
      ((e = t), 0 !== Object.keys(e).length) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
  }
}
function hn(t) {
  let e, n, r, o, i, a, c;
  return {
    c() {
      (e = Ue('div')),
        (n = Ue('label')),
        (r = Be(t[2])),
        (o = Le()),
        (i = Ue('input')),
        qe(n, 'class', 'flex pt-4 w-full'),
        qe(n, 'for', t[0]),
        qe(i, 'class', 'rounded w-full'),
        qe(i, 'id', t[0]),
        qe(i, 'type', 'password'),
        (i.value = t[1]);
    },
    m(u, s) {
      je(u, e, s),
        Ie(e, n),
        Ie(n, r),
        Ie(e, o),
        Ie(e, i),
        a || ((c = $e(i, 'change', t[3])), (a = !0));
    },
    p(t, [e]) {
      1 & e && qe(n, 'for', t[0]), 1 & e && qe(i, 'id', t[0]);
    },
    i: Se,
    o: Se,
    d(t) {
      t && Re(e), (a = !1), c();
    },
  };
}
function yn(t, e, n) {
  let { callback: r } = e,
    { inputName: o } = e;
  const i = r?.getInputValue(),
    a = r.getPrompt();
  return (
    r.getName && r.getName(),
    (t.$$set = (t) => {
      'callback' in t && n(4, (r = t.callback)), 'inputName' in t && n(0, (o = t.inputName));
    }),
    [
      o,
      i,
      a,
      function (t) {
        console.log(t.target.value), r.setInputValue(t.target.value);
      },
      r,
    ]
  );
}
class vn extends dn {
  constructor(t) {
    super(), pn(this, t, yn, hn, Pe, { callback: 4, inputName: 0 });
  }
}
function gn(t) {
  let e, n, r, o, i, a, c;
  return {
    c() {
      (e = Ue('div')),
        (n = Ue('label')),
        (r = Be(t[2])),
        (o = Le()),
        (i = Ue('input')),
        qe(n, 'class', 'flex pt-4 w-full'),
        qe(n, 'for', t[0]),
        qe(i, 'class', 'rounded w-full'),
        qe(i, 'id', t[0]),
        qe(i, 'type', 'mail' == t[3] ? 'email' : 'text'),
        (i.value = t[1]);
    },
    m(u, s) {
      je(u, e, s),
        Ie(e, n),
        Ie(n, r),
        Ie(e, o),
        Ie(e, i),
        a || ((c = $e(i, 'change', t[4])), (a = !0));
    },
    p(t, [e]) {
      1 & e && qe(n, 'for', t[0]), 1 & e && qe(i, 'id', t[0]);
    },
    i: Se,
    o: Se,
    d(t) {
      t && Re(e), (a = !1), c();
    },
  };
}
function wn(t, e, n) {
  let { callback: r } = e,
    { inputName: o } = e;
  const i = r?.getInputValue(),
    a = r.getPrompt(),
    c = r.getName && r.getName();
  return (
    (t.$$set = (t) => {
      'callback' in t && n(5, (r = t.callback)), 'inputName' in t && n(0, (o = t.inputName));
    }),
    [
      o,
      i,
      a,
      c,
      function (t) {
        console.log(t.target.value), r.setInputValue(t.target.value);
      },
      r,
    ]
  );
}
class bn extends dn {
  constructor(t) {
    super(), pn(this, t, wn, gn, Pe, { callback: 5, inputName: 0 });
  }
}
function mn(t, e, n) {
  const r = t.slice();
  return (r[4] = e[n]), r;
}
function kn(t) {
  let e;
  return {
    c() {
      (e = Ue('p')), (e.textContent = 'Login Success!');
    },
    m(t, n) {
      je(t, e, n);
    },
    p: Se,
    i: Se,
    o: Se,
    d(t) {
      t && Re(e);
    },
  };
}
function Cn(t) {
  let e,
    n,
    r,
    o,
    i,
    a,
    c = t[0]?.callbacks,
    u = [];
  for (let e = 0; e < c.length; e += 1) u[e] = Tn(mn(t, c, e));
  const s = (t) =>
    cn(u[t], 1, 1, () => {
      u[t] = null;
    });
  return {
    c() {
      e = Ue('form');
      for (let t = 0; t < u.length; t += 1) u[t].c();
      (n = Le()),
        (r = Ue('button')),
        (r.textContent = 'Submit'),
        qe(r, 'class', 'flex bg-blue-600 justify-center my-5 p-2 rounded text-white w-full'),
        qe(r, 'type', 'submit');
    },
    m(c, s) {
      je(c, e, s);
      for (let t = 0; t < u.length; t += 1) u[t].m(e, null);
      var l;
      Ie(e, n),
        Ie(e, r),
        (o = !0),
        i ||
          ((a = $e(
            e,
            'submit',
            ((l = function () {
              Ae(t[1]) && t[1].apply(this, arguments);
            }),
            function (t) {
              return t.preventDefault(), l.call(this, t);
            }),
          )),
          (i = !0));
    },
    p(r, o) {
      if (((t = r), 1 & o)) {
        let r;
        for (c = t[0]?.callbacks, r = 0; r < c.length; r += 1) {
          const i = mn(t, c, r);
          u[r]
            ? (u[r].p(i, o), an(u[r], 1))
            : ((u[r] = Tn(i)), u[r].c(), an(u[r], 1), u[r].m(e, n));
        }
        for (rn(), r = c.length; r < u.length; r += 1) s(r);
        on();
      }
    },
    i(t) {
      if (!o) {
        for (let t = 0; t < c.length; t += 1) an(u[t]);
        o = !0;
      }
    },
    o(t) {
      u = u.filter(Boolean);
      for (let t = 0; t < u.length; t += 1) cn(u[t]);
      o = !1;
    },
    d(t) {
      t && Re(e),
        (function (t, e) {
          for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
        })(u, t),
        (i = !1),
        a();
    },
  };
}
function _n(t) {
  let e;
  return {
    c() {
      (e = Ue('p')), (e.textContent = 'Loading ...');
    },
    m(t, n) {
      je(t, e, n);
    },
    p: Se,
    i: Se,
    o: Se,
    d(t) {
      t && Re(e);
    },
  };
}
function On(t) {
  let e, n;
  return (
    (e = new bn({ props: { callback: t[4], inputName: t[4]?.payload?.input?.[0].name } })),
    {
      c() {
        un(e.$$.fragment);
      },
      m(t, r) {
        sn(e, t, r), (n = !0);
      },
      p(t, n) {
        const r = {};
        1 & n && (r.callback = t[4]),
          1 & n && (r.inputName = t[4]?.payload?.input?.[0].name),
          e.$set(r);
      },
      i(t) {
        n || (an(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        cn(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        ln(e, t);
      },
    }
  );
}
function Sn(t) {
  let e, n;
  return (
    (e = new vn({ props: { callback: t[4], inputName: t[4]?.payload?.input?.[0].name } })),
    {
      c() {
        un(e.$$.fragment);
      },
      m(t, r) {
        sn(e, t, r), (n = !0);
      },
      p(t, n) {
        const r = {};
        1 & n && (r.callback = t[4]),
          1 & n && (r.inputName = t[4]?.payload?.input?.[0].name),
          e.$set(r);
      },
      i(t) {
        n || (an(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        cn(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        ln(e, t);
      },
    }
  );
}
function Tn(t) {
  let e,
    n,
    r,
    o = 'NameCallback' === t[4].getType(),
    i = 'PasswordCallback' === t[4].getType(),
    a = o && On(t),
    c = i && Sn(t);
  return {
    c() {
      a && a.c(), (e = Le()), c && c.c(), (n = Me());
    },
    m(t, o) {
      a && a.m(t, o), je(t, e, o), c && c.m(t, o), je(t, n, o), (r = !0);
    },
    p(t, r) {
      1 & r && (o = 'NameCallback' === t[4].getType()),
        o
          ? a
            ? (a.p(t, r), 1 & r && an(a, 1))
            : ((a = On(t)), a.c(), an(a, 1), a.m(e.parentNode, e))
          : a &&
            (rn(),
            cn(a, 1, 1, () => {
              a = null;
            }),
            on()),
        1 & r && (i = 'PasswordCallback' === t[4].getType()),
        i
          ? c
            ? (c.p(t, r), 1 & r && an(c, 1))
            : ((c = Sn(t)), c.c(), an(c, 1), c.m(n.parentNode, n))
          : c &&
            (rn(),
            cn(c, 1, 1, () => {
              c = null;
            }),
            on());
    },
    i(t) {
      r || (an(a), an(c), (r = !0));
    },
    o(t) {
      cn(a), cn(c), (r = !1);
    },
    d(t) {
      a && a.d(t), t && Re(e), c && c.d(t), t && Re(n);
    },
  };
}
function xn(t) {
  let e, n, r, o;
  const i = [_n, Cn, kn],
    a = [];
  function c(t, e) {
    return t[0] ? ('Step' === t[0].type ? 1 : 'LoginSuccess' === t[0].type ? 2 : -1) : 0;
  }
  return (
    ~(e = c(t)) && (n = a[e] = i[e](t)),
    {
      c() {
        n && n.c(), (r = Me());
      },
      m(t, n) {
        ~e && a[e].m(t, n), je(t, r, n), (o = !0);
      },
      p(t, [o]) {
        let u = e;
        (e = c(t)),
          e === u
            ? ~e && a[e].p(t, o)
            : (n &&
                (rn(),
                cn(a[u], 1, 1, () => {
                  a[u] = null;
                }),
                on()),
              ~e
                ? ((n = a[e]),
                  n ? n.p(t, o) : ((n = a[e] = i[e](t)), n.c()),
                  an(n, 1),
                  n.m(r.parentNode, r))
                : (n = null));
      },
      i(t) {
        o || (an(n), (o = !0));
      },
      o(t) {
        cn(n), (o = !1);
      },
      d(t) {
        ~e && a[e].d(t), t && Re(r);
      },
    }
  );
}
function En(t, e, n) {
  let r,
    { closeModal: o } = e,
    { authCallback: i } = e,
    a = () => {};
  return (
    'object' == typeof window &&
      ((async () => {
        if ((n(0, (r = await vt.next())), console.log(r), 'LoginSuccess' === r.type)) {
          const t = await fe.getTokens(),
            e = await pe.getCurrentUser();
          console.log(t), o && o(), i && i(e);
        }
      })(),
      (a = async (t) => {
        if ((n(0, (r = await vt.next(r))), console.log(r), 'LoginSuccess' === r.type)) {
          const t = await fe.getTokens(),
            e = await pe.getCurrentUser();
          console.log(t), o && o(), i && i(e);
        }
      })),
    (t.$$set = (t) => {
      'closeModal' in t && n(2, (o = t.closeModal)),
        'authCallback' in t && n(3, (i = t.authCallback));
    }),
    [r, a, o, i]
  );
}
class An extends dn {
  constructor(t) {
    super(), pn(this, t, En, xn, Pe, { closeModal: 2, authCallback: 3 });
  }
}
function Pn(t) {
  let e, n;
  return {
    c() {
      (e = Ve('svg')),
        (n = Ve('path')),
        qe(
          n,
          'd',
          'M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
        ),
        qe(e, 'class', t[0]),
        qe(e, 'height', t[1]),
        qe(e, 'width', t[1]),
        qe(e, 'viewBox', '0 0 24 24'),
        qe(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(t, r) {
      je(t, e, r), Ie(e, n);
    },
    p(t, [n]) {
      1 & n && qe(e, 'class', t[0]), 2 & n && qe(e, 'height', t[1]), 2 & n && qe(e, 'width', t[1]);
    },
    i: Se,
    o: Se,
    d(t) {
      t && Re(e);
    },
  };
}
function Nn(t, e, n) {
  let { classes: r = '' } = e,
    { size: o = '24px' } = e;
  return (
    (t.$$set = (t) => {
      'classes' in t && n(0, (r = t.classes)), 'size' in t && n(1, (o = t.size));
    }),
    [r, o]
  );
}
class In extends dn {
  constructor(t) {
    super(), pn(this, t, Nn, Pn, Pe, { classes: 0, size: 1 });
  }
}
const jn = [];
const Rn = (function (t, e = Se) {
    let n;
    const r = new Set();
    function o(e) {
      if (Pe(t, e) && ((t = e), n)) {
        const e = !jn.length;
        for (const e of r) e[1](), jn.push(e, t);
        if (e) {
          for (let t = 0; t < jn.length; t += 2) jn[t][0](jn[t + 1]);
          jn.length = 0;
        }
      }
    }
    return {
      set: o,
      update: function (e) {
        o(e(t));
      },
      subscribe: function (i, a = Se) {
        const c = [i, a];
        return (
          r.add(c),
          1 === r.size && (n = e(o) || Se),
          i(t),
          () => {
            r.delete(c), 0 === r.size && (n(), (n = null));
          }
        );
      },
    };
  })(!1),
  Un = () => {
    Rn.set(!1);
  };
function Vn(t) {
  let e, n, r, o, i, a, c, u, s, l;
  return (
    (o = new In({ props: { classes: 'text-gray-400 fill-current', size: '72px' } })),
    (u = new An({ props: { closeModal: Un, authCallback: t[0] } })),
    {
      c() {
        (e = Ue('div')),
          (n = Ue('div')),
          (r = Ue('div')),
          un(o.$$.fragment),
          (i = Le()),
          (a = Ue('h1')),
          (a.textContent = 'Sign In'),
          (c = Le()),
          un(u.$$.fragment),
          qe(r, 'class', 'flex w-full justify-center'),
          qe(a, 'class', 'flex justify-center text-4xl text-gray-600 font-family-'),
          qe(n, 'class', 'max-w-lg w-full bg-white p-10 rounded shadow-md'),
          qe(
            e,
            'class',
            (s = t[1]
              ? 'absolute top-2 left-2/4 w-[500px] -translate-x-2/4 my-5 min-h-full'
              : 'hidden'),
          );
      },
      m(t, s) {
        je(t, e, s),
          Ie(e, n),
          Ie(n, r),
          sn(o, r, null),
          Ie(n, i),
          Ie(n, a),
          Ie(n, c),
          sn(u, n, null),
          (l = !0);
      },
      p(t, [n]) {
        const r = {};
        1 & n && (r.authCallback = t[0]),
          u.$set(r),
          (!l ||
            (2 & n &&
              s !==
                (s = t[1]
                  ? 'absolute top-2 left-2/4 w-[500px] -translate-x-2/4 my-5 min-h-full'
                  : 'hidden'))) &&
            qe(e, 'class', s);
      },
      i(t) {
        l || (an(o.$$.fragment, t), an(u.$$.fragment, t), (l = !0));
      },
      o(t) {
        cn(o.$$.fragment, t), cn(u.$$.fragment, t), (l = !1);
      },
      d(t) {
        t && Re(e), ln(o), ln(u);
      },
    }
  );
}
function Bn(t, e, r) {
  let o;
  Ne(t, Rn, (t) => r(1, (o = t)));
  let { config: i } = e,
    { authCallback: a } = e;
  return (
    n.set(i),
    (t.$$set = (t) => {
      'config' in t && r(2, (i = t.config)), 'authCallback' in t && r(0, (a = t.authCallback));
    }),
    [a, o, i]
  );
}
class Ln extends dn {
  constructor(t) {
    super(), pn(this, t, Bn, Vn, Pe, { config: 2, authCallback: 0 });
  }
}
const Mn = () => {
    Rn.set(!0);
  },
  $n = ye;
export { $n as User, Ln as default, Mn as open };
//# sourceMappingURL=widget.js.map
