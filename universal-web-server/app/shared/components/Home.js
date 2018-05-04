import React, { Component } from 'react';
import fetch from 'cross-fetch';
import regeneratorRuntime from 'regenerator-runtime';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            listOfGames: ['empty']
        }
    }
    componentWillMount(){
        const { staticContext, games } = this.props;
        if (games){
            this.setState({
                listOfGames: games,
            })
        } else if (staticContext){
            //this is server side rendered.
            if (!staticContext.appData){
                // we haven't tried to request anything here so we need to.
                staticContext.appData = this.getData();
            } else {
                /* Since the second render is only done when every promises is resolved,
                we know that the value here is not a promise but the real thing. */
                console.log('Second render', staticContext);
                const { games } = staticContext.appData;
                this.setState({
                    listOfGames: games,
                });
            }
        }
    }

    async getData() {
        const { staticContext } = this.props;
        try {
            const gamesRequest = await fetch('http://localhost:5000/getAllGames');
            const games = await gamesRequest.json();
            staticContext.appData = games;
            console.log(games);
        } catch (e){
            console.log('error', e)
        }
    }
    render(){
        console.log('actual render', this.state.listOfGames);
        return <div> You are on your home page {this.state.listOfGames} </div>;
    }
}
