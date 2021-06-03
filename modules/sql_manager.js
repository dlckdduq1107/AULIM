var db_config = require('../database');
var conn = db_config.init();
db_config.connect(conn);

module.exports = {
    execute : function(sql) {
        conn.query(sql, (err, result) => {
            if(err) console.log('sql error!');
            else console.log('sql inserted.');
        })
    }
}