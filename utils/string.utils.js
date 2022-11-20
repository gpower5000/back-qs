
const FROM_ALL_CODE   = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
const TO_ALL_CODE     = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
const FROM_CAPITALIZE = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÇç';
const TO_CAPITALIZE   = 'AAAAAEEEEIIIIOOOOUUUUCc';

const normalize = function (str, from = FROM_ALL_CODE, to = TO_ALL_CODE) {
    let mapping = {};

    for (let i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);


    var ret = [];
    for (let ii = 0, jj = str.length; ii < jj; ii++) {
        var c = str.charAt(ii);
        if (mapping.hasOwnProperty(str.charAt(ii)))
            ret.push(mapping[c]);
        else
            ret.push(c);
    }
    return ret.join('');
};

const padString = function (num,digits = 1,pad = 0){
    let str    = (""+num);
    let length = Math.max(digits-str.length,0);
    return (Array(length+1).join(pad) + str);
}


module.exports = {
    FROM_ALL_CODE,
    TO_ALL_CODE,
    FROM_CAPITALIZE,
    TO_CAPITALIZE,
    normalize,
    padString
}