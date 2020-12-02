<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/images/userhome/more.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bai" :animation='animationData4'>
			</view>
			<!-- 可以使用背景模糊 -->
			<image class="bg-img" mode="aspectFill" src="../../static/images/img/three.png"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex">
					<image :animation="animationData3" :style="{background:sexBg}" src="../../static/images/userhome/female.png" mode=""></image>
				</view>
				<image :animation="animationData2" class="user-img" src="../../static/images/img/three.png"></image>
			</view>
			<view class="user-imf">
				<view class="name">
					{{user.name}}
				</view>
				<view class="nick">
					{{user.nick}}
				</view>
				<view class="intr">
					{{user.intr}}
				</view>
			</view>
			<view class="buttom-bar">
				<view class="bottom-btn btn1" @tap='addFriendAnimation'>
					加好友
				</view>
			</view>
		</view>
		<view class="add-misg" :style="{height:addHeight+'rpx',bottom: -addHeight+'rpx'}" :animation="animationData">
			<view class="name">
				{{user.name}}
			</view>
			<textarea maxlength="120" class="add-main" :value="myname+'请求价位好友'" placeholder="" />
			</view>
		<view class="add-btn buttom-bar" :animation="animationData1">
			<view class="close btn1" @tap="addFriendAnimation">
				取消
			</view>
			<view class="send btn1">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myname:'大哈',
				sexBg: 'rgba(255,93,91,1)',
				addHeight:'',
				animationData:{},
				animationData1:{},
				animationData2:{},
				animationData3:{},
				animationData4:{},
				isadd:false,
				user: {
					name: '左左表妹',
					nick: '女儿国',
					intr: '山有木兮木有枝，心悦君兮君不知。____佚名《越人歌》'
				}
			};
		},
		onReady(){
			this.getElementStyle()
		},
		methods: {
			toSignIn() {
				uni.navigateBack({
					delta: 1
				});
			},
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
				  this.addHeight = (data.height - 186)*2
				}).exec();
			},
			addFriendAnimation(){
				this.isadd = !this.isadd
				var animation = uni.createAnimation({
				      duration: 300,
				        timingFunction: 'ease',
				    })
				var animation1 = uni.createAnimation({
					      duration: 300,
					        timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
						      duration: 300,
						        timingFunction: 'ease',
				})
				var animation3 = uni.createAnimation({
						      duration: 300,
						        timingFunction: 'ease',
				})
				var animation4 = uni.createAnimation({
						      duration: 300,
						        timingFunction: 'ease',
				})
				
				   if(this.isadd){
					   animation.bottom(0).step()
					   animation1.bottom(0).step()
					   // animation2.width(120).height(120).top(80).step()
					   animation2.width(120).height(120).step()
					   animation3.opacity(0).step()
					   animation4.backgroundColor('rgba(255,228,49,0.6)').step()
				   }else{
					   animation.bottom(-this.addHeight).step()
					   animation1.bottom(-100).step()
					    // animation2.width(200).height(200).top(0).step()
					animation2.width().height().step()
					animation3.opacity(1).step()
					animation4.backgroundColor('rgba(255,228,49,0)').step()
				   }
				   this.animationData = animation.export()
				   this.animationData1 = animation1.export()
				   this.animationData2 = animation2.export()
				   this.animationData3 = animation3.export()
				   this.animationData4 = animation4.export()
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.bg {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;

		.bg-bai {
			height: 100%;
			width: 100%;
		}

		.bg-img {
			// 解决边缘露白
			position: absolute;
			left: 10rpx;
			top: -10rpx;
			height: 110%;
			width: 110%;
			z-index: -1;
			opacity: 0.4;
			filter: blur(16px);
		}
	}

	.main {
		text-align: center;
		padding-top: 240rpx;
		// padding-top: 148rpx;

		.user-header {
			position: relative;
			height: 412rpx;
			width: 412rpx;
			margin: 0 auto;

			.sex {
				position: absolute;
				bottom: 22rpx;
				right: 22rpx;
				width: 64rpx;
				height: 64rpx;
				z-index: 11;
				image {
					padding: 16rpx;
					width: 32rpx;
					height: 32rpx;
					border-radius: $uni-border-radius-circle;
				}
			}

			.user-img {
				top: 0;
				z-index: 10;
				width: 400rpx;
				height: 400rpx;
				border: 6rpx solid #FFFFFF;
				border-radius: 48rpx;
				box-shadow: 0rpx 36rpx 40rpx 0rpx rgba(39,40,50,0.1);
			}
		}
		.user-imf{
			padding-top: 42rpx;
			.name{
				font-size: 	52rpx;
				color: $uni-text-color;
				line-height: 74rpx;
			}
			.nick{
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color: $uni-text-color;
			}
			.intr{
				width: 512rpx;
				font-size: $uni-font-size-base;
				font-weight: 300;
				line-height: 48rpx;
				padding: 20rpx 0;
				margin: 0 auto;
			}
		}

	}
	.buttom-bar{
		.bottom-btn{
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}
	}
	
	// .buttom-bar{
	// 	position: fixed;
	// 	bottom: 0;
	// 	width: 100%;
	// 	height: 104rpx;
	// 	padding: 12rpx $uni-spacing-row-base;
	// 	box-sizing: border-box;
	// 	.bottom-btn{
	// 		background: $uni-color-primary;
	// 		border-radius: $uni-border-radius-sm;
	// 		height: 80rpx;
	// 		width: 684rpx;
	// 		text-align: center;
	// 		line-height: 80rpx;
	// 		font-size: $uni-font-size-lg;
	//      margin: 0 $uni-spacing-col-base;
	// 	}
	// }
	
	.add-misg{
		width: 100%;
		position: fixed;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
		
		padding: 0 56rpx;
		box-sizing: border-box;
		.name{
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
			padding: 168rpx 0 40rpx;
		}
		.add-main{
			width: 100%;
			height: 420rpx;
			box-sizing: border-box;
			background-color: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			padding: 18rpx 22rpx;
			font-size: 32rpx;
			line-height: 44rpx;
			color: $uni-text-color;
		}
	}
	.add-btn{
		z-index: 100;
		bottom: -104rpx;
		display: flex;
		.close{
			margin-left:$uni-spacing-row-base ;
			width: 172rpx;
			background-color: $uni-bg-color-hover;
		}
		.send{
			margin:0 $uni-spacing-row-base;
			background: $uni-color-primary;
			flex: auto;
		}
	}
</style>
