class ServerInfo {
    constructor() {
        var ver = '1.1.0'
        if(!ServerInfo.instance){
            this._cache = []
            ServerInfo.instance = this
        }
        return ServerInfo.instance
    }
    
}