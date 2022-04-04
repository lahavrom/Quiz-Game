import React, {  } from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

  });


const HomePage = (props) => {

    const classes = useStyles();

    return (
        <>
            <div align='center'>
                <h1>Welcome to the Quiz Game!</h1>
                you have 60 seconds to answer as many questions as you can
            </div>
            <div align='center'>
                <button onClick={() => props.setPage()}>Press to play</button>
            </div>
        </>

    );

}

export default HomePage;