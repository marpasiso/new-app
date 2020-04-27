module.exports = app => {
	const { existsOrError, notExistsOrError } = app.api.validation

	const save = async (req, res) =>{
		const client = { ...req.body }
		if(req.params.id) client.id = req.params.id

		try {
			existsOrError(client.name, 'Nome não informado!')
			existsOrError(client.cpf, 'CPF não informado!')
			existsOrError(client.address, 'Endereço não informado!')
			existsOrError(client.neighborhood, 'Bairro não informado!')
			existsOrError(client.cep, 'CEP não informado!')

			const clientFormDb = await app.db('clients')
			.where({ cpf: client.cpf }).first()
			if(!client.id) {
				notExistsOrError(clientFormDB, 'Entrevistado já existe!')
			}				

		} catch (msg) {
			return res.status(400).send(msg)
		}

		if(client.id) {
			app.db('clients')
			.update(client)
			.where({ id: client.id})
			.then(_ => res.status(204).send())
			.catch(err => res.status(500).send(err))
		}else {
			app.db('clients')
			.insert(client)
			.then(_ => res.status(204).send())
			.catch(err => res.status(500).send(err))
		} 	
	}

	const get = (req, res) => {
		app.db('clients')
		.select('id','name','cpf', 'address', 'neighborhood','phone','cep')
		.then(clients => res.json(clients))
		.catch(err => res.status(500).send(err))
	}

	const getById = (req, res) => {
		app.db('clients')
		.select('id','name','cpf', 'address', 'neighborhood','phone','cep')
		.where({ id: req.param.id})
		.fisrt()
		.then(client => res.json(client))
		.catch(err => res.status(500).send(err))
	}

	const remove = async (req, res) => {
		try {
			const rowsUpdated = await app.db('clients')
        // .update({ deletedAt: new Date() })
        .delete()
        .where({ id: req.params.id })

        existsOrError(rowsUpdated, 'Usuário não foi encontrado!')

        res.status(204).send()
      } catch (msg) {
      	res.status(400).send(msg)
      }
    }

    return { save, get, getById, remove }
  }