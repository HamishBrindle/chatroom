const Room = require('./Room');

/**
 * Building a server-side Map wrapper for keeping track of active users 
 * and open chat-rooms.
 */
class RoomCollection { 

    constructor() {
        this.rooms = new Map();
    }

    /**
     * Creates a new Room and returns it - but if it already exists, gets and returns
     * that room. Seems foolproof right now.
     * @param {string} id 
     */
    addRoom(id) {

        var room = this.rooms.get(id);

        if (room === undefined) {
            room = new Room(id);
            this.rooms.set(id, room);
            return room;
        }
        
        return room;
    }

    /**
     * Get room or return undefined.
     * @param {string} id 
     */
    getRoom(id) {
        return this.rooms.get(id);
    }

    /**
     * Remove a room from collection. Returns true if an element in the Map object 
     * existed and has been removed, or false if the element does not exist.
     * @param {string} id 
     */
    removeRoom(id) {
        return this.rooms.delete(id);
    }

    /**
     * Updates a particular room in the collection.
     * @param {object} room the room to be updated.
     */
    updateRoom(room) {

        if (this.rooms.get(room.id) === undefined) { 

            // TODO: If we can't find, handle error here...
            console.log(`Unable to find ${room.id} in RoomCollection.`);

            return false;
        }

        return this.rooms.set(room.id, room);
    }

    /**
     * Fetch all the rooms from the Database and populate our RoomCollection.
     * @param {string} url 
     */
    fetchRooms(url) {
        console.log(`Fetching rooms from ${url}`)
    }

}

module.exports = RoomCollection;