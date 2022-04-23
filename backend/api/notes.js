module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation


    const save = async (req, res) => {
        const note = { ...req.body }
        if (req.params.id) note.id = req.params.id


        // try {
        //     existsOrError(note.category_id, 'Nota sem categoria!')
        //     existsOrError(note.content, 'Nota sem conteúdo!')

        //     const categoryFromDb = await app.db('category')
        //         .where({ id: note.category_id })
        //         .first()
        //         if(!note.id) {
        //             existsOrError(categoryFromDb, 'ID de uma categoria inexistente.')
        //         }

        // } catch (msg) {
        //     return res.status(400).send(msg)
        // }

        if (note.id) {
            app.db('notes')
                .update(note)
                .where({ id: note.id })
                .then(_ => res.status(204).send())
                .catch(e => res.status(400).send(e))
        } else {
            app.db('notes')
                .insert(note)
                .then(_ => res.status(204).send())
                .catch(e => res.status(400).send(e))
        }


    }
    const get = (req, res) => {
        app.db('notes')
            .select('id', 'category_id', 'favorite', 'content')
            .then(notes => res.json(notes))
            .catch(e => res.status(400).send(e))
    }

    const getById = (req, res) => {
        app.db('notes')
            .select('id', 'category_id', 'favorite', 'content')
            .where({ id: req.params.id })
            .first()
            .then(note => res.json(note))
            .catch(e => res.status(500).send(e))
    }

    const remove = (req, res) => {
        app.db('note')
            .select('id', 'category_id', 'favorite', 'content')

    }

    return { save, get, getById, remove }
}