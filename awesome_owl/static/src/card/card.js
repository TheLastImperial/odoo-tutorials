import { Component, useState } from '@odoo/owl';

export class Card extends Component {
    static template = 'awesome_owl.card';
    static props = {
        slots: {
            type: Object
        },
        title: {
            type: String,
            optional: true
        },
        content: {
            type: String,
            optional: true
        }
    }
    setup(){
        this.showBody = useState({val: true})
    }
    hideBody() {
        console.log("Hide body")
        this.showBody.val = !this.showBody.val;
    }
}