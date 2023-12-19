import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
function Dashboard() {
  const initialValues = { name: "", mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formNumberError, setFormNumberError] = useState(true);
  const [formNameError, setFormNameError] = useState(true);
  const [allUsers, setAllUsers] = useState(false);
  const [allUsersData, setAllUsersData]: any[] = useState();

  const getAllUsers = (e) => {
    e.preventDefault();
    getAllData()
  };

  const getAllData = () => {
    axios
    .get("http://localhost:8080/v1/user/all")
    .then((res) => {
      setAllUsersData(res.data);
      setAllUsers(true);
      console.log(res.data);
    })
    .catch((err) => {
      setAllUsers(false);
      alert("No User Present");
      console.log(err);
    });
  }

  const handelSubmit = (e) => {
    e.preventDefault();

    // console.log(/\d/.test(e.target.value));
    if (!formNameError && !formNumberError) {
      console.log(formValues.name);
      console.log(formValues.mobile);
      axios
        .post("http://localhost:8080/v1/new/user", {
          name: formValues.name,
          mobile: formValues.mobile,
        })
        .then((res) => {
          alert("User Added Sucessfully");
          console.log(res.data);
        })
        .catch((err) => {
          alert("User already present");
          console.log(err);
        });
    } else {
      alert("Either name or mobile field is invalid");
    }
  };

  const validateName = (e) => {
    if (e.target.value == "") {
      setFormNameError(true);
    } else if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
      setFormNameError(false);
    } else {
      setFormNameError(true);
    }
  };

  const validateNumber = (e) => {
    if (e.target.value == "") {
      setFormNumberError(true);
    } else if (/[0-9]{10}$/.test(e.target.value)) {
      setFormNumberError(false);
    } else {
      setFormNumberError(true);
    }
  };

  function deleteUser(mobile) {
    axios
      .post(`http://localhost:8080/v1/delete/user/${mobile}`)
      .then(() => {
        getAllData();
      })
      .catch((err) => {
        alert("Please refresh the page");
        console.log(err);
      });
  }
  

  return (
    <>
      <form className="form">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            value={formValues.name}
            onChange={(e) => {
              setFormValues({ ...formValues, name: e.target.value });
              validateName(e);
            }}
            type="text"
            name="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {formNameError ? (
            <div id="emailHelp" className="form-text">
              Enter a valid name.
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone </label>
          <input
            type="text"
            name="mobile"
            value={formValues.mobile}
            onChange={(e) => {
              setFormValues({ ...formValues, mobile: e.target.value });
              validateNumber(e);
            }}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />

          {formNumberError ? (
            <div id="emailHelp" className="form-text">
              Enter a valid phone number.
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          onClick={handelSubmit}
          disabled={formNameError || formNumberError ? true : false}
          className="btn btn-primary "
        >
          Submit
        </button>
        <button onClick={getAllUsers} className="btn btn-danger mx-3">
          Get all users
        </button>
      </form>
      {allUsers ? (
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allUsersData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.mobile}</td>
                <td>
                  <button
                    onClick={() => {deleteUser(data.mobile)}}
                    className="btn btn-danger mx-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
}

export default Dashboard;
