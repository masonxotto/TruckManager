/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';

import '../Styles/GlobalStyles.css';
import '../Styles/LoadInvoicesScreen.css';


//TODO: make date useState an actual date variable so it can work with the database
/*-------------------------------------------------------------------------
  Load Invoices Component
-------------------------------------------------------------------------*/
export default function LoadInvoicesScreen({ navigation }){

  //this function will submit the input data to the backend to be uploaded to the database
  //TODO: 1.) submit the data - DONE - MXO
  //      2.) error handling/input handling
  const apiURL = 'http://localhost:5000'
  const handleSubmit = async () => {
    const response = await fetch(`${apiURL}/invoices`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date,
        driver: driver,
        truckNum: truckNum,
        description: description,
        orderNum: orderNum,
        ticketNum: ticketNum,
        tons: tons,
        hours: hours,
        unitPrice: unitPrice
      })
    });
    const created = await response.json();
    //if json response does not container a true created object then this alerts the user the submission failed and to try again. -MXO
    if (!created.created) {
      alert("Load ticket submission FAILED. Try again")
    }
    
    setDate("");
    setDriver("");
    setTruckNum("");
    setDescription("");
    setOrderNum("");
    setTicketNum("");
    setTons("");
    setHours("");
    setUnitPrice("");
  }

  const handleSubmitChecker = async (e) => {
    e.preventDefault();
    if(date.length == 0 || driver.length == 0 || truckNum.length == 0 || description.length == 0 || orderNum.length == 0 
      || ticketNum.length == 0 || tons.length == 0 || hours.length == 0 || unitPrice.length == 0){
        setSubmitError("Every blank must be filled in!");
        return;
    }
    else if(submitError.length > 0) {
      setSubmitError("");
    }
    handleSubmit();
  }

  const [date, setDate] = useState(""); //look at using {varOne: new Data()}
  const [driver, setDriver] = useState("");
  const [truckNum, setTruckNum] = useState("");
  const [description, setDescription] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [ticketNum, setTicketNum] = useState("");
  const [tons, setTons] = useState(""); //database stores this as an int
  const [hours, setHours] = useState(""); //database stores this as an int
  const [unitPrice, setUnitPrice] = useState(""); //database stores this as an int
  const [submitError, setSubmitError] = useState("");

  /*-------------------------------------------------------------------------
    Load Invoices Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="container">
          <h1>
            Load Ticket
          </h1>
          <form className="form-load" onSubmit={handleSubmitChecker}>
            {submitError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{submitError}</div>}
            <div className="softContainer">
              <label className="load-label" htmlFor="date">Date</label>
              <input className="load-input-field" id="date" type="datetime-local" onChange={(e) => setDate(e.target.value)} value={date}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="driver">Driver</label> 
              <input className="load-input-field" id="driver" onChange={(e) => setDriver(e.target.value)} value={driver}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="trucknum">Truck #</label>
              <input className="load-input-field" id="trucknum" onChange={(e) => setTruckNum(e.target.value)} value={truckNum}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="description">Description</label>
              <input className="load-input-field" id="description" onChange={(e) => setDescription(e.target.value)} value={description}/>
            </div>
            <div className="softContainer">
            <label className="load-label" htmlFor="ordernum">Order #</label>
              <input className="load-input-field"id="ordernum" onChange={(e) => setOrderNum(e.target.value)} value={orderNum}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="ticketnum">Ticket #</label>
              <input className="load-input-field" id="ticketnum" onChange={(e) => setTicketNum(e.target.value)} value={ticketNum}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="tons">Tons</label>
              <input className="load-input-field" id="tons" onChange={(e) => setTons(e.target.value)} value={tons}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="hours">Hours</label>
              <input className="load-input-field" id="hours" onChange={(e) => setHours(e.target.value)} value={hours}/>
            </div>
            <div className="softContainer">
              <label className="load-label" htmlFor="unitprice">Unit Price</label>
              <input className="load-input-field" id="unitprice" onChange={(e) => setUnitPrice(e.target.value)} value={unitPrice}/>
            </div>
            <button className="load-btn" type="submit">Submit</button>
          </form>
      </div>
  );

};