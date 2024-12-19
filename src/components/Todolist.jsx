import react, { Component } from "react";
import deleteIcon from "./ic_round-delete.png";
import editIcon from "./material-symbols_edit.png";


export default class Todolist extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            value: "",
            editing: false,
            currentid: "",
            currentValue: ""
        };
    }
    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    onAddTask = (e) => {
        e.preventDefault();
        const obj = {
            name: this.state.value,
            id: Date.now()
        };
        if (this.state.value !== "") {
            this.setState({ todos: this.state.todos.concat(obj) });
            this.setState({ value: "" });

        }

    };

    onDeleteTask = (itemId) => {
        this.setState({
            todos: [...this.state.todos].filter((id) => id.id !== itemId)
        });
    };

    onSubmitEditTodo = (e) => {
        e.preventDefault();
        this.onSubmitEditTodo(this.state.currentid, this.state.currentValue);
        this.setState({ editing: false });
    };
    onToggleEdit = (todo) => {
        this.setState({ editing: true });
        this.setState({ currentid: todo.id });
        this.setState({ currentValue: todo.name });
    };
    onEditInputChange = (e) => {
        this.setState({ currentValue: e.target.value });

    };
    render() {

        const mylist = this.state.todos.map((todo, id) => (
            <li className='todo_item' key={id}>
                {/* <input type="checkbox" /> */}
                <p> {id + 1}. {todo.name} </p>
                <input type="date"></input>
                <div className="todo_buttons  ">
                    <button className="btn" onClick={() => this.onToggleEdit(todo)}>
                        <img src={editIcon} alt="edit" />
                    </button>
                    <button className="btn" onClick={() => this.onDeleteTask(todo.id)}>
                        <img src={deleteIcon} alt="delete" />
                    </button>
                </div>


            </li>
        ));
        return (
            <div className="todo_list">
                {this.state.editing === false ? (
                    <form onSubmit={this.onAddTask}>
                        <input placeholder="Add a task" value={this.state.value} onChange={this.onChange} className="todo-input" />
                        <button onClick={this.onAddTask} className="todo_buttons">+Add Task</button>
                    </form>
                ) : (
                    <form onSubmit={this.onSubmitEditTodo}>
                        <input placeholder="edit Task" value={this.state.currentValue} onChange={this.onEditInputChange} className="todo-input" />
                        <button onClick={this.onSubmitEditTodo}>+Edit Task</button>



                    </form>
                )}
                <ul className="todo_wrapper">{mylist}</ul>

            </div>


        );
    }



}