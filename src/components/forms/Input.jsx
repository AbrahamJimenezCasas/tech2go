export const Input = ({ label, type, name, errors, register }) => {
    return (
        <label className="w-full font-body">
            <span className="ml-2 font-bold text-electric-violet-950">
                {label}
            </span>
            <div className="mt-2">
                <input
                    type={type}
                    name={name}
                    placeholder={label}
                    autoComplete={`new-${name}`}
                    {...register(`${name}`)}
                    className="p-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                />
            </div>
            <span className="mt-1 font-light text-red-600">
                {errors[name] && errors[name].message}
            </span>
        </label>
    );
};
