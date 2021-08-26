import React from "react";
import "./styles.less";

type SearchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string | undefined
};

export const Search = ({ onChange, placeholder, ...rest }: SearchProps) => {
  return (
    <div className="search_container">
      <input
        onChange={onChange}
        {...rest}
        className="search__input"
        type="text"
        placeholder={placeholder}
      ></input>
    </div>
  );
};
