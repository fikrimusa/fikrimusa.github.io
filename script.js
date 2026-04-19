document.addEventListener('DOMContentLoaded', () => {
  const typewriterElement = document.getElementById('typewriter-text')
  const words = [
    'Software Developer',
    'Modern C++ Enthusiast'
  ]

  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function type () {
    const currentWord = words[wordIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1500
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
      typingSpeed = 500
    }

    setTimeout(type, typingSpeed)
  }

  if (typewriterElement) type()

  const mobileMenu = document.querySelector('.mobile-menu')
  const navLinks = document.querySelector('.nav-links')

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active')
      mobileMenu.setAttribute('aria-expanded',
        navLinks.classList.contains('active'))
    })
  }

  const header = document.getElementById('header')

  function updateHeader () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  }

  let scrollTimeout = null
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateHeader()
        scrollTimeout = null
      }, 100)
    }
  })

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active')
        mobileMenu.setAttribute('aria-expanded', 'false')
      }
    })
  })

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      if (targetId === '#') return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: 'smooth'
        })
      }
    })
  })

  updateHeader()
})
