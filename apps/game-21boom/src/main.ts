const btn = document.getElementById("start-btn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  btn.textContent = "Game starting…";
  btn.disabled = true;
});
