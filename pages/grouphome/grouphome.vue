<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back1.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/images/group/more1.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="top-bar bgbar" :animation="animationData">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/images/group/more.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="bg">
			<image :src="gimg" class="bg-img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="main-inner">
				<view class="inf">
					<view class="name">
						今天很好
					</view>
					<view class="time">
						2020/11/01
					</view>
					<view class="notice">
						今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好今天天气正好
					</view>
				</view>
				<view class="member">
					<view class="top">
						<view class="title">
							群成员
						</view>
						<view class="more">
							管理群成员
						</view>
						<image class="more-img" src="../../static/images/common/more.png" mode=""></image>
					</view>
					<view class="member-list">
						<view class="member-item" v-for="(item,index) in memberList" :key="index">
							<view class="imgs">
								<image src="../../static/images/group/delete.png" mode="" class="delete"></image>
								<image :src="'../../static/images/img/'+item.imgurl" mode="aspectFit" class="user-img"></image>
							</view>
							<view class="name">
								{{item.name}}
							</view>
						</view>
						<view class="member-item">
							<view class="imgs">
								<image src="../../static/images/group/add.png" mode="aspectFit" class="user-add"></image>
							</view>
							<view class="name">
								邀请
							</view>
						</view>
					</view>
					<view class="clear"></view>
				</view>
				<view class="mitem">

					<view class="row" @tap="midify('name','群名称','啦啦啦啦啦啦啦啦啦啊看看今晚务必爱喝酒客户')">
						<view class="title" >
							群名称
						</view>
						<view class="cont">
							啦啦啦啦啦啦啦啦啦啊看看今晚务必爱喝酒客户
						</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode=""></image>
						</view>
					</view>
					<view class="row">
						<view class="title">
							群头像
						</view>
						<view class="cont" @tap="upload">
							<view class="user-head">
								<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
								<image :src="gimg" class="group-img"></image>
							</view>
							<!-- <image :src="gimg" class="group-img" mode="aspectFill"></image> -->
						</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode=""></image>
						</view>
					</view>

					<view class="row"  @tap="midify('notice','群公告','啦啦啦啦啦啦啦啦啦啊看看今晚务必爱喝酒客户')">
						<view class="title">
							群公告
						</view>
						<view class="cont">
							啦啦啦啦啦啦啦啦啦啊看看今晚务必爱喝酒客户
						</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode=""></image>
						</view>
					</view>
					<view class="row">
						<view class="title" @tap="midify('gname','群内名','啦啦')">
							群内名
						</view>
						<view class="cont">
							啦啦
						</view>
						<view class="more">
							<image src="../../static/images/common/more.png" mode=""></image>
						</view>
					</view>
					<view class="row">
						<view class="title">
							消息免打扰
						</view>
						<view class="cont">
						</view>
						<view class="more">
							<switch color="rgba(255,228,49,1)" class="switch" :checked="checked" @change="switchChange" />
						</view>
					</view>

				</view>

			</view>

			<view class="btn2">
				解散群
			</view>
		</view>
		<view class="modify" :style="{bottom:-addHeight+'px'}" :animation="animationData">
			<view class="modify-head">
				<view class="close" @tap="midify">
					取消
				</view>
				<view class="title">
					{{modifyType}}
				</view>
				<view class="define" @tap="midifySubmit">
					确定
				</view>
			</view>
			<view class="modify-main">
				<textarea v-model="data" class="modify-content" placeholder="" />
				</view>
			</view>
		
	</view>
</template>

<script>
	import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
	import datas from '../../commons/js/datas.js'
	export default {
		data() {
			return {
				checked: true,
				gid: '',
				gimg: '',
				mainTop: false,
				memberList: [],
				animationData1: {},
				animationData: {},
				tempFilePath: '',
				modifyType:'',
				data:'',
				editname:'',
				isModify:false,
				addHeight:'800'
			};
		},
		components: {
			ImageCropper
		},
		onLoad(e) {
			this.gid = e.gid
			this.gimg = e.gimg
			console.log(this.gimg)
		},
		onReady() {
			this.getmember()
			this.getTop()

		},
		methods: {
			back() {},
			getmember() {
				this.memberList = datas.friends()
			},
			// 消息免打扰
			switchChange: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			getTop() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.main-inner').boundingClientRect(data => {
					this.addAnimation(data.top)
				}).exec();
			},
			addAnimation(top) {
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'linear',
				})
				if (top < 60) {
					animation.opacity(1).step()
				} else {
					animation.opacity(0).step()
				}
				this.animationData1 = animation.export()

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
				this.gimg = e.detail.tempFilePath;
				this.headimg = e.detail.tempFilePath;
			},
			cancel() {
				console.log('canceled')
			},
            midify(name,type,data){
				this.editname = name
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
						animation.bottom(-800).step()
					}
					this.animationData = animation.export()
				},
			midifySubmit(){
				this.midify()
			 }
			
		},
		onPageScroll() {

			this.getTop()
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.bgbar {
		background-color: #FFF !important;
		opacity: 0;
	}

	.clear {
		clear: both;
	}

	.top-bar {
		background-color: unset;
	}

	// .top-bar {
	// 	z-index: 9999;
	// 	border-bottom: 1rpx solid $uni-border-color;
	// 	background: rgba(255, 255, 255, 1);
	// }
	.bg {
		width: 100%;
		height: 100%;
		background-color: #FFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;

		.bg-img {
			width: 100%;
			height: 750rpc;
		}
	}

	.main {
		padding-top: 360rpx;

		.main-inner {
			width: 100%;
			min-height: 720rpx;
			background-color: #FFFFFF;
			border-radius: 40rpx 40rpx 0 0;
		}

		.inf {
			padding: $uni-spacing-row-base $uni-spacing-col-base 0;
			border-bottom: 1px solid #EEE;
			box-sizing: border-box;
			padding-bottom: 40rpx;

			.name {
				float: left;
				font-size: 48rpx;
				font-weight: 600;
				color: #272832;
				line-height: 66rpx;
			}

			.time {
				float: right;
				font-size: 28rpx;
				color: rgba(39, 40, 50, 0.5);
				line-height: 66rpx;
			}

			.notice {
				padding-top: 20rpx;
				font-size: 28rpx;
				color: #272832;
				line-height: 40rpx;
				clear: both;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}

		.member {
			border-bottom: 1px solid #EEE;

			.top {
				padding: $uni-spacing-row-base $uni-spacing-col-base 0;
				box-sizing: border-box;
				height: 100rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.title {
					flex: 1;
					font-size: 36rpx;
					font-weight: 600;
					color: #272832;
				}

				.more {
					text-align: right;
					flex: 1;
					padding-right: 20rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(39, 40, 50, 0.6);
				}

				.more-img {
					width: 24rpx;
					height: 28rpx;
				}
			}

			.member-list {
				width: 100%;
				padding: 20rpx 16rpx;
				box-sizing: border-box;

				.member-item {
					padding-bottom: 32rpx;
					width: 20%;
					height: auto;
					float: left;
					text-align: center;

					.imgs {
						display: inline-block;
						position: relative;
						width: 104rpx;
						height: 104rpx;
						border-radius: 20rpx;
						background-color: $uni-color-primary;
					}

					.user-img {
						width: 104rpx;
						height: 104rpx;
						border-radius: 20rpx;
						display: block;
					}

					.delete {
						width: 40rpx;
						height: 40rpx;
						border-radius: $uni-border-radius-circle;
						position: absolute;
						top: -16rpx;
						right: -16rpx;
						z-index: 9;
					}

					.name {
						padding: 0 8rpx;
						font-size: 28rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.user-add {
						width: 104rpx;
						height: 104rpx;
						padding: 32rpx;
						box-sizing: border-box;
					}
				}

				.switch {
					margin-right: 22rpx;
				}
			}
		}

		.mitem {
			display: flex;
			flex-direction: column;
			padding-top: 22rpx;
			width: 100%;
			padding-right: 32rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #EEE;


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
				height: 112rpx;
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

			.group-img {
				width: 88rpx;
				height: 88rpx;
				border-radius: 20rpx;
				margin-top: 16rpx;
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
