
const createFilmDetailsRow = (row) => {
  const {term, cell} = row;
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${term}</td>
      <td class="film-details__cell">${cell}</td>
    </tr>`
  );
};


export const createFilmDetailsTemplate = (rows) => {
  const filmDetailsRow = rows.map((it, i) => createFilmDetailsRow(it, i === 0)).join(`\n`);

  return `<table class="film-details__table">
      ${filmDetailsRow}
    </table>`;
};
