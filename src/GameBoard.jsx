import React from 'react';
import Card from './Card.jsx';

export default class GameBoard extends React.Component{

	onClick( index ) {
		if(this.props.canNotClick === 'canNotClick') return;

		this.props.getCard(index);
	}
	render(){
		let style = { 
			// borderStyle:'solid',
			// borderWidth:'1px',
			// width:100,
			// height:100
		};
		let cards = this.props.cards.map(c => <Card card={c}/>);
		return (
			<div>
				<p>{this.props.state.hp}</p>

				<table style={style}>
				<tbody>
				<tr>
					<td onClick={()=>this.onClick(0) }>{cards[0]}</td>
					<td onClick={()=>this.onClick(1) }>{cards[1]}</td>
					<td onClick={()=>this.onClick(2) }>{cards[2]}</td>
					<td onClick={()=>this.onClick(3) }>{cards[3]}</td>
				</tr>
				<tr>
					<td onClick={()=>this.onClick(4) }>{cards[4]}</td>
					<td onClick={()=>this.onClick(5) }>{cards[5]}</td>
					<td onClick={()=>this.onClick(6) }>{cards[6]}</td>
					<td onClick={()=>this.onClick(7) }>{cards[7]}</td>
				</tr>
				<tr>
					<td onClick={()=>this.onClick(8) }>{cards[8]}</td>
					<td onClick={()=>this.onClick(9) }>{cards[9]}</td>
					<td onClick={()=>this.onClick(10) }>{cards[10]}</td>
					<td onClick={()=>this.onClick(11) }>{cards[11]}</td>
				</tr>
				<tr>
					<td onClick={()=>this.onClick(12) }>{cards[12]}</td>
					<td onClick={()=>this.onClick(13) }>{cards[13]}</td>
					<td onClick={()=>this.onClick(14) }>{cards[14]}</td>
					<td onClick={()=>this.onClick(15) }>{cards[15]}</td>
				</tr>
				</tbody>
				</table>
			</div>
		);
	}
}