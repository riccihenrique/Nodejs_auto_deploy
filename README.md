# NodeJs Auto Deploy 

#### Deploy your node application automatically with this project. To use it, you will need complete the "configuration.json" file with yourself information, like **repository URL**, **local path** to save or manage the project (don't forget to put the absolute path), **index file** and **list of command** to execute.

#### You need follow the steps above on your server:
- Enable the port 6643 on your firewall;
- Run "npm install" to install the project dependences;
- Run "npm start &" to run the application in background.

#### To do the auto deploy by github actions, add this code on your workflow file project and replace the informations.

```yml
      - name: AutoDeploy Request
        uses: fjogeleit/http-request-action@master
        with:
          url: 'http://yourServerIPHere:6643'
          method: 'GET'
```

###### This code makes a request and will execute the tasks to auto deploy your node project.
###### Don't forget to change "yourServerIpHere" by your server IP.
