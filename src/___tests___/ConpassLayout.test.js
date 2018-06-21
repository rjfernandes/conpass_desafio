import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConpassLayout from '../components/layout/ConpassLayout'

configure({ adapter: new Adapter() })

describe('ConpassLayout', () => {
    it('Criação básica do layout', () => { 

        const component = shallow(
                                    <ConpassLayout title="Título">
                                        <h1>Hello world</h1>
                                    </ConpassLayout>
        )

        expect(component).toHaveLength(1)
    })

    it('Criação básica do layout - Título presente', () => { 

        const component = shallow(
                                    <ConpassLayout title="Título">
                                        <h1>Hello world</h1>
                                    </ConpassLayout>
        )

        expect(component.contains('Título')).toBeTruthy()
    })

    it('Criação básica do layout - body do componente preenchido', () => { 

        const component = shallow(
                                    <ConpassLayout title="Título">
                                        <h1>Hello world</h1>
                                    </ConpassLayout>
        )

        expect(component.find(<h1>Hello World</h1>)).toBeTruthy()
    })
})