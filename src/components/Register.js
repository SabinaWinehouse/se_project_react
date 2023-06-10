import React from "react";

export default function Register(props) {
  return (
    <div class="page__auth">
      <fieldset class="auth__fieldset">
        <h3 class="auth__title">Log in</h3>
        <form name="auth__form" class="auth__form" id="authForm">
          <input
            class="auth__input-email"
            id="auth-email-input"
            name="email"
            type="email"
            placeholder="Email"
            minlength="1"
            maxlength="30"
            required
          />

          <span id="auth-email-input-error" class="auth__input-error"></span>
          <input
            class="auth__input-password"
            id="auth-password-input"
            name="password"
            type="password"
            placeholder="Password"
            minlength="1"
            maxlength="30"
            required
          />

          <span id="auth-password-input-error" class="auth__input-error"></span>
          <button class="auth__button" name="auth-submit-button" type="submit">
            Log in
          </button>
          <p class="auth__sign-up">Not a member yet? Sign up here!</p>
        </form>
      </fieldset>
    </div>
  );
}
