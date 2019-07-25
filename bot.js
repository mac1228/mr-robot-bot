'use strict';

module.exports.setup = (app) => {
    const builder = require('botbuilder');
    const teams = require('botbuilder-teams');
    const BOT_APP_ID = process.env.MicrosoftAppId;

    // Create a connector to handle the conversations
    const connector = new teams.TeamsChatConnector({
        appId: BOT_APP_ID,
        appPassword: process.env.MicrosoftAppPassword,
        openIdMetadata: process.env.BotOpenIdMetadata
    });

    const inMemoryBotStorage = new builder.MemoryBotStorage();

    const bot = new builder.UniversalBot(connector, function (session) {

        var text = teams.TeamsMessage.getTextWithoutMentions(session.message);

        if (text === 'join') {
            session.send(`Oh! So you'd like to become an operator. Thank you so much for helping me out :)`);
        } else if (text === 'leave') {
            session.send(`Awww...see ya next time!`);
        } else if (text === 'vote') {
            session.send(`Hmm who hasn't been a good operator?`);
        } else {
            session.send(`beep boop.`);
        }
    });

    bot.on('conversationUpdate', (msg) => {
        var members = msg.membersAdded;
        // Loop through all members that were just added to the team
        for (var i = 0; i < members.length; i++) {
            // See if the member added was our bot
            if (members[i].id.includes(BOT_APP_ID)) {
                var botmessage = new builder.Message()
                    .address(msg.address)
                    .text(`Hey! I'm Mr. Robot. Pleaseure to meet ya :)`);
    
                bot.send(botmessage, function(err) {});
            }
        }
    });

    bot.set('storage', inMemoryBotStorage);

    // Setup an endpoint on the router for the bot to listen.
    // NOTE: This endpoint cannot be changed and must be api/messages
    app.post('/api/messages', connector.listen());
};
