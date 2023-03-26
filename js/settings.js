let logined = false;
function getData(message) {
    return new Promise((resolve) => {
        // @ts-ignore
        chrome.runtime.sendMessage(message, resolve);
    });
}
function login_success_hide() {
    document.getElementById("info-group").hidden = true;
    document.getElementsByName("URL")[0].setAttribute("readonly", "readonly");
    document.getElementById("quick-settings").hidden = false;
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    logined = true;
    document.getElementById("login").innerHTML = "Logout";
    getData({
        action: 'getCategories',
        type: 'post'
    }).then((data) => {
        console.log(data);
        for(i in data){
            var option = document.createElement("option");
            option.text = i;
            document.getElementsByName("categories")[0].add(option);
        }
    });
}
function loging() {
    var url = document.getElementsByName("URL")[0].value;
    if(!logined){
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
            console.log(data.status);
            if (data.status == 200) {
                login_success_hide();
                document.getElementById("login").innerHTML = "Logout";
                console.log("Login success!");
            } else if(data.status == 401){
                console.log("Login failed!");
            }
        });
    }else{
        getData({
            action: 'logout',
            url: url
        }).then((data) => {
            document.getElementById("info-group").hidden = false;
            document.getElementsByName("URL")[0].removeAttribute("readonly");
            document.getElementById("quick-settings").hidden = true;
            document.getElementById("login").innerHTML = "Login";
            logined = false;
            console.log("Logout success!");
            
        });
    }
}
function saveQuickSettings() {
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
                login_success_hide();
            }
            
        }
    });
}
document.getElementById("login").addEventListener('click', loging, false);
document.getElementById("save-quick-settings")
    .addEventListener('click', saveQuickSettings, false);
window.onload = init;