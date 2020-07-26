import React, { Component } from 'react';
import './App.css';
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  }
});
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: process.env.REACT_APP_REGION,
  aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };

    // Subscribe to MQTT topic
    Amplify.PubSub.subscribe('silvia-topic').subscribe({
      next: data => {this.setState({msg: data.value.message}) ; console.log('Message received', data.value.message)},
      error: error => console.error(error),
      close: () => console.log('Done'),
    });
  }

  render() {
    //console.log(process.env)

    return (
      <div className="App">
        <h1>Rancilio Silvia Console</h1>
        <p>Check the console..</p>
        <p>{"msg " + this.state.msg}</p>
      </div>
    );
  }
}
export default App;
