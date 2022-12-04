/* tôi sẽ update bản có tiktok post và tiktok trending sau */
module.exports.config = {
    name: "tiktok",
    version: "1.1.12",
    hasPermssion: 0,
    credits: "",
    description: "",
    commandCategory: "media",
    usages: "",
    cooldowns: 5,
    dependencies: {"axios": ""}
};
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];
const downloader = require('image-downloader')
	// khai báo trên đầu đi mấy cái dưới đỡ phải khái báo lại
module.exports.run = async function ({ event, api, args, Users, Threads }) {
try {
    const { threadID, messageID, senderID, body } = event;
    switch (!args[0] ?'':args[0].toLowerCase()) {
  case "video":
    case "v":{
       const link = args[1];
      if (!link) return api.sendMessage("link ???", threadID);
const res = await axios.get(`https://caochungdat.me/docs/tiktok/downloader?url=${link}`);
const url = res.data.data.play;
  const str = res.data.data.title;
const hastag = str.split(' ').filter(i => i.startsWith('#')).join(', ');
       var callback = () => api.sendMessage({body:`-->hastag: ${hastag}\n-->ID: ${res.data.data.author.unique_id}\n-->Tên kênh: ${res.data.data.author.nickname}\n-->Tym: ${res.data.data.digg_count}\n-->Cmt:${res.data.data.comment_count}`,attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp4"),event.messageID);
	 return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/tkvd.mp4')).on('close',() => callback());  
    }  
      break;
  case "music":
   case "m":
   case "audio":
   case "a":{
    const link = args[1];
          if (!link) return api.sendMessage("link đâu", threadID);
const res = await axios.get(`https://caochungdat.me/docs/tiktok/downloader?url=${link}`);
var url = res.data.data.music;
       var callback = () => api.sendMessage({body:`Nhạc dùng từ:\n-->ID: ${res.data.data.music_info.id}-->${res.data.data.music_info.author}\n-->${res.data.data.music_info.title}`,attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp3"),event.messageID);
	 return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/tkvd.mp3')).on('close',() => callback());  
    }
      break;
    
    case "info":
    case "i":{
      const username = args[1];
      if (!username) return api.sendMessage("con mẹ m info đâu", threadID);
       const res = await axios.get(`https://caochungdat.me/docs/tiktok/infouser?user=${username}`);
      var url1 = res.data.data.user.avatarLarger;
  var callback = () => api.sendMessage({body:`Name:${res.data.data.user.nickname}\nTiểu sử: ${res.data.data.user.signature}\nFL:${res.data.data.stats.followerCount}\nĐang fl:${res.data.data.stats.followingCount}\nThích:${res.data.data.stats.heart}\nSố video:${res.data.data.stats.videoCount}`,attachment: fs.createReadStream(__dirname + "/cache/tkinfo.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkinfo.png"),event.messageID);
	 return request(encodeURI(`${url1}`)).pipe(fs.createWriteStream(__dirname+'/cache/tkinfo.png')).on('close',() => callback());  
   }
  break; 

  case "search":
  case "s":{
      const search = args[1];
      if (!search) return api.sendMessage("Bạn chưa nhập từ khóa", threadID);
  const res = await axios.get(`https://caochungdat.me/docs/tiktok/search?keywords=${search}`);
   const BoK = res.data.data.videos;
    var text = '';
    for ( let i = 0; i < 10; i++) {
      text += `\n${i+1}. ${BoK[i].music_info.author}\nVới:\n=>${BoK[i].play_count} lượt xem\n=>${BoK[i].download_count}\n`;
    };
    text += `\nreply 1 - 10 để chọn`;
    api.sendMessage(text, event.threadID, (error, msg) => global.client.handleReply.push({
       name: this.config.name,
       messageID: msg.messageID,
       author: senderID, BoK
    }));
}; break;
default: api.sendMessage(`==> vd ( video/v)
==> music (music/audio/a/m)
==> info ( i/info)
==> search ( search/s)`, threadID)
}
}catch(e){
    api.sendMessage(`${e}`,threadID);
}
}
        
module.exports.handleReply = async function({ handleReply, api, event }){
  const { threadID, messageID, senderID, body } = event;
  if (senderID != handleReply.author) return api.sendMessage(`Phá cái lol ne`, threadID);
   const {
       play, title, region
   } = handleReply.BoK[event.args[0]-1];
   const dest = __dirname + '/cache/search_vd.mp4'; 
   api.sendMessage({body:`-->tải video\n ờ: ${title}\nQuốc gia: ${region} \nhoàn tất-->`, attachment: await download(play, dest)}, threadID);
};
async function download(url, dest){
    await downloader.image({url, dest});
    return fs.createReadStream(dest);
};
