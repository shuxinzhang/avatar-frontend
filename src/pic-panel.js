import React from "react"
require('./pic-panel.css');

function SquareImg(props) {

    return (
      <div className="single">
        <img src={props.base + props.image} width='100%'/>
      </div>
    );
}

class PicturePanel extends React.Component{
	renderPic(image) {
	  return( 
      	<SquareImg image={image} base={this.props.base} />
      );
	}
	render(){
		var i;
		var html = [];
		for(i=0;i<10;i++){
			var image = this.props.images[0];
			/*
			console.log("=!!!!!!");
			console.info(this.props.images);
			console.log("-----------");
			console.info(JSON.parse(JSON.stringify(this.props.images)));
			console.log("=!!!!!!");
			console.log(this.props.base);
			*/
			html.push(this.renderPic(this.props.images[i]));
		}
		return <div className='image-container'>{html}</div>;
	}
	getRandomColor() {
  		var letters = '0123456789ABCDEF';
 	    var color = '';
    	for (var i = 0; i < 6; i++) {
    		color += letters[Math.floor(Math.random() * 16)];
  		}
  		return color;
	}
  
}



export default PicturePanel;