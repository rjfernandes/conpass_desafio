import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-localstorage-mock'

import { UserPicture } from '../modules/User/UserPicture'
import { userList } from './__MockedData'

configure({ adapter: new Adapter() })

const saveTmpUserOnLocalStorage = () => {
    const user = userList[0]
    delete user.createdAt
    localStorage.setItem('tmpUser', JSON.stringify(user))
}

describe('UserPicture', () => {
    it('Dados do usuário para ser salvo - Sem imagem', () => { 
        saveTmpUserOnLocalStorage()
        const component = shallow(<UserPicture />)
        const userToBeSaved = component.instance().userToBeSaved()
        expect(!!userToBeSaved.firstName && !!userToBeSaved.createdAt && !userToBeSaved.image).toBeTruthy()
    })

    it('Dados do usuário para ser salvo - Com imagem', () => { 
        saveTmpUserOnLocalStorage()
        const component = shallow(<UserPicture />)
        const instance = component.instance()
        instance.onPickedImage('https://www.google.com/picture.png')
        const userToBeSaved = instance.userToBeSaved()
        expect(!!userToBeSaved.firstName && !!userToBeSaved.createdAt && !!userToBeSaved.image).toBeTruthy()
    })
})