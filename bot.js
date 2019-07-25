// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.

// const { ActivityHandler } = require('botbuilder');
// // const teams = require('botbuilder-teams');


// class MrRobot extends ActivityHandler {
//     constructor() {
//         super();

//         // const chat  = new teams.TeamsChatConnector();

//         // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
//         this.onMessage(async (context, next) => {
//             const reference = context.getConversationReference(context.request);

//             await context.sendActivity(reference);

//             const text = context.activity.text.trim();
//             if (text === 'join') {
//                 await context.sendActivity(`Oh! So you'd like to become an operator. Thank you so much for helping me out :)`);
//             } else if (text === 'leave') {
//                 await context.sendActivity(`Awww...see ya next time!'`);
//             } else if (text === 'vote') {
//                 await context.sendActivity(`Hmm who hasn't been a good operator?'`);
//             } else {
//                 await context.sendActivity(`beep boop.'`);
//             }
            
//             // By calling next() you ensure that the next BotHandler is run.
//             await next();
//         });

//         this.onMembersAdded(async (context, next) => {
//             const membersAdded = context.activity.membersAdded;
//             for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
//                 if (membersAdded[cnt].id !== context.activity.recipient.id) {
//                     await context.sendActivity(`Hey! I'm Mr. Robot. Pleaseure to meet ya :)`);
//                 }
//             }
//             // By calling next() you ensure that the next BotHandler is run.
//             await next();
//         });
//     }
// }

'use strict';

module.exports.setup = function(app) {
    const builder = require('botbuilder');
    const teams = require('botbuilder-teams');

    // Create a connector to handle the conversations
    const connector = new teams.TeamsChatConnector({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword,
        openIdMetadata: process.env.BotOpenIdMetadata
    });
    
    const inMemoryBotStorage = new builder.MemoryBotStorage();
    
    const bot = new builder.UniversalBot(connector);

    bot.on('conversationUpdate', (session) => {
        // Message might contain @mentions which we would like to strip off in the response
        var text = teams.TeamsMessage.getTextWithoutMentions(session.message);
        session.send('You said: %s', text);
    });
    
    bot.set('storage', inMemoryBotStorage);

    // Setup an endpoint on the router for the bot to listen.
    // NOTE: This endpoint cannot be changed and must be api/messages
    app.post('/api/messages', connector.listen());
};
