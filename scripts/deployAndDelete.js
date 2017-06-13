/* eslint-disable no-console */

/*
deploy any commit to an app named like after the branch
if the last commit is a merge commit (written with an
assumption of a protected main/master branch), then
delete that branch's app.
*/

const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const yaml = require('js-yaml')

const APP_NAME_BASE = 'crime-data-explorer'
const MANIFEST_DIR = path.join(__dirname, '../manifests')
const MANIFEST_BASE = path.join(MANIFEST_DIR, 'master.yml')

const execThen = cmd =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) return reject(err || stderr)

      return resolve(stdout)
    })
  })

const fsReadThen = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) return reject(err)

      return resolve(file)
    })
  })

const fsWriteThen = (filePath, contents) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, err => {
      if (err) return reject(err)
      return resolve(filePath)
    })
  })

const appName = branch => `${APP_NAME_BASE}-${branch}`

const createNewManifest = (base, branch) => {
  // assumes a single application in the manifest
  const app = Object.assign({}, base.applications[0], {
    name: appName(branch),
    host: appName(branch),
    disk_quota: '256M', // this is not very generic, but we have a simple app
    memory: '256M', // samsies
  })
  return Object.assign({}, base, {
    applications: [app],
  })
}

const deployApp = branch => {
  console.log(`deploying ${appName(branch)}`)
  return fsReadThen(MANIFEST_BASE)
    .then(manifest => {
      try {
        return yaml.safeLoad(manifest)
      } catch (e) {
        throw e
      }
    })
    .then(manifest => {
      console.log(`creating manifest for ${appName(branch)}`)
      return manifest
    })
    .then(manifest => createNewManifest(manifest, branch))
    .then(manifest => `---\n${yaml.safeDump(manifest)}`)
    .then(manifest => {
      const manifestPath = path.join(MANIFEST_DIR, `${branch}.yml`)
      return fsWriteThen(manifestPath, manifest)
    })
    .then(manifestPath => {
      const cmd = `cf push -f ${manifestPath}`
      console.log(`pushing ${appName(branch)}`)
      return execThen(cmd).then(() => cmd)
    })
}

const deleteApp = branch => {
  const cmd = `cf delete -f ${appName(branch)}`
  console.log(`deleteing ${appName(branch)}`)
  return execThen(cmd).then(() => cmd)
}

const getCurrentBranch = () => {
  const cmd = 'git rev-parse --abbrev-ref HEAD'
  return execThen(cmd).then(branch => branch.replace(/\n/g, ''))
}

execThen('git log -1')
  .then(log => {
    const mergeRegex = /Merge pull request #\d+ from (\w+)\/(.+)/
    const matches = log.match(mergeRegex)

    if (matches) return deleteApp(matches[2])

    return getCurrentBranch().then(branch => {
      if (branch !== 'master') return deployApp(branch)
      return 'no command. do not run on master branch'
    })
  })
  .then(cmd => console.log(`successfully ran ${cmd}`))
  .catch(err => console.error(err))
