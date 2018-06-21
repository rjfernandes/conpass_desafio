import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConpassAvatar from '../components/avatar/ConpassAvatar'

configure({ adapter: new Adapter() })

describe('ConpassAvatar', () => {
    it('Testa a criação das iniciais', () => { 
        const component = shallow(<ConpassAvatar width={80} />)
        const initials = component.instance().getInitials('Robson de Jesus Fernandes')
        expect(initials).toEqual('RF')
    })
    
    it('Testa o avatar com as iniciais', () => { 
        const component = shallow(<ConpassAvatar width={80} value="Robson de Jesus Fernandes" />)
        expect(component.contains('RF')).toBeTruthy()
    })

    it('Testa o avatar com a imagem, ignorando as iniciais', () => { 
        const component = shallow(<ConpassAvatar width={80} image="http://www.google.com/picture.jpg" value="Robson de Jesus Fernandes" />)
        expect(component.filter('img').length === 1 && component.find('RJF').length === 0).toBeTruthy()
    })

    it('Testa o avatar com a imagem, ignorando as iniciais', () => { 
        const component = shallow(<ConpassAvatar width={80} image="http://www.google.com/picture.jpg" value="Robson de Jesus Fernandes" />)
        expect(component.contains('RF')).toBeFalsy()
    })
})