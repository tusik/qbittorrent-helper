/*
 * @Author: Image image@by.cx
 * @Date: 2023-03-23 17:12:25
 * @LastEditors: Image image@by.cx
 * @LastEditTime: 2023-03-27 11:19:40
 * @filePathColon: /
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import {qBitorrentApi} from "./qbittorrent.js"
let api = new qBitorrentApi()
api.getConfig(function(r){console.log(r)});
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
		if(api.checkTorrentLink(url)){
			api.addTorrent(function(r){},url);
		}
	}
});
chrome.runtime.onInstalled.addListener(() => {
	createContextMenus();
});
function saveQuickSettings(data){
	api.setCurrentCategory(data.category);
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action == 'login') {
		api.setUrl(request.url);
		api.login(request,sendResponse);
	}else if(request.action == 'getCategories'){
		api.getAllCategories(sendResponse);
	}else if(request.action == 'addTorrent'){
		api.addTorrent(sendResponse,request.data.torrent_link);
	}else if(request.action == 'getSettings'){
		api.getConfig(sendResponse);
	}else if(request.action == 'saveSettings'){
		saveQuickSettings(request.data);
	}else if(request.action == 'logout'){
		api.logout(sendResponse);
	}
return true;
});