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
import {qBitorrentApi} from "./qbittorrent.js"
let api = new qBitorrentApi()
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
		api.addTorrent(torrent_link);
	}
});
chrome.runtime.onInstalled.addListener(() => {
	createContextMenus();
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action == 'login') {
		api.setUrl(request.url);
		api.login(request,sendResponse);
	}else if(request.action == 'getCategories'){
		api.getAllCategories(sendResponse);
	}else if(request.action == 'addTorrent'){
		api.addTorrent(request.data.torrent_link,request.data.category,sendResponse);
	}else if(request.action == 'getSettings'){
		api.getConfig(sendResponse);
	}else if(request.action == 'saveSettings'){
		config.saveConfig(request.data);
	}else if(request.action == 'logout'){
		api.logout(sendResponse);
	}
return true;
});