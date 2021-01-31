const  Person  = require('../Models/Person');
const sayProfil = async (req, res) => {
    return res.send('Post page')
}

module.exports = {
    sayProfil,
}