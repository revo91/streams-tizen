import React from 'react';
import '../styles/index.scss';

function ErrorScreen() {
    return (
        <div className='errorcontainer'>
            <h1 className='sadface'>:(</h1>
            <p className='errortitle'>Something went wrong. Check your internet connection and refresh (key up).</p>
        </div>
    )
}

export default ErrorScreen;