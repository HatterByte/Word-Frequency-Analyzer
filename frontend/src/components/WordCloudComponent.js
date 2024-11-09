import React from 'react';
import WordCloud from 'react-wordcloud';

const WordCloudComponent = ({ words }) => {
    const wordCloudData = words.map(item => ({
        text: item.word,
        value: item.freq
    }));

    const options = {
        rotations: 1,
        rotationAngles: [0, 90],
        fontSizes: [20, 100],
    };

    return (
        <div>
        <h2>Word Cloud</h2>
        <div className="word-cloud-box">
            <WordCloud words={wordCloudData} options={options} />
        </div>
        </div>
    );
};

export default WordCloudComponent;
