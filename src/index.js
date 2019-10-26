import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './index.css';


function AnimatedSection({ getStyles, children }) {
    const elementRef = React.useRef();
    const isInViewport = useIsInViewport(elementRef);

    return <section style={getStyles(isInViewport)}>
        <div className='rectangle' ref={elementRef}>
            <h2>{children}</h2>
        </div>
    </section>
}

AnimatedSection.propTypes = {
    getStyles: PropTypes.func.isRequired,
    children: PropTypes.element
};



function App() {
    const getFadeLeftStyles = isfadeLeftInViewPort => ({
        transition: 'all 1s ease-in',
        opacity: isfadeLeftInViewPort ? '1' : '0',
        transform: isfadeLeftInViewPort ? '' : 'translateX(100%)'
    });

    const getFadeRightStyles = isfadeRightInViewPort => ({
        transition: 'all 1s ease-in',
        opacity: isfadeRightInViewPort ? '1' : '0',
        transform: isfadeRightInViewPort ? '' : 'translateX(-100%)'
    });


    return (
        <div className="App">
            <header>
                <h1>Scroll animations - Technique #1</h1>
            </header>
            <AnimatedSection getStyles={getFadeLeftStyles}>Fade left</AnimatedSection>
            <AnimatedSection getStyles={getFadeRightStyles}>Fade right</AnimatedSection>
        </div>
    );
}


function useIsInViewport(ref) {
    const [isInViewPort, setIsInViewport] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const { bottom } = ref.current.getBoundingClientRect();
            return setIsInViewport(
                window.innerHeight - bottom > 20)

        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [ref, isInViewPort]);

    return isInViewPort;
}


ReactDOM.render(<App />, document.getElementById('root'));
