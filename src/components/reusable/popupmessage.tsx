//Popup message
import React from 'react';
import { Alert, Snackbar } from "@mui/material";
import './popupmessage.css';
import Slide from '@mui/material/Slide';

interface PopupMessageProps {
    open: boolean;
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';

}


const PopupMessage: React.FC<PopupMessageProps> = ({ open, handleClose, message, severity }) => {

    return (

        <>
            {/* {open && <Backdrop onClick={handleClose} />} Render backdrop only when popup is open */}
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                className='alertSnackbar'
                sx={{
                    top: '10px !important',
                    // border: '0.5px solid #B6C2CC',
                    borderRadius: 1,
                    fontWeight: 400,
                    '& div': {
                        backgroundColor: severity === 'error' ? '#f7bfbe' : severity === 'info' ? '#e6f7ff' : 'rgba(222, 247, 228, 1)',
                        padding: '6px 14px'
                    }
                }}
            >
                <Alert
                    severity={severity}
                    sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: '0.5px solid #B6C2CC',
                        color: 'rgba(0, 0, 0, 0.74)',
                        fontWeight: 500,
                        fontSize: 14,
                        fontFamily: 'Inter',
                        display: 'flex',
                        alignItems: 'center',
                        '& span::before': {
                            color: severity === 'error' ? '#EC0000' : severity === 'info' ? 'rgba(0, 91, 172, 1)' : '#28A745'
                        }
                    }}
                // iconMapping={{
                //     success: <span className='mgc_check_line' style={{ fontSize: 16 }}></span>,
                //     error: <span className='mgc_close_line' style={{ fontSize: 16 }}></span>,
                //     info: <span className='mgc_information_line' style={{ fontSize: 16 }}></span>,


                // }}
                >
                    {message}
                </Alert >
            </Snackbar >
        </>
    );
};

export default PopupMessage;


