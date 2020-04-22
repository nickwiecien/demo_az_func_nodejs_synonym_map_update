const axios = require('axios')

//Update environment variables in Function app config (public) or local.settings.json (local)
const base_url = process.env["BASE_URL"] //Search service url: https://[service-name].search.windows.net/synonymmaps
const api_key = process.env["API_KEY"] //Search service key
const api_version = process.env["API_VERSION"] //Search service api version (often 2019-05-06)
const synonym_map_name = process.env["SYNONYM_MAP_NAME"] //Name of synonym map

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");

    //Expecting csv with format: product_name, synonyms (delimited by '|')

    // Convert data from blob to string and split and newlines
    let data = myBlob.toString('utf8').split('\r\n');

    // Check that more than one row of synonyms exists
    if (data.length > 1){
        let formatted_synonyms = [];
        for (var i = 1; i < data.length; i++)
        {
            let parts = data[i].split(',');
            if (parts.length===2){
                let product_name = parts[0];
                let synonyms = parts[1].replace('|', ',');
                //format each row (syn1, syn2 => prodname\n) and append to array
                let formatted_row = synonyms + '=>' + product_name + '\n';
                formatted_synonyms.push(formatted_row);
            }
        }

        //Format data for PUT request
        let body_obj = {
            'format': 'solr',
            'name': 'productsynonyms',
            'synonyms': formatted_synonyms.join('')
        }
        let full_url = base_url + "/" + synonym_map_name + "?api-version=" + api_version;
        let headers = {
            'Content-type': 'application/json', 
            'api-key': api_key,
        };

        //Execute Put request using axios to update synonym map 
        axios.put(full_url, body_obj, {'headers': headers}).then(res => {
            context.log(JSON.stringify(res));
        }).catch(err => {
            console.log(JSON.stringify(err));
        });
    }
};