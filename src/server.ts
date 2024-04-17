import fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { commandsHandler } from "./commands/commands-handler/commands-handler";
import { eventsHandler } from "./events/events-handler/events-handler";
import { Player } from "discord-player";

require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');

// export const app = fastify().withTypeProvider<ZodTypeProvider>()
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.player = new Player(client)

commandsHandler();
eventsHandler();

client.login(process.env.BOT_TOKEN);