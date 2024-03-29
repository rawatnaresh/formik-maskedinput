// Helper styles for demo
import "./helper.css";
import { MoreResources, DisplayFormikState } from "./helper";

import React from "react";
import { render } from "react-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const currencyMask = createNumberMask({
  prefix: "$"
});

const App = () => (
  <div className="app">
    <h1>
      Masked Input{" "}
      <a
        href="https://github.com/jaredpalmer/formik"
        target="_blank"
        rel="noopener noreferrer"
      >
        Formik
      </a>{" "}
      Demo
    </h1>

    <Formik
      enableReinitialize
      initialValues={{ phone: "" }}
      onSubmit={(values, { setSubmitting }) => {
        values.phone = values.phone.replace(/[,$ ]+/g, "");

        console.log(values);
        // e.target.value =
      }}
      validationSchema={Yup.object().shape({
        phone: Yup.string().required("Required")
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="phone" style={{ display: "block" }}>
              Phone Number
            </label>

            <Field
              name="phone"
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask={currencyMask}
                  id="phone"
                  placeholder="Enter your phone number"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone && touched.phone
                      ? "text-input error"
                      : "text-input"
                  }
                />
              )}
            />

            {errors.phone && touched.phone && (
              <div className="input-feedback">{errors.phone}</div>
            )}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>

    <MoreResources />
  </div>
);

render(<App />, document.getElementById("root"));
