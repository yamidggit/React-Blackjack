import React from 'react';
import {reduxForm} from 'redux-form';
import {setSpeed} from '../action_creators';

/*
onSubmit function will be passed as argument in the handleSubmit()
It receives the values of the form inputs and the dispatch function for the store
handleSubmit() will prevent the default submit action for us.
*/


const onSubmit= (values, dispatch) =>{
    dispatch(setSpeed(parseInt(values.speed)));
};

export class DealerSpeedForm extends React.Component {
    render() {
        const speed= this.props.fields.speed;
        const handleSubmit= this.props.handleSubmit; //this.props.handleSubmit prop is provided by Redux Form 
        const val= speed.value || this.props.initialSpeed;
        return (
            <div className="dealer-speed-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {[
                        ["Fast", 250],
                        ["Normal", 750],
                        ["Slow", 1500]
                    ].map((el) => (
                        <label  className="checkbox" key={el[1]}>
                            {el[0]}
                            <input  type = "radio"
                                    name="speed"
                                    {...speed}
                                    checked={val==el[1]}
                                    value={el[1]} />
                        </label>
                    ))
                    }
                    
                    <input className="buttons" type="submit" />
                </form>
            </div>
        );
    }
}

const mapStateToProps =(state) =>{
    return { initialSpeed: state.settings.get('speed') };
};

/* 
give to reduxForm() a unique name for the form (dealerSpeed) that will be 
used as the key for the form's data in the store. We also need to give it 
an array of fields in the form(just a speed field in this case)
*/

export const DealerSpeedFormContainer= reduxForm({
    form: 'dealerSpeed',
    fields:[ 'speed']
}, mapStateToProps)(DealerSpeedForm);



