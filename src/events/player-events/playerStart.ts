module.exports = {
    name: 'playerStart',
    on: 'true',
    execute(queue: any, track: any) {
        queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
    }
}