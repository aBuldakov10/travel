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
        $menuItem = $('.menu a'),
        $location = $('#location'),
        $duration = $('.duration input'),
        $persons = $('.persons input'),
        $searchHotelField = $('.search-form input[type="text"]'),
        $searchHotelBtn = $('.search-form input[type="submit"]'),
        $sendFormErrorTip = $('.send-form-tooltip'),
        searchLocationReg = /(^([a-zA-Z]+[ '-][a-zA-Z]+[ '-][a-zA-Z]+$)|^([a-zA-Z]+[ '-][a-zA-Z]+$)|^[a-zA-Z]+$)/gm,
        searchDateReg = /^\d{2}[ \/\.-]\d{2}[ \/\.-]\d{4}/gm,
        searchPersonReg = /^\d+$/gm;

  var searchHotelObj = {
        location: '',
        checkIn: '',
        checkOut: '',
        adults: '',
        child: ''
      };

  /** Detect mobile or desktop screen width **/
  $window.on('load resize orientationchange', function () {
    var windowWidth = $window.width();

    if (windowWidth >= 1024) {
      $body.removeClass('mobile');
      $body.addClass('desktop');
    }
    else {
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
    }
    else {
      var headerDeskHeight = $headerDesk.innerHeight();

      $bodyHtml.stop().animate({scrollTop:anchorElemTop - headerDeskHeight}, 1000);
    }
  });

  /** Search form validation **/
  // Location validation
  $location.on('blur', function () {

    // Remove useless spaces
    $(this).val($(this).val().trim());

    // Match value with RegEx
    var destination = $(this).val().match(searchLocationReg);

    // Set location to object
    if(destination) {
      $(this).removeClass('incorrect');
      searchHotelObj.location = destination[0];
    }
    // Leave empty location value
    else if ($(this).val().length === 0) {
      $(this).removeClass('incorrect');
      searchHotelObj.location = '';
    }
    // Incorrect location value
    else {
      $(this).addClass('incorrect');
    }
  });

  // Date validation
  // Validation date function with parameter
  function correctData(inputDateParam) {
    var splitDurationDate = inputDateParam.split('.'),
        inputYear = parseInt(splitDurationDate[2]),
        inputMonth = parseInt(splitDurationDate[1]),
        inputDay = parseInt(splitDurationDate[0]),
        formattedData = new Date(splitDurationDate[2], splitDurationDate[1] - 1, splitDurationDate[0]);

    if (!(formattedData.getFullYear() === inputYear && formattedData.getMonth() + 1 === inputMonth && formattedData.getDate() === inputDay)) {
      return false;
    }
  }

  // Validate date on blur
  $duration.on('blur', function () {
    // Remove useless spaces
    $(this).val($(this).val().trim());

    // Match value with RegEx
    var durationDate = $(this).val().match(searchDateReg),
        thisId = $(this).attr('id');

      // If date is correct
      if(durationDate) {
        $(this).removeClass('incorrect');

        // Execute validate function with needed parameter
        correctData(durationDate[0]);

        // If check-in field
        if (thisId === 'check-in') {
          (correctData(durationDate[0]) === false) ? $(this).addClass('incorrect') : searchHotelObj.checkIn = durationDate[0];
        }
        // If check-out field
        else {
          (correctData(durationDate[0]) === false) ? $(this).addClass('incorrect') : searchHotelObj.checkOut = durationDate[0];
        }
      }
      // Leave empty check-in or check-out value
      else if ($(this).val().length === 0) {
        $(this).removeClass('incorrect');
        (thisId === 'check-in') ? searchHotelObj.checkIn = '' : searchHotelObj.checkOut = '';
      }
      // If date is incorrect
      else {
        $(this).addClass('incorrect');
      }
  });

  // Persons amount validation
  $persons.on('blur', function () {
    // Remove useless spaces
    $(this).val($(this).val().trim());

    // Match value with RegEx
    var persons = $(this).val().match(searchPersonReg),
        thisId = $(this).attr('id');

    // Set adults or child to object
    if(persons) {
      $(this).removeClass('incorrect');
      (thisId === 'adult') ? searchHotelObj.adults = persons[0] : searchHotelObj.child = persons[0];
    }
    // Leave empty adults or child value
    else if ($(this).val().length === 0) {
      $(this).removeClass('incorrect');
      (thisId === 'adult') ? searchHotelObj.adults = '' : searchHotelObj.child = '';
    }
    // Incorrect persons value
    else {
      $(this).addClass('incorrect');
    }
  });

  // Send search hotels form
  $searchHotelBtn.on('click', function (e) {
    e.preventDefault();

    // All fields are filled correctly
    if (!$searchHotelField.hasClass('incorrect')) {
      $.ajax({
        // type: "POST",
        // url: "url",
        dataType: 'json',
        data: JSON.stringify(searchHotelObj),
        // success: window.open('http://google.com', '_blank') // Should be link to the main site
        success: alert('The main site should be opened with the search result')
      });
    }
    // Show error tip if some fields are filled incorrectly
    else {
      if (!$sendFormErrorTip.hasClass('show-error')) {
        $sendFormErrorTip.addClass('show-error').fadeIn(0);

        setTimeout(function () {
          $sendFormErrorTip.fadeOut(300).removeClass('show-error');
        }, 2000);
      }
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
