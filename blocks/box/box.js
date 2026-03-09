import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const divParent = document.createElement('div');
  divParent.className = 'box-parent';
  [...block.children].forEach((row) => {
    const divchildren = document.createElement('div');
    while (row.firstElementChild) {
      divchildren.append(row.firstElementChild);
    }
    [...divchildren.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'box-content-image';
      else div.className = 'box-content-body';
    });
    divchildren.className = 'box-content-wrapper';
    divParent.append(divchildren);
  });
  divParent.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(divParent);
}
