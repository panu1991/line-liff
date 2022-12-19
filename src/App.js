import React, { Component } from 'react';
import './App.css';

const liff = window.liff;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      userLineID: '',
      pictureUrl: '',
      email:''
    };
  }

  componentDidMount = async() => {
    await liff.init({ liffId: `1657674066-QAWyVgll`}).catch(err=>{throw err});
    if (liff.isLoggedIn()) {
      console.log("log in ...")
      let getProfile = await liff.getProfile();
      this.setState({
        name: getProfile.displayName,
        userLineID: getProfile.userId,
        pictureUrl: getProfile.pictureUrl,
        email :liff.getDecodedIDToken().email
      });
    }else{
      try
      {
        liff.login();
      }
      catch(err)
      {
        console.log(err)
      }
    }
  }

  handleClick = async () => {
    const profile = await liff.getProfile();
    const response = await fetch('https://ymatrix.net:2053/api/User/Register', {
      method: 'POST',
      body: JSON.stringify({
        id: profile.userId,
        name: profile.displayName,
        email: liff.getDecodedIDToken().email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      },
    });

    const Resp = await response.json();
    const obj = JSON.parse(Resp);
  
    if (obj.StatusCode == 200) {
      alert(obj.Message);
    } else {
      alert(obj.Message);
    }
  
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <img className="picProfile" alt='pic' src={this.state.pictureUrl} />
            <p>ชื่อ {this.state.name}</p>
            <p>Line ID {this.state.userLineID}</p>
            <p>Email {this.state.email}</p>
     
          <button className ="button-28" onClick={this.handleClick}> Register </button>

        </header>
      </div>
    );
  }
}

export default App;