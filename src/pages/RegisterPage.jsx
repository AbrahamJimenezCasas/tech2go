import { RegisterForm } from "../components/forms/RegisterForm.jsx";

export const RegisterPage = () => {
    return (
        <section className="flex flex-col items-center p-6 lg:px-32 2xl:px-40 lg:py-8 min-h-[calc(100svh-5rem)]">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Regístrate
            </h2>
            <RegisterForm />
        </section>
    );
};
