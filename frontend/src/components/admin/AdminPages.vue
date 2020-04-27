<template>
	<div class="admin-pages">
		<PageTitle icon="mdi mdi-cogs" main="Administração" sub="gereciamento do Sistema"/>
		<div class="admin-pages-tabs">
			<v-card no-body>
				<v-tabs
				v-model="tab"
				>
				<v-tabs-slider></v-tabs-slider>

				<v-tab href="#tab-1">
					Usuários
				</v-tab>

				<v-tab href="#tab-2">
					Entrevistados

				</v-tab>

				<v-tab href="#tab-3">
					Outros

				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="tab">
				<v-tab-item id="tab-1">
					<v-card flat>
						<v-card-text><UserAdmin/></v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item id="tab-2">
					<v-card flat>
						<v-card-text><ClientAdmin/></v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item id="tab-3">
					<v-card flat>
						<v-card-text>{{text}}</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs-items>	
		</v-card>
	</div>	
</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'
import ClientAdmin from './ClientAdmin'
export default {

	name: 'AdminPages',
	components: { PageTitle, UserAdmin, ClientAdmin },
	data() {
		return {
			
			tab:null,
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		}
	}
};
</script>

<style lang="css" scoped>
</style>
