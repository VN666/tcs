<template>
	<div id="resList" class="res-list">
		<div class="resList-header">
			<div class="operate-nav">
				<ul>
					<li><span>资源</span><span>{{ titleType }}</span></li>
					<li></li>
					<li @click="dialogIsShow=true;test();"><i class="iconfont icon-tianjia"></i><span>添加</span></li>
					<li @click="handleDelete(multipleSelection,0,0)"><i class="iconfont icon-3"></i><span>删除</span></li>
					<li><i class="iconfont icon-daoru"></i><span>导入</span></li>
					<li><i class="iconfont icon-daochu1"></i><span>导出</span></li>
				</ul>
			</div>
			<div class="search-nav">
				<input v-model="searchValue" type="text" />
				<ul>
					<li @click="goClear"><i class="iconfont icon-icon"></i></li>
					<li @click="goSearch"><i class="iconfont icon-sousuo"></i></li>
				</ul>
			</div>
		</div>
		<add-device :nodeId="node.id" v-if="!isPoint&&dialogIsShow" @closeDialog="handleCloseDialog"></add-device>
		<edit-device :nodeId="node.id" :deviceInfo="singleInfo" v-if="!isPoint&&editDialogIsShow" @closeDialog="editDialogIsShow=false;"></edit-device>
		<edit-point :nodeId="node.id" :pointInfo="singleInfo" v-if="isPoint&&editDialogIsShow" @closeDialog="editDialogIsShow=false;"></edit-point>
		<add-point v-if="isPoint&&dialogIsShow" @closeDialog="handleCloseDialog" :nodeAdd="addNodeArray" :nodeSub="subNodeArray" :nodeId="node.id">
			<transfer :nodeId="node.id" @getNodeChange="handleGetNodeChange"></transfer>
		</add-point>
		<div class="resList-content">
			<el-table ref="resListTable" :data="resListData" @select="handleSelectionChange" @select-all="handleSelectionChange" :row-class-name="tableRowClassName">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column type="index" label="编号" width="70" align="center"></el-table-column>								
				<el-table-column label="监控点名称" prop="name" align="center" v-if="isPoint"></el-table-column>
				<el-table-column label="设备名称" prop="name" align="center" v-if="!isPoint"></el-table-column>
				<el-table-column label="设备类型" prop="typeName" align="center"></el-table-column>
				<el-table-column label="像素" prop="pixelName" align="center" v-if="isPoint"></el-table-column>
				<el-table-column label="所属设备" prop="deviceName" align="center" v-if="isPoint"></el-table-column>
				<el-table-column label="IP" prop="ip" align="center"></el-table-column>
				<el-table-column label="端口" prop="port" align="center"></el-table-column>
				<el-table-column label="通道数" prop="channelNum" align="center" v-if="!isPoint"></el-table-column>
				<el-table-column label="通道号" prop="channelId" align="center" v-if="isPoint"></el-table-column>
				<el-table-column label="操作" align="center">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" @click="handleDelete(scope.$index, scope.row, 1)" type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block page">
				<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[10,15,20]" :page-size="page.pageSize" :current-page="page.currentPage" :total="page.total" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import addDevice from "./add-device";
	import editDevice from "./edit-device";
	import addPoint from "./add-point";
	import editPoint from "./edit-point";
	import axios from "axios";
	import transfer from "./transfer";
	export default {
		name: "resList",
		components: { addDevice, addPoint, transfer, editPoint, editDevice },
		props: ['node'],
		data () {
			return {				
				titleType: "监控设备",
				channelName: "通道数",
				isPoint: false,
				dialogIsShow: false,
				editDialogIsShow: false,
				addDeviceDialog: false,
				searchValue: "",
				singleInfo: "",
				page: {
					currentPage: 1,
					total: 0,
					pageSize: 10,
				},
				resListData:[],
				multipleSelection: [],
				delIdArray: [],
				addNodeArray: [],
				subNodeArray: [],
				typeName: '',
				pixelName: ''
			}
		},
		methods: {
			goClear: function () {
				this.searchValue = "";
				this.requestList();
			},
			goSearch: function () {
				this.requestList();
			},
			tableRowClassName: function (row, index) {
				row.index = index;
			},
			handleGetNodeChange: function (param1, param2) {
				this.addNodeArray = param1;
				this.subNodeArray = param2;
			},
			handleCloseDialog: function (param) {
				this.dialogIsShow = false;
				this.requestList();
			},
			handleEdit: function (index, row) {
				this.singleInfo = this.resListData[index];
				this.editDialogIsShow = true;
			},
			handleDelete: function (index, row, type) {
				this.delIdArray.length = 0;
				if(type === 1) {
					if(this.delIdArray.indexOf(row.id) === -1)
						this.delIdArray.push(row.id);
				} else {
					this.multipleSelection.map((item) => {
						if(this.delIdArray.indexOf(item.id) === -1)
							this.delIdArray.push(item.id);
					});
				}
				/*发送删除请求*/
				if(this.delIdArray.length === 0) {
					alert('请选择需要操作的信息');
				} else {
					let reqUrl = "http://10.6.133.13:8081/";
					reqUrl = this.isPoint ? reqUrl+'monitor/deleteMonitor' : reqUrl+'/device/deleteDevice';
					axios({
						method: "post",
						url: reqUrl,
						params: {
							idArray: this.delIdArray.join(',')
						}
					})
					.then(
						res => {
							if(res.data.state === 0) {
								alert('删除成功');
								if(type === 1) {
									this.requestList();
								} else {
									this.multipleSelection.map((item) => {
										this.resListData.forEach((value,index,arr) => {
											if(value.id === item.id) {
												arr.splice(index, 1);
											}
										});
									});
								}
							} else {
								alert('删除失败');
							}
					})
					.catch(function (err) {
						console.log(err);
					});
				}
			},
			handleSelectionChange: function (val, row) {
				this.multipleSelection = val;
			},
			handleCurrentChange: function (val) {
				this.page.currentPage = val;
				this.requestList();
			},
			handleSizeChange: function (val) {
				this.page.pageSize = val;
				this.requestList();
			},
			requestList: function () {
				let reqUrl = "http://10.6.133.13:8081/";
				reqUrl = this.isPoint ? reqUrl+'monitor/getMonitorList' : reqUrl+'device/getDeviceList';
				axios({
					method: "post",
					url: reqUrl,
					params: {
						pageNum: this.page.currentPage,
						pageSize: this.page.pageSize,
						condition: this.searchValue,
						orgId: this.node.id
					}
				})
				.then(
					res => {
						if(res.data.state === 0) {
							if(!this.isPoint) {
								this.resListData = res.data.deviceList;
								this.page.currentPage = res.data.pageNum;
								this.page.total = res.data.totalNum;
							} else {
								this.resListData = res.data.monitorList;
								this.page.total = res.data.totalNum;
							}
						} else {
							alert('请求列表失败');
						}
					})
				.catch(function (err) {
					console.log(err);
				})
			}
		},
		mounted () {
			this.requestList();
		},
		watch: {
			node: function () {
				this.titleType = this.node.iconSkin == 'organization' ? '监控设备' : '监控点';
				this.channelName = this.node.iconSkin == 'organization' ? '通道数' : '通道号';
				this.isPoint = this.node.iconSkin == 'organization' ? false : true;
				this.requestList();
			}
		}
	}
</script>

<style type="text/css">
	.res-list {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.res-list .resList-content {
		width: 100%;
		height: auto;
	}
	.res-list .resList-content .page {
		text-align: center;
		position: relative;
		left: -50px;
		margin-top: 20px;
	}
	.res-list .resList-header {
		width: 100%;
		height: 30px;
		background: linear-gradient(to bottom, #DAE6F4, #D0DEF0);
	}
	.res-list .resList-header .search-nav {
		width: 245px;
		border: 1px solid #A6C2D3;
		height: 25px; 
		border-radius: 10px;
		line-height: 25px;
		background: #fff;
		margin-top: 2px;
		margin-right: 5px;
		float: right;
	}
	.res-list .resList-header .search-nav li {
		float: right;
		width: 30px;
		text-align: center;
		height: 23px;
		background: #CEE1EA;
		cursor: pointer;
	}
	.res-list .resList-header .search-nav li:first-child {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.res-list .resList-header .search-nav li:hover {
		opacity: .7;
	}
	.res-list .resList-header .search-nav input {
		width: 170px;
		height: 23px;
		line-height: 23px;
		float: left;
		border: none;
		outline: none;
		margin-left: 10px;
	}

	.res-list .resList-header .operate-nav li:first-child {
		width: 120px;
		background: #8CB8D8;
		line-height: 30px;
	}
	.res-list .resList-header .operate-nav li:first-child span {
		color: #15428B;
		font-size: 15px;
		margin-left: 10px;

	}
	.res-list .resList-header .operate-nav li:nth-child(2) {
		height: 0;
		width: 0;
		border-left: 15px solid #8CB8D8;
		border-top: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 15px solid #8CB8D8;
		margin-right: 20px;
	}
	.res-list .resList-header .operate-nav li {
		float: left;
		width: 65px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.res-list .resList-header .operate-nav li:nth-child(n+4)::before {
		content: "| ";
		font-size: 16px;
		color: #9AC6D0;
		text-shadow: #fff 1px 0px 1px;
	}
	.res-list .resList-header .operate-nav li:nth-child(n+3):hover {
		border: 1px solid #AAC8F1;
		border-radius: 5px;
		background: linear-gradient(to bottom, #DDF0FF, #C6DCF6);
		opacity: .9;
		cursor: pointer;
	}
	.res-list .resList-header .operate-nav li i {
		color: #f69623;
		font-size: 16px;
	}
	.res-list .resList-header .operate-nav li span {
		font-size: 16px;
	}
</style>

