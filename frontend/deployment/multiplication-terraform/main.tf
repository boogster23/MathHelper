provider "azurerm" {
    features {}
}

variable "app_name" {
  description = "The name of the web app"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

resource "azurerm_resource_group" "example" {
    name     = var.resource_group_name
    location = var.location
}

resource "azurerm_app_service_plan" "example" {
    name = "${var.app_name}-plan"
    location = azurerm_resource_group.example.location
    resource_group_name = azurerm_resource_group.example.name
    sku {
        tier = "Free"
        size = "F1"
    }
}

resource "azurerm_app_service" "example" {
    name = var.app_name
    location = azurerm_resource_group.example.location
    resource_group_name = azurerm_resource_group.example.name
    app_service_plan_id = azurerm_app_service_plan.example.id

    app_settings = {
      "WEBSITE_NODE_DEFAULT_VERSION" = "25"
    }
}
