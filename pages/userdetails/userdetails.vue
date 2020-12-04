<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					详情
				</view>
			</view>
			<view class="top-bar-right ">
				<view class="pic">
				</view>
			</view>
		</view>
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">
						头像
					</view>
					<view class="user-head">
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" @tap="upload" class="user-img"></image>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row"  @tap="midify('邮箱',dataArr.mail,false)">
					<view class="title">
						签名
					</view>
					<view class="cont">
						{{dataArr.sign}}
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						注册
					</view>
					<view class="cont">
						{{dataArr.zhuce}}
					</view>
					<view class="more">
					</view>
				</view>
			</view>
			<view class="column">
				<view class="row head" @tap="midify('昵称',dataArr.name,false)">
					<view class="title" >
						昵称
					</view>
					<view class="cont">
						{{dataArr.name}}
					</view>
					<view class="more">
					</view>
				</view>
				<view class="row">
					<view class="title">
						性别
					</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						生日
					</view>
					<view class="cont">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row" @tap="midify('电话',dataArr.tell,false)">
					<view class="title">
						电话
					</view>
					<view class="cont">
						{{dataArr.tell}}
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row" @tap="midify('邮箱',dataArr.mail,true)">
					<view class="title">
						邮箱
					</view>
					<view class="cont">
						{{dataArr.mail}}
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="column">
				<view class="row">
					<view class="title">
						密码
					</view>
					<view class="cont">
						******
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="btn2">
				退出登录
			</view>
			<!-- <view class="btn2" > // 判断id
				删除好友 
			</view> -->
		</view>
		<view class="modify" :style="{bottom:-addHeight+'px'}" :animation="animationData">
			<view class="modify-head">
				<view class="close" @tap="midify">
					取消
				</view>
				<view class="title">
					签名
				</view>
				<view class="define" @tap="midifySubmit">
					确定
				</view>
			</view>
			<view class="modify-main">
				<input type="text" v-if="ispwd" class="modify-pwd" v-model="pwd" placeholder="密码" placeholder-class="color:#aaa" value="" />
				<textarea v-model="data" class="modify-content" placeholder="" />
				</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				dataArr:{
					name:"小明",
					sign:'ahkiuwhbdawyugdhia',
					zhuce:new Date(),
					sex:"男",
					birth:"1999-12-24",
					tell:'156846846',
					mail:'1684684@qq.com'
				},
				cropFilePath: "../../static/images/img/three.png",
				tempFilePath: '',
				array: ['男', '女', '泰国'],
				index: 0,
				date: currentDate,
				data:'修改得知',// 昵称修改
				pwd:'',
				animationData:{},
				isModify:false,
				addHeight:'',
			modifyType:'',
			ispwd:false
			}
		},
		components: {
			ImageCropper
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReady(){
			this.getElementStyle()
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			toSignIn() {
				uni.navigateBack({
					delta: 1
				});
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 头像裁剪
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = '';
				this.cropFilePath = e.detail.tempFilePath;
				this.headimg = e.detail.tempFilePath;

				// #ifdef APP-PLUS||MP
				//除了H5端返回base64数据外，（APP-PLUS||MP就是APP和小程序就执行编译。）其他端都是返回临时地址，所以你要判断base64还是已上传文件名，
				//按我这里是先上传裁剪得来的临时文件地址然后得到已上传的文件名，
				//呆活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了

				uni.uploadFile({
					url: '后端地址上传图片接口地址',
					filePath: this.headimg,
					name: 'file',
					fileType: 'image',
					//formData:{},传递参数
					success: (uploadFileRes) => {
						var backstr = uploadFileRes.data;
						//自定义操作
					},
					complete() {
						//console.log("this is headimg"+this.headimg)   
					},
					fail(e) {
						console.log("this is errormes " + e.message)
					}

				});

				// #endif
			},
			cancel() {
				console.log('canceled')
			},
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => {
				  this.addHeight = (data.height - 186)*2
				}).exec();
			},
			midify(type,data,ispwd){
				this.ispwd =ispwd
				this.modifyType = type
				this.data = data
				this.isModify = !this.isModify
				var animation = uni.createAnimation({
				      duration: 300,
				      timingFunction: 'ease',
				    })
				if(this.isModify){
					animation.bottom(0).step()
				}else{
					animation.bottom(-this.addHeight).step()
				}
				this.animationData = animation.export()
			},
			midifySubmit(){
				this.midify()
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		border-bottom: 1rpx solid $uni-border-color;
		background: rgba(255, 255, 255, 0.96);
	}

	.main {
		padding-top: 118rpx;
		display: flex;
		flex-direction: column;

		.column {
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			width: 100%;
			border-bottom: 1rpx solid $uni-border-color;
			box-sizing: border-box;
			padding-right: $uni-spacing-col-base;

			.row {
				display: flex;
				flex-direction: row;
			}

			.title {
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}

			.user-head {
				flex: auto;
			}

			.user-img {
				margin-top: 22rpx;
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
			}

			.cont {
				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;

				image {
					width: 30rpx;
					height: 28rpx;
				}
			}
		}

		.btn2 {
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 88rpx;
			margin-top: 160rpx;
		}
	}
	// 修改签名
	.modify{
		position: fixed;
		z-index: 1002;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #FFF;
		.modify-head{
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1rpx solid $uni-border-color;
			background: rgba(255, 255, 255, 0.96);
			.close{
				font-size: $uni-font-size-lg;
				color:$uni-text-color;
				line-height: 44rpx;
				padding-left: $uni-spacing-col-base;
			}
			.title{
				flex: auto;
				text-align: center;
				font-size: 40rpx;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			.define{
				font-size: $uni-font-size-lg;
				color:$uni-color-success;
				line-height: 44rpx;
				padding-right: $uni-spacing-col-base;
			}
		}
		.modify-main{
		display: flex;
		padding: $uni-spacing-col-base;
		flex-direction: column;
		.modify-pwd{
			width: 100%;
			height: 88rpx;
			box-sizing: border-box;
			margin-bottom: $uni-spacing-col-base;
			padding: 0 20rpx;
			background-color: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color:$uni-text-color;
			line-height: 88rpx;
			flex: auto;
		}
		.modify-content{
			box-sizing: border-box;
			background-color: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			height: 386rpx;
			flex: auto;
			padding: 16rpx 22rpx;
			font-size: $uni-font-size-lg;
			color:$uni-text-color;
			line-height: 44rpx;
			width: 100%;
		}
	}
	}
</style>
