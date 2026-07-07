import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
 Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../store/coursesSlice";
import { fetchProgress } from "../../store/progressSlice";
import UserContext from "../../hooks/UserContext";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { uid } = useContext(UserContext);

  const {
    list: courses,
    status: coursesStatus,
  } = useSelector((state) => state.courses);

  const {
    list: progress,
    status: progressStatus,
  } = useSelector((state) => state.progress);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchProgress());
  }, [dispatch]);

  if (
    coursesStatus === "loading" ||
    progressStatus === "loading"
  ) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  // Logged in user's progress - compare as strings, since user/course IDs
  // may be numeric OR alphanumeric (auto-generated on signup/enroll).
  // Number("lbToH-dHvxc") === NaN, and NaN !== NaN, so Number() comparisons
  // silently drop every progress record for non-numeric-id users.
  const myProgress = progress.filter(
    (item) => String(item.userId) === String(uid)
  );

  // Enrolled courses with progress
  const enrolledCourses = myProgress
    .map((item) => {
      const course = courses.find(
        (c) => String(c.id) === String(item.courseId)
      );

      if (!course) return null;

      return {
        ...course,
        progress: item,
      };
    })
    .filter(Boolean);

  const totalCourses = enrolledCourses.length;

  const completedCourses = enrolledCourses.filter(
    (item) => item.progress.status === "completed"
  ).length;

  const inProgressCourses = enrolledCourses.filter(
    (item) => item.progress.status === "in-progress"
  ).length;

  const averageProgress =
    totalCourses === 0
      ? 0
      : Math.round(
          enrolledCourses.reduce(
            (sum, item) =>
              sum + Number(item.progress.completionPercentage),
            0
          ) / totalCourses
        );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📊 Learning Dashboard</Text>

      {/* Summary Cards */}

      <View style={styles.summaryRow}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{totalCourses}</Text>
          <Text style={styles.cardLabel}>Enrolled</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>{completedCourses}</Text>
          <Text style={styles.cardLabel}>Completed</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>{inProgressCourses}</Text>
          <Text style={styles.cardLabel}>Learning</Text>
        </View>
      </View>

      {/* Overall Progress */}

      <Text style={styles.progressHeading}>
        Overall Progress ({averageProgress}%)
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${averageProgress}%`,
            },
          ]}
        />
      </View>

      {/* Enrolled Courses */}

      <Text style={styles.subHeading}>Your Enrolled Courses</Text>

      {enrolledCourses.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            You haven't enrolled in any course yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={enrolledCourses}
          keyExtractor={(item, index) =>
            item?.id ? `${item.id}-${index}` : index.toString()
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.courseCard}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.image}
              />

              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>
                  {item.title}
                </Text>

                <Text style={styles.courseStatus}>
                  Status: {item.progress.status}
                </Text>

                <Text style={styles.coursePercent}>
                  {item.progress.completionPercentage}% Completed
                </Text>

                <View style={styles.smallProgress}>
                  <View
                    style={[
                      styles.smallProgressFill,
                      {
                        width: `${item.progress.completionPercentage}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "600",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  card: {
    width: "31%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    elevation: 3,
  },

  cardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
  },

  cardLabel: {
    marginTop: 6,
    color: "#64748b",
    fontWeight: "500",
  },

  progressHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
  },

  progressBar: {
    height: 12,
    backgroundColor: "#dbeafe",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 25,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
  },

  subHeading: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 15,
  },

  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
  },

  emptyText: {
    color: "#64748b",
    fontSize: 16,
  },

  courseCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },

  image: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },

  courseInfo: {
    flex: 1,
    justifyContent: "center",
  },

  courseTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
  },

  courseStatus: {
    marginTop: 5,
    color: "#2563eb",
    fontWeight: "500",
  },

  coursePercent: {
    marginTop: 3,
    color: "#475569",
  },

  smallProgress: {
    marginTop: 10,
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    overflow: "hidden",
  },

  smallProgressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
  },
});