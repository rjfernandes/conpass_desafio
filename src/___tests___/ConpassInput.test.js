import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConpassInput from '../components/input/ConpassInput'

configure({ adapter: new Adapter() })

describe('ConpassInput', () => {
    it('Checar o conteúdo inválido - valor não especificado', () => { 
        const component = shallow(<ConpassInput title="Nome" />)
        expect(component.instance().checkIfIsValid().isInvalid).toBeTruthy()
    })

    it('Checar o conteúdo válido - valor: Robson Fernandes', () => { 
        const component = shallow(<ConpassInput title="Nome" value="Robson Fernandes" />)
        expect(component.instance().checkIfIsValid().isInvalid).toBeFalsy()
    })

    it('Checar o conteúdo do email inválido - valor não especificado', () => { 
        const component = shallow(<ConpassInput title="Nome" type="email" />)
        expect(
            component.instance().checkIfIsValid().isInvalid || 
            component.instance().checkIfIsValid().isEmailInvalid
        ).toBeTruthy()
    })

    it('Checar o conteúdo do email inválido - email: robson.fernandes@gmail', () => { 
        const component = shallow(<ConpassInput title="Nome" type="email" value="robson.fernandes@gmail" />)
        expect(
            component.instance().checkIfIsValid().isInvalid || 
            component.instance().checkIfIsValid().isEmailInvalid
        ).toBeTruthy()
    })

    it('Checar o conteúdo do email é válido - email: robson.fernandes@gmail.com', () => { 
        const component = shallow(<ConpassInput title="Nome" type="email" value="robson.fernandes@gmail.com" />)
        expect(
            component.instance().checkIfIsValid().isInvalid || 
            component.instance().checkIfIsValid().isEmailInvalid
        ).toBeFalsy()
    })
})