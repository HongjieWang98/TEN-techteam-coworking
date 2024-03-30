import React from 'react';

const pageWrapperStyles = {
    padding: '50px',
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
};

const innerPageWrapperStyles = {
    maxWidth: '1500px'
}

// Create your Wrapper component
const PageWrapper = ({ children }) => {
    return (
        <div style={pageWrapperStyles}>
            <div style={innerPageWrapperStyles}>
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
