// Runs before the page paints so dark mode / Arabic layout don't flash. (Kept as a file so a strict CSP can stay on.)
(function () {
  try {
    var lang = localStorage.getItem("menu-lang") === "ar" ? "ar" : "en";
    var saved = localStorage.getItem("menu-theme");
    var dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var r = document.documentElement;
    r.lang = lang;
    r.dir = lang === "ar" ? "rtl" : "ltr";
    r.style.fontSize = lang === "ar" ? "17.5px" : "16px";
    if (dark) r.classList.add("dark");
  } catch (e) {}
})();
