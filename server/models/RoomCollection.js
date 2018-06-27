const Room = require('./Room');
const request = require('request');
const rp = require('request-promise');

/**
 * Building a server-side Map wrapper for keeping track of active users 
 * and open chat-rooms.
 */
class RoomCollection {

    constructor(url) {
        this.apiEndpoint = url;
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
            this.rooms.set(room.id, room);
            this.addRoomToDB(room);
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

            console.log(`Unable to find ${room.name} in RoomCollection.`);

            return false;
        }

        return this.rooms.set(room.id, room);
    }

    /**
     * Fetch all the rooms from the Database and populate our RoomCollection.
     * @param {string} url 
     */
    fetchRooms() {

        return new Promise((resolve, reject) => {

            console.log(`Fetching rooms from ${this.apiEndpoint}/rooms/`);

            // This is for logging only
            const roomsFetched = []; 

            rp(`${this.apiEndpoint}/rooms/`)
                .then((data) => {

                    const rooms = JSON.parse(data);

                    rooms.forEach(r => {
                        this.addRoom(r.roomId);
                        roomsFetched.push(r.roomId);
                    });

                    console.log(`+ Fetched ${roomsFetched.length} rooms from DB: `, roomsFetched);

                    resolve(data);

                })
                .catch((err) => {

                    console.log(`Unable to retrieve rooms: ${err}`);
                    reject(err);

                });
        });
    }

    /**
     * Add a room to the database.
     * 
     * @param {Object} room the room to be added
     */
    addRoomToDB(r) {

        var formData = {
            roomId: r.id,
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
                    console.log('Server responded with:', body);
                }

            });
        } catch (err) {
            console.error('Couldn\'t upload room: ' + err);
        }

    }

}

module.exports = RoomCollection;