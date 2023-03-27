import React, { useState } from "react";
import "./LoanForm.css";
function LoanForm() {
 
  const [formData, setFormData] = useState({
    personalCode: "",
    loanAmount: "",
    loanPeriod: "",
  });
  const [responseData, setResponseData] = useState(null);

  // Handler function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler function
  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(
      "http://localhost:8080/loan?personalCode=" +
      formData.personalCode +
      "&loanAmount=" +
      formData.loanAmount +
      "&loanPeriod=" +
      formData.loanPeriod
    )
      .then((response) => response.json())
      .then((data) => setResponseData(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {responseData && (
        <div>
          <p>Decision: {responseData.decision}</p>
          {responseData.decision === "positive" && (
            <p>
              Approved Loan Amount: {responseData.amount}
              {responseData.newLoanPeriod &&
                ` for ${responseData.newLoanPeriod} months`}
            </p>
          )}
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            Personal Code:
            <input
              type="text"
              name="personalCode"
              value={formData.personalCode}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Loan Amount:
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              min="2000"
              max="10000"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Loan Period (in months):
            <input
              type="number"
              name="loanPeriod"
              value={formData.loanPeriod}
              onChange={handleInputChange}
              min="12"
              max="60"
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoanForm;
