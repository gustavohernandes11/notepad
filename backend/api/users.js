module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //adc: criar função de criptografar senha


    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        //adc: função de confirmação de admin = false

        try {
            existsOrError(user.name, 'Nome não informado!')
            existsOrError(user.email, 'Email não informado!')
            existsOrError(user.password, 'Senha não informada!')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida!')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem!')

            const userFromDB = await app.db('users')
                .where({ email: user.email })
                .first()
                if(!user.id) {
                    notExistsOrError(userFromDB, 'Usuário já cadastrado')
                }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        //adc: criptografar senha
        delete user.confirmPassword
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(e => res.status(400).send(e))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(e => res.status(400).send(e))
        }


    }
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(e => res.status(400).send(e))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(e => res.status(500).send(e))
    }

    return { save, get, getById }
}
