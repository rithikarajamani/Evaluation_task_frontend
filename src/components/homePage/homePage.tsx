import React from "react";
// import Video from '../../../public/shoe.mp4';
import './homePage.css';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div >
            <h1 className="title" style={{ fontFamily: 'Inter' }}>Footique</h1>
            <video autoPlay muted loop className="background-video">
                <source src="/newshoe.mp4" type="video/mp4" />
            </video>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px', fontFamily: 'Inter' }}>
                <h2>Casual & everyday</h2>
                <h1>Effortlessly blend comfort & style!</h1>
                <Link to='/listPage'>
                    <Button style={{ borderColor: 'white', color: 'black', fontFamily: 'Inter' }} variant="outlined">
                        View Collection
                    </Button>
                </Link>
            </div>



        </div>
    );
}