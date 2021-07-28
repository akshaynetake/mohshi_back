class Validator {
    validateForm(required, data) {
        let isProceed = true;
        for (let i = 0; i < required.length; i++) {
            let key = data[required[i]];
            if (key == null || key == '' || key == undefined) {
                isProceed = false;
                break;
            }
            if (required[i].includes('_id')) {
                if (!mongoose.isValidObjectId(data[required[i]])) {
                    isProceed = false;
                    break;
                }
            }
        }
        return isProceed;
    }
    getRequiredParam(required, data) {
        let requiredParam = [];
        for (let i = 0; i < required.length; i++) {
            if (data[required[i]] != undefined && data[required[i]] != "" && data[required[i]] != null) {
                if (required[i].includes('_id')) {
                    if (!mongoose.isValidObjectId(data[required[i]]))
                        requiredParam.push(required[i]);
                }
            } else {
                requiredParam.push(required[i]);
            }
        }
        return requiredParam;
    }
}

module.exports = new Validator();

