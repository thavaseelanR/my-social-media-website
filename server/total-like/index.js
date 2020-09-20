const getTotalLike = require('./total-like');

async function userLikes(req, res) {
    try {
        const sessionId = req.cookies.userSessionId;
        const totalLike = await getTotalLike(sessionId);
        res.send({
            status: totalLike
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = userLikes;