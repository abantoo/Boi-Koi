const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");
const card_action = document.querySelector(".card__actions");
const card_content = document.querySelector(".card__content");
const card = document.querySelector(".card");

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

function notShowFullCard() {
  card_action.style.display = "none";
}
function showFullCard() {
  card_action.classList.remove("hidden");
  card_content.classList.remove("hidden");
}

function hideFullCard() {
  card_action.classList.add("hidden");
  card_content.classList.add("hidden");
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
// card.addEventListener("mouseover", showFullCard);
// card.addEventListener("mouseout", hideFullCard);
