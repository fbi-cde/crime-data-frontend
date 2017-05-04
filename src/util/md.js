import md from 'markdown-it'

// adopted from examples in markdown-it docs
// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer

const markdown = md()

const defaultLinkRender =
  markdown.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'underline'])
  return defaultLinkRender(tokens, idx, options, env, self)
}

export default markdown
