$(document).ready(function(){
  $('.timetable-menu-list').slideUp(0);
  $('.timetable-results').slideUp(0);
  $(".timetable-title-panel .submit-button").click(function(){
    $(".timetable-menu-list").slideDown("slow");
  });
  $(".close").click(function(){
    $(".timetable-menu-list").slideUp("slow");
  });
  $('.timetable-results-trigger').click(function(){
    $('.timetable-menu-list').slideUp("slow",function(){
      $('.timetable-results').slideDown("slow");
    });
  });
  $(".custom-card-action").on("click",function(e){
    if($(this).hasClass("front")){
      $(this).closest($('.custom-card')).find($(".custom-card-front")).hide();
      $(this).closest($('.custom-card')).find($('.custom-card-edit')).fadeIn("slow");
      $(this).html('<i class="fa fa-times" aria-hidden="true"></i>');
      $(this).addClass("edit");
      $(this).removeClass("front");
    } else{
      $(this).closest($('.custom-card')).find($(".custom-card-edit")).hide();
      $(this).closest($('.custom-card')).find($('.custom-card-front')).fadeIn("slow");
      $(this).html('<i class="fa fa-ellipsis-v" aria-hidden="true"></i>');
      $(this).addClass("front");
      $(this).removeClass("edit");
    }
  });
  $(".custom-card-action-active").on("click",function(e){
    $(".custom-card-edit").hide();
    $(".custom-card-front").fadeIn("slow");
    $(this).html('<i class="fa fa-ellipsis-v" aria-hidden="true"></i>');
    $(this).addClass("custom-card-action-inactive",function(){
      $(this).removeClass("custom-card-action-active");
    });
  });
});
