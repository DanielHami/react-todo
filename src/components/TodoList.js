import { useEffect, useState } from "react"
import axios from "axios"
import { BsCheckCircle } from 'react-icons/bs'
import { StyledButton, StyledText } from "./style/StyledTodo"

const TodoList = () => {
    const [items, setItems] = useState([])
    const [state, setState] = useState('')
    const [newText, setNewText] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/todos', {
        })
            .then(function (response) {
                setItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    function HandleDelete(parameter) {
        axios.delete(`http://localhost:8000/todos/${parameter}`)
        window.location.reload(false);
    }


    function handlePut(submitId, title) {
        const article = { title: `${newText}` };
        axios.put(`http://localhost:8000/todos/${submitId}`, article)

    }

    function handleStatus(id, fax) {
        axios.put(`http://localhost:8000/todos/${id}`, {
            "title": `${fax}`,
            "state": "done"
        })

    }



    function changeIsReply(clickedId, title) {
        setNewText(title)
        setState(clickedId)

    }


    return (
        <div className="flex flex-col gap-6 mt-20 lg:grid lg:grid-cols-4 md:grid md:grid-cols-3  md:gap-5">
            {items.map(props =>
                <div key={props.id} className="flex flex-col gap-8 justify-around rounded-lg text-left px-4 py-6 space-y-5 backdrop-blur-sm bg-white/30 ">
                    {state === props.id ? <div className="w-full"><input value={newText} name={props.title} placeholder={props.title} onChange={(e) => setNewText(e.target.value)} className="border-2 rounded-xl px-2"></input></div>
                        : <div><div className="flex gap-2 items-center"><StyledButton prop={props.state} onClick={() => { handleStatus(props.id, props.title); window.location.reload() }}><BsCheckCircle className="text-xl my-auto hover:text-green-300" /></StyledButton> {props.state && <p className="">Done</p>} </div> <StyledText prop={props.state}>{props.title}</StyledText></div>}
                    <div>
                        <button onClick={() => HandleDelete(props.id)} className="border-2 border-red-500 w-20 rounded-xl mr-2" >Delete</button>
                        {state === props.id ?
                            <button onClick={() => { handlePut(props.id, props.title); window.location.reload() }} className="border-2 w-20 border-blue-900 rounded-xl">Submit</button> :
                            <button onClick={() => changeIsReply(props.id, props.title)} className="border-2 border-blue-900 w-20 rounded-xl">Edit</button>}
                    </div>
                </div>)}
        </div>
    )
}

export default TodoList