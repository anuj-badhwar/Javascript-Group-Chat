const mysql = require('mysql');

let connection = {};
const createConnection = function () {
    connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'chatUser',
            // password : 'secret',
            database : 'chatdb'
        }
    );
    return connection;
};

module.exports = {

    addHistory : function(data){
        const conn = createConnection();
        conn.connect();

        queryString = "INSERT INTO chatlist VALUES (" +
            (new Date).getTime() + " , " +
            "'" + data.user + "', " +
            "'" + data.msg + "'" +
            ");";

        conn.query(queryString,function(err,result){
           if(err) console.log(err);

            conn.end();
        });
    },

    fetchHistory : function(cb){
        const conn = createConnection();
        conn.connect();

        var chatHist = [];
        conn.query("SELECT * FROM chatlist ORDER BY date ASC",function(err,rows,fields){
            for(row of rows){
                chatHist.push({
                   date : row.date,
                    name : row.name,
                    msg : row.msg
                });
            }

            cb(chatHist);
        });
    }

}