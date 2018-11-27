# Diary

The "application" inside this repository provides a single page application visualizing a team's daily activity.

## How to use it

### Developers

1. `git clone https://github.com/assistify/diary.git`
2. `npm i`
3. `npm start`

=> Browser opens

### Whales

1. `docker run --name diary -d -p 80:80 assistify/diary:latest`
2. Point your local browser to `http://localhost`

### Non-Techies

Go to https://assistify.github.io/diary/

## How it works

Currently, the "application" works by editing the activities of a team using JSON.

- Simply click the button "made with... by assistify" at the bottom, this takes you to an editor. 
Edit carefully. Clicking the same button takes you back.
- Using a "copy URL"-button, you can create a URL which includes the complete state. This URL you can share with everybody
