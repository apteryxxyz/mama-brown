// Import a file and return its contents
function importFile(filePath) {
    const promise = wrapPromise(fetch(filePath)
        .then(response => response.text()));
    window.promises.push(promise);
    return promise;
}

// Create a component and store it in cache
function createComponent(name, options) {
    name = name.toLowerCase();
    return window.promises.push(wrapPromise((async () => {
        const component = {
            name: name,
            script: await options.script,
            view: await options.view,
            style: await options.style,
        };
        window.components.set(name, component);
    })()));
}

// Insert a components HTML and styles into the DOM
function insertComponent(name, at, callback) {
    const isString = typeof name === 'string';
    if (isString) name = name.toLowerCase();
    const component = isString ? window.components.get(name) : name;
    if (!component) return console.error(`Component ${name} not found`);

    if (component.style) {
        const head = Array.from(document.head.children);
        const froms = head.map(c => c.getAttribute('from'));

        if (!froms.includes(component.name)) {
            // Add components style to the header
            const style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('from', component.name);
            style.innerHTML = component.style;
            document.head.appendChild(style);
        }
    }

    // Add components view to the DOM
    at.innerHTML = component.view;
    at.setAttribute('from', component.name);

    // Run components script
    return component.script(callback);
}