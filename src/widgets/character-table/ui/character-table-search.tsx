interface ICharacterTableSearchProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterTableSearch: React.FC<ICharacterTableSearchProps> = ({
  handleChange,
}) => {
  return (
    <div className="bg-secondary w-fit rounded-md">
      <input
        type="text"
        placeholder="Search"
        className="w-full border-none bg-transparent px-4 py-1.5 text-base
          -outline-offset-1 transition-all outline-none placeholder:text-base"
        onChange={handleChange}
      />
    </div>
  );
};
