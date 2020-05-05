import React, { Component } from 'react'
import data from '../api.json'

class Main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            datas: data,
            name: '',
            videos: '',
            questions: [],
            comment: '',
        }
    }

    handleChange = (e) =>{
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
        if(this.state.name){
            const person = this.state.datas.candidates.filter( item=> item.name === this.state.name )

            const videos = this.state.datas.applications.filter(item=> item.id === person[0].applicationId)

            this.setState({
                videos: videos,
                questions: this.state.datas.questions
            })
        }
        else{
            alert("choose some value")
        }
    }
    submitComments = (e) => {
        e.preventDefault()
        if(this.state.comment){
            this.setState({
                comment: e.target.value
            })
        }
    }

    
    render() {

        const videosPrint =  
        this.state.videos[0] ? 
        this.state.videos[0].videos.map((item,i)=>
        {  
            const questionObj = this.state.questions.find(question=>{
                return question.id === item.questionId
            }) 
            const question = questionObj.question

            return  (
            <div>
                <video width="380" height="240" controls key={item.videos}>
                    <source src={item.videos} type="video/mp4"/>
                </video>

                {
                    <p>Question: {question}</p>
                }    
                    

                <form>
                    <textarea 
                        // value={this.state.comment} 
                        // onChange={this.handleChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            )
        }): null
        
        return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <select value={this.state.name} onChange={this.handleChange}>
                        <option>select an option</option>
                        {this.state.datas.candidates.map((name,i)=>(
                            <option key={i} value={name.name}>{name.name}</option>
                        ))}
                    </select>
                    <button>Search</button>
                </form>
                <div className="video-player">
                    {videosPrint}
                </div>
            </div>
        )
    }
}

export default Main
