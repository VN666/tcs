<template>
	<div id="addPoint" class="add-point">
		<el-dialog title="监控点信息" :visible.sync="addPointDialog" size="small" @close="$emit('closeDialog')">
			<slot></slot>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addPointDialog=false">取消</el-button>
				<el-button type="primary" @click="handleSubmit">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import transfer from "./transfer";
	import axios from "axios";
	export default {
		name: "addPoint",
		props: [ 'nodeId', 'nodeAdd', 'nodeSub' ],
		components: [ 'transfer' ],
		data () {
			return {
				addPointDialog: true, 
				form: {
					name: "",
					type: "0",
					pixel: "0",
					code: "",
					ip: "",
					port: "",
					channelId: "",
					deviceName: ""
				},
				rules: {
					name: { trigger: "blur", required: "true", message: "名称不能为空" }
				}
			}
		},
		methods: {
			handleSubmit: function () {
				axios({
					method: "post",
					url: "http://10.6.133.13:8081/monitor/addAllMonitor",
					params: {
						orgId: this.nodeId,
						idArray: this.nodeAdd.join(',')
					}

				})
				.then(
					res => {
						if(res.data.state === 0) {
							alert('添加成功');
							this.$emit('closeDialog');
						} else {
							alert('添加失败');
						}
					})
				.catch(function (err) {
					console.log(err);
				})
			}
		}
	}
</script>

<style type="text/css"></style>