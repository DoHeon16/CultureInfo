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
      
      genre = data[2];
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
           $(location).attr("href","concert.html?" + img.indexOf(this.src) + "-" + str);
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
        $(location).attr("href","concert.html?" + $("#bookmark img").index(this) + "-" + str);
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
      $("#info").html("<p>대중을 대상으로 하는 음악을 공연<br>연대중음악의 본질은 대중들이 쉽게 이해하고, 음악 이론이나 전문적인 지식 없이도 접근할 수 있다는 것에 있다. 때문에 음악의 주된 선율은 단순하고 간결하며 제한된 화성 반주로 이루어져 있다. 최근에는 흥미, 오락, 상업성에 중점을 둔 대중음악이 문화와 예술성을 겸비하면서 새롭게 조명되고 있다.</p><br><br>대중음악은 단순히 대중들이 즐기는 음악의 차원만이 아닌 사회적인 현상이며, 당대의 문화를 대변한다. 예를 들어 1950년대와 1960년대에 인기를 끌었던 록과 포크음악은 당시 지배문화와 전통에 대한 거부정신으로 잉태되었고, 1969년 뉴욕에서 거행된 우드스탁(woodstock) 페스티벌의 경우에도 1960년대 젊은 세대들의 의식과 록음악이 한데 어우러진 문화행사였다.<br><br>대중음악은 특정한 상층 귀족이나 엘리트의 예술이 아닌 대중문화에 속한다. 대중음악의 수용자도 반드시 단일한 계층이 아니어서 계층적인 취향 차이가 드러나기는 하지만 넓은 의미에서 당대 대다수의 서민들이 향유하는 서민문화에 속한다고 할 수 있다. 이러한 대중음악은 자본주의 사회의 지배문화인 동시에 서민문화라는 묘한 성격을 지니고 있다. 서민대중들의 경험과 관심사, 인식과 정서, 욕망 등을 드러내는 서민예술인 동시에 그 사회의 지배적인 정치·경제적 체제와 결속하고 있는 예술인 것이다.<br><br>특히 대중음악은 지배적인 노래문화이므로 당대 대중들에게 광범위하게 유포되고 수용된다. 특정 집단에 들어가야만 향유할 수 있는 구전가요나 민중가요 같은 하위문화들과 달리 대중음악은 그 사회를 살아가면 누구나 예외 없이 향유하고 익히게 되는 노래문화이다.<br><br><p>한국의 콘서트(대중음악)</p><br>한국의 대중음악은 1926년 윤심덕(尹心悳)의 〈사의 찬미〉라는 상업적인 음반이 발매되면서부터 시작되었으며, 일본 식민지에는 트로트가 유행하였고 미군이 주둔하면서는 팝이 유행하였다. 또한 1970년대에는 미국의 팝송과 포크송, 록음악이 본격적으로 유행함에 따라 우리말을 넣은 번안가요가 성행하였으며, 1980년대에는 발라드가 유행하였다.<br><br>1990년대에는 ‘뉴 키즈 온 더 블록’의 내한 공연과 ‘서태지와 아이들’의 출현으로 인하여 우리나라 가요에 큰 변화의 바람이 불었다. ‘서태지와 아이들’은 노래와 함께 랩을 사용하였고 모자를 돌려쓰거나 상표를 붙이며 등장하기도 하였으며 청바지를 골반에 걸쳐 입는 등 음악과 함께 패션으로 신세대의 자유로움을 표현하였다. 신세대들에게 그들의 등장은 새로운 세계로의 비상구가 되었다.<br><br>2000년대 이후에는 90년대와는 다르게 외국 문화가 쉽게 흡수된 동시에 우리의 문화도 세계로 빠르게 퍼져나갔다. 그 대표적인 성향은 전 세계를 뒤흔드는 K-POP의 인기로 쉽게 알 수 있다. 이로 인해 21세기 우리 가요는 영어의 사용이 잦아졌고 랩 부분에는 각 나라의 다양한 언어가 쓰이고 있다. 또한 그룹 가수들의 등장은 화려한 퍼포먼스를 보여주며 대중들의 시선을 집중시키고 있다. 한국 가요계의 그룹은 남자 아이돌, 여자 아이돌이라는 새로운 신조어까지 탄생시켰다.");
      }
   else{
      $("#sub_title").html(genre[index].title);
      $("#Price").html(genre[index].price);
      $("#Link a").attr("href",genre[index].link);
      //$("#Contents").empty();
      // for (var i=0;i<genre[index].contents.length;i=i+1){
      //    $("#Contents").append("<img src=\"" + genre[index].contents[i] + "\" />");
      //    alert();
      // }
      $("#Contents").html("<img src=\"" + genre[index].content + "\" />");
      $("#Article").html(genre[index].article);
      $("#Price").html(genre[index].price);
      $("#Link a").attr("href",genre[index].link);
      $("#Contents").css({width:"700px"});
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