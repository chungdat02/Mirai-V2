module.exports.config = {
  name: "taixiu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D",
  description: "Chơi tài xỉu",
  commandCategory: "tien ich",
  usages: "[tài/xỉu]",
  cooldowns: 8
};

module.exports.run = async function ({ api, event, args, Currencies }) {
  const { senderID, messageID, threadID } = event;
  const axios = require('axios');
  const fs = require("fs-extra");
  
  const dataMoney = await Currencies.getData(senderID);
  const moneyUser = dataMoney.money;
  
  if (!args[0]) return api.sendMessage("Bạn phải cược tài hoặc xỉu...ngu mà cứ thích cờ bạc", threadID, messageID);
  const choose = args[0];
  if (choose !== 'tài' && choose !== 'xỉu') return api.sendMessage("Chỉ đặt cược tài hoặc xỉu!", threadID, messageID);

  let money = args[1];
  if (money === 'all' || money === 'tất') money = moneyUser;
  
  if (money < 30 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 30$!!!", threadID, messageID);
  if (moneyUser < money) return api.sendMessage(`⚡️Số dư bạn không đủ ${money}$ để có thể chơi`, threadID, messageID);
  
  try {
      const res = await axios.get("http://localhost:2905/docs/game/taixiu");
      const images = [];
      const result = res.data.result;
      const total = res.data.total;
      
      for (let i in res.data.images) {
          const path = __dirname + `/cache/${i}.png`;
          const imgs = await axios.get(`${res.data.images[i]}`, { responseType: "arraybuffer" });
          fs.writeFileSync(path, Buffer.from(imgs.data, "binary"));
          images.push(fs.createReadStream(path));
      }

      if (choose === result) {
          await Currencies.increaseMoney(senderID, parseInt(money * 2));
          api.sendMessage({
              attachment: images,
              body: `•Kết quả: ${result} \n•Tổng: ${total} nút\n•Bạn đã thắng \nĐược: ${money*2}$`
          }, threadID, messageID);
      } else {
          await Currencies.decreaseMoney(senderID, parseInt(money));
          api.sendMessage({
              attachment: images,
              body: `•Kết quả: ${result} \n•Tổng: ${total} nút\n•Bạn đã thua\nMất: ${money}$ `
          }, threadID, messageID);
          for (let i = 0; i < images.length; i++) {
              fs.unlinkSync(__dirname + `/cache/${i}.png`);
          }
      }
  } catch (err) {
      console.log(err);
      return api.sendMessage("Đã xảy ra lỗi", threadID);
  }
};
// fix 22/04/2024
