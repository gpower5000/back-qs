exports.handleFixedNumber = (value, fixed) => {
    if (value === null || value === undefined) {
        return 0;
    } else {
        if (value.constructor === Number) {
            if (Number.isInteger(value)) {
                return value;
            } else {
                return value.toFixed(fixed);
            }
        } return 0;
    }
}