const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

document.querySelectorAll(".norris-hover").forEach((element) => {
  const segments = [...segmenter.segment(element.textContent)];
  const url = element.getAttribute("href");

  element.textContent = "";

  segments.forEach((segment, i) => {
    const char = segment.segment;

    if (char === " ") {
      const space = document.createElement("span");
      space.className = "letter space";
      space.innerHTML = "&nbsp;";
      element.appendChild(space);
      return;
    }

    const wrapper = document.createElement("span");
    wrapper.className = "letter";
    wrapper.style.setProperty("--i", i);

    wrapper.innerHTML = `
      <span class="top">${char}</span>
      <span class="bottom">${char}</span>
    `;
    element.appendChild(wrapper);
  });

  // click animation + delayed navigation
  element.addEventListener("click", (e) => {
    if (url) e.preventDefault();
    element.classList.add("pressed");

    setTimeout(() => {
      element.classList.remove("pressed");
      if (url) window.open(url, "_blank");
    }, 220);
  });
});
