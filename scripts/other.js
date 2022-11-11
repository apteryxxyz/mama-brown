// Cache images
function preloadImages(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i]) continue;
        const img = new Image();
        img.src = array[i];
    }
}

// Wrap a promise and give it the isPending method
function wrapPromise(promise) {
    if (promise.isPending) return promise;

    let isPending = true;
    let result = promise.then(
        function (v) {
            isPending = false;
            return v;
        },
        function (e) {
            isPending = false;
            throw e;
        }
    );

    result.isPending = () => isPending;
    return result;
}

// Hook to easily update an elements inner HTML
function useElement(element, onChange, setHTML) {
    return [element, function setInnerHTML(html, ...args) {
        if (!element) return;

        if (typeof setHTML === 'function') {
            setHTML(element, html);
        } else {
            element.innerHTML = html;
        }

        if (!Array.isArray(onChange)) return;
        onChange.forEach(fn => fn(element, ...args));
    }];
}

// One line if else function
function ifElse(condition, ifTrue, ifFalse) {
    if (condition) return ifTrue;
    return ifFalse;
}