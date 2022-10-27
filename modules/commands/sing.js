module.exports.config = {
	name: "sing",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Horizon",
	description: "Phát nhạc thông qua link YouTube, SoundCloud hoặc từ khoá tìm kiếm",
	commandCategory: "music",
	usages: "sing [Text]",
	cooldowns: 0,
	envConfig: {
		"YOUTUBE_API": "AIzaSyCXtsOpIMInU5TOWkz0b2xjqwbx0aLUKJw",
		"SOUNDCLOUD_API": "M4TSyS6eV0AcMynXkA3qQASGcOFQTWub"
	}
};
const keyapi = "AIzaSyBIAKhLQHbxH6S-nAlVZ7eD1gz3C0U5ixU";
module.exports.handleReply = async function({ api, event, handleReply }) {
	const ytdl = require("ytdl-core");
	if (isNaN(event.body)) return api.sendMessage("🎵𝑹𝒆𝒑𝒍𝒚 𝑻𝑵 𝒏𝒂̀𝒚 𝒕𝒉𝒆𝒐 𝒔𝒐̂́ 𝒄𝒖̉𝒂 𝒃𝒂̀𝒊 𝒉𝒂́𝒕 𝒎𝒂̀ 𝒃𝒂̣𝒏 𝒎𝒖𝒐̂́𝒏 𝒄𝒉𝒐̣𝒏!",event.threadID,event.messageID);
	const { createReadStream, createWriteStream, unlinkSync, statSync,readFileSync,writeFileSync } = require("fs-extra");
	 const { join } = require("path");
	const axios = require("axios"); 
	//var { data:Res } = await axios.get("http://localhost:1337/api/f-apis/3");
		// var x = await Res.data.attributes.Api;
	let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${handleReply.link[event.body - 1]}&key=${keyapi}`)).data;
	let title = datac.items[0].snippet.title;
    api.sendMessage(title,event.threadID);
	try {   
		await ytdl(handleReply.link[event.body - 1],{ filter: 'audioonly'})
			.pipe(createWriteStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`))
			.on("close", () => {
				if (statSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`).size > 26000000) return api.sendMessage('⚡𝑩𝒂̀𝒊 𝒏𝒂̀𝒚 𝒒𝒖𝒂́ 𝒅𝒂̀𝒊 𝒃𝒐𝒕 𝒌𝒉𝒐̂𝒏𝒈 𝒕𝒉𝒆̂̉ 𝒈𝒖̛̉𝒊 đ𝒖̛𝒐̛̣𝒄, Đ𝒐̂̉𝒊 𝒃𝒂̀𝒊 đ𝒊 𝒏𝒉𝒆́!', event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`), event.messageID);
				else return api.sendMessage({body: `${title}`,attachment: createReadStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`)}, event.threadID, event.messageID);
			})
			.on("error", (error) => api.sendMessage(`Lỗi : \n${error}`, event.threadID, event.messageID));
		}
	catch (e) {
		console.log(e)
		api.sendMessage("⚡𝑲𝒉𝒐̂𝒏𝒈 𝒕𝒉𝒆̂̉ 𝒔𝒖̛̉ 𝒍𝒚́ 𝒚𝒆̂𝒖 𝒄𝒂̂̀𝒖 𝒏𝒂̀𝒚 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏!", event.threadID, event.messageID);
	}
	return api.unsendMessage(handleReply.messageID);
};

module.exports.run = async function({ api, event, args,help }) {
		const { createReadStream, createWriteStream, unlinkSync, statSync,readFileSync,writeFileSync } = require("fs-extra");
	 const { join } = require("path");
	 const axios = require("axios");
	//var { data:Res } = await axios.get("http://localhost:1337/api/f-apis/3");
		//var x = await Res.data.attributes.Api;
	const ytdl = require("ytdl-core");
	const YouTubeAPI = require("simple-youtube-api");
	const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
	
	if (args.length == 0 || !args) return api.sendMessage('⚡𝑩𝒂̣𝒏 𝒎𝒖𝒐̂́𝒏 𝒕𝒊̀𝒎 𝒃𝒂̀𝒊 𝒉𝒂́𝒕 𝒕𝒆̂𝒏 𝒈𝒊̀ 𝒕𝒉𝒊̀ 𝒑𝒉𝒂̉𝒊 𝒈𝒉𝒊 𝒓𝒐̃ 𝒏𝒉𝒆́!', event.threadID, event.messageID);
	const keywordSearch = args.join(" ");
	const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
	const urlValid = videoPattern.test(args[0]);
	
	if (urlValid) {
		try { 
			var id = args[0].split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            (id[2] !== undefined) ? id = id[2].split(/[^0-9a-z_\-]/i)[0] : id = id[0];
			ytdl(args[0])
				.pipe(createWriteStream(__dirname + `/cache/${id}.m4a`))
				.on("close", () => {
					if (statSync(__dirname + `/cache/${id}.m4a`).size > 26214400) return api.sendMessage('⚡𝑩𝒂̀𝒊 𝒏𝒂̀𝒚 𝒒𝒖𝒂́ 𝒅𝒂̀𝒊 𝒃𝒐𝒕 𝒌𝒉𝒐̂𝒏𝒈 𝒕𝒉𝒆̂̉ 𝒈𝒖̛̉𝒊 đ𝒖̛𝒐̛̣𝒄, Đ𝒐̂̉𝒊 𝒃𝒂̀𝒊 đ𝒊 𝒏𝒉𝒆 🥺', event.threadID, () => unlinkSync(__dirname + `/cache/${id}.m4a`), event.messageID);
					else{
						 api.sendMessage({attachment: createReadStream(__dirname + `/cache/${id}.m4a`)}, event.threadID, event.messageID)
							thisThread.listmusic.push(id);
								writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
					}
				})
				.on("error", (error) => api.sendMessage(`Đã xảy ra vấn đề khi đang xử lý yêu cầu :V, lỗi: \n${error}`, event.threadID, event.messageID));
		}
		catch (e) {
			console.log(e);
			api.sendMessage("⚡𝑲𝒉𝒐̂𝒏𝒈 𝒕𝒉𝒆̂̉ 𝒔𝒖̛̉ 𝒍𝒚́ 𝒚𝒆̂𝒖 𝒄𝒂̂̀𝒖 𝒏𝒂̀𝒚 🥺", event.threadID, event.messageID);
		}
	}
	else {
		try {
			var link = [], msg = "", num = 0;
			var results = await youtube.searchVideos(keywordSearch,7);	
			for (let value of results) {
				if (typeof value.id == 'undefined') return;
				link.push(value.id);
				 var linkd = "https://www.youtube.com/watch?v=" + value.id;
				 let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
				 let gettime = datab.items[0].contentDetails.duration;
				 let time = (gettime.slice(2));
				 let time2 = ""
				 if (time.includes('𝑯')) time2 = time.replace("𝑯", " 𝑮𝒊𝒐̛̀ ")
				 var haha = time.replace("𝑴", " 𝑷𝒉𝒖́𝒕 ");
				 var haha2 = haha.replace("𝑺", " 𝑮𝒊𝒂̂𝒚 ")
				 let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
				 let channel = datac.items[0].snippet.channelTitle;
				msg += (`༺ ${num+=1} ༻ ${value.title}\n⏱️: ${haha2}\n🎵 : ${channel}\n🎵━━━━━━•🎧• ━━━━━🎶\n`);
			}
			return api.sendMessage(`𝑪𝒐́
 ༺ ${link.length} ༻ 𝑲𝒆̂́𝒕 𝒒𝒖𝒂̉
 \n━━━━━━━ •♬• ━━━━━━━\n${msg}📌𝑹𝒆𝒑𝒍𝒚 𝑻𝑵 𝒏𝒂̀𝒚 𝒕𝒉𝒆𝒐 𝒔𝒐̂́ 𝒄𝒖̉𝒂 𝒃𝒂̀𝒊 𝒉𝒂́𝒕 𝒎𝒂̀ 𝒃𝒂̣𝒏 𝒎𝒖𝒐̂́𝒏 𝒄𝒉𝒐̣𝒏 `, event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, link: link }), event.messageID);
		}
		catch (error) {
			api.sendMessage("⚡𝑲𝒉𝒐̂𝒏𝒈 𝒕𝒉𝒆̂̉ 𝒙𝒖̛̉ 𝒍𝒚́ 𝒓𝒆𝒒𝒖𝒆𝒔𝒕 𝒅𝒐 𝒅𝒂̃ 𝒑𝒉𝒂́𝒕 𝒔𝒊𝒏𝒉 𝒍𝒐̂̃𝒊: " + error.message, event.threadID, event.messageID);
		}
	}
}
