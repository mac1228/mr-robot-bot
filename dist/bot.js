var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var botbuilder_1 = require("botbuilder");
var teams = require("botbuilder-teams");
var storage = new botbuilder_1.MemoryStorage();
var MrRobot = /** @class */ (function (_super) {
    __extends(MrRobot, _super);
    function MrRobot() {
        var _this = _super.call(this) || this;
        _this.onMessage(function (context, next) { return __awaiter(_this, void 0, void 0, function () {
            var teamsCtx, text, ref, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        teamsCtx = teams.TeamsContext.from(context);
                        text = teamsCtx.getActivityTextWithoutMentions().trim();
                        if (!(text === 'join')) return [3 /*break*/, 2];
                        return [4 /*yield*/, context.sendActivity("Oh! So you'd like to become an operator. Thank you so much for helping me out :)")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(text === 'leave')) return [3 /*break*/, 4];
                        return [4 /*yield*/, context.sendActivity("Awww...see ya next time!")];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(text === 'vote')) return [3 /*break*/, 6];
                        return [4 /*yield*/, context.sendActivity("Hmm who hasn't been a good operator?")];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 6:
                        if (!(text === 'me')) return [3 /*break*/, 8];
                        ref = botbuilder_1.TurnContext.getConversationReference(context.activity);
                        userName = ref.user.name;
                        return [4 /*yield*/, context.sendActivity("Hello " + userName)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        if (!(text === 'store')) return [3 /*break*/, 9];
                        logMessageText(storage, context);
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, context.sendActivity("beep boop.")];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [4 /*yield*/, next()];
                    case 12:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        _this.onMembersAdded(function (context, next) { return __awaiter(_this, void 0, void 0, function () {
            var membersAdded, cnt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        membersAdded = context.activity.membersAdded;
                        cnt = 0;
                        _a.label = 1;
                    case 1:
                        if (!(cnt < membersAdded.length)) return [3 /*break*/, 4];
                        if (!(membersAdded[cnt].id !== context.activity.recipient.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, context.sendActivity("Hey! I'm Mr. Robot. Pleasure to meet ya :)")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++cnt;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, next()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return _this;
    }
    return MrRobot;
}(botbuilder_1.ActivityHandler));
exports.MrRobot = MrRobot;
// This function stores new user messages. Creates new utterance log if none exists.
function logMessageText(storage, turnContext) {
    return __awaiter(this, void 0, void 0, function () {
        var utterance, storeItems, UtteranceLogJS, storedString, numStored, err_1, turnNumber, storedString, numStored, err_2, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utterance = turnContext.activity.text;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, storage.read(["UtteranceLogJS"])
                        // Check the result.
                    ];
                case 2:
                    storeItems = _a.sent();
                    UtteranceLogJS = storeItems["UtteranceLogJS"];
                    if (!(typeof (UtteranceLogJS) != 'undefined')) return [3 /*break*/, 7];
                    // The log exists so we can write to it.
                    storeItems["UtteranceLogJS"].turnNumber++;
                    storeItems["UtteranceLogJS"].UtteranceList.push(utterance);
                    storedString = storeItems.UtteranceLogJS.UtteranceList.toString();
                    numStored = storeItems.UtteranceLogJS.turnNumber;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, storage.write(storeItems)];
                case 4:
                    _a.sent();
                    turnContext.sendActivity(numStored + ": The list is now: " + storedString);
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    turnContext.sendActivity("Write failed of UtteranceLogJS: " + err_1);
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 11];
                case 7:
                    turnContext.sendActivity("Creating and saving new utterance log");
                    turnNumber = 1;
                    storeItems["UtteranceLogJS"] = { UtteranceList: ["" + utterance], "eTag": "*", turnNumber: turnNumber };
                    storedString = storeItems.UtteranceLogJS.UtteranceList.toString();
                    numStored = storeItems.UtteranceLogJS.turnNumber;
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, storage.write(storeItems)];
                case 9:
                    _a.sent();
                    turnContext.sendActivity(numStored + ": The list is now: " + storedString);
                    return [3 /*break*/, 11];
                case 10:
                    err_2 = _a.sent();
                    turnContext.sendActivity("Write failed: " + err_2);
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 13];
                case 12:
                    err_3 = _a.sent();
                    turnContext.sendActivity("Read rejected. " + err_3);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
