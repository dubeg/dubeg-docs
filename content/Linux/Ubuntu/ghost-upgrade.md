### Updating Ghost
```
admin$ wget https://ghost.org/zip/ghost-latest.zip
admin$ unzip ghost-latest.zip -d ghost-latest/

// Copy your theme.
// Copy your database.
// Copy your images.
// Copy your apps.
// Copy your config.js.

// Setup the new installation.
admin$ cd ghost-latest/
admin$ npm install --production
admin$ sudo chown -R ghoster .
admin$ sudo chmod -R 755 .
admin$ ls -l 

// Switch the old with the new.
// --
// cp copies files, not directories.
// It will recursively scans files and put them in
// the destination, in the correct structure.
admin$ sudo cp -R ghost-latest /var/www/ghost-latest/
admin$ cd /var/www/
admin$ 
```

Helpful commands
```
admin$ ls -l           // View permissions.
admin$ top -U ghoster
admin$ ps -u ghoster
```