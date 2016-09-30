import React from 'react';
import {InfoContainer} from './info';
import Hand from './hand';
import { connect } from 'react-redux';
import { GameOverMessageContainer } from './game_over_message';

/*
React Router gives us a <Link> component that will generate an <a> tag 
that will send the user to the correct page when clicked
*/

import { Link } from 'react-router';


export class App extends React.Component{
    render(){
        let messageComponent;
        if(this.props.gameOver){
            messageComponent= <GameOverMessageContainer win={this.props.playerWon} />;
        }
        
        let gameComponents;
        
        if(this.props.fetchingRecord) {
            gameComponents = <h1>Loading record...</h1>;
        }
        else {
            gameComponents = (
                <div className="game">
                    <InfoContainer />
                    { messageComponent }
                    <h2>Player hand</h2>
                    <Hand cards={this.props.playerHand } />
                    <h2>Dealer hand</h2>
                    <Hand cards={this.props.dealerHand } />
                </div>
            );
            
        }
        return (
           <div className="app ">
                <div className="links">
                    <Link to="/settings">Settings</Link>
                </div>
                <h1 className="title">React Blackjack</h1>
                {gameComponents}
                {this.props.patchingRecord ?
                    "Saving..."
                    : "" }
            </div>
            );
    }
}

function mapStateToProps(state) {
    return {
            playerHand: state.game.get('playerHand'),
            dealerHand: state.game.get('dealerHand'),
            gameOver: state.game.get('gameOver'),
            playerWon: state.game.get('playerWon'),
            fetchingRecord: state.api.get('fetchingRecord'),
            patchingRecord: state.api.get('patchingRecord')
    };
}

export const AppContainer = connect(mapStateToProps)(App);