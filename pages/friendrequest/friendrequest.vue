<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					好友请求
				</view>
			</view>
			<view class="top-bar-right">
				<view class="pic">

				</view>
			</view>
		</view>
		<view class="main">
			<view class="requester">
					<view class="request-top">
						<view class="reject btn">
							拒绝
						</view>
						<view class="header-img">
							<image  src="../../static/images/img/four.png" mode=""></image>
						</view>
						<view class="agree btn">
							同意
						</view>
					</view>
					<view class="request-center">
						<view class="title">
							小明
						</view>
						<view class="time">
							2020-11-11 10：10
						</view>
					</view>
					<view class="notice">
						<text>留言</text>
						你好，我是新租车的会延缓，你想干啥啊
					</view>
				</view>
			
			<view class="requester">
				<view class="request-top">
					<view class="reject btn">
						拒绝
					</view>
					<view class="header-img">
						<image  src="../../static/images/img/four.png" mode=""></image>
					</view>
					<view class="agree btn">
						同意
					</view>
				</view>
				<view class="request-center">
					<view class="title">
						小明
					</view>
					<view class="time">
						2020-11-11 10：10
					</view>
				</view>
				<view class="notice">
					<text>留言</text>
					你好，我是新租车的会延缓，你想干啥啊
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toSignIn() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	.top-bar {
		border-bottom: 1rpx solid $uni-border-color;
		background: rgba(255, 255, 255, 0.96);
	}
	.main{
		padding: 108rpx $uni-spacing-col-base;
		.requester{
			margin-top: 112rpx;
			background-color: rgba(255,255,255,1);
			padding: $uni-spacing-col-base;
			box-shadow: 0rpx 20rpx 64rpx -8rpx rgba(0,0,0,0.1);
			border-radius: $uni-border-radius-base;
		}
		.request-top{
			display: flex;
			flex-direction: row;
			.btn{
				text-align: center;
				flex: auto;
				width: 160rpx;
				height: 64rpx;
				background: rgba(255,93,91,0.1);
				border-radius: 40rpx;
				line-height: 64rpx;
				font-size: $uni-font-size-lg;
			}
			.reject{
				color: $uni-color-warning;
				background-color: rgba(255,93,91,0.1);
			}
			.agree{
				color: $uni-text-color;
				background-color: $uni-color-primary;
			}
			.header-img{
				margin-top: -104rpx;
				flex:auto;
				text-align: center;
				image{
					width: 144rpx;
					height:144rpx;
					border-radius: $uni-border-radius-circle;
				}
			}
		}
		.request-center{
			text-align: center;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			.title{
				font-size: 36rpx;
				font-weight: 500;
				color:$uni-text-color;
				line-height: 50rpx;
			}
			.time{
				font-size: $uni-font-size-sm;
				color: $uni-text-color-disable;
				line-height: 34rpx;
			}
		}
		.notice{
			font-size: $uni-font-size-base;
			padding:$uni-spacing-row-sm $uni-spacing-col-base;
			border-radius: $uni-border-radius-base;
			background-color: $uni-bg-color-grey;
			color: $uni-text-color;
			line-height: 40rpx;
		}
	}
</style>
