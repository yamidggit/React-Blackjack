import React from 'react';
import { Link } from 'react-router';
import {DealerSpeedFormContainer} from './dealer_speed_form';


export class Settings extends React.Component {
    render() {
        return (
            <div>
                <div className="links">
                    <Link to="/">Back to game</Link>
                </div>
                <h1 className="settings-title">Settings</h1>
                <DealerSpeedFormContainer/>
            </div>
        );
    }
}