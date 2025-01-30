import { Form } from '@/shared/ui/form';
import { Toast } from '@/shared/ui/toast';
import { useCharacterStore } from '@/entities/character/model';
import { useEffect, useRef, useState } from 'react';
import { Character } from '@/entities/character';

export const CharacterForm = ({ name }: { name: string }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [open, setOpen] = useState(false);
  const { list, setList } = useCharacterStore((state) => state);
  const timerRef = useRef(0);

  useEffect(() => {
    if (list.length) {
      const newCharacter = list.find((item) => item.name === name);
      setCharacter({ ...newCharacter });
    }
  }, [list, name]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event?.target;
    setCharacter({ ...character, [key]: value });
  };

  const handleSave = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const newList = [...list];
    const index = newList.findIndex((item) => item.name === name);
    if (index !== -1) {
      newList[index] = { ...newList[index], ...character };
      setList([...newList]);
    }

    setOpen(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 100);
  };
  return (
    <>
      <Form.Root
        className="bg-secondary flex w-full max-w-[600px] flex-col gap-10
          rounded-xl p-10"
      >
        <div className="grid grid-cols-2 gap-5">
          {character &&
            Object.entries(character).map(([key, value]) => (
              <Form.Field
                name={key}
                key={key}
                className="bg-secondary flex w-full flex-col gap-1.5"
              >
                <Form.Label
                  className="text-base leading-none font-semibold
                    tracking-tight"
                >
                  {key}
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    value={value}
                    className="ease w-full rounded-md border border-slate-200
                      bg-transparent px-3 py-2 text-base text-sm shadow-sm
                      transition duration-300 placeholder:text-slate-400
                      hover:border-slate-300 focus:border-slate-400 focus:shadow
                      focus:outline-none"
                    onChange={(event) => handleChange(event, key)}
                  />
                </Form.Control>
              </Form.Field>
            ))}
        </div>
        <Form.Submit
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <button
            type="button"
            className="bg-tertiary hover:bg-secondary ml-2 cursor-pointer
              rounded-md border border-transparent px-4 py-2 text-center
              text-base text-sm shadow-md transition-all hover:shadow-lg
              focus:bg-slate-700 focus:shadow-none active:bg-slate-700
              active:shadow-none disabled:pointer-events-none
              disabled:opacity-50 disabled:shadow-none"
            onClick={handleSave}
          >
            Save
          </button>
        </Form.Submit>
      </Form.Root>
      <Toast.Root
        open={open}
        className="bg-tertiary hover:bg-secondary mb-2 ml-2 w-fit cursor-pointer
          rounded-md border border-transparent px-4 py-2 text-center text-base
          text-sm shadow-md transition-all hover:shadow-lg focus:bg-slate-700
          focus:shadow-none active:bg-slate-700 active:shadow-none
          disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <Toast.Action altText="Data saved!">Data saved!</Toast.Action>
        <Toast.Close />
      </Toast.Root>
    </>
  );
};
