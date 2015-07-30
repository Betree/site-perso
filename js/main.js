function ContactForm() {
    var $emailFormContainer = $("#emailFormContainer");
    var $formTitle = $("#slide6").find("h2");
    var $contactFormButton = $("#contactFormButton");

    this.init = function() {
        $contactFormButton.click(expandForm);

        $("#sendmailresult").find(".btnClose").click(function() { $("#sendmailresult").remove(); });

        if ($('#sendmailresult.success').length) {
            setTimeout(function () { $('#sendmailresult.success').slideUp() }, 3000);
        } else if ($('#sendmailresult.error').length && $emailFormContainer.hasClass("hidden") == true) {
            $contactFormButton.click();
        }
    }

    function expandForm() {
        $(this).find("img").toggle();
        $emailFormContainer.slideToggle(400, "easeOutExpo", function () {
            if ($emailFormContainer.is(":visible")) {
                $('html,body').animate({scrollTop: $formTitle.offset().top}, 600, "easeOutQuint", 500, function () {
                    $("#slide6").find("input:first").focus();
                });
            };
        });
        return false;
    }
}

function NavBar() {
    var MENU_CHANGE_MARGIN = 100;
    var titlesOffsets = [];
    var prevSection = null;
    var $menus = $("#menu a[target-slide], .slicknav_menu a[target-slide]");
    var $desktopMenuEntries = $("#menu").find("a");
    var $scrollMenuProgress = $(".menuScrollProgress");
    var $header = $("#header");

    this.init = function(scrollTop, windowHeight) {
        $(".menuScrollProgress").removeClass("hidden");
        this.reinit(scrollTop, windowHeight);
        $menus.click(onMenuItemClicked);
    }

    this.reinit = function(scrollTop, windowHeight) {
        this.reinitTitlesOffsets();
        $('#menu').slicknav({prependTo:'#responsiveMenuContainer'});
        this.color(scrollTop);
        this.selectGoodMenuEntry(scrollTop, windowHeight, true);
    }

    this.reinitTitlesOffsets = function() {
        titlesOffsets = [];
        $(".slide h2").each(function() { titlesOffsets.push($(this).offset().top + $(this).height()); });
    }

    this.color = function(scrollTop) {
        if (scrollTop > 100) {
            $header.addClass("fixed");
        } else if ($header.hasClass("fixed")) {
            $header.removeClass("fixed");
        }
    }

    this.selectGoodMenuEntry = function(scrollTop, windowHeight, force) {
        var currentOffset = scrollTop + windowHeight;
        for (var i = 0; i < titlesOffsets.length; i++) {
            if (currentOffset >= titlesOffsets[i] + MENU_CHANGE_MARGIN) {
                var lastSection = i;
            } else {
                break;
            }
        }
        if (prevSection != lastSection || force == true) {
            $menus.removeClass("active").filter('[target-slide='+ (lastSection + 1) +']').addClass('active');
            $scrollMenuProgress.css("left", $desktopMenuEntries.filter("[target-slide="+(lastSection + 1)+"]").offset().left);
            $scrollMenuProgress.css("width", $($desktopMenuEntries.get(lastSection)).width() - 2);
        }
        prevSection = lastSection;
    }

    function onMenuItemClicked() {
        $('html,body').animate({scrollTop: $($(this).attr("href")).offset().top}, 1000, "easeOutQuart");
        return false;
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

$(document).ready(function() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var navBar = new NavBar();
    var contactForm = new ContactForm();

    contactForm.init();
    navBar.init(scrollTop, windowHeight);

    // Scroll monitor
    function scrollHandler(force) {
        scrollTop = $(window).scrollTop();
        navBar.selectGoodMenuEntry(scrollTop, windowHeight, force);
        navBar.color(scrollTop);
    }
    $(window).scroll(debounce(scrollHandler, 100));

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {setInterval(function () {scrollHandler(true);}, 1000);} // Ugly hack for firefox

    // Resize monitor
    $(window).resize(debounce(function() {
        windowHeight = $(window).height();
        navBar.reinit(scrollTop, windowHeight, true);
    }, 300));

    $("#btnExpandWorkExperiences").click(function() {
        $(this).slideUp(400, "easeOutQuart");
        $("#secondaryExperiences").slideToggle(400, "easeOutQuart");
        navBar.reinitTitlesOffsets();
    });

    scrollHandler(true);
    navBar.reinit($(window).scrollTop(), $(window).height(), true);
});