# LoveStory

An HTML/CSS/JS prototype made on an express.js server with an MySQL database.

## Install
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
`INSERT INTO stories (title, genre, description, story, writer) VALUES ( 'De reis', 'Fantasie', 'Eerst liep hij door de kou, dan door de brandende zon en dan door de regen.', 'Hij liep door kou, snijdende kou. Dan weer zon, brandende zon. Wind, onvoorspelbare wind. Regen, stromende regen. Allemaal onvoorspelbaar, maar toch te verwachten. Maar voor niets was hij beschermd. Litteken na litteken. Gehavend liep hij over die ene weg, met het mes. Het mes behield zijn scherpte, maar hijzelf werd steeds weemoediger. Niemand vertelde hem hoelang nog, of wat er nog zou komen. Waar deed hij het eigenlijk voor? Hij stond even stil om adem te halen en keek naar het mes. Hij zag in het handvat een gleuf. Hierin zat een kaart.', 'Eva Bakker' );`

Story 2:
`INSERT INTO stories (title, genre, description, story, writer) VALUE ( 'Moeder natuur', 'Literatuur', 'Het jagen op prooi, het verdedigen van je eigen territorium... het hoort er allemaal bij.', 'Ik zie, vanuit de auto twee Kauwen een Buizerd verjagen. Zoals in de oorlog de bommenwerpers aangevallen werden door bommenjagers. De kauwen vielen aan net zolang tot de buizerd verjaagd was. Iets verder op, langs de rand van een weiland zie ik de meester van de levende beelden, de Reiger. Als versteend wachtend tot zijn prooi dichtbij genoeg is. Niet veel later langs de snelweg een Torenvalk die in zijn kenmerkende biddende houding in de lucht hangt wachtend tot de finale duik naar een veldmuis.', 'Wouter Koks' );`

Story 3:
`INSERT INTO stories (title, genre, description, story, writer) VALUE ( 'Echte sprookjes', 'fantasie', 'Wat nou, al komen de verhalen die aan jou worden voorgelezen tot leven?', 'Maar plots zag ze daar prins Raol en ze ontving hem met open armen. Later gingen prinses Luana en prins Raol trouwen en werden papa en mama van twee zoete kindjes; een jongetje en een meisje. Maar de gemene tovenaar Baldamor; hij leefde zijn leven lang in een kleine hol onder de grond, en mocht nooit meer naar boven komen! Einde.', 'Lourdes de Jong' );`

Creating the second table: Profiles
`CREATE TABLE IF NOT EXISTS myprofile ( id INT NOT NULL AUTO_INCREMENT, email TEXT CHARACTER SET utf8, hash TEXT CHARACTER SET utf8, name TEXT CHARACTER SET utf8, birthdate TEXT CHARACTER SET utf8, residency TEXT CHARACTER SET utf8, about TEXT CHARACTER SET utf8, sex TEXT CHARACTER SET utf8, PRIMARY KEY (id) );`

Profile 1:
`INSERT INTO myprofile (email, hash, name, birthdate, residency, about) VALUES ( 'Eve4321@example.nl', '4321', 'Eva Bakker', '01-01-1992', 'Amersfoort', 'Hoi ik ben Eva en ik hou van fantasieverhalen!', 'vrouw' );`

Profile 2:
`INSERT INTO myprofile (email, hash, name, birthdate, residency, about, sex) VALUES ( 'Wouterr1111@example.nl', '1111', 'Wouter Koks', '27-11-1989', 'Oss', 'Hoi ik ben Wouter en ik hou van horrorverhalen!', 'man' );`

Profile 3:
`INSERT INTO myprofile (email, hash, name, birthdate, residency, about) VALUES ( 'Lourdes000@example.nl', '0000', 'Lourdes de Jong', '07-01-1993', 'Heemskerk', 'Hoi ik ben Lourdes en ik hou van historische verhalen!', 'vrouw' );`

4. Log out of MySQL
`exit`

5. Add a .env file with the following
`DB_HOST=localhost
DB_USER=myusername
DB_NAME=mydatabase
DB_PASSWORD=mypassword`

6. Start the server
`npm start`