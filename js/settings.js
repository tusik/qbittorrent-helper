/*
 * @Author: Image image@by.cx
 * @Date: 2023-03-24 09:46:04
 * @LastEditors: Image image@by.cx
 * @LastEditTime: 2023-03-27 17:02:41
 * @filePathColon: /
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
let logined = false;
function getData(message) {
    return new Promise((resolve) => {
        // @ts-ignore
        chrome.runtime.sendMessage(message, resolve);
    });
}
function login_success_hide(currentCategory) {
    document.getElementById("info-group").hidden = true;
    document.getElementsByName("URL")[0].setAttribute("readonly", "readonly");
    document.getElementById("quick-settings").hidden = false;
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    logined = true;
    document.getElementById("login").innerHTML = "Logout";
    document.getElementsByName("categories")[0].innerHTML="";
    getData({
        action: 'getCategories',
        type: 'post'
    }).then((data) => {
        console.log(data);
        for(i in data){
            var option = document.createElement("option");
            option.text = i;
            if(i == currentCategory){
                option.selected = true;
            }
            document.getElementsByName("categories")[0].add(option);
        }
    });
}
function loging() {
    var url = document.getElementsByName("URL")[0].value;
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var data = {
        "username": username,
        "password": password
    };
    getData({
        action: 'login',
        type: 'post',
        data: data,
        url: url
    }).then((data) => {
        if (data.status == 200) {
            login_success_hide();
            console.log("Login success!");
        } else if(data.status == 401){
            console.log("Login failed!");
        }
    });
};
function logout(){
    getData({
        action: 'logout'
    }).then((data) => {
        document.getElementById("info-group").hidden = false;
        document.getElementsByName("URL")[0].removeAttribute("readonly");
        document.getElementById("quick-settings").hidden = true;
        logined = false;
        console.log("Logout success!");
        
    });
}
function saveQuickSettings() {
    var url = document.getElementsByName("URL")[0].value;
    var category = document.getElementsByName("categories")[0].value;
    var data = {
        "url": url,
        "category": category
    };
    getData({
        action: 'saveSettings',
        data: data
    }).then((data) => {
        console.log(data);
    });
}
function init(){
    getData({
        action: 'getSettings'
    }).then((data) => {
        console.log(data);
        if(data != null){
            if(data.cookie != null && data.cookie != ""){
                document.getElementsByName("URL")[0].value = data.url;
                document.getElementsByName("username")[0].value = data.username;
                document.getElementsByName("password")[0].value = data.password;
                login_success_hide(data.currentCategory);
            }
            
        }
    });
}
document.getElementById("login").addEventListener('click', loging, false);
document.getElementById("logout").addEventListener('click', logout, false);
document.getElementById("save-quick-settings")
    .addEventListener('click', saveQuickSettings, false);
window.onload = init;