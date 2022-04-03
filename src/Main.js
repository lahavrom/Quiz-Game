import React, { useState, useEffect } from "react";
import ParticlesBg from "particles-bg";
import { Dot } from 'react-animated-dots';


const Main = () => {

  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  
  useEffect(() => {
    const axios = require('axios');
    const getQuestions = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api.php?amount=100")      
        if(response.data.results){
          let questions = response.data.results
          setQuestions(questions);
          setLoading(false);
          return;
        }
      } catch(error) {
          console.log(error);
          alert("can't fetch questions, come back later...");
          return false;
      }
    };
    getQuestions();
  },[]);


  // const switchPage = (page) => {
  //   switch(page){
  //     case('home'):
  //       return <HomePage setPage={() => setPage()} />;
  //     case('play'):
  //       return <Play questions={questions} setPage={() => setPage()} />;
  //     case('result'):
  //       return <Result setPage={() => setPage()} />;
  //     default:
  //       return <HomePage setPage={() => setPage()} />;
  //   }
  // }


  

    return (
      loading ?
        <> 
          <ParticlesBg type='ball' num={2} bg={true} />
          <div align='center' style={{marginTop: '30%'}}>
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
        
      <div>
          {/* {console.log(questions[0])}
          {questions[0].question}
          <br></br>
          <div>
            {questions[0].incorrect_answers}
          </div> */}
          <ParticlesBg type="fountain" bg={true} num={1} />
        </div>
    )
}

export default Main;
