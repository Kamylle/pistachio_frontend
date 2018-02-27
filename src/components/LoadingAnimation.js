import React, { Component } from "react";

class LoadingAnimation extends Component {
    render () {
      return (
        <div class="sk-chasing-dots">
          <div class="sk-child sk-dot1"></div>
          <div class="sk-child sk-dot2"></div>
        </div>
      )
    }
}

export default LoadingAnimation;