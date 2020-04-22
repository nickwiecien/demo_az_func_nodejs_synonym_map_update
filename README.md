# demo_az_func_nodejs_synonym_map_update
Demo node.js Azure function used to update a synonym map in Azure search with data stored in blob storage, using a blob storage trigger.

*Function App created using Azure CLI Tools (0.5.0) and Azure Functions (0.22.0) extensions in VS Code*


#### To Deploy


1.) Update bindings--change the **connection** path inside function.json to &lt;yourstorageaccount&gt;_STORAGE.json

2.) Click 'Deploy to Function app...' icon in Azure extension in VSCode

3.) Create new function app in Azure with unique name

4.) Select Node.js 10 runtime

5.) Select same region as storage account

6.) After deploying to Azure, add environment variables BASE_URL, API_KEY, API_VERSION, and SYNONYM_MAP_NAME to function app configuration

7.) Confirm that storage account is attached to function app (may need to reattach under 'Integrate' tab)


#### Running Locally

You can launch your function app locally using the `npm start` command (you may need to install Azure Functions Core Tools https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash). 

With your function app running locally you can add/update files in your storage account and monitor app behavior. Restart the app after making changes, and deploy after iterating.

*Troubleshooting note*: if you see an error on launch, you may need to add the value for **AzureWebJobsStorage** to your local.settings.json file. 