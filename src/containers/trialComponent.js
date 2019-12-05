import { connect } from "react-redux";
import React from 'react';




const trialComponent = (props) => {
    return(
        <div>
            {console.log("hiiii:" + JSON.stringify(props.myState))}

            {props.myState.map(person => {
                return (<div>
                    {JSON.stringify(person.text)}
                </div>);
            })}
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        myState: state.todos,
    }
};

const ConnectedTrialComponent = connect(mapStateToProps)(trialComponent);
export default ConnectedTrialComponent;

