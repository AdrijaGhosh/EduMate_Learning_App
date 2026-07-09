import React from "react";

import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Profile from "../MainTabs/Profile";

import UserContext from "../../hooks/UserContext";


// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  removeItem: jest.fn(),
}));


describe("Profile Screen Tests", () => {


  const mockNavigate = jest.fn();


  const mockNavigation = {
    getParent: jest.fn(() => ({
      navigate: mockNavigate,
    })),
  };


  const mockContext = {

    mail: "sumit@gmail.com",

    setMail: jest.fn(),

    setPw: jest.fn(),

    setUid: jest.fn(),

    name: "Sumit",

    profileImage:
      "https://example.com/profile.png",

  };



  beforeEach(() => {

    jest.clearAllMocks();

  });



  test("renders user profile information", () => {


    const result = render(

      <UserContext.Provider value={mockContext}>

        <Profile navigation={mockNavigation}/>

      </UserContext.Provider>

    );


    expect(
      result.getByText("Sumit")
    ).toBeTruthy();



    expect(
      result.getByText("sumit@gmail.com")
    ).toBeTruthy();


  });



  test("logout button clears user data and removes storage", async () => {


    const result = render(

      <UserContext.Provider value={mockContext}>

        <Profile navigation={mockNavigation}/>

      </UserContext.Provider>

    );


    const logoutButton =
      result.getByText("Logout");



    fireEvent.press(logoutButton);



    await waitFor(() => {


      expect(
        mockContext.setMail
      )
      .toHaveBeenCalledWith("");



      expect(
        mockContext.setPw
      )
      .toHaveBeenCalledWith("");



      expect(
        mockContext.setUid
      )
      .toHaveBeenCalledWith("");



      expect(
        AsyncStorage.removeItem
      )
      .toHaveBeenCalledWith("token");



      expect(
        AsyncStorage.removeItem
      )
      .toHaveBeenCalledWith("uid");



      expect(
        mockNavigation.getParent
      )
      .toHaveBeenCalled();



      expect(
        mockNavigate
      )
      .toHaveBeenCalledWith("Login");


    });


  });


});