export const ImageInput = (props) => {
    const { label, name, errors, handleClick, handleChange, preview } = props;
    const error = errors?.[name];
    return (
        <label className={error ? "label-error" : ""}>
            <div className="input-container">
                <input
                    type="file"
                    name={name}
                    autoComplete={`new-${name}`}
                    accept="image/*"
                    onClick={handleClick}
                    onChange={handleChange}
                    className="hidden"
                />
                {preview ? (
                    <img
                        src={preview}
                        alt="preview"
                        className="rounded-2xl w-20 h-20 object-cover cursor-pointer"
                    />
                ) : (
                    <img
                        src="/imgs/no-img-available.png"
                        alt="Image Input"
                        className="rounded-2xl w-20 h-20 object-cover cursor-pointer"
                    />
                )}
            </div>
        </label>
    );
};
