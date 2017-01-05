import React from 'react';

let Card = (props) => {

	let card = {
		'width': '100%',
		'height': '100%',
		'position': 'relative',
		'transformStyle': 'preserve-3d',
		'transition': 'transform 1s',
		'color': 'white'
	};
	let card_figure = {
		'margin': '0',
		'display': 'block',
		'position': 'absolute',
		'width': '100%',
		'height': '100%',
		'backfaceVisibility': 'hidden'
	};
	let front= {
		'background': 'red'
	};
	let back = {
		'background': 'blue',
		'transform': 'rotateY( 180deg )'
	};
	let card_none = {
		'transform': 'rotateY( 180deg )',
		'opacity': '0'
	};
	let card_flipped= {
		'transform': 'rotateY( 180deg )'
	};

	let state;
	if(props.card.disable) state = card_none;
	else if(props.card.show) state = card_flipped;
	else state = {};

	return (
		<div style={flattenObject({card, state}) }>
			<figure style={ flattenObject({card_figure,front}) }>XX</figure>
			<figure style={flattenObject({card_figure,back})}>
				<p>{props.card.kind}</p>
				<p>{props.card.type}</p>
				<p>{props.card.count}</p>
			</figure>
		</div>
	);
};

export default Card;

function flattenObject(ob) {
	var toReturn = {};
	
	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;
		
		if ((typeof ob[i]) == 'object') {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				
				toReturn[x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
};