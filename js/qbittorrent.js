/*
 * @Author: Image image@by.cx
 * @Date: 2023-03-24 15:49:18
 * @LastEditors: Image image@by.cx
 * @LastEditTime: 2023-03-24 15:49:41
 * @filePathColon: /
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Config } from "./config.js";
export let ApiUri ={
    auth:{
        login: '/api/v2/auth/login',
        logout: '/api/v2/auth/logout',
    },
    torrents: {
        get:{
            allCategories: '/api/v2/torrents/categories',
        },
        add:{
            addTorrent: '/api/v2/torrents/add',
        }
    }
};
let config = new Config();
export class qBitorrentApi{
    constructor(){
        
    }
    setUrl(url){
        config.setUrl(url);
    }
    setCategory(category){
        config.setCategory(category);
    }
    getConfig(sendResponse){
        config.getConfig(sendResponse);
    }
    login(request,sendResponse){
        let formData = new FormData();
        formData.append('username', request.data.username);
        formData.append('password', request.data.password);
        let requestInfo = {
            method: "POST",
            body: formData
        }
        fetch(config.url+ApiUri.auth.login, requestInfo).then(result => {
            if(result.status == 200){
                chrome.cookies.get({"url": config.url, "name": "SID"}, function(cookie) {
                    console.log(cookie.value);
                    config.setCookie(cookie.value);
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
        });
    }
    getAllCategories(sendResponse){
        let requestInfo = {
            method: "GET",
            headers: {
                "Cookie": "SID="+config.cookie
            }
        }
        fetch(config.url+ApiUri.torrents.get['allCategories'], requestInfo).then(result => {
            if(result.status == 200){
                result.json().then(resp => {
                    config.setCategory(resp);
                    sendResponse(resp); 
                });
            }else{
                
            }
        });
    }
    addTorrent(sendResponse, torrent_link){
        let formData = new FormData();
        formData.append('urls', torrent_link);
        formData.append('category', config.category);
        let requestInfo = {
            method: "POST",
            body: formData,
            headers: {
                "Cookie": "SID="+config.cookie
            }
        }
        fetch(config.url+ApiUri.torrents.add['addTorrent'], requestInfo).then(result => {
            if(result.status == 200){
                sendResponse(true);
            }else{
                sendResponse(false);
            }
        });
    }
    logout(sendResponse){
        let requestInfo = {
            method: "POST"
        }
        fetch(config.url+ApiUri.auth.logout, requestInfo).then(result => {
            if(result.status == 200){
                sendResponse(true);
                config.clearConfig();
            // }else{
            //     sendResponse(false);
            }
        });
        
        config.clearConfig();
    }
}