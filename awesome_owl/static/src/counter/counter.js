import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "awesome_owl.counter.counter";
    static props = {
        onChange: {
            type: Function
        }
    }
    setup(){
        this.state = useState({val:0});
    }

    increment(){
        this.state.val++;
        this.props.onChange()
    }
}
