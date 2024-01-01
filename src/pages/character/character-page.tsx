import { Tour } from "antd";
import { useRef } from "react";
import { useAtom } from "jotai";

import { CharacterForm } from "../../widgets/character-form/character-form";
import { CharacterControls } from "../../widgets/character-controls/character-controls";
import { getTourSteps } from "./utils";
import { openTourAtom } from "../../app/atoms";
import "./styles.css";

export const CharacterPage = () => {
  const [openTour, setOpenTour] = useAtom(openTourAtom);

  const localStorageButtonRef = useRef(null);
  const dbButtonRef = useRef(null);
  const checkboxRef = useRef(null);

  const toggleOpenTour = () => {
    setOpenTour(false);
  };

  return (
    <div className="containers">
      <div className="form-container">
        <CharacterForm />
      </div>
      <div className="cntrls">
        <CharacterControls
          checkboxRef={checkboxRef}
          localStorageButtonRef={localStorageButtonRef}
          dbButtonRef={dbButtonRef}
        />
      </div>

      <Tour
        open={openTour}
        onClose={toggleOpenTour}
        steps={getTourSteps(localStorageButtonRef, dbButtonRef, checkboxRef)}
      />
    </div>
  );
};
