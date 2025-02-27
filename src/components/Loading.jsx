import gear from "../assets/gear-spinner.svg";

export const Loading = ({ className }) => {
    return (
        <div className="loading">
            <img
                className={className ? className : ""}
                src={gear}
                alt="Loading..."
            />
        </div>
    );
};
