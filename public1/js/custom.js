$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $('body').toggleClass('sidebar_icon_only');
  });
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if (scroll >= 1) {
    $("body").addClass("headerfix");
  } else {
    $("body").removeClass("headerfix");
  }
});
