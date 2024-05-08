const DisplayData = ({ data, depth = 0 }) => {
    const boldnessClasses = [
        'font-extrabold', // root level
        'font-semibold',  // first nested level
        'font-normal',    // second nested level
        'font-light'      // third nested level or deeper
    ];

    const textClass = boldnessClasses[Math.min(depth, boldnessClasses.length - 1)];

    return (
        <ul style={{ paddingLeft: `${depth * 20}px`, listStyleType: 'none' }}>
            {Object.entries(data).map(([key, value]) => {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    // Recursive case for objects
                    return (
                        <li key={key}>
                            <div className={`${textClass}`}>{key}:</div>
                            <DisplayData data={value} depth={depth + 1} />
                        </li>
                    );
                } else if (Array.isArray(value)) {
                    // Recursive case for arrays
                    return (
                        <li key={key}>
                            <div className={`${textClass}`}>{key}:</div>
                            {value.map((item, index) => (
                                <DisplayData key={index} data={item} depth={depth + 1} />
                            ))}
                        </li>
                    );
                } else {
                    // Base case for simple values
                    return (
                        <li key={key} className={`${textClass}`}>
                            {key}: {String(value)}
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default DisplayData;
