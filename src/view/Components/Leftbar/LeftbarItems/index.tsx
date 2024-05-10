import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "../styles";

import leftbarData from "../../../../data/privateRoutes";

const LeftbarItems: FC<{displaySidebar?: boolean}> = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <ItemsList>
      {leftbarData.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => setActiveItem(itemData.id)}
          className={itemData.id === activeItem ? "active" : ""}
        >
          <Link to={itemData.path}>
            <ItemWrapper>
              {itemData.icon}
              <ItemName $displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          </Link>
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default LeftbarItems;