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
              var journeyStartDateAndTime
              var journeyEndDateAndTime
              var journeyStart
              var journeyEnd 
              var journeyTime
              var totalJourneyTime 
              var transitTime
              var detailsLength = data?.legs[0]?.segmentDetails?.length


              //extractTime for h m
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
              
              // calculateTimeDifference for journeyTime
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
                // as per website
                return `${hours}h ${minutes}m`;
              };
              journeyTime= calculateTimeDifference(journeyStartDateAndTime, journeyEndDateAndTime);


              //calculation transittime
                const storeAllDatesAndTimes = [] 
                if(data?.legs[0]?.segmentDetails){
                    data?.legs[0]?.segmentDetails.forEach(element => {
                      storeAllDatesAndTimes.push(element?.origin?.dateTime)
                      storeAllDatesAndTimes.push(element?.destination?.dateTime)
                    });
                }
                storeAllDatesAndTimes.shift(); // Remove first element
                storeAllDatesAndTimes.pop();   // Remove last element
                // Iterate through the array in pairs of two and perform subtraction
                for (let i = 0; i < storeAllDatesAndTimes.length - 1; i += 2) {
                    const difference =calculateTimeDifference(storeAllDatesAndTimes[i], storeAllDatesAndTimes[i + 1]);
                    transitTime=difference
                }

              //update journey time
                const addTimes=(time1, time2)=> {
                    const [hours1, minutes1] = time1.split('h ').map(part => parseInt(part));
                    const [hours2, minutes2] = time2.split('h ').map(part => parseInt(part));
            
                    // Add the hours and minutes
                    let totalHours = hours1 + hours2;
                    let totalMinutes = minutes1 + minutes2;
            
                    // Ensure minutes don't exceed 60
                    if (totalMinutes >= 60) {
                        totalHours += Math.floor(totalMinutes / 60);
                        totalMinutes %= 60;
                    }
            
                    // Format the result
                    const result = `${totalHours}h ${totalMinutes}m`;
            
                    return result;
                }
                if(transitTime){
                  totalJourneyTime = addTimes(journeyTime,transitTime)
                }else{
                  totalJourneyTime = journeyTime
                }

              return(
                <ContentBody
                  key={data?.id}
                  id={data?.id}
                  data={data}
                  journeyStart={journeyStart}
                  journeyEnd={journeyEnd}
                  journeyTime={totalJourneyTime}
                  transitTime={transitTime}
                  detailsLength={detailsLength}
                  visibleElements={visibleElements} 
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
