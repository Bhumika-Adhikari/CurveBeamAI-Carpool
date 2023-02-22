# Carpool Pickup

This repo contains a web application that can help students leave the classroom at the time school end time, by letting them know that their pick-up car is next in the carpool lane.

Demo URL: [https://webapp-carpoolpickup.azurewebsites.net/](https://webapp-carpoolpickup.azurewebsites.net/)

## Getting started

### Prerequisites

1.  Node: any version starting with 16.18.12 or greater
2. .NET 6 (LTS)
3. Visual Studio Code

### Running locally

1. `dotnet restore` to restore all required packages.
2. `dotnet run` to run the project.

## Features
- User can add a car in the carpool lane with a valid registration number.
- User can select students from the class list using checkbox and associate students from different classes to a car.
- A student can be associated with multiple cars.
- A car can be marked next in line to leave in the carpool lane.
- A car can be marked as left which donates that students associated with the car have left the school.
- For each class, a counter shows students that have left and students that are still remaining in the class.
- User can edit/delete cars that have not yet being marked as left.
- User also can assign/de-assign students from the vehicles as well.
- User can clear the carpool lane to remove all cars.
- User can reset the carpool lane to its default state where cars are not marked as left.

## Publish Project to Azure Web App

1. Create a Web App on Azure with .NET 6 (LTS) as runtime stack.
2. Install Azure App Service extension in Visual Studio Code.
3. Run `dotnet publish -c Release -o ./publish` in your working directory.
4. Copy `CarpoolPickup.db` file into the `./publish` folder.
5. Add a new connection string named `DefaultConnection` with the value `Data Source=CarpoolPickup.db;` in the Web App.
6. Right-click on the `./publish` folder, click Deploy to Web App and select your Web App created in Step 1 to publish the project.

## Test cases

| Test Number | Test Type   | Scenario                                                              | Expected Output                                                                   | Status |
| ----------- | ----------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------ |
| 1           | Requirement | 2 boxes with headings Class A and Class B                             | Display them in the browser screen                                                | Passed |
| 2           | Requirement | Names of the students in each boxes with checkbox                     | Display as required                                                               | Passed |
| 3           | Requirement | Support to add a car with registration number and select students     | User able to enter car registration number and select students to add             | Passed |
| 4           | Requirement | Marking car as left in the pickup lane                                | Registered car can be marked as left that will also shows students that left      | Passed |
| 5           | Requirement | For each class show how many students left and how many are remaining | Appropriate counter should be shown in the boxes                                  | Passed |
| 6           | Requirement | Many-to-many relationship between cars and students                   | Able to add same students in different cars if they have not left                 | Passed |
| 7           | Requirement | Reset everything back to default                                      | Carpool Lane should be reset                                                      | Passed |
| 8           | Requirement | Assign/de-assign students from the cars                               | Add or remove students from a car                                                 | Passed |
| 9           | Validation  | Registration number less than 6 characters                            | Appropriate error should be shown                                                 | Passed |
| 10          | Validation  | Registration number with special characters                           | Appropriate error should be shown                                                 | Passed |
| 11          | Validation  | Same car registration entered again                                   | Appropriate error should be shown                                                 | Passed |
| 12          | Validation  | Marking car as left with students that already left in another car    | Appropriate error should be shown                                                 | Passed |
| 13          | UX          | Students left should be highlighted                                   | Set student names and their checkbox disabled                                     | Passed |
| 14          | UX          | Editing car with students that already left                           | The form should automatically uncheck left students and disable them              | Passed |
| 15          | UX          | Confirmation required before reset                                    | Appropriate popup should be shown                                                 | Passed |
| 16          | UX          | Confirmation required before deleting a car from carpool lane         | Appropriate popup should be shown                                                 | Passed |
| 17          | UX          | Moving car to next in the carpool lane                                | Appropriate functionality should be provided to move car as next to leave         | Passed |
| 18          | UX          | Cancel editing the car                                                | Provide a cancel button only when car is in edit mode                             | Passed |
| 19          | UX          | Disabling the form when not needed                                    | Disabled selection of students when form is waiting for user's input in Add state | Passed |
| 20          | UX          | Allow marking car as left only when it is first in the lane           | Provide option to move the car as next to leave and then allow it to leave        | Passed |
