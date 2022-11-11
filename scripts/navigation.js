// Replace the root page elements html with another pages
function navigateTo(searchParams, skipHistory = false, callback) {
    const params = new URLSearchParams(searchParams);
    const page = params.get('screen');

    if (!page) return;
    console.info(`Navigating to ${page}`);

    // Get page component
    const name = page.toLowerCase() || 'home';
    const component = window.components.get(name);
    if (!component) return console.error(`Page ${page} not found`);

    // Ignore if already on page
    const rootElement = document.getElementById('root-page');
    const from = rootElement.getAttribute('from');
    if (from === component.name) return console.info(`Already on ${page}`);

    // Update the URL with new page
    if (!skipHistory) history.pushState('', '', '?' + params);

    // Reset the between element
    insertComponent('Empty', document.getElementById('root-between'));

    // Insert the new page
    return insertComponent(component, rootElement, callback);
}

// Resolve the screen parameter from URL
function resolveScreen() {
    const screen = new URL(location).searchParams.get('screen');
    return screen ? screen.toLowerCase() : 'home';
}

// Resolve the return_to parameter from URL
function resolveReturnTo() {
    const returnTo = new URL(location).searchParams.get('return_to');
    return returnTo ? returnTo.toLowerCase() : undefined;
}

// Get the 'from' attribute from the root page element
function getActivePage() {
    return document.getElementById('root-page')
        .getAttribute('from');
}