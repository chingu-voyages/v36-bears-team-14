import React from "react";

interface IModalContainerProps {
  children?: JSX.Element | JSX.Element[];
  onClickAway: () => void;
}

function ModalContainer(props: IModalContainerProps) {
  const handleClickAway = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    props.onClickAway();
  };
  return (
    <div className="MenuModal" onClick={handleClickAway}>
      {props.children}
    </div>
  );
}

export default ModalContainer;
