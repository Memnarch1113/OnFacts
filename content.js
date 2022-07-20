
const firstLoadingScreenClass = 'loading-progress-message';
const secondLoadingScreenClass = 'spinner-holder-working';
const loadingBackgroundClass = 'loading-progress-background';
const loadingLittleSpinnerClass = 'os-spinner-medium os-spinner-spinning'

function waitForElm(elementClass, prevData) {
  return new Promise(resolve => {
      const selector = `.${elementClass}`
      if (document.querySelector(selector)) {
        // return resolve(document.querySelector(selector));
        return resolve([document.querySelector(selector), prevData]);
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              // resolve(document.querySelector(selector));
              resolve([document.querySelector(selector), prevData]);
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

function getFact(previousResult) {
  // console.log(previousResult);
  const values = Object.values(previousResult)
  // console.log(values);
  const fact = values[Math.floor(Math.random() * values.length)];
  // console.log(fact);
  return fact;
}

const injectLoadingText = (previousResults ) => {
  const loadingZone = previousResults[0];
  const fact = previousResults[1];
  const factText = document.createElement('p');
  factText.textContent = `${fact.Fact}. - ${fact.Source}`;
  factText.style.bottom = '70px';
  // factText.style.position = 'absolute';
  factText.style.right = '50%';
  factText.style.zIndex = '1003';
  loadingZone.appendChild(factText);
  // console.log("wow did it")
  return Promise.resolve();
}

const url = chrome.runtime.getURL('./trueFacts.json');
fetch(url).then((response) => response.json()).then((data) => getFact(data)).then((fact) => {
  console.log(fact)
  waitForElm(loadingBackgroundClass).then((results) => {
    // results[0].style.width = '50%'; // TODO: This breaks things. We need a way of not breaking other elements on the page :(
  });
  waitForElm(loadingLittleSpinnerClass).then((results) => {
    results[0].style.marginLeft = '50%';
  });
  waitForElm(firstLoadingScreenClass, fact).then((element, fact) => injectLoadingText(element, fact));
  waitForElm(secondLoadingScreenClass, fact).then((element, fact) => injectLoadingText(element, fact));
});

// TODO: Right now if you navigate between documents in Onshape, the loading facts only show up one time. I should make it so that they always show up
// TODO: to do that, I think I need to make constant search for anything that looks like a loading circle, and append the facts to them
// TODO: Make the facts cycle after period of time
// TODO: Make the facts load in better because right now they are off to the side and ugly on the small loading circle
// TODO: add links to the facts
// TODO: add more facts
// TODO: Ambitious, but maybe get the facts from a server so that they can be updated async?
// TODO: Set up permissions so that they're not horrifyingly broad
// TODO: check performance isn't dying because I'm doing this
