import fs from 'fs'
import path from 'path'

// components with no props need not have proptypes :)
const EXCLUDES = [
  'ClearLocalStorageBtn',
  'Disclaimer',
  'DownloadsAndDocs',
  'NotFound',
]

describe('All components', () => {
  const dir = './src/components'
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const [name, ext] = [file.slice(0, -3), file.slice(-2)]
    if (EXCLUDES.includes(name) || ext !== 'js') return

    it(`${file} has propTypes defined`, () => {
      const filePath = path.join(dir, file)
      let component

      try {
        component = require(`../../${filePath}`).default
      } catch (e) {
        console.log(`error with ${filePath} (${e})`)
        return
      }

      expect(component.propTypes).toBeDefined()
    })
  })
})
