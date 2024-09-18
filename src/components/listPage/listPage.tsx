import * as React from 'react';
import { Toolbar, Grid, Typography, Card, CardActions, CardContent, CardMedia, Button, Rating, Drawer, Box, Stack, Slider, Checkbox, FormGroup, FormControlLabel, FormControl, RadioGroup, Radio, Chip, CircularProgress, Tooltip, Divider } from '@mui/material';
import DynamicSearchField from '../reusable/searchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function BasicTable() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [priceRange, setPriceRange] = React.useState<number[]>([]); // State for price range
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const [productData, setProductData] = useState([
        {
            id: 1,
            productName: "nike",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 2,
            productName: "nike1",
            description: "hii111",
            price: "10001",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 3,
            productName: "nike2",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 4,
            productName: "nike3",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 5,
            productName: "nike4",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 6,
            productName: "nike5",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 7,
            productName: "nike6",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 8,
            productName: "nike7",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 9,
            productName: "nike8",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
        {
            id: 10,
            productName: "nike9",
            description: "hii",
            price: "1000",
            brand: "puma",
            size: "9UK",
            color: "white",
            type: "formals",
            rating: "2.5",
            ratingCount: "5",
            Status: "active",
            image: "",
            productId: ""
        },
    ]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const [minPrice, maxPrice] = priceRange.length ? priceRange : [null, null];
                console.log('price range 0', priceRange[0]);
                console.log('price range 1', priceRange[1]);


                const response = await axios.post(`http://localhost:8000/api/getProductDetails?limit=100&offset=${(page - 1) * 10}`, {
                    price: {
                        minPrice: minPrice || '',  // Pass empty if no minPrice
                        maxPrice: maxPrice || ''   // Pass empty if no maxPrice
                    },
                    color: selectedColors,
                    brand: selectedBrands,
                    Size: selectedSizes.length ? selectedSizes[0] : "", // Use the first selected size
                    type: selectedCategory,
                    image: "",
                    productId: "",
                    search: searchTerm || ""
                });
                if (page === 1) {
                    setProductData(response.data);  // Replace data on first page load
                } else {
                    setProductData(prevData => [...prevData, ...response.data]);  // Append data for subsequent pages
                }
                setHasMore(response.data.length === 10);  // Assume there's more if we got a full page
                console.log('product response--->', response.data);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [page, selectedColors, selectedBrands, selectedCategory, selectedSizes, searchTerm, priceRange])

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    const fetchProductById = async (productId: any) => {
        console.log('productId--->', productId);

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/detailsById?id=${productId}`);
            console.log('respnse--->', response.data);
            setSelectedProduct(response.data);
            console.log('selectedProduct--->', selectedProduct);

            // Navigate to the product page with the fetched data
            navigate('/product-page', { state: { productDetails: response.data } });

        } catch (err: any) {
            console.error('Error fetching product details:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };
    const categories = ['Sportswear', 'Casuals', 'Sneakers', 'Formals'];

    const handleCategoryChange = (event: any) => {
        console.log('selectedCategory1-->', selectedCategory);

        setSelectedCategory(event.target.value);
        console.log('selectedCategory1-->', selectedCategory);

    };
    // Handle slider value change
    console.log('priceRange-->', priceRange);

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };
    const colors = [
        { name: 'Black', colorCode: '#000000' },
        { name: 'White', colorCode: '#FFFFFF' },
        { name: 'Brown', colorCode: '#8B4513' },
        { name: 'Grey', colorCode: '#808080' },
        { name: 'Tan', colorCode: '#D2B48C' },
        { name: 'Blue', colorCode: '#0000FF' },
        { name: 'Pink', colorCode: '#FFC0CB' },
        { name: 'Navy Blue', colorCode: '#000080' },
        { name: 'Beige', colorCode: '#F5F5DC' },
        { name: 'Gold', colorCode: '#FFD700' },
        { name: 'Green', colorCode: '#008000' },
        { name: 'Peach', colorCode: '#FFDAB9' },
        { name: 'Red', colorCode: '#FF0000' },
        { name: 'Silver', colorCode: '#C0C0C0' },
        { name: 'Cream', colorCode: '#FFFDD0' },
        { name: 'Maroon', colorCode: '#800000' },
        { name: 'Olive', colorCode: '#808000' },
        { name: 'Yellow', colorCode: '#FFFF00' },
        { name: 'Off White', colorCode: '#FAF9F6' },
        { name: 'Purple', colorCode: '#800080' }
        // Add more colors as needed
    ];

    const [showAllColors, setShowAllColors] = React.useState(false); // Control visibility of additional colors

    // Handle color selection changes
    console.log('selectedColors-->', selectedColors);

    const handleColorChange = (colorName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedColors(prev => [...prev, colorName]);
        } else {
            setSelectedColors(prev => prev.filter(c => c !== colorName));
        }
    };

    // Toggle between showing 7 colors and all colors
    const handleToggleColors = () => {
        setShowAllColors((prev) => !prev);
    };
    const brands = [
        { name: 'Nike' },
        { name: 'Adidas' },
        { name: 'Puma' },
        { name: 'Reebok' },
        { name: 'Under Armour' },
        { name: 'New Balance' },
        { name: 'Asics' },
        { name: 'Converse' },
        { name: 'Vans' },
        { name: 'Skechers' }
    ];

    const [showAllBrands, setShowAllBrands] = React.useState(false); // Control visibility of additional brands

    // Handle brand selection changes
    const handleBrandChange = (brandName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedBrands(prev => [...prev, brandName]);
        } else {
            setSelectedBrands(prev => prev.filter(b => b !== brandName));
        }
    };

    // Toggle between showing 5 brands and all brands
    const handleToggleBrands = () => {
        setShowAllBrands((prev) => !prev);
    };

    const availableSizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK', '11 UK', '12 UK'];

    const handleSizeClick = (size: string) => {
        setSelectedSizes(prevSelectedSizes => {
            if (prevSelectedSizes.includes(size)) {
                return prevSelectedSizes.filter(s => s !== size);
            } else {
                return [...prevSelectedSizes, size];
            }
        });
    };
    const clearAllFilters = () => {
        setSelectedCategory('')
        setSelectedColors([]);
        setSelectedBrands([]);
        setSelectedSizes([]);
        setPriceRange([]);
        setSearchTerm("");
        setPage(1);
        setDrawerOpen(false);
    };

    const applyFilters = () => {
        setPage(1);
        setDrawerOpen(false);
    };
    const handleSearchChange = (e: any) => {
        console.log('Search event:', e);
        console.log('Search value:', e.target.value);
        setSearchTerm(e.target.value);
    };
    return (
        <>
            <Toolbar style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '45px', backgroundColor: '#AFDDE5' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Inter' }}>
                    <DynamicSearchField
                        type="search"
                        maxLength={55}
                        onChange={(value) => setSearchTerm(value)}
                        label="Search"
                        name={""}
                        disabled={false}
                        value={searchTerm}
                    />
                    <Button onClick={toggleDrawer(true)} style={{ borderColor: 'white', color: 'black', marginLeft: 65, marginRight: '20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter' }} variant="outlined">
                        Filter
                    </Button>
                </div>
            </Toolbar>

            <div style={{ height: '80vh', overflowY: 'auto', marginLeft: '105px', fontFamily: 'Inter' }}>
                {loading && page === 1 ? (
                    <Box sx={{
                        width: "100vh",
                        height: "70vh",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}><CircularProgress /></Box>
                ) : (
                    <InfiniteScroll
                        dataLength={productData.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <Grid container spacing={3}>
                            {productData.map((product, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            position: 'relative',
                                            zIndex: 1,
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            boxShadow: '0px 4px 12px rgba(175, 221, 229, 0.5)',
                                            '&:hover': {
                                                zIndex: 2,
                                                transform: 'scale(1.05)', // Zoom in effect
                                                boxShadow: '0px 6px 16px rgba(175, 221, 229, 0.8)',
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                '&:hover .hover-text': {
                                                    opacity: 1
                                                }
                                            }}
                                        >
                                            <CardMedia
                                                sx={{ height: 140, cursor: 'pointer' }}
                                                image={product.image}
                                                onClick={() => fetchProductById(product.productId)}
                                            />
                                            <Box
                                                className="hover-text"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    pointerEvents: 'none',
                                                    fontSize: '14px', fontWeight: '600',
                                                    fontFamily: 'Inter'
                                                }}
                                            >
                                                Please click to view full product
                                            </Box>
                                        </Box>

                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{ textAlign: 'center', display: 'flex', justifyContent: 'left', alignItems: 'left', fontSize: '20px', fontWeight: '600', fontFamily: 'Inter' }}
                                            >
                                                {product.productName}
                                            </Typography>
                                            <Tooltip title={product.description.length > 16 ? product.description : ''} arrow>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter' }}
                                                >
                                                    {product.description}
                                                </Typography>
                                            </Tooltip>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1, fontFamily: 'Inter' }}>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={parseFloat(product.rating)}
                                                    precision={0.1}
                                                    readOnly
                                                />
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'Inter' }}>
                                                    {product.ratingCount} ratings
                                                </Typography>
                                            </Box>
                                            <Typography variant="h6" color="text.secondary" sx={{ mt: 1, fontSize: '14px', fontWeight: '600', fontFamily: 'Inter' }}>
                                                ₹{product.price}
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                        </CardActions>
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                )}
            </div >
            < Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)} // Close the drawer on outside click
                sx={{ width: '350', fontFamily: 'Inter' }}

            >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#AFDDE5' }}>
                    <Typography variant="h6" gutterBottom style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Inter' }}>
                        Filters
                    </Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: 'white',
                                color: 'black',
                                backgroundColor: '#AFDDE5',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: '#8DBBCF',
                                    borderColor: '#8DBBCF'
                                },
                                fontWeight: '600', fontFamily: 'Inter'
                            }}
                            onClick={clearAllFilters}
                        >
                            Clear All
                        </Button>
                    </Box>
                </Toolbar>
                <Box sx={{ width: 350, padding: 2 }} role="presentation">
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}>
                        Categories
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category}
                                    value={category}
                                    control={<Radio />}
                                    label={category}
                                    style={{ fontFamily: 'Inter' }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Divider></Divider>
                <Box sx={{ width: 250, padding: 2 }} role="presentation">
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}>
                        Colors
                    </Typography>
                    <FormGroup>
                        {colors.slice(0, showAllColors ? colors.length : 7).map((color, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={selectedColors.includes(color.name)}
                                        onChange={handleColorChange(color.name)}
                                    // sx={{
                                    //     "&.Mui-checked .MuiSvgIcon-root": {
                                    //         color: "#AFDDE5 !important",
                                    //     },
                                    // }}
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 16,
                                                height: 16,
                                                borderRadius: '50%',
                                                backgroundColor: color.colorCode,
                                                marginRight: 1,
                                                border: '1px solid #ccc'

                                            }}
                                        />
                                        {color.name}
                                    </Box>
                                }
                            />
                        ))}
                    </FormGroup>
                    <Button onClick={handleToggleColors} size="small" style={{ fontSize: '13px', fontWeight: '600', color: 'black', fontFamily: 'Inter' }}>
                        {showAllColors ? 'Show Less' : `+ ${colors.length} more`}
                    </Button>
                </Box>
                <Divider></Divider>
                <Box
                    sx={{ width: 250, padding: 2 }}
                    role="presentation"
                >
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}>
                        Price Range
                    </Typography>

                    {/* Price Range Slider */}
                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                        <Typography style={{ fontWeight: '600', fontFamily: 'Inter' }}> ₹{priceRange[0] || 100}</Typography>
                        <Slider
                            value={priceRange.length ? priceRange : [100, 10000]}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={100}
                            max={10000}
                            sx={{
                                color: '#AFDDE5', // Color of the track and thumb
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#AFDDE5', // Color of the thumb
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '#AFDDE5', // Color of the track
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#d3d3d3', // Color of the rail (default color)
                                },

                            }}
                        />
                        <Typography style={{ fontWeight: '600', fontFamily: 'Inter' }}> ₹{priceRange[1] || 10000}</Typography>
                    </Stack>
                </Box>
                <Divider></Divider>
                <Box sx={{ width: 250, padding: 2 }} role="presentation">
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}>
                        Brand
                    </Typography>
                    <FormGroup>
                        {/* Show only the first 5 brands by default */}
                        {brands.slice(0, showAllBrands ? brands.length : 5).map((brand, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={selectedBrands.includes(brand.name)}
                                        onChange={handleBrandChange(brand.name)}
                                        sx={{
                                            fontFamily: 'Inter'
                                        }}
                                    />
                                }
                                label={brand.name}
                            />
                        ))}
                    </FormGroup>
                    <Button onClick={handleToggleBrands} size="small" style={{ fontSize: '13px', fontWeight: '600', color: 'black', fontFamily: 'Inter' }}>
                        {showAllBrands ? 'Show Less' : `+ ${brands?.length} more`}
                    </Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ width: 350, padding: 2 }}>
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}>
                        Select Size
                    </Typography>
                    <Stack spacing={0} direction="row" flexWrap="wrap" >
                        {availableSizes?.map((size: any) => (
                            <Chip
                                key={size}
                                label={size}
                                clickable
                                color={selectedSizes.includes(size) ? 'primary' : 'default'}
                                onClick={() => handleSizeClick(size)}
                                sx={{
                                    margin: 0.5,
                                    backgroundColor: selectedSizes.includes(size) ? 'grey' : '#AFDDE5', // Red when selected, default otherwise
                                    color: selectedSizes.includes(size) ? 'white' : 'black', // White text for red chips
                                    '&:hover': {
                                        backgroundColor: selectedSizes.includes(size) ? 'grey' : 'grey', // Grey when hovered, remains red if selected
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
                <Divider></Divider>
            </Drawer >
        </>
    );
}
