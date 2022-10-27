module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
   const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
 if (type == "tự rời") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`━━━━『 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠 』━━━━\n『 𝐊𝐢́𝐜𝐡 𝐇𝐨𝐚̣𝐭  』     ➣ 𝐂𝐡𝐨̂́𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠  』   ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̂́𝐭 𝐁𝐚̣𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐕𝐚̀𝐨 𝐁𝐨𝐱\n『    𝐔𝐬𝐞𝐫 𝐑𝐨̛̀𝐢    』   ➣  ${name}\n『   𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧   』   ➣ ${timeNow} `, event.threadID)
   } else api.sendMessage(`━━━━『 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠 』━━━━\n『 𝐊𝐢́𝐜𝐡 𝐇𝐨𝐚̣𝐭   』   ➣ 𝐂𝐡𝐨̂́𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『 𝐓𝐢̀𝐧𝐡 𝐓𝐫𝐚̣𝐧𝐠 』   ➣ 𝐓𝐡𝐞̂𝐦 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐁𝐨𝐱\n『    𝐔𝐬𝐞𝐫 𝐑𝐨̛̀𝐢   』   ➣  ${name}\n『   𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧  』   ➣ ${timeNow}『       𝐍𝐨𝐭𝐢        』   ➣ 𝐑𝐨̛̀𝐢 𝐂𝐨𝐧 𝐂𝐚̣̆𝐜 𝐍𝐠𝐨̂̀𝐢 𝐘𝐞̂𝐧 🙂`, event.threadID);
  })
 }
}
