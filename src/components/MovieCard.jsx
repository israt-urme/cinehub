import React from "react";
import noPoster from "../assets/no-poster.png";

/** A presentational component:
 * it doesn't handle any logic, accepting some props that pass into it and rendering them
 * @param title
 * @param vote_average
 * @param poster_path
 * @param release_date
 * @param original_language
 * @returns {Element}
 * @constructor
 */

//destructure movie props using :
const MovieCard = ({ movie:
    { title, vote_average, poster_path, release_date, original_language }
                   }) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noPoster} alt={title} />
            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        ⭐<p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;