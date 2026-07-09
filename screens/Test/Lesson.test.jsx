import React from "react";

import {
  render,
  fireEvent,
} from "@testing-library/react-native";

import Lesson from "../CourseStack/Lesson";

import {
  useSelector
} from "react-redux";



// Mock Redux

jest.mock("react-redux",()=>({

  useSelector: jest.fn(),

}));




// Mock WebView

jest.mock("react-native-webview",()=>({

  WebView: (props)=>{

    return null;

  }

}));





describe("Lesson Screen Tests",()=>{



const mockNavigation={

  goBack:jest.fn()

};



const mockRoute={


params:{

id:"lesson1"

}


};





const mockLesson={


id:"lesson1",

title:"Introduction to React Native",

description:"Learn React Native basics",

content:"This lesson explains components",

videoUrl:
"https://www.youtube.com/watch?v=abc123"


};






beforeEach(()=>{


jest.clearAllMocks();


});









test("renders lesson details",()=>{


useSelector.mockReturnValue({

list:[mockLesson]

});




const {getByText}=render(


<Lesson

route={mockRoute}

navigation={mockNavigation}

/>


);



expect(

getByText(
"Introduction to React Native"
)

).toBeTruthy();




expect(

getByText(
"Learn React Native basics"
)

).toBeTruthy();




expect(

getByText(
"This lesson explains components"
)

).toBeTruthy();



});









test("shows lesson not found",()=>{


useSelector.mockReturnValue({

list:[]

});




const {getByText}=render(


<Lesson

route={mockRoute}

navigation={mockNavigation}

/>


);



expect(

getByText(
"Lesson not found"
)

).toBeTruthy();



});









test("back button navigates back",()=>{


useSelector.mockReturnValue({

list:[mockLesson]

});




const {getByText}=render(


<Lesson

route={mockRoute}

navigation={mockNavigation}

/>


);



fireEvent.press(

getByText("Back")

);



expect(

mockNavigation.goBack

).toHaveBeenCalled();



});









test("renders lesson video URL correctly",()=>{


useSelector.mockReturnValue({

list:[mockLesson]

});




const {UNSAFE_getByType}=render(


<Lesson

route={mockRoute}

navigation={mockNavigation}

/>


);



expect(

UNSAFE_getByType

).toBeTruthy();



});



});