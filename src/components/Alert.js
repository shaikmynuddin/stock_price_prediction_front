import React from 'react';

function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    if (!props.alert) {
        return null; // If no alert is present, don't render anything
    }

    return (
        <div style={{ height:'10vh',position: 'fixed', top: '55px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999', width: '100%' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
        </div>
    );
}

export default Alert;
