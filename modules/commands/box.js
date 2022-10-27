module.exports.config = {
  name: "box",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "HungCho (Khánh Milo Fix)",
  description: "Các cài đặt của nhóm chat.",
  commandCategory: "Tiện Ích",
  usages: "[id/name/setname/emoji/qtv/image/info]",
  cooldowns: 1,
  dependencies: {
    "request": "",
    "fs-extra": "path"
  }
};

const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");

module.exports.handleEvent = async ({
  api,
  event,
  args
}) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
    fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}

module.exports.run = async ({
  api,
  event,
  args,
  Threads,
  Users,
  utils
}) => {
  const request = require("request");
  const {
    resolve
  } = require("path");
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  if (args.length == 0) return api.sendMessage(`━━━━━━━━━━━━━━━\n==『 𝐂𝐎𝐍𝐅𝐈𝐆 𝐁𝐎𝐗 』==\n━━━━━━━━━━━━━━━\n➣『 𝐛𝐨𝐱 𝐬𝐞𝐭𝐪𝐭𝐯 』『 𝐓𝐀𝐆 』• 『 𝐑𝐄𝐏𝐋𝐘 』➣ 𝐁𝐨𝐭 𝐒𝐞̃ 𝐓𝐡𝐞̂𝐦 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐁𝐚̣𝐧 𝐓𝐚𝐠 𝐋𝐞̂𝐧 『 𝐐𝐓𝐕  』\n━━━━━━━━━━━━━━━\n➣『 𝐛𝐨𝐱 𝐢𝐦𝐚𝐠𝐞 』 『 𝐑𝐄𝐏𝐋𝐘 』➣ 𝐓𝐡𝐚𝐲 𝐀̉𝐧𝐡 𝐁𝐨𝐱 𝐐𝐮𝐚 𝐋𝐞̣̂𝐧𝐡 =))\n━━━━━━━━━━━━━━━\n➣『 𝐛𝐨𝐱 𝐧𝐚𝐦𝐞 』➣ 𝐗𝐞𝐦 𝐍𝐚𝐦𝐞 𝐁𝐨𝐱\n━━━━━━━━━━━━━━━\n➣『 𝐛𝐨𝐱 𝐢𝐝 』➣ 𝐋𝐚̂́𝐲 𝐈𝐃 𝐁𝐨𝐱\n━━━━━━━━━━━━━━━\n➣『 𝐛𝐨𝐱 𝐫𝐞𝐧𝐚𝐦𝐞 』➣ 𝐓𝐡𝐚𝐲 𝐍𝐚𝐦𝐞 𝐁𝐨𝐱\n━━━━━━━━━━━━━━━\n➣『 𝐛𝐨𝐱 𝐞𝐦𝐨𝐣𝐢 』➣ 𝐓𝐡𝐚𝐲 𝐁𝐢𝐞̂̉𝐮 𝐓𝐮̛𝐨̛̣𝐧𝐠 𝐁𝐨𝐱`, event.threadID, event.messageID);

  if (args[0] == "id") {
    return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
  }

  if (args[0] == "name") {
    var nameThread = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
    return api.sendMessage(nameThread, event.threadID, event.messageID);
  }

  if (args[0] == "rename") {
    var content = args.join(" ");
    var c = content.slice(7, 99) || event.messageReply.body;
    api.setTitle(`${c} `, event.threadID);
  }

  if (args[0] == "emoji") {
    const name = args[1] || event.messageReply.body;
    api.changeThreadEmoji(name, event.threadID)

  }

  if (args[0] == "me") {
    if (args[1] == "qtv") {
      const threadInfo = await api.getThreadInfo(event.threadID)
      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
      if (!find) api.sendMessage("𝐁𝐨𝐭 𝐂𝐚̂̀𝐧 𝐊𝐞𝐲 𝐁𝐨𝐱 [ 𝐐𝐓𝐕 ]", event.threadID, event.messageID)
      else if (!global.config.ADMINBOT.includes(event.senderID)) api.sendMessage("𝐋𝐞̂𝐧 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨̂̀𝐢 𝐌𝐨̛́𝐢 𝐃𝐮̀𝐧𝐠 𝐍𝐡𝐞́ 𝐁𝐛𝐢 🙈", event.threadID, event.messageID)
      else api.changeAdminStatus(event.threadID, event.senderID, true);
    }
  }

  if (args[0] == "qtv") {
    if (args.join().indexOf('@') !== -1) {
      namee = Object.keys(event.mentions)
    } else namee = args[1]
    if (event.messageReply) {
      namee = event.messageReply.senderID
    }

    const threadInfo = await api.getThreadInfo(event.threadID)
    const findd = threadInfo.adminIDs.find(el => el.id == namee);
    const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
    const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

    if (!finddd) return api.sendMessage("𝐁𝐚̣𝐧 𝐂𝐚̂̀𝐧 𝐊𝐞𝐲 𝐁𝐨𝐱 [ 𝐐𝐓𝐕 ]", event.threadID, event.messageID);
    if (!find) {
      api.sendMessage("𝐁𝐨𝐭 𝐂𝐚̂̀𝐧 𝐊𝐞𝐲 𝐁𝐨𝐱 [ 𝐐𝐓𝐕 ]", event.threadID, event.messageID)
    }
    if (!findd) {
      api.changeAdminStatus(event.threadID, namee, true);
    } else api.changeAdminStatus(event.threadID, namee, false)
  }

  if (args[0] == "image") {
    if (event.type !== "message_reply") return api.sendMessage("𝐁𝐛𝐢 𝐂𝐚̂̀𝐧 𝐏𝐡𝐚̉𝐢 [ 𝐑𝐄𝐏𝐋𝐘 ] 𝐌𝐨̣̂𝐭 𝐀̉𝐧𝐡 𝐍𝐡𝐞́ ☺️", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("𝐁𝐛𝐢 𝐂𝐚̂̀𝐧 𝐏𝐡𝐚̉𝐢 [ 𝐑𝐄𝐏𝐋𝐘 ] 𝐌𝐨̣̂𝐭 𝐀̉𝐧𝐡 𝐍𝐡𝐞́ ☺️", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`𝐁𝐛𝐢 𝐂𝐚̂̀𝐧 𝐏𝐡𝐚̉𝐢 [ 𝐑𝐄𝐏𝐋𝐘 ] 𝐌𝐨̣̂𝐭 𝐀̉𝐧𝐡 𝐍𝐡𝐞́ ☺️`, event.threadID, event.messageID);
    var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  };

  if (args[0] == "info") {
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
    let totalChat = JSON.parse(fs.readFileSync(totalPath));
    let threadInfo = await api.getThreadInfo(event.threadID);
    let timeByMS = Date.now();

    var memLength = threadInfo.participantIDs.length;
    let threadMem = threadInfo.participantIDs.length;
    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(z + gioitinhone)
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else {
        nope.push(nName)
      }
    };
    var nam = gendernam.length;
    var nu = gendernu.length;
    let qtv = threadInfo.adminIDs.length;
    let sl = threadInfo.messageCount;
    let u = threadInfo.nicknames;
    let icon = threadInfo.emoji;

    let threadName = threadInfo.threadName;
    let id = threadInfo.threadID;
    let sex = threadInfo.approvalMode;
    var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';


    if (!totalChat[event.threadID]) {
      totalChat[event.threadID] = {
        time: timeByMS,
        count: sl,
        ytd: 0
      }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
    }

    let mdtt = "Chưa có thống kê";
    let preCount = totalChat[event.threadID].count || 0;
    let ytd = totalChat[event.threadID].ytd || 0;
    let hnay = (ytd != 0) ? (sl - preCount) : "Chưa có thống kê";
    let hqua = (ytd != 0) ? ytd : "Chưa có thống kê";
    if (timeByMS - totalChat[event.threadID].time > _24hours) {
      if (timeByMS - totalChat[event.threadID].time > (_24hours * 2)) {
        totalChat[event.threadID].count = sl;
        totalChat[event.threadID].time = timeByMS - _24hours;
        totalChat[event.threadID].ytd = sl - preCount;
        fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      getHour = Math.ceil((timeByMS - totalChat[event.threadID].time - _24hours) / 3600000);
      if (ytd == 0) mdtt = 100;
      else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
      mdtt += "%";
    }

    var callback = () =>
      api.sendMessage({
        body: `⭐️ 𝐁𝐨𝐱: ${threadName}\n🎮 𝐈𝐃 𝐁𝐨𝐱: ${id}\n📱 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭: ${pd}\n🐰 𝐄𝐦𝐨𝐣𝐢: ${icon}\n📌 𝐓𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧: ${threadMem} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧\n𝐒𝐨̂́ 𝐭𝐯 𝐧𝐚𝐦 🧑‍🦰: ${nam} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧\n𝐒𝐨̂́ 𝐭𝐯 𝐧𝐮̛̃ 👩‍🦰: ${nu} 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧\n🕵️‍♂️ 𝐆𝐨̂̀𝐦 ${qtv} 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧\n💬 𝐓𝐨̂̉𝐧𝐠: ${sl} 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧\n📈 𝐌𝐮̛́𝐜 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜: ${mdtt}\n🌟 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐡𝐨̂𝐦 𝐪𝐮𝐚: ${hqua}\n🌟 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐡𝐨̂𝐦 𝐧𝐚𝐲: ${hnay}\n      === 「${timeNow}」 ===`,
        attachment: fs.createReadStream(__dirname + '/cache/1.png')
      },
        event.threadID,
        () => fs.unlinkSync(__dirname + '/cache/1.png'),
        event.messageID
      );
    return request(encodeURI(`${threadInfo.imageSrc}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
      .on('close', () => callback());
  }
}
