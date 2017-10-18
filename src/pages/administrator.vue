<template>
	<div id="administrator" class="administrator">
		<div class="header">
			<header-bar></header-bar>
		</div>
		<div class="content">
			<admin-list></admin-list>
		</div>	
	</div>
</template>

<script type="text/javascript">
	import headerBar from "../components/header-bar";
	import adminList from "../components/admin-list";
	export default {
		name: "administrator",
		data () {
			return {}
		},
		components: { headerBar, adminList }
	}
</script>

<style type="text/css">
	.administrator {
		width: 100%;
		height: 100%;
	}
	.administrator .header {
		width: 100%;
		height: 50px;
	}
	.administrator .content {
		width: 100%;
		height: calc(100% - 50px);
	}
</style>