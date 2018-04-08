# LoveStory

An HTML/CSS/JS prototype for "LoveStory.nl"; a datingsite for writers, made on an express.js server with an MySQL database.

## Install

1. Install

1. Clone the project
`git clone git@github.com:nguyent047/lovestory.git`
`cd lovestory`

2. Log into MySQL
`mysql -u your-username -p`

3. Run the following SQL

Creating a database
`CREATE DATABASE IF NOT EXISTS LoveStory;`

Creating a table with stories
`CREATE TABLE IF NOT EXISTS stories ( id INT NOT NULL AUTO_INCREMENT, title TEXT CHARACTER SET utf8, genre TEXT CHARACTER SET utf8, description TEXT CHARACTER SET utf8, story TEXT CHARACTER SET utf8, writer TEXT CHARACTER SET utf8, PRIMARY KEY (id) );`

Story 1:
`INSERT INTO stories (title, genre, description, story, writer) VALUES ( 'De reis', 'Fantasie', 'Eerst liep hij door de kou, dan door de brandende zon en dan door de regen.', 'De brandende zon in mijn rug en het zweet op mijn voorhoofd.', 'Eva Bakker' );`

Story 2:
`INSERT INTO stories (title, genre, description, story, writer) VALUE ( 'Moeder natuur', 'Literatuur', 'Het jagen op prooi, het verdedigen van je eigen territorium... het hoort er allemaal bij.', 'Mijn collega en ik stapten uit de auto. Om ons heen een alleen maar weiland. Iets verderop was het bos.' WHERE title = 'Moeder natuur.', 'Wouter Koks' );`

Story 3:
`INSERT INTO stories (title, genre, description, story, writer) VALUE ( 'Echte sprookjes', 'fantasie', 'Wat nou, al komen de verhalen die aan jou worden voorgelezen tot leven?', 'De tweeling, Sara en Namara zaten allebei in hun grote bed. Ik ging op de rand van het bed zitten en sloeg het sprookjesboek open.', 'Lourdes de Jong' );`

Creating the second table: Profiles
`CREATE TABLE IF NOT EXISTS myprofile ( id INT NOT NULL AUTO_INCREMENT, email TEXT CHARACTER SET utf8, hash TEXT CHARACTER SET utf8, name TEXT CHARACTER SET utf8, birthdate TEXT CHARACTER SET utf8, residency TEXT CHARACTER SET utf8, about TEXT CHARACTER SET utf8, sex TEXT CHARACTER SET utf8, PRIMARY KEY (id) );`

4. Log out of MySQL
`exit`

5. Add a .env file with the following
`DB_HOST=localhost
DB_USER=myusername
DB_NAME=mydatabase
DB_PASSWORD=mypassword
SESSION_SECRET=ilikecats`

6. Start the server
`npm start`

7. Have fun!

## Sources
1. Express.js server. Titus Wormer. (z.d.) https://docs.google.com/presentation/d/1QVPTtENQ8d6td9ioNZHnbSoiilUZdsZ8n_F5naxw_Rw/edit#slide=id.g32339aa0a1_0_758
2. Login, logout and loginsessions. Titus Wormer. (z.d.) https://docs.google.com/presentation/d/1BHMqO9UV5ePt29n8cnjaznvye8Gu_HrdzhzC3h5rgOI/edit#slide=id.g349f599a27_0_360
