/* eslint no-undef: 0 */

import markdown from '../../src/util/md'

describe('markdown util', () => {
  it('should render markdown to html', () => {
    const actual = markdown.render('# test\nfake text')
    expect(actual.trim()).toEqual('<h1>test</h1>\n<p>fake text</p>')
  })

  it('should properly render glossary links', () => {
    const actual = markdown.render('[yo](#glossary?term=yo)')
    expect(actual.trim()).toEqual(
      '<p><a href="#glossary?term=yo" class="underline glossary-icon glossary-icon-md">yo</a></p>',
    )
  })
})
