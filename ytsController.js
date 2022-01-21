const express = require('express');
const Router = express.Router();
const getHTML = require('../getHTML');
const cheerio = require('cheerio');
const e = require('express');

Router.get('/:movie_name', async function (req, res) {
    var movie_name = req.params.movie_name;

    var urls = 'https://yts.one/browse-movies/' + movie_name + '/all/all/0/0/latest';
    var html = await getHTML(urls);
    var $ = cheerio.load(html);

    var yts_list = [];
    $('body .row').find('.browse-movie-wrap').each(async function (i, elem) {
        var link = 'https://yts.one' + $(this).find('.browse-movie-link').attr('href');
        var movie_html = await getHTML(link);
        var $movie = cheerio.load(movie_html);

        var movie_imdb_link = $movie('[title="IMDb Rating"]').attr('href');
        var fhdtorrent = $movie(".modal-content > :nth-child(1)").find('.download-torrent').attr('href');
        var fhdmagnet = $movie(".modal-content > :nth-child(1)").find('.magnet-download').attr('href');
        var hdtorrent = $movie(".modal-content > :nth-child(2)").find('.download-torrent').attr('href');
        var hdmagnet = $movie(".modal-content > :nth-child(2)").find('.magnet-download').attr('href');
        var name = $movie("#movie-info").find('.hidden-xs').find('h1').text();
        var year = $movie("#movie-info > :nth-child(1) > :nth-child(2)").text();
        var genre = $movie("#movie-info > :nth-child(1) > :nth-child(3)").text().trim();
        var rating = $movie('[itemprop="ratingValue"]').text();
        var image_poster = $movie('[itemprop="image"]').attr('src');

        yts_list.push({name : name , year : year , genre : genre , rating : rating , image_poster : image_poster , fhdtorrent : fhdtorrent , fhdmagnet : fhdmagnet , hdtorrent : hdtorrent , hdmagnet : hdmagnet , movie_imdb_link : movie_imdb_link});
    });
    setTimeout(function() {  res.send(yts_list); }, 5000);

});

module.exports = Router;