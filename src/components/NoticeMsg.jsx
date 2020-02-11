import React from "react";
import { IonAlert, IonPage } from "@ionic/react";

const NoticeMsg = ({ header, msg, button, isDisplayed }) => {
  return (
    <IonPage>
      <IonAlert
        isOpen={isDisplayed}
        header={header}
        message={msg}
        buttons={[button]}
      ></IonAlert>
    </IonPage>
  );
};

export default NoticeMsg;
