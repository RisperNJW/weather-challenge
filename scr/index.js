function submitSearch (event) {
    event.preventDefault();
    let searchInput = document.getElementById("search-bar");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);
