
const triggerClassBig = '.loading-progress-message';
const triggerClassSmall = '.working-progress';

function waitForElm(selector, prevData) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
        // return resolve(document.querySelector(selector));
        return resolve([prevData, document.querySelector(selector)]);
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              // resolve(document.querySelector(selector));
              resolve([prevData, document.querySelector(selector)]);
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

// const getLoadingBox = async () => {
//   console.log(`looking for '${triggerClass}'`);
//   while(!document.querySelector(triggerClass)) {
//     await new Promise(r => setTimeout(r, 500));
//     console.log("still waiting...")
//   }
//   console.log(`'${triggerClass}' has shown up!`);
//   return Resolve();

// }

function getFact(previousResult) {
  console.log(previousResult);
  const values = Object.values(previousResult)
  console.log(values);
  const fact = values[Math.floor(Math.random() * values.length)];
  console.log(fact);
  return fact;



}

const injectLoadingText = (previousResults ) => {
  const fact = previousResults[0];
  const loadingZone = previousResults[1];
  const para = document.createElement('p');
  para.textContent = `${fact.Fact}. - ${fact.Source}`;
  para.style.bottom = '70px';
  para.style.position = 'absolute';
  para.style.right = '50%';
  para.style.zIndex = '1003';
  loadingZone.appendChild(para);
  console.log("wow did it")
  return Promise.resolve();
}

const url = chrome.runtime.getURL('./trueFacts.json');
fetch(url)
  .then((response) => response.json())
  .then((data) => getFact(data))
  .then((results) => waitForElm(triggerClassBig, results))
  .then((fact, element) => injectLoadingText(fact, element));
  // .then(makeDaDestructor)