import React, { useState } from 'react';
import axios from 'axios';
import FormComponent from './components/FormComponent';
import WordTable from './components/WordTable';
import WordCloudComponent from './components/WordCloudComponent';
import PDFDownloadButton from './components/PDFDownloadButton';
import './App.css';

function App() {
    const [url, setUrl] = useState('');
    const [n, setN] = useState(10);
    const [words, setWords] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/analyze', { url, n });
            setWords(response.data);
        } catch (err) {
            setError('Error analyzing the URL. Please make sure it is valid.');
        }
    };

    return (
        <div className="App">
            {error && <div className="error-message">{error}</div>}
            <h1>Top Word Frequency Analyzer</h1>
            <FormComponent url={url} setUrl={setUrl} n={n} setN={setN} handleSubmit={handleSubmit} />
            
            {words.length > 0 && (
                <div>
                <div id="report-content">
                    <WordTable words={words} />
                    <WordCloudComponent words={words} />               
                </div>
                <div className="button-container">
                <PDFDownloadButton elementId="report-content" />
                </div>
                </div>
            )}
        </div>
    );
}

export default App;
