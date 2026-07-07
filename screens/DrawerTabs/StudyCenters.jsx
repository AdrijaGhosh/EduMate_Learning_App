import React from "react";
  import { View, Text, StyleSheet, Platform } from "react-native";

  const StudyCenters = () => {
    if (Platform.OS === "web") {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Nearby Study Centers</Text>

          <iframe
            title="Google Maps"
            width="100%"
            height="600"
            style={{
              border: 0,
              borderRadius: 15,
            }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=study+centers+near+me&output=embed"
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Maps are only available on Web in this example.</Text>
      </View>
    );
  };

  export default StudyCenters;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f8fafc",
    },

    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#2563eb",
      marginBottom: 20,
      textAlign: "center",
    },
  });