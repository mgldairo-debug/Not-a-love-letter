const letterButton = document.getElementById('letterButton');
const letterContent = document.getElementById('letterContent');
const moreButton = document.getElementById('moreButton');
const moreContent = document.getElementById('moreContent');
const buttonLabel = letterButton.querySelector('.button-label');
const heartMessage = document.getElementById('heartMessage');
const heartText = document.getElementById('heartText');
const heartPhrase = 'i miss you';

letterButton.addEventListener('click', () => {
  const isOpen = !letterContent.hidden;
  letterContent.hidden = isOpen;
  letterButton.setAttribute('aria-expanded', String(!isOpen));

  buttonLabel.textContent = isOpen ? 'Open mail' : 'Close mail';

  if (isOpen) {
    moreContent.hidden = true;
    moreButton.setAttribute('aria-expanded', 'false');
    heartMessage.classList.remove('is-forging');
  }
});

moreButton.addEventListener('click', () => {
  const isOpen = !moreContent.hidden;
  moreContent.hidden = isOpen;
  moreButton.setAttribute('aria-expanded', String(!isOpen));

  if (isOpen) {
    heartMessage.classList.remove('is-forging');
    return;
  }

  forgeHeartText();
  moreContent.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
});

function forgeHeartText() {
  const isMobile = window.matchMedia('(max-width: 480px)').matches;
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const rowGap = isMobile ? 16 : 15;
  const repeated = `${heartPhrase}   `.repeat(12);
  heartText.replaceChildren();

  let phraseIndex = 0;
  for (let y = 36; y <= 274; y += rowGap) {
    const line = document.createElementNS(svgNamespace, 'text');
    line.classList.add('heart-line');
    line.setAttribute('x', phraseIndex % 2 === 0 ? '-18' : '-82');
    line.setAttribute('y', String(y));
    line.textContent = repeated;
    line.style.animationDelay = `${phraseIndex * 0.035}s`;
    heartText.append(line);
    phraseIndex += 1;
  }

  heartMessage.classList.remove('is-forging');
  void heartMessage.offsetWidth;
  heartMessage.classList.add('is-forging');
}
