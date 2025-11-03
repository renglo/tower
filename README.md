## TOWER

Tower is a UI tool for the TANK backend

### Clone the repository
```
git clone https://github.com/renglo/tower.git
```

### Setup

Run npm to install dependencies
```
npm install
npm install vite
```

Set the Configuration files

You are going to create two new files in the tower root folder called .env.development and .env.production based on the .env.development.TEMPLATE and .env.production.TEMPLATE files as a starting point. 


**MacOS/Linux:**
```
cp .env.development.TEMPLATE .env.development
cp .env.production.TEMPLATE .env.production
cp src/tools.json.TEMPLATE src/tools.json
```

**Windows:**
```
copy .env.development.TEMPLATE .env.development
copy .env.production.TEMPLATE .env.production
copy src\tools.json.TEMPLATE src\tools.json
```


Don't delete the template files!

Enter the tokens, secrets and IDs that belong to the environment you are deploying to. 

Many of those settings will be available to you until you set the cloud later in the process. Don't worry about them for the time being

Run the dev server

```
npm run dev
```


If you are getting errors, clear the libraries and start over

**MacOS/Linux:**
```
rm -rf node_modules
rm package-lock.json
npm install
```

**Windows:**
```
rmdir /s /q node_modules
del package-lock.json
npm install
```


If you are still getting errors, update the nvm version

```
nvm install 18
```

Set the Tools manifest. Copy the contents of the tools template

**MacOS/Linux:**
```
cd tower/src
cp tools.json.TEMPLATE tools.json
```

**Windows:**
```
cd tower\src
copy tools.json.TEMPLATE tools.json
```


Then try running the dev server again

```
npm run dev
```

You should get a message like this one:


```
VITE v5.4.14  ready in 433 ms

➜  Local:   http://127.0.0.1:5173/
➜  press h + enter to show help
  ```

Adding the logo and welcome images

Create two images. 

A small one (500x500 px, Max 100Kb, name: small_logo.jpg) for the Menu header and 

A large one (1000x1000 px, Max 500kb, name: large_logo.jpg) for the log-in page

Place both images in tower/public 

**MacOS/Linux:**
```
cd tools/public
```

**Windows:**
```
cd tools\public
```

The image names are listed in the .gitignore and in the .env.* files. For that reason you must use those names. 



Build the FrontEnd
Tank interacts with the Tower build not with its raw components. 
The Tower build is a compiled version of the application that exists in  tower/dist 

Run the following command in the tower root to generate a build.

```
yarn build
```








