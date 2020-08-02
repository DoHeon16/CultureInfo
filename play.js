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
      
      genre = data[1];
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
           $(location).attr("href","play.html?" + img.indexOf(this.src) + "-" + str);
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
            else if(cur == "Play List"){
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
            else if(cur == "Play List"){
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
        $(location).attr("href","play.html?" + $("#bookmark img").index(this) + "-" + str);
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
      $("#info").html(" <p>배우가 각본에 따라 어떤 사건이나 인물을 말과 동작으로 관객에게 보여 주는 무대 예술</p><br>연극은 특정 시간과 공간 속에서 재구성된 인간의 경험을 몸짓과 언어로 표현하며 관객에게 보여주는 예술로 우리의 삶을 가장 유사하게 담아내는 예술로 정의내릴 수 있다. 여기서 중요한 것은 바로 배우와 관객이다. ‘하는 사람’과 ‘보는 사람’이 없으면 연극 공연이 성립될 수 없기 때문이다. 연극은 그 본질을 이루는 배우와 관객을 중심으로 두 가지 이상의 다양한 요소, 예를 들어 기계장치 및 설비, 극장, 조명, 무대장치 및 소도구, 음향효과, 대사 및 대본, 의상 및 분장 등의 구성으로 이루어진다. 이와 같이 연극은 음악, 미술, 문학 등 다양한 예술이 종합적으로 유기적으로 구성된 종합예술로서 실재 인간의 삶을 모방하고 이를 허구로 가공하여 무대 위에서 배우들이 관객들에게 순간순간 메시지를 전하는 역동적인 예술이라고 할 수 있다.<br><br><p>한국의 연극</p><br>한국 연극은 전통적으로 ‘굿’, ‘노랏노리’, ‘짓거리’ 등 3가지에서 그 어원을 찾을 수 있다. 굿은 한국 연극의 제의적 성격을 나타내며 노랏노리는 일로부터의 해방을 통한 놀이적 성격을 나타낸다. 짓거리는 특정 질서에 따라 연결된 모방 동작들을 의미하는 어원으로 이를 종합하면 ‘어떤 역할을 맡아 행동으로 보여주어 상대방을 놀라게 하는 것’이나 ‘여러 가지 몸 재주들로 즐겁게 노는 모양을 보여주는 것’으로 정의내릴 수 있다. 즉 무엇인가를 보여주고 보는 것이라는 점은 유사하지만 한국 연극이 가지는 제의성과 놀이성에서는 차이를 보인다. 특히 한국 연극의 제의성과 놀이성, 모방성의 조화는 좀 더 양식화된 모방성에 집중하는 동양의 인도나 중국, 일본의 연극과도 차별되는 특성이다.");
   }
   else{
      $("#sub_title").text(genre[index].title);
      $("#Price").html(genre[index].price);
      $("#Link a").attr("href",genre[index].link);
      $("#Contents").empty();
      /*for (var i=0;i<genre[index].contents.length;i=i+1){
         $("#Contents").append("<img src=\"" + genre[index].contents[i] + "\" />");
      }*/
      $("#Contents").html("<img src=\"" + genre[index].contents + "\" />");
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
