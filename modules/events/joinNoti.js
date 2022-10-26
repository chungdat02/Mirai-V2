module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
  ////////////////////////////////////////////////////////
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["joinNoti"] != "undefined" && thread["joinNoti"] == false) return;
  ///////////////////////////////////////////////////////
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by Duy" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`Kếт ɴốι тнàɴн côɴԍ 𝓑𝓸𝓁 𝒱𝒿𝓰𝓇𝓸🍭 củᴀ Tʀúc Cuтᴇᴇ !!!\nPʀᴇғιx [ ? ]\nCảм ơɴ мọι ɴԍườι đã sử ᴅụɴԍ ʙoт củᴀ Tʀúc ɴнưɴԍ нạɴ cнế sᴘᴀм và ɴԍнịcн ʙoт ԍιúᴘ мìɴн ɴнé! Có тнể sử ᴅụɴԍ ?cᴀʟʟᴀᴅ để ʟιêɴ ʟạc vớι ᴀᴅмιɴ ʙoт để được ԍιúᴘ đỡ  ɴнᴀ, тнᴀɴκs ᴀʟʟ UwU❤🥺`, attachment: fs.createReadStream(__dirname + "/cache/joinbox/joinbox.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "💗𝙃𝙚𝙡𝙡𝙤 𝙘𝙤𝙣 𝙫𝙤̛̣ {name}💗. \n🐳𝘾𝙝𝙖̀𝙤 𝙢𝙪̛̀𝙣𝙜 đ𝙖̃ đ𝙚̂́𝙣 𝙫𝙤̛́𝙞 {threadName}.\n{type} 𝙡𝙖̀ 𝙩𝙝𝙖̀𝙣𝙝 𝙫𝙞𝙚̂𝙣 𝙩𝙝𝙪̛́ {soThanhVien} 𝙘𝙪̉𝙖 𝙣𝙝𝙤́𝙢. 𝙏𝙪̛𝙤̛𝙣𝙜 𝙩𝙖́𝙘 𝙣𝙝𝙞𝙚̂̀𝙪 𝙫𝙖̀𝙤 𝙣𝙝𝙖 𝙠𝙝𝙤̂𝙣𝙜 𝙡𝙖̀ 𝙖̆𝙣 𝙠𝙞𝙘𝙠 đ𝙖̂́𝙮 ♥" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}