function addDeleteButton(messageID) {
    $(".cid-" + messageID).append("<div class='delete-button' style='display: none;'><span>Delete</span></div>");
    $(".cid-" + messageID + "> .delete-button").click(function () {
        API.moderateDeleteChat(messageID);
    });
    $(".cid-" + messageID).mouseover(function () {
        if (API.getUser().permission < 2) return;
        $(".cid-" + messageID + "> .delete-button").css('display', 'block');
    });
    $(".cid-" + messageID).mouseleave(function () {
        $(".cid-" + messageID + "> .delete-button").css('display', 'none');
    });
}
 
function check(data) {
    if (API.getUser(data.fromID.permission) < 2) { //button should exist
        return;
    }
    if (API.getUser(data.fromID).permission >= API.getUser().permission) {
        addDeleteButton(data.chatID);
    }
}
API.on(API.CHAT, check);
