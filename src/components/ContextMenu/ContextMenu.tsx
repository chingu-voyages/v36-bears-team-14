import "./context-menu-style.css";

interface IContextMenuProps {
  customClassNames?: string;
  actions: {
    [keyof: string]: {
      text: string;
      customClassNames?: string;
      customTextClassNames?: string;
      onClick?: (action: string) => void;
    };
  };
}

interface IContextMenuOptionProps {
  customClassNames?: string;
  customTextClassNames?: string;
  text: string;
  onClick?: (action: string) => void;
  action: string;
}

function ContextMenuOption(props: IContextMenuOptionProps) {
  const handleOnClick = () => {
    props.onClick && props.onClick(props.action);
  };
  return (
    <div
      className={`ContextMenuOption__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
      onClick={handleOnClick}
    >
      <div
        className={`ContextMenuOption__text ${
          props.customTextClassNames ? props.customTextClassNames : ""
        }`}
      >
        {props.text}
      </div>
    </div>
  );
}

function ContextMenu(props: IContextMenuProps) {
  return (
    <div
      className={`ContextMenu__Main fade-in-animation ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      {props.actions &&
        Object.entries(props.actions).map(([key, value]) => (
          <ContextMenuOption
            customClassNames={
              value.customTextClassNames ? value.customClassNames : ""
            }
            customTextClassNames={
              value.customTextClassNames ? value.customTextClassNames : ""
            }
            text={value.text}
            onClick={value.onClick}
            action={key}
            key={`ContextMenu_${value.text}`}
          />
        ))}
    </div>
  );
}

export default ContextMenu;
