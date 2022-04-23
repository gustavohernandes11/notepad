module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation


    const save = async (req, res) => {
        const category = { ...req.body }
        if (req.params.id) category.id = req.params.id


        try {
            existsOrError(category.name, 'Nome não informado!')
            existsOrError(category.user_id, 'Categoria não vinculada com usuário!')


            const categoryFromDB = await app.db('categories')
                .where({ name: category.name })
                .first()
                if(!category.id) {
                    notExistsOrError(categoryFromDB, 'Categoria já cadastrada!')
                }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(e => res.status(400).send(e))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(e => res.status(400).send(e))
        }


    }
    const get = (req, res) => {
        app.db('categories')
            .select('id', 'name', 'color', 'user_id')
            .then(categories => res.json(categories))
            .catch(e => res.status(400).send(e))
    }

    const getById = (req, res) => {
        app.db('categories')
        .select('id', 'name', 'color', 'user_id')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(e => res.status(500).send(e))
    }

    const remove = (req, res) => {
        app.db('categories')
            .select('id', 'name', 'color', 'user_id')

    }

    return { save, get, getById, remove }
}