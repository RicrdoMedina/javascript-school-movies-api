const moviesMock = [
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b75e",
    title: "Notti bianche, Le (White Nights)",
    year: 2019,
    cover: "http://dummyimage.com/800x600.png/ff4444/ffffff",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    duration: 66,
    contentRating: "G",
    source: "https://ovh.net/semper/rutrum/nulla/nunc.jsp",
    tags: [
      "Action|Adventure",
      "Action|Adventure|Thriller",
      "Horror|Western",
      "Horror|Thriller",
      "Comedy|Romance|Sci-Fi",
      "Adventure|Animation|Children|Comedy|Fantasy",
      "Drama"
    ]
  },
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b76e",
    title: "Notti bianche, Le (White Nights)",
    year: 2019,
    cover: "http://dummyimage.com/800x600.png/ff4444/ffffff",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    duration: 66,
    contentRating: "G",
    source: "https://ovh.net/semper/rutrum/nulla/nunc.jsp",
    tags: [
      "Action|Adventure",
      "Action|Adventure|Thriller",
      "Horror|Western",
      "Horror|Thriller",
      "Comedy|Romance|Sci-Fi",
      "Adventure|Animation|Children|Comedy|Fantasy",
      "Drama"
    ]
  },
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b77e",
    title: "Notti bianche, Le (White Nights)",
    year: 2019,
    cover: "http://dummyimage.com/800x600.png/ff4444/ffffff",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    duration: 66,
    contentRating: "G",
    source: "https://ovh.net/semper/rutrum/nulla/nunc.jsp",
    tags: [
      "Action|Adventure",
      "Action|Adventure|Thriller",
      "Horror|Western",
      "Horror|Thriller",
      "Comedy|Romance|Sci-Fi",
      "Adventure|Animation|Children|Comedy|Fantasy",
      "Drama"
    ]
  },
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b78e",
    title: "Notti bianche, Le (White Nights)",
    year: 2019,
    cover: "http://dummyimage.com/800x600.png/ff4444/ffffff",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    duration: 66,
    contentRating: "G",
    source: "https://ovh.net/semper/rutrum/nulla/nunc.jsp",
    tags: [
      "Action|Adventure",
      "Action|Adventure|Thriller",
      "Horror|Western",
      "Horror|Thriller",
      "Comedy|Romance|Sci-Fi",
      "Adventure|Animation|Children|Comedy|Fantasy",
      "Drama"
    ]
  },
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b79e",
    title: "Notti bianche, Le (White Nights)",
    year: 2019,
    cover: "http://dummyimage.com/800x600.png/ff4444/ffffff",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    duration: 66,
    contentRating: "G",
    source: "https://ovh.net/semper/rutrum/nulla/nunc.jsp",
    tags: [
      "Action|Adventure",
      "Action|Adventure|Thriller",
      "Horror|Western",
      "Horror|Thriller",
      "Comedy|Romance|Sci-Fi",
      "Adventure|Animation|Children|Comedy|Fantasy",
      "Drama"
    ]
  }
];

//Permitir crear las peliculas filtradas

function filteredMoviesMock(tag) {
  return moviesMock.filter(movie => movie.tags.includes(tag));
}

//Crear mock de nuestro servicios
class MoviesServiceMock {
  //Obtener el listado de las peliculas
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  // Mock de create movie
  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = {
  moviesMock,
  filteredMoviesMock,
  MoviesServiceMock
};
