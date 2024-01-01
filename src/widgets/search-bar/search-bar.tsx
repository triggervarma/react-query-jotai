import { ChangeEvent } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";

import { fetchingAtom, queryAtom } from "../../app/atoms";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useAtom(queryAtom);
  const [isFetching] = useAtom(fetchingAtom);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Input
      onChange={handleChangeInput}
      placeholder="Search"
      value={searchQuery}
      suffix={
        <>
          {isFetching && <Spin size="small" />}
          <SearchOutlined />
        </>
      }
    />
  );
};
