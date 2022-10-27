module.exports.config = {
    name: "checktt", // Tên lệnh, được sử dụng trong việc gọi lệnh
    version: "1.0.1", // phiên bản của module này
    hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
    credits: "DungUwU && Nghĩa", // Công nhận module sở hữu là ai
    description: "Check tương tác ngày/tuần/toàn bộ", // Thông tin chi tiết về lệnh
    commandCategory: "group", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
    usages: "[all/week/day]", // Cách sử dụng lệnh
    cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
    dependencies: {
        "fs": " ",
        "moment-timezone": " "
    }
};

const path = __dirname + '/_checktt/';
const moment = require('moment-timezone');

module.exports.onLoad = () => {
    const fs = require('fs');
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
    }
  setInterval(() => {
    const today = moment.tz("Asia/Ho_Chi_Minh").day();
    const checkttData = fs.readdirSync(path);
    checkttData.forEach(file => {
      let fileData = JSON.parse(fs.readFileSync(path + file));
      if (fileData.time != today) {
        setTimeout(() => {
          fileData = JSON.parse(fs.readFileSync(path + file));
          if (fileData.time != today) {
            fileData.time = today;
            fs.writeFileSync(path + file, JSON.stringify(fileData, null, 4));
          }
        }, 60 * 1000);
      }
    })
  }, 60 * 1000);
}

module.exports.handleEvent = async function ({ api, event, Threads }) {
    if (global.client.sending_top == true) return;
    const fs = global.nodemodule['fs'];
    const { threadID, senderID } = event;
    const today = moment.tz("Asia/Ho_Chi_Minh").day();
  
    if (!fs.existsSync(path + threadID + '.json')) {
        const newObj = {
            total: [],
            week: [],
            day: [],
            time: today
        };
        fs.writeFileSync(path + threadID + '.json', JSON.stringify(newObj, null, 4));
        const threadInfo = await Threads.getInfo(threadID) || {};
        if (threadInfo.hasOwnProperty('isGroup') && threadInfo.isGroup) {
            const UserIDs = threadInfo.participantIDs;
            for (user of UserIDs) {
                if (!newObj.total.find(item => item.id == user)) {
                    newObj.total.push({
                        id: user,
                        count: 0
                    });
                }
                if (!newObj.week.find(item => item.id == user)) {
                    newObj.week.push({
                        id: user,
                        count: 0
                    });
                }
                if (!newObj.day.find(item => item.id == user)) {
                    newObj.day.push({
                        id: user,
                        count: 0
                    });
                }
            }
        }
        fs.writeFileSync(path + threadID + '.json', JSON.stringify(newObj, null, 4));
    }
    const threadData = JSON.parse(fs.readFileSync(path + threadID + '.json'));
    if (threadData.time != today) {
      global.client.sending_top = true;
      setTimeout(() => global.client.sending_top = false, 5 * 60 * 1000);
    }
    const userData_week_index = threadData.week.findIndex(e => e.id == senderID);
    const userData_day_index = threadData.day.findIndex(e => e.id == senderID);
    const userData_total_index = threadData.total.findIndex(e => e.id == senderID);
    if (userData_total_index == -1) {
        threadData.total.push({
            id: senderID,
            count: 1,
        });
    } else threadData.total[userData_total_index].count++;
    if (userData_week_index == -1) {
        threadData.week.push({
            id: senderID,
            count: 1
        });
    } else threadData.week[userData_week_index].count++;
    if (userData_day_index == -1) {
        threadData.day.push({
            id: senderID,
            count: 1
        });
    } else threadData.day[userData_day_index].count++;
    // if (threadData.time != today) {
    //     threadData.day.forEach(e => {
    //         e.count = 0;
    //     });
    //     if (today == 1) {
    //         threadData.week.forEach(e => {
    //             e.count = 0;
    //         });
    //     }
    //     threadData.time = today;
    // }

    fs.writeFileSync(path + threadID + '.json', JSON.stringify(threadData, null, 4));
}

module.exports.run = async function ({ api, event, args, Users, Threads }) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const fs = global.nodemodule['fs'];
    const { threadID, messageID, senderID, mentions } = event;
    if (!fs.existsSync(path + threadID + '.json')) {
        return api.sendMessage("Chưa có dữ liệu", threadID);
    }
    const threadData = JSON.parse(fs.readFileSync(path + threadID + '.json'));
    const query = args[0] ? args[0].toLowerCase() : '';

    var header = '',
        body = '',
        footer = '',
        msg = '',
        count = 1,
        storage = [],
        data = 0;
    if (query == 'all' || query == '-a') {
        header = '====[ 𝐓𝐨̂̉𝐧𝐠 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 𝐓𝐚̂́𝐭 𝐂𝐚̉ ]====';
        data = threadData.total;
    } else if (query == 'week' || query == '-w') {
        header = '====[ 𝐓𝐨̂̉𝐧𝐠 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 𝐓𝐮𝐚̂̀𝐧 ]====';
        data = threadData.week;
    } else if (query == 'day' || query == '-d') {
        header = '====[ 𝐓𝐨̂̉𝐧𝐠 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 𝐍𝐠𝐚̀𝐲 ]====';
        data = threadData.day;
    } else {
        data = threadData.total;
    }
    for (const item of data) {
        const userName = await Users.getNameUser(item.id) || 'Facebook User';
        const itemToPush = item;
        itemToPush.name = userName;
        storage.push(itemToPush);
    };
    let check = ['all', '-a', 'week', '-w', 'day', '-d'].some(e => e == query);
    if (!check && Object.keys(mentions).length > 0) {
        storage = storage.filter(e => mentions.hasOwnProperty(e.id));
    }
    //sort by count from high to low if equal sort by name
    storage.sort((a, b) => {
        if (a.count > b.count) {
            return -1;
        }
        else if (a.count < b.count) {
            return 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    });
    if ((!check && Object.keys(mentions).length == 0) || (!check && Object.keys(mentions).length == 1) || (!check && event.type == 'message_reply')) {
        const UID = event.messageReply ? event.messageReply.senderID : Object.keys(mentions)[0] ? Object.keys(mentions)[0] : senderID;
        const userRank = storage.findIndex(e => e.id == UID);
        const userTotal = threadData.total.find(e => e.id == UID) ? threadData.total.find(e => e.id == UID).count : 0;
        const userTotalWeek = threadData.week.find(e => e.id == UID) ? threadData.week.find(e => e.id == UID).count : 0;
        const userTotalDay = threadData.day.find(e => e.id == UID) ? threadData.day.find(e => e.id == UID).count : 0;
        const nameUID = storage[userRank].name || 'Facebook User';
        const target = UID == senderID ? 'Bạn' : nameUID;
        if (userRank == -1) {
            return api.sendMessage(`${target} chưa có dữ liệu`, threadID);
        }
        body += `━━━━━━━━━━━━━━━\n『𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐇𝐞̣̂ 𝐓𝐡𝐨̂́𝐧𝐠』\n━━━━━━━━━━━━━━━\n👥 𝐓𝐞̂𝐧: ${nameUID}\n『💬』 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐓𝐫𝐨𝐧𝐠 𝐓𝐮𝐚̂̀𝐧: ${userTotalWeek}\n『💬』 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐓𝐫𝐨𝐧𝐠 𝐍𝐠𝐚̀𝐲: ${userTotalDay}\n『📝』 𝐓𝐨̂̉𝐧𝐠: ${userTotal} (『📊』𝐗𝐞̂́𝐩 𝐇𝐚̣𝐧𝐠  ${userRank + 1})
        `.replace(/^ +/gm, '');
    } else {
        body = storage.map(item => {
            return `${count++}. ${item.name} (${item.count})`;
        }).join('\n');
        footer = `↠ 𝐓𝐨̂̉𝐧𝐠 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧: ${storage.reduce((a, b) => a + b.count, 0)}`;
    }

    msg = `${header}\n${body}\n${footer}`;
    api.sendMessage(msg, threadID);
    threadData = storage = null;
    return;
  }
