import React from "react"
import './Questions.css'

const userId = '352099549'
const token = '2016780470:AAE1_cWmfM0-X-usGH2JPZV09kwsiLDQhR8'
const messageText = 'Добрый день!%20Вы%20выиграли%20кое-что))'

class Questions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    text: "Quidquid id est timeo ... et dona ferentes",
                    variants: ["Ellenos", "Danaos", "Pedogogos"],
                    rightIndex: 1,
                    clicked: 0
                },
                {
                    text: "Otium Catulle, tibi malestum ...",
                    variants: ["est", "erat", "fuit"],
                    rightIndex: 0,
                    clicked: 0
                },
            ],
            currentQuestionIndex: 0,
            score: 0
        };
    }

    render(){
        if(this.state.currentQuestionIndex < this.state.questions.length)
            return(
                <div className={'question-box'}>
                    <div className={'score'}>Score: {this.state.score}</div>
                    <div className={'question-block'}>
                        <div className={'question'}>
                            {this.state.questions[this.state.currentQuestionIndex].text}
                        </div>
                        <div className={'answers'}>
                            {
                                this.state.questions[this.state.currentQuestionIndex].variants.map((answer, index) =>
                                    <div
                                        className = {!this.state.questions[this.state.currentQuestionIndex].clicked ? 'answer' :
                                            this.state.questions[this.state.currentQuestionIndex].rightIndex === index ? 'answer right' :
                                                'answer wrong'
                                        }
                                        onClick={()=>{
                                            if((this.state.questions[this.state.currentQuestionIndex].rightIndex === index)
                                            && !this.state.questions[this.state.currentQuestionIndex].clicked)
                                                this.setState({score: this.state.score + 10});
                                            let newState = Object.assign({}, this.state);
                                            newState.questions[this.state.currentQuestionIndex].clicked = 1;
                                            this.setState({newState});
                                    }}>
                                        {answer}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <button className={'next'} onClick={()=>{
                        this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1});
                    }}>Next</button>
                </div>
            )
        else {
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${userId}&text=${messageText}`);
            return (
                <h1>Congrats! Your score is {this.state.score}</h1>
            )
        }
    }
}

export default Questions