const shortid = require('shortid');

class User {

    constructor(name, connection, id = null) {
        this.name = name;
        this.connection = connection;
        this.id = (!id) ? shortid.generate() : id;
    }

}

module.exports = User; 
