const initialPage = document.getElementById("initial-page"),
  factPage = document.getElementById("fact-page"),
  factInput = document.getElementById("fact-input"),
  numberBtn = document.getElementById("number-btn"),
  yearBtn = document.getElementById("year-btn"),
  backBtn = document.getElementById("back-btn");

numberBtn.addEventListener("click", (e) => {
  initialPage.style.display = "none";
  factPage.style.display = "block";

  document.getElementById("fact-page-heading").textContent = "Number Facts";
  document.getElementById("fact-page-lead").textContent = "Enter any number to get random Fact...";
  document.getElementById("date-input").style.display = "none";
  factInput.style.display = "block";
  factInput.setAttribute("type", "number");

  factInput.addEventListener("input", () => {
    let inputValue = factInput.value;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", 'http://numbersapi.com/' + inputValue);

    xhr.onload = function () {
      if (this.status === 200 && inputValue != '') {
        document.querySelector("#result-card").style.display = "block";
        document.querySelector("#factText").textContent = this.responseText;
      } else {
        document.querySelector("#result-card").style.display = "none";
      }
    }
    xhr.send();
  });
  e.preventDefault();
})

yearBtn.addEventListener("click", (e) => {
  initialPage.style.display = "none";
  factPage.style.display = "block";

  document.getElementById("fact-page-heading").textContent = "Date Facts";
  document.getElementById("fact-page-lead").textContent = "Enter a Date to get random Fact...";
  factInput.style.display = "none";
  document.getElementById("date-input").style.display = "block";
  document.getElementById("date-input").innerHTML = `
  <div class="input-group mb-3">
    <div class="input-group-text">Day</div>
    <input type="number" class="form-control" id="day-input">
    <div class="input-group-text">Month</div>
    <input type="number" class="form-control" id="month-input">
  </div>`;

  let dayInput = document.getElementById("day-input"),
    monthInput = document.getElementById("month-input"),
    dayValue = dayInput.value,
    monthValue = monthInput.value;

  dayInput.addEventListener("input", getDateFact);
  monthInput.addEventListener("input", getDateFact);
  if (dayValue === '' && monthValue === '') {
    document.querySelector("#result-card").style.display = "none";
  }
  function getDateFact() {
    let dayValue = dayInput.value,
      monthValue = monthInput.value;
    if (dayValue !== '' && monthValue !== '') {

      fetch(`http://numbersapi.com/${monthValue}/${dayValue}/date`)
        .then(res => res.text())
        .then(data => {
          document.querySelector("#result-card").style.display = "block";
          document.querySelector("#factText").textContent = data;
        })
        .catch(err => console.log(err));
    } else {
      document.querySelector("#result-card").style.display = "none";
    }
  }

  e.preventDefault();
})

backBtn.addEventListener("click", (e) => {
  initialPage.style.display = "block";
  factPage.style.display = "none";
  e.preventDefault()
})