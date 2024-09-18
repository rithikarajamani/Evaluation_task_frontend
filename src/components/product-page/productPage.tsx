import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, MenuItem, Select, FormControl, Rating, Stack, Chip, Toolbar } from "@mui/material";
import OrderSummaryModal from '../checkout/checkout';
import { useLocation } from 'react-router-dom';

export default function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const [openOrderSummary, setOpenOrderSummary] = useState(false);
    const [productDetails, setProductDetails] = useState<any>(null);

    const location = useLocation();

    useEffect(() => {
        const details = location.state?.productDetails;
        if (details) {
            setProductDetails(details);
            console.log('Product Details:', details);
        }
    }, [location]);

    const availableSizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK', '11 UK', '12 UK'];
    const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);

    const handleSizeClick = (size: string) => {
        setSelectedSizes(prevSelectedSizes => {
            if (prevSelectedSizes.includes(size)) {
                return prevSelectedSizes.filter(s => s !== size);
            } else {
                return [...prevSelectedSizes, size];
            }
        });
    };

    const handleChange = (event: any) => {
        setQuantity(event.target.value);
    };

    const handleBuyNow = () => {
        if (quantity === 0) {
            setQuantity(1);
        }
        setOpenOrderSummary(true);
    };

    const handleClose = () => {
        setOpenOrderSummary(false);
    };

    const price = productDetails?.price || 99.99;
    const orderTotal = price * quantity;

    return (
        <div style={{ scrollBehavior: 'auto' }}>
            <Toolbar style={{ backgroundColor: '#AFDDE5', display: 'flex', justifyContent: 'center' }}>
            </Toolbar>
            <Box sx={{ p: 7, display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={productDetails?.image || "https://i.pinimg.com/736x/12/af/e2/12afe2d7486fb43bcc9fe755bee164f2.jpg"}
                            alt="Product Image"
                            sx={{ width: '70%', height: '80%', marginTop: '40px', borderRadius: '8px' }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid lightgrey', borderRadius: '8px', zIndex: 1,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0px 4px 12px rgba(175, 221, 229, 0.5)',
                        }}>
                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <Typography style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: '600' }}>{productDetails?.productName || "Product Name"}</Typography>
                            </div>
                            <div style={{ marginLeft: '10px', marginTop: '-5px' }}>
                                <Typography variant="body1" style={{ fontFamily: 'Inter' }}>
                                    {productDetails?.description || "This is a detailed description of the product."}
                                </Typography>
                            </div>
                            <div style={{ marginLeft: '10px', marginTop: '-10px' }}>
                                <Typography variant="h5" style={{ fontFamily: 'Inter', margin: '10px' }}>₹{price}</Typography>
                            </div>
                            <div style={{ marginLeft: '10px', marginTop: '-15px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 1 }}>
                                    <Rating
                                        name="simple-controlled"
                                        value={parseFloat(productDetails?.rating) || 2}
                                        precision={0.1}
                                        readOnly
                                    />
                                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'Inter' }}>
                                        {productDetails?.ratingCount || 10} ratings
                                    </Typography>
                                </Box>
                            </div>
                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <Typography variant="body2" style={{ fontFamily: 'Inter', marginLeft: '10px', fontSize: '15px', fontWeight: '600' }}>Size</Typography>
                                <Stack spacing={0} direction="row" flexWrap="wrap" >
                                    {availableSizes?.map((size: any) => (
                                        <Chip
                                            key={size}
                                            label={size}
                                            clickable
                                            color={'primary'}
                                            onClick={() => handleSizeClick(size)}
                                            sx={{
                                                margin: 0.5,
                                                backgroundColor: selectedSizes.includes(size) ? 'grey' : '#AFDDE5',
                                                color: selectedSizes.includes(size) ? 'white' : 'black',
                                                '&:hover': {
                                                    backgroundColor: selectedSizes.includes(size) ? 'grey' : 'grey',
                                                },
                                                fontFamily: 'Inter'
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </div>
                            <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>
                                <Typography variant="body2" style={{ fontFamily: 'Inter', marginLeft: '10px', marginBottom: '10px', fontSize: '15px', fontWeight: '600' }}>Quantity</Typography>
                                <div style={{ width: '20px' }}>
                                    <FormControl sx={{ minWidth: 80 }}>
                                        <Select
                                            sx={{ height: 40, fontFamily: 'Inter', marginLeft: '10px' }}
                                            value={quantity}
                                            onChange={handleChange}
                                        >
                                            <MenuItem style={{ fontFamily: 'Inter' }} value={1}>1</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Inter' }} value={2}>2</MenuItem>
                                            <MenuItem style={{ fontFamily: 'Inter' }} value={3}>3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginRight: '10px' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        size="small"
                                        sx={{
                                            borderColor: 'white',
                                            color: 'black',
                                            backgroundColor: '#AFDDE5',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#8DBBCF',
                                                borderColor: '#8DBBCF'
                                            },
                                            fontSize: '14px', fontWeight: '600', fontFamily: 'Inter'
                                        }}
                                        variant='outlined'
                                        onClick={handleBuyNow}
                                    >
                                        Buy Now
                                    </Button>
                                    <Button
                                        size="small"
                                        sx={{
                                            borderColor: 'lightgrey',
                                            color: 'black',
                                            backgroundColor: '#AFDDE5',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#8DBBCF',
                                                borderColor: '#8DBBCF'
                                            },
                                            fontSize: '14px', fontWeight: '600', fontFamily: 'Inter'
                                        }}
                                        variant='outlined'
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                            </div>

                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <OrderSummaryModal
                open={openOrderSummary}
                onClose={handleClose}
                quantity={quantity}
                price={price}
                orderTotal={orderTotal}
            />
        </div>
    );
}