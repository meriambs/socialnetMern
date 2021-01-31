const  Person  = require('../Models/Person');

const sayauth = async (req, res) => {
  
    return res.send('say auth hello')
}

module.exports = {
    sayauth,
}