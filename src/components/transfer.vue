<template>
	<div id="transfer" class="transfer">
		<div class="content transfer-left">
			<div class="title">列表1</div>
			<div class="ztree list" id="ztree1"></div>
			<div class="footer">
				<el-button size="small" @click="treeObj1.checkAllNodes(true)">全选</el-button>
				<el-button size="small" @click="treeObj1.checkAllNodes(false)">取消</el-button>
			</div>
		</div>
		<div class="transfer-center">
			<div class="option-button">
				<div><el-button type="primary" @click="right">添加<i class="el-icon-arrow-right el-icon--right"></i></el-button></div>
				<div><el-button type="primary" icon="arrow-left" @click="left">删除</el-button></div>
			</div>
		</div>
		<div class="content transfer-right">
			<div class="title">列表2</div>
			<div class="ztree list" id="ztree2"></div>
			<div class="footer">
				<el-button size="small" @click="treeObj2.checkAllNodes(true)">全选</el-button>
				<el-button size="small" @click="treeObj2.checkAllNodes(false)">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios";
	export default {
		name: "transfer",
		data () {
			return {
				currentNode: "",
				treeObj1: "",
				treeObj2: "",
				leftNodes: "",
				rightNodes: "",
				addArrayL: [],
				addArrayR: [],
				addArrayLId: [],
				addArrayRId: [],
				initStatusId: [],
				addId: [],
				subId: [],
				setting1: {
					async: {
						enable: false,
						url: "http://10.6.135.106:8081/organization/asynGetZTree",
						autoParam: ['id'],
						type: "post"
					},
					check: { 
						enable: true,
						chkStyle: "checkbox"
					},
					callback: {
						onClick: this.zTreeOnClick1
					}
				},
				setting2: {
					async: {
						enable: false,
						url: "http://10.6.135.106:8081/organization/asynGetZTree",
						autoParam: ['id'],
						type: "post"
					},
					check: { 
						enable: true,
						chkStyle: "checkbox"
					},
					callback: {
						onClick: this.zTreeOnClick2
					}
				},
				data1: [],
				data2: []
			}
		},
		props: [ 'nodeId' ],
		methods: {
			zTreeOnClick1: function () {
				let nodes = this.treeObj1.getSelectedNodes();
				nodes.map((item) => {
					if(item.checked)
						this.treeObj1.checkNode(item, false, true);
					else
						this.treeObj1.checkNode(item, true, true);
				});
			},
			zTreeOnClick2: function () {
				let nodes = this.treeObj2.getSelectedNodes();
				nodes.map((item) => {
					if(item.checked)
						this.treeObj2.checkNode(item, false, true);
					else 
						this.treeObj2.checkNode(item, true, true);
				});
			},
			left: function () {
				/*----------------------------右侧删除------------------------------------*/
				if(this.treeObj2.getCheckedNodes(true).length === 0)
					return;
				this.rightNodes = this.treeObj2.transformToArray(this.treeObj2.getNodes());
				this.rightNodes = this.rightNodes.filter((item, index, arr) => {
					if((typeof item.children === 'undefined') && item.checked) {
						if(this.addArrayLId.indexOf(item.id) === -1) {
							this.addArrayL.push({
									"code": item.code,
									"isParent": item.isParent,
									"iconSkin": item.iconSkin,
									"name": item.name,
									"pId": item.pId,
									"id": item.id,
									"open": item.open,
									"parentId": item.parentId
								});
							this.addArrayLId.push(item.id);
						}	
					} else {
						if(item.checked) {
							delete item.children;
							if(this.addArrayLId.indexOf(item.id) === -1) {
								this.addArrayL.push({
									"code": item.code,
									"isParent": item.isParent,
									"iconSkin": item.iconSkin,
									"name": item.name,
									"pId": item.pId,
									"id": item.id,
									"open": item.open,
									"parentId": item.parentId
								});
								this.addArrayLId.push(item.id);
							}
						}
					}
					return (!item.checked || item.check_Child_State === 0 || item.check_Child_State === 1)
				});
				this.data2 = this.treeObj2.transformTozTreeNodes(this.rightNodes);
				this.treeObj2 = $.fn.zTree.init($('#ztree2'), this.setting2, this.data2);
				this.treeObj2.checkAllNodes(false);
				/*----------------------右侧删除结束，左侧添加开始----------------------------*/
				this.leftNodes = this.treeObj1.transformToArray(this.treeObj1.getNodes());
				this.leftNodes.forEach((item) => {
					delete item.children;
					this.addArrayL = this.addArrayL.filter((val,index) => {
						return (val.id !== item.id);
					})
				});
				this.leftNodes = this.leftNodes.concat(this.addArrayL);
				this.data1 = this.treeObj1.transformTozTreeNodes(this.leftNodes);
				this.treeObj1 = $.fn.zTree.init($('#ztree1'), this.setting1, this.data1);
				this.treeObj1.checkAllNodes(false);	
				this.addArrayL.length = 0;
				this.addArrayR.length = 0;
				this.addArrayRId.length = 0;
				this.addArrayLId.length = 0;
				this.getNodesStatus();
				/*-----------------------------左侧添加结束--------------------------------*/
			},
			right: function () {
				/*-----------------------------左侧删除开始--------------------------------*/
				if(this.treeObj1.getCheckedNodes(true).length === 0)
					return;
				this.leftNodes = this.treeObj1.transformToArray(this.treeObj1.getNodes());
				this.leftNodes = this.leftNodes.filter((item, index, arr) => {
					if((typeof item.children === 'undefined') && item.checked) {
						if(this.addArrayRId.indexOf(item.id) === -1) {
							this.addArrayR.push({
									"code": item.code,
									"isParent": item.isParent,
									"iconSkin": item.iconSkin,
									"name": item.name,
									"pId": item.pId,
									"id": item.id,
									"open": item.open,
									"parentId": item.parentId
								});
							this.addArrayRId.push(item.id);
						}	
					} else {
						if(item.checked) {
							delete item.children;
							if(this.addArrayRId.indexOf(item.id) === -1) {
								this.addArrayR.push({
									"code": item.code,
									"isParent": item.isParent,
									"iconSkin": item.iconSkin,
									"name": item.name,
									"pId": item.pId,
									"id": item.id,
									"open": item.open,
									"parentId": item.parentId
								});
								this.addArrayRId.push(item.id);
							}
						}
					}
					return (!item.checked || item.check_Child_State === 0 || item.check_Child_State === 1)
				});
				this.data1 = this.treeObj1.transformTozTreeNodes(this.leftNodes);
				this.treeObj1 = $.fn.zTree.init($('#ztree1'), this.setting1, this.data1);
				this.treeObj1.checkAllNodes(false);
				/*--------------------左侧删除结束，右侧添加开始------------------------------*/
				this.rightNodes = this.treeObj2.transformToArray(this.treeObj2.getNodes());
				this.rightNodes.forEach((item) => {
					delete item.children;
					this.addArrayR = this.addArrayR.filter((val,index) => {
						return (val.id !== item.id);
					})
				});
				this.rightNodes = this.rightNodes.concat(this.addArrayR);
				this.data2 = this.treeObj2.transformTozTreeNodes(this.rightNodes);
				this.treeObj2 = $.fn.zTree.init($('#ztree2'), this.setting2, this.data2);
				this.treeObj2.checkAllNodes(false);	
				this.addArrayL.length = 0;
				this.addArrayR.length = 0;
				this.addArrayRId.length = 0;
				this.addArrayLId.length = 0;
				this.getNodesStatus();
				/*---------------------右侧添加结束-----------------------------------------*/
			},
			init: function () {
				axios({
					method: "post",
					url: "http://10.6.133.13:8081/monitor/getOptionMonitorList",
					params: {
						orgId: this.nodeId
					}
				})
				.then( 
					res => {
						if(res.data.state === 0) {
							this.data1 = res.data.list;
							this.treeObj1 = $.fn.zTree.init($('#ztree1'), this.setting1, null);
							this.data1 = this.treeObj1.transformTozTreeNodes(this.data1);
							this.treeObj1 = $.fn.zTree.init($('#ztree1'), this.setting1, this.data1);
							this.treeObj2 = $.fn.zTree.init($('#ztree2'), this.setting2, null);
							this.treeObj2 = $.fn.zTree.init($('#ztree2'), this.setting2, this.data2);
						} else {
							alert("获取可选监控点失败");
						}
				})
				.catch(function (err) {
					console.log(err);
				});
			},
			getNodesStatus: function () {
				let arrayR = this.treeObj2.transformToArray(this.treeObj2.getNodes());
				let arrayRId = [];
				arrayR.forEach((item) => {
					arrayRId.push(item.id);
					if(this.initStatusId.indexOf(item.id) === -1 && !item.children)
						this.addId.push(item.id);
				});
				this.initStatusId.forEach((item) => {
					if(arrayRId.indexOf(item) === -1 && !item.children)
						this.subId.push(item) 
				});
				this.$emit('getNodeChange', this.addId, this.subId);
			}
		},	
		mounted () {
			this.init();
		}
	}
</script>

<style type="text/css">
	.transfer {
		width: 800px;
		height: 500px;
		z-index: 100;
		margin: 0 auto;
		background: #fff;
		position: relative;
		padding: 10px 20px;
	}
	.transfer .content {
		width: 40%;
		height: 100%;
		border: 1px solid #D1DBE5;
		position: relative;
	}
	.transfer .content .title {
		width: 100%;
		height: 35px;
		line-height: 35px;
		font-size: 16px;
		padding-left: 10px;
		border-bottom: 1px solid #D1DBE5;
	}
	.transfer .content .footer {
		width: 100%;
		height: 35px;
		border-top: 1px solid #D1DBE5;
		bottom: 0;
		position: absolute;
		line-height: 34px;
		text-align: left;
		padding: 0 10px;
	}
	.transfer .content .list {
		padding: 10px;
		height: 405px;
		overflow: auto;
	} 

	.transfer .transfer-left {
		float: left;
	}	
	.transfer .transfer-right {
		float: left;
	}
	.transfer .transfer-center {
		width: 20%;
		height: 100%;
		overflow: hidden;
		float: left;
	}
	.transfer .transfer-center .option-button {
		margin-top: 165px;
	}
	.transfer .transfer-center .option-button > div {
		text-align: center;
	}
	.transfer .transfer-center .option-button .el-button {
		margin-top: 20px;
	}
</style>