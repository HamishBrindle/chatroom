const shortid = require('shortid');
const UserCollection = require('./UserCollection');

/**
 * Room is a collection of Users and other information pertaining to a chatroom.
 */
class Room {

    constructor(id) {
        this.id = id;
        this.users = new UserCollection();
    }

    /**
     * Returns a list of users (name and ID) from inside the UserCollection.
     * 
     * @returns {Object[]} an array of objects containing user name and ID.
     */
    getUserList() {
        var userList = []
        var userArray = Array.from(this.users.getUsers().values());
        console.log(`Room: getUserList: Getting ${userArray.length} users from '${this.id}'`);
        userArray.forEach(user => {
            userList.push({
                name: user.name,
                id: user.id
            });
        });
        return userList;
    }

}

module.exports = Room;
