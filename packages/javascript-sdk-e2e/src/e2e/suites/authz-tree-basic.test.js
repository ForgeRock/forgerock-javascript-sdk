'use strict';
/*
 * @forgerock/javascript-sdk
 *
 * authz-tree-basic.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var setup_and_go_1 = require('../utilities/setup-and-go');
var browsers_1 = require('../utilities/browsers');
describe('Test Transaction Authorization flow', function () {
  beforeAll(function () {
    jest.retryTimes(3);
  });
  browsers_1['default'].map(function (browserType) {
    it('Trigger Txn Auth appropriately with ' + browserType, function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var _a, browser, messageArray, error_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 3, , 4]);
              return [4 /*yield*/, (0, setup_and_go_1.setupAndGo)(browserType, 'authz-txn-basic/')];
            case 1:
              (_a = _b.sent()), (browser = _a.browser), (messageArray = _a.messageArray);
              // Test assertions
              expect(messageArray.includes('IG resource requires additional authorization')).toBe(
                true,
              );
              expect(messageArray.includes('Rest resource requires additional authorization')).toBe(
                true,
              );
              expect(messageArray.includes('Request to IG resource successfully responded')).toBe(
                true,
              );
              expect(messageArray.includes('Request to REST resource successfully responded')).toBe(
                true,
              );
              expect(messageArray.includes('Starting authentication with composite advice')).toBe(
                true,
              );
              expect(messageArray.includes('Continuing authentication with composite advice')).toBe(
                true,
              );
              return [4 /*yield*/, browser.close()];
            case 2:
              _b.sent();
              return [3 /*break*/, 4];
            case 3:
              error_1 = _b.sent();
              return [2 /*return*/, error_1];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    });
  });
});
