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
        this.currentCategory = category[Object.keys(category)[0]].name;
        this.saveConfig(this);
    }
    setCurrentCategory(category){
        this.currentCategory = category;
        this.saveConfig(this);
    }
    saveConfig(config){
        chrome.storage.sync.set({"config": config});
        // localStorage.setItem("config", JSON.stringify(config));
    }
    getConfig(sendResponse){
        chrome.storage.sync.get("config").then((result) => {
            if(result.config == undefined | result.config == ''){

            }else{
                this.url=result.config.url;
                this.cookie=result.config.cookie;
                this.category=result.config.category;
                this.currentCategory=result.config.currentCategory;
                sendResponse(result.config);
            }
            
        });
    }
    clearConfig(){
        chrome.storage.sync.clear();
    }
}