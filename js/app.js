document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. MOBILE HAMBURGER MENU TOGGLE
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navbar.classList.toggle("active");
    });

    // Close menu when clicking a nav link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navbar.classList.remove("active");
      });
    });
  }

  // ==========================================
  // 2. STICKY HEADER ON SCROLL
  // ==========================================
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // ==========================================
  // 3. HEART ICON FAVORITE TOGGLE
  // ==========================================
  const heartIcons = document.querySelectorAll(".heart-icon, .fa-heart");

  heartIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevents clicking card link
      
      icon.classList.toggle("favorited");
      
      if (icon.classList.contains("favorited")) {
        icon.style.color = "#ff385c"; // Heart turns red when favorited
      } else {
        icon.style.color = ""; // Resets to default CSS color
      }
    });
  });

  /* ==========================================================================
     3. FAVORITES SYSTEM (LOCAL STORAGE)
     ========================================================================== */
  const heartBtns = document.querySelectorAll(".heart-btn");

  if (heartBtns.length > 0) {
    let savedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];

    heartBtns.forEach(btn => {
      // Get ID from button data-id or parent card ID
      const propId = btn.getAttribute("data-id") || btn.closest(".property-card")?.id;
      const icon = btn.querySelector("i");

      // Set initial active state from storage
      if (savedFavorites.includes(propId)) {
        btn.classList.add("active");
        if (icon) {
          icon.classList.remove("far");
          icon.classList.add("fas");
        }
      }

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents the <a> link from opening property details

        if (!propId) return;

        if (savedFavorites.includes(propId)) {
          savedFavorites = savedFavorites.filter(id => id !== propId);
          btn.classList.remove("active");
          if (icon) {
            icon.classList.remove("fas");
            icon.classList.add("far");
          }
        } else {
          savedFavorites.push(propId);
          btn.classList.add("active");
          if (icon) {
            icon.classList.remove("far");
            icon.classList.add("fas");
          }
        }

        localStorage.setItem("favoriteProperties", JSON.stringify(savedFavorites));
      });
    });
  }

  // ==========================================
  // 4. PROPERTY SEARCH REDIRECT
  // ==========================================
  const searchForm = document.querySelector(".search-filter-bar");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const location = document.getElementById("hero-location")?.value || "";
      const type = document.getElementById("hero-type")?.value || "";
      const price = document.getElementById("hero-price")?.value || "";

      // Redirects to properties page with active search parameters
      window.location.href = `properties.html?location=${location}&type=${type}&price=${price}`;
    });
  }

});

/* ==========================================================================
   HERO VIDEO POPUP LOGIC (HOME PAGE)
   ========================================================================== */
const openVideoBtn = document.getElementById("open-video-btn");
const videoModal = document.getElementById("video-modal");
const closeVideoBtn = document.getElementById("close-video-modal");
const videoFrame = document.getElementById("video-frame");

// Real Estate Video ID (Replace with your own YouTube video ID if desired)
const youtubeVideoId = "L61p2uyiMSo";

if (openVideoBtn && videoModal && videoFrame) {
  openVideoBtn.addEventListener("click", () => {
    videoFrame.src = "https://www.youtube.com/embed/bzeDjtnhmh0?autoplay=1&rel=0";
    videoModal.style.display = "flex";
  });

  const stopAndCloseVideo = () => {
    videoFrame.src = ""; // Stops video playback
    videoModal.style.display = "none";
  };

  if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", stopAndCloseVideo);
  }

  window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      stopAndCloseVideo();
    }
  });
}

// SORT LIST
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sort-properties');
  const propertiesGrid = document.querySelector('.properties-grid');

  if (sortSelect && propertiesGrid) {
    sortSelect.addEventListener('change', () => {
      const selectedValue = sortSelect.value;
      
      // Get all card links inside the grid
      const cardLinks = Array.from(propertiesGrid.querySelectorAll('.property-card-link'));
      if (cardLinks.length < 2) return;

      cardLinks.sort((a, b) => {
        const cardA = a.querySelector('.property-card');
        const cardB = b.querySelector('.property-card');

        const priceA = parseFloat(cardA.getAttribute('data-price')) || 0;
        const priceB = parseFloat(cardB.getAttribute('data-price')) || 0;
        
        const dateA = new Date(cardA.getAttribute('data-date') || 0).getTime();
        const dateB = new Date(cardB.getAttribute('data-date') || 0).getTime();

        if (selectedValue === 'price-low') {
          return priceA - priceB;
        } else if (selectedValue === 'price-high') {
          return priceB - priceA;
        } else if (selectedValue === 'newest') {
          return dateB - dateA;
        }
        return 0;
      });

      // Re-append cards to grid in the new order
      cardLinks.forEach(link => propertiesGrid.appendChild(link));
    });
  }
});

// ==========================================
// 5. THUMBNAIL IMAGE SWITCHER (For Property Details)
// ==========================================
function changeImage(smallImgSrc) {
  const featuredImage = document.getElementById("featured-image");
  if (featuredImage) {
    featuredImage.src = smallImgSrc;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("propertyModal");
  const closeModalBtn = document.getElementById("closeModal");

  // Log to check if JS is loaded properly
  console.log("Modal JS script loaded!");

  // Listen for clicks on ANY button/card with 'open-modal-btn'
  document.addEventListener("click", (e) => {
    // If user clicks a modal open trigger
    const trigger = e.target.closest(".open-modal-btn");
    
    // Don't open if user clicked heart favorite icon
    if (e.target.closest(".heart-btn")) return;

    if (trigger && modal) {
      e.preventDefault();
      modal.classList.add("active");
    }
  });

  // Close modal when X button is clicked
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // Close modal when clicking background dark overlay
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

/* ==========================================================================
     5. INTERACTIVE PROPERTY DETAILS MODAL
     ========================================================================== */
  const modal = document.getElementById("property-modal");
  const closeModalBtn = document.getElementById("close-modal");

  // Open modal on "Explore Property" click
  document.addEventListener("click", (e) => {
    const exploreBtn = e.target.closest(".open-modal-btn");
    if (!exploreBtn || !modal) return;

    e.preventDefault();
    e.stopPropagation();

    // Get parent card ID
    const card = exploreBtn.closest(".property-card");
    if (!card) return;

    const cardId = card.id;
    const propData = allProperties.find(p => p.id === cardId);

    if (propData) {
      document.getElementById("modal-img").src = propData.image;
      document.getElementById("modal-img").alt = propData.title;
      document.getElementById("modal-title").textContent = propData.title;
      document.getElementById("modal-location").querySelector("span").textContent = propData.location;
      document.getElementById("modal-price").textContent = propData.price;
      document.getElementById("modal-beds").textContent = propData.beds;
      document.getElementById("modal-baths").textContent = propData.baths;
      document.getElementById("modal-sqft").textContent = propData.sqft;

      const badgeEl = document.getElementById("modal-badge");
      badgeEl.textContent = propData.badgeText;
      badgeEl.className = `badge ${propData.badgeClass}`;

      modal.style.display = "flex";
    }
  });

  // Close modal functions
  if (modal) {
    closeModalBtn?.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }


document.addEventListener("DOMContentLoaded", () => {
  let currentCardIndex = 1;
  const totalCards = 8; // Total number of cards

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageLinks = document.querySelectorAll(".pagination .page-item:not(#prev-btn):not(#next-btn)");

  function scrollToCard(index) {
    if (index < 1 || index > totalCards) return;

    currentCardIndex = index;
    const targetCard = document.getElementById(`card-${currentCardIndex}`);

    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth" });
    }

    // Update active highlight on pagination numbers
    pageLinks.forEach((item, idx) => {
      if (idx + 1 === currentCardIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update disabled state for arrows
    if (currentCardIndex === 1) {
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.classList.remove("disabled");
    }

    if (currentCardIndex === totalCards) {
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.classList.remove("disabled");
    }
  }

  // Handle Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentCardIndex < totalCards) {
        scrollToCard(currentCardIndex + 1);
      }
    });
  }

  // Handle Prev button click
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentCardIndex > 1) {
        scrollToCard(currentCardIndex - 1);
      }
    });
  }

  // Handle direct number clicks (1, 2, 3...)
  pageLinks.forEach((item, idx) => {
    item.addEventListener("click", () => {
      scrollToCard(idx + 1);
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const filterForm = document.querySelector(".search-filter-bar");
  const filterLocation = document.getElementById("filter-location");
  const filterType = document.getElementById("filter-type");
  const filterPrice = document.getElementById("filter-price");
  const filterBed = document.getElementById("filter-bed");
  const resetButton = document.getElementById("reset-filters");
  const noResultsElement = document.getElementById("no-results");
  
  const propertyLinks = document.querySelectorAll(".property-card-link");

  function filterProperties(e) {
    if (e) e.preventDefault();

    const selectedLocation = filterLocation ? filterLocation.value.toLowerCase().trim() : "all";
    const selectedType = filterType ? filterType.value.toLowerCase().trim() : "all";
    const selectedPrice = filterPrice ? filterPrice.value : "all";
    const selectedBed = filterBed ? filterBed.value : "all";

    let visibleCount = 0;

    propertyLinks.forEach(link => {
      const card = link.querySelector(".property-card");
      if (!card) return;

      const cardLocation = (card.getAttribute("data-location") || "").toLowerCase().trim();
      const cardType = (card.getAttribute("data-type") || "").toLowerCase().trim();
      const cardPrice = parseInt(card.getAttribute("data-price"), 10) || 0;
      const cardBeds = parseInt(card.getAttribute("data-beds"), 10) || 0;

      // 1. Location Matching
      const matchesLocation = (selectedLocation === "all" || cardLocation === selectedLocation);

      // 2. Type Matching
      const matchesType = (selectedType === "all" || cardType === selectedType);

      // 3. Price Matching
      let matchesPrice = true;
      if (selectedPrice === "0-10000") {
        matchesPrice = cardPrice <= 10000;
      } else if (selectedPrice === "10000-500000+") {
        matchesPrice = cardPrice >= 10000 && cardPrice <= 500000;
      } else if (selectedPrice === "500000") {
        matchesPrice = cardPrice >= 500000;
      }

      // 4. Bedroom Matching
      let matchesBed = true;
      if (selectedBed === "1") {
        matchesBed = cardBeds === 1;
      } else if (selectedBed === "2") {
        matchesBed = cardBeds === 2;
      } else if (selectedBed === "3+") {
        matchesBed = cardBeds >= 3;
      }

      // Show or Hide card
      if (matchesLocation && matchesType && matchesPrice && matchesBed) {
        link.style.display = "";
        visibleCount++;
      } else {
        link.style.display = "none";
      }
    });

    // Toggle No Results Message
    if (noResultsElement) {
      noResultsElement.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  // Live filtering on dropdown change
  [filterLocation, filterType, filterPrice, filterBed].forEach(select => {
    if (select) select.addEventListener("change", filterProperties);
  });

  // Filter on Search button submit
  if (filterForm) {
    filterForm.addEventListener("submit", filterProperties);
  }

  // Reset filters
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      setTimeout(filterProperties, 0);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const messageInput = document.getElementById("userMessage");
  const toast = document.getElementById("toast");

  if (!form) return;

  function showError(input, errorEl, message) {
    input.classList.add("input-error");
    errorEl.textContent = message;
    errorEl.style.display = "block";
  }

  function clearError(input, errorEl) {
    input.classList.remove("input-error");
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    if (nameInput.value.trim() === "") {
      showError(nameInput, document.getElementById("nameError"), "Name is required.");
      isValid = false;
    } else {
      clearError(nameInput, document.getElementById("nameError"));
    }

    // Email Validation
    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, document.getElementById("emailError"), "Enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput, document.getElementById("emailError"));
    }

    // Message Validation
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, document.getElementById("messageError"), "Message must be at least 10 characters.");
      isValid = false;
    } else {
      clearError(messageInput, document.getElementById("messageError"));
    }

    // Show Toast on Success
    if (isValid) {
      toast.classList.add("show");
      form.reset();
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {

  // Master array containing property data
  const allProperties = [
    {
      id: "card-1",
      badgeClass: "sale",
      badgeText: "For Sale",
      image: "/image/luxe.jpg",
      price: "$850,000",
      title: "Modern Home",
      location: "123 Maple Street, New York",
      beds: "4 Beds",
      baths: "3 Baths",
      sqft: "2500 sqft"
    },
    {
      id: "card-2",
      badgeClass: "rent",
      badgeText: "For Rent",
      image: "/image/hux1.jpg",
      price: "$2,500 /month",
      title: "Luxury Apartment",
      location: "456 Oak Avenue, New York",
      beds: "2 Beds",
      baths: "2 Baths",
      sqft: "1200 sqft"
    },
    {
      id: "card-3",
      badgeClass: "sale",
      badgeText: "For Sale",
      image: "/image/hux2.jpg",
      price: "$1,250,000",
      title: "Beautiful Villa",
      location: "789 Pine Road, Los Angeles",
      beds: "5 Beds",
      baths: "4 Baths",
      sqft: "3500 sqft"
    },
    {
      id: "card-4",
      badgeClass: "rent",
      badgeText: "For Rent",
      image: "/image/gorgia hux.jpg",
      price: "$1,800 /month",
      title: "Downtown Condo",
      location: "321 Elm Street, Chicago",
      beds: "1 Bed",
      baths: "1 Bath",
      sqft: "800 sqft"
    },
    {
      id: "card-5",
      badgeClass: "sale",
      badgeText: "For Sale",
      image: "/image/dream hux.jpg",
      price: "$950,000",
      title: "Lakeview Residence",
      location: "4521 Lakeshore Drive, Miami, FL",
      beds: "3 Bed",
      baths: "2 Bath",
      sqft: "2,120 sqft"
    },
    {
      id: "card-6",
      badgeClass: "rent",
      badgeText: "For Rent",
      image: "/image/luna room.jpg",
      price: "$2,200 /month",
      title: "Maplewood Estate",
      location: "781 Maple Street, New York, NY",
      beds: "2 Bed",
      baths: "1 Bath",
      sqft: "1000 sqft"
    },
    {
      id: "card-7",
      badgeClass: "sale",
      badgeText: "For Sale",
      image: "/image/seren room.jpg",
      price: "$1,450,000",
      title: "Sunset Ridge",
      location: "319 Sunset Ridge Lane, Denver, CO",
      beds: "4 Bed",
      baths: "3 Bath",
      sqft: "2,500 sqft"
    },
    {
      id: "card-8",
      badgeClass: "rent",
      badgeText: "For Rent",
      image: "/image/naturehux.jpg",
      price: "$2,000 /month",
      title: "Washington Manor",
      location: "625 Jefferson Street, Washington, DC",
      beds: "1 Bed",
      baths: "1 Bath",
      sqft: "900 sqft"
    }
  ];

  /* --------------------------------------------------
     1. HELPER: UPDATE HEADER COUNTER BADGE
     -------------------------------------------------- */
  function updateFavBadge() {
    const badge = document.getElementById("fav-count");
    if (!badge) return;
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
    badge.textContent = savedFavorites.length;
  }

  // Initial badge update on load
  updateFavBadge();

  /* --------------------------------------------------
     2. FAVORITES TOGGLE (CLICK EVENT)
     -------------------------------------------------- */
  document.addEventListener("click", (e) => {
    const heartBtn = e.target.closest(".heart-btn");
    if (!heartBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const cardId = heartBtn.getAttribute("data-id");
    let savedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];

    if (savedFavorites.includes(cardId)) {
      // Remove from favorites
      savedFavorites = savedFavorites.filter(id => id !== cardId);
      heartBtn.classList.remove("active");
      heartBtn.querySelector("i").className = "far fa-heart";
    } else {
      // Add to favorites
      savedFavorites.push(cardId);
      heartBtn.classList.add("active");
      heartBtn.querySelector("i").className = "fas fa-heart";
    }

    localStorage.setItem("favoriteProperties", JSON.stringify(savedFavorites));
    updateFavBadge();

    // Re-render list if currently on favorites.html
    if (document.getElementById("favorites-grid")) {
      renderFavoritesPage();
    }
  });

  /* --------------------------------------------------
     3. SET HEART STATES ON INITIAL PAGE LOAD
     -------------------------------------------------- */
  const savedFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
  document.querySelectorAll(".heart-btn").forEach(btn => {
    const cardId = btn.getAttribute("data-id");
    if (savedFavorites.includes(cardId)) {
      btn.classList.add("active");
      btn.querySelector("i").className = "fas fa-heart";
    }
  });

  /* --------------------------------------------------
     4. RENDER FAVORITES PAGE LOGIC
     -------------------------------------------------- */
  function renderFavoritesPage() {
    const favoritesGrid = document.getElementById("favorites-grid");
    const noFavoritesEl = document.getElementById("no-favorites");

    if (!favoritesGrid) return;

    const currentFavorites = JSON.parse(localStorage.getItem("favoriteProperties")) || [];
    const favoritedList = allProperties.filter(prop => currentFavorites.includes(prop.id));

    if (favoritedList.length === 0) {
      favoritesGrid.innerHTML = "";
      if (noFavoritesEl) noFavoritesEl.style.display = "block";
    } else {
      if (noFavoritesEl) noFavoritesEl.style.display = "none";

      favoritesGrid.innerHTML = favoritedList.map(prop => `
        <a href="property-details.html" class="property-card-link">
          <div class="property-card" id="${prop.id}">
            <div class="card-thumb">
              <span class="badge ${prop.badgeClass}">${prop.badgeText}</span>
              <button type="button" class="heart-btn active" data-id="${prop.id}" aria-label="Save to favorites">
                <i class="fas fa-heart"></i>
              </button>
              <img src="${prop.image}" alt="${prop.title}">
            </div>
            <div class="card-body">
              <div class="card-price">${prop.price}</div>
              <h3 class="card-title">${prop.title}</h3>
              <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${prop.location}</p>
              <div class="card-specs">
                <span><i class="fas fa-bed"></i> ${prop.beds}</span>
                <span><i class="fas fa-bath"></i> ${prop.baths}</span>
                <span><i class="fas fa-ruler-combined"></i> ${prop.sqft}</span>
              </div>
              <button type="button" class="btn-explore open-modal-btn">
                Explore Property <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </a>
      `).join("");
    }
  }

  // Execute render if on favorites page
  renderFavoritesPage();

});

/* ==========================================================================
   DYNAMIC PRICE RANGE SLIDER FILTER
   ========================================================================== */
const priceSlider = document.getElementById("price-range");
const priceValueDisplay = document.getElementById("price-value");

if (priceSlider && priceValueDisplay) {
  
  // Helper to parse numeric dollar amounts from price strings like "$850,000 /month"
  function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  }

  // Helper to update active track color background
  function updateSliderTrack(slider) {
    const min = slider.min || 10000;
    const max = slider.max || 1500000;
    const val = slider.value;
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #ff5a3c ${percentage}%, #4a4a4a ${percentage}%)`;
  }

  // Filter properties in real-time on slider input
  function filterByPrice() {
    const maxBudget = parseInt(priceSlider.value, 10);
    
    // Update display label
    priceValueDisplay.textContent = `$${maxBudget.toLocaleString()}${maxBudget >= 1500000 ? '+' : ''}`;
    updateSliderTrack(priceSlider);

    // Filter property cards rendered on page
    const propertyCards = document.querySelectorAll(".property-card");
    propertyCards.forEach(card => {
      const cardId = card.id;
      const propData = allProperties.find(p => p.id === cardId);

      if (propData) {
        const numericPrice = parsePrice(propData.price);
        // Show if price is under budget, otherwise hide
        const cardContainer = card.closest(".property-card-link") || card;
        if (numericPrice <= maxBudget) {
          cardContainer.style.display = "";
        } else {
          cardContainer.style.display = "none";
        }
      }
    });
  }

  // Event listener for live dragging
  priceSlider.addEventListener("input", filterByPrice);

  // Initial call on page load
  updateSliderTrack(priceSlider);
}

