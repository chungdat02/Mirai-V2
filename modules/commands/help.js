//hello
module.exports.config = {
	name: "help",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Hướng dẫn cho người mới",
	commandCategory: "Dành cho người dùng",
	usages: "[Tên module]",
	cooldowns: 5,
  dependencies: {
    "axios": "",
    "request": "",
    "fs-extra": ""
  },
	envConfig: {
		autoUnsend: true,
		delayUnsend: 120
	}
};

 module.exports.run = function({ api, event, args, getText }) {
  const axios = require('axios');
  const request = global.nodemodule['request'];
  const fs = require("fs");
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

   //start
   var tl = ["Admin bot rất đẹp trai","Con bot này thông minh hơn bạn","tôi không có khả năng hiểu con gái","con bot này giúp bạn hỗ trợ trong việc học?","spam bot tôi sẽ ban bạn khỏi người dùng bot","đừng để tôi cáu nhé!","việc bạn đang làm là vô nghĩa","cái gì chưa biết chỉ cần biết là được","con chuột bị ốm uống thuốc chuột thì tại sao con chuột lại chết ?","chảy máu cam nhưng sao màu máu là màu đỏ ?","228922 là một con số tuyệt vời.","Đây là một lệnh vô dụng","177013 là một con số tuyệt vời","7749 là con số đẹp cho tình yêu","bạn có yêu tôi không ?","bạn rất ngu","Thời gian qua đi, có quá nhiều người chỉ là khách qua đường trong cuộc đời bạn… Chỉ cần không ở bên nhau thì sẽ có ngày quên lãng thôi.","Thời gian qua đi, bạn sẽ biết, có quá nhiều người chỉ là khách qua đường trong cuộc đời bạn… Chỉ cần không ở bên nhau thì sẽ có ngày quên lãng thôi.","Thời gian là câu nói hay nhất, đúng nhất cho một tình yêu.","Dù tình yêu có lớn đến mấy cũng chẳng ngăn được thời gian.","Đừng để thời gian biến nỗi nhớ thành gánh nặng của bạn.","Tuổi trẻ chúng ta đang trôi qua không ngừng.","Tuổi trẻ là hữu hạn - Hãy ngừng lãng phí thời gian và tập trung kiến tạo bản thân ngày một tốt hơn.","Thời gian không chờ đợi một ai cả, chớp mắt một cái thanh xuân đã qua nhanh như một giấc mộng.","Thời gian tuổi trẻ không phụ thuộc vào guồng quay của thế giới mà nó phụ thuộc vào chính mỗi người chúng ta.","Bầu trời sẽ xanh trở lại, nhưng thời gian sẽ không quay trở lại. Nơi ấy sẽ vẫn thế, nhưng tuổi trẻ thì không...","Biết mình còn trẻ và biết tuổi trẻ không hề kéo dài.","Trên đời này có hai thứ không thể quay trở lại đó là: thời gian và tuổi trẻ.","Rồi sẽ có một ngày bạn thức dậy và không còn đủ thời gian để làm những điều hàng ngày mình mong muốn. Hãy làm ngay bây giờ. - Paulo Coelho","Điều hối tiếc nhất trong cuộc đời là không được làm những điều mình thích, là đã không trân trọng thời gian tuổi trẻ của chính mình.","Nếu thời gian là thứ đáng giá nhất, phí phạm thời gian hẳn phải là sự lãng phí ngông cuồng nhất","Cuộc đời đã ngắn ngủi như vậy mà chúng ta vẫn rút ngắn nó thêm khi bất cẩn lãng phí thời gian.","Chúng ta cần phải đi ngang với thời gian chứ không phải để thời gian đi ngang qua."," Nếu bạn yêu đời, hãy đừng phung phí thời gian, vì chất liệu của cuộc sống làm bằng thời gian.","Có những lúc, không có lần sau, không có cơ hội bắt đầu lại. Có những lúc, bỏ lỡ hiện tại, vĩnh viễn không còn cơ hội nữa","Người nào dám lãng phí một giờ đồng hồ hãy còn chưa phát hiện ra giá trị của cuộc sống"," Cuộc sống quá ngắn ngủi. Hận thù chỉ tàn phá những hạnh phúc tuyệt vời bạn đang có. Hãy cười khi bạn có thể và quên đi những gì bạn không thể thay đổi.","Kẻ tầm thường chỉ lo tìm cách giết thời gian, còn người có tài thì tìm mọi cách tận dụng thời gian.","Một tuần lễ với người chăm chỉ có 7 ngày, còn với kẻ lười biếng có 7 ngày mai.","Tôi chỉ còn lại một ít thời gian, và tôi không muốn lãng phí nó với Chúa.","Thương hại chính mình và điều kiện hiện tại của mình không chỉ lãng phí thời gian mà là thói quen tồi tệ nhất mà bạn có thể.","Con người không bao giờ được lãng phí thời gian vô ích để nuối tiếc quá khứ hay phàn nàn về những thay đổi khiến mình khó chịu, bởi thay đổi là bản chất của cuộc sống","Hầu hết mọi người lãng phí phần nào đó của cuộc đời cố gắng thể hiện những phẩm chất mình không có","Ngày đi, tháng chạy, năm bay. Thời gian nước chảy, chẳng quay được về.","Giúp bạn bè khi họ cần thật dễ dàng, nhưng dành cho họ thời gian không phải lúc nào cũng thuận lợi.","Người khôn ngoan là người học được những sự thật này: Rắc rối là tạm thời. Thời gian là thuốc bổ. Khổ đau là ống nghiệm.","Thời gian mà bạn hưởng thụ để phung phí, không lãng phí.","Lòng kiên nhẫn và thời gian làm được nhiều hơn là sức mạnh hay nhiệt huyết.","Cuộc đời đã ngắn ngủi như vậy mà chúng ta vẫn rút ngắn nó thêm khi bất cẩn lãng phí thời gian.","Anh có thể trì hoãn, nhưng thời gian thì không"," Anh có yêu cuộc sống không? Vậy đừng lãng phí thời gian, vì đó là vật liệu của cuộc sống"," Anh có yêu cuộc sống không? Vậy đừng lãng phí thời gian, vì đó là vật liệu của cuộc sống","Giống như tuyết mùa đông trên bãi cỏ mùa hè, thời gian đã qua là thời gian đã mất."," Tiền bạc và thời gian là những gánh nặng ghê gớm nhất của cuộc đời… và những kẻ bất hạnh nhất là những người sở hữu chúng nhiều hơn mình có thể sử dụng.","Thời gian thay đổi tất cả, chỉ trừ thứ bên trong chúng ta luôn luôn khiến ta thấy ngạc nhiên vì thay đổi.","Tính cách là kết quả của hai thứ: thái độ tinh thần và cách chúng ta sử dụng thời gian","Nếu một người cho bạn thời gian của mình, anh ta không thể cho bạn món quà nào quý giá hơn nữa."," Người nào dám lãng phí một giờ đồng hồ hãy còn chưa phát hiện ra giá trị của cuộc sống","Hãy sống thật xứng đáng để những tháng ngày thanh xuân không trở nên lãng phí.","Tuổi thanh xuân tươi đẹp, thời gian quý báu của cuộc đời, hãy sống tự do hết mình.","Khi thanh xuân, người ta vui chơi, yêu đương và làm những điều rồ dại. Người ta vẫn lớn lên mỗi ngày, sai lầm, đứng dậy, đi tiếp.","Tuổi trẻ của mỗi chúng ta chẳng ai giống nhau, có thể tươi đẹp hoặc sóng gió triền miên nhưng đọng lại là những kí ức mãi mãi không thể nào xóa nhòa.","Ngay cả một lượng nhỏ rượu cồn đổ lên một con bọ cạp cũng sẽ làm nó phát điên và tự chích vào mình cho đến chết."," Cá sấu không thể thè lưỡi của nó.","Con vật cao tuổi nhất từng được biết đến trên thế giới là một con trai 405 tuổi, được phát hiện năm 2007.","Cá mập, giống như các loài cá khác, có cơ quan sinh sản của chúng nằm trong lồng ngực.","Mắt của loài bạch tuộc không có điểm mù. Tính trung bình, não của một con bạch tuộc có 300 triệu tế bào thần kinh. Khi bị căng thẳng cực điểm, một số con bạch tuộc thậm chí ăn cả những chiếc vòi của nó.","Bộ não của voi nặng khoảng 6.000g, trong khi bộ não của mèo chỉ nặng xấp xỉ 30g.","Mèo và chó có khả năng nghe siêu âm.","Cừu có thể sống sót tới 2 tuần trong tình trạng bị tuyết chôn vùi.","Con lợn thông minh nhất thế giới thuộc sở hữu của một giáo viên dạy toán ở Madison, bang Wisconsin (Mỹ). Nó có khả năng ghi nhớ các bảng tính nhân đến 12.","Thống kê cho thấy, mỗi lần giao phối của rắn chuông kéo dài tới ... hơn 22 giờ","Các nghiên cứu phát hiện, loài ruồi bị điếc.","Trong tình trạng thiếu nước, chuột túi (kangaroo) có thể chống chịu lâu hơn so với lạc đà.","","Chó có 4 ngón trên các chân sau và 5 ngón ở mỗi chân trước của chúng.","Tốc độ bay trung bình của ong mật là 24km/giờ. Chúng không bao giờ ngủ.","Gián có thể sống tới 9 ngày sau khi bị cắt lìa đầu.","Nếu bạn để một con cá vàng suốt thời gian dài trong bóng tối, nó cuối cùng sẽ chuyển sang màu trắng.","Kỷ lục bay đối với một con gà là 13 giây.","Loài vật gây tử vong nhiều nhất cho con người trên toàn thế giới là muỗi.","Tiếng kêu quàng quạc của một con vịt không gây dội vang lại, và không ai biết tại sao lại như vậy.","Ao biển không có não. Chúng cũng nằm trong số ít những loài động vật có thể lộn ngược dạ dày của mình từ trong ra ngoài.","Mối hoạt động 24 giờ mỗi ngày và chúng không ngủ. Các nghiên cứu còn phát hiện, mối gặm nhấm gỗ nhanh gấp hai lần khi nghe nhạc rock nặng.","Hươu cao cổ con thường rơi từ độ cao 1,8 mét xuống khi chào đời."," Một con hổ không chỉ có lớp lông vằn vện mà da của chúng cũng vằn vện."," Chim kền kền bay mà không cần vỗ cánh.","Gà tây có thể sinh sản mà không cần giao phối.","Chim cánh cụt là loài chim duy nhất có thể bơi lội, nhưng không bay. Người ta cũng không tìm thấy bất kỳ con chim cánh cụt nào ở Bắc Cực."," Nọc của rắn hổ mang chúa chứa độc tính cao đến mức chỉ cần một gram cũng có thể giết chết 150 người.","Nọc độc của một con bọ cạp nhỏ nguy hiểm hơn nhiều so với nọc độc của một con bọ cạp lớn.","Chiều dài dương vật của một con hàu có thể 'khủng' đến mức gấp 20 lần kích thước cơ thể của nó!","Tim chuột đập 650 lần/phút.","Bọ chét có thể nhảy cao gấp 350 lần chiều dài cơ thể của nó. Nếu cũng sở hữu khả năng đó, con người sẽ có thể nhảy một lần hết chiều dài của một sân bóng đá.","Chuột túi (kangaroo) nhảy càng nhanh thì năng lượng nó tiêu thụ càng ít.","Voi nằm trong số ít loài động vật có vú không thể nhảy! Người ta cũng phát hiện rằng, voi vẫn đứng sau khi chết.","Nhện có máu trong suốt."," Ốc sên thở bằng chân của chúng.","Một số con sư tử giao phối hơn 50 lần một ngày.","Chuột sinh sản nhanh tới mức chỉ trong 18 tháng, chỉ từ 2 con chuột bố, mẹ có thể cho ra đời tới 1 triệu người nối dõi.","Nhím nổi trên nước.","Alex là con vẹt xám châu Phi đầu tiên trên thế giới tự đặt câu hỏi về sự tồn tại của nó: Tôi màu gì?.","Sở dĩ hồng hạc có màu đỏ hồng vì chúng có thể hấp thụ sắc tố từ vỏ tôm, tép ăn hằng ngày."," Cú và chim bồ câu có thể ghi nhớ khuôn mặt người","Bò nguy hiểm hơn cả cá mập","Cặp cánh đơn trên lưng và bộ phận giữ thăng bằng phía sau giúp ruồi luôn bay liên tục, tuy nhiên tuổi đời của chúng không quá 14 ngày.","Với cặp giò dài miên man có thể cao tới 1,5 m và cân nặng 20 – 25 kg, giúp đà điểu có thể chạy nhanh hơn ngựa. Ngoài ra, đà điểu đực có thể “gầm” giống sư tử.","Kangaroo sử dụng đuôi để cân bằng, vì vậy nếu nhấc đuôi một con Kăng gu ru lên khỏi mặt đất, nó sẽ không thể nhảy và đứng vững.","Hổ không chỉ có sọc trên lưng mà còn được in trên da của chúng. Mỗi cá thể hổ được sinh ra đều là sở hữu sọc riêng không hề giống nhau.","Nếu bạn đang bị một chú cá sấu tấn công, đừng cố gắng thoát khỏi hàm răng sắc nhọn của chúng bằng cách đẩy chúng ra. Hãy chọc thẳng vào mắt cá sấu, đó là điểm yếu của chúng.","Bọ chét có thể nhảy cao tới 200 lần chiều cao của chúng. Điều này tương đương với một người đàn ông nhảy lên tòa Empire State ở New York.","Một con mèo có tới 32 cơ trong tai. Điều đó khiến cho chúng có khả năng nghe vượt trội","Gấu túi có khẩu vị không hề thay đổi trong suốt cuộc đời, hầu như chúng không ăn gì khác ngoài .. lá cây bạch đàn.","Răng hải ly không ngừng phát triển trong suốt phần đời của mình. Nếu không muốn răng quá dài và khó kiểm soát hải ly phải ăn những thực phẩn cứng để mài mòn chúng.","Loài vật sống ở các ghềnh đá ven bờ biển hay các cửa sông có khả năng cực “dị”. Hàu có thể thay đổi giới tính để phù hợp với cách thức giao phối.","Bướm sở hữu cặp mắt với hàng ngàn ống kính tương tự lens trên máy ảnh nhưng tuyệt nhiên chúng chỉ nhfin thấy màu đỏ, xanh lá cây và vàng.","Đừng cố thử điều này ở nhà, sự thật là nếu một chú ốc sên bị mất một mắt, chúng có thể hồi phục lại bình thường.","Hươu cao cổ không hề có dây thanh quản như loài động vật cùng họ khác, lưỡi của chúng có màu xanh-đen.","Dấu mũi của chó cũng giống như dấu vân tay của con người và có thể được sử dụng để xác định cá thể chó khác nhau."];
   var tle = tl[Math.floor(Math.random() * tl.length)];
   //end
   
  if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg +=`🎭 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}\n${commandGroup.cmds.join(', ')}\n\n`);
    return axios.get('https://api.vinhbeat.ga/gai.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
    
          api.sendMessage({body:`🎭Danh sách lệnh hiện có🎭\n\n` + msg + `» Số lệnh hiện có: ${commands.size}\n» Sử dụng "${global.config.PREFIX}help" từng lệnh ở trên để biết cách sử dụng.\n\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\n[ Bạn có biết ? ]: ${tle}`, 
            attachment: fs.createReadStream(__dirname + `/cache/helpall.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/helpall.${ext}`), event.messageID,
        async function(error, info) { 
            if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
  });
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/helpall.${ext}`)).on("close", callback);
     })
};

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "🎭Danh sách lệnh hiện có🎭\n\n";

    for (var [name, value] of (commands)) {
    name += `\n» Mô tả: ${value.config.description}\n» Thời gian chờ: ${value.config.cooldowns}s\n`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `${++i}. ${item}\n`;
    var bruh = `${global.config.PREFIX}${this.config.name}`;
    var hi = `» Trang (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\n» Có ${arrayInfo.length} lệnh đang chạy\n» HDSD: ${bruh} <page/all>\n\n  ﹏﹏🎭 Mirai Project 🎭﹏`;
    return axios.get('https://api.vinhbeat.ga/gai.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
    api.sendMessage({body: msg + hi, attachment: fs.createReadStream(__dirname + `/cache/help.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/help.${ext}`), event.messageID,
        async function(error, info) { 
            if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
  });
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/help.${ext}`)).on("close", callback);
     })
}

return axios.get('https://girl.demngayyeu.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body:`
» Name: ${command.config.name} 
» Phiên bản: ${command.config.version}
» Role: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên bot`)}
» Author: ${command.config.credits}
» Miêu tả: ${command.config.description}
» Thời gian chờ: ${command.config.cooldowns}s
» HDSD: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Không có hướng dẫn"}`,
        attachment: fs.createReadStream(__dirname + `/cache/helpin4.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/helpin4.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/helpin4.${ext}`)).on("close", callback);
     })
};
