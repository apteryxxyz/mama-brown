createComponent('Deals', {
    script: async function () {
        const RawDeals = await importFile('pages/deals/deals.json');
        const Deals = JSON.parse(RawDeals);

        const [, setDeals] = useElement(document.getElementById('deals-container'));
        setDeals(createDealsHTML(Deals), Deals);
    },
    view: '<div id="deals-container"></div>',
    style: importFile('pages/deals/style.css'),
});

function createDealsHTML(deals) {
    return (deals || []).map((d, i) => `
        <div key="${i}" id="${d.id}" class="deal">
            <img class="deal-image" src="${d.image}" />
            <div class="deal-content">
                <div class="deal-title">
                    <h3>${d.title[0]}</h3>
                    ${d.title[1] ? `<h3>${d.title[1]}</h3>` : ''}
                </div>
                ${d.subtitle ? `<p class="deal-subtitle">${d.subtitle}</p>` : ''}
                <p class="deal-description">${d.description}</p>
            </div>
        </div>
    `).join('');
}