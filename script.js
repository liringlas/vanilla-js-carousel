(function () {
    //
    var carousel = function (_a) {
        var selector = _a.selector, _b = _a.slidesAmount, slidesAmount = _b === void 0 ? 1 : _b, _c = _a.rewindOnFinish, rewindOnFinish = _c === void 0 ? true : _c, _d = _a.withControls, withControls = _d === void 0 ? true : _d;
        var carouselNode = document.querySelector(selector);
        if (carouselNode === null) {
            console.error("No " + carouselNode + " node found in DOM");
            return;
        }
        var carouselAtScene = 1;
        var itemNodes = carouselNode.children;
        var itemNodesArray = Array.prototype.slice.call(itemNodes);
        var itemNodesLength = itemNodesArray.length;
        var carouselNodeWidth = (carouselNode.parentElement.clientWidth * itemNodesLength) / slidesAmount;
        var slideWidth = carouselNode.parentElement.clientWidth / slidesAmount;
        var totalPossibleScenes = Math.ceil(Number(itemNodesLength / slidesAmount));
        var slideNext = function () {
            if (carouselAtScene === totalPossibleScenes) {
                carouselAtScene = 1;
            }
            else {
                carouselAtScene += 1;
            }
            var transformPosition = carouselAtScene === 1 ? 0 : (carouselAtScene - 1) * slideWidth;
            carouselNode.style.transform = "translateX(-" + transformPosition + "px)";
        };
        var slidePrev = function () {
            if (carouselAtScene === 1) {
                carouselAtScene = totalPossibleScenes;
            }
            else {
                carouselAtScene -= 1;
            }
            var transformPosition = carouselAtScene === 1 ? 0 : (carouselAtScene - 1) * slideWidth;
            carouselNode.style.transform = "translateX(-" + transformPosition + "px)";
        };
        itemNodesArray.forEach(function (element) {
            element.style.flexBasis = slideWidth + "px";
            element.style.paddingLeft = '16px';
            element.style.paddingRight = '16px';
            element.style.overflow = 'hidden';
        });
        carouselNode.style.width = carouselNodeWidth + "px";
        return {
            slidePrev: slidePrev,
            slideNext: slideNext
        };
    };
    //
    var myCarousel1 = carousel({ selector: '#carousel-1', slidesAmount: 1 });
    var myCarousel2 = carousel({ selector: '#carousel-2', slidesAmount: 2 });
    var myCarousel3 = carousel({ selector: '#carousel-3', slidesAmount: 3 });
    document.querySelector('.slide-prev-1').addEventListener('click', myCarousel1.slidePrev);
    document.querySelector('.slide-next-1').addEventListener('click', myCarousel1.slideNext);
    document.querySelector('.slide-prev-2').addEventListener('click', myCarousel2.slidePrev);
    document.querySelector('.slide-next-2').addEventListener('click', myCarousel2.slideNext);
    document.querySelector('.slide-prev-3').addEventListener('click', myCarousel3.slidePrev);
    document.querySelector('.slide-next-3').addEventListener('click', myCarousel3.slideNext);
})();
