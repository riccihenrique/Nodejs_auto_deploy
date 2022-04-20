# NodeJs Auto Deploy 

#### Faça deploy automático de sua aplicação node, assim como plataformas como Heroku, utilizando esse rápido e simples gerenciador.

#### Para a execução, será necessário seguir os passos abaixo:
- Habilite a porta 6643 no seu firewall;
- Você pode instalat a aplicação com o comando npm install -g autodeployjs;
- Execute autodeployjs &.
 sdsdas
#### É possível obter informações sobre as aplicação que estão rodando, alguma das flags abaixo:
- status (exibe os status das aplicações)
- restart (reinicia uma aplicação)
- stop (para uma aplicação)

#### Para habilitar o autodeploy de alguma aplicação, basta inserir a action abaixo em um arquivo .yml dentro dos workflows do github action. Isso fará com que, ao receber alguma modificação, envia um pedido ao servidor e realize os passos para inserir as atualizações novas e restartar a aplicação.

```yml
      - name: AutoDeploy Request
        uses: fjogeleit/http-request-action@master
        with:
          url: 'http://yourServerIPHere:6643/nameOfApplication'
          method: 'POST'
          data: {
            "repository": "repoUrlHere",
            "first_time_commands": ["command1Here", "command2Here"],
            "commands": ["command1Here", "command2Here"]
          }
```

#### Para ver a resposta do servidor, contendo erros ou sucesso, adicione o passo abaixo no arquivo yml

```yml
      - name: Response
        run: echo ${{ steps.myRequest.outputs.response }}
```

###### Não esqueça de alterar as informações de IP e nome da aplicação.

#### [Here](https://www.youtube.com/watch?v=tF_Ta0amX_E) is a configuration tutorial (in Portuguese).
