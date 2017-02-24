import data from '../../data/ucr-program-participation.json'

const ucrParticipation = state => data[state] || null

export default ucrParticipation
