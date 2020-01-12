import React from "react";

// Komponente einbinden
import AComponent from '../components/AComponent';

export default class MoreInteractions extends React.Component {

  render() {

    const specificStyle = {
      textAlign: 'center',
      margin: '100px auto !important'
    }

    return (
      <div>
        <h2 style={specificStyle}> Space for something more. </h2>
        <AComponent text="this a props text" />   
      </div>
    );
  }
}
