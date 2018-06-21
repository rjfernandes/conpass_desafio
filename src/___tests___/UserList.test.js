import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { UserList } from '../modules/User/UserList'
import { userList, createdAtDesc, createdAtAsc, fullNameDesc, fullNameAsc } from './__MockedData'

configure({ adapter: new Adapter() })

describe('UserList', () => {

    it('Ordenação de lista de usuários pela ordenação padrão (mais atual para o mais antigo)', () => { 
        const component = shallow(<UserList users={userList} />) 
        const sortedUsers = component.instance().sortedUsers()
        expect(createdAtDesc.join() === sortedUsers.map(e => e.createdAt).join()).toBeTruthy()
    })

    it('Ordenação de lista de usuários do mais antigo para o mais atual', () => { 
        const component = shallow(<UserList users={userList} />) 
        const instance = component.instance()
        instance.setOrder('createdAt')
        expect(createdAtAsc.join() === instance.sortedUsers().map(e => e.createdAt).join()).toBeTruthy()
    })

    it('Ordenação de lista de usuários pelo nome desc (Z - A)', () => { 
        const component = shallow(<UserList users={userList} />) 
        const instance = component.instance()
        instance.setOrder('firstName')
        expect(fullNameDesc.join() === instance.sortedUsers().map(e => `${e.firstName} ${e.lastName}`).join()).toBeTruthy()
    })

    it('Ordenação de lista de usuários pelo nome asc (A - Z)', () => { 
        const component = shallow(<UserList users={userList} />) 
        const instance = component.instance()
        instance.setOrder('firstName')
        instance.setOrder('firstName')
        expect(fullNameAsc.join() === instance.sortedUsers().map(e => `${e.firstName} ${e.lastName}`).join()).toBeTruthy()
    })

    it('Verifica se a quantidade de usuários renderizados é a mesma da lista de users', () => { 
        const component = shallow(<UserList users={userList} />) 
        expect(component.find('.nameCell')).toHaveLength(userList.length)
    })

    it('Verifica está exibindo a mensagem de que não há usuários cadastrados para uma lista vazia', () => { 
        const component = shallow(<UserList />) 
        expect(component.contains('Não há usuários cadastrados')).toBeTruthy()
    })
})