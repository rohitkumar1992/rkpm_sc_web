$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $('body').toggleClass('sidebar_icon_only');
  });

  // $(function () {
  //     $('.sched_cont table input').dblclick(function () {
  //         $(this).removeProp('disabled').removeClass('no-pointer');
  //     }).find(':input').addClass('no-pointer');
  // });
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if (scroll >= 1) {
    $("body").addClass("headerfix");
  } else {
    $("body").removeClass("headerfix");
  }
});
