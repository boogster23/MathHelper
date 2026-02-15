param appName string
param location string = resourceGroup().location
param sku string = 'F1'

resource appServicePlan 'Microsoft.Web/serverfarms@2025-03-01' = {
    name: '${appName}-plan'
    location: location
    sku: {
        name: sku
        tier: 'Free'
        capacity: 1
    }
}

resource webApp 'Microsoft.Web/sites@2025-03-01' = {
    name: appName
    location: location
    properties: {
        serverFarmId: appServicePlan.id
        siteConfig: {
            appSettings: [
                {
                    name: 'WEBSITE_NODE_DEFAULT_VERSION'
                    value: '25'
                }
            ]
        }
    }
}

output webAppUrl string = webApp.properties.defaultHostName
