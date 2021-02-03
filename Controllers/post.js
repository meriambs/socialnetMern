const  User  = require('../Models/User');

const sayPost = async (req, res) => {

    return res.send('Post page')
}

module.exports = {
    sayPost,
}