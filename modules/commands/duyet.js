module.exports.config = {
  name: "duyet",
  version: "1.0.2",
  hasPermssion: 3,
  credits: "DungUwU",
  description: "duyệt box dùng bot xD",
  commandCategory: "Người hỗ trợ bot",
  cooldowns: 5
};
  
  
const dataPath = __dirname + "/cache/approvedThreads.json";
const pendingPath = __dirname + "/cache/pendingThreads.json";
const onPath = __dirname + "/cache/on.json";
const fs = require("fs");

module.exports.onLoad = () => {
    if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
    if (!fs.existsSync(pendingPath)) fs.writeFileSync(pendingPath, JSON.stringify([]));
    if (!fs.existsSync(onPath)) fs.writeFileSync(onPath, JSON.stringify({ uwu : false }, null, 4));
}

module.exports.run = async ({ event, api, args }) => {
    const { threadID, messageID, senderID } = event;
    const moment = require("moment-timezone");
      var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
    let data = JSON.parse(fs.readFileSync(dataPath));
    let pending = JSON.parse(fs.readFileSync(pendingPath));
    let on = JSON.parse(fs.readFileSync(onPath));
    let msg = "";
    let idBox = (args[0]) ? args[0] : threadID;
    if (args[0] == "list") {
      msg = "Danh sách các nhóm được phép sử dụng bot";
      let count = 0;
      for (e of data) {
        msg += `\n${count += 1}. ID: ${e}`;
      }
      api.sendMessage(msg, threadID, messageID);
    }
    else if (args[0] == "del") {
      let threadInfo = await api.getThreadInfo(event.threadID);
    let threadName = threadInfo.threadName;
      idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID, messageID);
      if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID, messageID);
      api.sendMessage(`Box: ${threadName}\nID: ${idBox}\nTime: ${timeNow}\nđã bị gỡ khỏi danh sách được phép dùng bot`, threadID, () => {
        if (!pending.includes(idBox)) pending.push(idBox);
        data.splice(data.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
      }, messageID)
    }
    else if (args[0] == "pending") {
      
      msg = "Danh sách các nhóm đang chờ duyệt!";
      let count = 0;
      for (e of pending) {
        let name = (await api.getThreadInfo(e)).name || "Nhóm Chat";
        msg += `\n${count + 1}. ${name}\nID: ${e}`;
        count++;
      }
      if(count == 0) msg = "Hiện tại không có nhóm nào đang chờ duyệt";
      api.sendMessage(msg, threadID, messageID);
    } else if (args[0] == "on") {
      on.uwu = true;
      fs.writeFileSync(onPath, JSON.stringify(on, null, 4));
      api.sendMessage("» Đã bật duyetbox.\nChỉ có các nhóm đã được duyệt mới có thể sử dụng bot", threadID, messageID);
    } else if (args[0] == "off") {
      on.uwu = false;
      fs.writeFileSync(onPath, JSON.stringify(on, null, 4));
      api.sendMessage("» Đã tắt duyetbox.\nMọi người có thể dùng thoải mái", threadID, messageID);
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("ID bạn nhập không hợp lệ", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`ID ${idBox} đã được phê duyệt từ trước!`, threadID, messageID);
    else api.sendMessage("» Box đã được admin duyệt.\n» Sử dụng bot vui vẻ", idBox, (error, info) => {
      if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
      else {
        data.push(idBox);
        pending.splice(pending.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
        api.sendMessage(`» Phê duyệt thành công box: ${idBox}`, threadID, messageID);
      }
    });
}
