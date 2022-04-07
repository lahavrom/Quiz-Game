import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const Timer = (props) => {

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setTimeout(() => {
                // props.setPage('result');
            }, 300)
        }
        return (
            <div >
                <h3>
                    <div >Time Remaining</div>
                    <div style={{color:'red'}}>{remainingTime}</div>
                    <div >seconds</div>
                </h3>
            </div>
      );
    };


  return (
      <div >
        <CountdownCircleTimer
          isPlaying
          duration={60}
          colors={["#32cd32", "#00ff00", "#ffff00", "#fa8072", "#ff0000", "#b22222"]}
          colorsTime={[60, 45, 30, 15, 5, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
  );
}


export default Timer;
