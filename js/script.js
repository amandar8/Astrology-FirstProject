
// function to create cirle of icons
let type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '12em', //distance from center
    start = -90, //shift start from 0
    elements = $('li:not(:first-child)'), //puts first li element in center of circle
    numberOfElements = (type === 1) ?  elements.length : elements.length - 1, //adj for even distro of elements when not full circle
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

function astroSignButtonPressed (event) {
  let zodiacSign = this.id;
  console.log('Zodiac Sign:', zodiacSign);
  fetchHoroscope(zodiacSign);
}

// document.getElementById("horoContent").text = "Loading...";

// function to obtain API horoscope information
function fetchHoroscope(signName) {
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  let apiUrl = `${proxyUrl}http://horoscope-api.herokuapp.com/horoscope/today/${signName}`;
  console.log('API URL:', apiUrl);
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => console.log('Horoscope Data:', data))
  .catch(error => console.log(error));

}
