module.exports = function({ api }) {
    const react = "";
	return function({ event }) {
        const { senderID, type, reaction, messageID } = event;
        if (type === "message_reaction" && senderID == api.getCurrentUserID()) {
            if (reaction && (react === "" || react === reaction)) return api.unsendMessage(messageID);
        }		
	};
};
