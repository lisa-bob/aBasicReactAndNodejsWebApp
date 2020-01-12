import React from "react";

export default class AComponent extends React.Component {

    // im Konstruktor können auf die Props zugegriffen werden
    // React components automagically render and update  
    // based on a change in this.state or props
    constructor(props) {
        super(props);
        this.text = props.text || "this is a component text";
    }
    
    render() {
        const stylePropsText = {
            textAlign: "center"
        }

        return (
            <div>
                <h4 style={stylePropsText}> { this.text } </h4>
            </div>
        )

    }
}