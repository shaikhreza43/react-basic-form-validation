import { useState } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", password: "", email: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
    setIsFormSubmitted(true);
  };

  const validateForm = (values) => {
    const errors = {};
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password Should be minimum 4 characters long";
    } else if (values.password.length > 10) {
      errors.password = "Password Cannot be more than 10 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    return errors;
  };

  return (
    <div className="App">
      <h3 className="text-center">React Basic Form Validation (No Library)</h3>
      <div className="d-flex flex-column mt-2 justify-content-center align-items-center">
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        <div className="col-lg-4 custom-border">
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username..."
                name="username"
                className="form-control"
                value={formValues.username}
                onChange={handleFormChange}
              ></input>
            </div>
            <div className="text-danger">{formErrors.username}</div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password..."
                name="password"
                className="form-control"
                value={formValues.password}
                onChange={handleFormChange}
              ></input>
            </div>
            <div className="text-danger">{formErrors.password}</div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                className="form-control"
                value={formValues.email}
                onChange={handleFormChange}
              ></input>
            </div>
            <div className="text-danger">{formErrors.email}</div>
            <div className="form-group mt-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          {isFormSubmitted && Object.keys(formErrors).length === 0 && (
            <h6 className="text-success text-center">Form is Valid.</h6>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
