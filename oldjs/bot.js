const { ActivityHandler, TurnContext, MemoryStorage } = require('botbuilder');
const teams = require('botbuilder-teams');

const storage = new MemoryStorage();

class MrRobot extends ActivityHandler {
    constructor() {
        super();

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const teamsCtx = teams.TeamsContext.from(context);
            const text = teamsCtx.getActivityTextWithoutMentions().trim();

            if (text === 'join') {
                await context.sendActivity(`Oh! So you'd like to become an operator. Thank you so much for helping me out :)`);
            } else if (text === 'leave') {
                await context.sendActivity(`Awww...see ya next time!`);
            } else if (text === 'vote') {
                await context.sendActivity(`Hmm who hasn't been a good operator?`);
            } else if (text === 'me') {
                const ref = TurnContext.getConversationReference(context.activity);
                const userName = ref.user.name;
                await context.sendActivity(`Hello ${userName}`);
            } else if (text === 'store') {
                logMessageText(storage, context)
            } else {
                await context.sendActivity(`beep boop.`);
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(`Hey! I'm Mr. Robot. Pleasure to meet ya :)`);
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

// This function stores new user messages. Creates new utterance log if none exists.
async function logMessageText(storage, turnContext) {
    let utterance = turnContext.activity.text;
    // debugger;
    try {
        // Read from the storage.
        let storeItems = await storage.read(["UtteranceLogJS"])
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
                await storage.write(storeItems)
                turnContext.sendActivity(`${numStored}: The list is now: ${storedString}`);
            } catch (err) {
                turnContext.sendActivity(`Write failed of UtteranceLogJS: ${err}`);
            }
        }
        else {
            turnContext.sendActivity(`Creating and saving new utterance log`);
            var turnNumber = 1;
            storeItems["UtteranceLogJS"] = { UtteranceList: [`${utterance}`], "eTag": "*", turnNumber }
            // Gather info for user message.
            var storedString = storeItems.UtteranceLogJS.UtteranceList.toString();
            var numStored = storeItems.UtteranceLogJS.turnNumber;

            try {
                await storage.write(storeItems)
                turnContext.sendActivity(`${numStored}: The list is now: ${storedString}`);
            } catch (err) {
                turnContext.sendActivity(`Write failed: ${err}`);
            }
        }
    }
    catch (err) {
        turnContext.sendActivity(`Read rejected. ${err}`);
    }
}

module.exports.MrRobot = MrRobot;