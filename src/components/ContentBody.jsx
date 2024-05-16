import React from "react";
import { Box, Button, Grid } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HoverPopover from "./HoverPopover";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      right:'-20px',
      color:'#000',
      padding:'10px',
      width: 300,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      boxShadow:'1px 1px 5px #d8d8d8d',
      borderRadious:'5px'
    },
  }));


const airlines = [
  { id: "BS", name: "US Bangla" },
  { id: "UK", name: "Vistra" },
  { id: "BG", name: "Biman Bangladesh" },
  { id: "AI", name: "Air India" },
  { id: "FZ", name: "Flydubai" },
  { id: "UL", name: "SriLanka" },
  { id: "GF", name: "Gulf Air" },
  { id: "QA", name: "Qatar Airways" },
  { id: "TK", name: "STurkish Airlines" },
  { id: "SV", name: "Saudi Arabian" },
  { id: "CZ", name: "China Southern" },
];

const ContentBody = ({
  id,
  data,
  visibleElements,
  handleShowSubElements,
  journeyStart,
  journeyEnd,
  detailsLength,
  journeyTime,
  transitTime
}) => {
  //  foramated date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Define options for formatting the date
    const options = { weekday: "long", month: "long", day: "numeric" };

    // format the date
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  // Function to get the airline name by ID
  const getAirlineNameCode = (id) => {
    const airline = airlines.find((airline) => airline.id === id);
    return airline ? airline.name : "";
  };

  return (
    <div className="content_body">
      <Grid container justifyContent="center">
        {/* time and destination */}
        <Grid item lg={8} md={8} sx={{ p: 2 }}>
          {/* legs-> segments   */}
          {data?.legs && data?.legs[0] && data?.legs[0]?.segment && (
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>{formatDate(data?.legs[0]?.segment?.departureDate)}</Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box>{data?.legs[0]?.segment?.departureLocation}</Box>
                <Box sx={{ ml: 1, mr: 1 }}>
                  <img
                    src={
                      "https://www.demo.zoo.family/front_asset/img/plane-flight.png"
                    }
                    alt="icon"
                  />
                </Box>
                <Box>{data?.legs[0]?.segment?.arrivalLocation}</Box>
              </Box>
              <Box></Box>
            </Box>
          )}

          <Box sx={{ mt: 2 }} display={"flex"} justifyContent={"space-between"}>
            {data?.priceBreakDownWithMarkup && (
              <Box>
                <Box>
                  <img
                    src={`https://www.demo.zoo.family/front_asset/img/airlines-logo/${data?.priceBreakDownWithMarkup?.airlineCode}.gif`}
                    alt={data?.priceBreakDownWithMarkup?.airlineCode}
                  />
                </Box>
                <div className="bus">{`${data?.priceBreakDownWithMarkup?.airlineCode} (${data?.priceBreakDownWithMarkup?.airlineId})`}</div>
                <p className="company">
                  {getAirlineNameCode(
                    data?.priceBreakDownWithMarkup?.airlineCode
                  )}
                </p>
              </Box>
            )}

            <Box>
              <div className="time">{journeyStart}</div>
              <p>{data?.legs[0]?.segment?.departureLocation}</p>
            </Box>
            <Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {detailsLength ===1 && <div className="border_button_type">Non Stop</div>}
                {detailsLength ===2 && <div className="border_button_type">One Stop</div>}
                {detailsLength >2 && <div className="border_button_type">Multi Stop</div>}

                <div className="border_button_type">Economy</div>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <div className="border_button_type">{journeyTime}</div>
                <div className="border_button_type">{data?.nonRefundable ===false?'Refundable':'Non-Refundable'}</div>
              </Box>
            </Box>
            <Box>
              <div className="time">{journeyEnd}</div>
              <p>{data?.legs[0]?.segment?.arrivalLocation}</p>
            </Box>
          </Box>
        </Grid>
        {/* time and destination end */}

        {/* amount and book now */}
        <Grid item lg={4} md={4}>
            <Box
              display={"grid"}
              justifyContent={"center"}
              alignItems={"center"}
              className='amount_discount'
            >
              {data?.priceBreakDownWithMarkup?.commission_percentage !==
                "0.00" && (
                <Box sx={{ color: "red" }}>
                  {data?.priceBreakDownWithMarkup?.commission_percentage} %
                  Discount
                </Box>
              )}
              <Box sx={{ fontSize: "16px", m: 1 }}>
                {data?.totalPrice?.currency} {' '}
                {data?.priceBreakDownWithMarkup?.totalFare?.netTotalFareAmount}
              </Box>
              {data?.priceBreakDownWithMarkup?.totalFare
                ?.netTotalDiscountAmount !== 0 && (
                <Box sx={{ color: "red", textDecoration: "line-through" }}>
                   {data?.totalPrice?.currency} {' '}
                  {
                    data?.priceBreakDownWithMarkup?.totalFare
                      ?.netTotalGrossFareAmount
                  }
                </Box>
              )}
              <Box display={"flex"} sx={{ mt: 2, mb: 2 }} alignItems={"center"}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ec8134",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  Book Now
                </Button>
                <Box sx={{ ml: 1 }}>
                    <HtmlTooltip
                        title={
                        <React.Fragment>
                           <HoverPopover data={data} />
                        </React.Fragment>
                        }
                     >  
                    <HelpIcon />
                  </HtmlTooltip>
                </Box>
                
              </Box>
            </Box>
        </Grid>
        {/* flight details border */}
        <Grid item lg={12} md={12}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ padding: " 7px 30px 1px 30px", background: "#f5f5f5" }}
          >
            <Box display={"flex"}>
              <Box> Send Query : </Box>
              <Box sx={{ ml: 1 }}>
                <WhatsAppIcon style={{ fontSize: 20 }} />
              </Box>
              <Box sx={{ ml: 1 }}>
                <EmailIcon style={{ fontSize: 20 }} />
              </Box>
            </Box>
            <Box display={"flex"} sx={{ cursor: "pointer",ml:4 }}>
              <Box onClick={(e) => handleShowSubElements(id)}>
                Flight Details{" "}
              </Box>
              <KeyboardArrowDownIcon style={{ fontSize: 20 }} />
            </Box>
          </Box>
        </Grid>
      {/* amount and book now end */}

        {/* flight details*/}
        {visibleElements[id] && (
          <Box sx={{ p: 2 }} className="sub_elements" id={id}>
            <Grid container>
              <Grid item lg={4} md={4}>
                <Box
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  sx={{
                    backgroundColor: "#0a3d62",
                    padding: "15px",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                  alignItems={"center"}
                >
                  <Box>{data?.legs[0]?.segment?.departureLocation}</Box>
                  <Box sx={{ color: "#fff" }}>
                    <img
                      src={
                        "https://www.demo.zoo.family/front_asset/img/aro-icon.png"
                      }
                      alt="icon"
                      width={12}
                      height={12}
                    />
                  </Box>
                  <Box>{data?.legs[0]?.segment?.arrivalLocation}</Box>{" "}
                </Box>
              </Grid>
              <div id="line">
                <hr />
              </div>

              {data?.legs &&
                data?.legs[0] &&
                data?.legs[0]?.segmentDetails &&
                data?.legs[0]?.segmentDetails?.length > 0 &&
                data?.legs[0]?.segmentDetails.map((listData, key) => {
                  return (
                    <>
                      <Grid item lg={12} md={12}>
                        <Box
                          sx={{ mt: 2,}}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Box>
                            <img src={`https://www.demo.zoo.family/front_asset/img/airlines-logo/${data?.priceBreakDownWithMarkup?.airlineCode}.gif`} alt={data?.priceBreakDownWithMarkup?.airlineCode} />
                          </Box>
                          <Box className="seat_cabin">
                            <p>{listData?.fleet?.operating}</p>
                            <p>Aircraft {listData?.fleet?.operatingFlightNumber}</p>
                          </Box>
                          <Box className="seat_cabin">
                            <p>{listData?.origin?.dateTime}</p>
                            <p>{listData?.origin?.airport}</p>
                          </Box>
                          <Box>
                            <div className="border_button_type">Economy</div>
                          </Box>
                          <Box display={"flex"}>
                            <Box className="seat_cabin">
                              <p>{listData?.destination?.dateTime}</p>
                              <p>{listData?.destination?.airport}</p>
                            </Box>
                            <Box className="seat_cabin">
                            <p>{listData?.fleet?.operating}</p>
                              <p>{listData?.fleet?.operatingFlightNumber}</p>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item lg={12} md={12}>
                        <Box
                          sx={{ mt: 3, mb: 2 }}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                        {(data?.legs[0]?.segmentDetails?.length > 1 && (data?.legs[0]?.segmentDetails?.length-1)===key) ?
                           <Box>Transit time: {transitTime}</Box>
                           :<Box></Box>
                        }
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box className="seat_cabin">
                              <p>Available seat : {data?.pricingInformation[0]?.fare?.passengerInfoList[0]?.passengerInfo?.fareComponents[0]?.segments[0]?.segment?.seatsAvailable}</p>
                              <p>Cabin: {data?.pricingInformation[0]?.fare?.passengerInfoList[0]?.passengerInfo?.fareComponents[0]?.segments[0]?.segment?.cabinCode}
                                 (rbd: {data?.pricingInformation[0]?.fare?.passengerInfoList[0]?.passengerInfo?.fareComponents[0]?.segments[0]?.segment?.bookingCode})
                            </p>
                            </Box>
                            <Box className="seat_cabin">
                              <p>Baggage</p>
                              <p>{data?.baggageInfo[0]?.details[0]?.pieceCount}Pcs</p>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      <div id="line"><hr /></div>
                    </>
                  );
                })}

            </Grid>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default ContentBody;
