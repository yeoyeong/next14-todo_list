import Link from "next/link";
import LoginForm from "./(ui)/login-form";

const page = () => {
  return (
    <div>
      <LoginForm />
      <p>테스트 용</p>
      <p>[임시 이메일 - zzz@zzz.com]</p>
      <p>[비밀번호 - zxc]</p>
      <Link className="block w-full text-right" href="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default page;
