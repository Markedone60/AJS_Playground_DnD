import { mdConvert } from 'md-converter';

// ***  Input file

const fileContainer = document.querySelector('.file-container');
const fileInput = fileContainer.querySelector('.overlapped');
const previewTitle = document.querySelector('.preview-title');
const previewText = document.querySelector('.preview-text');
const previewHtml = document.querySelector('.preview-html');
const previewImage = document.querySelector('.preview-image');

fileContainer.addEventListener('click', () => {
  console.log('click');
  fileInput.dispatchEvent(new MouseEvent('click'));
});

fileContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
});

fileContainer.addEventListener('drop', (e) => {
  e.preventDefault();
  
  console.log('drop');
  console.log(e.dataTransfer.files && e.dataTransfer.files[0]);

  previewImage.src = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0]);
});



const displayTextContent = (e) => {
  console.log(e);
  previewText.textContent = e.target.result;
};

const displayMdContent = (e) => {
  console.log(e);
  previewHtml.innerHTML = mdConvert(e.target.result);
};

const displayImageContent = (e) => {
  console.log(e);
  previewImage.src = e.target.result;
};

fileInput.addEventListener('change', (e) => {
  console.log(e);
  console.dir(fileInput);

  const file = fileInput.files && fileInput.files[0];

  if (!file) return;

  previewTitle.textContent = file.name;

  const url = new URL.createObjectURL(file);

//  previewImage.src = url;

  console.log(url);
})

//***  Drag and drop

const items = document.querySelector('.items');
const itemsElements = document.querySelector('.items-item');
let actualElement;

const onMouseOver = (e) => {
  console.log(e);

  actualElement.style.top = e.clientY + 'px';
  actualElement.style.left = e.clientX + 'px';
};

const onMouseUp = (e) => {
  const mouseUpItem = e.target;
  console.log(mouseUpItem);

  items.insertBefore(actualElement, mouseUpItem);

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
};

items.addEventListener('mousedown', (e) => {
  e.preventDefault();
  actualElement = e.target;
  actualElement.classList.add('dragged');
  document.documentElement.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseover', onMouseOver);
});


//  const reader = new FileReader();

//  reader.addEventListener('load', displayTextContent); 
//  reader.addEventListener('load', displayMdContent);
//  reader.addEventListener('load', displayImageContent);

//  reader.readAsDataURL(file);