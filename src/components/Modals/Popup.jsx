import React from "react";
import style from "./popup.module.css";

const Popup = ({ message, onClose }) => {
  return (
    <div className={style.popupContainer}>
      <div className={style.popup}>
        <h2 className={style.popupTitle}>Mensaje de éxito</h2>
        <p className={style.popupMessage}>{message}</p>
        <button className={style.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Popup;
