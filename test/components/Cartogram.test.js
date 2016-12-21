import React from 'react'
import { shallow } from 'enzyme'

import Cartogram from '../../src/components/Cartogram'

describe('Cartogram', () => {
  const cartogram = shallow(<Cartogram data={{'ca': 1}} color='red' />)

  it('renders 51 squares (DC gets one!)', () => {
    expect(cartogram.find('[data-state]').length).toEqual(51)
  })

  it('displays "name_short" inside state square', () => {
    const state = cartogram.find('[data-state="ca"]')
    expect(state.text()).toBe('Calif.')
  })

  it('makes passed-in states the highlighted color', () => {
    const state = cartogram.find('[data-state="ca"] > div')
    expect(state.prop('style').backgroundColor).toBe('red')
  })

  it('makes non-highlighted states the default color', () => {
    const state = cartogram.find('[data-state="ny"] > div')
    expect(state.prop('style').backgroundColor).toBe('#eee')
  })
})
