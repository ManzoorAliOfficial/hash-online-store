import AccountWrapper from "../components/Auth/AccountWrapper";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Register() {
  return (
    <AccountWrapper mode="register">
      <RegisterForm />
    </AccountWrapper>
  );
}
