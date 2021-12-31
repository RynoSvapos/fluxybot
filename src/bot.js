require('dotenv').config({
    path: '../.env'
});
const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice')
const questionize = require('./question');

const intents = new Discord.Intents(32767);
const client = new Discord.Client({
    intents
});

const ytdl = require('ytdl-core');






const domande = [
    'Ciao bello come ti chiami',
    `Mi dici l'id della tua stanza perpiacere`
];



client.on("ready", async () => {

    console.log(`Il bot e' al cesso`);




    let risposte = await questionize.makeUserQuestions(domande);


    client.guilds.fetch('839787720808726549').then((guild) => {
        // user.setMute(false, 'bababoey');

    }).catch(console.error);

    let connection = DiscordVoice.joinVoiceChannel({
        channelId: risposte[1],
        guildId: process.env.GUILD_ID,
        adapterCreator: client.guilds.cache.get(process.env.GUILD_ID).voiceAdapterCreator

    });

    const stream = ytdl('https://www.youtube.com/watch?v=HTJld5vC_jc', {
        filter: 'audioonly'
    });
    const player = DiscordVoice.createAudioPlayer();

    const subscription = connection.subscribe(player);
    const resource = DiscordVoice.createAudioResource(stream, {
        inputType: DiscordVoice.StreamType.Arbitrary
    });





    player.play(resource);
    connection.subscribe(player);






});














client.login(process.env.TOKEN);