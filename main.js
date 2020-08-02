var data; //json 객체배열 저장 변수
var searchText=[];

$(document).ready(function(){
    var req = $.ajax({//json 객체 요청
      url:"WPjsonFinal.txt",
      dataType:"json"
   });
   req.done(function(dat,status){
      data = dat;
      for(var i = 0 ; i < data.length; i++){
         for(var j = 0 ; j < data[i].length; j++){
            searchText.push(data[i][j].title);
         }
      }
      recommend();
      drawTimeTable();
     //alert(searchText);
   });
   req.fail(function(){
      console.log("json 로드 실패");
   });

   
   $("#menu_img").on("click",show_menu);

   $("#return").click(function(){
      //$("#menu").css({display:"none"});
      $("#menu").hide("slow");
      $("#menu_img_help").hide("slow");
   });

  // $("#input-search-submit").on("click",search);

   $(".recommend").click(function(){
      var newload;
      var attr=$(this).attr("src");
      var str="http://ticket.interpark.com/Ticket/Goods/GoodsInfo.asp?GoodsCode=";
      if(attr=="anna.gif"){

         newload=window.open(str+"19003835","","resize=1, scrollbars=1, status=1");
         newload.resizeTo(0,0);
         newload.resizeTo(screen.availWidth,screen.availHeight);

      }else if(attr=="killmenow.gif"){

         newload=window.open(str+"19005230","","resize=1, scrollbars=1, status=1");
         newload.resizeTo(0,0);
         newload.resizeTo(screen.availWidth,screen.availHeight);

      }else if(attr=="magicshop.gif"){

         newload=window.open(str+"19005267","","resize=1, scrollbars=1, status=1");
         newload.resizeTo(0,0);
         newload.resizeTo(screen.availWidth,screen.availHeight);
      
      }else if(attr=="parkmusic.gif"){
   
         newload=window.open(str+"19005241","","resize=1, scrollbars=1, status=1");
         newload.resizeTo(0,0);
         newload.resizeTo(screen.availWidth,screen.availHeight);
      
      }      
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

   _left=$(window).width()/(3.5);
   $("#slide").find("img").css({left:_left});
   
   var interval=3000;
   $("#slide").each(function(){
      var timer;
      var container=$(this);
      function switchImg(){
         var imgs=container.find("img");//img 태그를 배열 변수로 받는다.
         var first=imgs.eq(0);//imgs 배열의 첫번째 img
         var second=imgs.eq(1);//imgs 배열의 두번째 img

         first.appendTo(container).fadeOut(2000);//첫번째 img를 container의 가장 마지막으로 보내고 fadeout 시킴

         if(second.attr("src")=="img/artcenter.jpg"){
            $(".hall_info").html("<strong>Seoul Arts Center</strong>");
         }
         else if(second.attr("src")=="img/bluesquare.jpg"){
            $(".hall_info").html("<strong>Bluesqure</strong>");
         }
         else if(second.attr("src")=="img/chalotte.jpg"){
            $(".hall_info").html("<strong>Charlottetheater</strong>");
         }
         else if(second.attr("src")=="img/cmah_arthall.jpg"){
            $(".hall_info").html("<strong>Chungmu Arts Center</strong>");
         }
         else if(second.attr("src")=="img/olympic.jpg"){
            $(".hall_info").html("<strong>Olympic Hall</strong>");
         }
         else if(second.attr("src")=="img/sejong.jpg"){
            $(".hall_info").html("<strong>Sejong Center for the Performing Arts</strong>");
         }

         second.fadeIn();//두번째 이미지를 fadein
         //imgs[0]는 html 요소를 구성하는 img 태그가 반환->jquery 객체가 아니므로 fadeout 등 method가 실행되지 않음.
      }   
      function startTimer(){
         timer=setInterval(switchImg,interval);   
      }
      function stopTimer(){
         clearInterval(timer);
      }

      //container.hover(stopTimer,startTimer);
      startTimer();//hover와 상관없이 실행
   });

   $("#slide").click(function(){

      var imgattr=$(this).find("img").attr("src");

      if(imgattr=="img/artcenter.jpg"){
         $("#hall_info").html("<p><strong>&lt예술의 전당&gt</strong></p><br>- 서울 서초구 남부순환로 2406 예술의전당<br>- 지하철 3호선 남부터미널역 5번 출구 도보 약 10분<br><br>콘서트홀 : 2481석<br><br>IBK챔버홀 : 594석<br><br>리사이틀홀 : 350석<br><br>오페라극장 : 1993석<br><br>CJ토월극장 : 915석<br><br>자유소극장 : 221석");
      }else if(imgattr=="img/bluesquare.jpg"){
         $("#hall_info").html("<p><strong>&lt블루스퀘어&gt</strong></p><br>- 서울 용산구 이태원로 294<br>- 6호선 한강진역 2번 출구<br><br>인터파크홀 : 1766석<br><br>아이마켓홀<br>:<br>그라운드형 - 1373석<br>스탠딩형 - 2800명");

      }else if(imgattr=="img/chalotte.jpg"){
         $("#hall_info").html("<p><strong>&lt샤롯데씨어터&gt</strong></p><br>- 서울 송파구 올림픽로 240<br>- 지하철 2호선,8호선 잠실역 3번 출구 도보 5분<br><br>1230석");
         
      }else if(imgattr=="img/cmah_arthall.jpg"){
         $("#hall_info").html("<p><strong>&lt충무아트센터&gt</strong></p><br>- 서울 중구 퇴계로 387 충무아트센터<br>- 지하철 2호선, 6호선 신당역 9번 출구<br><br>대극장 : 1225석<br><br>중극장 블랙 : 325석<br><br>소극장 블루 : 218석");
         
      }else if(imgattr=="img/olympic.jpg"){
         $("#hall_info").html("<p><strong>&lt올림픽 공원&gt</strong></p><br>- 서울 송파구 올림픽로 424<br>- 지하철 5호선, 9호선 올림픽공원역 3번 출구<br><br>올림픽체조경기장 : 14594석<br><br>SK핸드볼경기장 : 5003석<br><br>올림픽홀 : 2432석+(500~600)<br><br>우리금융아트홀 : 1184석<br><br>K-아트홀 : 1251석<br><br>뮤즈라이브 : 237석");
         
      }else if(imgattr=="img/sejong.jpg"){
         $("#hall_info").html("<p><strong>&lt세종문화회관&gt</strong></p><br>- 서울 종로구 세종대로 175<br>- 지하철 5호선 광화문역 1/7/8 번 출구<br><br>세종대극장 : 3022석<br><br>세종M씨어터 : 609석<br><br>세종 체임버홀 : 443석<br><br>세종S씨어터 : 300석");
         
      }
      // $(".hall_info").css({"text-align":"left"});
      // $(".slide img").css({"text-align":"left"});
      show_hall_info();

   });

   function show_hall_info(){
      $("#hall_info").addClass("popup");//class 추가 시, 이름만 작성
      change_position($(".popup"));
      $(window).resize(function(){
         change_position($(".popup"));
      });
      $("#hall_info").show();
   }

   $("#hall_info").click(function(){
      $("#hall_info").hide();
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

   ///////////////////시간표

   function drawTimeTable()
   {
      var width = 999;
      var height = 499;
      var context = document.getElementById("timetable").getContext('2d');

      //input 인자 처리
      // var Array = new Array(input[0].length);

      // for (var i=0;i<array.length;i++)
      // {
      //    array[i] = new Object();
      //    array[i].start = new Date(input[0][i]);
      //    array[i].end = new Date(input[1][i]);
      //    array[i].title = 
      // }

      var array = new Array();

      for (var i=0;i<4;i++)
      {
      	for (var j=0;j<4;j++)
      	{
      		for (var k=0;k<data[i][j].date.length;k++)
      		{
      			var date = new Date(data[i][j].date[k]);
      			var now = new Date();

      			if ((date.getFullYear() == now.getFullYear())&&(date.getMonth() == now.getMonth())&&(date.getDate() == now.getDate()))
      			{
      				var temp = new Object();

      				temp.start = date;
      				temp.end = new Date(date.getTime() + parseInt(data[i][j].running)*1000*60);
      				temp.title = data[i][j].title;

      				array.push(temp);
      			}
      		}
      	}
      }

      /////////////////////////////////////////////////////////////
      // 초기화 구문 끝
      /////////////////////////////////////////////////////////////

      if (array.length == 0)
      {
     	 context.beginPath();
     	 context.fillStyle = "#fff8f8";
   	 context.fillRect(0,0,width,height);
    	 context.closePath();

    	 context.beginPath();
         context.fillStyle = "#ff4444";
         context.font = "50px Arial";
         context.textAlign = "center";
         context.fillText("오늘 공연이 없습니다.",width/2, height/2);
         context.closePath();

         return;
      }

      var startTime = array[0].start.getTime();
      var endTime = array[0].end.getTime();

      for (var i=1; i<array.length; i++)
      {
         if (array[i].start.getTime() < startTime)
            startTime = array[i].start.getTime();
         if (array[i].end.getTime() > endTime)
            endTime = array[i].end.getTime();
      }

      context.beginPath();
      context.fillStyle = "#fff8f8";
      context.fillRect(0,0,width,height);
      context.closePath();

      today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      today = today.getTime();

      var hourInterval = 1000*60*60;
      var hour = parseInt((startTime - today + hourInterval-1)/hourInterval);

      var offsetX = 60;

      while (true)
      {
         if ((hour >= 24) || ((endTime-today) < hour*hourInterval))
            break;

         var y = hour*hourInterval + today - startTime;
         y = y*height/(endTime-startTime);

         context.beginPath();
         context.strokeStyle = "#ffa8a8";
         context.moveTo(0,y);
         context.lineTo(width,y);
         context.stroke();
         context.closePath();

         context.beginPath();
         context.strokeStyle = "#ffa8a8";
         context.lineWidth = 4;
         context.moveTo(offsetX-2,0);
         context.lineTo(offsetX-2,height);
         context.stroke();
         context.closePath();

         context.beginPath();
         context.fillStyle = "#000000";
         context.lineWidth = 1;
         context.font = "15px Arial";
         context.textAlign = "left";
         context.fillText(hour+":00",10,y-3);
         context.closePath();

         hour++;
      }



      for (var i=0; i<array.length; i++)
      {
         var y = array[i].start.getTime() - startTime;
         y = y*height/(endTime-startTime);

         var dy = array[i].end.getTime() - array[i].start.getTime();
         dy = dy*height/(endTime-startTime);

         var colorMax = 256;
         var colorOffset = colorMax*3/4;
         var color = "#";
         for (var j=0;j<3;j++)
            color += parseInt(((colorMax - colorOffset)*Math.random()+17699*i)%(colorMax - colorOffset)+colorOffset).toString(16);
         color += "ee";

         context.beginPath();
         context.strokeStyle = "#ffa8a8";
         context.fillStyle = color;
         context.strokeRect(offsetX + (width-offsetX)*i/array.length,y,(width-offsetX)/array.length,dy);
         context.fillRect(offsetX + (width-offsetX)*i/array.length,y,(width-offsetX)/array.length,dy);
         context.closePath();

         context.beginPath();
         context.fillStyle = "#000000";
         context.font = "15px Arial";
         context.textAlign = "center";
         context.fillText(array[i].title,offsetX + (width-offsetX)*i/array.length + (width-offsetX)/array.length/2, y+dy/2);
         context.closePath();
      }
   }

   ///////////////////시간표 end

   ///////////////////오늘의 추천
   function recommend(){
      $(".recommend").each(function(){
      	var index = $(".recommend").index(this);
      	var now = new Date();
       var random = (12345*now.getFullYear()+871*now.getMonth()*now.getDate())%256;

      	switch(index)
      	{
      	case 0:
      		random = random%4;
      		break;

      	case 1:
      		random = parseInt(random/4)%4;
      		break;

      	case 2:
   		random = parseInt(random/16)%4;
      		break;

      	case 3:
   		random = parseInt(random/64)%4;
      		break;
      	}

      	$(this).attr("src",data[index][random].image);

      	$(this).on("click",function(){
      		switch(index){
               case 0:
                  $(location).attr("href","musical.html?" + random);
                  break;
               case 1:
                  $(location).attr("href","play.html?" + random);
                  break;
               case 2:
                  $(location).attr("href","concert.html?" + random);
                  break;
               case 3:
                  $(location).attr("href","classic.html?" + random);
                  break;
            }
      	});
      });
   }
   ///////////////////오늘의 추천 end
});

////////////////////////////////////////////////////////////////
//document ready함수 끝
////////////////////////////////////////////////////////////////

function change_position(c){

   var _left=($(window).width()-c.width())/2;
   var _top=($(window).height()-c.height())/2;

   c.css({top:_top,left:_left});
}
