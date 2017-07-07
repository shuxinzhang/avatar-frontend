import React from 'react';
import ReactDOM from 'react-dom';
import PicturePanel from "./pic-panel"
import {PageSelectBar,SortSelectBar} from "./SelectBar"
import './index.css';
import 'whatwg-fetch';

class Display extends React.Component {
  constructor() {
    super();
    this.state = {
      pageNumber:1,
      baseUrl:"https://api.adorable.io/avatars/face/",
      imagesToRender:[],
      sortParam:"NaN"
    };
    //this.setImages();
  }
  componentDidMount() {
    this.getImageLinks().then(result => {
      this.setState({imagesToRender:result});
      console.log(result);
    })
  }

  handlePageClick(i){
    console.log("clicked!");
    this.setState({
      pageNumber:i,
    },function afterPageNumberChange(){
      this.getImageLinks().then(result => {
      this.setState({imagesToRender:result});
      console.log(result);
    })});

  }

  handleSortClick(i){
    console.log("clicked!");
    this.setState({
      sortParam:i,
    },function afterPageNumberChange(){
      this.getImageLinks().then(result => {
      console.log(this.state.sortParam);
      this.setState({imagesToRender:result});
      console.log(result);
    })});
  }
  getImageLinks() {
    var imgs = [];
    return fetch('http://localhost:3000/avatars/page/'+this.state.pageNumber+'/sort/'+this.state.sortParam)
      .then(function(response) {
      return response.json()
    }).then(function(json) {
      var i;
      for(i = 0; i < json.length; i++) {
        imgs[i] = json[i].eye + "/" + json[i].nose +"/" + json[i].mouth + "/" + json[i].color;
      }
      return imgs;
    });
  }

  setImages() {
    console.log("setImages");
    var imgs = this.getImageLinks();
    this.setState({
      imagesToRender:imgs
    })

  }


  render() {
    const page = this.state.pageNumber;


    //console.log(JSON.parse(JSON.stringify(this.state.imagesToRender)));


/*

    .then(function(array) {
      array.forEach(function(element){
        let imgUrl = "";
        imgUrl = element.eye+"/"+element.nose+"/"+element.mouth+"/"+element.color;
        console.log("urlll");
        console.log(imgUrl);
        return imgUrl;      
      });
    }).then(function(imgUrl) {
        console.log("URLLLL");
        console.log(imgUrl);
        imgs.push(imgUrl);
    });
    console.log("======");
    console.log(JSON.parse(JSON.stringify(imgs)));
    console.log("======");
    */
    //console.log(JSON.parse(JSON.stringify(imgs)));
    return (
      <div>
        <PicturePanel
            images={this.state.imagesToRender} base={this.state.baseUrl}
        />
        <PageSelectBar
            onClick={(i)=>this.handlePageClick(i)}
        />
        <SortSelectBar 
            onClick={(i)=>this.handleSortClick(i)}
        />
        <p>current page: {this.state.pageNumber}</p>
        <p>current sort method: {this.state.sortParam}</p>

      </div>


    );
  }
}
/*
function Square(props) {
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
}
class Board extends React.Component {


  renderSquare(i) {
    return( 
      <Square 
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)} 
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber:0,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i]=this.state.xIsNext?'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
    })
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================
*/
ReactDOM.render(
  <Display />,
  document.getElementById('root')
);
