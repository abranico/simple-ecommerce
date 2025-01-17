import { Input } from "@/components";

const Register = () => {
  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="text-center text-4xl">Sign Up</h1>
      <form className="mt-5">
        <Input placeholder="Email" />
      </form>
    </section>
  );
};

export default Register;
