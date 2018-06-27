const shortid = require('shortid');

/**
 * A small, almost pointless, User model for using inside our UserCollections.
 */
class User {

    constructor(name, connection, id = null) {
        this.name = name;
        this.connection = connection;

        // If we don't get an id, generate one
        this.id = (!id) ? shortid.generate() : id;
    }

}

module.exports = User; 
