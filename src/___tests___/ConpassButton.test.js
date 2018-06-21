import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConpassButton from '../components/button/ConpassButton'

configure({ adapter: new Adapter() })

describe('ConpassButton', () => {
    it('Verificar se é link', () => { 
        const component = shallow(<ConpassButton to="/user" />)
        expect(component.find('Link')).toHaveLength(1)
    })

    it('Verificar se é botão', () => { 
        const component = shallow(<ConpassButton />)
        expect(component.find('button')).toHaveLength(1)
    })

    it('Verificar se é link com ícone', () => { 
        const component = shallow(<ConpassButton to="/user" icon="chevron-left" />)
        expect(component.find('.fa-chevron-left').length + component.find('Link').length === 2).toBeTruthy()
    })

    it('Verificar se é botão com ícone', () => { 
        const component = shallow(<ConpassButton icon="chevron-left" />)
        expect(component.find('.fa-chevron-left').length + component.find('button').length === 2).toBeTruthy()
    })
})