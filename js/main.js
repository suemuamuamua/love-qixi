var container=$('#content')
var element=container.find(':first')//第一个子元素
var slides=element.find('>')//element元素下的所有子元素
var stars=$('.stars')
var star=$('.star')
var width=container.width()
var height=container.height()
var $boy=$('#boy')
var $girl=$('#girl')
var $bird=$('.bird')
var $snow=$('.snow')
var flowers=[]
var bornFlowers = []
//舞台居中
container.css({
	left: (document.body.clientWidth-width)/2,
	top: (document.body.clientHeight-height)/2
})
//父容器为三倍宽度
element.css({
	width: (slides.length*width)+'px',
	height: height+'px'
})
//设置每一个页面的宽度
$.each(slides,function(index){
	var slide=slides.eq(index)
	slide.css({
		width:width+'px',
		height:height+'px'
	})
})
// 小男孩的初始位置函数
var boyPosition = (function(){
	// 设置男孩距离底部的位置
	$boy.css({
		top: height * 0.82 - $boy.height() + 'px'
	})

})();

// 小女孩的初始位置函数
var girlPosition = (function(){
	// 设置女距离底部的位置
	$girl.css({
		top: height * 0.72 - $girl.height() + 'px'
	})
})();

//设定星星的位置、大小
$.each(star,function(index){
	var starItem=star.eq(index)
	var itemWidth=Math.round(Math.random()*20+10)
	var itemLeft=Math.round(Math.random()*100)
	var itemTop=Math.round(Math.random()*100)
	if(itemLeft>32&&itemLeft<64){
		itemLeft=(itemLeft-16)>0?32:64
	}
	var rotateDeg=Math.round(Math.random()*10+20)
	starItem.css({
		width: itemWidth+'px',
		height: itemWidth,
		left: itemLeft+'%',
		top: itemTop+'%',
		transform: 'rotate('+rotateDeg+'deg)',
		animation: 'blingbling '+Math.round(Math.random()*2+2)+'s linear infinite'
	})
})
//男孩走路过渡函数
function boyMoveTo(x,y,time){
	$boy.css({
		"transitionDuration":time+'ms',
		"transitionTimingFunction":"linear",
		"left": x+'px',
		"top": y+'px'
	})
}
//男孩走路
function boyWalk(){
	$boy.removeClass('walk-pause')
	$boy.addClass('slowWalk')
}
//男孩停止走路
function stopWalk(){
	$boy.addClass('walk-pause')
}
//shop开门
function openDoor(){
	$(".door-left").addClass("openLeft")
	$(".door-right").addClass("openRight")
}
function closeDoor(){
	$(".door-left").removeClass("openLeft")
	$(".door-right").removeClass("openRight")
}

function lampBright(){
	$("#secondScreen").addClass('lamp-bright')
}
function lampDark(){
	$("#secondScreen").removeClass('lamp-bright')
}
function walkWithFlower(){
	$boy.removeClass('slowWalk')
	$boy.addClass("walkWithFlower")
}
//进入商店
function shopIn () {
	//停止走路，商店开门
	stopWalk();
	openDoor();
	//切换店铺背景图（灯），走进店内
	setTimeout(function(){
		lampBright();
		boyWalk();
		$boy.css({
			"transform":"scale(.3,.3)",
			"opacity":"0"
		})
	},2000)
	//男孩走出店铺，小鸟开始运动
	setTimeout(function () {
		$boy.css({
			"backgroundPostion":"-150px -0px",
			"transform":"scale(1,1)",
			"opacity":"1"
		})
		$bird.css({
			"left":"-91px",
			"transitionDuration":'6000ms',
			"transitionTimingFunction":"linear"
		})
		//男孩拿着花走
		walkWithFlower()
	},5000)
	//关门，切换店铺背景（灯）
	setTimeout(function(){
		closeDoor()
		lampDark()
	},7000)
}
//屏幕横向滚动函数
function screenScrollTo(x,time,delay){
	element.css({
		"transitionDuration":time+'ms',
		"transitionDelay":delay+'ms',
		"transitionTimingFunction":"linear",
		"left":-x+'px'
	})
}
//转身函数
function turn(){
	$boy.removeClass("walkWithFlower")
	$boy.removeClass("walk-pause")
	$boy.addClass('boy-turn')
	$girl.addClass('girl-turn')
}
// 飘花瓣
//创建每个花瓣
function createSnow() {
	return $('<div class="snow-item"></div>').css({
		position: 'absolute',
		left: Math.round(Math.random()*60)+'%',
		top: -42+'px',
		width: 42+'px',
		height: 42+'px',
		background: 'url(./images/snowflake/snowflake'+Math.round(Math.random()*5+1)+'.png) no-repeat center center',//6张图片随机生成
		backgroundSize: 'cover',
		opacity: Math.random()*0.5+0.4,
		transitionProperty: 'all',
		transitionDuration: Math.round(Math.random()*5+3)+'s'//雪花飘落时间3到8s
	})
}
//飘花瓣函数
function snow() {
	setInterval(function(){
		var snowItem = createSnow()
		$snow.append(snowItem)
		setTimeout(function(){
			snowItem.css({
				left:  Math.round(Math.random()*60+30)+'%',
				top: 598+'px',
				opacity: Math.random()*0.5+0.4
			})
		}, 100)
		//十秒之后消除该花瓣
		setTimeout(function(){
			snowItem.remove()
		},10000)
	},300)
}
//播放音乐
function playMusic() {
	$('.audio')[0].play()
	setTimeout(function(){
		$('.audio')[0].pause();
		$('.audio')[1].play();
	},25000)
}

window.onload = function(){
//document.ready是在文档结构加载完成后执行，window.onload则是在所有资源加载之后执行（包括图片）
	playMusic()
	//第一屏
	boyWalk();
	boyMoveTo(width/2,$boy.css("top"),3000)
	//第二屏
	screenScrollTo(width,4000,3000)
	setTimeout(shopIn,7000)
	//第三屏
	setTimeout(function(){
		screenScrollTo(width*2,4000,0)
		boyMoveTo(width*0.13,$boy.css("top"),4000)		
	},15000)
	//男孩走上桥
	setTimeout(function(){
		boyMoveTo(width*0.32,height*0.265,2500);
	},19000)
	//男孩走向女孩
	setTimeout(function(){
		boyMoveTo(width*0.4,height*0.265,1500);
	},21000)
	//相遇，转身
	setTimeout(function () {
		stopWalk()
		turn()
	},23000)
	//弹出slogan，开始飘雪
	setTimeout(function(){
		snow()
		$('.slogan').addClass('in')
	},25000)
}


