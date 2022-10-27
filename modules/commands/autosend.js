module.exports.config = {
    name: 't01',
    version: 'beta',
    hasPermssion: 0,
    credits: 'DC-Nam',// Bok idea thời tiết
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Nhóm messenger',
    usages: '[]',
    cooldowns: 3
};
const nam = [{
    timer: '7:30:00 AM',
    message: ['\n{abc}']
},
             {
    timer: '11:50:00 PM',
    message: ['khuya rồi ngủ sớm đi. Baiiii']
}];
module.exports.onLoad = o => setInterval(async() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())){
     const axios = require('axios');
  const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI('Hồ Chí Minh')}`);
    var abc = `Thời tiết tại ${res.data[0].location.name}\n${res.data[0].current.day} ${res.data[0].current.date}\nNhiệt độ: ${res.data[0].current.temperature}°${res.data[0].location.degreetype}\nMô tả: ${res.data[0].current.skytext}\nĐộ ẩm: ${res.data[0].current.humidity}\nHướng gió: ${res.data[0].current.winddisplay}\nGhi nhận lúc: ${res.data[0].current.observationtime} từ trạm vũ trụ Bok :)`;
      
   global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message).replace(/{abc}/g, abc), i));
    };
}, 1000);

module.exports.run = async o => {
  try{
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const { api, event, args } = o;
	const { threadID, messageID } = event;
  var bok = args.join(" ");
  if(!bok) return api.sendMessage("nhập tỉnh/tp cần xem thời tiết", threadID);
  const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(bok)}`);
  const bokk = res.data[0].forecast;
  var text = `Thời tiết của: ${bok} vào các ngày`;
  for (let i = 0; i < 5; i++) {
    text += `\n${i+1}-> ${bokk[i].day} ${bokk[i].date}\n=>Nhiệt độ dự báo: từ ${bokk[i].low} đến ${bokk[i].high}\n=>Mô tả: ${bokk[i].skytextday}\n=>Tỷ lệ mưa: ${bokk[i].precip}\n`
  };
  api.sendMessage(text, threadID, messageID)
  }catch(err){api.sendMessage(`${err}`, threadID)}
  }
