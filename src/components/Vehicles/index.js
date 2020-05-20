import React, { useEffect, useContext } from 'react';
import { getAll } from '../../services/DBService';
import { Context } from '../../store';

function Vehicles() {
  const [state, dispatch] = useContext(Context);
  const { vehicles } = state;

  useEffect(() => {
    getAll().then((item) => {
      dispatch({type: 'SET_VEHICLE', payload: item})
    })
  }, [dispatch]);

  function submitDataToDb(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const generatedId = `${Math.floor(new Date().valueOf() * Math.random())}`;
    for (const [key, value] of formData.entries()) {
      dispatch({type: 'ADD_VEHICLE', payload: {
        [key]: value,
        id: generatedId
      }});
    }
  }


  return (
    <div className="App">
        <header className="App-header">
            Post to API only after threshold
        </header>
        <div className="container">
            <div>
                <div className="car-names">
                    {vehicles.map(item => (
                        <span key={item.id}>{item.vehicle}</span>
                    ))}
                </div>
            </div>
            <div>
                <form onSubmit={submitDataToDb}>
                <input name="vehicle" type="text" />
                <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Vehicles;
