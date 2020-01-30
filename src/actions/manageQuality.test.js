import { SET_POSSIBLE_QUALITIES, SET_QUALITY, SET_QUALITY_SELECTOR_SHOWN, setPossibleQualities, setQuality, setQualitySelectorShown } from './manageQuality'

describe('manage quality actions', () => {
  it('should create an action to set possible qualities for given stream', () => {
    const qualities = ['360p','480p','720p30','720p60','1080p60']
    const expectedAction = {
      type: SET_POSSIBLE_QUALITIES,
      qualities
    }
    expect(setPossibleQualities(qualities)).toEqual(expectedAction)
  })

  it('should create an action to set quality of a stream', () => {
    const qualityName = 'Auto'
    const qualityGroup = 'auto'
    const qualityIndex = 0
    const expectedAction = {
      type: SET_QUALITY,
      qualityName,
      qualityIndex,
      qualityGroup
    }
    expect(setQuality(qualityName, qualityIndex, qualityGroup)).toEqual(expectedAction)
  })

  it('should create an action to show quality selector', () => {
    const show = true
    const expectedAction = {
      type: SET_QUALITY_SELECTOR_SHOWN,
      show
    }
    expect(setQualitySelectorShown(show)).toEqual(expectedAction)
  })
})