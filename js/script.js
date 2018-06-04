document.addEventListener('DOMContentLoaded', function() {

  // function to create cirle of icons
  let type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '12em', //distance from center
    start = -90, //shift start from 0
    elements = $('li:not(:first-child)'), //puts first li element in center of circle
    numberOfElements = (type === 1) ? elements.length : elements.length - 1, //adjusts for even distribution of elements when not full circle
    slice = 360 * type / numberOfElements;

  elements.each(function(i) {
    let self = $(this),
      rotate = slice * i + start,
      rotateReverse = rotate * -1;

    self.css({
      'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
    });
  });

  let astroSign = document.getElementsByClassName('signIcon')

  // this creates an array of elements instead of an html collection
  Array.from(astroSign).forEach(function(astroSignButton) {
    // iterating over each button in the array and adding an event listener
    astroSignButton.addEventListener('click', astroSignButtonPressed)
  });

// document.getElementById('popUp').addEventListener('mouseenter', function(event){
//   event.target.addEventListener('mouseleave', function(event){
//       event.target.classList.add
//   });
// })

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
  title.innerHTML = "Loading...";
  para.innerHTML = "";

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

      let horoName = document.getElementById(zodiacSign);

      title.innerHTML = zodiacSign;
      para.innerHTML = data.horoscope;

    })

      .catch(error => console.log(error));

  }

  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);

});
