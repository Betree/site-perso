// Generated by CoffeeScript 1.10.0
(function() {
  var MenuLink, NavBar,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(document).ready(function() {
    var $contactIcon, $contactText;
    $('#contactFormButton.hidden_email').hover(function() {
      var emailAddress;
      emailAddress = atob('bW9jLmxpYW1nQGVsZmZ1b2lwLm5pbWFqbmVi').split("").reverse().join("");
      $(this).attr('href', "mailto:" + emailAddress);
      return $(this).removeClass('hidden_email');
    });
    $('#btnExpandWorkExperiences').click(function() {
      $(this).slideUp(400, 'easeOutQuart');
      return $('#secondaryExperiences').slideToggle(400, 'easeOutQuart');
    });
    $contactIcon = $('.contactIcon');
    $contactText = $('#contact_text');
    $contactIcon.mouseenter(function() {
      return $contactText.text($(this).attr('alt'));
    });
    return $contactIcon.mouseleave(function() {
      return $contactText.text('');
    });
  });

  $(window).load(function() {
    var navBar;
    navBar = new NavBar;
    navBar.update($(window).scrollTop());
    $(window).scroll(function() {
      return navBar.update($(window).scrollTop());
    });
    return $(window).resize(function() {
      return navBar.buildMenuLinks();
    });
  });

  NavBar = (function() {
    function NavBar() {
      this.buildMenuLinks = bind(this.buildMenuLinks, this);
      var i, len, menuLink, ref;
      this.$header = $('#header');
      this.menuLinks = [];
      this.isFixed = this.$header.hasClass('fixed');
      this.progressBar = $('#menuScrollProgress');
      this.progressBar.removeClass('hidden');
      this.currentMenuLink = null;
      $('#menu').slicknav({
        prependTo: '#responsiveMenuContainer',
        closeOnClick: true
      });
      this.buildMenuLinks();
      ref = this.menuLinks;
      for (i = 0, len = ref.length; i < len; i++) {
        menuLink = ref[i];
        menuLink.activateClick();
      }
    }

    NavBar.prototype.buildMenuLinks = function() {
      var $links, entry, entryIndex, i, len, link, menuOffsetLeft, offset_left;
      $links = (function() {
        var i, len, ref, results;
        ref = $('#menu').find('> li > a');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          link = ref[i];
          results.push($(link));
        }
        return results;
      })();
      menuOffsetLeft = $links[0].offset().left;
      offset_left = 0;
      this.menuLinks = [];
      for (entryIndex = i = 0, len = $links.length; i < len; entryIndex = ++i) {
        entry = $links[entryIndex];
        offset_left = entry.offset().left - menuOffsetLeft;
        this.menuLinks.push(new MenuLink($(entry), entryIndex++, offset_left));
      }
      return this.update($(window).scrollTop());
    };

    NavBar.prototype.update = function(scrollTop) {
      this.colorize(scrollTop);
      return this.updateProgressBar(scrollTop);
    };

    NavBar.prototype.colorize = function(scrollTop) {
      if (scrollTop > 100) {
        if (!this.isFixed) {
          this.$header.addClass('fixed');
          return this.isFixed = true;
        }
      } else if (this.isFixed) {
        this.$header.removeClass('fixed');
        return this.isFixed = false;
      }
    };

    NavBar.prototype.updateProgressBar = function(scrollPosition) {
      var menuLink;
      menuLink = this.getCurrentMenuLink(scrollPosition);
      if (this.currentMenuLink !== menuLink) {
        this.currentMenuLink = menuLink;
        this.progressBar.css('left', menuLink.offsetLeft);
        this.progressBar.css('width', menuLink.width);
        $('#menu a').removeClass('active');
        return menuLink.setActive();
      }
    };

    NavBar.prototype.getCurrentMenuLink = function(scrollPosition) {
      var i, menuLink, ref;
      ref = this.menuLinks;
      for (i = ref.length - 1; i >= 0; i += -1) {
        menuLink = ref[i];
        if (menuLink.targetOffsetTop <= scrollPosition + 100) {
          return menuLink;
        }
      }
    };

    return NavBar;

  })();

  MenuLink = (function() {
    function MenuLink($link, linkNum, offsetLeft) {
      this.linkNum = linkNum;
      this.offsetLeft = offsetLeft;
      this.setActive = bind(this.setActive, this);
      this.$this = $link;
      this.width = $link.width();
      this.targetOffsetTop = $(this.$this.attr('href')).offset().top;
    }

    MenuLink.prototype.updateTargetOffsetTop = function() {
      return this.targetOffsetTop = $(this.$this.attr('href')).offset().top;
    };

    MenuLink.prototype.setActive = function() {
      return this.$this.addClass('active');
    };

    MenuLink.prototype.activateClick = function() {
      return this.$this.click((function(_this) {
        return function(e) {
          var scrollOffset;
          scrollOffset = $($(e.currentTarget).attr('href')).offset().top;
          $('html,body').animate({
            scrollTop: scrollOffset
          }, 1000, 'easeOutQuart');
          return false;
        };
      })(this));
    };

    return MenuLink;

  })();

}).call(this);

//# sourceMappingURL=main.js.map
