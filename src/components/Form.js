import { useState } from "react"
import { supabase } from "../supabaseClient"
import { BsPlusCircle } from 'react-icons/bs'
import TodoList from "./TodoList"



function Form() {
    const [title, setTitle] = useState('')
    const [formError, setFormError] = useState(null)
    const [status, setStatus] = useState(false)



    const HandleItem = async (e) => {
        e.preventDefault();
        if (!title) {
            setFormError('Please fill in the field correctly')
            return
        }
        const { data } = await supabase
            .from('todo')
            .insert({ title })
        if (data)
           setFormError(null)
           window.location.reload()
    }


    return (
        <div className="mb-5 max-w-7xl mx-auto ">
            <div className="py-20 text-center space-y-12 px-2">
                <h1 className="text-4xl md:text-6xl font-semibold">Cl!ck the plus add your task</h1>
                <button type="submit" onClick={() => setStatus(!status)}><BsPlusCircle className="text-4xl mt-6 mb-6 " /></button>
                {status ? <form onSubmit={HandleItem} className="space-x-2">
                    <input type="text" placeholder="Enter your task" value={title} onChange={e => setTitle(e.target.value)} className=" rounded-xl p-2 w-full md:w-96"></input>
                    <button type="submit" className="s w-1/2 md:w-32 mt-5 py-2 bg-black text-white rounded-xl">OK</button>
                </form> : null}
                {formError && <p>{formError}</p>}
            </div>
            <TodoList />

        </div>
    )
}
export default Form;