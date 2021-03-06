import React from "react";
import Modal from 'react-modal';
import RoomListItem from './RoomListItem';
import { FormEditor } from '../containers/FormEditor'
import '../style/RoomList.css';
import axios from 'axios';

/*
 * API endpoint. TODO: I should try and get some env variables going.
 */
const ENDPOINT = 'https://y6bzexjalj.execute-api.us-east-1.amazonaws.com/dev/rooms';

/* 
 * Styles for the modal, baby
 */
const CUSTOM_STYLES = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px',
        color: '#000'
    },
    loading: {
        margin: 'auto',
        width: '100%',
        marginTop: '50px',
        textAlign: 'center',
        fontSize: '48px',
        color: '#e3e3e3'
    }
};

/* 
 * Need to do this, it's got something to do with
 * whats behind the modal while it's open?
 */
Modal.setAppElement('#root');

/**
 * RoomList displays a list of all the rooms in our DB. Once they've loaded,
 * we can select a room by clicking on it and route the user to that room.
 */
class RoomList extends React.Component {

    constructor(props) {

        super(props);
        
        // State
        this.state = {
            modalIsOpen: false,
            fields: [],
            loading: true
        };
        
        // Bindings
        this.roomSelect = this.roomSelect.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitFormModal = this.submitFormModal.bind(this);
    }

    /**
     * Submitting the form inside the modal. We can use this to route
     * users to a new room with a name!
     * 
     * @param {Object} form the state object from the FormEditor
     */
    submitFormModal(form) {
        
        // console.log("RoomList: submitFormModal: Submitting form:", form);
        this.props.history.push(`rooms/${form.roomName}`);  
    }

    /**
     * Display modal and form for making a new room.
     */
    openModal(fields) {
        // console.log("RoomList: openModal: Opening modal.");

        this.setState({ 
            modalIsOpen: true, 
            fields: fields
        });

    }

    /**
     * Occurs after we've opened the modal.
     */
    afterOpenModal() {
        // TODO: references are now sync'd and can be accessed.
        // console.log("RoomList: afterOpenModal: Modal has been opened.");
    }

    /**
     * Occurs when we close the modal.
     */
    closeModal() {
        // console.log("RoomList: closeModal: Closing modal.");
        
        this.setState({ selectedRoom: '', userName: '' });
        this.setState({ modalIsOpen: false });
    }

    /**
     * Fetches the list of rooms stored in our DB. Maybe there's a better
     * place I can put this. Good for now.
     * TODO: Find somewhere better for this (ex. can we grab the list from our server?)
     */
    populateRoomsList() {
        this.setState({ loading: true });
        // console.log(`RoomList: populateRoomsList: Fetching room list from ${ENDPOINT}`);
        axios.get(ENDPOINT)
            .then(response => {
                this.setState({ loading: false });
                const data = response.data;
                this.props.populateRoomsList(data);
            })
            .catch(err => {
                // console.log(`RoomList: populateRoomsList: There was a fucking error: ${err}`);
            });
    }

    /**
     * Called after clicking on a room in the list. Decide
     * how we want to route the user here.
     * 
     * @param {String} room name of the room selected
     */
    roomSelect(room) {
        // console.log("RoomList: roomSelect: Selecting a new room: ", room);
        
        this.props.history.push(`rooms/${room}`);
    }

    /**
     * Handler for when we click the 'New Room' button. Here we
     * want to instruct the modal on which input fields to open in
     * the form.
     */
    newRoom() {
        // console.log("RoomList: newRoom: Making a new room.");
        this.openModal([ 'roomName' ]);
    }

    render() {

        const fields = this.state.fields;

        return (
            <div className="room-list">

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={CUSTOM_STYLES}
                    contentLabel="New Room Form">

                    <div className="modal-header">
                        <h3 ref={subtitle => this.subtitle = subtitle}>New Room</h3>
                        <button onClick={this.closeModal}></button>
                    </div>
                    
                    <FormEditor fields={fields} onSubmit={this.submitFormModal}/>

                </Modal>

                <div className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt"></i> Rooms
                        </div>
                        <div className="msger-header-options">
                            <span>
                                <i className="fas fa-cog"></i>
                            </span>
                        </div>
                    </header>
                    <main className="msger-chat">
                        {this.state.loading && <p style={CUSTOM_STYLES.loading}>Loading...</p>}
                        <ul className="list">
                            {this.props.rooms.map(room => (
                                <RoomListItem key={room} onClick={this.roomSelect} room={room} />
                            ))}
                        </ul>
                    </main>
                </div>
                <button onClick={() => this.newRoom()} className="btn btn-success btn-lg new-room">New Room</button>
            </div>

            
        )
    }

    componentDidMount() {
        // console.log("RoomList: componentDidMount: Populating Room List")
        this.populateRoomsList();
    }

    componentWillUnmount() {
        // console.log('RoomList: componentWillUnmount: Unmounting RoomList component')
    }
}

export default RoomList