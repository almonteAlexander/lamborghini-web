"use strict";

var $header = $('.header'),
    $navTitle = $('.nav h1'),
    $slideFirstTitle = $('.slide__first-title'),
    $navMenu = $('.nav ul'),
    $menuButton = $('.menu__button'),
    $modelSection = $('.models__container'),
    $concessionaire = $('.concessionaire');
var timeLine = new TimelineMax();
timeLine.from($header, 1.5, {
  x: -100,
  opacity: 0,
  ease: Power3.easeInOut
}).staggerFrom([$navTitle, $slideFirstTitle], 0.6, {
  x: -20,
  opacity: 0,
  ease: Power3.easeInOut
}).fromTo($menuButton, 0.3, {
  transform: 'scale(1.15)'
}, {
  transform: 'scale(1)',
  ease: Power3.easeInOut
}, '-=0.7').from($navMenu, 0.5, {
  y: -5,
  opacity: 0,
  ease: Power3.easeInOut
});
$navTitle.on('mouseenter', function () {
  if (timeLine.isActive()) {
    $navTitle.css('cursor', 'default');
  } else {
    $navTitle.css('cursor', 'pointer');
  }
});
gsap.timeline({
  scrollTrigger: {
    trigger: $modelSection,
    start: 330
  }
}).to($modelSection, {
  x: 0,
  opacity: 1,
  duration: 0.3,
  onComplete: function onComplete() {
    startModels();
  }
});
gsap.timeline({
  scrollTrigger: {
    trigger: $concessionaire,
    start: 850
  }
}).from($concessionaire, {
  y: 20,
  opacity: 0,
  duration: 1.5,
  ease: Power3.easeInOut
});
var $slidesContainer = $('.slides__container');
var $slideFirst = $('.slide__first');
var slidesList = document.querySelectorAll('.slide');
var firstSlideClone = slidesList[0].cloneNode(true);
firstSlideClone.id = 'first-clone';
$slidesContainer.append(firstSlideClone);
var slideIndex = 0;
var navIndex = 1;
var slideWidth = slidesList[slideIndex].clientWidth;

var startSlide = function () {
  setInterval(function () {
    slideIndex++;
    navIndex++;
    $slideFirst.css('margin-left', "".concat(-25 * slideIndex, "%"));
    $slideFirst.css('transition', '2s');
    navIndex <= 3 ? document.querySelector('#slide' + navIndex).checked = true : null;
  }, 6000);
}();

$slidesContainer.on('transitionstart', function () {
  if (slidesList[slideIndex].id === firstSlideClone.id) {
    navIndex = 1;
    document.querySelector('#slide1').checked = true;
  }
});
$slidesContainer.on('transitionend', function () {
  slidesList = document.querySelectorAll('.slide');

  if (slidesList[slideIndex].id === firstSlideClone.id) {
    $slideFirst.css('transition', '0s');
    slideIndex = 0;
    $slideFirst.css('margin-left', "".concat(-25 * slideIndex, "%"));
  }
});
var modelsList = [{
  modelId: '#model__first',
  modelTitle: 'LAMBORGUINI URUS'
}, {
  modelId: '#model__second',
  modelTitle: 'LAMBORGUINI AVENTADOR'
}, {
  modelId: '#model__third',
  modelTitle: 'LAMBORGHINI HURACAN'
}];
var $modelTitleTag = $('.model__title');
var $modelFirstImg = $('#model__first');
var modelIndex = 1; //const $modelsContainer = $('.models');
//let modelSequence = document.querySelectorAll('.model');
//let firstModelClone = modelSequence[0].cloneNode(true);
//irstModelClone.id = 'first__model-clone';
//$modelsContainer.append(firstModelClone);

var startModels = function startModels() {
  setInterval(function () {
    var actualModel = modelsList[modelIndex]['modelId'];
    modelsList.filter(function (model) {
      if (model['modelId'] === actualModel) {
        $(actualModel).css('filter', 'brightness(100%)');
        $modelTitleTag.html(model['modelTitle']);
        timeLine.from('.model__title', {
          x: -20,
          opacity: 0,
          ease: Power3.easeInOut
        }, '+=1');
      } else {
        $(model['modelId']).css('filter', 'brightness(25%)');
      }
    }); //$modelFirstImg.css('margin-left', `${-33 * modelIndex-1}%`);
    //$modelFirstImg.css('transition', 'margin 2s');

    if (modelIndex === 2) {
      $(modelsList[modelIndex]['modelId']).css('filter', 'brightness(100%)');
      modelIndex = 0;
    } else {
      modelIndex++;
    }
  }, 4000);
}; //$modelsContainer.on('transitionend', () => {
//  modelSequence = document.querySelectorAll('.model');
//if(modelSequence[modelIndex].id === firstModelClone.id){
//  $modelFirstImg.css('transition', '0s');
//modelIndex = 0;
//$modelFirstImg.css('margin-left', `${-33 * modelIndex}%`);   
//}
//})