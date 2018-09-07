// JQuery as global
import $ from 'jquery'
window.$ = $
window.jQuery = $

// Import vendor libraries
import 'slicknav/jquery.slicknav.js'
import 'jquery.easing'

// Import custom libraries
import NavBar from './lib/NavBar.js'
import decryptEmail from './lib/decrypt_email'

// Import styles
import "./styles/slicknav.css"
import "./styles/style.css"
import "./styles/style_mobile.css"


$(document).ready(function () {
  // Add email to mailto: on hover (anti-bot)
  $('#contactFormButton.hidden_email').hover(function () {
    const emailAddress = decryptEmail('bW9jLmxpYW1nQGVsZmZ1b2lwLm5pbWFqbmVi')
    $(this).attr('href', `mailto:${emailAddress}`).removeClass('hidden_email')
  })

  // Show contact service provider on hover
  const $contactIcon = $('.contactIcon')
  const $contactText = $('#contact_text')

  // Show contact types labels
  $contactIcon
    .mouseenter(function () {$contactText.text($(this).attr('alt'))})
    .mouseleave(() => $contactText.text(''))
})


$(window).on('load', function () {
  const navBar = new NavBar
  navBar.update($(window).scrollTop())

  // Scroll monitor
  $(window).scroll(() => navBar.update($(window).scrollTop()))

  // Resize monitor
  $(window).resize(() => navBar.buildMenuLinks())
})
