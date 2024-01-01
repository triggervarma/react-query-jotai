import { Button, Checkbox, Form } from "antd";
import { FC, MutableRefObject } from "react";
import "./styles.css";
import {
  characterAtom,
  localCharacterAtom,
  tourShowAtom,
} from "../../app/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useGetCharacterById } from "../../entities/character/api/useGetCharacterById";
import { useParams } from "react-router-dom";

interface CharacterControlsProps {
  localStorageButtonRef: MutableRefObject<null>;
  dbButtonRef: MutableRefObject<null>;
  checkboxRef: MutableRefObject<null>;
}

export const CharacterControls: FC<CharacterControlsProps> = ({
  localStorageButtonRef,
  dbButtonRef,
  checkboxRef,
}) => {
  const [tourShown, setTourShown] = useAtom(tourShowAtom);
  const [localCharacter] = useAtom(localCharacterAtom);
  const setCharacter = useSetAtom(characterAtom);
  const { id } = useParams();

  const { isFetching: isCharacterFetching, refetch } = useGetCharacterById(id);

  const handleUseLocalStorageCharacter = () => {
    setCharacter(localCharacter);
  };

  const handleFetchCharacter = () => {
    refetch().then(({ data }) => {
      if (data) {
        setCharacter(data);
      }
    });
  };

  const toggleTourShown = () => {
    setTourShown((prev) => !prev);
  };

  return (
    <div className="controls">
      <div className="buttons">
        <Button
          ref={localStorageButtonRef}
          onClick={handleUseLocalStorageCharacter}
        >
          Use Local Character
        </Button>
        <Button
          ref={dbButtonRef}
          loading={isCharacterFetching}
          onClick={handleFetchCharacter}
        >
          Use Character from DB
        </Button>
      </div>
      <div ref={checkboxRef} className="checkboxContainer">
        <Form.Item label="Don't show tour again">
          <Checkbox checked={tourShown} onChange={toggleTourShown} />
        </Form.Item>
      </div>
    </div>
  );
};
