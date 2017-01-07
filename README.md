# Andrummer

Andrummer is a android app for viewing and rolling stats from a Chummer 5 print file.

## Getting Started

Download the project from github
Install Android SDK Tools
Install npm
Install cordova (npm install -g cordova once you have npm)

### Prerequisites

A working knowledge of JS, an IDE, and love for ShadowRun.

### Installing

Since I've pieced this together over months, these steps won't be great so please update when you see missing steps

Once you have npm and cordova installed.  You'll need to install each of the plugins in the config.xml like so:
cordova plugin add cordova-plugin-dialogs

Do this for all the plugins

## Running

### Debugging
Browser:  cordova run browser
android: cordova run android

The android run will try to push it to your phone if you have one hooked up and set to debug.  Otherwise it'll try to use the one you have set up in AVD Manager

## Built With

* [Cordova](https://cordova.apache.org/docs/en/latest/) - The HTML -> Android converter

## Contributing

If you want to contribute, download it, make your updates and put in a pull request.

## Versioning

Ain't figured this one out yet

## Authors

* **odd** - *Initial work*

See also the list of [contributors](TBD) who participated in this project.

## Acknowledgments

* This project is based on code from github.com/chummer5a/chummer5a