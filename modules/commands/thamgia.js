module.exports.config = {
 name: "thamgia",
 version: "1.0.0", 
 hasPermssion: 2,
 credits: "cherry",//ntkhang fix :( 
 description: "...",
 commandCategory: "Lệnh admin/qtv", 
 usages: "bủh", 
 cooldowns: 0,
 dependencies: {
   "request": "",
   "fs-extra":"",
   "axios":""
}};
module.exports.handleReply = async ({ event, api, handleReply, Threads }) => {
    var { threadID, messageID, body, senderID } = event;
    var { threadList, author } = handleReply;
    if (senderID != author) return;
    api.unsendMessage(handleReply.messageID);
    if (!body || !parseInt(body)) return api.sendMessage('Lựa chọn của bạn phải là một số.', threadID, messageID);
    if (!threadList[parseInt(body) - 1]) return api.sendMessage("Lựa chọn của bạn không nằm trong danh sách", threadID, messageID);
    else {
        try {
            var threadInfo = threadList[parseInt(body) - 1];
            var { participantIDs } = threadInfo;
            if (participantIDs.includes(senderID)) return api.sendMessage('Bạn đã có mặt trong nhóm này.', threadID, messageID);
            api.addUserToGroup(senderID, threadInfo.threadID, (e) => {
              if (e) api.sendMessage(`Đã cảy ra lỗi: ${e.errorDescription}`, threadID, messageID);
              else api.sendMessage(`Bot đã thêm bạn vào nhóm ${threadInfo.name} rồi nka. Kiểm tra ở mục spam hoặc tin nhắn chờ nếu không thấy box nka.`, threadID, messageID);
            });
        }
        catch (error) {
            return api.sendMessage(`:( Em bị lỗi: ${error}`, threadID, messageID);
        }
    }
};

module.exports. run = async function({ api, event, Threads }) {
    var { threadID, messageID, senderID } = event;
    var allThreads = (await api.getThreadList(500, null, ["INBOX"])).filter(i => i.isGroup),
    msg = `Danh sách tất cả các box bạn có thể tham gia:\n\n`,
    number = 0;
    for (var thread of allThreads) {
        number++;
        msg += `${number}. ${thread.name}\n`;
    }
    msg += `\nReply tin nhắn này kèm số tương ứng với box mà bạn muốn vào.`;
    return api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config. name,
            messageID: info.messageID,
            author: senderID,
            threadList: allThreads
       
        });
    }, messageID);
};
