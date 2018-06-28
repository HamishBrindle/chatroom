const Room = require('./Room');
const request = require('request');
const rp = require('request-promise');

/**
 * A Map wrapper for keeping track of open chat-rooms and their active Users.
 */
class RoomCollection {

    constructor(url) {
        this.apiEndpoint = url;
        this.rooms = new Map();
    }

    /**
     * Creates a new Room and returns it - but if it already exists, gets and returns
     * that room. Seems foolproof right now.
     * 
     * Also adds the room to our DB. If the room exists in the DB, it does nothing.
     * @param {string} id
     * @return {Room} either an existing room or a new room being added
     */
    addRoom(id) {

        var room = this.rooms.get(id);

        if (room === undefined) {

            room = new Room(id);
            this.rooms.set(room.id, room);

            // Printing out response
            const res = this.addRoomToDB(room);

            return room;

        }

        return room;
    }

    /**
     * Add a room to the database.
     * 
     * @param {Object} room the room to be added
     * @return {Object} response from the API. Maybe don't need this...
     */
    addRoomToDB(room) {

        var formData = {
            roomId: room.id,
        };

        try {
            request.post({
                headers: {
                    'content-type': 'application/json'
                },
                url: `${this.apiEndpoint}/rooms`,
                body: JSON.stringify(formData)
            }, (err, httpResponse, body) => {

                // If we get 'Internal server error', the room probably
                // already exists. This is bad, I know... but it's annoying.
                // TODO: Customize an API/DynamoDB response that we can catch!
                if (!body.includes('Internal server error')) {
                    console.log('RoomCollection: addRoomToDB: ✔️  Server responded with:', body);
                } else {
                    return body;
                }

            });
        } catch (err) {
            console.error('RoomCollection: addRoomToDB: ❌  Couldn\'t upload room: ' + err);
        }

    }

    /**
     * Get room.
     * 
     * @param {string} id
     * @returns {Room | undefined}
     */
    getRoom(id) {
        return this.rooms.get(id);
    }

    /**
     * Remove a room from collection.
     * 
     * @param {String} id
     * @returns {Boolean} true if an element in the Map object 
     * existed and has been removed, or false if the element does not exist.
     */
    removeRoom(id) {
        return this.rooms.delete(id);
    }

    /**
     * Updates a particular room in the collection.
     * 
     * @param {object} room the room to be updated.
     * @returns {Map | Boolean} the map of room or false
     */
    updateRoom(room) {

        if (this.rooms.get(room.id) === undefined) {

            console.log(`RoomCollection: updateRoom: ❌  Unable to find ${room.name}.`);

            return false;
        }

        return this.rooms.set(room.id, room);
    }

    /**
     * Fetch all the rooms from the Database and populate our RoomCollection.
     * @param {string} url
     * @returns {Promise} do work of getting rooms from API
     */
    fetchRooms() {

        return new Promise((resolve, reject) => {

            console.log(`RoomCollection: fetchRooms: 🐕  Fetching rooms from ${this.apiEndpoint}/rooms/`);

            // This is for logging only
            const roomsFetched = [];

            rp(`${this.apiEndpoint}/rooms/`)
                .then((data) => {

                    const rooms = JSON.parse(data);

                    rooms.forEach(r => {
                        this.addRoom(r.roomId);
                        roomsFetched.push(r.roomId);
                    });

                    console.log(`RoomCollection: fetchRooms: 🗞️  Fetched ${roomsFetched.length} rooms from DB: `, roomsFetched);

                    resolve(data);

                })
                .catch((err) => {

                    console.log(`RoomCollection: fetchRooms: ❌  Unable to retrieve rooms: ${err}`);
                    reject(err);

                });
        });
    }
}

module.exports = RoomCollection;