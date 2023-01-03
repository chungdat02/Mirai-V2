module.exports.config = {
    name: "couple",
    version: "beta",
    hasPermssion: 0,
    credits: "",
    description: "Cao Chung Đạt",
    commandCategory: "tien ich",
    usages: "uhmmmm",
    cooldowns: 1
};

module.exports.run = async function ({event, api, Currencies, Threads}){
  const {messageID, threadID} = event;
  const 
    axios = require('axios'),
    fs = require('fs');
  try {
const res = await axios.get(`https://caochungdat.me/docs/images/couple`),
      res1 = await axios.get(`https://caochungdat.me/docs/other/thinh`),
      bokk = res1.data.url,
      url = [];
    for (var i in res.data.url) {
const path = __dirname+`/cache/couple/${i}.jpg`, ///done 
      bok = (await axios.get(`${res.data.url[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, bok);
      url.push(fs.createReadStream(path));
    }
    ////// end cái for ko biết chạy dc ko
    return api.sendMessage({
      attachment: url,
      body: `=== ảnh couple của bạn đây ===\n${bokk}`
    }, threadID, messageID);
  }
  catch (err){
    return api.sendMessage(`loi `, event.threadID);
  }
};
