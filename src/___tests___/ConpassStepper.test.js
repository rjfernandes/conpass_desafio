import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConpassStepper from '../components/stepper/ConpassStepper'

configure({ adapter: new Adapter() })

describe('ConpassStepper', () => {
    it('Verifica se a quantidade de itens do component de stepper', () => { 

        const current = 1
        const total = 2

        const component = shallow(<ConpassStepper current={current} total={total} />)
        const inline = component.find('.inline').length
        const full = component.find('.full').length

        expect(full === current && inline === total).toEqual(true)
    })
})