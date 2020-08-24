(function () {
  /** General variables **/
  const $body = $('body, html'),
         $upButton = $('.up-btn');

  /** Scroll up button **/
  // Show or hide button when scrolling
  $(window).on('scroll load', function () {
    ($(this).scrollTop() > 1000) ? $upButton.fadeIn(300) : $upButton.fadeOut(300);
  });

  // Scroll the page top after click
  $upButton.on('click', function () {
    $body.animate({scrollTop:0}, 1000);
    return false
  })
})(jQuery);
