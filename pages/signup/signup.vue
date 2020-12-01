<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image class='back-img' @tap="toSignIn" src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="logo">
				<image src="../../static/images/sign/logo1.png" mode=""></image>
			</view>
			<view class="main">
				<view class="title">
					登录
				</view>
				<view class="inputs">
					<view class="input-div">
						<input type="text" value="" @input="getUser" placeholder="情趣个名字" class='user' placeholder-style="color:#aaa;font-weight:400" />
						<view class="employ" v-if="useremploy">
							已经占用
						</view>
						<image src="../../static/images/sign/right1.png" class="ok" mode="" v-if="isuser"></image>
					</view>
					<view class="input-div">
						<input type="text" @input="isemails" value="" placeholder="请输入邮箱" class='email' placeholder-style="color:#aaa;font-weight:400" />
						<view class="employ" v-if="emailemploy">
							已经占用
						</view>
						<view class="invalid" v-if="invalid">
							邮箱无效
						</view>
						<image src="../../static/images/sign/right1.png" class="ok" mode="" v-if="isemail"></image>
					</view>
					<view class="input-div">
						<input :type="type" @input="getPassword" value="" placeholder="请输入密码" class="pwd" placeholder-style="color:#aaa;font-weight:400" />
						<image :src="lookurl" @tap="looks" class="look" mode=""></image>
					</view>


				</view>
			</view>
			<button :class="[{submit:isok},{submit1:!isok}]" @tap="login">登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'password',
				isuser: true,
				isemail: false,
				invalid: false,
				useremploy: false,
				emailemploy: false,
				lookurl: '../../static/images/sign/biyan.png',
				email:null,
				user:null,
				password:null,
				isok:false
			}
		},
		methods: {
			isemails(e){
				this.email = e.detail.value
				// let reg = // 邮箱正则
				if(this.email.length>0){
					
				}else{
					
				}
			},
			looks() {
				if (this.look) {
					this.type = 'password'
					this.lookurl = '../../static/images/sign/biyan.png'
				} else {
					this.type = 'text'
					this.lookurl = '../../static/images/sign/look.png'

				}
				this.look = !this.look
				this.isok()
			},
			toSignIn(){
				uni.navigateBack({
				    delta: 1
				});
			},
			getUser(e){
				this.user = e.detail.value
				this.isok()
			},
			getPassword(){
				this.password = e.detail.value
				this.isok()
			},
			isok(){
				if(this.isuser&&this.isemail&&this.password.length>5){
					this.isok = true
				}else{
					this.isok = false
				}
			},
			login(){
				console.log(this.user,this.password)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	// .content {
	// 	padding-top: var(--status-bar-height);
	// }

	// .top-bar {
	// 	width: 100%;
	// 	position: fixed;
	// 	padding-top: var(--status-bar-height);
	// 	top: 0;
	// 	left: 0;
	// 	height: 88rpx;
	// 	box-sizing: border-box;
	// 	background-color: $uni-bg-color;

	// 	.top-bar-left {
	// 		float: left;
	// 		padding-left: 32rpx;
	// 		width: 88rpx;
	// 		height: 88rpx;

	// 		.text {
	// 			font-size: $uni-font-size-lg;
	// 			color: $uni-text-color;
	// 			line-height: 88rpx;
	// 			font-weight: 500;
	// 		}

	// 		.back-img {
	// 			margin-top: 21rpx;
	// 			width: 26rpx;
	// 			height: 46rpx;
	// 		}

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


		.inputs {
			padding-top: 8rpx;

			.input-div {
				position: relative;
			}

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

		.employ,
		.invalid {
			font-weight: 500;
			color: $uni-color-warning;
			font-size: $uni-font-size-base;
			line-height: 88rpx;
			position: absolute;
			top: 40rpx;
			right: 0;
		}

		.ok {
			width: 38rpx;
			height: 30rpx;
			position: absolute;
			right: 0;
			top: 76rpx;
		}

		.look {
			width: 32rpx;
			height: 18rpx;
			position: absolute;
			right: 0;
			top: 76rpx;
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
	
	.submit1 {
		margin: 0 auto;
		width: 520rpx;
		height: 96rx;
		background-color: rgba(39,40,50,0.2);
		border-radius: 48rpx;
		font-weight: 500;
		font-size: $uni-font-size-lg;
		color: $uni-text-color-inverse;
		line-height: 96rpx;
		text-align: center;
	}
</style>
