import { TodoItem } from './todo_item';

import { Component, useState } from '@odoo/owl';

export class TodoList extends Component {
    static template = 'awesome_owl.todo_list';
    static props = {
        items: {
            type: Array
        },
        toggleState: {
            type: Function
        },
        deleteTodo: {
            type: Function
        }
    };

    static components = {
        TodoItem
    };
    setup() {
        this.items = this.props.items;
        this.toggleItem = this.toggleItem.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }
    toggleItem(id, state) {
        this.props.toggleState(id, state);
    }
    deleteTodo(id) {
        this.props.deleteTodo(id)
    }
}
