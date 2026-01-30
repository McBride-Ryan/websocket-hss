import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <div><footer className="text-white p-6 mt-8 shadow-inner bottom-0" style={{backgroundColor: '#1E1E1E'}}>
      <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()}</p>
          <p>My Real-Time Data App</p>
      </div>
  </footer></div>
    )
  }
}

export default Footer
