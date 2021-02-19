# NodeJs Auto Deploy 

#### Autodeploy your node application with this project. To use it, you will need complete the "configuration.json" file with yourself information, like **repository URL**, **local path** to save or manege the project (don't forget to put the absolute path), **index file** and **list of command** to execute.


#### To do the auto deploy by github actions, add this code on your workflow file and replace the informations.

```yml
      - name: AutoDeploy Request
        uses: fjogeleit/http-request-action@master
        with:
          url: 'http://yourServerIPHere:YourPortHere'
          method: 'GET'
```

###### This code makes a request to the server application and will execute the tasks to auto deploy your node project.
###### Don't forget to change "yourServerIpHere" by yourself IP and "YourPortHere" by yourself port (The port default of the application id 6643).
