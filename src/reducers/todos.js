


// the state is stared in a variable called todos, which can be accessed from a component as state.todos
const todos = (state = [], action) => {
 switch (action.type) {
    case 'ADD_TODO':
    return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
    ]
    case 'TOGGLE_TODO':
    return state.map(todo =>
            todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
    default:
    return state;
    }
};

export default todos;