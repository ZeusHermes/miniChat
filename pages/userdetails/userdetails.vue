<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-center title">
				详情
			</view>
			<view class="top-bar-right pic">

			</view>
		</view>
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">
						头像
					</view>
					<view class="user-head">
						<image :src="imgurl" class="user-img" mode=""></image>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row">
					<view class="title">

					</view>
					<view class="cont">
						<image :src="imgurl" class="user-img" mode=""></image>
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
				<view class="row">
					<view class="title">
						签名
					</view>
					<view class="cont">
						哇哈哈哈哈哈哈哈五擦你百合v哦阿娇都
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
						2020-10-01 20：30：59
					</view>
					<view class="more">
						<image src="../../static/images/common/more.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgurl: "../../static/images/img/three.png"
			}
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
		padding-top: 118rpx;
		display: flex;
		flex-direction: column;
		.column{
			display: flex;
			flex-direction: column;
			.row{
				display: flex;
				flex-direction: row;
			}
			
			.title{
				flex: none;
				padding:0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color:$uni-text-color;
				line-height: 112rpx;
			}
			.head{
				height: 148rpx;
				display: flex;
				align-items: center;
			}
			.user-img{
				margin-top: 22rpx;
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
			}
			.cont{
				flex: auto;
				font-size: $uni-font-size-lg;
				color:$uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.more{
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;
				image{
					width: 80rpx;
					height: 28rpx;
				}
			}
		}
	}
</style>
