const knexfile = require('../knexfile.js')
const knex = require('knex')(knexfile)

knex.migrate.latest([knexfile])
module.exports = knex  