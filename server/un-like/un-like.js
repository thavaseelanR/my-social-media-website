async function unLike(sessionid) {
    try {
        const sql = ` select like_dislike.post_id from like_dislike inner join
        users on users.id = like_dislike.like_dislike_user_id
        where users.sessionid = :sessionidEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });
        const userPostId = rows[0].post_id;
        if (rows.length >= 1) {
            return userPostId;
        }
        else {
            return "failed";
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = unLike;