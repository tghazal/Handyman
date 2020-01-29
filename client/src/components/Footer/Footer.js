import React from 'react';
import './Footer.css';


class Footer extends React.Component {


  render() {
    return (
      <div className="footer-copyright text-center ">
        <div style={{
          height: '1px',
          background: '#FF3B3F'
        }} />
        <div className="my-2"> © 2018 Copyright:<a href="/"> Handy Helper</a></div>
      </div>
    )
  };
};

export default Footer
