createComponent('Header', {
    script: function () { },

    view: `
    <div id="header-container">
        <nav class="noselect">
            <a onclick="navigateTo({ screen: 'home' })">Mama Brown</a>
            <a onclick="navigateTo({ screen: 'login' })">Login</a>
            <a onclick="navigateTo({ screen: 'trolley' })">
                <img src="assets/icons/trolley.svg" class="white" />
                <span id="trolley-badge" value="0" />
            </a>
        </nav>
    </div>
    `,

    style: `
    #header-container {
        height: 50px;
        background-color: var(--black);
    }

    #header-container nav {
        height: 100%;
        max-width: var(--max-width);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }

    #header-container a {
        display: flex;
        margin: 0 5px;
        font-weight: bold;
        font-size: 1.3em;
        color: var(--white);
    }

    #header-container a:first-of-type {
        width: 100%;
    }
    
    #header-container a:last-of-type {
        width: 40px;
        margin-right: 25px;
    }

    #trolley-badge:after {
        content: attr(value);
        font-size: 12px;
        background-color: var(--red);
        border-radius:50%;
        padding: 0 5px;
        position:relative;
        left:-8px;
        top:-10px;
        opacity:0.9;
    }
    `,
});
