const shortid = require('shortid');

class Room {

    constructor(name) {
        this.id = name
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
