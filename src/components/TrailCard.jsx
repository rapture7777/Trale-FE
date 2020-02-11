import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
import { Link } from "react-router-dom";

const TrailCard = (routeId, description, routeName, routePicture) => {
  return (
    <Link to={`/components/Map/${routeId}`}>
      <IonCard className="Trail-Card">
        <IonCardHeader onClick={() => console.log("123")}>
          <IonCardTitle>{routeName}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{description}</IonCardContent>
      </IonCard>
    </Link>
  );
};

export default TrailCard;
