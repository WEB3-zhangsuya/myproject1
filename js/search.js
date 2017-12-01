var ch;  //窗体可视高度
var sh;  //窗体总高度
var st;  //滚动条位置，从0开始
var p = 1;  //表示第一页
var isloaded = false;  //表示是否加载成功
var music = new Audio(); //表示全局音乐播放器
//歌词API
//http://m.kugou.com/app/i/krc.php?cmd=100&hash=59eec98e433a77ab5a85167dede645ca&timelength=3434

//1.网页加载成功后，给搜索按钮赋事件
window.onload = function(){
  ch = document.documentElement.clientHeight;
  sh = document.documentElement.scrollHeight;
  st = document.documentElement.scrollTop;

  searchbtn.onclick = function(){ 
    loaddata(true);
  };
 
  playbtn.onclick = function() {
    
          var img = this.src;
    
          if (img == this.src) {
              music.pause();
              this.src = "C:/Users/Administrator/Desktop/myMusic/images/播放.png";
          }
          if (img == this.src) {
    
              music.play();
              this.src = "C:/Users/Administrator/Desktop/myMusic/images/暂停.png";
          }
    
      }; 
      bigplayBtn.onclick = function() {
        
              var image = this.src;
        
              if (image == this.src) {
                  music.pause();
                  this.src = "C:/Users/Administrator/Desktop/myMusic/images/play_play.png";
              }
              if (image == this.src) {
        
                  music.play();
                  this.src = "C:/Users/Administrator/Desktop/myMusic/images/play_pause.png";
              }
        
          };      
      minfo.onclick = function(){
        ctrlbtn.style.display = "none";
        cnt.style.display = "none";
        playPage.style.display = "block";
        songTitle.innerHTML = mname.innerHTML;
      }
      back.onclick = function(){
        playPage.style.display = "none";
        cnt.style.display = "block";
        ctrlbtn.style.display = "block";        
      }

      kw.onkeyup = function(e){
        console.log(1);
        searchbtn.style.backgroundColor = "#fd31fd";
        searchbtn.style.color = "#ffffff";
      }
};

//2.当网页滚动时，触发事件
window.onscroll = function(){
  if(isloaded){
    st = document.body.scrollTop||document.documentElement.scrollTop;
    sh = document.body.scrollHeight||document.documentElement.scrollHeight;
    //debug.innerHTML = st+" "+ch+" "+sh; 
    console.log(st+" "+ch+" "+sh);
    console.log(st+ch==sh);
    //滚动条到底了
    if(st+ch==sh){
      $("#loading").show();
      p++;
    //为了降低服务器压力，延迟2秒执行请求
      setTimeout(loaddata,2000);
    }
  }
};

//3.加载远程数据函数
//qingkong参数，传递true则表示要清空musiclist层的内容；
//不传或传递false，表示不清空
function loaddata(qingkong){
 //下面的函数是jquery的ajax函数，专门用来发送Ajax请求
 //这个函数有两个重要参数
 //1.是请求地址，该地址是一个跨域地址，在该地址中我们使用
 //callback=getdata来指明获取数据后前端用什么函数来接受服务
 //发送过来的数据
 //2.是dataType:jsonp,这个是指明实现跨域请求
 if(qingkong){
    $("#musiclist").empty();
 }

 var musicurl = "http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword="+$("#kw").val()+"&page="+p+"&pagesize=20&showtype=1";

 $.ajax({
   url: musicurl,
   dataType: 'jsonp',
   success:function(data){
     getdata(data);
   }
 });

}

//4.这个函数用来处理服务发送过来的数据
function getdata(data){
  console.log(data);
  for (var i = 0; i < data.data.info.length; i++) {
    var m = data.data.info[i];
    console.log(m);
    //创建一个jquery对象
    var $mdiv = $("<div class=\"music\"></div>");
    //给这个对象设置新的属性hash,可以用它来获取音乐地址
    $mdiv.attr("hash",m.hash);
    //给该元素设置内容
    var $filename = $("<div class=\"filename\"></div>");
    var $download = $("<a class=\"download\" href=\"\" download=\""+m.filename+"\"></a>");
    var $singername = $("<span class=\"singername\">"+m.singername+"</span>");
    var $songname = $("<span class=\"songname\">"+m.songname+"</span>");
    var $gang = $("<span class=\"gang\"> - </span>");
    $filename.append($singername);
    $filename.append($gang);
    $filename.append($songname);
    $mdiv.append($filename);
    $mdiv.append($download);

    getsonginfo($mdiv);

    //给该元素附加单击事件
    // var musicmenu = document.getElementsByClassName("music");
    // for(var n = 0;n<musicmenu.length;n++){
    //   var index = n;
    //   console.log(n);
    // }
    $mdiv.each(function(index){
      // alert(index);
    $mdiv.click(function(index){
      // alert(index);
    //当单击歌曲名称时，发起第二个ajax请求，获取音乐地址
      music.src = $(this).find("a").attr("href");
      music.play();
      $("#ctrlbtn").show();
      // pic.src ="C:/Users/Administrator/Desktop/myMusic/images/"+pics[(Math.floor(Math.random()*4))];
      $("#mname").html($(this).find(".songname").html());
      $("#pname").html($(this).find(".singername").html());
      $("#playbtn").attr("src","C:/Users/Administrator/Desktop/myMusic/images/暂停.png");
    });
  })

    $("#musiclist").append($mdiv);
   }
      
   isloaded = true;
   $("#loading").hide();
}

//5.获得音乐地址并播放
function getsonginfo($musicdiv){
   var songurl = "http://m.kugou.com/app/i/getSongInfo.php?hash="+$musicdiv.attr("hash")+"&cmd=playInfo&format=jsonp";
   var finalurl;

   $.ajax({
        url: songurl ,
        dataType: 'jsonp',
        success:function(data){
          finalurl = getsongurl(data);
          $musicdiv.find("a").attr("href",finalurl);
        }
   });
}



//6.获得图片地址
function getkrc($krcdiv){

  $.ajax({
       url: "http://m.kugou.com/app/i/krc.php?hash="+$krcdiv.attr("hash")+"&timelength=1" ,
       dataType: 'jsonp',
      //  success:function(data){
      //    finalurl = getsongurl(data);
      //    $musicdiv.find("a").attr("href",finalurl);
      //  }
       success:function(data){
        getdata(data);
      }
  });
}

//7.播放音乐
function getsongurl(data){
   return data.url;
}









