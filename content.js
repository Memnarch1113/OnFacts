
const firstLoadingScreenClass = 'loading-progress-message';
const secondLoadingScreenClass = 'spinner-holder-working';
const loadingBackgroundClass = 'loading-progress-background';
const loadingLittleSpinnerClass = 'os-spinner-medium os-spinner-spinning'

function waitForElm(elementClass, functionToDo, args) {
      const selector = `.${elementClass}`
      let element = document.querySelector(selector);
      if (element) {
        functionToDo(element, args);
      }

      const observer = new MutationObserver(mutations => {
        let element = document.querySelector(selector);  
        if (element) {
              functionToDo(element, args);
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
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

function injectLoadingText(element, fact) {
  const factText = document.createElement('p');
  factText.textContent = `${fact.Fact}. - ${fact.Source}`;
  factText.style.bottom = '70px';
  // factText.style.position = 'absolute';
  factText.style.right = '50%';
  factText.style.zIndex = '1003';
  element.appendChild(factText);
  // console.log("wow did it")
}
const observerList = [];
const url = chrome.runtime.getURL('./trueFacts.json');
fetch(url).then((response) => response.json()).then((data) => getFact(data)).then((fact) => {
  console.log(fact)
  // waitForElm(loadingBackgroundClass).then((results) => {
  //   // results[0].style.width = '50%'; // TODO: This breaks things. We need a way of not breaking other elements on the page :(
  // });
  // waitForElm(loadingLittleSpinnerClass).then((results) => {
  //   results[0].style.marginLeft = '50%';
  // });
  observerList.push(waitForElm(firstLoadingScreenClass, injectLoadingText, fact));
  observerList.push(waitForElm(secondLoadingScreenClass, injectLoadingText, fact));
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
