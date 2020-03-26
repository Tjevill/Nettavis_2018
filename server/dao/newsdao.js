

const Dao = require("./dao.js");

module.exports = class NewsDao extends Dao{

    getAll(callback: any){
        super.query("SELECT id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet FROM nyheter ORDER BY tidspunkt DESC",[],callback);
    };

    getOne(id:number, callback:any){
        super.query("SELECT id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet FROM nyheter WHERE id=?",
            [id],
            callback
        );
    };

    getPriOne(callback:any){
        super.query("SELECT id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet FROM nyheter WHERE viktighet=1 ORDER BY tidspunkt DESC LIMIT 20",[],callback);
    };

    getHeadlines(callback:any){
        super.query("SELECT id, overskrift, tidspunkt FROM nyheter ORDER BY tidspunkt DESC",[],callback);
    };

    getCategories(callback:any){
        super.query("SELECT DISTINCT kategori FROM nyheter",[], callback);
    };

    
    getNewsWithCategory(kategori:string, callback:any){
        super.query("SELECT id, overskrift, innhold, tidspunkt, bilde, kategori, viktighet FROM nyheter WHERE kategori=? ORDER BY tidspunkt DESC",
            [kategori],
            callback
        );
    };

    createArticle(json:any, callback:any){
        var val = [json.overskrift,json.innhold,json.bilde,json.kategori,json.viktighet];
        super.query(
            "INSERT into nyheter (overskrift, innhold, bilde, kategori, viktighet) VALUES (?,?,?,?,?)",
            val,
            callback
        );
    };

    updateArticle(json:any, callback:any){
        var val = [json.overskrift, json.innhold, json.bilde, json.kategori, json.viktighet, json.id];
        super.query(
            "UPDATE nyheter SET overskrift = ? , innhold = ?, bilde = ?, kategori = ?, viktighet = ? WHERE id = ?",
            val,
            callback
        );
    }

    deleteArticle(id, callback:any){
    
        super.query(
            "DELETE FROM nyheter WHERE nyheter.id = ?",
            [id],
            callback
        );
    };
}