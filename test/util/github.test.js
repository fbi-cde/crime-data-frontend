/* eslint no-undef: 0 */
import http from 'axios'
import sinon from 'sinon'

import { createIssue } from '../../src/util/github'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err)
}

describe('github utility', () => {
  let sandbox
  const issue = {
    body: 'body',
    owner: 'owner',
    repo: 'repo',
    title: 'title',
    token: 'token',
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should make a request to the proper github api', done => {
    const spy = sandbox.stub(http, 'post', () => createPromise({}))
    createIssue(issue).then(() => {
      const url = spy.args[0][0]
      const { Authorization: auth } = spy.args[0][2].headers

      expect(url).toEqual(
        `https://api.github.com/repos/${issue.owner}/${issue.repo}/issues`,
      )
      expect(auth).toEqual(`token ${issue.token}`)
      done()
    })
  })
})
