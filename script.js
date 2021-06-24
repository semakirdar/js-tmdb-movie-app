let popularMoviesSlider = document.querySelector('.popular-movies-slider');
let cinemaMoviesSlider = document.querySelector('.cinema-movies-slider');
let inputSearch = document.getElementById('inputSearch');
let modal = document.getElementById('modal');
let modalDetail = document.getElementById('modalDetail');
let detailImg = document.getElementById('detailImg');
let detailTitle = document.getElementById('detailTitle');
let detailText = document.getElementById('detailText');
let featuresMovie = document.getElementById('featuresMovie');
let popularPersonSlider = document.querySelector('.popular-person-slider');
let apikey = 'f26cbc096e3cbcf3bb49c4d120a33f36';

popularMoviesSlider.innerHTML = '';
axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apikey + '&language=en-US&page=1')
    .then(function (data) {
        console.log(data.data);
        data.data.results.forEach(function (item, i) {
            let movieItem = document.createElement('div');
            let movieImg = document.createElement('img');
            let movieTitle = document.createElement('h5');
            let movieDescription = document.createElement('p');

            movieTitle.innerHTML = item.title;
            movieDescription.innerHTML = item.overview.substr(0, 80);
            movieImg.src = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;

            movieItem.classList.add('movie-item');
            movieImg.classList.add('img-fluid');

            movieItem.appendChild(movieImg);
            movieItem.appendChild(movieTitle);
            movieItem.appendChild(movieDescription);

            popularMoviesSlider.appendChild(movieItem);

            movieItem.dataset.target = item.id;
            movieItem.addEventListener('click', function () {
                let selectedImg = this.dataset.target;

                getMovieDetail(selectedImg);
            });

            if (i == 0) {
                featuresMovie.style.backgroundImage = 'url(https://image.tmdb.org/t/p/w500/' + item.poster_path + ')';
            }
        });

        $('.popular-movies-slider').owlCarousel({
            margin: 10,
            items: 3

        });
    });
cinemaMoviesSlider.innerHTML = '';
axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + apikey + '&language=tr-TR&page=1')
    .then(function (data2) {
        console.log(data2);
        console.log('cinema movies');
        data2.data.results.forEach(function (item, i) {
            let movieItem = document.createElement('div');
            let movieImg = document.createElement('img');
            let movieTitle = document.createElement('h5');
            let movieDescription = document.createElement('p');

            movieTitle.innerHTML = item.title;
            movieDescription.innerHTML = item.overview.substr(0, 80);
            movieImg.src = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;

            movieItem.classList.add('movie-item');
            movieImg.classList.add('img-fluid');

            movieItem.appendChild(movieImg);
            movieItem.appendChild(movieTitle);
            movieItem.appendChild(movieDescription);

            cinemaMoviesSlider.appendChild(movieItem);

            movieItem.dataset.target = item.id;
            movieItem.addEventListener('click', function () {
                let selectedImg = this.dataset.target;
                console.log(selectedImg);
                modalDetail.style.display = 'block';
                axios.get('https://api.themoviedb.org/3//movie/' + selectedImg + '?api_key=' + apikey + '&language=en-US&page=1')
                    .then(function (data4) {
                        console.log(data4);
                        let genreEl = document.getElementById('genres');
                        genreEl.innerHTML = '';

                        data4.data.genres.forEach(function (genre, i) {

                            let genreItem = document.createElement('div');

                            genreItem.innerHTML = genre.name;

                            genreItem.classList.add('genre');

                            genreEl.appendChild(genreItem);
                            modalDetail.style.backgroundImage = 'url(https://image.tmdb.org/t/p/w500/' + data4.data.backdrop_path + ')';
                        });
                        let detailImg = modalDetail.querySelector('.detail-img');
                        let detailOverview = modalDetail.querySelector('.detail-overview');

                        detailImg.src = 'https://image.tmdb.org/t/p/w500/' + data4.data.poster_path;
                        detailOverview.innerHTML = data4.data.overview;

                        let companies = document.getElementById('companies');
                        companies.innerHTML = '';

                        data4.data.production_companies.forEach(function (company, i) {
                            if (company.logo_path != null) {
                                let companyImg = document.createElement('img');
                                companyImg.src = 'https://image.tmdb.org/t/p/w500/' + company.logo_path;
                                companyImg.classList.add('company-img');
                                companies.appendChild(companyImg);
                            }
                        });
                    });


            });
        });

        $('.cinema-movies-slider').owlCarousel({
            margin: 10,
            items: 3
        });


    });

inputSearch.addEventListener('keyup', function () {
    let search = inputSearch.value;
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apikey + '&language=en-US&query=' + search + '&page=1')
        .then(function (data3) {
            modal.innerHTML = '';
            console.log(data3);
            data3.data.results.forEach(function (item, i) {
                let movieItem = document.createElement('div');
                let movieImg = document.createElement('img');
                let movieTitle = document.createElement('h5');
                let movieDescription = document.createElement('p');

                movieTitle.innerHTML = item.title;
                movieDescription.innerHTML = item.overview.substr(0, 80);
                movieImg.src = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;

                movieItem.classList.add('movie-item');
                movieImg.classList.add('img-fluid');

                movieItem.dataset.target = item.id;
                movieItem.addEventListener('click', function () {
                    let selectedImg = this.dataset.target;
                    getMovieDetail(selectedImg);
                });

                movieItem.appendChild(movieImg);
                movieItem.appendChild(movieTitle);
                movieItem.appendChild(movieDescription);

                modal.appendChild(movieItem);
            });
        });
    if (modal.style.display == 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }

});

function getMovieDetail(selectedImg) {
    console.log(selectedImg);
    modalDetail.style.display = 'block';
    axios.get('https://api.themoviedb.org/3//movie/' + selectedImg + '?api_key=' + apikey + '&language=en-US&page=1')
        .then(function (data4) {
            console.log(data4);
            let genreEl = document.getElementById('genres');
            genreEl.innerHTML = '';

            data4.data.genres.forEach(function (genre, i) {

                let genreItem = document.createElement('div');

                genreItem.innerHTML = genre.name;

                genreItem.classList.add('genre');

                genreEl.appendChild(genreItem);

                modalDetail.style.backgroundImage = 'url(https://image.tmdb.org/t/p/w500/' + data4.data.backdrop_path + ')';

            });
            let detailImg = modalDetail.querySelector('.detail-img');
            let detailOverview = modalDetail.querySelector('.detail-overview');

            detailImg.src = 'https://image.tmdb.org/t/p/w500/' + data4.data.poster_path;
            detailOverview.innerHTML = data4.data.overview;

            let companies = document.getElementById('companies');
            companies.innerHTML = '';

            data4.data.production_companies.forEach(function (company, i) {
                if (company.logo_path != null) {
                    let companyImg = document.createElement('img');
                    companyImg.src = 'https://image.tmdb.org/t/p/w500/' + company.logo_path;
                    companyImg.classList.add('company-img');
                    companies.appendChild(companyImg);
                }
            });

            axios.get('https://api.themoviedb.org/3/movie/ ' + selectedImg + '/videos?api_key=' + apikey + '&language=tr-TR&page=1')
                .then(function (data5) {
                    let videoSlider = document.getElementById('videoSlider');
                    videoSlider.innerHTML = '';

                    data5.data.results.forEach(function (item, i) {
                        let sliderItem = document.createElement('div');
                        let icon = document.createElement('i');

                        sliderItem.classList.add('slider-item');
                        icon.classList.add('fas');
                        icon.classList.add('fa-play');
                        sliderItem.addEventListener('click', function () {
                            let selectedVideo = this.dataset.target;
                            console.log(selectedVideo);

                            window.location.href = 'https://www.youtube.com/watch?v=' + selectedVideo;
                        });
                        sliderItem.appendChild(icon);
                        videoSlider.appendChild(sliderItem);
                        sliderItem.dataset.target = item.key;
                    });

                    $('.video-movies-slider').owlCarousel('destroy');
                    $('.video-movies-slider').owlCarousel({
                        margin: 20,
                        items: 4
                    });
                });


            axios.get('https://api.themoviedb.org/3/movie/' + selectedImg + '/reviews?api_key=' + apikey + '&language=tr-TR&page=1')
                .then(function (data6) {
                    console.log(data6);
                });
            axios.get('https://api.themoviedb.org/3/movie/' + selectedImg + '/recommendations?api_key=' + apikey + '&language=en-US&page=1')
                .then(function (data7) {
                    console.log(data7);


                    data7.data.results.forEach(function (item, i) {

                        let recommendedMovie = document.querySelector('.recommended-movie');
                        let recommendedItem = document.createElement('div');
                        let recommendedImg = document.createElement('img');
                        let recommendedName = document.createElement('div');

                        recommendedImg.src = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;
                        recommendedName.innerHTML = item.title;

                        recommendedImg.classList.add('recommended-img');
                        recommendedName.classList.add('recommended-name');
                        recommendedItem.classList.add('recommended-item')
                        recommendedItem.appendChild(recommendedImg);
                        recommendedItem.appendChild(recommendedName);
                        recommendedMovie.appendChild(recommendedItem);

                    });


                });
        });
}

axios.get('https://api.themoviedb.org/3/person/popular?api_key=' + apikey + '&language=en-US&page=1')
    .then(function (data) {
        console.log(data);
        data.data.results.forEach(function (item, i) {
            let movieItem = document.createElement('div');
            let movieImg = document.createElement('img');
            let movieName = document.createElement('div');
            let movieDepartment = document.createElement('div');

            movieItem.appendChild(movieImg);
            movieItem.appendChild(movieName);
            movieItem.appendChild(movieDepartment);



        });


    });


$('.popular-person-slider').owlCarousel({
    margin: 10,
    items: 3
});