import React from 'react';
import Header from '../Component/Header_footer/header'
import Footer from '../Component/Header_footer/footer'

const layout = (props) => {
    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    );
};

export default layout;