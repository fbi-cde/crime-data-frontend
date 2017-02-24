import data from '../../data/ucr-program-participation.json'
import { slugify } from './text'

const ucrParticipation = state => data[slugify(state)] || null

export default ucrParticipation
