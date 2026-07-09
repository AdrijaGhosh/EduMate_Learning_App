import React from "react";

import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import CourseDetails from "../CourseStack/CourseDetails";

import UserContext from "../../hooks/UserContext";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  addProgress,
} from "../../store/progressSlice";


// Mock alert
global.alert = jest.fn();


// Mock react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));


// Mock progress action
jest.mock("../../store/progressSlice", () => ({
  addProgress: jest.fn(),
}));



describe("CourseDetails Screen Tests", () => {


  const mockNavigation = {

    goBack: jest.fn(),

    navigate: jest.fn(),

  };



  const mockRoute = {

    params: {
      courseId: "101",
    },

  };



  const mockContext = {

    uid: "user123",

  };



  const mockCourse = {

    id: "101",

    title: "React Native Basics",

    description: "Learn React Native",

    thumbnail:
      "https://test.com/image.png",

    instructor: "John",

    category: "Mobile Development",

    level: "Beginner",

    duration: "20 hours",

    rating: 4.5,

    reviews: 100,

    price: 50,

  };



  beforeEach(() => {


    jest.clearAllMocks();



    addProgress.mockReturnValue({

      type: "progress/addProgress",

    });



    useDispatch.mockReturnValue(

      jest.fn(() => ({

        unwrap: () =>
          Promise.resolve(),

      }))

    );


  });





  test("renders course details", () => {


    useSelector.mockReturnValue({

      list: [
        mockCourse
      ],

    });



    const { getByText } = render(


      <UserContext.Provider value={mockContext}>


        <CourseDetails

          route={mockRoute}

          navigation={mockNavigation}

        />


      </UserContext.Provider>


    );



    expect(
      getByText("React Native Basics")
    ).toBeTruthy();



    expect(
      getByText("Instructor: John")
    ).toBeTruthy();



    expect(
      getByText("Category: Mobile Development")
    ).toBeTruthy();



    expect(
      getByText("Price: $50")
    ).toBeTruthy();



  });







  test("shows course not found when course does not exist", () => {


    useSelector.mockReturnValue({

      list: [],

    });



    const { getByText } = render(


      <UserContext.Provider value={mockContext}>


        <CourseDetails

          route={mockRoute}

          navigation={mockNavigation}

        />


      </UserContext.Provider>


    );



    expect(

      getByText("Course not found")

    ).toBeTruthy();



  });







  test("enroll button dispatches addProgress and navigates", async () => {


    useSelector.mockReturnValue({

      list: [
        mockCourse
      ],

    });



    const dispatchMock = jest.fn(() => ({

      unwrap: () =>
        Promise.resolve(),

    }));


    useDispatch.mockReturnValue(dispatchMock);



    const { getByText } = render(


      <UserContext.Provider value={mockContext}>


        <CourseDetails

          route={mockRoute}

          navigation={mockNavigation}

        />


      </UserContext.Provider>


    );



    fireEvent.press(

      getByText("Enroll Now")

    );



    await waitFor(() => {



      expect(
        addProgress
      ).toHaveBeenCalledWith({

        userId: "user123",

        courseId: "101",

      });



      expect(
        dispatchMock
      ).toHaveBeenCalled();



      expect(
        mockNavigation.navigate
      ).toHaveBeenCalledWith(

        "LessonList",

        {
          courseId: "101"
        }

      );



    });



  });







  test("shows enrolling state while enrolling", async () => {


    useSelector.mockReturnValue({

      list: [
        mockCourse
      ],

    });



    let resolvePromise;



    const dispatchMock = jest.fn(() => ({


      unwrap: () =>

        new Promise((resolve)=>{

          resolvePromise = resolve;

        })


    }));



    useDispatch.mockReturnValue(dispatchMock);



    const { getByText } = render(


      <UserContext.Provider value={mockContext}>


        <CourseDetails

          route={mockRoute}

          navigation={mockNavigation}

        />


      </UserContext.Provider>


    );



    fireEvent.press(

      getByText("Enroll Now")

    );



    expect(

      getByText("Enrolling...")

    ).toBeTruthy();



    resolvePromise();



  });



});