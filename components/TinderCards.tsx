import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import CustomPDFViewer from './CustomPDFViewer';

interface Person {
    name: string;
    pdfUrl: string;
}

const TinderCards: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([
        { name: 'Not all doped Mott insulators have a pseudogap: key role of van Hove singularities', pdfUrl: 'https://arxiv.org/pdf/2302.07459.pdf' },
        { name: 'Not all doped Mott insulators have a pseudogap: key role of van Hove singularities', pdfUrl: 'https://arxiv.org/pdf/2001.00019.pdf' },
        { name: 'Not all doped Mott insulators have a pseudogap: key role of van Hove singularities', pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf' },
        { name: 'Not all doped Mott insulators have a pseudogap: key role of van Hove singularities', pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf' },
        { name: 'Not all doped Mott insulators have a pseudogap: key role of van Hove singularities', pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf' },
    ]);

    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction);
    };

    const onCardLeftScreen = (name: string) => {
        console.log(name + ' left the screen');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative w-[300px] h-[80vh]">
                {people.map((person, index) => (
                    <TinderCard
                        key={person.name}
                        onSwipe={onSwipe}
                        onCardLeftScreen={() => onCardLeftScreen(person.name)}
                        preventSwipe={['up', 'down']}
                        className="absolute w-full h-full"
                    >
                        <div className="w-full h-full rounded-[20px] bg-white  overflow-hidden">
                            <div className="flex items-start justify-center overflow-y-auto h-full">
                                <CustomPDFViewer pdfUrls={[person.pdfUrl]} />
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
};

export default TinderCards;
