import React, { useContext, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addProgress } from "../../store/progressSlice";
import UserContext from "../../hooks/UserContext";

const CourseDetails = ({ route, navigation }) => {
  const { courseId } = route.params;
  const { uid } = useContext(UserContext);
  const dispatch = useDispatch();
  const [enrolling, setEnrolling] = useState(false);

  const { list: courses } = useSelector((state) => state.courses);

  const course = courses.find((c) => String(c.id) === String(courseId));

  if (!course) {
    return <Text>Course not found</Text>;
  }

  async function handleEnroll() {
    setEnrolling(true);
    try {
      // Keep IDs as strings - don't cast with Number(), since generated
      // user/course IDs (e.g. from signup) are not guaranteed numeric.
      await dispatch(
        addProgress({ userId: String(uid), courseId: String(course.id) }),
      ).unwrap();
      navigation.navigate("LessonList", { courseId: course.id });
    } catch (err) {
      console.log("Enroll failed:", err);
      alert("Could not enroll: " + (err.message || JSON.stringify(err)));
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <View style={s.box}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Image source={{ uri: course.thumbnail }} style={s.img} />
      <Text style={s.title}>{course.title}</Text>
      <Text style={s.desc}>{course.description}</Text>
      <Text style={s.sub}>Instructor: {course.instructor}</Text>
      <Text style={s.sub}>Category: {course.category}</Text>
      <Text style={s.sub}>Level: {course.level}</Text>
      <Text style={s.sub}>Duration: {course.duration}</Text>
      <Text style={s.sub}>
        Rating: {course.rating} ({course.reviews} reviews)
      </Text>
      <Text style={s.price}>Price: ${course.price}</Text>
      <Button
        title={enrolling ? "Enrolling..." : "Enroll Now"}
        color="#16a34a"
        onPress={handleEnroll}
        disabled={enrolling}
      />
    </View>
  );
};

export default CourseDetails;

const s = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 14,
  },
  img: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 10,
  },
  sub: {
    fontSize: 13,
    color: "#1d4ed8",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
    marginTop: 8,
    marginBottom: 14,
  },
});
