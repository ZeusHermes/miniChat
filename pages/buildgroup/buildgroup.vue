<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<view class="text">
					取消
				</view>
			</view>
			<view class="top-bar-center">
				<view class="title">
					创建群聊
				</view>
			</view>
			<view class="top-bar-right ">
				<view class="pic">
				</view>
			</view>
		</view>
		<view class="main">
			<view class="top">
				<view class="group-img-panel" @tap="upload">
					<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
					<image class="group-img" :src="cropFilePath"></image>
					<image class="pan" src="../../static/images/group/edit_group_img.png" mode=""></image>
				</view>
				<view class="group-name">
					<input class="group-name-input" placeholder-style="color:#AAA;" type="text" v-model="groupname" value="" placeholder="为群取个名字" />
				</view>
				<view class="title">
					用户选择
				</view>
			</view>
			<view class="friends">
				<view class="user-list" v-for="(item,index) in userList" :key="index" @tap="selectedFriend(index)">
					<view class="selected" :class="{isselected:item.selected}">
						<image v-if="item.selected" class="selected-img" src="../../static/images/group/choose.png" mode=""></image>
					</view>
					<image class="user-img" :src="item.imgurl" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="buttom-bar">
			<view class="bottom-btn btn1" :class="{noselected:selectNum<1||groupname.length<1}"  @tap='addFriendAnimation'>
				创建群({{selectNum}})
			</view>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		data() {
			return {
				cropFilePath: "../../static/images/group/group.png",
				tempFilePath: '',
				selectNum: 0,
				groupname:'',
				userList: [{
						selected: false,
						imgurl: '../../static/images/img/four.png',
						name: '大海'
					},
					{
						selected: true,
						imgurl: '../../static/images/img/three.png',
						name: 'xiaolong'
					},
					{
						selected: false,
						imgurl: '../../static/images/img/four.png',
						name: '小刚'
					},
					{
						selected: false,
						imgurl: '../../static/images/img/two.png',
						name: '不知道'
					},
					{
						selected: true,
						imgurl: '../../static/images/img/one.png',
						name: '好友'
					}
				]
			};
		},
		components: {
			ImageCropper
		},
		onLoad(){
			this.selectCount()
		},
		methods: {
			toSignIn() {},
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

				// uni.uploadFile({
				// 	url: '后端地址上传图片接口地址',
				// 	filePath: this.headimg,
				// 	name: 'file',
				// 	fileType: 'image',
				// 	//formData:{},传递参数
				// 	success: (uploadFileRes) => {
				// 		var backstr = uploadFileRes.data;
				// 		//自定义操作
				// 	},
				// 	complete() {
				// 		//console.log("this is headimg"+this.headimg)   
				// 	},
				// 	fail(e) {
				// 		console.log("this is errormes " + e.message)
				// 	}

				// });

				// #endif
			},
			cancel() {
				console.log('canceled')
			},
			selectedFriend(user) {
				this.userList[user].selected = !this.userList[user].selected
				if(this.userList[user].selected){
					this.selectNum += 1
				}else{
					this.selectNum -= 1
				}
			},
			selectCount(){
				for(let i = 0;i<this.userList.length;i++){
					if(this.userList[i].selected){
						this.selectNum += 1
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		z-index: 9999;
		border-bottom: 1rpx solid $uni-border-color;
		background: rgba(255, 255, 255, 1);
	}

	.main {
		display: flex;
		flex-direction: column;

		.top {
			padding-top: 148rpx;
			position: fixed;
			;
			background-color: #FFF;
			width: 100%;
			z-index: 10;

			.title {
				color: $uni-text-color;
				font-size: 44rpx;
				min-height: 60rpx;
				font-weight: 600;
				padding: $uni-spacing-col-base $uni-spacing-row-base 20rpx;
			}
		}

		.group-img-panel {
			width: 196rpx;
			height: 196rpx;
			margin: 0 auto;
			background-color: #FFE431;
			box-sizing: 0rpx 36rpx 40rpx 0rpx rgba(39, 40, 50, 0.1);
			border-radius: 40rpx;
			overflow: hidden;
			position: relative;

			.group-img {
				width: 196rpx;
				height: 196rpx;
			}

			.pan {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: auto;
				z-index: 9;
				width: 48rpx;
				height: 48rpx;
			}
		}

		.group-name {
			padding: 62rpx $uni-spacing-col-base 0;
		}

		.group-name-input {
			text-align: center;
			height: 92rpx;
			background-color: $uni-bg-color-grey;
			border-radius: 46rpx;
			font-size: 32rpx;
			color: $uni-text-color;
			// line-height: 92rpx;
		}


		.friends {
			padding: 600rpx $uni-spacing-row-base 0 $uni-spacing-row-base;

			.user-list {
				display: flex;
				flex-direction: row;
				height: 120rpx;
				align-items: center;

				.selected {
					flex: none;
					width: 48rpx;
					height: 48rpx;
					margin-right: 30rpx;
					border-radius: $uni-border-radius-circle;
					background-color: rgba(255, 228, 49, 0.5);

					.selected-img {
						width: 30rpx;
						height: 20rpx;
						padding: 14rpx 9rpx;
					}
				}

				.isselected {
					background-color: rgba(255, 228, 49, 1);
				}

				.user-img {
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}

				.name {
					padding-left: 32rpx;
					font-size: 36rpx;
					color: $uni-text-color;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}


	}

	.buttom-bar {
		background-color: rgba(250, 250, 250, 0.9);
		box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.25);

		.bottom-btn {
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}
		.noselected{
			background-color: $uni-bg-color-grey!important;
		}
	}
</style>
