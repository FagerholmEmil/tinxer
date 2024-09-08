import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

interface Person {
  name: string;
  url: string;
}

const TinderCards: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([
    { name: 'Elon Musk', url: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2024-07/240716-Elon-Musk-ch-1125-69ea28.jpg' },
    { name: 'Elon Musk', url: 'https://assets-us-01.kc-usercontent.com/5cb25086-82d2-4c89-94f0-8450813a0fd3/0c3fcefb-bc28-4af6-985e-0c3b499ae832/Elon_Musk_Royal_Society.jpg?fm=jpg&auto=format' },
    { name: 'Elon Musk', url: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982181284/elon-musk-9781982181284_hr.jpg' },
  ]);

  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (name: string) => {
    console.log(name + ' left the screen');
  };

  return (
    <div className="flex items-center justify-center">
      {people.map((person) => (
        <TinderCard
          key={person.name}
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen(person.name)}
          preventSwipe={['up', 'down']}
        >
          <div
            style={{ backgroundImage: `url(${person.url})` }}
            className="absolute w-[600px] p-5 max-w-[85vw] h-[50vh] rounded-[20px] bg-cover bg-center shadow-[0px_18px_53px_0px_rgba(0,0,0,0.3)]"
          >
            <h3 className="absolute bottom-[10px] text-white">{person.name}</h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default TinderCards;
