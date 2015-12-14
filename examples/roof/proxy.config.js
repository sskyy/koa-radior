module.exports = {
  'GET /radior/*': 'http://localhost:3000',
  'POST /radior/*': 'http://localhost:3000',
  'GET /style.css': 'http://spmjs.io/stylesheets/',
  'GET /func': function(req, callback) {
    callback(200, {}, '1');
  },
  'GET /local': './local',
};