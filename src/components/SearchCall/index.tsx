import React from "react";
import "./styles.less";

type SearchCallProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export const SearchCall = ({ onChange, ...rest }: SearchCallProps) => {
  return (
    <div className="search_container">
      <input
        onChange={onChange}
        {...rest}
        className="search__input"
        type="text"
        placeholder="Buscar por categoria o posición"
      ></input>
    </div>
  );
};
