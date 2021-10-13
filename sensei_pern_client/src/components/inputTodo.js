import React,{Fragment,useState} from "react";

const InputTodo = () => {

    const[describe,setDescribe] = useState("")
    const onSubmitForm = async e =>{
        e.preventDefault();
        try {
            const body ={describe}
            await fetch("http://0.0.0.0:8080/todos",{
                method:'POST',
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            // console.log(response);
            window.location='/';
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
        <h1 className="container"> Pern Todo list </h1>
        <form className="form_1" onSubmit={onSubmitForm}>
            <input type="text" value={describe} onChange={e => setDescribe(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
        </Fragment>
    )
};
export default InputTodo;