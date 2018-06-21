import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ConpassUploadAvatar from '../components/avatar/ConpassUploadAvatar'

configure({ adapter: new Adapter() })

describe('ConpassUploadAvatar', () => {
    it('Texto: Click to upload your profile image', () => { 
        const component = shallow(<ConpassUploadAvatar width={180} />)
        expect(component.contains('Click to upload your profile image')).toBeTruthy()
    })

    it('Imagem fornecida - Texto: Click to Edit image', () => { 
        const component = shallow(<ConpassUploadAvatar width={180} image={{ uri: 'http://www.google.com/picture.png' }} />)
        expect(component.contains('Click to Edit image')).toBeTruthy()
    })
})