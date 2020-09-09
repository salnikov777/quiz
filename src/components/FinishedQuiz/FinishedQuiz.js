import React from "react";
import classes from './FinishedQuiz.css'

const FinishedQuiz = (props) => {
  let successCount = 0;
  props.quiz.forEach((el, idx)=>{
   if(props.results[el.id] === 'success') successCount++
  });
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, idx) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ];

          return (
            <li
              key={idx}
            >
              <strong>{idx + 1}.</strong>&nbsp;{quizItem.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        })}
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  )
}


export default FinishedQuiz;