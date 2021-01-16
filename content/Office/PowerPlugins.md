---
date: 2018-09-26
title: Power Plugins
menu:
    sidebar:
        parent: Office
---


## Excel 2013 and beyond
Power Query (Discovering, connecting to, and importing data.)
- Shape
    + Clean
        + Remove cols
        + Rename cols
    + Extracting data
    + Transforming
    + Loading into Excel


Power Pivot (Modeling data)
- Define Relationships
- Define DAX Measures
- Define KPIs
- Define Hierarchies
- Define Perspectives




## Power Query
Power Query is a self-service ETL (Extract, Transform, Load) tool which runs as an Excel add-in. It allows users to pull data from various sources, manipulate said data into a form that suits their needs, and load it into Excel.

## Power Pivot
Power Pivot is an in-memory data modelling component that enables highly-compressed data storage and extremely fast aggregation and calculation. It is also available as part of Excel, and can be used to create a data model within an Excel workbook. Power Pivot can load data itself, or can have data loaded into it by Power Query. It is extremely similar to the SSAS (SQL Server Analysis Services) Tabular model, which is like a server-based version of Power Pivot.

## Power View
Power View is an interactive visualisation tool which provides users with a drag-and-drop interface allowing them to build quick and easy visualisations of the data in their Excel workbooks (using the Power Pivot data model).

## Power BI
Power BI is a SaaS service which enables business users to service their own business intelligence needs. It provides built-in ability to connect to SaaS services like Salesforce and many others. It provides connectivity to on-premises and cloud sources using a combination of direct query and periodic data refreshes. It is available as a freemium service. It is the successor to 'Power BI for Office 365' that was based on Microsoft's Office 365 and SharePoint Online products, and, through Excel 2013, encompasses Power Query, Power Pivot, and Power View.

Power BI (with O365 and SharePoint Online) provides a site where users can upload and share their created content with other users, as well as manage gateways into enterprise data source, enable data refresh, and advanced features like Q&A, which allows natural language querying of data models.

Microsoft has also released a standalone Power BI Desktop application, which ties together Power Query, Power Pivot, and Power View in a standalone application, removing the Excel 2013 constraint. Power BI Desktop is available for free.

It is also possible to achieve a lot of the functionality of Power BI using on-premise SQL Server 2012+, Excel 2010+ and SharePoint 2010+, if cloud-based is not an option for you.