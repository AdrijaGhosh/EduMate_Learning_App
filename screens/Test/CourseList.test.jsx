import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CourseList from "../CourseStack/CourseList";

import UserContext from "../../hooks/UserContext";

import { useSelector, useDispatch } from "react-redux";

// Mock Redux

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),

  useDispatch: jest.fn(),
}));

// Mock Redux actions

jest.mock("../../store/coursesSlice", () => ({
  fetchCourses: jest.fn(() => ({
    type: "courses/fetchCourses",
  })),
}));

jest.mock("../../store/progressSlice", () => ({
  fetchProgress: jest.fn(() => ({
    type: "progress/fetchProgress",
  })),
}));

describe("CourseList Screen Tests", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockContext = {
    uid: "user123",
  };

  const courses = [
    {
      id: "1",

      title: "React Native",

      description: "Mobile development",

      thumbnail: "image",

      instructor: "John",
    },

    {
      id: "2",

      title: "JavaScript",

      description: "JS basics",

      thumbnail: "image",

      instructor: "Mike",
    },
  ];

  const progress = [
    {
      userId: "user123",

      courseId: "1",

      status: "in-progress",

      completionPercentage: 50,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(jest.fn());
  });

  test("shows loading state", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: [],

          status: "loading",
        },

        progress: {
          list: [],

          status: "success",
        },
      }),
    );

    const { getByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("Loading...")).toBeTruthy();
  });

  test("renders available courses", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: courses,

          status: "success",
        },

        progress: {
          list: progress,

          status: "success",
        },
      }),
    );

    const { getByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("JavaScript")).toBeTruthy();
  });

  test("filters courses using search", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: courses,

          status: "success",
        },

        progress: {
          list: [],

          status: "success",
        },
      }),
    );

    const { getByPlaceholderText, getByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    const searchInput = getByPlaceholderText("Search our courses");

    fireEvent.changeText(
      searchInput,

      "React",
    );

    expect(getByText("React Native")).toBeTruthy();
  });

  test("shows enrolled courses", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: courses,

          status: "success",
        },

        progress: {
          list: progress,

          status: "success",
        },
      }),
    );

    const { getByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("Your Enrolled Courses")).toBeTruthy();

    expect(getByText("50% complete")).toBeTruthy();
  });

  test("shows empty enrolled message", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: courses,

          status: "success",
        },

        progress: {
          list: [],

          status: "success",
        },
      }),
    );

    const { getByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("You haven't enrolled in any courses yet.")).toBeTruthy();
  });

  test("navigates to course details", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: courses,

          status: "success",
        },

        progress: {
          list: [],

          status: "success",
        },
      }),
    );

    const { getAllByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    fireEvent.press(getAllByText("Know More")[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      "CourseDetails",

      {
        courseId: "1",
      },
    );
  });

  test("navigates to lesson list for enrolled course", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        courses: {
          list: courses,

          status: "success",
        },

        progress: {
          list: progress,

          status: "success",
        },
      }),
    );

    const { getByText } = render(
      <UserContext.Provider value={mockContext}>
        <CourseList navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    fireEvent.press(getByText("Continue"));

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      "LessonList",

      {
        courseId: "1",
      },
    );
  });
});
