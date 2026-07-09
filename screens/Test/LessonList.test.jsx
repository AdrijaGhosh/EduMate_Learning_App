import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";

import LessonList from "../CourseStack/LessonList";

import UserContext from "../../hooks/UserContext";

import { useSelector, useDispatch } from "react-redux";

import { updateProgress } from "../../store/progressSlice";

// Mock Redux

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),

  useDispatch: jest.fn(),
}));

// Mock actions

jest.mock("../../store/lessonsSlice", () => ({
  fetchLessons: jest.fn(() => ({
    type: "lessons/fetchLessons",
  })),
}));

jest.mock("../../store/progressSlice", () => ({
  fetchProgress: jest.fn(() => ({
    type: "progress/fetchProgress",
  })),

  updateProgress: jest.fn(() => ({
    type: "progress/updateProgress",
  })),
}));

describe("LessonList Screen Tests", () => {
  const mockNavigation = {
    goBack: jest.fn(),

    navigate: jest.fn(),
  };

  const mockRoute = {
    params: {
      courseId: "course1",
    },
  };

  const mockContext = {
    uid: "user123",
  };

  const lessons = [
    {
      id: "lesson1",

      courseId: "course1",

      title: "Introduction",

      description: "Basics of React Native",

      duration: 20,
    },

    {
      id: "lesson2",

      courseId: "course1",

      title: "Components",

      description: "React Components",

      duration: 30,
    },
  ];

  const progress = [
    {
      id: "progress1",

      userId: "user123",

      courseId: "course1",

      status: "in-progress",

      completionPercentage: 50,

      lessonsCompleted: ["lesson1"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockReturnValue(jest.fn());
  });

  test("shows loading state", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        lessons: {
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
        <LessonList route={mockRoute} navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("Loading...")).toBeTruthy();
  });

  test("renders lessons and progress", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        lessons: {
          list: lessons,

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
        <LessonList route={mockRoute} navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("Lessons")).toBeTruthy();

    expect(getByText("Introduction")).toBeTruthy();

    expect(getByText("Components")).toBeTruthy();

    expect(getByText("Completed: 50%")).toBeTruthy();
  });

  test("shows not enrolled when progress is missing", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        lessons: {
          list: lessons,

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
        <LessonList route={mockRoute} navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    expect(getByText("Status: Not enrolled")).toBeTruthy();
  });

  test("marks lesson as completed", async () => {
    useSelector.mockImplementation((callback) =>
      callback({
        lessons: {
          list: lessons,

          status: "success",
        },

        progress: {
          list: [
            {
              id: "progress1",

              userId: "user123",

              courseId: "course1",

              status: "not-started",

              completionPercentage: 0,

              lessonsCompleted: [],
            },
          ],

          status: "success",
        },
      }),
    );

    const dispatchMock = jest.fn();

    useDispatch.mockReturnValue(dispatchMock);

    const { getAllByText } = render(
      <UserContext.Provider value={mockContext}>
        <LessonList route={mockRoute} navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    fireEvent.press(getAllByText("Mark as completed")[0]);

    await waitFor(() => {
      expect(updateProgress).toHaveBeenCalledWith({
        progressId: "progress1",

        lessonsCompleted: ["lesson1"],

        completionPercentage: 50,

        status: "in-progress",
      });

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  test("navigates to lesson screen", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        lessons: {
          list: lessons,

          status: "success",
        },

        progress: {
          list: progress,

          status: "success",
        },
      }),
    );

    const { getAllByText } = render(
      <UserContext.Provider value={mockContext}>
        <LessonList route={mockRoute} navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    fireEvent.press(getAllByText("Watch Lesson")[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      "Lesson",

      {
        id: "lesson1",
      },
    );
  });

  test("back button works", () => {
    useSelector.mockImplementation((callback) =>
      callback({
        lessons: {
          list: lessons,

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
        <LessonList route={mockRoute} navigation={mockNavigation} />
      </UserContext.Provider>,
    );

    fireEvent.press(getByText("Back"));

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
