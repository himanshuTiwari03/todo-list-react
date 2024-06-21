import './App.css';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { Col, Container, Row, Table } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  let [todolist, setTodolist] = useState([]);

  let saveToDo = (event) => {
    let toname = event.target.toname.value;
    if (!todolist.includes(toname)) {
      let finaltodo = [...todolist, toname];
      setTodolist(finaltodo);
      toast.success("TODO added");
      event.target.toname.value = "";

    } else {
      toast.warning("TODO already exists!");
    }

    event.preventDefault();
  }

  let data = todolist.map((value, idx) => {
    return (
      <TodoListItems value={value} key={idx}
        idx={idx} todolist={todolist} setTodolist={setTodolist}

      />
    )
  })
  return (

    <div className='todo-outer'>
      <h1 className='text-center mb-3 fw-bolder todo-heading'>TODO LIST</h1>
      <form onSubmit={saveToDo}>
        <Container >
          <Row>
            <Col className='lg-12 d-flex gap-2'>
              <input type='text' name='toname' className='form-control todo-input mb-4' placeholder="add item....."></input>
              <button className='btn btn-primary mb-4 todo-add fw-bold'>Add</button>
            </Col>
          </Row>
        </Container>
      </form>
      <Container className='list-outer '>
        <ToastContainer />
        <Row>
          <Col className='col-lg-12'>
            <ul>
              {data}
            </ul>
          </Col>
        </Row>
      </Container>
     
    </div>

  );
}

export default App;
function TodoListItems({ value, idx, todolist, setTodolist }) {
  let deleteTodo = () => {
    let finalTodo = todolist.filter((v, i) => i != idx)
    setTodolist(finalTodo);
    toast.error("Todo " + (idx + 1) + " Deleted")
  }
  let [check, setCheck] = useState(false);
  let checkstatus = () => {
    setCheck(!check);
    if (check == false) {
      toast.success("Todo " + (idx + 1) + " Completed");
    }
  }
  return (

    <div className='container-fluid'>
      <li className={(check) ? 'checked-li' : 'todo-li'} onClick={checkstatus}>  &nbsp;{idx + 1}. {value} </li>
      <span className='todo-span' onClick={deleteTodo}>&times;</span>

   
    </div>

  )
}