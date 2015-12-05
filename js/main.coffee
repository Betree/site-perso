$(window).load ->
  navBar = new NavBar
  navBar.update($(window).scrollTop())

  # Scroll monitor
  $(window).scroll ->
    navBar.update($(window).scrollTop())

  # Resize monitor
  $(window).resize ->
    navBar.buildMenuLinks()

  # Expand work experiences button on click
  $('#btnExpandWorkExperiences').click ->
    $(this).slideUp 400, 'easeOutQuart'
    $('#secondaryExperiences').slideToggle 400, 'easeOutQuart'


class NavBar
  constructor: ->
    @$header = $('#header')
    @menuLinks = []
    @isFixed = @$header.hasClass('fixed')
    @progressBar = $('#menuScrollProgress')
    @progressBar.removeClass 'hidden'

    # Build menu entries and activate click on them
    @buildMenuLinks()
    menuLink.activateClick() for menuLink in @menuLinks

  buildMenuLinks: =>
    $links = ($(link) for link in $('#menu').find('> li > a'))
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
    @progressBar.css('left', menuLink.offsetLeft)
    @progressBar.css('width', menuLink.width)

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

  activateClick: () ->
    @$this.click (e) =>
      $link = $(e.currentTarget)
      scrollOffset = $($link.attr('href')).offset().top
      $('html,body').animate {scrollTop: scrollOffset}, 1000, 'easeOutQuart'
      $('#menu a').removeClass('active')
      $link.addClass('active')
      false

