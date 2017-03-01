import data from '../../data/ucr-program-participation.json'
import { slugify } from './text'

export default function (state) { return data[slugify(state)] }
