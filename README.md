# NodeJs Auto Deploy 

#### Autodeploy your node application with this project. To use it, you will need complete the "configuration.json" file with yourself information, like Repository URL, Local Path to save or manege the project (don't forget to put the complete path), index file and list of command to execute.


#### To do the auto deploy by github actions, add this code on your workflow file and replace the informations.

```yml
      - name: Webhook Action
        uses: joelwmale/webhook-action@2.0.1
        with:
          url: yourServerIPHere:YourPortHere
```

###### This code makes a request to the server application and will execute the tasks to auto deploy your node project.
###### Don't forget to change "yourServerIpHere" by yourself IP and "YourPortHere" by yourself port.
