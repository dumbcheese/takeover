/** 
  * Template Name: Varsity
  * Version: 1.0  
  * Template Scripts
  * Author: MarkUps
  * Author URI: http://www.markups.io/

  Custom JS
  

  1. SEARCH FORM
  2. ABOUT US VIDEO
  2. TOP SLIDER
  3. ABOUT US (SLICK SLIDER) 
  4. LATEST COURSE SLIDER (SLICK SLIDER) 
  5. TESTIMONIAL SLIDER (SLICK SLIDER)
  6. COUNTER
  7. RELATED ITEM SLIDER (SLICK SLIDER)
  8. MIXIT FILTER (FOR GALLERY)
  9. FANCYBOX (FOR PORTFOLIO POPUP VIEW)  
  11. HOVER DROPDOWN MENU
  12. SCROLL TOP BUTTON  

  
**/


jQuery(function ($) {
 

  /* ----------------------------------------------------------- */
  /*  1. SEARCH FORM
  /* ----------------------------------------------------------- */

  jQuery('#mu-search-icon').on('click', function (event) {
    event.preventDefault();
    $('#mu-search').addClass('mu-search-open');
    $('#mu-search form input[type="search"]').focus();
  });

  jQuery('.mu-search-close').on('click', function (event) {
    $("#mu-search").removeClass('mu-search-open');
  });

  /* ----------------------------------------------------------- */
  /*  2. ABOUT US VIDEO
  /* ----------------------------------------------------------- */
  // WHEN CLICK PLAY BUTTON 
  jQuery('#mu-abtus-video').on('click', function (event) {
    event.preventDefault();
    $('body').append("<div id='about-video-popup'><span id='mu-video-close' class='fa fa-close'></span><iframe id='mutube-video' name='mutube-video' frameborder='0' allowfullscreen></iframe></div>");
    $("#mutube-video").attr("src", $(this).attr("href"));
  });
  // WHEN CLICK CLOSE BUTTON
  $(document).on('click', '#mu-video-close', function (event) {
    $(this).parent("div").fadeOut(1000);
  });
  // WHEN CLICK OVERLAY BACKGROUND
  $(document).on('click', '#about-video-popup', function (event) {
    $(this).remove();
  });

  /* ----------------------------------------------------------- */
  /*  3. TOP SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */

  jQuery('#mu-slider').slick({
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    autoplay: true,
    cssEase: 'linear'
  });

  /* ----------------------------------------------------------- */
  /*  4. ABOUT US (SLICK SLIDER)
  /* ----------------------------------------------------------- */

  jQuery('#mu-testimonial-slide').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    cssEase: 'linear'
  });


  /* ----------------------------------------------------------- */
  /*  5. LATEST COURSE SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */

  jQuery('#mu-latest-course-slide').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  /* ----------------------------------------------------------- */
  /*  6. TESTIMONIAL SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */

  jQuery('.mu-testimonial-slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: 'linear'
  });

  /* ----------------------------------------------------------- */
  /*  7. COUNTER
  /* ----------------------------------------------------------- */

  jQuery('.counter').counterUp({
    delay: 10,
    time: 1000
  });


  /* ----------------------------------------------------------- */
  /*  8. RELATED ITEM SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */

  jQuery('#mu-related-item-slide').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  /* ----------------------------------------------------------- */
  /*  9. MIXIT FILTER (FOR GALLERY) 
  /* ----------------------------------------------------------- */

  jQuery(function () {
    jQuery('#mixit-container').mixItUp();
  });

  /* ----------------------------------------------------------- */
  /*  10. FANCYBOX (FOR PORTFOLIO POPUP VIEW) 
  /* ----------------------------------------------------------- */

  jQuery(document).ready(function () {
    jQuery(".fancybox").fancybox();
  });

  /* ----------------------------------------------------------- */
  /*  11. HOVER DROPDOWN MENU
  /* ----------------------------------------------------------- */

  // for hover dropdown menu
  jQuery('ul.nav li.dropdown').hover(function () {
    jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
  }, function () {
    jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
  });


  /* ----------------------------------------------------------- */
  /*  12. SCROLL TOP BUTTON
  /* ----------------------------------------------------------- */

  //Check to see if the window is top if not then display button

  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 300) {
      jQuery('.scrollToTop').fadeIn();
    } else {
      jQuery('.scrollToTop').fadeOut();
    }
  });

  //Click event to scroll to top

  jQuery('.scrollToTop').click(function () {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });


});
// Mathematics
// Theory of Knowledge
// English A
// English B
// Economics
// Business and Management
// Biology
// Chemistry
// Arts
// Environmental Studies
// Computer Science
// History
// Geography 
// Psychology 
// Information and Technology in Global Society(ITGS)
// Physics
// German B
// Bosnian A

var orderSubject = document.querySelector("#orderSubject");
var orderType = document.querySelector("#orderType");
var orderPrice = document.querySelector("#orderPrice");
var orderLevel = document.querySelector("#orderPrice");
var orderDate = document.querySelector("#orderDate");
var orderDeadline = document.querySelector("#orderDeadline");

window.onload = checkPrice();

orderSubject.addEventListener("change", checkPrice);
orderType.addEventListener("change", checkPrice);
orderLevel.addEventListener("change", checkPrice);
orderDate.addEventListener("change", checkPrice);


orderSubject.addEventListener("change", deadline);
orderType.addEventListener("change", deadline);
orderLevel.addEventListener("change", deadline);
orderDate.addEventListener("change", deadline);

function deadline(){
  if(orderDate.value=="1 Day") {orderDeadline.value=moment().add(1, 'days')}
  if(orderDate.value=="2 Days") {orderDeadline.value=moment().add(2, 'days')}
  if(orderDate.value=="4 Days") {orderDeadline.value=moment().add(4, 'days')}
  if(orderDate.value=="7 Days") {orderDeadline.value=moment().add(7, 'days')}
  if(orderDate.value=="10 Days") {orderDeadline.value=moment().add(10, 'days')}
  if(orderDate.value=="14 Days") {orderDeadline.value=moment().add(14, 'days')}
}

function checkPrice() {
  if (orderType.value == "Extended Essay") {
    orderPrice.value = "250";
    if(orderSubject.value == "Mathematics" || orderSubject.value == "Physics" || orderSubject.value == "Chemistry" || orderSubject.value == "Biology" || orderSubject.value == "Computer Science"){
      orderPrice.value = "350";
      if(orderDate.value == "1 Day"){
        orderPrice.value = "450"
      }
      else if(orderDate.value == "2 Days"){
        orderPrice.value = "420"
      }
      else if(orderDate.value == "4 Days"){
        orderPrice.value = "400"
      }
    }
    else{
    if(orderDate.value == "1 Day"){
      orderPrice.value = "350"
    }
    else if(orderDate.value == "2 Days"){
      orderPrice.value = "320"
    }
    else if(orderDate.value == "4 Days"){
      orderPrice.value = "280"
    }
  }
}
  else if(orderType.value == "Internal Assesment"){
  
    orderPrice.value = "120";
    if(orderSubject.value == "Mathematics" || orderSubject.value == "Physics" || orderSubject.value == "Chemistry" || orderSubject.value == "Biology"){
      orderPrice.value = "180";
      if(orderDate.value == "1 Day"){
        orderPrice.value = "250"
      }
      else if(orderDate.value == "2 Days"){
        orderPrice.value = "220"
      }
      else if(orderDate.value == "4 Days"){
        orderPrice.value = "200"
      }
    }
  else if(orderSubject.value == "Computer Science" || orderSubject.value == "Information and Technology in Global Society(ITGS)"){
    orderPrice.value = "260";
      if(orderDate.value == "1 Day"){
        orderPrice.value = "360"
      }
      else if(orderDate.value == "2 Days"){
        orderPrice.value = "320"
      }
      else if(orderDate.value == "4 Days"){
        orderPrice.value = "280"
      }
  }
    else{
    if(orderDate.value == "1 Day"){
      orderPrice.value = "170"
    }
    else if(orderDate.value == "2 Days"){
      orderPrice.value = "150"
    }
    else if(orderDate.value == "4 Days"){
      orderPrice.value = "130"
    }
  }
  }
 
  else if(orderType.value == "Structure"){
  
    orderPrice.value = "50";
    
  }



}