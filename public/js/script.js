$(document).ready(function(){
  $('.timetable-menu-list').slideUp(0);
  $('.timetable-results').slideUp(0);
  /*$(".timetable-title-panel .submit-button").click(function(){
    $('.timetable-results').slideUp(400,function(){
      $(".timetable-menu-list").slideDown(400);
    });
  });
  $(".close").click(function(){
    $(".timetable-menu-list").slideUp(400);
    $(".timetable-title-panel").show();
  });*/
  if($(window).width()>=768 && $(window).width()<=1024){
    $('.timetable-menu-list .push-l4').removeClass('push-l4');
  }

  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  $(document).on("click",'.custom-card-action',function(e){
    if($(this).hasClass("front")){
      $(this).closest($('.custom-card')).find($(".custom-card-front")).hide();
      $(this).closest($('.custom-card')).find($('.custom-card-edit')).fadeIn("slow");
      $(this).html('<i class="fa fa-times" aria-hidden="true"></i>');
      $(this).addClass("edit");
      $(this).removeClass("front");
      if(windowWidth<=600){
        //$(this).closest($('.custom-card')).width($(this).closest($('.custom-card')).find($('.custom-card-edit')).width());
        $(this).closest($('.custom-card')).css('width','270px');
      } else if(windowWidth>600 && windowWidth<=1024){
        $(this).closest($('.custom-card')).css('width','30%');
      }
    } else{
      $(this).closest($('.custom-card')).find($(".custom-card-edit")).hide();
      $(this).closest($('.custom-card')).find($('.custom-card-front')).fadeIn("slow");
      $(this).html('<i class="fa fa-ellipsis-v" aria-hidden="true"></i>');
      $(this).addClass("front");
      $(this).removeClass("edit");
    }
  });
  /*$(".custom-card-action-active").on("click",function(e){
    $(".custom-card-edit").hide();
    $(".custom-card-front").fadeIn("slow");
    $(this).html('<i class="fa fa-ellipsis-v" aria-hidden="true"></i>');
    $(this).addClass("custom-card-action-inactive",function(){
      $(this).removeClass("custom-card-action-active");
    });
  });*/

  if($(window).width()>1100)
    $('.timetable').css("width","100%");
  else{
  	$('.timetable').css("width","97.5%");

  }

});
$(window).resize(function()
{
  if($(window).width()>1100){
    $('.timetable').css("width","100%");
  }
});
