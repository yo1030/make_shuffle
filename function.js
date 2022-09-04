function changeBorder() {
  replaceClass_(this, 'border-white', 'border-info');
}

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function replaceClass_(elem, defaultClass, newClass) {
  const hasBorderWhite = elem.classList.contains(defaultClass);
  if (hasBorderWhite) {
    elem.classList.replace(defaultClass, newClass); 
  } else {
    elem.classList.replace(newClass, defaultClass); 
  }
}

function createImageElem(colElem, colClass, imgElem, fileElem) {
  colElem.classList.add(...colClass);
  imgElem.classList.add('w-100');
  imgElem.src = fileElem.webkitRelativePath;    // image src
  imgElem.alt = fileElem.name;                        // file name
  colElem.append(imgElem);
}