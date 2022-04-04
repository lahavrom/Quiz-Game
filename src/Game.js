import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    option: {
        margin:5,
    },
  });


const Game = (props) => {
    // console.log(props.questions)
    
    const classes = useStyles();

    const [qNum, setQNum] = useState(0);
    const [ansColor, setAnsColor] = useState('primary');
    const [answers, setAnswers] = useState([]);

    // after each question, update the answers
    useEffect(() => {
        let ans = props.questions[qNum].incorrect_answers;
        ans.push(props.questions[qNum].correct_answer);
        ans.sort(() => Math.random() - 0.5);
        setAnswers(ans);
    }, [qNum])

    // handle selecting answer
    const handleClick = (event, option) => {
        if(option === props.questions[qNum].correct_answer){
            // correct
            // update score
        } else {
            event.target.style.backgroundColor = "red";
        }
        setAnsColor('green');

        setTimeout(function (){
            setAnsColor('primary');
            setQNum(qNum + 1);
        }, 1500);
    }
    
    // returns answers as buttons
    const getAnswers = () => {
        let bgColor;
        let options = answers.map((option) => {
            if (option === props.questions[qNum].correct_answer){
                bgColor = ansColor;
            } else {
                bgColor='primary';
            }
                return (
                    <Button 
                        variant="contained"
                        style={{backgroundColor: bgColor, margin:15}}
                        key={option}
                        onClick={(event)=>handleClick(event, option)}
                    >
                        {decodeURIComponent(option)}
                    </Button>
                );
            });
        return options;
    }

    return (
        <>
            <div align='center'>
                this is game page
            </div>
            <div align='center'>
                <h1>{decodeURIComponent(props.questions[qNum].question)}</h1>
                                
            </div>
            <div align='center'>
                {getAnswers()}

            </div>
        </>
    );

}

export default Game;