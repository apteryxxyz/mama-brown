createComponent('Menu', {
    script: async function (callback) {
        const RawMenus = importFile('pages/menu/menus.json');
        const Menus = JSON.parse(await RawMenus);

        const images = Object.values(Menus).flat().map(({ image }) => image);
        const uniqueImages = images.filter((img, i) => images.indexOf(img) === i);
        preloadImages(uniqueImages);

        let currentMenu = Object.keys(Menus)[0];

        const selector = document.getElementById('menu-selector');
        const [, setMenu] = useElement(
            document.getElementById('menu-container'),
            [function () {
                const buttons = Array.from(selector.children)
                buttons.forEach(b => b.classList.toggle('active', b.innerHTML.toLowerCase() === currentMenu));
            }],
        );

        window.showMenu = function (menuName) {
            currentMenu = menuName;
            const menu = Menus[menuName];
            setMenu(createInnerHTML(menu, currentMenu), menuName, menu);
        }

        showMenu(currentMenu);

        if (typeof callback === 'function') callback();
    },
    view: importFile('pages/menu/view.html'),
    style: importFile('pages/menu/style.css'),
});

function createInnerHTML(menu) {
    return (menu || []).map((p, i) => `
        <div key="${i}" class="menu-item">
            <img class="menu-item-image" src="${p.image}" />
            <div class="menu-item-content">
                <h3>${p.name} <span>${p.dietary.length ? `(${p.dietary.join('')})` : ''}</span></h3>
                <p>${p.description}</p>
                <div class="menu-item-price">
                    <p>$${p.price.toFixed(2)}</p>
                    <a onclick="addItemToTrolley('${encodeURI(JSON.stringify(p))}')">
                        <img src="assets/icons/add.svg" />
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}