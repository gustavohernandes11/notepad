const admin = require('./admin')
module.exports = app => {
    app.post('/signup', app.api.users.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.users.save))
        .get(admin(app.api.users.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.users.getById))
        .put(admin(app.api.users.save))
        .delete(admin(app.api.users.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.get)
        .post(app.api.categories.save)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getById)
        .put(app.api.categories.save)
        .delete(app.api.categories.remove)

    app.route('/notes')
        .all(app.config.passport.authenticate())
        .get(app.api.notes.get)
        .post(app.api.notes.save)

    app.route('/notes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.notes.getById)
        .put(app.api.notes.save)
        .delete(app.api.notes.remove)
}