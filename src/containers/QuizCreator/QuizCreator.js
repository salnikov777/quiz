import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFramework";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import Auxilliary from "../../hoc/Auxilliary/Auxilliary";
import {validate, validateForm} from "../../form/formFramework";

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMesagge: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormsControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormsControls()
  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  createQuizHandler = (event) => {

  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxilliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Auxilliary>

      )
    });
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: + event.target.value
    });
  }

  addQuestionHandler = (event) => {
    event.preventDefault();
  }

  render() {
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {
              this.renderControls()
            }

            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={!this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;