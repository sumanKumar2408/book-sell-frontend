import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../../config';
import './header.css';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="search-div">
      <form
        className="d-flex search-form form"
        role="search"
        onSubmit={handleSubmit}
      >
        <div
          className="input"
          style={{
            position: "relative",
            left: "30vw",
            height: "4vh",
            width: "30vw",
            marginBottom:"10px"
          }}
        >
          <input
            className=" search form-control me-2"
            id="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="hidebutton" type="submit">
            🔍
          </button>
          <button className="button" type="submit">
            🔍Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
