import { slugify } from './text'
import lookupUsa from './usa'

export const oriToState = ori => slugify(lookupUsa(ori.slice(0, 2)))
