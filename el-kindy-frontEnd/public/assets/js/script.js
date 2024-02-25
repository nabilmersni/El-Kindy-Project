const speakerAnimation = document.querySelector(".speaker-animation");
const notesFlyAnimation = document.querySelector(".notesFly-animation");
const dancingNoteAnimation = document.querySelector(".dancingNote-animation");

var speaker = lottie.loadAnimation({
  container: speakerAnimation,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: speakerAnimation.dataset.animPath,
});

var notesFly = lottie.loadAnimation({
  container: notesFlyAnimation,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: notesFlyAnimation.dataset.animPath,
});

var dancingNote = lottie.loadAnimation({
  container: dancingNoteAnimation,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: dancingNoteAnimation.dataset.animPath,
});

//-----------------------------------------------------------------------------------

const dashMenu = document.querySelector(".dash__content__nav__left-side");
dashMenu.addEventListener("click", () => {
  const sidebarElements = document.querySelectorAll(".dash__sidebar");

  // Utilisez forEach pour itérer sur chaque élément de la NodeList
  sidebarElements.forEach((element) => {
    element.classList.toggle("small");
  });

  // Vous pouvez également utiliser forEach pour d'autres éléments si nécessaire
  document.querySelectorAll(".dash__sidebar__logo").forEach((element) => {
    element.classList.toggle("small");
  });
  document.querySelectorAll(".dash__sidebar__logo__text").forEach((element) => {
    element.classList.toggle("small");
  });
  document.querySelectorAll(".dash__sidebar__items").forEach((element) => {
    element.classList.toggle("small");
  });
  document.querySelectorAll(".dash__sidebar__item").forEach((element) => {
    element.classList.toggle("small");
  });
  document.querySelectorAll(".dash__sidebar__item-icon").forEach((element) => {
    element.classList.toggle("small");
  });
  document.querySelectorAll(".dash__sidebar__item-text").forEach((element) => {
    element.classList.toggle("small");
  });

  document.querySelector(".dash__sidebar__speaker").classList.toggle("small");
  document.querySelector(".dash__sidebar__notesFly").classList.toggle("small");
});
