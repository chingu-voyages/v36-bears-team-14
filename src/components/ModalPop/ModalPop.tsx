import { EModalPopType } from "./types";
import "./modal-pop-style.css";
import Button from "../Button";
import { EButtonType } from "../Button/Button";
import SuccessIcon from "./success-icon.svg";
import ErrorIcon from "./error-icon.svg";

interface IModalPopProps {
  customClassNames?: string;
  type: EModalPopType;
  text: string;
  onDismiss: () => void;
}

function ModalPop(props: IModalPopProps) {
  const handleDismiss = () => {
    props.onDismiss();
  };
  return (
    <div
      className={`ModalPop__Main white-background pop-up-responsive-window ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <div className={`ModalPop__Body`}>
        <div className={`ModalPop__body__text-group flex`}>
          <img
            className={`PopIcon right-margin-1rem icon-smaller`}
            src={props.type === EModalPopType.Error ? ErrorIcon : SuccessIcon}
            alt="status"
          />
          <div className={`ModalPop__Body__text`}>{props.text}</div>
        </div>
        <div className={`ModalPop__Body__controls_section flex-container`}>
          <Button
            type={EButtonType.Normal}
            text="Dismiss"
            customClassNames="square thin-black-border generic-padding"
            onClick={handleDismiss}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalPop;
