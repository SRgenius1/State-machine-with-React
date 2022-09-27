import React from "react";
import { Loading } from "./Loading";

const SECURYTI_CODE = 'paradigma';

export class ClassState extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    };

    // UNSAFE_componentWillMount() {
    //     console.log('componentWillMount');
    // };

    // componentDidMount() {
    //     console.log('componentDidMount');
    // };
    componentDidUpdate () {

        console.log('Actualización');

        if (!!this.state.loading) {
            setTimeout(() => {
                console.log('Make a validation');

                if (SECURYTI_CODE === this.state.value) {
                    this.state({error: false, loading: false});
                } else {
                    this.state({error: true, loading: false});
                };

                console.log('Terminando la validación');
            }, 3000);
        };
    };


    render() {
        return (
            <div>
                <h2>Eliminar ClassState</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                <input 
                value={this.state.value}
                onChange={(event) => (
                    this.setState({ value: event.target.value})
                )}
                placeholder="Código de seguridad"/>

                {(this.state.error && !this.state.loading) && (<p>error Código INCORRECTO</p>)}

                {this.state.loading && (<Loading/>)}
                
                <button
                 onClick={() => this.setState({loading: false})}>Comprobar</button>
            </div>
        );
    };
};