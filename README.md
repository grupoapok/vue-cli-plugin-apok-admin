# Apok-admin

The VueJS plugin for REST and GraphQL web client projects

## Installation
As a vue-cli plugin you need to install vue-cli tool using ``npm install``

- ``npm install -g @vue/cli``

then create a new vue project with ``vue create``

- ``vue create <myProjectName>``

Now you need to install the plugin via ``vue add`` vue-cli console command

- ``vue add @apok/apok-admin``

## Usage
after installation, the plugin will auto run and start asking the
config question for the scaffold, however if you need to run the plugin
again you can use ``vue invoke`` command instead:

- ``vue invoke @apok/apok-admin``

### Console commands
Apok-admin comes with build in commands for admin and vuex module 
scaffolding that allows the user to add specific functions to their
projects

- #### ``vuex:module`` command
    this command generates a folder named as the module and also creates the files
    for this vuex module to work: the store, actions, mutations and an index.js
    to bundle everything up.
    
    - ##### ``vuex:module`` options 
    ```
     # new vuex module name (required)
      
     --name <vuexModuleName>
      
     # adds named actions into actions.js file with their respective
     mutations in mutations.js and an types.js file holding the names 
     imputed by the user for actions and mutations
      
     --actions myAct1,myAct2,myAct3..., myActN
      
     # generates actions.js file with default CRUD actions and the respective
     mutations.js for the mutations. Note that the names for this actions and
     mutations are already assigned with global variables created by the plugin
     itself
      
     --crud
     ```
     ***important note: `--actions` and ``--crud`` cannot be used in the same command line***

- #### ``admin:module`` command
    Similar to the previous one, this command also creates a folder named
    as the admin module name specified by the user but instead creates default
    views for the module: main, edit and list, a routes.js to handle the new 
    views and adds the possibility to generate a vuex module!
    
    - ##### ``admin:module`` options
    ```
    # new admin module name (required)
    
    --name <myAdminModuleName>
  
    # creates a store folder inside of the admin module root folder, with
    an actions.js file for the actions and a mutations.js file for the
    mutations.
    
    --vuex <vuexModuleName>
  
    # Name of the variable to bind to Data in edit view
  
    --vuexVar <vuexVarName>
  
    # invokes vuex:module command with default CRUD actions and mutations
  
    --createVuex
     ```
    ***important note: `--vuex` and ``--createVuex`` cannot be used in the same command line***



