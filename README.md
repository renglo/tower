# TOWER

# INSTALLATION

To use this template

#### Step 1: Create a new repository from this template 
Go to `https://github.com/renglo/tower` and clicking "Use this template"

The name of the repository should be <projectname>_tower

#### Step 2: Clone a local copy to your development environment

`git clone https://github.com/renglo/<projectname>_tower.git`

#### Step 3: Declare the upstream repository in the new local clone to be able to receive updates from the template

`git remote add upstream https://github.com/renglo/tower.git`

You can check like this:

`git remote -v`


origin  https://github.com/renglo/<projectname>_tank.git (fetch)
origin  https://github.com/renglo/<projetname>_tank.git (push)
upstream        https://github.com/renglo/tank.git (fetch)
upstream        https://github.com/renglo/tank.git (push)


#### Step 4: To acquire changes from the template run

`git fetch upstream`

And then reapply your changes on top of the latest template updates, avoiding a merge commit.

`git rebase upstream/main`


If there are conflicts you'll have to resolve them. 
To avoid conflicts avoid overwriting template files.


#### STEP 4b: Commit template changes to your project repository

`git add . `
`git commit -m 'some message'`
`git push -u -origin`

If there is a conflict indicating that the origin branch has been rebased, use the following command and try again

`git config pull.rebase true`


Your code will be untouched as template files will be overriden by your changes.


#### STEP 5: Setup the local configuration files

- Rename .env.development.TEMPLATE to .env.development and .env.production.TEMPLATE to .env.development
- Replace the placeholders with the real configuration


### STEP 6: Install the Landing page for this project


- Rename the file  /landing/Landing.tsx.TEMPLATE to /landing/Landing.tsx
- Insert any React Based component that represents a Landing Page
- The whole landing page should be contained inside of /landing



### STEP 7: Install Tools

- The template comes with two default tools : Data and Schd
- A tool is the equivalent of an "app" in the frontend. Teams are assigned "Tools" they can work with
- A tool is represented by a folder with the following structure

/<tool_name>-┐
             └---<tool_name>.tsx
             |
             └---/blueprints ---┐
             |                  └--/<tool_name>_<ring_name>.json
             |                  └--...as many blueprints as the tool might need
             |
             └---/components ---┐
             |                  └--/<tool_name>_<component_name>.tsx
             |                  └--...as many custom components as the tool might need
             |
             └---/navigation ---┐
             |                  └--/tool_<tool_name>_sidenav.tsx
             |                  └--/tool_<tool_name>_sheetnav.tsx
             |
             └---/pages --------┐
                                └--/tool_<tool_name>_<page_name>.tsx
                                └--...as many custom pages as the tool might need



- In order to activate the different components of the tool, you need to list its components in different places

a) To setup the Tool side navigation menu, add it to /tools/nav.tsx
b) To setup the Tool sheet navigation menu, add it to /tools/sheetnav.tsx
c) To link the pages with the menu icons, add the page components to the sidenav and sheetnav components
d) If link a custom component in /components, call it from any other component using the tool route
e) To make the Tool reachable via a URL route, list the tool component in /tools/router.tsx

- The UI won't show the Tool if the user is not listed in a team that has access to that tool in any given organization

IMPORTANT: router.tsx, nav.tsx and sheetnav.tsx are some of the few template files that are overwritten locally. Please be aware that when the 
template is updated, you might have to resolve a git rebase. 

`git config pull.rebase true`




### STEP 8: Install Dependencies

`npm install`
`npm install vite`

Install Crypto JS
`npm install crypto-js`


Then run the dev server

`npm run dev`


If you are getting errors, clear the libraries and start over

`rm -rf node_modules`
`rm package-lock.json`
`npm install`

If you are still getting errors, update the nvm version

`nvm install 18`

Then try running the dev server again


`npm run dev`







