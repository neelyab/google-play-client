import React, {Component} from 'react';

class PlayApp extends Component {
    render(){
        return(
            <div>
                <li>
                <h2>{this.props.App}</h2>
                    <p>Rating: {this.props.Rating}</p>
                    <p>Genre:{this.props.Genre}</p>
                    <p>Price: {this.props.Price}
                    </p>
                </li>
            </div>
        )
    }
}
export default PlayApp;