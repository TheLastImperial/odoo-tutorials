import { Component, onWillUpdateProps } from '@odoo/owl';

export class NumberCard extends Component {
    static template = "awesome_dashboard.number_card";
    static props = {
        id: {
            type: String,
            optional: true
        },
        title: {
            type: String,
            optional: true
        },
        value: {
            type: Number
        }
    }
    setup() {
        this.title = this.props.title;
        this.value = this.props.value;
        onWillUpdateProps(nextProps => {
            this.value = nextProps.value;
        });
    }
}
