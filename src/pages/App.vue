<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import login from "./login.vue"
	export default {
		name: 'app',
		data () {
			return {}
		},
		components: { login }
	}
</script>

<style type="text/css">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: 0;
	}
	html, body, #app {
		height: 100%;
		width: 100%;
		overflow: hidden;
		font-family: "Droid Sans", "Droid Sans Fallback";
		font-size: 62.5%;
	}



</style>