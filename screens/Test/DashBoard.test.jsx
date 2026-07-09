import React from "react";

import {
  render,
} from "@testing-library/react-native";

import Dashboard from "../MainTabs/Dashboard";

import UserContext from "../../hooks/UserContext";


// Mock react-redux

jest.mock("react-redux", () => ({

  useDispatch: () => jest.fn(),

  useSelector: jest.fn(),

}));


import { useSelector } from "react-redux";



// Mock redux actions

jest.mock("../../store/coursesSlice", () => ({
  fetchCourses: jest.fn(() => ({
    type: "courses/fetchCourses"
  }))
}));


jest.mock("../../store/progressSlice", () => ({
  fetchProgress: jest.fn(() => ({
    type: "progress/fetchProgress"
  }))
}));



describe("Dashboard Screen Tests", () => {


  const mockContext = {
    uid: "user123"
  };



  beforeEach(()=>{

    jest.clearAllMocks();

  });



  test("shows loading screen",()=>{


    useSelector.mockImplementation((callback)=>{


      return callback({

        courses:{
          list:[],
          status:"loading"
        },


        progress:{
          list:[],
          status:"idle"
        }


      });


    });



    const {getByText}=render(


      <UserContext.Provider value={mockContext}>


        <Dashboard/>


      </UserContext.Provider>


    );



    expect(
      getByText("Loading Dashboard...")
    ).toBeTruthy();


  });







  test("renders enrolled courses",()=>{


    useSelector.mockImplementation((callback)=>{


      return callback({


        courses:{


          list:[

            {
              id:"course1",
              title:"React Native Basics",
              thumbnail:"https://test.com/image.png"
            }

          ],


          status:"success"


        },



        progress:{


          list:[

            {
              userId:"user123",
              courseId:"course1",
              status:"completed",
              completionPercentage:100
            }

          ],


          status:"success"


        }


      });


    });





    const {getByText}=render(


      <UserContext.Provider value={mockContext}>


        <Dashboard/>


      </UserContext.Provider>


    );



    expect(
      getByText("React Native Basics")
    ).toBeTruthy();



    expect(
      getByText("100% Completed")
    ).toBeTruthy();



    expect(
      getByText("Completed")
    ).toBeTruthy();



  });







  test("shows empty courses message",()=>{


    useSelector.mockImplementation((callback)=>{


      return callback({


        courses:{
          list:[],
          status:"success"
        },


        progress:{
          list:[],
          status:"success"
        }


      });


    });



    const {getByText}=render(


      <UserContext.Provider value={mockContext}>


        <Dashboard/>


      </UserContext.Provider>


    );



    expect(

      getByText(
        "You haven't enrolled in any course yet."
      )

    ).toBeTruthy();


  });



});