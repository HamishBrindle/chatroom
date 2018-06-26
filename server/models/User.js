const shortid = require('shortid');

class User {

    constructor(name, connection) {
        this.name = name;
        this.connection = connection;
        this.id = shortid.generate();
    }

}

module.exports = User;
