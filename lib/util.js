module.exports = {
    assert(value, msg) {
        if(!Boolean(value)) {
            throw new Error(msg)
        }
    }
}