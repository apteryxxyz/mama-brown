createComponent('Home', {
    script: function () {
        insertComponent('Slideshow', document.getElementById('root-between'));
    },
    view: importFile('pages/home/view.html'),
    style: importFile('pages/home/style.css'),
});
