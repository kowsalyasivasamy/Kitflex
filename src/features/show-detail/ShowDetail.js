import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import CardMedia from "@mui/material/CardMedia";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getShowDetails, selectShowInfo } from "./showDetailSlice";

import "./ShowDetail.css";

export const ShowDetail = () => {
  const dispatch = useDispatch();
  const { showId } = useParams();
  const showInfo = useSelector(selectShowInfo);

  useEffect(() => {
    dispatch(getShowDetails(showId));
  }, [showId]);

  const SubInfo = (data) => {
    return (
      <p>
        <span className="sub-title">{data.label}: </span>
        <span>{data.value}</span>
      </p>
    );
  };

  return (
    showInfo && (
      <>
        <div className="detail-page" data-testid="details-section">
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
              <SubInfo label="Language" value={showInfo.language} />
              <SubInfo
                label="Genre"
                value={showInfo.genres?.join(" / ") || "Not Available"}
              />
              <SubInfo label="Premiered" value={showInfo.premiered} />
              <SubInfo label="Ended" value={showInfo.ended} />
              <SubInfo label="Total seasons" value={showInfo.seasons?.length} />
            </div>
          </div>
        </div>
        <div className="seasons-list" data-testid="seasons-section">
          {showInfo.seasons?.map((season) => (
            <Accordion key={season.number}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={`season-${season.number}`}
              >
                <div className="season-title">
                  <Typography className="sub-title">
                    Season: {season.number}
                  </Typography>
                  <Typography>
                    Episodes: {season.episodeOrder || "N/A"}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {season.summary ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: season.summary }}
                    ></span>
                  ) : (
                    "Not Available"
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </>
    )
  );
};
