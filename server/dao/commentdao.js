// @ flow

const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao{

    getAll(id: number, callback: any){
        super.query("SELECT id, username, comment, date FROM comment WHERE id = ? ORDER BY date DESC",
            [id],
            callback
        );
    };

    createComment(json:any, callback:any){
        var val = [json.id, json.username, json.comment];
        super.query(
            "INSERT into comment (id, username, comment) VALUES (?,?,?)",
            val,
            callback
        );
    };
}