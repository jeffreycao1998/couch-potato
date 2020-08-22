// Prevents scrolling on element
const toggleScrollOn = (selector, currentPos) => {
  const element = $(`${selector}`);

  if (element.css('position') === 'static') {
    element.css('top', `-${currentPos}px`);
    element.css('position', 'fixed');
  } else if (element.css('position') === 'fixed') {
    element.css('position', 'static');
    window.scrollTo(0, currentPos);
  }
};

// Slides element left or right
const slide = (selector, distance) => {
  const element = $(`${selector}`);

  if (element.css('transform') === `matrix(1, 0, 0, 1, ${distance}, 0)`) {
    element.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');   // slides left
  } else if (element.css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
    element.css('transform', `matrix(1, 0, 0, 1, ${distance}, 0)`);   // slides right
  }
};
