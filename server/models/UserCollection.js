const User = require('./User');

/**
 * Building a server-side Map wrapper for keeping track of active users 
 * and open chat-users.
 */
class UserCollection {

    /**
     * Constructor.
     * 
     * @param {String} room name of room this collection belongs to
     */
    constructor(room) {
        this.room = room;
        this.users = new Map();
    }

    /**
     * Creates a new User and returns it - but if it already exists, gets and returns
     * that user. Seems foolproof right now.
     * 
     * @param {User} u the user we'd like to add
     */
    addUser(u) {

        // Before adding, look for this user
        var user = this.users.get(u.id);

        if (user === undefined) {

            console.log(`UserCollection: addUser: ➕  Adding user '${u.name}' to room '${this.room}'.`)

            user = new User(u.name ,u.connection, u.id);
            this.users.set(user.id, user);
            return user;
        }
        
        return user;
    }

    /**
     * Get user or return undefined.
     * @param {string} id 
     */
    getUser(id) {
        return this.users.get(id);
    }

    /**
     * Get Map of users in collection.
     */
    getUsers() {
        return this.users;
    }

    /**
     * Remove a user from collection. Returns true if an element in the Map object 
     * existed and has been removed, or false if the element does not exist.
     * @param {string} id 
     */
    removeUser(id) {
        return this.users.delete(id);
    }

    /**
     * Fetch all the users from the Database and populate our UserCollection.
     * @param {string} url 
     */
    fetchUsers(url) {
        console.log(`UserCollection: fetchUsers: 🐕  Fetching users from ${url}`)
    }

}

module.exports = UserCollection;