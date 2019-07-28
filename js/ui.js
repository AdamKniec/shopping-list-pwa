(function toggleNavbar() {
  let hamburgerButton = document.querySelector(".hamburger");
  let container = document.querySelector(".container");
  let sideNav = document.querySelector(".list");

  container.addEventListener("click", handleHamburgerClick);
  function handleHamburgerClick(e) {
    if (e.target === hamburgerButton || e.target === sideNav) {
      sideNav.classList.add("visible");
    } else {
      sideNav.classList.remove("visible");
    }
  }
})();
