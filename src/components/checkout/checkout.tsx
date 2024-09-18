import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField, RadioGroup, FormControlLabel, Radio, Box, Toolbar, Stack, Card } from "@mui/material";
import PopupMessage from '../reusable/popupmessage';

interface OrderSummaryModalProps {
    open: boolean;
    onClose: () => void;
    quantity: number;
    price: number;
    orderTotal: number;
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ open, onClose, quantity, price, orderTotal }) => {
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [toastMessage, setToastMessage] = useState("");
    const [toastopen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState<"success" | "error" | "warning" | "info">("success");

    const handleToastClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setToastOpen(false);
    };


    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    };
    const handlePlaceOrder = () => {
        setToastOpen(true);
        setToastMessage("Your order has been successfully placed!");
        setToastSeverity('success');
        onClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md" // Increase the maximum width
                fullWidth
                PaperProps={{
                    sx: {
                        width: '80%',  // Adjust the width as needed
                        height: '80%', // Adjust the height as needed
                        maxHeight: '80%', // Prevent overflow
                        overflow: 'auto', // Allow scrolling if needed
                    },
                }}
            >
                <Toolbar style={{ backgroundColor: '#AFDDE5' }}>
                    {/* <DialogTitle>Checkout</DialogTitle> */}
                    <Typography variant="h6" gutterBottom style={{ fontSize: '20px', fontWeight: '600', fontFamily: 'Inter' }}>Checkout</Typography>

                </Toolbar>

                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="h6" gutterBottom style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}>Delivery address</Typography>
                        <span style={{ color: 'red', marginTop: '2px', marginLeft: '5px' }}>*</span>
                    </div>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        variant="outlined"
                        value={deliveryAddress}
                        onChange={handleAddressChange}
                        style={{ fontFamily: 'Inter' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="body2" style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter', marginTop: 2 }}>Payment Method</Typography>
                        <span style={{ color: 'red', marginTop: '2px', marginLeft: '5px' }}>*</span>

                    </div>
                    <RadioGroup
                        aria-label="payment-method"
                        name="paymentMethod"
                        defaultValue="cash" // You can set the default value here
                        style={{ marginTop: 8 }}
                    >
                        <Stack direction="row" spacing={2}>
                            <FormControlLabel
                                value="cash"
                                control={<Radio />}
                                label="Cash on Delivery"
                            />
                            <FormControlLabel
                                value="upi"
                                control={<Radio />}
                                label="UPI"
                            />
                        </Stack>
                    </RadioGroup>
                    <Box>

                    </Box>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                            <Card style={{
                                flex: 1, marginRight: '8px', height: '60px', border: '1px solid lightgrey', zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                boxShadow: '0px 4px 12px rgba(175, 221, 229, 0.5)',
                            }}>
                                <Typography variant="body2" style={{ fontFamily: 'Inter', textAlign: 'center', marginTop: '20px', fontWeight: '600' }}>
                                    Quantity: {quantity}
                                </Typography>
                            </Card>
                            <Card style={{
                                flex: 1, border: '1px solid lightgrey', zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                boxShadow: '0px 4px 12px rgba(175, 221, 229, 0.5)',
                            }}>
                                <Typography variant="body2" style={{ fontFamily: 'Inter', textAlign: 'center', marginTop: '20px', fontWeight: '600' }}>
                                    Price: ₹{price}
                                </Typography>
                            </Card>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'red' }}>
                            <Typography variant="body2" style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '16px' }}>
                                Order Total: ₹{orderTotal.toFixed(2)}
                            </Typography>
                        </div>


                    </div>

                </DialogContent>
                <DialogActions>
                    <div style={{ marginTop: '20px', gap: 8, display: 'flex' }}>
                        <Button onClick={onClose} color="primary"
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
                        >Close</Button>
                        <Button
                            variant="outlined"
                            color="primary"
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
                            onClick={handlePlaceOrder}
                        >
                            Place Your Order
                        </Button>
                    </div>

                </DialogActions>
            </Dialog>
            <PopupMessage
                open={toastopen}
                handleClose={handleToastClose}
                message={toastMessage}
                severity={toastSeverity}
            />
        </div>

    );
}

export default OrderSummaryModal;
