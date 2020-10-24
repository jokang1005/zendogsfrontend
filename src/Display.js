import React from "react";

const Display = (props) => {
  const {dogs} = props

  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {dogs.map((dog) => (
        <article key={dog._id}>
          <img src={dog.img}/>
          <h1>{dog.name}</h1>
          <h3>{dog.age}</h3>
          <button onClick={() => {
            props.selectDog(dog)
            props.history.push('/edit')
          }}
          >Edit</button>
          <button onClick={() => {
            props.deleteDog(dog)
          }}>Delete</button>
        </article>
      ))}
    </div>
  )

  const loading = <h1>Loading...</h1>
  return dogs.length > 0 ? loaded() : loading
};


export default Display;
