import moment from "moment";

import AbstractComponent from "./abstract-component.js";
import CommentsComponent from "./comments/index.js";

import {generateLengthMarkup} from "../utils/movie.js";
import {createElement, render, RenderPosition} from "../utils/render.js";

const GENRE_LABEL = `Genre`;
const GENRES_LABEL = `Genres`;

const createGenreMarkup = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createMoviePopupTemplate = (movie) => {
  const {
    title,
    alternativeTitle,
    description,
    totalRating,
    runtime,
    poster,
    genres,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry,
    ageRating
  } = movie;

  const length = generateLengthMarkup(runtime);
  const writersContent = writers.join(`, `);
  const actorsContent = actors.join(`, `);

  const releaseDateMarkup = moment(releaseDate).format(`DD MMMM YYYY`);
  const genresLabelMarkup = genres.length > 1 ? GENRES_LABEL : GENRE_LABEL;
  const genresMarkup = genres.map((genre) => createGenreMarkup(genre)).join(`\n`);
  const ageRatingMarkup = `${ageRating}+`;

  const checkedWatchlist = movie.isWatchlist ? `checked` : ``;
  const checkedWatched = movie.isWatched ? `checked` : ``;
  const checkedFavorite = movie.isFavorite ? `checked` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">${ageRatingMarkup}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersContent}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsContent}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDateMarkup}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${length}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresLabelMarkup}</td>
                  <td class="film-details__cell">${genresMarkup}</td>
                </tr>
              </tbody></table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${checkedWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${checkedWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${checkedFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container"></div>
      </form>
    </section>`
  );
};

export default class MoviePopup extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;

    this._commentsComponent = new CommentsComponent(movie);
  }

  getTemplate() {
    return createMoviePopupTemplate(this._movie);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      const commentsContainer = this._element.querySelector(`.form-details__bottom-container`);

      render(commentsContainer, this._commentsComponent, RenderPosition.BEFOREEND);
    }
    return this._element;
  }

  setClickCloseHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  setDeleteCommentHandler(handler) {
    this._commentsComponent.setDeleteCommentHandler(handler);
  }

  setSubmitFormHandler(handler) {
    this._commentsComponent.setSubmitFormHandler(handler);
  }
  removeSubmitHandler() {
    this._commentsComponent.removeSubmitHandler();
  }
}
