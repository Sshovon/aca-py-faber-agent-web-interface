# Acapy-Cloud-Agent Web-Interface

First you have to set up Hyperledger Aries Cloud Agent - Python by following the instruction in the aca-py repo.

## Hyperledger Aries Cloud Agent-Python

You have to clone following repository and follow the other instructions in the repository to complete the setup.

```
https://github.com/hyperledger/aries-cloudagent-python.git
```


## Hyperledger Aries-mobile-agent-react-native 

You have to clone following repository and follow the other instructions in the repository to complete the setup. And it will install a mobile agent in your mobile to manage your identity.

```
https://github.com/hyperledger/aries-mobile-agent-react-native.git
```


## Clone This Repository

```
https://github.com/Sshovon/aca-py-faber-agent-web-interface.git
```

## API

Go to api directory and install the dependencies.

```
cd  aca-py-faber-agent-web-interface/api
npm install
```
Now start the API

```
npm run start
```

## Web-interface

Go to frontend directory and install the dependencies.

```
cd  aca-py-faber-agent-web-interface/frontend
npm install
```
Now start the frontend

```
npm start
```

### Now you can use the functionalities provied by aries cloud agent using the web-interface


<!-- ### setup ngrok for two port

```ngrok start --all ```

### now set 3001 port to webhook and 8020 to aca-py in agent.py and faber-local.sh in demo folder

## set up tail server
git clone https://github.com/bcgov/indy-tails-server.git

./indy-tails-server/docker/manage up

docker logs docker_ngrok-tails-server_1

take ngrok url and set it in faber-local.sh and faber.py

# start api and front-end


# start aca-py 
``` LEDGER_URL=http://dev.greenlight.bcovrin.vonx.io ./run_demo faber --aip 10 --revocation```
 -->

