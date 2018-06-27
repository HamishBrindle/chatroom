const Room = require('./Room');
const request = require('request');
const rp = require('request-promise');

const shortid = require('shortid'); // TODO: Why is this here? lets move to

const ENDPOINT = 'https://y6bzexjalj.execute-api.us-east-1.amazonaws.com/dev';

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

            console.log(`Fetching rooms from ${ENDPOINT}/rooms/`);

            const roomsFetched = []; // FOR LOGGING ONLY

            rp(`${ENDPOINT}/rooms/`)
                .then((data) => {

                    const rooms = JSON.parse(data);

                    rooms.forEach(r => {
                        roomsFetched.push(r.roomId);
                        this.addRoom(r.roomId);
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
                url: `${ENDPOINT}/rooms`,
                body: JSON.stringify(formData)
            }, (err, httpResponse, body) => {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Server responded with:', body);
            });
        } catch (err) {
            console.error('Couldn\'t upload room: ' + err);
        }

    }

}

module.exports = RoomCollection;