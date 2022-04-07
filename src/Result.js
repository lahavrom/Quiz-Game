import React, {} from 'react';
import einstein from './memes/einstein.jpg';
import einsteinLaugh from './memes/einstein_laugh.jpg';
import dicaprio from './memes/dicaprio.jpg';
import ohno from './memes/oh_no.jpg';
import borat from './memes/borat.jpg';
import evilLaugh from './memes/evil_laugh.jpg';
import { Button } from '@mui/material';


const Result = (props) => {

    const goodResult = [einstein, dicaprio, borat];
    const badResult = [einsteinLaugh, ohno, evilLaugh];

    const returnMeme = () => {
        if(props.score >= 10){
            return goodResult[Math.floor(Math.random()*goodResult.length)];
        }
        return badResult[Math.floor(Math.random()*badResult.length)];
    }

    return (
        <div align='center'>
            <h1>Final Score: {props.score}</h1>
            <img alt='loading...' src={returnMeme()}/>
            <div>
                <Button variant='contained'
                        style={{margin:10,width:500, fontSize:20, 
                                fontFamily:'monospace', 
                                background: 'linear-gradient(to right bottom, #430089, #82ffa1'}}
                        onClick={()=>window.location.reload()}
                >
                    Back to home page
                </Button>
            </div>

        </div>
    );
}

export default Result;
