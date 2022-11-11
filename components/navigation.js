createComponent('Navigation', {
    script: function () { },

    view: `
    <div id="navigation-container">
        <nav>
            <a onclick="navigateTo({ screen: 'menu' })">Menu</a>
            <a onclick="ifElse(!!account.email, () => navigateTo({ screen: 'bookings' }), () => navigateTo({ screen: 'login', return_to: 'bookings' }))()">Bookings</a>
            <a onclick="navigateTo({ screen: 'deals' })">Deals</a>
        </nav>
    </div>
    `,

    style: `
    #navigation-container {
        height: 50px;
        background-color: #F14545;
    }

    #navigation-container nav {
        height: 100%;
        max-width: var(--max-width);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }

    #navigation-container a {
        display: flex;
        margin: auto;
        max-width: calc(var(--max-width) / 4);
        font-weight: bold;
        font-size: 1.3rem;
        color: white;
    }
    `,
});