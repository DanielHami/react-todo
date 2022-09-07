import { supabase } from "../supabaseClient"
import { useEffect, useState } from "react"
import { BsCheckCircle } from 'react-icons/bs'
import { StyledButton, StyledText } from "./style/StyledTodo"

const TodoList = () => {
    const [fetchError, setFechError] = useState(null)
    const [items, setItems] = useState([])
    const [state, setState] = useState('')
    const [title, setTitle] = useState('')

    async function handlePut(submitId) {
        await supabase
            .from('todo')
            .update({ title: `${title}`, state: 'none' })
            .eq('id', submitId)
            window.location.reload()
    }

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase
                .from('todo')
                .select('*')
            setItems(data)
            if (error){
                setFechError('Could not fetch the todos')
                setItems(null)
            }
            if (data) {
                setFechError(null)
            }
        }
        fetchData()
    }, [])

    async function HandleDelete(parameter) {
       await supabase
            .from('todo')
            .delete()
            .eq('id', parameter)
            window.location.reload()
    }

   async function handleStatus(id) {
         await supabase
            .from('todo')
            .update({
                 state: 'done',})
            .eq('id', id)
            window.location.reload()
            
    }

    function changeIsReply(clickedId, title) {
        setTitle(title)
        setState(clickedId)

    }

    return (
        <div>
        {!fetchError ?
        <div className="flex flex-col gap-6 mt-20 lg:grid lg:grid-cols-4 md:grid md:grid-cols-3  md:gap-5">
            {items.map(props =>
                <div key={props.id} className="flex flex-col gap-8 justify-around rounded-lg text-left px-4 py-6 space-y-5 backdrop-blur-sm bg-white/30 ">
                    {state === props.id ? <div className="w-full"><input value={title} name={props.title} placeholder={props.title} onChange={(e) => setTitle(e.target.value)} className="border-2 rounded-xl px-2"></input></div>
                        : <div><div className="flex gap-2 items-center"><StyledButton prop={props.state} onClick={() => { handleStatus(props.id, props.title) }}><BsCheckCircle className="text-xl my-auto hover:text-green-300" /></StyledButton> {props.state && <p className="">Done</p>} </div> <StyledText prop={props.state}>{props.title}</StyledText></div>}
                    <div>
                        <button onClick={() => HandleDelete(props.id)} className="border-2 border-red-500 w-20 rounded-xl mr-2" >Delete</button>
                        {state === props.id ?
                            <button onClick={() => handlePut(props.id, props.title)} className="border-2 w-20 border-blue-900 rounded-xl">Submit</button> :
                            <button onClick={() => changeIsReply(props.id, props.title)} className="border-2 border-blue-900 w-20 rounded-xl">Edit</button>}
                    </div>
                </div>)}
        </div>
        :(<div className="text-center"><p>{fetchError}</p></div>)}
        </div>
    )
}

export default TodoList