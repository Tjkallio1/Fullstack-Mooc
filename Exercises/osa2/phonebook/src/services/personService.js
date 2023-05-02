import axios from 'axios'
import { v4 as uuidv4} from 'uuid'

const baseUrl = '/api/persons'

    const getAll = () => {
        return axios.get(baseUrl)
    }

    const create = newObject => {
        const id = uuidv4()
        newObject.id = id
        return axios.post(baseUrl, newObject)
    }

    const save = (id, newObject) => {
        return axios.put(`${baseUrl}/${id}`, newObject)
    }

    const deletePerson = (id) => {
        return axios.delete(`${baseUrl}/${id}`)
    }

export default {
  getAll: getAll, 
  create: create, 
  save: save,
  deletePerson: deletePerson
}


