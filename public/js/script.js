(function ($) {
  "use strict";
  $(window).on("load", function () {
    $(".loader").fadeOut(1000);
    var wow = new WOW({ offset: 150, mobile: false });
    wow.init();
  });
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    inDuration: 1000,
    outDuration: 700,
    linkElement: "a.project-box",
    loading: true,
    loadingParentElement: "body",
    loadingClass: "spinner",
    loadingInner:
      '<div class="double-bounce1"></div><div class="double-bounce2"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "body",
    transition: function (url) {
      window.location.href = url;
    },
  });
  $(".popup-youtube").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-with-zoom",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  $(".navbar-toggle").on("click", function () {
    $("body").removeClass("menu-is-closed").addClass("menu-is-opened");
  });
  $(".close-menu, .click-capture, .menu-list li a").on("click", function () {
    $("body").removeClass("menu-is-opened").addClass("menu-is-closed");
    $(".menu-list ul").slideUp(300);
  });
  $(".menu-list li a").on("click", function () {
    $(".menu-list li").removeClass("active");
    $(this).closest("li").addClass("active");
  });
  if ($(".owl-carousel").length > 0) {
    $(".review-carousel").owlCarousel({
      responsive: { 0: { items: 1 }, 720: { items: 1 }, 1280: { items: 1 } },
      responsiveRefreshRate: 0,
      nav: false,
      navText: [],
      animateIn: "fadeIn",
      dots: true,
    });
  }
  if ($(".pagepiling").length > 0) {
    $(".pagepiling").pagepiling({
      scrollingSpeed: 280,
      loopBottom: true,
      anchors: [
        "home",
        "about",
        "tech-stack",
        "experience",
        "projects",
        "certifications",
        "contact",
      ],
      afterLoad: function (anchorLink, index) {
        if ($(".pp-section.active").scrollTop() > 0) {
          $(".navbar").removeClass("navbar-white");
        } else {
          $(".navbar").addClass("navbar-white");
        }
      },
    });
  }
  $("#pp-nav")
    .remove()
    .appendTo(".animsition")
    .addClass("white right-boxed d-none d-sm-block");
  $(".pp-nav-up").on("click", function () {
    $.fn.pagepiling.moveSectionUp();
  });
  $(".pp-nav-down").on("click", function () {
    $.fn.pagepiling.moveSectionDown();
  });
  $(".project-box").on("mouseover", function () {
    var index = $(".project-box").index(this);
    $(".bg-changer .section-bg")
      .removeClass("active")
      .eq(index)
      .addClass("active");
  });
  // if ($(".js-form").length) {
  //   $(".js-form").each(function () {
  //     $(this).validate({
  //       errorClass: "error",
  //       submitHandler: function (form) {
  //         $.ajax({
  //           type: "POST",
  //           url: "mail.php",
  //           data: $(form).serialize(),
  //           success: function () {
  //             $(".form-group-message").show();
  //             $("#error").hide();
  //             $("#success").show();
  //           },
  //           error: function () {
  //             $(".form-group-message").show();
  //             $("#success").hide();
  //             $("#error").show();
  //           },
  //         });
  //       },
  //     });
  //   });
  // }
})(jQuery);

// Get the current year
const currentYear = new Date().getFullYear();

// Find the element by its ID
const currentYearElement = document.getElementById("currentYear");

// Update the content of the element with the current year
currentYearElement.textContent = currentYear;

// Contact Submission Handler
function handleContactFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get form input values
  const name = document.getElementById("name").value;
  const subject = document.getElementById("subject").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Perform input validation (add more validation as needed)
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Create a FormData object to send data as a multipart/form-data request
  const formData = new FormData();
  formData.append("name", name);
  formData.append("subject", subject);
  formData.append("email", email);
  formData.append("message", message);

  // DEBUG
  // console.log("Name:", name);
  // console.log("Email:", email);
  // console.log("Subject:", subject);
  // console.log("Message:", message);

  // Send a POST request to your server (adjust the URL accordingly)
  fetch("/submit-contact-message", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server's response (e.g., show a success message)
      // Debug
      // console.log(formData);
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      console.log("Message submitted successfully:", data);
      // alert("Message submitted successfully.");
    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting Message:", error);
      // alert("An error occurred while submitting the Message.");
    });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleContactFormSubmit);
}
