// by kp#3343 :)
const { Client } = require("discord.js")
const fs = require("fs")
const bot = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })

const prefix = '.'

let config = JSON.parse(fs.readFileSync("./config.json", "utf-8"))

let cache = []

//functions
function lerTxt(file) {
    try {
        let data = fs.readFileSync(`./data/${file}.txt`, "utf-8")
        return data
    } catch {
        return -1
    }
}

function updateTxt(file, content) {
    fs.appendFile(`./data/${file}.txt`, content, function (err) {
        if (err) throw err
    });
}

function cacheFiles() {
    const files = fs.readdirSync("./data/")
        .filter((filename) => filename.endsWith(".txt"))

    for (let filename of files) {
        cache.push(filename.replace('.txt', '').toLowerCase())
    }
}

function getDate() {
    let d = new Date().toString().split(" ")
    let dia = d[2]; let mes = d[1]; let ano = d[3]; let hora = d[4]
    return `[${dia}/${mes}/${ano} - ${hora}]`
}

bot.once("ready", () => {
    console.log("Backup BOT online!")
    cacheFiles()
    console.log(cache.length + " arquivos foram cacheds")
})

//backup
bot.on("message", message => {
    if (!message.guild) return
    if (cache.includes(message.channel.name)) {
        let user = message.author
        updateTxt(message.channel.name, `\n${user.tag} : ${message.content}`)
        console.log(message.channel.name + " foi atualizado")
        return
    }
    if (lerTxt(message.channel.name) != -1) {
        let user = message.author
        updateTxt(message.channel.name, `\n${getDate()} ${user.tag} : ${message.content}`)
        console.log(message.channel.name + " foi atualizado")
        return
    }
    return
})

//comandos
bot.on("message", async message => {
    if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return

    let args = message.content.slice(prefix.length).trim().split(/ +/)
    let cmd = args.shift().toLowerCase()

    if (cmd == "register-chat") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão para executar esse comando")
        let canal = message.mentions.channels.first()
        if (!canal) return message.reply("argumentos insuficientes! ``.register-chat #chat``")
        let name = canal.name.toLowerCase()
        if (lerTxt(name) == -1) {
            updateTxt(name, "=== LOGS DE '" + name.toUpperCase() + "' ===\n")
            message.reply("chat registrado!")
        } else {
            message.reply("esse canal já foi registrado!")
        }
    }

    else if (cmd == "chat-log") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão para executar esse comando")
        let canal = message.mentions.channels.first()
        if (!canal) return message.reply("argumentos insuficientes! ``.chat-log #chat``")
        let name = canal.name.toLowerCase()
        if (lerTxt(name) == -1) return message.reply("esse chat não possui registros!")

        let x = await message.channel.send("Criando hastebin")
        for (let index = 0; index < 6; index++) {
            setTimeout(() => {
                x.edit(x.content += " .")
            }, 2000);
        }
        x.edit(lerTxt(name))
    }

    else if (cmd == "check-cache") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão para executar esse comando")
        message.reply("Cache atual: ``" + cache.join(", ") + "`` ")
    }
})

bot.login(config["token"])