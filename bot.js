// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class MrRobot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const text = context.activity.text
            if (text === 'join') {
                await context.sendActivity(`Oh! So you'd like to become an operator. Thank you so much for helping me out.'`);
            } else if (text === 'leave') {
                await context.sendActivity(`Awww...see ya next time!'`);
            } else if (text === 'vote') {
                await context.sendActivity(`Hmm who hasn't been a good operator?'`);
            } else {
                await context.sendActivity(`beep boop.'`);
            }
            
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(`Hey! I'm Mr. Robot. Pleaseure to meet ya :)`);
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MrRobot = MrRobot;
