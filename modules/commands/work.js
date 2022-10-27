module.exports.config = {
    name: "work",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Hung", 
    description: "Làm việc để có tiền, có làm thì mới có ăn",
    commandCategory: "Kiếm Tiền",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 1200000
    }
};
module.exports.languages = {
    "vi": {
        "cooldown": "😷𝗞𝗶𝗲̣̂𝘁 𝗦𝘂̛́𝗰 !!!!   𝗣𝗵𝘂̣𝗰 𝗛𝗼̂̀𝗶 𝗦𝗮𝘂🤕: %1 phút %2 giây."      
    },
    "en": {
        "cooldown": "⚡️You're done, come back later: %1 minute(s) %2 second(s)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
//random coins nhận được khi làm việc ít nhất 200
var coinscn = Math.floor(Math.random() * 100000) + 200; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 170000) + 100; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 300000) + 400; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 200000) + 90; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 50000) + 500; //random coins khi đào đá
var coinsdd1 = Math.floor(Math.random() * 400000) + 1000; //random coins khi đào đá
var coinsex2 = Math.floor(Math.random() * 300000) + 420;
  var coinsktf = Math.floor(Math.random() * 300000) + 4200;
  ///////------------random thêm việc cần làm.-----------------////////
var rdcn = ['𝟭 𝗞𝗶𝗹𝗹', '𝟱 𝗞𝗶𝗹𝗹', '𝟯 𝗞𝗶𝗹𝗹', '𝟭𝟵 𝗞𝗶𝗹𝗹', '𝟴𝟭𝟴 𝗞𝗶𝗹𝗹', '𝟯 𝗞𝗶𝗹𝗹', '𝗧𝗼𝗽𝟭 𝗩𝗼̛́𝗶 𝟬 𝗞𝗶𝗹𝗹'];
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['𝗖𝗮̀𝘆 𝗧𝗵𝘂𝗲̂', '𝗟𝗮𝘂 𝗡𝗵𝗮̀', '𝗶̣ 𝗧𝗵𝘂𝗲̂', '𝗕𝘂𝘀𝗰𝘂', '𝗙𝗶𝘅 𝗠𝗼𝗱𝘂𝗹𝗲𝘀', '𝗗𝗶𝗲̂̃𝗻 𝗞𝗶̣𝗰𝗵', '𝗖𝗼̂𝗻𝗴 𝗖𝗵𝘂́𝗮'];
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['𝗫𝟮 𝗚𝗼̂̃', '𝗫𝟴 𝗚𝗼̂̃', '𝗫𝟭𝟵 𝗚𝗼̂̃', '𝗫𝟭 𝗚𝗼̂̃', '𝗫𝟵𝟵𝟵 𝗚𝗼̂̃', '𝗫𝟭𝟮 𝗚𝗼̂̃', '𝗫𝟰 𝗚𝗼̂̃'];
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

var rdq = ['𝗞𝗶𝗲̂́𝗺 𝗦𝗮̆́𝘁', '𝗞𝗶𝗲̂́𝗺 𝗞𝗶𝗺 𝗖𝘂̛𝗼̛𝗻𝗴', '𝗞𝗶𝗲̂́𝗺 𝗖𝗵𝗶̀', '𝗞𝗶𝗲̂́𝗺 𝗡𝗲𝘁𝗵𝗲𝗿', '𝗞𝗶𝗲̂́𝗺 𝗚𝗼̂̃', '𝗞𝗶𝗲̂́𝗺 𝗩𝗮̀𝗻𝗴', '𝗞𝗶𝗲̂́𝗺 𝗖𝘂'];
var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

var rddd = ['𝗧𝗵𝗮̂́𝘆 𝗖𝗿𝘂𝘀𝗵 𝗕𝘂𝘀𝗰𝘂 𝗕𝗮̣𝗻', '𝗠𝗲̣ 𝗧𝗵𝘂 𝗠𝗮́𝘆', '𝗶̣ 𝗫𝗼𝗻𝗴 𝗛𝗲̂́𝘁 𝗚𝗶𝗮̂́𝘆', '𝗤𝘂𝗲̂𝗻 𝗕𝗮̣̂𝘁 𝗡𝘂́𝘁 𝗡𝗼̂̀𝗶 𝗖𝗼̛𝗺', '𝗕𝗶̣ 𝗕𝗮̆́𝘁 𝗖𝗼́𝗰', '𝗛𝗲̂́𝘁 𝗠𝗮̣𝗻𝗴', '𝗪𝗶𝗳𝗶 𝗛𝗼̉𝗻𝗴'];
var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

var rddd1 = ['𝗚𝗶𝗮́𝗽 𝗦𝗮̆́𝘁', '𝗚𝗶𝗮́𝗽 𝗩𝗮̀𝗻𝗴', '𝗚𝗶𝗮́𝗽 𝗗𝗮', '𝗚𝗶𝗮́𝗽 𝗞𝗶𝗺 𝗖𝘂̛𝗼̛𝗻𝗴', '𝗚𝗶𝗮́𝗽 𝗡𝗲𝘁𝗵𝗲𝗿', '𝗚𝗶𝗮́𝗽 𝗦𝗶𝗲̂𝘂 𝗡𝗵𝗮̂𝗻', '𝗚𝗶𝗮́𝗽 𝗔́𝗰 𝗤𝘂𝘆̉'];
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];

  var rdex1 = ['𝗭𝗼𝗺𝗯𝗶𝗲', '𝗦𝗶𝗲̂𝘂 𝗤𝘂𝗮́𝗶', '𝗡𝗮𝗿𝘂𝘁𝗼', '𝗦𝗼𝗻𝗴𝗼𝗸𝘂', '𝗟𝗲-𝗺𝗶𝗻-𝗵𝗼', '𝗖𝗼̂𝗻𝗴 𝗖𝗵𝘂́𝗮', '𝗛𝗼𝗮̀𝗻𝗴 𝗧𝘂̛̉'];
var work7 = rdex1[Math.floor(Math.random() * rdex1.length)];

var rdktf = ['𝗦𝗮̆́𝘁', '𝗩𝗮̀𝗻𝗴', '𝗧𝗵𝗮𝗻', '𝗖𝗵𝗶̀', '𝗧𝗵𝗮̣𝗰𝗵 𝗔𝗻𝗵', '𝗗𝗮̂̀𝘂', '𝗞𝗶𝗺 𝗖𝘂̛𝗼̛𝗻𝗴', '𝗘𝗻𝘁𝗵𝗲𝗿'];
var work8 = rdktf[Math.floor(Math.random() * rdktf.length)];

var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `𝗕𝗮̣𝗻 𝗖𝗵𝗼̛𝗶 𝗙𝗙 𝗚𝗶𝗲̂́𝘁 𝗖𝗵𝗲̂́𝘁 ${work1} 𝗩𝗮̀ 𝗟𝗮̂́𝘆 𝗩𝗲̂̀ ${coinscn}$` ;await Currencies.increaseMoney(event.senderID, parseInt(coinscn)); break;             
                case "2": msg = `𝗕𝗮̣𝗻 𝗩𝘂̛̀𝗮 𝗟𝗮̀𝗺 𝗩𝗶𝗲̣̂𝗰 ${work2} 𝗩𝗮̀ 𝗧𝗵𝘂 𝗩𝗲̂̀ ${coinsdv}$`; await Currencies.increaseMoney(event.senderID, parseInt(coinsdv)); break;
                case "3": msg = `𝗕𝗮̣𝗻 𝗩𝘂̛̀𝗮 𝗖𝗵𝗮̣̆𝘁 ${work3} 𝗧𝗮̣𝗶 𝗥𝘂̛̀𝗻𝗴 𝗩𝗮̀ 𝗞𝗶𝗲̂́𝗺 𝗩𝗲̂̀ ${coinsmd}$`; await Currencies.increaseMoney(event.senderID, parseInt(coinsmd)); break;
                case "4": msg = `𝗕𝗮̣𝗻 𝗩𝘂̛̀𝗮 𝗥𝗲̀𝗻 ${work4} 𝗩𝗮̀ 𝗡𝗵𝗮̣̂𝗻 𝗩𝗲̂̀ ${coinsq}$`; await Currencies.increaseMoney(event.senderID, parseInt(coinsq)); break;
                case "5": msg = `𝗕𝗮̣𝗻 𝗧𝗵𝗮̂́𝘆 ${work5} 𝗡𝗲̂𝗻 𝗦𝗼̂́𝗰 𝗖𝗵𝗲̂́𝘁 𝗩𝗮̀ 𝗧𝗵𝗮̂̀𝗻 𝗖𝗵𝗲̂́𝘁 𝗖𝗵𝗼 𝗕𝗮̣𝗻 ${coinsdd}$` ; await Currencies.increaseMoney(event.senderID, parseInt(coinsdd)); break;
                case "6": msg = `𝗕𝗮̣𝗻 𝗩𝘂̛̀𝗮 𝗖𝗵𝗲̂́ 𝗧𝗮̣𝗼 ${work6} 𝗩𝗮̀ 𝗧𝗵𝘂 𝗩𝗲̂̀ ${coinsdd1}$`; await Currencies.increaseMoney(event.senderID, parseInt(coinsdd1)); break;
                case "7": msg = `𝗕𝗮̣𝗻 𝗚𝗶𝗲̂́𝘁 𝗖𝗵𝗲̂́𝘁 ${work7} 𝗩𝗮̀ 𝗧𝗵𝘂 𝗩𝗲̂̀ ${coinsex2}$`; await Currencies.increaseMoney(event.senderID, parseInt(coinsex2)); break;
                case "8": msg = `𝗕𝗮̣𝗻 𝗞𝗵𝗮𝗶 𝗧𝗵𝗮́𝗰 ${work8} 𝗩𝗮̀ 𝗞𝗶𝗲̂́𝗺 𝗩𝗲̂̀ ${coinsktf}$`; await Currencies.increaseMoney(event.senderID, parseInt(coinsktf)); break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 𝟏 𝐜𝐨𝐧 𝐬𝐨̂́", event.threadID, event.messageID);
            if (choose > 9 || choose < 1) return api.sendMessage("𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐧𝐚̆̀𝐦 𝐭𝐫𝐨𝐧𝐠 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "𝐔𝐩𝐝𝐚𝐭𝐞 𝐖𝐨𝐫𝐤") {
                msg = "𝐍𝐨 𝐓𝐢𝐦𝐞 𝐔𝐩𝐝𝐚𝐭𝐞";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime cho mỗi lần nhận 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 40000),
            seconds = ((time % 1000) / 1000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("💸== 𝐊𝐢𝐞̂́𝐦 𝐓𝐢𝐞̂̀𝐧 𝐎𝐧𝐥𝐢𝐧𝐞 ==💸" +
                "\n\n1.⚔️ 𝗕𝗮̆́𝗻 𝗙𝗿𝗲𝗲 𝗙𝗶𝗿𝗲" +
                "\n2.🏢 𝗟𝗮̀𝗺 𝗧𝗵𝘂𝗲̂" +
                "\n3.🪵 𝗖𝗵𝗮̣̆𝘁 𝗚𝗼̂̃" +
                "\n4.🛠️ 𝗥𝗲̀𝗻 𝗞𝗶𝗲̂́𝗺" +
                "\n5.📑 𝗧𝗵𝘂̛̉ 𝗧𝗵𝗮́𝗰𝗵" +
                "\n6.⚒️ 𝗥𝗲̀𝗻 𝗚𝗶𝗮́𝗽" +
                "\n7.🗡️ 𝗚𝗶𝗲̂́𝘁  𝗡𝗴𝘂̛𝗼̛̀𝗶🤦" +
                "\n8.⛏️ 𝗞𝗵𝗮𝗶 𝗧𝗵𝗮́𝗰" +
                "\n\n𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘃𝗮̀ 𝗰𝗵𝗼̣𝗻 𝘁𝗵𝗲𝗼 𝘀𝗼̂́" //thêm hiển thị case tại đây ||  \n[number]. [Ngành nghề]" +
            , event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
