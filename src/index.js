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

ReactDOM.render(
  <Display />,
  document.getElementById('root')
);
