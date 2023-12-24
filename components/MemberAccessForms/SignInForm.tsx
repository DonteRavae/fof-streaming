"use client";

// REACT
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
// NEXTJS
import Link from "next/link";
import { redirect } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import signIn from "@/actions/SignIn.action";
import FormInput from "../FormInput/FormInput";
import { EMAIL_VALIDATION } from "@/utils/constants";
import CallToActionButton from "../CallToActionButton/CallToActionButton";
// STYLES
import styles from "./index.module.scss";

export default function SignInForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const [email, setEmail] = useState<string>("");
  const [, setEmailFocus] = useState<boolean>(false);
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const { loginUser, persist, persistUser } = useAuth();

  // Focus email input on load
  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  // Update persist value in localstorage
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  // Reset error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, setErrMsg]);

  // HANDLERS
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPwd(event.currentTarget.value);
  };

  const handleEmailFocus = () => setEmailFocus(true);

  const handleEmailExit = () => setEmailFocus(false);

  const togglePersist = () => persistUser(!persist);

  const onSignIn = async (formData: FormData) => {
    const res = await signIn(formData);
    if (res.ok) {
      loginUser(res.data.payload!);
      redirect("/profiles/select");
    }

    setErrMsg(res.data.message as string);
  };

  return (
    <form className={styles.formContainer} action={onSignIn}>
      <header>
        <h2>Welcome back!</h2>
        <p className={styles.signUpLink}>
          New around here? <Link href="/access/signup">Sign up now</Link>.
        </p>

        <p
          ref={errorRef}
          className={`${errMsg ? styles.errorMessage : styles.offscreen}`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </header>
      <FormInput
        id="loginEmailInput"
        ref={emailRef}
        required
        autoComplete="off"
        label="Email"
        name="email"
        labelClassName={`${email ? styles.shrink : ""} ${styles.formLabels}`}
        inputClassName={styles.formInputs}
        inputContainerClassName={styles.formInputContainers}
        handleChange={handleEmailChange}
        handleFocus={handleEmailFocus}
        handleExit={handleEmailExit}
      />

      <FormInput
        id="loginPasswordInput"
        type="password"
        required
        label="Password"
        name="password"
        labelClassName={`${pwd ? styles.shrink : ""} ${styles.formLabels}`}
        inputClassName={styles.formInputs}
        inputContainerClassName={styles.formInputContainers}
        handleChange={handlePasswordChange}
      />

      <FormInput
        id="trustDeviceCheckbox"
        type="checkbox"
        label="Remember Me"
        checked={persist}
        labelClassName={styles.trustDeviceLabel}
        inputClassName={styles.trustDeviceInput}
        inputContainerClassName={styles.trustDeviceInputContainer}
        handleChange={togglePersist}
      />

      <CallToActionButton
        className={styles.submitFormButton}
        disabled={!EMAIL_VALIDATION.test(email) || !pwd}
      >
        Sign In
      </CallToActionButton>

      <footer>
        <Link className={styles.forgotPassword} href="/help/forgot-password">
          Forgot Password?
        </Link>
        <p>
          By logging in, you agree to Mt. Zion World Outreach{" "}
          <Link className={styles.terms} href="/legal/privacy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className={styles.terms} href="/legal/terms">
            Terms of Use
          </Link>
          .
        </p>
      </footer>
    </form>
  );
}
