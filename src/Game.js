import React, { useEffect, useState } from "react";
import { Button, Stack, Fab } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Timer from './Timer';

const useStyles = makeStyles({
    fadeIn: {
        transition: 'opacity 1s ease',
    },
    fadeOut: {
        opacity: 0,
        transition: 'opacity 1.5s ease;',
    },
    main: {
        pointerEvents: "none",
    },
  });


const Game = (props) => {
    console.log(props.questions)
    
    const classes = useStyles();

    const [qNum, setQNum] = useState(0);
    const [ansColor, setAnsColor] = useState('primary');
    const [answers, setAnswers] = useState([]);
    const [correct, setCorrect] = useState([false]);
    const [fadeProp, setFadeProp] = useState('fadeOut');
    const [hint, setHint] = useState(2);
    const [disabled, setDisabled] = useState();
    const [pointerEvent, setPointerEvent] = useState(false);

    const [comment, setComment] = useState();
    const good_comments = ['WOW!', 'Keep it Going', 'So Smart!', 'Watch out Einstein!', 'Great!', 'You are the Best!'];
    const bad_comments = ["You'll get it next time", 'So close!', "Do not give up!", 'You are smarter than this!', 'Better luck next time!'];

    // after each question, update the answers
    useEffect(() => {
        let ans = props.questions[qNum].incorrect_answers.slice();
        ans.push(props.questions[qNum].correct_answer);
        ans.sort(() => Math.random() - 0.5);
        setAnswers(ans);
        setDisabled(ans.slice());
    }, [qNum])

    // handle selecting answer
    const handleClick = (event, option) => {
        setPointerEvent(true);
        if(option === props.questions[qNum].correct_answer){
            // correct, update score
            let count = 1; // streak doubles the score
            for(let i = correct.length-1; i >= 0; i--){
                if(!correct[i]){
                    break;
                }
                count++;
            }
            setFadeProp('fadeIn');
            setComment(good_comments[Math.floor(Math.random()*good_comments.length)]);
            setTimeout(()=>{
                setFadeProp('fadeOut');
            },1000)
            let difficulty;
            switch(props.questions[qNum].difficulty){
                case('easy'):
                    difficulty = 1;
                    break;
                case('medium'):
                    difficulty = 2;
                    break;
                default: // hard
                    difficulty = 3;
            }
            props.setScore(props.score + difficulty*count);
            correct.push(true);
        } else {
            correct.push(false);
            event.target.style.backgroundColor = "red";
            setFadeProp('fadeIn');
            setComment(bad_comments[Math.floor(Math.random()*bad_comments.length)]);
            setTimeout(()=>{
                setFadeProp('fadeOut');
            },1000)
        }
        setAnsColor('limegreen');

        setTimeout(function (){
            setAnsColor('primary');
            setQNum(qNum + 1);
            setPointerEvent(false);
        }, 1200);
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
                        disabled={disabled.indexOf(option) === -1}
                        variant="contained"
                        style={{fontFamily:'monospace', backgroundColor: bgColor, margin:15}}
                        key={option+qNum}
                        onClick={(event)=>handleClick(event, option)}
                    >
                        {decodeURIComponent(option)}
                    </Button>
                );
            });
        return options;
    }

    // if player can use a hint -> disable 2 wrong answers
    const handleHint = () => {
        if (hint === 0 || disabled.length <= 2){
            return;
        }
        setHint(hint - 1);
        disabled.splice(disabled.indexOf(props.questions[qNum].incorrect_answers[0]), 1);
        disabled.splice(disabled.indexOf(props.questions[qNum].incorrect_answers[1]), 1);
    }


    return (
        
        <div className={pointerEvent ? classes.main : false} >
            <Stack direction='row'  
                   justifyContent="center"
                   alignItems="center" 
                   spacing={15}>
                <h2>
                    Score: {props.score}
                </h2>
                <Timer setPage={(val) => props.setPage(val)} />
                <div>
                    <h2>Hint</h2>
                    <Fab
                        onClick={()=>handleHint()}
                        style={{color:'white', fontFamily:'monospace', background: 'linear-gradient(to right bottom, #430089, #82ffa1'}}
                        className={classes.hint}
                    >
                        50:50
                    </Fab> X {hint}
                </div>
            </Stack>
                <h2>Question {qNum + 1}</h2>
                <h3> Difficulty: {props.questions[qNum].difficulty[0].toUpperCase() + props.questions[qNum].difficulty.slice(1)}</h3>
                <br></br>
                <h2 style={{width:'70%'}}>{decodeURIComponent(props.questions[qNum].question)}</h2>
                {getAnswers()}
                <h2 className={classes[fadeProp]}>{comment}</h2>


        </div>
    );

}

export default Game;