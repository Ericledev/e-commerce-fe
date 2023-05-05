import classes from "./billing-form.module.css";

const BillingForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Waiting for dev");
  };
  return (
    <form className={classes["form-container"]} onSubmit={handleSubmit}>
      <label htmlFor="full-name">FULL NAME:</label>
      <input
        id="full-name"
        type="text"
        placeholder="Enter Your Full Name Here"
      />
      <label htmlFor="email">EMAIL:</label>
      <input id="email" type="email" placeholder="Enter Your Email Here" />
      <label htmlFor="phone-number">PHONE NUMBER:</label>
      <input
        id="phone-number"
        type="text"
        placeholder="Enter Your Phone Number Here"
      />
      <label htmlFor="address">ADDRESS:</label>
      <input id="address" type="text" placeholder="Enter Your Address Here" />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default BillingForm;
