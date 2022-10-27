module.exports.config = {
    name: "fbvideo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nhật UwU",
    description: "fbget audio/video [link video] dạng 1000xxxx/video/idviddeo",
  commandCategory: "Tiện ích",
  usages: "fbget audio/video [link video] dạng 1000xxxx/video/idviddeo",
  cooldowns: 0

};
module.exports.run = async function ({ api, event, args, utils  })  {
    const { commands } = global.client;
    const command = commands.get(this.config.name);
    if (command.config.credits !== 'Nhật UwU') {
        return api.sendMessage('Đã phát hiện modules bị thay đổi, vui lòng đổi lại credits như cũ nếu không muốn bị xóa all module :)', event.threadID, event.messageID);
    }
const axios = global.nodemodule['axios'];  
const fs = global.nodemodule["fs-extra"];
try { 
  if(args[0] == 'audio'){
 let getPorn = (await axios.get(event.attachments[0].playableUrl,{ responseType:'arraybuffer'} )).data;
  fs.writeFileSync(__dirname+`/cache/2.mp3`, Buffer.from(getPorn, "utf-8"));
return api.sendMessage({body : `✅Loaded success✅`, attachment: fs.createReadStream(__dirname+`/cache/2.mp3`)}, event.threadID, () => fs.unlinkSync(__dirname+`/cache/2.mp3`));
    }; 
  } 
    catch { 
      return api.sendMessage("Không thể xử lý yêu cầu!",event.threadID,event.messageID)}
    try { 
      if(args[0] == 'video'){
 let getPorn = (await axios.get(event.attachments[0].playableUrl,{ responseType:'arraybuffer'} )).data;
  fs.writeFileSync(__dirname+`/cache/1.mp4`, Buffer.from(getPorn, "utf-8"));
return api.sendMessage({body : `✅Loaded success✅`, attachment: fs.createReadStream(__dirname+`/cache/1.mp4`)}, event.threadID, () => fs.unlinkSync(__dirname+`/cache/1.mp4`));
    }; 
  } 
  catch 
  {
   return api.sendMessage("Không thể xử lý yêu cầu!",event.threadID,event.messageID)}
  }
