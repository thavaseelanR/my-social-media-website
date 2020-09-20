async function totalLikeEvent(sessionid) {
    try {
        const sql = `select userspost.id, like_table.total_like from userspost inner join
        (select post_id, count(*) as total_like from like_dislike group by post_id )
        as like_table on userspost.id = like_table.post_id`;
        const [rows, fileds] = await dbConnection.execute(sql);
        if (rows.length >= 0) {
            return rows;
        }
        else {
            return 'failed';
        }

    }
    catch (e) {
        console.log(e);
    }
}

module.exports = totalLikeEvent;