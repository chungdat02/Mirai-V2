module.exports.config = {
	name: "admin",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "MiraicommandCategory Team",
	description: "Quản lý admin bot",
	commandCategory: "𝐀𝐝𝐦𝐢𝐧",
	usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '====『 𝙰𝚍𝚖𝚒𝚗 』==== \n\n%1\n\n====『 𝚂𝚞𝚙𝚙𝚘𝚛𝚝 』==== \n\n%2',
        "notHavePermssion": '『 𝙰𝚍𝚖𝚒𝚗 』𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙲𝚑𝚞̛𝚊 𝙳𝚣𝚊𝚊𝚊 🥹 "%1"',
        "addedNewAdmin": '『 𝙰𝚍𝚖𝚒𝚗 』• 𝚃𝚒𝚎̂́𝚗 𝙷𝚊̀𝚗𝚑 𝚃𝚑𝚊̆𝚗𝚐 𝚀𝚞𝚢𝚎̂̀𝚗 𝙰𝚍𝚖𝚒𝚗\n%2',
        "removedAdmin": '『 𝙰𝚍𝚖𝚒𝚗 』• 𝚃𝚒𝚎̂́𝚗 𝙷𝚊̀𝚗𝚑 𝙷𝚊̣ 𝚀𝚞𝚢𝚎̂̀𝚗 𝙰𝚍𝚖𝚒𝚗\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT, NDH } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);

    switch (args[0]) {
        case "list":
        case "l":
        case "-l": {
          if (permssion != 3) return api.sendMessage("List Admin Tuyệt Mật Không Thể Lộ Nên Thông Cảm Nhé <3", threadID, messageID);
            listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`𝙽𝙰𝙼𝙴    ➣ ${name}\n𝚄𝙸𝙳      ➣   fb.me/${idAdmin}`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`𝙽𝙰𝙼𝙴    ➣ ${name1}\n𝚄𝙸𝙳      ➣   fb.me/${idNDH}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n"), msg1.join("\n")), threadID, messageID);
        }
        
        case "add": {
            if (event.senderID != 100002326790705) return api.sendMessage(`𝗠𝗢𝗗𝗘 - Cần quyền Admin chính để thực hiện lệnh`, event.threadID, event.messageID)
            if (permssion != 3 ) return api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙲𝚑𝚞̛𝚊 𝙳𝚣𝚊𝚊𝚊 🥹", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `\n𝙽𝙰𝙼𝙴    ➣ ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (event.senderID != 100002326790705) return api.sendMessage(`𝗠𝗢𝗗𝗘 - Cần quyền Admin để thực hiện`, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙲𝚑𝚞̛𝚊 𝙳𝚣𝚊𝚊𝚊 🥹", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case 'only': {
            if (permssion != 1) return api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙲𝚑𝚞̛𝚊 𝙳𝚣𝚊𝚊𝚊 🥹", threadID, messageID);
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』• 𝙾𝙵𝙵 𝙾𝙽𝙻𝚈 𝙱𝙾𝚇", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』• 𝙾𝙽 𝙾𝙽𝙻𝚈 𝙱𝙾𝚇", threadID, messageID);
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
        }
   case 'only':
   case '-o': {
        //---> CODE ADMIN ONLY<---//
        if (permssion != 3) return api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙲𝚑𝚞̛𝚊 𝙳𝚣𝚊𝚊𝚊 🥹", threadID, messageID);
        if (config.adminOnly == false) {
            config.adminOnly = true;
            api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』• 𝙾𝙽 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈", threadID, messageID);
        } else {
            config.adminOnly = false;
            api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』• 𝙾𝙵𝙵 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
    case 'c':
    case 'chat':
    case '-c': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙲𝚑𝚞̛𝚊 𝙳𝚣𝚊𝚊𝚊 🥹", threadID, messageID);
        if (config.adminPersonalOnly == false) {
            config.adminPersonalOnly = true;
            api.sendMessage("『 v 』• 𝙾𝙵𝙵 𝙸𝙱𝚁𝙸𝙴𝙽𝙶", threadID, messageID);
        } else {
            config.adminPersonalOnly = false;
            api.sendMessage("『 𝙰𝚍𝚖𝚒𝚗 』• 𝙾𝙽 𝙾𝙽𝙻𝚈 𝙱𝙾𝚇", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        default: {
          return api.sendMessage("====『 𝙰𝚍𝚖𝚒𝚗 』====\n𝚊𝚍𝚖𝚒𝚗 𝚊𝚍𝚍   ➣ 𝚃𝚑𝚎̂𝚖 𝙽𝚐𝚞̛𝚘̛̀𝚒 𝙺𝚑𝚊́𝚌 𝙻𝚎̂𝚗 𝙰𝚍𝚖𝚒𝚗\n𝚊𝚍𝚖𝚒𝚗 𝚛𝚖     ➣ 𝚇𝚘𝚊́ 𝙱𝚘̉ 𝙰𝚍𝚖𝚒𝚗 𝙽𝚐𝚞̛𝚘̛̀𝚒 𝙺𝚑𝚊́𝚌\n𝚊𝚍𝚖𝚒𝚗 𝚘𝚗𝚕𝚢 ➣ [ 𝚘𝚗 / 𝚘𝚏𝚏 ] 𝙲𝚑𝚒̉ 𝙰𝚍𝚖𝚒𝚗 𝚂𝚞̛̉ 𝙳𝚞̣𝚗𝚐 𝙱𝚘𝚝\n𝚊𝚍𝚖𝚒𝚗 𝚌𝚑𝚊𝚝 ➣ [ 𝚘𝚗 / 𝚘𝚏𝚏 ] 𝙲𝚑𝚒̉ 𝙰𝚍𝚖𝚒𝚗 𝙼𝚘̛́𝚒 𝙲𝚑𝚊𝚝 𝚁𝚒𝚎̂𝚗𝚐 𝚅𝚘̛́𝚒 𝙱𝚘𝚝\n====『 𝙱𝚘𝚡 』====\n𝚋𝚘𝚡 𝚕𝚒𝚜𝚝     ➣ 𝚇𝚎𝚖 𝙳𝚊𝚗𝚑 𝚂𝚊́𝚌𝚑 𝙰𝚍𝚖𝚒𝚗 𝙱𝚘𝚝\n𝚋𝚘𝚡 𝚘𝚗𝚕𝚢     ➣ [ 𝚘𝚗 / 𝚘𝚏𝚏 ] 𝙲𝚑𝚒̉ 𝚀𝚝𝚟 - 𝙰𝚍𝚖𝚒𝚗 𝙼𝚘̛́𝚒 𝚂𝚞̛̉ 𝙳𝚞̣𝚗𝚐 𝙱𝚘𝚝\n====『 𝙽𝚘𝚝𝚎 』====\n𝙷𝚊̃𝚢 𝙼𝚞𝚊 𝙶𝚘́𝚒 𝙿𝚕𝚊𝚗 𝙽𝚎̂́𝚞 𝙼𝚞𝚘̂́𝚗 𝙳𝚞̀𝚗𝚐 𝟺 𝙲𝚑𝚞̛́𝚌 𝙽𝚊̆𝚗𝚐 𝚃𝚛𝚎̂𝚗 𝙽𝚑𝚎́ 😏", threadID, messageID);
        }
    };
        } // tui có cuti hoq? cái cccccccc
