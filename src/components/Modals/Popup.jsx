import React from "react";
import style from "./popup.module.css";

const Popup = ({ message, onAccept, onClose, component }) => {
  return (
    <div className={style.popupContainer}>
      <div className={style.popup}>
        <h2 className={style.popupTitle}>Mensaje</h2>
        <p className={style.popupMessage}>{message}</p>
        {component == "cycleEdit" ? (
          <>
            <button className={style.successButton} onClick={onAccept}>
              Aceptar
            </button>
            <button className={style.cancelButton} onClick={onClose}>
              Cancelar
            </button>
          </>
        ) : (
          <button className={style.closeButton} onClick={onClose}>
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
