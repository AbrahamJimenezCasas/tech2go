export const Form = ({ handleSubmit, children }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 mt-8 w-full md:w-8/12 xl:w-1/2"
        >
            {children}
        </form>
    );
};
