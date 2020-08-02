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
      
      genre = data[0];
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
           $(location).attr("href","musical.html?" + img.indexOf(this.src) + "-" + str);
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
            else if(cur == "Musical List"){
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
            else if(cur == "Musical List"){
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
        $(location).attr("href","musical.html?" + $("#bookmark img").index(this) + "-" + str);
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
      $("#info").html("<p>미국에서 발달한 현대 음악극의 한 형식.<br> 음악ㆍ노래ㆍ무용을 결합한 것으로, 뮤지컬 코미디나 뮤지컬 플레이를 종합하고, 그 위에 레뷔(revue)ㆍ쇼(show)ㆍ스펙터클(spectacle) 따위의 요소를 가미하여, 큰 무대에서 상연하는 종합 무대 예술</p><br><br>뮤지컬은 19세기 영국에서 탄생하였는데, 그 근원은 유럽의 대중연극, 오페라·오페레타·발라드 오페라(俗謠歌劇) 등이다. 1728년 이와 형식이 비슷한 존 게이의 《거지 오페라》가 런던에서 상연되었는데, 조지 에드워드(George Edwardes)가 제작한 《거리에서(In town)》(1892년 초연)를 첫 뮤지컬로 본다.<br><br>미국은 최초의 뮤지컬 코메디를 탄생시켰다. 19세기 미국에서 성행한 벌레스크(해학적인) 희극에다, 유럽에서 발달한 오페레타를 조화시킨 것이다. 작곡가 제롬 칸, 대본에 리처드 로저스, 작사자 오스카 해머스타인 2세 등이 등장하였다. 이들은 미국인의 꿈과 향수를 제재로, 미국의 민요와 흑인음악의 멜로디, 그리고 리듬을 적극 수용하는 노력을 아끼지 않았다. 이 일환으로 미시시피강(江)을 내왕하는 쇼보트를 무대로 인생의 애환을 그렸는데, 바로 《쇼보트》(1927)다. 이것은 오늘의 뮤지컬의 기초를 다졌다.<br><br><br><p>한국의 뮤지컬</p><br>한국의 뮤지컬은 1950년대 말 드라마센터에서 막을 연 《포기와 베스》가 첫 시도라고 볼 수 있다. 그후 1961년 예그린악단이 설립되어 《삼천만의 향연》(1962)과 《흥부와 놀부》(1963)를 공연함으로써 일반에게 알려졌고, 1966년 본격적인 뮤지컬이라 할 수 있는 《살짜기 옵서예》를 공연, 많은 인기를 끌었다.<br><br>그후 《꽃님이 꽃님이 꽃님이》(1967), 《바다여 말하라》(1971) 등을 공연하다가 명칭이 여러 번 바뀌고, 또 많은 극단들이 창작 뮤지컬 《시집가는 날》(1974), 《아리랑, 아리랑》(1988), 《아리송하네요》(1989), 《그날이 오면》(1991), 《꿈꾸는 철마》(1992) 등을 공연하였다.<br><br>한국에서의 본격적인 서구식 뮤지컬의 첫 작품은 1966년 동랑레퍼토리극단의 《포기와 베스》이다. 이 작품은 1950년대 말 드라마센터에서 공연하였으나, 컷이 많고 음악이 제대로 살지 못하여 본격적인 뮤지컬이라 할 수 없었다.<br><br>그후 많은 극단들이 《빠담,빠담,빠담》(1979), 《피터 팬》(1979), 《지저스 크라이스트 슈퍼스타》(1980), 《사운드 오브 뮤직》(1981), 《올리버》(1983), 《웨스트 사이드 스토리》(1987), 《캐츠》(1990), 《넌센스》(1991), 《코러스 라인》(1992), 《레미제라블》(1993) 등 브로드웨이 뮤지컬을 수입·공연하였다. 그중 1983년의 《아가씨와 건달들》은 1991년까지 9년 동안 반복 재공연되기도 하였다.<br><br>창작 뮤지컬로는 《번데기》, 《마지막춤은 나와 함께》, 《명성황후》, 《쇼코미디》 등이 있으며, 소형 뮤지컬로 《넌센스》, 《지하철 1호선》 등이 장기 공연을 하고 있다.");
   }
   else{
      $("#sub_title").text(genre[index].title);
      $("#Price").html(genre[index].price);
      $("#Link a").attr("href",genre[index].link);
      $("#Contents").empty();
      for (var i=0;i<genre[index].contents.length;i=i+1){
         $("#Contents").append("<img src=\"" + genre[index].contents[i] + "\" />");
         
      }
      //$("#Contents").html("<img src=\"" + genre[index].contents + "\" />");
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
