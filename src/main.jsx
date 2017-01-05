import React from 'react';
import ReactDOM from 'react-dom';
import GameBoard from './GameBoard.jsx';

let cards = [
	{
		type:'weapon',
		kind: 'a',
		count: 1
	},
	{
		type:'weapon',
		kind: 'a',
		count: 1
	},
	{
		type:'weapon',
		kind: 'b',
		count: 1
	},
	{
		type:'weapon',
		kind: 'b',
		count: 1
	},
	{
		type:'weapon',
		kind: 'c',
		count: 2
	},
	{
		type:'weapon',
		kind: 'c',
		count: 2
	},
	{
		type:'weapon',
		kind: 'd',
		count: 2
	},
	{
		type:'weapon',
		kind: 'd',
		count: 2
	},
	{
		type:'weapon',
		kind: 'e',
		count: 2
	},
	{
		type:'weapon',
		kind: 'e',
		count: 2
	},
	{
		type:'weapon',
		kind: 'f',
		count: 3
	},
	{
		type:'weapon',
		kind: 'f',
		count: 3
	},
	{
		type:'monster',
		kind:'m1',
		count:1
	},
	{
		type:'monster',
		kind:'m2',
		count:2
	},
	{
		type:'monster',
		kind:'m3',
		count:3
	},
	{
		type:'monster',
		kind:'m4',
		count:4
	}
];

let state = {
	currentMonster: undefined,
	weapon:undefined,
	pairWeapon:[],
	hp: 0
};
window.state = state;
let tableState = nothing;

function nothing (card) {
	switch(card.type) {
	case 'monster':
		state.currentMonster = card;
		return monster;
	case 'weapon':
		state.weapon = card;
		return weapon;
	}
}

function monster(card) {
	switch(card.type) {
	case 'monster':
		flip(state.currentMonster);
		state.currentMonster = card;
		return monster;
	case 'weapon':
		state.weapon = card;
		return monsterAndWeapon;
	}
}

function monsterAndWeapon(card){
	switch(card.type) {
	case 'monster':
		flip(state.currentMonster);
		flip(state.weapon);
		state.currentMonster = card;
		return monster;
	case 'weapon':
		if(card.kind === state.weapon.kind){
			state.pairWeapon.push([card, state.weapon]);
			fight();
			return nothing;
		}
		else{
			flip( state.weapon );
			flip( card );
			return monster;
		} 
	}
}

function weapon( card ){
	switch(card.type) {
	case 'monster':
		flip( state.weapon );
		state.currentMonster = card;
		return monster;
	case 'weapon':
		if(card.kind === state.weapon.kind){
			state.pairWeapon.push([card, state.weapon]);
			state.weapon = undefined;
			return pairWeapon;
		}
		else{
			flip( state.weapon );
			flip( card );
			return nothing;
		}
	}
}

function pairWeapon(card){
	switch(card.type) {
	case 'monster':
		state.currentMonster = card;
		fight();
		return nothing;
      
	case 'weapon':
		state.weapon = card;
		return weaponPairWeapon;
	}
}

function weaponPairWeapon(card){
	switch(card.type) {
	case 'monster':
		flip(state.weapon);
		state.currentMonster = card;
		fight();
		return nothing;
      
	case 'weapon':
		if(card.kind === state.weapon.kind){
			state.pairWeapon.push([card, state.weapon]);
			state.weapon = undefined;
			return pairWeapon;
		}
		else{
			flip( state.weapon );
			flip( card );
			return pairWeapon;
		}
	}
}

function fight(){
  //a[0], a[1] are same card
	let attck = 0;

	state.pairWeapon.forEach( a => {
		attck += a[0].count;
	});

	let hurt = state.currentMonster.count - attck;

	if(hurt > 0) {
		state.hp -= hurt;

		state.pairWeapon.forEach( cards =>{
			flip( cards[0] );
			flip( cards[1] );
		});
		clearPairWeapon();

		flip(state.currentMonster);
		state.currentMonster = undefined;
	}
	else {
		state.pairWeapon.forEach( cards =>{
			cards[0].disable = true;
			cards[1].disable = true;
		});
		clearPairWeapon();

		state.currentMonster.disable = true;
		state.currentMonster = undefined;
	}
	
}

function clearPairWeapon(){
	while(state.pairWeapon.length > 0) state.pairWeapon.pop();
}

function flip( card ) {
  /**
   * @todos flip animation
  */
	card.show = !card.show;
}

function getCard (index) {
	let card = cards[index];
	flip(card);

	render( 'canNotClick' );


	setTimeout( ()=>{
		tableState = tableState(card);
		render('canClick');
	}, 1500);
}

let container = document.getElementById('container');

function render(canNotClick){
	
	let param = {
		cards:cards,
		canNotClick:canNotClick,
		getCard:getCard,
		state: state
	};

	ReactDOM.render(<GameBoard {...param}/>, container);
}

function shuffleCard(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
	while (0 !== currentIndex) {

    // Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

    // And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function init(){
	cards = shuffleCard(cards);
	cards = cards.map(c => {
		c.show = false;
		c.disable = false;
		return c;
	});

	render('canClick');
}

init();