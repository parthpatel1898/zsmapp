/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router, db) {
    app.use('/api', require('./home.js')(router, db));

    app.use('/api/users', require('./users.js')(router, db));
};
