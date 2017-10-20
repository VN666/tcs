<template>
	<div id="addAdmin" class="add-admin">
		<el-dialog title="添加用户" :visible.sync="addAdminDialog" size="tiny" @close="$emit('closeDialog')">
			<el-form ref="addAdminForm" :model="form" :rules="rules" label-width="60px" class="demo-ruleForm" :label-position="labelPosition">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="note：">
							<el-input v-model="form.note" placeholder="输入姓名拼音" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="name：">
							<el-input v-model="form.name" placeholder="输入姓名" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4" :pull="2">
						<el-form-item>
							<el-button size="small" type="warning">校验</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="密码：">
							<el-input v-model="form.password" placeholder="请输入密码" size="small" type="password"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="确认密码：" label-width="90px">
							<el-input v-model="form.password2" placeholder="请确认密码" size="small" type="password"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="身份证：" label-width="70px">
							<el-input v-model="form.idCard" placeholder="请输入身份证号" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="员工编号:" label-width="90px">
							<el-input v-model="form.empNum" size="small"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="邮箱：">
							<el-input v-model="form.email" placeholder="请输入邮箱" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号：" label-width="90px">
							<el-input v-model="form.phone" placeholder="请输入手机号" size="small"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="入职时间：" label-width="85px">
							<el-date-picker v-model="form.entryTime" size="small" class="diy01"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="性别：" label-width="70px">
							<el-switch v-model="form.sex" size="small" off-text="男" on-text="女" off-value="0" on-value="1"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="状态：" label-width="70px">
							<el-switch v-model="form.isEnable" size="small" off-text="禁用" on-text="开启" off-value="0" on-value="1"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios";
	export default {
		name: "addAdmin",
		data () {
			return {
				addAdminDialog: true,
				rules: {},
				form: {
					note: "",
					name: "",
					password: "",
					password2: "",
					idCard: "",
					empNum: "",
					email: "",
					phone: "",
					entryTime: "",
					sex: "",
					isEnable: ""
				},
				labelPosition: "left"
			}
		}
	}
</script>

<style type="text/css">
	.add-admin .diy01.el-date-editor.el-input {
		width: 120px;
	}
</style>