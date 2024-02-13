



var index=0;//初始化索引
var li=document.querySelectorAll(".banner ul li");//获取所有li元素
var img=document.querySelectorAll(".music .m_img img");//播放器img元素
var text=document.querySelectorAll(".music .m_text");//获取播放器m_text元素
var prev=document.querySelector(".music .m_btn .m_prev");//获取播放器上一首a元素按钮
var play=document.querySelector(".music .m_btn .m_play");//获取播放器暂停/播放a元素按钮
var next=document.querySelector(".music .m_btn .m_next");//获取播放器下一首a元素按钮
var mp3=document.querySelectorAll(".music .m_mp3");//媒体元素
var m_close=document.querySelector(".m_close");//获取播放器关闭按钮
var flag=false;//歌曲是否播放，true播放，false暂停
var close=true;//播放器是否显示，true显示，false隐藏
var sflag=-1,eflag=-1;//sflag是当前将要开始播放的歌曲的下标index+1，eflag是将要被替代的歌曲index+1
var songNum=5;//歌曲总数
var saudio=null,eaudio=null;//sflag是当前将要开始播放的歌曲，eflag是将要被替代的歌曲


li.forEach(function(element, index) {
    element.addEventListener("click", function() {
        //console.log("The index of the clicked image is", index);

        //播放歌曲
        show(index);
    });
});
function show(index){
     //更换背景图片+1
     Change_img_text(index)//改变音乐相关图片以及名称
     remove_play()//移除播放键
     add_pause()//添加暂停键
     img_rotate()//图片旋转与停止
     playmp3()
}
/*播放暂停*/
play.addEventListener("click", function(){
    if(eflag===-1)//为刚打开网页的状态
    {
        show(0)
        console.log(2);
    }
    else
    {
        if(flag===false)//处于暂停状态---》将音乐播放
        {
            saudio.play();
            img_rotate_start();
            flag=true;
            remove_play()//移除播放键
            add_pause()//添加暂停键
            play=document.querySelector(".music .m_btn2 .m_pause");
            console.log("暂停到播放");
        }  
        else//处于播放状态---》将音乐暂停
        {
            saudio.pause();
            img_rotate_quit();
            flag=false;
            remove_pause()//移除暂停键
            add_play()//添加播放键
            play=document.querySelector(".music .m_btn1 .m_play");
            console.log("播放到暂停");
        }
    }
  
});
prev.addEventListener("click", function(){
    if(eflag===-1)//为刚打开网页的状态
    {
        show(songNum-1)
    }
    else
    {
        show((sflag-2+songNum)%songNum);
    }
    // console.log(1);
})
next.addEventListener("click", function(){
    if(eflag===-1)//为刚打开网页的状态
    {
        show(1)
    }
    else
    {
       show((sflag+songNum)%songNum); 
    }
    // console.log(2);
})
m_close.addEventListener("click", function(){
    if(close===true)
    {
        m_close.className="m_open";
        document.querySelector(".music").className="music move_left";
        close=false;
    }
    else
    {
        m_close.className="m_close";
        document.querySelector(".music").className="music move_right";
        close=true;
    }
})

function Change_img_text(index){
    switch(index)
    {
        case 0:document.querySelector("body").style.backgroundImage="url('img/1_bg.jpg')";//设置body背景
               document.querySelector("body").style.backgroundRepeat="no-repeat";//图片不重复，下同
               document.querySelector("body").style.backgroundSize="cover";//自适应，下同
               document.querySelector(".music .m_img img").src="img/1.jpg";//设置播放器图片，下同
               document.querySelector(".music .m_img img").title="龙卷风-邓紫棋";//设置title，下同
               document.querySelector(".music .m_text").textContent="龙卷风-邓紫棋";//设置播放器文本，下同
               sflag=1;//设置将要播放的音乐的标记index+1，下同
        break;
        case 1:document.querySelector("body").style.backgroundImage="url('img/2_bg.jpg')";
               document.querySelector("body").style.backgroundRepeat="no-repeat";/*图片不重复*/
               document.querySelector("body").style.backgroundSize="cover";/*自适应*/
               document.querySelector(".music .m_img img").src="img/2.jpg";
               document.querySelector(".music .m_img img").title="Sober-bigbang";
               document.querySelector(".music .m_text").textContent="Sober-bigbang";
               sflag=2;
        break;
        case 2:document.querySelector("body").style.backgroundImage="url('img/3_bg.jpg')";
               document.querySelector("body").style.backgroundRepeat="no-repeat";/*图片不重复*/
               //document.querySelector("body").style.backgroundSize="cover";/*自适应*/
               document.querySelector(".music .m_img img").src="img/3.jpg";
               document.querySelector(".music .m_img img").title="绅士-薛之谦";
               document.querySelector(".music .m_text").textContent="绅士-薛之谦";
               sflag=3;
        break;
        case 3:document.querySelector("body").style.backgroundImage="url('img/4_bg.jpg')";
               document.querySelector("body").style.backgroundRepeat="no-repeat";/*图片不重复*/
               document.querySelector("body").style.backgroundSize="cover";/*自适应*/
               document.querySelector(".music .m_img img").src="img/4.jpg";
               document.querySelector(".music .m_img img").title="杀手-林俊杰";
               document.querySelector(".music .m_text").textContent="杀手-林俊杰";
               sflag=4;
        break;
        case 4:document.querySelector("body").style.backgroundImage="url('img/5_bg.jpg')";
               document.querySelector("body").style.backgroundRepeat="no-repeat";/*图片不重复*/
               document.querySelector("body").style.backgroundSize="cover";/*自适应*/
               document.querySelector(".music .m_img img").src="img/5.jpg";
               document.querySelector(".music .m_img img").title="baby-justin bieber";
               document.querySelector(".music .m_text").textContent="baby-justin bieber";
               sflag=5;
        break;

    }

}

function remove_play()//移除播放按钮
{
    document.querySelector("#b2").className="";
}
function add_play()//添加播放按钮
{
    document.querySelector("#b2").className="m_play btn1";
    flag=false;
}
function remove_pause()//移除暂停按钮
{
    document.querySelector("#b2").className="";
}
function add_pause()//添加暂停按钮
{
    document.querySelector("#b2").className="m_pause btn2";
    flag=true;
}
function img_rotate()//图片旋转
{
    if(eflag!==-1)//若有正在旋转的图片就停止
    {
        document.querySelector("#img"+eflag).className="img"+eflag+" img";
    }
    document.querySelector("#img"+sflag).className="img"+sflag+" img img_rotate";//使将要播放的音乐的图片旋转
    eflag=sflag;
}
function img_rotate_quit()
{
    document.querySelector("#img"+sflag).className="img"+sflag+" img";//使正在旋转的图片停止
}
function img_rotate_start()
{

    document.querySelector("#img"+sflag).className="img"+sflag+" img img_rotate";//使要播放的音乐的图片旋转
}
function playmp3(){
    if(eaudio!==null)//若有正在播放的音乐就停止
    {
        eaudio.pause();//暂停当前正在音乐
        eaudio.currentTime = 0;//播放时间置为0
    }
    var s=document.querySelector("#img"+sflag).getAttribute("datasrc");//获取将要播放音乐的url
    saudio=new Audio(s);//创建一个saudio对象
    saudio.play();//播放音乐
    flag=true;//正在播放
    eaudio=saudio;//修改标志
}


