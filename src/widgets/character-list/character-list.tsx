import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useDebounce } from "use-debounce";
import { Empty, Pagination } from "antd";

import { CharacterCard } from "../character-card/character-card";
import { useGetCharacters } from "../../entities/character/api/useGetCharacters";
import { SkeletonList } from "./components/skeleton-list/skeleton-list";
import { currentPageAtom, fetchingAtom, queryAtom } from "../../app/atoms";
import { itemsOnPage } from "./constants";
import "./styles.css";

export const CharacterList = () => {
  const [query] = useAtom(queryAtom);
  const [value] = useDebounce(query, 400);
  const [page, setPage] = useAtom(currentPageAtom);
  const setFetching = useSetAtom(fetchingAtom);

  const { isLoading, data, isFetching } = useGetCharacters(value, page);

  const characters = data?.results || [];
  const count = data?.count;

  const showEmptyTable = !isLoading && !isFetching && characters.length === 0;
  const showPagination = !isLoading;
  const showSkeleton = isLoading;

  useEffect(() => {
    setPage(1);
  }, [query, setPage]);

  useEffect(() => {
    setFetching(isFetching);
  }, [isFetching, setFetching]);

  if (showEmptyTable) {
    return <Empty />;
  }
  return (
    <div className="container">
      <div className="list">
        {showSkeleton ? (
          <SkeletonList />
        ) : (
          <>
            {characters.map((character, index) => (
              <CharacterCard key={index} character={character} />
            ))}
          </>
        )}
      </div>
      {showPagination && (
        <Pagination
          className="pagination"
          pageSize={itemsOnPage}
          current={page}
          onChange={(p) => setPage(p)}
          total={count}
          showSizeChanger={false}
        />
      )}
    </div>
  );
};
