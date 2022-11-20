exports.ResponseService = async(status, code, message, data)=>{
    return await {status: status, Resp:{Error: code, message: message, data: data}}

}
exports.GetClient = (clientSpsa, clientFico, sociedad) => {
    switch (sociedad) {
        case '1000': { console.log("retornando qs"); return clientSpsa};
        default: return clientFico;
      }
}