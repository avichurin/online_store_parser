class Sneak {
    constructor(obj) {
        this.id = obj.id || obj._id;

        this.alias = obj.alias;
    }

    getId() {
        return this.id;
    }

    setId(_id) {
        this.id = _id;
    }

    getAlias() {
        return this.alias;
    }

    setAlias(_alias) {
        this.alias = _alias;
    }
}

module.exports = Sneak;