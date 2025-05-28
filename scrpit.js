// DOM Elements
const navbar = document.querySelector(".navbar")
const searchInput = document.querySelector(".search-input")
const courseCards = document.querySelectorAll(".course-card")
const categoryCards = document.querySelectorAll(".category-card")
const favoriteButtons = document.querySelectorAll(".btn-favorite")
const carouselBtns = document.querySelectorAll(".carousel-btn")
const dots = document.querySelectorAll(".dot")
const navIcons = document.querySelectorAll(".nav-icons i")

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#fff"
    navbar.style.backdropFilter = "none"
  }
})

// Search functionality
if (searchInput) {
  searchInput.addEventListener("focus", () => {
    searchInput.parentElement.style.transform = "scale(1.05)"
  })

  searchInput.addEventListener("blur", () => {
    searchInput.parentElement.style.transform = "scale(1)"
  })
}

// Course card animations
courseCards.forEach((card, index) => {
  // Add loading animation
  card.classList.add("loading")

  // Stagger animation
  setTimeout(() => {
    card.style.animationDelay = `${index * 0.1}s`
  }, 100)

  // Hover effects for course images
  const courseImg = card.querySelector(".course-img")
  const overlay = card.querySelector(".course-overlay")

  if (courseImg && overlay) {
    card.addEventListener("mouseenter", () => {
      courseImg.style.transform = "scale(1.1) rotate(2deg)"
      overlay.style.opacity = "1"

      // Add floating animation to the card
      card.style.animation = "float 3s ease-in-out infinite"
    })

    card.addEventListener("mouseleave", () => {
      courseImg.style.transform = "scale(1) rotate(0deg)"
      overlay.style.opacity = "0"
      card.style.animation = "none"
    })
  }
})

// Category card interactions
categoryCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.05)"

    const icon = card.querySelector(".category-icon")
    if (icon) {
      icon.style.animation = "bounce 1s ease-in-out infinite"
    }
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"

    const icon = card.querySelector(".category-icon")
    if (icon) {
      icon.style.animation = "none"
    }
  })

  // Click effect
  card.addEventListener("click", () => {
    card.style.transform = "scale(0.95)"
    setTimeout(() => {
      card.style.transform = "translateY(-15px) scale(1.05)"
    }, 150)
  })
})

// Favorite button functionality
favoriteButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()

    btn.classList.toggle("active")

    if (btn.classList.contains("active")) {
      btn.innerHTML = '<i class="fas fa-heart"></i>'
      btn.style.animation = "pulse 0.5s ease-in-out"

      // Create floating heart effect
      createFloatingHeart(btn)
    } else {
      btn.innerHTML = '<i class="far fa-heart"></i>'
      btn.style.animation = "none"
    }

    setTimeout(() => {
      btn.style.animation = "none"
    }, 500)
  })
})

// Floating heart effect
function createFloatingHeart(button) {
  const heart = document.createElement("div")
  heart.innerHTML = "❤️"
  heart.style.position = "absolute"
  heart.style.fontSize = "20px"
  heart.style.pointerEvents = "none"
  heart.style.zIndex = "1000"

  const rect = button.getBoundingClientRect()
  heart.style.left = rect.left + "px"
  heart.style.top = rect.top + "px"

  document.body.appendChild(heart)

  // Animate the heart
  heart.animate(
    [
      { transform: "translateY(0) scale(1)", opacity: 1 },
      { transform: "translateY(-50px) scale(1.5)", opacity: 0 },
    ],
    {
      duration: 1000,
      easing: "ease-out",
    },
  ).onfinish = () => {
    heart.remove()
  }
}

// Carousel functionality
let currentSlide = 0
const slides = document.querySelectorAll(".slide")

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index)
  })

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
}

// Auto-play carousel
if (slides.length > 0) {
  setInterval(nextSlide, 5000)
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Navigation icon effects
navIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.animation = "bounce 0.5s ease-in-out"
  })

  icon.addEventListener("mouseleave", () => {
    icon.style.animation = "none"
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Add scroll animation to elements
document.querySelectorAll(".course-card, .category-card, .section-title").forEach((el) => {
  el.classList.add("scroll-animate")
  observer.observe(el)
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Course carousel navigation
carouselBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isNext = btn.classList.contains("next-btn")
    const coursesGrid = btn.parentElement.querySelector(".courses-grid")
    const scrollAmount = 300

    if (coursesGrid) {
      if (isNext) {
        coursesGrid.scrollBy({ left: scrollAmount, behavior: "smooth" })
      } else {
        coursesGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      }
    }

    // Button animation
    btn.style.transform = "translateY(-50%) scale(0.9)"
    setTimeout(() => {
      btn.style.transform = "translateY(-50%) scale(1)"
    }, 150)
  })
})

// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
}

// Apply ripple effect to buttons
document.querySelectorAll(".btn-options, .cta-button, .view-all-btn").forEach(addRippleEffect)

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`

const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)

// Loading screen
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Performance optimization: Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src || img.src
      img.classList.add("loaded")
      imageObserver.unobserve(img)
    }
  })
})

document.querySelectorAll("img").forEach((img) => {
  imageObserver.observe(img)
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Mobile menu functionality
const menuToggle = document.querySelector(".menu-toggle")
const navLeft = document.querySelector(".nav-left")
const navRight = document.querySelector(".nav-right")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLeft.classList.toggle("mobile-active")
    navRight.classList.toggle("mobile-active")
  })
}

// Filter functionality for courses page
const filterCheckboxes = document.querySelectorAll(".filter-checkbox input")
const btnFilterApply = document.querySelector(".btn-filter-apply")
const btnFilterReset = document.querySelector(".btn-filter-reset")

if (filterCheckboxes.length > 0 && btnFilterApply && btnFilterReset) {
  btnFilterApply.addEventListener("click", () => {
    // Get selected filters
    const selectedCategories = Array.from(
      document.querySelectorAll('.filter-checkbox input[name="category"]:checked'),
    ).map((checkbox) => checkbox.value)

    const selectedLevels = Array.from(document.querySelectorAll('.filter-checkbox input[name="level"]:checked')).map(
      (checkbox) => checkbox.value,
    )

    // Apply filters to course cards
    const allCourseCards = document.querySelectorAll(".course-card")
    allCourseCards.forEach((card) => {
      const category = card.dataset.category
      const level = card.dataset.level

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category)
      const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(level)

      if (categoryMatch && levelMatch) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.5s ease-in-out"
      } else {
        card.style.display = "none"
      }
    })

    console.log("Filtros aplicados:", { selectedCategories, selectedLevels })
  })

  btnFilterReset.addEventListener("click", () => {
    // Reset all checkboxes
    filterCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    // Show all course cards
    const allCourseCards = document.querySelectorAll(".course-card")
    allCourseCards.forEach((card) => {
      card.style.display = "block"
    })

    console.log("Filtros restablecidos")
  })
}

console.log("🎉 Cursos loaded successfully with enhanced animations!")
