import React, { Component } from 'react';
import './App.css'

export class MemeGenerator extends Component {
  constructor(){
    super();
    this.state={
      topText:"",
      centerText:"",
      bottomText:"",
      memeImage:"https://pbs.twimg.com/media/ETElMp9UMAYWx-7.jpg",
      randomMemes:[],
      color:"white"
    }
  this.handleChange=this.handleChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
     .then(response=>response.json())
     .then(response=>{
       const {memes}=response.data
       this.setState({
         randomMemes:memes
       })
     })
  }
  handleChange=(event)=>{
    const {name,value}=event.target;
    this.setState({
       [name]:value
    })
  }
  handleSubmit=(event)=>{
        event.preventDefault();
        const shuffle=Math.floor(Math.random()*this.state.randomMemes.length)
        const randomMemeImg=this.state.randomMemes[shuffle].url
        this.setState({
          memeImage:randomMemeImg
        })
  }

  hexaColor=()=>{
    let str="0123456789abcdef";
    let color="";
    for (let i=0;i<6;i++){
      let index=Math.floor(Math.random()*str.length);
      color+=str[index]
    }
    let changeColor="#"+color;
    this.setState({
      color:changeColor
    })
  }
  render() {
    return (
        <div className="container">
        <button className="btn btn-primary " onClick={this.hexaColor}>🔁 Change Text Color</button>
        <form className="form" onSubmit={this.handleSubmit}>
        <a href={this.state.memeImage} download>
        <img className="thumbnail col-lg-6 col-md-6 col-sm-10 col-xs-10 " src={this.state.memeImage} alt="meme" /></a>
        <div className="text" style={{color:this.state.color}}>
        <h1 className="top">{this.state.topText}</h1>
        <h1 className="center">{this.state.centerText}</h1>
        <h1 className="bottom">{this.state.bottomText}</h1>
        </div>
        <div className="input col-md-4 col-sm-10 col-xs-10  ">
        <button className="btn btn-primary ">🔁 Change Image</button>
         <p>Top Text:<input type="text" name="topText" value={this.state.topText} onChange={this.handleChange}/></p>
         <p>center Text:<input type="text" name="centerText" value={this.state.centerText} onChange={this.handleChange}/></p>
         <p>Bottom Text:<input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange}/></p>
        </div>
      </form>
      </div>
  
    )
  }
}

export default MemeGenerator
