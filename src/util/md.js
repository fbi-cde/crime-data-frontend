import md from 'markdown-it'

// adopted from examples in markdown-it docs
// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer

const markdown = md({ html: true, xhtmlOut: true })

const defaultLinkRender =
  markdown.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const href = token.attrs.find(a => a[0] === 'href')
  const isTerm = href[1].match(/#glossary\?term=/)
  const gi = 'glossary-icon glossary-icon-md'

  token.attrPush(['class', `underline ${isTerm && gi}`])
  return defaultLinkRender(tokens, idx, options, env, self)
}

export default markdown
