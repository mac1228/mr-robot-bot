const { ActivityHandler, TurnContext } = require('botbuilder');
const teams = require('botbuilder-teams')

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

module.exports.MrRobot = MrRobot;