import React, { useState } from 'react';
import './Search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles

const Search = () => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [results, setResults] = useState([]); // Add state to store search results

    const handleSearch = async () => {
        console.log('Search initiated with:', { query, filter });

        try {
            const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}&filter=${filter}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setResults(data); // Update results state with fetched data
            console.log('Search results:', data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="search-page-container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Book Name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Title</option>
                        <option value="author">Author</option>
                        <option value="year">Year</option>
                    </select>
                </div>
                <div className="col-lg-2">
                    <button
                        className="btn btn-outline-success rounded-pill"
                        id="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="search-results mt-4">
                <h5>Search Results:</h5>
                {results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3} // Number of cards to show at once
                        loop={true} // Enable looping of slides
                        navigation={true} // Enable navigation buttons
                        pagination={{clickable: true}}
                        breakpoints={{
                            640: {
                                slidesPerView: 1, // Mobile view
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2, // Tablet view
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3, // Desktop view
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {results.map((result, index) => (
                            <SwiperSlide key={index}>
                                <div className="book-card">
                                    <img
                                        src={result.img_url} // Assuming book_cover is available
                                        alt={result.book_title}
                                        className="book-cover"
                                    />
                                    <h6>{result.book_title}</h6>
                                    <p><strong>Author:</strong> {result.author}</p>
                                    <p>{result.description ? result.description : "No description available"}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default Search;
