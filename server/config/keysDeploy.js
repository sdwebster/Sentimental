// This file should work for deployment

module.exports.mysqlUser = {
  username: '',
  password: ''
}

// make something like this
module.exports.sourceAPIKeys = {
  'nyt': process.env.CUSTOMCONNSTR_NYT_API_KEY,
  'NYT': {
    username: '',
    password: ''
  }, 
  'guardian': process.env.CUSTOMCONNSTR_GUARDIAN_API_KEY
}

module.exports.indicoAPIKey = {
  key: process.env.CUSTOMCONNSTR_INDICO_API_KEY
}
