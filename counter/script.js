const $counter = document.getElementById("js-counter");

document.getElementById("js-button").addEventListener("click", () => {
    let currentCount = parseInt($counter.textContent);
    $counter.textContent = currentCount + 1;
});