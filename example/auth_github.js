// file: example/auth_github.js

const NodeVault = require("./../src/index")

process.env.DEBUG = 'vaultaire' // switch on debug mode
const vault = NodeVault()

const org = process.env.GITHUB_ORG
const team = process.env.GITHUB_TEAM || 'owners'
const token = process.env.GITHUB_TOKEN
const mountPoint = 'github'

vault.auths()
.then((result) => {
  if (Object.hasOwn(result,'github/')) return undefined
  return vault.enableAuth({
    mount_point: mountPoint,
    type: 'github',
    description: 'GitHub auth',
  })
})
.then(() => vault.write('auth/github/config', { organization: org }))
.then(() => vault.write(`auth/github/map/teams/${team}`, { value: 'root' }))
.then(() => vault.githubLogin({ token }))
.then(console.log)
.catch((err) => console.error(err.message))
