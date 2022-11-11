createComponent('About', {
    script: () => { },
    view: `
        <div id="about-container">
            <div id="about-content">
                <h2>About Mama Brown</h2>

                <p>
                Mama Brown was born in 2013 and has grown into a loved and recognised brand throughout New Zealand.<br/>
                Our quirky, fun and cheeky personality has made us a popular dining destination.<br/>
                We have worked to keep those customers at the forefront of our mission to provide a consistently excellent dining experience.<br/>
                Our knowledge has allowed us to create products, processes and a brand that has led to exciting success.
                </p>

                <img src="assets/other/about.jpg" />
            </div>
        </div>
    `,
    style: `
        #about-container {
            display: flex;
            max-width: var(--max-width);
            flex-direction: column;
            margin: 1vw auto;

            align-items: center;
            justify-content: center;

            background-color: var(--white);
            border-radius: 30px;
            padding: 10px;
        }

        #about-content h2 {
            font-size: 1.5em;
            font-weight: bold;
        }

        #about-content img {
            width: 100%;
            margin: 1vw auto;
            border-radius: 30px;
        }
    `,
});