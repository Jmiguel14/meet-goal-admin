import React from "react";
import "./styles.less";

type SearchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export const Search = ({ onChange, ...rest }: SearchProps) => {
  return (
    <div className="search_container">
      <input
        onChange={onChange}
        {...rest}
        className="search__input"
        type="text"
        placeholder="Buscar por nombre o posición"
      ></input>
    </div>
  );
};
