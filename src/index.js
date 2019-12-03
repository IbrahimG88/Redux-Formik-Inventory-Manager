import React from 'react';
import { withFormik } from 'formik';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

import { connect } from 'react-redux';
import { addTodo } from './actions/index';

import devToolsEnhancer from 'remote-redux-devtools';

const MyForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
            />
            {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
            <button type="submit">Submit</button>
        </form>
    );
};

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({ name: '' }),

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { props,setSubmitting }) => {

        /*  To add redux:*/
          props.dispatch(addTodo(values));
          setSubmitting(false);


        console.log(JSON.stringify(values));

        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);


    },

    displayName: 'BasicForm',
})(MyForm);

const FullComponent = connect()(MyEnhancedForm);
export default FullComponent;

class Game extends React.Component {


    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <FullComponent />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}



const store = createStore(rootReducer,  devToolsEnhancer());

ReactDOM.render(
    <Provider store={store}>
         <Game />
    </Provider>,
    document.getElementById('root')
);
