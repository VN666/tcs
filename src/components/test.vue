<template>
	<div id="test">
		<div id="block">
			<span class="demonstration">默认</span>
			<el-button v-model="value">default</el-button>
			<el-slider v-model="value"></el-slider>
		</div>
		<div>
			<el-progress type="circle" :percentage="11"></el-progress>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "test",
		data () {
			return {
				value: 0
			}
		},
		methods: {
			formaTooltip(val) {
				return val / 100;
			}
		}
	}
</script>