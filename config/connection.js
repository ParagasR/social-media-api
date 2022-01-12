const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialNetworkAPI', {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;