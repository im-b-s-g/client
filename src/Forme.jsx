/* eslint-disable no-unused-vars */
import React from "react";
import "./form.css";
const Form = () => {
  return (
    <div>
      <form action="" method="post">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />

        <label htmlFor="coursecode">Course Code</label>
        <input type="text" id="coursecode" />

        <label htmlFor="year">Semester</label>
        <input type="radio" id="year" name="semester" value="1" />
        <input type="radio" id="year" name="semester" value="2" />
        <input type="radio" id="year" name="semester" value="3" />
        <input type="radio" id="year" name="semester" value="4" />
        <input type="radio" id="year" name="semester" value="5" />
        <input type="radio" id="year" name="semester" value="6" />
        <input type="radio" id="year" name="semester" value="7" />
        <input type="radio" id="year" name="semester" value="8" />

        <label htmlFor="Tags">Tags</label>
      </form>
    </div>
  );
};

export default Form;
