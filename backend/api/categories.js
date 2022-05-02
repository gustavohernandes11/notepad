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
        let param = req.query.userId

        
        app.db('categories')
        .select('id', 'name', 'color', 'user_id')
        .where({ user_id: param})
            .then(categories => res.json(categories))
            .catch(e => res.status(400).send(e))
    }

    const getById = (req, res) => {
        let param = req.query.userId

        app.db('categories')
        .select('id', 'name', 'color', 'user_id')
            .where({ id: req.params.id, user_id: param })
            .first()
            .then(category => res.json(category))
            .catch(e => res.status(500).send(e))
    }



    const remove = async (req, res) => {


        try {
            const relatedNotes = await app.db('notes')
            .where({ category_id: req.params.id })
            notExistsOrError(relatedNotes, 'Categoria possui notas relacionadas')

            await app.db('categories')
            .where({ id: req.params.id })
            .del()
            .then(_ => res.status(204).send())

        } catch(msg){
            res.status(400).send(msg)
        }
            

    }

    return { save, get, getById, remove }
}