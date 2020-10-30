# Pet tracker - Web application

Pet tracker is a web application developed for the company infinity systems. The objective of Pet tracker is to provide a service or platform to locate a lost pet on a map previously registered by the user. Additionally, it will have forms and detailed information management for each pet so that it can be easily identified.

## Functionalities of this web application:

- Register or log in to a user account
- A home page that will show all the information of the web application and the product.
- A user web page that displays a user's pets and allows the user to register a pet.
- Settings Web page for the pet and user to update their information respectively
- A map web page that will allow you to locate a pet.

## Table of Content

- [Environment](#environment-and-requirements)
- [Run web application](#Run-web-application-locally)
- [Visit our web-site](#Visit-our-web-site)
- [Folder Descriptions](#folder-descriptions)
- [Examples of use](#examples-of-use)
- [Bugs](#bugs)
- [Authors](#authors)
- [License](#license)

## Environment and requirements

This web-application was interpreted/tested on Ubuntu 20.04 LTS using python3 (version 3.8.5) and javascript

### General Requirements

- SQLAlquemy
- flask
- jinja2
- postgrepSQL

## Run web application locally

- Clone this repository: `git clone "https://github.com/Nicolanz/pet_tracker.git"`
- Access to AirBnb directory: `cd pet_tracker`
- Run flask instance for the web-site:
  ```
  ~/pet-tracker$ POSTGREP_USER=cobra_team POSTGREP_PWD=cobra POSTGREP_HOST=127.0.0.1 POSTGREP_DB=pet_db python3 -m web_dynamic.server
  ```
- Run the api flask instance in another terminal:
  ```
  ~/pet-tracker$ POSTGREP_USER=cobra_team POSTGREP_PWD=cobra POSTGREP_HOST=127.0.0.1 POSTGREP_DB=pet_db python3 -m api.v1.app
  ```
- In your browser type `localhost:5001` to go to the home page.

## Visit our web site

To avoid running the entire web application locally, you can simply visit our website at `www.pet-tracker.com`

## Folder descriptions

| Folder                     | Description                       |
| -------------------------- | --------------------------------- |
| api                        | Contains all api files            |
| api/v1                     | Contains version 1 api files      |
| api/v1/views               | All files with api routes         |
| models                     | Contains all clases files         |
| tests                      | All tests files                   |
| web_dynamic                | All web pages files               |
| web_dynamic/static         | All support files for static html |
| web_dynamic/static/images  | all images files                  |
| web_dynamic/static/scripts | All javascript files              |
| web_dynamic/static/styles  | All css files                     |
| web_dynamic/templates/     | All html files                    |

## Examples of use

Faltan ejemplos

## Bugs

No known bugs at this time.

## Authors

- Bryan Builes - [Github](https://github.com/bryanbuiles) / [Twitter](https://twitter.com/bryan_builes)
- Erika Osorio - [Github](https://twitter.com/erikaosgue) / [Twitter](https://twitter.com/earthtojhuang)
- Nicolas zarate - [Github](https://github.com/Nicolanz) / [Twitter](https://twitter.com/nicolas_zg)
- Juan Olivares - [Github](https://github.com/JuanOlivares1) / [Twitter](https://twitter.com/OlivaresP____)

## License

Public Domain. No copy write protection.
