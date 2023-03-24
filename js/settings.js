function getData(message) {
    return new Promise((resolve) => {
        // @ts-ignore
        chrome.runtime.sendMessage(message, resolve);
    });
}
function login_success_hide() {
    document.getElementsByName("username")[0].hidden = true;
    document.getElementsByName("password")[0].hidden = true;
    document.getElementsByName("URL")[0].setAttribute("readonly", "readonly");
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
        type: 'post',
        url: url+`api/v2/auth/login`,
        data: data
    }).then((data) => {
        console.log(data.status);
        if (data.status == 200) {
            login_success_hide();
            console.log("登录成功");
        } else if(data.status == 401){
            console.log("登录失败");
        }
    });
}
document.getElementById("login").addEventListener('click', loging, false);