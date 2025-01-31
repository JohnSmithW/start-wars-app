import { Header } from '@/widgets/header';
import { Toast } from '@/shared/ui/toast';
import { useParams } from 'react-router-dom';
import { CharacterForm } from './character-form';
import { useCharacterStore } from '@/entities/character';
import { useEffect, useState } from 'react';

const CharacterPage = () => {
  const { url } = useParams();

  const [characterName, setCharacterName] = useState('');
  const { list } = useCharacterStore((state) => state);
  useEffect(() => {
    if (list.length) {
      const newCharacter = list.find((item) => item.url === url);
      setCharacterName(newCharacter?.name || '');
    }
  }, [list, url]);

  return (
    <div className="bg-primary h-[100vh] w-full overflow-y-scroll">
      <Header />
      <div className="flex flex-col items-center p-[20px]">
        <h1 className="text-accent pb-10 text-center text-4xl font-bold">
          {characterName}
        </h1>
        <CharacterForm url={url || ''} />
      </div>
      <Toast.Viewport className="fixed right-2 bottom-2" />
    </div>
  );
};

export { CharacterPage };
