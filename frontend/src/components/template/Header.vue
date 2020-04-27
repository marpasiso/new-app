<template>
	<div>
		<v-app-bar app color="indigo" dark>
			<v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Painel de Controle</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" dark  text class="elevation-1">{{ user.email }}</v-btn>		
				</template>
				<v-list>
					<v-list-item @click="toAdmin" v-if="user.admin">
						<v-list-item-title>
							<v-icon x-small>mdi-cog</v-icon>
							Administração
						</v-list-item-title>
					</v-list-item>
					<v-list-item @click.prevent="logout">
						<v-list-item-title>
							<v-icon x-small>mdi-export</v-icon>
							Sair
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" app>
			<v-list dense>
				<v-list-item v-for="(item,i) in items" :key="i" :to="item.link">
					<v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title v-text="item.text"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
export default {
	name: 'Header',
	data() {
		return {
			drawer: true,
			items: [
			{text:'HOME', icon: 'mdi-home', link:'/'},
			]
		}
	},
	computed: mapState(['user']),
	methods: {
		toAdmin() {
			this.$router.push({ name: 'adminPages' })
		},
		logout() {
			localStorage.removeItem(userKey)
			this.$store.commit('setUser', null)
			this.$router.push({ name: 'auth' })
		}
	}
};
</script>

<style lang="css" scoped>
</style>
