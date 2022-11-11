createComponent('Footer', {
    script: function () { },

    view: `
    <div id="footer-container">
        <div class="noselect">
            <a onclick="navigateTo({ screen: 'about' })">About</a>
            <a>Feedback</a>
            <a>Privacy Policy</a>
            <a>Terms</a>
            <a>Shipping & Returns</a>
            <a>Careers</a>
            <a>Franchise</a>
        </div>

        <br />
        <p>&copy; ${new Date().getFullYear()} Mama Brown</p>
    </div>
    `,

    style: `
    #footer-container {
        display: inline-block;
        width: 100%;
        text-align: center;
        background-color: var(--black);
        color: var(--white);
        padding: 30px;
    }

    #footer-container a {
        margin: 1vw;
    }
    `,
});
