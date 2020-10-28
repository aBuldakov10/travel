(function () {
  /** General variables **/
  const $window = $(window),
        $bodyHtml = $('body, html'),
        $body = $('body'),
        $upButton = $('.up-btn'),
        $logo = $('.logo'),
        $mobBurger = $('.mob-burger'),
        $mobMenu = $('.mob-menu'),
        $headerMob = $('.header-mob'),
        $headerDesk = $('.header-desk'),
        $menuItem = $('.menu a');

  /** Detect mobile or desktop screen width **/
  $window.on('load resize orientationchange', function () {
    var windowWidth = $window.width();

    if (windowWidth >= 1024) {
      $body.removeClass('mobile');
      $body.addClass('desktop');
    } else {
      $body.removeClass('desktop');
      $body.addClass('mobile');
    }
  });

  /** Scroll top by logo click **/
  $logo.on('click', function () {
    $bodyHtml.stop().animate({scrollTop:0}, 1000);
  });

  /** Header mobile burger menu **/
  $mobBurger.on('click', function () {
    $body.toggleClass('no-scroll blur');
    $mobBurger.toggleClass('open-menu');
    $mobMenu.toggleClass('show-menu');
  });

  /** Hide burger menu on resize/change orientation **/
  // Hide mobile menu function
  function hideMobileMenu() {
    $body.removeClass('no-scroll blur');
    $mobBurger.removeClass('open-menu');
    $mobMenu.removeClass('show-menu');
  }

  $window.on('resize orientationchange', function () {
    hideMobileMenu();
  });

  /** Sticky desktop header **/
  $window.on('load scroll', function () {
    if ($body.hasClass('desktop')) {
      ($window.scrollTop() > 200) ? $headerDesk.addClass('sticky') : $headerDesk.removeClass('sticky');
      }
  });

  /** Anchor link **/
  $menuItem.on('click', function (e) {
    e.preventDefault();

    var anchorAttr = $(this).attr('data-anchor'),
        $anchorElem = $('#' + anchorAttr),
        anchorElemTop = $anchorElem.offset().top;

    if ($body.hasClass('mobile')) {
      var headerMobHeight = $headerMob.innerHeight();

      hideMobileMenu();

      $bodyHtml.stop().animate({scrollTop:anchorElemTop - headerMobHeight}, 1000);
    } else {
      var headerDeskHeight = $headerDesk.innerHeight();

      $bodyHtml.stop().animate({scrollTop:anchorElemTop - headerDeskHeight}, 1000);
    }
  });

  /** Slick plugin **/
  $(document).ready(function(){
    $('.slider-wrap').slick(
      {
        autoplay: true,
        dots: true,
        arrows: false,
        speed: 500,
        autoplaySpeed: 4000
      }
    );
  });

  /** Scroll top button **/
  // Show or hide scrollTop button when scrolling
  $window.on('scroll load', function () {
    ($(this).scrollTop() > 1000) ? $upButton.fadeIn(300) : $upButton.fadeOut(300);
  });

  // Scroll the page top after click
  $upButton.on('click', function () {
    $bodyHtml.stop().animate({scrollTop:0}, 1000);
    return false
  });
})(jQuery);
