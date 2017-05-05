/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import OnEscape from '../../src/components/OnEscape'

describe('OnEscape', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('calls handler prop fn when escape key is pressed', () => {
    const fn = sandbox.spy()
    const wrapper = shallow(<OnEscape handler={fn} />)
    wrapper.instance().handleKeydown({ keyCode: 27 })

    expect(fn.callCount).toEqual(1)
  })

  it('does not call handler prop fn when other keys are pressed', () => {
    const fn = sandbox.spy()
    const wrapper = shallow(<OnEscape handler={fn} />)
    wrapper.instance().handleKeydown({ keyCode: 10 })

    expect(fn.callCount).toEqual(0)
  })
})
