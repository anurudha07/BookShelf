import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center py-5 mt-5'>
        <a href='https://portfolio-kxhf.onrender.com/' target='_blank'>
          <i className='fas fa-code'></i> with <i className='fas fa-heart'></i>{" "}
          Anurudha Sarkar
        </a>
      </div>
    );
  }
}
