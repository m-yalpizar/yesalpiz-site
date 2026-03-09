import { createOptimizedPicture } from '../../scripts/aem.js';

function bindEvents() {
  const button = document.querySelector('#toggle-button');
  const toggle1 = document.querySelector('.toggle-1');
  const toggle2 = document.querySelector('.toggle-2');
  button.addEventListener('click', () => {
    toggle1.classList.toggle('active');
    toggle2.classList.toggle('active');
  });
}

export default function decorate(block) {
  const divParent = document.createElement('div');
  divParent.className = 'toggle-container';
  const label = document.createElement('label');
  label.className = 'switch';
  const checkbox = document.createElement('input');
  checkbox.id = 'toggle-button';
  checkbox.type = 'checkbox';
  const slider = document.createElement('span');
  slider.className = 'slider round';
  label.appendChild(checkbox);
  label.appendChild(slider);
  divParent.appendChild(label);

  const toggleParent = document.createElement('div');
  toggleParent.className = 'main-wrapper';

  [...block.children].forEach((row, i) => {
    const toggle = document.createElement('div');
    toggle.className = `toggle-view toggle-${i + 1} ${i === 0 ? 'active' : ''}`;
    while (row.firstElementChild) {
      toggle.append(row.firstElementChild);
    }
    toggleParent.append(toggle);
    divParent.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }])));
    divParent.appendChild(toggleParent);
  });
  block.replaceChildren(divParent);
  bindEvents();
}
