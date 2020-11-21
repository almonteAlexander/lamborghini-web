const $header = $('.header'),
      $navTitle = $('.nav h1'),
      $slideFirstTitle = $('.slide__first-title'),
      $navMenu = $('.nav ul'),
      $menuButton = $('.menu__button'),
      $modelSection = $('.models__container'),
      $concessionaire = $('.concessionaire');

var timeLine = new TimelineMax();

timeLine
.from($header, 1.5, {x: -100, opacity: 0, ease: Power3.easeInOut})
.staggerFrom([$navTitle, $slideFirstTitle],0.6,{x: -20, opacity: 0, ease: Power3.easeInOut})
.fromTo($menuButton,0.3,{transform: 'scale(1.15)'},
{transform: 'scale(1)', ease: Power3.easeInOut},'-=0.7')
.from($navMenu, 0.5, {y: -5, opacity: 0, ease: Power3.easeInOut})

$navTitle.on('mouseenter', () => {
    if(timeLine.isActive()){
        $navTitle.css('cursor', 'default');
    }
    else{
        $navTitle.css('cursor', 'pointer');
    }
});

gsap.timeline({
    scrollTrigger: {
        trigger: $modelSection,
        start: 330,
    }
}).to(
$modelSection,
{x: 0, opacity: 1, duration: 0.3, onComplete: () => {startModels();}}
)

gsap.timeline({
    scrollTrigger: {
        trigger: $concessionaire,
        start: 850,
    }
}).from(
$concessionaire,
{y: 20, opacity: 0, duration: 1.5, ease: Power3.easeInOut}
)

const $slidesContainer = $('.slides__container');
const $slideFirst = $('.slide__first');
var slidesList = document.querySelectorAll('.slide');

var firstSlideClone = slidesList[0].cloneNode(true);
firstSlideClone.id = 'first-clone';

$slidesContainer.append(firstSlideClone);

var slideIndex = 0;
var navIndex = 1;
const slideWidth = slidesList[slideIndex].clientWidth;

var requestAnimationFrame = 
window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame;

var slidesFirstTime= true;
const startSlide = () => {
    if(!slidesFirstTime){
        slideIndex++;
        navIndex++;
        $slideFirst.css('margin-left', `${-25 * slideIndex}%`);
        $slideFirst.css('transition', '2s');
        navIndex <= 3 ? document.querySelector('#slide' + navIndex).checked = true : null;
    }
    else{
        slidesFirstTime = false;
    }
    setTimeout(() => { requestAnimationFrame(startSlide) }, 6000);
};
startSlide();

$slidesContainer.on('transitionstart', () => {
    if(slidesList[slideIndex].id === firstSlideClone.id){
        navIndex = 1;
        document.querySelector('#slide1').checked = true;
    }
})

$slidesContainer.on('transitionend', () => {
    slidesList = document.querySelectorAll('.slide');
    if(slidesList[slideIndex].id === firstSlideClone.id){
        $slideFirst.css('transition', '0s');
        slideIndex = 0;
        $slideFirst.css('margin-left', `${-25 * slideIndex}%`);
    }
})

var modelsList = [
    {modelId: '#model__first', modelTitle: 'LAMBORGUINI URUS'}, 
    {modelId: '#model__second', modelTitle: 'LAMBORGUINI AVENTADOR'}, 
    {modelId: '#model__third', modelTitle: 'LAMBORGHINI HURACAN'}
];

var $modelTitleTag = $('.model__title');
var $modelFirstImg = $('#model__first');
var modelIndex = 1;

var modelsFirstTime = true;
let startModels = () => {
    if(!modelsFirstTime){
        let actualModel = modelsList[modelIndex]['modelId'];
        modelsList.filter(model => {
            if(model['modelId'] === actualModel){
                $(actualModel).css('filter', 'brightness(100%)');
                $modelTitleTag.html(model['modelTitle']);
                timeLine.from('.model__title',
                {x: -20, opacity: 0, ease: Power3.easeInOut}, '+=1');
            } 
            else{
                $(model['modelId']).css('filter', 'brightness(25%)');
            }
        })
        if(modelIndex === 2){
            $(modelsList[modelIndex]['modelId']).css('filter', 'brightness(100%)');
            modelIndex = 0;
        }
        else{
            modelIndex++;
        }
    }
    else{
        modelsFirstTime = false;
    }
    setTimeout(() => { requestAnimationFrame(startModels) }, 4000);
};