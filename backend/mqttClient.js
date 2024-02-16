const mqtt = require("mqtt");

function startMqttClient() {
  const host = "eu1.cloud.thethings.network";
  const port = "8883"; // Utiliser TLS
  const username = "localisationindoor@ttn";
  const password =
    "NNSXS.VRRIQCRIYGKIDUXD5G5ZNIJMVV2LWAOCXQXY7JQ.DETEFNI5CKDDN3BVS3CM5DQLUE5ALW3DUNLRNCCZJJGNYTVD4WZQ";

  const url = `mqtts://${host}:${port}`;
  const options = {
    connectTimeout: 4000,
    username: username,
    password: password,
    keepalive: 60,
    clean: true,
    rejectUnauthorized: false,
  };

  const client = mqtt.connect(url, options);

  client.on("connect", () => {
    console.log("Connecté au serveur MQTT de TTS");
    const topic = "+/devices/+/up";
    client.subscribe(topic, () => {
      console.log(`Abonné au topic: ${topic}`);
    });
  });

  client.on("message", (topic, message) => {
    console.log(`Message reçu sur le topic ${topic}:`, message.toString());

    // Convertir le message en JSON si nécessaire
    try {
      const jsonMessage = JSON.parse(message.toString());
      console.log("Données JSON:", jsonMessage);
    } catch (e) {
      console.error("Erreur lors de la conversion du message en JSON:", e);
    }

    // Ici, vous pouvez également traiter les données comme nécessaire
  });
}

module.exports = startMqttClient;
