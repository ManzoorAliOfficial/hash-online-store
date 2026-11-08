import AccountWrapper from "../components/Auth/AccountWrapper";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AccountWrapper mode="forgot">
      <ForgotPasswordForm />
    </AccountWrapper>
  );
}
