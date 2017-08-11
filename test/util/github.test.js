/* eslint no-undef: 0 */

import axios from 'axios'
import sinon from 'sinon'

import { createIssue } from '../../src/util/github'

describe('github utility', () => {
  let sandbox
  const fakeIssue = {
    body: 'fake text',
    owner: '18f',
    repo: 'fake-repo',
    title: 'fake title',
    token: 'fake-token',
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should post data to the github api', done => {
    const spy = sandbox.stub(axios, 'post', () => Promise.resolve([]))
    createIssue(fakeIssue).then(() => {
      const url = spy.getCall(0).args[0]
      expect(url).toEqual('https://api.github.com/repos/18f/fake-repo/issues')
      done()
    })
  })
})
