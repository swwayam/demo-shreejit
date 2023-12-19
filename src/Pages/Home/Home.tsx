import { useState } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const initialValues = "";
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(true);
  const [formGetByName, setFormGetByName] = useState(false);
  const [formGetByNumber, setFormGetByNumber] = useState(false);
  const [formNumberData, setFormNumberData] = useState();
  const [formNameData, setFormNameData]: any[] = useState();

  const handelChange = (e) => {
    setFormValues(e.target.value);

    // console.log(e.target);
    // validate();
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(/\d/.test(e.target.value));
    console.log(e.target.data.value);

    if (/\d/.test(e.target.data.value)) {
      console.log("axi");
      axios
        .get(`http://localhost:8080/v1/user/phone/${formValues}`)
        .then((res) => {
          setFormGetByNumber(true);
          setFormGetByName(false);
          // setFormNameData(undefined);
          setFormNumberData(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("User not found");
        });

      // this.#dataService.getUserByNumber(val.data)
    } else {
      // this.#dataService.getUserByName(val.data)

      axios
        .get(`http://localhost:8080/v1/user/name/${formValues}`)
        .then((res) => {
          setFormGetByName(true);
          setFormGetByNumber(false);
          // setFormNumberData(undefined)
          setFormNameData(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("User not found");
        });
    }
  };

  const validate = (e) => {
    if (e.target.value == "") {
      setFormErrors(true);
    } else if (/^[a-z]*$|^[0-9]{10}$/.test(e.target.value)) {
      setFormErrors(false);
    } else {
      setFormErrors(true);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Phone / Name
          </label>
          <input
            value={formValues}
            type="text"
            name="data"
            required
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={() => {
              handelChange(event);
              validate(event);
            }}
          />

          {formErrors ? (
            <div id="emailHelp" className="form-text">
              Enter phone number / name to search for the employee
            </div>
          ) : (
            ""
          )}
        </div>

        <button disabled={formErrors} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {formGetByName ? (
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
            </tr>
          </thead>
          <tbody>
            {formNameData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}

      {formGetByNumber ? (
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formNumberData.name}</td>
              <td>{formNumberData.mobile}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
