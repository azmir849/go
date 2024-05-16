import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Container, Grid } from "@mui/material";

import ContentBody from "../components/ContentBody";
import { URL } from "../api/url";
import { data } from "../api/data";
const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visibleElements, setVisibleElements] = useState({}); // State to track visibility of sub-elements
  const [results, setResults] = useState(data?.result)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // handleShowSubElements
    const handleShowSubElements = (id) => {
     setVisibleElements((prev) => ({
       ...prev,
       [id]: !prev[id], // Toggle visibility
     }));
   };

   //handleGetResults
   const handleGetResults = ()=>{
    fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('data', data)
    })
    .catch(error => {
      console.log('erroe', error)
    });
   }

   // call api
   useEffect(()=>{
      // handleGetResults()
   },[])

  //  console.log('results', results)

  return (
    <>
      {/* <Loader /> */}
      <Container
        sx={{
          paddingLeft: "calc((100vw - 1200px) / 2)",
          paddingRight: "calc((100vw - 1200px) / 2)",
        }}
      >
        <Grid container className="container" justifyContent="center">
          <Grid item lg={3} md={3}>
            {/* Left side bar */}
            left side bar
          </Grid>
          <Grid item lg={9} md={9} sx={{mt:1, mb:1}}>
            {results && results?.length>0 && results.map((data, key)=>{
              var journeyStartDateAndTime=''
              var journeyEndDateAndTime=''
              var journeyStart =''
              var journeyEnd =''
              var journeyTime=''
              var detailsLength = data?.legs[0]?.segmentDetails?.length


              // for start time and end time
              const extractTime = (dateTimeString) => {
                const date = new Date(dateTimeString);
              
                // Extract hours and minutes
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
              
                // Return the formatted time string
                return `${hours}:${minutes}`;
              };
              if(data?.legs[0]?.segmentDetails?.length ===1){
                journeyStartDateAndTime = data?.legs[0]?.segmentDetails[0].origin?.dateTime
                journeyEndDateAndTime = data?.legs[0]?.segmentDetails[0].destination?.dateTime
              }else{
                var lastElement = data?.legs[0]?.segmentDetails[data?.legs[0]?.segmentDetails?.length - 1];
                journeyStartDateAndTime = data?.legs[0]?.segmentDetails[0].origin?.dateTime
                journeyEndDateAndTime = lastElement?.destination?.dateTime
              }
              if(journeyStartDateAndTime){
                const splitDateAndTime = extractTime(journeyStartDateAndTime)
                journeyStart=splitDateAndTime
              }
              if(journeyEndDateAndTime){
                const splitDateAndTime = extractTime(journeyEndDateAndTime)
                journeyEnd=splitDateAndTime
              }
              // ***********
              // journey total time
              const calculateTimeDifference = (start, end) => {
                const startDate = new Date(start);
                const endDate = new Date(end);
            
                // Calculate the difference in milliseconds
                let differenceInMillis = endDate - startDate;
            
                // If the difference is negative, it means the end time is on the next day
                if (differenceInMillis < 0) {
                  // Add one day (24 hours) to the end date
                  endDate.setDate(endDate.getDate() + 1);
                  differenceInMillis = endDate - startDate;
                }
            
                // Convert the difference to minutes
                let differenceInMinutes = Math.floor(differenceInMillis / 60000);
            
                const hours = Math.floor(differenceInMinutes / 60);
                const minutes = differenceInMinutes % 60;
            
                return `${hours+2}h ${minutes}m`;
              };
            
              journeyTime= calculateTimeDifference(journeyStartDateAndTime, journeyEndDateAndTime);
             
              return(
                <ContentBody
                  key={data?.id}
                  id={data?.id}
                  data={data}
                  journeyStart={journeyStart}
                  journeyEnd={journeyEnd}
                  journeyTime={journeyTime}
                  detailsLength={detailsLength}
                  visibleElements={visibleElements}
                  setVisibleElements={setVisibleElements} 
                  anchorEl={anchorEl} 
                  setAnchorEl={setAnchorEl} 
                  handlePopoverOpen={handlePopoverOpen} 
                  handlePopoverClose={handlePopoverClose}
                  handleShowSubElements={handleShowSubElements}
                />
              )
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default HomePage;
