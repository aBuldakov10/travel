(function () {
  /** General variables **/
  const $bodyHtml = $('body, html'),
        $body = $('body'),
        $upButton = $('.up-btn'),
        $mobBurger = $('.mob-burger'),
        $mobMenu = $('.mob-menu');

  /** Header mobile burger menu **/
  $mobBurger.on('click', function () {
    $body.toggleClass('no-scroll blur');
    $mobBurger.toggleClass('open-menu');
    $mobMenu.toggleClass('show-menu');
  });

  /** Hide burger menu on resize/change orientation **/
  $(window).on('resize orientationchange', function () {
    $body.removeClass('no-scroll blur');
    $mobBurger.removeClass('open-menu');
    $mobMenu.removeClass('show-menu');
  });

  /** Slick plugin**/
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
  $(window).on('scroll load', function () {
    ($(this).scrollTop() > 1000) ? $upButton.fadeIn(300) : $upButton.fadeOut(300);
  });

  // Scroll the page top after click
  $upButton.on('click', function () {
    $bodyHtml.animate({scrollTop:0}, 1000);
    return false
  })
})(jQuery);
