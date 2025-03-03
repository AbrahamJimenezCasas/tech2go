import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Loader = () => {
    return (
        <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="mt-10 w-full text-electric-violet-800 text-5xl"
        />
    );
};
