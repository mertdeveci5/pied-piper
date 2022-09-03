import React, { useEffect } from "react";
import Gun from "gun";
import SEA from "gun/sea";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

let gun = Gun(["http://localhost:7000/gun"]);
const user = gun.user().recall({ sessionStorage: true });

const Login = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      user.create(values.email, values.password, (ack) => {
        alert(`from create: ${JSON.stringify(ack)}`);
        if (ack.err) {
          alert(`error: ${ack.err}`);
        } else {
          alert(
            `Email and password ${values.email} + ${values.password}`,
            values.email,
            values.password
          );
          user.auth(values.email, values.password, ({ err, soul }) => {
            alert(
              `from auth, this is the soul of user: ${JSON.stringify(soul)}`
            );
            if (err) {
              alert(
                `there was an error while authenticating the user: ${values.email}`
              );
            } else {
              user.on("auth", (ack) => {
                alert(`authentication was successful: ${JSON.stringify(ack)}`);
              });
            }
            navigate("/mock");
          });
        }
      });
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="username"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">login</button>
      </form>

      <form>
        <input type="text" id="message" />
        <button type="submit">Send message</button>
      </form>
    </>
  );
};

export default Login;
