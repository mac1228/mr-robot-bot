'use strict';

module.exports.setup = (app) => {
    const builder = require('botbuilder');
    const teams = require('botbuilder-teams');
    const BOT_APP_ID = process.env.MicrosoftAppId;
    let chatInfo;

    // Create a connector to handle the conversations
    const connector = new teams.TeamsChatConnector({
        appId: BOT_APP_ID,
        appPassword: process.env.MicrosoftAppPassword,
        openIdMetadata: process.env.BotOpenIdMetadata
    });

    const inMemoryBotStorage = new builder.MemoryBotStorage();

    const bot = new builder.UniversalBot(connector, (session) => {

        let message = session.message;
        let text = teams.TeamsMessage.getTextWithoutMentions(message);

        if (text === 'join') {
            session.send(`Oh! So you'd like to become an operator. Thank you so much for helping me out :)`);
        } else if (text === 'leave') {
            session.send(`Awww...see ya next time!`);
        } else if (text === 'vote') {
            session.send(`Hmm who hasn't been a good operator?`);
        } else if (text === 'notify') {
            // var address =
            // {
            //     channelId: chatInfo.channelId,
            //     user: { id: chatInfo.from.id },
            //     channelData: {
            //         tenant: {
            //             id: chatInfo.channelData.tenant.id
            //         }
            //     },
            //     bot:
            //     {
            //         id: chatInfo.recipient.id,
            //         name: chatInfo.recipient.name
            //     },
            //     serviceUrl: chatInfo.serviceUrl,
            //     useAuth: true
            // }

            // let msg = new builder.Message().address(address);
            // msg.text('Hello, this is a notification');
            // bot.send(msg);
            session.send('recipient: ' + chatInfo.recipient.id);
            session.send('from: ' + chatInfo.from.id);
        } else if (text === 'reset') {
            // Forget everything we know about the user
            session.userData = {};
            session.conversationData = {};
            session.privateConversationData = {};
            session.save().sendBatch();

            let conversationUpdateEvent = {
                type: "conversationUpdate",
                agent: message.agent,
                source: message.source,
                sourceEvent: message.sourceEvent,
                user: message.user,
                address: message.address,
                timestamp: message.timestamp,
                membersAdded: [ message.address.user, message.address.bot ],
            };
            bot.receive(conversationUpdateEvent);
        } else {
            session.send(`beep boop.`);
        }
    });

    bot.on('conversationUpdate', (msg) => {
        var members = msg.membersAdded;
        // Loop through all members that were just added to the team
        for (var i = 0; i < members.length; i++) {
            chatInfo = msg;
            // See if the member added was our bot
            if (members[i].id.includes(BOT_APP_ID)) {
                var botmessage = new builder.Message()
                    .address(msg.address)
                    .text(`Hey! I'm Mr. Robot. Pleasure to meet ya :)`);

                bot.send(botmessage, function (err) { });
            }
        }
    });

    bot.set('storage', inMemoryBotStorage);

    // Setup an endpoint on the router for the bot to listen.
    // NOTE: This endpoint cannot be changed and must be api/messages
    app.post('/api/messages', connector.listen());
};
