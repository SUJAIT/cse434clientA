import './BusInfoCard.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const BusInfoCard = ({ data,setData }) => {
  const {
   _id,
    busName,
    superVisorNum,
    seatPrice,
    busRegNum,
    availableSeat,
    busUrl,
    journeyStartDate,
    journeyEndDate,
    seatType,
    journeyStartTime,
    journeyEndTime,
    destinationFrom,
    destinationTo, 
  } = data

//delete card function start

const handleDelete = (id) => {
  console.log(id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/businfo/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.deletedCount > 0) {
            Swal.fire('Deleted!', 'The bus information has been deleted.', 'success');
            
            // Update the state to remove the deleted bus dynamically
            setData((prevData) => prevData.filter((bus) => bus._id !== id));
          }
        })
        .catch((error) => console.error('Error deleting:', error));
    }
  });
};

//delete card function end


  return (
    <div>
      <div className="card cardW bg-base-100  shadow-xl">
        <div className="card-body">
          <div className='flex'>
            {/* img */}
            <div className="avatar">
              <div className="w-24 rounded">
                <div>
                    <img src={busUrl} />
                </div>
              </div>
            </div>
            {/* img end */}
            <div className='flex gap-2 justify-between'>
            <div className='ml-12'>
            <h2 className="card-title">Bus Name : {busName}</h2>
              <p>Phone Number : {superVisorNum}</p>
              <span>Available Seat : <div className="badge badge-error font-semibold">{availableSeat}</div></span>
              <p>Seat Type : {seatType}</p>
              <p>Seat Price : {seatPrice}</p>
              <p>Bus Registration Number : {busRegNum}</p>
            </div>
         <div className='mt-8'>
         <p>Journey-Start : {journeyStartTime}</p>
              <p>Journey-End : {journeyEndTime}</p>
              <p>Journey-Start-Date : {journeyStartDate}</p>
              <p>Journey-End-Date : {journeyEndDate}</p>
           
         </div>
         <div className='ml-4 mt-4'>
         <ul className="steps steps-vertical">
  <li className="step step-primary">{destinationFrom}</li>
  <li className="step step-primary">{destinationTo}</li>
  {/* <li className="step">Purchase</li>
  <li className="step">Receive Product</li> */}
</ul>
         </div>
         <div className='mt-12 ml-14'>
          <button onClick={() => handleDelete(_id)} className='btn btn-error'>DELET</button>
         </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusInfoCard