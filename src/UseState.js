import React from 'react';

const SECURYTI_CODE = 'paradigma';

export function UseState ({name}) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
    });

    const onConfirm = () => {
        setState({
            ...state, 
            error:false,
            loading: false, 
            confirmed: true,
        });
    };

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
            deleted: false,
        });
    };

    const onWrite = (newValue) => {
        setState({
            ...state, 
            value: newValue,
            });
    };

    const onCheck = () => {
        setState({
            ...state, 
            loading: true, 
            error: false
        });
    };

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
    };

    React.useEffect(() => {
        console.log('Comenzo la validación');

        if (state.loading) {
            setTimeout(() => {
                console.log('empezando la validación');

                if (state.value === SECURYTI_CODE) {
                    onConfirm();
                } else {
                    onError();
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
                onChange={event => {onWrite(event.target.value);}}
                />
                {state.loading && <p>esta cargando joven</p>}
                {(state.error && !state.loading) && <p>ERROR!! CODIGO INCORRECTO!</p>}
    
                <button
                onClick={() => {
                    onCheck();
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
                onDelete();
             }}>
                Sí, eliminar
            </button>

             <button
             onClick={() => {
                onReset();
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
                onReset();
            }}>
                Volver atrás
            </button>
            </>
        );
    }
};