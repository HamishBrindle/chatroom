import { connect } from 'react-redux'
import FormEditorComponent from '../components/NewRoom/FormEditor'

export const FormEditor = connect(state => ({
  rooms: state.rooms // All the rooms open on the server; used to check against new rooms
}), {})(FormEditorComponent)