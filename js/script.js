document.addEventListener('DOMContentLoaded', function() {



  // function to create cirle of icons
  let type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '12em', //distance from center
    start = -90, //shift start from 0
    elements = $('li:not(:first-child)'), //puts first li element in center of circle
    numberOfElements = (type === 1) ? elements.length : elements.length - 1, //adj for even distro of elements when not full circle
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
      // title.innerHTML = "Loading...";
      // para.innerHTML = "";
      // //
      // let modal1 = document.createElement("div");
      // modal1.classList.add('modal');
      // horoName.appendChild(modal1);
      //
      // let modalContent = document.createElement("div");
      // modalContent.classList.add('modal-content');
      // modal1.appendChild(modalContent);
      //
      // let title = document.createElement("h4");
      title.innerHTML = zodiacSign;
      para.innerHTML = data.horoscope;
      //
      // let para = document.createElement("p");
      // para.innerHTML = data.horoscope;
      // modalContent.appendChild(para);
      //
      // let el = document.querySelector(`a`);
      // el.href = "#modal1";
      // el.classList.add('waves-effect waves-light modal-trigger');



    })

      .catch(error => console.log(error));




  }

  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);
  // title.innerHTML = "Loading...";
  // para.innerHTML = "";
});
