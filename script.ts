(() => {
  type CarouselProps = {
    selector: string;
    slidesAmount?: number;
    rewindOnFinish?: boolean;
    withControls?: boolean;
  };

  //
  const carousel = ({ selector, slidesAmount = 1, rewindOnFinish = true, withControls = true }: CarouselProps) => {
    const carouselNode = document.querySelector(selector) as HTMLElement;
    if (carouselNode === null) {
      console.error(`No ${carouselNode} node found in DOM`);
      return;
    }

    let carouselAtScene = 1;

    const itemNodes = carouselNode.children;
    const itemNodesArray: HTMLElement[] = Array.prototype.slice.call(itemNodes);
    const itemNodesLength = itemNodesArray.length;
    const carouselNodeWidth = (carouselNode.parentElement.clientWidth * itemNodesLength) / slidesAmount;
    const slideWidth = carouselNode.parentElement.clientWidth / slidesAmount;
    const totalPossibleScenes = Math.ceil(Number(itemNodesLength / slidesAmount));

    const slideNext = () => {
      if (carouselAtScene === totalPossibleScenes) {
        carouselAtScene = 1;
      } else {
        carouselAtScene += 1;
      }

      const transformPosition = carouselAtScene === 1 ? 0 : (carouselAtScene - 1) * slideWidth;
      carouselNode.style.transform = `translateX(-${transformPosition}px)`;
    };

    const slidePrev = () => {
      if (carouselAtScene === 1) {
        carouselAtScene = totalPossibleScenes;
      } else {
        carouselAtScene -= 1;
      }

      const transformPosition = carouselAtScene === 1 ? 0 : (carouselAtScene - 1) * slideWidth;
      carouselNode.style.transform = `translateX(-${transformPosition}px)`;
    };

    itemNodesArray.forEach(element => {
      element.style.flexBasis = `${slideWidth}px`;
      element.style.paddingLeft = '16px';
      element.style.paddingRight = '16px';
      element.style.overflow = 'hidden';
    });

    carouselNode.style.width = `${carouselNodeWidth}px`;

    return {
      slidePrev,
      slideNext
    };
  };

  //
  const myCarousel1 = carousel({ selector: '#carousel-1', slidesAmount: 1 });
  const myCarousel2 = carousel({ selector: '#carousel-2', slidesAmount: 2 });
  const myCarousel3 = carousel({ selector: '#carousel-3', slidesAmount: 3 });

  document.querySelector('.slide-prev-1').addEventListener('click', myCarousel1.slidePrev);
  document.querySelector('.slide-next-1').addEventListener('click', myCarousel1.slideNext);

  document.querySelector('.slide-prev-2').addEventListener('click', myCarousel2.slidePrev);
  document.querySelector('.slide-next-2').addEventListener('click', myCarousel2.slideNext);

  document.querySelector('.slide-prev-3').addEventListener('click', myCarousel3.slidePrev);
  document.querySelector('.slide-next-3').addEventListener('click', myCarousel3.slideNext);
})();
