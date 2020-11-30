<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right">
				<view class='text' @tap="toSignUp">
					注册
				</view>
			</view>
			<view class="logo">
				<image src="../../static/images/sign/logo1.png" mode=""></image>
			</view>
			<view class="main">
				<view class="title">
					登录
				</view>
				<view class="slogan">
					您好！欢迎来到mini
				</view>
				<view class="inputs">
					<input type="text" value="" @blur="getUser" placeholder="用户名/邮箱" class='user' placeholder-style="color:#aaa;font-weight:400" />
					<input type="password" value="" @blur="getPassword" placeholder="密码" class="pwd" placeholder-style="color:#aaa;font-weight:400" />

				</view>
				<view class="tips">
					输入密码或用户名错误！
				</view>
			</view>
			<button class="submit" @tap="login">登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
user:null,
password:null
			}
		},
		methods: {
			toSignUp() {
				uni.navigateTo({
					url: '../signup/signup'
				})
			},
			getUser(e){
				this.user = e.detail.value
			},
			getPassword(){
				this.password = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	.content {
		padding-top: var(--status-bar-height);
	}

	// .top-bar {
	// 	width: 100%;
	// 	position: fixed;
	// 	padding-top: var(--status-bar-height);
	// 	top: 0;
	// 	left: 0;
	// 	height: 88rpx;
	// 	box-sizing: border-box;
	// 	background-color: $uni-bg-color;

	// 	.top-bar-right {
	// 		float: right;
	// 		padding-right: 32rpx;

			// .text {
			// 	font-size: $uni-font-size-lg;
			// 	color: $uni-text-color;
			// 	line-height: 88rpx;
			// 	font-weight: 500;
			// }

	// 	}
	// }

	.logo {

		text-align: center;

		image {
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin: 0 auto;
		}
	}

	.main {
		padding: 54rpx $uni-spacing-row-lg 128rpx;

		.title {
			font-size: 56rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 88rpx;
		}

		.slogan {
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}

		.inputs {
			padding-top: 8rpx;

			input {
				padding-top: 40rpx;
				height: 88rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
				border-bottom: 1rpx solid $uni-border-color;
			}
		}

		.tips {
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
			float: left;
		}
	}

	.submit {
		margin: 0 auto;
		width: 520rpx;
		height: 96rx;
		background-color: $uni-color-primary;
		box-shadow: 0 50rpx 32rpx -36rpx rgba(255, 228, 49, 0.4);
		border-radius: 48rpx;
		font-weight: 500;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		line-height: 96rpx;
		text-align: center;
	}
</style>
