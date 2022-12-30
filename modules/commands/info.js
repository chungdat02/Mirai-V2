module.exports.config = {
    name: 'i3',
    version: '1.1.1',
    hasPermssion: 0,
    credits: '',
    description: 'Xem thông tin người dùng Facebook',
    commandCategory: 'Tiện ích',
    usages: '[...|tag|reply|uid|username]',
    cooldowns: 2
};
const {
    get
} = require('axios');
const {
    image
} = require('image-downloader');
const {
    createReadStream
} = require('fs-extra');
module.exports.run = async function({
    api, event, args, Threads, Currencies
}) {
    try {      
        var uqID = event.type == 'message_reply' ? event.messageReply.senderID: Object.keys(event.mentions).length != 0 ? Object.keys(event.mentions)[0]: !!args[0] && !!args[0] ? args[0]: event.senderID;
        uqID = await get(`https://caochungdat.me/docs/facebook/timejoin?user=${uqID}`);
        const {threadInfo = {adminIDs: []}} = await Threads.getData(event.threadID) || {};
        const ban = global.data.userBanned.has(uqID.data.data.uid) ?  "Đang bị cấm" : "Không bị cấm";
        var permission;
        if (global.config.ADMINBOT.includes(uqID.data.data.uid)) permission = `ADMIN Bot`; else if (threadInfo.adminIDs.some(i => i.id == uqID.data.data.uid)) permission = `Quản Trị Viên Nhóm`; else permission = `Thành Viên Nhóm`;
        const ciesData = await Currencies.getData(uqID.data.data.uid);
        const userInfo = await api.getUserInfo(uqID.data.data.uid);
        const res = await get(`https://caochungdat.me/docs/facebook/info?uid=${uqID.data.data.uid}`);// api info nhá
        const {name,link_profile,uid,first_name,web,gender,relationship_status,love,birthday,follower,avatar,tichxanh,location,hometown,username,about,locale} = res.data || {};
        const dest = `${__dirname}/cache/testt.png`;
        await image({
            url: avatar, dest
        });
        api.sendMessage({
            body: `
=== 𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ===
━━━━━━━━━━━━━━━━━━
→ Tên: ${first_name}
→ Tên đầy đủ: ${name}
→ Giới tính: ${gender}
→ Ngày sinh: ${birthday}
→ Đến từ: ${hometown}
→ Sống tại: ${location}
→ Vùng/miền: ${locale}
→ Mối quan hệ: ${relationship_status} ${!relationship_status|| !love ? '': `với ${love}`}
→ Trang Web: ${web}
→ Tích xanh: ${tichxanh}
→ Mã ID: ${uid}
→ Tên ID: ${username}
→ Liên kết TCN: ${link_profile}
→ Có ${localeNum(follower)} người theo dõi
→ Tham gia facebook vào: ${uqID.data.data.date}
→ Giới thiệu: ${about}
==========================
→ Trạng thái: ${userInfo[uqID.data.data.uid].isFriend ? 'Có': 'Không'} kết bạn với bot
→ Tổng tin nhắn: ${localeNum(ciesData.exp)} tin
→ Money trên bot: ${localeNum(ciesData.money)}$
→ Chức vụ trong nhóm: ${permission}
→ Kiểm tra cấm: ${ban} dùng bot
`.replace(/null|undefined/g, 'Không có dữ liệu!').replace(/false/g, 'Không có').replace(/true/g, 'Có tích'), attachment: createReadStream(dest)
        }, event.threadID, event.messageID);
    }catch(e) {
        api.sendMessage(`${e}`, event.threadID, event.messageID);
       console.log(e)
    };
};
function localeNum(a){
    return (a.toLocaleString()).replace(/\,/g, '.');
};
