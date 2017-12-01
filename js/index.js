var music = new Audio();
var pics=["pic1.jpg","pic2.jpg","pic3.jpg","pic4.jpg"]
var musics = ["赵鑫-许多年以后","张靓颖-我的梦","雨宗林-别把疼你的人弄丢了","田馥甄-小幸运","孙子涵-回忆那么伤","梦然-没有你陪伴真的好孤单","筷子兄弟-小苹果","岑宁儿-追光者","MC天佑-一人饮酒醉","JC-说散就散","Delacey-Dream It Possible","魏新雨-恋人心"];
var i = 0;
window.onload = function(){

  // var deviceWidth = document.documentElement.clientWidth;
  // if(deviceWidth > 414) deviceWidth = 414;
  //   document.documentElement.style.fontSize = 	deviceWidth / 3.75 + 'px';



  var musicos = document.getElementsByClassName("musico");
  for(var i=0;i<musicos.length;i++){
    var m = musicos[i];
    m.index = i;
    m.onclick = function(){
      i = this.index;
      // alert(this.innerText);
      music.src =this.innerText + ".mp3";
      music.play();
      ctrlbtn.style.display = "block";
      cnt.style.marginBottom ="0.7rem";
      pic.src ="images/"+pics[(Math.floor(Math.random()*4))];
      mname.innerHTML=this.firstElementChild.lastElementChild.innerText;
      pname.innerText=this.firstElementChild.firstElementChild.innerText;
      playbtn.src="images/暂停.png"
    };
  }

 
  playbtn.onclick = function() {

        var img = this.src;
 
        if (img == this.src) {
            music.pause();
            this.src = "images/播放.png";
        }
        if (img == this.src) {

            music.play();
            this.src = "images/暂停.png";
        }

    };



  nextbtn.onclick = function(){
    if(i>=musics.length-1){
      i = 0;
    }else{
      i++;
    }    
    music.src =musics[i] + ".mp3";
    music.play(); 
    playbtn.src = "images/暂停.png";
    pic.src ="images/"+pics[(Math.floor(Math.random()*4))];
    mname.innerHTML=musicos[i].firstElementChild.lastElementChild.innerText;
    pname.innerText=musicos[i].firstElementChild.firstElementChild.innerText;
  } 
};

download.onclick = function(){
  alert("下载成功！")
}
downbtn.onclick = function(){
  blackCover.style.display = "block";
  downAlert.style.display = "block";
}
cancle.onclick = function(){
  blackCover.style.display = "none";
  downAlert.style.display = "none"; 
}
conform.onclick = function(){
  // blackCover.style.display = "none";
  downAlert.style.display = "none";
  successAlert.style.display = "block";
}
yes.onclick = function(){
  blackCover.style.display = "none";
  downAlert.style.display = "none";
  successAlert.style.display = "none";
}
var loadms = document.getElementsByClassName("loadm");
  for(var j=0;j<loadms.length;j++){
    loadms[j].onclick = function(){
    // alert(1);
    blackCover.style.display = "block";
    downAlert.style.display = "block";
  };
}
