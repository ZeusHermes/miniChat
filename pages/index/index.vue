<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src='../../static/images/img/four.png'></image>
			</view>
			<view class="top-bar-center">
				<image class='logo' src='../../static/images/index/logo.png'></image>
			</view>
			<view class="top-bar-right">
				<view class='search'>
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
						<text class="tip">{{item.tip}}</text>
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
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: var(--status-bar-height);
		padding-bottom: $uni-spacing-col-base;
	}

	.top-bar {
		width: 100%;
		position: fixed;
		padding-top: var(--status-bar-height);
		top: 0;
		left: 0;
		height: 88rpx;
		box-sizing: border-box;
		background-color: $uni-bg-color;
		border-bottom: 1rpx solid $uni-border-color;
		// box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0, 0, 0, 1);
		// padding-left: $uni-spacing-row-base;


		.top-bar-left {
			float: left;
			padding-left: $uni-spacing-row-base;

			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
				margin-top: 10rpx;
			}
		}

		.top-bar-center {
			position: absolute;
			text-align: center;
			left: 0;
			right: 0;
			top: 0;
			margin: auto;
			bottom: 0;

			.logo {
				width: 88rpx;
				height: 42rpx;
				padding-top: 19rpx;
			}
		}

		.top-bar-right {
			float: right;
			padding-right: 14rpx;

			.search {
				width: 88rpx;
				height: 88rpx;
				display: inline-block;
			}

			.add {
				width: 88rpx;
				height: 88rpx;
				display: inline-block;
			}

			image {
				padding: 18rpx 0 0 18rpx;
				width: 52rpx;
				height: 52rpx;
			}
		}
	}

	.main {
		padding-top: 104rpx;
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
