import React from "react";
import { View, Text, Button, Platform } from "react-native";
import { useSelector } from "react-redux";

const Lesson = ({ route, navigation }) => {
  const { id } = route.params;
  const { list: lessons } = useSelector((state) => state.lessons);

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return <Text>Lesson not found</Text>;
  }

  // convert a normal YouTube watch URL into an embeddable URL
  function getEmbedUrl(url) {
  const match = url.match(/[?&]v=([^&]+)/);

  if (!match) return "";

  return `https://www.youtube.com/embed/${match[1]}`;
}

  const embedUrl = getEmbedUrl(lesson.videoUrl);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text>{lesson.title}</Text>

      <View style={{ height: 220 }}>
        {Platform.OS === "web" ? (
          <iframe
            src={embedUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <WebViewComponent uri={embedUrl} />
        )}
      </View>

      <Text>{lesson.description}</Text>
      <Text>{lesson.content}</Text>
    </View>
  );
};

// only import/require WebView when actually on native, so web bundling doesn't choke on it
function WebViewComponent({ uri }) {
  const { WebView } = require("react-native-webview");
  return <WebView source={{ uri }} />;
}

export default Lesson;
