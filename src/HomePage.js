import React from "react";
import { Button } from "@mui/material";


const HomePage = (props) => {

    return (
        <>
            <div align='center'>
                <h1>Welcome to the Quiz Game!</h1>
                <h3>You have 60 seconds to answer as many questions as you can.<br></br><br></br>
                    Correct answers will give you points based on the question's difficulty.<br></br><br></br>
                    You'll get bonus points if you answer questions correctly in a row.<br></br><br></br>
                    You have 3 Lifelines, use them wisely!
                                        
                </h3>
            </div>
            <div align='center'>
                <Button 
                    variant='contained'
                    style={{width:500, fontSize:20, fontFamily:'monospace', background: 'linear-gradient(to right bottom, #430089, #82ffa1'}}
                    onClick={() => props.setPage()}>
                    Press to play
                </Button>
            </div>
        </>

    );

}

export default HomePage;