<template>
	<div id="addDevice" class="add-device">
		<el-dialog title="添加设备" :visible.sync="addDeviceDialog" size="tiny" @close="$emit('closeDialog')">
			<el-form ref="addDeviceForm" :model='form' :rules="rules" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="添加方式：">
							<el-select v-model="form.addMethod">
								<el-option label="单IP添加" value="0"></el-option>
								<el-option label="IP段添加" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="设备类型：">
							<el-select v-model="form.type">
								<el-option label="海康网络录像机" value="0"></el-option>
								<el-option label="海康视频服务器" value="1"></el-option>
								<el-option label="海康网络摄像机" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>				
				<el-form-item label="起始IP：" v-if="form.addMethod=='0'?false:true" required>
					<el-col :span="9">
						<el-form-item prop="ipBegin">
							<el-input v-model="form.ipBegin" placeholder="例如：127.0.0.1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2" class="line">&nbsp;——</el-col>
					<el-col :span="9">
						<el-form-item prop="ipEnd">
							<el-input v-model="form.ipEnd" placeholder="例如：127.0.0.1"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-row>
					<el-col :span="12" v-if="form.addMethod=='0'?true:false">
						<el-form-item label="IP：" prop="ip">
							<el-input v-model="form.ip" placeholder="例如：127.0.0.1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="端口：" prop="port">
							<el-input v-model="form.port"></el-input>
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
				<el-form-item label="编号：" v-if="form.addMethod=='0'?true:false">
					<el-input disabled v-model="form.code"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12" v-if="form.addMethod=='0'?true:false">
						<el-form-item label="设备名称：" prop="name" >
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="通道数：" prop="channelNum">
							<el-input v-model="form.channelNum"></el-input>
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
				<el-button @click="addDeviceDialog=false">取消</el-button>
				<el-button type="primary" @click="addDevice">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios";
	export default {
		name: "addDevice",
		props: [ 'nodeId' ],
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
				} else if(isNaN(parseInt(value)) || value !== parseInt(value).toString()){
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
			let validateIpBegin = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入开始IP'));
				} else if(!this.judgeIpIsLegal(value)) {
					callback(new Error('IP地址输入不合法'));
				} else {
					callback();
				}
			};
			let validateIpEnd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入结束IP'));
				} else if(!this.judgeIpIsLegal(value)) {
					callback(new Error('IP地址输入不合法'));
				} else if(!this.ipCompare(this.form.ipBegin, value)) {
					callback(new Error('结束IP小于或等于开始IP'));
				} else {
					callback();
				}
			};
			return {
				addDeviceDialog: true,
				form: {
					addMethod: "0",
					type: "0",
					ip: "",
					port: "1313",
					ipBegin: "1.1.1.1",
					ipEnd: "1.1.1.20",
					username: "a",
					password: "a",
					code: "",
					vagId: "vag",
					name: "",
					channelNum: "5",
					isEnable: true,
					isOnline: true,
					orgId: this.nodeId
				},
				rules: {
					ip: { validator: validateIp, trigger: "blur", required: true },
					port: { validator: validatePort, trigger: "blur", required: true },
					username: { validator: validateUsername, trigger: "blur", required: true },
					password: { validator: validatePassword, trigger: "blur", required: true },
					name: { validator: validateName, trigger: "blur", required: true },
					channelNum: { validator: validateChannelNum, trigger: "change", required: true },
					vagId: { validator: validateVagId, trigger: "blur", required: true },
					ipBegin: { validator: validateIpBegin, trigger: "blur", required: true },
					ipEnd: { validator: validateIpEnd, trigger: "blur", required: true }
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
			createCode: function () {
				let x = "0123456789";
				let tmp = "";
				let timestamp = new Date().getTime();
				for(let i = 0; i < 3; i++)  {
					tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
				}
				return tmp + timestamp;
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
			addDevice: function () {
				let reqUrl = "http://10.6.133.13:8081/device/";
				reqUrl = parseInt(this.form.addMethod) === 0 ? reqUrl+'addDevice' : reqUrl+'addAllDevice';
				this.form.isEnable = this.form.isEnable ? 1 : 0;
				this.form.isOnline = this.form.isOnline ? 1 : 0;
				this.$refs['addDeviceForm'].validate((valid) => {
					if(valid) {
						axios({
							method: "post",
							url: reqUrl,
							params: this.form
						})
						.then( 
							res => {
								if(res.data.state === 0) {
									alert('添加成功');
								} else {
									alert('添加失败');
								}
								this.addDeviceDialog = false;
								this.$emit('closeDialog',this.form);
						})
						.catch(function (err) {
							console.log(err);
						});
					} else {
						console.log('error');
					}
				});
			},
			createCode: function () {
				let x = "0123456789";
				let tmp = "";
				let timestamp = new Date().getTime();
				for(let i = 0; i < 3; i++)  {
					tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
				}
				return tmp + timestamp;
			},
		},
		watch: {
			addDeviceDialog: function () {
				
			}
		},
		mounted () {
			this.form.code = this.createCode();
		}
	}
</script>

<style type="text/css"></style>