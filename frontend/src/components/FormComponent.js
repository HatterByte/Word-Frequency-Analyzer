import React from 'react';

const FormComponent = ({ url, setUrl, n, setN, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a URL"
            />
            <input
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="Top N words"
                min="1"
                max="50"
            />
            <button type="submit">Analyze</button>
        </form>
    );
};

export default FormComponent;
