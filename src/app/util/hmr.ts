import { ApplicationRef, NgModuleRef } from '@angular/core';

export function acceptHot(_appModule, moduleRef) {
  if (!_appModule.hot) return;

  let applicationRef = moduleRef.injector.get(ApplicationRef);
  _appModule.hot.accept();

  if (_appModule.hot.data) {
    let store = _appModule.hot.data;
    console.log('HMR store', JSON.stringify(store, null, 2));
    if (store.restoreInputValues) {
      setTimeout(store.restoreInputValues);
    }

    applicationRef.tick();
    delete store.restoreInputValues;
  }

  _appModule.hot.dispose(function (store) {
    const cmpLocation = applicationRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();

    moduleRef.destroy();

    store.disposeOldHosts();
    delete store.disposeOldHosts;
  });

  // _appModule.hot.apply(function () {
  //   console.log('hrm-apply');
  // });

  // _appModule.hot.check(function () {
  //   console.log('hrm-check');
  // });

  // _appModule.hot.decline(function () {
  //   console.log('hrm-decline');
  // });
}




// create new elements
function createNewHosts(cmps: any) {
  const components = cmps.map((componentNode: any) => {
    const newNode = document.createElement(componentNode.tagName);
    // display none
    const currentDisplay = newNode.style.display;
    newNode.style.display = 'none';
    const parentNode = componentNode.parentNode;
    parentNode.insertBefore(newNode, componentNode);
    componentNode.remove();
    return { currentDisplay, newNode };
  });
  return () => {
    components.forEach((cmp: any) => {
      cmp.newNode.style.display = cmp.currentDisplay;
      cmp.newNode = null;
      cmp.currentDisplay = null;
    });
  }
}


// remove old styles
function removeNgStyles() {
  Array.prototype.slice.call(document.head.querySelectorAll('style'), 0)
    .filter((style: any) => style.innerText.indexOf('_ng') !== -1)
    .map((el: any) => el.remove());
}

// get input values
function getInputValues() {
  const inputs = document.querySelectorAll('input');
  return Array.prototype.slice.call(inputs).map((input: any) => input.value);
}

// set input values
function setInputValues($inputs: any) {
  const inputs = document.querySelectorAll('input');
  if ($inputs && inputs.length === $inputs.length) {
    $inputs.forEach((value: any, i: number) => {
      const el: any = inputs[i];
      el.value = value;
      el.dispatchEvent(new CustomEvent('input', { detail: el.value }));
    });
  }
}

// get/set input values
function createInputTransfer() {
  const $inputs = getInputValues();
  return function restoreInputValues() {
    setInputValues($inputs);
  }
}
