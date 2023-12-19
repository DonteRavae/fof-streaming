"use client";

// REACT
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
// NEXTJS
import Link from "next/link";
import { redirect } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import { Icons } from "../Icons/index";
import signUp from "@/actions/SignUp.action";
import FormInput from "../FormInput/FormInput";
import { EMAIL_VALIDATION, PWD_VALIDATION } from "@/utils/constants";
import CallToActionButton from "../CallToActionButton/CallToActionButton";
// STYLES
import styles from "./index.module.scss";

export default function SignUpForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [, setEmailFocus] = useState<boolean>(true);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const {
    loginUser,
    selectProfile,
    persist,
    persistUser,
    persistedProfile,
    persistUserProfile,
  } = useAuth();

  // Focus first name input on load
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  // Update persisted values in localstorage
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
    localStorage.setItem("pid", JSON.stringify(persistedProfile));
  }, [persist, persistedProfile]);

  // Check email validity on input change
  useEffect(() => {
    setValidEmail(EMAIL_VALIDATION.test(email));
  }, [email]);

  // Check password validity on input change
  useEffect(() => {
    setValidPwd(PWD_VALIDATION.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Reset error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd, setErrMsg]);

  // HANDLERS

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPwd(value);
        break;
      case "passwordMatch":
        setMatchPwd(value);
        break;
      default:
        return;
    }
  };

  const handleEmailFocus = () => setEmailFocus(true);

  const handleEmailExit = () => setEmailFocus(false);

  const handlePasswordFocus = () => setPwdFocus(true);

  const handlePasswordExit = () => setPwdFocus(false);

  const handleMatchPasswordFocus = () => setMatchFocus(true);

  const handleMatchPasswordExit = () => setMatchFocus(false);

  const togglePersist = () => persistUser(!persist);

  const onSignUp = async (formData: FormData) => {
    const res = await signUp(formData);
    if (res.ok) {
      let user = res.data.payload!;
      const defaultProfile = user.profiles[0].id;
      loginUser(user);
      selectProfile(user.profiles[0]);
      persist && persistUserProfile(defaultProfile);
      return redirect("/access/signup/checkout");
    }
    setErrMsg(res.data.message as string);
  };

  return (
    <form className={styles.formContainer} action={onSignUp}>
      <header>
        <h2>Create an account with us today!</h2>

        <p
          ref={errorRef}
          className={`${errMsg ? styles.errorMessage : styles.offscreen}`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </header>

      <FormInput
        id="registrationEmailInput"
        type="email"
        ariaInvalid={!validEmail}
        autoComplete="off"
        label="Email"
        name="email"
        value={email}
        ref={emailRef}
        inputContainerClassName={styles.formInputContainers}
        inputClassName={styles.formInputs}
        labelClassName={`${email ? styles.shrink : ""} ${styles.formLabels}`}
        required
        handleChange={handleInputChange}
        handleFocus={handleEmailFocus}
        handleExit={handleEmailExit}
      />

      <FormInput
        id="registrationPasswordInput"
        type="password"
        ariaInvalid={!validPwd}
        ariaDescribedBy="pwdnote"
        label="Password"
        name="password"
        value={pwd}
        inputContainerClassName={styles.formInputContainers}
        inputClassName={styles.formInputs}
        labelClassName={`${pwd ? styles.shrink : ""} ${styles.formLabels}`}
        required
        handleChange={handleInputChange}
        handleFocus={handlePasswordFocus}
        handleExit={handlePasswordExit}
      />

      <div
        className={
          pwdFocus && !validPwd ? styles.instruction : styles.offscreen
        }
      >
        <p id="pwdnote">
          <Icons type="info-circle" />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number, and a special
          character.
          <br />
          <span>
            Allowed special characters:{" "}
            <span aria-label="exclamation-mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </span>
        </p>
      </div>

      <FormInput
        id="registrationMatchPasswordInput"
        type="password"
        ariaInvalid={!validMatch}
        ariaDescribedBy="pwdconfirmnote"
        label="Confirm Password"
        name="passwordMatch"
        value={matchPwd}
        inputContainerClassName={styles.formInputContainers}
        inputClassName={styles.formInputs}
        labelClassName={`${matchPwd ? styles.shrink : ""} ${styles.formLabels}`}
        required
        handleChange={handleInputChange}
        handleFocus={handleMatchPasswordFocus}
        handleExit={handleMatchPasswordExit}
      />

      <div
        className={
          matchFocus && !validMatch ? styles.instruction : styles.offscreen
        }
      >
        <p id="pwdconfirmnote">
          <Icons type="info-circle" /> Must match the first password input.
        </p>
      </div>

      <FormInput
        id="trustDeviceCheckbox"
        type="checkbox"
        label="Trust This Device"
        checked={persist}
        labelClassName={styles.trustDeviceLabel}
        inputClassName={styles.trustDeviceInput}
        inputContainerClassName={styles.trustDeviceInputContainer}
        handleChange={togglePersist}
      />

      <CallToActionButton className={styles.submitFormButton} disabled={!validEmail || !validPwd || !validMatch}>
        Register
      </CallToActionButton>

      <footer>
        <p>
          By creating an account, you agree to Mt. Zion World Outreach{" "}
          <Link className={styles.terms} href="/privacypolicy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className={styles.terms} href="/termsofuse">
            Terms of Use
          </Link>
          .
        </p>
      </footer>
    </form>
  );
}
