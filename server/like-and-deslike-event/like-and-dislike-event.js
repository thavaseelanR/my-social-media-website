async function likeAndDislike(sessionid, postId) {
    try {
        const sql = `select id from users where sessionid=:sessionidEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        })
        const id = rows[0].id;
        if (id >= 0) {
            const sql = `select count(*) as total_like from like_dislike inner join users 
        on users.id = like_dislike.like_dislike_user_id 
        where users.sessionid =:sessionidEle and post_id =:post_idEle`;
            const [rows, fileds] = await dbConnection.execute(sql, {
                sessionidEle: sessionid,
                post_idEle: postId
            });
            const userLike = rows[0].total_like;

            if (userLike ==1 && postId) {
                return "already liked"
            }
            else{
                const sql = `insert into like_dislike (post_id, like_dislike_user_id) 
            values (:post_idEle, :like_dislike_user_idEle )`;

                const [rows, fileds] = await dbConnection.execute(sql, {
                    post_idEle: postId,
                    like_dislike_user_idEle: id,
                });
                if (rows.affectedRows == 1) {

                    return 'success';
                }
                else {
                    return 'failed';
                }
            }
           
            }
        }
    
    catch (e) {
        console.log(e);
    }
}
module.exports = likeAndDislike;