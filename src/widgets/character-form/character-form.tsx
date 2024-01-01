import { ChangeEvent, useEffect, useMemo } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";

import { useGetCharacterById } from "../../entities/character/api/useGetCharacterById";
import { useGetPlanets } from "../../entities/planet/api/useGetPlanets";
import { useGetFilms } from "../../entities/film/api/useGetFilms";
import { useAtom, useSetAtom } from "jotai";
import {
  characterAtom,
  localCharacterAtom,
  openTourAtom,
  tourShowAtom,
} from "../../app/atoms";
import { Spinner } from "../../shared/spinner/spinner";
import { formatDate } from "../../app/utils/format-date";
import "./styles.css";

export const CharacterForm = () => {
  const [character, setCharacter] = useAtom(characterAtom);
  const [tourShown, setTourShown] = useAtom(tourShowAtom);
  const setLocalCharacter = useSetAtom(localCharacterAtom);
  const setOpenTour = useSetAtom(openTourAtom);
  const { id } = useParams();

  const { data: characterData, isLoading: isCharacterLoading } =
    useGetCharacterById(id);
  const { data: planetsData, isLoading: isPlanetsLoading } = useGetPlanets();
  const { data: filmsData, isLoading: isFilmsLoading } = useGetFilms();

  useEffect(() => {
    if (characterData) {
      setCharacter(characterData);
    }
  }, [characterData, setCharacter]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const planetOptions = useMemo(
    () =>
      planetsData?.results?.map((planet) => ({
        label: planet.name,
        value: planet.url,
      })),
    [planetsData]
  );

  const filmOptions = useMemo(
    () =>
      filmsData?.results?.map((film) => ({
        label: film.title,
        value: film.url,
      })),
    [filmsData]
  );

  console.log("tourShown", tourShown);
  const handleSubmitForm = () => {
    setLocalCharacter(character);
    if (!tourShown) {
      setOpenTour(true);
      setTourShown(true);
    }
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={handleSubmitForm}
      className="form"
    >
      <Spinner show={isCharacterLoading} />

      <Form.Item label="Name">
        <Input value={character?.name} name="name" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Height">
        <Input
          value={character?.height}
          name="height"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Hair Color">
        <Input
          value={character?.hair_color}
          name="hair_color"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Skin Color">
        <Input
          value={character?.skin_color}
          name="skin_color"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Eye Color">
        <Input
          value={character?.eye_color}
          name="eye_color"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Birth Year">
        <Input
          value={character?.birth_year}
          name="birth_year"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Gender">
        <Input
          value={character?.gender}
          name="gender"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Created">
        <Input value={formatDate(character?.created)} disabled />
      </Form.Item>

      <Form.Item label="Planet">
        <Select
          value={isPlanetsLoading ? "" : character.homeworld}
          options={planetOptions}
          onChange={(e) =>
            setCharacter((prev) => ({
              ...prev,
              homeworld: e,
            }))
          }
          loading={isPlanetsLoading || isCharacterLoading}
        />
      </Form.Item>
      <Form.Item label="Films">
        <Select
          value={isFilmsLoading ? [] : character.films}
          mode="multiple"
          options={filmOptions}
          onChange={(e) =>
            setCharacter((prev) => ({
              ...prev,
              films: e as string[],
            }))
          }
          loading={isFilmsLoading || isCharacterLoading}
        />
      </Form.Item>
      <Form.Item className="controlsbtns">
        <Button type="primary" htmlType="submit" className="btn">
          Save
        </Button>
        <Button type="default" className="btn">
          <Link to="/" className="link">
            Back
          </Link>
        </Button>
      </Form.Item>
    </Form>
  );
};
