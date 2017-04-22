% DocBrowse Report
% Julio Tain Sueiras
% 2017-04-21

\tableofcontents

# Introduction
The DocBrowse App allow user to browse development documentation offline, and help with everyday workflow of a developer by allowing them to work more productive

# Tech Stack Info
The DocBrowse App uses NativeScript for overall framework, and the language used is TypeScript(a superset of JavaScript), DocBrowse also uses DashDocs for grabbing all the documentation. Sqlite is use in getting the listing of a documentation(their type and path)

# Events

## What went well
Overall App implementation went as schedule, as wells as the usage of NativeScript, there weren't much hassle

## What didn't went well
The format of DashDocs's docs are in tgz(tar gzip) which is not friendly in mobile platform, so the only workaround as of now, is to temporary host the docs in [a github repo](github.com/juliosueiras/temp_dashdocs_feed), but in zip format.

## What need improving
Overall Time management, since due to busy schedule, and work, there weren't enough time put it in the App

# Functionality

## What is implemented
The display of Documentation, as wells as listing of different types, and content of each documentation

## What isn't implemented
The search functionality due to lack of time, the auto anchoring of the html weren't able to resolve, and lastly the amount of documentation is currently limit to 4 due to space and restriction, this will be resolve, if there is a proper way of handling tgz in mobile platform
