"use strict"
var movieArray = [];
(function ($) {
    getMovieList();
}
)(jQuery);

function processForm(e) {
    var dict = {
        Title: this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value,
        MovieImage: this["movieImage"].value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function (movie, textStatus, jQxhr) {
            displayMovie(movie);
            movieArray.push(movie);
            $('#my-form')[0].reset();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    e.preventDefault();
}
$('#my-form').submit(processForm);

function getMovieList() {
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function (movies, textStatus, jQxhr) {
            movieArray = movies;
            $('#movieCards').html("");
            movieArray.forEach(movie => {
                displayMovie(movie);
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function search(e) {
    var searchType = this["searchtype"].value;
    var searchString = this["searchbox"].value.toLowerCase();
    let foundMovies = [];
    switch (searchType) {
        case 'genre':
            foundMovies = movieArray.filter(function (movie) {
                var genre = movie.genre.toLowerCase();
                if (genre.search(searchString) >= 0) {
                    return true;
                } 
                else {
                    return false;
                }
            });
            break;
        case 'director':
            foundMovies = movieArray.filter(function (movie) {
                var director = movie.director.toLowerCase();
                if (director.search(searchString) >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            break;
        case 'title':
            foundMovies = movieArray.filter(function (movie) {
                var title = movie.title.toLowerCase();
                if (title.search(searchString) >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            break;
    }
    console.log(foundMovies);
    $('#movieCards').html("");
    foundMovies.forEach(movie => {
        displayMovie(movie);
    });
    e.preventDefault();
}
$('#searchform').submit(search);

function displayMovie(movie) {
    $(`#movieCards`).prepend(`
    <div class = 'card m-2' style = 'width: 14rem;'>
        <img class = 'card-img-top' src='${movie.movieImage}' alt = 'movieposter'>
        <div class = 'card-body'>
            <h5 class = 'card-title'>${movie.title}</h5>
            <ul class='list-group list-group-flush'>
                <li class='list-group-item'>Director: ${movie.director}</li>
                <li class='list-group-item'>Genre: ${movie.genre}</li>
            </ul>
            <a href='#${movie.movieId}Collapse' class='btn btn-primary mt-2 btn-block' data-toggle='collapse' aria-expanded='false' aria-controls='collapseExample' role='button' id='${movie.movieId}-button'>Edit</a>
            <div id='${movie.movieId}Collapse' class='collapse'>
                <div class='form-group mt-3'>
                    <label for='${movie.title}Input'>Movie Title</label>
                    <input type='text' name='title' id='title-${movie.movieId}' value='${movie.title}' />
                    <label for='${movie.director}Input' class='mt-2'>Director</label>
                    <input type='text' name='director' id='director-${movie.movieId}' value='${movie.director}' />
                    <label for='${movie.genre}Input' class='mt-2'>Genre</label>
                    <input type='text' name='genre' id='genre-${movie.movieId}' value='${movie.genre}' />
                    <label for='${movie.movieImage}Input' class='mt-2'>Movie Poster</label>
                    <input type='text' name='movieImage' id='movieImage-${movie.movieId}' value='${movie.movieImage}' />
                    <button onclick='editMovieDetails(${movie.movieId})'  class='btn btn-danger mt-3 btn-block'>Confirm Change</button>
                </div>
            </div>
        </div>
    </div>`)
}

function editMovieDetails(id) {
    var dict = {
        MovieId: id,
        Title: $('#title-' + id).val(),
        Director: $('#director-' + id).val(),
        Genre: $('#genre-' + id).val(),
        MovieImage: $('#movieImage-' + id).val()
    };
    var putUrl = 'https://localhost:44325/api/movie/';
    console.log(dict);
    console.log(JSON.stringify(dict));

    $.ajax({
        url: putUrl,
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function (data, textStatus, jQxhr) {
            location.reload();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}