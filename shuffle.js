function fileIptClick(e) {
  e.preventDefault();
  // enable to select directory
  fileIpt.webkitdirectory = true;
  fileIpt.click();
}

function setImage(e) {
  e.preventDefault();
  fileList = fileIpt.files;
  fileNum = fileList.length;
  if (fileNum === 0) return;

  const groupNum = Math.ceil(fileNum/maxMember);
  for (let i = 0; i < groupNum; i++) {
  const rowElem = document.createElement('div');
  const rowClass = ['row','my-2'];
  rowElem.classList.add(...rowClass);
    for (let j = 0; j < maxMember; j++) {
      const fileElem = fileList[(i*maxMember) + j];
      if (fileElem === undefined) break;

      const colElem = document.createElement('div');
      const imgElem = document.createElement('img');
      const colClass = ['col-2', 'p-1', 'border', 'border-white'];
      createImageElem(colElem, colClass, imgElem, fileElem);

      // colElem.append(imgElem);
      rowElem.append(colElem);
      colElem.addEventListener('click', changeBorder);
    }
    imgArea.append(rowElem);
  }
}

function shuffleImage() {
  if (fileNum === 0) {
    alert('[error] You need to select file or folder.');
    replaceClass_(resultArea, 'border-white', 'border-dark');
    return;
  }
  const shuffleFileList = shuffle(fileList);
  for (let i = 0; i < groupNum; i++) {
    const groupColElem = document.createElement('div');
    const rowElem = document.createElement('div');
    const groupColClassList = ['col', 'border', 'border-dark', 'mx-1'];
    rowElem.classList.add('row');
    for (let j = 0; j < groupNum; j++) {
      const colElem = document.createElement('div');
      const colClass = ['col-2', 'p-1', 'border', 'border-white'];
      const imgElem = document.createElement('img');
      const fileElem = shuffleFileList[i*groupNum + j];
      createImageElem(colElem, colClass, imgElem, fileElem);
      rowElem.append(colElem);
      groupColElem.append(rowElem);
    }
    groupColElem.id = `result-${i}`;
    groupColElem.classList.add(...groupColClassList);
    resultArea.append(groupColElem);
  }
  const overNum = fileNum % groupNum;
  if (overNum === 0) return;
  const reverseList = shuffleFileList.slice().reverse();
  for (let i = 0; i < overNum; i++) {
    const rowElem = document.createElement('div');
    const colElem = document.createElement('div');
    const imgElem = document.createElement('img');
    rowElem.classList.add('row');
    const colClass = ['col-2', 'p-1', 'border', 'border-white'];
    const fileElem = reverseList[i];
    createImageElem(colElem, colClass, imgElem, fileElem);
    const targetElem = document.getElementById(`result-${i}`);
    rowElem.append(colElem);
    targetElem.append(rowElem);
  }
}
fileBtn.addEventListener('click', fileIptClick);
fileIpt.addEventListener('change', setImage);
shuffleBtn.addEventListener('click', shuffleImage);