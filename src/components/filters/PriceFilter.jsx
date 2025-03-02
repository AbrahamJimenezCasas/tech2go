import { useCallback, useEffect, useState, useRef } from "react";

export const PriceFilter = ({ min, max, handleMinChange, handleMaxChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return (
        <div className="flex mt-4 pb-8 place-center">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(
                        Number(event.target.value),
                        maxVal - 1
                    );
                    setMinVal(value);
                    minValRef.current = value;

                    handleMinChange(event);
                }}
                className="z-10 absolute outline-0 w-[200px] h-0 appearance-none pointer-events-none thumb"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(
                        Number(event.target.value),
                        minVal + 1
                    );
                    setMaxVal(value);
                    maxValRef.current = value;

                    handleMaxChange(event);
                }}
                className="z-20 absolute outline-0 w-[200px] h-0 appearance-none pointer-events-none thumb"
            />

            <div className="relative w-[200px]">
                <div className="absolute bg-electric-violet-200 rounded-2xl w-full h-2" />
                <div
                    ref={range}
                    className="absolute bg-electric-violet-400 rounded-2xl w-full h-2"
                />
                <div className="absolute mt-2 text-electric-violet-950 text-sm">
                    {minVal}€
                </div>
                <div className="right-0 absolute mt-2 text-electric-violet-950 text-sm">
                    {maxVal}€
                </div>
            </div>
        </div>
    );
};
