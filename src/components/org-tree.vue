<template>
	<div id="orgTree" class="org-tree">
		<div class="tree-header">
			<span>组织机构</span>
			<ul>
				<li @click="update"><i class="iconfont icon-refresh5"></i></li>
				<li @click="add"><i class="iconfont icon-tianjia"></i></li>
				<li @click="modify"><i class="iconfont icon-xiugai"></i></li>
				<li @click="del"><i class="iconfont icon-3"></i></li>
			</ul>
		</div>
		<div class="tree-search">
			<div>
				<input v-model="searchValue" type="text" />
				<ul>
					<li @click="goClear"><i class="iconfont icon-icon"></i></li>
					<li @click="goSearch"><i class="iconfont icon-sousuo"></i></li>
				</ul>
			</div>
		</div>
		<div class="tree-content">
			<div id="ztree" class="ztree"></div>
		</div>
		<el-dialog title="添加" :visible.sync="dialogVisible" size="tiny">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
				<el-form-item label="添加类型" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio label="0">组织</el-radio>
						<el-radio label="1">监控区域</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="上级组织">
					<el-input v-model="form.parentName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="组织名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="组织编码">
					<el-input v-model="form.code" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
  			<span class="dialog-footer" slot="footer">
    			<el-button @click="dialogVisible=false">取 消</el-button>
    			<el-button type="primary" @click="submitForm('ruleForm', 0)" >确 定</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="dialogVisible2" size="tiny">
			<el-form ref="ruleForm2" :model="form2" :rules="rules" label-width="80px" class="demo-ruleForm">
				<el-form-item label="添加类型" prop="type">
					<el-radio disabled v-model="form2.type" label="组织">组织</el-radio>
					<el-radio disabled v-model="form2.type" label="监控区域">监控区域</el-radio>
				</el-form-item>
				<el-form-item label="上级组织">
					<el-input v-model="form2.parentName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="组织名称" prop="name">
					<el-input v-model="form2.name"></el-input>
				</el-form-item>
				<el-form-item label="组织编码">
					<el-input v-model="form2.code" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
  			<span class="dialog-footer" slot="footer">
    			<el-button @click="dialogVisible2=false">取 消</el-button>
    			<el-button type="primary" @click="submitForm('ruleForm2', 1)" >确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios"
	export default {
		name: "orgTree",
		data () {
			return {
				treeObj: "",
				currentTreeNode: "",
				setting: {
					async: {
						enable: true,
						url: "http://10.6.133.13:8081/organization/asynGetZTree",
						autoParam: ['id'],
						type: "post"
					},
					check: { enable: false },
					callback: { 
						onClick: this.zTreeeOnClick
					}
				},
				dialogVisible: false,
				dialogVisible2: false,
				searchValue: "",
				form: {
					type: "",
					parentName: "",
					name: "",
					code: ""
				},
				form2: {
					type: '',
					parentName: "",
					name: '',
					code: '',
				},
				rules: {
					type: [
						{ required: true, message: '请选择至少一个类型', trigger: 'blur'}
					],
					name: [
						{ required: true, message: '不能为空', trigger: 'change'}
					]
				}
			}
		},
		methods: {
			update: function () {
				let that = this;
				axios({
					method: "post",
					url: "http://10.6.133.13:8081/organization/asynGetZTree"
				})
				.then(
					res => {
						this.treeObj = $.fn.zTree.init($('#ztree'), this.setting, res.data);
						let nodes = this.treeObj.getNodes();
						this.treeObj.selectNode(nodes[0]);
						this.currentTreeNode = nodes[0];
						this.$emit('node', this.currentTreeNode);
				})
				.catch(function (err) {
					console.log(err);
				});
			},
			add: function () { 
				this.form.type = "";
				this.form.parentName = "";
				this.form.name = "";
				this.form.parentName = "";
				if(this.currentTreeNode.length === 0){
					alert("请选择添加的节点")
				} else {
					this.dialogVisible = true;
					if(this.currentTreeNode.id != 1)
						this.form.parentName = this.currentTreeNode.getParentNode().name;
					else 
						this.form.parentName = "此节点是根节点";
					this.form.code = this.createCode();
				}
			},
			modify: function () {
				if(this.currentTreeNode.length === 0){
					alert("请选择添加的节点")
				} else {
					this.form2.type = this.currentTreeNode.iconSkin == 'organization' ? '组织' : '监控区域';
					this.form2.name = this.currentTreeNode.name;
					this.form2.code = this.currentTreeNode.code;
					if(this.currentTreeNode.id == 1)
						alert('不能对此几点进行修改操作');
					else {
						this.form2.parentName = this.currentTreeNode.getParentNode().name;
						this.dialogVisible2 = true;
					}
				}
			},
			del: function () {
				if(this.currentTreeNode.length === 0) {
					alert('请选择删除的节点');
				} else {
					if(this.currentTreeNode.id == 1) 
						alert('不能对此节点进行删除操作');
					else {
						let that = this;
						axios({
							method: "post",
							url: "http://10.6.133.13:8081/organization/delZTreeOrg",
							params: { 
								id: that.currentTreeNode.id 
							}
						})
						.then(
							res => {
								if(res.data.state === 0) {
									that.treeObj.removeNode(that.currentTreeNode);
									alert('删除成功');
									that.currentTreeNode = "";
								} else if(res.data.state === 1){
									alert('请先删除该节点下的所有子节点');
								} else {
									alert('服务异常，删除失败');
								}
						})
						.catch(function (err) {
							console.log(err);
						});
					}
				}
			},
			zTreeeOnClick: function (e, treeId, treeNode) {
				this.currentTreeNode = treeNode;
				this.$emit('node', this.currentTreeNode);
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
			submitForm: function (formName, flag) {
				let that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(flag == 0){
							axios({
								method: "post",
								url: "http://10.6.133.13:8081/organization/addZTreeOrg",
								params: {
									name: that.form.name,
									parentId: that.currentTreeNode.id,
									code: that.form.code,
									type: that.form.type
								}
							})
							.then(
								res => {
									if(res.data.state === 0) {
										alert('添加成功');
										that.dialogVisible = false;
										that.treeObj.addNodes(that.currentTreeNode, res.data.newNode, false);
									} else if(res.data.state === 1) {
										that.dialogVisible = false,
										alert('重复添加组织或监控区域');
									} else {
										that.dialogVisible = false,
										alert('添加失败');
									}
							})
							.catch(function (err) {
								console.log(err);
							});
						} else if(flag == 1) {
							axios({
								method: "post",
								url: "http://10.6.133.13:8081/organization/updateZTreeOrg",
								params: {
									id: that.currentTreeNode.id,
									name: that.form2.name,
									type: that.currentTreeNode.iconSkin == 'organization' ? 0 : 1,
									code: that.currentTreeNode.code,
									parentId: that.currentTreeNode.parentId
								}
							})
							.then(
								res => {
									if(res.data.state === 0){
										alert('修改成功');
										that.dialogVisible2 = false;
										that.currentTreeNode.name = that.form2.name;
										that.treeObj.updateNode(that.currentTreeNode);	
									} else {
										alert('修改失败');
									}
							})
							.catch(function (err) {
								console.log(err);
							});
						}
					} else {}
				});
			},
			goSearch: function () {
				let that = this;
				axios({
					method: "post",
					url: "http://10.6.133.13:8081/organization/getOrganizationListByName",
					params: {
						name: that.searchValue
					}
				})
				.then(
					res => {
						that.treeObj = $.fn.zTree.init($('#ztree'), this.setting, res.data);
				})
				.catch(function (err) {
					console.log(err);
				});
			},
			goClear: function () {
				this.searchValue = "";
			}
		},
		mounted () {
			this.update();
			/*let nodes = this.treeObj;
			console.log(nodes);
			this.treeObj.selectNode(nodes[0]);*/
		}
	}
</script>
<style type="text/css">
	.org-tree {
		height: 100%;
		width: 100%;
		border-right: 3px solid #99bbe8;
	}
	.org-tree .el-dialog__header {
		background: #0099FF;
		height: 40px;
		line-height: 43px;
		padding: 0 10px;
	}
	.org-tree .el-dialog__header .el-dialog__title {
		color: #fff;
		line-height: 0;
	}
	.org-tree .el-dialog__header .el-dialog__headerbtn {
		margin-top: 12px;
	}
	.org-tree .el-dialog__header .el-dialog__headerbtn i {
		color: #fff;
	}
	.org-tree .tree-content {
		width: 100%;
		height: calc(100% - 60px);
		overflow: auto;
	}
	.org-tree .tree-search {
		width: 100%;
		height: 30px;
		padding: 1px;
		background: #CEDFEA;
		border-top: 2px solid #99bbe8;
	}
	.org-tree .tree-search div {
		width: 245px;
		border: 1px solid #A6C2D3;
		height: 25px; 
		border-radius: 10px;
		line-height: 25px;
		float: right;
		background: #fff;
	}
	.org-tree .tree-search li {
		float: right;
		width: 30px;
		text-align: center;
		height: 23px;
		background: #CEE1EA;
		cursor: pointer;
	}
	.org-tree .tree-search li:first-child {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.org-tree .tree-search li:hover {
		opacity: .7;
	}
	.org-tree .tree-search input {
		width: 170px;
		height: 23px;
		line-height: 23px;
		float: left;
		border: none;
		outline: none;
		margin-left: 10px;
	}
	.org-tree .tree-header {
		width: 100%;
		height: 30px;
		background: linear-gradient(to bottom, #DAE6F4, #D0DEF0);
	}
	.org-tree .tree-header span {
		color: #15428b;
		font-weight: bold;
		font-size: 12px;
		line-height: 30px;
		margin-left: 5px;
	}
	.org-tree .tree-header ul {
		float: right;
		height: 30px;
		line-height: 30px;
	}
	.org-tree .tree-header li {
		float: left;
		width: 30px;
		text-align: center;
		height: inherit;
	}
	.org-tree .tree-header li:hover {
		border: 1px solid #AAC8F1;
		border-radius: 5px;
		background: linear-gradient(to bottom, #DDF0FF, #C6DCF6);
		opacity: .9;
		cursor: pointer;
	}
	.org-tree .tree-header li i {
		color: #f69623;
		font-size: 16px;
	}
</style>