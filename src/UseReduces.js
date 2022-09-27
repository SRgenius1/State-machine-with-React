import React from 'react';

const SECURYTI_CODE = 'paradigma';

export function UseReducer ({name}) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log('Comenzo la validación');

        if (state.loading) {
            setTimeout(() => {
                console.log('empezando la validación');

                if (state.value === SECURYTI_CODE) {
                    dispatch({
                        type: actionTypes.CONFIRM,
                    });
                } else {
                    dispatch({type: actionTypes.ERROR});
                };

                console.log('terminando la validación');
            }, 3000);
        };
        
        console.log('Terminando el efecto');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                <input 
                placeholder="Código de seguridad"
                value={state.value}
                onChange={event => {
                    dispatch({
                        type: actionTypes.WRITE,
                        payload: event.target.value,
                    });
                }}
                />
                {state.loading && <p>esta cargando joven</p>}
                {(state.error && !state.loading) && <p>ERROR!! CODIGO INCORRECTO!</p>}
    
                <button
                onClick={() => {
                    dispatch({
                        type: actionTypes.CHECK,
                    });
                }}>
                Comprobar
                </button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
             <p>Pedimos confirmar tu desición ¿tas seguro 🤔?</p>
             <button
             onClick={() => {
                dispatch({
                    type: actionTypes.DELETE,
                });
             }}>
                Sí, eliminar
            </button>

             <button
             onClick={() => {
                dispatch({
                    type: actionTypes.RESET,
                });
            }}>
                No señor, no me lo borre
            </button>
            </>
        );
    } else {
        return (
            <>
            <p>La tarea fue eliminada con exito! 👌</p>
            <button
             onClick={() => {
                dispatch({
                    type: actionTypes.RESET,
                });
            }}>
                Volver atrás
            </button>
            </>
        );
    }
};

const initialState = {
    value: 'paradigma',
    erorr: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    CONFIRM: 'CONFIRM',
    DELETE: 'DELETE',
    CHECK: 'CHECK',
    RESET: 'RESET',
    WRITE: 'WRITE',
    ERROR: 'ERROR',
};

// const reducer = (state, action) => {};

const reducerObject = (state, payload) => ({
    [actionTypes.WRITE]: {
        ...state, 
        value: payload,
    },
    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },
    [actionTypes.CONFIRM]: {
        ...state, 
        error:false,
        loading: false, 
        confirmed: true,
    },
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    }else {
        return state;
    };
};