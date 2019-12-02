import axios from "axios";

export default axios.create({
  baseURL:
    "https://digital-insight-dev.eastus.cloudapp.azure.com/digitalops-service"
});
