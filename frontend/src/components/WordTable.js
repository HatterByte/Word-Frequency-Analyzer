import React from 'react';

const WordTable = ({ words }) => {
    return (
        <div>
            <h2>Word Frequency Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((item, index) => (
                        <tr key={index}>
                            <td>{item.word}</td>
                            <td>{item.freq}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordTable;
