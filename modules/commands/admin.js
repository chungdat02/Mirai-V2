module.exports.config = {
	name: "admin",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "MiraicommandCategory Team",
	description: "QuαΊ£n lΓ½ admin bot",
	commandCategory: "πππ¦π’π§",
	usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '====γ π°ππππ γ==== \n\n%1\n\n====γ πππππππ γ==== \n\n%2',
        "notHavePermssion": 'γ π°ππππ γπΌππ πΆπΜπ πΏπππ π²ππΜπ π³π£πππ π₯Ή "%1"',
        "addedNewAdmin": 'γ π°ππππ γβ’ πππΜΜπ π·πΜππ πππΜππ πππ’πΜΜπ π°ππππ\n%2',
        "removedAdmin": 'γ π°ππππ γβ’ πππΜΜπ π·πΜππ π·πΜ£ πππ’πΜΜπ π°ππππ\n%2'
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
          if (permssion != 3) return api.sendMessage("List Admin Tuyα»t MαΊ­t KhΓ΄ng Thα» Lα» NΓͺn ThΓ΄ng CαΊ£m NhΓ© <3", threadID, messageID);
            listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`π½π°πΌπ΄    β£ ${name}\nππΈπ³      β£   fb.me/${idAdmin}`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`π½π°πΌπ΄    β£ ${name1}\nππΈπ³      β£   fb.me/${idNDH}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n"), msg1.join("\n")), threadID, messageID);
        }
        
        case "add": {
            if (event.senderID != 100002326790705) return api.sendMessage(`π π’ππ - CαΊ§n quyα»n Admin chΓ­nh Δα» thα»±c hiα»n lα»nh`, event.threadID, event.messageID)
            if (permssion != 3 ) return api.sendMessage("γ π°ππππ γπΌππ πΆπΜπ πΏπππ π²ππΜπ π³π£πππ π₯Ή", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] Β» ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `\nπ½π°πΌπ΄    β£ ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (event.senderID != 100002326790705) return api.sendMessage(`π π’ππ - CαΊ§n quyα»n Admin Δα» thα»±c hiα»n`, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage("γ π°ππππ γπΌππ πΆπΜπ πΏπππ π²ππΜπ π³π£πππ π₯Ή", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] Β» ${event.mentions[id]}`);
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
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] Β» ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case 'only': {
            if (permssion != 1) return api.sendMessage("γ π°ππππ γπΌππ πΆπΜπ πΏπππ π²ππΜπ π³π£πππ π₯Ή", threadID, messageID);
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("γ π°ππππ γβ’ πΎπ΅π΅ πΎπ½π»π π±πΎπ", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("γ π°ππππ γβ’ πΎπ½ πΎπ½π»π π±πΎπ", threadID, messageID);
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
        }
   case 'only':
   case '-o': {
        //---> CODE ADMIN ONLY<---//
        if (permssion != 3) return api.sendMessage("γ π°ππππ γπΌππ πΆπΜπ πΏπππ π²ππΜπ π³π£πππ π₯Ή", threadID, messageID);
        if (config.adminOnly == false) {
            config.adminOnly = true;
            api.sendMessage("γ π°ππππ γβ’ πΎπ½ π°π³πΌπΈπ½ πΎπ½π»π", threadID, messageID);
        } else {
            config.adminOnly = false;
            api.sendMessage("γ π°ππππ γβ’ πΎπ΅π΅ π°π³πΌπΈπ½ πΎπ½π»π", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
    case 'c':
    case 'chat':
    case '-c': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("γ π°ππππ γπΌππ πΆπΜπ πΏπππ π²ππΜπ π³π£πππ π₯Ή", threadID, messageID);
        if (config.adminPersonalOnly == false) {
            config.adminPersonalOnly = true;
            api.sendMessage("γ v γβ’ πΎπ΅π΅ πΈπ±ππΈπ΄π½πΆ", threadID, messageID);
        } else {
            config.adminPersonalOnly = false;
            api.sendMessage("γ π°ππππ γβ’ πΎπ½ πΎπ½π»π π±πΎπ", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        default: {
          return api.sendMessage("====γ π°ππππ γ====\nπππππ πππ   β£ πππΜπ π½ππΜπΜΜπ πΊππΜπ π»πΜπ π°ππππ\nπππππ ππ     β£ πππΜ π±πΜ π°ππππ π½ππΜπΜΜπ πΊππΜπ\nπππππ ππππ’ β£ [ ππ / πππ ] π²ππΜ π°ππππ ππΜΜ π³πΜ£ππ π±ππ\nπππππ ππππ β£ [ ππ / πππ ] π²ππΜ π°ππππ πΌπΜΜπ π²πππ πππΜππ ππΜΜπ π±ππ\n====γ π±ππ‘ γ====\nπππ‘ ππππ     β£ πππ π³πππ ππΜππ π°ππππ π±ππ\nπππ‘ ππππ’     β£ [ ππ / πππ ] π²ππΜ πππ - π°ππππ πΌπΜΜπ ππΜΜ π³πΜ£ππ π±ππ\n====γ π½πππ γ====\nπ·πΜπ’ πΌππ πΆπΜπ πΏπππ π½πΜΜπ πΌππΜΜπ π³πΜππ πΊ π²ππΜΜπ π½πΜππ πππΜπ π½ππΜ π", threadID, messageID);
        }
    };
        } // tui cΓ³ cuti hoq? cΓ‘i cccccccc
