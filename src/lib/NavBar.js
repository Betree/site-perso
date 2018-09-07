import MenuLink from './MenuLink'

export default class NavBar {
  constructor() {
    this.buildMenuLinks = this.buildMenuLinks.bind(this)
    this.$header = $('#header')
    this.menuLinks = []
    this.isFixed = this.$header.hasClass('fixed')
    this.progressBar = $('#menuScrollProgress')
    this.progressBar.removeClass('hidden')
    this.currentMenuLink = null
    $('#menu').slicknav({ prependTo: '#responsiveMenuContainer', closeOnClick: true })

    // Build menu entries and activate click on them
    this.buildMenuLinks()
    for (let menuLink of Array.from(this.menuLinks)) { menuLink.activateClick(); }
  }

  buildMenuLinks() {
    const $links = (Array.from($('#menu').find('> li:not(.external) > a')).map((link) => $(link)))
    const menuOffsetLeft = $links[0].offset().left
    let offset_left = 0
    this.menuLinks = []
    for (let i = 0, entryIndex = i; i < $links.length; i++ , entryIndex = i) {
      const entry = $links[entryIndex]
      offset_left = entry.offset().left - menuOffsetLeft
      this.menuLinks.push(new MenuLink($(entry), entryIndex++, offset_left))
    }
    return this.update($(window).scrollTop())
  }

  update(scrollTop) {
    this.colorize(scrollTop)
    return this.updateProgressBar(scrollTop)
  }

  colorize(scrollTop) {
    if (scrollTop > 100) {
      if (!this.isFixed) {
        this.$header.addClass('fixed')
        return this.isFixed = true
      }
    } else if (this.isFixed) {
      this.$header.removeClass('fixed')
      return this.isFixed = false
    }
  }

  updateProgressBar(scrollPosition) {
    const menuLink = this.getCurrentMenuLink(scrollPosition)
    if (this.currentMenuLink !== menuLink) {
      this.currentMenuLink = menuLink
      this.progressBar.css('left', menuLink.offsetLeft)
      this.progressBar.css('width', menuLink.width)
      $('#menu a').removeClass('active')
      return menuLink.setActive()
    }
  }

  getCurrentMenuLink(scrollPosition) {
    for (let i = this.menuLinks.length - 1; i >= 0; i--) {
      const menuLink = this.menuLinks[i]
      if (menuLink.targetOffsetTop <= (scrollPosition + 100)) {
        return menuLink
      }
    }
  }
}
