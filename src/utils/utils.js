import moment from 'moment'
import Constants from '../constants/Constants'

/**
 * Verificação de email
 * @param {string} email 
 */
export const isEmailValid = email => {
    if (!email || email === '') {
        return false
    }

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailPattern.test(email)) {
        return false
    }

    const lowerCaseEmail = email.toLowerCase()
    const finalEmail = lowerCaseEmail.replace(/^[0-9]+/,'').replace(/[^a-z0-9._@]/g, '')

    return lowerCaseEmail === finalEmail
}

/**
 * Formata a data para exibição
 * @param {string} strDate 
 */
export const formatDate = strDate => moment(strDate).format(Constants.displayMask)