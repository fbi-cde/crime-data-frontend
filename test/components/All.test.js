import fs from 'fs'
import path from 'path'

// components with no props need not have proptypes :)
const EXCLUDES = [
  'ClearCacheBtn',
  'Disclaimer',
  'DownloadsAndDocs',
  'DownloadBulkNibrs',
  'NotFound',
  'Terms',
  'TrendChartRapeLegend',
]

describe('All components', () => {
  const dir = './src/components'
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const [name, ext] = [file.slice(0, -3), file.slice(-2)]
    if (EXCLUDES.includes(name) || ext !== 'js') return

    let component
    try {
      const filePath = path.join(dir, file)
      component = require(`../../${filePath}`).default
    } catch (e) {
      console.log(`skipping ${file}... (reason: ${e})`)
      return
    }

    it(`${file} has propTypes defined`, () => {
      expect(component.propTypes).toBeDefined()
    })
  })
})
