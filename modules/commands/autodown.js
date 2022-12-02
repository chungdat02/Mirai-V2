const fs = require("fs-extra"),
    axios = require("axios")
module.exports.config = {
    name: "autodown",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "",
    description: "Tự động tải xuống ảnh/video trong nhóm",
    commandCategory: "group",
    usages: "autodown",
    cooldowns: 5
}
module.exports.run = async function () { }

module.exports.handleEvent = async function ({ api, event }) {
    if (this.checkLink(event.body)) {
        var { type, url } = this.checkLink(event.body);
        this.downLoad(url, type, api, event);
    }
}

module.exports.downLoad = function (url, type, api, event) {
    var time = Date.now();
    var path = __dirname + `/cache/${time}.${type}`;
    this.getLink(url).then(res => {
        if (type == 'mp4') url = res.result.video.hd || res.result.video.sd || res.result.video.nowatermark || res.result.video.watermark;
        else if (type == 'mp3') url = res.result.music.play_url
        axios({
            method: "GET",
            url: url,
            responseType: "arraybuffer"
        }).then(res => {
            fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
            if (fs.statSync(path).size / 1024 / 1024 > 25) return api.sendMessage("File quá lớn, không thể gửi", event.threadID, () => fs.unlinkSync(path), event.messageID);
            api.sendMessage({
                attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);
        });
    }).catch(err => console.log(err));
}

module.exports.getLink = function (url) {
    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url: `https://nguyenmanh.name.vn/api/autolink?url=${url}&apikey=2rNF2liL`
        }).then(res => resolve(res.data)).catch(err => reject(err));
    });
}

module.exports.checkLink = function (url) {
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    const found = (url).match(regex);
    var media = ['tiktok', 'facebook', 'douyin', 'youtube', 'youtu', 'twitter', 'instagram', 'kuaishou', 'fb']
    if (this.isVaildUrl(String(found))) {
        if (media.some(item => String(found).includes(item))) {
            return {
                type: "mp4",
                url: String(found)
            };
        }
        else if (String(found).includes("soundcloud") || String(found).includes("zingmp3")) {
            return {
                type: "mp3",
                url: String(found)
            }
        }
    }
    return !1;
}

module.exports.isVaildUrl = function (url) {
    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (url.match(regex) == null) return !1;
    return !0;
}
/// hmmm 
