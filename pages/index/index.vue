<template>
	<view class="content">
		<view class="top-bar">
			<!-- 跳转有问题 -->
			<navigator url="../userhome/userhome?id=11111" class="top-bar-left">
				<image src='../../static/images/img/four.png'></image>
			</navigator>
			<view class="top-bar-center">
				<image class='logo' src='../../static/images/index/logo.png'></image>
			</view>
			<view class="top-bar-right">
				<view class='search' @tap="toSearch">
					<image src="../../static/images/index/search.png"></image>
				</view>
				<view class='add'>
					<image src="../../static/images/index/add.png"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="applay">
				<view class="friend-list">
					<view class="friend-list-l">
						<text class="tip">1</text>
						<image src="../../static/images/index/apply.png" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">
								好友申请
							</view>
							<view class="time">
								13：45
							</view>
						</view>
						<view class="news">
							安徽关于我国安徽哇一个月
						</view>
					</view>
				</view>
			</view>
			<view class="friends">
				<view class="friend-list" v-for="(item,index) in friends" :key="item.id">
					<view class="friend-list-l">
						<text class="tip">{{item.tip>99?'99+':item.tip}}</text>
						<image :src="'../../static/images/img/'+item.imgurl" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">
								{{item.name}}
							</view>
							<view class="time">
								{{getDateTime(item.time)}}
							</view>
						</view>
						<view class="news">
							{{item.news}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import getDate from '../../commons/js/myFun.js'
	export default {
		data() {
			return {
				friends: []
			}
		},
		onLoad() {
			this.getFriends()
		},
		methods: {
			getDateTime(date) {
				return getDate.dataTime(date)
			},
			getFriends() {
				this.friends = datas.friends()
				console.log(this.friends)
			},
			toSearch() {
				uni.navigateTo({
					url: '../search/search'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	// .content {
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// 	padding-top: var(--status-bar-height);

	// }
	.top-bar-right {
		.image {
			padding: 18rpx 0 0 18rpx;
			width: 52rpx;
			height: 52rpx;
		}
	}

	.top-bar {
		border-bottom: 1rpx solid $uni-border-color;
		background: rgba(255, 255, 255, 0.96);
	}

	.main {
		padding-top: 104rpx;
		padding-bottom: $uni-spacing-col-base;
	}

	.friend-list {
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;

		&:active {
			background-color: $uni-bg-color-grey;
		}

		.friend-list-l {
			position: relative;
			float: left;

			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
			}

			.tip {
				position: absolute;
				z-index: 10;
				top: -6rpx;
				left: 68rpx;
				height: 36rpx;
				min-width: 36rpx;
				background: $uni-color-warning;
				border-radius: $uni-border-radius-circle;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}
		}

		.friend-list-r {
			padding-left: 128rpx;

			.top {
				height: 50rpx;

				.name {
					float: left;
					font-size: 36rpx;
					font-weight: 400;
					color: $uni-text-color;
					line-height: 50rpx;
				}

				.time {
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}
		}

		.news {
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}
</style>
