import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  //URL variable
  const url = "http://jlzendogsbackend.herokuapp.com";
  //once you get our API, you need to store it somewhere - use hook to hold dogs
  //LIST OF DOGS STATE
  const [dogs, setDogs] = React.useState([])
  //empty array in () because we know list of dogs will be an array(so initialized already)
  
  //Empty dog
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }
  
//selected Dog State, this will represent the dog to be edited
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //GET LIST OF DOGS FUNCTION so we can reuse function later
  const getDogs = () => {
    fetch(url+"/dog/")
    //didn't add /dog before because you may use API that use different endpoints... good practice to set base URL
    .then((response) => response.json())
    //this turns stream of data into JS object to be available for the next .then
    .then((data) => {
      setDogs(data)
    })
  }
  //useEffect to do initial fetch of dogs
  React.useEffect(() => {
    getDogs()
  }, [])

  //handle create to create dogs... newDog is formData
  //when we do a fetch request that's not get, gets more complicated. second fetch needs to be made
  const handleCreate = (newDog) => {
    fetch(url + "/dog/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then(() => {
      //don't need the response from the post but will be using the .then to update the list of dogs
      getDogs();
    })
  }

  //handleUpdate for when you use the update form
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    })
    //this is to make sure the next step happens after 
      .then(response => getDogs())
  }

  //Set the state when you select a dog to edit
  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  //Function to delete dog
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })  
    .then(response => getDogs())
  }

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} selectDog={selectDog} dogs={dogs} deleteDog ={deleteDog}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
