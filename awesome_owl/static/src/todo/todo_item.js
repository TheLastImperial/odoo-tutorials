import { Component } from '@odoo/owl';

export class TodoItem extends Component {
    static template ='awesome_owl.todo_item';
    static props = {
        id: {
            type: Number,
            optional: true
        },
        description: {
            type: String
        },
        isCompleted: {
            type: Boolean
        },
        toggleState: {
            type: Function
        },
        deleteTodo: {
            type: Function
        }
    }
    setup(){
    }

    toggleItem(e) {
        this.props.toggleState(e.target.id, e.target.checked);
    }

    deleting(e){
        this.props.deleteTodo(e.target.id);
    }
}
