module.exports = function (router, db) {

    router.route("/users")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Users`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .post(async function (req, res) {
            // let sql_query = `INSERT INTO Users VALUES
            //     (null, '${req.body.netid}', '${req.body.email}', '${req.body.password}', ${req.body.acc_type})`;
            // db.query(sql_query, (err, result) => {
            //     if (err) throw err;
            // });
            
            // // Students
            // if (req.body.acc_type == 1) {
            //     sql_query = `INSERT INTO Students VALUES
            //     ('${req.body.netid}', "${req.body.name}", '${req.body.email}')`;
            // }
            // // Teachers
            // else {
            //     sql_query = `INSERT INTO Teachers VALUES
            //     ('${req.body.netid}', "${req.body.name}", '${req.body.email}')`;
            // }

            // db.query(sql_query, (err, result) => {
            //     if (err) throw err;
            //     res.json({ data: result });
            // });
        });
    
    router.route("/users/searchAddress/:address")
        .get(async function (req, res) {
            let sql_query = `SELECT Address, City, State, Zipcode FROM Users WHERE Address LIKE '%${req.params.address}%' LIMIT 10`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
    
    router.route("/users/searchPhone/:phone")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Users WHERE Cell_Trimmed LIKE '%${req.params.phone}%'`;
            console.log(sql_query);
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
    
    router.route("/users/:id")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Users WHERE id = ${req.params.id}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .put(async function (req, res) {
            console.log(req.body.currUser.Seva);
            let sql_query = `UPDATE Users SET
                             Seva = '${req.body.currUser.Seva}', Work_Status = '${req.body.currUser.Work_Status}', Occupation = '${req.body.currUser.Occupation}', 
                             Seva_Availability_Morning = '${req.body.currUser.Seva_Availability_Morning}', Seva_Availability_Afternoon = '${req.body.currUser.Seva_Availability_Afternoon}', 
                             Seva_Availability_Evening = '${req.body.currUser.Seva_Availability_Evening}', Skills = '${req.body.currUser.Skills}', Interests = '${req.body.currUser.Interests}', 
                             DOB = '${req.body.currUser.DOB}', Shirt_Size = '${req.body.currUser.Shirt_Size}', Licenses = '${req.body.currUser.Licenses}'
                             WHERE id = '${req.params.id}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
    
    router.route("/users/address/:address")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Users WHERE Address = '${req.params.address}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

    return router;
}