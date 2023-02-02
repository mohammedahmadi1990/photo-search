import React from "react";
import "./header.css";
import { FiSearch } from "react-icons/fi";

export const Header = ({ query, setQuery }) => {
  return (
    <div className="container">
      <div class="header">
        <a href="#default" class="logo">
          Amazing Space
        </a>
        <div class="header-right">
          <a class="active" href="#home">
            Home
          </a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
      </div>

      <div className="wrapper">
        <span className="search-title">MEMORIES INSPIRES</span>
        <div className="search-text">
          <input
            type="text"
            id="search-text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FiSearch className="search-icon" />
        </div>
      </div>
    </div>
  );
};
