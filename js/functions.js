
var sliderProto = function(sliderParams){
    this.id = sliderParams.id;
    this.activeSlidesL = sliderParams.activeSlidesL;
    this.activeSlidesM = sliderParams.activeSlidesM;
    this.activeSlidesS = sliderParams.activeSlidesS;
    this.activeSlidesXS = sliderParams.activeSlidesXS;
    this.slideTime = sliderParams.slideTime;
    this.slideEffect = sliderParams.slideEffect;
    this.slideMargin = sliderParams.slideMargin;
    this.autoSlide = sliderParams.autoSlide;
    this.activeArrows = sliderParams.activeArrows;
    this.showArrows = sliderParams.showArrows;
    this.showBullets = sliderParams.showBullets;
    this.hiddenClass = 'hidden';
    this.activeClass = 'active';
    this.step = sliderParams.step;
    this.counter = 0;
};
sliderProto.prototype.slide = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');
    $(allSlidersItems).addClass(''+this.hiddenClass);
    this.allSlides = allSlidersItems;
    this.slidesQuantity = allSlidersItems.length;
    this.arr = [];
    if($(window).width() > 991){
        for(var i = 0; i < this.slidesQuantity; i ++){
            this.arr.push(allSlidersItems[i]);
        }
    }
};
sliderProto.prototype.setSlides = function(arr,activeClass,hiddenClass,activeSlidesL){
        $(arr).addClass(''+activeClass).removeClass(''+hiddenClass);
        $(arr).css({'width': 100/activeSlidesL+'%'});
};
sliderProto.prototype.init = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');
    for(var j = 0; j < this.activeSlidesL; j++){
        $(allSlidersItems[j]).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);
        $(allSlidersItems[j]).css({'width': 100/this.activeSlidesL+'%'});
        this.counter++;
    }
};
sliderProto.prototype.run = function(){
    if(this.autoSlide === true && this.slideEffect){
        $('.item').removeClass(''+this.activeClass).addClass(''+this.hiddenClass);
        $('.item').removeAttr('style');
        for(var k = 0; k < this.activeSlidesL; k++){
            this.setSlides(this.arr[this.counter],this.activeClass,this.hiddenClass,this.activeSlidesL);
            this.counter++;
        }
        if(this.counter >= this.arr.length) {this.counter = 0;}
    }
};
$(document).ready(function(){
    var sliderParams = {
        id: 'slider_rw',
        activeSlidesL: 4,
        activeSlidesM: 3,
        activeSlidesS: 2,
        activeSlidesXS: 1,
        slideTime: 3000,
        slideEffect: 'fade',
        slideMargin: 10,
        autoSlide: true,
        showArrows: true,
        showBullets: true,
        step: 1
    };
    var slider = new sliderProto(sliderParams);
    slider.slide();
    slider.init();
    setInterval(function(){slider.run()},slider.slideTime);
});