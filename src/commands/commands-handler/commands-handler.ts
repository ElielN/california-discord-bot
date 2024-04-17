import { client } from "../../server";

const rootDir = require('../../../utils/path')
const fs = require('node:fs');
const path = require('node:path');

export const  commandsHandler = () => {
    const foldersPath = path.join(rootDir, 'commands');
    const utilityFolder = fs.readdirSync(foldersPath).filter((dir: string) => !dir.includes('commands-handler'));
    
    for (const folder of utilityFolder) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    } 
}