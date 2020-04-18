const createFilmGenre = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};


const createFilmGenreTemplate = (genres) => {
  const filmDetailsRow = genres.map((it, i) => createFilmGenre(it, i === 0)).join(`\n`);
  return `${filmDetailsRow}`;
};


const createfilmDetailRows = (details) => {
  return [
    {
      cell: `${details.director}`,
      term: `${details.director.includes(`,`) ? `Directors` : `Director`}`
    },
    {
      cell: `${details.writer}`,
      term: `${details.writer.includes(`,`) ? `Writers` : `Writer`}`,
    },
    {
      cell: `${details.actor}`,
      term: `${details.actor.includes(`,`) ? `Actors` : `Actor`}`,
    },
    {
      cell: `${details.releaseDate}`,
      term: `${details.releaseDate.includes(`,`) ? `Releases` : `Release`}`,
    },
    {
      cell: `${details.runtime}`,
      term: `${details.runtime.includes(`,`) ? `Runtimes` : `Runtime`}`,
    },
    {
      cell: `${details.country}`,
      term: `${details.country.includes(`,`) ? `Countrys` : `Country`}`,
    },
    {
      cell: `${createFilmGenreTemplate(details.genres)}`,
      term: `${details.genres.length > 1 ? `Genres` : `Genre`}`,
    },
  ];
};

const generateDetailRows = (rows) => {
  return rows.map((it) => {
    return {
      cell: it.cell,
      term: it.term
    };
  });
};


export {createfilmDetailRows, generateDetailRows};
