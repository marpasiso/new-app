<template>
	<div class="user-admin">
		<v-card-title primary-title class="primary--text">
			Entrevistados
		</v-card-title>
		<v-data-table :headers="fields" :items="clients" class="elevation-2  table-striped">
			<template v-slot:item.actions="{ item }">
				<v-btn fab color="warning" x-small dark class="mr-2" @click="loadUser(item)">
					<v-icon>
						mdi-pencil
					</v-icon>	
				</v-btn>
				<v-btn fab color="error" x-small dark class="" @click="loadUser(item, 'remove')">				
					<v-icon>
						mdi-delete
					</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {

	name: 'ClientAdmin',

	data() {
		return {
			mode: 'save',
			dialog: false,
			titleForm:'',
			iconForm:'',
			client:{},
			clients: [],
			fields:[
				{	value: 'id', text: 'Código', sortable: true},
				{	value: 'name', text: 'Nome', sortable: true},
				{	value: 'cpf', text: 'CPF', sortable: true},
				{	value: 'address', text: 'Endereço', sortable: true},
				{	value: 'neighborhood', text: 'Bairro', sortable: true},
				{	value: 'cep', text: 'CEP', sortable: true},
				{	value: 'phone', text: 'Contato', sortable: true},
				{	value: 'actions', text: 'Ações'},

			]

		}
	},
	methods: {
		loadClients() {
			const url = `${baseApiUrl}/clients`
			axios.get(url).then(res => {
				this.clients = res.data
			})
			.catch(showError)
		},
		reset() {
			this.mode = 'save'
			this.client = {}
			this.loadUsers()
		},
		save() {
			const method = this.client.id ? 'put' : 'post'
			const id = this.client.id ? `/${this.client.id}` : ''
			axios[method](`${baseApiUrl}/clients${id}`, this.client)
			.then(() => {
				this.$toasted.global.defaultSuccess()
				this.reset()
				this.dialog = false
			})
			.catch(showError)  
		},
		remove() {
			const id = this.client.id
			axios.delete(`${baseApiUrl}/clients/${id}`)
			.then(() => {
				this.$toasted.global.defaultSuccess()
				this.dialog = false
				this.loadClients()
				this.reset()
			})
			.catch(showError)
		},
		loadClient(client, mode = 'save') {
			this.mode = mode
			this.client = { ...client }
			this.dialog = true
			this.titleForm = this.client.id === undefined ? 'Cadastrar Novo Uusário' : this.mode === 'remove' ? `Excluir usuário ${ client.name}` : `Editar usuário ${ client.name }` 
			if(this.client.admin === 1) this.client.admin = true
		}
	},
	mounted() {
		this.loadClients()
	}
};
</script>

<style lang="css" scoped>
</style>
