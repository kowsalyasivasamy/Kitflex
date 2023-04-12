import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import CardMedia from "@mui/material/CardMedia";

import { getShowDetails, selectShowInfo } from "./showDetailSlice";

import "./ShowDetail.css";

export const ShowDetail = () => {
  const dispatch = useDispatch();
  const { showId } = useParams();
  const showInfo = useSelector(selectShowInfo);

  useEffect(() => {
    dispatch(getShowDetails(showId));
  }, [showId]);

  return (
    <>
      <div className="detail-page">
        <div className="card-intro">
          <div className="card-img">
            <CardMedia
              component="img"
              height="390"
              image={showInfo.image?.medium}
              alt={showInfo.name}
            />
          </div>
          <div className="card-info">
            <h1>{showInfo.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: showInfo.summary }}></div>
          </div>
        </div>
      </div>
      <div className="episodes-list">
        <div>
          {showInfo.episodes?.map((episode) => (
            <div className="episode">
              <h4>
                Season: {episode.season} - Name: {episode.name}
              </h4>
              <p dangerouslySetInnerHTML={{ __html: episode.summary }}></p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
