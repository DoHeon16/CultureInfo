var index = -1;
var bookmark = [0,0,0,0];
var searchText=[];

var genre;
$(document).ready(function(){
   var test = /.+\?([0-3])?-?([0-3]*)/;
    var result = test.exec(location.href);

   if (result === null)
   {
      index = -1;
   }

   else
   {
      if (result[1] != null)
      {  
         index = parseInt(result[1]);
      }
      
      for (var i=0;i<4;i++)
      {
         if (result[2].indexOf(i) != -1)
         {
            bookmark[i] = 1;
         }
      }
   }

   showBookmark();
   //alert(index);

   var img = ["", "", "", ""];
   var imgName = ["", "", "", ""];
   var allImg = $("#top-content").find("img");
   var allBook = $("#bookmark").find("img");
   var req =$.ajax({
         url : "WPjsonFinal.txt",
         dataType: "json"
   });
   req.done(function(data,status){
      
      genre = data[3];
      for(var i=0;i<img.length;i++){
         img[i] = genre[i].image;
         allImg.eq(i).attr("src", img[i]);
         imgName[i] = genre[i].title;
         allBook.eq(i).attr("src", img[i]);
      }

      for(var i = 0 ; i < data.length; i++){
         for(var j = 0 ; j < data[i].length; j++){
            searchText.push(data[i][j].title);
         }
      }

      showContents();
   });

   $("#top-content img").each(function(){
      $(this).on("click",function(){
            var str = "";
            for (var i=0;i<4;i++)
               if (bookmark[i] == 1)
                  str+=i;
           $(location).attr("href","classic.html?" + img.indexOf(this.src) + "-" + str);
           $("#Link").show();
           $("#info").hide();
      });
   });


   $("#menu_img").on("click",show_menu);

   $("#return").click(function(){
      //$("#menu").css({display:"none"});
      $("#menu").hide("slow");
      $("#menu_img_help").hide("slow");
   });
  

   function show_menu(){

      $("#menu").addClass("menu_popup");

      $("#menu").show("slow");

      var wid=$(window).width()-300+"px";
      var hei=$(window).outerHeight();
      $("#menu_img_help").addClass("menu_help");
      $("#menu_img_help").css({"width":wid,"height":hei});         
      $("#menu_img_help").show("slow");
   }

  


   $(window).on('scroll', function(){
      var curScroll = $(window).scrollTop();
      var height = $("#top-content").height();
      if(curScroll>=height){
         $("#move").animate({top:curScroll-height},10);
         $("#bookmark").animate({top:curScroll-height-20},10);
      }
      else{
         $("#move").animate({top:0},10);
         $("#bookmark").animate({top:0},10);
      }
   });

   $("#back").on("click", function(){
      $("html, body").animate({scrollTop:0},600);
   });


 // var Timeindex = 5;
 //   function lastTime(){
 //      if(Timeindex!=5){
 //         var time;
 //         time = genre[Timeindex].date;//공연 시간
 //         var temp = time.length;
 //         var last = time[temp-1];//공연별 막공
         
 //         var day = new Date();
        
 //         var lastTime = new Date(last);
 //         var total = "";

         
 //         var totalTime = new Date(lastTime.getTime()-day.getTime());
 //         total += (parseInt(totalTime/(1000*60*60*24)))+"일 "+(parseInt(totalTime/(1000*60*60))%24)+" : "+(parseInt(totalTime/(1000*60))%60)+" : "+(parseInt(parseInt(totalTime/(1000))%60/10))+(parseInt(totalTime/(1000))%60%10);
         
 //         $("#day").html(total);
 //      }

 //   }
 //   setInterval(lastTime, 10);

 //   $("img").click(function(){

 //      var im=$(this).attr("src");
 //      for(var i=0;i<img.length;i++){
 //         if(im == img[i]){
 //            changeText(i);
 //            Timeindex = i;
 //         }
 //      }
 //   });

   
   $("#star").click(function(){//즐겨찾기에 추가하는 버튼
      var check=$("#star").text();
      var cur = $("#sub_title").text();
      var change = $("#bookmark");
      if(check=="☆"){
         for(var i=0;i<imgName.length;i++){
            if(cur == imgName[i]){
               bookmark[i] = 1;
            }
            else if(cur == "List"){
               return;
            }
         }
         showBookmark();

         $("#star").text("★"); 
      }
      else if(check=="★"){
         for(var i=0;i<imgName.length;i++){
            if(cur == imgName[i]){
               bookmark[i] = 0;
            }
            else if(cur == "List"){
               return;
            }
         }
         $("#star").text("☆");
         showBookmark();
      } 

   });

   $("#bookmark img").each(function(){
      $(this).on("click",function(){
         var str = "";
            for (var i=0;i<4;i++)
               if (bookmark[i] == 1)
                  str+=i;
        $(location).attr("href","classic.html?" + $("#bookmark img").index(this) + "-" + str);
      });
   });

      
   
   $("#title").click(function(){
      $(location).attr("href","main.html");
   });

   $(".main_menu").click(function(){
      var attr=$(this).text();
      if(attr=="Musical"){
         $(location).attr("href","musical.html");

      }else if(attr=="Play"){
         $(location).attr("href","play.html");

      }else if(attr=="Concert"){
         $(location).attr("href","concert.html");

      }else if(attr=="Classic"){
         $(location).attr("href","classic.html");

      }else if(attr=="Bookmark"){

      }
   });
  

   function changeText(index){
      // switch(index){
      //    case 0:
      //       $("#sub_title").html(imgName[0]);
      //    break;
      //    case 1:
      //       $("#sub_title").html(imgName[1]);
      //    break;
      //    case 2:
      //       $("#sub_title").html(imgName[2]);
      //    break;
      //    case 3:
      //       $("#sub_title").html(imgName[3]);
      //    break;
      //    default:break;
      // }
      // if(bookmark[index] == 0){
      //    $("#star").text("☆");
      // }
      // else if(bookmark[index] == 1){
      //    $("#star").text("★"); 
      // }
   }
 
   $(".sub-menu").click(function(){
      
      var menu=$(this).text;
      var offset=90;
      if(menu=="Contents"){
         offset+=$("#Contents").offset();
         $("html, body").animate({scrollTop:offset.top},1000);
      }else if(menu=="Price"){
         offset+=$("#Price").offset();
         $("html, body").animate({scrollTop:offset.top},1000);
      }else if(menu=="Article"){
          offset+=$("#Article").offset();
         $("html, body").animate({scrollTop:offset.top},1000);;         
      }else if(menu=="Link"){
         offset+=$("#Link").offset();
         $("html, body").animate({scrollTop:offset.top},1000);        
      }
   });


   function showBookmark(){
      if (bookmark[index] == 1)
         $("#star").text("★");
      else
         $("#star").text("☆");
      var allImg = $("#bookmark").find("img");
      allImg.removeClass("closed");
      for(var i=0;i<bookmark.length;i=i+1){
         if(bookmark[i] == 0){
            allImg.eq(i).addClass("closed");
         }
      }
   }

   ///////////////////검색창 구현

   $("#input-search")
   .on("focus",function(){
      $("#input-search").trigger("keydown");
      $("#input-search-word-box").slideDown();
   })
   .on("blur",function(){
      setTimeout(function(){$("#input-search-word-box").slideUp();},100);
   });

   //var searchText = ["박효신 LIVE 2019 LOVERS：where is your love？", "안나카레니나", "ALL NEW! 그리스", "스쿨 오브 락 월드투어", "보도지침", "알앤제이(R&J)", "뜨거운 여름", "kill me now"];

   var output = [-1,-1,-1];

   $("#input-search").on("keydown click",function(event){

       if (event.key == "Enter")
      {
         $(".input-search-word:first-child").trigger("click");
         return false;
      }

      setTimeout(function(){
         var input = $("#input-search").val();

         var cnt = 0;
         output = [-1,-1,-1];

         for (var i=0;(i<searchText.length)&&(cnt<3);i++)
            if (searchText[i].indexOf(input)==0)
               output[cnt++] = i;

         OUTLOOP:
         for (var i=0;(i<searchText.length)&&(cnt<3);i++)
         {
            for (var j=0;j<3;j++)
               if (i == output[j])
                  continue OUTLOOP;
            
            if (searchText[i].indexOf(input)!=-1)
               output[cnt++] = i;
         }

         if (input.length<1)
            output = [-1,-1,-1];

         for (var i=0;i<3;i++)
            if (output[i] != -1)
               $(".input-search-word:nth-child("+(i+1)+")").text(searchText[output[i]]);
            else
               $(".input-search-word:nth-child("+(i+1)+")").text("");
      },200);
   });

   $("#input-search-submit")
   .on("click",function(){
      $(".input-search-word:first-child").trigger("click");
   });

   $(".input-search-word").each(function(){
      $(this).on("click",function(){
         var index = output[$(".input-search-word").index($(this))];
         //$("#input-search").text("");
         //TODO 페이지 이동 구현
         //alert(index);
         if(index == -1){
            alert("해당 공연의 정보가 없습니다.");
            return false;
         }

         var genre = parseInt(index / 4);
         var mIndex = parseInt(index % 4);
         switch(genre){
            case 0:
               $(location).attr("href","musical.html?" + mIndex);
               break;
            case 1:
               $(location).attr("href","play.html?" + mIndex);
               break;
            case 2:
               $(location).attr("href","concert.html?" + mIndex);
               break;
            case 3:
               $(location).attr("href","classic.html?" + mIndex);
               break;
         }
      });
   });

   ///////////////////검색창 구현 end

});

function showContents(){
   if(index == -1){
      $("#info").html("일반적으로는 대중 음악에 대한 서양의 고전적 예술 음악을 가리켜 이렇게 부른다. 또는 좁은 의미의 고전파 음악이란 하이든, 모차르트, 베토벤 등과 같은 인물이 활약한 시대의 음악을 가리킨다.<br><br>음악에 대한 연주회는 연주목적 ·연주형태 ·흥행 형태 등에 따라 여러 종류로 나뉜다. 독주와 독창 연주회는 리사이틀이라 하며, 그 목적과 성격에 따라 데뷔리사이틀 ·고별리사이틀 등으로 부른다. 두 사람 이상일 경우는 특히 조인트리사이틀이라고 한다. 오케스트라 ·실내악단 ·합창단 등에 의한 연주회 가운데 가장 중요한 것이 정기연주회이다. 이것은 글자 그대로 정기적으로 개최되는 것이며, 독일에서는 예약연주회라고도 한다. 이에 대하여 정기적이 아닌 것을 임시(특별)연주회라고 한다.<br><br>대중적인 작품만을 연주하는 것에는 포퓰러콘서트 ·팝스콘서트 외에 주로 시즌 오프(보통 여름철)에 야외연주장에서 개최되는 프롬나드콘서트 등이 있다. 한편 어떤 작곡가의 작품을 여러 차례에 걸친 연주회에서 연속적으로 연주했을 때를 연속연주회라고 부른다.<br><br>오페라에서 의상 ·무대장치 ·연기 등이 빠진 채로 연주될 경우 오케스트라 반주가 따른 것은 연주회 형식에 의한 상연이라고 하며, 피아노 반주를 곁들인 것은 오페라 리사이틀이라고 한다. 최초의 공개연주회는 1637년 건립된 베네치아의 산 카시아노극장에서 개최된 오페라 상연이었다.<br><br><p>한국의 클래식</p><br><br>우리나라에 클래식이 들어온 것은 일본은 신문과 잡지를 발행하며 클래식에 대한 이야기를 많이 다룬 식민지 시대이다. 신문물을 받아들이던 시절 조선인들은 베토벤이나 모차르트등 음악가들을 귀로 알게 된 것이 아니라 잡지를 통해 글로 배우기 시작했다.<br><br>서양의 '신문물'은 우리 문화에 신선한 충격을 주었다. 그당시 신여성(新女性)이란 잡지의 표지를 보면 여성의 모습이 서양화 되어 있는 모습을 볼 수 있다. 서양의 문화가 점점 우리나라에도 받아들여진다는 것을 알 수 있다. '신여성' 이란 일제강점기에 일본으로 유학을 다녀온 여성들로 나혜석, 최승희, 윤심덕을 손 꼽을 수 있다.")
   }
   else{
      $("#sub_title").text(genre[index].title);
      $("#Price").html(genre[index].price);
      $("#Link a").attr("href",genre[index].link);
      $("#Contents").empty();
      if(index ==0){
         $("#Contents").html(genre[index].contents);
      }
      else {
         for (var i=0;i<genre[index].contents.length;i=i+1){
            $("#Contents").append("<img src=\"" + genre[index].contents[i] + "\" />");
         }
      }
      
      $("#Article").html(genre[index].article);
      $("#Price").html(genre[index].price);
      $("#Link a").attr("href",genre[index].link);
      $("#Contents").css({width:"800px"});
      $("#Link").show();
      setInterval(showTime, 1000);
   }
}

function showTime(){
   var time;
   time = genre[index].date;//공연 시간
   var last = time[time.length-1];//공연별 막공
   var day = new Date();
   var lastTime = new Date(last);
   var total = "";

   
   var totalTime = new Date(lastTime.getTime()-day.getTime());
   total += (parseInt(totalTime/(1000*60*60*24)))+"일 "+(parseInt(totalTime/(1000*60*60))%24)+" : "+(parseInt(totalTime/(1000*60))%60)+" : "+(parseInt(parseInt(totalTime/(1000))%60/10))+(parseInt(totalTime/(1000))%60%10);
   if(totalTime.getTime()<0){
      $("#day").html("0:0:0");
   }
   else{
      $("#day").html(total);
   }
   
}
