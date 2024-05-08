import { useEffect } from "react";
const DisplayData = ({ setIndividuals, rootDataType, data, depth = 0 }) => {
    const boldnessClasses = [
        'font-extrabold', // root level
        'font-semibold',  // first nested level
        'font-normal',    // second nested level
        'font-light'      // third nested level or deeper
    ];

    const textClass = boldnessClasses[Math.min(depth, boldnessClasses.length - 1)];

    useEffect(() => {
        if (data && data['individuals'] && data['individuals'].length > 0) {
            const arr = [];
            for (const indiv of data['individuals']) {
                arr.push(JSON.stringify({'id':indiv.id, 'name': (indiv.first_name + ' ' + indiv.last_name)}));
            }
            setIndividuals(arr);
        }
    }, [rootDataType,data]);

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
                            {key}: {value ? String(value) : null}
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default DisplayData;
