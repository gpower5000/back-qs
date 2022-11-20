function isEmpty(value) {
    if(value === null || value === undefined || value === '') {
        return true;
    }
    if(Array.isArray(value)) {
        if(value.length === 0) { return true; }
    }
    if( typeof (value) === 'object') {
        if(Object.keys(value).length === 0) { return true; }
    }
    return false;
}

module.exports = {
    isEmpty
}