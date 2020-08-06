This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Covid Statistics App

- [Description](#description)
- [Covid Data Plots](#covid-data-plots)
- [Line-List-Data](#line-list-data)

## Description
This is a simple React application providing statistics data for Covid 19 Observations as well as registered infected people

## Covid-Data-Plots
When launching the app you will be redirected to the Plots page. It has 2 Plots created with Plotly.js library that represent covid data in a graphical way.
The plots are implemented as movable widgets using the react-draggable package. Filtering functionality is provided so you can get stats by Country/Region, Province/State or patients status (confirmed, recovered, dead)

## Line-List-Data
Here you will find data about registered covid patients in a table format. On each row you can click the Details button so you can see more detailed information regarding each covid case.
You have a few filtering options as well. You can filter by Country, Location, Gender and Age.
Please pay attention that not each Country has locations so for some countries the locations selection field may not be visible.
