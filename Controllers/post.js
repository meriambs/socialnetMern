const  Person  = require('../Models/Person');

const sayPost = async (req, res) => {

    return res.send('Post page')
}

module.exports = {
    sayPost,
}