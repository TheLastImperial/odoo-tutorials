import { Component, useState, markup, useRef, onMounted } from "@odoo/owl";

import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from './todo/todo_list';

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card, TodoList };
    setup() {
        this.state = useState({ value: 0 });
        this.content = markup(`
            <div class="primary-text">
                COntent
            </div>
        `)
        this.onChange = this.onChange.bind(this)
        this.toggleState = this.toggleState.bind(this)
        this.items = useState([]);
        this.inputRef = useRef('desc-todo')
        onMounted(()=>{
            this.inputRef.el.focus()
        })
    }
    onChange(){
        this.state.value++;
    }
    increment() {
        this.state.value++;
    }
    toggleState(id, state) {
        const ele = this.items.find(el => el.id == id);
        ele.isCompleted = state;
    }
    deleteTodo(id) {
        const idx = this.items.findIndex(el => el.id == id)
        if(this.items.length > 0)
            this.items.splice(idx, 1)
    }
    addTodo(ev){
        if(ev.keyCode == 13 && ev.target.value.length > 0) {
            const it = {
                id: this.items.length + 1,
                description: ev.target.value,
                isCompleted: false
            };
            this.items.push(it)
            ev.target.value = "";
        }
    }
}
