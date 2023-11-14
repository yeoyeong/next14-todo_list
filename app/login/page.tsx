import Link from "next/link";
import LoginForm from "./(ui)/login-form";

const page = () => {
  return (
    <div>
      <LoginForm />
      <Link className="block w-full text-right" href="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default page;
