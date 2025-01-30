import { Header } from '@/widgets/header';
import { CharacterTable } from '@/widgets/character-table';

const HomePage = () => {
  return (
    <div className="bg-primary h-[100vh] w-full overflow-y-scroll">
      <Header />
      <div className="p-[20px]">
        <h1 className="text-accent pb-10 text-center text-4xl font-bold">
          Characters
        </h1>
        <CharacterTable />
      </div>
    </div>
  );
};

export { HomePage };
