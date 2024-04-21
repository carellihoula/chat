import { useState } from "react";

import { validAccount } from "../../api/API";
import styles from "./activate.module.css";
import { notify } from "../../toastify/notify";

function ActivateAccount() {
  const [code, setCode] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const messages: string[] = [
    "Your account is activated, go to login page",
    "this code is not correct. Please try again!",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle submit
    validAccount("/auth/activate", code)
      .then(() => {
        setResponse(messages[0]);
        setCode("");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setResponse(err.response.data.message);
        } else {
          setResponse(messages[1]);
          notify({ response: response, status: false });
        }
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form__container}>
        <small
          className={` ${styles.response} ${
            response === messages[0]
              ? styles.response__success
              : styles.response__error
          }`}
        >
          {response}
        </small>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.account__verif}>Account Verification</h1>
          <div className={styles.input__container}>
            {/*<label className={styles.label__code}>Code</label>*/}
            <input
              type="text"
              placeholder="type your code"
              className={styles.input}
              value={code}
              onChange={handleChange}
              autoFocus
            />
          </div>
          <button type="submit" className={styles.button__send}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivateAccount;
