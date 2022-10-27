
const fs = require("fs");
const moment = require('moment-timezone');
module.exports.config = {
	name: "datlich", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "DungUwU && TruongMini + ThNghia", // Công nhận module sở hữu là ai
	description: "", // Thông tin chi tiết về lệnh
	commandCategory: "Tiện ích", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "[text]/[time]", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	dependencies: {
	}, //Liệt kê các package module ở ngoài tại đây để khi load lệnh nó sẽ tự động cài
	cooldowns: 5
};

//FUNCTION HOẠT ĐỘNG NHƯ CÁI TÊN CỦA NÓ, CRE: DUNGUWU
const monthToMSObj = {
	1: 31 * 24 * 60 * 60 * 1000,
	2: 28 * 24 * 60 * 60 * 1000,
	3: 31 * 24 * 60 * 60 * 1000,
	4: 30 * 24 * 60 * 60 * 1000,
	5: 31 * 24 * 60 * 60 * 1000,
	6: 30 * 24 * 60 * 60 * 1000,
	7: 31 * 24 * 60 * 60 * 1000,
	8: 31 * 24 * 60 * 60 * 1000,
	9: 30 * 24 * 60 * 60 * 1000,
	10: 31 * 24 * 60 * 60 * 1000,
	11: 30 * 24 * 60 * 60 * 1000,
	12: 31 * 24 * 60 * 60 * 1000
}
const checkTime = (time) => new Promise((resolve) => {
	time.forEach((e, i) => time[i] = parseInt(String(e).trim()));
	const getDayFromMonth = (month) => (month == 0) ? 0 : (month == 2) ? (time[2] % 4 == 0) ? 29 : 28 : ([1, 3, 5, 7, 8, 10, 12].includes(month)) ? 31 : 30;
	if (time[1] > 12 || time[1] < 1) resolve("Tháng của bạn có vẻ không hợp lệ");
	if (time[0] > getDayFromMonth(time[1]) || time[0] < 1) resolve("Ngày của bạn có vẻ không hợp lệ");
	if (time[2] < 2022) resolve("Bạn sống ở kỷ nguyên nào thế?");
	if (time[3] > 23 || time[3] < 0) resolve("Giờ của bạn có vẻ không hợp lệ");
	if (time[4] > 59 || time[3] < 0) resolve("Phút của bạn có vẻ không hợp lệ");
	if (time[5] > 59 || time[3] < 0) resolve("Giây của bạn có vẻ không hợp lệ");
	yr = time[2] - 1970;
	yearToMS = (yr) * 365 * 24 * 60 * 60 * 1000;
	yearToMS += ((yr - 2) / 4).toFixed(0) * 24 * 60 * 60 * 1000;
	monthToMS = 0;
	for (let i = 1; i < time[1]; i++) monthToMS += monthToMSObj[i];
	if (time[2] % 4 == 0) monthToMS += 24 * 60 * 60 * 1000;
	dayToMS = time[0] * 24 * 60 * 60 * 1000;
	hourToMS = time[3] * 60 * 60 * 1000;
	minuteToMS = time[4] * 60 * 1000;
	secondToMS = time[5] * 1000;
	oneDayToMS = 24 * 60 * 60 * 1000;
	timeMs = yearToMS + monthToMS + dayToMS + hourToMS + minuteToMS + secondToMS - oneDayToMS;
	resolve(timeMs);
});

//DEFINE PATH
const path = __dirname + '/cache/datlich.json';

module.exports.run = async function ({ api, event, args, Users }) {
	//DEFINE DEFINE AND DEFINE...
	const { threadID, messageID, senderID: ID } = event;
	/*smol check*/
	if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}, null, 4));
	var data = JSON.parse(fs.readFileSync(path));

	args = args.join(" ").split("|");
	/*another smol check*/
	if (!args[0]) return api.sendMessage("Bạn phải nhập lý do đặt lịch", threadID, messageID);
	if (!args[1]) return api.sendMessage("Bạn phải nhập thời gian đặt lịch", threadID, messageID);

	var date = args[1].split("_");

	// CHECK CHECK CHECK
	if (date[0].split("/").length != 3 || date[1].split(":").length != 3) return api.sendMessage("Bạn phải nhập đúng định dạng NGÀY/THÁNG/NĂM_GIỜ:PHÚT:GIÂY", threadID, messageID);

	var timeInput = [...date[0].split("/"), ...date[1].split(":")];
	timeInput.forEach((e, i) => timeInput[i] = parseInt(e));
	var timeVN = moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY_HH:mm:ss');
	timeVN = timeVN.split("_");
	timeVN = [...timeVN[0].split("/"), ...timeVN[1].split(":")];
	//TO MS
	var inputMS = await checkTime(timeInput);
	var vnMS = await checkTime(timeVN);
	/* ANOTHER FUCKING CHECK */
	if (isNaN(inputMS)) return api.sendMessage(inputMS, threadID, messageID);
	if (inputMS <= vnMS) return api.sendMessage("Bạn không thể đặt lịch trước thời gian hiện tại!", threadID, messageID);
	var msg, owo = timeInput.join("_");
	if (!(threadID in data)) {
		data[threadID] = {};
	}
	if(!(owo in data[threadID])) {
		data[threadID][owo] = {};
	} else {
		if(ID == data[threadID][owo]["ID"]) {
			msg = "Bạn đã đặt lịch ở mốc thời gian này rồi, vui lòng đặt lịch khác!";
		} else {
			let name = await Users.getNameUser(data[threadID][owo].ID);
			msg = `👤 ${name} đã đặt lịch ở mốc thời gian này rồi, vui lòng đặt lịch khác!`;
		}
		return api.sendMessage(msg, threadID, messageID);
	}
	var reply = [];
	if (event.type == "message_reply") {
		for (let e of event.messageReply.attachments) {
			let url = e["url"], fileName = e["fileName"];
			//CHECK FILE TYPE
			switch(e.type) {
				case "photo": fileName += ".jpg"; break;
				case "video": fileName += ".mp4"; break;
				case "animated_image": fileName += ".gif"; break;
				case "audio": fileName += ".mp3"; break;
				case "share": fileName += ".jpg"; url = e["image"]; break;
				case "file": break;
				default: return api.sendMessage("Tệp bạn reply không được hỗ trợ.", threadID, messageID);
			}
			reply.push({fileName, url});
		}
	}
	args.forEach((e, i) => args[i] = e.trim());
	//DON'T QUESTION ME, JUST OWO 
	data[threadID][owo] = { REASON: args[0], ID};

	if (event.type == "message_reply") data[threadID][owo].ATTACHMENT = reply;
	if (args[2]) data[threadID][owo].BOX = args[2];

	msg = `📆 Đã đặt lịch thành công!\n📝 Lý do: ${args[0]}\n⏰ Thời gian: ${date}${(args[2]) ? `\n✏️ Đổi tên thành: ${args[2]}` : ""}`;
	fs.writeFileSync(path, JSON.stringify(data, null, 4));
	return api.sendMessage(msg, threadID, messageID);
  }
