<template>
	<view class="">
		<view class="submit">
			<view class="subnit-chat">
				<view class="bt-img" @tap="record">
					<image :src="toc" mode=""></image>
				</view>
				<textarea value="" class="chat-send btn" v-if="!isrecord" v-model="msg" @input="inputs" auto-height="true"
				 placeholder="" @focus="focushidden" />
				<view class="record btn" v-if="isrecord"  @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
					按住说话
				</view>
				<view class="bt-img" @tap="emoj">
					<image src="../../static/images/submit/bq.png" mode=""></image>
				</view>
				<view class="bt-img" @tap="more">
					<image src="../../static/images/submit/tj.png" mode=""></image>
				</view>
			</view>
			<view class="emoj" v-if="isEmoj">
				<view class="emoji-send">
					<view class="emoji-send-det" @tap="backSpace">
						<image src="../../static/images/submit/back.png" mode=""></image>
					</view>
					<view class="emoji-send-btn" @tap="emojiSend">
						发送
					</view>
				</view>
				<emoji @sendEmoji="sendEmoji" :emojiheight="260"></emoji> 
			</view>
			<view class="more" v-if="isMore">
				<view class="more-list" @tap="sendImg('album')">
					<image src="../../static/images/submit/zp.png" mode=""></image>
					<view class="more-list-title">
						图片
					</view>
				</view>
				<view class="more-list" @tap="sendImg('camera')">
					<image src="../../static/images/submit/pz.png" mode=""></image>
					<view class="more-list-title">
						拍照
					</view>
				</view>
				<view class="more-list" @tap="chooseMap">
					<image src="../../static/images/submit/dw.png" mode=""></image>
					<view class="more-list-title">
						定位
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/sp.png" mode=""></image>
					<view class="more-list-title">
						视频
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/images/submit/wj.png" mode=""></image>
					<view class="more-list-title">
						文件
					</view>
				</view>
			</view>
		</view>
		<view class="voice-bg" v-if="voicebg">
			<view class="voice-bg-length">
				<view class="voice-bg-time" :style="{width:timeLength/0.6+'%'}">
					{{timeLength}}"
				</view>
			</view>
			<view class="voice-del">
				上滑取消语音
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from '../emoji/emoji.vue'
	const recorderManager = uni.getRecorderManager();
	export default {
		data() {
			return {
				isrecord:false,
				isEmoj:false,
				isMore:false,
				voicebg:false,
				msg:'',
				timer:null,
				voicePath:null,
				timeLength:0,
				pageY:0,
				toc:'../../static/images/submit/yuy.png'
			};
		},
		components:{
			emoji
		},
		methods:{
			// 获取元素高度
			getElementHetght(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('setListBottom',data.height)
				}).exec();
			},
			// 切换语音
			record(){
				this.isEmoj=false
				this.isMore=false
				setTimeout(()=>{
					this.getElementHetght()
				},10)
				if(this.isrecord){
					this.isrecord = false
					this.toc='../../static/images/submit/yuy.png'
				}else{
					this.isrecord = true
					// 文字图标未更换
					this.toc='../../static/images/submit/jp.png'
				}
			},
			// 表情
			emoj(){
				this.isEmoj = !this.isEmoj
				this.isMore = false
				this.isrecord = false
				this.toc='../../static/images/submit/yuy.png'
				setTimeout(()=>{
					this.getElementHetght()
				},10)
			},
			inputs(e){
				let chatm = e.detail.value;
				let pos = chatm.indexOf('\n')
				if(pos!==-1&&chatm.trim().length>0){
					// 发送消息
					this.msg = ''
					this.send(chatm,0)
				}else{
				}
			},
			sendEmoji(data){
				this.msg = this.msg +data
			},
			emojiSend(){
				if(this.msg.trim().length>0){
					this.send(this.msg,0)
					// 发送消息
					this.msg = ''
				}else{
				}
			},
			backSpace(){
				if(this.msg.trim().length > 0){
					// 删除表情有问题
					this.msg = this.msg.substring(this.msg.length-1,1)
				}
			},
			// 输入狂聚焦
			focushidden(){
				this.isEmoj = false
				this.isMore = false
				setTimeout(()=>{
					this.getElementHetght()
				},10)
			},
			send(msg,type){
				this.$emit('sendMsg',{msg,type})
			},
			// 更多
			more(){
				this.isMore = !this.isMore
				this.isEmoj = false
				this.isrecord = false
				this.toc='../../static/images/submit/yuy.png'
				setTimeout(()=>{
					this.getElementHetght()
				},10)
			},
			//图片发送
			sendImg(data){
				let _this =this
				let count = 9
				if(data==='camera'){
					count=1
				}
				uni.chooseImage({
				    count: count, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [data], //从相册选择
				    success: function (res) {
						let tempFilePaths =res.tempFilePaths
				       for(let i=0;i<tempFilePaths.length;i++){
						   _this.send(tempFilePaths[i],1)
					   }
				    }
				});
			},
			// 音频处理
			touchstart(e){
				this.pageY=e.changedTouches[0].pageY
				this.voicebg = true
				let i = 0
				this.timer = setInterval(()=>{
					i++
					this.timeLength = i
					console.log(i)
					if(i>60){
						clearInterval(this.timer)
						this.touchend()
					}
				},1000)
				recorderManager.start();
				// 音频处理
			},
			touchend(){
				this.timeLength=0
				this.voicebg = false
				let _this = this
				clearInterval(this.timer)
				 recorderManager.stop();
				 recorderManager.onStop(function (res) {
					 let msg = {
						 voice:res.tempFilePath,
						 time:this.timeLength
					 }
					if(this.voicebg){
						_this.send(msg,2)
					}
				});
				this.voicebg = false
			},
			// 终止录音
			touchmove(e){
				if(this.pageY - e.changedTouches[0].pageY>100){
					this.voicebg = false
				}
			},
			chooseMap(){
				let data = null
				let _this= this
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
						data={
							name:res.name,
							address:res.address,
							latitude:res.latitude,
							longitude:res.longitude
						}
						_this.send(data,3)
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
.submit{
	background: rgba(244,244,244,0.96);
	border-top: 2rpx solid $uni-border-color;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 10002;
	padding-bottom: env(safe-area-inset-bottom);
}
.subnit-chat{
	width: 100%;
	display: flex;
	align-items: flex-end;
	box-sizing: border-box;
	padding: 14rpx 14rpx;
	image{
		width: 56rpx;
		height: 56rpx;
		margin: 0 10rpx;
		flex: auto;
	}
	.btn{
		flex: auto;
		background-color: #FFF;
		border-radius: 10rpx;
		padding: 20rpx;
		max-height: 160rpx;
		margin: 0 10rpx;
	}
	.chat-send{
		line-height: 44rpx;
	}
	.record{
		line-height: 44rpx;
		text-align:center;
		font-size: $uni-font-size-lg;
		color: $uni-text-color-grey;
	}
	
}
.emoj{
		width: 100%;
		height: 460rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0rpx -1rpx 0 0 rgba(0,0,0,0.1);
		.emoji-send{
			width: 260rpx;
			height: 104rpx;
			background: #999;
			padding-top: 24rpx;
			background-color: rgba(236,237,237,0.9);
			position: fixed;
			right: 0;
			bottom: env(safe-area-inset-bottom);
			display: flex;
			.emoji-send-btn{
				flex: 1;
				margin: 0 32rpx 0 20rpx;
				width: 120rpx;
				height: 88rpx;
				background-color: rgba(255,228,49,1);
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 12rpx;
			}
			.emoji-send-det{
				flex: 1;
				margin-left: 32rpx;
				width: 120rpx;
				height: 88rpx;
				font-size: 32rpx;
				text-align: center;
				background: #FFF;
				line-height: 80rpx;
				border-radius: 12rpx;
				line-height: 80rpx;
				image{
					padding-top:14rpx ;
					width: 60rpx;
					height: 60rpx;
				}
			}
			
		}
	}
	.more{
		width: 100%;
		height: 436rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0rpx -1rpx 0 0 rgba(0,0,0,0.1);
		bottom:env(safe-area-inset-bottom); 
		box-sizing: border-box;
		padding: 8rpx 20rpx;
		.more-list{
			width: 25%;
			text-align: center;
			float: left;
			padding-top: 32rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background-color: rgba(255,255,255,1);
				border-radius: 24rpx;
			}
			.more-list-title{
				font-size: 24rpx;
				color: rgba(39,40,50,0.5);
				line-height: 34rpx;
			}
		}
		
	}
	.voice-bg{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1000;
		.voice-bg-length{
			height: 84rpx;
			width: 600rpx;
			margin: auto;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(255,255,255,0.2);
			border-radius: 42rpx;
			text-align: center;
			.voice-bg-time{
				line-height: 84rpx;
				background-color: $uni-color-primary;
				border-radius: 42rpx;
				min-width: 120rpx;
				display: inline-block;
			}
		}
		.voice-del{
			position: absolute;
			bottom: 148rpx;
			width: 100%;
			text-align: center;
			color: #FFF;
			margin-bottom:env(safe-area-inset-bottom);
			font-size: $uni-font-size-base;
		}
	}
</style>
