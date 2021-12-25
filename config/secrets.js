/*
 * You generally want to .gitignore this file to prevent important credentials from being stored on your public repo.
 */
// require('dotenv').config();

module.exports = {
    // sql_connection : "mysql://zsm-app-3135399359:ewvcdoubu9@mysql.stackcp.com:57153/zsm-app-3135399359?debug=true",
    sql_connection : {
        connectionLimit : 100, //important
        host     : 'mysql.stackcp.com',
        port     : '55948',
        user     : 'MangoBB-3135376c16',
        password : 'mbb049jagd',
        database : 'MangoBB-3135376c16',
        debug    :  false
    }
};
