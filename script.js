// Menggunakan jquery (Jadul) || WORK
// http://www.omdbapi.com/?apikey=ea38e251&s=naruto
// $(".search-button").on("click", function () {
//    $.ajax({
//       url: "http://www.omdbapi.com/?apikey=ea38e251&s=" + $(".input-keyword").val(),
//       success: (result) => {
//          const movies = result.Search;
//          // console.log(movies);
//          let cards = "";
//          movies.forEach((m) => {
//             cards += showCards(m);
//          });
//          $(".movie-container").html(cards);

//          // ketika tombol detail di klik
//          $(".modal-detail-button").on("click", function () {
//             console.log($(this).data("imdbid"));
//             $.ajax({
//                url: "http://www.omdbapi.com/?apikey=ea38e251&i=" + $(this).data("imdbid"),
//                success: (m) => {
//                   const movieDetail = showMovieDetail(m);
//                   $(".modal-body").html(movieDetail);
//                },
//                error: (e) => {
//                   console.log(e.responseText);
//                },
//             });
//          });
//       },
//       error: (e) => {
//          console.log(e.responseText);
//       },
//    });
// });

// Menggunakan fetch() (Baru) || WORK
// Masukkan element ke dalam varible
const searchBtn = document.querySelector(".search-button");
// Ketika di click lakukan fungsi fetch
searchBtn.addEventListener("click", function () {
   const inputKeyword = document.querySelector(".input-keyword");
   // Lalu tambah value yang di ketik  diakhir link dan lakukan fetch
   fetch("http://www.omdbapi.com/?apikey=ea38e251&s=" + inputKeyword.value)
      // Ubah responsenya menjadi mengguanakan method json()
      .then((response) => response.json())
      .then((response) => {
         // Masukan response search nya kedalam variable
         const movie = response.Search;
         // Buat variable string kosong untuk menyimpan isi card
         let cards = "";
         // Lalu variable movie di beri method foreach karena isi dari movie adalah array of object
         // Jalankan function, untuk setiap response search masuk kedalam parameter m
         // didalam function card diberi opereator addition assgiment yaitu function showCards() isi dengan parameter m tadi
         movie.forEach((m) => (cards += showCards(m)));
         const movieContainer = document.querySelector(".movie-container");
         // Masukan kedalam variable movieContainer
         movieContainer.innerHTML = cards;

         // Untuk button show detail
         const modalDetailButton = document.querySelectorAll(".modal-detail-button");
         // Ambil dan beri method forEach
         modalDetailButton.forEach((btn) => {
            // Jalankan event handler ketika di click
            btn.addEventListener("click", function () {
               // Ambil data-imdbid dari setaip card masukkan kedalam varible
               const imdbid = this.dataset.imdbid;
               fetch("http://www.omdbapi.com/?apikey=ea38e251&i=" + imdbid)
                  .then((response) => response.json())
                  .then((e) => {
                     const movieDetail = showMovieDetail(e);
                     const modalBody = document.querySelector(".modal-body");
                     modalBody.innerHTML = movieDetail;
                  });
            });
         });
      });
});

// Refactor (Biar lebih rapih)
// const searchBtn = document.querySelector(".search-button");
// searchBtn.addEventListener("click", async function () {
//    const inputKeyword = document.querySelector(".input-keyword");
//    const movies = await getMovies(inputKeyword.value);
//    updateUI(movies);
// });
// function getMovies(keyword) {
//    return fetch("http://www.omdbapi.com/?apikey=ea38e251&s=" + keyword)
//       .then((response) => response.json())
//       .then((response) => response.Search);
// }
// function updateUI(e) {
//    let cards = "";
//    e.forEach((m) => (cards += showCards(m)));
//    const movieContainer = document.querySelector(".movie-container");
//    movieContainer.innerHTML = cards;
// }

// event binding

// document.addEventListener("click", async function (e) {
//    if (e.target.classList.contains("modal-detail-button")) {
//       const imdbid = e.target.dataset.imdbid;
//       console.log(imdbid);
//       const getImdb = await getMoviesDetail(imdbid);
//       // console.log(movieDetail);
//       updateUIDetail(getImdb);
//    }
// });
// async function getMoviesDetail(id) {
//    return await fetch("http://www.omdbapi.com/?apikey=ea38e251&i=" + id)
//       .then((response) => response.json())
//       .then((response) => response);
// }
// function updateUIDetail(m) {
//    const detail = showMovieDetail(m);
//    const modalBody = document.querySelector(".modal-body");
//    modalBody.innerHTML = detail;
// }

function showCards(e) {
   return `<div class="col-md-4 col-lg-3 my-3 ">
            <div class="card h-100" >
              <img src="${e.Poster}" class="card-img-top" >
               <div class="card-body">
                  <h5 class="card-title">${e.Title}</h5>
                  <p class="card-text text-muted">${e.Year}</p>
                  <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetail" data-imdbid="${e.imdbID}">Show Detail</a>
               </div>
            </div>
      </div>`;
}

function showMovieDetail(e) {
   return ` <div class="container-fluid">
               <div class="row">
                  <div class="col-md-4">
                     <img src="${e.Poster}" class="img-fluid" />
                  </div>
                     <div class="col-md">
                     <ul class="list-group">
                     <h4 class="list-group-item">${e.Title} ${e.Year}</h4>
                     <li class="list-group-item"><strong>Writer : </strong>${e.Writer}</li>
                     <li class="list-group-item"><strong>Director : </strong>${e.Director}</li>
                     <li class="list-group-item"><strong>Aktor : </strong>${e.Actors}</li>
                     <li class="list-group-item"><strong>Plot : </strong><br>${e.Plot}</li>
                     </ul>
                  </div>
               </div>
            </div>`;
}
