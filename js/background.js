/*
 * @Author: Image image@by.cx
 * @Date: 2023-03-23 17:12:25
 * @LastEditors: Image image@by.cx
 * @LastEditTime: 2023-03-24 17:07:44
 * @filePathColon: /
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
let qb_cookie = '';

function createContextMenus() {
	chrome.contextMenus.create(
		{
			type: 'normal',
			id: 'addToQueueQuick',
			title: '快速添加到下载列表',
			checked: false,
			contexts: ['link']
		}
	);
}

chrome.contextMenus.onClicked.addListener(menu => {
	if (menu.menuItemId == 'addToQueueQuick') {
		let url = menu.linkUrl;
		let torrent_link = menu.linkUrl;
		console.log(torrent_link);
		api();
	}
});
chrome.runtime.onInstalled.addListener(() => {
	createContextMenus();
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let formData = new FormData();
	formData.append('username', request.data.username);
	formData.append('password', request.data.password);
	let requestInfo = {
		method: "POST",
		body: formData,
		referer: request.url,
		origin: request.url
	}
	fetch(request.url, requestInfo).then(result => {
		if(result.status == 200){
			chrome.cookies.get({"url": request.url, "name": "SID"}, function(cookie) {
				qb_cookie = cookie.value;
				console.log(qb_cookie);
			});
		}else{
		}
		var resp = {
			status: result.status,
			statusText: result.statusText,
			headers: result.headers,
			body: result.body
		}
		sendResponse(resp);
	})
return true;
});