export class Config{
    constructor(){
        this.url='';
        this.cookie='';
        this.category='';
    }
    setCookie(cookie){
        this.cookie = cookie;
        this.saveConfig(this);
    }
    setUrl(url){
        this.url = url;
        this.saveConfig(this);
    }
    setCategory(category){
        this.category = category;
        this.saveConfig(this);
    }
    saveConfig(config){
        chrome.storage.local.set({"config": config});
        // localStorage.setItem("config", JSON.stringify(config));
    }
    getConfig(sendResponse){
        chrome.storage.local.get("config").then((result) => {
            if(result.config == undefined | result.config == ''){

            }else{
                console.log(JSON.stringify(result.config));
                this.url=result.config.url;
                this.cookie=result.config.url;
                this.category=result.config.url;
                sendResponse(result.config);
            }
            
        });
    }
    clearConfig(){
        chrome.storage.local.clear();
    }
}