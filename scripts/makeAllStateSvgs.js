/*
  converts topology json data for each state into individual svg elements
  (in case we don't want to do this on the fly)
*/

const fs = require('fs')
const path = require('path')

const d3Geo = require('d3-geo')
const topojson = require('topojson')

const geoPath = d3Geo.geoPath
const feature = topojson.feature

const gpath = geoPath().projection(null)
const stateIcons = JSON.parse(fs.readFileSync('../data/state-icons.json'))
let state, geo, dest, svg // eslint-disable-line one-var, one-var-declaration-per-line

Object.keys(stateIcons).forEach(abbrev => {
  state = stateIcons[abbrev]
  geo = feature(state, state.objects.icon)
  dest = path.join(__dirname, `../public/svg/${abbrev.toLowerCase()}.svg`)

  svg = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
  width="100" height="100" viewBox="0 0 100 100">
  <path d="${gpath(geo)}" fill="#95AABC"></path>
</svg>`

  fs.writeFileSync(dest, svg)
})
