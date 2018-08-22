$(document).ready ->
  # Add email to mailto: on hover (anti-bot)
  $('#contactFormButton.hidden_email').hover ->
    emailAddress = atob('bW9jLmxpYW1nQGVsZmZ1b2lwLm5pbWFqbmVi').split("").reverse().join("")
    $(this).attr('href', "mailto:#{emailAddress}")
    $(this).removeClass('hidden_email')

  # Show contact service provider on hover
  $contactIcon = $('.contactIcon')
  $contactText = $('#contact_text')

  # Show contact types labels
  $contactIcon.mouseenter ->
    $contactText.text($(this).attr('alt'))
  $contactIcon.mouseleave ->
    $contactText.text('')


$(window).load ->
  navBar = new NavBar
  navBar.update($(window).scrollTop())

  # Scroll monitor
  $(window).scroll ->
    navBar.update($(window).scrollTop())

  # Resize monitor
  $(window).resize ->
    navBar.buildMenuLinks()


class NavBar
  constructor: ->
    @$header = $('#header')
    @menuLinks = []
    @isFixed = @$header.hasClass('fixed')
    @progressBar = $('#menuScrollProgress')
    @progressBar.removeClass 'hidden'
    @currentMenuLink = null
    $('#menu').slicknav({prependTo:'#responsiveMenuContainer', closeOnClick: true});

    # Build menu entries and activate click on them
    @buildMenuLinks()
    menuLink.activateClick() for menuLink in @menuLinks

  buildMenuLinks: =>
    $links = ($(link) for link in $('#menu').find('> li:not(.external) > a'))
    menuOffsetLeft = $links[0].offset().left
    offset_left = 0
    @menuLinks = []
    for entry, entryIndex in $links
      offset_left = entry.offset().left - menuOffsetLeft
      @menuLinks.push new MenuLink($(entry), entryIndex++, offset_left)
    @update($(window).scrollTop())

  update: (scrollTop) ->
    @colorize scrollTop
    @updateProgressBar scrollTop

  colorize: (scrollTop) ->
    if scrollTop > 100
      if !@isFixed
        @$header.addClass 'fixed'
        @isFixed = true
    else if @isFixed
      @$header.removeClass 'fixed'
      @isFixed = false

  updateProgressBar: (scrollPosition) ->
    menuLink = @getCurrentMenuLink(scrollPosition)
    if @currentMenuLink != menuLink
      @currentMenuLink = menuLink
      @progressBar.css('left', menuLink.offsetLeft)
      @progressBar.css('width', menuLink.width)
      $('#menu a').removeClass('active')
      menuLink.setActive()

  getCurrentMenuLink: (scrollPosition) ->
    for menuLink in @menuLinks by -1
      if menuLink.targetOffsetTop <= scrollPosition + 100
        return menuLink

class MenuLink
  constructor: ($link, @linkNum, @offsetLeft) ->
    @$this = $link
    @width = $link.width()
    @targetOffsetTop = $(@$this.attr('href')).offset().top

  updateTargetOffsetTop: ->
    @targetOffsetTop = $(@$this.attr('href')).offset().top

  setActive: =>
    @$this.addClass('active')

  activateClick: () ->
    @$this.click (e) =>
      scrollOffset = $($(e.currentTarget).attr('href')).offset().top
      $('html,body').animate {scrollTop: scrollOffset}, 1000, 'easeOutQuart'
      false
