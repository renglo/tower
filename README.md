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


### STEP 5: Install the Landing page for this project


- Rename the file  /landing/Landing.tsx.TEMPLATE to /landing/Landing.tsx
- Insert any React Based component that represents a Landing Page
- The whole landing page should be contained inside of /landing



### STEP 6: Install Tools

