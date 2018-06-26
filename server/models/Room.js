const shortid = require('shortid');
const UserCollection = require('./UserCollection');

class Room {

    constructor(name) {
        this.id = name
        this.users = new UserCollection();
    }

    getUserList() {
        var userList = []
        var userArray = Array.from(this.users.getUsers().values());
        userArray.forEach(user => {
            userList.push({
                name: user.name,
                id: user.id
            });
        });
        return userList;
    }

    getSize() {
        return this.users.length;
    }

}

module.exports = Room;
