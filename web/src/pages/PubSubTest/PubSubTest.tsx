import React, { useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react';
import * as Portals from '@ionic/portals';


const PubSubTest = () => {
  const [topic, setTopic] = useState('sayHi');
  const portalsSubscription = useRef<any | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [messageFromApp, setMessageFromApp] = useState<any>();

  const subscribe = async () => {
    const portalSubscription = await Portals.subscribe(topic,
      (result) => {
        setMessageFromApp(result);
      }
    );
    portalsSubscription.current = portalSubscription;
  };

  const publish = async () => {
    setMessageFromApp('');
    Portals.publish({
      topic,
      data: { message },
    });
  };

  return (
    <IonPage id="help-page">
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Topic</IonLabel>
            <IonInput
              value={topic}
              onIonChange={(e) => setTopic(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Message</IonLabel>
            <IonInput
              value={message}
              onIonChange={(e) => setMessage(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={subscribe}>
          Subscribe
        </IonButton>
        <IonButton expand="block" onClick={publish}>
          Publish
        </IonButton>
        portalSubscription: <br />
        {JSON.stringify(portalsSubscription)}
        <br /><br />
        messageFromApp: <br />
        {JSON.stringify(messageFromApp)}
      </IonContent>
    </IonPage>
  );
};

export default PubSubTest;
