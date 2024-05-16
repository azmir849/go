import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';


const HoverPopover = ({data}) => {
  return (
    <div>
        <Box >
            <Box sx={{p:1}}>
                <Typography>Base Fare</Typography>
                <Box sx={{mt:1, mb:1}} display={'flex'} justifyContent={'space-between'}>
                    <Box>Adult( {`${data?.priceBreakDownWithMarkup?.fareDetails[0]?.passengerInfo?.passengerNumber}x${data?.priceBreakDownWithMarkup?.totalFare?.netTotalBaseFareAmount}`}) </Box>
                    <Box> {data?.totalFare?.currency} {data?.priceBreakDownWithMarkup?.totalFare?.netTotalBaseFareAmount}</Box>
                </Box>
                <Box sx={{mt:1, mb:1}} display={'flex'} justifyContent={'space-between'}>
                    <Box>Total basefare</Box>
                    <Box>{data?.totalFare?.currency} {data?.priceBreakDownWithMarkup?.totalFare?.netTotalBaseFareAmount}</Box>
                </Box>
            </Box>
            <Box sx={{p:1}}>
                <Typography>Discount</Typography>
                <Box sx={{mt:1, mb:1}} display={'flex'} justifyContent={'space-between'}>
                    <Box>Total Discount</Box>
                    <Box>{data?.totalFare?.currency} {data?.priceBreakDownWithMarkup?.totalFare?.netTotalDiscountAmount}</Box>
                </Box>
            </Box>
            <Box sx={{p:1}}>
                <Typography>Taxes & Charges</Typography>
                <Box sx={{mt:1, mb:1}} display={'flex'} justifyContent={'space-between'}>
                    <Box>Taxes & Fees</Box>
                    <Box>{data?.totalFare?.currency} {data?.priceBreakDownWithMarkup?.totalFare?.netTotalDiscountAmount}</Box>
                </Box>
            </Box>
            <Box sx={{p:1}}>
                <Box sx={{mt:1, mb:1}} display={'flex'} justifyContent={'space-between'}>
                    <Box>Total</Box>
                    <Box>{data?.totalFare?.currency} {data?.priceBreakDownWithMarkup?.totalFare?.netTotalFareAmount}</Box>
                </Box>
            </Box>
        </Box>
    </div>
  );
};

export default HoverPopover;
