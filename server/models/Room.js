const shortid = require('shortid');

class Room {

    constructor(name) {
        this.name = name;
        this.id = shortid.generate();
        this.users = [];
    }

    getUsers() {
        return this.users;
    }

    getSize() {
        return this.users.length;
    }

}

module.exports = Room;
