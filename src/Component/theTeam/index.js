import React, { Component } from 'react'
import PlayerCard from '../ui/playerCard'
import Fade from 'react-reveal/Fade'

import Stripes from '../../Resources/images/stripes.png'
import { firebasePlayers, firebase } from '../../firebase'
import { firebaseLooper } from '../ui/misc'
import { Promise } from 'core-js'

class Theteam extends Component {

    state = {
        loading: true,
        players:[]
    }

    // get the players from firebase 
    componentDidMount(){
        // get the player, however the array only contain image: name.png
        firebasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot)
            // but we need the image URL 
            // solution, get the URL from storage by matching the image name 
            // and update state by including url 
            console.log(players)
            let promises = []

            for (let key in players){
                promises.push(
                    new Promise((resolve, reject)=>{
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then(url=>{
                            players[key].url = url
                            resolve()
                        })
                    })
                )
            }

            Promise.all(promises).then(()=>{
                this.setState({
                    loading:false,
                    players
                })
            })
        })
    }

    showplayerByCategory = (category) => (
        // check first if we have any player from firebase 
        // map list of player belong to that category 
        this.state.players ?
            this.state.players.map((player,i)=>{
                return player.position === category ?
                    <Fade left delay={20} key={i}>
                        <div className='item'>
                            <PlayerCard
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                gambar={player.url}
                            />
                        </div>
                    </Fade>
                : null
            })
        :null
    )

    render() {
        console.log(this.state.players)
        return (
            <div className='the_team_container'
                style={{
                    background:`url(${Stripes}) repeat`
                }}
            >
                {
                    !this.state.loading?
                    <div>
                        <div className='team_category_wrapper'>
                            <div className='title'>Keeper</div>
                            <div className='team_cards'>
                                {this.showplayerByCategory('Keeper')}
                            </div>
                        </div>

                        <div className='team_category_wrapper'>
                            <div className='title'>Defence</div>
                            <div className='team_cards'>
                                {this.showplayerByCategory('Defence')}
                            </div>
                        </div>

                        <div className='team_category_wrapper'>
                            <div className='title'>Midfield</div>
                            <div className='team_cards'>
                                {this.showplayerByCategory('Midfield')}
                            </div>
                        </div>

                        <div className='team_category_wrapper'>
                            <div className='title'>Strikers</div>
                            <div className='team_cards'>
                                {this.showplayerByCategory('Striker')}
                            </div>
                        </div>
                    </div>
                    :null
                }
            </div>
        )
    }
}

export default Theteam;
