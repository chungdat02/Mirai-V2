const axios = require("axios");
const {
    translate
} = require("bing-translate-api");
module.exports.config = {
    name: "draw",
    version: "beta",
    hasPermssion: 0,
    credits: "D", // api Dương Kun :))
    description: "",
    commandCategory: "tien ich",
    usages: "",
    cooldowns: 8
};
module.exports.run = async function({
    message, args, api, event
}) {
    let prompt = args.join(" ");
    if (!prompt) return api.sendMessage("⚠️ Vui lòng nhập prompt",  event.threadID);
    // Kiểm tra xem prompt có cần dịch sang tiếng Anh không
    if (!isEnglish(prompt)) {
        try {
            // Dịch prompt sang tiếng Anh
            const translation = await translate(prompt, null, "en");
            prompt = translation.translation;
        } catch (error) {
            console.error("Lỗi khi dịch ngôn ngữ:", error);
            return api.sendMessage("Có lỗi xảy ra khi dịch ngôn ngữ",  event.threadID);
        }
    }
    try {
        let aspectRatio = "16:9";
        if (args.length > 1) {
            aspectRatio = args[args.length - 1];
            if (!isValidAspectRatio(aspectRatio)) {
                aspectRatio = "16:9";
            } else {
                prompt = args.slice(0, -1).join(" ");
            }
        }
        const {
            data: imageStream
        } = await axios({
            url: "http://web.duongkum999.tech/ai",
            method: "GET",
            params: {
                prompt,
                style_id: 28,
                    aspect_ratio: aspectRatio
            },
            responseType: "stream"
        });
        imageStream.path = "image.jpg";
        return api.sendMessage({
            attachment: imageStream
        },  event.threadID);
    } catch (err) {
        return api.sendMessage("❗ Đã có lỗi xảy ra, vui lòng thử lại sau:\n%1",  event.threadID);
    }
}

// Hàm kiểm tra xem một chuỗi có chứa ký tự tiếng Anh hay không
function isEnglish(str) {
        return /^[A-Za-z0-9\s]+$/.test(str);
    }
    // Hàm kiểm tra xem một chuỗi có phải là giá trị hợp lệ cho aspect ratio hay không
function isValidAspectRatio(str) {
    const regex = /^\d+:\d+$/;
    return regex.test(str);
}
/// chỉnh sửa 22/06/2023 ///
/// end ///