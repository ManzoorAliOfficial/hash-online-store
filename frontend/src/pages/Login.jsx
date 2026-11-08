import AccountWrapper from "../components/Auth/AccountWrapper";
import LoginForm from "../components/Auth/LoginForm";

export default function Login() {
  return (
    <AccountWrapper mode="login">
      <LoginForm />
    </AccountWrapper>
  );
}
