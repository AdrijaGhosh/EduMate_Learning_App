import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../store/coursesSlice";
import { fetchProgress } from "../../store/progressSlice";
import UserContext from "../../hooks/UserContext";
import { TextInput } from "react-native-gesture-handler";

const CourseList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list: courses, status: coursesStatus } = useSelector(
    (state) => state.courses,
  );
  const { list: progress, status: progressStatus } = useSelector(
    (state) => state.progress,
  );
  const { uid } = useContext(UserContext);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchProgress());
  }, [dispatch]);

  if (coursesStatus === "loading" || progressStatus === "loading") {
    return <Text>Loading...</Text>;
  }

  // Compare IDs as strings - user/course IDs may be numeric or
  // alphanumeric (auto-generated on signup/enroll), so never assume Number().
  const myProgress = progress.filter((p) => String(p.userId) === String(uid));
  const enrolledCourseIds = myProgress.map((p) => String(p.courseId));

  const enrolledCourses = myProgress.map((p) => {
    const course = courses.find((c) => String(c.id) === String(p.courseId));
    return { ...course, progress: p };
  });

  const availableCourses = courses.filter(
    (c) => !enrolledCourseIds.includes(String(c.id)),
  );
  const filteredCourses = availableCourses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    // NEW: same behavior + offset for all platforms (Android, iOS, web)
    <KeyboardAvoidingView
      style={s.box}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <TextInput
        onChangeText={(e) => setSearch(e)}
        value={search}
        placeholder="Search our courses"
        placeholderTextColor="#94a3b8"
        style={s.searchBar}
      />

      {/* Top section: takes remaining space and scrolls independently */}
      <View style={s.topSection}>
        <Text style={s.head}>Our Courses</Text>
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Image source={{ uri: item.thumbnail }} style={s.img} />
              <Text style={s.title}>{item.title}</Text>
              <Text style={s.desc}>{item.description}</Text>
              <Text style={s.sub}>{item.instructor}</Text>
              <Button
                title="Know More"
                color="#1d4ed8"
                onPress={() =>
                  navigation.navigate("CourseDetails", { courseId: item.id })
                }
              />
            </View>
          )}
        />
      </View>

      {/* Bottom section: fixed minimum height so at least 1 full card always shows */}
      <View style={s.enrolledSection}>
        <Text style={s.head}>Your Enrolled Courses</Text>
        {enrolledCourses.length === 0 ? (
          <Text style={s.emptyText}>
            You haven't enrolled in any courses yet.
          </Text>
        ) : (
          <FlatList
            data={enrolledCourses}
            keyExtractor={(item) => item.id.toString()}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <View style={s.card}>
                <Image source={{ uri: item.thumbnail }} style={s.img} />
                <Text style={s.title}>{item.title}</Text>
                <Text style={s.sub}>
                  {item.progress.completionPercentage}% complete
                </Text>
                <Text style={s.sub}>Status: {item.progress.status}</Text>
                <Button
                  title="Continue"
                  color="#16a34a"
                  onPress={() =>
                    navigation.navigate("LessonList", { courseId: item.id })
                  }
                />
              </View>
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CourseList;

const s = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 12,
  },
  // "Our Courses" gets whatever space is left and scrolls on its own
  topSection: {
    flex: 1,
    minHeight: 0, // required on some RN versions so flex children can shrink/scroll properly
  },
  // "Enrolled Courses" is never squeezed below one full card + header
  enrolledSection: {
    minHeight: 300, // header (~30) + one full card (~250) + breathing room
    maxHeight: 340,
  },
  head: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1d4ed8",
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 10,
    marginBottom: 10,
  },
  img: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },
  desc: {
    fontSize: 13,
    color: "#475569",
  },
  sub: {
    fontSize: 12,
    color: "#16a34a",
    marginBottom: 6,
  },
});
