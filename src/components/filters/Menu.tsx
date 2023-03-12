import React from "react";
import { FilterProps } from "../../features/filter/types";

import style from "./menu.module.scss";

const Menu: React.FC<FilterProps> = ({
  activeValue,
  handleClick,
  valuesList,
}) => {
  return (
    <div className={style.menu}>
      <ul>
        {valuesList.map((obj) => (
          <li
            key={obj.name}
            className={obj.name === activeValue.name ? style.active : ""}
            onClick={() => handleClick(obj)}
          >
            {obj.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
