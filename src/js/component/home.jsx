import React, {useEffect, useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [item, setItem] = useState([]);
	const [input, setInput] = useState("");
	
	
	useEffect(()=>{

		fetch('https://playground.4geeks.com/apis/fake/todos/user/Daniel')
		.then(response => response.json())
		.then(data => {	
			setItem(data)
		})
		.catch(error => {

			fetch('https://playground.4geeks.com/apis/fake/todos/user/Daniel', {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(data => setItem([]))
			
		});

	}, [item])
	
	
	
	const saveInput = (e) => {
		setInput(e.target.value);
	};

	const addNewItem = (event) => {
		
		if (event.key === 'Enter') {
			
			fetch('https://playground.4geeks.com/apis/fake/todos/user/Daniel', {
				method: "PUT",
				body: JSON.stringify([...item , {label: input, done: false}]),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
			.then(response => response.json())
			.then(data =>{
				console.log(data)

		})		
			
			setInput("");
		}
		
	};

	const deleteTask = (id) =>{
		const novo = [...item]
		novo.splice(id, 1)
		fetch('https://playground.4geeks.com/apis/fake/todos/user/Daniel', {
			method: "PUT",
			body: JSON.stringify(novo),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		
		.then(response => response.json())
		.then(data =>{
			console.log(data)

	})		
		
	}


	return (
		<div className="container-fluid ">
			<div className="col-6 mx-auto my-5">
				<div className="row border border-2 boder-secondary">
					
						<div className="input-group-lg pt-3 d-flex ">
							<input className="form-control border-0 mx-2 fs-3" type="text" placeholder="Inset New Text" onChange={saveInput} onKeyDown={addNewItem} value={input}></input>
							
						</div>
					
				</div>
				
				{item && item.map((subItems, id) => {
					return (
						<div className="row border border-2 border-top-0 py-2">
							
								
								<li  className="d-flex " key={id}> 
								
								<span className="fs-3 col mx-4 align-items-start"> {subItems.label}</span>
								
								<button type="button" className="btn-close col-1 me-5 border border-0 mt-2 btn-secondary align-items-end" onClick={() => deleteTask(id)}></button>
								</li>
							
						</div>
					)
				})}
				
				{item.length > 0 ? (
					<div className="row border border-2 border-top-0 py-2">
						<span> You still have {item.length} tasks</span>
					</div>
				) : (
					<div className="row border border-2 border-top-0 py-2">
						<span> You dont have any task to do Perfect !! </span>
					</div>
				)}

			</div>

		</div>
	);
};

export default Home;