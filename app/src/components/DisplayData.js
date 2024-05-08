const DisplayData = ({ data, depth = 0 }) => {
    const boldnessClasses = [
        'font-extrabold', // root level
        'font-semibold',      // first nested level
        'font-normal',  // second nested level
        'font-light'     // third nested level or deeper
    ];

    const textClass = boldnessClasses[Math.min(depth, boldnessClasses.length - 1)];

    return (
        <div>
            {Object.entries(data).map(([key, value]) => {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    // Recursive case for objects
                    return (
                        <div key={key} className={`ml-${depth * 4}`}>
                            <div className={`${textClass} mb-2`}>{key}:</div>
                            <DisplayData data={value} depth={depth + 1} />
                        </div>
                    );
                } else if (Array.isArray(value)) {
                    // Recursive case for arrays
                    return (
                        <div key={key} className={`ml-${depth * 4}`}>
                            <div className={`${textClass} mb-2`}>{key}:</div>
                            {value.map((item, index) => (
                                <DisplayData key={index} data={item} depth={depth + 1} />
                            ))}
                        </div>
                    );
                } else {
                    // Base case for simple values
                    return (
                        <div key={key} className={`${textClass} mb-2`}>
                            {key}: {String(value)}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default DisplayData;