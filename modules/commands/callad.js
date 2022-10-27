module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "của cc khỏi mod",
  description: "thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "Tiện Ích",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
  try {
    var name = (await Users.getData(event.senderID)).name;
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.attachments.length != 0) {
      for (var p of event.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    };
    switch (handleReply.type) {
      case "reply": {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({
              body: "[📲] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ " + name + ":\n[💬] 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: " + (event.body) || "𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶", mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            }));
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: "[📲] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ " + name + ":\n" + (event.body) || "𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗲̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 🧡", attachment: l, mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            }));
            for (var b of s) {
              fs.unlinkSync(b);
            }
          }
        }
        break;
      }
      case "calladmin": {
        if (s.length == 0) {
          api.sendMessage({ body: `[📌] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻 ${name} 𝘁𝗼̛́𝗶 𝗯𝗮̣𝗻:\n\n[💬] 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${(event.body) || "𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 🌸"}\n\n» 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝗴𝘂̛̉𝗶 𝗯𝗮́𝗼 𝗰𝗮́𝗼 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
        }
        else {
          api.sendMessage({ body: `[📌] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻 ${name} 𝘁𝗼̛́𝗶 𝗯𝗮̣𝗻:\n\n[💬] 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${(event.body) || "𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗲̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 🌸"}\n[💌] 𝗧𝗲̣̂𝗽 𝗮𝗱𝗺𝗶𝗻 𝗴𝘂̛̉𝗶 𝘁𝗼̛́𝗶 𝗯𝗮̣𝗻\n\n» 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝗴𝘂̛̉𝗶 𝗯𝗮́𝗼 𝗰𝗮́𝗼 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻`, attachment: l, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
        break;
      }
    }
  }
  catch (ex) {
    console.log(ex);
  }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
  try {
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.messageReply) {
    if (event.messageReply.attachments.length != 0) {
      for (var p of event.messageReply.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    }
  }
    if (!args[0] && event.messageReply.attachments.length == 0)
      return api.sendMessage(`𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗻𝗵𝗮̣̂𝗽 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗰𝗮̂̀𝗻 𝗯𝗮́𝗼 𝗰𝗮́𝗼 📋`,
        event.threadID,
        event.messageID
      );

    var name = (await Users.getData(event.senderID)).name;
    var idbox = event.threadID;

    var datathread = (await Threads.getData(event.threadID)).threadInfo;
    var namethread = datathread.threadName;
    var uid = event.senderID;

    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    var soad = global.config.ADMINBOT.length;
    api.sendMessage(`[👾] - 𝗠𝗲𝗴𝘂𝗿𝗶 𝘃𝘂̛̀𝗮 𝗴𝘂̛̉𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗼̛́𝗶 ${soad} 𝗔𝗱𝗺𝗶𝗻 🍄\n[⏰] - 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`,
      event.threadID,
      () => {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({ body: `📱====[ 𝐂𝐀𝐋𝐋 𝐀𝐃𝐌𝐈𝐍 ]====📱\n\n[👤] 𝗕𝗮́𝗼 𝗰𝗮́𝗼 𝘁𝘂̛̀: ${name}\n[❗] 𝗜𝗗 𝗨𝘀𝗲𝗿 ${uid}\n[👨‍👩‍👧‍👧] 𝗕𝗢𝗫: ${namethread}\n[🔰] 𝗜𝗗 𝗕𝗢𝗫: ${idbox}\n\n[💌] 𝗜𝗻𝗯𝗼𝘅: ${args.join(
              " "
            )}\n[⏰] 𝗧𝗶𝗺𝗲: ${gio}`, mentions: [{ id: event.senderID, tag: name }] },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: `📱===[𝐂𝐀𝐋𝐋 𝐀𝐃𝐌𝐈𝐍]===📱\n\n[👤] 𝗕𝗮́𝗼 𝗰𝗮́𝗼 𝘁𝘂̛̀: ${name}\n[❗] 𝗜𝗗 𝗨𝘀𝗲𝗿 ${uid}\n[👨‍👩‍👧‍👧] 𝗕𝗢𝗫: ${namethread}\n[🔰] 𝗜𝗗 𝗕𝗢𝗫: ${idbox}\n\n[💌] 𝗜𝗻𝗯𝗼𝘅: ${(args.join(
                " "
              )) || "𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗲̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗯𝗮́𝗼 𝗰𝗮́𝗼 ❤️"}\n[⏰] 𝗧𝗶𝗺𝗲: ${gio}\n[📌] 𝗞𝗲̀𝗺 𝘁𝗵𝗲𝗼 𝘁𝗲̣̂𝗽`, attachment: l, mentions: [{ id: event.senderID, tag: name }]
            },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
      }
      , event.messageID);
  }
  catch (ex) {
    console.log(ex);
  }
};
