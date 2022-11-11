const trolleyStorage = localStorage.getItem('trolley');
let trolley = trolleyStorage ? JSON.parse(trolleyStorage) : [];

// Update the header bar trolley badge and
// sync the localStorage with the trolley array
function updateTrolley() {
    const badge = document.getElementById('trolley-badge');
    badge.setAttribute('value', trolley.length);
    localStorage.setItem('trolley', JSON.stringify(trolley));
    if (typeof updateTrolleyContent !== 'undefined') updateTrolleyContent();
}

// Add an item to the trolley and send toast
function addItemToTrolley(item) {
    item = JSON.parse(decodeURI(item));
    trolley.push(item);
    updateTrolley();
    navigateTo({ screen: 'trolley' });
}

// Remove an item from the trolley and send toast
function removeItemFromTrolley(item) {
    item = JSON.parse(decodeURI(item));
    const index = trolley.findIndex(i => i.name === item.name);
    if (index !== -1) trolley.splice(index, 1);
    updateTrolley();
}

// Clear all the items in the trolley
function clearTrolley() {
    trolley.splice(0, trolley.length);
    updateTrolley();
}

// Get all trolley related values
function getTrolleyValues() {
    const items = trolley.reduce(function (list, item) {
        const names = list.map(i => i.name);
        if (names.indexOf(item.name) === -1) {
            list.push({ count: 1, ...item });
        } else {
            const index = names.indexOf(item.name);
            list[index].count++;
        }
        return list;
    }, []);

    const pickUpTotal = items.reduce((t, i) => t + i.price * i.count, 0);
    const deliveryFee = pickUpTotal > 50 || items.length === 0 ? 0 : 6.9;
    const deliveryTotal = pickUpTotal + deliveryFee;

    return { pickUpTotal, deliveryFee, deliveryTotal, items };
}

createComponent('Trolley', {
    script: function () {
        function createTotalHTML(values) {
            return `
                <p>Pick Up Total: $${values.pickUpTotal.toFixed(2)}</p>
                <p>Deliverly Fee: $${values.deliveryFee.toFixed(2)}</p>
                <p>Deliverly Total: $${values.deliveryTotal.toFixed(2)}</p>
            `;
        }

        function createItemHTML(items) {
            return items.map((p, i) => `
                <div key="${i}" class="trolley-item">
                    <img class="trolley-item-image" src="${p.image}" />
                    <div class="trolley-item-content">
                        <h3>${p.count}x ${p.name} <span>${p.dietary.length ? `(${p.dietary.join('')})` : ''}</span></h3>
                        <h3>$${p.price.toFixed(2)} each</h3>
                        <h3>$${(p.price * p.count).toFixed(2)} total</h3>

                        <div class="trolley-item-buttons">
                            <a onclick="removeItemFromTrolley('${encodeURI(JSON.stringify(p))}')">
                                <img src="assets/icons/remove.svg" />
                            </a>
                            <!-- <a onclick="addItemToTrolley('${encodeURI(JSON.stringify(p))}')">
                                <img src="assets/icons/add.svg" />
                            </a> -->
                        </div>
                    </div>
                </div>
            `).join('');
        }

        const prices = document.getElementById('trolley-prices');
        const [, setTrolleyItems] = useElement(
            document.getElementById('trolley-list'),
            [(_, t) => prices.innerHTML = createTotalHTML(t)],
            (e, h) => e.insertAdjacentHTML('beforeend', h),
        );

        window.updateTrolleyContent = function () {
            const page = getActivePage();
            if (page !== 'trolley') return;

            const currentItems = Array.from(document.getElementsByClassName('trolley-item'));
            const filteredItems = currentItems.filter(e => e.id !== 'trolley-add');
            filteredItems.forEach(e => e.remove());

            const trolleyValues = getTrolleyValues();
            setTrolleyItems(createItemHTML(trolleyValues.items), trolleyValues);
        }

        updateTrolleyContent();
    },
    view: importFile('pages/trolley/view.html'),
    style: importFile('pages/trolley/style.css'),
});
