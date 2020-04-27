<template>
	<div class="user-admin">
		<v-dialog v-model="dialog" max-width="800">
			<template v-slot:activator="{ on }">
				<b-col md=6 sm=12>
					<v-icon color="primary" v-on="on" @click="loadUser(on, 'save')">mdi-account-plus</v-icon>
				</b-col>
			</template>
			<v-card>
				<v-card-title primary-title>
					{{ titleForm }}
					<v-spacer></v-spacer>
					<v-btn color="red" icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-form>
						<b-form-input id="user-id" hidden v-model="user.id"/>
						<b-row v-if="mode === 'save'">
							<b-col md="6" sm="12">
								<b-form-group label="Nome:" label-for="user-name">
									<b-form-input id="user-name" type="text" v-model="user.name" required :readonly="mode === 'remove'" placeholder="Informe o nome..."/>
								</b-form-group>
							</b-col>
							<b-col md="6" sm="12">
								<b-form-group label="Email:" label-for="user-email">
									<b-form-input id="user-email" type="email" v-model="user.email" required
									:readonly="mode === 'remove'"	placeholder="informe o email..."/>
								</b-form-group>
							</b-col>
						</b-row>
						<b-form-checkbox id="user-admin" v-show="mode === 'save'" v-model="user.admin" class="mt-2 md-2">
							Administrador?
						</b-form-checkbox>			
						<b-row v-show="mode === 'save'">
							<b-col md="6" sm="12">
								<b-form-group label="Senha:" label-for="user-password">
									<b-form-input id="user-password" type="password" v-model="user.password" required placeholder="Informe a senha..."/>
								</b-form-group>
							</b-col>
							<b-col md="6" sm="12">
								<b-form-group label="Confirmação Senha:" label-for="user-corfirmPassword">
									<b-form-input id="user-confirmPassword" type="password" v-model="user.confirmPassword" required placeholder="Confirme a senha..."/>
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col xs="12">
								<v-btn small color="primary" @click="save" v-if="mode === 'save'">
									Salvar
								</v-btn>
								<v-btn small color="error" @click="remove" v-if="mode === 'remove'">
									Excluir
								</v-btn>
								<v-btn small color="gray" @click="reset" class="ml-2" v-if="mode === 'save'">
									Limpar
								</v-btn>
								<v-btn small color="light" @click="dialog = false" class="ml-2" v-if="mode === 'remove'">
									Cancelar
								</v-btn>
							</b-col>

						</b-row>	

					</v-form>  
				</v-card-text>
			</v-card>
		</v-dialog>	
		
		<v-card-title primary-title class="primary--text">
			Usuários
		</v-card-title>
		<v-data-table :headers="fields" :items="users" class="elevation-2  table-striped">
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

	name: 'UserAdmin',
	data() {
		return {
			mode: 'save',
			dialog: false,
			titleForm:'',
			iconForm: 'mdi-account-plus',
			user: {},
			users: [],
			fields: [
			{ value: 'id', text: 'Código', sortable: true },
			{	value: 'name', text: 'Nome', sortable: true },		
			{	value: 'email', text: 'E-mail', sortable: true },		
			{	value: 'admin', text: 'Administrador', sortable: true, formatter: value => value ? 'Sim' : 'Não' },
			{	value: 'actions', text: 'Ações'	} 		
			]
		}
	},
	methods: {
		loadUsers() {
			const url = `${baseApiUrl}/users`
			axios.get(url).then(res => {
				this.users = res.data
			})
		},
		reset() {
			this.mode = 'save'
			this.user = {}
			this.loadUsers()
		},
		save() {
			const method = this.user.id ? 'put' : 'post'
			const id = this.user.id ? `/${this.user.id}` : ''
			axios[method](`${baseApiUrl}/users${id}`, this.user)
			.then(() => {
				this.$toasted.global.defaultSuccess()
				this.reset()
				this.dialog = false
			})
			.catch(showError)  
		},
		remove() {
			const id = this.user.id
			axios.delete(`${baseApiUrl}/users/${id}`)
			.then(() => {
				this.$toasted.global.defaultSuccess()
				this.dialog = false
				this.loadUsers()
				this.reset()
			})
			.catch(showError)
		},
		loadUser(user, mode = 'save') {
			this.mode = mode
			this.user = { ...user }
			this.dialog = true
			this.titleForm = this.user.id === undefined ? 'Cadastrar Novo Uusário' : this.mode === 'remove' ? `Excluir usuário ${ user.name}` : `Editar usuário ${ user.name }` 
			if(this.user.admin === 1) this.user.admin = true
		}
},
mounted() {
	this.loadUsers()
}
};
</script>

<style lang="css">
</style>
