'use strict';

module.exports.setup = (app) => {
    const builder = require('botbuilder');
    const teams = require('botbuilder-teams');

    // Create a connector to handle the conversations
    const connector = new teams.TeamsChatConnector({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword,
        openIdMetadata: process.env.BotOpenIdMetadata
    });

    const inMemoryBotStorage = new builder.MemoryBotStorage();

    const bot = new builder.UniversalBot(connector, function (session) {

        var text = teams.TeamsMessage.getTextWithoutMentions(session.message);

        if (text === 'join') {
            session.send(`Oh! So you'd like to become an operator. Thank you so much for helping me out :)`);
        } else if (text === 'leave') {
            session.send(`Awww...see ya next time!'`);
        } else if (text === 'vote') {
            session.send(`Hmm who hasn't been a good operator?'`);
        } else {
            session.send(`beep boop.'`);
        }
    });

    bot.set('storage', inMemoryBotStorage);

    // Setup an endpoint on the router for the bot to listen.
    // NOTE: This endpoint cannot be changed and must be api/messages
    app.post('/api/messages', connector.listen());
};
