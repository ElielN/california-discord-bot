import { client } from "../../server";

const rootDir = require('../../../utils/path')
const fs = require('node:fs');
const path = require('node:path');

const actionsHandler = () => {
    const eventsPath = path.join(rootDir, 'events', 'client-events');
    const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));
    
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args: any) => event.execute(...args));
        } else {
            client.on(event.name, (...args: any) => event.execute(...args));
        }
    }    
}

export const eventsHandler = () => {
    actionsHandler()
}