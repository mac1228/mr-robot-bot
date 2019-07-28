import * as dotenv from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import { MrRobot } from './bot';
import * as teams from 'botbuilder-teams';

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
});

const botSetting = {
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
  channelService: process.env.ChannelService,
  openIdMetadata: process.env.BotOpenIdMetadata
};

const adapter = new teams.TeamsAdapter(botSetting);

adapter.use(new teams.TeamsMiddleware());

adapter.onTurnError = async (context, error) => {
  console.error(`\n [onTurnError]: ${error}`);
  await context.sendActivity(`Oops. Something went wrong!`);
};

const bot = new MrRobot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});