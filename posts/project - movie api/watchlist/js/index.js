/*

TO DO LIST
1.fix poster loading by changing the url to the smaller img size - done
2.add genre and category sorting to tv shows 
3.add more info to tv and movie info screens - done
4.fix css for large and small screens - done 
5.for loop to show all genres for movies - done
6.add cast info to movie and tv info screens - done
7.add imdb link to tv and movies - done
8.add star rating - done
9.add placeholder poster and background images:poster done packdrop not done
10.add tv search
11.get multi search working

*/
var next = 1;
var nextTV = 1;

var posterPaths = "http://image.tmdb.org/t/p/w500";
var backgroundPaths = "http://image.tmdb.org/t/p/w1000";
var url = "https://api.themoviedb.org/3/discover/movie?";
var key = "&api_key=84ade81a32ab2ef4395fd367ad4ea5be";
var urlTV = "https://api.themoviedb.org/3/discover/tv?";
var moreTVinfo = "https://api.themoviedb.org/3/tv/  +tvshow id+  ?&api_key=84ade81a32ab2ef4395fd367ad4ea5be";
var movieCast = "https://api.themoviedb.org/3/movie/";
var actorInfo = "https://api.themoviedb.org/3/discover/movie?&with_cast=";
var imdbLink = "http://www.imdb.com/title/";
var date = new Date();

function sortMovies(choice) {
  next=0;
  $(".movies").remove();
  if (choice === "rating") {
    choices="vote_count.gte=50&sort_by=vote_average.desc";
    showMovie("vote_count.gte=50&sort_by=vote_average.desc");
  } else if (choice === "grossing") {
    choices="sort_by=revenue.desc";
    showMovie("sort_by=revenue.desc");
  }
  // Genres sort by list start
  else if (choice === "action") {
    choices="&with_genres=28";
    showMovie("&with_genres=28");
  } else if (choice === "adventure") {
    choices="&with_genres=12";
    showMovie("&with_genres=12");
  } else if (choice === "animation") {
    choices="&with_genres=16";
    showMovie("&with_genres=16");
  } else if (choice === "comedy") {
    choices="&with_genres=35";
    showMovie("&with_genres=35");
  } else if (choice === "crime") {
    choices="&with_genres=80";
    showMovie("&with_genres=80");
  } else if (choice === "documentary") {
    choices="&with_genres=99";
    showMovie("&with_genres=99");
  } else if (choice === "drama") {
    choices="&with_genres=18";
    showMovie("&with_genres=18");
  } else if (choice === "family") {
    choices="&with_genres=10751";
    showMovie("&with_genres=10751");
  } else if (choice === "fantasy") {
    choices="&with_genres=14";
    showMovie("&with_genres=14");
  } else if (choice === "foreign") {
    choices="&with_genres=10769";
    showMovie("&with_genres=10769");
  } else if (choice === "history") {
    choices="&with_genres=36";
    showMovie("&with_genres=36");
  } else if (choice === "horror") {
    choices="&with_genres=27";
    showMovie("&with_genres=27");
  } else if (choice === "music") {
    choices="&with_genres=10402";
    showMovie("&with_genres=10402");
  } else if (choice === "mystery") {
    choices="&with_genres=9648";
    showMovie("&with_genres=9648");
  } else if (choice === "romance") {
    choices="&with_genres=10749";
    showMovie("&with_genres=10749");
  } else if (choice === "science fiction") {
    choices="&with_genres=878";
    showMovie("&with_genres=878");
  } else if (choice === "tv movie") {
    choices="&with_genres=10770";
    showMovie("&with_genres=10770");
  } else if (choice === "thriller") {
    choices="&with_genres=53";
    showMovie("&with_genres=53");
  } else if (choice === "war") {
    choices="&with_genres=10752";
    showMovie("&with_genres=10752");
  } else if (choice === "western") {
    choices="&with_genres=37";
    showMovie("&with_genres=37");
  }
  //genre ends
  else {
    choices="sort_by=popularity.desc";
    showMovie("sort_by=popularity.desc");
  }
}

function sortTv(choice) {
  nextTV = 0;
  $(".tv").remove();
  if (choice === "rating") {
    choices="vote_count.gte=50&sort_by=vote_average.desc";
    showTv("vote_count.gte=50&sort_by=vote_average.desc");
  } else if (choice === "grossing") {
    choices="sort_by=revenue.desc";
    showTv("sort_by=revenue.desc");
  }
  // Genres sort by list start
  else if (choice === "action") {
    choices="&with_genres=28";
    showTv("&with_genres=28");
  } else if (choice === "adventure") {
    choices="&with_genres=12";
    showTv("&with_genres=12");
  } else if (choice === "animation") {
    choices="&with_genres=16";
    showTv("&with_genres=16");
  } else if (choice === "comedy") {
    choices="&with_genres=35";
    showTv("&with_genres=35");
  } else if (choice === "crime") {
    choices="&with_genres=80";
    showTv("&with_genres=80");
  } else if (choice === "documentary") {
    choices="&with_genres=99";
    showTv("&with_genres=99");
  } else if (choice === "drama") {
    choices="&with_genres=18";
    showTv("&with_genres=18");
  } else if (choice === "family") {
    choices="&with_genres=10751";
    showTv("&with_genres=10751");
  } else if (choice === "fantasy") {
    choices="&with_genres=14";
    showTv("&with_genres=14");
  } else if (choice === "foreign") {
    choices="&with_genres=10769";
    showTv("&with_genres=10769");
  } else if (choice === "history") {
    choices="&with_genres=36";
    showTv("&with_genres=36");
  } else if (choice === "horror") {
    choices="&with_genres=27";
    showTv("&with_genres=27");
  } else if (choice === "music") {
    choices="&with_genres=10402";
    showTv("&with_genres=10402");
  } else if (choice === "mystery") {
    choices="&with_genres=9648";
    showTv("&with_genres=9648");
  } else if (choice === "romance") {
    choices="&with_genres=10749";
    showTv("&with_genres=10749");
  } else if (choice === "science fiction") {
    choices="&with_genres=878";
    showTv("&with_genres=878");
  } else if (choice === "tv movie") {
    choices="&with_genres=10770";
    showTv("&with_genres=10770");
  } else if (choice === "thriller") {
    choices="&with_genres=53";
    showTv("&with_genres=53");
  } else if (choice === "war") {
    choices="&with_genres=10752";
    showTv("&with_genres=10752");
  } else if (choice === "western") {
    choices="&with_genres=37";
    showTv("&with_genres=37");
  }
  //genre ends
  else {
    choices="sort_by=popularity.desc";
    showTv("sort_by=popularity.desc");
  }
}
/// when enter is hit it starts the search 
function checkSubmit(e) {
  if (e && e.keyCode == 13) {
    var searching = document.getElementById('search').value;
    search(searching);
    document.getElementById('search').value = "";
    return false;
  }
}

function search(search) {
  $(".movies").remove();
  $(".tv").remove();
  //http://api.themoviedb.org/3/search/multi?api_key=84ade81a32ab2ef4395fd367ad4ea5be&query=
  var searchurl = "https://api.themoviedb.org/3/search/multi?api_key=84ade81a32ab2ef4395fd367ad4ea5be&query=";
  $.getJSON(searchurl + search, function(data) {
    for (var i = 0; i < data.results.length; i++) {
      var id = data.results[i].id;
      var title = data.results[i].name;
      var rating = data.results[i].vote_average;
      var poster = posterPaths + data.results[i].poster_path;
      var overview = data.results[i].overview;
      if (poster === "http://image.tmdb.org/t/p/w500null") {
          //if their is no poster dont show the movie
      }
      else if(overview == "null"){
        //dont show if the overview is null
      }
      else{
      $(".main").append("<div class='col-sm-2 text-center movies m" + i + "' id='" + id + "'><div class='tiles'><img onclick='movieInfo(" + id + ")' src=" + poster + "><div class='ratings'><p class='lead rating'>" + ratin + " <i class='fa fa-star' aria-hidden='true'></i></p></div></div></div>");
      }
    }
  });
}

function showMovie(choice) {
  next++;
  $.getJSON(url + choice + key + "&page=" + next, function(data) {
    for (var i = 0; i < data.results.length; i++) {
      var id = data.results[i].id;
      var title = data.results[i].title;
      var overview = data.results[i].overview;
      var rating = data.results[i].vote_average;
      roundHalf(rating);

      function roundHalf(rating) {
        ratin = rating / 2;
        ratin = Math.round(ratin * 2) / 2;
      }
      var poster = posterPaths + data.results[i].poster_path;
      if (poster === "http://image.tmdb.org/t/p/w500null") {
          //if their is no poster dont show the movie
      }
      else if(overview == "null"){
        //dont show if the overview is null
      }
      else{
      $(".main").append("<div class='col-sm-2 text-center movies m" + i + "' id='" + id + "'><div class='tiles'><img onclick='movieInfo(" + id + ")' src=" + poster + "><div class='ratings'><p class='lead rating'>" + ratin + " <i class='fa fa-star' aria-hidden='true'></i></p></div></div></div>");
      }
    }
  });
}

function movieInfo(id) {
  $.getJSON(movieCast + id + "/casts?" + key, function(json) {
    cast1 = json.cast[0].name;
    cast1id = json.cast[0].id;
    cast2 = json.cast[1].name;
    cast2id = json.cast[1].id;
    cast3 = json.cast[2].name;
    cast3id = json.cast[2].id;
    cast4 = json.cast[3].name;
    cast4id = json.cast[3].id;
    $(".movies").hide();
    $(".more").hide();
    var infoURL = "https://api.themoviedb.org/3/movie/" + id + "?&api_key=84ade81a32ab2ef4395fd367ad4ea5be";
    $.getJSON(infoURL, function(data) {
      var budget = "$" + data.budget;
      if (budget === "$0") {
        budget = "Budget not yet released";
      }
      var revenue = "$" + data.revenue;
      if (revenue === "$0") {
        revenue = "Revenue not yet released";
      }
      var release = data.release_date;
      var imdb = imdbLink + data.imdb_id;
      var runtime = data.runtime;
      var tagline = data.tagline;
      var title = data.title;
      var overview = data.overview;
      var poster = posterPaths + data.poster_path;
      if (poster === "http://image.tmdb.org/t/p/w1000null") {
        poster = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Poster%20Availible&w=250&h=350";
      }
      var backdrop = backgroundPaths + data.backdrop_path;
      if (data.genres.length > 3) {
        genre = data.genres[0].name + ", " + data.genres[1].name+ ", " + data.genres[2].name + ", " + data.genres[3].name;
      } else if (data.genres.length > 2) {
        genre = data.genres[0].name + ", " + data.genres[1].name + ", " + data.genres[2].name;
      } else if (data.genres.length > 1) {
        genre = data.genres[0].name + ", " + data.genres[1].name;
      } else {
        genre = data.genres[0].name;
      }
      $(".main").prepend("<div class='col-sm-12 overview'><div class='background'><img src=" + backdrop + "></div><div class='col-sm-4 over-poster'><img src=" + poster + "></div><div class='col-sm-8 text-left'><h1 class=''>" + title + "<span class='runtime'> - Runtime: " + runtime + "mins</span></h1><p class='lead tagline'><i>" + tagline + "</i></p><p class='lead text-left'>" + overview + "</p></div><div class='col-sm-2 text-left'><h2>Genre:</h2><p class='lead text-left'>" + genre + "</p></div><div class='col-sm-3 text-left cast'><h2 class='text-left'>Cast:</h2><p class='lead'><a onclick='showActor(" + cast1id + ")'>" + cast1 + "</a>, <a onclick='showActor(" + cast2id + ")'> " + cast2 + "</a>, <a onclick='showActor(" + cast3id + ")'>" + cast3 + "</a>, <a onclick='showActor(" + cast4id + ")'>" + cast4 + "</a></p></div><div class='col-sm-3 text-left facts'><h2>Facts &amp; Figures</h2><p class='lead'>Budget: " + budget + "</p><p class='lead'>Revenue: " + revenue + "</p></div><div id='hideMInfo' class='exit'><i onclick='exit(" + id + ")' class='fa fa-times-circle' aria-hidden='true'></i></div></div>");
    });
  });
}

function showActor(id) {
  $(".overview").hide();
  var next = 0;
  next++;
  $.getJSON(actorInfo + id + key + "&page=" + next, function(data) {
    for (var i = 0; i < data.results.length; i++) {
      var id = data.results[i].id;
      var title = data.results[i].title;
      var overview = data.results[i].overview;
      var rating = data.results[i].vote_average;
      roundHalf(rating);

      function roundHalf(rating) {
        ratin = rating / 2;
        ratin = Math.round(ratin * 2) / 2;
      }
      var poster = posterPaths + data.results[i].poster_path;
      if (poster === "http://image.tmdb.org/t/p/w500null") {
        poster = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Poster%20Availible&w=250&h=350";
      }
      $(".main").append("<div class='col-sm-2 text-center movies m" + i + "' id='" + id + "'><div class='tiles'><img onclick='movieInfo(" + id + ")' src=" + poster + "><div class='ratings'><p class='lead rating'>" + ratin + " <i class='fa fa-star' aria-hidden='true'></i></p></div></div></div>");
    }
  })
}

function showTv(choice) {
  nextTV++;
  console.log(url + choice + key + "&page=" + next);
  $.getJSON(urlTV + choice + key + "&page=" + nextTV, function(data) {
    for (var i = 0; i < data.results.length; i++) {
      var id = data.results[i].id;
      var title = data.results[i].name;
      var rating = data.results[i].vote_average;
      var overview = data.results[i].overview;
      roundHalf(rating);

      function roundHalf(rating) {
        ratin = rating / 2;
        ratin = Math.round(ratin * 2) / 2;
      }
      var poster = posterPaths + data.results[i].poster_path;
      if (poster === "http://image.tmdb.org/t/p/w500null") {
        poster = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Poster%20Availible&w=250&h=400";
      }
      if (poster === "http://image.tmdb.org/t/p/w500null") {
          //if their is no poster dont show the movie
      }
      else if(overview == "null"){
        //dont show if the overview is null
      }
      else{
      $(".main").append("<div class='col-sm-2 text-center tv t" + i + "' id='" + id + "'><div class='tiles'><img onclick='tvInfo(" + id + ")' src=" + poster + "><div class='ratings'><p class='lead rating'>" + ratin + " <i class='fa fa-star' aria-hidden='true'></i></p></div></div></div>");
      }
    }
  });
}

function tvInfo(id) {
  $(".movie").remove();
  $(".tv").hide();
  $(".moreTV").hide();
  var infoURL = "https://api.themoviedb.org/3/tv/" + id + "?&api_key=84ade81a32ab2ef4395fd367ad4ea5be";
  $.getJSON(infoURL, function(data) {
    var genre;
    if (data.genres.length > 3) {
      genre = data.genres[0].name + ", " + data.genres[1].name + ", " + data.genres[2].name + ", " + data.genres[3].name;
    } else if (data.genres.length > 2) {
      genre = data.genres[0].name + ", " + data.genres[1].name + ", " + data.genres[2].name;
    } else if (data.genres.length > 1) {
      genre = data.genres[0].name + ", " + data.genres[1].name;
    } else {
      genre = data.genres[0].name;
    }
    var seasons = data.seasons.length;
    var title = data.name;
    var rating = data.vote_average;
    var overview = data.overview;
    var poster = posterPaths + data.poster_path;
    if (poster === "https://image.tmdb.org/t/p/w500null") {
      poster = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Poster%20Availible&w=250&h=400";
    }
    var backdrop = backgroundPaths + data.backdrop_path;
    $(".main").prepend("<div class='col-sm-12 overview'><div class='background'><img src=" + backdrop + "></i></div><div class='col-sm-4 over-poster'><img src=" + poster + "></div><div class='col-sm-8 text-left'><h1 class=''>" + title + "</h1><p class='lead text-left'>" + overview + "</p></div><div class='col-sm-3 text-left'><h2>Genre:</h2><p class='lead text-left'>" + genre + "</p></div><div class='col-sm-5 text-left seasons'><h2>Season information:</h2><select class='col-sm-8 lead text-left season'></select></div><div id='hideMInfo' class='exit'><i onclick='exitTv(" + id + ")' class='fa fa-times-circle' aria-hidden='true'></div></div>");
    
    for (var i = 0; i < data.seasons.length; i++) {
      $(".season").prepend("<option onclick='seriesInfo("+data.seasons[i].id+","+data.seasons[i].season_number+")' value='"+data.seasons[i].season_number+"'>Season "+data.seasons[i].season_number+" </option>");
    }
     //var selected = $( ".season option:selected" ).value();
     //seriesInfo(data.seasons[i].id,selected);
  });
}

function seriesInfo(id,num){
  var seriesURL = "https://api.themoviedb.org/3/tv/"+id+"/season/"+num+"?&api_key=84ade81a32ab2ef4395fd367ad4ea5be";
  $.getJSON(seriesURL, function(data) {
    for(var i=0; i<data.episodes.length;i++){
      var seasonname = data.name;
      var seasonoverview = data.overview;
      var episode = data.episodes[i].name;
      var overview = data.episodes[i].overview;
      var airdate = data.episodes[i].air_date;
      
      $(".seasons").append("<div><p>"+episode+"</p><p>"+overview+"</p><p>"+airdate+"</p></div>");
    }
  });
}

$("#tv").click(function() {
  nextTV = 0;
  sortTv();
  $(".movies").remove();
  $(".overview").remove();
  $(".moreTV").show();
  $(".more").hide();
  $(".droptv").show();
  $(".dropmovies").hide();
});
$("#movie").click(function() {
  sortMovies();
  $(".tv").remove();
  $(".overview").remove();
  $(".more").show();
  $(".moreTV").hide();
  $(".dropmovies").show();
  $(".droptv").hide();
  next = 1;
});
$(".more").click(function() {
  showMovie(choices);
});
$(".moreTV").click(function() {
  showTv(choices);
});

function exit(id) {
  $(".overview").remove();
  $(".movies").show();
  $(".more").show( );
  window.location.hash = id;
}

function exitTv(id) {
  $(".overview").hide();
  $(".tv").show();
  $(".moreTV").show();
  window.location.hash = id;
}
sortMovies();