import fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { commandsHandler } from "./commands/commands-handler/commands-handler";
import { eventsHandler } from "./events/events-handler/events-handler";
import { Player } from "discord-player";

require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');

// export const app = fastify().withTypeProvider<ZodTypeProvider>()
export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio'        
    }
})

commandsHandler();
eventsHandler();

client.login(process.env.BOT_TOKEN);