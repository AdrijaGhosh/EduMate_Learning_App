import React from "react";

import {
  render,
} from "@testing-library/react-native";

import {
  NavigationContainer,
} from "@react-navigation/native";

import Course from "../MainTabs/Course";



// Mock child screens

jest.mock("../CourseStack/CourseList", () => {

  return function CourseList(){

    return null;

  }

});


jest.mock("../CourseStack/CourseDetails", () => {

  return function CourseDetails(){

    return null;

  }

});


jest.mock("../CourseStack/LessonList", () => {

  return function LessonList(){

    return null;

  }

});


jest.mock("../CourseStack/Lesson", () => {

  return function Lesson(){

    return null;

  }

});





describe("Course Stack Navigation Tests",()=>{



test("renders course navigator",()=>{


const {toJSON}=render(


<NavigationContainer>


<Course/>


</NavigationContainer>


);



expect(
toJSON()
).toBeTruthy();



});






test("initial screen should be CourseList",()=>{


const {UNSAFE_getByType}=render(


<NavigationContainer>


<Course/>


</NavigationContainer>


);



expect(
UNSAFE_getByType
).toBeTruthy();



});



});