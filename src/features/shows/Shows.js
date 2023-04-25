import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import {
  getShowList,
  searchShow,
  selectShows,
  resetShowList,
} from "./showsSlice";

import "./Shows.css";

export const Shows = () => {
  const dispatch = useDispatch();
  const showList = useSelector(selectShows);

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    searchKey.length === 0 && showList.length === 0 && dispatch(getShowList());
  }, [showList, searchKey]);

  // Search through API calls means add debounce
  const handleSearch = (searchKey) => {
    setSearchKey(searchKey);
    dispatch(searchShow(searchKey));
  };

  const clearSearch = () => {
    dispatch(resetShowList());
    setSearchKey("");
  };

  return (
    <div className="main" data-testid="shows">
      <div className="header">
        <h1>Shows</h1>
        <div className="search-input">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className="cursor-pointer"
                  onClick={() => handleSearch(searchKey)}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchKey && (
                <InputAdornment
                  position="end"
                  className="cursor-pointer"
                  onClick={clearSearch}
                  data-testid="clear-icon"
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ "data-testid": "search-input" }}
            value={searchKey}
            placeholder="Search Shows"
            onChange={(e) => handleSearch(e.target.value.trim())}
          />
        </div>
      </div>
      {showList.length === 0 ? (
        <div className="no-content">
          <h2 className="no-content-text" data-testid="no-content-testid">
            No Shows are found for the Applied Filter!
          </h2>
        </div>
      ) : (
        <div className="list">
          {showList.map((show) => (
            <Card key={show.id} className="child">
              <CardActionArea>
                <Link to={`show/${show.id}`}>
                  <CardMedia
                    component="img"
                    height="390"
                    image={show.image?.medium}
                    alt={show.name}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      noWrap={true}
                    >
                      {show.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {show.genres?.join(" / ") || "Not Available"}
                    </Typography>
                    <Typography variant="string" color="text.primary">
                      {show.language}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
