
import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

function BusInfoForm() {
  // State management for form inputs
  const [formData, setFormData] = useState({
    busName: '',
    superVisorNum: '',
    seatPrice: '',
    busRegNum: '',
    availableSeat: '',
    busUrl: '',
    destinationFrom: '',
    destinationTo: '',
    seatType: '',
    journeyStartTime: null,
    journeyEndTime: null,
    journeyStartDate: null,
    journeyEndDate: null,
  });

  // Handle change for all inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Date change
  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: newValue ,
    }));
  };
//
//Handle Time Change
  const handleTimeChange = (name, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: newValue ,
    }));
  };
  //

//time format manage start
const extractTime = (time) =>dayjs(time).format('HH:mm')
//time format manage end

//Date Format start
const extractDate = (date) =>dayjs(date).format('DD/MM/YYYY')
//Date Format End



  // Form submission handler
    const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log('Form Data:', formData); // Log form data
    // Here, you can send data to the backend or perform further actions

    // Time Formatting Function start
    const formattedDateTime = {
      ...formData,
      journeyStartTime: extractTime(formData.journeyStartTime),
      journeyEndTime: extractTime(formData.journeyEndTime),
      journeyStartDate: extractDate(formData.journeyStartDate),
      journeyEndDate: extractDate(formData.journeyEndDate),
    };
    console.log("Submitted Date:",formattedDateTime)
 //

    fetch("http://localhost:5000/bus", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formattedDateTime)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setFormData({
            busName: '',
            superVisorNum: '',
            seatPrice: '',
            busRegNum: '',
            availableSeat: '',
            busUrl: '',
            destinationFrom: '',
            destinationTo: '',
            seatType: '',
            journeyStartTime: null,
            journeyEndTime: null,
            journeyStartDate: null,
            journeyEndDate: null,
          })
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'User Profile Updated Succesfully',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })

  };



  return (
    <div className="hero">
      <div className="hero-content">
        <div className="bg-base-100 shadow-2xl p-6">
          <p>BUS INFORMATION</p>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <div className="flex gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">BUS NAME</span>
                  </label>
                  <input
                    name="busName"
                    type="text"
                    placeholder="BUS NAME"
                    className="input input-bordered"
                    value={formData.busName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">SUPER VISOR NUMBER</span>
                  </label>
                  <input
                    name="superVisorNum"
                    type="number"
                    placeholder="SUPERVISOR NUMBER"
                    className="input input-bordered"
                    value={formData.superVisorNum}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control">
              <div className="flex gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">SEAT PRICE</span>
                  </label>
                  <input
                    type="number"
                    name="seatPrice"
                    placeholder="SEAT PRICE"
                    className="input input-bordered"
                    value={formData.seatPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">BUS REG NUM</span>
                  </label>
                  <input
                    name="busRegNum"
                    type="text"
                    placeholder="BUS REG NUM"
                    className="input input-bordered"
                    value={formData.busRegNum}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control">
              <div className="flex gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">DESTINATION FROM</span>
                  </label>
                  <select
                    name="destinationFrom"
                    className="select select-bordered"
                    value={formData.destinationFrom}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>STARTING DESTINATION</option>
                    <option value="DHAKA">DHAKA</option>
                    <option value="COMILLA">COMILLA</option>
                    <option value="CHITTAGONG">CHITTAGONG</option>
                    <option value="COXBAZZAR">COXBAZZAR</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">DESTINATION TO</span>
                  </label>
                  <select
                    name="destinationTo"
                    className="select select-bordered"
                    value={formData.destinationTo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>ENDING DESTINATION</option>
                    <option value="DHAKA">DHAKA</option>
                    <option value="COMILLA">COMILLA</option>
                    <option value="CHITTAGONG">CHITTAGONG</option>
                    <option value="COXBAZZAR">COXBAZZAR</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-control">
              <div className="flex gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">SEAT TYPE</span>
                  </label>
                  <select
                    name="seatType"
                    className="select select-bordered"
                    value={formData.seatType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>SEAT TYPE</option>
                    <option value="AC">AC</option>
                    <option value="NON-AC">NON-AC</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">BUS SEAT AVAILABLE</span>
                  </label>
                  <input
                    name="availableSeat"
                    type="number"
                    placeholder="BUS SEAT AVAILABLE"
                    className="input input-bordered"
                    value={formData.availableSeat}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">BUS URL</span>
                  </label>
                  <input
                    name="busUrl"
                    type="text"
                    placeholder="BUS IMAGE URL"
                    className="input input-bordered"
                    value={formData.busUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control">
              <div className="flex gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">JOURNEY START DATE</span>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        value={formData.journeyStartDate}
                        onChange={(newValue) => handleDateChange('journeyStartDate', newValue)}
                        label="Start Date & Time"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">JOURNEY END DATE</span>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        value={formData.journeyEndDate}
                        onChange={(newValue) => handleDateChange('journeyEndDate', newValue)}
                        label="Start Date & Time"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <div className="form-control">
              <div className="flex gap-2">
                <div>
                  <label className="label">
                    <span className="label-text">JOURNEY START TIME</span>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        value={formData.journeyStartTime}
                        onChange={(newValue) => handleTimeChange('journeyStartTime', newValue)}
                        label="Start Time"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">JOURNEY END TIME</span>
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        value={formData.journeyEndTime}
                        onChange={(newValue) => handleTimeChange('journeyEndTime', newValue)}
                        label="Start Time"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <div className="form-control mt-6">
              <input type="submit" className="btn btn-error" value="SUBMIT" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusInfoForm;


