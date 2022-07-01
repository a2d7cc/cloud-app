import $api from '../http/index'
import {setUser, logout} from '../reducers/userReducer'
import { showLoader, hideLoader } from '../reducers/appReducer'

export default class UserService {
    static registration(email, password, cb) {
        return async dispatch => {
            try {
                const response = await $api.post('auth/registration', { email, password })
                console.log(response.data)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                cb()
            } catch (error) {
                console.log(error)
            }
        }
    }

    static login(email, password, cb) {
        return async dispatch => {
            try {
                const response = await $api.post('auth/login', { email, password })
                console.log(response.data)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                cb()
            } catch (error) {
                console.log(error)
            }
        }
    }

    static logout() {
        return async dispatch => {
            try {
                await $api.post('auth/logout')
                dispatch(logout())
            } catch (error) {
                console.log(error)
            }
        }
    }

    static refresh() {
        return async dispatch => {
            try {
                dispatch(showLoader())
                const response = await $api.get(`auth/refresh`,)
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.accessToken)
                dispatch(hideLoader())
            } catch (error) {
                console.log(error)
                localStorage.removeItem('token')
                dispatch(hideLoader())
            }
        }
    }
}

