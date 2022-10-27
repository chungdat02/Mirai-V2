module.exports.config = {
	name: "sendmsg",
	version: "1.0.7",
	hasPermssion: 3,
	credits: "manhG", //Vui lòng giữ nguyên credit hoặc ăn đấm !
	description: "Gửi tin hắn đến người dùng(user)/nhóm(thread) bằng ID!",
	commandCategory: "Admin",
	usages: "ID [Text]",
	cooldowns: 5
};

	module.exports.run = async ({ api, event, args, getText }) => {
    const fs = global.nodemodule["fs-extra"];
    const permission = ["100037741424837"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Hihi đừng phá =)", event.threadID, event.messageID);
		if (!args[0]) return api.sendMessage("Bạn chưa nhập nội dung cần gửi",event.threadID,event.messageID);
		if (event.type == "message_reply") {
		const request = global.nodemodule["request"];
		const fs = require('fs')
		const axios = require('axios')
		
		var getURL = await request.get(event.messageReply.attachments[0].url);
		
				var pathname = getURL.uri.pathname;
		
				var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
		
				var path = __dirname + `/cache/snoti`+`.${ext}`;
		
		
		
		var abc = event.messageReply.attachments[0].url;
			let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
		
		  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
		
    
	var idbox = args[0];
    var reason = args.slice(1);

	if (args.length == 0) api.sendMessage("Syntax error, use: sendmsg ID_BOX [lời nhắn]", event.threadID, event.messageID);
	
	else if(reason == "")api.sendMessage("Syntax error, use: sendmsg ID_BOX [lời nhắn]", event.threadID, event.messageID);
	
	else
		api.sendMessage({body:"» Thông báo từ admin tới nhóm bạn «\n\n" + reason.join(" "), attachment: fs.createReadStream(path) }, idbox, () =>
			api.sendMessage(`${api.getCurrentUserID()}`, () =>
				api.sendMessage("Đã gửi lời nhắn: " + reason.join(" "), event.threadID)));
}
	}
