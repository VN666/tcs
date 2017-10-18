<template>
	<div id="editPoint" class="edit-point">
		<el-dialog title="监控点信息" :visible.sync="editPointDialog" size="tiny">
			<el-form ref="editPointForm" :model='form' :rules="rules" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="监控点名称" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="摄像机类型">
							<el-select v-model="form.type">
								<el-option label="枪机" value="0"></el-option>
								<el-option label="半球" value="1"></el-option>
								<el-option label="快球" value="2"></el-option>
								<el-option label="带云台枪机" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="摄像机像素">
							<el-select v-model="form.pixel">
								<el-option label="普通" value="0"></el-option>
								<el-option label="130万高清" value="1"></el-option>
								<el-option label="200万高清" value="2"></el-option>
								<el-option label="300万高清" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="编码" disabled>
							<el-input disabled v-model="form.code"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属设备">
							<el-input disabled v-model="form.deviceName"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="ip">
							<el-input v-model="form.ip" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="端口">
							<el-input v-model="form.port" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="通道号">
							<el-input v-model="form.channelId" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="pointInfoDialog=false">取消</el-button>
				<el-button type="primary" @click="editPoint">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios";
	export default {
		name: "editPoint",
		props: [ 'pointInfo' ],
		data () {
			return {
				editPointDialog: true, 
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
			editPoint: function () {
				axios({
					method: "post",
					url: "http://10.6.133.13:8081/monitor/updateMonitor",
					params: this.form
				})
				.then(
					res => {
						if(res.data.state === 0) {
							alert('修改成功');
							this.editPoint = false;
							this.$emit('closeDialog');
						} else {
							alert('修改失败');
						}
					})
			}
		},
		mounted () {
			console.log(this.pointInfo);
			this.form = this.pointInfo;
			this.form.type += '';
			this.form.pixel += '';
		}
	}
</script>

<style type="text/css"></style>