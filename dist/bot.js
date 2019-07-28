"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const teams = require("botbuilder-teams");
const storage = new botbuilder_1.MemoryStorage();
class MrRobot extends botbuilder_1.ActivityHandler {
    constructor() {
        super();
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            const teamsCtx = teams.TeamsContext.from(context);
            const text = teamsCtx.getActivityTextWithoutMentions().trim();
            if (text === 'join') {
                yield context.sendActivity(`Oh! So you'd like to become an operator. Thank you so much for helping me out :)`);
            }
            else if (text === 'leave') {
                yield context.sendActivity(`Awww...see ya next time!`);
            }
            else if (text === 'vote') {
                yield context.sendActivity(`Hmm who hasn't been a good operator?`);
            }
            else if (text === 'me') {
                const ref = botbuilder_1.TurnContext.getConversationReference(context.activity);
                const userName = ref.user.name;
                yield context.sendActivity(`Hello ${userName}`);
            }
            else if (text === 'store') {
                logMessageText(storage, context);
            }
            else {
                yield context.sendActivity(`beep boop.`);
            }
            yield next();
        }));
        this.onMembersAdded((context, next) => __awaiter(this, void 0, void 0, function* () {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    yield context.sendActivity(`Hey! I'm Mr. Robot. Pleasure to meet ya :)`);
                }
            }
            yield next();
        }));
    }
}
exports.MrRobot = MrRobot;
// This function stores new user messages. Creates new utterance log if none exists.
function logMessageText(storage, turnContext) {
    return __awaiter(this, void 0, void 0, function* () {
        let utterance = turnContext.activity.text;
        // debugger;
        try {
            // Read from the storage.
            let storeItems = yield storage.read(["UtteranceLogJS"]);
            // Check the result.
            var UtteranceLogJS = storeItems["UtteranceLogJS"];
            if (typeof (UtteranceLogJS) != 'undefined') {
                // The log exists so we can write to it.
                storeItems["UtteranceLogJS"].turnNumber++;
                storeItems["UtteranceLogJS"].UtteranceList.push(utterance);
                // Gather info for user message.
                var storedString = storeItems.UtteranceLogJS.UtteranceList.toString();
                var numStored = storeItems.UtteranceLogJS.turnNumber;
                try {
                    yield storage.write(storeItems);
                    turnContext.sendActivity(`${numStored}: The list is now: ${storedString}`);
                }
                catch (err) {
                    turnContext.sendActivity(`Write failed of UtteranceLogJS: ${err}`);
                }
            }
            else {
                turnContext.sendActivity(`Creating and saving new utterance log`);
                var turnNumber = 1;
                storeItems["UtteranceLogJS"] = { UtteranceList: [`${utterance}`], "eTag": "*", turnNumber };
                // Gather info for user message.
                var storedString = storeItems.UtteranceLogJS.UtteranceList.toString();
                var numStored = storeItems.UtteranceLogJS.turnNumber;
                try {
                    yield storage.write(storeItems);
                    turnContext.sendActivity(`${numStored}: The list is now: ${storedString}`);
                }
                catch (err) {
                    turnContext.sendActivity(`Write failed: ${err}`);
                }
            }
        }
        catch (err) {
            turnContext.sendActivity(`Read rejected. ${err}`);
        }
    });
}
