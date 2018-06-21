import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-localstorage-mock'

import UserAdd from '../modules/User/UserAdd'
import { userList } from './__MockedData'

configure({ adapter: new Adapter() })

describe('UserAdd', () => {
    it('Testa se o formulário pode ser enviado - Form vazio', () => { 
        const component = shallow(<UserAdd />) 
        expect(component.instance().isFormValid()).toBeFalsy()
    })

    it('Verifica se as duas senhas foram preenchidas - Form vazio', () => { 
        const component = shallow(<UserAdd />) 
        const bothPasswords = component.instance().bothPasswords()
        expect(bothPasswords.hasPasswords).toBeFalsy()
    })

    it('Verifica se as duas senhas foram preenchidas - Preenchida a senha e a confirmação de senha vazia', () => { 
        const component = shallow(<UserAdd />) 
        const instance = component.instance()
        instance.changeValue('password')('123456')
        const bothPasswords = instance.bothPasswords()
        expect(bothPasswords.hasPasswords).toBeFalsy()
    })

    it('Verifica se as duas senhas preenchidas são iguais', () => { 
        const component = shallow(<UserAdd />) 
        const instance = component.instance()
        instance.changeValue('password')('123456')
        instance.changeValue('repeatPassword')('123456')
        expect(instance.isSamePassword()).toBeTruthy()
    })

    it('Verificar email - Email inválido', () => { 
        const component = shallow(<UserAdd />) 
        const instance = component.instance()
        instance.changeValue('email')('robson.fernandes@gmail')
        expect(instance.isEmailValid()).toBeFalsy()
    })

    it('Verificar email - Email válido', () => { 
        const component = shallow(<UserAdd />) 
        const instance = component.instance()
        instance.changeValue('email')('robson.fernandes@gmail.com')
        expect(instance.isEmailValid()).toBeTruthy()
    })

    it('Salva as informações no LocalStorage', () => { 

        const component = shallow(<UserAdd />) 
        const instance = component.instance()
        const user = userList[0]

        // Remove o createdAt porque ele não é criado neste estágio
        delete user.createdAt

        instance.mountUserIntoState(user)
        instance.save()

        // Busca os dados do LocalStorage
        const tmpUserSaved = JSON.parse(localStorage.getItem('tmpUser') || '{}')
        const userFields = Object.keys(user)
        
        // Verifica campo por campo para saber se são iguais
        const amountFieldEquals = userFields.reduce((acc, field) => acc + (tmpUserSaved[field] === user[field] ? 1 : 0), 0) 

        // A quantidade de campos em userFields tem que ser igual ao amountFieldEquals
        expect(amountFieldEquals).toEqual(userFields.length)
    })
})