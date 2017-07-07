import React from "react"
require('./select-bar.css');

class PageSelectBar extends React.Component {
	renderButton(j) {
		return (<PageButton 
			onClick={()=>this.props.onClick(j)}
			value={j} 
		 />);
	}

	render() {
		var i;
		var html = [];
		for(i=1;i<=10;i++){
			html.push(this.renderButton(i));
		}
		//return this.renderButton(1);
		return (<div className='select-bar'>{html}</div>);
	}


}

class SortSelectBar extends React.Component {
	renderButton(j) {
		return (<SelectButton 
			onClick={()=>this.props.onClick(j)}
			value={j} 
		 />);
	}

	render() {
		var i;
		var html = [];
		html.push(this.renderButton("eyes"));
		html.push(this.renderButton("noses"));
		html.push(this.renderButton("mouths"));
		//return this.renderButton(1);
		return (<div className='select-bar'>
			<div className='select-label'>Sort By:</div>
			{html}
			</div>);
	}
}

function PageButton(props) {
	return (
		<div >
			<button className='page-button'
				onClick={(event) => {props.onClick()}} > {props.value}
			</button>
		</div>
	);
}

function SelectButton(props) {
	return (
		<div >
			<button className='select-button'
				onClick={(event) => {props.onClick()}} > {props.value}
			</button>
		</div>
	);
}

export {PageSelectBar, SortSelectBar};