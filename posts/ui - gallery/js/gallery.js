(function () {
    const data = [
        {
            title: 'Portfolio',
            image: 'images/myblogger.jpg',
            link: 'https://lockex1987.github.io/'
        },
        {
            title: '',
            image: 'images/home2.jpg',
            link: ''
        },

        {
            title: '',
            image: 'images/home3.jpg',
            link: ''
        },
        {
            title: '',
            image: 'images/home4.jpg',
            link: ''
        },
        {
            title: '',
            image: 'images/home5.jpg',
            link: ''
        },
        {
            title: '',
            image: 'images/home6.jpg',
            link: ''
        },
        {
            title: '',
            image: 'images/home7.jpg',
            link: ''
        },
        {
            title: '',
            image: 'images/home8.jpg',
            link: ''
        }
    ];

    const gallery = document.getElementById('gallery');
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const img = document.createElement('img');
        img.src = e.image;
        const figure = document.createElement('figure');
        figure.className = 'mx-0';
        const figcaption = document.createElement('figcaption');
        figcaption.className = 'p-3 mt-0';
        figure.appendChild(img);
        figure.appendChild(figcaption);
        const li = document.createElement('div');
        li.className = 'mb-3 col-6 col-lg-4';
        if (e.title) {
            figcaption.textContent = e.title;
            const a = document.createElement('a');
            a.className = 'text-decoration-none';
            a.href = e.link;
            a.appendChild(figure);
            li.appendChild(a);
        } else {
            figcaption.textContent = 'Comming soon';
            li.appendChild(figure);
        }

        gallery.appendChild(li);
    }
})();
