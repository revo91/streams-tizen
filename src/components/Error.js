import React from 'react';
import '../styles/index.scss';

function ErrorScreen() {
    return (
        <div className='errorcontainer'>
            <h1 className='sadface'>:(</h1>
            <p className='errortitle'>Something went wrong. Check your internet connection and reload using <span className='key'>KEY UP</span></p>
        </div>
    )
}

export default ErrorScreen;