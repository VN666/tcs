<template>
	<div id="editDevice" class="edit-device">
		<el-dialog title="修改设备" :visible.sync="editDeviceDialog" size="tiny" @close="$emit('closeDialog')">
			<el-form ref="editDeviceForm" :model='form' :rules="rules" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="设备类型：">
							<el-select v-model="form.type" disabled>
								<el-option label="海康网络录像机" value="0"></el-option>
								<el-option label="海康视频服务器" value="1"></el-option>
								<el-option label="海康网络摄像机" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>				
				<el-row>
					<el-col :span="12">
						<el-form-item label="IP：" prop="ip">
							<el-input v-model="form.ip" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="端口：" prop="port">
							<el-input v-model="form.port" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户名：" prop="username">
							<el-input v-model="form.username"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="密码：" prop="password">
							<el-input v-model="form.password" type="password"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="编号：">
					<el-input disabled v-model="form.code"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="设备名称：" prop="name">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="通道数：" prop="channelNum">
							<el-input v-model="form.channelNum" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="是否启用：">
							<el-switch v-model="form.isEnable" on-text="启用" off-color="#13CE66" off-text="否"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否在线：">
							<el-switch v-model="form.isOnline" on-text="在线" off-color="#13CE66" off-text="离线"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="所属VAG：" prop="vagId">
					<el-select v-model="form.vagId" placeholder="请选择">
						<el-option label="vag" value="0"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editDeviceDialog=false">取消</el-button>
				<el-button type="primary" @click="editDevice">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios";
	export default {
		name: "editDevice",
		props: [ 'nodeId', 'deviceInfo' ],
		data () {
			let validateIp = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入IP'));
				} else if(!this.judgeIpIsLegal(value)) {
					callback(new Error('IP地址输入不合法'));
				} else {
					callback();
				}
			};
			let validatePort = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入端口号'));
				} else if(!this.judgePortIsLegal(value)) {
					callback(new Error('端口号输入不合法'));
				} else {
					callback();
				}
			};
			let validateUsername = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			let validatePassword = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			let validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入设备名称'));
				} else {
					callback();
				}
			};
			let validateChannelNum = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入通道数'));
				} else if(isNaN(parseInt(value)) || value.toString() !== parseInt(value).toString()){
					callback(new Error('必须为数字'));
				} else {
					callback();
				}
			};
			let validateVagId = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请选择所属VAG'));
				} else {
					callback();
				}
			};
			return {
				editDeviceDialog: true,
				form: {
					addMethod: "",
					type: "",
					ip: "",
					port: "",
					username: "",
					password: "",
					code: "",
					vagId: "",
					name: "",
					channelNum: "",
					isEnable: "",
					isOnline: "",
					orgId: this.nodeId
				},
				rules: {
					ip: { validator: validateIp, trigger: "blur", required: true },
					port: { validator: validatePort, trigger: "blur", required: true },
					username: { validator: validateUsername, trigger: "blur", required: true },
					password: { validator: validatePassword, trigger: "blur", required: true },
					name: { validator: validateName, trigger: "blur", required: true },
					channelNum: { validator: validateChannelNum, trigger: "change", required: true },
					vagId: { validator: validateVagId, trigger: "blur", required: true }
				}
			}
		},
		methods: {
			judgeIpIsLegal: function(ipAddr) {
  				let regIps = /^(((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9])\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9]))$/;
  				return regIps.test(ipAddr);
			},
			judgePortIsLegal: function (port) {
				let parten=/^(\d)+$/g;  
			    if(parten.test(port) && parseInt(port)<=65535 && parseInt(port)>=0){  
			        return true;  
			    } else {  
			        return false;  
     			}	  
			},
			ipCompare: function (temp1,temp2) {
				temp1 = temp1.split(".");  
			    temp2 = temp2.split(".");
			    let flag = 1; 
			    let flag2 = 0;    
			    for (var i = 0; i < 4; i++) {  
			        if (temp1[i] > temp2[i]) {  
			            flag = 0;
			            break;  
			        }  else if (temp1[i] == temp2[i]) {
			        	flag2++;
			        }
			    }  
			    if(flag==0 || flag2==4)
			    	return false;
			    else
			    	return true;
			},
			editDevice: function () {
				let reqUrl = "http://10.6.133.13:8081/device/updateDevice";
				this.form.isOnline = this.form.isOnline ? 1 : 0;
				this.form.isEnable = this.form.isEnable ? 1 : 0;
				this.$refs['editDeviceForm'].validate((valid) => {
					if(valid) {
						axios({
							method: "post",
							url: reqUrl,
							params: this.form
						})
						.then( 
							res => {
								if(res.data.state === 0) {
									alert('修改成功');
								} else {
									alert('修改失败');
								}
								this.editDeviceDialog = false;
						})
						.catch(function (err) {
							console.log(err);
						})
						this.addDeviceDialog = false;
					} else {
						console.log('error');
					}
				});
			}
		},
		mounted () {
			this.form = this.deviceInfo;
			this.form.channelNum  = parseInt(this.form.channelNum);
			this.form.type += '';
			this.form.vagId += '';
		}
	}
</script>

<style type="text/css"></style>