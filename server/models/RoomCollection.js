const Room = require('./Room');

class RoomCollection {

    constructor() {
        this.rooms = new Map();
    }

    addRoom(name) {

        var room = this.rooms.get(name);

        if (room === undefined) {
            room = new Room(name);
            this.rooms.set(name, room);
            return true;
        }

        return false;
    }

    getRoom(name) {
        return this.rooms.get(name);
    }

    removeRoom(name) {
        return this.rooms.delete(key);
    }

    updateRoom(room) {

        if (this.rooms.get(room.name) === undefined) {
            console.log(`Unable to find ${room.name} in RoomCollection.`);
            return false;
        }

        return this.rooms.set(room.name, room);
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