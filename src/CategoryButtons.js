import React, {Component} from "react"

class CategoryButtons extends Component {
  constructor() {
    super()
    this.state = {
      triviaInfo: [],
      questionNumber: 0,
      finished: false,
      finalScore: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple")
      .then(response => response.json())
      .then(data => {
        this.setState({
          triviaInfo: data.results
        })
    })
  }

  handleClick(event) {
    if(this.state.triviaInfo[this.state.questionNumber].correct_answer === event.target.innerHTML) {
      this.setState(prevState => {
        return {
          finalScore: prevState.finalScore + 1
        }
      })
    }

    const nextQuestionNum = this.state.questionNumber + 1

    if(nextQuestionNum < this.state.triviaInfo.length) {
      this.setState({questionNumber: nextQuestionNum})
    }
    else {
      this.setState({ finished: true })
    }
  }

  render() {
    const shuffledAnswers = []
    if(this.state.triviaInfo.length > 0) {
      shuffledAnswers.push(this.state.triviaInfo[this.state.questionNumber].correct_answer)
      shuffledAnswers.push(...this.state.triviaInfo[this.state.questionNumber].incorrect_answers)
      shuffledAnswers.sort(() => Math.random() - 0.5)
    }

    if(this.state.triviaInfo.length === 0) {
      return "loading..."
    }

    return (
      <div>
          {this.state.finished ?
              <div className="end-screen">
                  <p>You got {this.state.finalScore} out of 10 correct</p>
              </div> :

              <div className="questionAnswer">
                <h2>{this.state.triviaInfo[this.state.questionNumber].question.replace(/&#039;/g, "\'").replace(/&quot;/g, "\"")}</h2>
                  <div className="divider" />

                  <button className="answer-choices" onClick={this.handleClick} >{shuffledAnswers[0]}</button>
                    <div className="divider" />

                  <button className="answer-choices" onClick={this.handleClick} >{shuffledAnswers[1]}</button>
                    <div className="divider" />

                  <button className="answer-choices" onClick={this.handleClick} >{shuffledAnswers[2]}</button>
                    <div className="divider" />

                  <button className="answer-choices" onClick={this.handleClick} >{shuffledAnswers[3]}</button>
                    <div className="divider" />
              </div>
            }
        </div>
      // <div className="Middle">
      //   // <button className="single-button" onClick={this.handleClick}>Sports</button>
      //   // <img src={QuestionMark}/>
      //   // <button className="single-button" onClick={this.handleClick}>Computers</button>
      //   // <button className="single-button" onClick={this.handleClick}>Music</button>
      // </div>
    )
  }
}

export default CategoryButtons
