module.exports = app => {
    app.route('/users')
        .post(app.api.users.save)
        .get(app.api.users.get)

    app.route('/users/:id')
        .get(app.api.users.getById)
        .put(app.api.users.save)

    app.route('/categories')
        .get(app.api.categories.get)
        .post(app.api.categories.save)

    app.route('/categories/:id')
        .get(app.api.categories.getById)
        .put(app.api.categories.save)

    app.route('/notes')
        .get(app.api.notes.get)
        .post(app.api.notes.save)

    app.route('/notes/:id')
        .get(app.api.notes.getById)
        .put(app.api.notes.save)
}