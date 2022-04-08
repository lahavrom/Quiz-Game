import React, { useState, useEffect } from "react";
import ParticlesBg from "particles-bg";
import { Dot } from 'react-animated-dots';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomePage from "./HomePage";
import Game from "./Game";
import Result from "./Result";


const useStyles = makeStyles({
  paper: {
    height: window.innerHeight*0.8,
    width: window.innerWidth*0.55,
    flexDirection:'column', 
    display:'flex', 
    fontFamily:'monospace', 
  },
  main: {
    textAlign: '-webkit-center',
    marginTop: '4%',
  }
});

const Main = () => {
  
  const classes = useStyles();
  
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const axios = require('axios');
    const getQuestions = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api.php?amount=100&encode=url3986")      
        if(response.data.results){
          let results = response.data.results
          setQuestions(results);
          setLoading(false);
          return;
        }
      } catch(error) {
          console.log(error);
          alert("can't fetch questions, come back later...");
          getQuestions();
      }
    };
    getQuestions();
  },[]);


  const switchPage = (page) => {
    // eslint-disable-next-line default-case
    switch(page){
      case('home'):
        return <HomePage setPage={() => setPage('play')} />;
      case('play'):
        return <Game 
                  questions={questions} 
                  score={score} 
                  setScore={(val)=>setScore(val)} 
                  setPage={(val)=>setPage(val)} 
                />;
      case('result'):       
        return <Result score={score} />;
    }
  }

    return (
      loading ?
        <> 
          <ParticlesBg type='ball' num={2} bg={true} />
          <div align='center' style={{fontFamily:'monospace', marginTop: '20%'}}>
            <h1>
              Loading 
              <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </h1>
          </div>
        </>
      :

      <div align='center' className={classes.main}>
        <Paper elevation={24} className={classes.paper} style={{backgroundColor:'rgb(243 243 243)'}}>
            {switchPage(page)}
          </Paper>
          <ParticlesBg type="fountain" bg={true} num={1} /> 
      </div>
      
    );
}

export default Main;
