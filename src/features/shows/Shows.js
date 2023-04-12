import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import {
  getShowList,
  searchShow,
  selectShows
} from './showsSlice';

import './Shows.css';

export const Shows = () => {
  const dispatch = useDispatch();
  const showList = useSelector(selectShows);

  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    searchKey.length === 0 && showList.length === 0 && dispatch(getShowList());
  }, [showList, searchKey])

  const handleSearch = () => {
    dispatch(searchShow(searchKey));
  }

  const clearSearch = () => {
    dispatch(getShowList());
    setSearchKey('');
  }

  return (
    <div className='main'>
      <div className='header'>
        <h1>Shows</h1>
        <div 
          className='search-input'>
          <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className='cursor-pointer'
                onClick={handleSearch}
              >
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              searchKey && <InputAdornment
                position="end"
                className='cursor-pointer'
                onClick={clearSearch}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
          value={searchKey}
          placeholder="Search Shows"
          onChange={(e)=>setSearchKey(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
        />
      </div>
      </div>
      {showList.length === 0
        ? <div className='no-content'>
            <h2 className='no-content-text'>No Shows are found for the Applied Filter!</h2>
          </div>
        : <div className='list'>
          {showList.map(show =>  (
            <Card key={show.id} className="child">
              <CardActionArea>
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
                    {show.genres.join(' / ') || 'Not Available'}
                  </Typography>
                  <Typography variant="string" color="text.primary">
                    {show.language}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      }
    </div>
  )
}