/* eslint-disable*/
const sexCodes = {
  F: 'Female',
  M: 'Male',
  U: 'Unknown',
}

export const offenseMapping = {
  'aggravated-assault': 'Aggravated Assault',
  burglary: 'Burglary/Breaking & Entering',
  larceny: [
    'Not Specified',
    'Theft of Motor Vehicle Parts or Accessories',
    'Pocket-picking',
    'Theft From Motor Vehicle',
    'Purse-snatching',
    'Shoplifting',
    'All Other Larceny',
    'Theft From Building',
    'Theft From Coin-Operated Machine or Device',
  ],
  'motor-vehicle-theft': 'Motor Vehicle Theft',
  homicide: 'Murder and Nonnegligent Manslaughter',
  rape: ['Rape', 'Sexual Assault With An Object', 'Sodomy'],
  robbery: 'Robbery',
  arson: 'Arson',
}


// data munging functions

export const reshape = (data, key) => {
  const counts = data.reduce((a, b) => {
    a[b[key]] = (a[b[key]] || 0) + +b.count // eslint-disable-line no-param-reassign
    return a
  }, {})

  return Object.keys(counts).map(k => ({ key: k, count: counts[k] }))
}

const offenses = (data, offense) => {
  const nibrsOffense = offenseMapping[offense]


  const offenseData = data.offenseOffenseName.filter(d => {
    if (nibrsOffense.forEach) {
      let isSame = false
      nibrsOffense.forEach(o => {
        if (d.offense_name === o) isSame = true
      })
      return isSame
    }
    return d.offense_name === nibrsOffense
  })

  return {
    title: 'Offenses',
    data: reshape(offenseData, 'offense_name'),
  }
}

const getOffenseData = (data, offense) => {
  const nibrsOffense = offenseMapping[offense]
  const filteredData = [];
  for (const i in data) {
    if (nibrsOffense.indexOf(data[i].offense_name) > -1) {
      filteredData.push(data[i])
    }
  }
  return filteredData;
}

export const reshapeSexData = (data, offense) => {
  let male = 0;
  let female = 0
  let unknown = 0
  for (const i in data) {
    male += data[i].male_count
    female += data[i].female_count
    unknown += data[i].unknown_count
  }
  const objs = [];
  let obj = {}
  obj.count = male
  obj.key = 'Male'
  objs.push(obj)
  obj = {}
  obj.count = female
  obj.key = 'Female'
  objs.push(obj)
  obj = {}
  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  return objs;
}

export const reshapeRaceData = (data, offense) => {
  let americanIndian = 0;
  let asian = 0
  let black = 0
  let nativeHawaiian = 0
  let unknown = 0
  let white = 0

  for (const i in data) {
    asian += data[i].asian
    black += data[i].black
    white += data[i].white
    unknown += data[i].unknown
    nativeHawaiian += data[i].native_hawaiian
    americanIndian += data[i].american_indian
  }
  const objs = [];
  let obj = {}
  obj.count = americanIndian
  obj.key = 'American Indian or Alaska Native'
  objs.push(obj)
  obj = {}

  obj.count = asian
  obj.key = 'Asian'
  objs.push(obj)
  obj = {}

  obj.count = black
  obj.key = 'Black or African American'
  objs.push(obj)
  obj = {}

  obj.count = white
  obj.key = 'White'
  objs.push(obj)
  obj = {}

  obj.count = nativeHawaiian
  obj.key = 'Native Hawaiian or Pacific Islander'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}

  return objs;
}

export const reshapeEthnicityData = (data, offense) => {
  let hispanic = 0;
  let multiple = 0
  let notHispanic = 0
  let unknown = 0

  for (const i in data) {
    hispanic += data[i].hispanic
    multiple += data[i].multiple
    notHispanic += data[i].not_hispanic
    unknown += data[i].unknown
  }
  const objs = [];
  let obj = {}
  obj.count = hispanic
  obj.key = 'Hispanic or Latino'
  objs.push(obj)
  obj = {}

  obj.count = notHispanic
  obj.key = 'Not Hispanic or Latino'
  objs.push(obj)
  obj = {}

  obj.count = multiple
  obj.key = 'Multiple'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}

  return objs;
}

export const reshapeLocationData = (data, offense) => {
  let residencehome = 0
  let parkinggaragelot = 0
  let abandonedcondemnedstructure = 0
  let airbustrainterminal = 0
  let amusementpark = 0
  let arenastadiumfairgrounds = 0
  let atmseparatefrombank = 0
  let autodealership = 0
  let bank = 0
  let barnightclub = 0
  let campground = 0
  let churchsynagoguetemplemosque = 0
  let commercialofficebuilding = 0
  let communitycenter = 0
  let constructionsite = 0
  let cyberspace = 0
  let daycarefacility = 0
  let departmentdiscountstore = 0
  let dockwharfshippingterminal = 0
  let drugstoredoctorsofficehospital = 0
  let farmfacility = 0
  let fieldwoods = 0
  let gamblingfacilitycasinoracetrack = 0
  let governmentpublicbuilding = 0
  let grocerystore = 0
  let highwayalleystreetsidewalk = 0
  let hotelmotel = 0
  let industrialsite = 0
  let jailprisoncorrectionsfacility = 0
  let lakewaterwaybeach = 0
  let liquorstore = 0
  let militarybase = 0
  let unknown = 0
  let parkplayground = 0
  let rentalstoragefacility = 0
  let restarea = 0
  let restaurant = 0
  let schoolcollege = 0
  let schoolcollegeuniversity = 0
  let schoolelementarysecondary = 0
  let gasstation = 0
  let missionhomelessshelter = 0
  let shoppingmall = 0
  let specialtystore = 0
  let triballands = 0
  let conveniencestore = 0

  for (const i in data) {
    residencehome += data[i].residence_home
    parkinggaragelot += data[i].parking_garage__lot
    abandonedcondemnedstructure += data[i].abandoned_condemned__structure
    airbustrainterminal += data[i].air__bus__train_terminal
    amusementpark += data[i].amusement_park
    arenastadiumfairgrounds += data[i].arena__stadium__fairgrounds
    atmseparatefrombank += data[i].atm_separate_from_bank
    autodealership += data[i].auto_dealership
    bank += data[i].bank
    barnightclub += data[i].bar_nightclub
    campground += data[i].campground
    churchsynagoguetemplemosque += data[i].church__synagogue__temple__mosque
    commercialofficebuilding += data[i].commercial__office_building
    communitycenter += data[i].community_center
    constructionsite += data[i].construction_site
    cyberspace += data[i].cyberspace
    daycarefacility += data[i].daycare_facility
    departmentdiscountstore += data[i].department__discount_store
    dockwharfshippingterminal += data[i].dock__wharf__shipping_terminal
    drugstoredoctorsofficehospital += data[i].drug_store__doctors_office__hospital
    farmfacility += data[i].farm_facility
    fieldwoods += data[i].field__woods
    gamblingfacilitycasinoracetrack += data[i].gambling_facility__casino__race_track
    governmentpublicbuilding += data[i].government__public_building
    grocerystore += data[i].grocery_store
    highwayalleystreetsidewalk += data[i].highway__alley__street__sidewalk
    hotelmotel += data[i].hotel__motel
    industrialsite += data[i].industrial_site
    jailprisoncorrectionsfacility += data[i].jail__prison__corrections_facility
    lakewaterwaybeach += data[i].lake__waterway__beach
    liquorstore += data[i].liquor_store
    militarybase += data[i].military_base
    unknown += data[i].unknown
    parkplayground += data[i].park__playground
    rentalstoragefacility += data[i].rental_storage_facility
    restarea += data[i].rest_area
    restaurant += data[i].restaurant
    schoolcollege += data[i].school__college
    schoolcollegeuniversity += data[i].school_college__university
    schoolelementarysecondary += data[i].school_elementary__secondary
    gasstation += data[i].gas_station
    missionhomelessshelter += data[i].mission__homeless_shelter
    shoppingmall += data[i].shopping_mall
    specialtystore += data[i].specialty_store
    triballands += data[i].tribal_lands
    conveniencestore += data[i].convenience_store
  }

  const objs = [];
  let obj = {}
  obj.count = residencehome
  obj.key = 'Residence/Home'
  objs.push(obj)
  obj = {}

  obj.count = parkinggaragelot
  obj.key = 'Parking Garage/Lot'
  objs.push(obj)
  obj = {}

  obj.count = abandonedcondemnedstructure
  obj.key = 'Abandoned/Condemned Structure'
  objs.push(obj)
  obj = {}

  obj.count = airbustrainterminal
  obj.key = 'Air/Bus/Train Terminal'
  objs.push(obj)
  obj = {}

  obj.count = amusementpark
  obj.key = 'Amusement Park'
  objs.push(obj)
  obj = {}

  obj.count = arenastadiumfairgrounds
  obj.key = 'Arena/Stadium/Fairgrounds/Coliseum'
  objs.push(obj)
  obj = {}

  obj.count = atmseparatefrombank
  obj.key = 'ATM Separate From Bank'
  objs.push(obj)
  obj = {}

  obj.count = autodealership
  obj.key = 'Auto Dealership New/Used'
  objs.push(obj)
  obj = {}

  obj.count = bank
  obj.key = 'Bank/Saving and Loan'
  objs.push(obj)
  obj = {}

  obj.count = barnightclub
  obj.key = 'Bar/Nightclub'
  objs.push(obj)
  obj = {}

  obj.count = campground
  obj.key = 'Camnp/Campground'
  objs.push(obj)
  obj = {}

  obj.count = churchsynagoguetemplemosque
  obj.key = 'Church/Synagogue/Temple/Mosque'
  objs.push(obj)
  obj = {}

  obj.count = commercialofficebuilding
  obj.key = 'Commercial/Office Building'
  objs.push(obj)
  obj = {}

  obj.count = communitycenter
  obj.key = 'Community Center'
  objs.push(obj)
  obj = {}

  obj.count = constructionsite
  obj.key = 'Construction Site'
  objs.push(obj)
  obj = {}

  obj.count = conveniencestore
  obj.key = 'Convenience Store'
  objs.push(obj)
  obj = {}

  obj.count = cyberspace
  obj.key = 'Cyberspace'
  objs.push(obj)
  obj = {}

  obj.count = daycarefacility
  obj.key = 'Daycare Facility'
  objs.push(obj)
  obj = {}

  obj.count = departmentdiscountstore
  obj.key = 'Department/Discount Store'
  objs.push(obj)
  obj = {}

  obj.count = dockwharfshippingterminal
  obj.key = 'Dock/Wharf/Modal Terminal'
  objs.push(obj)
  obj = {}

  obj.count = drugstoredoctorsofficehospital
  obj.key = 'Drug Store/Doctors Office/Hospital'
  objs.push(obj)
  obj = {}

  obj.count = farmfacility
  obj.key = 'Farm Facility'
  objs.push(obj)
  obj = {}

  obj.count = fieldwoods
  obj.key = 'Field/Woods'
  objs.push(obj)
  obj = {}

  obj.count = gamblingfacilitycasinoracetrack
  obj.key = 'Gambling Facility/Casino/Race Track'
  objs.push(obj)
  obj = {}

  obj.count = governmentpublicbuilding
  obj.key = 'Government/Public Building'
  objs.push(obj)
  obj = {}

  obj.count = grocerystore
  obj.key = 'Grocery/Supermarket'
  objs.push(obj)
  obj = {}

  obj.count = highwayalleystreetsidewalk
  obj.key = 'Highway/Road/Alley/Street/Sidewalk'
  objs.push(obj)
  obj = {}

  obj.count = hotelmotel
  obj.key = 'Hotel/Motel/Etc.'
  objs.push(obj)
  obj = {}

  obj.count = industrialsite
  obj.key = 'Industrial Site'
  objs.push(obj)
  obj = {}

  obj.count = jailprisoncorrectionsfacility
  obj.key = 'Jail/Prison/Penitentiary/Corrections Facility'
  objs.push(obj)
  obj = {}

  obj.count = lakewaterwaybeach
  obj.key = 'Lake/Waterway/Beach'
  objs.push(obj)
  obj = {}

  obj.count = liquorstore
  obj.key = 'Liquor Store'
  objs.push(obj)
  obj = {}

  obj.count = militarybase
  obj.key = 'Military Installation'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Other/Unknown'
  objs.push(obj)
  obj = {}

  obj.count = parkplayground
  obj.key = 'Park/Playground'
  objs.push(obj)
  obj = {}

  obj.count = rentalstoragefacility
  obj.key = 'Rental Storage Facility'
  objs.push(obj)
  obj = {}

  obj.count = restarea
  obj.key = 'Rest Area'
  objs.push(obj)
  obj = {}

  obj.count = restaurant
  obj.key = 'Restaurant'
  objs.push(obj)
  obj = {}

  obj.count = schoolcollege
  obj.key = 'School College'
  objs.push(obj)
  obj = {}

  obj.count = schoolcollegeuniversity
  obj.key = 'School-College/University'
  objs.push(obj)
  obj = {}

  obj.count = schoolelementarysecondary
  obj.key = 'School-Elementary Secondary'
  objs.push(obj)
  obj = {}

  obj.count = gasstation
  obj.key = 'Service/Gas Station'
  objs.push(obj)
  obj = {}

  obj.count = missionhomelessshelter
  obj.key = 'Shelter-Mission/Homeless'
  objs.push(obj)
  obj = {}

  obj.count = shoppingmall
  obj.key = 'Shopping Mall'
  objs.push(obj)
  obj = {}

  obj.count = specialtystore
  obj.key = 'Specialty Store'
  objs.push(obj)
  obj = {}

  obj.count = triballands
  obj.key = 'Tribal Lands'
  objs.push(obj)
  obj = {}

  return objs;
}

export const reshapeRelationship = (data, offense) => {
  let acquaintance = 0
  let babysittee = 0
  let boyfriendgirlfriend = 0
  let childboyfriendgirlfriend = 0
  let child = 0
  let commonlawspouse = 0
  let employee = 0
  let employer = 0
  let friend = 0
  let grandchild = 0
  let grandparent = 0
  let homosexualrelationship = 0
  let inlaw = 0
  let neighbor = 0
  let otherfamilymember = 0
  let otherwiseknown = 0
  let parent = 0
  let relationshipunknown = 0
  let sibling = 0
  let stepchild = 0
  let spouse = 0
  let stepparent = 0
  let stepsibling = 0
  let stranger = 0
  let offender = 0
  let exspouse = 0

  for (const i in data) {
    acquaintance += data[i].acquaintance
    babysittee += data[i].babysittee
    boyfriendgirlfriend += data[i].boyfriend_girlfriend
    childboyfriendgirlfriend += data[i].child_boyfriend_girlfriend
    child += data[i].child
    commonlawspouse += data[i].common_law_spouse
    employee += data[i].employee
    employer += data[i].employer
    friend += data[i].friend
    grandchild += data[i].grandchild
    grandparent += data[i].grandparent
    homosexualrelationship += data[i].homosexual_relationship
    inlaw += data[i].in_law
    neighbor += data[i].neighbor
    otherfamilymember += data[i].other_family_member
    otherwiseknown += data[i].otherwise_known
    parent += data[i].parent
    relationshipunknown += data[i].relationship_unknown
    sibling += data[i].sibling
    stepchild += data[i].stepchild
    spouse += data[i].spouse
    stepparent += data[i].stepparent
    stepsibling += data[i].stepsibling
    stranger += data[i].stranger
    offender += data[i].offender
    exspouse += data[i].ex_spouse
  }

  const objs = [];
  let obj = {}

  obj.count = acquaintance
  obj.key = 'Acquaintance'
  objs.push(obj)
  obj = {}

  obj.count = babysittee
  obj.key = 'Babysittee'
  objs.push(obj)
  obj = {}

  obj.count = boyfriendgirlfriend
  obj.key = 'Boyfriend/Girlfriend'
  objs.push(obj)
  obj = {}

  obj.count = childboyfriendgirlfriend
  obj.key = 'Child of Boyfriend/Girlfriend'
  objs.push(obj)
  obj = {}

  obj.count = child
  obj.key = 'Child'
  objs.push(obj)
  obj = {}

  obj.count = commonlawspouse
  obj.key = 'Common Law Spouse'
  objs.push(obj)
  obj = {}

  obj.count = employee
  obj.key = 'Employee'
  objs.push(obj)
  obj = {}

  obj.count = employer
  obj.key = 'Employer'
  objs.push(obj)
  obj = {}

  obj.count = friend
  obj.key = 'Friend'
  objs.push(obj)
  obj = {}

  obj.count = grandchild
  obj.key = 'Grandchild'
  objs.push(obj)
  obj = {}

  obj.count = grandparent
  obj.key = 'Grandparent'
  objs.push(obj)
  obj = {}

  obj.count = homosexualrelationship
  obj.key = 'Homosexual Relationship'
  objs.push(obj)
  obj = {}

  obj.count = inlaw
  obj.key = 'Inlaw'
  objs.push(obj)
  obj = {}

  obj.count = neighbor
  obj.key = 'Neighbor'
  objs.push(obj)
  obj = {}

  obj.count = otherfamilymember
  obj.key = 'Other Family Member'
  objs.push(obj)
  obj = {}

  obj.count = otherwiseknown
  obj.key = 'Otherwise Known'
  objs.push(obj)
  obj = {}

  obj.count = parent
  obj.key = 'Parent'
  objs.push(obj)
  obj = {}

  obj.count = relationshipunknown
  obj.key = 'Relationship Unknown'
  objs.push(obj)
  obj = {}

  obj.count = sibling
  obj.key = 'Sibling'
  objs.push(obj)
  obj = {}

  obj.count = stepchild
  obj.key = 'Stepchild'
  objs.push(obj)
  obj = {}

  obj.count = spouse
  obj.key = 'Spouse'
  objs.push(obj)
  obj = {}

  obj.count = stepparent
  obj.key = 'Step-parent'
  objs.push(obj)
  obj = {}

  obj.count = stepsibling
  obj.key = 'Step-sibling'
  objs.push(obj)
  obj = {}

  obj.count = stranger
  obj.key = 'Stranger'
  objs.push(obj)
  obj = {}

  obj.count = offender
  obj.key = 'Offender'
  objs.push(obj)
  obj = {}

  obj.count = exspouse
  obj.key = 'Ex-spouse'
  objs.push(obj)
  obj = {}

  return objs
}


export const reshapeAgeData = (data, offense) => {
  let range09 = 0;
  let range1019 = 0
  let range2029 = 0
  let range3039 = 0
  let range4049 = 0
  let range5059 = 0
  let range6069 = 0
  let range7079 = 0
  let range8089 = 0
  let range9099 = 0
  let unknown = 0;

  for (const i in data) {
    range09 += data[i].range_0_9
    range1019 += data[i].range_10_19
    range2029 += data[i].range_20_29
    range3039 += data[i].range_30_39
    range4049 += data[i].range_40_49
    range5059 += data[i].range_50_59
    range6069 += data[i].range_60_69
    range7079 += data[i].range_70_79
    range8089 += data[i].range_80_89
    range9099 += data[i].range_90_99
    unknown += data[i].unknown

  }

  const objs = [];
  let obj = {}
  obj.count = range9099
  obj.key = '90-99'
  objs.push(obj)
  obj = {}

  obj.count = range8089
  obj.key = '80-89'
  objs.push(obj)
  obj = {}

  obj.count = range7079
  obj.key = '70-79'
  objs.push(obj)
  obj = {}

  obj.count = range6069
  obj.key = '60-69'
  objs.push(obj)
  obj = {}

  obj.count = range5059
  obj.key = '50-59'
  objs.push(obj)
  obj = {}

  obj.count = range4049
  obj.key = '40-49'
  objs.push(obj)
  obj = {}

  obj.count = range3039
  obj.key = '30-39'
  objs.push(obj)
  obj = {}

  obj.count = range2029
  obj.key = '20-29'
  objs.push(obj)
  obj = {}

  obj.count = range1019
  obj.key = '10-19'
  objs.push(obj)
  obj = {}

  obj.count = range09
  obj.key = '0-9'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}

  return objs;
}


// nibrs cards

const offenderDemo = (data, offense) => {
  const {
    offenderAge,
    offenderEthnicity,
    offenderRace,
    offenderSex,
  } = data


  const obj = {
    title: 'Offender demographics',
    data: [
      {
        data: reshapeSexData(offenderSex, offense),
        noun: 'offender',
        sentenceStart: 'Sex',
        title: 'Sex of offender',
        type: 'stacked',
        keys: Object.values(sexCodes),
      },
      {
        data: reshapeAgeData(offenderAge, offense),
        noun: 'offender',
        title: 'Age of offender',
        type: 'table',
        xLabel: 'Offender Age',
      },
      {
        data: reshapeRaceData(offenderRace, offense),
        noun: 'offender',
        title: 'Race of offender',
        type: 'table',
        sentenceStart: 'Race',
      },
      {
        data: reshapeEthnicityData(offenderEthnicity, offense),
        noun: 'offender',
        title: 'Ethnicity of offender',
        type: 'table',
        sentenceStart: 'Ethnicity',
      },
    ],
  }
  return obj;
}

const victimDemo = (data, offense) => {
  const { victimAge, victimEthnicity, victimRace, victimSex } = data

  const obj = {
    title: 'Victim demographics',
    data: [
      {
        data: reshapeSexData(victimSex, offense),
        noun: 'victim',
        sentenceStart: 'Sex',
        title: 'Sex of victim',
        type: 'stacked',
        keys: Object.values(sexCodes),
      },
      {
        data: reshapeAgeData(victimAge, offense),
        noun: 'victim',
        title: 'Age of victim',
        type: 'table',
        xLabel: 'Victim Age',
      },
      {
        data: reshapeRaceData(victimRace, offense),
        noun: 'victim',
        title: 'Race of victim',
        type: 'table',
        sentenceStart: 'Race',
      },
      {
        data: reshapeEthnicityData(victimEthnicity, offense),
        noun: 'victim',
        title: 'Ethnicity of victim',
        type: 'table',
        sentenceStart: 'Ethnicity',
      },
    ],
  }
  return obj;
}


const relationships = (data, offense) => {
  const { victimRelationships } = data

  return {
    title: 'Victim’s relationship to the offender',
    data: [
      {
        data: reshapeRelationship(victimRelationships, offense),
        sortByValue: true,
        type: 'table',
        sentenceStart: 'The victim’s relationship to the offender',
      },
    ],
  }
}

export const offensesDemo = (data, offense) => {
  let count = 0

  for (const i in data) {
    count += data[i].offense_count
  }
  const obj = {};
  obj.count = count;
  obj.key = offense
  return {
    title: 'Offenses',
    data: obj,
  }
}

const locations = (data, offense) => ({
    title: 'Location type',
    data: [
      {
        data: reshapeLocationData(data, offense),
        sortByValue: true,
        type: 'table',
        sentenceStart: 'Location type',
      },
    ],
  })
const parseNibrsCounts = (data, offense) => [
  offenderDemo(data, offense),
  victimDemo(data, offense),
  relationships(data, offense),
  locations(data.victimLocation, offense),
  offensesDemo(data.offense, offense),
]

export default parseNibrsCounts
