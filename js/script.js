document.addEventListener('DOMContentLoaded', function () {

  const elements = document.querySelectorAll('li:not(:first-child)');
  const slice = 360 / elements.length;

  Array.from(elements).forEach(function (element, i) {
    const rotate = slice * i - 90;
    const rotateReverse = rotate * -1;
    element.style.transform = 'rotate(' + rotate + 'deg) translate( 13em ) rotate(' + rotateReverse + 'deg)';
  });
  
  let astroSign = document.getElementsByClassName('signIcon');

  // this creates an array of elements instead of an html collection
  Array.from(astroSign).forEach(function (astroSignButton) {
    // iterating over each button in the array and adding an event listener
    astroSignButton.addEventListener('click', astroSignButtonPressed)
  });

  // create mouseover and mouseout effect when scrolling over icon
  for (let i = 0; i < astroSign.length; i++) {
    astroSign[i].addEventListener('mouseover', mouseOverEffect);
    astroSign[i].addEventListener('mouseout', mouseOutEffect);
  }

  // mouseover effect that changes astro name font
  function mouseOverEffect() {
    this.classList.add("astroSign-highlight");
  }

  // removes astro name font
  function mouseOutEffect() {
    this.classList.remove("astroSign-highlight");
  }

  // function that creates modals when each zodiac icon is clicked
  function astroSignButtonPressed(event) {
    let zodiacSign = this.id;
    console.log('Zodiac Sign:', zodiacSign);
    fetchHoroscope(zodiacSign);
  }
  let title = document.getElementById('title');
  let para = document.getElementById('para');

  // function to obtain API horoscope information
  function fetchHoroscope(zodiacSign) {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let apiUrl = `${proxyUrl}http://horoscope-api.herokuapp.com/horoscope/today/${zodiacSign}`;
    console.log('API URL:', apiUrl);
    title.innerHTML = "Loading...";
    para.innerHTML = "";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Horoscope Data:', data)

        title.innerHTML = zodiacSign;
        para.innerHTML = data.horoscope;

      })

      .catch(error => console.log(error));

  }

  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);

});