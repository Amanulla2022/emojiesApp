let emojiContainer = document.querySelector("#search_result_container");

const displayEmojis = () => {
  emojiList.forEach((e) => {
    let new_row = document.createElement("tr");
    new_row.innerHTML = `
        <td class="emoji">${e.emoji}</td>
        <td class="aliases">${e.aliases}</td>
        <td class="disc">${e.description}</td>
    `;
    emojiContainer.appendChild(new_row);
  });
};

window.onload = () => displayEmojis();

function searchAndAppend(searchStr) {
  const filtered = emojiList.filter((e) => {
    if (e.description.indexOf(searchStr) !== -1) {
      return true;
    }
    if (e.aliases.some((elem) => elem.startsWith(searchStr))) {
      return true;
    }
    if (e.tags.some((elem) => elem.startsWith(searchStr))) {
      return true;
    }
  });

  while (emojiContainer.firstChild) {
    emojiContainer.removeChild(emojiContainer.firstChild);
  }

  filtered.forEach((e) => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="emoji">${e.emoji}</td>
        <td class="aliases">${e.aliases}</td>
        <td class="disc">${e.description}</td>
        `;
    emojiContainer.appendChild(newRow);
  });
}

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchStr = e.target.children[0].value;
  if (searchStr === "") {
    alert("Please enter a valid string!");
  } else {
    searchAndAppend(searchStr);
  }
});

let searchBox = document.querySelector("#search_field");

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

let debouncedSearchAndAppend = debounce(searchAndAppend, 500);

searchBox.addEventListener("keyup", function (e) {
  let searchStr = e.target.value;
  debouncedSearchAndAppend(searchStr);
});

document.body.addEventListener("click", function (e) {
  if (
    e.target.tagName === "SPAN" &&
    e.target.parentNode.id === "tag_container"
  ) {
    let tag = e.target.textContent;
    searchAndAppend(tag);
  }

  if (e.target.classList.contains("tag-btn")) {
    let tag = e.target.dataset.tag;
    searchAndAppend(tag);
  }
});
