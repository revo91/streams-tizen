import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Error from './Error'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const enzymeWrapper = shallow(<Error />)
    return {
        enzymeWrapper
    }
}

describe('Error component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('div').hasClass('errorcontainer')).toBe(true)
        expect(enzymeWrapper.find('h1').hasClass('sadface')).toBe(true)
        expect(enzymeWrapper.find('p').hasClass('errortitle')).toBe(true)
        expect(enzymeWrapper.find('h1').text()).toBe(':(')
        expect(enzymeWrapper.find('p').text()).toBe('Something went wrong. Check your internet connection and reload (key up).')
    })
})
