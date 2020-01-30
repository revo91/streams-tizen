import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Homescreen } from './Homescreen'
import { act, fireEvent } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() })

const props = {
    setGamesList: jest.fn(),
    getGamesList: jest.fn(),
    selectStream: jest.fn(),
    selectGame: jest.fn(),
    handleResize: jest.fn(),
    gamesList: [{
        id: "21779",
        name: "League of Legends",
        box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
    }, {
        id: "21778",
        name: "League of Legends",
        box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
    }],

    selectedGame: 0,
    syncError: false
}

function setup() {
    const enzymeWrapper = shallow(<Homescreen {...props} />)
    return {
        props,
        enzymeWrapper
    }
}

describe('Homescreen component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper, props } = setup()
        expect(enzymeWrapper.find('div').at(0).hasClass('flexcontainer')).toBe(true)
        const link = enzymeWrapper.find('Link').at(0).props()
        expect(link.className).toBe('flexitemscategories scale-in-center selected')
        expect(props.getGamesList.mock.calls.length).toBe(0)
        expect(props.setGamesList.mock.calls.length).toBe(0)
        expect(props.selectStream.mock.calls.length).toBe(0)
        expect(props.selectGame.mock.calls.length).toBe(0)
    })
    it("should call twitch API on mount", () => {
        act(() => {
          mount(<BrowserRouter><Homescreen {...props} /></BrowserRouter>);
        });
        expect(props.setGamesList).toHaveBeenCalledTimes(1);
        expect(props.getGamesList).toHaveBeenCalledWith('https://api.twitch.tv/helix/games/top?first=100')
        expect(props.selectStream).toHaveBeenCalledWith(0)
      });
})
