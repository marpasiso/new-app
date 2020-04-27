<template>
	<v-container fluid>
		<v-card>
			<v-row class="m-3">
				<div class="stat-icon">
				<v-icon :class="icon" :style="style" large></v-icon>
			</div>
			<div class="stat-info p-2">
				<span class="stat-title">{{ title }}</span>
				<span class="stat-value p-2">{{ value }}</span>
			</div>
			</v-row>	
				
		</v-card>
		
	</v-container>
</template>

<script>
export default {

	name: 'Stat',
	props: ['title', 'value', 'icon', 'color'],
	computed: {
		style(){
			return 	"color: " + (this.color || "#000")  
		}
	}
};
</script>

<style lang="css">

</style>
