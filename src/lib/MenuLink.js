export default class MenuLink {
  constructor($link, linkNum, offsetLeft) {
    this.setActive = this.setActive.bind(this)
    this.linkNum = linkNum
    this.offsetLeft = offsetLeft
    this.$this = $link
    this.width = $link.width()
    this.targetOffsetTop = $(this.$this.attr('href')).offset().top
  }

  updateTargetOffsetTop() {
    return this.targetOffsetTop = $(this.$this.attr('href')).offset().top
  }

  setActive() {
    return this.$this.addClass('active')
  }

  activateClick() {
    return this.$this.click(e => {
      const scrollOffset = $($(e.currentTarget).attr('href')).offset().top
      $('html,body').animate({ scrollTop: scrollOffset }, 1000, 'easeOutQuart')
      return false
    })
  }
}
