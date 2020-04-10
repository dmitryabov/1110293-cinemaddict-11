const createfilmDetailRows = (details) => {
  return [
    {Director: `${details.director}`},
    {Writers: `${details.writer}`},
    {Actors: `${details.actor}`},
    {Release: `${details.releaseDate}`},
    {Runtime: `${details.runtime}`},
    {Country: `${details.country}`},
    {Genres: `${details.genres}`},
  ];
};


const generateDetailRows = (rows) => {
  return rows.map((it) => {
    return {
      term: Object.keys(it),
      cell: Object.values(it)
    };
  });
};


export {createfilmDetailRows, generateDetailRows};
