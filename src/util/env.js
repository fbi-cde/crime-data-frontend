import cfenv from 'cfenv'

const env = cfenv.getAppEnv()

const combineServiceCredentials = services =>
  services.map(service => service.credentials || {}).reduce((a, n) => ({
    ...a,
    ...n,
  }))

const combineCfCUPSAndEnv = () => {
  const services = Object.keys(env.getServices()).map(service =>
    env.getService(service),
  )
  const combined = combineServiceCredentials(services)

  return {
    ...process.env,
    ...combined,
  }
}

export default combineCfCUPSAndEnv
