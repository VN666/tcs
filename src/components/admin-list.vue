<template>
	<div id="adminList" class="admin-list">
		<div class="adminList-header">
			<div class="operate-nav">
				<ul>
					<li><span>用户管理</span></li>
					<li></li>
					<li @click="dialogIsShow=true;"><i class="iconfont icon-tianjia"></i><span>添加</span></li>
					<li @click="handleDelete(multipleSelection,0,0,'del')"><i class="iconfont icon-3"></i><span>删除</span></li>
					<li @click="handleDelete(multipleSelection,0,0,'res')"><i class="iconfont icon-3"></i><span>密码重置</span></li>
					<li><i class="iconfont icon-daoru"></i><span>导入</span></li>
					<li><i class="iconfont icon-daochu1"></i><span>导出</span></li>
				</ul>
			</div>
			<div class="filter" @click="filterIsShow=!filterIsShow;">
				<span>筛选</span>
				<i class="iconfont icon-shaixuan"></i>
			</div>
			<div class="filter-layer" v-if="filterIsShow">
				<el-form ref="filterForm" :model="filterForm" :label-position="labelPosition" label-width="120px">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="notes：">
								<el-input size="small" v-model="filterForm.note" placeholder="" class="diy"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="姓名：">
								<el-input size="small" v-model="filterForm.name" placeholder="" class="diy"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
						  	<el-form-item label="创建时间范围：">
						  		<el-date-picker v-model="filterForm.updateTimeStart" type="datetime" placeholder="选择日期时间" size="small" @change="handleDateChange5">
						  		</el-date-picker>
						  		-
						  		<el-date-picker v-model="filterForm.updateTimeEnd" type="datetime" placeholder="选择日期时间" size="small" @chang="handleDateChange6">
						  		</el-date-picker>
						  	</el-form-item>
					  	</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="入职时间范围：">
						  		<el-date-picker v-model="createTimeStart" type="datetime" placeholder="选择日期时间" size="small" @change="handleDateChange1">
						  		</el-date-picker>
						  		-
						  		<el-date-picker v-model="filterForm.createTimeEnd" type="datetime" placeholder="选择日期时间" size="small" @change="handleDateChange2">
						  		</el-date-picker>
						  	</el-form-item>
					  	</el-col>
					  	<el-col :span="8">
						  	<el-form-item label="更新时间范围：">
						  		<el-date-picker v-model="filterForm.entryTimeStart" type="datetime" placeholder="选择日期时间" size="small" @change="handleDateChange3">
						  		</el-date-picker>
						  		-
						  		<el-date-picker v-model="filterForm.entryTimeEnd" type="datetime" placeholder="选择日期时间" size="small" @change="handleDateChange4">
						  		</el-date-picker>
						  	</el-form-item>
					  	</el-col>
					  	<el-col :span="8">
							<el-form-item label="是否开启：">
						    	<el-radio-group v-model="filterForm.isEnable" size="large">
						      		<el-radio label="-1">未选择</el-radio>
						      		<el-radio label="1">开启</el-radio>
						      		<el-radio label="0">关闭</el-radio>
						    	</el-radio-group>
						  	</el-form-item>
					  	</el-col>
					</el-row>
					<el-row>
						<el-col :span="2" :offset="22">
							<el-button type="primary" size="small">搜索</el-button>
							<el-button size="small" @click="filterReset">重置</el-button>
							<el-button type="text" size="small" @click="filterIsShow=false">收起 <i class="el-icon-arrow-up"></i></el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div class="adminList-content">
			<el-table ref="adminListTable" :data="adminListData" @select="handleSelectionChange" @select-all="handleSelectionChange" :row-class-name="tableRowClassName">
				<el-table-column type="selection" align="center"></el-table-column>
				<el-table-column type="index" label="编号" width="70" align="center"></el-table-column>
				<el-table-column label="姓名" prop="name" align="center"></el-table-column>
				<el-table-column label="note" prop="note" align="center"></el-table-column>
				<el-table-column label="电话" prop="phone" align="center"></el-table-column>
				<el-table-column label="入职时间" prop="entryTime" align="center"></el-table-column>
				<el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
				<el-table-column label="修改时间" prop="latestUpdate" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" @click="handleDelete(scope.$index, scope.row, 1, 'del')" type="danger">删除</el-button>
						<el-button size="small" @click="handleDelete(scope.$index, scope.row, 1, 'res')" type="info">密码重置</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block page">
				<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[10,15,20]" :page-size="page.pageSize" :current-page="page.currentPage" :total="page.total" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</div>
		</div>
		<add-admin></add-admin>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios";
	import addAdmin from "./add-admin";
	export default {
		name: "adminList",
		components: { addAdmin },
		data () {
			return {
				dialogIsShow: false,
				filterForm: {
					note: "",
					name: "",
					isEnable: "-1",
					createTimeStart: "",
					createTimeEnd: "",
					entryTimeStart: "",
					entryTimeEnd: "",
					updateTimeStart: "",
					updateTimeEnd: ""
				},
				createTimeStart: "",
				labelPosition: "right",
				filterIsShow: false,
				multipleSelection: [],
				multipleSelection: [],
				adminListData: [],
				page: {
					currentPage: 1,
					total: 0,
					pageSize: 10,
				},
				delIdArray: []
			}
		},
		methods: {
			tableRowClassName: function (row, index) {
				row.index = index;
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
			handleDelete: function (index, row, type, oper) {
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
					let reqUrl = "http://10.6.135.16:8081/user/";
					reqUrl = oper==='del' ? reqUrl+'deleteUser' : reqUrl+'updatePassword';
					let param = oper==='del' ? {idArray:this.delIdArray.join(',')} : {idArray:this.delIdArray.join(''),password:'Abc123456'};
					axios({
						method: "post",
						url: reqUrl,
						params: param
					})
					.then(
						res => {
							if(res.data.state === 0) {
								alert('成功');
								this.requestList();
								this.multipleSelection.length = 0;
							} else {
								alert('失败');
							}
					})
					.catch(function (err) {
						console.log(err);
					});
				}
			},
			handleDateChange1: function (val) { this.filterForm.createTimeStart = val; },
			handleDateChange2: function (val) { this.filterForm.createTimeEnd = val; },
			handleDateChange3: function (val) { this.filterForm.entryTimeStart = val; },
			handleDateChange4: function (val) { this.filterForm.entryTimeEnd = val; },
			handleDateChange5: function (val) { this.filterForm.updateTimeStart = val; },
			handleDateChange6: function (val) { this.filterForm.updateTimeEnd = val; },
			filterReset: function () {
				for(let n in this.filterForm) {
					if(n === 'isEnable') {
						this.filterForm[n] = "-1";
					} else {
						this.filterForm[n] = "";
					}
				}
			},
			requestList: function () {
				axios({
					method: "post",
					url: "http://10.6.135.16:8081/user/getUserList",
					params: {
						note: this.filterForm.note,
						name: this.filterForm.name,
						isEnable: this.filterForm.isEnable,
						createTimeStart: this.filterForm.createTimeStart,
						createTimeEnd: this.filterForm.createTimeEnd,
						entryTimeStart: this.filterForm.entryTimeStart,
						entryTimeEnd: this.filterForm.entryTimeEnd,
						updateTimeStart: this.filterForm.updateTimeStart,
						updateTimeEnd: this.filterForm.updateTimeEnd,
						pageSize: this.page.pageSize,
						currentPage: this.page.currentPage
					}
				})
				.then(
					res => {
						if(res.data.state === 0) {
							this.adminListData = res.data.userList;
							this.page.currentPage = res.data.currentPage;
							this.page.total = res.data.total;
						} else {
							alert("获取列表失败");
						}
					})
				.catch(function (err) {
					console.log(err);
				});
			}
		},
		mounted () {
			this.requestList();
		},
		watch: {}
	}
</script>

<style type="text/css">
	.admin-List {
		width: 100%;
		height: 100%;
	}	
	.admin-list .adminList-content {
		width: 100%;
		height: auto;
	}
	.admin-list .adminList-content .page {
		text-align: center;
		position: relative;
		left: -50px;
		margin-top: 20px;
	}
	.admin-list .adminList-header {
		width: 100%;
		height: 30px;
		background: linear-gradient(to bottom, #DAE6F4, #D0DEF0);
		position: relative;
	}
	.admin-list .adminList-header .filter {
		float: right;
		height: 30px;
		width: 100px;
		font-size: 16px;
		line-height: 30px;
		cursor: pointer;
		position: relative;
	}
	.admin-list .adminList-header .filter-layer {
		height: auto;
		width: 100%;
		background: red;
		position: absolute;
		background: #eff1f6;
		top: 30px;
		padding: 10px 20px;
		z-index: 10;
	}
	.admin-list .adminList-header .filter-layer .el-form-item {
		margin-bottom: 5px;
	}
	.admin-list .adminList-header .filter-layer .el-input.diy {
		width: 82%;
	}
	.admin-list .adminList-header .filter i {
		font-size: 16px;
		line-height: 30px;
		height: 30px;
		top: -2px;
		position: absolute;
	}
	.admin-list .adminList-header .operate-nav li:first-child {
		width: 120px;
		background: #8CB8D8;
		line-height: 30px;
	}
	.admin-list .adminList-header .operate-nav li:first-child span {
		color: #15428B;
		font-size: 15px;
		margin-left: 10px;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(2) {
		height: 0;
		width: 0;
		border-left: 15px solid #8CB8D8;
		border-top: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 15px solid #8CB8D8;
		margin-right: 20px;
	}
	.admin-list .adminList-header .operate-nav li {
		float: left;
		width: 65px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(n+4)::before {
		content: "| ";
		font-size: 16px;
		color: #9AC6D0;
		text-shadow: #fff 1px 0px 1px;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(5) {
		width: 100px;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(n+3):hover {
		border: 1px solid #AAC8F1;
		border-radius: 5px;
		background: linear-gradient(to bottom, #DDF0FF, #C6DCF6);
		opacity: .9;
		cursor: pointer;
	}
	.admin-list .adminList-header .operate-nav li i {
		color: #f69623;
		font-size: 16px;
	}
	.admin-list .adminList-header .operate-nav li span {
		font-size: 16px;
	}
</style>
