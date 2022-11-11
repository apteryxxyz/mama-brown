createComponent('Slideshow', {
    script: async function () {
        const RawBanners = importFile('components/slideshow/banners.json');
        const Banners = JSON.parse(await RawBanners);
        preloadImages(Banners.map(b => b.image));

        const [, setSlide] = useElement(
            document.getElementById('slide-container'),
            [
                (e, b) => e.style.backgroundImage = `url("${b.image}")`,
                (e, b) => e.setAttribute('onclick', b.onclick),
            ],
        );

        let index = 0, timeout = null;
        const slide = Banners[index];
        setSlide(createBannerHTML(slide), slide);

        window.moveSlideIndex = function (event, direction) {
            if (event) event.stopPropagation();
            clearTimeout(timeout);
            let newIndex = index + direction;
            if (newIndex < 0) newIndex = Banners.length - 1;
            else if (newIndex >= Banners.length) newIndex = 0;
            const newSlide = Banners[newIndex];
            setSlide(createBannerHTML(newSlide), newSlide);
            index = newIndex;
            timeout = setTimeout(() => moveSlideIndex(null, 1), 5000);
        }

        moveSlideIndex(null, 0);
    },
    view: `<div id="slide-container"></div>`,
    style: importFile('components/slideshow/style.css'),
});

function createBannerHTML(banner) {
    return `
        <div id="slide-row">
            <a onclick="moveSlideIndex(event, -1)" class="noselect">❮</a>
            <h2>${banner.text}</h2>
            <a onclick="moveSlideIndex(event, 1)" class="noselect">❯</a>
        </div>
    `;
}