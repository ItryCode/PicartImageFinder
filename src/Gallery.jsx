import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useGlobalContext } from "./context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const url = `https://api.unsplash.com/search/photos?client_id=${
    import.meta.env.VITE_API_KEY
  }&query=`;
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}${searchTerm}`);
      return result.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an Error</h4>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        return (
          <img
            src={item.urls.regular}
            key={item.id}
            alt={item.description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
